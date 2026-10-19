
/* ===== v450 · เดินไวในค่าย (ค่ายกว้างขึ้น ×1.45 → ทางลัดไปหา NPC/ประตู) =====
   ปุ่ม «🧭 เดินไวในค่าย» ใต้เกจคลั่ง (เฉพาะแมพค่าย) → รายการปลายทาง → วาร์ปไปยืนหน้าเป้าหมาย
   ใช้ไม่ได้: มีมอนอยู่ใกล้ (250) · กำลังซ้อนท้าย/ขี่คอ · ล้มอยู่ · ระหว่างเนื้อเรื่อง */
const U64={open:0,t:0};
function u64Dest(){const M=MAPS[1],L=[];if(!M)return L;const add=(ic,n,x,y,dy)=>{if(x>0&&y>0)L.push({ic,n,x,y:y+(dy==null?34:dy)})};
  add('🎖️',M.npc4&&M.npc4.n,M.npc4&&M.npc4.x,M.npc4&&M.npc4.y);add('🧪',M.npc&&M.npc.n,M.npc&&M.npc.x,M.npc&&M.npc.y);add('🔨',(M.npc3&&M.npc3.n)+' · เตาหลอม',M.npc3&&M.npc3.x,M.npc3&&M.npc3.y);
  add('💠',M.npc5&&M.npc5.n,M.npc5&&M.npc5.x,M.npc5&&M.npc5.y);add('🐎',M.npc2&&M.npc2.n,M.npc2&&M.npc2.x,M.npc2&&M.npc2.y);add('🍲',M.npc6&&M.npc6.n,M.npc6&&M.npc6.x,M.npc6&&M.npc6.y);
  try{add('🏠','ลานเต็นท์ (เต็นท์ของฉัน)',TNE.x,TNE.y,40)}catch(e){}
  try{add('🏆','อนุสาวรีย์วีรชนบอสโลก',WBS[0].x,WBS[0].y,30)}catch(e){}
  try{if(rbEligible()||me.rb)add('🌅','แท่นบูชาจุติ',RBA.x,RBA.y,40)}catch(e){}
  try{add('🎯','ลานฝึก (หุ่นทดสอบดาเมจ)',TG.x,TG.y,70)}catch(e){}
  (M.gates||[]).forEach(G=>{try{if(gHid(G)||Math.hypot(G.x-CX,G.y-CY)>900||me.lv<(G.req||1))return}catch(e){return}const nm=G.nm||(MAPS[G.to]&&MAPS[G.to].n)||'ประตู';add(G.sky?'✨':G.wb?'🐉':'🌀','ประตู · '+nm,G.x,G.y,46)});
  return L.filter(d=>d.n&&d.n!=='undefined')}
function u64Why(){if(curMap!==1)return'ใช้ได้ในค่ายผู้อพยพเท่านั้น';if(!run||!me.cls||me.down>0)return'ตอนนี้ใช้ไม่ได้';try{if(SD.on)return'ปิดบทสนทนาก่อน'}catch(e){}
  try{if(typeof RDE!=='undefined'&&RDE.on)return'ลงจากหลังสัตว์ก่อน'}catch(e){}try{if(typeof SKE!=='undefined'&&SKE.on)return'ลงจากคอก่อน'}catch(e){}
  if(mons.some(m=>m.hp>0&&!m.dum&&!m.pv&&Math.hypot(m.x-me.x,m.y-me.y)<250))return'มีมอนอยู่ใกล้ — สู้ให้จบก่อน';return''}
function u64Go(i){const d=u64Dest()[i];if(!d)return;const w=u64Why();if(w){banner={s:'🧭 '+w,t:2};return}
  me.x=d.x;me.y=d.y;try{me.dg=null;joy=null}catch(e){}try{campCollide()}catch(e){}try{cam.x=me.x-W/2;cam.y=me.y-H/2}catch(e){}
  try{burst(me.x,me.y-10,['#ffe9a0','#9ad8ff','#ffffff'],LOWQ?8:20,120,.5,{glow:1,g:-30})}catch(e){}try{sfx('gate')}catch(e){}banner={s:'🧭 มาถึง '+d.n,t:1.8};u64Close()}
