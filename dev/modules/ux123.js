/* ===== v515 NPC เนื้อเรื่องภาค 6–8 วาดใหม่ — ลิเรีย · ทิล · ยายเอดา · บรอม · นาวิน · ออร์รี · กัปตันซารา
   ใช้ชุดเครื่องมือเดียวกับ NPC ยุคแรก (NPK/NP3) ให้ขนาด/ลายเส้นเข้าชุดกับ NPC ในค่าย · ครอบ NPC3[แมพ].d / navinD
   error → วาดแบบเดิม (NPV.err) ===== */
const NPV={on:1,err:'',n:0};
/* ---------- ลิเรีย นางกำนัลของราชินี: ชุดยาวม่วงลาเวนเดอร์ ผ้ากันเปื้อนลูกไม้ ผมน้ำตาลแดงเปียยาว โบว์ ปิ่นดาว ตะกร้ากุหลาบ ร้องเพลงกล่อม ---------- */
function lirV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.5)*.4,sw=Math.sin(t*1.2);NPK.sh(x,y+16,14);g.save();g.translate(x,y);g.scale(f*1.3,1.3);g.lineJoin='round';g.lineCap='round';
  const hy=-15.6+br*.4;
  /* กลีบดอกไม้ลอย */
  if(!LOWQ)for(let i=0;i<4;i++){const q=(t*.22+i/4)%1,px=-14+((i*11)%26)+Math.sin(t*1.3+i)*4,py=10-q*40;g.globalAlpha=Math.sin(q*Math.PI)*.85;g.save();g.translate(px,py);g.rotate(t*2+i);E(0,0,1.5,.8,i%2?'#ffb8d0':'#fff0f6');g.restore()}g.globalAlpha=1;
  /* เปียยาวด้านหลัง */
  for(let i=0;i<5;i++){const by=hy+1+i*2.9,bx=-5.2-i*.35+Math.sin(t*1.4+i*.6)*.3*i;E(bx,by,1.9-i*.12,1.7,LG(0,by-2,0,by+2,['#e0a060','#a8602a']),O,.5)}
  E(-6.4+Math.sin(t*1.4+3)*.9,hy+15.6,1.2,1.4,'#f6e0ff',O,.45);
  /* ชุดยาว */
  NP3.robe(['#e4d6fa','#b49ce0','#6e58a2'],'#ffffff',br);
  g.strokeStyle='rgba(70,50,120,.35)';g.lineWidth=.5;for(const sx of[-3.6,0,3.6]){g.beginPath();g.moveTo(sx*.6,-2);g.quadraticCurveTo(sx*.9+sw*.3,6,sx*1.25+sw*.5,13.4);g.stroke()}
  /* ผ้ากันเปื้อนลูกไม้ */
  P([-3.4,-3.6+br*.2,3.4,-3.6+br*.2,4.6,11.2,-4.6,11.2],LG(0,-4,0,11,['#ffffff','#ece4f6']),O,.6);
  g.fillStyle='#ffffff';for(let i=0;i<5;i++){g.beginPath();g.arc(-3.7+i*1.85,11.4,1,0,Math.PI);g.fill()}g.strokeStyle=O;g.lineWidth=.35;for(let i=0;i<5;i++){g.beginPath();g.arc(-3.7+i*1.85,11.4,1,0,Math.PI);g.stroke()}
  g.strokeStyle='rgba(180,160,220,.6)';g.lineWidth=.4;g.beginPath();g.moveTo(-2.4,5);g.lineTo(2.4,5);g.stroke();
  /* สายคาดเอว + โบว์ */
  R(-5.6,-4+br*.25,11.2,1.6,.6,'#9a6ad0',O);P([-6.6,-4.6+br*.25,-9,-6+br*.25,-9,-1.6+br*.25,-6.6,-2.6+br*.25],'#b88ae8',O,.5);
  /* แขนเสื้อพอง + แขนอุ้มตะกร้า */
  for(const s of[-1,1])E(s*5.6,-8.6+br*.3,2.5,2.3,LG(0,-11,0,-6,['#f0e6ff','#b8a0e4']),O,.6);
  NP3.arm(-5.4,-7.6+br*.3,-6.4,-2.6,-2.6,-.4,'#c4b0ec','#f6d4b4');
  /* ตะกร้ากุหลาบ */
  {const bx=1.2,by=-1.2+br*.2;g.strokeStyle='#8a5a2a';g.lineWidth=.9;g.beginPath();g.arc(bx+2.8,by-1,4.2,Math.PI*1.05,Math.PI*1.95);g.stroke();
    for(const[rx,ry,c]of[[bx+.6,by-1.4,'#e0405a'],[bx+3,by-2.4,'#ff8ab0'],[bx+5.2,by-1.2,'#fff4f8'],[bx+1.8,by-.2,'#ff6a8a']]){E(rx,ry,1.6,1.4,c,O,.4);g.strokeStyle='rgba(120,20,40,.45)';g.lineWidth=.3;g.beginPath();g.arc(rx,ry,.7,0,5);g.stroke()}
    P([bx+6.6,by-1.8,bx+8.2,by-3.4,bx+7.6,by-1],'#5aa04a',O,.35);
    P([bx-1.4,by-.4,bx+7.4,by-.4,bx+6.4,by+3.6,bx-.4,by+3.6],LG(0,by,0,by+4,['#d8a060','#9a6a34']),O,.6);g.strokeStyle='rgba(90,50,20,.55)';g.lineWidth=.35;for(let i=0;i<4;i++){g.beginPath();g.moveTo(bx-.6+i*2,by);g.lineTo(bx+.2+i*2,by+3.4);g.stroke()}g.beginPath();g.moveTo(bx-1,by+1.6);g.lineTo(bx+7,by+1.6);g.stroke()}
  NP3.arm(5.4,-7.6+br*.3,6.4,-3,5.8,-.8,'#c4b0ec','#f6d4b4');
  /* คอปกลูกไม้ */
  for(let i=0;i<5;i++)E(-3.6+i*1.8,-9.6+br*.3,1.3,1.1,'#ffffff',O,.35);
  /* หน้า + ผม */
  NP3.face(hy,null,{eye:'#5a3a7a',brow:'#9a5a2a'});g.fillStyle='rgba(255,140,160,.4)';g.beginPath();g.arc(4.8,hy+1.9,1,0,7);g.fill();g.beginPath();g.arc(1.4,hy+2,.8,0,7);g.fill();
  if(Math.sin(t*.9)>.2){g.strokeStyle='rgba(90,30,30,.65)';g.lineWidth=.5;g.beginPath();g.ellipse(3.4,hy+2.8,.8,.6,0,0,7);g.stroke()}
  g.beginPath();g.moveTo(-5.6,hy+3);g.quadraticCurveTo(-7,hy-7,.6,hy-7.2);g.quadraticCurveTo(6.8,hy-7,6.6,hy-1.6);g.quadraticCurveTo(4.6,hy-4.6,2.4,hy-3.8);g.quadraticCurveTo(1.4,hy-2.6,.2,hy-4);g.quadraticCurveTo(-3,hy-3,-3.6,hy+3.4);g.closePath();g.fillStyle=LG(0,hy-8,0,hy+3,['#f0b070','#c8783a','#8a4a1e']);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();
  E(-3.6,hy-6.6,3,2.6,LG(0,hy-9,0,hy-4,['#f0b070','#a8602a']),O,.6);
  P([-6.4,hy-6.4,-4.8,hy-8.4,-3.2,hy-6.4,-4.8,hy-5],'#f6e0ff',O,.4);P([-3.2,hy-6.4,-1.6,hy-8.4,0,hy-6.4,-1.6,hy-5],'#e4ccff',O,.4);
  /* ปิ่นดาว */
  {const sx=3.2,sy=hy-6.4;g.fillStyle='#ffe07a';g.beginPath();for(let k=0;k<10;k++){const r=k%2?.8:2,a=k*.628-1.57;g.lineTo(sx+Math.cos(a)*r,sy+Math.sin(a)*r)}g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=.35;g.stroke();if(!LOWQ)glow(sx,sy,5,'255,230,150',.45+.2*Math.sin(t*3))}
  /* โน้ตเพลงกล่อม */
  if(!LOWQ&&(t%7)<4){const q=((t%7)/4);g.globalAlpha=Math.sin(q*Math.PI);g.fillStyle='#fff0ff';g.font='bold 6px system-ui';g.textAlign='center';g.fillText(q<.5?'♪':'♫',8+q*6,hy-6-q*12);g.globalAlpha=1}
  g.restore()}

