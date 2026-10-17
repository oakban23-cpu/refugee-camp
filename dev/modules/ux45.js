/* ---------- v427 ตู้เสื้อผ้าโฉมใหม่ ----------
   - พรีวิวตรึงไว้ด้านบน เลื่อนแค่ตารางชุด (เลื่อนลงแล้วพรีวิวหดเหลือครึ่ง)
   - ตารางไอคอนแถวละ 4 · แต่ละช่องวาดตัวละครใส่ชิ้นนั้นจริง (ซูมไปที่ชิ้น) · ยังไม่มี = สีเทา + 🔒
   - แตะ = ลองใส่ในพรีวิวทันที (รวมชิ้นที่ยังไม่ปลดล็อก) · รายละเอียด + ปุ่มใส่/แลก อยู่แถบใต้พรีวิว
   - แถวช่องที่ใส่อยู่ = แท็บหมวด · ท่าทางเป็นไอคอนเล็กในพรีวิว · ‹ › ไล่ดูทีละชิ้น · ตัวกรอง ทั้งหมด/มีแล้ว/ยังไม่มี */
const WD2={f:'all',sm:false,th:new Map(),keep:null};
function w2CSS(){if($('w2css'))return;const st=document.createElement('style');st.id='w2css';
  st.textContent='.pn.w2pn{flex:1 1 auto;min-height:0;max-height:100%;overflow:hidden;gap:7px;padding:10px 10px 8px}'+
  '.w2pn .ph{flex:0 0 auto}#w2top{flex:0 0 auto;display:flex;flex-direction:column;gap:6px}'+
  '#w2pv{position:relative}#w2pv canvas{display:block;width:100%;height:230px;transition:height .22s ease;border-radius:14px;touch-action:pan-y;cursor:grab;background:radial-gradient(ellipse at 50% 38%,#5a4a68,#221a2a 62%,#120e16);box-shadow:inset 0 0 0 1px rgba(201,170,110,.5)}'+
  '.w2sm #w2pv canvas{height:140px}'+
  '#w2pv .lb{position:absolute;left:8px;top:8px;max-width:64%;font-size:11px;padding:3px 8px;border-radius:9px;background:rgba(20,12,30,.78);border:1px solid rgba(255,216,140,.55);color:#ffe6b0;pointer-events:none}'+
  '#w2pv .hn{position:absolute;right:8px;top:9px;font-size:10px;opacity:.6;color:#efe4ff;pointer-events:none}'+
  '#w2pv .ps{position:absolute;left:50%;bottom:6px;transform:translateX(-50%);display:flex;gap:4px}'+
  '#w2pv .ps button{width:32px;height:28px;padding:0;font-size:14px;border-radius:9px;background:rgba(20,12,30,.6);border:1px solid rgba(255,216,140,.3);color:#fff;box-shadow:none}'+
  '#w2pv .ps button.on{background:var(--u-gold,#e7b75a);border-color:var(--u-gold,#e7b75a)}'+
  '#w2pv .nv{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:48px;padding:0;font-size:24px;line-height:1;border-radius:12px;background:rgba(20,12,30,.55);color:#fff;border:1px solid rgba(255,216,140,.35);box-shadow:none}'+
  '#w2pv .nv.l{left:6px}#w2pv .nv.r{right:6px}'+
  '#w2d{display:flex;align-items:center;gap:8px;min-height:44px;padding:6px 9px;border-radius:12px;background:rgba(255,190,230,.07);border:1px solid rgba(255,190,230,.3);font-size:12px}'+
  '#w2d .tx{flex:1 1 auto;min-width:0}#w2d .tx b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#w2d .tx small{display:block;opacity:.78;line-height:1.3}#w2d .ok{color:#9fe89f}'+
  '#w2d button{flex:0 0 auto;font-size:12px;padding:6px 12px;white-space:nowrap}'+
  '#w2s{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}'+
  '#w2s button{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 0 3px;border-radius:11px;font-size:10px;line-height:1.1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:inherit;box-shadow:none;min-width:0}'+
  '#w2s button i{font-style:normal;font-size:19px;line-height:1.15;position:relative}#w2s button i u{position:absolute;right:-7px;bottom:-2px;font-size:10px;text-decoration:none}'+
  '#w2s button.fs{border-color:rgba(255,190,230,.55);background:rgba(255,190,230,.1)}#w2s button.on{background:var(--u-gold,#e7b75a);border-color:var(--u-gold,#e7b75a);color:#20180c;font-weight:700}'+
  '#w2f{display:flex;align-items:center;gap:4px;font-size:11px}#w2f button{font-size:11px;padding:3px 9px;border-radius:9px;box-shadow:none}#w2f button.on{background:var(--u-gold,#e7b75a);color:#20180c;border-color:var(--u-gold,#e7b75a)}#w2f .sp{flex:1}'+
  '#w2g{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;align-content:start;grid-auto-rows:94px;padding:2px 1px 6px}'+
  '#w2g.dy{display:block}#w2g .em{grid-column:1/-1;text-align:center;opacity:.7;padding:18px 0;font-size:12px}'+
  '.w2t{position:relative;padding:0;margin:0;border-radius:12px;height:94px;min-width:0;background:radial-gradient(ellipse at 50% 40%,#4a3d58,#1d1624 70%);border:1.5px solid rgba(255,255,255,.14);overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;box-shadow:none;color:#fff;cursor:pointer}'+
  '.w2t img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none}'+
  '.w2t.lock img{filter:grayscale(.92) brightness(.5)}.w2t.lock{background:#17131c}'+
  '.w2t .e{position:absolute;left:4px;top:3px;font-size:13px;line-height:1}.w2t .k{position:absolute;right:4px;top:3px;font-size:11px;line-height:1}'+
  '.w2t .nm{position:relative;display:block;width:100%;font-size:10px;line-height:1.15;padding:9px 3px 3px;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.82));text-align:center;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}'+
  '.w2t.own{border-color:rgba(255,216,140,.55)}.w2t.on{border-color:#9fe89f}.w2t.on .k{color:#9fe89f;font-weight:700}'+
  '.w2t.sel{border-color:#ffb0e0;box-shadow:0 0 0 2px #ffb0e0}';
  document.head.appendChild(st)}
