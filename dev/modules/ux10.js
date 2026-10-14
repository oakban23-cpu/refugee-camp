/* ---------- v379 เพลงบอสร็อก ไม่ซ้ำกันทุกตัว ----------
   เดิมบอสทุกตัวใช้เพลง 'boss' เพลงเดียว → ตอนนี้แต่งเพลงร็อกจากชื่อบอส (เมล็ดสุ่มคงที่ = บอสตัวเดิมได้เพลงเดิมเสมอ)
   สิ่งที่สุ่ม: เทมโป 138–185 · คีย์ · โหมด (ไมเนอร์/ฟรีเจียน/ฮาร์โมนิกไมเนอร์/โดเรียน/ฟรีเจียนโดมิแนนต์) · ริฟฟ์ 12 แบบ + ตัวโน้ตในริฟฟ์
           · ทางคอร์ด 3 ท่อน · ทำนองลีด · โครงเพลง · ลีลากลอง (กระเดื่องคู่/ครึ่งจังหวะ)
   เครื่อง: กีตาร์ดิสทอร์ชัน 2 ตัว (ซ้าย/ขวา) · เบส · กลองชุด (กระเดื่อง สแนร์ ไฮแฮต ฉาบ ทอม) · กีตาร์ลีด
   เพลงพิเศษเดิม (โอเปร่า/เรเควียม) ยังใช้เหมือนเดิม */
const RKM=[[0,2,3,5,7,8,10],[0,1,3,5,7,8,10],[0,2,3,5,7,8,11],[0,2,3,5,7,9,10],[0,1,4,5,7,8,10]];
const RKMN=['ไมเนอร์','ฟรีเจียน','ฮาร์โมนิกไมเนอร์','โดเรียน','ฟรีเจียนโดมิแนนต์'];
const RKRH=['X-x-x-X-x-x-X-x-','x.xx.xx.x.xx.xX-','X--.x.x.X--.x.xx','xxxxxxxxX-x-X-x-','X.x.X.x.xxX.x.X.','x.xxx.xxx.xxX-X-','X---x.x.X---x.xx','xx.xx.x.xx.xX---','X-.xX-.xX-.xX-xx','x.x.x.x.X-X-X-x.','X--xX--xX-x-X-xx','xxx.xxx.xxx.X-X-'];
const RKBD=['X---------x.x.x.','X-------X-------','X-----x.X-----xx','X---x---X---x-x-'];
const RKPR=[[1,1,6,7],[1,6,3,7],[1,4,6,5],[1,7,6,7],[1,3,4,4],[1,2,1,7],[1,6,4,5],[1,5,6,4],[1,1,4,6],[1,7,6,5],[6,7,1,1],[1,4,1,5]];
const RKS={};
function rkGen(key,sk){const R=rng(hseed('rock|'+sk)),pk=a=>a[Math.floor(R()*a.length)],mi=Math.floor(R()*RKM.length),M=RKM[mi];
  const iv=d=>{const n=M.length,i=d-1;return M[((i%n)+n)%n]+Math.floor(i/n)*12};
  const mkRiff=rh=>{const off=[];for(let i=0;i<16;i++){const c=rh[i];if(c==='X'){off.push(i===0?0:pk([0,0,0,iv(3),iv(4),iv(5),iv(6),iv(7),12]))}else if(c==='x'){off.push(R()<.85?0:pk([iv(2),iv(3),12]))}else off.push(0)}return off};
  const rA=pk(RKRH),rB=pk(RKRH),rC=pk(RKBD);
  /* ทำนองลีด: โมทีฟ 2 ห้อง (16 ตัวเขบ็ตหนึ่งชั้น) ใช้เพนทาโทนิกของโหมด แล้วทวนพร้อมเปลี่ยนท้าย */
  const pen=[1,3,4,5,7,8,10];const mot=[];let d=pk([1,3,5,8]);for(let i=0;i<16;i++){if(i>0&&R()<.18){mot.push('_');continue}if(R()<.12&&i%4){mot.push('.');continue}d=Math.max(1,Math.min(12,d+pk([-2,-1,-1,0,1,1,2,3,-3])));mot.push(pen.includes(((d-1)%7)+1)||R()<.3?d:d+1)}
  const mel=mot.concat(mot.slice(0,12),[pk([5,8,7]),'_','_','_']);
  const T={rk:1,key,bpm:138+Math.floor(R()*48),root:40+Math.floor(R()*7),mi,M,iv,lv:.095,
    pr:{A:pk(RKPR),B:pk(RKPR),C:pk([[1,1,6,7],[1,1,1,2],[1,6,1,7],[1,1,7,6]])},rh:{A:rA,B:rB,C:rC},po:{A:mkRiff(rA),B:mkRiff(rB),C:mkRiff(rC)},
    form:pk([['A','B','A','C'],['A','B','C','B'],['A','A','B','C'],['B','A','C','B']]),dbl:R()<.55,half:R()<.5,mel,lead:R()<.5?'saw':'sq',hatO:R()<.4};
  return T}
