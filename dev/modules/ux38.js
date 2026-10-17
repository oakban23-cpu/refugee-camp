/* ---------- v420 หอขี่คอ: ท่าไม้ตาย «โยนขึ้น» + บอสกวาดหอ ----------
   🤸 โยนขึ้น (ฐานกด · คูลดาวน์ 12 วิ): ฐานย่อแล้วดีดทุกคนบนหอขึ้นฟ้า → ตีลังกาลงกระแทกพื้นรอบ ๆ ฐานเป็นวง
     · ดาเมจ/รัศมีขึ้นกับความสูงหอ (n คน) และชั้นของคนนั้น (ชั้นสูงตกจากที่สูงกว่า = แรงกว่า) · ลอยกลางอากาศ = ไม่โดนตี
     · ลงพื้นแล้วทุกคนออกจากหอ ฐานกลับมาตีได้ทันที
   💢 บอสกวาดหอ: บอสที่อยู่ใกล้หอ (≥1 คนบนคอ) จะเล็งวงแดงใต้หอ 1.4 วิ แล้วฟาด
     · หอยังอยู่ในวง = หอพัง: คนบนคอร่วงกระเด็น เสียเลือด 12% ฐานเสีย 18% · ทุกคนในหอมึน 0.9 วิ
     · หลบ: ฐานพาหอเดินออกจากวง หรือคนบนคอกระโดดลงกระจายตัว · คนที่ยืนในวงโดยไม่ได้อยู่หอโดน 8%
     · โฮสต์เป็นคนตัดสินว่าบอสจะเล็งเมื่อไร (fx skw) · แต่ละเครื่องเช็กตัวเองตอนฟาด */
const SKACH=['skT1','skT2','skT3','skT4'],SKLCD=12,SKW_R=95,SKW_W=1.4;let SKLT=0,SKLB={},SKW=[],SKF=null;
function skJTimes(lv){const W=.25,F=.62+.08*lv;return{W,F,L:W+F}}
function skJPos(J,now){const T=skJTimes(J.lv),e=(now-J.t0)/1000;if(e<T.W)return null;const p=Math.min(1,(e-T.W)/T.F),q=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
  const gx=J.sx+(J.tx-J.sx)*q,gy=J.sy+(J.ty-J.sy)*q,H0=SKH*J.lv+6,pk=30+10*J.lv,h=H0*(1-p)+pk*4*p*(1-p);return{gx,gy,h,p}}
/* จุดลงของคนชั้น i (1..n) — เหมือนกันทุกเครื่อง */
function skLandAt(x,y,d,i,n){const A=n===1?[0]:n===2?[-.42,.42]:[-.7,0,.7],a=A[i-1]||0,ds=74+10*i;let tx=x+d*Math.cos(a)*ds,ty=y+Math.sin(a)*ds*.75+6;
  try{tx=Math.max(40,Math.min(WW-40,tx));ty=Math.max(60,Math.min(WH-40,ty))}catch(e){}return{tx,ty}}
/* ---- ฐานกดโยน ---- */
function skLaunch(){if(!SKB0||me.down>0)return;const now=performance.now();if(now<SKLT){banner={s:'🤸 โยนได้อีกครั้งใน '+Math.ceil((SKLT-now)/1000)+' วิ',t:1.5};return}
  const R=skRiders(uid).map(r=>r.u).slice(0,SKMAX);if(!R.length)return;SKLT=now+SKLCD*1000;const d=Math.cos(me.face)<0?-1:1;
  skStat('twl');try{fx({k:'skl',R,x:Math.round(me.x),y:Math.round(me.y),d})}catch(e){}}
function skLaunchFx(o){if(!o||!Array.isArray(o.R)||!o.R.length)return;const now=performance.now(),n=Math.min(SKMAX,o.R.length),d=o.d<0?-1:1;
  SKLB[o.by]={t0:now};
  o.R.slice(0,n).forEach((u,k)=>{if(typeof u!=='string')return;const lv=k+1,T=skLandAt(o.x,o.y,d,lv,n);
    SKJ[u]={t0:now,lv,n,d,sx:o.x,sy:o.y,tx:T.tx,ty:T.ty,b:o.by,land:0,sp:(k%2?-1:1)};
    if(u===uid){SKE.jump=SKJ[u]}});
  try{sfx('flip')}catch(e){}
  if(o.by===uid)banner={s:'🤸 โยนขึ้น! ('+n+' คน) · คุณกลับมาตีได้แล้ว',t:2.5}}
