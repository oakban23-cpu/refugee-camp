/* ---------- v380 เพลงบอสเฮฟวี่เมทัล ไม่ซ้ำกันทุกตัว ----------
   แต่งเพลงจากชื่อบอส (เมล็ดสุ่มคงที่ = บอสตัวเดิมได้เพลงเดิมเสมอ) แนวเมทัลแอ็กชันแบบเกมล่าปีศาจ
   วง: กีตาร์ริธึมจูนต่ำ 2 แทร็ก (ซ้าย/ขวา อัดซ้อน) · เบสแตก · กลองชุด (กระเดื่องคู่ · บลาสต์บีต · ฉาบจีน · ทอม)
       · กีตาร์โซโล่ 2 ตัวประสานเสียง · ซินธ์อินดัสเทรียล · คอรัสมืด · เสียงกระแทกภาพยนตร์ · ไรเซอร์
   โครง: อินโทร (กรองเสียงแล้วค่อยเปิด + ไรเซอร์) → วนลูป 8 ท่อน × 4 ห้อง จาก
         V ริฟฟ์หลัก · P ทรีโมโล่ + บลาสต์บีต · C ท่อนฮุก + คอรัส + ลีดคู่ · B เบรกดาวน์ครึ่งจังหวะ · S โซโล่ชเร็ด
   เครื่องดนตรีหลักเป็นออสซิลเลเตอร์ค้างไว้ (เปลี่ยนแค่ความถี่/เกต) + กลองเป็นบัฟเฟอร์สร้างล่วงหน้า → กินเครื่องน้อย
   เพลงพิเศษเดิม (โอเปร่า/เรเควียม) ยังใช้เหมือนเดิม */
