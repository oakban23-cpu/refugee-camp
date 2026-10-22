
/* ===== v483 · งานภาพโมชั่นตัวละคร รอบ 2: เลือดน้อย · ท่าฉลอง · นั่งพัก/ผิงไฟ =====
   ④ เลือดต่ำกว่า 25%: ไหล่ขึ้นลงหอบถี่ ตัวค่อมไปข้างหน้า มีเหงื่อกระเด็นและไอหอบออกปาก · เดินกะเผลก (ขาข้างหนึ่งทรุด ตัวเอียงตาม)
      แค่ภาพ ความเร็วเดินจริงเท่าเดิม · ฮีลจากต่ำกว่า 25% ขึ้นถึง 50% = สูดหายใจแล้วถอนหายใจโล่ง (ไอลมออกปาก + ประกายเขียวรอบตัว)
      ทุกเครื่องเห็นเอง จากเลือดใน presence (ไม่ใช้เน็ตเพิ่ม)
   ⑤ ท่าฉลอง ~1 วิ ตามอาชีพ (นักดาบกระโดดชูดาบ · นักธนูชูธนูชกลม · จอมเวทลอยชูคทาประกาย · มือสังหารตีลังกาหลัง · นักบวชชูสองมือมีแสงทอง) + กระดาษสีโปรย
      เมื่อ: บอสตายใกล้ ๆ · เลเวลอัป/ดาวอัป · ได้การ์ดของ Relic+/ตำนาน/ชุด · ส่งผ่าน castNet (เพื่อนเห็น) · ห่างกันอย่างน้อย 4 วิ
   ⑥ ยืนนิ่งนาน ~18 วิ (+0–6 วิต่างกันในแต่ละคน) และไม่ได้สู้ 8 วิ (ไม่ตี ไม่โดนตี ไม่ร่าย) ไม่ล้ม ไม่ขี่สัตว์ ไม่ตกปลา → นั่งลงพัก
      ใกล้กองไฟกลางค่าย: หันหน้าเข้ากองไฟ ยื่นมือผิงไฟ มีแสงอุ่นส้มกะพริบที่ตัว · ขยับ = ลุกเร็ว 0.25 วิ
      คิดเองบนทุกเครื่อง (ไม่ใช้เน็ตเพิ่ม)
   แก้ตกค้าง v482: ฝุ่นตอนล้มกระแทกพื้นไม่ขึ้น (อนุภาคไม่มีขนาด) */
const LH7={},SI7={},CF7={},CH7={t:0};let LPOSE=null,GSIT=null,SITD=null;
try{ACTY.add('cheer');ACTD.cheer=1}catch(e){}
const S7FX=[34,185];
/* ---------- ④ เลือดน้อย ---------- */
function l7Tick(key,hp,mh,dead,mt){const n=performance.now();let L=LH7[key];if(!L)L=LH7[key]={k:0,low:0,relT:0,t:n,fx:[],bt:0,st:0};
  const dt=Math.min(.1,Math.max(0,(n-L.t)/1000));L.t=n;const f=mh>0?hp/mh:1,isLow=!dead&&hp>0&&f<.25;
  if(dead){L.low=0;L.relT=0}else if(isLow){L.low=1}else if(L.low&&f>=.5){L.low=0;L.relT=n;L.puf=0}
  L.k+=((isLow&&!mt?1:0)-L.k)*Math.min(1,dt*(isLow?3:4));if(L.k<.01)L.k=0;
  const r=L.relT?(n-L.relT)/1000:9;if(r>1.05)L.relT=0;return L}
