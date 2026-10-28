
/* ---------- v547 ภาค 10 · แผ่นดินที่แบกฟ้า (ภาคสุดท้าย) · บทที่ 1 «แผ่นดินทรุด» (แมพ 43 · ปากเหวแผ่นดินทรุด) ----------
   แมพ 43 Lv 156–160: ทุ่งเลี้ยงแพะทางใต้ของค่ายถล่มเป็นเหวยักษ์ · ขอบเหวแตกเป็นขั้นบันได 4 ขั้น · ผนังเหวเป็นชั้นดิน รากห้อย มอสเรือง
   ยอดต้นค้ำแผ่นดิน 3 ยอดดันขึ้นกลางเหว (เดินได้) · สะพานราก 6 เส้นเชื่อมขอบเหวกับยอดไม้ · ลึกลงไปมีลำต้นยักษ์และแสงอำพันของนครรากลึก
   ตกเหวไม่ได้ (ดึงกลับจุดล่าสุด) · มอนเดินบนพื้นเท่านั้น (ค้างคาวบินข้ามได้) · ถนนวงรอบเหวเดินอ้อมได้ทุกจุด
   ดินถล่ม: บนขั้นดินแตก รอยแตกเรืองส้มเตือน 1.25 วิ แล้วพื้นถล่ม (−8% HP) · บนยอดไม้ หินร่วงจากผนังเหว (เตือนแบบเดียวกัน) · ค่ายพักริมเหว (เหนือ) ปลอดภัย
   ที่ค่าย: ทุ่งด้านใต้มีรอยแยกแผ่นดินตั้งแต่เริ่มภาค 10 · ประตูทางลง (บันไดเชือก) เปิดหลังคุยเรนน์
   มอนธีม 45: ตัวกัดหิน · ค้างคาวรากเรือง (พ่นยางอำพัน) · ยักษ์ดินถล่ม (ปาหิน) */
const PAC={x:1600,y:1800,r:800,sy:.78};
const PAK=[{x:1230,y:1640,rx:200,ry:140},{x:1960,y:1960,rx:220,ry:150},{x:1580,y:2200,rx:165,ry:110}];
/* สะพานราก [x0,y0,x1,y1,ครึ่งกว้าง] */
const PAB=[[740,1500,1128,1611,36],[1330,1040,1243,1564,36],[1323,1681,1858,1915,38],[2069,1924,2610,1770,36],[1871,2016,1646,2158,34],[1580,2260,1580,2610,34]];
const PAFP=[[1040,1186],[2330,1518],[754,1980],[1960,2338],[1190,1690]];/* ชาวค่ายที่ติดอยู่ (คนสุดท้ายอยู่บนยอดไม้) */
const PARP=[[1500,1136],[2472,2000],[2010,1990],[1540,2210],[1220,2432]];/* รากเรืองแสง 5 จุด */
const PAREF={x:1600,y:420},PATHU={x:1262,y:1022},PAGATE={x:1270,y:2752};
/* จุดยืนของชาวค่ายหลังช่วยแล้ว (รอบกองไฟค่ายพัก) */
const PAFS=[[1660,402,1],[1806,496,-1],[1640,508,1],[1846,420,-1],[2010,512,1]];
const PAPATH=[[[1600,560],[1540,760],[1420,930],[1330,1040]],[[1660,560],[1860,720],[2200,900],[2470,1180],[2600,1500],[2610,1770]],[[1540,560],[1250,700],[950,880],[780,1180],[740,1500]],
  [[740,1500],[640,1900],[760,2300],[1100,2600],[1580,2610]],[[2610,1770],[2680,2120],[2440,2480],[1980,2640],[1580,2610]]];
const PAFOLK=[['🧺 ยายอิ่ม · คนขายขนมครก','«ข้าไม่ทิ้งกระทะขนมครกหรอก! สามสิบปีข้าหยอดขนมให้คนทั้งค่ายกิน… เอ้า ถือไว้ให้หน่อย เดี๋ยวข้าปีนขึ้นไปเอง»'],
 ['🔨 โจ้ · ลูกช่างไม้','«ข้ากำลังตอกเสาเต็นท์อยู่ตอนดินแยก… ข้าเห็นรากไม้ใต้ดินขยับนะ ขยับเหมือนมันกำลังแบกของหนักมาก ๆ แล้วมือมันลื่น»'],
 ['🦯 ตาทองดี · คนเล่านิทาน','«ปู่ของปู่ข้าเล่าว่า ใต้ค่ายเรามียักษ์ตัวหนึ่งยืนแบกแผ่นดินไว้ทั้งผืน ข้าเล่าให้เด็ก ๆ ฟังมาทั้งชีวิต… นึกว่าเป็นนิทานกล่อมเด็ก»'],
 ['🎐 มีนา · เด็กสาวช่างฟัง','«ข้าได้ยินเสียงเด็กร้องเพลงขึ้นมาจากก้นเหว… เป็นภาษาที่ข้าไม่รู้จัก แต่ทำนองเหมือนเพลงกล่อมที่ยายเมฆาร้องไม่มีผิด»'],
 ['🐐 ลุงเสือ · คนเลี้ยงแพะ','«แพะข้าสามตัวตกลงมาบนยอดไม้ แล้วมันก็… นั่งกินมอสเรืองแสงอย่างมีความสุข ปากเขียวเรืองกันหมด! ใครจะไปทิ้งแพะได้ล่ะ»']];
const PAROOT=[['🌿 ภาพสลักบนราก · ๑ «ผู้แบก»','ยักษ์หินตัวหนึ่งยืนอยู่ใต้แผ่นดิน สองแขนชูขึ้นเหนือหัว แบกทั้งทวีปไว้ คนตัวเล็ก ๆ นับร้อยยืนเรียงอยู่บนไหล่ของมัน คอยรดน้ำให้รากที่พันแขนยักษ์ไว้ไม่ให้หลุด'],
 ['🌿 ภาพสลักบนราก · ๒ «หอคอยที่ปักลงมา»','หอคอยสูงร้อยชั้นถูกตอกลงมาจากข้างบน ปลายแหลมทะลุลงไปถึงรากพิภพ รอยร้าวแตกออกเป็นใยแมงมุมทั่วทั้งภาพ… ใต้ภาพมีรอยมือเล็ก ๆ ประทับไว้นับไม่ถ้วน'],
 ['🌿 ภาพสลักบนราก · ๓ «ต้นค้ำแผ่นดิน»','คนรากลึกปลูกต้นไม้ต้นแรกลงตรงรอยร้าว รากของมันหยั่งลงไปหาแสงทองที่อยู่ลึกที่สุด ส่วนยอดของมันดันแผ่นดินที่กำลังจะร่วงเอาไว้… รอบต้นไม้มีคนตัวเล็ก ๆ จับมือกันเป็นวง'],
 ['🌿 ภาพสลักบนราก · ๔ «ยางทองที่ไหลช้าลง»','แม่น้ำสีทองใต้แผ่นดิน… ในภาพแรก ๆ มันกว้างเท่าแม่น้ำ ภาพถัดมาเหลือเท่าลำธาร ภาพล่าสุดรอยสลักยังใหม่อยู่เลย เหลือแค่เส้นบาง ๆ เท่าเส้นผม'],
 ['🌿 ภาพสลักบนราก · ๕ «ข้างบนนั้นมีอะไร»','ภาพสุดท้ายสลักหยาบ ๆ เหมือนฝีมือเด็ก… เด็กหญิงตัวเล็กถือโคมเห็ด กำลังปีนรากขึ้นไปหาวงกลมสีขาวที่อยู่บนสุดของภาพ ข้าง ๆ วงกลมมีรอยขีดเป็นเครื่องหมายคำถาม']];
const PAZN={refuge:['ค่ายพักริมเหว','ยามของค่ายตอกหมุดขึงเชือกไว้ทุกห้าก้าว… ใครข้ามเชือกต้องมีเหตุผลที่ดีพอ'],rim:['ขั้นดินแตก','แผ่นดินแตกเป็นขั้นบันไดยักษ์ไล่ลงไปในความมืด ทุกก้าวมีเสียงดินร่วนไหลลงเหว'],
  meadow:['ทุ่งเลี้ยงแพะเก่า','ทุ่งที่เคยมีเสียงกระดิ่งแพะ… เหลือแต่รั้วล้มกับรอยกีบที่หนีไปทางเดียวกันหมด'],crown:['ยอดต้นค้ำแผ่นดิน','ใต้เท้าไม่ใช่ดิน แต่เป็นกิ่งไม้สานกันแน่นเท่าพื้นบ้าน มอสเรืองแสงอุ่น ๆ เหมือนมีลมหายใจ'],
  root:['สะพานราก','รากหนาเท่าลำเรือพาดข้ามเหว เปลือกของมันอุ่นเหมือนผิวสัตว์ที่กำลังหลับ'],south:['ฝั่งใต้ของเหว','อีกฟากของเหว… แผ่นดินที่ยังไม่มีใครกล้าข้ามมาตั้งแต่คืนนั้น']};
let PAS={lx:1600,ly:330,mt:4,warn:[],hole:[],fl:0,rp:-1,rt:0,lp:-1,lt:0,run:{},gl:{},hk:0,hd:0},PAN={gr:[],cl:[],sp:[],ff:[],fl:[]};
/* ---------- รูปทรง ---------- */
function paR(a){return PAC.r*(1+.07*Math.sin(3*a+1.3)+.045*Math.sin(5*a+.4)+.028*Math.sin(9*a+2.2)+.016*Math.sin(15*a+.7))}
function paCd(x,y){const dx=x-PAC.x,dy=(y-PAC.y)/PAC.sy;return Math.hypot(dx,dy)-paR(Math.atan2(dy,dx))}
function paEP(a,d){const R=paR(a)+d;return[PAC.x+Math.cos(a)*R,PAC.y+Math.sin(a)*R*PAC.sy]}
const paSegT=(x,y,s)=>{const dx=s[2]-s[0],dy=s[3]-s[1],L2=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((x-s[0])*dx+(y-s[1])*dy)/L2));return[t,Math.hypot(x-s[0]-dx*t,y-s[1]-dy*t)]};
function paInK(K,x,y,m){const rx=K.rx-m,ry=K.ry-m;if(rx<=0||ry<=0)return false;const a=(x-K.x)/rx,b=(y-K.y)/ry;return a*a+b*b<=1}
function paK(x,y,m){for(let i=0;i<PAK.length;i++)if(paInK(PAK[i],x,y,m||0))return i;return -1}
function paOnB(x,y,m){for(let i=0;i<PAB.length;i++){const b=PAB[i],[,d]=paSegT(x,y,b);if(d<b[4]-(m||0))return i}return -1}
function paLand(x,y,m){m=m||0;return x>=90+m&&y>=90+m&&x<=3110-m&&y<=3110-m&&paCd(x,y)>m}
function paIn(x,y,m){m=m||0;if(x<90||y<90||x>3110||y>3110)return false;return paCd(x,y)>m||paK(x,y,m)>=0||paOnB(x,y,m)>=0}
function paSafe(x,y){return y<612||Math.hypot(x-1600,y-330)<260}
function paRim(x,y,w){const c=paCd(x,y);return c>0&&c<(w||270)}
const paSegD=(x,y)=>{let d=1e9;for(const L of PAPATH)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d};
const paZone=(x,y)=>paSafe(x,y)?'refuge':(paOnB(x,y,0)>=0&&paCd(x,y)<0)?'root':paK(x,y,0)>=0?'crown':paRim(x,y,270)?'rim':y>2350?'south':'meadow';
const gPAs1=()=>p6Past('pas1'),gPAon=()=>p6From('pas1');
/* ขอบเหว/ขั้นดิน (แคชจุด) */
const PACT={};
function paCont(d,n,j){const k=d+'|'+n+'|'+(j||0);if(PACT[k])return PACT[k];const P=[];for(let i=0;i<n;i++){const a=i/n*6.2832,jj=j?(palH(i,(d|0)+50,4300)-.5)*j:0;P.push(paEP(a,d+jj))}PACT[k]=P;return P}
function paPoly(c,P,dy){c.beginPath();c.moveTo(P[0][0],P[0][1]+(dy||0));for(let i=1;i<P.length;i++)c.lineTo(P[i][0],P[i][1]+(dy||0));c.closePath()}
/* ---------- พื้น (แคชเป็นแผ่น) ---------- */
function paPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1;
  const bg=c.createLinearGradient(0,0,0,3200);bg.addColorStop(0,'#6a8648');bg.addColorStop(.5,'#728450');bg.addColorStop(1,'#65774a');c.fillStyle=bg;c.fillRect(ox,oy,S,S);
  for(const[x,y,r,v]of PAN.gr){if(!inB(x-r,y-r,x+r,y+r))continue;const g2=c.createRadialGradient(x,y,4,x,y,r);g2.addColorStop(0,v<.4?'rgba(150,170,90,.24)':v<.75?'rgba(66,86,46,.22)':'rgba(146,116,72,.22)');g2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}
  /* ลานค่ายพัก: ดินถูกเหยียบจนเตียน */
  if(inB(900,0,2400,720)){const g3=c.createRadialGradient(1640,400,40,1640,400,640);g3.addColorStop(0,'rgba(152,124,84,.62)');g3.addColorStop(.7,'rgba(140,112,74,.3)');g3.addColorStop(1,'rgba(140,112,74,0)');c.fillStyle=g3;c.beginPath();c.ellipse(1640,400,680,320,0,0,7);c.fill()}
  /* ลานค่ายพัก: ฟางกระจาย รอยเท้า หมุดเต็นท์ */
  if(inB(980,120,2300,700)){const R=gxRng(4325);for(let i=0;i<260;i++){const x=1000+R()*1280,y=150+R()*520,k=R(),a=R()*3.14,l=4+R()*6,c1=R(),s1=R(),s2=R();if(!inB(x-10,y-10,x+10,y+10))continue;if(Math.hypot((x-1640)/680,(y-400)/320)>1)continue;
    if(k<.55){c.strokeStyle=c1<.5?'rgba(220,196,120,.55)':'rgba(190,160,90,.5)';c.lineWidth=1.2;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l*.5);c.stroke()}
    else if(k<.85){c.fillStyle='rgba(80,60,36,.28)';c.beginPath();c.ellipse(x,y,2.4,1.4,a,0,7);c.ellipse(x+5,y+2,2.4,1.4,a,0,7);c.fill()}else{c.fillStyle='rgba(120,100,70,.5)';c.beginPath();c.ellipse(x,y,2+s1*3,1.2+s2*2,0,0,7);c.fill()}}}
  /* ทางเดินดิน */
  for(const L of PAPATH){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[x,y]of L){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y)}if(!inB(x0-60,y0-60,x1+60,y1+60))continue;
    for(const[w,col]of[[54,'rgba(60,46,30,.2)'],[40,'#8c7858'],[30,'#9c8866'],[8,'rgba(255,240,210,.14)']]){c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.lineCap='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
    c.fillStyle='rgba(70,54,36,.3)';for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=0;d<dl;d+=34){const t=d/dl,h=palH(i*31,d|0,4320);c.beginPath();c.ellipse(a[0]+(b[0]-a[0])*t+(h-.5)*22,a[1]+(b[1]-a[1])*t+(palH(d|0,i,4321)-.5)*14,2+h*3,1.4+h*2,0,0,7);c.fill()}}}
  /* หญ้าเป็นกอ */
  c.lineCap='round';palGrid(ox,oy,X1,Y1,30,24,1,(x,y,i,j)=>{const h=palH(i,j,4311);if(h<.42)return;const px=x+palH(j,i,4312)*26,py=y+palH(i,j,4313)*20;if(paCd(px,py)<300||paSegD(px,py)<30||(py<660&&Math.abs(px-1640)<660))return;
    const n=3+((h*4)|0),L=6+h*8;for(let k=0;k<n;k++){const bx=px+(k-n/2)*2.2;c.strokeStyle=k%2?'rgba(156,162,92,.75)':'rgba(112,132,70,.8)';c.lineWidth=1.5;c.beginPath();c.moveTo(bx,py);c.quadraticCurveTo(bx+(k-n/2)*.6,py-L*.6,bx+(k-n/2)*1.4,py-L);c.stroke()}
    if(h>.94){c.fillStyle=palH(i,j,4314)>.5?'#f2e2a0':'#e8b8c8';c.beginPath();c.arc(px,py-L,1.8,0,7);c.fill()}});
  if(inB(PAC.x-1250,PAC.y-1050,PAC.x+1250,PAC.y+1100))paChasm(c,ox,oy,S)}
