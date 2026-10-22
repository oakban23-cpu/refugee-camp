
/* ===== v491 · ปุ่มเต็มจอ =====
   ปุ่ม ⛶ ข้างปุ่มเสียงใต้แผนที่เล็ก (+ แถวในตั้งค่า → คุณภาพภาพ) · กดเข้า/ออก · ไอคอนทองชุดเดียวกับปุ่มอื่น
   จำไว้ในเครื่อง (refugee_fs): เคยเปิดเต็มจอไว้ → ครั้งหน้า/กลับจากแอปอื่น แตะจอครั้งแรกเข้าเต็มจอให้เอง (เบราว์เซอร์บังคับต้องแตะก่อน)
   ออกเอง (ปุ่ม/Esc/ปัดกลับ) = ปิดค่าที่จำไว้ · ถูกบังคับออกเพราะสลับแอป = ยังจำไว้
   iPhone (Safari ไม่มีเต็มจอสำหรับหน้าเว็บ) → กดแล้วบอกวิธี «เพิ่มไปยังหน้าจอโฮม» (หัวเว็บใส่ apple-mobile-web-app-capable แล้ว เปิดจากไอคอน = ไม่มีแถบเบราว์เซอร์)
   เปิดจากไอคอนหน้าจอโฮมอยู่แล้ว (standalone) → ซ่อนปุ่ม */
const FSV={arm:false,t:0};
function fsPref(){try{return localStorage.getItem('refugee_fs')==='1'}catch(e){return false}}
function fsPrefSet(v){try{localStorage.setItem('refugee_fs',v?'1':'0')}catch(e){}}
function fsEl(){return document.fullscreenElement||document.webkitFullscreenElement||null}
function fsCan(){const d=document.documentElement;return !!((document.fullscreenEnabled||document.webkitFullscreenEnabled)&&(d.requestFullscreen||d.webkitRequestFullscreen))}
/* display-mode: fullscreen ก็ตรงตอนเต็มจอด้วยปุ่มนี้เอง (Chrome) → นับเป็นแอปเฉพาะตอนไม่ได้เข้าเต็มจอผ่าน API (เช่นเปิดจากไอคอน/F11) */
function fsStand(){try{return matchMedia('(display-mode: standalone)').matches||(matchMedia('(display-mode: fullscreen)').matches&&!fsEl())||navigator.standalone===true}catch(e){return false}}
function fsIOS(){const u=navigator.userAgent||'';return /iPhone|iPod|iPad/.test(u)||(/Macintosh/.test(u)&&(navigator.maxTouchPoints||0)>1)}
function fsSvg(on){const O='fill="none" stroke="#2a1806" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"',G='fill="none" stroke="url(#u58g)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
  const P=on?['M9 3.5V9H3.5','M15 3.5V9h5.5','M15 20.5V15h5.5','M9 20.5V15H3.5']:['M3.5 9V3.5H9','M15 3.5h5.5V9','M20.5 15v5.5H15','M9 20.5H3.5V15'];
  return '<svg class="u58i" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">'+P.map(d=>'<path d="'+d+'" '+O+'/>').join('')+P.map(d=>'<path d="'+d+'" '+G+'/>').join('')+'</svg>'}