const RKM=[[0,2,3,5,7,8,10],[0,1,3,5,7,8,10],[0,2,3,5,7,8,11],[0,2,3,5,7,9,10],[0,1,4,5,7,8,10],[0,1,3,5,6,8,10]];
const RKMN=['ไมเนอร์','ฟรีเจียน','ฮาร์โมนิกไมเนอร์','โดเรียน','ฟรีเจียนโดมิแนนต์','โลเครียน'];
/* x=ชักแบบอุดสาย · X=คอร์ดเปิดเน้น · o=โน้ตเดี่ยว · -=ค้าง · .=เงียบ */
const RKV=['x.xxx.xxx.xxX-X-','xxx.xxx.xxx.X-o-','X..xX..xX.x.X-x-','x.xx.xx.x.xxo-o-','X-.xx.xX-.xx.xo-','xxxxX-xxxxX-oooo','X--xx-X--xx-X-xx','xx.oxx.oxx.oX-X-','x.x.xxx.x.x.X-xx','X-xxX-xxX-xxooxx','xxxxxxxxX--.X-..','x.xxx.xxo.oxx.xx'];
const RKBK=['X-----x.x...X---','X--x--X-----x.x.','X-x.....X-x.X-..','X--.X--.X-.xx-X-','X---x-x-X---..xx','X-.x.xX-.x.xX---'];
const RKCH=['X-------X---X-x-','X-----x.X-------','X--x--X---X-X-x-','X-.xX-.xX-.xX-.x','X-------X-x-X-x-'];
const RKSB=['X-x.x.x.X-x.x.x.','x.x.x.x.X-x.x.x.','X-xxx.xxX-xxx.xx'];
const RKPR=[[1,1,6,7],[1,6,3,7],[1,4,6,5],[1,7,6,7],[1,3,4,4],[1,2,1,7],[1,6,4,5],[1,5,6,4],[1,1,4,6],[1,7,6,5],[6,7,1,1],[1,4,1,5]];
const RKFM=[['V','V','P','C','B','S','C','V'],['V','P','C','V','B','S','P','C'],['V','C','V','C','B','S','C','B'],['P','V','C','B','V','S','C','C'],['V','V','C','P','S','B','C','V']];
const RKS={};
function rkGen(key,sk){const R=rng(hseed('metal|'+sk)),pk=a=>a[Math.floor(R()*a.length)],mi=Math.floor(R()*RKM.length),M=RKM[mi];
  const iv=d=>{const n=M.length,i=d-1;return M[((i%n)+n)%n]+Math.floor(i/n)*12};
  const mkOff=(rh,heavy)=>{const o=[];for(let i=0;i<16;i++){const c=rh[i];
    if(c==='X')o.push(i===0?0:pk(heavy?[0,0,iv(2),6,iv(6)]:[0,iv(2),iv(3),iv(5),iv(6),iv(7),6]));
    else if(c==='o')o.push(pk([iv(2),iv(3),6,iv(5),iv(6),12,12+iv(3)]));
    else o.push(c==='x'&&R()<.1?pk([iv(2),1]):0)}return o};
  const vr=pk(RKV),br=pk(RKBK),cr=pk(RKCH),sr=pk(RKSB);
  /* ทรีโมโล่ 2 ห้อง */const trem=[];{let d=pk([1,3,5,8]);for(let i=0;i<32;){const L=pk([2,2,4,4,4]);d=Math.max(1,Math.min(10,d+pk([-2,-1,1,1,2,-3,3])));for(let k=0;k<L&&i<32;k++,i++)trem.push(d)}}
  /* เมโลดี้ท่อนฮุก 4 ห้อง (เขบ็ตหนึ่งชั้น) */const mot=[];{let d=pk([1,3,5,8]);for(let i=0;i<16;i++){if(i>0&&R()<.3){mot.push('_');continue}if(R()<.08&&i%4){mot.push('.');continue}d=Math.max(1,Math.min(12,d+pk([-2,-1,-1,0,1,1,2,3,-3])));mot.push(d)}}
  const mel=mot.concat(mot.slice(0,10),[pk([5,8]),'_','_','_','_','_']);
  /* โซโล่ 4 ห้อง (เขบ็ตสองชั้น) จากท่อนสั้น: ไล่สเกล · เพดัล · กวาดอาร์เปจโจ · ทริล · เบนด์ */
  const solo=[],sb=[];
  for(let f=0;f<8;f++){const ty=f===7?'bend':pk(['run','run','ped','arp','trill','bend','run']),s=pk([5,7,8,10,12]);
    if(ty==='run'){const dir=pk([1,-1]);let x=dir>0?s-5:s+3;for(let i=0;i<8;i++){solo.push(x);x+=dir}}
    else if(ty==='ped'){const b=pk([1,5,8]),h=b+pk([2,3,4]);[h,b,h+1,b,h+2,b,h+1,b].forEach(v=>solo.push(v))}
    else if(ty==='arp'){const b=pk([1,3,5]);[b,b+2,b+4,b+7,b+9,b+7,b+4,b+2].forEach(v=>solo.push(v))}
    else if(ty==='trill'){for(let i=0;i<8;i++)solo.push(i%2?s+1:s)}
    else{sb.push(solo.length);solo.push(s);for(let i=0;i<7;i++)solo.push('_')}}
  const T={rk:1,key,bpm:140+Math.floor(R()*50),root:33+Math.floor(R()*8),mi,M,iv,
    pr:{I:[1,1,1,1],V:pk([[1,1,1,1],[1,1,6,7],[1,1,2,1],[1,1,7,6],[1,6,1,7]]),P:pk(RKPR),C:pk(RKPR),B:pk([[1,1,1,1],[1,1,2,1],[1,1,1,6]]),S:pk(RKPR)},
    rh:{A:vr,B:br,V:vr,C:cr,S:sr},po:{V:mkOff(vr),B:mkOff(br,1),C:mkOff(cr),S:mkOff(sr),I:mkOff(vr)},
    form:pk(RKFM),vdr:pk(['gallop','dbl16','follow','dbl16']),blast:R()<.55,ind:R()<.5,harm:pk([2,2,4]),turn:R()<.6,trem,mel,solo,sb,
    arp:pk([[1,5,8,5,10,8,5,3],[1,3,5,8,5,3,1,5],[8,5,1,5,8,10,8,5],[1,8,1,7,1,6,1,5]]),hiL:R()<.4};
  return T}
