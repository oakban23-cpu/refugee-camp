/* ---------- v613 ช่างตีบวกแบบ MMORPG (FGV) ----------
   · จอนอน: ซ้าย = เลือกของ (สวมใส่อยู่/กระเป๋า) · ขวา = แท่นตีบวก (ค้างอยู่ตอนเลื่อน) · จอตั้ง: แท่นตีบวกอยู่บน
   · แท่นตีบวก: +u ➜ +u+1 ตัวใหญ่ · ค่าที่จะได้ก่อน/หลัง · หลอดโอกาสสำเร็จสีตามความเสี่ยง (รวมไฟเตาแล้ว)
     · ของที่ต้องใช้เป็นชิป มี/ต้องใช้ (แดงถ้าไม่พอ) · ถ้าล้มเหลวเป็นอย่างไร · ปุ่มหินกันแตก + ปุ่มตีบวกใหญ่
   · ไฟเตา/ตีด่วน/สถิติ และซื้อหินอยู่ใต้แท่น · กติกาพับเก็บ · ปิด: FGV.off=1 */
const FGV={off:0};
function fgvCSS(){if(document.getElementById('fgvcss'))return;const s=document.createElement('style');s.id='fgvcss';s.textContent=
'body #ov>.pn.fgvp{display:block!important;column-count:auto!important}body #ov>.pn.fgvp>*{column-span:none!important}'+
'#ov .fgvg{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:10px;align-items:start}#ov .fgvg .card{margin:0 0 8px!important}'+
'#ov .fgvr{position:sticky;top:0;order:2}#ov .fgvl{order:1}'+
'#ov .fgvl .grid.g5{grid-template-columns:repeat(auto-fill,minmax(54px,1fr))!important}'+
'#ov .fgp{display:flex;flex-direction:column;gap:8px;padding:12px!important;border:1px solid rgba(231,183,90,.5)!important;background:radial-gradient(120% 140px at 50% 0,rgba(255,150,60,.16),transparent),rgba(0,0,0,.28)!important}'+
'#ov .fgp .fgh{display:flex;align-items:center;gap:10px}#ov .fgp .fgh .cell{width:56px!important;height:56px!important;flex:0 0 56px}#ov .fgp .fgh b{display:block;font-size:15px}#ov .fgp .fgh small{font-size:12px;opacity:.8}'+
'#ov .fgp .fgu{display:flex;align-items:center;justify-content:center;gap:14px;font-size:26px;font-weight:800;color:#ffe2a6;text-shadow:0 2px 0 rgba(0,0,0,.4)}#ov .fgp .fgu i{font-style:normal;font-size:18px;opacity:.7}#ov .fgp .fgu .nx{color:#6fe0a0}'+
'#ov .fgp .fgs{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;font-size:13px}#ov .fgp .fgs span:nth-child(odd){opacity:.75}#ov .fgp .fgs b{color:#6fe0a0}'+
'#ov .fgga{position:relative;height:26px;border-radius:13px;background:rgba(255,255,255,.08);overflow:hidden;border:1px solid rgba(255,255,255,.12)}#ov .fgga i{position:absolute;inset:0 auto 0 0;border-radius:13px}#ov .fgga b{position:relative;display:block;text-align:center;line-height:26px;font-size:14px;text-shadow:0 1px 2px rgba(0,0,0,.8)}'+
'#ov .fgp .fgx{font-size:11.5px;opacity:.8;text-align:center}'+
'#ov .fgp .fgr2{display:flex;gap:6px;flex-wrap:wrap}#ov .fgp .fgr2 span{padding:4px 10px;border-radius:999px;font-size:12.5px;background:rgba(0,0,0,.35);border:1px solid rgba(111,224,160,.5)}#ov .fgp .fgr2 span.no{border-color:rgba(255,120,100,.7);color:#ff9d8a}'+
'#ov .fgp .fgf{font-size:12.5px}#ov .fgp .fgf.bad{color:#ff9d8a}'+
'#ov .fgp [data-smu]{width:100%;min-height:54px;font-size:17px!important;font-weight:800;border-radius:14px!important}#ov .fgp .sr{margin:0!important}'+
'#ov details.fgvd{margin:0 0 8px;border-radius:12px;border:1px dashed rgba(255,216,140,.3);background:rgba(255,216,140,.04)}#ov details.fgvd>summary{cursor:pointer;padding:9px 12px;font-size:13px;list-style:none}#ov details.fgvd>summary::-webkit-details-marker{display:none}#ov details.fgvd>.card{margin:0 6px 6px!important;border:0!important;background:none!important}'+
'@media (max-aspect-ratio:1/1){#ov .fgvg{grid-template-columns:minmax(0,1fr)}#ov .fgvr{position:static;order:1}#ov .fgvl{order:2}}';
document.head.appendChild(s)}
function fgvPanel(it){const u=it.u|0,el=upElig(it),need=upNeed(u),cost=upCost(it),inv=me.inv,have=need?(inv['s'+need]|0):0;let rate=upRate(u),ex='';
  try{if(u>=5&&!el){rate=fgRate(u,0);ex='กดจังหวะดีในเตาหลอม '+Math.round(fgRate(u,.1)*100)+'% · เป๊ะ '+Math.round(fgRate(u,.2)*100)+'%'}}catch(e){}
  const pc=Math.round(rate*100),col=pc>=70?'linear-gradient(90deg,#2f9a4a,#6fe0a0)':pc>=35?'linear-gradient(90deg,#c18a30,#ffd27a)':'linear-gradient(90deg,#a02a20,#ff8a7a)';
  let h='<div class="card fgp"><div class="fgh">'+cellH(it,'disabled',0,it.sl)+'<div style="min-width:0"><b'+(it.r===6?' class="tc6"':'')+' style="color:'+RC[it.r]+'">'+itemName(it)+'</b><small>'+RN[it.r]+(it.ss?' · 🔱 ชุดเซ็ต':'')+'</small></div></div>';
  if(el)return h+'<div class="note" style="margin:0">'+el+'</div></div>';
  h+='<div class="fgu"><span>+'+u+'</span><i>➜</i><span class="nx">+'+(u+1)+'</span></div>';
  h+='<div class="fgs">'+Object.keys(it.st).map(k=>'<span>'+stLabel(k,it.st[k]*upMul(u))+'</span><b>➜ '+stLabel(k,it.st[k]*upMul(u+1))+'</b>').join('')+'</div>';
  h+='<div class="fgga"><i style="width:'+pc+'%;background:'+col+'"></i><b>🎯 โอกาสสำเร็จ '+pc+'%</b></div>'+(ex?'<div class="fgx">'+ex+'</div>':'');
  h+='<div class="fgr2"><span class="'+(me.gold>=cost?'':'no')+'">💰 '+fmtG(cost)+' <small>(มี '+fmtG(me.gold)+')</small></span>'+(need?'<span class="'+(have>=1?'':'no')+'">'+stoneIc(need)+' '+GDM['s'+need].n+' '+have+'/1</span>':'')+'</div>';
  h+='<div class="fgf'+(u>=10?' bad':'')+'">❌ ถ้าล้มเหลว: '+upFail(u)+'</div><div class="fgslot"></div></div>';return h}
