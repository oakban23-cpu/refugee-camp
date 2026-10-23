
/* ===== v492 · ติดตั้งเกมเป็นแอป (Android/PC: Chrome · Edge · Samsung Internet · iPhone: เพิ่มไปยังหน้าจอโฮม) =====
   หัวเว็บมี <link rel=manifest> (manifest.webmanifest: ชื่อ REFUGEE · ไอคอน 192/512/maskable · display fullscreen · หมุนจอได้ทั้งสองแนว)
   service worker (sw.js) มีไว้ให้ติดตั้งได้เท่านั้น: ไม่เก็บหน้าเกมในเครื่อง · เปิดตอนไม่มีเน็ต = หน้าแจ้ง «ต้องต่ออินเทอร์เน็ต»
   ① จับ beforeinstallprompt (ไม่ให้แถบติดตั้งของ Chrome เด้งทับปุ่มเกมเอง) → ปุ่ม «ติดตั้ง» ในตั้งค่า + การ์ดชวนติดตั้งในเกม
   ② การ์ดชวน: ขึ้นตอนอยู่ในค่ายเฉย ๆ (ไม่มีหน้าต่าง/บทสนทนา) หลังเล่น 2.5 นาที · เครื่องจอสัมผัสเท่านั้น · ปัดทิ้งแล้วเว้น 3 วัน · ถามไม่เกิน 3 ครั้ง
      iPhone/iPad (ไม่มีปุ่มติดตั้งให้หน้าเว็บ) → การ์ดบอกขั้นตอน แชร์ ⬆️ → เพิ่มไปยังหน้าจอโฮม
   ③ เปิดจากไอคอนแล้ว (fullscreen/standalone) → ไม่ชวน ไม่มีแถวในตั้งค่า · ปุ่มเต็มจอซ่อน (ux104)
   ④ จอมีรอยบาก (เต็มจอ/แอป + viewport-fit=cover แนวนอน) → สนามหลบขอบซ้าย-ขวาตาม safe-area */
