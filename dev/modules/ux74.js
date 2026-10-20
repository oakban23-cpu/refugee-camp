/* ===== v468 · หน้าจอเล่นโล่งขึ้น =====
   ① การ์ดเควส/คู่มือรูน/บอสโลก มุมซ้ายบน: ย่อเป็นบรรทัดเดียวเสมอ · กางเองชั่วคราว 6 วิเมื่อเข้าแมพหรือเป้าหมายเปลี่ยน · แตะการ์ดที่ย่อ = กางดู 8 วิ
   ② ช่องแชท/ข้อความระบบ มุมซ้ายล่าง: ปกติเห็นไม่เกิน ~4 บรรทัด · ตอนสู้เหลือ ~2 บรรทัดและจางลง
   ③ ตัวเลขรางวัลลอยทางขวา: ไม่เกิน 4 แถว และหายเร็วขึ้น (แก้ใน ux12) */
const HUDX={until:0,sig:'',map:-1};
{const s=document.createElement('style');s.textContent='#clog.hx2{max-height:84px!important}#clog.hx2f{max-height:46px!important;opacity:.62;transition:opacity .3s}';document.head.appendChild(s)}
function hudxSig(){let s='';try{['stq','rnq','rbq'].forEach(id=>{const e=$(id);if(e&&!e.hidden){const b=e.querySelector('b');s+=id+':'+((b&&b.textContent)||'').replace(/[\d,.:]+/g,'#').slice(0,60)+'|'}})}catch(e){}return s}
vz3HudTick=(f=>function(){const T=$('topb');if(!T||!me.cls)return f.apply(this,arguments);const F=vz3Fight(),now=performance.now();
  if(HUDX.map!==curMap){HUDX.map=curMap;HUDX.until=now+6000}
  const sg=hudxSig();if(sg!==HUDX.sig){if(HUDX.sig)HUDX.until=Math.max(HUDX.until,now+6000);HUDX.sig=sg}
  const open=now<HUDX.until&&!F.fight;T.classList.toggle('vzhide',!!F.boss);T.classList.toggle('vzmin',!F.boss&&!open);
  const C=$('clog');if(C){C.classList.toggle('hx2f',F.fight);C.classList.toggle('hx2',!F.fight)}})(vz3HudTick);
/* แตะการ์ดตอนย่อ → กางดู 8 วิ (ไม่ไปกดปุ่มในการ์ดทันที) */
document.addEventListener('click',e=>{try{const T=$('topb');if(!T||!T.classList.contains('vzmin'))return;const c=e.target.closest&&e.target.closest('#stq,#rnq,#rbq');if(!c||!T.contains(c))return;if(c.id==='stq'&&c.classList.contains('min'))return;
  e.stopPropagation();e.preventDefault();HUDX.until=performance.now()+8000;T.classList.remove('vzmin');try{sfx('click')}catch(_){}}catch(_){}},true);
