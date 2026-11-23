/* ---------- v653 นครอัสตราโฉมใหม่ (AST) · ภาพวาดจาก ChatGPT 12 ภาพ ----------
   · พื้น: หินปูถนน (hd-tx-cobble) · ถนนหลวงแผ่นหินอ่อน (hd-tx-avenue · ถนนแนวตั้งหมุน 90°) · หญ้า (hd-tx-lawn) ลงในพื้นแคชเดิม (cityGroundGen)
     ลายเดิมจาก ChatGPT เป็นภาพพลิกกระจก → สร้าง tile ใหม่ด้วย image quilting / เรียงแผ่นหินใหม่ (dev/art/chatgpt_job/astra_makeover/texfix.py)
     + ของประดับพื้น 24 แบบ กระจาย ~120 ชิ้น (seed คงที่) + เหรียญโมเสกดาวบนถนนหลวง · สวน 4 แปลงเป็นหญ้าภาพวาดขอบหินขาวทอง + ชิ้นสวนภาพวาด
   · บ้าน 7 หลังเป็นบ้านภาพวาดคนละแบบ · หอกำแพง 10 หอ · ประตูเมืองใต้ · กำแพงทั้งวงใช้แถบกำแพงภาพวาดหั่นเป็นเส้นตามแนววง
     เสาไฟ/เสาธงริมถนนเป็นชุดใหม่
   · ท้องฟ้ารอบเกาะเป็นลายฟ้าภาพวาดเลื่อนพารัลแลกซ์ · หน้าผาใต้เกาะภาพวาด (รากไม้ คริสตัล น้ำตก) · เกาะลอย 8 เกาะ + เกาะประตูซ้าย/ขวา
   · โหลดภาพตอนเข้าเกม (ว่าง) หรือเมื่อเข้าเมือง · มาถึงทีหลัง → สร้างพื้น/กำแพงใหม่เบื้องหลังแล้วสลับ (ไม่กระพริบ)
   · ปิดภาพ HD หรือโหลดไม่ได้ → แบบเดิมทั้งหมด · ปิด: AST.off=1 */
const AST={off:0,ok:0,err:'',ld:0,n:0,im:{},gu:0,re:null,
  SRC:{a1:'hd-ast1.webp',a2:'hd-ast2.webp',ad:'hd-astd.webp',au:'hd-astu.webp',tc:'hd-tx-cobble.webp',ta:'hd-tx-avenue.webp',tl:'hd-tx-lawn.webp',ts:'hd-tx-sky.webp'},
f1:{"h0":[0,0,199,257],"h1":[202,0,149,257],"h3":[354,0,198,257],"h4":[555,0,197,257],"towA":[755,0,121,257],"towB":[879,0,120,257],"bast":[1002,0,172,257],"lamp":[1177,0,96,257],"flag":[1276,0,97,257],"turr":[1376,0,101,249],"h7":[0,260,211,237],"ggaz":[214,260,204,234],"h2":[421,260,211,233],"h5":[635,260,211,232],"bgate":[849,260,199,221],"garch":[1051,260,204,221],"gtree":[1258,260,204,218],"h6":[0,500,211,212],"fount":[214,500,202,205],"gbed":[419,500,203,179],"gpond":[625,500,204,167],"glong":[832,500,204,154],"ghedge":[1039,500,202,151],"glav":[1244,500,204,139]},
f2:{"gate":[0,0,1106,550],"i1":[1109,0,182,257],"i3":[1294,0,173,257],"i5":[0,553,177,257],"i0":[180,553,178,256],"ip1":[361,553,203,233],"ip0":[567,553,210,226],"wseg":[780,553,768,214],"i4":[0,813,154,181],"i2":[157,813,82,99]},
fd:{"d10":[0,0,146,144],"d22":[149,0,125,125],"d11":[277,0,129,123],"d16":[409,0,127,121],"d21":[539,0,129,119],"d5":[671,0,122,118],"d3":[796,0,129,115],"d4":[0,147,126,112],"d6":[129,147,113,112],"d8":[245,147,129,112],"d2":[377,147,122,111],"d1":[502,147,114,110],"d19":[619,147,129,110],"d18":[751,147,123,107],"d12":[877,147,129,106],"d0":[0,262,110,104],"d14":[113,262,128,104],"d23":[244,262,117,101],"d7":[364,262,129,98],"d15":[496,262,129,93],"d17":[628,262,120,87],"d9":[751,262,80,80],"d13":[834,262,129,64],"d20":[0,369,146,42]},
U:[1536, 1011, 8],
  HV:{'1200,1990':7,'1360,2095':5,'2200,1360':1,'1055,1420':4,'1000,1780':0,'2210,1830':2,'1130,1200':3},
  GP:[[1395,1440,'garch',70],[1340,1500,'glong',74],[1450,1500,'glav',74],[1745,1500,'gbed',62],[1830,1500,'ghedge',62],[1787,1442,'gtree',54],
      [1390,1820,'gpond',96],[1322,1772,'gtree',56],[1460,1878,'gbed',56],[1783,1812,'ggaz',84],[1730,1860,'glav',52],[1840,1752,'gbed',50]],
  ISL:['i0','i3','i5','i1','i0','i5','i3','i1']};
