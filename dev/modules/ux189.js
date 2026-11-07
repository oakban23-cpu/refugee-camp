/* ---------- v612 คอกสัตว์: พาหนะที่ได้จากเนื้อเรื่อง ไม่ขึ้นปุ่มซื้อ ----------
   เดิมกันไว้แค่เรือเหาะจิ๋ว (ภาค 8) → ดาวหางเงิน (ภาค 9) · ด้วงแบกฟ้า (ภาค 10) ยังขึ้น «ซื้อ/Lv» กดแล้วบอกผิดว่าได้จากภาค 8
   ตอนนี้ทุกตัวที่มี st (ได้จากเนื้อเรื่อง) ขึ้นป้าย «📜 จบภาค N» และข้อความตอนกดบอกภาคที่ถูก */
function mtStCh(M){const m=/จบภาค\s*(\d+)/.exec(M&&M.d||'');return m?m[1]:''}
setTimeout(()=>{try{
  const _mu=mountUI;window.mountUI=mountUI=function(){const r=_mu.apply(this,arguments);try{ov.querySelectorAll('button[data-mtb]').forEach(b=>{const id=+b.dataset.mtb,M=MOUNTS[id];if(!M||!M.st)return;const ch=mtStCh(M);if(!ch)return;b.disabled=true;b.removeAttribute('data-mtb');b.textContent='📜 จบภาค '+ch})}catch(e){}return r};
  const _mb=mountBuy;window.mountBuy=mountBuy=function(id){const M=MOUNTS[id],ch=mtStCh(M);if(M&&M.st&&ch)return mountUI('📜 '+M.n+' ได้จากการจบภาค '+ch);return _mb.apply(this,arguments)};
}catch(e){console.warn('mtst',e)}},2300);
