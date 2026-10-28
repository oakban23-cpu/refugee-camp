
/* ---------- v548 ภาค 10 บทที่ 2 «นครรากลึก» (แมพ 44) ----------
   แมพ 44 Lv 160–164 (ธีมมอน 46): ถ้ำใหญ่ใต้แผ่นดิน · ต้นค้ำแผ่นดิน 5 ต้นเป็นเสาค้ำเพดาน เจาะเป็นบ้าน หน้าต่างแสงอำพัน
   ใจกลางนคร (ห้องโถงราก ใต้ต้นค้ำใหญ่ «แม่ไม้» · บ่อยางทอง) ปลอดภัย · ย่านรอบนอกมีฝูงกัดแผ่นดิน · ไม่มีกลางวันกลางคืน
   ลงจากแมพ 43 ทางตะกร้าเถาวัลย์บนยอดไม้ฝั่งตะวันตก (เปิดหลังคุยธุลี) · ขึ้นกลับทางลิฟต์ตะกร้าทางเหนือของถ้ำ
   แบกไหยางทอง: ยืนที่บ่อ 1 วิรับไห → ยืนที่ปากรากของต้นค้ำ 1 วิเท (ล้มระหว่างแบก = ไหแตก) · รางยางทองที่แห้งเรืองขึ้นทีละสาย
   ดันเจี้ยน «ศึกป้องกันต้นค้ำ» (pa2d.js · คุยเฒ่าแก่นไม้) */
const PBC={x:1600,y:1640,r:1300,sy:.92},PBAL={x:1600,y:330,rx:250,ry:170};
const PBT=[[1600,1230,180],[930,960,105],[2290,980,115],[890,2230,110],[2330,2240,120]];/* ต้นค้ำ [x,y,รัศมีโคน] */
const PBTN=['แม่ไม้','ผู้เฝ้า','เสียงระฆัง','ต้นอ่อน','ผู้เหนื่อย'];
const PBM=[[1770,1392],[1010,1040],[2205,1070],[1010,2262],[2200,2272]];/* ปากราก */
const PBW={x:1600,y:1780,r:62},PBHALL={x:1600,y:1520},PBKED={x:1600,y:1490},PBTHU={x:1712,y:1548};
const PBPATH=[[[1600,450],[1440,640],[1330,900],[1320,1180],[1420,1420],[1600,1500]],[[1600,450],[1760,640],[1870,900],[1880,1180],[1780,1420],[1600,1500]],[[1600,1500],[1600,1706]],
  [[1556,1716],[1330,1520],[1130,1250],[1010,1060]],[[1644,1716],[1880,1500],[2080,1250],[2200,1090]],[[1560,1806],[1330,1980],[1140,2170],[1030,2262]],[[1640,1806],[1870,1990],[2070,2170],[2180,2270]]];
const PBPIL=[[990,1420,44],[2230,1440,48],[1480,2440,50],[2090,2540,40],[560,1700,42],[2660,1760,46],[1180,760,36],[2020,780,38]];/* เสาหิน */
const PBTREE=[['🌳 แม่ไม้ · ต้นค้ำใหญ่','«ต้นนี้แบกค่ายของพวกท่านอยู่ ยอดของมันคือยอดไม้ที่พวกท่านเห็นกลางเหว… ข้าเกิดในโพรงชั้นสามของมัน» — ธุลี'],
 ['🌳 ผู้เฝ้า · ต้นค้ำตะวันตก','ป้าใบเฟิร์น: «ข้าเกิดในโพรงของต้นนี้ แม่ข้าก็เกิดที่นี่ ยายข้าก็เกิดที่นี่… เราเฝ้ามันมาสิบรุ่น»'],
 ['🌳 เสียงระฆัง · ต้นค้ำตะวันออก','ลุงตะไคร่ คนเคาะเปลือก: «เวลาลมจากปากเหวพัดผ่านโพรง ต้นนี้ร้องเหมือนระฆัง เราเลยใช้มันบอกเวลาตื่นนอน»'],
 ['🌳 ต้นอ่อน · ต้นค้ำตะวันตกเฉียงใต้','กิ่งก้อย เด็กชายรากลึก: «ต้นนี้อายุน้อยที่สุด ปลูกวันที่ข้าเกิด เราโตมาด้วยกัน… ข้าเลยต้องโตให้แข็งแรงด้วย»'],
 ['🌳 ผู้เหนื่อย · ต้นค้ำตะวันออกเฉียงใต้','ยายรากแก้ว คนรดยาง: «ต้นนี้โดนกัดหนักที่สุด ข้ารดมันทุกเช้า… วันนี้ขาข้าเดินไม่ไหวแล้ว ขอบใจนะหลาน ขอบใจจริง ๆ»']];
const PBZN={lift:['ลานลิฟต์ตะกร้า','ตะกร้าเถาวัลย์หย่อนลงมาจากความมืดเบื้องบน… ข้างบนนั้นคือปากเหวที่เจ้าเพิ่งลงมา'],hall:['ห้องโถงราก','ใต้โคนแม่ไม้ บัลลังก์รากที่คนรากลึกมานั่งฟังเรื่องเล่ามาสามร้อยปี'],
  well:['บ่อยางทอง','ยางทองซึมขึ้นมาวันละนิด… ทุกหยดคือชีวิตของต้นค้ำทั้งห้า'],city:['ใจกลางนครรากลึก','บ้านเจาะในลำต้น หน้าต่างกลม ๆ แสงอำพัน และกลิ่นขนมปังมอสอบ'],
  nw:['ย่านผู้เฝ้า','ต้นค้ำที่เก่าแก่ที่สุด รากของมันพันกันเป็นกำแพงเมือง'],ne:['ย่านเสียงระฆัง','เมื่อลมพัดผ่าน ลำต้นทั้งต้นร้องเป็นเสียงระฆังทุ้มต่ำ'],sw:['ย่านต้นอ่อน','ต้นค้ำที่อายุน้อยที่สุด เด็ก ๆ ปีนเล่นบนรากของมัน'],se:['ย่านผู้เหนื่อย','รอยกัดเต็มลำต้น… ต้นนี้แบกมาหนักที่สุด']};
let PBS={lx:1600,ly:440,carry:0,wt:0,pk:-1,pt:0,fill:{},drop:0},PBN={gr:[],ff:[],sp:[],lamps:[],mush:[]},PBTC={};
function pbR(a){return PBC.r*(1+.055*Math.sin(3*a+.5)+.04*Math.sin(5*a+2)+.028*Math.sin(8*a+1)+.014*Math.sin(13*a))}
function pbCd(x,y){const dx=x-PBC.x,dy=(y-PBC.y)/PBC.sy;return pbR(Math.atan2(dy,dx))-Math.hypot(dx,dy)}
function pbEP(a,d){const R=pbR(a)-d;return[PBC.x+Math.cos(a)*R,PBC.y+Math.sin(a)*R*PBC.sy]}
function pbInAl(x,y,m){const rx=PBAL.rx-(m||0),ry=PBAL.ry-(m||0);if(rx<=0||ry<=0)return false;const a=(x-PBAL.x)/rx,b=(y-PBAL.y)/ry;return a*a+b*b<=1}
function pbIn(x,y,m){m=m||0;if(x<80||y<80||x>3120||y>3120)return false;return pbCd(x,y)>m||pbInAl(x,y,m)}
function pbSafe(x,y){return Math.hypot(x-1600,(y-1570)*1.08)<560||pbInAl(x,y,0)||(y<660&&Math.abs(x-1600)<360)}
const pbSegD=(x,y)=>{let d=1e9;for(const L of PBPATH)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d};
const pbZone=(x,y)=>pbInAl(x,y,0)||y<660?'lift':Math.hypot(x-PBHALL.x,y-PBHALL.y)<180?'hall':Math.hypot(x-PBW.x,y-PBW.y)<160?'well':pbSafe(x,y)?'city':x<1600?(y<1640?'nw':'sw'):(y<1640?'ne':'se');
const gPBk=()=>p6Past('pa2k'),gPBj=()=>p6Past('pa2j');
/* รางยางทอง: จากขอบบ่อไปปากรากแต่ละต้น (โค้งเล็กน้อย) */
const PBCH=PBM.map(([mx,my],i)=>{const a=Math.atan2(my-PBW.y,mx-PBW.x),sx=PBW.x+Math.cos(a)*(PBW.r+8),sy=PBW.y+Math.sin(a)*(PBW.r+8)*.8,nx=-Math.sin(a),ny=Math.cos(a),bd=[0,60,-60,50,-50][i];return[sx,sy,(sx+mx)/2+nx*bd,(sy+my)/2+ny*bd,mx,my]});
const pbQ=(c,u)=>{const[x0,y0,cx,cy,x1,y1]=c,v=1-u;return[v*v*x0+2*v*u*cx+u*u*x1,v*v*y0+2*v*u*cy+u*u*y1]};
const pbFilled=i=>gPBj()||!!(me.sty&&((me.sty.pa2j|0)>>i&1));
/* เส้นใยเห็ดเรืองแสงบนพื้น (โค้งนุ่ม · จาง ๆ · มีปมเรือง) */
function pbThread(c,P,cg){const tr=()=>{c.beginPath();c.moveTo(P[0][0],P[0][1]);for(let k=1;k<P.length-1;k++){const mx=(P[k][0]+P[k+1][0])/2,my=(P[k][1]+P[k+1][1])/2;c.quadraticCurveTo(P[k][0],P[k][1],mx,my)}c.stroke()};
  c.strokeStyle='rgba(110,220,200,.07)';c.lineWidth=3;tr();c.strokeStyle='rgba(170,250,230,.15)';c.lineWidth=.9;tr();for(let k=1;k<P.length;k+=2){cg(P[k][0],P[k][1],6,'150,255,220',.22);c.fillStyle='rgba(210,255,240,.6)';c.fillRect(P[k][0]-.7,P[k][1]-.7,1.4,1.4)}}
