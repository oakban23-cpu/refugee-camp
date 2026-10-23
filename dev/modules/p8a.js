/* ---------- v495 ภาค 8 บทที่ 1 · เสียงตอบจากทะเลเมฆ (แมพ 38 · ผาท่าเรือเมฆ) ----------
   แมพ 38 (37 ใช้เป็นธีมมอนดันเจี้ยนเตาหลอมอยู่แล้ว): หน้าผาริมทะเลเมฆทางตะวันออกเฉียงใต้ของค่าย · แผ่นดินฝั่งตะวันตก ขอบผาคดเคี้ยว
   สะพานไม้ 3 สายยื่นออกไปกลางเมฆ · ประภาคารบนแหลมเหนือ · ซากเรือเหาะที่แหลมใต้ · ลานไม้ท่าเรือ + เต็นท์พยาบาล
   มอน Lv 134–138 (ธีม 38): ฉลามเมฆ · นกนางนวลพายุ (ยิงสายฟ้า) · ยักษ์เพรียงหิน (ปาเพรียง) */
const PHLH={x:2300,y:600},PHLB={x:2300,y:690},PHMED={x:1860,y:1760},PHWR={x:2170,y:2650},PHANC={x:2010,y:1600};
const PHPIER=[[1250,2960,40],[1700,2990,46],[2150,2930,40]];/* [y, ปลายสะพาน x, ครึ่งความกว้าง] */
const PHPATH=[[[330,1600],[760,1560],[1150,1640],[1500,1660],[1800,1700]],[[1800,1700],[1930,1400],[2060,1080],[2200,820],[PHLB.x,PHLB.y+40]],[[1800,1700],[1880,2050],[1990,2380],[2120,2560]],[[1150,1640],[1060,1250],[980,820]],[[1150,1640],[1080,2100],[1150,2560]]];
const PHZN={meadow:['ทุ่งหญ้าลมทะเลเมฆ','หญ้าทุกต้นเอนไปทางเดียวกัน ทางที่ลมพัดมาจากขอบฟ้า'],harbor:['ท่าเรือเมฆเก่า','สมัยที่ค่ายยังกล้าตกปลาเมฆ ที่นี่เคยคึกคัก'],pier:['สะพานไม้เหนือทะเลเมฆ','มองลงไปข้างล่าง… มีแต่เมฆสุดสายตา'],
  light:['ประภาคารผาเหนือ','ไฟดวงสุดท้ายของท่าเรือ ดับไปก่อนใครในค่ายจะจำได้'],wreck:['จุดเรือเหาะตก','ซากเรือ «ฟ้าเที่ยง» ค้างอยู่บนขอบผา แกนดาวยังเต้นอ่อน ๆ'],cliff:['ขอบผาริมเมฆ','ลมแรงจนต้องก้มตัวเดิน']};
const PHLORE=['บอร์ก ช่างซ่อมใบเรือ: «ข้าเกิดบนเรือ พ่อข้าก็เกิดบนเรือ… พื้นดินที่นิ่งแบบนี้ทำข้าเวียนหัว ฮะ ๆ ขอบใจนะ»',
 'ลินา ต้นเรือฝึกหัด: «เรามาตามเพลง… ยายเมฆาบอกว่าเพลงกล่อมนี้มีสี่ท่อน แต่คนบนแผ่นดินจำได้แค่สามท่อน»',
 'โอเว่น คนเฝ้าเครื่องดาว: «แกนดาวของเรือเหลือแสงไม่ถึงสิบคืน… ทุกลำในกองเรือก็เหมือนกัน อย่าบอกกัปตันว่าข้าบอก»',
 'มิรา หมอประจำเรือ: «เรากินแต่ปลาเมฆมาสามเดือน เด็ก ๆ บนเรือไม่เคยเห็นผลไม้สักลูก… ที่นี่มีต้นไม้จริง ๆ ด้วย»',
 'ฮาเกน ทหารเรือเฒ่า: «สามร้อยปีก่อน เงามหึมาใต้เมฆกลืนเกาะนาวาลัยของเราไปทั้งเกาะ เราลอยหนีมาตั้งแต่นั้น ไม่เคยแตะแผ่นดินอีกเลย… จนวันนี้»'];
