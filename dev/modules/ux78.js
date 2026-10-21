
/* ===== v473 · เมนูอ่านง่าย =====
   ① เมนูหลัก: จากแถบแคบ 3 คอลัมน์ 24 ปุ่มปนกัน → แผ่นกว้างเต็มจอ 4 คอลัมน์ แบ่ง 5 หมวดมีหัวข้อ
      ปุ่มเดิมทุกปุ่ม (id/คลิกเดิม) แค่ย้ายเข้าหมวด · ใต้ชื่อมีคำอธิบายสั้น/ค่าสด (กระเป๋า 14/120 · ยังไม่อ่าน 2 ฯลฯ)
      ปุ่ม «สกิล» เปลี่ยนชื่อเป็น «ตัวละคร» ให้ตรงกับหน้าที่เปิด · ป้าย 99+ (แต้มที่ยังไม่ลง) เป็นจุดทอง + «มีแต้มเหลือ»
      ปุ่มที่ถูกเพิ่มทีหลังโดยโมดูลอื่นจะถูกจัดเข้าหมวดใหม่ทุกครั้งที่เปิดเมนู · ปุ่มที่ไม่รู้จักไปอยู่หมวด «อื่น ๆ»
   ② มาตรฐานทุกแผง (ทำหลังแผงวาดเสร็จ ผ่าน MutationObserver บน #ov · ไม่แตะตรรกะเดิม)
      คำอธิบายใต้หัวแผงเหลือบรรทัดเดียว ยาวกว่านั้นมีปุ่ม ⓘ กางดู (จำสถานะต่อแผง)
      กล่องคำแนะนำ (.card.hint) เป็นกล่อง 💡 ชิดซ้าย · ยาวเกิน 3 บรรทัดย่อเหลือ 2 บรรทัด + «อ่านต่อ»
      ของที่ยังไม่มี (ปุ่ม 🔒 เปล่า ๆ) → ป้ายบอกสถานะ/วิธีได้มา
   ③ รายหน้า: ดันเจี้ยน (การ์ดป้ายข้อมูล+รางวัล · ปุ่มทองเฉพาะระดับที่แนะนำ · กลไกบอสพับเก็บ)
      ปาร์ตี้ (ขั้นตอนชวน + ประโยชน์เป็นป้าย) · อุปกรณ์ (คำอธิบายสัญลักษณ์ ▲▼ เป็นแถวป้าย · คำอธิบายขายอัตโนมัติพับเก็บ)
      ตัวละคร (ตัวเลขแต้มบนแท็บ) · สัตว์ขี่ (ความเร็ว/เลเวล/ราคาเป็นป้าย) · การ์ด (แก้ชื่อพลัง «undefined») */