/* ---------- พื้นถ้ำ (แคชเป็นแผ่น) ---------- */
function pbPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1,cg=(x,y,r,col,a)=>{if(!inB(x-r,y-r,x+r,y+r))return;const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  /* ผนังหิน (นอกถ้ำ) */c.fillStyle='#16110c';c.fillRect(ox,oy,S,S);
  {const R=gxRng(4710);for(let i=0;i<70;i++){const x=R()*3200,y=R()*3200,r=60+R()*160,v=R();if(!inB(x-r,y-r,x+r,y+r))continue;const gr=c.createRadialGradient(x,y,4,x,y,r);gr.addColorStop(0,v<.5?'rgba(60,48,38,.5)':'rgba(30,24,18,.5)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)}}
  /* พื้นถ้ำ */const N=260,P=[];for(let i=0;i<N;i++){const a=i/N*6.2832;P.push(pbEP(a,(palH(i,7,4711)-.5)*18))}
  const path=()=>{c.beginPath();P.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.moveTo(PBAL.x+PBAL.rx,PBAL.y);c.ellipse(PBAL.x,PBAL.y,PBAL.rx,PBAL.ry,0,0,6.2832)};
  /* ขอบหินยกสูง (เงาตกบนพื้น) */c.save();c.lineJoin='round';c.strokeStyle='#3a2e24';c.lineWidth=60;path();c.stroke();c.strokeStyle='#4e4032';c.lineWidth=30;path();c.stroke();c.restore();
  c.save();path();c.clip('nonzero');
  {const gr=c.createRadialGradient(1600,1500,200,1600,1600,1500);gr.addColorStop(0,'#3e3226');gr.addColorStop(.6,'#2f261d');gr.addColorStop(1,'#231c15');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  for(const[x,y,r,v]of PBN.gr){if(!inB(x-r,y-r,x+r,y+r))continue;const g2=c.createRadialGradient(x,y,4,x,y,r);g2.addColorStop(0,v<.35?'rgba(70,110,50,.35)':v<.7?'rgba(20,14,10,.3)':'rgba(90,72,52,.25)');g2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}
  /* กรวด + หินเล็ก */{const R=gxRng(4712);for(let i=0;i<1400;i++){const x=R()*3200,y=R()*3200,s=1.4+R()*3.6,k=R();if(!inB(x-6,y-6,x+6,y+6))continue;c.fillStyle=k<.6?'rgba(14,10,6,.35)':'rgba(120,100,80,.3)';c.beginPath();c.ellipse(x,y,s,s*.6,0,0,7);c.fill()}}
  /* พรมมอสเรือง + เส้นใยเห็ดเรืองแสง */{const R=gxRng(4713);for(let i=0;i<130;i++){const x=300+R()*2600,y=300+R()*2600,r=24+R()*70,gl=R(),ang=R()*3;if(!inB(x-r,y-r,x+r,y+r))continue;if(pbSegD(x,y)<40)continue;c.fillStyle='rgba(60,110,46,.55)';c.beginPath();c.ellipse(x,y,r,r*.55,ang*.3,0,7);c.fill();c.fillStyle='rgba(100,160,70,.4)';c.beginPath();c.ellipse(x-r*.2,y-r*.12,r*.55,r*.26,0,0,7);c.fill();
      if(gl<.5){for(let k=0;k<5;k++){const px=x+(palH(i,k,4714)-.5)*r*1.4,py=y+(palH(k,i,4715)-.5)*r*.7;cg(px,py,7,'190,255,130',.35);c.fillStyle='rgba(230,255,170,.9)';c.fillRect(px-.8,py-.8,1.6,1.6)}}}
    c.lineCap='round';for(let i=0;i<44;i++){let x=300+R()*2600,y=300+R()*2600;const P2=[[x,y]];for(let k=0;k<6;k++){x+=(R()-.5)*44;y+=(R()-.5)*28;P2.push([x,y])}if(!P2.some(([px,py])=>inB(px-40,py-40,px+40,py+40)))continue;pbThread(c,P2,cg)}}
  /* แอ่งน้ำสะท้อนแสง */for(const[x,y,rx]of[[760,1280,70],[2480,1340,60],[1260,2280,80],[2060,2300,60],[700,2480,50]]){if(!inB(x-rx,y-rx,x+rx,y+rx))continue;c.fillStyle='rgba(10,14,20,.7)';c.beginPath();c.ellipse(x,y,rx,rx*.45,0,0,7);c.fill();c.strokeStyle='rgba(140,200,220,.25)';c.lineWidth=2;c.beginPath();c.ellipse(x,y,rx*.9,rx*.38,0,3.5,5.9);c.stroke();cg(x,y,rx*.8,'120,200,220',.08)}
  /* รากแผ่จากโคนต้นค้ำ */PBT.forEach(([x,y,r],i)=>{if(!inB(x-r*3,y-r*2,x+r*3,y+r*2.4))return;const R=gxRng(4720+i);for(let k=0;k<9;k++){const a=k/9*6.2832+R()*.3,L=r*(1.1+R()*.9),w=r*(.16+R()*.08),sx=x+Math.cos(a)*r*.7,sy=y+Math.sin(a)*r*.5,ex=x+Math.cos(a)*(r+L),ey=y+Math.sin(a)*(r+L)*.62,mx=(sx+ex)/2+(R()-.5)*30,my=(sy+ey)/2+(R()-.5)*20;
      c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=w+6;c.beginPath();c.moveTo(sx,sy+6);c.quadraticCurveTo(mx,my+6,ex,ey+6);c.stroke();for(const[lw,col]of[[w,'#4a3422'],[w*.6,'#6a4c32'],[w*.18,'rgba(200,160,110,.35)']]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(sx,sy);c.quadraticCurveTo(mx,my-w*.1,ex,ey);c.stroke()}
      if(R()<.5){c.fillStyle='rgba(90,150,60,.6)';c.beginPath();c.ellipse(mx,my-w*.3,w*.6,w*.25,0,0,7);c.fill()}}});
  /* ลานห้องโถงราก: ไม้รากปูเป็นวง */if(inB(1350,1350,1850,1690)){c.save();c.translate(PBHALL.x,PBHALL.y);c.scale(1,.62);c.fillStyle='#4a3828';c.beginPath();c.arc(0,0,230,0,7);c.fill();for(let k=0;k<24;k++){const a=k/24*6.2832;c.fillStyle=k%2?'#584330':'#52402c';c.beginPath();c.moveTo(0,0);c.arc(0,0,222,a,a+6.2832/24);c.closePath();c.fill()}
    c.strokeStyle='rgba(20,12,6,.5)';c.lineWidth=3;for(const rr of[70,140,222]){c.beginPath();c.arc(0,0,rr,0,7);c.stroke()}c.strokeStyle='rgba(255,210,140,.2)';c.lineWidth=2;c.beginPath();c.arc(0,0,226,0,7);c.stroke();c.restore();cg(PBHALL.x,PBHALL.y-30,200,'255,190,110',.12)}
  /* ทางเดิน: ในนครปูไม้ราก · นอกนครเป็นดินอัด */for(const L of PBPATH){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[x,y]of L){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y)}if(!inB(x0-60,y0-60,x1+60,y1+60))continue;
    for(const[w,col]of[[42,'rgba(10,6,4,.22)'],[34,'#4e3d2a'],[26,'#5a4630'],[3,'rgba(255,220,160,.07)']]){c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.lineCap='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
    c.strokeStyle='rgba(30,18,10,.28)';c.lineWidth=1.6;for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/dl,ny=(b[0]-a[0])/dl;for(let d=10;d<dl;d+=17){const px=a[0]+(b[0]-a[0])*d/dl,py=a[1]+(b[1]-a[1])*d/dl;if(!pbSafe(px,py))continue;c.beginPath();c.moveTo(px-nx*11,py-ny*11);c.lineTo(px+nx*11,py+ny*11);c.stroke()}}}
  /* รางยางทอง (ร่องแกะ · ยางแห้งเป็นคราบ) */for(const ch of PBCH){const[x0,y0,cx,cy,x1,y1]=ch;if(!inB(Math.min(x0,cx,x1)-40,Math.min(y0,cy,y1)-40,Math.max(x0,cx,x1)+40,Math.max(y0,cy,y1)+40))continue;
    for(const[w,col]of[[22,'#1c140c'],[16,'#3a2a18'],[9,'#5a4020'],[3,'rgba(255,190,90,.22)']]){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(cx,cy,x1,y1);c.stroke()}
    c.fillStyle='rgba(200,140,50,.35)';for(let k=1;k<12;k++){const[px,py]=pbQ(ch,k/12);c.beginPath();c.ellipse(px,py,3,1.6,0,0,7);c.fill()}}
  c.restore();
  /* ขอบหิน: ไฮไลต์ + ก้อนหินที่ขอบ */c.save();c.strokeStyle='rgba(200,170,130,.18)';c.lineWidth=2.4;c.beginPath();P.forEach(([x,y],k)=>k?c.lineTo(x,y-4):c.moveTo(x,y-4));c.closePath();c.stroke();
  {const R=gxRng(4716);for(let i=0;i<220;i++){const a=R()*6.2832,d=-10+R()*34,[x,y]=pbEP(a,d),s=6+R()*16,k=R();if(!inB(x-s,y-s,x+s,y+s))continue;c.fillStyle=k<.5?'#3e3226':'#4c3e30';c.beginPath();c.ellipse(x,y,s,s*.65,0,0,7);c.fill();c.fillStyle='rgba(220,190,150,.16)';c.beginPath();c.ellipse(x-s*.25,y-s*.3,s*.5,s*.22,0,0,7);c.fill()}}
  /* รากห้อยลงมาตามผนัง (มองจากบน: รากพาดผนังลงพื้น) */{const R=gxRng(4717);for(let i=0;i<46;i++){const a=R()*6.2832,[x,y]=pbEP(a,-8),L=40+R()*90,ia=Math.atan2(PBC.y-y,PBC.x-x),w=2+R()*4;if(!inB(x-L,y-L,x+L,y+L))continue;c.strokeStyle='#3a2818';c.lineWidth=w;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+Math.cos(ia)*L*.5+(R()-.5)*20,y+Math.sin(ia)*L*.5,x+Math.cos(ia)*L,y+Math.sin(ia)*L);c.stroke();if(R()<.4)cg(x+Math.cos(ia)*L,y+Math.sin(ia)*L,9,'255,190,90',.4)}}
  c.restore()}
/* ---------- ของประกอบฉาก ---------- */
function pbBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(4747);
  const ok=(x,y,m)=>pbIn(x,y,70+m)&&Math.hypot(x-M.sx,y-M.sy)>M.sr+80+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>130+m)&&pbSegD(x,y)>46+m&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>120+m)
    &&PBT.every(([tx,ty,tr])=>Math.hypot(x-tx,y-ty)>tr*1.8+m)&&PBM.every(([mx,my])=>Math.hypot(x-mx,y-my)>110+m)&&Math.hypot(x-PBW.x,y-PBW.y)>150+m&&Math.hypot(x-PBHALL.x,y-PBHALL.y)>260+m&&PBPIL.every(([px,py,pr])=>Math.hypot(x-px,y-py)>pr+70+m)&&PBCH.every(ch=>{for(let k=0;k<=10;k++){const[px,py]=pbQ(ch,k/10);if(Math.hypot(x-px,y-py)<40+m)return false}return true});
  PBT.forEach(([x,y,r],i)=>trees.push({x,y,r:r*.84,k:'pbtrunk',v:i,ht:600,hw:r*1.1,fw:r*1.2}));
  PBPIL.forEach(([x,y,r],i)=>trees.push({x,y,r,k:'pbpil',v:i,ht:300,hw:r*1.4}));
  trees.push({x:PBW.x,y:PBW.y,r:PBW.r-6,k:'pbwell',ht:40,hw:80});
  trees.push({x:1600,y:1404,r:0,k:'pbthrone',ht:70,ns:1,nc:1});
  PBM.forEach(([x,y],i)=>trees.push({x,y,r:0,k:'pbmouth',v:i,ht:20,ns:1,nc:1}));
  /* บ้านโดมรากในใจกลางนคร */for(const[x,y,v]of[[1330,1650,0],[1870,1660,1],[1300,1910,1],[1900,1910,0],[1430,2090,2],[1770,2090,2]])trees.push({x,y,r:40,k:'pbhut',v,ht:110,hw:66,fw:60});
  /* แผงตลาดใต้ราก */for(const[x,y,v]of[[1480,1880,0],[1720,1880,1]])trees.push({x,y,r:16,k:'pbstall',v,ht:60,hw:40});
  /* โคมเห็ดบนเสา (ตามทางเดิน) */for(const L of PBPATH)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=120;d<dl;d+=300){const t=d/dl,px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t,nx=-(b[1]-a[1])/dl*34,ny=(b[0]-a[0])/dl*34;const x=px+nx,y=py+ny;if(!pbIn(x,y,60)||PBT.some(([tx,ty,tr])=>Math.hypot(x-tx,y-ty)<tr+40)||Math.hypot(x-PBW.x,y-PBW.y)<110||trees.some(t=>t.k==='pblamp'&&Math.hypot(t.x-x,t.y-y)<160))continue;trees.push({x,y,r:0,k:'pblamp',ht:80,ns:1,nc:1,v:(x+y)|0})}}
  /* เห็ดยักษ์เรืองแสง · หินงอก · เห็ดเล็ก */for(let i=0,n=0;i<1600&&n<26;i++){const x=400+R()*2400,y=500+R()*2200;if(!ok(x,y,0))continue;trees.push({x,y,r:14,k:'pbmush',v:(R()*3)|0,sc:.8+R()*.6,ht:120,hw:44});n++}
  for(let i=0,n=0;i<1600&&n<22;i++){const x=400+R()*2400,y=500+R()*2200;if(!ok(x,y,0)||pbSafe(x,y))continue;trees.push({x,y,r:18,k:'pbstag',v:(R()*3)|0,sc:.8+R()*.6,ht:90,hw:30});n++}
  for(let i=0,n=0;i<1600&&n<40;i++){const x=400+R()*2400,y=500+R()*2200;if(!ok(x,y,-40))continue;trees.push({x,y,r:0,k:'pbshroom',v:(R()*4)|0,sc:.7+R()*.6,ht:24,nc:1});n++}
  /* ชาวรากลึกในใจกลางนคร */for(const[x,y,v]of[[1490,1580,0],[1800,1650,1],[1440,1760,2],[1790,1770,3],[1690,1960,4],[1520,1990,5],[1360,1460,3],[1860,1470,0]])trees.push({x,y,r:0,k:'pbfolk',v,ht:40,ns:1,nc:1});
  /* ลิฟต์ตะกร้า + ธุลี (NPC2) */trees.push({x:1600,y:270,r:0,k:'pblift',ht:240,ns:1,nc:1});trees.push({x:PBTHU.x,y:PBTHU.y,r:0,k:'pbthu',ht:60,ns:1,nc:1});
  try{PBT.forEach((_,i)=>pbTrunkSpr(i));PBPIL.forEach((_,i)=>pbPilSpr(i))}catch(e){}
  PBN.lamps=trees.filter(t=>t.k==='pblamp').map(t=>[t.x,t.y]);PBN.mush=trees.filter(t=>t.k==='pbmush').map(t=>[t.x,t.y,t.sc||1,t.v|0]);
  PBN.gr=[];for(let i=0;i<110;i++)PBN.gr.push([300+R()*2600,300+R()*2600,120+R()*240,R()]);
  PBN.ff=[];for(let i=0;i<90;i++){const x=400+R()*2400,y=500+R()*2200;if(pbIn(x,y,40))PBN.ff.push([x,y,R()*6,R()])}
  PBN.sp=[];for(let i=0;i<40;i++)PBN.sp.push([R()*3200,R()*3200,R()*6,R()]);
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc||t.k==='pbtrunk')return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
/* เสาหินปูนจากพื้นถึงเพดาน (แคชสไปรต์) */
function pbPilSpr(i){const key='p'+i;if(PBTC[key])return PBTC[key];const r=PBPIL[i][2],H=320,Wd=Math.ceil(r*3.4),cv=document.createElement('canvas');cv.width=Wd;cv.height=H+40;const c=cv.getContext('2d'),bx=Wd/2,by=H+16,R=gxRng(4830+i),ph=R()*6,ph2=R()*6;
  const w=y=>{const u=-y/H;return r*(1.15-.42*u+.13*Math.sin(u*9+ph)+.08*Math.sin(u*17+ph2)+.42*Math.exp(-((y/26)**2)))};
  const out=()=>{c.beginPath();for(let k=0;k<=32;k++){const y=-k/32*H;c.lineTo(-w(y),y)}for(let k=32;k>=0;k--){const y=-k/32*H;c.lineTo(w(y)*.92,y)}c.closePath()};
  c.translate(bx,by);out();{const gr=c.createLinearGradient(-r*1.4,0,r*1.3,0);gr.addColorStop(0,'#3a3026');gr.addColorStop(.28,'#8a7a64');gr.addColorStop(.46,'#6e604e');gr.addColorStop(.75,'#3e342a');gr.addColorStop(1,'#1e1812');c.fillStyle=gr;c.fill()}
  c.save();out();c.clip();
  for(let k=0;k<10;k++){const y=-10-k*(H/10)-R()*10,d=6*(R()-.5),e=4*(R()-.5);c.strokeStyle='rgba(24,16,10,.4)';c.lineWidth=1.4+R()*1.6;c.beginPath();c.moveTo(-r*1.7,y);c.quadraticCurveTo(0,y+d,r*1.7,y+e);c.stroke();c.strokeStyle='rgba(240,214,170,.14)';c.lineWidth=1;c.beginPath();c.moveTo(-r*1.7,y-2);c.quadraticCurveTo(0,y-2+d,r*1.7,y-2+e);c.stroke()}
  for(let k=0;k<8;k++){const x=(R()-.5)*r*1.4,x2=x+(R()-.5)*8,x3=x+(R()-.5)*6,y3=-R()*50;c.strokeStyle='rgba(220,200,170,.13)';c.lineWidth=2+R()*3;c.beginPath();c.moveTo(x,-H);c.quadraticCurveTo(x2,-H*.5,x3,y3);c.stroke()}
  for(let k=0;k<7;k++){const y=-R()*H*.62,x=(R()-.62)*r,s=6+R()*12;c.fillStyle='rgba(80,140,60,.62)';c.beginPath();c.ellipse(x,y,s,s*.4,0,0,7);c.fill();c.fillStyle='rgba(220,255,160,.7)';c.fillRect(x-1,y-1,2,2)}
  c.restore();
  const cr=[];if(i%3===1)for(let k=0;k<3;k++){const y=-30-R()*110,x=(R()-.5)*r*1.1,s=5+R()*5;cr.push([x,y-s]);c.fillStyle='rgba(150,220,255,.85)';c.beginPath();c.moveTo(x,y-s*2.2);c.lineTo(x+s*.6,y);c.lineTo(x-s*.6,y);c.closePath();c.fill();c.fillStyle='rgba(255,255,255,.8)';c.beginPath();c.moveTo(x-1,y-s*1.8);c.lineTo(x+1.4,y-s*.6);c.lineTo(x-1.4,y-s*.6);c.closePath();c.fill()}
  for(let k=0;k<7;k++){const a=R()*Math.PI,x=Math.cos(a)*r*1.35,y=Math.sin(a)*r*.22+5,s=4+R()*8,v=R();c.fillStyle=v<.5?'#4a3e30':'#5e503e';c.beginPath();c.ellipse(x,y,s,s*.62,0,0,7);c.fill();c.fillStyle='rgba(230,200,160,.16)';c.beginPath();c.ellipse(x-s*.25,y-s*.3,s*.5,s*.2,0,0,7);c.fill()}
  c.globalCompositeOperation='destination-out';{const fg=c.createLinearGradient(0,-H,0,-H*.42);fg.addColorStop(0,'rgba(0,0,0,1)');fg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=fg;c.fillRect(-Wd,-H-20,Wd*2,H*.6)}c.globalCompositeOperation='source-over';
  return PBTC[key]={cv,bx,by,H,cr}}