/* ---------- เครื่องดนตรี (สร้างครั้งเดียวต่อบอส แล้วค้างไว้) ---------- */
const RKB={a:null,g:null};
function rkCurve(k){const n=4096,c=new Float32Array(n),d=Math.tanh(k);for(let i=0;i<n;i++){const x=i/(n-1)*2-1;c[i]=Math.tanh(k*x)/d}return c}
function rkSmpF(a){const sr=a.sampleRate,N=()=>Math.random()*2-1,E=Math.exp,S=Math.sin,P2=Math.PI*2;
  const mk=(sec,fn)=>{const n=Math.floor(sr*sec),b=a.createBuffer(1,n,sr),d=b.getChannelData(0);fn(d,n);let pk=0;for(let i=0;i<n;i++)pk=Math.max(pk,Math.abs(d[i]));if(pk>0)for(let i=0;i<n;i++)d[i]/=pk;return b};
  const metal=(sec,dec,fs,nz)=>mk(sec,(d,n)=>{const ph=fs.map(()=>Math.random()*6);let lp=0;for(let i=0;i<n;i++){const t=i/sr;let s=0;for(let k=0;k<fs.length;k++){ph[k]+=P2*fs[k]/sr;s+=S(ph[k])>0?1:-1}const x=N();lp+=(x-lp)*.35;d[i]=(s/fs.length*.45+(x-lp)*nz)*E(-t/dec)*(1-E(-t/.0008))}});
  const tom=f0=>mk(.45,(d,n)=>{let ph=0;for(let i=0;i<n;i++){const t=i/sr;ph+=P2*f0*(1+.6*E(-t/.025))/sr;d[i]=Math.tanh((S(ph)*E(-t/.22)+N()*E(-t/.006)*.3)*1.4)}});
  return{
    kick:()=>mk(.42,(d,n)=>{let ph=0;for(let i=0;i<n;i++){const t=i/sr;ph+=P2*(46+150*E(-t/.03))/sr;d[i]=Math.tanh((S(ph)*E(-t/.17)*1.3+N()*E(-t/.0016)*.8+S(ph*2)*E(-t/.02)*.25)*1.7)}}),
    snare:()=>mk(.36,(d,n)=>{let ph=0,lp=0;for(let i=0;i<n;i++){const t=i/sr,x=N();ph+=P2*(180+70*E(-t/.012))/sr;lp+=(x-lp)*.5;d[i]=Math.tanh(S(ph)*E(-t/.055)*1+(x-lp)*E(-t/.12)*1.2+x*E(-t/.004)*.5)}}),
    hat:()=>mk(.06,(d,n)=>{let lp=0;for(let i=0;i<n;i++){const t=i/sr,x=N();lp+=(x-lp)*.3;d[i]=(x-lp)*E(-t/.012)}}),
    hatO:()=>mk(.45,(d,n)=>{let lp=0;for(let i=0;i<n;i++){const t=i/sr,x=N();lp+=(x-lp)*.3;d[i]=(x-lp)*E(-t/.13)}}),
    crash:()=>metal(1.9,.6,[3120,4230,5470,6640,7890,9130],1),china:()=>metal(1.1,.28,[1850,2730,3610,4520,5330],1.4),ride:()=>metal(.9,.38,[2950,4180,5690,7130],.25),
    t1:()=>tom(150),t2:()=>tom(115),t3:()=>tom(84),
    boom:()=>mk(1.8,(d,n)=>{let ph=0,lp=0;for(let i=0;i<n;i++){const t=i/sr,x=N();ph+=P2*(32+40*E(-t/.12))/sr;lp+=(x-lp)*.04;d[i]=Math.tanh((S(ph)*E(-t/.55)*1.2+lp*E(-t/.35)*3+x*E(-t/.01)*.25)*1.3)}}),
    riser:()=>mk(2.6,(d,n)=>{let lp=0;for(let i=0;i<n;i++){const t=i/sr,u=t/2.6,x=N();lp+=(x-lp)*(.015+.7*u*u);d[i]=(lp*.7+(x-lp)*u*.6)*u*u*(1-E(-(2.6-t)/.01))}})}}