const w2Tab=()=>GPV.wt||'set';
/* รายการช่องในแท็บปัจจุบัน (หลังกรอง): {id,own,on} · id '' = ใช้ของจริง */
function w2List(){const W=wdrSt(),t=w2Tab();if(t==='dye')return[];let L;
  if(t==='set')L=WDR.map(O=>({id:O.id,own:!!W.o[O.id],on:!!W.o[O.id]&&WSL.every(([k])=>!wdrHas(O.id,k)||W.s[k]===O.id)}));
  else{const cur=W.s[t]||'';L=[{id:'',own:true,on:!cur}].concat(WDR.filter(O=>wdrHas(O.id,t)).map(O=>({id:O.id,own:!!W.o[O.id],on:cur===O.id})).sort((a,b)=>(b.own?1:0)-(a.own?1:0)))}
  if(WD2.f==='own')L=L.filter(q=>q.own);else if(WD2.f==='no')L=L.filter(q=>!q.own);return L}
function w2Sel(){const t=w2Tab();if(t==='set')return GPV.pf||null;if(GPV.pp&&GPV.pp.sl===t)return GPV.pp.id;return null}
function w2Pick(id){const t=w2Tab();if(t==='dye')return;if(t==='set'){GPV.pf=id;GPV.pp=null;GPV.pose='idle'}else{GPV.pp={sl:t,id};GPV.pf=null;if(t==='w')GPV.pose='atk';else if(GPV.pose==='atk')GPV.pose='idle'}GPV.t0=performance.now()}
/* ภาพไอคอน: ตัวละครของเราใส่ชิ้นนั้น ซูมไปที่ชิ้น (แคชเป็นรูป) */
function w2Look(t,id){let L;try{L=wdrCodes(me.eq)}catch(e){L={w:0,a:0,h:0,b:0,fa:0}}if(t==='set'){const O=WDRM[id];if(O)L={w:O.w,a:O.a,h:O.h,b:O.b,fa:O.fa|0};return L}
  if(t==='f'){L.fa=id?(WDRM[id].fa|0):0;return L}L[t]=id?(WDRM[id][t]|0):lkc(me.eq&&me.eq[t]);if(t!=='set')L.fa=0;return L}
