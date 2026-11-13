/* ---------- v636 ภาพประกอบเนื้อเรื่อง (CG) 29 ฉาก ----------
   ภาพวาดเต็มจอจางเข้ามาในคัตซีน เมื่อบรรทัดบทพูดตรงกับข้อความของภาพ แล้วค้างไว้ h บรรทัด (หรือจนจบฉาก)
   จอแนวนอน: ภาพเต็มจอ เลื่อนช้า ๆ · จอแนวตั้ง: เห็นทั้งภาพ พื้นหลังเป็นภาพเดียวกันเบลอ
   การ์ดชื่อภาค/จบภาคของคัตซีนขึ้นทับภาพ · โหลดภาพล่วงหน้าเฉพาะฉากที่กำลังจะเล่น
   แกลเลอรี: เมนู 📜 เนื้อเรื่อง → «🖼 ภาพเนื้อเรื่อง» ปลดล็อกตามความคืบหน้า/ที่เคยเห็น
   ปิด: CGX.on=0 */
const CGL=[
 [1,'สามร้อยปีก่อน อาณาจักรอารัณยาผนึกเทพ',2],[2,'ฟื้นแล้วรึ',4],[3,'ในที่สุดเราก็พบกัน',99],
 [4,'แสงจากตราไหลเข้าสู่หอคอย',99],[5,'โซ่ทั้งร้อยแตกสลาย',99],
 [6,'รอยร้าวสีดำ',4],[7,'ทั้งนครกำลังฉลองอยู่ข้างล่าง',99],
 [8,'ทุกคืนจะมีเงาดำลอยขึ้นมา',6],[9,'อัสตราจะเปิดประตูเมฆไว้ตลอดไป',99],
 [10,'รากสีดำโผล่ขึ้นมา',5],[11,'ร่างของผู้กลืนรากแตกสลาย',99],
 [12,'ประตูทุกบานในวังปิดลงพร้อมกัน',6],[13,'ประตูทุกบานของนครลอยฟ้าอัสตราเปิดออกพร้อมกัน',99],
 [14,'วันนี้ขบวนผู้อพยพขบวนแรก',5],[15,'ขอบหลุมหัวใจ',99],
 [16,'ดาวตกนับร้อยดวง',5],[17,'ยายร้องเพลงนี้มาทั้งชีวิต',99],
 [18,'แสงโคมนับร้อยดวง',5],[19,'ทะเลเมฆแยกออกเป็นสองซีก',5],[20,'ผาท่าเรือเมฆมีชื่อใหม่',99],
 [21,'ดาวดับ จากบนลงล่าง',6],[22,'ทุ่งตาข่ายดาวอยู่ถัดจากท่าตะวันออก',5],[23,'นับดาวครบทุกดวง',99],
 [24,'ทั้งค่ายทรุดลงไปหนึ่งคืบ',5],[25,'ยักษ์หินคุกเข่าอยู่บนก้อนหินก้อนสุดท้าย',6],
 [26,'เชือกทั้งห้าก็ตึงขึ้นพร้อมกัน',6],[27,'ต้นค้ำต้นใหม่เก้าต้น',99],[28,'รากทองค่อย ๆ พันรอบไหล่ของธรณิน',99],
 [29,'จำวันแรกที่เจ้ามาถึงได้ไหม',99]];
