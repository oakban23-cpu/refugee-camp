/* ---------- v387: ออโต้ล่าเดินอ้อมด้วยตัวหาทาง ----------
   เดิม huntStep วิ่งตรงเข้าหามอน/ของดรอป/จุดล่า → ติดขอบผา ต้นไม้ ป้อม แล้วต้องรอ 1.6 วิ ให้ตัดเป้าทิ้ง
   ตอนนี้ใช้ aqPath (รู้จักที่ราบ บันได หน้าผา ต้นไม้ ป้อม หลุมอเวจี) · วางทางใหม่เมื่อเป้าขยับ/ทุก 1.2 วิ
   คืนค่าระยะทางตามเส้นทาง (ไม่ใช่ระยะตรง) ให้ตัวจับ "ไม่คืบหน้า" ของเดิมทำงานถูก */
const HMP={k:'',t:0,P:null,i:0};
function hmMove(tx,ty,dt,C){let ok=true;try{ok=curMap!==1&&!isDg()&&typeof aqPath==='function'}catch(e){ok=false}if(!ok)return huntMove(tx,ty,dt,C);
  const n=performance.now(),k=curMap+':'+Math.round(tx/40)+':'+Math.round(ty/40);
  if(HMP.k!==k&&n-HMP.t>250||n-HMP.t>1200||!HMP.P){HMP.k=k;HMP.t=n;let P=null;try{P=aqPath(me.x,me.y,tx,ty)}catch(e){P=null}HMP.P=P;HMP.i=0}
  const P=HMP.P;if(!P||P.length<2)return huntMove(tx,ty,dt,C);
  while(HMP.i<P.length-1&&Math.hypot(me.x-P[HMP.i][0],me.y-P[HMP.i][1])<18)HMP.i++;
  if(HMP.i>=P.length-1)return huntMove(tx,ty,dt,C);
  huntMove(P[HMP.i][0],P[HMP.i][1],dt,C);let L=Math.hypot(P[HMP.i][0]-me.x,P[HMP.i][1]-me.y);for(let j=HMP.i;j<P.length-1;j++)L+=Math.hypot(P[j+1][0]-P[j][0],P[j+1][1]-P[j][1]);
  return L}
