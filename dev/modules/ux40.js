/* ---------- v423 ย้อมสีชุด (หมวก · อาวุธ · เสื้อ · รองเท้า) ----------
   สีย้อม 8 สี ผสมจากวัตถุดิบที่ขุด/เก็บได้ ที่ตู้เสื้อผ้าในเต็นท์ (แท็บ 🎨 ย้อมสี) · ย้อม 1 ครั้ง = ใช้สีย้อม 1 ขวด · ล้างสีฟรี
   ย้อมได้ทั้งชิ้นแฟชั่นและของจริงที่โชว์อยู่ · ค่าพลังไม่เปลี่ยน · ทุกคนในแมพเห็นสี (presence dy: 4 บิตต่อชิ้น h|w<<4|a<<8|b<<12)
   สีย้อมเป็นของในกระเป๋า 🧺 (เก็บใน me.gth.m ร่วมกับวัตถุดิบ) → แลกตัวต่อตัว / ขายในตลาด / แนบจดหมายได้ · สีหายาก (ทอง/รุ้ง) ผสมยาก ราคาตลาดจะสูงเอง */
const DYE=[
  ['d1','🔴','สีย้อมแดงชาด','sepia(1) saturate(4) hue-rotate(-38deg) brightness(.95)',{h1:3},200,0],
  ['d2','🔵','สีย้อมฟ้าคราม','sepia(1) saturate(3.4) hue-rotate(168deg)',{h1:2,h2:1},200,0],
  ['d3','🟢','สีย้อมเขียวมรกต','sepia(1) saturate(3) hue-rotate(78deg) brightness(.95)',{h1:4},200,0],
  ['d4','🌸','สีย้อมชมพูซากุระ','sepia(1) saturate(2.4) hue-rotate(-68deg) brightness(1.18)',{h2:2},300,0],
  ['d5','⚫','สีย้อมดำราตรี','grayscale(1) brightness(.42) contrast(1.5)',{o1:3,rt:1},500,1],
  ['d6','⚪','สีย้อมขาวมุก','grayscale(1) brightness(1.55) contrast(.92)',{o1:2,h2:2},500,1],
  ['d7','🟡','สีย้อมทองคำ','sepia(1) saturate(4.2) brightness(1.22) hue-rotate(4deg)',{o2:3,gm:1},2000,2],
  ['d8','🌈','สีย้อมรุ้งดาวตก','',{o3:2,gm:2,h3:1},5000,2]];
const DYM={},DYS=['h','w','a','b'],DYRN=['ธรรมดา','พิเศษ','หายาก'],DYRC=['#cfc6b8','#9ad8ff','#ffd84a'];DYE.forEach((d,i)=>DYM[d[0]]={i:i+1,id:d[0],e:d[1],n:d[2],f:d[3],r:d[4],g:d[5],rr:d[6]});
/* ลงทะเบียนเป็นของในกระเป๋า/ตลาด (ต่อท้ายรายการวัตถุดิบเดิม → เซฟ/ตลาด/แลกเปลี่ยนใช้ระบบเดิมทั้งหมด) */
try{DYE.forEach(d=>{if(!GTK.includes(d[0]))GTK.push(d[0]);GTI[d[0]]=[d[1],d[2],'สีย้อม'+DYRN[d[6]]+' · ใช้ย้อมชุดที่ตู้เสื้อผ้าในเต็นท์']})}catch(e){}
const dyCnt=id=>{try{return(me.gth&&me.gth.m&&me.gth.m[id])|0}catch(e){return 0}};
function dyAdd(id,n){me.gth=me.gth||{m:{},ox:0,hx:0};me.gth.m=me.gth.m||{};me.gth.m[id]=Math.max(0,Math.min(GTMX,dyCnt(id)+n))}
/* สถานะการย้อมของตัวเรา me.wdr.c = {h:'d3',...} */
function dySt(){const W=wdrSt();if(!W.c||typeof W.c!=='object')W.c={};return W.c}
function wdrDy(){const C=(me.wdr&&me.wdr.c)||{};let v=0;DYS.forEach((s,k)=>{const d=DYM[C[s]];if(d)v|=d.i<<(k*4)});return v}
const dyOf=(v,sl)=>{const k=DYS.indexOf(sl);if(k<0||!v)return null;const i=(v>>(k*4))&15;return i?DYE[i-1]:null};
function dyFilter(d){if(!d)return'';if(d[0]==='d8'){const h=(performance.now()/1000*80)%360;return'sepia(1) saturate(4) hue-rotate('+Math.round(h)+'deg) brightness(1.12)'}return d[3]}
/* วาด: ใส่ filter รอบการวาดแต่ละชิ้น */
let CHDY=0;
function dyWrap(fn,sl){return function(){const d=CHDY&&(!LOWQ||LQOTH)?dyOf(CHDY,sl):null;/* โหมดประหยัดจริงไม่ย้อม · ขั้น 1 ยังเห็นสีคนอื่น */if(!d||!('filter' in g))return fn.apply(this,arguments);const f0=g.filter;g.filter=dyFilter(d);try{return fn.apply(this,arguments)}finally{g.filter=f0}}}
/* ---- ผสม / ย้อม ---- */
function dyCan(d){const R=DYM[d].r;for(const k in R)if(((me.gth&&me.gth.m&&me.gth.m[k])|0)<R[k])return false;return me.gold>=DYM[d].g}
function dyCraft(d){const D=DYM[d];if(!D||!dyCan(d))return'วัตถุดิบหรือทองไม่พอ';for(const k in D.r)me.gth.m[k]-=D.r[k];me.gold-=D.g;dyAdd(d,1);
  try{sfx('item')}catch(e){}try{burst(me.x,me.y-24,['#ffffff',DYRC[D.rr]],14,90,.5,{glow:1,g:-30})}catch(e){}return'ผสมได้ '+D.e+' '+D.n+' (มี '+dyCnt(d)+')'}
