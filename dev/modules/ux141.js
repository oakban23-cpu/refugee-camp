
/* ===== v544 NPC แมพ 39–42 วาดใหม่ — ลูมิน่า เด็กดาว · กัปตันกริฟ + ลูกเรือเรือดำ · นาวิน/ทิล แมพ 39 ใช้แบบ v515
   ใช้ชุด NPK/NP3 + แคช npvW เดียวกับ v515–v517 · error → วาดแบบเดิม (NPV.err) · ปิดทั้งหมด NPV.on=0 ===== */
const NPV9={ok:0};
/* ดาวห้าแฉก (หน่วยท้องถิ่น) */
function lumStar9(x,y,r,fill,line,rot){const p=[];for(let k=0;k<10;k++){const a=-Math.PI/2+(rot||0)+k*Math.PI/5,rr=k%2?r*.45:r;p.push(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}NPK.P(p,fill,line,.35)}
/* ---------- ลูมิน่า เด็กดาว: ผมเงินฟ้ายาวพลิ้วเป็นหางดาวหาง ดาวห้าแฉกบนหัว ชุดยาวที่ปลายจางเป็นละอองดาว ประคองดาวดวงเล็ก ดาวน้อยลอยวนรอบตัว ---------- */
function lumV(x,y,f,t){const{LG,P,E,glow}=NPK,OL='#2c3470',fl=Math.sin(t*1.6)*1.6,br=Math.sin(t*1.5)*.3,wd=Math.sin(t*1.9),wd2=Math.sin(t*2.5+1);
  NPK.sh(x,y+16,10-fl*.5);g.save();g.translate(x,y);g.scale(f*1.3,1.3);g.lineJoin='round';g.lineCap='round';
  if(!LOWQ)glow(0,-6+fl,30,'190,210,255',.3+.1*Math.sin(t*2));
  g.translate(0,fl-2);const hy=-16.4+br*.4;
  const orb=front=>{for(let i=0;i<3;i++){const a=t*1.1+i*2.094,s=Math.sin(a);if((s>0)!==front)continue;const sx=Math.cos(a)*12.5,sy=-3+s*3.6+Math.sin(t*2+i)*1.2,r=1.1+.35*s;if(!LOWQ)glow(sx,sy,4.5,'255,236,170',.5);lumStar9(sx,sy,r+.5,front?'#fff2b0':'#e8d890',OL,t*.8+i)}};
  orb(false);
  /* ผมยาวเป็นหางดาวหาง: ปอยผมพลิ้วขึ้นไปด้านหลังเหมือนหางดาว */
  for(let i=0;i<3;i++){const o=i*1.9,w1=Math.sin(t*1.9+i*.8),w2=Math.sin(t*2.5+i*1.3),tx=-20-i*1.6+w1*1.6,ty=hy-12+o*2+w2*1.4;g.beginPath();g.moveTo(-3.6,hy-6+o);g.bezierCurveTo(-8,hy-11+o,-12+w1*.6,hy-7+o*1.4,tx,ty);g.bezierCurveTo(-13+w1*.6,hy-2+o*1.2,-9,hy-1.4+o,-4.8,hy-1.2+o*.8);g.closePath();g.fillStyle=LG(tx,hy,-3,hy,['rgba(170,195,255,0)','rgba(200,218,255,.75)','#f0f4ff']);g.fill();if(i===1){g.strokeStyle='rgba(44,52,112,.35)';g.lineWidth=.35;g.stroke()}g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=.35;g.beginPath();g.moveTo(-5,hy-4+o);g.bezierCurveTo(-9,hy-7+o,-12+w1*.6,hy-5+o*1.3,tx+3,ty+1.2);g.stroke()}
  if(!LOWQ){g.fillStyle='#ffffff';for(let i=0;i<6;i++){const q=(t*.45+i/6)%1;g.globalAlpha=Math.sin(q*Math.PI)*.9;g.fillRect(-6-q*16+wd*q,hy-4-q*8+Math.sin(i*2.3)*2,.8,.8)}g.globalAlpha=1}
  /* ผมด้านหลังประบ่า */
  P([.6,hy-6.8,-4.8,hy-5.8,-7.4,hy-2,-8.2+wd*.3,hy+3.4,-6.6+wd*.3,hy+7,-4.4,hy+5.4,-3.4,hy+1.4],LG(0,hy-7,0,hy+7,['#ffffff','#d4e0ff','#9ab0ec']),'rgba(44,52,112,.6)',.5);
  /* แขนเสื้อกว้างโปร่ง (ด้านหลัง) */
  P([-4.6,-10+br*.3,-8.6,-5,-9.6+wd*.4,1,-6.4,.2,-4.8,-6],LG(0,-10,0,1,['rgba(240,246,255,.9)','rgba(170,195,255,.45)']),OL,.45);
  /* ชุดยาว ปลายจางเป็นละอองดาว */
  P([-4.4,-10.2+br*.3,4.4,-10.2+br*.3,6,-2,8.6+wd*.5,8,9.6+wd*.7,12.2,6.4,11.2,3.2,12.6,0,11.4,-3.2,12.6,-6.4,11.2,-9.6+wd2*.7,12.2,-8.6+wd2*.5,8,-6,-2],
    LG(0,-10,0,12.6,['#ffffff','#e4ecff','#b8c8ff','rgba(150,175,255,.35)']),'rgba(44,52,112,.7)',.6);
  g.strokeStyle='rgba(120,140,220,.35)';g.lineWidth=.45;for(const sx of[-3.4,0,3.4]){g.beginPath();g.moveTo(sx*.5,-1);g.quadraticCurveTo(sx*.9+wd*.3,5,sx*1.6+wd*.5,11.4);g.stroke()}
  /* ลายดาวในเนื้อผ้า (กะพริบ) */
  for(const[sx,sy,i]of[[-4.2,3,0],[3.6,6.4,1],[-1.4,9,2],[5.6,1,3],[-6,8.6,4]]){const tw=.5+.5*Math.sin(t*2.4+i*1.7);g.fillStyle='rgba(255,255,255,'+(.4+.6*tw)+')';g.fillRect(sx-.3,sy-1.1,.6,2.2);g.fillRect(sx-1.1,sy-.3,2.2,.6)}
  /* ละอองดาวหลุดจากชายชุด */
  if(!LOWQ)for(let i=0;i<7;i++){const q=(t*.45+i/7)%1,px=-8+i*2.6+Math.sin(t+i)*1.2,py=12+q*9;g.globalAlpha=(1-q)*.9;g.fillStyle=i%2?'#fff4c0':'#d8e4ff';g.fillRect(px,py,1,1)}g.globalAlpha=1;
  /* สายคาดเอวทอง + เข็มกลัดดาว */
  P([-5.6,-3.4+br*.2,5.6,-3.4+br*.2,5.8,-1.8+br*.2,-5.8,-1.8+br*.2],LG(0,-3.4,0,-1.8,['#ffe9a0','#c8962e']),OL,.4);
  g.strokeStyle='#e8c060';g.lineWidth=.6;g.beginPath();g.moveTo(-4.6,-2);g.quadraticCurveTo(-6+wd*.4,2,-5.4+wd*.8,5.4);g.stroke();
  /* ปกคอเป็นแฉกแสง */
  for(let i=0;i<5;i++)P([-3.8+i*1.9,-10.4+br*.3,-3+i*1.9,-8.2+br*.3,-2.2+i*1.9,-10.4+br*.3],'#ffffff',OL,.3);
  /* สองมือประคองดาวดวงเล็กไว้ที่อก (แขนเสื้อทรงระฆังโปร่ง) */
  {const cx=2.8,cy=-6+Math.sin(t*1.8)*.5,SL=LG(0,-10,0,-2,['rgba(250,252,255,.95)','rgba(190,208,255,.7)']);
    P([-4.6,-9.8+br*.3,-6.4,-6.4,-3.8,-3,cx-3.4,cy+2.6,cx-2.6,cy-.2,-2.6,-6,-3.2,-9],SL,'rgba(44,52,112,.55)',.4);
    if(!LOWQ)glow(cx,cy,9,'255,236,170',.55+.2*Math.sin(t*3));lumStar9(cx,cy,2.5,LG(0,cy-2.5,0,cy+2.5,['#fffbe0','#ffd860']),'#b8862a',Math.sin(t*1.2)*.3);
    E(cx-2.6,cy+1.2,1.1,.95,'#f8faff','rgba(44,52,112,.55)',.3);E(cx+2.4,cy+1.4,1.1,.95,'#f8faff','rgba(44,52,112,.55)',.3);
    P([4.6,-9.8+br*.3,7.2,-6,6.6,-2.2,cx+3.4,cy+2.8,cx+2.8,cy,4.6,-5.4,3.4,-9],SL,'rgba(44,52,112,.55)',.4)}
  /* หน้า: ผิวเรืองแสง ตาโตสีครามมีประกาย แก้มชมพู ยิ้ม */
  E(.5,hy,5.6,5.8,LG(0,hy-6,0,hy+6,['#ffffff','#f0f4ff','#cdd8f6']),'rgba(44,52,112,.75)',.5);
  const blink=(t%4.2)<.13;for(const ex of[2.4,5])if(blink){g.strokeStyle='#2a3a8a';g.lineWidth=.5;g.beginPath();g.moveTo(ex-.8,hy+.3);g.quadraticCurveTo(ex,hy+.9,ex+.8,hy+.3);g.stroke()}else{E(ex,hy+.1,.85,1.25,LG(0,hy-1.2,0,hy+1.3,['#4a6ad8','#1e2a6a']),null);g.fillStyle='#ffffff';g.fillRect(ex-.5,hy-.8,.6,.6)}
  g.fillStyle='rgba(255,150,190,.5)';g.beginPath();g.arc(1.2,hy+2.2,.9,0,7);g.arc(5.8,hy+2.1,.8,0,7);g.fill();
  g.strokeStyle='rgba(90,60,120,.7)';g.lineWidth=.45;g.beginPath();g.moveTo(3,hy+2.9);g.quadraticCurveTo(3.8,hy+3.6,4.6,hy+2.9);g.stroke();
  /* ผมด้านหน้า (หน้าม้าแฉก) */
  g.beginPath();g.moveTo(-5.4,hy+4.2);g.quadraticCurveTo(-6.6,hy-6.2,.6,hy-6.6);g.quadraticCurveTo(6.8,hy-6.4,6.6,hy-.6);g.lineTo(5.4,hy-2.4);g.lineTo(4.4,hy-1);g.lineTo(3.4,hy-3);g.lineTo(2,hy-1.4);g.lineTo(1,hy-3.4);g.quadraticCurveTo(-2.6,hy-2.6,-3.4,hy+4.6);g.closePath();
  g.fillStyle=LG(0,hy-7,0,hy+4,['#ffffff','#dbe6ff','#a8bcf0']);g.fill();g.strokeStyle='rgba(44,52,112,.75)';g.lineWidth=.5;g.stroke();
  g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=.5;g.beginPath();g.arc(.2,hy-3.2,3.4,3.6,4.6);g.stroke();
  P([-4.2,hy-1.4,-5.2,hy+3,-4.6+wd*.2,hy+7.6,-3.4,hy+4,-2.8,hy-.6],LG(0,hy-2,0,hy+8,['#f4f8ff','#a8bcf0']),'rgba(44,52,112,.6)',.4);
  /* ดาวห้าแฉกบนหัว */
  {const sx=-1.6,sy=hy-6.8;if(!LOWQ){glow(sx,sy,7,'255,226,140',.55+.25*Math.sin(t*2.2));g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,240,190,'+(.35+.25*Math.sin(t*2.2))+')';g.lineWidth=.4;g.beginPath();g.moveTo(sx-5,sy);g.lineTo(sx+5,sy);g.moveTo(sx,sy-5);g.lineTo(sx,sy+5);g.stroke();g.restore()}
    lumStar9(sx,sy,2.9,LG(0,sy-3,0,sy+3,['#fff8d0','#ffd458','#e0a028']),'#9a6a1e',-.12)}
  orb(true);
  g.restore()}
/* ---------- กัปตันกริฟ เรือดำ: โค้ทยาวดำซับในแดง ปกตั้ง ผ้าปิดตา หนวดเคราเทา แผลเป็น หมวกปีกงอนขอบทอง ขนนกดำ · แขนซ้ายกลไกมีแกนดาวเรืองฟ้า · มือขวาวางบนด้ามดาบ ---------- */
function grifV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.2)*.4,wd=Math.sin(t*2.3),wd2=Math.sin(t*2.9+1);NPK.sh(x,y+16,15);g.save();g.translate(x,y);g.scale(f*1.36,1.36);g.lineJoin='round';g.lineCap='round';
  const hy=-16.8+br*.4;
  /* ผมเทายาวประบ่าด้านหลัง */
  P([-3.6,hy-2,-7.2,hy+1,-7.8+wd*.3,hy+6.6,-5,hy+5.8,-3,hy+3],LG(0,hy-2,0,hy+7,['#9a96a4','#5a5664']),O,.5);
  /* ชายโค้ทยาวพลิ้ว (ซับในแดง) */
  P([-6.8,-2,-9.8-wd*.8,14.4,-4,12.8,0,10,4,12.8,9.4-wd2*.5,14.4,6.8,-2],LG(0,-2,0,14,['#2c2834','#121018']),O,.8);
  P([-6.6,0,-9-wd*.8,13.8,-7.6-wd*.8,14,-5.6,1],'#8a1e26',null);P([6.6,0,8.6-wd2*.5,13.8,7.2-wd2*.5,14,5.6,1],'#8a1e26',null);
  NP3.legs('#2e2a30',['#4a3424','#140e0a'],6);
  for(const s of[-1,1])R(s*2.6-2.4,10.4,4.8,1.4,.5,'#5a4026',O);
  /* ฝักดาบด้านหลังสะโพกขวา */
  g.save();g.translate(6.2,3);g.rotate(-.55);R(-.8,0,1.6,12,.7,LG(0,0,0,12,['#3a2a20','#1a120c']),O);R(-.9,10.6,1.8,1.6,.5,'#c8a050',O);g.restore();
  /* ตัวโค้ท + กั๊กแดงเลือดหมู */
  P([-6.4,-10.6+br*.3,6.4,-10.6+br*.3,7.6,7,3,8,-3,8,-7.6,7],LG(-6,-10,6,8,['#3c3846','#26222e','#121018']),O,.9);
  P([-2.6,-10.2+br*.3,2.6,-10.2+br*.3,2.2,6.4,-2.2,6.4],LG(0,-10,0,6,['#a8242c','#5a1016']),O,.5);
  for(let k=0;k<3;k++)E(0,-5.4+k*3.2,.55,.55,'#e8c060',O,.25);
  g.strokeStyle='#c89a40';g.lineWidth=.6;g.beginPath();g.moveTo(-2.8,-10+br*.3);g.lineTo(-3.4,7.4);g.moveTo(2.8,-10+br*.3);g.lineTo(3.4,7.4);g.stroke();
  /* ผ้าผูกคอ + เข็มกลัดดาวเงิน */
  P([-2.2,-10.4+br*.3,0,-7+br*.3,2.2,-10.4+br*.3,1.2,-4.6,0,-3.8,-1.2,-4.6],LG(0,-10,0,-4,['#ece6da','#bab2a4']),O,.4);lumStar9(0,-7.6+br*.3,1.2,'#e8ecf2',O,0);
  /* เข็มขัด + หัวเข็มขัดเงิน */
  R(-7.4,1.6+br*.2,14.8,2.4,.6,'#1c1612',O);R(-1.7,1.4+br*.2,3.4,2.8,.5,LG(0,1.4,0,4.2,['#f0f2f6','#8a929e']),O);
  /* ปกตั้งสูง (ซับในแดง) */
  for(const s of[-1,1]){P([s*3,-10.6+br*.3,s*7.6,-16.4+br*.3,s*7.2,-10.4+br*.3,s*5.6,-9+br*.3],LG(0,-16,0,-9,['#3c3846','#1a1620']),O,.6);P([s*3.6,-10.4+br*.3,s*6.8,-15+br*.3,s*6.6,-10.6+br*.3],'#7a1a22',null)}
  /* อินทรธนูทองหมอง */
  for(const s of[-1,1]){P([s*3.6,-10.8+br*.3,s*7.8,-10.2+br*.3,s*8,-8.4+br*.3,s*3.6,-8.8+br*.3],LG(0,-11,0,-8,['#d8b060','#8a6424']),O,.5);g.strokeStyle='#d8b060';g.lineWidth=.4;for(let k=0;k<4;k++){g.beginPath();g.moveTo(s*(4.6+k*1.1),-8.6+br*.3);g.lineTo(s*(4.8+k*1.1),-7+br*.3);g.stroke()}}
  /* แขนซ้ายกลไก: เกราะเหล็กเป็นปล้อง + แกนดาวเรืองฟ้าที่ข้อศอก + กรงเล็บ */
  {const sx=-6.4,sy=-8.8+br*.3,ex=-9,ey=-3.2+br*.2,hx=-7.8,hyy=2.2,pu=.55+.35*Math.sin(t*2.6),ST=LG(-10,-9,-6,2,['#c8d0dc','#7a8494','#4a5262']);
    g.save();g.lineCap='round';g.strokeStyle=O;g.lineWidth=4.2;g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.lineTo(hx,hyy);g.stroke();g.strokeStyle=ST;g.lineWidth=3.2;g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.lineTo(hx,hyy);g.stroke();
    g.strokeStyle='rgba(30,34,44,.7)';g.lineWidth=.4;for(const q of[.35,.7]){g.beginPath();g.moveTo(sx+(ex-sx)*q-1.4,sy+(ey-sy)*q);g.lineTo(sx+(ex-sx)*q+1.4,sy+(ey-sy)*q+.5);g.stroke();g.beginPath();g.moveTo(ex+(hx-ex)*q-1.3,ey+(hyy-ey)*q);g.lineTo(ex+(hx-ex)*q+1.3,ey+(hyy-ey)*q-.2);g.stroke()}g.restore();
    g.strokeStyle='rgba(120,190,255,'+(.5+.4*pu)+')';g.lineWidth=.5;g.beginPath();g.moveTo(sx-.6,sy+1.4);g.lineTo(ex+.4,ey-1.2);g.stroke();
    if(!LOWQ)glow(ex,ey,7,'140,190,255',.45*pu+.15);E(ex,ey,1.7,1.7,'#5a6272',O,.35);E(ex,ey,1,1,'rgba(210,236,255,'+(.7+.3*pu)+')',null);
    E(sx,sy,1.9,1.6,LG(0,sy-2,0,sy+2,['#d8b060','#8a6424']),O,.35);
    for(const a of[-.55,0,.55]){g.strokeStyle=O;g.lineWidth=1.1;g.beginPath();g.moveTo(hx,hyy);g.lineTo(hx+Math.sin(a)*1.9,hyy+2);g.stroke();g.strokeStyle='#a8b0bc';g.lineWidth=.6;g.beginPath();g.moveTo(hx,hyy);g.lineTo(hx+Math.sin(a)*1.9,hyy+2);g.stroke()}
    E(hx,hyy,1.3,1.1,'#7a8494',O,.35)}
  /* แขนขวาวางบนด้ามดาบ */
  NP3.arm(6,-8.8+br*.3,8.8,-3.4,7,1,'#3c3846','#d8b49a');
  R(5.6,-1.6,2.6,3,.8,LG(0,-1.6,0,1.4,['#ffe08a','#a8782a']),O);
  /* แขนเสื้อพับขอบทอง */
  g.strokeStyle='#c89a40';g.lineWidth=.7;g.beginPath();g.moveTo(7.2,-1.4);g.lineTo(9,-2.4);g.stroke();
  /* หน้า: ผ้าปิดตา แผลเป็น หนวดเคราเทา คิ้วขมวด */
  NP3.face(hy,['#ecc8ac','#c89c7e','#966a52'],{noEye:true,mouth:false});
  P([-4.2,hy+1.6,-3.8,hy+4.8,-.6,hy+6.4,2.6,hy+6.6,5.6,hy+4.8,6,hy+2.2,4.6,hy+3.6,2.4,hy+3.2,.4,hy+4,-2.4,hy+3.4],LG(0,hy+1,0,hy+7,['#a8a4b0','#6a6672']),O,.45);
  g.strokeStyle='rgba(50,30,24,.85)';g.lineWidth=.5;g.beginPath();g.moveTo(2,hy+3.9);g.lineTo(4.4,hy+3.7);g.stroke();
  g.fillStyle='#1c2430';g.fillRect(1.8,hy-.9,1.1,1.3);g.fillStyle='#5a5664';g.save();g.translate(2.4,hy-2.2);g.rotate(.18);g.fillRect(-1,-.35,2.2,.8);g.restore();
  E(5.2,hy-.2,1.6,1.4,'#0e0c10',O,.35);g.strokeStyle='#0e0c10';g.lineWidth=.55;g.beginPath();g.moveTo(-5,hy-3.4);g.lineTo(6.4,hy-1.2);g.stroke();
  g.strokeStyle='rgba(150,60,50,.8)';g.lineWidth=.45;g.beginPath();g.moveTo(3.4,hy+.6);g.lineTo(2.2,hy+3);g.stroke();
  /* หมวกปีกงอนดำ ขอบทอง ตราดาวเงิน ขนนกดำ */
  {const hb=hy-4.6;g.save();g.translate(4,hb-3.6);g.rotate(.9+wd*.06);P([0,0,3,-2.4,9,-3.4+wd2*.5,5.4,-.6,1,1],LG(0,-3,9,0,['#1a1820','#3a3644']),O,.45);g.strokeStyle='rgba(120,110,150,.6)';g.lineWidth=.3;g.beginPath();g.moveTo(.4,.2);g.lineTo(8,-2.8+wd2*.4);g.stroke();g.restore();
    P([-9,hb+.8,-6,hb-5.8,.4,hb-8,6.6,hb-5.8,9.4,hb+.6,4.6,hb-1.2,.4,hb+.9,-4.2,hb-1],LG(0,hb-8,0,hb+1,['#2a2632','#0e0c12']),O,.8);
    g.strokeStyle='#d8b060';g.lineWidth=.7;g.beginPath();g.moveTo(-9,hb+.8);g.lineTo(-4.2,hb-1);g.lineTo(.4,hb+.9);g.lineTo(4.6,hb-1.2);g.lineTo(9.4,hb+.6);g.stroke();
    if(!LOWQ)glow(.4,hb-4,4,'200,220,255',.25);lumStar9(.4,hb-4,1.9,LG(0,hb-6,0,hb-2,['#ffffff','#a8b0c0']),O,0)}
  g.restore()}