function rkBus(B){if(RKB.a===B.a&&RKB.g)return RKB;const a=B.a,K=RKB;K.a=a;K.all=[];K.cv=rkCurve(9);K.cvB=rkCurve(2.6);K.cvL=rkCurve(5);rkWarm(a,1);K.d=RKD.d
  K.mix=a.createGain();K.mix.gain.value=.55;const cp=a.createDynamicsCompressor();cp.threshold.value=-12;cp.ratio.value=4;cp.attack.value=.004;cp.release.value=.14;cp.knee.value=6;K.post=a.createGain();K.post.gain.value=.36;K.mix.connect(cp);cp.connect(K.post);K.post.connect(B.in);K.cp=cp;
  const snd=(node,pan,rv,dl)=>{const n=mzPan(B,node,pan);n.connect(K.mix);if(rv){const s=a.createGain();s.gain.value=rv;n.connect(s);s.connect(B.rv)}if(dl){const s=a.createGain();s.gain.value=dl;n.connect(s);s.connect(B.dl)}};
  const osc=(type,det)=>{const o=a.createOscillator();o.type=type;if(det)o.detune.value=det;o.start();K.all.push(o);return o};
  const bq=(type,f,q,g)=>{const b=a.createBiquadFilter();b.type=type;b.frequency.value=f;if(q)b.Q.value=q;if(g!==undefined)b.gain.value=g;return b};
  const chain=(...n)=>{for(let i=0;i<n.length-1;i++)n[i].connect(n[i+1]);return n[n.length-1]};
  /* กีตาร์ริธึม: ซอว์ 4 ตัว (ราก×2 · ควินต์ · อ็อกเทฟ) → เกต → กรองก่อนแตก → แตกหนัก → คว้านกลาง → ตู้แอมป์ */
  K.gl=bq('lowpass',14000,.7);const gOut=a.createGain();gOut.gain.value=.2;K.gl.connect(gOut);snd(gOut,0,.07);
  const side=(pan,det,dly)=>{const G=a.createGain();G.gain.value=0;const os=[],g=[];
    [[0,det],[0,-det*1.7],[7,det*.6],[12,-det]].forEach(([iv,dt],i)=>{const o=osc('sawtooth',dt),gg=a.createGain();gg.gain.value=i<2?.5:0;o.connect(gg);gg.connect(G);os.push({o,iv});g.push(gg)});
    const pl=bq('lowpass',3400,.9),sh=a.createWaveShaper();sh.curve=K.cv;try{sh.oversample='4x'}catch(e){}
    let end=chain(G,pl,bq('highpass',105,.7),sh,bq('peaking',470,1,-8),bq('peaking',2500,1.1,4.5),bq('lowpass',5000,.8),bq('lowpass',7500,.6),bq('highpass',70,.7));
    const pn=a.createStereoPanner?a.createStereoPanner():null;if(dly){const dd=a.createDelay(.05);dd.delayTime.value=dly;end.connect(dd);end=dd}if(pn){pn.pan.value=pan;end.connect(pn);end=pn}end.connect(K.gl);return{os,g,G,pl}};
  K.gt=[side(-.75,7,0),side(.75,-6,.009)];
  /* เบส */{const G=a.createGain();G.gain.value=0;const o1=osc('sawtooth'),o2=osc('sine'),g2=a.createGain();g2.gain.value=1.1;o1.connect(G);o2.connect(g2);g2.connect(G);const sh=a.createWaveShaper();sh.curve=K.cvB;
    const out=a.createGain();out.gain.value=.42;chain(G,sh,bq('lowpass',1500,.7),bq('peaking',900,1,4),out);snd(out,0,.02);K.bs={o:[o1,o2],G}}
  /* กีตาร์โซโล่ 2 ตัว (ตัวหลัก + ประสานเสียง) */
  const lead=(pan,lvl)=>{const G=a.createGain();G.gain.value=0;const o1=osc('sawtooth',3),o2=osc('square',-8),g2=a.createGain();g2.gain.value=.45;o1.connect(G);o2.connect(g2);g2.connect(G);
    const l=osc('sine');l.frequency.value=6.2;const lg=a.createGain();lg.gain.value=0;l.connect(lg);lg.connect(o1.detune);lg.connect(o2.detune);
    const sh=a.createWaveShaper();sh.curve=K.cvL;const out=a.createGain();out.gain.value=lvl;chain(G,bq('highpass',280,.7),sh,bq('peaking',1700,1,3),bq('lowpass',4300,.7),out);snd(out,pan,.28,.2);return{o:[o1,o2],G,lg}};
  K.ld=[lead(.12,.15),lead(-.25,.11)];
  /* ซินธ์อินดัสเทรียล */{const G=a.createGain();G.gain.value=0;const o1=osc('sawtooth',-9),o2=osc('sawtooth',9),o3=osc('square');const g3=a.createGain();g3.gain.value=.4;o3.connect(g3);g3.connect(G);o1.connect(G);o2.connect(G);
    const f=bq('lowpass',1200,9),out=a.createGain();out.gain.value=.085;chain(G,f,out);snd(out,0,.18,.3);K.sy={o:[o1,o2,o3],G,f}}
  /* กลอง: แห้ง (กระเดื่อง/บูม) กับ ห้อง (สแนร์ ทอม ฉาบ) */
  K.dk=a.createGain();K.dk.gain.value=.95;snd(K.dk,0,.02);K.dr=a.createGain();K.dr.gain.value=.62;snd(K.dr,0,.16);
  K.g=1;return K}
