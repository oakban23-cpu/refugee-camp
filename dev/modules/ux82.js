
/* ===== v478 · แผนที่สมบัติ =====
   ได้แผนที่จาก: มอนในแมพสนาม (หายาก) · มอนดัง 20% · ค่าหัว (ทุกใบ) · ขวดข้อความตอนตกปลา 35% · ร้านกระดานค่าหัว · หีบสมบัติ (ต่อเป็นทอด)
   แผนที่ 3 ระดับ: 🗺️ แผนที่เก่า · ลายแทงทอง · ลายแทงตำนาน — ระดับสูงเจอห้องทองคำ/ผู้พิทักษ์บ่อยขึ้น ของดีขึ้น
   ปริศนา: ภาพสเก็ตช์ของจุดจริงในแมพ (ถ่ายจากเกมตอน build · tmap_build.py) + ชื่อแมพ + ทิศ
     - จุดขุด (TMD): จุดเกิดฝูงจริงที่เดินถึงได้ เลือกจุดที่มีของเด่นในภาพ (ค่าขอบภาพสูง) แมพละ 3 จุด ห่างกัน ≥600
     - ภาพอยู่ใน hd-tmap.webp (โหลดเมื่อเปิดดู · ไม่มีไฟล์ก็วาดแผนที่ร่างแทน)
   ตามหา: ติดตามแผนที่ 1 ใบ → ในแมพนั้นมีป้ายอุณหภูมิใต้แผนที่เล็ก (เย็น → ร้อนมาก) · ใกล้มากมีประกายที่พื้น · ห่าง < 55 ขึ้นปุ่ม ⛏️ ขุด (1.4 วิ ขยับ/โดนตีแล้วยกเลิก)
   ผลการขุด: 📦 หีบสมบัติ · 👹 ผู้พิทักษ์สมบัติ (มอนดังแบบพิเศษ โฮสต์ปล่อย · ล้มแล้วได้หีบใหญ่) · 🌀 ประตูห้องทองคำ 60 วิ (ห้องแยกต่อการขุด · กองทอง หีบ ก็อบลินถุงทอง)
   ปาร์ตี้: แผนที่ที่ติดตามแชร์ให้เพื่อนในปาร์ตี้เห็นภาพ/อุณหภูมิ และขุดแทนได้ · ทุกคนในปาร์ตี้ที่อยู่ใกล้ได้ของจากหีบ/ผู้พิทักษ์ · เข้าห้องทองคำด้วยกันได้
   เซฟ me.tm = {L:[{id,mp,i,q,t}], a ใบที่ติดตาม, n:{d ขุด,v ห้องทองคำ,g ผู้พิทักษ์,c หีบ}} */
const TMQ=[null,{n:'แผนที่เก่า',c:'#c8a060',bg:'#5a4024'},{n:'ลายแทงทอง',c:'#ffc030',bg:'#6a4a10'},{n:'ลายแทงตำนาน',c:'#ff7ad9',bg:'#5a1a4a'}];
const TMMAX=10,TMLV=20,TMDR=55,TMOUT={1:[.64,.28,.08],2:[.5,.33,.17],3:[.3,.38,.32]},TMGB=1<<18;
const TMA={img:null,ok:0,cols:10,w:192,h:140},TMS={pt:{},hud:null,dig:null,glT:0,shT:0,vT:0,near:0,vn:0};
let TMV=null;
function tmSt(){let T=me.tm;if(!T||typeof T!=='object'||!Array.isArray(T.L))T=me.tm=tmClean(T||{})||{L:[],a:'',n:{d:0,v:0,g:0,c:0}};return T}
function tmClean(c){if(!c||typeof c!=='object')return null;const N=(v,mx)=>Math.max(0,Math.min(mx,Math.floor(+v||0)));const o={L:[],a:'',n:{d:0,v:0,g:0,c:0}};
  if(Array.isArray(c.L))c.L.slice(0,TMMAX).forEach(q=>{if(!q||typeof q!=='object')return;const mp=N(q.mp,99),i=N(q.i,9),qq=Math.max(1,Math.min(3,q.q|0));if(!TMD[mp]||!TMD[mp][i])return;const id=String(q.id||'').replace(/[^a-z0-9]/g,'').slice(0,10);if(!id)return;o.L.push({id,mp,i,q:qq,t:N(q.t,4e12)})});
  o.a=o.L.some(q=>q.id===c.a)?String(c.a):'';if(c.n&&typeof c.n==='object')['d','v','g','c'].forEach(k=>o.n[k]=N(c.n[k],1e7));return o}
try{snap=(f=>function(){const o=f.apply(this,arguments);try{if(me.tm)o.tm=tmClean(me.tm)}catch(e){}return o})(snap)}catch(e){}
try{cleanChar=(f=>function(c){const o=f.apply(this,arguments);try{if(o&&c&&c.tm)o.tm=tmClean(c.tm)}catch(e){}return o})(cleanChar)}catch(e){}
try{applySave=(f=>function(c){const r=f.apply(this,arguments);try{me.tm=tmClean(c&&c.tm)||null;TMV=null}catch(e){}return r})(applySave)}catch(e){}
const tmId=()=>Math.random().toString(36).slice(2,10);
function tmMaps(){let R={1:1};try{R=wmReach()}catch(e){}return Object.keys(TMD).map(Number).filter(m=>R[m]&&WMLV[m]&&WMLV[m][0]<=me.lv+5).sort((a,b)=>WMLV[b][1]-WMLV[a][1])}
function tmGive(q,src){if(!me.cls)return false;const T=tmSt();q=Math.max(1,Math.min(3,q|0));if(T.L.length>=TMMAX){banner={s:'🗺️ แผนที่สมบัติเต็ม '+TMMAX+' ใบ — ขุดหรือทิ้งบางใบก่อน',t:3};return false}
  const C=tmMaps();if(!C.length)return false;const P=C.slice(0,8),w=P.map((m,i)=>8-i),sw=w.reduce((a,b)=>a+b,0);let r=Math.random()*sw,mp=P[0];for(let i=0;i<P.length;i++){r-=w[i];if(r<=0){mp=P[i];break}}
  const D=TMD[mp];let i=Math.floor(Math.random()*D.length);for(let k=0;k<D.length&&T.L.some(o=>o.mp===mp&&o.i===i);k++)i=(i+1)%D.length;
  const o={id:tmId(),mp,i,q,t:Date.now()};T.L.push(o);if(!T.a)T.a=o.id;
  banner={s:'🗺️ ได้'+TMQ[q].n+'! ('+(src||'')+') · ดูที่ เมนู › สมบัติ',t:5};try{sysMsg('🗺️ ได้'+TMQ[q].n+' จาก'+(src||'')+' — ชี้ไปที่ '+MAPS[mp].n+' · เปิดดูภาพที่ เมนู › สมบัติ')}catch(e){}
  try{dn.push({x:me.x,y:me.y-70,v:'🗺️ +'+TMQ[q].n,t:1.6,col:TMQ[q].c})}catch(e){}try{sfx('quest')}catch(e){}try{writeSave()}catch(e){}return true}
