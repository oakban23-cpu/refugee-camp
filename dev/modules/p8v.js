/* ---------- v499 ภาพภาค 8 สวยสมจริงขึ้น (ผาท่าเรือเมฆ · ศึกป้องกันท่าเรือ · มอน · คราเคน) ----------
   พื้น (แคชเป็นแผ่น ไม่กินแรงต่อเฟรม): ทะเลเมฆเป็นก้อนเมฆมีแสงเงา (สไปรต์ก้อนเมฆวาดครั้งเดียว) · หน้าผาหินมีชั้นหิน รอยแตก มอส ไอเมฆเกาะตีนผา
   หญ้าหลายโทน ดอกไม้ ก้อนหิน · ทางดินขอบนุ่มมีกรวด · ลานไม้/สะพานไม้มีลายไม้ ตะปู ร่องไม้
   ของประกอบฉากชิ้นใหญ่ (เรือ ประภาคาร บ้าน เต็นท์ ซากเรือ ต้นไม้ ฯลฯ) วาดลงสไปรต์ครั้งเดียวตามขนาดจอ แล้วแปะทุกเฟรม + ส่วนที่ขยับวาดสด */
const PHV={m:new Map(),px:0,cap:12e6,cl:null,mp:-1,mk:0};
function phvQ(){const T=g.getTransform(),sc=Math.hypot(T.a,T.b)||1;return Math.max(.75,Math.min(3,Math.round(sc*4)/4))}
/* วาดสไปรต์แคช: fn วาดที่จุดฐาน (0,0) ด้วย g ปกติ · bb=[x,y,w,h] กรอบรอบจุดฐาน */
function phSpr(key,x,y,bb,fn){if(PHV.mp!==curMap){PHV.mp=curMap;PHV.m.clear();PHV.px=0}let q=phvQ();const ar=bb[2]*bb[3];if(ar>9e4)q=Math.min(q,LOWQ?1.5:2);else if(LOWQ)q=Math.min(q,2);const k=key+'@'+q;let c=PHV.m.get(k);
  if(c){if(PHV.m.size>8){PHV.m.delete(k);PHV.m.set(k,c)}}else{c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(bb[2]*q));c.height=Math.max(1,Math.ceil(bb[3]*q));const x2=c.getContext('2d');x2.setTransform(q,0,0,q,-bb[0]*q,-bb[1]*q);x2.lineCap='round';x2.lineJoin='round';
    const g0=g;g=x2;try{fn()}catch(e){}finally{g=g0}const a=c.width*c.height;PHV.px+=a;for(const[k2,c2]of PHV.m){if(PHV.px<=PHV.cap)break;PHV.px-=c2.width*c2.height;PHV.m.delete(k2)}PHV.m.set(k,c);PHV.mk=(PHV.mk|0)+1}
  g.drawImage(c,x+bb[0],y+bb[1],bb[2],bb[3])}
const phvR=s=>gxRng(s);
const shade=(hex,k)=>{const n=parseInt(hex.slice(1),16);let r=n>>16,g2=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))));return'rgb('+f(r)+','+f(g2)+','+f(b)+')'};
/* ---------- ก้อนเมฆ (สไปรต์ 4 แบบ) ---------- */
function phvClouds(){if(PHV.cl)return PHV.cl;const out=[];for(let v=0;v<5;v++){const W=360,H=190,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d'),R=phvR(5100+v*17);
  const n=6+(v%3),B=[];for(let i=0;i<n;i++){const u=i/(n-1),r=26+Math.sin(u*Math.PI)*40+R()*18;B.push([46+u*268+(R()-.5)*26,124-Math.sin(u*Math.PI)*46-R()*16+r*.1,r])}
  for(let i=0;i<4;i++){const bx=90+R()*180,r=30+R()*26;B.push([bx,92-R()*30,r])}
  for(const[bx,by,r]of B){const gr=x.createRadialGradient(bx,by+r*.5,r*.2,bx,by+r*.3,r*1.15);gr.addColorStop(0,'rgba(150,166,198,.9)');gr.addColorStop(1,'rgba(150,166,198,0)');x.fillStyle=gr;x.beginPath();x.arc(bx,by+r*.3,r*1.15,0,7);x.fill()}
  B.sort((a,b)=>a[1]-b[1]);for(const[bx,by,r]of B){const gr=x.createRadialGradient(bx-r*.32,by-r*.42,r*.06,bx,by,r);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.5,'rgba(248,250,255,.98)');gr.addColorStop(.82,'rgba(216,226,244,.92)');gr.addColorStop(1,'rgba(206,218,240,0)');x.fillStyle=gr;x.beginPath();x.arc(bx,by,r,0,7);x.fill()}
  x.globalCompositeOperation='source-atop';const wl=x.createLinearGradient(0,10,0,H);wl.addColorStop(0,'rgba(255,236,200,.42)');wl.addColorStop(.45,'rgba(255,255,255,0)');wl.addColorStop(1,'rgba(110,130,175,.32)');x.fillStyle=wl;x.fillRect(0,0,W,H);out.push(c)}return PHV.cl=out}
/* ทะเลเมฆ: พื้นฟ้าเทา → ชั้นเมฆลึก (จาง ใหญ่) → ชั้นเมฆบน (ชัด) · วาดจากบนลงล่างให้ก้อนล่างทับก้อนบน */
/* ทะเลเมฆ: วาดลายต่อเนื่องไร้รอยต่อ 1024×1024 ครั้งเดียว แล้วเทเป็นแพทเทิร์น */
function phvSeaTex(seed){PHV.sea=PHV.sea||{};let P=PHV.sea[seed];if(P)return P;const N=1024,K=1.25,cv=document.createElement('canvas');cv.width=cv.height=Math.round(N*K);const x=cv.getContext('2d');x.setTransform(K,0,0,K,0,0);const CL=phvClouds();
  x.fillStyle='#bccbe0';x.fillRect(0,0,N,N);
  const put=(im,px,py,w,h,a)=>{x.globalAlpha=a;for(const dx of[-N,0,N])for(const dy of[-N,0,N]){const X=px+dx,Y=py+dy;if(X+w<0||Y+h<0||X>N||Y>N)continue;x.drawImage(im,X,Y,w,h)}};
  const gw=N/3,gh=N/6;for(let i=0;i<3;i++)for(let j=0;j<6;j++){const h=palH(i,j,seed+1),px=i*gw+palH(j,i,seed+2)*120,py=j*gh+palH(i,j,seed+3)*80,s=1.3+h*.9;put(CL[(i*3+j)%5],px,py,360*s,190*s*.8,.42)}
  x.globalAlpha=1;x.fillStyle='rgba(180,196,222,.18)';x.fillRect(0,0,N,N);
  const gw2=N/6,gh2=N/11;for(let i=0;i<6;i++)for(let j=0;j<11;j++){const h=palH(i,j,seed+5);if(h<.18)continue;const px=i*gw2+palH(j,i,seed+6)*90,py=j*gh2+palH(i,j,seed+7)*60,s=.55+h*.65;put(CL[(i+j*2)%5],px,py,360*s,190*s,.78+h*.22)}
  x.globalAlpha=1;P=x.createPattern(cv,'repeat');try{P.setTransform(new DOMMatrix([1/K,0,0,1/K,0,0]))}catch(e){}PHV.sea[seed]=P;return P}
function phvCloudSea(c,ox,oy,S,seed){c.fillStyle=phvSeaTex(seed);c.fillRect(ox,oy,S,S)}
/* สีพื้นหญ้าภาพรวม (ไล่สี + หย่อมสี) วาดเล็กครั้งเดียว แล้วขยายลงทุกช่อง */
function phvMacro(){if(PHV.mac&&PHV.macN===PHN.gr)return PHV.mac;const N=256,k=N/3200,cv=document.createElement('canvas');cv.width=cv.height=N;const x=cv.getContext('2d');x.setTransform(k,0,0,k,0,0);
  const bg=x.createRadialGradient(1200,1600,200,1200,1600,2300);bg.addColorStop(0,'#74a052');bg.addColorStop(.6,'#62903e');bg.addColorStop(1,'#557e38');x.fillStyle=bg;x.fillRect(0,0,3200,3200);
  for(const[px,py,r,v]of PHN.gr||[]){const g2=x.createRadialGradient(px,py,4,px,py,r);g2.addColorStop(0,v<.35?'rgba(170,190,90,.28)':v<.7?'rgba(40,80,36,.22)':'rgba(120,170,80,.22)');g2.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g2;x.beginPath();x.arc(px,py,r,0,7);x.fill()}
  PHV.macN=PHN.gr;return PHV.mac=cv}
/* ---------- ไม้: แผ่นกระดาน ---------- */
function phvPlanksH(c,x0,y0,x1,y1,seed,pw,rng,vx0,vx1){pw=pw||15;vx0=vx0===undefined?-1e9:vx0-4;vx1=vx1===undefined?1e9:vx1+4;
  const TN=['#8e6440','#9a6e48','#84593a'],BP=[new Path2D(),new Path2D(),new Path2D()],HI=new Path2D(),SH=new Path2D(),GR=new Path2D(),KN=new Path2D(),NL=new Path2D(),SM=new Path2D(),GAP=new Path2D();
  for(let y=Math.floor(y0/pw)*pw;y<y1;y+=pw){const row=(y/pw)|0;let[ra,rb]=rng?rng(y,y+pw):[x0,x1];if(rb-ra<2)continue;const lo=Math.max(ra,vx0),hi=Math.min(rb,vx1);if(hi<=lo)continue;let x=x0-((y*37)%120);
    while(x<x1){const L=70+((palH(row,x|0,seed)*1e3)%90),xe=x+L-1.5;if(xe<lo){x+=L;continue}if(x>hi)break;const a=Math.max(x,ra),b=Math.min(xe,rb);if(b-a>1.5){const tn=palH(x|0,row,seed+1);BP[tn<.33?0:tn<.66?1:2].rect(a,y,b-a,pw-1.5);HI.rect(a,y,b-a,1.6);SH.rect(a,y+pw-4,b-a,2.5);
      for(let k=0;k<2;k++){const yy=y+3+k*5+palH(row,k,seed+2)*3,g0=Math.max(a+3,x+3),g1=Math.min(b-4,x+L-4);if(g1-g0>8){GR.moveTo(g0,yy);GR.bezierCurveTo(g0+(g1-g0)*.3,yy+1.6,g0+(g1-g0)*.6,yy-1.6,g1,yy+.6)}}
      if(palH(row,x|0,seed+3)>.75){const kx=x+L*.6;if(kx>a+4&&kx<b-4){KN.moveTo(kx+3.2,y+pw*.5);KN.ellipse(kx,y+pw*.5,3.2,1.8,0,0,7)}}
      for(const nx of[x+4,x+L-6])if(nx>a+1&&nx<b-1){NL.moveTo(nx+1.1,y+4);NL.arc(nx,y+4,1.1,0,7);NL.moveTo(nx+1.1,y+pw-5.5);NL.arc(nx,y+pw-5.5,1.1,0,7)}
      if(xe<=rb&&xe>=ra)SM.rect(xe,y,1.5,pw)}x+=L}
    GAP.rect(lo-4,y+pw-1.5,hi-lo+8,1.5)}
  TN.forEach((col,k)=>{c.fillStyle=col;c.fill(BP[k])});c.fillStyle='rgba(255,236,200,.13)';c.fill(HI);c.fillStyle='rgba(30,18,8,.16)';c.fill(SH);
  c.strokeStyle='rgba(50,30,16,.28)';c.lineWidth=.8;c.stroke(GR);c.fillStyle='rgba(40,24,12,.35)';c.fill(KN);c.fillStyle='#3a2a1e';c.fill(NL);c.fillStyle='rgba(20,12,6,.55)';c.fill(SM);c.fillStyle='rgba(20,12,6,.5)';c.fill(GAP)}
function phvPlanksV(c,x0,x1,y0,y1,seed){/* แผ่นไม้ขวาง (สะพาน) */for(let x=Math.floor(x0/14)*14;x<x1;x+=14){const col=(x/14)|0,tn=palH(col,3,seed),base=tn<.33?'#8a6242':tn<.66?'#966c46':'#7e5636';
  const gr=c.createLinearGradient(x,0,x+14,0);gr.addColorStop(0,shade(base,.1));gr.addColorStop(1,shade(base,-.2));c.fillStyle=gr;c.fillRect(x,y0,12.6,y1-y0);
  c.strokeStyle='rgba(50,30,16,.3)';c.lineWidth=.8;c.beginPath();c.moveTo(x+4+palH(col,1,seed)*4,y0+2);c.bezierCurveTo(x+3,y0+(y1-y0)*.4,x+8,y0+(y1-y0)*.6,x+5,y1-2);c.stroke();
  c.fillStyle='#2e2016';c.beginPath();c.arc(x+6.3,y0+5,1.1,0,7);c.arc(x+6.3,y1-5,1.1,0,7);c.fill();c.fillStyle='rgba(20,12,6,.55)';c.fillRect(x+12.6,y0,1.4,y1-y0)}}
