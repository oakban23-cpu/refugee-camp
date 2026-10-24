/* ===== v516 NPC เนื้อเรื่องที่โผล่ตามเหตุการณ์ + ช่างหลอมออปชั่น วาดใหม่
   เซเลสต์ (celD) · ลอร์ดเฮเดรียน (PALK.mhed + ข้างยายเอดาแมพ 32) · เวสเปอร์ร่าง NPC (PALK.aves/hves → ใช้แบบบอส v505 ย่อลง) · ช่างหลอมออปชั่น (แมพ 19 npc2)
   ใช้ตัวห่อ npvW/NPV ของ v515 · error → วาดแบบเดิม ===== */
/* ---------- เซเลสต์ นักดาราศาสตร์หลวง: ผมเงินยาว แว่นข้างเดียว เสื้อคลุมครามปักกลุ่มดาว ปกตั้งขอบทอง ไม้เท้าโคมดาว ดาวเล็กลอยวน ---------- */
function celV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.3)*.4,sw=Math.sin(t*1.1);NPK.sh(x,y+16,15);g.save();g.translate(x,y);g.scale(f*1.44,1.44);g.lineJoin='round';g.lineCap='round';
  const hy=-16.2+br*.4;
  /* ดาวเล็กลอยวน */
  if(!LOWQ)for(let i=0;i<5;i++){const a=t*.7+i*1.257,px=Math.cos(a)*15,py=-12+Math.sin(a)*5-i*2,fr=Math.sin(a)>0;g.globalAlpha=fr?.95:.45;g.fillStyle=i%2?'#ffe9a0':'#cfe4ff';g.beginPath();for(let k=0;k<8;k++){const r=k%2?.45:1.3,aa=k*.785+t;g.lineTo(px+Math.cos(aa)*r,py+Math.sin(aa)*r)}g.closePath();g.fill()}g.globalAlpha=1;
  /* ผมเงินยาวด้านหลัง */
  P([-5.4,hy-2,-7.8,hy+6,-8.6+sw*.5,hy+17,-5.6+sw*.4,hy+19,-3,hy+12,-2.4,hy+2],LG(0,hy-3,0,hy+19,['#ffffff','#d6daea','#a4a8c4']),O,.7);
  /* ไม้เท้าโคมดาว */
  {const sx=-9.6;g.strokeStyle=O;g.lineWidth=2.2;g.beginPath();g.moveTo(sx+.6,15);g.lineTo(sx,-24);g.stroke();g.strokeStyle=LG(0,-24,0,15,['#ffe08a','#b07a1e']);g.lineWidth=1.3;g.beginPath();g.moveTo(sx+.6,15);g.lineTo(sx,-24);g.stroke();
    const ly=-28+Math.sin(t*1.6)*.6;if(!LOWQ)glow(sx,ly,12,'170,220,255',.55+.2*Math.sin(t*2.4));g.strokeStyle='#c8902a';g.lineWidth=.6;g.beginPath();g.arc(sx,ly,4.6,0,7);g.stroke();
    g.fillStyle='#eaf6ff';g.beginPath();for(let k=0;k<10;k++){const r=k%2?1.2:3,aa=k*.628-1.57+t*.6;g.lineTo(sx+Math.cos(aa)*r,ly+Math.sin(aa)*r)}g.closePath();g.fill();g.strokeStyle='#7ab0e8';g.lineWidth=.35;g.stroke();
    for(let k=0;k<3;k++){const aa=t*1.5+k*2.09;E(sx+Math.cos(aa)*4.6,ly+Math.sin(aa)*4.6,.7,.7,'#ffe08a',O,.25)}}
  /* เสื้อคลุมยาวครามปักกลุ่มดาว */
  P([-6,-10.6+br*.3,6,-10.6+br*.3,9+sw*.5,14,4,15.4,-4,15.4,-9.4-sw*.5,14],LG(-6,-10,6,15,['#3a4a9a','#24306a','#141a40']),O,.9);
  g.strokeStyle='rgba(220,230,255,.75)';g.lineWidth=.35;g.beginPath();g.moveTo(-6.6,4);g.lineTo(-4.4,7.4);g.lineTo(-6.8,10.6);g.lineTo(-3.6,12.6);g.moveTo(4,2);g.lineTo(6.4,5.6);g.lineTo(5,9.6);g.stroke();
  for(const[a,b]of[[-6.6,4],[-4.4,7.4],[-6.8,10.6],[-3.6,12.6],[4,2],[6.4,5.6],[5,9.6]])E(a,b,.55,.55,'#eaf0ff');
  P([-2.6,-10+br*.3,2.6,-10+br*.3,3,15,-3,15],LG(0,-10,0,15,['#5a6ab8','#323e84']),O,.5);g.strokeStyle='#e8c060';g.lineWidth=.5;g.beginPath();g.moveTo(-2.4,-9);g.lineTo(-2.8,14.6);g.moveTo(2.4,-9);g.lineTo(2.8,14.6);g.stroke();
  R(-6.4,-3.2+br*.2,12.8,1.8,.6,LG(0,-3,0,-1,['#ffe08a','#b07a1e']),O);E(0,-2.3+br*.2,1.3,1.3,'#9ad8ff',O,.35);
  /* ปกตั้งขอบทอง */
  P([-6.4,-10.8+br*.3,-4.4,-15+br*.3,-1.6,-10.4+br*.3],LG(0,-15,0,-10,['#4a5aaa','#24306a']),O,.5);P([6.4,-10.8+br*.3,4.4,-15+br*.3,1.6,-10.4+br*.3],LG(0,-15,0,-10,['#4a5aaa','#24306a']),O,.5);g.strokeStyle='#e8c060';g.lineWidth=.45;g.beginPath();g.moveTo(-6.2,-10.9+br*.3);g.lineTo(-4.4,-14.6+br*.3);g.moveTo(6.2,-10.9+br*.3);g.lineTo(4.4,-14.6+br*.3);g.stroke();
  /* แขน: ซ้ายจับไม้เท้า · ขวาชี้ฟ้า/ถือแผนที่ดาว */
  NP3.arm(-5.6,-8.4+br*.3,-8.6,-6,-9.4,-3.6,'#2e3a80','#f2dcc8');
  {const up=Math.max(0,Math.sin(t*.6))*1;NP3.arm(5.6,-8.4+br*.3,8.4,-6,6.6+up,-1.8-up*5,'#2e3a80','#f2dcc8');g.save();g.translate(6.8+up,-1.4-up*5);g.rotate(-.3);R(-.8,-1.2,6.4,3.4,.6,LG(0,-1,0,2,['#fff6dc','#d8c8a0']),O);g.fillStyle='#3a5aa0';for(const[a,b]of[[1,0],[2.6,1],[4,-.2]])g.fillRect(a,b,.5,.5);g.restore()}
  /* หน้า + แว่นข้างเดียว */
  NP3.face(hy,['#f8e2d2','#e8c2aa','#c09a86'],{eye:'#3a4a8a',brow:'#c8ccd8'});
  g.strokeStyle='#e8c060';g.lineWidth=.45;g.beginPath();g.arc(5.3,hy-.2,1.6,0,7);g.stroke();g.beginPath();g.moveTo(6.8,hy+.4);g.quadraticCurveTo(7.6,hy+4,6.4,hy+7);g.stroke();
  g.fillStyle='rgba(200,230,255,.35)';g.beginPath();g.arc(5.3,hy-.2,1.4,0,7);g.fill();
  /* ผมเงินด้านหน้า + มงกุฎดาวเล็ก */
  g.beginPath();g.moveTo(-5.8,hy+4);g.quadraticCurveTo(-7.2,hy-6.8,.6,hy-7);g.quadraticCurveTo(7,hy-6.8,6.8,hy-1.4);g.quadraticCurveTo(5,hy-4.2,2.6,hy-3.6);g.quadraticCurveTo(-1.6,hy-3.2,-3.6,hy+4.4);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+4,['#ffffff','#dfe2ee','#a8acc6']);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();
  R(-4.8,hy-6.6,10.6,1.2,.5,'#e8c060',O);g.fillStyle='#fff0a0';g.beginPath();for(let k=0;k<10;k++){const r=k%2?.6:1.6,aa=k*.628-1.57;g.lineTo(.6+Math.cos(aa)*r,hy-7.4+Math.sin(aa)*r)}g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=.3;g.stroke();if(!LOWQ)glow(.6,hy-7.4,5,'255,240,170',.45);
  g.restore()}

