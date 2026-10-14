/* ---------- v372 แผนที่โลก ----------
   36 แมพในหน้าเดียว แบ่งชั้น: เหนือเมฆ · สะพาน/ใต้ทะเลเมฆ · พื้นดิน · ใต้ดิน
   บอกสถานะ (เคยไป / ไปได้แต่ยังไม่เคยไป / ยังล็อก) · เลเวลมอนแต่ละแมพ · หมุดเควสเนื้อเรื่อง · ตำแหน่งตัวเอง/เพื่อนในปาร์ตี้
   แตะแมพที่เคยไปแล้วเพื่อวาป (ร่าย 1.5 วิ · ขยับ/โดนตีแล้วยกเลิก · คูลดาวน์ 20 วิ · ใช้ไม่ได้ในดันเจี้ยน/หอคอย/ลานประลอง/เต็นท์)
   เก็บแมพที่เคยไปไว้ในเซฟ me.wv (เซฟเก่าที่ยังไม่มี → นับทุกแมพที่เดินไปถึงได้แล้วตามเลเวล/เนื้อเรื่องเป็น "เคยไป") */
const WMN={1:[190,690,'ค่ายผู้อพยพ','🏕️'],2:[115,640,'หุบกระดูก','💀'],7:[48,602,'เหมืองทองร้าง','⛏️'],5:[268,628,'ลานหอคอย','🗼'],6:[105,725,'นครจมบาดาล','🌊'],3:[158,782,'แดนเพลิงนรก','🔥'],4:[80,812,'วิหารน้ำแข็ง','❄️'],8:[245,818,'สุสานฟาโรห์','🏜️'],
  34:[292,712,'ที่ราบดาวตก','☄️'],35:[330,786,'เหมืองคาร์น','💎'],23:[190,905,'โพรงรากหิน','🌱'],24:[112,950,'ทะเลสาบใต้ดิน','💧'],25:[190,995,'สุสานอัศวิน','⚔️'],26:[268,1032,'แกนพิภพ','🌋'],
  30:[190,488,'สะพานรุ่งอรุณ','🌉'],32:[292,500,'ซากอารัณยา','🔔'],33:[318,566,'หลุมหัวใจว่าง','💜'],
  9:[190,300,'นครอัสตรา','🏰'],27:[190,210,'พระราชวัง','👑'],28:[132,150,'สวนราชินี','🌸'],29:[248,150,'บัลลังก์ดาว','✨'],36:[190,62,'หอดูดาวโอเรียน','🔭'],31:[140,392,'วงแหวนล่าง','🏮'],
  10:[262,380,'ทุ่งรอยแยก','🌌'],11:[322,422,'หลังรอยแยก','🕳️'],19:[290,300,'ป่าเห็ด','🍄'],20:[328,250,'บึงหมอกม่วง','🌫️'],21:[290,200,'นครใต้เมฆ','🏚️'],22:[328,148,'บัลลังก์เงา','🌑'],
  12:[52,340,'สะพานลม','🌬️'],13:[92,292,'สวนลอยฟ้า','🌿'],14:[38,250,'หอนาฬิกาเมฆ','🕰️'],15:[92,205,'ทะเลสาบดาว','🌠'],16:[38,162,'ป่าผลึก','⚡'],17:[92,118,'หุบลมหวน','🌪️'],18:[45,72,'วิหารพายุ','⛈️']};
const WMLV={1:[1,5],2:[5,9],3:[10,14],4:[15,23],6:[22,36],7:[20,32],8:[31,44],10:[42,51],11:[51,60],12:[64,67],13:[65,68],14:[66,68],15:[66,69],16:[67,69],17:[68,70],18:[69,71],19:[76,80],20:[82,87],21:[88,93],22:[94,99],
  23:[96,100],24:[99,103],25:[102,106],26:[105,109],27:[108,112],28:[108,112],29:[109,111],30:[112,116],31:[115,118],32:[117,120],33:[119,122],34:[123,126],35:[127,130],36:[130,134]};
