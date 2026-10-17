/* ---------- v423 ท่าทางคู่ + โหมดถ่ายรูป ----------
   ท่าคู่ (เมนูท่าทาง 😊 แถวล่าง): 🙌 ไฮไฟว์ · 🤗 กอด · 📸 โพสคู่ — ใช้กับผู้เล่นที่ยืนใกล้ที่สุด (≤120)
     · เพื่อนในปาร์ตี้/รายชื่อเพื่อน = เล่นทันที · คนอื่นต้องกดรับ (ปุ่ม ✅ 8 วิ)
     · ทั้งสองคนหันหากัน ขยับเข้าหากัน แล้วเล่นท่าพร้อมกัน · ทุกคนในแมพเห็น (fx peq/pen/pes)
   📷 โหมดถ่ายรูป: ซ่อนปุ่ม/แถบทั้งหมด · ลากจอเพื่อเลื่อนกล้อง · ➕➖ ซูม · ซ่อน/โชว์ป้ายชื่อ · 📸 บันทึกภาพ */
const PEL={hf:['🙌','ไฮไฟว์',2.2,22],hg:['🤗','กอด',2.8,12],ps:['📸','โพสคู่',3.2,26]},PE={},PER={u:'',e:'',n:'',t:0},PEW={to:'',t:0};
function peName(u){if(u===uid)return me.nm||myName||'คุณ';const o=others[u];return o?o.n:'เพื่อน'}
function pePt(u){if(u===uid)return{x:me.x,y:me.y};const o=others[u];return o?{x:o.x,y:o.y}:null}
/* v424 รายชื่อคนรอบตัว (≤160) — เพื่อนในปาร์ตี้ขึ้นก่อน แล้วเรียงตามระยะ */
function peList(){const L=[];for(const k in others){const o=others[k];if(!o||o.hp<=0)continue;const d=Math.hypot(o.x-me.x,o.y-me.y);if(d>160)continue;let pt=false;try{pt=inPty(k)}catch(_){}L.push({u:k,n:String(o.n||'ผู้เล่น'),d,pt})}return L.sort((a,b)=>(b.pt-a.pt)||(a.d-b.d)).slice(0,6)}
function peNear(){const L=peList();return L.length?L[0].u:''}
function peTrusted(u,n){let ok=false;try{ok=typeof inPty==='function'&&inPty(u)}catch(e){}if(!ok)try{ok=friSt().L.some(f=>f&&f.n===n)}catch(e){}return ok}
/* v424 กันชวนรัว: พัก 5 วิ ต่อการชวน · ชวนคนเดิมที่ยังไม่ตอบรับซ้ำได้หลัง 30 วิ */
const PECD={t:0,blk:{}},PEIN={};
function peUse(e){if(!me.cls||!run||me.down>0||!PEL[e])return;if(SKE.b||SKB0){try{emoClose()}catch(_){}banner={s:'🤝 ลงจากหอขี่คอก่อน',t:2};return}
  const L=peList();if(!L.length){try{emoClose()}catch(_){}banner={s:PEL[e][0]+' ต้องยืนใกล้ผู้เล่นอื่น (ไม่เกิน ~3 ก้าว)',t:2.5};return}
  if(L.length===1){try{emoClose()}catch(_){}return peAsk(L[0].u,e)}
  /* หลายคน: ให้เลือกในแผงท่าทาง */
  const p=$('emp');if(!p)return peAsk(L[0].u,e);
  p.innerHTML='<div style="grid-column:1/-1;font-size:12px;font-weight:700;padding:2px 4px">'+PEL[e][0]+' '+PEL[e][1]+'กับใคร?</div>'+L.map(q=>'<button data-pp="'+esc(q.u)+'|'+e+'" style="grid-column:span 5;flex-direction:row;justify-content:flex-start;gap:6px;padding:7px 9px"><span style="font-size:15px">'+(q.pt?'👥':'🙂')+'</span><small style="font-size:12px;opacity:1">'+esc(q.n.length>14?q.n.slice(0,13)+'…':q.n)+(q.pt?' · ปาร์ตี้':'')+'</small></button>').join('')+'<button data-pp="x" style="grid-column:span 5;padding:5px"><small>ยกเลิก</small></button>';p.hidden=false}
