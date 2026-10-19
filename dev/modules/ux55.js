
/* ===== v438 · หอคอยหยุดเวลารอทั้งปาร์ตี้ · ช่วงปลอดภัยหลังฉากเนื้อเรื่อง ===== */
/* ---------- ① หอคอย: เพื่อนในห้องที่ยังเลือกพรเริ่มต้นอยู่ ส่งสัญญาณให้โฮสต์หยุดเวลารอ ----------
   ทุกเครื่องที่เปิดหน้าเลือก «พรเริ่มต้นก่อนปีน» ส่ง fx 'blpk' on:1 ทุก 1 วิ · ปิดแล้วส่ง on:0
   โฮสต์หยุดเวลา/ยังไม่ปล่อยมอน ถ้ามีใครยังเลือกอยู่ (สัญญาณใหม่กว่า 2.5 วิ) — รวมแล้วไม่เกิน 16 วินับจากเริ่มปีน */
const U55={pk:{},sent:0,last:0,sg:0};
try{handleFx=(f=>function(o){if(o&&o.k==='blpk'){try{if(typeof o.by==='string'&&o.by!==uid){if(o.on)U55.pk[o.by]=performance.now();else delete U55.pk[o.by]}}catch(e){}return}return f.apply(this,arguments)})(handleFx)}catch(e){}
function u55MatePick(){const n=performance.now();let any=false;for(const u in U55.pk){if(n-U55.pk[u]>2500){delete U55.pk[u];continue}if(others[u])any=true}return any}
setInterval(()=>{try{const p=me.blPick,on=!!(p&&p.why==='พรเริ่มต้นก่อนปีน'&&isTw()&&dg&&dg.ph==='run');const n=performance.now();
  if(on&&n-U55.last>1000){U55.last=n;U55.sent=1;fx({k:'blpk',on:1})}
  else if(!on&&U55.sent){U55.sent=0;fx({k:'blpk',on:0})}
  if(!isTw())U55.pk={}}catch(e){}},250);
try{const _bp=u54BlPause;u54BlPause=function(){if(_bp())return true;try{if(!isTw()||!dg||dg.ph!=='run')return false;const n=performance.now();if(!U54.rs||n-U54.rs>16000)return false;return u55MatePick()}catch(e){return false}}}catch(e){}
/* ป้ายในหน้าเลือกพรของโฮสต์: บอกว่ารอเพื่อนอยู่ */
setInterval(()=>{try{if(!isTw()||!isHost()||!U54.bp)return;const el=$('blpk');const t=$('u55w')||(()=>{const d=document.createElement('div');d.id='u55w';d.style.cssText='position:fixed;left:50%;top:118px;transform:translateX(-50%);z-index:30;background:rgba(20,14,34,.88);border:1px solid #b48cff;border-radius:999px;padding:4px 12px;color:#efe4ff;font-size:12px;pointer-events:none';document.body.appendChild(d);return d})();
  const w=u55MatePick()&&!(me.blPick);t.textContent='⏸ รอเพื่อนเลือกพรเริ่มต้น…';t.hidden=!w}catch(e){}},300);
setInterval(()=>{try{const t=$('u55w');if(t&&(!isTw()||!U54.bp||me.blPick||!u55MatePick()))t.hidden=true}catch(e){}},300);

/* ---------- ② ช่วงปลอดภัยหลังฉากเนื้อเรื่อง ----------
   ระหว่างบทสนทนาเนื้อเรื่องไม่โดนตีอยู่แล้ว (hurt เช็ก SD.on) แต่พอแตะปิด มอนที่รุมอยู่ตีทันที
   → หลังปิดบทสนทนา ไม่โดนดาเมจอีก 1.5 วิ ให้มีเวลาตั้งตัว */
try{stClose=(f=>function(){const was=SD.on;const r=f.apply(this,arguments);try{if(was&&me.cls)U55.sg=performance.now()+1500}catch(e){}return r})(stClose)}catch(e){}
try{hurt=(f=>function(d){if(U55.sg>performance.now())return;return f.apply(this,arguments)})(hurt)}catch(e){}
