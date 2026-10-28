
/* ===== v550 ภาค 10 บทที่ 4 — ภาพ: มอนธีม 47 (ปลวกศิลาทหาร · แมงกะพรุนความว่าง · ร่างรากซาก) · ธรณิน ผู้แบกคนแรก (สไปรต์ยักษ์) · บอส «ราชินีกัดแผ่นดิน» ===== */
MV1D[470]=(r,T,W,bob,sw0,la,ra)=>{/* ปลวกศิลาทหาร: หัวเกราะหินใหญ่ผิดตัว กรามหยักยาวเหมือนคีมตัดหิน ลำตัวปล้องขาวซีด ท้องเป็นถุงเรืองอำพันจาง ๆ ขา 6 ขาเดินถี่ ฝุ่นหินร่วงจากกราม */
  const b=Math.sin(T*8)*r*.02,st=Math.sin(T*10),op=.18+.16*Math.max(0,Math.sin(T*3.2));
  vGlow(W,-r*.3,r*.02+b,r*.5,'255,190,90',.16);
  /* ขา */for(let k=0;k<3;k++)for(const s of[-1,1]){const ph=st*(k%2?1:-1)*s,x0=-r*.3+k*r*.22,y0=r*.1+b;vLimb(W,[x0,y0,x0+s*r*.06+ph*r*.05,y0+r*.24,x0+s*r*.12+ph*r*.1,y0+r*.44],'#6a5a48',r*.055,r*.03)}
  /* ท้อง (ถุงซีด) */bvE(W,-r*.52,r*.02+b,r*.34,r*.24,'#e8dcc0',1,1);if(!W){g.strokeStyle='rgba(120,90,60,.5)';g.lineWidth=r*.02;for(let k=0;k<4;k++){g.beginPath();g.ellipse(-r*.52,r*.02+b,r*(.32-k*.05),r*.22,0,1.2,2.0);g.stroke()}g.save();g.globalCompositeOperation='lighter';glowAt(-r*.56,r*.04+b,r*.22,'255,200,110',.22);g.restore()}
  /* อก */bvE(W,-r*.12,-r*.02+b,r*.2,r*.17,'#cdbf9e',1,1);
  /* หัวเกราะหิน */const hx=r*.32,hy=-r*.1+b,HP=[[hx-r*.26,hy+r*.1],['q',hx-r*.3,hy-r*.26,hx,hy-r*.3],['q',hx+r*.3,hy-r*.26,hx+r*.32,hy+r*.02],['q',hx+r*.2,hy+r*.22,hx-r*.26,hy+r*.1]];
  if(W)vS(W,HP,'#fff',1,1.2);else{vP(HP);const gr=g.createLinearGradient(hx-r*.3,hy-r*.3,hx+r*.3,hy+r*.2);gr.addColorStop(0,'#9a8e7c');gr.addColorStop(.55,'#6e6252');gr.addColorStop(1,'#3e362c');g.fillStyle=gr;g.fill();g.lineWidth=1.2;g.strokeStyle=V1.O;g.stroke();
    g.save();vP(HP);g.clip();g.strokeStyle='rgba(30,22,14,.55)';g.lineWidth=r*.02;g.beginPath();g.moveTo(hx-r*.2,hy-r*.18);g.lineTo(hx-r*.04,hy-r*.06);g.lineTo(hx+r*.08,hy-r*.2);g.moveTo(hx-r*.04,hy-r*.06);g.lineTo(hx-r*.02,hy+r*.12);g.stroke();
    g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.ellipse(hx-r*.08,hy-r*.2,r*.14,r*.05,-.2,0,7);g.fill();g.restore()}
  /* กรามหยัก */for(const s of[-1,1]){g.save();g.translate(hx+r*.26,hy+s*r*.08);g.rotate(s*op);const M=[[0,-s*r*.03],['q',r*.22,-s*r*.12,r*.42,s*r*.02],[r*.34,s*r*.05],[r*.3,-s*r*.0],[r*.24,s*r*.06],[r*.18,s*r*.01],['q',r*.1,s*r*.06,0,s*r*.05]];vS(W,M,'#4a3e30',1,.9);if(!W){g.fillStyle='rgba(255,230,190,.25)';g.beginPath();g.ellipse(r*.18,-s*r*.04,r*.08,r*.02,0,0,7);g.fill()}g.restore()}
  for(const s of[-1,1])vEye(W,hx+r*.1,hy-r*.12+s*r*.05,r*.022,r*.022,'#ffb84a',W?0:4);
  /* ฝุ่นหินจากกราม */if(!W){for(let k=0;k<3;k++){const p=(T*1.3+k/3)%1;g.fillStyle='rgba(160,140,110,'+(.7*(1-p))+')';g.beginPath();g.arc(hx+r*.5+p*r*.1,hy+p*r*.3,r*.025,0,7);g.fill()}}
  return true};
