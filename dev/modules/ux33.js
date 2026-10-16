/* ---------- v408 ตัวละครมีน้ำหนัก · อาวุธตีบวกมีประกาย · ห้องดูตัวละคร · เงาพื้น · ท่ายืนรอ ----------
   1 น้ำหนัก: ตัวโน้มไปข้างหน้าแล้วเด้งกลับตอนหยุดวิ่ง (ใช้สปริงเดียวกับผ้าคลุม) · ฝุ่นที่เท้าทุกก้าวตอนวิ่ง
   2 อาวุธตีบวก +4 ถึง +9 มีแสงวิ่งไล่ตามคมอาวุธ (+10 ขึ้นไปมีออร่าเดิมอยู่แล้ว)
   3 ห้องดูตัวละคร: ภาพใหญ่ในหน้าอุปกรณ์ ลากเพื่อหมุนตัว · ปุ่มท่า ยืน/วิ่ง/โจมตี/สกิล · แตะของในกระเป๋า = ลองใส่ดูก่อน
   4 เงาพื้นหดและจางเมื่อตัวลอยขึ้น (ก้าวเดิน กระโดด ท่าสกิล) + เงาเข้มตรงจุดที่เท้าแตะพื้น
     ท่ายืนรอ: ยืนนิ่ง 6 วิขึ้นไป ตัวละครจะทำท่าเล่นเองทุก ~9 วิ (2 ท่าต่ออาชีพ) คำนวณบนเครื่องผู้ดูเอง ไม่ต้องส่งผ่านเน็ต */
let CHW={r:0,sx:0,sy:0},SHL=null;const CHDUST={},CHIDL={};
const c33=(x,a,b)=>Math.max(0,Math.min(1,(x-a)/(b-a))),eo33=x=>1-(1-x)*(1-x),io33=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,bm33=(p,a,b)=>p<a||p>b?0:Math.sin((p-a)/(b-a)*Math.PI);
const env33=(p,a,b)=>Math.min(1,eo33(c33(p,0,a)),eo33(c33(1-p,0,b)));
const IDLT={melee:['idlMa','idlMb'],archer:['idlAa','idlAb'],mage:['idlGa','idlGb'],sup:['idlSa','idlSb'],assn:['idlNa','idlNb'],guard:['idlMa','idlMa']};
const IDLD=1.9;
/* ----- ท่ายืนรอ: ท่าทั้งตัว (พิกัดเท้า) ----- */
function idlBody(C){const p=C.p,ty=C.ty,e=env33(p,.22,.22);
  if(ty==='idlMa'){g.rotate(-.05*e);g.scale(1+.02*e,1-.025*e)}
  else if(ty==='idlMb'){const s=bm33(p,.15,.85);g.translate(1.2*s,0);g.rotate(.04*s)}
  else if(ty==='idlAa'){g.rotate(-.04*e);g.scale(1+.02*e,1-.02*e)}
  else if(ty==='idlAb'){g.translate(0,-1.2*e);g.scale(1-.03*e,1+.07*e)}
  else if(ty==='idlGa'){g.rotate(.03*e)}
  else if(ty==='idlGb'){g.translate(0,-4.5*e+Math.sin(p*Math.PI*4)*.8*e)}
  else if(ty==='idlSa'){g.rotate(.08*e);g.scale(1+.03*e,1-.07*e)}
  else if(ty==='idlSb'){const tp=bm33(p,.55,.72);g.scale(1+.04*tp,1-.05*tp)}
  else if(ty==='idlNa'){const s=bm33(p,.15,.85);g.scale(1+.02*s,1-.03*s)}
  else if(ty==='idlNb'){g.scale(1+.05*e,1-.12*e);g.rotate(.06*e)}}
