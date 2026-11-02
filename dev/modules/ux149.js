/* ---------- v573 วาร์ประหว่างโหลดแมพ (ซ่อนการกระตุกช่วงแรกที่เข้าแมพ) ----------
   · เปลี่ยนแมพ → ชั้นวาร์ป (DOM ทับแคนวาส) หมุน/เรืองด้วย CSS transform/opacity → การ์ดจอเล่นต่อได้แม้เกมกำลังค้างประมวลผล
   · เฟรมแรกหลังเปลี่ยนแมพข้ามการวาด (ให้วาร์ปขึ้นจอก่อนงานหนัก) · ใต้วาร์ปสร้างชังก์พื้นด้วยงบเต็ม 35 ms/เฟรม + เตรียมกรอบภาพมอน
   · ปิดเมื่อพร้อม: วาดแล้ว ≥ 3 เฟรม และไม่มีชังก์ที่มองเห็นค้างสร้าง · อย่างน้อย 0.28 วิ · ไม่เกิน 2 วิ
   · ระหว่างวาร์ป ตัวละครไม่รับดาเมจ · ไม่ขึ้นตอนคัตซีน/บทพูด หรือย้ายตำแหน่งในแมพเดิม · ปิดระบบ: WARP.off=1 */
const WARP={on:0,off:0,t0:0,el:null,skip:0,fr:0,min:280,max:2000,mp:-1,bb:0,stat:{n:0,ms:[]}};
{const st=document.createElement('style');st.textContent=
 '#warpov{position:absolute;z-index:4;pointer-events:none;overflow:hidden;opacity:1;transition:opacity .24s ease-out;contain:strict}#warpov[hidden]{display:none}#warpov.out{opacity:0}'
+'#warpov .wb{position:absolute;inset:0;background:radial-gradient(circle at 50% 46%,var(--wc) 0%,rgba(8,8,18,.96) 62%,#05060c 100%)}'
+'#warpov .wr{position:absolute;left:50%;top:46%;width:46vmin;height:46vmin;margin:-23vmin 0 0 -23vmin;border-radius:50%;border:3px dashed var(--wl);will-change:transform;animation:wspin 1.6s linear infinite;box-shadow:0 0 22px var(--wl),inset 0 0 22px var(--wl)}'
+'#warpov .wr2{width:30vmin;height:30vmin;margin:-15vmin 0 0 -15vmin;border-style:dotted;border-width:4px;animation:wspin2 1.1s linear infinite}'
+'#warpov .wc{position:absolute;left:50%;top:46%;width:16vmin;height:16vmin;margin:-8vmin 0 0 -8vmin;border-radius:50%;background:radial-gradient(circle,#fff 0%,var(--wl) 38%,rgba(0,0,0,0) 70%);will-change:transform,opacity;animation:wpulse .9s ease-in-out infinite alternate}'
+'#warpov .wn{position:absolute;left:0;right:0;top:calc(46% + 28vmin);text-align:center;color:#fff;font:700 15px system-ui,sans-serif;text-shadow:0 0 8px var(--wl),0 1px 2px #000;letter-spacing:.5px;will-change:opacity;animation:wfade .5s ease-out both}'
+'@keyframes wspin{to{transform:rotate(360deg)}}@keyframes wspin2{to{transform:rotate(-360deg) scale(1.04)}}@keyframes wpulse{from{transform:scale(.82);opacity:.75}to{transform:scale(1.12);opacity:1}}@keyframes wfade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}';
 document.head.appendChild(st)}
function warpCol(id){let c='#3a4a6a';try{const b=MAPS[id]&&MAPS[id].bg;if(typeof b==='string'&&/^#[0-9a-f]{3,6}$/i.test(b))c=b}catch(e){}const v=rgbOf(c).split(',').map(Number),L=v.map(x=>Math.round(x+(255-x)*.65));return['rgba('+v.join(',')+',.95)','rgb('+L.join(',')+')']}
function warpShow(id){if(WARP.off)return;const st=document.getElementById('stage');if(!st||!cv)return;let el=WARP.el;
  if(!el){el=document.createElement('div');el.id='warpov';el.innerHTML='<div class="wb"></div><div class="wr"></div><div class="wr wr2"></div><div class="wc"></div><div class="wn"></div>';st.appendChild(el);WARP.el=el}
  const sr=st.getBoundingClientRect(),cr=cv.getBoundingClientRect(),sc=st.offsetWidth?sr.width/st.offsetWidth:1;el.style.left=((cr.left-sr.left)/sc)+'px';el.style.top=((cr.top-sr.top)/sc)+'px';el.style.width=(cr.width/sc)+'px';el.style.height=(cr.height/sc)+'px';
  const[wc,wl]=warpCol(id);el.style.setProperty('--wc',wc);el.style.setProperty('--wl',wl);const nm=el.querySelector('.wn'),t=(MAPS[id]&&MAPS[id].n)||'';if(nm.textContent!==t){nm.textContent=t;nm.style.animation='none';void nm.offsetWidth;nm.style.animation=''}
  el.classList.remove('out');el.hidden=false;WARP.on=1;WARP.t0=performance.now();WARP.mp=id;WARP.skip=1;WARP.fr=0;WARP.bb=0}
function warpHide(){const el=WARP.el;WARP.on=0;if(!el)return;el.classList.add('out');const t=performance.now();WARP.stat.n++;WARP.stat.ms.push(Math.round(t-WARP.t0));if(WARP.stat.ms.length>20)WARP.stat.ms.shift();
  setTimeout(()=>{if(!WARP.on)el.hidden=true},260)}
function warpReady(){const el=performance.now()-WARP.t0;if(el>=WARP.max)return true;if(el<WARP.min||WARP.fr<3)return false;
  try{if(MX.jobs)for(const J of MX.jobs.values())if(J.vis)return false}catch(e){}return true}
setTimeout(()=>{
  try{const _em=enterMap;window.enterMap=enterMap=function(id,arr){const prev=curMap;let show=false;
      try{show=!WARP.off&&run&&me.cls&&MAPS[id]&&id!==prev&&!(SD&&SD.on)&&!(typeof CZ!=='undefined'&&CZ&&CZ.on)&&!document.hidden}catch(e){}
      if(show)warpShow(id);return _em.apply(this,arguments)}}catch(e){console.warn('warp em',e)}
  try{const _d=draw;window.draw=draw=function(){if(WARP.on&&WARP.skip>0){WARP.skip--;return}const r=_d.apply(this,arguments);
      if(WARP.on){WARP.fr++;try{me.inv3=Math.max(me.inv3||0,.4)}catch(e){}
        try{if(MX.jobs&&MX.jobs.size)mxRun(35)}catch(e){}
        if(!WARP.bb&&WARP.fr>=2){WARP.bb=1;try{const seen=new Set();for(const m of mons){if(m.t>=3||seen.has(m.t))continue;seen.add(m.t);mpcBB(m)}}catch(e){}}
        if(warpReady())warpHide()}return r}}catch(e){console.warn('warp draw',e)}
},1300);
/* กันค้าง: แท็บกลับมา/เกิด error → ปิดวาร์ปเมื่อเกินเวลา */
setInterval(()=>{try{if(WARP.on&&performance.now()-WARP.t0>WARP.max+600)warpHide()}catch(e){}},500);