MV1D[471]=(r,T,W,bob)=>{/* แมงกะพรุนความว่าง: ร่มทรงระฆังสีม่วงดำ ข้างในเป็นห้วงดาวเล็ก ๆ วงแหวนเรืองชั้นใน หนวดยาวพลิ้ว แกนกลางเหมือนดวงตา ลอยขึ้นลงช้า ๆ */
  const b=-r*.5+Math.sin(T*1.6)*r*.12,pu=.55+.45*Math.sin(T*2.2),pl=Math.sin(T*2.2)*.08;
  vGlow(W,0,b,r*1.1,'170,120,255',.22*pu);
  /* หนวด */for(let k=0;k<7;k++){const x0=(k-3)*r*.11,L=r*(.7+((k*37)%5)*.08);const P=[[x0,b+r*.18]];for(let q=1;q<=4;q++){const u=q/4;P.push([x0+Math.sin(T*2+k+u*3)*r*.1*u,b+r*.18+L*u])}vK(W,P,W?'#fff':(k%2?'rgba(190,150,255,.75)':'rgba(140,100,220,.7)'),r*.025*(1-.3*(k%2)))}
  /* ร่ม */const BP=[[-r*.5*(1+pl),b+r*.16],['q',-r*.56*(1+pl),b-r*.5,0,b-r*.54],['q',r*.56*(1+pl),b-r*.5,r*.5*(1+pl),b+r*.16],['q',r*.25,b+r*.28,0,b+r*.18],['q',-r*.25,b+r*.28,-r*.5*(1+pl),b+r*.16]];
  if(W)vS(W,BP,'#fff',1,1.1);else{vP(BP);const gr=g.createRadialGradient(0,b-r*.1,r*.05,0,b-r*.1,r*.6);gr.addColorStop(0,'rgba(60,30,100,.95)');gr.addColorStop(.7,'rgba(26,12,48,.95)');gr.addColorStop(1,'rgba(90,60,170,.85)');g.fillStyle=gr;g.fill();g.lineWidth=1.1;g.strokeStyle=V1.O;g.stroke();
    g.save();vP(BP);g.clip();for(let k=0;k<9;k++){const sx=Math.sin(k*2.7)*r*.38,sy=b-r*.36+((k*29)%10)/10*r*.46,tw=.5+.5*Math.sin(T*3+k);g.fillStyle='rgba(255,255,255,'+(.4+.5*tw)+')';g.fillRect(sx-.7,sy-.7,1.4,1.4)}
    g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){g.strokeStyle='rgba(190,150,255,'+(.25+.15*Math.sin(T*2-k))+')';g.lineWidth=r*.03;g.beginPath();g.ellipse(0,b-r*.08,r*(.18+k*.12),r*(.08+k*.06),0,0,7);g.stroke()}g.restore();
    g.fillStyle='rgba(230,210,255,.3)';g.beginPath();g.ellipse(-r*.18,b-r*.36,r*.18,r*.06,-.4,0,7);g.fill()}
  /* แกนตา */vEye(W,0,b-r*.08,r*.07,r*.06,'#e0c8ff',W?0:9);if(!W){g.fillStyle='#1a0a2a';g.beginPath();g.ellipse(0,b-r*.08,r*.025,r*.05,0,0,7);g.fill()}
  return true};