/* ----- ท่ายืนรอ: มือ/อาวุธ ----- */
function idlArm(cls,C){const p=C.p,ty=C.ty,e=env33(p,.22,.22),o={dx:0,dy:0,rot:0,ak:null,off:null,gl:null};
  if(ty==='idlMa'){o.rot=-.35*e;o.dx=-5*e;o.dy=-5*e}
  else if(ty==='idlMb'){const s=c33(p,.15,.8);o.rot=6.283*io33(s);o.dx=2*bm33(p,.1,.9);o.dy=-1*bm33(p,.1,.9);if(s>.1&&s<.9)o.gl=[9,-12,'255,235,200',.35*bm33(s,.1,.9)]}
  else if(ty==='idlAa'){o.dx=1.5*e;o.ak=p<.68?.45*eo33(c33(p,.12,.6)):0;if(p>.68&&p<.8)o.gl=[16,-1,'230,255,230',.5]}
  else if(ty==='idlAb'){o.rot=-.7*e;o.dy=-6*e;o.dx=-1*e;o.off=[-3,-6-9*e]}
  else if(ty==='idlGa'){o.rot=Math.sin(p*Math.PI*4)*.28*e;o.dx=1*e;o.gl=[9,-17,'160,205,255',.3*e]}
  else if(ty==='idlGb'){o.dy=-3*e;o.rot=.12*e;o.off=[-4,-6-3*e];o.gl=[-4,-6-3*e,'190,150,255',.38*e]}
  else if(ty==='idlSa'){o.dx=-3*e;o.dy=-3*e;o.rot=-.1*e;o.off=[4,-7];o.gl=[4,-7,'255,220,120',.42*e]}
  else if(ty==='idlSb'){const up=eo33(c33(p,.15,.5))*(1-c33(p,.5,.58)),tp=bm33(p,.55,.85);o.dy=-5*up;o.gl=tp>0?[9,13,'255,225,130',.85*tp]:null}
  else if(ty==='idlNa'){const s=c33(p,.18,.72);o.rot=6.283*2*io33(s);o.dy=-10*bm33(p,.18,.72);o.dx=1*e}
  else if(ty==='idlNb'){o.dy=2*e;o.rot=.25*e;o.gl=[1,-6,'210,110,255',.18*e]}
  return o}
/* ลิฟต์ของตัว (ใช้ย่อเงาพื้น): ก้าวเดิน + ท่าที่ลอยขึ้น */
function chLift(C,ph,mv){let L=ph?Math.abs(Math.sin(ph))*2.6*(mv==null?1:mv):0;if(!C)return L;const p=C.p,ty=C.ty;
  if(ty==='leap2'||ty==='leaptoss')L+=Math.sin(Math.min(1,p/.75)*Math.PI)*17;
  else if(ty==='leapshot'&&p<.42)L+=Math.sin(p/.42*Math.PI)*16;
  else if(ty==='spin2')L+=Math.sin(Math.min(1,p)*Math.PI)*6;
  else if(ty==='cleave')L+=16*eo33(c33(p,0,.38))*(1-c33(p,.38,.48));
  else if(ty==='stomp')L+=6*eo33(c33(p,0,.4))*(1-c33(p,.4,.48));
  else if(ty==='bless')L+=6*Math.min(1,eo33(c33(p,0,.3)),(1-p)*3.5);
  else if(ty==='channel'||ty==='summon')L+=9*Math.min(1,eo33(c33(p,0,.25)),(1-p)*4);
  else if(ty==='idlGb')L+=4.5*env33(p,.22,.22);
  return L}
/* แสงวิ่งไล่ตามคมอาวุธ +4 ถึง +9 */
function upShine(F,u,wc,s){if(!F||!F.b||u<4||u>=10)return;const t=performance.now()/1000,B=F.b,T=F.t||[B[0],B[1]-s*14],col=upCol(wc),k=u>=7?1:.6,per=u>=7?1.6:2.4,q=((t+B[0]*.003)%per)/per*1.5;if(q>1)return;
  const L=w=>[B[0]+(T[0]-B[0])*w,B[1]+(T[1]-B[1])*w],a=Math.sin(q*Math.PI),P0=L(Math.max(0,q-.16)),P1=L(Math.min(1,q+.04)),P=L(q);
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='lighter';g.lineCap='round';
  g.strokeStyle='rgba('+col+','+(.55*a*k)+')';g.lineWidth=s*2.2;g.beginPath();g.moveTo(P0[0],P0[1]);g.lineTo(P1[0],P1[1]);g.stroke();
  g.strokeStyle='rgba(255,255,255,'+(.85*a*k)+')';g.lineWidth=s*.9;g.stroke();glowAt(P[0],P[1],s*(3+2*k),col,.6*a*k);
  if(q>.92&&q<1)glowAt(T[0],T[1],s*5,'255,255,255',.7*k*(1-(q-.92)/.08));g.restore()}
