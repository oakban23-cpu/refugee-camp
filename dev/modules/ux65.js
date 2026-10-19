
/* ===== v451 · ช่างโอนบวก «ไซลัส» — โอนระดับตีบวกจากชิ้นเก่าไปชิ้นใหม่ =====
   NPC ใหม่ในค่าย (ฝั่งตะวันตกเฉียงเหนือ ระหว่างเต็นท์บัญชาการกับศาล) ยืนหน้าแท่นโอนพลัง (ทั่ง 2 ข้าง + สายแสงเชื่อม)
   กติกา:
   - ต้นทางกับปลายทางต้องเป็นอุปกรณ์ช่องเดียวกัน (อาวุธ→อาวุธ ฯลฯ) · ใช้ได้ทั้งของที่สวมอยู่และในกระเป๋า
   - ปลายทางได้ระดับเท่าต้นทางพอดี · ต้นทางกลายเป็น +0 (ไม่หาย) · ระดับเดิมของปลายทางถูกแทนที่
   - ปลายทางต้องรับระดับนั้นได้ตามเกรด (เหมือนกติกาตีบวก): ทั่วไป ≤ +5 · Mystic ≤ +10 · Relic/Ancient ≤ +20 · ชุดเซ็ต/Cosmic ≤ +30
   - ระดับปลายทางต้องต่ำกว่าต้นทาง (ไม่ให้โอนแล้วเสียของ)
   - ค่าโอน: ทอง 35% ของค่าตีบวกสะสมถึงระดับนั้น (คิดตามปลายทาง) + หิน 2 ก้อนของขั้นนั้น (+6~10 หินขั้นแรก · +11~20 หินขั้นสอง · +21 ขึ้นไป หินขั้นสูง) · สำเร็จ 100%
   - กดยืนยัน 2 ครั้ง */
const TFN={x:1420,y:1288,n:'ไซลัส ช่างโอนบวก'};
const U65={s:null,d:null,si:null,di:null,cf:0,near:0};
const TFSAY=['อาวุธใหม่ได้มา แต่เสียดายบวกเก่า? เอามาให้ข้าย้าย','พลังที่ตีมาไม่หายไปไหน แค่ต้องมีทางให้มันเดิน','ของใหม่ต้องแกร่งพอจะรับพลังไหวนะ','ย้ายร้อยครั้งก็ไม่พลาด ข้ารับรอง','ทั่งซ้ายส่ง ทั่งขวารับ — ง่ายนิดเดียว'];
setTimeout(()=>{try{CAMP.cols.push([-180,-352,24])}catch(e){}},0);
function tfCap(it){if(!it)return 0;return(it.ss||it.r>=6)?UMAX:it.r>=4?20:it.r>=3?10:5}
function tfStone(n){return n>=21?3:n>=11?2:n>=6?1:0}
function tfCost(S,D){const n=S.u|0;let g=0;for(let u=0;u<n;u++)g+=upCost(Object.assign({},D,{u}));return Math.round(g*.35)}
function tfCheck(S,D){if(!S||!D)return'เลือกต้นทางและปลายทาง';if(S===D)return'ต้นทางกับปลายทางต้องเป็นคนละชิ้น';const n=S.u|0;if(n<1)return'ต้นทางยังไม่ได้ตีบวก';
  if(S.sl!==D.sl)return'ต้องเป็นอุปกรณ์ช่องเดียวกัน';if((D.u|0)>=n)return'ปลายทางบวกเท่าหรือสูงกว่าต้นทางอยู่แล้ว';const cap=tfCap(D);if(cap<n)return'ปลายทางรับได้สูงสุด +'+cap+' ตามเกรด ('+RN[D.r]+')';
  const st=tfStone(n),cost=tfCost(S,D);if(me.gold<cost)return'ทองไม่พอ (ต้องใช้ '+cost.toLocaleString()+')';if(st&&(me.inv['s'+st]|0)<2)return GDM['s'+st].n+' ไม่พอ (ต้องใช้ 2 ก้อน)';return''}
