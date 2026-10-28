
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
  /* กรามหยัก */for(const s of[-1,1]){g.save();g.translate(hx+r*.26,hy+s*r*.08);g.rotate(s*op);const M=[[0,-s*r*.03],['q',r*.22,-s*r*.12,r*.42,s*r*.02],['l',r*.34,s*r*.05],['l',r*.3,-s*r*.0],['l',r*.24,s*r*.06],['l',r*.18,s*r*.01],['q',r*.1,s*r*.06,0,s*r*.05]];vS(W,M,'#4a3e30',1,.9);if(!W){g.fillStyle='rgba(255,230,190,.25)';g.beginPath();g.ellipse(r*.18,-s*r*.04,r*.08,r*.02,0,0,7);g.fill()}g.restore()}
  for(const s of[-1,1])vEye(W,hx+r*.1,hy-r*.12+s*r*.05,r*.022,r*.022,'#ffb84a',W?0:4);
  /* ฝุ่นหินจากกราม */if(!W){for(let k=0;k<3;k++){const p=(T*1.3+k/3)%1;g.fillStyle='rgba(160,140,110,'+(.7*(1-p))+')';g.beginPath();g.arc(hx+r*.5+p*r*.1,hy+p*r*.3,r*.025,0,7);g.fill()}}
  return true};
MV1D[471]=(r,T,W,bob)=>{/* แมงกะพรุนความว่าง: ร่มทรงระฆังสีม่วงดำ ข้างในเป็นห้วงดาวเล็ก ๆ วงแหวนเรืองชั้นใน หนวดยาวพลิ้ว แกนกลางเหมือนดวงตา ลอยขึ้นลงช้า ๆ */
  const b=-r*.5+Math.sin(T*1.6)*r*.12,pu=.55+.45*Math.sin(T*2.2),pl=Math.sin(T*2.2)*.08;
  vGlow(W,0,b,r*1.1,'170,120,255',.22*pu);
  /* หนวด */for(let k=0;k<7;k++){const x0=(k-3)*r*.11,L=r*(.7+((k*37)%5)*.08);const P=[[x0,b+r*.18]];for(let q=1;q<=4;q++){const u=q/4;P.push(['l',x0+Math.sin(T*2+k+u*3)*r*.1*u,b+r*.18+L*u])}vK(W,P,W?'#fff':(k%2?'rgba(190,150,255,.75)':'rgba(140,100,220,.7)'),r*.025*(1-.3*(k%2)))}
  /* ร่ม */const BP=[[-r*.5*(1+pl),b+r*.16],['q',-r*.56*(1+pl),b-r*.5,0,b-r*.54],['q',r*.56*(1+pl),b-r*.5,r*.5*(1+pl),b+r*.16],['q',r*.25,b+r*.28,0,b+r*.18],['q',-r*.25,b+r*.28,-r*.5*(1+pl),b+r*.16]];
  if(W)vS(W,BP,'#fff',1,1.1);else{vP(BP);const gr=g.createRadialGradient(0,b-r*.1,r*.05,0,b-r*.1,r*.6);gr.addColorStop(0,'rgba(60,30,100,.95)');gr.addColorStop(.7,'rgba(26,12,48,.95)');gr.addColorStop(1,'rgba(90,60,170,.85)');g.fillStyle=gr;g.fill();g.lineWidth=1.1;g.strokeStyle=V1.O;g.stroke();
    g.save();vP(BP);g.clip();for(let k=0;k<9;k++){const sx=Math.sin(k*2.7)*r*.38,sy=b-r*.36+((k*29)%10)/10*r*.46,tw=.5+.5*Math.sin(T*3+k);g.fillStyle='rgba(255,255,255,'+(.4+.5*tw)+')';g.fillRect(sx-.7,sy-.7,1.4,1.4)}
    g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){g.strokeStyle='rgba(190,150,255,'+(.25+.15*Math.sin(T*2-k))+')';g.lineWidth=r*.03;g.beginPath();g.ellipse(0,b-r*.08,r*(.18+k*.12),r*(.08+k*.06),0,0,7);g.stroke()}g.restore();
    g.fillStyle='rgba(230,210,255,.3)';g.beginPath();g.ellipse(-r*.18,b-r*.36,r*.18,r*.06,-.4,0,7);g.fill()}
  /* แกนตา */vEye(W,0,b-r*.08,r*.07,r*.06,'#e0c8ff',W?0:9);if(!W){g.fillStyle='#1a0a2a';g.beginPath();g.ellipse(0,b-r*.08,r*.025,r*.05,0,0,7);g.fill()}
  return true};
