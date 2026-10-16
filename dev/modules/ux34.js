/* ---------- v409 มอนสเตอร์มีชีวิต: ยุบตอนโดนตี · ง้างก่อนตีให้หลบได้ · ท่าตายตามชนิด ----------
   1 โดนตี: ตัวยุบแล้วเด้งกลับ (สปริงหน่วง) + เอนหนีทิศคนตี · คริติคอลแรงขึ้น 1.6 เท่า
   2 ง้างก่อนตี (มอนระยะประชิดในแมพปกติ): โฮสต์เริ่มท่าง้าง → หยุดเดิน → พ้นเวลาแล้วตีถ้าเป้ายังอยู่ในระยะ ไม่งั้น «หลบ!»
     เวลาง้าง ตัวเล็ก 0.42 วิ · ตัวบิน 0.32 วิ · ตัวใหญ่ 0.55 วิ · ลูกจังหวะการตีเท่าเดิม (0.9 วิ/ครั้ง) ดาเมจต่อวินาทีเท่าเดิมถ้ายืนรับ
     ทุกเครื่องวาดเวลาเดียวกันจาก akT ที่ส่งอยู่แล้ว: ตัวเอนหลัง + ตาแดงวาบ + ลิ่มสีแดงบนพื้นค่อย ๆ เต็มจนถึงจังหวะฟาด
     หลบสำเร็จ: ขึ้นคำว่า «หลบ!» + เกจโหมดคลั่ง +3
   3 ท่าตาย: ตัวเล็กล้มหงาย · ตัวบินหมุนร่วงกระแทกพื้น · ตัวใหญ่เซ คุกเข่า แล้วล้มคว่ำพื้นสะเทือน
     เศษตามวัสดุของแมพ: ฝุ่น กระดูก ถ่านไฟ ผลึกแตก วิญญาณสลาย ทราย ฟองน้ำ ใบไม้ เศษเหล็ก ละอองแสง · มอนธาตุ (อีลีท) แตกเป็นเสี่ยง */
const MWUON=true,MWUT={0:.42,1:.32,2:.55};
const mWU=m=>MWUT[m.t]||.42;
function mWuMode(){try{if(typeof ESCI==='function'&&ESCI())return 0;if(typeof MDFI==='function'&&MDFI())return 0;if(typeof HFGI==='function'&&HFGI())return 0}catch(e){}return 1}
function mIsMelee(m){if(!MWUON||!m||m.t>2||m.mir||m.wb||m.pv)return false;try{if(mRng(m))return false}catch(e){}return mWuMode()===1}
/* จังหวะท่าโจมตี (0..1 ในสเกลเดิม: 0-.3 ง้าง · .3-.6 ฟาด · .6-1 คืนตัว) */
function mAkP(m){if(!m.akT)return 9;const e=(performance.now()-m.akT)/1000;if(!mIsMelee(m))return e/.38;const W=mWU(m);if(e<W)return .3*(e/W);return .3+(e-W)/.27*.7}
/* โฮสต์: นับเวลาง้าง · คืน true ระหว่างง้าง (มอนหยุดเดิน) */
function mWuTick(m,dt,pl){const W=m.wu;if(!W)return false;if(m.frz>0){m.wu=null;return false}W.t-=dt;if(W.t>0)return true;m.wu=null;
  const p=pl.find(q=>q.u===W.u);if(!p)return false;const d=Math.hypot(p.x-m.x,p.y-m.y);
  if(!p.d&&d<=W.rc){if(W.dm>0)dmgQ[W.u]=(dmgQ[W.u]||0)+W.dm}else if(!p.d){try{fx({k:'mdg',u:W.u,x:Math.round(p.x),y:Math.round(p.y)})}catch(e){}}return false}
let MDGT=0;
function mDodged(o){if(!me.cls||o.u!==uid)return;const n=performance.now();if(n-MDGT<550)return;MDGT=n;
  dn.push({x:me.x,y:me.y-44,v:'หลบ!',t:.7,col:'#9fe8ff'});try{if(typeof fvAdd==='function')fvAdd(3)}catch(e){}try{spark(me.x,me.y-14,'#bff0ff',5,80,.3)}catch(e){}}