/* สร้างเสียงกลองล่วงหน้าทีละชิ้นตอนว่าง (กันเฟรมกระตุกตอนเจอบอสครั้งแรก) */
const RKD={a:null,f:null,d:null};
function rkWarm(a,all){if(RKD.a!==a){RKD.a=a;RKD.f=rkSmpF(a);RKD.d={}}for(const k in RKD.f){if(!RKD.d[k]){RKD.d[k]=RKD.f[k]();if(!all)return}}}
setInterval(()=>{try{if(typeof AC!=='undefined'&&AC&&AC.state==='running'&&!musOff())rkWarm(AC,0)}catch(e){}},700);
function musOff(){try{return muted||!musOn}catch(e){return false}}
function rkStop(){const K=RKB;if(!K.g)return;try{K.all.forEach(o=>{try{o.stop()}catch(e){}});K.mix.disconnect()}catch(e){}K.g=null;K.all=[]}
function rkHit(K,b,t,v,pan,bus,rate){const a=K.a,s=a.createBufferSource();s.buffer=b;if(rate)s.playbackRate.value=rate;const g=a.createGain();g.gain.value=v;s.connect(g);(pan?mzPan(MZ.bus,g,pan):g).connect(bus);s.start(t)}
function rkGate(G,t,v,dur,at,rel){G.gain.setTargetAtTime(0,Math.max(0,t-.005),.0012);G.gain.setTargetAtTime(v,t,at);G.gain.setTargetAtTime(0,t+dur,rel)}
/* shape: 0 โน้ตเดี่ยว · 1 พาวเวอร์คอร์ด · 2 คอร์ดเต็ม(มีอ็อกเทฟ) */
function rkGt(K,t,m,dur,v,shape,mute){K.gt.forEach(S=>{S.os.forEach(({o,iv})=>o.frequency.setValueAtTime(mzF(m+iv),t));S.g[2].gain.setValueAtTime(shape?.42:0,t);S.g[3].gain.setValueAtTime(shape===2?.3:0,t);
  S.pl.frequency.setValueAtTime(mute?720:3400,t);rkGate(S.G,t,v,dur,.0015,mute?.012:.035)})}
function rkBs(K,t,m,dur,v){K.bs.o[0].frequency.setValueAtTime(mzF(m),t);K.bs.o[1].frequency.setValueAtTime(mzF(m),t);rkGate(K.bs.G,t,v,dur,.002,.03)}
function rkLd(L,t,m,dur,v,bend){while(m>94)m-=12;const f=mzF(m);L.o.forEach(o=>{if(bend){o.frequency.setValueAtTime(mzF(m-2),t);o.frequency.setTargetAtTime(f,t+.05,.07)}else o.frequency.setTargetAtTime(f,t,.004)});
  L.lg.gain.setTargetAtTime(0,t,.01);if(dur>.24)L.lg.gain.setTargetAtTime(30,t+Math.min(.18,dur*.4),.1);L.G.gain.setTargetAtTime(v,t,.003);L.G.gain.setTargetAtTime(0,t+dur,.04)}
