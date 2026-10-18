
/* ===== v437 · มอนขยับต่อระหว่างโฮสต์ค้าง · หยุดเวลาหอคอยตอนเลือกพรเริ่มต้น · พาผู้เล่นใหม่ไปเต็นท์ ===== */
/* ---------- ① มอนไม่ค้างตอนโฮสต์แลค ----------
   เครื่องที่ไม่ใช่โฮสต์ประเมินความเร็วมอนจากภาพรวมโลก 2 ชุดล่าสุด
   ถ้าไม่ได้รับภาพรวมเกิน 0.45 วิ → ขยับมอนต่อเอง (ตัวที่กำลังเดินจะไล่ผู้เล่นใกล้สุด หยุดที่ระยะตี)
   ทำได้นานสุด 5 วิ · พอโฮสต์ (ใหม่) ส่งภาพรวมมา ตำแหน่งจะไหลเข้าหาของจริงตามปกติ */
const U54={lw:0,ext:0,en:0,rs:0,tg:0,tgv:0};
try{applyWorld=(f=>function(d){const n=performance.now(),prev={};for(const m of mons)if(m.tx!==undefined)prev[m.id]=[m.tx,m.ty];
  const gap=U54.lw?n-U54.lw:0,wasExt=U54.ext;const r=f.apply(this,arguments);U54.lw=n;U54.ext=0;
  for(const m of mons){const p=prev[m.id];if(!p){m.__vx=0;m.__vy=0;continue}if(wasExt||gap<40||gap>1200)continue;
    const vx=(m.tx-p[0])/gap*1000,vy=(m.ty-p[1])/gap*1000;m.__vx=(m.__vx||0)*.4+vx*.6;m.__vy=(m.__vy||0)*.4+vy*.6}
  return r})(applyWorld)}catch(e){}
function u54Pl(){const P=[];if(me.cls&&!(me.down>0))P.push([me.x,me.y]);for(const o of Object.values(others))if(o&&o.hp>0&&typeof o.x==='number')P.push([o.x,o.y]);return P}
function u54Ext(dt){if(!run||!U54.lw)return;const now=performance.now(),q=now-U54.lw;if(q<450||q>5000){return}
  if(!U54.ext){U54.ext=1;U54.en++}const P=u54Pl();
  for(const m of mons){if(!(m.hp>0)||m.tx===undefined||m.pv||m.dum)continue;const sp=Math.hypot(m.__vx||0,m.__vy||0);if(sp<8)continue;
    const v=Math.min(m.t>=3?90:150,Math.max(30,sp));let best=null,bd=420;for(const [px,py] of P){const d=Math.hypot(px-m.tx,py-m.ty);if(d<bd){bd=d;best=[px,py]}}
    let rr=18;try{rr=(typeof mR==='function'?mR(m):18)+16}catch(e){}
    if(best){if(bd>rr){const s=Math.min(bd-rr,v*dt);m.tx+=(best[0]-m.tx)/bd*s;m.ty+=(best[1]-m.ty)/bd*s}}
    else{const k=Math.max(0,1-(q-450)/1500);m.tx+=(m.__vx||0)/sp*v*k*dt;m.ty+=(m.__vy||0)/sp*v*k*dt}}}
try{step=(f=>function(dt){const r=f.apply(this,arguments);try{if(!isHost())u54Ext(dt);else{U54.lw=0;U54.ext=0}}catch(e){}return r})(step)}catch(e){}

/* ---------- ② หอคอย: เวลาชั้นหยุดระหว่างเลือกพรเริ่มต้น ----------
   (โฮสต์) ตั้งแต่เริ่มปีนจนกว่าจะเลือกพรเริ่มต้นเสร็จ — สูงสุด 16 วิ — ไม่นับเวลาและยังไม่ปล่อยมอน */
function u54BlPause(){if(!isTw()||!dg||dg.ph!=='run'||!me.cls){return false}const n=performance.now();if(!U54.rs)U54.rs=n;if(n-U54.rs>16000)return false;
  const p=me.blPick;if(p&&p.why==='พรเริ่มต้นก่อนปีน')return true;return!(me.twBl||[]).length&&!U53B.on}
try{twSim=(f=>function(dt){try{if(!isTw()||!dg||dg.ph!=='run')U54.rs=0;else if(u54BlPause()){U54.bp=1;return}}catch(e){}U54.bp=0;return f.apply(this,arguments)})(twSim)}catch(e){}
try{blUI=(f=>function(){const r=f.apply(this,arguments);try{const p=me.blPick,el=$('blpk');if(p&&el&&p.why==='พรเริ่มต้นก่อนปีน'&&isTw()&&!el.querySelector('.u54bp')){const d=document.createElement('div');d.className='u54bp';d.style.cssText='text-align:center;font-size:12px;color:#ffe08a;margin-top:6px';d.textContent='⏸ เวลาของชั้นหยุดรอ — มอนจะออกหลังเลือกพร';el.appendChild(d)}}catch(e){}return r})(blUI)}catch(e){}

