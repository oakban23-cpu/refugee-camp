
/* ===== v482 · งานภาพโมชั่นตัวละคร: ท่าล้ม/ลุก · โดนตีแล้วตัวสะท้าน · ท่าใช้ของ =====
   ① ล้ม/ลุก — เดิมล้มแล้วเป็นตัวโปร่งยืนนิ่ง
      ล้มตามอาชีพ (นักดาบทรุดเข่าแล้วคว่ำหน้า · นักธนูเซถอยแล้วล้มหงาย · จอมเวทหมุนครึ่งรอบแล้วทรุด · มือสังหารทรุดฮวบ · นักบวชคุกเข่าแล้วเอนล้ม)
      นอนราบกับพื้น ตาเป็นกากบาท · อาวุธหลุดกระเด้งไปตกข้างตัว · เงายาวตามตัว · ป้ายชื่อเลื่อนลงมาเหนือตัวที่นอน
      ฟื้น (ฟื้นตรงนี้/กลับค่าย) → ลุกขึ้น 0.75 วิ พร้อมวงแสงทองที่เท้าและประกายลอยขึ้น
      ทุกเครื่องเห็น: ตัวเราจาก me.down · คนอื่นจากเลือด 0 ใน presence (เห็นตอนเข้ามาทีหลัง = นอนอยู่แล้ว ไม่เล่นท่าล้มซ้ำ)
   ② โดนตี — เดิมเปลี่ยนแค่สีหน้า + ขยับ 1.6px
      จับจากเลือดที่ลด (ทุกเครื่องเห็นเอง ไม่ใช้เน็ตเพิ่ม) · ทิศ = มอนที่ใกล้ที่สุด (ไม่มี = จากด้านหน้า)
      ระดับตามสัดส่วนเลือดที่หาย: <6% สะดุ้ง · <15% เซถอย · <28% เซถอยหลายก้าว · ≥28% กระเด็นล้มก้นแล้วลุก
      กระพริบแดง 0.12–0.2 วิ (ctx.filter · เครื่องที่ไม่รองรับ/โหมดประหยัด = ไม่กระพริบ) · ขี่สัตว์อยู่ไม่เซ
   ③ ท่าใช้ของ (ส่งผ่านระบบท่าร่ายเดิม castNet → เพื่อนเห็นท่าเดียวกัน · เครื่องรุ่นเก่าข้ามท่าที่ไม่รู้จัก)
      🧪 ดื่มยา: เอนหลัง ยกขวด (แดง HP/ฟ้า MP) กระดก มีฟองอากาศ
      ⛏️ ขุดสมบัติ: โน้มตัวจ้วงพลั่วเป็นจังหวะ ดินกระเด็น (ทั้งช่วงขุด 1.4 วิ · ขยับ/โดนตี = หยุด)
      📦 เปิดหีบ: ย่อตัว ยกฝา แล้วชูมือดีใจ (หีบจากการขุด · ห้องทองคำ · ผู้พิทักษ์ที่อยู่ใกล้)
      👋 คุยกับ NPC: หันหน้าหา NPC แล้วโบกมือทักทาย */
const ACTY=new Set(['drinkH','drinkM','dig','chest','wave']),ACTD={drinkH:.75,drinkM:.75,dig:1.4,chest:.95,wave:.8};
const AC6={m:null,wvT:0},DPS={},HFS={};let DPOSE=null,DROP=null;
const a6c=(x,a,b)=>Math.max(0,Math.min(1,(x-a)/(b-a))),a6eo=x=>1-(1-x)*(1-x),a6ei=x=>x*x,a6io=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,a6bm=(p,a,b)=>p<a||p>b?0:Math.sin((p-a)/(b-a)*Math.PI);
const A6FILT=(()=>{try{return 'filter' in CanvasRenderingContext2D.prototype}catch(e){return false}})();
/* ---------- ③ เริ่มท่าใช้ของ (ของเรา) ---------- */
function actGo(ty,face){const d=ACTD[ty]||.8;AC6.m={ty,t0:performance.now(),d};if(face!=null)try{me.face=face}catch(e){}
  try{PCT=0;castNet({ty,d:Math.min(1,d)})}catch(e){}}
