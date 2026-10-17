// เซิร์ฟเวอร์กลางของเกม: เสิร์ฟหน้าเกม + ส่งต่อข้อความ (ไม่มีลอจิกเกมในนี้)
// รองรับผู้เล่นจำนวนมากด้วยการส่งเฉพาะข้อมูลที่อยู่ใกล้ผู้เล่นแต่ละคน ไม่ต้องติดตั้งไลบรารีเพิ่ม
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto'),zlib=require('zlib');
const PORT=process.env.PORT||3000, MAX=Number(process.env.MAX_PLAYERS||120), MAXMSG=256*1024;
const R_PEER=650, R_WORLD=480, R_XP=420, R_FX=520, MAXPEERS=40, BUFCAP=1<<20;
const page=path.join(__dirname,'public','index.html');
const server=http.createServer((req,res)=>{
  if(req.url==='/health'){res.writeHead(200);return res.end('ok')}
  if(req.url==='/version'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(JSON.stringify({v:SRV_V,up:Math.round(process.uptime())}))}
  if(req.url==='/admin'||req.url.startsWith('/admin/'))return adminRoute(req,res);
  if(req.url.startsWith('/api/acc/'))return accRoute(req,res);
  if(req.url==='/stats'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify(stats()))}
  {const m=/^\/([a-z0-9_-]+\.(jpg|jpeg|png|webp))(\?.*)?$/i.exec(req.url);if(m){const f=path.join(__dirname,'public',m[1]);return fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);return res.end()}res.writeHead(200,{'Content-Type':'image/'+(m[2].toLowerCase()==='jpg'?'jpeg':m[2].toLowerCase()),'Cache-Control':'public, max-age=604800','Content-Length':b.length});bytesOut+=b.length;res.end(b)})}}
  const P=getPage();if(!P){res.writeHead(500);return res.end('missing index.html')}
  if(req.headers['if-none-match']===P.etag){res.writeHead(304,{'ETag':P.etag,'Cache-Control':'no-cache'});return res.end()}
  const ae=String(req.headers['accept-encoding']||''),h={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','ETag':P.etag,'Vary':'Accept-Encoding'};
  let body=P.raw;if(/\bbr\b/.test(ae)){body=P.br;h['Content-Encoding']='br'}else if(/\bgzip\b/.test(ae)){body=P.gz;h['Content-Encoding']='gzip'}
  h['Content-Length']=body.length;bytesOut+=body.length;res.writeHead(200,h);res.end(body);
});
/* หน้าเกมบีบอัดไว้ล่วงหน้า (br/gzip) + ETag ให้เบราว์เซอร์ใช้ของเดิมถ้าไม่เปลี่ยน */
let PG=null;
function getPage(){try{const st=fs.statSync(page);if(PG&&PG.mt===st.mtimeMs)return PG;const raw=fs.readFileSync(page);
  PG={mt:st.mtimeMs,raw,gz:zlib.gzipSync(raw,{level:9}),br:zlib.brotliCompressSync(raw,{params:{[zlib.constants.BROTLI_PARAM_QUALITY]:10,[zlib.constants.BROTLI_PARAM_SIZE_HINT]:raw.length}}),etag:'"'+crypto.createHash('sha1').update(raw).digest('base64').slice(0,16)+'"'};
  console.log('page '+raw.length+' → gzip '+PG.gz.length+' · br '+PG.br.length);return PG}catch(e){return PG}}
getPage();
const clients=new Set(),byUid=new Map();let nextId=1,hostByMap={},countByMap={},bytesOut=0,msgsOut=0;
function frame(op,buf,z){const n=buf.length,b0=0x80|op|(z?0x40:0);let h;
  if(n<126)h=Buffer.from([b0,n]);
  else if(n<65536){h=Buffer.alloc(4);h[0]=b0;h[1]=126;h.writeUInt16BE(n,2)}
  else{h=Buffer.alloc(10);h[0]=b0;h[1]=127;h.writeBigUInt64BE(BigInt(n),2)}
  return Buffer.concat([h,buf])}
/* บีบอัดข้อความ websocket (permessage-deflate) · ข้อความเดียวกันที่ส่งหลายคนบีบครั้งเดียว */
const ZMIN=96,TAIL=Buffer.from([0,0,255,255]);let zLastS=null,zLastB=null;
function zmsg(str){if(str===zLastS)return zLastB;let b=zlib.deflateRawSync(Buffer.from(str),{level:6,finishFlush:zlib.constants.Z_SYNC_FLUSH});
  if(b.length>=4&&b.subarray(b.length-4).equals(TAIL))b=b.subarray(0,b.length-4);zLastS=str;zLastB=b;return b}
function send(c,str,droppable){if(c.dead||!c.sock.writable)return;
  if(droppable&&c.sock.writableLength>BUFCAP)return; // ผู้รับช้า ข้ามข้อมูลที่ทดแทนได้
  let b;if(c.z&&str.length>=ZMIN){try{b=frame(1,zmsg(str),1)}catch(e){b=null}}if(!b)b=frame(1,Buffer.from(str));
  bytesOut+=b.length;msgsOut++;c.sock.write(b)}
function kill(c){if(c.dead)return;c.dead=true;clients.delete(c);if(c.uid&&byUid.get(c.uid)===c)byUid.delete(c.uid);if(c.mid&&byMid.get(c.mid)===c)byMid.delete(c.mid);try{c.sock.destroy()}catch(e){}}
const num=(v,a,b,d)=>Number.isFinite(v)?Math.max(a,Math.min(b,v)):d;
function cleanPresence(p){return{uid:String(p.uid||'').slice(0,12),x:num(p.x,0,20000,0),y:num(p.y,0,20000,0),hp:num(p.hp,0,1e6,0),mh:num(p.mh,1,1e6,1),
  cls:String(p.cls||'').slice(0,8),n:String(p.n||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,24),lv:num(p.lv|0,1,99,1),sl:p.sl?1:0,rb:num(p.rb|0,0,2,0),mp:num(p.mp|0,1,99999,1),hd:num(p.hd|0,0,399,0),bt:num(p.bt|0,0,399,0),wp:num(p.wp|0,0,399,0),wu:num(p.wu|0,0,30,0),im:num(p.im|0,0,3,0),ar:num(p.ar|0,0,399,0),tt:String(p.tt||'').replace(/[^a-z0-9]/gi,'').slice(0,8),c2:num(p.c2|0,0,2,0),aw:p.aw?1:0,at:num(p.at|0,0,99,0),mt:num(p.mt|0,0,9,0),pt:num(p.pt|0,0,30,0),sw:p.sw?1:0,as:num(p.as|0,0,200,0),rw:p.rw?1:0,sd:num(p.sd|0,0,9,0),zz:p.zz?1:0,fa:num(p.fa|0,0,40,0),rp:/^[a-z0-9]{1,24}$/i.test(String(p.rp||''))?String(p.rp):'',sk:/^[a-z0-9]{1,32}$/i.test(String(p.sk||''))?String(p.sk):'',dy:num(p.dy|0,0,65535,0)}}
const inMap=mp=>{const a=[];for(const c of clients)if(c.p&&c.p.mp===mp)a.push(c);return a};
/* เลือก host ต่อแมพ: คงคนเดิมไว้ถ้ายังใช้ได้ · ข้ามคนที่พับจอ/ไม่ส่ง world · เลือกคนที่อยู่ในแมพนานสุด */
function okHost(c,now){return c.p&&!c.dead&&!c.p.aw&&!(c.badUntil>now)}
function recompute(){const now=Date.now(),prev=hostByMap,byMap={};hostByMap={};countByMap={};
  for(const c of clients){if(!c.p||!c.uid)continue;const mp=c.p.mp;countByMap[mp]=(countByMap[mp]||0)+1;(byMap[mp]=byMap[mp]||[]).push(c)}
  for(const mp in byMap){const L=byMap[mp],h0=prev[mp];
    if(h0&&h0.p&&h0.p.mp==mp&&h0.hostSince&&now-h0.hostSince>3000&&now-(h0.lastW||0)>2500)h0.badUntil=now+15000;
    let h=null;if(h0&&L.includes(h0)&&okHost(h0,now))h=h0;
    else{const ok=L.filter(c=>okHost(c,now));const P=ok.length?ok:L;P.sort((a,b)=>(a.mapSince||0)-(b.mapSince||0)||(a.uid<b.uid?-1:1));h=P[0]}
    if(h!==h0||!h.hostSince){h.hostSince=now;h.lastW=now}hostByMap[mp]=h}
  for(const c of clients)if(c.hostSince&&!Object.values(hostByMap).includes(c))c.hostSince=0}
const d2=(ax,ay,bx,by)=>{const dx=ax-bx,dy=ay-by;return dx*dx+dy*dy};
function tickPeers(){
  recompute();
  for(const c of clients){
    if(!c.p)continue;const mp=c.p.mp,cand=[];
    for(const o of clients){if(o===c||!o.p||o.p.mp!==mp)continue;const dd=d2(c.p.x,c.p.y,o.p.x,o.p.y);if(dd<R_PEER*R_PEER)cand.push([dd,o])}
    if(cand.length>MAXPEERS){cand.sort((a,b)=>a[0]-b[0]);cand.length=MAXPEERS}
    const rows=[],info=[],seen=new Map();
    for(const [,o] of cand){const p=o.p;rows.push([p.uid,Math.round(p.x),Math.round(p.y),Math.round(p.hp),p.sl,p.at|0]);
      const ex=[p.wp,p.ar,p.c2,p.mt,p.wu,p.pt,p.im,p.sw|0,p.as|0,p.rw|0,p.rb|0,p.sd|0,p.zz|0,p.fa|0,p.rp||'',p.sk||'',p.dy|0,gdTag(o)];
      const key=p.n+'|'+p.cls+'|'+p.lv+'|'+p.mh+'|'+p.mp+'|'+p.hd+'|'+p.bt+'|'+p.tt+'|'+ex.join(',');seen.set(p.uid,key);
      if(c.known.get(p.uid)!==key)info.push([p.uid,p.n,p.cls,p.lv,p.mh,p.mp,p.hd,p.bt,p.tt,ex])}
    c.known=seen;
    const m={t:'peers',rows,info,host:hostByMap[mp]?hostByMap[mp].uid:'',n:countByMap[mp]||1};
    if(hostByMap[mp]===c){m.all=[];for(const o of clients){if(o===c||!o.p||o.p.mp!==mp)continue;m.all.push([o.p.uid,Math.round(o.p.x),Math.round(o.p.y),(o.p.hp<=0||o.p.sl)?1:0])}}
    send(c,JSON.stringify(m),true);
  }
}
setInterval(tickPeers,200);
/* รายชื่อทุกคนในแมพเดียวกัน (ทุก 2 วิ · ใกล้สุด 80 คน) ให้แลกเปลี่ยน/เชิญปาร์ตี้ได้แม้อยู่ไกลกันในแมพใหญ่ */
setInterval(()=>{const by={};for(const c of clients){if(!c.p||!c.uid)continue;(by[c.p.mp]=by[c.p.mp]||[]).push(c)}
  for(const mp in by){const L=by[mp];for(const c of L){let r=L.filter(o=>o!==c);if(!r.length&&!c.rosterN)continue;if(r.length>80){r.sort((a,b)=>d2(a.p.x,a.p.y,c.p.x,c.p.y)-d2(b.p.x,b.p.y,c.p.x,c.p.y));r=r.slice(0,80)}
    c.rosterN=r.length;send(c,JSON.stringify({t:'roster',mp:+mp,r:r.map(o=>[o.p.uid,o.p.n,o.p.cls,o.p.lv])}),true)}}},2000);
