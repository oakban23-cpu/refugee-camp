/* ---------- v612 สมุดเควสแบบ MMORPG (QLV) ----------
   ปุ่ม 📋 เควส → สมุดเควสรวมทุกอย่างแยกแท็บ: 📖 เนื้อเรื่อง · 📋 เควสพ่อค้า · 🎯 ค่าหัว · 🌅 ภารกิจจุติ
   · ทุกแท็บมีปุ่ม «🧭 นำทาง» = เดินไปทำอัตโนมัติ (ระบบออโต้เควสเดิม) กดซ้ำ = หยุด
   · เนื้อเรื่อง: บท/ภารกิจปัจจุบัน + แถบความคืบหน้า + เปิดบันทึกเนื้อเรื่อง · ค่าหัว: ใบประกาศวันนี้ สำเร็จกี่ใบ อยู่แมพไหน
   · จุดแดงบนแท็บ = มีของรอรับ/มี NPC รอคุย · ปิด: QLV.off=1 */
const QLV={off:0,t:'st'};
function qlCSS(){if(document.getElementById('qlcss'))return;const s=document.createElement('style');s.id='qlcss';s.textContent=
'#ov .qltb{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:4px;padding:3px;border-radius:12px;background:rgba(0,0,0,.28);margin:0 0 8px}'+
'#ov .qltb button{position:relative;min-height:40px;padding:4px 6px;border-radius:9px;border:1px solid transparent;background:transparent;color:#cdbfa8;font-size:13.5px;font-weight:600;white-space:nowrap}'+
'#ov .qltb button.on{background:linear-gradient(180deg,#ffe7a6,#ebbd5c 52%,#c18a30);color:#24170a;border-color:#8a6420}#ov .qltb button small{font-weight:400;opacity:.8}'+
'#ov .qltb .qdot{position:absolute;top:4px;right:6px;width:9px;height:9px;border-radius:50%;background:#ff5a4a;box-shadow:0 0 6px #ff5a4a}'+
'#ov .qlc{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:14px;background:rgba(0,0,0,.25);border:1px solid rgba(231,183,90,.25);text-align:left;margin-bottom:8px}'+
'#ov .qlc .qlh{display:flex;align-items:center;gap:10px}#ov .qlc .qlh .qi{font-size:30px;line-height:1}#ov .qlc .qlh b{font-size:16px;color:#ffe2a6;display:block}#ov .qlc .qlh small{font-size:12px;opacity:.8}'+
'#ov .qlc .qtx{font-size:14px;line-height:1.55;padding:8px 10px;border-radius:10px;background:rgba(255,236,205,.06);border-left:3px solid #e7b75a}'+
'#ov .qlbar{height:8px;border-radius:5px;background:rgba(255,255,255,.08);overflow:hidden}#ov .qlbar i{display:block;height:100%;background:linear-gradient(90deg,#c18a30,#ffe7a6)}'+
'#ov .qlc .qbt{display:flex;gap:8px;flex-wrap:wrap}#ov .qlc .qbt button{flex:1 1 140px;min-height:48px;border-radius:12px;font-size:14.5px;font-weight:700}'+
'#ov .qlc .qbt button.on{background:#5a2a20!important;color:#ffd2c6!important;border-color:#8a4a3a!important}'+
'#ov .qlrow{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:12px;background:rgba(0,0,0,.22);border:1px solid rgba(231,183,90,.18);text-align:left}#ov .qlrow.ok{opacity:.65}'+
'#ov .qlrow .nm{flex:1;min-width:0}#ov .qlrow .nm b{display:block;font-size:14px;color:#ffe2a6}#ov .qlrow .nm small{font-size:12px;opacity:.8}#ov .qlrow .st{color:#ffd84a;font-size:12px}#ov .qlrow .st i{font-style:normal;opacity:.3}'+
'#ov .qlrow button{min-height:40px;padding:0 12px;border-radius:10px;font-size:13px;white-space:nowrap}#ov .qlrow .hot{color:#ffb070;font-weight:700}'+
'#ov .qlem{text-align:center;padding:16px 12px;opacity:.9;font-size:13px;line-height:1.6}#ov .qlem .qi{font-size:34px}';
document.head.appendChild(s)}
function qlAq(src){return typeof AQ!=='undefined'&&AQ&&AQ.src===src}
function qlRbOn(){try{return!!(me.cls2&&!me.rb&&me.lv>=95)}catch(e){return false}}
function qlBtyOn(){try{return me.lv>=BTYLV}catch(e){return false}}
function qlStoryAl(){try{const q=me.sty,st=STY[q.s];return!!(st&&st.k&&q.a===0&&(!st.lv||lvOk(st.lv)))}catch(e){return false}}
function qlTabs(){const T=[['st','📖 เนื้อเรื่อง',qlStoryAl()],['bq','📋 พ่อค้า <small>'+me.qs.length+'/'+QMAX+'</small>',me.qs.some(q=>q.h>=q.n)]];
  if(qlBtyOn()){let dn=0,n=0;try{const B=btySt(),L=btyBoard();n=L.length;dn=L.filter(S=>B.cl[S.bid]).length}catch(e){}T.push(['bty','🎯 ค่าหัว <small>'+dn+'/'+n+'</small>',false])}
  if(qlRbOn())T.push(['rb','🌅 จุติ',false]);if(!T.some(t=>t[0]===QLV.t))QLV.t='st';
  return'<div class="qltb">'+T.map(([id,l,dot])=>'<button class="'+(QLV.t===id?'on':'')+'" data-qlt="'+id+'">'+l+(dot?'<i class="qdot"></i>':'')+'</button>').join('')+'</div>'}
