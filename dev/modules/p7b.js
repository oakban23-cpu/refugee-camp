/* ---------- v357 ภาค 7 บทที่ 2 · ราคาของดาว (แมพ 35 · เหมืองดาวคาร์น) ---------- */
const KPIT={x:1650,y:1880,r:300};
const KCAMP={x:820,y:820};
const KTUN=[[330,1420],[2880,1250],[700,2880],[2600,2900]];
const KMIN=[[520,1430],[2690,1290],[830,2720],[2470,2760]];
const KMESA=[[560,470,150],[2760,560,170],[290,2230,160],[2960,2130,140],[1660,2980,150],[1150,1260,95],[2280,1720,105]];
const KCRN=[[1390,1600],[1930,1640],[1470,2170]];
const KRAIL=[[[1600,330],[1620,700],[1650,1060],[1650,1540]],[[1650,1060],[1200,1130],[800,1290],[380,1420]],[[1650,1060],[2150,1100],[2550,1180],[2850,1250]],[[1650,2200],[1350,2480],[1020,2700],[720,2860]],[[1650,2200],[1980,2480],[2330,2720],[2590,2880]],[[820,820],[1000,1000],[1200,1130]]];
const KORE=[[980,1650,0],[2380,1380,1],[1180,2380,2],[2150,2300,0],[640,1880,1],[2620,1980,2],[1960,820,1],[1300,700,0]];
const KMLORE=['คนงานคนแรกติดอยู่ใต้คานไม้ «ข้านึกว่าไม่มีใครมาแล้ว… ท่านบรอมสั่งปิดอุโมงค์นี้ตั้งแต่เมื่อวาน บอกว่าดาวสำคัญกว่า»',
 'คนงานคนที่สองกอดตะเกียงแน่น «แสงดาวทะลุผนังหินมาทั้งคืน มันอุ่นนะ… อุ่นเหมือนมีใครมานั่งข้าง ๆ»',
 'คนงานคนที่สามขาเจ็บ แต่ยังยิ้มได้ «พวกเราขุดดาวมาเจ็ดคืน ได้ค่าแรงเป็นขนมปังวันละก้อน ราคาดาวที่บรอมขายได้ต่อชิ้น… เลี้ยงคนทั้งหมู่บ้านได้เป็นปี»',
 'คนงานคนสุดท้ายยังกำเศษดาวไว้ในมือ «ข้าไม่ได้ขโมย… ข้าแค่อยากให้ลูกได้เห็นแสงแบบนี้สักครั้ง»'];
const KZN={edge:['ปากหุบผาคาร์น','ทางลงเหมืองที่ชันจนเกวียนต้องผูกเชือก'],camp:['ค่ายคนงาน','กองไฟเล็ก ๆ กับเต็นท์ปะชุนนับสิบหลัง'],pit:['หลุมดาวคาร์น','ดาวดวงใหญ่ร่วงลงมาที่นี่เมื่อเจ็ดคืนก่อน'],deep:['ปากอุโมงค์ลึก','เสียงขุดยังดังมาจากในความมืด'],field:['ลานเหมืองดาว','รางเกวียนแร่ทอดผ่านฝุ่นแดง']};
let KMN={dust:[],gl:[],sp:[],st:0};
const kmZone=(x,y)=>y<480?'edge':Math.hypot(x-KPIT.x,y-KPIT.y)<KPIT.r+90?'pit':Math.hypot(x-KCAMP.x,y-KCAMP.y)<330?'camp':KTUN.some(([tx,ty])=>Math.hypot(x-tx,y-ty)<300)?'deep':'field';
const kmSegD=(x,y)=>{let d=1e9;for(const L of KRAIL)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d};
const gP7br=()=>p6From('p7br');
function kmBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(3535);
  const ok=(x,y,m)=>Math.hypot(x-M.sx,y-M.sy)>M.sr+60+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>120+m)&&Math.hypot(x-KPIT.x,y-KPIT.y)>KPIT.r+70+m&&KMESA.every(([mx,my,r])=>Math.hypot(x-mx,y-my)>r+40+m)
    &&Math.hypot(x-KCAMP.x,y-KCAMP.y)>300+m&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>120+m)&&KMIN.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>130+m)&&kmSegD(x,y)>60+m&&Math.hypot(x-1880,y-520)>150+m;
  KMESA.forEach(([x,y,r],i)=>trees.push({x,y,r:r*.82,k:'kmesa',v:i,ht:150,hw:r+20,fw:r}));
  KCRN.forEach(([x,y],i)=>trees.push({x,y,r:20,k:'kcrn',v:i,ht:230,hw:90}));
  KTUN.forEach(([x,y],i)=>trees.push({x,y:y-30,r:60,k:'ktun',v:i,ht:140,hw:110,fw:90}));
  KMIN.forEach(([x,y],i)=>trees.push({x,y,r:16,k:'krub',v:i,ht:60,hw:50}));
  KORE.forEach(([x,y,v],i)=>trees.push({x,y,r:30,k:'kore',v,ht:80,hw:46}));
  for(let i=0,n=0;i<400&&n<26;i++){const x=180+R()*2840,y=560+R()*2480;if(!ok(x,y,0))continue;trees.push({x,y,r:14,k:R()<.55?'kbld':'kcac',v:(R()*3)|0,sc:.8+R()*.5,ht:70,hw:30});n++}
  /* เสาตะเกียงตามราง */for(const L of KRAIL)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=120;d<dl;d+=330){const t=d/dl,px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t,nx=-(b[1]-a[1])/dl,ny=(b[0]-a[0])/dl,x=px+nx*44,y=py+ny*44;if(Math.hypot(x-KPIT.x,y-KPIT.y)<KPIT.r+40||Math.hypot(x-M.sx,y-M.sy)<M.sr+40)continue;trees.push({x,y,r:6,k:'kpole',ht:110})}}
  /* เกวียนแร่บนราง */[[1636,860,0],[1000,1210,1],[2350,1140,2],[1180,2600,0],[2160,2600,1]].forEach(([x,y,v])=>trees.push({x,y,r:22,k:'kcart',v,ht:50,hw:40}));
  /* ค่ายคนงาน */const C=KCAMP;[[C.x-170,C.y-80,0],[C.x+140,C.y-120,1],[C.x-120,C.y+130,2],[C.x+170,C.y+100,0]].forEach(([x,y,v])=>trees.push({x,y,r:32,k:'ktent',v,ht:100,hw:56,fw:52}));
  trees.push({x:C.x,y:C.y,r:14,k:'kfire',ht:40});[[C.x-60,C.y+40,0],[C.x+70,C.y+30,1],[C.x+20,C.y-60,2]].forEach(([x,y,v])=>trees.push({x,y,r:8,k:'kwrk',v,ht:50,ns:1}));
  trees.push({x:1880,y:520,r:44,k:'koff',ht:120,hw:80,fw:70});
  /* หอลิฟต์ที่ขอบหลุม */trees.push({x:KPIT.x,y:KPIT.y-KPIT.r-40,r:30,k:'klift',ht:220,hw:80});
  trees.push({x:2000,y:1360,r:0,k:'cel5',ht:90,ns:1,nc:1});
  KMN.dust=[];for(let i=0;i<90;i++)KMN.dust.push([R()*3200,R()*3200,120+R()*240,R()]);
  KMN.gl=[];for(let i=0;i<140;i++){const x=R()*3200,y=560+R()*2600;if(Math.hypot(x-KPIT.x,y-KPIT.y)<KPIT.r)continue;KMN.gl.push([x,y,R()*6])}
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.k==='cel5'||t.k==='kwrk'||t.k==='kpole')return;PAL.dec.push({k:'ao',b:[t.x-80,t.y-30,t.x+80,t.y+40],x:t.x,y:t.y,r:t.r,w:t.hw||0})})}
function kmPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S;
  const bg=c.createLinearGradient(0,0,0,3200);bg.addColorStop(0,'#7a5034');bg.addColorStop(.5,'#6a4430');bg.addColorStop(1,'#583626');c.fillStyle=bg;c.fillRect(ox,oy,S,S);
  for(const[x,y,r,v]of KMN.dust){if(x+r<ox||x-r>X1||y+r<oy||y-r>Y1)continue;const g2=c.createRadialGradient(x,y,4,x,y,r);g2.addColorStop(0,v<.5?'rgba(160,110,70,.2)':'rgba(40,24,18,.18)');g2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}
  /* ชั้นหินตะกอน (ลายเฉียง) */
  c.lineCap='round';palGrid(ox,oy,X1,Y1,120,90,1,(x,y,i,j)=>{const h=palH(i,j,551);if(h<.45)return;const px=x+palH(j,i,552)*80,py=y+palH(i,j,553)*60,L=60+h*120;c.strokeStyle=h>.8?'rgba(170,120,80,.22)':'rgba(40,22,14,.2)';c.lineWidth=3+h*4;c.beginPath();c.moveTo(px-L*.5,py+L*.12);c.quadraticCurveTo(px,py-6,px+L*.5,py-L*.12);c.stroke()});
  /* กรวด + รอยแตก */
  palGrid(ox,oy,X1,Y1,40,34,1,(x,y,i,j)=>{const h=palH(i,j,561);if(h<.58)return;const px=x+palH(j,i,562)*36,py=y+palH(i,j,563)*28;if(kmSegD(px,py)<30)return;
    if(h>.9){c.strokeStyle='rgba(30,16,10,.4)';c.lineWidth=1.4;c.beginPath();c.moveTo(px,py);c.lineTo(px+10,py+4);c.lineTo(px+16,py-2);c.moveTo(px+10,py+4);c.lineTo(px+12,py+12);c.stroke();return}
    c.fillStyle='rgba(20,10,6,.3)';c.beginPath();c.ellipse(px+1,py+2,3+h*4,1.6+h*2,0,0,7);c.fill();c.fillStyle=h>.75?'#9a7050':'#7a5640';c.beginPath();c.ellipse(px,py,2.4+h*3.4,1.6+h*2.2,0,0,7);c.fill();c.fillStyle='rgba(220,180,140,.4)';c.fillRect(px-1,py-1.4,1.6,1)});
  /* ทางเดินอัดแน่นใต้ราง */
  for(const L of KRAIL){for(const[w,col]of[[74,'rgba(30,16,10,.25)'],[58,'#5a3a26'],[40,'#68462e']]){c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}}
  /* หมอนรางไม้ + รางเหล็ก */
  for(const L of KRAIL){for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]),ux=(b[0]-a[0])/dl,uy=(b[1]-a[1])/dl,nx=-uy,ny=ux;if(Math.max(a[0],b[0])+40<ox||Math.min(a[0],b[0])-40>X1||Math.max(a[1],b[1])+40<oy||Math.min(a[1],b[1])-40>Y1)continue;
      for(let d=8;d<dl;d+=22){const px=a[0]+ux*d,py=a[1]+uy*d;c.strokeStyle='#3e2616';c.lineWidth=7;c.beginPath();c.moveTo(px-nx*15,py-ny*15);c.lineTo(px+nx*15,py+ny*15);c.stroke();c.strokeStyle='rgba(150,100,60,.35)';c.lineWidth=2;c.beginPath();c.moveTo(px-nx*14-ux*2,py-ny*14-uy*2);c.lineTo(px+nx*14-ux*2,py+ny*14-uy*2);c.stroke()}}
    for(const s of[-9,9]){c.strokeStyle='#2a2a30';c.lineWidth=3.4;c.beginPath();L.forEach(([x,y],i)=>{const a=L[Math.max(0,i-1)],b=L[Math.min(L.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],dl=Math.hypot(dx,dy)||1;const px=x-dy/dl*s,py=y+dx/dl*s;i?c.lineTo(px,py):c.moveTo(px,py)});c.stroke();c.strokeStyle='rgba(200,200,215,.55)';c.lineWidth=1.2;c.stroke()}}
  /* หลุมดาวคาร์น: ขั้นบันไดวนลงก้นหลุม */
  {const P=KPIT;if(P.x+P.r*1.6>ox&&P.x-P.r*1.6<X1&&P.y+P.r*1.6>oy&&P.y-P.r*1.6<Y1){
    c.strokeStyle='rgba(20,10,6,.4)';c.lineWidth=2.4;for(let k=0;k<22;k++){const a=k/22*6.283,l=P.r*(1.18+palH(k,7,571)*.35);c.beginPath();c.moveTo(P.x+Math.cos(a)*P.r*1.02,P.y+Math.sin(a)*P.r*.9);c.lineTo(P.x+Math.cos(a)*l,P.y+Math.sin(a)*l*.88);c.stroke()}
    c.fillStyle='rgba(16,8,4,.5)';c.beginPath();c.ellipse(P.x+8,P.y+18,P.r*1.1,P.r*.98,0,0,7);c.fill();
    const cols=['#7a5236','#64422c','#523624','#422a1e','#32201a','#24161a'];for(let k=0;k<6;k++){const f=1-k*.14;c.fillStyle=cols[k];c.beginPath();c.ellipse(P.x,P.y+k*8,P.r*f*1.05,P.r*f*.92,0,0,7);c.fill();c.strokeStyle='rgba(200,150,100,'+(.35-k*.04)+')';c.lineWidth=2;c.beginPath();c.ellipse(P.x,P.y+k*8,P.r*f*1.05,P.r*f*.92,0,Math.PI*1.05,Math.PI*1.95);c.stroke()}
    /* ทางลาดวน */c.strokeStyle='rgba(120,80,50,.6)';c.lineWidth=14;c.beginPath();for(let a=0;a<4.6;a+=.1){const f=1-a/4.6*.7,px=P.x+Math.cos(a-1.57)*P.r*f*.98,py=P.y+a*9+Math.sin(a-1.57)*P.r*f*.86;a?c.lineTo(px,py):c.moveTo(px,py)}c.stroke();
    /* ก้นหลุม: ดาวดวงใหญ่ที่ร้าว */const sx=P.x,sy=P.y+50;const cg=c.createRadialGradient(sx,sy,0,sx,sy,P.r*.55);cg.addColorStop(0,'rgba(150,220,255,.6)');cg.addColorStop(1,'rgba(150,220,255,0)');c.fillStyle=cg;c.beginPath();c.arc(sx,sy,P.r*.55,0,7);c.fill();
    c.fillStyle='#bfe8ff';c.beginPath();c.moveTo(sx,sy-58);c.lineTo(sx+30,sy-14);c.lineTo(sx+52,sy+8);c.lineTo(sx+22,sy+26);c.lineTo(sx-6,sy+34);c.lineTo(sx-40,sy+18);c.lineTo(sx-48,sy-10);c.lineTo(sx-22,sy-30);c.closePath();c.fill();
    c.fillStyle='#ffffff';c.beginPath();c.moveTo(sx,sy-58);c.lineTo(sx+30,sy-14);c.lineTo(sx+4,sy-4);c.lineTo(sx-22,sy-30);c.closePath();c.fill();c.fillStyle='rgba(60,120,190,.5)';c.beginPath();c.moveTo(sx+4,sy-4);c.lineTo(sx+52,sy+8);c.lineTo(sx+22,sy+26);c.lineTo(sx-6,sy+34);c.closePath();c.fill();
    c.strokeStyle='#1a2a4a';c.lineWidth=2.6;c.beginPath();c.moveTo(sx-6,sy-50);c.lineTo(sx+2,sy-24);c.lineTo(sx-10,sy-2);c.lineTo(sx+6,sy+20);c.moveTo(sx+2,sy-24);c.lineTo(sx+26,sy-8);c.stroke();
    /* นั่งร้านรอบดาว */c.strokeStyle='#5a3a1e';c.lineWidth=4;for(const s of[-1,1]){c.beginPath();c.moveTo(sx+s*70,sy+30);c.lineTo(sx+s*62,sy-60);c.moveTo(sx+s*70,sy-10);c.lineTo(sx+s*20,sy-10);c.stroke()}c.strokeStyle='rgba(200,170,120,.8)';c.lineWidth=1.2;c.beginPath();c.moveTo(sx,P.y-P.r-40);c.lineTo(sx,sy-58);c.stroke()}}
  /* ค่ายคนงาน: ลานดินอัด */
  {const C=KCAMP;if(C.x+300>ox&&C.x-300<X1&&C.y+260>oy&&C.y-260<Y1){c.fillStyle='rgba(20,10,6,.25)';c.beginPath();c.ellipse(C.x+6,C.y+10,280,200,0,0,7);c.fill();c.fillStyle='#7e5a3c';c.beginPath();c.ellipse(C.x,C.y,270,190,0,0,7);c.fill();c.strokeStyle='rgba(60,36,20,.5)';c.lineWidth=2;c.setLineDash([10,8]);c.beginPath();c.ellipse(C.x,C.y,250,172,0,0,7);c.stroke();c.setLineDash([]);
    c.fillStyle='rgba(30,16,8,.5)';c.beginPath();c.ellipse(C.x,C.y+4,40,22,0,0,7);c.fill()}}
  /* หน้าผาขอบหุบ (ขอบแมพ) */
  {const band=(x0,y0,x1,y1)=>{if(x1<ox||x0>X1||y1<oy||y0>Y1)return;c.fillStyle='#3a2418';c.fillRect(x0,y0,x1-x0,y1-y0)};band(0,0,3200,120);band(0,3080,3200,3200);band(0,0,60,3200);band(3140,0,3200,3200);
    for(const[s,horiz]of[[0,1],[1,1],[0,0],[1,0]]){for(let k=0;k<3200;k+=60){const h=palH(k,s*7+horiz,581),d=40+h*60;let x,y,w,hh;if(horiz){x=k;w=62;y=s?3200-120-d:120;hh=d;if(s)hh=d}else{y=k;hh=62;x=s?3200-60-d:60;w=d}if(x+w<ox||x>X1||y+hh<oy||y>Y1)continue;
      c.fillStyle=h>.5?'#4a3020':'#3e281a';c.fillRect(x,y,w,hh);c.fillStyle='rgba(190,130,80,.22)';if(horiz)c.fillRect(x,s?y:y+hh-4,w,4);else c.fillRect(s?x:x+w-4,y,4,hh)}}}
  /* เส้นแร่ดาวในพื้นหิน */
  palGrid(ox,oy,X1,Y1,160,140,1,(x,y,i,j)=>{const h=palH(i,j,591);if(h<.82)return;const px=x+palH(j,i,592)*120,py=y+palH(i,j,593)*100;if(kmSegD(px,py)<40||Math.hypot(px-KPIT.x,py-KPIT.y)<KPIT.r+40)return;c.strokeStyle='rgba(100,190,240,.5)';c.lineWidth=2;c.beginPath();c.moveTo(px,py);c.lineTo(px+14,py-6);c.lineTo(px+26,py+2);c.lineTo(px+40,py-8);c.stroke();c.fillStyle='#c8f0ff';c.fillRect(px+13,py-7,2.4,2.4);c.fillRect(px+39,py-9,2.4,2.4)})}
function kmGroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();g.globalCompositeOperation='lighter';
  for(const[x,y,ph]of KMN.gl){if(!palVis(x,y,10))continue;const q=Math.sin(T*1.3+ph);if(q<.6)continue;glowAt(x,y,3,'140,220,255',(q-.6)*2)}
  {const P=KPIT;if(palVis(P.x,P.y,P.r)){const pu=.7+.3*Math.sin(T*1.1);glowAt(P.x,P.y+40,P.r*.75,'120,200,255',.22*pu);glowAt(P.x,P.y+40,70,'220,245,255',.4*pu);
    /* ดาวรั่วแสง (แสงพุ่งเป็นสาย ๆ ขึ้นจากรอยร้าว) */if(!Q)for(let k=0;k<6;k++){const q=(T*.4+k/6)%1;glowAt(P.x+Math.sin(k*2.4)*40,P.y+20-q*220,3,'200,240,255',.9*Math.sin(q*3.14))}}}
  /* ตะเกียงเสา */for(const t of trees){if(t.k!=='kpole'||!palVis(t.x,t.y-100,40))continue;glowAt(t.x,t.y-98,22,'255,190,110',.45+.1*Math.sin(T*6+t.x));glowAt(t.x,t.y-4,40,'255,170,90',.1)}
  {const C=KCAMP;if(palVis(C.x,C.y,80)){const f=.7+.3*Math.sin(T*9)*Math.sin(T*5.3);glowAt(C.x,C.y-10,90,'255,150,60',.28*f);glowAt(C.x,C.y-14,28,'255,220,140',.6*f)}}
  /* ประกายจากแร่ */for(const[x,y]of KORE){if(!palVis(x,y,40))continue;glowAt(x,y-24,30,'120,210,255',.18+.08*Math.sin(T*2+x))}
  /* คนงานที่ติดอยู่: แสงตะเกียงหรี่ ๆ ใต้กองหิน */{const st=stCur(),q=me.sty;if(st&&st.p7rs&&q&&q.a===1)KMIN.forEach(([x,y],i)=>{if((q.p7rs|0)>>i&1||!palVis(x,y,60))return;const d=Math.hypot(me.x-x,me.y-y),a=d<420?1:.45;glowAt(x,y-14,34,'255,200,120',(.35+.2*Math.sin(T*4+i))*a)})}
  g.globalCompositeOperation='source-over';
  /* ฝุ่นลอย */if(!Q){g.fillStyle='rgba(230,190,150,.35)';for(let i=0;i<40;i++){const x=me.x-420+((i*137+T*14*(1+i%3))%840),y=me.y-460+((i*211+Math.sin(T*.6+i)*30)%920);g.fillRect(x,y,2,2)}}
  g.restore()}
function kmScreen(T,z,Hs){g.save();const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.36,SW0/2,Hs/2,Math.max(SW0,Hs)*.78);vg.addColorStop(0,'rgba(60,24,10,0)');vg.addColorStop(1,'rgba(50,20,8,.32)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  /* หมอกฝุ่นแดงด้านล่าง */const hg=g.createLinearGradient(0,Hs*.7,0,Hs);hg.addColorStop(0,'rgba(170,100,60,0)');hg.addColorStop(1,'rgba(170,100,60,.12)');g.fillStyle=hg;g.fillRect(0,Hs*.7,SW0,Hs*.3);g.restore()}
function kmTick(dt,now,x,y,mv){if(me.down<=0){me.x=Math.max(80,Math.min(3120,me.x));me.y=Math.max(150,Math.min(3060,me.y))}
  {const C=MAPS[35].npc2,on=gP7br();C.x=on?2000:-9999;C.y=on?1360:-9999}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p7rs)return;
  KMIN.forEach(([sx,sy],i)=>{if((q.p7rs|0)>>i&1||Math.hypot(x-sx,y-sy)>90)return;q.p7rs=(q.p7rs|0)|(1<<i);let n=0;for(let k=0;k<4;k++)if(q.p7rs>>k&1)n++;q.n=n;PALG.card={h:'⛏️ ช่วยคนงาน '+n+'/4',t:KMLORE[i],s:now,d:9};try{sfx('quest')}catch(e){}try{burst(sx,sy-10,['#ffd090','#ffffff','#c8a070'],30,150,1,{glow:1,g:-40})}catch(e){}try{stHud();writeSave()}catch(e){}})}