function peAsk(u,e){const now=performance.now();if(!u||!PEL[e])return;
  if(now<PECD.t){banner={s:'🤝 รออีก '+Math.ceil((PECD.t-now)/1000)+' วิ ค่อยชวนใหม่',t:1.8};return}
  const b=PECD.blk[u];if(b&&now<b){banner={s:'🤝 เพิ่งชวน '+peName(u)+' ไป · ชวนซ้ำได้ใน '+Math.ceil((b-now)/1000)+' วิ',t:2.2};return}
  PECD.t=now+5000;PECD.blk[u]=now+30000;if(me.riding)try{mountToggle()}catch(_){}PEW.to=u;PEW.t=now+8000;try{fx({k:'peq',to:u,e,n:me.nm||myName||''})}catch(_){}
  banner={s:PEL[e][0]+' ชวน '+peName(u)+' '+PEL[e][1]+' · รอตอบรับ…',t:3}}
function peStartFx(o){if(!o||typeof o.a!=='string'||typeof o.b!=='string'||!PEL[o.e])return;const now=performance.now();
  PE[o.a]={p:o.b,e:o.e,t0:now,r:0,clap:0};PE[o.b]={p:o.a,e:o.e,t0:now,r:1,clap:0};if(o.a===uid||o.b===uid){PEW.to='';PER.u='';delete PECD.blk[o.a===uid?o.b:o.a]}}
function peFx(o){if(!o)return;if(o.k==='pes')return peStartFx(o);if(o.to!==uid||!me.cls)return;const n=typeof o.n==='string'?o.n.slice(0,24):'';
  if(o.k==='peq'){if(!PEL[o.e]||me.down>0)return;if(peTrusted(o.by,n)){try{fx({k:'pes',a:o.by,b:uid,e:o.e})}catch(_){}return}
    /* v424 ฝั่งรับกันโดนรัว: คนเดิมชวนได้ครั้งเดียวทุก 20 วิ · มีคำชวนค้างอยู่ = ไม่รับคำชวนใหม่ */const nw=performance.now();if((PEIN[o.by]&&nw-PEIN[o.by]<20000)||(PER.u&&PER.u!==o.by&&nw<PER.t))return;PEIN[o.by]=nw;
    PER.u=o.by;PER.e=o.e;PER.n=n||peName(o.by);PER.t=performance.now()+8000;banner={s:PEL[o.e][0]+' '+PER.n+' ชวน'+PEL[o.e][1]+' — กด ✅ เพื่อรับ',t:4};try{sfx('quest')}catch(_){}}
  else if(o.k==='pen'&&PEW.to===o.by){PEW.to='';banner={s:'🤝 อีกฝ่ายไม่สะดวกตอนนี้',t:2}}}
/* ปุ่มรับ (ลอยเหนือปุ่มขี่/ซ้อนท้าย) */
function pebBtn(){let b=$('peb');if(!b){b=document.createElement('button');b.id='peb';b.hidden=true;document.body.appendChild(b);
    const st=document.createElement('style');st.textContent='#peb{position:fixed;right:10px;bottom:350px;z-index:31;padding:8px 13px;font:bold 13px system-ui;color:#fff;border-radius:18px;border:2px solid #a8f0a8;background:linear-gradient(#3a7a3a,#1e4a1e);animation:rdp 1s infinite}@media (max-height:780px){#peb{bottom:322px}}';document.head.appendChild(st);
    b.addEventListener('click',e=>{e.stopPropagation();if(PER.u&&performance.now()<PER.t){try{fx({k:'pes',a:PER.u,b:uid,e:PER.e})}catch(_){}}PER.u='';b.hidden=true})}return b}
function pebUI(){const b=pebBtn();if(!b)return;const on=!!(PER.u&&performance.now()<PER.t&&me.cls&&run&&!PH.on);const tx=on?'✅ '+PEL[PER.e][0]+' รับ'+PEL[PER.e][1]+' กับ '+(PER.n.length>8?PER.n.slice(0,7)+'…':PER.n):'';
  if(b.hidden!==!on)b.hidden=!on;if(on&&b.textContent!==tx)b.textContent=tx;if(!on&&PER.u&&performance.now()>=PER.t)PER.u=''}