/* ----- 1 ยุบตอนโดนตี ----- */
function mHitSq(m,fd){const e=(performance.now()-(m.hitT||0))/1000;if(e>.45||e<0)return null;const k=(m._hcr||1)*(m.t===2?.75:1),v=Math.exp(-e*15)*Math.cos(e*38),dir=me&&me.cls?(m.x>=me.x?1:-1):-fd,dk=Math.exp(-e*12);
  return{sx:.17*v*k,sy:-.19*v*k,r:dir*.13*dk*k,ox:dir*2.6*dk*k}}
/* ----- 2 สัญญาณง้าง: ลิ่มบนพื้น + ตาวาบ ----- */
function mTele(m,r,fd,pre){if(!mIsMelee(m)||!m.akT)return;const e=(performance.now()-m.akT)/1000,W=mWU(m);if(e>W+.16)return;const q=Math.min(1,e/W),gy=m.y+r*.85;
  g.save();if(pre){const L=r+30,a0=fd>0?0:Math.PI,sp=.62;g.translate(m.x,gy);g.scale(1,.5);
      const strike=e>=W;g.fillStyle='rgba(255,60,40,'+(strike?.45*(1-(e-W)/.16):.1+.16*q)+')';g.beginPath();g.moveTo(0,0);g.arc(0,0,L,a0-sp,a0+sp);g.closePath();g.fill();
      if(!strike){g.fillStyle='rgba(255,90,60,'+(.22+.3*q)+')';g.beginPath();g.moveTo(0,0);g.arc(0,0,L*q,a0-sp,a0+sp);g.closePath();g.fill();
        g.strokeStyle='rgba(255,140,110,'+(.35+.5*q)+')';g.lineWidth=1.6;g.beginPath();g.arc(0,0,L,a0-sp,a0+sp);g.stroke()}}
  else if(e<W){const a=Math.min(1,q*2.5)*(1-.5*Math.max(0,q-.8)/.2);g.globalCompositeOperation='lighter';glowAt(m.x+fd*r*.3,m.y-r*.75,r*.9,'255,60,40',.5*a);
    if(q>.55&&!LOWQ){const s=(q-.55)/.45;g.strokeStyle='rgba(255,235,200,'+(.8*s)+')';g.lineWidth=1.4;const cx=m.x+fd*r*.35,cy=m.y-r*1.05,k=3+4*s;g.beginPath();g.moveTo(cx-k,cy);g.lineTo(cx+k,cy);g.moveTo(cx,cy-k);g.lineTo(cx,cy+k);g.stroke()}}
  g.restore()}
/* ----- 3 ท่าตาย ----- */
const MCORP=[],MLAST={};let MLMAP=-1;
function mMat(){const c=curMap;try{if(isDg()||isTw())return'dust'}catch(e){}
  if(SHADEM(c))return'spirit';if(ROOTM(c))return'leaf';if(CASTM(c))return'light';
  return({2:'bone',3:'ember',4:'shatter',5:'spirit',6:'splash',7:'dust',8:'sand',9:'metal',10:'shatter',11:'shatter'})[c]||'dust'}
const MATC={dust:['#d6c6a6','#a89878','#eee2c8'],bone:['#f2ecd8','#d8ceb0','#fffaf0'],ember:['#ff9a3a','#ffd060','#ff5a2a'],shatter:['#cfeaff','#ffffff','#9fd0ff'],spirit:['#c8a8ff','#9a7ad8','#ffffff'],
  splash:['#8fd0ff','#d8f4ff','#5aa8e0'],sand:['#e8c888','#c8a060','#f8e0a8'],leaf:['#7ac860','#a8e070','#5a9a40'],metal:['#c8ccd4','#ffffff','#8a909a'],light:['#ffe6a0','#ffffff','#ffd060']};