const WD2Z={set:[2.9,0,-6],h:[4,0,-27],w:[2.9,6,-14],a:[4.4,0,-4],b:[4.8,0,9],f:[2.5,0,-6]};
function w2Img(t,id){const L=w2Look(t,id);let dy=0;try{dy=wdrDy()}catch(e){}
  const key=me.cls+'|'+c2v()+'|'+dy+'|'+t+'|'+[L.h,L.w,L.a,L.b,L.fa|0].join(',');let u=WD2.th.get(key);if(u!==undefined)return u;
  const Wd=120,Ht=140,cv=document.createElement('canvas');cv.width=Wd;cv.height=Ht;const g0=g,cha0=CHA,chs0=CHS,che0=CHE,dy0=CHDY,wfx0=WFX;u='';
  try{g=cv.getContext('2d');const Z=WD2Z[t]||WD2Z.set;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,Wd,Ht);
    g.translate(Wd/2-Z[1]*Z[0],Ht*.55-Z[2]*Z[0]);g.scale(Z[0],Z[0]);
    CHA={mv:0,fx:1,cast:null,it:0};CHS={h:0,c:0};CHE=null;CHDY=dy;WFX=null;
    if(L.fa)try{wdrAura(L.fa,0,0,1.7,0,1)}catch(e){}
    drawChar(0,0,me.cls,1,0,L.h,1.7,L.b,L.w,L.a,c2v(),0);
    if(L.fa)try{wdrAura(L.fa,0,0,1.7,1,1)}catch(e){}
    u=cv.toDataURL('image/png')}catch(e){u=''}finally{g=g0;CHA=cha0;CHS=chs0;CHE=che0;CHDY=dy0;WFX=wfx0}
  if(WD2.th.size>300)WD2.th.clear();WD2.th.set(key,u);return u}
function w2Name(t,id){if(t==='set')return WDRM[id].n.replace(/^ชุด/,'');if(!id)return t==='f'?'ไม่มีออร่า':'ของจริง';const O=WDRM[id];return t==='f'?FAN[O.fa]:O.n.replace(/^ชุด/,'')}
function w2Tile(t,q,sel){const O=q.id?WDRM[q.id]:null,u=w2Img(t,q.id);
  return'<button class="w2t'+(q.own?' own':' lock')+(q.on?' on':'')+(sel===q.id?' sel':'')+'" data-w2="'+q.id+'">'+(u?'<img alt="" src="'+u+'">':'')+
    '<span class="e">'+(O?O.e:'🎒')+'</span><span class="k">'+(q.on?'✓':q.own?'':'🔒')+'</span><span class="nm">'+w2Name(t,q.id)+'</span></button>'}
