/* ---------- v358 ปุ่มซ่อน/แสดงช่องแชทบนจอ ----------
   · ปุ่ม «✕ ซ่อนแชท» ใต้ข้อความล่าสุด → ซ่อนข้อความผู้เล่น (ข้อความระบบยังขึ้นสั้น ๆ ตามเดิม)
   · ตอนซ่อนเหลือปุ่มเล็ก «💬 แชท» + จำนวนข้อความใหม่ → แตะเพื่อแสดงกลับ
   · ระหว่างเปิดช่องพิมพ์ (💬 บนแถบบน) แชทจะแสดงชั่วคราวให้เห็นบทสนทนา
   · จำค่าไว้ในเครื่อง (refugee_clogmin) */
var CLG={min:false,n:0};try{CLG.min=localStorage.getItem('refugee_clogmin')==='1'}catch(e){}
function clogHid(){if(!CLG.min)return false;const b=$('cbar');return!b||b.hidden}
function clogSet(v){CLG.min=!!v;CLG.n=0;try{localStorage.setItem('refugee_clogmin',CLG.min?'1':'0')}catch(e){}logSig='';try{sfx('click')}catch(e){}renderLog()}
function clogPill(el,CM){const hasP=chatLog.some(l=>!l.sys);if(!CM&&!hasP)return;const d=document.createElement('div');d.className='clp'+(CM?'':' clx');d.setAttribute('role','button');
  if(CM){d.textContent='💬 แชท';d.title='แสดงแชท';if(CLG.n){const b=document.createElement('b');b.textContent=CLG.n>99?'99+':String(CLG.n);d.appendChild(b)}}else{d.textContent='✕ ซ่อนแชท';d.title='ซ่อนข้อความแชทบนจอ'}
  const stop=e=>e.stopPropagation();d.addEventListener('pointerdown',stop);d.addEventListener('mousedown',stop);d.addEventListener('touchstart',stop,{passive:true});
  d.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();clogSet(!CM)});el.appendChild(d)}
{const s=document.createElement('style');s.textContent=
  '#clog .clp{align-self:flex-start;pointer-events:auto;cursor:pointer;display:inline-flex;align-items:center;gap:5px;min-height:22px;box-sizing:border-box;padding:2px 10px!important;border-radius:11px!important;'
 +'font-size:11px!important;font-weight:700;color:#f3d08a;background:rgba(12,10,16,.66)!important;border:1px solid rgba(243,208,138,.5);-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;white-space:nowrap}'
 +'#clog .clp.clx{color:#e8dcc0;border-color:rgba(232,220,192,.32);opacity:.78!important}'
 +'#clog .clp:active{transform:scale(.95)}'
 +'#clog .clp b{color:#fff;background:#c0392b;border-radius:8px;padding:0 5px;font-size:10px;line-height:15px;font-weight:800}';
  document.head.appendChild(s)}