function qlNavBtn(src,lab){const on=qlAq(src);return'<button class="'+(on?'on':'pri')+'" data-qln="'+src+'">'+(on?'⏹ หยุดนำทาง':'🧭 '+(lab||'นำทาง (เดินไปทำอัตโนมัติ)'))+'</button>'}
function qlStory(){let st=null,q=me.sty;try{stInit();q=me.sty;st=STY[q.s]}catch(e){}const tot=STY.length||1,pc=Math.round(Math.min(1,(q&&q.s||0)/tot)*100);let tx='';try{tx=stTxt()}catch(e){}
  if(!st)return'<div class="qlc"><div class="qlh"><span class="qi">🏆</span><div><b>จบเนื้อเรื่องที่มีตอนนี้แล้ว</b><small>ความคืบหน้า 100%</small></div></div><div class="qtx">'+tx+'</div><div class="qbt"><button data-qlo="story">📖 อ่านบันทึกเนื้อเรื่อง</button></div></div>';
  return'<div class="qlc"><div class="qlh"><span class="qi">📜</span><div><b>'+(STCH[st.c]||'เนื้อเรื่องหลัก')+'</b><small>ความคืบหน้าเนื้อเรื่องทั้งหมด '+pc+'%'+(st.lv&&!lvOk(st.lv)?' · ⚠️ ต้อง Lv '+st.lv:'')+'</small></div></div><div class="qlbar"><i style="width:'+pc+'%"></i></div>'+
    '<div class="qtx">'+tx+'</div><div class="qbt">'+qlNavBtn('st')+'<button data-qlo="story">📖 บันทึกเนื้อเรื่อง</button></div></div>'+
    '<div class="qlem" style="padding:4px;font-size:12px;opacity:.7">ทางลัด: แตะกล่องเนื้อเรื่องมุมจอก็เดินไปทำอัตโนมัติได้เหมือนกัน</div>'}
function qlBq(){if(!me.qs.length)return'<div class="qlc qlem"><div class="qi">🗒️</div><b>ยังไม่มีเควสพ่อค้า</b><div>ไปคุยกับ <b>พ่อค้า</b> ในค่ายเพื่อรับเควส (รับได้สูงสุด '+QMAX+' เควส)<br>ได้ทอง · ค่าประสบการณ์ · บางเควสได้อุปกรณ์ 🎁</div></div>';
  return me.qs.map(q=>{const done=q.h>=q.n,pc=q.t==='reach'||q.t==='boss'?(done?'สำเร็จ':'ยังไม่สำเร็จ'):q.h+'/'+q.n,w=q.t==='reach'||q.t==='boss'?(done?100:0):Math.round(Math.min(1,q.h/Math.max(1,q.n))*100);
    return'<div class="qlc" style="gap:6px"><div class="qlh"><span class="qi" style="font-size:24px">'+QI[q.t]+'</span><div style="flex:1;min-width:0">'+qLine(q)+'<small>🪙'+q.g+' · ✨'+q.xp+' XP'+(q.gr?' · 🎁อุปกรณ์':'')+'</small></div><b style="font-size:14px;color:'+(done?'#6fe0a0':'#ffd27a')+'">'+pc+'</b></div><div class="qlbar"><i style="width:'+w+'%"></i></div>'+
      '<div class="qbt">'+(done?'<button class="pri" data-qc="'+q.id+'">🎁 รับรางวัล</button>':'<button class="pri" data-aq="'+q.id+'">🧭 นำทาง</button><button data-qx="'+q.id+'" style="flex:0 1 110px">ยกเลิก</button>')+'</div></div>'}).join('')}