function tmActive(){const T=tmSt();let o=T.L.find(q=>q.id===T.a)||null;if(!o){const s=TMS.pt;for(const k in s){if(Date.now()-s[k].at<180000){o=s[k];break}}}return o}
function tmSpot(o){const D=TMD[o.mp]&&TMD[o.mp][o.i];return D?{x:D[0],y:D[1],k:D[2]}:null}

/* ---------- ได้แผนที่ ---------- */
qKill=(f=>function(x,y,t,bs){const r=f.apply(this,arguments);try{if(me.cls&&me.lv>=TMLV&&me.down<=0&&Math.hypot(me.x-x,me.y-y)<380&&typeof nmOK==='function'&&nmOK()){const ch=bs?.06:t===2?.006:.0022;if(Math.random()<ch)tmGive(bs&&Math.random()<.3?2:1,bs?'บอส':'มอนสเตอร์')}}catch(e){}return r})(qKill);
nmKill=(f=>function(o){const r=f.apply(this,arguments);try{if(me.cls&&me.lv>=TMLV&&!me.down&&Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0))<=560&&!((o.c|0)&TMGB)&&Math.random()<.2)tmGive(Math.random()<.3?2:1,'มอนดัง')}catch(e){}return r})(nmKill);
btyClaim=(f=>function(S){const B=btySt(),had=!!B.cl[S.bid];const r=f.apply(this,arguments);try{if(!had&&B.cl[S.bid]&&me.lv>=TMLV){const q=S.st===3?(Math.random()<.3?3:2):S.st===2?(Math.random()<.5?2:1):1;tmGive(q,'ค่าหัว')}}catch(e){}return r})(btyClaim);
setTimeout(()=>{try{BTYS.push({k:'tm1',ic:'🗺️',n:'แผนที่เก่า ×1',d:'แผนที่สมบัติชี้ไปแมพที่เหมาะกับเลเวลคุณ',p:6,wk:5,lv:TMLV,f:()=>tmGive(1,'ร้านค่าหัว')},{k:'tm2',ic:'🗺️',n:'ลายแทงทอง ×1',d:'แผนที่ระดับสูง เจอห้องทองคำ/ผู้พิทักษ์บ่อยขึ้น',p:15,wk:2,lv:TMLV,f:()=>tmGive(2,'ร้านค่าหัว')})}catch(e){}},0);

/* ---------- ภาพสเก็ตช์ ---------- */
function tmAtlas(){if(TMA.img)return;TMA.img=new Image();TMA.img.onload=()=>{TMA.ok=1;try{if(!ov.hidden&&ov.dataset.k==='tm')tmDrawAll()}catch(e){}};TMA.img.onerror=()=>{TMA.ok=-1;try{if(!ov.hidden&&ov.dataset.k==='tm')tmDrawAll()}catch(e){}};TMA.img.src='hd-tmap.webp'}
function tmSketch(c,o,big){const x=c.getContext('2d'),w=c.width,h=c.height,S=tmSpot(o);x.clearRect(0,0,w,h);if(!S)return;
  if(TMA.ok===1){const col=S.k%TMA.cols,row=Math.floor(S.k/TMA.cols);x.drawImage(TMA.img,col*TMA.w,row*TMA.h,TMA.w,TMA.h,0,0,w,h)}
  else{/* ไม่มีภาพ: แผนที่ร่างทั้งแมพ + วงกว้าง ๆ */const M=MAPS[o.mp],k=w/3200;x.fillStyle='#e8d2a0';x.fillRect(0,0,w,h);x.save();x.scale(1,h/w);x.fillStyle=M.bg||'#6a5a3a';x.globalAlpha=.25;x.fillRect(0,0,w,w);x.globalAlpha=1;
    x.strokeStyle='rgba(90,60,30,.5)';x.setLineDash([3,3]);(M.gates||[]).forEach(G=>{if(G.to<10000){x.beginPath();x.arc(G.x*k,G.y*k,3,0,7);x.stroke()}});x.setLineDash([]);
    const ox=(S.x*k)+((o.id.charCodeAt(0)%7)-3)*w/40,oy=(S.y*k)+((o.id.charCodeAt(1)%7)-3)*w/40;x.fillStyle='rgba(180,40,20,.25)';x.beginPath();x.arc(ox,oy,w*.12,0,7);x.fill();x.restore();
    if(TMA.ok===0){x.fillStyle='rgba(80,50,20,.7)';x.font='10px system-ui';x.textAlign='center';x.fillText('กำลังโหลดภาพ…',w/2,h-8)}return}
  /* กากบาทกลางภาพ */const cx=w/2,cy=h/2,s=Math.max(6,w*.05);x.save();x.strokeStyle='rgba(160,20,10,.9)';x.lineWidth=Math.max(2,w*.018);x.lineCap='round';x.beginPath();x.moveTo(cx-s,cy-s);x.lineTo(cx+s,cy+s);x.moveTo(cx+s,cy-s);x.lineTo(cx-s,cy+s);x.stroke();x.restore();
  /* ขอบไหม้ */const gr=x.createRadialGradient(cx,cy,Math.min(w,h)*.35,cx,cy,Math.max(w,h)*.62);gr.addColorStop(0,'rgba(90,50,20,0)');gr.addColorStop(1,'rgba(70,36,12,.55)');x.fillStyle=gr;x.fillRect(0,0,w,h)}
