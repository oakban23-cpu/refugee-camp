/* ---------- v574 จุติแล้วเดินเนื้อเรื่องต่อได้ ----------
   ปัญหา: จุติแล้วเลเวลกลับเป็น 1 แต่เนื้อเรื่องคงเดิม → เควสขั้นถัดไป (ต้อง Lv สูงสุด 99) และประตูวาร์ป (ต้อง Lv สูงสุด 99) ล็อกซ้ำ ทั้งที่เคยผ่าน Lv 99 มาแล้ว
   ใหม่: lvOk(n) — ตัวละครจุติแล้วผ่านเงื่อนไขเลเวลเนื้อเรื่อง/ประตู/ดันเนื้อเรื่องที่ ≤ Lv 99 (เกินนั้นยังต้องถึงจริง)
   · ออโต้เควส: ถ้ามอนแมพเควสแรงกว่าเราเกิน RBQ.gap เลเวล → พาไปเก็บเลเวลในแมพที่เหมาะก่อน (เดินเองไปทำเควสได้ตลอด)
     กดปุ่ม «ไปต่อเลย» ในหน้าเควสเพื่อข้ามการเก็บเลเวล (RBQ.risk)
   · เข้าแมพที่มอนแรงกว่าเกิน RBQ.gap เลเวล → เตือนครั้งเดียวต่อแมพ */
function lvOk(n){n=+n||0;if(me.lv>=n)return true;return!!(me.rb&&n<=99)}
const RBQ={gap:8,risk:0,raw:0,warned:{}};
function rbMapLv(m){try{return WMLV[m]?WMLV[m][0]:0}catch(e){return 0}}
function rbFit(){let R={1:1};try{R=wmReach()}catch(e){}let best=1,bl=-1;
  for(const k in WMLV){const m=+k,L=WMLV[m];if(!R[m]||!FIELDM[m]||!MAPS[m]||L[0]>me.lv+3)continue;if(L[1]>bl){bl=L[1];best=m}}return best}
setTimeout(()=>{
  try{const _t=aqTarget;window.aqTarget=aqTarget=function(){const r=_t.apply(this,arguments);
      try{if(!me.rb||RBQ.risk||RBQ.raw||!AQ||AQ.src!=='st'||!r||r.none||!r.mp||r.mp>=10000)return r;
        const need=rbMapLv(r.mp);
        if(need&&me.lv<need-RBQ.gap){const f=rbFit();return{mp:f,act:'hunt',lb:'เก็บเลเวลก่อน · แมพเควสมอน Lv '+need+'+ (คุณ Lv '+me.lv+')',rbLv:need}}}catch(e){}
      return r}}catch(e){console.warn('rbq aq',e)}
  try{const _wq=wmQuestMap;window.wmQuestMap=wmQuestMap=function(){RBQ.raw=1;try{return _wq.apply(this,arguments)}finally{RBQ.raw=0}}}catch(e){console.warn('rbq wq',e)}
  try{const _em=enterMap;window.enterMap=enterMap=function(id){const r=_em.apply(this,arguments);
      try{if(me.rb&&id<10000&&!RBQ.warned[id]){const L=rbMapLv(id);if(L&&me.lv<L-RBQ.gap){RBQ.warned[id]=1;banner={s:'⚠️ มอนแมพนี้ Lv '+L+'+ แรงกว่าคุณ (Lv '+me.lv+') มาก — ระวังตัว',t:4}}}}catch(e){}
      return r}}catch(e){console.warn('rbq em',e)}
},1400);
/* ปุ่ม «ไปต่อเลย» ในข้อความออโต้เควสตอนพาไปเก็บเลเวล */
document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('[data-rbq]');if(!b)return;RBQ.risk=b.dataset.rbq==='1'?1:0;try{banner={s:RBQ.risk?'🏃 ออโต้เควสจะพาไปทำเควสเลย แม้มอนจะแรง':'🛡️ ออโต้เควสจะเก็บเลเวลก่อนถ้ามอนแรงเกิน',t:3}}catch(_){}try{rbqBtn()}catch(_){}});
function rbqBtn(){let b=document.getElementById('rbqb');const show=!!(me.cls&&me.rb&&AQ&&run&&ov.hidden&&!SD.on&&AQ.src==='st'&&(RBQ.risk||(()=>{try{const t=aqTarget();return t&&t.rbLv}catch(e){return false}})()));
  if(!b){if(!show)return;b=document.createElement('button');b.id='rbqb';b.style.cssText='position:absolute;left:50%;top:150px;transform:translateX(-50%);z-index:3;padding:6px 12px;font-size:12px;border-radius:14px;background:rgba(40,24,8,.88);border:1px solid #ffc860;color:#ffe9b0;white-space:nowrap';const a=$('tnb');(a&&a.parentNode||document.body).appendChild(b)}
  if(b.hidden!==!show)b.hidden=!show;if(!show)return;const tx=RBQ.risk?'🛡️ ให้เก็บเลเวลก่อน':'🏃 ไปทำเควสเลย (มอนแรง)';if(b.textContent!==tx)b.textContent=tx;b.dataset.rbq=RBQ.risk?'0':'1'}
setInterval(()=>{try{rbqBtn()}catch(e){}},700);
