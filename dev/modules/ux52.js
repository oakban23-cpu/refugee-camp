
/* ---------- v433 ยกระดับภาพตอนสู้ 7 ข้อ ----------
   ① ป้ายคอมโบทีม: ย่อป้ายในฉาก (ไม่มีบรรทัดชื่อ) + รวมเป็นป้ายเล็กชิดซ้ายจอ นับ ×n เด้งตอนเพิ่ม
   ② เพดานแสงเอฟเฟกต์: เอฟเฟกต์ของคนอื่นจางลง · เอฟเฟกต์ใหญ่ซ้อนกันหลายอันลดความสว่างรวม · แฟลชระเบิดซ้อนกันไม่ขาวโพลน
   ③ ตัวเลขดาเมจเล็ก ๆ ที่เด้งติดกันรวมเป็นเลขเดียว (ยอดรวม) + ×n
   ④ มอนไม่ยืนทับกันเป็นก้อน / ไม่ทับตัวผู้เล่น (คิดบนโฮสต์)
   ⑤ ท่าโยนขึ้น: หางแสง+เส้นความเร็วตอนลอย · ลงพื้น = หยุดค้างเสี้ยววิ จอสั่น พื้นแตก วงฝุ่น มอนกระเด็น
   ⑥ แสงกลางคืน: แหล่งแสงซ้อนจุดเดียวกันมีเพดานรวม (ไม่ฟุ้งขาวเป็นก้อน)
   ⑦ โหมดถ่ายรูปไม่วาดแผนที่มุมจอ */
let V33ON=1;const V33={rx:{},fr:-1,big:0};const NTB=[];
/* ---------- ⑥ งบแสงกลางคืน ---------- */
function ntBud(x,y,r,a){if(r<16||!(a>0))return a;let S=0;for(const L of NTB){const d=Math.hypot(L.x-x,L.y-y);if(d<L.r)S+=L.a*(1-d/L.r)}
  const CAP=.5,b=Math.min(a,Math.max(a*.3,CAP-S));NTB.push({x,y,r,a:b});if(NTB.length>80)NTB.shift();return b}
/* ---------- ② ตัวคูณความทึบเฉพาะตอนวาดเอฟเฟกต์ ---------- */
let V33M=1;const V33GA=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'globalAlpha');
const V33PD={configurable:true,get(){return V33GA.get.call(this)/V33M},set(v){v=+v;if(!(v>=0&&v<=1))return;V33GA.set.call(this,v*V33M)}};
/* ติดตัวดักเฉพาะช่วงที่ต้องลดแสง (ไม่เสียแรงกับการวาดส่วนอื่น) */
/* แสงแบบบวก (lighter) บนพื้นสว่างจะตัดเป็นขาวทันที → ระหว่างวาดเอฟเฟกต์ เปลี่ยนเป็นแบบ screen (สว่างขึ้นแต่ไม่ทะลุขาว) */
const V33GC=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'globalCompositeOperation');let V33SC=0;
const V33PC={configurable:true,get(){const v=V33GC.get.call(this);return v==='screen'&&V33SC?'lighter':v},set(v){V33GC.set.call(this,V33SC&&v==='lighter'?'screen':v)}};
function v33On(m,sc){V33M=m;V33SC=sc?1:0;try{if(m<.999)Object.defineProperty(g,'globalAlpha',V33PD);if(sc)Object.defineProperty(g,'globalCompositeOperation',V33PC)}catch(e){}}
function v33Off(){V33M=1;V33SC=0;try{delete g.globalAlpha;delete g.globalCompositeOperation}catch(e){}}
function v33Bud(){const n=performance.now();if(n===V33.fr)return;V33.fr=n;let b=0;
  try{for(const f of fxs){if(!(f.t>0))continue;if((f.r||40)>=70||(f.d||0)>=1)b++}}catch(e){}
  try{b+=Math.max(0,GX.fl.length-4)*.5}catch(e){}V33.big=b}