(()=>{
const CSS=`
#mnp.ui8m{display:flex!important;flex-direction:column;gap:0!important;left:8px!important;right:8px!important;width:auto!important;min-width:0!important;top:64px!important;bottom:10px!important;max-height:none!important;padding:8px 10px 6px!important;overflow-y:auto!important;overscroll-behavior:contain;border-radius:18px!important;z-index:4!important;scrollbar-width:thin}
#mnp.ui8m[hidden]{display:none!important}
#mnp.ui8m>hr.mns{display:none!important}
#mnp.ui8m .ui8top{display:flex;align-items:center;gap:8px;padding:0 0 5px 2px;margin-bottom:0;border-bottom:1px solid rgba(216,176,96,.18)}
#mnp.ui8m .ui8top b{font:800 15px/1.2 system-ui;color:#f3e2b8;letter-spacing:.2px}
#mnp.ui8m .ui8top small{flex:1;font:500 10.5px/1.3 system-ui!important;color:#a99f8e!important;text-align:left!important;opacity:1!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#mnp.ui8m button#ui8x{flex:0 0 28px;width:28px;height:28px;min-height:0!important;padding:0!important;border-radius:50%!important;font:700 14px/1 system-ui;color:#f3e2b8;background:radial-gradient(circle at 50% 30%,#2a3656,#121a2e 70%)!important;border:1.5px solid #c9a050!important}
#mnp.ui8m .ui8s{display:flex;flex-direction:column;gap:4px;margin-top:5px}
#mnp.ui8m .ui8s[hidden]{display:none}
#mnp.ui8m .ui8h{display:flex;align-items:center;gap:6px;font:700 11px/1.2 system-ui;color:#e2c27a;letter-spacing:.3px;padding:0 2px}
#mnp.ui8m .ui8h::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(216,176,96,.45),rgba(216,176,96,0))}
#mnp.ui8m .ui8h i{font-style:normal;font-size:12px}
#mnp.ui8m .ui8g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
#mnp.ui8m button:not(#ui8x){min-height:0!important;padding:4px 3px 3px!important;gap:1px!important;border-radius:13px!important;background:linear-gradient(180deg,rgba(84,104,156,.30),rgba(24,32,56,.62))!important;border:1px solid rgba(216,176,96,.20)!important;justify-content:flex-start!important;min-width:0}
#mnp.ui8m button:not(#ui8x):active{transform:scale(.96)}
#mnp.ui8m button.ui8hot:not(#ui8x){border-color:rgba(255,207,90,.6)!important;box-shadow:0 0 0 1px rgba(255,207,90,.18) inset,0 0 10px rgba(255,190,80,.16)}
#mnp.ui8m button i .u58i{width:21px!important;height:21px!important;display:block}
#mnp.ui8m button>i{font-size:18px!important;margin:0!important;line-height:1!important;height:21px;display:flex!important;align-items:center;justify-content:center}
#mnp.ui8m button>i>.u58w{display:block;line-height:0}
#mnp.ui8m button>span{font-size:11.5px!important;line-height:1.15!important;max-width:100%!important;color:#f0e8d6!important;font-weight:700!important;-webkit-line-clamp:1!important;white-space:nowrap!important;display:block!important}
#mnp.ui8m button em.ui8d{display:block;font-style:normal;font-size:9.5px;line-height:1.2;color:#a99f8e;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 3px;font-weight:500}
#mnp.ui8m button em.ui8d.hot{color:#ffd47a;font-weight:700}
#mnp.ui8m button .bd{top:4px!important;right:5px!important}
#mnp.ui8m button .bd.ui8dot{font-size:0!important;min-width:0!important;width:9px!important;height:9px!important;padding:0!important;top:7px!important;right:8px!important;background:#ffcf5a!important;box-shadow:0 0 6px rgba(255,207,90,.9)}
#mnp.ui8m button .bd.ui8no{display:none!important}
#mnp.ui8m>small#mni{display:block;margin-top:6px;font-size:10px!important;text-align:center!important;color:#8f8676!important}
body:has(#mnp.ui8m:not([hidden])) #u64b,body:has(#mnp.ui8m:not([hidden])) #tipc{display:none!important}
/* ---- มาตรฐานแผง ---- */
.pn>.ph>div>small{display:-webkit-box!important;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.pn>.ph.ui8open>div>small{display:block!important;-webkit-line-clamp:unset}
.pn>.ph>div>small small{display:inline!important}
.pn>.ph>div>b .ui8i{display:inline-grid;place-items:center;width:19px;height:19px;margin-left:7px;border-radius:50%;font:700 11px/1 system-ui;font-style:normal;color:#e2c27a;border:1px solid rgba(216,176,96,.55);vertical-align:3px;cursor:pointer;background:rgba(216,176,96,.08)}
.pn>.ph.ui8open>div>b .ui8i{background:#e2c27a;color:#24170a}
.pn .card.hint{display:block!important;text-align:left!important;font-size:12px!important;line-height:1.6!important;padding:8px 11px 8px 31px!important;position:relative;border-color:rgba(216,176,96,.26)!important;background:linear-gradient(180deg,rgba(216,176,96,.075),rgba(216,176,96,.035))!important;color:#c9bfae!important}
.pn .card.hint::before{content:'💡';position:absolute;left:9px;top:8px;font-size:13px;line-height:1.5}
.pn .card.hint.ui8noi{padding-left:11px!important}.pn .card.hint.ui8noi::before{display:none}
.pn .card.hint.ui8cl .ui8ht{max-height:calc(1.6em * 2);overflow:hidden;-webkit-mask-image:linear-gradient(180deg,#000 55%,rgba(0,0,0,.25));mask-image:linear-gradient(180deg,#000 55%,rgba(0,0,0,.25))}
.pn .card.hint.ui8cl.ui8op .ui8ht{max-height:none;-webkit-mask-image:none;mask-image:none}
.pn .card.hint .ui8more{display:inline-block;margin-top:2px;color:#e2c27a;font-weight:700;font-size:11.5px;line-height:1.5;cursor:pointer}
.ui8c{display:inline-flex!important;align-items:center;gap:3px;padding:2px 7px;border-radius:999px;font:600 11px/1.45 system-ui;white-space:nowrap;background:rgba(140,170,255,.10);border:1px solid rgba(140,170,255,.18);color:#dfe6f5;margin:0}
.ui8c>i{font-style:normal;font-size:11px}
.ui8c.ok{background:rgba(120,198,124,.14);border-color:rgba(120,198,124,.4);color:#a8e6a8}
.ui8c.bad{background:rgba(224,100,90,.16);border-color:rgba(224,100,90,.45);color:#ffb0a6}
.ui8c.rec{background:rgba(255,207,90,.16);border-color:rgba(255,207,90,.5);color:#ffd47a}
.ui8c.rare{background:rgba(184,150,255,.16);border-color:rgba(184,150,255,.45);color:#d8c4ff}
.ui8c.gold{background:rgba(231,183,90,.14);border-color:rgba(231,183,90,.38);color:#f3d08a}
.ui8c.up{color:#7ae08a;border-color:rgba(122,224,138,.4);background:rgba(122,224,138,.1)}
.ui8c.dn{color:#ff8a80;border-color:rgba(255,138,128,.4);background:rgba(255,138,128,.1)}
.ui8c.eq{color:#c8c8d0}
.ui8row{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin-top:7px}
.ui8row.ui8cen{justify-content:center}
.ui8lab{font:700 11px/1.4 system-ui;color:#d8bd84;margin-right:1px}
.pn .ui8st{flex:0 0 auto;align-self:center;display:inline-flex;align-items:center;gap:3px;padding:5px 8px;border-radius:10px;font:700 11px/1.25 system-ui;text-align:center;max-width:92px;white-space:normal;color:#a99f8e;background:rgba(255,255,255,.04);border:1px dashed rgba(216,176,96,.28)}
.pn .ui8st.need{color:#ffb0a6;border-color:rgba(224,100,90,.45)}
.pn .ui8st.shop{color:#f3d08a;border-color:rgba(231,183,90,.45)}
.pn .ui8hide{display:none!important}
.pn details.ui8det{display:block}
.pn details.ui8det>summary{cursor:pointer;list-style:none;font:700 12px/1.5 system-ui;color:#e2c27a}
.pn details.ui8det>summary::-webkit-details-marker{display:none}
.pn details.ui8det>summary::after{content:' ▾';opacity:.8}
.pn details.ui8det[open]>summary::after{content:' ▴'}
.pn details.ui8det>small{display:block;margin-top:6px;color:#c9bfae;line-height:1.6}
.pn .ui8cap{font:700 11.5px/1.2 system-ui;color:#d8bd84;letter-spacing:.3px;margin:2px 2px -4px}
/* ดันเจี้ยน */
.pn .card.ui8dg{padding:10px 11px!important}
.pn .ui8dgh{display:flex;align-items:center;gap:9px}
.pn .ui8dgi{flex:0 0 36px;height:36px;display:grid;place-items:center;font-size:19px;border-radius:11px;background:rgba(140,170,255,.1);border:1px solid rgba(216,176,96,.22)}
.pn .ui8dgt{flex:1;min-width:0;display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px}
.pn .ui8dgt b{font:800 14px/1.3 system-ui;color:#f3e2b8;width:100%}
.pn .ui8dgh>button{flex:0 0 auto;padding:8px 12px!important;font-size:13px!important;border-radius:11px!important}
.pn button.ui8sec{background:linear-gradient(180deg,rgba(60,78,120,.55),rgba(26,34,58,.75))!important;border:1px solid rgba(231,183,90,.55)!important;color:#f3d08a!important;font-weight:700}
.pn button.ui8sec.ui8teal{border-color:rgba(64,214,196,.6)!important;color:#8ff0e2!important}
.pn .card.ui8dg.ui8rec{border-color:rgba(255,207,90,.55)!important;box-shadow:0 0 0 1px rgba(255,207,90,.15) inset,0 0 14px rgba(255,190,80,.10)}
.pn .card.ui8dg.ui8off{opacity:.62}
.pn .card.ui8dg.ui8raid{border-color:rgba(64,214,196,.45)!important;background:linear-gradient(180deg,rgba(40,180,170,.12),rgba(20,60,80,.18))!important}
.pn .card.ui8dg.ui8raid .ui8dgi{background:rgba(64,214,196,.14);border-color:rgba(64,214,196,.4)}
.pn .card.ui8dg details.ui8det{margin-top:8px}
/* ปาร์ตี้ว่าง */
.pn .ui8emp{text-align:center;padding:4px 2px 2px}
.pn .ui8emp .ui8empi{font-size:30px;line-height:1.2}
.pn .ui8emp>b{display:block;font:800 14px/1.4 system-ui;color:#f3e2b8;margin-bottom:6px}
.pn ol.ui8steps{list-style:none;counter-reset:s;margin:0 auto 2px;padding:0;text-align:left;max-width:300px;display:flex;flex-direction:column;gap:5px}
.pn ol.ui8steps li{counter-increment:s;position:relative;padding:4px 8px 4px 32px;font:500 12.5px/1.45 system-ui;color:#e6dfcf;background:rgba(140,170,255,.06);border-radius:10px}
.pn ol.ui8steps li::before{content:counter(s);position:absolute;left:7px;top:5px;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font:800 11px/1 system-ui;color:#24170a;background:#e2c27a}
/* อุปกรณ์ */
.pn .card.hint.ui8lgc{display:flex!important;flex-direction:column;gap:6px}
.pn .card.hint.ui8lgc .ui8row{margin-top:0}
.pn details.ui8sell{flex-basis:100%;font-size:11.5px;color:#b8ae9c}
.pn details.ui8sell>summary{cursor:pointer;color:#e2c27a;font-weight:700;list-style:none}
.pn details.ui8sell>summary::-webkit-details-marker{display:none}
/* แท็บตัวละคร */
.pn .tab .ui8tn{display:inline-block;margin-left:5px;min-width:18px;padding:0 5px;border-radius:9px;font:800 10.5px/17px system-ui;background:#e0645a;color:#fff;vertical-align:1px}
.pn .tab.on .ui8tn{background:#24170a;color:#ffd47a}
/* แถวรายการ (สัตว์ขี่) */
.pn .sr .nm small .ui8row{margin:3px 0 3px}
.pn .sr .nm small .ui8desc{display:block;color:#a99f8e;font-size:11.5px;line-height:1.45}
`;
function css(){if(document.getElementById('ui8css'))return;const st=document.createElement('style');st.id='ui8css';st.textContent=CSS;document.head.appendChild(st)}
const esc8=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
const chip=(ic,t,cl)=>'<span class="ui8c'+(cl?' '+cl:'')+'">'+(ic?'<i>'+ic+'</i>':'')+t+'</span>';
const fmtN=n=>{n=Number(n)||0;return n.toLocaleString('en-US')};
window.ui8chip=chip;

/* ================= ① เมนูหลัก ================= */
const SEC=[
  ['ตัวละคร','🧍',['tb','gb','cdm','rxm','mtm','ptm']],
  ['ผจญภัย','🗺️',['qb','dgm','wmm','byb','tmb','evm']],
  ['เพื่อนและกิลด์','🤝',['pb','frb','gdb','mlb','cb','ivm']],
  ['ชีวิตในค่าย','⛺',['tnm','fsm','gtm']],
  ['ระบบ','⚙️',['gqb','aum','wnb','chm','hdb','pfb','gmb']]];
const DESC={tb:'สเตตัส · สกิล · ดาว',gb:'สวมใส่ · กระเป๋า',cdm:'สะสมการ์ด',rxm:'คอมโบธาตุ',mtm:'ขี่แล้ววิ่งไว',ptm:'คู่หูติดตาม',
  qb:'เควสของฉัน',dgm:'ลงดันกับเพื่อน',wmm:'วาร์ปไปแมพ',byb:'ล่ามอนดัง',tmb:'ขุดหาสมบัติ',evm:'กิจกรรมพิเศษ',
  pb:'เล่นเป็นทีม',frb:'รายชื่อเพื่อน',gdb:'บ้านกิลด์',mlb:'จดหมายถึงคุณ',ivm:'ได้ของทั้งคู่',
  tnm:'บ้านของคุณ',fsm:'ปลา · อาหาร',gtm:'ขุดแร่ · ปรุงยา',
  gqb:'ภาพ · เสียง',aum:'ใช้สกิลให้เอง',wnb:'ของใหม่ในเกม',chm:'สลับตัวละคร',cb:'คุยกับทุกคน',hdb:'ภาพเมือง HD',pfb:'วัดความลื่น',gmb:'เฉพาะแอดมิน'};
const LABEL={tb:'ตัวละคร'};
function dyn(id){try{
  if(id==='tb'){const a=Math.max(0,spts()),b=Math.max(0,pts());let c=0;try{c=Math.max(0,astFree())}catch(e){}const n=a+b+c;return n>0?['มีแต้มเหลือ '+(n>999?'999+':n),1]:null}
  if(id==='gb')return['กระเป๋า '+me.bag.length+'/'+MAXBAG,me.bag.length>=MAXBAG?1:0];
  if(id==='cdm'){const o=CIDS.filter(i=>cStar(i)>0).length;return['สะสม '+o+'/'+CIDS.length,0]}
  if(id==='ptm')return['มีแล้ว '+(me.pets||[]).length+'/'+PT_N,0];
  if(id==='mtm'){const n=(me.mts||[]).length;return n?['มี '+n+' ตัว',0]:null}
  if(id==='qb'){if(qDone())return['ส่งเควสได้แล้ว!',1];return['รับแล้ว '+(me.qs||[]).length+'/'+QMAX,0]}
  if(id==='mlb')return MLN>0?['ยังไม่อ่าน '+MLN,1]:null;
  if(id==='frb'){const r=(FRIP||[]).length+((FRIW&&FRIW.n)|0);return r>0?['มีเรื่องใหม่ '+r,1]:null}
  if(id==='pb')return(typeof PTY!=='undefined'&&PTY&&PTY.mem)?['ทีม '+PTY.mem.length+'/'+PTMAX+' คน',0]:null;
  if(id==='gdb'){const G=typeof GDS!=='undefined'&&GDS&&GDS.g;return G&&G.tag?['กิลด์ ['+G.tag+']',0]:null}
  if(id==='aum')return[AUTO&&AUTO.on?'เปิดอยู่':'ปิดอยู่',0];
  if(id==='wnb')return typeof WNV!=='undefined'?['อัปเดต '+WNV,0]:null;
  if(id==='tmb'){if(typeof tmSt!=='function')return null;const n=tmSt().L.length;return n?['มี '+n+' ใบ',0]:null}
  if(id==='byb'){if(typeof btyBoard!=='function')return null;if(me.lv<15)return['เปิดที่ Lv 15',0];const L=btyBoard(),B=btySt(),n=L.filter(S=>B.cl[S.bid]).length;if(btyAllDone()&&!B.ch)return['รับหีบนักล่าได้!',1];return['วันนี้ '+n+'/'+L.length+' · 🎯'+B.c,0]}
}catch(e){}return null}
function tileOf(b){if(!b||b.id==='ui8x')return;let lab=b.querySelector(':scope>span');if(LABEL[b.id]&&lab&&lab.textContent!==LABEL[b.id])lab.textContent=LABEL[b.id];
  let em=b.querySelector(':scope>em.ui8d');if(!em){em=document.createElement('em');em.className='ui8d';const bd=b.querySelector(':scope>.bd');if(bd)b.insertBefore(em,bd);else b.appendChild(em)}
  const d=dyn(b.id),t=d?d[0]:(DESC[b.id]||''),hot=!!(d&&d[1]);if(em.textContent!==t)em.textContent=t;em.classList.toggle('hot',hot);b.classList.toggle('ui8hot',hot);
  const bd=b.querySelector(':scope>.bd');if(bd){bd.classList.toggle('ui8dot',b.id==='tb');bd.classList.toggle('ui8no',b.id==='gb'||b.id==='qb')}}
function vis(b){return b&&!b.hidden&&b.style.display!=='none'&&getComputedStyle(b).display!=='none'}
function build(){css();const M=$('mnp');if(!M)return;M.classList.add('ui8m');
  let top=M.querySelector(':scope>.ui8top');if(!top){top=document.createElement('div');top.className='ui8top';top.innerHTML='<b>เมนู</b><small></small><button id="ui8x" aria-label="ปิดเมนู">✕</button>';M.insertBefore(top,M.firstChild)}
  try{const s=top.querySelector('small'),t=(me&&me.cls&&CL[me.cls]?CL[me.cls].n+' · Lv '+me.lv:'');if(s.textContent!==t)s.textContent=t}catch(e){}
  const all=[...M.querySelectorAll('button')].filter(b=>b.id&&b.id!=='ui8x');const known=new Set();SEC.forEach(S=>S[2].forEach(i=>known.add(i)));
  const secs=SEC.concat([['อื่น ๆ','✨',all.filter(b=>!known.has(b.id)).map(b=>b.id)]]);
  let prev=top;const mni=$('mni');
  secs.forEach((S,si)=>{let el=M.querySelector(':scope>.ui8s[data-s="'+si+'"]');if(!el){el=document.createElement('div');el.className='ui8s';el.dataset.s=si;el.innerHTML='<div class="ui8h"><i>'+S[1]+'</i>'+S[0]+'</div><div class="ui8g"></div>'}
    el.classList.toggle('ui8sys',S[0]==='ระบบ');if(prev.nextSibling!==el)M.insertBefore(el,prev.nextSibling);prev=el;const gr=el.querySelector('.ui8g');let n=0;
    S[2].forEach(id=>{const b=$(id);if(!b||!M.contains(b))return;if(b.parentNode!==gr||gr.lastElementChild!==b)gr.appendChild(b);tileOf(b);if(vis(b))n++});el.hidden=n===0});
  M.querySelectorAll(':scope>hr.mns').forEach(h=>h.remove());if(mni&&mni.parentNode===M&&M.lastElementChild!==mni)M.appendChild(mni)}
window.ui8MenuBuild=build;
menuToggle=(f=>function(on){const r=f.apply(this,arguments);try{if(!$('mnp').hidden)build()}catch(e){console.warn('ui8 menu',e)}return r})(menuToggle);
setInterval(()=>{try{const M=$('mnp');if(M&&!M.hidden&&M.classList.contains('ui8m'))[...M.querySelectorAll('button')].forEach(tileOf)}catch(e){}},700);
setTimeout(()=>{try{build()}catch(e){}},1200);

/* ================= ② มาตรฐานแผง ================= */
const OPEN={};
function fixHead(P){const ph=P.querySelector(':scope>.ph'),sm=ph&&ph.querySelector(':scope>div>small'),b=ph&&ph.querySelector(':scope>div>b');if(!sm||!b||sm.dataset.ui8)return;sm.dataset.ui8=1;
  const k='h:'+(P.dataset.pn||'');if(OPEN[k])ph.classList.add('ui8open');
  const over=sm.scrollHeight>sm.clientHeight+3;if(!over&&!OPEN[k])return;if(b.querySelector('.ui8i'))return;
  const i=document.createElement('span');i.className='ui8i';i.setAttribute('role','button');i.setAttribute('tabindex','0');i.setAttribute('aria-label','ดูคำอธิบายเต็ม');i.textContent='i';i.dataset.k=k;b.appendChild(i)}
function fixHints(P){P.querySelectorAll('.card.hint').forEach((h,ix)=>{if(h.dataset.ui8)return;h.dataset.ui8=1;
  const fc=h.firstChild;if(fc&&fc.nodeType===3&&/^\s*💡\s*/.test(fc.nodeValue))fc.nodeValue=fc.nodeValue.replace(/^\s*💡\s*/,'');
  try{if(/^\s*\p{Extended_Pictographic}/u.test(h.textContent))h.classList.add('ui8noi')}catch(e){}
  if(h.classList.contains('ui8lgc'))return;
  const k='t:'+(P.dataset.pn||'')+':'+ix;if(h.scrollHeight<=74)return;const w=document.createElement('div');w.className='ui8ht';while(h.firstChild)w.appendChild(h.firstChild);h.appendChild(w);
  h.classList.add('ui8cl');if(OPEN[k])h.classList.add('ui8op');
  const m=document.createElement('span');m.className='ui8more';m.setAttribute('role','button');m.dataset.k=k;m.textContent=OPEN[k]?'ย่อ ▴':'อ่านต่อ ▾';h.appendChild(m)})}
function lockText(P,row,ix){const pn=P.dataset.pn;
  if(pn==='mount'){const M=MOUNTS[ix+1];if(M){if(me.lv<M.lv)return['ต้อง Lv '+M.lv,'need'];return[M.tw&&!M.g?'แลกที่คอก':'ซื้อที่คอก','shop']}}
  if(pn==='pet')return['ยังไม่มี · หาได้จากดรอป',''];
  if(pn==='card')return null;
  return['🔒 ยังไม่มี','']}
function fixLocks(P){const rows=[...P.querySelectorAll('.sr')];rows.forEach((r,ix)=>{const btn=r.querySelector(':scope>button[disabled]');if(!btn||btn.dataset.ui8||btn.textContent.trim()!=='🔒')return;btn.dataset.ui8=1;btn.classList.add('ui8hide');
  const L=lockText(P,r,ix);if(!L)return;const [t,cl]=L;const s=document.createElement('span');s.className='ui8st'+(cl?' '+cl:'');s.textContent=(cl==='need'?'🔒 ':cl==='shop'?'🛒 ':'')+t;r.insertBefore(s,btn)})}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.ui8i,.ui8more');if(!t)return;e.stopPropagation();e.preventDefault();const k=t.dataset.k;OPEN[k]=!OPEN[k];
  if(t.classList.contains('ui8i')){const ph=t.closest('.ph');if(ph)ph.classList.toggle('ui8open',!!OPEN[k])}else{const h=t.closest('.card.hint');if(h){h.classList.toggle('ui8op',!!OPEN[k]);t.textContent=OPEN[k]?'ย่อ ▴':'อ่านต่อ ▾'}}
  try{sfx('click')}catch(_){}},true);