const PHSC=['#c2352b','#3b7bd6','#d8a040','#6aa040','#8a5ac8'];
let PHN={gl:[],cl:[],gr:[],w:[]},PHS={lx:330,ly:1600,carry:-1,pk:-1,pt:0,lt:0,lp:0};
/* ขอบผา: แผ่นดินอยู่ฝั่งตะวันตกของเส้นนี้ · แหลมประภาคาร (เหนือ) และแหลมซากเรือ (ใต้) ยื่นออกไป */
function phEdge(y){return 2330+110*Math.sin(y/330+.7)+55*Math.sin(y/120+2.1)+300*Math.exp(-(((y-600)/170)**2))+180*Math.exp(-(((y-2650)/210)**2))}
function phPierAt(x,y,m){for(const[py,x1,hw]of PHPIER){if(Math.abs(y-py)<hw-m&&x>phEdge(py)-80&&x<x1-m)return true}return false}
function phIn(x,y,m){m=m||0;if(x<110+m||y<110+m||y>3090-m)return false;return x<phEdge(y)-m||phPierAt(x,y,m)}
function phSafe(x,y){return(x>1650&&y>950&&y<2350)||Math.hypot(x-PHWR.x,y-PHWR.y)<340||Math.hypot(x-PHLH.x,y-PHLH.y)<320||Math.hypot(x-330,y-1600)<380}
const phSegD=(x,y)=>{let d=1e9;for(const L of PHPATH)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d};
function phRS(){return[[2060,2860],[phEdge(2400)-80,2400],[1520,2670],[phEdge(960)-90,960],[1210,1450]]}
const phZone=(x,y)=>Math.hypot(x-PHWR.x,y-PHWR.y)<360?'wreck':Math.hypot(x-PHLH.x,y-PHLH.y)<330?'light':x>phEdge(y)-20?'pier':(x>1700&&y>1000&&y<2320)?'harbor':x>phEdge(y)-220?'cliff':'meadow';
const gP8s=()=>p6Past('p8s'),gP8sa=()=>p6From('p8sa'),gP8lit=()=>p6Past('p8lh');
/* ---------- สร้างฉาก ---------- */
function phBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(3838);
  const RS=phRS(),ok=(x,y,m)=>phIn(x,y,40+m)&&Math.hypot(x-M.sx,y-M.sy)>M.sr+80+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>120+m)&&phSegD(x,y)>64+m&&!(x>1680&&y>980&&y<2340)
    &&Math.hypot(x-PHWR.x,y-PHWR.y)>360+m&&Math.hypot(x-PHLH.x,y-PHLH.y)>260+m&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>120+m)&&RS.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>110+m);
  const I=(x,y,r)=>trees.push({x,y,r,inv:1,ns:1});
  /* ขอบผา + ข้างสะพาน = กำแพงล่องหน */
  for(let y=100;y<=3110;y+=26){if(PHPIER.some(([py,,hw])=>Math.abs(y-py)<hw+10))continue;I(phEdge(y)+20,y,22)}
  for(const[py,x1,hw]of PHPIER){for(let x=phEdge(py)-40;x<x1;x+=26){I(x,py-hw-20,22);I(x,py+hw+20,22)}for(let y=py-hw;y<=py+hw;y+=14)I(x1+12,y,18)}
  /* ประภาคาร · บ้านท่าเรือ · เต็นท์พยาบาล · สมอ · เครน */
  trees.push({x:PHLH.x,y:PHLH.y,r:50,k:'phlh',ht:340,hw:70,fw:60});
  trees.push({x:1990,y:1110,r:52,k:'phhouse',ht:150,hw:90,fw:80});
  trees.push({x:PHMED.x,y:PHMED.y,r:44,k:'phmed',ht:110,hw:80,fw:70});
  trees.push({x:PHANC.x,y:PHANC.y,r:20,k:'phanc',ht:90,hw:40});
  for(const[py]of PHPIER){const x=phEdge(py)-70;trees.push({x,y:py-80,r:18,k:'phcrane',ht:170,hw:50,v:py>1500?1:0})}
  /* ซากเรือเหาะ (ตัวเรือบนผาชนได้) */
  trees.push({x:PHWR.x,y:PHWR.y,r:0,k:'phwreck',ht:220,hw:260,fw:240,ns:1,nc:1});for(const[dx,dy,r]of[[-180,40,40],[-110,20,48],[-30,0,54],[50,-10,54],[130,-24,46],[210,-30,44],[290,-36,40]])I(PHWR.x+dx,PHWR.y+dy,r);
  /* เรือเล็กผูกที่สะพานกลาง (ลอยเหนือเมฆ) */
  trees.push({x:2800,y:1880,r:0,k:'phskiff',ht:120,ns:1,nc:1});
  /* ลังไม้ ถัง ขดเชือก รอบท่าเรือ */
  for(const[x,y,k]of[[2060,1220,'phcrate'],[2100,1250,'phbarrel'],[2140,1190,'phcrate'],[1900,1960,'phbarrel'],[1940,1990,'phcrate'],[2120,1560,'phrope'],[2160,2040,'phcrate'],[2200,2010,'phbarrel'],[1790,1450,'phrope'],[1760,2120,'phcrate']])trees.push({x,y,r:14,k,ht:40,v:(x+y)%3});
  /* ตะเกียงตามทางเดินและสะพาน */
  for(const[py,x1,hw]of PHPIER)for(let x=phEdge(py)+40;x<x1-30;x+=170)for(const s of[-1,1])trees.push({x,y:py+s*(hw-3),r:0,k:'phlamp',ht:80,ns:1,nc:1,v:s});
  for(const L of PHPATH)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=160;d<dl;d+=330){const t=d/dl,px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t;const x=px+46,y=py-6;if(Math.hypot(x-PHLH.x,y-PHLH.y)<120||Math.hypot(x-PHWR.x,y-PHWR.y)<300||!phIn(x,y,40))continue;trees.push({x,y,r:6,k:'phlamp',ht:80,v:0})}}
  /* ต้นไม้ลู่ลม หิน พุ่มไม้ */
  for(let i=0,n=0;i<1200&&n<46;i++){const x=150+R()*2300,y=160+R()*2880;if(!ok(x,y,0))continue;trees.push({x,y,r:16,k:'phtree',v:(R()*3)|0,sc:.85+R()*.45,ht:150,hw:48});n++}
  for(let i=0,n=0;i<900&&n<24;i++){const x=150+R()*2300,y=160+R()*2880;if(!ok(x,y,-20))continue;trees.push({x,y,r:18,k:'phrock',v:(R()*3)|0,sc:.8+R()*.6,ht:50,hw:36});n++}
  for(let i=0,n=0;i<900&&n<30;i++){const x=150+R()*2300,y=160+R()*2880;if(!ok(x,y,-40))continue;trees.push({x,y,r:0,k:'phbush',v:(R()*3)|0,sc:.8+R()*.5,ht:30,nc:1});n++}
  /* NPC2 นาวิน (+ทิล) */
  trees.push({x:2100,y:1700,r:0,k:'navin',ht:90,ns:1,nc:1});
  PHN.lamps=trees.filter(t=>t.k==='phlamp').map(t=>[t.x,t.y]);
  PHN.fl=[];for(let i=0;i<12;i++){const y=380+i*225+R()*70,x0=Math.max(phEdge(y)+300,2860);PHN.fl.push([Math.min(3165,x0+R()*Math.max(10,3165-x0)),y,R()*6])}
  PHN.gl=[];for(let i=0;i<180;i++)PHN.gl.push([150+R()*2300,150+R()*2900,R()*6]);
  PHN.cl=[];for(let i=0;i<46;i++)PHN.cl.push([2300+R()*1100,R()*3300,90+R()*120,R()*6,.4+R()*.6]);
  PHN.gr=[];for(let i=0;i<90;i++)PHN.gr.push([R()*3200,R()*3200,150+R()*260,R()]);
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc||t.k==='phwreck')return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
/* ---------- พื้น (แคชเป็นแผ่น) ---------- */
function phPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1;
  /* ทะเลเมฆ (ทั้งแผ่น) */
  const sg=c.createLinearGradient(2200,0,3300,0);sg.addColorStop(0,'#c9d8e8');sg.addColorStop(1,'#e8f0f8');c.fillStyle=sg;c.fillRect(ox,oy,S,S);
  palGrid(ox,oy,X1,Y1,120,90,1,(x,y,i,j)=>{const h=palH(i,j,3801),px=x+palH(j,i,3802)*90,py=y+palH(i,j,3803)*70,r=50+h*90;
    c.fillStyle='rgba(150,172,200,.22)';c.beginPath();c.ellipse(px+10,py+16,r,r*.42,0,0,7);c.fill();c.fillStyle=h>.5?'rgba(255,255,255,.55)':'rgba(246,250,255,.4)';c.beginPath();c.ellipse(px,py,r*.9,r*.36,0,0,7);c.fill()});
  /* แผ่นดิน */
  c.save();c.beginPath();c.moveTo(ox-10,oy-10);for(let y=oy-10;y<=Y1+10;y+=20)c.lineTo(Math.min(X1+10,phEdge(y)),y);c.lineTo(ox-10,Y1+10);c.closePath();
  /* หน้าผา (ด้านตะวันออก): ทาสีหินก่อนแล้วค่อยหญ้าทับ */
  c.fillStyle='#7c7468';c.fill();c.clip();
  const bg=c.createRadialGradient(1300,1600,200,1300,1600,2300);bg.addColorStop(0,'#6f9a52');bg.addColorStop(.6,'#5f8c48');bg.addColorStop(1,'#4f7a3e');c.fillStyle=bg;
  c.beginPath();c.moveTo(ox-10,oy-10);for(let y=oy-10;y<=Y1+10;y+=20)c.lineTo(Math.min(X1+10,phEdge(y)-26),y);c.lineTo(ox-10,Y1+10);c.closePath();c.fill();
  for(const[x,y,r,v]of PHN.gr){if(!inB(x-r,y-r,x+r,y+r))continue;const g2=c.createRadialGradient(x,y,4,x,y,r);g2.addColorStop(0,v<.5?'rgba(150,190,90,.22)':'rgba(40,70,40,.18)');g2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}
  /* หญ้าลู่ลม (ทิศตะวันตก) */
  c.lineCap='round';palGrid(ox,oy,X1,Y1,30,24,1,(x,y,i,j)=>{const h=palH(i,j,3811);if(h<.45)return;const px=x+palH(j,i,3812)*26,py=y+palH(i,j,3813)*20;if(phSegD(px,py)<34||px>phEdge(py)-40)return;
    const n=3+((h*4)|0),L=6+h*8;for(let k=0;k<n;k++){const bx=px+(k-n/2)*2.2;c.strokeStyle=k%2?'rgba(130,175,85,.75)':'rgba(95,140,65,.8)';c.lineWidth=1.5;c.beginPath();c.moveTo(bx,py);c.quadraticCurveTo(bx-2,py-L*.6,bx-L*.55,py-L*.85);c.stroke()}
    if(h>.93){c.fillStyle=palH(i,j,3814)>.5?'#f2a8c0':'#fff2c0';c.beginPath();c.arc(px-3,py-L*.8,1.8,0,7);c.fill()}});
  /* ทางเดินดิน */
  for(const L of PHPATH){for(const[w,col]of[[60,'rgba(60,46,30,.25)'],[46,'#9a8262'],[34,'#ad9572'],[10,'rgba(255,240,210,.18)']]){c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}}
  /* ลานไม้ท่าเรือ */
  if(inB(1680,980,2700,2340)){c.save();c.beginPath();c.moveTo(1720,1030);for(let y=1030;y<=2300;y+=20)c.lineTo(phEdge(y)-24,y);c.lineTo(1720,2300);c.quadraticCurveTo(1660,1660,1720,1030);c.closePath();
    c.fillStyle='#8a6440';c.fill();c.clip();for(let y=1030;y<2300;y+=14){c.fillStyle=((y/14)|0)%2?'#946c46':'#7f5a38';c.fillRect(1650,y,1100,13);c.fillStyle='rgba(40,24,12,.35)';c.fillRect(1650,y+12,1100,2);
      for(let x=1650+((y*7)%90);x<2750;x+=90+((x*3)%40))c.fillRect(x,y,2,13)}c.restore();
    c.strokeStyle='#4a3020';c.lineWidth=3;c.beginPath();c.moveTo(1720,1030);c.quadraticCurveTo(1660,1660,1720,2300);c.stroke()}
  c.restore();
  /* หน้าผาหิน: แถบหินใต้ขอบหญ้า + เงาลงเมฆ */
  c.save();c.lineJoin='round';for(const[w,col]of[[60,'rgba(120,140,170,.25)'],[34,'#6a6258'],[22,'#857c70']]){c.strokeStyle=col;c.lineWidth=w;c.beginPath();for(let y=oy-20;y<=Y1+20;y+=20){const x=phEdge(y)+(w>40?26:6);y===oy-20?c.moveTo(x,y):c.lineTo(x,y)}c.stroke()}
  c.strokeStyle='#3e382f';c.lineWidth=2.4;c.beginPath();for(let y=oy-20;y<=Y1+20;y+=20){const x=phEdge(y)-24;y===oy-20?c.moveTo(x,y):c.lineTo(x,y)}c.stroke();
  palGrid(ox,oy,X1,Y1,40,40,1,(x,y,i,j)=>{const yy=y+palH(i,j,3821)*30,ex=phEdge(yy);if(Math.abs(x-ex)>40)return;const s=4+palH(j,i,3822)*7;c.fillStyle='rgba(40,34,28,.45)';c.beginPath();c.ellipse(ex-4+palH(i,j,3823)*20,yy,s,s*.6,0,0,7);c.fill()});c.restore();
  /* สะพานไม้ */
  for(const[py,x1,hw]of PHPIER){const x0=phEdge(py)-60;if(!inB(x0,py-hw-60,x1+40,py+hw+80))continue;
    c.fillStyle='rgba(90,110,140,.28)';c.fillRect(x0,py+hw+6,x1-x0,26);
    for(let x=x0+60;x<x1;x+=110){c.fillStyle='#4a3424';c.fillRect(x-5,py+hw-4,10,48);c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.ellipse(x,py+hw+44,20,6,0,0,7);c.fill()}
    c.fillStyle='#6e4c30';c.fillRect(x0,py-hw,x1-x0,hw*2);for(let x=x0;x<x1;x+=16){c.fillStyle=((x/16)|0)%2?'#8c6442':'#7a5636';c.fillRect(x,py-hw+2,14,hw*2-4);c.fillStyle='rgba(30,18,10,.35)';c.fillRect(x+14,py-hw,2,hw*2)}
    c.strokeStyle='#3e2a1a';c.lineWidth=4;c.beginPath();c.moveTo(x0,py-hw);c.lineTo(x1,py-hw);c.moveTo(x0,py+hw);c.lineTo(x1,py+hw);c.stroke();c.fillStyle='#5a3e28';c.fillRect(x1-6,py-hw-4,10,hw*2+8)}}
/* ---------- ฉากเคลื่อนไหวบนพื้น ---------- */
function phGroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();
  if(PHS.carry>=0&&me.down>0){PHS.carry=-1;try{dn.push({x:me.x,y:me.y-60,v:'🩹 ลูกเรือกลับไปรอที่ควันแดง',t:1.8,col:'#ffb0a0'})}catch(e){}}
  /* เมฆลอยผ่านทะเลเมฆ (ฝั่งตะวันออก) */
  for(const[x0,y,r,ph,a]of PHN.cl){const x=2300+((x0-2300+T*(6+a*6))%1100+1100)%1100;if(!palVis(x,y,r*2))continue;if(x<phEdge(y)+30)continue;g.globalAlpha=.22+.12*a;try{g.drawImage(plxCloud(),x-r*1.4,y-r*.6,r*2.8,r*1.2)}catch(e){}g.globalAlpha=1}
  g.globalCompositeOperation='lighter';
  for(const[x,y,ph]of PHN.gl){if(!palVis(x,y,10))continue;const q=Math.sin(T*1.3+ph);if(q<.75)continue;glowAt(x,y-4,4,'255,250,210',(q-.75)*2.4)}
  /* กองเรือนาวาเมฆลอยรอกลางทะเลเมฆ (หลังจุดประภาคาร) */
  if(gP8lit())for(const[x,y,ph]of PHN.fl){if(!palVis(x,y,60))continue;const b=Math.sin(T*.8+ph)*3,yy=y+b;g.fillStyle='rgba(110,130,165,.22)';g.beginPath();g.ellipse(x,y+26,22,6,0,0,7);g.fill();
    g.fillStyle='#d8ccb0';g.beginPath();g.ellipse(x,yy-14,15,9,0,0,7);g.fill();g.strokeStyle='rgba(90,80,60,.6)';g.lineWidth=1;g.stroke();g.strokeStyle='#8a7a5a';g.beginPath();g.moveTo(x-9,yy-8);g.lineTo(x-7,yy);g.moveTo(x+9,yy-8);g.lineTo(x+7,yy);g.stroke();
    g.fillStyle='#6a4a2c';g.beginPath();g.moveTo(x-13,yy);g.quadraticCurveTo(x,yy+8,x+13,yy);g.closePath();g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x+10,yy-2,9,'255,210,140',.5+.3*Math.sin(T*2+ph));g.restore()}
  /* แกนดาวในซากเรือ: เต้นอ่อน */
  if(palVis(PHWR.x,PHWR.y,300)){const pu=.55+.45*Math.sin(T*2.2);glowAt(PHWR.x+40,PHWR.y-70,60,'120,200,255',.25*pu);glowAt(PHWR.x+40,PHWR.y-70,18,'220,245,255',.6*pu)}
  g.globalCompositeOperation='source-over';
  /* ควันสัญญาณสีแดงจากลูกเรือที่ยังไม่ได้ช่วย */
  {const st=stCur(),q=me.sty;if(st&&st.p8rs&&q&&q.a===1){const RS=phRS();RS.forEach(([x,y],i)=>{if(((q.p8rs|0)>>i&1)||PHS.carry===i)return;if(!palVis(x,y-120,160))return;
    for(let k=0;k<(Q?4:8);k++){const p=((T*.3+k/8+i*.13)%1),sx=x+Math.sin(p*5+k)*12+p*50,sy=y-24-p*230;g.fillStyle='rgba(225,60,50,'+(.62*(1-p))+')';g.beginPath();g.arc(sx,sy,8+p*24,0,7);g.fill()}
    {const pu=(T*1.2+i*.3)%1;g.strokeStyle='rgba(255,90,70,'+(.7*(1-pu))+')';g.lineWidth=2.4;g.beginPath();g.ellipse(x,y+4,18+pu*40,(18+pu*40)*.4,0,0,7);g.stroke()}
    g.fillStyle='#c83a2a';g.fillRect(x+12,y-14,3,14);g.save();g.globalCompositeOperation='lighter';glowAt(x+13.5,y-16,8,'255,140,90',.8);g.restore();
    phSailor(x,y,i,T,1);g.save();g.globalCompositeOperation='lighter';glowAt(x,y-8,22,'255,120,90',.35+.15*Math.sin(T*4+i));g.restore();
    if(Math.hypot(me.x-x,me.y-y)<70&&PHS.carry<0&&PHS.pk===i){const p=Math.min(1,PHS.pt/1);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-46,11,0,7);g.stroke();g.strokeStyle='#ffd06a';g.lineWidth=3.4;g.beginPath();g.arc(x,y-46,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}})}}
  phFolk(T);
  /* วงจุดไฟประภาคาร */
  {const st=stCur(),q=me.sty;if(st&&st.p8lh&&q&&q.a===1&&!gP8lit()&&palVis(PHLB.x,PHLB.y,80)){const pu=.6+.4*Math.sin(T*3);g.strokeStyle='rgba(255,210,120,'+(.5+.3*pu)+')';g.lineWidth=2.4;g.beginPath();g.ellipse(PHLB.x,PHLB.y,58,22,0,0,7);g.stroke();
    if(PHS.lp>0){const p=Math.min(1,PHS.lp/2.5);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(PHLB.x,PHLB.y-60,13,0,7);g.stroke();g.strokeStyle='#ffb04a';g.lineWidth=3.6;g.beginPath();g.arc(PHLB.x,PHLB.y-60,13,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}}}
  g.restore()}