/* ---------- ทิล เด็กจากค่าย: ผมยุ่ง แว่นนักบินคาดหัว ผ้าพันคอแดง เสื้อกั๊กปะ กางเกงขาสั้น เป้ใหญ่+ม้วนนอน+ดาบไม้ · comp = เข็มทิศดาว ---------- */
function tilV(x,y,f,t,comp,sc,sit){const{O,LG,P,E,R,glow}=NPK,S=sc||1.16,hop=comp||sit?0:Math.pow(Math.max(0,Math.sin(t*2.6)),3)*2.2,br=Math.sin(t*2.2)*.35;if(!sit)NPK.sh(x,y+16,12*S/1.16);g.save();g.translate(x,y-hop*S);g.scale(f*S,S);g.lineJoin='round';g.lineCap='round';
  const hy=-15+br*.4;
  /* เป้ใหญ่ + ม้วนนอน + ดาบไม้ */
  g.save();g.translate(-6.4,-4);g.rotate(.08);g.strokeStyle='#8a6a40';g.lineWidth=1.3;g.beginPath();g.moveTo(-1,-6);g.lineTo(4,-17);g.stroke();P([2.4,-15.6,5.6,-14,4.2,-12.6],'#c8a070',O,.4);R(.6,-12.8,4.4,1.3,.4,'#6a4424',O);
    R(-5,-8,8,13,2,LG(0,-8,0,5,['#a07040','#6a4424']),O);R(-4.4,-2,6.8,4.6,1.2,LG(0,-2,0,3,['#b88050','#7a5030']),O);E(-1,.2,.9,.9,'#e8c060',O,.3);
    E(-1,-9.4,4.8,2.2,LG(0,-11.6,0,-7.2,['#5a8a5a','#2e5a34']),O,.6);g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=.4;g.beginPath();g.moveTo(-4,-9.6);g.lineTo(2,-9.6);g.stroke();
    R(-5.6,-1,1.6,4,.6,'#c84a3a',O);g.restore();
  /* ขา + รองเท้า (นั่ง = ขาห้อยแกว่ง) */
  if(sit){for(let k=1;k>=0;k--){const sw=Math.sin(t*3.2+k*1.6)*1.8,kx=7.6+k*.8,ky=6.2+k*1.2;g.strokeStyle=O;g.lineWidth=3.6;g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+sw,ky+6);g.stroke();g.strokeStyle='#f0c49c';g.lineWidth=2.6;g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+sw,ky+6);g.stroke();E(kx+sw+.8,ky+7,2.2,1.4,LG(0,ky+5.6,0,ky+8.4,['#9a6234','#4a2e18']),O,.5)}
    P([-5,3.6,5,3.6,9.2,4.6,9.2,8.6,-5.4,8.6],LG(0,3,0,9,['#6a7a9a','#3e4a64']),O,.7)}
  else{for(const s of[-1,1]){R(s*2.4-1.4,8,2.8,5,1,'#f0c49c',O);R(s*2.4-1.6,11.2,3.2,1.6,.5,'#e8e0d0');R(s*2.4-2.1,12.2,4.4,3,1.2,LG(0,12,0,15,['#9a6234','#4a2e18']),O)}
  P([-5,3.6,5,3.6,5.4,9.4,.6,9.4,0,7.4,-.6,9.4,-5.4,9.4],LG(0,3,0,9.5,['#6a7a9a','#3e4a64']),O,.7)}
  /* เสื้อ + เสื้อกั๊กปะ */
  P([-5,-9.6+br*.3,5,-9.6+br*.3,5.6,4.4,-5.6,4.4],LG(0,-10,0,4,['#f6eedc','#d8c8a8']),O,.7);
  P([-5.2,-9.4+br*.3,-1.2,-9.4+br*.3,-.6,4.2,-5.8,4.2],LG(0,-10,0,4,['#c89a5a','#8a6232']),O,.6);P([1.2,-9.4+br*.3,5.2,-9.4+br*.3,5.8,4.2,.6,4.2],LG(0,-10,0,4,['#c89a5a','#8a6232']),O,.6);
  R(-4.6,-2.4,2.6,2.6,.3,'#6a8a5a',O);g.strokeStyle='rgba(255,240,200,.7)';g.lineWidth=.3;g.setLineDash([.6,.5]);g.strokeRect(-4.3,-2.1,2,2);g.setLineDash([]);
  R(2.2,1,2.4,2,.3,'#b84a3a',O);
  /* ผ้าพันคอแดง + ชายปลิว */
  {const wd=Math.sin(t*3.4);P([-4.6,-10.4+br*.3,4.6,-10.4+br*.3,4,-7.6+br*.3,-4,-7.6+br*.3],LG(0,-11,0,-7,['#ff6a5a','#c8302a']),O,.6);P([-2.6,-8.6,-6,-6.4+wd,-9.6,-7.4+wd*1.6,-8.6,-4.6+wd*1.4,-3.6,-6.6],LG(-9,-7,-3,-7,['#d8402e','#ff6a5a']),O,.5)}
  /* แขน */
  if(comp){NP3.arm(-5,-8+br*.3,-4.6,-3,-.6,-2.4,'#f6eedc','#f0c49c');NP3.arm(5,-8+br*.3,6.4,-3.4,3.4,-2.8,'#f6eedc','#f0c49c');
    const cx=1.6,cy=-3.4;if(!LOWQ)glow(cx,cy,10,'150,210,255',.55+.2*Math.sin(t*4));E(cx,cy,3.6,3.4,LG(0,cy-3.5,0,cy+3.5,['#ffe9a0','#c8902a','#8a5a1e']),O,.6);E(cx,cy,2.6,2.4,LG(0,cy-2.5,0,cy+2.5,['#1e2a4a','#3a5a9a']),O,.4);
    g.save();g.translate(cx,cy);g.rotate(Math.sin(t*2.3)*.8+Math.sin(t*7)*.12);P([0,-2.2,.6,0,0,2.2,-.6,0],'#9ae0ff');P([0,-2.2,.6,0,-.6,0],'#ffffff');g.restore();
    g.fillStyle='rgba(255,255,255,.85)';for(let k=0;k<4;k++){const a=k*1.57;g.fillRect(cx+Math.cos(a)*2-.2,cy+Math.sin(a)*2-.2,.4,.4)}
    if(!LOWQ)for(let i=0;i<3;i++){const q=(t*.6+i/3)%1;g.fillStyle='rgba(200,235,255,'+(1-q)+')';g.beginPath();g.arc(cx+Math.sin(i*2+t)*5*q,cy-q*10,.6,0,7);g.fill()}}
  else{const wv=Math.sin(t*5.2)*.5;NP3.arm(-5,-8+br*.3,-6.6,-3.6,-5.4,-.6,'#f6eedc','#f0c49c');NP3.arm(5,-8+br*.3,10.4+wv,-12,9.4+wv*2.4,-21.6,'#f6eedc','#f0c49c')}
  /* หัว: กระและยิ้มกว้าง */
  NP3.face(hy,['#f8d4aa','#eaae80','#c0845c'],{eye:'#2a1a10',brow:'#3a2414',mouth:false});
  g.strokeStyle='rgba(90,30,20,.8)';g.lineWidth=.6;g.beginPath();g.arc(3.4,hy+1.9,1.4,.15,Math.PI-.15);g.stroke();
  g.fillStyle='rgba(170,90,50,.55)';for(const[fx,fy]of[[1.2,hy+1],[1.9,hy+1.6],[5.4,hy+1],[6,hy+1.6]])g.fillRect(fx,fy,.5,.5);
  g.fillStyle='rgba(255,130,110,.35)';g.beginPath();g.arc(5.6,hy+2.2,.9,0,7);g.fill();
  g.beginPath();g.moveTo(-5.6,hy+2.4);g.lineTo(-7,hy-1);g.lineTo(-5.6,hy-3);g.lineTo(-6.6,hy-6);g.lineTo(-3.2,hy-6.4);g.lineTo(-2.4,hy-8.8);g.lineTo(.6,hy-7.4);g.lineTo(2.6,hy-9.2);g.lineTo(3.8,hy-6.8);g.lineTo(6.6,hy-7.6);g.lineTo(6.4,hy-4.4);g.lineTo(7.4,hy-2.8);g.lineTo(4.8,hy-3.4);g.lineTo(3.4,hy-2.2);g.lineTo(2.4,hy-3.6);g.lineTo(.2,hy-2.6);g.lineTo(-1,hy-3.8);g.lineTo(-3.4,hy-2.8);g.lineTo(-3.8,hy+2.8);g.closePath();g.fillStyle=LG(0,hy-9,0,hy+3,['#7a4a28','#4a2a14','#2a160a']);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();
  /* แว่นนักบินคาดหัว */
  R(-5.8,hy-5.4,12.6,1.3,.5,'#4a3424');for(const ex of[.6,4.2])E(ex,hy-4.8,1.9,1.6,LG(0,hy-6.4,0,hy-3.2,['#e8fbff','#7ac0e8']),O,.5);g.fillStyle='rgba(255,255,255,.85)';g.fillRect(-.2,hy-5.6,.7,.5);g.fillRect(3.4,hy-5.6,.7,.5);
  g.restore()}