/* ================= ③ รายหน้า ================= */
function fixDung(P){if(P.dataset.ui8dg)return;try{if(isDg())return}catch(e){return}const cards=[...P.querySelectorAll(':scope>.card')];const cD=cards.filter(c=>c.querySelector('[data-dgc]'));if(cD.length!==3)return;P.dataset.ui8dg=1;
  const cR=cards.find(c=>c.querySelector('[data-raidc]')),cJ=cards.find(c=>c.querySelector('#dgcode')),cH=cards.find(c=>c.classList.contains('hint')&&/กลไกบอส/.test(c.textContent));
  let rec=0;for(let i=1;i<=3;i++)if(me.lv>=DT[i].lv)rec=i;
  cD.forEach((c,idx)=>{const i=idx+1,D=DT[i],ok=me.lv>=D.lv,R=i===rec;
    c.className='card ui8dg'+(ok?'':' ui8off')+(R?' ui8rec':'');
    c.innerHTML='<div class="ui8dgh"><span class="ui8dgi">'+['⚔️','🔥','💀'][idx]+'</span><div class="ui8dgt"><b>'+esc8(D.n)+'</b>'+chip('',ok?'Lv '+D.lv+'+':'ต้อง Lv '+D.lv,ok?'ok':'bad')+(R?chip('⭐','แนะนำ','rec'):'')+'</div>'+
      '<button class="'+(R?'pri':'ui8sec')+'" data-dgc="'+i+'"'+(ok?'':' disabled')+'>'+(ok?'สร้างห้อง':'🔒 Lv '+D.lv)+'</button></div>'+
      '<div class="ui8row">'+chip('👾','มอน Lv '+D.L+'+')+chip('🌊',DW+' คลื่น + บอส')+chip('⏱',Math.round(D.tm/60)+' นาที (+'+Math.round(DGBOSS/60)+' ตอนบอส)')+'</div>'+
      '<div class="ui8row"><span class="ui8lab">รางวัล</span>'+chip('🪙',fmtN(D.gold),'gold')+chip('✨','EXP '+fmtN(D.exp))+chip('🎁','หีบอุปกรณ์')+(D.lg?chip('💎','Relic '+Math.round(D.lg*100)+'%','rare'):'')+'</div>'});
  const cap=document.createElement('div');cap.className='ui8cap';cap.textContent='🏚️ สุสานต้องสาป · เลือกระดับ';P.insertBefore(cap,cD[0]);
  if(cR){const D=DT[7],ok=me.lv>=D.lv;cR.removeAttribute('style');cR.className='card ui8dg ui8raid'+(ok?'':' ui8off');
    cR.innerHTML='<div class="ui8dgh"><span class="ui8dgi">🌊</span><div class="ui8dgt"><b>'+esc8(D.n)+'</b>'+chip('',ok?'Lv '+D.lv+'+':'ต้อง Lv '+D.lv,ok?'ok':'bad')+chip('👥','แนะนำ 4 คน')+'</div>'+
      '<button class="ui8sec ui8teal" data-raidc="1"'+(ok?'':' disabled')+'>'+(ok?'สร้างห้องเรด':'🔒 Lv '+D.lv)+'</button></div>'+
      '<div class="ui8row">'+chip('👑','บอสร่างจริงทันที')+chip('⏱',Math.round(D.tm*DGTX/60)+' นาที')+'</div>'+
      '<div class="ui8row"><span class="ui8lab">รางวัล</span>'+chip('🐚','เกล็ดห้วงลึก 4–7')+chip('💠','หัวใจห้วงลึก 30%','rare')+chip('🛡️','ชิ้นชุดเซ็ต 15%','rare')+chip('💎','Relic Lv 12','rare')+chip('🪙',fmtN(D.gold),'gold')+chip('✨','EXP '+fmtN(D.exp))+'</div>'+
      '<details class="ui8det"><summary>ท่าบอส · ใช้วัตถุดิบทำอะไร</summary><small>ท่าบอส: กางโล่เรียกผลึก · คำสาปห้วงลึกติดตัวผู้เล่น (ต้องวิ่งออกห่างเพื่อน) · น้ำท่วม · น้ำวน · หนวด<br>นำวัตถุดิบไปตีชุดเซ็ตที่ผู้พิทักษ์ศิลาจารึก (ซากนครจมบาดาล)</small></details>';
    const c2=document.createElement('div');c2.className='ui8cap';c2.textContent='🌊 เรด';P.insertBefore(c2,cR)}
  if(cJ){const j=cJ.querySelector('#dgjoin');if(j){j.classList.remove('pri');j.classList.add('ui8sec')}const cp=cJ.querySelector('.cap');if(cp)cp.textContent='🔑 มีรหัสห้องจากเพื่อน? ใส่แล้วกดเข้าร่วม'}
  if(cH){const d=document.createElement('details');d.className='card ui8det';d.innerHTML='<summary>💡 กลไกบอสผู้คุมสุสาน</summary><small>'+esc8(cH.textContent.replace(/^กลไกบอส:\s*/,''))+'</small>';cH.replaceWith(d)}}
