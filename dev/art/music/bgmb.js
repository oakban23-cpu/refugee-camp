/* ---------- v665 เพลงบอส + เพลงดันเจี้ยน (BGMB) ----------
   บอส (rkKey → 'rk:…' ตอนบอสอยู่ใกล้ 650px) → เพลงศึก 6 แบบตามภูมิภาค (ออร์เคสตรา+ร็อก: เครื่องสายสีรัว 16 ส่วน กีตาร์แตก ทองเหลือง ไทโกะ คอรัส)
     b_wild ป่า/ใต้ดิน · b_dark มืด/อันเดด (+ดันเจี้ยน/หอคอย) · b_fire ไฟ/พายุ · b_frost น้ำแข็ง/ดวงดาว · b_astra อัสตรา/ฟ้า · b_mvp บอส MVP + ดันเจี้ยนเรด
   ดันเจี้ยน: d_dg ทั่วไป · d_tw หอคอยไต่ชั้น · d_raid ดันเจี้ยนเรด (ECHO/SIEGE/EYE/QUEEN)
   โหลดเพลงบอสของภูมิภาครอไว้ตอนอยู่ในแมพ (เจอบอสแล้วเปลี่ยนทันที) · เก็บเพลงแมพไว้ระหว่างสู้ (สู้จบกลับเพลงเดิมทันที)
   ระหว่างโหลด/โหลดไม่ได้ = เพลงร็อกสังเคราะห์เดิมของบอส (rk) · ฉาก requiem/opera/prologue ใช้แบบเดิม · ปิด: BGMB.on=0 */
const BGMB={on:1,L:__L__,v:{b:.9,d:.85},home:'',
  F:{b_wild:[1,6,7,8,23,24,44,45],b_dark:[2,5,20,21,22,25,39,43],b_fire:[3,16,17,18,26],b_frost:[4,10,11,19,36,40,42],b_astra:[9,12,13,14,15,27,28,29,30,31,32,33,34,35,38,41]},
  raid:()=>{try{return!!(ECHO()||SIEGE()||EYE()||QUEEN())}catch(e){return false}},dg:()=>{try{return!!isDg()}catch(e){return false}},tw:()=>{try{return!!isTw()}catch(e){return false}},cm:()=>curMap};
for(const k in BGMB.L)BGM.T[k]={u:'bgm-'+k.replace('_','-')+'.mp3',L:BGMB.L[k],v:k[0]==='b'?BGMB.v.b:BGMB.v.d};
function bgmbFam(){const m=BGMB.cm();for(const k in BGMB.F)if(BGMB.F[k].indexOf(m)>=0)return k;return'b_wild'}
function bgmbKey(){if(!BGMB.on)return'';let t='';try{t=BGMM.th()}catch(e){return''}if(typeof t!=='string'||!t)return'';
  if(t.indexOf('rk:')===0){if(t.indexOf('rk:MVP:')===0||BGMB.raid())return'b_mvp';if(BGMB.tw()||BGMB.dg())return'b_dark';return bgmbFam()}
  if(t==='tower'||t==='rift'){if(BGMB.tw())return'd_tw';if(BGMB.dg())return(t==='rift'||BGMB.raid())?'d_raid':'d_dg'}return''}
/* เพลงสังเคราะห์เดิม (ร็อกบอส/เพลงหอคอย) เงียบ เมื่อไฟล์พร้อม */
{const o=mzTheme;mzTheme=function(){const k=bgmbKey();if(k){try{if(BGM.on&&BGM.B[k]&&!document.hidden&&!muted&&musOn)return''}catch(e){}return BGMM.th()}return o.apply(this,arguments)}}
{const ow=bgmWant;bgmWant=function(){const w=ow();try{if(!BGM.on||muted||!musOn||document.hidden||window.PRO_ON||!(me.cls&&run))return w;const k=bgmbKey();if(k)return k}catch(e){}return w}}
bgmTick=function(){const w=bgmWant();let pf='';
  try{if(w&&(w.indexOf('m_')===0||/^p\d/.test(w))){BGMB.home=w;if(BGMB.on&&!BGMB.dg()&&!BGMB.tw())pf=bgmbFam()}else if(!w||w==='title'||w==='camp')BGMB.home=''}catch(e){}
  if(w&&AC!==false){bgmLoad(w);if(w==='title'&&BGM.B.title)bgmLoad('camp');if(pf&&BGM.B[w])bgmLoad(pf)}
  /* คืนแรม: เก็บแค่ เพลงที่เล่น/ต้องการ + เพลงแมพที่จะกลับไป + เพลงบอสภูมิภาคที่โหลดรอ */
  const home=w&&w[0]==='b'?BGMB.home:'';
  for(const k in BGM.B){if(BGM.B[k]&&k!==w&&k!==BGM.cur&&k!==pf&&k!==home&&!(w==='title'&&k==='camp')){BGM.B[k]=null;BGM.P[k]=null}}
  const a=AC;if(!a||a.state!=='running')return;
  if(BGM.f){const n=bgmNightOn()?1:0;if(n!==BGMM.nf){BGMM.nf=n;BGM.f.frequency.setTargetAtTime(n?2200:20000,a.currentTime,1.2)}}
  if(w===BGM.cur)return;
  if(w&&!BGM.B[w]){if(BGM.cur)bgmStop(1.2);return}
  bgmStop(w?(w[0]==='b'?.9:1.4):(me.cls&&run?2.2:.6));if(w)bgmStart(w)};