/* ===== ที่เก็บข้อมูลถาวร: ตั้ง DATA_DIR ให้ชี้ไปดิสก์ถาวร (เช่น Render Disk) · เขียนแบบปลอดภัย (ไฟล์ชั่วคราวแล้วเปลี่ยนชื่อ) ===== */
const DATA_DIR=process.env.DATA_DIR||__dirname;try{fs.mkdirSync(DATA_DIR,{recursive:true})}catch(e){}
function wj(f,o,cb){const t=f+'.tmp';fs.writeFile(t,JSON.stringify(o),e=>{if(e){if(cb)cb(e);return}fs.rename(t,f,e2=>{if(cb)cb(e2)})})}
function wjSync(f,o){try{const t=f+'.tmp';fs.writeFileSync(t,JSON.stringify(o));fs.renameSync(t,f)}catch(e){console.error('save fail',f,e.message)}}
const byMid=new Map();
function mkOwner(c,d){const v=d&&typeof d.mid==='string'&&/^[a-z0-9]{8,16}$/.test(d.mid)?'m:'+d.mid:c.uid;if(v&&v!==c.uid){if(c.mid&&c.mid!==v&&byMid.get(c.mid)===c)byMid.delete(c.mid);c.mid=v;byMid.set(v,c)}return v}
/* ตารางอันดับบอส: เก็บลงไฟล์ leaderboard.json */
const LBF=path.join(DATA_DIR,'leaderboard.json');let LB={},lbDirty=false;
/* หนึ่งตัวละคร (ชื่อ+อาชีพ) = หนึ่งแถว เก็บเฉพาะสถิติที่ดีที่สุด */
const lbId=r=>String(r.n||'').trim().toLowerCase()+'|'+String(r.c||'');
const lbHi=key=>key==='wb'||key==='pv'||/^s\d{4}$/.test(key);
/* ผู้ดูแลคุมตารางอันดับ: แบนชื่อ · ตั้งเพดานสถิติต่อตาราง (ตารางคะแนน=ค่าสูงสุดที่ Lv75 ลดตามเลเวลแบบเส้นตรง · ตารางเวลา=เวลาเร็วสุดที่ยอมรับ) · เก็บสถิติที่ถูกปัดตก */
const LBCF=path.join(DATA_DIR,'lbcfg.json');let LBC={caps:{},ban:{},rej:[]};
try{const j=JSON.parse(fs.readFileSync(LBCF,'utf8'));if(j&&typeof j==='object')LBC={caps:j.caps||{},ban:j.ban||{},rej:Array.isArray(j.rej)?j.rej:[]}}catch(e){}
const lbcSave=()=>wj(LBCF,LBC);
const lbCapFor=(key,l)=>{const v=+LBC.caps[key]||0;if(!v)return 0;return lbHi(key)?v*Math.min(1,Math.max(.2,l/75)):v};
function lbBlock(key,row,hi){if(LBC.ban[lbId(row)])return'ban';const cap=lbCapFor(key,row.l);if(cap&&(hi?row.t>cap:row.t<cap))return'cap';return''}
function lbRej(key,row,why){LBC.rej.unshift({k:key,n:row.n,c:row.c,l:row.l,t:row.t,why,at:Date.now()});if(LBC.rej.length>40)LBC.rej.length=40;lbcSave()}
function lbAdmin(act,q){const key=String(q.k||''),id=String(q.n||'').trim().toLowerCase()+'|'+String(q.c||'');
  if(act==='lbdel'){let n=0;for(const k in LB){if(key!=='*'&&k!==key)continue;const b=LB[k].length;LB[k]=LB[k].filter(r=>lbId(r)!==id);n+=b-LB[k].length}lbDirty=true;console.log('ลบแถวอันดับ',key,id,n);return{ok:1,n}}
  if(act==='lbban'){if(q.on){LBC.ban[id]={n:String(q.n||'').slice(0,12),c:String(q.c||'').slice(0,8),at:Date.now()};for(const k in LB)LB[k]=LB[k].filter(r=>lbId(r)!==id);lbDirty=true}else delete LBC.ban[id];lbcSave();console.log('แบนอันดับ',id,!!q.on);return{ok:1}}
  if(act==='lbcap'){if(!/^(m[1-4678]|m10|d[1-37]|tw|wb|pv|s\d{4})$/.test(key))return{ok:0};const v=Math.max(0,+q.v||0);if(v)LBC.caps[key]=v;else delete LBC.caps[key];
    let n=0;if(v){const hi=lbHi(key),b=(LB[key]||[]).length;LB[key]=(LB[key]||[]).filter(r=>{const c=lbCapFor(key,r.l);return!(c&&(hi?r.t>c:r.t<c))});n=b-LB[key].length;if(n)lbDirty=true}
    lbcSave();return{ok:1,removed:n}}
  return{ok:0}}
function lbDedupe(){let ch=false;for(const key in LB){const arr=LB[key];if(!Array.isArray(arr))continue;const hi=lbHi(key),best=new Map();
  for(const r of arr){const id=lbId(r),o=best.get(id);if(!o||(hi?r.t>o.t:r.t<o.t))best.set(id,r)}
  const out=[...best.values()].sort((a,b)=>hi?b.t-a.t:a.t-b.t);if(out.length!==arr.length)ch=true;LB[key]=out}return ch}