MV1D[472]=(r,T,W,bob,sw0,la,ra)=>{/* ร่างรากซาก: เศษของผู้กลืนราก ก้อนรากดำไหม้พันกันเป็นร่างหลังค่อมใหญ่ แกนแมกมาแดงเต้นที่อก หัวเป็นปุ่มรากคล้ายกะโหลก ตาถ่านแดง แขนรากยาวลากพื้น ควันลอย */
  const b=(bob||0)*.5,pu=.5+.5*Math.sin(T*2.6),RB='#2e1e16',RD='#160c08',RL='#4e3426',hb=Math.sin(T*1.4)*r*.02;
  vGlow(W,0,-r*.36+b,r*1,'255,90,40',.16*pu);
  /* ขาสั้นหนา */for(const[s,l]of[[-1,la||0],[1,ra||0]])vLimb(W,[s*r*.26,r*.02+b,s*r*.34,r*.42,s*r*.3,r*.8-l],RD,r*.18,r*.12);
  /* ก้อนร่างหลังค่อม (มวลรากพันกัน) */const BD=[[-r*.52,r*.06+b],['c',-r*.66,-r*.4+b,-r*.36,-r*.86+b+hb,r*.04,-r*.84+b+hb],['c',r*.42,-r*.82+b+hb,r*.62,-r*.42+b,r*.5,r*.04+b],['q',0,r*.2+b,-r*.52,r*.06+b]];
  if(W)vS(W,BD,'#fff',1,1.4);else{vP(BD);const gr=g.createLinearGradient(-r*.5,-r*.8+b,r*.5,r*.1+b);gr.addColorStop(0,'#3e2a1e');gr.addColorStop(.6,'#22140e');gr.addColorStop(1,'#120a06');g.fillStyle=gr;g.fill();g.lineWidth=1.4;g.strokeStyle=V1.O;g.stroke();
    g.save();vP(BD);g.clip();for(let k=0;k<9;k++){const a=k*.7+T*.15,y0=-r*.8+k*r*.1+b;g.strokeStyle=k%2?'#4a3224':'#5a3e2c';g.lineWidth=r*.07;g.beginPath();g.moveTo(-r*.7,y0+Math.sin(a)*r*.06);g.bezierCurveTo(-r*.2,y0-r*.12,r*.2,y0+r*.12,r*.7,y0+Math.sin(a+1)*r*.06);g.stroke();g.strokeStyle='rgba(10,6,4,.6)';g.lineWidth=r*.015;g.stroke()}
    g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,100,40,'+(.35+.25*pu)+')';g.lineWidth=r*.02;for(let k=0;k<6;k++){const a=k/6*6.283+.3;g.beginPath();g.moveTo(0,-r*.42+b);g.quadraticCurveTo(Math.cos(a)*r*.2,-r*.42+b+Math.sin(a)*r*.2,Math.cos(a)*r*.46,-r*.42+b+Math.sin(a)*r*.4);g.stroke()}g.restore()}
  /* แกนแมกมาที่อก */if(!W){g.save();g.globalCompositeOperation='lighter';glowAt(0,-r*.42+b,r*.34,'255,110,40',.5*pu);g.restore();g.fillStyle='#ff7a2a';g.beginPath();g.ellipse(0,-r*.42+b,r*.11,r*.13,0,0,7);g.fill();g.fillStyle='#ffd27a';g.beginPath();g.ellipse(0,-r*.44+b,r*.05,r*.06,0,0,7);g.fill()}
  /* แขนรากยาวลากพื้น */for(const s of[-1,1]){const sw=Math.sin(T*1.8+s)*r*.06;vLimb(W,[s*r*.4,-r*.56+b+hb,s*r*.74,-r*.2+b+sw,s*r*.68,r*.36+b],RD,r*.13,r*.06);vK(W,[[s*r*.68,r*.36+b],[s*r*.84,r*.44+b]],W?'#fff':RL,r*.035);vK(W,[[s*r*.68,r*.36+b],[s*r*.72,r*.5+b]],W?'#fff':RL,r*.035);vK(W,[[s*r*.68,r*.36+b],[s*r*.58,r*.48+b]],W?'#fff':RL,r*.03)}
  /* หัวปุ่มราก (ยื่นไปข้างหน้า ต่ำกว่าหลัง) */const hx=r*.12,hy=-r*.7+b+hb;bvE(W,hx,hy,r*.22,r*.19,'#3a261a',1,1.2);if(!W){g.fillStyle='rgba(255,200,160,.12)';g.beginPath();g.ellipse(hx-r*.05,hy-r*.09,r*.11,r*.04,0,0,7);g.fill();g.fillStyle='#0a0604';g.beginPath();g.ellipse(hx,hy+r*.1,r*.08,r*.03,0,0,7);g.fill()}
  for(const s of[-1,1])vEye(W,hx+s*r*.08,hy-r*.01,r*.04,r*.032,'#ff4a2a',W?0:8);
  for(const s of[-1,1])vK(W,[[hx+s*r*.14,hy-r*.14],['q',hx+s*r*.26,hy-r*.3,hx+s*r*.2,hy-r*.38]],W?'#fff':RL,r*.04);
  /* ควัน */if(!W)for(let k=0;k<4;k++){const p=(T*.35+k/4)%1;g.fillStyle='rgba(70,60,60,'+(.4*(1-p))+')';g.beginPath();g.arc(Math.sin(k*1.7+T)*r*.24,-r*.86-p*r*.7+b,r*(.06+p*.12),0,7);g.fill()}
  return true};
MV1S[470]=1.7;MV1S[471]=1.55;MV1S[472]=2.1;
/* ---------- ธรณิน · ผู้แบกคนแรก (สไปรต์แคช · วาดที่ตำแหน่งเข่า) ----------
   ยักษ์หินรากคุกเข่าข้างหนึ่ง แขนทั้งสองยกขึ้นยันฐานแผ่นดินเหนือหัว ก้มหน้าอยู่ระหว่างแขน เครารากห้อย ตาอำพันหรี่
   รอยร้าวเรืองอำพันทั่วตัว · มอสและรากพันขา · รอยกัดเป็นหลุมบนหน้าแข้ง · แผ่นหินฐานแผ่นดินกว้างเกินสไปรต์ จางหายในความมืดด้านบน */