function kmAqT(st){if(!st.p7rs||!me.sty)return null;let b=null,bd=1e9;KMIN.forEach(([x,y],i)=>{if((me.sty.p7rs|0)>>i&1)return;const d=curMap===35?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x:x+(x<1600?110:-110),y:y+20}}});return b?{mp:35,act:'reach',x:b.x,y:b.y,lb:'ไปช่วยคนงานที่ติดอยู่'}:null}
/* ---------- ฉากแมพ 35 ---------- */
function bromD(x,y,f,t){campFolk(x,y,{c:'#6a4a2e',sh:'#3a2a1a',hair:'#8a6a4a',f,s:1.32,k:7,arm:Math.sin(t*1.6)*.2-.2},t);
  /* หมวกเหมือง + ตะเกียง */g.fillStyle='#c89030';g.beginPath();g.ellipse(x,y-40,10,4,0,Math.PI,0);g.fill();g.fillRect(x-10,y-41,20,3);g.fillStyle='#ffe0a0';g.beginPath();g.arc(x+f*4,y-44,2.4,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x+f*4,y-44,10,'255,210,140',.6);g.restore();
  /* เครา */g.fillStyle='#8a6a4a';g.beginPath();g.moveTo(x-6,y-30);g.quadraticCurveTo(x,y-18,x+6,y-30);g.closePath();g.fill();
  /* ถุงเหรียญที่เอว */g.fillStyle='#b88a3a';g.beginPath();g.arc(x-f*8,y-12,4,0,7);g.fill();g.strokeStyle='#5a3a10';g.lineWidth=1;g.stroke()}
Object.assign(PALK,{
 kmesa(t,T){const x=t.x,y=t.y,r=KMESA[t.v][2],h=r*.7;PALSH(x+10,y+8,r*1.1,r*.38,.5);
  g.fillStyle='#4a2c1c';g.beginPath();g.moveTo(x-r,y);g.lineTo(x-r*.9,y-h);g.lineTo(x+r*.85,y-h*1.05);g.lineTo(x+r,y);g.quadraticCurveTo(x,y+r*.28,x-r,y);g.fill();
  for(let k=1;k<4;k++){g.strokeStyle=k%2?'rgba(150,90,60,.45)':'rgba(30,16,10,.4)';g.lineWidth=3;g.beginPath();g.moveTo(x-r*.96,y-h*k/4);g.lineTo(x+r*.95,y-h*k/4-4);g.stroke()}
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.moveTo(x+r*.3,y-h*1.02);g.lineTo(x+r*.85,y-h*1.05);g.lineTo(x+r,y);g.lineTo(x+r*.4,y+r*.22);g.closePath();g.fill();
  g.fillStyle='#8a5a3a';g.beginPath();g.ellipse(x-r*.02,y-h,r*.9,r*.3,-.02,0,7);g.fill();g.fillStyle='#9a6a46';g.beginPath();g.ellipse(x-r*.12,y-h-3,r*.6,r*.18,-.02,0,7);g.fill();
  g.strokeStyle='#24140c';g.lineWidth=1.4;g.beginPath();g.moveTo(x-r,y);g.lineTo(x-r*.9,y-h);g.stroke();g.beginPath();g.moveTo(x+r*.85,y-h*1.05);g.lineTo(x+r,y);g.stroke();
  if(t.v%2===0){g.strokeStyle='rgba(120,210,255,'+(.55+.3*Math.sin(T*2+t.v))+')';g.lineWidth=2;g.beginPath();g.moveTo(x-r*.5,y-h*.7);g.lineTo(x-r*.3,y-h*.45);g.lineTo(x-r*.42,y-h*.2);g.stroke()}},
 kcrn(t,T){const x=t.x,y=t.y,sw=Math.sin(T*.7+t.v)*.1;PALSH(x,y+4,40,10,.4);g.strokeStyle='#4a2e16';g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(x-30,y);g.lineTo(x,y-200);g.lineTo(x+30,y);g.stroke();g.lineWidth=3;g.beginPath();g.moveTo(x-20,y-70);g.lineTo(x+20,y-70);g.moveTo(x-12,y-130);g.lineTo(x+12,y-130);g.moveTo(x-24,y-40);g.lineTo(x+16,y-110);g.stroke();
  g.strokeStyle='#5a3a1e';g.lineWidth=5;const bx=x,by=y-190,ax=bx+Math.cos(-.35+sw)*130,ay=by+Math.sin(-.35+sw)*130*.6;g.beginPath();g.moveTo(bx-30,by+20);g.lineTo(ax,ay);g.stroke();
  g.strokeStyle='rgba(200,180,150,.8)';g.lineWidth=1.2;g.beginPath();g.moveTo(ax,ay);g.lineTo(ax,ay+90);g.stroke();g.fillStyle='#6a4a2a';g.fillRect(ax-10,ay+90,20,14);g.fillStyle='#9ad8ff';g.fillRect(ax-6,ay+92,12,6);
  g.fillStyle='#3a2414';g.beginPath();g.arc(bx-10,by+40,12,0,7);g.fill();g.strokeStyle='#a07040';g.lineWidth=1.4;for(let k=0;k<4;k++){const a=T*1.4+k*1.57;g.beginPath();g.moveTo(bx-10,by+40);g.lineTo(bx-10+Math.cos(a)*11,by+40+Math.sin(a)*11);g.stroke()}},
 ktun(t,T){const x=t.x,y=t.y+30;PALSH(x,y+6,100,22,.45);g.fillStyle='#3a2216';g.beginPath();g.moveTo(x-110,y);g.quadraticCurveTo(x-120,y-120,x-30,y-150);g.quadraticCurveTo(x+60,y-170,x+110,y-110);g.quadraticCurveTo(x+130,y-40,x+110,y);g.closePath();g.fill();
  g.fillStyle='#4e3020';g.beginPath();g.moveTo(x-100,y-60);g.quadraticCurveTo(x-90,y-140,x-20,y-146);g.quadraticCurveTo(x-60,y-110,x-70,y-40);g.closePath();g.fill();
  g.fillStyle='#08040a';g.beginPath();g.moveTo(x-46,y);g.lineTo(x-46,y-60);g.quadraticCurveTo(x,y-100,x+46,y-60);g.lineTo(x+46,y);g.closePath();g.fill();
  g.strokeStyle='#6a4422';g.lineWidth=7;g.beginPath();g.moveTo(x-50,y);g.lineTo(x-50,y-66);g.moveTo(x+50,y);g.lineTo(x+50,y-66);g.moveTo(x-58,y-68);g.lineTo(x+58,y-68);g.stroke();
  const a=.5+.5*Math.sin(T*1.7+t.v*2);g.save();g.globalCompositeOperation='lighter';glowAt(x,y-30,40,'100,180,255',.12+.1*a);if(a>.8){glowAt(x-10,y-34,2.4,'160,240,255',.9);glowAt(x+6,y-35,2.4,'160,240,255',.9)}g.restore()},
 krub(t,T){const x=t.x,y=t.y,st=stCur(),q=me.sty,save=q&&((q.p7rs|0)>>t.v&1||p6Past('p7rs'));PALSH(x,y+4,46,10,.4);
  for(const[dx,dy,r,c]of[[-26,-4,16,'#5a3a26'],[14,-2,20,'#6a4430'],[-4,-18,14,'#7a5238'],[28,-16,10,'#5a3a26'],[-30,-20,9,'#6a4430']]){g.fillStyle=c;g.beginPath();g.ellipse(x+dx,y+dy,r,r*.75,0,0,7);g.fill();g.strokeStyle='#24140c';g.lineWidth=1;g.stroke()}
  g.strokeStyle='#4a2e16';g.lineWidth=5;g.beginPath();g.moveTo(x-38,y-30);g.lineTo(x+30,y-6);g.stroke();
  if(save){campFolk(x+46,y+6,{c:'#7a6a50',hair:'#3a2414',f:-1,k:t.v*5,s:1,arm:Math.sin(T*3+t.v)*.5-.5},T)}
  else if(st&&st.p7rs&&q&&q.a===1){const b=Math.sin(T*3+t.v)*3;g.font='16px system-ui';g.textAlign='center';g.fillText('🆘',x,y-46+b)}},
 kore(t,T){const x=t.x,y=t.y,c=['#7ad8ff','#a8c8ff','#9af0f0'][t.v];PALSH(x,y+3,30,8,.4);g.fillStyle='#4a2e1e';g.beginPath();g.moveTo(x-30,y);g.lineTo(x-24,y-26);g.lineTo(x-4,y-36);g.lineTo(x+22,y-28);g.lineTo(x+30,y);g.closePath();g.fill();g.strokeStyle='#1a0e08';g.lineWidth=1.2;g.stroke();
  for(const[dx,h,w]of[[-12,30,5],[2,42,6],[14,24,4]]){g.fillStyle=c;g.beginPath();g.moveTo(x+dx-w,y-20);g.lineTo(x+dx,y-20-h);g.lineTo(x+dx+w,y-20);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.moveTo(x+dx,y-20-h);g.lineTo(x+dx+w*.4,y-22);g.lineTo(x+dx,y-20);g.closePath();g.fill()}},
 kbld(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x+2,y+3,22*s,6*s,.35);g.fillStyle=['#6a4430','#5a3a28','#7a5038'][t.v];g.beginPath();g.ellipse(x,y-8*s,22*s,14*s,0,0,7);g.fill();g.fillStyle='rgba(255,220,180,.15)';g.beginPath();g.ellipse(x-6*s,y-14*s,10*s,5*s,-.3,0,7);g.fill();g.strokeStyle='#24140c';g.lineWidth=1;g.beginPath();g.ellipse(x,y-8*s,22*s,14*s,0,0,7);g.stroke()},
 kcac(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x,y+2,12*s,4,.3);g.strokeStyle='#4a5a3a';g.lineWidth=7*s;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x,y-46*s);g.stroke();g.lineWidth=5*s;g.beginPath();g.moveTo(x,y-20*s);g.lineTo(x-12*s,y-20*s);g.lineTo(x-12*s,y-34*s);g.moveTo(x,y-28*s);g.lineTo(x+11*s,y-28*s);g.lineTo(x+11*s,y-40*s);g.stroke();g.fillStyle='#ffb0d0';g.beginPath();g.arc(x,y-48*s,2.6*s,0,7);g.fill()},
 kpole(t,T){const x=t.x,y=t.y;g.strokeStyle='#3a2414';g.lineWidth=4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-100);g.lineTo(x+8,y-100);g.stroke();g.fillStyle='#c8902a';g.fillRect(x+3,y-98,10,12);g.fillStyle='#fff0c0';g.fillRect(x+5,y-96,6,8)},
 kcart(t,T){const x=t.x,y=t.y;PALSH(x,y+6,28,7,.4);g.fillStyle='#3a3a44';g.beginPath();g.moveTo(x-26,y-30);g.lineTo(x+26,y-30);g.lineTo(x+20,y-4);g.lineTo(x-20,y-4);g.closePath();g.fill();g.strokeStyle='#14141a';g.lineWidth=1.4;g.stroke();g.strokeStyle='#6a6a78';g.beginPath();g.moveTo(x-24,y-24);g.lineTo(x+24,y-24);g.stroke();
  for(const s of[-1,1]){g.fillStyle='#1a1a20';g.beginPath();g.arc(x+s*13,y-2,6,0,7);g.fill()}
  const c=['#7ad8ff','#c8a070','#a8c8ff'][t.v];for(const[dx,dy,r]of[[-10,-34,8],[4,-36,9],[14,-32,6]]){g.fillStyle=c;g.beginPath();g.moveTo(x+dx-r,y+dy+4);g.lineTo(x+dx,y+dy-r);g.lineTo(x+dx+r,y+dy+4);g.closePath();g.fill()}
  if(t.v!==1){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-34,22,'120,210,255',.25+.08*Math.sin(T*2+x));g.restore()}},
 ktent(t,T){const x=t.x,y=t.y,c=['#8a6a48','#7a5a3e','#9a7a58'][t.v];PALSH(x+4,y+6,48,12,.4);g.fillStyle=c;g.beginPath();g.moveTo(x-46,y+4);g.lineTo(x-6,y-64);g.lineTo(x+46,y+4);g.closePath();g.fill();g.strokeStyle='#2a1a0e';g.lineWidth=1.2;g.stroke();
  g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.moveTo(x-6,y-64);g.lineTo(x+46,y+4);g.lineTo(x+4,y+4);g.closePath();g.fill();g.fillStyle='#a8865e';g.fillRect(x-30,y-22,12,10);g.fillStyle='#6a5a3e';g.fillRect(x+10,y-30,10,14);
  g.fillStyle='#1a1008';g.beginPath();g.moveTo(x-14,y+4);g.lineTo(x-6,y-24);g.lineTo(x+4,y+4);g.closePath();g.fill()},
 kfire(t,T){const x=t.x,y=t.y;g.fillStyle='#3a2414';for(const a of[0,1.2,2.4]){g.save();g.translate(x,y);g.rotate(a);g.fillRect(-16,-3,32,6);g.restore()}const f=Math.sin(T*9)*2;
  g.fillStyle='#ff9a30';g.beginPath();g.moveTo(x-10,y-2);g.quadraticCurveTo(x-8,y-22,x+f,y-34);g.quadraticCurveTo(x+8,y-20,x+10,y-2);g.closePath();g.fill();g.fillStyle='#ffe080';g.beginPath();g.moveTo(x-5,y-2);g.quadraticCurveTo(x-3,y-14,x+f*.6,y-22);g.quadraticCurveTo(x+4,y-12,x+5,y-2);g.closePath();g.fill()},
 kwrk(t,T){const x=t.x,y=t.y,f=[1,-1,1][t.v];campFolk(x,y,{c:['#6a5a40','#5a4a3a','#7a6248'][t.v],hair:'#2a1a10',f,k:t.v*3,s:1.05,sit:t.v!==2?1:0,arm:t.v===2?Math.sin(T*4)*.9-.4:0},T)},
 koff(t,T){const x=t.x,y=t.y;PALSH(x+6,y+6,70,16,.45);g.fillStyle='#5a3a22';g.fillRect(x-60,y-70,120,70);g.strokeStyle='#2a1a0e';g.lineWidth=1.4;g.strokeRect(x-60,y-70,120,70);g.strokeStyle='rgba(30,16,8,.5)';g.lineWidth=1;for(let k=1;k<6;k++){g.beginPath();g.moveTo(x-60,y-70+k*12);g.lineTo(x+60,y-70+k*12);g.stroke()}
  g.fillStyle='#3a2414';g.beginPath();g.moveTo(x-72,y-66);g.lineTo(x,y-104);g.lineTo(x+72,y-66);g.closePath();g.fill();g.fillStyle='#1a1008';g.fillRect(x-14,y-42,28,42);g.fillStyle='#ffd890';g.fillRect(x+24,y-52,20,16);g.save();g.globalCompositeOperation='lighter';glowAt(x+34,y-44,26,'255,200,120',.4);g.restore();
  g.fillStyle='#d8b060';g.fillRect(x-40,y-92,80,16);g.fillStyle='#3a2414';g.font='bold 10px system-ui';g.textAlign='center';g.fillText('สำนักงานบรอม',x,y-80);
  g.fillStyle='#b88a3a';for(const[dx,dy]of[[-70,-6],[-82,-2],[-76,-14]]){g.beginPath();g.ellipse(x+dx,y+dy,8,6,0,0,7);g.fill();g.strokeStyle='#5a3a10';g.stroke()}},
 klift(t,T){const x=t.x,y=t.y;PALSH(x,y+4,60,12,.45);g.strokeStyle='#4a2e16';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(x-44,y);g.lineTo(x-16,y-200);g.moveTo(x+44,y);g.lineTo(x+16,y-200);g.stroke();g.lineWidth=4;for(const k of[50,100,150]){g.beginPath();g.moveTo(x-44+k*.14,y-k);g.lineTo(x+44-k*.14,y-k);g.stroke()}
  g.strokeStyle='#2a1a0e';g.lineWidth=5;g.beginPath();g.arc(x,y-206,20,0,7);g.stroke();g.strokeStyle='#8a6a40';g.lineWidth=2;for(let k=0;k<6;k++){const a=T*.8+k*1.047;g.beginPath();g.moveTo(x,y-206);g.lineTo(x+Math.cos(a)*18,y-206+Math.sin(a)*18);g.stroke()}
  g.strokeStyle='rgba(210,190,160,.85)';g.lineWidth=1.4;g.beginPath();g.moveTo(x+20,y-206);g.lineTo(x+20,y+40);g.stroke()},
 cel5(t,T){const N=MAPS[35].npc2;if(!N||N.x<0)return;celD(N.x,N.y,T,me.x<N.x?-1:1)}});
