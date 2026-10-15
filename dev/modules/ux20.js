/* ---------- v391 กระเป๋า «ของใช้ & วัตถุดิบ»: โชว์ปลาในถัง · อาหารที่ปรุงไว้ · ผลึกวิญญาณจุติ (ดูอย่างเดียว) ---------- */
function xgCell(k,ic,v,sel,dim){return'<button class="cell" data-gd="'+k+'" style="'+(v||!dim?'':'opacity:.45;')+(sel===k?'border-color:#d8a040;box-shadow:0 0 0 2px rgba(216,160,64,.5);':'')+'font-size:22px">'+ic+'<span style="position:absolute;right:4px;bottom:2px;font-size:11px;font-weight:700;text-shadow:0 1px 2px #000;color:#fff">'+(typeof v==='string'?v:v>9999?Math.floor(v/1000)+'k':v)+'</span></button>'}
function xgFish(){const S=fsSt();return Object.keys(S.c).filter(id=>FISH[id]&&S.c[id]>0).sort((a,b)=>FISH[b].r-FISH[a].r||(S.c[b]|0)-(S.c[a]|0))}
function xgFood(){const S=fsSt();return Object.keys(S.f).filter(k=>FOOD[k]&&S.f[k]>0)}
function xgCells(sel){if(!me.cls)return'';let h='';try{const S=fsSt(),nf=xgFish().reduce((a,id)=>a+(S.c[id]|0),0),nd=xgFood().reduce((a,k)=>a+(S.f[k]|0),0);
  h+=xgCell('xgfs','🪣',nf,sel,1)+xgCell('xgfd','🍱',nd,sel,1);
  const R=rbSt();if(me.rb)h+=xgCell('xgrb','🌅','✔',sel,0);else h+=xgCell('xgrb','🌅',(R.sh|0)+'/'+RBN,sel,!(R.sh>0))}catch(e){}return h}
function xgNote(sel){const N=(t,b)=>'<div class="note" style="margin-top:8px;text-align:left"><b>'+t+'</b><br><small>'+b+'</small></div>';
  if(sel==='xgfs'){const S=fsSt(),L=xgFish(),n=L.reduce((a,id)=>a+(S.c[id]|0),0);
    return N('🪣 ปลาในถัง · '+n.toLocaleString()+' ตัว ('+L.length+' ชนิด)',(L.length?L.slice(0,14).map(id=>'<span style="color:'+FRC[FISH[id].r]+'">'+FISH[id].ic+' '+FISH[id].n+'</span> ×'+S.c[id]).join(' · ')+(L.length>14?' · …':'')+'<br>':'ยังไม่มีปลา — หาบ่อน้ำที่มีป้าย 🎣 ในแมพแล้วกดตกปลา<br>')+'ขายหรือเอาไปทำอาหารได้ที่เมนู 🎣 ตกปลา (ปลาหายากขายได้แพง)')}
  if(sel==='xgfd'){const S=fsSt(),L=xgFood(),fb=S.fb&&S.fb.t>0&&FOOD[S.fb.id]?FOOD[S.fb.id]:null;
    return N('🍱 อาหารที่ปรุงไว้ · '+L.reduce((a,k)=>a+(S.f[k]|0),0)+' จาน',(L.length?L.map(k=>FOOD[k][0]+' '+FOOD[k][1]+' ×'+S.f[k]+' <span style="opacity:.75">('+fsBuffTxt(FOOD[k][3])+' · '+FOOD[k][4]+' นาที)</span>').join('<br>')+'<br>':'ยังไม่มีอาหาร — ปรุงจากปลาที่ครัวป้าบัวริมบึงหน้าค่าย หรือเตาผิงในเต็นท์<br>')+
      (fb?'กำลังอิ่ม: '+fb[0]+' '+fb[1]+' เหลือ '+Math.ceil(S.fb.t/60)+' นาที<br>':'')+'กินได้ที่เมนู 🎣 ตกปลา → แท็บอาหาร (กินได้ทีละอย่าง · ใช้คู่กับยาบัฟจากงานฝีมือได้)')}
  if(sel==='xgrb'){const R=rbSt();if(me.rb)return N('🌅 ผลึกวิญญาณจุติ','ตัวละครนี้จุติแล้ว ✔ ไม่ต้องใช้ผลึกอีก');
    const ok=rbEligible();return N('🌅 ผลึกวิญญาณจุติ · '+(R.sh|0)+'/'+RBN,(ok?'เก็บครบ '+RBN+' ก้อน + ทอง '+RBG.toLocaleString()+' แล้วไปที่แท่นจุติในค่าย':'เริ่มดรอปเมื่อ Lv 99 และเปลี่ยนอาชีพขั้น 2 แล้ว')+'<br>ดรอปจาก: บอส MVP · บอสดันเจี้ยนเนื้อเรื่อง · บอสโลก (ถ้าไม่ตก โอกาสครั้งต่อไปจะสูงขึ้น)')}
  return''}
setTimeout(()=>{try{
  const _c=sgGdCells;window.sgGdCells=sgGdCells=function(sel){return _c.apply(this,arguments)+xgCells(sel)};
  const _n=sgGdNote;window.sgGdNote=sgGdNote=function(sel){if(typeof sel==='string'&&sel.slice(0,2)==='xg')return xgNote(sel);return _n.apply(this,arguments)};
}catch(e){console.warn('xg init',e)}},340);