/* ---------- ยายเอดา: หลังค่อมเล็กน้อย ผมขาวมวยปิ่นไม้ แว่นกลม ยิ้มตาปิด ผ้าคลุมไหล่ทอลาย กระโปรงยาวลายทอ ไม้เท้า · stall = แผงผ้าทอ · lamp = โคมนำทาง ---------- */
function edaV(x,y,f,t,mode){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.2)*.35,sw=Math.sin(t*1.1);
  if(mode==='stall'){/* แผงผ้าทอด้านหลัง (ไม่กลับด้าน) */g.save();g.translate(x+26,y);g.scale(1.3,1.3);g.lineJoin='round';
    NPK.sh(0,12,16);for(const px of[-10,10]){R(px-1,-30,2,44,.6,LG(0,-30,0,14,['#a07a4a','#5a3a1e']),O)}R(-12,-31,24,2.4,.8,LG(0,-31,0,-28,['#b88a5a','#6a4424']),O);
    [['#c84a3a','#e8b040'],['#2a8a8a','#f0e0c0'],['#6a3a9a','#e8c060'],['#e0a030','#a83a2a']].forEach(([a,c],i)=>{const fx=-9+i*4.8,s2=Math.sin(t*1.5+i)*.8,ln=22+(i%2)*6;P([fx,-28.6,fx+4,-28.6,fx+4+s2,-28.6+ln,fx+s2,-28.6+ln],LG(fx,0,fx+4,0,[a,a]),O,.45);g.strokeStyle=c;g.lineWidth=.6;for(let k=0;k<3;k++){const yy=-24+k*6+(i%2)*2;g.beginPath();g.moveTo(fx+s2*(yy+28)/ln,yy);g.lineTo(fx+1.3+s2*(yy+28)/ln,yy+1.4);g.lineTo(fx+2.6+s2*(yy+28)/ln,yy);g.lineTo(fx+4+s2*(yy+28)/ln,yy+1.4);g.stroke()}});
    P([-8,8,8,8,6.4,14,-6.4,14],LG(0,8,0,14,['#c89a5a','#8a6232']),O,.6);for(const[bx,c]of[[-4,'#e04a6a'],[0,'#4ab0c8'],[4,'#f0c040']])E(bx,7.4,2.4,2.2,c,O,.45);g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=.35;for(const bx of[-4,0,4]){g.beginPath();g.arc(bx,7.4,1.3,3.6,5.6);g.stroke()}
    g.restore()}
  NPK.sh(x,y+16,14);g.save();g.translate(x,y);g.scale(f*1.3,1.3);g.lineJoin='round';g.lineCap='round';
  const hy=-13.6+br*.4,hx=1.4;
  /* ไม้เท้า */
  {const cx=-7.6;g.strokeStyle=LG(0,-8,0,15,['#a87a4a','#5a3a1e']);g.lineWidth=1.3;g.beginPath();g.moveTo(cx+.6,15);g.lineTo(cx,-5);g.quadraticCurveTo(cx-.4,-8,cx+2.4,-8);g.stroke()}
  /* กระโปรงยาวลายทอ */
  P([-5.4,-6+br*.3,5.8,-6+br*.3,8,13.6,3,14.6,-3,14.6,-7.6,13.6],LG(-6,-6,6,14,['#b84a3e','#8a2e28','#5a1a18']),O,.9);
  g.strokeStyle='#f0c050';g.lineWidth=.6;g.beginPath();for(let i=0;i<8;i++){const xx=-7+i*2,yy=11.4+(i%2)*1.2;i?g.lineTo(xx,yy):g.moveTo(xx,yy)}g.stroke();g.strokeStyle='#4ab0b0';g.beginPath();g.moveTo(-7.4,13.2);g.lineTo(7.6,13.2);g.stroke();
  /* ผ้ากันเปื้อน */
  P([-2.6,-4+br*.25,3.8,-4+br*.25,4.6,9.4,-3.4,9.4],LG(0,-4,0,9,['#efe4cc','#cbbb98']),O,.6);
  /* ผ้าคลุมไหล่ทอลาย + ชายครุย */
  {const sy=-10.4+br*.3;P([-6.4,sy+.6,6.8,sy+.6,7.6,sy+5,1.2,sy+9.4,-7.2,sy+5],LG(0,sy,0,sy+9,['#2a9a96','#1a6a6a']),O,.7);
    g.strokeStyle='#f0c050';g.lineWidth=.55;g.beginPath();g.moveTo(-6.6,sy+3.6);g.lineTo(1.2,sy+7.6);g.lineTo(7.2,sy+3.6);g.stroke();g.strokeStyle='#e85a4a';g.beginPath();g.moveTo(-6,sy+2);g.lineTo(1.2,sy+5.8);g.lineTo(6.8,sy+2);g.stroke();
    g.strokeStyle='#e8d8b0';g.lineWidth=.4;for(let i=0;i<7;i++){const q=i/6,xx=-6.6+q*7.8,yy=sy+5.2+q*4.2;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx-.2,yy+1.6);g.stroke()}for(let i=1;i<6;i++){const q=i/6,xx=1.2+q*6.2,yy=sy+9.2-q*4.2;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx+.2,yy+1.6);g.stroke()}}
  /* แขน: ซ้ายจับไม้เท้า · ขวาถือโคม/วางที่อก */
  NP3.arm(-5,-7.4+br*.3,-8,-5,-7.2,-6.4,'#2a8a86','#ecc4a4');
  if(mode==='lamp'){const lx=8.8,ly=-4.6+Math.sin(t*2)*.5;NP3.arm(5,-7.4+br*.3,8.4,-6,lx,ly-4,'#2a8a86','#ecc4a4');
    g.strokeStyle='#5a3a1e';g.lineWidth=.6;g.beginPath();g.moveTo(lx,ly-4);g.lineTo(lx,ly-2.4);g.stroke();
    if(!LOWQ)glow(lx,ly+2,18,'255,190,110',.5+.12*Math.sin(t*5));R(lx-2.6,ly-2.6,5.2,7.4,1,LG(0,ly-3,0,ly+5,['#d8a050','#8a5a24']),O);R(lx-1.7,ly-1.4,3.4,4.8,.6,LG(0,ly-1,0,ly+3,['#fff8d8','#ffc060']),O);P([lx-3,ly-2.6,lx,ly-4.6,lx+3,ly-2.6],'#8a5a24',O,.5);
    {const fl=1+.15*Math.sin(t*9);P([lx-.7,ly+2,lx,ly+2-2.6*fl,lx+.7,ly+2],'#ff9a30')}}
  else{NP3.arm(5,-7.4+br*.3,6.8,-4,3.4,-3.2,'#2a8a86','#ecc4a4');
    /* ด้ายกับเข็มถัก */if(mode==='stall'){g.strokeStyle='#c84a3a';g.lineWidth=.6;g.beginPath();g.moveTo(3.4,-3.2);g.quadraticCurveTo(6+Math.sin(t*2),0,4.4,3);g.stroke();E(4.4,3.4,1.7,1.6,'#e05a4a',O,.4)}}
  /* หัว (ก้มเล็กน้อย): หน้ายิ้ม ตาปิด แว่นกลม รอยย่น */
  g.save();g.translate(hx,0);NP3.face(hy,['#f6d4b8','#e2b090','#b88264'],{noEye:1,mouth:false});
  g.strokeStyle='rgba(60,30,20,.85)';g.lineWidth=.55;for(const ex of[2.6,5.2]){g.beginPath();g.arc(ex,hy-.2,.9,.2,Math.PI-.2);g.stroke()}
  g.strokeStyle='#8a6a3a';g.lineWidth=.45;for(const ex of[2.6,5.2]){g.beginPath();g.arc(ex,hy,1.6,0,7);g.stroke()}g.beginPath();g.moveTo(3.4,hy-.4);g.lineTo(4.4,hy-.4);g.stroke();
  g.strokeStyle='rgba(120,60,40,.55)';g.lineWidth=.4;g.beginPath();g.arc(3.8,hy+2.2,1.3,.3,Math.PI-.3);g.stroke();g.beginPath();g.moveTo(1,hy+1.2);g.lineTo(1.4,hy+2.4);g.moveTo(6.6,hy+1.2);g.lineTo(6.2,hy+2.4);g.stroke();
  g.fillStyle='rgba(255,140,120,.3)';g.beginPath();g.arc(6,hy+1.8,.9,0,7);g.fill();
  /* ผมขาวมวย + ปิ่นไม้ */
  g.beginPath();g.moveTo(-5.4,hy+2.6);g.quadraticCurveTo(-6.6,hy-6.6,.6,hy-6.8);g.quadraticCurveTo(6.6,hy-6.6,6.4,hy-2.6);g.quadraticCurveTo(3.6,hy-4.6,.6,hy-4);g.quadraticCurveTo(-3,hy-3.4,-3.4,hy+2.8);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+3,['#ffffff','#e0dcd8','#b0aaa8']);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();
  E(-4.2,hy-5.4,3.4,3,LG(0,hy-8.5,0,hy-2.4,['#ffffff','#c8c4c0']),O,.6);g.strokeStyle='rgba(150,140,140,.6)';g.lineWidth=.35;g.beginPath();g.arc(-4.2,hy-5.4,1.8,.5,4);g.stroke();
  g.strokeStyle='#8a5a2a';g.lineWidth=.8;g.beginPath();g.moveTo(-8.4,hy-3.6);g.lineTo(-.6,hy-7.4);g.stroke();E(-.4,hy-7.5,.8,.8,'#e04a4a',O,.3);
  g.restore();
  if(mode==='lamp'&&!LOWQ){for(let i=0;i<3;i++){const q=(t*.4+i/3)%1;g.fillStyle='rgba(255,220,150,'+(.8*Math.sin(q*Math.PI))+')';g.beginPath();g.arc(8.8+Math.sin(t+i*2)*4,-6-q*14,.6,0,7);g.fill()}}
  g.restore()}