function actFaceTo(x,y){return Math.atan2(y-me.y,x-me.x)}
/* ---------- ① สถานะล้ม/ลุก + ② โดนตี (ต่อคน) ---------- */
function a6Dead(key,hp){if(key===uid)return me.down>0;const o=others[key];return o?o.hp<=0:hp<=0}
function a6Side(x,y,fx){let b=null,bd=170;try{for(const m of mons){if(!(m.hp>0)||m.dum)continue;const d=Math.hypot(m.x-x,m.y-y);if(d<bd){bd=d;b=m}}}catch(e){}return b?(b.x>=x?1:-1):(fx<0?-1:1)}
function a6Pose(key,cls,x,y,hp,mh,fx,mt){const n=performance.now(),dead=a6Dead(key,hp),dir=fx<0?-1:1;let D=DPS[key];
  if(D&&n-(D.seen||n)>1500){delete DPS[key];D=null}if(D)D.seen=n;
  if(dead&&(!D||D.st!=='dead')){DPS[key]=D={st:'dead',seen:n,t0:(D||key===uid||HFS[key])?n:n-4000,dir,cls,sd:(cls==='archer'||cls==='mage'||cls==='sup')?-1:1,imp:0};delete HFS[key]}
  else if(!dead&&D&&D.st==='dead'){D.st='up';D.t1=n}
  if(D&&D.st==='up'&&n-D.t1>760){delete DPS[key];D=null}
  /* ② โดนตี: เลือดลด */
  let H=HFS[key];const hp0=H?H.hp:hp;if(!H)H=HFS[key]={hp,t0:0};H.hp=hp;
  if(!dead&&!mt&&mh>0&&hp<hp0-Math.max(1,mh*.015)&&!D){const s=(hp0-hp)/mh,tr=s<.06?1:s<.15?2:s<.28?3:4;
    if(!(H.t0&&n-H.t0<(tr>=3?120:200)&&tr<=H.tr)){H.t0=n;H.tr=tr;H.sd=a6Side(x,y,fx);H.d=[0,.24,.34,.66,1.15][tr]}}
  let P=null;
  if(D){P={tx:0,ty:0,rot:0,sx:1,sy:1,lie:0,dead:D.st==='dead',drop:0,ny:0,glow:0,side:0,flash:0,fade:1};
    const sd=D.sd*D.dir;P.side=sd;
    if(D.st==='dead'){const t=(n-D.t0)/1000;let r=0;
      if(cls==='melee'){const k=a6eo(a6c(t,0,.22)),f=a6ei(a6c(t,.22,.55));P.sy=1-.18*k*(1-f)-.06*f;r=.12*k+(1.38)*f}
      else if(cls==='archer'){const k=a6eo(a6c(t,0,.25)),f=a6ei(a6c(t,.25,.55));P.tx=-D.dir*(4*k+3*f);r=.25*k+1.25*f}
      else if(cls==='mage'){const k=a6c(t,0,.3),f=a6ei(a6c(t,.3,.58));P.sx=Math.cos(k*Math.PI);if(Math.abs(P.sx)<.25)P.sx=P.sx<0?-.25:.25;P.sy=1-.12*a6bm(t,0,.3);r=1.5*f}
      else if(cls==='assn'){const k=a6eo(a6c(t,0,.16)),f=a6ei(a6c(t,.16,.46));P.sy=1-.3*k*(1-f)-.06*f;r=1.5*f}
      else{const k=a6eo(a6c(t,0,.3)),f=a6ei(a6c(t,.38,.68));P.sy=1-.22*k*(1-f)-.06*f;r=1.5*f}
      const ti=cls==='archer'||cls==='melee'?.55:cls==='assn'?.46:cls==='mage'?.58:.68,bo=a6bm(t,ti,ti+.2);
      P.rot=sd*(Math.min(1.5,r)-.1*bo);P.lie=a6c(t,ti-.15,ti);P.ty=-3*bo;P.drop=t>=ti?1:0;P.dt=t-ti;P.ny=16*P.lie;
      if(t>=ti&&!D.imp){D.imp=1;try{a6Dust(x+sd*14,y+14,7);if(key===uid){shk=Math.max(shk,.12);sfx('hit')}}catch(e){}}}
    else{const t=(n-D.t1)/1000,u=a6io(a6c(t,0,.45)),bo=a6bm(t,.42,.72);P.rot=sd*1.5*(1-u);P.sy=.86+.14*u+.05*bo;P.ty=-4*bo;P.lie=1-a6c(t,0,.3);P.ny=16*P.lie;P.glow=1-a6c(t,.2,.76);P.dead=false}
    return P}
  if(H.t0&&!dead&&!mt){const t=(n-H.t0)/1000,d=H.d||.3;if(t<d){const sd=H.sd,tr=H.tr;P={tx:0,ty:0,rot:0,sx:1,sy:1,lie:0,dead:false,drop:0,ny:0,glow:0,side:0,fade:1};
      if(tr<=2){const k=Math.sin(Math.min(1,t/.05)*Math.PI/2)*Math.pow(1-t/d,2);P.rot=-sd*(tr===1?.12:.22)*k;P.tx=-sd*(tr===1?2:4.5)*k;P.sy=1-.04*k}
      else if(tr===3){const q=t/d,k=1-q;P.tx=-sd*11*a6eo(Math.min(1,q*1.6))*(.6+.4*k);P.rot=-sd*.3*Math.pow(k,1.5);P.ty=-Math.abs(Math.sin(q*Math.PI*2))*2.8*k}
      else{const a=a6eo(a6c(t,0,.22)),hold=t<.7?1:1-a6io(a6c(t,.7,1.1));P.tx=-sd*14*a*(.4+.6*hold);P.rot=-sd*(.5*a*hold);P.sy=1-.28*a*hold;P.ty=-6*a6bm(t,0,.22)-2*a6bm(t,.9,1.1)}
      P.flash=t<(tr>=2?.2:.12)?1-t/(tr>=2?.2:.12):0;return P}else H.t0=0}
  return null}