function fgvPost(){if(FGV.off)return;const P=ov.querySelector('.pn[data-pn="smith"]');if(!P||P.querySelector('.fgvg'))return;fgvCSS();P.classList.add('fgvp');
  const C=[...P.querySelectorAll(':scope>.card')],cap=c=>{const q=c.querySelector('.cap');return q?q.textContent:''};
  const sel=C.find(c=>/ไอเทมที่เลือก/.test(cap(c))),hint=C.find(c=>c.classList.contains('hint')&&/เลือกอุปกรณ์/.test(c.textContent)),heat=C.find(c=>/เตาหลอม/.test(cap(c))),eq=C.find(c=>/สวมใส่อยู่/.test(cap(c))),bag=C.find(c=>/ในกระเป๋า/.test(cap(c))),buy=C.find(c=>/ซื้อหิน/.test(cap(c))),rule=C.find(c=>/กติกาการตีบวก/.test(c.textContent)&&c.classList.contains('hint'));
  if(!eq&&!bag)return;const g=document.createElement('div');g.className='fgvg';const L=document.createElement('div');L.className='fgvl';const R=document.createElement('div');R.className='fgvr';
  const first=sel||hint||heat||eq;first.before(g);g.appendChild(L);g.appendChild(R);
  const it=smGet(smSel);
  if(sel&&it){const tmp=document.createElement('div');tmp.innerHTML=fgvPanel(it);const pnl=tmp.firstElementChild,slot=pnl.querySelector('.fgslot');const pr=sel.querySelector('[data-smp]'),bt=sel.querySelector('[data-smu]');if(pr)slot.appendChild(pr.closest('.sr')||pr);if(bt)slot.appendChild(bt);R.appendChild(pnl);sel.remove()}
  else if(hint){hint.innerHTML='🔨 <b>เลือกอุปกรณ์ที่จะตีบวก</b><br><small>แตะไอเทมจาก «สวมใส่อยู่» หรือ «ในกระเป๋า»</small>';R.appendChild(hint)}
  if(heat){const d=document.createElement('details');d.className='fgvd';d.open=!!FGV.ho;d.ontoggle=()=>{FGV.ho=d.open};let q='';try{q=FG.quick?' · ⚡ ตีด่วนเปิด':''}catch(e){}d.innerHTML='<summary>🔥 ไฟเตา · ตีด่วน · สถิติ'+q+' ▾</summary>';d.appendChild(heat);R.appendChild(d)}
  if(buy)R.appendChild(buy);if(eq)L.appendChild(eq);if(bag)L.appendChild(bag);
  if(rule){const d=document.createElement('details');d.className='fgvd';d.innerHTML='<summary>📖 กติกาการตีบวก ▾</summary>';d.appendChild(rule);R.appendChild(d)}
  [...P.querySelectorAll(':scope>.card')].forEach(c=>L.appendChild(c))}
setTimeout(()=>{try{const o=smithUI;window.smithUI=smithUI=function(){const st=ov.scrollTop,r=o.apply(this,arguments);try{fgvPost()}catch(e){console.warn('fgv',e)}return r}}catch(e){console.warn('fgv',e)}},2400);