try{const j=JSON.parse(fs.readFileSync(LBF,'utf8'));if(j&&typeof j==='object')LB=j}catch(e){}
if(lbDedupe()){lbDirty=true;console.log('ตารางอันดับ: รวมแถวซ้ำของตัวละครเดียวกันแล้ว')}
setInterval(()=>{if(!lbDirty)return;lbDirty=false;wj(LBF,LB)},10000);
const RSTT={};
function onEmit(c,m){
  const k=m.k,pl=m.d;if(typeof k!=='string'||k.length>12)return;
  if(k==='chat'){if(!pl||typeof pl!=='object'||typeof pl.t!=='string')return;const now=Date.now();c.chB=Math.min(5,(c.chB==null?5:c.chB)+(now-(c.chT||now))/1500);c.chT=now;if(c.chB<1)return;c.chB--;
    const cm={u:c.uid||'',n:String(pl.n||'').replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,12),t:pl.t.replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,80)};if(!cm.t)return;
    const s=JSON.stringify({t:'emit',k,d:cm,from:c.id});for(const o of clients)if(o!==c)send(o,s);try{chatLog(c,pl)}catch(e){}return}
  if(k==='nmq'){nameReq(c,pl&&pl.d);return}
  if(!c.p||!pl||typeof pl!=='object')return;
  const mp=c.p.mp,d=pl.d,host=hostByMap[mp];
  const wrap=x=>JSON.stringify({t:'emit',k,d:{mp,d:x},from:c.id});
  if(k==='lbs'){if(!d||typeof d!=='object')return;const key=String(d.k||'');if(!/^(m[1-4678]|m10|d[1-37]|tw|wb|pv|s\d{4})$/.test(key))return;const ss=/^s\d{4}$/.test(key),hi=lbHi(key),t=+d.t;if(hi?!(t>=1&&t<(ss?100000:1e12)):!(t>=5&&t<36000))return;
    const row={n:String(d.n||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,12)||'ผู้เล่น',c:String(d.cls||'').slice(0,8),l:num(d.lv|0,1,99,1),t:hi?Math.round(t):Math.round(t*10)/10,p:num(d.pc|0,1,99,1),u:c.uid||'',at:Date.now()};
    {const why=lbBlock(key,row,hi);if(why){lbRej(key,row,why);return}}
    const arr=LB[key]||(LB[key]=[]),i=arr.findIndex(r=>lbId(r)===lbId(row));if(i>=0){if(hi?arr[i].t>=row.t:arr[i].t<=row.t)return;arr.splice(i,1)}
    arr.push(row);arr.sort((a,b)=>hi?b.t-a.t:a.t-b.t);if(arr.length>50)arr.length=50;lbDirty=true;
    /* ตารางคะแนนฤดูกาลรายเดือน sYYMM: เก็บไว้แค่ 3 ฤดูกาลล่าสุด */if(ss){const ks=Object.keys(LB).filter(x=>/^s\d{4}$/.test(x)).sort();while(ks.length>3)delete LB[ks.shift()]}return}
  if(k==='ride'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c&&o.p&&o.p.mp===mp){d.from=c.uid||d.from;d.n=String(d.n||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,24);if(typeof d.why==='string')d.why=d.why.slice(0,40);send(o,wrap(d))}return}
  if(k==='trade'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c&&o.p&&o.p.mp===mp){d.from=c.uid||d.from;send(o,wrap(d))}return}
  if(k==='pvc'||k==='pva'||k==='pvn'||k==='pvh'||k==='pvd'||k==='pvt'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c){d.from=c.uid||'';send(o,wrap(d))}return}
  if(k==='mkq'||k==='mkl'||k==='mkb'||k==='mkx'||k==='mkc'){const why=mkGate(c,d,k);if(why){const t=String(d&&d.t||'').slice(0,12);
      if(k==='mkq')mkReply(c,'mkr',{err:why});else if(k==='mkl')mkReply(c,'mka',{t,ok:0,why});else if(k==='mkb')mkReply(c,'mkg',{ok:0,why});else if(k==='mkc')mkReply(c,'mkc',{g:0,r:[],why});return}}
  if(k==='mkq'){const u=mkOwner(c,d),A=ACCS[c.accA]||{};mkReply(c,'mkr',{L:MK.L.slice(-150).map(x=>({id:x.id,k:x.k,d:x.d,p:x.p,n:x.n,me:x.u===u?1:0})),sale:Math.floor(MK.sales[u]||0),ret:(MK.ret[u]||[]).length,ban:A.mkban?1:0,fl:(A.fo|0)>0?1:0,ep:MK.ep,mine:MK.L.filter(x=>x.u===u).map(x=>x.id)});return}
  if(k==='mkl'){const u=mkOwner(c,d);if(!u||!d||typeof d!=='object')return;const p=Math.floor(+d.p||0),ok=mkOk(d.k,d.d)&&p>=1&&p<=1e9&&MK.L.filter(x=>x.u===u).length<8;
    let id=0;if(ok){id=MK.n++;MK.L.push({id,u,n:c.p.n,k:d.k,d:d.d,p,at:Date.now()});mkDirty=true}mkReply(c,'mka',{t:String(d.t||'').slice(0,12),ok:ok?1:0,id,ep:MK.ep});return}
  if(k==='mkb'){const u=mkOwner(c,d),i=MK.L.findIndex(x=>x.id===+(d&&d.id));if(i<0||MK.L[i].u===u){mkReply(c,'mkg',{ok:0});return}
    {const A=ACCS[c.accA],f=svChar(c.accA,d.mid);if(!A||!f){mkReply(c,'mkg',{ok:0,why:'sync'});return}const gold=Math.max(0,+f.ch.gold||0),ex=A.exp&&A.exp[f.k],have=ex?Math.min(gold,ex.g):gold;
      if(have<MK.L[i].p){mkReply(c,'mkg',{ok:0,why:'gold'});return}A.exp=A.exp||{};A.exp[f.k]={g:have-MK.L[i].p,at:ex?ex.at:Date.now()};accDirty=true}const x=MK.L.splice(i,1)[0];MK.sales[x.u]=(MK.sales[x.u]||0)+Math.floor(x.p*.95);mkDirty=true;mkReply(c,'mkg',{ok:1,k:x.k,d:x.d,p:x.p,id:x.id});const s=byMid.get(x.u)||byUid.get(x.u);if(s)mkReply(s,'mks',{n:c.p.n,p:x.p,id:x.id,g:Math.floor(x.p*.95)});return}
  if(k==='mkx'){const u=mkOwner(c,d),i=MK.L.findIndex(x=>x.id===+(d&&d.id)&&x.u===u);if(i<0)return;const x=MK.L.splice(i,1)[0];mkDirty=true;mkReply(c,'mkg',{ok:1,back:1,k:x.k,d:x.d,p:0,id:x.id});return}
  if(k==='mkc'){const u=mkOwner(c,d);if(!u)return;const g=Math.floor(MK.sales[u]||0),r=MK.ret[u]||[];if(g>0){const A=ACCS[c.accA],f=svChar(c.accA,d.mid);if(A&&f){A.cr=A.cr||{};A.cr[f.k]=(A.cr[f.k]||0)+g;accDirty=true}}delete MK.sales[u];delete MK.ret[u];mkDirty=true;mkReply(c,'mkc',{g,r});return}
  if(k==='pty'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;let o=byUid.get(d.to);if(!o&&d.op==='lnk'&&typeof d.toN==='string'&&d.toN){const nm=d.toN.slice(0,24);for(const x of clients)if(x!==c&&x.p&&x.p.n===nm){o=x;break}}if(o&&o!==c){d.from=c.uid||d.from;send(o,wrap(d))}return}
  /* ===== กล่องจดหมาย: ส่งข้อความ/ของ/ทองถึงตัวละครตามชื่อ (ผู้รับออฟไลน์ก็ได้) ===== */
  if(k==='mlq'||k==='mls'||k==='mlc'||k==='mlm'){if(!d||typeof d!=='object')return;const mid=typeof d.mid==='string'&&/^[a-z0-9]{8,16}$/.test(d.mid)?d.mid:'';if(!mid)return;
    const R=(kk,o)=>mkReply(c,kk,o),t=String(d.t||'').slice(0,12),own=MK.own&&MK.own[mid];let accOk=false;
    if(d.acc&&typeof d.acc==='object'){const a=accName(String(d.acc.a||'')),A=a&&accAuth(a,d.acc.t);if(A&&(!own||own===a)){accOk=true;c.accA=a}}
    /* ตัวละครที่ผูกบัญชีแล้ว ต้องแนบบัญชีเดียวกันมาด้วยถึงจะเปิดกล่องได้ */
    if(own&&!accOk){if(k==='mls'){const T=ML.tk[mid]||(ML.tk[mid]={});if(t&&T[t]==null){T[t]=0;mlTrim(mid);mlDirty=true}R('mla',{t,ok:T[t]?1:0,why:'acc'})}else R(k==='mlc'?'mlg':'mlr',{id:+d.id|0,ok:0,err:'acc',why:'acc'});return}
    mkOwner(c,d);const now=Date.now();
    if(k==='mlq'){if(now-(c.mlQ||0)<1000)return;c.mlQ=now;const out={};if(Array.isArray(d.tk)){const T=ML.tk[mid]||(ML.tk[mid]={});d.tk.slice(0,20).forEach(x=>{x=String(x).slice(0,12);if(!x)return;if(T[x]==null){T[x]=0;mlDirty=true}out[x]=T[x]});mlTrim(mid)}R('mlr',mlList(mid,out));return}
    if(k==='mlm'){const B=ML.b[mid];if(B){const ids=new Set((Array.isArray(d.ids)?d.ids:[]).slice(0,60).map(v=>+v));
        if(d.op==='rd')B.forEach(x=>{if(ids.has(x.id)&&!x.rd){x.rd=1;mlDirty=true}});
        else if(d.op==='del'){const L=B.filter(x=>!(ids.has(x.id)&&!x.a&&!(x.g>0)));if(L.length!==B.length){mlDirty=true;if(L.length)ML.b[mid]=L;else delete ML.b[mid]}}}
      R('mlr',mlList(mid,{}));return}
    if(k==='mls'){if(!t)return;const T=ML.tk[mid]||(ML.tk[mid]={});if(T[t]!=null){R('mla',{t,ok:T[t]?1:0,why:T[t]?'':'dup'});return}
      const no=why=>{T[t]=0;mlTrim(mid);mlDirty=true;R('mla',{t,ok:0,why})};
      if(now-(c.mlT||0)<1500)return no('busy');c.mlT=now;
      const S0=NM[nmKey(c.p.n)];if(!S0||S0.mid!==mid)return no('name');
      const tn=nmClean(d.to),tk=nmKey(tn),R0=tk&&NM[tk];if(!R0||!R0.mid||now-(R0.at||0)>NM_TTL)return no('who');if(R0.mid===mid)return no('self');
      const tx=String(d.tx||'').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g,'').trim().slice(0,200);
      let a=null;if(d.k!=null){if(!mkOk(d.k,d.d))return no('bad');a={k:d.k,d:d.d}}
      const g=Math.floor(+d.g||0);if(!(g>=0&&g<=1e9))return no('bad');if(!tx&&!a&&!g)return no('empty');
      if((ML.dy[mid]|0)>=ML_DAY)return no('day');
      const B=ML.b[R0.mid]||[];if(B.length>=ML_MAX)return no('full');if(B.filter(x=>x.fm===mid&&!x.rd).length>=10)return no('spam');
      if(a||g){const why=mkGate(c,d,'mkl');if(why)return no(why);
        if(g>0){const A=ACCS[c.accA],f=svChar(c.accA,mid);if(!A||!f)return no('sync');if((A.fo|0)>0)return no('flag');
          const gold=Math.max(0,+f.ch.gold||0),ex=A.exp&&A.exp[f.k],have=ex?Math.min(gold,ex.g):gold,need=g+mlFee(g);if(have<need)return no('gold');
          A.exp=A.exp||{};A.exp[f.k]={g:have-need,at:ex?ex.at:now};accDirty=true}}
      const x={id:ML.n++,fn:c.p.n,fc:c.p.cls,fm:mid,tn:R0.n,t:tx,a,g,at:now,rd:0};mlBox(R0.mid).push(x);ML.dy[mid]=(ML.dy[mid]|0)+1;T[t]=1;mlTrim(mid);mlDirty=true;
      R('mla',{t,ok:1,id:x.id,tn:R0.n});mlNotify(R0.mid,R0.n,x);return}
    if(k==='mlc'){const B=ML.b[mid]||[],x=B.find(q=>q.id===+d.id);if(!x||(!x.a&&!(x.g>0))){R('mlg',{id:+d.id|0,ok:0,why:'gone'});return}
      const why=mkGate(c,d,'mkc');if(why){R('mlg',{id:x.id,ok:0,why});return}
      const g=x.g|0,a=x.a;if(g>0){const A=ACCS[c.accA],f=svChar(c.accA,mid);if(!A||!f){R('mlg',{id:x.id,ok:0,why:'sync'});return}A.cr=A.cr||{};A.cr[f.k]=(A.cr[f.k]||0)+g;accDirty=true}
      x.a=null;x.g=0;x.rd=1;x.cl=1;mlDirty=true;R('mlg',{id:x.id,ok:1,a,g});return}}
  /* ===== เพื่อน: ถามสถานะตามชื่อ / ส่งข้อความหาคนตามชื่อ (ข้ามแมพได้) ===== */
  if(k==='frq'){if(!d||!Array.isArray(d.n))return;const now=Date.now();if(now-(c.frqT||0)<2500)return;c.frqT=now;const want=new Set(d.n.slice(0,50).map(x=>String(x).slice(0,24)));const L=[];
    for(const o of clients){if(!o.p||o===c||!want.has(o.p.n))continue;L.push([o.p.n,o.p.cls,o.p.lv,o.p.mp,Math.round(o.p.x),Math.round(o.p.y),o.uid||'',o.p.aw?1:0]);if(L.length>=50)break}
    send(c,JSON.stringify({t:'emit',k:'frr',d:{mp,d:{L}},from:0}));return}
  if(k==='frm'){if(!d||typeof d!=='object')return;const op=String(d.op||'');if(!/^(req|acc|dec|del|w)$/.test(op))return;const now=Date.now();c.frB=Math.min(6,(c.frB==null?6:c.frB)+(now-(c.frT||now))/2000);c.frT=now;if(c.frB<1)return;c.frB--;
    const tn=String(d.toN||'').slice(0,24);let o=typeof d.to==='string'?byUid.get(d.to):null;if(o&&(!o.p||(tn&&o.p.n!==tn)))o=null;if(!o&&tn){for(const x of clients)if(x!==c&&x.p&&x.p.n===tn){o=x;break}}
    if(!o||o===c||!o.p){if(op==='req'||op==='w')send(c,JSON.stringify({t:'emit',k:'frm',d:{mp,d:{op:'off',toN:tn}},from:0}));return}
    const out={op,from:c.uid||'',n:c.p.n,c:c.p.cls,lv:c.p.lv};if(op==='w'){out.t=String(d.t||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,80);if(!out.t)return}
    send(o,JSON.stringify({t:'emit',k:'frm',d:{mp:o.p.mp,d:out},from:c.id}));return}
  if(k==='gdo'){try{gdOp(c,d)}catch(e){console.error('guild',e.message)}return}
  if(k==='lbq'){const out={};for(const key in LB)out[key]=LB[key].slice(0,(key==='wb'||/^s\d{4}$/.test(key))?30:10).map(r=>[r.n,r.c,r.l,r.t,r.p]);send(c,JSON.stringify({t:'emit',k:'lbr',d:{mp,d:out},from:0}));return}
  if(k==='mvq'){send(c,JSON.stringify({t:'emit',k:'mvr',d:{mp,d:mvTable()},from:0}));return}
  if(k==='mva'||k==='mvd'||k==='mvk'||k==='mvlost'){const V=MV[mp];if(!V)return;const now=Date.now();
    if(k==='mva'){if(host!==c||V.alive)return;const id=+(d&&d.id)||0;if(!id)return;V.alive=1;V.id=id;V.dm={};V.ask=0;V.empty=0;mvDirty=true;mvAll({s:'sp',mp});return}
    if(k==='mvd'){if(!V.alive||!d||+d.id!==V.id||!c.uid)return;const x=Math.max(0,Math.min(5e6,+d.d||0));const r=V.dm[c.uid]||(V.dm[c.uid]={n:c.p.n,c:c.p.cls,l:c.p.lv,d:0});r.d+=x;r.n=c.p.n;r.c=c.p.cls;return}
    if(k==='mvk'){if(!V.alive||host!==c||!d||+d.id!==V.id)return;const arr=Object.entries(V.dm).sort((a,b)=>b[1].d-a[1].d),w=arr[0];
      V.alive=0;V.id=0;V.next=now+MVDEF[mp]*60000;V.k=(V.k|0)+1;if(w)V.last={n:w[1].n,c:w[1].c,l:w[1].l,d:Math.round(w[1].d),at:now};mvDirty=true;
      mvAll({s:'kill',mp,w:w?{u:w[0],n:w[1].n,c:w[1].c,d:Math.round(w[1].d)}:null,top:arr.slice(0,5).map(([u,r])=>[r.n,r.c,Math.round(r.d)])});return}
    if(k==='mvlost'){if(!V.alive||host!==c)return;V.alive=0;V.id=0;V.next=now;V.ask=0;return}}
  if(k==='hit'){if(host&&host!==c&&Array.isArray(d))send(host,wrap(d.slice(0,80)));return}
  if(k==='world'){
    if(host!==c||!d||!Array.isArray(d.m)||d.m.length>3000)return;if(d.wm!==undefined&&+d.wm!==+mp)return;c.lastW=Date.now();
    const dgs=d.dg&&typeof d.dg==='object'?{ph:String(d.dg.ph).slice(0,6),w:d.dg.w|0,tl:+d.dg.tl||0,nx:+d.dg.nx||0,why:String(d.dg.why||'').slice(0,40)}:0;
    if(dgs&&d.dg.tw&&typeof d.dg.tw==='object'){const t=d.dg.tw;dgs.tw={f:num(t.f|0,1,9999,1),ft:String(t.ft||'').slice(0,8),k:+t.k||0,kn:+t.kn||0,af:Array.isArray(t.af)?t.af.slice(0,3).map(x=>num(x|0,0,4,0)):[],ch:t.ch|0}}
    for(const o of inMap(mp)){if(o===c)continue;const ox=o.p.x,oy=o.p.y,rows=[];
      for(const r of d.m){if(r[4]===3||r[4]===4||d2(r[1],r[2],ox,oy)<R_WORLD*R_WORLD)rows.push(r)}
      send(o,JSON.stringify({t:'emit',k,d:{mp,d:{wm:mp,m:rows,g:d.g,c:d.c,w:d.w,o:d.o,dg:dgs}},from:c.id}),true)}
    return}
  if(k==='dmg'){if(host!==c||!Array.isArray(d))return;const by=new Map();
    for(const e of d.slice(0,120)){if(!Array.isArray(e))continue;const o=byUid.get(e[0]);if(o&&o.p&&o.p.mp===mp){if(!by.has(o))by.set(o,[]);by.get(o).push(e)}}
    for(const [o,arr] of by)send(o,wrap(arr));return}
  if(k==='xp'){if(host!==c||!Array.isArray(d))return;
    for(const o of inMap(mp)){if(o===c)continue;const arr=d.filter(e=>Array.isArray(e)&&d2(e[0],e[1],o.p.x,o.p.y)<R_XP*R_XP);if(arr.length)send(o,wrap(arr))}return}
  if(k==='fx'){if(!d||typeof d!=='object')return;if(d.k==='tb'&&c!==host)return;const s=wrap(d),all=d.k==='msg'||d.k==='tb',hostOnly=d.k==='taunt'||d.k==='fog'||d.k==='frost'||d.k==='pin'||d.k==='tstop'||d.k==='mtrapx'||d.k==='rift'||d.k==='stun';
    for(const o of inMap(mp)){if(o===c)continue;
      if(all||(hostOnly&&o===host)||d2(d.x,d.y,o.p.x,o.p.y)<R_FX*R_FX)send(o,s)}return}
  if(k==='reset'){const now=Date.now();RSTT[mp]=RSTT[mp]||0;if(now-RSTT[mp]<20000)return;RSTT[mp]=now}
  if(k==='reset'||k==='dinv'){const s=wrap(d);for(const o of inMap(mp))if(o!==c)send(o,s);return}
  if(k==='dgo'){if(host&&host!==c)send(host,wrap({}));return}
}
/* ===== บอส MVP: เซิร์ฟเวอร์เป็นคนจับเวลาเกิด/ตาย และนับดาเมจหาผู้ได้ MVP ===== */
const MVDEF={8:60,10:60,18:60,22:60},MVF=path.join(DATA_DIR,'mvp.json');let MV={},mvDirty=false;
{let j={};try{j=JSON.parse(fs.readFileSync(MVF,'utf8'))||{}}catch(e){}const now=Date.now();
  for(const k in MVDEF){const o=j[k]||{};MV[k]={next:process.env.MVP_FAST?now:Math.max(+o.next||0,now+(60+Math.random()*240)*1000),k:o.k|0,last:o.last||null,alive:0,id:0,dm:{},ask:0,empty:0}}}
