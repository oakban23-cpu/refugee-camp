/* ---------- v569 ตัววัดความลื่นละเอียด (เครื่องจริงของผู้เล่น) + ความละเอียดปรับเอง ----------
   · แยกเวลาต่อเฟรม: คำนวณเกม (advance) · ปุ่ม/หน้าจอ (DOM ระหว่างคำนวณกับวาด) · วาด · อื่น ๆ (เบราว์เซอร์/การ์ดจอ = เวลาเฟรม − 3 ส่วนแรก)
   · 🔬 วัดละเอียด 10 วิ: JS Self-Profiling API (เซิร์ฟเวอร์ส่ง Document-Policy: js-profiling) → ฟังก์ชันที่กินเวลาสูงสุดบนเครื่องจริง + สัดส่วนเวลานอก JS
   · กราฟิก «สูง»: เฟรมช้า (เฉลี่ย > 30 ms) ติดกัน → ลดความละเอียดทีละ 0.25 จนถึง ×2 · ลื่น (< 20 ms) ติดกัน 4 รอบ → เพิ่มคืน
   · «อัตโนมัติ»: เครื่องที่ไม่ใช่สเปกต่ำก็ลดเป็นประหยัดได้ถ้าต่ำกว่า 30 FPS ติดกัน 3 รอบ (เดิมเฉพาะเครื่องสเปกต่ำ) */
const PFX={prof:null,busy:0};
function pfStage(){/* เรียกจาก loop (p569) */}
/* โปรไฟล์บนเครื่องจริง */
async function pfProfile(sec){if(PFX.busy)return;if(typeof Profiler!=='function'){perfUI('เครื่อง/เบราว์เซอร์นี้วัดละเอียดไม่ได้ (ไม่รองรับ JS Self-Profiling) · ส่งผลแบบปกติได้เลย');return}
  let P;try{P=new Profiler({sampleInterval:10,maxBufferSize:Math.round(sec*120)})}catch(e){perfUI('เปิดตัววัดละเอียดไม่ได้: '+String(e&&e.message||e).slice(0,80));return}
  PFX.busy=1;const k0=pfKey(),t0=performance.now(),f0=PF.fr.length;ov.hidden=true;banner={s:'🔬 กำลังวัดละเอียด '+sec+' วิ · เล่นตามปกติ (ถ้าจะวัดตอนสู้ ให้สู้ช่วงนี้เลย)',t:3};
  await new Promise(r=>setTimeout(r,sec*1000));let tr;try{tr=await P.stop()}catch(e){PFX.busy=0;perfUI('วัดละเอียดไม่สำเร็จ');return}PFX.busy=0;
  const fr=tr.frames||[],st=tr.stacks||[],sm=tr.samples||[],self={},inc={};let js=0;
  const nm=i=>{const f=fr[i];if(!f)return'?';return(f.name||'(ไม่มีชื่อ)')+(f.line?':'+f.line:'')};
  for(const s of sm){if(s.stackId==null){continue}js++;const top=st[s.stackId];if(!top)continue;const a=nm(top.frameId);self[a]=(self[a]||0)+1;const seen=new Set();let q=s.stackId,d=0;
    while(q!=null&&d<80){const S=st[q];if(!S)break;const b=nm(S.frameId);if(!seen.has(b)){seen.add(b);inc[b]=(inc[b]||0)+1}q=S.parentId;d++}}
  const N=sm.length||1,top=(o,n)=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([k,v])=>[k,Math.round(v/N*1000)/10]);
  const L=pfLive();PFX.prof={k:k0,sec,n:sm.length,js:Math.round(js/N*100),self:top(self,14),inc:top(inc,24).filter(x=>!/^(loop|advance|draw|step|\(ไม่มีชื่อ\))/.test(x[0])).slice(0,12),fps:L?Math.round(L.fps):0,dpr:DPR,cv:cv.width+'×'+cv.height};
  try{localStorage.setItem('refugee_pfx',JSON.stringify(PFX.prof))}catch(e){}ov.hidden=false;perfUI('🔬 วัดละเอียดเสร็จแล้ว ('+k0+') · กด «คัดลอกผลไปส่ง» ได้เลย')}
try{const j=JSON.parse(localStorage.getItem('refugee_pfx')||'null');if(j&&j.self)PFX.prof=j}catch(e){}
function pfProfText(){const P=PFX.prof;if(!P)return[];return['🔬 วัดละเอียด: '+P.k+' · '+P.sec+' วิ · '+P.n+' ตัวอย่าง · '+P.fps+' FPS · ภาพ '+P.cv+' · ในโค้ดเกม '+P.js+'% (ที่เหลือ = เบราว์เซอร์/การ์ดจอ/ว่าง)',
  'ใช้เวลาเอง: '+P.self.map(x=>x[0]+' '+x[1]+'%').join(' · '),'รวมที่เรียกต่อ: '+P.inc.map(x=>x[0]+' '+x[1]+'%').join(' · ')]}
