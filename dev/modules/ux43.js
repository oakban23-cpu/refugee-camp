/* ---------- v425 หน้า «มีอะไรใหม่» + คำแนะนำตอนเจอระบบครั้งแรก ----------
   มีอะไรใหม่: เด้งครั้งเดียวต่อรุ่น (จำในเครื่อง refugee_wn) เฉพาะผู้เล่นที่เลเวล ≥ 5 (มือใหม่มีบทสอนของตัวเองอยู่แล้ว) · เปิดดูซ้ำได้ที่เมนู › 🆕 มีอะไรใหม่
   คำแนะนำครั้งแรก: การ์ดเล็กด้านบนจอ ทีละอัน ห่างกันอย่างน้อย 25 วิ · หายเองใน 9 วิ · จำในเครื่องว่าเห็นแล้ว (refugee_tips) */
const WNV='v460';
const WNL=[
  ['🗼','หอป้อมและประตูบ้านกิลด์ ภาพวาดใหม่','หอมุมกำแพงและป้อมยิงทุกแบบใช้ภาพใหม่ ขั้น 1–2 หอไม้ ขั้น 3 หอหินสี่เหลี่ยม ขั้น 4–5 หอหินกลม ประตูหน้าบ้านเป็นประตูรั้วไม้มีหอคู่ ซุ้มหินมีซี่ลูกกรง และซุ้มประตูหอคู่ (ขั้น 5) ธงที่ประตูเป็นสีกิลด์'],
  ['🪨','พื้นบ้านกิลด์แนบอาคาร','อาคารในบ้านกิลด์มีเงาทอดลงพื้นและเงาตรงจุดที่แตะพื้น มีหญ้ากับก้อนหินขึ้นรอบฐาน ไม่ดูลอยอีกต่อไป ขั้น 3 ขึ้นไปพื้นเป็นหินปูทรงไม่เท่ากันมีมอสตามร่อง กำแพงเป็นหินชนวนเข้าชุดกับตัวอาคาร'],
  ['🏚️','อาคารรองบ้านกิลด์ ภาพวาดใหม่','คลังสมบัติ โกดัง ครัว และค่ายทหารในบ้านกิลด์เปลี่ยนเป็นภาพชุดใหม่ ขั้น 1–2 เป็นเกวียน เพิงไม้ ครัวผ้าใบ เต็นท์ทหาร ขั้น 3 ขึ้นไปเป็นห้องนิรภัย ยุ้งฉาง เตาอบหิน คลังอาวุธ ธงทหารเป็นสีกิลด์'],
  ['🏯','ตึกหลักบ้านกิลด์ ภาพวาดใหม่','ตึกบัญชาการบ้านกิลด์เปลี่ยนเป็นชุดภาพใหม่ของกิลด์โดยเฉพาะ ไล่ขั้นตั้งแต่เต็นท์ บ้านไม้ ตึกหิน ป้อมประตูเหล็ก จนถึงปราสาท ธงบนตึกเป็นสีกิลด์ของคุณเอง'],
  ['🏰','บ้านกิลด์โฉมใหม่ ภาพ HD','อาคารทุกหลังในบ้านกิลด์เป็นภาพวาด HD: เต็นท์บัญชาการ บ้านหลังคาม่วง โถงหลังคาน้ำเงิน จนถึงพระราชวังยอดแหลม · หอหินมุมกำแพง ประตูดาว น้ำพุคริสตัล · พื้นและกำแพงมีมิติแสงเงา · ต้นไม้ในสวนผลไม้วาดใหม่ (ตั้งค่า › ภาพ HD)'],
  ['⚔️','ศึกมอนบุกบ้านกิลด์!','หัวหน้า/รองเปิดศึกได้วันละครั้ง (บ้านขั้น 2+ · ในบ้าน 3 คนขึ้นไป) · มอนบุกเป็นคลื่นจากทุ่งด้านใต้ ตีประตู/กำแพงแล้ววิ่งไปหาธงศึก · ป้อมยิงเอง ทหารออกรับ นักบวชฮีล · ออกไปสู้นอกประตูได้ · คลื่นสุดท้ายมีจอมทัพอสูร · ชนะได้รางวัล (3 ศึกแรก/สัปดาห์) + ขึ้นอันดับป้องกันเมือง'],
  ['🛡️','บ้านกิลด์: กำแพง ป้อม ทหาร','บ้านกิลด์ › 🛡️ ป้อม · หัวหน้า/รองอัปกำแพงและประตูเมือง (ขยายบ้านขั้นถัดไปต้องอัปให้ถึงด้วย) · วางป้อมธนู/เวทไฟ/น้ำแข็ง/หินยักษ์ตามแนวกำแพง · จ้างทหารหอก นักธนู นักบวชมาเฝ้าบ้าน · เตรียมไว้รับศึกมอนบุกรอบหน้า!']];
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function wnCSS(){if($('wncss'))return;const st=document.createElement('style');st.id='wncss';
  st.textContent='#wnp{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;background:rgba(6,4,10,.66);padding:16px}#wnp[hidden]{display:none}#wnp .bx{width:min(380px,100%);max-height:86vh;overflow:auto;border-radius:18px;background:var(--u-bg,rgba(23,20,27,.97));border:1px solid var(--u-gold,#e7b75a);box-shadow:0 18px 50px rgba(0,0,0,.6);padding:14px;color:var(--u-text,#ece3d3)}'+
  '#wnp h3{margin:0 0 2px;font-size:18px;color:var(--u-gold2,#f3d08a)}#wnp .sb{font-size:12px;opacity:.75;margin-bottom:8px}#wnp .it{display:flex;gap:10px;padding:7px 4px;border-top:1px solid rgba(255,236,205,.1)}#wnp .it i{font-style:normal;font-size:22px;flex:0 0 30px;text-align:center}#wnp .it b{display:block;font-size:13.5px}#wnp .it small{display:block;font-size:12px;opacity:.8;line-height:1.4}#wnp button{width:100%;margin-top:10px;padding:10px;font-weight:700;border-radius:12px;background:var(--u-gold,#e7b75a);color:#20180c;border:0}'+
  '#tipc{position:fixed;left:50%;top:84px;transform:translateX(-50%);z-index:40;width:min(340px,92vw);display:flex;gap:8px;align-items:flex-start;padding:9px 10px;border-radius:14px;background:rgba(20,16,26,.93);border:1px solid var(--u-gold,#e7b75a);box-shadow:0 8px 24px rgba(0,0,0,.5);color:#f3ead8;font-size:12.5px;line-height:1.45;animation:tipIn .3s ease-out}#tipc[hidden]{display:none}#tipc i{font-style:normal;font-size:20px}#tipc b{color:var(--u-gold2,#f3d08a)}#tipc button{margin-left:auto;padding:2px 8px;font-size:12px;border-radius:8px}@keyframes tipIn{from{opacity:0;transform:translate(-50%,-8px)}}';document.head.appendChild(st)}