MV1D[472]=(r,T,W,bob,sw0,la,ra)=>{/* ร่างรากซาก: เศษของผู้กลืนราก ก้อนรากดำไหม้พันกันเป็นร่างหลังค่อม แกนแมกมาแดงที่อก หัวเป็นปุ่มรากคล้ายหัวกะโหลก ตาถ่านแดง แขนรากยาวลากพื้น ควันลอย */
  const b=(bob||0)*.5,pu=.5+.5*Math.sin(T*2.6),RB='#2a1a14',RD='#160c08',RL='#4a3024';
  vGlow(W,0,-r*.3+b,r*.9,'255,90,40',.16*pu);
  /* ขา */for(const[s,l]of[[-1,la||0],[1,ra||0]])vLimb(W,[s*r*.2,r*.1+b,s*r*.28,r*.46,s*r*.24,r*.8-l],RD,r*.14,r*.09);
  /* ร่างรากพัน */for(let k=0;k<5;k++){const a=k/5*Math.PI*2+T*.2;vK(W,[[Math.cos(a)*r*.3,-r*.1+b+Math.sin(a)*r*.15],['q',0,-r*.35+b,Math.cos(a+2)*r*.32,-r*.5+b+Math.sin(a+2)*r*.12]],W?'#fff':(k%2?RB:RL),r*.09)}
  bvE(W,0,-r*.28+b,r*.36,r*.38,RB,1,1.2);
  /* แกนแมกมา */if(!W){g.save();g.globalCompositeOperation='lighter';glowAt(0,-r*.28+b,r*.3,'255,110,40',.5*pu);g.restore();g.fillStyle='#ff7a2a';g.beginPath();g.ellipse(0,-r*.28+b,r*.1,r*.12,0,0,7);g.fill();g.fillStyle='#ffd27a';g.beginPath();g.ellipse(0,-r*.3+b,r*.05,r*.06,0,0,7);g.fill()
    g.strokeStyle='rgba(255,120,50,.7)';g.lineWidth=r*.025;for(let k=0;k<5;k++){const a=k/5*6.283+.4;g.beginPath();g.moveTo(Math.cos(a)*r*.1,-r*.28+b+Math.sin(a)*r*.12);g.lineTo(Math.cos(a)*r*.3,-r*.28+b+Math.sin(a)*r*.32);g.stroke()}}
  /* แขนรากยาว */for(const s of[-1,1]){const sw=Math.sin(T*1.8+s)*r*.06;vLimb(W,[s*r*.3,-r*.42+b,s*r*.62,-r*.1+b+sw,s*r*.56,r*.34+b],RD,r*.1,r*.05);vK(W,[[s*r*.56,r*.34+b],['l',s*r*.7,r*.42+b],['m',s*r*.56,r*.34+b],['l',s*r*.6,r*.46+b]],W?'#fff':RL,r*.03)}
  /* หัวปุ่มราก */const hy=-r*.72+b;bvE(W,r*.04,hy,r*.2,r*.18,'#3a261a',1,1);if(!W){g.fillStyle='rgba(255,200,160,.12)';g.beginPath();g.ellipse(-r*.02,hy-r*.08,r*.1,r*.04,0,0,7);g.fill()}
  for(const s of[-1,1])vEye(W,r*.04+s*r*.07,hy,r*.035,r*.03,'#ff4a2a',W?0:7);
  /* ควัน */if(!W)for(let k=0;k<4;k++){const p=(T*.35+k/4)%1;g.fillStyle='rgba(70,60,60,'+(.4*(1-p))+')';g.beginPath();g.arc(Math.sin(k*1.7+T)*r*.2,hy-r*.2-p*r*.7,r*(.06+p*.12),0,7);g.fill()}
  return true};
