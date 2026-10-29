/* ---------- v567 ลื่นขึ้นบนมือถือรุ่นกลาง (ภาพเหมือนเดิม) ----------
   วัดด้วย net/perf566.py (จำลอง Galaxy A55 · CPU ช้าลง 4 เท่า) → ส่วนที่แก้:
   · แมพสนาม: มอนฝูงที่อยู่ไกลผู้เล่นทุกคน (> 1,100 px · รวมคนในเขตปลอดภัย) ไม่ต้องคิดการเดินเตร่ทุกเฟรม (แก้ใน simHost · p567)
   · ค่าย/ป้อม: ทหารยามหาเป้าใหม่ทุก 0.25 วิ (เดิมไล่ดูมอนทั้งแมพทุกเฟรมทุกคน) (simHost · p567)
   · กับดักหนาม: ตรวจมอนเหยียบทุก 0.1 วิ (propsHost · p567)
   · ทะเลทรายพีระมิด (แมพ 8): ตัวพีระมิด/สฟิงซ์เก็บเป็นภาพไว้ใช้ซ้ำ (ส่วนที่ขยับยังวาดสดทุกเฟรม) · ลอนทรายรวมเป็นเส้นชุดเดียว (drawDesGround · p567) */
const NGS=new Map();
/* ภาพนิ่งเก็บไว้ใช้ซ้ำ: วาดครั้งเดียวด้วยฟังก์ชันเดิมลงแคนวาสความละเอียด S เท่า (พิกัดโลก l,t คือมุมซ้ายบนของกรอบ) */
function ngSpr(key,l,t,w,h,S,fn){let c=NGS.get(key);if(c)return c;c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w*S));c.height=Math.max(1,Math.ceil(h*S));const x=c.getContext('2d'),g0=g;
  g=x;try{x.scale(S,S);x.translate(-l,-t);x.lineJoin='miter';fn()}catch(e){console.warn('ngSpr',key,e)}finally{g=g0}NGS.set(key,c);return c}
const ngSprS=()=>{let v=2;try{v=(typeof DPR==='number'&&DPR>0?DPR:2)}catch(e){}return Math.min(2.5,Math.max(1.5,Math.round(v*2)/2))};
setTimeout(()=>{
  try{const _dp=drawPyr;window.drawPyr=drawPyr=function(x,y,s,now,big){if(typeof NGS_OFF!=='undefined'&&NGS_OFF)return _dp.apply(this,arguments);
      const w=150*s,h=120*s,l=-.62*w,t=-h-4,W=1.56*w,H=h+12+16*s,S=big?2:ngSprS();
      const c=ngSpr('pyr'+s.toFixed(3)+':'+S,l,t,W,H,S,()=>_dp(0,0,s,0,false));g.drawImage(c,x+l,y+t,W,H);
      if(big){const pu=.6+.4*Math.sin(now*2);g.beginPath();g.moveTo(x-16*s,y+2);g.lineTo(x-16*s,y-26*s);g.lineTo(x-4*s,y-36*s);g.lineTo(x+8*s,y-26*s);g.lineTo(x+8*s,y+3);g.closePath();g.fillStyle='#1a0e06';g.fill();
        glowAt(x-4*s,y-16*s,40*s,'255,190,90',.25*pu);g.strokeStyle='rgba(255,210,120,'+(.6*pu)+')';g.lineWidth=2;g.stroke();
        g.fillStyle='rgba(255,220,140,'+(.75*pu)+')';g.font='bold '+Math.round(9*s)+'px system-ui';g.textAlign='center';g.fillText('☥',x-4*s,y-44*s)}}}catch(e){}
  try{const _ds=drawSphinx;window.drawSphinx=drawSphinx=function(x,y,f){if(typeof NGS_OFF!=='undefined'&&NGS_OFF)return _ds.apply(this,arguments);
      const S=ngSprS(),c=ngSpr('sph'+f+':'+S,-56,-62,112,74,S,()=>_ds(0,0,f));g.drawImage(c,x-56,y-62,112,74)}}catch(e){}
  /* ล้างภาพเก็บเมื่อความละเอียดเปลี่ยนมาก (เปลี่ยนคุณภาพภาพ/หมุนจอ) */
  setInterval(()=>{try{if(NGS.size>24)NGS.clear()}catch(e){}},5000);
},80);