function phBeam(x,ly,T,k){const a=T*.85,L=LOWQ?700:980,w=.15;glowAt(x,ly,78,'255,220,140',(.5+.14*Math.sin(T*6))*k);glowAt(x,ly,22,'255,250,220',.9*k);
  for(const s of[0,Math.PI]){const aa=a+s,ex=Math.cos(aa),ey=Math.sin(aa)*.45,gr=g.createLinearGradient(x,ly,x+ex*L,ly+ey*L);gr.addColorStop(0,'rgba(255,236,170,'+(.4*k)+')');gr.addColorStop(1,'rgba(255,236,170,0)');g.fillStyle=gr;
    g.beginPath();g.moveTo(x,ly);g.lineTo(x+Math.cos(aa-w)*L,ly+Math.sin(aa-w)*L*.45);g.lineTo(x+Math.cos(aa+w)*L,ly+Math.sin(aa+w)*L*.45);g.closePath();g.fill()}}
/* ---------- แสงยามค่ำ (วาดทับชั้นมืด) ---------- */
function phNight(){if(curMap!==38||isDg())return;const k=phNt();if(k<.05)return;const T=performance.now()/1000;g.save();if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);g.globalCompositeOperation='lighter';
  for(const[x,y]of PHN.lamps||[]){if(!palVis(x,y-46,60))continue;glowAt(x+8,y-46,20,'255,190,110',(.42+.06*Math.sin(T*4+x))*k);glowAt(x+8,y,28,'255,190,110',.1*k)}
  if(palVis(1990,1040,140))for(const dx of[-45,51])glowAt(1990+dx,1042,22,'255,200,120',.32*k);
  const lit=gP8lit();if(palVis(PHLH.x,PHLH.y-300,lit?1000:80)){if(lit)phBeam(PHLH.x,PHLH.y-294,T,.85*k);else glowAt(PHLH.x,PHLH.y-294,10,'255,170,90',.3*k)}
  if(lit)for(const[x,y,ph]of PHN.fl||[]){if(!palVis(x,y,40))continue;glowAt(x+10,y-2+Math.sin(T*.8+ph)*3,12,'255,210,140',(.5+.3*Math.sin(T*2+ph))*k)}
  {const st=stCur(),q=me.sty;if(st&&st.p8rs&&q&&q.a===1)phRS().forEach(([x,y],i)=>{if(((q.p8rs|0)>>i&1)||PHS.carry===i||!palVis(x,y,60))return;glowAt(x+13,y-16,16,'255,110,80',.6*k)})}
  g.restore()}
/* ---------- ทับจอ: ลม · เงาเมฆ · ขอบจอ ---------- */
function phScreen(T,z,Hs){const Q=LOWQ;g.save();
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.36,SW0/2,Hs/2,Math.max(SW0,Hs)*.78);vg.addColorStop(0,'rgba(30,50,80,0)');vg.addColorStop(1,'rgba(30,50,80,.2)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  for(let k=0;k<(Q?4:9);k++){const per=2.6+k*.37,q=((T+k*.61)%per)/per;if(q>.55)continue;const R=depRng(Math.floor((T+k*.61)/per)*13+k),x0=SW0+40-q/.55*(SW0+200),y0=R()*Hs,len=50+R()*70,a=.35*Math.sin(q/.55*3.14);
    g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=1.2;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(x0+len*.5,y0-4,x0+len,y0+2);g.stroke()}
  if(!Q){const x=((T*14)%(SW0+600))-300,gr=g.createRadialGradient(SW0-x,Hs*.4,20,SW0-x,Hs*.4,260);gr.addColorStop(0,'rgba(20,30,50,.10)');gr.addColorStop(1,'rgba(20,30,50,0)');g.fillStyle=gr;g.fillRect(0,0,SW0,Hs)}
  /* ลูกเรือบนหลัง: ป้ายบอกทาง */
  if(PHS.carry>=0&&!SD.on){const t='🩹 พาลูกเรือไปเต็นท์พยาบาล',d=Math.hypot(me.x-PHMED.x,me.y-PHMED.y);g.font='bold 12px system-ui';g.textAlign='center';const w=g.measureText(t).width+20,cx=SW0/2,cy=Hs*.2;
    g.fillStyle='rgba(20,30,46,.78)';g.beginPath();g.roundRect(cx-w/2,cy-14,w,26,13);g.fill();g.fillStyle='#ffe0a0';g.fillText(t+' · '+Math.round(d/10)+' ม.',cx,cy+4)}
  g.restore()}
/* ---------- ลูกเรือ: บาดเจ็บรอที่ควันแดง · เดินตามผู้เล่น · นั่งพักหน้าเต็นท์ ---------- */
const PHREST=[[1800,1815],[1836,1834],[1872,1842],[1908,1832],[1768,1792]];
function phSailor(x,y,i,T,m){const c=PHSC[i%5];g.save();
  if(m===1){campFolk(x,y,{c,sh:'#e8e0d0',hair:['#3a2414','#d8c8a0','#1a1a22','#8a4a24','#c8c8c8'][i%5],f:i%2?1:-1,s:1.12,k:i,sit:1,arm:-2.3+Math.sin(T*5+i)*.5},T)}
  else if(m===2){campFolk(x,y,{c,sh:'#e8e0d0',hair:['#3a2414','#d8c8a0','#1a1a22','#8a4a24','#c8c8c8'][i%5],f:PHS.ff||1,s:1.08,k:i,run:PHS.mv?1:0,arm:-.9},T)}
  else campFolk(x,y,{c,sh:'#e8e0d0',hair:['#3a2414','#d8c8a0','#1a1a22','#8a4a24','#c8c8c8'][i%5],f:x<1850?1:-1,s:1.08,k:i,sit:1},T);
  /* ผ้าพันแผลบนหัว */const hy=y-(m===2?15:12)*1.1;g.strokeStyle='#f4f0e8';g.lineWidth=2;g.beginPath();g.arc(x,hy,5.2,Math.PI*1.1,Math.PI*1.9);g.stroke();g.restore()}
function phFolk(T){const q=me.sty,st=stCur();if(curMap!==38)return;
  const done=p6Past('p8rs'),bits=done?31:((st&&st.p8rs&&q)?(q.p8rs|0):0);
  for(let i=0;i<5;i++)if(bits>>i&1){const[x,y]=PHREST[i];if(palVis(x,y,40))phSailor(x,y+Math.sin(T*.8+i)*.4,i,T,3)}
  if(PHS.carry>=0)phSailor(PHS.fx,PHS.fy,PHS.carry,T,2)}
/* ---------- โซน · ติ๊ก · ออโต้เควส ---------- */
function phTick(dt,now,x,y,mv){
  /* บนสะพาน (เหนือเมฆ): ไม่ให้เดินเลยปลาย/ข้างราว (บ่อตกปลาที่ปลายสะพานลบกำแพงล่องหนแถวนั้นออก) */
  if(me.down<=0)for(const[py,x1,hw]of PHPIER){if(Math.abs(me.y-py)<hw+40&&me.x>phEdge(me.y)-4){if(me.x>x1-14)me.x=x1-14;if(me.y<py-hw+8)me.y=py-hw+8;if(me.y>py+hw-8)me.y=py+hw-8;x=me.x;y=me.y}}
  if(phIn(x,y,-4)){PHS.lx=x;PHS.ly=y}else if(!phIn(x,y,-36)&&me.down<=0){me.x=PHS.lx;me.y=PHS.ly}
  {const N=MAPS[38].npc2;N.x=2100;N.y=1700}
  if(PHS.carry>=0){const dx=me.x-PHS.fx,dy=me.y-PHS.fy,d=Math.hypot(dx,dy);PHS.mv=d>36;if(d>36){const k=1-36/d;PHS.fx+=dx*k;PHS.fy+=dy*k}if(Math.abs(dx)>2)PHS.ff=dx>0?1:-1;
    if(me.down>0){PHS.carry=-1;try{dn.push({x:me.x,y:me.y-60,v:'🩹 ลูกเรือกลับไปรอที่ควันแดง',t:1.8,col:'#ffb0a0'})}catch(e){}}}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1){PHS.pk=-1;PHS.pt=0;PHS.lp=0;return}
  if(st.p8rs){const RS=phRS();
    if(PHS.carry<0){let nr=-1;RS.forEach(([sx,sy],i)=>{if(((q.p8rs|0)>>i&1)||Math.hypot(x-sx,y-sy)>70)return;nr=i});
      if(nr!==PHS.pk){PHS.pk=nr;PHS.pt=0}
      if(nr>=0&&me.down<=0){PHS.pt+=dt;if(PHS.pt>=1){PHS.carry=nr;PHS.pk=-1;PHS.pt=0;PHS.fx=RS[nr][0];PHS.fy=RS[nr][1];try{sfx('click')}catch(e){}try{dn.push({x:me.x,y:me.y-60,v:'🩹 พยุงลูกเรือขึ้นแล้ว · พาไปเต็นท์พยาบาล',t:2,col:'#ffe0a0'})}catch(e){}}}}
    else if(Math.hypot(x-PHMED.x,y-PHMED.y)<130){const i=PHS.carry;PHS.carry=-1;q.p8rs=(q.p8rs|0)|(1<<i);let n=0;for(let k=0;k<5;k++)if(q.p8rs>>k&1)n++;q.n=n;
      PALG.card={h:'⚓ ลูกเรือนาวาเมฆ '+n+'/5',t:PHLORE[i],s:now,d:9};try{sfx('coin')}catch(e){}try{burst(PHMED.x,PHMED.y-30,['#ffffff','#bff0c8','#ffe0a0'],28,140,1,{glow:1,g:-50})}catch(e){}try{stHud();writeSave()}catch(e){}}}
  if(st.p8lh&&!gP8lit()){if(Math.hypot(x-PHLB.x,y-PHLB.y)<62&&me.down<=0){PHS.lp+=dt;if(PHS.lp>=2.5){PHS.lp=0;q.n=1;PHS.lt=now;
      PALG.card={h:'🗼 ประภาคารผาเหนือสว่างแล้ว',t:'ตะเกียงเก่าลุกขึ้นอีกครั้ง… แสงสีทองกวาดข้ามทะเลเมฆ ไกลพอให้คนที่หลงทางกลางเมฆมองเห็น',s:now,d:9};
      try{sfx('quest')}catch(e){}try{burst(PHLH.x,PHLH.y-294,['#fff4c0','#ffd27a','#ffffff'],50,220,1.2,{glow:1,g:-30})}catch(e){}try{shk=Math.max(shk,.12)}catch(e){}try{stHud();writeSave()}catch(e){}}}
    else PHS.lp=Math.max(0,PHS.lp-dt*2)}}
