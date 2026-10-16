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