MV1S[470]=1.7;MV1S[471]=1.55;MV1S[472]=2.1;
/* ---------- ธรณิน · ผู้แบกคนแรก (สไปรต์แคช · วาดที่ตำแหน่งเข่า) ----------
   ยักษ์หินรากคุกเข่าข้างหนึ่ง แขนทั้งสองยกขึ้นยันฐานแผ่นดินเหนือหัว ก้มหน้าอยู่ระหว่างแขน เครารากห้อย ตาอำพันหรี่
   รอยร้าวเรืองอำพันทั่วตัว · มอสและรากพันขา · รอยกัดเป็นหลุมบนหน้าแข้ง · แผ่นหินฐานแผ่นดินกว้างเกินสไปรต์ จางหายในความมืดด้านบน */
const THRS={c:null,W:1100,H:1150,bx:550,by:1080};
function thrSpr(){if(THRS.c)return THRS;const cv=document.createElement('canvas');cv.width=THRS.W;cv.height=THRS.H;const c=cv.getContext('2d'),R=gxRng(5101);c.translate(THRS.bx,THRS.by);c.lineJoin='round';c.lineCap='round';
  const stone=(pts,c1,c2,x0,y0,x1,y1)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();const gr=c.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,c1);gr.addColorStop(1,c2);c.fillStyle=gr;c.fill();c.strokeStyle='#120c08';c.lineWidth=3;c.stroke()};
  const crack=(x,y,L,a,w)=>{c.strokeStyle='rgba(20,10,4,.85)';c.lineWidth=w+2;c.beginPath();let px=x,py=y;c.moveTo(px,py);for(let k=0;k<5;k++){a+=(R()-.5)*.9;px+=Math.cos(a)*L/5;py+=Math.sin(a)*L/5;c.lineTo(px,py)}c.stroke();c.strokeStyle='rgba(255,170,70,.75)';c.lineWidth=w*.5;c.stroke()};
  const moss=(x,y,s)=>{c.fillStyle='rgba(70,120,50,.7)';c.beginPath();c.ellipse(x,y,s,s*.45,R()-.5,0,7);c.fill();c.fillStyle='rgba(150,210,100,.4)';c.beginPath();c.ellipse(x-s*.2,y-s*.12,s*.5,s*.18,0,0,7);c.fill()};
  const root=(pts,w,col)=>{c.strokeStyle='rgba(10,6,4,.5)';c.lineWidth=w+4;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y+3):c.moveTo(x,y+3));c.stroke();c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();c.strokeStyle='rgba(220,180,130,.18)';c.lineWidth=w*.3;c.stroke()};
  /* ฐานแผ่นดิน (แผ่นหินเหนือหัว) */{const y0=-1000,y1=-870;c.fillStyle='#1e1812';c.beginPath();c.moveTo(-560,y0-40);c.lineTo(560,y0-40);c.lineTo(560,y1);for(let k=0;k<=24;k++){const x=560-k/24*1120;c.lineTo(x,y1+((k*37)%11)*3+Math.sin(k*1.7)*8)}c.closePath();c.fill();
    for(let k=0;k<18;k++){const x=-540+R()*1080,y=y1-R()*110;c.fillStyle=R()<.5?'rgba(70,58,44,.6)':'rgba(40,32,24,.6)';c.beginPath();c.ellipse(x,y,20+R()*40,8+R()*14,0,0,7);c.fill()}
    for(let k=0;k<26;k++){const x=-540+R()*1080,L=20+R()*90;root([[x,y1+4],[x+(R()-.5)*14,y1+L*.5],[x+(R()-.5)*20,y1+L]],2+R()*3,'#3a2616')}
    for(let k=0;k<6;k++){const x=-500+k*200+(R()-.5)*60;root([[x,y0-40],[x+(R()-.5)*30,y0+40],[x+(R()-.5)*40,y1+10]],16+R()*10,'#4a3220')}}
  /* แขนซ้าย-ขวา ยกขึ้นยันแผ่นหิน */for(const s of[-1,1]){const sx=s*170,sy=-600,ex=s*230,ey=-880;stone([[sx-s*70,sy+20],[sx+s*60,sy-30],[ex+s*70,ey+40],[ex+s*80,ey-10],[ex-s*50,ey-10],[ex-s*60,ey+50],[sx-s*40,sy+90]],'#6e6252','#3a3228',sx-90,sy,sx+90,sy);
    /* ข้อศอกหิน */c.fillStyle='#5a4e40';c.beginPath();c.ellipse(sx+s*30,sy-110,58,44,s*.4,0,7);c.fill();c.strokeStyle='#120c08';c.lineWidth=3;c.stroke();
    /* ฝ่ามือแนบแผ่นหิน */c.fillStyle='#7a6c5a';c.beginPath();c.ellipse(ex,ey-18,86,30,0,0,7);c.fill();c.stroke();c.strokeStyle='#120c08';c.lineWidth=2.4;for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(ex+k*26,ey-40);c.lineTo(ex+k*28,ey-6);c.stroke()}
    crack(sx+s*10,sy-60,140,-1.6+s*.3,4);crack(ex,ey+60,90,1.5,3);moss(sx+s*40,sy-30,30);root([[sx-s*50,sy+60],[sx,sy-80],[ex-s*20,ey+60]],7,'#3e2a18')}
  /* ขาพับ (คุกเข่า) */stone([[-330,0],[-360,-120],[-290,-250],[-150,-280],[-90,-180],[-130,-40],[-200,10]],'#5e5446','#2e2820',-360,-200,-100,0);
  stone([[90,10],[110,-160],[200,-300],[340,-270],[380,-140],[330,-20],[220,20]],'#665a4a','#30281e',100,-250,380,0);
  c.fillStyle='#4a4034';c.beginPath();c.ellipse(-250,-240,80,58,-.3,0,7);c.fill();c.strokeStyle='#120c08';c.lineWidth=3;c.stroke();c.beginPath();c.ellipse(270,-280,86,60,.3,0,7);c.fill();c.stroke();
  /* รอยกัดบนหน้าแข้ง */for(const[x,y]of[[-250,-80],[-190,-140],[230,-110],[300,-60],[180,-190]]){c.fillStyle='#0a0604';c.beginPath();c.arc(x,y,16,0,7);c.fill();c.fillStyle='rgba(255,170,70,.55)';c.beginPath();c.arc(x,y,7,0,7);c.fill();c.fillStyle='#a8906a';for(let q=0;q<7;q++){const a=q/7*6.283;c.fillRect(x+Math.cos(a)*15-2,y+Math.sin(a)*15-2,4,4)}}
  /* ลำตัว */stone([[-230,-300],[-260,-470],[-200,-620],[0,-660],[200,-620],[260,-470],[230,-300],[120,-260],[-120,-260]],'#7a6c5a','#342c22',-260,-600,260,-300);
  c.save();c.beginPath();c.moveTo(-230,-300);c.lineTo(-260,-470);c.lineTo(-200,-620);c.lineTo(0,-660);c.lineTo(200,-620);c.lineTo(260,-470);c.lineTo(230,-300);c.lineTo(120,-260);c.lineTo(-120,-260);c.closePath();c.clip();
  /* แผ่นหินอก */for(const[x,y,w,h]of[[-110,-520,120,90],[110,-520,120,90],[-70,-400,110,80],[80,-395,110,80]]){c.fillStyle='rgba(140,124,100,.35)';c.beginPath();c.ellipse(x,y,w*.5,h*.5,0,0,7);c.fill();c.strokeStyle='rgba(20,12,6,.6)';c.lineWidth=3;c.stroke()}
  for(let k=0;k<14;k++)moss(-220+R()*440,-620+R()*340,14+R()*26);c.restore();
  crack(-40,-600,260,1.6,6);crack(60,-560,180,1.9,4);crack(-150,-450,140,.6,3);crack(150,-430,150,2.4,3);
  root([[-260,-320],[-200,-420],[-120,-470],[-30,-560]],10,'#3e2a18');root([[250,-310],[180,-380],[140,-500]],8,'#3e2a18');
  /* หัวก้ม (อยู่ระหว่างแขน) */stone([[-90,-640],[-110,-720],[-60,-790],[60,-790],[110,-720],[90,-640],[0,-610]],'#837360','#3e3428',-100,-790,100,-620);
  c.fillStyle='#4a3e30';c.beginPath();c.moveTo(-100,-735);c.quadraticCurveTo(0,-770,100,-735);c.lineTo(96,-715);c.quadraticCurveTo(0,-745,-96,-715);c.closePath();c.fill();
  /* เครารากห้อย */for(let k=0;k<11;k++){const x=-70+k*14,L=60+((k*29)%5)*16;root([[x,-660],[x+(R()-.5)*10,-660+L*.5],[x+(R()-.5)*16,-660+L]],3+R()*3,k%2?'#3a2616':'#4a3420')}
  /* ร่องตา (เรืองตอนวาดเฟรม) */for(const s of[-1,1]){c.fillStyle='#0e0804';c.beginPath();c.ellipse(s*36,-708,20,9,s*.15,0,7);c.fill()}
  /* มอส + ต้นไม้เล็กบนไหล่ */moss(-200,-610,40);moss(210,-600,44);for(const s of[-1,1]){const x=s*220,y=-630;c.strokeStyle='#3a2616';c.lineWidth=4;c.beginPath();c.moveTo(x,y);c.lineTo(x+s*6,y-50);c.stroke();c.fillStyle='rgba(80,140,60,.85)';c.beginPath();c.arc(x+s*6,y-60,24,0,7);c.fill();c.fillStyle='rgba(140,200,90,.6)';c.beginPath();c.arc(x+s*2,y-68,12,0,7);c.fill()}
  /* รากพันขาลงพื้น */for(let k=0;k<10;k++){const x=-360+k*80+(R()-.5)*30;root([[x,-R()*160-40],[x+(R()-.5)*30,-20],[x+(R()-.5)*60,30]],5+R()*6,k%2?'#3e2a18':'#4a3220')}
  /* ด้านบนจางหายในความมืด */c.globalCompositeOperation='destination-out';{const fg=c.createLinearGradient(0,-1080,0,-930);fg.addColorStop(0,'rgba(0,0,0,1)');fg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=fg;c.fillRect(-THRS.bx,-THRS.by,THRS.W,170)}c.globalCompositeOperation='source-over';
  THRS.c=cv;return THRS}