/* ---------- เศษดาว (สกุลเงินแต่งตัว) + ออร่า ---------- */
const SDIT=[[1,'🌟 วงดาวโคจร',20,'ดาวสามดวงโคจรรอบตัว'],[2,'✨ ฝุ่นดาวตก',45,'ละอองดาวโปรยลงรอบตัว'],[3,'🌌 ปีกกลุ่มดาว',80,'กลุ่มดาวกางเป็นปีกด้านหลัง']];
const sdN=()=>(me.sty&&me.sty.p7sd)|0;
function sdGive(n,why){if(!me.sty||n<=0)return;me.sty.p7sd=Math.min(99999,sdN()+n);try{fx({k:'msg',s:'🌠 +'+n+' เศษดาว'+(why?' · '+why:'')+' (มี '+sdN()+')'})}catch(e){}try{writeSave()}catch(e){}}
function sdShop(spk){const q=me.sty;if(!q)return true;const own=q.p7so|0,eq=q.p7sq|0,ch=SDIT.map(([id,nm,c])=>[(own>>id&1)?(eq===id?'✅ '+nm+' (สวมอยู่)':nm+' · สวม'):nm+' · แลก '+c+' เศษดาว',id]);if(eq)ch.push(['ถอดออร่า',9]);ch.push(['ไว้ก่อน',0]);
  stSay([[spk,(q.p7m===2?'สหกรณ์คนงานรับแลกเศษดาวเป็นของแต่งตัว แสงดาวไม่ได้ทำให้ใครเก่งขึ้นหรอก แต่มันสวยนะ':'เศษดาวแลกได้แต่ของสวย ๆ เท่านั้นแหละ ข้าไม่ขายอาวุธให้ใครที่ข้ายังไม่ไว้ใจ')+' · เจ้ามีเศษดาว '+sdN()+' ชิ้น']],()=>{},{choice:ch});
  SD.onChoose=e=>{stClose();if(!e)return;if(e===9){q.p7sq=0;fx({k:'msg',s:'ถอดออร่าแล้ว'});writeSave();return}const it=SDIT.find(x=>x[0]===e);if(!it)return;
    if(!((q.p7so|0)>>e&1)){if(sdN()<it[2]){fx({k:'msg',s:'🌠 เศษดาวไม่พอ (ต้องการ '+it[2]+' · มี '+sdN()+')'});return}q.p7sd=sdN()-it[2];q.p7so=(q.p7so|0)|(1<<e);try{sfx('lvl')}catch(_){}}
    q.p7sq=e;banner={s:'🌠 สวม '+it[1]+' แล้ว · '+it[3],t:5};try{burst(me.x,me.y-20,['#c8f0ff','#ffffff','#ffe8a0'],50,180,1,{glow:1,g:-40})}catch(_){}writeSave()};return true}
const sdOn=lk=>!lk?0:lk.u===uid?((me.sty&&me.sty.p7sq)|0):(lk.sd|0);
function sdAura(x,y,k){const T=performance.now()/1000;g.save();g.globalCompositeOperation='lighter';
  if(k===1){glowAt(x,y-24,34,'150,210,255',.14);for(let i=0;i<3;i++){const a=T*1.8+i*2.094,px=x+Math.cos(a)*26,py=y-24+Math.sin(a)*10,fr=Math.sin(a)>0;g.globalAlpha=fr?1:.5;
      if(!LOWQ)for(let j=1;j<5;j++){const b=a-j*.16;glowAt(x+Math.cos(b)*26,y-24+Math.sin(b)*10,3.4-j*.5,'170,225,255',.5-j*.1)}
      glowAt(px,py,13,'170,225,255',.65);g.fillStyle='#ffffff';PST(g,px,py,6,2.4,4,T*2+i);g.fill()}g.globalAlpha=1}
  else if(k===2){const pu=.7+.3*Math.sin(T*2);glowAt(x,y+6,34,'150,210,255',.3*pu);g.strokeStyle='rgba(170,225,255,'+(.55*pu)+')';g.lineWidth=1.6;g.beginPath();g.ellipse(x,y+6,24,8,0,0,7);g.stroke();
    const n=LOWQ?8:16;for(let i=0;i<n;i++){const q=(T*.8+i/n)%1,px=x+Math.sin(i*2.7+T*.5)*22,py=y-62+q*68,a=Math.sin(q*3.14);glowAt(px,py,5,i%3?'190,230,255':'255,225,160',.55*a);g.fillStyle='rgba(255,255,255,'+a+')';g.fillRect(px-1,py-1,2,2)}}
  else if(k===3){const fl=Math.sin(T*1.6)*3;glowAt(x,y-28,40,'150,190,255',.16);
    for(const sd of[-1,1]){const P=[[12,-20],[26,-34+fl],[40,-46+fl*1.3],[46,-30+fl],[36,-16+fl*.6],[24,-8]].map(([dx,dy])=>[x+sd*dx,y+dy]);
      g.strokeStyle='rgba(190,220,255,.55)';g.lineWidth=1.3;g.beginPath();P.forEach(([px,py],i)=>i?g.lineTo(px,py):g.moveTo(px,py));g.moveTo(P[1][0],P[1][1]);g.lineTo(P[4][0],P[4][1]);g.stroke();
      if(!LOWQ){g.fillStyle='rgba(140,180,255,.08)';g.beginPath();P.forEach(([px,py],i)=>i?g.lineTo(px,py):g.moveTo(px,py));g.closePath();g.fill()}
      P.forEach(([px,py],i)=>{const tw=.6+.4*Math.sin(T*3+i*1.7+sd);glowAt(px,py,i===2?10:7,'200,230,255',.5*tw);g.fillStyle='#ffffff';PST(g,px,py,i===2?5:3.6,1.4,4,0);g.fill()})}}
  g.restore()}