/* ---------- บรอม เจ้าของเหมืองคาร์น: ร่างท้วม หมวกเหมืองตะเกียงส่องแสง เคราแดงหนา แหวนทอง สร้อยนาฬิกา ส่องผลึกดาวในมือ อีเต้อพาดบ่า ถุงแร่ดาวข้างตัว ---------- */
function bromV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.3)*.45,lk=Math.sin(t*.8);NPK.sh(x,y+16,16);g.save();g.translate(x,y);g.scale(f*1.32,1.32);g.lineJoin='round';g.lineCap='round';
  const hy=-15.2+br*.4;
  /* ถุงแร่ดาวข้างตัว */
  {const sx=-10.6,sy=8;P([sx-4.6,sy+6.6,sx-5.2,sy+.4,sx-2.4,sy-3.6,sx+2.4,sy-3.6,sx+4.8,sy+.4,sx+4.2,sy+6.6],LG(0,sy-4,0,sy+7,['#a08060','#6a5038']),O,.7);R(sx-2.6,sy-4.6,5.2,1.6,.6,'#5a3a1e',O);
    for(const[cx,cy,c]of[[sx-1.6,sy-4.8,'#9ae8ff'],[sx+1,sy-5.6,'#ffe07a'],[sx+2.4,sy-4.4,'#c8a0ff']]){P([cx,cy-2.4,cx+1.2,cy,cx,cy+1.2,cx-1.2,cy],c,O,.35)}if(!LOWQ)glow(sx,sy-5,9,'170,220,255',.45+.15*Math.sin(t*3))}
  /* อีเต้อพาดบ่าขวา (ด้านหลัง) */
  {g.strokeStyle=O;g.lineWidth=2.4;g.beginPath();g.moveTo(15.4,6.6);g.lineTo(11.6,-19.4);g.stroke();g.strokeStyle=LG(11,-19,15,6,['#c89a64','#6a4424']);g.lineWidth=1.5;g.beginPath();g.moveTo(15,6);g.lineTo(11.6,-19);g.stroke();
    g.save();g.translate(11.6,-19.4);g.rotate(-.15);P([-10,2.4,-5,-1.2,0,-1.8,5,-1.2,10,2.4,5,.4,0,.2,-5,.4],LG(0,-2,0,2.4,['#e8ecf2','#9aa2ae','#5a626e']),O,.6);R(-1.6,-2.6,3.2,3.6,.6,'#5a3a1e',O);g.restore()}
  /* ขาสั้น + รองเท้าบูต */
  NP3.legs('#4a3a2e',['#7a5030','#3a2414'],7);
  /* ลำตัวท้วม: เสื้อ + พุง + เอี๊ยมหนัง */
  P([-7.4,-10+br*.3,7.4,-10+br*.3,9.6,0,8,8.4,0,9.4,-8,8.4,-9.6,0],LG(0,-10,0,9,['#c87a4a','#9a5230','#6a3418']),O,.9);
  E(1.4,1.6,7.4,6.6,LG(0,-5,0,8,['#d8e0e8','#9aa8b8']),O,.8);
  P([-4,-6+br*.25,4.6,-6+br*.25,6,8,-5,8],LG(0,-6,0,8,['#8a5a34','#5a3a1e']),O,.7);for(const s of[-1,1]){g.strokeStyle='#4a2e18';g.lineWidth=1;g.beginPath();g.moveTo(s*3.6+.4,-6+br*.25);g.lineTo(s*4.6+.4,-10+br*.3);g.stroke();E(s*3.6+.4,-5.6+br*.25,.7,.7,'#ffd860',O,.3)}
  /* สร้อยนาฬิกาทอง */
  g.strokeStyle='#ffd860';g.lineWidth=.5;g.beginPath();g.moveTo(-2.4,1);g.quadraticCurveTo(0,3.6,3.6,1.4);g.stroke();E(3.8,1.6,1.3,1.3,LG(0,.3,0,3,['#fff0a0','#c8902a']),O,.4);
  R(-9.6,4.6,19.2,2,.6,'#3a2414',O);R(-1.4,4.4,3,2.4,.4,'#ffd860',O);
  /* แขนซ้าย: ชูผลึกดาวส่องดู */
  {const cx=-9.6+lk*.6,cy=-14.4-Math.max(0,lk)*1.4;NP3.arm(-7.6,-7+br*.3,-12.4,-8,cx,cy+1.8,'#b8683a','#f0c09a');
    if(!LOWQ)glow(cx,cy-1,9,'150,230,255',.55+.25*Math.sin(t*4));P([cx,cy-4.4,cx+1.8,cy-1.2,cx,cy+.6,cx-1.8,cy-1.2],LG(0,cy-4,0,cy+.6,['#ffffff','#7ad8ff','#3a8ad8']),O,.45);P([cx,cy-4.4,cx+1.8,cy-1.2,cx,cy-1.2],'rgba(255,255,255,.6)');
    E(cx-1.6,cy+1.8,.8,.7,'#ffd860',O,.3)}
  NP3.arm(7.6,-7+br*.3,11.4,-6,13.6,-9,'#b8683a','#f0c09a');
  /* หน้า: จมูกแดง คิ้วหนา ตาเล็กเพ่ง */
  NP3.face(hy,['#f6c8a0','#e0a078','#b0704c'],{eye:'#1a0e08',mouth:false});
  g.fillStyle='#8a3a1e';g.fillRect(1.6,hy-2.6,2.4,.9);g.fillRect(4.4,hy-2.6,2.2,.9);
  E(3.8,hy+1.5,1.4,1.1,LG(0,hy+.4,0,hy+2.6,['#ff9a8a','#d8604a']),O,.4);
  /* เคราแดงหนา + หนวด */
  P([-4.6,hy+.4,-5,hy+5,-2.6,hy+9.4,1,hy+11.4,4.4,hy+10,7,hy+6,6.6,hy+2.2,4.8,hy+2.6,1.4,hy+2.4,-1.6,hy+2.8],LG(0,hy,0,hy+11,['#e07a3a','#b04a1e','#7a2e12']),O,.7);
  g.strokeStyle='rgba(255,200,140,.4)';g.lineWidth=.4;for(let i=0;i<4;i++){g.beginPath();g.moveTo(-2+i*2.2,hy+4);g.quadraticCurveTo(-1.6+i*2.2,hy+7,-.6+i*2,hy+9.4);g.stroke()}
  P([1,hy+2.2,4.6,hy+1.4,8,hy+3.2,5,hy+3.6,2.6,hy+3.2],'#c85a28',O,.5);
  /* หมวกเหมือง + ตะเกียง */
  P([-6.4,hy-2,-5.6,hy-7.4,.6,hy-9.6,6.6,hy-7.4,7.4,hy-2],LG(0,hy-10,0,hy-2,['#ffd860','#d8a020','#8a6010']),O,.8);R(-7.2,hy-2.8,15.2,1.8,.8,'#a87818',O);
  R(1.2,hy-8,4.6,3.4,1,'#5a5a62',O);E(5.8,hy-6.3,1.7,1.6,LG(0,hy-8,0,hy-4.6,['#ffffff','#fff0a0']),O,.4);
  /* ตาเล็กเพ่ง + คิ้วดก (วาดทับเครา/หมวก) */for(const ex of[2.6,5.4]){E(ex,hy-.2,.75,.9,'#1a0e08');g.fillStyle='rgba(255,255,255,.8)';g.fillRect(ex+.1,hy-.7,.35,.35)}P([1.2,hy-1,4,hy-1.6,4.2,hy-.9,1.4,hy-.3],'#a8481e',O,.3);P([4.6,hy-1.6,7.2,hy-1.2,7,hy-.4,4.6,hy-.9],'#a8481e',O,.3);
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(6,0,30,0);gr.addColorStop(0,'rgba(255,240,170,.45)');gr.addColorStop(1,'rgba(255,240,170,0)');g.fillStyle=gr;g.beginPath();g.moveTo(6,hy-7.2);g.lineTo(30,hy-14);g.lineTo(30,hy+4);g.lineTo(6,hy-5.4);g.closePath();g.fill();g.restore();glow(6,hy-6.3,7,'255,240,170',.6)}
  g.restore()}