/* วาดธรณิน + ส่วนเคลื่อนไหว (หายใจ · ตา · รอยร้าวเรือง · ฝุ่นร่วงจากแผ่นหิน) */
function thrDraw(x,y,T,o){o=o||{};const S=thrSpr(),br=Math.sin(T*.55)*3,tired=o.tired||0;g.drawImage(S.c,x-S.bx,y-S.by+br);
  g.save();g.globalCompositeOperation='lighter';const pu=.55+.45*Math.sin(T*1.1);
  for(const[dx,dy,rr]of[[-40,-540,60],[60,-470,46],[-150,-420,40],[150,-400,40],[170,-640,40],[-170,-650,40]])glowAt(x+dx,y+dy+br,rr,'255,160,60',(.1+.08*pu)*(1-tired*.6));
  const bl=(T%6.4)>6.1?.15:1;for(const s of[-1,1]){glowAt(x+s*36,y-708+br,22,'255,180,80',(.5+.2*pu)*bl*(1-tired*.7));g.fillStyle='rgba(255,210,120,'+(.85*bl*(1-tired*.7))+')';g.beginPath();g.ellipse(x+s*36,y-708+br,9,3.4*bl,s*.15,0,7);g.fill()}
  g.restore();
  if(!LOWQ){for(let k=0;k<6;k++){const p=(T*.25+k/6)%1,dx=Math.sin(k*2.3)*420;g.fillStyle='rgba(150,130,100,'+(.6*(1-p))+')';g.fillRect(x+dx,y-870+p*400,2.4,2.4)}}}
