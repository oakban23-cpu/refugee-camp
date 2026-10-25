/* ===== v520 ตัวละครผู้เล่น ช่วง 1: ชุดเกราะที่สวมในเกมวาดใหม่ — 3 แบบตามสายอาชีพ × 7 ระดับ + ชุดเซ็ต 6 แบบ
   นักรบ (melee/guard) = เกราะหนัก · ธนู/นักฆ่า (archer/assn/merchant) = เกราะเบา · เวท/ซัพ (mage/sup) = ชุดคลุม
   สีและลวดลายตรงกับไอคอน v518 (ITP / itSetPal) · Ancient (r5) แยกจาก Relic ด้วยรหัสชุด +40 (ตัวถอดรหัสเดิมยังได้ทองเหมือนเก่า)
   แทน drawArmorLook0 ทางชื่อ · error → แบบเดิม · ชุดเงา/พายุ/ราก ยังวาดลายเสริมเดิมทับ (armorShadow/Storm/Root) ===== */
const AL={on:1,err:'',n:0};
const ALFAM={melee:'h',guard:'h',archer:'l',assn:'l',merchant:'l',mage:'r',sup:'r'};
function alDec(c){c=c|0;if(!c)return null;const X=lkX(c);if(X)return{T:6,set:X===1?5:X===2?4:6,gw:1};const t=c%10,gw=(c%20)>=10;
  if(t===9)return{T:6,set:0,gw};if(t>=6&&t<=8)return{T:6,set:t-5,gw};if(t<1)return null;return{T:t===5&&Math.floor((c%100)/20)>=2?5:t-1,set:0,gw}}
/* เส้นทาง: [x,y] หรือ ['q',cx,cy,x,y] · เติมไล่เฉดแนวตั้ง (chSh แคชไว้แล้ว) + เส้นขอบ */
function alPath(P){g.beginPath();g.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++){const p=P[i];if(p[0]==='q')g.quadraticCurveTo(p[1],p[2],p[3],p[4]);else g.lineTo(p[0],p[1])}g.closePath()}
function alF(P,c,y0,y1,st){alPath(P);g.fillStyle=chSh(c,y0,y1);g.fill();if(st!==0){g.lineWidth=st||1;g.strokeStyle=O0;g.stroke()}}
function alL(P,c,w){if(LOWQ&&w<=.8)return;g.beginPath();g.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++){const p=P[i];if(p[0]==='q')g.quadraticCurveTo(p[1],p[2],p[3],p[4]);else g.lineTo(p[0],p[1])}g.strokeStyle=c;g.lineWidth=w;g.stroke()}
function alE(cx,cy,rx,ry,c,st){g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.fillStyle=chSh(c,cy-ry,cy+ry);g.fill();if(st!==0){g.lineWidth=st||1;g.strokeStyle=O0;g.stroke()}}
let ALH=null;function alHG(){if(!ALH){ALH=g.createLinearGradient(-7,0,7,0);ALH.addColorStop(0,'rgba(255,255,255,.34)');ALH.addColorStop(.32,'rgba(255,255,255,0)');ALH.addColorStop(.62,'rgba(0,0,0,0)');ALH.addColorStop(1,'rgba(0,0,0,.3)')}return ALH}
function alBevel(P,x0,x1,y0,y1){if(LOWQ)return;alPath(P);g.fillStyle=alHG();g.fill()}
function alGem(x,y,r,c,gw){if(!c)return;if(LOWQ){g.fillStyle=c;g.beginPath();g.arc(x,y,r*.85,0,7);g.fill();return}if(gw&&!LOWQ){g.globalAlpha=.35;g.fillStyle=c;g.beginPath();g.arc(x,y,r*2.1,0,7);g.fill();g.globalAlpha=.6;g.beginPath();g.arc(x,y,r*1.45,0,7);g.fill();g.globalAlpha=1}g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*.86,y-r*.2);g.lineTo(x+r*.5,y+r);g.lineTo(x-r*.5,y+r);g.lineTo(x-r*.86,y-r*.2);g.closePath();g.fillStyle=c;g.fill();g.lineWidth=.7;g.strokeStyle=O0;g.stroke();g.fillStyle='rgba(255,255,255,.85)';g.fillRect(x-r*.45,y-r*.55,r*.4,r*.4)}
function alStar(x,y,r,c){g.fillStyle=c;g.beginPath();for(let k=0;k<8;k++){const rr=k%2?r*.35:r,a=k*.785-1.571;g.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}g.closePath();g.fill()}
function alSpike(x,y,dx,dy,w,c){g.beginPath();g.moveTo(x-w,y);g.lineTo(x+dx,y+dy);g.lineTo(x+w,y);g.closePath();g.fillStyle=c;g.fill();g.lineWidth=.7;g.strokeStyle=O0;g.stroke()}
/* ลวดลายประจำชุดเซ็ตบนอก */
function alSetMark(id,x,y,P){g.save();g.lineWidth=.8;g.strokeStyle=P.l;g.fillStyle=P.l;
  if(id===1){g.beginPath();g.moveTo(x,y+2.4);g.lineTo(x,y-2.2);for(const s of[-1,0,1]){g.moveTo(x+s*1.4,y-.6);g.lineTo(x+s*1.4,y-2.4)}g.moveTo(x-1.4,y-.6);g.lineTo(x+1.4,y-.6);g.stroke()}
  else if(id===2){g.beginPath();g.moveTo(x-1.8,y-2);g.lineTo(x+1.8,y-2);g.lineTo(x+1.6,y+.4);g.quadraticCurveTo(x+.8,y+2,x,y+2.6);g.quadraticCurveTo(x-.8,y+2,x-1.6,y+.4);g.closePath();g.fillStyle=P.d;g.fill();g.stroke()}
  else if(id===3){g.beginPath();g.arc(x,y,1.3,0,7);g.fillStyle='#ffe08a';g.fill();g.strokeStyle='rgba(255,236,160,.9)';for(let i=0;i<8;i++){const a=i*.785;g.moveTo(x+Math.cos(a)*1.9,y+Math.sin(a)*1.9);g.lineTo(x+Math.cos(a)*2.9,y+Math.sin(a)*2.9)}g.stroke()}
  g.restore()}