function fixParty(P){P.querySelectorAll(':scope>.card').forEach(c=>{if(c.dataset.ui8)return;const sm=c.querySelector(':scope>small');if(!sm||!/ยังไม่มีปาร์ตี้/.test(sm.textContent))return;c.dataset.ui8=1;
  const mx=typeof PTMAX!=='undefined'?PTMAX:4;
  sm.outerHTML='<div class="ui8emp"><div class="ui8empi">👥</div><b>ยังไม่มีปาร์ตี้</b><ol class="ui8steps"><li>แตะที่ตัวผู้เล่นในแมพ หรือกด 👥 ในรายชื่อด้านล่าง</li><li>กด «เชิญปาร์ตี้» แล้วรอเพื่อนตอบรับ</li></ol>'+
    '<div class="ui8row ui8cen">'+chip('👥','สูงสุด '+mx+' คน')+chip('❤️','เห็นเลือดเพื่อนทุกแมพ')+chip('✨','อยู่ใกล้กัน EXP +10%/คน (สูงสุด +30%)','gold')+'</div></div>'})}
function fixGear(P){P.querySelectorAll('.card.hint').forEach(h=>{if(h.dataset.ui8g||!/▲/.test(h.textContent))return;h.dataset.ui8g=1;h.dataset.ui8=1;h.classList.add('ui8lgc');
    h.innerHTML='<span>แตะช่องอุปกรณ์หรือไอเทมในกระเป๋าเพื่อดูรายละเอียด</span><div class="ui8row">'+chip('▲','ดีกว่าที่ใส่อยู่','up')+chip('▼','แย่กว่า','dn')+chip('＝','เท่ากัน','eq')+'</div>'});
  P.querySelectorAll('span').forEach(s=>{if(s.dataset.ui8||!/^ขายเฉพาะของดรอป/.test(s.textContent.trim())||s.children.length)return;s.dataset.ui8=1;const d=document.createElement('details');d.className='ui8sell';d.innerHTML='<summary>ⓘ ขายอะไรบ้าง?</summary>'+esc8(s.textContent);s.replaceWith(d)})}