const PAST=[[275,'#8a7a58','#584a32',18],[195,'#7c6a4a','#4c3e2a',20],[118,'#6c5a3e','#40321f',22],[46,'#5c4a32','#342818',24]];
function paChasm(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1,cg=(x,y,r,col,a)=>{if(!inB(x-r,y-r,x+r,y+r))return;const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  c.save();c.lineJoin='round';c.lineCap='round';
  /* 1) ขั้นดินแตก: ขอบนอกเกลี่ยเข้ากับหญ้า แล้วไล่ขั้นเข้าใน (หน้าขั้นเห็นเฉพาะฝั่งที่หันหาจอ) */
  {const P0=paCont(PAST[0][0],240,26);c.globalAlpha=.55;c.strokeStyle=PAST[0][1];c.lineWidth=34;paPoly(c,P0);c.stroke();c.globalAlpha=1;c.fillStyle=PAST[0][1];paPoly(c,P0);c.fill()}
  for(let k=1;k<PAST.length;k++){const P=paCont(PAST[k][0],240,k===3?14:20),hf=PAST[k][3];c.fillStyle=PAST[k-1][2];paPoly(c,P);c.fill();
    c.save();paPoly(c,P);c.clip();/* ลายหน้าขั้น: เส้นดินแนวดิ่ง */c.strokeStyle='rgba(20,12,6,.22)';c.lineWidth=1.2;for(let q=0;q<P.length;q+=2){const[px,py]=P[q];c.beginPath();c.moveTo(px,py);c.lineTo(px+(palH(q,k,4333)-.5)*3,py+hf);c.stroke()}
    c.fillStyle=PAST[k][1];paPoly(c,P,hf);c.fill();c.restore();
    c.strokeStyle='rgba(255,236,190,.24)';c.lineWidth=2.2;paPoly(c,P,-1);c.stroke()}
  /* ลายดินบนขั้น: กรวด ก้อนดิน รอยแตก */
  {const R=gxRng(4330);for(let i=0;i<520;i++){const a=R()*6.2832,d=8+R()*262,[x,y]=paEP(a,d);if(!inB(x-10,y-10,x+10,y+10)){R();R();continue}const s=1.6+R()*3.6;c.fillStyle=R()<.5?'rgba(40,28,16,.32)':'rgba(190,160,110,.3)';c.beginPath();c.ellipse(x,y,s,s*.6,0,0,7);c.fill()}
    for(let i=0;i<46;i++){const a=R()*6.2832;let d=4+R()*20,[x,y]=paEP(a,d);const P=[[x,y]];for(let q=0;q<6;q++){d+=16+R()*24;const[bx,by]=paEP(a,d),j=(R()-.5)*44,nx2=-Math.sin(a),ny2=Math.cos(a);x=bx+nx2*j;y=by+ny2*j*.8;P.push([x,y])}
      if(!P.some(([px,py])=>inB(px-20,py-20,px+20,py+20)))continue;for(const[lw,st]of[[3.6,'rgba(30,20,12,.55)'],[1.2,'rgba(210,180,130,.25)']]){c.strokeStyle=st;c.lineWidth=lw;c.beginPath();P.forEach(([px,py],q)=>q?c.lineTo(px,py):c.moveTo(px,py));c.stroke()}}}
  /* 2) เหว: ผนังชั้นดิน (ฝั่งเหนือ) → ห้วงลึก */
  const E0=paCont(0,260,8),WALL=232;
  c.save();paPoly(c,E0);c.clip();
  c.fillStyle='#5a4230';c.fillRect(PAC.x-1000,PAC.y-800,2000,1600);
  {const SC=['#6e5236','#5a4028','#7a5c3c','#4a3420','#68503a','#3e2c1c','#5e4630','#322416','#4a3624','#2a1c12'];for(let k=0;k<SC.length;k++){c.strokeStyle=SC[k];c.lineWidth=24;paPoly(c,E0,14+k*22);c.stroke()}
    /* จุดแร่ + หินในผนัง */const R=gxRng(4340);for(let i=0;i<150;i++){const a=Math.PI+.15+R()*(Math.PI-.3),[x,y]=paEP(a,-6),yy=y+12+R()*200,cl=R(),jx=(R()-.5)*20,rx=2+R()*4,ry=1.5+R()*2.5;if(!inB(x-12,yy-12,x+12,yy+12))continue;c.fillStyle=cl<.7?'rgba(30,20,12,.4)':'rgba(220,180,120,.35)';c.beginPath();c.ellipse(x+jx,yy,rx,ry,0,0,7);c.fill()}
    /* มอสเรืองบนผนัง */for(let i=0;i<60;i++){const a=Math.PI+.2+R()*(Math.PI-.4),[x,y]=paEP(a,-4),yy=y+8+R()*90,al=.4+R()*.3,rx=6+R()*10,ry=3+R()*4,gw=R()<.45;if(!inB(x-30,yy-30,x+30,yy+30))continue;c.fillStyle='rgba(90,150,60,'+al+')';c.beginPath();c.ellipse(x,yy,rx,ry,0,0,7);c.fill();if(gw)cg(x,yy,10,'190,255,120',.35)}
    /* รากห้อยจากขอบเหว */for(let i=0;i<70;i++){const a=Math.PI+.12+i/70*(Math.PI-.24)+(R()-.5)*.03,[x,y]=paEP(a,-2),L=40+R()*190,sw=(R()-.5)*40,w=1.4+R()*3.2,br2=R()<.4,tip=R()<.3;if(!inB(x-60,y-10,x+60,y+L+20))continue;
      c.strokeStyle='rgba(40,26,16,.9)';c.lineWidth=w+1.4;c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x+sw*.3,y+L*.35,x+sw,y+L*.65,x+sw*.6,y+L);c.stroke();c.strokeStyle='rgba(120,88,56,.85)';c.lineWidth=w;c.stroke();
      if(br2){c.strokeStyle='rgba(40,26,16,.8)';c.lineWidth=w*.5;c.beginPath();c.moveTo(x+sw*.4,y+L*.45);c.quadraticCurveTo(x+sw*.4+12,y+L*.5,x+sw*.4+16,y+L*.7);c.stroke()}
      if(tip)cg(x+sw*.6,y+L,7,'255,190,90',.5)}}
  /* ห้วงลึก */
  c.save();paPoly(c,E0,WALL);c.clip();
  {const gr=c.createLinearGradient(0,PAC.y-500,0,PAC.y+700);gr.addColorStop(0,'#2a1c12');gr.addColorStop(.45,'#1a110a');gr.addColorStop(1,'#0c0805');c.fillStyle=gr;c.fillRect(PAC.x-1000,PAC.y-800,2000,1700);
    /* หมอกชั้นลึก */for(const[x,y,rx,ry,a]of[[1400,1700,520,90,.12],[1900,2050,480,80,.1],[1600,2200,600,70,.09],[1250,2150,380,60,.08]]){if(!inB(x-rx,y-ry,x+rx,y+ry))continue;const gr2=c.createRadialGradient(x,y,10,x,y,rx);gr2.addColorStop(0,'rgba(170,130,90,'+a+')');gr2.addColorStop(1,'rgba(170,130,90,0)');c.save();c.translate(x,y);c.scale(1,ry/rx);c.translate(-x,-y);c.fillStyle=gr2;c.beginPath();c.arc(x,y,rx,0,7);c.fill();c.restore()}
    /* ต้นค้ำต้นอื่น ๆ ลึกลงไป: พุ่มมืดในหมอก ลำต้นจางหายลงความมืด */for(const[x,y,w,h]of[[1000,1960,70,520],[2250,1640,60,560],[1450,2380,46,300],[2130,2300,52,330],[1760,1560,40,520]]){if(!inB(x-w*3,y-w*2,x+w*3,y+h))continue;const gr2=c.createLinearGradient(0,y,0,y+h);gr2.addColorStop(0,'rgba(58,40,26,.6)');gr2.addColorStop(1,'rgba(20,12,8,0)');c.fillStyle=gr2;c.beginPath();c.moveTo(x-w*.7,y);c.quadraticCurveTo(x-w*.5,y+h*.5,x-w*.6,y+h);c.lineTo(x+w*.6,y+h);c.quadraticCurveTo(x+w*.5,y+h*.5,x+w*.7,y);c.closePath();c.fill();
      const R2=gxRng(4380+(x|0));for(let k=0;k<9;k++){const q=k/9*6.2832,rr=w*(.9+R2()*.6),px=x+Math.cos(q)*rr*1.2,py=y+Math.sin(q)*rr*.5-6,s2=w*(.55+R2()*.3);c.fillStyle='rgba(40,56,30,.62)';c.beginPath();c.ellipse(px,py,s2,s2*.7,0,0,7);c.fill()}
      c.fillStyle='rgba(56,76,40,.7)';c.beginPath();c.ellipse(x,y-8,w*1.4,w*.62,0,0,7);c.fill();for(let k=0;k<6;k++)cg(x+(R2()-.5)*w*2.2,y-6+(R2()-.5)*w*.8,8,'190,255,130',.22);
      c.fillStyle='rgba(30,20,12,.28)';c.beginPath();c.ellipse(x,y,w*2.1,w*1,0,0,7);c.fill()}
    /* แสงอำพันจากหน้าต่างบ้านของนครรากลึก (จุดเล็ก ๆ ไกลลิบ) */for(const[x,y,s]of PAN.cl){if(!inB(x-12,y-12,x+12,y+12))continue;cg(x,y,9*s,'255,180,80',.55);c.fillStyle='rgba(255,226,160,.95)';c.fillRect(x-1.1*s,y-1.1*s,2.2*s,2.2*s)}
    /* ลำต้นของยอดไม้ทั้งสาม */for(const K of PAK){const x=K.x,y=K.y+K.ry*.2,w=K.rx*.52,h=620;if(!inB(x-w*1.6,y-20,x+w*1.6,y+h))continue;const gr2=c.createLinearGradient(x-w,0,x+w,0);gr2.addColorStop(0,'#2e1e12');gr2.addColorStop(.35,'#6a4a2e');gr2.addColorStop(.6,'#563c26');gr2.addColorStop(1,'#24180e');
      c.save();c.beginPath();c.moveTo(x-w*1.25,y);c.bezierCurveTo(x-w*.9,y+h*.2,x-w*.8,y+h*.6,x-w*.9,y+h);c.lineTo(x+w*.9,y+h);c.bezierCurveTo(x+w*.8,y+h*.6,x+w*.9,y+h*.2,x+w*1.25,y);c.closePath();c.fillStyle=gr2;c.fill();c.clip();
      c.strokeStyle='rgba(20,12,6,.5)';c.lineWidth=3;for(let k=-3;k<=3;k++){c.beginPath();c.moveTo(x+k*w*.28,y);c.bezierCurveTo(x+k*w*.3+8,y+h*.3,x+k*w*.24-8,y+h*.6,x+k*w*.26,y+h);c.stroke()}
      const gf=c.createLinearGradient(0,y+h*.3,0,y+h);gf.addColorStop(0,'rgba(12,8,5,0)');gf.addColorStop(1,'rgba(12,8,5,.95)');c.fillStyle=gf;c.fillRect(x-w*1.4,y,w*2.8,h);c.restore();
      /* รากแขนงจากลำต้นพุ่งเข้าผนัง */c.strokeStyle='rgba(60,42,26,.8)';c.lineWidth=10;for(const s of[-1,1]){c.beginPath();c.moveTo(x+s*w*.8,y+h*.35);c.quadraticCurveTo(x+s*w*2.2,y+h*.32,x+s*w*3.4,y+h*.5);c.stroke()}}}
  c.restore();
  /* เงาใต้ปากเหว (ตามแนวขอบ) */
  c.strokeStyle='rgba(0,0,0,.28)';c.lineWidth=34;paPoly(c,E0,10);c.stroke();c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=16;paPoly(c,E0,30);c.stroke();
  c.restore();
  /* ขอบปากเหว: เส้นริมดิน + ก้อนดินร่วงที่ขอบ */
  c.strokeStyle='#2a1c10';c.lineWidth=4.5;paPoly(c,E0);c.stroke();c.strokeStyle='rgba(220,190,140,.35)';c.lineWidth=1.6;paPoly(c,E0,-3);c.stroke();
  {const R=gxRng(4350);for(let i=0;i<150;i++){const a=R()*6.2832,[x,y]=paEP(a,4+R()*14);if(!inB(x-10,y-10,x+10,y+10)){R();continue}const s=2+R()*5;c.fillStyle='#4a3826';c.beginPath();c.ellipse(x,y,s,s*.65,0,0,7);c.fill();c.fillStyle='rgba(220,190,140,.35)';c.beginPath();c.ellipse(x-s*.25,y-s*.25,s*.45,s*.25,0,0,7);c.fill()}}
  /* 3) สะพานราก (ก่อนยอดไม้ ให้ยอดไม้ทับปลายราก) */
  PAB.forEach((b,i)=>{if(inB(Math.min(b[0],b[2])-90,Math.min(b[1],b[3])-80,Math.max(b[0],b[2])+90,Math.max(b[1],b[3])+150))paRootB(c,b,i,cg)});
  /* 4) ยอดต้นค้ำแผ่นดิน */
  PAK.forEach((K,i)=>{if(inB(K.x-K.rx-70,K.y-K.ry-60,K.x+K.rx+70,K.y+K.ry+120))paCrown(c,K,i,cg)});
  /* 5) รูของฝูงกัดแผ่นดิน (รัง) */
  const M=MAPS[43];(M&&M.nests||[]).forEach(([x,y],i)=>{if(!inB(x-80,y-60,x+80,y+60))return;const onK=paK(x,y,0)>=0,R=gxRng(4370+i);
    c.fillStyle=onK?'rgba(30,40,20,.6)':'rgba(40,26,14,.6)';c.beginPath();c.ellipse(x,y+4,52,22,0,0,7);c.fill();c.fillStyle=onK?'#4a3a22':'#6a5236';c.beginPath();c.ellipse(x,y,44,18,0,0,7);c.fill();
    c.fillStyle='#120a06';c.beginPath();c.ellipse(x,y+2,26,10,0,0,7);c.fill();cg(x,y+2,26,'255,150,60',.22);
    for(let k=0;k<7;k++){const a=k/7*6.2832+R()*.4,rx=x+Math.cos(a)*(34+R()*14),ry=y+Math.sin(a)*(14+R()*6);c.strokeStyle='#3a2616';c.lineWidth=4+R()*3;c.beginPath();c.moveTo(rx,ry);c.lineTo(rx+Math.cos(a)*(10+R()*10),ry+Math.sin(a)*(5+R()*5)-4);c.stroke();c.fillStyle='rgba(255,220,160,.4)';c.beginPath();c.arc(rx+Math.cos(a)*(10+R()*10),ry+Math.sin(a)*4-4,1.6,0,7);c.fill()}});
  c.restore()}