const WMB={'9-36':-70};/* เส้นที่ต้องโค้งหลบโหนดอื่น */
const WMCD=20,WMCH=1.5;let WMW=null,wmCd=0,WMSEL=null;
function wmReach(){const seen={1:1},q=[1];while(q.length){const k=q.shift(),M=MAPS[k];if(!M||!M.gates)continue;for(const G of M.gates){const t=G.to|0;if(seen[t]||t>=10000||!MAPS[t]||G.wb||!WMN[t])continue;let ok=false;try{ok=wpGateOk(G)}catch(e){}if(ok){seen[t]=1;q.push(t)}}}return seen}
function wmSeed(){if(Array.isArray(me.wv))return;const R=wmReach();me.wv=Object.keys(R).map(Number).filter(i=>WMN[i]);if(WMN[curMap]&&!me.wv.includes(curMap))me.wv.push(curMap)}
function wmVisit(id){if(!WMN[id]||!me.cls)return;wmSeed();if(!me.wv.includes(id))me.wv.push(id)}
function wmQuestMap(){try{const st=stCur();if(!st)return 0;const keep=AQ;AQ={src:'st',id:'',hb0:false,t:0,ev:0,sx:me.x,sy:me.y,st:0,det:0,gt:0,nt:0,hunt:0,key:'',msg:'',T:null};let T=null;try{T=aqTarget()}catch(e){}AQ=keep;
  let mp=T&&T.mp|0;if(mp>=10000){const M=MAPS[mp];mp=M&&M.gates&&M.gates[0]?M.gates[0].to|0:0}if(!mp&&st.k&&STNPC[st.k])mp=STNPC[st.k][0]|0;if(!mp&&st.m)mp=st.m|0;return WMN[mp]?mp:0}catch(e){return 0}}
function wmWhy(id){if(!me.cls||!run||me.down>0)return'ตอนนี้วาปไม่ได้';if(SD.on||SKL||SKA)return'ตอนนี้วาปไม่ได้';if(!wpMapOk(curMap))return'ออกจากดันเจี้ยน/หอคอย/ลานประลอง/เต็นท์ก่อนถึงจะวาปได้';
  if(id===curMap)return'คุณอยู่ที่นี่แล้ว';if(!wmReach()[id])return'ยังไปไม่ได้ · '+(wpAccess(id)||'ต้องเดินเนื้อเรื่อง/เลเวลถึงก่อน');if(!(me.wv||[]).includes(id))return'ต้องเดินไปถึงครั้งแรกก่อน ถึงจะวาปมาได้';if(wmCd>0)return'วาปได้อีกครั้งใน '+Math.ceil(wmCd)+' วิ';if(WP)return'กำลังวาปหาเพื่อนอยู่';return''}
function wmGo(id){if(WMW){wmCancel('ยกเลิกการวาป');return}const why=wmWhy(id);if(why){try{sfx('err')}catch(e){}wmUI(id,why);return}ov.hidden=true;WMW={id,t:WMCH,x0:me.x,y0:me.y,hp:me.hp};banner={s:'🌀 กำลังวาปไป '+MAPS[id].n+'… (ขยับตัวเพื่อยกเลิก)',t:WMCH+.3};try{sfx('ek_summon')}catch(e){}}
function wmCancel(msg){if(!WMW)return;WMW=null;banner=null;if(msg)dn.push({x:me.x,y:me.y-46,v:'🌀 '+msg,t:1.3,col:'#c8d8ff'})}
function wmTick(dt){if(wmCd>0)wmCd-=dt;if(!WMW)return;if(me.down>0||Math.hypot(me.x-WMW.x0,me.y-WMW.y0)>10){wmCancel('ขยับตัว — ยกเลิกการวาป');return}if(me.hp<WMW.hp-1){wmCancel('โดนโจมตี — การวาปถูกขัดจังหวะ');return}
  WMW.t-=dt;if(Math.random()<.5)parts.push({x:me.x+(Math.random()-.5)*36,y:me.y+14,vx:0,vy:-60-Math.random()*60,t:.6,l:.6,c:Math.random()<.5?'#ffd27a':'#8ad8ff',r:1.6+Math.random()*1.4});if(WMW.t>0)return;
  const id=WMW.id;WMW=null;const why=wmWhy(id);if(why){dn.push({x:me.x,y:me.y-46,v:why,t:1.8,col:'#ffb0a0'});return}const M=MAPS[id];burst(me.x,me.y-10,['#ffd27a','#8ad8ff','#ffffff'],26,140,.6,{glow:1,g:-40});wmCd=WMCD;try{sfx('gate')}catch(e){}
  try{FS.open&&fsClose()}catch(e){}ov.hidden=true;enterMap(id,{x:M.sx||1600,y:M.sy||1600});setTimeout(()=>{try{burst(me.x,me.y-10,['#ffd27a','#8ad8ff','#ffffff'],30,150,.7,{glow:1,g:-40})}catch(e){}banner={s:'🗺️ มาถึง '+M.n+' แล้ว',t:2.4}},60)}