const THRS={c:null,W:1100,H:1150,bx:550,by:1080};
function thrSpr(){if(THRS.c)return THRS;const cv=document.createElement('canvas');cv.width=THRS.W;cv.height=THRS.H;const c=cv.getContext('2d'),R=gxRng(5101);c.translate(THRS.bx,THRS.by);c.lineJoin='round';c.lineCap='round';
  const O='#120c08';
  const crack=(x,y,L,a,w)=>{c.strokeStyle='rgba(20,10,4,.85)';c.lineWidth=w+2;c.beginPath();let px=x,py=y;c.moveTo(px,py);const P=[[px,py]];for(let k=0;k<5;k++){a+=(R()-.5)*.9;px+=Math.cos(a)*L/5;py+=Math.sin(a)*L/5;c.lineTo(px,py);P.push([px,py])}c.stroke();c.strokeStyle='rgba(255,170,70,.8)';c.lineWidth=w*.45;c.stroke();return P};
  const moss=(x,y,s)=>{c.fillStyle='rgba(70,120,50,.75)';c.beginPath();c.ellipse(x,y,s,s*.45,R()-.5,0,7);c.fill();c.fillStyle='rgba(150,210,100,.4)';c.beginPath();c.ellipse(x-s*.2,y-s*.12,s*.5,s*.18,0,0,7);c.fill()};
  const root=(pts,w,col)=>{c.strokeStyle='rgba(10,6,4,.5)';c.lineWidth=w+4;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y+3):c.moveTo(x,y+3));c.stroke();c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();c.strokeStyle='rgba(220,180,130,.18)';c.lineWidth=w*.3;c.stroke()};
  /* แขนขาเรียวแบบหิน: เส้นกลาง P · กว้างต้น w0 ปลาย w1 · ไล่สีขวางลำ */
  const limb=(P,w0,w1,c1,c2)=>{const A=[],B=[];for(let k=0;k<P.length;k++){const a=P[Math.min(k+1,P.length-1)],b=P[Math.max(k-1,0)],dx=a[0]-b[0],dy=a[1]-b[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,w=(w0+(w1-w0)*k/(P.length-1))/2;A.push([P[k][0]+nx*w,P[k][1]+ny*w]);B.push([P[k][0]-nx*w,P[k][1]-ny*w])}
    c.beginPath();A.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));for(let k=B.length-1;k>=0;k--)c.lineTo(B[k][0],B[k][1]);c.closePath();const m=P[Math.floor(P.length/2)],gr=c.createLinearGradient(m[0]-w0,m[1],m[0]+w0,m[1]);gr.addColorStop(0,c2);gr.addColorStop(.35,c1);gr.addColorStop(1,c2);c.fillStyle=gr;c.fill();c.strokeStyle=O;c.lineWidth=3;c.stroke()};
  const boulder=(x,y,rx,ry,rot,c1,c2)=>{c.save();c.translate(x,y);c.rotate(rot);const gr=c.createRadialGradient(-rx*.35,-ry*.4,rx*.1,0,0,Math.max(rx,ry));gr.addColorStop(0,c1);gr.addColorStop(1,c2);c.fillStyle=gr;c.beginPath();c.ellipse(0,0,rx,ry,0,0,7);c.fill();c.strokeStyle=O;c.lineWidth=3;c.stroke();c.restore()};
  /* ฐานแผ่นดิน (แผ่นหินเหนือหัว) */{const y0=-1000,y1=-880;c.fillStyle='#1e1812';c.beginPath();c.moveTo(-560,y0-40);c.lineTo(560,y0-40);c.lineTo(560,y1);for(let k=0;k<=24;k++){const x=560-k/24*1120;c.lineTo(x,y1+((k*37)%11)*3+Math.sin(k*1.7)*8)}c.closePath();c.fill();
    for(let k=0;k<18;k++){const x=-540+R()*1080,y=y1-R()*110;c.fillStyle=R()<.5?'rgba(70,58,44,.6)':'rgba(40,32,24,.6)';c.beginPath();c.ellipse(x,y,20+R()*40,8+R()*14,0,0,7);c.fill()}
    for(let k=0;k<26;k++){const x=-540+R()*1080,L=20+R()*90;root([[x,y1+4],[x+(R()-.5)*14,y1+L*.5],[x+(R()-.5)*20,y1+L]],2+R()*3,'#3a2616')}
    for(let k=0;k<6;k++){const x=-500+k*200+(R()-.5)*60;root([[x,y0-40],[x+(R()-.5)*30,y0+40],[x+(R()-.5)*40,y1+10]],16+R()*10,'#4a3220')}}
  /* แขนยกขึ้นยันแผ่นหิน (ไหล่ → ศอกกางออก → มือแนบแผ่นหิน) */for(const s of[-1,1]){limb([[s*235,-590],[s*300,-680],[s*340,-760]],128,98,'#7a6c5a','#3a3228');limb([[s*340,-760],[s*310,-830],[s*250,-890]],96,78,'#837462','#3e352a');
    boulder(s*338,-760,58,52,0,'#6e6252','#2e2820');
    /* มือแผ่นิ้วกดแผ่นหิน */boulder(s*246,-900,74,34,0,'#8a7a66','#3e352a');for(let k=0;k<4;k++){const fx=s*(196+k*32),fy=-918-(k===1||k===2?6:0);boulder(fx,fy,16,22,s*.15*(k-1.5),'#9a8a74','#4a3e30')}
    crack(s*300,-690,130,-1.9+s*.5,4);crack(s*320,-830,80,-1.5,3);moss(s*290,-700,32);moss(s*270,-860,20);root([[s*230,-600],[s*310,-700],[s*330,-800],[s*270,-880]],7,'#3e2a18')}
  /* ขา: ซ้ายคุกเข่า (เข่ายื่นมาข้างหน้า) · ขวาตั้งเข่า */limb([[-150,-300],[-210,-200],[-240,-120]],150,120,'#6e6252','#2e2820');limb([[-240,-120],[-255,-60],[-262,0]],118,104,'#665a4a','#2a241c');
  limb([[150,-300],[230,-270],[280,-250]],150,124,'#6e6252','#2e2820');limb([[285,-250],[290,-140],[285,-10]],120,108,'#665a4a','#2a241c');
  boulder(-238,-130,82,60,-.25,'#7a6c5a','#2e2820');boulder(282,-258,84,62,.2,'#7a6c5a','#2e2820');boulder(-262,8,74,26,0,'#5a4e40','#241e18');boulder(286,2,70,26,0,'#5a4e40','#241e18');
  /* รอยกัดบนหน้าแข้ง: ขอบหยักเป็นรอยฟัน ข้างในเรืองแดงเหมือนหินที่เพิ่งแตก · เศษหินร่วง */for(const[x,y,a,s]of[[-262,-78,.25,1],[-238,-26,-.3,.8],[292,-118,.1,1.1],[300,-58,-.25,.85],[276,-182,.35,.75]]){c.save();c.translate(x,y);c.rotate(a);
    const bp=(rx,ry)=>{c.beginPath();for(let q=0;q<=44;q++){const t=q/44*6.2832,k=1+(Math.sin(t)<0?.2*Math.abs(Math.sin(t*5)):.06*Math.sin(t*9));c.lineTo(Math.cos(t)*rx*k,Math.sin(t)*ry*k)}c.closePath()};
    c.fillStyle='rgba(206,180,140,.32)';bp(30*s,16*s);c.fill();c.fillStyle='#0c0705';bp(25*s,12*s);c.fill();
    {const gr=c.createRadialGradient(0,3*s,1,0,3*s,18*s);gr.addColorStop(0,'rgba(255,190,90,.85)');gr.addColorStop(.5,'rgba(230,110,40,.45)');gr.addColorStop(1,'rgba(160,50,20,0)');c.fillStyle=gr;bp(20*s,9*s);c.fill()}
    c.strokeStyle='rgba(20,10,4,.8)';c.lineWidth=1.6;c.beginPath();c.moveTo(24*s,2);c.lineTo(36*s,9*s);c.lineTo(44*s,6*s);c.stroke();c.restore();
    for(let q=0;q<3;q++)boulder(x+(R()-.5)*30,y+20+R()*16,3+R()*3,2.4+R()*2,R(),'#8a7a66','#3e352a')}
  /* ลำตัว (ไหล่กว้าง อกหนา เอวสอบ · โค้งตามหิน) */const TP=()=>{c.beginPath();c.moveTo(-160,-290);c.bezierCurveTo(-230,-330,-290,-470,-275,-560);c.bezierCurveTo(-262,-640,-150,-668,0,-662);c.bezierCurveTo(150,-668,262,-640,275,-560);c.bezierCurveTo(290,-470,230,-330,160,-290);c.quadraticCurveTo(0,-250,-160,-290);c.closePath()};
  TP();{const gr=c.createLinearGradient(-280,-660,280,-300);gr.addColorStop(0,'#8a7a66');gr.addColorStop(.45,'#6a5e4c');gr.addColorStop(1,'#2e2820');c.fillStyle=gr;c.fill();c.strokeStyle=O;c.lineWidth=3;c.stroke()}
  c.save();TP();c.clip();
  /* ชั้นหิน + แผ่นอก */for(let k=0;k<6;k++){const y=-620+k*62;c.strokeStyle='rgba(20,12,6,.35)';c.lineWidth=3;c.beginPath();c.moveTo(-300,y);c.quadraticCurveTo(0,y+18,300,y);c.stroke();c.strokeStyle='rgba(230,200,160,.1)';c.lineWidth=2;c.beginPath();c.moveTo(-300,y-4);c.quadraticCurveTo(0,y+14,300,y-4);c.stroke()}
  for(const[x,y,rx,ry]of[[-100,-530,92,62],[100,-530,92,62],[-62,-410,72,52],[70,-405,72,52]]){const gr=c.createRadialGradient(x-rx*.3,y-ry*.4,6,x,y,rx);gr.addColorStop(0,'rgba(170,150,124,.45)');gr.addColorStop(1,'rgba(60,50,40,.25)');c.fillStyle=gr;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();c.strokeStyle='rgba(20,12,6,.55)';c.lineWidth=3;c.stroke()}
  for(let k=0;k<16;k++)moss(-240+R()*480,-640+R()*360,14+R()*24);c.restore();
  crack(-30,-620,250,1.62,6);crack(70,-580,170,1.85,4);crack(-170,-470,140,.7,3);crack(170,-450,150,2.3,3);
  root([[-250,-320],[-200,-420],[-120,-480],[-40,-560]],10,'#3e2a18');root([[240,-310],[190,-400],[150,-510]],8,'#3e2a18');
  /* หัวก้มอยู่ระหว่างแขน */boulder(0,-706,96,84,0,'#8a7a66','#3a3228');
  c.fillStyle='#4a3e30';c.beginPath();c.moveTo(-96,-722);c.quadraticCurveTo(0,-770,96,-722);c.quadraticCurveTo(0,-748,-96,-722);c.fill();
  for(const s of[-1,1]){c.fillStyle='#0e0804';c.beginPath();c.ellipse(s*36,-708,22,10,s*.15,0,7);c.fill()}
  c.fillStyle='rgba(30,20,12,.7)';c.beginPath();c.moveTo(-14,-690);c.lineTo(0,-668);c.lineTo(14,-690);c.closePath();c.fill();
  /* เครารากห้อย */for(let k=0;k<13;k++){const x=-78+k*13,L=70+((k*29)%5)*16;root([[x,-664],[x+(R()-.5)*10,-664+L*.5],[x+(R()-.5)*16,-664+L]],3+R()*3,k%2?'#3a2616':'#4a3420')}
  /* ผมมอส + ต้นกล้าบนหัว */for(let k=0;k<8;k++){const a=Math.PI+k/7*Math.PI;moss(Math.cos(a)*84,-712+Math.sin(a)*70,18)}c.strokeStyle='#3a2616';c.lineWidth=5;c.beginPath();c.moveTo(20,-786);c.quadraticCurveTo(26,-820,16,-846);c.stroke();c.fillStyle='rgba(90,160,70,.95)';for(const[dx,dy,r2]of[[16,-858,20],[-4,-846,14],[34,-844,14]]){c.beginPath();c.arc(dx,dy,r2,0,7);c.fill()}c.fillStyle='rgba(170,230,120,.6)';c.beginPath();c.arc(10,-866,9,0,7);c.fill();
  /* มอส + ต้นไม้เล็กบนไหล่ */moss(-220,-620,44);moss(220,-612,46);for(const s of[-1,1]){const x=s*230,y=-640;c.strokeStyle='#3a2616';c.lineWidth=4;c.beginPath();c.moveTo(x,y);c.lineTo(x+s*6,y-50);c.stroke();c.fillStyle='rgba(80,140,60,.85)';c.beginPath();c.arc(x+s*6,y-60,24,0,7);c.fill();c.fillStyle='rgba(140,200,90,.6)';c.beginPath();c.arc(x+s*2,y-68,12,0,7);c.fill()}
  /* รากพันขาแล้วแผ่ลงพื้น (เกาะหน้าแข้ง → โค้งออกไปมุดพื้น) */for(let k=0;k<12;k++){const s=k%2?1:-1,lx=s<0?-262:288,x0=lx+(R()-.5)*70,y0=-30-R()*130,dir=(R()<.7?s:-s),ex=x0+dir*(50+R()*120),ey=18+R()*26,mx=(x0+ex)/2+dir*10,my=(y0+ey)/2+24;
    root([[x0,y0],[x0+dir*8,y0+(ey-y0)*.35],[mx,my],[ex,ey]],4+R()*6,k%3?'#3e2a18':'#4a3220');if(R()<.5)root([[mx,my],[mx+dir*(20+R()*30),my+14+R()*10]],2+R()*2,'#3a2616')}
  /* ด้านบนจางหายในความมืด */c.globalCompositeOperation='destination-out';{const fg=c.createLinearGradient(0,-1080,0,-930);fg.addColorStop(0,'rgba(0,0,0,1)');fg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=fg;c.fillRect(-THRS.bx,-THRS.by,THRS.W,170)}c.globalCompositeOperation='source-over';
  THRS.c=cv;return THRS}
