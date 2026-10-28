
/* ===== v551 ภาค 10 บทที่ 5 (บทจบ) — ภาพ: บอส «เงาผู้แบก» · สัตว์เลี้ยง «ต้นกล้าค้ำแผ่นดิน» · สัตว์ขี่ «ด้วงแบกฟ้า»
   · ฉากจบในค่าย: 🏡 ธงแปดเมือง + ซุ้มประตู «บ้านของทุกคน» · 🌳 ต้นค้ำต้นใหม่ข้างรอยแยก ===== */
/* ---------- บอส: เงาผู้แบก (ความสิ้นหวังของธรณิน · ร่างเงาหินหลังค่อม แบกแผ่นหินแตก · รอยร้าวม่วง → แสงทองแห่งความหวังเมื่อเลือดลด) ---------- */
BV1['เงาผู้แบก']=(T,W,br,sw,up,cf)=>{const b=br,B=typeof mons!=='undefined'?mons.find(q=>q.t===3):null,hf=B&&B.mh?Math.max(0,B.hp/B.mh):1,hope=1-hf,pu=.5+.5*Math.sin(T*1.3),ws=typeof PFN!=='undefined'&&PFN.ws>0,lift=ws?-8:0;
  bvShadow(128,30,.5);const SH='#1a1420',SH2='#241c2c',SH3='#2e2638';
  /* ควันเงาที่ฐาน */if(!W){for(let k=0;k<6;k++){const p=(T*.3+k/6)%1,x0=-90+k*36;g.fillStyle='rgba(60,40,90,'+(.35*(1-p))+')';g.beginPath();g.ellipse(x0+Math.sin(T+k)*6,20-p*40,16+p*12,7+p*5,0,0,7);g.fill()}}
  /* ขาคุกเข่า */vLimb(W,[-46,-46+b,-82,-8+b,-64,24],SH,30,22);vLimb(W,[44,-46+b,74,-14+b,66,24],SH,30,22);bvE(W,-80,-8+b,22,17,SH2,1,1.2);bvE(W,72,-14+b,21,16,SH2,1,1.2);
  /* ลำตัวหลังค่อม */const TB=[[-78,-44+b],['c',-104,-112+b,-56,-170+b,6,-168+b],['c',64,-166+b,104,-116+b,84,-44+b],['q',0,-22+b,-78,-44+b]];vS(W,TB,SH2,1,1.5);
  if(!W){g.save();vP(TB);g.clip();g.strokeStyle='rgba(120,90,160,.18)';g.lineWidth=2;for(let k=0;k<6;k++){const y=-150+k*20+b;g.beginPath();g.moveTo(-110,y);g.quadraticCurveTo(0,y+10,110,y);g.stroke()}
    g.strokeStyle='rgba(170,120,255,'+((.5+.3*pu)*(1-hope*.8))+')';g.lineWidth=2.2;for(const[x0,y0,x1,y1,x2,y2]of[[-40,-150,-20,-110,-36,-70],[30,-140,12,-100,30,-60],[-70,-90,-40,-80,-50,-50],[60,-100,40,-80,62,-56]]){g.beginPath();g.moveTo(x0,y0+b);g.lineTo(x1,y1+b);g.lineTo(x2,y2+b);g.stroke()}
    if(hope>.08){g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,210,120,'+Math.min(.9,hope*1.4)+')';g.lineWidth=1.5+hope*3;const n=Math.ceil(hope*9);for(let k=0;k<n;k++){const a=k*1.7,x0=Math.sin(a)*60,y0=-60-((k*37)%90)+b;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+Math.cos(a)*20,y0-14);g.lineTo(x0+Math.cos(a)*34,y0-6);g.stroke()}}
    g.restore()}
  /* แผ่นหินแตกบนหลัง (น้ำหนักสามร้อยปี) */const sy=-176+b+lift;vS(W,[[-118,sy+10],[-60,sy-14],[10,sy-20],[70,sy-12],[120,sy+6],[116,sy+26],[60,sy+18],[0,sy+26],[-64,sy+22],[-120,sy+30]],'#2a2430',1,1.4);
  if(!W){g.strokeStyle='rgba(10,6,14,.9)';g.lineWidth=2;g.beginPath();g.moveTo(-20,sy-18);g.lineTo(-8,sy+2);g.lineTo(-24,sy+24);g.moveTo(54,sy-12);g.lineTo(44,sy+8);g.stroke();g.fillStyle='rgba(160,140,190,.18)';g.beginPath();g.ellipse(-30,sy-8,40,6,-.1,0,7);g.fill();
    g.strokeStyle='rgba(50,36,40,.9)';g.lineWidth=2;for(let k=0;k<7;k++){const x=-100+k*34,L=14+((k*13)%22);g.beginPath();g.moveTo(x,sy+24);g.quadraticCurveTo(x+Math.sin(T+k)*4,sy+24+L*.6,x+3,sy+24+L);g.stroke()}}
  /* แขนสองข้างยันแผ่นหิน */for(const s of[-1,1]){vLimb(W,[s*70,-140+b,s*112,-150+b+lift,s*106,sy+18],SH,24,18);bvE(W,s*104,sy+14,16,11,SH3,1,1.1)}
  /* หัวก้ม · ตากลวง */const hy=-140+b+(ws?-10:0);bvE(W,0,hy,30,26,SH3,1,1.3);
  if(!W){g.fillStyle='rgba(10,6,14,.95)';for(const s of[-1,1]){g.beginPath();g.ellipse(s*11,hy-2,7,4.4,s*.15,0,7);g.fill()}}
  for(const s of[-1,1])vEye(W,s*11,hy-2,2.6,1.6,hope>.6?'#ffd890':'#b89060',W?0:6);
  /* กระซิบให้ปล่อย: วงม่วงแผ่ */if(ws&&!W){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const r=60+k*28+((T*40)%28);g.strokeStyle='rgba(180,130,255,'+(.4-k*.1)+')';g.lineWidth=3;g.beginPath();g.ellipse(0,hy-10,r,r*.4,0,0,7);g.stroke()}glowAt(0,hy,90,'170,110,255',.25+.1*pu);g.restore()}
  bvAdd(W,()=>{glowAt(0,-90+b,110,'140,90,220',(.12+.06*pu)*(1-hope*.7));if(hope>.3)glowAt(0,-90+b,120,'255,200,110',(hope-.3)*.3)})};