/* เวลา/ตำแหน่งที่วาด (ขยับเข้าหากันแบบนุ่ม ๆ) */
function peAge(P){return(performance.now()-P.t0)/1000}
function peView(u){const P=PE[u];if(!P)return null;const L=PEL[P.e],a=peAge(P);if(a>L[2])return null;const A=pePt(u),B=pePt(P.p);if(!A||!B)return null;
  const dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy)||1;if(d>170)return null;const gap=L[3],k=Math.min(1,a/.35)*(a>L[2]-.35?Math.max(0,(L[2]-a)/.35):1),s=k*k*(3-2*k),mv=Math.max(0,(d-gap)/2)*s;
  return{x:A.x+dx/d*mv,y:A.y+dy/d*mv*.6,f:dx>=0?1:-1,a,e:P.e,r:P.r,L}}
/* ---- โหมดถ่ายรูป ---- */
const PH={on:0,ox:0,oy:0,z:1,tags:1,drag:null};
function phCSS(){if($('phcss'))return;const st=document.createElement('style');st.id='phcss';
  st.textContent='body.phm #app *:not(#stage):not(#c):not(#phb):not(#phb *){visibility:hidden!important}body.phm>*:not(#app):not(#phb):not(#phv):not(#phcss){visibility:hidden!important}body.phm #c{visibility:visible!important}'+
  '#phb{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:60;display:flex;gap:6px;padding:7px;border-radius:18px;background:rgba(14,10,18,.82);border:1px solid rgba(255,236,205,.3);visibility:visible!important}#phb[hidden]{display:none}#phb button{font:bold 13px system-ui;padding:7px 10px;border-radius:12px;border:1px solid rgba(255,236,205,.35);background:rgba(255,255,255,.08);color:#fff3dc}#phb .shot{background:linear-gradient(#ff8ad8,#c0398a);border-color:#ffd0f0}'+
  '#phv{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.86);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:14px}#phv img{max-width:100%;max-height:72vh;border-radius:12px;border:2px solid #fff3dc}#phv a,#phv button{font:bold 14px system-ui;padding:9px 16px;border-radius:14px;border:1px solid #ffd0f0;background:#c0398a;color:#fff;text-decoration:none}#phv small{color:#fff3dc;opacity:.8}';document.head.appendChild(st)}
function phBar(){let b=$('phb');if(b)return b;b=document.createElement('div');b.id='phb';b.hidden=true;
  b.innerHTML='<button data-ph="zo">➖</button><button data-ph="zi">➕</button><button data-ph="tg">🏷️ ชื่อ</button><button data-ph="ct">🎯</button><button data-ph="sh" class="shot">📸 ถ่าย</button><button data-ph="x">✕</button>';document.body.appendChild(b);
  b.addEventListener('click',e=>{const q=e.target.closest('[data-ph]');if(!q)return;e.stopPropagation();const k=q.dataset.ph;
    if(k==='zi')PH.z=Math.min(1.5,+(PH.z+.1).toFixed(2));else if(k==='zo')PH.z=Math.max(.7,+(PH.z-.1).toFixed(2));else if(k==='tg'){PH.tags=PH.tags?0:1;q.style.opacity=PH.tags?1:.5}
    else if(k==='ct'){PH.ox=0;PH.oy=0;PH.z=1}else if(k==='sh')phShot();else if(k==='x')phOff()},true);return b}
function phOn(){if(!me.cls||!run)return;try{emoClose()}catch(_){}phCSS();PH.on=1;PH.ox=0;PH.oy=0;PH.z=1;PH.tags=1;document.body.classList.add('phm');phBar().hidden=false;banner=null;try{sfx('click')}catch(_){}}
function phOff(){PH.on=0;PH.drag=null;document.body.classList.remove('phm');const b=$('phb');if(b)b.hidden=true;const v=$('phv');if(v)v.remove()}
function phShot(){try{const c=$('c'),u=c.toDataURL('image/png');try{sfx('combo')}catch(_){}PHF.t=performance.now();
    let v=$('phv');if(v)v.remove();v=document.createElement('div');v.id='phv';v.innerHTML='<img alt="ภาพที่ถ่าย"><small>กดค้างที่ภาพเพื่อบันทึก (มือถือ) หรือกดปุ่มดาวน์โหลด</small><div style="display:flex;gap:8px"><a download="refugee-photo.png">⬇️ ดาวน์โหลด</a><button>กลับไปถ่ายต่อ</button></div>';
    v.querySelector('img').src=u;const A=v.querySelector('a');A.href=u;A.addEventListener('click',ev=>{if(!(window.claude&&window.claude.use))return;ev.preventDefault();phSave(u).then(ok=>{if(!ok)banner={s:'📸 กดค้างที่ภาพเพื่อบันทึกแทน',t:3}})});v.querySelector('button').onclick=e=>{e.stopPropagation();v.remove()};v.addEventListener('click',e=>e.stopPropagation());document.body.appendChild(v)}catch(e){banner={s:'📸 บันทึกภาพไม่ได้ในเบราว์เซอร์นี้',t:2.5}}}
