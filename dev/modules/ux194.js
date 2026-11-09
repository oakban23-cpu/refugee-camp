/* ---------- v613 ร้านค้าแบบ MMORPG (SHV) ----------
   · แท็บอุปกรณ์: ช่องสินค้าขนาดพอดี มีราคาใต้ช่อง · แตะสินค้า → แผงล่างเทียบกับชิ้นที่ใส่อยู่ + ปุ่มซื้อ
   · แท็บใหม่ 💰 ขายของ: เลือกหลายชิ้นแล้วขายทีเดียว · ปุ่มลัด «เลือกที่แย่กว่าที่ใส่อยู่» / «เลือกถึงระดับ …»
     ของล็อก 🔒 ไม่ถูกเลือก · ขายของระดับ Mystic ขึ้นไปหรือ 10 ชิ้นขึ้นไปต้องแตะยืนยันอีกครั้ง · ปิด: SHV.off=1 */
const SHV={off:0,s:new Set(),cf:0};
function shvCSS(){gwCSS();if(document.getElementById('shvcss'))return;const s=document.createElement('style');s.id='shvcss';s.textContent=
'#ov .pn[data-pn="shop"] .shvg{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:8px}'+
'#ov .shvc{display:flex;flex-direction:column;align-items:center;gap:3px}#ov .shvc .cell{width:100%!important;height:auto!important;aspect-ratio:1/1;max-width:86px}'+
'#ov .shvc small{font-size:11.5px;font-weight:700;color:#ffd27a;white-space:nowrap}#ov .shvc small.no{color:#ff9d8a}'+
'#ov .shvq{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 8px}#ov .shvq button{min-height:36px;padding:3px 10px;border-radius:9px;font-size:12.5px}'+
'#ov .shvbar{position:sticky;bottom:-12px;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 12px;margin-top:8px;border-radius:14px;background:#2a1d14;border:1px solid #e7b75a;box-shadow:0 -6px 18px rgba(0,0,0,.5)}'+
'#ov .shvbar .tx{flex:1;font-size:13px;line-height:1.4}#ov .shvbar .tx b{color:#ffd27a;font-size:16px}#ov .shvbar button{min-height:48px;padding:0 20px;border-radius:12px;font-size:15px;font-weight:700}'+
'#ov .shvbar button.cf{background:#8a2a20!important;color:#fff!important;border-color:#c04a3a!important}'+
'#ov .shvc .cell.shon{box-shadow:0 0 0 3px #6fe0a0,0 0 12px rgba(111,224,160,.5)!important}#ov .shvc .tick{position:absolute;top:2px;left:4px;font-size:14px}';
document.head.appendChild(s)}
function shvArrow(it){const d=gCmp(it).dir;return d>0?UP:d<0?DN:'<span style="opacity:.6">＝</span>'}
function shvGearPost(P){const g=P.querySelector('.grid.g5');if(!g)return;const stock=stk();g.className='shvg';
  [...g.children].forEach(b=>{const i=b.dataset&&b.dataset.sp;if(i===undefined)return;const it=stock[+i];if(!it)return;const pr=sellPrice(it)*3,w=document.createElement('div');w.className='shvc';b.before(w);w.appendChild(b);w.insertAdjacentHTML('beforeend','<small class="'+(me.gold>=pr?'':'no')+'">🪙 '+fmtG(pr)+'</small>')});
  const cap=P.querySelector('.cap');if(cap&&/ราคาแสดง/.test(cap.textContent))cap.innerHTML='<span>สินค้าวันนี้ <span class="gwleg">'+UP+' ดีกว่าที่ใส่อยู่ · '+DN+' แย่กว่า</span></span>';
  const det=P.querySelector('.card.det');[...P.querySelectorAll(':scope>.card.hint')].forEach(h=>h.remove());
  if(det){const it=stock[shopSel];let cmp='';if(it){const cur=me.eq[it.sl];cmp=cur?'<div class="gwcmp"><span class="gwvs">ใส่อยู่</span>'+cellH(cur,'disabled',0,cur.sl)+'<div style="min-width:0"><b style="color:'+RCL[cur.r]+'">'+itemName(cur)+'</b><small>'+Object.keys(cur.st).map(q=>stLabel(q,eff(cur,q))).join(' · ')+'</small></div></div>':'<div class="gwcmp"><span class="gwvs">ช่อง'+SLN[it.sl]+'ยังว่าง</span><small>ซื้อแล้วใส่ได้ค่าเพิ่มทันที</small></div>'}
    const sh=document.createElement('div');sh.className='gwsh';sh.innerHTML='<div class="gwbk" data-shx="1"></div><div class="gwbd"><div class="gwhd"><b>รายละเอียดสินค้า</b><button class="gwx" data-shx="1" aria-label="ปิด">✕</button></div>'+cmp+'</div>';P.appendChild(sh);sh.querySelector('.gwbd').appendChild(det)}}