function phAqT(st){if(!me.sty)return null;
  if(st.p8rs){if(PHS.carry>=0)return{mp:38,act:'reach',x:PHMED.x-60,y:PHMED.y+80,lb:'พาลูกเรือไปเต็นท์พยาบาล'};
    let b=null,bd=1e9;phRS().forEach(([x,y],i)=>{if((me.sty.p8rs|0)>>i&1)return;const d=curMap===38?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x,y:y+36}}});
    return b?{mp:38,act:'reach',x:b.x,y:b.y,lb:'ไปช่วยลูกเรือที่ควันสัญญาณแดง'}:null}
  if(st.p8lh)return{mp:38,act:'reach',x:PHLB.x,y:PHLB.y+24,lb:'จุดไฟประภาคารผาเหนือ'};return null}
/* ---------- ภาพมอนผาท่าเรือเมฆ ---------- */
function drawMonCH(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){const glow=(x,y,rr,c,a)=>{if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.restore()};
  const puff=(x,y,s,a)=>{if(W)return;g.fillStyle='rgba(255,255,255,'+a+')';g.beginPath();g.ellipse(x,y,s,s*.48,0,0,7);g.moveTo(x+s*1.36,y+s*.1);g.ellipse(x+s*.7,y+s*.1,s*.66,s*.36,0,0,7);g.moveTo(x-s*.14,y+s*.12);g.ellipse(x-s*.72,y+s*.12,s*.58,s*.32,0,0,7);g.fill()};
  if(t===0){/* ฉลามเมฆ: ว่ายครึ่งตัวในเมฆ */const sv=Math.sin(T*2.4)*r*.08,tl=Math.sin(T*5)*r*.12;
    if(!W){g.fillStyle='rgba(120,140,170,.25)';g.beginPath();g.ellipse(0,r*.06,r*1.4,r*.3,0,0,7);g.fill()}
    Pg([-r*.8,-r*.32+sv,-r*1.3,-r*.9+sv+tl,-r*1.16,-r*.32+sv,-r*1.34,r*.02+sv+tl*.6,-r*.82,-r*.16+sv],F('#6a82a8'),1);
    E(0,-r*.36+sv,r*.98,r*.4,F('#7d96bc'),1);E(r*.08,-r*.2+sv,r*.76,r*.18,F('#e8eef6'),0);
    Pg([-r*.28,-r*.68+sv,r*.02,-r*1.22+sv,r*.28,-r*.7+sv],F('#5a7298'),1);
    Pg([r*.06,-r*.24+sv,-r*.18,r*.06+sv+la*.25,r*.32,-r*.18+sv],F('#647ca2'),1);
    if(!W){g.strokeStyle='rgba(40,60,90,.55)';g.lineWidth=1.2;for(let i=0;i<3;i++){const gx=r*(.38+i*.08);g.beginPath();g.moveTo(gx,-r*.5+sv);g.quadraticCurveTo(gx-r*.04,-r*.36+sv,gx,-r*.22+sv);g.stroke()}
      g.fillStyle='rgba(200,215,235,.7)';for(let i=0;i<4;i++){g.beginPath();g.arc(-r*.4+i*r*.24,-r*.6+sv+(i%2)*r*.05,r*.035,0,7);g.fill()}}
    Pg([r*.58,-r*.24+sv,r*.98,-r*.3+sv,r*.64,-r*.12+sv],F('#3a2a3a'),0);
    if(!W){g.fillStyle='#ffffff';for(let i=0;i<4;i++){const x0=r*(.64+i*.08);g.beginPath();g.moveTo(x0,-r*.25+sv);g.lineTo(x0+r*.03,-r*.17+sv);g.lineTo(x0+r*.06,-r*.26+sv);g.fill()}}
    eye(r*.66,-r*.46+sv,r*.07,r*.06,'#ffd84a');glow(r*.66,-r*.46+sv,r*.18,'255,220,90',.35);
    puff(-r*.62,-r*.02,r*.46,.9);puff(r*.42,r*.02,r*.5,.9);if(!LOWQ)puff(-r*1.22,0,r*.3,.75);
    if(!W&&!LOWQ){for(let i=0;i<3;i++){const p=(T*.8+i/3)%1;g.fillStyle='rgba(255,255,255,'+(.6*(1-p))+')';g.beginPath();g.arc(-r*1.4-p*r*.6,-r*.1-p*r*.2+i*r*.1,r*.12*(1-p*.5),0,7);g.fill()}}return true}
  if(t===1){/* นางนวลพายุ */const hv=Math.sin(T*3.2)*r*.14,fl=Math.sin(T*13),by=-r*1.05+hv;glow(0,by,r*1.1,'255,240,150',.14);
    if(!W){g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(0,r*.08,r*.7,r*.18,0,0,7);g.fill()}
    const wing=(a,c,c2)=>{g.save();g.translate(-r*.05,by-r*.08);g.rotate(a);Pg([0,0,-r*.2,-r*.55,-r*.62,-r*1.22,-r*.42,-r*1.18,-r*.12,-r*.7,r*.22,-r*.1],F(c),1);if(!W)Pg([-r*.62,-r*1.22,-r*.42,-r*1.18,-r*.34,-r*.94,-r*.5,-r*.98],c2,0);g.restore()};
    wing(-.2+fl*.75+.25,'#c8d0dc','#2a3450');
    Pg([-r*.5,by,-r*.95,by-r*.12,-r*.92,by+r*.1],F('#e8ecf2'),1);
    E(0,by,r*.5,r*.26,F('#f4f6fa'),1);E(-r*.05,by-r*.06,r*.34,r*.12,F('#c8d0dc'),0);
    E(r*.44,by-r*.16,r*.2,r*.18,F('#f8fafc'),1);Pg([r*.6,by-r*.18,r*.86,by-r*.12,r*.6,by-r*.08],F('#f0c040'),1);if(!W){g.fillStyle='#d84a2a';g.beginPath();g.arc(r*.78,by-r*.12,r*.025,0,7);g.fill()}
    eye(r*.5,by-r*.2,r*.045,r*.045,'#ffe066');
    Ln([-r*.05,by+r*.22,-r*.12,by+r*.48],F('#e8a040'),r*.05);Ln([r*.1,by+r*.22,r*.06,by+r*.48],F('#e8a040'),r*.05);
    wing(-.2+fl*.75,'#eef2f6','#3a4a6a');
    if(!W&&!LOWQ&&((T*7)|0)%3===0){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,245,170,.9)';g.lineWidth=1.4;const R=depRng(((T*7)|0)+((r*10)|0));for(let k=0;k<2;k++){let px=(R()-.5)*r*1.4,py=by-r*.3-R()*r*.8;g.beginPath();g.moveTo(px,py);for(let s=0;s<4;s++){px+=(R()-.5)*r*.5;py+=r*.18;g.lineTo(px,py)}g.stroke()}g.restore()}
    return true}
  /* ยักษ์เพรียงหิน */glow(0,-r*.7,r*1.4,'120,220,210',.1);
  Ln([-r*.36,r*.05,-r*.44,r*.86-la],F('#5a5850'),r*.3);Ln([r*.36,r*.05,r*.44,r*.86-ra],F('#5a5850'),r*.3);
  Pg([-r*.74,-r*1.0+bob,-r*.24,-r*1.26+bob,r*.42,-r*1.2+bob,r*.8,-r*.72+bob,r*.66,r*.18,r*.08,r*.3,-r*.52,r*.22,-r*.86,-r*.32+bob],F('#6e6a5e'),1);
  Pg([-r*.74,-r*1.0+bob,-r*.24,-r*1.26+bob,r*.04,-r*.92+bob,-r*.42,-r*.5+bob,-r*.86,-r*.32+bob],F('#858072'),0);
  if(!W){/* เพรียง */for(const[bx,byy,s]of[[-r*.5,-r*.82,1],[-r*.2,-r*1.0,.8],[r*.3,-r*.95,1.1],[r*.55,-r*.5,.9],[-r*.6,-r*.2,.9],[r*.15,-r*.3,1],[-r*.15,-r*.6,.7],[r*.4,-r*.15,.8]]){const yy=byy+bob*(byy<-r*.5?1:.4),w=r*.09*s;g.fillStyle='#e8e2d0';g.beginPath();g.moveTo(bx-w,yy+w*.6);g.lineTo(bx-w*.45,yy-w*1.1);g.lineTo(bx+w*.45,yy-w*1.1);g.lineTo(bx+w,yy+w*.6);g.closePath();g.fill();g.strokeStyle='rgba(60,50,40,.6)';g.lineWidth=1;g.stroke();g.fillStyle='#2a2a30';g.beginPath();g.ellipse(bx,yy-w*1.05,w*.42,w*.18,0,0,7);g.fill()}
    /* สาหร่าย */g.strokeStyle='rgba(70,130,80,.85)';g.lineWidth=2.4;g.lineCap='round';for(const[sx,sy,l]of[[-r*.6,-r*.4,.5],[r*.5,-r*.35,.6],[0,r*.1,.45],[-r*.3,r*.05,.4]]){const wv=Math.sin(T*2+sx)*r*.08;g.beginPath();g.moveTo(sx,sy+bob*.4);g.quadraticCurveTo(sx+wv,sy+r*l*.5,sx-wv*.5,sy+r*l);g.stroke()}}
  for(const s of[-1,1]){const ax=s*r*.84,ay=-r*.78+bob;Ln([s*r*.6,-r*.92+bob,ax+s*r*.2,ay+r*.32+(s<0?la:ra)*.5],F('#6e6a5e'),r*.26);
    if(s>0){E(ax+s*r*.26,ay+r*.44,r*.24,r*.2,F('#5e5a50'),1);Pg([ax+r*.36,ay+r*.3,ax+r*.62,ay+r*.18,ax+r*.48,ay+r*.42],F('#7a7466'),1);Pg([ax+r*.36,ay+r*.52,ax+r*.62,ay+r*.66,ax+r*.44,ay+r*.46],F('#7a7466'),1)}else E(ax+s*r*.24,ay+r*.44,r*.26,r*.22,F('#5e5a50'),1)}
  E(r*.05,-r*1.34+bob,r*.26,r*.2,F('#6e6a5e'),1);{const cg=.6+.4*Math.sin(T*2.6);glow(r*.12,-r*1.35+bob,r*.3,'120,240,220',.4*cg);eye(r*.12,-r*1.35+bob,r*.08,r*.06,'#8af8e8')}
  return true}