/* ---------- พื้นแมพ 38 ---------- */
PHV.op=phPaint;window.phPaint=phPaint=function(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1;
  let mE=1e9;for(let y=oy-20;y<=Y1+20;y+=16)mE=Math.min(mE,phEdge(y));if(X1+12<mE){c.fillStyle='#62903e';c.fillRect(ox,oy,S,S)}else phvCloudSea(c,ox,oy,S,3900);
  const edgeAt=y=>phEdge(y),nearP=phSegD(ox+S/2,oy+S/2)<S*.72+40,sD=nearP?phSegD:()=>1e9,LQ=LOWQ;
  /* ไอเมฆเกาะตีนผา (ก่อนวาดแผ่นดิน) */
  if(inB(1900,oy-40,3000,Y1+40)){c.save();c.lineJoin='round';c.lineCap='round';const poly=(off)=>{c.beginPath();for(let y=oy-40;y<=Y1+40;y+=12){const x=edgeAt(y)+off;y===oy-40?c.moveTo(x,y):c.lineTo(x,y)}};
    poly(64);c.strokeStyle='rgba(120,128,150,.5)';c.lineWidth=30;c.stroke();
    const CL=phvClouds();c.globalAlpha=.88;for(let j=Math.floor((oy-90)/34);j*34<Y1+90;j++){const yy=j*34+palH(j,1,3917)*20,ex=edgeAt(yy);if(ex+56>X1+10||ex+300<ox)continue;const h=palH(1,j,3918),s=.36+h*.3;c.drawImage(CL[((j%5)+5)%5],ex+56+h*36,yy-95*s,360*s,190*s)}c.globalAlpha=1;
    c.restore()}
  /* แผ่นดิน */
  const dkL=y=>1720-120*((y-1030)/1270)*(1-(y-1030)/1270),inDk=(x,y)=>y>1040&&y<2290&&x>dkL(y)+12&&x<edgeAt(y)-6,full=X1+12<mE,dkAll=ox>1745&&X1<mE-8&&oy>1040&&Y1<2290;
  c.save();if(!full){c.beginPath();c.moveTo(ox-10,oy-10);for(let y=oy-10;y<=Y1+10;y+=12)c.lineTo(Math.min(X1+10,edgeAt(y)+2),y);c.lineTo(ox-10,Y1+10);c.closePath();c.clip()}
  {const M=phvMacro(),k=M.width/3200;c.imageSmoothingEnabled=true;c.drawImage(M,ox*k,oy*k,S*k,S*k,ox,oy,S,S)}
  if(!dkAll){
  /* หญ้าแห้งใกล้ขอบผา */if(!full){c.fillStyle='rgba(176,170,96,.15)';c.beginPath();palGrid(ox,oy,X1,Y1,40,40,0,(x,y,i,j)=>{const ex=edgeAt(y+20);if(x+40<ex-160||x>ex||inDk(x+20,y+20))return;c.moveTo(x+46,y+20);c.ellipse(x+20,y+20,26,18,0,0,7)});c.fill()}
  /* จุดด่าง */{const P=[new Path2D(),new Path2D()];palGrid(ox,oy,X1,Y1,44,34,1,(x,y,i,j)=>{const h=palH(i,j,3922);if(h<.5)return;const px=x+palH(j,i,3923)*40,py=y+palH(i,j,3924)*30;if(inDk(px,py))return;const Q=P[h>.8?0:1],rx=10+h*16;Q.moveTo(px+rx,py);Q.ellipse(px,py,rx,6+h*8,0,0,7)});c.fillStyle='rgba(140,184,96,.18)';c.fill(P[0]);c.fillStyle='rgba(30,60,26,.16)';c.fill(P[1])}
  /* ทางดิน */if(nearP)for(const L of PHPATH){for(const[w,col]of[[66,'rgba(70,52,30,.16)'],[54,'rgba(110,86,56,.35)'],[44,'#a48a62'],[34,'#b49a70'],[16,'rgba(220,200,160,.25)']]){c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.lineCap='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}}
  if(nearP){const P=[new Path2D(),new Path2D(),new Path2D()];palGrid(ox,oy,X1,Y1,LQ?20:13,LQ?16:11,1,(x,y,i,j)=>{const px=x+palH(i,j,3925)*11,py=y+palH(j,i,3926)*9;const h=palH(i,j,3927);if(h<.6)return;if(phSegD(px,py)>22)return;const s=1.2+h*2.2;P[0].moveTo(px+.8+s,py+1);P[0].ellipse(px+.8,py+1,s,s*.7,0,0,7);const Q=P[h>.85?1:2];Q.moveTo(px+s,py);Q.ellipse(px,py,s,s*.7,0,0,7)});
    c.fillStyle='rgba(60,46,30,.35)';c.fill(P[0]);c.fillStyle='#c8b898';c.fill(P[1]);c.fillStyle='#9a8a72';c.fill(P[2])}
  /* กอหญ้าลู่ลม */{const B=[new Path2D(),new Path2D(),new Path2D()],FL=[new Path2D(),new Path2D(),new Path2D(),new Path2D()],FC=new Path2D();
    palGrid(ox,oy,X1,Y1,LQ?32:22,LQ?26:18,1,(x,y,i,j)=>{const h=palH(i,j,3931);if(h<.35)return;const px=x+palH(j,i,3932)*20,py=y+palH(i,j,3933)*16;if(px>edgeAt(py)-8||inDk(px,py)||sD(px,py)<30)return;
      const n=(LQ?3:4)+((h*(LQ?3:5))|0),L=6+h*9;for(let k=0;k<n;k++){const bx=px+(k-n/2)*2.1,ll=L*(.7+palH(k,i,3934)*.5),Q=B[k%3];Q.moveTo(bx,py);Q.quadraticCurveTo(bx-1.5,py-ll*.6,bx-ll*.55,py-ll*.9)}
      if(h>.94){const Q=FL[(palH(j,i,3935)*4)|0];for(let k=0;k<3;k++){const fx=px-4+k*4,fy=py-L*.75-(k%2)*3;Q.moveTo(fx+1.7,fy);Q.arc(fx,fy,1.7,0,7)}FC.moveTo(px+.9,py-L*.8);FC.arc(px,py-L*.8,.9,0,7)}});
    c.lineCap='round';c.lineWidth=1.4;['rgba(70,112,48,.85)','rgba(118,166,76,.85)','rgba(150,196,96,.8)'].forEach((col,k)=>{c.strokeStyle=col;c.stroke(B[k])});
    ['#fff4c8','#f4b0c8','#c8d8ff','#ffd27a'].forEach((col,k)=>{c.fillStyle=col;c.fill(FL[k])});c.fillStyle='rgba(255,240,150,.9)';c.fill(FC)}
  palGrid(ox,oy,X1,Y1,90,80,1,(x,y,i,j)=>{const h=palH(i,j,3941);if(h<.86)return;const px=x+palH(j,i,3942)*80,py=y+palH(i,j,3943)*70;if(px>edgeAt(py)-30||inDk(px,py)||sD(px,py)<36)return;const s=3+h*4;c.fillStyle='rgba(30,30,24,.3)';c.beginPath();c.ellipse(px+1.5,py+2,s*1.3,s*.6,0,0,7);c.fill();const sg=c.createLinearGradient(px-s,py-s,px+s,py+s);sg.addColorStop(0,'#b4ad9e');sg.addColorStop(1,'#6e685c');c.fillStyle=sg;c.beginPath();c.ellipse(px,py,s*1.2,s*.75,0,0,7);c.fill()});
  }
  /* ลานไม้ท่าเรือ */if(inB(1640,980,2700,2340)){const dp=()=>{c.beginPath();c.moveTo(1720,1030);for(let y=1030;y<=2300;y+=12)c.lineTo(edgeAt(y)-2,y);c.lineTo(1720,2300);c.quadraticCurveTo(1660,1660,1720,1030);c.closePath()};
    dp();c.fillStyle='rgba(20,14,8,.35)';c.save();c.translate(4,6);c.fill();c.restore();c.fillStyle='#7e5838';c.fill();
    phvPlanksH(c,1640,Math.max(oy,1035),2700,Math.min(Y1,2286),3951,15,(y0,y1)=>[Math.max(dkL(y0),dkL(y1))+1,Math.min(edgeAt(y0),edgeAt(y1))-2],ox,X1);
    const sh=c.createRadialGradient(2000,1650,200,2000,1650,900);sh.addColorStop(0,'rgba(255,240,210,.06)');sh.addColorStop(1,'rgba(40,24,10,.18)');c.fillStyle=sh;dp();c.fill();
    c.strokeStyle='#4a3020';c.lineWidth=6;c.beginPath();c.moveTo(1720,1030);c.quadraticCurveTo(1660,1660,1720,2300);c.stroke();c.strokeStyle='rgba(255,230,190,.25)';c.lineWidth=1.4;c.stroke();
    c.strokeStyle='#4a3020';c.lineWidth=4;c.beginPath();c.moveTo(1720,1030);c.lineTo(edgeAt(1030),1030);c.moveTo(1720,2300);c.lineTo(edgeAt(2300),2300);c.stroke()}
  c.restore();
  /* หน้าผาหิน: ขอบหินรอบแผ่นดิน (ทับขอบหญ้า) */
  if(inB(1900,oy-40,3000,Y1+40)){c.save();c.lineJoin='round';c.lineCap='round';const poly=(off,jit)=>{c.beginPath();for(let y=oy-40;y<=Y1+40;y+=12){const x=edgeAt(y)+off+(jit?(palH(y|0,off|0,3911)-.5)*jit:0);y===oy-40?c.moveTo(x,y):c.lineTo(x,y)}};
    for(const[off,w,col]of[[60,22,'rgba(70,72,92,.75)'],[50,20,'#3e3a44'],[40,18,'#4e4852'],[30,18,'#5e5852'],[20,16,'#706658'],[10,14,'#82786a'],[1,12,'#958a78']]){poly(off,0);c.strokeStyle=col;c.lineWidth=w;c.stroke()}
    c.strokeStyle='rgba(30,26,24,.5)';c.lineWidth=1.3;for(const off of[8,22,36,50]){poly(off,7);c.stroke()}c.strokeStyle='rgba(255,246,226,.28)';c.lineWidth=1.4;poly(-4,3);c.stroke();
    for(let j=Math.floor((oy-40)/9);j*9<Y1+40;j++)for(let i=0;i<2;i++){const yy=j*9+palH(i,j,3913)*9,ex=edgeAt(yy);const off=palH(j,i,3914)*52;const px=ex+off;if(px<ox-20||px>X1+20)continue;const h=palH(i,j,3915);
      if(h>.6){c.strokeStyle='rgba(28,24,22,.55)';c.lineWidth=1;c.beginPath();c.moveTo(px,yy-6);c.lineTo(px+2+h*3,yy);c.lineTo(px-1,yy+7);c.stroke()}
      else if(h<.3&&off<34){c.fillStyle='rgba(255,250,235,.2)';c.beginPath();c.ellipse(px-2,yy,5+h*6,2.4,0,0,7);c.fill()}
      else if(h<.4&&off<20){c.fillStyle='rgba(110,150,70,.55)';c.beginPath();c.ellipse(px,yy,4,2,0,0,7);c.fill()}}
    /* กำแพงหินท่าเรือ */if(inB(1900,1000,3000,2330)){c.strokeStyle='rgba(40,34,30,.6)';c.lineWidth=1.4;for(let y=Math.max(1030,oy-30);y<Math.min(2300,Y1+30);y+=22){const ex=edgeAt(y);c.beginPath();c.moveTo(ex-6,y);c.lineTo(ex+24,y);c.stroke();c.beginPath();c.moveTo(ex+(y%44?6:14),y);c.lineTo(edgeAt(y+22)+(y%44?6:14),y+22);c.stroke()}
      c.save();c.strokeStyle='#4a3020';c.lineWidth=4;c.beginPath();c.rect(ox,Math.max(oy,1030),S,Math.max(0,Math.min(Y1,2300)-Math.max(oy,1030)));c.clip();poly(-7,0);c.stroke();c.strokeStyle='#d8b050';c.lineWidth=1.4;poly(-9,0);c.stroke();c.restore()}
    c.restore()}
  /* ริมผา: ขอบหญ้าห้อย + รากไม้ */c.save();c.lineCap='round';for(let j=Math.floor((oy-20)/6);j*6<Y1+20;j++){const i=1,yy=j*6+palH(i,j,3961)*5,ex=edgeAt(yy);if(ex<ox-20||ex>X1+20)continue;if(yy>1000&&yy<2320)continue;const h=palH(j,i,3962);
    c.strokeStyle=h>.5?'rgba(96,140,62,.9)':'rgba(70,110,48,.9)';c.lineWidth=2;c.beginPath();c.moveTo(ex-4,yy);c.quadraticCurveTo(ex+4,yy+3,ex+6+h*6,yy+8+h*10);c.stroke();
    if(h>.88){c.strokeStyle='rgba(80,60,40,.8)';c.lineWidth=1.2;c.beginPath();c.moveTo(ex+2,yy);c.bezierCurveTo(ex+10,yy+12,ex+4,yy+22,ex+12,yy+34);c.stroke()}}c.restore();
  /* สะพานไม้ */for(const[py,x1,hw]of PHPIER){const x0=edgeAt(py)-60;if(!inB(x0,py-hw-60,x1+40,py+hw+90))continue;
    c.fillStyle='rgba(80,100,135,.3)';c.beginPath();c.ellipse((x0+x1)/2,py+hw+26,(x1-x0)/2,16,0,0,7);c.fill();
    for(let x=x0+150;x<x1;x+=110){const pg=c.createLinearGradient(x-6,0,x+6,0);pg.addColorStop(0,'#5a4030');pg.addColorStop(1,'#2e2018');c.fillStyle=pg;c.fillRect(x-6,py+hw-6,12,58);c.strokeStyle='rgba(200,180,140,.6)';c.lineWidth=1.4;for(const k of[10,16]){c.beginPath();c.moveTo(x-6,py+hw+k);c.lineTo(x+6,py+hw+k+2);c.stroke()}
      const CL=phvClouds();c.globalAlpha=.9;c.drawImage(CL[((x/110|0)%5+5)%5],x-40,py+hw+30,80,42);c.globalAlpha=1}
    c.fillStyle='#3e2a1a';c.fillRect(x0,py-hw-3,x1-x0,hw*2+6);phvPlanksV(c,x0,x1,py-hw,py+hw,3971+py);
    for(const s of[-1,1]){const by=py+s*hw;const bg2=c.createLinearGradient(0,by-4,0,by+4);bg2.addColorStop(0,'#6a4a30');bg2.addColorStop(1,'#3a2618');c.fillStyle=bg2;c.fillRect(x0,by-4,x1-x0,8);c.fillStyle='rgba(255,230,190,.25)';c.fillRect(x0,by-4,x1-x0,1.4)}
    c.fillStyle='#4a3424';c.fillRect(x1-8,py-hw-6,12,hw*2+12);c.strokeStyle='#d8c098';c.lineWidth=1.2;c.beginPath();c.moveTo(x1-8,py-hw-2);c.lineTo(x1+4,py-hw+2);c.moveTo(x1-8,py+hw-4);c.lineTo(x1+4,py+hw);c.stroke()}}
/* ---------- เรือเหาะ (สไปรต์) ---------- */
function phvShipArt(dm,dk){const C=dk?{e1:'#5a5a68',e2:'#1e1e26',sm:'rgba(0,0,0,.5)',h1:'#34343e',h2:'#101016',tr:'#8a2a2a',rl:'#16161c',sl:'#2a2a34',fn:'#26262e'}:{e1:'#fbf4e2',e2:'#b89c70',sm:'rgba(110,86,52,.5)',h1:'#b07c4e',h2:'#47290f',tr:'#dcb556',rl:'#5a3c22',sl:'#f1e8d2',fn:'#8a6440'};
  const ey=-130,erx=116,ery=44;
  /* ครีบหาง */g.fillStyle=C.fn;g.strokeStyle=dk?'#08080c':'#3a2414';g.lineWidth=1.6;for(const s of[-1,1]){g.beginPath();g.moveTo(-erx+18,ey+s*8);g.lineTo(-erx-30,ey+s*44);g.lineTo(-erx-38,ey+s*40);g.lineTo(-erx-14,ey+s*6);g.closePath();g.fill();g.stroke();g.strokeStyle=dk?'#2a2a34':'rgba(255,230,180,.35)';g.beginPath();g.moveTo(-erx+4,ey+s*10);g.lineTo(-erx-28,ey+s*38);g.stroke();g.strokeStyle=dk?'#08080c':'#3a2414'}
  g.fillStyle=C.fn;g.beginPath();g.moveTo(-erx+10,ey-2);g.lineTo(-erx-36,ey-4);g.lineTo(-erx-36,ey+4);g.lineTo(-erx+10,ey+4);g.fill();
  /* ลูกโป่ง */const eg=g.createLinearGradient(0,ey-ery,0,ey+ery);eg.addColorStop(0,shade(C.e1,.3));eg.addColorStop(.35,C.e1);eg.addColorStop(1,C.e2);g.fillStyle=eg;g.beginPath();g.ellipse(0,ey,erx,ery,0,0,7);g.fill();
  const hl=g.createRadialGradient(-30,ey-26,4,-20,ey-14,90);hl.addColorStop(0,dk?'rgba(140,140,170,.35)':'rgba(255,255,255,.7)');hl.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=hl;g.beginPath();g.ellipse(0,ey,erx,ery,0,0,7);g.fill();
  g.save();g.beginPath();g.ellipse(0,ey,erx,ery,0,0,7);g.clip();g.strokeStyle=C.sm;g.lineWidth=1.1;for(let k=-4;k<=4;k++){const xx=k*25;g.beginPath();g.moveTo(xx*.9,ey-ery);g.bezierCurveTo(xx*1.08,ey-ery*.4,xx*1.08,ey+ery*.4,xx*.9,ey+ery);g.stroke()}
    g.strokeStyle=dk?'rgba(0,0,0,.35)':'rgba(110,86,52,.32)';g.lineWidth=.9;for(let k=0;k<14;k++){const xx=-erx+k*17;g.beginPath();g.moveTo(xx,ey+ery*.2);g.lineTo(xx+26,ey+ery);g.moveTo(xx+26,ey+ery*.2);g.lineTo(xx,ey+ery);g.stroke()}
    if(dm){g.fillStyle=dk?'#3a3a46':'#d2bf96';for(const[px,py,w,h]of[[-62,-10,26,18],[24,6,30,16],[60,-22,20,14]]){g.fillRect(px,ey+py,w,h);g.strokeStyle='rgba(80,60,30,.7)';g.setLineDash([3,2]);g.strokeRect(px,ey+py,w,h);g.setLineDash([])}
      g.fillStyle='#1a140e';g.beginPath();g.moveTo(-10,ey-30);g.lineTo(8,ey-22);g.lineTo(-2,ey-12);g.lineTo(-14,ey-20);g.closePath();g.fill()}
    const sh=g.createLinearGradient(0,ey,0,ey+ery);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(30,20,10,.25)');g.fillStyle=sh;g.fillRect(-erx,ey,erx*2,ery);g.restore();
  g.strokeStyle=dk?'#08080c':'#6a5236';g.lineWidth=1.8;g.beginPath();g.ellipse(0,ey,erx,ery,0,0,7);g.stroke();
  g.fillStyle=dk?'#5a5a66':'#c8963a';g.beginPath();g.ellipse(erx-3,ey,9,13,0,0,7);g.fill();g.strokeStyle=dk?'#08080c':'#6a4a14';g.stroke();
  /* เชือกแขวน */g.strokeStyle=dk?'#2a2a32':'#7a6646';g.lineWidth=1.3;for(const k of[-80,-48,-16,16,48,80]){g.beginPath();g.moveTo(k,ey+ery*Math.sqrt(1-(k/erx)**2)-2);g.lineTo(k*.86,-44);g.stroke()}
  /* ใบเรือ */g.strokeStyle=C.rl;g.lineWidth=4;g.beginPath();g.moveTo(40,-44);g.lineTo(46,-78);g.stroke();g.fillStyle=C.sl;g.beginPath();g.moveTo(46,-78);g.quadraticCurveTo(80,-66,92,-46);g.lineTo(48,-46);g.closePath();g.fill();g.strokeStyle=dk?'#08080c':'#8a7a5a';g.lineWidth=1;g.stroke();
  /* ตัวเรือ */const hg=g.createLinearGradient(0,-48,0,12);hg.addColorStop(0,shade(C.h1,.15));hg.addColorStop(.45,C.h1);hg.addColorStop(1,C.h2);g.fillStyle=hg;
  g.beginPath();g.moveTo(-118,-44);g.lineTo(-110,-20);g.quadraticCurveTo(-80,10,0,12);g.quadraticCurveTo(90,10,118,-28);g.lineTo(132,-50);g.lineTo(-118,-50);g.closePath();g.fill();
  g.save();g.clip();g.strokeStyle=dk?'rgba(0,0,0,.45)':'rgba(40,22,8,.4)';g.lineWidth=1.1;for(let k=0;k<6;k++){const yy=-44+k*9;g.beginPath();g.moveTo(-130,yy);g.quadraticCurveTo(0,yy+12,140,yy-6);g.stroke()}
    g.fillStyle=dk?'rgba(120,120,150,.12)':'rgba(255,230,190,.16)';g.fillRect(-130,-50,270,10);if(dm){g.strokeStyle='#1a0e06';g.lineWidth=2;g.beginPath();g.moveTo(-40,-40);g.lineTo(-30,-22);g.lineTo(-44,-10);g.moveTo(60,-38);g.lineTo(52,-20);g.stroke()}g.restore();
  g.strokeStyle=dk?'#06060a':'#2a1608';g.lineWidth=2;g.beginPath();g.moveTo(-118,-44);g.lineTo(-110,-20);g.quadraticCurveTo(-80,10,0,12);g.quadraticCurveTo(90,10,118,-28);g.lineTo(132,-50);g.stroke();
  g.fillStyle=C.tr;g.fillRect(-120,-54,254,5);g.fillStyle=dk?'#5a2a2a':'#a88838';g.fillRect(-120,-50,254,1.5);
  /* ราว */g.strokeStyle=C.rl;g.lineWidth=2;g.beginPath();g.moveTo(-116,-66);g.lineTo(126,-66);g.stroke();for(let k=-112;k<=124;k+=12){if(dm&&k>10&&k<40)continue;g.beginPath();g.moveTo(k,-54);g.lineTo(k,-66);g.stroke()}
  /* ห้องท้ายเรือ */g.fillStyle=dk?'#2a2a34':'#7a5434';g.fillRect(-116,-82,46,30);g.strokeStyle=dk?'#06060a':'#2a1608';g.lineWidth=1.4;g.strokeRect(-116,-82,46,30);g.fillStyle=C.tr;g.fillRect(-120,-86,54,5);
  g.fillStyle=dk?'#0a0a10':'#2a1a0e';g.fillRect(-106,-76,10,10);g.fillRect(-88,-76,10,10);
  /* หน้าต่างกลม */for(const px of[-60,-20,20,60]){g.fillStyle=dk?'#08080c':'#1e140c';g.beginPath();g.arc(px,-24,6.5,0,7);g.fill();g.strokeStyle=dk?'#6a6a76':'#d0a248';g.lineWidth=2;g.stroke()}
  /* หัวเรือ + รูปนก */g.fillStyle=C.tr;g.beginPath();g.moveTo(130,-50);g.lineTo(162,-66);g.lineTo(156,-58);g.lineTo(134,-44);g.closePath();g.fill();g.fillStyle=dk?'#4a4a56':'#e2c070';g.beginPath();g.moveTo(150,-62);g.quadraticCurveTo(160,-80,170,-76);g.quadraticCurveTo(162,-70,158,-58);g.closePath();g.fill();
  /* ใบพัดท้าย (ดุม) */g.fillStyle=dk?'#3a3a46':'#8a6a3a';g.beginPath();g.arc(-128,-30,6,0,7);g.fill();g.strokeStyle=dk?'#06060a':'#3a2414';g.lineWidth=1.2;g.stroke();
  /* เสาธง */g.strokeStyle=C.rl;g.lineWidth=3.4;g.beginPath();g.moveTo(-92,-82);g.lineTo(-92,-172);g.stroke()}
window.phShipD=phShipD=function(x,y,T,o){const bob=Math.sin(T*1.1+x*.01)*3,yy=y+bob,f=o.f||1,dm=!!o.dmg,dk=!!o.dark;
  g.save();const sg=g.createRadialGradient(x,y+34,10,x,y+34,110);sg.addColorStop(0,'rgba(90,110,150,.32)');sg.addColorStop(1,'rgba(90,110,150,0)');g.fillStyle=sg;g.beginPath();g.ellipse(x,y+34,120,22,0,0,7);g.fill();
  g.translate(x,yy);g.scale(f,1);phSpr('ship'+(dm?1:0)+(dk?1:0),0,0,[-172,-222,350,240],()=>phvShipArt(dm,dk));
  /* ใบพัด */g.save();g.translate(-128,-30);if(!dm){g.fillStyle=dk?'rgba(90,90,100,.22)':'rgba(220,205,180,.28)';g.beginPath();g.ellipse(-3,0,3,15,0,0,7);g.fill()}{const a=T*(dm?1.1:11);g.strokeStyle=dk?'#4a4a56':'#7a5a30';g.lineWidth=4;g.lineCap='round';for(let k=0;k<2;k++){const c=Math.cos(a+k*1.5708)*14;g.beginPath();g.moveTo(-3,0);g.lineTo(-3,c);g.stroke()}}g.restore();
  /* ธง */if(!dm){const w=Math.sin(T*3+x)*2.4;g.fillStyle=dk?'#101014':'#2f6fc8';g.beginPath();g.moveTo(-92,-172);g.quadraticCurveTo(-76,-168+w,-60+w,-164);g.lineTo(-64+w,-156);g.lineTo(-60+w,-148);g.quadraticCurveTo(-76,-152+w,-92,-154);g.closePath();g.fill();if(!dk){g.fillStyle='#ffe8a0';PST(g,-74+w*.5,-160,3.6,1.4,4,0);g.fill()}}
  g.restore();
  if(o.nm){g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,14,8,.7)';g.strokeText('«'+o.nm+'»',x,yy-34);g.fillStyle=dk?'#b0b0c0':'#f4e2b4';g.fillText('«'+o.nm+'»',x,yy-34)}
  if(!dk&&!dm){g.save();g.globalCompositeOperation='lighter';for(const k of[-60,-20,20,60])glowAt(x+k*f,yy-24,8,'255,200,120',.45+.2*Math.sin(T*2+k));g.restore()}
  if(dm&&!LOWQ){for(let k=0;k<4;k++){const p=(T*.25+k/4+x*.001)%1;g.fillStyle='rgba(70,64,60,'+(.28*(1-p))+')';g.beginPath();g.arc(x+20*f+p*30,yy-70-p*120,8+p*18,0,7);g.fill()}}};
/* ---------- ประภาคาร ---------- */
function phvLighthouseArt(){const H=270,w0=46,w1=30,gy=-H;
  /* ฐานหิน + หญ้า */for(const[dx,dy,rx,ry,c]of[[-46,8,30,16,'#6a645a'],[40,10,32,15,'#5e584e'],[-6,14,40,14,'#746e62'],[58,0,18,10,'#7c7568'],[-64,2,16,9,'#7c7568']]){const rg=g.createLinearGradient(dx-rx,dy-ry,dx+rx,dy+ry);rg.addColorStop(0,shade(c,.25));rg.addColorStop(1,shade(c,-.3));g.fillStyle=rg;g.beginPath();g.ellipse(dx,dy,rx,ry,0,0,7);g.fill()}
  g.fillStyle='#7a7468';g.beginPath();g.ellipse(0,-2,60,18,0,0,7);g.fill();g.fillStyle='#8e877a';g.beginPath();g.ellipse(0,-8,56,16,0,0,7);g.fill();
  const bp=()=>{g.beginPath();g.moveTo(-w0,-8);g.lineTo(-w1,gy);g.lineTo(w1,gy);g.lineTo(w0,-8);g.quadraticCurveTo(0,6,-w0,-8);g.closePath()};
  bp();const tg=g.createLinearGradient(-w0,0,w0,0);tg.addColorStop(0,'#a8a294');tg.addColorStop(.38,'#f6f2e8');tg.addColorStop(.62,'#e6e0d2');tg.addColorStop(1,'#8c8678');g.fillStyle=tg;g.fill();
  g.save();bp();g.clip();for(const[b0,b1]of[[58,96],[150,188],[236,262]]){const rg=g.createLinearGradient(-w0,0,w0,0);rg.addColorStop(0,'#7a221a');rg.addColorStop(.38,'#d04a3e');rg.addColorStop(.62,'#b83a30');rg.addColorStop(1,'#681c16');g.fillStyle=rg;g.fillRect(-60,-b1,120,b1-b0)}
    g.strokeStyle='rgba(50,40,32,.22)';g.lineWidth=1;for(let k=14,r=0;k<H;k+=14,r++){g.beginPath();g.moveTo(-60,-k);g.lineTo(60,-k);g.stroke();const wk=w0-(w0-w1)*k/H;for(let bx=-wk+(r%2?8:0);bx<wk;bx+=16){g.beginPath();g.moveTo(bx,-k);g.lineTo(bx,-k-14);g.stroke()}}
    const ao=g.createLinearGradient(0,-40,0,0);ao.addColorStop(0,'rgba(0,0,0,0)');ao.addColorStop(1,'rgba(40,30,20,.3)');g.fillStyle=ao;g.fillRect(-60,-40,120,40);g.restore();
  g.strokeStyle='#4a4238';g.lineWidth=1.6;bp();g.stroke();
  /* บันได + ประตู */for(let k=0;k<3;k++){g.fillStyle=shade('#9a9282',-k*.08);g.fillRect(-16+k*1.5,6-k*5,32-k*3,5)}
  const dg=g.createLinearGradient(-11,0,11,0);dg.addColorStop(0,'#2a1c10');dg.addColorStop(1,'#4a3220');g.fillStyle=dg;g.beginPath();g.moveTo(-11,-6);g.lineTo(-11,-34);g.arc(0,-34,11,Math.PI,0);g.lineTo(11,-6);g.closePath();g.fill();g.strokeStyle='#7a6a54';g.lineWidth=2;g.stroke();g.fillStyle='#c8a050';g.beginPath();g.arc(6,-20,1.6,0,7);g.fill();
  for(const wy of[118,206]){g.fillStyle='#202838';g.fillRect(-5,-wy-12,10,16);g.strokeStyle='#5a5246';g.lineWidth=1.4;g.strokeRect(-5,-wy-12,10,16);g.fillStyle='rgba(255,255,255,.18)';g.fillRect(-4,-wy-11,3,6)}
  /* ระเบียง */g.fillStyle='#3e3e46';g.beginPath();g.ellipse(0,gy,48,13,0,0,7);g.fill();g.fillStyle='#54545e';g.fillRect(-48,gy-4,96,6);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-48,gy+2,96,3);
  /* ห้องตะเกียง (กระจก) */const lg=g.createLinearGradient(-20,0,20,0);lg.addColorStop(0,'rgba(60,78,104,.95)');lg.addColorStop(.5,'rgba(110,140,170,.95)');lg.addColorStop(1,'rgba(50,64,90,.95)');g.fillStyle=lg;g.fillRect(-20,gy-46,40,42);
  g.strokeStyle='#26262e';g.lineWidth=2.2;for(const dx of[-20,-7,7,20]){g.beginPath();g.moveTo(dx,gy-46);g.lineTo(dx,gy-4);g.stroke()}g.beginPath();g.moveTo(-20,gy-46);g.lineTo(20,gy-46);g.stroke();
  g.lineWidth=1.4;g.beginPath();g.moveTo(-48,gy-14);g.lineTo(48,gy-14);g.stroke();for(let dx=-44;dx<=44;dx+=8.8){g.beginPath();g.moveTo(dx,gy-14);g.lineTo(dx,gy-2);g.stroke()}
  /* หลังคาโดม */const rf=g.createLinearGradient(-27,0,27,0);rf.addColorStop(0,'#6a1c16');rf.addColorStop(.4,'#c0463a');rf.addColorStop(1,'#5a1812');g.fillStyle=rf;g.beginPath();g.moveTo(-28,gy-46);g.quadraticCurveTo(-24,gy-72,0,gy-80);g.quadraticCurveTo(24,gy-72,28,gy-46);g.closePath();g.fill();g.strokeStyle='#3a1210';g.lineWidth=1.4;g.stroke();
  g.fillStyle='#d8b050';g.beginPath();g.arc(0,gy-84,4.5,0,7);g.fill();g.strokeStyle='#5a4a20';g.lineWidth=1.6;g.beginPath();g.moveTo(0,gy-88);g.lineTo(0,gy-100);g.stroke();g.beginPath();g.moveTo(-8,gy-96);g.lineTo(8,gy-96);g.stroke()}
PALK.phlh=function(t,T){const x=t.x,y=t.y,lit=gP8lit(),gy=y-270;PALSH(x+10,y+8,74,22,.45);phSpr('lh',x,y,[-82,-380,164,410],phvLighthouseArt);
  if(lit){g.fillStyle='rgba(255,226,150,.9)';g.fillRect(x-19,gy-45,38,40);g.fillStyle='rgba(255,200,120,.55)';g.fillRect(x-9,y-36,18,30);for(const wy of[118,206]){g.fillStyle='#ffd88a';g.fillRect(x-4,y-wy-11,8,14)}}
  const ly=gy-24;g.save();g.globalCompositeOperation='lighter';if(lit)phBeam(x,ly,T,1);else glowAt(x,ly,10,'255,170,90',.25+.15*Math.sin(T*3));g.restore()};
/* ---------- บ้านท่าเรือ · เต็นท์พยาบาล · คลังเสบียง · เครน · สมอ ---------- */
function phvHouseArt(){const W2=88,Hh=96;
  /* ฐานหิน */const sg=g.createLinearGradient(0,-16,0,4);sg.addColorStop(0,'#8a8274');sg.addColorStop(1,'#5a544a');g.fillStyle=sg;g.fillRect(-W2-4,-16,W2*2+8,20);g.strokeStyle='rgba(40,34,28,.5)';g.lineWidth=1;for(let x=-W2;x<W2;x+=18){g.strokeRect(x,-15,18,9);g.strokeRect(x+9,-6,18,9)}
  /* ผนังไม้ */const wg=g.createLinearGradient(-W2,0,W2,0);wg.addColorStop(0,'#8a6440');wg.addColorStop(.5,'#b08458');wg.addColorStop(1,'#7a5434');g.fillStyle=wg;g.fillRect(-W2+4,-Hh,W2*2-8,Hh-16);
  g.strokeStyle='rgba(40,24,12,.35)';g.lineWidth=1;for(let k=-Hh+10;k<-16;k+=10){g.beginPath();g.moveTo(-W2+4,k);g.lineTo(W2-4,k);g.stroke()}
  g.fillStyle='#4e321e';for(const dx of[-W2+4,-6,W2-12])g.fillRect(dx,-Hh,8,Hh-16);g.fillRect(-W2+4,-Hh+40,W2*2-8,6);g.strokeStyle='#4e321e';g.lineWidth=5;g.beginPath();g.moveTo(-W2+8,-Hh+44);g.lineTo(-30,-18);g.moveTo(W2-8,-Hh+44);g.lineTo(30,-18);g.stroke();
  const ao=g.createLinearGradient(0,-Hh,0,-Hh+30);ao.addColorStop(0,'rgba(20,12,6,.45)');ao.addColorStop(1,'rgba(20,12,6,0)');g.fillStyle=ao;g.fillRect(-W2+4,-Hh,W2*2-8,30);
  /* หลังคากระเบื้อง */g.save();g.beginPath();g.moveTo(-W2-18,-Hh+8);g.lineTo(-W2+28,-Hh-54);g.lineTo(W2-28,-Hh-54);g.lineTo(W2+18,-Hh+8);g.closePath();const rg=g.createLinearGradient(0,-Hh-54,0,-Hh+8);rg.addColorStop(0,'#4e5c6e');rg.addColorStop(1,'#2e3846');g.fillStyle=rg;g.fill();g.clip();
    for(let r=0;r<7;r++){const yy=-Hh-54+r*9.2;for(let x=-W2-20+(r%2?7:0);x<W2+20;x+=14){g.fillStyle=r%2?'rgba(255,255,255,.06)':'rgba(0,0,0,.08)';g.beginPath();g.arc(x+7,yy+9,7,0,Math.PI);g.fill();g.strokeStyle='rgba(20,26,36,.45)';g.lineWidth=.8;g.stroke()}}g.restore();
  g.strokeStyle='#1e2630';g.lineWidth=1.6;g.beginPath();g.moveTo(-W2-18,-Hh+8);g.lineTo(-W2+28,-Hh-54);g.lineTo(W2-28,-Hh-54);g.lineTo(W2+18,-Hh+8);g.stroke();g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-W2-14,-Hh+8,W2*2+28,5);
  /* ปล่องไฟ */g.fillStyle='#6a5a4a';g.fillRect(40,-Hh-74,16,30);g.fillStyle='#4a3e32';g.fillRect(37,-Hh-78,22,6);
  /* หน้าต่าง */for(const dx of[-56,40]){g.fillStyle='#2a3646';g.fillRect(dx,-Hh+18,22,20);g.fillStyle='rgba(180,210,240,.25)';g.fillRect(dx+2,-Hh+20,7,8);g.strokeStyle='#3a2414';g.lineWidth=2;g.strokeRect(dx,-Hh+18,22,20);g.beginPath();g.moveTo(dx+11,-Hh+18);g.lineTo(dx+11,-Hh+38);g.moveTo(dx,-Hh+28);g.lineTo(dx+22,-Hh+28);g.stroke();
    g.fillStyle='#5a3a22';g.fillRect(dx-3,-Hh+38,28,4);g.fillStyle='#d8584a';for(let k=0;k<4;k++){g.beginPath();g.arc(dx+3+k*6,-Hh+37,2.4,0,7);g.fill()}}
  /* ประตู */const dg=g.createLinearGradient(-14,0,14,0);dg.addColorStop(0,'#3a2414');dg.addColorStop(1,'#5a3a22');g.fillStyle=dg;g.fillRect(-14,-50,28,34);g.strokeStyle='#24160c';g.lineWidth=1.4;g.strokeRect(-14,-50,28,34);g.beginPath();g.moveTo(0,-50);g.lineTo(0,-16);g.stroke();g.fillStyle='#d8b050';g.beginPath();g.arc(8,-32,1.8,0,7);g.fill();
  /* ป้าย */g.fillStyle='#e8dcc0';g.fillRect(-36,-Hh-12,72,17);g.strokeStyle='#3a2414';g.lineWidth=1.4;g.strokeRect(-36,-Hh-12,72,17);g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#3a2414';g.fillText('⚓ ท่าเรือ',0,-Hh+0)}
PALK.phhouse=function(t,T){const x=t.x,y=t.y,Hh=96;PALSH(x+8,y+6,102,20,.42);phSpr('hs',x,y,[-112,-180,224,188],phvHouseArt);
  const nt=phNt();if(nt>.2){for(const dx of[-56,40]){g.fillStyle='rgba(255,214,140,'+(.45+nt*.45)+')';g.fillRect(x+dx+1,y-Hh+19,20,18)}g.save();g.globalCompositeOperation='lighter';for(const dx of[-56,40])glowAt(x+dx+11,y-Hh+28,26,'255,200,120',.25*nt);g.restore()}
  if(!LOWQ){for(let k=0;k<3;k++){const p=(T*.2+k/3)%1;g.fillStyle='rgba(220,220,225,'+(.3*(1-p))+')';g.beginPath();g.arc(x+48+p*14,y-Hh-80-p*60,5+p*12,0,7);g.fill()}}
  const bs=Math.sin(T*1.6)*.12;g.save();g.translate(x+82,y-Hh-6);g.strokeStyle='#3a2414';g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(18,0);g.stroke();g.translate(16,2);g.rotate(bs);const bl=g.createLinearGradient(-5,0,5,0);bl.addColorStop(0,'#8a5a1e');bl.addColorStop(.5,'#e8b850');bl.addColorStop(1,'#8a5a1e');g.fillStyle=bl;g.beginPath();g.moveTo(-5,10);g.quadraticCurveTo(-5,0,0,0);g.quadraticCurveTo(5,0,5,10);g.closePath();g.fill();g.restore()};
function phvTentArt(){const cv=(a,b,c2)=>{const gr=g.createLinearGradient(a,0,b,0);gr.addColorStop(0,c2[0]);gr.addColorStop(1,c2[1]);return gr};
  g.fillStyle=cv(-72,72,['#c8c0b0','#e8e2d4']);g.beginPath();g.moveTo(-72,4);g.lineTo(-46,-70);g.lineTo(46,-70);g.lineTo(72,4);g.closePath();g.fill();g.strokeStyle='#6a6052';g.lineWidth=1.4;g.stroke();
  g.fillStyle='rgba(60,50,40,.18)';g.beginPath();g.moveTo(46,-70);g.lineTo(72,4);g.lineTo(38,4);g.closePath();g.fill();
  g.strokeStyle='rgba(120,110,96,.45)';g.lineWidth=1;for(const k of[-40,-14,14,40]){g.beginPath();g.moveTo(k*.66,-70);g.lineTo(k*1.15,4);g.stroke()}
  g.fillStyle=cv(-46,46,['#ece6d8','#fbf8f0']);g.beginPath();g.moveTo(-46,-70);g.lineTo(46,-70);g.lineTo(30,-90);g.lineTo(-30,-90);g.closePath();g.fill();g.strokeStyle='#6a6052';g.stroke();
  g.fillStyle='#2e2a24';g.beginPath();g.moveTo(-18,4);g.lineTo(-14,-42);g.lineTo(14,-42);g.lineTo(18,4);g.closePath();g.fill();g.fillStyle='rgba(255,230,180,.12)';g.fillRect(-12,-36,24,40);
  g.fillStyle='#f4f0e6';g.beginPath();g.moveTo(-14,-42);g.quadraticCurveTo(-22,-20,-26,2);g.lineTo(-18,4);g.closePath();g.fill();
  g.fillStyle='#2f8a52';g.fillRect(-6,-68,12,24);g.fillRect(-12,-62,24,12);g.strokeStyle='#f4f0e8';g.lineWidth=1.4;g.strokeRect(-6,-68,12,24);
  g.strokeStyle='#6a5a44';g.lineWidth=1.2;for(const s of[-1,1]){g.beginPath();g.moveTo(s*46,-70);g.lineTo(s*94,8);g.stroke();g.fillStyle='#4a3a28';g.fillRect(s*94-2,6,4,6)}
  g.fillStyle='#8a6a44';g.fillRect(50,-14,30,14);g.fillStyle='#e8e0cc';g.fillRect(52,-19,26,6);g.fillStyle='#c84a3a';g.fillRect(62,-19,6,6)}
PALK.phmed=function(t,T){PALSH(t.x+6,t.y+6,74,16,.4);phSpr('md',t.x,t.y,[-100,-96,200,112],phvTentArt)};
function phvCrate(x,y,w,h,c){const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,shade(c,.18));gr.addColorStop(1,shade(c,-.2));g.fillStyle=gr;g.fillRect(x,y,w,h);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(x,y,w,h);g.strokeStyle='rgba(58,36,20,.8)';g.lineWidth=2.2;g.strokeRect(x+2,y+2,w-4,h-4);g.lineWidth=1.6;g.beginPath();g.moveTo(x+2,y+2);g.lineTo(x+w-2,y+h-2);g.stroke();g.fillStyle='rgba(255,236,200,.18)';g.fillRect(x,y,w,2)}
function phvBarrel(x,y,r,h){const gr=g.createLinearGradient(x-r,0,x+r,0);gr.addColorStop(0,'#5a3a20');gr.addColorStop(.45,'#9a6c42');gr.addColorStop(1,'#4a2e18');g.fillStyle=gr;g.beginPath();g.moveTo(x-r*.85,y);g.quadraticCurveTo(x-r*1.1,y-h/2,x-r*.85,y-h);g.lineTo(x+r*.85,y-h);g.quadraticCurveTo(x+r*1.1,y-h/2,x+r*.85,y);g.closePath();g.fill();
  g.fillStyle='#7a5434';g.beginPath();g.ellipse(x,y-h,r*.85,r*.3,0,0,7);g.fill();g.strokeStyle='#2e2e34';g.lineWidth=2;for(const k of[.18,.82]){g.beginPath();g.moveTo(x-r*1.02,y-h*k);g.quadraticCurveTo(x,y-h*k+3,x+r*1.02,y-h*k);g.stroke()}}