BVS['เงาผู้แบก']=1.6;
/* ---------- สัตว์เลี้ยง: ต้นกล้าค้ำแผ่นดิน (เมล็ดเดินด้วยรากสองข้าง · ใบเรืองทองตอนหยุดพัก) ---------- */
function petSapD(x,y,fx,t,mv,S){const s=S||1,st=mv?Math.sin(t*11):0,bob=mv?Math.abs(st)*1.6:Math.sin(t*2)*.5,still=!mv;g.save();g.translate(x,y);g.scale((fx||1)*s,s);
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,1,10,3,0,0,7);g.fill();
  g.strokeStyle='#5a3a20';g.lineCap='round';for(const k of[-1,1]){const sw=st*k*3;g.lineWidth=2.2;g.beginPath();g.moveTo(k*3,-6-bob);g.quadraticCurveTo(k*5+sw,-2-bob,k*4+sw*1.4,0);g.stroke();g.lineWidth=1.2;g.beginPath();g.moveTo(k*4+sw*1.4,0);g.lineTo(k*7+sw*1.4,1);g.stroke()}
  {const gr=g.createRadialGradient(-2,-13-bob,1,0,-11-bob,9);gr.addColorStop(0,'#c8a060');gr.addColorStop(.7,'#8a6034');gr.addColorStop(1,'#5a3a1e');g.fillStyle=gr;g.beginPath();g.ellipse(0,-11-bob,7.5,8.5,0,0,7);g.fill();g.strokeStyle='#3a2410';g.lineWidth=1;g.stroke()}
  g.strokeStyle='rgba(60,36,16,.6)';g.lineWidth=.8;g.beginPath();g.moveTo(-4,-17-bob);g.quadraticCurveTo(-5,-11-bob,-3,-5-bob);g.moveTo(4,-17-bob);g.quadraticCurveTo(5,-11-bob,3,-5-bob);g.stroke();
  g.fillStyle='#1e1206';g.beginPath();g.arc(-2.6,-12-bob,1.2,0,7);g.arc(2.6,-12-bob,1.2,0,7);g.fill();g.fillStyle='#fff';g.fillRect(-2.9,-12.8-bob,.7,.7);g.fillRect(2.3,-12.8-bob,.7,.7);g.strokeStyle='#1e1206';g.lineWidth=.8;g.beginPath();g.arc(0,-9.6-bob,1.6,.3,2.84);g.stroke();g.fillStyle='rgba(255,140,120,.5)';g.beginPath();g.arc(-4.6,-9.8-bob,1.2,0,7);g.arc(4.6,-9.8-bob,1.2,0,7);g.fill();
  const sw2=Math.sin(t*2.2)*1.2;g.strokeStyle='#4a7a2a';g.lineWidth=1.6;g.beginPath();g.moveTo(0,-19-bob);g.quadraticCurveTo(1+sw2,-24-bob,sw2*1.5,-28-bob);g.stroke();
  for(const[a,l,dy]of[[-.9,7,0],[.8,6.5,0],[-.1,5.5,-3]]){g.save();g.translate(sw2*1.2,-25-bob+dy);g.rotate(a+sw2*.05);const lg=g.createLinearGradient(0,0,l,0);lg.addColorStop(0,'#5a9a3a');lg.addColorStop(1,still?'#e8d070':'#8ac860');g.fillStyle=lg;g.beginPath();g.ellipse(l*.5,0,l*.55,l*.28,0,0,7);g.fill();g.restore()}
  g.restore();if(still&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-27*s,12*s,'255,220,120',.35+.15*Math.sin(t*2));g.restore()}}