function tmDrawAll(){ov.querySelectorAll('canvas[data-tms]').forEach(c=>{const id=c.dataset.tms,o=tmSt().L.find(q=>q.id===id)||Object.values(TMS.pt).find(q=>q.id===id);if(o)tmSketch(c,o)})}
function tmTemp(d){return d>1100?['❄️','ยังไกลอยู่','#9ad0ff']:d>700?['🌤️','อุ่นขึ้นแล้ว','#ffe08a']:d>400?['🔥','ร้อน','#ffb04a']:d>180?['🔥🔥','ร้อนมาก!','#ff7a3a']:['✨','อยู่แถวนี้แหละ!','#fff0a0']}

/* ---------- หน้าแผนที่สมบัติ ---------- */
function tmUI(msg,big){if(!me.cls)return;tmAtlas();ov.dataset.k='tm';ov.hidden=false;const T=tmSt(),A=tmActive();
  let h=hdr('🗺️','แผนที่สมบัติ','มี '+T.L.length+'/'+TMMAX+' ใบ · ขุดแล้ว '+T.n.d+' ครั้ง');if(msg)h+='<div class="note">'+msg+'</div>';
  if(big){const o=T.L.find(q=>q.id===big)||Object.values(TMS.pt).find(q=>q.id===big);if(o){h+='<div class="tmbig"><canvas width="'+TMA.w*2+'" height="'+TMA.h*2+'" data-tms="'+o.id+'"></canvas><div class="tmcap"><b style="color:'+TMQ[o.q].c+'">'+TMQ[o.q].n+'</b> · 📍 '+MAPS[o.mp].n+'<br><small>หาจุดในแมพที่หน้าตาเหมือนภาพนี้ แล้วขุดตรงกากบาท</small></div><div class="bt"><button data-tmbk="1">← กลับ</button></div></div>';
    ov.innerHTML='<div class="pn tmpn" data-pn="tm">'+h+'</div>';tmCSS();tmDrawAll();ov.querySelectorAll('[data-tmbk]').forEach(b=>b.onclick=()=>tmUI());return}}
  if(me.lv<TMLV)h+='<div class="card hint">🔒 แผนที่สมบัติเริ่มดรอปที่ Lv '+TMLV+'</div>';
  const card=(o,mine,from)=>{const S=tmSpot(o),here=curMap===o.mp,d=here&&S?Math.hypot(me.x-S.x,me.y-S.y):0,tp=here?tmTemp(d):null,on=A&&A.id===o.id;
    return'<div class="tmc'+(on?' on':'')+'" style="--q:'+TMQ[o.q].c+'"><canvas width="'+TMA.w+'" height="'+TMA.h+'" data-tms="'+o.id+'" data-tmz="'+o.id+'"></canvas><div class="tmi"><b>'+TMQ[o.q].n+(from?' <small>(ของ '+from+')</small>':'')+'</b>'+
     '<small>📍 '+((WMN[o.mp]&&WMN[o.mp][3])||'')+' '+MAPS[o.mp].n+'<br>🧭 จุดซ่อน'+(S?nmDir(S.x,S.y):'')+'</small>'+(tp?'<small class="tmt" style="color:'+tp[2]+'">'+tp[0]+' '+tp[1]+'</small>':'')+
     '<div class="tmb">'+(mine?(on?'<button disabled>📌 กำลังติดตาม</button>':'<button class="pri" data-tma="'+o.id+'">📌 ติดตาม</button>')+(here?'':'<button data-tmw="'+o.mp+'">🗺️</button>')+'<button data-tmx="'+o.id+'">🗑️</button>':'<button data-tmw="'+o.mp+'">🗺️ แผนที่โลก</button>')+'</div></div></div>'};
  h+=T.L.length?T.L.map(o=>card(o,1)).join(''):'<div class="card hint">ยังไม่มีแผนที่สมบัติ · ได้จากมอนในแมพสนาม (หายาก) มอนดัง ค่าหัว ขวดข้อความตอนตกปลา หรือแลกที่กระดานค่าหัว</div>';
  const pt=Object.values(TMS.pt).filter(o=>Date.now()-o.at<180000);if(pt.length)h+='<div class="card"><div class="cap">👥 แผนที่ของเพื่อนในปาร์ตี้</div><small>ช่วยกันหาแล้วขุดแทนได้ ทุกคนที่อยู่ใกล้ได้ของ</small></div>'+pt.map(o=>card(o,0,o.n)).join('');
  h+='<div class="card"><div class="byst"><div><b>'+T.n.d+'</b><small>ขุดแล้ว</small></div><div><b>'+T.n.c+'</b><small>หีบสมบัติ</small></div><div><b>'+T.n.g+'</b><small>ผู้พิทักษ์</small></div><div><b>'+T.n.v+'</b><small>ห้องทองคำ</small></div></div></div>';
  h+='<div class="card hint">📌 ติดตามแผนที่ 1 ใบ แล้วไปที่แมพนั้น ใต้แผนที่เล็กจะบอกว่าใกล้หรือไกล (เย็น → ร้อนมาก) · ใกล้มากจะเห็นประกายที่พื้น · ยืนตรงจุดแล้วกด ⛏️ ขุด · ขุดแล้วอาจเจอ 📦 หีบสมบัติ 👹 ผู้พิทักษ์ หรือ 🌀 ประตูห้องทองคำ (ลายแทงระดับสูงเจอบ่อยกว่า) · แผนที่ที่ติดตามแชร์ให้เพื่อนในปาร์ตี้ช่วยหาได้</div>';
  ov.innerHTML='<div class="pn tmpn" data-pn="tm">'+h+'</div>';tmCSS();tmDrawAll();
  ov.querySelectorAll('[data-tma]').forEach(b=>b.onclick=()=>{tmSt().a=b.dataset.tma;tmShare();try{writeSave()}catch(e){}tmUI('📌 ติดตามแผนที่ใบนี้แล้ว')});
  ov.querySelectorAll('[data-tmw]').forEach(b=>b.onclick=()=>{ov.hidden=true;try{wmUI(+b.dataset.tmw)}catch(e){}});
  ov.querySelectorAll('[data-tmz]').forEach(c=>c.onclick=()=>tmUI(null,c.dataset.tmz));
  ov.querySelectorAll('[data-tmx]').forEach(b=>b.onclick=()=>{if(b.dataset.cf!=='1'){b.dataset.cf='1';b.textContent='ทิ้งจริง?';return}const T=tmSt();T.L=T.L.filter(q=>q.id!==b.dataset.tmx);if(T.a===b.dataset.tmx)T.a=T.L[0]?T.L[0].id:'';try{writeSave()}catch(e){}tmUI('ทิ้งแผนที่แล้ว')})}
