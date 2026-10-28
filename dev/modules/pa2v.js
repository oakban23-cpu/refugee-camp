
/* ===== v548 ภาค 10 บทที่ 2 — ภาพ: มอนธีม 46 (ด้วงยางทอง · ผีเสื้อมอสพิษ · หุ่นรากหลงคำสั่ง) · เฒ่าแก่นไม้ · ชาวรากลึก 6 แบบ · บอส «ตัวกัดรากยักษ์»
   มอนใช้ชุด vS/vD/bvE/wE · NPC ใช้ NPK/NP3 + แคช npvW · บอสใช้ BV1 (ดำดินได้: PTW.bur) ===== */
MV1D[460]=(r,T,W,bob,sw0,la,ra)=>{/* ด้วงยางทอง: กระดองเป็นอำพันใส เห็นยางทองไหลวนข้างใน ฟองอากาศ หัวดำมันวาว เขี้ยวคีมโค้ง หนวดยาว ขา 6 ขาเดินสลับ ยางหยด */
  const b=Math.sin(T*6)*r*.02,pu=.6+.4*Math.sin(T*2.4),st=Math.sin(T*9);
  vGlow(W,0,-r*.1+b,r*.95,'255,190,70',.22*pu);
  /* ขา 6 ขา */for(let k=0;k<3;k++)for(const s of[-1,1]){const ph=st*(k%2?1:-1)*s,x0=-r*.28+k*r*.28,y0=r*.12+b;vLimb(W,[x0,y0,x0+s*r*.05+ph*r*.06,y0+r*.28,x0+s*r*.1+ph*r*.12,y0+r*.5],'#2a1c14',r*.06,r*.035)}
  /* กระดองอำพัน */const CP=[[-r*.66,r*.12+b],['q',-r*.72,-r*.5+b,-r*.05,-r*.6+b],['q',r*.5,-r*.56+b,r*.62,-r*.02+b],['q',r*.4,r*.26+b,-r*.66,r*.12+b]];
  if(W)vS(W,CP,'#fff',1,1.2);else{vP(CP);const gr=g.createLinearGradient(0,-r*.6+b,0,r*.2+b);gr.addColorStop(0,'rgba(255,214,110,.96)');gr.addColorStop(.55,'rgba(226,140,40,.94)');gr.addColorStop(1,'rgba(150,70,20,.95)');g.fillStyle=gr;g.fill();g.lineWidth=1.2;g.strokeStyle=V1.O;g.stroke();
    g.save();vP(CP);g.clip();g.globalCompositeOperation='lighter';
    /* ยางไหลวนในกระดอง */g.strokeStyle='rgba(255,240,170,.55)';g.lineWidth=r*.05;g.beginPath();for(let k=0;k<=20;k++){const u=k/20,x=-r*.55+u*r*1.1,y=-r*.22+Math.sin(u*9+T*2)*r*.1+b;k?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
    for(let k=0;k<5;k++){const p=(T*.4+k/5)%1;g.fillStyle='rgba(255,250,220,'+(.7*Math.sin(p*Math.PI))+')';g.beginPath();g.arc(-r*.4+k*r*.2,-r*.05-p*r*.4+b,r*.03,0,7);g.fill()}
    g.globalCompositeOperation='source-over';g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(-r*.2,-r*.42+b,r*.26,r*.07,-.25,0,7);g.fill();
    g.strokeStyle='rgba(120,60,10,.55)';g.lineWidth=r*.02;g.beginPath();g.moveTo(-r*.05,-r*.6+b);g.quadraticCurveTo(-r*.02,-r*.2+b,-r*.12,r*.14+b);g.stroke();g.restore()}
  /* หัวดำมันวาว */const hx=r*.6,hy=-r*.08+b;bvE(W,hx,hy,r*.2,r*.17,'#2a1810',1,1);if(!W){g.fillStyle='rgba(255,220,160,.35)';g.beginPath();g.ellipse(hx-r*.04,hy-r*.08,r*.09,r*.04,-.3,0,7);g.fill()}
  for(const s of[-1,1])vEye(W,hx+r*.08,hy-r*.04+s*r*.05,r*.03,r*.03,'#ffd060',W?0:5);
  /* เขี้ยวคีม */const op=.2+.15*Math.sin(T*5);for(const s of[-1,1]){g.save();g.translate(hx+r*.16,hy+s*r*.06);g.rotate(s*op);vS(W,[[0,-s*r*.02],['q',r*.2,-s*r*.08,r*.3,s*r*.06],['q',r*.16,s*r*.0,0,s*r*.05]],'#4a2a14',1,.7);g.restore()}
  /* หนวด */for(const s of[-1,1])vK(W,[[hx+r*.1,hy-r*.12],['q',hx+r*.3,hy-r*.4+s*r*.05,hx+r*.5+Math.sin(T*3+s)*r*.05,hy-r*.46+s*r*.1]],W?'#fff':'#3a2414',r*.022);
  /* ยางหยด */if(!W){const p=(T*.7)%1;g.fillStyle='rgba(255,200,80,'+(.9*(1-p))+')';g.beginPath();g.ellipse(-r*.3,r*.16+p*r*.5+b,r*.03,r*.05,0,0,7);g.fill()}
  return true};
MV1D[461]=(r,T,W,bob)=>{/* ผีเสื้อมอสพิษ: ปีกเป็นมอสเขียวนุ่ม ลายตาจุดเรือง ขอบปีกเป็นพู่ ตัวขนฟู หนวดขนนก สปอร์เขียวเรืองร่วงจากปีกตลอด */
  const fl=Math.sin(T*7),b=-r*.48+Math.sin(T*2)*r*.1,pu=.6+.4*Math.sin(T*3);
  vGlow(W,0,b,r*1.1,'170,255,120',.2*pu);
  for(const s of[-1,1]){const op=.55+.45*fl,ux=s*r*(.85*op+.25);
    const UP=[[s*r*.08,b-r*.06],['q',s*r*.3,b-r*.7*op-r*.1,ux,b-r*.6*op-r*.08],['q',s*r*(.95*op+.2),b-r*.1,s*r*(.5*op+.15),b+r*.06],['q',s*r*.25,b+r*.04,s*r*.08,b-r*.06]];
    const LP=[[s*r*.08,b+r*.02],['q',s*r*(.5*op+.15),b+r*.1,s*r*(.55*op+.18),b+r*.42],['q',s*r*.25,b+r*.5,s*r*.06,b+r*.1]];
    for(const[P,c1,c2]of[[LP,'#4a8a3a','#2e5a26'],[UP,'#6aaa4a','#3a6a2e']]){if(W){vS(W,P,'#fff',1,1);continue}vP(P);const gr=g.createRadialGradient(s*r*.2,b,r*.05,s*r*.3,b,r*.9);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.fill();g.lineWidth=1;g.strokeStyle=V1.O;g.stroke();
      g.save();vP(P);g.clip();g.fillStyle='rgba(200,240,150,.35)';for(let k=0;k<7;k++){g.beginPath();g.arc(s*r*(.15+k*.09*op),b-r*.2+Math.sin(k*2.3)*r*.2,r*.05,0,7);g.fill()}g.restore()}
    /* ลายตาจุดเรือง */if(!W){const ex=s*r*(.5*op+.12),ey=b-r*.3*op;g.fillStyle='#1e3a18';g.beginPath();g.ellipse(ex,ey,r*.1*op+r*.02,r*.08,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(ex,ey,r*.16,'220,255,130',.7*pu);g.restore();g.fillStyle='#f0ff9a';g.beginPath();g.ellipse(ex,ey,r*.045*op+r*.01,r*.04,0,0,7);g.fill()}
    /* พู่ขอบปีก */if(!W){g.strokeStyle='rgba(150,210,110,.7)';g.lineWidth=r*.012;for(let k=0;k<6;k++){const u=k/5,x=s*r*(.2+u*(.8*op+.1)),y=b-r*(.1+.5*op*Math.sin(u*Math.PI*.9));g.beginPath();g.moveTo(x,y);g.lineTo(x+s*r*.04,y-r*.06);g.stroke()}}}
  bvE(W,0,b,r*.1,r*.3,'#5a6a3a',1,1);if(!W){g.strokeStyle='rgba(40,50,20,.6)';g.lineWidth=r*.015;for(let k=0;k<4;k++){g.beginPath();g.moveTo(-r*.08,b-r*.12+k*r*.09);g.lineTo(r*.08,b-r*.1+k*r*.09);g.stroke()}}
  bvE(W,0,b-r*.32,r*.09,r*.08,'#4a5a2e',1,.8);for(const s of[-1,1]){vEye(W,s*r*.045,b-r*.34,r*.03,r*.03,'#e8ff7a',W?0:5);vK(W,[[s*r*.03,b-r*.38],['q',s*r*.12,b-r*.6,s*r*.2,b-r*.62]],W?'#fff':'#c8d8a0',r*.015);if(!W){g.strokeStyle='rgba(200,216,160,.6)';g.lineWidth=r*.01;for(let k=0;k<3;k++){const u=.5+k*.18,x=s*(r*.03+r*.17*u),y=b-r*.38-r*.24*u;g.beginPath();g.moveTo(x,y);g.lineTo(x+s*r*.04,y+r*.02);g.stroke()}}}
  /* สปอร์ร่วง */if(!W)for(let k=0;k<6;k++){const p=(T*.35+k/6)%1;g.fillStyle='rgba(190,255,120,'+(.8*(1-p))+')';g.beginPath();g.arc(Math.sin(k*2.1+T)*r*.5,b+r*.2+p*r*.9,r*.02+r*.015*(1-p),0,7);g.fill()}
  return true};
MV1D[462]=(r,T,W,bob,sw0,la,ra)=>{/* หุ่นรากหลงคำสั่ง: ร่างคนสานจากรากไม้ หน้ากากเปลือกไม้แกะสลัก ตาโพรงเรืองอำพัน บ่ามีมอสและเห็ด แกนยางทองที่อกหรี่ ๆ ถือหอกรากแหลม · เดินโซเซเหมือนลืมว่าต้องเฝ้าอะไร */
  const b=(bob||0)*.5,sway=Math.sin(T*1.6)*.06,pu=.5+.5*Math.sin(T*2.2),RT='#5a3e26',RD='#3a2616',RL='#7a5a3a';
  g.save();g.rotate(sway);
  /* ขารากพันเป็นเกลียว */for(const[s,l]of[[-1,la||0],[1,ra||0]]){vLimb(W,[s*r*.16,r*.16+b,s*r*.22,r*.48,s*r*.2,r*.8-l],RD,r*.12,r*.08);if(!W){g.strokeStyle=RL;g.lineWidth=r*.025;for(let k=0;k<3;k++){g.beginPath();g.moveTo(s*r*.12,r*(.22+k*.18));g.lineTo(s*r*.28,r*(.3+k*.18));g.stroke()}}
    vS(W,[[s*r*.2-r*.12,r*.78-l],[s*r*.2+r*.14,r*.78-l],[s*r*.2+r*.18,r*.86-l],[s*r*.2-r*.12,r*.86-l]],RT,1,.6)}
  /* แขนหลัง */vLimb(W,[-r*.3,-r*.36+b,-r*.5,-r*.06+b,-r*.42,r*.22+b],RD,r*.11,r*.07);
  /* ลำตัวรากสาน */const BP=[[-r*.32,-r*.5+b],[r*.32,-r*.5+b],['q',r*.38,-r*.1+b,r*.24,r*.2+b],[-r*.24,r*.2+b],['q',-r*.38,-r*.1+b,-r*.32,-r*.5+b]];vS(W,BP,RT,1,1.1);
  if(!W){g.save();vP(BP);g.clip();g.strokeStyle=RD;g.lineWidth=r*.05;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(-r*.5,-r*.5+k*r*.14+b);g.quadraticCurveTo(0,-r*.4+k*r*.14+b,r*.5,-r*.5+k*r*.14+b+r*.18);g.stroke()}g.strokeStyle=RL;g.lineWidth=r*.018;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(-r*.5,-r*.52+k*r*.14+b);g.quadraticCurveTo(0,-r*.42+k*r*.14+b,r*.5,-r*.52+k*r*.14+b+r*.18);g.stroke()}g.restore()}
  /* แกนยางทองที่อก (หรี่) */vGlow(W,0,-r*.2+b,r*.3,'255,180,70',.45*pu);wE(W,0,-r*.2+b,r*.08,r*.09,W?'#fff':'rgba(255,190,80,'+(.5+.4*pu)+')');
  /* บ่ามอส + เห็ด */for(const s of[-1,1]){bvE(W,s*r*.3,-r*.5+b,r*.14,r*.08,'#4a7a34',1,.6);if(!W){g.fillStyle='#e8dcc4';g.fillRect(s*r*.34-r*.01,-r*.62+b,r*.02,r*.05);g.fillStyle=s<0?'#d85a4a':'#e8a040';g.beginPath();g.ellipse(s*r*.34,-r*.62+b,r*.05,r*.03,0,Math.PI,0);g.fill()}}
  /* หัว: หน้ากากเปลือกไม้ */const hy=-r*.72+b;bvE(W,0,hy,r*.2,r*.22,RT,1,1);
  vS(W,[[-r*.16,hy-r*.16],[r*.16,hy-r*.16],[r*.15,hy+r*.12],[0,hy+r*.2],[-r*.15,hy+r*.12]],'#a8865a',1,.8);
  if(!W){g.strokeStyle='rgba(90,60,30,.6)';g.lineWidth=r*.015;g.beginPath();g.moveTo(-r*.12,hy-r*.08);g.lineTo(r*.12,hy-r*.08);g.moveTo(0,hy-r*.16);g.lineTo(0,hy+r*.18);g.stroke()}
  for(const s of[-1,1]){wE(W,s*r*.07,hy-r*.02,r*.035,r*.045,'#1a0e06');vGlow(W,s*r*.07,hy-r*.02,r*.07,'255,170,60',.6*pu);vEye(W,s*r*.07,hy-r*.02,r*.022,r*.03,'#ffb040',W?0:6)}
  /* เขาราก */for(const s of[-1,1])vK(W,[[s*r*.12,hy-r*.16],['q',s*r*.2,hy-r*.34,s*r*.3,hy-r*.38]],W?'#fff':RD,r*.035);
  /* แขนหน้าถือหอกราก */const ax=r*.46,ay=-r*.1+b;vLimb(W,[r*.3,-r*.36+b,r*.5,-r*.2+b,ax,ay],RD,r*.11,r*.07);
  g.save();g.translate(ax,ay);g.rotate(-1.15+Math.sin(T*2)*.08);vS(W,[[-r*.025,-r*.5],[r*.025,-r*.5],[r*.03,r*.4],[-r*.03,r*.4]],RT,1,.6);vS(W,[[-r*.06,-r*.5],[0,-r*.78],[r*.06,-r*.5]],'#c8a070',1,.6);if(!W){g.strokeStyle='#4a7a34';g.lineWidth=r*.02;g.beginPath();g.moveTo(-r*.03,-r*.3);g.quadraticCurveTo(-r*.12,-r*.24,-r*.08,-r*.14);g.stroke()}g.restore();
  g.restore();return true};