/* ---------- สัตว์ขี่: ด้วงแบกฟ้า (ด้วงหินยักษ์ · เขาแรด · หลังแบกต้นกล้าค้ำแผ่นดินทั้งต้น) ---------- */
function mtBeetleD(x,y,fx,ph,t,sc){const S=sc||1,mv=!!ph,gal=mv?ph*1.15:0,bob=mv?-Math.abs(Math.sin(gal))*1.2:Math.sin(t*1.6)*.4;g.save();g.translate(x,y);g.scale(fx*S,S);
  g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(0,17,26,5,0,0,7);g.fill();g.lineCap='round';
  for(let k=0;k<3;k++)for(const far of[1,0]){const lx=-12+k*12,ph2=gal+k*2+(far?Math.PI:0),sw=mv?Math.sin(ph2)*4:0,lf=mv?Math.max(0,Math.cos(ph2))*2:0;g.strokeStyle=far?'#2a241e':'#4a4036';g.lineWidth=3.2;g.beginPath();g.moveTo(lx,6+bob);g.quadraticCurveTo(lx+sw*.5+(far?-2:2),11+bob,lx+sw,16-lf);g.stroke()}
  g.fillStyle='#3e362e';g.strokeStyle='#140e0c';g.lineWidth=1;g.beginPath();g.ellipse(21,4+bob,9,7,0,0,7);g.fill();g.stroke();
  g.fillStyle='#5a5044';g.beginPath();g.moveTo(24,0+bob);g.quadraticCurveTo(34,-4+bob,33,-14+bob);g.quadraticCurveTo(30,-6+bob,24,-3+bob);g.closePath();g.fill();g.stroke();
  g.fillStyle='#ffb84a';g.beginPath();g.arc(26,3+bob,1.6,0,7);g.fill();
  {const gr=g.createLinearGradient(0,-12+bob,0,10+bob);gr.addColorStop(0,'#8a7e6c');gr.addColorStop(.6,'#5e5446');gr.addColorStop(1,'#3a322a');g.fillStyle=gr;g.beginPath();g.ellipse(-2,1+bob,22,12,0,0,7);g.fill();g.strokeStyle='#140e0c';g.lineWidth=1.2;g.stroke()}
  g.strokeStyle='rgba(20,14,10,.6)';g.lineWidth=1.2;g.beginPath();g.moveTo(-2,-11+bob);g.lineTo(-2,12+bob);g.stroke();
  g.fillStyle='rgba(90,140,60,.75)';g.beginPath();g.ellipse(-12,-6+bob,6,2.6,0,0,7);g.ellipse(8,-7+bob,5,2.2,0,0,7);g.fill();
  g.strokeStyle='rgba(255,180,80,.6)';g.lineWidth=.9;g.beginPath();g.moveTo(-14,2+bob);g.lineTo(-9,6+bob);g.lineTo(-6,3+bob);g.moveTo(6,4+bob);g.lineTo(10,8+bob);g.stroke();
  const tx=-16,ty=-8+bob,sw2=Math.sin(t*1.4)*1.5;g.strokeStyle='#5a3a20';g.lineWidth=3;g.beginPath();g.moveTo(tx,ty);g.quadraticCurveTo(tx-2,ty-12,tx+sw2*.5,ty-24);g.stroke();
  for(const[dx,dy,r,c]of[[-6,-26,7,'#3e7a34'],[5,-27,7,'#4a8a3a'],[0,-33,8,'#5a9a44'],[-2,-24,5,'#6aaa4a']]){g.fillStyle=c;g.beginPath();g.ellipse(tx+dx+sw2,ty+dy,r,r*.7,0,0,7);g.fill()}
  g.restore();if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x+(fx||1)*(-16)*S,y+(-34+bob)*S,14*S,'255,220,120',.25+.1*Math.sin(t*2));g.restore()}}
