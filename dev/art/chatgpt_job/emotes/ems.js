/* ---------- v652 สติกเกอร์อีโมตภาพวาด (EMS) ----------
   · ท่าทาง 14 อัน (10 ท่าเดี่ยว · ไฮไฟว์ กอด โพสคู่ · โหมดถ่ายรูป) เปลี่ยนจากอีโมจิของมือถือเป็นสติกเกอร์ชุดเดียวกัน
     มาสคอตหัวกลมจิบิตัวเดียวกันทุกอัน ขอบขาวแบบสติกเกอร์ · atlas hd-emo.webp 7×2 ช่องละ 128
   · แผงเลือกท่า: ไอคอนในปุ่มเป็นสติกเกอร์ · ฟองเหนือหัวตอนทำท่า: สติกเกอร์ใหญ่ขึ้นแทนฟองขาว+อีโมจิ · ท่าคู่: สติกเกอร์ลอยเหนือคู่
   · โหลดภาพไม่ได้ → อีโมจิเดิม · ปิด: EMS.off=1 */
const EMS={off:0,ok:0,err:'',im:null,dr:0,
  K:{wave:0,dance:1,sit:2,bow:3,laugh:4,love:5,cheer:6,thumb:7,cry:8,angry:9,hf:10,hg:11,ps:12,photo:13}};
(function(){const im=new Image();im.decoding='async';im.onload=()=>{EMS.ok=1;try{emsPanel()}catch(e){}};im.onerror=()=>{EMS.err='hd-emo.webp'};im.src='hd-emo.webp';EMS.im=im})();
/* วาดสติกเกอร์ลง canvas เกม (ศูนย์กลาง x,y ขนาด s) · คืน false ถ้ายังใช้ไม่ได้ ให้ผู้เรียกวาดอีโมจิเดิม */
function emsDraw(k,x,y,s){if(EMS.off||!EMS.ok)return false;const i=EMS.K[k];if(i==null)return false;EMS.dr++;g.drawImage(EMS.im,(i%7)*128,(i/7|0)*128,128,128,x-s/2,y-s/2,s,s);return true}
function emsIcon(k,sz){const i=EMS.K[k];sz=sz||30;return'<i class="emsi" style="width:'+sz+'px;height:'+sz+'px;background-size:'+(sz*7)+'px '+(sz*2)+'px;background-position:-'+((i%7)*sz)+'px -'+((i/7|0)*sz)+'px"></i>'}
function emsPanel(){if(EMS.off||!EMS.ok)return;const p=document.getElementById('emp');if(!p||p.hidden)return;
  if(!document.getElementById('emscss')){const s=document.createElement('style');s.id='emscss';s.textContent='#emp i.emsi{display:block;background-image:url(hd-emo.webp);background-repeat:no-repeat;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.45))}#emp button.emsb{gap:2px;padding-top:4px}#emp button.emsb:active i.emsi{transform:scale(.9)}';document.head.appendChild(s)}
  p.querySelectorAll('button[data-emo],button[data-pe]').forEach(b=>{if(b.classList.contains('emsb'))return;const k=b.dataset.pe||(EMO_L[+b.dataset.emo]||[])[0];if(EMS.K[k]==null)return;const sp=b.querySelector('span');if(!sp)return;sp.outerHTML=emsIcon(k);b.classList.add('emsb')})}
setTimeout(()=>{try{const o=emoToggle;window.emoToggle=emoToggle=function(){const r=o.apply(this,arguments);try{emsPanel()}catch(e){console.warn('ems',e)}return r}}catch(e){console.warn('ems',e)}},3000);