function a6Dust(x,y,n){if(LOWQ)n=Math.ceil(n/2);for(let i=0;i<n;i++){if(parts.length>230)break;const a=Math.PI+Math.random()*Math.PI;parts.push({x:x+(Math.random()-.5)*16,y:y-2,vx:Math.cos(a)*(20+Math.random()*30),vy:Math.sin(a)*14-8,t:.45,l:.45,c:'rgba(200,184,150,.75)',gr:30,dust:1})}}
/* ประกายทองตอนลุก (พิกัดโลก ใต้ตัว) */
function a6Glow(x,y,a){if(a<=0)return;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;g.translate(x,y+14);g.save();g.scale(1,.38);
  g.strokeStyle='rgba(255,215,110,.9)';g.lineWidth=2.4;g.beginPath();g.arc(0,0,22+8*(1-a),0,7);g.stroke();g.lineWidth=1;g.beginPath();g.arc(0,0,15,0,7);g.stroke();g.restore();
  const t=performance.now()/1000;for(let i=0;i<7;i++){const q=(t*.9+i/7)%1;g.fillStyle='rgba(255,230,150,'+(.9*(1-q))+')';g.beginPath();g.arc(Math.cos(i*2.4+t)*14,-q*42,1.7*(1-q)+.6,0,7);g.fill()}
  try{glowAt(0,-12,30,'255,210,110',.45*a)}catch(e){}g.restore()}