function tmCSS(){if($('tmcss'))return;const st=document.createElement('style');st.id='tmcss';st.textContent=
 '.tmc{display:flex;gap:9px;margin:8px 0;padding:8px;border-radius:10px;background:linear-gradient(#f6e6c4,#e6cf9c);border:1.5px solid var(--q);box-shadow:inset 0 0 14px rgba(110,70,20,.2);color:#3a2410}.tmc.on{box-shadow:0 0 0 2px var(--q),inset 0 0 14px rgba(110,70,20,.2)}'+
 '.tmc canvas{flex:0 0 132px;width:132px;height:96px;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,.35);cursor:zoom-in;background:#e8d2a0}.tmi{flex:1;min-width:0}.tmi b{display:block;font-size:14px;color:#6a2a10}.tmi b small{font-weight:400;color:#7a5a38}.tmi small{display:block;font-size:11.5px;line-height:1.45;color:#6a4a28}'+
 '.tmi .tmt{font-weight:800;font-size:12.5px;text-shadow:0 1px 0 #0003}.tmb{display:flex;gap:5px;flex-wrap:wrap;margin-top:5px}.tmb button{padding:4px 9px;font-size:12px}'+
 '.tmbig{text-align:center}.tmbig canvas{width:100%;max-width:384px;aspect-ratio:192/140;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.45);background:#e8d2a0}.tmcap{margin:8px 0;font-size:13px}.tmcap small{opacity:.8}'+
 '#tmh{position:absolute;z-index:6;display:flex;align-items:center;gap:5px;padding:3px 7px 3px 3px;border-radius:10px;background:rgba(30,18,8,.82);border:1px solid rgba(255,200,120,.55);color:#ffe8c0;font:700 11px system-ui;pointer-events:auto;cursor:pointer;max-width:150px}'+
 '#tmh canvas{width:42px;height:31px;border-radius:4px;flex:0 0 42px}#tmh span{line-height:1.25}#tmh small{display:block;font-weight:400;opacity:.85;font-size:10px}'+
 '#tmdg{position:absolute;left:50%;transform:translateX(-50%);bottom:34%;z-index:7;padding:6px 14px;border-radius:12px;background:rgba(30,18,8,.86);border:1px solid #c8a060;color:#ffe8c0;font:700 13px system-ui;text-align:center;pointer-events:none}#tmdg i{display:block;height:5px;margin-top:5px;border-radius:3px;background:#5a3a1a;overflow:hidden}#tmdg i b{display:block;height:100%;width:0;background:linear-gradient(90deg,#ffc040,#fff0a0)}'+
 '#tmvh{position:absolute;left:50%;transform:translateX(-50%);top:62px;z-index:6;padding:4px 12px;border-radius:12px;background:rgba(60,40,0,.85);border:1px solid #ffd060;color:#fff0b0;font:800 13px system-ui;pointer-events:none}';document.head.appendChild(st)}
function tmBtn(){if($('tmb'))return;const ref=$('byb')||$('wmm')||$('dgm');if(!ref||!ref.parentNode)return;const b=document.createElement('button');b.id='tmb';b.innerHTML='<i>🗺️</i><span>สมบัติ</span><b class="bd"></b>';ref.parentNode.insertBefore(b,ref.nextSibling);
  b.onclick=()=>{try{$('mnp').hidden=true}catch(e){}tmUI()}}
setTimeout(()=>{try{tmBtn()}catch(e){}},50);

/* ---------- แชร์ในปาร์ตี้ ---------- */
function tmShare(){try{if(!PTY||PTY.mem.length<2)return;const o=tmSt().L.find(q=>q.id===tmSt().a);if(!o)return;PTY.mem.forEach(m=>{if(m.u!==uid)ptOut(m.u,'tm',{tm:{id:o.id,mp:o.mp,i:o.i,q:o.q}})})}catch(e){}}
setInterval(()=>{try{if(me.cls&&PTY&&PTY.mem.length>1)tmShare()}catch(e){}},45000);
ptMsg=(f=>function(d){try{if(d&&d.to===uid&&typeof d.from==='string'&&(d.op==='tm'||d.op==='tmx')){if(!PTY||!PTY.mem.some(m=>m.u===d.from))return;
  if(d.op==='tmx'){const T=tmSt(),id=String(d.id||'');if(T.L.some(q=>q.id===id)){T.L=T.L.filter(q=>q.id!==id);if(T.a===id)T.a=T.L[0]?T.L[0].id:'';try{writeSave()}catch(e){}sysMsg('🗺️ เพื่อนในปาร์ตี้ขุดแผนที่ของคุณแล้ว')}return}
  const t=d.tm||{},mp=t.mp|0,i=t.i|0;if(!TMD[mp]||!TMD[mp][i])return;const id=String(t.id||'').replace(/[^a-z0-9]/g,'').slice(0,10);if(!id)return;const nw=!TMS.pt[d.from]||TMS.pt[d.from].id!==id;
  TMS.pt[d.from]={id,mp,i,q:Math.max(1,Math.min(3,t.q|0)),o:d.from,n:(PTY.mem.find(m=>m.u===d.from)||{}).n||'เพื่อน',at:Date.now()};if(nw)sysMsg('🗺️ '+TMS.pt[d.from].n+' แชร์แผนที่สมบัติ ('+MAPS[mp].n+') · ช่วยกันหาได้ที่ เมนู › สมบัติ');return}}catch(e){}return f.apply(this,arguments)})(ptMsg);