/* ---------- ฉากจบในค่าย ---------- */
const PA5C={},PA5CITY=[['ค่ายผู้อพยพ','#b0703a','#f0d8a0',0],['อัสตรา','#2a4a9a','#e8eef8',1],['อารัณยา','#a8322a','#f0c060',2],['เหมืองคาร์น','#5a5a64','#e0c890',3],['กองเรือ','#1e3a5a','#ffffff',4],['วาฬดาว','#2a7a8a','#c8f0ff',5],['ห้วงดาว','#4a2a7a','#ffe8a0',6],['นครรากลึก','#3a6a2a','#ffc860',7]];
/* ตราเมืองบนธง (วาดเอง ไม่ใช้อีโมจิ) */
function pa5Emb(i,col){g.fillStyle=col;g.strokeStyle=col;g.lineWidth=1.6;g.lineCap='round';
  if(i===0){g.beginPath();g.moveTo(-7,5);g.lineTo(0,-6);g.lineTo(7,5);g.closePath();g.fill();g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-1.5,0,3,5)}
  else if(i===1){g.beginPath();for(let k=0;k<8;k++){const a=k/8*6.283,r=k%2?2.4:7;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill()}
  else if(i===2){g.beginPath();g.arc(0,0,3.6,0,7);g.fill();for(let k=0;k<8;k++){const a=k/8*6.283;g.beginPath();g.moveTo(Math.cos(a)*5,Math.sin(a)*5);g.lineTo(Math.cos(a)*7.5,Math.sin(a)*7.5);g.stroke()}}
  else if(i===3){g.beginPath();g.moveTo(-6,6);g.lineTo(5,-5);g.moveTo(-6,-3);g.quadraticCurveTo(0,-8,6,-4);g.stroke()}
  else if(i===4){g.beginPath();g.moveTo(0,-7);g.lineTo(0,6);g.moveTo(-4,-4);g.lineTo(4,-4);g.moveTo(-6,2);g.quadraticCurveTo(0,9,6,2);g.stroke()}
  else if(i===5){g.beginPath();g.ellipse(-1,0,6,3.6,0,0,7);g.fill();g.beginPath();g.moveTo(4,0);g.lineTo(8,-3);g.lineTo(8,3);g.closePath();g.fill()}
  else if(i===6){for(const[dx,dy,r]of[[0,-2,4],[-5,4,2],[5,4,2.4]]){g.beginPath();for(let k=0;k<8;k++){const a=k/8*6.283,rr=k%2?r*.35:r;g.lineTo(dx+Math.cos(a)*rr,dy+Math.sin(a)*rr)}g.closePath();g.fill()}}
  else{g.beginPath();g.arc(0,-2,5,0,7);g.fill();g.fillRect(-1,2,2,5)}}
function pa5FlagD(x,y,i,T){const C=PA5CITY[i%8],w=Math.sin(T*3+i)*3;g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(x+3,y+2,10,3.4,0,0,7);g.fill();
  g.strokeStyle='#4a3420';g.lineWidth=3.4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-96);g.stroke();g.fillStyle='#c8a048';g.beginPath();g.arc(x,y-98,3,0,7);g.fill();
  g.fillStyle=C[1];g.beginPath();g.moveTo(x+1,y-92);g.quadraticCurveTo(x+22,y-96+w,x+44,y-90+w*1.4);g.lineTo(x+44,y-62+w*1.4);g.quadraticCurveTo(x+22,y-68+w,x+1,y-64);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1;g.stroke();
  g.save();g.translate(x+23,y-78+w*.9);pa5Emb(C[3],C[2]);g.restore()}