/* กันเพลงคล้ายกัน: ไล่จัดเพลงให้รายชื่อบอสที่รู้จักตามลำดับคงที่ (ทุกเครื่องได้ผลเหมือนกัน)
   ถ้าเพลงใหม่ซ้ำกับเพลงที่จัดไปแล้ว ≥3 ใน 5 อย่าง (ริฟฟ์ A · ริฟฟ์ B · โหมด · โครงเพลง · เทมโป±5) → เปลี่ยนเมล็ดแล้วแต่งใหม่
   บอสชั้นหอคอย (150 ชั้น) ห้ามซ้ำ ≥4 ใน 5 */
const RKDG=['ผู้คุมสุสาน','ราชันย์ห้วงลึก · ร่างที่แท้จริง','ผู้กลืนราก','ราชันรากดำ','ราชินีผู้กลืนดาว','คาสเซียน · ผู้บัญชาการองครักษ์ดาว','ราชาโอเรียน · ผู้ครองบัลลังก์ดาว','ผู้ตีระฆังเงา','ผู้เฝ้าระฆังร่วง','เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา','อสูรยักษ์โลกันตร์','ราชาหมาป่าดาว','ราชินีที่เหลือแต่เปลือก','ความหิวของดาว','ทูตแห่งความหิว · ผู้กลืนดาว','เงามืดของอาซาเอล','เนรา · ดวงตาแห่งราชินี'];
const RKL=[];let rkRos=0;
function rkNear(a,c){return(a.rh.A===c.rh.A)+(a.rh.B===c.rh.B)+(a.mi===c.mi)+(a.form.join()===c.form.join())+(Math.abs(a.bpm-c.bpm)<=5)}
function rkPlace(key){const lim=key.indexOf('tw')===0?4:3;let T=null;for(let s=0;s<120;s++){T=rkGen(key,s?key+'#'+s:key);if(!RKL.some(c=>rkNear(T,c)>=lim))break}RKL.push(T);return RKS[key]=T}
function rkRoster(){if(rkRos)return;rkRos=1;const N=[];try{Object.keys(MAPS).map(Number).sort((a,b)=>a-b).forEach(k=>{const b=MAPS[k]&&MAPS[k].boss;if(b&&b.n&&b.n!=='-'&&N.indexOf(b.n)<0)N.push(b.n)})}catch(e){}
  RKDG.forEach(n=>{if(N.indexOf(n)<0)N.push(n)});N.forEach(n=>RKS[n]||rkPlace(n));N.forEach(n=>RKS['MVP:'+n]||rkPlace('MVP:'+n));for(let f=1;f<=150;f++)RKS['tw'+f]||rkPlace('tw'+f)}
