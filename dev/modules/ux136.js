/* ===== v528 หน้าเลือกตัวละครโฉมใหม่ — จัดวางใหม่ทั้งแนวตั้ง/แนวนอน
   แนวตั้ง: เวทีตัวละครใหญ่ (สูงตามจอ) → แถบตัวละครเลื่อนแนวนอน → ปุ่มเล่นติดขอบล่าง → ข้อมูลอาชีพ/อุปกรณ์ → บัญชี/สำรองเซฟ
   แนวนอน (มือถือ แท็บเล็ต PC): 3 คอลัมน์เต็มจอ ไม่ต้องเลื่อนทั้งหน้า — รายชื่อตัวละครซ้าย · เวทีกลาง · ข้อมูล+ปุ่มเล่นขวา
   ช่องว่างหลายช่องรวมเป็นการ์ด «＋ สร้างตัวละคร» ใบเดียว · การ์ดตัวละครบอกอาชีพ · ตัวละครบนเวทีขยายตามขนาดเวที
   การ์ดคำแนะนำ (tip) ไม่ค้างทับหน้าต่าง · แทนที่ vwCs เดิม · ปิด CSV.on=0 → เลย์เอาต์เดิม ===== */
const CSV={on:1,err:'',n:0};
(function(){const css=`
#ov:has(>.csw.cs3){overflow-y:auto;overflow-x:hidden}
body #ov>.csw.cs3{max-width:560px;width:100%;margin:0 auto;padding:calc(10px + env(safe-area-inset-top,0px)) 14px calc(22px + env(safe-area-inset-bottom,0px));gap:10px;display:flex;flex-direction:column;align-items:stretch}
.cs3 .cs-top{padding-right:48px;min-height:40px}
.cs3 .cs-main{display:flex;flex-direction:column;gap:12px;min-width:0}
.cs3 .cs-roster,.cs3 .cs-side{display:flex;flex-direction:column;gap:8px;min-width:0}
.cs3 .cs-stage{order:1;border-radius:24px;border:1px solid rgba(255,214,140,.22);box-shadow:0 20px 50px rgba(0,0,0,.65),0 0 0 1px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,236,205,.12)}
.cs3 .cs-stage::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,236,205,.06),inset 0 -40px 60px -30px rgba(0,0,0,.6)}
.cs3 .cs-stage canvas{height:clamp(250px,45svh,440px)}
.cs3 .cs-roster{order:2}.cs3 .cs-side{order:3}
.cs3 .cs-h{display:flex;align-items:center;gap:8px;margin:0 2px;font-size:12px;letter-spacing:.08em;color:#cdb88f}
.cs3 .cs-h::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(231,183,90,.45),rgba(231,183,90,0))}
.cs3 .cs-roster .cs-cls{display:flex;gap:8px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;padding:2px 2px 8px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
.cs3 .cs-roster .cs-cls button{flex:0 0 86px;scroll-snap-align:start;padding:8px 4px 8px;border-radius:16px;gap:3px;background:linear-gradient(180deg,rgba(40,33,46,.9),rgba(20,17,24,.92));border:1.5px solid rgba(255,236,205,.12);overflow:hidden}
.cs3 .cs-roster .cs-cls button::before{content:'';position:absolute;left:0;right:0;top:0;height:3px;background:var(--cc);opacity:.75}
.cs3 .cs-roster .cs-cls button.on{transform:translateY(-2px)}
.cs3 .cs-roster .cs-cls img{max-width:62px;filter:drop-shadow(0 4px 6px rgba(0,0,0,.5))}
.cs3 .cs-roster .cs-cls small{font-size:11px;color:#f1e6d2}
.cs3 .cs-cl{display:block;font-size:9.5px;font-weight:700;line-height:1.15;color:var(--cc);filter:brightness(1.7) saturate(.8);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none}
.cs3 .cs-roster .cs-cls em{top:6px;right:5px}
.cs3 .cs-roster .cs-cls button.cs-emp{min-height:0;justify-content:center;background:rgba(23,20,27,.4)}
.cs3 .cs-emp b{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1.5px dashed rgba(231,183,90,.6);font-size:24px;margin-bottom:2px}
.cs3 .cs-act{position:sticky;bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:4;padding:8px;margin:0 -8px;border-radius:22px;background:linear-gradient(180deg,rgba(11,9,16,0),rgba(11,9,16,.86) 30%);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}
.cs3 .cs-go{position:relative;overflow:hidden;text-shadow:0 1px 0 rgba(255,255,255,.35)}
.cs3 .cs-go:not(:disabled)::after{content:'';position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.45),rgba(255,255,255,0));animation:csShine 3.4s ease-in-out infinite}
@keyframes csShine{0%,55%{left:-60%}100%{left:130%}}
.cs3 .cs-card{background:linear-gradient(180deg,rgba(32,27,38,.88),rgba(18,15,22,.9));border-color:rgba(255,236,205,.12)}
.cs3 .cs-more{display:flex;flex-direction:column;gap:10px}
.cs3 .cs-more>*{margin:0!important}
.cs3 .cs-nm{font-size:24px;letter-spacing:.01em}
.cs3 .cs-lv{border-color:rgba(231,183,90,.4);background:linear-gradient(180deg,rgba(40,30,16,.75),rgba(10,8,14,.7))}
body:has(#ov:not([hidden])>.csw) #tipc,body:has(#ov:not([hidden])>.csw) #wnp{display:none!important}
@media (orientation:landscape) and (min-width:600px){
  #ov:has(>.csw.cs3){overflow:hidden}
  body #ov>.csw.cs3{max-width:1480px;height:100%;box-sizing:border-box;padding:calc(8px + env(safe-area-inset-top,0px)) max(14px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(14px,env(safe-area-inset-left,0px));display:grid;grid-template-rows:auto minmax(0,1fr);gap:8px}
  .cs3 .cs-main{display:grid;grid-template-columns:minmax(150px,21%) minmax(0,1fr) minmax(270px,33%);gap:12px;min-height:0;height:100%}
  .cs3 .cs-stage{grid-column:2;grid-row:1;height:100%;min-height:0}
  .cs3 .cs-stage canvas{height:100%!important}
  .cs3 .cs-roster{grid-column:1;grid-row:1;overflow-y:auto;min-height:0;padding-right:2px;scrollbar-width:thin}
  .cs3 .cs-side{grid-column:3;grid-row:1;overflow-y:auto;min-height:0;padding:0 2px 0 0;scrollbar-width:thin}
  .cs3 .cs-roster .cs-cls{flex-direction:column;overflow:visible;padding:0;gap:6px}
  .cs3 .cs-roster .cs-cls button{flex:0 0 auto;display:grid;grid-template-columns:46px minmax(0,1fr);grid-template-rows:auto auto;column-gap:8px;align-items:center;justify-items:start;text-align:left;padding:5px 50px 5px 6px;min-height:58px}
  .cs3 .cs-roster .cs-cls button::before{top:0;bottom:0;right:auto;width:3px;height:auto}
  .cs3 .cs-roster .cs-cls button.on{transform:translateX(3px)}
  .cs3 .cs-roster .cs-cls img{grid-row:1/3;width:46px;max-width:46px}
  .cs3 .cs-roster .cs-cls small{display:block;font-size:12.5px;text-align:left;align-self:end;justify-self:stretch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cs3 .cs-cl{align-self:start;justify-self:stretch;text-align:left;font-size:10.5px}
  .cs3 .cs-roster .cs-cls em{top:50%;transform:translateY(-50%);right:7px}
  .cs3 .cs-roster .cs-cls button.cs-emp{grid-template-columns:46px minmax(0,1fr);min-height:50px;padding-right:8px}
  .cs3 .cs-emp b{grid-row:1/3;width:34px;height:34px;font-size:20px;margin:0 6px}
  .cs3 .cs-act{order:-1;position:static;margin:0;padding:0;background:none;-webkit-backdrop-filter:none;backdrop-filter:none}
  .cs3 .cs-side .cs-namebox{order:-2}
  .cs3 .cs-nm{font-size:clamp(20px,2.4vw,34px)}
  .cs3 .cs-lv b{font-size:clamp(22px,2.4vw,34px)}
}
@media (orientation:landscape) and (min-width:600px) and (max-height:500px){
  body #ov>.csw.cs3{gap:5px}
  .cs3 .cs-top{min-height:0}.cs3 .cs-lg{font-size:19px}.cs3 .cs-lg small{display:none}.cs3 .cs-net p{font-size:9.5px;padding:1px 7px}
  .cs3 .cs-main{gap:8px;grid-template-columns:minmax(140px,22%) minmax(0,1fr) minmax(250px,36%)}
  .cs3 .cs-roster .cs-cls button{min-height:48px;grid-template-columns:38px minmax(0,1fr)}.cs3 .cs-roster .cs-cls img{width:38px;max-width:38px}
  .cs3 .cs-roster .cs-cls small{font-size:11.5px}
  .cs3 .cs-go{padding:11px 14px!important;font-size:15px!important}
  .cs3 .cs-card{padding:9px 11px;gap:7px}.cs3 .cs-d{font-size:12px;line-height:1.45}
  .cs3 .cs-side .cs-cls img{max-width:40px}
  .cs3 .cs-h{font-size:11px}.cs3 .cs-h span{display:none}
  .cs3 .cs-roster .cs-cls button{padding:4px 6px 4px 5px;column-gap:6px}
  .cs3 .cs-roster .cs-cls small,.cs3 .cs-cl{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cs3 .cs-roster .cs-cls em{top:auto;bottom:3px;right:4px;transform:none;font-size:8.5px;padding:0 4px}
  .cs3 .cs-roster .cs-cls button[data-cs] .cs-cl{padding-right:30px;box-sizing:border-box}
}
@media (orientation:landscape) and (min-width:600px) and (max-width:780px){
  .cs3 .cs-main{grid-template-columns:150px minmax(0,1fr) 240px}
}
@media (orientation:landscape) and (min-width:1100px) and (min-height:700px){
  .cs3 .cs-main{grid-template-columns:minmax(220px,19%) minmax(0,1fr) minmax(340px,30%);gap:18px}
  .cs3 .cs-lg{font-size:30px}
}
`;const s=document.createElement('style');s.id='cs3css';s.textContent=css;document.head.appendChild(s)})();