function v33Mul(f){v33Bud();const B=V33.big,k=B>2.5?Math.max(.5,1.58/Math.sqrt(B)):1;return(f&&f.by&&typeof uid!=='undefined'&&f.by!==uid?.68:1)*k}
/* ---------- ① ป้ายคอมโบทีมรวมชิดซ้ายจอ ---------- */
function v33RxNote(o){const R=RXD[o.r];if(!R)return;const now=performance.now();let e=V33.rx[o.r];if(!e||now-e.t>2600)e=V33.rx[o.r]={r:o.r,c:0,t0:now};
  e.c++;e.t=now;e.pop=now;if(o.tm&&o.n1){e.n1=String(o.n1).slice(0,14);e.n2=String(o.n2||'').slice(0,14)}}
function v33RR(x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath()}
/* วางใต้แผงเควสด้านซ้าย (ไม่ทับ) · ไม่ต่ำเกินครึ่งจอล่างที่มีจอยสติ๊ก */
function v33HudY(){const n=performance.now();if(n-(V33.yT||0)<400&&V33.y)return V33.y;V33.yT=n;let y=Math.round(H*.42);
  try{const c=($('c')||document.querySelector('#stage canvas')).getBoundingClientRect(),sc=c.height>0?H/c.height:1;
    for(const id of['stq','rnq','rbq','gwq','ptq']){const e=$(id);if(!e||e.hidden||!e.offsetParent)continue;const r=e.getBoundingClientRect();if(r.height>0&&r.left-c.left<c.width*.5)y=Math.max(y,Math.round((r.bottom-c.top)*sc)+22)}}catch(e){}
  return V33.y=Math.min(y,Math.round(H*.6))}
function v33RxHud(){if(!me||!me.cls)return;try{if(PH&&PH.on)return}catch(e){}const now=performance.now(),L=Object.values(V33.rx).filter(e=>now-e.t<2600).sort((a,b)=>b.t-a.t).slice(0,3);if(!L.length)return;
  g.save();g.setTransform(DPR||1,0,0,DPR||1,0,0);g.textBaseline='middle';g.textAlign='left';let y=v33HudY();
  for(const e of L){const R=RXD[e.r],age=(now-e.t)/1000,a=Math.max(0,Math.min(1,(2.6-age)/.5,(now-e.t0)/120+.2)),pp=Math.max(0,1-(now-e.pop)/200),sc=1+pp*.22;
    const nm=R[0]+' '+R[1];g.font='900 12px system-ui';const w1=g.measureText(nm).width,ct=e.c>1?'×'+e.c:'';g.font='900 13px system-ui';const w2=ct?g.measureText(ct).width+8:0,w=w1+w2+20;
    g.globalAlpha=a;g.save();g.translate(8,y);g.scale(sc,sc);
    g.fillStyle='rgba(14,10,22,.74)';v33RR(0,-12,w,24,12);g.fill();g.strokeStyle='rgba('+R[4]+',.85)';g.lineWidth=1.5;g.stroke();
    g.fillStyle='rgba('+R[4]+','+(.9*pp)+')';if(pp>0){v33RR(0,-12,w,24,12);g.globalCompositeOperation='lighter';g.globalAlpha=a*.35*pp;g.fill();g.globalCompositeOperation='source-over';g.globalAlpha=a}
    g.font='900 12px system-ui';g.lineWidth=3;g.strokeStyle='rgba(10,6,14,.9)';g.strokeText(nm,10,0);g.fillStyle='rgb('+R[4]+')';g.fillText(nm,10,0);
    if(ct){g.font='900 13px system-ui';g.strokeText(ct,14+w1,0);g.fillStyle='#fff';g.fillText(ct,14+w1,0)}
    if(e.n1){g.font='700 9.5px system-ui';const s='👥 คอมโบทีม · '+e.n1+(e.n2?' + '+e.n2:'');g.lineWidth=3;g.strokeText(s,6,19);g.fillStyle='#ffe08a';g.fillText(s,6,19)}
    g.restore();y+=e.n1?42:30}
  g.restore()}
/* ---------- ③ รวมตัวเลขดาเมจเล็ก ๆ ที่เด้งติดกัน ---------- */
function v33DnMerge(){const now=performance.now()/1000;for(const d of dn){if(d._m3||!(d.t>0))continue;d._m3=1;d._b3=now;
    if(typeof d.v!=='number'||d.s||d.c||d.vx===undefined)continue;
    const e=dn.find(q=>q!==d&&q._m3&&q.t>0&&typeof q.v==='number'&&!q.s&&!q.c&&q.vx!==undefined&&now-q._b3<.45&&Math.abs(q.x-d.x)<36&&Math.abs(q.y-d.y)<44);
    if(e){e.v+=d.v;e.n=(e.n||1)+1;e._b3=now;e.t=Math.max(e.t,d.t);e.d0=e.t;if(e.vy>-20)e.vy=-20;d.t=0}}}