function tfItems(){const L=[];SLOTS.forEach(sl=>{if(me.eq[sl])L.push({k:'eq:'+sl,it:me.eq[sl]})});me.bag.forEach((it,i)=>{if(it&&it.sl)L.push({k:'bag:'+i,it})});return L}
function tfFix(){/* คีย์อาจเลื่อนเมื่อกระเป๋าเปลี่ยน → หาใหม่จาก object */const f=(o)=>{if(!o)return null;const x=tfItems().find(q=>q.it===o);return x?x.k:null};U65.s=f(U65.si);U65.d=f(U65.di);if(!U65.s)U65.si=null;if(!U65.d)U65.di=null}
function tfUI(msg){if(!me.cls)return;ov.dataset.k='tf';ov.hidden=false;tfFix();const inv=me.inv,S=U65.si,D=U65.di;
  let h=hdr('🔁',TFN.n,'ทอง '+fmtG(me.gold)+' · '+stoneIc(1)+(inv.s1|0)+' '+stoneIc(2)+(inv.s2|0)+' '+stoneIc(3)+(inv.s3|0));if(msg)h+='<div class="note">'+msg+'</div>';
  const cell=(it,ph)=>it?'<div style="flex:0 0 46px">'+cellH(it,'disabled',0,it.sl)+'</div>':'<div class="tfph">'+ph+'</div>';
  h+='<div class="card"><div class="cap">โอนระดับตีบวก</div><div class="tfrow">'+cell(S,'ต้นทาง')+'<div class="tfar">➜</div>'+cell(D,'ปลายทาง')+'</div>';
  if(S&&D){const n=S.u|0,m=D.u|0,err=tfCheck(S,D),st=tfStone(n),cost=tfCost(S,D);
    h+='<div style="font-size:13px;line-height:1.7;margin-top:6px">📤 <b style="color:'+RC[S.r]+'">'+itemName(S)+'</b> ➜ <b>+0</b><br>📥 <b style="color:'+RC[D.r]+'">'+itemName(D)+'</b> ➜ <b style="color:#2a9a4a">+'+n+'</b>'+
      (D.st?'<br>'+Object.keys(D.st).map(k=>stLabel(k,D.st[k]*upMul(m))+' ➜ <b style="color:#2a9a4a">'+stLabel(k,D.st[k]*upMul(n))+'</b>').join('<br>'):'')+
      '<br>💰 ค่าโอน <b>'+cost.toLocaleString()+'</b> ทอง'+(st?'<br>'+stoneIc(st)+' ใช้ '+GDM['s'+st].n+' 2 ก้อน (มี '+(inv['s'+st]|0)+')':'')+'<br>✅ สำเร็จ 100%</div>';
    if(m>0&&!err)h+='<div class="note">⚠️ ปลายทางเดิม +'+m+' จะถูกแทนที่ด้วย +'+n+'</div>';
    if(err)h+='<div class="note">'+err+'</div>';
    else h+='<div class="bt" style="margin-top:8px"><button class="pri" data-tfgo="1">'+(U65.cf?'⚠️ แตะอีกครั้งเพื่อยืนยันโอน +'+n:'🔁 โอน +'+n+' ไปชิ้นใหม่')+'</button></div>'}
  else h+='<div class="card hint" style="margin-top:6px">'+(S?'เลือกชิ้นปลายทาง (อุปกรณ์ช่องเดียวกัน) จากด้านล่าง':'เลือกชิ้นต้นทางที่ตีบวกไว้แล้วจากด้านล่าง')+'</div>';
  h+='</div>';
  const L=tfItems();
  if(!S){const A=L.filter(o=>(o.it.u|0)>=1);h+='<div class="card"><div class="cap">① เลือกต้นทาง (ชิ้นที่ตีบวกแล้ว)</div>'+(A.length?'<div class="grid g5">'+A.map(o=>cellH(o.it,'data-tfs="'+o.k+'"',0,o.it.sl)).join('')+'</div>':'<small>ยังไม่มีอุปกรณ์ที่ตีบวก</small>')+'</div>'}
  else{const A=L.filter(o=>o.it!==S&&o.it.sl===S.sl);h+='<div class="card"><div class="cap">② เลือกปลายทาง <button class="rb" data-tfr="1" style="float:right">เปลี่ยนต้นทาง</button></div>'+
      (A.length?'<div class="grid g5">'+A.map(o=>{const ok=tfCap(o.it)>=(S.u|0)&&(o.it.u|0)<(S.u|0);return ok?cellH(o.it,'data-tfd="'+o.k+'"',U65.di===o.it,o.it.sl):'<div style="opacity:.35">'+cellH(o.it,'disabled',0,o.it.sl)+'</div>'}).join('')+'</div>'+
       '<small style="opacity:.75">ชิ้นสีจาง = เกรดรับ +'+(S.u|0)+' ไม่ไหว หรือบวกสูงกว่าอยู่แล้ว</small>':'<small>ไม่มีอุปกรณ์ช่องเดียวกันชิ้นอื่น</small>')+'</div>'}
  h+='<div class="card hint" style="font-size:12px;line-height:1.6"><b>กติกาการโอน</b><br>• ต้องเป็นอุปกรณ์ช่องเดียวกัน · ต้นทางกลายเป็น +0 (ไม่หาย) · ปลายทางได้ระดับเท่าต้นทาง<br>• ปลายทางต้องรับไหวตามเกรด: ทั่วไป +5 · Mystic +10 · Relic +20 · ชุดเซ็ต/Cosmic +30<br>• ค่าโอน = ทอง 35% ของค่าตีบวกสะสม + หินขั้นนั้น 2 ก้อน (ตั้งแต่ +6) · สำเร็จ 100%</div>';
  ov.innerHTML='<div class="pn" data-pn="tf">'+h+'</div>';tfCSS();
  ov.querySelectorAll('[data-tfs]').forEach(b=>b.onclick=()=>{const o=tfItems().find(q=>q.k===b.dataset.tfs);U65.si=o?o.it:null;U65.di=null;U65.cf=0;try{sfx('click')}catch(e){}tfUI()});
  ov.querySelectorAll('[data-tfd]').forEach(b=>b.onclick=()=>{const o=tfItems().find(q=>q.k===b.dataset.tfd);U65.di=o?o.it:null;U65.cf=0;try{sfx('click')}catch(e){}tfUI()});
  ov.querySelectorAll('[data-tfr]').forEach(b=>b.onclick=()=>{U65.si=null;U65.di=null;U65.cf=0;tfUI()});
  ov.querySelectorAll('[data-tfgo]').forEach(b=>b.onclick=()=>{if(!U65.cf){U65.cf=1;tfUI();return}tfDo()})}