/* ---------- ตามหา · ขุด (ต่อเฟรม) ---------- */
function tmHud(o,S,d){let e=$('tmh');const app=$('app');if(!o){if(e)e.hidden=true;return}if(!e){e=document.createElement('div');e.id='tmh';e.innerHTML='<canvas width="96" height="70"></canvas><span></span>';(app||document.body).appendChild(e);e.onclick=()=>{const a=tmActive();tmUI(null,a&&a.id)};tmCSS()}
  const nw=performance.now();if(!(e.__pt>nw-600)||e.hidden){e.__pt=nw;const r=cv.getBoundingClientRect(),ar=(app||document.body).getBoundingClientRect(),k=r.width/W;e.style.top=Math.round(r.top-ar.top+(20+40*2+8)*k+40)+'px';e.style.right=Math.round(ar.right-r.right+6)+'px'}e.hidden=false;
  const tp=tmTemp(d),sp=e.querySelector('span'),tx=tp[0]+' '+tp[1]+'<small>'+TMQ[o.q].n+(o.o?' · ของ'+o.n:'')+'</small>';if(sp.innerHTML!==tx){sp.innerHTML=tx;sp.style.color=tp[2]}
  if(e.dataset.id!==o.id||e.dataset.ok!==String(TMA.ok)){e.dataset.id=o.id;e.dataset.ok=String(TMA.ok);tmSketch(e.querySelector('canvas'),o)}}
function tmTick(dt){if(!me.cls||!run)return;const now=performance.now();
  if(TMV&&curMap!==TMV.vid){TMV=null;const e=$('tmvh');if(e)e.hidden=true}
  if(TMV)return tmVaultTick(dt,now);
  const o=tmActive(),S=o&&curMap===o.mp?tmSpot(o):null;let d=S?Math.hypot(me.x-S.x,me.y-S.y):1e9;
  if(S&&ov.hidden&&!SD.on)tmAtlas();tmHud(S&&!SD.on?o:null,S,d);
  if(S&&d<220&&now-TMS.glT>1800){TMS.glT=now;try{fxs.push({k:'tmgl',x:S.x,y:S.y,r:18,t:1.2,d:1.2,s:Math.random()*99})}catch(e){}}
  if(TMS.dig){const D=TMS.dig,el=$('tmdg');if(Math.hypot(me.x-D.x,me.y-D.y)>14||me.down>0||curMap!==D.mp){tmDigStop('ขยับตัว — การขุดถูกยกเลิก');return}
    const p=(now-D.t0)/1400;if(el){const b=el.querySelector('i b');if(b)b.style.width=Math.min(100,p*100)+'%'}if(now-TMS.shT>220){TMS.shT=now;try{burst(D.sx,D.sy+2,['#8a6a40','#c8a070','#5a4024'],LOWQ?3:6,70,.5,{g:160})}catch(e){}}
    if(p>=1){TMS.dig=null;if(el)el.remove();tmDug(D)}}}
fevClient=(f=>function(dt){const r=f.apply(this,arguments);try{tmTick(dt)}catch(e){}return r})(fevClient);
hurt=(f=>function(d){const h0=me.hp;const r=f.apply(this,arguments);try{if(TMS.dig&&me.hp<h0)tmDigStop('💢 โดนโจมตี — การขุดถูกยกเลิก')}catch(e){}return r})(hurt);
function tmDigStop(m){TMS.dig=null;const e=$('tmdg');if(e)e.remove();if(m)banner={s:m,t:2}}
function tmDigStart(){const o=tmActive(),S=o&&tmSpot(o);if(!S||curMap!==o.mp||TMS.dig)return;if(Math.hypot(me.x-S.x,me.y-S.y)>TMDR+8)return;
  TMS.dig={id:o.id,o:o.o||'',q:o.q,mp:o.mp,x:me.x,y:me.y,sx:S.x,sy:S.y,t0:performance.now()};let e=$('tmdg');if(!e){e=document.createElement('div');e.id='tmdg';($('app')||document.body).appendChild(e)}e.innerHTML='⛏️ กำลังขุด…<i><b></b></i>';tmCSS();try{sfx('hit')}catch(e){}}
try{bars=(f=>function(){const r=f.apply(this,arguments);try{TMS.near=0;TMS.vn=0;if(me.cls&&ov.hidden&&!SD.on&&!(typeof BTYN!=='undefined'&&BTYN.near)){const b=$('npcb');
  if(TMV){const d=Math.hypot(me.x-CX,me.y-(CY+345));if(d<60){b.textContent='🚪 ออกจากห้องทองคำ';b.style.display='block';TMS.vn=2}}
  else{const o=tmActive(),S=o&&curMap===o.mp?tmSpot(o):null;if(S&&!TMS.dig&&Math.hypot(me.x-S.x,me.y-S.y)<TMDR){b.textContent='⛏️ ขุดสมบัติตรงนี้';b.style.display='block';TMS.near=1}
    else if(TMS.vp&&TMS.vp.mp===curMap&&performance.now()<TMS.vp.until&&Math.hypot(me.x-TMS.vp.x,me.y-TMS.vp.y)<70){b.textContent='🌀 เข้าห้องทองคำ';b.style.display='block';TMS.vn=1}}}}catch(e){}return r})(bars)}catch(e){}
setTimeout(()=>{const b=$('npcb');if(b)b.addEventListener('click',e=>{if(TMS.near||TMS.vn){e.stopImmediatePropagation();e.preventDefault();if(TMS.near)tmDigStart();else if(TMS.vn===1)tmVaultEnter(TMS.vp);else tmVaultExit()}},true)},0);