/* ---------- ดันเจี้ยนป้องกันลิฟต์เหมือง (ห้อง 83000–83999) ---------- */
setTimeout(()=>{DT[22]={n:'ลิฟต์เหมืองคาร์น',lv:1,L:126,bL:22,hp:5200000,xp:600000,g:90000,dm:56,tn:9,sm:2,rm:4,lg:1,tm:840,gold:560000,exp:4800000}},0);
const MDFI=()=>!!(MAPS[curMap]&&MAPS[curMap].mdf),mdfBack=()=>({x:1760,y:620});
const MDTA=[-2.55,-1.57,-.6,2.35],mdTN=()=>MDTA.map(a=>[CX+Math.cos(a)*(DR-20),CY+Math.sin(a)*(DR-20)]);
let MDF={hp:100,wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:0},MDZ=null,MDTL=[];
function mdfMap(id){if(MAPS[id])return MAPS[id];const D=DT[22];MDF={hp:100,wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:0};MDZ=null;
  return MAPS[id]={n:'ลิฟต์เหมืองคาร์น',dg:22,mdf:1,th:35,bth:35,sx:CX,sy:CY+400,sr:0,seed:351,bg:'#2a1a12',tile:'#6a4430',safe:'#7a5038',ring:'#e0a050',t1:'#1a0e08',t2:'#3a2418',d1:'#5a3a26',d2:'#9ad8ff',nests:[],
    gates:[{x:CX-170,y:CY+420,to:35,req:1,ars:1,nm:'เหมืองดาวคาร์น',arr:mdfBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:mdTN()[1][0],y:mdTN()[1][1]+40,n:'ราชาหมาป่าดาว',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:126,col:'#9ad8ff',bar:'#2a4a8a',ln:'#e0f4ff',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'ปากอุโมงค์เหนือ',dg:1}}}
const MDF_IN=[['nar','ลิฟต์เหมืองตั้งอยู่กลางโถงหินใต้ดิน บนแท่นคือแกนดาวที่คนงานขุดออกมาได้ ห่อด้วยผ้าใบ แสงสีฟ้ารั่วออกมาทุกตะเข็บ'],
  ['brom','ฟังให้ดี! อีกหนึ่งชั่วยาม รอกจะดึงแกนดาวขึ้นถึงปากหลุม ระหว่างนั้นห้ามให้อะไรแตะลิฟต์เด็ดขาด!'],
  ['cel','(เซเลสต์กางแผนที่ดาวไว้บนลังไม้) ฝูงหมาป่าดาวมาจากอุโมงค์ทั้งสี่ทาง… และจ่าฝูงของมันก็ใกล้เข้ามาแล้ว'],
  ['nar','💡 มอนจะวิ่งตรงไปกัดลิฟต์ → สกัดไว้ก่อน · ยืนในวงทองรอบลิฟต์ตอนไม่มีศัตรูใกล้ = ซ่อมลิฟต์ · ผ่าน 3 คลื่นแล้วราชาหมาป่าดาวจะออกมา · ฝนดาว: เข้าไปหลบในวงแสงรอบลิฟต์ · กรงเล็บดาว (วงใต้เท้า) → ขยับออก']];
function mdfEnter(){if(!me.cls||me.down>0||isDg())return;const id=83000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='⛏️ เปิดภารกิจป้องกันลิฟต์เหมือง รหัส '+id+' มาช่วยกันพาแกนดาวขึ้นจากหลุม!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  MDF={hp:100,wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:0};ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+60,y:CY+380});setTimeout(()=>{if(MDFI()&&dg.ph==='lobby')banner={s:'⛏️ ป้องกันลิฟต์เหมือง · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function mdfStart(){if(!MDFI()||dg.ph!=='lobby')return;const D=DT[22];stSay(MDF_IN,()=>{if(!MDFI()||dg.ph!=='lobby')return;dg={ph:'run',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;MDZ=null;MDF={hp:100,wv:0,st:'brk',nt:4,q:0,qt:0,bt:0,hit:0};
  fx({k:'msg',s:'⛏️ รอกเริ่มหมุน! ปกป้องลิฟต์จนแกนดาวขึ้นถึงปากหลุม'});try{sfx('quest')}catch(e){}},{cine:1})}
function mdfSpawn(n,boss){const D=DT[22],np=Math.max(1,plCount()),pts=[];for(let i=0;i<n;i++){const T=mdTN()[Math.random()*mdTN().length|0],x=T[0]+rnd(-30,30),y=T[1]+rnd(-30,30);
    const t=boss?0:(Math.random()<.14+MDF.wv*.06?2:(Math.random()<.45?1:0)),L=D.L+(MDF.wv|0),hp=mhp(t,L)*(1+.25*(np-1));mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,mdf:1});if(pts.length<10)pts.push([Math.round(x),Math.round(y)])}
  if(pts.length)fx({k:'mdtl',p:pts})}
function mdfSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  if(MDF.hp<=0){dgEnd(0,'ลิฟต์เหมืองพังลงก้นหลุม');return}
  const pl=escPl(),thr=mons.some(m=>m.t!==3&&m.hp>0&&Math.hypot(m.x-CX,m.y-CY)<190),guard=pl.some(p=>Math.hypot(p.x-CX,p.y-CY)<130);
  if(guard&&!thr)MDF.hp=Math.min(100,MDF.hp+.8*dt);
  if(dg.ph==='run'){const np=Math.max(1,plCount());
    if(MDF.st==='brk'){MDF.nt-=dt;if(MDF.nt<=0){MDF.wv++;dg.w=MDF.wv;MDF.st='wave';MDF.q=Math.round((6+MDF.wv*3)*(.7+.45*np));MDF.qt=0;fx({k:'msg',s:'🐺 คลื่นที่ '+MDF.wv+'/3 · ฝูงหมาป่าดาวโผล่จากอุโมงค์!'});try{sfx('boss')}catch(e){}}}
    else if(MDF.st==='wave'){MDF.qt-=dt;if(MDF.q>0&&MDF.qt<=0){const k=Math.min(3,MDF.q);mdfSpawn(k);MDF.q-=k;MDF.qt=2.4}
      if(MDF.q<=0&&!mons.some(m=>m.mdf&&m.hp>0)){if(MDF.wv>=3){dg.ph='boss';MDF.st='boss';bossCd=1e9;spawnBoss();dg.tl+=DGBOSS;fx({k:'mdtl',p:[mdTN()[1].map(Math.round)],big:1});fx({k:'msg',s:'🌠 ราชาหมาป่าดาวก้าวออกจากอุโมงค์เหนือ! ปกป้องลิฟต์ให้ได้'});try{sfx('boss')}catch(e){}}
        else{MDF.st='brk';MDF.nt=6;fx({k:'msg',s:'✨ ตีฝูงถอยได้แล้ว! รอกหมุนต่อ… (พักซ่อมลิฟต์ได้)'})}}}}
  MDF.bt-=dt;if(MDF.bt<=0){MDF.bt=.4;fx({k:'mdfv',hp:Math.round(MDF.hp*10)/10,wv:MDF.wv,st:MDF.st})}}
function mdfMon(m,dt,pl,spd){if(!MDFI()||(dg.ph!=='run'&&dg.ph!=='boss'))return false;for(const p of pl)if(Math.hypot(p.x-m.x,p.y-m.y)<140)return false;
  const d=Math.hypot(CX-m.x,CY-m.y);if(d>74){moveTo(m,CX,CY,spd*1.1*dt);return true}
  if(m.ac<=0){m.ac=1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();MDF.hp=Math.max(0,MDF.hp-(m.t===2?1.4:m.t===0?1.2:.8));MDF.hit=performance.now()}return true}
function mdfAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,x=Math.round(m.x),y=Math.round(m.y);
  if(m.mz){m.mz.t-=dt;if(m.mz.t<=0){pl.forEach(p=>{if(Math.hypot(p.x-CX,p.y-CY)>150)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(80*dm)});fx({k:'bslam',x:CX,y:CY,r:480});m.mz=null}}
  if(m.stun>0||m.inv)return;
  m.w1=(m.w1===undefined?9:m.w1)-dt;if(m.w1<=0&&!m.mz){m.w1=enr?12:15;m.mz={t:3.2};fx({k:'mdz',dur:3.2});fx({k:'msg',s:'🌠 ราชาหมาป่าหอนเรียกฝนดาว! เข้าไปหลบในวงแสงรอบลิฟต์'})}
  m.w2=(m.w2===undefined?4:m.w2)-dt;if(m.w2<=0&&pl.length){m.w2=enr?5.5:7;pl.forEach(p=>{const px=Math.round(p.x),py=Math.round(p.y);m.tl.push({x:px,y:py,r:85,t:1.4,k:'star'});fx({k:'tele',x:px,y:py,r:85,dur:1.4})});fx({k:'msg',s:'🐾 กรงเล็บดาว! ขยับออกจากวง'})}
  if(f<.5){m.w3=(m.w3===undefined?2:m.w3)-dt;if(m.w3<=0){m.w3=enr?14:18;mdfSpawn(2+Math.min(2,pl.length-1),1);fx({k:'msg',s:'🐺 จ่าฝูงหอนเรียกลูกฝูง! อย่าให้มันถึงลิฟต์'})}}}
function mdfFx(o){if(!o)return false;const n=performance.now();if(o.k==='mdz'){MDZ={t0:n,d:(+o.dur||3.2)*1000};return true}
  if(o.k==='mdtl'){(o.p||[]).forEach(p=>MDTL.push({x:+p[0],y:+p[1],t0:n,big:o.big?1:0}));if(MDTL.length>30)MDTL.splice(0,MDTL.length-30);return true}
  if(o.k==='mdfv'){if(!isHost()||!MDFI()){const h=+o.hp;if(h<MDF.hp-.05)MDF.hit=n;MDF.hp=h;MDF.wv=o.wv|0;MDF.st=o.st}return true}return false}
function mdfBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  mdTN().forEach(([x,y],i)=>{const a=MDTA[i];trees.push({x:CX+Math.cos(a)*(DR+70),y:CY+Math.sin(a)*(DR+70)+30,r:0,k:'ktun',v:i,ht:140,ns:1,nc:1})});
  [-.1,.75,1.3,2.0,3.0,3.6].forEach((a,i)=>trees.push({x:CX+Math.cos(a)*(DR+80),y:CY+Math.sin(a)*(DR+80),r:0,k:i===3?'kcrn':'kore',v:i%3,ht:120,ns:1,nc:1}))
  trees.push({x:CX,y:CY-6,r:46,k:'mlift',ht:230,hw:90})}
function mdfPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sk=c.createRadialGradient(CX,CY,300,CX,CY,1700);sk.addColorStop(0,'#2a1a12');sk.addColorStop(1,'#0a0604');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  for(let r=DR+460;r>DR+40;r-=90){c.strokeStyle='rgba(110,70,44,'+(.1+(DR+460-r)/2400)+')';c.lineWidth=34;c.beginPath();c.arc(CX,CY,r,0,7);c.stroke()}
  c.fillStyle='#1a0e08';c.beginPath();c.arc(CX+6,CY+34,DR+30,0,7);c.fill();
  const fl=c.createRadialGradient(CX,CY,40,CX,CY,DR+20);fl.addColorStop(0,'#7a5236');fl.addColorStop(.6,'#5e3e2a');fl.addColorStop(1,'#3e281c');c.fillStyle=fl;c.beginPath();c.arc(CX,CY,DR+20,0,7);c.fill();
  c.save();c.beginPath();c.arc(CX,CY,DR+20,0,7);c.clip();
  for(let i=0;i<120;i++){const a=palH(i,3,601)*6.283,d=palH(i,5,602)*DR,px=CX+Math.cos(a)*d,py=CY+Math.sin(a)*d,s=2+palH(i,7,603)*5;c.fillStyle='rgba(20,10,6,.35)';c.beginPath();c.ellipse(px+1,py+2,s,s*.6,0,0,7);c.fill();c.fillStyle=i%3?'#8a6446':'#9a7454';c.beginPath();c.ellipse(px,py,s,s*.6,0,0,7);c.fill()}
  /* รางจากอุโมงค์เข้าหาลิฟต์ */for(const a of MDTA){const ux=Math.cos(a),uy=Math.sin(a);for(let d=110;d<DR+10;d+=22){const px=CX+ux*d,py=CY+uy*d;c.strokeStyle='#3a2414';c.lineWidth=6;c.beginPath();c.moveTo(px-uy*14,py+ux*14);c.lineTo(px+uy*14,py-ux*14);c.stroke()}
    for(const s of[-9,9]){c.strokeStyle='#2a2a30';c.lineWidth=3;c.beginPath();c.moveTo(CX+ux*110-uy*s,CY+uy*110+ux*s);c.lineTo(CX+ux*(DR+10)-uy*s,CY+uy*(DR+10)+ux*s);c.stroke()}}
  /* วงซ่อม/วงหลบฝนดาว */c.strokeStyle='rgba(224,160,80,.5)';c.lineWidth=3;c.setLineDash([14,10]);c.beginPath();c.arc(CX,CY,150,0,7);c.stroke();c.setLineDash([]);
  c.restore();
  c.strokeStyle='#4a2e1a';c.lineWidth=24;c.beginPath();c.arc(CX,CY,DR+18,0,7);c.stroke();c.strokeStyle='rgba(190,130,80,.35)';c.lineWidth=3;c.beginPath();c.arc(CX,CY,DR+8,0,7);c.stroke()}
