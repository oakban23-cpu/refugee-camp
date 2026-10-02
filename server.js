// เซิร์ฟเวอร์กลางของเกม: เสิร์ฟหน้าเกม + ส่งต่อข้อความ (ไม่มีลอจิกเกมในนี้)
// รองรับผู้เล่นจำนวนมากด้วยการส่งเฉพาะข้อมูลที่อยู่ใกล้ผู้เล่นแต่ละคน ไม่ต้องติดตั้งไลบรารีเพิ่ม
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto'),zlib=require('zlib');
const PORT=process.env.PORT||3000, MAX=Number(process.env.MAX_PLAYERS||120), MAXMSG=256*1024;
const R_PEER=650, R_WORLD=480, R_XP=420, R_FX=520, MAXPEERS=40, BUFCAP=1<<20;
const page=path.join(__dirname,'public','index.html');
const server=http.createServer((req,res)=>{
  if(req.url==='/health'){res.writeHead(200);return res.end('ok')}
  if(req.url==='/stats'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify(stats()))}
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
function kill(c){if(c.dead)return;c.dead=true;clients.delete(c);if(c.uid&&byUid.get(c.uid)===c)byUid.delete(c.uid);try{c.sock.destroy()}catch(e){}}
const num=(v,a,b,d)=>Number.isFinite(v)?Math.max(a,Math.min(b,v)):d;
function cleanPresence(p){return{uid:String(p.uid||'').slice(0,12),x:num(p.x,0,20000,0),y:num(p.y,0,20000,0),hp:num(p.hp,0,1e6,0),mh:num(p.mh,1,1e6,1),
  cls:String(p.cls||'').slice(0,8),n:String(p.n||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,24),lv:num(p.lv|0,1,99,1),sl:p.sl?1:0,mp:num(p.mp|0,1,99999,1),hd:num(p.hd|0,0,79,0),bt:num(p.bt|0,0,17,0),wp:num(p.wp|0,0,79,0),wu:num(p.wu|0,0,30,0),im:num(p.im|0,0,3,0),ar:num(p.ar|0,0,17,0),tt:String(p.tt||'').replace(/[^a-z0-9]/gi,'').slice(0,8),c2:num(p.c2|0,0,2,0),at:num(p.at|0,0,99,0),mt:num(p.mt|0,0,9,0),pt:num(p.pt|0,0,9,0)}}
const inMap=mp=>{const a=[];for(const c of clients)if(c.p&&c.p.mp===mp)a.push(c);return a};
function recompute(){hostByMap={};countByMap={};
  for(const c of clients){if(!c.p||!c.uid)continue;const mp=c.p.mp;countByMap[mp]=(countByMap[mp]||0)+1;
    const h=hostByMap[mp];if(!h||c.uid<h.uid)hostByMap[mp]=c}}
const d2=(ax,ay,bx,by)=>{const dx=ax-bx,dy=ay-by;return dx*dx+dy*dy};
function tickPeers(){
  recompute();
  for(const c of clients){
    if(!c.p)continue;const mp=c.p.mp,cand=[];
    for(const o of clients){if(o===c||!o.p||o.p.mp!==mp)continue;const dd=d2(c.p.x,c.p.y,o.p.x,o.p.y);if(dd<R_PEER*R_PEER)cand.push([dd,o])}
    if(cand.length>MAXPEERS){cand.sort((a,b)=>a[0]-b[0]);cand.length=MAXPEERS}
    const rows=[],info=[],seen=new Map();
    for(const [,o] of cand){const p=o.p;rows.push([p.uid,Math.round(p.x),Math.round(p.y),Math.round(p.hp),p.sl,p.at|0]);
      const ex=[p.wp,p.ar,p.c2,p.mt,p.wu,p.pt,p.im];
      const key=p.n+'|'+p.cls+'|'+p.lv+'|'+p.mh+'|'+p.mp+'|'+p.hd+'|'+p.bt+'|'+p.tt+'|'+ex.join(',');seen.set(p.uid,key);
      if(c.known.get(p.uid)!==key)info.push([p.uid,p.n,p.cls,p.lv,p.mh,p.mp,p.hd,p.bt,p.tt,ex])}
    c.known=seen;
    const m={t:'peers',rows,info,host:hostByMap[mp]?hostByMap[mp].uid:'',n:countByMap[mp]||1};
    if(hostByMap[mp]===c){m.all=[];for(const o of clients){if(o===c||!o.p||o.p.mp!==mp)continue;m.all.push([o.p.uid,Math.round(o.p.x),Math.round(o.p.y),(o.p.hp<=0||o.p.sl)?1:0])}}
    send(c,JSON.stringify(m),true);
  }
}
setInterval(tickPeers,200);
/* ตารางอันดับบอส: เก็บลงไฟล์ leaderboard.json */
const LBF=path.join(__dirname,'leaderboard.json');let LB={},lbDirty=false;
try{const j=JSON.parse(fs.readFileSync(LBF,'utf8'));if(j&&typeof j==='object')LB=j}catch(e){}
setInterval(()=>{if(!lbDirty)return;lbDirty=false;fs.writeFile(LBF,JSON.stringify(LB),()=>{})},10000);
function onEmit(c,m){
  const k=m.k,pl=m.d;if(typeof k!=='string'||k.length>12)return;
  if(k==='chat'){const s=JSON.stringify({t:'emit',k,d:pl,from:c.id});for(const o of clients)if(o!==c)send(o,s);return}
  if(!c.p||!pl||typeof pl!=='object')return;
  const mp=c.p.mp,d=pl.d,host=hostByMap[mp];
  const wrap=x=>JSON.stringify({t:'emit',k,d:{mp,d:x},from:c.id});
  if(k==='lbs'){if(!d||typeof d!=='object')return;const key=String(d.k||'');if(!/^(m[1-467]|d[1-37]|tw|wb)$/.test(key))return;const hi=key==='wb',t=+d.t;if(hi?!(t>=1&&t<1e12):!(t>=5&&t<36000))return;
    const row={n:String(d.n||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,12)||'ผู้เล่น',c:String(d.cls||'').slice(0,8),l:num(d.lv|0,1,99,1),t:hi?Math.round(t):Math.round(t*10)/10,p:num(d.pc|0,1,99,1),u:c.uid||'',at:Date.now()};
    const arr=LB[key]||(LB[key]=[]),i=arr.findIndex(r=>r.u===row.u&&r.c===row.c);if(i>=0){if(hi?arr[i].t>=row.t:arr[i].t<=row.t)return;arr.splice(i,1)}
    arr.push(row);arr.sort((a,b)=>hi?b.t-a.t:a.t-b.t);if(arr.length>50)arr.length=50;lbDirty=true;return}
  if(k==='trade'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c&&o.p&&o.p.mp===mp){d.from=c.uid||d.from;send(o,wrap(d))}return}
  if(k==='pty'){if(!d||typeof d!=='object'||typeof d.to!=='string')return;const o=byUid.get(d.to);if(o&&o!==c){d.from=c.uid||d.from;send(o,wrap(d))}return}
  if(k==='lbq'){const out={};for(const key in LB)out[key]=LB[key].slice(0,key==='wb'?30:10).map(r=>[r.n,r.c,r.l,r.t,r.p]);send(c,JSON.stringify({t:'emit',k:'lbr',d:{mp,d:out},from:0}));return}
  if(k==='hit'){if(host&&host!==c&&Array.isArray(d))send(host,wrap(d.slice(0,80)));return}
  if(k==='world'){
    if(host!==c||!d||!Array.isArray(d.m)||d.m.length>3000)return;
    const dgs=d.dg&&typeof d.dg==='object'?{ph:String(d.dg.ph).slice(0,6),w:d.dg.w|0,tl:+d.dg.tl||0,nx:+d.dg.nx||0,why:String(d.dg.why||'').slice(0,40)}:0;
    if(dgs&&d.dg.tw&&typeof d.dg.tw==='object'){const t=d.dg.tw;dgs.tw={f:num(t.f|0,1,9999,1),ft:String(t.ft||'').slice(0,8),k:+t.k||0,kn:+t.kn||0,af:Array.isArray(t.af)?t.af.slice(0,3).map(x=>num(x|0,0,4,0)):[],ch:t.ch|0}}
    for(const o of inMap(mp)){if(o===c)continue;const ox=o.p.x,oy=o.p.y,rows=[];
      for(const r of d.m){if(r[4]===3||r[4]===4||d2(r[1],r[2],ox,oy)<R_WORLD*R_WORLD)rows.push(r)}
      send(o,JSON.stringify({t:'emit',k,d:{mp,d:{m:rows,g:d.g,c:d.c,w:d.w,o:d.o,dg:dgs}},from:c.id}),true)}
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
function onMsg(c,raw){
  let m;try{m=JSON.parse(raw)}catch(e){return}
  if(!m||typeof m!=='object')return;
  const now=Date.now();if(now-c.last>1000){c.last=now;c.n=0}if(++c.n>400)return;
  if(m.t==='presence'&&m.p&&typeof m.p==='object'){
    const p=cleanPresence(m.p);if(!p.uid)return;
    if(c.uid!==p.uid){if(c.uid&&byUid.get(c.uid)===c)byUid.delete(c.uid);c.uid=p.uid;byUid.set(p.uid,c)}
    c.p=p}
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
  if(req.url!=='/ws'||!key||clients.size>=MAX){sock.end('HTTP/1.1 503 Service Unavailable\r\n\r\n');return}
  const acc=crypto.createHash('sha1').update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  const z=/permessage-deflate/i.test(String(req.headers['sec-websocket-extensions']||''));
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+acc+(z?'\r\nSec-WebSocket-Extensions: permessage-deflate; server_no_context_takeover; client_no_context_takeover':'')+'\r\n\r\n');
  sock.setNoDelay(true);
  const c={sock,z,id:nextId++,uid:null,p:null,known:new Map(),last:0,n:0,buf:Buffer.alloc(0),alive:true,dead:false};clients.add(c);
  sock.on('data',d=>{c.buf=Buffer.concat([c.buf,d]);parse(c)});
  sock.on('close',()=>kill(c));sock.on('error',()=>kill(c));
});
setInterval(()=>{for(const c of [...clients]){if(!c.alive){kill(c);continue}c.alive=false;try{c.sock.write(frame(9,Buffer.alloc(0)))}catch(e){}}},25000);
function stats(){return{clients:clients.size,countByMap,bytesOut,msgsOut,uptime:Math.round(process.uptime())}}
server.listen(PORT,()=>console.log('listening on '+PORT+' (สูงสุด '+MAX+' คน)'));