const CGNM=['','ตำนานผนึก','ตื่นหน้าประตูค่าย','เสียงใต้ผนึก','ผนึกนิรันดร์','ปลดโซ่เทพ','ฟ้าแตก','คำขอบคุณของราชินี','เงาไต่กำแพง','ประตูเมฆเปิด','รากดำยามเที่ยงคืน','หัวใจครึ่งดวง','ซุ่มโจมตีท้องพระโรง','ประตูทุกบานเปิด','ขบวนผู้อพยพขบวนแรก','ขอบหลุมหัวใจ','ฝนดาวตก','เพลงกล่อมสามเมือง','โคมลอยกับเรือตก','วาฬผุดจากทะเลเมฆ','บ้านของกองเรือเมฆ','บันไดสู่ดวงดาว','ทุ่งตาข่ายดาว','ดาวกลับมาครบ','แผ่นดินทรุด','ผู้แบกคนแรก','ทุกคนลงมาแล้ว','บ้านที่ประตูไม่เคยปิด','บ้านที่รากลึกที่สุด','ยินดีต้อนรับกลับบ้าน'];
const CGX={on:1,cur:0,i0:0,h:0,img:{},el:null,tm:0,err:''};
function cgSrc(n,t){return'hd-cg'+(t?'t':'')+(n<10?'0':'')+n+'.webp'}
function cgLoad(n){let I=CGX.img[n];if(!I){I=CGX.img[n]=new Image();I.decoding='async';I.src=cgSrc(n)}return I}
function cgEl(){if(CGX.el&&CGX.el.isConnected)return CGX.el;
  if(!document.getElementById('cgcss')){const st=document.createElement('style');st.id='cgcss';st.textContent=
   '#cgov{position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0;visibility:hidden;transition:opacity .9s ease,visibility 0s .9s;background:#000;overflow:hidden}'+
   '#cgov.on{opacity:1;visibility:visible;transition:opacity .9s ease,visibility 0s}'+
   /* โหมดคัตซีนซ่อนทุกอย่างใน #app ด้วยตัวเลือกที่มี id 7 ตัว → ต้องสูงกว่า */
   'body.csm #app #cgov#cgov#cgov#cgov#cgov#cgov#cgov.on,body.csm #app #cgov#cgov#cgov#cgov#cgov#cgov#cgov.on *{visibility:visible!important}'+
   'body.csm #app #cgov#cgov#cgov#cgov#cgov#cgov#cgov.on .tt:not(.on){visibility:hidden!important}'+
   '#cgov img{position:absolute;left:0;top:0;width:100%;height:100%;user-select:none;-webkit-user-drag:none}'+
   '#cgov .fg{object-fit:cover;transform-origin:50% 45%}#cgov.kb .fg{animation:cgKB 16s ease-out forwards}#cgov.kb.r .fg{animation-name:cgKBr}'+
   '#cgov .bg{object-fit:cover;filter:blur(16px) brightness(.5);transform:scale(1.12);display:none}'+
   '#cgov.port .bg{display:block}#cgov.port .fg{object-fit:contain;height:auto;top:50%;transform:translateY(-62%)}#cgov.port.kb .fg{animation:cgKBp 16s ease-out forwards}'+
   '#cgov .tt{position:absolute;left:0;right:0;top:15%;text-align:center;color:#ffe6a6;text-shadow:0 2px 10px #000,0 0 22px rgba(255,190,90,.55);opacity:0;transition:opacity .8s;font-family:Georgia,serif}'+
   '#cgov .tt.on{opacity:1}#cgov .tt b{display:block;font-size:clamp(15px,3.2vmin,22px);letter-spacing:.3em;font-weight:600;opacity:.9}#cgov .tt i{display:block;font-style:normal;font-size:clamp(26px,7vmin,52px);font-weight:900;letter-spacing:.08em}'+
   '@keyframes cgKB{from{transform:scale(1.09) translateX(1.4%)}to{transform:scale(1.01) translateX(-1.2%)}}'+
   '@keyframes cgKBr{from{transform:scale(1.09) translateX(-1.4%)}to{transform:scale(1.01) translateX(1.2%)}}'+
   '@keyframes cgKBp{from{transform:translateY(-62%) scale(1.05)}to{transform:translateY(-62%) scale(1)}}'+
   '#cgview{position:fixed;inset:0;z-index:10050;background:rgba(0,0,0,.94);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px}'+
   '#cgview img{max-width:100vw;max-height:84vh;object-fit:contain;box-shadow:0 0 30px #000}'+
   '#cgview .cap{color:#f3dca0;font:700 15px system-ui,sans-serif;text-align:center;padding:0 12px}'+
   '#cgview .nv{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:64px;border:0;border-radius:10px;background:rgba(0,0,0,.45);color:#ffe2a0;font:900 28px system-ui}'+
   '#cgview .nv.l{left:6px}#cgview .nv.r{right:6px}#cgview .x{position:absolute;top:calc(8px + env(safe-area-inset-top));right:10px;width:42px;height:42px;border-radius:50%;border:1.5px solid #c9a050;background:rgba(20,14,8,.8);color:#ffe2a0;font:900 20px system-ui}'+
   '.cggr{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:6px}'+
   '.cggr button{position:relative;padding:0;border:1.5px solid #6a5434;border-radius:8px;overflow:hidden;background:#141018;aspect-ratio:3/2}'+
   '.cggr button img{width:100%;height:100%;object-fit:cover;display:block}.cggr button.lk{filter:none}.cggr button.lk span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:20px;color:#a99;background:repeating-linear-gradient(45deg,#1a1520 0 8px,#15111a 8px 16px)}'+
   '.cggr button small{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(0,0,0,.85));color:#f3dca0;font:600 10px system-ui;padding:8px 3px 2px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
   document.head.appendChild(st)}
  const d=document.createElement('div');d.id='cgov';d.innerHTML='<img class="bg" alt=""><img class="fg" alt=""><div class="tt"><b></b><i></i></div>';
  const sc=document.getElementById('scine');if(sc&&sc.parentNode)sc.parentNode.insertBefore(d,sc);else document.body.appendChild(d);
  CGX.el=d;return d}