/* ต้นค้ำ: ลำต้นยักษ์สูงทะลุความมืด เจาะเป็นบ้าน (แคชเป็นสไปรต์ต่อต้น) */
function pbTrunkSpr(i){if(PBTC[i])return PBTC[i];const[, ,r]=PBT[i],H=640,Wd=Math.ceil(r*2.6+60),cv=document.createElement('canvas');cv.width=Wd;cv.height=H+60;const c=cv.getContext('2d'),bx=Wd/2,by=H+20,R=gxRng(4800+i);
  const hw=y=>r*(1+.3*Math.exp(-((y/95)**2)))*(1-.14*(-y/H)),xl=y=>-hw(y),xr=y=>hw(y);
  c.save();c.translate(bx,by);c.beginPath();for(let k=0;k<=24;k++){const y=-k/24*H;c.lineTo(xl(y),y)}for(let k=24;k>=0;k--){const y=-k/24*H;c.lineTo(xr(y),y)}c.closePath();
  const gr=c.createLinearGradient(-r,0,r,0);gr.addColorStop(0,'#24180e');gr.addColorStop(.28,'#5e4430');gr.addColorStop(.45,'#7a5a3c');gr.addColorStop(.75,'#3e2c1c');gr.addColorStop(1,'#1a110a');c.fillStyle=gr;c.fill();c.save();c.clip();
  /* ร่องเปลือก */for(let k=0;k<14;k++){const x0=-r+(k+.5)/14*2*r,ph=R()*6;c.strokeStyle='rgba(20,12,6,.55)';c.lineWidth=2+R()*3;c.beginPath();for(let q=0;q<=30;q++){const y=-q/30*H,x=x0*(1-.12*q/30)+Math.sin(q*.5+ph)*4;q?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.strokeStyle='rgba(220,180,130,.12)';c.lineWidth=1.2;c.beginPath();for(let q=0;q<=30;q++){const y=-q/30*H,x=x0*(1-.12*q/30)+Math.sin(q*.5+ph)*4+3;q?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}
  /* มอส */for(let k=0;k<20;k++){const y=-R()*H*.85,x=(R()-.5)*r*1.6,s=6+R()*16;c.fillStyle='rgba(80,140,60,.6)';c.beginPath();c.ellipse(x,y,s,s*.5,0,0,7);c.fill();c.fillStyle='rgba(220,255,160,.7)';c.fillRect(x-1,y-1,2,2)}
  /* บ้านเจาะในลำต้น: ประตูโค้ง ระเบียง หน้าต่างกลม บันไดเชือก */const nH=i===0?6:3;for(let k=0;k<nH;k++){const y=-60-k*(i===0?76:110)-R()*20,x=(R()-.5)*r*1.1;
    if(k===0||R()<.5){c.fillStyle='#120a04';c.beginPath();c.moveTo(x-11,y);c.lineTo(x-11,y-22);c.arc(x,y-22,11,Math.PI,0);c.lineTo(x+11,y);c.closePath();c.fill();c.fillStyle='rgba(255,190,100,.85)';c.beginPath();c.moveTo(x-8,y);c.lineTo(x-8,y-20);c.arc(x,y-20,8,Math.PI,0);c.lineTo(x+8,y);c.closePath();c.fill();
      c.strokeStyle='#8a6a44';c.lineWidth=2.2;c.beginPath();c.moveTo(x-11,y-22);c.arc(x,y-22,11,Math.PI,0);c.stroke();c.fillStyle='#5a3e26';c.fillRect(x-20,y,40,4);c.strokeStyle='#7a5a3a';c.lineWidth=1.4;for(let q=0;q<5;q++){c.beginPath();c.moveTo(x-18+q*9,y);c.lineTo(x-18+q*9,y-9);c.stroke()}c.beginPath();c.moveTo(x-20,y-9);c.lineTo(x+20,y-9);c.stroke()}
    else{c.fillStyle='#120a04';c.beginPath();c.arc(x,y-14,8,0,7);c.fill();c.fillStyle='rgba(255,200,110,.85)';c.beginPath();c.arc(x,y-14,6,0,7);c.fill();c.strokeStyle='#8a6a44';c.lineWidth=2;c.beginPath();c.arc(x,y-14,8,0,7);c.stroke();c.strokeStyle='rgba(60,30,10,.7)';c.lineWidth=1.2;c.beginPath();c.moveTo(x-6,y-14);c.lineTo(x+6,y-14);c.moveTo(x,y-20);c.lineTo(x,y-8);c.stroke()}
    if(k>0&&R()<.6){const lx=x+(R()<.5?-1:1)*18;c.strokeStyle='rgba(200,170,120,.7)';c.lineWidth=1.2;for(const s of[-4,4]){c.beginPath();c.moveTo(lx+s,y+4);c.lineTo(lx+s,y+70);c.stroke()}for(let q=8;q<70;q+=10){c.beginPath();c.moveTo(lx-4,y+q);c.lineTo(lx+4,y+q);c.stroke()}}}
  /* ประตูใหญ่ที่โคน (ต้นค้ำใหญ่) */if(i===0){c.fillStyle='#0e0804';c.beginPath();c.moveTo(-34,0);c.lineTo(-34,-50);c.arc(0,-50,34,Math.PI,0);c.lineTo(34,0);c.closePath();c.fill();c.fillStyle='rgba(255,180,90,.55)';c.beginPath();c.moveTo(-26,0);c.lineTo(-26,-48);c.arc(0,-48,26,Math.PI,0);c.lineTo(26,0);c.closePath();c.fill();c.strokeStyle='#9a7a4a';c.lineWidth=4;c.beginPath();c.moveTo(-34,-50);c.arc(0,-50,34,Math.PI,0);c.stroke();
    c.strokeStyle='rgba(255,210,140,.5)';c.lineWidth=1.4;for(let q=0;q<5;q++){const a=Math.PI+q/4*Math.PI;c.beginPath();c.moveTo(Math.cos(a)*36,-50+Math.sin(a)*36);c.lineTo(Math.cos(a)*44,-50+Math.sin(a)*44);c.stroke()}}
  /* เส้นยางทองในเนื้อไม้ (เรืองเมื่อได้รดยาง: วาดซ้อนตอนเฟรม) */
  c.restore();
  /* ส่วนบนจางหายในความมืด */c.globalCompositeOperation='destination-out';const fg=c.createLinearGradient(0,-H,0,-H*.55);fg.addColorStop(0,'rgba(0,0,0,1)');fg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=fg;c.fillRect(-Wd,-H-30,Wd*2,H*.5);c.globalCompositeOperation='source-over';
  c.restore();PBTC[i]={cv,bx,by,H,r};return PBTC[i]}
Object.assign(PALK,{
 pbtrunk(t,T){const S=pbTrunkSpr(t.v),x=t.x,y=t.y,r=S.r;let fa=1;if(me.cls&&Math.abs(me.x-x)<r*1.15&&me.y<y-10&&me.y>y-S.H*.7)fa=.42;const a0=g.globalAlpha;fa=Math.min(a0,fa);g.globalAlpha=fa;g.drawImage(S.cv,x-S.bx,y-S.by);
  /* เส้นยางทองวิ่งขึ้นลำต้นเมื่อรดแล้ว + หน้าต่างกะพริบ */const lit=pbFilled(t.v),pu=.6+.4*Math.sin(T*2+t.v);g.save();g.globalCompositeOperation='lighter';if(lit){g.globalAlpha=fa*(.55+.25*pu);g.strokeStyle='rgba(255,190,80,.8)';g.lineWidth=3;for(const s of[-.45,.1,.5]){g.beginPath();for(let q=0;q<=14;q++){const yy=y-q/14*360,xx=x+s*r*(1-q/40)+Math.sin(q*.8+T*1.5+s*4)*5;q?g.lineTo(xx,yy):g.moveTo(xx,yy)}g.stroke()}g.globalAlpha=fa}
  glowAt(x,y-60,r*1.3,'255,180,90',.14*fa);g.restore();g.globalAlpha=a0},
 pbpil(t,T){const S=pbPilSpr(t.v),x=t.x,y=t.y,r=t.r;PALSH(x,y+5,r*1.5,r*.42,.5);const a0=g.globalAlpha,bh=me.cls&&Math.abs(me.x-x)<r*1.35&&me.y<y-8&&me.y>y-S.H*.8;g.globalAlpha=Math.min(a0,bh?.45:1);g.drawImage(S.cv,x-S.bx,y-S.by);
  if(t.v%3===1){g.save();g.globalCompositeOperation='lighter';const pu=.6+.4*Math.sin(T*1.7+t.v);for(const[dx,dy]of S.cr)glowAt(x+dx,y+dy,14,'140,220,255',.32*pu);g.restore()}g.globalAlpha=a0},
 pbwell(t,T){const x=t.x,y=t.y,r=PBW.r,full=gPBj(),n=me.sty?((me.sty.pa2j|0).toString(2).split('1').length-1):0,lv=full?1:.25+n*.12,pu=.6+.4*Math.sin(T*1.8);PALSH(x,y+6,r*1.5,r*.5,.45);
  g.fillStyle='#4a3e30';g.beginPath();g.ellipse(x,y,r*1.25,r*.72,0,0,7);g.fill();g.strokeStyle='#2a2018';g.lineWidth=2;g.stroke();g.fillStyle='#1a120a';g.beginPath();g.ellipse(x,y-2,r,r*.55,0,0,7);g.fill();
  const gr=g.createRadialGradient(x,y-2,4,x,y-2,r);gr.addColorStop(0,'rgba(255,214,120,'+(.6+.3*lv)+')');gr.addColorStop(1,'rgba(200,120,30,'+(.4+.3*lv)+')');g.fillStyle=gr;g.beginPath();g.ellipse(x,y-2+r*.3*(1-lv),r*(.55+.4*lv),r*(.3+.22*lv),0,0,7);g.fill();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-6,r*1.6,'255,190,80',.25+.15*lv*pu);g.restore();
  /* ขอบหินแกะลายราก */for(let k=0;k<16;k++){const a=k/16*6.2832;g.fillStyle=k%2?'#6a5a44':'#5a4a38';g.beginPath();g.ellipse(x+Math.cos(a)*r*1.12,y+Math.sin(a)*r*.64,9,5.4,a,0,7);g.fill()}
  /* ไหรอบบ่อ */for(const[dx,dy]of[[-r*1.5,-6],[r*1.45,-10],[-r*1.3,18]]){g.fillStyle='#8a5a30';g.beginPath();g.ellipse(x+dx,y+dy,7,9,0,0,7);g.fill();g.fillStyle='#a87a4a';g.fillRect(x+dx-4,y+dy-12,8,3);g.fillStyle='rgba(255,210,100,.8)';g.beginPath();g.ellipse(x+dx,y+dy-11,3,1,0,0,7);g.fill()}},
 pbthrone(t,T){const x=t.x,y=t.y;PALSH(x,y+4,60,12,.4);for(const[lw,col]of[[22,'#2a1a0e'],[16,'#6a4c30'],[5,'rgba(220,180,130,.3)']]){g.strokeStyle=col;g.lineWidth=lw;g.lineCap='round';g.beginPath();g.moveTo(x-50,y+2);g.bezierCurveTo(x-56,y-80,x+56,y-80,x+50,y+2);g.stroke()}
  g.fillStyle='#5a4028';g.beginPath();g.ellipse(x,y-4,32,10,0,0,7);g.fill();g.fillStyle='rgba(255,200,120,.75)';for(let k=0;k<9;k++){const u=.12+k*.095,bx=x-50+u*100,by=y-60*Math.sin(u*Math.PI)+2;g.fillRect(bx-1.4,by-1.4,2.8,2.8)}
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-50,60,'255,190,100',.18+.05*Math.sin(T*1.5));g.restore()},
 pbmouth(t,T){const i=t.v,x=t.x,y=t.y,lit=pbFilled(i),pu=.5+.5*Math.sin(T*2.4+i);g.fillStyle='#120a04';g.beginPath();g.ellipse(x,y,26,12,0,0,7);g.fill();g.strokeStyle='#6a4c30';g.lineWidth=5;g.beginPath();g.ellipse(x,y-2,28,13,0,3.3,6.1);g.stroke();
  if(lit){g.fillStyle='rgba(255,190,80,.85)';g.beginPath();g.ellipse(x,y+1,18,7,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y,46,'255,190,80',.3+.15*pu);g.restore()}
  else{const st=stCur(),q=me.sty,act=!!(st&&st.pa2j&&q&&q.a===1);if(act){g.strokeStyle='rgba(255,210,130,'+(.4+.4*pu)+')';g.lineWidth=2;g.setLineDash([8,6]);g.beginPath();g.ellipse(x,y+2,58,22,0,0,7);g.stroke();g.setLineDash([]);
    if(PBS.carry){g.font='15px system-ui';g.textAlign='center';g.fillText('🏺',x,y-34+Math.sin(T*3)*3)}
    if(PBS.pk===i){const p=Math.min(1,PBS.pt/1);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-52,11,0,7);g.stroke();g.strokeStyle='#ffd06a';g.lineWidth=3.4;g.beginPath();g.arc(x,y-52,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}}}
  phLbl('ปากราก «'+PBTN[i]+'»',x,y+28,lit?'#ffd890':'#c8b090')},
 pbhut(t,T){const x=t.x,y=t.y,v=t.v|0,C=[['#6a5038','#4a3828'],['#5e4a34','#3e3022'],['#72583c','#4e3c2a']][v];PALSH(x,y+6,66,16,.45);
  g.fillStyle=C[1];g.beginPath();g.ellipse(x,y,62,20,0,0,7);g.fill();const gr=g.createRadialGradient(x-20,y-60,10,x,y-30,80);gr.addColorStop(0,C[0]);gr.addColorStop(1,C[1]);g.fillStyle=gr;g.beginPath();g.moveTo(x-60,y);g.bezierCurveTo(x-62,y-70,x+62,y-70,x+60,y);g.closePath();g.fill();g.strokeStyle='#20140a';g.lineWidth=1.6;g.stroke();
  g.strokeStyle='rgba(30,18,8,.55)';g.lineWidth=3;for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*58,y-4);g.bezierCurveTo(x+s*50,y-48,x+s*14,y-62,x,y-54);g.stroke()}g.beginPath();g.moveTo(x-40,y-30);g.quadraticCurveTo(x,y-44,x+40,y-30);g.stroke();
  g.fillStyle='rgba(90,150,60,.75)';g.beginPath();g.ellipse(x-6,y-52,26,8,0,0,7);g.fill();g.fillStyle='rgba(220,255,160,.8)';g.fillRect(x-14,y-54,2,2);g.fillRect(x+6,y-56,2,2);
  g.fillStyle='#120a04';g.beginPath();g.moveTo(x-12,y+2);g.lineTo(x-12,y-18);g.arc(x,y-18,12,Math.PI,0);g.lineTo(x+12,y+2);g.closePath();g.fill();const fk=.8+.2*Math.sin(T*5+v);g.fillStyle='rgba(255,190,100,'+(.65*fk)+')';g.beginPath();g.moveTo(x-9,y+2);g.lineTo(x-9,y-17);g.arc(x,y-17,9,Math.PI,0);g.lineTo(x+9,y+2);g.closePath();g.fill();
  g.fillStyle='rgba(255,200,110,.8)';g.beginPath();g.arc(x+32,y-26,5,0,7);g.fill();g.strokeStyle='#4a3020';g.lineWidth=1.4;g.stroke();g.save();g.globalCompositeOperation='lighter';glowAt(x,y-6,40,'255,180,90',.2*fk);g.restore()},
 pbstall(t,T){const x=t.x,y=t.y,v=t.v|0;PALSH(x,y+4,34,8,.4);g.fillStyle='#4a3420';g.fillRect(x-30,y-50,4,50);g.fillRect(x+26,y-50,4,50);g.fillStyle='#6a4c30';g.fillRect(x-32,y-14,64,12);
  g.fillStyle=v?'#5a7a3e':'#8a5a3a';g.beginPath();g.moveTo(x-38,y-46);g.lineTo(x+38,y-46);g.lineTo(x+32,y-60);g.lineTo(x-32,y-60);g.closePath();g.fill();
  if(v===0){for(let k=0;k<4;k++){g.fillStyle='#a8844a';g.beginPath();g.ellipse(x-20+k*13,y-18,5,4,0,0,7);g.fill();g.fillStyle='#7ac060';g.beginPath();g.arc(x-20+k*13,y-21,2.4,0,7);g.fill()}}
  else{for(let k=0;k<3;k++){g.fillStyle='#8a5a30';g.beginPath();g.ellipse(x-16+k*16,y-22,6,8,0,0,7);g.fill();g.fillStyle='rgba(255,200,90,.8)';g.beginPath();g.ellipse(x-16+k*16,y-29,2.6,.8,0,0,7);g.fill()}}},
 pblamp(t,T){const x=t.x,y=t.y,f=.75+.25*Math.sin(T*3+t.v);g.strokeStyle='#3a2a1a';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x-4,y-40,x+2,y-62);g.stroke();
  g.fillStyle='#e8fff8';g.fillRect(x,y-62,3,8);g.fillStyle='rgba(120,240,215,'+(.75+.25*f)+')';g.beginPath();g.moveTo(x-10,y-58);g.quadraticCurveTo(x+2,y-74,x+14,y-58);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.8)';g.fillRect(x-2,y-66,2,2);
  g.save();g.globalCompositeOperation='lighter';glowAt(x+2,y-58,30*f,'120,255,220',.42);glowAt(x+2,y-4,34,'120,255,220',.08);g.restore()},
 pbmush(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,C=[['120,255,220','#7ae8d0','#2aa898'],['190,140,255','#c8a0ff','#7a50c8'],['255,190,110','#ffc880','#c8782a']][v],pu=.65+.35*Math.sin(T*1.4+x);PALSH(x,y+4,30*s,8*s,.4);
  g.fillStyle='#e8e0d0';g.beginPath();g.moveTo(x-7*s,y);g.quadraticCurveTo(x-4*s,y-50*s,x-5*s,y-84*s);g.lineTo(x+5*s,y-84*s);g.quadraticCurveTo(x+4*s,y-50*s,x+7*s,y);g.closePath();g.fill();g.strokeStyle='rgba(120,110,90,.5)';g.lineWidth=1;g.stroke();
  g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(x,y-84*s,30*s,6*s,0,0,7);g.fill();
  const gr=g.createLinearGradient(0,y-120*s,0,y-80*s);gr.addColorStop(0,C[1]);gr.addColorStop(1,C[2]);g.fillStyle=gr;g.beginPath();g.ellipse(x,y-86*s,44*s,12*s,0,0,Math.PI);g.bezierCurveTo(x-44*s,y-120*s,x+44*s,y-120*s,x+44*s,y-86*s);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.55)';for(const[dx,dy,r]of[[-18,-104,5],[6,-110,4],[22,-98,4],[-4,-96,3]]){g.beginPath();g.ellipse(x+dx*s,y+dy*s,r*s,r*.7*s,0,0,7);g.fill()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-96*s,56*s,C[0],.32*pu);glowAt(x,y-6,40*s,C[0],.08*pu);g.restore()},
 pbstag(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x,y+3,22*s,6*s,.4);const gr=g.createLinearGradient(x-14*s,0,x+14*s,0);gr.addColorStop(0,'#2e261e');gr.addColorStop(.45,'#6a5a48');gr.addColorStop(1,'#241c16');g.fillStyle=gr;g.beginPath();g.moveTo(x-18*s,y);g.lineTo(x-6*s,y-56*s);g.lineTo(x,y-76*s);g.lineTo(x+6*s,y-50*s);g.lineTo(x+18*s,y);g.closePath();g.fill();
  if(t.v===1){g.fillStyle='rgba(140,220,255,.6)';g.beginPath();g.moveTo(x+8*s,y-4);g.lineTo(x+13*s,y-30*s);g.lineTo(x+17*s,y-4);g.closePath();g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x+13*s,y-18*s,20*s,'140,220,255',.3);g.restore()}},
 pbshroom(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,C=['120,255,220','255,190,110','190,255,130','255,150,200'][v];for(let k=0;k<3;k++){const dx=(k-1)*7*s,h=(8+k%2*5)*s;g.fillStyle='#e8e0d0';g.fillRect(x+dx-1,y-h,2,h);g.fillStyle='rgba('+C+',.9)';g.beginPath();g.ellipse(x+dx,y-h,5*s,2.6*s,0,Math.PI,0);g.fill()}g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10*s,18*s,C,.3);g.restore()},
 pbfolk(t,T){const f=me.x<t.x?-1:1;try{(PBFW[t.v]||(PBFW[t.v]=typeof npvW==='function'?npvW((x,y,ff,tt)=>pbFolkV(x,y,ff,tt,t.v),null):(x,y,ff,tt)=>pbFolkV(x,y,ff,tt,t.v)))(t.x,t.y,f,T+t.v*.7)}catch(e){}},
 pblift(t,T){const x=t.x,y=t.y,sw=Math.sin(T*.8)*3;g.strokeStyle='rgba(120,90,60,.9)';g.lineWidth=3;for(const s of[-26,26]){g.beginPath();g.moveTo(x+s*.4,y-260);g.lineTo(x+s+sw,y-30);g.stroke()}
  g.fillStyle='#6a4c30';g.beginPath();g.moveTo(x-34+sw,y-32);g.lineTo(x+34+sw,y-32);g.lineTo(x+28+sw,y+4);g.lineTo(x-28+sw,y+4);g.closePath();g.fill();g.strokeStyle='#3a2616';g.lineWidth=1.6;g.stroke();
  g.strokeStyle='rgba(160,120,80,.8)';g.lineWidth=1.4;for(let k=0;k<4;k++){g.beginPath();g.moveTo(x-32+sw,y-26+k*8);g.lineTo(x+32+sw,y-26+k*8);g.stroke()}for(let k=0;k<7;k++){g.beginPath();g.moveTo(x-28+k*9.4+sw,y-32);g.lineTo(x-26+k*8.6+sw,y+4);g.stroke()}
  const fg=g.createLinearGradient(0,y-260,0,y-120);fg.addColorStop(0,'rgba(12,8,6,.95)');fg.addColorStop(1,'rgba(12,8,6,0)');g.fillStyle=fg;g.fillRect(x-60,y-262,120,142)},
 pbthu(t,T){const N=MAPS[44]&&MAPS[44].npc2;if(!N||N.x<0)return;const f=me.x<N.x?-1:1;try{NPC3[43].d(N.x,N.y,f,T)}catch(e){try{thuD0(N.x,N.y,f,T)}catch(e2){}}npvLbl(N.n,N.x,N.y-44,'#c8f0a8');try{npcSay('thu44',N.x,N.y,PBTHUSAY,190,50)}catch(e){}}});
