
/* ===== v479 · เล่นได้ทั้งแนวตั้ง/แนวนอน · มือถือ แท็บเล็ต PC =====
   เดิม: สนามกว้างคงที่ 360 หน่วย จัดเป็นคอลัมน์ 420px กลางจอ · มือถือแนวนอนขึ้นเตือน «หมุนเครื่องเป็นแนวตั้ง» แล้วย่อทั้งเกม
   ใหม่ (โหมดจอกว้าง body.vw): จอกว้างกว่า 560px (และไม่ผอมสูงเกิน)
     - สนามเต็มจอ: W/H (หน่วยเกม) ตามสัดส่วนจอจริง · SW0 (ความกว้างฐาน ใช้กับซูมกล้องและภาพทับจอ) เปลี่ยนตาม
     - เห็นโลกได้ไม่เกิน 1040×620 หน่วย (จอตั้ง 600×900) · สเกลไม่ต่ำกว่า 0.86 · จอยาวมากเหลือขอบซ้าย-ขวา
     - เซิร์ฟเวอร์ส่งมอน/ผู้เล่น/เอฟเฟกต์ตามรัศมีที่จอเห็นจริง (presence vr) ไม่ให้มอนโผล่กลางจอ · กล้องซูมออกไม่ต่ำกว่า .9
     - จอใหญ่ (สเกล ≥1.5 เช่น Full HD): ขยายปุ่ม/แผง DOM ทั้งชุดตาม (VW.uz สูงสุด 1.6) ให้เข้ากับภาพในสนาม
     - หน้าต่างเมนู/แผงต่าง ๆ/บทสนทนา NPC อยู่กลางจอ กว้างไม่เกิน 600px · พื้นหลังมืดลง แตะนอกหน้าต่าง = ปิด
     - จอเตี้ย (มือถือแนวนอน · สูง < 600px · body.vws): ปุ่มกิจกรรม/แชต/อีโมตเรียงแถวข้างปุ่มเมนู · การ์ดเควสขยับขึ้น
       (มุมซ้ายล่างว่างให้จอยสติ๊ก) · ข้อความแชตไปกลางล่าง · ป้ายเควสย่อไปข้างการ์ดสถานะ
   มือถือแนวตั้ง (กว้าง ≤560px) ใช้ผังเดิมทุกอย่าง · หมุนจอ/ย่อหน้าต่างกลางเกมสลับโหมดเองทันที */
const VW={on:0,sh:0,k:1,uz:1,n:0,cw:0,ch:0};
function vwVH(){return Math.max(240,Math.round(window.visualViewport?visualViewport.height:innerHeight))}
function vwVW(){return Math.max(240,Math.round(window.visualViewport?visualViewport.width:innerWidth))}
function vwWant(){const w=vwVW(),h=vwVH();return w>560&&w>=h*.6?1:0}
function vwCoarse(){try{return matchMedia('(pointer:coarse)').matches}catch(e){return false}}
function vwDims(){const vw=vwVW(),vh=vwVH(),sh=vh<600?1:0,tall=vh>vw*1.05,Wm=tall?600:1040,Hm=tall?900:620;
  const k=Math.max(vh/Hm,vw/Wm,sh?.86:.9),w=Math.min(Wm,Math.floor(vw/k)),h=Math.min(Hm+40,Math.floor(vh/k));
  let uz=sh?1:Math.max(1,Math.min(1.6,k*.72));if(uz<1.06)uz=1;return{w,h,k,uz,sh,vw,vh}}
/* รัศมีที่จอเห็น (หน่วยโลก) ให้เซิร์ฟเวอร์ส่งของในระยะนี้ */
function vwVR(){if(!VW.on)return 0;return Math.min(800,Math.ceil(Math.hypot(SW0/2,(ZM.on?ZM.h0:H)/2)/.9)+20)}
window.vwVR=vwVR;
function vwSet(w,h){if(ZM.on){W=SW0;H=ZM.h0;ZM.on=0}W=SW0=w;H=h;applyQ();try{JB.y=H-84}catch(e){}VW.n++}
function vwApply(on){VW.on=on;document.body.classList.toggle('vw',!!on);vwCSS();
  const app=$('app');if(app){app.style.transform='';app.style.transformOrigin='';app.style.height='';app.style.width='';app.style.marginLeft='';app.style.marginTop=''}cv.style.width='';cv.style.height='';
  if(!on){VW.uz=1;document.body.classList.remove('vws');if(SW0!==360)vwSet(360,Math.max(520,Math.min(900,H)));try{audPos()}catch(e){}
    for(const id of['aud','ptyhud']){const e=$(id);if(e){e.style.right='';e.style.width=''}}
    const sk=$('sk');if(sk){sk.style.transform='';sk.style.transformOrigin=''}try{vwStq()}catch(e){}}}
