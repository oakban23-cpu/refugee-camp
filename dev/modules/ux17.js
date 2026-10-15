/* ---------- v388 ระบบเพื่อน ----------
   รายชื่อเพื่อน (สูงสุด 50 · เก็บในเซฟตัวละคร me.frd) · ส่งคำขอ/ตอบรับ/ปฏิเสธ/ลบ (เป็นเพื่อนกันทั้งสองฝั่ง)
   เห็นสถานะออนไลน์ + แมพที่อยู่ ข้ามแมพได้ · กระซิบ · วาปไปหา · ชวนเข้าปาร์ตี้ · ไปเยี่ยมเต็นท์
   บนเซิร์ฟเวอร์: frq (ถามสถานะตามชื่อ) / frm (ส่งข้อความหาคนตามชื่อ) เซิร์ฟเวอร์ตอบและส่งต่อเอง
   ใน artifact (ไม่มีเซิร์ฟเวอร์): ส่งกระจายในห้อง แล้วเจ้าของชื่อตอบกลับเอง */
const FRIMAX=50,FRIS={},FRIP=[],FRIW={n:0,last:{}},FRIX={sel:'',del:'',poll:0,first:true,wp:null,msg:''};
function friSt(){if(!me.frd||typeof me.frd!=='object'||!Array.isArray(me.frd.L))me.frd={L:[]};return me.frd}
function friHas(n){return friSt().L.some(f=>f.n===n)}
function friSrv(){return!!(room&&room.url)}
function friSend(k,d){try{if(room)emitM(k,d)}catch(e){}}
function friOn(n){const s=FRIS[n];return!!(s&&Date.now()-s.t<40000)}
function friMapN(mp){mp=mp|0;if(mp>90000)return'🏠 ในเต็นท์';if(mp>=10000)return'🏰 ในดันเจี้ยน/หอคอย';const M=MAPS[mp];return M?M.n:'แมพ '+mp}
function friAgo(t){if(!t)return'ยังไม่เคยเห็นออนไลน์';const s=(Date.now()-t)/1000;return s<3600?'เห็นล่าสุด '+Math.max(1,Math.round(s/60))+' นาทีที่แล้ว':s<86400?'เห็นล่าสุด '+Math.round(s/3600)+' ชม.ที่แล้ว':'เห็นล่าสุด '+Math.round(s/86400)+' วันที่แล้ว'}
function friUid(n){const s=FRIS[n];if(s&&s.u&&friOn(n))return s.u;for(const k in others)if(others[k]&&others[k].n===n)return k;return''}
/* ---- ส่ง ---- */
function friReq(n,u){if(!me.cls)return;n=String(n||'').trim().slice(0,24);if(!n){friUI('ใส่ชื่อตัวละครก่อน');return}if(n===myName){friUI('เพิ่มตัวเองเป็นเพื่อนไม่ได้');return}
  if(friHas(n)){sysMsg('👫 '+n+' เป็นเพื่อนอยู่แล้ว');return}if(friSt().L.length>=FRIMAX){sysMsg('👫 รายชื่อเพื่อนเต็มแล้ว ('+FRIMAX+')');return}
  if(!room){sysMsg('👫 ต้องเล่นออนไลน์ถึงจะเพิ่มเพื่อนได้');return}const k='r'+n,now=Date.now();if(FRIW.last[k]&&now-FRIW.last[k]<8000){sysMsg('👫 เพิ่งส่งคำขอไป รอสักครู่');return}FRIW.last[k]=now;
  /* ถ้าอีกฝ่ายขอเรามาก่อนแล้ว = ตอบรับเลย */const p=FRIP.find(q=>q.n===n);if(p){friAccept(n);return}
  friSend('frm',{op:'req',toN:n,to:u||friUid(n),n:myName,c:me.cls,lv:me.lv});sysMsg('👫 ส่งคำขอเป็นเพื่อนถึง '+n+' แล้ว');try{sfx('item')}catch(e){}}