const PWA={ev:null,ok:0,t0:performance.now(),card:0};
function pwaStand(){try{return matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: fullscreen)').matches&&!fsEl()||matchMedia('(display-mode: minimal-ui)').matches||navigator.standalone===true}catch(e){return false}}
function pwaAskGet(){try{return JSON.parse(localStorage.getItem('refugee_pwa_ask')||'{}')||{}}catch(e){return {}}}
function pwaAskSet(o){try{localStorage.setItem('refugee_pwa_ask',JSON.stringify(o))}catch(e){}}
function pwaIOS(){try{return fsIOS()}catch(e){return false}}
function pwaCSS(){if($('pwacss'))return;const s=document.createElement('style');s.id='pwacss';s.textContent=
  '.pwac{position:fixed;left:50%;top:16%;transform:translateX(-50%);z-index:60;width:min(320px,88vw);padding:14px 16px 12px;border-radius:14px;background:linear-gradient(180deg,#1e2842,#0e1322);border:1.5px solid #c9a050;color:#f3e2b8;font:14px/1.5 system-ui,sans-serif;display:flex;flex-direction:column;gap:3px;box-shadow:0 8px 26px rgba(0,0,0,.65);animation:pwaIn .35s ease-out}'+
  '.pwac .hd{display:flex;align-items:center;gap:10px;margin-bottom:4px}.pwac .hd img{width:44px;height:44px;border-radius:10px;border:1.5px solid #c9a050;flex:0 0 auto}.pwac .hd b{font-size:15px;color:#ffe08a;line-height:1.3}.pwac .hd small{display:block;font-size:11.5px;opacity:.75;font-weight:400;color:#f3e2b8}'+
  '.pwac span{font-size:13px}.pwac .bt{display:flex;gap:8px;justify-content:center;margin-top:9px}.pwac button{padding:7px 16px;border-radius:999px;border:1.5px solid #c9a050;background:#2a3656;color:#f3e2b8;font:600 14px system-ui,sans-serif}'+
  '.pwac button.go{background:linear-gradient(180deg,#ffe29a,#c99a40);color:#24170a;border-color:#ffe29a;font-weight:800}@keyframes pwaIn{0%{opacity:0;transform:translate(-50%,-10px)}100%{opacity:1;transform:translate(-50%,0)}}'+
  '#ov [data-pwarow] button{flex:0 0 auto;width:auto;min-width:74px;padding:8px 10px}';document.head.appendChild(s)}
/* การ์ด: kind = 'ask' (ชวนติดตั้ง มีปุ่มติดตั้ง) · 'ios' (ขั้นตอน iPhone) · 'menu' (ขั้นตอนผ่านเมนูเบราว์เซอร์) */
function pwaCard(kind){pwaCSS();const old=$('pwac');if(old)old.remove();const c=document.createElement('div');c.id='pwac';c.className='pwac';
  const hd='<div class="hd"><img src="icon-192.png" alt="" onerror="this.remove()"><b>'+(kind==='ios'?'เพิ่ม REFUGEE ไปยังหน้าจอโฮม':'ติดตั้ง REFUGEE เป็นแอป')+'<small>เปิดจากไอคอน · เต็มจอทันที ไม่มีแถบเบราว์เซอร์</small></b></div>';
  let body,bt;
  if(kind==='ios'){body='<span>1. กดปุ่มแชร์ ⬆️ ของ Safari (ด้านล่างหรือขวาบน)</span><span>2. เลื่อนหา «เพิ่มไปยังหน้าจอโฮม» แล้วกด «เพิ่ม»</span><span>3. เปิดเกมจากไอคอน REFUGEE บนหน้าจอโฮม</span>';bt='<button class="x">เข้าใจแล้ว</button>'}
  else if(kind==='menu'){body='<span>📱 <b>Android (Chrome)</b>: แตะ ⋮ มุมขวาบน → «ติดตั้งแอป» หรือ «เพิ่มลงในหน้าจอหลัก»</span><span>📱 <b>Samsung Internet</b>: เมนู ≡ → «เพิ่มหน้าไปยัง» → «หน้าจอหลัก»</span><span>💻 <b>คอม (Chrome/Edge)</b>: กดไอคอนติดตั้งท้ายช่องที่อยู่เว็บ หรือเมนู ⋮ → «ติดตั้ง REFUGEE»</span>';bt='<button class="x">เข้าใจแล้ว</button>'}
  else{body='<span>• ไม่ต้องโหลดจากสโตร์ ใช้พื้นที่น้อยมาก</span><span>• ตัวละคร/เซฟเดิมใช้ต่อได้เลย</span>';bt='<button class="go">📲 ติดตั้ง</button><button class="x">ไว้ทีหลัง</button>'}
  c.innerHTML=hd+body+'<div class="bt">'+bt+'</div>';document.body.appendChild(c);PWA.card=1;
  const close=()=>{try{c.remove()}catch(e){}PWA.card=0};c.querySelector('.x').onclick=e=>{e.stopPropagation();if(kind==='ask'){const a=pwaAskGet();a.t=Date.now();pwaAskSet(a)}close()};
  const g=c.querySelector('.go');if(g)g.onclick=e=>{e.stopPropagation();close();pwaInstall()};
  c.addEventListener('pointerdown',e=>e.stopPropagation());setTimeout(()=>{if(c.isConnected&&kind!=='ask')close()},20000);return c}
/* กดติดตั้ง: มีหน้าติดตั้งของเบราว์เซอร์ → เปิดเลย · iPhone → ขั้นตอนแชร์ · อื่น ๆ → ขั้นตอนผ่านเมนู */
function pwaInstall(){if(PWA.ev){const ev=PWA.ev;PWA.ev=null;try{ev.prompt();Promise.resolve(ev.userChoice).then(c=>{if(c&&c.outcome==='accepted'){PWA.ok=1;try{sysMsg('📲 กำลังติดตั้ง REFUGEE · เสร็จแล้วเปิดจากไอคอนบนหน้าจอโฮม')}catch(e){}}else{const a=pwaAskGet();a.t=Date.now();pwaAskSet(a)}pwaSync()}).catch(()=>pwaSync())}catch(e){pwaCard('menu')}pwaSync();return}
  pwaCard(pwaIOS()?'ios':'menu')}
function pwaSync(){const r=document.querySelector('#ov [data-pwarow]');if(!r)return;const b=r.querySelector('button'),s=r.querySelector('small');
  b.textContent=PWA.ev?'ติดตั้ง':'วิธีติดตั้ง';b.classList.toggle('on',!!PWA.ev);if(s)s.textContent=PWA.ok?'ติดตั้งแล้ว · เปิดจากไอคอน REFUGEE บนหน้าจอโฮม':PWA.ev?'ไอคอนบนหน้าจอโฮม · เปิดแล้วเต็มจอทันที ไม่มีแถบเบราว์เซอร์':pwaIOS()?'iPhone/iPad: แชร์ ⬆️ → เพิ่มไปยังหน้าจอโฮม':'ผ่านเมนูเบราว์เซอร์ → ติดตั้งแอป / เพิ่มลงหน้าจอหลัก'}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();PWA.ev=e;pwaSync()});
