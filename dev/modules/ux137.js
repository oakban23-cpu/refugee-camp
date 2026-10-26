/* ===== v530 ภาพปกแนวนอน — จอแนวนอน (มือถือแนวนอน แท็บเล็ต PC) ใช้ภาพปกกว้างเต็มจอแทนโปสเตอร์แนวตั้งชิดขวา
   ภาพ cover-wide.webp (1536×1024) โหลดเสร็จแล้วค่อยติดคลาส #ttl.cw / body.cw → โหลดไม่ได้ (เช่นบน claude.ai) = หน้าแรกแบบเดิม
   โลโก้ ปุ่มเริ่ม และเลขเวอร์ชันย้ายไปฝั่งซ้าย (ท้องฟ้า/ซากลอยฟ้า) + เงาไล่สีจากซ้ายรองตัวหนังสือ · ตัวละครอยู่ฝั่งขวาเต็ม ๆ
   ภาพจัดตำแหน่ง 72%/45% (CWP) · จอกว้างมาก (≥19:10) 72%/60% ตัดฟ้าด้านบนมากกว่าเท้าตัวละคร · จอ 4:3 ตัดฝั่งซ้ายมากกว่า กวางไม่หลุดขอบ · ชั้นภาพเคลื่อนไหวทับปก (ux50) วัดตำแหน่งใหม่ในภาพกว้าง:
   ประตูมิติหมุน · กองไฟกลางค่าย + ประกายไฟ · ตะเกียง/คบเพลิง · ลูกแก้วสุริยะของนักบวช · คริสตัลไม้เท้าจอมเวท · กวางวิญญาณ · คมดาบแดงวาบ
   · น้ำตกเรืองแสงซากลอยฟ้า · ตาเทวรูป/จารึกเรือง · จอแนวตั้งใช้ cover.jpg เหมือนเดิมทุกอย่าง
   พื้นหลังเบลอในเกม (จอแนวนอน) และหน้าเลือกตัวละครจอแนวนอนก็ใช้ภาพกว้างด้วย (CWV.on=0 ปิด) ===== */
const CWV={on:1,ok:0,err:'',mq:null},CWP=[.72,.45];
function cwWide(){if(!CWV.ok||!CWV.on)return false;const T=$('ttl');if(!T||!T.classList.contains('cw'))return false;try{CWV.mq=CWV.mq||matchMedia('(min-aspect-ratio:23/20)');if(!CWV.mq.matches)return false;CWP[1]=innerWidth/Math.max(1,innerHeight)>=1.9?.6:.45;return true}catch(e){return false}}
function cwFx(ctx,Q,S,t,dt,glow){
  /* ประตูมิติ */
  {const [x,y]=Q(.842,.058);glow(x,y,S(120),'170,90,255',.26+.12*Math.sin(t*1.3));ctx.save();ctx.translate(x,y);ctx.scale(1,.32);ctx.rotate(t*.7);ctx.strokeStyle='rgba(220,170,255,.42)';ctx.lineWidth=S(3.5);for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(0,0,S(50+k*26),k,k+2.2);ctx.stroke()}ctx.restore()}
  /* น้ำตกเรืองแสงซากลอยฟ้า */
  {const pu=.6+.4*Math.sin(t*1.1);for(const [fx,fy,r] of [[.15,.43,60],[.1,.33,48],[.2,.32,40]]){const [x,y]=Q(fx,fy);glow(x,y,S(r),'90,240,220',.16*pu)}
    for(let i=0;i<6;i++){const q=(t*.5+i/6)%1,[x,y]=Q(.135+(i%3)*.012,.39+q*.07);ctx.fillStyle='rgba(170,255,240,'+(.7*Math.sin(q*Math.PI))+')';ctx.fillRect(x,y,S(2),S(2))}}
  /* ตาเทวรูป + จารึก */
  {const pu=.55+.45*Math.sin(t*1.7);const [ex,ey]=Q(.722,.133);glow(ex,ey,S(26),'120,255,240',.45*pu);const [sx,sy]=Q(.628,.225);glow(sx,sy,S(70),'80,230,255',.2+.12*Math.sin(t*.9))}
  /* กองไฟกลางค่าย + ประกายไฟ */
  {const [x,y]=Q(.498,.478),fl=.75+.25*Math.sin(t*9)*Math.sin(t*5.3);glow(x,y,S(80)*fl,'255,150,50',.36*fl);glow(x,y-S(8),S(22),'255,230,150',.5*fl);
    for(let i=0;i<10;i++){const q=(t*.55+i/10)%1,px=x+Math.sin(i*2.7+t*1.5)*S(12)*(1+q),py=y-S(6)-q*S(95);ctx.fillStyle='rgba(255,'+(200-q*120|0)+',80,'+(1-q)+')';ctx.fillRect(px,py,S(2.6),S(2.6))}}
  /* ตะเกียง/คบเพลิง */
  CW_LAN.forEach(([fx,fy,r],i)=>{const [x,y]=Q(fx,fy),f=.7+.3*Math.sin(t*(3+i%3)+i*1.7);glow(x,y,S(r||14)*f,'255,190,90',.45*f)});
  /* ลูกแก้วสุริยะ (นักบวช) */
  {const [x,y]=Q(.636,.366),pu=.7+.3*Math.sin(t*2.4);glow(x,y,S(85)*pu,'255,230,140',.42*pu);ctx.save();ctx.translate(x,y);ctx.rotate(t*.4);ctx.strokeStyle='rgba(255,240,180,'+(.35*pu)+')';ctx.lineWidth=S(2);for(let k=0;k<8;k++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.moveTo(S(26),0);ctx.lineTo(S(52+10*Math.sin(t*3+k)),0);ctx.stroke()}ctx.restore()}
  /* คริสตัลไม้เท้าจอมเวท */
  {const [x,y]=Q(.872,.437),pu=.6+.4*Math.sin(t*3.1+1);glow(x,y,S(30)*pu,'130,190,255',.5*pu)}
  /* กวางวิญญาณ */
  {const [x,y]=Q(.925,.52),pu=.6+.4*Math.sin(t*1.6);glow(x,y,S(150),'120,190,255',.16*pu);for(let i=0;i<9;i++){const q=(t*.35+i/9)%1,[px,py]=Q(.875+((i*.137)%.11),.42+((i*.29)%.24));ctx.fillStyle='rgba(170,220,255,'+(.8*Math.sin(q*Math.PI))+')';ctx.beginPath();ctx.arc(px,py-q*S(50),S(2),0,7);ctx.fill()}}
  /* คมดาบแดงวาบ (ปลายดาบ → โกร่ง) */
  {const per=4.5,k=(t%per)/per;if(k<.22){const q=k/.22,[x0,y0]=Q(.405,.815),[x1,y1]=Q(.56,.735),x=x0+(x1-x0)*q,y=y0+(y1-y0)*q;glow(x,y,S(34),'255,200,200',.7*Math.sin(q*Math.PI))}}}