function fixChar(P){const tb=(k,n)=>{const t=P.querySelector('.tab[data-tab="char:'+k+'"]');if(!t)return;let e=t.querySelector('.ui8tn');if(n>0){if(!e){e=document.createElement('b');e.className='ui8tn';t.appendChild(e)}const s=n>999?'999+':String(n);if(e.textContent!==s)e.textContent=s}else if(e)e.remove()};
  try{tb('ab',Math.max(0,spts()));tb('tr',Math.max(0,pts()));let a=0;try{a=Math.max(0,astFree())}catch(e){}tb('st',me.lv>=99?a:0)}catch(e){}}
function fixMount(P){const rows=[...P.querySelectorAll('.sr')];rows.forEach((r,ix)=>{const sm=r.querySelector('.nm>small');const M=MOUNTS[ix+1];if(!sm||!M||sm.dataset.ui8)return;sm.dataset.ui8=1;const own=(me.mts||[]).includes(ix+1);
    const c=[chip('⚡','ความเร็ว +'+Math.round(M.sp*100)+'%','ok'),chip('',me.lv>=M.lv?'Lv '+M.lv+'+':'ต้อง Lv '+M.lv,me.lv>=M.lv?'':'bad')];
    if(!own){if(M.g)c.push(chip('🪙',fmtN(M.g),'gold'));if(M.tw)c.push(chip('🗼',M.tw+' เหรียญหอคอย','gold'));if(M.sc)c.push(chip('🐚',M.sc));if(M.hr)c.push(chip('💠',M.hr))}
    sm.innerHTML='<span class="ui8row">'+c.join('')+'</span><span class="ui8desc">'+esc8(M.d)+'</span>'})}
