
/* ===== v493 · ลื่นขึ้นบนมือถือระดับกลาง (Samsung A55 · โหมดประหยัดแล้วยังกระตุก) =====
   วัดบนเครื่องจำลอง A55 (จอ 384×832 x2.8 · โหมดประหยัด): เกมสั่งวาดแคนวาส 7,000–9,600 คำสั่งต่อเฟรม · แถบ HUD เขียน DOM ใหม่ทุกเฟรม + บังคับจัดหน้าทุกเฟรม
   ① จำกัดเฟรม: จอ 120Hz (A55) เกมเคยวาดทุกรอบจอ = งานเป็นสองเท่า ทำไม่ทันก็สะดุดไม่สม่ำเสมอ → มือถือ/แท็บเล็ตจำกัด 60 · ตั้งค่าเลือก 30 (ลื่นสม่ำเสมอ ประหยัดแบต) ได้
   ② โหมดประหยัดเคยปิดภาพ HD (เมืองหลวง/ค่าย/ป้อม/บ้านกิลด์) แล้ววาดเส้นแทน ซึ่งหนักกว่า (ปราสาทอย่างเดียว ~4,900 คำสั่ง) → เครื่อง RAM ≥ 4GB ใช้ภาพ HD ต่อ
   ③ ไม่วาดของที่อยู่นอกจอ: ทหารยามค่าย ชาวค่าย ไก่ ธง ประตู คอกสัตว์ ช่าง/พ่อค้า (เดิมวาดทุกตัวทุกเฟรมแม้มองไม่เห็น)
   ④ โหมดประหยัด: ของประดับพื้นในทุ่ง (ดอกไม้ หญ้า พุ่มไม้ หิน ตอไม้ กระดูก ลัง ฯลฯ) วาดครั้งเดียวเก็บเป็นภาพ แล้ววางภาพแทนการวาดใหม่ทุกเฟรม (ดอกไม้/หญ้าไม่ไหวลม)
   ⑤ แถบ HP/MP/XP/เลเวล/ชื่อแมพ: เขียนเฉพาะตอนค่าเปลี่ยน (patch340) · ไม่อ่านความกว้างกล่องทุกเฟรม */
/* ---------- ① จำกัดเฟรม ---------- */
const FL={mode:(()=>{try{return localStorage.getItem('refugee_fps')||'auto'}catch(e){return 'auto'}})(),pt:0,lr:0,ri:16.7,dts:[],c:0,sk:0,run:0};
function flCoarse(){try{return matchMedia('(pointer:coarse)').matches}catch(e){return false}}
function flTarget(){const m=FL.mode;if(m==='30')return 30;if(m==='60')return 60;if(m==='max')return 0;return flCoarse()?60:0}
function flSet(m){FL.mode=m;try{localStorage.setItem('refugee_fps',m)}catch(e){}FL.lr=0;try{FQ.bad=0;FQ.n=0;FQ.acc=0}catch(e){}try{LQ.hi=0;LQ.lo=0}catch(e){}}
try{loop=(f=>function(t){const d=t-FL.pt;FL.pt=t;if(d>2&&d<60){FL.dts.push(d);if(FL.dts.length>90)FL.dts.shift()}
  if(++FL.c%45===0&&FL.dts.length>=30){const s=[...FL.dts].sort((a,b)=>a-b);FL.ri=Math.max(4,s[Math.floor(s.length*.1)])}
  const T=flTarget();if(T>0&&me.cls&&run&&!document.hidden){const iv=1000/T;if(iv>FL.ri*1.6&&t-FL.lr<iv-FL.ri*.5){FL.sk++;requestAnimationFrame(loop);return}}
  FL.lr=t;FL.run++;return f.apply(this,arguments)})(loop)}catch(e){}
