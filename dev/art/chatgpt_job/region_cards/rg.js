/* ---------- v637 การ์ดภูมิภาคตอนวาร์ป (RGC) ----------
   หน้าวาร์ป v573 มีภาพทิวทัศน์ของภาคนั้นเต็มจอ (เลื่อนช้า ๆ) + ชื่อภาคตัวทองช่วงบน + ชื่อแมพช่วงล่าง · วงแหวนเล็กลงเป็นตัวบอกกำลังโหลด
   · เข้าภาคใหม่ → ค้างการ์ดอย่างน้อย RGC.hold ms ให้อ่านทัน · ย้ายแมพในภาคเดิม → เวลาเท่าเดิม
   · โหลดภาพของภาคปัจจุบันและภาคข้างเคียงล่วงหน้า · ภาพยังไม่มา = ใช้กราดิเอนต์เดิม
   · แมพนอกรายการ (ดัน/ห้องพิเศษ) = หน้าวาร์ปเดิม · ปิด: RGC.off=1 */
const RGC={off:0,hold:1200,img:{},last:0,cur:0,min0:0,n:0,
  R:{1:[1,2,3,4,5,6,7,8],2:[9,10,11,12,13,14,15,16,17,18],3:[19,20,21,22],4:[23,24,25,26],5:[27,28,29],6:[30,31,32,33],7:[34,35,36],8:[38,39],9:[40,41,42],10:[43,44,45]},
  T:{1:'รอยผนึกแตก',2:'ฟ้าแตก',3:'แผ่นดินเงาใต้เมฆ',4:'หัวใจที่ถูกแบ่ง',5:'บัลลังก์ลอยฟ้า',6:'สะพานรุ่งอรุณ',7:'ผู้เก็บดาวร่วง',8:'ทะเลเมฆไร้ฝั่ง',9:'ห้วงดาวไร้ขอบ',10:'แผ่นดินที่แบกฟ้า'}};
function rgOf(id){for(const k in RGC.R)if(RGC.R[k].indexOf(+id)>=0)return+k;return 0}
function rgSrc(r){return'hd-rg'+(r<10?'0':'')+r+'.webp'}
function rgLoad(r){if(!r||r<1||r>10)return null;let I=RGC.img[r];if(!I){I=RGC.img[r]=new Image();I.decoding='async';I.src=rgSrc(r)}return I}
function rgPre(id){const r=rgOf(id);if(!r)return;rgLoad(r);setTimeout(()=>{rgLoad(r+1);rgLoad(r-1)},3000)}
{const st=document.createElement('style');st.textContent=
 '#warpov .rgi{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none;transform-origin:50% 55%;will-change:transform}'
+'#warpov.rg .rgi{display:block;animation:rgKB 6s ease-out both}#warpov.rg.rr .rgi{animation-name:rgKBr}'
+'#warpov .rgv{position:absolute;inset:0;display:none;background:radial-gradient(ellipse at 50% 52%,rgba(0,0,0,0) 45%,rgba(4,4,12,.55) 100%),linear-gradient(180deg,rgba(4,4,14,.45) 0%,rgba(0,0,0,0) 34%,rgba(0,0,0,0) 62%,rgba(4,4,12,.6) 100%)}'
+'#warpov.rg .rgv{display:block}#warpov.rg .wb{opacity:0}'
+'#warpov .rgt{position:absolute;left:0;right:0;top:15%;text-align:center;display:none;color:#ffe6a6;font-family:Georgia,serif;text-shadow:0 2px 10px #000,0 0 24px rgba(255,190,90,.6)}'
+'#warpov.rg .rgt{display:block;animation:wfade .7s ease-out both}#warpov .rgt b{display:block;font-size:clamp(13px,3vmin,20px);letter-spacing:.32em;font-weight:600;opacity:.9}'
+'#warpov .rgt i{display:block;font-style:normal;font-size:clamp(24px,6.6vmin,50px);font-weight:900;letter-spacing:.06em}'
+'#warpov .rgt u{display:block;margin:6px auto 0;width:min(46vw,320px);height:2px;text-decoration:none;background:linear-gradient(90deg,transparent,#e8c070,transparent)}'
+'#warpov.rg .wr{top:auto;bottom:12%;left:auto;right:5%;margin:0;width:9vmin;height:9vmin;border-width:2px}'
+'#warpov.rg .wr2{right:calc(5% + 2vmin);bottom:calc(12% + 2vmin);width:5vmin;height:5vmin;border-width:2px}'
+'#warpov.rg .wc{display:none}#warpov.rg .wn{top:auto;bottom:16%;font-size:clamp(15px,3.6vmin,22px);letter-spacing:.12em;text-shadow:0 2px 8px #000,0 0 14px rgba(255,200,120,.6)}'
+'@keyframes rgKB{from{transform:scale(1.1) translateX(1.5%)}to{transform:scale(1.02) translateX(-1%)}}@keyframes rgKBr{from{transform:scale(1.1) translateX(-1.5%)}to{transform:scale(1.02) translateX(1%)}}';
 document.head.appendChild(st)}