function friAdd(n,c,lv){const S=friSt();if(friHas(n)||S.L.length>=FRIMAX)return;S.L.push({n,c:CL[c]?c:'',lv:lv|0,at:Date.now(),ls:Date.now()});FRIS[n]=Object.assign(FRIS[n]||{},{t:Date.now()});try{writeSave&&writeSave()}catch(e){}}
function friAccept(n){const i=FRIP.findIndex(q=>q.n===n);if(i<0)return;const p=FRIP.splice(i,1)[0];if(friSt().L.length>=FRIMAX){sysMsg('👫 รายชื่อเพื่อนเต็มแล้ว');return}friAdd(p.n,p.c,p.lv);
  friSend('frm',{op:'acc',toN:p.n,to:p.from,n:myName,c:me.cls,lv:me.lv});sysMsg('👫 '+p.n+' เป็นเพื่อนกับคุณแล้ว!');try{sfx('quest')}catch(e){}friPoll(1)}
function friDecline(n){const i=FRIP.findIndex(q=>q.n===n);if(i<0)return;const p=FRIP.splice(i,1)[0];friSend('frm',{op:'dec',toN:p.n,to:p.from,n:myName})}
function friDel(n){const S=friSt();S.L=S.L.filter(f=>f.n!==n);delete FRIS[n];friSend('frm',{op:'del',toN:n,to:friUid(n),n:myName});try{writeSave&&writeSave()}catch(e){}}
function friWhisper(n,t){t=String(t||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,80);if(!t)return false;if(!friOn(n)){sysMsg('💌 '+n+' ออฟไลน์อยู่ ส่งข้อความไม่ได้');return false}
  friSend('frm',{op:'w',toN:n,to:friUid(n),n:myName,t});try{addChat('💌 ถึง '+n,t,uid)}catch(e){}return true}
function friPtInv(n){const u=friUid(n);if(!u){sysMsg('👥 '+n+' ออฟไลน์อยู่');return}if(inPty(u)){sysMsg(n+' อยู่ในปาร์ตี้ของคุณแล้ว');return}
  if(PTY&&PTY.mem.length>1&&PTY.lead!==uid){sysMsg('เฉพาะหัวหน้าปาร์ตี้เท่านั้นที่เชิญได้');return}if(PTY&&PTY.mem.length>=PTMAX){sysMsg('ปาร์ตี้เต็มแล้ว ('+PTMAX+' คน)');return}
  if(Date.now()-(ptLastInv[u]||0)<5000){sysMsg('เพิ่งเชิญไป รอสักครู่');return}ptLastInv[u]=Date.now();if(!PTY)ptPid=ptPid||ptNew();ptOut(u,'inv',{n:myName,cls:me.cls,lv:me.lv});sysMsg('👥 ส่งคำเชิญเข้าปาร์ตี้ถึง '+n+' แล้ว');try{sfx('item')}catch(e){}}
/* ---- วาปไปหาเพื่อน (ไปแมพเดียวกัน ใกล้ตัวเพื่อน) ---- */
function friWarpWhy(n){const s=FRIS[n];if(!friOn(n)||!s)return n+' ออฟไลน์อยู่';if(!me.cls||!run||me.down>0||SD.on)return'ตอนนี้วาปไม่ได้';if(!wpMapOk(curMap))return'ออกจากดันเจี้ยน/หอคอย/ลานประลอง/เต็นท์ก่อนถึงจะวาปได้';
  const mp=s.mp|0;if(mp>90000)return n+' อยู่ในเต็นท์ — ไปเยี่ยมได้จากปุ่ม 🏠 (ต้องอยู่ในค่าย)';if(!wpMapOk(mp))return n+' อยู่ในดันเจี้ยนหรือหอคอย — ขอรหัสห้องแล้วเข้าร่วมทางเมนูดันเจี้ยนแทน';
  try{const a=wpAccess(mp);if(a)return a}catch(e){}if(typeof wpCd!=='undefined'&&wpCd>0)return'วาปได้อีกครั้งใน '+Math.ceil(wpCd)+' วิ';return''}