/* สะพานราก: ลำรากหนา เปลือกลายเกลียว มอสบนหลัง เส้นเลือดอำพันจาง ๆ รากฝอยห้อยลงเหว เงาตกลงห้วงลึก */
function paRootB(c,b,i,cg){const[x0,y0,x1,y1,hw]=b,L=Math.hypot(x1-x0,y1-y0),a=Math.atan2(y1-y0,x1-x0),R=gxRng(4400+i),nx=-Math.sin(a),ny=Math.cos(a),bend=(R()<.5?-1:1)*(16+R()*14),ph=R()*6,N=36;
  const wf=u=>1.1-.16*Math.sin(u*Math.PI)+.06*Math.sin(u*17+ph)+.04*Math.sin(u*31+ph*2),
    pt=(u,o)=>{const off=Math.sin(u*Math.PI)*bend+Math.sin(u*Math.PI*3+ph)*5+o*(Math.abs(o)>=hw*.99?wf(u):1);return[x0+(x1-x0)*u+nx*off,y0+(y1-y0)*u+ny*off]};
  c.save();paPoly(c,paCont(60,240,0));c.clip();
  /* เงาบนห้วงลึก (เลื่อนลงจอ) */c.fillStyle='rgba(0,0,0,.4)';c.beginPath();for(let k=0;k<=N;k++){const[x,y]=pt(k/N,-hw);k?c.lineTo(x,y+54):c.moveTo(x,y+54)}for(let k=N;k>=0;k--){const[x,y]=pt(k/N,hw);c.lineTo(x,y+60)}c.closePath();c.fill();
  /* รากฝอยห้อย (เฉพาะช่วงที่อยู่เหนือเหว) */for(let k=1;k<N;k++){const u=k/N,[xa,ya]=pt(u,-hw),[xb,yb]=pt(u,hw),x=ya>yb?xa:xb,lo=Math.max(ya,yb);if(paCd(x,lo)>-10||R()<.35)continue;const Lh=24+R()*60,sw=(R()-.5)*14;
    c.strokeStyle='rgba(50,32,20,.85)';c.lineWidth=1.6+R()*1.6;c.beginPath();c.moveTo(x,lo-2);c.quadraticCurveTo(x+sw,lo+Lh*.5,x+sw*.4,lo+Lh);c.stroke();if(R()<.3)cg(x+sw*.4,lo+Lh,6,'255,190,90',.45)}
  /* ลำราก */const P=[];for(let k=0;k<=N;k++)P.push(pt(k/N,-hw));for(let k=N;k>=0;k--)P.push(pt(k/N,hw));
  c.beginPath();P.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();
  const gr=c.createLinearGradient(x0+nx*-hw,y0+ny*-hw,x0+nx*hw,y0+ny*hw);gr.addColorStop(0,'#a8805a');gr.addColorStop(.35,'#86603e');gr.addColorStop(.75,'#5e4028');gr.addColorStop(1,'#3a2616');c.fillStyle=gr;c.fill();c.strokeStyle='#24160c';c.lineWidth=2.6;c.stroke();
  c.save();c.clip();
  /* ลายเปลือก: ร่องยาวไม่เท่ากัน ขาดเป็นช่วง ๆ + แผ่นเปลือก */for(let s=-4;s<=4;s++){const f1=10+R()*9,f2=R()*6,o0=s*hw*.21+(R()-.5)*5;let u=R()*.15;while(u<1){const len=.12+R()*.3,u1=Math.min(1,u+len);c.strokeStyle='rgba(38,22,10,'+(.35+R()*.25)+')';c.lineWidth=1.4+R()*1.8;c.beginPath();for(let k=0;k<=12;k++){const uu=u+(u1-u)*k/12,[px,py]=pt(uu,o0+Math.sin(uu*f1+f2)*3.4);k?c.lineTo(px,py):c.moveTo(px,py)}c.stroke();u=u1+.03+R()*.08}}
  c.strokeStyle='rgba(232,204,156,.2)';c.lineWidth=1.3;for(let s=-3;s<=0;s++){const f1=12+R()*6;c.beginPath();for(let k=0;k<=N;k++){const u=k/N,[px,py]=pt(u,s*hw*.21-3+Math.sin(u*f1+s)*3);k?c.lineTo(px,py):c.moveTo(px,py)}c.stroke()}
  for(let k=0;k<14;k++){const[px,py]=pt(.05+R()*.9,(R()-.5)*hw*1.5),sx=8+R()*12;c.fillStyle='rgba(150,110,70,.28)';c.beginPath();c.ellipse(px,py,sx,sx*.35,a,0,7);c.fill();c.strokeStyle='rgba(30,18,8,.35)';c.lineWidth=1;c.stroke()}
  /* ปุ่มตา */for(let k=0;k<4;k++){const[x,y]=pt(.15+R()*.7,(R()-.5)*hw);c.fillStyle='rgba(40,24,12,.6)';c.beginPath();c.ellipse(x,y,7,4,a,0,7);c.fill();c.strokeStyle='rgba(220,180,130,.3)';c.lineWidth=1;c.beginPath();c.ellipse(x,y,10,6,a,0,7);c.stroke()}
  /* เส้นเลือดอำพันจาง ๆ */c.strokeStyle='rgba(255,180,80,.35)';c.lineWidth=1.6;c.beginPath();for(let k=0;k<=N;k++){const u=k/N,[x,y]=pt(u,Math.sin(u*9+i)*hw*.35);k?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
  /* มอสบนหลังราก */for(let k=0;k<16;k++){const u=.04+R()*.92,[x,y]=pt(u,-hw*(.25+R()*.55)),s=6+R()*12;c.fillStyle=R()<.5?'rgba(110,160,70,.75)':'rgba(140,190,90,.7)';c.beginPath();c.ellipse(x,y,s,s*.55,a,0,7);c.fill();if(R()<.4){c.fillStyle='rgba(230,255,160,.8)';c.beginPath();c.arc(x+(R()-.5)*s,y,1.4,0,7);c.fill()}}
  c.restore();
  /* ปุ่มรากตามขอบ */for(let k=0;k<10;k++){const u=.08+R()*.84,sd=R()<.5?-1:1,[px,py]=pt(u,sd*hw*.98),r2=4+R()*5;c.fillStyle=sd<0?'#9a7450':'#4a3020';c.beginPath();c.ellipse(px,py,r2*1.3,r2*.8,a,0,7);c.fill();c.strokeStyle='#24160c';c.lineWidth=1.2;c.stroke()}
  c.restore();
  /* ปลายรากมุดลงดิน: ดินพูนกลบตรงที่รากหายลงไป + รากฝอยใต้ผิวดิน */for(const u0 of[0,1]){const[ex,ey]=pt(u0,0);if(paCd(ex,ey)<20)continue;let u=u0;const du=u0?-.005:.005;for(let k=0;k<200;k++){const[px,py]=pt(u,0);if(paCd(px,py)<57)break;u+=du}
    const[mx,my]=pt(u,0),sd=du>0?-1:1;c.save();c.translate(mx,my);c.rotate(a);
    for(let k=0;k<4;k++){const ang=(k-1.5)*.42,L2=40+R()*40;c.strokeStyle='rgba(60,40,22,.55)';c.lineWidth=5-k*.6;c.beginPath();c.moveTo(sd*4,(k-1.5)*hw*.4);c.quadraticCurveTo(sd*L2*.5,(k-1.5)*hw*.55+(R()-.5)*14,sd*L2*Math.cos(ang),(k-1.5)*hw*.5+Math.sin(ang)*L2*.6);c.stroke()}
    c.fillStyle='rgba(40,26,14,.5)';c.beginPath();c.ellipse(-sd*6,4,18,hw*1.3,0,0,7);c.fill();
    c.fillStyle='#665438';c.beginPath();for(let k=0;k<=16;k++){const q=k/16*6.2832,rr=1+.14*Math.sin(q*5+ph);const px=sd*4+Math.cos(q)*15*rr,py=Math.sin(q)*hw*1.36*rr;k?c.lineTo(px,py):c.moveTo(px,py)}c.closePath();c.fill();c.fillStyle='rgba(160,136,96,.45)';c.beginPath();c.ellipse(sd*7,-hw*.3,8,hw*.6,0,0,7);c.fill();c.strokeStyle='rgba(30,20,10,.55)';c.lineWidth=2;c.beginPath();c.ellipse(sd*3,0,15,hw*1.3,0,sd>0?1.75:-1.4,sd>0?4.55:1.4);c.stroke();
    for(let k=0;k<7;k++){c.fillStyle=k%2?'#7a6646':'#5e4c32';c.beginPath();c.ellipse(sd*(6+R()*18)-(sd>0?0:0),(R()-.5)*hw*2.4,3+R()*4,2+R()*2.4,0,0,7);c.fill()}c.restore()}}
/* ยอดต้นค้ำแผ่นดิน: ใบใต้ขอบ → พื้นมอส กิ่งใหญ่แผ่ออก ก้อนมอส จุดเรือง เห็ดและดอกไม้เล็ก → ใบขอบนอก */
function paCrown(c,K,i,cg){const R=gxRng(4500+i),{x,y,rx,ry}=K;
  c.fillStyle='rgba(0,0,0,.45)';c.beginPath();c.ellipse(x+8,y+ry*.55+34,rx*1.02,ry*.85,0,0,7);c.fill();
  /* ใบชั้นล่างย้อยใต้ขอบ */for(let k=0;k<44;k++){const q=k/44*6.2832,ex=x+Math.cos(q)*rx*1.02,ey=y+Math.sin(q)*ry*1.02;if(Math.sin(q)<-.2)continue;const s=18+R()*14;c.fillStyle=R()<.5?'#2e5426':'#284a22';c.beginPath();c.ellipse(ex,ey+16,s,s*.75,0,0,7);c.fill()}
  /* พื้นมอส */const gr=c.createRadialGradient(x-rx*.25,y-ry*.3,10,x,y,Math.max(rx,ry)*1.05);gr.addColorStop(0,'#86c062');gr.addColorStop(.6,'#5e9a46');gr.addColorStop(1,'#3e7234');c.fillStyle=gr;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();
  c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.clip();
  /* กิ่งใหญ่ใต้มอส: แตกจากลำต้น โค้ง แยกแขนง */{const ox0=x+(R()-.5)*rx*.3,oy0=y+(R()-.5)*ry*.3,BR=[];for(let k=0;k<5;k++){const q=k/5*6.2832+R()*.8,L=.6+R()*.35,ex=x+Math.cos(q)*rx*L,ey=y+Math.sin(q)*ry*L,cx=(ox0+ex)/2+Math.cos(q+1.57)*(R()-.5)*90,cy=(oy0+ey)/2+Math.sin(q+1.57)*(R()-.5)*60;BR.push([ox0,oy0,cx,cy,ex,ey,15]);
      for(let f=0;f<2;f++){const t0=.45+R()*.3,bx=ox0+(ex-ox0)*t0+(cx-(ox0+ex)/2)*.5,by=oy0+(ey-oy0)*t0+(cy-(oy0+ey)/2)*.5,q2=q+(f?1:-1)*(.5+R()*.5),L2=rx*(.18+R()*.18);BR.push([bx,by,bx+Math.cos(q2)*L2*.5,by+Math.sin(q2)*L2*.35,bx+Math.cos(q2)*L2,by+Math.sin(q2)*L2*.7,7])}}
    for(const[lw,col]of[[1.25,'rgba(60,40,22,.85)'],[.8,'rgba(124,90,58,.92)'],[.22,'rgba(226,190,140,.32)']])for(const[a1,b1,c1,d1,e1,f1,w]of BR){c.strokeStyle=col;c.lineWidth=w*lw;c.beginPath();c.moveTo(a1,b1);c.quadraticCurveTo(c1,d1,e1,f1);c.stroke()}}
  /* ก้อนมอสทับกิ่ง */for(let k=0;k<96;k++){const q=R()*6.2832,rr=Math.sqrt(R()),px=x+Math.cos(q)*rx*rr*.95,py=y+Math.sin(q)*ry*rr*.95,s=8+R()*18;c.fillStyle=R()<.5?'rgba(120,180,84,.85)':'rgba(84,140,60,.85)';c.beginPath();c.ellipse(px,py,s,s*.6,0,0,7);c.fill();c.fillStyle='rgba(200,240,150,.35)';c.beginPath();c.ellipse(px-s*.25,py-s*.2,s*.45,s*.22,0,0,7);c.fill()}
  /* จุดมอสเรือง */for(let k=0;k<26;k++){const q=R()*6.2832,rr=Math.sqrt(R())*.9,px=x+Math.cos(q)*rx*rr,py=y+Math.sin(q)*ry*rr;cg(px,py,9,'210,255,130',.4);c.fillStyle='rgba(240,255,180,.95)';c.beginPath();c.arc(px,py,1.6,0,7);c.fill()}
  /* เห็ดเล็กและดอกไม้ */for(let k=0;k<10;k++){const q=R()*6.2832,rr=.3+R()*.6,px=x+Math.cos(q)*rx*rr,py=y+Math.sin(q)*ry*rr;if(R()<.5){c.fillStyle='#e8dcc4';c.fillRect(px-1,py-4,2,4);c.fillStyle=R()<.5?'#d85a4a':'#e8a040';c.beginPath();c.ellipse(px,py-4,4,2.4,0,Math.PI,0);c.fill();c.fillStyle='#fff';c.fillRect(px-1.6,py-5.4,1,1)}
    else{c.fillStyle=R()<.5?'#fff2b0':'#f2b8d0';for(let p=0;p<5;p++){const pa=p/5*6.2832;c.beginPath();c.arc(px+Math.cos(pa)*2,py+Math.sin(pa)*1.4,1.5,0,7);c.fill()}c.fillStyle='#e8a030';c.beginPath();c.arc(px,py,1.1,0,7);c.fill()}}
  /* แสงเงาขอบใน */c.strokeStyle='rgba(20,40,16,.3)';c.lineWidth=34;c.beginPath();c.ellipse(x,y+6,rx,ry,0,0,7);c.stroke();
  c.restore();
  /* ใบขอบนอก (เป็นพุ่ม) */for(let k=0;k<52;k++){const q=k/52*6.2832+R()*.05,ex=x+Math.cos(q)*rx*(.98+R()*.06),ey=y+Math.sin(q)*ry*(.98+R()*.06),s=12+R()*12;c.fillStyle=Math.sin(q)<0?'#5a9a44':'#3e7a34';c.beginPath();c.ellipse(ex,ey,s,s*.72,0,0,7);c.fill();
    c.fillStyle='rgba(190,235,140,.4)';c.beginPath();c.ellipse(ex-s*.2,ey-s*.25,s*.45,s*.24,0,0,7);c.fill();c.strokeStyle='rgba(20,40,16,.45)';c.lineWidth=1;c.beginPath();c.ellipse(ex,ey,s,s*.72,0,.2,2.9);c.stroke()}}
/* ---------- ของประกอบฉาก ---------- */
function paBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(4343);
  const ok=(x,y,m)=>paLand(x,y,70+m)&&!paSafe(x,y)&&Math.hypot(x-M.sx,y-M.sy)>M.sr+80+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>130+m)&&paSegD(x,y)>48+m&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>120+m)
    &&PAFP.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>110+m)&&PARP.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>110+m)&&Math.hypot(x-PATHU.x,y-PATHU.y)>120+m&&PAB.every(b=>Math.hypot(x-b[0],y-b[1])>130+m&&Math.hypot(x-b[2],y-b[3])>130+m);
  /* ค่ายพักริมเหว */
  for(const[x,y,v,s]of[[1250,390,0,1],[1420,298,1,1.05],[1990,330,0,.95],[2150,436,2,1],[1090,476,1,.9]])trees.push({x,y,r:28*s,k:'patent',v,sc:s,ht:90,hw:58*s,fw:54*s});
  trees.push({x:PAREF.x+110,y:PAREF.y+30,r:14,k:'pafire',ht:40,hw:30});
  for(const[x,y,k,v]of[[1880,470,'pacrate',0],[1912,494,'pacrate',1],[1350,480,'pasack',0],[1376,500,'pasack',1],[1180,420,'pasack',0],[2080,380,'pacrate',1]])trees.push({x,y,r:12,k,v,ht:30,hw:20});
  trees.push({x:2060,y:540,r:0,k:'papen',ht:30,ns:1,nc:1});
  trees.push({x:1490,y:508,r:10,k:'pasign',ht:70,hw:30});
  {const F=[];for(let x=980;x<=2280;x+=104){if(x>1470&&x<1730)continue;F.push(x)}F.forEach((x,i)=>{const nx=F[i+1],y=620+Math.sin(x*.013)*7;trees.push({x,y,r:0,k:'pafence',ht:44,ns:1,nc:1,v:i,rx:nx&&nx-x<120?nx:0,ry:nx?620+Math.sin(nx*.013)*7:0})})}
  for(const[x,y]of[[1462,606],[1738,606],[1300,566],[1920,566],[1440,880],[1830,820],[1000,720],[2240,780]])trees.push({x,y,r:0,k:'palamp',ht:84,ns:1,nc:1});
  /* ธงแดงเตือนเขตดินทรุด (ขอบขั้นนอก) */
  for(let a=0;a<6.2832;a+=.19){const[x,y]=paEP(a,250+Math.sin(a*7)*12);if(y<650||M.gates.some(G=>Math.hypot(x-G.x,y-G.y)<140)||PAB.some(b=>Math.hypot(x-b[0],y-b[1])<110||Math.hypot(x-b[2],y-b[3])<110)||PAFP.some(([sx,sy])=>Math.hypot(x-sx,y-sy)<90)||PARP.some(([sx,sy])=>Math.hypot(x-sx,y-sy)<90)||paSegD(x,y)<26)continue;trees.push({x,y,r:0,k:'paflag',ht:56,ns:1,nc:1,v:(a*10)|0})}
  /* ต้นไม้เอียงหาเหว · หิน · พุ่ม · รั้วแพะล้ม */
  for(let i=0,n=0;i<1400&&n<12;i++){const a=R()*6.2832,[x,y]=paEP(a,300+R()*170);if(!ok(x,y,0))continue;const ang=Math.atan2(PAC.y-y,PAC.x-x);trees.push({x,y,r:16,k:'paltree',v:(R()*3)|0,sc:.9+R()*.35,ht:150,hw:46,lean:Math.cos(ang)*.32});n++}
  for(let i=0,n=0;i<1400&&n<30;i++){const x=150+R()*2900,y=700+R()*2380;if(!ok(x,y,0)||paCd(x,y)<520)continue;trees.push({x,y,r:16,k:'paoak',v:(R()*3)|0,sc:.85+R()*.4,ht:150,hw:48});n++}
  for(let i=0,n=0;i<900&&n<26;i++){const x=150+R()*2900,y=700+R()*2380;if(!ok(x,y,-20))continue;trees.push({x,y,r:16,k:'parock',v:(R()*3)|0,sc:.8+R()*.6,ht:46,hw:34});n++}
  for(let i=0,n=0;i<900&&n<30;i++){const x=150+R()*2900,y=700+R()*2380;if(!ok(x,y,-40))continue;trees.push({x,y,r:0,k:'pabush',v:(R()*3)|0,sc:.8+R()*.5,ht:30,nc:1});n++}
  for(const[x,y,v]of[[860,880,0],[2380,920,1],[560,2500,1],[2650,2700,0],[1180,2860,1]])if(ok(x,y,-60))trees.push({x,y,r:0,k:'pagfen',v,ht:34,ns:1,nc:1});
  /* เต็นท์ที่ร่วงลงไปค้างบนขั้นดิน */for(const[x,y,v]of[[1730,1150,0],[880,1820,1],[2380,2180,0]])trees.push({x,y,r:0,k:'patarp',v,ht:30,ns:1,nc:1});
  /* รากเรืองแสง 5 จุด (โค้งรากโผล่จากดิน/ยอดไม้) */PARP.forEach(([x,y],i)=>trees.push({x,y:y-4,r:0,k:'paroot',v:i,ht:70,ns:1,nc:1}));
  /* NPC2 ทิล (ค่ายพัก) */trees.push({x:1790,y:404,r:0,k:'patil',ht:60,ns:1,nc:1});
  PAN.fl=trees.filter(t=>t.k==='palamp').map(t=>[t.x,t.y]);
  PAN.gr=[];for(let i=0;i<90;i++)PAN.gr.push([R()*3200,R()*3200,150+R()*260,R()]);
  PAN.cl=[];for(let i=0;i<160;i++){const a=R()*6.2832,d=R()*560,x=PAC.x+Math.cos(a)*d*1.1,y=PAC.y+120+Math.sin(a)*d*.62;if(paCd(x,y)>-120)continue;PAN.cl.push([x,y,.6+R()*.9])}
  PAN.sp=[];for(let i=0;i<70;i++){const a=R()*6.2832,d=R()*640;PAN.sp.push([PAC.x+Math.cos(a)*d,PAC.y+80+Math.sin(a)*d*.62,R()*6,R()])}
  PAN.ff=[];for(const K of PAK)for(let i=0;i<14;i++){const q=R()*6.2832,rr=Math.sqrt(R())*.85;PAN.ff.push([K.x+Math.cos(q)*K.rx*rr,K.y+Math.sin(q)*K.ry*rr,R()*6])}
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc)return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
Object.assign(PALK,{
 patent(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,tl=v===2?.16:0,C=[['#a88a5e','#7a6040','#5a4430'],['#5a7aa8','#3a5680','#2a3c5a'],['#b89a6a','#8a6a44','#5a4430']][v];PALSH(x,y+6*s,64*s,15*s,.4);
  g.save();g.translate(x,y);g.rotate(tl);g.scale(s,s);
  g.fillStyle=C[2];g.beginPath();g.moveTo(-56,6);g.lineTo(0,-62);g.lineTo(56,6);g.closePath();g.fill();
  const gr=g.createLinearGradient(-50,0,50,0);gr.addColorStop(0,C[0]);gr.addColorStop(.5,C[1]);gr.addColorStop(1,C[2]);g.fillStyle=gr;g.beginPath();g.moveTo(-52,4);g.lineTo(-2,-60);g.lineTo(2,-60);g.lineTo(52,4);g.closePath();g.fill();g.strokeStyle='#2a1c10';g.lineWidth=1.6;g.stroke();
  if(v===1){g.fillStyle='rgba(240,236,220,.55)';for(let k=0;k<4;k++){g.beginPath();g.moveTo(-40+k*24,4);g.lineTo(-6+k*4,-52);g.lineTo(0+k*4,-52);g.lineTo(-28+k*24,4);g.closePath();g.fill()}}
  g.fillStyle='#2a1c12';g.beginPath();g.moveTo(-14,4);g.lineTo(0,-30);g.lineTo(14,4);g.closePath();g.fill();
  g.fillStyle='rgba(255,190,110,.35)';g.beginPath();g.moveTo(-8,4);g.lineTo(0,-18);g.lineTo(8,4);g.closePath();g.fill();
  /* ผ้าปะ */g.fillStyle='rgba(200,170,120,.85)';g.fillRect(18,-24,12,10);g.strokeStyle='rgba(60,40,20,.6)';g.lineWidth=.8;g.strokeRect(18,-24,12,10);
  g.strokeStyle='#5a3e24';g.lineWidth=2;g.beginPath();g.moveTo(0,-60);g.lineTo(0,-70);g.stroke();g.strokeStyle='rgba(230,210,170,.6)';g.lineWidth=1;g.beginPath();g.moveTo(-52,4);g.lineTo(-70,14);g.moveTo(52,4);g.lineTo(70,14);g.stroke();g.restore()},
 pafire(t,T){const x=t.x,y=t.y,f=.75+.25*Math.sin(T*9)*Math.sin(T*5.3);PALSH(x,y+4,30,8,.35);g.fillStyle='#5a4a3a';for(let k=0;k<8;k++){const a=k/8*6.283;g.beginPath();g.ellipse(x+Math.cos(a)*22,y+Math.sin(a)*9,6,4,0,0,7);g.fill()}
  g.strokeStyle='#4a2e18';g.lineWidth=5;g.beginPath();g.moveTo(x-16,y+4);g.lineTo(x+14,y-6);g.moveTo(x-14,y-6);g.lineTo(x+16,y+4);g.stroke();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10,46*f,'255,170,80',.5);for(let k=0;k<5;k++){const q=(T*1.2+k/5)%1;g.fillStyle='rgba(255,'+(140+80*(1-q)|0)+',60,'+(1-q)+')';g.beginPath();g.ellipse(x+Math.sin(T*3+k)*5,y-6-q*30,7*(1-q)+2,10*(1-q)+3,0,0,7);g.fill()}g.restore();
  /* หม้อขนมครกของยายอิ่ม */if(PAS.yim){g.fillStyle='#2a2420';g.beginPath();g.ellipse(x+24,y-2,12,5,0,0,7);g.fill();g.fillStyle='#e8c070';for(let k=0;k<5;k++){g.beginPath();g.arc(x+16+k*4,y-3+(k%2),1.6,0,7);g.fill()}}},
 pacrate(t,T){const x=t.x,y=t.y,v=t.v|0;PALSH(x,y+4,18,6,.3);g.fillStyle=v?'#8a6a44':'#7a5a3a';g.fillRect(x-14,y-22,28,24);g.strokeStyle='#3a2414';g.lineWidth=1.4;g.strokeRect(x-14,y-22,28,24);g.beginPath();g.moveTo(x-14,y-22);g.lineTo(x+14,y+2);g.moveTo(x+14,y-22);g.lineTo(x-14,y+2);g.stroke();g.fillStyle='rgba(255,240,200,.2)';g.fillRect(x-14,y-22,28,4)},
 pasack(t,T){const x=t.x,y=t.y;PALSH(x,y+3,14,5,.3);g.fillStyle=t.v?'#c8b088':'#b89a70';g.beginPath();g.moveTo(x-11,y+2);g.quadraticCurveTo(x-13,y-14,x-4,y-18);g.lineTo(x+4,y-18);g.quadraticCurveTo(x+13,y-14,x+11,y+2);g.closePath();g.fill();g.strokeStyle='#5a4428';g.lineWidth=1.2;g.stroke();g.strokeStyle='#6a4a2a';g.beginPath();g.moveTo(x-5,y-16);g.lineTo(x+5,y-16);g.stroke()},
 papen(t,T){const x=t.x,y=t.y;g.strokeStyle='#6a4a2a';g.lineWidth=3;for(let k=0;k<10;k++){if(k===3)continue;const a=k/10*6.283,px=x+Math.cos(a)*58,py=y+Math.sin(a)*24;g.beginPath();g.moveTo(px,py);g.lineTo(px,py-18);g.stroke()}
  g.strokeStyle='#8a6a44';g.lineWidth=2;g.beginPath();g.ellipse(x,y-12,58,24,0,.3,6.0);g.stroke();
  if(p6Past('pacr')||(me.sty&&((me.sty.pacr|0)>>4&1))){for(let k=0;k<3;k++){const a=T*.12+k*2.1;paGoat(x+Math.cos(a)*30,y-6+Math.sin(a)*10,Math.sin(a)>0?-1:1,T,k,1)}}},
 pasign(t,T){const x=t.x,y=t.y;PALSH(x,y+3,20,5,.3);g.fillStyle='#5a3e24';g.fillRect(x-14,y-40,3,40);g.fillRect(x+11,y-40,3,40);g.fillStyle='#a8845a';g.fillRect(x-20,y-58,40,24);g.strokeStyle='#3a2414';g.lineWidth=1.4;g.strokeRect(x-20,y-58,40,24);
  g.fillStyle='#c83a2a';g.fillRect(x-17,y-55,10,7);g.fillStyle='#2a1c10';g.font='bold 7px system-ui';g.textAlign='center';g.fillText('กู้ภัย',x+5,y-49);g.fillText('ห้ามข้ามเชือก',x,y-39);g.strokeStyle='rgba(255,255,255,.25)';g.beginPath();g.moveTo(x-20,y-57);g.lineTo(x+20,y-57);g.stroke()},
 pafence(t,T){const x=t.x,y=t.y;g.fillStyle='#5a3e24';g.fillRect(x-2.5,y-34,5,34);g.fillStyle='#7a5a3a';g.fillRect(x-3.5,y-36,7,4);
  if(t.rx){const sw=Math.sin(T*1.4+t.v)*2;g.strokeStyle='#c8a868';g.lineWidth=1.6;g.beginPath();g.moveTo(x,y-26);g.quadraticCurveTo((x+t.rx)/2,y-18+sw,t.rx,t.ry-26);g.stroke();
    const mx=(x+t.rx)/2,my=(y+t.ry)/2-21+sw;g.fillStyle='#d8382e';g.beginPath();g.moveTo(mx-3,my);g.lineTo(mx+3,my);g.lineTo(mx+Math.sin(T*3+t.v)*1.5,my+9);g.closePath();g.fill()}},
 palamp(t,T){const x=t.x,y=t.y,f=.75+.25*Math.sin(T*5+x);g.strokeStyle='#4a3420';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-64);g.lineTo(x+12,y-64);g.stroke();
  g.strokeStyle='#3a2a1a';g.lineWidth=1;g.beginPath();g.moveTo(x+12,y-64);g.lineTo(x+12,y-56);g.stroke();g.fillStyle='#2a2018';g.fillRect(x+7,y-57,10,3);g.fillStyle='rgba(255,210,140,'+(.75+.25*f)+')';g.fillRect(x+8,y-54,8,9);g.fillStyle='#2a2018';g.fillRect(x+7,y-45,10,2);
  g.save();g.globalCompositeOperation='lighter';glowAt(x+12,y-50,26*f,'255,190,110',.45);g.restore()},
 paflag(t,T){const x=t.x,y=t.y,w=Math.sin(T*2.6+t.v);g.strokeStyle='#5a3e24';g.lineWidth=2.4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-42);g.stroke();g.fillStyle='#d83a2e';g.beginPath();g.moveTo(x,y-42);g.quadraticCurveTo(x+9,y-40+w,x+18,y-38+w*2);g.lineTo(x+16,y-30+w*2);g.quadraticCurveTo(x+8,y-32+w,x,y-30);g.closePath();g.fill();g.strokeStyle='rgba(60,20,10,.6)';g.lineWidth=.8;g.stroke()},
 paltree(t,T){const x=t.x,y=t.y,s=t.sc||1,ln=t.lean||0,sw=Math.sin(T*.9+x*.01)*.02;PALSH(x,y+4,36*s,10*s,.4);g.save();g.translate(x,y);g.rotate(ln+sw);
  g.strokeStyle='#4a3420';g.lineWidth=9*s;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(4*s,-40*s,0,-80*s);g.stroke();g.strokeStyle='rgba(160,120,80,.4)';g.lineWidth=2.4*s;g.beginPath();g.moveTo(-2*s,-4*s);g.quadraticCurveTo(2*s,-40*s,-2*s,-76*s);g.stroke();
  /* รากโผล่ข้างที่ดินร่วง */g.strokeStyle='#4a3420';g.lineWidth=3*s;for(const d of[-1,1]){g.beginPath();g.moveTo(0,-2);g.quadraticCurveTo(d*10*s,4*s,d*18*s,2*s);g.stroke()}
  const C=[['#5a8a40','#3e6a2e'],['#6a9a48','#466e32'],['#7a9a50','#56763a']][t.v|0];for(const[dx,dy,r]of[[-22,-84,26],[18,-90,28],[0,-110,30],[-8,-70,22],[24,-66,20]]){g.fillStyle=C[1];g.beginPath();g.arc(dx*s,dy*s+3,r*s,0,7);g.fill();g.fillStyle=C[0];g.beginPath();g.arc(dx*s-3,dy*s,r*s*.92,0,7);g.fill()}
  g.fillStyle='rgba(220,240,170,.3)';g.beginPath();g.arc(-6*s,-116*s,12*s,0,7);g.fill();g.restore()},
 paoak(t,T){const x=t.x,y=t.y,s=t.sc||1,sw=Math.sin(T*.8+x*.013)*1.4;PALSH(x,y+4,40*s,11*s,.4);g.fillStyle='#4a3420';g.beginPath();g.moveTo(x-7*s,y);g.quadraticCurveTo(x-5*s,y-40*s,x-3*s,y-70*s);g.lineTo(x+3*s,y-70*s);g.quadraticCurveTo(x+5*s,y-40*s,x+7*s,y);g.closePath();g.fill();
  const C=[['#5e8c42','#3e6a2e','#86b05a'],['#6a9448','#466e32','#92ba62'],['#58804a','#3a6034','#80a86a']][t.v|0];for(const[dx,dy,r,k]of[[-26,-78,28,1],[26,-80,28,1],[0,-104,34,1],[-14,-88,26,0],[16,-92,26,0],[0,-110,22,2]]){g.fillStyle=C[k];g.beginPath();g.arc(x+dx*s+sw*(k?1:.6),y+dy*s,r*s,0,7);g.fill()}},
 parock(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x,y+3,26*s,7*s,.35);g.fillStyle=['#7a7468','#6e6a60','#827a6c'][t.v|0];g.beginPath();g.moveTo(x-24*s,y+2);g.lineTo(x-18*s,y-18*s);g.lineTo(x+2*s,y-26*s);g.lineTo(x+22*s,y-14*s);g.lineTo(x+24*s,y+2);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.moveTo(x-16*s,y-16*s);g.lineTo(x+2*s,y-24*s);g.lineTo(x+8*s,y-12*s);g.lineTo(x-8*s,y-8*s);g.closePath();g.fill();g.fillStyle='rgba(110,160,70,.55)';g.beginPath();g.ellipse(x-4*s,y-20*s,9*s,3.4*s,-.2,0,7);g.fill()},
 pabush(t,T){const x=t.x,y=t.y,s=t.sc||1;g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y+3,20*s,5*s,0,0,7);g.fill();for(const[dx,dy,r,c]of[[-9,-6,10,'#4e7434'],[9,-6,10,'#4e7434'],[0,-12,12,'#5e8a40'],[-3,-15,6,'#7aa452']]){g.fillStyle=c;g.beginPath();g.arc(x+dx*s,y+dy*s,r*s,0,7);g.fill()}
  if(t.v===1){g.fillStyle='#f2d880';for(const[dx,dy]of[[-6,-12],[5,-16],[8,-6]]){g.beginPath();g.arc(x+dx*s,y+dy*s,1.6,0,7);g.fill()}}},
 pagfen(t,T){const x=t.x,y=t.y;g.strokeStyle='#6a4a2a';g.lineWidth=3;for(let k=0;k<5;k++){const px=x-60+k*30,tilt=k===2?.6:k===3?-.4:0;g.save();g.translate(px,y);g.rotate(tilt);g.beginPath();g.moveTo(0,0);g.lineTo(0,-22);g.stroke();g.restore()}
  g.strokeStyle='#8a6a44';g.lineWidth=2.4;g.beginPath();g.moveTo(x-60,y-16);g.lineTo(x-4,y-14);g.moveTo(x+30,y-10);g.lineTo(x+60,y-16);g.stroke();if(t.v){g.fillStyle='#c8b070';g.beginPath();g.arc(x+14,y+2,3.4,0,7);g.fill();g.strokeStyle='#8a6a2a';g.lineWidth=1;g.stroke()}},
 patarp(t,T){const x=t.x,y=t.y,v=t.v|0,C=v?['#6a8ab8','#3e5a86','#2a3c5a']:['#b89a6a','#8a6a44','#5a4430'];g.save();g.translate(x,y);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,8,46,11,0,0,7);g.fill();
  /* ผ้าเต็นท์ยับกองกับพื้น + เสาหัก + เชือก */const P=[[-42,6],[-34,-6],[-20,-12],[-8,-6],[4,-16],[18,-10],[30,-14],[42,0],[34,10],[14,12],[-6,8],[-24,12]];g.beginPath();P.forEach(([px,py],k)=>k?g.lineTo(px,py):g.moveTo(px,py));g.closePath();
  const gr=g.createLinearGradient(0,-16,0,12);gr.addColorStop(0,C[0]);gr.addColorStop(1,C[1]);g.fillStyle=gr;g.fill();g.strokeStyle='#2a1c10';g.lineWidth=1.3;g.stroke();
  g.strokeStyle=C[2];g.lineWidth=1.2;for(const[x0,y0,x1,y1]of[[-30,-4,-14,6],[-6,-4,8,8],[10,-10,24,6],[26,-8,34,4]]){g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2+3,(y0+y1)/2-4,x1,y1);g.stroke()}
  if(v){g.fillStyle='rgba(240,236,220,.5)';for(const[px,py]of[[-26,-2],[-4,-2],[18,-4]]){g.beginPath();g.ellipse(px,py,4,7,.4,0,7);g.fill()}}
  g.strokeStyle='#5a3e24';g.lineWidth=2.6;g.beginPath();g.moveTo(-2,-8);g.lineTo(8,-30);g.moveTo(9,-31);g.lineTo(18,-38);g.stroke();g.strokeStyle='rgba(220,200,160,.8)';g.lineWidth=1;g.beginPath();g.moveTo(40,0);g.quadraticCurveTo(52,8,60,4);g.stroke();g.fillStyle='#5a3e24';g.fillRect(58,0,3,8);g.restore()},
 paroot(t,T){paRootArch(t.x,t.y,t.v|0,T)},
 patil(t,T){const N=MAPS[43]&&MAPS[43].npc2;if(!N||N.x<0)return;const f=me.x<N.x?-1:1;try{sfTil(N.x,N.y,f,T)}catch(e){campFolk(N.x,N.y,{c:'#c86a3a',s:1.2,f},T)}npvLbl(N.n,N.x,N.y-44,'#ffd8a8');try{npcSay('til43',N.x,N.y,PATILSAY,190,50)}catch(e){}}});