function wnShow(){wnCSS();let p=$('wnp');if(!p){p=document.createElement('div');p.id='wnp';document.body.appendChild(p);p.addEventListener('click',e=>{if(e.target===p||e.target.closest('[data-wnx]')){p.hidden=true;lsSet('refugee_wn',WNV)}})}
  p.innerHTML='<div class="bx"><h3>🆕 มีอะไรใหม่ใน REFUGEE</h3><div class="sb">อัปเดต '+WNV+' · ของใหม่ที่ลองได้เลย</div>'+WNL.map(q=>'<div class="it"><i>'+q[0]+'</i><div><b>'+q[1]+'</b><small>'+q[2]+'</small></div></div>').join('')+'<button data-wnx="1">เข้าใจแล้ว ไปเล่นต่อ!</button></div>';p.hidden=false}
function wnBtn(){if($('wnb'))return;const ref=$('gdb')||$('frb')||$('pb');if(!ref||!ref.parentNode)return;const b=document.createElement('button');b.id='wnb';b.innerHTML='<i>🆕</i><span>มีอะไรใหม่</span>';ref.parentNode.insertBefore(b,ref.nextSibling);b.onclick=()=>{try{$('mnp').hidden=true}catch(e){}wnShow()}}
/* ---- คำแนะนำครั้งแรก ---- */
let TIPSEEN=null;const TIPS={t:0,cur:'',hide:0,near:0};
function tipSeen(){if(!TIPSEEN){try{TIPSEEN=new Set(JSON.parse(lsGet('refugee_tips')||'[]'))}catch(e){TIPSEEN=new Set()}}return TIPSEEN}
function tipMark(k){tipSeen().add(k);lsSet('refugee_tips',JSON.stringify([...TIPSEEN]))}
const TIPL=[
  ['pty','🧗','<b>อยู่ปาร์ตี้แล้ว!</b> แตะ 🧗 ที่ชื่อเพื่อนในแถบขวา เพื่อตีลังกาขึ้นขี่คอ · คนล่างสุดรับดาเมจแทนทุกคน',()=>{try{return PTY&&PTY.mem&&PTY.mem.length>1}catch(e){return false}}],
  ['base','🤸','<b>คุณเป็นฐานหอ</b> · กดปุ่ม «🤸 โยนขึ้น!» ดีดเพื่อนลงกระแทกพื้นได้ (ยิ่งหอสูงยิ่งแรง)',()=>{try{return!!SKB0}catch(e){return false}}],
  ['ride','🐎','<b>ขี่สัตว์อยู่</b> · เพื่อนที่ยืนใกล้กด «ขอซ้อน» เพื่อซ้อนท้ายไปด้วยกันได้',()=>!!me.riding&&Object.values(others).some(o=>o&&Math.hypot(o.x-me.x,o.y-me.y)<120)],
  ['pair','🤝','<b>มีคนอยู่ใกล้ ๆ</b> · เมนูท่าทาง 😊 มีไฮไฟว์ กอด โพสคู่ และ 📷 โหมดถ่ายรูป',()=>TIPS.near>5],
  ['dye','🎨','<b>มีสมุนไพรแล้ว</b> · ผสมสีย้อมชุดได้ที่ตู้เสื้อผ้าในเต็นท์ (แท็บ 🎨 ย้อมสี)',()=>{try{return((me.gth&&me.gth.m&&me.gth.m.h1)|0)>=3}catch(e){return false}}],
  ['guild','🏰','<b>เลเวล 20 แล้ว!</b> ตั้งกิลด์หรือเข้ากิลด์เพื่อนได้ที่ เมนู › 🏰 กิลด์ (โบนัส EXP + ภารกิจกิลด์)',()=>me.lv>=20&&!(typeof GDS!=='undefined'&&GDS.g)&&(typeof gdOnl==='function'&&gdOnl())]];