function vwTyping(){const a=document.activeElement;return!!a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.isContentEditable)}
function vwFit(){const D=vwDims();if(VW.on&&VW.lvh&&vwTyping()&&D.vh<VW.lvh*.85&&Math.abs(D.vw-(VW.lvw||D.vw))<4)return;VW.lvw=D.vw;VW.k=D.k;VW.sh=D.sh;VW.uz=D.uz;document.body.classList.toggle('vws',!!D.sh);
  if(D.w!==SW0||D.h!==(ZM.on?ZM.h0:H))vwSet(D.w,D.h);else if(vwDpr()!==DPR||Math.abs(cv.width-Math.floor(W*DPR))>1.5)applyQ();VW.lvh=D.vh;
  const cw=Math.round(SW0*D.k),ch=Math.round((ZM.on?ZM.h0:H)*D.k),u=D.uz,app=$('app');VW.cw=cw;VW.ch=ch;
  if(app){app.style.transform=u>1?'scale('+u.toFixed(4)+')':'';app.style.transformOrigin=u>1?'0 0':'';
    app.style.width=(cw/u).toFixed(2)+'px';app.style.height=(ch/u).toFixed(2)+'px';app.style.marginLeft=Math.max(0,Math.floor((D.vw-cw)/2))+'px';app.style.marginTop=Math.max(0,Math.floor((D.vh-ch)/2))+'px'}
  cv.style.width=(cw/u).toFixed(2)+'px';cv.style.height=(ch/u).toFixed(2)+'px';
  const R=document.documentElement.style;R.setProperty('--vk',(D.k/u).toFixed(4));R.setProperty('--vuz',u.toFixed(4));
  try{const r=$('rot');if(r)r.classList.add('x')}catch(e){}vwPos()}
/* DOM ที่ผังเดิมวางเป็น % ของกรอบ 360×520 หรือ px คงที่ (ออกแบบไว้สำหรับจอตั้ง) → จัดใหม่ตามสเกลจริง (px ในกรอบ #app ที่อาจถูกขยาย uz)
   แผนที่เล็ก (วาดบนแคนวาส) อยู่ขวาบน: x W-94..W-2 · y 8..104 หน่วย
   จอสูงพอ: ปุ่มเสียงใต้แผนที่เล็ก → เกจคลั่ง → (ปุ่มเดินไวในค่าย) → แถบปาร์ตี้ · ป้ายแผนที่สมบัติซ้ายของแผนที่เล็ก
   จอเตี้ย (v479b): แถวบนซ้ายของแผนที่เล็ก = ปุ่มเสียง · ปุ่มเดินไวในค่าย/ป้ายแผนที่สมบัติ · เกจคลั่งใต้แถว
     ปุ่มสกิลย่อ/ขยายให้พอดีพื้นที่ใต้แผนที่เล็ก (0.58–0.9) · แถบปาร์ตี้ไปซ้ายข้างการ์ดสถานะ
     การ์ดเควสสูงได้ไม่เกินขอบบนจอยสติ๊ก (ไม่บังจอย) · ป้ายแจ้ง (ไปต่อ/สกิลใหม่/สัตว์เลี้ยง) อยู่ซ้ายของปุ่มสกิล */