function csLay(){if(!CSV.on)return;const w=ov&&ov.querySelector(':scope>.csw');if(!w||w.dataset.lay)return;
  try{/* ถอดเลย์เอาต์เดิม (vwcsL/R) ถ้ามี */for(const c of[...w.querySelectorAll(':scope>.vwcsL,:scope>.vwcsR')]){for(const k of[...c.children])w.appendChild(k);c.remove()}
    const kids=[...w.children],top=kids.find(c=>c.classList.contains('cs-top')),stage=kids.find(c=>c.classList.contains('cs-stage'));
    const main=document.createElement('div');main.className='cs-main';const ro=document.createElement('div');ro.className='cs-roster';const sd=document.createElement('div');sd.className='cs-side';const mo=document.createElement('div');mo.className='cs-more';
    /* แถบตัวละคร = หัวข้อ + กริดตัวละคร (โหมดเลือก) · โหมดสร้างใหม่: กริดอาชีพอยู่แถบซ้ายด้วย */
    for(const c of kids){if(c===top||c===stage)continue;
      if(c.classList.contains('cs-h')||c.classList.contains('cs-cls'))ro.appendChild(c);
      else if(c.classList.contains('cs-namebox')||c.classList.contains('cs-act')||c.classList.contains('cs-card'))sd.appendChild(c);
      else mo.appendChild(c)}
    /* ช่องว่างหลายช่อง → การ์ดเดียว */
    const emp=[...ro.querySelectorAll('.cs-emp')];emp.slice(1).forEach(b=>b.remove());if(emp[0]){const s=emp[0].querySelector('small');if(s)s.textContent='สร้างตัวละคร'}
    /* การ์ดตัวละคร: บอกอาชีพ */
    ro.querySelectorAll('button[data-cs]').forEach(b=>{if(b.querySelector('.cs-cl'))return;const k=b.dataset.cs;let n='';try{const sv=saves.chars[k],c=scls(k),c2=csC2(c,sv);n=sv&&sv.rb&&CL3[c]?cl3N(c,sv.cls2?(sv.br===2?2:1):1):c2===2&&CL2B[c]?CL2B[c].n:c2===1&&CL2[c]?CL2[c].n:CL[c].n}catch(e){}
      if(n){const s=document.createElement('span');s.className='cs-cl';s.textContent=n;const sm=b.querySelector('small');if(sm)sm.after(s);else b.appendChild(s)}});
    if(mo.children.length)sd.appendChild(mo);
    if(stage)main.appendChild(stage);main.appendChild(ro);main.appendChild(sd);
    w.textContent='';if(top)w.appendChild(top);w.appendChild(main);w.classList.add('cs3');w.dataset.lay='1';CSV.n++;
    /* เลื่อนการ์ดที่เลือกให้อยู่ในจอ */
    const on=ro.querySelector('.cs-cls button.on');if(on)try{on.scrollIntoView({block:'nearest',inline:'nearest'})}catch(e){}
    try{csKick()}catch(e){}}
  catch(e){CSV.err=String(e&&e.stack||e).slice(0,300)}}
{const old=vwCs;vwCs=function(){if(CSV.on){try{csLay()}catch(e){CSV.err=String(e).slice(0,200)}return}return old.apply(this,arguments)};CSV.old=old}
/* การ์ดคำแนะนำที่โผล่ก่อนเปิดหน้าต่าง: ซ่อน และถ้าเพิ่งโผล่ไม่ถึง 3 วิ ให้แสดงใหม่ภายหลัง */
setInterval(()=>{try{const c=document.getElementById('tipc');if(!c||c.hidden||ov.hidden)return;if(typeof TIPS!=='undefined'&&TIPS.cur&&TIPS.hide-performance.now()>6000){try{tipSeen().delete(TIPS.cur);lsSet('refugee_tips',JSON.stringify([...TIPSEEN]))}catch(e){}}c.hidden=true}catch(e){}},250);