setTimeout(()=>{
  /* แยกเวลาต่อแมพ */
  try{const _pff=pfFrame;window.pfFrame=pfFrame=function(dt){_pff.apply(this,arguments);try{if(!me.cls||!run||!ov.hidden)return;const m=PF.maps[pfKey()];if(m){m.u=(m.u||0)+(PF.upd||0);m.ui=(m.ui||0)+(PF.ui||0)}}catch(e){}}}catch(e){}
  try{const _pr=pfRows;window.pfRows=pfRows=function(){const r=_pr.apply(this,arguments);try{r.forEach(x=>{const m=PF.maps[x.k];if(m&&m.n){x.u=(m.u||0)/m.n;x.ui=(m.ui||0)/m.n;x.o=Math.max(0,1000/x.fps-x.d-x.u-x.ui)}})}catch(e){}return r}}catch(e){}
  try{const _pt=pfText;window.pfText=pfText=function(){let t=_pt.apply(this,arguments);try{const L=pfLive();
      t=t.replace(/^(- .+?: \d+ FPS · วาด [\d.]+ ms)/gm,(a,b)=>{const k=b.slice(2,b.indexOf(':')),r=pfRows().find(x=>x.k===k);return r&&r.u!=null?b+' · คำนวณ '+r.u.toFixed(1)+' · ปุ่ม '+r.ui.toFixed(1)+' · อื่น '+r.o.toFixed(1):b});
      t=t.replace(/(ภาพเกม \S+)/,'$1 (x'+DPR+')');const ex=pfProfText();if(ex.length)t+='\n'+ex.join('\n')}catch(e){}return t}}catch(e){}
  try{const _pu=perfUI;window.perfUI=perfUI=function(msg){const r=_pu.apply(this,arguments);try{const P=PFX.prof;const h='<div class="card"><div class="cap">🔬 วัดละเอียด (หาจุดที่ช้าบนเครื่องนี้)</div><small style="display:block;opacity:.8;margin-bottom:6px">กดแล้วเล่นต่อตามปกติ 10 วิ ในฉากที่กระตุก (เช่น ตอนสู้หนัก/ในค่าย) · เสร็จแล้วกลับมาที่หน้านี้ กด «คัดลอกผลไปส่ง»</small>'
        +'<button class="pri" data-pf="prof" style="width:100%"'+(PFX.busy?' disabled':'')+'>'+(PFX.busy?'กำลังวัด…':'🔬 เริ่มวัดละเอียด 10 วิ')+'</button>'+(P?'<small style="display:block;margin-top:6px;opacity:.85">ล่าสุด: '+P.k+' · '+P.fps+' FPS · ในโค้ดเกม '+P.js+'% · สูงสุด: '+P.self.slice(0,4).map(x=>x[0].replace(/:\d+$/,'')+' '+x[1]+'%').join(' · ')+'</small>':'')+'</div>';
      const c=ov.querySelector('.pn .card');if(c)c.insertAdjacentHTML('afterend',h)}catch(e){}return r}}catch(e){}
  ov.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pf="prof"]');if(!b||ov.dataset.k!=='perf')return;e.stopPropagation();pfProfile(10)},true);
  /* ความละเอียดปรับเอง: ห่อ fpsTick เดิม (FQ.avg อัปเดตทุก 90 เฟรม) */
  try{const _ft=fpsTick;let seen=0;window.fpsTick=fpsTick=function(now){_ft.apply(this,arguments);try{if(FQ.avg&&FQ.avg!==seen&&FQ.n===0){seen=FQ.avg;pfResTick(FQ.avg)}}catch(e){}}}catch(e){}
},90);
function pfResTick(avg){if(document.hidden||!me.cls||!run||!ov.hidden)return;
  if(GQ==='high'){if(avg>30){PFX.rb=(PFX.rb|0)+1;PFX.rg=0;if(PFX.rb>=2&&HRS>2&&DPR0>2){HRS=Math.max(2,Math.min(DPR0,HRS)-.25);PFX.rb=0;applyQ();try{sysMsg('⚙️ กราฟิกสูง: ลดความละเอียดเป็น ×'+DPR+' ชั่วคราวเพื่อให้ลื่นขึ้น')}catch(e){}}}
    else if(avg<20){PFX.rg=(PFX.rg|0)+1;PFX.rb=0;if(PFX.rg>=4&&HRS<DPR0){HRS=Math.min(DPR0,HRS+.25);PFX.rg=0;applyQ()}}else{PFX.rb=0;PFX.rg=0}}
  else if(GQ==='auto'&&!LOWQ&&!LITEQ){if(avg>34){PFX.ab=(PFX.ab|0)+1;if(PFX.ab>=3){LOWQ=true;PFX.ab=0;applyQ();try{sysMsg('⚙️ ปรับกราฟิกเป็นโหมดประหยัดอัตโนมัติ เพื่อให้เล่นลื่นขึ้น')}catch(e){}}}else PFX.ab=0}}
setTimeout(()=>{try{const _sq=setGQ;window.setGQ=setGQ=function(q){HRS=9;PFX.rb=PFX.rg=PFX.ab=0;return _sq.apply(this,arguments)}}catch(e){}},90);