function tipShow(T){wnCSS();let c=$('tipc');if(!c){c=document.createElement('div');c.id='tipc';document.body.appendChild(c);c.addEventListener('click',e=>{if(e.target.closest('[data-tipx]')){c.hidden=true}})}
  c.innerHTML='<i>'+T[1]+'</i><div>'+T[2]+'</div><button data-tipx="1">✕</button>';c.hidden=false;TIPS.cur=T[0];TIPS.hide=performance.now()+9000;tipMark(T[0])}
function tipTick(){const c=$('tipc'),now=performance.now();if(c&&!c.hidden&&now>TIPS.hide)c.hidden=true;
  if(!me.cls||!run||!ov.hidden||(typeof SD!=='undefined'&&SD.on)||($('wnp')&&!$('wnp').hidden)||(typeof PH!=='undefined'&&PH.on))return;
  if(Object.values(others).some(o=>o&&Math.hypot(o.x-me.x,o.y-me.y)<110))TIPS.near++;else TIPS.near=0;
  if(now<TIPS.t)return;const S=tipSeen();for(const T of TIPL){if(S.has(T[0]))continue;let ok=false;try{ok=T[3]()}catch(e){}if(ok){tipShow(T);TIPS.t=now+25000;return}}}
setTimeout(()=>{
  setInterval(()=>{try{wnBtn();tipTick();
      if(me.cls&&run&&ov.hidden&&!(typeof SD!=='undefined'&&SD.on)&&lsGet('refugee_wn')!==WNV){if(me.lv>=5){const p=$('wnp');if(!p||p.hidden)wnShow()}else lsSet('refugee_wn',WNV)}}catch(e){}},1000);
},900);
