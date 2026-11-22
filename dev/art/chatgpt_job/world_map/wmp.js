/* ---------- v651 แผนที่โลกภาพวาด (WMP) ----------
   · พื้นแผนที่เป็นภาพวาด 3 แผ่นต่อกันแนวตั้ง (hd-wm1 ฟ้า+ห้วงดาว · hd-wm2 ทะเลเมฆ+ดินแดนใต้เมฆ · hd-wm3 พื้นดิน+ใต้ดิน)
     รอยต่อไล่ความโปร่งให้กลืนกัน · สะพานแสงทองเป็นแกนกลางจากนครอัสตราลงมาถึงค่าย
   · ผังใหม่ตามเรื่องราว (viewBox 360×1570): ห้วงดาวบนสุด → เกาะลอยฟ้า → ทะเลเมฆ/ใต้เมฆ → พื้นดิน → ใต้ดิน
     เส้นทางเชื่อมเหมือนเดิมทุกเส้น (ตรวจแล้วไม่ทับแมพอื่น) · สลับพิกัดเฉพาะตอนวาดหน้าแผนที่ ไม่แตะ WMN ที่อื่น
   · อีโมจิบนหมุดเปลี่ยนเป็นเหรียญภาพวาดประจำแมพ 44 อัน (hd-wmmed atlas 11×4 ช่องละ 128) · ล็อก = เหรียญสีเทามืด + 🔒 เล็ก
   · แผงรายละเอียดใช้เหรียญเดียวกัน · โหลดภาพไม่ได้ → แผนที่แบบเดิมทั้งหมด · ปิด: WMP.off=1 */
const WMP={off:0,ok:0,err:'',ld:0,n:0,H:1570,
  P:{1:[180,1120],2:[255,1170],3:[95,1180],4:[135,1268],5:[70,1085],6:[215,1255],7:[300,1250],8:[40,1265],9:[200,325],10:[300,350],11:[320,440],12:[130,300],13:[130,405],14:[55,245],15:[118,468],16:[35,330],17:[35,462],18:[68,390],19:[85,630],20:[45,730],21:[110,820],22:[55,920],23:[150,1365],24:[240,1370],25:[300,1450],26:[200,1505],27:[270,255],28:[205,190],29:[300,165],30:[195,575],31:[250,420],32:[265,640],33:[310,725],34:[270,1075],35:[320,1150],36:[115,175],38:[300,945],39:[290,830],40:[95,85],41:[195,45],42:[300,70],43:[50,1360],44:[55,1440],45:[75,1525]},
  ids:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45],
  F:['hd-wm1.webp','hd-wm2.webp','hd-wm3.webp','hd-wmmed.webp']};
function wmpLoad(){if(WMP.ld||WMP.off)return;WMP.ld=1;let n=0;WMP.F.forEach(f=>{const im=new Image();im.decoding='async';
  im.onload=()=>{if(++n===WMP.F.length){WMP.ok=1;try{if(!ov.hidden&&ov.dataset.k==='wm'){const sc=ov.querySelector('.wmsc'),t=sc?sc.scrollTop/sc.scrollHeight:0;wmUI.keep=1;wmUI(WMSEL);const s2=ov.querySelector('.wmsc');if(s2)s2.scrollTop=t*s2.scrollHeight}}catch(e){}}};
  im.onerror=()=>{WMP.err=f};im.src=f})}
function wmpCell(id){const k=WMP.ids.indexOf(+id);return k<0?null:[(k%11)*128,(k/11|0)*128]}
function wmpMed(id,x,y,r,gray){const c=wmpCell(id);if(!c)return'';const s=r*2,sc=s/128;
  const v='<svg x="'+(x-r)+'" y="'+(y-r)+'" width="'+s+'" height="'+s+'" viewBox="'+c[0]+' '+c[1]+' 128 128" class="wmpm"><image href="hd-wmmed.webp" width="1408" height="512"/></svg>';return gray?'<g filter="url(#wmpgr)" class="wmpg">'+v+'</g>':v}