setInterval(()=>{if(!mvDirty)return;mvDirty=false;const o={};for(const k in MV){const v=MV[k];o[k]={next:v.next,k:v.k,last:v.last}}wj(MVF,o)},15000);
function mvAll(o){const s=JSON.stringify({t:'emit',k:'mvn',d:{mp:0,d:o},from:0});for(const c of clients)if(c.p)send(c,s)}
function mvTable(){const now=Date.now(),o={};for(const k in MV){const v=MV[k];o[k]={in:v.alive?0:Math.max(0,Math.round((v.next-now)/1000)),al:v.alive?1:0,k:v.k,last:v.last,n:countByMap[k]||0}}return o}
setInterval(()=>{const now=Date.now();for(const k in MV){const v=MV[k],mp=+k;
  if(v.alive){if(!(countByMap[mp]>0)){if(!v.empty)v.empty=now;else if(now-v.empty>90000){v.alive=0;v.id=0;v.next=now;v.empty=0}}else v.empty=0;continue}
  if(now<v.next)continue;const h=hostByMap[mp];if(!h)continue;if(v.ask&&now-v.ask<8000)continue;v.ask=now;
  send(h,JSON.stringify({t:'emit',k:'mvsp',d:{mp,d:{}},from:0}))}},2000);
/* ===== ตลาดกลาง: เก็บรายการขาย เงินที่ขายได้ และของที่หมดเวลา ===== */
const MKF=path.join(DATA_DIR,'market.json');let MK={n:1,L:[],sales:{},ret:{}},mkDirty=false;
try{const j=JSON.parse(fs.readFileSync(MKF,'utf8'));if(j&&Array.isArray(j.L))MK=Object.assign(MK,j)}catch(e){}
if(!MK.ep){MK.ep=crypto.randomBytes(6).toString('hex');mkDirty=true}/* ep เปลี่ยน = ข้อมูลตลาดชุดเดิมหายไป ผู้เล่นจะได้ของที่ฝากขายคืนจากสำเนาในเซฟ */
setInterval(()=>{const now=Date.now();MK.L=MK.L.filter(x=>{if(now-x.at>48*3600e3){(MK.ret[x.u]=MK.ret[x.u]||[]).push({k:x.k,d:x.d});mkDirty=true;return false}return true});if(!mkDirty)return;mkDirty=false;wj(MKF,MK)},15000);
function mkOk(k,d){if(k==='it')return!!d&&typeof d==='object'&&typeof d.sl==='string'&&d.sl.length<3&&!!d.st&&typeof d.st==='object'&&JSON.stringify(d).length<700;if(k==='cd')return typeof d==='string'&&/^[a-z]{2,5}$/.test(d);if(k==='st')return!!d&&typeof d==='object'&&/^(hp|mp|ps|s1|s2|s3|twc|sc|hr|fe|sf|ec|nt|rs|o1|o2|o3|gm|h1|h2|h3|rt|d[1-8])$/.test(d.k)&&(d.n|0)>=1&&(d.n|0)<=999;return false}
/* ===== กล่องจดหมาย: เก็บตามรหัสตัวละครถาวร (mid) · 50 ฉบับต่อกล่อง · 30 วัน (ของแนบที่ไม่ได้รับจะตีกลับผู้ส่ง) ===== */
const MLF=path.join(DATA_DIR,'mail.json'),ML_MAX=50,ML_TTL=30*864e5,ML_DAY=60;let ML={n:1,b:{},tk:{},dy:{},dk:''},mlDirty=false;
try{const j=JSON.parse(fs.readFileSync(MLF,'utf8'));if(j&&typeof j==='object'&&j.b&&typeof j.b==='object')ML=Object.assign(ML,j)}catch(e){}
const mlFee=g=>50+Math.floor(g*.01);
function mlBox(mid){return ML.b[mid]||(ML.b[mid]=[])}
function mlTrim(mid){const T=ML.tk[mid];if(!T)return;const ks=Object.keys(T);if(ks.length>40)ks.slice(0,ks.length-40).forEach(x=>delete T[x])}
function mlList(mid,tk){const B=ML.b[mid]||[];return{L:B.slice(-ML_MAX).map(x=>({id:x.id,fn:x.fn,fc:x.fc||'',tn:x.tn||'',t:x.t||'',a:x.a||null,g:x.g|0,at:x.at,rd:x.rd?1:0,rt:x.rt?1:0})),tk:tk||{},sent:ML.dy[mid]|0,day:ML_DAY}}
function mlNotify(mid,nm,x){let o=byMid.get('m:'+mid);if(!o||!o.p||o.p.n!==nm){o=null;for(const q of clients)if(q.p&&q.p.n===nm){o=q;break}}if(o)mkReply(o,'mln',{fn:x.fn,rt:x.rt?1:0,n:(ML.b[mid]||[]).filter(q=>!q.rd).length,a:x.a||x.g>0?1:0})}
setInterval(()=>{const now=Date.now(),dk=new Date(now+7*3600e3).toISOString().slice(0,10);if(ML.dk!==dk){ML.dk=dk;ML.dy={};mlDirty=true}
  for(const mid of Object.keys(ML.b)){const B=ML.b[mid];for(let i=B.length-1;i>=0;i--){const x=B[i];if(now-x.at<ML_TTL)continue;B.splice(i,1);mlDirty=true;
      if((x.a||x.g>0)&&!x.rt&&x.fm){const S=mlBox(x.fm);if(S.length<ML_MAX+10)S.push({id:ML.n++,fn:x.tn||'?',fc:'',fm:'',tn:'',t:'',a:x.a||null,g:x.g|0,at:now,rd:0,rt:1})}}
    if(!B.length)delete ML.b[mid]}
  if(!mlDirty)return;mlDirty=false;wj(MLF,ML)},15000);
function mkReply(c,k,d){send(c,JSON.stringify({t:'emit',k,d:{mp:c.p?c.p.mp:0,d},from:0}))}
/* เวอร์ชันเซิร์ฟเวอร์ (เปิด /version เช็กว่า Render ใช้โค้ดล่าสุดแล้ว) */
/* ===== v425 กิลด์ (เซิร์ฟเวอร์เก็บข้อมูลจริง · ระบุตัวด้วย mid ของตัวละคร + ชื่อต้องตรงกับที่บันทึก) =====
   GD.g[id] = {id,nm,tag,e,col,lead,mem:{mid:{n,c,lv,r(2 หัวหน้า/1 รอง/0 สมาชิก),at}},cr,lvl,nt,iv:{ชื่อ:เวลา},wk:{k,p:{k,b,g},ct:{mid:n},cl:{mid:1},done},log:[{n,t,at}]}
   GD.by[mid] = id กิลด์ · ข้อความเข้า 'gdo' {op,mid,...} → ตอบ 'gdr' (สถานะกิลด์) / 'gdn' (แจ้งเตือน) */