function l7Fx(key,L,x,y,dir){const n=performance.now(),A=L.fx;
  if(L.k>.55&&!LOWQ){if(n-L.st>650){L.st=n;L.sd=-(L.sd||1);if(A.length<9)A.push({k:0,t0:n,sd:L.sd,x0:x,y0:y})}
    const b=Math.sin(n/1000*10);if(b>.6&&L.bt<=.6&&A.length<9)A.push({k:1,t0:n,sd:dir,x0:x,y0:y});L.bt=b}
  if(L.relT&&!L.puf&&n-L.relT>380){L.puf=1;if(A.length<12)A.push({k:2,t0:n,sd:dir,x0:x,y0:y})}
  if(!A.length)return;g.save();
  for(let i=A.length-1;i>=0;i--){const q=A[i],t=(n-q.t0)/1000,ox=x-q.x0,oy=y-q.y0;
    if(q.k===0){if(t>.55){A.splice(i,1);continue}const a=1-t/.55,px=q.x0+ox+q.sd*(7+20*t),py=q.y0+oy-27-22*t+95*t*t;
      g.fillStyle='rgba(150,210,255,'+(.9*a)+')';g.beginPath();g.moveTo(px,py-2.4);g.quadraticCurveTo(px+1.6,py,px,py+1.4);g.quadraticCurveTo(px-1.6,py,px,py-2.4);g.fill();g.fillStyle='rgba(255,255,255,'+(.8*a)+')';g.fillRect(px-.5,py-.6,.8,.8)}
    else if(q.k===1){if(t>.5){A.splice(i,1);continue}const a=(1-t/.5)*.42,px=q.x0+ox+q.sd*(7+14*t),py=q.y0+oy-15-5*t;
      g.fillStyle='rgba(236,240,250,'+a+')';g.beginPath();g.arc(px,py,1.2+2.4*t/.5,0,7);g.fill()}
    else{if(t>.9){A.splice(i,1);continue}const a=1-t/.9;
      for(let j=0;j<3;j++){const tt=Math.max(0,t-j*.06),px=q.x0+ox+q.sd*(8+16*a6eo(Math.min(1,tt/.7))+j*2.5),py=q.y0+oy-14+4*tt-j*1.2;g.fillStyle='rgba(240,244,252,'+(.55*a)+')';g.beginPath();g.arc(px,py,1.6+4.5*a6eo(Math.min(1,tt/.6))-j*.6,0,7);g.fill()}
      g.globalCompositeOperation='lighter';for(let j=0;j<6;j++){const an=j*1.047+.4,rr=12+8*t,px=q.x0+ox+Math.cos(an)*rr,py=q.y0+oy-12+Math.sin(an)*rr*.7-16*t;try{glowAt(px,py,4.5,'170,255,190',.75*a*(.5+.5*Math.sin(t*14+j)))}catch(e){}}g.globalCompositeOperation='source-over'}}
  g.restore()}
/* ท่าเลือดน้อย/ถอนหายใจ (พิกัดโลกรอบเท้า) */
function l7Xf(L,dir,ph,mv){const t=performance.now()/1000+(L.tof||0);let rot=0,ty=0,sx=1,sy=1;const k=L.k;
  if(k>0){const b=Math.sin(t*10);rot+=dir*.11*k;sy*=1-.025*k+.042*k*b;sx*=1+.016*k*b;
    if(ph&&mv>.3){const s=Math.max(0,Math.sin(ph)),m=k*Math.min(1,mv);ty+=2*s*m;rot+=-dir*.075*s*m;sy*=1-.03*s*m}}
  if(L.relT){const r=(performance.now()-L.relT)/1000;if(r>=0&&r<1){const e1=a6eo(a6c(r,0,.32))*(1-a6c(r,.32,.48)),e2=a6bm(r,.36,.85);
      sy*=1+.055*e1-.05*e2;sx*=1-.02*e1+.025*e2;rot+=-dir*.06*e1+dir*.035*e2;ty+=.9*e2}}
  return{rot,ty,sx,sy}}