function friWarp(n){const why=friWarpWhy(n);if(why){friUI('🌀 '+why);return}ov.hidden=true;FRIX.wp={n,t:1.5,x0:me.x,y0:me.y};banner={s:'🌀 กำลังวาปไปหา '+n+'… (ขยับตัวเพื่อยกเลิก)',t:1.8};try{sfx('ek_summon')}catch(e){}}
function friTick(dt){const W=FRIX.wp;if(!W)return;if(me.down>0||Math.hypot(me.x-W.x0,me.y-W.y0)>10){FRIX.wp=null;dn.push({x:me.x,y:me.y-46,v:'🌀 ขยับตัว — ยกเลิกการวาป',t:1.3,col:'#c8d8ff'});return}
  W.t-=dt;if(Math.random()<.5)parts.push({x:me.x+(Math.random()-.5)*36,y:me.y+14,vx:0,vy:-60-Math.random()*60,t:.6,l:.6,c:Math.random()<.5?'#8ad8ff':'#c8a0ff',r:1.6+Math.random()*1.4});
  if(W.t>0)return;FRIX.wp=null;const why=friWarpWhy(W.n);if(why){dn.push({x:me.x,y:me.y-46,v:why,t:1.8,col:'#ffb0a0'});return}const s=FRIS[W.n];
  try{if(typeof wpCd!=='undefined')wpCd=WPCD}catch(e){}enterMap(s.mp|0,{x:(s.x|0)+30,y:(s.y|0)+20});banner={s:'🌀 วาปมาหา '+W.n+' แล้ว',t:2.5}}
/* ---- สถานะออนไลน์ ---- */
function friPoll(force){const L=friSt().L;if(!room||!me.cls||!L.length)return;const n=Date.now();if(!force&&n-FRIX.poll<(ov.dataset.k==='fri'&&!ov.hidden?5000:15000))return;FRIX.poll=n;
  friSend('frq',{n:L.map(f=>f.n).slice(0,FRIMAX),from:myName})}
function friStatus(row){const[n,c,lv,mp,x,y,u,aw]=row;if(typeof n!=='string'||!friHas(n))return;const was=friOn(n);FRIS[n]={t:Date.now(),c,lv:lv|0,mp:mp|0,x:+x||0,y:+y||0,u:String(u||''),aw:aw?1:0};
  const f=friSt().L.find(q=>q.n===n);if(f){f.ls=Date.now();if(lv)f.lv=lv|0;if(CL[c])f.c=c}if(!was&&!FRIX.first)sysMsg('🟢 '+n+' ออนไลน์แล้ว · '+friMapN(mp))}
/* ---- รับ ---- */
function friMsg(d){if(!d||typeof d!=='object'||!me.cls)return;const op=d.op;
  if(op==='off'){if(friSrv())sysMsg('👫 ไม่พบ '+(d.toN||'ผู้เล่นคนนี้')+' ออนไลน์อยู่ตอนนี้ (ต้องออนไลน์ทั้งสองฝั่งถึงส่งคำขอ/ข้อความได้)');return}
  if(d.toN&&d.toN!==myName)return;if(d.to&&d.to!==uid&&!d.toN)return;const n=String(d.n||'').slice(0,24);
  if(!n||n===myName)return;
  if(op==='req'){if(friHas(n)){friSend('frm',{op:'acc',toN:n,to:d.from,n:myName,c:me.cls,lv:me.lv});return}if(FRIP.some(q=>q.n===n))return;FRIP.push({n,c:d.c,lv:d.lv|0,from:String(d.from||''),at:Date.now()});if(FRIP.length>20)FRIP.shift();
    banner={s:'👫 '+n+' ขอเป็นเพื่อนกับคุณ · เมนู → 👫 เพื่อน',t:5};sysMsg('👫 '+n+' (Lv '+(d.lv|0)+') ขอเป็นเพื่อน — ตอบรับได้ที่เมนู 👫 เพื่อน');try{sfx('quest')}catch(e){}if(ov.dataset.k==='fri'&&!ov.hidden)friUI();return}
  if(op==='acc'){if(!friHas(n)){friAdd(n,d.c,d.lv);sysMsg('👫 '+n+' ตอบรับเป็นเพื่อนแล้ว!');try{sfx('quest')}catch(e){}}friPoll(1);if(ov.dataset.k==='fri'&&!ov.hidden)friUI();return}
  if(op==='dec'){sysMsg('👫 '+n+' ไม่รับคำขอเป็นเพื่อน');return}
  if(op==='del'){if(friHas(n)){const S=friSt();S.L=S.L.filter(f=>f.n!==n);delete FRIS[n];try{writeSave&&writeSave()}catch(e){}if(ov.dataset.k==='fri'&&!ov.hidden)friUI()}return}
  if(op==='w'){if(!friHas(n))return;const t=String(d.t||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,80);if(!t)return;try{addChat('💌 '+n+' (กระซิบ)',t,d.from||'')}catch(e){}FRIW.n++;FRIW.last['w'+n]=Date.now();
    const f=friSt().L.find(q=>q.n===n);if(f)f.lw=t;banner={s:'💌 '+n+': '+t.slice(0,40),t:4};try{sfx('item')}catch(e){}if(ov.dataset.k==='fri'&&!ov.hidden)friUI()}}
