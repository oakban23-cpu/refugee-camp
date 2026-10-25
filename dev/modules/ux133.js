/* ===== v525 พาหนะวาดใหม่ 6 ตัว — ม้าศึก · หมาป่าเงา · หมูป่าเกราะ · เสือขาว · กวางวิญญาณ · อาชาเพลิงนรก
   ลำตัวมีอก/ท้อง/สะโพก ไล่เฉด · ขา 2 ท่อน (ต้นขาโป่ง เข่า กีบ/อุ้งเท้า) วิ่งตามจังหวะเดิม · หัวมีจมูก/ปาก/หู/ตามีประกาย
   แผงคอ/หางพลิ้ว · อานหนัง + ผ้ารองอาน + สายรัดท้อง + บังเหียน · เอฟเฟกต์เฉพาะตัว (ตาเรือง เขาเรือง เปลวไฟ ลาวา ควันเงา)
   ความสูงอาน/จุดนั่งเท่าเดิม (คนขี่ไม่ลอย) · ไอคอนในคอกสัตว์ใช้ภาพเดียวกัน · ห่อ drawMount ทางชื่อ · error → แบบเดิม (MTV.on=0 ปิด) ===== */
const MTV={on:1,err:'',n:0};
const MTP=[null,
  {b:'#9a6438',d:'#6a4224',m:'#2e1c10',h:'#2a1a10',l:'#c89060',sock:'#f0e8dc'},
  {b:'#4a4a62',d:'#2c2c40',m:'#1c1c2c',h:'#1a1a26',l:'#7a7a98',eye:'#7af0ff'},
  {b:'#6e4c3a',d:'#4a3226',m:'#2a1a12',h:'#2a1a12',l:'#9a7058',eye:'#ff5a3a'},
  {b:'#f2f2f6',d:'#c4c4d2',m:'#1a1a24',h:'#c8c8d4',l:'#ffffff',eye:'#4ab0ff'},
  {b:'#bcd8f4',d:'#86acd6',m:'#e8f8ff',h:'#5a7aa0',l:'#e8f4ff',eye:'#2a4a7a'},
  {b:'#2c1c1e',d:'#160c0e',m:'#ff6a20',h:'#ff8a30',l:'#4a3032',eye:'#ffcc40'}];
function mtF(P,c,y0,y1,lw){pcP(P);g.fillStyle=chSh(c,y0,y1);g.fill();if(lw!==0){g.lineWidth=lw||1;g.strokeStyle=O0;g.stroke()}}
function mtLit(fn){if(LOWQ)return;g.save();g.globalCompositeOperation='lighter';try{fn()}finally{g.restore()}}
/* ขา 2 ท่อน: hip → knee → foot (เดิน/วิ่งตามจังหวะ gal) */
function mtLeg(hx,hy,k,far,o,mv,gal){const sw=mv?Math.sin(gal+k)*4.4:0,lift=mv?Math.max(0,Math.cos(gal+k))*2.8:0,L=o.len,kx=hx+sw*.3+(o.back?-1.2:1),ky=hy+L*.5,fx=hx+sw,fy=hy+L-lift,c=far?o.cd:o.c;
  g.lineCap='round';g.lineJoin='round';g.strokeStyle=O0;g.lineWidth=o.w+1.7;g.beginPath();g.moveTo(hx,hy);g.lineTo(kx,ky);g.lineTo(fx,fy-1);g.stroke();
  g.strokeStyle=c;g.lineWidth=o.w;g.stroke();
  if(!far&&!LOWQ){g.strokeStyle='rgba(255,255,255,.2)';g.lineWidth=o.w*.32;g.beginPath();g.moveTo(hx-o.w*.25,hy+1);g.lineTo(kx-o.w*.25,ky);g.lineTo(fx-o.w*.2,fy-2);g.stroke()}
  if(o.sock&&!far){g.strokeStyle=o.sock;g.lineWidth=o.w*.9;g.beginPath();g.moveTo(fx+(kx-fx)*.35,fy-1-(fy-ky)*.35);g.lineTo(fx,fy-1.2);g.stroke()}
  if(o.paw){g.beginPath();g.ellipse(fx+.8,fy-.2,o.w*.75,o.w*.45,0,0,7);g.fillStyle=far?o.cd:c;g.fill();g.lineWidth=.8;g.strokeStyle=O0;g.stroke()}
  else{g.beginPath();g.moveTo(fx-o.w*.55,fy-1.6);g.lineTo(fx+o.w*.6,fy-1.6);g.lineTo(fx+o.w*.75,fy+.6);g.lineTo(fx-o.w*.6,fy+.6);g.closePath();g.fillStyle=o.hoof;g.fill();g.lineWidth=.7;g.strokeStyle=O0;g.stroke()}
  return[fx,fy]}
