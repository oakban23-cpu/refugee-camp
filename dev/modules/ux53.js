
/* ===== v436 · กลางค่ายโล่งขึ้น · ของแต่งเต็นท์เริ่มต้น · พรหอคอยหลังกดเริ่ม ===== */
/* ---------- ① ป้าย/ชื่อ NPC/ฟองคำพูด จางลงเมื่อมีผู้เล่นยืนทับ ---------- */
const U53={P:[],pt:0,M0:null,Mi:null,dep:0};
function u53Pl(){const n=performance.now();if(n-U53.pt<30)return U53.P;U53.pt=n;const P=[];
  try{if(me&&me.cls&&run)P.push([me.x,me.y-(typeof skyOY==='function'?skyOY():0)])}catch(e){}
  try{for(const o of Object.values(others))if(o&&typeof o.x==='number'&&!(o.sl>0))P.push([o.x,o.y])}catch(e){}
  U53.P=P;return P}
/* ค่าความทึบ (0.22–1) ของกล่องข้อความกว้าง w ที่จุด (x,y) พิกัดโลก — ยิ่งทับตัวผู้เล่นมากยิ่งจาง */
function u53Aw(x,y,w,h){const P=u53Pl();if(!P.length)return 1;const hw=w/2,hh=h||14;let k=0;
  for(const [px,py] of P){const ox=hw+12-Math.abs(x-px),oy=Math.min(y+4-(py-72),(py+16)-(y-hh));if(ox>0&&oy>0)k=Math.max(k,Math.min(ox,oy)/10)}
  return k>0?1-.78*Math.min(1,k):1}
const U53G={ft:CanvasRenderingContext2D.prototype.fillText,st:CanvasRenderingContext2D.prototype.strokeText};
function u53TA(t,x,y){const M=g.getTransform(),Mi=U53.Mi;if(!Mi)return 1;const dx=M.a*x+M.c*y+M.e,dy=M.b*x+M.d*y+M.f,wx=Mi.a*dx+Mi.c*dy+Mi.e,wy=Mi.b*dx+Mi.d*dy+Mi.f;
  let w=0;try{w=g.measureText(String(t)).width*(M.a/(U53.M0.a||1))}catch(e){w=40}const sz=Math.max(8,Math.min(26,(parseFloat((/(\d+(\.\d+)?)px/.exec(g.font)||[0,11])[1])||11)*(M.a/(U53.M0.a||1))));
  let ax=wx;const al=g.textAlign;if(al==='left'||al==='start')ax=wx+w/2;else if(al==='right'||al==='end')ax=wx-w/2;return u53Aw(ax,wy,w,sz)}
function u53Hook(on){if(on){if(U53.dep++)return;try{U53.M0=g.getTransform();U53.Mi=U53.M0.inverse()}catch(e){U53.Mi=null}
    g.fillText=function(t,x,y,mw){const a=u53TA(t,x,y);if(a>=.999)return mw===undefined?U53G.ft.call(g,t,x,y):U53G.ft.call(g,t,x,y,mw);const o=g.globalAlpha;g.globalAlpha=o*a;try{mw===undefined?U53G.ft.call(g,t,x,y):U53G.ft.call(g,t,x,y,mw)}finally{g.globalAlpha=o}};
    g.strokeText=function(t,x,y,mw){const a=u53TA(t,x,y);if(a>=.999)return mw===undefined?U53G.st.call(g,t,x,y):U53G.st.call(g,t,x,y,mw);const o=g.globalAlpha;g.globalAlpha=o*a;try{mw===undefined?U53G.st.call(g,t,x,y):U53G.st.call(g,t,x,y,mw)}finally{g.globalAlpha=o}}}
  else{if(--U53.dep>0)return;U53.dep=0;delete g.fillText;delete g.strokeText}}