function cgShow(n){const d=cgEl(),I=cgLoad(n);CGX.cur=n;CGX.i0=SD.i;CGX.h=(CGL.find(c=>c[0]===n)||[0,0,5])[2];cgSeen(n);
  const go=()=>{if(CGX.cur!==n)return;const fg=d.querySelector('.fg'),bg=d.querySelector('.bg');fg.src=I.src;bg.src=I.src;
    d.classList.toggle('port',innerWidth/Math.max(1,innerHeight)<1.3);d.classList.toggle('r',n%2===0);
    d.classList.remove('kb');void d.offsetWidth;d.classList.add('kb','on')};
  if(I.complete&&I.naturalWidth)go();else{I.onload=go;I.onerror=()=>{CGX.err='load '+n;if(CGX.cur===n)CGX.cur=0}}}
function cgHide(){CGX.cur=0;const d=CGX.el;if(d){d.classList.remove('on');const t=d.querySelector('.tt');if(t)t.classList.remove('on')}}
function cgSeen(n){try{me.cgv=(me.cgv|0)|(1<<(n-1))}catch(e){}}
function cgFind(t){if(!t)return 0;for(const c of CGL)if(t.indexOf(c[1])>=0)return c[0];return 0}
/* ทุกบรรทัดบทพูด: เปิดภาพ / ครบจำนวนบรรทัดแล้วจางออก */
stLine=(f=>function(){const r=f.apply(this,arguments);try{if(!CGX.on)return r;const L=SD.q[SD.i];if(!L||!SD.on)return r;
  const n=cgFind(L[1]);if(n&&n!==CGX.cur)cgShow(n);else if(CGX.cur&&SD.i-CGX.i0>=CGX.h)cgHide()}catch(e){CGX.err=String(e)}return r})(stLine);
stClose=(f=>function(){try{cgHide()}catch(e){}return f.apply(this,arguments)})(stClose);
/* โหลดล่วงหน้า: เมื่อเริ่มบทสนทนาที่มีภาพ */
stSay=(f=>function(lines){try{if(CGX.on&&Array.isArray(lines))for(const L of lines){const n=L&&cgFind(L[1]);if(n)cgLoad(n)}}catch(e){}return f.apply(this,arguments)})(stSay);
/* การ์ดชื่อภาค/จบภาคของคัตซีน → ขึ้นทับภาพ */
setInterval(()=>{try{const d=CGX.el;if(!d||!CGX.cur)return;const t=d.querySelector('.tt');const T=CZ.ttl;let on=false;
  if(T&&typeof czNow==='function'){const a=czNow()-T.t0;on=a>=0&&a<(T.d||4)-.6;if(on&&t.dataset.k!==T.a+T.b){t.dataset.k=T.a+T.b;t.querySelector('b').textContent=T.a||'';t.querySelector('i').textContent=T.b||''}}
  t.classList.toggle('on',on)}catch(e){}},200);