/* ---------- ⑤ ท่าฉลอง ---------- */
function cheerGo(src){try{const n=performance.now();if(!me.cls||me.down>0||me.riding||me.hp<=0)return false;if(n-CH7.t<4000)return false;
    const c=me.cast;if(c&&(n-c.t0)/1000<c.d)return false;const M=AC6.m;if(M&&M.ty!=='wave'&&M.ty!=='cheer'&&(n-M.t0)/1000<M.d)return false;
    CH7.t=n;CH7.src=src;actGo('cheer');c7Burst(uid,src);return true}catch(e){return false}}
const C7COL=['#ffd84a','#ff6a8a','#6ad8ff','#8aff7a','#c08aff','#ffffff','#ffa040'];
function c7Burst(key,src){const n=performance.now(),L=[];const N=LOWQ?10:22;for(let i=0;i<N;i++){const a=-Math.PI/2+(Math.random()-.5)*2.4,v=70+Math.random()*90;
    L.push({vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,c:C7COL[(Math.random()*C7COL.length)|0],w:1.6+Math.random()*1.6,h:2.6+Math.random()*1.8,r0:Math.random()*6,vr:(Math.random()-.5)*16,dl:Math.random()*.12,f:Math.random()*6})}
  CF7[key]={t0:n,L,src:src||''}}
function c7Draw(key,x,y){const F=CF7[key];if(!F)return;const t=(performance.now()-F.t0)/1000;if(t>1.6){delete CF7[key];return}g.save();
  if(t<.35){g.globalCompositeOperation='lighter';try{glowAt(x,y-30,24+30*t,'255,230,150',.3*(1-t/.35))}catch(e){}
    g.strokeStyle='rgba(255,240,190,'+(.8*(1-t/.35))+')';g.lineWidth=1.6;for(let i=0;i<8;i++){const a=i*.785+.39,r0=10+50*t,r1=r0+7;g.beginPath();g.moveTo(x+Math.cos(a)*r0,y-30+Math.sin(a)*r0);g.lineTo(x+Math.cos(a)*r1,y-30+Math.sin(a)*r1);g.stroke()}g.globalCompositeOperation='source-over'}
  for(const q of F.L){const tt=t-q.dl;if(tt<=0)continue;const a=Math.min(1,(1.6-t)/.45),px=x+q.vx*tt*.9+Math.sin(tt*7+q.f)*3*tt,py=y-30+q.vy*tt+95*tt*tt;
    g.save();g.translate(px,py);g.rotate(q.r0+q.vr*tt);g.scale(Math.cos(tt*9+q.f),1);g.globalAlpha=a;g.fillStyle=q.c;g.fillRect(-q.w/2,-q.h/2,q.w,q.h);g.restore()}
  g.restore()}
/* ท่าฉลองทั้งตัว (พิกัดเท้า) */
function c7Body(C,cls){const p=C.p,cr=a6bm(p,0,.16),jp=a6c(p,.12,.56),J=jp>0&&jp<1?Math.sin(jp*Math.PI):0,ld=a6bm(p,.54,.7),fo=1-a6c(p,.86,1),sq=cr+ld;
  if(cls==='assn'){g.translate(0,-14*J);if(jp>0&&jp<1){g.translate(0,-11);g.rotate(-6.2832*a6io(jp));g.translate(0,11)}g.scale(1+.1*sq,1-.17*sq)}
  else if(cls==='mage'){const f=a6eo(a6c(p,.08,.32))*fo;g.translate(0,-6*f+Math.sin(p*Math.PI*6)*.7*f);g.scale(1+.06*cr,1-.1*cr)}
  else if(cls==='sup'){const f=a6eo(a6c(p,.08,.3))*fo;g.translate(0,-4*J);g.scale(1-.03*f+.08*sq,1+.07*f-.12*sq)}
  else if(cls==='archer'){g.translate(0,-7*J);g.rotate(-.07*a6eo(a6c(p,.1,.35))*fo);g.scale(1+.08*sq,1-.13*sq)}
  else{g.translate(0,-11*J);g.rotate(-.05*J);g.scale(1+.1*sq,1-.16*sq)}}
