/* ---------- v613 แผนที่โลกแบบ MMORPG (WMV) ----------
   · จอนอน: แผนที่ซ้าย (สูงเต็มจอ) · ข้อมูลแมพที่เลือกเป็นแผงขวา · จอตั้งเหมือนเดิม (แผนที่บน ข้อมูลล่าง)
   · แผงข้อมูลเพิ่ม «ในแมพนี้»: เนื้อเรื่องที่ต้องไปทำ · เควสพ่อค้า · ใบประกาศค่าหัว · เพื่อน/กิลด์ที่อยู่ในแมพ
     แต่ละอย่างมีปุ่ม 🧭 นำทาง (เดินไปทำอัตโนมัติ) · ปิด: WMV.off=1 */
const WMV={off:0};
function wmvCSS(){if(document.getElementById('wmvcss'))return;const s=document.createElement('style');s.id='wmvcss';s.textContent=
'@media (min-aspect-ratio:1/1){body #ov>.pn.wmpn.wmvp{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(250px,320px);grid-template-rows:auto auto minmax(0,1fr);column-gap:10px;row-gap:6px;column-count:auto!important;height:100%;max-height:100%;box-sizing:border-box}'+
'body #ov>.pn.wmvp>.ph{grid-column:1/-1}body #ov>.pn.wmvp>.wmlg{grid-column:1/-1}body #ov>.pn.wmvp>.note{grid-column:1/-1}'+
'body #ov>.pn.wmvp>.wmsc{grid-column:1;grid-row:3;max-height:none;height:auto;min-height:0;align-self:stretch}'+
'body #ov>.pn.wmvp>.wmd{grid-column:2;grid-row:3;align-self:start;max-height:100%;overflow-y:auto;box-sizing:border-box}}'+
'#ov .wmvq{display:flex;flex-direction:column;gap:5px;margin:8px 0 4px;padding-top:8px;border-top:1px solid rgba(231,183,90,.25)}#ov .wmvq>b{font-size:12.5px;color:#ffe2a6}'+
'#ov .wmvr{display:flex;align-items:center;gap:8px;font-size:12.5px;padding:5px 8px;border-radius:10px;background:rgba(0,0,0,.25)}#ov .wmvr span{flex:1;min-width:0;line-height:1.35}#ov .wmvr button{min-height:34px;padding:0 10px;border-radius:9px;font-size:12px;white-space:nowrap}'+
'#ov .wmvr.ok{opacity:.6}#ov .wmve{font-size:12px;opacity:.65}';
document.head.appendChild(s)}
function wmvRows(mp){const R=[];let qm=0;try{qm=wmQuestMap()}catch(e){}
  if(qm===mp){let t='';try{t=stTxt().replace(/<[^>]+>/g,' ')}catch(e){}const on=typeof AQ!=='undefined'&&AQ&&AQ.src==='st';R.push('<div class="wmvr"><span>📖 <b>เนื้อเรื่อง</b> · '+esc(t.slice(0,70))+'</span><button class="'+(on?'':'pri')+'" data-wmvn="st">'+(on?'⏹ หยุด':'🧭 นำทาง')+'</button></div>')}
  (me.qs||[]).forEach(q=>{if((q.mp|0)!==mp)return;const done=q.h>=q.n;R.push('<div class="wmvr'+(done?' ok':'')+'"><span>'+QI[q.t]+' '+qLine(q).replace(/<\/?(b|small)[^>]*>/g,' ')+'</span>'+(done?'<small style="color:#6fe0a0">✅ รับรางวัลที่พ่อค้า</small>':'<button class="pri" data-aq="'+q.id+'">🧭 นำทาง</button>')+'</div>')});
  try{if(me.lv>=BTYLV){const B=btySt();btyBoard().forEach(S=>{if(S.mp!==mp)return;const ok=!!B.cl[S.bid];R.push('<div class="wmvr'+(ok?' ok':'')+'"><span>🎯 ค่าหัว «'+esc(S.n)+'» '+'★'.repeat(S.st)+' · Lv '+S.L+'</span>'+(ok?'<small>✅</small>':'')+'</div>')})}}catch(e){}
  try{const F=friSt().L.filter(f=>friOn(f.n)&&FRIS[f.n]&&(FRIS[f.n].mp|0)===mp).map(f=>f.n);if(F.length)R.push('<div class="wmvr"><span>👥 เพื่อนอยู่ที่นี่: '+F.slice(0,4).map(esc).join(', ')+(F.length>4?' +'+(F.length-4):'')+'</span></div>')}catch(e){}
  try{const G=GDS.g;if(G){const M=G.mem.filter(m=>m[5]&&(m[6]|0)===mp&&m[0]!==G.me).map(m=>m[1]);if(M.length)R.push('<div class="wmvr"><span>🏰 กิลด์อยู่ที่นี่: '+M.slice(0,4).map(esc).join(', ')+(M.length>4?' +'+(M.length-4):'')+'</span></div>')}}catch(e){}
  return'<div class="wmvq"><b>ในแมพนี้</b>'+(R.length?R.join(''):'<div class="wmve">ไม่มีเควสหรือเพื่อนในแมพนี้ตอนนี้</div>')+'</div>'}
function wmvPost(){if(WMV.off||ov.dataset.k!=='wm')return;const P=ov.querySelector('.pn.wmpn');if(!P)return;wmvCSS();P.classList.add('wmvp');const D=P.querySelector('.wmd');if(!D||D.querySelector('.wmvq'))return;const mp=WMSEL|0;if(!mp)return;
  const anchor=D.querySelector('.wmdb');const h=wmvRows(mp);if(anchor)anchor.insertAdjacentHTML('afterend',h);else D.insertAdjacentHTML('beforeend',h)}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{if(WMV.off||ov.dataset.k!=='wm')return;const b=e.target.closest&&e.target.closest('[data-wmvn]');if(!b)return;e.stopPropagation();e.preventDefault();try{sfx('click')}catch(x){}
  if(typeof AQ!=='undefined'&&AQ&&AQ.src==='st'){aqStop('🧭 หยุดนำทางแล้ว');wmUI(WMSEL);return}aqStart('st')},true)}
setTimeout(()=>{try{const o=wmUI;window.wmUI=wmUI=function(){const r=o.apply(this,arguments);try{wmvPost()}catch(e){console.warn('wmv',e)}return r}}catch(e){console.warn('wmv',e)}},2400);