function mSpawnCorpse(L){if(MCORP.length>=12)MCORP.shift();const m=L.m,r=(MT[m.t]&&MT[m.t].r)||12,mat=mMat(),fly=m.t===1;
  const st=(mat==='spirit'||mat==='light')?'fade':fly?'drop':m.t===2?'topple':'fall';
  const dir=me&&me.cls?(m.x>=me.x?1:-1):((m.fx||1)<0?1:-1);
  let sc=1;try{sc=(shOf(m)?1.35:1)*(m.el?1.3:1)*(szOf(m)||1)}catch(e){}
  MCORP.push({sc,m:{id:m.id,x:m.x,y:m.y,t:m.t,L:m.L,fx:m.fx||1,el:m.el,p:m.p,_an:m._an,mh:m.mh,hp:0},t0:performance.now(),r,mat,st,dir,D:st==='topple'?1.05:st==='fade'?.85:.8,ev:{}});
  const C=MATC[mat]||MATC.dust;if(m.el){try{burst(m.x,m.y-r*.5,['#ffffff',C[0],C[1]],16,150,.55,{glow:1,g:60})}catch(e){}}
  if(mat==='shatter'){try{burst(m.x,m.y-r*.5,C,14,130,.6,{g:160,r:2.4})}catch(e){}}}
function mCorpseDraw(Q,now){const e=(now-Q.t0)/1000/Q.D;if(e>=1)return false;const m=Q.m,r=Q.r,d=Q.dir,C=MATC[Q.mat]||MATC.dust,T=now/1000+m.id*.37,gy=m.y+r*.85;
  let rot=0,sx=1,sy=1,ox=0,oy=0,a=1,hf=e<.1?1-e/.1:0;const eo=x=>1-(1-x)*(1-x),c=(x,p,q)=>Math.max(0,Math.min(1,(x-p)/(q-p)));
  const once=(k,f)=>{if(!Q.ev[k]){Q.ev[k]=1;try{f()}catch(err){}}};
  if(Q.st==='fall'){ox=d*7*eo(c(e,0,.35));rot=d*1.45*eo(c(e,.08,.42));const land=c(e,.42,.55);sy-=.12*Math.sin(land*Math.PI);sx+=.1*Math.sin(land*Math.PI);oy=-4*Math.sin(c(e,.05,.42)*Math.PI)+3*c(e,.6,1);a=1-c(e,.62,1);
    if(e>=.42)once('l',()=>burst(m.x+d*r,gy,C,LOWQ?5:10,70,.5,{g:Q.mat==='ember'?-60:90,flat:.45}))}
  else if(Q.st==='drop'){const f=c(e,0,.5);rot=d*f*6.6;ox=d*10*f;oy=-5*Math.sin(f*Math.PI)+11*f*f;if(e>.5){rot=d*6.6+d*.3*Math.sin((e-.5)*20)*(1-c(e,.5,.7));oy=11;sy=1-.25*Math.sin(c(e,.5,.62)*Math.PI);}a=1-c(e,.6,1);
    if(e>=.5)once('l',()=>burst(m.x+d*10,gy,C,LOWQ?6:12,90,.5,{g:80,flat:.5,glow:Q.mat==='ember'?1:0}))}
  else if(Q.st==='topple'){const sh=c(e,0,.25),kn=c(e,.25,.45),tp=eo(c(e,.45,.68));ox=Math.sin(e*70)*2.5*(1-sh)*(e<.25?1:0)-d*4*tp;sy-=.16*kn*(1-tp*.5);sx+=.1*kn;rot=-d*1.5*tp;oy=2*c(e,.7,1);a=1-c(e,.72,1);
    if(e>=.66)once('l',()=>{burst(m.x-d*r*1.4,gy,C,LOWQ?8:18,120,.6,{g:90,flat:.4,glow:1});if(me.cls&&Math.hypot(me.x-m.x,me.y-m.y)<260)shk=Math.max(shk,.05)})}
  else{/* fade: วิญญาณ/แสง สลายขึ้นฟ้า */const f=c(e,.1,1);sy=1+.35*f;sx=1-.3*f;oy=-10*f;a=1-f;
    if(e>=.12)once('l',()=>burst(m.x,m.y-r*.6,C,LOWQ?6:14,60,.9,{g:-70,glow:1,rad:r*.6}))}
  if(Q.mat==='bone'&&e>=.45)once('b',()=>burst(m.x,gy-2,['#f6f0dc','#ddd2b2'],LOWQ?4:8,90,.7,{g:220,r:2.6}));
  if(Q.mat==='metal'&&e>=.4)once('b',()=>burst(m.x,gy-4,['#ffffff','#ffe0a0'],LOWQ?3:7,140,.35,{g:160,r:1.4,glow:1}));
  if(Q.mat==='leaf'&&e>=.3)once('b',()=>burst(m.x,m.y-r,C,LOWQ?4:9,50,1,{g:40,r:2.2}));
  if(Q.mat==='splash'&&e>=.45)once('b',()=>burst(m.x,gy-4,C,LOWQ?5:10,100,.5,{g:200,up:60}));
  if(Q.mat==='sand'){sy*=1-.35*c(e,.5,1);}
  try{gxShadow(m.x+ox+(Q.st==='drop'?0:Math.sin(rot)*r*.8),gy-r*.05,r*(1+.25*Math.abs(Math.sin(rot))),r*.3,.55*Math.max(0,a))}catch(err){}MSHOFF=1;
  const pv=Q.st==='drop'?m.y-r*.45:gy;g.save();g.globalAlpha=Math.max(0,a);g.translate(m.x+ox,pv+oy);g.rotate(rot);g.scale(sx*(Q.sc||1),sy*(Q.sc||1));g.translate(-m.x,-pv);
  const M0=MON_CUR;MON_CUR=m;try{drawMon(m.x,m.y,m.t,(m._an&&m._an.ck)||T,m.fx,0,hf)}catch(err){}finally{MON_CUR=M0;MSHOFF=0}g.restore();
  return true}