function friQ(d){/* ใน artifact: คนอื่นถามสถานะ → ถ้ามีชื่อเราและเราเป็นเพื่อนเขา ตอบกลับ */if(!d||!Array.isArray(d.n)||!me.cls||friSrv())return;if(d.n.indexOf(myName)<0||!friHas(String(d.from||'')))return;
  friSend('frr',{toN:String(d.from),L:[[myName,me.cls,me.lv,curMap,Math.round(me.x),Math.round(me.y),uid,document.hidden?1:0]]})}
function friR(d){if(!d||!Array.isArray(d.L))return;if(d.toN&&d.toN!==myName)return;const seen=new Set();d.L.slice(0,FRIMAX).forEach(r=>{if(Array.isArray(r)){friStatus(r);seen.add(r[0])}});
  if(friSrv()){friSt().L.forEach(f=>{if(!seen.has(f.n)&&FRIS[f.n])FRIS[f.n].t=0})}FRIX.first=false;if(ov.dataset.k==='fri'&&!ov.hidden)friList()}
/* ---- หน้าจอ ---- */
function friCSS(){if($('fricss'))return;const s=document.createElement('style');s.id='fricss';s.textContent=
 '.frr{display:flex;align-items:center;gap:9px;padding:8px 6px;border-bottom:1px solid rgba(255,255,255,.07);text-align:left}.frr:last-child{border-bottom:0}.frav{width:34px;height:34px;border-radius:50%;flex:0 0 34px;display:grid;place-items:center;font-weight:800;font-size:15px;color:#fff;position:relative;border:2px solid rgba(255,255,255,.25)}'+
 '.frav i{position:absolute;right:-2px;bottom:-2px;width:11px;height:11px;border-radius:50%;border:2px solid #1a1428;background:#666}.frav i.on{background:#3ddc6a}.frav i.aw{background:#e8c04a}.frnm{flex:1;min-width:0}.frnm b{font-size:13.5px}.frnm small{display:block;font-size:11px;opacity:.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
 '.frbt{display:flex;flex-wrap:wrap;gap:5px;margin:2px 0 6px 43px}.frbt button{font-size:11.5px!important;padding:5px 9px!important;border-radius:9px!important}.frw{display:flex;gap:6px;margin:0 0 8px 43px}.frw input{flex:1;min-width:0;padding:7px 9px;border-radius:9px;border:1px solid #6a5030;background:#1e1814;color:#f0e6d2;font-size:13px}'+
 '.frlw{font-size:11px;opacity:.85;margin:-2px 0 6px 43px;color:#ffc8f0;text-align:left}';document.head.appendChild(s)}