/* ฟังก์ชันประกาศแบบ global ถูกเรียกตามชื่อ จึงแทนที่ได้ */
try{drawGate=(f=>function(){if(curMap!==1&&curMap!==9)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawGate)}catch(e){}
try{drawCommander=(f=>function(){if(curMap!==1)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawCommander)}catch(e){}
try{drawStable=(f=>function(){u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawStable)}catch(e){}
try{drawCity=(f=>function(){u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawCity)}catch(e){}
try{drawHerald=(f=>function(){if(curMap!==1)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawHerald)}catch(e){}
try{drawRuneSmith=(f=>function(){if(curMap!==1)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawRuneSmith)}catch(e){}
try{drawCook=(f=>function(){if(curMap!==1)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawCook)}catch(e){}
try{drawTentGate=(f=>function(){if(curMap!==1)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawTentGate)}catch(e){}
try{drawFortNpc=(f=>function(){if(curMap!==1)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawFortNpc)}catch(e){}
try{drawWBGuards=(f=>function(){if(curMap!==1)return f.apply(this,arguments);u53Hook(1);try{return f.apply(this,arguments)}finally{u53Hook(0)}})(drawWBGuards)}catch(e){}
/* ชื่อพ่อค้า (วาดตรงใน draw) */
function u53FT(t,x,y){if(curMap!==1&&curMap!==9){g.fillText(t,x,y);return}const a=u53Aw(x,y,g.measureText(String(t)).width,12),o=g.globalAlpha;g.globalAlpha=o*a;g.fillText(t,x,y);g.globalAlpha=o}
/* ป้ายประตู (กล่อง + ตัวอักษร) */
drawGLQ=function(){const c1=curMap===1||curMap===9;for(const[lb,x,y]of GLQ){g.save();g.font='bold 11px system-ui';g.textAlign='center';const tw=g.measureText(lb).width+20;
    if(c1)g.globalAlpha*=u53Aw(x,y,tw,16);g.fillStyle='rgba(22,30,70,.9)';g.beginPath();g.roundRect(x-tw/2,y-15,tw,22,6);g.fill();g.strokeStyle='#e8c060';g.lineWidth=1.4;g.stroke();g.fillStyle='#fff3cc';U53G.ft.call(g,lb,x,y);g.restore()}GLQ.length=0};
/* ฟองคำพูด NPC: จางเมื่อทับผู้เล่น + เงียบนานขึ้นเมื่อคนเยอะ */
function u53BA(x,y,t){if(curMap!==1&&curMap!==9)return 1;return u53Aw(x,y-6,String(t||'').length*5.6+12,16)}
function u53Crowd(x,y,r){let n=0;for(const [px,py] of u53Pl())if(Math.hypot(px-x,py-y)<(r||260))n++;return n}
function u53Gap(){if(curMap!==1&&curMap!==9)return 1;const n=u53Crowd(me.x,me.y,260);return n>=4?2.6:n>=3?1.9:1}

/* ---------- ② ของแต่งเต็นท์เริ่มต้น ---------- */
const TSTART=['bed1','rug1','lit1','pla1','wal1','tab1','cei1'];
function tentStarter(){if(!me.cls)return 0;const S=tSt();if(Object.keys(S.own).length||S.st0)return 0;let n=0;
  for(const k of TSTART){const D=TDECO[k];if(!D)continue;S.own[k]=1;if(!S.d[D[0]]){S.d[D[0]]=k;n++}}S.st0=1;try{recalc()}catch(e){}return n}
try{tentHome=(f=>function(){const ok=me.cls&&run&&!(me.down>0)&&(curMap===1||tentHere());const n=ok?tentStarter():0;const r=f.apply(this,arguments);
  if(n){setTimeout(()=>{banner={s:'🎁 ได้รับชุดแต่งเต็นท์เริ่มต้น '+n+' ชิ้น · '+tRank(tComfort(tSt().d)),t:4.5};try{sysMsg('🎁 ชุดแต่งเต็นท์เริ่มต้น: เตียงฟาง · พรมทอลาย · ตะเกียง · กระถางสมุนไพร · ธงค่าย · โต๊ะน้ำชา · ไฟสายระย้า (เปลี่ยน/ซื้อเพิ่มได้ที่เมนู 🏠 เต็นท์ → ตกแต่ง)')}catch(e){}try{sfx('quest')}catch(e){}
    try{for(let i=0;i<22;i++)burst(CX+rnd(-160,160),CY+rnd(-120,120),['#ffe9a0','#ffd060','#fff'],2,60,.7,{glow:1,g:-40})}catch(e){}},700)}return r})(tentHome)}catch(e){}

/* ---------- ③ พรเริ่มต้นหอคอย: เสนอหลังกดเริ่มปีน ไม่ใช่ตอนเข้าห้องรอ ---------- */
const U53B={on:0,at:0};
setInterval(()=>{try{if(!isTw()||!me.cls){U53B.on=0;U53B.at=0;return}if(U53B.on)return;
  if(!dg||dg.ph!=='run'){U53B.at=0;return}if((me.twBl||[]).length){U53B.on=1;return}if(me.blPick)return;
  const n=performance.now();if(!U53B.at){U53B.at=n+900;return}if(n<U53B.at)return;U53B.on=1;blOffer('พรเริ่มต้นก่อนปีน')}catch(e){}},300);