function mCorpseTick(){const now=performance.now();if(MLMAP!==curMap){MLMAP=curMap;MCORP.length=0;for(const k in MLAST)delete MLAST[k]}
  let ids=null;for(const k in MLAST){const L=MLAST[k];if(now-L.seen<120)continue;if(!ids){ids=new Set();for(const q of mons)ids.add(q.id)}
    const alive=ids.has(L.m.id)&&L.m.hp>0;if(alive){if(now-L.seen>1500)delete MLAST[k];continue}
    const m=L.m;if(now-L.seen<400&&(m.hp<=0||m.hp<=(m.mh||1)*.45||now-(m.hitT||0)<1500)&&inView(m.x,m.y,60))mSpawnCorpse(L);delete MLAST[k]}
  for(let i=MCORP.length-1;i>=0;i--)if(!mCorpseDraw(MCORP[i],now))MCORP.splice(i,1)}
setTimeout(()=>{
  /* วาดมอน: ยุบตอนโดนตี + ลิ่มง้าง + จดจำไว้ทำท่าตาย */
  try{const _a=drawMonAnim;drawMonAnim=function(m,T,hf){const r=(MT[m.t]&&MT[m.t].r)||12,fd=(m.fx||1)<0?-1:1,ok=m.t<3&&!m.mir&&!m.wb&&!m.pv&&!m.dum;
      if(ok){MLAST[m.id]={m,seen:performance.now()};try{mTele(m,r,fd,1)}catch(e){}}
      MHS=ok?mHitSq(m,fd):null;try{_a.apply(this,arguments)}finally{MHS=null}
      if(ok)try{mTele(m,r,fd,0)}catch(e){}}}catch(e){}
  try{const _sh=gxShadow;gxShadow=function(){if(MSHOFF)return;return _sh.apply(this,arguments)}}catch(e){}
  try{const _p=drawMProj;drawMProj=function(){try{mCorpseTick()}catch(e){}return _p.apply(this,arguments)}}catch(e){}
  try{const _ah=addHit;addHit=function(m,d,cr){try{if(m)m._hcr=cr?1.6:1}catch(e){}return _ah.apply(this,arguments)}}catch(e){}
  try{const _hf=handleFx;handleFx=function(o){if(o&&o.k==='mdg'){try{mDodged(o)}catch(e){}return}return _hf.apply(this,arguments)}}catch(e){}
},720);
let MHS=null,MSHOFF=0;
