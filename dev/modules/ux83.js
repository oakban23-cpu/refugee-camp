
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
    for(const id of['aud','ptyhud']){const e=$(id);if(e){e.style.right='';e.style.width=''}}}}
function vwTyping(){const a=document.activeElement;return!!a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.isContentEditable)}
function vwFit(){const D=vwDims();if(VW.on&&VW.lvh&&vwTyping()&&D.vh<VW.lvh*.85&&Math.abs(D.vw-(VW.lvw||D.vw))<4)return;VW.lvw=D.vw;VW.k=D.k;VW.sh=D.sh;VW.uz=D.uz;document.body.classList.toggle('vws',!!D.sh);
  if(D.w!==SW0||D.h!==(ZM.on?ZM.h0:H))vwSet(D.w,D.h);else if(vwDpr()!==DPR||Math.abs(cv.width-Math.floor(W*DPR))>1.5)applyQ();VW.lvh=D.vh;
  const cw=Math.round(SW0*D.k),ch=Math.round((ZM.on?ZM.h0:H)*D.k),u=D.uz,app=$('app');VW.cw=cw;VW.ch=ch;
  if(app){app.style.transform=u>1?'scale('+u.toFixed(4)+')':'';app.style.transformOrigin=u>1?'0 0':'';
    app.style.width=(cw/u).toFixed(2)+'px';app.style.height=(ch/u).toFixed(2)+'px';app.style.marginLeft=Math.max(0,Math.floor((D.vw-cw)/2))+'px';app.style.marginTop=Math.max(0,Math.floor((D.vh-ch)/2))+'px'}
  cv.style.width=(cw/u).toFixed(2)+'px';cv.style.height=(ch/u).toFixed(2)+'px';
  const R=document.documentElement.style;R.setProperty('--vk',(D.k/u).toFixed(4));R.setProperty('--vuz',u.toFixed(4));
  try{const r=$('rot');if(r)r.classList.add('x')}catch(e){}vwPos()}
/* DOM ที่ผังเดิมวางเป็น % ของกรอบ 360×520 → px (ในกรอบ #app ที่อาจถูกขยาย uz) */
function vwPos(){if(!VW.on)return;const k=VW.k/VW.uz;
  const a=$('aud');if(a){a.style.top=Math.round(107*k+1)+'px';a.style.right=Math.round(8*k+1)+'px';a.style.width=Math.round(72*k)+'px'}
  const p=$('ptyhud');if(p){p.style.top=Math.round(142*k)+'px';p.style.right=Math.round(6*k+1)+'px'}
  const cl=$('clog');if(cl){cl.style.bottom=VW.sh?'':Math.round(183*k)+'px';try{logFit(cl)}catch(e){}}}
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
 'body.vws #clog{left:max(150px,24%);width:min(46%,430px)!important;bottom:10px;max-height:96px}'+
 'body.vws #emp{left:60px;top:132px}body.vws #mnp.ui8m{top:8px!important;bottom:8px!important}';document.head.appendChild(st)}
setTimeout(()=>{try{fitStage()}catch(e){}},0);setTimeout(()=>{try{fitStage()}catch(e){}},700);
logFit=(f=>function(el){const r=f.apply(this,arguments);try{if(VW.on&&VW.uz>1&&el&&el.style.maxHeight)el.style.maxHeight=Math.round(parseFloat(el.style.maxHeight)/VW.uz)+'px'}catch(e){}return r})(logFit);
