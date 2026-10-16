/* ---------- v407 ยกระดับตัวละคร: แสงเงาการ์ตูน · ผม/ผ้าพลิ้วมีแรงเฉื่อย · สีหน้าตามสถานการณ์ ----------
   1) เงาตามรูปทรง (cel): ใน gxLit (ตัวละครในโลก) เพิ่มแถบเงาคม ๆ ด้านล่าง-ขวาของทุกส่วนที่เป็นขอบนอก (แสงมาจากซ้ายบนเหมือนเงาพื้น)
      + เส้นแสงขอบด้านหลังบาง ๆ สีตามบรรยากาศแมพ · ข้ามเมื่อเครื่องหนัก (FQ.avg>21) หรือโหมดประหยัด
   2) ผม/ผ้าคลุม: สปริงตามความเร็วเดินจริงของแต่ละคน — ออกตัวผ้าลากตามหลัง · หยุดแล้วผ้าสะบัดไปหน้าแล้วแกว่งกลับ · หลบ/พุ่งผ้าปลิวแรง
   3) สีหน้า: โดนตี (หลับตาปี๋ + อ้าปาก + สะดุ้ง) · ร่ายสกิล (ตาเรือง) · โหมดคลั่ง (คิ้วขมวด ตาแดงเรือง ยิ้มเหี้ยม) · เลือด < 30% (คิ้วตก เหงื่อตก)
      · ล้มบอส (ตายิ้ม ^ ^) · ตาเหลือบมองเป้าหมายที่ล็อก · เพื่อนในห้องเห็นสีหน้าโดนตี/ร่าย/คลั่ง/เลือดต่ำของกันและกัน */
let CHS={h:0,c:0},CHE=null;
const CHSS={};
function chSpring(key,x,y,fx){const n=performance.now();let S=CHSS[key];if(!S||n-S.t>500){S=CHSS[key]={x,y,t:n,p:0,v:0,ph:0,pv:0,u:0}}
  const dt=Math.min(.05,(n-S.t)/1000);if(dt>0){const vx=(x-S.x)/dt,vy=(y-S.y)/dt,sp=Math.hypot(vx,vy),u=Math.max(-2.2,Math.min(2.2,sp/120));
    S.u+= (u-S.u)*Math.min(1,dt*20);
    const a=60*(S.u-S.p)-8*S.v;S.v+=a*dt;S.p+=S.v*dt;const ah=95*(S.u-S.ph)-9*S.pv;S.pv+=ah*dt;S.ph+=S.pv*dt;S.x=x;S.y=y;S.t=n}
  return{c:Math.max(-4.5,Math.min(4.5,(S.p-S.u)*3.6)),h:Math.max(-1.6,Math.min(1.6,(S.ph-S.u)*1.4))}}
/* สถานะสีหน้า */
const CHEX={};
function chExpr(key,hp,mh,cast,isMe){const n=performance.now();let X=CHEX[key];if(!X)X=CHEX[key]={hp,ht:0};if(hp<X.hp-1)X.ht=n;X.hp=hp;
  if(isMe&&me.hurtT>X.ht&&me.hurtT<=n)X.ht=me.hurtT;if(X.ht>n)X.ht=0;
  let k='n',lx=0,ly=0;
  if(isMe){try{const L=lockId!=null&&mons.find(m=>m.id===lockId&&m.hp>0);if(L){const dx=L.x-me.x,dy=L.y-me.y,d=Math.hypot(dx,dy)||1;lx=Math.abs(dx/d);ly=Math.max(-1,Math.min(1,dy/d))}}catch(e){}}
  let fv=false;try{fv=isMe?FV.on>0:fxs.some(f=>f.k==='fvon'&&f.u===key)}catch(e){}
  if(n-X.ht<380)k='hurt';else if(isMe&&me.happyT>n)k='happy';else if(fv)k='fever';else if(cast)k='cast';else if(mh>0&&hp/mh<.3&&hp>0)k='low';
  return{k,lx,ly,ht:X.ht}}
