
/* ===== v474 · แถบสถานะเป็นการ์ดเล็กมุมซ้ายบน =====
   เดิม: แถบสถานะ (#hud) กินแถวบนสุดเต็มความกว้าง ~62px · สนามเกมเริ่มใต้แถบ
   ใหม่: การ์ดเล็ก ~214×64 ลอยทับมุมซ้ายบนของสนาม (body.hudc) · สนามยืดขึ้นไปถึงขอบบน (fitStage คำนวณความสูงใหม่เอง)
     แถว 1: ชื่อตัวละคร … ทอง · แถว 2–3: HP / MP · แถว 4: EXP + เปอร์เซ็นต์ + 👥 จำนวนคนในแมพ · รูปตัวละครวงกลม + ป้ายเลเวลใต้รูป
   ของที่เคยอยู่ชิดขอบบนเลื่อนลงหลบการ์ด:
     DOM (ปุ่มเมนู · คอลัมน์ปุ่มซ้าย/การ์ดเควส · แผงอีโมต · บทสอน · ช่องแชท · แผ่นเมนู) ใช้ margin-top: var(--hudy)
     canvas (ป้ายอีเวนต์ · ป้ายดันเจี้ยน · แถบเลือดบอส · เกจทุบบอส · ป้ายศึกบ้านกิลด์ · ดาเมจรวมอัลติ) บวก hudTY() (แก้ใน patch340)
   ตั้งค่า › แถบสถานะ: สลับกลับเป็นแถบเต็มแบบเดิมได้ (จำในเครื่อง refugee_hudc) */
var HUDC={on:true,ty:0,tyT:0,py:0};
function hudTY(){if(!HUDC.on)return 0;const n=performance.now();if(n-HUDC.tyT>350){HUDC.tyT=n;try{const h=document.getElementById('hud'),st=document.getElementById('stage'),cv=document.getElementById('c');
  if(h&&st&&cv&&cv.offsetHeight>0){const b=h.offsetTop+h.offsetHeight-st.offsetTop-cv.offsetTop;HUDC.ty=Math.max(0,Math.round(b*H/cv.offsetHeight)-2)}}catch(e){}}return HUDC.ty}
