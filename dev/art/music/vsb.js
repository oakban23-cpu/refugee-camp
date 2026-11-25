/* ---------- v662 เสียงสกิลชุดใหม่ (VSB) · 46 คลิป สังเคราะห์แล้วเรนเดอร์ล่วงหน้า (ชั้นเสียงหลายชั้น + ห้องก้อง + สเตอริโอ) ----------
   ไฟล์เดียว sfx-skill.mp3 (~0.9 MB) โหลดตอนเข้าเกมครั้งแรก · VSB.T[ชื่อ]=[เริ่ม,ยาว,ความดัง] (ปรับดังเท่ากันในย่านลำโพงมือถือ)
   ดังพร้อมภาพเอฟเฟกต์ภาพวาด v660 (ตอนภาพระเบิด/ฟัน/ตกถึงพื้นจริง ไม่ใช่ตอนกดปุ่ม) · ซ้าย-ขวาตามตำแหน่งบนจอ · ไกลตัวเราเบาลง
   เสียงโจมตีปกติ ฟัน/ยิง/เวท/โดน/คริ เปลี่ยนเป็นชุดใหม่ (สุ่ม 2-3 แบบไม่ให้ซ้ำหู) · เสียงตอนกดสกิลเดิมลดเหลือ 55% ให้เสียงใหม่เด่น
   เคารพปุ่ม 🔊 และระดับเสียงเอฟเฟกต์ในตั้งค่า · กันเสียงรก: ชนิดเดียวกันห่าง ≥ 50-150 มิลลิวิ, เล่นพร้อมกันไม่เกิน 12, จุดเดียวกันในเฟรมเดียวเอา 2 เสียงสำคัญสุด
   ปิด: VSB.on=0 (กลับเป็นเสียงเดิมทั้งหมด) */
var VSB={on:1,ok:0,ld:0,buf:null,T:__T__,cast:.55,vol:.9,max:12,act:0,last:{},q:[],qt:0,n:0,err:'',
  P:{mega:10,godray:9,wings:9,ultsig:8,void:7,impact:7,fire_boom:7,zap:7,smite:7,beam:7,holy:6,dome:6,roar:6,frost:6,heal:6,arrows:6,flame:5,ice:5,arcane:5,wind:5,moon:5,shadow:5,claw:5,
     spin:5,meteor:5,fire_fly:4,cracks:4,curse:4,swing:4,leaf:4,arrow:4,crit:4,shock:3,orb:3,star:3,hit:2,mshot:3},
  GAP:{hit:.045,swing:.05,shadow:.05,arrow:.05,mshot:.05,star:.06,orb:.06,claw:.06,crit:.08,zap:.12,mega:.3,godray:.3,wings:.3,ultsig:.3,holy:.2,dome:.2}};
function vsbLoad(){if(VSB.ld||!VSB.on)return;let a;try{a=acx()}catch(e){return}if(!a||a.state!=='running')return;VSB.ld=1;
  fetch('sfx-skill.mp3').then(r=>{if(!r.ok)throw new Error('http '+r.status);return r.arrayBuffer()})
    .then(b=>new Promise((ok,no)=>{const p=a.decodeAudioData(b,ok,no);if(p&&p.then)p.then(ok,no)}))
    .then(buf=>{VSB.buf=buf;VSB.ok=1}).catch(e=>{VSB.err=String(e&&e.message||e);setTimeout(()=>{VSB.ld=0},15000)})}
function vsbKey(n){if(VSB.T[n])return n;const v=[];for(let i=0;i<4;i++)if(VSB.T[n+i])v.push(n+i);return v.length?v[Math.floor(Math.random()*v.length)]:null}
/* เล่นทันที: n ชื่อ (ไม่ต้องใส่เลขแบบ) · x,y ตำแหน่งโลก (ไม่ใส่ = ตัวเรา) · v ความดังคูณ · dl หน่วงวินาที → true ถ้าเล่น */
function vsbPlay(n,x,y,v,dl){if(!VSB.on||!VSB.ok||muted)return false;const a=AC;if(!a||a.state!=='running')return false;const k=vsbKey(n);if(!k)return false;
  const now=a.currentTime,g0=VSB.GAP[n]||.1;if(now-(VSB.last[n]||-9)<g0)return false;if(VSB.act>=VSB.max)return false;
  let att=1,pan=0;if(x!=null&&me&&isFinite(x)){const d=Math.hypot(x-me.x,(y-me.y)*1.3);att=Math.max(0,Math.min(1,1-(d-220)/620));if(att<.04)return false;pan=Math.max(-.85,Math.min(.85,(x-me.x)/460))}
  VSB.last[n]=now;const T=VSB.T[k];try{const s=a.createBufferSource(),gn=a.createGain();s.buffer=VSB.buf;gn.gain.value=VSB.vol*T[2]*(v==null?1:v)*att;
    let out=gn;if(pan&&a.createStereoPanner){const p=a.createStereoPanner();p.pan.value=pan;gn.connect(p);out=p}out.connect(sfxDest(a));s.connect(gn);
    const t=now+(dl>0?dl:0);s.start(t,Math.max(0,T[0]-.02),T[1]+.04);VSB.act++;VSB.n++;s.onended=()=>{VSB.act=Math.max(0,VSB.act-1)}}catch(e){VSB.err=String(e);return false}return true}