/* ---------- ลูกเรือเรือดำ 2 แบบ: 0 เสื้อลายขวางดำเทา ผ้าโพกแดง แบกขดเชือก · 1 กั๊กดำ หมวกไหมพรม ถือตะเกียงพายุ ---------- */
function crewV(x,y,f,t,v){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.7+v*2)*.4;NPK.sh(x,y+16,12);g.save();g.translate(x,y);g.scale(f*1.16,1.16);g.lineJoin='round';g.lineCap='round';
  const hy=-15.6+br*.4;
  NP3.legs(v?'#3a3440':'#4a4250',['#3a2a20','#140e0a'],6);
  if(v===0){P([-5.6,-10+br*.3,5.6,-10+br*.3,6.4,6.4,-6.4,6.4],LG(0,-10,0,6,['#3a3844','#22202a']),O,.8);g.strokeStyle='rgba(200,196,210,.55)';g.lineWidth=1;for(let k=0;k<4;k++){const yy=-7.6+k*3.6+br*.2;g.beginPath();g.moveTo(-5.8,yy);g.lineTo(5.8,yy);g.stroke()}
    R(-6.2,3.6,12.4,2,.5,'#5a3a20',O);
    /* ขดเชือกบนบ่า */
    {const cx=-4.6,cy=-10+br*.3;g.strokeStyle='#b89458';g.lineWidth=1.3;for(let k=0;k<3;k++){g.beginPath();g.ellipse(cx,cy+k*.5,3.6-k*.5,2.4-k*.3,-.3,0,7);g.stroke()}g.strokeStyle='rgba(90,60,30,.6)';g.lineWidth=.4;g.beginPath();g.ellipse(cx,cy,3.6,2.4,-.3,0,7);g.stroke()}
    NP3.arm(-5.4,-8.4+br*.3,-7.6,-8,-5.6,-10.6,'#2c2a34','#e0b896');NP3.arm(5.4,-8.4+br*.3,7.4,-3,6,1.6,'#2c2a34','#e0b896');
    NP3.face(hy,['#ecc4a2','#cc9a78','#9a6a50'],{eye:'#1a1410',brow:'#3a2414'});
    g.strokeStyle='rgba(60,30,20,.6)';g.lineWidth=.6;g.beginPath();g.moveTo(1.6,hy+3.4);g.quadraticCurveTo(3.4,hy+4.6,5.2,hy+3.2);g.stroke();
    /* ผ้าโพกแดงชายปลิว */
    P([-5.6,hy-1,-5,hy-5.4,.6,hy-6.8,6,hy-4.6,6.2,hy-1.8,.6,hy-3.4],LG(0,hy-7,0,hy-1,['#e84a3a','#9a1e18']),O,.6);
    const wv=Math.sin(t*3+v);P([-5.2,hy-2.6,-9+wv,hy-1+wv*.4,-8.6+wv,hy+1.4,-5,hy-.6],'#c8302a',O,.45);
    g.fillStyle='rgba(255,220,200,.5)';g.beginPath();g.arc(-1,hy-4.6,.5,0,7);g.arc(2.6,hy-5,.5,0,7);g.fill()}
  else{P([-5.6,-10+br*.3,5.6,-10+br*.3,6.2,6.4,-6.2,6.4],LG(0,-10,0,6,['#d8d0c0','#a8a090']),O,.8);
    P([-5.6,-10+br*.3,-1.4,-10+br*.3,-1,6.4,-6.2,6.4],LG(0,-10,0,6,['#2a2630','#141218']),O,.6);P([5.6,-10+br*.3,1.4,-10+br*.3,1,6.4,6.2,6.4],LG(0,-10,0,6,['#2a2630','#141218']),O,.6);
    for(let k=0;k<3;k++)E(-1.8,-6+k*3.4,.5,.5,'#c8a050',O,.2);R(-6.2,3.6,12.4,2,.5,'#3a2618',O);
    NP3.arm(-5.4,-8.4+br*.3,-7.4,-3,-6,1.4,'#c8c0b0','#e0b896');
    /* ตะเกียงพายุ */
    {const lx=8.4,ly=-1+Math.sin(t*2)*.4;NP3.arm(5.4,-8.4+br*.3,8.4,-6,lx,ly-4.4,'#c8c0b0','#e0b896');g.strokeStyle='#3a2a1a';g.lineWidth=.5;g.beginPath();g.moveTo(lx,ly-4.2);g.lineTo(lx,ly-2.8);g.stroke();
      const fk=.75+.25*Math.sin(t*9)+.1*Math.sin(t*23);if(!LOWQ)glow(lx,ly,12,'255,190,110',.45*fk);R(lx-1.9,ly-3,3.8,1,.4,'#2a2018',O);R(lx-1.6,ly-2,3.2,4.2,.8,'rgba(255,214,140,'+(.7+.3*fk)+')',O);E(lx,ly,.8,1.2,'#fff6d0',null);R(lx-1.9,ly+2.2,3.8,1,.4,'#2a2018',O)}
    NP3.face(hy,['#e8bc98','#c4906c','#8e5e44'],{eye:'#1a1410',brow:'#2a1a10'});
    P([-4.2,hy+2.6,-3.4,hy+5.2,1.4,hy+6.2,5.6,hy+4.6,5.8,hy+2.4,3.6,hy+3.6,.4,hy+4,-2.2,hy+3],'#3a2818',O,.4);
    /* หมวกไหมพรม */
    P([-5.8,hy-.8,-5.2,hy-5.6,.6,hy-7.4,6,hy-5.4,6.4,hy-.6],LG(0,hy-7.4,0,hy,['#5a7aa8','#2e4468']),O,.6);R(-6.2,hy-1.8,12.8,2,.8,'#24365a',O);
    g.strokeStyle='rgba(20,30,60,.45)';g.lineWidth=.4;for(let k=0;k<4;k++){g.beginPath();g.moveTo(-3.6+k*2.6,hy-2);g.lineTo(-3.2+k*2.4,hy-6.2);g.stroke()}}
  g.restore()}