(()=>{
const HCSS=`
body.hudc #app{position:relative}
body.hudc #hud{position:absolute!important;left:16px;top:12px;z-index:3;margin:0!important;width:214px;max-width:calc(100% - 132px);box-sizing:border-box;min-height:0!important;
  padding:4px 8px 5px 52px!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto;align-items:center;column-gap:6px;row-gap:3px;gap:3px 6px!important;
  border-radius:14px!important;background:linear-gradient(180deg,rgba(31,41,68,.94) 0%,rgba(19,26,46,.94) 55%,rgba(11,15,29,.95) 100%)!important}
body.hudc #hud{pointer-events:none}
body.hudc #hpor{pointer-events:auto;cursor:pointer}
body.hudc #hud::before{left:48px!important;top:2px!important}
body.hudc #hpor{left:-8px!important;width:52px!important;height:52px!important;border-width:2px!important;z-index:1}
body.hudc #hpor img{width:78px!important;height:91px!important;left:-13px!important;top:-8px!important}
body.hudc #lvb{position:absolute!important;left:-11px;top:48px;z-index:2;min-width:0!important;font:800 10px/1.35 system-ui!important;padding:1px 6px;border-radius:9px;letter-spacing:0!important;white-space:nowrap;
  color:#ffe6a8!important;text-shadow:0 1px 1px #000!important;background:linear-gradient(180deg,#5a3c12,#2a1a06);border:1px solid #e2bc6a;box-shadow:0 1px 4px rgba(0,0,0,.6)}
body.hudc #hnm{display:block;grid-row:1;grid-column:1;min-width:0;font:800 11.5px/1.25 system-ui;color:#f3e2b8;text-shadow:0 1px 2px #000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
body.hudc #pl{grid-row:1;grid-column:2;min-width:0!important;flex-direction:row!important;align-items:center!important;gap:4px!important}
body.hudc #pl .gc{font:800 11.5px/1 system-ui!important;gap:4px!important}
body.hudc #pl .coin{width:13px!important;height:13px!important;box-shadow:inset 0 0 0 1px #7a5208,inset 0 0 0 2px rgba(255,230,140,.6),0 1px 2px rgba(0,0,0,.6)!important}
body.hudc #pl small{display:none!important}
body.hudc #bars{grid-row:2;grid-column:1/-1;display:grid!important;grid-template-columns:minmax(0,1fr) auto auto;column-gap:5px;row-gap:2px!important;align-items:center}
body.hudc #bars .bar:nth-child(1),body.hudc #bars .bar:nth-child(2){grid-column:1/-1}
body.hudc #bars .bar:nth-child(1){height:13px!important}
body.hudc #bars .bar:nth-child(1) span{font-size:9.5px!important;line-height:13px!important}
body.hudc #bars .bar:nth-child(2){height:11px!important}
body.hudc #bars .bar:nth-child(2) span{font-size:8.5px!important;line-height:11px!important}
body.hudc #bars .bar:nth-child(3){grid-column:1;margin:0!important;height:5px!important}
body.hudc #xpl{display:none!important}
body.hudc #hxp{grid-column:2;font:800 9px/1 system-ui;color:#ffe08a;text-shadow:0 1px 1px #000;white-space:nowrap}
body.hudc #hpc{grid-column:3;font:700 9px/1 system-ui;color:#a8b0c8;white-space:nowrap}
#hnm,#hxp,#hpc{display:none}
body.hudc #hxp,body.hudc #hpc{display:block}
body.hudc #mn,body.hudc #topb,body.hudc #emp,body.hudc #tut,body.hudc #cbar{margin-top:var(--hudy,66px)!important}
body.hudc #mnp.ui8m{top:calc(64px + var(--hudy,66px))!important}
#ov .pn .hudcs{display:flex;gap:6px;margin:4px 0 6px}
#ov .pn .hudcs button{flex:1}
`;
function hcss(){if(document.getElementById('hudccss'))return;const st=document.createElement('style');st.id='hudccss';st.textContent=HCSS;document.head.appendChild(st)}
const pref=()=>{try{return localStorage.getItem('refugee_hudc')!=='0'}catch(e){return true}};
function els(){const h=$('hud'),bars=$('bars');if(!h||!bars)return false;
  if(!$('hnm')){const n=document.createElement('b');n.id='hnm';const p=$('hpor');if(p&&p.nextSibling)h.insertBefore(n,p.nextSibling);else h.prepend(n)}
  if(!$('hxp')){const e=document.createElement('b');e.id='hxp';bars.appendChild(e)}
  if(!$('hpc')){const e=document.createElement('b');e.id='hpc';bars.appendChild(e)}
  return true}
function setVar(){try{const h=$('hud'),st=$('stage');if(!h||!st)return;const v=HUDC.on?Math.max(0,h.offsetTop+h.offsetHeight+6-st.offsetTop-8):0;if(v!==HUDC.py){HUDC.py=v;st.style.setProperty('--hudy',v+'px')}}catch(e){}}
function apply(on){hcss();HUDC.on=!!on;document.body.classList.toggle('hudc',HUDC.on);HUDC.tyT=0;els();setVar();try{fitStage()}catch(e){}setTimeout(()=>{setVar();try{fitStage()}catch(e){}},60)}
window.hudcSet=v=>{try{localStorage.setItem('refugee_hudc',v?'1':'0')}catch(e){}apply(v)};
/* ข้อความในการ์ด: ชื่อ · EXP% · จำนวนคน (อัปเดตเฉพาะตอนเปลี่ยน) */
let LT={n:'',x:'',p:''};
bars=(f=>function(){const r=f.apply(this,arguments);if(!HUDC.on)return r;try{
  const nm=(me&&me.nm)||myName||'';if(nm!==LT.n){LT.n=nm;const e=$('hnm');if(e)e.textContent=nm}
  let x='';if(me.lv>=LMAX){const A=astOf();x=A.n>=AMAX?'MAX':(Math.floor(A.x/astNeed(A.n)*1000)/10).toFixed(1)+'%'}else x=(Math.floor(me.xp/need(me.lv)*1000)/10).toFixed(1)+'%';
  if(x!==LT.x){LT.x=x;const e=$('hxp');if(e)e.textContent=x}
  const pc='👥'+plCount();if(pc!==LT.p){LT.p=pc;const e=$('hpc');if(e){e.textContent=pc;e.title='ผู้เล่นในแมพนี้'}}}catch(e){}return r})(bars);
/* ตั้งค่า › แถบสถานะ */
function setCard(){const P=ov&&!ov.hidden&&ov.querySelector('.pn[data-pn="set"]');if(!P||P.querySelector('.hudcs'))return;const cards=P.querySelectorAll(':scope>.card');if(!cards.length)return;
  const c=document.createElement('div');c.className='card';c.innerHTML='<div class="cap">🧭 แถบสถานะ (เลือด · มานา · ทอง)</div><div class="setseg hudcs"><button class="cfgb'+(HUDC.on?' on':'')+'" data-hudc="1">การ์ดเล็กมุมซ้ายบน</button><button class="cfgb'+(HUDC.on?'':' on')+'" data-hudc="0">แถบเต็มด้านบน</button></div><div class="seth">'+(HUDC.on?'สนามเกมเห็นได้กว้างขึ้น · การ์ดสถานะลอยอยู่มุมซ้ายบน':'แบบเดิม: แถบสถานะเต็มความกว้างอยู่เหนือสนาม')+'</div>';
  const at=cards[1]||null;P.insertBefore(c,at)}
/* แตะรูปตัวละครบนการ์ด → เปิดหน้าตัวละคร (ส่วนอื่นของการ์ดปล่อยให้แตะทะลุลงสนามได้) */
document.addEventListener('click',e=>{if(!HUDC.on||!e.target.closest||!e.target.closest('#hpor'))return;try{if(me.cls&&run&&ov.hidden){const b=$('tb');if(b)b.click()}}catch(_){}});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-hudc]');if(!b)return;window.hudcSet(b.dataset.hudc==='1');try{const P=ov.querySelector('.pn[data-pn="set"]');if(P){const c=P.querySelector('.hudcs');if(c)c.closest('.card').remove();setCard()}}catch(_){}},true);
try{new MutationObserver(()=>{try{setCard()}catch(e){}}).observe(ov,{childList:true})}catch(e){}
hcss();els();apply(pref());
setInterval(()=>{if(HUDC.on){setVar();if(!$('hnm'))els()}},500);
addEventListener('resize',()=>setTimeout(setVar,120));
})();
