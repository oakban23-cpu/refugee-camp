/* ===== v667 · ค่ายผู้อพยพโฉมใหม่ (ภาพวาดจาก ChatGPT 7 รายการ) =====
   - hd-cp-t.webp ลายพื้น 7 แบบ (หญ้า หญ้ามีดอก ทางดิน โคลน หินปูถนน ลานแผ่นหิน น้ำ) → พื้นโลกแมพ 1 (g0–g3) + พื้นในค่าย + ทางเดิน + ลำธาร
   - hd-cp.webp ต้นไม้ 12 · ของในป่า 18 · ของริมน้ำ 12 · บ่อ · รังมอน 8 · ของในค่าย 24
   - ต้นไม้/หิน/พุ่มรอบค่ายใช้ชุดใหม่ (ตำแหน่ง/กันชนเดิม) · ลำธารมีตลิ่งโคลน กก หิน ใบบัว เป็ด สะพานไม้ตรงทางข้าม
   - ทุ่งดอกไม้ใช้ดอกไม้/เห็ด/เฟิร์นภาพวาด · รังมอน 9 รังหน้าตาต่างกัน · บ่อตกปลาเป็นภาพวาด · ของในค่าย (เล้าไก่ แพะ หมา แมว ราวตากผ้า …)
   - ใช้เมื่อเปิด HD (ไม่ใช่โหมดประหยัดที่ปิด HD) · โหลดไม่ได้ = ภาพเดิม · ปิด: CPG.on=0 */