/* ---------- นาวิน เด็กต้นหน: หมวกกะลาสีขนนกทอง เสื้อลายทาง ผ้าผูกคอ กระเป๋าม้วนแผนที่ ส่องกล้องโทรทรรศน์เป็นระยะ ---------- */
function navinV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*2)*.35,ph=t%6,look=ph>3.6&&ph<5.4;NPK.sh(x,y+16,12);g.save();g.translate(x,y);g.scale(f*1.16,1.16);g.lineJoin='round';g.lineCap='round';
  const hy=-15+br*.4;
  /* กระเป๋าสะพาย + ม้วนแผนที่ */
  g.strokeStyle='#6a4424';g.lineWidth=.8;g.beginPath();g.moveTo(-4,-9.6);g.lineTo(4.4,2.2);g.stroke();
  R(-8.6,-1.4,6,6,1.2,LG(0,-1,0,5,['#a07040','#6a4424']),O);E(-5.6,1.4,.8,.8,'#e8c060',O,.3);for(const[dx,c]of[[-7.6,'#f6ecd0'],[-5.8,'#e8dcb8']]){g.save();g.translate(dx,-2.4);g.rotate(-.25);R(-.8,-5,1.6,6,.7,c,O);g.restore()}
  /* ขา */
  for(const s of[-1,1]){R(s*2.4-1.4,8,2.8,5,1,'#f0c49c',O);R(s*2.4-2.1,11.6,4.4,3.4,1.2,LG(0,11.6,0,15,['#3a4a6a','#1e2638']),O)}
  P([-5,3.6,5,3.6,5.4,9.2,.6,9.2,0,7.4,-.6,9.2,-5.4,9.2],LG(0,3,0,9.5,['#3a5a8a','#22385a']),O,.7);
  /* เสื้อลายทาง */
  P([-5,-9.6+br*.3,5,-9.6+br*.3,5.6,4.4,-5.6,4.4],'#ffffff',O,.7);
  g.save();g.beginPath();g.moveTo(-5,-9.6+br*.3);g.lineTo(5,-9.6+br*.3);g.lineTo(5.6,4.4);g.lineTo(-5.6,4.4);g.closePath();g.clip();g.fillStyle='#3a6ab0';for(let i=0;i<5;i++)g.fillRect(-6,-7.4+i*2.8+br*.2,12,1.3);g.restore();
  P([-5,-9.6+br*.3,5,-9.6+br*.3,5.6,4.4,-5.6,4.4],'rgba(0,0,0,0)',O,.7);R(-5.6,2.8,11.2,1.6,.5,'#8a5a2a',O);
  /* ผ้าผูกคอ */
  P([-3.6,-10+br*.3,3.6,-10+br*.3,0,-6.4+br*.3],LG(0,-10,0,-6,['#ff6a4a','#c83a2a']),O,.5);P([0,-6.8,-1.4,-3.6,1.4,-3.6],'#d8402e',O,.4);
  /* แขน + กล้องส่องทางไกล */
  NP3.arm(-5,-8+br*.3,-6.4,-3.6,-5.6,-1,'#ffffff','#f0c49c');
  if(look){const gx=4.6,gy=hy-.6;NP3.arm(5,-8+br*.3,8.4,-8,gx+1.6,gy+2.4,'#ffffff','#f0c49c');g.save();g.translate(gx,gy);g.rotate(-.12);R(0,-1.3,7,2.6,.6,LG(0,-1.3,0,1.3,['#ffe9a0','#c8902a']),O);R(6.4,-1.7,3.4,3.4,.6,LG(0,-1.7,0,1.7,['#fff0b0','#b07a1e']),O);E(9.9,0,.6,1.4,'#9ad8ff');g.restore()}
  else{NP3.arm(5,-8+br*.3,7,-3.6,6.2,-1,'#ffffff','#f0c49c');g.save();g.translate(6.4,-.4);g.rotate(1.25);R(0,-1.1,6.4,2.2,.6,LG(0,-1.1,0,1.1,['#ffe9a0','#c8902a']),O);R(5.8,-1.5,2.8,3,.6,'#d8a840',O);g.restore()}
  /* หน้า */
  NP3.face(hy,['#f8d4aa','#eaae80','#c0845c'],look?{eye:'#2a1a10',mouth:false}:{eye:'#2a1a10',brow:'#2a1a10',mouth:false});
  if(look){g.fillStyle='#2a1a10';g.fillRect(1.8,hy-.4,1.6,.5)}
  g.strokeStyle='rgba(90,30,20,.75)';g.lineWidth=.55;g.beginPath();g.arc(3.6,hy+2.2,1,.2,Math.PI-.2);g.stroke();g.fillStyle='rgba(255,130,110,.35)';g.beginPath();g.arc(5.6,hy+2,.9,0,7);g.fill();
  g.beginPath();g.moveTo(-5.4,hy+2.4);g.lineTo(-6.4,hy-2);g.lineTo(-4.6,hy-5);g.lineTo(5,hy-5.4);g.lineTo(6.4,hy-2.4);g.lineTo(4.2,hy-3);g.lineTo(2.6,hy-2);g.lineTo(1.6,hy-3.2);g.lineTo(-1.6,hy-2.6);g.lineTo(-3.4,hy+2.6);g.closePath();g.fillStyle=LG(0,hy-6,0,hy+3,['#4a2e18','#2a160a']);g.fill();g.strokeStyle=O;g.lineWidth=.6;g.stroke();
  /* หมวกกะลาสี + ขนนกทอง */
  P([-6,hy-3.4,-5.4,hy-7.6,.4,hy-9.4,6.4,hy-7.6,7.2,hy-3.4],LG(0,hy-9.4,0,hy-3.4,['#5a86c8','#2e4e84']),O,.7);R(-6.8,hy-4.4,14.4,1.8,.8,'#f6f0e0',O);
  {const fw=Math.sin(t*3.2)*.6;g.save();g.translate(-3.4,hy-6.4);g.rotate(-.9+fw*.1);if(!LOWQ)glow(0,-4,7,'255,220,120',.4+.15*Math.sin(t*4));P([0,1,-1.6,-3,-.6,-7.6,1.4,-4,.8,1],LG(0,-8,0,1,['#fff4c0','#ffc840','#c88a1a']),O,.45);g.strokeStyle='rgba(150,90,20,.7)';g.lineWidth=.3;g.beginPath();g.moveTo(.2,.6);g.lineTo(-.2,-6.4);g.stroke();g.restore()}
  g.restore()}