function phvDepotArt(){g.fillStyle='#5a3e26';g.fillRect(-50,-14,100,16);g.strokeStyle='#2a1a0e';g.lineWidth=1.4;g.strokeRect(-50,-14,100,16);
  phvCrate(-46,-44,30,30,'#8a6440');phvCrate(-12,-48,34,34,'#9a7048');phvCrate(26,-38,24,24,'#7e5838');phvCrate(-28,-70,26,24,'#946a44');phvCrate(6,-74,24,26,'#a87c50');
  phvBarrel(-58,0,10,26);phvBarrel(60,2,9,22);
  g.fillStyle='#c8b480';g.beginPath();g.ellipse(46,-4,10,7,0,0,7);g.fill();g.fillStyle='#b8a470';g.beginPath();g.ellipse(36,0,9,6,0,0,7);g.fill();
  g.strokeStyle='#4a3020';g.lineWidth=3.4;g.beginPath();g.moveTo(-56,-14);g.lineTo(-56,-98);g.moveTo(56,-14);g.lineTo(56,-98);g.stroke();
  const tp=g.createLinearGradient(0,-112,0,-80);tp.addColorStop(0,'#d8c89c');tp.addColorStop(1,'#a8946a');g.fillStyle=tp;g.beginPath();g.moveTo(-66,-92);g.quadraticCurveTo(0,-118,66,-92);g.lineTo(66,-82);g.quadraticCurveTo(0,-106,-66,-82);g.closePath();g.fill();g.strokeStyle='#6a5a3a';g.lineWidth=1;g.stroke();
  for(let k=-60;k<=60;k+=12){g.fillStyle=(k/12)%2?'#c2463a':'#e8dcc0';g.beginPath();g.moveTo(k,-83-Math.cos(k/66*1.57)*12+3);g.lineTo(k+12,-83-Math.cos((k+12)/66*1.57)*12+3);g.lineTo(k+6,-74-Math.cos((k+6)/66*1.57)*12+3);g.closePath();g.fill()}
  g.fillStyle='#e8dcc0';g.fillRect(-34,-130,68,17);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(-34,-130,68,17);g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#3a2414';g.fillText('📦 คลังเสบียง',0,-118)}
{const _d=PALK.phdep;PALK.phdep=function(t,T){const x=t.x,y=t.y;PALSH(x+4,y+6,58,12,.4);phSpr('dp',x,y,[-80,-140,160,152],phvDepotArt);
  const st=stCur(),q=me.sty;if(st&&st.p8sp&&q&&q.a===1){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-40,60,'255,220,140',.18+.08*Math.sin(T*3));g.restore();g.strokeStyle='rgba(255,214,140,'+(.5+.3*Math.sin(T*3))+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+40,70,24,0,0,7);g.stroke()}
  if(p6Past('p8sp'))phMekD(x+70,y+10,T)}}