const PATILSAY=['อย่าข้ามเชือกเส้นแดงถ้าไม่จำเป็นนะท่านผู้นำ!','ข้าจะวาดรูปทุกอย่างที่เห็นไว้ให้ยายเอดาดู','ข้างล่างนั่นเรืองแสงทั้งคืนเลย… สวยแต่ก็น่ากลัว','ระวังรอยแตกสีส้มนะ ดินตรงนั้นกำลังจะร่วง!'];
/* โค้งรากเรืองแสง (จุดฟัง) */
function paRootArch(x,y,i,T){const st=stCur(),q=me.sty,act=!!(st&&st.parr&&q&&q.a===1),heard=act?((q.parr|0)>>i&1):p6Past('parr'),pu=.55+.45*Math.sin(T*2.2+i);
  g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+4,44,11,0,0,7);g.fill();
  for(const[lw,col]of[[19,'#2a1a0e'],[14,'#7a5638'],[5,'rgba(220,180,130,.35)']]){g.strokeStyle=col;g.lineWidth=lw;g.lineCap='round';g.beginPath();g.moveTo(x-36,y+2);g.bezierCurveTo(x-34,y-56,x+30,y-60,x+34,y+2);g.stroke()}
  g.fillStyle='#5a4028';g.beginPath();g.ellipse(x-36,y+3,13,6,0,0,7);g.ellipse(x+34,y+3,13,6,0,0,7);g.fill();
  /* ลายสลักบนราก (จุดเรือง) */const on=act&&!heard,gl=on?.6+.4*pu:heard?.75:.25;g.fillStyle='rgba(255,200,110,'+gl+')';for(let k=0;k<7;k++){const u=.15+k*.11,bx=x-36+u*70,by=y-46*Math.sin(u*Math.PI)-2;g.fillRect(bx-1.4,by-1.4,2.8,2.8)}
  if(on||heard){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-30,on?50:34,'255,190,90',(on?.3:.2)*(.6+.4*pu));g.restore()}
  if(on){g.strokeStyle='rgba(255,210,130,'+(.5+.4*pu)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+4,40+pu*8,14+pu*3,0,0,7);g.stroke();
    /* คลื่นเสียง */for(let k=0;k<3;k++){const p=(T*.7+k/3)%1;g.strokeStyle='rgba(255,220,150,'+(.5*(1-p))+')';g.lineWidth=1.6;g.beginPath();g.arc(x,y-30,14+p*40,-2.6,-.5);g.stroke()}
    if(PAS.lp===i){const p=Math.min(1,PAS.lt/1);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-78,11,0,7);g.stroke();g.strokeStyle='#ffd08a';g.lineWidth=3.4;g.beginPath();g.arc(x,y-78,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}}
  if(heard){const t0=PAS.gl[i];const k=t0?Math.min(1,(performance.now()-t0)/900):1,idx=(PAS.go&&PAS.go[i]!==undefined)?PAS.go[i]:i;try{paGlyph(idx,x,y-96-6*Math.sin(T*1.4+i),k*(.7+.2*pu),T)}catch(e){}}}