/* หน้าแผนที่ */
function wmUI(sel,msg){if(!me.cls)return;wmSeed();ov.dataset.k='wm';ov.hidden=false;const R=wmReach(),V=new Set(me.wv||[]),qm=wmQuestMap(),here=WMN[curMap]?curMap:0;sel=sel||WMSEL||here||1;WMSEL=sel;
  const st=id=>V.has(id)&&R[id]?'v':R[id]?'r':'l',fr=[];let pty=[];try{pty=(PTY&&PTY.mem||[]).filter(m=>m.u!==uid&&Date.now()-m.s<8000&&WMN[m.mp|0])}catch(e){}
  /* เส้นเชื่อมจากประตูจริง */const E=new Map();for(const a in WMN){const M=MAPS[a];if(!M||!M.gates)continue;for(const G of M.gates){const b=G.to|0;if(!WMN[b]||b===+a||G.wb)continue;const k=Math.min(a,b)+'-'+Math.max(a,b);let ok=false;try{ok=wpGateOk(G)}catch(e){}const o=E.get(k);E.set(k,{a:+a,b,ok:(o&&o.ok)||ok})}}
  let s='<svg viewBox="0 0 360 1060" class="wmsvg" xmlns="http://www.w3.org/2000/svg">';
  s+='<defs><linearGradient id="wmsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2552"/><stop offset="1" stop-color="#3a4f8a"/></linearGradient><linearGradient id="wmgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c4a2a"/><stop offset="1" stop-color="#2e2618"/></linearGradient><linearGradient id="wmug" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#231a14"/><stop offset="1" stop-color="#0e0a08"/></linearGradient><radialGradient id="wmgl"><stop offset="0" stop-color="#ffe29a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe29a" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect x="0" y="0" width="360" height="440" fill="url(#wmsky)"/><rect x="0" y="440" width="360" height="130" fill="#5a6a9a"/><rect x="0" y="570" width="360" height="290" fill="url(#wmgr)"/><rect x="0" y="860" width="360" height="200" fill="url(#wmug)"/>';
  for(let i=0;i<9;i++){const x=(i*47)%360,y=455+(i*29)%90;s+='<ellipse cx="'+x+'" cy="'+y+'" rx="'+(46+i%3*14)+'" ry="14" fill="#c8d4f0" opacity=".25"/>'}
  for(let i=0;i<34;i++){s+='<circle cx="'+((i*97)%360)+'" cy="'+((i*61)%420+8)+'" r="'+(.6+i%3*.4)+'" fill="#fff" opacity="'+(.25+(i%4)*.12)+'"/>'}
  s+='<text x="10" y="18" class="wmband">☁️ เหนือเมฆ</text><text x="10" y="458" class="wmband">🌉 สะพาน · ใต้ทะเลเมฆ</text><text x="10" y="588" class="wmband">🌍 พื้นดิน</text><text x="10" y="878" class="wmband">⛰️ ใต้ดิน</text>';
  for(const e of E.values()){const A=WMN[e.a],B=WMN[e.b],k=Math.min(e.a,e.b)+'-'+Math.max(e.a,e.b),bd=WMB[k]||0,mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2,dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy)||1,cx=mx-dy/L*bd,cy=my+dx/L*bd,lit=st(e.a)!=='l'&&st(e.b)!=='l'&&e.ok;
    s+='<path d="M'+A[0]+' '+A[1]+' Q'+cx+' '+cy+' '+B[0]+' '+B[1]+'" class="wme'+(lit?' on':'')+'"/>'}
  for(const id in WMN){const n=+id,[x,y,nm,ic]=WMN[n],S=st(n),lv=WMLV[n],cur=n===here,isSel=n===sel,name=n===1&&MAPS[1].n!=='ค่ายผู้อพยพ'?'นครลี้ภัย':nm;
    s+='<g class="wmn '+S+(isSel?' sel':'')+(cur?' cur':'')+'" data-wm="'+n+'">';if(cur)s+='<circle cx="'+x+'" cy="'+y+'" r="26" fill="url(#wmgl)" class="wmpulse"/>';
    s+='<circle cx="'+x+'" cy="'+y+'" r="15" class="wmc"/><text x="'+x+'" y="'+(y+5)+'" class="wmi">'+(S==='l'?'🔒':ic)+'</text>';
    s+='<text x="'+x+'" y="'+(y+27)+'" class="wmt">'+name+'</text>'+(lv?'<text x="'+x+'" y="'+(y+37)+'" class="wml">Lv '+lv[0]+'–'+lv[1]+'</text>':'<text x="'+x+'" y="'+(y+37)+'" class="wml">เขตปลอดภัย</text>');
    if(n===qm)s+='<g class="wmq"><circle cx="'+(x+13)+'" cy="'+(y-13)+'" r="8"/><text x="'+(x+13)+'" y="'+(y-9.5)+'">!</text></g>';
    const pm=pty.filter(m=>(m.mp|0)===n);if(pm.length)s+='<g class="wmp"><circle cx="'+(x-13)+'" cy="'+(y-13)+'" r="7"/><text x="'+(x-13)+'" y="'+(y-10)+'">'+pm.length+'</text></g>';
    if(cur)s+='<text x="'+x+'" y="'+(y-20)+'" class="wmhere">📍 คุณอยู่ที่นี่</text>';s+='</g>'}
  s+='</svg>';
  /* การ์ดรายละเอียดแมพที่เลือก */const M=MAPS[sel]||{},S=st(sel),lv=WMLV[sel],why=wmWhy(sel),vis=V.size,tot=Object.keys(WMN).length;
  let d='<div class="wmd"><div class="wmdh"><span class="wmdi">'+(WMN[sel]?WMN[sel][3]:'🗺️')+'</span><div><b>'+(M.n||'')+'</b><small>'+(lv?'มอน Lv '+lv[0]+'–'+lv[1]:'เขตปลอดภัย · ไม่มีมอน')+(M.boss&&M.boss.n&&M.boss.n!=='-'?' · บอส '+M.boss.n:'')+'</small></div></div>';
  d+='<div class="wmds">'+(sel===here?'📍 คุณอยู่ที่นี่':S==='v'?'✅ เคยมาแล้ว':S==='r'?'👣 ไปได้แล้ว แต่ยังไม่เคยเดินไปถึง':'🔒 '+(wpAccess(sel)||'ยังล็อกอยู่'))+(sel===qm?' · <b class="wmdq">❗ เควสเนื้อเรื่องอยู่ที่นี่</b>':'')+'</div>';
  if(msg)d+='<div class="wmdm">'+msg+'</div>';
  d+='<div class="wmdb"><button class="wmgo'+(why?' off':'')+'" data-wmgo="'+sel+'">'+(WMW?'⏹ ยกเลิกการวาป':why&&sel===here?'📍 อยู่ที่นี่':'🌀 วาปไปที่นี่'+(wmCd>0?' ('+Math.ceil(wmCd)+' วิ)':''))+'</button>'+(qm&&qm!==sel?'<button class="wmq2" data-wmsel="'+qm+'">❗ ดูเควส</button>':'')+'</div>';
  d+='<div class="wmdf">เคยไปแล้ว '+vis+'/'+tot+' แมพ · วาปฟรี คูลดาวน์ '+WMCD+' วิ</div></div>';
  ov.innerHTML='<div class="pn wmpn" data-pn="wm">'+hdr('🗺️','แผนที่โลก','แตะแมพเพื่อดูรายละเอียด · แมพที่เคยไปแล้ววาปได้')+'<div class="wmlg"><span><i class="v"></i>เคยไป</span><span><i class="r"></i>ยังไม่เคยไป</span><span><i class="l"></i>ล็อก</span><span><i class="q">!</i>เควส</span></div><div class="wmsc">'+s+'</div>'+d+'</div>';
  const sc=ov.querySelector('.wmsc');if(sc&&WMN[sel]&&!wmUI.keep){const k=sc.clientWidth/360;sc.scrollTop=Math.max(0,WMN[sel][1]*k-sc.clientHeight/2)}wmUI.keep=0}
{const st=document.createElement('style');st.textContent=
 '.wmpn{display:flex;flex-direction:column;gap:6px;max-height:100%}.wmsc{flex:1 1 auto;min-height:220px;max-height:60vh;overflow-y:auto;border-radius:12px;border:1px solid rgba(231,183,90,.4);background:#0e0a08;-webkit-overflow-scrolling:touch}'
+'.wmsvg{display:block;width:100%;height:auto}.wmband{font:700 11px system-ui;fill:#ffe8b0;opacity:.75}'
+'.wme{fill:none;stroke:#8a8070;stroke-width:1.6;stroke-dasharray:4 4;opacity:.55}.wme.on{stroke:#e7c070;stroke-dasharray:none;opacity:.8;stroke-width:2}'
+'.wmn{cursor:pointer}.wmn .wmc{stroke-width:2}.wmn.v .wmc{fill:#3a2a12;stroke:#ffd27a}.wmn.r .wmc{fill:#1e2a3a;stroke:#8ad8ff;stroke-dasharray:3 2}.wmn.l .wmc{fill:#2a2a2a;stroke:#6a6a6a}.wmn.l{opacity:.6}'
+'.wmn.sel .wmc{stroke:#ffffff;stroke-width:3.2}.wmi{font-size:14px;text-anchor:middle}.wmt{font:700 9.5px system-ui;fill:#fff2d0;text-anchor:middle;paint-order:stroke;stroke:#140c06;stroke-width:3px}.wmn.l .wmt{fill:#bbb}'
+'.wml{font:9px system-ui;fill:#ffd27a;text-anchor:middle;paint-order:stroke;stroke:#140c06;stroke-width:3px}.wmn.l .wml{fill:#999}.wmhere{font:700 9.5px system-ui;fill:#7affb0;text-anchor:middle;paint-order:stroke;stroke:#062010;stroke-width:3px}'
+'.wmpulse{animation:wmP 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes wmP{0%,100%{opacity:.5;transform:scale(.85)}50%{opacity:1;transform:scale(1.15)}}'
+'.wmq circle{fill:#ffd84a;stroke:#5a3a00;stroke-width:1.5}.wmq text{font:900 11px system-ui;fill:#3a2400;text-anchor:middle}.wmq{animation:wmQ 1s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes wmQ{50%{transform:translateY(-2px)}}'
+'.wmp circle{fill:#6ad0ff;stroke:#062030;stroke-width:1.5}.wmp text{font:800 9px system-ui;fill:#062030;text-anchor:middle}'
+'.wmlg{display:flex;gap:10px;flex-wrap:wrap;font-size:11px;opacity:.9}.wmlg span{display:flex;align-items:center;gap:4px}.wmlg i{display:inline-block;width:11px;height:11px;border-radius:50%;border:2px solid}.wmlg i.v{background:#3a2a12;border-color:#ffd27a}.wmlg i.r{background:#1e2a3a;border-color:#8ad8ff;border-style:dashed}.wmlg i.l{background:#2a2a2a;border-color:#6a6a6a}.wmlg i.q{background:#ffd84a;border-color:#5a3a00;color:#3a2400;font:900 9px/9px system-ui;text-align:center;font-style:normal}'
+'.wmd{border:1px solid rgba(231,183,90,.45);border-radius:12px;padding:8px 10px;background:rgba(30,22,14,.85)}.wmdh{display:flex;gap:8px;align-items:center}.wmdi{font-size:24px}.wmdh b{display:block;color:#ffe8b0;font-size:14px}.wmdh small{display:block;font-size:11px;opacity:.85}'
+'.wmds{font-size:12px;margin:6px 0 4px}.wmdq{color:#ffd84a}.wmdm{font-size:11.5px;color:#ffb0a0;margin-bottom:4px}.wmdb{display:flex;gap:6px}.wmdb button{flex:1 1 0;padding:9px 4px}#ov .pn button.wmgo{background:linear-gradient(180deg,#9ad8ff,#3a7ac0)!important;color:#061a30!important;font-weight:800;border-color:#cdeeff!important}#ov .pn button.wmgo.off{background:rgba(255,255,255,.06)!important;color:#9a9080!important;border-color:rgba(231,183,90,.3)!important;font-weight:400}.wmdb .wmq2{flex:0 0 auto}.wmdf{font-size:10.5px;opacity:.65;margin-top:5px;text-align:center}';
 document.head.appendChild(st)}
