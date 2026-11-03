/* ---------- v586 บัญชีเดียวเล่นได้ทีละเครื่อง + ดึงเซฟล่าสุดก่อนเข้าตัวละคร ----------
   · กดเข้าตัวละคร → ขอสิทธิ์เล่น (claim) จากเซิร์ฟเวอร์ + ดึงเซฟล่าสุด → รวมกับในเครื่องโดยเลือกตัวที่ก้าวหน้ากว่า (จุติ > เลเวล > EXP)
   · อีกเครื่องที่เล่นค้างอยู่ → บันทึกครั้งถัดไปถูกเซิร์ฟเวอร์ปฏิเสธ → ขึ้นหน้าต่าง "เล่นจากอีกเครื่อง" หยุดบันทึกทันที (ไม่ทับเซฟ) → โหลดใหม่
   · ต่อเซิร์ฟเวอร์ไม่ได้ตอนกดเข้า → เข้าเล่นด้วยเซฟในเครื่องตามเดิม */
const ASES={sid:null,kick:0,busy:0};
function asesKick(){if(ASES.kick)return;ASES.kick=1;try{run=false}catch(e){}try{setSaveState('หยุดบันทึก: บัญชีนี้เล่นอยู่อีกเครื่อง')}catch(e){}
  const d=document.createElement('div');d.id='asesk';d.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(8,6,4,.86);display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui';
  d.innerHTML='<div style="max-width:340px;background:#2a1c10;border:2px solid #c99a3b;border-radius:14px;padding:18px 16px;color:#f0e6d2;text-align:center;line-height:1.55"><div style="font-size:30px">📱↔️💻</div><div style="font-weight:700;font-size:16px;margin:6px 0 8px;color:#ffd890">บัญชีนี้กำลังเล่นจากอีกเครื่อง</div><div style="font-size:13px;opacity:.9">เครื่องนี้หยุดบันทึกแล้ว เพื่อไม่ให้เลเวล/ของของคุณถูกเซฟเก่าทับ<br>ความคืบหน้าล่าสุดอยู่ที่เครื่องที่เข้าเล่นทีหลัง</div><button id="asesb" style="margin-top:14px;padding:10px 18px;border-radius:10px;border:0;background:#c99a3b;color:#1a1008;font-weight:700;font-size:14px">โหลดเกมใหม่ (ดึงเซฟล่าสุด)</button></div>';
  document.body.appendChild(d);d.querySelector('#asesb').onclick=()=>location.reload()}
setTimeout(()=>{try{const _pk=pick;window.pick=pick=function(c,slot,nm){if(ASES.kick)return;
    if(ASES.busy||!ACC||!srvAcc()||saveMode==='wait'||saveMode==='off')return ASES.busy?undefined:_pk.apply(this,arguments);
    ASES.busy=1;try{setSaveState('กำลังดึงเซฟล่าสุดจากเซิร์ฟเวอร์...')}catch(e){}const self=this;
    withTimeout(accApi('claim',{a:ACC.a,t:ACC.t}),7000).then(r=>{if(r.status===401){accLost();return}if(!r.ok)return;ASES.sid=r.sid||null;
        const srv=cleanSaves(r.data&&r.data.chars?r.data:{v:1,chars:{}});saves=accMerge(srv,saves,null);accRev=r.rev|0;accLoaded=true;lsWrite(saves);accDirty=JSON.stringify(saves.chars)!==JSON.stringify(srv.chars)})
      .catch(()=>{}).finally(()=>{ASES.busy=0;try{_pk.call(self,c,slot,nm)}catch(e){console.warn('pick',e)}if(accDirty)setTimeout(()=>{try{accPush()}catch(e){}},400)})}}catch(e){console.warn('ases',e)}},0);