/* v424 หน้าเว็บบน claude.ai ดาวน์โหลดผ่านความสามารถ downloads (ผู้ใช้กดยืนยัน) · เว็บปกติใช้ลิงก์ดาวน์โหลดตรง */
async function phSave(u){try{const d=await window.claude.use('downloads');if(!d)return false;const b=await (await fetch(u)).blob();await d.save({filename:'refugee-photo.png',data:b});return true}catch(e){return!!(e&&(e.code==='declined'||e.code==='rate_limited'))}}
const PHF={t:0},PHB={c:null,x:null,ok:0};
function phDrag(){const c=$('c');if(!c||c.__ph)return;c.__ph=1;const P=e=>{const t=e.touches?e.touches[0]:e;return[t.clientX,t.clientY]};
  const dn=e=>{if(!PH.on)return;const p=P(e);PH.drag={x:p[0],y:p[1],ox:PH.ox,oy:PH.oy};e.stopPropagation();e.preventDefault()};
  const mv=e=>{if(!PH.on||!PH.drag)return;const p=P(e),r=c.getBoundingClientRect(),k=(W||360)/r.width/(PH.z||1);PH.ox=Math.max(-260,Math.min(260,PH.drag.ox-(p[0]-PH.drag.x)*k));PH.oy=Math.max(-260,Math.min(260,PH.drag.oy-(p[1]-PH.drag.y)*k));e.stopPropagation();e.preventDefault()};
  const up=e=>{if(PH.drag){PH.drag=null;e.stopPropagation()}};
  c.addEventListener('touchstart',dn,{capture:true,passive:false});c.addEventListener('mousedown',dn,true);window.addEventListener('touchmove',mv,{capture:true,passive:false});window.addEventListener('mousemove',mv,true);window.addEventListener('touchend',up,true);window.addEventListener('mouseup',up,true)}