function wmpCSS(){if(document.getElementById('wmpcss'))return;const s=document.createElement('style');s.id='wmpcss';s.textContent=
 '.wmsvg.wmpp .wme{stroke:#2a1e36;stroke-width:2;opacity:.75;stroke-dasharray:5 4}.wmsvg.wmpp .wme.on{stroke:#ffe08a;opacity:1;stroke-width:2.4;stroke-dasharray:none}'
+'.wmsvg.wmpp .wmeu{fill:none;stroke:#1a0f06;stroke-width:4.6;opacity:.55}'
+'.wmsvg.wmpp .wmn .wmc{fill:#120c06;stroke-width:2.4}.wmsvg.wmpp .wmn.l{opacity:1}.wmsvg.wmpp .wmn.l .wmc{stroke:#5a5a5a}'
+'.wmsvg.wmpp .wmt{font-size:10px;stroke-width:3.4px}.wmsvg.wmpp .wml{stroke-width:3.4px}.wmsvg.wmpp .wmlk{font-size:9px;text-anchor:middle}'
+'#ov .wmdi.wmpi{display:inline-block;width:40px;height:40px;flex:0 0 40px;background:url(hd-wmmed.webp) no-repeat;background-size:440px 160px;border-radius:50%;filter:drop-shadow(0 2px 3px rgba(0,0,0,.6))}'
+'.wmsc.wmpsc{background:#0d0a12}';document.head.appendChild(s)}
/* แปลง svg ที่ wmUI เดิมวาดแล้ว (พิกัดถูกสลับเป็นผังใหม่ไว้ระหว่างวาด) */
function wmpPost(){const sv=ov.querySelector('.wmsvg');if(!sv||sv.classList.contains('wmpp'))return;wmpCSS();WMP.n++;
  sv.classList.add('wmpp');sv.setAttribute('viewBox','0 0 360 '+WMP.H);const sc=sv.closest('.wmsc');if(sc)sc.classList.add('wmpsc');
  /* ลบพื้นเดิม (แถบสี เมฆ ดาว ชื่อแถบ) ทุกอย่างก่อนเส้นทางเส้นแรก */
  const first=sv.querySelector('path.wme,g.wmn');[...sv.children].forEach(c=>{if(c.tagName==='defs')return;if(first&&(c===first||(c.compareDocumentPosition(first)&Node.DOCUMENT_POSITION_PRECEDING)))return;c.remove()});
  const NS='http://www.w3.org/2000/svg';let bg='<filter id="wmpgr"><feColorMatrix type="saturate" values="0.05"/><feComponentTransfer><feFuncR type="linear" slope=".55"/><feFuncG type="linear" slope=".55"/><feFuncB type="linear" slope=".6"/></feComponentTransfer></filter>'
   +'<linearGradient id="wmpfd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".05" stop-color="#fff" stop-opacity="1"/></linearGradient>'
   +'<mask id="wmpm2" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#wmpfd)"/></mask>';
  const df=sv.querySelector('defs');if(df)df.insertAdjacentHTML('beforeend',bg);
  const g=document.createElementNS(NS,'g');g.setAttribute('class','wmpbg');
  g.innerHTML='<rect x="0" y="0" width="360" height="'+WMP.H+'" fill="#0d0a12"/><image href="hd-wm1.webp" x="0" y="0" width="360" height="520" preserveAspectRatio="none"/>'
   +'<image href="hd-wm2.webp" x="0" y="492" width="360" height="548" preserveAspectRatio="none" mask="url(#wmpm2)"/><image href="hd-wm3.webp" x="0" y="1012" width="360" height="548" preserveAspectRatio="none" mask="url(#wmpm2)"/>';
  sv.insertBefore(g,sv.firstChild.nextSibling);
  /* เส้นที่เปิดแล้วมีเงาเข้มรองใต้ ให้อ่านออกบนเมฆสว่าง */
  sv.querySelectorAll('path.wme.on').forEach(p=>{const u=p.cloneNode();u.setAttribute('class','wmeu');p.before(u)});
  /* หมุด: อีโมจิ → เหรียญ */
  sv.querySelectorAll('g.wmn').forEach(n=>{const id=+n.dataset.wm,c=n.querySelector('.wmc'),t=n.querySelector('.wmi');if(!c||!t||!wmpCell(id))return;const x=+c.getAttribute('cx'),y=+c.getAttribute('cy'),L=n.classList.contains('l');
    c.setAttribute('r','17');t.insertAdjacentHTML('afterend',wmpMed(id,x,y,15.2,L)+(L?'<text x="'+(x+10)+'" y="'+(y+14)+'" class="wmlk">🔒</text>':''));t.remove()});
  /* แผงรายละเอียด */const di=ov.querySelector('.wmd .wmdi'),c=wmpCell(WMSEL);if(di&&c){di.textContent='';di.classList.add('wmpi');di.style.backgroundPosition=(-c[0]*40/128)+'px '+(-c[1]*40/128)+'px'}}
setTimeout(()=>{try{const o=wmUI;window.wmUI=wmUI=function(sel,msg){
    if(WMP.off||!WMP.ok){if(!WMP.off)wmpLoad();return o.apply(this,arguments)}
    const keep=wmUI.keep,bk={},bb=Object.assign({},WMB);for(const k in WMP.P)if(WMN[k]){bk[k]=[WMN[k][0],WMN[k][1]];WMN[k][0]=WMP.P[k][0];WMN[k][1]=WMP.P[k][1]}for(const k in WMB)delete WMB[k];
    let r;try{r=o.apply(this,arguments)}finally{for(const k in bk){WMN[k][0]=bk[k][0];WMN[k][1]=bk[k][1]}Object.assign(WMB,bb)}
    try{wmpPost();const sc=ov.querySelector('.wmsc'),s=WMSEL|0;if(sc&&!keep&&WMP.P[s]){const k=sc.clientWidth/360;sc.scrollTop=Math.max(0,WMP.P[s][1]*k-sc.clientHeight/2)}}catch(e){console.warn('wmp',e)}
    return r}}catch(e){console.warn('wmp',e)}
  /* โหลดล่วงหน้าตอนเครื่องว่าง ให้เปิดแผนที่ครั้งแรกเห็นภาพเลย */const iv=setInterval(()=>{try{if(WMP.ld||WMP.off){clearInterval(iv);return}if(me&&me.cls&&run)setTimeout(wmpLoad,4000),clearInterval(iv)}catch(e){}},3000)},3000);