function phvCraneArt(){g.strokeStyle='#4a3424';g.lineCap='round';const bm=(x1,y1,x2,y2,w)=>{g.lineWidth=w+2;g.strokeStyle='#2a1a0e';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.lineWidth=w;g.strokeStyle='#6a4a30';g.stroke();g.lineWidth=Math.max(1,w*.3);g.strokeStyle='rgba(255,220,170,.25)';g.stroke()};
  bm(0,0,0,-150,7);bm(-4,-140,110,-150,5);bm(0,-100,60,-145,2.6);bm(0,-30,-18,0,3);bm(0,-30,18,0,3);
  g.fillStyle='#3a2a1c';g.beginPath();g.arc(0,-60,10,0,7);g.fill();g.strokeStyle='#c8b080';g.lineWidth=1.2;for(let r=4;r<9;r+=2){g.beginPath();g.arc(0,-60,r,0,7);g.stroke()}
  g.fillStyle='#5a4a3a';g.fillRect(-10,-4,20,8)}
PALK.phcrane=function(t,T){const x=t.x,y=t.y,sw=Math.sin(T*1.1+x)*6;PALSH(x+4,y+4,22,7,.4);phSpr('cr',x,y,[-30,-162,150,172],phvCraneArt);
  g.strokeStyle='#c8b080';g.lineWidth=1.2;g.beginPath();g.moveTo(x+104,y-150);g.lineTo(x+104+sw,y-72);g.stroke();phvCrate(x+92+sw,y-72,24,20,'#8a6440')};
