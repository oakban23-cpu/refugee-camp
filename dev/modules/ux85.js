
/* ===== v481 · ไล่เช็กแนวนอนทั้งเกม (ถ่ายภาพ 43 หน้าจอ × มือถือแนวนอน 788×288 / PC 1440×900) แล้วแก้ที่ยังดูไม่ดี =====
   ① หน้าแรก: แนวนอนเคยเป็นโปสเตอร์แนวตั้งแคบ ๆ กลางจอ ปุ่ม «แตะเพื่อเริ่มผจญภัย» ล้นขอบ (มือถือ)
      → แบ่งจอ: โปสเตอร์ชิดขวา · โลโก้ + ปุ่ม + รุ่น อยู่ฝั่งซ้ายบนพื้นเบลอ
   ② หน้าสร้าง/เลือกตัวละคร: คอลัมน์เดียวสูง 1,300px ต้องเลื่อนยาวกว่าจะถึงเลือกอาชีพ/ปุ่มสร้าง
      → สองคอลัมน์: ซ้าย = ภาพตัวละคร (ค้างไว้ตอนเลื่อน สูงเต็มจอ) · ขวา = เลือกอาชีพ ชื่อ ปุ่มสร้าง รายละเอียด
   ③ ตอนล้ม: ป้าย «💀 ล้มลงแล้ว…» ทับแถบ «ล้มลง ฟื้นที่ค่ายใน N วิ» (ทุกจอ) และปุ่มฟื้นทับข้อความ (จอเตี้ย)
      → ป้ายขึ้นไปอยู่เหนือแถบ · จอเตี้ยปุ่มฟื้นอยู่ใต้แถบ
   ④ จอเตี้ย: ช่องพิมพ์แชตทับการ์ดเควส/ปุ่มเป้า → แถวบนกลางจอ · แผงอีโมตเลยขอบล่าง → ใต้แถวปุ่ม
   ⑤ จอเตี้ย: ป้ายเควสย่อ (คู่มือรูน/ค่าหัว) ตอนเดิน/สู้กลายเป็นกรอบว่าง → แสดงตัวนับ
   ⑥ จอเตี้ย: หน้าต่างกว้างขึ้น 720px + หัวหน้าต่างกะทัดรัด (เห็นเนื้อหามากขึ้น เลื่อนน้อยลง) */
(function(){const st=document.createElement('style');st.id='vw481';const TP='calc(100vh*.5625)',P2='max(8px,calc(50% - 360px))';st.textContent=
 /* ① หน้าแรกแนวนอน */
 '@media (min-aspect-ratio:23/20){#ttl .fr{width:100vw;box-shadow:none}'+
 '#ttl .bg,#ttl .sh{left:auto;right:4vw;width:'+TP+';box-shadow:0 0 60px rgba(0,0,0,.85)}'+
 '#ttl .lg{right:calc('+TP+' + 4vw);top:22%}#ttl .lg .t{font-size:min(9vw,15vh,104px)}#ttl .lg .s{font-size:min(1.9vw,3.6vh,17px)}#ttl .lg .ln{width:min(62%,420px)}'+
 '#ttl .go{left:calc((100vw - '+TP+' - 4vw)/2);bottom:24%;font-size:min(17px,4.6vh);padding:min(14px,3.4vh) 30px}'+
 '#ttl .ver{right:calc('+TP+' + 4vw);bottom:6%}}'+
 /* ② สร้าง/เลือกตัวละคร สองคอลัมน์ (vwCs จัดลูกของ .csw เข้า .vwcsL / .vwcsR) */
 'body.vw #ov>.csw{flex-direction:row;align-items:flex-start;gap:18px;max-width:1100px;padding:10px 16px 18px}'+
 '.vwcsL{flex:0 0 40%;max-width:440px;position:sticky;top:0;display:flex;flex-direction:column;gap:8px;height:min(calc(100vh - 20px),660px);height:min(calc(100dvh - 20px),660px)}'+
 '.vwcsL>.cs-stage{flex:1;min-height:140px}.vwcsL>.cs-stage canvas{height:100%!important}'+
 '.vwcsR{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;padding-bottom:10px}'+
 'body.vws .vwcsL .cs-top{flex-wrap:wrap;gap:4px}body.vws .vwcsL .cs-net{font-size:10px}body.vws .vwcsL .cs-net p{margin:0}'+
 'body.vws .vwcsR{gap:7px}body.vws .vwcsR .cs-cls img{max-width:40px}body.vws .vwcsR .cs-cls button{padding:4px 2px 5px}body.vws .vwcsR .cs-cls small{font-size:9px;min-height:0}'+
 'body.vws .vwcsR .cs-namebox{padding:7px 10px;gap:3px}body.vws .vwcsR .cs-namebox small{display:none}body.vws .vwcsR .cs-namebox input{padding:7px 10px;font-size:15px}'+
 'body.vws .vwcsR .cs-go{padding:10px 14px;font-size:15px}'+
 /* ③ ตอนล้ม */
 '#vzd{top:auto!important;bottom:calc(50% + 44px)}body.vws #rv{top:calc(50% + 36px)}'+
 /* ④ แชต/อีโมตในจอเตี้ย */
 'body.vws #cbar{top:6px!important;left:238px!important;right:calc(var(--vwu6r,150px) + 112px)!important;width:auto!important;margin-top:0!important;z-index:7}'+
 'body.vws.vwchat #rnq,body.vws.vwchat #rbq{visibility:hidden!important}'+
 'body.vws #clog{left:216px!important;width:min(42%,360px,calc(100% - 228px - var(--vwskw,240px)))!important}'+
 'body.vws #emp{margin-top:0!important;top:126px!important;left:60px!important;max-height:calc(100% - 132px);overflow:auto}'+
 /* ⑤ ป้ายเควสย่อไม่ว่างเปล่า */
 'body.vws #topb.vzmin #rnq>.rs,body.vws #topb.vzmin #rbq>.rs{display:inline!important}'+
 /* ⑥ หน้าต่างในจอเตี้ย */
 'body.vws #ov{left:'+P2+'!important;right:'+P2+'!important;padding:6px!important}body.vws #ovx{right:calc('+P2+' + 16px)!important;top:13px!important}'+
 'body.vws #ov:has(>.csw){left:0!important;right:0!important;padding:0!important}body.vws #ov:has(>.csw)~#ovx{right:22px!important}'+
 'body.vws #ov>.pn{padding:10px 12px!important}body.vws #ov>.pn>.ph{padding-bottom:4px!important;min-height:0!important}body.vws #ov>.pn>.ph .ic{transform:scale(.82);transform-origin:0 50%}';
 (document.head||document.documentElement).appendChild(st)})();