/* ---------- ③ ท่าใช้ของ: ทั้งตัว / มือ ---------- */
function a6Body(C){const p=C.p,ty=C.ty;
  if(ty==='drinkH'||ty==='drinkM'){const e=a6eo(a6c(p,0,.2))*(1-a6c(p,.82,1));g.rotate(-.1*e);g.translate(0,-.6*e)}
  else if(ty==='dig'){const T=p*(C.d||1.4),q=(T/.48)%1,dn=a6bm(q,.28,.62);g.rotate(.2+.08*dn);g.translate(1.5,1.6*dn);g.scale(1+.04*dn,1-.06*dn)}
  else if(ty==='chest'){const c=a6eo(a6c(p,0,.28))*(1-a6c(p,.55,.72)),j=a6bm(p,.6,.95);g.rotate(.14*c);g.scale(1+.06*c,1-.16*c+.05*j);g.translate(0,-4*j)}
  else if(ty==='wave'){const e=a6eo(a6c(p,0,.15))*(1-a6c(p,.85,1));g.rotate(-.04*e)}}
function a6Arm(cls,C){const p=C.p,ty=C.ty,o={dx:0,dy:0,rot:0,ak:null,off:null,gl:null};
  if(ty==='drinkH'||ty==='drinkM'){const e=a6eo(a6c(p,0,.22))*(1-a6c(p,.8,1));o.rot=.4*e;o.dy=2.5*e;o.dx=-1.5*e;o.off=[4+3*e,-1-7.5*e]}
  else if(ty==='chest'){const lift=a6eo(a6c(p,.25,.5)),che=a6bm(p,.58,.98);o.rot=-.5*lift*(1-che)-1.25*che;o.dx=2*lift;o.dy=-3*lift-6*che;o.off=[8-6*che,-4*lift-12*che];if(che>.05)o.gl=[3,-26,'255,225,130',.32*che]}
  else if(ty==='wave'){const e=a6eo(a6c(p,0,.15))*(1-a6c(p,.85,1));o.rot=.15*e;o.dy=1*e;o.off=[5+Math.sin(p*Math.PI*6)*2.6*e,-8-17*e]}
  return o}
/* ขวดยา (พิกัดตัวละคร ตำแหน่งมือข้างที่ว่าง) */
function a6Bottle(x,y,C){const p=C.p,e=a6eo(a6c(p,0,.22))*(1-a6c(p,.8,1)),tilt=-.35-.75*a6eo(a6c(p,.2,.45))*(1-a6c(p,.78,.95)),col=C.ty==='drinkM'?['#6aa8ff','#2a5ad8']:['#ff6a5a','#c22a2a'];
  g.save();g.translate(x,y-1);g.rotate(tilt);g.fillStyle=col[1];g.strokeStyle='#140e0c';g.lineWidth=.9;g.beginPath();g.ellipse(0,-3.2,3.1,3.6,0,0,7);g.fill();g.stroke();
  g.fillStyle=col[0];g.beginPath();g.ellipse(-.9,-3.6,1.3,1.6,0,0,7);g.fill();g.fillStyle='#e8dcc0';g.fillRect(-1.1,-9,2.2,3);g.strokeRect(-1.1,-9,2.2,3);g.fillStyle='#9a6a3a';g.fillRect(-1.3,-10.2,2.6,1.4);g.restore();
  if(p>.3&&p<.75){const t=performance.now()/1000;g.save();g.globalAlpha=.8;g.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<3;i++){const q=(t*1.6+i/3)%1;g.beginPath();g.arc(x-3+i*1.5,y-12-q*8,.8+.5*(1-q),0,7);g.fill()}g.restore()}}