function tfDo(){tfFix();const S=U65.si,D=U65.di,err=tfCheck(S,D);U65.cf=0;if(err)return tfUI(err);
  const n=S.u|0,st=tfStone(n),cost=tfCost(S,D);me.gold-=cost;if(st)me.inv['s'+st]-=2;D.u=n;S.u=0;
  me.stt=me.stt||{};me.stt.tf=(me.stt.tf|0)+1;if(n>=10)me.stt.up10=1;
  try{recalc()}catch(e){}try{writeSave()}catch(e){}try{sfx('up')}catch(e){}try{burst(me.x,me.y-10,['#9ad8ff','#ffe08a','#ffffff'],LOWQ?10:24,120,.6,{glow:1,g:-30})}catch(e){}
  U65.fx=performance.now();U65.si=null;U65.di=null;U65.s=null;U65.d=null;
  tfUI('<span style="color:#2a9a4a">✨ โอนสำเร็จ! '+itemName(D)+'</span>')}
function tfCSS(){if($('tfcss'))return;const st=document.createElement('style');st.id='tfcss';st.textContent='.tfrow{display:flex;align-items:center;justify-content:center;gap:14px;margin:4px 0}.tfar{font-size:22px;color:#c9a050}.tfph{width:46px;height:46px;border:1.5px dashed rgba(201,160,80,.6);border-radius:10px;display:grid;place-items:center;font-size:10px;opacity:.75;text-align:center}';document.head.appendChild(st)}
/* ---------- วาด NPC + แท่นโอนพลัง ---------- */
function drawTfNpc(){if(curMap!==1)return;const N=TFN;if(!inView(N.x,N.y-20,150))return;const t=performance.now()/1000,{O,LG,P,E,R,glow}=NPK,ax=N.x,ay=N.y-40,boost=U65.fx&&performance.now()-U65.fx<1600?1-(performance.now()-U65.fx)/1600:0;
  g.save();g.lineJoin='round';g.lineCap='round';
  /* วงอักขระบนพื้น */
  g.save();g.globalAlpha=.55+.15*Math.sin(t*2);g.strokeStyle='rgba(150,200,255,.7)';g.lineWidth=1.2;g.setLineDash([5,4]);g.lineDashOffset=-t*12;g.beginPath();g.ellipse(ax,ay+12,58,16,0,0,7);g.stroke();g.setLineDash([]);g.restore();
  try{gxShadow(ax,ay+12,50,10,.4)}catch(e){}
  /* แท่นหิน */
  R(ax-50,ay-2,100,14,5,LG(0,ay-2,0,ay+12,['#a8a29a','#7a746c','#5a544c']),O);R(ax-44,ay-8,88,8,3,LG(0,ay-8,0,ay,['#c8c2b8','#9a948a']),O);
  for(let i=-2;i<=2;i++){g.fillStyle='rgba(150,210,255,'+(.35+.3*Math.sin(t*3+i))+')';g.fillRect(ax+i*16-2,ay+3,4,2)}
  /* ทั่ง 2 ข้าง */
  P([ax-40,ay-8,ax-16,ay-8,ax-20,ay-14,ax-12,ay-18,ax-12,ay-21,ax-42,ay-21,ax-46,ay-17,ax-36,ay-14],LG(0,ay-21,0,ay-8,['#6a6e78','#3e424c','#2a2c34']),O,.9);
  P([ax+16,ay-8,ax+40,ay-8,ax+36,ay-14,ax+44,ay-18,ax+44,ay-21,ax+14,ay-21,ax+10,ay-17,ax+20,ay-14],LG(0,ay-21,0,ay-8,['#6a6e78','#3e424c','#2a2c34']),O,.9);
  E(ax-28,ay-25,4,4,LG(0,ay-29,0,ay-21,['#fff0b0','#f0b030']),O,.6);E(ax+28,ay-25,4,4,LG(0,ay-29,0,ay-21,['#e8f6ff','#5ab4ff']),O,.6);
  glow(ax-28,ay-25,12+8*boost,'255,210,120',.5+.4*boost);glow(ax+28,ay-25,12+8*boost,'150,210,255',.5+.4*boost);
  /* สายแสงโค้งจากทั่งซ้าย → ขวา + ลูกแสงไหล */
  {const x0=ax-28,y0=ay-27,x1=ax+28,y1=ay-27,cx=ax,cy=ay-58-4*Math.sin(t*1.7);g.save();g.globalCompositeOperation='lighter';
    g.strokeStyle='rgba(160,210,255,'+(.25+.35*boost)+')';g.lineWidth=5;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(cx,cy,x1,y1);g.stroke();
    g.strokeStyle='rgba(255,245,220,'+(.55+.4*boost)+')';g.lineWidth=1.3;g.stroke();
    for(let i=0;i<5;i++){const q=(t*(.45+boost)+i/5)%1,u=1-q,px=u*u*x0+2*u*q*cx+q*q*x1,py=u*u*y0+2*u*q*cy+q*q*y1;glow(px,py,5,i%2?'255,220,140':'160,220,255',.9);g.fillStyle='#fff';g.beginPath();g.arc(px,py,1.2,0,7);g.fill()}
    g.restore()}
  g.restore();
  /* ตัวช่าง */
  {const x=N.x,y=N.y,f=me.x<x?-1:1,br=Math.sin(t*1.8)*.4,lift=Math.sin(t*2.4);NPK.sh(x,y+16,14);g.save();g.translate(x,y);g.scale(f*1.27,1.27);g.lineJoin='round';g.lineCap='round';
    NP3.legs('#3a3248',['#5a4030','#2a1c12']);
    NP3.robe(['#7a6ab8','#4e3e8a','#2e245a'],'#e8c060',br);
    R(-4.6,-5+br*.3,9.2,13.5,2.2,LG(0,-5,0,9,['#a07048','#6a4426']),O);E(0,-2.4+br*.3,1.2,1.2,'#9ad8ff',O,.4);
    R(-6,1.4,12,2,.6,'#3a2414',O);g.strokeStyle='#9aa0a8';g.lineWidth=.8;g.beginPath();g.moveTo(-5,3.4);g.lineTo(-6,8);g.moveTo(-4,3.4);g.lineTo(-3.4,7.6);g.stroke();
    NP3.arm(5.4,-8+br*.3,9,-6-lift,9.8,-9.6-lift*1.4,'#4e3e8a','#ecc8a0');glow(10,-11-lift*1.4,6,'150,210,255',.7);
    NP3.arm(-5.4,-8+br*.3,-8,-3,-6.4,-.6,'#4e3e8a','#ecc8a0');
    /* หัว: ผ้าคลุมหัว + เครา + แว่นช่างบนหน้าผาก */
    P([-6.4,-13,-5,-21,0.5,-23.6,6,-21,7.4,-13,6,-11.4,-5,-11.4],LG(0,-24,0,-11,['#8a7ac8','#4e3e8a']),O,.8);
    NP3.face(-15.4,['#f2ccA6','#dcaa84','#b48262'],{brow:'#eeeeee'});
    P([-3.6,-13.2,5.2,-13.2,4.4,-9,1,-6.6,-2.6,-9],'#f2f0ea',O,.5);g.strokeStyle='rgba(160,160,170,.6)';g.lineWidth=.4;g.beginPath();g.moveTo(.6,-12.6);g.lineTo(.8,-7.6);g.stroke();
    E(-1.4,-19.2,1.7,1.4,'#f0b040',O,.5);E(2.8,-19.2,1.7,1.4,'#f0b040',O,.5);g.strokeStyle=O;g.lineWidth=.5;g.beginPath();g.moveTo(.3,-19.2);g.lineTo(1.1,-19.2);g.stroke();
    g.restore();
    g.font='11px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';try{u53FT(N.n,x,y-108)}catch(e){g.fillStyle='#ffe0a0';g.fillText(N.n,x,y-108)}
    try{npcSay('tf',x,y,TFSAY,200,50)}catch(e){}}}