/* ลงพื้น: กระแทกเป็นวง (ทุกเครื่องเห็น · ดาเมจคิดเฉพาะเครื่องของคนที่ลง) */
function skLand(u,J){J.land=1;const x=J.tx,y=J.ty,R=64+12*J.n+8*J.lv,col=['#ffe08a','#ffb060','#ff7a50'][Math.min(2,J.lv-1)];
  try{fxs.push({k:'dgring',x:Math.round(x),y:Math.round(y),r:R,t:.45,d:.45,s:0,c:col})}catch(e){}
  try{burst(x,y,['#d8c8a8','#a89878','#fff2c8'],LOWQ?8:18,150,.55,{g:60})}catch(e){}
  try{if(Math.hypot(me.x-x,me.y-y)<420)shk=Math.max(shk,.12+.05*J.lv)}catch(e){}try{sfx('boom')}catch(e){}
  if(u!==uid)return;
  /* เครื่องของคนที่ลง: ดาเมจวงรอบจุดลง */
  const mul=1.5+.45*J.n+.3*J.lv,ck=me.cls==='sup'?'holy':me.cls==='assn'?'assn':me.cls==='mage'?'mage':me.cls==='archer'?'archer':'melee';let hit=0;
  try{mons.forEach(m=>{if(!m||m.hp<=0||m.ally)return;const dd=Math.hypot(m.x-x,m.y-y);if(dd>R+(m.t===3?30:8))return;const f=1-.4*Math.min(1,dd/R);addHit(m,pd()*mul*f,0,1,ck);hit++})}catch(e){}
  skStat('twl');skStat('tws',hit,1);
  try{dn.push({x,y:y-46,v:'💥 กระแทก ×'+mul.toFixed(1)+(hit?' · '+hit+' ตัว':''),t:1.2,col})}catch(e){}
  try{me.inv3=Math.max(me.inv3||0,.25)}catch(e){}}
function skJTick(){const now=performance.now();for(const u in SKJ){const J=SKJ[u],T=skJTimes(J.lv),e=(now-J.t0)/1000;
    if(!J.land&&e>=T.L)skLand(u,J);if(e>T.L+1.6)delete SKJ[u]}
  for(const b in SKLB)if(now-SKLB[b].t0>900)delete SKLB[b];
  /* เครื่องคนที่ถูกโยน: หลุดจากหอตอนดีดขึ้น · ล็อกตำแหน่งตามเส้นโค้ง · ลอยอยู่ = ไม่โดนตี */
  const J=SKE.jump;if(J){const P=skJPos(J,now);if(P){if(SKE.b){SKE.b='';SKE.id=''}me.x=P.gx;me.y=P.gy;me.face=J.d<0?Math.PI:0;me.inv3=Math.max(me.inv3||0,.2)}
    if(J.land||!SKJ[uid]){SKE.jump=null;if(J.land){me.x=J.tx;me.y=J.ty}}}}
/* ---- ปุ่ม 🤸 (เหนือปุ่มลอย #rdb) ---- */
function sklBtn(){let b=$('skl');if(!b){const r=$('rdb');if(!r||!r.parentNode)return null;b=document.createElement('button');b.id='skl';b.hidden=true;r.parentNode.insertBefore(b,r.nextSibling);
    const st=document.createElement('style');st.textContent='#skl{position:fixed;right:10px;bottom:306px;z-index:30;padding:8px 13px;font:bold 13px system-ui;color:#fff6e0;border-radius:18px;border:2px solid #ffd27a;background:linear-gradient(#c8641e,#7a3410);box-shadow:0 0 14px rgba(255,170,80,.55);pointer-events:auto}#skl.cd{filter:grayscale(.7) brightness(.8);box-shadow:none}@media (max-height:780px){#skl{bottom:280px}}@media (max-height:700px){#skl{bottom:256px}}';document.head.appendChild(st);
    b.addEventListener('click',e=>{e.stopPropagation();skLaunch()})}return b}
function sklUI(){const b=sklBtn();if(!b)return;let tx='';const now=performance.now();
  if(me.cls&&run&&ov.hidden&&!SD.on&&SKB0&&me.down<=0){const n=skRiders(uid).length;tx=now<SKLT?'🤸 โยน ('+Math.ceil((SKLT-now)/1000)+')':'🤸 โยนขึ้น! ×'+n;b.classList.toggle('cd',now<SKLT)}
  if(b.hidden!==!tx)b.hidden=!tx;if(tx&&b.textContent!==tx)b.textContent=tx}