const GDF=path.join(DATA_DIR,'guild.json'),GDMAX=30,GDEMB=['⚔️','🛡️','🏹','🔮','🐉','🦅','🐺','🌙','☀️','🔥','❄️','🌸'],GDCN=8,GDLV=20,GDBASE=process.env.GD_FAST?{k:3,b:1,g:1}:{k:1500,b:10,g:120},GDMIN=process.env.GD_FAST?1:30;
let GD={n:1,g:{},by:{}},gdDirty=false;
try{const j=JSON.parse(fs.readFileSync(GDF,'utf8'));if(j&&typeof j==='object'&&j.g&&typeof j.g==='object')GD=Object.assign(GD,j)}catch(e){}
setInterval(()=>{if(!gdDirty)return;gdDirty=false;wj(GDF,GD)},15000);
const gdMidOk=m=>typeof m==='string'&&/^[a-z0-9]{8,16}$/.test(m);
const gdClean=(s,n)=>String(s||'').replace(/[\u0000-\u001f\u007f<>"'`\\]/g,'').replace(/\s+/g,' ').trim().slice(0,n);
const gdWeek=()=>{const d=new Date(Date.now()+7*3600e3),day=(d.getUTCDay()+6)%7;d.setUTCDate(d.getUTCDate()-day);return d.toISOString().slice(0,10)};
const gdGoal=G=>{const k=Math.max(1,Math.min(4,Object.keys(G.mem).length/5));return{k:Math.round(GDBASE.k*k),b:Math.round(GDBASE.b*k),g:Math.round(GDBASE.g*k)}};
function gdWk(G){const w=gdWeek();if(!G.wk||G.wk.k!==w){G.wk={k:w,p:{k:0,b:0,g:0},ct:{},cl:{},done:0};gdDirty=true}return G.wk}
function gdOf(mid){const id=GD.by[mid];const G=id&&GD.g[id];if(!G||!G.mem[mid]){if(id)delete GD.by[mid];return null}return G}
function gdOnline(mid){for(const o of clients)if(o.gmid===mid&&o.p&&!o.dead)return o;return null}
function gdTag(o){const m=o&&o.gmid;if(!m)return'';const G=gdOf(m);if(!G||!o.p||G.mem[m].n!==o.p.n)return'';return G.e+'|'+G.tag+'|'+G.col}
function gdView(G,mid){const W=gdWk(G),goal=gdGoal(G);return{id:G.id,nm:G.nm,tag:G.tag,e:G.e,col:G.col,lvl:G.lvl,nt:G.nt||'',lead:G.lead,me:mid,r:G.mem[mid]?G.mem[mid].r:0,max:GDMAX,
  mem:Object.keys(G.mem).map(m=>{const M=G.mem[m],o=gdOnline(m);return[m,M.n,o&&o.p?o.p.cls:M.c,o&&o.p?o.p.lv:M.lv,M.r,o?1:0,o&&o.p?o.p.mp:0,o&&o.p&&o.p.aw?1:0]}),
  wk:{k:W.k,p:W.p,goal,done:W.done?1:0,cl:W.cl[mid]?1:0,ct:W.ct[mid]|0},log:(G.log||[]).slice(-30)}}
function gdSend(o,k,d){mkReply(o,k,d)}
function gdCast(G,d,skip){for(const m in G.mem){const o=gdOnline(m);if(o&&o!==skip)gdSend(o,'gdn',d)}}
function gdRefresh(G){for(const m in G.mem){const o=gdOnline(m);if(o)gdSend(o,'gdr',{g:gdView(G,m),inv:[]})}}
function gdRemove(G,m){delete G.mem[m];delete GD.by[m];if(G.lead===m){const L=Object.keys(G.mem).sort((a,b)=>(G.mem[b].r-G.mem[a].r)||(G.mem[a].at-G.mem[b].at));if(L.length){G.lead=L[0];G.mem[L[0]].r=2}}
  if(!Object.keys(G.mem).length)delete GD.g[G.id];gdDirty=true}
function gdInvites(name){const L=[],now=Date.now();for(const id in GD.g){const G=GD.g[id],t=G.iv&&G.iv[name];if(t&&now-t<600000)L.push({id:G.id,nm:G.nm,tag:G.tag,e:G.e,col:G.col,n:Object.keys(G.mem).length})}return L}
function gdOp(c,d){if(!d||typeof d!=='object'||!c.p)return;const now=Date.now();c.gdB=Math.min(8,(c.gdB==null?8:c.gdB)+(now-(c.gdT||now))/700);c.gdT=now;if(c.gdB<1)return;c.gdB--;
  const op=String(d.op||''),mid=d.mid;if(!gdMidOk(mid))return;const name=c.p.n;let G=gdOf(mid);
  const no=s=>gdSend(c,'gdn',{t:'err',s});
  if(G&&G.mem[mid].n!==name){no('ชื่อตัวละครไม่ตรงกับในกิลด์');return}
  if(c.gmid!==mid){c.gmid=mid;if(G)gdCast(G,{t:'on',n:name},c)}
  if(G){const M=G.mem[mid];M.c=c.p.cls;M.lv=c.p.lv;gdWk(G)}
  if(op==='q'){gdSend(c,'gdr',{g:G?gdView(G,mid):null,inv:G?[]:gdInvites(name)});return}
  if(op==='mk'){if(G)return no('อยู่กิลด์อยู่แล้ว');if((c.p.lv|0)<GDLV)return no('ต้องเลเวล '+GDLV+' ขึ้นไป');
    const nm=gdClean(d.nm,16),tag=gdClean(d.tag,4).toUpperCase();if(nm.length<2)return no('ชื่อกิลด์ 2–16 ตัวอักษร');if(!/^[A-Z0-9ก-๙]{2,4}$/.test(tag))return no('ตราย่อ 2–4 ตัว (ตัวอักษร/ตัวเลข)');
    for(const id in GD.g){const X=GD.g[id];if(X.nm.toLowerCase()===nm.toLowerCase())return no('ชื่อกิลด์นี้มีคนใช้แล้ว');if(X.tag===tag)return no('ตราย่อนี้มีคนใช้แล้ว')}
    const id=GD.n++;G=GD.g[id]={id,nm,tag,e:GDEMB[(d.e|0)%GDEMB.length],col:Math.abs(d.col|0)%GDCN,lead:mid,mem:{},cr:now,lvl:1,nt:'',iv:{},log:[]};G.mem[mid]={n:name,c:c.p.cls,lv:c.p.lv,r:2,at:now};GD.by[mid]=id;gdWk(G);gdDirty=true;
    gdSend(c,'gdn',{t:'mk',ok:1,nm});gdSend(c,'gdr',{g:gdView(G,mid),inv:[]});return}
  if(op==='acc'||op==='dec'){const X=GD.g[d.id|0];if(!X||!X.iv||!X.iv[name])return no('คำเชิญหมดอายุแล้ว');delete X.iv[name];gdDirty=true;if(op==='dec')return gdSend(c,'gdr',{g:G?gdView(G,mid):null,inv:gdInvites(name)});
    if(G)return no('ออกจากกิลด์เดิมก่อน');if(Object.keys(X.mem).length>=GDMAX)return no('กิลด์เต็มแล้ว ('+GDMAX+' คน)');
    X.mem[mid]={n:name,c:c.p.cls,lv:c.p.lv,r:0,at:now};GD.by[mid]=X.id;gdDirty=true;gdCast(X,{t:'join',n:name},c);gdSend(c,'gdn',{t:'joined',nm:X.nm});gdRefresh(X);return}
  if(!G)return no('ยังไม่มีกิลด์');const me=G.mem[mid];
  if(op==='inv'){if(me.r<1)return no('เฉพาะหัวหน้า/รองหัวหน้าที่เชิญได้');if(Object.keys(G.mem).length>=GDMAX)return no('กิลด์เต็มแล้ว');const tn=gdClean(d.to,24);let o=null;for(const x of clients)if(x.p&&x.p.n===tn&&x!==c){o=x;break}
    if(!o)return no(tn+' ไม่ได้ออนไลน์');if(o.gmid&&gdOf(o.gmid))return no(tn+' อยู่กิลด์อื่นแล้ว');G.iv=G.iv||{};G.iv[tn]=now;gdDirty=true;
    gdSend(o,'gdn',{t:'inv',id:G.id,nm:G.nm,tag:G.tag,e:G.e,col:G.col,from:name});gdSend(c,'gdn',{t:'sent',n:tn});return}
  if(op==='lv'){gdRemove(G,mid);gdSend(c,'gdr',{g:null,inv:gdInvites(name)});gdSend(c,'gdn',{t:'left',nm:G.nm});if(GD.g[G.id]){gdCast(G,{t:'leave',n:name});gdRefresh(G)}return}
  if(op==='dis'){if(me.r<2)return no('เฉพาะหัวหน้ากิลด์');const L=Object.keys(G.mem);L.forEach(m=>delete GD.by[m]);delete GD.g[G.id];gdDirty=true;
    L.forEach(m=>{const o=gdOnline(m);if(o){gdSend(o,'gdn',{t:'dis',nm:G.nm});gdSend(o,'gdr',{g:null,inv:[]})}});return}
  const T=typeof d.t==='string'&&G.mem[d.t]?d.t:'';
  if(op==='kick'){if(!T||T===mid||G.mem[T].r>=me.r)return no('เตะได้เฉพาะคนที่ตำแหน่งต่ำกว่า');const tn=G.mem[T].n;gdRemove(G,T);const o=gdOnline(T);if(o){gdSend(o,'gdn',{t:'kicked',nm:G.nm});gdSend(o,'gdr',{g:null,inv:[]})}gdCast(G,{t:'kick',n:tn});gdRefresh(G);return}
  if(op==='rk'){if(me.r<2||!T||T===mid)return no('เฉพาะหัวหน้ากิลด์');G.mem[T].r=d.r?1:0;gdDirty=true;gdCast(G,{t:'rk',n:G.mem[T].n,r:G.mem[T].r});gdRefresh(G);return}
  if(op==='ld'){if(me.r<2||!T||T===mid)return no('เฉพาะหัวหน้ากิลด์');G.mem[T].r=2;me.r=1;G.lead=T;gdDirty=true;gdCast(G,{t:'ld',n:G.mem[T].n});gdRefresh(G);return}
  if(op==='set'){if(me.r<1)return no('เฉพาะหัวหน้า/รองหัวหน้า');if(typeof d.nt==='string')G.nt=gdClean(d.nt,80);if(me.r>=2){if(d.e!=null)G.e=GDEMB[Math.abs(d.e|0)%GDEMB.length];if(d.col!=null)G.col=Math.abs(d.col|0)%GDCN}gdDirty=true;gdRefresh(G);return}
  if(op==='ch'){const t=gdClean(d.s,80);if(!t)return;const now2=Date.now();if(now2-(c.gdC||0)<1200)return;c.gdC=now2;G.log=G.log||[];G.log.push({n:name,t,at:now2});if(G.log.length>40)G.log.splice(0,G.log.length-40);gdDirty=true;gdCast(G,{t:'ch',n:name,s:t,at:now2});return}
  if(op==='wk'){if(now-(c.gdW||0)<(process.env.GD_FAST?800:15000))return;c.gdW=now;const a=d.a&&typeof d.a==='object'?d.a:{},W=gdWk(G),add={k:Math.max(0,Math.min(150,a.k|0)),b:Math.max(0,Math.min(4,a.b|0)),g:Math.max(0,Math.min(25,a.g|0))};
    W.p.k+=add.k;W.p.b+=add.b;W.p.g+=add.g;W.ct[mid]=(W.ct[mid]|0)+add.k+add.b*20+add.g*3;gdDirty=true;const goal=gdGoal(G);
    if(!W.done&&W.p.k>=goal.k&&W.p.b>=goal.b&&W.p.g>=goal.g){W.done=1;const up=G.lvl<10;if(up)G.lvl++;gdCast(G,{t:'wkdone',lvl:G.lvl,up:up?1:0});gdRefresh(G)}return}
  if(op==='wkc'){const W=gdWk(G);if(!W.done)return no('ภารกิจกิลด์สัปดาห์นี้ยังไม่ครบ');if(W.cl[mid])return no('รับรางวัลสัปดาห์นี้ไปแล้ว');if((W.ct[mid]|0)<GDMIN)return no('ต้องช่วยภารกิจกิลด์สัปดาห์นี้ก่อน (แต้มช่วยอย่างน้อย '+GDMIN+')');
    W.cl[mid]=1;gdDirty=true;gdSend(c,'gdn',{t:'wkc',ok:1,lvl:G.lvl,k:W.k});gdSend(c,'gdr',{g:gdView(G,mid),inv:[]});return}
}
const SRV_V='v427';
function onMsg(c,raw){
  let m;try{m=JSON.parse(raw)}catch(e){return}
  if(!m||typeof m!=='object')return;
  const now=Date.now();if(now-c.last>1000){c.last=now;c.n=0}if(++c.n>400)return;c.rx=now;
  if(m.t==='presence'&&m.p&&typeof m.p==='object'){
    const p=cleanPresence(m.p);if(!p.uid)return;
    if(c.uid!==p.uid){const o=byUid.get(p.uid);if(o&&o!==c&&!o.dead){if(now-(o.rx||0)<5000)return;kill(o)}if(c.uid&&byUid.get(c.uid)===c)byUid.delete(c.uid);c.uid=p.uid;byUid.set(p.uid,c)}
    if(!c.p||c.p.mp!==p.mp)c.mapSince=Date.now();if(!c.p){try{stSeen(p)}catch(e){}}c.p=p}
  else if(m.t==='emit'){try{onEmit(c,m)}catch(e){console.error('emit error',m.k,e.message)}}
}
function parse(c){
  for(;;){const b=c.buf;if(b.length<2)return;
    const op=b[0]&15,masked=b[1]&128,rsv=b[0]&0x40;let len=b[1]&127,off=2;
    if(len===126){if(b.length<4)return;len=b.readUInt16BE(2);off=4}
    else if(len===127){if(b.length<10)return;len=Number(b.readBigUInt64BE(2));off=10}
    if(len>MAXMSG||!masked)return kill(c);
    if(b.length<off+4+len)return;
    const mk=b.subarray(off,off+4),data=Buffer.from(b.subarray(off+4,off+4+len));
    for(let i=0;i<len;i++)data[i]^=mk[i&3];
    c.buf=b.subarray(off+4+len);
    if(op===8){try{c.sock.write(frame(8,Buffer.alloc(0)))}catch(e){}return kill(c)}
    if(op===9)c.sock.write(frame(10,data));
    else if(op===10)c.alive=true;
    else if(op===1){let txt;if(rsv){if(!c.z)return kill(c);try{txt=zlib.inflateRawSync(Buffer.concat([data,TAIL]),{maxOutputLength:MAXMSG,finishFlush:zlib.constants.Z_SYNC_FLUSH}).toString('utf8')}catch(e){return kill(c)}}else txt=data.toString('utf8');onMsg(c,txt)}
    if(c.dead)return}
}
/* v426 กันก๊อป: รับ WebSocket เฉพาะหน้าเว็บของเราเอง (Origin ต้องตรงกับโฮสต์นี้) · เพิ่มเว็บอื่นได้ทาง env ALLOW_ORIGINS=https://a.com,https://b.com
   ไม่มีหัว Origin เลย (ไม่ใช่เบราว์เซอร์) = ปล่อยผ่าน เพราะปลอมได้อยู่แล้ว · Origin 'null' (ไฟล์ file://) = ปฏิเสธ */
const ALLOW_ORIGINS=String(process.env.ALLOW_ORIGINS||'').split(',').map(x=>x.trim().toLowerCase().replace(/\/+$/,'')).filter(Boolean);
function originOk(req){const o=req.headers.origin;if(o===undefined)return true;const ol=String(o).trim().toLowerCase();
  let h='';try{h=new URL(ol).host}catch(e){return false}if(!h)return false;
  if(h===String(req.headers.host||'').toLowerCase()||h===String(req.headers['x-forwarded-host']||'').split(',')[0].trim().toLowerCase())return true;
  return ALLOW_ORIGINS.includes(ol)||ALLOW_ORIGINS.includes(h)}
server.on('upgrade',(req,sock)=>{
  const key=req.headers['sec-websocket-key'];
  if(req.url==='/ws'&&key&&!originOk(req)){try{stDay().badOrigin=(stDay().badOrigin|0)+1}catch(e){}sock.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');return}
  if(req.url==='/ws'&&key&&clients.size>=MAX){try{stDay().full=(stDay().full|0)+1}catch(e){}}
  if(req.url!=='/ws'||!key||clients.size>=MAX){sock.end('HTTP/1.1 503 Service Unavailable\r\n\r\n');return}
  const acc=crypto.createHash('sha1').update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  const z=/permessage-deflate/i.test(String(req.headers['sec-websocket-extensions']||''));
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+acc+(z?'\r\nSec-WebSocket-Extensions: permessage-deflate; server_no_context_takeover; client_no_context_takeover':'')+'\r\n\r\n');
  sock.setNoDelay(true);
  const c={sock,z,id:nextId++,uid:null,p:null,known:new Map(),last:0,n:0,buf:Buffer.alloc(0),alive:true,dead:false,since:Date.now()};clients.add(c);
  sock.on('data',d=>{c.buf=Buffer.concat([c.buf,d]);parse(c)});
  sock.on('close',()=>kill(c));sock.on('error',()=>kill(c));
});
setInterval(()=>{for(const c of [...clients]){if(!c.alive){kill(c);continue}c.alive=false;try{c.sock.write(frame(9,Buffer.alloc(0)))}catch(e){}}},25000);
/* ===== หน้าผู้ดูแล /admin: สถิติผู้เล่น · ประวัติคนออนไลน์ · ตลาด · บอส · สุขภาพเซิร์ฟเวอร์ · ประกาศถึงทุกคน =====
   ตั้งรหัสด้วย Environment Variable ADMIN_KEY · เพิ่มรหัสผู้ดูแลคนอื่นได้ที่ ADMIN_KEY2, ADMIN_KEY3 (ไม่ตั้งเลย = ปิดหน้านี้) */
const ADMIN_KEYS=['ADMIN_KEY','ADMIN_KEY2','ADMIN_KEY3'].map(k=>String(process.env[k]||'').trim()).filter(Boolean),ADMIN_KEY=ADMIN_KEYS[0]||'',STF=path.join(DATA_DIR,'stats.json'),TZ=7*3600e3;
let ST={s:[],days:{},peak:{n:0,at:0}},stWin=0,stDirty=false;
try{const j=JSON.parse(fs.readFileSync(STF,'utf8'));if(j&&typeof j==='object'){ST.s=Array.isArray(j.s)?j.s:[];ST.days=j.days&&typeof j.days==='object'?j.days:{};ST.peak=j.peak||ST.peak}}catch(e){}
const dayKey=t=>new Date(t+TZ).toISOString().slice(0,10);
function stDay(){const k=dayKey(Date.now());return ST.days[k]||(ST.days[k]={peak:0,u:[],min:0,sess:0,full:0,hs:Array(24).fill(0),hn:Array(24).fill(0)})}
const onlineNow=()=>{let n=0;for(const c of clients)if(c.p)n++;return n};
function stSeen(p){const d=stDay();d.sess++;const h=crypto.createHash('sha1').update(String(p.n)+'|'+String(p.cls)).digest('base64').slice(0,10);if(!d.u.includes(h))d.u.push(h);stDirty=true}
setInterval(()=>{const now=Date.now(),n=onlineNow(),d=stDay();if(n>stWin)stWin=n;if(n>d.peak)d.peak=n;if(n>ST.peak.n)ST.peak={n,at:now}},5000);
setInterval(()=>{const now=Date.now(),n=onlineNow(),d=stDay(),h=new Date(now+TZ).getUTCHours();d.min+=n;d.hs[h]+=n;d.hn[h]++;stDirty=true},60000);
setInterval(()=>{const now=Date.now();ST.s.push([now,Math.max(stWin,onlineNow())]);stWin=0;const cut=now-7*864e5;while(ST.s.length&&ST.s[0][0]<cut)ST.s.shift();
  const keep=new Set(Object.keys(ST.days).sort().slice(-30));for(const k in ST.days)if(!keep.has(k))delete ST.days[k];stDirty=true},300000);
setInterval(()=>{if(!stDirty)return;stDirty=false;wj(STF,ST)},60000);
let cpuPrev=process.cpuUsage(),cpuAt=Date.now(),cpuPct=0,bwPrev=0,bwRate=0,msgPrev=0,msgRate=0;
setInterval(()=>{const u=process.cpuUsage(cpuPrev),now=Date.now();cpuPct=(u.user+u.system)/1000/(now-cpuAt)*100;cpuPrev=process.cpuUsage();cpuAt=now;bwRate=(bytesOut-bwPrev)/10;bwPrev=bytesOut;msgRate=(msgsOut-msgPrev)/10;msgPrev=msgsOut},10000);

/* ===== บัญชีเซฟตัวละครบนเซิร์ฟเวอร์: ชื่อบัญชี + PIN · ไฟล์ accounts.json + saves/<ชื่อ>.json (+ .bak รุ่นก่อนหน้า) ===== */
const ACF=path.join(DATA_DIR,'accounts.json'),SVD=path.join(DATA_DIR,'saves'),SVMAX=1200*1024;try{fs.mkdirSync(SVD,{recursive:true})}catch(e){}
let ACCS=Object.create(null),accDirty=false;try{Object.assign(ACCS,JSON.parse(fs.readFileSync(ACF,'utf8'))||{})}catch(e){}
setInterval(()=>{if(accDirty){accDirty=false;wj(ACF,ACCS)}},4000);
const ACFAIL=new Map(),ACREG=new Map(),ACLAST=new Map(),ACNF=new Map();let ACHASH={t:0,n:0},ACREGG={t:0,n:0};
function accHashSlot(){const now=Date.now();if(now-ACHASH.t>1000)ACHASH={t:now,n:0};return++ACHASH.n<=8}
const accName=a=>typeof a==='string'&&/^[a-z0-9][a-z0-9_]{2,19}$/.test(a)?a:null;
const accPinOk=p=>typeof p==='string'&&p.length>=4&&p.length<=32;
const accHash=(pin,salt)=>crypto.scryptSync(String(pin),salt,32).toString('hex');
const tkHash=t=>crypto.createHash('sha256').update(String(t)).digest('hex');
function accNewToken(A){const t=crypto.randomBytes(24).toString('hex');A.tk=(A.tk||[]).concat(tkHash(t)).slice(-6);return t}
function accAuth(a,t){const A=ACCS[a];if(!A||A.lock||typeof t!=='string'||t.length!==48)return null;const h=tkHash(t);return(A.tk||[]).includes(h)?A:null}
const svPath=a=>path.join(SVD,a+'.json');
function svRead(a){try{return JSON.parse(fs.readFileSync(svPath(a),'utf8'))}catch(e){return null}}
function svSum(d){let n=0,l=0;try{for(const k in d.chars){n++;l=Math.max(l,d.chars[k].lv|0)}}catch(e){}return{n,l}}
function accRoute(req,res){const H={'Content-Type':'application/json','Cache-Control':'no-store'};const J=(c,o)=>{res.writeHead(c,H);res.end(JSON.stringify(o))};
  if(req.method!=='POST')return J(405,{err:'post'});
  const act=req.url.slice(9).split('?')[0],ip=String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'').split(',')[0].trim(),now=Date.now();
  let body='',big=false;req.on('data',d=>{body+=d;if(body.length>SVMAX+4096){big=true;req.destroy()}});
  req.on('end',()=>{if(big)return;let q={};try{q=JSON.parse(body)||{}}catch(e){return J(400,{err:'json'})}
    const a=accName(String(q.a||'').toLowerCase().trim());if(!a)return J(400,{err:'name'});
    if(act==='register'||act==='login'){
      const fk=ip+'|'+a,f=ACFAIL.get(ip),f2=ACFAIL.get(fk);
      if((f&&f.n>=20&&now-f.t<15*60e3)||(f2&&f2.n>=6&&now-f2.t<15*60e3))return J(429,{err:'locked',wait:Math.ceil((15*60e3-(now-Math.max(f?f.t:0,f2?f2.t:0)))/1000)});
      {const nf=ACNF.get(a);if(nf&&nf.n>=10&&now-nf.t<15*60e3)return J(429,{err:'locked',wait:Math.ceil((15*60e3-(now-nf.t))/1000)})}
      if(!accPinOk(q.pin))return J(400,{err:'pin'});
      if(!accHashSlot())return J(429,{err:'busy',wait:2});
      if(act==='register'){if(ACCS[a])return J(409,{err:'taken'});
        const r=ACREG.get(ip);if(r&&r.n>=8&&now-r.t<3600e3)return J(429,{err:'many'});ACREG.set(ip,{n:(r&&now-r.t<3600e3?r.n:0)+1,t:r&&now-r.t<3600e3?r.t:now});if(ACREG.size>2000)ACREG.clear();
        if(now-ACREGG.t>3600e3)ACREGG={t:now,n:0};if(++ACREGG.n>150)return J(429,{err:'many'});
        const salt=crypto.randomBytes(12).toString('hex');const A=ACCS[a]={s:salt,h:accHash(q.pin,salt),c:now,l:now,tk:[]};const t=accNewToken(A);accDirty=true;console.log('สร้างบัญชี: '+a);return J(200,{ok:1,a,t,rev:0})}
      const A=ACCS[a];let ok=false;if(A){const h=accHash(q.pin,A.s);ok=h.length===A.h.length&&crypto.timingSafeEqual(Buffer.from(h),Buffer.from(A.h))}
      if(!ok){for(const k of[ip,fk]){const g=ACFAIL.get(k);const v=g&&now-g.t<15*60e3?g:{n:0,t:now};v.n++;v.t=now;ACFAIL.set(k,v)}if(ACFAIL.size>5000)ACFAIL.clear();if(A){const g=ACNF.get(a);const v=g&&now-g.t<15*60e3?g:{n:0,t:now};v.n++;v.t=now;ACNF.set(a,v);if(ACNF.size>5000)ACNF.clear()}return J(401,{err:A?'pin':'none'})}
      ACFAIL.delete(fk);ACNF.delete(a);if(A.lock)return J(403,{err:'lock'});A.l=now;const t=accNewToken(A);accDirty=true;const sv=svRead(a);return J(200,{ok:1,a,t,rev:sv?sv.rev|0:0})}
    const A=accAuth(a,q.t);if(!A)return J(401,{err:'auth'});
    if(act==='load'){const sv=svRead(a);A.l=now;accDirty=true;return J(200,{ok:1,rev:sv?sv.rev|0:0,data:sv?sv.data:null,at:sv?sv.at:0})}
    if(act==='save'){const d=q.data;if(!d||typeof d!=='object'||!d.chars||typeof d.chars!=='object')return J(400,{err:'data'});
      const lt=ACLAST.get(a)||0;if(now-lt<1500)return J(429,{err:'fast'});
      const sv=svRead(a),cur=sv?sv.rev|0:0;if((q.r|0)!==cur)return J(409,{err:'rev',rev:cur,data:sv?sv.data:null});ACLAST.set(a,now);if(ACLAST.size>5000)ACLAST.clear();
      const o={rev:cur+1,at:now,data:d},js=JSON.stringify(o);if(js.length>SVMAX)return J(413,{err:'size'});
      try{accInspect(a,A,sv,d,now)}catch(e){console.error('inspect',e.message)}
      const f=svPath(a);try{if(sv&&(!fs.existsSync(f+'.bak')||now-fs.statSync(f+'.bak').mtimeMs>30*60e3))fs.copyFileSync(f,f+'.bak')}catch(e){}
      const tmp=f+'.tmp';fs.writeFile(tmp,js,e=>{if(e)return J(500,{err:'disk'});fs.rename(tmp,f,e2=>{if(e2)return J(500,{err:'disk'});A.l=now;A.sz=js.length;const s=svSum(d);A.n=s.n;A.lv=s.l;accDirty=true;J(200,{ok:1,rev:o.rev})})});return}
    if(act==='logout'){const h=tkHash(q.t);A.tk=(A.tk||[]).filter(x=>x!==h);accDirty=true;return J(200,{ok:1})}
    J(404,{err:'act'})})}

/* ===== ตรวจเซฟหาความผิดปกติ (ติดธงให้ผู้ดูแลตรวจ · บัญชีที่มีธงค้างซื้อของในตลาดไม่ได้) ===== */
const FL_GOLD0=1e6,FL_GOLDM=2e5,FL_NEWG=3e8,FL_WIN=30*60e3;
function accFlag(a,A,f){A.fl=A.fl||[];f.at=Date.now();A.fl.unshift(f);if(A.fl.length>30)A.fl.length=30;A.fo=(A.fo|0)+1;accDirty=true;console.log('⚑ ธงบัญชี '+a+': '+f.k+' '+(f.n||f.s)+' '+f.v)}
function accInspect(a,A,sv,d,now){const old=sv&&sv.data&&sv.data.chars||{},mins=sv?Math.max(1,Math.min(180,(now-(sv.at||now))/60000)):1,EX=A.exp||{},CR=A.cr||{};
  for(const k in d.chars){const c=d.chars[k];if(!c||typeof c!=='object')continue;const o=old[k],g=Math.max(0,+c.gold||0),L=c.lv|0,cr=+CR[k]||0,nm=String(c.nm||'').slice(0,12);
    if(o&&o.cls===c.cls){A.gb=A.gb||{};let b=A.gb[k];if(!b||b.c!==c.cls||now-b.at>FL_WIN*4){b=A.gb[k]={g:Math.max(0,+o.gold||0),at:sv.at||now,cr:0,c:c.cls}}b.cr+=cr;
      const bm=Math.max(1,(now-b.at)/60000),gain=g-b.g-b.cr;if(gain>FL_GOLD0+FL_GOLDM*bm){accFlag(a,A,{k:'gold',s:k,n:nm,c:c.cls,v:Math.round(gain),m:Math.round(bm)});b.g=g;b.at=now;b.cr=0}
      else if(now-b.at>FL_WIN){b.g=Math.min(g,b.g+b.cr+FL_GOLDM*bm);b.at=now;b.cr=0}accDirty=true;
      const lg=L-(o.lv|0);if(L>=40&&!c.rb&&lg>=Math.max(8,mins*1.5))accFlag(a,A,{k:'lv',s:k,n:nm,c:c.cls,v:lg,m:Math.round(mins),L})}
    else if(g>=FL_NEWG)accFlag(a,A,{k:'new',s:k,n:nm,c:c.cls,v:Math.round(g),L});
    const ex=EX[k];if(ex){const em=Math.max(1,(now-ex.at)/60000);if(g-cr>ex.g+FL_GOLD0+FL_GOLDM*em)accFlag(a,A,{k:'buy',s:k,n:nm,c:c.cls,v:Math.round(g-ex.g),m:Math.round(em)})}}
  if(A.exp||A.cr){delete A.exp;delete A.cr;accDirty=true}}
/* ===== ตลาดต้องล็อกอินบัญชี: รหัสผู้ขายของตัวละคร (mid) ผูกกับบัญชี · ตรวจทองจากเซฟบนเซิร์ฟเวอร์ก่อนซื้อ ===== */
function mkGate(c,d,k){if(!d||typeof d!=='object'||!d.acc||typeof d.acc!=='object')return'acc';const a=accName(String(d.acc.a||'')),A=a&&accAuth(a,d.acc.t);if(!A)return'acc';
  const mid=typeof d.mid==='string'&&/^[a-z0-9]{8,16}$/.test(d.mid)?d.mid:'';if(!mid)return'acc';MK.own=MK.own||{};
  if(MK.own[mid]&&MK.own[mid]!==a)return'own';if(!MK.own[mid]){MK.own[mid]=a;mkDirty=true}
  c.accA=a;if((k==='mkl'||k==='mkb')&&A.mkban)return'ban';if(k==='mkb'&&(A.fo|0)>0)return'flag';return''}
function svChar(a,mid){const sv=svRead(a);if(!sv||!sv.data||!sv.data.chars)return null;for(const k in sv.data.chars){const ch=sv.data.chars[k];if(ch&&ch.mkid===mid)return{k,ch}}return null}
function accAdmin(act,q){const a=accName(String(q.a||'').toLowerCase().trim());if(!a||!ACCS[a])return{err:'ไม่พบบัญชี'};const A=ACCS[a];
  if(act==='accpin'){if(!accPinOk(String(q.pin||'')))return{err:'PIN ต้อง 4-32 ตัว'};A.s=crypto.randomBytes(12).toString('hex');A.h=accHash(String(q.pin),A.s);A.tk=[];accDirty=true;console.log('รีเซ็ต PIN: '+a);return{ok:1}}
  if(act==='accbak'){const f=svPath(a);try{const b=JSON.parse(fs.readFileSync(f+'.bak','utf8'));const sv=svRead(a);b.rev=(sv?sv.rev|0:0)+1;b.at=Date.now();fs.writeFileSync(f,JSON.stringify(b));const s=svSum(b.data);A.n=s.n;A.lv=s.l;accDirty=true;return{ok:1,n:s.n}}catch(e){return{err:'ไม่มีไฟล์สำรอง'}}}
  if(act==='accmod'){const op=String(q.op||'');
    if(op==='clear'){A.fo=0;(A.fl||[]).forEach(f=>f.ok=1)}
    else if(op==='mkban')A.mkban=1;else if(op==='mkunban')delete A.mkban;
    else if(op==='lock'){A.lock=1;A.tk=[]}else if(op==='unlock')delete A.lock;
    else if(op==='lban'){const sv=svRead(a);let n=0;if(sv&&sv.data&&sv.data.chars)for(const k in sv.data.chars){const ch=sv.data.chars[k];if(ch&&ch.nm){lbAdmin('lbban',{n:ch.nm,c:ch.cls,on:1});n++}}A.lban=1;accDirty=true;console.log('แบนอันดับจากบัญชี',a,n);return{ok:1,n}}
    else return{err:'op'};accDirty=true;console.log('จัดการบัญชี',a,op);return{ok:1}}
  return{err:'act'}}
function accTable(){const L=Object.keys(ACCS).map(a=>{const A=ACCS[a];return{a,c:A.c,l:A.l,n:A.n|0,lv:A.lv|0,sz:A.sz|0,fo:A.fo|0,fl:(A.fl||[]).slice(0,8),mb:A.mkban?1:0,lk:A.lock?1:0,lb:A.lban?1:0}}).sort((x,y)=>(y.fo>0)-(x.fo>0)||y.l-x.l);return{n:L.length,fo:L.filter(r=>r.fo>0).length,rows:L.slice(0,400)}}
const AFAIL=new Map();let AFALL={t:0,n:0};
function adminWho(req){const k=String(req.headers['x-admin-key']||''),a=crypto.createHash('sha256').update(k).digest();let who=0;ADMIN_KEYS.forEach((K,i)=>{const b=crypto.createHash('sha256').update(K).digest();if(crypto.timingSafeEqual(a,b))who=i+1});return who}
function adminOk(req){return ADMIN_KEYS.length>0&&adminWho(req)>0}
function adminData(){const now=Date.now(),pl=[];
  for(const c of clients){if(!c.p)continue;const p=c.p;pl.push({n:p.n,c:p.cls,l:p.lv,mp:p.mp,on:Math.round((now-c.since)/1000),inMap:Math.round((now-(c.mapSince||c.since))/1000),aw:p.aw?1:0,dead:p.hp<=0?1:0,host:hostByMap[p.mp]===c?1:0})}
  const days=Object.keys(ST.days).sort().slice(-30).map(k=>{const d=ST.days[k];return{d:k,peak:d.peak|0,u:(d.u||[]).length,min:d.min|0,sess:d.sess|0,full:d.full|0}});
  const today=stDay(),hours=today.hs.map((v,i)=>today.hn[i]?Math.round(v/today.hn[i]*10)/10:null);
  const mk={n:MK.L.length,val:MK.L.reduce((a,x)=>a+(x.p|0),0),sellers:new Set(MK.L.map(x=>x.u)).size,pend:Object.values(MK.sales||{}).reduce((a,v)=>a+Math.floor(v||0),0),ret:Object.values(MK.ret||{}).reduce((a,v)=>a+(Array.isArray(v)?v.length:0),0),
    recent:MK.L.slice(-12).reverse().map(x=>({n:x.n,k:x.k,d:x.k==='st'?x.d:x.k==='cd'?x.d:(x.d&&x.d.n)||'',p:x.p,at:x.at}))};
  const lb={};for(const k in LB){const hi=lbHi(k),A=LB[k];lb[k]={n:A.length,top:A[0]?{n:A[0].n,t:A[0].t}:null,hi,cap:+LBC.caps[k]||0,
    rows:A.map((r,i)=>{const nx=A[i+1];let fl=0;if(nx&&i<5){if(hi?r.t>nx.t*4&&r.t-nx.t>1000:r.t<nx.t*.4)fl=1}return{n:r.n,c:r.c,l:r.l,t:r.t,p:r.p,at:r.at,fl}})}}
  const lbc={ban:Object.values(LBC.ban),rej:LBC.rej.slice(0,20)};
  let disk=null;try{if(fs.statfsSync){const f=fs.statfsSync(DATA_DIR);disk={free:f.bavail*f.bsize,total:f.blocks*f.bsize}}}catch(e){}
  const mem=process.memoryUsage();
  return{now,online:pl.length,conn:clients.size,max:MAX,players:pl,byMap:countByMap,peak:ST.peak,today:{peak:today.peak,u:today.u.length,min:today.min,sess:today.sess,full:today.full|0},hours,days,samples:ST.s,
    mk,ml:{box:Object.keys(ML.b).length,n:Object.values(ML.b).reduce((a,v)=>a+v.length,0),att:Object.values(ML.b).reduce((a,v)=>a+v.filter(x=>x.a||x.g>0).length,0)},mvp:mvTable(),lb,lbc,acc:accTable(),chat:{n:CHL.length,today:CHL.filter(x=>dayKey(x.at)===dayKey(now)).length},srv:{up:Math.round(process.uptime()),rss:mem.rss,heap:mem.heapUsed,cpu:Math.round(cpuPct*10)/10,bw:Math.round(bwRate),msg:Math.round(msgRate),node:process.version,names:Object.keys(NM).length,dataDir:DATA_DIR,persist:!!process.env.DATA_DIR,disk}}}
function adminRoute(req,res){const H={'Cache-Control':'no-store','X-Robots-Tag':'noindex','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer'};
  if(req.url==='/admin'||req.url==='/admin/'){return fs.readFile(path.join(__dirname,'admin.html'),(e,b)=>{if(e){res.writeHead(404,H);return res.end('missing admin.html')}res.writeHead(200,Object.assign({'Content-Type':'text/html; charset=utf-8',"Content-Security-Policy":"default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:"},H));res.end(b)})}
  const J=(code,o)=>{res.writeHead(code,Object.assign({'Content-Type':'application/json'},H));res.end(JSON.stringify(o))};
  if(!ADMIN_KEYS.length)return J(503,{err:'nokey'});
  const ip=String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'').split(',')[0].trim(),now=Date.now(),f=AFAIL.get(ip);
  if(f&&f.n>=8&&now-f.t<10*60e3)return J(429,{err:'locked',wait:Math.ceil((10*60e3-(now-f.t))/1000)});
  if(AFALL.n>=40&&now-AFALL.t<10*60e3)return J(429,{err:'locked',wait:Math.ceil((10*60e3-(now-AFALL.t))/1000)});
  if(!adminOk(req)){const g=f&&now-f.t<10*60e3?f:{n:0,t:now};g.n++;g.t=now;AFAIL.set(ip,g);if(now-AFALL.t>10*60e3)AFALL={t:now,n:0};if(++AFALL.n===40)console.log('⚠️ มีการเดารหัสผู้ดูแลผิดเกิน 40 ครั้ง · ล็อกหน้า admin 10 นาที');if(AFAIL.size>500)AFAIL.clear();return J(401,{err:'bad'})}
  AFAIL.delete(ip);
  if(req.url.startsWith('/admin/api'))return J(200,adminData());
  if(req.url.startsWith('/admin/chat'))return J(200,chatQuery(new URL(req.url,'http://x').searchParams));
  if(req.method!=='POST')return J(405,{err:'post'});
  const act=req.url.slice(7).split('?')[0];const who=adminWho(req);
  let body='';req.on('data',d=>{body+=d;if(body.length>2000)req.destroy()});req.on('end',()=>{let q={};try{q=JSON.parse(body)||{}}catch(e){}console.log('[ผู้ดูแล #'+who+'] '+act+' '+JSON.stringify(q).replace(/"pin":"[^"]*"/,'"pin":"***"').slice(0,160));
    if(act==='ann'){let t=String(q.t||'').replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,120);if(!t)return J(400,{err:'empty'});
      const s=JSON.stringify({t:'emit',k:'ann',d:{mp:0,d:{t}},from:0});try{CHL.push({id:++chId,at:Date.now(),n:'📢 ประกาศ (ผู้ดูแล)',t,mp:0,c:'',l:0,a:1});chDirty=true}catch(e){}let n=0;for(const c of clients){if(c.p){send(c,s);n++}}console.log('ประกาศ: '+t);return J(200,{ok:1,n})}
    if(act==='lbdel'||act==='lbban'||act==='lbcap')return J(200,lbAdmin(act,q));
    if(act==='chdel'||act==='chdeln'||act==='chclear')return J(200,chAdmin(act,q));
    if(act==='accpin'||act==='accbak'||act==='accmod')return J(200,accAdmin(act,q));
    J(404,{err:'act'})})}
