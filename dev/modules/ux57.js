
/* ===== v440 · เตาหลอมโฉมใหม่: ตีบวกสนุกขึ้น =====
   ① จังหวะค้อน: เข็มวิ่งบนแถบ แตะตอนเข้าโซน → «เป๊ะ!» โอกาส ×1.2 · «ดี» ×1.1
   ② ไฟเตา (กันดวงซวย): พลาดแล้วไฟเตาของขั้นนั้นแรงขึ้น บวกโอกาสครั้งถัดไป · สำเร็จแล้วรีเซ็ต
   ③ ตีบวกสุดยอด: สำเร็จแล้วมีโอกาส 6% ขึ้น +2 (+5 ถึง +17 · ไม่ข้ามด่าน +10/+20)
   ④ ฉากตี: ค้อน 3 จังหวะ ประกายไฟ ลุ้น แล้วเฉลย (สำเร็จ/สุดยอด/พลาด/ลดขั้น/แตก)
   ⑤ ประกาศทั้งเซิร์ฟ: +15 ขึ้นไป · สุดยอดตั้งแต่ +12 · ของแตกตั้งแต่ +20
   ⑥ สถิติช่างตีบวก + โหมดตีด่วน (ข้ามฉาก ไม่มีโบนัสจังหวะ) */
const FG={quick:0,busy:0,ph:'',p:0,v:1,dir:1,c:.5,gw:.2,pw:.06,lt:0,tb:0,res:null,t0:0,raf:0,auto:0,sel:null};
const FGH={a:[.03,.15],b:[.02,.2],c:[.01,.1]},FGNM={a:'+6~+10',b:'+11~+20',c:'+21~+30'};
const fgTier=u=>u<5?'':u<10?'a':u<20?'b':'c';
function fgSt(){let F=me.fg;if(!F||typeof F!=='object')F=me.fg={};if(!F.h||typeof F.h!=='object')F.h={a:0,b:0,c:0};if(!F.st||typeof F.st!=='object')F.st={n:0,ok:0,best:0,br:0,pf:0,gs:0,run:0,brun:0};return F}
function fgClean(x){if(!x||typeof x!=='object')return undefined;const n=(v,a,b)=>Number.isFinite(+v)?Math.max(a,Math.min(b,Math.floor(+v))):0,h=x.h||{},s=x.st||{};
  return{h:{a:n(h.a,0,5),b:n(h.b,0,10),c:n(h.c,0,10)},st:{n:n(s.n,0,1e7),ok:n(s.ok,0,1e7),best:n(s.best,0,UMAX),br:n(s.br,0,1e6),pf:n(s.pf,0,1e7),gs:n(s.gs,0,1e6),run:n(s.run,0,1e4),brun:n(s.brun,0,1e4)},q:x.q?1:0}}