const PBFW={},PBTHUSAY=['นี่บ้านข้าเอง! โพรงชั้นสามของแม่ไม้','ทิลกินขนมมอสไปห้าก้อนแล้ว…','เวลาพูดกับเฒ่าแก่นไม้ต้องพูดช้า ๆ นะ ท่านฟังทีละคำ','ข้าเล่าเรื่องฟ้าให้เด็ก ๆ ฟังทั้งคืนเลย'];
/* ---------- เอฟเฟกต์บนพื้น ---------- */
function pbGroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();
  /* รางยางทองที่รดแล้ว: ยางไหลจากบ่อไปปากราก */g.globalCompositeOperation='lighter';PBCH.forEach((ch,i)=>{if(!pbFilled(i))return;const[x0,y0,cx,cy,x1,y1]=ch;if(!palVis((x0+x1)/2,(y0+y1)/2,Math.hypot(x1-x0,y1-y0)/2+60))return;
    g.strokeStyle='rgba(255,180,60,.5)';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(cx,cy,x1,y1);g.stroke();g.strokeStyle='rgba(255,236,170,.6)';g.lineWidth=2.4;g.stroke();
    const n=Q?6:14;for(let k=0;k<n;k++){const u=((T*.18+k/n)%1),[px,py]=pbQ(ch,u);glowAt(px,py,7,'255,220,140',.6*Math.sin(u*Math.PI))}});
  /* รังกัดแผ่นดิน */(MAPS[44].nests||[]).forEach(([x,y],i)=>{if(!palVis(x,y,90))return;glowAt(x,y+2,38,'200,255,120',.1+.08*Math.sin(T*1.7+i))});
  /* หิ่งห้อย + สปอร์ */for(const[x,y,ph,s]of PBN.ff){if(!palVis(x,y,30))continue;const q=Math.sin(T*1.3+ph);if(q<.2)continue;glowAt(x+Math.sin(T*.6+ph)*20,y-20+Math.cos(T*.8+ph)*12,4,s<.5?'200,255,150':'255,210,140',(q-.2)*.9)}
  /* วงรับไหที่บ่อ */{const st=stCur(),q=me.sty;if(st&&st.pa2j&&q&&q.a===1&&!PBS.carry&&palVis(PBW.x,PBW.y,120)){const pu=.6+.4*Math.sin(T*3);g.strokeStyle='rgba(255,210,130,'+(.5+.3*pu)+')';g.lineWidth=2.4;g.beginPath();g.ellipse(PBW.x,PBW.y+6,96,40,0,0,7);g.stroke();
    if(PBS.wt>0){const p=Math.min(1,PBS.wt/1);g.globalCompositeOperation='source-over';g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(PBW.x,PBW.y-70,12,0,7);g.stroke();g.strokeStyle='#ffd06a';g.lineWidth=3.4;g.beginPath();g.arc(PBW.x,PBW.y-70,12,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}}}
  g.restore()}