window.addEventListener('appinstalled',()=>{PWA.ev=null;PWA.ok=1;const c=$('pwac');if(c)c.remove();PWA.card=0;try{sysMsg('📲 ติดตั้ง REFUGEE แล้ว · เปิดจากไอคอนบนหน้าจอโฮม จะเต็มจอทันที')}catch(e){}try{banner={s:'📲 ติดตั้งแอปแล้ว',t:3}}catch(e){}pwaSync()});
/* แถวในตั้งค่า → 🖥️ คุณภาพภาพ (ต่อจากแถวเต็มจอ) */
try{cfgUI=(f=>function(){const r=f.apply(this,arguments);try{const cap=[...ov.querySelectorAll('.card .cap')].find(c=>/คุณภาพภาพ/.test(c.textContent));if(cap&&!ov.querySelector('[data-pwarow]')&&!pwaStand()){pwaCSS();const d=document.createElement('div');
    d.innerHTML='<hr><div class="setrow" data-pwarow="1"><span class="setl">📲 ติดตั้งเป็นแอป<small></small></span><button class="cfgb" type="button"></button></div>';
    cap.parentNode.appendChild(d.querySelector('hr'));const row=d.querySelector('.setrow');cap.parentNode.appendChild(row);row.querySelector('button').onclick=e=>{e.stopPropagation();pwaInstall()};pwaSync()}}catch(e){}return r})(cfgUI)}catch(e){}
/* การ์ดชวนในเกม */
function pwaCoarse(){try{return matchMedia('(pointer:coarse)').matches}catch(e){return false}}
function pwaAskNow(){if(PWA.card||PWA.ok||pwaStand()||!(PWA.ev||pwaIOS()))return false;if(!pwaCoarse())return false;
  try{if(!me.cls||curMap!==1||!ov.hidden||SD.on||me.down>0||(typeof run!=='undefined'&&!run))return false}catch(e){return false}
  if(performance.now()-PWA.t0<150000)return false;const a=pwaAskGet();if((a.n|0)>=3||Date.now()-(a.t||0)<3*864e5)return false;
  if(document.querySelector('.pwac,#fsios,#ttl:not(.out)'))return false;
  a.n=(a.n|0)+1;a.t=Date.now();pwaAskSet(a);pwaCard(PWA.ev?'ask':'ios');return true}
setInterval(()=>{try{pwaAskNow()}catch(e){}},5000);
/* service worker: เฉพาะหน้าเกมจริง (https หรือ localhost · ไม่ใช่ในกรอบหน้าอื่น) · รอเกมโหลดเสร็จก่อน */
function pwaReg(){try{if(!('serviceWorker' in navigator)||window.top!==window)return;if(location.protocol!=='https:'&&location.hostname!=='localhost'&&location.hostname!=='127.0.0.1')return;
  navigator.serviceWorker.register('sw.js',{scope:'./'}).catch(()=>{})}catch(e){}}
setTimeout(pwaReg,3000);
/* ④ safe-area ซ้าย-ขวา (จอแนวนอนที่มีรอยบาก ตอนเต็มจอ/เปิดแบบแอป): ลดความกว้างที่ใช้ แล้วเลื่อนสนามหลบขอบ */
function saIns(){let p=$('saprobe');if(!p){p=document.createElement('div');p.id='saprobe';p.style.cssText='position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding-left:env(safe-area-inset-left,0px);padding-right:env(safe-area-inset-right,0px)';document.body.appendChild(p)}
  const cs=getComputedStyle(p);return Math.round(Math.max(parseFloat(cs.paddingLeft)||0,parseFloat(cs.paddingRight)||0))}
try{vwVW=(f=>function(){const w=f.apply(this,arguments),m=saIns();return m>0?Math.max(240,w-2*m):w})(vwVW)}catch(e){}
try{vwFit=(f=>function(){const r=f.apply(this,arguments);try{const m=saIns(),app=$('app');if(VW.on&&m>0&&app){app.style.marginLeft=((parseFloat(app.style.marginLeft)||0)+m)+'px'}}catch(e){}return r})(vwFit)}catch(e){}