/* ตา (ไม่ใช่นักฆ่า) — คืน true ถ้าวาดเองแล้ว */
function chEyes(cls,c2,b2,hy,t,x,O){const E=CHE;if(!E)return false;const k=E.k,ec=chEye(cls,c2,b2),lx=(E.lx||0)*.35,ly=(E.ly||0)*.3;
  const brow=(ex,i)=>{g.strokeStyle=O;g.lineWidth=.7;g.beginPath();
    if(k==='fever'){if(!i){g.moveTo(ex-1.5,hy-2.4);g.lineTo(ex+1.4,hy-1.1)}else{g.moveTo(ex-1.4,hy-1.1);g.lineTo(ex+1.5,hy-2.4)}}
    else if(k==='low'){if(!i){g.moveTo(ex-1.5,hy-1.5);g.lineTo(ex+1.4,hy-2.6)}else{g.moveTo(ex-1.4,hy-2.6);g.lineTo(ex+1.5,hy-1.5)}}
    else{g.moveTo(ex-1.5,hy-1.6);g.lineTo(ex+1.4,hy-1.9)}g.stroke()};
  if(k==='hurt'){g.strokeStyle=O;g.lineWidth=.9;for(const[ex,sd] of[[2.5,1],[6.5,-1]]){g.beginPath();g.moveTo(ex-1.3*sd,hy-1.1);g.lineTo(ex+1.1*sd,hy+.2);g.lineTo(ex-1.3*sd,hy+1.4);g.stroke()}
    g.fillStyle='#5a1a1a';g.beginPath();g.ellipse(4.6,hy+4.2,1.1,1.3,0,0,7);g.fill();return true}
  if(k==='happy'){g.strokeStyle=O;g.lineWidth=.95;for(const ex of[2.5,6.5]){g.beginPath();g.moveTo(ex-1.4,hy+.7);g.quadraticCurveTo(ex,hy-1.6,ex+1.4,hy+.7);g.stroke()}
    g.beginPath();g.moveTo(3.4,hy+3.7);g.quadraticCurveTo(4.6,hy+5.1,5.8,hy+3.7);g.stroke();g.fillStyle='rgba(240,120,110,.5)';g.fillRect(-.2,hy+2.3,2.6,1.3);g.fillRect(6.6,hy+2.3,2.2,1.3);return true}
  const glow=k==='fever'?'#ff3a2a':k==='cast'?ec:null,ic=k==='fever'?'#ff5a3a':ec;
  for(let i=0;i<2;i++){const ex=i?6.5:2.5;const bl=((t*.31+(x*.013))%4)<.12&&k!=='fever'&&k!=='cast'?.25:1;
    g.fillStyle='#ffffff';g.beginPath();g.ellipse(ex,hy+.1,1.35,1.9*bl,0,0,7);g.fill();
    if(bl>.5){if(glow){g.shadowColor=glow;g.shadowBlur=5}g.fillStyle=ic;g.beginPath();g.ellipse(ex+.25+lx,hy+.35+ly,1.05,1.5,0,0,7);g.fill();g.shadowBlur=0;
      g.fillStyle=O;g.beginPath();g.ellipse(ex+.3+lx,hy+.5+ly,.55,.9,0,0,7);g.fill();g.fillStyle='#ffffff';g.fillRect(ex-.35+lx,hy-.9+ly,.7,.7)}
    brow(ex,i)}
  if(k==='fever'){g.strokeStyle=O;g.lineWidth=.8;g.beginPath();g.moveTo(3.3,hy+4);g.lineTo(5.9,hy+3.5);g.stroke();g.strokeStyle='rgba(255,60,40,.9)';g.lineWidth=.6;g.beginPath();g.moveTo(-2.5,hy-4.5);g.lineTo(-1.2,hy-3.4);g.moveTo(-2.6,hy-3.3);g.lineTo(-1.3,hy-4.6);g.stroke()}
  if(k==='low'){const q=(t*.8)%1;g.fillStyle='rgba(150,220,255,'+(.9-q*.5)+')';g.beginPath();g.moveTo(9.6,hy-4+q*3);g.quadraticCurveTo(11,hy-1.6+q*3,9.6,hy-1+q*3);g.quadraticCurveTo(8.2,hy-1.6+q*3,9.6,hy-4+q*3);g.fill()}
  return true}
/* ตานักฆ่า (หน้ากาก) */
function chEyesA(c2,hy,t,O){const E=CHE;if(!E)return false;const k=E.k;
  if(k==='hurt'){g.strokeStyle=c2?'#ffe0a0':'#e0c0ff';g.lineWidth=.9;g.beginPath();g.moveTo(1.5,hy-1.2);g.lineTo(3.9,hy-1.2);g.moveTo(5.5,hy-1.2);g.lineTo(7.9,hy-1.2);g.stroke();return true}
  const c=k==='fever'?'#ff4a2a':k==='happy'?'#fff0a0':c2?'#ffb030':'#c890ff',f=k==='fever'?'#ffb0a0':c2?'#ffe0a0':'#e0c0ff';
  g.shadowColor=c;g.shadowBlur=k==='fever'||k==='cast'?9:6;g.fillStyle=f;const lx=(E.lx||0)*.4;
  if(k==='happy'){g.strokeStyle=f;g.lineWidth=.9;g.beginPath();g.moveTo(1.5,hy-.8);g.quadraticCurveTo(2.7,hy-2.6,3.9,hy-.8);g.moveTo(5.5,hy-.8);g.quadraticCurveTo(6.7,hy-2.6,7.9,hy-.8);g.stroke()}
  else if(k==='fever'){g.beginPath();g.moveTo(1.5+lx,hy-2.6);g.lineTo(3.9+lx,hy-1.4);g.lineTo(3.9+lx,hy-.4);g.lineTo(1.5+lx,hy-1.2);g.fill();g.beginPath();g.moveTo(7.9+lx,hy-2.6);g.lineTo(5.5+lx,hy-1.4);g.lineTo(5.5+lx,hy-.4);g.lineTo(7.9+lx,hy-1.2);g.fill()}
  else{g.fillRect(1.5+lx,hy-2,2.4,k==='low'?1.1:1.6);g.fillRect(5.5+lx,hy-2,2.4,k==='low'?1.1:1.6)}
  g.shadowBlur=0;if(k==='low'){const q=(t*.8)%1;g.fillStyle='rgba(150,220,255,'+(.9-q*.5)+')';g.beginPath();g.ellipse(9.4,hy-2+q*3,.9,1.3,0,0,7);g.fill()}return true}