function pa5ArchD(x,y,T){g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+4,110,14,0,0,7);g.fill();
  for(const s of[-1,1]){const px=x+s*86;g.strokeStyle='#3a2616';g.lineWidth=16;g.beginPath();g.moveTo(px,y);g.quadraticCurveTo(px-s*6,y-60,px+s*2,y-128);g.stroke();g.strokeStyle='#6a4a30';g.lineWidth=9;g.stroke();
    for(let k=0;k<3;k++){g.strokeStyle='#4a3220';g.lineWidth=4;g.beginPath();g.moveTo(px,y-10-k*36);g.quadraticCurveTo(px+s*14,y-20-k*36,px+s*20,y-6-k*36);g.stroke()}
    g.fillStyle='rgba(90,150,60,.8)';g.beginPath();g.ellipse(px,y-112,12,5,0,0,7);g.fill()}
  g.strokeStyle='#3a2616';g.lineWidth=14;g.beginPath();g.moveTo(x-96,y-120);g.quadraticCurveTo(x,y-170,x+96,y-120);g.stroke();g.strokeStyle='#7a5638';g.lineWidth=7;g.stroke();
  /* ป้าย */g.strokeStyle='rgba(200,170,120,.9)';g.lineWidth=1.4;g.beginPath();g.moveTo(x-40,y-140);g.lineTo(x-38,y-118);g.moveTo(x+40,y-140);g.lineTo(x+38,y-118);g.stroke();
  g.fillStyle='#6a4a2c';g.beginPath();g.roundRect(x-62,y-120,124,30,6);g.fill();g.strokeStyle='#2a1a0e';g.lineWidth=2;g.stroke();g.font='bold 14px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText('บ้านของทุกคน',x,y-99);
  /* ธงราว + โคม */for(let k=0;k<9;k++){const u=k/8,bx=x-90+u*180,by=y-118-Math.sin(u*Math.PI)*40;g.fillStyle=PA5CITY[k%8][1];g.beginPath();g.moveTo(bx-6,by);g.lineTo(bx+6,by);g.lineTo(bx,by+12);g.closePath();g.fill()}
  for(const s of[-1,1]){const lx=x+s*60,ly=y-86,f=.75+.25*Math.sin(T*3+s);g.fillStyle='rgba(120,240,215,'+(.7+.3*f)+')';g.beginPath();g.moveTo(lx-8,ly);g.quadraticCurveTo(lx,ly-12,lx+8,ly);g.closePath();g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly-2,26*f,'120,255,220',.4);g.restore()}}