/* 30 เฟรม = ตั้งใจ ไม่ให้ระบบปรับคุณภาพอัตโนมัติเข้าใจว่าเครื่องช้า */
try{fpsTick=(f=>function(){const r=f.apply(this,arguments);if(flTarget()===30){try{FQ.bad=0}catch(e){}try{LQ.hi=0}catch(e){}}return r})(fpsTick)}catch(e){}
/* ---------- ② ภาพ HD ในโหมดประหยัด (patch340 แทน «HDI.on&&!LOWQ» ด้วย «HDI.on&&!lqHD()») ---------- */
function hdLowOK(){try{const m=navigator.deviceMemory;return !m||m>=4}catch(e){return true}}
function lqHD(){return LOWQ&&!hdLowOK()}
/* ---------- ③ ไม่วาดของนอกจอ (ตรวจจากตำแหน่งบนแคนวาสจริง ใช้ได้ทั้งพิกัดโลก/พิกัดในกลุ่มที่เลื่อนแล้ว และตอนซูม) ---------- */
const PVC={sk:0,dr:0};
function pvLoc(x,y,m){const T=g.getTransform(),s=Math.hypot(T.a,T.b)||1,px=T.a*x+T.c*y+T.e,py=T.b*x+T.d*y+T.f,r=m*s;return px>-r&&px<cv.width+r&&py>-r&&py<cv.height+r}
function pvWrap(name,pos,m){try{const f=eval(name);if(typeof f!=='function'||f.__pv)return;const w=function(){const P=g.canvas===cv?pos.apply(this,arguments):null;if(P&&!pvLoc(P[0],P[1],m)){PVC.sk++;return}PVC.dr++;return f.apply(this,arguments)};w.__pv=1;eval(name+'=w')}catch(e){}}
pvWrap('drawKnight',()=>[0,0],70);
pvWrap('campFolk',(x,y)=>[x,y],60);
pvWrap('chicken',(x,y)=>[x,y],30);
pvWrap('campBanner',(x,y)=>[x,y],50);
pvWrap('drawSmith2',(x,y)=>[x,y],90);
pvWrap('drawMerchant2',(x,y)=>[x,y],90);
pvWrap('drawRancher2',(x,y)=>[x,y],90);
pvWrap('drawStable',()=>[CX-261,CY+101.5],130);
pvWrap('drawOneGate',G=>G&&isFinite(G.x)?[G.x,G.y]:null,230);
pvWrap('vz3Char',v=>v&&isFinite(v.x)?[v.x,v.y]:null,70);
/* ---------- ④ ของประดับพื้นเป็นภาพแคช (โหมดประหยัด) ---------- */
const SPC={m:new Map(),px:0,cap:7e6,bb:{},hit:0,mk:0};
const SPC_D=['flowers','leaves','crack','bonesc','snowdrift','ripple'];
const SPC_P=['rock','mrock','snowrock','rockV','stump','log','bush','fbush','frozbush','mush','skull','rib','bones','stake','cart','icicle','runest','coral','shell','amph','crate','barrel','rubble','cactus','pot','pillarB','statue','gear','tomb','sword','deadT','roots','obsid','flower','grassT','reeds','weed','dshrub','lily'];
/* กรอบภาพของแต่ละชนิด: วาดตัวจริงชิ้นแรกที่เจอ (ย่อเป็น s=1) ลงผ้าใบทดลองหลายแบบ (r ต่างกัน) แล้วหาขอบที่มีสี · ว่าง/ใหญ่เกินผ้าใบ = ไม่แคชชนิดนี้ */
function spcBB(tab,k,o){const key=tab+k;if(SPC.bb[key]!==undefined)return SPC.bb[key];const S=512,OX=S/2,OY=S*.74,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d',{willReadFrequently:true}),fn=(tab==='D'?VMD:VMP)[k].__f,g0=g;
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for(const r of[.03,.27,.51,.76,.98]){x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,S,S);x.setTransform(1,0,0,1,OX,OY);x.lineCap='round';g=x;try{fn(Object.assign({},o,{x:0,y:0,s:1,r,r2:1-r}),0)}catch(e){}finally{g=g0}
    const d=x.getImageData(0,0,S,S).data;for(let yy=0;yy<S;yy++){const row=yy*S*4;for(let xx=0;xx<S;xx++)if(d[row+xx*4+3]>4){if(xx<x0)x0=xx;if(xx>x1)x1=xx;if(yy<y0)y0=yy;if(yy>y1)y1=yy}}}
  let B=null;if(x1>=x0&&x0>1&&y0>1&&x1<S-2&&y1<S-2)B={x:x0-OX-3,y:y0-OY-3,w:x1-x0+6,h:y1-y0+6};SPC.bb[key]=B;return B}
function spcDraw(tab,k,o,f){const B=spcBB(tab,k,o);if(!B)return f(o,performance.now()/1000);const s=o.s||1,bx=B.x*s-2,by=B.y*s-2,bw=B.w*s+4,bh=B.h*s+4;const T=g.getTransform(),sc=Math.hypot(T.a,T.b)||1,q=Math.max(.5,Math.min(4,Math.round(sc*4)/4));
  let e=SPC.m.get(o);if(!e||e.q!==q){if(e)SPC.px-=e.c.width*e.c.height;const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(bw*q));c.height=Math.max(1,Math.ceil(bh*q));const x=c.getContext('2d');x.setTransform(q,0,0,q,-bx*q,-by*q);x.lineCap='round';
    const g0=g;g=x;try{f(Object.assign({},o,{x:0,y:0}),0)}catch(er){}finally{g=g0}e={c,q};SPC.m.set(o,e);SPC.px+=c.width*c.height;SPC.mk++;if(SPC.px>SPC.cap){SPC.m.clear();SPC.px=0;SPC.m.set(o,e);SPC.px=c.width*c.height}}else SPC.hit++;
  const ga=g.globalAlpha;g.drawImage(e.c,o.x+bx,o.y+by,bw,bh);g.globalAlpha=ga}