/* เอฟเฟกต์ท่าคู่ (ชั้นบน) */
function peDrawFx(){const now=performance.now();for(const u in PE){const P=PE[u];if(P.r!==0)continue;const V=peView(u),Q=peView(P.p);if(!V||!Q){if(peAge(P)>PEL[P.e][2]+.5){delete PE[u];delete PE[P.p]}continue}
    const mx=(V.x+Q.x)/2,my=(V.y+Q.y)/2,a=V.a,t=now/1000;g.save();
    /* ฟองอีโมจิช่วงแรก */if(a<1.1){g.globalAlpha=Math.min(1,a*4)*(a>.85?(1.1-a)/.25:1);g.font='16px system-ui';g.textAlign='center';g.fillText(PEL[P.e][0],mx,my-58-a*6)}
    if(P.e==='hf'){if(a>.5&&!P.clap){P.clap=1;try{if(Math.hypot(me.x-mx,me.y-my)<500)sfx('combo')}catch(_){}try{burst(mx,my-24,['#ffe08a','#ffffff','#ffb060'],LOWQ?8:16,130,.45,{glow:1})}catch(_){}try{if(Math.hypot(me.x-mx,me.y-my)<300)shk=Math.max(shk,.06)}catch(_){}}
      if(a>.5&&a<1.3){const q=(a-.5)/.8;g.globalAlpha=1-q;g.strokeStyle='#ffe08a';g.lineWidth=2.5;for(let i=0;i<8;i++){const an=i*.785;g.beginPath();g.moveTo(mx+Math.cos(an)*(6+q*10),my-24+Math.sin(an)*(6+q*10));g.lineTo(mx+Math.cos(an)*(10+q*20),my-24+Math.sin(an)*(10+q*20));g.stroke()}
        g.globalAlpha=1-q;g.font='bold 15px system-ui';g.textAlign='center';g.fillStyle='#fff';g.strokeStyle='rgba(60,30,0,.8)';g.lineWidth=3;g.strokeText('👏 เย้!',mx,my-44-q*12);g.fillText('👏 เย้!',mx,my-44-q*12)}}
    else if(P.e==='hg'){if(a>.35){g.globalCompositeOperation='lighter';try{glowAt(mx,my-14,34,'255,120,190',.25*Math.min(1,(a-.35)*3))}catch(_){}g.globalCompositeOperation='source-over';
        g.font='12px system-ui';g.textAlign='center';for(let i=0;i<4;i++){const q=((a-.35)*.55+i/4)%1;g.globalAlpha=(1-q)*.95;g.fillText('💗',mx+Math.sin(t*2+i*1.7)*12,my-30-q*40)}}}
    else if(P.e==='ps'){g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const an=t*1.4+i*1.05,r=30+Math.sin(t*3+i)*4;g.globalAlpha=.5+.4*Math.sin(t*5+i);g.fillStyle='#fff3c0';g.beginPath();g.arc(mx+Math.cos(an)*r,my-20+Math.sin(an)*r*.55,1.6,0,7);g.fill()}g.globalCompositeOperation='source-over';
      if(a>1.7&&!P.clap){P.clap=1;if(Math.hypot(me.x-mx,me.y-my)<420){PHF.t=now;try{sfx('combo2')}catch(_){}}}
      if(a>1.7){const q=Math.min(1,(a-1.7)/1.2);g.globalAlpha=(1-q)*.9;g.strokeStyle='#fff3dc';g.lineWidth=2;g.strokeRect(mx-40,my-62,80,82);g.font='bold 11px system-ui';g.textAlign='center';g.fillStyle='#fff3dc';g.fillText('📸 แชะ!',mx,my+32)}}
    g.restore()}}