function friRow(f){const on=friOn(f.n),s=FRIS[f.n]||{},C=CL[f.c]||{c:'#777',n:'-'},sel=FRIX.sel===f.n,del=FRIX.del===f.n,u=on?s.u:'';
  let h='<div class="frr"><div class="frav" style="background:'+C.c+'">'+esc(f.n.slice(0,1))+'<i class="'+(on?(s.aw?'aw':'on'):'')+'"></i></div><div class="frnm"><b>'+esc(f.n)+'</b> <small style="display:inline;opacity:.75">Lv '+(f.lv||'?')+' · '+esc(C.n||'')+'</small><small>'+(on?(s.aw?'🟡 พักหน้าจอ · ':'🟢 ออนไลน์ · ')+esc(friMapN(s.mp))+(s.mp===curMap?' (แมพเดียวกัน)':''):'⚫ ออฟไลน์ · '+friAgo(f.ls))+'</small></div>'+
   '<button data-frs="'+esc(f.n)+'" style="font-size:12px;padding:6px 10px">'+(sel?'▲':'⋯')+'</button></div>';
  if(f.lw)h+='<div class="frlw">💌 '+esc(f.lw)+'</div>';
  if(sel){const tentOk=on&&curMap===1&&u;h+='<div class="frbt"><button data-frw="'+esc(f.n)+'"'+(on?'':' disabled')+'>🌀 วาปไปหา</button><button data-frp="'+esc(f.n)+'"'+(on?'':' disabled')+'>👥 ชวนปาร์ตี้</button><button data-frt="'+esc(f.n)+'"'+(tentOk?'':' disabled')+' title="ต้องอยู่ในค่าย">🏠 เยี่ยมเต็นท์</button>'+
    '<button data-frx="'+esc(f.n)+'" style="'+(del?'background:#7a1a1a!important;border-color:#ff6a6a!important':'')+'">'+(del?'❗ แตะอีกครั้งเพื่อลบ':'❌ ลบเพื่อน')+'</button></div>';
    h+='<div class="frw"><input id="frwi" maxlength="80" placeholder="'+(on?'กระซิบหา '+esc(f.n)+'…':'ส่งได้เมื่อเพื่อนออนไลน์')+'"'+(on?'':' disabled')+' autocomplete="off"><button class="pri" data-frm="'+esc(f.n)+'"'+(on?'':' disabled')+'>💌 ส่ง</button></div>'}
  return h}
function friList(){const e=$('frlist');if(!e)return;const L=friSt().L.slice().sort((a,b)=>(friOn(b.n)-friOn(a.n))||((b.ls||0)-(a.ls||0)));
  e.innerHTML=L.length?L.map(friRow).join(''):'<div style="opacity:.75;font-size:12.5px;padding:8px 4px">ยังไม่มีเพื่อน — แตะตัวผู้เล่นในแมพแล้วกด ➕ เพิ่มเพื่อน หรือพิมพ์ชื่อด้านบน</div>';friBind()}
function friUI(msg){if(!me.cls)return;friCSS();ov.dataset.k='fri';FRIW.n=0;const S=friSt(),on=S.L.filter(f=>friOn(f.n)).length;
  let h='<div class="pn" data-pn="fri">'+hdr('👫','เพื่อน','เพื่อน '+S.L.length+'/'+FRIMAX+' · ออนไลน์ '+on+' คน')+(msg?'<div class="note">'+msg+'</div>':'');
  if(FRIP.length)h+='<div class="card" style="border-left:4px solid #ffd84a;text-align:left"><div class="cap">📨 คำขอเป็นเพื่อน ('+FRIP.length+')</div>'+FRIP.map(p=>{const C=CL[p.c]||{c:'#777',n:''};return'<div class="frr"><div class="frav" style="background:'+C.c+'">'+esc(p.n.slice(0,1))+'</div><div class="frnm"><b>'+esc(p.n)+'</b><small>Lv '+p.lv+' · '+esc(C.n||'')+'</small></div><button class="pri" data-fra="'+esc(p.n)+'">✔ รับ</button><button data-frd="'+esc(p.n)+'">✖</button></div>'}).join('')+'</div>';
  h+='<div class="card" style="text-align:left"><div class="cap">➕ เพิ่มเพื่อนด้วยชื่อตัวละคร</div><div class="frw" style="margin:4px 0 2px"><input id="frni" maxlength="24" placeholder="ชื่อตัวละครของเพื่อน" autocomplete="off"><button class="pri" data-frn="1">ส่งคำขอ</button></div><small style="opacity:.75">หรือแตะตัวผู้เล่นในแมพ → ➕ เพิ่มเพื่อน · ต้องออนไลน์ทั้งสองฝั่ง · ชื่อคุณ: <b>'+esc(myName)+'</b></small></div>';
  h+='<div class="card" style="text-align:left"><div class="cap">👫 รายชื่อเพื่อน</div><div id="frlist"></div></div>';
  h+='<div class="card hint" style="font-size:11.5px;opacity:.85">💡 แตะ ⋯ ที่ชื่อเพื่อน: วาปไปหา · ชวนปาร์ตี้ · เยี่ยมเต็นท์ · กระซิบ · ลบ — เพื่อนออนไลน์จะมีแจ้งเตือนในแชท</div></div>';
  ov.innerHTML=h;ov.hidden=false;friList();friPoll(1);
  ov.querySelectorAll('[data-fra]').forEach(b=>b.onclick=()=>{friAccept(b.dataset.fra);friUI()});
  ov.querySelectorAll('[data-frd]').forEach(b=>b.onclick=()=>{friDecline(b.dataset.frd);friUI()});
  const ni=$('frni'),go=()=>{friReq(ni.value);ni.value=''};ov.querySelectorAll('[data-frn]').forEach(b=>b.onclick=go);if(ni)ni.onkeydown=e=>{if(e.key==='Enter')go()}}