function fsMsg(t){try{sysMsg(t)}catch(e){}try{banner={s:t.slice(0,60),t:3.5}}catch(e){}}
function fsEnter(){const d=document.documentElement;try{const p=d.requestFullscreen?d.requestFullscreen({navigationUI:'hide'}):d.webkitRequestFullscreen();if(p&&p.catch)p.catch(()=>fsFail())}catch(e){fsFail()}}
function fsExit(){try{const f=document.exitFullscreen||document.webkitExitFullscreen;if(f){const p=f.call(document);if(p&&p.catch)p.catch(()=>{})}}catch(e){}}
function fsFail(){FSV.arm=false;fsPrefSet(0);fsSync();fsMsg('📺 เบราว์เซอร์นี้ไม่ให้เปิดเต็มจอในหน้านี้ · ลองเปิดเกมในเบราว์เซอร์โดยตรง (Chrome/Edge)')}
function fsHelp(){const card=fsIOS()&&me.cls&&ov.hidden;(card?(t=>{try{sysMsg(t)}catch(e){}}):fsMsg)(fsIOS()?'📱 iPhone เปิดเต็มจอจากเบราว์เซอร์ไม่ได้ · กดปุ่มแชร์ ⬆️ → «เพิ่มไปยังหน้าจอโฮม» แล้วเปิดเกมจากไอคอน จะเต็มจอไม่มีแถบเบราว์เซอร์':'📺 เบราว์เซอร์นี้ไม่รองรับเต็มจอ · ลองเปิดเกมด้วย Chrome/Edge');
  try{if(card){const c=document.createElement('div');c.id='fsios';c.innerHTML='<b>📱 เล่นเต็มจอบน iPhone</b><span>1. กดปุ่มแชร์ ⬆️ ด้านล่าง Safari</span><span>2. เลือก «เพิ่มไปยังหน้าจอโฮม»</span><span>3. เปิดเกมจากไอคอนบนหน้าจอโฮม</span><button>เข้าใจแล้ว</button>';
    const old=$('fsios');if(old)old.remove();document.body.appendChild(c);c.querySelector('button').onclick=()=>c.remove();setTimeout(()=>{try{c.remove()}catch(e){}},14000)}}catch(e){}}
function fsToggle(){FSV.arm=false;if(fsEl()){fsPrefSet(0);FSV.t=performance.now();fsExit();return}if(fsCan()){fsPrefSet(1);fsEnter();return}fsHelp()}
function fsSync(){const on=!!fsEl(),b=$('fsb');if(b){b.innerHTML=fsSvg(on);b.setAttribute('aria-label',on?'ออกจากเต็มจอ':'เต็มจอ');b.title=on?'ออกจากเต็มจอ':'เต็มจอ';b.classList.toggle('on',on);const h=fsStand();if(b.hidden!==h){b.hidden=h;try{if(VW.on)vwPos()}catch(e){}}const a=$('aud');if(a)a.classList.toggle('fs3',!h)}
  const r=document.querySelector('#ov [data-fsrow] button');if(r){r.textContent=on?'เปิด':'ปิด';r.classList.toggle('on',on)}}
/* ปุ่มใต้แผนที่เล็ก: ต่อท้ายกล่องปุ่มเสียง (#aud) · ขยายกล่องให้พอ 3 ปุ่ม */
function fsBtn(){const a=$('aud');if(!a||$('fsb'))return;const b=document.createElement('button');b.id='fsb';b.type='button';b.onclick=e=>{e.stopPropagation();fsToggle()};a.appendChild(b);
  if(!$('fscss')){const st=document.createElement('style');st.id='fscss';st.textContent='#aud.fs3{width:calc(108/360*100%)}.setl .fsxic{width:1.15em;height:1.15em;vertical-align:-.2em}#fsb[hidden]{display:none}'+
    '#fsios{position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:60;width:min(300px,86vw);padding:14px 16px;border-radius:14px;background:linear-gradient(180deg,#1e2842,#0e1322);border:1.5px solid #c9a050;color:#f3e2b8;font:14px/1.5 system-ui;display:flex;flex-direction:column;gap:4px;box-shadow:0 8px 24px rgba(0,0,0,.6)}'+
    '#fsios b{font-size:15px;color:#ffe08a;margin-bottom:2px}#fsios button{margin-top:8px;align-self:center;padding:6px 18px;border-radius:999px;border:1.5px solid #c9a050;background:#2a3656;color:#f3e2b8;font:600 14px system-ui}';document.head.appendChild(st)}
  fsSync();try{if(VW.on)vwPos()}catch(e){}}