MV1S[460]=1.6;MV1S[461]=1.5;MV1S[462]=1.9;

/* ---------- เฒ่าแก่นไม้: ผู้นำนครรากลึก · หลังค่อม ผิวเปลือกไม้เป็นร่องลึก เคราเป็นมอสยาวถึงพื้น เห็ดเล็กขึ้นบนบ่า ตาอำพันครึ่งหลับ
   เสื้อคลุมทอใยราก ผ้าคลุมใบไม้แห้ง ไม้เท้ารากมีชีวิต ปลายเป็นลูกแก้วยางทองเรืองแสง ใบอ่อนงอกจากไม้เท้า ---------- */
function kedV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,OL='#24180e',br=Math.sin(t*1.1)*.3,wd=Math.sin(t*1.4),SK=['#b88a5e','#8a6040','#5a3e26'];
  NPK.sh(x,y+16,13);g.save();g.translate(x,y);g.scale(f*1.34,1.34);g.lineJoin='round';g.lineCap='round';
  if(!LOWQ)glow(8,-20,26,'255,190,90',.16+.06*Math.sin(t*1.6));
  const hy=-12.6+br*.3;
  /* เสื้อคลุมยาวทอใยราก (หลังค่อม: ไหล่โน้มไปหน้า) */
  P([-6.4,-8+br*.3,5.6,-9.6+br*.3,7.6,6,8.6,14.4,3,15,-3,15,-8.4,14.4,-7.6,4],LG(-6,-9,6,15,['#7a6040','#5a4428','#3a2a18']),OL,.8);
  g.strokeStyle='rgba(30,20,10,.45)';g.lineWidth=.4;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(k*1.8,-8+br*.3);g.lineTo(k*2.2,14.6);g.stroke()}
  /* ผ้าคลุมใบไม้แห้ง */for(let k=0;k<7;k++){const a=-2.8+k*.42,lx=Math.cos(a)*6.4,ly=-8.6+Math.sin(a)*2+br*.3+(k%2)*.9;P([lx-1.8,ly,lx,ly-1.4,lx+2,ly+.2,lx+.4,ly+3],LG(0,ly-1,0,ly+3,[k%2?'#a8843e':'#8a6a30','#5a4420']),OL,.4)}
  /* เข็มขัดรากถัก + ถุงเมล็ด */R(-7,1+br*.2,14,1.8,.6,'#4a3420',OL);P([-6.4,2.4,-3.6,2.4,-3.2,6,-6,6.4],'#6a5030',OL,.4);E(-4.8,3.6,.6,.6,'#ffcc6a');
  /* เคราเป็นมอสยาวถึงพื้น */
  {const B=[[-3.4,hy+3],[3.6,hy+3.2],[4.2,hy+9],[3,hy+16],[2+wd*.4,hy+24],[.6+wd*.6,hy+28.4],[-.8+wd*.6,hy+27.6],[-1.8+wd*.4,hy+22],[-3,hy+15],[-4,hy+8]];g.beginPath();B.forEach(([px,py],k)=>k?g.lineTo(px,py):g.moveTo(px,py));g.closePath();g.fillStyle=LG(0,hy+3,0,hy+28,['#8ac868','#5a9a46','#3a6e30']);g.fill();g.strokeStyle=OL;g.lineWidth=.55;g.stroke();
    g.strokeStyle='rgba(30,60,24,.45)';g.lineWidth=.35;for(let k=0;k<5;k++){g.beginPath();g.moveTo(-2.4+k*1.2,hy+5);g.quadraticCurveTo(-2+k*1.1+wd*.3,hy+15,-1.4+k*.8+wd*.5,hy+25);g.stroke()}
    if(!LOWQ)for(let k=0;k<6;k++){const q=.5+.5*Math.sin(t*2+k*1.4);g.fillStyle='rgba(220,255,150,'+(.3+.6*q)+')';g.beginPath();g.arc(-1.6+(k%3)*1.4+wd*.2,hy+8+k*3,.38,0,7);g.fill()}}
  /* แขนหลัง (มือไขว้หลัง) */NP3.arm(-5.6,-6.6+br*.3,-8,-1.6,-6.6,2.4,'#6a5034',SK[0]);
  /* หน้า: เปลือกไม้ร่องลึก */
  E(.6,hy,5.6,5.8,LG(0,hy-6,0,hy+6,SK),OL,.55);
  g.strokeStyle='rgba(50,30,14,.55)';g.lineWidth=.4;for(const[x0,y0,x1,y1]of[[-3.6,hy-3.4,-3,hy+2],[-1.6,hy-4.6,-1.2,hy-1.6],[5.8,hy-2.6,5.4,hy+2.4],[1.4,hy+1.8,2.4,hy+3.6],[-2.6,hy+2.8,-1.6,hy+4.2]]){g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke()}
  /* คิ้วมอสหนา + ตาอำพันครึ่งหลับ */for(const ex of[2.4,5])P([ex-1.6,hy-1.8,ex+1.6,hy-2.2,ex+1.4,hy-1.2,ex-1.4,hy-.9],'#7ab860',OL,.3);
  const blink=(t%5.3)<.16;for(const ex of[2.4,5]){if(blink){g.strokeStyle='#2a1808';g.lineWidth=.5;g.beginPath();g.moveTo(ex-.9,hy+.1);g.lineTo(ex+.9,hy+.1);g.stroke()}else{E(ex,hy+.2,.85,.55,'#ffcc5a',null);E(ex+.1,hy+.24,.34,.4,'#2a1406',null);g.strokeStyle='#2a1808';g.lineWidth=.55;g.beginPath();g.moveTo(ex-1,hy-.2);g.lineTo(ex+1,hy-.3);g.stroke()}}
  if(!LOWQ){glow(2.4,hy+.2,2,'255,200,90',.14);glow(5,hy+.2,2,'255,200,90',.14)}
  P([3.2,hy+.8,4.6,hy+1.2,4.2,hy+2.6],'#8a6040',OL,.35);
  /* ผมมอสบนหัว + เห็ดเล็กบนหัวและบ่า */
  g.beginPath();g.moveTo(-5.6,hy+1);g.quadraticCurveTo(-6.4,hy-6.6,.6,hy-6.8);g.quadraticCurveTo(7,hy-6.4,6.6,hy-1.6);g.quadraticCurveTo(4,hy-4.4,1,hy-4);g.quadraticCurveTo(-2.6,hy-3.8,-4,hy+1.6);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+1,['#9ad078','#5a9a46']);g.fill();g.strokeStyle=OL;g.lineWidth=.5;g.stroke();
  for(const[mx,my,c,s]of[[-2.6,hy-6.4,'#d85a4a',1],[1.6,hy-7.2,'#e8a040',.8],[6,-9.8+br*.3,'#d85a4a',.9],[-6.2,-8.4+br*.3,'#c8b8e8',.8]]){R(mx-.3*s,my,.6*s,1.4*s,.2,'#f0e6d0',OL);P([mx-1.6*s,my+.2,mx,my-1.4*s,mx+1.6*s,my+.2],c,OL,.3)}
  /* แขนหน้าถือไม้เท้าราก */
  {const hx=8.2,hh=-2+br*.2;NP3.arm(5,-7.6+br*.3,7.8,-4,hx,hh,'#6a5034',SK[0]);
    g.strokeStyle=LG(hx,15,hx,-22,['#3a2614','#6a4a2a','#4a3220']);g.lineWidth=1.5;g.beginPath();g.moveTo(hx+.6,15);g.quadraticCurveTo(hx-1,0,hx+1.2,-14);g.quadraticCurveTo(hx+2.4,-19,hx,-21);g.stroke();
    g.strokeStyle='#4a3220';g.lineWidth=.8;g.beginPath();g.moveTo(hx+1.2,-14);g.quadraticCurveTo(hx+3.6,-17,hx+2.6,-21.6);g.moveTo(hx+.8,-15);g.quadraticCurveTo(hx-1.6,-18,hx-.8,-22);g.stroke();
    P([hx-1.6,-10,hx-4.2,-11.2,hx-3.6,-9.4],'#7ac060',OL,.3);P([hx+1.6,-6,hx+4,-6.8,hx+3.4,-5.2],'#6ab050',OL,.3);
    const ox=hx+.8,oy=-22.4,pu=.75+.25*Math.sin(t*2.2);if(!LOWQ){glow(ox,oy,12,'255,190,80',.5*pu);glow(ox,oy,4,'255,240,190',.7*pu)}E(ox,oy,2,2,LG(ox,oy-2,ox,oy+2,['#fff2b0','#ffb840','#c87a10']),OL,.4);g.fillStyle='rgba(255,255,255,.8)';g.fillRect(ox-.9,oy-1.1,.6,.6)}
  g.restore()}