/* ---------- ออร์รี หุ่นเฝ้าหอดูดาว: หุ่นทองเหลืองหัวโดมช่องกระจกตาเดียว หิมะบนหัว ผ้าพันคอถักแดง เกจหน้าอก กุญแจไขลานหมุน กวาดหิมะ ---------- */
function orrV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,sw=Math.sin(t*2.2),bob=Math.abs(Math.sin(t*2.2))*.6;NPK.sh(x,y+16,15);g.save();g.translate(x,y);g.scale(f*1.46,1.46);g.lineJoin='round';g.lineCap='round';
  /* กุญแจไขลานด้านหลัง */
  g.save();g.translate(-7.6,-3);g.rotate(t*2);R(-.6,-.6,4.4,1.2,.4,'#c89a3a',O);g.translate(3.8,0);P([0,-2.6,1.6,-1,1.6,1,0,2.6,-.4,0],LG(0,-3,0,3,['#ffe08a','#b07a1e']),O,.45);g.restore();
  /* ขา + เท้ากลม */
  for(const s of[-1,1]){R(s*3-1.5,6.6,3,6,.8,LG(0,6,0,12,['#8a6a3a','#5a4024']),O);E(s*3,13.4,3,1.8,LG(0,11.6,0,15,['#d8a848','#8a5a18']),O,.6)}
  /* ลำตัวกลม + ข้อต่อหมุด */
  E(0,-1+bob*.3,8,8.4,LG(-6,-9,6,8,['#ffe08a','#d8a038','#8a5a18']),O,.9);
  g.strokeStyle='rgba(90,50,10,.5)';g.lineWidth=.5;g.beginPath();g.ellipse(0,-1+bob*.3,8,3,0,.15,Math.PI-.15);g.stroke();
  for(let i=0;i<6;i++){const a=i*1.047+.5;E(Math.cos(a)*6.8,-1+bob*.3+Math.sin(a)*7.2,.6,.6,'#fff0b0',O,.25)}
  /* เกจหน้าอก */
  {const cy=0+bob*.3;E(0,cy,3.6,3.6,LG(0,cy-3.6,0,cy+3.6,['#fff8e8','#e0d4b8']),O,.6);g.strokeStyle='#5a4024';g.lineWidth=.3;for(let k=0;k<8;k++){const a=k*.785;g.beginPath();g.moveTo(Math.cos(a)*2.6,cy+Math.sin(a)*2.6);g.lineTo(Math.cos(a)*3.2,cy+Math.sin(a)*3.2);g.stroke()}
    g.save();g.translate(0,cy);g.rotate(Math.sin(t*1.7)*.6+.4);g.strokeStyle='#c83a2a';g.lineWidth=.6;g.beginPath();g.moveTo(0,0);g.lineTo(0,-2.6);g.stroke();g.restore();E(0,cy,.6,.6,'#5a4024')}
  /* ผ้าพันคอถักแดง + ชายปลิว */
  {const wd=Math.sin(t*2.8);P([-6.4,-8.6,6.4,-8.6,6,-6,-6,-6],LG(0,-9,0,-6,['#e84a3a','#a82a22']),O,.6);g.strokeStyle='rgba(255,220,200,.6)';g.lineWidth=.4;for(let i=-5;i<=5;i+=2){g.beginPath();g.moveTo(i,-8.4);g.lineTo(i+.6,-6.2);g.stroke()}
    P([-4,-7,-7.4,-3.6+wd,-10.6,-4.4+wd*1.5,-9.6,-1.4+wd*1.3,-3.4,-5],LG(-10,-4,-3,-5,['#c83a2a','#e84a3a']),O,.5);g.strokeStyle='#f6e8d8';g.lineWidth=.4;g.beginPath();g.moveTo(-10.4,-4+wd*1.5);g.lineTo(-9.6,-1.6+wd*1.3);g.stroke()}
  /* ไม้กวาดด้านขวา */
  const tx=6.4+sw*.6,ty=-9,bx=11+sw*2.6,by=11;
  {g.strokeStyle=O;g.lineWidth=2.2;g.beginPath();g.moveTo(tx,ty);g.lineTo(bx,by);g.stroke();g.strokeStyle=LG(0,ty,0,by,['#c89a5a','#7a5428']);g.lineWidth=1.3;g.beginPath();g.moveTo(tx,ty);g.lineTo(bx,by);g.stroke();
    g.save();g.translate(bx,by);g.rotate(Math.atan2(by-ty,bx-tx)-Math.PI/2);P([-2.6,0,2.6,0,4,5.6,-4,5.6],LG(0,0,0,6,['#e8c870','#a07a2a']),O,.5);g.strokeStyle='rgba(90,60,20,.6)';g.lineWidth=.3;for(let k=-3;k<=3;k+=1.5){g.beginPath();g.moveTo(k*.6,.6);g.lineTo(k,5.2);g.stroke()}R(-2.8,-.6,5.6,1.4,.4,'#c83a2a',O);g.restore();
    if(!LOWQ)for(let i=0;i<4;i++){const q=(t*1.4+i/4)%1;g.fillStyle='rgba(240,248,255,'+(.85*(1-q))+')';g.beginPath();g.arc(bx+(sw>0?1:-1)*(3+q*8),14.6-Math.sin(q*Math.PI)*6,.8-.3*q,0,7);g.fill()}}
  for(const[sx,sy,hx,hy2]of[[-6.6,-5,-8.6,1.6],[6.6,-5,tx+(bx-tx)*.32,ty+(by-ty)*.32]]){g.strokeStyle=O;g.lineWidth=3.2;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(sx*1.4,(sy+hy2)/2,hx,hy2);g.stroke();g.strokeStyle=LG(0,sy,0,hy2,['#e8b850','#a87a28']);g.lineWidth=2.2;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(sx*1.4,(sy+hy2)/2,hx,hy2);g.stroke();E(hx,hy2,1.5,1.4,'#8a6a3a',O,.45)}
  E(-6.6,-5,1.8,1.8,LG(0,-7,0,-3,['#ffe08a','#a87a28']),O,.5);E(6.6,-5,1.8,1.8,LG(0,-7,0,-3,['#ffe08a','#a87a28']),O,.5);
  /* หัวโดม + ช่องกระจกตาเดียว + หิมะบนหัว + เสาอากาศดาว */
  {const hy=-15+bob*.4;P([-5.6,hy+5.6,-6,hy-1,-3.6,hy-5.4,3.6,hy-5.4,6,hy-1,5.6,hy+5.6],LG(-5,hy-6,5,hy+6,['#ffe9a0','#d8a038','#8a5a18']),O,.8);R(-6.2,hy+4.4,12.4,1.8,.6,'#a87a28',O);
    E(1.6,hy,3.2,3.2,LG(0,hy-3,0,hy+3,['#e0b860','#8a5a18']),O,.6);const bl=((t*.3)%1)<.04;E(1.6,hy,2.3,2.3,LG(0,hy-2.3,0,hy+2.3,['#1e3a5a','#3a7aaa']),O,.45);
    if(!bl){E(2.1,hy,.9,bl?.2:.9,'#9af0ff');if(!LOWQ)glow(2.1,hy,5,'150,240,255',.5+.2*Math.sin(t*3))}g.fillStyle='rgba(255,255,255,.75)';g.beginPath();g.arc(.8,hy-1,.6,0,7);g.fill();
    for(const sx of[-4,4.6])E(sx,hy+2.4,.5,.5,'#fff0b0',O,.2);
    g.strokeStyle='#8a5a18';g.lineWidth=.6;g.beginPath();g.moveTo(-1.6,hy-5.4);g.lineTo(-2.4,hy-9);g.stroke();g.fillStyle='#ffe07a';g.beginPath();for(let k=0;k<10;k++){const r=k%2?.6:1.5,a=k*.628-1.57+t;g.lineTo(-2.4+Math.cos(a)*r,hy-9.6+Math.sin(a)*r)}g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=.3;g.stroke();if(!LOWQ)glow(-2.4,hy-9.6,4,'255,230,140',.5);
    P([-4.6,hy-4.6,-3.4,hy-6.6,0,hy-7.2,3.6,hy-6.4,4.8,hy-4.6,2,hy-5,-1.6,hy-4.8],'#ffffff',O,.45)}
  g.restore()}