/* พลั่ว (แทนอาวุธตอนขุด) */
function a6Shovel(ay,C,skin){const T=C.p*(C.d||1.4),q=(T/.48)%1,dn=a6bm(q,.28,.62),up=a6bm(q,.62,.98);
  g.save();g.translate(4,ay+1);g.rotate(.35+.35*dn-.25*up);g.strokeStyle='#140e0c';g.lineWidth=3.2;g.beginPath();g.moveTo(0,-9);g.lineTo(0,15);g.stroke();g.strokeStyle='#9a6a3a';g.lineWidth=2;g.stroke();
  g.fillStyle='#b8c0c8';g.strokeStyle='#140e0c';g.lineWidth=.9;g.beginPath();g.moveTo(-3.6,14);g.lineTo(3.6,14);g.lineTo(3,20);g.quadraticCurveTo(0,23,-3,20);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.5)';g.fillRect(-2.6,15,1,4);if(up>.2){g.fillStyle='#6a4a2a';g.beginPath();g.ellipse(0,17,3.4,1.6,0,0,7);g.fill()}
  try{r24Hand(0,-5,skin);r24Hand(0,4,skin)}catch(e){}g.restore()}
/* ---------- ติดตั้ง (หลังโมดูลอื่นห่อเสร็จ) ---------- */
setTimeout(()=>{
  try{for(const t of ACTY){PCTY.add(t);R24T.add(t)}R24OFF.drinkH=1;R24OFF.drinkM=1;R24OFF.chest=1;R24OFF.wave=1;R24OFF.dig=1}catch(e){}
  /* ท่าของเรา: ต่อท้ายท่าร่าย (ถ้าไม่มีสกิลกำลังร่าย) */
  try{castCur=(f=>function(){const c=f.apply(this,arguments);if(c)return c;const M=AC6.m;if(!M)return null;
      if(M.ty==='dig'&&!(typeof TMS!=='undefined'&&TMS.dig)){AC6.m=null;return null}
      const p=(performance.now()-M.t0)/1000/M.d;if(p>=1||p<0||me.down>0){AC6.m=null;return null}return{ty:M.ty,p,big:false,dir:1,act:1,d:M.d}})(castCur)}catch(e){}
  try{rcCur=(f=>function(u){const c=f.apply(this,arguments);if(c&&ACTY.has(c.ty))c.d=1;return c})(rcCur)}catch(e){}
  try{r24Body=(f=>function(C){if(C&&ACTY.has(C.ty))return a6Body(C);return f.apply(this,arguments)})(r24Body)}catch(e){}
  try{r24Arm=(f=>function(cls,C){if(C&&ACTY.has(C.ty))return a6Arm(cls,C);return f.apply(this,arguments)})(r24Arm)}catch(e){}
  try{castGhosts=(f=>function(x,y,C){if(C&&ACTY.has(C.ty))return;return f.apply(this,arguments)})(castGhosts)}catch(e){}
  try{castFxUnder=(f=>function(x,y,C){if(C&&ACTY.has(C.ty))return;return f.apply(this,arguments)})(castFxUnder)}catch(e){}
  /* อาวุธ: ล้มแล้วหลุดมือ · ขุด = พลั่ว · ดื่ม = ขวด */
  try{const _w=drawWeapon;window.__a6w=_w;drawWeapon=function(cls,c,ay,t,skin,Pg,E,ak){const P=DPOSE;
      if(P&&P.drop){if(DROP&&!DROP.wa)DROP.wa=[cls,c,ay,t,skin,Pg,E];return}
      const C=CHA&&CHA.cast;if(C&&C.ty==='dig'){a6Shovel(ay,C,skin);return}
      const r=_w.apply(this,arguments);if(C&&(C.ty==='drinkH'||C.ty==='drinkM')){try{const o=a6Arm(cls,C);a6Bottle(o.off[0],ay+3+o.off[1],C)}catch(e){}}return r}}catch(e){}
  /* ตัว: ทั้งตัวตามท่าล้ม/ลุก/โดนตี (หมุนรอบเท้า) + กระพริบแดง + ตาปิด */
  try{const _c=drawChar;drawChar=function(x,y){const P=DPOSE;if(!P)return _c.apply(this,arguments);const px=x,py=y+14,a0=g.globalAlpha,ce=CHE,args=arguments;
      g.save();g.translate(px+P.tx,py+P.ty-P.ny);g.rotate(P.rot);g.scale(P.sx,P.sy);g.translate(-px,-py);
      if(P.dead||P.lie>0){g.globalAlpha=Math.max(a0,.96);if(P.dead)CHE={k:'dead',lx:0,ly:0,ht:0}}
      DROP=P.drop?{}:null;try{_c.apply(this,args);
        if(P.flash>0&&A6FILT&&!LOWQ)a6Flash(()=>_c.apply(this,args),Math.min(1,a0)*.5*P.flash)}
      finally{CHE=ce;g.globalAlpha=a0;g.restore()}
      const W=DROP;DROP=null;if(P.drop&&W&&W.wa)try{a6GroundW(x,y,P,W.wa)}catch(e){}}}catch(e){}
  /* ตาปิด (กากบาท) ตอนล้ม */
  try{chEyes=(f=>function(cls,c2,b2,hy){const E=CHE;if(E&&E.k==='dead'){g.strokeStyle='#140e0c';g.lineWidth=.95;for(const ex of[2.5,6.5]){g.beginPath();g.moveTo(ex-1.3,hy-1.3);g.lineTo(ex+1.3,hy+1.3);g.moveTo(ex+1.3,hy-1.3);g.lineTo(ex-1.3,hy+1.3);g.stroke()}
      g.beginPath();g.moveTo(3.2,hy+4.4);g.quadraticCurveTo(4.6,hy+3.4,6,hy+4.4);g.stroke();return true}return f.apply(this,arguments)})(chEyes)}catch(e){}
  /* ตัวที่ล้มวาดทึบ (gxLit ใช้ค่าโปร่งของจังหวะเรียก = 0.35 ของตัวล้มแบบเดิม) */
  try{gxLit=(f=>function(){if(DPOSE&&(DPOSE.dead||DPOSE.lie>0)){const a=g.globalAlpha;g.globalAlpha=1;try{return f.apply(this,arguments)}finally{g.globalAlpha=a}}return f.apply(this,arguments)})(gxLit)}catch(e){}
  /* เงาพื้น: ยาวตามตัวที่นอน */
  try{gxShadow=(f=>function(x,y,rx,ry,a){const P=DPOSE;if(P&&P.lie>0){const l=P.lie;return f.call(this,x+P.side*14*l,y-P.ny+1*l,rx*(1+.95*l),ry*(1+.15*l),a)}if(P&&(P.tx||P.ty))return f.call(this,x+P.tx*.6,y,rx,ry,a);return f.apply(this,arguments)})(gxShadow)}catch(e){}
  /* ทั้งตัวผู้เล่น: คิดท่าแล้วตั้ง DPOSE ระหว่างวาด */
  try{const _p=drawP;drawP=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const key=(lk&&lk.u)||('n'+name);let P=null;
      try{if(lk&&lk.u&&me.cls)P=a6Pose(key,cls,x,y,hp,mh,fx,lk.mt|0)}catch(e){P=null}
      if(!P)return _p.apply(this,arguments);
      if(P.glow>0)try{a6Glow(x,y,P.glow)}catch(e){}
      const a=Array.prototype.slice.call(arguments);a[1]=y+P.ny;if(P.dead)a[6]=true;
      const d0=DPOSE;DPOSE=P;try{return _p.apply(this,a)}finally{DPOSE=d0}}}catch(e){}
  /* ③ จุดเริ่มท่า */
  try{usePot=(f=>function(k){const n0=me.inv&&me.inv[k];const r=f.apply(this,arguments);try{if(me.inv&&me.inv[k]<n0)actGo(k==='hp'?'drinkH':'drinkM')}catch(e){}return r})(usePot)}catch(e){}
  try{tmDigStart=(f=>function(){const had=TMS.dig;const r=f.apply(this,arguments);try{const D=TMS.dig;if(D&&D!==had){actGo('dig',actFaceTo(D.sx,D.sy));const id=D.t0;setTimeout(()=>{try{if(TMS.dig&&TMS.dig.t0===id){PCT=0;castNet({ty:'dig',d:.75})}}catch(e){}},700)}}catch(e){}return r})(tmDigStart)}catch(e){}
  try{tmChest=(f=>function(q,L,x,y,big){const r=f.apply(this,arguments);try{if(me.cls&&me.down<=0&&Math.hypot(me.x-x,me.y-(y-10))<75&&!(AC6.m&&AC6.m.ty==='chest'&&performance.now()-AC6.m.t0<900))actGo('chest',actFaceTo(x,y))}catch(e){}return r})(tmChest)}catch(e){}
  /* คุยกับ NPC: กดปุ่ม «คุยกับ…» หรือบทสนทนาที่คนพูดเป็น NPC ในแมพ */
  document.addEventListener('click',e=>{try{if(e.target&&e.target.closest&&e.target.closest('#npcb'))a6Talk(a6NpcPos())}catch(_){}},true);
  try{stSay=(f=>function(lines,done,o){const was=SD.on;const r=f.apply(this,arguments);try{if(!was&&SD.on&&!(o&&o.cine)){const L=SD.q[0],N=L&&czNpc(L[0]);if(N)a6Talk(N)}}catch(e){}return r})(stSay)}catch(e){}
},1500);
function a6NpcPos(){try{if(typeof npcSel==='string'&&npcSel[0]==='x'){const N=CITY.npcs[+npcSel.slice(1)];if(N)return N}if(typeof npcSel==='number'){const M=MAPS[curMap];const N=npcSel===1?M.npc:M['npc'+npcSel];if(N&&typeof N.x==='number')return N}}catch(e){}return null}
function a6Talk(N){if(!me.cls||me.down>0)return;const n=performance.now();if(N&&typeof N.x==='number'&&Math.hypot(N.x-me.x,N.y-me.y)<260&&Math.abs(N.x-me.x)>3)me.face=actFaceTo(N.x,N.y);
  if(n-AC6.wvT<3000||(me.cast&&castCur()))return;AC6.wvT=n;actGo('wave')}