/* ---------- เอฟเฟกต์บนพื้น ---------- */
function paGroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();
  /* รังกัดแผ่นดิน: แสงเรืองจากรู */(MAPS[43].nests||[]).forEach(([x,y],i)=>{if(!palVis(x,y,90))return;g.save();g.globalCompositeOperation='lighter';glowAt(x,y+2,40,'255,150,60',.14+.1*Math.sin(T*1.7+i));g.restore()});
  /* หลุมดินถล่ม (ชั่วคราว) */PAS.hole=PAS.hole.filter(h=>T-h.t<4);for(const h of PAS.hole){const k=Math.min(1,(T-h.t)/.25),f=Math.max(0,1-Math.max(0,T-h.t-3));g.globalAlpha=f;g.fillStyle='rgba(20,12,6,.85)';g.beginPath();g.ellipse(h.x,h.y,46*k,17*k,0,0,7);g.fill();g.fillStyle='rgba(60,40,24,.8)';g.beginPath();g.ellipse(h.x,h.y-3,46*k,9*k,0,Math.PI,0);g.fill();g.globalAlpha=1}
  /* วงเตือนดินถล่ม / หินร่วง */for(const w of PAS.warn){const k=1-w.t/w.d,rock=w.rk;g.strokeStyle=rock?'rgba(255,220,150,'+(.4+.5*k)+')':'rgba(255,150,70,'+(.45+.5*k)+')';g.lineWidth=2.4;g.beginPath();g.ellipse(w.x,w.y,52,21,0,0,7);g.stroke();
    if(rock){g.fillStyle='rgba(0,0,0,'+(.15+.3*k)+')';g.beginPath();g.ellipse(w.x,w.y,40*k+8,15*k+3,0,0,7);g.fill()}
    else{g.strokeStyle='rgba(255,'+(140+80*k|0)+',60,'+(.5+.5*k)+')';g.lineWidth=2;const R=depRng(w.s);for(let c=0;c<5;c++){let px=w.x,py=w.y,a=R()*6.283;g.beginPath();g.moveTo(px,py);for(let s=0;s<3;s++){a+=(R()-.5)*.8;px+=Math.cos(a)*16*k;py+=Math.sin(a)*7*k;g.lineTo(px,py)}g.stroke()}}}
  /* สปอร์อำพันลอยขึ้นจากเหว */g.globalCompositeOperation='lighter';for(const[x,y0,ph,s]of PAN.sp){const q=((T*(.05+s*.04)+ph)%1),y=y0-q*520,x2=x+Math.sin(T*.6+ph*3)*18;if(!palVis(x2,y,8)||paCd(x2,y)>0)continue;glowAt(x2,y,3+s*2.6,'255,190,90',.7*Math.sin(q*Math.PI))}
  /* หิ่งห้อยบนยอดไม้ */for(const[x,y,ph]of PAN.ff){if(!palVis(x,y,20))continue;const q=Math.sin(T*1.4+ph);if(q<.3)continue;glowAt(x+Math.sin(T*.7+ph)*14,y-14+Math.cos(T*.9+ph)*8,4,'220,255,150',(q-.3)*1.1)}
  g.globalCompositeOperation='source-over';
  /* ชาวค่ายที่ติดอยู่ / ที่ช่วยแล้ว */
  {const st=stCur(),q=me.sty,act=!!(st&&st.pacr&&q&&q.a===1),done=p6Past('pacr');PAS.yim=done||(act&&((q.pacr|0)&1));
    for(let i=0;i<5;i++){const res=done||(act&&((q.pacr|0)>>i&1));if(!res&&!act)continue;
      if(!res){const[x,y]=PAFP[i];if(!palVis(x,y-20,90))continue;
        /* พื้นใต้เท้าร้าว + ป้ายเตือน */g.strokeStyle='rgba(255,150,70,'+(.45+.3*Math.sin(T*3+i))+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+14,34,12,0,0,7);g.stroke();
        if(i===4)for(let k=0;k<3;k++)paGoat(x+[-40,34,-20][k],y+[6,12,30][k],k===1?-1:1,T,k,1);
        try{paFolkV(x,y,me.x<x?-1:1,T,i,0)}catch(e){campFolk(x,y,{c:'#a86a3a',s:1.2,arm:-2.6+Math.sin(T*7)*.4},T)}
        g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10,30,'255,150,90',.22+.1*Math.sin(T*4+i));g.restore();
        if(PAS.rp===i){const p=Math.min(1,PAS.rt/1.5);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-54,11,0,7);g.stroke();g.strokeStyle='#ffd06a';g.lineWidth=3.4;g.beginPath();g.arc(x,y-54,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}
        else{const b=Math.sin(T*4+i)*3;g.font='15px system-ui';g.textAlign='center';g.fillText('🆘',x,y-50+b)}}
      else{const r0=PAS.run[i];if(r0&&T-r0.t<1){const k=T-r0.t,x=r0.x,y=r0.y-k*26;if(palVis(x,y-20,90)){g.globalAlpha=Math.max(0,1-k);try{paFolkV(x,y,me.x<x?-1:1,T,i,1)}catch(e){}g.globalAlpha=1;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-14,36,'255,236,170',.4*(1-k));g.restore()}continue}
        const[x,y,f]=PAFS[i];if(!palVis(x,y-20,60))continue;try{paFolkV(x,y,f,T,i,1)}catch(e){campFolk(x,y,{c:'#a86a3a',s:1.2},T)}}}}
  g.restore()}