try{drawCook=(f=>function(){const r=f.apply(this,arguments);try{drawTfNpc()}catch(e){}return r})(drawCook)}catch(e){}
/* ปุ่มคุย: ใช้ปุ่มคุยเดิม (#npcb) เมื่อไซลัสใกล้ที่สุด */
try{bars=(f=>function(){const r=f.apply(this,arguments);try{U65.near=0;if(curMap===1&&me.cls&&ov.hidden&&!SD.on){const d=Math.hypot(me.x-TFN.x,me.y-TFN.y);if(d<70){const M=MAPS[1];let mn=1e9;['npc','npc2','npc3','npc4','npc5','npc6'].forEach(k=>{const N=M[k];if(N)mn=Math.min(mn,Math.hypot(me.x-N.x,me.y-N.y))});
  if(d<mn){const b=$('npcb');b.textContent='คุยกับ'+TFN.n;b.style.display='block';U65.near=1}}}}catch(e){}return r})(bars)}catch(e){}
setTimeout(()=>{const b=$('npcb');if(b)b.addEventListener('click',e=>{if(U65.near&&curMap===1){e.stopImmediatePropagation();e.preventDefault();U65.si=null;U65.di=null;U65.cf=0;tfUI()}},true)},0);
/* เดินไวในค่าย + คลิกที่ตัว NPC */
try{u64Dest=(f=>function(){const L=f.apply(this,arguments);try{L.splice(3,0,{ic:'🔁',n:TFN.n,x:TFN.x,y:TFN.y+34})}catch(e){}return L})(u64Dest)}catch(e){}
