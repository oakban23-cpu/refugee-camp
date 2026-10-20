/* ===== v470 · ประตูข้างพระราชวัง (นครลอยฟ้า) ตัวละครเดินทะลุขึ้นไปบนหน้าประตู =====
   ประตูแบบซุ้ม (pal) เป็นภาพตั้งตรง ฐานอยู่ที่ G.y · เดิมไม่มีจุดชน เดินขึ้นเหนือฐานได้ → ตัวละครถูกวาดทับหน้าประตู/แสงในซุ้ม ดูเหมือนเดินลอยขึ้นผนัง และหายไปหลังตัวประตูเมื่อเดินอ้อมไปด้านหลัง
   แก้: กันชนเป็นกรอบหน้าประตูทั้งบาน (กว้างเท่าเสา สูงถึงยอดซุ้ม) · ยืนหน้าฐานยังกดผ่านประตูได้ตามเดิม (ระยะ 70) */
function palGateCollide(){try{const M=MAPS[curMap];if(!M||!M.gates)return;for(const G of M.gates){if(!G.pal||gHid(G))continue;
  const x1=G.x-70,x2=G.x+70,y1=G.y-172,y2=G.y-6;if(me.x>x1&&me.x<x2&&me.y>y1&&me.y<y2){const L=[me.x-x1,x2-me.x,me.y-y1,y2-me.y],m=Math.min(...L);if(m===L[3])me.y=y2;else if(m===L[0])me.x=x1;else if(m===L[1])me.x=x2;else me.y=y1}}}catch(e){}}
cityCollide=(f=>function(){const r=f.apply(this,arguments);palGateCollide();return r})(cityCollide);