/* ---------- บอส: ราชินีกัดแผ่นดิน (ปลวกราชินียักษ์ · ท้องถุงไข่ใสเรืองอำพัน · อกเกราะดำ · มงกุฎหนามหิน · กรามคู่ใหญ่) ---------- */
BV1['ราชินีกัดแผ่นดิน']=(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.4*Math.sin(T*1.4),B=typeof mons!=='undefined'?mons.find(q=>q.t===3):null,hf=B&&B.mh?B.hp/B.mh:1,molt=hf<.5,gn=typeof PNQ!=='undefined'&&PNQ.gn>0;
  bvShadow(130,30,.38);
  /* ขา 6 ขา */for(const[s,k]of[[-1,0],[1,0],[-1,1],[1,1],[-1,2],[1,2]]){const ph=Math.sin(T*2.4+k*1.7+s)*5;vLimb(W,[-10+k*40,-10+b,-10+k*40+s*30,s*20+ph,-10+k*44+s*48,s*44+26],'#2a1e16',10,5)}
  /* ท้องถุงไข่ */const ax=-96,ay=-40+b;bvE(W,ax,ay,96,62,molt?'#e8c890':'#f0dcae',1,1.6);
  if(!W){g.save();g.beginPath();g.ellipse(ax,ay,94,60,0,0,7);g.clip();g.fillStyle='rgba(200,140,60,.25)';for(let k=0;k<7;k++){g.beginPath();g.ellipse(ax-80+k*26,ay,10,58,0,0,7);g.fill()}
    g.globalCompositeOperation='lighter';for(let k=0;k<14;k++){const ex=ax-70+((k*53)%140),ey=ay-40+((k*31)%80),ep=.5+.5*Math.sin(T*2+k);glowAt(ex,ey,9,'255,200,100',.35*ep);g.fillStyle='rgba(255,240,190,'+(.5*ep)+')';g.beginPath();g.ellipse(ex,ey,5,7,0,0,7);g.fill()}g.restore();
    g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.ellipse(ax-20,ay-36,52,12,-.15,0,7);g.fill();bvAdd(W,()=>glowAt(ax,ay,110,'255,190,90',.16*pu))}
  /* อกเกราะดำ */bvE(W,10,-48+b,46,38,'#2e2420',1,1.4);if(!W){g.fillStyle='rgba(255,230,200,.14)';g.beginPath();g.ellipse(0,-70+b,26,8,-.2,0,7);g.fill()}
  /* ปีกขาด */if(!W){for(const s of[-1,1]){g.fillStyle='rgba(200,190,170,.35)';g.beginPath();g.moveTo(-10,-70+b);g.quadraticCurveTo(-60,-110+s*6+b,-120,-96+s*10+b);g.lineTo(-96,-80+b);g.lineTo(-70,-86+b);g.closePath();g.fill()}}
  /* หัว + มงกุฎหนามหิน */const hx=74+(gn?14:0),hy=-56+b+(gn?12:0);bvE(W,hx,hy,40,34,'#3a2e26',1,1.4);
  for(const[dx,dh,a]of[[-26,30,-.5],[-10,42,-.2],[6,48,0],[22,40,.25],[34,28,.5]]){g.save();g.translate(hx+dx*.6,hy-28);g.rotate(a);vS(W,[[-7,0],[-2,-dh],[3,-dh+6],[7,0]],molt?'#9a7a5a':'#6a5a4a',1,1);g.restore()}
  if(!W){g.fillStyle='rgba(255,220,180,.2)';g.beginPath();g.ellipse(hx-8,hy-16,20,7,-.2,0,7);g.fill()}
  for(const s of[-1,1]){vEye(W,hx+16,hy-8+s*12,5,4.4,'#ffb040',W?0:10);bvAdd(W,()=>glowAt(hx+16,hy-8+s*12,10,'255,180,70',.55))}
  /* กรามคู่ใหญ่ (กางกว้างตอนกัด) */const op=(gn?.55+.2*Math.sin(T*12):.18+.12*Math.sin(T*3))+cf*.2;for(const s of[-1,1]){g.save();g.translate(hx+34,hy+s*14);g.rotate(s*op);vS(W,[[0,-s*6],['q',30,-s*24,56,s*6],['l',46,s*10],['l',40,s*3],['l',32,s*12],['q',18,s*8,0,s*10]],'#1e1612',1,1.2);if(!W){g.fillStyle='rgba(255,230,190,.28)';g.beginPath();g.ellipse(24,-s*8,12,3,0,0,7);g.fill()}g.restore()}
  /* ลอกคราบ (เลือด < 50%): รอยแตกเรืองบนเปลือก */if(!W&&molt){g.strokeStyle='rgba(255,190,90,'+(.6+.3*pu)+')';g.lineWidth=2.2;for(const[x0,y0,x1,y1]of[[-150,-70,-110,-40],[-80,-90,-60,-50],[-20,-30,-60,-10],[20,-80,40,-50]]){g.beginPath();g.moveTo(x0,y0+b);g.lineTo((x0+x1)/2+6,(y0+y1)/2+b);g.lineTo(x1,y1+b);g.stroke()}}
  /* ฝุ่นหินตอนกัด */if(!W&&gn){for(let k=0;k<8;k++){const p=(T*2+k/8)%1;g.fillStyle='rgba(170,150,120,'+(.8*(1-p))+')';g.beginPath();g.arc(hx+90+p*30,hy-10+Math.sin(k*2)*20-p*30,3+p*4,0,7);g.fill()}}};
BVS['ราชินีกัดแผ่นดิน']=1.5;