/* ---------- ตัวละคร ---------- */
function saraD(x,y,f,T){const O='#141a26';g.save();g.translate(x,y);g.scale(f,1);PALSH(0,14,17,5,.4);
  /* เสื้อคลุมนาวิกยาว */g.fillStyle='#1c2c4a';g.beginPath();g.moveTo(-9,-22);g.lineTo(9,-22);g.lineTo(14,13);g.quadraticCurveTo(0,17,-14,13);g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
  g.fillStyle='#e8e0cc';g.beginPath();g.moveTo(-4,-21);g.lineTo(4,-21);g.lineTo(5,10);g.lineTo(-5,10);g.closePath();g.fill();
  g.strokeStyle='#d8b050';g.lineWidth=1.4;g.beginPath();g.moveTo(-9,-22);g.lineTo(-13.4,12);g.moveTo(9,-22);g.lineTo(13.4,12);g.stroke();
  g.fillStyle='#b8322a';g.beginPath();g.moveTo(-9,-7);g.lineTo(9,-9);g.lineTo(9,-4);g.lineTo(-9,-2);g.closePath();g.fill();g.fillStyle='#b8322a';g.beginPath();g.moveTo(-8,-3);g.lineTo(-12,8);g.lineTo(-9,8);g.lineTo(-6,-2);g.fill();
  g.fillStyle='#d8b050';for(const by of[-16,-11,-1,4])g.fillRect(-6.5,by,1.6,1.6);
  /* ดาบ + กล้องส่องทางไกล */g.strokeStyle='#c8a050';g.lineWidth=2;g.beginPath();g.moveTo(10,-3);g.lineTo(17,12);g.stroke();g.fillStyle='#d8b050';g.beginPath();g.arc(10,-4,2.2,0,7);g.fill();
  g.fillStyle='#8a6a3a';g.fillRect(-12,-2,3,9);g.fillStyle='#d8b050';g.fillRect(-12.4,-3,3.8,1.6);
  g.strokeStyle='#1c2c4a';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(-8,-17);g.lineTo(-11,-4);g.stroke();g.beginPath();g.moveTo(8,-17);g.lineTo(11,-6);g.stroke();
  g.fillStyle='#e8c4a8';g.beginPath();g.arc(-11,-3,1.8,0,7);g.fill();g.beginPath();g.arc(11,-5,1.8,0,7);g.fill();g.strokeStyle='#f4f0e8';g.lineWidth=2.2;g.beginPath();g.moveTo(-9,-13);g.lineTo(-10.6,-8);g.stroke();
  /* หน้า ผม หมวก */g.fillStyle='#e8c4a8';g.beginPath();g.arc(0,-27,6.4,0,7);g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
  g.fillStyle='#e8e4dc';g.beginPath();g.arc(0,-28,6.8,Math.PI*1.05,Math.PI*1.95);g.lineTo(6.6,-22);g.quadraticCurveTo(8,-18,6,-15);g.lineTo(4.4,-21);g.closePath();g.fill();
  g.fillStyle='#141a26';g.fillRect(2.4,-28,1.6,1.6);g.strokeStyle='#5a3a2a';g.lineWidth=.8;g.beginPath();g.moveTo(-1,-29.4);g.lineTo(-3.4,-30);g.stroke();
  g.fillStyle='#1a2236';g.beginPath();g.moveTo(-12,-31);g.quadraticCurveTo(0,-38,12,-31);g.quadraticCurveTo(0,-34,-12,-31);g.fill();g.beginPath();g.moveTo(-7,-32);g.lineTo(-4,-41);g.lineTo(5,-41);g.lineTo(8,-32);g.closePath();g.fill();
  g.strokeStyle='#d8b050';g.lineWidth=1.2;g.beginPath();g.moveTo(-11,-31.4);g.quadraticCurveTo(0,-37,11,-31.4);g.stroke();
  const fw=Math.sin(T*2.2)*1.5;g.strokeStyle='#e8f0f8';g.lineWidth=2.4;g.beginPath();g.moveTo(-4,-39);g.quadraticCurveTo(-12,-46+fw,-17,-40+fw);g.stroke();g.restore()}
function navinD(x,y,f,T){const sn=Math.sin(T*3);campFolk(x,y,{c:'#d8c8a0',sh:'#4aa0d8',hair:'#2a1a10',hat:'#3a5a8a',f,s:1.05,k:5,arm:-1+sn*.25},T);
  const cx=x+f*9,cy=y-12;g.save();g.fillStyle='#c8963a';g.beginPath();g.moveTo(cx-4,cy+3);g.quadraticCurveTo(cx+f*8,cy-6,cx+f*12,cy-2);g.quadraticCurveTo(cx+f*8,cy+4,cx-4,cy+3);g.fill();g.strokeStyle='#6a4a14';g.lineWidth=.8;g.stroke();
  g.globalCompositeOperation='lighter';glowAt(cx+f*8,cy-1,10,'255,210,120',.35+.2*sn);g.restore();
  if(!LOWQ){g.save();g.font='9px system-ui';g.textAlign='center';for(let k=0;k<2;k++){const p=(T*.5+k*.5)%1;g.globalAlpha=Math.sin(p*3.14)*.85;g.fillStyle='#ffe0a0';g.fillText(k?'♫':'♪',cx+f*(12+p*10),cy-8-p*20)}g.restore()}}