/* ---------- ผลการขุด ---------- */
function tmDug(D){const T=tmSt(),own=T.L.find(q=>q.id===D.id);
  if(own){T.L=T.L.filter(q=>q.id!==D.id);if(T.a===D.id)T.a=T.L[0]?T.L[0].id:''}else if(D.o){try{ptOut(D.o,'tmx',{id:D.id})}catch(e){}delete TMS.pt[D.o]}
  T.n.d++;const P=TMOUT[D.q]||TMOUT[1],r=typeof window.__tmR==='number'?window.__tmR:Math.random(),k=r<P[0]?'c':r<P[0]+P[1]?'g':'v';const L=Math.max(1,(WMLV[curMap]?WMLV[curMap][1]:me.lv)|0);
  fx({k:'tmdg',x:Math.round(D.sx),y:Math.round(D.sy),r:40,q:D.q,o:k,L,pu:PTY&&PTY.mem.length>1?PTY.id:''});
  if(k==='g'){T.n.g++;fx({k:'tmsum',mp:curMap,x:Math.round(D.sx),y:Math.round(D.sy),q:D.q,o:uid,pu:PTY&&PTY.mem.length>1?PTY.id:'',L});banner={s:'👹 ผู้พิทักษ์สมบัติโผล่ออกมาจากหลุม! ล้มมันเพื่อเปิดหีบ',t:4}}
  else if(k==='v'){T.n.v++;const vid=100001+hseed('vault'+uid+':'+D.id)%9998;TMS.vp={vid,x:D.sx,y:D.sy,q:D.q,L,mp:curMap,o:uid,until:performance.now()+15000};fx({k:'tmvp',x:Math.round(D.sx),y:Math.round(D.sy),r:46,vid,q:D.q,L,o:uid,pu:PTY&&PTY.mem.length>1?PTY.id:'',dur:15});banner={s:'🌀 ประตูลับสู่ห้องทองคำเปิดแล้ว! เดินเข้าประตูภายใน 15 วิ',t:5}}
  else{T.n.c++;banner={s:'📦 เจอหีบสมบัติ!',t:3}}
  try{writeSave()}catch(e){}}
function tmPartyOK(pu,o){return o===uid||(!!pu&&PTY&&PTY.id===pu)}
function tmChest(q,L,x,y,big){const IL=iLv(L),tr=Math.max(1,tierRw()),gd=Math.round((big?90:60)*L*q*tr);
  for(let i=0;i<5;i++){const a=i*1.2566+Math.random()*.4,dd=16+Math.random()*20;drops.push({x:x+Math.cos(a)*dd,y:y+Math.sin(a)*dd*.7,k:'g',v:Math.round(gd/5),t:60})}
  const rm=q>=3?(Math.random()<.4?5:4):q===2?4:(Math.random()<.25?4:3);drops.push({x:x-10,y:y+10,k:'e',L:IL,rm,t:120});if(big||q>=2)drops.push({x:x+12,y:y+12,k:'e',L:IL,rm:Math.max(3,rm-1),t:120});if(Math.random()<.03*q+(big?.03:0))drops.push({x:x,y:y-12,k:'e',L:IL,rm:4,lg:1,t:120});
  try{if(me.lv>=40&&q>=2)gdSet('s2',gdGet('s2')+(q===3?2:1));else gdSet('s1',gdGet('s1')+1+q)}catch(e){}try{rnShard(5*q+(big?5:0))}catch(e){}
  if(Math.random()<.1)setTimeout(()=>{try{tmGive(Math.random()<.2?2:1,'หีบสมบัติ')}catch(e){}},900);
  try{sfx('lg_drop')}catch(e){}try{burst(x,y-10,['#ffd84a','#fff4c0','#c8a060'],LOWQ?12:30,190,.9,{glow:1,g:-50})}catch(e){}
  try{dn.push({x,y:y-60,v:'📦 '+(big?'หีบผู้พิทักษ์':'หีบสมบัติ')+' · '+fmtG(gd)+' ทอง · '+RNE[rm],t:2.2,col:'#ffe08a'})}catch(e){}}
handleFx=(f=>function(o){if(o&&typeof o.k==='string'&&o.k.charCodeAt(0)===116&&o.k.charCodeAt(1)===109){try{const k=o.k,d=me.cls?Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0)):1e9;
  if(k==='tmsum'){if(isHost()&&(o.mp|0)===curMap)tmGuardSpawn(o);return}
  if(k==='tmdg'&&me.cls&&d<520){shk=Math.max(shk,.15);try{GX.dec.push({x:+o.x,y:+o.y+4,r:34,t:'crack',v:1,s:performance.now(),l:6000})}catch(e){}
    if(o.o==='c'&&tmPartyOK(o.pu,o.by)&&d<520&&me.down<=0)tmChest(Math.max(1,Math.min(3,o.q|0)),Math.max(1,o.L|0),+o.x,+o.y,0)}
  if(k==='tmvp'&&me.cls&&o.by!==uid&&tmPartyOK(o.pu,o.by)&&d<520)TMS.vp={vid:o.vid|0,x:+o.x,y:+o.y,q:o.q|0,L:o.L|0,mp:curMap,o:String(o.o||''),until:performance.now()+15000};
  }catch(e){}}return f.apply(this,arguments)})(handleFx);
/* ผู้พิทักษ์สมบัติ: มอนดังแบบพิเศษ (บิต 18) · โฮสต์ปล่อยที่หลุม · ล้มแล้วเจ้าของ/ปาร์ตี้ได้หีบใหญ่ */
function tmGuardSpawn(o){if(!nmOK())return;if(mons.some(m=>m.nm&&(m.nm&TMGB)&&m.hp>0&&m.tmo===o.by&&Math.hypot(m.x-o.x,m.y-o.y)<300))return;
  const q=Math.max(1,Math.min(3,o.q|0)),R=nmRng(Date.now()%1e6+(o.x|0)),af=nmPick(R,q>=2?2:1);let c=TMGB;af.forEach(i=>c|=1<<i);c|=Math.floor(R()*64)<<9;
  const L=Math.min(150,(WMLV[curMap]?WMLV[curMap][1]:20)+q),t=2,hp=mhp(t,L),x=+o.x,y=+o.y;
  const m={id:++mid,x,y,tx:x,ty:y,t,L,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:1.2,w:null,lg:0,el:1+Math.floor(R()*6),nmb:1,elb:1};m.hp*=EKHP;m.mh*=EKHP;m.dmx=1.5;nmMake(m,c);m.tmo=String(o.by||'');m.tmq=q;m.tmp=String(o.pu||'');m.root=1.1;mons.push(m);
  fx({k:'nmbs',x:Math.round(x),y:Math.round(y),r:90,c,L})}
