
/* ---------- v553 สมดุลดันภาค 10 + เข้าร่วมดันภาค 8–10 กับปาร์ตี้ ----------
   เดิม: ห้องดันเนื้อเรื่องภาค 8–10 (41000–49999 · 70000–70999) ไม่อยู่ในตารางห้อง → ปุ่มชวนไม่ขึ้น · ใส่รหัสห้อง = «รหัสห้องไม่ถูกต้อง»
   · ห้องศึกป้องกันท่าเรือเมฆ (72000) ต้องเลเวล 130 (เลเวลมอน) ซึ่งผู้เล่นไม่มีวันถึง → ปาร์ตี้ลงดันภาค 8–10 ด้วยกันไม่ได้เลย */
const DGX10=[[70000,26,'gdl',()=>({x:CX-420,y:CY+80})],[72000,25,'hdf',()=>({x:CX+60,y:CY+380})],[46000,27,'wbl',()=>({x:WBX0+110,y:CY})],[47000,28,'wsk',()=>({x:CX,y:CY+460})],
  [48000,29,'ctw',()=>({x:CX,y:CY+500})],[49000,30,'cwn',()=>({x:CX,y:CY+460})],[45000,31,'wvr',()=>({x:CX,y:CY+480})],[41000,32,'ptd',()=>({x:CX+60,y:CY+400})],[43000,33,'pnq',()=>({x:CX+330,y:CY+180})],[44000,34,'pfn',()=>({x:CX,y:CY+170})]];
const dgx10=id=>DGX10.find(([a])=>id>=a&&id<a+1000)||null;
setTimeout(()=>{try{const h=DGRM.find(r=>r[0]===72000);if(h)h[2]=0;DGX10.forEach(([a,k])=>{if(!DGRM.some(r=>r[0]===a))DGRM.push([a,k,0])})}catch(e){}},0);
try{const _dj=dgJoin;window.dgJoin=dgJoin=function(v){const id=parseInt(String(v).replace(/[^0-9]/g,''),10),R=dgx10(id);if(!R)return _dj.apply(this,arguments);
  if(!DT[R[1]]||id%1000>998){dungeonUI('รหัสห้องไม่ถูกต้อง (ตัวเลข 5 หลัก)');return}if(me.down>0||!run||isDg())return;
  if(!dgMap(id)){dungeonUI('รหัสห้องไม่ถูกต้อง (ตัวเลข 5 หลัก)');return}ov.hidden=true;dInv=null;try{sfx('gate')}catch(e){}let p;try{p=R[3]()}catch(e){p={x:CX,y:CY+300}}enterMap(id,{x:p.x+rnd(-30,30),y:p.y+rnd(-16,16)})}}catch(e){}
/* ปุ่มชวนจากเพื่อนในปาร์ตี้ (ตัวรับเดิมทิ้งห้องที่หาเลขดันจากหลักหมื่นไม่เจอ) */
{const RS=new WeakSet();setInterval(()=>{try{if(!room||!room.on||RS.has(room))return;RS.add(room);room.on('dinv',m=>{try{m=U(m);if(m.sameTab||!m.data||isDg())return;const id=m.data.id|0,R=dgx10(id);if(!R||!DT[R[1]])return;
  dInv={id,tr:R[1],n:cleanName(m.data.n)||'ผู้เล่น',until:Date.now()+30000};if(!DT[Math.floor(id/10000)])try{sfx('quest')}catch(e){}}catch(e){}})}catch(e){}},1000)}