/* อาน + ผ้ารอง + สายรัด (ตำแหน่งเดียวกับของเดิม) */
function mtSaddle(id,P,heavy){const cl=id===6?'#5a1414':id===2?'#3a2a5a':id===5?'#3a5a8a':'#7a2a24',tr=id===6?'#ff9a3a':id===5?'#e8f4ff':'#d8a040';
  mtF([[-1.4,-.6],[1.2,-.6],[1.6,7.4],[-1.8,7.4]],'#3a2414',-.6,7.4,.6);
  mtF([[-8,-7.2],[6.6,-7.2],[7.2,-1.4],['q',-.4,.6,-8.6,-1.4]],cl,-7.2,.6,1);g.strokeStyle=tr;g.lineWidth=1;g.beginPath();g.moveTo(7,-2.2);g.quadraticCurveTo(-.4,-.4,-8.4,-2.2);g.stroke();if(!LOWQ){g.fillStyle='rgba(255,255,255,.18)';g.fillRect(-7.4,-6.6,1.4,4.6)}
  if(heavy){g.fillStyle='#8a8a96';g.fillRect(-8,-4.4,14.8,1.1)}
  mtF([[-6.8,-7.4],['q',-7.6,-10.6,-4.6,-9.8],['q',-.2,-7.6,3.8,-9.4],['q',6.8,-10.4,6.2,-7.2]],'#5a3418',-10.6,-7,.9);if(!LOWQ){g.strokeStyle='rgba(255,220,170,.35)';g.lineWidth=.6;g.beginPath();g.moveTo(-5.6,-9.2);g.quadraticCurveTo(-.4,-7.4,3.6,-8.8);g.stroke()}
  g.strokeStyle='#2a1a10';g.lineWidth=.7;g.beginPath();g.moveTo(-3.4,-7.2);g.lineTo(-3.2,1.6);g.stroke();g.fillStyle='#c8ccd4';g.fillRect(-4.6,1.6,2.8,.9);g.lineWidth=.4;g.strokeStyle=O0;g.strokeRect(-4.6,1.6,2.8,.9)}