/* ท่าฉลอง: มือ/อาวุธ */
function c7Arm(cls,C){const p=C.p,o={dx:0,dy:0,rot:0,ak:0,off:null,gl:null},e=a6eo(a6c(p,.05,.26))*(1-a6c(p,.86,1)),pm=a6c(p,.58,.62)*(1-a6c(p,.86,1))*Math.max(0,Math.sin((p-.58)*Math.PI*6.5));
  const F=[-3-7*e,-4-18*e-2.5*pm];
  if(cls==='melee'){o.rot=.62*e;o.dy=-17*e-2.5*pm;o.dx=5*e;o.off=F;if(e>.3)o.gl=[25,-38-2.5*pm,'255,240,190',.42*e*(.6+.4*Math.sin(p*30))]}
  else if(cls==='archer'){o.rot=-.15*e;o.dy=-17*e-2*pm;o.dx=2*e;o.off=F}
  else if(cls==='mage'){o.rot=.18*e;o.dy=-16*e-1.5*pm;o.dx=3*e;o.off=F;o.gl=[17,-33-1.5*pm,'190,160,255',.55*e]}
  else if(cls==='assn'){const e2=a6eo(a6c(p,.52,.66))*(1-a6c(p,.86,1));o.rot=.45*e2+.6*(e-e2);o.dy=-14*e2-2*pm;o.dx=6*e2;o.off=[-3-7*e2,-4-17*e2-2*pm]}
  else{o.rot=.18*e;o.dy=-16*e-1.5*pm;o.dx=3*e;o.off=F;o.gl=[F[0],F[1],'255,220,120',.3*e]}
  return o}
/* ---------- ⑥ นั่งพัก ---------- */
function s7Near(x,y){try{if(curMap!==1)return false;const d=Math.hypot(x-CX,y-CY);return d>=S7FX[0]&&d<=S7FX[1]}catch(e){return false}}
function s7Tick(key,cls,x,y,hp,mh,down,lk){const n=performance.now();let S=SI7[key];if(!S)S=SI7[key]={st:0,t0:0,t1:0,hit:0,ca:0,lhp:hp,s:0,s1:0};
  if(hp<S.lhp-.5)S.hit=n;S.lhp=hp;const A=ANS[key],I=CHIDL[key];let ok=!down&&hp>0&&!!A&&!(lk&&lk.mt);
  let ca=false;try{ca=key===uid?!!castCur():!!RCAST[key]}catch(e){}if(ca)S.ca=n;
  if(ok){const off=(hk33(String(key))%60)/10;ok=(A.it||0)>18+off&&A.mv<.02&&n-S.hit>8000&&n-S.ca>3000&&!(I&&n-I.ak<8000)&&!(lk&&lk.ak>0)&&!DPS[key]&&!(HFS[key]&&HFS[key].t0)}
  if(ok)try{if(FSHR[key]&&FSHR[key].on)ok=false;else if(typeof skOf==='function'&&skOf(key))ok=false;else if(key===uid&&(me.riding||skyOY()>0||me.stealth>0))ok=false}catch(e){}
  if(S.fs!=null)ok=!!S.fs;
  if(ok&&S.st!==1){S.t0=n-(S.st===2?450*(S.s||0):0);S.st=1}else if(!ok&&S.st===1){S.st=2;S.t1=n;S.s1=S.s}
  if(S.st===1)S.s=a6io(a6c((n-S.t0)/1000,0,.45));else if(S.st===2){const q=a6c((n-S.t1)/1000,0,.25);S.s=S.s1*(1-q);if(q>=1){S.st=0;S.s=0;S.wa=null}}else S.s=0;
  if(ca)S.s=0;
  S.w=S.fw!=null?!!S.fw:s7Near(x,y);return S}