/* ไหบนหัวผู้เล่น (วาดทับตัวละคร) */
function pbCarryDraw(){if(curMap!==44||!PBS.carry||!me.cls)return;const T=performance.now()/1000,x=me.x,y=me.y-62+Math.sin(T*6)*1.4;g.save();g.fillStyle='#8a5a30';g.beginPath();g.ellipse(x,y,10,12,0,0,7);g.fill();g.strokeStyle='#3a2414';g.lineWidth=1.4;g.stroke();g.fillStyle='#a87a4a';g.fillRect(x-6,y-16,12,4);
  g.fillStyle='rgba(255,210,100,.9)';g.beginPath();g.ellipse(x,y-14,4.5,1.4,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10,24,'255,190,80',.35+.1*Math.sin(T*4));g.restore();g.restore()}
/* ทับจอ: รากห้อยจากเพดาน (เลื่อนตามกล้อง) · หยดน้ำ · ฝุ่น · ขอบจอมืด */
function pbScreen(T,z,Hs){const Q=LOWQ;g.save();
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.3,SW0/2,Hs/2,Math.max(SW0,Hs)*.78);vg.addColorStop(0,'rgba(8,6,4,0)');vg.addColorStop(1,'rgba(8,6,4,.55)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  const ox=(cam.x*.35)%160;g.strokeStyle='rgba(16,10,6,.85)';g.lineCap='round';for(let i=-1;i<Math.ceil(SW0/160)+2;i++){const R=depRng(((i+Math.floor(cam.x*.35/160))*31+7)>>>0),x=i*160-ox+R()*80,L=30+R()*90,w=2+R()*4,sw=Math.sin(T*.7+i)*4;g.lineWidth=w;g.beginPath();g.moveTo(x,-4);g.quadraticCurveTo(x+sw,L*.5,x+sw*1.6,L);g.stroke();if(R()<.5){g.lineWidth=w*.5;g.beginPath();g.moveTo(x+sw*.8,L*.5);g.quadraticCurveTo(x+12,L*.6,x+16,L*.8);g.stroke()}
    if(R()<.35){g.save();g.globalCompositeOperation='lighter';glowAt(x+sw*1.6,L+2,8,'255,190,90',.5);g.restore()}}
  if(!Q)for(let i=0;i<6;i++){const R=depRng(i*17+3),per=2+R()*3,q=((T+R()*per)%per)/per,x=R()*SW0;if(q<.6){g.fillStyle='rgba(160,210,230,'+(.6*(1-q/.6))+')';g.fillRect(x,q/.6*Hs,1.6,6)}}
  const n=Q?10:24;for(let i=0;i<n;i++){const R=depRng(i*41+11),x=((R()*SW0+T*(3+R()*5))%(SW0+20))-10,y=((R()*Hs+T*(4+R()*5))%(Hs+20))-10,tw=.4+.6*Math.abs(Math.sin(T*(1+R())+i));g.fillStyle='rgba(220,190,150,'+(.25*tw)+')';g.fillRect(x,y,1.4,1.4)}
  g.restore()}