const CW_LAN=[[.153,.523,16],[.176,.566,18],[.258,.515],[.297,.497],[.372,.46],[.418,.44],[.468,.425],[.548,.41],[.605,.395],[.652,.4],[.83,.36,12],[.79,.42,12]];
(function(){try{
  const st=document.createElement('style');st.id='cwcss';st.textContent='@media (min-aspect-ratio:23/20){'+
  '#ttl.cw .fr{width:100vw;box-shadow:none}#ttl.cw .bgb{background-image:url(cover-wide.webp)}'+
  '#ttl.cw .bg,#ttl.cw .sh{left:0;right:0;width:auto;box-shadow:none}'+
  '#ttl.cw .bg{background-image:url(cover-wide.webp),radial-gradient(ellipse at 50% 35%,#3a2a5a,#0a0612 70%);background-position:72% 45%}'+
  '#ttl.cw .sh{background:linear-gradient(90deg,rgba(5,3,12,.82) 0%,rgba(5,3,12,.62) 22%,rgba(5,3,12,.25) 38%,rgba(0,0,0,0) 50%),linear-gradient(180deg,rgba(6,4,14,.35) 0%,rgba(0,0,0,0) 16%,rgba(0,0,0,0) 80%,rgba(5,3,2,.55) 100%)}'+
  '#ttl.cw .lg{left:0;right:auto;width:44vw;top:max(14%,calc(50% - 26vh))}#ttl.cw .lg .t{font-size:min(6.4vw,13vh,88px)}'+
  '#ttl.cw .go{left:22vw;bottom:max(16%,calc(50% - 26vh))}#ttl.cw .ver{left:0;right:auto;width:44vw;bottom:5%}'+
  'body.cw::before{background-image:url(cover-wide.webp)!important}'+
  'body.cw #ov:has(>.csw)::before{background:linear-gradient(180deg,rgba(9,7,13,.7),rgba(9,7,13,.93) 55%,#09070d),url(cover-wide.webp) 72% 45%/cover}}'+
  '@media (min-aspect-ratio:19/10){#ttl.cw .bg{background-position:72% 60%}}';
  document.head.appendChild(st);
  const im=new Image();im.onload=()=>{if(!CWV.on)return;CWV.ok=1;const T=$('ttl');if(T)T.classList.add('cw');document.body.classList.add('cw')};im.onerror=()=>{CWV.err='load'};im.src='cover-wide.webp';
}catch(e){CWV.err=String(e).slice(0,200)}})();