/* ===== จองชื่อตัวละคร: หนึ่งชื่อใช้ได้ตัวละครเดียวทั้งเซิร์ฟเวอร์ (ผูกกับรหัสตัวละครถาวร mid) · ไม่ได้ใช้ 90 วันปล่อยคืน ===== */
const NMF=path.join(DATA_DIR,'names.json'),NM_TTL=90*864e5;let NM={},nmDirty=false;
try{const j=JSON.parse(fs.readFileSync(NMF,'utf8'));if(j&&typeof j==='object')NM=j}catch(e){}
setInterval(()=>{if(!nmDirty)return;nmDirty=false;wj(NMF,NM)},15000);
const nmClean=v=>String(v==null?'':v).replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,12);
const nmKey=v=>nmClean(v).toLowerCase().normalize('NFC').replace(/[\s​-‏⁠﻿]/g,'');
const NM_BAD=['gm','admin','ผู้ดูแล','แอดมิน','ระบบ','ประกาศ','📢ประกาศ','ผู้เล่น'];
function nameReq(c,d){if(!d||typeof d!=='object')return;const t=String(d.t||'').slice(0,12),op=d.op==='chk'?'chk':'claim',n=nmClean(d.n),key=nmKey(n),mid=typeof d.mid==='string'&&/^[a-z0-9]{8,16}$/.test(d.mid)?d.mid:'';
  const reply=o=>send(c,JSON.stringify({t:'emit',k:'nmr',d:{mp:0,d:Object.assign({t,n},o)},from:0}));
  const now=Date.now();c.nmN=(c.nmT&&now-c.nmT<60000?c.nmN:0)+1;if(!c.nmT||now-c.nmT>=60000)c.nmT=now;if(c.nmN>20)return reply({ok:0,why:'busy'});
  if(!key||!mid)return reply({ok:0,why:'bad'});
  if(NM_BAD.includes(key))return reply({ok:0,why:'reserved'});
  const cur=NM[key];const free=!cur||cur.mid===mid||now-(cur.at||0)>NM_TTL;
  if(!free)return reply({ok:0,why:'taken'});
  if(op==='chk')return reply({ok:1});
  for(const k in NM)if(k!==key&&NM[k].mid===mid)delete NM[k];
  NM[key]={n,mid,at:now};nmDirty=true;
  const ks=Object.keys(NM);if(ks.length>60000){ks.sort((a,b)=>NM[a].at-NM[b].at).slice(0,ks.length-60000).forEach(k=>delete NM[k])}
  reply({ok:1})}