/* ฝุ่นที่เท้า */
function dustTick(key,x,y,ph,mv,dir){let D=CHDUST[key];if(!D)D=CHDUST[key]={k:null,a:[]};const n=performance.now();
  if(ph&&mv>.6&&!LOWQ){const k=Math.floor((ph+Math.PI/2)/Math.PI);if(D.k!=null&&k!==D.k&&D.a.length<8)D.a.push({x:x-dir*(3+Math.random()*2),y:y+14.5,t0:n,d:-dir*(.5+Math.random()*.6)});D.k=k}else D.k=null;
  if(!D.a.length)return;g.save();for(let i=D.a.length-1;i>=0;i--){const q=D.a[i],e=(n-q.t0)/480;if(e>=1){D.a.splice(i,1);continue}
    const r=2+5*eo33(e),a=.32*(1-e);g.fillStyle='rgba(214,198,166,'+a+')';g.beginPath();g.ellipse(q.x+q.d*10*eo33(e),q.y-2.5*e,r,r*.6,0,0,7);g.fill()}g.restore()}
function hk33(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return Math.abs(h)}
/* เลือกท่ายืนรอตามเวลาที่ยืนนิ่ง */
function idlPick(key,cls,AN,lk){const n=performance.now();let I=CHIDL[key];if(!I)I=CHIDL[key]={ak:0};if(lk&&lk.ak>0)I.ak=n;
  if(!AN||AN.cast||AN.mv>0||!IDLT[cls]||n-I.ak<3000)return null;const it=(AN.it||0)-6-(hk33(key)%30)/10;if(it<0)return null;
  const per=9,i=Math.floor(it/per),ph=it-i*per;if(ph>=IDLD)return null;return{ty:IDLT[cls][i%2],p:ph/IDLD,d:IDLD,idle:1}}
/* ===== ห้องดูตัวละคร (หน้าอุปกรณ์) ===== */
const GPV={rot:0,tr:0,pose:'idle',drag:null,t0:performance.now()};
const GPVP=[['idle','🧍','ยืน'],['run','🏃','วิ่ง'],['atk','⚔️','โจมตี'],['sk','✨','สกิล']];
function gpvTry(){try{if(!gsel)return null;const [w,k]=gsel.split(':');if(w!=='bag')return null;const it=me.bag[+k];return it&&it.sl&&['w','a','h','b'].indexOf(it.sl)>=0?it:null}catch(e){return null}}
function gpvHTML(){const it=gpvTry();
  return'<div id="gpvw" style="position:relative;margin:0 auto 8px;max-width:330px"><canvas id="gpv" style="display:block;width:100%;height:220px;border-radius:14px;touch-action:pan-y;cursor:grab;background:radial-gradient(ellipse at 50% 38%,#5a4a68,#221a2a 62%,#120e16);box-shadow:inset 0 0 0 1px rgba(201,170,110,.5)"></canvas>'+
   (it?'<div style="position:absolute;left:8px;top:8px;font-size:11px;padding:3px 8px;border-radius:9px;background:rgba(20,12,30,.78);border:1px solid rgba(255,216,140,.55);color:#ffe6b0">👀 ลองใส่: '+itemName(it)+'</div>':'')+
   '<div style="position:absolute;right:8px;top:8px;font-size:10px;opacity:.6;color:#efe4ff">↔ ลากเพื่อหมุน</div>'+
   '<div style="display:flex;gap:6px;justify-content:center;margin-top:6px">'+GPVP.map(([k,i,n])=>'<button class="tab sm'+(GPV.pose===k?' on':'')+'" data-gpvp="'+k+'" style="font-size:12px;padding:4px 10px">'+i+' '+n+'</button>').join('')+'</div></div>'}