function rgApply(id){const el=WARP.el;if(!el||RGC.off)return;const r=rgOf(id);
  if(!el.querySelector('.rgi')){const i=document.createElement('img');i.className='rgi';i.alt='';const v=document.createElement('div');v.className='rgv';const t=document.createElement('div');t.className='rgt';t.innerHTML='<b></b><i></i><u></u>';
    el.insertBefore(v,el.firstChild);el.insertBefore(i,el.firstChild);el.appendChild(t)}
  el.classList.remove('rg');if(!r){RGC.cur=0;return}
  const I=rgLoad(r),go=()=>{if(!WARP.on||WARP.mp!==id)return;const im=el.querySelector('.rgi');im.src=I.src;el.querySelector('.rgt b').textContent='ภาค '+r;el.querySelector('.rgt i').textContent=RGC.T[r]||'';
    el.classList.toggle('rr',r%2===0);el.classList.remove('rg');void el.offsetWidth;el.classList.add('rg');RGC.cur=r;RGC.n++};
  if(I.complete&&I.naturalWidth)go();else I.addEventListener('load',go,{once:true});
  if(r!==RGC.last){RGC.min0=WARP.min;WARP.min=Math.max(WARP.min,RGC.hold);RGC.last=r}}
setTimeout(()=>{
  try{const _s=warpShow;window.warpShow=warpShow=function(id){const r=_s.apply(this,arguments);try{if(WARP.on)rgApply(id)}catch(e){RGC.err=String(e)}return r}}catch(e){}
  try{const _h=warpHide;window.warpHide=warpHide=function(){if(RGC.min0){WARP.min=RGC.min0;RGC.min0=0}const r=_h.apply(this,arguments);
      if(RGC.vz){const q=RGC.vz;RGC.vz=null;setTimeout(()=>{try{if(curMap===q[1])q[0](q[1])}catch(e){}},300)}return r}}catch(e){}
  /* ป้ายชื่อแมพของเดิม (vzCard) ซ้ำกับการ์ดภาค → เลื่อนไปขึ้นหลังวาร์ปปิด */
  try{if(typeof vzCard==='function'){const _v=vzCard;window.vzCard=vzCard=function(id){if(!RGC.off&&WARP.on&&rgOf(id)){RGC.vz=[_v,id];return}return _v.apply(this,arguments)}}}catch(e){}
  try{const _e=enterMap;window.enterMap=enterMap=function(id){try{if(!RGC.off)rgPre(id)}catch(e){}return _e.apply(this,arguments)}}catch(e){}
  try{if(typeof curMap!=='undefined'){RGC.last=rgOf(curMap);rgPre(curMap)}}catch(e){}
},1600);
/* ประตูวาร์ปในแมพ: เดินเข้าใกล้ประตูที่ไปอีกภาค → โหลดภาพภาคปลายทางไว้ก่อน */
setInterval(()=>{try{if(RGC.off||!run||!MAPS[curMap]||!MAPS[curMap].gates)return;for(const G of MAPS[curMap].gates){const t=G.to|0;if(!t||!MAPS[t])continue;const r=rgOf(t);if(r&&!RGC.img[r]&&Math.hypot((G.x||0)-me.x,(G.y||0)-me.y)<520)rgLoad(r)}}catch(e){}},1500);