/* ===== บันทึกแชท: เก็บ 3000 ข้อความล่าสุดลงดิสก์ (chatlog.json) ให้ผู้ดูแลอ่านในหน้า /admin ===== */
const CHF=path.join(DATA_DIR,'chatlog.json'),CHMAX=3000;let CHL=[],chDirty=false;
try{const j=JSON.parse(fs.readFileSync(CHF,'utf8'));if(Array.isArray(j))CHL=j.slice(-CHMAX)}catch(e){}
let chId=CHL.reduce((m,x)=>Math.max(m,x.id|0),0);CHL.forEach(x=>{if(!x.id)x.id=++chId});
function chAll(d){const s=JSON.stringify({t:'emit',k:'chdel',d:{mp:0,d},from:0});for(const c of clients)if(c.p)send(c,s)}
function chAdmin(act,q){const n0=CHL.length;
  if(act==='chdel'){const id=q.id|0,x=CHL.find(x=>x.id===id);if(!x)return{err:'ไม่พบข้อความ'};CHL=CHL.filter(y=>y!==x);chDirty=true;chAll({n:x.n,t:x.t});return{ok:1,n:1}}
  if(act==='chdeln'){const n=String(q.n||'');if(!n)return{err:'name'};CHL=CHL.filter(y=>y.n!==n);chDirty=true;chAll({n});return{ok:1,n:n0-CHL.length}}
  if(act==='chclear'){CHL=[];chDirty=true;chAll({all:1});return{ok:1,n:n0}}
  return{err:'act'}}
