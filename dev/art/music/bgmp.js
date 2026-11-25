/* ---------- v664 เพลงของแต่ละแมพ (BGMP) · ทุกแมพในโลกมีเพลงไม่ซ้ำกัน ----------
   แมพ 1-10 ใช้เพลงธีม v663 (camp bone hell ice tower sunk mine desert sky rift ซึ่งเป็นแมพละเพลงอยู่แล้ว)
   แมพ 11-45 (34 แมพ) มีเพลงของตัวเอง bgm-p<id>.mp3 · ทำนองสร้างจากโมทีฟ 2 ห้อง (ทุกจังหวะหนักเป็นโน้ตในคอร์ด) คนละสเกล/จังหวะ/เครื่องดนตรี
   ดันเจี้ยน/หอคอย/บอส/ฉากพิเศษ ใช้แบบเดิม · ระหว่างโหลดใช้เพลงสังเคราะห์เดิม · ปิดเฉพาะส่วนนี้: BGMP.on=0 (กลับไปเพลงธีม v663) */
const BGMP={on:1,M:__M__,v:.85,cm:()=>curMap,dg:()=>isDg()||isTw()};
for(const id in BGMP.M)BGM.T['p'+id]={u:'bgm-p'+id+'.mp3',L:BGMP.M[id],v:BGMP.v};
function bgmpKey(){try{if(!BGMP.on||BGMP.dg())return'';const id=BGMP.cm();return BGMP.M[id]?'p'+id:''}catch(e){return''}}
{const o=mzTheme;mzTheme=function(){const t=BGMM.th(),k=bgmpKey();
  if(k&&BGMM.K.indexOf(t)>=0){try{if(BGMM.on&&BGM.on&&BGM.B[k]&&!document.hidden)return''}catch(e){}return t}return o.apply(this,arguments)}}
{const ow=bgmWant;bgmWant=function(){const w=ow();if(w&&w.indexOf('m_')===0){const k=bgmpKey();if(k)return k}return w}}
bgmNightOn=function(){try{const c=BGM.cur||'';return!!((c.indexOf('m_')===0||/^p\d/.test(c))&&!window.PRO_ON&&isNight()&&!isDg()&&FIELDM[curMap])}catch(e){return false}};