const CPG={M:__M__,T:__T__,I:{},ok:0,on:1,tc:{},st:false,n0:null};
function cpLoad(){if(CPG.I.a||!CPG.on)return;let n=0;[['a','hd-cp.webp'],['t','hd-cp-t.webp']].forEach(([k,s])=>{const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{if(++n===2&&CPG.ok===0)CPG.ok=1})};im.onerror=()=>{CPG.ok=-1};im.src=s;CPG.I[k]=im})}
function cpOk(){try{return !!CPG.on&&CPG.ok===1&&HDI.on&&!lqHD()}catch(e){return false}}
function cpTex(k){if(CPG.tc[k])return CPG.tc[k];const r=CPG.T[k],c=document.createElement('canvas');c.width=r[2];c.height=r[3];c.getContext('2d').drawImage(CPG.I.t,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return CPG.tc[k]=c}
function cpPat(c,k,sc,ox,oy){const p=c.createPattern(cpTex(k),'repeat');try{p.setTransform(new DOMMatrix().translate(ox||0,oy||0).scale(sc))}catch(e){}return p}
function cpSpr(c,k,x,by,w,fl,a){const r=CPG.M[k];if(!r)return 0;const h=w*r[3]/r[2];c.save();if(a!==undefined)c.globalAlpha*=a;if(fl){c.translate(x,0);c.scale(-1,1);c.translate(-x,0)}c.drawImage(CPG.I.a,r[0],r[1],r[2],r[3],x-w/2,by-h,w,h);c.restore();return h}
function cpShd(c,x,y,rx,ry,a){c.save();c.translate(x,y);c.scale(1,ry/rx);const gr=c.createRadialGradient(0,0,rx*.2,0,0,rx);gr.addColorStop(0,'rgba(10,8,6,'+(a||.3)+')');gr.addColorStop(1,'rgba(10,8,6,0)');c.fillStyle=gr;c.beginPath();c.arc(0,0,rx,0,7);c.fill();c.restore()}
/* ---------- พื้นโลก (กระเบื้อง MX ของแมพ 1 / ทุ่งรอบบ้านกิลด์) ---------- */
const CPMX={g0:['grass',0],g1:['grass','rgba(6,24,10,.36)'],g2:['meadow',0],g3:['mud',0]},CPS=.82;
mxTile=(f=>function(key,fn){try{const pre='mx'+MX.v,k=key.indexOf(pre)===0?key.slice(pre.length):'',q=CPMX[k];
  if(q&&cpOk()){const T0=MX.tile[key];if(T0&&T0.cp)return T0;const src=cpTex(q[0]),c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d');x.drawImage(src,0,0);if(q[1]){x.fillStyle=q[1];x.fillRect(0,0,c.width,c.height)}
    const p=x.createPattern(c,'repeat');try{p.setTransform(new DOMMatrix().scale(CPS))}catch(e){}return MX.tile[key]={p,c,cp:1}}
  const T1=MX.tile[key];if(T1&&T1.cp)delete MX.tile[key]}catch(e){}return f.apply(this,arguments)})(mxTile);
/* ---------- ทางเดิน · ลำธาร · ทุ่งดอกไม้ (อบลงชังก์พื้น) ---------- */
function cpLine(c,P,w,st,a){c.globalAlpha=a===undefined?1:a;c.strokeStyle=st;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();P.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();c.globalAlpha=1}
function cpTrail(c,f){const P=f.pts,w=f.w;cpLine(c,P,w+24,cpPat(c,'mud',.6),.32);cpLine(c,P,w+8,cpPat(c,'dirt',.6),.6);cpLine(c,P,w-8,cpPat(c,'dirt',.6),.92);cpLine(c,P,w-8,'rgba(70,52,34,.16)');cpLine(c,P,w*.35,'rgba(255,236,200,.07)')}
function cpStream(c,f){const P=f.pts,w=f.w,R=depRng(4477);
  cpLine(c,P,w+34,cpPat(c,'mud',.55),.45);cpLine(c,P,w+20,cpPat(c,'mud',.55),.95);cpLine(c,P,w+5,'rgba(22,34,26,.5)');cpLine(c,P,w,cpPat(c,'water',.5));cpLine(c,P,w,'rgba(16,74,104,.34)');cpLine(c,P,w*.55,'rgba(170,225,240,.12)');
  const it=[];for(let i=2;i<P.length-2;i+=3){const[x,y]=P[i],[x2,y2]=P[i+1],dx=x2-x,dy=y2-y,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,sd=R()<.5?-1:1,q=R(),u=R(),v=R(),fl=R()<.5,ox=x+nx*sd*(w/2+11),oy=y+ny*sd*(w/2+11);
    if(q<.3)it.push([oy+6,'REEDS_'+(u<.5?'A':'B'),ox,32+v*12,fl]);else if(q<.44)it.push([oy+8,'BANK_ROCKS',ox,40+v*10,fl]);else if(q<.5)it.push([y+5,'WATER_ROCKS',x+nx*(u-.5)*w*.3,22+v*6,fl]);else if(q<.58)it.push([y+7,'LILY_PADS',x+nx*(u-.5)*w*.35,22+v*6,fl]);else if(q<.62)it.push([y+6,'WATER_FLOWERS',x+nx*(u-.5)*w*.3,22,fl])}
  {const i=P.length*.36|0,[x,y]=P[i];it.push([y+8,'LOG_IN_WATER',x,58,0])}{const i=P.length*.62|0,[x,y]=P[i];it.push([y+6,'DUCK_FAMILY',x+4,44,1])}
  /* สะพานตรงจุดที่ทางเดินข้ามลำธาร */
  try{for(const t of DEPF.L){if(t.k!=='trail')continue;let best=null,bd=1e9;for(let i=0;i<P.length;i+=2)for(let j=0;j<t.pts.length;j++){const d=Math.hypot(P[i][0]-t.pts[j][0],P[i][1]-t.pts[j][1]);if(d<bd){bd=d;best=i}}
      if(best!==null&&bd<w){const a=P[Math.max(0,best-2)],b=P[Math.min(P.length-1,best+2)];if(Math.abs(b[1]-a[1])>Math.abs(b[0]-a[0])){const[x,y]=P[best];it.push([y+30,'BRIDGE_WOOD',x,w+74,0,1])}}}}catch(e){}
  it.sort((a,b)=>a[0]-b[0]);for(const[by,k,x,ww,fl,br]of it){if(br){cpShd(c,x+4,by-2,ww*.48,8,.35);cpSpr(c,k,x,by,ww,fl)}else{if(k!=='LILY_PADS'&&k!=='WATER_FLOWERS')cpShd(c,x+2,by-2,ww*.4,ww*.1,.28);cpSpr(c,k,x,by,ww,fl)}}}
function cpMeadow(c,f){const R=depRng((f.x|0)*3+(f.y|0)),x0=f.x,y0=f.y,r=f.r;
  for(const[k,a]of[[1,.22],[.78,.22],[.55,.22]]){c.save();c.globalAlpha=a;c.fillStyle=cpPat(c,'meadow',.6);c.beginPath();c.ellipse(x0,y0,r*k,r*k*.7,0,0,7);c.fill();c.restore()}
  const K=['FLOWERS_RED','FLOWERS_BLUE','FLOWERS_YELLOW'][f.v%3],L=[];for(let i=0;i<r/9;i++){const a=R()*6.283,d=Math.sqrt(R())*r*.85,x=x0+Math.cos(a)*d,y=y0+Math.sin(a)*d*.7,q=R(),s=R(),fl=R()<.5;
    L.push([y,q<.55?K:q<.7?['FLOWERS_RED','FLOWERS_BLUE','FLOWERS_YELLOW'][(s*3)|0]:q<.82?'TALL_GRASS':q<.92?'FERN':(s<.5?'MUSHROOMS_RED':'MUSHROOMS_BROWN'),x,q<.7?20+s*8:q<.82?24+s*6:q<.92?24:15+s*4,fl])}
  L.sort((a,b)=>a[0]-b[0]);for(const[y,k,x,w,fl]of L){cpShd(c,x+1,y-1,w*.32,w*.08,.22);cpSpr(c,k,x,y,w,fl)}}
depPaintF=(f0=>function(c,f,th){if(curMap===1&&cpOk()){try{if(f.k==='trail'){cpTrail(c,f);return}if(f.k==='stream'){cpStream(c,f);return}if(f.k==='meadow'){cpMeadow(c,f);return}}catch(e){console.warn('cp dep',e)}}return f0.apply(this,arguments)})(depPaintF);
/* ---------- ต้นไม้/ของในป่ารอบค่าย (ต่อระบบ NAT v580) ---------- */
const CPNV=[['OAK_BIG',12,4.4,.72,1],['OAK',16,3.6,.72,1],['PINE',12,2.9,.74,1],['PINE_SMALL',6,2.2,.74,1],['BIRCH',10,2.7,.72,1],['BLOSSOM',5,3.4,.76,1],['MAPLE',5,3.6,.72,1],['WILLOW',3,3.9,.72,1],['FRUIT_TREE',4,3.4,.74,1],['POPLAR',5,1.7,.74,1],['DEAD_TREE',2,3.0,.74,0],
  ['ROCK_BIG',4,2.6,.85,0],['ROCK_MED',3,2.1,.85,0],['BUSH_ROUND',4,2.3,.8,0],['BUSH_BERRY',3,2.3,.8,0],['BUSH_FLOWER',3,2.3,.8,0],['TREE_STUMP',2,2.4,.85,0],['LOG',2,2.9,.8,0],['STANDING_STONE',1,1.6,.85,0],['ROOTS',1,2.6,.85,0],['THORNS',1,2.3,.82,0]];
function cpNat(on){try{if(!CPG.n0)CPG.n0={img:NAT.img,ok:NAT.ok,f:NAT.f,v:NAT.v,tot:NAT.tot};const S=on?{img:CPG.I.a,ok:1,f:Object.fromEntries(Object.entries(CPG.M)),v:CPNV,tot:CPNV.reduce((a,q)=>a+q[1],0)}:CPG.n0;
  NAT.img=S.img;NAT.ok=S.ok;NAT.f=S.f;NAT.v=S.v;NAT.tot=S.tot;NAT.c={};(trees||[]).forEach(t=>{delete t._nv})}catch(e){console.warn('cpNat',e)}}
/* ---------- รังมอน ---------- */
const CPNS=[['NEST_WOLF','255,150,80'],['NEST_BOAR','255,150,80'],['NEST_SLIME','140,255,90'],['NEST_SPIDER','220,200,255'],['NEST_MUSHROOM','90,255,220'],['NEST_GOBLIN','255,150,80'],['NEST_BONES','190,110,255'],['NEST_RUIN','255,70,40'],['NEST_WOLF','255,150,80']];
mxNest=(f0=>function(MP){if(curMap===1&&cpOk()&&MP&&MP.nests){const t=performance.now();MP.nests.forEach(([nx,ny],i)=>{if(nx<cam.x-140||nx>cam.x+W+140||ny<cam.y-160||ny>cam.y+H+120)return;const q=CPNS[i%CPNS.length];
    cpShd(g,nx+4,ny+30,70,16,.38);cpSpr(g,q[0],nx,ny+36,128,i%2===1);g.setLineDash([6,5]);g.strokeStyle='rgba(194,53,43,.42)';g.lineWidth=2;g.beginPath();g.arc(nx,ny,52,0,7);g.stroke();g.setLineDash([]);
    const ek=.5+.5*Math.sin(t/260+nx);g.save();g.globalCompositeOperation='lighter';glowAt(nx,ny+6,26,q[1],.18+ek*.16);g.restore()});return true}return f0.apply(this,arguments)})(mxNest);
/* ---------- บ่อตกปลาในค่าย ---------- */
function cpPond(w){if(!inView(w.x,w.y,w.rx+60))return;const r=CPG.M.POND_SMALL,x=w.x,y=w.y,rx=w.rx,ry=w.ry,ph=w.ph,t=performance.now()/1000,B=FBN[w.b]||['บ่อน้ำ','','','','200,240,255'],iw=2*(rx+20)/.96,ih=2*(ry+15)/.96;
  g.save();cpShd(g,x+4,y+8,rx+22,ry+14,.25);g.drawImage(CPG.I.a,r[0],r[1],r[2],r[3],x-iw/2,y-ih/2+2,iw,ih);g.beginPath();g.ellipse(x,y,rx*.9,ry*.85,0,0,7);g.clip();
  g.fillStyle='rgba(0,0,0,.2)';for(let i=0;i<(LOWQ?1:2);i++){const a=t*(.35+i*.17)+ph+i*3,fx0=x+Math.cos(a)*rx*.5,fy=y+Math.sin(a*1.3)*ry*.4,dir=-Math.sin(a)>=0?1:-1;g.beginPath();g.ellipse(fx0,fy,9,3.4,0,0,7);g.fill();g.beginPath();g.moveTo(fx0-dir*8,fy);g.lineTo(fx0-dir*14,fy-3.5);g.lineTo(fx0-dir*14,fy+3.5);g.closePath();g.fill()}
  g.strokeStyle='rgba(230,248,255,.5)';g.lineWidth=1.2;for(let i=0;i<5;i++){const q=(t*.25+i/5+ph)%1,a=ph*3+i*1.3,sx=x+Math.cos(a)*rx*.5,sy=y+Math.sin(a)*ry*.5;g.globalAlpha=Math.sin(q*Math.PI)*.75;g.beginPath();g.moveTo(sx-5-q*4,sy);g.lineTo(sx+5+q*4,sy);g.stroke()}g.globalAlpha=1;
  {const q=(t*.4+ph)%1;g.strokeStyle='rgba(230,248,255,'+(.35*(1-q))+')';g.beginPath();g.ellipse(x+Math.cos(ph)*rx*.3,y+Math.sin(ph)*ry*.3,4+q*24,(4+q*24)*.45,0,0,7);g.stroke()}g.restore();
  if(Math.hypot(me.x-x,me.y-y)<rx+220){g.font='bold 10px system-ui';g.textAlign='center';const lb='🎣 '+B[0],tw=g.measureText(lb).width+14;g.fillStyle='rgba(10,24,40,.7)';g.beginPath();g.roundRect(x-tw/2,y-ry-34,tw,15,7);g.fill();g.fillStyle='#bfe6ff';g.fillText(lb,x,y-ry-23)}}
fshDraw=(f0=>function(){if(curMap===1&&cpOk()&&FSWM===curMap&&FSW.length&&FSW.some(w=>w.b==='w')){const keep=FSW,mine=FSW.filter(w=>w.b==='w');FSW=FSW.filter(w=>w.b!=='w');try{f0.apply(this,arguments)}finally{FSW=keep}mine.forEach(w=>{try{cpPond(w)}catch(e){}});return}return f0.apply(this,arguments)})(fshDraw);
/* ---------- พื้นในค่าย (เรียกจาก campStatic) ---------- */
function cpCampGrass(R){g.save();g.beginPath();g.arc(0,0,R+34,0,7);g.clip();g.fillStyle=cpPat(g,'grass',CPS,-CX,-CY);g.fillRect(-R-40,-R-40,R*2+80,R*2+80);g.fillStyle='rgba(24,44,16,.12)';g.fillRect(-R-40,-R-40,R*2+80,R*2+80);
  g.globalCompositeOperation='destination-out';const gr=g.createRadialGradient(0,0,R-30,0,0,R+34);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,1)');g.fillStyle=gr;g.fillRect(-R-40,-R-40,R*2+80,R*2+80);g.restore()}
function cpRoad(R,H,PW){g.save();g.clip();const p=cpPat(g,'cobble',.42);for(let x=40;x<H;x+=24){const a=x<R-40?1:Math.max(0,1-(x-(R-40))/(H-R+20));if(a<=0)break;g.save();g.beginPath();g.rect(x,-PW-10,24.6,PW*2+20);g.clip();g.globalAlpha=a;g.fillStyle=p;g.fillRect(x,-PW-10,24.6,PW*2+20);g.restore()}
  const e=g.createLinearGradient(0,-PW-6,0,PW+6);e.addColorStop(0,'rgba(20,14,8,.35)');e.addColorStop(.18,'rgba(20,14,8,0)');e.addColorStop(.82,'rgba(20,14,8,0)');e.addColorStop(1,'rgba(20,14,8,.35)');g.fillStyle=e;g.fillRect(40,-PW-6,H-40,PW*2+12);g.restore()}
function cpPlaza(ry){g.save();g.beginPath();g.ellipse(0,0,139.2,139.2*ry,0,0,7);g.clip();g.fillStyle=cpPat(g,'plaza',.32);g.fillRect(-140,-124,280,248);
  g.fillStyle=cpPat(g,'dirt',.45);g.beginPath();g.ellipse(0,0,43.5,43.5*ry,0,0,7);g.fill();
  g.lineWidth=8.7;g.strokeStyle=cpPat(g,'grass',.5);g.beginPath();g.ellipse(0,0,88.4,88.4*ry,0,0,7);g.stroke();
  for(const[r,a]of[[43.5,.55],[84,.35],[92.8,.35],[134,.5]]){g.strokeStyle='rgba(30,22,14,'+a+')';g.lineWidth=1.6;g.beginPath();g.ellipse(0,0,r,r*ry,0,0,7);g.stroke()}
  const sh=g.createRadialGradient(0,-20,40,0,0,145);sh.addColorStop(0,'rgba(255,240,210,.08)');sh.addColorStop(1,'rgba(0,0,0,.18)');g.fillStyle=sh;g.fillRect(-140,-124,280,248);g.restore()}
/* ของในค่ายเพิ่ม (อบลงแคชพื้นค่าย หลังอาคาร HD) */
const CPCX=[['LAUNDRY_LINE',-330,-300,62],['FLOWER_POTS',-196,-206,30],['CHICKEN_COOP',372,-300,48],['CHICKEN',330,-262,16],['CHICKEN_BROWN',398,-258,15,1],['CHICKEN',300,-284,15,1],['GOAT',-118,398,30],['WATER_BARREL',-112,-80,20],
  ['DOG',-56,64,30],['CAT',62,66,16,1],['WHEELBARROW',-422,70,40],['TABLE_STOOLS',120,330,44],['CAULDRON',80,392,28],['BANNER_CAMP',-48,-168,20],['BANNER_CAMP',48,-168,20,1]];
campHDStatic=(f0=>function(){f0.apply(this,arguments);try{if(curMap===1&&cpOk()){const L=CPCX.slice().sort((a,b)=>a[2]-b[2]);for(const[k,x,by,w,fl]of L){cpShd(g,x+2,by-1,w*.42,Math.max(2.5,w*.1),.3);cpSpr(g,k,x,by,w,fl)}}}catch(e){console.warn('cp camp',e)}})(campHDStatic);
/* ---------- เปิด/ปิดตามสถานะการโหลด ---------- */
function cpReset(){try{for(const k of['g0','g1','g2','g3'])delete MX.tile['mx'+MX.v+k];MX.sig=null}catch(e){}try{CAMP.cache=null}catch(e){}}
setInterval(()=>{try{if(curMap===1&&HDI.on)cpLoad();const on=cpOk();if(on!==CPG.st){CPG.st=on;cpNat(on);cpReset()}}catch(e){}},700);