/* ---- บอสกวาดหอ ---- */
const SKWC={};
function skTowers(){const B={};const all=[uid].concat(Object.keys(others));all.forEach(u=>{const s=skOf(u);if(!s)return;const b=skRoot(u);if(b!==u)B[b]=(B[b]||0)+1});return B}
function skwHost(){try{if(!isHost()||!me.cls)return}catch(e){return}const now=performance.now(),T=skTowers();const bs=Object.keys(T);if(!bs.length){for(const k in SKWC)SKWC[k].seen=0;return}
  mons.forEach(m=>{if(!m||m.t!==3||m.hp<=0||m.pv||m.dum||m.ally)return;const C=SKWC[m.id]=SKWC[m.id]||{nx:0,seen:0};
    let best=null,bd=330;bs.forEach(b=>{const P=skPos(b);if(!P||P.hp<=0)return;const dd=Math.hypot(P.x-m.x,P.y-m.y);if(dd<bd){bd=dd;best=P}});
    if(!best){C.seen=0;return}if(!C.seen){C.seen=1;C.nx=Math.max(C.nx,now+2500+Math.random()*3000);return}if(now<C.nx)return;
    C.nx=now+9000+Math.random()*4000;try{fx({k:'skw',m:m.id,mx:Math.round(m.x),my:Math.round(m.y),x:Math.round(best.x),y:Math.round(best.y),r:SKW_R,w:SKW_W})}catch(e){}})}
function skwFx(o){if(!o||typeof o.x!=='number'||typeof o.y!=='number')return;const r=Math.max(40,Math.min(160,+o.r||SKW_R)),w=Math.max(.6,Math.min(3,+o.w||SKW_W));
  SKW.push({mid:o.m,mx:+o.mx||o.x,my:+o.my||o.y,x:o.x,y:o.y,r,w,t0:performance.now(),done:0});if(SKW.length>6)SKW.shift();
  const inT=SKE.b||SKB0;if(inT&&Math.hypot(me.x-o.x,me.y-o.y)<r+30){banner={s:'💢 บอสเล็งหอ! '+(SKB0?'พาหอเดินออกจากวงแดง':'กระโดดลง (ดันจอยค้าง) หรือรอฐานพาหลบ'),t:w};try{sfx('growl')}catch(e){}}}
function skwResolve(W){W.done=1;const x=W.x,y=W.y,r=W.r;
  try{fxs.push({k:'dgring',x:Math.round(x),y:Math.round(y),r:r+8,t:.5,d:.5,s:0,c:'#ff4a3a'})}catch(e){}try{burst(x,y-10,['#ff6a5a','#ffd0a0','#ffffff'],LOWQ?8:16,200,.45,{g:40})}catch(e){}
  try{if(Math.hypot(me.x-x,me.y-y)<460)shk=Math.max(shk,.22)}catch(e){}try{sfx('shatter')}catch(e){}
  if(!me.cls||me.down>0||SKE.jump){W.fin=1;return}
  /* v425 ฐานเป็นคนตัดสินแทนทั้งหอ (ตำแหน่งบนจอฐานแม่นที่สุด) → ส่งผลให้คนบนคอ · คนบนคอรอผล 0.8 วิ ถ้าไม่มาค่อยเช็กเอง */
  const key=Math.round(x)+','+Math.round(y);
  if(SKB0){const inT=Math.hypot(me.x-x,me.y-y)<r;try{fx({k:'skv',key,hit:inT?1:0})}catch(e){}skwApply(W,inT,0);return}
  if(SKE.b){W.key=key;W.wait=performance.now();return}
  W.fin=1;if(Math.hypot(me.x-x,me.y-y)<r){try{hurt(me.mh*.08)}catch(e){}}}