/* จอแนวนอน (ux83 vwPos ตั้งความกว้างกล่องเป็น 72 หน่วยตรง ๆ) → 108 หน่วยเมื่อมีปุ่มที่สาม · จอเตี้ย: ปุ่มเดินไว/ป้ายแผนที่สมบัติที่อยู่ซ้ายของกล่องเลื่อนตาม */
try{vwPos=(f=>function(){const r=f.apply(this,arguments);try{const a=$('aud'),b=$('fsb');if(VW.on&&a&&b&&!b.hidden){const k=VW.k/VW.uz,ex=36*k,px=v=>Math.round(v)+'px',R=document.documentElement.style;a.style.width=px(108*k);
  if(VW.sh)for(const v of['--vwu6r','--vwtmr']){const c=parseFloat(R.getPropertyValue(v));if(c)R.setProperty(v,px(c+ex))}}}catch(e){}return r})(vwPos)}catch(e){}
/* แถวในตั้งค่า → 🖥️ คุณภาพภาพ */
try{cfgUI=(f=>function(){const r=f.apply(this,arguments);try{const cap=[...ov.querySelectorAll('.card .cap')].find(c=>/คุณภาพภาพ/.test(c.textContent));if(cap&&!ov.querySelector('[data-fsrow]')&&!fsStand()){const on=!!fsEl(),d=document.createElement('div');
    d.innerHTML='<hr><div class="setrow" data-fsrow="1"><span class="setl">'+fsSvg(false).replace('class="u58i"','class="u58i fsxic"')+' เต็มจอ<small>'+(fsCan()?'ซ่อนแถบเบราว์เซอร์ · ปุ่มมุมสี่มุมข้างปุ่มเสียงกดสลับได้เร็ว':fsIOS()?'iPhone: เพิ่มเกมไปยังหน้าจอโฮม แล้วเปิดจากไอคอน':'เบราว์เซอร์นี้ไม่รองรับ')+'</small></span><button class="cfgb cfgt'+(on?' on':'')+'" type="button">'+(on?'เปิด':'ปิด')+'</button></div>';
    cap.parentNode.appendChild(d.querySelector('hr'));const row=d.querySelector('.setrow');cap.parentNode.appendChild(row);row.querySelector('button').onclick=e=>{e.stopPropagation();fsToggle()}}}catch(e){}return r})(cfgUI)}catch(e){}
/* สถานะเปลี่ยน: อัปเดตไอคอน · ออกเองขณะหน้ายังเปิดอยู่ = ปิดค่าที่จำ · สลับแอปแล้วหลุด = จำไว้ + แตะครั้งหน้าเข้าใหม่ */
function fsChg(){fsSync();try{setTimeout(fitStage,80);setTimeout(fitStage,400)}catch(e){}if(fsEl()){FSV.arm=false;return}
  setTimeout(()=>{if(fsEl())return;if(document.visibilityState==='hidden'){if(fsPref())FSV.arm=true;return}if(performance.now()-FSV.t>600&&!FSV.arm)fsPrefSet(0)},350)}
document.addEventListener('fullscreenchange',fsChg);document.addEventListener('webkitfullscreenchange',fsChg);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&fsPref()&&!fsEl()&&fsCan())FSV.arm=true});
/* แตะครั้งแรกหลังเปิดเกม/กลับมา → เข้าเต็มจอ (ถ้าเคยเปิดไว้) · ไม่นับการแตะปุ่ม ⛶ เอง */
document.addEventListener('pointerdown',e=>{if(!FSV.arm||fsEl()||!fsCan())return;if(e.target&&e.target.closest&&e.target.closest('#fsb,[data-fsrow]'))return;FSV.arm=false;fsEnter()},true);
if(fsPref()&&fsCan())FSV.arm=true;
setTimeout(fsBtn,0);setInterval(()=>{if(!$('fsb'))fsBtn();else{const b=$('fsb');if(!b.firstChild)fsSync()}},2000);