/* ---------- เกราะหนัก ---------- */
function alHeavy(T,P,y,D,cls){const base=T===0&&!P.set,M=P,tr=T>=4||P.set?P.t:P.l;
  if(base){/* เสื้อหนัง: เชือกผูกอก บ่าหนัง */const pl=[[-6.3,-8.8+y],[6.3,-8.8+y],[6,3+y],[-6,3+y]];alF(pl,'#8a5a32',-8.8+y,3+y,1);alBevel(pl,-7,7,-9+y,3.4+y);
    g.strokeStyle='#e8d0a0';g.lineWidth=.6;for(let k=0;k<3;k++){g.beginPath();g.moveTo(-1.2,-6.6+k*2.6+y);g.lineTo(1.2,-5.4+k*2.6+y);g.moveTo(1.2,-6.6+k*2.6+y);g.lineTo(-1.2,-5.4+k*2.6+y);g.stroke()}
    alL([[0,-8.4+y],[0,2.6+y]],'rgba(60,30,10,.6)',.7);for(const s of[-1,1])alE(s*6.6,-8+y,3.4,2.4,'#6a4428');
    alF([[-6.4,2+y],[6.4,2+y],[6.4,4+y],[-6.4,4+y]],'#4a2e18',2+y,4+y,.8);g.fillStyle='#c8a050';g.fillRect(-1,1.9+y,2,2.2);return}
  /* กระโปรงเกราะ + ผ้าห้อยหน้า */
  for(let k=1;k>=0;k--){const y0=3+k*2.2+y;alF([[-5.6+k*.3,y0],[5.6-k*.3,y0],[5.2-k*.3,y0+2.6],['q',0,y0+3.4,-5.2+k*.3,y0+2.6]],M.m,y0,y0+3,.8)}
  alF([[-1.8,2.4+y],[1.8,2.4+y],[1.8,8+y],[0,9.4+y],[-1.8,8+y]],P.cl,2.4+y,9.4+y,.8);if(T>=4||P.set)alL([[-1.5,3.6+y],[1.5,3.6+y]],tr,.6);
  /* แผงอก */
  const pl=[[-6.2,-8.8+y],[-2,-8.8+y],['q',0,-7.6+y,2,-8.8+y],[6.2,-8.8+y],[6.4,-2.4+y],['q',6,2+y,4.6,3.2+y],[0,4+y],[-4.6,3.2+y],['q',-6,2+y,-6.4,-2.4+y]];
  alF(pl,M.m,-8.8+y,4+y,1.1);alBevel(pl,-7,7,-9+y,4.2+y);
  alL([[0,-7.6+y],[0,3.6+y]],'rgba(0,0,0,.35)',.8);alL([[-.6,-7.4+y],[-.6,3.2+y]],'rgba(255,255,255,.45)',.5);
  for(const yy of[-.6,1.6])alL([[-5.4,yy+y],['q',0,yy+1.4+y,5.4,yy+y]],'rgba(0,0,0,.32)',.6);
  if(T>=4||P.set){alL([[-6,-8.4+y],['q',0,-6.6+y,6,-8.4+y]],tr,.8);alL([[-4.4,3+y],[0,3.7+y],[4.4,3+y]],tr,.7)}
  if(T===3&&!P.set){g.save();g.globalAlpha=.8;alL([[-3.6,-6+y],['q',-2,-3.6+y,-3.4,-1.4+y]],P.t,.6);alL([[3.6,-6+y],['q',2,-3.6+y,3.4,-1.4+y]],P.t,.6);g.restore()}
  if(T>=2||P.set)alGem(0,-4+y,T>=4||P.set?1.8:1.5,P.set?P.g:P.g,D.gw||T>=3);
  if(P.set)alSetMark(P.set,0,.4+y,P);
  /* บ่าเกราะ 3 ชั้น */
  const pr=[0,3.8,4,4.2,4.6,4.8,4.6][T]||4.6;if(D.gw)lkGlow(D.c,performance.now()/1000,6);
  for(const s of[-1,1]){const cx=s*6.8,cy=-8+y;
    alF([[cx-s*pr*.9,cy+.4],['q',cx-s*pr*.4,cy-pr*.95,cx+s*pr*.6,cy-pr*.55],['q',cx+s*pr*1.15,cy+.2,cx+s*pr*.85,cy+pr*.7],['q',cx,cy+pr*.9,cx-s*pr*.9,cy+.4]],M.m,cy-pr,cy+pr*.9,1.1);
    g.shadowBlur=0;
    alL([[cx-s*pr*.55,cy+pr*.55],['q',cx+s*pr*.2,cy+pr*.95,cx+s*pr*.8,cy+pr*.45]],'rgba(0,0,0,.35)',.6);
    alL([[cx-s*pr*.4,cy-pr*.35],['q',cx+s*pr*.15,cy-pr*.8,cx+s*pr*.55,cy-pr*.4]],T>=4||P.set?tr:'rgba(255,255,255,.6)',.8);
    if(T>=5||P.set===2)for(let k=0;k<3;k++)alSpike(cx+s*(k*1.3-.6),cy-pr*.62+k*.5,s*.5,-2.6+k*.5,.7,tr);
    if(T>=6&&!P.set)alStar(cx+s*.6,cy-.6,1.3,'#ffffff');
    if(P.set===3){g.fillStyle='rgba(255,255,255,.92)';for(let k=0;k<2;k++){g.beginPath();g.moveTo(cx+s*pr*.6,cy-1+k*1.6);g.quadraticCurveTo(cx+s*(pr+3),cy-4+k*2,cx+s*(pr+4.4),cy-1+k*2);g.quadraticCurveTo(cx+s*(pr+1.6),cy-.6+k*1.6,cx+s*pr*.6,cy+.6+k*1.6);g.fill()}}
    if(T>=1)alE(cx,cy+pr*.15,.5,.5,T>=4?tr:'#e8ecf0',0)}}