const VWP={t:0};
function vwPos(){if(!VW.on)return;const k=VW.k/VW.uz,hL=VW.ch/VW.uz,Rs=document.documentElement.style,px=v=>Math.round(v)+'px';
  const mmR=96*k,a=$('aud'),p=$('ptyhud'),fg=$('fvg'),sk=$('sk'),cl=$('clog');
  if(VW.sh){const aw=72*k,at=22*k;
    if(a){a.style.top=px(at);a.style.right=px(mmR);a.style.width=px(aw)}
    const rowR=mmR+aw+8;Rs.setProperty('--vwu6t',px(at-2));Rs.setProperty('--vwu6r',px(rowR));Rs.setProperty('--vwtmt',px(at-4));Rs.setProperty('--vwtmr',px(rowR));
    const ft=at+28*k+8;Rs.setProperty('--vwfgt',px(ft));Rs.setProperty('--vwfgr',px(mmR));
    const top=Math.max(104*k,ft+15)+6,sc=Math.max(.58,Math.min(.9,(hL-12-top)/240));
    if(sk){sk.style.transform='scale('+sc.toFixed(3)+')';sk.style.transformOrigin='100% 100%'}
    Rs.setProperty('--vwskw',px(240*sc+10));VW.skL=(VW.cw/VW.uz-(240*sc+10))/k;Rs.setProperty('--vwskh',px(240*sc+12));
    if(p){p.style.top='';p.style.right=''}
    if(cl){cl.style.bottom=''}
  }else{const at=107*k+1;
    if(a){a.style.top=px(at);a.style.right=px(8*k+1);a.style.width=px(72*k)}
    Rs.setProperty('--vwfgt',px(at+34));Rs.setProperty('--vwfgr',px(8*k+1));Rs.setProperty('--vwtmt',px(10*k));Rs.setProperty('--vwtmr',px(mmR));
    if(p){p.style.top=px(Math.max(142*k,at+91));p.style.right=px(6*k+1)}
    if(sk){sk.style.transform='';sk.style.transformOrigin=''}
    if(cl){cl.style.bottom=px(183*k)}}
  if(cl)try{logFit(cl)}catch(e){}
  vwStq()}
/* ป้ายแรงค์สไตล์ (ux61 · กล่อง 62×58 หน่วย) ในจอเตี้ย: ซ้ายของกลุ่มปุ่มสกิล ชิดล่าง */
function vwStyX(){return Math.max(140,Math.round((VW.skL||SW0-230)-72))}
u61Y=(f=>function(){if(VW.on&&VW.sh)return Math.round((ZM.on?ZM.h0:H)-84);return f.apply(this,arguments)})(u61Y);
/* การ์ดเควสในจอเตี้ย: ไม่ให้ยาวลงไปทับจอยสติ๊ก (วงจอยรัศมี ~56 หน่วยรอบ JB.y) */
function vwStq(){const q=$('stq');if(!q)return;if(!VW.on||!VW.sh){if(q.style.maxHeight){q.style.maxHeight='';q.style.overflow=''}return}
  const k=VW.k/VW.uz,jt=(JB.y-56)*k,r=q.getBoundingClientRect(),c=cv.getBoundingClientRect();if(!r.height)return;
  const mh=Math.max(24,Math.round(jt-(r.top-c.top)-6))+'px';if(q.style.maxHeight!==mh){q.style.maxHeight=mh;q.style.overflow='hidden'}}
setInterval(()=>{try{if(VW.on&&VW.sh)vwStq()}catch(e){}},700);
fitStage=(f=>function(){try{const w=vwWant();if(w!==VW.on)vwApply(w);if(w){vwFit();return}}catch(e){console.warn('vw',e)}return f.apply(this,arguments)})(fitStage);
audPos=(f=>function(){if(VW.on)return vwPos();return f.apply(this,arguments)})(audPos);
/* ความคมของภาพ: สนามถูกขยาย VW.k เท่า → ความละเอียดแคนวาส = DPR จอ × k (PC 1440×900 ≈1.45 · Full HD ≈1.85) ไม่ให้ภาพเบลอ
   เพดานตามโหมดกราฟิก (สูง 3 · ปกติ 2 · ประหยัดอัตโนมัติ 1.75 · ประหยัด 1.5) · มือถือ/แท็บเล็ตจอกว้างไม่เกิน 1.5 (สูง 2) */
function vwDpr(){const raw=Math.min(3,(window.devicePixelRatio||1)*VW.k);let cap=GQ==='high'?3:LOWQ?1.5:LITEQ?1.75:2;if(vwCoarse())cap=Math.min(cap,GQ==='high'?2:1.5);return Math.max(1,Math.round(Math.min(raw,cap)*20)/20)}
applyQ=(f=>function(){f.apply(this,arguments);if(VW.on){const d=vwDpr();if(d!==DPR){DPR=d;cv.width=W*DPR;cv.height=H*DPR}}})(applyQ);
camZoomT=(f=>function(){const z=f.apply(this,arguments);return VW.on?Math.max(.9,z):z})(camZoomT);
/* พื้นหลังมืดรอบหน้าต่าง (จอกว้าง) · แตะ = ปิดแบบเดียวกับปุ่ม ✕ */
function vwBd(){let b=$('vwbd');const o=$('ov');if(b||!o)return;b=document.createElement('div');b.id='vwbd';o.after(b);
  b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation()});
  b.addEventListener('click',e=>{e.stopPropagation();const x=$('ovx');if(x&&!x.hidden)x.click()})}
