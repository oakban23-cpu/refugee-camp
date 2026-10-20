/* ===== v470 · ประตูข้างพระราชวัง (นครลอยฟ้า) ตัวละครเดินทะลุขึ้นไปบนหน้าประตู =====
   ประตูแบบซุ้ม (pal) เป็นภาพตั้งตรง ฐานอยู่ที่ G.y · เดิมไม่มีจุดชน เดินขึ้นเหนือฐานได้ → ตัวละครถูกวาดทับหน้าประตู/แสงในซุ้ม ดูเหมือนเดินลอยขึ้นผนัง และหายไปหลังตัวประตูเมื่อเดินอ้อมไปด้านหลัง
   แก้: กันชนเป็นกรอบหน้าประตูทั้งบาน (กว้างเท่าเสา สูงถึงยอดซุ้ม) · ยืนหน้าฐานยังกดผ่านประตูได้ตามเดิม (ระยะ 70) */
function palGateCollide(){try{const M=MAPS[curMap];if(!M||!M.gates)return;for(const G of M.gates){if(!G.pal||gHid(G))continue;
  const x1=G.x-70,x2=G.x+70,y1=G.y-172,y2=G.y-6;if(me.x>x1&&me.x<x2&&me.y>y1&&me.y<y2){const L=[me.x-x1,x2-me.x,me.y-y1,y2-me.y],m=Math.min(...L);if(m===L[3])me.y=y2;else if(m===L[0])me.x=x1;else if(m===L[1])me.x=x2;else me.y=y1}}}catch(e){}}
cityCollide=(f=>function(){const r=f.apply(this,arguments);palGateCollide();return r})(cityCollide);
/* v471 · ย้ายทางเข้าพระราชวังมาไว้ที่ประตูหน้าวัง (บันไดใหญ่เหนือลานน้ำพุ) · ไม่วาดซุ้มแยก ใช้ประตูของตัววังเอง + ผนึกแสงเงินระยิบ + ป้ายชื่อ */
function drawPalDoor(G){const t=performance.now()/1000,x=G.x,dy=G.y-136,lb='🏰 '+(G.nm||MAPS[G.to].n);g.save();g.globalCompositeOperation='lighter';
  glowAt(x,dy,58,'200,215,255',.26+.08*Math.sin(t*2));const w=34,h=60;g.strokeStyle='rgba(225,232,255,'+(.45+.25*Math.sin(t*3))+')';g.lineWidth=2;g.beginPath();g.moveTo(x-w,dy+h*.55);g.lineTo(x-w,dy-h*.15);g.arc(x,dy-h*.15,w,Math.PI,0);g.lineTo(x+w,dy+h*.55);g.stroke();
  for(let i=0;i<10;i++){const q=(t*.4+i/10)%1,a=i*2.4+t;glowAt(x+Math.sin(a)*w*.8,dy+h*.5-q*h*1.1,2.2,'235,240,255',Math.sin(q*3.14)*.9)}
  for(let i=0;i<3;i++){const q=(t*.5+i/3)%1;g.strokeStyle='rgba(210,225,255,'+(.35*(1-q))+')';g.lineWidth=1.5;g.beginPath();g.ellipse(x,G.y+2,30+q*40,8+q*10,0,0,7);g.stroke()}
  g.globalCompositeOperation='source-over';g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,16,30,.8)';const ly=dy-h*.15-w-14;g.strokeText(lb,x,ly);g.fillStyle='#ffe8b0';g.fillText(lb,x,ly);g.restore()}
drawOneGate=(f=>function(G){if(G&&G.pdoor){try{drawPalDoor(G)}catch(e){}return}return f.apply(this,arguments)})(drawOneGate);
