/* ---------- v576 ภาพหน้า NPC ในกล่องบทพูด (ชุดที่ 1 · 12 ตัว · เจนด้วย ComfyUI Z-Image-Turbo) ----------
   · วงกลมหน้ากล่อง: ภาพหน้า (npcf-<key>.webp 128px) แทนอีโมจิ · ตัวที่ยังไม่มีภาพใช้อีโมจิเดิม
   · ภาพครึ่งตัว (npc-<key>.webp สูง 440px) ยืนเหนือกล่องบทพูดด้านซ้าย · เปลี่ยนคนพูด = ภาพเลื่อนเข้าใหม่ · คนเดิมพูดต่อ = ภาพนิ่ง
   · โหลดเฉพาะตอนใช้ (+ โหลดล่วงหน้าตอนว่างหลังเข้าเกม 20 วิ) · ภาพยังไม่มา → ไม่ขึ้นภาพครึ่งตัว ใช้อีโมจิไปก่อน
   · รหัสคนพูดที่มีตัวเลขต่อท้าย (til43 · thu45 · cel41) ใช้ภาพเดียวกับตัวหลัก · ปิด: NPCP.off=1 */
const NPCP={off:0,ks:new Set(['qn','cmd','cel','til','sara','ast','eda','thu','navin','ves','lir','ked','hnt','kn','grif','nox','cas','lum','brom','mek','hed','orr','gem','leo']),img:{},ok:{},cur:'',el:null,pre:0};
function npcpKey(k){if(!k)return'';const b=String(k).replace(/\d+$/,'');return NPCP.ks.has(b)?b:''}
function npcpLoad(k){if(!k||NPCP.img[k])return NPCP.img[k];const o={f:new Image(),b:new Image()};NPCP.img[k]=o;
  o.f.decoding=o.b.decoding='async';o.f.onload=()=>{NPCP.ok[k]=(NPCP.ok[k]|0)|1;if(NPCP.cur===k)try{npcpShow(k,1)}catch(e){}};o.b.onload=()=>{NPCP.ok[k]=(NPCP.ok[k]|0)|2;if(NPCP.cur===k)try{npcpShow(k,1)}catch(e){}};
  o.f.src='npcf-'+k+'.webp';o.b.src='npc-'+k+'.webp';return o}
{const st=document.createElement('style');st.textContent=
 '#sdlg .sdp.npcp{font-size:0;overflow:hidden;padding:0}#sdlg .sdp.npcp img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}'
+'#sdbust{position:absolute;left:6px;bottom:calc(100% - 6px);height:min(30vh,280px);width:auto;max-width:46%;pointer-events:none;z-index:-1;object-fit:contain;object-position:left bottom;'
+'-webkit-mask-image:linear-gradient(180deg,#000 72%,transparent 99%);mask-image:linear-gradient(180deg,#000 72%,transparent 99%);filter:drop-shadow(0 4px 10px rgba(0,0,0,.55));opacity:0;transform:translateX(-14px);transition:opacity .22s ease-out,transform .22s ease-out}'
+'#sdbust.on{opacity:1;transform:none}@media (max-height:430px){#sdbust{display:none}}@media (orientation:portrait){#sdbust{height:min(24vh,230px)}}';document.head.appendChild(st)}
function npcpShow(k,refresh){const d=$('sdlg');if(!d)return;const p=d.querySelector('.sdp');let b=document.getElementById('sdbust');
  if(!b){b=document.createElement('img');b.id='sdbust';b.alt='';d.appendChild(b)}
  const ok=NPCP.ok[k]|0;
  if(k&&(ok&1)){p.classList.add('npcp');if(!p.querySelector('img')){p.textContent='';const i=document.createElement('img');i.alt='';i.src='npcf-'+k+'.webp';p.appendChild(i)}else p.querySelector('img').src='npcf-'+k+'.webp'}
  else p.classList.remove('npcp');
  if(k&&(ok&2)){const src='npc-'+k+'.webp';if(b.dataset.k!==k){b.classList.remove('on');b.dataset.k=k;b.src=src;void b.offsetWidth}b.classList.add('on')}
  else{b.classList.remove('on');b.dataset.k=''}}
setTimeout(()=>{try{const _l=stLine;window.stLine=stLine=function(){const r=_l.apply(this,arguments);
    try{if(NPCP.off){const b=document.getElementById('sdbust');if(b)b.classList.remove('on');return r}const L=SD.q[SD.i];const k=L?npcpKey(L[0]):'';NPCP.cur=k;if(k)npcpLoad(k);npcpShow(k)}catch(e){}return r}}catch(e){console.warn('npcp',e)}
  /* ปิดกล่องบทพูด → ซ่อนภาพ */
  try{const _c=stClose;window.stClose=stClose=function(){NPCP.cur='';try{const b=document.getElementById('sdbust');if(b){b.classList.remove('on');b.dataset.k=''}}catch(e){}return _c.apply(this,arguments)}}catch(e){}
},1500);
/* โหลดล่วงหน้าตอนว่าง (หลังเข้าเกม 20 วิ · ทีละภาพ) */
setInterval(()=>{try{if(NPCP.pre||NPCP.off||!me.cls||!run||performance.now()<20000)return;NPCP.pre=1;const L=[...NPCP.ks];let i=0;const nx=()=>{if(i>=L.length)return;npcpLoad(L[i++]);(window.requestIdleCallback||setTimeout)(nx,{timeout:1500})};nx()}catch(e){}},3000);