/* คิวต่อเฟรม: เสียงที่ขอพร้อมกันตรงจุดเดียวกัน เอาแค่ 2 เสียงที่สำคัญสุด (กันเสียงทับจนรก) */
function vsbQ(n,x,y,v,dl){if(!VSB.on||!VSB.ok)return;VSB.q.push({n,x,y,v,dl:dl||0,p:VSB.P[n]||3});if(!VSB.qt){VSB.qt=1;Promise.resolve().then(vsbFlush)}}
function vsbFlush(){VSB.qt=0;const L=VSB.q.splice(0).sort((a,b)=>b.p-a.p),done=[];
  for(const r of L){const near=done.filter(d=>Math.abs(d.dl-r.dl)<.05&&Math.hypot(d.x-r.x,d.y-r.y)<130);if(near.length>=2||near.some(d=>d.n===r.n))continue;
    if(vsbPlay(r.n,r.x,r.y,r.v*(near.length?.7:1),r.dl))done.push(r)}}
/* ภาพเอฟเฟกต์ (ชิ้นที่ปล่อยด้วย vfs) → เสียง · f(ขนาดสุดท้าย) คืน [ชื่อ, ความดัง] */
const VSBS={SLASH_ARC:'swing',CROSS_SLASH:'shadow',IMPACT_BURST:w=>w>=100?['impact',1]:['crit',.9],SHOCKWAVE_RING:w=>['shock',w>=150?1:.6],GROUND_CRACKS:'cracks',DEMON_FLAME:'roar',
  SHIELD_DOME:'dome',DASH_TRAIL:'swing',CLAW_MARKS:'claw',FIRE_EXPLOSION:w=>['fire_boom',w>=110?1:.6],FLAME_PILLAR:'flame',FIRE_CIRCLE:['flame',.55],ICE_SHATTER:'ice',FROST_NOVA:'frost',
  LIGHTNING_BOLT:'zap',LIGHTNING_ORB:'orb',ARCANE_CIRCLE:'arcane',VOID_VORTEX:'void',HOLY_CIRCLE:['holy',.75],HEAL_SPARKLES:'heal',HALO_RAYS:['star',.7],ANGEL_WINGS:'wings',LIGHT_SWORD:'smite',
  SHADOW_SLASH:'shadow',SHADOW_WISPS:['curse',.6],CURSE_SIGIL:w=>['curse',w>=80?.9:.4],MOON_CRESCENT:'moon',ARROW_RAIN:'arrows',WIND_TORNADO:'wind',STAR_ARROW:['arrow',.8],LEAF_STORM:'leaf',
  ULT_SIGIL:'ultsig',MEGA_BLAST:'mega',GOD_RAYS:'godray',STAR_FLARE:w=>['star',w>=80?.9:.45]};
try{const o=vfs;vfs=function(n,x,y,op){const s=o.apply(this,arguments);try{if(s&&VSB.ok){let m=VSBS[n];if(typeof m==='function')m=m(s.w1||s.w);if(typeof m==='string')m=[m,1];
  if(m)vsbQ(m[0],s.x,s.y,m[1],s.dl||0)}}catch(e){}return s}}catch(e){}
/* เอฟเฟกต์ที่วาดทุกเฟรม (ไม่ได้ปล่อยชิ้น) ใส่เสียงตอนเริ่ม */
[['whirl','spin',0],['beam','beam',0],['torn','wind',0],['rncomet','fire_fly',0],['fire','meteor',0],['q8lance','arrow',0],['q8snipe','arrow',0],['s6sw','spin',0],['s6bw','spin',0],['q8orb','orb',0]]
  .forEach(([k,n,at])=>{try{vfK(k,C=>{if(VSB.ok&&C.E('vsb',at))vsbQ(n,C.x,C.y,1,0)})}catch(e){}});
/* เสียงโจมตีปกติ: ใช้ชุดใหม่ ถ้ายังโหลดไม่เสร็จใช้ของเดิม */
setTimeout(()=>{try{[['slash','swing',.9],['bow','arrow',.9],['magic','mshot',.85],['hit','hit',.8],['crit','crit',1]].forEach(([s,n,v])=>{const o=SFXD[s];if(!o)return;
  SFXD[s]=function(){if(VSB.on&&VSB.ok){vsbPlay(n,null,null,v);return}return o.apply(this,arguments)}})}catch(e){}},400);
setInterval(()=>{try{if(!VSB.ld&&me.cls&&run)vsbLoad()}catch(e){}},1000);