/* ---------- ③ พาผู้เล่นใหม่ไปเต็นท์ ---------- */
function u54TentNew(){try{return!Object.keys(tSt().own).length}catch(e){return false}}
try{TIPL.push(['tent','🏠','<b>คุณมีเต็นท์ส่วนตัวแล้ว!</b> อยู่ลานเต็นท์ข้างบึง (มีลูกศรชี้) · มีชุดแต่งฟรี 7 ชิ้นรออยู่ · นอนพักในเต็นท์ได้โบนัส EXP/ทอง ตอนออกไปล่า <button data-u54tn="1" style="margin-left:6px;padding:3px 9px;border-radius:8px;border:1px solid #e8c060;background:#3a2a10;color:#ffe9a8;font-weight:700">🏠 เข้าเต็นท์เลย</button>',
  ()=>{const ok=me.lv>=5&&curMap===1&&u54TentNew();if(ok)U54.tg=performance.now()+60000;return ok}])}catch(e){}
document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('[data-u54tn]');if(!b)return;try{const c=$('tipc');if(c)c.hidden=true;tentHome()}catch(_){}});
/* ลูกศรเด้งเหนือทางเข้าลานเต็นท์ (60 วิหลังคำแนะนำ หรือจนกว่าจะเข้าเต็นท์ครั้งแรก) */
try{drawTentGate=(f=>function(){const r=f.apply(this,arguments);try{if(curMap===1&&U54.tg>performance.now()&&u54TentNew()&&inView(TNE.x,TNE.y,160)){const t=performance.now()/1000,y=TNE.y-156+Math.sin(t*4)*5,x=TNE.x;
  g.save();g.fillStyle='rgba(255,216,74,.95)';g.strokeStyle='#5a3a10';g.lineWidth=1.5;g.beginPath();g.moveTo(x-11,y-14);g.lineTo(x+11,y-14);g.lineTo(x+11,y-2);g.lineTo(x+18,y-2);g.lineTo(x,y+14);g.lineTo(x-18,y-2);g.lineTo(x-11,y-2);g.closePath();g.fill();g.stroke();
  g.restore()}}catch(e){}return r})(drawTentGate)}catch(e){}

/* ---------- ④ จากการไล่ดูทุกแมพ: กล่องเควสฝั่งซ้ายบังตัวละคร · ป้ายชื่อผู้เล่นซ้อนกันตอนยืนรวมกลุ่ม ---------- */
/* กล่องเควสทุกกล่องใน #topb (เนื้อเรื่อง · คู่มือรูน · จุติ · ฯลฯ) จางลงเมื่อทับตัวเราหรือผู้เล่นคนอื่น (แตะได้ตามเดิม) */
setInterval(()=>{try{const tb=$('topb');if(!tb||!me.cls)return;const cv=document.querySelector('canvas'),cr=cv?cv.getBoundingClientRect():{left:0,top:0},z=ZM.z;
  const S=[[me.x,me.y]];for(const o of Object.values(others))if(o&&typeof o.x==='number')S.push([o.x,o.y]);
  const P=S.map(([x,y])=>[cr.left+(x*z-CAMF.x+SW0/2),cr.top+(y*z-CAMF.y+H/2)]);
  for(const e of tb.children){if(e.tagName!=='DIV'||!/q$/.test(e.id)||e.id==='stq')continue;if(e.hidden||!e.offsetParent){e.classList.remove('u54dim');continue}const r=e.getBoundingClientRect();
    const hit=P.some(([sx,sy])=>r.right>sx-40&&r.left<sx+40&&r.bottom>sy-62*z&&r.top<sy+24);e.classList.toggle('u54dim',hit)}
  const e=$('stq');if(e&&!e.hidden&&!e.classList.contains('stqdim')){const r=e.getBoundingClientRect();if(P.slice(1).some(([sx,sy])=>r.right>sx-40&&r.left<sx+40&&r.bottom>sy-62*z&&r.top<sy+24))e.classList.add('stqdim')}}catch(_){}},250);
{const st=document.createElement('style');st.textContent='#topb>div{transition:opacity .25s}#topb>div.u54dim:not(:active){opacity:.4}';document.head.appendChild(st)}
/* ป้ายชื่อซ้อนกัน: ป้ายของเราชัดเสมอ · คนที่ยืนหน้าสุด (y มากกว่า) ชัด · ป้ายที่ถูกทับ จางลงและซ่อนฉายาชั่วคราว */
let U54NA=1;const U54T={cur:[],prev:[],fr:-1};
function u54TagDim(x,y,lk){const me0=lk&&lk.u===uid;if(me0)return 0;for(const [px,py,pm] of U54T.prev){if(Math.abs(px-x)<1&&Math.abs(py-y)<1)continue;if(Math.abs(px-x)<92&&Math.abs(py-y)<32){if(pm||py>y+1||(Math.abs(py-y)<=1&&px>x))return 1}}return 0}
try{drawP0=(f=>function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const fr=typeof FRN!=='undefined'?FRN:0;const n=performance.now();if(n-U54T.fr>12){U54T.prev=U54T.cur;U54T.cur=[];U54T.fr=n}
  U54T.cur.push([x,y,lk&&lk.u===uid?1:0]);let dim=0;try{if(!PH||!PH.on)dim=u54TagDim(x,y,lk)}catch(e){dim=0}
  if(!dim)return f.apply(this,arguments);U54NA=.5;try{return f.call(this,x,y,cls,name,hp,mh,down,hd,bt,ph,fx,null,c2,lk)}finally{U54NA=1;g.globalAlpha=1}})(drawP0)}catch(e){}