/* ท่านั่ง (พิกัดเท้า): ลดตัวลงจนก้นแตะพื้น · ผิงไฟ = โน้มไปหากองไฟ */
function s7Body(C){const s=C.s||0,w=C.ty==='sitw',t=performance.now()/1000;g.translate(0,6.4*s);g.translate(0,-9);g.rotate((w?.08:-.035)*s);g.translate(0,9);
  const b=Math.sin(t*(w?1.7:1.25))*.012*s;g.scale(1-b*.4,1+b)}
/* ระหว่างนั่งลง (ยังถืออาวุธ): ลดมือลง */
function s7Arm(cls,C){const s=C.s||0;return{dx:1*s,dy:4*s,rot:.35*s,ak:0,off:[1+4*s,1+2*s],gl:null}}
/* นั่งแล้ว: วางอาวุธ → มือวางบนเข่า / ยื่นผิงไฟ (พิกัดตัวละคร) */
function s7Hands(S,ay,skin){const y0=ay+3;
  if(S.w){const t=performance.now()/1000,f=.75+.25*Math.sin(t*9)*Math.sin(t*5.3);r24Hand(9.2,y0-.6,skin);r24Hand(11.6,y0-2.4,skin);
    try{r24Glow(12.4,y0-1.6,'255,160,80',.28*f)}catch(e){}}
  else{r24Hand(4.6,y0+3.6,skin);r24Hand(7.8,y0+3,skin)}}
/* อาวุธวางพื้นข้างหลังตัว (พิกัดโลก · วาดก่อนตัว) */
function s7GroundW(x,y,dir,wa){const _w=window.__a6w;if(!_w||!wa)return;const [cls,c,ay,t,skin,Pg,E]=wa,H=R24HX[cls]||[7,0],sd=-dir;
  g.save();g.translate(x+sd*7,y+11);g.rotate(sd*(cls==='melee'?1.85:1.4));g.scale(sd<0?-1:1,.8);g.translate(-H[0],-(ay+H[1]));const cc=CHA;CHA=null;
  try{_w(cls,c,ay,t,skin,Pg,E,0)}catch(e){}finally{CHA=cc;g.restore()}}
/* ขาตอนนั่ง (พิกัดตัวละคร หลังลดตัว): ชันเข่า เท้าแตะพื้น */
const S7ROBE={mage:1,sup:1};
function s7Legs(P,s,which){const O='#140e0c',K=which===1?[[2.6,0]]:which===0?[[-2.6,1]]:[[-2.6,1],[2.6,0]],L1=5.2,L2=5.4,H=Math.PI/2;g.lineCap='round';g.lineJoin='round';
  for(const [hx0,bk] of K){const a1=H+((bk?-.42:-.1)-H)*s,a2=H+((bk?.5:.2)-H)*s,hx=hx0-(bk?.6:1.4)*s,hy=5.4;
    const kx=hx+Math.cos(a1)*L1,ky=hy+Math.sin(a1)*L1,fx=kx+Math.cos(a2)*L2,fy=ky+Math.sin(a2)*L2;
    const col=chSh(P.leg,Math.min(hy,ky)-2,Math.max(hy,fy)+2);g.strokeStyle=O;g.lineWidth=5.8;g.beginPath();g.moveTo(hx,hy);g.lineTo(kx,ky);g.lineTo(fx,fy);g.stroke();
    g.strokeStyle=col;g.lineWidth=3.9;g.stroke();if(bk){g.strokeStyle='rgba(0,0,0,.25)';g.stroke()}
    const ba=(1-s)*0+s*-1.25;g.save();g.translate(fx+.6*s,fy-.6*s);g.rotate(ba);g.fillStyle=bk?'#3a2818':'#4a3424';g.strokeStyle=O;g.lineWidth=1;g.beginPath();g.roundRect(-1.6,-.4,5,3.4,1.4);g.fill();g.stroke();g.restore()}
  g.lineWidth=1;g.strokeStyle=O}