function mdfDraw(){if(!MDFI())return;const T=performance.now()/1000,now=performance.now();g.save();
  g.globalCompositeOperation='lighter';glowAt(CX,CY-30,170,'120,200,255',.1+.04*Math.sin(T*1.5));g.globalCompositeOperation='source-over';
  /* ตาเรืองในอุโมงค์ตอนคลื่นมา */if(MDF.st==='wave'||MDF.st==='boss'){g.save();g.globalCompositeOperation='lighter';mdTN().forEach(([x,y],i)=>{for(let k=0;k<3;k++){const ex=x+Math.sin(T*.7+k*2+i)*30,ey=y-12+Math.cos(T*.5+k)*6,bl=Math.sin(T*3+k*1.7+i)>-.85;if(!bl)continue;glowAt(ex-4,ey,2.6,'150,230,255',.9);glowAt(ex+4,ey,2.6,'150,230,255',.9)}});g.restore()}
  MDTL=MDTL.filter(e=>now-e.t0<1200);for(const e of MDTL){const k=(now-e.t0)/1200;g.save();g.globalCompositeOperation='lighter';glowAt(e.x,e.y,60*(e.big?2.2:1),'120,200,255',.4*(1-k));g.restore();g.strokeStyle='rgba(200,240,255,'+(.7*(1-k))+')';g.lineWidth=2;g.beginPath();g.ellipse(e.x,e.y,(20+k*50)*(e.big?2:1),(10+k*22)*(e.big?2:1),0,0,7);g.stroke()}
  /* ฝนดาว: มืดนอกวง + ดาวพุ่ง */if(MDZ){const a=(now-MDZ.t0)/MDZ.d;if(a>1.25)MDZ=null;else{const k=a<1?Math.min(1,a*2.2):1-(a-1)/.25;g.fillStyle='rgba(8,12,30,'+(.55*k)+')';g.beginPath();g.rect(cam.x-60,cam.y-60,W+120,H+120);g.moveTo(CX+150,CY);g.arc(CX,CY,150,0,7,true);g.fill();
    g.strokeStyle='rgba(255,230,160,'+(.7+.3*Math.sin(T*10))+')';g.lineWidth=3;g.beginPath();g.arc(CX,CY,150,0,7);g.stroke();g.save();g.globalCompositeOperation='lighter';glowAt(CX,CY,160,'255,220,150',.18*k);
      const n=LOWQ?8:18;for(let i=0;i<n;i++){const q=((T*1.8+i/n)%1),an=i*2.39,r=200+(i*97)%300,px=CX+Math.cos(an)*r,py=CY+Math.sin(an)*r*.9;if(a>1)break;g.strokeStyle='rgba(200,235,255,'+(.8*q)+')';g.lineWidth=2;g.beginPath();g.moveTo(px+60*(1-q)+30,py-160*(1-q)-60);g.lineTo(px+60*(1-q),py-160*(1-q));g.stroke();if(q>.85)glowAt(px,py,18,'170,220,255',.6)}g.restore();
    if(a<1){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,10,30,.9)';const tx='🌠 เข้าวงแสง! '+Math.max(0,(1-a)*MDZ.d/1000).toFixed(1);g.strokeText(tx,me.x,me.y-70);g.fillStyle='#ffe8b0';g.fillText(tx,me.x,me.y-70)}}}
  /* วงซ่อม + เลือดลิฟต์ */{const near=me.cls&&Math.hypot(me.x-CX,me.y-CY)<130,heal=near&&MDF.hp<100&&!mons.some(m=>m.t!==3&&Math.hypot(m.x-CX,m.y-CY)<190),hit=now-MDF.hit<220;
    if(heal){g.save();g.globalCompositeOperation='lighter';glowAt(CX,CY,130,'140,255,160',.14+.05*Math.sin(T*5));for(let i=0;i<5;i++){const q=(T*.8+i/5)%1;glowAt(CX-40+i*20,CY-q*70,3,'170,255,180',Math.sin(q*3.14))}g.restore()}
    if(hit){g.fillStyle='rgba(255,60,40,.25)';g.beginPath();g.ellipse(CX,CY-10,70,40,0,0,7);g.fill()}
    const bw=110,by=CY-260,k=Math.max(0,MDF.hp)/100;g.fillStyle='rgba(20,12,8,.78)';g.beginPath();g.roundRect(CX-bw/2-3,by-3,bw+6,12,5);g.fill();g.fillStyle=k>.5?'#7ad04a':k>.25?'#e0b030':'#e04a3a';g.beginPath();g.roundRect(CX-bw/2,by,bw*k,6,3);g.fill();
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.85)';const lb=(MDF.st==='boss'?'🌠 ':MDF.st==='wave'?'⚠️ คลื่น '+MDF.wv+'/3 · ':'⛏️ ')+'ลิฟต์เหมือง '+Math.ceil(MDF.hp)+'%';g.strokeText(lb,CX,by-6);g.fillStyle='#ffe8b0';g.fillText(lb,CX,by-6);
    if(heal){g.font='9px system-ui';g.strokeText('✚ กำลังซ่อมลิฟต์',CX,CY+64);g.fillStyle='#b8ffb8';g.fillText('✚ กำลังซ่อมลิฟต์',CX,CY+64)}}
  g.restore()}
function mdfScreen(){if(!MDFI())return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const st=MDF.st==='boss',c=st?'60,120,220':'60,30,14',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.32,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(st?.2+.05*Math.sin(T*2):.3)+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);g.restore()}
PALK.mlift=function(t,T){const x=t.x,y=t.y+6,up=dg.ph==='run'||dg.ph==='boss'?Math.min(1,(DT[22].tm*DGTX-dg.tl)/(DT[22].tm*DGTX*.6)):0,hit=performance.now()-MDF.hit<220,sh=hit?Math.sin(T*90)*2:0;
  PALSH(x,y+10,70,16,.5);g.save();g.translate(sh,0);
  g.fillStyle='#4a2e18';g.fillRect(x-62,y-16,124,26);g.strokeStyle='#1a0e06';g.lineWidth=1.4;g.strokeRect(x-62,y-16,124,26);g.strokeStyle='rgba(20,10,4,.6)';g.lineWidth=1;for(let k=1;k<6;k++){g.beginPath();g.moveTo(x-62+k*20.6,y-16);g.lineTo(x-62+k*20.6,y+10);g.stroke()}
  g.strokeStyle='#5a3a1e';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(x-56,y-10);g.lineTo(x-20,y-210);g.moveTo(x+56,y-10);g.lineTo(x+20,y-210);g.stroke();g.lineWidth=4;for(const k of[60,120,170]){const w=56-k*.18;g.beginPath();g.moveTo(x-w,y-k);g.lineTo(x+w,y-k);g.stroke()}
  g.strokeStyle='#2a1a0e';g.lineWidth=5;g.beginPath();g.arc(x,y-216,22,0,7);g.stroke();g.strokeStyle='#a07a48';g.lineWidth=2;for(let k=0;k<6;k++){const a=T*(dg.ph==='run'||dg.ph==='boss'?2.2:.3)+k*1.047;g.beginPath();g.moveTo(x,y-216);g.lineTo(x+Math.cos(a)*20,y-216+Math.sin(a)*20)}g.stroke();
  const cy=y-30-up*40;g.strokeStyle='rgba(220,200,170,.9)';g.lineWidth=1.6;g.beginPath();g.moveTo(x-22,y-216);g.lineTo(x-22,cy-30);g.moveTo(x+22,y-216);g.lineTo(x+22,cy-30);g.stroke();
  g.fillStyle='#6a4a2a';g.fillRect(x-32,cy-30,64,34);g.strokeStyle='#2a1a0e';g.lineWidth=1.2;g.strokeRect(x-32,cy-30,64,34);
  g.fillStyle='#d8ccb0';g.beginPath();g.moveTo(x-26,cy-28);g.quadraticCurveTo(x,cy-62,x+26,cy-28);g.closePath();g.fill();g.strokeStyle='#8a7a5a';g.stroke();
  g.save();g.globalCompositeOperation='lighter';const pu=.6+.4*Math.sin(T*2.4);glowAt(x,cy-34,46,'120,210,255',.35*pu);for(const dx of[-14,0,14])glowAt(x+dx,cy-30-Math.abs(dx)*.6,6,'220,245,255',.7*pu);g.restore();g.restore()};
function gxStarWolf(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,fy=br-2,run=Math.sin(T*6);g.save();g.translate(0,30);g.scale(1.35,1.35);g.translate(0,-30);
  if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-40+fy,70,hf<.5?'170,200,255':'120,200,255',.18+(hf<.5?.1:0));g.restore()}
  /* ขาหลัง/หน้า */for(const[lx,ph,c]of[[-34,0,'#1a2240'],[-20,3.1,'#222c50'],[26,1.6,'#1a2240'],[40,4.7,'#222c50']]){const k=Math.sin(T*6+ph)*6;Ln([lx,-24+fy,lx+k,6],F(c),7);E(lx+k+2,6,6,3,F('#10142a'),0)}
  /* หาง */Ln([-46,-40+fy,-70,-58+fy+Math.sin(T*3)*6,-84,-46+fy],F('#2a3460'),9);if(!W)for(let i=0;i<3;i++){const q=(T*1.2+i/3)%1;g.save();g.globalCompositeOperation='lighter';glowOrb(-84-q*20,-46+fy-q*10,4,'170,230,255',.7*(1-q));g.restore()}
  /* ลำตัว */E(-4,-40+fy,50,22,F('#2a3460'),1);E(-4,-34+fy,36,12,F('#3a4880'),0);
  /* แผงคริสตัลบนหลัง */for(let i=0;i<6;i++){const bx=-36+i*13,h=14+(i%2)*10+(i===2||i===3?8:0);Pg([bx-5,-56+fy,bx,-56+fy-h,bx+5,-56+fy],F(i%2?'#7ae0ff':'#a8f0ff'),1)}
  if(!W&&hf<.5){g.strokeStyle='rgba(220,245,255,.9)';g.lineWidth=1.4;g.beginPath();g.moveTo(-20,-52+fy);g.lineTo(-10,-38+fy);g.lineTo(-18,-28+fy);g.moveTo(10,-50+fy);g.lineTo(4,-36+fy);g.stroke()}
  /* หัว */E(48,-56+fy+up*.2,20,15,F('#2a3460'),1);Pg([60,-60+fy,84,-52+fy,80,-44+fy,60,-44+fy],F('#222c50'),1);Pg([38,-68+fy,42,-90+fy,50,-70+fy],F('#1a2240'),1);Pg([52,-70+fy,58,-92+fy,64,-68+fy],F('#1a2240'),1);
  /* มงกุฎดาว */if(!W){for(let i=0;i<5;i++){const a=-2.4+i*.35,px=50+Math.cos(a)*24,py=-62+fy+Math.sin(a)*24;g.fillStyle='#e8f8ff';PST(g,px,py,4,1.6,4,T+i);g.fill()}g.save();g.globalCompositeOperation='lighter';glowOrb(50,-80+fy,22,'200,235,255',.4);g.restore()}
  eye(54,-60+fy,3,2.2,'#bff4ff');if(!W&&cf>0){g.save();g.globalCompositeOperation='lighter';glowOrb(80,-50+fy,10+cf*16,'170,230,255',.7*cf);g.restore()}
  if(!W){g.fillStyle='#e8f0ff';Pg([66,-46+fy,68,-40+fy,70,-46+fy],'#e8f0ff',0);Pg([74,-46+fy,76,-41+fy,78,-46+fy],'#e8f0ff',0)}
  g.restore()}