/* ---------- ④ มอนเว้นระยะ + กระเด็น (โฮสต์) ---------- */
function v33Sep(dt){if(!mons||!mons.length)return;const P=[[me.x,me.y]];try{for(const u in others){const o=others[u];if(o&&!(o.hp<=0))P.push([o.x,o.y])}}catch(e){}
  const M=[];for(const m of mons){if(!m||m.hp<=0)continue;
    if(m.__kb){const k=m.__kb;m.x+=k.vx*dt;m.y+=k.vy*dt;k.vx*=Math.max(0,1-dt*7);k.vy*=Math.max(0,1-dt*7);k.t-=dt;if(k.t<=0)delete m.__kb}
    if(m.pv||m.wb||m.t>=3||m.dum||m.ally)continue;let nr=false;for(const p of P)if(Math.abs(p[0]-m.x)<220&&Math.abs(p[1]-m.y)<220){nr=true;break}if(nr)M.push(m)}
  if(M.length>60)M.length=60;const kk=Math.min(1,dt*10);
  for(let i=0;i<M.length;i++){const a=M[i],ra=mR(a);
    for(let j=i+1;j<M.length;j++){const b=M[j],dx=b.x-a.x,dy=b.y-a.y;if(Math.abs(dx)>60||Math.abs(dy)>60)continue;const d=Math.hypot(dx,dy),mn=(ra+mR(b))*.72;
      if(d<mn){if(d<.01){a.x-=.6;b.x+=.6;continue}const k=(mn-d)*.5*kk;a.x-=dx/d*k;a.y-=dy/d*k;b.x+=dx/d*k;b.y+=dy/d*k}}
    for(const p of P){const dx=a.x-p[0],dy=a.y-p[1],d=Math.hypot(dx,dy),mn=Math.min(19,ra*.5+12);if(d<mn&&d>.01){a.x=p[0]+dx/d*mn;a.y=p[1]+dy/d*mn}}}}
/* ---------- ⑤ ท่าโยน: หางแสงตอนลอย + กระแทกหนัก ---------- */
FXB.sktr=(f,p,x,y,r,now)=>{let J;try{J=SKJ[f.u]}catch(e){}if(!J||J.land)return;const n=performance.now(),pts=[];
  for(let i=0;i<9;i++){const P=skJPos(J,n-i*20);if(!P)break;pts.push([P.gx,P.gy-P.h-12])}if(pts.length<3)return;
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
  for(let i=0;i<pts.length-1;i++){const a=1-i/(pts.length-1);g.strokeStyle='rgba(255,232,160,'+(.5*a)+')';g.lineWidth=2+9*a;g.beginPath();g.moveTo(pts[i][0],pts[i][1]);g.lineTo(pts[i+1][0],pts[i+1][1]);g.stroke()}
  const h=pts[0],t=pts[pts.length-1],dx=h[0]-t[0],dy=h[1]-t[1],L=Math.hypot(dx,dy);
  if(L>6){const ux=dx/L,uy=dy/L,nx=-uy,ny=ux;g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1.3;
    for(const k of[-1,1]){const o=k*11;g.beginPath();g.moveTo(h[0]+nx*o-ux*8,h[1]+ny*o-uy*8);g.lineTo(h[0]+nx*o-ux*(30+L*.7),h[1]+ny*o-uy*(30+L*.7));g.stroke()}}
  g.restore()};
FXB.skshk=(f,p,x,y,r)=>{const a=1-p;g.save();const r1=r*(.35+.65*p);g.strokeStyle='rgba(255,240,200,'+(.75*a)+')';g.lineWidth=5*a+1;g.beginPath();g.ellipse(x,y,r1,r1*.42,0,0,7);g.stroke();
  const r2=r*(.2+.55*p);g.strokeStyle='rgba(110,82,52,'+(.45*a)+')';g.lineWidth=9*a+.5;g.beginPath();g.ellipse(x,y+2,r2,r2*.4,0,0,7);g.stroke();
  g.strokeStyle='rgba(235,220,185,'+(.6*a)+')';g.lineWidth=2;for(let i=0;i<12;i++){const an=i/12*6.283+fxR(f,i,1)*.4,r0=r*(.15+.5*p),r3=r0+r*(.12+.1*fxR(f,i,2))*a;g.beginPath();g.moveTo(x+Math.cos(an)*r0,y+Math.sin(an)*r0*.42);g.lineTo(x+Math.cos(an)*r3,y+Math.sin(an)*r3*.42);g.stroke()}
  g.restore()};