/* แถบรายละเอียดของชิ้นที่เลือก */
function w2Detail(msg){const W=wdrSt(),t=w2Tab(),id=w2Sel();
  if(t==='dye')return'<div class="tx"><b>🎨 ย้อมสี</b><small>'+(msg?'<span class="ok">'+msg+'</span>':'ผสมสีแล้วเลือกสีให้แต่ละชิ้น · พรีวิวด้านบนเปลี่ยนตามทันที')+'</small></div>';
  if(id==null)return'<div class="tx"><b>👆 แตะไอคอนด้านล่างเพื่อลองใส่</b><small>'+(msg?'<span class="ok">'+msg+'</span>':'ลองได้ทุกชิ้น แม้ยังไม่ปลดล็อก · ลากตัวละครเพื่อหมุน')+'</small></div>';
  const O=id?WDRM[id]:null,own=!O||!!W.o[id];let nm,sub,btn='';
  if(t==='set'){const all=own&&WSL.every(([k])=>!wdrHas(id,k)||W.s[k]===id);nm=O.e+' '+O.n;
    sub=own?WDRSN[O.s]+(O.fa?' · ออร่า'+FAN[O.fa]:''):'🔒 '+WDRSN[O.s]+' · '+O.d+wdrProg(O);
    btn=own?(all?'<b class="ok">✓ ใส่ครบชุด</b>':'<button class="pri" data-wdo="'+id+'">ใส่ทั้งชุด</button>'):O.s==='ev'?'<button class="pri" data-wdb="'+id+'"'+((W.th|0)>=O.c?'':' disabled')+'>แลก ✂️'+O.c+'</button>':''}
  else{const cur=W.s[t]||'',on=cur===id;
    nm=O?O.e+' '+wdrPN(O,t):'🎒 '+(t==='f'?'ไม่ใส่ออร่า':'ใช้'+WSLN[t][2]+'ของจริง');
    sub=!O?(t==='f'?'ไม่มีออร่ารอบตัว':'โชว์'+WSLN[t][2]+'ที่สวมอยู่จริง'):own?'จาก '+O.n:'🔒 '+WDRSN[O.s]+' · '+O.d+wdrProg(O);
    btn=on?'<b class="ok">✓ ใส่อยู่</b>':own?'<button class="pri" data-wds="'+t+':'+id+'">'+(O?'ใส่':'ใช้')+'</button>':O.s==='ev'?'<button class="pri" data-wdb="'+id+'"'+((W.th|0)>=O.c?'':' disabled')+'>แลก ✂️'+O.c+'</button>':''}
  return'<div class="tx"><b>'+nm+'</b><small>'+(msg?'<span class="ok">'+msg+'</span>':sub)+'</small></div>'+btn}
function w2Label(){const t=w2Tab(),id=w2Sel();if(t==='dye'||id==null){const n=wdrN();return n?'👗 แฟชั่น '+n+'/5 ชิ้น':''}
  if(t==='set'){const O=WDRM[id];return'👗 '+O.e+' '+O.n+(wdrOwn(id)?'':' 🔒')}const O=id?WDRM[id]:null;return O?'👀 '+wdrPN(O,t)+(wdrOwn(id)?'':' 🔒'):'🎒 '+WSLN[t][2]+'ของจริง'}
function wardrobeUI(msg){if(!me.cls)return;w2CSS();const W=wdrSt();if(!W.o.ref)W.o.ref=1;gsel=null;
  if(WD2.keep){GPV.pf=WD2.keep.pf;GPV.pp=WD2.keep.pp;WD2.keep=null}
  const t=w2Tab(),old=$('w2g'),st=old&&ov.dataset.k==='wdr'&&old.dataset.t===t?old.scrollTop:0;ov.dataset.k='wdr';
  const L=w2List(),sel=w2Sel(),ld=w2Label();
  let h=hdr('👗','ตู้เสื้อผ้า','ค่าพลังมาจากอุปกรณ์จริงเสมอ');
  h+='<div id="w2top"><div id="w2pv"><canvas id="gpv"></canvas>'+(ld?'<div class="lb">'+ld+'</div>':'')+'<div class="hn">↔ ลากหมุน</div>'+
    (t!=='dye'&&L.length>1?'<button class="nv l" data-w2n="-1" aria-label="ก่อนหน้า">‹</button><button class="nv r" data-w2n="1" aria-label="ถัดไป">›</button>':'')+
    '<div class="ps">'+GPVP.map(([k,i,n])=>'<button class="'+(GPV.pose===k?'on':'')+'" data-gpvp="'+k+'" title="'+n+'">'+i+'</button>').join('')+'</div></div>';
  h+='<div id="w2d">'+w2Detail(msg)+'</div>';
  h+='<div id="w2s">'+[['set','👗','ทั้งชุด'],...WSL,['dye','🎨','ย้อมสี']].map(([k,ic,nm])=>{const O=WSLN[k]?wdrPc(k):null;
      return'<button class="'+(t===k?'on':O?'fs':'')+'" data-wdt="'+k+'"><i>'+(O?O.e+'<u>'+ic+'</u>':ic)+'</i>'+nm+'</button>'}).join('')+'</div>';
  h+='<div id="w2f">'+(t==='dye'?'':[['all','ทั้งหมด'],['own','มีแล้ว'],['no','ยังไม่มี']].map(([k,n])=>'<button class="'+(WD2.f===k?'on':'')+'" data-w2f="'+k+'">'+n+'</button>').join(''))+
    '<span class="sp"></span><span>✂️ <b>'+(W.th|0)+'</b></span>'+(wdrN()?'<button data-wdx="1">ถอดหมด</button>':'')+'</div></div>';
  h+='<div id="w2g" data-t="'+t+'"'+(t==='dye'?' class="dy"':'')+'>'+(t==='dye'?dyHTML():L.length?L.map(q=>w2Tile(t,q,sel)).join(''):'<div class="em">'+(WD2.f==='own'?'ยังไม่มีชิ้นในหมวดนี้':'มีครบทุกชิ้นแล้ว 🎉')+'</div>')+'</div>';
  ov.innerHTML='<div class="pn w2pn'+(WD2.sm?' w2sm':'')+'" data-pn="wdr" id="w2">'+h+'</div>';ov.hidden=false;
  const G=$('w2g');if(G){if(st)G.scrollTop=st;G.addEventListener('scroll',()=>{const s=G.scrollTop>24;if(s!==WD2.sm){WD2.sm=s;const p=$('w2');if(p)p.classList.toggle('w2sm',s)}},{passive:true});
    if(st<=24&&WD2.sm){WD2.sm=false;$('w2').classList.remove('w2sm')}}}