const SKV={};
function skwApply(W,inT,rider){W.fin=1;const P=skPos(rider?skRoot(uid):uid)||{x:me.x,y:me.y};
  if(inT){if(rider){SKE.b='';SKE.id='';const a=Math.random()*6.283;me.x=P.x+Math.cos(a)*(34+Math.random()*20);me.y=P.y+Math.sin(a)*22+12}
    try{hurt(me.mh*(rider?.12:.18))}catch(e){}SKF={t:.9,x:me.x,y:me.y};banner={s:'💥 หอถูกบอสกวาดล้ม! '+(rider?'ร่วงลงมา':'ทุกคนร่วง')+' · มึน 0.9 วิ',t:2.5};
    try{dn.push({x:me.x,y:me.y-52,v:'💫 หอพัง!',t:1.2,col:'#ff8a6a'})}catch(e){}return}
  skStat('twd');try{dn.push({x:me.x,y:me.y-56,v:'✨ หลบทัน!',t:1,col:'#a8f0a8'})}catch(e){}}
function skwTick(dt){const now=performance.now();SKW.forEach(W=>{if(!W.done&&now-W.t0>=W.w*1000)skwResolve(W);
    else if(W.done&&W.wait&&!W.fin){if(!SKE.b){W.fin=1;return}const v=SKV[W.key];if(v!==undefined){skwApply(W,!!v,1)}else if(now-W.wait>800){const P=skPos(skRoot(uid));skwApply(W,!!(P&&Math.hypot(P.x-W.x,P.y-W.y)<W.r),1)}}});
  SKW=SKW.filter(W=>(!W.fin&&now-W.t0<W.w*1000+2000)||now-W.t0<W.w*1000+600);for(const k in SKV)if(now-SKV[k+'@']>3000){delete SKV[k];delete SKV[k+'@']}
  if(SKF){SKF.t-=dt||0;if(SKF.t<=0)SKF=null}}
/* วงเตือน */
function skwDraw(){if(!SKW.length)return;const now=performance.now();g.save();SKW.forEach(W=>{const e=(now-W.t0)/1000,p=Math.min(1,e/W.w);if(W.done)return;
    g.globalAlpha=.26+.1*Math.sin(e*14);g.fillStyle='#ff2a1a';g.beginPath();g.ellipse(W.x,W.y,W.r,W.r*.62,0,0,7);g.fill();
    g.globalAlpha=.3;g.fillStyle='#ff6a3a';g.beginPath();g.ellipse(W.x,W.y,W.r*p,W.r*.62*p,0,0,7);g.fill();
    g.globalAlpha=1;g.lineWidth=3;g.shadowColor='#ff2a1a';g.shadowBlur=10;g.strokeStyle='#ffd0c0';g.setLineDash([10,7]);g.lineDashOffset=-e*30;g.beginPath();g.ellipse(W.x,W.y,W.r,W.r*.62,0,0,7);g.stroke();g.setLineDash([]);g.shadowBlur=0;
    /* เส้นเล็งจากบอส */
    let bx=W.mx,by=W.my;try{const m=mons.find(q=>q.id===W.mid);if(m){bx=m.x;by=m.y}}catch(e){}
    g.globalAlpha=.35+.3*p;g.lineWidth=3;g.strokeStyle='#ff6a4a';g.beginPath();g.moveTo(bx,by-20);g.quadraticCurveTo((bx+W.x)/2,Math.min(by,W.y)-60,W.x,W.y);g.stroke();
    g.globalAlpha=1;g.font='bold 16px system-ui';g.textAlign='center';g.fillStyle='#fff';g.strokeStyle='rgba(60,0,0,.8)';g.lineWidth=3;const tx='💢 '+Math.max(0,W.w-e).toFixed(1);g.strokeText(tx,W.x,W.y+W.r*.62+18);g.fillText(tx,W.x,W.y+W.r*.62+18)});g.restore()}
/* ---- v421 ตีลังกาปีนขึ้นหอ ----
   คนปีนกระโดดจากจุดที่ยืน ตีลังกาหลัง 1 รอบ แล้วลงนั่งคร่อมคอ · คนข้างล่างย่อรับ · ทุกเครื่องเห็น (fx skc) */
const SKCB={};
function skcFx(o){if(!o||typeof o.by!=='string'||typeof o.b!=='string'||typeof o.sx!=='number'||typeof o.sy!=='number')return;const now=performance.now();
  SKCL[o.by]={t0:now,sx:o.sx,sy:o.sy,b:o.b,land:0};
  try{burst(o.sx,o.sy,['#d8c8a8','#a89878'],LOWQ?5:10,90,.4,{g:50})}catch(e){}try{if(Math.hypot(me.x-o.sx,me.y-o.sy)<500)sfx('flip')}catch(e){}}