/* ทับจอ: ฝุ่นลอย · ขอบจออุ่น · ป้ายเตือนเมื่อยืนบนขั้นดินแตก */
function paScreen(T,z,Hs){const Q=LOWQ;g.save();
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.34,SW0/2,Hs/2,Math.max(SW0,Hs)*.8);vg.addColorStop(0,'rgba(40,24,10,0)');vg.addColorStop(1,'rgba(40,24,10,.32)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  const n=Q?10:26;for(let i=0;i<n;i++){const R=depRng(i*31+43),x=((R()*SW0+T*(5+R()*7))%(SW0+20))-10,y=((R()*Hs-T*(2+R()*4))%(Hs+20)+Hs+20)%(Hs+20)-10,tw=.4+.6*Math.abs(Math.sin(T*(1+R())+i));g.fillStyle='rgba(230,200,150,'+(.32*tw)+')';g.fillRect(x,y,1.6,1.6)}
  if(PAS.fl>0){g.fillStyle='rgba(120,80,40,'+Math.min(.3,PAS.fl)+')';g.fillRect(0,0,SW0,Hs)}
  g.restore()}
/* ---------- ติ๊ก ---------- */
function paTick(dt,now,x,y,mv){
  if(paIn(x,y,-4)){PAS.lx=x;PAS.ly=y}else if(!paIn(x,y,-18)&&me.down<=0){me.x=PAS.lx;me.y=PAS.ly;x=me.x;y=me.y}
  PAS.fl=Math.max(0,PAS.fl-dt*1.6);const T=performance.now()/1000;
  for(const w of PAS.warn){w.t-=dt;if(w.t<=0&&!w.hit){w.hit=1;const rk=w.rk;if(!rk)PAS.hole.push({x:w.x,y:w.y,t:T});setTimeout(()=>{PAS.fl=.3;try{shk=Math.max(shk,.22)}catch(e){}try{sfx('boom')}catch(e){}
        try{burst(w.x,w.y-6,rk?['#8a8478','#5a4a3a','#c8b8a0']:['#6a5236','#8a7050','#c8a070'],26,150,.8,{g:280})}catch(e){}
        if(curMap===43&&Math.hypot(me.x-w.x,(me.y-w.y)*2.4)<54&&me.down<=0&&!gmGod&&!(me.inv3>0)){const d=Math.round(me.mh*.08);me.hp=Math.max(1,me.hp-d);PAS.hk=(PAS.hk|0)+1;PAS.hd=d;try{mtCd=3}catch(e){}try{dn.push({x:me.x,y:me.y-60,v:rk?'🪨 หินร่วง!':'🪨 ดินถล่ม!',t:1.2,col:'#ffc890'})}catch(e){}}},rk?260:120)}}
  PAS.warn=PAS.warn.filter(w=>!w.hit);
  {const onK=paK(x,y,0)>=0,onR=paRim(x,y,270);if(!SD.on&&me.down<=0&&!paSafe(x,y)&&(onK||onR)){PAS.mt-=dt;if(PAS.mt<=0){PAS.mt=4.5+Math.random()*3;for(let k=0;k<8;k++){const a=Math.random()*6.283,r=Math.random()<.4?0:50+Math.random()*200,bx=x+Math.cos(a)*r,by=y+Math.sin(a)*r*.7,bk=paK(bx,by,24)>=0,br=paRim(bx,by,262)&&paCd(bx,by)>14&&paOnB(bx,by,0)<0;
      if((bk||br)&&!paSafe(bx,by)&&!PAFP.some(([fx,fy])=>Math.hypot(bx-fx,by-fy)<80)){PAS.warn.push({x:bx,y:by,t:1.25,d:1.25,rk:bk?1:0,s:(Math.random()*1e4)|0});break}}}}}
  /* ช่วยชาวค่าย */
  const st=stCur(),q=me.sty;
  if(st&&q&&q.a===1&&st.pacr){let near=-1;for(let i=0;i<5;i++){if((q.pacr|0)>>i&1)continue;const[fx,fy]=PAFP[i];if(Math.hypot(x-fx,y-fy)<72)near=i}
    if(near!==PAS.rp){PAS.rp=near;PAS.rt=0}
    if(near>=0&&me.down<=0){PAS.rt+=dt;if(PAS.rt>=1.5){q.pacr=(q.pacr|0)|(1<<near);let n=0;for(let k=0;k<5;k++)if(q.pacr>>k&1)n++;q.n=n;const[fx,fy]=PAFP[near];PAS.run[near]={x:fx,y:fy,t:T};PAS.rp=-1;PAS.rt=0;
      PALG.card={h:PAFOLK[near][0]+' · ปลอดภัย '+n+'/5',t:PAFOLK[near][1],s:now,d:10};try{sfx('quest')}catch(e){}try{burst(fx,fy-20,['#ffe0a0','#ffffff','#c8f0a0'],30,150,1,{glow:1,g:-40})}catch(e){}try{stHud();writeSave()}catch(e){}}}}
  else{PAS.rp=-1;PAS.rt=0}
  /* ฟังรากเรืองแสง (ภาพสลักขึ้นตามลำดับที่ฟัง) */
  if(st&&q&&q.a===1&&st.parr){let near=-1;for(let i=0;i<5;i++){if((q.parr|0)>>i&1)continue;const[rx,ry]=PARP[i];if(Math.hypot(x-rx,y-ry)<64)near=i}
    if(near!==PAS.lp){PAS.lp=near;PAS.lt=0}
    if(near>=0&&me.down<=0){PAS.lt+=dt;if(PAS.lt>=1){let n=0;for(let k=0;k<5;k++)if((q.parr|0)>>k&1)n++;q.parr=(q.parr|0)|(1<<near);q.n=n+1;PAS.go=PAS.go||{};PAS.go[near]=n;q.paro=(q.paro|0)+(n<<(near*3));PAS.gl[near]=performance.now();PAS.lp=-1;PAS.lt=0;
      PALG.card={h:PAROOT[n][0]+' · '+(n+1)+'/5',t:PAROOT[n][1],s:now,d:11};try{sfx('quest')}catch(e){}const[rx,ry]=PARP[near];try{burst(rx,ry-40,['#ffd08a','#ffffff','#c8f0a0'],30,140,1,{glow:1,g:-50})}catch(e){}try{stHud();writeSave()}catch(e){}}}}
  else{PAS.lp=-1;PAS.lt=0}}
/* ลำดับภาพสลักที่ฟังแล้ว (เก็บในเซฟ paro: 3 บิตต่อราก) */
function paGo(){const q=me.sty;if(!q)return;PAS.go=PAS.go||{};const o=q.paro|0;for(let i=0;i<5;i++)if((q.parr|0)>>i&1)PAS.go[i]=(o>>(i*3))&7}
/* มอนเดินบนพื้น: ตัวกัดหิน/ยักษ์ดินถล่มไม่เดินลงเหว (ค้างคาวบินได้) */
function paMons(){if(curMap!==43)return;for(const m of mons){if(m.t>=3||m.t===1||m.dum||m.pv||m.wb)continue;const px=m._px,py=m._py;if(px===undefined){m._px=m.x;m._py=m.y;continue}
  if(!paIn(m.x,m.y,4)){if(paIn(m.x,py,4))m.y=py;else if(paIn(px,m.y,4))m.x=px;else if(paIn(px,py,4)){m.x=px;m.y=py}}m._px=m.x;m._py=m.y}}
/* ออโต้เควส */
function paAqT(st){const q=me.sty;if(!q)return null;const isR=!!st.parr,L=isR?PARP:PAFP,bits=(isR?q.parr:q.pacr)|0;let b=-1,bd=1e9;for(let i=0;i<5;i++){if(bits>>i&1)continue;const[x,y]=L[i],d=curMap===43?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b=i}}if(b<0)return null;
  const n=bits.toString(2).split('1').length-1,[x,y]=L[b];return{mp:43,act:'reach',x,y:y+(isR?30:34),lb:isR?'ไปฟังรากเรืองแสง ('+n+'/5)':(b===4?'ข้ามสะพานรากไปช่วยลุงเสือบนยอดไม้':'ไปช่วยชาวค่ายที่โบกมือ')+' ('+n+'/5)'}}
/* กลางคืน: โคม กองไฟ มอส แสงเมืองใต้ดิน */
function paNight(){if(curMap!==43||isDg())return;let k=0;try{k=Math.max(0,Math.min(1,dnState().dk/.42))}catch(e){}if(k<.05)return;const T=performance.now()/1000;g.save();if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);g.globalCompositeOperation='lighter';
  for(const[x,y]of PAN.fl||[]){if(!palVis(x,y-50,60))continue;glowAt(x+12,y-50,24,'255,190,110',(.42+.06*Math.sin(T*4+x))*k);glowAt(x+12,y,30,'255,190,110',.1*k)}
  if(palVis(PAREF.x+110,PAREF.y,200)){const f=.7+.3*Math.sin(T*9)*Math.sin(T*5.3);glowAt(PAREF.x+110,PAREF.y+20,150*f,'255,170,90',.32*k)}
  for(const K of PAK){if(!palVis(K.x,K.y,K.rx+60))continue;glowAt(K.x,K.y,K.rx*1.2,'190,255,130',.16*k)}
  for(const[x,y,s]of PAN.cl||[]){if(!palVis(x,y,20))continue;glowAt(x,y,14*s,'255,180,80',.3*k)}
  PARP.forEach(([x,y],i)=>{if(palVis(x,y-30,60))glowAt(x,y-30,40,'255,190,90',.18*k)});
  {const N=MAPS[43].npc;if(N&&N.x>0&&palVis(N.x,N.y,60))glowAt(N.x+12,N.y-18,46,'120,255,220',.35*k)}
  g.restore()}
