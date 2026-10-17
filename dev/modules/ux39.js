/* ---------- v420 กราฟิกอัตโนมัติแบบขั้นบันได (โหมด «อัตโนมัติ» เท่านั้น) ----------
   เดิม: ช้าเกิน 24ms/เฟรม 2 ช่วงติด → กระโดดไปโหมดประหยัดทั้งเกมทันที
   ใหม่: ขั้น 1 «ลดเฉพาะคนอื่น» (LITEQ) ก่อน — ตัวเรายังสวยเต็มที่ ส่วนผู้เล่นคนอื่น/คนบนหอวาดแบบประหยัด
         (ไม่มีแสงเงาปริมาตร/แสงขอบ/สปริงผ้า/ฝุ่นเท้า · ออร่าครึ่งเดียว) · มอนลงแสงแค่ 2 ตัวใกล้สุด ไม่มีแสงขอบ · ความละเอียดจอสูงสุด 1.75 เท่า
         ขั้น 2 = โหมดประหยัดเดิม (ต้องผ่านขั้น 1 แล้วยังช้าอยู่)
   กลับขึ้นเอง: อยู่ขั้น 1 แล้วเวลาวาดเฉลี่ยต่ำมาก (<5ms) ต่อเนื่อง ~8 วิ → กลับเต็ม (สูงสุด 2 ครั้ง/รอบเล่น กันสลับไปมา) */
var LITEQ=0,LQME=0,LQOTH=0;/* LQOTH = กำลังวาดคนอื่นแบบประหยัดชั่วคราว (ไม่ใช่โหมดประหยัดจริง) */const LQ={hi:0,lo:0,rec:0,last:0};
function lqSet(v,msg){if(LITEQ===v)return;LITEQ=v;try{MLB.cap=v?2:5}catch(e){}LQ.hi=0;LQ.lo=0;try{applyQ()}catch(e){}if(msg)try{sysMsg(msg)}catch(e){}}
function lqWindow(avg){if(GQ!=='auto'||LOWQ){if(LITEQ&&GQ!=='auto')lqSet(0);return}
  if(!LITEQ){if(avg>19){if(++LQ.hi>=2)lqSet(1,'⚙️ ลดรายละเอียดผู้เล่นคนอื่นอัตโนมัติ (ตัวคุณยังเต็ม) เพื่อให้ลื่นขึ้น')}else LQ.hi=0;return}
  let dr=99;try{const D=PF.dr;if(D&&D.length>=60)dr=D.reduce((a,b)=>a+b,0)/D.length}catch(e){}
  if(avg<17.5&&dr<5&&LQ.rec<2){if(++LQ.lo>=5){LQ.rec++;lqSet(0)}}else LQ.lo=0}
function lqIsMe(name,x,lk){const key=(lk&&lk.u)||name||'?';return key==='me'||(typeof uid!=='undefined'&&key===uid)||(me&&name===me.name&&x===me.x)}
setTimeout(()=>{
  /* จับช่วงวัด FPS ที่ครบ 90 เฟรม */
  try{const _ft=fpsTick;fpsTick=function(now){const n0=FQ.n;const r=_ft.apply(this,arguments);try{if(n0>=89&&FQ.n===0&&FQ.avg)lqWindow(FQ.avg)}catch(e){}return r}}catch(e){}
  /* ขั้น 1: ผู้เล่นคนอื่นวาดด้วยรายละเอียดแบบประหยัด (สลับ LOWQ ชั่วคราวเฉพาะตอนวาดตัวเขา) */
  try{const _d0=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const im=lqIsMe(name,x,lk),L0=LOWQ;LQME=im?1:0;
      if(LITEQ&&!im&&!L0){LOWQ=true;LQOTH=1;try{return _d0.apply(this,arguments)}finally{LOWQ=L0;LQME=0;LQOTH=0}}
      try{return _d0.apply(this,arguments)}finally{LQME=0}}}catch(e){}
  /* ขั้น 1: แสงขอบเฉพาะตัวเรา (มอน/คนอื่นไม่มี) */
  try{const _rp=gxRimPass;gxRimPass=function(){if(LITEQ&&!LQME)return;return _rp.apply(this,arguments)}}catch(e){}
  /* ตั้งค่ากราฟิกเป็นอย่างอื่น = ออกจากขั้น 1 */
  try{const _sg=setGQ;setGQ=function(q){LITEQ=0;try{MLB.cap=5}catch(e){}LQ.hi=0;LQ.lo=0;return _sg.apply(this,arguments)}}catch(e){}
},850);
