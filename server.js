// เซิร์ฟเวอร์กลางของเกม: เสิร์ฟหน้าเกม + ส่งต่อข้อความ (ไม่มีลอจิกเกมในนี้)
// รองรับผู้เล่นจำนวนมากด้วยการส่งเฉพาะข้อมูลที่อยู่ใกล้ผู้เล่นแต่ละคน ไม่ต้องติดตั้งไลบรารีเพิ่ม
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto'),zlib=require('zlib');
const PORT=process.env.PORT||3000, MAX=Number(process.env.MAX_PLAYERS||120), MAXMSG=256*1024;
const R_PEER=650, R_WORLD=480, R_XP=420, R_FX=520, MAXPEERS=40, BUFCAP=1<<20;
const page=path.join(__dirname,'public','index.html');
const server=http.createServer((req,res)=>{
  if(req.url==='/health'){res.writeHead(200);return res.end('ok')}
  if(req.url==='/admin'||req.url.startsWith('/admin/'))return adminRoute(req,res);
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
  cls:String(p.cls||'').slice(0,8),n:String(p.n||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,24),lv:num(p.lv|0,1,99,1),sl:p.sl?1:0,mp:num(p.mp|0,1,99999,1),hd:num(p.hd|0,0,239,0),bt:num(p.bt|0,0,239,0),wp:num(p.wp|0,0,239,0),wu:num(p.wu|0,0,30,0),im:num(p.im|0,0,3,0),ar:num(p.ar|0,0,239,0),tt:String(p.tt||'').replace(/[^a-z0-9]/gi,'').slice(0,8),c2:num(p.c2|0,0,2,0),aw:p.aw?1:0,at:num(p.at|0,0,99,0),mt:num(p.mt|0,0,9,0),pt:num(p.pt|0,0,9,0),sw:p.sw?1:0}}
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
      const ex=[p.wp,p.ar,p.c2,p.mt,p.wu,p.pt,p.im,p.sw|0];
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
const lbHi=key=>key==='wb'||key==='pv';
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
  if(act==='lbcap'){if(!/^(m[1-4678]|m10|d[1-37]|tw|wb|pv)$/.test(key))return{ok:0};const v=Math.max(0,+q.v||0);if(v)LBC.caps[key]=v;else delete LBC.caps[key];
    let n=0;if(v){const hi=lbHi(key),b=(LB[key]||[]).length;LB[key]=(LB[key]||[]).filter(r=>{const c=lbCapFor(key,r.l);return!(c&&(hi?r.t>c:r.t<c))});n=b-LB[key].length;if(n)lbDirty=true}
    lbcSave();return{ok:1,removed:n}}
  return{ok:0}}
function lbDedupe(){let ch=false;for(const key in LB){const arr=LB[key];if(!Array.isArray(arr))continue;const hi=lbHi(key),best=new Map();
  for(const r of arr){const id=lbId(r),o=best.get(id);if(!o||(hi?r.t>o.t:r.t<o.t))best.set(id,r)}
  const out=[...best.values()].sort((a,b)=>hi?b.t-a.t:a.t-b.t);if(out.length!==arr.length)ch=true;LB[key]=out}return ch}