/* อาวุธที่หลุดลงพื้น (พิกัดโลก) */
function a6GroundW(x,y,P,wa){const _w=window.__a6w;if(!_w)return;const [cls,c,ay,t,skin,Pg,E]=wa,sd=P.side||1,dt=Math.max(0,P.dt||9),fl=Math.min(1,dt/.28),hop=-Math.sin(fl*Math.PI)*10-(dt>.28&&dt<.5?Math.sin((dt-.28)/.22*Math.PI)*3:0);
  const H=R24HX[cls]||[7,0],gx=x+sd*(6+16*a6eo(fl)),gy=y+15-P.ny+13*a6eo(fl)+hop;g.save();g.translate(gx,gy);g.rotate(sd*(1.32+(1-fl)*2.2)+(dt<.6?Math.sin(dt*30)*.06*(1-dt/.6):0));g.scale(sd<0?-1:1,.82);g.translate(-H[0],-(ay+H[1]));
  try{const cc=CHA;CHA=null;try{_w(cls,c,ay,t,skin,Pg,E,0)}finally{CHA=cc}}catch(e){}g.restore()}

/* กระพริบแดง: วาดตัวซ้ำผ่าน filter แดง · ล็อกค่าโปร่ง (drawChar ตั้ง globalAlpha เองระหว่างวาด → ปิดทางเขียนชั่วคราวด้วย property บนตัว context) */
const A6GA=(()=>{try{return Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'globalAlpha')}catch(e){return null}})();
function a6Flash(fn,al){if(!A6GA||!(al>0.01))return;const c=g;c.save();const d0=DROP;DROP=null;let dv=1;
  try{c.filter='brightness(.6) sepia(1) saturate(10) hue-rotate(-28deg) brightness(1.3)';A6GA.set.call(c,al);Object.defineProperty(c,'globalAlpha',{configurable:true,get(){return dv},set(x){dv=x}});fn()}
  catch(e){}finally{try{delete c.globalAlpha}catch(e){}DROP=d0;c.restore()}}