/* ---------- ประตู: ค่าย (บันไดเชือกลงรอยแยก) · แมพ 43 (ทางลาดดินขึ้นค่าย) ---------- */
function paGateDraw(G){const T=performance.now()/1000,x=G.x,y=G.y;
  if(G.pa===1){/* บันไดเชือกห้อยลงรอยแยก */g.save();g.fillStyle='#120a06';g.beginPath();g.moveTo(x-46,y+2);g.quadraticCurveTo(x-10,y-14,x+44,y-4);g.quadraticCurveTo(x+10,y+22,x-46,y+2);g.closePath();g.fill();
    g.save();g.globalCompositeOperation='lighter';glowAt(x,y+2,52,'255,170,80',.35+.1*Math.sin(T*2));g.restore();
    for(const s of[-1,1]){g.strokeStyle='#5a3e24';g.lineWidth=4;g.beginPath();g.moveTo(x+s*16,y-34);g.lineTo(x+s*16,y+2);g.stroke();g.fillStyle='#7a5a3a';g.fillRect(x+s*16-3.5,y-38,7,5)}
    g.strokeStyle='#c8a868';g.lineWidth=1.8;for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*16,y-30);g.quadraticCurveTo(x+s*11,y-12,x+s*8,y+8);g.stroke()}for(let k=0;k<4;k++){const yy=y-24+k*8;g.beginPath();g.moveTo(x-15+k*1.6,yy);g.lineTo(x+15-k*1.6,yy);g.stroke()}
    g.fillStyle='#d83a2e';g.beginPath();g.moveTo(x+16,y-38);g.lineTo(x+30,y-34+Math.sin(T*3)*1.6);g.lineTo(x+16,y-28);g.closePath();g.fill();g.restore()}
  else{/* ทางลาดดิน + ป้ายชี้ขึ้นค่าย */g.save();g.fillStyle='rgba(120,96,64,.85)';g.beginPath();g.moveTo(x-40,y+20);g.lineTo(x-26,y-40);g.lineTo(x+26,y-40);g.lineTo(x+40,y+20);g.closePath();g.fill();
    g.fillStyle='#8a6a44';for(let k=0;k<5;k++){const yy=y+12-k*12,w=36-k*2.6;g.fillRect(x-w,yy-3,w*2,5);g.fillStyle=k%2?'#8a6a44':'#7a5a3a'}
    g.strokeStyle='#4a3420';g.lineWidth=3;g.beginPath();g.moveTo(x+44,y+14);g.lineTo(x+44,y-36);g.stroke();g.fillStyle='#a8845a';g.beginPath();g.moveTo(x+30,y-50);g.lineTo(x+62,y-50);g.lineTo(x+70,y-42);g.lineTo(x+62,y-34);g.lineTo(x+30,y-34);g.closePath();g.fill();g.strokeStyle='#3a2414';g.lineWidth=1.2;g.stroke();
    g.fillStyle='#2a1c10';g.font='bold 8px system-ui';g.textAlign='center';g.fillText('↑ ค่าย',x+48,y-39);g.restore()}
  const lb=(G.pa===1?'⬇ ทางลง: ':'⬆ ')+(G.nm||MAPS[G.to].n);g.save();g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,8,6,.85)';g.strokeText(lb,x,y-58);g.fillStyle=G.pa===1?'#ffd8a0':'#e8f0d0';g.fillText(lb,x,y-58);g.restore()}