/* ---------- ลอร์ดเฮเดรียน สภาเก่า: ร่างสูง ผมเทาเสย หนวดบาง แว่นข้างเดียว หมวกทรงสูงคาดทอง โค้ทหางยาวน้ำเงินปักทอง สายสะพายสภา ไม้เท้าหัวทอง ---------- */
function hedV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.1)*.35,sw=Math.sin(t*1.3);NPK.sh(x,y+16,14);g.save();g.translate(x,y);g.scale(f*1.34,1.34);g.lineJoin='round';g.lineCap='round';
  const hy=-17.4+br*.4;
  /* หางโค้ทด้านหลัง */
  P([-5.6,0,-8.4-sw*.4,13,-4.6,12,-1.4,4,1.4,4,4.6,12,8.4+sw*.4,13,5.6,0],LG(0,0,0,13,['#22306a','#121a3e']),O,.7);
  NP3.legs('#2a2a34',['#3a3a44','#141418'],4);
  /* ไม้เท้าหัวทอง */
  {const cx=9.4;g.strokeStyle=O;g.lineWidth=2;g.beginPath();g.moveTo(cx+1.2,15);g.lineTo(cx,-3);g.stroke();g.strokeStyle=LG(0,-3,0,15,['#3a2a1e','#1a120c']);g.lineWidth=1.1;g.beginPath();g.moveTo(cx+1.2,15);g.lineTo(cx,-3);g.stroke();E(cx,-3.6,1.7,1.7,LG(0,-5.3,0,-1.9,['#fff0a0','#c8902a']),O,.45)}
  /* โค้ทหน้า + เสื้อกั๊ก + สายสะพาย */
  P([-6,-11.2+br*.3,6,-11.2+br*.3,6.8,4,4,6,-4,6,-6.8,4],LG(-6,-11,6,6,['#34488e','#22306a','#141e44']),O,.9);
  P([-2.6,-10.8+br*.3,2.6,-10.8+br*.3,2.4,4.4,0,5.6,-2.4,4.4],LG(0,-11,0,5,['#8a2a2a','#5a1a1a']),O,.5);for(let k=0;k<3;k++)E(0,-6+k*3.2,.5,.5,'#ffd860',O,.2);
  g.strokeStyle='#e8c060';g.lineWidth=.45;for(const s of[-1,1]){g.beginPath();g.moveTo(s*2.8,-10.6+br*.3);g.quadraticCurveTo(s*3.6,-2,s*4.2,5.4);g.stroke()}
  P([-6,-9.6+br*.3,-4,-11+br*.3,6.4,2.6,4.6,4.2],LG(-6,-10,6,4,['#ffe08a','#c8902a']),O,.5);E(1.4,-2.4,1.5,1.5,LG(0,-4,0,-1,['#9ad8ff','#3a6ab0']),O,.4);
  /* ผ้าผูกคอขาวมีเข็มกลัดอัญมณี */
  P([-2.4,-11.6+br*.3,2.4,-11.6+br*.3,1.6,-8+br*.3,0,-6.8+br*.3,-1.6,-8+br*.3],LG(0,-12,0,-7,['#ffffff','#d8d4cc']),O,.45);E(0,-9.2+br*.3,.8,.8,'#e04a6a',O,.25);
  /* แขน: ซ้ายไพล่หลัง · ขวาวางบนไม้เท้า (ถุงมือขาว) */
  NP3.arm(-5.6,-9+br*.3,-8,-5,-6.4,-1.4,'#22306a','#f4f2ec');
  NP3.arm(5.6,-9+br*.3,8.6,-6.6,9,-3.4,'#22306a','#f4f2ec');
  /* หน้า (เงยคางเล็กน้อย): แว่นข้างเดียว หนวดบาง คิ้วสูง */
  NP3.face(hy,['#f2d8c4','#ddb69c','#b08a74'],{eye:'#2a2a3a',mouth:false});
  g.fillStyle='#b8bcc8';g.fillRect(1.8,hy-2.8,2,.6);g.fillRect(4.5,hy-3,2,.6);
  g.strokeStyle='#e8c060';g.lineWidth=.45;g.beginPath();g.arc(5.2,hy-.2,1.5,0,7);g.stroke();g.beginPath();g.moveTo(6.6,hy+.4);g.quadraticCurveTo(7.2,hy+3.6,5.8,hy+6.4);g.stroke();
  P([2,hy+2,3.8,hy+1.6,5.6,hy+2,7,hy+3,5.4,hy+2.6,3.8,hy+2.3,2.2,hy+2.8],'#c8ccd8',O,.3);
  g.strokeStyle='rgba(70,40,30,.6)';g.lineWidth=.4;g.beginPath();g.moveTo(3,hy+3.6);g.lineTo(5,hy+3.5);g.stroke();
  /* ผมเทาเสย + จอน */
  g.beginPath();g.moveTo(-5.6,hy+3);g.quadraticCurveTo(-6.4,hy-5.2,.8,hy-5.6);g.quadraticCurveTo(6.4,hy-5.6,6.6,hy-2.4);g.quadraticCurveTo(3,hy-4,0,hy-3.6);g.quadraticCurveTo(-3.2,hy-3.2,-3.6,hy+3.4);g.closePath();g.fillStyle=LG(0,hy-6,0,hy+3,['#e8eaf0','#a8acb8','#787c88']);g.fill();g.strokeStyle=O;g.lineWidth=.6;g.stroke();
  /* หมวกทรงสูงคาดทอง */
  {const hb=hy-4.8;R(-6.6,hb-.6,14.2,1.8,.8,LG(0,hb-1,0,hb+1,['#2a2a36','#0e0e14']),O);P([-4.4,hb-.4,-4.8,hb-10.4,6.2,hb-10.4,5.8,hb-.4],LG(-4,0,6,0,['#2a2a36','#3a3a4a','#121218']),O,.7);R(-4.6,hb-3.4,10.6,1.6,.3,'#e8c060',O);E(.6,hb-2.6,.7,.7,'#9ad8ff',O,.2)}
  g.restore()}