function spcOn(){return LOWQ&&!SPC.off}
(function(){const wrap=(tab,T,k)=>{const f=T[k];if(typeof f!=='function'||f.__spc)return;const w=function(o,t){if(!spcOn()||!o||!isFinite(o.x)||g.canvas!==cv)return f.apply(this,arguments);return spcDraw(tab,k,o,f)};w.__spc=1;w.__f=f;T[k]=w};
  try{SPC_D.forEach(k=>wrap('D',VMD,k))}catch(e){}try{SPC_P.forEach(k=>wrap('P',VMP,k))}catch(e){}})();
/* เปลี่ยนแมพ = ล้างแคช */
setInterval(()=>{try{if(SPC.map!==curMap){SPC.map=curMap;SPC.m.clear();SPC.px=0}}catch(e){}},1000);
/* ---------- ⑤ แถบ HUD (ใช้กับ patch340) ---------- */
function tx$(id,v){const e=$(id);if(e&&e.textContent!==v)e.textContent=v}
const HUW={w:200,t:0};
function hudNarrow(){const n=performance.now();if(n-HUW.t>1000){HUW.t=n;try{HUW.w=$('thp').parentElement.clientWidth||200}catch(e){}}return HUW.w<110}
/* ---------- ตั้งค่า → 🖥️ คุณภาพภาพ → อัตราเฟรม ---------- */
function flRowHtml(){const cur=FL.mode,B=(v,l)=>'<button class="cfgb'+(cur===v?' on':'')+'" type="button" data-flv="'+v+'">'+l+'</button>';
  return '<div class="setrow" data-flrow="1" style="flex-wrap:wrap;gap:4px"><span class="setl" style="flex:1 1 100%">🎞️ อัตราเฟรม<small>'+({auto:flCoarse()?'มือถือ/แท็บเล็ต: 60 ภาพต่อวินาที (จอ 90–120Hz ไม่ต้องวาดถี่เกินจำเป็น)':'คอม: ไม่จำกัด ตามรอบจอ','60':'60 ภาพต่อวินาที','30':'30 ภาพต่อวินาที · ลื่นสม่ำเสมอ ไม่สะดุด เครื่องเย็นกว่า ประหยัดแบต · แนะนำถ้ายังกระตุก',max:'วาดทุกรอบจอ (90/120/144Hz) · ใช้แรงเครื่องมากสุด'}[cur]||'')+'</small></span>'+
    '<div class="setseg" style="flex:1 1 100%;margin:2px 0 0">'+B('auto','อัตโนมัติ')+B('60','60')+B('30','30 ประหยัด')+B('max','สูงสุด')+'</div></div>'}
try{cfgUI=(f=>function(){const r=f.apply(this,arguments);try{const cap=[...ov.querySelectorAll('.card .cap')].find(c=>/คุณภาพภาพ/.test(c.textContent));if(cap&&!ov.querySelector('[data-flrow]')){const d=document.createElement('div');d.innerHTML='<hr>'+flRowHtml();
    const seg=cap.parentNode.querySelector('.setseg'),anchor=seg&&seg.nextElementSibling&&seg.nextElementSibling.classList.contains('seth')?seg.nextElementSibling:seg;const hr=d.querySelector('hr'),row=d.querySelector('[data-flrow]');
    if(anchor&&anchor.nextSibling){cap.parentNode.insertBefore(hr,anchor.nextSibling);cap.parentNode.insertBefore(row,hr.nextSibling)}else{cap.parentNode.appendChild(hr);cap.parentNode.appendChild(row)}
    row.querySelectorAll('[data-flv]').forEach(b=>b.onclick=e=>{e.stopPropagation();flSet(b.dataset.flv);try{sfx('click')}catch(_){}const n=document.createElement('div');n.innerHTML=flRowHtml();row.replaceWith(n.firstChild);try{cfgUI()}catch(_){}})}}catch(e){}return r})(cfgUI)}catch(e){}
/* ยังกระตุกในโหมดประหยัด (ต่ำกว่า 40 เฟรมนาน 20 วิ) → แนะนำ 30 เฟรมครั้งเดียว */
const FLT={bad:0,done:(()=>{try{return localStorage.getItem('refugee_fps_tip')==='1'}catch(e){return false}})()};
setInterval(()=>{try{if(FLT.done||!me.cls||!run||!ov.hidden||document.hidden||!LOWQ||flTarget()===30)return;const L=pfLive();if(!L)return;if(L.fps<40){if(++FLT.bad>=10){FLT.done=true;try{localStorage.setItem('refugee_fps_tip','1')}catch(e){}
  sysMsg('🎞️ เครื่องยังกระตุกอยู่ · ลองตั้ง อัตราเฟรม 30 (เมนู → ⚙️ ตั้งค่า → คุณภาพภาพ) จะลื่นสม่ำเสมอกว่า');banner={s:'🎞️ ลองตั้งอัตราเฟรม 30 ที่ตั้งค่า → คุณภาพภาพ',t:5}}}else FLT.bad=Math.max(0,FLT.bad-1)}catch(e){}},2000);
