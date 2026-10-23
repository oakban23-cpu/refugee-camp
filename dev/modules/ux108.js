/* ---------- v496 เพดานสเตตัส: ส่วนเกินไม่เสียเปล่า ----------
   · ลดดาเมจที่ได้รับ เพดาน 60% → ส่วนเกินแปลงเป็นเลือดสูงสุด 1:1 (เกิน 10% = เลือด +10%)
   · คริ เพดาน 100% → ส่วนเกินแปลงเป็นดาเมจคริ 40% (เดิม 15%) + ดาเมจสุดท้าย 6% เท่าเดิม (R-patch crD)
   · ความเร็วโจมตี เพดาน +300% (ตีปกติเร็วสุด 4 เท่าของพื้นฐาน) → ส่วนเกินแปลงเป็นแรงตีปกติ ดาเมจต่อวินาทีเท่าเดิม (R-patch การตีปกติ)
   · ความเร็วเดิน เพดานนุ่ม: ส่วนที่เกิน +100% ได้ครึ่งเดียว
   · หน้าตัวละคร → สเตตัส แสดงลดดาเมจ/ดูดเลือด + ป้ายชนเพดาน + บรรทัดบอกส่วนเกินแปลงเป็นอะไร
   · ฉายาทองที่ให้เลือด/ลดดาเมจ/ความเร็วเดินตรง ๆ (นักสำรวจแผ่นดินเงา · นักสำรวจรากพิภพ · ผู้จุดดาว · นักสำรวจฟ้าตะวันตก) มีผลจริงแล้ว (R-patch ttAgg) */
const CAPS={red:.6,ls:.3,cr:1,as:3,spSoft:1,crOv:.4};
const mRaw=k=>{try{return CAPS.M0?CAPS.M0(k):0}catch(e){return 0}};
const redRaw=()=>mRaw('red'),redOv=()=>Math.max(0,redRaw()-CAPS.red);
const asRaw=()=>mRaw('as'),asV=()=>Math.min(CAPS.as,asRaw()),asOvM=()=>{const r=asRaw();return r>CAPS.as?(1+r)/(1+CAPS.as):1};
const spRaw=()=>mRaw('sp'),spV=()=>{const s=spRaw();return s>CAPS.spSoft?CAPS.spSoft+(s-CAPS.spSoft)*.5:s};
{const _M=M;CAPS.M0=_M;window.M=M=function(k){
  if(k==='as'){const v=_M(k);return v>CAPS.as?CAPS.as:v}
  if(k==='sp'){const s=_M(k);return s>CAPS.spSoft?CAPS.spSoft+(s-CAPS.spSoft)*.5:s}
  if(k==='hp'){const v=_M(k);if(!me.cls)return v;return v+Math.max(0,_M('red')-CAPS.red)}
  return _M(k)}}
/* ค่าดูดเลือดก่อนเพดาน (ใน M เดิมตัดที่ 30% ไปแล้ว) — คิดเฉพาะเพื่อแสดงผล */
function lsUncapped(){if(!me.cls)return 0;let t=0;try{nodes().forEach(n=>{if(n.k==='ls')t+=(me.tr[n.id]||0)*n.v});if(me.rage>0&&!(me.rnBlood>0||me.rnRock>0))t+=.1;
  t+=fdM('ls')+G('ls')+A('ls')+setB('ls')+petV('ls')+cardM('ls')+titleM('ls')+cmpM('ls')+starM('ls')+astM('ls')+brM('ls')+blM('ls')}catch(e){}return t}
const pc1=v=>Math.round(v*1000)/10;
function capChips(){if(!me.cls)return'';const rr=redRaw(),rv=Math.min(CAPS.red,Math.max(0,rr)),lsu=lsUncapped(),lsv=Math.min(CAPS.ls,Math.max(0,lsu));
  const lk=(on)=>on?' <i class="capk">🔒</i>':'';
  return'<span class="ch'+(rr>=CAPS.red?' capx':'')+'">🛡️ ลดดาเมจ <b>'+pc1(rv)+'%</b>'+lk(rr>=CAPS.red)+'</span>'+(lsu>0?'<span class="ch'+(lsu>=CAPS.ls?' capx':'')+'">🩸 ดูดเลือด <b>'+pc1(lsv)+'%</b>'+lk(lsu>=CAPS.ls)+'</span>':'')}
function capNote(){if(!me.cls)return'';const o=[];
  const ro=redOv();if(ro>.0005)o.push('🛡️ ลดดาเมจเกินเพดาน 60% อยู่ '+pc1(ro)+'% → <b>เลือดสูงสุด +'+pc1(ro)+'%</b>');
  const cr=crRaw();if(cr>1.0005)o.push('🎯 คริเกิน 100% อยู่ '+pc1(cr-1)+'% → <b>ดาเมจคริ +'+pc1((cr-1)*CAPS.crOv)+'%</b> · ดาเมจสุดท้าย +'+pc1((cr-1)*.06)+'%');
  const ar=asRaw();if(ar>CAPS.as+.0005)o.push('⚡ ความเร็วโจมตีเกิน +300% อยู่ '+pc1(ar-CAPS.as)+'% → <b>ตีปกติแรงขึ้น ×'+(Math.round(asOvM()*100)/100)+'</b> (ดาเมจต่อวินาทีเท่าเดิม)');
  const sr=spRaw();if(sr>CAPS.spSoft+.0005)o.push('👟 ความเร็วเดินเกิน +100% อยู่ '+pc1(sr-CAPS.spSoft)+'% → ได้ครึ่งเดียว (+'+pc1((sr-CAPS.spSoft)*.5)+'%)');
  const lu=lsUncapped();if(lu>CAPS.ls+.0005)o.push('🩸 ดูดเลือดเกินเพดาน 30% อยู่ '+pc1(lu-CAPS.ls)+'% (ส่วนเกินไม่มีผล)');
  try{const gc=[['cdr','ลดคูลดาวน์',.25],['mcr','ลดมานาสกิล',.25],['spw','พลังสกิลจากอุปกรณ์',.4],['hpw','พลังฮีลจากอุปกรณ์',.4]].filter(([k,,c])=>CAPS.M0(k)>c+.0005).map(([,n])=>n);if(gc.length)o.push('🧰 '+gc.join(' · ')+' ชนเพดานแล้ว (ส่วนที่ตีบวกเกินไม่มีผล)')}catch(e){}
  return o.length?'<div class="capn"><b>🔒 ค่าที่ชนเพดาน</b>'+o.map(t=>'<div>'+t+'</div>').join('')+'</div>':''}
(()=>{const st=document.createElement('style');st.textContent='.sk2top .tot .ch.capx{background:rgba(255,196,80,.16);color:#ffd48a;box-shadow:inset 0 0 0 1px rgba(255,196,80,.35)}.capk{font-style:normal;font-size:10px}.capn{grid-column:1/-1;margin-top:4px;padding:6px 9px;border-radius:10px;background:rgba(255,196,80,.08);border:1px solid rgba(255,196,80,.28);font-size:11.5px;line-height:1.5;color:var(--u-mute,#c8c0b0)}.capn b{color:#ffd48a}.capn>b:first-child{display:block;font-size:12px;margin-bottom:1px}';document.head.appendChild(st)})();