/* ---------- กัปตันซารา นาวาเมฆ: หมวกสามมุมขนนก ผมเงินมัดหาง แผลเป็นที่ตา โค้ทน้ำเงินกระดุมทอง อินทรธนู ผ้าคาดแดง ดาบโค้ง เข็มทิศเมฆ ---------- */
function saraV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,br=Math.sin(t*1.3)*.4,wd=Math.sin(t*2.1),wd2=Math.sin(t*2.7+1);NPK.sh(x,y+16,15);g.save();g.translate(x,y);g.scale(f*1.34,1.34);g.lineJoin='round';g.lineCap='round';
  const hy=-16.4+br*.4;
  /* หางม้าผมเงินปลิว */
  P([-4.6,hy-1.6,-9+wd,hy+1,-13+wd*1.6,hy+5+wd2,-10+wd,hy+5.4,-5.6,hy+3],LG(-13,hy,-4,hy,['#c8ccd8','#f4f6fa']),O,.6);
  /* ชายโค้ทยาวด้านหลัง */
  P([-6.4,-2,-8.6-wd*.6,13.6,-3,12,0,9,3,12,8.4+wd*.4,13.6,6.4,-2],LG(0,-2,0,14,['#2a3a6a','#141e3e']),O,.8);
  NP3.legs('#e8e0cc',['#3a2a20','#1a120c'],6);
  /* ดาบโค้งที่เอว */
  g.save();g.translate(-5.6,4.4);g.rotate(.5);R(-.7,0,1.4,11,.6,LG(0,0,0,11,['#e8ecf2','#8a929e']),O);R(-2,-1.4,4,1.4,.5,'#d8b050',O);R(-.8,-4.4,1.6,3.2,.5,'#5a3a1e',O);g.restore();
  /* ตัวโค้ท + เสื้อเชิ้ตขาว + ผ้าคาดแดง */
  P([-6.2,-10.4+br*.3,6.2,-10.4+br*.3,7.4,7,3,8,-3,8,-7.4,7],LG(-6,-10,6,8,['#3a5a9a','#24386a','#141e3e']),O,.9);
  P([-2.4,-10.2+br*.3,2.4,-10.2+br*.3,2,6,-2,6],LG(0,-10,0,6,['#ffffff','#e0dcd4']),O,.5);
  P([-3,-10.4+br*.3,0,-6.6+br*.3,3,-10.4+br*.3,1.4,-4.8,0,-3.6,-1.4,-4.8],'#ffffff',O,.45);
  for(const s of[-1,1])for(let k=0;k<3;k++)E(s*3.6,-6.4+k*3.6,.6,.6,'#ffd860',O,.25);
  P([-7.2,1+br*.2,7.2,1+br*.2,7.4,4,-7.4,4],LG(0,1,0,4,['#e84a3a','#a8241e']),O,.6);P([4.6,2.4,7.4,4.6+wd*.4,6.4,9+wd*.6,4.4,8.6+wd*.6,4.6,4],LG(0,2,0,9,['#d83a2e','#8a1a14']),O,.5);
  R(-1.4,1.4,2.8,2.2,.4,'#ffd860',O);
  /* อินทรธนูทอง */
  for(const s of[-1,1]){P([s*3.4,-10.6+br*.3,s*7.6,-10+br*.3,s*7.8,-8.2+br*.3,s*3.4,-8.6+br*.3],LG(0,-11,0,-8,['#ffe08a','#c8902a']),O,.5);g.strokeStyle='#ffe08a';g.lineWidth=.4;for(let k=0;k<4;k++){g.beginPath();g.moveTo(s*(4.4+k*1.1),-8.4+br*.3);g.lineTo(s*(4.6+k*1.1),-6.8+br*.3);g.stroke()}}
  /* แขนซ้ายเท้าเอว · ขวาถือเข็มทิศเมฆ */
  NP3.arm(-6,-8.6+br*.3,-9.4,-4,-6.6,1.2,'#24386a','#f2d0b4');
  {const cx=8.6,cy=-6.4+Math.sin(t*1.5)*.6;NP3.arm(6,-8.6+br*.3,8.8,-5,cx-1,cy+1.6,'#24386a','#f2d0b4');if(!LOWQ)glow(cx,cy,8,'170,220,255',.45+.2*Math.sin(t*3));E(cx,cy,2.6,2.6,LG(0,cy-2.6,0,cy+2.6,['#ffe9a0','#b07a1e']),O,.5);E(cx,cy,1.8,1.8,'#eaf6ff',O,.3);g.save();g.translate(cx,cy);g.rotate(Math.sin(t*1.9)*.7);P([0,-1.5,.45,0,0,1.5,-.45,0],'#3a8ad8');P([0,-1.5,.45,0,-.45,0],'#e84a3a');g.restore()}
  /* หน้า: แผลเป็นที่ตาขวา ตาเฉียบ */
  NP3.face(hy,['#f6d6bc','#e4b494','#b8866a'],{eye:'#1e2a44',brow:'#a0a4b0',mouth:false});
  g.strokeStyle='rgba(150,60,50,.75)';g.lineWidth=.45;g.beginPath();g.moveTo(4.4,hy-3);g.lineTo(5.8,hy+1.2);g.stroke();g.strokeStyle='rgba(90,30,20,.7)';g.lineWidth=.5;g.beginPath();g.moveTo(2.4,hy+2.6);g.quadraticCurveTo(3.6,hy+3.2,4.8,hy+2.2);g.stroke();
  /* ผมเงินด้านหน้า */
  g.beginPath();g.moveTo(-5.6,hy+3.6);g.quadraticCurveTo(-6.8,hy-6.4,.6,hy-6.6);g.quadraticCurveTo(6.6,hy-6.4,6.6,hy-1.6);g.quadraticCurveTo(4.4,hy-4.4,1.8,hy-3.4);g.quadraticCurveTo(-2.4,hy-3,-3.6,hy+4);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+4,['#ffffff','#d0d4de','#9aa0ae']);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();
  /* หมวกสามมุม + ขอบทอง + ขนนก */
  {const hb=hy-4.8;P([-8.4,hb+.6,-5.4,hb-5.6,.4,hb-7.6,6.4,hb-5.6,9,hb+.4,4.4,hb-1.2,.4,hb+.8,-4,hb-1],LG(0,hb-8,0,hb+1,['#2e3e6a','#141a32']),O,.8);
    g.strokeStyle='#ffd860';g.lineWidth=.7;g.beginPath();g.moveTo(-8.4,hb+.6);g.lineTo(-4,hb-1);g.lineTo(.4,hb+.8);g.lineTo(4.4,hb-1.2);g.lineTo(9,hb+.4);g.stroke();
    P([-.8,hb-3,1.6,hb-5.4,2.2,hb-3.2],'#ffd860',O,.35);
    g.save();g.translate(-3.4,hb-5);g.rotate(-.8+wd*.08);P([0,0,-3,-3,-9,-4.4+wd2*.6,-6,-1.6,-1,1.2],LG(-9,-4,0,0,['#ff8a6a','#d8302a']),O,.5);g.strokeStyle='rgba(120,20,20,.7)';g.lineWidth=.3;g.beginPath();g.moveTo(-.4,.2);g.lineTo(-8,-3.6+wd2*.5);g.stroke();g.restore()}
  g.restore()}