/* ---------- เกราะเบา ---------- */
function alLight(T,P,y,D,cls){const base=T===0&&!P.set,tr=T>=4||P.set?P.t:P.l;
  const pl=[[-6.2,-8.8+y],[-2.2,-8.8+y],[0,-6.4+y],[2.2,-8.8+y],[6.2,-8.8+y],[5.9,3.2+y],[-5.9,3.2+y]];
  alF(pl,base?'#7a5030':P.m,-8.8+y,3.2+y,1);
  if(!base&&!LOWQ){g.strokeStyle=chAdj(P.d,-.1);g.globalAlpha=.55;g.lineWidth=.55;g.beginPath();for(let r=0;r<5;r++)for(let i=-2;i<=2;i++){const cx=i*2.1+(r%2)*1.05,cy=-7.2+r*2.3+y;if(cx>4.6)continue;g.moveTo(cx+1.15,cy);g.arc(cx,cy,1.15,0,Math.PI)}g.stroke();g.globalAlpha=1}
  alBevel(pl,-7,7,-9+y,3.4+y);
  if(base){g.strokeStyle='rgba(255,220,170,.5)';g.lineWidth=.5;g.setLineDash([.8,.8]);g.beginPath();g.moveTo(-5,-7.6+y);g.lineTo(-4.6,2.4+y);g.moveTo(5,-7.6+y);g.lineTo(4.6,2.4+y);g.stroke();g.setLineDash([])}
  /* ปกตั้ง */alF([[-2.6,-9.4+y],[2.6,-9.4+y],[1.6,-7.4+y],[0,-6.4+y],[-1.6,-7.4+y]],base?'#5a3a1e':P.d,-9.4+y,-6.4+y,.8);
  /* สายคาดไขว้ */alL([[-5.4,-8.2+y],[4.8,2.4+y]],O0,2.4);alL([[-5.4,-8.2+y],[4.8,2.4+y]],base?'#4a2e18':P.cl,1.5);if(!base)alL([[-5.2,-8.4+y],[4.6,2.2+y]],'rgba(255,255,255,.3)',.4);
  alF([[-1.2,-3.6+y],[1.2,-3.6+y],[1.2,-1.4+y],[-1.2,-1.4+y]],T>=4||P.set?tr:'#c8a050',-3.6+y,-1.4+y,.6);
  /* เข็มขัด + กระเป๋า */alF([[-6.2,2.2+y],[6.2,2.2+y],[6.2,4+y],[-6.2,4+y]],base?'#3a2414':chAdj(P.d,-.2),2.2+y,4+y,.8);
  alF([[2.8,3+y],[5.6,3+y],[5.4,6.4+y],[3,6.4+y]],base?'#6a4428':P.d,3+y,6.4+y,.7);g.fillStyle=T>=4||P.set?tr:'#c8a050';g.fillRect(-.9,2.1+y,1.8,2);
  /* ไหล่: เฉพาะแผ่นเล็ก */
  if(!base){if(D.gw)lkGlow(D.c,performance.now()/1000,5);for(const s of[-1,1]){const cx=s*6.4,cy=-8.2+y;alF([[cx-s*3,cy+.6],['q',cx-s*.6,cy-3,cx+s*3,cy-.6],['q',cx+s*3.4,cy+1.6,cx+s*2.2,cy+2.6],['q',cx,cy+2.4,cx-s*3,cy+.6]],P.m,cy-2.4,cy+2.6,1);g.shadowBlur=0;
      alL([[cx-s*1.8,cy-.6],['q',cx,cy-2.2,cx+s*2,cy-.6]],T>=4||P.set?tr:'rgba(255,255,255,.55)',.7);if(T>=5||P.set===5)alSpike(cx+s*1.2,cy-1.4,s*1.4,-2.6,.8,tr);if(T>=6&&!P.set)alStar(cx,cy,1.1,'#ffffff')}}
  else for(const s of[-1,1])alE(s*6.4,-8+y,2.8,2,'#6a4428');
  if(T>=2||P.set)alGem(-.2,-7.6+y,1.3,P.g,D.gw||T>=3);if(P.set)alSetMark(P.set,-3,-1+y,P);
  if(T>=4||P.set)alL([[-5.9,3.1+y],[5.9,3.1+y]],tr,.6)}
