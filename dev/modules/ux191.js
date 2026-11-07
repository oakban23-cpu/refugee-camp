/* ---------- v612 หน้าอุปกรณ์แบบ MMORPG (GWV) ----------
   จัดหน้าเดิมใหม่ (ปุ่ม/ระบบเดิมทุกอย่างอยู่ครบ):
   · แท็บ 🎒 อุปกรณ์ / 🧺 ของใช้ & วัตถุดิบ · ป้ายทอง + ช่องกระเป๋าด้านบน
   · จอนอน: ตัวละคร + ช่องสวมใส่ทางซ้าย (ค้างอยู่ตอนเลื่อน) · กระเป๋าทางขวา · จอตั้ง: เรียงบนลงล่าง
   · แตะไอเทม → แผงรายละเอียดเลื่อนขึ้นจากล่าง: เทียบกับชิ้นที่ใส่อยู่ (เห็นทั้งสองชิ้น) + ปุ่มสวมใส่/ล็อก/ขาย
   · แตะช่องที่ยังว่าง → กรองกระเป๋าเฉพาะของช่องนั้น · ขายอัตโนมัติพับเก็บเป็นแถบเดียว · ปิด: GWV.off=1 */
const GWV={off:0,t:'eq'};
function gwCSS(){if(document.getElementById('gwcss'))return;const s=document.createElement('style');s.id='gwcss';s.textContent=
'body #ov>.pn.gwp{display:block!important;column-count:auto!important}body #ov>.pn.gwp>*{column-span:none!important}'+
'#ov .gwtb{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 8px}#ov .gwtb .gwts{display:flex;gap:4px;padding:3px;border-radius:12px;background:rgba(0,0,0,.28)}'+
'#ov .gwtb .gwt{min-height:38px;padding:4px 14px;border-radius:9px;border:1px solid transparent;background:transparent;color:#cdbfa8;font-size:14px;font-weight:600}'+
'#ov .gwtb .gwt.on{background:linear-gradient(180deg,#ffe7a6,#ebbd5c 52%,#c18a30);color:#24170a;border-color:#8a6420}'+
'#ov .gwtb .gwch{display:flex;gap:6px;margin-left:auto;font-size:13px}#ov .gwtb .gwch span{padding:4px 10px;border-radius:999px;background:rgba(0,0,0,.28);border:1px solid rgba(231,183,90,.22);white-space:nowrap}#ov .gwtb .gwch b{color:#ffd27a}#ov .gwtb .gwch .full b{color:#ff9d8a}'+
'#ov .gwg{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:10px;align-items:start}#ov .gwg>.card{margin:0!important}'+
'#ov .gwg>.gwl{position:sticky;top:0;display:flex;flex-direction:column;gap:8px}#ov .gwl>.card{margin:0!important}'+
'#ov .gwtot{font-size:12px;opacity:.85;line-height:1.5;padding:6px 10px;border-radius:10px;background:rgba(0,0,0,.25)}'+
'#ov .gwleg{font-size:11px;opacity:.75;font-weight:400;margin-left:6px}'+
'#ov details.gwas{margin:2px 0 8px;border-radius:10px;border:1px dashed rgba(255,216,140,.3);background:rgba(255,216,140,.05)}#ov details.gwas>summary{cursor:pointer;padding:7px 10px;font-size:12.5px;list-style:none}#ov details.gwas>summary::-webkit-details-marker{display:none}#ov details.gwas>div{margin:0 8px 8px!important;border:0!important;background:none!important;padding:0!important}'+
'body:has(.gwsh) #ovx{display:none!important}'+
'.gwsh{position:fixed;inset:0;z-index:9000;display:flex;flex-direction:column;justify-content:flex-end}.gwsh .gwbk{position:absolute;inset:0;background:rgba(0,0,0,.55)}'+
'.gwsh .gwbd{position:relative;max-height:88vh;overflow-y:auto;width:min(100%,760px);margin:0 auto;box-sizing:border-box;padding:10px 14px calc(12px + env(safe-area-inset-bottom));background:#1a120d;border-top:2px solid #e7b75a;border-radius:18px 18px 0 0;box-shadow:0 -12px 30px rgba(0,0,0,.6);color:#f3e6cf;text-align:left}'+
'.gwsh .gwhd{display:flex;align-items:center;gap:8px;margin-bottom:6px}.gwsh .gwhd b{flex:1;font-size:14px;color:#ffe2a6}.gwsh .gwx{width:40px;height:40px;border-radius:50%!important;padding:0!important}'+
'.gwsh .card.det{margin:0!important;background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important}'+
'.gwsh .det .bt{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.gwsh .det .bt button{flex:1 1 120px;min-height:46px;border-radius:12px;font-size:14px}'+
'.gwsh .gwcmp{display:flex;align-items:center;gap:10px;padding:8px 10px;margin:0 0 8px;border-radius:12px;background:rgba(0,0,0,.35);border:1px solid rgba(231,183,90,.2);font-size:12.5px}.gwsh .gwcmp .cell{width:42px;height:42px;flex:0 0 42px}.gwsh .gwcmp b{display:block}'+
'.gwsh .gwvs{font-size:11px;font-weight:700;color:#e7b75a;letter-spacing:1px}'+
'@media (min-aspect-ratio:1/1){#ov .gwl .grid.g5{grid-template-columns:repeat(5,minmax(0,1fr))}}'+
'@media (max-aspect-ratio:1/1){#ov .gwg{grid-template-columns:minmax(0,1fr)}#ov .gwg>.gwl{position:static}}'+
'@media (max-height:480px) and (min-aspect-ratio:1/1){#ov .gwg>.gwl{position:static}.gwsh .gwbd{max-height:96vh;padding-top:6px}}';
document.head.appendChild(s)}
function gwPost(){if(GWV.off)return;const P=ov.querySelector('.pn[data-pn="gear"]');if(!P||P.querySelector('.gwtb'))return;gwCSS();P.classList.add('gwp');
  const C=[...P.children].filter(c=>c.classList&&c.classList.contains('card'));
  const eqC=C.find(c=>c.querySelector('[data-gp^="eq:"]')),det=C.find(c=>c.classList.contains('det')),bagC=C.find(c=>c.querySelector('[data-gs]')),
    goods=C.find(c=>{const q=c.querySelector('.cap');return q&&/ของใช้/.test(q.textContent)}),hints=C.filter(c=>c.classList.contains('hint')&&!c.classList.contains('det'));
  if(!eqC||!bagC)return;
  /* แถบแท็บ */const tb=document.createElement('div');tb.className='gwtb';const full=me.bag.length>=MAXBAG;
  tb.innerHTML='<div class="gwts"><button class="gwt'+(GWV.t==='eq'?' on':'')+'" data-gwt="eq">🎒 อุปกรณ์</button>'+(goods?'<button class="gwt'+(GWV.t==='goods'?' on':'')+'" data-gwt="goods">🧺 ของใช้ & วัตถุดิบ</button>':'')+'</div><div class="gwch"><span>🪙 <b>'+fmtG(me.gold)+'</b></span><span class="'+(full?'full':'')+'">กระเป๋า <b>'+me.bag.length+'/'+MAXBAG+'</b></span></div>';
  const ph=P.querySelector(':scope>.ph'),note=P.querySelector(':scope>.note');(note||ph).after(tb);
  /* โบนัสรวม + คำอธิบายลูกศร */let tot=null;hints.forEach(h=>{if(/โบนัสรวม/.test(h.textContent)){tot=h;tot.className='gwtot'}else h.remove()});
  const cap=bagC.querySelector('.cap>span');if(cap)cap.insertAdjacentHTML('beforeend','<span class="gwleg">'+UP+' ดีกว่า · '+DN+' แย่กว่า</span>');
  /* ขายอัตโนมัติ → พับเก็บ */const asl=bagC.querySelector('[data-asl="on"]');if(asl){const box=asl.parentElement,A=aslGet(),d=document.createElement('details');d.className='gwas';if(GWV.aso)d.open=true;d.ontoggle=()=>{GWV.aso=d.open};
    d.innerHTML='<summary>⚙️ ขายอัตโนมัติตอนเก็บของ: <b style="color:'+(A.on?'#8ad08a':'#cdbfa8')+'">'+(A.on?'เปิด (ถึง '+ASLN[A.k]+')':'ปิด')+'</b> ▾</summary>';box.before(d);d.appendChild(box)}
  /* วางผัง */const gg=document.createElement('div');gg.className='gwg';const L=document.createElement('div');L.className='gwl';
  if(GWV.t==='goods'&&goods){tb.after(goods);[eqC,bagC,tot].forEach(e=>e&&e.remove())}
  else{tb.after(gg);gg.appendChild(L);L.appendChild(eqC);if(tot)L.appendChild(tot);gg.appendChild(bagC);if(goods)goods.remove();
    C.forEach(c=>{if(c!==eqC&&c!==bagC&&c!==det&&c!==goods&&c!==tot&&!hints.includes(c)&&c.parentElement===P)L.appendChild(c)})}
  /* รายละเอียด → แผงล่าง */if(det){const sh=document.createElement('div');sh.className='gwsh';let cmp='';
    try{const[w,k]=(gsel||'').split(':');if(w==='bag'){const it=me.bag[+k],cur=it&&me.eq[it.sl];cmp=cur?'<div class="gwcmp"><span class="gwvs">ใส่อยู่</span>'+cellH(cur,'disabled',0,cur.sl)+'<div style="min-width:0"><b style="color:'+RCL[cur.r]+'">'+itemName(cur)+'</b><small>'+Object.keys(cur.st).map(q=>stLabel(q,eff(cur,q))).join(' · ')+'</small></div></div>':'<div class="gwcmp"><span class="gwvs">ช่อง'+SLN[it.sl]+'ยังว่าง</span><small>ใส่แล้วได้ค่าทั้งหมดเพิ่มทันที</small></div>'}}catch(e){}
    sh.innerHTML='<div class="gwbk" data-gwx="1"></div><div class="gwbd"><div class="gwhd"><b>รายละเอียดไอเทม</b><button class="gwx" data-gwx="1" aria-label="ปิด">✕</button></div>'+cmp+'</div>';P.appendChild(sh);sh.querySelector('.gwbd').appendChild(det);
    if(GWV.t==='goods')sh.remove()}}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{if(GWV.off||!me.cls||ov.dataset.k!=='gear')return;const b=e.target.closest&&e.target.closest('[data-gwt],[data-gwx],[data-gp^="eq:"]');if(!b)return;
  if(b.dataset.gp){const sl=b.dataset.gp.slice(3);if(me.eq[sl])return;e.stopPropagation();e.preventDefault();gearSel=sl;gsel=null;GWV.t='eq';try{sfx('click')}catch(x){}gearUI();return}
  e.stopPropagation();e.preventDefault();try{sfx('click')}catch(x){}if(b.dataset.gwt){GWV.t=b.dataset.gwt;gsel=null}else gsel=null;const st=ov.scrollTop;gearUI();ov.scrollTop=st},true)}
/* หน้าที่จัดผัง 2 คอลัมน์เอง (อุปกรณ์/สเตตัส/สกิล) → ให้หน้าต่างกว้างแบบ pn2 บนจอนอนเสมอ ไม่ใช้คอลัมน์อัตโนมัติ */
setTimeout(()=>{try{const _pl=pnLay;window.pnLay=pnLay=function(){const r=_pl.apply(this,arguments);try{const P=ov.firstElementChild;if(P&&P.classList&&(P.classList.contains('gwp')||P.classList.contains('swsp')||P.classList.contains('skwp'))&&!ov.hidden){P.classList.remove('pn2c');if(innerWidth>innerHeight*1.05){P.classList.add('pn2');if(ov.clientWidth<700)P.classList.remove('pn2')}else P.classList.remove('pn2')}}catch(e){}return r}}catch(e){console.warn('gw',e)}},2400);
setTimeout(()=>{try{const o=gearUI;window.gearUI=gearUI=function(){const r=o.apply(this,arguments);try{gwPost()}catch(e){console.warn('gw',e)}return r}}catch(e){console.warn('gw',e)}},2400);