/* ---------- ติ๊ก ---------- */
function pbTick(dt,now,x,y,mv){
  if(pbIn(x,y,4)){PBS.lx=x;PBS.ly=y}else if(!pbIn(x,y,-14)&&me.down<=0){me.x=PBS.lx;me.y=PBS.ly;x=me.x;y=me.y}
  const st=stCur(),q=me.sty;if(!(st&&q&&q.a===1&&st.pa2j)){PBS.wt=0;PBS.pk=-1;PBS.pt=0;return}
  if(me.down>0&&PBS.carry){PBS.carry=0;try{dn.push({x:me.x,y:me.y-60,v:'💥 ไหแตก! กลับไปตักใหม่ที่บ่อ',t:2,col:'#ffb080'})}catch(e){}return}
  if(!PBS.carry){if(Math.hypot(x-PBW.x,(y-PBW.y)*1.2)<100&&me.down<=0){PBS.wt+=dt;if(PBS.wt>=1){PBS.wt=0;PBS.carry=1;try{sfx('coin')}catch(e){}try{dn.push({x:me.x,y:me.y-70,v:'🏺 รับไหยางทอง · ไปเทที่ปากราก',t:1.8,col:'#ffd890'})}catch(e){}}}else PBS.wt=0;return}
  let near=-1;for(let i=0;i<5;i++){if((q.pa2j|0)>>i&1)continue;const[mx,my]=PBM[i];if(Math.hypot(x-mx,y-my)<84)near=i}
  if(near!==PBS.pk){PBS.pk=near;PBS.pt=0}
  if(near>=0&&me.down<=0){PBS.pt+=dt;if(PBS.pt>=1){q.pa2j=(q.pa2j|0)|(1<<near);let n=0;for(let k=0;k<5;k++)if(q.pa2j>>k&1)n++;q.n=n;PBS.carry=0;PBS.pk=-1;PBS.pt=0;
    PALG.card={h:PBTREE[near][0]+' · '+n+'/5',t:PBTREE[near][1],s:now,d:10};try{sfx('quest')}catch(e){}const[mx,my]=PBM[near];try{burst(mx,my-10,['#ffd890','#ffffff','#ffb040'],34,150,1,{glow:1,g:-60})}catch(e){}try{stHud();writeSave()}catch(e){}}}}
/* มอนเดินในถ้ำ (ผีเสื้อบินได้แต่ยังอยู่ในถ้ำ) */
function pbMons(){if(curMap!==44)return;for(const m of mons){if(m.t>=3||m.dum||m.pv||m.wb)continue;const px=m._px,py=m._py;if(px===undefined){m._px=m.x;m._py=m.y;continue}
  if(!pbIn(m.x,m.y,10)){if(pbIn(m.x,py,10))m.y=py;else if(pbIn(px,m.y,10))m.x=px;else if(pbIn(px,py,10)){m.x=px;m.y=py}}m._px=m.x;m._py=m.y}}
function pbAqT(st){const q=me.sty;if(!q||!st.pa2j)return null;const bits=q.pa2j|0,n=bits.toString(2).split('1').length-1;
  if(!PBS.carry||curMap!==44)return{mp:44,act:'reach',x:PBW.x+40,y:PBW.y+70,lb:'ไปตักยางทองที่บ่อกลางนคร ('+n+'/5)'};
  let b=-1,bd=1e9;for(let i=0;i<5;i++){if(bits>>i&1)continue;const[x,y]=PBM[i],d=Math.hypot(me.x-x,me.y-y);if(d<bd){bd=d;b=i}}if(b<0)return null;const[x,y]=PBM[b];return{mp:44,act:'reach',x,y:y+44,lb:'แบกไหไปเทที่ปากราก «'+PBTN[b]+'» ('+n+'/5)'}}
