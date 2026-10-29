
/* ---------- v561 · บ้านกิลด์: พื้นนอกกำแพงใช้ตัววาดแผนที่โฉมใหม่ (ทุ่งหญ้าแบบแมพ 1: หญ้าเป็นกอ ดอกไม้ป่า แสงเงา เงาเมฆ) ----------
   แมพบ้านกิลด์ (id 5000+) สร้างตอนเข้าบ้าน → ผูกธีมเมื่อสร้างแมพ · ลานในกำแพง/ทุ่งหน้าบ้านเป็นภาพแคชของบ้านวาดทับ (ux70 · ux71) */
const MXGH=()=>Object.assign({},MXC[1],{dk:{0:1,1:1,3:1,4:1},cla:.1,gw:1.1});
function mxGhReg(id){try{const M=MAPS[id];if(M&&M.ghq&&!MXC[id]&&MXC[1])MXC[id]=MXGH()}catch(e){}}
setTimeout(()=>{try{const _gm=ghMap;window.ghMap=ghMap=function(id,G){const r=_gm.apply(this,arguments);mxGhReg(id);return r}}catch(e){}
  try{for(const k in MAPS)if(MAPS[k]&&MAPS[k].ghq)mxGhReg(+k)}catch(e){}},0);
/* วงเขตปลอดภัยของบ้านกิลด์ (รัศมี 760) เดิมทาไล่สีเขียวเข้ม → เมื่อพื้นใช้ตัววาดแผนที่ใหม่ ไม่ทา (เขตปลอดภัยยังทำงานเหมือนเดิม) */
function ghMxSafeOff(){try{return!!(MAPS[curMap]&&MAPS[curMap].ghq&&MXC[curMap]&&mxOn())}catch(e){return false}}