/* ---------- ช่างหลอมออปชั่น (ป้อมใต้เมฆ แมพ 19): แว่นหลอมคาดหัว ผมม่วงมัด ผ้ากันเปื้อนหนัง แขนเสื้อพับ คีมคีบผลึกรูนเรือง เบ้าหลอมวงอักขระ ---------- */
function optV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.5)*.4,pu=.5+.5*Math.sin(t*3.2);
  /* เบ้าหลอม + วงอักขระ (ข้างตัว ไม่กลับด้าน) */
  {g.save();g.translate(x+f*22,y+8);g.lineJoin='round';const s=1.25;g.scale(s,s);
    if(!LOWQ){g.save();g.scale(1,.32);g.strokeStyle='rgba(170,140,255,'+(.45+.35*pu)+')';g.lineWidth=1.2;g.beginPath();g.arc(0,8,13,0,7);g.stroke();g.setLineDash([2,2]);g.lineDashOffset=-t*6;g.beginPath();g.arc(0,8,10,0,7);g.stroke();g.setLineDash([]);g.restore()}
    for(const s2 of[-1,1]){g.strokeStyle='#3a3040';g.lineWidth=1.4;g.beginPath();g.moveTo(s2*5,2);g.lineTo(s2*7,6);g.stroke()}
    P([-7,-4,7,-4,5.6,3,-5.6,3],LG(0,-4,0,3,['#6a6478','#2a2634']),O,.7);E(0,-4,7,2,LG(0,-6,0,-2,['#b8a0ff','#6a48d8']),O,.6);
    if(!LOWQ){glow(0,-5,10,'180,150,255',.45+.3*pu);for(let i=0;i<4;i++){const q=(t*.8+i/4)%1;g.fillStyle='rgba(200,180,255,'+(1-q)+')';g.font='bold 3px system-ui';g.textAlign='center';g.fillText('ᚱᚢᚾᛖ'[i],Math.sin(i*2+t)*4,-6-q*12)}}
    g.restore()}
  NPK.sh(x,y+16,13);g.save();g.translate(x,y);g.scale(f*1.28,1.28);g.lineJoin='round';g.lineCap='round';
  const hy=-15.6+br*.4;
  /* ผมม่วงมัดหางด้านหลัง */
  P([-5,hy-3,-8.6,hy-1,-10+Math.sin(t*1.6),hy+5,-7,hy+4,-4.6,hy+1],LG(0,hy-3,0,hy+5,['#b090e0','#6a48a8']),O,.6);
  NP3.legs('#3a3448',['#5a4a3a','#2a2018']);
  /* เสื้อ + ผ้ากันเปื้อนหนัง + เข็มขัดเครื่องมือ */
  NP3.coat(['#6a7aa0','#4a587e','#2e3858'],br);
  P([-4.6,-7.4+br*.25,4.6,-7.4+br*.25,5.4,10.4,-5.4,10.4],LG(0,-7,0,10,['#a07040','#7a5030','#4a2e18']),O,.7);
  g.strokeStyle='rgba(255,220,180,.35)';g.lineWidth=.35;g.setLineDash([.7,.6]);g.beginPath();g.moveTo(-4.2,-6.6);g.lineTo(-4.9,9.8);g.moveTo(4.2,-6.6);g.lineTo(4.9,9.8);g.stroke();g.setLineDash([]);
  R(-1.8,2,3.6,3,.6,LG(0,2,0,5,['#8a6440','#5a3a20']),O);E(0,3.4,.8,.8,'#c8a0ff',O,.25);
  R(-6.6,-.6,13.2,1.8,.6,'#3a2414',O);for(const[bx,c]of[[-5,'#9ad8ff'],[4.4,'#c8a0ff']]){R(bx-.9,-3.4,1.8,3,.5,c,O)}
  /* แขน: ซ้ายถือค้อนเล็ก · ขวาคีมคีบผลึกรูน */
  NP3.arm(-5.4,-8+br*.3,-8,-4,-7,-.4,'#e8dcc8','#f0c8a8');g.save();g.translate(-7,-.4);g.rotate(.3);R(-.5,-1,1,8,.4,'#6a4424',O);R(-2.6,6,5.2,2.6,.6,LG(0,6,0,8.6,['#b8bcc8','#5a606e']),O);g.restore();
  {const hx=7.4,hyy=-5.4+Math.sin(t*1.7)*.6;NP3.arm(5.4,-8+br*.3,8.6,-7.6,hx,hyy,'#e8dcc8','#f0c8a8');g.strokeStyle='#4a4a54';g.lineWidth=.7;g.beginPath();g.moveTo(hx,hyy);g.lineTo(hx+4.6,hyy-3.2);g.moveTo(hx+.4,hyy+.6);g.lineTo(hx+5.2,hyy-2.4);g.stroke();
    const cx=hx+6.2,cy=hyy-3.6;if(!LOWQ)glow(cx,cy,8,'160,200,255',.55+.3*pu);P([cx,cy-2.6,cx+1.6,cy,cx,cy+2.2,cx-1.6,cy],LG(0,cy-2.6,0,cy+2.2,['#ffffff','#a8d8ff','#6a7ae8']),O,.4);g.fillStyle='rgba(255,255,255,.7)';g.fillRect(cx-.4,cy-1.6,.6,1)}
  /* หน้า */
  NP3.face(hy,['#f6d6b8','#e6b490','#bc8a6a'],{eye:'#4a2a6a',brow:'#6a48a8'});g.fillStyle='rgba(255,140,120,.35)';g.beginPath();g.arc(5.4,hy+2,.9,0,7);g.fill();
  g.fillStyle='rgba(60,50,60,.35)';g.beginPath();g.arc(1.6,hy+2.4,.7,0,7);g.fill();
  /* ผมม่วงด้านหน้า */
  g.beginPath();g.moveTo(-5.4,hy+2.6);g.quadraticCurveTo(-6.6,hy-6.6,.6,hy-6.8);g.quadraticCurveTo(6.8,hy-6.6,6.6,hy-1.6);g.lineTo(5.2,hy-3.4);g.lineTo(3.6,hy-2.4);g.lineTo(2.6,hy-3.8);g.quadraticCurveTo(-2,hy-3.4,-3.4,hy+2.8);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+3,['#c8a8f0','#8a64c8','#5a3a90']);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();
  /* แว่นหลอมคาดหัว */
  R(-5.8,hy-5.4,12.6,1.4,.5,'#3a2a24');for(const ex of[.8,4.4])E(ex,hy-4.8,2,1.7,LG(0,hy-6.5,0,hy-3,['#ffe0a0','#e07a2a']),O,.5);g.fillStyle='rgba(255,255,255,.85)';g.fillRect(0,hy-5.7,.7,.5);g.fillRect(3.6,hy-5.7,.7,.5);
  g.restore()}