function rkTheme(key){rkRoster();return RKS[key]||rkPlace(key)}
/* ---------- เครื่องดนตรี ---------- */
const RKB={a:null};
function rkBus(B){if(RKB.a===B.a&&RKB.g)return RKB;const a=B.a;RKB.a=a;
  const curve=(k)=>{const n=2048,c=new Float32Array(n);for(let i=0;i<n;i++){const x=i/(n-1)*2-1;c[i]=(1+k)*x/(1+k*Math.abs(x))}return c};
  const chain=(pan,k,cut,gv,rv,dl)=>{const inp=a.createGain(),hp=a.createBiquadFilter(),sh=a.createWaveShaper(),lp=a.createBiquadFilter(),pk=a.createBiquadFilter(),out=a.createGain();hp.type='highpass';hp.frequency.value=95;sh.curve=curve(k);try{sh.oversample='2x'}catch(e){}lp.type='lowpass';lp.frequency.value=cut;lp.Q.value=.6;pk.type='peaking';pk.frequency.value=1800;pk.gain.value=-4;pk.Q.value=1.2;out.gain.value=gv;
    inp.connect(hp);hp.connect(sh);sh.connect(lp);lp.connect(pk);pk.connect(out);mzOut(B,mzPan(B,out,pan),{rv,dl});return inp};
  RKB.g=[chain(-.6,60,3600,.085,.1,0),chain(.6,60,3500,.085,.1,0)];RKB.ld=chain(.1,14,5200,.11,.32,.28);return RKB}
function rkOsc(a,type,f,t,dur,det){const o=a.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t);if(det)o.detune.value=det;o.start(t);o.stop(t+dur+.06);return o}
function rkEnv(g,t,v,at,dur,rel){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+at);g.gain.setValueAtTime(Math.max(.0002,v),t+Math.max(at,dur-rel));g.gain.exponentialRampToValueAtTime(.0001,t+dur)}
function rkPow(B,m,t,dur,v,mute){const a=B.a,K=rkBus(B);K.g.forEach((inp,si)=>{const g=a.createGain(),f=a.createBiquadFilter();f.type='lowpass';f.frequency.value=mute?1100:5000;g.connect(f);f.connect(inp);
  const dv=si?7:-7;[[0,dv],[7,-dv*.6]].concat(mute?[]:[[12,dv*.4]]).forEach(([iv,dt])=>rkOsc(a,'sawtooth',mzF(m+iv),t,dur,dt).connect(g));rkEnv(g,t,v*(mute?.85:1),.004,dur,mute?.03:.08)})}
function rkBass(B,m,t,dur,v){const a=B.a,g=a.createGain(),f=a.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(900,t);f.frequency.exponentialRampToValueAtTime(380,t+Math.min(dur,.25));f.Q.value=4;g.connect(f);mzOut(B,f,{rv:.03});
  rkOsc(a,'sawtooth',mzF(m),t,dur).connect(g);rkOsc(a,'square',mzF(m-12),t,dur).connect(g);rkEnv(g,t,v,.004,dur,.04)}
function rkLead(B,m,t,dur,v,ty){const a=B.a,K=rkBus(B),g=a.createGain();g.connect(K.ld);const o1=rkOsc(a,ty==='sq'?'square':'sawtooth',mzF(m),t,dur,4),o2=rkOsc(a,'sawtooth',mzF(m),t,dur,-6);
  if(dur>.22){const l=a.createOscillator(),lg=a.createGain();l.frequency.value=5.6;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(mzF(m)*.012,t+Math.min(.3,dur*.5));l.connect(lg);lg.connect(o1.frequency);lg.connect(o2.frequency);l.start(t);l.stop(t+dur+.06)}
  o1.connect(g);o2.connect(g);rkEnv(g,t,v,.01,dur,Math.min(.12,dur*.4))}
