/* ===== v531 หน้าต่างในเกมโฉมใหม่ — กระเป๋า/อุปกรณ์ · ร้านค้า · ตีบวก · สกิล · สัตว์เลี้ยง · เควส ฯลฯ (ทุกหน้าต่างที่เป็น .pn ใน #ov)
   ① ภาพ: โทนเดียวกับหน้าเลือกตัวละคร (v528) — พื้นม่วงเข้มอมดำ ไฟทองจาง ๆ จากด้านบน กรอบทอง · หัวหน้าต่างตัวทองไล่สี + เส้นทองคั่น
      การ์ดในหน้าต่างพื้นอุ่น ขอบทองบาง · หัวข้อการ์ดสีทองมีเส้นนำสายตา · แถบแท็บเป็นราง แท็บที่เลือกเป็นปุ่มทอง · ช่องไอเทมนูนมีแสงด้านบน
   ② จอแนวนอนกว้าง (พื้นที่หน้าต่าง ≥ 700px): หน้าต่างที่ยาวเกินจอ → ขยายกว้างแล้วเรียงการ์ดเป็น 2 คอลัมน์ (หัวหน้าต่าง/แท็บพาดเต็มแถว)
      การ์ดรายการยาว (≥ 6 แถว เช่น สัตว์เลี้ยง พาหนะ) แตกเป็นตาราง 2 คอลัมน์ · หน้าต่างสั้น (เช่น ร้านยา) คงขนาดเดิม
      ตัดสินตอนหน้าต่างวาดใหม่ทุกครั้ง (วัดความสูงแบบคอลัมน์เดียวก่อนเฟรมถูกวาด จึงไม่กะพริบ) · หมุนจอ/ย่อขยายหน้าต่างก็คำนวณใหม่
   ③ จอแนวตั้งได้แค่ภาพใหม่ เลย์เอาต์เหมือนเดิม · error → หน้าต่างแบบเดิม (PNV.on=0 ปิดทั้งหมด) ===== */