setTimeout(()=>{
  ov.addEventListener('click',e=>{if(ov.dataset.k!=='wm')return;const n=e.target.closest('[data-wm]');if(n){WMSEL=+n.dataset.wm;try{sfx('click')}catch(_){}const sc=ov.querySelector('.wmsc'),top=sc?sc.scrollTop:0;wmUI.keep=1;wmUI(WMSEL);const s2=ov.querySelector('.wmsc');if(s2)s2.scrollTop=top;return}
    const q=e.target.closest('[data-wmsel]');if(q){WMSEL=+q.dataset.wmsel;wmUI(WMSEL);return}const g=e.target.closest('[data-wmgo]');if(g){wmGo(+g.dataset.wmgo)}});
  /* บันทึกแมพที่เคยไป */try{const _em=enterMap;window.enterMap=enterMap=function(id,arr){const r=_em(id,arr);try{if(curMap===id)wmVisit(id)}catch(e){}return r}}catch(e){console.warn('wm enter',e)}
  /* แตะมินิแมพมุมขวาบน = เปิดแผนที่โลก (มินิแมพวาดที่ uisMini: R 40 · ศูนย์กลาง W-48,60) */
  try{const _tt=tapTarget;window.tapTarget=tapTarget=function(p){if(p&&me.cls&&Math.hypot(p.x-(W-48),p.y-60)<=46){try{sfx('click')}catch(_){}WMSEL=null;wmUI();return}return _tt(p)}}catch(e){console.warn('wm mini',e)}
  try{const _wt=wpTick;window.wpTick=wpTick=function(dt){_wt(dt);try{wmTick(dt)}catch(e){}}}catch(e){}
  /* ปุ่มเมนู */try{const ref=$('pb');if(ref&&!$('wmm')){const b=document.createElement('button');b.id='wmm';b.innerHTML='<i>🗺️</i><span>แผนที่โลก</span><b class="bd"></b>';ref.parentNode.insertBefore(b,ref);b.onclick=()=>{if(me.cls&&run){WMSEL=null;wmUI()}}}}catch(e){console.warn('wm menu',e)}
},0);