/* ---------- ของประกอบฉาก ---------- */
const phLbl=(s,x,y,c)=>{g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,14,24,.85)';g.strokeText(s,x,y);g.fillStyle=c||'#fff0d0';g.fillText(s,x,y)};
const PHNT=[0,-1e9],phNt=()=>{const n=performance.now();if(n-PHNT[1]>500){PHNT[1]=n;try{PHNT[0]=Math.max(0,Math.min(1,dnState().dk/.42))}catch(e){PHNT[0]=0}}return PHNT[0]};
Object.assign(PALK,{
 phlh(t,T){const x=t.x,y=t.y,lit=gP8lit(),H=270,w0=46,w1=30,gy=y-H;PALSH(x+10,y+8,74,22,.45);
  g.fillStyle='#5e584c';g.beginPath();g.ellipse(x,y+2,66,22,0,0,7);g.fill();g.fillStyle='#7c7568';g.beginPath();g.ellipse(x,y-4,62,20,0,0,7);g.fill();
  g.fillStyle='#8a8476';for(let k=0;k<4;k++){g.beginPath();g.moveTo(x-14+k*0,y+16-k*5);g.lineTo(x+14,y+16-k*5);g.lineTo(x+12,y+12-k*5);g.lineTo(x-12,y+12-k*5);g.closePath();g.fill()}
  const bp=()=>{g.beginPath();g.moveTo(x-w0,y-6);g.lineTo(x-w1,gy);g.lineTo(x+w1,gy);g.lineTo(x+w0,y-6);g.quadraticCurveTo(x,y+8,x-w0,y-6);g.closePath()};
  bp();const tg=g.createLinearGradient(x-w0,0,x+w0,0);tg.addColorStop(0,'#bdb6a8');tg.addColorStop(.42,'#f4f0e6');tg.addColorStop(1,'#9c9688');g.fillStyle=tg;g.fill();
  g.save();bp();g.clip();for(const[b0,b1]of[[58,96],[150,188],[236,262]]){const rg=g.createLinearGradient(x-w0,0,x+w0,0);rg.addColorStop(0,'#82261e');rg.addColorStop(.42,'#c8443a');rg.addColorStop(1,'#701e18');g.fillStyle=rg;g.fillRect(x-60,y-b1,120,b1-b0)}
  g.strokeStyle='rgba(60,50,40,.16)';g.lineWidth=1;for(let k=18;k<H;k+=18){g.beginPath();g.moveTo(x-60,y-k);g.lineTo(x+60,y-k);g.stroke()}g.restore();
  g.strokeStyle='#4a4238';g.lineWidth=1.6;bp();g.stroke();
  g.fillStyle='#3a2a1c';g.beginPath();g.moveTo(x-11,y);g.lineTo(x-11,y-30);g.arc(x,y-30,11,Math.PI,0);g.lineTo(x+11,y);g.closePath();g.fill();g.strokeStyle='#2a1e14';g.lineWidth=1.2;g.stroke();
  if(lit){g.fillStyle='rgba(255,200,120,.55)';g.fillRect(x-9,y-36,18,34)}
  for(const wy of[118,206]){g.fillStyle=lit?'#ffd88a':'#2a3446';g.fillRect(x-5,y-wy-12,10,16);g.strokeStyle='#4a4238';g.lineWidth=1;g.strokeRect(x-5,y-wy-12,10,16)}
  g.fillStyle='#44444c';g.beginPath();g.ellipse(x,gy,46,13,0,0,7);g.fill();g.fillStyle='#5a5a64';g.fillRect(x-46,gy-4,92,6);
  g.fillStyle=lit?'rgba(255,232,170,.96)':'rgba(64,84,112,.9)';g.fillRect(x-20,gy-46,40,42);
  g.strokeStyle='#2e2e36';g.lineWidth=2;for(const dx of[-20,-7,7,20]){g.beginPath();g.moveTo(x+dx,gy-46);g.lineTo(x+dx,gy-4);g.stroke()}
  g.lineWidth=1.4;g.beginPath();g.moveTo(x-46,gy-14);g.lineTo(x+46,gy-14);g.stroke();for(let dx=-42;dx<=42;dx+=10.5){g.beginPath();g.moveTo(x+dx,gy-14);g.lineTo(x+dx,gy-2);g.stroke()}
  g.fillStyle='#8a2a22';g.beginPath();g.moveTo(x-27,gy-46);g.lineTo(x,gy-76);g.lineTo(x+27,gy-46);g.closePath();g.fill();g.strokeStyle='#4a1a14';g.stroke();g.fillStyle='#d8b050';g.beginPath();g.arc(x,gy-80,4,0,7);g.fill();
  const ly=gy-24;g.save();g.globalCompositeOperation='lighter';if(lit)phBeam(x,ly,T,1);else glowAt(x,ly,10,'255,170,90',.25+.15*Math.sin(T*3));g.restore()},
 phhouse(t,T){const x=t.x,y=t.y,W2=88,Hh=96;PALSH(x+8,y+6,W2+14,20,.42);
  g.fillStyle='#5a4a3a';g.fillRect(x-W2,y-14,W2*2,16);
  const wg=g.createLinearGradient(0,y-Hh,0,y);wg.addColorStop(0,'#a07a50');wg.addColorStop(1,'#7a5634');g.fillStyle=wg;g.fillRect(x-W2+4,y-Hh,W2*2-8,Hh-12);
  g.strokeStyle='rgba(40,24,12,.4)';g.lineWidth=1;for(let k=y-Hh+10;k<y-12;k+=11){g.beginPath();g.moveTo(x-W2+4,k);g.lineTo(x+W2-4,k);g.stroke()}
  g.fillStyle='#5a3a22';for(const dx of[-W2+4,-2,W2-12])g.fillRect(x+dx,y-Hh,8,Hh-12);
  g.fillStyle='#3e4a5a';g.beginPath();g.moveTo(x-W2-16,y-Hh+6);g.lineTo(x-W2+30,y-Hh-50);g.lineTo(x+W2-30,y-Hh-50);g.lineTo(x+W2+16,y-Hh+6);g.closePath();g.fill();g.strokeStyle='#1e2630';g.lineWidth=1.4;g.stroke();
  g.strokeStyle='rgba(20,26,36,.45)';g.lineWidth=1;for(let k=1;k<5;k++){const yy=y-Hh+6-k*11,ix=(W2+16)-(k*11)*(46/56);g.beginPath();g.moveTo(x-ix,yy);g.lineTo(x+ix,yy);g.stroke()}
  const nt=phNt();for(const dx of[-56,40]){g.fillStyle=nt>.2?'rgba(255,214,140,'+(.5+nt*.4)+')':'#2c3a4c';g.fillRect(x+dx,y-Hh+18,22,20);g.strokeStyle='#3a2414';g.lineWidth=2;g.strokeRect(x+dx,y-Hh+18,22,20);g.beginPath();g.moveTo(x+dx+11,y-Hh+18);g.lineTo(x+dx+11,y-Hh+38);g.stroke()}
  g.fillStyle='#3a2414';g.fillRect(x-14,y-48,28,36);g.fillStyle='#d8b050';g.beginPath();g.arc(x+8,y-30,1.8,0,7);g.fill();
  g.fillStyle='#e8dcc0';g.fillRect(x-34,y-Hh-12,68,16);g.strokeStyle='#3a2414';g.lineWidth=1.4;g.strokeRect(x-34,y-Hh-12,68,16);g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#3a2414';g.fillText('⚓ ท่าเรือ',x,y-Hh);
  const bs=Math.sin(T*1.6)*.12;g.save();g.translate(x+W2-6,y-Hh-6);g.strokeStyle='#3a2414';g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(18,0);g.stroke();g.translate(16,2);g.rotate(bs);g.fillStyle='#c8963a';g.beginPath();g.moveTo(-5,10);g.quadraticCurveTo(-5,0,0,0);g.quadraticCurveTo(5,0,5,10);g.closePath();g.fill();g.strokeStyle='#6a4a14';g.lineWidth=1;g.stroke();g.restore();
  if(nt>.2){g.save();g.globalCompositeOperation='lighter';for(const dx of[-56,40])glowAt(x+dx+11,y-Hh+28,26,'255,200,120',.25*nt);g.restore()}},
 phmed(t,T){const x=t.x,y=t.y;PALSH(x+6,y+6,72,16,.4);const fl=Math.sin(T*2.2+x)*1.4;
  g.fillStyle='#d8d2c4';g.beginPath();g.moveTo(x-72,y+4);g.lineTo(x-46,y-70);g.lineTo(x+46,y-70);g.lineTo(x+72,y+4);g.closePath();g.fill();g.strokeStyle='#5a5246';g.lineWidth=1.4;g.stroke();
  g.fillStyle='#f2eee4';g.beginPath();g.moveTo(x-46,y-70);g.lineTo(x+46,y-70);g.lineTo(x+30,y-88);g.lineTo(x-30,y-88);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(0,0,0,.14)';g.beginPath();g.moveTo(x+46,y-70);g.lineTo(x+72,y+4);g.lineTo(x+40,y+4);g.closePath();g.fill();
  g.fillStyle='#3a3a30';g.beginPath();g.moveTo(x-18,y+4);g.lineTo(x-14,y-40);g.lineTo(x+14,y-40);g.lineTo(x+18,y+4);g.closePath();g.fill();
  g.fillStyle='#f2eee4';g.beginPath();g.moveTo(x-14,y-40);g.lineTo(x-26+fl,y+2);g.lineTo(x-18,y+4);g.closePath();g.fill();
  g.fillStyle='#3a9a5a';g.fillRect(x-6,y-66,12,24);g.fillRect(x-12,y-60,24,12);g.strokeStyle='#f4f0e8';g.lineWidth=1.4;g.strokeRect(x-6,y-66,12,24);
  g.strokeStyle='#6a5a44';g.lineWidth=1.2;for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*46,y-70);g.lineTo(x+s*92,y+8);g.stroke()}
  g.fillStyle='#8a6a44';g.fillRect(x+52,y-12,26,12);g.fillStyle='#e8e0cc';g.fillRect(x+54,y-16,22,5)},
 phanc(t,T){const x=t.x,y=t.y;PALSH(x+4,y+4,34,10,.4);g.fillStyle='#6e685c';g.beginPath();g.roundRect(x-30,y-16,60,20,4);g.fill();g.fillStyle='#857e70';g.fillRect(x-30,y-16,60,6);
  g.strokeStyle='#2c3038';g.lineCap='round';g.lineWidth=7;g.beginPath();g.moveTo(x,y-14);g.lineTo(x,y-82);g.stroke();g.lineWidth=5;g.beginPath();g.moveTo(x-16,y-72);g.lineTo(x+16,y-72);g.stroke();
  g.lineWidth=6;g.beginPath();g.arc(x,y-38,24,.25*Math.PI,.75*Math.PI);g.stroke();g.strokeStyle='#4a505c';g.lineWidth=2;g.beginPath();g.arc(x,y-38,24,.3*Math.PI,.7*Math.PI);g.stroke();
  g.fillStyle='#2c3038';for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*17,y-21);g.lineTo(x+s*26,y-30);g.lineTo(x+s*22,y-16);g.closePath();g.fill()}
  g.strokeStyle='#2c3038';g.lineWidth=3;g.beginPath();g.arc(x,y-88,6,0,7);g.stroke();
  g.strokeStyle='#8a6a3a';g.lineWidth=2.4;g.beginPath();g.moveTo(x+4,y-86);g.quadraticCurveTo(x+22,y-60,x+12,y-30);g.quadraticCurveTo(x+6,y-18,x+20,y-12);g.stroke()},
 phcrane(t,T){const x=t.x,y=t.y,s=t.v?1:-1,sw=Math.sin(T*1.1+x)*6;PALSH(x+4,y+4,22,7,.4);
  g.strokeStyle='#5a3e26';g.lineWidth=7;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-150);g.stroke();g.lineWidth=5;g.beginPath();g.moveTo(x-4,y-140);g.lineTo(x+110,y-150);g.stroke();
  g.lineWidth=2.4;g.beginPath();g.moveTo(x,y-100);g.lineTo(x+60,y-145);g.moveTo(x,y-30);g.lineTo(x-18,y);g.moveTo(x,y-30);g.lineTo(x+18,y);g.stroke();
  g.strokeStyle='#c8b080';g.lineWidth=1.2;g.beginPath();g.moveTo(x+104,y-150);g.lineTo(x+104+sw,y-70);g.stroke();
  g.fillStyle='#7a5a36';g.fillRect(x+92+sw,y-72,24,20);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(x+92+sw,y-72,24,20);g.beginPath();g.moveTo(x+92+sw,y-72);g.lineTo(x+116+sw,y-52);g.stroke();
  g.fillStyle='#4a3424';g.beginPath();g.arc(x,y-60,9,0,7);g.fill();g.strokeStyle='#c8b080';g.lineWidth=1;g.beginPath();g.arc(x,y-60,6,0,7);g.stroke()},
 phwreck(t,T){const x=t.x,y=t.y,a=-.1,smk=!p6Past('p8sa');PALSH(x+30,y+10,260,40,.4);g.save();g.translate(x,y);g.rotate(a);
  /* ลูกโป่งที่ยุบ */g.fillStyle='#c8b892';g.beginPath();g.moveTo(-170,-110);g.quadraticCurveTo(-60,-210,90,-190);g.quadraticCurveTo(230,-170,300,-100);g.quadraticCurveTo(220,-130,120,-120);g.quadraticCurveTo(0,-150,-170,-110);g.fill();g.strokeStyle='#6a5a3a';g.lineWidth=1.4;g.stroke();
  g.fillStyle='#a89870';for(const[px,py,w]of[[-80,-160,26],[40,-178,30],[170,-150,24]]){g.fillRect(px,py,w,18)}g.strokeStyle='rgba(80,60,40,.6)';g.lineWidth=1;for(let k=-140;k<280;k+=40){g.beginPath();g.moveTo(k,-120-Math.sin((k+140)/420*3.14)*60);g.lineTo(k+10,-96);g.stroke()}
  /* ตัวเรือ */const hg=g.createLinearGradient(0,-100,0,10);hg.addColorStop(0,'#8a6440');hg.addColorStop(1,'#4e3420');g.fillStyle=hg;
  g.beginPath();g.moveTo(-230,-70);g.quadraticCurveTo(-200,0,-60,10);g.lineTo(220,0);g.quadraticCurveTo(330,-10,340,-90);g.lineTo(300,-96);g.lineTo(-200,-96);g.closePath();g.fill();g.strokeStyle='#2e1e10';g.lineWidth=2;g.stroke();
  g.strokeStyle='rgba(30,18,8,.4)';g.lineWidth=1.2;for(let k=-80;k<0;k+=16){g.beginPath();g.moveTo(-210,k);g.quadraticCurveTo(60,k+8,330,k-4);g.stroke()}
  g.fillStyle='#2e1e10';g.beginPath();g.moveTo(-40,-60);g.lineTo(-10,-30);g.lineTo(30,-58);g.lineTo(10,-20);g.lineTo(-30,-24);g.closePath();g.fill();
  g.fillStyle='#d8b050';g.fillRect(-200,-100,520,6);g.fillStyle='#5a3e26';for(let k=-190;k<310;k+=26)g.fillRect(k,-114,4,16);g.fillRect(-200,-116,512,4);
  for(const px of[-140,60,240]){g.fillStyle='#2a1a10';g.beginPath();g.arc(px,-50,9,0,7);g.fill();g.strokeStyle='#c8963a';g.lineWidth=2;g.stroke()}
  /* เสากระโดงหัก */g.strokeStyle='#4a3020';g.lineWidth=8;g.beginPath();g.moveTo(40,-100);g.lineTo(52,-200);g.stroke();g.lineWidth=6;g.beginPath();g.moveTo(54,-206);g.lineTo(140,-160);g.stroke();
  g.fillStyle='#e8e0cc';g.beginPath();g.moveTo(56,-196);g.lineTo(130,-166);g.lineTo(98,-130);g.closePath();g.fill();
  /* หัวเรือ */g.fillStyle='#c8963a';g.beginPath();g.moveTo(-230,-70);g.lineTo(-262,-92);g.lineTo(-236,-84);g.closePath();g.fill();
  g.font='bold 11px system-ui';g.textAlign='center';g.fillStyle='#e8d8a8';g.fillText('ฟ้าเที่ยง',-120,-74);g.restore();
  if(smk){for(let k=0;k<(LOWQ?3:6);k++){const p=(T*.22+k/6)%1,sx=x+20+Math.sin(p*4+k)*14+p*60,sy=y-80-p*200;g.fillStyle='rgba(70,64,60,'+(.32*(1-p))+')';g.beginPath();g.arc(sx,sy,10+p*26,0,7);g.fill()}}},
 phskiff(t,T){const x=t.x,y=t.y+Math.sin(T*1.3)*4,a=Math.sin(T*.9)*.05;g.save();g.fillStyle='rgba(120,140,170,.22)';g.beginPath();g.ellipse(t.x,t.y+20,60,12,0,0,7);g.fill();g.translate(x,y);g.rotate(a);
  g.fillStyle='#d8ccb0';g.beginPath();g.ellipse(0,-78,40,24,0,0,7);g.fill();g.strokeStyle='#7a6a4a';g.lineWidth=1.2;g.stroke();g.strokeStyle='rgba(120,100,70,.5)';for(const dx of[-20,0,20]){g.beginPath();g.moveTo(dx,-100);g.quadraticCurveTo(dx*1.3,-78,dx,-56);g.stroke()}
  g.strokeStyle='#8a7a5a';g.lineWidth=1;for(const dx of[-30,30]){g.beginPath();g.moveTo(dx,-66);g.lineTo(dx*.9,-14);g.stroke()}
  g.fillStyle='#7a5434';g.beginPath();g.moveTo(-50,-16);g.quadraticCurveTo(-40,4,0,6);g.quadraticCurveTo(40,4,50,-16);g.closePath();g.fill();g.strokeStyle='#3a2414';g.lineWidth=1.6;g.stroke();g.fillStyle='#d8b050';g.fillRect(-48,-18,96,3);g.restore();
  g.strokeStyle='#c8b080';g.lineWidth=1.2;g.beginPath();g.moveTo(x-46,y-12);g.quadraticCurveTo(x-90,y-20,x-110,1748);g.stroke()},
 phcrate(t,T){const x=t.x,y=t.y;PALSH(x+3,y+3,16,5,.35);g.fillStyle='#8a6440';g.fillRect(x-13,y-24,26,24);g.strokeStyle='#4a3020';g.lineWidth=1.4;g.strokeRect(x-13,y-24,26,24);g.beginPath();g.moveTo(x-13,y-24);g.lineTo(x+13,y);g.moveTo(x+13,y-24);g.lineTo(x-13,y);g.stroke();
  if(t.v===1){g.fillStyle='#7a5636';g.fillRect(x-10,y-42,20,18);g.strokeRect(x-10,y-42,20,18)}},
 phbarrel(t,T){const x=t.x,y=t.y;PALSH(x+3,y+3,12,4,.35);g.fillStyle='#7a5434';g.beginPath();g.ellipse(x,y-12,11,14,0,0,7);g.fill();g.fillStyle='#8a6440';g.beginPath();g.ellipse(x,y-25,10,3.6,0,0,7);g.fill();
  g.strokeStyle='#3a3a40';g.lineWidth=2;for(const dy of[-21,-5]){g.beginPath();g.moveTo(x-10.6,y+dy);g.quadraticCurveTo(x,y+dy+3,x+10.6,y+dy);g.stroke()}},
 phrope(t,T){const x=t.x,y=t.y;PALSH(x,y+2,14,4,.3);g.strokeStyle='#b89a66';g.lineWidth=3;for(let k=0;k<3;k++){g.beginPath();g.ellipse(x,y-3-k*3,12-k*2,4.6-k*.6,0,0,7);g.stroke()}g.strokeStyle='#8a7048';g.lineWidth=1;g.beginPath();g.ellipse(x,y-3,12,4.6,0,0,7);g.stroke()},
 phlamp(t,T){const x=t.x,y=t.y,nt=phNt(),sw=Math.sin(T*2+x*.03)*2;g.strokeStyle='#3a2a1c';g.lineWidth=2.4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-56);g.lineTo(x+8,y-60);g.stroke();
  g.strokeStyle='#5a4a3a';g.lineWidth=1;g.beginPath();g.moveTo(x+8,y-60);g.lineTo(x+8+sw*.3,y-52);g.stroke();
  g.fillStyle=nt>.15?'#ffcf7a':'#e8946a';g.beginPath();g.ellipse(x+8+sw*.3,y-46,5.6,7,0,0,7);g.fill();g.strokeStyle='rgba(90,40,20,.7)';g.lineWidth=.8;g.stroke();g.fillStyle='#3a2a1c';g.fillRect(x+5+sw*.3,y-54,6,2);g.fillRect(x+5+sw*.3,y-39.6,6,2);
  if(nt>.1){g.save();g.globalCompositeOperation='lighter';glowAt(x+8+sw*.3,y-46,26,'255,190,110',.35*nt+.05*Math.sin(T*4+x));glowAt(x+8,y+4,36,'255,190,110',.12*nt);g.restore()}},
 phtree(t,T){const x=t.x,y=t.y,s=t.sc||1,sw=Math.sin(T*1.2+x*.01)*2.4;PALSH(x-14*s,y+4,34*s,9*s,.38);
  g.strokeStyle='#4a3424';g.lineWidth=7*s;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+6*s,y-50*s,x-22*s+sw*.3,y-96*s);g.stroke();g.lineWidth=3.4*s;g.beginPath();g.moveTo(x+2*s,y-50*s);g.lineTo(x-26*s+sw*.4,y-62*s);g.stroke();
  const C=[['#4f7a3a','#6f9a4a','#8ab85a'],['#3f6a3a','#5a8a48','#7aa858'],['#5a7a3a','#7a9a48','#a0b860']][t.v||0];
  for(const[dx,dy,r,c]of[[-30,-96,30,0],[-4,-104,26,0],[-50,-84,20,0],[-28,-106,22,1],[-6,-112,16,1],[-46,-94,14,1],[-22,-118,12,2],[-38,-104,10,2]]){g.fillStyle=C[c];g.beginPath();g.ellipse(x+dx*s+sw*(c+1)*.4,y+dy*s,r*s,r*.72*s,0,0,7);g.fill()}},
 phrock(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x+3,y+3,26*s,7*s,.38);g.fillStyle='#6e695e';g.beginPath();g.moveTo(x-24*s,y);g.lineTo(x-18*s,y-20*s);g.lineTo(x-2*s,y-30*s);g.lineTo(x+18*s,y-22*s);g.lineTo(x+24*s,y);g.closePath();g.fill();
  g.fillStyle='#8a8476';g.beginPath();g.moveTo(x-18*s,y-20*s);g.lineTo(x-2*s,y-30*s);g.lineTo(x+4*s,y-16*s);g.lineTo(x-12*s,y-8*s);g.closePath();g.fill();g.fillStyle='rgba(110,150,70,.75)';g.beginPath();g.ellipse(x-6*s,y-26*s,10*s,4*s,-.2,0,7);g.fill()},
 phbush(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x,y+2,20*s,5*s,.3);const C=['#557a3c','#4a7040','#62863e'][t.v||0];for(const[dx,dy,r]of[[-10,-8,10],[6,-9,11],[-2,-15,9]]){g.fillStyle=C;g.beginPath();g.ellipse(x+dx*s,y+dy*s,r*s,r*.7*s,0,0,7);g.fill()}
  g.fillStyle=t.v===1?'#f2a8c0':'#fff2c0';for(const[dx,dy]of[[-8,-12],[4,-16],[9,-8]]){g.beginPath();g.arc(x+dx*s,y+dy*s,1.8,0,7);g.fill()}},
 navin(t,T){const N=MAPS[38].npc2;if(!N||N.x<0)return;navinD(N.x,N.y,me.x<N.x?-1:1,T);phLbl('นาวิน · เด็กต้นหน',N.x,N.y-38,'#ffe0a0');
  if(p6Past('p8s')){sfTil(N.x+34,N.y+10,me.x<N.x+34?-1:1,T)}}});
