/* ---------- v612 หน้าสเตตัสแบบ MMORPG (SWS) ----------
   · จอนอน: ซ้าย = แต้มเหลือ + ค่าพลังรวม (ค้างอยู่ตอนเลื่อน) · ขวา = สเตตัสเรียงเป็นแถวกะทัดรัด ปุ่ม +1/+5/+10 อยู่ท้ายแถว
   · ลงแต้มแล้วค่าพลังรวมที่เปลี่ยนจะเรืองขึ้นพร้อมบอกว่าเพิ่มเท่าไร (เช่น ❤️ 1580 +56) · แถวที่เพิ่งลงแต้มเรืองทอง
   · ปิด: SWS.off=1 */
const SWS={off:0,prev:null,row:-1};
function swsCSS(){if(document.getElementById('swscss'))return;const s=document.createElement('style');s.id='swscss';s.textContent=
'body #ov>.pn.swsp{display:block!important;column-count:auto!important}body #ov>.pn.swsp>*{column-span:none!important}'+
'#ov .swsg{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.4fr);gap:10px;align-items:start}#ov .swsg>div>*{margin-top:0!important}'+
'#ov .swsl{position:sticky;top:0;display:flex;flex-direction:column;gap:8px}#ov .swsl>.card,#ov .swsl>.sk2top{margin:0!important}'+
'#ov .swsr{display:flex;flex-direction:column;gap:6px}#ov .swsr>.ab2{margin:0!important}'+
'#ov .swsl .sk2top .tot{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px!important}#ov .swsl .sk2top .tot .ch{justify-content:flex-start;position:relative;transition:background .3s}'+
'#ov .sk2top .tot .ch.swup{background:rgba(111,224,160,.18)!important;border-color:rgba(111,224,160,.7)!important;box-shadow:0 0 10px rgba(111,224,160,.35);animation:swsP 1.2s ease-out}'+
'#ov .sk2top .tot .ch.swdn{background:rgba(255,120,100,.14)!important;border-color:rgba(255,140,120,.6)!important}'+
'#ov .sk2top .tot .ch em{font-style:normal;font-weight:800;margin-left:4px;font-size:11px}#ov .sk2top .tot .ch.swup em{color:#6fe0a0}#ov .sk2top .tot .ch.swdn em{color:#ff9d8a}'+
'@keyframes swsP{0%{transform:scale(1.08)}100%{transform:scale(1)}}'+
'#ov .swsr .ab2{display:grid!important;grid-template-columns:minmax(0,1fr) auto;column-gap:10px;row-gap:3px;align-items:center;padding:8px 10px!important}'+
'#ov .swsr .ab2>.hd{grid-column:1;margin:0!important}#ov .swsr .ab2>.ef{grid-column:1;margin:0!important}#ov .swsr .ab2>.nx{grid-column:1;margin:0!important}'+
'#ov .swsr .ab2>.bs{grid-column:2;grid-row:1/span 3;display:flex!important;gap:5px!important;margin:0!important}#ov .swsr .ab2>.bs button{min-width:52px;min-height:46px;padding:0 8px!important}'+
'#ov .swsr .ab2>details{grid-column:1/-1}#ov .swsr .ab2.swhit{box-shadow:0 0 0 2px #e7b75a,0 0 16px rgba(231,183,90,.35);transition:box-shadow .4s}'+
'@media (max-aspect-ratio:1/1){#ov .swsg{grid-template-columns:minmax(0,1fr)}#ov .swsl{position:static}#ov .swsr .ab2{grid-template-columns:minmax(0,1fr)}#ov .swsr .ab2>.bs{grid-column:1;grid-row:auto}#ov .swsr .ab2>.bs button{flex:1}}';
document.head.appendChild(s)}
function swsSnap(){const o={};ov.querySelectorAll('.sk2top .tot .ch').forEach(c=>{const t=c.textContent.trim(),m=/^(\D*?)(-?[\d,]+(?:\.\d+)?)/.exec(t);if(m)o[m[1].trim()]=parseFloat(m[2].replace(/,/g,''))});return o}
function swsPost(){if(SWS.off||charTab!=='ab')return;const P=ov.querySelector('.pn[data-pn="char"]');if(!P||P.querySelector('.swsg'))return;const top=P.querySelector(':scope>.sk2top'),rows=[...P.querySelectorAll(':scope>.ab2')];if(!top||!rows.length)return;swsCSS();P.classList.add('swsp');
  const g=document.createElement('div');g.className='swsg';const L=document.createElement('div');L.className='swsl';const R=document.createElement('div');R.className='swsr';top.before(g);g.appendChild(L);g.appendChild(R);
  const xp=[...P.children].find(c=>c.classList&&c.classList.contains('card')&&c.querySelector('.xpb'));if(xp)L.appendChild(xp);L.appendChild(top);
  [...P.children].forEach(c=>{if(c!==g&&c.classList&&(c.classList.contains('ab2')||(c.classList.contains('card')&&!c.classList.contains('tabs'))))R.appendChild(c)});
  if(SWS.prev&&performance.now()-SWS.pt<600){const pv=SWS.prev;ov.querySelectorAll('.sk2top .tot .ch').forEach(c=>{const t=c.textContent.trim(),m=/^(\D*?)(-?[\d,]+(?:\.\d+)?)/.exec(t);if(!m)return;const k=m[1].trim(),v=parseFloat(m[2].replace(/,/g,''));if(!(k in pv))return;const d=Math.round((v-pv[k])*100)/100;if(!d)return;
    c.classList.add(d>0?'swup':'swdn');c.insertAdjacentHTML('beforeend','<em>'+(d>0?'+':'')+d+'</em>')})}
  if(SWS.row>=0&&performance.now()-SWS.pt<600&&R.querySelectorAll('.ab2')[SWS.row]){const r=R.querySelectorAll('.ab2')[SWS.row];r.classList.add('swhit');setTimeout(()=>{try{r.classList.remove('swhit')}catch(e){}},900)}}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{if(SWS.off||ov.dataset.k!=='char'||charTab!=='ab')return;const b=e.target.closest&&e.target.closest('.ab2 .bs button,.sk2top button');if(!b)return;SWS.prev=swsSnap();SWS.pt=performance.now();const r=b.closest('.ab2');SWS.row=r?[...ov.querySelectorAll('.ab2')].indexOf(r):-1},true)}
setTimeout(()=>{try{const o=treeUI;window.treeUI=treeUI=function(){const r=o.apply(this,arguments);try{swsPost()}catch(e){console.warn('sws',e)}return r}}catch(e){console.warn('sws',e)}},2450);