/* ---------- ต่อเข้าเกม ---------- */
/* แคชภาพ NPC: วาดลงแคนวาสแยกที่สเกลจริงของจอ 12 ครั้ง/วิ แล้วแปะทุกเฟรม (ลดคำสั่งวาด ~6 เท่า) · after = วาดสดหลังภาพ (ป้ายชื่อ) */
const NPVC={on:1,fps:12,r:0,bb:[-78,78,-128,36]};
function npvW(fn,old,after,bb){const C={cv:null,k:''};bb=bb||NPVC.bb;const W=function(x,y,f,t){if(NPV.on){const r0=typeof MPC!=='undefined'?MPC.rich:0;g.save();let ok=0;
    try{if(NPVC.on){const m=g.getTransform(),s=Math.max(.5,Math.min(4,Math.hypot(m.a,m.b))),sq=Math.round(s*20)/20,key=f+'|'+sq+'|'+Math.floor(t*NPVC.fps)+'|'+(LOWQ?1:0),[x0,x1,y0,y1]=bb;
        if(C.k!==key){const w=Math.ceil((x1-x0)*sq),h=Math.ceil((y1-y0)*sq);if(!C.cv)C.cv=document.createElement('canvas');const c=C.cv;if(c.width!==w||c.height!==h){c.width=w;c.height=h}const cx=c.getContext('2d');cx.setTransform(1,0,0,1,0,0);cx.globalAlpha=1;cx.globalCompositeOperation='source-over';cx.clearRect(0,0,w,h);cx.setTransform(sq,0,0,sq,-x0*sq,-y0*sq);cx.lineJoin='round';cx.lineCap='round';
          C.k='';const G0=g;g=cx;try{fn(0,0,f,t)}finally{g=G0}C.k=key;NPVC.r++}
        g.drawImage(C.cv,x+x0,y+y0,x1-x0,y1-y0)}
      else fn(x,y,f,t);
      ok=1;NPV.n++}catch(e){NPV.err=String(e&&e.stack||e).slice(0,300);C.k=''}finally{g.restore();if(typeof MPC!=='undefined')MPC.rich=r0}
    if(ok){if(after)try{after(x,y,f,t)}catch(e){}return}}if(old)return old.apply(this,arguments)};W.npv=1;W.old=old;W.cache=C;return W}
function npvInstall(){try{if(typeof NPC3==='undefined')return false;const ok=k=>NPC3[k]&&NPC3[k].d&&!NPC3[k].d.npv;
  if(ok(27)){const o=NPC3[27].d;NPC3[27].d=npvW((x,y,f,t)=>{if(String(MAPS[27].npc.n).indexOf('ราชินี')===0)o(x,y,f,t);else lirV(x,y,f,t)},o)}
  if(ok(28)){NPC3[28].d=npvW(lirV,NPC3[28].d);NPC3[28].hy=54}
  if(ok(30)){NPC3[30].d=npvW((x,y,f,t)=>tilV(x,y,f,t,0),NPC3[30].d);NPC3[30].hy=50}
  if(ok(31)){NPC3[31].d=npvW((x,y,f,t)=>edaV(x,y,f,t,'stall'),NPC3[31].d);NPC3[31].hy=52}
  const edaL=(x,y,f,t)=>{tilV(x-f*26,y+6,f,t,0,1.02);edaV(x,y,f,t,'lamp');try{if(me.sty&&me.sty.p6h===2)campFolk(x+f*34,y-8,{c:'#22305a',sh:'#d8b050',hair:'#d8d8d8',hat:'#141826',f,s:1.2,k:7},t)}catch(e){}};
  if(ok(32)){NPC3[32].d=npvW(edaL,NPC3[32].d);NPC3[32].hy=52}
  if(ok(33)){NPC3[33].d=npvW(edaL,NPC3[33].d);NPC3[33].hy=52}
  if(ok(34)){NPC3[34].d=npvW((x,y,f,t)=>tilV(x,y,f,t,1),NPC3[34].d);NPC3[34].hy=50}
  if(ok(35)){NPC3[35].d=npvW(bromV,NPC3[35].d);NPC3[35].hy=58}
  if(ok(36)){NPC3[36].d=npvW(orrV,NPC3[36].d);NPC3[36].hy=Math.max(NPC3[36].hy||0,52)}
  if(ok(38)){NPC3[38].d=npvW(saraV,NPC3[38].d);NPC3[38].hy=Math.max(NPC3[38].hy||0,56)}
  if(typeof navinD==='function'&&!navinD.npv){const o=navinD;navinD=npvW(navinV,o)}
  return true}catch(e){NPV.err='install '+e;return false}}
{let k=0;const iv=setInterval(()=>{k++;if(typeof NPC3!=='undefined'&&NPC3[35]&&NPC3[30]&&NPC3[34]&&NPC3[36]&&NPC3[38]){npvInstall();clearInterval(iv)}else if(k>100){npvInstall();clearInterval(iv)}},100)}