/* ---------- ติดตั้ง: แมพ 39 นาวิน/ทิล · กริฟ + ลูกเรือ · ลูมิน่า (lumD โกลบอล → แมพ 40/41/42 ทุกจุดที่เรียก) ---------- */
function npv9Install(){try{if(typeof NPC3==='undefined'||!NPC3[39]||!NPC3[40]||!NPC3[41]||!NPC3[42]||typeof npvW!=='function')return false;
  if(NPC3[39].d&&!NPC3[39].d.npv){NPC3[39].d=npvW((x,y,f,t)=>navinV(x,y,f,t),NPC3[39].d);NPC3[39].hy=Math.max(NPC3[39].hy||0,50)}
  if(typeof sfTil==='function'&&!sfTil.npv){const o=sfTil;sfTil=npvW((x,y,f,t)=>tilV(x,y,f,t,0),o)}
  if(typeof lumD==='function'&&!lumD.npv){const o=lumD;lumD=npvW((x,y,f,t)=>lumV(x,y,f,t),o);for(const k of[40,41])if(NPC3[k].d===o)NPC3[k].d=lumD}
  for(const k of[40,41,42])NPC3[k].hy=Math.max(NPC3[k].hy||0,52);
  if(typeof grifD==='function'&&!grifD.npv){const o=grifD;grifD=npvW((x,y,f,t)=>grifV(x,y,f,t),o)}
  if(typeof PALK!=='undefined'&&PALK.sggrif&&!PALK.sggrif.npv9){const o=PALK.sggrif,c0=npvW((x,y,f,t)=>crewV(x,y,f,t,0),null),c1=npvW((x,y,f,t)=>crewV(x,y,f,t,1),null);
    const W=function(tr,T){const N=MAPS[39]&&MAPS[39].npc2;if(!NPV.on||!N||N.x<0)return o.apply(this,arguments);
      try{c1(N.x-58,N.y+4,me.x<N.x-58?-1:1,T);grifD(N.x,N.y,me.x<N.x?-1:1,T);c0(N.x-34,N.y+16,me.x<N.x-34?-1:1,T);phLbl('กัปตันกริฟ · เรือดำ',N.x,N.y-50,'#d0c8e0')}catch(e){NPV.err='sggrif '+e;return o.apply(this,arguments)}};
    W.npv9=1;W.old=o;W.c0=c0;W.c1=c1;PALK.sggrif=W}
  NPV9.ok=1;return true}catch(e){NPV.err='install9 '+e;return false}}
{let k=0;const iv=setInterval(()=>{k++;if(npv9Install()||k>240)clearInterval(iv)},250)}