/* ตา */
function mtEye(x,y,r,c,glow){if(glow){mtLit(()=>glowAt(x,y,r*3.4,glow,.9))}g.beginPath();g.ellipse(x,y,r,r*.85,0,0,7);g.fillStyle=c||'#120c0a';g.fill();g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.arc(x+r*.25,y-r*.3,r*.32,0,7);g.fill()}
/* ---------- ม้า (1 ม้าศึก · 6 อาชาเพลิง) ---------- */
function mtHorse(id,P,t,mv,gal,bob){const fire=id===6;
  const lg={c:P.b,cd:P.d,w:3.2,len:12,hoof:fire?'#2a1410':P.h,sock:fire?0:P.sock};
  /* หาง */{const tw=Math.sin(t*3+(mv?gal:0))*3;if(fire){mtLit(()=>{for(let i=0;i<5;i++){const h=10+i*2+Math.sin(t*12+i)*2;g.fillStyle=i%2?'rgba(255,200,70,.85)':'rgba(255,90,20,.85)';g.beginPath();g.moveTo(-14,-3);g.quadraticCurveTo(-22-i,-3+tw,-18-h,4+tw+i*2);g.quadraticCurveTo(-20,1,-14,0);g.fill()}});if(LOWQ){g.fillStyle='#ff6a20';g.beginPath();g.moveTo(-14,-3);g.quadraticCurveTo(-24,0+tw,-24,9+tw);g.quadraticCurveTo(-19,3,-14,0);g.fill()}}
    else{mtF([[-14,-4],['q',-24,-3+tw,-25,9+tw],['q',-22.6,12+tw,-21,9+tw],['q',-20,3,-14,0]],P.m,-4,12,.9);if(!LOWQ){g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=.6;g.beginPath();g.moveTo(-15,-2.6);g.quadraticCurveTo(-21,-1+tw,-22.6,8+tw);g.stroke()}}}
  mtLeg(-10,3,Math.PI,1,{...lg,back:1},mv,gal);mtLeg(9,3,0,1,lg,mv,gal);
  /* ลำตัว */const B=[[-15,-1],['q',-15.4,-7.4,-9,-7.2],[7,-7.2],['q',13.6,-7.4,15,-1],['q',15.4,5.4,10,7.2],['q',0,8.4,-9,7.2],['q',-16,6.4,-15,-1]];mtF(B,P.b,-7.4,8,1.05);if(!LOWQ){pcP(B);g.fillStyle=alHG();g.fill()}
  if(!LOWQ){g.fillStyle='rgba(0,0,0,.16)';g.beginPath();g.ellipse(0,5.4,10,2,0,0,7);g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=.6;g.beginPath();g.moveTo(-9,-1);g.quadraticCurveTo(-11,3,-8.6,6);g.moveTo(10,-3);g.quadraticCurveTo(12.4,1,10,5);g.stroke()}
  if(fire)mtLit(()=>{g.strokeStyle='rgba(255,'+(110+40*Math.sin(t*4)|0)+',30,.85)';g.lineWidth=.8;g.beginPath();g.moveTo(-10,-4);g.lineTo(-7,-1);g.lineTo(-8.4,2.6);g.moveTo(-2,-5);g.lineTo(0,-1.4);g.lineTo(2.6,0);g.moveTo(6,-4.6);g.lineTo(8.4,-1);g.lineTo(7,3.6);g.stroke()});
  mtSaddle(id,P,0);
  /* คอ + หัว */
  const N=[[7,-6.4],['q',10.6,-13,15,-16.6],[19.4,-16],['q',17.6,-9,16,1.6],[10,3]];mtF(N,P.b,-16.6,3,1);
  /* แผงคอ */if(fire){mtLit(()=>{for(let i=0;i<6;i++){const h=7+Math.sin(t*13+i*1.7)*2.5,bx=9.4+i*1.5,byy=-5-i*2;g.fillStyle=i%2?'rgba(255,210,80,.9)':'rgba(255,90,20,.9)';g.beginPath();g.moveTo(bx,byy+2);g.quadraticCurveTo(bx-5,byy-h*.5,bx-3,byy-h);g.quadraticCurveTo(bx+1,byy-h*.4,bx+3,byy+1);g.fill()}});if(LOWQ){g.fillStyle='#ff6a20';g.beginPath();g.moveTo(8,-5);g.quadraticCurveTo(10,-16,17,-17);g.lineTo(14,-11);g.quadraticCurveTo(12,-6,10,0);g.fill()}}
  else{const sw=Math.sin(t*2.6+(mv?gal:0))*.8;mtF([[8.4,-5],['q',9.6,-15+sw,16.6,-17.4],[17.4,-15.6],['q',13,-14,12.8,-9],['q',11.6,-6,10.6,-1]],P.m,-17.4,-1,.8);mtF([[16.4,-17.6],[19.6,-17.4],['q',20.4,-15.6,19,-14.4],['q',18,-15.6,16.6,-15.4]],P.m,-17.6,-14.4,.6)}
  const H=[[16,-16.6],['q',18,-18.6,20.6,-17.8],['q',26.6,-14.6,28.4,-11.4],['q',29.4,-9,27.4,-8.2],['q',23,-8.4,19.6,-10],['q',16.6,-11.4,16,-16.6]];mtF(H,P.b,-18.6,-8,1);
  if(!LOWQ){g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.ellipse(21,-15.6,3.4,1.2,.35,0,7);g.fill()}
  if(!fire){g.fillStyle=P.sock;g.beginPath();g.moveTo(21.2,-16.6);g.quadraticCurveTo(25,-14.4,26.8,-11.6);g.lineTo(25.8,-11.2);g.quadraticCurveTo(23.8,-13.4,20.6,-15.6);g.fill()}
  mtF([[17.2,-16.4],[18,-21.4],[19.8,-17.2]],P.b,-21.4,-16.4,.8);g.fillStyle=chAdj(P.b,-.35);g.beginPath();g.moveTo(17.8,-17);g.lineTo(18.1,-20);g.lineTo(19,-17.2);g.fill();
  mtEye(20.8,-14.4,1,fire?P.eye:'#120c0a',fire?'255,180,60':0);g.fillStyle='#120c0a';g.beginPath();g.ellipse(27.6,-10.4,.55,.4,.4,0,7);g.fill();g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=.5;g.beginPath();g.moveTo(25.6,-8.8);g.lineTo(28,-8.6);g.stroke();
  if(fire){mtF([[19.4,-15.8],[25.4,-12.4],[24.6,-10.6],[19,-12.8]],'#3a3036',-15.8,-10.6,.6);alGem(22.2,-13.1,.8,'#ff4a2a',0)}
  /* บังเหียน */g.strokeStyle=fire?'#8a6a4a':'#3a2414';g.lineWidth=.7;g.beginPath();g.moveTo(18.6,-16.4);g.lineTo(24.6,-10);g.moveTo(24.2,-12.4);g.lineTo(25.4,-8.4);g.stroke();g.strokeStyle='#2a1a10';g.lineWidth=.6;g.beginPath();g.moveTo(24.8,-9.6);g.quadraticCurveTo(14,-6,6,-7.6);g.stroke();
  mtLeg(-12,3.4,0,0,{...lg,back:1},mv,gal);mtLeg(11,3.4,Math.PI,0,lg,mv,gal);
  if(fire)mtLit(()=>{for(const[xx,k]of[[-12,0],[11,Math.PI],[-10,Math.PI],[9,0]]){const sw=mv?Math.sin(gal+k)*4.4:0,lift=mv?Math.max(0,Math.cos(gal+k))*2.8:0;glowAt(xx+sw,15-lift,3.6,'255,140,40',.75)}})}
