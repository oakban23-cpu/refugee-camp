/* ---------- v575 การ์ดเควสมุมซ้ายบน: กางแล้วค้างไว้ ----------
   ปัญหา (v468): การ์ดเควส/ภารกิจจุติ/คู่มือรูน ย่อเป็นบรรทัดเดียวเอง · แตะแล้วกางแค่ 8 วิ และถ้ามีมอนใกล้ (ออโต้เควสสู้ตลอด) ย่อกลับทันทีในเฟรมถัดไป → เปิดไม่ทันเห็น
   ใหม่: แตะการ์ดที่ย่ออยู่ = กางค้าง (ไม่ย่อเองตอนสู้/หมดเวลา) จำไว้ข้ามการเข้าเกม · กดปุ่ม ‹ บนการ์ด = กลับเป็นแบบย่ออัตโนมัติ
   · สู้บอสยังซ่อนการ์ดเหมือนเดิม (จอแน่น) แล้วกลับมากางเองเมื่อบอสจบ */
const HPIN={on:0};try{HPIN.on=localStorage.getItem('refugee_hudpin')==='1'?1:0}catch(e){}
function hpinSet(v){HPIN.on=v?1:0;try{localStorage.setItem('refugee_hudpin',v?'1':'0')}catch(e){}try{vz3HudTick()}catch(e){}}
setTimeout(()=>{try{const _t=vz3HudTick;window.vz3HudTick=vz3HudTick=function(){const r=_t.apply(this,arguments);try{if(HPIN.on){const T=$('topb');if(T&&T.classList.contains('vzmin'))T.classList.remove('vzmin')}}catch(e){}return r}}catch(e){console.warn('hpin',e)}},1500);
window.addEventListener('click',e=>{try{const T=$('topb');if(!T||!me.cls)return;const c=e.target.closest&&e.target.closest('#stq,#rnq,#rbq');if(!c||!T.contains(c))return;
  if(HPIN.on){if(e.target.closest('[data-sqx],[data-rqx]')){e.stopPropagation();e.preventDefault();hpinSet(0);try{sfx('click')}catch(_){}}return}
  if(T.classList.contains('vzmin')&&!(c.id==='stq'&&c.classList.contains('min'))){e.stopPropagation();e.preventDefault();hpinSet(1);T.classList.remove('vzmin');try{sfx('click')}catch(_){}return}
  /* แตะไอคอนเควสแบบเม็ดกลม (ย่อสุด) → กางเต็ม + ค้างไว้ */
  if(c.classList.contains('min'))hpinSet(1)}catch(_){}},true);