function dyApply(sl,d){const D=DYM[d];if(!D||DYS.indexOf(sl)<0)return'';if(dyCnt(d)<1)return'ไม่มี '+D.n;const C=dySt();if(C[sl]===d)return'ชิ้นนี้เป็นสีนี้อยู่แล้ว';
  dyAdd(d,-1);C[sl]=d;try{sfx('equip')}catch(e){}try{burst(me.x,me.y-24,['#ffffff',DYRC[D.rr]],16,100,.6,{glow:1,g:-30})}catch(e){}return'ย้อม'+WSLN[sl][2]+'เป็น '+D.e+' '+D.n.replace('สีย้อม','')+' แล้ว'}
function dyClear(sl){const C=dySt();if(!C[sl])return'';delete C[sl];return'ล้างสี'+WSLN[sl][2]+'แล้ว'}
/* ---- แท็บ 🎨 ในตู้เสื้อผ้า ---- */
const DYMN={o1:'🪨',o2:'🔷',o3:'☄️',gm:'💎',h1:'🌿',h2:'🌸',h3:'🪷',rt:'🍄'};
function dyHTML(){const C=dySt(),inv=DYE.filter(d=>dyCnt(d[0])>0);
  let h='<div style="font-size:12px;margin:2px 0 6px;opacity:.85">ย้อมได้ทั้งชิ้นแฟชั่นและของจริงที่โชว์อยู่ · ค่าพลังไม่เปลี่ยน · ทุกคนเห็นสี · ล้างสีฟรี</div>';
  h+='<div style="margin-bottom:6px"><b>🎒 สีย้อมที่มี</b> '+(inv.length?inv.map(d=>'<span style="display:inline-block;margin:2px;padding:2px 7px;border-radius:9px;background:rgba(255,255,255,.06);border:1px solid '+DYRC[d[6]]+'66">'+d[1]+' '+d[2].replace('สีย้อม','')+' ×'+dyCnt(d[0])+'</span>').join(''):'<small style="opacity:.7">ยังไม่มี · ผสมด้านล่าง</small>')+'</div>';
  /* ย้อมแต่ละชิ้น */
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">'+DYS.map(sl=>{const d=DYM[C[sl]],O=wdrPc(sl);
    return'<div style="padding:7px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid '+(d?DYRC[d.rr]+'88':'rgba(255,255,255,.12)')+';font-size:11px"><b style="font-size:12px">'+WSLN[sl][1]+' '+WSLN[sl][2]+'</b><small style="display:block;opacity:.75;margin:2px 0 4px">'+(O?O.e+' '+O.n:'ของจริง')+' · '+(d?d.e+' '+d.n.replace('สีย้อม',''):'สีเดิม')+'</small>'+
      '<div style="display:flex;flex-wrap:wrap;gap:3px">'+inv.map(q=>'<button data-dya="'+sl+':'+q[0]+'" title="'+q[2]+'" style="font-size:13px;padding:2px 6px'+(C[sl]===q[0]?';outline:2px solid #9fe89f':'')+'">'+q[1]+'</button>').join('')+(d?'<button data-dyc="'+sl+'" style="font-size:11px;padding:2px 7px">ล้างสี</button>':'')+'</div></div>'}).join('')+'</div>';
  /* ผสมสี */
  h+='<b>🧪 ผสมสีย้อม</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px">'+DYE.map(d=>{const D=DYM[d[0]],ok=dyCan(d[0]);
    const need=Object.keys(D.r).map(k=>{const have=(me.gth&&me.gth.m&&me.gth.m[k])|0;return'<span style="color:'+(have>=D.r[k]?'#cfe8c0':'#ff9a8a')+'">'+DYMN[k]+have+'/'+D.r[k]+'</span>'}).join(' ');
    return'<div style="padding:7px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid '+DYRC[D.rr]+'55;font-size:11px"><b style="font-size:12px">'+D.e+' '+D.n.replace('สีย้อม','')+'</b> <small style="color:'+DYRC[D.rr]+'">'+DYRN[D.rr]+'</small>'+
      '<small style="display:block;margin:3px 0">'+need+' · 💰'+D.g.toLocaleString()+'</small><button class="'+(ok?'pri':'')+'" data-dym="'+d[0]+'" style="font-size:11px;padding:3px 10px"'+(ok?'':' disabled')+'>ผสม</button> <small style="opacity:.7">มี '+dyCnt(d[0])+'</small></div>'}).join('')+'</div>';
  h+='<small style="display:block;margin-top:6px;opacity:.7">วัตถุดิบได้จากการขุดแร่/เก็บสมุนไพรในแมพ · สีย้อมขาย/แลกในตลาดและแนบจดหมายได้</small>';return h}
