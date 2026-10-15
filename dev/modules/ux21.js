/* ---------- v392 ประสบการณ์ผู้เล่นใหม่ 10 นาทีแรก ----------
   · บทสอนไม่ขวางเนื้อเรื่องอีก (ขวางเฉพาะ 3 ขั้นแรก) · ขั้นเปิดเมนูข้ามเองถ้าไม่ได้กด · ซ่อนกล่องบทสอนตอนเปิดเมนู/บทสนทนา + ปุ่มเป้าหมายเรืองแสง
   · เควสบอสแรก (ราชาหมอกพิษ) ต้อง Lv 5 · ระหว่างนั้นออโต้เควสล่ามอนเก็บเลเวลให้เอง
   · บอสแมพต้นเล่นคนเดียวตอน Lv < 20 ไม่คูณ ×3 · ออโต้เควสเดินไปหาบอสไม่ติดขอบค่าย
   · โบนัส EXP ผู้เล่นใหม่ (×2.5 ถึง Lv 5 · ×1.8 ถึง Lv 10 · ×1.3 ถึง Lv 15) · อาวุธ+เกราะเริ่มต้น · ดรอปอุปกรณ์ถี่ขึ้นช่วง Lv < 10 */
const NV_LV=[[5,2.5],[10,1.8],[15,1.3]];
function nvXp(){if(!me.cls||me.rb)return 1;for(const[l,m]of NV_LV)if(me.lv<l)return m;return 1}
function tutMnOpen(){const m=$('mnp');return!!(m&&!m.hidden)}
function nvCSS(){if($('nvcss'))return;const s=document.createElement('style');s.id='nvcss';
  s.textContent='@keyframes nvglow{0%,100%{outline-color:#ffd84a;box-shadow:0 0 10px 2px rgba(255,216,74,.55)}50%{outline-color:#fff6c8;box-shadow:0 0 22px 6px rgba(255,216,74,.9)}}.nvglow{outline:3px solid #ffd84a;outline-offset:2px;animation:nvglow 1.1s ease-in-out infinite;z-index:3}@media (prefers-reduced-motion:reduce){.nvglow{animation:none}}';document.head.appendChild(s)}
try{if(typeof STY!=='undefined'&&STY[1]&&STY[1].g==='boss'&&STY[1].m===1&&!STY[1].lv)STY[1].lv=5}catch(e){}
{let last='';setInterval(()=>{try{nvCSS();let want='';
  if(me.cls&&run&&typeof tutI!=='undefined'&&(tutI===4||tutI===5)&&ov.hidden)want=tutMnOpen()?(tutI===4?'gb':'tb'):'mn';
  if(want!==last){if(last&&$(last))$(last).classList.remove('nvglow');if(want&&$(want))$(want).classList.add('nvglow');last=want}}catch(e){}},300)}
setTimeout(()=>{try{
  const _bl=buffList;window.buffList=buffList=function(){const L=_bl.apply(this,arguments);try{const m=nvXp();if(m>1&&me.cls&&run){const nx=NV_LV.find(([l])=>me.lv<l);L.push({k:'nvx',ic:'🌱',n:'โบนัสผู้เล่นใหม่',d:'EXP ×'+m+' จนถึง Lv '+(nx?nx[0]:''),t:0,mx:0,col:'#9be37a'})}}catch(e){}return L};
}catch(e){console.warn('nv init',e)}},350);
/* ---- กันตายวนกับบอส: ออโต้เควสตายต่อบอส 2 ครั้ง → พาไปเก็บเลเวลเพิ่ม 1 เลเวลก่อนแล้วกลับไปสู้ใหม่ ---- */
let NVTR=null;const NVD={was:0,n:0,key:''};
setInterval(()=>{try{if(!me.cls||!run){NVD.was=0;return}const dn=me.down>0;const k=(me.sty&&me.sty.s)+':'+curMap;if(k!==NVD.key){NVD.key=k;NVD.n=0}
  if(dn&&!NVD.was&&typeof AQ!=='undefined'&&AQ&&AQ.T&&AQ.T.act==='boss'){NVD.n++;if(NVD.n>=2&&!NVTR){NVTR={lv:me.lv+1};NVD.n=0;const t='💪 บอสยังแรงไป · ออโต้เควสจะพาเก็บเลเวลถึง Lv '+NVTR.lv+' ก่อน แล้วกลับไปสู้ใหม่';banner={s:t,t:6};sysMsg(t)}}
  NVD.was=dn;if(NVTR&&me.lv>=NVTR.lv){NVTR=null;banner={s:'⚔️ เลเวลพอแล้ว! ออโต้เควสพากลับไปสู้บอส',t:4}}}catch(e){}},400);
setTimeout(()=>{try{
  const _t=aqTarget;window.aqTarget=aqTarget=function(){const T=_t.apply(this,arguments);try{if(NVTR&&T&&T.act==='boss'&&!isDg())return{mp:curMap,act:'hunt',lb:'เก็บเลเวลถึง Lv '+NVTR.lv+' ก่อนสู้บอสอีกรอบ'}}catch(e){}return T};
  const _k=aqKey;window.aqKey=aqKey=function(){return _k.apply(this,arguments)+(NVTR?'T':'')};
}catch(e){console.warn('nvtr init',e)}},360);