/* ---------- เนื้อเรื่องภาค 8 บทที่ 1 ---------- */
Object.assign(SPK,{sara:['กัปตันซารา · นาวาเมฆ','⚓','#9ad0e8'],navin:['นาวิน · เด็กต้นหน','🧭','#ffd27a']});STNPC.sara=[38,'npc'];STNPC.navin=[38,'npc2'];
STCH.push('ภาค 8 · บทที่ 1 · เสียงตอบจากทะเลเมฆ');
{const C1=STCH.length-1;STY.push(
 {c:C1,g:'talk',k:'cmd',p8s:1,tx:'คุยกับผู้บัญชาการเรนน์ · แสงโคมบนขอบฟ้าทะเลเมฆ',
  pre:[['nar','เจ็ดคืนหลังคืนที่เตาหลอมหัวใจลุกโชน… เพลงกล่อมของสามเมืองยังก้องอยู่ในหูของทุกคน และคืนนี้ บนขอบฟ้าตะวันออก มีแสงโคมนับร้อยดวงลอยอยู่เหนือทะเลเมฆ'],
   ['cmd','ผู้นำ มาดูนี่… ยามบนหอเห็นแสงพวกนั้นตั้งแต่หัวค่ำ มันไม่ใช่ดาว ดาวไม่กะพริบเป็นจังหวะแบบนี้'],
   ['cmd','ตั้งแต่อารัณยาลอยคืนฟ้า เสียงระฆังของมันดังข้ามทะเลเมฆทุกเช้า… ข้าว่าคงไม่ใช่แค่พวกเราที่ได้ยิน',0,0,0,0,0,1],
   ['cmd','ตั้งแต่หัวใจดวงใหม่เต้นกลางนครลี้ภัย แสงของมันส่องข้ามทะเลเมฆไปไกลทุกคืน… ข้าว่าคงไม่ใช่แค่พวกเราที่มองเห็น',0,0,0,0,0,2],
   ['til','(ทิลวิ่งหน้าตื่นเข้ามา) ท่านผู้นำ! มีเรือ! เรือลอยฟ้าลำใหญ่ตกที่ผาท่าเรือเก่า! ไฟลุกด้วย!'],
   ['til','ข้าเห็นควันสีแดงลอยขึ้นจากทุ่งริมผาหลายจุด… แล้วก็มีเงาอะไรตัวใหญ่ ๆ ว่ายวนในเมฆรอบเรือ เหมือนปลา แต่ใหญ่กว่าบ้านอีก!'],
   ['cmd','ผาท่าเรือเก่า… ที่นั่นร้างมาตั้งแต่ค่ายเลิกตกปลาเมฆ ข้าจะให้คนเปิดประตูผาตะวันออกเฉียงใต้เดี๋ยวนี้'],
   ['cmd','ไปเถอะ ใครก็ตามที่อยู่บนเรือลำนั้น… คืนนี้เขาคือคนที่ไม่มีที่ไป เหมือนพวกเราเมื่อก่อน']],rw:{g:120000}},
 {c:C1,g:'map',m:38,tx:'ไปผาท่าเรือเมฆ (ประตูตะวันออกเฉียงใต้ของค่าย)',
  post:[['nar','สุดทางเลียบหน้าผา หญ้าทุกต้นเอนลู่ไปทางเดียวกัน และไกลออกไป… ไม่มีแผ่นดินอีกแล้ว มีแต่ทะเลเมฆสีขาวสุดสายตา'],
   ['nar','สะพานไม้เก่าสามสายยื่นออกไปกลางเมฆ ทางใต้ ซากเรือเหาะลำหนึ่งค้างอยู่บนขอบผา ควันยังลอยกรุ่น ท้ายเรือห้อยอยู่เหนือความว่างเปล่า'],
   ['navin','(เด็กผู้ชายผ้าพันคอสีฟ้าวิ่งเข้ามา กอดเครื่องทองเหลืองรูปหอยสังข์ไว้แน่น) พวกท่านเป็นคนบนแผ่นดินใช่ไหม! ช่วยด้วย! ลูกเรือของเรายังติดอยู่ข้างนอกห้าคน!'],
   ['navin','ข้าชื่อนาวิน ต้นหนเรือ «ฟ้าเที่ยง»… ฝูงฉลามเมฆไล่ตามเรามาสามคืนแล้ว เราบินหนีมาตามเสียงเพลง แล้ว… แล้วเรือก็ไปต่อไม่ไหว'],
   ['sara','(หญิงในเสื้อคลุมนาวิกสีกรมท่า แขนพันผ้า เดินออกมาจากลานไม้) นาวิน ข้าบอกแล้วว่าเราไม่ขอความช่วยเหลือจากใคร'],
   ['sara','…แต่ลูกเรือของข้ายังอยู่ข้างนอก (เธอมองควันสีแดงบนทุ่ง) ถ้าท่านจะช่วย ช่วยพวกเขาก่อน แล้วค่อยมาคุยกับข้า'],
   ['til','(ทิลวิ่งตามมาทัน หอบแฮ่ก) ข้าตามมาด้วย! ควันสีแดงตรงโน้นไง! มีคนรออยู่แน่ ๆ!']]},
 {c:C1,g:'clue',m:38,n:5,p8rs:1,tx:'ช่วยลูกเรือ 5 คนที่ควันสัญญาณสีแดง · ยืนข้างลูกเรือเพื่อพยุงขึ้น แล้วพาไปเต็นท์พยาบาลทีละคน',
  pre:[['navin','ลูกเรือทุกคนพกพลุควันแดงไว้ ถ้าเห็นควันแดงที่ไหน แปลว่ามีคนรออยู่ตรงนั้น'],['navin','พาพวกเขามาที่เต็นท์พยาบาลข้างลานไม้ทีละคนนะ… บางคนขาเจ็บ เดินเองไม่ไหว']],
  post:[['nar','ลูกเรือคนสุดท้ายนั่งลงหน้าเต็นท์พยาบาล ห้าคนห้าสำเนียง แต่ทุกคนฮัมเพลงเดียวกันเบา ๆ… เพลงกล่อมที่ชาวค่ายรู้จักดี'],
   ['nar','ใต้ขอบผา เมฆเริ่มกระเพื่อม ครีบสีเทานับสิบโผล่ขึ้นมาว่ายวนรอบซากเรือ'],
   ['navin','พวกมันตามกลิ่นแกนดาวของเรือมา! ถ้ามันขึ้นมาบนผาได้ เต็นท์พยาบาลไม่รอดแน่!']],rw:{g:90000}},
 {c:C1,g:'kill',m:38,n:40,tx:'ขับไล่ฝูงสัตว์เมฆที่ตามเรือมา (ฉลามเมฆ · นางนวลพายุ · ยักษ์เพรียงหิน)',
  post:[['nar','ฉลามเมฆตัวสุดท้ายดำหายลงไปในทะเลเมฆ ลมที่พัดขึ้นมาจากขอบผาเงียบลงเป็นครั้งแรกในคืนนี้'],
   ['sara','(กัปตันหญิงยืนรออยู่ที่ลานไม้ มือกุมด้ามดาบ) …ฝีมือไม่เลว คนบนแผ่นดิน มาคุยกันหน่อย']],rw:{g:90000}},
 {c:C1,g:'talk',k:'sara',p8sa:1,tx:'คุยกับกัปตันซาราที่ลานไม้ท่าเรือ',
  pre:[['sara','ข้าคือซารา กัปตันแห่งกองเรือ «นาวาเมฆ»… เรือสิบสองลำ คนหนึ่งพันสามร้อยคน ไม่ได้เหยียบแผ่นดินมาสามร้อยปี'],
   ['sara','บ้านของเราคือเกาะ «นาวาลัย» เกาะที่ลอยอยู่กลางทะเลเมฆ จนคืนหนึ่ง เงาบางอย่างใต้เมฆกลืนมันไปทั้งเกาะ บรรพบุรุษของเราขึ้นเรือหนีได้ทันแค่นั้น'],
   ['sara','เจ็ดคืนก่อน กองเรือได้ยินเพลงลอยข้ามทะเลเมฆมา… เพลงกล่อมที่ยายเมฆาของเราร้องได้ทั้งสี่ท่อน'],
   ['me','(…สี่ท่อน? ยายเอดาเคยบอกว่าเพลงกล่อมมีแค่สามท่อน)'],
   ['sara','เราตามเพลงไปถึงเกาะที่เพิ่งลอยพ้นเมฆ ชาวเมืองยังตื่นกลัวคนแปลกหน้า… มีแต่ผู้พิทักษ์ผมเงินคนหนึ่งที่เดินลงมาบอกเรา «ไปหาผู้ถือตราที่ค่ายผู้อพยพ ประตูของเขาเปิดอยู่เสมอ»',0,0,0,0,0,1],
   ['sara','เราตามแสงมา แสงสีทองที่เต้นเป็นจังหวะเหมือนหัวใจลอยอยู่กลางเมืองของท่าน… ข้าไม่เคยเห็นเมืองไหนเอาหัวใจดาวไว้กลางลานให้ใครก็เห็นแบบนี้',0,0,0,0,0,2],
   ['sara','«ฟ้าเที่ยง» เป็นเรือนำทาง เราบินล่วงหน้ามาหาที่จอด แต่ฉลามเมฆตามกลิ่นแกนดาวมาตลอดทาง… เรือที่เหลือยังลอยรออยู่กลางเมฆ ไม่รู้ว่าจะจอดตรงไหน'],
   ['sara','ข้าไม่ชอบขอใคร ผู้ถือตรา… แต่ประภาคารบนผาเหนือนั่น ถ้ามันสว่าง กองเรือจะรู้ว่าที่นี่ปลอดภัย ช่วยจุดมันให้หน่อย ข้าขอแค่นี้']],
  post:[['navin','ประภาคารอยู่บนแหลมทางเหนือ! ยืนตรงหน้าประตูแล้วขึ้นบันไดวนไปถึงตะเกียงข้างบนได้เลย!']],rw:{g:80000,s3:5}},
 {c:C1,g:'clue',m:38,n:1,p8lh:1,tx:'จุดไฟประภาคารผาเหนือ (ยืนในวงหน้าประตูประภาคาร 2.5 วิ)',
  post:[['nar','เปลวไฟในตะเกียงประภาคารลุกพรึ่บ แสงสีทองกวาดข้ามทะเลเมฆเป็นวงกว้าง… ประภาคารผาเหนือสว่างอีกครั้งในรอบหลายสิบปี'],
   ['nar','ไกลออกไปบนขอบฟ้า แสงโคมสิบสองดวงกะพริบตอบสามครั้ง แล้วค่อย ๆ หันหัวเรือมาทางผา'],
   ['sara','(ซาราจ้องแสงบนขอบฟ้าอยู่นาน ก่อนจะยกมือปาดตาเร็ว ๆ) …ลมแรง ฝุ่นเข้าตา']],rw:{g:60000}},
 {c:C1,g:'talk',k:'navin',p8c1:1,tx:'กลับไปหานาวินกับทิลที่ลานไม้ท่าเรือ',
  pre:[['navin','(นาวินยกเครื่องทองเหลืองรูปหอยสังข์ให้ทิลดู) นี่คือเข็มทิศเสียง! มันไม่ได้ชี้ทิศเหนือ มันชี้ไปหาเพลง… ตอนนี้มันชี้มาทางพวกเจ้าตลอดเลย'],
   ['til','ของข้าเป็นเข็มทิศดาว! ชี้หาดาวที่ร่วงได้! (ทิลชูเข็มทิศสำริดขึ้นบ้าง) …เราแลกกันดูไหม'],
   ['navin','(นาวินหัวเราะเป็นครั้งแรก) ไม่ได้หรอก! แต่… เจ้าสอนข้าอ่านเข็มทิศดาวก็ได้นะ ข้าจะสอนเจ้าฟังเพลงของลม'],
   ['sara','ท่าเรือนี้จอดได้แค่ห้าลำ แต่เรามีสิบสองลำ… และคนบนแผ่นดินคงไม่ได้อยากให้คนแปลกหน้าพันกว่าคนมาอยู่ข้างบ้านหรอก จริงไหม'],
   ['sara','พรุ่งนี้กองเรือจะมาถึง ข้าจะขึ้นไปพบผู้นำของท่าน… แล้วค่อยรู้กันว่าประตูของพวกท่านเปิดกว้างแค่ไหน']],
  post:[['nar','⚓ — จบภาค 8 บทที่ 1 · เสียงตอบจากทะเลเมฆ — บทต่อไป: ราคาของการเปิดประตู (เร็ว ๆ นี้)']],rw:{g:150000,s3:8}})}
