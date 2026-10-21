
/* ===== v476 · เข้าเมืองหลวงครั้งแรกไม่กระตุก + ลิฟต์แสงดาวไม่ค้างข้ามแมพ =====
   ① พื้นเมืองหลวง: cityGroundGen (แปลงจาก cityGroundBuild ใน cgfast.py) วาดรวมเป็น Path2D ต่อสี และหยุดพักเป็นช่วง
      ทยอยสร้างล่วงหน้าเงียบ ๆ ตอนว่าง (requestIdleCallback รอไม่เกิน 0.16 วิ · ไม่มีก็ใช้ setTimeout) ครั้งละอย่างน้อย 1 ช่วงงาน
        - เฉพาะเมื่อเปิดเมืองแล้ว (จบภาค 1) อยู่แมพที่มีประตูเชื่อมกับเมืองหลวง (ค่าย · แมพรอบเมือง) และไม่ได้กำลังสู้ (ไม่มีบอสใน 800 · มอนใน 260)
        - ระหว่างนั่งลิฟต์แสงดาวขึ้นเมือง: ทำต่อทุกเฟรม (เฟรมละ ~8 มิลลิวินาที)
        - ลำดับ: เริ่มโหลดภาพ HD ของเมือง → พื้นเมือง (ทีละ 3 แถวหิน ช่วงละไม่กี่มิลลิวินาที) → กำแพงเมือง → บังคับวาดจริง
      ถ้าเข้าเมืองก่อนทยอยเสร็จ cityGroundBuild() ทำส่วนที่เหลือต่อทันทีแบบช่วงใหญ่ (CGG.sync: 12 แถว ไม่บังคับวาดระหว่างทาง)
   ② enterMap ล้างสถานะลิฟต์ (SKL ขาขึ้น · SKA ลงจอด): วาร์ปออกกลางทางลิฟต์แล้วไม่ถูกดึงไปเมืองทีหลัง แสงลงจอดไม่ค้างข้ามแมพ */
const CGG={it:null,sync:0},CGF={c:null,x:null},CPW={nb:null,hd:0,wf:0,n:0,ms:0};
function cgFlush(cv){try{if(!CGF.c){CGF.c=document.createElement('canvas');CGF.c.width=CGF.c.height=1;CGF.x=CGF.c.getContext('2d')}CGF.x.drawImage(cv,0,0,1,1,0,0,1,1)}catch(e){}}
function cityGroundBuild(){if(CG.c)return;if(!CGG.it)CGG.it=cityGroundGen();CGG.sync=1;try{while(!CGG.it.next().done){}}finally{CGG.it=null;CGG.sync=0}}
function cpwNb(){if(CPW.nb)return CPW.nb;const S=new Set();try{for(const k in MAPS){const M=MAPS[k];if(M&&+k<5000&&(M.gates||[]).some(G=>G.to===9))S.add(+k)}((MAPS[9]&&MAPS[9].gates)||[]).forEach(G=>S.add(G.to))}catch(e){}S.delete(9);return CPW.nb=S}
function cpwLift(){try{return!!(SKL&&SKL.G&&SKL.G.to===9)}catch(e){return false}}
function cpwDone(){return!!(CG.c&&CW.c&&!CPW.wf&&(CPW.hd||!(HDI.on&&!LOWQ)))}
function cpwWant(){try{if(cpwDone()||!me.cls||!run||curMap===9||window.PRO_ON)return false;if(cpwLift())return true;
  if(!(me.sty&&me.sty.e))return false;if(typeof isDg==='function'&&isDg())return false;if(!cpwNb().has(curMap))return false;
  /* กำลังสู้อยู่ (บอสใกล้ ๆ หรือมอนประชิด) → รอไว้ทำตอนสงบ */
  for(const m of mons){if(m&&m.hp>0&&!m.ally&&Math.hypot(m.x-me.x,m.y-me.y)<(m.t===3?800:260))return false}return true}catch(e){return false}}
function cpwStep(){
  if(!CPW.hd&&HDI.on&&!LOWQ){CPW.hd=1;try{if(!HDI.img)hdLoad();if(!HDI.img2)hdbLoad()}catch(e){}return true}
  if(!CG.c){if(!CGG.it)CGG.it=cityGroundGen();if(CGG.it.next().done)CGG.it=null;return true}
  if(!CW.c){cityWallBuild();CPW.wf=1;return true}
  if(CPW.wf){CPW.wf=0;cgFlush(CW.c);return true}
  return false}
function cpwRun(ms){const t0=performance.now();do{if(!cpwStep())break;CPW.n++}while(performance.now()-t0<ms);CPW.ms+=performance.now()-t0}
function cpwLoop(){
  if(cpwLift()){try{if(cpwWant())cpwRun(8)}catch(e){}requestAnimationFrame(cpwLoop);return}
  const go=d=>{let more=false;try{if(cpwWant()){cpwRun(d&&!d.didTimeout?Math.max(2,d.timeRemaining()-1):4);more=true}}catch(e){}setTimeout(cpwLoop,more?40:(cpwDone()?3000:400))};
  if(typeof requestIdleCallback==='function')requestIdleCallback(go,{timeout:160});else go(null)}
let CPWL=0;function cpwKick(){if(CPWL)return;CPWL=1;cpwLoop()}
setTimeout(cpwKick,6000);
/* เพิ่งเข้าเกมแล้วขึ้นลิฟต์ไปเมืองทันที (ก่อนตัวทยอยสร้างเริ่ม) → เริ่มทำระหว่างลิฟต์เลย */
skyLift=(f=>function(G){const r=f.apply(this,arguments);try{if(G&&G.to===9&&!cpwDone())cpwKick()}catch(e){}return r})(skyLift);
enterMap=(f=>function(){try{SKL=null;SKA=null}catch(e){}return f.apply(this,arguments)})(enterMap);