function mdfReward(){if(dgRew)return;dgRew=1;const D=DT[22],st=stCur(),sto=st&&st.g==='mdf',gd=sto?D.gold:65000;MDZ=null;
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?20:6));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?30:8+(Math.random()*6|0),'ลิฟต์เหมือง')}catch(e){}try{ecGive(sto?30:8+(Math.random()*5|0),'ลิฟต์เหมือง')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.45)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  sdGive(sto?15:6,'ลิฟต์เหมือง');
  me.ach=me.ach||{};if(sto){me.sty.n=1;me.sty.a=1}else me.mdT=Date.now();
  banner={s:'⛏️ แกนดาวขึ้นถึงปากหลุม! +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?20:6)+' · ลิฟต์เหลือ '+Math.ceil(MDF.hp)+'%',t:8};sfx('lvl');burst(me.x,me.y-10,['#c8f0ff','#ffffff','#ffe0a0','#a8d0ff'],140,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(MDFI())enterMap(35,mdfBack())},10000)}
function instRepeatMdf(){const bk=me.sty&&me.sty.p7m===2?'brom2':'brom';const l=Math.max(0,(me.mdT||0)+30*60000-Date.now());
  stSay([[bk,me.sty&&me.sty.p7m===2?'สหกรณ์ยังขุดแร่ดาวกันทุกวัน หมาป่าดาวก็ยังตามแสงมาทุกคืน… จะช่วยเฝ้าลิฟต์ หรือจะแลกเศษดาวล่ะ?':'ลิฟต์ยังต้องดึงแร่ขึ้นทุกคืน หมาป่าพวกนั้นก็ยังไม่เลิกตามแสง… รับงานเฝ้าลิฟต์อีกรอบไหม หรือจะแลกเศษดาว?']],()=>{},{choice:[[l>0?'⛏️ เฝ้าลิฟต์ (อีก '+Math.ceil(l/60000)+' นาที)':'⛏️ เฝ้าลิฟต์เหมือง (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['🌠 แลกเศษดาว (มี '+sdN()+')',2],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'⛏️ รอกยังพักเครื่องอยู่ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(mdfEnter,250)}else if(e===2)setTimeout(()=>sdShop(bk),250)};return true}
/* ---------- เนื้อเรื่องภาค 7 บทที่ 2 ---------- */
Object.assign(SPK,{brom:['บรอม · เจ้าของเหมืองคาร์น','⛏️','#e0b070'],brom2:['บรอม · สมาชิกสหกรณ์คนงานคาร์น','⛏️','#e0b070'],wk:['คนงานเหมือง','👷','#d8c0a0'],cel5:SPK.cel});STNPC.brom=[35,'npc'];STNPC.cel5=[35,'npc2'];
STCH.push('ภาค 7 · บทที่ 2 · ราคาของดาว');
const STEND7=[null,
 [['me','(วางถุงทองหนักอึ้งลงบนโต๊ะของบรอม — ทองทั้งหมดที่ราชินีกับค่ายรวบรวมมา)'],
  ['brom','(บรอมนับเหรียญทีละเหรียญ แล้วยิ้มกว้าง) ราคาดี! แกนดาวเป็นของเจ้า… แล้วถ้าวันหน้ามีดาวร่วงลงมาอีก ข้าจะส่งข่าวไปที่ค่ายเจ้าเป็นที่แรก',0,0,0,0,1],
  ['wk','(คนงานคนหนึ่งพึมพำ) …อย่างน้อยรอบนี้ ท่านบรอมก็จ่ายค่าแรงเพิ่มให้พวกเรา',0,0,0,0,1],
  ['nar','สัญญาซื้อขายถูกจารลงบนแผ่นหนังสองฉบับ ฉบับหนึ่งเก็บไว้ที่สำนักงานบรอม อีกฉบับจะไปแขวนในโถงกลางของค่าย — การค้าครั้งแรกระหว่างค่ายผู้อพยพกับโลกภายนอก',0,0,0,0,1]],
 [['me','(หันไปหาคนงานที่ยืนมุงอยู่รอบลิฟต์ — คนที่ขุดดาวด้วยมือตัวเองมาเจ็ดคืน)'],
  ['wk','ดาวดวงนี้… พวกเราเป็นคนขุดมันขึ้นมา ถ้าพวกเราไม่ยอมยกให้ ท่านบรอมก็ไม่มีอะไรจะขาย',0,0,0,0,2],
  ['wk','ค่ายผู้อพยพรับพวกเราไหม? พวกเราก็เคยไม่มีบ้านเหมือนกัน ถ้าแสงของดาวจะไปที่ไหน ขอให้ไปที่ที่คนอย่างพวกเราได้อยู่',0,0,0,0,2],
  ['brom','(บรอมมองคนงานทั้งเหมืองที่วางพลั่วลงพร้อมกัน… แล้วถอนหายใจยาว) …เหมืองที่ไม่มีคนขุดก็แค่หลุมดินหลุมหนึ่ง เอาไปเถอะ',0,0,0,0,2],
  ['brom','แต่ข้าไม่ไปไหนนะ ข้าจะอยู่ขุดต่อ… ในฐานะสมาชิกสหกรณ์ ถ้าพวกมันยอมรับข้า',0,0,0,0,2],
  ['nar','คืนนั้นเหมืองคาร์นจุดไฟทุกดวง คนงานตั้งชื่อตัวเองว่า «สหกรณ์คนงานคาร์น» และส่งตัวแทนไปเป็นชาวนครลี้ภัยคนแรกจากนอกค่าย',0,0,0,0,2]]];
{const C2=STCH.length-1;STY.push(
 {c:C2,g:'talk',k:'til7',p7k:1,tx:'คุยกับทิลที่ขอบที่ราบดาวตก · ออกเดินทางไปเหมืองคาร์น',
  pre:[['til','ท่านผู้นำ! ยายเอดาร้องเพลงกล่อมท่อนที่ข้าไม่เคยได้ยินให้ฟัง «ดาวที่หนักที่สุดร่วงลงหุบผาแดง ผู้ใดขุดมันขึ้นมา ผู้นั้นต้องจ่ายราคา…»'],
   ['til','ข้าถามว่าราคาอะไร ยายก็ไม่ยอมตอบ บอกแค่ว่า "ราคาที่คนขุดเป็นคนจ่ายเสมอ"'],
   ['til','เซเลสต์ออกเดินทางไปตั้งแต่เช้าแล้ว! ทางลงหุบผาคาร์นอยู่สุดทางใต้ของที่ราบนี่เอง ข้าเปิดเชือกกั้นไว้ให้แล้ว ไปกันเถอะ!']],rw:{g:60000}},
 {c:C2,g:'map',m:35,tx:'ไปเหมืองดาวคาร์น (ทางลงหุบผาทางใต้สุดของที่ราบดาวตก)',
  post:[['nar','หุบผาสีแดงเปิดกว้างออกเหมือนบาดแผลบนผืนดิน ปั้นจั่นไม้นับสิบยืดคอเหนือหลุมยักษ์ตรงกลาง รางเกวียนแร่ทอดยาวไปทุกทิศ'],
   ['nar','จากก้นหลุม แสงสีฟ้าซีด ๆ ส่องขึ้นมาเป็นจังหวะ… ช้ากว่าดาวดวงไหนที่เคยเห็น เหมือนหัวใจที่เหนื่อยล้า'],
   ['nar','คนงานผอมโซนับร้อยแบกตะกร้าแร่ขึ้นลงทางลาดวน ไม่มีใครเงยหน้ามองแขกที่มาใหม่']]},
 {c:C2,g:'talk',k:'brom',p7br:1,tx:'คุยกับเจ้าของเหมืองที่สำนักงานริมทางเข้า',
  pre:[['brom','หยุดตรงนั้น! ถ้าเป็นพวกหอดูดาวมาอีกคน ข้าบอกเจ้านายเจ้าไปแล้ว ราคาไม่ลด'],
   ['brom','อ้อ… ไม่ใช่ เจ้าคือ "ผู้เชื่อมสองฟ้า" ฮะ! ตาข้าก็มีแววอยู่ ข้าชื่อบรอม เหมืองคาร์นทั้งหมดนี่เป็นของข้า รวมทั้งดาวที่ร่วงลงมาในเหมืองข้าด้วย'],
   ['brom','ฟ้าทำดาวหล่นใส่ที่ของข้า ก็เหมือนฝนตกใส่บ่อของข้า น้ำในบ่อก็เป็นของข้า ยุติธรรมดี'],
   ['brom','แต่มีเรื่องยุ่งนิดหน่อย เมื่อคืนดาวเต้นแรงจนอุโมงค์ถล่มสี่แห่ง คนงานติดอยู่ข้างใน… ข้ากำลังจะส่งคนไปขุด หลังจากดึงแกนดาวขึ้นมาเสร็จ'],
   ['me','(…หลังจากนั้น?)'],
   ['brom','อย่ามองข้าแบบนั้น! ถ้าเจ้าห่วงนักก็ไปช่วยเองสิ อุโมงค์อยู่สี่มุมของหุบ ช่วยพวกมันออกมาได้ เดี๋ยวข้าค่อยคุยเรื่องราคาให้']],rw:{g:50000}},
 {c:C2,g:'clue',m:35,n:4,p7rs:1,tx:'ช่วยคนงานที่ติดอยู่ในอุโมงค์ถล่ม 4 คน (กองหินมีป้าย 🆘)',
  pre:[['nar','💡 อุโมงค์ถล่มอยู่ใกล้ปากอุโมงค์ทั้งสี่มุมของหุบผา เดินเข้าไปใกล้กองหินที่มีป้าย 🆘 เพื่อช่วยคนงานออกมา']],
  post:[['wk','(คนงานทั้งสี่ยืนเรียงกันหน้าสำนักงาน ไม่มีใครพูด) …ขอบคุณ ท่านไม่ต้องช่วยพวกเราก็ได้ แต่ท่านก็ช่วย'],
   ['nar','เสียงหอนดังมาจากอุโมงค์ทุกทิศ… สัตว์ที่ตามแสงดาวมาไม่ได้มาแค่ทีละตัวอีกแล้ว']],rw:{g:60000}},
 {c:C2,g:'kill',m:35,n:30,tx:'ไล่ฝูงหมาป่าดาวที่วนรอบหลุมดาวคาร์น',
  post:[['nar','ซากหมาป่าดาวสลายเป็นผงประกาย ลอยกลับลงไปในหลุมทั้งหมด… ราวกับถูกดาวดวงนั้นดูดกลับไป'],
   ['me','(ที่ริมหลุม ใครบางคนยืนดูอยู่นานแล้ว… ผ้าคลุมปักลายกลุ่มดาว)']],rw:{g:70000}},
 {c:C2,g:'talk',k:'cel5',p7cs:1,tx:'คุยกับเซเลสต์ที่ริมหลุมดาว',
  pre:[['cel','มาช้ากว่าที่ข้าคิดนะ… ข้าคุยราคากับบรอมเสร็จตั้งแต่เช้า เขาเรียกเกินมูลค่าทั้งคลังหอดูดาวไปสามเท่า'],
   ['cel','แต่ข้ามีเรื่องที่สำคัญกว่าราคาจะบอก ฟังให้ดี ข้าวัดจังหวะของดาวดวงนี้ทั้งคืน มันเต้นช้าลงทุกชั่วยาม'],
   ['cel','ดาวที่ร่วงเองจะเย็นลงช้า ๆ เป็นร้อยปี แต่ดวงนี้… มีรอยร้าวทะลุถึงแกน ตอนที่มันหลุดจากท้องราชินี มันถูกฉีกออกมา'],
   ['cel','ฝูงหมาป่าพวกนั้นรู้ สัตว์ที่กินแสงรู้เสมอว่าแสงไหนกำลังจะดับ คืนนี้จ่าฝูงของมันจะมาเอง — ตอนที่บรอมดึงแกนดาวขึ้นลิฟต์'],
   ['cel','ข้าไม่ชอบเจ้า ผู้เชื่อมสองฟ้า แต่ข้าชอบให้ดาวดับในมือคนที่ไม่รู้ค่ามันน้อยกว่า… ไปเฝ้าลิฟต์กับบรอมเถอะ ข้าจะช่วยดูทิศที่มันมา']],rw:{g:50000,s3:5}},
 {c:C2,g:'mdf',k:'brom',p7d:1,tx:'ปกป้องลิฟต์เหมืองระหว่างดึงแกนดาวขึ้นจากหลุม (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['brom','ได้ข่าวว่าเจ้าคุยกับนางนักดูดาวแล้ว… หมาป่าจะมาจริงหรือ? ฮึ่ม งั้นก็ดี ข้าจะได้เห็นว่าผู้เชื่อมสองฟ้าทำงานคุ้มค่าจ้างไหม'],['brom','ลงลิฟต์ไปที่โถงล่างกัน! รอกพร้อมแล้ว!']],
  post:[['nar','แกนดาวโผล่พ้นปากหลุม… ทั้งเหมืองเงียบกริบ ผ้าใบที่ห่อไว้ไหม้เป็นรูตามรอยร้าว แสงที่รั่วออกมาไม่อุ่นเหมือนเศษดาวชิ้นเล็ก มันเย็น และเหนื่อย'],
   ['brom','(บรอมถอดหมวกเหมืองออกช้า ๆ) …ข้าขุดแร่มาสามสิบปี ไม่เคยเห็นหินก้อนไหนดูเหมือนกำลังจะตาย'],
   ['nar','คนงานทุกคนหันมามองผู้เชื่อมสองฟ้า บรอมก็เช่นกัน — เหมือนรอให้ใครสักคนบอกว่าดาวดวงนี้ควรไปอยู่ที่ไหน']]},
 {c:C2,g:'talk',k:'brom',p7m:1,tx:'ตัดสินใจเรื่องราคาของดาว',
  pre:[['brom','เอาล่ะ ผู้เชื่อมสองฟ้า ข้าเป็นคนค้าขาย ไม่ใช่คนใจร้าย… แต่เหมืองนี้กินข้าวด้วยราคาของดาว'],
   ['brom','จ่ายราคาที่ข้าตั้งไว้ แกนดาวจะไปกับเจ้า หรือ… (บรอมเหลือบมองคนงานที่ยืนล้อมอยู่) หรือเจ้าจะลองหาทางอื่นก็ตามใจ']]},
 {c:C2,g:'talk',k:'cel5',p7c2:1,tx:'ให้เซเลสต์ตรวจแกนดาว',
  pre:[['cel','(เซเลสต์วางมือบนแกนดาวนานจนนิ้วซีด) …ข้าวัดผิดไปครึ่งหนึ่ง มันไม่ได้มีเวลาเป็นร้อยปี'],
   ['cel','สี่สิบคืน อย่างมากที่สุด ถ้าไม่มีใครเย็บรอยร้าวที่แกนได้ ดาวดวงนี้จะดับ — และเมล็ดดาวที่หลุมหัวใจจะไม่มีวันได้กิน "แสงแรก" ของมัน'],
   ['cel','เจ้าซื้อมันมาด้วยทอง… ข้าหวังว่าเจ้าจะจ่ายราคาที่แท้จริงของมันได้ด้วย',0,0,0,0,1],
   ['cel','เจ้าได้มันมาเพราะคนที่ขุดมันยอมยกให้… ข้าไม่เคยเห็นใครได้ดาวมาแบบนั้นมาก่อน',0,0,0,0,2],
   ['cel','ในบันทึกของท่านโอเรียนมีชื่อหนึ่งที่ข้าไม่เคยเข้าใจ «ช่างเย็บดาว» อยู่ที่ไหนสักแห่งเหนือทะเลเมฆฝั่งตะวันตก'],
   ['cel','…ข้าจะไปด้วย ไม่ใช่เพราะข้าเปลี่ยนใจเรื่องเจ้า แต่เพราะข้าไม่อยากเห็นดาวดับต่อหน้า'],
   ['til','(ทิลวิ่งลงมาจากทางลาด หอบแฮ่ก) ท่านผู้นำ! ยายเอดาร้องท่อนต่อให้ฟังแล้ว «…ผู้นั้นต้องจ่ายราคา ด้วยเพลงที่ไม่เคยมีใครร้อง»']],
  post:[['nar','🌠 — จบภาค 7 บทที่ 2 · ราคาของดาว — บทต่อไป: ช่างเย็บดาว (เร็ว ๆ นี้)']],rw:{g:150000,s3:10}})}
setTimeout(()=>{try{
    SFPATH.push([[2250,2000],[2330,2450],[2250,2950]]);
    MAPS[34].gates.push({x:2250,y:3060,to:35,req:1,p7k:1,nm:'เหมืองดาวคาร์น',arr:{x:1600,y:430}});
    const M7=MAPS[27];MAPS[35]=Object.assign({},M7,{n:'เหมืองดาวคาร์น',sx:1600,sy:300,sr:110,seed:351,bg:'#5a3a26',tile:'#7a5236',safe:'#8a6040',ring:'#e0a050',t1:'#2a1a10',t2:'#4a2e1e',d1:'#6a4430',d2:'#9ad8ff',bth:35,
      gates:[{x:1600,y:170,to:34,req:1,nm:'ที่ราบดาวตก',arr:{x:2250,y:2960}}],npc:{x:1760,y:560,n:'บรอม · เจ้าของเหมืองคาร์น',L:22},npc2:{x:-9999,y:-9999,n:'เซเลสต์ · นักดาราศาสตร์หลวง'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[1100,1500],[2250,1250],[700,1100],[2600,1600],[1000,2200],[2300,2250],[1650,2550],[600,2500],[2800,2500],[1300,950],[2400,900]]});
    FIELDM[35]=1;BTR[35]='90,200,255';GLOWC[35]='190,235,255';FXST[35]='cosmic';try{BTC[35]=['#ffe8c8','#4a8ad8','#ffffff'];TIER[35]=[18.5,21,2.75];WRG[35]={1:{rg:230,cd:1.9,spd:300,dm:.8,k:'star',c:'200,235,255'},2:{rg:280,cd:3,spd:240,dm:1.6,k:'starb',c:'150,220,255',big:1}}}catch(e){}}catch(e){console.warn('km map',e)}
  try{NPC3[35]={d:bromD,s:['ดาวในเหมืองข้า ก็เป็นของข้า… ใช่ไหมล่ะ?','ราคาไม่ลด! …แต่ถ้าเหมาก็คุยกันได้','เสียงขุดเงียบไปแถบตะวันตก… ไม่ใช่ลางดีเลย','ข้าขุดแร่มาสามสิบปี ไม่เคยเห็นหินที่เต้นได้'],hy:52}}catch(e){}
  try{Object.assign(DEPM,{35:'karn'});DEP4.karn={fog:'150,92,58',fa:.1,bd:.2};AMB2.karn=['rgba(255,210,170,.16)','rgba(30,14,6,.46)','255,200,150'];DGTH[22]='karn'}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p7rs)return kmAqT(st);return _q(st)}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=83000&&id<84000)return mdfMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(MDFI())return mdfStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(MDFI())return mdfSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(MDFI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return mdfReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=MDFI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(MDFI()){enterMap(35,mdfBack());sysMsg('⛏️ ลิฟต์ถอยกลับขึ้นปากหลุม · คุยกับบรอมเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(MDFI())return dg.ph==='run'?'⛏️ ลิฟต์ '+Math.ceil(MDF.hp)+'% · '+(MDF.st==='wave'?'คลื่น '+MDF.wv+'/3':'พักคลื่น')+' · ⏱ '+fmtT(dg.tl):dg.ph==='boss'?'🌠 ราชาหมาป่าดาว · ลิฟต์ '+Math.ceil(MDF.hp)+'% · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'⛏️ แกนดาวขึ้นถึงปากหลุม!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'⛏️ โถงลิฟต์ · กด "เริ่ม" เมื่อพร้อม';return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(MDFI()){ov.hidden=true;sfx('gate');enterMap(35,mdfBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(mdfFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{mdfDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{mdfScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='mdf')return instRepeatMdf();return _ir(k)}}catch(e){}
  try{const _sk=stKill;window.stKill=stKill=function(t,bs){_sk(t,bs);try{if((curMap===34||curMap===35)&&!isDg()&&me.sty&&p6Past('p7br')&&Math.random()<.05)sdGive(1)}catch(e){}}}catch(e){}
  try{const _sd=stDone;window.stDone=stDone=function(){const st=stCur(),q=me.sty;if(st&&st.p7m&&q&&!q.p7m){q.a=2;setTimeout(()=>{stSay([['me','(ทุกสายตาจับจ้องมา… จะจ่ายราคาของดาวด้วยอะไร?)']],()=>{},{cine:1,choice:[['💰 จ่ายราคาให้บรอม',1],['🤝 ถามคนงานที่ขุดมันขึ้นมา',2]]});
      SD.onChoose=e=>{q.p7m=e;stClose();setTimeout(()=>stSay(STEND7[e],()=>{_sd();setTimeout(()=>{banner={s:e===1?'💰 สัญญาการค้าฉบับแรกของค่ายผู้อพยพ':'🤝 สหกรณ์คนงานคาร์น · ชาวนครลี้ภัยกลุ่มแรกจากนอกค่าย',t:6};try{stFlash()}catch(_){}},600)},{cine:1}),250)}},200);return}
    if(st&&st.p7rs)setTimeout(()=>sdGive(5,'คนงานขอบคุณ'),400);if(st&&st.p7c2)setTimeout(()=>sdGive(10,'เซเลสต์แบ่งเศษดาวให้'),400);return _sd()}}catch(e){}},0);