/* ---------- ต่อเข้าเกม ---------- */
function npvLbl(n,x,y,c){g.save();g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,10,24,.8)';g.strokeText(n,x,y);g.fillStyle=c;g.fillText(n,x,y);g.restore()}
function npv2Install(){try{
  if(typeof celD==='function'&&!celD.npv){const o=celD;const w=npvW((x,y,f,t)=>{celV(x,y,f,t);npvLbl('เซเลสต์ · นักดาราศาสตร์หลวง',x,y-58,'#d8e4ff')},(x,y,f,T)=>o(x,y,T,f));celD=function(x,y,T,f){return w(x,y,f,T)};celD.npv=1}
  if(typeof PALK!=='undefined'){
    if(PALK.mhed&&!PALK.mhed.npv){const o=PALK.mhed;const W=function(t,T){const N=MAPS[31].npc2;if(!N||N.x<0)return;const f=me.x<N.x?-1:1;npvW((x,y,ff,TT)=>{hedV(x,y,ff,TT);npvLbl(N.n,x,y-50,'#ffe0a0')},()=>o.call(PALK,t,T))(N.x,N.y,f,T)};W.npv=1;PALK.mhed=W}
    if(PALK.aves&&!PALK.aves.npv){const o=PALK.aves;const W=function(t,T){const N=MAPS[32].npc2;if(!N||N.x<0)return;const f=me.x<N.x?-1:1;npvW((x,y,ff,TT)=>{vesNpcV(x,y,ff,TT);npvLbl(N.n,x,y-92,'#e0d0ff')},()=>o.call(PALK,t,T))(N.x,N.y,f,T)};W.npv=1;PALK.aves=W}}
  if(typeof drawFortNpc==='function'&&!drawFortNpc.npv){const o=drawFortNpc;drawFortNpc=function(){if(!NPV.on||curMap!==19)return o.apply(this,arguments);const N=MAPS[19].npc2;if(!N)return o.apply(this,arguments);const ox=N.x,oy=N.y;N.x=-9999;N.y=-9999;try{o.apply(this,arguments)}finally{N.x=ox;N.y=oy}
      if(!inView(N.x,N.y,90))return;const t=performance.now()/1000,f=me.x<N.x?-1:1;let ok=0;g.save();try{optV(N.x,N.y,f,t);ok=1;NPV.n++}catch(e){NPV.err=String(e&&e.stack||e).slice(0,300)}finally{g.restore()}
      if(!ok){if(!npcModel({k:'msm',x:N.x,y:N.y},t,f))campFolk(N.x,N.y,{c:'#3a2e4a',sh:'#c8b0ff',hair:'#d8d8e8',hat:'#5a3a8a',f,s:1.15},t)}
      const hy=ok?46:(NPCM.msm?NPCM.msm.ly:36);g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(0,0,0,.65)';g.strokeText(N.n,N.x,N.y-hy);g.fillStyle='#ffe0a0';g.fillText(N.n,N.x,N.y-hy);
      npcSay('f19o',N.x,N.y,['ออปชั่นไม่ถูกใจ? เอามาหลอมใหม่ได้','ล็อกค่าที่ชอบไว้ แล้วสุ่มที่เหลือ','ผลึกรูนใต้เมฆช่วยให้หลอมนิ่งขึ้น'],200,ok?54:50)};drawFortNpc.npv=1}
  return true}catch(e){NPV.err='install2 '+e;return false}}