function kedD0(x,y,f,T){g.save();g.translate(x,y);g.scale(f,1);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,16,12,4,0,0,7);g.fill();g.fillStyle='#5a4428';g.fillRect(-8,-10,16,26);g.fillStyle='#a87c54';g.beginPath();g.arc(0,-16,7,0,7);g.fill();g.fillStyle='#6aa048';g.fillRect(-3,-12,6,26);g.restore()}

/* ---------- ชาวรากลึก 6 แบบ: ผิวลายเปลือกไม้ ผมมอส เสื้อทอใยราก ---------- */
const PBFK=[{sk:['#d8b088','#b88a60','#8a6040'],hair:['#8ad070','#4a9a44'],body:['#a07a50','#6a4e30'],skirt:['#5a7a3e','#3a5228']},
 {sk:['#c8a07a','#a07450','#704e30'],hair:['#6ab060','#3a7a36'],body:['#7a6a4a','#4e4430']},
 {sk:['#e0b890','#c09068','#906a48'],hair:['#a8e888','#5aa04a'],body:['#c8a060','#8a6a3a'],kid:1},
 {sk:['#c09870','#9a7050','#6a4a30'],hair:['#c8d8b8','#8aa078'],body:['#8a5a4a','#5a3a30'],skirt:['#6a5a3a','#4a3e28'],old:1},
 {sk:['#d0a880','#a87e58','#7a5638'],hair:['#7ac868','#3e8a3a'],body:['#5a6a4a','#3a4630']},
 {sk:['#e8c098','#c49870','#946e4c'],hair:['#9ae070','#4a9a40'],body:['#d88a5a','#a0583a'],kid:1}];