function vwCSS(){vwBd();if($('vwcss'))return;const st=document.createElement('style');st.id='vwcss';const P='max(8px,calc(50% - 300px))';st.textContent=
 'body.vw{overflow:hidden}body.vw #app{max-width:none;margin:0;padding:0;display:block}body.vw #stage{width:100%;height:100%}'+
 'body.vw canvas#c{border:0;border-radius:0;max-width:none}body.vw #rot{display:none!important}'+
 /* หน้าต่าง/เมนู/บทสนทนากลางจอ */
 'body.vw #ov{left:'+P+';right:'+P+'}body.vw #ov:has(>.csw){left:0;right:0}body.vw #ovx{right:calc('+P+' + 22px)}body.vw #ov:has(>.csw)~#ovx{right:22px}'+
 '#vwbd{display:none}body.vw #ov:not([hidden])~#vwbd{display:block;position:absolute;inset:0;z-index:3;background:rgba(6,5,10,.5)}body.vw #ov:has(>.csw)~#vwbd{display:none}'+
 'body.vw #mnp.ui8m{left:'+P+'!important;right:'+P+'!important}body.vw #sdlg{left:'+P+';right:'+P+'}'+
 'body.vw #cbar{right:auto;width:min(520px,calc(100% - 130px))}'+
 /* จอเตี้ย: ปุ่มกิจกรรม/แชต/อีโมตเป็นแถวข้างปุ่มเมนู · การ์ดเควสใต้แถว · มุมซ้ายล่างเว้นให้จอยสติ๊ก */
 'body.vws #topb{flex-direction:row;flex-wrap:wrap;align-items:center;top:'+ '83px!important;margin-top:0!important;left:68px;max-width:200px;gap:6px!important}'+
 'body.vws #topb>#stq{flex-basis:100%;margin-left:-60px;max-width:200px!important}'+
 'body.vws #topb>#stq,body.vws #topb>#bfb{margin-top:12px}'+
 'body.vws #rbq,body.vws #rnq{position:fixed!important;left:238px!important;right:auto!important;top:12px!important;max-width:200px!important}body.vws #rnq{top:42px!important}'+
 'body.vws #clog{left:150px;width:min(42%,360px)!important;bottom:10px;max-height:96px}'+
 /* ป้าย/ปุ่มที่โค้ดเดิมวางเป็น px สำหรับจอตั้ง → ตำแหน่งจากตัวแปรที่ vwPos คิดให้ */
 'body.vw #fvg{top:var(--vwfgt,142px)!important;right:var(--vwfgr,10px)!important}body.vw #tmh{top:var(--vwtmt)!important;right:var(--vwtmr)!important}'+
 'body.vws #u64b{top:var(--vwu6t)!important;right:var(--vwu6r)!important}body.vws #tmh{transform:scale(.85);transform-origin:100% 0}'+
 'body.vws #ptyhud{left:238px!important;right:auto!important;top:72px!important;transform:scale(.82);transform-origin:0 0}'+
 'body.vws #stq[style*="max-height"]{-webkit-mask-image:linear-gradient(180deg,#000 calc(100% - 12px),transparent);mask-image:linear-gradient(180deg,#000 calc(100% - 12px),transparent)}'+
 'body.vws #rdb{right:calc(var(--vwskw) + 8px)!important;bottom:12px!important;left:auto!important}'+
 'body.vws #skl{right:calc(var(--vwskw) + 8px)!important;bottom:58px!important}body.vws #peb{right:calc(var(--vwskw) + 8px)!important;bottom:104px!important}'+
 'body.vws #emp{left:60px;top:132px}body.vws #mnp.ui8m{top:8px!important;bottom:8px!important}';document.head.appendChild(st)}
setTimeout(()=>{try{fitStage()}catch(e){}},0);setTimeout(()=>{try{fitStage()}catch(e){}},700);
logFit=(f=>function(el){const r=f.apply(this,arguments);try{if(VW.on&&VW.uz>1&&el&&el.style.maxHeight)el.style.maxHeight=Math.round(parseFloat(el.style.maxHeight)/VW.uz)+'px'}catch(e){}return r})(logFit);
