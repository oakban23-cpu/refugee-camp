/* ---------- v406 โหมดคลั่ง (Fever) + ความมันตอนสู้ ----------
   โหมดคลั่ง: ฆ่ามอนและตีด้วยสกิลเติมเกจ · หยุดสู้นานเกจค่อย ๆ ลด
   เกจเต็ม → คลั่ง 9 วิ: ความเร็วโจมตี +35% · วิ่ง +15% · ดาเมจ +20% · คูลดาวน์เดินเร็วขึ้น 1.5 เท่า · ทอง +50% · EXP +30%
   ระหว่างคลั่ง ฆ่าแต่ละตัว +0.25 วิ (ต่อได้สูงสุด +5 วิ) · จบด้วย «ระเบิดปิดฉาก» รอบตัว แรงขึ้นตามจำนวนที่ฆ่าระหว่างคลั่ง
   (v406 จูน: มอนธรรมดา 8 · หัวหน้ามอน 18 · บอส 35 · สกิลโดนมอน +0.4 (สูงสุด 4/วิ) · สังหาร ×5 ขึ้นไป +8
    หยุดสู้เกิน 20 วิ เกจลด 1/วิ · หลังคลั่งจบ 20 วิ เกจขึ้นครึ่งเดียว)
   ความมันตอนสู้: ฆ่าหลายตัวในพริบตาขึ้นป้าย «สังหาร ×N» · มอนตายแตกเป็นเศษ · หลบสมบูรณ์ = ภาพช้าลงจริง 0.7 วิ (เล่นคนเดียว) + เติมเกจคลั่ง
   ปิดในลานประลอง PvP/ด่าน trial · เพื่อนในห้องเห็นออร่าคลั่งและระเบิดปิดฉาก */
const FV={g:0,on:0,last:0,kc:0,ext:0,mk:[],mkT:0,sh:0};
const FVC={melee:'255,90,60',archer:'120,255,170',mage:'255,140,50',assn:'200,110,255',sup:'255,215,110'};
const FVCK={melee:'melee',archer:'archer',mage:'mage',assn:'assn',sup:'holy'};
let SLOWU=0;
const fvCol=()=>FVC[me&&me.cls]||'255,200,120';
function fvOff(){try{return !me.cls||sgOff()}catch(e){return false}}
function fvAdd(v){if(fvOff()||FV.on>0||me.down>0)return;if(performance.now()<(FV.cool||0))v*=.5;FV.g=Math.min(100,FV.g+v);FV.last=performance.now();if(FV.g>=100)fvStart()}
function fvStart(){FV.on=9;FV.kc=0;FV.ext=0;FV.g=0;const c=fvCol();
  banner={s:'🔥 โหมดคลั่ง! โจมตีไว · คูลดาวน์ไว · ดาเมจ +20%',t:2.5};try{sfx('lg_get')}catch(e){}try{hitStop(120)}catch(e){}shk=Math.max(shk,.3);
  try{burst(me.x,me.y-20,['rgb('+c+')','#ffffff','#ffd84a'],28,220,.8,{glow:1,g:-60})}catch(e){}
  fx({k:'fvoff',u:uid});fx({k:'fvon',u:uid,dur:9,c});fx({k:'fvx',r:130,c,s:1});try{if(navigator.vibrate)navigator.vibrate([20,40,30])}catch(e){}fvHud()}
function fvEnd(){const c=fvCol(),P=1+Math.min(30,FV.kc)/30,R=220,ck=FVCK[me.cls]||'melee';FV.on=0;FV.cool=performance.now()+20000;
  if(me.down<=0&&!fvOff()){let n=0;mons.forEach(m=>{if(m.hp>0&&!m.inv&&!m.pv&&m.t!==4&&!m.dum&&Math.hypot(m.x-me.x,m.y-me.y)<R+(m.t===3?30:10)){addHit(m,pd()*3.5*P,0,3,ck);n++}});
    fx({k:'fvx',r:R,c});try{hitStop(150)}catch(e){}shk=Math.max(shk,.5);try{sfx('crit')}catch(e){}
    try{burst(me.x,me.y-10,['rgb('+c+')','#ffffff'],30,260,.7,{glow:1,flat:.5})}catch(e){}
    banner={s:'💥 ระเบิดปิดฉาก! สังหารระหว่างคลั่ง '+FV.kc+' ตัว'+(n?' · โดน '+n+' ตัว':''),t:2.5}}
  fx({k:'fvoff',u:uid});fvHud()}
/* ป้ายสังหารหลายตัว */
function fvCall(t,big){const e=$('fvcall');if(!e)return;e.textContent=t;e.className='';void e.offsetWidth;e.className=big?'on big':'on'}
function fvKill(x,y,t,bs){if(fvOff()||me.down>0||Math.hypot(me.x-x,me.y-y)>380)return;const n=performance.now();
  if(FV.on>0){FV.kc++;if(FV.ext<5){const a=Math.min(.25,5-FV.ext);FV.ext+=a;FV.on+=a}}else fvAdd(bs||t===3?35:t===2?18:8);
  FV.mk=FV.mk.filter(q=>n-q<450);FV.mk.push(n);FV.mkT=n}