function pbFolkV(x,y,f,t,v){const{O,LG,P,E,R,glow}=NPK,K=PBFK[v%6],br=Math.sin(t*1.6+v)*.4,s=K.kid?.82:1;NPK.sh(x,y+16,K.kid?8:10);g.save();g.translate(x,y+(K.kid?3:0));g.scale(f*1.1*s,1.1*s);g.lineJoin='round';g.lineCap='round';
  const hy=-15.2+br*.4+(K.old?.9:0);
  NP3.legs(K.skirt?K.skirt[1]:'#4a3a28',['#6a4a2a','#3a2a18'],K.skirt?8:6);NP3.coat([K.body[0],K.body[1],K.body[1]],br);if(K.skirt)P([-6.4,1,6.4,1,7.4,10.6,-7.4,10.6],LG(0,1,0,11,K.skirt),O,.7);
  g.strokeStyle='rgba(40,26,12,.4)';g.lineWidth=.4;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(k*2,-8.6);g.lineTo(k*2.4,6);g.stroke()}
  R(-6,1.4,12,1.6,.5,'#4a3420',O);
  /* ของที่ถือ (แขนหลัง) */NP3.arm(-5,-8.4+br*.3,-7,-3,-5.6,1.4,K.body[1],K.sk[0]);
  if(v===3){P([-9.6,-.4,-4.4,-.4,-5,4.2,-9,4.2],LG(0,0,0,4,['#a8844a','#6a5030']),O,.5);g.fillStyle='#8ac868';for(let k=0;k<3;k++){g.beginPath();g.arc(-8.4+k*1.6,-.8,1,0,7);g.fill()}}
  if(v===4){P([-10,-6,-5.4,-7,-5,4,-9.4,5],LG(-10,0,-5,0,['#8a6a44','#5a4428']),O,.6);g.strokeStyle='#ffcc6a';g.lineWidth=.6;g.beginPath();g.arc(-7.4,-1,1.8,0,7);g.stroke()}
  /* แขนหน้า */const wv=v===5?Math.sin(t*6)*.8:0;if(v===5)NP3.arm(5,-8.4+br*.3,8.6,-12,7.6+wv,-17,K.body[0],K.sk[0]);else NP3.arm(5,-8.4+br*.3,7,-3,5.8,1.4,K.body[0],K.sk[0]);
  if(v===1){g.strokeStyle='#5a3e24';g.lineWidth=1;g.beginPath();g.moveTo(6.4,14);g.lineTo(7.4,-24);g.lineTo(11,-24);g.stroke();const fk=.75+.25*Math.sin(t*5+v);if(!LOWQ)glow(11,-20.6,10,'120,255,220',.45*fk);P([8.6,-21,11,-23,13.4,-21],'#6ae0c8',O,.4);R(10.6,-21,.8,1.6,.3,'#e8fff8',O)}
  if(v===2){const fk=.7+.3*Math.sin(t*3+v);if(!LOWQ)glow(6.6,-1,8,'120,255,220',.45*fk);P([4.2,-.4,6.6,-3,9,-.4],'#7af0d8',O,.4);R(6.2,-.4,.8,2,.3,'#e8fff8',O)}
  NP3.face(hy,K.sk,{eye:'#2a1406',brow:'#3a5a2a'});
  g.strokeStyle='rgba(90,56,30,.4)';g.lineWidth=.3;g.beginPath();g.moveTo(-3,hy+1.2);g.lineTo(-2.6,hy+3.6);g.stroke();
  /* ผมมอส */g.beginPath();g.moveTo(-5.6,hy+2.4);g.quadraticCurveTo(-6.6,hy-6.4,.6,hy-6.8);g.quadraticCurveTo(7,hy-6.4,6.6,hy-1);g.quadraticCurveTo(4,hy-4,1,hy-3.4);g.quadraticCurveTo(-2.6,hy-3.4,-3.6,hy+3);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+3,[K.hair[0],K.hair[1]]);g.fill();g.strokeStyle=O;g.lineWidth=.45;g.stroke();
  for(const[dx,dy,rr]of[[-5.4,-2.6,2.2],[-3.2,-5.8,2],[2.4,-6.4,2],[5.4,-4,1.8]])E(dx,hy+dy,rr,rr*.9,K.hair[0],O,.3);
  if(!LOWQ){g.fillStyle='rgba(230,255,160,.8)';for(const[dx,dy]of[[-3,-4.6],[2,-5.4]]){g.beginPath();g.arc(dx,hy+dy,.35,0,7);g.fill()}}
  /* ไหบนหัว (แบบ 0) */if(v===0){const jy=hy-9.4;P([-3,jy+3,-3.6,jy-1,-2,jy-3.6,2,jy-3.6,3.6,jy-1,3,jy+3],LG(0,jy-4,0,jy+3,['#c8945a','#8a5a30']),O,.5);R(-1.6,jy-4.8,3.2,1.4,.5,'#a87a4a',O);g.fillStyle='rgba(255,210,100,.85)';g.beginPath();g.ellipse(0,jy-3.6,1.4,.5,0,0,7);g.fill()}
  g.restore()}