function astOn(){return !AST.off&&AST.ok===1&&HDI.on}
function astLoad(){if(AST.ld||AST.off)return;AST.ld=1;const ks=Object.keys(AST.SRC);let n=0;
  ks.forEach(k=>{const im=new Image();im.decoding='async';im.onload=()=>{AST.im[k]=k[0]==='a'?astCv(im):im;if(++n===ks.length){AST.ok=1;try{if(curMap===9){CSPR=null}}catch(e){}}};im.onerror=()=>{AST.err=AST.SRC[k];AST.ok=-1};im.src=AST.SRC[k]})}
/* ภาพ atlas → canvas ครั้งเดียว (กันเบราว์เซอร์ถอดรหัส webp ใหญ่ซ้ำทุกเฟรมเมื่อแคชภาพเต็ม) */
function astCv(im){try{const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d').drawImage(im,0,0);c.src=im.src;return c}catch(e){return im}}
function astPat(x,k,sc,rot,ox,oy){const p=x.createPattern(AST.im[k],'repeat');let m=new DOMMatrix();if(ox||oy)m=m.translate(ox||0,oy||0);if(rot)m=m.rotate(rot);m=m.scale(sc);p.setTransform(m);return p}
/* --- พื้น (เรียกจากใน cityGroundGen · x = ctx แคชพื้น ในพิกัดโลก) --- */
function astGround(x){if(!astOn())return false;AST.gu=1;const R0=CITY.R;x.fillStyle=astPat(x,'tc',.38);x.fillRect(CX-R0,CY-R0,R0*2,R0*2);
  /* ไล่สีภาพรวมแผ่ว ๆ ไม่ให้พื้นราบเท่ากันหมด */
  const rnd=rng(6531);for(let i=0;i<34;i++){const px=CX+(rnd()-.5)*R0*1.9,py=CY+(rnd()-.5)*R0*1.9,r=60+rnd()*120,gr=x.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,rnd()<.55?'rgba(255,240,205,.13)':'rgba(70,52,40,.10)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(px-r,py-r,r*2,r*2)}
  return true}
function astRoad(x,x1,y1,x2,y2,hz){if(!AST.gu)return false;x.save();x.beginPath();x.rect(x1,y1,x2-x1,y2-y1);x.clip();
  x.fillStyle=hz?astPat(x,'ta',.46,0,0,y1+3):astPat(x,'ta',.46,90,x2-3,0);x.fillRect(x1,y1,x2-x1,y2-y1);
  const gr=hz?x.createLinearGradient(0,y1,0,y2):x.createLinearGradient(x1,0,x2,0);gr.addColorStop(0,'rgba(60,44,20,.16)');gr.addColorStop(.12,'rgba(0,0,0,0)');gr.addColorStop(.88,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(60,44,20,.16)');x.fillStyle=gr;x.fillRect(x1,y1,x2-x1,y2-y1);x.restore();return true}
function astLawn(x){return AST.gu?astPat(x,'tl',.5):'#5a8a3c'}
function astDec(x,k,px,py,ws,rot){const f=AST.fd[k];if(!f)return;const w=f[2]*ws,h=f[3]*ws;x.save();x.translate(px,py);if(rot)x.rotate(rot);x.drawImage(AST.im.ad,f[0],f[1],f[2],f[3],-w/2,-h/2,w,h);x.restore()}
function astDecals(x){const R0=CITY.R,rnd=rng(6532),W8=[['d2',4],['d3',1],['d4',3],['d7',1],['d9',1],['d14',2],['d15',1],['d17',2],['d22',.5],['d23',1]],TW=W8.reduce((a,b)=>a+b[1],0);
  const bad=(px,py)=>{const d=Math.hypot(px-CX,py-CY);return d<252||d>R0-78||CGARD.some(([gx,gy,w,h])=>px>gx-26&&px<gx+w+26&&py>gy-26&&py<gy+h+26)||CITY.rects.some(([a,b,c,e])=>px>a-10&&px<c+10&&py>b-10&&py<e+10)||(px>CX-34&&px<CX+34&&py>1300&&py<1380)};
  let n=0,tries=0;while(n<80&&tries<2000){tries++;const px=CX+(rnd()*2-1)*R0,py=CY+(rnd()*2-1)*R0;if(bad(px,py))continue;let q=rnd()*TW,k='d0';for(const[kk,w]of W8){q-=w;if(q<=0){k=kk;break}}
    const fixed=k==='d8'||k==='d22'||k==='d9';astDec(x,k,px,py,(k==='d7'?.4:.31)*(.85+rnd()*.3),fixed?0:rnd()*6.283);n++}
  /* เหรียญโมเสกดาวกลางถนนหลวง 4 ทิศ */
  for(const [dx,dy] of[[0,1],[0,-1],[1,0],[-1,0]]){astDec(x,'d10',CX+dx*525,CY+dy*525,.42,0)}
  /* ดอกเดซี่ตีนกำแพงด้านใน */
  for(let i=0;i<22;i++){const a=rnd()*6.283;if(Math.abs(a-Math.PI/2)<.2||Math.abs(a)<.18||Math.abs(a-6.283)<.18||Math.abs(a-Math.PI)<.18)continue;const r=R0-70,px=CX+Math.cos(a)*r,py=CY+Math.sin(a)*r;if(CITY.rects.some(([q,b,c,e])=>px>q-10&&px<c+10&&py>b-10&&py<e+10))continue;astDec(x,'d13',px,py,.34,a+Math.PI/2)}}
/* สวน 4 แปลง: ขอบหินขาวทอง + หญ้าภาพวาด + ทางเดินแผ่นหิน (ชิ้นสวนตั้งเป็นสไปรต์ใน citySprites) */
function astGardenG(x){if(!AST.gu)return false;CGARD.forEach(([gx,gy,w,h],k)=>{
  x.fillStyle='rgba(20,16,10,.22)';x.beginPath();x.roundRect(gx-3,gy+2,w+12,h+10,16);x.fill();
  x.fillStyle='#e9e0cc';x.beginPath();x.roundRect(gx-7,gy-7,w+14,h+14,18);x.fill();x.strokeStyle='#9a8a6a';x.lineWidth=1.5;x.stroke();
  x.strokeStyle='#d0a640';x.lineWidth=2;x.beginPath();x.roundRect(gx-3,gy-3,w+6,h+6,15);x.stroke();
  x.fillStyle=astPat(x,'tl',.5);x.beginPath();x.roundRect(gx,gy,w,h,13);x.fill();
  const gi=x.createRadialGradient(gx+w/2,gy+h/2,Math.min(w,h)*.2,gx+w/2,gy+h/2,Math.max(w,h)*.7);gi.addColorStop(0,'rgba(255,255,210,.06)');gi.addColorStop(1,'rgba(20,40,10,.22)');x.fillStyle=gi;x.beginPath();x.roundRect(gx,gy,w,h,13);x.fill();
  if(k<2){x.save();x.beginPath();x.rect(gx+w/2-11,gy,22,h);x.clip();x.fillStyle=astPat(x,'ta',.3,90,gx+w/2+11,0);x.fillRect(gx+w/2-11,gy,22,h);x.restore();x.strokeStyle='rgba(120,100,60,.5)';x.lineWidth=1;x.strokeRect(gx+w/2-11,gy,22,h)}});return true}
/* --- สไปรต์ในเมือง --- */
function astSpr(set,k,x,by,w){const F=set===1?AST.f1:AST.f2,f=F[k];if(!f)return 0;const h=w*f[3]/f[2];g.drawImage(set===1?AST.im.a1:AST.im.a2,f[0],f[1],f[2],f[3],x-w/2,by-h,w,h);return h}
function astHouse(x,y,w,h,t){const v=AST.HV[x+','+y];const W2=w*1.22+(v===7?18:0);hdSh(x+6,y+2,W2*.5,9,.3);astSpr(1,'h'+v,x,y+8,W2);
}
function astTower(x,y,i){hdSh(x+6,y+6,40,11,.3);astSpr(1,i%2?'towB':'towA',x,y+14,80)}
function astGate(t){const gx=CX,gy=CY+CITY.R+8;if(!inView(gx,gy-120,260))return;const f=AST.f2.gate,sx=f[0]+192,sw=720,sc=.565,w=sw*sc,h=f[3]*sc;
  hdSh(gx,gy+10,w*.48,14,.3);g.drawImage(AST.im.a2,sx,f[1],sw,f[3],gx-w/2,gy+16-h,w,h);
  const pu=.7+.3*Math.sin(t*2);g.save();g.globalCompositeOperation='lighter';glowAt(gx,gy-40,70,'255,214,120',.3*pu);g.restore()}
function astPortalIs(x,y,k){if(!astOn())return false;const f=AST.f2[k?'ip1':'ip0'],w=176,h=w*f[3]/f[2],fy=Math.sin(performance.now()/1000*.6+x)*3,py=k?.324:.357,px=k?.481:.49;
  g.fillStyle='rgba(60,90,130,.16)';g.beginPath();g.ellipse(x+14,y+h*.75,w*.36,12,0,0,7);g.fill();
  g.drawImage(AST.im.a2,f[0],f[1],f[2],f[3],x-w*px,y+4-h*py+fy*.3,w,h);return true}
function astUnder(){if(!astOn())return false;const R0=CITY.R,ro=R0+64,k=ro/768,U=AST.U,x0=CX-768*k,y0=CY+(U[2]+48)*k,w=U[0]*k,h=U[1]*k;
  if(!(x0<cam.x+W&&x0+w>cam.x&&y0<cam.y+H&&y0+h>cam.y))return true;g.drawImage(AST.im.au,x0,y0,w,h);
  /* น้ำตกมีประกายไหล (ทับภาพนิ่งบาง ๆ) */
  if(!LOWQ){const t=performance.now()/1000;g.save();g.globalCompositeOperation='lighter';for(const [fx,fy,fl] of[[256,560,180],[1182,610,160],[733,705,240]]){const px=CX+(fx-768)*k,py=CY+(fy+48)*k;if(!inView(px,py+fl*.5,fl))continue;for(let i=0;i<5;i++){const q=(t*.7+i/5)%1;g.fillStyle='rgba(235,250,255,'+(.35*(1-q))+')';g.fillRect(px-3,py+q*fl*k*.9,6,9)}}g.restore()}
  return true}
function astSky(t){if(!astOn()||LOWQ)return;const p=astPat(g,'ts',1.15,0,cam.x*.55+t*7,cam.y*.55);g.fillStyle=p;g.fillRect(cam.x-2,cam.y-2,W+4,H+4)}
/* กำแพงเมือง: แถบกำแพงภาพวาดหั่นเป็นเส้นแนวตั้งตามวง (หน้านอกฝั่งใต้ · หน้าในฝั่งเหนือ) */
function astWallBuild(){const ri=CW.ri,ro=CW.ro,Hh=CW.H,pad=CW.pad,N=(ro+pad)*2,cv=document.createElement('canvas');cv.width=N;cv.height=N+Hh;const x=cv.getContext('2d');
  CW.c=cv;CW.ox=CX-ro-pad;CW.oy=CY-ro-pad-Hh;x.translate(-CW.ox,-CW.oy);CW.ast=1;
  const SEG=[[.095,Math.PI/2-.1],[Math.PI/2+.1,Math.PI-.095],[Math.PI+.095,Math.PI*2-.095]];
  const ring=(r1,r2,dy)=>{x.beginPath();SEG.forEach(([a0,a1])=>{x.moveTo(CX+Math.cos(a0)*r2,CY+dy+Math.sin(a0)*r2);x.arc(CX,CY+dy,r2,a0,a1);x.arc(CX,CY+dy,r1,a1,a0,true);x.closePath()})};
  ring(ri-4,ro+16,10);x.fillStyle='rgba(10,8,4,.26)';x.fill();
  /* ทางเดินบนกำแพง (ผิวบน) */
  ring(ri,ro,-Hh);x.fillStyle=astPat(x,'ta',.22);x.fill();x.fillStyle='rgba(255,248,230,.18)';x.fill();x.strokeStyle='#6a5a40';x.lineWidth=1.2;x.stroke();
  const f=AST.f2.wseg,im=AST.im.a2,face=174,k=Hh/face,sh=f[3]*k;
  const slice=(r,a0,a1)=>{const st=3/r;for(let a=a0;a<a1;a+=st){const b=Math.min(a1,a+st),xa=CX+Math.cos(a)*r,xb=CX+Math.cos(b)*r,ya=CY+Math.sin(a)*r,yb=CY+Math.sin(b)*r,dx=Math.abs(xb-xa);
    const u=((a*r/k)%f[2]+f[2])%f[2],du=Math.max(1,Math.min(f[2]-u,(b-a)*r/k));const by=Math.max(ya,yb);
    /* หน้าผนังหันเข้าหากล้องเสมอ: ฝั่งใต้ = หน้านอก ฝั่งเหนือ = หน้าใน */
    x.drawImage(im,f[0]+u,f[1],du,f[3],Math.min(xa,xb)-.35,by-sh,dx+.7,sh)}};
  SEG.forEach(([a0,a1])=>{const s0=Math.max(a0,0),s1=Math.min(a1,Math.PI);if(s1>s0)slice(ro,s0,s1);const n0=Math.max(a0,Math.PI),n1=Math.min(a1,Math.PI*2);if(n1>n0)slice(ri,n0,n1)});
  /* แสงเงาตามทิศ: ปลายซ้าย/ขวาของวงหันเฉียง → มืดลง */
  x.save();x.globalCompositeOperation='source-atop';const gs=x.createLinearGradient(CX-ro,0,CX+ro,0);gs.addColorStop(0,'rgba(30,24,16,.35)');gs.addColorStop(.18,'rgba(0,0,0,0)');gs.addColorStop(.82,'rgba(0,0,0,0)');gs.addColorStop(1,'rgba(30,24,16,.42)');x.fillStyle=gs;x.fillRect(CX-ro-pad,CY-ro-pad-Hh,N,N+Hh);x.restore();
  /* หัวกำแพงตรงช่องประตู */
  SEG.forEach(([a0,a1])=>[a0,a1].forEach(a=>{x.fillStyle='#cfc4ac';x.beginPath();x.moveTo(CX+Math.cos(a)*ri,CY+Math.sin(a)*ri);x.lineTo(CX+Math.cos(a)*ro,CY+Math.sin(a)*ro);x.lineTo(CX+Math.cos(a)*ro,CY-Hh+Math.sin(a)*ro);x.lineTo(CX+Math.cos(a)*ri,CY-Hh+Math.sin(a)*ri);x.closePath();x.fill();x.strokeStyle='#5a4a32';x.lineWidth=1;x.stroke()}))}
/* ห่อฟังก์ชันวาดเดิม */
setTimeout(()=>{try{
  const oB=cBld2;window.cBld2=cBld2=function(x,y,w,h,o,t){if(curMap===9&&astOn()&&!(o&&o.sign)&&AST.HV[x+','+y]!=null)return astHouse(x,y,w,h,t);return oB.apply(this,arguments)};
  const oT=cWallTower;window.cWallTower=cWallTower=function(x,y,t,i){if(curMap===9&&astOn())return astTower(x,y,i);return oT.apply(this,arguments)};
  const oG=cSouthGate;window.cSouthGate=cSouthGate=function(t){if(curMap===9&&astOn())return astGate(t);return oG.apply(this,arguments)};
  const oL=cLamp2;window.cLamp2=cLamp2=function(x,y,t,ph){if(curMap===9&&astOn()){const f=.85+.15*Math.sin(t*7+ph);hdSh(x+2,y+1,7,2.2,.25);const h=astSpr(1,'lamp',x,y+3,22);g.save();g.globalCompositeOperation='lighter';glowAt(x+3,y+3-h*.8,30,'255,200,120',.38*f);g.restore();return}return oL.apply(this,arguments)};
  const oS=cStdBanner;window.cStdBanner=cStdBanner=function(x,y,t,k){if(curMap===9&&astOn()){hdSh(x+3,y+1,8,2.4,.25);astSpr(1,'flag',x,y+3,25);return}return oS.apply(this,arguments)};
  const oI=skyIslet;window.skyIslet=skyIslet=function(x,y,s,t,wf){if(curMap===9&&astOn()&&s!==1.25){const i=SKY.isl.findIndex(q=>q[0]===x),k=AST.ISL[(i<0?(x|0):i)%AST.ISL.length],f=AST.f2[k],w=190*s,h=w*f[3]/f[2],fy=Math.sin(t*.6+x)*5;
      g.fillStyle='rgba(60,90,130,.15)';g.beginPath();g.ellipse(x+20*s,y+150*s,56*s,11*s,0,0,7);g.fill();g.drawImage(AST.im.a2,f[0],f[1],f[2],f[3],x-w/2,y+fy-h*.42,w,h);return}return oI.apply(this,arguments)};
  const oW=cityWallBuild;window.cityWallBuild=cityWallBuild=function(){if(astOn()){CW.rows=null;return astWallBuild()}CW.ast=0;CW.rows=null;return oW.apply(this,arguments)};
  const oC=citySprites;window.citySprites=citySprites=function(){const L=oC.apply(this,arguments);if(astOn())AST.GP.forEach(([x,y,k,w])=>{const f=AST.f1[k];if(!f)return;const h=w*f[3]/f[2];L.push({y,x0:x-w/2,y0:y-h,x1:x+w/2,y1:y+4,d:()=>{if(!astOn())return;hdSh(x+4,y+1,w*.42,7,.22);astSpr(1,k,x,y+3,w)},big:1})});L.ast=astOn();return L};
  const oD=drawCity;window.drawCity=drawCity=function(){if(curMap===9){if(!AST.ld&&HDI.on)astLoad();
      const on=astOn();
      /* ภาพมาถึง/เปิดปิด HD หลังสร้างแคชแล้ว → สร้างพื้นใหม่เบื้องหลังทีละช่วง แล้วสลับ */
      if(CG.c&&!!CG.ast!==on&&!AST.re){AST.re=cityGroundGen()}
      if(AST.re){try{for(let i=0;i<3;i++){if(AST.re.next().done){AST.re=null;break}}}catch(e){AST.re=null;console.warn('ast',e)}}
      if(CW.c&&!!CW.ast!==on){CW.c=null;CW.rows=null}
      if(CSPR&&!!CSPR.ast!==on)CSPR=null}
    return oD.apply(this,arguments)};
}catch(e){console.warn('ast',e)}
const iv=setInterval(()=>{try{if(AST.ld||AST.off){clearInterval(iv);return}if(me&&me.cls&&run&&HDI.on)setTimeout(astLoad,7000),clearInterval(iv)}catch(e){}},3000)},3300);