nmKill=(f=>function(o){const r=f.apply(this,arguments);try{if(((o.c|0)&TMGB)&&me.cls&&me.down<=0&&Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0))<=560&&tmPartyOK(o.pu,o.o)){const q=Math.max(1,Math.min(3,o.q|0));tmChest(q,Math.max(1,o.L|0),+o.x,+o.y,1);if(o.o===uid)tmSt().n.c++}}catch(e){}return r})(nmKill);

/* ---------- ห้องทองคำ (แมพแยกต่อการขุด 100001–109998 · พ้นช่วงดันเจี้ยน 10000–89999 และเต็นท์ 90001–99998 · เซิร์ฟเวอร์รับ mp ถึง 199999) ---------- */
function tmVaultMap(vid,q,L){return MAPS[vid]={n:'ห้องทองคำ',sx:CX,sy:CY+300,sr:0,seed:91,bg:'#120a02',tile:'#120a02',safe:'#120a02',ring:'rgba(0,0,0,0)',t1:'#120a02',t2:'#120a02',d1:'#120a02',d2:'#120a02',nests:[],hub:1,vault:{q,L},
  gates:[],qk:1,ql:1,npc:{x:-9999,y:-9999,n:'',L:1},boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:1,rm:0,g:0,dm:1,tn:1,sm:0,col:'#6a4a98',bar:'#6a4a9a',ln:'#c8a8ff',rec:'',pos:''}}}
function tmVaultEnter(V){if(!V||!me.cls||me.down>0)return;const q=Math.max(1,Math.min(3,V.q|0)),L=Math.max(1,V.L|0),back={mp:curMap,x:V.x,y:V.y+50},tr=Math.max(1,tierRw());tmVaultMap(V.vid,q,L);TMS.vp=null;
  try{FS.open&&fsClose()}catch(e){}try{WP&&wpCancel()}catch(e){}ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(V.vid,{x:CX,y:CY+190});try{trees.length=0}catch(e){}
  TMV={vid:V.vid,q,L,back,until:performance.now()+60000,ch:[[CX-230,CY-120,0],[CX+230,CY-120,0],[CX,CY-280,0]],gs:0};
  const n=22+q*4,gv=Math.max(5,Math.round(14*L*q*tr));for(let i=0;i<n;i++){const a=i*2.399,rr=90+(i*53)%250;drops.push({x:CX+Math.cos(a)*rr,y:CY+Math.sin(a)*rr*.8,k:'g',v:gv,t:70})}
  banner={s:'🪙 ห้องทองคำ! เก็บทองให้ได้มากที่สุดใน 60 วิ · หีบ 3 ใบ · ไล่จับก็อบลินถุงทอง',t:5};try{sfx('lvl')}catch(e){}}
function tmVaultExit(){if(!TMV)return;const B=TMV.back;TMV=null;const e=$('tmvh');if(e)e.hidden=true;try{sfx('gate')}catch(e){}if(B&&MAPS[B.mp])enterMap(B.mp,{x:B.x,y:B.y});else enterMap(1,{x:MAPS[1].sx,y:MAPS[1].sy})}
function tmVaultTick(dt,now){const V=TMV,left=Math.max(0,Math.ceil((V.until-now)/1000));let e=$('tmvh');if(!e){e=document.createElement('div');e.id='tmvh';($('app')||document.body).appendChild(e);tmCSS()}e.hidden=false;const tx='🪙 ห้องทองคำ · เหลือ '+left+' วิ';if(e.textContent!==tx)e.textContent=tx;
  if(isHost()&&!V.gs&&run){V.gs=1;if(!mons.some(m=>m.tgb))[[-160,60],[170,40]].forEach(([dx,dy])=>{try{spawnTgb(CX+dx,CY+dy,V.L)}catch(e){}})}
  if(isHost())for(const m of mons){const dx=m.x-CX,dy=(m.y-CY)/.82,d=Math.hypot(dx,dy);if(d>380){m.x=CX+dx/d*380;m.y=CY+dy/d*380*.82}}
  for(const c of V.ch){if(!c[2]&&Math.hypot(me.x-c[0],me.y-c[1])<40){c[2]=1;tmChest(V.q,V.L,c[0],c[1]+20,0);try{fxs.push({k:'tmch',x:c[0],y:c[1],r:30,t:1,d:1,s:0})}catch(e){}}}
  if(now>=V.until){banner={s:'🪙 หมดเวลาห้องทองคำ — กลับสู่โลกภายนอก',t:3};tmVaultExit()}}