function rkSy(K,t,m,dur,v,cut){K.sy.o.forEach((o,i)=>o.frequency.setValueAtTime(mzF(m-(i===2?12:0)),t));K.sy.f.frequency.setValueAtTime(cut*3.2,t);K.sy.f.frequency.setTargetAtTime(cut,t,.035);rkGate(K.sy.G,t,v,dur,.002,.03)}
/* ---------- ตัวเรียงจังหวะ (เรียกทุกโน้ต 1/16 จาก musTick) ---------- */
function rkStep(T,t,st){const B=MZ.bus;if(!B)return;const K=rkBus(B),D=K.d,s16=60/T.bpm/4,b16=st%16,iv=T.iv;
  let S,bb,prev='I';if(st<64){S='I';bb=Math.floor(st/16)}else{const nb=T.form.length*4,bar=Math.floor((st-64)/16)%nb,si=Math.floor(bar/4);S=T.form[si];bb=bar%4;prev=T.form[(si+T.form.length-1)%T.form.length]}
  const deg=T.pr[S][bb],cr=T.root+iv(deg)-(iv(deg)>6?12:0);
  const hit=(b,v,pan,bus,rate)=>rkHit(K,b,t,v,pan,bus||K.dr,rate),kick=v=>hit(D.kick,v,0,K.dk),sn=v=>hit(D.snare,v);
  /* อินโทร: กรองเสียงกีตาร์ไว้แล้วค่อยเปิด */
  if(st===0){K.gl.frequency.cancelScheduledValues(t);K.gl.frequency.setValueAtTime(380,t);K.gl.frequency.exponentialRampToValueAtTime(2600,t+s16*48);K.gl.frequency.exponentialRampToValueAtTime(14000,t+s16*64)}
  /* ---- กีตาร์ + เบส ---- */
  let gc='.';
  if(S==='P'){const d=T.trem[(bb%2)*16+b16]+deg-1;let m=T.root+12+iv(d);if(m>T.root+30)m-=12;rkGt(K,t,m,s16*.92,.42,b16%4===0?1:0,0);gc=b16%4===0?'X':'x';if(b16%2===0)rkBs(K,t,cr-12,s16*1.8,.5)}
  else{const rh=S==='I'?(bb<2?'X---------------':T.rh.V):S==='B'?T.rh.B:S==='C'?T.rh.C:S==='S'?T.rh.S:T.rh.V,po=T.po[S]||T.po.V;let c=rh[b16],off=po[b16];
    if(T.turn&&bb===3&&b16>=12&&(S==='V'||S==='S')){c='x';off=b16-16}
    gc=c;if(c==='x'||c==='X'||c==='o'){let n=1;while(b16+n<16&&rh[b16+n]==='-')n++;const mute=c==='x',dur=mute?s16*.8:s16*n*.97,m=cr+off;
      rkGt(K,t,m,dur,c==='X'?.6:mute?.5:.55,c==='o'?0:c==='X'&&S==='C'?2:1,mute);rkBs(K,t,(c==='o'?cr:m)-12,dur,.62)}}
  /* ---- กลอง ---- */
  const fill=bb===3&&b16>=12&&S!=='I'&&S!=='B';
  if(S==='I'){if(bb===0&&b16===0)hit(D.boom,.8,0,K.dk);if(b16%4===0)kick(.85);if(bb>=1&&b16%2===0)hit(D.hat,b16%4?.18:.28);if(bb===2&&(b16===4||b16===12))sn(.55);
    if(bb===3&&(b16%2===0||b16>=8))sn(.18+b16*.045);const rs=64-Math.round(2.6/s16);if(st===rs||(rs<0&&st===0))hit(D.riser,.55)}
  else{if(bb===0&&b16===0){hit(D.crash,.8,-.3);if(S==='C'||S==='P'||prev==='B'||prev==='S')hit(D.boom,.75,0,K.dk)}
    if(fill){hit([D.t1,D.t1,D.t2,D.t3][b16-12],.85,[.35,.35,0,-.35][b16-12]);if(b16%2===0)kick(.8)}
    else if(S==='V'||S==='S'){const k=T.vdr==='gallop'?b16%4!==1:T.vdr==='dbl16'?true:'xXo'.indexOf(gc)>=0;if(k)kick(b16%4===0?.95:.7);if(b16===4||b16===12)sn(.95);
      if(b16%2===0)S==='S'?hit(D.ride,.32,.25):hit(D.hat,b16%4?.2:.3,.2);if(b16===0&&bb===2)hit(D.crash,.5,.3)}
    else if(S==='P'){if(T.blast){if(b16%2===0)kick(.72);else sn(.55);if(b16%4===0)hit(D.crash,.32,b16%8?.3:-.3)}else{if(b16%4===0)kick(.9);if(b16%4===2)sn(.8);if(b16%2===0)hit(D.ride,.3,.2)}}
    else if(S==='C'){if(T.dbl!==0&&(T.vdr!=='follow'?true:b16%2===0))kick(b16%4===0?.95:.65);if(b16===4||b16===12)sn(1);if(b16%4===0)hit(D.crash,.38,b16%8?.35:-.35);if(bb===3&&b16===8)hit(D.china,.55,.4)}
    else if(S==='B'){if(gc==='X'||gc==='x')kick(gc==='X'?1:.8);if(b16===8)sn(1);if(gc==='X')hit(D.china,.5,.35);else if(b16%4===0)hit(D.hatO,.16,-.2)}}
  /* ---- ซินธ์ ---- */
  if(S==='I'||S==='C'||(S==='V'&&T.ind)){const d=T.arp[b16%8]+deg-1,cut=S==='I'?500+bb*900+b16*40:S==='C'?2600:1700;rkSy(K,t,T.root+36+iv(d)-(iv(d)>14?12:0),s16*.8,S==='I'?.5:.38,cut)}
  /* ---- คอรัสมืด ---- */
  if(S==='C'&&b16===0)[deg,deg+2,deg+4].forEach((d,i)=>mzNote('choir',T.root+24+iv(d),t,s16*16,.05,{fm:720,pan:(i-1)*.45}));
  if(S==='B'&&b16===0&&bb%2===0)mzNote('choir',T.root+24,t,s16*32,.055,{fm:520});
  /* ---- กีตาร์โซโล่ ---- */
  const L1=K.ld[0],L2=K.ld[1];
  if(S==='C'&&b16%2===0){const k=bb*8+b16/2,tok=T.mel[k%T.mel.length];if(tok!=='.'&&tok!=='_'){let len=1;while(len<8&&T.mel[(k+len)%T.mel.length]==='_')len++;const base=T.root+24+(T.hiL?12:0),dur=s16*2*len*.96;
    rkLd(L1,t,base+iv(tok),dur,.5,len>=3);rkLd(L2,t,base+iv(tok+T.harm),dur,.42,len>=3)}}
  if(S==='S'){const k=bb*16+b16,tok=T.solo[k];if(tok!=='_'){let len=1;while(len<8&&T.solo[k+len]==='_')len++;const base=T.root+24+(T.hiL?12:0),dur=s16*len*.95,bend=T.sb.indexOf(k)>=0;
    rkLd(L1,t,base+iv(tok),dur,.5,bend);if(bb>=2)rkLd(L2,t,base+iv(tok+T.harm),dur,.4,bend)}}
}
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
/* ---------- เลือกเพลงตามบอสที่อยู่ใกล้ ---------- */
function rkKey(){try{let b=null,bd=1e9;for(const m of mons){if(m.t!==3)continue;const d=Math.hypot(m.x-me.x,m.y-me.y);if(d<bd){bd=d;b=m}}if(!b||bd>=650)return'';
  let n='';try{const S=BS();n=S&&S.n&&S.n!=='-'?S.n:''}catch(e){}if(b.mvp)n='MVP:'+n;if(!n)n='map'+curMap;if(typeof isTw==='function'&&isTw())n='tw'+(typeof twF==='function'?twF():'');return'rk:'+n}catch(e){return''}}