function qlBty(){let B,L=[];try{B=btySt();L=btyBoard()}catch(e){}if(!L.length)return'<div class="qlc qlem"><div class="qi">🎯</div>ยังไม่มีใบประกาศค่าหัว</div>';const dn=L.filter(S=>B.cl[S.bid]).length;
  return'<div class="qlc" style="gap:6px"><div class="qlh"><span class="qi">🎯</span><div style="flex:1"><b>ใบประกาศค่าหัววันนี้ · สำเร็จ '+dn+'/'+L.length+'</b><small>ล่าหัวหน้ามอนตามใบประกาศ ได้เหรียญค่าหัวไปแลกของ · ใบใหม่ทุกเที่ยงคืน</small></div></div><div class="qlbar"><i style="width:'+Math.round(dn/L.length*100)+'%"></i></div></div>'+
    L.map(S=>{const ok=!!B.cl[S.bid],here=curMap===S.mp;return'<div class="qlrow'+(ok?' ok':'')+'"><div class="nm"><b>«'+S.n+'» <span class="st">'+'★'.repeat(S.st)+'<i>'+'★'.repeat(3-S.st)+'</i></span></b><small>📍 '+btyMapName(S.mp)+' · Lv '+S.L+'</small>'+(ok?'<small style="color:#6fe0a0"> · ✅ สำเร็จแล้ว</small>':here?'<small class="hot"> · คุณอยู่แมพนี้ ตามรอยเท้าบนแผนที่เล็ก</small>':'')+'</div>'+(ok||here?'':'<button data-qlw="'+S.mp+'">🗺️ วาปไป</button>')+'</div>'}).join('')+
    '<div class="qlc" style="padding:8px"><div class="qbt"><button data-qlo="bty">📋 เปิดกระดานค่าหัว · ร้านแลก</button></div></div>'}
function qlRb(){let t='';try{const e=$('rbq');t=e?e.querySelector('span')?e.querySelector('span').innerHTML:e.innerText:''}catch(x){}let S={sh:0};try{S=rbSt()}catch(x){}
  return'<div class="qlc"><div class="qlh"><span class="qi">🌅</span><div><b>ภารกิจจุติเป็นคลาส 3</b><small>Lv '+me.lv+'/99 · ผลึกวิญญาณ '+S.sh+'/'+RBN+' · ทอง '+fmtG(me.gold)+'/'+fmtG(RBG)+'</small></div></div><div class="qtx">'+(t||'เก็บเลเวลถึง 99 · ผลึกวิญญาณจุติ '+RBN+' ก้อน · ทอง '+RBG.toLocaleString())+'</div><div class="qbt">'+(me.lv>=99?qlNavBtn('rb'):'<button disabled>🔒 ต้อง Lv 99</button>')+'</div></div>'}
function qlUI(msg){qlCSS();ov.dataset.k='quest';let b='';try{b=QLV.t==='bq'?qlBq():QLV.t==='bty'?qlBty():QLV.t==='rb'?qlRb():qlStory()}catch(e){console.warn('ql',e);b=questHtml(false)}
  ov.innerHTML='<div class="pn" data-pn="quest">'+hdr('📜','สมุดเควส','เควสทั้งหมดอยู่ที่นี่ · กด 🧭 นำทาง เพื่อเดินไปทำอัตโนมัติ')+(msg?'<div class="note">'+msg+'</div>':'')+qlTabs()+b+'</div>'}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{if(QLV.off||!me.cls||ov.dataset.k!=='quest')return;const b=e.target.closest&&e.target.closest('[data-qlt],[data-qln],[data-qlo],[data-qlw]');if(!b)return;e.stopPropagation();e.preventDefault();try{sfx('click')}catch(x){}const d=b.dataset;
  if(d.qlt){QLV.t=d.qlt;qlUI();return}
  if(d.qln){if(qlAq(d.qln)){aqStop('🧭 หยุดนำทางแล้ว');qlUI();return}aqStart(d.qln);return}
  if(d.qlo==='story'){try{storyUI()}catch(x){}return}if(d.qlo==='bty'){try{btyUI()}catch(x){}return}
  if(d.qlw){try{wmUI(+d.qlw)}catch(x){}return}},true)}
setTimeout(()=>{try{const o=questUI;window.questUI=questUI=function(msg){if(QLV.off||!me.cls)return o.apply(this,arguments);try{if(msg)QLV.t='bq';return qlUI(msg)}catch(e){console.warn('ql',e);return o.apply(this,arguments)}}}catch(e){console.warn('ql',e)}},2450);