function friBind(){const e=$('frlist');if(!e)return;
  e.querySelectorAll('[data-frs]').forEach(b=>b.onclick=()=>{const n=b.dataset.frs;FRIX.sel=FRIX.sel===n?'':n;FRIX.del='';friList();const i=$('frwi');if(i&&FRIX.sel)setTimeout(()=>{try{i.focus({preventScroll:true})}catch(x){}},0)});
  e.querySelectorAll('[data-frw]').forEach(b=>b.onclick=()=>friWarp(b.dataset.frw));
  e.querySelectorAll('[data-frp]').forEach(b=>b.onclick=()=>friPtInv(b.dataset.frp));
  e.querySelectorAll('[data-frt]').forEach(b=>b.onclick=()=>{const u=friUid(b.dataset.frt);if(u){ov.hidden=true;tentVisit(u)}});
  e.querySelectorAll('[data-frx]').forEach(b=>b.onclick=()=>{const n=b.dataset.frx;if(FRIX.del!==n){FRIX.del=n;friList();return}FRIX.del='';FRIX.sel='';friDel(n);friUI('ลบ '+n+' ออกจากรายชื่อเพื่อนแล้ว')});
  const wi=$('frwi'),send=n=>{if(!wi)return;const t=wi.value;if(friWhisper(n,t)){wi.value='';const f=friSt().L.find(q=>q.n===n);if(f)f.lw='คุณ: '+t.trim().slice(0,80);friList()}};
  e.querySelectorAll('[data-frm]').forEach(b=>b.onclick=()=>send(b.dataset.frm));if(wi)wi.onkeydown=ev=>{if(ev.key==='Enter')send(FRIX.sel)}}
function friPopBtn(o){if(!o||!o.n)return'';return friHas(o.n)?'<button disabled>👫 เป็นเพื่อนกันแล้ว</button>':'<button data-pp="fr">➕ เพิ่มเพื่อน</button>'}
/* ---- ติดตั้ง ---- */
{let done=false;setInterval(()=>{try{
  if(!done&&room&&room.on){done=true;room.on('frm',m=>{if(m.sameTab||!m.data)return;try{friMsg(m.data.d)}catch(e){}});room.on('frq',m=>{if(m.sameTab||!m.data)return;try{friQ(m.data.d)}catch(e){}});room.on('frr',m=>{if(m.sameTab||!m.data)return;try{friR(m.data.d)}catch(e){}})}
  if(!$('frb')){const ref=$('pb');if(ref){const b=document.createElement('button');b.id='frb';b.innerHTML='<i>👫</i><span>เพื่อน</span><b class="bd"></b>';ref.parentNode.insertBefore(b,ref.nextSibling);b.onclick=()=>{if(me.cls&&run)friUI()}}}
  if(me.cls){friPoll();try{mnSet('frb',FRIP.length+FRIW.n)}catch(e){}}
}catch(e){}},1000);
setTimeout(()=>{try{const _wt=wpTick;window.wpTick=wpTick=function(dt){_wt(dt);try{friTick(dt)}catch(e){}}}catch(e){}},90)}