/* บันทึกภาพที่เคยเห็น */
try{snap=(f=>function(){const o=f.apply(this,arguments);try{if(me.cgv)o.cgv=me.cgv>>>0}catch(e){}return o})(snap)}catch(e){}
try{cleanChar=(f=>function(c){const o=f.apply(this,arguments);try{if(o&&c&&Number.isFinite(c.cgv))o.cgv=(c.cgv>>>0)&0x1fffffff}catch(e){}return o})(cleanChar)}catch(e){}
try{applySave=(f=>function(c){const r=f.apply(this,arguments);try{me.cgv=c&&Number.isFinite(c.cgv)?(c.cgv>>>0)&0x1fffffff:0}catch(e){}return r})(applySave)}catch(e){}
/* ปลดล็อกในแกลเลอรี: เคยเห็น หรือเนื้อเรื่องผ่านจุดนั้นแล้ว */
function cgUnl(n){try{if((me.cgv|0)&(1<<(n-1)))return true;const c=CGL.find(x=>x[0]===n);if(!c)return false;const t=c[1],q=me.sty||{s:0,a:0};
  const has=A=>Array.isArray(A)&&A.some(L=>L&&typeof L[1]==='string'&&L[1].indexOf(t)>=0);
  for(let i=0;i<STY.length;i++){const s=STY[i];if(has(s.pre))return q.s>i||(q.s===i&&q.a>=1);if(has(s.post))return q.s>i}
  if(typeof STEND!=='undefined')for(const k of[1,2])if(has(STEND[k]))return q.e===k;
  if(typeof STE10!=='undefined')for(const k in STE10)if(has(STE10[k]))return q.e10===+k||q.e10===k;
  return false}catch(e){return false}}
function cgView(n){const ok=[];for(let i=1;i<=29;i++)if(cgUnl(i))ok.push(i);if(!ok.length)return;let k=Math.max(0,ok.indexOf(n));cgEl();
  let v=document.getElementById('cgview');if(v)v.remove();v=document.createElement('div');v.id='cgview';
  v.innerHTML='<button class="x" aria-label="ปิด">✕</button><button class="nv l" aria-label="ก่อนหน้า">‹</button><img alt=""><div class="cap"></div><button class="nv r" aria-label="ถัดไป">›</button>';
  const im=v.querySelector('img'),cap=v.querySelector('.cap');const set=()=>{const m=ok[k];im.src=cgSrc(m);cap.textContent=m+'. '+CGNM[m]+'  ('+(k+1)+'/'+ok.length+')'};
  v.querySelector('.l').onclick=e=>{e.stopPropagation();k=(k+ok.length-1)%ok.length;set()};v.querySelector('.r').onclick=e=>{e.stopPropagation();k=(k+1)%ok.length;set()};
  v.querySelector('.x').onclick=e=>{e.stopPropagation();v.remove()};v.onclick=()=>v.remove();im.onclick=e=>{e.stopPropagation();k=(k+1)%ok.length;set()};
  document.body.appendChild(v);set()}
try{storyUI=(f=>function(){const r=f.apply(this,arguments);try{if(ov.dataset.k!=='story')return r;const pn=ov.querySelector('[data-pn="story"]');if(!pn)return r;cgEl();
  let u=0;const it=CGL.map(c=>{const n=c[0],ok=cgUnl(n);if(ok)u++;return ok?'<button data-cgv="'+n+'" aria-label="'+CGNM[n]+'"><img loading="lazy" src="'+cgSrc(n,1)+'" alt=""><small>'+n+'. '+CGNM[n]+'</small></button>':'<button class="lk" disabled aria-label="ยังไม่ปลดล็อก"><span>🔒</span></button>'}).join('');
  const h='<div class="card" id="cggal"><div class="cap">🖼 ภาพเนื้อเรื่อง · '+u+'/29</div><div class="cggr">'+it+'</div></div>';
  const cz=pn.querySelector('[data-csr]');const anc=cz?cz.closest('.card'):null;if(anc)anc.insertAdjacentHTML('beforebegin',h);else pn.insertAdjacentHTML('beforeend',h);
  pn.querySelectorAll('[data-cgv]').forEach(b=>b.onclick=e=>{e.stopPropagation();cgView(+b.dataset.cgv)})}catch(e){CGX.err=String(e)}return r})(storyUI)}catch(e){}