function shvSellH(){const B=me.bag;for(const it of [...SHV.s])if(B.indexOf(it)<0||it.lk)SHV.s.delete(it);let n=0,g=0,hi=0;B.forEach(it=>{if(SHV.s.has(it)){n++;g+=sellPrice(it);if(it.r>=3)hi++}});
  let h='<div class="card"><div class="cap"><span>ขายของจากกระเป๋า <span class="gwleg">แตะเพื่อเลือก · '+UP+' ดีกว่า '+DN+' แย่กว่าที่ใส่อยู่ · 🔒 ของล็อกขายไม่ได้</span></span></div>';
  h+='<div class="shvq"><button data-shq="worse">⬇️ เลือกที่แย่กว่าที่ใส่อยู่</button>'+[0,1,2,3].map(r=>'<button data-shq="r'+r+'" style="border-color:'+RCL[r]+'">ถึงระดับ '+RN[r].split(' · ')[0]+'</button>').join('')+'<button data-shq="all">เลือกทั้งหมด</button><button data-shq="clr">ล้าง</button></div>';
  h+=B.length?'<div class="shvg">'+B.map((it,i)=>{const on=SHV.s.has(it);return'<div class="shvc" style="position:relative">'+cellH(it,'data-shs="'+i+'"'+(it.lk?' disabled':''),0,it.sl,shvArrow(it)).replace('class="cell','class="cell'+(on?' shon':''))+(on?'<span class="tick">✅</span>':'')+'<small>🪙 '+fmtG(sellPrice(it))+'</small></div>'}).join('')+'</div>':'<small>กระเป๋าว่าง</small>';
  h+='<div class="shvbar"><div class="tx">เลือก <b>'+n+'</b> ชิ้น · ได้ <b>🪙 '+fmtG(g)+'</b>'+(hi?'<br><small style="color:#ff9d8a">มีของระดับ Mystic ขึ้นไป '+hi+' ชิ้น</small>':'')+'</div><button class="pri'+(SHV.cf?' cf':'')+'" data-shsell="1"'+(n?'':' disabled')+'>'+(SHV.cf?'⚠️ แตะอีกครั้งเพื่อยืนยัน':'💰 ขาย '+n+' ชิ้น')+'</button></div></div>';return h}
function shvSellUI(msg){const keep=shopTab;shopTab='pot';const o=SHV.o;o(msg);shopTab=keep;const P=ov.querySelector('.pn[data-pn="shop"]');if(!P)return;
  const tb=P.querySelector('.tabs');[...P.children].forEach(c=>{if(c!==tb&&!c.classList.contains('ph')&&!c.classList.contains('note'))c.remove()});shvTab(P);
  tb.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.tab==='shop:sell'));tb.insertAdjacentHTML('afterend',shvSellH())}
function shvTab(P){const tb=P.querySelector('.tabs');if(!tb||tb.querySelector('[data-tab="shop:sell"]'))return;const q=tb.querySelector('[data-tab="shop:q"]');const b=document.createElement('button');b.className='tab';b.dataset.tab='shop:sell';b.textContent='💰 ขายของ';if(q)q.before(b);else tb.appendChild(b)}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{if(SHV.off||!me.cls)return;const P=ov.querySelector('.pn[data-pn="shop"]');if(!P)return;const b=e.target.closest&&e.target.closest('[data-shx],[data-shs],[data-shq],[data-shsell]');if(!b)return;e.stopPropagation();e.preventDefault();if(b.disabled)return;const d=b.dataset,st=ov.scrollTop;
  if(d.shx){shopSel=-1;try{sfx('click')}catch(x){}shopUI();return}
  if(d.shs!==undefined){const it=me.bag[+d.shs];if(!it||it.lk)return;SHV.s.has(it)?SHV.s.delete(it):SHV.s.add(it);SHV.cf=0;try{sfx('click')}catch(x){}shopUI();ov.scrollTop=st;return}
  if(d.shq){const q=d.shq;SHV.cf=0;if(q==='clr')SHV.s.clear();else me.bag.forEach(it=>{if(it.lk)return;let ok=q==='all';if(q==='worse')ok=!!me.eq[it.sl]&&gCmp(it).dir<0&&it.r<4;if(q[0]==='r')ok=it.r<=+q.slice(1);if(ok)SHV.s.add(it)});try{sfx('click')}catch(x){}shopUI();ov.scrollTop=st;return}
  if(d.shsell){const L=me.bag.filter(it=>SHV.s.has(it)&&!it.lk);if(!L.length)return;if(!SHV.cf&&(L.length>=10||L.some(it=>it.r>=3))){SHV.cf=1;shopUI();ov.scrollTop=st;return}
    let g=0;for(const it of L){g+=sellPrice(it);const i=me.bag.indexOf(it);if(i>=0)me.bag.splice(i,1)}me.gold=Math.min(GMAX,me.gold+g);SHV.s.clear();SHV.cf=0;gsel=null;try{sfx('item')}catch(x){}shopUI('💰 ขาย '+L.length+' ชิ้น ได้ '+fmtG(g)+' ทอง');return}},true)}
setTimeout(()=>{try{const o=shopUI;SHV.o=o;window.shopUI=shopUI=function(msg){if(SHV.off||!me.cls)return o.apply(this,arguments);if(shopTab==='sell'){try{shvCSS();return shvSellUI(msg)}catch(e){console.warn('shv',e);shopTab='pot'}}
  if(shopTab!=='sell')SHV.cf=0;const r=o.apply(this,arguments);try{shvCSS();const P=ov.querySelector('.pn[data-pn="shop"]');if(P){shvTab(P);if(shopTab==='gear')shvGearPost(P)}}catch(e){console.warn('shv',e)}return r}}catch(e){console.warn('shv',e)}},2400);