function phvAnchorArt(){const sg=g.createLinearGradient(0,-16,0,4);sg.addColorStop(0,'#8e877a');sg.addColorStop(1,'#5e584e');g.fillStyle=sg;g.beginPath();g.roundRect(-32,-16,64,20,4);g.fill();g.strokeStyle='rgba(30,26,22,.5)';g.lineWidth=1;g.stroke();
  const ir=(w,c)=>{g.strokeStyle=c;g.lineWidth=w};g.lineCap='round';
  for(const[w,c]of[[9,'#1a1c22'],[6,'#3a3e48'],[2,'rgba(200,210,230,.35)']]){ir(w,c);g.beginPath();g.moveTo(0,-14);g.lineTo(0,-82);g.stroke();g.beginPath();g.moveTo(-16,-72);g.lineTo(16,-72);g.stroke();g.beginPath();g.arc(0,-38,24,.25*Math.PI,.75*Math.PI);g.stroke()}
  g.fillStyle='#2c3038';for(const s of[-1,1]){g.beginPath();g.moveTo(s*17,-21);g.lineTo(s*27,-31);g.lineTo(s*23,-15);g.closePath();g.fill()}
  g.strokeStyle='#2c3038';g.lineWidth=3;g.beginPath();g.arc(0,-88,6,0,7);g.stroke();
  g.strokeStyle='#8a6a3a';g.lineWidth=2.6;g.beginPath();g.moveTo(4,-86);g.quadraticCurveTo(22,-60,12,-30);g.quadraticCurveTo(6,-18,20,-12);g.stroke();g.strokeStyle='rgba(255,230,180,.3)';g.lineWidth=1;g.stroke();
  g.fillStyle='rgba(110,150,70,.7)';g.beginPath();g.ellipse(-20,-14,10,4,0,0,7);g.fill()}
PALK.phanc=function(t,T){PALSH(t.x+4,t.y+4,36,10,.4);phSpr('an',t.x,t.y,[-40,-100,80,108],phvAnchorArt)};
/* ---------- ต้นไม้ลู่ลม · หิน · พุ่มไม้ ---------- */
function phvTreeArt(v,s){const C=[['#3e6a30','#5e8e40','#8ab85a','#b8d878'],['#335e30','#507e40','#78a454','#a8cc70'],['#4e6e30','#728e40','#9ab25a','#c8d488']][v];
  g.strokeStyle='#3a2818';g.lineWidth=8*s;g.lineCap='round';g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(6*s,-50*s,-22*s,-96*s);g.stroke();g.strokeStyle='rgba(255,220,170,.25)';g.lineWidth=2*s;g.beginPath();g.moveTo(2*s,-4*s);g.quadraticCurveTo(8*s,-48*s,-18*s,-92*s);g.stroke();
  g.strokeStyle='#3a2818';g.lineWidth=3.6*s;g.beginPath();g.moveTo(2*s,-50*s);g.lineTo(-28*s,-62*s);g.stroke();g.beginPath();g.moveTo(-8*s,-78*s);g.lineTo(-40*s,-84*s);g.stroke();
  const blobs=[[-30,-96,32],[-4,-104,26],[-52,-84,22],[-28,-110,24],[-6,-116,16],[-48,-98,16],[-22,-122,13],[-40,-110,12],[6,-96,14]];
  for(const[dx,dy,r]of blobs){g.fillStyle=C[0];g.beginPath();g.ellipse(dx*s+2*s,dy*s+5*s,r*s,r*.72*s,0,0,7);g.fill()}
  for(const[dx,dy,r]of blobs){const gr=g.createRadialGradient((dx-r*.35)*s,(dy-r*.4)*s,r*.1*s,dx*s,dy*s,r*s);gr.addColorStop(0,C[3]);gr.addColorStop(.45,C[2]);gr.addColorStop(1,C[1]);g.fillStyle=gr;g.beginPath();g.ellipse(dx*s,dy*s,r*s,r*.72*s,0,0,7);g.fill()}
  g.fillStyle='rgba(30,50,20,.18)';for(const[dx,dy,r]of blobs.slice(0,4)){g.beginPath();g.ellipse((dx+4)*s,(dy+r*.35)*s,r*.7*s,r*.25*s,0,0,7);g.fill()}}
PALK.phtree=function(t,T){const x=t.x,y=t.y,s=Math.round((t.sc||1)*10)/10,sw=Math.sin(T*1.2+x*.01)*.025;PALSH(x-14*s,y+4,36*s,10*s,.38);g.save();g.translate(x,y);g.rotate(sw);phSpr('tr'+(t.v||0)+'_'+s,0,0,[-90*s,-148*s,124*s,156*s],()=>phvTreeArt(t.v||0,s));g.restore()};
function phvRockArt(v,s){const pts=[[-24,0],[-20,-18],[-6,-30],[10,-28],[22,-16],[25,0]].map(([a,b])=>[a*s*(1+(v%2)*.1),b*s*(1+(v===2?.15:0))]);
  const gr=g.createLinearGradient(-20*s,-30*s,20*s,0);gr.addColorStop(0,'#a8a294');gr.addColorStop(.5,'#7a7468');gr.addColorStop(1,'#4e4a42');g.fillStyle=gr;g.beginPath();pts.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));g.closePath();g.fill();g.strokeStyle='rgba(30,26,22,.55)';g.lineWidth=1;g.stroke();
  g.fillStyle='rgba(255,250,235,.22)';g.beginPath();g.moveTo(pts[1][0],pts[1][1]);g.lineTo(pts[2][0],pts[2][1]);g.lineTo(pts[3][0]*.4,pts[3][1]*.7);g.lineTo(-10*s,-8*s);g.closePath();g.fill();
  g.strokeStyle='rgba(30,26,22,.45)';g.beginPath();g.moveTo(-2*s,-26*s);g.lineTo(2*s,-14*s);g.lineTo(-4*s,-4*s);g.stroke();
  const mg=g.createRadialGradient(-6*s,-28*s,1,-6*s,-26*s,12*s);mg.addColorStop(0,'rgba(140,180,80,.9)');mg.addColorStop(1,'rgba(90,130,60,0)');g.fillStyle=mg;g.beginPath();g.ellipse(-6*s,-26*s,13*s,5*s,-.2,0,7);g.fill()}
PALK.phrock=function(t,T){const s=Math.round((t.sc||1)*10)/10;PALSH(t.x+3,t.y+3,28*s,7*s,.38);phSpr('rk'+(t.v||0)+'_'+s,t.x,t.y,[-30*s,-36*s,62*s,42*s],()=>phvRockArt(t.v||0,s))};
function phvBushArt(v,s){const C=[['#3e6a34','#5e8e44','#8ab860'],['#365e36','#4e7e46','#7aa860'],['#4a6c30','#6c8c3e','#98b65a']][v];for(const[dx,dy,r]of[[-11,-8,10],[7,-9,11],[-2,-15,9],[-16,-4,7],[14,-4,7]]){const gr=g.createRadialGradient((dx-r*.3)*s,(dy-r*.4)*s,1,dx*s,dy*s,r*s);gr.addColorStop(0,C[2]);gr.addColorStop(1,C[0]);g.fillStyle=gr;g.beginPath();g.ellipse(dx*s,dy*s,r*s,r*.72*s,0,0,7);g.fill()}
  g.fillStyle=v===1?'#f4a8c4':v===2?'#fff0b0':'#ffffff';for(const[dx,dy]of[[-8,-13],[4,-17],[10,-8],[-14,-6]]){g.beginPath();g.arc(dx*s,dy*s,1.9,0,7);g.fill()}}