function fgHeat(u){const t=fgTier(u);if(!t)return 0;const F=fgSt();return Math.min(FGH[t][1],(F.h[t]|0)*FGH[t][0])}
function fgRate(u,tb){if(u<5)return 1;return Math.min(.95,upRate(u)*(1+(tb||0))+fgHeat(u))}
function fgGreatOk(u){return u>=5&&u<=17&&(u<10?u+2<=10:u+2<=20)}
/* บันทึก/โหลด (เซฟเป็น whitelist จึงต้องเพิ่มเอง) */
try{snap=(f=>function(){const o=f.apply(this,arguments);try{if(me.fg)o.fg=fgClean(me.fg)}catch(e){}return o})(snap)}catch(e){}
try{cleanChar=(f=>function(c){const o=f.apply(this,arguments);try{if(o&&c&&c.fg)o.fg=fgClean(c.fg)}catch(e){}return o})(cleanChar)}catch(e){}
try{applySave=(f=>function(c){const r=f.apply(this,arguments);try{me.fg=fgClean(c&&c.fg)||{};FG.quick=me.fg.q?1:0}catch(e){}return r})(applySave)}catch(e){}
function fgShout(t){try{addChat('🔨 เตาหลอม',t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}catch(e){}}
/* ---------- ตีจริง (ตรรกะเดิม + ไฟเตา/จังหวะ/สุดยอด) ---------- */
function fgDo(tb){const it=smGet(smSel);if(!it)return null;const u=it.u|0,el=upElig(it);if(el)return{k:'err',m:el};const need=upNeed(u),cost=upCost(it);
  if(me.gold<cost)return{k:'err',m:'ทองไม่พอ'};if(need&&(me.inv['s'+need]|0)<1)return{k:'err',m:GDM['s'+need].n+' ไม่พอ'};
  me.gold-=cost;if(need)me.inv['s'+need]--;const nm=itemName(it),F=fgSt(),t=fgTier(u),rate=fgRate(u,tb);F.st.n++;let R;
  if(Math.random()<rate){let up=1;if(fgGreatOk(u)&&Math.random()<.06)up=2;it.u=u+up;if(t)F.h[t]=0;F.st.ok++;F.st.run++;F.st.brun=Math.max(F.st.brun,F.st.run);F.st.best=Math.max(F.st.best,it.u);if(up>1)F.st.gs++;if(it.u>=10)me.stt.up10=1;
    R={k:up>1?'great':'ok',u0:u,u1:it.u,nm:itemName(it),r:it.r};
    if(it.u>=15||(up>1&&it.u>=12))fgShout('🔥 '+myName+' ตีบวก «'+itemName(it)+'» สำเร็จ'+(up>1?' แบบสุดยอด (+2)':'')+'!')}
  else{F.st.run=0;if(t)F.h[t]=Math.min(t==='a'?5:10,(F.h[t]|0)+1);
    if(u<10)R={k:'fail',u0:u,u1:u,nm};
    else if(smProt&&(me.inv.ps|0)>0){me.inv.ps--;R={k:'prot',u0:u,u1:u,nm}}
    else if(u>=20&&Math.random()<.25){const [w,x]=smSel.split(':');if(w==='eq')me.eq[x]=null;else me.bag.splice(+x,1);smSel=null;F.st.br++;R={k:'break',u0:u,u1:0,nm};fgShout('💥 '+myName+' ตีบวก «'+nm+'» ไม่สำเร็จ… ไอเทมแตกสลาย 🕯️')}
    else{it.u=u-1;R={k:'down',u0:u,u1:it.u,nm}}}
  R.rate=rate;R.tb=tb;R.heat=t?fgHeat(u):0;try{recalc()}catch(e){}try{writeSave()}catch(e){}return R}
/* ---------- หน้าต่างเตาหลอม ---------- */
function fgCSS(){if($('fgcss'))return;const st=document.createElement('style');st.id='fgcss';st.textContent=
 '#fgx{position:fixed;inset:0;z-index:80;background:rgba(6,4,2,.72);display:flex;align-items:center;justify-content:center;padding:12px}'+
 '#fgx .fgb{width:min(360px,96vw);background:linear-gradient(180deg,#2a1a10,#120a06);border:1.5px solid #c98a3a;border-radius:16px;box-shadow:0 0 0 2px #1a0e06,0 0 30px rgba(255,140,40,.25),0 10px 30px rgba(0,0,0,.7);padding:12px;color:#ffe9c8;font-family:system-ui;text-align:center}'+
 '#fgx .fgt{font-weight:800;font-size:15px;color:#ffd58a}#fgx .fgt small{display:block;font-weight:500;color:#e8c8a0;font-size:12px;margin-top:2px}'+
 '#fgx .fgs{position:relative;height:190px;margin:8px 0;border-radius:12px;overflow:hidden;background:radial-gradient(ellipse at 50% 85%,#5a2a0e 0,#2a140a 45%,#0e0704 100%)}'+
 '#fgx canvas{position:absolute;inset:0;width:100%;height:100%;background:transparent!important;border:0!important;box-shadow:none!important}'+
 '#fgx .fgi{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);transition:transform .25s,filter .3s,opacity .4s}#fgx .fgi .cell{pointer-events:none;width:56px;height:56px}'+
 '#fgx .fgi.hit{animation:fgHit .18s}@keyframes fgHit{0%{transform:translate(-50%,-50%) scale(1)}40%{transform:translate(-50%,-46%) scale(.92,1.06)}100%{transform:translate(-50%,-50%) scale(1)}}'+
 '#fgx .fgi.glow{animation:fgGlow .5s infinite alternate}@keyframes fgGlow{from{filter:drop-shadow(0 0 4px #ffb040)}to{filter:drop-shadow(0 0 18px #ffe0a0) brightness(1.25)}}'+
 '#fgx .fgi.ok{transform:translate(-50%,-62%) scale(1.25);filter:drop-shadow(0 0 22px #ffe08a) brightness(1.3)}#fgx .fgi.great{transform:translate(-50%,-64%) scale(1.4);filter:drop-shadow(0 0 30px #ff9af0) brightness(1.45)}'+
 '#fgx .fgi.bad{filter:grayscale(.8) brightness(.7)}#fgx .fgi.brk{opacity:0;transform:translate(-50%,-40%) scale(.4) rotate(25deg)}'+
 '#fgx .fgn{position:absolute;left:0;right:0;top:12px;font:900 26px system-ui;color:#fff3c8;text-shadow:0 2px 0 #3a1a00,0 0 14px rgba(255,180,60,.8);opacity:0;transition:opacity .3s,transform .4s;transform:scale(.6)}#fgx .fgn.on{opacity:1;transform:scale(1)}'+
 '#fgx .fgr{font-size:12.5px;line-height:1.55;color:#f0dcc0;min-height:20px}#fgx .fgr b{color:#ffd58a}'+
 '#fgx .fgbar{position:relative;height:22px;margin:8px 2px 4px;border-radius:11px;background:linear-gradient(90deg,#3a1a10,#5a2a12,#3a1a10);border:1px solid #8a5a2a;overflow:hidden}'+
 '#fgx .fgbar i{position:absolute;top:0;bottom:0}#fgx .fgbar .gz{background:rgba(255,200,90,.35)}#fgx .fgbar .pz{background:linear-gradient(90deg,#ffe9a0,#ffb040);box-shadow:0 0 8px #ffd060}'+
 '#fgx .fgbar b{position:absolute;top:-3px;bottom:-3px;width:4px;margin-left:-2px;background:#fff;border-radius:2px;box-shadow:0 0 6px #fff}'+
 '#fgx .fgh{font-size:11.5px;color:#d8b890;margin-bottom:6px}'+
 '#fgx button{font:700 14px system-ui;border-radius:10px;padding:10px 14px;border:1.5px solid #e0a040;background:linear-gradient(180deg,#ffcf6a,#d8862a);color:#2a1406;cursor:pointer}'+
 '#fgx button.sec{background:#2a1a10;color:#ffe0b0;border-color:#8a5a2a}#fgx .fgk{width:100%;font-size:17px;padding:12px}#fgx .fgbt{display:flex;gap:8px;justify-content:center;margin-top:8px}';
 document.head.appendChild(st)}
function fgOpen(){const it=smGet(smSel);if(!it||FG.busy)return;fgCSS();const u=it.u|0,t=fgTier(u)||'a';
  let d=$('fgx');if(!d){d=document.createElement('div');d.id='fgx';document.body.appendChild(d);d.addEventListener('click',e=>{const b=e.target.closest('[data-fga]');if(b){e.stopPropagation();fgAct(b.dataset.fga)}else if(FG.ph==='aim'&&e.target.closest('.fgbar,.fgs'))fgHitNow()})}
  FG.ph='aim';FG.res=null;FG.sel=smSel;FG.p=Math.random();FG.dir=1;FG.v={a:.85,b:1.15,c:1.45}[t];FG.gw={a:.26,b:.21,c:.17}[t];FG.pw={a:.075,b:.06,c:.05}[t];FG.c=.22+Math.random()*.56;FG.lt=performance.now();FG.t0=performance.now();
  const base=upRate(u),heat=fgHeat(u);
  d.innerHTML='<div class="fgb"><div class="fgt">🔨 เตาหลอม · ตีบวก +'+u+' ➜ +'+(u+1)+'<small>'+itemName(it)+'</small></div>'+
   '<div class="fgs"><canvas width="360" height="190"></canvas><div class="fgi">'+cellH(it,'disabled',0,it.sl)+'</div><div class="fgn"></div></div>'+
   '<div class="fgr">โอกาสพื้นฐาน <b>'+Math.round(base*100)+'%</b>'+(heat>0?' · 🔥 ไฟเตา <b>+'+Math.round(heat*100)+'%</b>':'')+'<br>แตะ «ตี!» ตอนเข็มอยู่ในโซนทอง: <b>เป๊ะ ×1.2</b> · <b>ดี ×1.1</b></div>'+
   '<div class="fgbar"><i class="gz"></i><i class="pz"></i><b></b></div><div class="fgh">⏱ ไม่แตะใน 8 วิ ค้อนจะตีเอง (ไม่มีโบนัส)</div>'+
   '<button class="fgk" data-fga="hit">🔨 ตี!</button><div class="fgbt"><button class="sec" data-fga="close">ยกเลิก</button></div></div>';
  const gz=d.querySelector('.gz'),pz=d.querySelector('.pz');gz.style.left=((FG.c-FG.gw/2)*100)+'%';gz.style.width=(FG.gw*100)+'%';pz.style.left=((FG.c-FG.pw/2)*100)+'%';pz.style.width=(FG.pw*100)+'%';
  d.hidden=false;try{sfx('click')}catch(e){}cancelAnimationFrame(FG.raf);FG.raf=requestAnimationFrame(fgLoop)}
function fgLoop(){const d=$('fgx');if(!d||d.hidden){FG.raf=0;return}const now=performance.now(),dt=Math.min(.05,(now-FG.lt)/1000);FG.lt=now;
  if(FG.ph==='aim'){FG.p+=FG.dir*FG.v*dt;if(FG.p>1){FG.p=1;FG.dir=-1}if(FG.p<0){FG.p=0;FG.dir=1}const b=d.querySelector('.fgbar b');if(b)b.style.left=(FG.p*100)+'%';if(now-FG.t0>8000)fgHitNow(1)}
  fgDraw(now);FG.raf=requestAnimationFrame(fgLoop)}
function fgHitNow(auto){if(FG.ph!=='aim')return;const off=Math.abs(FG.p-FG.c);let tb=0,lab='พลาดจังหวะ';if(!auto){if(off<=FG.pw/2){tb=.2;lab='เป๊ะ!';fgSt().st.pf++}else if(off<=FG.gw/2){tb=.1;lab='ดี'}}else lab='ค้อนตีเอง';
  FG.tb=tb;FG.lab=lab;FG.ph='strike';FG.t0=performance.now();FG.hits=0;const d=$('fgx');const k=d.querySelector('.fgk');if(k){k.disabled=true;k.textContent=tb>=.2?'✨ เป๊ะ! โอกาส ×1.2':tb?'👍 ดี! โอกาส ×1.1':'🔨 '+lab}
  const c=d.querySelector('.fgbt');if(c)c.innerHTML='';try{sfx(tb>=.2?'combo2':tb?'combo':'click')}catch(e){}
  FG.res=fgDo(tb);if(!FG.res||FG.res.k==='err'){fgClose();smithUI(FG.res?FG.res.m:'');return}}
/* ฉาก: ตีค้อน 3 จังหวะ (0.25 / 0.65 / 1.05 วิ) → ลุ้น → เฉลยที่ 2.0 วิ */
const FGP=[];
function fgDraw(now){const d=$('fgx');if(!d)return;const cv=d.querySelector('canvas');if(!cv)return;const c=cv.getContext('2d'),W=360,H=190,T=now/1000;c.clearRect(0,0,W,H);
  /* ทั่ง */c.fillStyle='#1a120c';c.beginPath();c.moveTo(118,150);c.lineTo(242,150);c.lineTo(228,128);c.lineTo(132,128);c.closePath();c.fill();c.fillRect(160,150,40,26);c.fillRect(140,172,80,10);
  c.fillStyle='#3a2a20';c.fillRect(132,124,96,6);
  /* ถ่านลอย */for(let i=0;i<18;i++){const x=(i*53.7+T*12*(1+i%3))%W,y=H-((T*(18+i%5*7)+i*37)%H),a=.3+.3*Math.sin(T*3+i);c.fillStyle='rgba(255,'+(140+i%4*20)+',60,'+a+')';c.fillRect(x,y,2,2)}
  const s=FG.ph==='strike'||FG.ph==='res'?(now-FG.t0)/1000:0;
  if(FG.ph==='strike'){const hits=[.25,.65,1.05];let ang=-1.1;for(let i=0;i<3;i++){const h=hits[i],q=s-(h-.18);if(q>=0&&q<.18)ang=-1.1+1.25*(q/.18);else if(q>=.18&&q<.32)ang=.15-1.25*((q-.18)/.14)}
      if(s>hits[FG.hits]&&FG.hits<3){FG.hits++;try{sfx('hit')}catch(e){}const it=d.querySelector('.fgi');if(it){it.classList.remove('hit');void it.offsetWidth;it.classList.add('hit')}for(let k=0;k<16;k++){const a=-Math.PI*(.1+Math.random()*.8);FGP.push({x:180,y:118,vx:Math.cos(a)*(60+Math.random()*160),vy:Math.sin(a)*(60+Math.random()*160),l:.5+Math.random()*.4,c:'255,'+(170+Math.random()*80|0)+',80'})}}
      if(s<1.3){c.save();c.translate(250,60);c.rotate(ang);c.fillStyle='#6a4a2a';c.fillRect(-4,-4,8,70);c.fillStyle='#8a8a90';c.fillRect(-20,-14,40,20);c.fillStyle='#b0b0b8';c.fillRect(-20,-14,40,5);c.restore()}
      if(s>1.15&&s<2.0){const it=d.querySelector('.fgi');if(it&&!it.classList.contains('glow'))it.classList.add('glow');if(!FG.hb){FG.hb=1;try{sfx('rdy')}catch(e){}}}
      if(s>=2.0)fgReveal()}
  if(FG.ph==='res'&&FG.res){const k=FG.res.k,q=Math.min(1,s/.9);
    if(k==='ok'||k==='great'){const col=k==='great'?'255,140,240':'255,214,120';c.save();c.globalCompositeOperation='lighter';for(let i=0;i<14;i++){const a=i/14*6.28+T*.6;c.strokeStyle='rgba('+col+','+(.35*(1-q*.5))+')';c.lineWidth=3;c.beginPath();c.moveTo(180,84);c.lineTo(180+Math.cos(a)*200*q,84+Math.sin(a)*200*q);c.stroke()}c.restore()}
    if(k==='break'){c.strokeStyle='rgba(255,90,70,'+(1-q)+')';c.lineWidth=2;for(let i=0;i<8;i++){const a=i*.8;c.beginPath();c.moveTo(180,84);c.lineTo(180+Math.cos(a)*90*q,84+Math.sin(a)*90*q);c.stroke()}}
    if(k==='fail'||k==='down'||k==='prot'){c.strokeStyle='rgba(30,20,20,'+(.8*(1-q*.4))+')';c.lineWidth=2;c.beginPath();c.moveTo(168,64);c.lineTo(178,82);c.lineTo(170,92);c.lineTo(186,106);c.stroke()}}
  for(let i=FGP.length-1;i>=0;i--){const p=FGP[i];p.l-=1/60;if(p.l<=0){FGP.splice(i,1);continue}p.x+=p.vx/60;p.y+=p.vy/60;p.vy+=260/60;c.fillStyle='rgba('+p.c+','+Math.min(1,p.l*2)+')';c.fillRect(p.x,p.y,2.5,2.5)}}
function fgReveal(){const d=$('fgx');if(!d||FG.ph!=='strike')return;FG.ph='res';FG.t0=performance.now();FG.hb=0;const R=FG.res,it=d.querySelector('.fgi'),n=d.querySelector('.fgn'),r=d.querySelector('.fgr');if(it)it.classList.remove('glow');
  const K=R.k;let big='',txt='',snd='fail';
  if(K==='great'){big='✨ สุดยอด! +'+R.u1;txt='ตีบวกสุดยอด! กระโดดสองขั้น <b>+'+R.u0+' ➜ +'+R.u1+'</b>';snd='lvl';it&&it.classList.add('great');for(let k=0;k<40;k++){const a=Math.random()*6.28;FGP.push({x:180,y:84,vx:Math.cos(a)*200,vy:Math.sin(a)*200-60,l:.9,c:'255,160,240'})}}
  else if(K==='ok'){big='สำเร็จ! +'+R.u1;txt='<b>'+R.nm+'</b>';snd='up';it&&it.classList.add('ok');for(let k=0;k<26;k++){const a=Math.random()*6.28;FGP.push({x:180,y:84,vx:Math.cos(a)*150,vy:Math.sin(a)*150-50,l:.8,c:'255,220,120'})}}
  else if(K==='fail'){big='พลาด…';txt='ยังเป็น +'+R.u0+' (เสียทองและวัตถุดิบ) · 🔥 ไฟเตาแรงขึ้น';it&&it.classList.add('bad')}
  else if(K==='prot'){big='พลาด… แต่รอด';txt='🛡️ หินกันแตกช่วยไว้ ยังเป็น +'+R.u0+' (เหลือ '+(me.inv.ps|0)+') · 🔥 ไฟเตาแรงขึ้น';it&&it.classList.add('bad')}
  else if(K==='down'){big='🔻 +'+R.u1;txt='ล้มเหลว ระดับลดลง +'+R.u0+' ➜ +'+R.u1+' · 🔥 ไฟเตาแรงขึ้น';it&&it.classList.add('bad')}
  else if(K==='break'){big='💥 แตก!';txt='<b>'+R.nm+'</b> แตกสลายไปแล้ว…';snd='shatter';it&&it.classList.add('brk');for(let k=0;k<30;k++){const a=Math.random()*6.28;FGP.push({x:180,y:84,vx:Math.cos(a)*170,vy:Math.sin(a)*170,l:.9,c:'200,190,210'})}try{shk=Math.max(shk,.3)}catch(e){}}
  try{const ni=smGet(FG.sel);if(it&&ni&&K!=='break')setTimeout(()=>{try{const cls=it.className;it.innerHTML=cellH(ni,'disabled',0,ni.sl);it.className=cls}catch(e){}},350)}catch(e){}
  if(n){n.textContent=big;n.style.color=K==='great'?'#ffc8f8':K==='ok'?'#fff3c8':K==='break'||K==='down'?'#ff9a8a':'#e8d0b0';n.classList.add('on')}
  const heat=FG.res&&R.u1!==undefined?fgHeat(K==='break'?R.u0:(K==='ok'||K==='great'?R.u1:R.u0)):0;
  if(r)r.innerHTML=txt+'<br><small>จังหวะ: '+FG.lab+' · โอกาสครั้งนี้ '+Math.round(R.rate*100)+'%'+(heat>0&&K!=='ok'&&K!=='great'?' · ไฟเตาตอนนี้ +'+Math.round(heat*100)+'%':'')+'</small>';
  try{sfx(snd)}catch(e){}
  if(K==='ok'||K==='great'){try{burst(me.x,me.y-10,K==='great'?['#ffc8f8','#ffffff','#ff9af0']:['#ffe08a','#ffffff'],R.u1>=11?28:12,120,.7,{glow:1,g:-30})}catch(e){}}
  const bar=d.querySelector('.fgbar'),hh=d.querySelector('.fgh'),k=d.querySelector('.fgk');if(bar)bar.style.visibility='hidden';if(hh)hh.textContent='';if(k)k.remove();
  const still=K!=='break'&&smGet(FG.sel),can=still&&!upElig(still);
  d.querySelector('.fgbt').innerHTML=(can?'<button data-fga="again">🔨 ตีต่อ +'+((still.u|0)+1)+'</button>':'')+'<button class="sec" data-fga="close">ปิด</button>'}
function fgAct(a){if(a==='hit')return fgHitNow();if(a==='again'){if(FG.ph!=='res')return;const it=smGet(FG.sel);if(!it)return fgClose();smSel=FG.sel;const u=it.u|0,el=upElig(it),need=upNeed(u);
    if(el||me.gold<upCost(it)||(need&&(me.inv['s'+need]|0)<1)){fgClose();smithUI(el||(me.gold<upCost(it)?'ทองไม่พอ':GDM['s'+need].n+' ไม่พอ'));return}if(u<5||FG.quick){fgClose();fgQuick();return}FG.busy=0;fgOpen();return}
  if(a==='close'){if(FG.ph==='strike'){fgReveal()}fgClose()}}
function fgClose(){const d=$('fgx');if(d)d.hidden=true;cancelAnimationFrame(FG.raf);FG.raf=0;FG.ph='';FG.busy=0;FGP.length=0;const R=FG.res;FG.res=null;if(!ov.hidden&&ov.dataset.k==='smith')smithUI(R?fgMsg(R):'')}
function fgMsg(R){if(!R)return'';return R.k==='great'?'<span style="color:#c040b0">✨ ตีบวกสุดยอด! +'+R.u0+' ➜ +'+R.u1+'</span>':R.k==='ok'?'<span style="color:#2a9a4a">✨ ตีบวกสำเร็จ! '+R.nm+'</span>':R.k==='fail'?'<span style="color:#c86a10">ล้มเหลว · ยังเป็น +'+R.u0+' · 🔥 ไฟเตาแรงขึ้น</span>':R.k==='prot'?'<span style="color:#c86a10">ล้มเหลว แต่หินกันแตกช่วยไว้ · ยังเป็น +'+R.u0+'</span>':R.k==='down'?'<span style="color:#d0302a">🔻 ล้มเหลว · ระดับลดลงเป็น +'+R.u1+'</span>':R.k==='break'?'<span style="color:#d0302a">💥 ล้มเหลว · '+R.nm+' แตกหายไปแล้ว!</span>':R.m||''}
/* ตีด่วน: ไม่มีฉาก ไม่มีโบนัสจังหวะ (ไฟเตา/สุดยอดยังทำงาน) */
function fgQuick(){const R=fgDo(0);if(!R)return;if(R.k==='ok'||R.k==='great'){try{sfx(R.k==='great'?'lvl':'up')}catch(e){}try{burst(me.x,me.y-10,['#ffe08a','#ffffff'],R.u1>=11?24:10,110,.6,{glow:1,g:-30})}catch(e){}}else try{sfx(R.k==='break'?'shatter':'fail')}catch(e){}smithUI(fgMsg(R))}
smithUp=function(){const it=smGet(smSel);if(!it)return;const u=it.u|0,el=upElig(it);if(el)return smithUI(el);const need=upNeed(u),cost=upCost(it);
  if(me.gold<cost)return smithUI('ทองไม่พอ');if(need&&(me.inv['s'+need]|0)<1)return smithUI(GDM['s'+need].n+' ไม่พอ');
  if(u<5||FG.quick)return fgQuick();fgOpen()};
/* ---------- การ์ดเตาหลอมในหน้าช่างตีบวก ---------- */
try{smithUI=(f=>function(msg){const r=f.apply(this,arguments);try{if(ov.dataset.k!=='smith')return r;const pn=ov.querySelector('[data-pn="smith"]');if(!pn)return r;const F=fgSt(),S=F.st;
  const bar=t=>{const v=Math.min(FGH[t][1],(F.h[t]|0)*FGH[t][0]),p=v/FGH[t][1];return'<div style="display:flex;align-items:center;gap:6px;font-size:12px;margin:2px 0"><span style="min-width:62px">'+FGNM[t]+'</span><span style="flex:1;height:8px;border-radius:4px;background:#e8dcc4;overflow:hidden"><i style="display:block;height:100%;width:'+Math.round(p*100)+'%;background:linear-gradient(90deg,#ffb040,#ff5a20)"></i></span><b style="min-width:40px;text-align:right">'+(v>0?'+'+Math.round(v*100)+'%':'—')+'</b></div>'};
  const it=smGet(smSel),u=it?it.u|0:0;
  let h='<div class="card"><div class="cap">🔥 เตาหลอม</div>'+(it&&u>=5&&!upElig(it)?'<div style="font-size:12.5px;margin-bottom:4px">โอกาสจริงครั้งนี้: <b>'+Math.round(fgRate(u,0)*100)+'%</b> · จังหวะดี <b>'+Math.round(fgRate(u,.1)*100)+'%</b> · เป๊ะ <b>'+Math.round(fgRate(u,.2)*100)+'%</b>'+(fgGreatOk(u)?'<br>✨ สำเร็จแล้วมีโอกาส 6% ขึ้นสองขั้น (+'+(u+2)+')':'')+'</div>':'')+
   '<small style="display:block;margin-bottom:2px">ไฟเตา: พลาดแล้วไฟแรงขึ้น บวกโอกาสครั้งต่อไปของขั้นนั้น · สำเร็จแล้วไฟดับ</small>'+bar('a')+bar('b')+bar('c')+
   '<div class="sr" style="margin-top:6px"><div class="nm"><b>⚡ ตีด่วน</b><small>ข้ามฉากตีค้อน · ไม่มีโบนัสจังหวะ</small></div><button class="rb'+(FG.quick?' pri':'')+'" data-fgq="1">'+(FG.quick?'✅ เปิด':'⬜ ปิด')+'</button></div>'+
   '<div style="font-size:12px;opacity:.85;margin-top:4px;line-height:1.6">📊 ตีไปแล้ว '+S.n+' ครั้ง · สำเร็จ '+S.ok+(S.n?' ('+Math.round(S.ok/S.n*100)+'%)':'')+' · สูงสุด +'+S.best+' · เป๊ะ '+S.pf+' · สุดยอด '+S.gs+' · ติดกันสูงสุด '+S.brun+' · แตก '+S.br+'</div></div>';
  const cards=pn.querySelectorAll('.card');const a=cards[0];if(a)a.insertAdjacentHTML('afterend',h);
  const q=pn.querySelector('[data-fgq]');if(q)q.onclick=e=>{e.stopPropagation();FG.quick=FG.quick?0:1;try{fgSt().q=FG.quick;writeSave()}catch(_){}smithUI()};
  const btn=pn.querySelector('[data-smu]');if(btn&&it&&u>=5&&!FG.quick)btn.innerHTML='🔨 เข้าเตาหลอม +'+(u+1)}catch(e){}return r})(smithUI)}catch(e){}