function dyClick(e){const b=e.target.closest&&e.target.closest('[data-dym],[data-dya],[data-dyc]');if(!b||!me.cls)return;e.stopPropagation();let msg='';
  if(b.dataset.dym)msg=dyCraft(b.dataset.dym);else if(b.dataset.dya){const [sl,d]=b.dataset.dya.split(':');msg=dyApply(sl,d)}else if(b.dataset.dyc)msg=dyClear(b.dataset.dyc);
  try{writeSave()}catch(_){}if(ov.dataset.k==='wdr')wardrobeUI(msg||undefined)}
setTimeout(()=>{
  try{DYE.forEach(d=>{if(GDM[d[0]])GDM[d[0]].d=GTI[d[0]][2]})}catch(e){}
  try{drawArmorLook=dyWrap(drawArmorLook,'a')}catch(e){}
  try{drawHelmCode=dyWrap(drawHelmCode,'h')}catch(e){}
  try{boots2=dyWrap(boots2,'b')}catch(e){}
  try{drawWeapon=dyWrap(drawWeapon,'w')}catch(e){}
  /* ตั้งสีของตัวที่กำลังวาด */
  try{const _d0=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const c0=CHDY;CHDY=(lk&&lk.dy)|0;try{return _d0.apply(this,arguments)}finally{CHDY=c0}}}catch(e){}
  try{const _gp=drawGearPreview2;drawGearPreview2=function(){const c0=CHDY;CHDY=wdrDy();try{return _gp.apply(this,arguments)}finally{CHDY=c0}}}catch(e){}
  /* แท็บ 🎨 ในตู้เสื้อผ้า */
  try{const _wh=wdrHTML;wdrHTML=function(){const dy=GPV.wt==='dye';if(dy)GPV.wt='set';let h;try{h=_wh.apply(this,arguments)}finally{if(dy)GPV.wt='dye'}if(ov.dataset.k!=='wdr')return h;if(dy)h=h.replace('class="tab sm on" data-wdt="set"','class="tab sm" data-wdt="set"');const i=h.indexOf('<div class="tabs"');if(i<0)return h;const j=h.indexOf('</div>',i);
      h=h.slice(0,j)+'<button class="tab sm'+(GPV.wt==='dye'?' on':'')+'" data-wdt="dye" style="font-size:12px;padding:4px 9px">🎨 ย้อมสี</button>'+h.slice(j);
      if(GPV.wt==='dye'){const k=h.indexOf('</div>',i)+6;h=h.slice(0,k)+dyHTML()}return h}}catch(e){}
  document.addEventListener('click',dyClick,true);
},860);
