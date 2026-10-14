/* ---------- v362 ชั้นของประกอบขอบจอ ----------
   · CAMF = จุดกึ่งกลางภาพในโลก (ไม่ขึ้นกับซูม) → ซูมกระแทกตอนคริไม่ทำให้ชั้นหน้ากระโดด
   · FGO = ระยะหน่วงของของประกอบขอบจอ: ขยับตามกล้องนิดเดียวแล้วสปริงกลับ (สูงสุด ±26px) แทนการเลื่อนตามกล้อง ×1.6 */
const CAMF={x:0,y:0},FGO={x:0,y:0,lx:null,ly:null,t:0};
function fgUpd(){const n=performance.now(),dt=Math.min(.05,FGO.t?(n-FGO.t)/1000:.016);FGO.t=n;
  if(FGO.lx===null||Math.abs(CAMF.x-FGO.lx)>300||Math.abs(CAMF.y-FGO.ly)>300){FGO.lx=CAMF.x;FGO.ly=CAMF.y;FGO.x=0;FGO.y=0;return}
  FGO.x-=(CAMF.x-FGO.lx)*.3;FGO.y-=(CAMF.y-FGO.ly)*.3;FGO.lx=CAMF.x;FGO.ly=CAMF.y;const k=Math.exp(-dt*3);FGO.x=Math.max(-26,Math.min(26,FGO.x*k));FGO.y=Math.max(-26,Math.min(26,FGO.y*k))}
