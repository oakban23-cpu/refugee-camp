/* ---------- v661 เพลงหน้าเข้าเกม + หน้าเลือกตัวละคร (BGM) ----------
   แต่งใหม่ทั้งหมด สังเคราะห์ด้วยโค้ด (ไม่มีแซมเปิล/ไม่มีลิขสิทธิ์ใคร) เรนเดอร์เป็น mp3 ที่วนต่อกันได้ไม่มีรอยต่อ
   bgm-title.mp3 «Embers of Home» D major 76bpm วน 101 วิ: ฮาร์ป เซเลสตา ฟลุต ไวโอลิน ฮอร์น คอรัส ทิมปานี เปียโน
   bgm-camp.mp3 «Campfire Gathering» G major 3/4 92bpm วน 63 วิ: กีตาร์ไนลอน โอคาริน่า ซอ เชคเกอร์ กลองมือ เสียงกองไฟ จิ้งหรีด
     (ท่อนหลักใช้ทำนองเดียวกับเพลงหน้าปก ในจังหวะวอลซ์)
   หน้าปก = title · หน้าเลือกตัวละคร/ล็อกอิน = camp · เข้าเกมแล้ว = ค่อย ๆ เบาลง แล้วเพลงแมพเดิม (MZ) รับต่อ
   ไฟล์ = [ท้ายเพลง .5 วิ] + เพลง 1 รอบ + [ต้นเพลง .5 วิ] → วนช่วง .5 ถึง .5+L (ตัวถอดรหัส mp3 เลื่อนนิดหน่อยก็ยังต่อเนียน)
   เบราว์เซอร์ยังไม่อนุญาตเสียง: แตะหน้าปกครั้งแรก = เปิดเพลง (ยังไม่เข้าเกม) · แตะอีกครั้ง = เข้าเกม (BGM.hold=0 ปิดพฤติกรรมนี้)
   เคารพปุ่มเสียง 🔊 และปุ่มเพลง 🎵 · สลับแท็บ/พับแอป = เพลงเบาลงหยุด · ปิดทั้งหมด: BGM.on=0 */
const BGM={on:1,hold:1,T:{title:{u:'bgm-title.mp3',L:4456421/44100,v:.9},camp:{u:'bgm-camp.mp3',L:2761043/44100,v:.85}},B:{},P:{},F:{},cur:'',n:null,g:null,tapped:0,err:''};
function bgmLoad(k){if(BGM.B[k]||BGM.P[k]||(BGM.F[k]|0)>=2)return;let a;try{a=acx()}catch(e){return}if(!a)return;
  BGM.P[k]=fetch(BGM.T[k].u).then(r=>{if(!r.ok)throw new Error('http '+r.status);return r.arrayBuffer()})
    .then(b=>new Promise((ok,no)=>{const p=a.decodeAudioData(b,ok,no);if(p&&p.then)p.then(ok,no)}))
    .then(buf=>{BGM.B[k]=buf;BGM.P[k]=null}).catch(e=>{BGM.err=k+': '+(e&&e.message||e);BGM.F[k]=(BGM.F[k]|0)+1;setTimeout(()=>{BGM.P[k]=null},4000)})}
function bgmTtl(){const T=document.getElementById('ttl');return !!(T&&!T.classList.contains('out'))}
function bgmWant(){try{if(!BGM.on||muted||!musOn||document.hidden||window.PRO_ON)return'';if(me.cls&&run)return'';return bgmTtl()?'title':'camp'}catch(e){return''}}
function bgmStart(k){const a=AC,T=BGM.T[k],buf=BGM.B[k];if(!a||!buf)return;const s=a.createBufferSource(),g=a.createGain();s.buffer=buf;s.loop=true;
  const L=Math.min(T.L,buf.duration-.52);s.loopStart=.5;s.loopEnd=.5+L;const t=a.currentTime;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(T.v,t+(k==='title'?1.2:2));
  s.connect(g);g.connect(a.destination);s.start(t+.02,.5);BGM.cur=k;BGM.n=s;BGM.g=g;BGM.t0=t}
function bgmStop(f){const a=AC,s=BGM.n,g=BGM.g;BGM.n=null;BGM.g=null;BGM.cur='';if(!a||!s)return;
  try{const t=a.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(Math.max(.0001,g.gain.value),t);g.gain.exponentialRampToValueAtTime(.0001,t+f);s.stop(t+f+.05)}catch(e){try{s.stop()}catch(_){}}}
function bgmTick(){const w=bgmWant();if(w&&AC!==false){bgmLoad(w);if(BGM.B.title)bgmLoad('camp')}
  const a=AC;if(!a||a.state!=='running'||w===BGM.cur)return;if(w&&!BGM.B[w])return;
  bgmStop(w?1.4:(me.cls&&run?2.2:.6));if(w)bgmStart(w)}
setInterval(()=>{try{bgmTick()}catch(e){BGM.err=String(e)}},250);
/* โหลดเพลงหน้าปกทันที (เบราว์เซอร์ที่อนุญาตเสียงอยู่แล้วจะได้ยินตั้งแต่หน้าปก) */
setTimeout(()=>{try{if(bgmWant()){bgmLoad(bgmWant());const a=acx();if(a&&a.state==='suspended')a.resume().catch(()=>{})}}catch(e){}},300);
/* แตะหน้าปกครั้งแรกตอนยังไม่มีเพลง = เปิดเพลงก่อน (ยังไม่เข้าเกม) */
function bgmHoldTap(e){if(!BGM.hold||BGM.tapped||!bgmTtl()||!bgmWant())return;let a=null;try{a=AC}catch(_){}
  if(a&&a.state==='running'&&BGM.cur==='title')return;BGM.tapped=1;e.stopImmediatePropagation();e.preventDefault();
  try{unlockAudio()}catch(_){}try{bgmLoad('title')}catch(_){}
  const G=document.querySelector('#ttl .go');if(G){G.textContent='🎵 แตะอีกครั้งเพื่อเข้าเกม';G.classList.add('bgmon')}}
(function(){const T=document.getElementById('ttl');if(!T)return;T.addEventListener('click',bgmHoldTap,true);
  addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')bgmHoldTap(e)},true);
  const st=document.createElement('style');st.textContent='#ttl .go.bgmon{animation:bgmPulse 1.6s ease-in-out infinite}@keyframes bgmPulse{0%,100%{opacity:.75}50%{opacity:1}}';document.head.appendChild(st)})();