/* แสงอุ่นจากกองไฟ (พิกัดโลก) */
function s7Warm(x,y,s){if(LOWQ||!(s>0))return;const t=performance.now()/1000,f=.8+.2*Math.sin(t*9)*Math.sin(t*5.3),dx=CX-x,dy=CY-y,d=Math.hypot(dx,dy)||1;
  g.save();g.globalCompositeOperation='lighter';try{glowAt(x+dx/d*10,y-2+dy/d*4,26,'255,150,70',.2*s*f);glowAt(x+dx/d*13,y+2,9,'255,200,120',.25*s*f)}catch(e){}g.restore()}
/* ---------- ติดตั้ง (หลัง v482) ---------- */
setTimeout(()=>{
  try{PCTY.add('cheer');R24T.add('cheer');R24OFF.cheer=1;R24T.add('sit');R24T.add('sitw');R24OFF.sit=1;R24OFF.sitw=1}catch(e){}
  try{a6Dust=function(x,y,n){if(LOWQ)n=Math.ceil(n/2);for(let i=0;i<n;i++){if(parts.length>230)break;const a=Math.PI+Math.random()*Math.PI;parts.push({x:x+(Math.random()-.5)*16,y:y-2,vx:Math.cos(a)*(20+Math.random()*30),vy:Math.sin(a)*14-8,t:.45,l:.45,r:1.6+Math.random()*1.4,c:'rgba(200,184,150,.75)',gr:30,dust:1})}}}catch(e){}
  try{const _b=a6Body;a6Body=function(C){if(C&&C.ty==='cheer')return c7Body(C,(DGW&&DGW.cls)||'melee');return _b.apply(this,arguments)}}catch(e){}
  try{const _a=a6Arm;a6Arm=function(cls,C){if(C&&C.ty==='cheer')return c7Arm(cls,C);return _a.apply(this,arguments)}}catch(e){}
  try{r24Body=(f=>function(C){if(C&&C.sit)return s7Body(C);return f.apply(this,arguments)})(r24Body)}catch(e){}
  try{r24Arm=(f=>function(cls,C){if(C&&C.sit)return s7Arm(cls,C);return f.apply(this,arguments)})(r24Arm)}catch(e){}
  try{castGhosts=(f=>function(x,y,C){if(C&&C.sit)return;return f.apply(this,arguments)})(castGhosts)}catch(e){}
  try{drawWeapon=(f=>function(cls,c,ay,t,skin,Pg,E,ak){const S=SITD;if(!S||!(CHA&&CHA.cast&&CHA.cast.sit))return f.apply(this,arguments);
      if(!S.rb&&S.P)try{s7Legs(S.P,S.s,1)}catch(e){}
      if(S.s<.6)return f.apply(this,arguments);
      try{const W=SI7[S.key];if(W)W.wa=cls==='assn'?null:[cls,c,ay,t,skin,Pg,E]}catch(e){}try{s7Hands(S,ay,skin)}catch(e){}})(drawWeapon)}catch(e){}
  /* ท่านั่ง: แทนท่ายืนรอ */
  try{idlPick=(f=>function(key,cls,AN,lk){const r=f.apply(this,arguments);const S=GSIT;if(S&&S.key===key&&S.s>0&&AN&&!AN.cast){S.rb=!!S7ROBE[cls];SITD=S;CHSIT=1;return{ty:S.w?'sitw':'sit',p:.5,d:1,idle:1,sit:1,s:S.s}}return r})(idlPick)}catch(e){}
  try{chSitLegs=(f=>function(P){const S=SITD;if(S){S.P=P;return s7Legs(P,S.s,S.rb?2:0)}return f.apply(this,arguments)})(chSitLegs)}catch(e){}
  /* สีหน้า: ฉลอง/ผิงไฟ/โล่งใจ = ยิ้ม */
  try{chExpr=(f=>function(key,hp,mh,cast,isMe){const r=f.apply(this,arguments);try{if(r&&r.k!=='hurt'){const n=performance.now();let hp2=false;
        if(isMe?(AC6.m&&AC6.m.ty==='cheer'):(RCAST[key]&&RCAST[key].ty==='cheer'))hp2=true;
        else{const S=SI7[key];if(S&&S.s>.5&&S.w)hp2=true;const L=LH7[key];if(L&&L.relT&&n-L.relT>300)hp2=true}
        if(hp2)r.k='happy'}}catch(e){}return r})(chExpr)}catch(e){}
  /* ตัว: ท่าเลือดน้อย/ถอนหายใจ (หมุนรอบเท้า) */
  try{drawChar=(f=>function(x,y,cls,fx){const L=LPOSE;if(!L)return f.apply(this,arguments);const dir=CHA&&CHA.fx!=null?(CHA.fx<0?-1:1):(fx<0?-1:1);
      const X=l7Xf(L,dir,L.ph,L.mv);if(!X.rot&&!X.ty&&X.sx===1&&X.sy===1)return f.apply(this,arguments);const px=x,py=y+14;
      g.save();g.translate(px,py+X.ty);g.rotate(X.rot);g.scale(X.sx,X.sy);g.translate(-px,-py);try{return f.apply(this,arguments)}finally{g.restore()}})(drawChar)}catch(e){}
  /* ทั้งตัวผู้เล่น: คิดสถานะ → วาด → เอฟเฟกต์ */
  try{const _p=drawP;drawP=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const u=lk&&lk.u;if(!u||!me.cls||PGNT)return _p.apply(this,arguments);
      let L=null,S=null,dead=false;const a=Array.prototype.slice.call(arguments);
      try{dead=a6Dead(u,hp);L=l7Tick(u,hp,mh,dead,lk.mt|0);const A=ANS[u];L.ph=ph;L.mv=A?A.mv:0;
        S=s7Tick(u,cls,x,y,hp,mh,down||dead,lk);if(S.s>0&&S.w){const fd=CX-x>=0?1:-1;a[10]=fd}}catch(e){}
      const dir=(a[10]||1)<0?-1:1;if(S&&S.s>0&&S.w)try{s7Warm(x,y,S.s)}catch(e){}if(S&&S.s>=.6&&S.wa&&!down)try{s7GroundW(x,y,dir,S.wa)}catch(e){}
      const l0=LPOSE,g0=GSIT;LPOSE=L&&(L.k>0||L.relT)&&!dead&&!down?L:null;GSIT=S&&S.s>0?Object.assign({key:u},S):null;
      try{return _p.apply(this,a)}finally{LPOSE=l0;GSIT=g0;SITD=null;CHSIT=0;
        try{if(L&&!dead)l7Fx(u,L,x,y,dir)}catch(e){}try{if(CF7[u])c7Draw(u,x,y)}catch(e){}}}}catch(e){}
  /* ⑤ จุดเริ่มท่าฉลอง */
  try{pcRecv=(f=>function(o){const r=f.apply(this,arguments);try{if(o&&o.ty==='cheer'&&typeof o.by==='string'&&o.by!==uid&&RCAST[o.by])c7Burst(o.by,'')}catch(e){}return r})(pcRecv)}catch(e){}
  try{gainXP=(f=>function(){const l0=me.lv;let a0=0;try{a0=astOf().n|0}catch(e){}const r=f.apply(this,arguments);try{let a1=0;try{a1=astOf().n|0}catch(e){}if(me.lv>l0||a1>a0)cheerGo('lv')}catch(e){}return r})(gainXP)}catch(e){}
  try{vz3Show=(f=>function(it){const r=f.apply(this,arguments);try{setTimeout(()=>cheerGo('item'),250)}catch(e){}return r})(vz3Show)}catch(e){}
  try{qKill=(f=>function(x,y,t,bs){const r=f.apply(this,arguments);try{if((bs||t===3)&&me.cls&&me.down<=0&&Math.hypot(me.x-x,me.y-y)<500)setTimeout(()=>cheerGo('boss'),420)}catch(e){}return r})(qKill)}catch(e){}
},1600);