function rkNz(B,t,d,ft,f0,f1,v,q,rv){const a=B.a,s=a.createBufferSource();s.buffer=B.nb;const fl=a.createBiquadFilter();fl.type=ft;fl.frequency.setValueAtTime(f0,t);if(f1)fl.frequency.exponentialRampToValueAtTime(f1,t+d);fl.Q.value=q||.8;const g=a.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);mzOut(B,g,{rv:rv||.08});s.start(t,Math.random()*1.5);s.stop(t+d+.05)}
function rkTone(B,t,f0,f1,d,v,type){const a=B.a,o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d*.7);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);mzOut(B,g,{rv:.05});o.start(t);o.stop(t+d+.05)}
const rkKick=(B,t,v)=>{rkTone(B,t,170,48,.3,v);rkNz(B,t,.018,'highpass',3500,0,v*.35,.7,.01)};
const rkSnare=(B,t,v)=>{rkNz(B,t,.19,'bandpass',1900,1400,v,.7,.16);rkTone(B,t,230,170,.11,v*.55,'triangle')};
const rkHat=(B,t,v,op)=>rkNz(B,t,op?.24:.04,'highpass',8200,0,v,.9,.04);
const rkCrash=(B,t,v)=>{rkNz(B,t,1.3,'highpass',4800,3500,v,.6,.22);rkNz(B,t,.5,'bandpass',6500,0,v*.5,.8,.1)};
const rkTom=(B,t,v,f)=>rkTone(B,t,f,f*.55,.22,v);
/* ---------- ตัวเรียงจังหวะ (เรียกทุกโน้ต 1/16 จาก musTick) ---------- */
function rkStep(T,t,st){const B=MZ.bus;if(!B)return;const s16=60/T.bpm/4,b16=st%16,bar=Math.floor(st/16)%32,si=Math.floor(bar/8),S=T.form[si],bb=bar%8,lv=T.lv*1.25,fill=bb===7&&b16>=12;
  const deg=T.pr[S][bb%4],root=T.root+T.iv(deg)-(T.iv(deg)>7?12:0);
  /* กีตาร์ริฟฟ์ */const rh=T.rh[S],c=rh[b16];if(c==='x'||c==='X'){let n=1;while(n<8&&rh[(b16+n)%16]==='-'&&b16+n<16)n++;const m=root+T.po[S][b16],mute=c==='x',dur=mute?s16*.85:s16*n*.98;
    rkPow(B,m,t,dur,lv*(mute?.9:1.15),mute);rkBass(B,root-12+(T.po[S][b16]===12?0:T.po[S][b16]),t,mute?s16*.9:dur,lv*1.5)}
  /* กลอง */const half=S==='C'&&T.half,acc=c==='X';
  if(bb===0&&b16===0)rkCrash(B,t,lv*1.6);
  if(fill){rkSnare(B,t,lv*(1.3+(b16-12)*.15));if(b16%2)rkTom(B,t,lv*1.6,[0,0,0,0,0,0,0,0,0,0,0,0,180,150,120,95][b16])}
  else{if(half){if(b16===0||b16===10)rkKick(B,t,lv*2.4);if(b16===8)rkSnare(B,t,lv*1.8);if(b16%4===0)rkCrash(B,t,lv*.55)}
    else{const kick=S==='B'&&T.dbl?b16%2===0||b16%4===3:(b16===0||b16===8||acc||(b16===10&&bb%2)||(b16===6&&S!=='A'));if(kick)rkKick(B,t,lv*2.2);
      if(b16===4||b16===12)rkSnare(B,t,lv*1.7);
      if(S==='B'){if(b16%4===0)rkHat(B,t,lv*.9,1)}else if(b16%2===0)rkHat(B,t,lv*(b16%4?.6:.85),T.hatO&&b16%8===6)}}
  /* ลีด (ท่อน B) */if(S==='B'||(S==='C'&&!T.half&&si===3)){const k=(bb%4)*8+Math.floor(b16/2);if(b16%2===0){const tok=T.mel[k%T.mel.length];if(tok!=='.'&&tok!=='_'){let len=1;while(len<6&&T.mel[(k+len)%T.mel.length]==='_')len++;
    rkLead(B,T.root+24+T.iv(tok),t,s16*2*len*.96,lv*.95,T.lead)}}}}
/* ---------- เลือกเพลงตามบอสที่อยู่ใกล้ ---------- */
function rkKey(){try{let b=null,bd=1e9;for(const m of mons){if(m.t!==3)continue;const d=Math.hypot(m.x-me.x,m.y-me.y);if(d<bd){bd=d;b=m}}if(!b||bd>=650)return'';
  let n='';try{const S=BS();n=S&&S.n&&S.n!=='-'?S.n:''}catch(e){}if(b.mvp)n='MVP:'+n;if(!n)n='map'+curMap;if(typeof isTw==='function'&&isTw())n='tw'+(typeof twF==='function'?twF():'');return'rk:'+n}catch(e){return''}}