function fvTick(dt){const n=performance.now();
  if(FV.mk.length&&n-FV.mkT>380){const k=FV.mk.length;FV.mk=[];if(k>=3){fvCall(k>=8?'💥 สังหารหมู่ ×'+k+'!':k>=5?'⚔️ สังหาร ×'+k+'!':'🗡️ สังหาร ×'+k,k>=5);try{if(k>=5)hitStop(70)}catch(e){}if(k>=5&&FV.on<=0)fvAdd(8)}}
  if(FV.on>0){FV.on-=dt;for(let k=0;k<6;k++)if(k!==2)me.sk[k]=(me.sk[k]||0)-dt*.5;if(FV.on<=0||me.down>0||fvOff())fvEnd()}
  else if(FV.g>0&&n-FV.last>20000)FV.g=Math.max(0,FV.g-dt);
  FV.sh-=dt;if(FV.sh<=0){FV.sh=.1;fvHud()}}
function fvHud(){const st=$('fvg');if(!st)return;const on=FV.on>0,sh=!fvOff()&&me.cls&&(on||FV.g>0);if(!sh){if(!st.hidden){st.hidden=true}}else{if(st.hidden)st.hidden=false;
    const p=on?Math.max(0,Math.min(1,FV.on/9)):FV.g/100,t=on?'🔥 คลั่ง '+Math.ceil(FV.on)+' วิ · ×'+FV.kc:'🔥 '+Math.floor(FV.g)+'%',k=(on?1:0)+'|'+Math.round(p*100)+'|'+t;
    if(st.dataset.k!==k){st.dataset.k=k;st.querySelector('i').style.width=(p*100).toFixed(1)+'%';st.querySelector('b').textContent=t;st.classList.toggle('on',on);st.style.setProperty('--fc',fvCol())}}
  const ov=$('fvov');if(ov){ov.classList.toggle('on',on);ov.style.setProperty('--fc',fvCol())}}
function fvMk(){if($('fvg'))return;const cv=document.getElementById('c'),P=cv&&cv.parentNode;if(!P)return;
  const css=document.createElement('style');css.textContent=
   '#fvg{position:absolute;right:10px;top:142px;width:122px;height:15px;border-radius:9px;background:rgba(20,10,8,.62);border:1px solid rgba(255,200,120,.55);overflow:hidden;z-index:3;pointer-events:none;box-shadow:0 0 6px rgba(0,0,0,.4)}'+
   '#fvg[hidden]{display:none}#fvg i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,rgba(255,120,40,.85),rgba(255,220,90,.95));transition:width .15s linear}'+
   '#fvg b{position:relative;display:block;text-align:center;font:700 10px/15px system-ui;color:#fff;text-shadow:0 1px 2px #000}'+
   '#fvg.on{border-color:#fff3c0;box-shadow:0 0 12px rgba(var(--fc),.9);animation:fvP .5s ease-in-out infinite alternate}#fvg.on i{background:linear-gradient(90deg,rgba(var(--fc),.95),#fff6d0)}'+
   '@keyframes fvP{from{transform:scale(1)}to{transform:scale(1.07)}}'+
   '#fvov{position:absolute;inset:0;pointer-events:none;z-index:2;opacity:0;transition:opacity .35s;box-shadow:inset 0 0 70px 18px rgba(var(--fc,255,120,60),.55);animation:fvO 1s ease-in-out infinite alternate}#fvov.on{opacity:1}'+
   '@keyframes fvO{from{box-shadow:inset 0 0 60px 14px rgba(var(--fc,255,120,60),.45)}to{box-shadow:inset 0 0 90px 26px rgba(var(--fc,255,120,60),.7)}}'+
   '#fvcall{position:absolute;left:0;right:0;top:30%;text-align:center;font:900 26px/1.1 system-ui;color:#fff;text-shadow:0 0 10px rgba(255,140,40,.9),0 2px 3px #000;pointer-events:none;z-index:4;opacity:0}'+
   '#fvcall.on{animation:fvC 1.1s ease-out forwards}#fvcall.big{font-size:34px;color:#fff3b0}'+
   '@keyframes fvC{0%{opacity:0;transform:scale(2.2)}12%{opacity:1;transform:scale(.92)}22%{transform:scale(1.05)}70%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1) translateY(-26px)}}';
  document.head.appendChild(css);
  const a=document.createElement('div');a.id='fvov';P.appendChild(a);
  const b=document.createElement('div');b.id='fvg';b.hidden=true;b.innerHTML='<i></i><b></b>';P.appendChild(b);
  const c=document.createElement('div');c.id='fvcall';P.appendChild(c)}