/* รอยแยกแผ่นดินที่ทุ่งด้านใต้ของค่าย (เห็นตั้งแต่เริ่มภาค 10) */
const PACAMP=(()=>{const R=gxRng(4600),L=[];let x=PAGATE.x-160,y=PAGATE.y+34;for(let k=0;k<13;k++){L.push([x,y,4+R()*5,4+R()*5]);x+=22+R()*5;y+=-5+R()*7-(k<6?1.4:-1.2)}return L})();
function paCampDecal(){const T=performance.now()/1000,P=PACAMP,N=P.length;if(!palVis(PAGATE.x,PAGATE.y,300))return;g.save();g.lineJoin='round';g.lineCap='round';
  /* แอ่งดินยุบ (ขอบนุ่ม) */{g.save();g.translate(PAGATE.x,PAGATE.y+30);g.scale(1,.32);const gr=g.createRadialGradient(0,0,10,0,0,200);gr.addColorStop(0,'rgba(58,42,24,.6)');gr.addColorStop(.55,'rgba(92,70,42,.34)');gr.addColorStop(1,'rgba(92,70,42,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,200,0,7);g.fill();g.restore()}
  /* รอยร้าวแตกแขนง */g.strokeStyle='rgba(34,22,10,.7)';g.lineWidth=2.2;const R=depRng(4601);for(let k=1;k<N-1;k++){if(R()<.35){R();R();R();R();R();R();R();continue}let[px,py]=P[k];const s=R()<.5?-1:1;g.beginPath();g.moveTo(px,py);for(let q=0;q<3;q++){px+=(R()-.5)*24;py+=s*(7+R()*9);g.lineTo(px,py)}g.stroke()}
  /* ตัวรอยแยก: ขอบหยัก ข้างในมืด */const wd=k=>Math.sin(k/(N-1)*Math.PI);
  g.fillStyle='#5a4428';g.beginPath();P.forEach(([px,py,a],k)=>{const w=wd(k)*15+3+a*.4;k?g.lineTo(px,py-w-3):g.moveTo(px,py-w-3)});for(let k=N-1;k>=0;k--){const[px,py,,b]=P[k],w=wd(k)*12+3+b*.4;g.lineTo(px,py+w+3)}g.closePath();g.fill();
  g.fillStyle='#0c0603';g.beginPath();P.forEach(([px,py,a],k)=>{const w=wd(k)*13+2+a*.3;k?g.lineTo(px,py-w):g.moveTo(px,py-w)});for(let k=N-1;k>=0;k--){const[px,py,,b]=P[k],w=wd(k)*10+2+b*.3;g.lineTo(px,py+w)}g.closePath();g.fill();
  /* ผนังด้านไกลของรอยแยก (เห็นชั้นดิน) */g.fillStyle='rgba(120,88,52,.85)';g.beginPath();P.forEach(([px,py,a],k)=>{const w=wd(k)*13+2+a*.3;k?g.lineTo(px,py-w):g.moveTo(px,py-w)});for(let k=N-1;k>=0;k--){const[px,py,a]=P[k],w=wd(k)*13+2+a*.3;g.lineTo(px,py-w+wd(k)*7)}g.closePath();g.fill();
  g.save();g.globalCompositeOperation='lighter';for(let k=2;k<N-2;k+=2){const[px,py]=P[k];glowAt(px,py+2,26,'255,170,80',.2+.08*Math.sin(T*2+k))}g.restore();
  /* ก้อนดินที่ขอบ */for(let k=0;k<N;k++){const[px,py,a,b]=P[k],w=wd(k)*14+4;g.fillStyle='#6a5236';g.beginPath();g.ellipse(px+a-4,py-w-4,3+a*.5,2.2+a*.3,0,0,7);g.ellipse(px-b+3,py+w+4,2.6+b*.4,1.8+b*.3,0,0,7);g.fill()}
  /* หลักเชือกกั้น (ด้านเหนือ) + ธงแดง */const ST=[1,4,8,11].map(k=>[P[k][0],P[k][1]-46-wd(k)*6]);
  g.strokeStyle='rgba(200,168,104,.9)';g.lineWidth=1.5;for(let k=1;k<ST.length;k++){const[a1,b1]=ST[k-1],[a2,b2]=ST[k];g.beginPath();g.moveTo(a1,b1-20);g.quadraticCurveTo((a1+a2)/2,(b1+b2)/2-12+Math.sin(T*1.4+k)*1.5,a2,b2-20);g.stroke()}
  for(const[k,[px,py]]of ST.entries()){const w=Math.sin(T*2.6+k);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(px,py+1,5,2,0,0,7);g.fill();g.strokeStyle='#5a3e24';g.lineWidth=2.6;g.beginPath();g.moveTo(px,py);g.lineTo(px,py-26);g.stroke();
    g.fillStyle='#d83a2e';g.beginPath();g.moveTo(px,py-26);g.quadraticCurveTo(px+6,py-25+w,px+12,py-23+w*1.6);g.lineTo(px+11,py-17+w*1.6);g.quadraticCurveTo(px+5,py-19+w,px,py-18);g.closePath();g.fill()}
  /* รั้วแพะที่ล้มลงรอยแยก (ปลายตะวันออก) */{const[ex,ey]=P[N-2];g.strokeStyle='#6a4a2a';g.lineWidth=3;for(const[dx,tl]of[[-18,.5],[0,.9],[18,1.2]]){g.save();g.translate(ex+dx,ey-4);g.rotate(tl);g.beginPath();g.moveTo(0,0);g.lineTo(0,-18);g.stroke();g.restore()}g.strokeStyle='#8a6a44';g.lineWidth=2.2;g.beginPath();g.moveTo(ex-26,ey-14);g.lineTo(ex+16,ey-2);g.stroke()}
  g.restore()}
/* ---------- เนื้อเรื่องภาค 10 บทที่ 1 ---------- */
Object.assign(SPK,{thu:['ธุลี · เด็กคนรากลึก','🌱','#bfe8a0'],til43:SPK.til||['ทิล · เด็กจากค่ายผู้อพยพ','🧒','#ffc890']});STNPC.thu=[43,'npc'];STNPC.til43=[43,'npc2'];
STCH.push('ภาค 10 · บทที่ 1 · แผ่นดินทรุด');
{const C1=STCH.length-1;STY.push(
 {c:C1,g:'talk',k:'cmd',pas1:1,tx:'ภาค 10 เริ่มแล้ว (ภาคสุดท้าย) · แผ่นดินครางกลางดึก · คุยกับผู้บัญชาการเรนน์ที่ค่าย',
  pre:[['nar','คืนแรกหลังกลับจากห้วงดาว… ทั้งค่ายหลับสนิทเป็นครั้งแรกในรอบหลายปี ไม่มีใครต้องเฝ้ายามมองฟ้าอีกแล้ว'],
   ['nar','ฟ้าคืนนั้นสว่างจนแทบไม่ต้องจุดโคม ดาวทุกดวงที่เคยถูกทอไว้กลับมาส่องอยู่ที่เดิม เด็ก ๆ นอนนับดาวจนหลับคาเสื่อ',0,0,0,0,0,0,0,0,0,1],
   ['nar','สะพานดาวที่ทอขึ้นใหม่พาดโค้งข้ามฟ้า แสงเงินของมันส่องลงมาบนหลังคาเต็นท์ทุกหลัง เด็ก ๆ นอนชี้ทางเดินบนสะพานกันจนหลับคาเสื่อ',0,0,0,0,0,0,0,0,0,2],
   ['nar','แล้วตอนเที่ยงคืน แผ่นดินก็ครางขึ้นมาจากข้างใต้… เสียงทุ้มต่ำยาวนาน เหมือนใครสักคนแบกของหนักมานานเกินไปจนต้องถอนหายใจ'],
   ['nar','รุ่งเช้า เสาธงกลางค่ายเอียง น้ำในหม้อทุกใบกระฉอก และทุ่งเลี้ยงแพะทางใต้ของค่าย… หายไปทั้งทุ่ง'],
   ['cmd','(เรนน์ยืนอยู่หน้าแผนที่ค่าย รองเท้าเปื้อนดินถึงเข่า) ผู้ถือตรา… ข้าวัดหมุดกลางค่ายแล้ว เมื่อคืนทั้งค่ายทรุดลงไปหนึ่งคืบ ในคืนเดียว'],
   ['cmd','ทุ่งด้านใต้ถล่มลงไปเป็นเหว เต็นท์สิบสองหลังหายไปกับดิน คนส่วนใหญ่หนีขึ้นมาทัน… แต่ยังมีห้าคนติดอยู่บนขั้นดินที่ยังไม่ร่วง'],
   ['cmd','ทูตจากอารัณยาส่งนกมาตอนรุ่งสาง ระฆังของพวกเขาสั่นเองทั้งคืน ทั้งที่ไม่มีใครตี',0,0,0,0,0,1],
   ['cmd','หัวใจดวงใหม่กลางนครลี้ภัยเต้นช้าลงทั้งคืน… เหมือนมันกำลังฟังอะไรบางอย่างที่อยู่ลึกลงไปใต้เท้าเรา',0,0,0,0,0,2],
   ['til','(ทิลวิ่งหอบเข้ามา มือเปื้อนโคลน) ท่านผู้นำ! ข้าคลานไปดูที่ขอบเหวมาแล้ว ข้างล่างไม่มืดนะ… มันเรือง! มีแสงสีทองอยู่ลึกลงไปเหมือนตะเกียงเป็นร้อยดวง'],
   ['cmd','เราเปิดประตูให้ทุกเมือง ข้ามทะเลเมฆ ขึ้นไปถึงดวงดาว… แต่ไม่เคยมีใครในค่ายนี้มองลงไปใต้เท้าตัวเองเลยสักครั้ง'],
   ['cmd','ข้าส่งยามลงไปตั้งค่ายพักริมเหวไว้แล้ว ไปช่วยห้าคนนั้นขึ้นมาก่อนที่ดินจะร่วงอีก ทิลจะนำทาง… ทางลงอยู่ที่ทุ่งด้านใต้ ตรงรอยแยกที่มีธงแดง'],
   ['me','(ใต้ฝ่าเท้า… ข้าได้ยินเหมือนเสียงหัวใจเต้น ช้ามาก ช้าเหลือเกิน)']],rw:{g:160000}},
 {c:C1,g:'map',m:43,tx:'ไปปากเหวแผ่นดินทรุด (ทางลงที่รอยแยกธงแดง ทุ่งด้านใต้ของค่าย)',
  post:[['nar','ทุ่งที่เคยมีเสียงกระดิ่งแพะ กลายเป็นขั้นบันไดดินแตกระแหงไล่ลงไปสู่ความมืด ฝุ่นยังลอยฟุ้งไม่จางตั้งแต่เมื่อคืน'],
   ['nar','กลางเหวมีของที่ไม่มีใครคาดคิด… ยอดไม้ยักษ์สามยอดดันขึ้นมาจากข้างล่าง ใบของมันเป็นมอสเรืองแสงสีเขียวอมทอง และรากหนาเท่าลำเรือพาดข้ามเหวเหมือนสะพาน'],
   ['nar','ลึกลงไปอีก ลึกจนเสียงก้อนหินที่ร่วงลงไปไม่เคยกลับขึ้นมา… มีแสงอำพันวิบวับเป็นจุด ๆ เหมือนหน้าต่างของบ้านเป็นร้อยหลัง'],
   ['til43','ตรงนั้นแหละที่ข้าเห็น! ข้าว่ามีคนอยู่ข้างล่างนะ… ต้องเป็นคนแน่ ๆ สัตว์ที่ไหนจะจุดตะเกียงเป็น'],
   ['til43','💡 รอยแตกเรืองส้มบนพื้น = ดินตรงนั้นกำลังถล่ม รีบเดินออก! · บนยอดไม้ระวังหินร่วงจากผนังเหว · เดินได้บนดิน ยอดไม้ และสะพานรากเท่านั้น · ค่ายพักริมเหว (ทางเหนือ) ปลอดภัย']]},
 {c:C1,g:'clue',m:43,n:5,pacr:1,tx:'ช่วยชาวค่าย 5 คนที่ติดอยู่ริมเหว (ยืนข้างคนที่โบกมือ 🆘 1.5 วิ · ลุงเสืออยู่บนยอดไม้ ไปทางสะพานราก)',
  pre:[['til43','ห้าคนที่ติดอยู่ ข้าจำได้ทุกคน… ยายอิ่มคนขายขนมครก พี่โจ้ลูกช่างไม้ ตาทองดี มีนา แล้วก็ลุงเสือคนเลี้ยงแพะ'],
   ['til43','ทุกคนติดอยู่ตามขั้นดินคนละที่ ส่วนลุงเสือ… ลงไปตามแพะถึงบนยอดไม้โน่น! ต้องข้ามสะพานรากไปเท่านั้นถึงจะถึง']],
  post:[['nar','ลุงเสือเดินกลับขึ้นมาเป็นคนสุดท้าย ตามด้วยแพะสามตัวที่ปากยังเรืองแสงสีเขียว ทุกคนปลอดภัย… ยายอิ่มก่อไฟหยอดขนมครกแจกยามทันที'],
   ['nar','แล้วรากเรืองแสงที่โผล่อยู่ทั่วเหวก็ส่งเสียงหึ่งขึ้นพร้อมกัน… เสียงทุ้มต่ำเหมือนระฆังที่ถูกตีอยู่ใต้น้ำ'],
   ['til43','ท่านได้ยินไหม… รากพวกนั้นร้องเพลง! ตรงที่มันเรืองแรงที่สุด ข้าเห็นมีรอยสลักอยู่ด้วย']],rw:{g:120000}},
 {c:C1,g:'clue',m:43,n:5,parr:1,tx:'ฟังรากเรืองแสง 5 จุด (ยืนข้างโค้งรากที่สั่นกังวาน 1 วิ · บางจุดอยู่บนยอดไม้กลางเหว)',
  pre:[['til43','รอยสลักบนรากไม่ใช่ตัวหนังสือของค่ายเรา ไม่ใช่ของอัสตราด้วย… มันเป็นรูปภาพ! ท่านลองไปฟังใกล้ ๆ สิ']],
  post:[['nar','รากเส้นสุดท้ายหยุดสั่น… แล้วทั้งเหวก็สั่นแทน ดินบนขั้นบันไดแตกออก หนอนเกราะหินตัวยาวมุดขึ้นมาจากรอยร้าว ค้างคาวปีกเรืองแสงพุ่งออกมาจากใต้ราก'],
   ['nar','และจากผนังเหวด้านตะวันออก ดินทั้งก้อนลุกขึ้นยืนเป็นยักษ์ ทั้งที่บนหลังยังมีเต็นท์ของชาวค่ายติดอยู่'],
   ['til43','พวกมันกัดราก! ดูสิ ตรงที่โดนกัด แสงเรืองดับไปเลย… ไล่มันไปเร็ว ก่อนรากจะขาด!']],rw:{g:110000}},
 {c:C1,g:'kill',m:43,n:40,tx:'ขับไล่ตัวกัดหิน ค้างคาวรากเรือง และยักษ์ดินถล่มที่กัดรากต้นค้ำ',
  post:[['nar','ตัวกัดหินตัวสุดท้ายมุดหนีลงไปในเหว… ความเงียบกลับมาอีกครั้ง มีแต่เสียงดินร่วนไหลลงไปเบา ๆ'],
   ['nar','แล้วแสงดวงเล็ก ๆ สีเขียวฟ้าดวงหนึ่ง ก็ค่อย ๆ ไต่ขึ้นมาตามรากที่ใหญ่ที่สุด ทีละคืบ… ทีละคืบ'],
   ['til43','มีคน… มีคนปีนขึ้นมา! เด็กผู้หญิง! ตรงปลายสะพานรากด้านเหนือ!']],rw:{g:100000}},
 {c:C1,g:'talk',k:'thu',pac1:1,tx:'คุยกับเด็กหญิงที่ปีนรากขึ้นมาจากก้นเหว (ปลายสะพานรากด้านเหนือ)',
  pre:[['nar','เด็กหญิงตัวเล็กกว่าทิลเสียอีก ผิวของเธอมีลายเหมือนเปลือกไม้อ่อน ผมเป็นมอสเรืองแสงสีเขียว ในมือถือโคมที่ทำจากดอกเห็ดเรืองแสง'],
   ['nar','เธอปีนพ้นขอบเหว เงยหน้าขึ้น… แล้วก็ตัวแข็งค้างอยู่อย่างนั้น'],
   ['thu','…'],
   ['thu','นั่น… นั่นคืออะไร? เพดานมันสูงขนาดนั้นเลยหรือ? ทำไมมันกว้างแบบนั้น… ทำไมมันไม่มีรากห้อยลงมาเลยสักเส้น?'],
   ['til43','(ทิลกระซิบ) …เธอไม่เคยเห็นฟ้ามาก่อนเลยเหรอ'],
   ['thu','(เด็กหญิงหันมา ตาสีอำพันกลมโต) ข้าชื่อธุลี… ข้าเป็นคนรากลึก มาจากนครรากลึก ลึกลงไปใต้ตรงนี้ ใต้ทุกที่ที่พวกท่านเดิน'],
   ['thu','ต้นค้ำแผ่นดินกำลังจะตาย… ยางทองที่มันดื่มแห้งลงทุกปี แล้วฝูงตัวกัดแผ่นดินก็มากัดรากมันทุกคืน เมื่อคืนต้นที่อยู่ใต้ค่ายของท่านเสียรากไปหนึ่งราก แผ่นดินข้างบนเลยทรุด'],
   ['thu','เฒ่าแก่นไม้ห้ามไม่ให้ใครขึ้นมา ท่านว่าข้างบนไม่มีใครรู้จักเรา ไม่มีใครจำเราได้… แต่ข้าคิดว่า ถ้าไม่มีใครขึ้นมาถาม ข้างบนก็จะไม่มีวันรู้'],
   ['thu','ผู้ถือตรา… ท่านที่เปิดประตูให้ทุกเมือง ลงไปข้างล่างกับข้าได้ไหม? ไปช่วยเราแบกแผ่นดินนี้'],
   ['me','(ใต้เท้าเรา มีเมืองทั้งเมืองแบกเราไว้มาตลอด… และเราไม่เคยรู้เลย)'],
   ['til43','ข้าไปด้วย! …ขอไปด้วยนะท่านผู้นำ ข้าจะคอยจำทางขึ้นไว้ ธุลีจะได้กลับขึ้นมาดูฟ้าอีกบ่อย ๆ'],
   ['thu','(ธุลียิ้มเป็นครั้งแรก แล้วชูโคมเห็ดขึ้นส่องฟ้า) ข้าจะจำสีนี้ไว้ จะเอาลงไปเล่าให้ทุกคนข้างล่างฟัง']],
  post:[['nar','🌳 — จบภาค 10 บทที่ 1 · แผ่นดินทรุด — บทต่อไป: นครรากลึก (เร็ว ๆ นี้)']],rw:{g:160000,s3:10}})}
/* ---------- ลงทะเบียน ---------- */
setTimeout(()=>{try{
    MAPS[1].gates.push({x:PAGATE.x,y:PAGATE.y,to:43,req:1,pa1:1,pa:1,nm:'ปากเหวแผ่นดินทรุด',arr:{x:1600,y:330}});
    const Mb=MAPS[38];MAPS[43]=Object.assign({},Mb,{n:'ปากเหวแผ่นดินทรุด',mth:45,sx:1600,sy:330,sr:110,seed:431,bg:'#6a8648',tile:'#728450',safe:'#8a7a58',ring:'#ffd8a0',t1:'#3e5a2e',t2:'#728450',d1:'#8a7a58',d2:'#ffffff',bth:45,fsw:[],
      gates:[{x:1600,y:150,to:1,req:1,pa:2,nm:'ค่ายผู้อพยพ',arr:{x:PAGATE.x,y:PAGATE.y-86}}],npc:{x:-9999,y:-9999,n:'ธุลี · เด็กคนรากลึก',L:22},npc2:{x:1790,y:404,n:'ทิล · เด็กจากค่ายผู้อพยพ'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[760,1060],[2440,1060],[520,1800],[2700,1850],[900,2650],[2300,2700],[1600,2900],[2880,1300],[340,1350]]});
    FIELDM[43]=1;BTR[45]='255,190,110';GLOWC[43]='200,255,140';FXST[45]='root';BTC[45]=['#f4e8c8','#8a6a3a','#ffffff'];TIER[43]=[88,25.4,3.36];
    WRG[43]={1:{rg:250,cd:2.0,spd:330,dm:.9,k:'seed',c:'255,190,90'},2:{rg:240,cd:2.8,spd:240,dm:1.4,k:'seed',c:'140,120,100',big:1}}}catch(e){console.warn('pa map',e)}
  try{NPC3[43]={d:thuD0,s:['ข้างบนนี้ลมพัดมาจากทุกทางเลย… ข้างล่างลมพัดมาทางเดียว','ทิลบอกว่าก้อนขาว ๆ ที่ลอยอยู่เรียกว่าเมฆ มันนุ่มไหม?','เฒ่าแก่นไม้คงโกรธข้าแน่ ๆ … แต่ข้าไม่เสียใจเลย','ฟังสิ… รากกำลังร้องเพลงกล่อมอยู่','ข้าจะพาท่านลงไปเร็ว ๆ นี้ ทางลงยังไม่ปลอดภัย'],hy:46};
    if(typeof npvW==='function')NPC3[43].d=npvW((x,y,f,t)=>thuV(x,y,f,t),thuD0)}catch(e){}
  try{Object.assign(DEPM,{43:'sink'});DEP4.sink={fog:'150,120,84',fa:.1,bd:.16};AMB2.sink=['rgba(255,236,190,.16)','rgba(30,20,10,.44)','255,220,160']}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.pacr||st.parr)return paAqT(st);return _q(st)}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{paNight()}catch(e){}}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===43&&!paIn(x,y,10))return false;return _aw(x,y)}}catch(e){}
  try{const _tm=terMons;window.terMons=terMons=function(){const r=_tm.apply(this,arguments);try{paMons()}catch(e){}return r}}catch(e){}
  try{const _dg=drawGate;window.drawGate=drawGate=function(){if(curMap===1)try{if(gPAon())paCampDecal()}catch(e){}return _dg.apply(this,arguments)}}catch(e){}
  try{WMN[43]=[58,872,'ปากเหวแผ่นดินทรุด','🕳️'];WMLV[43]=[156,160]}catch(e){}
  try{NMLR[43]=[[760,1060],[2440,1060],[520,1800],[2700,1850],[900,2650]]}catch(e){}
  /* เอฟเฟกต์คัตซีน: รอยแยกแผ่นดิน (แสงอำพันจากข้างใต้) · ฝุ่นดินร่วง */
  try{if(typeof CZFX!=='undefined'&&!CZFX.ecrack){CZFX.ecrack=(t,a)=>{const y0=H*.6,k=Math.min(1,t/1.4),n=22,pts=[];for(let i=0;i<=n;i++){const q=i/n;if(q>k)break;pts.push([W*(.03+q*.94),y0+(czRnd(i+70)*2-1)*H*.05+Math.sin(q*7)*8])}if(pts.length<2)return;g.save();
      g.globalCompositeOperation='lighter';for(let w=28;w>0;w-=6){g.strokeStyle='rgba(255,160,70,'+(.07*a*(32-w)/6)+')';g.lineWidth=w;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke()}
      g.globalCompositeOperation='source-over';g.strokeStyle='rgba(14,8,4,'+(.95*a)+')';g.lineWidth=5;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();
      g.lineWidth=1.8;for(let i=2;i<pts.length;i+=2){const p=pts[i],s=i%4?1:-1;g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(p[0]+(czRnd(i+80)*2-1)*34,p[1]+s*(16+czRnd(i+81)*26));g.stroke()}
      for(let i=0;i<(LOWQ?10:26);i++){const q=(t*.32+czRnd(i+90))%1;g.fillStyle='rgba(160,128,86,'+(.55*a*(1-q))+')';g.fillRect(czRnd(i+91)*W,q*H*.75,2.2,2.2)}g.restore()};
    CZFX.dust=(t,a)=>{for(let i=0;i<(LOWQ?14:34);i++){const q=(t*.22+czRnd(i+120))%1,x=czRnd(i+121)*W+Math.sin(t+i)*10;g.fillStyle='rgba(176,140,96,'+(.5*a*Math.sin(q*Math.PI))+')';g.beginPath();g.arc(x,q*H,1.2+czRnd(i+122)*1.8,0,7);g.fill()}}}}catch(e){}
  try{CZDEF.pao={nm:'ภาค 10 · แผ่นดินที่แบกฟ้า',sub:'บทเปิด · ภาคสุดท้าย',mp:1,get:()=>{const s=czFirst(czCh('ภาค 10 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 10','แผ่นดินที่แบกฟ้า'],
    shots:[{i:0,cam:'sky',z:.62,dz:-.01,fx:['night','stars'],title:1,sfx:'gate'},
     {m:'ดาวทุกดวงที่เคยถูกทอไว้',cam:'sky',z:.66,fx:['night','stars','fallstars']},
     {m:'สะพานดาวที่ทอขึ้นใหม่',cam:'sky',z:.66,fx:['night','stars','bridge']},
     {m:'แผ่นดินก็ครางขึ้นมา',cam:'me',z:.95,fx:['night','ecrack','dark'],shake:.55,sfx:'boss'},
     {m:'หายไปทั้งทุ่ง',cam:[PAGATE.x,PAGATE.y+10],z:.82,fx:['dark','rise','dust'],sfx:'ek_growl'},
     {m:'หนึ่งคืบ',cam:'npc:cmd',z:1.35},
     {m:'ห้าคนติดอยู่',cam:[PAGATE.x,PAGATE.y],z:.95,fx:['rise']},
     {m:'มันเรือง!',cam:'me',z:1.25,fx:['rise'],sfx:'quest'},
     {m:'ไม่เคยมีใครในค่ายนี้มองลงไป',cam:'mid:cmd',z:1.15},
     {m:'ใต้ฝ่าเท้า',cam:'me',z:1.8,fx:['palm','roots']}]};CZORD.push('pao');CZMAP=null}catch(e){console.warn('pa cz',e)}
  /* ธุลีโผล่ที่ปลายสะพานรากด้านเหนือตั้งแต่ขั้นคุยกับเธอ · ลำดับภาพสลักจากเซฟ */
  setInterval(()=>{try{const N=MAPS[43]&&MAPS[43].npc;if(!N)return;if(p6From('pac1')){N.x=PATHU.x;N.y=PATHU.y}else{N.x=-9999;N.y=-9999}if(curMap===43&&me.sty&&me.sty.parr&&!(PAS.go&&Object.keys(PAS.go).length))paGo()}catch(e){}},600);
},0);
