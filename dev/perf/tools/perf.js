/* ---------- v654 ประสิทธิภาพ (PERF) · แก้ตามรายงาน dev/perf/REPORT.md · ทุกข้อวัดก่อน/หลังแล้ว ----------
   PERF-01 ttl : หน้าเริ่มเกม (#ttl ทึบเต็มจอ z99) ยังไม่เฟดออก → ไม่วาดโลกเกมข้างหลัง (ตรวจแล้วมองไม่เห็นเลย 0%)
   PERF-03 rel : แคชใหญ่ของแมพที่ออกมาแล้วเกิน 60 วิ → คืนหน่วยความจำ
                 อัสตรา (พื้น/กำแพง/แสงกลางวัน) คืนเฉพาะตอนอยู่แมพที่ไม่ติดกับอัสตรา (แมพข้างเคียงมีระบบเตรียมแคชล่วงหน้า cpw)
                 นครรากลึก (ลำต้นยักษ์) · หมอกแมพใต้ดิน (DFOV ล้างเมื่อเปลี่ยนแมพ สร้างใหม่ตามต้องการ)
   PERF-04 tt3 : canvas หน้าเริ่มเกมหลังหน้านั้นถูกลบ → ย่อเหลือ 0 (ฉากเปิดเรื่องแก้ใน source)
   PERF-05 rk  : เตรียมเสียงเพลงล่วงหน้า (ก้อนละ ~7 ms) → ทำตอนเครื่องว่าง (requestIdleCallback) แทนแทรกกลางเฟรม
   PERF-06 menu: เปิดหน้าต่างเมนูอยู่ → วาดโลกข้างหลัง (มืดลงใต้ฉากหลังหน้าต่าง) ที่ 20 fps · หน้าต่าง/UI ยังลื่นเท่าเดิม
   ปิดรายข้อ: PERF.ttl=0 / PERF.rel=0 / PERF.tt3=0 / PERF.rk=0 / PERF.menu=0 */
const PERF={ttl:1,rel:1,tt3:1,rk:1,menu:1,menuFps:20,relMs:60000,
  st:{ttlSkip:0,menuSkip:0,rel:{},rkIdle:0},ttlEl:null,lastDraw:0,mapT:{},lastMap:-1,lastChk:0};
function perfTtlCover(){if(!PERF.ttl)return false;let T=PERF.ttlEl;if(!T||!T.isConnected){T=PERF.ttlEl=document.getElementById('ttl');if(!T)return false}
  return T.isConnected&&!T.classList.contains('out')&&!T.hidden}
function perfMenuOpen(){try{return PERF.menu&&run&&me.cls&&ov&&!ov.hidden}catch(e){return false}}
function perfRelease(now){
  /* จดเวลาที่อยู่แต่ละแมพล่าสุด */
  PERF.mapT[curMap]=now;
  if(curMap!==PERF.lastMap){PERF.lastMap=curMap;try{for(const k in DFOV)delete DFOV[k]}catch(e){}}
  if(now-PERF.lastChk<2000)return;PERF.lastChk=now;
  /* PERF-04 canvas หน้าเริ่มเกมที่ถูกถอดออกแล้ว */
  if(PERF.tt3)try{if(TT3.cv&&!TT3.cv.isConnected&&TT3.cv.width){TT3.cv.width=TT3.cv.height=0;TT3.I={};PERF.st.rel.tt3=(PERF.st.rel.tt3|0)+1}}catch(e){}
  if(!PERF.rel)return;
  const away=k=>now-(PERF.mapT[k]||0)>PERF.relMs;
  /* อัสตรา */
  try{if(curMap!==9&&away(9)&&!(typeof cpwNb==='function'&&cpwNb().has(curMap))&&(CG.c||CW.c||CST.c)){
    CG.c=null;try{CGT.m.clear();CGT.src=null}catch(e){}CW.c=null;CW.rows=null;if(CST.c){CST.c.width=CST.c.height=0;CST.c=null;CST.key=''}
    try{if(typeof AST!=='undefined'&&AST.re)AST.re=null}catch(e){}PERF.st.rel.astra=(PERF.st.rel.astra|0)+1}}catch(e){}
  /* นครรากลึก: สไปรต์ลำต้นยักษ์ */
  try{if(curMap!==44&&curMap!==45&&away(44)&&away(45)&&PBTC&&Object.keys(PBTC).length){for(const k in PBTC){const c=PBTC[k];try{if(c&&c.c){c.c.width=c.c.height=0}else if(c&&c.width){c.width=c.height=0}}catch(e){}delete PBTC[k]}PERF.st.rel.pb=(PERF.st.rel.pb|0)+1}}catch(e){}}
/* เรียกจากจุดเดียวใน loop (ชั้นนอกสุด) แทนการห่อ draw: กันตัวห่อชั้นนอก (vignette, HD-2D…) วาดเอฟเฟกต์ซ้ำบนเฟรมเก่า */
function perfSkip(){const now=performance.now();try{perfRelease(now)}catch(e){}
  if(perfTtlCover()){PERF.st.ttlSkip++;return true}
  if(perfMenuOpen()&&PERF.lastDraw&&now-PERF.lastDraw<1000/PERF.menuFps-2){PERF.st.menuSkip++;return true}
  PERF.lastDraw=now;return false}