function fixCard(P){P.querySelectorAll('.sr .nm small').forEach(s=>{if(s.dataset.ui8)return;if(/^ยังไม่มี$/.test(s.textContent.trim())){s.dataset.ui8=1;s.innerHTML=chip('🔒','ยังไม่มี')}})}
function fixAll(){const P=ov&&!ov.hidden&&ov.querySelector('.pn');if(!P)return;const pn=P.dataset.pn||'';
  try{if(pn==='dung')fixDung(P);else if(pn==='party')fixParty(P);else if(pn==='gear')fixGear(P);else if(pn==='char')fixChar(P);else if(pn==='mount')fixMount(P);else if(pn==='card')fixCard(P)}catch(e){console.warn('ui8 '+pn,e)}
  try{fixHead(P)}catch(e){}try{fixHints(P)}catch(e){}try{fixLocks(P)}catch(e){}}
window.ui8Fix=fixAll;
let busy=false;const mo=new MutationObserver(()=>{if(busy)return;busy=true;try{css();fixAll()}catch(e){}finally{mo.takeRecords();busy=false}});
function arm(){if(typeof ov==='undefined'||!ov)return setTimeout(arm,500);mo.observe(ov,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']})}
arm();
/* การ์ด: ชื่อพลังที่ขาด (เดิมขึ้น «undefined +10%») */
try{if(typeof CEN==='object'){CEN.mp=CEN.mp||'มานาสูงสุด';CEN.sp=CEN.sp||'ความเร็วเคลื่อนที่'}}catch(e){}
})();
