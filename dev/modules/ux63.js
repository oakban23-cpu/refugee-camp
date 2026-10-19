
/* ===== v449 · เดินด้วยคีย์บอร์ดบน PC (WASD / ปุ่มลูกศร) =====
   - ใช้ e.code (ตำแหน่งปุ่มจริง) → แป้นพิมพ์ภาษาไทยก็ใช้ได้ ไม่ต้องสลับเป็นภาษาอังกฤษ
   - ทำงานเป็น «จอยเสมือน» (joy.kb) ตัวเดียวกับจอยบนจอ → ทุกระบบที่ฟังจอยอยู่แล้วทำงานเหมือนกัน
     (ยกเลิกจุดล่าออโต้ · กระโดดลงจากคอ/หลังสัตว์ · หันหน้า · ปุ่มจอยบนจอขยับตาม)
   - กดทแยงได้ (ความเร็วเท่าเดิม) · ถ้ากำลังลากจอยด้วยเมาส์/นิ้ว จอยนั้นมาก่อน
   - ไม่ทำงานตอนพิมพ์แชท/ช่องกรอก · ตอนเปิดหน้าต่างเมนู · สลับหน้าต่างแล้วปุ่มค้างจะถูกล้าง */
const U63={k:{},tip:0};
const U63MAP={KeyW:[0,-1],KeyS:[0,1],KeyA:[-1,0],KeyD:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
function u63Typing(){const a=document.activeElement;return!!(a&&(/INPUT|TEXTAREA|SELECT/.test(a.tagName)||a.isContentEditable))}
function u63Clear(){U63.k={};try{if(joy&&joy.kb)joy=null}catch(e){}}
addEventListener('keydown',e=>{if(!U63MAP[e.code]||e.ctrlKey||e.metaKey||e.altKey)return;if(u63Typing())return;U63.k[e.code]=1;
  try{if(run&&me.cls&&e.code.indexOf('Arrow')===0)e.preventDefault()}catch(x){}});
addEventListener('keyup',e=>{if(U63MAP[e.code])delete U63.k[e.code]});
addEventListener('blur',u63Clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)u63Clear()});
function u63Apply(){let dx=0,dy=0;for(const c in U63.k){const v=U63MAP[c];if(v){dx+=v[0];dy+=v[1]}}dx=Math.sign(dx);dy=Math.sign(dy);
  const kbj=joy&&joy.kb;
  if((!dx&&!dy)||u63Typing()||!run||!me.cls||(typeof ov!=='undefined'&&!ov.hidden)){if(kbj)joy=null;if(u63Typing()||(typeof ov!=='undefined'&&!ov.hidden))U63.k={};return}
  if(joy&&!joy.kb)return;
  const n=(dx&&dy)?40/Math.SQRT2:40;joy={ox:JB.x,oy:JB.y,dx:dx*n,dy:dy*n,t0:kbj?joy.t0:performance.now(),mv:1,kb:1}}
updateMe=(f=>function(dt){try{u63Apply()}catch(e){}return f.apply(this,arguments)})(updateMe);
/* แนะนำครั้งเดียวบนเครื่องที่ใช้เมาส์ */
setInterval(()=>{try{if(U63.tip||!run||!me.cls)return;U63.tip=1;if(localStorage.getItem('refugee_kbtip'))return;if(!(window.matchMedia&&matchMedia('(pointer:fine)').matches))return;
  localStorage.setItem('refugee_kbtip','1');sysMsg('⌨️ เล่นบนคอม: เดินด้วย W A S D หรือปุ่มลูกศร · Space/Shift = หลบ')}catch(e){}},3000);