/* ---------- หมาป่าเงา (2) / เสือขาว (4) ---------- */
function mtCat(id,P,t,mv,gal,bob){const tiger=id===4,lg={c:P.b,cd:P.d,w:tiger?3.4:3,len:11,paw:1};
  if(!tiger&&mv)mtLit(()=>{for(let i=0;i<4;i++){const q=(t*1.4+i/4)%1;g.fillStyle='rgba(20,16,40,'+(.5*(1-q))+')';g.beginPath();g.arc(-14-q*14,4-q*3+i,3.4*(1-q)+1,0,7);g.fill()}});
  /* หาง */{const tw=Math.sin(t*3+(mv?gal:0))*3;if(tiger){g.lineCap='round';g.strokeStyle=O0;g.lineWidth=4.4;g.beginPath();g.moveTo(-14,-1);g.quadraticCurveTo(-22,-4+tw,-26,-9+tw*1.4);g.stroke();g.strokeStyle=P.b;g.lineWidth=2.8;g.stroke();
      g.strokeStyle=P.m;g.lineWidth=1.2;for(const q of[.35,.6,.82]){const x=-14+(-26+14)*q,y=-1+(-9+tw*1.4+1)*q;g.beginPath();g.moveTo(x-.4,y-1.3);g.lineTo(x+.6,y+1.3);g.stroke()}g.fillStyle=P.m;g.beginPath();g.arc(-26,-9+tw*1.4,1.5,0,7);g.fill()}
    else mtF([[-13,-3],['q',-20,-6+tw,-27,-9+tw*1.4],['q',-25,-4+tw,-28,-2+tw],['q',-20,0+tw*.5,-13,2]],P.d,-10+tw,2,.9)}
  mtLeg(-10,3,Math.PI,1,{...lg,back:1},mv,gal);mtLeg(9,3,0,1,lg,mv,gal);
  const B=[[-14.6,-.6],['q',-14.8,-6.6,-8.6,-6.6],[6,-7],['q',13,-7.6,14.6,-1.4],['q',15,5.4,10,6.6],['q',0,6.8,-9,6.6],['q',-15.4,5.8,-14.6,-.6]];mtF(B,P.b,-7.6,7,1.05);if(!LOWQ){pcP(B);g.fillStyle=alHG();g.fill()}
  if(tiger){g.strokeStyle=P.m;g.lineWidth=1.3;g.lineCap='round';for(const k of[-10,-6,-2,2,6]){g.beginPath();g.moveTo(k,-6.4);g.quadraticCurveTo(k+2,-2,k-.4,1.4);g.stroke()}g.fillStyle='rgba(230,230,240,.9)';g.beginPath();g.ellipse(2,4.8,9,1.8,0,0,7);g.fill()}
  else{g.fillStyle=P.m;g.beginPath();for(let i=0;i<6;i++){const x=-9+i*3.2;g.moveTo(x-1.4,-6.4);g.lineTo(x+.4,-9.6-(i%2)*1.2);g.lineTo(x+1.8,-6.4)}g.fill();g.fillStyle=P.l;g.beginPath();g.moveTo(9,-4);g.quadraticCurveTo(15,-2,13,5);g.quadraticCurveTo(10,2,9,-4);g.fill()}
  mtSaddle(id,P,0);
  /* คอ + หัว */mtF([[8,-6],['q',12,-11,16,-12],[19,-8],['q',17,-1,14,2],[10,2.6]],P.b,-12,2.6,1);
  if(tiger){for(const[x,c2]of[[16.2,P.d],[20.4,P.b]]){mtF([[x-1.7,-13.6],[x-.4,-17.8],[x+1.8,-14]],c2,-17.8,-13.6,.8);g.fillStyle='#f0a8b8';g.beginPath();g.moveTo(x-.9,-14.2);g.lineTo(x-.3,-16.4);g.lineTo(x+.8,-14.4);g.fill()}
      const H=[[14.6,-9.8],['q',14.6,-15.2,19.8,-15.6],['q',24.8,-15.6,26,-11.4],['q',28.4,-10,28,-7.6],['q',27,-4.4,22.4,-4.6],['q',18,-4.2,16,-6.2],['q',13.6,-6.8,14.6,-9.8]];mtF(H,P.b,-15.6,-4.4,1);
      g.fillStyle='#ffffff';g.beginPath();g.moveTo(15,-8.4);g.lineTo(13.6,-6.6);g.lineTo(15.4,-6.8);g.lineTo(14.6,-5);g.lineTo(16.6,-5.8);g.closePath();g.fill();
      g.strokeStyle=P.m;g.lineCap='round';g.lineWidth=.9;for(const[a,b,c2,d]of[[20,-15,20.6,-13.2],[21.8,-15.2,21.9,-13.6],[23.4,-14.8,23,-13.2],[16.6,-10.6,18.8,-9.8],[16.8,-8.6,18.8,-8.4],[16.6,-12.4,18.4,-11.6]]){g.beginPath();g.moveTo(a,b);g.lineTo(c2,d);g.stroke()}
      g.fillStyle='rgba(240,240,248,1)';g.beginPath();g.ellipse(25.2,-7.2,2.9,2,0,0,7);g.fill();
      g.save();g.translate(22.2,-11);g.rotate(-.3);g.beginPath();g.ellipse(0,0,1.2,.8,0,0,7);g.fillStyle=P.eye;g.fill();g.lineWidth=.6;g.strokeStyle=O0;g.stroke();g.fillStyle='#120c0a';g.beginPath();g.ellipse(.2,0,.35,.7,0,0,7);g.fill();g.restore();
      g.fillStyle='#e88a9a';g.beginPath();g.moveTo(26.2,-9.2);g.lineTo(27.9,-9.2);g.lineTo(27,-7.9);g.closePath();g.fill();g.strokeStyle='rgba(60,40,40,.7)';g.lineWidth=.5;g.beginPath();g.moveTo(27,-7.9);g.quadraticCurveTo(26.4,-6.6,25.2,-6.8);g.stroke();
      g.strokeStyle='rgba(60,60,70,.55)';g.lineWidth=.35;for(const dy of[-.6,.4,1.4]){g.beginPath();g.moveTo(25.6,-7.6+dy*.6);g.lineTo(29.8,-8+dy);g.stroke()}}
  else{const H=[[14,-9.6],['q',14.6,-14.4,19.6,-14.2],['q',23.4,-13.6,25,-11],[29.6,-9],['q',30,-7.6,28.6,-7],[22.6,-6.4],['q',16,-5.6,14,-9.6]];mtF(H,P.b,-14.4,-5.6,1);
      for(const[x,c2]of[[15.6,P.d],[18.6,P.b]])mtF([[x,-13],[x+1.2,-18.4],[x+3.2,-13.4]],c2,-18.4,-13,.8);g.fillStyle='#ffffff';g.beginPath();g.moveTo(25.6,-7.2);g.lineTo(26.2,-5.6);g.lineTo(26.8,-7.2);g.fill();
      mtEye(21.2,-11,1,P.eye,'122,240,255');g.fillStyle='#120c0a';g.beginPath();g.arc(29.4,-8.6,.6,0,7);g.fill()}
  mtLeg(-12,3.2,0,0,{...lg,back:1},mv,gal);mtLeg(11,3.2,Math.PI,0,lg,mv,gal)}