/* แฟลชกล้องเต็มจอ */
function phFlash(){const a=(performance.now()-PHF.t)/1000;if(a<0||a>.45)return;g.save();g.setTransform(1,0,0,1,0,0);g.globalAlpha=(1-a/.45)*.75;g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);g.restore()}
setTimeout(()=>{
  /* แถวท่าคู่ + ปุ่มถ่ายรูปในเมนูท่าทาง */
  try{const _et=emoToggle;emoToggle=function(){_et.apply(this,arguments);const p=$('emp');if(!p||p.hidden||p.querySelector('[data-pe]'))return;
      p.insertAdjacentHTML('beforeend',Object.keys(PEL).map(k=>'<button data-pe="'+k+'" title="'+PEL[k][1]+' (กับคนที่ยืนใกล้สุด)"><span>'+PEL[k][0]+'</span><small>'+PEL[k][1]+'</small></button>').join('')+'<button data-pe="photo" title="โหมดถ่ายรูป"><span>📷</span><small>ถ่ายรูป</small></button>')}}catch(e){}
  document.addEventListener('click',e=>{const q=e.target.closest&&e.target.closest('[data-pp]');if(q){e.stopPropagation();e.preventDefault();try{emoClose()}catch(_){}const v=q.dataset.pp;if(v!=='x'){const k=v.lastIndexOf('|');peAsk(v.slice(0,k),v.slice(k+1))}return}},true);
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pe]');if(!b)return;e.stopPropagation();e.preventDefault();const k=b.dataset.pe;if(k==='photo')phOn();else peUse(k)},true);
  try{const _h=handleFx;handleFx=function(o){if(o&&(o.k==='peq'||o.k==='pes'||o.k==='pen')){try{peFx(o)}catch(e){}return}return _h.apply(this,arguments)}}catch(e){}
  /* ท่าทาง: หันหากัน · ขยับเข้าหากัน · ท่าเฉพาะ */
  try{const _d0=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const u=lk&&lk.u,V=u&&!down?peView(u):null,A=CHA;let set=0;
      if(PH.on&&!PH.tags)PGNT=1;
      try{if(V){const a=Array.prototype.slice.call(arguments);if(V.r===1)PGNT=1;/* ยืนชิดกัน: ซ่อนป้ายชื่อคนที่ 2 ชั่วคราว ป้ายจะได้ไม่ซ้อนกัน */a[0]=V.x;a[1]=V.y;a[10]=V.f;if(A&&!A.cast&&!(lk&&lk.ak>0)){A.cast={ty:'pe'+V.e,p:V.a,idle:1,d:1,r:V.r};set=1}return _d0.apply(this,a)}
        return _d0.apply(this,arguments)}finally{if(set&&A)A.cast=null;if((PH.on&&!PH.tags)||(V&&V.r===1))PGNT=0}}}catch(e){}
  try{['pehf','pehg','peps'].forEach(k=>{R24T.add(k);R24OFF[k]=1})}catch(e){}
  try{const _ib=idlBody;idlBody=function(C){const a=C.p;
      if(C.ty==='pehf'){g.rotate(a<.5?.1*a/.5:a<.8?.12:.04);if(a>.5&&a<.9)g.translate(0,-Math.sin((a-.5)/.4*Math.PI)*3);return}
      if(C.ty==='pehg'){const k=Math.min(1,a/.4);g.rotate(.13*k+Math.sin(a*3)*.03*k);g.scale(1+.03*k,1-.02*k);return}
      if(C.ty==='peps'){g.rotate((C.r?-1:1)*-.05);if(a>1.7&&a<2.1)g.translate(0,-Math.sin((a-1.7)/.4*Math.PI)*5);return}
      return _ib.apply(this,arguments)}}catch(e){}
  try{const _ia=idlArm;idlArm=function(cls,C){const a=C.p;
      if(C.ty==='pehf'){const k=Math.min(1,a/.45);return{dx:2,dy:-4-6*k,rot:-.3-.9*k,ak:null,off:[8+2*k,-6-11*k],gl:null}}
      if(C.ty==='pehg')return{dx:3,dy:-4,rot:-.35,ak:null,off:[11,-6+Math.sin(a*3)*.6],gl:null};
      if(C.ty==='peps')return{dx:-1,dy:1,rot:.35,ak:null,off:[5,-19+Math.sin(a*4)*.8],gl:null};
      return _ia.apply(this,arguments)}}catch(e){}
  try{const _mp=drawMProj;drawMProj=function(){try{peDrawFx()}catch(e){}return _mp.apply(this,arguments)}}catch(e){}
  /* กล้องโหมดถ่ายรูป */
  try{const _rc=rt3Cam;rt3Cam=function(){if(PH.on)return[me.x+PH.ox,me.y+PH.oy];return _rc.apply(this,arguments)}}catch(e){}
  try{const _cz=camZoomT;camZoomT=function(){if(PH.on)return PH.z;return _cz.apply(this,arguments)}}catch(e){}
  /* โหมดถ่ายรูป: เก็บภาพหลังวาดโลก+บรรยากาศ (ก่อนแถบ/มินิแมพ/จอยที่วาดลงแคนวาส) แล้ววางทับตอนจบเฟรม → ภาพสะอาด */
  try{const _vg=vigDraw;vigDraw=function(){const r=_vg.apply(this,arguments);if(PH.on)try{const c=cv;if(!PHB.c||PHB.c.width!==c.width||PHB.c.height!==c.height){PHB.c=document.createElement('canvas');PHB.c.width=c.width;PHB.c.height=c.height;PHB.x=PHB.c.getContext('2d')}PHB.x.clearRect(0,0,c.width,c.height);PHB.x.drawImage(c,0,0);PHB.ok=1}catch(e){}return r}}catch(e){}
  try{const _dw=draw;draw=function(){PHB.ok=0;const r=_dw.apply(this,arguments);try{if(PH.on&&PHB.ok){g.save();g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.drawImage(PHB.c,0,0);g.restore()}phFlash()}catch(e){}return r}}catch(e){}
  try{['drawBlRow','drawTwClimb','drawDumPanel'].forEach(n=>{const f=window[n];if(typeof f!=='function')return;window[n]=function(){if(PH.on)return;return f.apply(this,arguments)}})}catch(e){}
  try{phDrag()}catch(e){}
  setInterval(()=>{try{pebUI();if(PH.on&&(!me.cls||!run||!ov.hidden))phOff()}catch(e){}},150);
},870);
