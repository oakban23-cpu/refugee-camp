/* ---------- v663 เพลงประจำแมพแบบใหม่ (BGMM) · 10 เพลง แต่ง+เรนเดอร์ใหม่ วนต่อเนื่อง ----------
   ธีมเดิมของแมพ (mzTheme) → ไฟล์ bgm-m-<ธีม>.mp3 · ทุกเพลงใช้ทำนองหลักของเกม (3→5→ขึ้นโน้ตหลัก) ตามโหมด/เครื่องดนตรีของภูมิภาค
   camp ค่าย/ทุ่ง · bone สุสาน · hell ไฟ · ice น้ำแข็ง · tower หอคอย/ดันเจี้ยน · sunk เมืองจม · mine เหมือง · desert ทะเลทราย · sky ปราสาท/ฟ้า · rift รอยแยก
   โหลดเฉพาะแมพที่เข้า · เก็บเพลงที่ถอดรหัสแล้วไว้แค่ 2 เพลง (ประหยัดแรมมือถือ) · กลางคืน = กรองเสียงทุ้มนุ่มลง (เหมือนระบบเดิม)
   ระหว่างโหลด/โหลดไม่ได้ = ใช้เพลงสังเคราะห์เดิม (MZ) · บอส/ฉากพิเศษ (rk/requiem/opera/pro) ยังใช้ระบบเดิม · ปิด: BGMM.on=0 */
const BGMM={on:1,K:__K__,L:__L__,v:.85,nf:0};
BGMM.K.forEach(k=>{BGM.T['m_'+k]={u:'bgm-m-'+k+'.mp3',L:BGMM.L[k],v:BGMM.v}});
const mzTheme0=mzTheme;BGMM.th=()=>mzTheme0();
/* เพลงสังเคราะห์เดิมเงียบ เมื่อไฟล์ของธีมนั้นพร้อมเล่น */
mzTheme=function(){const t=BGMM.th();try{if(BGMM.on&&BGM.on&&BGMM.K.indexOf(t)>=0&&BGM.B['m_'+t]&&!document.hidden)return''}catch(e){}return t};
{const ow=bgmWant;bgmWant=function(){const w=ow();if(w)return w;try{if(!BGM.on||!BGMM.on||muted||!musOn||document.hidden||window.PRO_ON)return'';
  if(me.cls&&run){const t=BGMM.th();if(BGMM.K.indexOf(t)>=0)return'm_'+t}}catch(e){}return''}}
function bgmNightOn(){try{return!!(BGM.cur&&BGM.cur.indexOf('m_')===0&&!window.PRO_ON&&isNight()&&!isDg()&&FIELDM[curMap])}catch(e){return false}}
bgmStart=function(k){const a=AC,T=BGM.T[k],buf=BGM.B[k];if(!a||!buf)return;const s=a.createBufferSource(),g=a.createGain(),f=a.createBiquadFilter();
  f.type='lowpass';f.Q.value=.5;BGM.cur=k;BGMM.nf=bgmNightOn()?1:0;f.frequency.value=BGMM.nf?2200:20000;
  s.buffer=buf;s.loop=true;const L=Math.min(T.L,buf.duration-.52);s.loopStart=.5;s.loopEnd=.5+L;const t=a.currentTime;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(T.v,t+(k==='title'?1.2:2));
  s.connect(f);f.connect(g);let bo=a.destination;try{const cb=cfgBus(a);if(cb&&cb.m)bo=cb.m}catch(e){}g.connect(bo);s.start(t+.02,.5);BGM.n=s;BGM.g=g;BGM.f=f;BGM.t0=t};
{const os=bgmStop;bgmStop=function(f){BGM.f=null;return os.apply(this,arguments)}}
bgmTick=function(){const w=bgmWant();if(w&&AC!==false){bgmLoad(w);if(w==='title'&&BGM.B.title)bgmLoad('camp')}
  /* คืนแรม: เก็บเฉพาะเพลงที่กำลังเล่น/ต้องการ (หน้าปกเก็บเพลงกองไฟไว้ด้วย) */
  for(const k in BGM.B){if(BGM.B[k]&&k!==w&&k!==BGM.cur&&!(w==='title'&&k==='camp')){BGM.B[k]=null;BGM.P[k]=null}}
  const a=AC;if(!a||a.state!=='running')return;
  if(BGM.f){const n=bgmNightOn()?1:0;if(n!==BGMM.nf){BGMM.nf=n;BGM.f.frequency.setTargetAtTime(n?2200:20000,a.currentTime,1.2)}}
  if(w===BGM.cur)return;
  if(w&&!BGM.B[w]){if(BGM.cur)bgmStop(1.2);return}   /* ยังโหลดไม่เสร็จ: หยุดเพลงเก่า ให้เพลงสังเคราะห์เดิมเล่นแทนชั่วคราว */
  bgmStop(w?1.4:(me.cls&&run?2.2:.6));if(w)bgmStart(w)};