setTimeout(()=>{try{
    MAPS[1].gates.push({x:2650,y:2250,to:38,req:1,p8:1,nm:'ผาท่าเรือเมฆ',arr:{x:330,y:1600}});
    const M7=MAPS[27];MAPS[38]=Object.assign({},M7,{n:'ผาท่าเรือเมฆ',sx:330,sy:1600,sr:110,seed:381,bg:'#c9d8e8',tile:'#5f8c48',safe:'#6f9a52',ring:'#ffe0a0',t1:'#3e5a32',t2:'#5f8c48',d1:'#9ab0c8',d2:'#ffffff',bth:38,
      fsw:[{x:3046,y:1700,rx:50,ry:36,b:'sky'}],
      gates:[{x:150,y:1600,to:1,req:1,nm:'ค่ายผู้อพยพ',arr:{x:2650,y:2160}}],npc:{x:2000,y:1840,n:'กัปตันซารา · นาวาเมฆ',L:22},npc2:{x:2100,y:1700,n:'นาวิน · เด็กต้นหน'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[700,620],[1400,700],[1100,1200],[600,2150],[1250,2050],[800,2800],[1500,3000]]});
    FIELDM[38]=1;try{FSB[38]='sky'}catch(e){}BTR[38]='150,200,240';GLOWC[38]='255,240,200';FXST[38]='storm';try{BTC[38]=['#f4f8ff','#6a9ac8','#ffffff'];TIER[38]=[76,23,3.05];WRG[38]={1:{rg:240,cd:1.9,spd:320,dm:.85,k:'zap',c:'255,240,150'},2:{rg:270,cd:3.1,spd:230,dm:1.7,k:'seed',c:'150,140,120',big:1}}}catch(e){}}catch(e){console.warn('ph map',e)}
  try{NPC3[38]={d:saraD,s:['ลูกเรือของข้าไม่ใช่ขอทาน','«ฟ้าเที่ยง» บินมาสี่สิบปี ไม่เคยแพ้ลมสักครั้ง… จนคืนนี้','ทะเลเมฆคือบ้าน แผ่นดินคือที่พัก','ยายเมฆาร้องเพลงนี้ให้ข้าฟังทุกคืนตอนเด็ก ๆ'],hy:46}}catch(e){}
  try{Object.assign(DEPM,{38:'harbor'});DEP4.harbor={fog:'235,242,250',fa:.12,bd:.12};AMB2.harbor=['rgba(255,250,235,.16)','rgba(30,40,70,.4)','255,240,210']}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p8rs||st.p8lh)return phAqT(st);return _q(st)}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{phNight()}catch(e){}}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===38&&!phIn(x,y,10))return false;return _aw(x,y)}}catch(e){}
  try{WMN[38]=[240,850,'ผาท่าเรือเมฆ','⚓'];WMLV[38]=[134,138]}catch(e){}
  try{NMLR[38]=[[700,620],[1400,700],[1100,1200],[600,2150],[1250,2050]]}catch(e){}
  try{CZDEF.p8o={nm:'ภาค 8 · ทะเลเมฆไร้ฝั่ง',sub:'บทเปิด',mp:1,get:()=>{const s=czFirst(czCh('ภาค 8 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 8','ทะเลเมฆไร้ฝั่ง'],
    shots:[{i:0,cam:'sky',z:.6,dz:-.01,fx:['night','stars','clouds'],title:1,sfx:'gate'},
     {m:'ยามบนหอเห็นแสง',cam:'mid:cmd',z:1.25,fx:['night','stars']},
     {m:'เสียงระฆังของมัน',cam:'sky',z:.7,fx:['night','clouds','notes']},
     {m:'หัวใจดวงใหม่เต้นกลางนครลี้ภัย',cam:'sky',z:.7,fx:['night','heart','stars']},
     {m:'ทิลวิ่งหน้าตื่น',cam:'me',z:1.4,fx:['night'],sfx:'quest'},
     {m:'เงาอะไรตัวใหญ่',cam:{dx:300,dy:220},z:.75,fx:['night','clouds','shadows']},
     {m:'ผาท่าเรือเก่า',cam:'npc:cmd',z:1.3,fx:['night']},
     {m:'คนที่ไม่มีที่ไป',cam:{dx:340,dy:300},z:.8,fx:['night','clouds','bird']}]};CZORD.push('p8o');CZMAP=null}catch(e){console.warn('p8 cz',e)}},0);