/* ออร่าคลั่ง (ทุกคนเห็น) */
FXB.fvon=(f,p,x,y,r,now)=>{const o=s6Own(f.u);if(!o)return;x=o.x;y=o.y;const D=+f.d||9,el=p*D,a=Math.min(1,el*4,(D-el)*3),c=f.c||'255,140,60';if(a<=.01)return;g.save();VX.lite();
  const pu=.75+.25*Math.sin(now*10);glowAt(x,y-18,40*pu,c,.38*a);glowAt(x,y+2,26,c,.3*a);
  g.save();g.translate(x,y+2);g.scale(1,.42);VX.ring(0,0,30+4*Math.sin(now*8),3,c,.75*a);g.restore();
  const n=LOWQ?5:10;for(let i=0;i<n;i++){const q=(now*1.3+i/n+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283,px=x+Math.cos(an)*(14+10*fxR(f,i,3))+Math.sin(now*4+i)*3,py=y-4-q*50;glowAt(px,py,(LOWQ?4:6)*(1-q)+2,c,.8*a*(1-q))}
  g.restore()};
FXB.fvx=(f,p,x,y,r,now)=>{const a=1-p,R=(r||200)*(f.s?.3+.7*Math.sqrt(p):.2+.8*Math.sqrt(p)),c=f.c||'255,140,60';g.save();VX.lite();
  glowAt(x,y-10,R*.5,c,.5*a*a);g.save();g.translate(x,y);g.scale(1,.45);VX.ring(0,0,R,10*a+2,c,.9*a);VX.ring(0,0,R*.82,3*a+1,'255,250,230',.8*a);g.restore();
  if(!LOWQ)for(let i=0;i<12;i++){const an=i*.5236+fxR(f,i,1)*.3,d=R*(.6+.4*fxR(f,i,2));VX.ln(x+Math.cos(an)*d*.55,y+Math.sin(an)*d*.25,x+Math.cos(an)*d,y+Math.sin(an)*d*.45,2.4*a,c,.8*a)}
  g.restore()};
setTimeout(()=>{
  try{Object.assign(FXD,{fvon:9,fvx:.8});R27D.fvon=1}catch(e){}
  try{fvMk()}catch(e){}
  /* ค่าสถานะระหว่างคลั่ง */
  try{const _M=M;window.M=M=function(q){const v=_M.apply(this,arguments);if(FV.on>0&&me&&me.cls){if(q==='as')return v+.35;if(q==='sp')return v+.15;if(q==='dm')return v+.2}return v}}catch(e){}
  try{const _f=fdM;fdM=function(k){const v=_f.apply(this,arguments);if(FV.on>0){if(k==='gd')return v+.5;if(k==='xp')return v+.3}return v}}catch(e){}
  try{const _u=updateMe;updateMe=function(dt){const r=_u.apply(this,arguments);try{fvTick(dt)}catch(e){}return r}}catch(e){}
  try{const _q=qKill;qKill=function(x,y,t,bs){const r=_q.apply(this,arguments);try{fvKill(x,y,t,bs)}catch(e){}return r}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(o&&o.k==='fvoff'){try{fxs=fxs.filter(f=>!(f.k==='fvon'&&f.u===o.u))}catch(e){}return}return _hf.apply(this,arguments)}}catch(e){}
  /* หลบสมบูรณ์: ภาพช้าลงจริง (เล่นคนเดียว หรือไม่ได้เป็นโฮสต์มอน) + เติมเกจคลั่ง */
  try{const _pd=perfectDodge;perfectDodge=function(){const was=me.dgP;const r=_pd.apply(this,arguments);try{if(!was&&me.dgP){let solo=true;try{solo=!Object.keys(others).length||!isHost()}catch(e){}if(solo)SLOWU=performance.now()+700;FV.on>0||fvAdd(25)}}catch(e){}return r}}catch(e){}
},500);
/* มอนตายแตกเป็นเศษ (คาดการณ์จากดาเมจที่เราตี) · ติดตั้งชั้นนอกสุด */
setTimeout(()=>{try{const _ah=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){const alive=m&&m.hp>0&&!m.pv&&!m.inv&&!m.dum,hp0=m&&m.hp;const r=_ah.apply(this,arguments);
  try{if(alive&&d>0&&lv&&FV.on<=0){const n=performance.now();if(n-(FV.hw||0)>1000){FV.hw=n;FV.hn=0}if(FV.hn<4){FV.hn+=.4;fvAdd(.4)}}}catch(e){}
  try{if(alive&&d>0&&hp0-d<=0&&m.t!==4){const T=MT[m.t]||{},c=T.c||'#c8b8a8',big=cr||m.t===2||d>(m.mh||1)*.6,n=big?16:9;
    burst(m.x,m.y-12,[c,'#ffffff',c,'#3a2a2a'],n,big?190:130,big?.75:.55,{g:420,up:big?160:110,r:big?2.6:2});if(big)burst(m.x,m.y-8,['#fff0c0'],6,90,.35,{glow:1,g:0})}}catch(e){}return r}}catch(e){}},700);