/* ---------- บอส: ตัวกัดรากยักษ์ (จิ้งหรีดตุ่นยักษ์เกราะหิน · ขาหน้าเป็นพลั่วขุด · คีมกราม · หลังเต็มไปด้วยผลึกยางทองที่มันกัดกินมา) ---------- */
BV1['ตัวกัดรากยักษ์']=(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.35*Math.sin(T*1.6),bur=typeof PTW!=='undefined'&&PTW.bur>0,BR='#6a4a30',BD='#3e2a1a',BL='#9a7650';
  if(bur){/* ดำดิน: เหลือแต่เนินดินเคลื่อนที่ + ฝุ่น */bvShadow(70,16,.35);vS(W,[[-70,20],['q',-40,-26,0,-30],['q',40,-26,70,20],['q',0,34,-70,20]],'#6a5236',1,1.2);if(!W){g.fillStyle='rgba(150,120,80,.6)';for(let k=0;k<8;k++){const p=(T*1.4+k/8)%1;g.beginPath();g.arc(-60+k*17,10-p*40,4+p*6,0,7);g.fill()}g.fillStyle='rgba(40,28,16,.55)';g.beginPath();g.ellipse(0,-10,30,10,0,0,7);g.fill()}
    for(const s of[-1,1])vS(W,[[s*20,-18],[s*34,-40+Math.sin(T*9)*4],[s*28,-20]],'#c8b090',1,.8);return}
  bvShadow(96,22,.35);
  /* ขาหลัง 4 ขา */for(const[s,k]of[[-1,0],[1,0],[-1,1],[1,1]]){const ph=Math.sin(T*3+k*2+s)*4;vLimb(W,[s*(30+k*16),-6+b,s*(52+k*20),12+ph,s*(60+k*24),34],BD,9,5)}
  /* ลำตัวปล้องเกราะ */for(let k=3;k>=0;k--){const y=-24+b-k*4,x=-46+k*22,rw=44-k*4,rh=30-k*2;bvE(W,x,y,rw,rh,k%2?BR:'#5a3e28',1,1.3);
    if(!W){g.fillStyle='rgba(255,255,255,.12)';g.beginPath();g.ellipse(x-8,y-rh*.5,rw*.5,rh*.2,-.2,0,7);g.fill();g.strokeStyle='rgba(30,18,8,.5)';g.lineWidth=2;g.beginPath();g.ellipse(x,y,rw*.8,rh*.7,0,3.4,6);g.stroke()}}
  /* ผลึกยางทองบนหลัง */for(const[x,y,h,a]of[[-60,-52,26,-.3],[-40,-60,34,-.1],[-18,-62,30,.15],[4,-56,24,.35],[-74,-40,18,-.5]]){g.save();g.translate(x,y+b);g.rotate(a);vS(W,[[-7,0],[-3,-h],[0,-h-6],[4,-h+2],[7,0]],W?'#fff':'#ffb83a',1,1);if(!W){g.fillStyle='rgba(255,240,180,.7)';g.beginPath();g.moveTo(-3,0);g.lineTo(-1.5,-h);g.lineTo(0,-h-5);g.lineTo(0,0);g.closePath();g.fill()}g.restore();bvAdd(W,()=>glowAt(x,y-h*.5+b,20,'255,180,70',.3*pu))}
  /* หัว + คีมกราม */const hx=44,hy=-20+b;bvE(W,hx,hy,30,26,'#4a3220',1,1.4);if(!W){g.fillStyle='rgba(255,230,180,.18)';g.beginPath();g.ellipse(hx-6,hy-12,16,6,-.2,0,7);g.fill()}
  for(const s of[-1,1]){const op=.25+.2*Math.sin(T*4)+cf*.2;g.save();g.translate(hx+22,hy+s*10);g.rotate(s*op);vS(W,[[0,-s*4],['q',22,-s*14,34,s*6],['q',26,s*2,22,s*4],['q',14,0,0,s*8]],'#2a1a0e',1,1);if(!W){g.fillStyle='rgba(255,220,160,.3)';g.beginPath();g.ellipse(14,-s*4,8,2,0,0,7);g.fill()}g.restore()}
  for(const s of[-1,1]){vEye(W,hx+10,hy-8+s*7,3.6,3.2,'#ffcc40',W?0:8);bvAdd(W,()=>glowAt(hx+10,hy-8+s*7,8,'255,200,80',.5))}
  /* หนวด */for(const s of[-1,1])vK(W,[[hx+6,hy-20],['q',hx+30,hy-60+s*8,hx+60+Math.sin(T*3+s)*8,hy-66+s*12]],W?'#fff':'#2a1a0e',2.4);
  /* ขาหน้าเป็นพลั่วขุด */for(const s of[-1,1]){const dig=Math.sin(T*5+(s>0?0:2))*8;const ex=hx+4+s*6,ey=hy+16;vLimb(W,[hx-6,hy+14,ex+8,ey+16,ex+22,ey+22+dig*.3],BD,11,8);
    g.save();g.translate(ex+24,ey+24+dig*.3);g.rotate(.3+dig*.02);vS(W,[[-8,-6],[12,-10],[20,0],[16,8],[-6,8]],'#5a4a3a',1,1.2);for(let k=0;k<4;k++)vS(W,[[10+k*3-12,6],[13+k*3-12,14],[16+k*3-12,6]],'#c8b8a0',1,.6);g.restore()}
  if(!W&&!LOWQ&&cf>0){g.save();g.globalCompositeOperation='lighter';glowAt(0,-30+b,110,'255,170,70',.22*cf);g.restore()}};
BVS['ตัวกัดรากยักษ์']=1.4;