try{const j=JSON.parse(fs.readFileSync(LBF,'utf8'));if(j&&typeof j==='object')LB=j}catch(e){}
if(lbDedupe()){lbDirty=true;console.log('ตารางอันดับ: รวมแถวซ้ำของตัวละครเดียวกันแล้ว')}
setInterval(()=>{if(!lbDirty)return;lbDirty=false;wj(LBF,LB)},10000);
function onEmit(c,m){
  const k=m.k,pl=m.d;if(typeof k!=='string'||k.length>12)return;
  if(k==='chat'){const s=JSON.stringify({t:'emit',k,d:pl,from:c.id});for(const o of clients)if(o!==c)send(o,s);try{chatLog(c,pl)}catch(e){}return}
  if(k==='nmq'){nameReq(c,pl&&pl.d);return}
  if(!c.p||!pl||typeof pl!=='object')return;
  const mp=c.p.mp,d=pl.d,host=hostByMap[mp];
  const wrap=x=>JSON.stringify({t:'emit',k,d:{mp,d:x},from:c.id});
  if(k==='lbs'){if(!d||typeof d!=='object')return;const key=String(d.k||'');if(!/^(m[1-4678]|m10|d[1-37]|tw|wb|pv)$/.test(key))return;const hi=key==='wb'||key==='pv',t=+d.t;if(hi?!(t>=1&&t<1e12):!(t>=5&&t<36000))return;
    const row={n:String(d.n||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,12)||'ผู้เล่น',c:String(d.cls||'').slice(0,8),l:num(d.lv|0,1,99,1),t:hi?Math.round(t):Math.round(t*10)/10,p:num(d.pc|0,1,99,1),u:c.uid||'',at:Date.now()};
    {const why=lbBlock(key,row,hi);if(why){lbRej(key,row,why);return}}
    const arr=LB[key]||(LB[key]=[]),i=arr.findIndex(r=>lbId(r)===lbId(row));if(i>=0){if(hi?arr[i].t>=row.t:arr[i].t<=row.t)return;arr.splice(i,1)}
    arr.push(row);arr.sort((a,b)=>hi?b.t-a.t:a.t-b.t);if(arr.length>50)arr.length=50;lbDirty=true;return}
  if(k==='trade'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c&&o.p&&o.p.mp===mp){d.from=c.uid||d.from;send(o,wrap(d))}return}
  if(k==='pvc'||k==='pva'||k==='pvn'||k==='pvh'||k==='pvd'||k==='pvt'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c){d.from=c.uid||'';send(o,wrap(d))}return}
  if(k==='mkq'){const u=mkOwner(c,d);mkReply(c,'mkr',{L:MK.L.slice(-150).map(x=>({id:x.id,k:x.k,d:x.d,p:x.p,n:x.n,me:x.u===u?1:0})),sale:Math.floor(MK.sales[u]||0),ret:(MK.ret[u]||[]).length,ep:MK.ep,mine:MK.L.filter(x=>x.u===u).map(x=>x.id)});return}
  if(k==='mkl'){const u=mkOwner(c,d);if(!u||!d||typeof d!=='object')return;const p=Math.floor(+d.p||0),ok=mkOk(d.k,d.d)&&p>=1&&p<=1e9&&MK.L.filter(x=>x.u===u).length<8;
    let id=0;if(ok){id=MK.n++;MK.L.push({id,u,n:c.p.n,k:d.k,d:d.d,p,at:Date.now()});mkDirty=true}mkReply(c,'mka',{t:String(d.t||'').slice(0,12),ok:ok?1:0,id,ep:MK.ep});return}
  if(k==='mkb'){const u=mkOwner(c,d),i=MK.L.findIndex(x=>x.id===+(d&&d.id));if(i<0||MK.L[i].u===u){mkReply(c,'mkg',{ok:0});return}const x=MK.L.splice(i,1)[0];MK.sales[x.u]=(MK.sales[x.u]||0)+Math.floor(x.p*.95);mkDirty=true;mkReply(c,'mkg',{ok:1,k:x.k,d:x.d,p:x.p,id:x.id});const s=byMid.get(x.u)||byUid.get(x.u);if(s)mkReply(s,'mks',{n:c.p.n,p:x.p,id:x.id,g:Math.floor(x.p*.95)});return}
  if(k==='mkx'){const u=mkOwner(c,d),i=MK.L.findIndex(x=>x.id===+(d&&d.id)&&x.u===u);if(i<0)return;const x=MK.L.splice(i,1)[0];mkDirty=true;mkReply(c,'mkg',{ok:1,back:1,k:x.k,d:x.d,p:0,id:x.id});return}
  if(k==='mkc'){const u=mkOwner(c,d);if(!u)return;const g=Math.floor(MK.sales[u]||0),r=MK.ret[u]||[];delete MK.sales[u];delete MK.ret[u];mkDirty=true;mkReply(c,'mkc',{g,r});return}
  if(k==='pty'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c){d.from=c.uid||d.from;send(o,wrap(d))}return}
  if(k==='lbq'){const out={};for(const key in LB)out[key]=LB[key].slice(0,key==='wb'?30:10).map(r=>[r.n,r.c,r.l,r.t,r.p]);send(c,JSON.stringify({t:'emit',k:'lbr',d:{mp,d:out},from:0}));return}
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
  if(k==='dmg'){if(!Array.isArray(d))return;const by=new Map();
    for(const e of d.slice(0,120)){if(!Array.isArray(e))continue;const o=byUid.get(e[0]);if(o&&o.p&&o.p.mp===mp){if(!by.has(o))by.set(o,[]);by.get(o).push(e)}}
    for(const [o,arr] of by)send(o,wrap(arr));return}
  if(k==='xp'){if(!Array.isArray(d))return;
    for(const o of inMap(mp)){if(o===c)continue;const arr=d.filter(e=>Array.isArray(e)&&d2(e[0],e[1],o.p.x,o.p.y)<R_XP*R_XP);if(arr.length)send(o,wrap(arr))}return}
  if(k==='fx'){if(!d||typeof d!=='object')return;if(d.k==='tb'&&c!==host)return;const s=wrap(d),all=d.k==='msg'||d.k==='tb',hostOnly=d.k==='taunt'||d.k==='fog'||d.k==='frost'||d.k==='pin'||d.k==='tstop'||d.k==='mtrapx'||d.k==='rift'||d.k==='stun';
    for(const o of inMap(mp)){if(o===c)continue;
      if(all||(hostOnly&&o===host)||d2(d.x,d.y,o.p.x,o.p.y)<R_FX*R_FX)send(o,s)}return}
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
function mkOk(k,d){if(k==='it')return!!d&&typeof d==='object'&&typeof d.sl==='string'&&d.sl.length<3&&!!d.st&&typeof d.st==='object'&&JSON.stringify(d).length<700;if(k==='cd')return typeof d==='string'&&/^[a-z]{2,5}$/.test(d);if(k==='st')return!!d&&typeof d==='object'&&/^(hp|mp|ps|s1|s2|s3|twc|sc|hr|fe|sf|ec|nt)$/.test(d.k)&&(d.n|0)>=1&&(d.n|0)<=999;return false}
function mkReply(c,k,d){send(c,JSON.stringify({t:'emit',k,d:{mp:c.p?c.p.mp:0,d},from:0}))}
function onMsg(c,raw){
  let m;try{m=JSON.parse(raw)}catch(e){return}
  if(!m||typeof m!=='object')return;
  const now=Date.now();if(now-c.last>1000){c.last=now;c.n=0}if(++c.n>400)return;
  if(m.t==='presence'&&m.p&&typeof m.p==='object'){
    const p=cleanPresence(m.p);if(!p.uid)return;
    if(c.uid!==p.uid){if(c.uid&&byUid.get(c.uid)===c)byUid.delete(c.uid);c.uid=p.uid;byUid.set(p.uid,c)}
    if(!c.p||c.p.mp!==p.mp)c.mapSince=Date.now();if(!c.p){try{stSeen(p)}catch(e){}}c.p=p}
  else if(m.t==='emit')onEmit(c,m);
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
server.on('upgrade',(req,sock)=>{
  const key=req.headers['sec-websocket-key'];
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
   ตั้งรหัสด้วย Environment Variable ADMIN_KEY (ไม่ตั้ง = ปิดหน้านี้) */
const ADMIN_KEY=String(process.env.ADMIN_KEY||''),STF=path.join(DATA_DIR,'stats.json'),TZ=7*3600e3;
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
const AFAIL=new Map();
function adminOk(req){if(!ADMIN_KEY)return false;const k=String(req.headers['x-admin-key']||'');const a=crypto.createHash('sha256').update(k).digest(),b=crypto.createHash('sha256').update(ADMIN_KEY).digest();return crypto.timingSafeEqual(a,b)}
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
    mk,mvp:mvTable(),lb,lbc,chat:{n:CHL.length,today:CHL.filter(x=>dayKey(x.at)===dayKey(now)).length},srv:{up:Math.round(process.uptime()),rss:mem.rss,heap:mem.heapUsed,cpu:Math.round(cpuPct*10)/10,bw:Math.round(bwRate),msg:Math.round(msgRate),node:process.version,names:Object.keys(NM).length,dataDir:DATA_DIR,persist:!!process.env.DATA_DIR,disk}}}
function adminRoute(req,res){const H={'Cache-Control':'no-store','X-Robots-Tag':'noindex','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer'};
  if(req.url==='/admin'||req.url==='/admin/'){return fs.readFile(path.join(__dirname,'admin.html'),(e,b)=>{if(e){res.writeHead(404,H);return res.end('missing admin.html')}res.writeHead(200,Object.assign({'Content-Type':'text/html; charset=utf-8',"Content-Security-Policy":"default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:"},H));res.end(b)})}
  const J=(code,o)=>{res.writeHead(code,Object.assign({'Content-Type':'application/json'},H));res.end(JSON.stringify(o))};
  if(!ADMIN_KEY)return J(503,{err:'nokey'});
  const ip=String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'').split(',')[0].trim(),now=Date.now(),f=AFAIL.get(ip);
  if(f&&f.n>=8&&now-f.t<10*60e3)return J(429,{err:'locked',wait:Math.ceil((10*60e3-(now-f.t))/1000)});
  if(!adminOk(req)){const g=f&&now-f.t<10*60e3?f:{n:0,t:now};g.n++;g.t=now;AFAIL.set(ip,g);if(AFAIL.size>500)AFAIL.clear();return J(401,{err:'bad'})}
  AFAIL.delete(ip);
  if(req.url.startsWith('/admin/api'))return J(200,adminData());
  if(req.url.startsWith('/admin/chat'))return J(200,chatQuery(new URL(req.url,'http://x').searchParams));
  if(req.method!=='POST')return J(405,{err:'post'});
  const act=req.url.slice(7).split('?')[0];
  let body='';req.on('data',d=>{body+=d;if(body.length>2000)req.destroy()});req.on('end',()=>{let q={};try{q=JSON.parse(body)||{}}catch(e){}
    if(act==='ann'){let t=String(q.t||'').replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,120);if(!t)return J(400,{err:'empty'});
      const s=JSON.stringify({t:'emit',k:'ann',d:{mp:0,d:{t}},from:0});try{CHL.push({at:Date.now(),n:'📢 ประกาศ (ผู้ดูแล)',t,mp:0,c:'',l:0,a:1});chDirty=true}catch(e){}let n=0;for(const c of clients){if(c.p){send(c,s);n++}}console.log('ประกาศ: '+t);return J(200,{ok:1,n})}
    if(act==='lbdel'||act==='lbban'||act==='lbcap')return J(200,lbAdmin(act,q));
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
setInterval(()=>{if(!chDirty)return;chDirty=false;wj(CHF,CHL)},30000);
function chatLog(c,pl){if(!pl||typeof pl!=='object')return;const t=String(pl.t||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,80);if(!t)return;
  const p=c.p||{},n=String(p.n||pl.n||'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,12)||'ผู้เล่น';
  CHL.push({at:Date.now(),n,t,mp:p.mp|0,c:String(p.cls||'').slice(0,8),l:p.lv|0});if(CHL.length>CHMAX)CHL.splice(0,CHL.length-CHMAX);chDirty=true}
function chatQuery(q){const n=Math.max(1,Math.min(500,+q.get('n')||150)),before=+q.get('before')||Infinity,s=String(q.get('q')||'').trim().toLowerCase().slice(0,40);
  const out=[];for(let i=CHL.length-1;i>=0&&out.length<n;i--){const x=CHL[i];if(x.at>=before)continue;if(s&&!(x.t.toLowerCase().includes(s)||x.n.toLowerCase().includes(s)))continue;out.push(x)}
  return{items:out,total:CHL.length,more:out.length===n}}
function stats(){return{clients:clients.size,countByMap,bytesOut,msgsOut,uptime:Math.round(process.uptime())}}
function flushAll(){try{wjSync(CHF,CHL)}catch(e){}try{wjSync(LBCF,LBC)}catch(e){}try{wjSync(NMF,NM)}catch(e){}try{wjSync(STF,ST)}catch(e){}wjSync(LBF,LB);{const o={};for(const k in MV){const v=MV[k];o[k]={next:v.next,k:v.k,last:v.last}}wjSync(MVF,o)}wjSync(MKF,MK)}
for(const sig of['SIGTERM','SIGINT'])process.on(sig,()=>{console.log('ปิดเซิร์ฟเวอร์: บันทึกข้อมูล...');flushAll();process.exit(0)});
server.listen(PORT,()=>console.log('listening on '+PORT+' (สูงสุด '+MAX+' คน)'));