/* ---------- ชุดคลุม (เวท/ซัพ) ---------- */
function alRobe(T,P,y,D,cls){const base=T===0&&!P.set,tr=T>=4||P.set?P.t:P.l,mc=base?(cls==='sup'?'#c8b48a':'#6a5a7a'):P.m;
  /* แถบผ้าคลุมไหล่ยาวลงถึงชาย (stole) */
  for(const s of[-1,1]){const x0=s*2.6;alF([[x0-s*.2,-8.6+y],[x0+s*1.9,-8.6+y],[x0+s*2.3,9.6],[x0+s*1.1,11],[x0-s*.2,9.6]],base?'#8a7a5a':P.cl,-8.6+y,11,.8);
    if(T>=3||P.set){g.fillStyle=T>=4||P.set?tr:chAdj(P.cl,.5);for(let k=0;k<3;k++)g.fillRect(x0+s*.5-.4+(s>0?0:-.6),-2+k*3.6+y,1,1)}
    if(T>=4||P.set)alStar(x0+s*1,8.6,1.1,tr)}
  /* ชายเสื้อสีตามระดับ */alF([[-8.3,7.4],[8.3,7.4],[9.1,10.2],['q',0,11.2,-9.1,10.2]],base?'#8a7a5a':P.m,7.4,11,.9);alL([[-8.5,8.2],['q',0,9,8.5,8.2]],tr,.7);if(T>=4||P.set){g.fillStyle=tr;for(let k=-3;k<=3;k++){g.beginPath();g.arc(k*2.3,9.6+Math.abs(k)*.08,.42,0,7);g.fill()}}
  /* ผ้าคาดเอว */alF([[-7.2,1+y],[7.2,1+y],[7.4,3+y],[-7.4,3+y]],base?'#6a4428':chAdj(P.cl,-.25),1+y,3+y,.8);
  alF([[.6,2+y],[2.4,2.6+y],[2.6,6.6+y],[1.2,6.2+y]],base?'#6a4428':chAdj(P.cl,-.25),2+y,6.6+y,.6);
  /* ผ้าคลุมไหล่ (mantle) ขอบหยัก */
  const mp=[[-7.8,-9.6+y],[7.8,-9.6+y],['q',9.4,-7.6+y,8.6,-5+y],['q',6.6,-3.4+y,4.4,-4.6+y],['q',2.2,-3+y,0,-4.4+y],['q',-2.2,-3+y,-4.4,-4.6+y],['q',-6.6,-3.4+y,-8.6,-5+y],['q',-9.4,-7.6+y,-7.8,-9.6+y]];
  if(D.gw)lkGlow(D.c,performance.now()/1000,6);alF(mp,mc,-9.6+y,-3.4+y,1.1);g.shadowBlur=0;alBevel(mp,-10,10,-10+y,-3+y);
  if(!base)alL([[-8.3,-5.2+y],['q',-6.6,-3.8+y,-4.4,-4.9+y],['q',-2.2,-3.4+y,0,-4.7+y],['q',2.2,-3.4+y,4.4,-4.9+y],['q',6.6,-3.8+y,8.3,-5.2+y]],tr,.8);
  if(T>=4||P.set){g.fillStyle=tr;for(const[a,b]of[[-6,-7.4],[-3,-6.6],[3,-6.6],[6,-7.4]]){g.beginPath();g.arc(a,b+y,.45,0,7);g.fill()}}
  if(T>=5&&!P.set)for(const s of[-1,1])alSpike(s*7.6,-8.6+y,s*1.8,-1.8,.7,tr);
  if(T>=6&&!P.set){alStar(-5.6,-6.8+y,1.2,'#ffffff');alStar(5,-6.2+y,.9,'#ffe6f8')}
  /* เข็มกลัดคอ */if(T>=1||P.set){alE(0,-8.4+y,1.5,1.2,T>=4||P.set?tr:'#c8ccd4',.7);if(T>=2||P.set)alGem(0,-8.5+y,1.05,P.g,D.gw||T>=3)}
  if(P.set)alSetMark(P.set,0,5.4,P);
  if(P.set===3)for(const s of[-1,1]){g.fillStyle='rgba(255,255,255,.92)';g.beginPath();g.moveTo(s*7.6,-8+y);g.quadraticCurveTo(s*11,-11+y,s*12.4,-8+y);g.quadraticCurveTo(s*10,-7.6+y,s*7.6,-6.4+y);g.fill();g.strokeStyle='#c89028';g.lineWidth=.5;g.stroke()}}
function alV(cls,c,br,E,Pg){const D=alDec(c);if(!D)return;D.c=c;const P=D.set?itSetPal(D.set):ITP[D.T],y=br*.3,f=ALFAM[cls]||'h';
  if(f==='r')alRobe(D.T,P,y,D,cls);else if(f==='l')alLight(D.T,P,y,D,cls);else alHeavy(D.T,P,y,D,cls);AL.n++}
{const old=drawArmorLook0;drawArmorLook0=function(cls,c,br,E,Pg){if(AL.on){g.save();try{alV(cls,c,br,E,Pg);g.restore();return}catch(e){AL.err=String(e&&e.stack||e).slice(0,300);g.restore()}}return old.apply(this,arguments)};drawArmorLook0.old=old}