PALK.phbush=function(t,T){const s=Math.round((t.sc||1)*10)/10;PALSH(t.x,t.y+2,22*s,5*s,.3);phSpr('bu'+(t.v||0)+'_'+s,t.x,t.y,[-26*s,-28*s,52*s,32*s],()=>phvBushArt(t.v||0,s))};
/* ---------- ซากเรือ «ฟ้าเที่ยง» ---------- */
function phvWreckArt(){const R=phvR(7713);
  /* เนินดิน เศษไม้ หญ้าขึ้นรอบซาก */g.fillStyle='rgba(70,56,40,.55)';g.beginPath();g.ellipse(40,14,300,34,-.08,0,7);g.fill();
  for(let i=0;i<26;i++){const x=-260+R()*560,y=4+R()*40,l=10+R()*26,a=(R()-.5)*1.6;g.save();g.translate(x,y);g.rotate(a);g.fillStyle=shade('#7a5636',(R()-.5)*.4);g.fillRect(-l/2,-2,l,4);g.restore()}
  g.save();g.rotate(-.1);
  /* ลูกโป่งยุบ */{g.save();g.beginPath();g.moveTo(-170,-110);g.quadraticCurveTo(-60,-214,90,-194);g.quadraticCurveTo(232,-172,300,-100);g.quadraticCurveTo(250,-118,214,-110);g.lineTo(200,-126);g.lineTo(176,-112);g.quadraticCurveTo(120,-124,60,-128);g.lineTo(40,-140);g.lineTo(22,-130);g.quadraticCurveTo(-60,-150,-170,-110);g.closePath();
    const bg=g.createLinearGradient(0,-200,0,-110);bg.addColorStop(0,'#e8dcc0');bg.addColorStop(.6,'#c4b48e');bg.addColorStop(1,'#8e7e5c');g.fillStyle=bg;g.fill();g.clip();
    for(let k=0;k<9;k++){const x0=-150+k*52;const fg=g.createLinearGradient(x0-16,0,x0+16,0);fg.addColorStop(0,'rgba(60,46,28,0)');fg.addColorStop(.5,'rgba(60,46,28,.32)');fg.addColorStop(1,'rgba(255,250,235,.18)');g.fillStyle=fg;g.beginPath();g.moveTo(x0-12,-220);g.quadraticCurveTo(x0+18,-160,x0-4,-100);g.lineTo(x0+14,-100);g.quadraticCurveTo(x0+34,-160,x0+8,-220);g.closePath();g.fill()}
    g.strokeStyle='rgba(90,72,44,.5)';g.lineWidth=1;for(let k=-160;k<300;k+=22){g.beginPath();g.moveTo(k,-210);g.quadraticCurveTo(k+30,-150,k+12,-96);g.stroke()}for(let r=0;r<4;r++){g.beginPath();g.moveTo(-180,-120-r*18);g.quadraticCurveTo(60,-196-r*12,310,-110-r*10);g.stroke()}
    for(const[px,py,w,h,c]of[[-96,-164,30,20,'#a89068'],[36,-184,34,22,'#b8a07a'],[168,-156,26,18,'#9a8462'],[-20,-138,20,14,'#c8b088']]){g.fillStyle=c;g.fillRect(px,py,w,h);g.strokeStyle='rgba(70,50,30,.7)';g.setLineDash([3,2]);g.strokeRect(px+1,py+1,w-2,h-2);g.setLineDash([])}
    g.fillStyle='rgba(30,24,18,.75)';for(const[px,py,r]of[[110,-150,12],[-60,-150,8],[230,-130,9]]){g.beginPath();g.ellipse(px,py,r,r*.6,.3,0,7);g.fill()}
    const sh=g.createLinearGradient(0,-140,0,-100);sh.addColorStop(0,'rgba(40,30,20,0)');sh.addColorStop(1,'rgba(40,30,20,.45)');g.fillStyle=sh;g.fillRect(-200,-140,520,44);g.restore();
    g.strokeStyle='rgba(80,62,40,.8)';g.lineWidth=1.2;g.beginPath();g.moveTo(-170,-110);g.quadraticCurveTo(-60,-214,90,-194);g.quadraticCurveTo(232,-172,300,-100);g.stroke();
    /* ผ้าขาดห้อย */g.fillStyle='#b8a880';for(const[x,l]of[[214,26],[40,30],[-120,20]]){g.beginPath();g.moveTo(x-8,-114);g.quadraticCurveTo(x-2,-114+l*.6,x+4,-114+l);g.lineTo(x+6,-114+l*.5);g.lineTo(x+10,-114);g.closePath();g.fill()}}
  /* เชือกตาข่าย */g.strokeStyle='rgba(120,96,60,.85)';g.lineWidth=1.3;for(const k of[-150,-80,0,80,160,240]){g.beginPath();g.moveTo(k,-118-Math.sin((k+170)/470*3.1)*60);g.quadraticCurveTo(k+8,-104,k+12,-96);g.stroke()}
  /* ตัวเรือ */const hull=()=>{g.beginPath();g.moveTo(-230,-70);g.quadraticCurveTo(-200,0,-60,10);g.lineTo(220,0);g.quadraticCurveTo(330,-10,340,-90);g.lineTo(300,-96);g.lineTo(-200,-96);g.closePath()};
  hull();const hg=g.createLinearGradient(0,-100,0,12);hg.addColorStop(0,'#a07850');hg.addColorStop(.45,'#7a5634');hg.addColorStop(1,'#3e2814');g.fillStyle=hg;g.fill();
  g.save();hull();g.clip();
    for(let k=-92,r=0;k<12;k+=13,r++){g.strokeStyle='rgba(30,18,8,.55)';g.lineWidth=1.3;g.beginPath();g.moveTo(-240,k);g.quadraticCurveTo(60,k+9,350,k-5);g.stroke();g.strokeStyle='rgba(255,226,180,.12)';g.lineWidth=1;g.beginPath();g.moveTo(-240,k+2);g.quadraticCurveTo(60,k+11,350,k-3);g.stroke();
      for(let x=-220+(r*67)%130;x<330;x+=120+(r*31)%60){g.fillStyle='rgba(30,18,8,.6)';g.fillRect(x,k-1+((x+220)/570)*8,2,12)}}
    for(let i=0;i<40;i++){const x=-220+R()*550,y=-90+R()*96;g.fillStyle='rgba(30,20,10,'+(.08+R()*.12)+')';g.beginPath();g.ellipse(x,y,6+R()*16,2+R()*4,0,0,7);g.fill()}
    /* ทองแดงขึ้นสนิมเขียวที่ท้องเรือ */const cu=g.createLinearGradient(0,-14,0,12);cu.addColorStop(0,'rgba(80,150,130,0)');cu.addColorStop(.4,'rgba(80,150,130,.5)');cu.addColorStop(1,'rgba(60,110,96,.75)');g.fillStyle=cu;g.fillRect(-240,-18,600,34);
    /* รูโหว่เห็นโครงไม้ */g.fillStyle='#1a0e06';g.beginPath();g.moveTo(-50,-66);g.lineTo(-22,-80);g.lineTo(8,-74);g.lineTo(36,-60);g.lineTo(22,-26);g.lineTo(-6,-16);g.lineTo(-38,-24);g.lineTo(-56,-44);g.closePath();g.fill();
    g.strokeStyle='#5a3a1e';g.lineWidth=5;for(const x of[-34,-8,18]){g.beginPath();g.moveTo(x,-82);g.quadraticCurveTo(x+6,-46,x-2,-14);g.stroke()}g.strokeStyle='rgba(255,220,170,.2)';g.lineWidth=1.4;for(const x of[-35,-9,17]){g.beginPath();g.moveTo(x,-80);g.quadraticCurveTo(x+5,-46,x-3,-16);g.stroke()}
    g.fillStyle='#8a6440';for(const[x,y,a]of[[-52,-50,.6],[30,-58,-.5],[-30,-20,.2]]){g.save();g.translate(x,y);g.rotate(a);g.beginPath();g.moveTo(-14,-3);g.lineTo(10,-4);g.lineTo(14,0);g.lineTo(8,2);g.lineTo(4,0);g.lineTo(-14,3);g.closePath();g.fill();g.restore()}
    const ao=g.createLinearGradient(0,-96,0,-70);ao.addColorStop(0,'rgba(20,10,4,.55)');ao.addColorStop(1,'rgba(20,10,4,0)');g.fillStyle=ao;g.fillRect(-240,-96,600,26);
  g.restore();hull();g.strokeStyle='#24160a';g.lineWidth=2.2;g.stroke();
  /* ราวทอง */const rl=g.createLinearGradient(0,-102,0,-94);rl.addColorStop(0,'#f0d080');rl.addColorStop(1,'#9a7028');g.fillStyle=rl;g.fillRect(-200,-102,520,7);g.fillStyle='#4e3420';for(let k=-190;k<310;k+=26){if(k>90&&k<150)continue;g.fillRect(k,-116,4,15)}g.fillRect(-200,-118,290,4);g.save();g.translate(150,-118);g.rotate(.5);g.fillRect(0,0,60,4);g.restore();g.fillRect(200,-118,112,4);
  for(const px of[-140,60,240]){const pg=g.createRadialGradient(px-3,-53,1,px,-50,9);pg.addColorStop(0,'#3a4a5a');pg.addColorStop(1,'#0e1418');g.fillStyle=pg;g.beginPath();g.arc(px,-50,9,0,7);g.fill();g.strokeStyle='#c8963a';g.lineWidth=2.6;g.stroke();g.strokeStyle='rgba(255,240,200,.5)';g.lineWidth=1;g.beginPath();g.arc(px,-50,9,3.6,4.8);g.stroke()}
  /* เสากระโดงหัก */{const mg=g.createLinearGradient(32,0,52,0);mg.addColorStop(0,'#3a2414');mg.addColorStop(.5,'#6a4a2c');mg.addColorStop(1,'#2a180a');g.fillStyle=mg;g.beginPath();g.moveTo(34,-100);g.lineTo(46,-202);g.lineTo(50,-212);g.lineTo(53,-200);g.lineTo(57,-208);g.lineTo(58,-196);g.lineTo(50,-100);g.closePath();g.fill();
    g.save();g.translate(56,-202);g.rotate(.48);g.fillStyle=mg;g.fillRect(0,-3,100,6);g.restore();
    g.fillStyle='#ece4d0';g.beginPath();g.moveTo(60,-192);g.quadraticCurveTo(100,-176,132,-168);g.lineTo(122,-156);g.lineTo(112,-150);g.lineTo(104,-138);g.lineTo(96,-130);g.quadraticCurveTo(80,-160,60,-192);g.closePath();g.fill();g.fillStyle='rgba(120,100,70,.3)';g.beginPath();g.moveTo(60,-192);g.quadraticCurveTo(82,-160,96,-130);g.lineTo(104,-138);g.quadraticCurveTo(86,-166,64,-190);g.closePath();g.fill();
    g.strokeStyle='rgba(150,120,80,.9)';g.lineWidth=1.2;g.beginPath();g.moveTo(48,-196);g.quadraticCurveTo(-40,-160,-120,-104);g.moveTo(52,-190);g.quadraticCurveTo(160,-150,250,-104);g.stroke()}
  /* หัวเรือ */g.fillStyle='#c8963a';g.beginPath();g.moveTo(-230,-70);g.quadraticCurveTo(-252,-78,-266,-96);g.quadraticCurveTo(-246,-92,-236,-84);g.closePath();g.fill();g.strokeStyle='#6a4a18';g.lineWidth=1;g.stroke();
  g.font='bold 12px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(40,26,12,.8)';g.strokeText('ฟ้าเที่ยง',-120,-72);g.fillStyle='#ecd8a0';g.fillText('ฟ้าเที่ยง',-120,-72);
  /* ตะไคร่ หญ้าขึ้นตามท้องเรือ */for(let i=0;i<40;i++){const x=-210+R()*540,y=-4+R()*14;g.strokeStyle=R()<.5?'#5e8a3e':'#7aa64a';g.lineWidth=1.4;g.beginPath();g.moveTo(x,y+6);g.quadraticCurveTo(x+2,y-2,x+(R()-.5)*8,y-8-R()*6);g.stroke()}
  g.restore()}
PALK.phwreck=function(t,T){const x=t.x,y=t.y,smk=!p6Past('p8sa');PALSH(x+30,y+10,260,40,.4);phSpr('wr',x,y,[-300,-282,676,346],phvWreckArt);
  if(smk){for(let k=0;k<(LOWQ?3:6);k++){const p=(T*.22+k/6)%1,sx=x+20+Math.sin(p*4+k)*14+p*60,sy=y-80-p*200;g.fillStyle='rgba(70,64,60,'+(.32*(1-p))+')';g.beginPath();g.arc(sx,sy,10+p*26,0,7);g.fill()}}};