/* ตำแหน่งตามเส้นโค้งตอนปีน (ที่นั่งคำนวณจากฐานปัจจุบัน — ฐานเดินอยู่ก็ตามทัน) */
function skcPos(u,C,now){const rb0=skRoot(u),rb=rb0!==u?rb0:C.b,P=skPos(rb);if(!P)return null;const R=skRiders(rb);let lv=R.findIndex(r=>r.u===u)+1;if(lv<1)lv=R.length+1;lv=Math.max(1,Math.min(SKMAX,lv));
  const d=P.d,p=Math.min(1,(now-C.t0)/1000/SKCD),q=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,tx=P.x-d*2.2*lv,gx=C.sx+(tx-C.sx)*q,gy=C.sy+(P.y-C.sy)*q,h=SKH*lv*q+(30+6*lv)*4*p*(1-p),
    f=Math.max(0,Math.min(1,(p-.08)/.8)),rot=-d*6.283*(f*f*(3-2*f));return{gx,gy,h,p,rot,d,lv,rb,R}}
function skcTick(){const now=performance.now();for(const u in SKCL){const C=SKCL[u],e=(now-C.t0)/1000;
    if(!C.land&&e>=SKCD){C.land=1;try{const Q=skcPos(u,C,now-1);if(Q){const below=Q.lv>1&&Q.R[Q.lv-2]?Q.R[Q.lv-2].u:Q.rb;SKCB[below]={t0:now};burst(Q.gx,Q.gy-Q.h+8,['#fff2c8','#d8c8a8'],LOWQ?4:8,70,.35,{g:40})}}catch(e){}}
    if(e>SKCD+1)delete SKCL[u]}
  for(const b in SKCB)if(now-SKCB[b].t0>400)delete SKCB[b]}