/* วาดธรณิน + ส่วนเคลื่อนไหว (หายใจ · ตา · รอยร้าวเรือง · ฝุ่นร่วงจากแผ่นหิน) */
function thrDraw(x,y,T,o){o=o||{};const S=thrSpr(),sl=o.sleep?1:0,br=Math.sin(T*(sl?.32:.55))*3,tired=o.tired||0;g.drawImage(S.c,x-S.bx,y-S.by+br);
  g.save();g.globalCompositeOperation='lighter';const pu=.55+.45*Math.sin(T*1.1),cg=sl?'255,200,110':'255,160,60';
  for(const[dx,dy,rr]of[[-40,-540,60],[60,-470,46],[-150,-420,40],[150,-400,40],[170,-640,40],[-170,-650,40]])glowAt(x+dx,y+dy+br,rr,cg,(.1+.08*pu)*(1-tired*.6)*(sl?.7:1));
  if(sl){g.restore();/* หลับ: เปลือกตาหินปิด · หายใจช้า · z ลอย */for(const s of[-1,1]){g.fillStyle='#5a5248';g.beginPath();g.ellipse(x+s*36,y-708+br,20,9,s*.15,0,7);g.fill();g.strokeStyle='rgba(24,16,10,.9)';g.lineWidth=3;g.beginPath();g.arc(x+s*36,y-713+br,13,.35,Math.PI-.35);g.stroke()}
    if(!LOWQ){g.save();g.font='bold 22px system-ui';g.textAlign='center';for(let k=0;k<3;k++){const p=(T*.18+k/3)%1;g.globalAlpha=Math.sin(p*Math.PI)*.75;g.fillStyle='#f4e8cc';g.font='bold '+(16+p*18|0)+'px system-ui';g.fillText('z',x+70+p*70,y-770-p*90+br)}g.restore()}}
  else{const bl=(T%6.4)>6.1?.15:1,cm=o.calm?1:0;for(const s of[-1,1]){glowAt(x+s*36,y-708+br,22,'255,180,80',(.5+.2*pu)*bl*(1-tired*.7));g.fillStyle=cm?'rgba(255,226,160,'+(.9*bl)+')':'rgba(255,210,120,'+(.85*bl*(1-tired*.7))+')';g.beginPath();g.ellipse(x+s*36,y-708+br,9,(cm?3:3.4)*bl,s*.15,0,7);g.fill()}g.restore()}
  if(!LOWQ){for(let k=0;k<6;k++){const p=(T*.25+k/6)%1,dx=Math.sin(k*2.3)*420;g.fillStyle='rgba(150,130,100,'+(.6*(1-p)*(sl?.4:1))+')';g.fillRect(x+dx,y-870+p*400,2.4,2.4)}}}