function gpvLook(){const it=gpvTry(),E=Object.assign({},me.eq);if(it)E[it.sl]=it;return{w:lkc(E.w),a:lkc(E.a),h:lkc(E.h),b:lkc(E.b),wu:(E.w&&E.w.u)|0}}
function drawGearPreview2(){const c=$('gpv');if(!c||ov.hidden||!me.cls)return;const w=c.clientWidth||300,h=c.clientHeight||220;if(c.width!==Math.round(w*DPR)||c.height!==Math.round(h*DPR)){c.width=Math.round(w*DPR);c.height=Math.round(h*DPR)}
  const n=performance.now(),t=n/1000,dt=Math.min(.05,(n-(GPV.lt||n))/1000);GPV.lt=n;if(!GPV.drag){GPV.rot+=(GPV.tr-GPV.rot)*Math.min(1,dt*9)}
  const L=gpvLook(),c2=c2v(),cls=me.cls,fx=Math.cos(GPV.rot),sc=Math.min(3.4,h/70)*(GPV.pose==='sk'?.8:1);
  const g0=g,cha0=CHA,chs0=CHS,che0=CHE;g=c.getContext('2d');
  try{g.setTransform(DPR,0,0,DPR,0,0);g.clearRect(0,0,w,h);
    /* พื้น + แสงด้านหลัง */
    {const cx=w/2,fy=h*.84;const gr=g.createRadialGradient(cx,fy,4,cx,fy,w*.42);gr.addColorStop(0,'rgba(255,230,190,.16)');gr.addColorStop(1,'rgba(255,230,190,0)');g.fillStyle=gr;g.beginPath();g.ellipse(cx,fy,w*.42,h*.1,0,0,7);g.fill();
      g.strokeStyle='rgba(255,216,150,.22)';g.lineWidth=1;g.beginPath();g.ellipse(cx,fy,w*.3,h*.065,0,0,7);g.stroke();
      g.save();g.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const q=(t*.12+i/7)%1,x=cx+Math.sin(i*2.3+t*.4)*w*.32;g.fillStyle='rgba(255,226,170,'+(.45*Math.sin(q*Math.PI))+')';g.beginPath();g.arc(x,fy-q*h*.7,1.3,0,7);g.fill()}g.restore()}
    g.save();g.translate(w/2,h*.84-15*sc);g.scale(sc,sc);
    const pose=GPV.pose,pt=(n-GPV.t0)/1000;let ph=0,ak=0,cast=null,mv=0;
    if(pose==='run'){ph=t*9;mv=1;CHS=chSpring('__gpv',t*130,0)}else{CHS={h:0,c:0};if(CHSS.__gpv)delete CHSS.__gpv}
    if(pose==='atk'){ak=(pt*1.3)%1}
    if(pose==='sk'){const T=SKP&&SKP[cls],e=T&&(T[2]||T[0]);if(e){const D=Math.max(.8,e[1]*1.6),q=pt%(D+.6);if(q<D)cast={ty:e[0],p:q/D,d:D,big:true,k:2}}}
    if(pose==='idle'){const q=pt%3.4,v=Math.floor(pt/3.4)%2;if(q>.9&&q<.9+IDLD&&IDLT[cls])cast={ty:IDLT[cls][v],p:(q-.9)/IDLD,d:IDLD,idle:1}}
    CHA={mv,fx,cast,it:0};CHE=cast&&!cast.idle?{k:'cast',lx:0,ly:0}:pose==='atk'?{k:'fever',lx:0,ly:0}:null;
    const lift=chLift(cast,ph,mv);try{gxShadow(0,15,15*(1-Math.min(.5,lift/36)),5.5*(1-Math.min(.5,lift/36)),.75*(1-Math.min(.6,lift/28)))}catch(e){}
    if(c2){const rc=h2r(CL[cls].c);g.save();g.globalCompositeOperation='lighter';g.strokeStyle=c2===2?'rgba(190,140,255,.7)':'rgba(255,216,110,.6)';g.lineWidth=.8;g.setLineDash([4,3]);g.lineDashOffset=-t*10;g.beginPath();g.ellipse(0,15,17,6,0,0,7);g.stroke();g.setLineDash([]);
      const gr=g.createRadialGradient(0,15,1,0,15,19);gr.addColorStop(0,'rgba('+rc+',.4)');gr.addColorStop(1,'rgba('+rc+',0)');g.fillStyle=gr;g.beginPath();g.ellipse(0,15,19,7,0,0,7);g.fill();g.restore()}
    const by=ph?-Math.abs(Math.sin(ph))*2.6:0;g.translate(0,by);
    let AC=null,AS=1;WFX={};{const m=g.getTransform();AC=m.transformPoint(new DOMPoint(0,0));AC=[AC.x,AC.y];AS=Math.hypot(m.a,m.b)}
    drawChar(0,0,cls,fx<0?-1:1,ph,L.h,t,L.b,L.w,L.a,c2,ak);
    try{if(L.wu>=10)upAura(WFX,L.wu,L.w,AC,AS);else upShine(WFX,L.wu,L.w,AS)}catch(e){}
    g.restore()}
  catch(e){}finally{WFX=null;g=g0;CHA=cha0;CHS=chs0;CHE=che0}}