try{tentCollide=(f=>function(){const r=f.apply(this,arguments);try{const M=MAPS[curMap];if(M&&M.vault){const dx=me.x-CX,dy=(me.y-CY)/.82,d=Math.hypot(dx,dy),R=430;if(d>R){me.x=CX+dx/d*R;me.y=CY+dy/d*R*.82}}}catch(e){}return r})(tentCollide)}catch(e){}
drawTent=(f=>function(){const M=MAPS[curMap];if(M&&M.vault){try{tmVaultDraw(M)}catch(e){}return}return f.apply(this,arguments)})(drawTent);
function tmVaultDraw(M){const t=performance.now()/1000,R=440;g.save();g.fillStyle='#0c0702';g.fillRect(cam.x-30,cam.y-30,W+60,H+60);
  /* พื้นหินอ่อนทอง */const gr=g.createRadialGradient(CX,CY,40,CX,CY,R);gr.addColorStop(0,'#8a6420');gr.addColorStop(.6,'#5a3e12');gr.addColorStop(1,'#2a1a06');g.fillStyle=gr;g.beginPath();g.ellipse(CX,CY,R,R*.82,0,0,7);g.fill();
  g.strokeStyle='rgba(255,215,120,.16)';g.lineWidth=1.4;for(let r=70;r<R;r+=70){g.beginPath();g.ellipse(CX,CY,r,r*.82,0,0,7);g.stroke()}for(let i=0;i<16;i++){const a=i*.3927;g.beginPath();g.moveTo(CX+Math.cos(a)*70,CY+Math.sin(a)*70*.82);g.lineTo(CX+Math.cos(a)*R,CY+Math.sin(a)*R*.82);g.stroke()}
  /* วงอักขระกลาง */g.save();g.translate(CX,CY);g.scale(1,.82);g.rotate(t*.15);g.strokeStyle='rgba(255,220,130,.45)';g.lineWidth=2;g.setLineDash([10,7]);g.beginPath();g.arc(0,0,60,0,7);g.stroke();g.setLineDash([]);g.restore();
  /* กองทองรอบห้อง */for(let i=0;i<18;i++){const a=i*.349+.17,x=CX+Math.cos(a)*(R-46),y=CY+Math.sin(a)*(R-46)*.82;if(y>CY+R*.6&&Math.abs(x-CX)<90)continue;const s=16+(i*7)%12;
    g.fillStyle='#6a4a10';g.beginPath();g.ellipse(x,y+4,s*1.2,s*.45,0,0,7);g.fill();g.fillStyle='#e8b830';g.beginPath();g.moveTo(x-s*1.1,y+3);g.quadraticCurveTo(x,y-s*1.3,x+s*1.1,y+3);g.closePath();g.fill();g.fillStyle='#ffe27a';g.beginPath();g.moveTo(x-s*.6,y-1);g.quadraticCurveTo(x-s*.1,y-s*1.05,x+s*.4,y-2);g.closePath();g.fill();
    if((i*13+Math.floor(t*2))%7===0){glowAt(x+s*.3,y-s*.6,8,'255,240,180',.9)}}
  /* เสา */for(let i=0;i<8;i++){const a=i*.785+.39,x=CX+Math.cos(a)*(R+6),y=CY+Math.sin(a)*(R+6)*.82;g.fillStyle='#3a2810';g.fillRect(x-9,y-70,18,74);g.fillStyle='#c8a050';g.fillRect(x-11,y-74,22,6);g.fillRect(x-11,y,22,5);glowAt(x,y-80,12,'255,190,90',.5+.2*Math.sin(t*3+i))}
  /* หีบ */for(const c of (TMV?TMV.ch:[])){const [x,y,o]=c;g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,y+12,20,6,0,0,7);g.fill();g.fillStyle=o?'#5a3a18':'#8a5a24';g.fillRect(x-17,y-8,34,20);g.fillStyle='#d8a838';g.fillRect(x-17,y-2,34,3);g.fillRect(x-2,y-8,4,20);
    if(!o){g.fillStyle='#a8702c';g.beginPath();g.moveTo(x-17,y-8);g.quadraticCurveTo(x,y-22,x+17,y-8);g.closePath();g.fill();glowAt(x,y-8,22,'255,220,120',.35+.15*Math.sin(t*4))}else{g.fillStyle='#3a240c';g.fillRect(x-17,y-14,34,6)}}
  /* ประตูออก */{const x=CX,y=CY+345;g.save();g.globalCompositeOperation='lighter';const pu=.5+.5*Math.sin(t*3);g.strokeStyle='rgba(150,220,255,'+(.5+.3*pu)+')';g.lineWidth=3;g.beginPath();g.ellipse(x,y,30,11,0,0,7);g.stroke();glowAt(x,y-20,36,'140,200,255',.45);g.restore();
    g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#cfe8ff';g.fillText('🚪 ทางออก',x,y+26)}
  /* ประกายลอย */g.save();g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?10:26);i++){const q=(t*.2+i*.137)%1,x=CX+Math.sin(i*12.9)*R*.85,y=CY+Math.cos(i*7.3)*R*.6-q*80;g.fillStyle='rgba(255,230,150,'+(.7*(1-q))+')';g.fillRect(x,y,2,2)}g.restore();g.restore()}

/* ---------- ภาพ fx ---------- */
FXB.tmgl=(f,p,x,y)=>{const a=Math.sin(p*3.1416);g.save();g.globalCompositeOperation='lighter';glowAt(x,y-4,22,'255,230,140',.8*a);g.strokeStyle='rgba(255,250,210,'+a+')';g.lineWidth=1.5;g.beginPath();g.moveTo(x-9*a,y-4);g.lineTo(x+9*a,y-4);g.moveTo(x,y-13*a);g.lineTo(x,y+5*a);g.stroke();g.restore()};
FXB.tmdg=(f,p,x,y,r)=>{const a=1-p;g.save();g.fillStyle='rgba(60,36,14,'+(.7*a+.2)+')';g.beginPath();g.ellipse(x,y+4,(r||40)*.7,(r||40)*.28,0,0,7);g.fill();g.globalCompositeOperation='lighter';glowAt(x,y-10,(r||40)*1.6,'255,210,110',.6*a);
  for(let i=0;i<8;i++){const an=-1.57+(i-3.5)*.25,d=(r||40)*1.6*p;g.fillStyle='rgba(255,220,140,'+a+')';g.fillRect(x+Math.cos(an)*d,y-10+Math.sin(an)*d,3,3)}g.restore()};
FXB.tmch=(f,p,x,y)=>{const a=1-p;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10,50,'255,220,120',.8*a);g.restore()};
FXB.tmvp=(f,p,x,y,r,now)=>{const a=p<.05?p/.05:p>.92?(1-p)/.08:1,R=(r||46);g.save();g.globalCompositeOperation='lighter';glowAt(x,y-30,R*2,'255,200,90',.55*a);
  for(let i=0;i<4;i++){g.strokeStyle='rgba(255,'+(200+i*12)+','+(80+i*30)+','+(.7*a)+')';g.lineWidth=3-i*.5;g.beginPath();g.ellipse(x,y-34,R*(.9-i*.17),R*1.25*(.9-i*.17),0,now*(2+i)%6.283,now*(2+i)%6.283+4.6);g.stroke()}
  g.fillStyle='rgba(255,240,190,'+(.35*a)+')';g.beginPath();g.ellipse(x,y-34,R*.55,R*.8,0,0,7);g.fill();g.restore();try{elTxt('🌀 ห้องทองคำ',x,y-104,a,'#ffe08a')}catch(e){}};
setTimeout(()=>{try{Object.assign(FXD,{tmdg:1,tmvp:15,tmgl:1.2,tmch:1});R27D.tmvp=1}catch(e){}},0);