function u64Close(){const p=$('u64p');if(p)p.hidden=true;U64.open=0}
function u64Open(){u64CSS();let p=$('u64p');if(!p){p=document.createElement('div');p.id='u64p';document.body.appendChild(p);
    p.addEventListener('click',e=>{const b=e.target.closest('[data-u64]');if(b){u64Go(+b.dataset.u64);return}if(e.target===p||e.target.closest('[data-u64x]'))u64Close()})}
  const w=u64Why(),L=u64Dest();p.innerHTML='<div class="bx"><div class="hd">🧭 เดินไวในค่าย<button data-u64x="1" aria-label="ปิด">✕</button></div>'+(w?'<div class="wn">'+w+'</div>':'')+
    '<div class="ls">'+L.map((d,i)=>{const m=Math.round(Math.hypot(d.x-me.x,d.y-me.y)/10);return'<button data-u64="'+i+'"'+(w?' disabled':'')+'><i>'+d.ic+'</i><span>'+d.n+'</span><small>'+m+' ม.</small></button>'}).join('')+'</div></div>';
  p.hidden=false;U64.open=1}
function u64CSS(){if($('u64css'))return;const st=document.createElement('style');st.id='u64css';
  st.textContent='#u64b{position:fixed;z-index:31;padding:5px 10px;border-radius:14px;border:1.5px solid #c9a050;background:linear-gradient(#24345c,#121a2e);color:#f3d08a;font:700 11px system-ui;box-shadow:0 2px 6px rgba(0,0,0,.45)}#u64b[hidden],#u64p[hidden]{display:none!important}'+
  '#u64p{position:fixed;inset:0;z-index:70;background:rgba(6,4,10,.5);display:flex;align-items:flex-end;justify-content:center;padding:12px}#u64p .bx{width:min(380px,100%);max-height:70vh;overflow:auto;border-radius:16px;background:rgba(18,24,44,.97);border:1.5px solid #c9a050;padding:10px;color:#f3e6c8}'+
  '#u64p .hd{display:flex;justify-content:space-between;align-items:center;font:800 15px system-ui;color:#f3d08a;margin:0 2px 8px}#u64p .hd button{background:none;border:0;color:#f3d08a;font-size:16px}#u64p .wn{background:rgba(200,80,40,.25);border:1px solid #e0804a;border-radius:10px;padding:6px 8px;margin-bottom:8px;font-size:12px}'+
  '#u64p .ls{display:grid;gap:6px}#u64p .ls button{display:flex;align-items:center;gap:8px;text-align:left;padding:8px 10px;border-radius:10px;border:1px solid rgba(201,160,80,.45);background:rgba(40,54,90,.7);color:#f3e6c8;font:600 13px system-ui}#u64p .ls button[disabled]{opacity:.45}#u64p .ls i{font-style:normal;font-size:17px;width:22px;text-align:center}#u64p .ls span{flex:1}#u64p .ls small{opacity:.7;font-size:11px}';
  document.head.appendChild(st)}
setInterval(()=>{try{u64CSS();let b=$('u64b');if(!b){b=document.createElement('button');b.id='u64b';b.textContent='🧭 เดินไวในค่าย';b.addEventListener('click',e=>{e.stopPropagation();u64Open()});document.body.appendChild(b)}
  let sh=curMap===1&&run&&me.cls&&ov.hidden;try{if(SD.on||(typeof PH!=='undefined'&&PH.on)||document.body.classList.contains('csm'))sh=false}catch(e){}
  if(sh){const r=$('sb')&&$('sb').getBoundingClientRect();if(r&&r.width){b.style.right=Math.max(6,Math.round(innerWidth-r.right))+'px';b.style.top=Math.round(r.bottom+30)+'px'}}
  if(b.hidden===sh)b.hidden=!sh;if(!sh&&U64.open)u64Close()}catch(e){}},400);
/* ยืนตรงจุดศูนย์กลางสิ่งกีดขวางพอดี (เช่น เซฟเก่าตกทับอาคารที่ย้ายมา) → ทิศดันเป็นศูนย์ ไม่ขยับ: ขยับเล็กน้อยก่อนดัน */
campCollide=(f=>function(){try{if(curMap===1)for(const [x,y,r] of CAMP.cols){if(Math.abs(me.x-(CX+x))<.5&&Math.abs(me.y-(CY+y))<.5){me.y+=1;break}}}catch(e){}return f.apply(this,arguments)})(campCollide);