/* ---------- หมูป่าเกราะ (3) ---------- */
function mtBoar(P,t,mv,gal,bob){const lg={c:P.b,cd:P.d,w:3.8,len:9.4,hoof:'#1a100a'};
  {const tw=Math.sin(t*5)*1;g.strokeStyle=P.d;g.lineWidth=1.3;g.lineCap='round';g.beginPath();g.moveTo(-15,0);g.quadraticCurveTo(-19,-3,-17,-5+tw);g.quadraticCurveTo(-15,-6,-16.4,-3);g.stroke()}
  mtLeg(-9,4.6,Math.PI,1,{...lg,back:1},mv,gal);mtLeg(9,4.6,0,1,lg,mv,gal);
  const B=[[-15.6,0],['q',-16,-8.6,-8,-8.6],[6,-8.8],['q',14,-9,15.6,-1],['q',15.6,6.6,9,8.6],['q',0,9.6,-9,8.6],['q',-16.4,7.4,-15.6,0]];mtF(B,P.b,-9,9.6,1.1);if(!LOWQ){pcP(B);g.fillStyle=alHG();g.fill()}
  g.fillStyle=P.m;g.beginPath();for(let i=0;i<8;i++){const x=-12+i*2.8;g.moveTo(x-1,-8.2);g.lineTo(x+.2,-11.2-(i%2));g.lineTo(x+1.2,-8.2)}g.fill();
  /* เกราะหลัง */const A=[[-11,-7.6],[11,-7.6],['q',13.6,-3,12.6,1.6],[-12.6,1.6],['q',-13.4,-3,-11,-7.6]];mtF(A,'#8a8e9a',-7.6,1.6,1);if(!LOWQ){pcP(A);g.fillStyle=alHG();g.fill()}
  g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=.6;for(const x of[-6,0,6]){g.beginPath();g.moveTo(x,-7.2);g.lineTo(x+.4,1.2);g.stroke()}hRiv([[-9,-.4],[-3,-.6],[3,-.6],[9,-.4],[-9,-5.6],[9,-5.6]],'#e0e4ea');
  mtSaddle(3,P,1);
  const H=[[11,-6.4],['q',13,-11,19,-10.4],['q',24.6,-9.4,26.6,-5],['q',27.4,-1,24,1],['q',18,3,13.6,2],['q',10,0,11,-6.4]];mtF(H,P.b,-11,3,1.05);
  mtF([[13,-9.6],[21.4,-9.6],[23.4,-6],[13.4,-5]],'#8a8e9a',-9.6,-5,.9);hRiv([[15,-7.4],[19.6,-7.6]],'#e0e4ea');mtF([[14,-9.6],[15,-14],[17.6,-9.8]],P.d,-14,-9.6,.8);
  g.beginPath();g.ellipse(26.2,-2.4,1.9,2.6,0,0,7);g.fillStyle=chSh('#b88270',-5,0);g.fill();g.lineWidth=.8;g.strokeStyle=O0;g.stroke();g.fillStyle='#3a1a12';g.beginPath();g.arc(26.2,-3.1,.5,0,7);g.arc(26.4,-1.6,.5,0,7);g.fill();
  mtF([[22,.4],['q',26.6,1.6,26.4,-2.2],['q',27.6,1.8,22.4,2]],'#f4ecd8',-2.2,2,.7);mtEye(20.6,-4.6,.9,P.eye,'255,90,58')}