setTimeout(()=>{
  /* วาดผู้เล่น: น้ำหนักตัว + ฝุ่น + เงาตามความสูง + ท่ายืนรอ + ประกายอาวุธตีบวก */
  try{const _d=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){if(down)return _d.apply(this,arguments);
      const key=(lk&&lk.u)||name||'?',A=CHA;let idl=null,wu=0,s=1;
      try{const S=CHSS[key];if(S&&!LOWQ){const d=Math.max(-1.3,Math.min(1.3,S.p-S.u));CHW={r:d>0?d*.09:d*.03,sx:Math.abs(d)*.035,sy:-Math.abs(d)*.05}}
        if(A){idl=idlPick(key,cls,A,lk);if(idl)A.cast=idl}
        const mt=lk&&lk.mt;if(!mt){dustTick(key,x,y,ph,A?A.mv:1,(A&&A.fx<0)||fx<0?-1:1);SHL={l:chLift(A&&A.cast,ph,A?A.mv:1)}}
        wu=lk&&lk.wu|0;if(wu>=4&&wu<10&&!WFX){WFX={};s=Math.hypot(g.getTransform().a,g.getTransform().b)}else wu=0}catch(e){}
      try{return _d.apply(this,arguments)}finally{try{if(wu&&WFX)upShine(WFX,wu,lk.w,s)}catch(e){}if(wu)WFX=null;if(idl&&A)A.cast=null;CHW={r:0,sx:0,sy:0};SHL=null}}}catch(e){}
  /* เงาพื้น: หด/จางตามความสูงของตัว + เงาเข้มตรงเท้า (เฉพาะตอนวาดตัวผู้เล่น) */
  try{const _s=gxShadow;gxShadow=function(x,y,rx,ry,a){const H=SHL;if(!H)return _s.apply(this,arguments);SHL=null;const l=H.l||0,k=1-Math.min(.5,l/36);
      _s.call(this,x,y,rx*k,ry*k,a*(1-Math.min(.6,l/28)));if(l<6&&!LOWQ)_s.call(this,x,y,rx*.5,ry*.55,a*.6*(1-l/6))}}catch(e){}
  /* ท่ายืนรอ: ต่อเข้าระบบท่าสกิล (ท่าทั้งตัว + มือ/อาวุธ) */
  try{for(const k in IDLT)IDLT[k].forEach(t=>R24T.add(t));R24OFF.idlAb=1;R24OFF.idlSa=1;R24OFF.idlGb=1}catch(e){}
  try{const _b=r24Body;r24Body=function(C){if(C&&C.idle)return idlBody(C);return _b.apply(this,arguments)}}catch(e){}
  try{const _a=r24Arm;r24Arm=function(cls,C){if(C&&C.idle)return idlArm(cls,C);return _a.apply(this,arguments)}}catch(e){}
  try{const _g=castGhosts;castGhosts=function(x,y,C){if(C&&C.idle)return;return _g.apply(this,arguments)}}catch(e){}
  /* ห้องดูตัวละคร */
  try{drawGearPreview=drawGearPreview2}catch(e){}
  document.addEventListener('pointerdown',e=>{const c=e.target;if(c&&c.id==='gpv'){GPV.drag={x:e.clientX,r0:GPV.rot,mv:0};try{c.setPointerCapture(e.pointerId)}catch(_){}}},true);
  document.addEventListener('pointermove',e=>{const D=GPV.drag;if(!D)return;const dx=e.clientX-D.x;if(Math.abs(dx)>4)D.mv=1;GPV.rot=D.r0+dx*.025},true);
  const up=()=>{const D=GPV.drag;if(!D)return;GPV.drag=null;if(!D.mv)GPV.tr=Math.round(GPV.rot/Math.PI)*Math.PI+Math.PI;else GPV.tr=Math.round(GPV.rot/Math.PI)*Math.PI};
  document.addEventListener('pointerup',up,true);document.addEventListener('pointercancel',up,true);
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-gpvp]');if(!b)return;e.stopPropagation();GPV.pose=b.dataset.gpvp;GPV.t0=performance.now();try{sfx('click')}catch(_){}
    document.querySelectorAll('[data-gpvp]').forEach(x=>x.classList.toggle('on',x===b))},true);
},700);