const PNV={on:1,err:'',n:0,c2:0};
function pnCSS(){if($('pnvcss'))return;const s=document.createElement('style');s.id='pnvcss';s.textContent=
/* ① โทนสี */
'body.pnv .pn{--u-bg:#140f19;--u-surf:rgba(255,226,180,.045);--u-surf2:rgba(255,226,180,.075);--u-surf3:rgba(255,226,180,.12);--u-line:rgba(231,183,90,.16);--u-line2:rgba(231,183,90,.36);--u-text:#efe6d6;--u-mute:#a99d8b;'+
 'background:radial-gradient(120% 420px at 50% -60px,rgba(231,170,80,.13),rgba(231,170,80,0) 70%),linear-gradient(180deg,#1b1421 0%,#120d17 55%,#0e0a12 100%)!important;border:1px solid rgba(231,183,90,.3)!important;'+
 'box-shadow:0 24px 64px rgba(0,0,0,.62),0 0 0 1px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,236,205,.09)!important;border-radius:22px!important}'+
'body.pnv .pn::before,body.pnv .pn::after{border-color:#e7b75a;opacity:.7}'+
'body.pnv .pn>.ph{position:relative;border-bottom:0!important;padding-bottom:10px}'+
'body.pnv .pn>.ph::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,rgba(231,183,90,0),rgba(231,183,90,.55) 18%,rgba(231,183,90,.18) 70%,rgba(231,183,90,0))}'+
'body.pnv .pn>.ph>div>b:first-child{background:linear-gradient(180deg,#fff3cf,#f0c66e 60%,#c98f2e);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 1px 1px rgba(0,0,0,.7));letter-spacing:.01em}'+
'body.pnv .pn>.ph small{color:#b4a690}'+
'body.pnv .ph .ic{background:radial-gradient(circle at 50% 30%,#3a2a3e,#160f1a)!important;border-color:#d9aa55!important;box-shadow:0 0 0 1px #1a1208,0 0 14px rgba(231,170,80,.22),0 2px 6px rgba(0,0,0,.5)!important}'+
'body.pnv .pn .card{background:linear-gradient(180deg,rgba(255,226,180,.055),rgba(255,226,180,.02))!important;border:1px solid rgba(231,183,90,.16)!important;border-radius:16px!important;box-shadow:inset 0 1px 0 rgba(255,236,205,.05),0 4px 14px rgba(0,0,0,.18)!important}'+
'body.pnv .pn .card.hint{background:linear-gradient(90deg,rgba(231,183,90,.09),rgba(231,183,90,.025))!important;border-style:dashed!important;border-color:rgba(231,183,90,.24)!important}'+
'body.pnv .pn .card .cap{color:#e7b75a!important;font-weight:800;letter-spacing:.03em}'+
'body.pnv .pn .card>.cap:not(:has(*)){display:flex;align-items:center;gap:8px}'+
'body.pnv .pn .card>.cap:not(:has(*))::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(231,183,90,.4),rgba(231,183,90,0))}'+
'body.pnv .pn .tabs{background:rgba(0,0,0,.28);border:1px solid rgba(231,183,90,.12);border-radius:16px;padding:4px;gap:4px}'+
'body.pnv .pn .card .tabs{background:rgba(0,0,0,.2);border-radius:13px;padding:3px}'+
'body.pnv .pn .tab{background:transparent;border-color:transparent;color:#cdbfa8}'+
'body.pnv .pn .tab:hover:not(:disabled):not(.on){background:rgba(255,226,180,.07);border-color:rgba(231,183,90,.18)}'+
'body.pnv .pn .tab.on,body.pnv .pn .pri,body.pnv .pn .rb{background:linear-gradient(180deg,#ffe7a6,#ebbd5c 52%,#c18a30)!important;border-color:#8a6420!important;color:#24170a!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 3px 8px rgba(0,0,0,.4),0 0 12px rgba(231,170,80,.18)!important}'+
'body.pnv .pn .cell{background:linear-gradient(180deg,rgba(255,236,205,.085),rgba(255,236,205,.02) 60%,rgba(0,0,0,.12))!important;border-radius:13px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 2px 6px rgba(0,0,0,.25)}'+
'body.pnv .pn .cell:hover:not(:disabled){transform:translateY(-1px);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 4px 10px rgba(0,0,0,.35),0 0 0 1px rgba(231,183,90,.35)}'+
':where(body.pnv) .pn button:not(.cell):not(.tab):not(.pri):not(.rb){background:linear-gradient(180deg,rgba(96,72,60,.55),rgba(36,26,30,.82));border-color:rgba(231,183,90,.3)}'+
':where(body.pnv) .pn button:not(.cell):not(.tab):not(.pri):not(.rb):hover:not(:disabled){background:linear-gradient(180deg,rgba(120,90,70,.6),rgba(46,34,36,.85));border-color:rgba(231,183,90,.5)}'+
'body.pnv .pn hr{border-top-color:rgba(231,183,90,.12)}'+
'body.pnv #ov:has(>.pn){scrollbar-width:thin;scrollbar-color:rgba(231,183,90,.4) transparent}'+
/* ② 2 คอลัมน์ (จอแนวนอนกว้าง) */
'body.pnv #ov:has(>.pn.pn2){left:max(8px,calc(50% - 600px))!important;right:max(8px,calc(50% - 600px))!important}'+
'body.pnv #ov:has(>.pn.pn2)~#ovx{right:calc(max(8px,calc(50% - 600px)) + 22px)!important}'+
'body.pnv #ov>.pn.pn2{max-width:1200px!important;width:100%!important;margin-left:auto;margin-right:auto}'+
'body.pnv #ov>.pn.pn2c{display:block!important;column-count:2;column-gap:14px;column-fill:balance}'+
'body.pnv #ov>.pn.pn2c>*{break-inside:avoid;-webkit-column-break-inside:avoid;margin:0 0 12px;display:flow-root}'+
'body.pnv #ov>.pn.pn2c>.card{display:flex}'+
'body.pnv #ov>.pn.pn2c>.ph,body.pnv #ov>.pn.pn2c>.tabs,body.pnv #ov>.pn.pn2c>.br,body.pnv #ov>.pn.pn2c>.pnsp{column-span:all;-webkit-column-span:all}'+
'body.pnv #ov>.pn.pn2c>.ph{display:flex}body.pnv #ov>.pn.pn2c>.tabs{display:flex}'+
'body.pnv #ov>.pn.pn2 .card.pn2l{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:18px;row-gap:0}'+
'body.pnv #ov>.pn.pn2 .card.pn2l>hr{display:none}'+
'body.pnv #ov>.pn.pn2 .card.pn2l>.sr{border-bottom:1px solid rgba(231,183,90,.1);padding:4px 0}'+
'body.pnv #ov>.pn.pn2 .card.pn2l>:not(.sr):not(hr){grid-column:1/-1}';
document.head.appendChild(s)}
/* ตัดสินเลย์เอาต์ของหน้าต่างหนึ่งบาน (เรียกตอน ov เปลี่ยนลูก/หน้าต่างเปลี่ยนขนาด) */
function pnLay(){if(!PNV.on)return;const P=ov&&ov.firstElementChild;if(!P||!P.classList||!P.classList.contains('pn')||ov.hidden)return;
  try{PNV.n++;const st=$('pnvcss');if(st&&document.head.lastElementChild!==st)document.head.appendChild(st);const cls=P.classList;cls.remove('pn2c');
    for(const c of P.querySelectorAll(':scope>.card.pn2l'))c.classList.remove('pn2l');
    const land=innerWidth>innerHeight*1.05;let ovw=ov.clientWidth;
    /* ทดลองขยายกว้างก่อน แล้ววัด */
    if(land){cls.add('pn2');ovw=ov.clientWidth}
    if(!land||ovw<700){cls.remove('pn2');return}
    const kids=[...P.children],cards=kids.filter(c=>!c.classList.contains('ph')&&!c.classList.contains('tabs')&&!c.classList.contains('br'));
    /* การ์ดรายการยาว → ตาราง 2 คอลัมน์ */
    let L=0;for(const c of cards){if(c.classList.contains('card')&&c.querySelectorAll(':scope>.sr').length>=6){c.classList.add('pn2l');L++}}
    const tall=P.scrollHeight>ov.clientHeight*1.08||P.offsetHeight>ov.clientHeight*1.08;
    if(tall&&cards.length>=3){cls.add('pn2c');PNV.c2++}
    else if(!L&&!tall){cls.remove('pn2')}}
  catch(e){PNV.err=String(e&&e.stack||e).slice(0,300);try{P.classList.remove('pn2','pn2c')}catch(_){}}}
(function(){try{
  pnCSS();document.body.classList.add('pnv');
  const mo=new MutationObserver(()=>{if(PNV.on)pnLay()});mo.observe(ov,{childList:true});
  let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(pnLay,140)});
  /* ov ถูกเปิด (hidden → แสดง) โดยไม่เปลี่ยนลูก */
  new MutationObserver(()=>{if(!ov.hidden)pnLay()}).observe(ov,{attributes:true,attributeFilter:['hidden']});
}catch(e){PNV.err=String(e).slice(0,200)}})();