/* ---------- บอส: ราชินีกัดแผ่นดิน (ปลวกราชินียักษ์ · ท้องถุงไข่ใสเรืองอำพัน · อกเกราะดำ · มงกุฎหนามหิน · กรามคู่ใหญ่) ---------- */
BV1['ราชินีกัดแผ่นดิน']=(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.4*Math.sin(T*1.4),B=typeof mons!=='undefined'?mons.find(q=>q.t===3):null,hf=B&&B.mh?B.hp/B.mh:1,molt=hf<.5,gn=typeof PNQ!=='undefined'&&PNQ.gn>0;
  bvShadow(130,30,.38);
  /* ขา 6 ขา */for(const[s,k]of[[-1,0],[1,0],[-1,1],[1,1],[-1,2],[1,2]]){const ph=Math.sin(T*2.4+k*1.7+s)*5;vLimb(W,[-10+k*40,-10+b,-10+k*40+s*30,s*20+ph,-10+k*44+s*48,s*44+26],'#2a1e16',10,5)}
  /* ท้องถุงไข่ */const ax=-96,ay=-40+b;bvE(W,ax,ay,96,62,molt?'#c89a60':'#d6b47e',1,1.6);
  if(!W){g.save();g.beginPath();g.ellipse(ax,ay,94,60,0,0,7);g.clip();g.fillStyle='rgba(200,140,60,.25)';for(let k=0;k<7;k++){g.beginPath();g.ellipse(ax-80+k*26,ay,10,58,0,0,7);g.fill()}
    for(let k=0;k<14;k++){const ex=ax-70+((k*53)%140),ey=ay-40+((k*31)%80),ep=.5+.5*Math.sin(T*2+k);g.fillStyle='rgba(255,236,180,'+(.35+.3*ep)+')';g.beginPath();g.ellipse(ex,ey,5,7,0,0,7);g.fill();g.strokeStyle='rgba(150,90,30,.5)';g.lineWidth=1;g.stroke()}
    g.strokeStyle='rgba(110,60,20,.55)';g.lineWidth=3;for(let k=0;k<6;k++){g.beginPath();g.ellipse(ax+70-k*30,ay,8,60,0,0,7);g.stroke()}g.globalCompositeOperation='lighter';glowAt(ax+10,ay,70,'255,180,80',.1*pu);g.restore();
    g.fillStyle='rgba(255,255,255,.2)';g.beginPath();g.ellipse(ax-20,ay-36,52,12,-.15,0,7);g.fill();bvAdd(W,()=>glowAt(ax,ay,100,'255,170,80',.08*pu))}
  /* อกเกราะดำ */bvE(W,10,-48+b,46,38,'#2e2420',1,1.4);if(!W){g.fillStyle='rgba(255,230,200,.14)';g.beginPath();g.ellipse(0,-70+b,26,8,-.2,0,7);g.fill()}
  /* ปีกขาด */if(!W){for(const s of[-1,1]){g.fillStyle='rgba(200,190,170,.35)';g.beginPath();g.moveTo(-10,-70+b);g.quadraticCurveTo(-60,-110+s*6+b,-120,-96+s*10+b);g.lineTo(-96,-80+b);g.lineTo(-70,-86+b);g.closePath();g.fill()}}
  /* หัว + มงกุฎหนามหิน */const hx=74+(gn?14:0),hy=-56+b+(gn?12:0);bvE(W,hx,hy,40,34,'#3a2e26',1,1.4);
  for(const[dx,dh,a]of[[-26,30,-.5],[-10,42,-.2],[6,48,0],[22,40,.25],[34,28,.5]]){g.save();g.translate(hx+dx*.6,hy-28);g.rotate(a);vS(W,[[-7,0],[-2,-dh],[3,-dh+6],[7,0]],molt?'#9a7a5a':'#6a5a4a',1,1);g.restore()}
  if(!W){g.fillStyle='rgba(255,220,180,.2)';g.beginPath();g.ellipse(hx-8,hy-16,20,7,-.2,0,7);g.fill()}
  for(const s of[-1,1]){vEye(W,hx+16,hy-8+s*12,5,4.4,'#ffb040',W?0:10);bvAdd(W,()=>glowAt(hx+16,hy-8+s*12,10,'255,180,70',.55))}
  /* กรามคู่ใหญ่ (กางกว้างตอนกัด) */const op=(gn?.55+.2*Math.sin(T*12):.18+.12*Math.sin(T*3))+cf*.2;for(const s of[-1,1]){g.save();g.translate(hx+34,hy+s*14);g.rotate(s*op);vS(W,[[0,-s*6],['q',30,-s*24,56,s*6],[46,s*10],[40,s*3],[32,s*12],['q',18,s*8,0,s*10]],'#1e1612',1,1.2);if(!W){g.fillStyle='rgba(255,230,190,.28)';g.beginPath();g.ellipse(24,-s*8,12,3,0,0,7);g.fill()}g.restore()}
  /* ลอกคราบ (เลือด < 50%): รอยแตกเรืองบนเปลือก */if(!W&&molt){g.strokeStyle='rgba(255,190,90,'+(.6+.3*pu)+')';g.lineWidth=2.2;for(const[x0,y0,x1,y1]of[[-150,-70,-110,-40],[-80,-90,-60,-50],[-20,-30,-60,-10],[20,-80,40,-50]]){g.beginPath();g.moveTo(x0,y0+b);g.lineTo((x0+x1)/2+6,(y0+y1)/2+b);g.lineTo(x1,y1+b);g.stroke()}}
  /* ฝุ่นหินตอนกัด */if(!W&&gn){for(let k=0;k<8;k++){const p=(T*2+k/8)%1;g.fillStyle='rgba(170,150,120,'+(.8*(1-p))+')';g.beginPath();g.arc(hx+90+p*30,hy-10+Math.sin(k*2)*20-p*30,3+p*4,0,7);g.fill()}}};
BVS['ราชินีกัดแผ่นดิน']=1.5;