function w2Click(e){if(ov.dataset.k!=='wdr')return;const b=e.target.closest&&e.target.closest('[data-w2],[data-w2n],[data-w2f]');if(!b||!me.cls)return;e.stopPropagation();
  if(b.dataset.w2!=null){const id=b.dataset.w2;if(w2Sel()===id){/* แตะซ้ำ = ใส่เลยถ้ามีแล้ว */const q=w2List().find(x=>x.id===id);if(q&&q.own&&!q.on){const t=w2Tab(),a=$('w2d')&&$('w2d').querySelector(t==='set'?'[data-wdo]':'[data-wds]');if(a){WD2.keep={pf:GPV.pf,pp:GPV.pp};a.click();return}}}w2Pick(id)}
  else if(b.dataset.w2n){const L=w2List();if(!L.length)return;const cur=w2Sel(),i=L.findIndex(q=>q.id===cur),d=+b.dataset.w2n;const n=L[i<0?(d>0?0:L.length-1):(i+d+L.length)%L.length];w2Pick(n.id);
    try{sfx('click')}catch(_){}wardrobeUI();const s=$('w2g')&&$('w2g').querySelector('.w2t.sel');if(s&&s.scrollIntoView)try{s.scrollIntoView({block:'nearest'})}catch(_){}return}
  else if(b.dataset.w2f){WD2.f=b.dataset.w2f}
  try{sfx('click')}catch(_){}wardrobeUI()}
setTimeout(()=>{
  document.addEventListener('click',w2Click,true);
  /* กดปุ่มใส่/แลกในแถบรายละเอียด → คงชิ้นที่เลือกไว้ (เดิมระบบล้างพรีวิวทิ้ง) */
  document.addEventListener('pointerdown',e=>{if(ov.dataset.k!=='wdr')return;const b=e.target.closest&&e.target.closest('#w2d [data-wds],#w2d [data-wdo],#w2d [data-wdb]');if(b)WD2.keep={pf:GPV.pf,pp:GPV.pp}},true);
  /* พรีวิว «ใช้ของจริง» ของช่องนั้น */
  try{const _gl=gpvLook;gpvLook=function(){const P=GPV.pp;if(P&&P.id===''){GPV.pp=null;try{const L=_gl.apply(this,arguments);if(P.sl==='f')L.fa=0;else L[P.sl]=lkc(me.eq&&me.eq[P.sl]);return L}finally{GPV.pp=P}}return _gl.apply(this,arguments)}}catch(e){}
},900);