/* เวสเปอร์ร่าง NPC: ใช้แบบบอส (BV1 v505) ย่อลง ท่ายืนนิ่ง */
function vesNpcV(x,y,f,T){const fn=BV1['เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา'];if(!fn)throw new Error('no ves');const r0=MPC.rich,o0=V1.O;MPC.rich=0;V1.O=BV.O;g.save();try{g.translate(x,y+16);g.scale(f*.5,.5);g.translate(0,-30);fn(T,0,Math.sin(T*1.4)*1.6,0,0,0)}finally{g.restore();MPC.rich=r0;V1.O=o0}}
/* ลอร์ดเฮเดรียนข้างยายเอดา (แมพ 32 · เลือกเปิดใจ) ใช้แบบใหม่ด้วย */
{const iv=setInterval(()=>{if(typeof NPC3!=='undefined'&&NPC3[32]&&NPC3[32].d&&NPC3[32].d.npv&&typeof PALK!=='undefined'&&PALK.aves){clearInterval(iv);npv2Install();
  const edaL2=(x,y,f,t)=>{tilV(x-f*26,y+6,f,t,0,1.02);edaV(x,y,f,t,'lamp');try{if(me.sty&&me.sty.p6h===2)hedV(x+f*36,y-8,f,t)}catch(e){}};
  for(const k of[32,33]){const o=NPC3[k].d.old;NPC3[k].d=npvW(edaL2,o)}}},120);setTimeout(()=>clearInterval(iv),20000)}