/* 1) เงาตามรูปทรง + เส้นแสงขอบหลัง */
function gxCel(c,w,h,s){if(typeof FQ!=='undefined'&&FQ.avg>21)return;let S=GX.celc;if(!S){S=GX.celc=document.createElement('canvas');S.width=S.height=128;GX.celx=S.getContext('2d')}
  if(S.width<w||S.height<h){S.width=Math.max(S.width,w);S.height=Math.max(S.height,h);GX.celx=S.getContext('2d')}
  const q=GX.celx,k=Math.max(1.5,2.3*s),o=GX.oc;
  q.setTransform(1,0,0,1,0,0);q.globalAlpha=1;q.globalCompositeOperation='source-over';q.clearRect(0,0,w+2,h+2);q.drawImage(c,0,0,w,h,0,0,w,h);
  q.globalCompositeOperation='destination-out';q.drawImage(c,0,0,w,h,-k,-k*.75,w,h);q.globalCompositeOperation='source-in';
  const nt=(()=>{try{return isNight()&&!isDg()}catch(e){return false}})();q.fillStyle=nt?'rgba(4,8,40,.42)':'rgba(30,14,48,.34)';q.fillRect(0,0,w,h);
  o.save();o.setTransform(1,0,0,1,0,0);o.globalCompositeOperation='source-atop';o.drawImage(S,0,0,w,h,0,0,w,h);
  /* เส้นแสงขอบด้านหลัง (ขวา) บาง ๆ */
  q.globalCompositeOperation='source-over';q.clearRect(0,0,w+2,h+2);q.drawImage(c,0,0,w,h,0,0,w,h);q.globalCompositeOperation='destination-out';q.drawImage(c,0,0,w,h,-Math.max(1,.9*s),0,w,h);
  q.globalCompositeOperation='source-in';q.fillStyle='rgba('+gxRimCol()+',.55)';q.fillRect(0,0,w,h);o.globalCompositeOperation='lighter';o.drawImage(S,0,0,w,h,0,0,w,h);o.restore()}
setTimeout(()=>{
  /* วาดผู้เล่น: คำนวณสปริงผ้า/ผม + สีหน้า + สะดุ้งตอนโดนตี */
  try{const _d=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const key=(lk&&lk.u)||name||'?';const isMe=key==='me'||(typeof uid!=='undefined'&&key===uid)||(me&&name===me.name&&x===me.x);
      let a=arguments;try{if(!down&&!LOWQ){CHS=chSpring(key,x,y,fx)}else CHS={h:0,c:0};
        CHE=down?null:chExpr(key,hp,mh,!!(CHA&&CHA.cast),isMe);
        if(CHE&&CHE.k==='hurt'){const e=(performance.now()-CHE.ht)/150;if(e>=0&&e<1){a=Array.prototype.slice.call(arguments);a[0]=x-(fx<0?-1:1)*1.6*(1-e)}}}catch(e){CHS={h:0,c:0};CHE=null}
      try{return _d.apply(this,a)}finally{CHS={h:0,c:0};CHE=null}}}catch(e){}
  try{const _h=hurt;window.hurt=hurt=function(d){const h0=me.hp;const r=_h.apply(this,arguments);try{if(me.hp<h0)me.hurtT=performance.now()}catch(e){}return r}}catch(e){}
  try{const _q=qKill;qKill=function(x,y,t,bs){const r=_q.apply(this,arguments);try{if((bs||t===3)&&me.cls&&Math.hypot(me.x-x,me.y-y)<500)me.happyT=performance.now()+2600}catch(e){}return r}}catch(e){}
},650);