/* ---------- กวางวิญญาณ (5) ---------- */
function mtDeer(P,t,mv,gal,bob){const lg={c:P.b,cd:P.d,w:2.4,len:13,hoof:P.h};
  mtLit(()=>{const gr=g.createRadialGradient(0,2,0,0,2,26);gr.addColorStop(0,'rgba(170,220,255,.32)');gr.addColorStop(1,'rgba(170,220,255,0)');g.fillStyle=gr;g.beginPath();g.arc(0,2,26,0,7);g.fill()});
  mtF([[-13.6,-4],['q',-17,-6,-17.6,-2],['q',-16,0,-13.6,-.6]],P.m,-6,0,.7);
  mtLeg(-9,2.6,Math.PI,1,{...lg,back:1},mv,gal);mtLeg(9,2.6,0,1,lg,mv,gal);
  const B=[[-14,-1.4],['q',-14,-6.6,-8.4,-6.6],[6,-6.8],['q',12.6,-7,13.6,-1.6],['q',13.8,3.6,9,5.4],['q',0,6.2,-8.6,5.4],['q',-14.6,4.6,-14,-1.4]];mtF(B,P.b,-7,6.2,1);if(!LOWQ){pcP(B);g.fillStyle=alHG();g.fill()}
  g.fillStyle='rgba(240,250,255,.9)';for(const[a,b]of[[-10,-3.6],[-7,-1.6],[-4.6,-4.2],[8.6,-3.8],[10.6,-1]]){g.beginPath();g.arc(a,b,.75,0,7);g.fill()}
  mtSaddle(5,P,0);
  mtF([[7,-5.6],['q',10,-14,13.6,-18.6],[17,-17.6],['q',14.6,-10,13.6,1.4],[9.6,2.4]],P.b,-18.6,2.4,1);
  const H=[[13.6,-17.6],['q',16.4,-20.6,20,-19],['q',24,-17,25.4,-14.6],['q',25.6,-12.8,23.4,-12.6],['q',18,-13,15,-14.2]];mtF(H,P.b,-20.6,-12.6,1);
  for(const[x,r]of[[14.6,-.9],[18.2,-.3]]){g.save();g.translate(x,-18.6);g.rotate(r);mtF([[0,0],[-1.4,-4.4],[1.4,-.6]],P.l,-4.4,0,.7);g.restore()}
  const ant=(sx,s)=>{const P2=[[sx,-19],[sx-1.6*s,-25],[sx-1.2*s,-29],[sx-1.6*s,-25],[sx-5*s,-27.4],[sx-1.6*s,-25],[sx-1*s,-22],[sx+2.4*s,-25.6]];g.lineCap='round';g.strokeStyle=O0;g.lineWidth=2.6;g.beginPath();g.moveTo(sx,-19);g.lineTo(sx-1.6*s,-25);g.lineTo(sx-1.2*s,-29.4);g.moveTo(sx-1.6*s,-25);g.lineTo(sx-5*s,-27.4);g.moveTo(sx-1*s,-22);g.lineTo(sx+2.4*s,-25.6);g.stroke();g.strokeStyle='#d8f6ff';g.lineWidth=1.3;g.stroke();
    mtLit(()=>{for(const[a,b]of[[sx-1.2*s,-29.4],[sx-5*s,-27.4],[sx+2.4*s,-25.6]])glowAt(a,b,2.4,'180,240,255',.9)})};ant(17,1);ant(19.6,-1);
  mtEye(20.4,-16.4,.95,P.eye,0);g.fillStyle='#2a3a5a';g.beginPath();g.arc(25,-13.8,.55,0,7);g.fill();
  mtLeg(-11,2.8,0,0,{...lg,back:1},mv,gal);mtLeg(11,2.8,Math.PI,0,lg,mv,gal);
  mtLit(()=>{for(let i=0;i<4;i++){const q=(t*.8+i/4)%1;g.fillStyle='rgba(200,240,255,'+(.8*(1-q))+')';g.fillRect(-14-q*18+i*6,-2-q*8+Math.sin(i+t)*3,1.4,1.4)}})}
function mtV(id,x,y,fx,ph,t,sc){const P=MTP[id];if(!P)return false;const mv=!!ph,gal=mv?ph*1.15:0,S=sc||1,bob=mv?-Math.abs(Math.sin(gal))*1.6:Math.sin(t*2)*.4;
  g.save();g.translate(x,y);g.scale(fx*S,S);g.lineJoin='round';
  g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(0,17,21,4.5,0,0,7);g.fill();
  g.translate(0,bob);
  if(id===1||id===6)mtHorse(id,P,t,mv,gal,bob);else if(id===2||id===4)mtCat(id,P,t,mv,gal,bob);else if(id===3)mtBoar(P,t,mv,gal,bob);else mtDeer(P,t,mv,gal,bob);
  g.restore();MTV.n++;return true}
{const old=drawMount;drawMount=function(id,x,y,fx,ph,t,sc){if(MTV.on){g.save();try{if(mtV(id,x,y,fx,ph,t,sc)){g.restore();return}}catch(e){MTV.err=String(e&&e.stack||e).slice(0,300)}g.restore()}return old.apply(this,arguments)};MTV.old=old;try{for(const k in MTI)delete MTI[k]}catch(e){}}