/* ---------- ของเล็ก: ลัง · ถัง · ม้วนเชือก ---------- */
PALK.phcrate=function(t,T){PALSH(t.x+3,t.y+3,17,5,.35);phSpr('cx'+(t.v===1?1:0),t.x,t.y,[-16,-46,32,48],()=>{phvCrate(-13,-24,26,24,'#8a6440');if(t.v===1)phvCrate(-10,-42,20,18,'#7a5636')})};
PALK.phbarrel=function(t,T){PALSH(t.x+3,t.y+3,13,4,.35);phSpr('bx',t.x,t.y,[-14,-32,28,34],()=>phvBarrel(0,0,11,26))};
PALK.phrope=function(t,T){PALSH(t.x,t.y+2,15,4,.3);phSpr('rx',t.x,t.y,[-16,-16,32,20],()=>{for(let k=0;k<4;k++){g.strokeStyle='#7a6038';g.lineWidth=3.6;g.beginPath();g.ellipse(0,-3-k*2.6,12-k*2.2,4.6-k*.7,0,0,7);g.stroke();g.strokeStyle='#c8a870';g.lineWidth=2.4;g.stroke();g.strokeStyle='rgba(90,66,36,.8)';g.lineWidth=.8;g.setLineDash([2,2]);g.stroke();g.setLineDash([])}g.strokeStyle='#c8a870';g.lineWidth=2.4;g.beginPath();g.moveTo(10,-3);g.quadraticCurveTo(16,0,13,2);g.stroke()})};
/* ---------- หนวดหมึก (ริบบิ้นเรียวลง + ปุ่มดูด) ---------- */
function phvTent(sx,sy,a0,L,w0,curl,amp,ph,T,c1,c2,W,suck){const n=12,ds=L/n,P=[];let x=sx,y=sy,a=a0;
  for(let j=0;j<=n;j++){const u=j/n;P.push([x,y,a,w0*Math.pow(1-u,.85)+1.4]);a=a0+curl*u*u+Math.sin(T*1.7+ph+u*4.2)*amp*u;x+=Math.cos(a)*ds;y+=Math.sin(a)*ds}
  g.beginPath();for(let j=0;j<=n;j++){const[x,y,a,w]=P[j];const nx=Math.cos(a-1.5708)*w/2,ny=Math.sin(a-1.5708)*w/2;j?g.lineTo(x+nx,y+ny):g.moveTo(x+nx,y+ny)}
  {const[x,y,a]=P[n];g.quadraticCurveTo(x+Math.cos(a)*4,y+Math.sin(a)*4,x-Math.cos(a-1.5708)*.7,y-Math.sin(a-1.5708)*.7)}
  for(let j=n;j>=0;j--){const[x,y,a,w]=P[j];g.lineTo(x-Math.cos(a-1.5708)*w/2,y-Math.sin(a-1.5708)*w/2)}g.closePath();
  if(W){g.fillStyle='#fff';g.fill();return P}
  const gr=g.createLinearGradient(sx,sy,P[n][0],P[n][1]);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.fill();g.strokeStyle='rgba(30,14,56,.55)';g.lineWidth=1.1;g.stroke();
  g.strokeStyle='rgba(235,225,255,.28)';g.lineWidth=2;g.beginPath();for(let j=1;j<n-1;j++){const[x,y,a,w]=P[j];const px=x+Math.cos(a-1.5708)*w*.26,py=y+Math.sin(a-1.5708)*w*.26;j>1?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();
  if(suck){for(let j=2;j<n-1;j+=(LOWQ?2:1)){const[x,y,a,w]=P[j];const px=x+Math.cos(a+1.5708)*w*.3,py=y+Math.sin(a+1.5708)*w*.3,r=Math.max(1.2,w*.17);g.fillStyle='#f2dcef';g.beginPath();g.ellipse(px,py,r,r*.8,a,0,7);g.fill();if(!LOWQ&&r>2){g.fillStyle='rgba(120,60,110,.55)';g.beginPath();g.ellipse(px,py,r*.45,r*.36,a,0,7);g.fill()}}}
  return P}
function phvCloudPuffs(L,T,a,W){const CL=phvClouds();g.save();g.globalAlpha=a;for(const[x,y,w,v,sp]of L){const dx=Math.sin(T*sp+v)*6;g.drawImage(CL[v%CL.length],x-w/2+dx,y-w*.26,w,w*.53)}g.restore()}
/* ---------- คราเคนเมฆ (บอส) ---------- */
window.gxKraken=gxKraken=function(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,enr=hf<.5,fy=br-2;g.save();g.translate(0,30);g.scale(1.3,1.3);g.translate(0,-30);
  if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-46+fy,96,enr?'210,120,255':'150,170,255',.12+(enr?.08:0)+cf*.15);g.restore()}
  /* เมฆหลัง */if(!W)phvCloudPuffs([[-92,-18,150,0,.7],[86,-20,160,1,.6],[0,-30,190,2,.5]],T,.92,W);
  const TC=enr?['#5a2e7a','#c47ad0']:['#4a3a86','#a690d8'];
  /* หนวดหลัง 4 เส้น */for(let i=0;i<4;i++){const s=i<2?-1:1,k=i%2,aR=k?-.55-cf*.3:-1.05-cf*.35,cR=k?-2.1:1.6,ph=i*1.7;phvTent(s*(14+k*8),-44+fy,s>0?aR:Math.PI-aR,k?118:136,k?17:19,s*cR,s*.42,ph,T,TC[0],TC[1],W,1)}
  /* หนวดหน้า 4 เส้น (งอกจากใต้หัว ปลายม้วนขึ้น) */for(let i=0;i<4;i++){const s=i<2?-1:1,k=i%2,aR=k?.18:.66,cR=k?-2.4:-1.9,ph=i*1.1+(cf>0?cf*4:0);phvTent(s*(6+k*12),-30+fy,s>0?aR:Math.PI-aR,k?118:98,k?17:18,s*cR,s*.36,ph,T,TC[0],TC[1],W,1)}
  /* ลำตัว (แมนเทิล) */g.save();g.translate(0,-30);g.rotate(Math.sin(T*.9)*.04);g.scale(1,1+br*.012);g.translate(0,30);
  const body=()=>{g.beginPath();g.moveTo(-36,-38+fy);g.bezierCurveTo(-56,-72+fy,-46,-122+fy,-6,-132+fy);g.bezierCurveTo(32,-138+fy,56,-104+fy,44,-64+fy);g.bezierCurveTo(40,-46+fy,32,-34+fy,24,-26+fy);g.quadraticCurveTo(0,-16+fy,-24,-26+fy);g.quadraticCurveTo(-32,-30+fy,-36,-38+fy);g.closePath()};
  body();if(W){g.fillStyle='#fff';g.fill()}else{const bg=g.createRadialGradient(-16,-104+fy,6,-4,-80+fy,92);const C=enr?['#ffd0f4','#c27ad4','#8a3c9e','#3e1652']:['#e4d8ff','#a08ad8','#6a52aa','#2e2062'];bg.addColorStop(0,C[0]);bg.addColorStop(.3,C[1]);bg.addColorStop(.72,C[2]);bg.addColorStop(1,C[3]);g.fillStyle=bg;g.fill();
    g.save();body();g.clip();const R=phvR(4411);
    for(let i=0;i<12;i++){const x=-40+R()*80,y=-128+R()*96;g.fillStyle='rgba(40,16,80,'+(.12+R()*.16)+')';g.beginPath();g.ellipse(x,y+fy,4+R()*9,3+R()*6,R()*3,0,7);g.fill()}
    g.fillStyle='rgba(245,235,255,.35)';for(let i=0;i<18;i++){const x=-40+R()*84,y=-128+R()*100;g.beginPath();g.arc(x,y+fy,.9+R()*1.6,0,7);g.fill()}
    const rf=g.createLinearGradient(48,0,10,0);rf.addColorStop(0,'rgba(150,210,255,.38)');rf.addColorStop(1,'rgba(150,210,255,0)');g.fillStyle=rf;g.fillRect(10,-140+fy,46,120);
    const sh=g.createLinearGradient(0,-40+fy,0,-16+fy);sh.addColorStop(0,'rgba(20,8,40,0)');sh.addColorStop(1,'rgba(20,8,40,.5)');g.fillStyle=sh;g.fillRect(-60,-40+fy,120,26);
    if(enr){g.strokeStyle='rgba(255,140,220,.75)';g.lineWidth=1.4;g.beginPath();g.moveTo(-18,-118+fy);g.lineTo(-8,-100+fy);g.lineTo(-16,-84+fy);g.lineTo(-6,-70+fy);g.moveTo(20,-112+fy);g.lineTo(12,-94+fy);g.lineTo(20,-80+fy);g.stroke()}
    g.restore();body();g.strokeStyle='rgba(24,10,48,.75)';g.lineWidth=1.6;g.stroke();
    /* จุดเรืองแสง */if(!LOWQ){g.save();g.globalCompositeOperation='lighter';for(const[x,y,p]of[[-30,-70,0],[-22,-100,1.3],[6,-122,2.1],[30,-96,.7],[36,-66,2.8],[-38,-50,3.6]]){const a=.35+.35*Math.sin(T*2.4+p);glowAt(x,y+fy,7,enr?'255,120,220':'120,230,255',a);g.fillStyle='rgba(230,255,255,'+(a+.2)+')';g.beginPath();g.arc(x,y+fy,1.4,0,7);g.fill()}g.restore()}
    /* ท่อพ่นน้ำ */g.fillStyle=enr?'#8a3c9e':'#6a52aa';g.beginPath();g.moveTo(40,-50+fy);g.quadraticCurveTo(54,-48+fy,58,-38+fy);g.lineTo(52,-34+fy);g.quadraticCurveTo(46,-40+fy,38,-40+fy);g.closePath();g.fill();g.strokeStyle='rgba(24,10,48,.7)';g.lineWidth=1;g.stroke();
    if(!LOWQ){const p=(T*.5)%1;if(p<.5){const q=p/.5;g.fillStyle='rgba(255,255,255,'+(.55*(1-q))+')';for(let k=0;k<3;k++){g.beginPath();g.arc(60+q*22+k*5,-38-q*14+fy-k*3,3+q*8,0,7);g.fill()}}}}
  /* ตา */const bl=(T%4.3)<.16;for(const s of[-1,1]){const ex=s*24,ey=-46+fy;
    if(!W){const bu=g.createRadialGradient(ex-s*3,ey-6,2,ex,ey,15);bu.addColorStop(0,enr?'#e8a8ec':'#c0b0ec');bu.addColorStop(1,enr?'#7a3290':'#5a46a0');g.fillStyle=bu;g.beginPath();g.ellipse(ex,ey,14,13,0,0,7);g.fill()}
    if(bl){g.strokeStyle=W?'#fff':'#2a1650';g.lineWidth=2.4;g.beginPath();g.moveTo(ex-9,ey);g.quadraticCurveTo(ex,ey+3,ex+9,ey);g.stroke();continue}
    if(W){g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,9.5,9,0,0,7);g.fill();continue}
    const ir=g.createRadialGradient(ex-2,ey-2,1,ex,ey,10);if(enr){ir.addColorStop(0,'#ffe0f6');ir.addColorStop(.35,'#ff6ad0');ir.addColorStop(.85,'#a01a80');ir.addColorStop(1,'#3a0a30')}else{ir.addColorStop(0,'#fff8c0');ir.addColorStop(.35,'#ffd640');ir.addColorStop(.85,'#c07a10');ir.addColorStop(1,'#3a2206')}
    g.fillStyle=ir;g.beginPath();g.ellipse(ex,ey,9.5,9,0,0,7);g.fill();g.strokeStyle='rgba(20,8,30,.85)';g.lineWidth=1.2;g.stroke();
    const pw=cf>0?7:9.5,ph2=cf>0?1.8:3.4;g.fillStyle='#0e0616';g.beginPath();g.roundRect(ex-pw/2,ey-ph2/2,pw,ph2,ph2/2);g.fill();
    g.fillStyle='rgba(255,255,255,.95)';g.beginPath();g.arc(ex-s*3-1,ey-4,2.2,0,7);g.fill();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(ex+s*3,ey+3,1,0,7);g.fill();
    g.strokeStyle=enr?'#5a1a6a':'#3a2878';g.lineWidth=3;g.beginPath();g.arc(ex,ey+3,13,-2.6,-.55);g.stroke();
    if(enr&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(ex,ey,18,'255,90,200',.35+.15*Math.sin(T*6));g.restore()}}
  g.restore();
  /* เมฆหน้า */if(!W)phvCloudPuffs([[-62,14,120,3,.8],[56,16,124,4,.9],[0,22,150,1,.7]],T,.95,W);
  if(!W&&cf>0){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-24+fy,22+cf*24,'220,180,255',.6*cf);g.restore()}
  g.restore()};
/* ---------- มอนภาค 8: หนวดรัดเครื่องดาว · ฉลามเมฆแบบใหม่ ---------- */
window.drawMonCH=drawMonCH=(f=>function(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){const M=typeof MON_CUR!=='undefined'?MON_CUR:null;
  if(M&&M.hdg>=0){/* หนวดคราเคนโผล่ทะลุพื้นไม้ */if(!W){g.fillStyle='rgba(20,10,30,.55)';g.beginPath();g.ellipse(0,r*.7,r*1.15,r*.38,0,0,7);g.fill();g.fillStyle='#6a4a2c';for(let k=0;k<7;k++){const a=k/7*6.283+.3,x=Math.cos(a)*r*1.1,y=r*.7+Math.sin(a)*r*.34;g.save();g.translate(x,y);g.rotate(a+1.2);g.beginPath();g.moveTo(-r*.25,0);g.lineTo(r*.22,-r*.05);g.lineTo(r*.3,-r*.22);g.lineTo(r*.1,-r*.12);g.closePath();g.fill();g.restore()}}
    const TC=['#4a3a86','#b4a0e4'];phvTent(0,r*.75,-1.5708+Math.sin(T*1.3)*.15,r*4.2,r*.95,2.3,.32,M.id||0,T,TC[0],TC[1],W,1);
    if(!W){phvCloudPuffs([[-r*.7,r*.8,r*2.2,2,.9],[r*.8,r*.82,r*2,4,1.1]],T,.85,W)}return true}
  if(t===0){const sv=Math.sin(T*2.4)*r*.08,tl=Math.sin(T*5)*r*.12,yb=-r*.36+sv;
    if(!W){g.fillStyle='rgba(120,140,170,.25)';g.beginPath();g.ellipse(0,r*.06,r*1.4,r*.3,0,0,7);g.fill()}
    /* หาง */g.beginPath();g.moveTo(-r*.8,yb-r*.02);g.quadraticCurveTo(-r*1.1,yb-r*.4+tl,-r*1.32,yb-r*.66+tl);g.quadraticCurveTo(-r*1.18,yb-r*.2+tl*.7,-r*1.12,yb+tl*.6);g.quadraticCurveTo(-r*1.22,yb+r*.26+tl*.5,-r*1.3,yb+r*.4+tl*.5);g.quadraticCurveTo(-r*1.02,yb+r*.22,-r*.8,yb+r*.08);g.closePath();g.fillStyle=W?'#fff':'#557096';g.fill();if(!W){g.strokeStyle='rgba(20,30,50,.6)';g.lineWidth=1;g.stroke()}
    /* ลำตัว */const body=()=>{g.beginPath();g.moveTo(r*1.04,yb+r*.04);g.bezierCurveTo(r*.92,yb-r*.24,r*.34,yb-r*.38,-r*.2,yb-r*.3);g.bezierCurveTo(-r*.5,yb-r*.24,-r*.72,yb-r*.12,-r*.9,yb-r*.04);g.lineTo(-r*.9,yb+r*.06);g.bezierCurveTo(-r*.6,yb+r*.2,-r*.1,yb+r*.34,r*.4,yb+r*.27);g.bezierCurveTo(r*.74,yb+r*.22,r*.98,yb+r*.13,r*1.04,yb+r*.04);g.closePath()};
    /* ครีบหลัง */g.beginPath();g.moveTo(-r*.16,yb-r*.28);g.quadraticCurveTo(-r*.02,yb-r*.62,r*.02,yb-r*.98);g.quadraticCurveTo(r*.12,yb-r*.6,r*.3,yb-r*.33);g.closePath();g.fillStyle=W?'#fff':'#4e6890';g.fill();if(!W){g.strokeStyle='rgba(20,30,50,.6)';g.lineWidth=1;g.stroke()}
    body();if(W){g.fillStyle='#fff';g.fill()}else{const bg=g.createLinearGradient(0,yb-r*.38,0,yb+r*.34);bg.addColorStop(0,'#3e5a86');bg.addColorStop(.42,'#7d96bc');bg.addColorStop(.58,'#d8e2f0');bg.addColorStop(1,'#f6f9fc');g.fillStyle=bg;g.fill();g.strokeStyle='rgba(20,30,50,.6)';g.lineWidth=1.1;g.stroke();
      g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1.6;g.beginPath();g.moveTo(r*.86,yb-r*.16);g.bezierCurveTo(r*.5,yb-r*.32,r*.1,yb-r*.32,-r*.3,yb-r*.24);g.stroke();
      g.fillStyle='rgba(30,44,70,.25)';for(let i=0;i<5;i++){g.beginPath();g.arc(-r*.5+i*r*.22,yb-r*.16+(i%2)*r*.05,r*.03,0,7);g.fill()}
      g.strokeStyle='rgba(30,44,70,.6)';g.lineWidth=1.1;for(let i=0;i<4;i++){const gx=r*(.36+i*.07);g.beginPath();g.moveTo(gx,yb-r*.14);g.quadraticCurveTo(gx-r*.05,yb,gx,yb+r*.13);g.stroke()}
      /* ปาก ฟัน */g.strokeStyle='#2a1a2a';g.lineWidth=1.4;g.beginPath();g.moveTo(r*.96,yb+r*.1);g.quadraticCurveTo(r*.78,yb+r*.2,r*.6,yb+r*.14);g.stroke();g.fillStyle='#fff';for(let i=0;i<5;i++){const x0=r*(.64+i*.065),y0=yb+r*(.15+Math.sin(i*.6)*.02);g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+r*.02,y0+r*.06);g.lineTo(x0+r*.04,y0);g.fill()}}
    /* ครีบอก */g.beginPath();g.moveTo(r*.34,yb+r*.16);g.quadraticCurveTo(r*.12,yb+r*.4+la*.2,-r*.08,yb+r*.56+la*.25);g.quadraticCurveTo(r*.14,yb+r*.36,r*.18,yb+r*.2);g.closePath();g.fillStyle=W?'#fff':'#5a7298';g.fill();
    eye(r*.72,yb-r*.08,r*.06,r*.055,'#ffd84a');if(!W&&!LOWQ){g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,220,90,.28)';g.beginPath();g.arc(r*.72,yb-r*.08,r*.16,0,7);g.fill();g.restore()}
    if(!W){const CL=phvClouds();g.save();g.globalAlpha=.95;g.drawImage(CL[0],-r*1.2,-r*.24,r*1.4,r*.74);g.drawImage(CL[3],r*.04,-r*.2,r*1.3,r*.68);if(!LOWQ)g.drawImage(CL[2],-r*1.7,-r*.12,r*.9,r*.48);g.restore();
      if(!LOWQ){for(let i=0;i<3;i++){const p=(T*.8+i/3)%1;g.fillStyle='rgba(255,255,255,'+(.6*(1-p))+')';g.beginPath();g.arc(-r*1.4-p*r*.6,-r*.1-p*r*.2+i*r*.1,r*.12*(1-p*.5),0,7);g.fill()}}}
    return true}
  return f.apply(this,arguments)})(drawMonCH);
