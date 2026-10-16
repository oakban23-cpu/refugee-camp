/* ---------- v401 สกิลคลาส 3 (ปุ่มสีอรุณ) ใส่รูนเสริมได้ ----------
   เดิม: ลิงก์รูนเสริมได้แค่สกิล 1/2/3/4 · ใหม่: ช่อง 5 ลิงก์ได้ 3 ช่องเหมือนสกิลอื่น (จุติแล้ว = เปิดครบ)
   แท็กของสกิลเปลี่ยนตามสายคลาส 3 · แท็กใหม่ «ซ้อนไม่ได้» (solo) = สกิลที่มีได้ทีละอันรอบตัว (พายุดาบ วงแหวน วงล้อ ลูกแก้ว โซ่วิญญาณ)
   สกิล solo ใส่รูนที่ "ร่ายสำเนา" ไม่ได้ (ร่ายซ้ำ แยกร่าง สายใยทีม ทอเท็ม กับดัก คริ/ฆ่าแล้วร่าย วิญญาณรับใช้ ทะลุทวีคูณ) เพราะสำเนาจะทับของเดิม */
const R29T={melee:['atk aoe melee solo','atk aoe self buff'],
  archer:['atk proj','atk chain'],
  sup:['heal aoe atk solo','atk chain dur solo'],
  assn:['atk aoe','atk aoe dur solo'],
  mage:['atk dur solo','atk aoe proj']};
try{SGK.push(5)}catch(e){}
try{SGTN.solo='ซ้อนไม่ได้'}catch(e){}
try{Object.keys(R29T).forEach(c=>{if(!SGT[c])return;Object.defineProperty(SGT[c],5,{configurable:true,enumerable:true,get(){let b=0;try{if(me&&me.cls===c&&me.rb)b=s6B()}catch(e){}return R29T[c][b]}})})}catch(e){}
/* ---------- v402 รูนเสริมติดผลเต็มเวลาของสกิลคลาส 3 ----------
   เดิม: ระบบรู้ว่าดาเมจมาจากช่องไหนแค่ช่วงร่าย + 0.7 วิ (หรือ ck ที่เรียนรู้ 7 วิ) → สกิลที่อยู่นาน 6–9 วิ (ลูกแก้ว วงล้อ วงแหวน พายุดาบ)
   และดาเมจที่มาทีหลัง (ศร/อิมป์/ดาบพุ่ง/โล่ระเบิด) ติดผลรูนธาตุ/โซ่/กระจายแค่บางส่วน
   ใหม่: ทุกดาเมจที่เกิดจากสกิลคลาส 3 (ร่าย · ติ๊กต่อเนื่อง · ดาเมจหน่วงเวลาใน pend · สะท้อนดาเมจของโล่) ถูกนับเป็นช่อง 5 ตรง ๆ */
let S5CTX=0;
function s5Run(fn){S5CTX++;const A=pend,n=A.length;try{return fn()}finally{S5CTX--;try{for(let i=n;i<A.length;i++){const it=A[i];if(it&&!it.s5&&typeof it.f==='function'){const f=it.f;it.s5=1;it.f=()=>s5Run(f)}}}catch(e){}}}
setTimeout(()=>{
  try{const _c=s6Cast;s6Cast=function(){const a=arguments,t=this;return s5Run(()=>_c.apply(t,a))}}catch(e){}
  try{const _t=s6Tick;s6Tick=function(){const a=arguments,t=this;return s5Run(()=>_t.apply(t,a))}}catch(e){}
},60);