/* ประตูตะกร้าเถาวัลย์ (แมพ 43 ยอดไม้ → 44 · แมพ 44 → ขึ้น) */
function pbGateDraw(G){const T=performance.now()/1000,x=G.x,y=G.y,sw=Math.sin(T*.9)*3;g.save();
  if(G.pa===3){g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(x,y+4,40,14,0,0,7);g.fill();g.fillStyle='#1a120a';g.beginPath();g.ellipse(x,y,30,11,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y,40,'255,190,90',.3+.1*Math.sin(T*2));g.restore();
    for(const s of[-1,1]){g.strokeStyle='#5a3e24';g.lineWidth=4;g.beginPath();g.moveTo(x+s*30,y-6);g.quadraticCurveTo(x+s*24,y-60,x,y-74);g.stroke()}g.fillStyle='#7a5a3a';g.beginPath();g.ellipse(x,y-74,8,5,0,0,7);g.fill();
    g.strokeStyle='rgba(200,170,110,.85)';g.lineWidth=1.6;g.beginPath();g.moveTo(x,y-72);g.lineTo(x+sw,y-24);g.stroke();g.fillStyle='#8a6a44';g.beginPath();g.moveTo(x-14+sw,y-26);g.lineTo(x+14+sw,y-26);g.lineTo(x+11+sw,y-10);g.lineTo(x-11+sw,y-10);g.closePath();g.fill();g.strokeStyle='#3a2616';g.lineWidth=1.2;g.stroke()}
  else{/* ตะกร้าวาดโดย pblift แล้ว: ที่นี่แค่วงแสงบนพื้นให้รู้ว่าขึ้นได้ */const pu=.5+.5*Math.sin(T*2.2);g.strokeStyle='rgba(255,220,150,'+(.35+.25*pu)+')';g.lineWidth=2;g.setLineDash([9,7]);g.beginPath();g.ellipse(x,y+30,54,18,0,0,7);g.stroke();g.setLineDash([])}
  const lb=(G.pa===3?'⬇ ตะกร้าเถาวัลย์: ':'⬆ ขึ้นตะกร้า: ')+(G.nm||MAPS[G.to].n),ly=G.pa===3?y-84:y-62;g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,8,6,.85)';g.strokeText(lb,x,ly);g.fillStyle=G.pa===3?'#ffd8a0':'#e8f0d0';g.fillText(lb,x,ly);g.restore()}
/* ---------- เนื้อเรื่องภาค 10 บทที่ 2 ---------- */
Object.assign(SPK,{ked:['เฒ่าแก่นไม้ · ผู้นำนครรากลึก','🌳','#d8c890'],thu44:SPK.thu});STNPC.ked=[44,'npc'];STNPC.thu44=[44,'npc2'];
STCH.push('ภาค 10 · บทที่ 2 · นครรากลึก');
{const C2=STCH.length-1;STY.push(
 {c:C2,g:'talk',k:'thu',pa2s:1,tx:'คุยธุลีที่ขอบเหว (ปลายสะพานรากด้านเหนือ) · ทางลงนครรากลึก',
  pre:[['thu','(ธุลีนั่งห้อยขาอยู่ริมเหว มองฟ้าไม่วางตา) …ท่านมาแล้ว! ข้าส่งเสียงเคาะลงไปตามรากแล้ว คนข้างล่างรู้ว่าเราจะลงไป'],
   ['thu','เมื่อคืนข้านับจุดขาว ๆ บนฟ้าได้สามร้อยกว่าจุด แล้วก็นับไม่ไหว… ทิลบอกว่ามันชื่อ «ดาว» ข้าจะเอาชื่อนี้ไปบอกทุกคน',0,0,0,0,0,0,0,0,0,1],
   ['thu','เมื่อคืนข้าเห็นทางเดินแสงเงินพาดข้ามฟ้า… ทิลบอกว่าท่านเป็นคนสานมันขึ้นไปเอง จริงเหรอ?',0,0,0,0,0,0,0,0,0,2],
   ['thu','ยอดไม้ฝั่งตะวันตกกลางเหว คือยอดของต้นค้ำที่ชื่อ «ผู้เฝ้า» พวกเราผูกตะกร้าเถาวัลย์ไว้กับลำต้น ลงไปได้ทีละสามคน'],
   ['til43','(ทิลสะพายเป้มาเต็มหลัง) ข้าเอาขนมครกของยายอิ่มมาด้วย! คนข้างล่างต้องไม่เคยกินแน่ ๆ'],
   ['thu','เฒ่าแก่นไม้รออยู่… ท่านบอกว่าถ้าคนข้างบนลงมาจริง ท่านมีเรื่องที่ต้องเล่า ซึ่งไม่เคยเล่าให้ใครฟังมาก่อน']],rw:{g:170000}},
 {c:C2,g:'map',m:44,tx:'ลงตะกร้าเถาวัลย์ไปนครรากลึก (บนยอดไม้กลางเหวฝั่งตะวันตก)',
  post:[['nar','ตะกร้าเถาวัลย์ค่อย ๆ หย่อนลงไปตามลำต้นยักษ์ ผ่านชั้นดิน ชั้นหิน ชั้นรากที่เรืองแสงเป็นจุด ๆ… ลึกจนแสงจากปากเหวเหลือเท่าดาวดวงเดียว'],
   ['nar','แล้วความมืดก็เปิดออก… ถ้ำที่กว้างกว่าทั้งค่าย ต้นค้ำแผ่นดินห้าต้นยืนเป็นเสาค้ำเพดานหิน ลำต้นแต่ละต้นเจาะเป็นบ้าน หน้าต่างกลม ๆ ส่องแสงอำพันอุ่น ๆ'],
   ['nar','มอสเรืองแสงปูพื้นเป็นพรม เห็ดยักษ์ส่องแสงสีเขียวฟ้า คนตัวเล็กผิวลายเปลือกไม้หยุดงานแล้วหันมามอง… ไม่มีใครพูดสักคำ'],
   ['til','(ทิลกระซิบ) …พวกเขามองเราเหมือนที่ธุลีมองฟ้าเลย'],
   ['thu','นี่คือนครรากลึก… บ้านของข้า ห้องโถงรากอยู่ใต้ต้นค้ำใหญ่ตรงกลาง เฒ่าแก่นไม้รออยู่ที่นั่น'],
   ['thu','💡 ใจกลางนคร (ห้องโถงราก · บ่อยางทอง) ปลอดภัย · ย่านรอบนอกมีฝูงกัดแผ่นดินมุดขึ้นมา · ขึ้นกลับได้ทางตะกร้าเถาวัลย์ทางเหนือของถ้ำ']]},
 {c:C2,g:'talk',k:'ked',pa2k:1,tx:'คุยเฒ่าแก่นไม้ที่ห้องโถงราก (ใต้ต้นค้ำใหญ่กลางนคร)',
  pre:[['ked','(ชายชราหลังค่อม ผิวเป็นเปลือกไม้ร่องลึก เคราเป็นมอสยาวถึงพื้น ค่อย ๆ ลืมตาสีอำพัน) …ข้ารอคนข้างบนมาสามร้อยปี ไม่คิดว่าจะมาจริง'],
   ['ked','ข้าจะเล่าสิ่งที่พวกเจ้าลืมไปแล้ว… สามร้อยปีก่อน อาณาจักรอารัณยาตอกหอคอยร้อยชั้นลงบนรากพิภพ เพื่อผนึกเทพไว้ใต้แผ่นดิน'],
   ['ked','คนที่ขุดฐานหอคอยลงมาลึกที่สุด คือบรรพบุรุษของพวกเรา คนงานเหมืองหลายพันคน… วันที่ผนึกเสร็จ ทางขึ้นถูกปิดตาย ไม่มีใครลงมาถามเลยว่าข้างล่างยังมีคนอยู่ไหม'],
   ['me','(…อารัณยาผนึกเทพเพื่อความปลอดภัยของทุกคน แต่ «ทุกคน» ของพวกเขาไม่ได้นับคนข้างล่าง)'],
   ['ked','ผนึกนั้นยังกดอยู่ หอคอยยังปักอยู่ รอยร้าวจากปลายหอจึงลามออกไปทุกปี',1],
   ['ked','เมื่อเทพใต้ผนึกตื่นและจากไป หอคอยก็หยุดกดแผ่นดิน… แต่รอยร้าวที่มันทิ้งไว้ไม่เคยหายไปไหน',2],
   ['ked','บรรพบุรุษของเราปลูกต้นค้ำแผ่นดินลงตรงรอยร้าว รดมันด้วยยางทองที่ซึมขึ้นมาจากหัวใจครึ่งดวงในแกนพิภพ ต้นค้ำดันแผ่นดินไว้ไม่ให้ร่วง… เป็นแบบนี้มาสามร้อยปี'],
   ['ked','จนวันที่ผู้ถือตราคนหนึ่งรวมหัวใจคืนให้เทพ… ยางทองเหลือเพียงที่ค้างอยู่ในรากพิภพ แห้งลงทุกปี',0,1],
   ['ked','จนวันที่ผู้ถือตราคนหนึ่งผนึกหัวใจไว้ใต้แกนพิภพ… ผนึกนั้นปิดทางยางทองไปครึ่งหนึ่ง ยางไหลช้าลงทุกปี',0,2],
   ['me','(…ผู้ถือตราคนนั้นคือข้าเอง)'],
   ['ked','(เฒ่าแก่นไม้ยิ้มบาง ๆ) ข้าไม่ได้โทษเจ้า เจ้าทำสิ่งที่ถูกต้องสำหรับคนที่เจ้ามองเห็น… ข้าเพียงอยากให้เจ้ามองเห็นพวกเราด้วย'],
   ['ked','ใต้เมืองนี้ลงไปอีก ที่ฐานแผ่นดิน มี «ธรณิน» ผู้แบกคนแรก ยักษ์หินที่ยืนแบกทวีปไว้คนเดียวมาตั้งแต่วันที่แผ่นดินร้าว ต้นค้ำทุกต้นช่วยเขาแบก ถ้าต้นค้ำล้ม เขาจะแบกไม่ไหว'],
   ['thu','รางยางทองแห้งหมดแล้ว… พวกเราต้องแบกยางเป็นไหไปรดรากทีละต้น แต่คนแบกน้อยลงทุกปี'],
   ['ked','ถ้าเจ้าจะช่วย ช่วยพวกเราแบกยางทองจากบ่อไปรดปากรากต้นค้ำทั้งห้าก่อน… แล้วข้าจะได้รู้ว่าคนข้างบนแบกเป็นไหม']],rw:{g:170000}},
 {c:C2,g:'clue',m:44,n:5,pa2j:1,tx:'แบกไหยางทองจากบ่อกลางนครไปเทที่ปากรากต้นค้ำทั้ง 5 ต้น (ยืนที่บ่อ 1 วิรับไห · ยืนที่ปากราก 1 วิเท · ล้มระหว่างทาง = ไหแตก)',
  pre:[['thu','บ่อยางทองอยู่ใต้ห้องโถงราก ยางซึมขึ้นมาวันละนิดเดียว ตักได้ทีละไห… ต้นค้ำแต่ละต้นมีปากรากของมัน เทยางลงไปตรงนั้น'],
   ['thu','ระวังด้วยนะ ต้นที่อยู่ย่านรอบนอก ฝูงกัดแผ่นดินชอบดักรออยู่แถวนั้น ถ้าล้ม ไหจะแตก']],
  post:[['nar','ไหสุดท้ายเทลงไป… ยางทองไหลเข้าปากรากช้า ๆ แล้วแสงอำพันก็วิ่งขึ้นไปตามลำต้นทั้งห้า เหมือนเส้นเลือดที่กลับมาเต้น'],
   ['nar','คนรากลึกที่ยืนดูอยู่ห่าง ๆ เริ่มเดินเข้ามาใกล้ทีละคน… เด็กคนหนึ่งยื่นขนมมอสให้ทิล ทิลยื่นขนมครกกลับไป'],
   ['thu','ท่านเห็นไหม! ต้นค้ำสว่างขึ้นแล้ว! …ไม่มีใครเคยแบกไหได้ครบห้าต้นในวันเดียวมาก่อนเลย'],
   ['nar','แต่ไกลออกไปในย่านรอบนอก เสียงกัดแทะดังขึ้นพร้อมกันจากทุกทิศ… กลิ่นยางทองสด ๆ ปลุกฝูงกัดแผ่นดินขึ้นมาทั้งฝูง'],
   ['thu','พวกมันได้กลิ่นยาง! ถ้าปล่อยให้มันถึงราก ยางที่เพิ่งรดจะเสียเปล่า!']],rw:{g:130000}},
 {c:C2,g:'kill',m:44,n:40,tx:'ขับไล่ด้วงยางทอง ผีเสื้อมอสพิษ และหุ่นรากหลงคำสั่งที่บุกย่านรอบนอก',
  post:[['nar','ฝูงสุดท้ายถอยลงรูไป… แต่พื้นทั้งเมืองสั่นขึ้นเบา ๆ จากข้างล่าง'],
   ['thu','(ธุลีแนบหูกับพื้น) …มันไม่ได้หนี มันลงไปรวมกันที่รากแก้วของแม่ไม้ ข้างล่างเมือง!'],['thu','ไปบอกเฒ่าแก่นไม้ เร็ว!']],rw:{g:110000}},
 {c:C2,g:'ptd',k:'ked',pa2d:1,tx:'คุยเฒ่าแก่นไม้ · ลงไปป้องกันรากแก้วของแม่ไม้ (ดันเจี้ยน «ศึกป้องกันต้นค้ำ»)',
  pre:[['ked','รากแก้วสามเส้นของแม่ไม้หยั่งลงไปถึงฐานแผ่นดิน ถ้ามันขาด… แม่ไม้จะเอนลง และค่ายของพวกเจ้าจะทรุดลงไปอีก ไม่ใช่หนึ่งคืบ แต่ทั้งค่าย'],
   ['ked','ข้าได้ยินเสียงมัน… ตัวที่ใหญ่ที่สุดในฝูง ตัวกัดรากยักษ์ มันกัดรากของเรามาสามรุ่นคนแล้ว'],
   ['thu','ข้าจะไปด้วย! ข้ารู้ทางในโพรงราก!'],
   ['ked','(เฒ่าแก่นไม้ยื่นไม้เท้าให้ธุลีถือ) ไปเถิด… พวกเราแบกมาตลอด คืนนี้ให้คนข้างบนช่วยแบกบ้าง']],
  post:[['nar','ตัวกัดรากยักษ์ล้มลงทับกองเศษรากที่มันกัดทิ้งไว้สามร้อยปี… รากแก้วทั้งสามยังอยู่ ยางทองไหลผ่านมันอีกครั้ง'],
   ['thu','(ธุลีกอดรากแก้วไว้แน่น) …ขอบใจนะ ขอบใจจริง ๆ']],rw:{g:200000,s3:12}},
 {c:C2,g:'talk',k:'ked',pa2c:1,tx:'กลับไปหาเฒ่าแก่นไม้ที่ห้องโถงราก',
  pre:[['ked','ข้าได้ยินรากแก้วร้องเพลงอีกครั้ง… สามร้อยปีแล้วที่มันไม่ได้ร้อง'],
   ['ked','แต่เจ้าตัวนั้นไม่ใช่ตัวที่ใหญ่ที่สุด… รอยกัดบนรากแก้วบางรอยใหญ่กว่าปากของมันสามเท่า มีบางอย่างอยู่ลึกกว่านั้น ที่ฐานแผ่นดิน ใกล้ธรณิน'],
   ['thu','(ธุลีกำโคมเห็ดแน่น) ข้าจะไปดูให้รู้… แต่ไม่ใช่คนเดียวแล้ว'],
   ['ked','ผู้ถือตรา… คนข้างบนไม่เคยลงมาถาม แต่เจ้าลงมาแล้ว ข้าจะขอให้เจ้าทำอีกอย่าง — ขึ้นไปถามคนข้างบนทุกเมือง ว่าพวกเขาจะช่วยแบกด้วยกันไหม'],
   ['ked','บอกพวกเขาว่าคนรากลึกไม่ได้ขอให้ใครมาแบกแทน… เราแค่ขอให้ช่วยกันแบก']],
  post:[['nar','🌳 — จบภาค 10 บทที่ 2 · นครรากลึก — บทต่อไป: คำมั่นของทุกเมือง']],rw:{g:180000,s3:12}})}