setInterval(()=>{if(!chDirty)return;chDirty=false;wj(CHF,CHL)},30000);
function chatLog(c,pl){if(!pl||typeof pl!=='object')return;const t=String(pl.t||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,80);if(!t)return;
  const p=c.p||{},n=String(p.n||pl.n||'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,12)||'ผู้เล่น';
  CHL.push({id:++chId,at:Date.now(),n,t,mp:p.mp|0,c:String(p.cls||'').slice(0,8),l:p.lv|0});if(CHL.length>CHMAX)CHL.splice(0,CHL.length-CHMAX);chDirty=true}
function chatQuery(q){const n=Math.max(1,Math.min(500,+q.get('n')||150)),before=+q.get('before')||Infinity,s=String(q.get('q')||'').trim().toLowerCase().slice(0,40);
  const out=[];for(let i=CHL.length-1;i>=0&&out.length<n;i--){const x=CHL[i];if(x.at>=before)continue;if(s&&!(x.t.toLowerCase().includes(s)||x.n.toLowerCase().includes(s)))continue;out.push(x)}
  return{items:out,total:CHL.length,more:out.length===n}}
function stats(){return{clients:clients.size,countByMap,bytesOut,msgsOut,uptime:Math.round(process.uptime())}}
function flushAll(){try{wjSync(ACF,ACCS)}catch(e){}try{wjSync(CHF,CHL)}catch(e){}try{wjSync(LBCF,LBC)}catch(e){}try{wjSync(NMF,NM)}catch(e){}try{wjSync(STF,ST)}catch(e){}wjSync(LBF,LB);{const o={};for(const k in MV){const v=MV[k];o[k]={next:v.next,k:v.k,last:v.last}}wjSync(MVF,o)}wjSync(MKF,MK);try{wjSync(GDF,GD)}catch(e){}try{wjSync(MLF,ML)}catch(e){}}
for(const sig of['SIGTERM','SIGINT'])process.on(sig,()=>{console.log('ปิดเซิร์ฟเวอร์: บันทึกข้อมูล...');flushAll();process.exit(0)});
process.on('uncaughtException',e=>{console.error('uncaught (เซิร์ฟเวอร์ยังทำงานต่อ):',e&&e.stack||e)});
server.listen(PORT,()=>console.log('listening on '+PORT+' (สูงสุด '+MAX+' คน)'));