setTimeout(()=>{
  try{const _h=handleFx;handleFx=function(o){if(o&&o.k==='skv'){try{if(typeof o.key==='string'&&SKE.b&&skRoot(uid)===o.by){SKV[o.key]=o.hit?1:0;SKV[o.key+'@']=performance.now()}}catch(e){}return}if(o&&(o.k==='skl'||o.k==='skw'||o.k==='skc')){try{if(o.k==='skl')skLaunchFx(o);else if(o.k==='skc')skcFx(o);else skwFx(o)}catch(e){}return}return _h.apply(this,arguments)}}catch(e){}
  try{const _u=updateMe;updateMe=function(dt){const sx=me.x,sy=me.y;const r=_u.apply(this,arguments);try{skJTick();skcTick();skwTick(dt);if(SKF&&me.down<=0){me.x=SKF.x;me.y=SKF.y}}catch(e){}return r}}catch(e){}
  /* มึนอยู่ = ตี/สกิล/หลบไม่ได้ */
  try{const _us=useSkill;useSkill=function(k){if(SKF)return;return _us.apply(this,arguments)}}catch(e){}
  try{const _dg=dodge;dodge=function(){if(SKF)return false;return _dg.apply(this,arguments)}}catch(e){}
  /* วาดชั้นบน (ทับตัวละครแบบโปร่ง) ให้เห็นชัดแม้ฉากกลางคืน */try{const _mp=drawMProj;drawMProj=function(){try{skwDraw()}catch(e){}return _mp.apply(this,arguments)}}catch(e){}
  /* วาดคนที่ถูกโยน: ลอยตามเส้นโค้ง + ตีลังกา + เงาบนพื้น */
  try{const _p=drawP;drawP=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const u=lk&&lk.u,J=u&&SKJ[u],CL=u&&!down&&skClimbing(u)?SKCL[u]:null;
      if(CL){const Q=skcPos(u,CL,performance.now());if(Q){const a=Array.prototype.slice.call(arguments),cy=Q.gy-Q.h-14;
          g.save();g.globalAlpha=.3*Math.max(.3,1-Q.h/120);g.fillStyle='#000';g.beginPath();g.ellipse(Q.gx,Q.gy+2,12*(1-Math.min(.5,Q.h/160)),4.2*(1-Math.min(.5,Q.h/160)),0,0,7);g.fill();g.restore();
          a[0]=Q.gx;a[1]=Q.gy-Q.h;a[9]=0;a[10]=Q.d;g.save();g.translate(Q.gx,cy);g.rotate(Q.rot);g.translate(-Q.gx,-cy);PGNT=1;MSHOFF=1;SKJBYP=1;CHSIT=Q.p>.82?1:0;try{_p.apply(this,a)}catch(e){}finally{PGNT=0;MSHOFF=0;SKJBYP=0;CHSIT=0;g.restore()}return}}
      if(J&&!down){const now=performance.now(),P=skJPos(J,now);if(P&&!J.land){const a=Array.prototype.slice.call(arguments),cy=P.gy-P.h-14,rot=J.sp*J.d*Math.min(1,P.p*1.15)*6.283;
          g.save();g.globalAlpha=.32*Math.max(.3,1-P.h/160);g.fillStyle='#000';g.beginPath();g.ellipse(P.gx,P.gy+2,13*(1-Math.min(.6,P.h/200)),4.5*(1-Math.min(.6,P.h/200)),0,0,7);g.fill();g.restore();
          a[0]=P.gx;a[1]=P.gy-P.h;a[9]=0;a[10]=J.d;g.save();g.translate(P.gx,cy);g.rotate(rot);g.translate(-P.gx,-cy);PGNT=1;MSHOFF=1;SKJBYP=1;try{_p.apply(this,a)}catch(e){}finally{PGNT=0;MSHOFF=0;SKJBYP=0;g.restore()}return}
        if(!P&&!J.land)return _p.apply(this,arguments); /* ช่วงฐานย่อ: ยังอยู่บนหอ */
        SKJBYP=1;try{return _p.apply(this,arguments)}finally{SKJBYP=0}}
      return _p.apply(this,arguments)}}catch(e){}
  /* ท่าฐานตอนโยน: ย่อลึก → ดีดยืดแขนชูขึ้น */
  try{const _d0=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const B=lk&&lk.u&&SKLB[lk.u],K=lk&&lk.u&&SKCB[lk.u],A=CHA;let set=0;
      if(B&&A&&!A.cast){const e=(performance.now()-B.t0)/1000;A.cast={ty:'stkL',p:e,idle:1,d:1};set=1}
      else if(K&&A&&!A.cast&&!(lk&&lk.ak>0)){const e=(performance.now()-K.t0)/1000;A.cast={ty:'stkC',p:e,idle:1,d:1};set=1}
      try{return _d0.apply(this,arguments)}finally{if(set&&A)A.cast=null}}}catch(e){}
  try{R24T.add('stkL');R24OFF.stkL=1;R24T.add('stkC');R24OFF.stkC=1}catch(e){}
  try{const _ib=idlBody;idlBody=function(C){if(C.ty==='stkC'){const k=Math.max(0,1-C.p/.4);g.scale(1+.06+.09*k,1-.1-.14*k*Math.cos(C.p*18));g.rotate(-.04);return}if(C.ty==='stkL'){const e=C.p;if(e<.25){const k=e/.25;g.scale(1+.1*k,1-.16*k)}else{const k=Math.max(0,1-(e-.25)/.35);g.scale(1-.06*k,1+.12*k)}return}return _ib.apply(this,arguments)}}catch(e){}
  try{const _ia=idlArm;idlArm=function(cls,C){if(C.ty==='stkC')return{dx:1,dy:-5,rot:-.4,ak:null,off:[11,-8],gl:null};if(C.ty==='stkL'){const e=C.p;return e<.25?{dx:2,dy:-4,rot:-.3,ak:null,off:[9,-6],gl:null}:{dx:0,dy:-13,rot:-1.35,ak:null,off:[3,-18],gl:null}}return _ia.apply(this,arguments)}}catch(e){}
  /* ดาวมึนเหนือหัว */
  try{const _p2=drawP;drawP=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const r=_p2.apply(this,arguments);try{if(SKF&&lk&&lk.u===uid&&!down){const t=performance.now()/1000;g.save();g.font='10px system-ui';g.textAlign='center';for(let i=0;i<3;i++){const a=t*5+i*2.09;g.fillText('⭐',x+Math.cos(a)*11,y-40+Math.sin(a)*3.5)}g.restore()}}catch(e){}return r}}catch(e){}
  setInterval(()=>{try{sklUI()}catch(e){}},150);
  /* v422 ปลดฉายาหอครบ 4 แบบ → ได้ชุดแฟชั่น «ชุดหอคอยมนุษย์» */
  setInterval(()=>{try{if(me.cls&&me.ach&&SKACH.every(k=>me.ach[k])&&!wdrOwn('tow'))wdrGive('tow','ปลดฉายาหอขี่คอครบ 4 แบบ')}catch(e){}},2000);
  setInterval(()=>{try{skwHost()}catch(e){}},500);
},820);