/* ---------- ลานศึกป้องกันท่าเรือ ---------- */
window.hdfPaint=hdfPaint=function(c,ox,oy,S){const X1=ox+S,Y1=oy+S,ins=[[ox,oy],[X1,oy],[ox,Y1],[X1,Y1]].every(([x,y])=>Math.hypot(x-CX,y-CY)<DR+8);if(!ins)phvCloudSea(c,ox,oy,S,3900);
  if(X1<CX-DR-120||ox>CX+DR+120||Y1<CY-DR-120||oy>CY+DR+200)return;const CL=phvClouds();
  /* เงาใต้ลาน + ความหนาของพื้น */c.fillStyle='rgba(70,90,124,.32)';c.beginPath();c.ellipse(CX+14,CY+70,DR+40,DR+16,0,0,7);c.fill();
  /* เสาค้ำ */for(let k=0;k<18;k++){const a=k/18*6.283;if(Math.sin(a)<-.15)continue;const x=CX+Math.cos(a)*(DR+6),y=CY+Math.sin(a)*(DR+6);const pg=c.createLinearGradient(x-8,0,x+8,0);pg.addColorStop(0,'#2a1a0e');pg.addColorStop(.45,'#6a4a2c');pg.addColorStop(1,'#20140a');c.fillStyle=pg;c.fillRect(x-7,y,14,96);c.strokeStyle='rgba(200,170,110,.5)';c.lineWidth=2;c.beginPath();c.moveTo(x-7,y+40);c.lineTo(x+7,y+46);c.moveTo(x-7,y+46);c.lineTo(x+7,y+40);c.stroke();c.globalAlpha=.9;c.drawImage(CL[k%5],x-46,y+70,92,48);c.globalAlpha=1}
  const th=c.createLinearGradient(0,CY,0,CY+DR+40);th.addColorStop(0,'#2a1a0e');th.addColorStop(1,'#4a301a');c.fillStyle=th;c.beginPath();c.arc(CX,CY+22,DR+22,0,7);c.fill();
  /* พื้นไม้ */c.save();const RR=DR+20,cir=()=>{c.beginPath();c.arc(CX,CY,RR,0,7)};cir();c.fillStyle='#7e5838';c.fill();phvPlanksH(c,CX-DR-40,Math.max(oy,CY-DR-30),CX+DR+40,Math.min(Y1,CY+DR+30),3911,16,(y0,y1)=>{const d=Math.max(Math.abs(y0-CY),Math.abs(y1-CY));if(d>=RR)return[0,0];const w=Math.sqrt(RR*RR-d*d);return[CX-w,CX+w]},ox,X1);
    const vg=c.createRadialGradient(CX,CY,DR*.35,CX,CY,RR);vg.addColorStop(0,'rgba(20,10,4,0)');vg.addColorStop(1,'rgba(20,10,4,.38)');c.fillStyle=vg;cir();c.fill();
    palGrid(Math.max(ox,CX-DR),Math.max(oy,CY-DR),Math.min(X1,CX+DR),Math.min(Y1,CY+DR),150,150,1,(x,y,i,j)=>{const h=palH(i,j,3921);if(h<.55)return;const px=x+palH(j,i,3922)*120,py=y+palH(i,j,3923)*120;if(Math.hypot(px-CX,py-CY)>DR-70)return;c.fillStyle='rgba(30,18,8,'+(.06+h*.08)+')';c.beginPath();c.ellipse(px,py,20+h*40,8+h*14,h*3,0,7);c.fill()});
    /* เข็มทิศทองเหลืองฝังพื้น */if(Math.abs(CX-(ox+S/2))<S/2+200&&Math.abs(CY-(oy+S/2))<S/2+200){c.save();c.translate(CX,CY);c.scale(.74,.74);c.globalAlpha=.62;const br=c.createLinearGradient(-130,-130,130,130);br.addColorStop(0,'#f4d888');br.addColorStop(.5,'#b8862e');br.addColorStop(1,'#7a5418');
      c.strokeStyle=br;c.lineWidth=7;c.beginPath();c.arc(0,0,128,0,7);c.stroke();c.lineWidth=2.5;c.beginPath();c.arc(0,0,112,0,7);c.stroke();for(let k=0;k<32;k++){const a=k/32*6.283,l=k%4?6:12;c.lineWidth=k%4?1.4:2.4;c.beginPath();c.moveTo(Math.cos(a)*(112-l),Math.sin(a)*(112-l));c.lineTo(Math.cos(a)*112,Math.sin(a)*112);c.stroke()}
      for(let k=0;k<8;k++){const a=k/8*6.283-1.5708,L=k%2?62:100,w=k%2?12:18;c.save();c.rotate(a+1.5708);c.beginPath();c.moveTo(0,-L);c.lineTo(w,0);c.lineTo(0,0);c.closePath();c.fillStyle=k%2?'#9a6e24':'#e8c066';c.fill();c.beginPath();c.moveTo(0,-L);c.lineTo(-w,0);c.lineTo(0,0);c.closePath();c.fillStyle=k%2?'#6e4a14':'#b8862e';c.fill();c.restore()}
      const hub=c.createRadialGradient(-4,-4,2,0,0,14);hub.addColorStop(0,'#fff0b8');hub.addColorStop(1,'#8a6020');c.fillStyle=hub;c.beginPath();c.arc(0,0,13,0,7);c.fill();c.font='bold 22px serif';c.textAlign='center';c.fillStyle='#e8c066';c.fillText('N',0,-136);c.restore()}
    /* วงซ่อมรอบเครื่องดาว */hdE().forEach(([x,y])=>{const rg=c.createRadialGradient(x,y,80,x,y,112);rg.addColorStop(0,'rgba(255,214,140,0)');rg.addColorStop(1,'rgba(255,214,140,.16)');c.fillStyle=rg;c.beginPath();c.arc(x,y,112,0,7);c.fill();c.strokeStyle='rgba(255,214,140,.6)';c.lineWidth=3;c.setLineDash([12,9]);c.beginPath();c.arc(x,y,110,0,7);c.stroke();c.setLineDash([])});
  c.restore();
  /* ขอบราว */c.strokeStyle='#2a1a0c';c.lineWidth=22;c.beginPath();c.arc(CX,CY,DR+16,0,7);c.stroke();c.strokeStyle='#6a4628';c.lineWidth=14;c.stroke();c.strokeStyle='rgba(255,226,170,.25)';c.lineWidth=3;c.beginPath();c.arc(CX,CY,DR+12,3.3,6.1);c.stroke();
  const tr=c.createLinearGradient(CX-DR,CY-DR,CX+DR,CY+DR);tr.addColorStop(0,'#f0d080');tr.addColorStop(1,'#9a7028');c.strokeStyle=tr;c.lineWidth=3;c.beginPath();c.arc(CX,CY,DR+5,0,7);c.stroke();
  for(let k=0;k<56;k++){const a=k/56*6.283,x=CX+Math.cos(a)*(DR+16),y=CY+Math.sin(a)*(DR+16);const pg=c.createRadialGradient(x-2,y-2,1,x,y,7);pg.addColorStop(0,'#a07a52');pg.addColorStop(1,'#3a2414');c.fillStyle=pg;c.beginPath();c.arc(x,y,6.5,0,7);c.fill()}};
function phvEngArt(){/* ฐานไม้ */const bg=c2=>{const gr=g.createLinearGradient(0,-20,0,4);gr.addColorStop(0,'#7a5634');gr.addColorStop(1,'#3e2814');return gr};g.fillStyle=bg();g.beginPath();g.roundRect(-42,-20,84,24,3);g.fill();g.strokeStyle='#22140a';g.lineWidth=1.4;g.stroke();g.strokeStyle='rgba(30,18,8,.5)';g.lineWidth=1;for(let x=-30;x<42;x+=14){g.beginPath();g.moveTo(x,-19);g.lineTo(x,3);g.stroke()}
  g.fillStyle='#c8a050';for(const x of[-36,36]){g.beginPath();g.arc(x,-14,2,0,7);g.arc(x,-2,2,0,7);g.fill()}
  /* ตัวเครื่องทองเหลือง */const bz=g.createLinearGradient(-32,0,32,0);bz.addColorStop(0,'#6a4612');bz.addColorStop(.3,'#e8c068');bz.addColorStop(.55,'#b8862e');bz.addColorStop(1,'#5a3a0e');g.fillStyle=bz;g.beginPath();g.roundRect(-32,-50,64,32,5);g.fill();g.strokeStyle='#4a2e08';g.lineWidth=1.4;g.stroke();
  g.fillStyle='rgba(255,240,190,.5)';g.fillRect(-28,-48,56,2);g.fillStyle='#5a3a0e';for(let x=-28;x<=28;x+=8){g.beginPath();g.arc(x,-21,1.2,0,7);g.fill()}
  for(const dx of[-19,19]){const dg=g.createRadialGradient(dx-1.5,-35.5,1,dx,-34,8);dg.addColorStop(0,'#fffaf0');dg.addColorStop(1,'#d8ccb0');g.fillStyle='#4a2e08';g.beginPath();g.arc(dx,-34,8.4,0,7);g.fill();g.fillStyle=dg;g.beginPath();g.arc(dx,-34,6.6,0,7);g.fill();g.strokeStyle='#2a1a0e';g.lineWidth=.8;for(let k=0;k<7;k++){const a=2.4+k*.73;g.beginPath();g.moveTo(dx+Math.cos(a)*4.6,-34+Math.sin(a)*4.6);g.lineTo(dx+Math.cos(a)*6,-34+Math.sin(a)*6);g.stroke()}}
  /* ท่อ */g.lineCap='round';for(const s of[-1,1]){g.strokeStyle='#4a2e08';g.lineWidth=6;g.beginPath();g.moveTo(s*30,-26);g.quadraticCurveTo(s*44,-40,s*30,-56);g.stroke();g.strokeStyle='#c89a44';g.lineWidth=3.6;g.stroke();g.strokeStyle='rgba(255,240,190,.5)';g.lineWidth=1;g.stroke()}
  /* ขอบโดม */const rg=g.createLinearGradient(-28,0,28,0);rg.addColorStop(0,'#7a5418');rg.addColorStop(.4,'#f4d888');rg.addColorStop(1,'#6a4612');g.fillStyle=rg;g.beginPath();g.roundRect(-30,-56,60,8,3);g.fill();g.strokeStyle='#4a2e08';g.lineWidth=1;g.stroke();
  g.strokeStyle='#8a6a2a';g.lineWidth=2;for(const rx of[17,7]){g.beginPath();g.ellipse(0,-56,rx,25,0,Math.PI,2*Math.PI);g.stroke()}g.beginPath();g.moveTo(0,-56);g.lineTo(0,-81);g.stroke();g.lineWidth=2.4;g.beginPath();g.arc(0,-56,25,Math.PI,2*Math.PI);g.stroke();
  g.fillStyle=rg;g.beginPath();g.moveTo(-5,-80);g.lineTo(5,-80);g.lineTo(3,-90);g.lineTo(0,-96);g.lineTo(-3,-90);g.closePath();g.fill();g.beginPath();g.arc(0,-98,3,0,7);g.fill()}
PALK.hdeng=function(t,T){const i=t.v,x=t.x,y=t.y,h=HDF.e[i],dead=h<=0,hit=performance.now()-HDF.hit[i]<220,sh=hit?Math.sin(T*90)*2:0,gr=HDF.g===i;PALSH(x,y+8,48,12,.45);g.save();g.translate(sh+(gr?Math.sin(T*40)*1.5:0),0);
  const k=Math.max(0,h)/100,pu=.6+.4*Math.sin(T*(2+3*(1-k)));
  g.beginPath();g.arc(x,y-56,25,Math.PI,0);g.closePath();if(dead){g.fillStyle='rgba(50,48,58,.92)';g.fill()}else{const dg=g.createRadialGradient(x-8,y-70,2,x,y-60,26);dg.addColorStop(0,'rgba(240,250,255,.75)');dg.addColorStop(.5,'rgba(150,210,255,'+(.35+.25*k*pu)+')');dg.addColorStop(1,'rgba(90,140,220,.5)');g.fillStyle=dg;g.fill()}
  if(!dead){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-62,32+10*k,'150,220,255',(.3+.3*k)*pu);glowAt(x,y-62,9,'255,255,255',.9*pu);if(!LOWQ){for(let q=0;q<4;q++){const a=T*2+q*1.57;g.fillStyle='rgba(200,240,255,'+(.6*pu)+')';g.beginPath();g.arc(x+Math.cos(a)*12,y-60+Math.sin(a)*6,1.6,0,7);g.fill()}}g.restore()}
  phSpr('eng',x,y,[-48,-104,96,112],phvEngArt);
  if(!dead){g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.ellipse(x-10,y-68,4,8,-.5,0,7);g.fill()}
  if(dead&&!LOWQ){for(let q=0;q<3;q++){const p=(T*.3+q/3)%1;g.fillStyle='rgba(60,56,52,'+(.35*(1-p))+')';g.beginPath();g.arc(x+p*10,y-70-p*80,8+p*14,0,7);g.fill()}}
  if(k<.5&&!dead){g.strokeStyle='rgba(30,20,10,.85)';g.lineWidth=1.2;g.beginPath();g.moveTo(x-12,y-66);g.lineTo(x-4,y-58);g.lineTo(x-10,y-52);g.moveTo(x+6,y-74);g.lineTo(x+12,y-64);g.stroke()}
  for(const dx of[-19,19]){const a=2.4+(dead?0:k)*4.4;g.strokeStyle='#c8241a';g.lineWidth=1.2;g.beginPath();g.moveTo(x+dx,y-34);g.lineTo(x+dx+Math.cos(a)*5,y-34+Math.sin(a)*5);g.stroke()}
  g.restore();
  const bw=70,by=y-112;g.fillStyle='rgba(20,12,8,.78)';g.beginPath();g.roundRect(x-bw/2-2,by-2,bw+4,9,4);g.fill();g.fillStyle=k>.5?'#7ad04a':k>.25?'#e0b030':'#e04a3a';g.beginPath();g.roundRect(x-bw/2,by,bw*k,5,2.5);g.fill();
  g.font='bold 9px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.85)';const lb=(dead?'💥 ':gr?'🐙 ':'⚙️ ')+'เครื่องดาว '+(i+1)+' · '+Math.ceil(Math.max(0,h))+'%';g.strokeText(lb,x,by-5);g.fillStyle=dead?'#ffb0a0':'#ffe8b0';g.fillText(lb,x,by-5)};
PALK.hdlad=function(t,T){const x=t.x,y=t.y;phSpr('lad',x,y,[-14,-34,28,78],()=>{for(const s of[-9,9]){g.strokeStyle='#5a4220';g.lineWidth=3.4;g.beginPath();g.moveTo(s,-30);g.lineTo(s,40);g.stroke();g.strokeStyle='#c8a870';g.lineWidth=2;g.setLineDash([3,2]);g.stroke();g.setLineDash([])}
  for(let k=-24;k<40;k+=12){const rg=g.createLinearGradient(0,k-2,0,k+2);rg.addColorStop(0,'#a07a4a');rg.addColorStop(1,'#5a3a1e');g.fillStyle=rg;g.fillRect(-10,k-2,20,4);g.fillStyle='#c8a870';g.fillRect(-11,k-2.5,3,5);g.fillRect(8,k-2.5,3,5)}});
  if(HDF.st==='wave'||HDF.st==='boss'){g.save();g.globalCompositeOperation='lighter';glowAt(x,y+10,30,'255,120,90',.15+.1*Math.sin(T*4+t.v));g.restore()}};