/* ---------- ลงทะเบียน ---------- */
setTimeout(()=>{try{
    if(MAPS[43])MAPS[43].gates.push({x:1268,y:1700,to:44,req:1,pa2:1,pa:3,nm:'นครรากลึก',arr:{x:1600,y:440}});
    const Mb=MAPS[38];MAPS[44]=Object.assign({},Mb,{n:'นครรากลึก',mth:46,sx:1600,sy:440,sr:110,seed:441,bg:'#16110c',tile:'#3e3226',safe:'#56432e',ring:'#ffd8a0',t1:'#2a2018',t2:'#3e3226',d1:'#56432e',d2:'#ffe0b0',bth:46,fsw:[],
      gates:[{x:1600,y:230,to:43,req:1,pa:4,nm:'ปากเหวแผ่นดินทรุด',arr:{x:1268,y:1640}}],npc:{x:PBKED.x,y:PBKED.y,n:'เฒ่าแก่นไม้ · ผู้นำนครรากลึก',L:22},npc2:{x:PBTHU.x,y:PBTHU.y,n:'ธุลี · เด็กคนรากลึก'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[620,1460],[2620,1480],[700,1980],[2560,1990],[1240,2520],[1960,2580],[1180,640],[2040,660]]});
    FIELDM[44]=1;BTR[46]='255,200,110';GLOWC[44]='255,190,110';FXST[46]='root';BTC[46]=['#f4e8c8','#6a8a3a','#ffffff'];TIER[44]=[91,26,3.44];
    WRG[44]={1:{rg:240,cd:2.2,spd:300,dm:.95,k:'seed',c:'190,255,120'},2:{rg:250,cd:2.6,spd:320,dm:1.2,k:'seed',c:'200,160,110',big:1}}}catch(e){console.warn('pb map',e)}
  try{NPC3[44]={d:kedD0,s:['ข้าฟังรากมาสามร้อยปี… ไม่เคยได้ยินเสียงฝีเท้าคนข้างบนเลย','ยางทองหยดหนึ่ง เลี้ยงต้นค้ำได้หนึ่งคืน','ธุลีดื้อเหมือนแม่ของนาง… และกล้าเหมือนกัน','อย่าเหยียบรากเปล่า ๆ นะ มันรู้สึก'],hy:56};if(typeof npvW==='function')NPC3[44].d=npvW((x,y,f,t)=>kedV(x,y,f,t),kedD0)}catch(e){}
  try{Object.assign(DEPM,{44:'deep'});DEP4.deep={fog:'60,44,30',fa:.14,bd:.2};AMB2.deep=['rgba(255,200,140,.1)','rgba(10,6,4,.5)','255,200,140']}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.pa2j)return pbAqT(st);return _q(st)}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===44&&!pbIn(x,y,12))return false;return _aw(x,y)}}catch(e){}
  try{const _tm=terMons;window.terMons=terMons=function(){const r=_tm.apply(this,arguments);try{pbMons()}catch(e){}return r}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{pbCarryDraw()}catch(e){}_dn()}}catch(e){}
  try{const _pg=paGateDraw;window.paGateDraw=paGateDraw=function(G){if(G.pa===3||G.pa===4)return pbGateDraw(G);return _pg(G)}}catch(e){}
  try{WMN[44]=[26,935,'นครรากลึก','🏮'];WMLV[44]=[160,164]}catch(e){}
  /* สายแร่/สมุนไพรไม่อยู่กลางนคร (ย้ายออกไปย่านรอบนอก) */
  try{const _gb=gtBuild;window.gtBuild=gtBuild=function(){_gb();try{if(curMap!==44||!GTN||!GTN.L)return;const OUT=[[760,1240],[2470,1250],[640,2160],[2560,2210],[1360,2660],[1850,2700],[1290,860],[1910,880],[2750,1650],[470,1900]];
    GTN.L.forEach(n=>{if(!pbSafe(n.x,n.y)&&pbIn(n.x,n.y,40))return;for(const[x,y]of OUT){if(GTN.L.some(o=>o!==n&&Math.hypot(o.x-x,o.y-y)<260))continue;if(trees.some(t=>t.r>0&&Math.hypot(t.x-x,t.y-y)<t.r+30))continue;n.x=x;n.y=y;break}})}catch(e){}}}catch(e){}
  try{NMLR[44]=[[620,1460],[2620,1480],[700,1980],[2560,1990],[1240,2520]]}catch(e){}
  /* ธุลีย้ายลงไปอยู่นครรากลึกหลังลงตะกร้า */
  const THU43B=['ข้าขึ้นมาดูฟ้าทุกเย็นเลยนะ… เฒ่าแก่นไม้อนุญาตแล้ว!','ตะกร้าเถาวัลย์อยู่บนยอดไม้ฝั่งตะวันตก ลงไปนครรากลึกได้เลย','ทิลสอนข้านับดาวได้ถึงร้อยแล้ว','ข้างล่างไม่มีลม… ข้าชอบลมข้างบนนี้'];
  /* ไหแตกเมื่อล้ม · ออกจากแมพแล้วไหหาย */
  setInterval(()=>{try{if(PBS.carry&&(curMap!==44||me.down>0)){PBS.carry=0;PBS.pk=-1;PBS.pt=0;if(curMap===44)dn.push({x:me.x,y:me.y-60,v:'💥 ไหแตก! กลับไปตักใหม่ที่บ่อ',t:2,col:'#ffb080'})}}catch(e){}},200);
  setInterval(()=>{try{const N=MAPS[44]&&MAPS[44].npc2;if(N){if(p6Past('pa2s')){N.x=PBTHU.x;N.y=PBTHU.y}else{N.x=-9999;N.y=-9999}}if(NPC3[43]&&p6Past('pa2s')&&NPC3[43].s!==THU43B)NPC3[43].s=THU43B}catch(e){}},600);
},0);