/* ต้นค้ำต้นใหม่ข้างรอยแยก (แคช 2 ชั้น: พื้น = เงา + รากแผ่ · บน = ลำต้นเส้นยางทอง + กิ่ง + พุ่มใหญ่ · ย่อ 0.62 ให้พุ่มไม่ล้นเข้ารั้วค่าย) */
const PA5SC=.62;
function pa5TreeSpr(){if(PA5C.t)return PA5C.t;const SC=PA5SC,W=Math.ceil(820*SC),H=Math.ceil(1000*SC),bx=Math.round(410*SC),by=Math.round(940*SC),R=gxRng(5701);
  const mk=()=>{const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');c.translate(bx,by);c.scale(SC,SC);c.lineCap='round';c.lineJoin='round';return[cv,c]};
  const[cvG,cG]=mk(),[cvU,cU]=mk();let c=cG;
  const taper=(P,w0,w1,col)=>{const A=[],B=[];for(let k=0;k<P.length;k++){const a=P[Math.min(k+1,P.length-1)],b=P[Math.max(k-1,0)],dx=a[0]-b[0],dy=a[1]-b[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,w=(w0+(w1-w0)*k/(P.length-1))/2;A.push([P[k][0]+nx*w,P[k][1]+ny*w]);B.push([P[k][0]-nx*w,P[k][1]-ny*w])}
    c.fillStyle=col;c.beginPath();A.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));for(let k=B.length-1;k>=0;k--)c.lineTo(B[k][0],B[k][1]);c.closePath();c.fill()};
  /* ===== ชั้นพื้น ===== */
  /* เงาพุ่มบนพื้น */{const gr=c.createRadialGradient(20,10,20,20,10,330);gr.addColorStop(0,'rgba(0,0,0,.35)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.beginPath();c.ellipse(20,10,330,70,0,0,7);c.fill()}
  /* รากแผ่บนพื้น */for(let k=0;k<12;k++){const s=k%2?1:-1,a=(k/11-.5)*2.6,L=110+R()*150,P=[];for(let q=0;q<=8;q++){const u=q/8;P.push([Math.sin(a)*(50+u*L*1.4)+s*u*20,-8+u*(20+R()*6)+Math.sin(u*5+k)*4])}
    taper(P,30-q8(k),6,'rgba(10,6,4,.35)');taper(P.map(([x,y])=>[x,y-4]),26-q8(k),5,'#4a3220');taper(P.map(([x,y])=>[x,y-7]),12,2,'#7a5638');if(R()<.6){c.strokeStyle='rgba(255,190,90,.55)';c.lineWidth=1.6;c.beginPath();P.forEach(([x,y],q)=>q?c.lineTo(x,y-6):c.moveTo(x,y-6));c.stroke()}}
  /* ใบอ่อนกับเห็ดเรืองตามราก */for(let k=0;k<16;k++){const a=(R()-.5)*2.8,d=90+R()*260,x=Math.sin(a)*d,y=4+R()*22;c.fillStyle=R()<.5?'rgba(110,170,70,.8)':'rgba(255,214,120,.75)';c.beginPath();c.ellipse(x,y,7+R()*5,3+R()*2,R(),0,7);c.fill()}
  /* ===== ชั้นบน ===== */c=cU;
  /* ลำต้น */const tp=()=>{c.beginPath();c.moveTo(-96,0);c.bezierCurveTo(-60,-30,-58,-200,-50,-470);c.lineTo(50,-470);c.bezierCurveTo(58,-200,60,-30,96,0);c.closePath()};
  tp();{const gr=c.createLinearGradient(-90,0,90,0);gr.addColorStop(0,'#2a1a0e');gr.addColorStop(.3,'#6a4a2e');gr.addColorStop(.5,'#8a6440');gr.addColorStop(.8,'#4a3220');gr.addColorStop(1,'#1e140a');c.fillStyle=gr;c.fill()}
  c.save();tp();c.clip();for(let k=0;k<12;k++){const x0=-80+k*14.5,ph=R()*6;c.strokeStyle='rgba(20,12,6,.5)';c.lineWidth=2+R()*2;c.beginPath();for(let q=0;q<=24;q++){const y=-q/24*470,x=x0*(1-.4*q/24)+Math.sin(q*.6+ph)*3;q?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}
    for(const s of[-.3,.25]){c.strokeStyle='rgba(255,190,90,.65)';c.lineWidth=3;c.beginPath();for(let q=0;q<=24;q++){const y=-q/24*470,x=s*80*(1-.4*q/24)+Math.sin(q*.5+s*4)*6;q?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}
    for(let k=0;k<10;k++){const x=(R()-.5)*90,y=-R()*440,s=8+R()*14;c.fillStyle='rgba(80,140,60,.6)';c.beginPath();c.ellipse(x,y,s,s*.45,0,0,7);c.fill()}c.restore();
  /* โคนลำต้นแตกเป็นรากใหญ่ลงดิน */for(const s of[-1,1]){taper([[s*70,-40],[s*104,-10],[s*130,6]],34,10,'#4a3220');taper([[s*66,-44],[s*98,-16],[s*122,2]],14,4,'#7a5638')}
  /* กิ่งใหญ่ */for(const[a,L,w]of[[-2.5,230,34],[-1.95,190,30],[-1.2,200,30],[-.62,240,34],[-1.57,170,28]]){const x0=Math.cos(a)*30,y0=-440,P=[];for(let q=0;q<=6;q++){const u=q/6;P.push([x0+Math.cos(a)*L*u,y0+Math.sin(a)*L*u*.75-u*u*30])}taper(P,w,8,'#4a3220');taper(P.map(([x,y])=>[x-2,y-3]),w*.5,4,'#7a5638')}
  /* กิ่งชิงช้า (ยื่นซ้ายต่ำ) */taper([[-40,-300],[-110,-330],[-180,-332]],30,12,'#4a3220');taper([[-40,-304],[-110,-334],[-176,-336]],12,4,'#7a5638');
  /* พุ่มใบ */const CL=[];for(let k=0;k<34;k++){const a=R()*6.283,r=Math.sqrt(R()),x=Math.cos(a)*300*r,y=-660+Math.sin(a)*170*r,s=60+R()*50;CL.push([x,y,s])}CL.sort((p,q)=>p[1]-q[1]);
  for(const[x,y,s]of CL){c.fillStyle='rgba(20,40,16,.5)';c.beginPath();c.ellipse(x+6,y+12,s,s*.7,0,0,7);c.fill()}
  for(const[x,y,s]of CL){const gr=c.createRadialGradient(x-s*.3,y-s*.35,4,x,y,s);gr.addColorStop(0,'#7ab85a');gr.addColorStop(.6,'#4e8a3a');gr.addColorStop(1,'#2e5a26');c.fillStyle=gr;c.beginPath();c.ellipse(x,y,s,s*.72,0,0,7);c.fill()}
  for(let k=0;k<60;k++){const a=R()*6.283,r=Math.sqrt(R()),x=Math.cos(a)*300*r,y=-680+Math.sin(a)*160*r;c.fillStyle=R()<.15?'rgba(255,220,120,.85)':'rgba(170,220,120,.45)';c.beginPath();c.ellipse(x,y,6+R()*6,3+R()*3,R(),0,7);c.fill()}
  const sc=p=>[p[0]*SC,p[1]*SC];
  PA5C.t={G:cvG,U:cvU,bx,by,SC,lamps:[[-210,-470],[160,-460],[-60,-430],[250,-520],[40,-480],[-260,-560]].map(sc),sw:sc([-170,-334]),cn:sc([0,-660]),cr:300*SC};return PA5C.t}
const q8=k=>(k%3)*4;
/* ชั้นพื้น (วาดก่อนตัวละครเสมอ) */
function pa5TreeG(x,y){const S=pa5TreeSpr();g.drawImage(S.G,x-S.bx,y-S.by)}
/* ชั้นบน: ลำต้น พุ่ม ชิงช้า โคม (โปร่งเมื่อผู้เล่นเดินอยู่หลังพุ่ม/ลำต้น) */
function pa5TreeD(x,y,T){const S=pa5TreeSpr(),cy=y+S.cn[1],bh=me.cls&&((Math.abs(me.x-x)<S.cr&&me.y<cy+S.cr*.62&&me.y>cy-S.cr*.7)||(Math.abs(me.x-x)<70&&me.y<y-8&&me.y>cy)),a0=g.globalAlpha;g.globalAlpha=Math.min(a0,bh?.45:1);
  /* ชิงช้า (แกว่งช้า ๆ) */{const[sx,sy]=S.sw,ph=Math.sin(T*1.3)*.12,L=(-sy)-18,ex=x+sx+Math.sin(ph)*L,ey=y+sy+Math.cos(ph)*L;g.strokeStyle='rgba(220,190,140,.9)';g.lineWidth=1.6;for(const d of[-9,9]){g.beginPath();g.moveTo(x+sx+d,y+sy);g.lineTo(ex+d,ey);g.stroke()}g.fillStyle='#8a5a30';g.save();g.translate(ex,ey);g.rotate(-ph*.6);g.fillRect(-13,-2,26,5);g.restore()}
  g.drawImage(S.U,x-S.bx,y-S.by);
  g.save();g.globalCompositeOperation='lighter';const pu=.6+.4*Math.sin(T*1.6);for(const[dx,dy]of S.lamps)glowAt(x+dx,y+dy+10,18,'255,190,110',.45*pu);glowAt(x,y-160,110,'255,190,90',.06+.03*Math.sin(T));
  for(let k=0;k<(LOWQ?3:8);k++){const p=(T*.12+k/8)%1;glowAt(x+Math.sin(k*2.1+T*.3)*150,y+S.cn[1]+60-p*190,3,'255,230,150',.6*Math.sin(p*Math.PI))}g.restore();
  for(const[dx,dy]of S.lamps){const lx=x+dx,ly=y+dy;g.strokeStyle='rgba(60,40,24,.9)';g.lineWidth=1;g.beginPath();g.moveTo(lx,ly-9);g.lineTo(lx,ly+4);g.stroke();g.fillStyle='rgba(255,200,110,.9)';g.beginPath();g.ellipse(lx,ly+8,3.4,4.6,0,0,7);g.fill();g.strokeStyle='#5a3a1a';g.lineWidth=.8;g.stroke()}
  g.globalAlpha=a0}