/* ⑦ จอเตี้ย: ปุ่มบริบท (คุย NPC/เก็บของ/หอคอย · เก็บวัตถุดิบ · เริ่มดันเจี้ยน · ศาลเจ้า · ตกปลา · เต็นท์ · แท่นจุติ · เชิญดันเจี้ยน · คำขอแลกของ/ปาร์ตี้ · แผงตกปลา) เดิมวางเป็น px จากล่าง/ % สำหรับจอตั้ง
   (เต็นท์ bottom 242 = ชนขอบบนจอ 288) → เรียงซ้อนจากล่างกลางจอ ระหว่างจอยสติ๊กกับปุ่มสกิล · แชตเลื่อนขึ้นเหนือปุ่ม */
const VWC=['npcb','gtb','twb','gthb','dgb','shrb','fshb','tnb','rbb','dinvb','trq','ptq','fsp'],VWCP=['top','bottom','left','right','transform','max-width'];
function vwCtx(){const sh=VW.on&&VW.sh;let acc=12;const k=VW.k/VW.uz,jR=(JB.x+56)*k,sL=(VW.skL||SW0-230)*k,mid=Math.round((jR+sL)/2),mw=Math.max(140,Math.round(sL-jR-16));
  for(const id of VWC){const e=$(id);if(!e)continue;if(!sh){if(e.dataset.vwc){for(const p of VWCP)e.style.removeProperty(p);delete e.dataset.vwc}continue}
    const cs=getComputedStyle(e);if(e.hidden||cs.display==='none'||cs.visibility==='hidden'){continue}
    e.dataset.vwc=1;e.style.setProperty('top','auto','important');e.style.setProperty('bottom',acc+'px','important');e.style.setProperty('left',mid+'px','important');e.style.setProperty('right','auto','important');
    e.style.setProperty('transform','translateX(-50%)','important');e.style.setProperty('max-width',mw+'px','important');acc+=e.offsetHeight+6}
  {const cb=$('cbar'),op=sh&&!!cb&&!cb.hidden&&getComputedStyle(cb).display!=='none';document.body.classList.toggle('vwchat',op)}
  const cl=$('clog');if(cl){const b=sh?(acc>12?acc+4:10)+'px':'';if(cl.style.bottom!==b&&sh){cl.style.bottom=b;try{logFit(cl)}catch(e){}}}}
setInterval(()=>{try{vwCtx()}catch(e){}},250);
/* ⑧ ตอนล้ม: แถบประกาศบนแคนวาส (bannerY ≤ H×0.45) ทับแถบ «ล้มลง ฟื้นที่ค่ายใน…» → ซ่อนประกาศระหว่างล้ม (ข้อความยังอยู่ในแชต) */
bannerY=(f=>function(){if(me&&me.cls&&me.down>0)return -600;return f.apply(this,arguments)})(bannerY);

/* ② จัดหน้าสร้าง/เลือกตัวละครเป็นสองคอลัมน์ตอนจอกว้าง · กลับเป็นคอลัมน์เดียวเมื่อหมุนกลับแนวตั้ง */
function vwCs(){const w=ov&&ov.querySelector('.csw');if(!w)return;let L=w.querySelector(':scope>.vwcsL'),R=w.querySelector(':scope>.vwcsR');
  if(VW.on&&!L){L=document.createElement('div');L.className='vwcsL';R=document.createElement('div');R.className='vwcsR';const kids=[...w.children];
    for(const c of kids){if(c.classList.contains('cs-top')||c.classList.contains('cs-stage'))L.appendChild(c);else R.appendChild(c)}w.appendChild(L);w.appendChild(R);try{csKick()}catch(e){}}
  else if(!VW.on&&L){for(const c of[...L.children,...(R?[...R.children]:[])])w.appendChild(c);L.remove();if(R)R.remove();try{csKick()}catch(e){}}
  else if(VW.on&&L&&R){for(const c of[...w.children]){if(c!==L&&c!==R)R.appendChild(c)}}}
introRaw=(f=>function(){const r=f.apply(this,arguments);try{vwCs()}catch(e){}return r})(introRaw);
setInterval(()=>{try{if(!ov.hidden)vwCs()}catch(e){}},400);