function v33Launch(o){if(!o||!Array.isArray(o.R))return;const n=Math.min(SKMAX,o.R.length);o.R.slice(0,n).forEach((u,k)=>{if(typeof u!=='string')return;const T=skJTimes(k+1);
    fxs.push({k:'sktr',u,x:o.x,y:o.y,r:60,t:T.L+.1,d:T.L+.1,s:0})});
  try{burst(o.x,o.y+4,['#d8c8a8','#b8a888'],LOWQ?5:12,120,.45,{g:30})}catch(e){}}
function v33Land(u,J){const x=J.tx,y=J.ty,R=64+12*J.n+8*J.lv,now=performance.now(),near=Math.hypot(me.x-x,me.y-y)<460;
  try{GX.dec.push({x,y:y+4,r:Math.min(140,R*.85),t:'crack',v:(J.lv*3.7)%9,s:now,l:2600})}catch(e){}
  try{fxs.push({k:'skshk',x,y,r:R*1.35,t:.55,d:.55,s:Math.random()*99})}catch(e){}
  try{burst(x,y+2,['#cdb894','#9c8a6c','#efe2c0'],LOWQ?6:16,230,.7,{g:40})}catch(e){}
  if(near){try{hitStop(85)}catch(e){}try{shk=Math.max(shk,.2+.04*J.lv)}catch(e){}}
  let host=true;try{host=isHost()}catch(e){}
  if(host)mons.forEach(m=>{if(!m||m.hp<=0||m.t>=3||m.pv||m.wb||m.ally)return;const dx=m.x-x,dy=m.y-y,d=Math.hypot(dx,dy);if(d>R+8||d<.01)return;const f=(1-d/(R+8))*260+80;m.__kb={vx:dx/d*f,vy:dy/d*f*.8,t:.24}})}
/* ---------- ติดตั้ง ---------- */
(function(){
  try{const _d=drawFx;drawFx=function(f){if(V33M<.999||V33SC||!V33ON)return _d.apply(this,arguments);const m=v33Mul(f);g.save();v33On(m,1);if(m<.999)g.globalAlpha=1;try{return _d.apply(this,arguments)}finally{v33Off();g.restore()}}}catch(e){console.warn('v33 fx',e)}
  try{const _f=gxFlashDraw;gxFlashDraw=function(){const n=GX.fl.length,m=n>3?Math.max(.45,1.7/Math.sqrt(n)):1;if(V33M<.999||V33SC||!V33ON)return _f.apply(this,arguments);v33On(m,1);try{return _f.apply(this,arguments)}finally{v33Off()}}}catch(e){}
  try{const _r=rxFx;rxFx=function(o){const r=_r.apply(this,arguments);try{if(o&&o.k!=='el'&&RXD[o.r])v33RxNote(o)}catch(e){}return r}}catch(e){}
  try{const _v=vigDraw;vigDraw=function(){const r=_v.apply(this,arguments);try{v33RxHud()}catch(e){}return r}}catch(e){}
  try{const _s=dnStack;dnStack=function(){try{v33DnMerge()}catch(e){}return _s.apply(this,arguments)}}catch(e){}
  try{const _h=simHost;simHost=function(dt){const r=_h.apply(this,arguments);try{v33Sep(dt)}catch(e){}return r}}catch(e){}
  try{const _l=skLaunchFx;skLaunchFx=function(o){const r=_l.apply(this,arguments);try{v33Launch(o)}catch(e){}return r}}catch(e){}
  try{const _k=skLand;skLand=function(u,J){const r=_k.apply(this,arguments);try{v33Land(u,J)}catch(e){}return r}}catch(e){}
  try{const _m=uisMini;uisMini=function(){try{if(PH&&PH.on)return}catch(e){}return _m.apply(this,arguments)}}catch(e){}
})();
