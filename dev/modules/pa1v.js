
/* ===== v547 ภาค 10 บทที่ 1 — ภาพ: มอนธีม 45 (ตัวกัดหิน · ค้างคาวรากเรือง · ยักษ์ดินถล่ม) · ธุลี เด็กคนรากลึก · ชาวค่ายที่ติดอยู่ 5 คน · แพะ · ภาพสลักบนราก
   มอนใช้ชุด vS/vD/bvE/wE แบบ v545 · NPC ใช้ NPK/NP3 + แคช npvW แบบ v515–v544 · error ของ NPC → วาดแบบง่ายแทน ===== */
/* ---------- มอนธีม 45 (แมพ 43 ปากเหวแผ่นดินทรุด) ---------- */
MV1D[450]=(r,T,W,bob)=>{/* ตัวกัดหิน: หนอนยักษ์เกราะหินโผล่จากรูดินแตก ลำตัวปล้องโค้งตัว S หนามหินบนหลัง รอยต่อปล้องเรืองอำพัน
   หัวโตมีเกราะสามแผ่นแผ่ไปข้างหลัง คีมหินสองข้าง ปากกลมฟันหินสองวงหมุนสวนกัน แกนปากเรืองอำพัน เศษหินร่วง */
  const sw=Math.sin(T*1.8)*r*.1,pu=.6+.4*Math.sin(T*3),ch=T*2.6,lg=Math.max(0,Math.sin(T*1.15))*r*.07;
  if(!W){g.fillStyle='rgba(40,28,18,.55)';g.beginPath();g.ellipse(0,r*.76,r*.7,r*.18,0,0,7);g.fill()}
  wE(W,0,r*.72,r*.58,r*.15,'#6a5442');if(!W){g.fillStyle='#160e08';g.beginPath();g.ellipse(r*.02,r*.72,r*.4,r*.09,0,0,7);g.fill()}vGlow(W,0,r*.72,r*.34,'255,160,60',.24*pu);
  for(const[dx,dy,s]of[[-.6,.68,.09],[-.42,.84,.07],[.52,.66,.08],[.64,.8,.06],[.22,.88,.05],[-.16,.9,.05],[.4,.9,.04]])bvE(W,dx*r,dy*r,s*r*1.3,s*r,'#7a6a5a',1,.6);
  const N=8,P=[];for(let k=0;k<=N;k++){const q=k/N;P.push([Math.sin(q*3.3-.5)*r*.24+sw*q+q*r*.1+lg*q,r*.66-q*r*1.22])}
  for(let k=0;k<N;k++){const[x,y]=P[k],q=k/N,rr=r*(.19+.09*Math.sin(q*Math.PI*.95+.25));
    if(!W&&k>0){g.fillStyle='rgba(255,'+(150+60*pu|0)+',60,.9)';g.beginPath();g.ellipse(x,y+rr*.62,rr*.95,rr*.24,0,0,7);g.fill()}
    bvE(W,x,y,rr*1.16,rr*.9,k%2?'#625850':'#6e645a',1,1);
    vS(W,[[x-rr*.95,y-rr*.1],['q',x-rr*.7,y-rr*.95,x,y-rr*.92],['q',x+rr*.72,y-rr*.95,x+rr*.95,y-rr*.12],['q',x,y-rr*.42,x-rr*.95,y-rr*.1]],k%2?'#8a7e70':'#988a7a',1,.6);
    if(!W){g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.ellipse(x-rr*.3,y-rr*.66,rr*.32,rr*.1,-.2,0,7);g.fill()}
    if(k%2===0&&k<N-1)vS(W,[[x-rr*.2,y-rr*.86],[x+rr*.02,y-rr*1.32],[x+rr*.24,y-rr*.86]],'#a89a86',1,.6)}
  /* หัว */
  const[hx,hy]=P[N],hr=r*.32;
  for(const[a,c]of[[-.9,'#8c8070'],[-.45,'#a09280'],[0,'#b4a690']])vS(W,[[hx-hr*.2,hy-hr*.55],['q',hx-hr*1.1+Math.cos(a)*hr*.2,hy-hr*1.3+Math.sin(a)*hr*.3,hx-hr*1.25,hy-hr*.55+a*hr*.6],['q',hx-hr*.6,hy-hr*.2,hx-hr*.2,hy-hr*.55]],c,1,.7);
  bvE(W,hx,hy,hr*1.05,hr*.92,'#7a6e62',1,1.1);
  vS(W,[[hx-hr*.8,hy-hr*.35],['q',hx-hr*.3,hy-hr*1.05,hx+hr*.55,hy-hr*.7],['q',hx+hr*.2,hy-hr*.42,hx-hr*.8,hy-hr*.35]],'#a49682',1,.7);
  for(const[dx,dy]of[[-.3,-.42],[.0,-.55],[.28,-.48]]){vGlow(W,hx+dx*hr,hy+dy*hr,r*.06,'255,190,80',.55);vEye(W,hx+dx*hr,hy+dy*hr,r*.024,r*.02,'#ffc04a',W?0:5)}
  /* คีมหินสองข้าง */
  for(const s of[-1,1]){const op=Math.sin(T*3.4+s)*.18;g.save();g.translate(hx+hr*.55,hy+s*hr*.42);g.rotate(s*(.35+op));vS(W,[[0,-s*hr*.08],['q',hr*.5,-s*hr*.22,hr*.72,s*hr*.12],['q',hr*.42,s*hr*.04,0,s*hr*.12]],'#c8baa0',1,.7);g.restore()}
  /* ปากกลม (หันไปด้านหน้า) */
  const mx=hx+hr*.52,my=hy+hr*.12,op=.72+.28*Math.sin(T*2.4);wE(W,mx,my,hr*.42*op,hr*.56*op,'#22140a');vGlow(W,mx,my,hr*.6,'255,150,50',.6*pu);
  if(!W){g.fillStyle='rgba(255,'+(140+60*pu|0)+',50,.9)';g.beginPath();g.ellipse(mx,my,hr*.16*op,hr*.22*op,0,0,7);g.fill()}
  for(let ring=0;ring<2;ring++){const n=ring?7:10,rx=hr*(ring?.24:.38)*op,ry=hr*(ring?.32:.5)*op;for(let k=0;k<n;k++){const a=k/n*6.283+(ring?-ch:ch),x=mx+Math.cos(a)*rx,y=my+Math.sin(a)*ry;g.save();g.translate(x,y);g.rotate(a+Math.PI/2);vFang(W,0,0,r*.045,r*.065,ring?'#d8ccb4':'#ece2cc');g.restore()}}
  /* เศษหินกระเด็น + ร่วงจากลำตัว */
  if(!W){for(let k=0;k<4;k++){const p=(T*1.4+k/4)%1,a=-.6+k*.45;g.fillStyle='rgba(160,146,128,'+(1-p)+')';g.fillRect(mx+Math.cos(a)*p*r*.7,my+Math.sin(a)*p*r*.3+p*p*r*.5,r*.045,r*.04)}
    for(let k=0;k<3;k++){const p=(T*.8+k/3)%1,[x,y]=P[2+k*2];g.fillStyle='rgba(120,100,80,'+(.8*(1-p))+')';g.fillRect(x+(k-1)*r*.1,y+p*r*.5,r*.035,r*.035)}}
  return true};
MV1D[451]=(r,T,W,bob)=>{/* ค้างคาวรากเรือง: ขนน้ำตาลไหม้ หูใหญ่ในหูเรืองอำพัน ปีกพังผืดมีเส้นเลือดเป็นรากเรืองแสง ขอบปีกหยัก ตาอำพันโต เขี้ยวเล็ก เท้ามีรากห้อย ยางอำพันหยด */
  const fl=Math.sin(T*9),b=-r*.42+Math.sin(T*2.2)*r*.08+fl*r*.04,pu=.6+.4*Math.sin(T*3.4);
  vGlow(W,0,b,r*1.05,'255,170,70',.18*pu);
  for(const s of[-1,1]){const up=fl*.55,tipx=s*r*1.05,tipy=b-r*.55*up-r*.05,midx=s*r*.62,midy=b-r*.38*up+r*.02,
      P=[[s*r*.14,b-r*.12],['q',s*r*.4,b-r*.42*up-r*.2,midx,midy-r*.12],['q',s*r*.86,b-r*.5*up-r*.16,tipx,tipy],
         ['q',s*r*.92,b+r*.1-r*.2*up,s*r*.8,b+r*.22-r*.15*up],['q',s*r*.7,b+r*.12,s*r*.6,b+r*.26-r*.1*up],['q',s*r*.48,b+r*.14,s*r*.36,b+r*.26-r*.05*up],['q',s*r*.26,b+r*.1,s*r*.14,b+r*.12]];
    if(W)vS(W,P,'#fff',1,1);else{vP(P);const gr=g.createLinearGradient(0,b-r*.5,0,b+r*.3);gr.addColorStop(0,'rgba(92,62,46,.94)');gr.addColorStop(1,'rgba(62,40,30,.84)');g.fillStyle=gr;g.fill();g.lineWidth=1;g.strokeStyle=V1.O;g.stroke();
      g.save();vP(P);g.clip();g.lineCap='round';
      for(const[ex,ey,w2]of[[tipx,tipy,.03],[s*r*.8,b+r*.2-r*.15*up,.024],[s*r*.6,b+r*.24-r*.1*up,.022],[s*r*.36,b+r*.24-r*.05*up,.02]]){
        g.strokeStyle='rgba(255,'+(160+50*pu|0)+',70,.88)';g.lineWidth=r*w2;g.beginPath();g.moveTo(s*r*.16,b-r*.1);g.quadraticCurveTo((s*r*.16+ex)/2+s*r*.04,(b-r*.1+ey)/2-r*.08,ex,ey);g.stroke();
        const mx2=(s*r*.16+ex)*.55,my2=(b+ey)*.55-r*.05;g.lineWidth=r*w2*.5;g.beginPath();g.moveTo(mx2,my2);g.lineTo(mx2+s*r*.08,my2+r*.1);g.stroke()}
      g.globalCompositeOperation='lighter';glowAt(s*r*.5,b-r*.1,r*.4,'255,170,70',.18*pu);g.restore()}}
  for(const s of[-1,1]){vS(W,[[s*r*.08,b-r*.3],['q',s*r*.12,b-r*.66,s*r*.26,b-r*.72],['q',s*r*.3,b-r*.46,s*r*.22,b-r*.26]],'#5a3e30',1,.8);vD(W,[[s*r*.13,b-r*.34],['q',s*r*.16,b-r*.58,s*r*.23,b-r*.62],['q',s*r*.25,b-r*.44,s*r*.2,b-r*.3]],'rgba(255,170,90,.75)')}
  bvE(W,0,b,r*.24,r*.28,'#6a4a38',1,1);if(!W){g.fillStyle='rgba(140,104,80,.6)';for(let k=0;k<6;k++){const a=k/6*6.283;g.beginPath();g.ellipse(Math.cos(a)*r*.16,b+Math.sin(a)*r*.2,r*.05,r*.03,a,0,7);g.fill()}
    g.fillStyle='rgba(200,150,110,.55)';g.beginPath();g.ellipse(0,b+r*.08,r*.12,r*.14,0,0,7);g.fill()}
  const hy=b-r*.12;wE(W,0,hy,r*.17,r*.14,'#7a5442');
  for(const s of[-1,1]){wE(W,s*r*.075,hy-r*.02,r*.055,r*.055,'#2a1408');vGlow(W,s*r*.075,hy-r*.02,r*.09,'255,180,60',.55);vEye(W,s*r*.075,hy-r*.02,r*.04,r*.045,'#ffb83a',W?0:6)}
  vD(W,[[-r*.04,hy+r*.05],[r*.04,hy+r*.05],[0,hy+r*.09]],'#3a2018');for(const s of[-1,1])vFang(W,s*r*.04,hy+r*.1,r*.018,r*.04,'#fff6e0');
  for(const s of[-1,1]){vK(W,[[s*r*.08,b+r*.26],[s*r*.1,b+r*.36]],W?'#fff':'#3a2418',r*.03);if(!W){g.strokeStyle='rgba(120,84,50,.8)';g.lineWidth=r*.014;g.beginPath();g.moveTo(s*r*.1,b+r*.36);g.quadraticCurveTo(s*r*.14+Math.sin(T*3+s)*r*.04,b+r*.5,s*r*.08,b+r*.62);g.stroke()}}
  if(!W){const p=(T*.8)%1;g.fillStyle='rgba(255,180,60,'+(.9*(1-p))+')';g.beginPath();g.ellipse(r*.02,b+r*.3+p*r*.6,r*.025,r*.04,0,0,7);g.fill()}
  return true};
MV1D[452]=(r,T,W,bob,sw0,la,ra)=>{/* ยักษ์ดินถล่ม: ร่างดินอัดเป็นชั้นเหมือนผนังเหว หินฝัง หญ้า-ดอกไม้บนบ่า รากพันแขน รอยแตกยางอำพัน เต็นท์ขาด + เสารั้วหักติดบนหลัง หัวเล็กจมบ่า ตาอำพันลึก ชูก้อนหินพร้อมขว้าง ดินร่วงตลอด */
  const b=(bob||0)*.5,gl=.6+.4*Math.sin(T*2.6),lift=Math.sin(T*1.6)*r*.05,SO='#7a5a3e',SD='#5a4030',SL='#9a7a58';
  vGlow(W,0,-r*.2+b,r*1.0,'255,170,70',.12*gl);
  /* เต็นท์ขาด + เสารั้วหักบนหลัง */
  const TP=[[-r*.52,-r*.5+b],[-r*.2,-r*1.02+b],[r*.12,-r*.56+b]];vS(W,TP,'#d2be92',1,.8);
  if(!W){g.save();vP(TP);g.clip();g.fillStyle='rgba(176,58,48,.62)';for(let k=0;k<4;k++)g.fillRect(-r*.62+k*r*.2,-r*1.05+b,r*.09,r*.62);g.restore();
    g.strokeStyle='rgba(60,40,24,.75)';g.lineWidth=r*.022;g.beginPath();g.moveTo(-r*.2,-r*1.02+b);g.lineTo(-r*.23,-r*1.14+b);g.stroke();
    g.strokeStyle='rgba(210,190,150,.8)';g.lineWidth=r*.012;g.beginPath();g.moveTo(r*.1,-r*.58+b);g.quadraticCurveTo(r*.18,-r*.4+b+Math.sin(T*3)*r*.03,r*.08,-r*.3+b);g.stroke()}
  vS(W,[[r*.3,-r*.5+b],[r*.35,-r*1.04+b],[r*.43,-r*1.0+b],[r*.39,-r*.5+b]],'#8a6a44',1,.7);
  /* ขา */
  for(const[s,l]of[[-1,la||0],[1,ra||0]])vS(W,[[s*r*.34-r*.2,r*.22],[s*r*.34+r*.2,r*.22],[s*r*.36+r*.22,r*.82-l],[s*r*.36-r*.24,r*.82-l]],SD,1,1.1);
  /* แขนหลังห้อย มือแตะพื้น */
  vLimb(W,[-r*.56,-r*.36+b,-r*.86,-r*.0+b,-r*.82,r*.46+b],SD,r*.24,r*.2);bvE(W,-r*.82,r*.5+b,r*.19,r*.15,SO,1,1);
  /* ลำตัวดินชั้น ๆ */
  const BP=[[-r*.66,r*.26+b],['q',-r*.82,-r*.3+b,-r*.5,-r*.66+b],['q',0,-r*.86+b,r*.5,-r*.66+b],['q',r*.84,-r*.3+b,r*.66,r*.26+b],['q',0,r*.44+b,-r*.66,r*.26+b]];
  if(W)vS(W,BP,'#fff',1,1.3);else{vP(BP);const gr=g.createLinearGradient(0,-r*.8+b,0,r*.4+b);gr.addColorStop(0,SL);gr.addColorStop(.5,SO);gr.addColorStop(1,SD);g.fillStyle=gr;g.fill();g.lineWidth=1.3;g.strokeStyle=V1.O;g.stroke();
    g.save();vP(BP);g.clip();
    for(let k=0;k<6;k++){const y=-r*.66+k*r*.18+b;g.fillStyle=k%2?'rgba(60,40,26,.28)':'rgba(170,130,90,.22)';g.beginPath();g.moveTo(-r,y);for(let x=-r;x<=r;x+=r*.2)g.lineTo(x,y+Math.sin(x/r*5+k)*r*.03);g.lineTo(r,y+r*.08);g.lineTo(-r,y+r*.08);g.closePath();g.fill()}
    for(const[x,y,s]of[[-.36,-.3,.09],[.3,-.1,.11],[-.1,.12,.08],[.46,-.42,.07],[-.5,.02,.06]]){g.fillStyle='#8a8478';g.beginPath();g.ellipse(x*r,y*r+b,s*r,s*r*.75,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,.25)';g.beginPath();g.ellipse(x*r-s*r*.3,y*r+b-s*r*.3,s*r*.4,s*r*.2,0,0,7);g.fill()}
    g.restore()}
  for(const L of[[[-r*.3,-r*.5],[-r*.2,-r*.3],[-r*.28,-r*.12],[-r*.18,r*.06]],[[r*.2,-r*.6],[r*.12,-r*.4],[r*.22,-r*.22]],[[r*.04,r*.04],[r*.12,r*.2],[r*.04,r*.32]]])vK(W,L.map(([x,y])=>[x,y+b]),W?'#fff':'rgba(255,'+(150+60*gl|0)+',60,.95)',r*.035);
  vGlow(W,-r*.22,-r*.2+b,r*.22,'255,170,60',.3*gl);
  /* หญ้า + ดอกไม้บนบ่า */
  if(!W){g.lineCap='round';for(let k=0;k<14;k++){const x=-r*.58+k*r*.085,y=-r*.62+b+Math.abs(x)/r*r*.18-(Math.abs(x)<r*.3?r*.1:0),h=r*(.06+(k%3)*.03),wv=Math.sin(T*2+k)*r*.02;g.strokeStyle=k%2?'#6aa04a':'#86b85a';g.lineWidth=r*.022;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+wv,y-h*.6,x+wv*2,y-h);g.stroke()}
    for(const[x,c]of[[-.4,'#ffe07a'],[.32,'#ffffff'],[.1,'#f2a8c0']]){g.fillStyle=c;g.beginPath();g.arc(x*r,-r*.74+b,r*.03,0,7);g.fill()}}
  /* หัวเล็กจมบ่า */
  const hx=r*.06,hy=-r*.58+b;bvE(W,hx,hy,r*.2,r*.16,SL,1,1);vD(W,[[hx-r*.16,hy-r*.04],['q',hx,hy-r*.14,hx+r*.16,hy-r*.04],['q',hx,hy-r*.08,hx-r*.16,hy-r*.04]],SD);
  for(const s of[-1,1]){wE(W,hx+s*r*.07,hy+r*.01,r*.045,r*.035,'#1a0e08');vGlow(W,hx+s*r*.07,hy+r*.01,r*.08,'255,170,60',.55*gl);vEye(W,hx+s*r*.07,hy+r*.01,r*.03,r*.022,'#ffb040',W?0:6)}
  vD(W,[[hx-r*.06,hy+r*.09],['q',hx,hy+r*.12,hx+r*.06,hy+r*.09],['q',hx,hy+r*.1,hx-r*.06,hy+r*.09]],'#2a1a10');
  /* แขนหน้าชูก้อนหิน + รากพันแขน */
  const ax=r*.86,ay=-r*.86+b-lift;vLimb(W,[r*.52,-r*.4+b,r*.84,-r*.44+b,ax,ay+r*.14],SO,r*.24,r*.2);
  if(!W){g.strokeStyle='#4a3020';g.lineWidth=r*.035;g.beginPath();g.moveTo(r*.56,-r*.5+b);g.bezierCurveTo(r*.7,-r*.28+b,r*.8,-r*.6+b,r*.9,-r*.36+b-lift);g.stroke();g.beginPath();g.moveTo(-r*.6,-r*.3+b);g.bezierCurveTo(-r*.8,-r*.1+b,-r*.7,r*.2+b,-r*.9,r*.3+b);g.stroke()}
  {const bx=ax,by=ay-r*.12,P=[];for(let k=0;k<8;k++){const a=k/8*6.283,rr=r*(.24+.04*Math.sin(k*2.7));P.push([bx+Math.cos(a)*rr,by+Math.sin(a)*rr*.85])}vS(W,P,'#7e766a',1,1.1);
    if(!W){g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.ellipse(bx-r*.08,by-r*.08,r*.1,r*.05,-.4,0,7);g.fill();g.fillStyle='rgba(40,30,20,.4)';g.beginPath();g.ellipse(bx+r*.06,by+r*.08,r*.08,r*.04,0,0,7);g.fill();
      g.fillStyle='rgba(120,190,80,.7)';g.beginPath();g.ellipse(bx-r*.02,by-r*.18,r*.1,r*.035,0,0,7);g.fill()}
    bvE(W,ax-r*.04,ay+r*.06,r*.13,r*.1,SO,1,.9)}
  if(!W)for(let k=0;k<5;k++){const p=(T*.7+k/5)%1;g.fillStyle='rgba(110,80,52,'+(.8*(1-p))+')';g.fillRect(-r*.5+k*r*.24+Math.sin(k*3)*r*.06,r*.1+b+p*r*.7,r*.035,r*.035)}
  return true};
MV1S[450]=1.65;MV1S[451]=1.45;MV1S[452]=2.1;

/* ---------- ธุลี · เด็กคนรากลึก: ผิวลายเปลือกไม้อ่อน ผมเป็นมอสเรืองแสง (มีต้นอ่อนสองใบกับเห็ดดอกเล็กบนหัว) ตาอำพันโตที่ชินกับความมืด
   เสื้อทอใยราก ชายรุ่ย ผ้าคลุมใบไม้บนบ่า เข็มขัดรากถัก ถุงย่าม เท้าเปล่ามีกำไลราก ถือไม้ห้อยโคมเห็ดเรืองแสงสีเขียวฟ้า · ช่วงหนึ่งจะเงยหน้ามองฟ้า ---------- */
function thuV(x,y,f,t){const{O,LG,P,E,R,glow}=NPK,OL='#2a1e12',br=Math.sin(t*1.5)*.35,wd=Math.sin(t*1.9),ph=t%7.5,lk=ph>4.2&&ph<6.8?Math.sin((ph-4.2)/2.6*Math.PI):0,SK=['#e2b888','#c89464','#9a6a42'],SW=Math.sin(t*2.2)*.12;
  NPK.sh(x,y+15,9);g.save();g.translate(x,y);g.scale(f*1.2,1.2);g.lineJoin='round';g.lineCap='round';
  if(!LOWQ)glow(0,-8,24,'150,255,160',.13+.05*Math.sin(t*2));
  const hy=-14.2+br*.4-lk*.4;
  /* ผมมอสด้านหลัง */
  for(const[dx,dy,rr]of[[-5.6,1.2,3.6],[-6.4,-2.6,3.4],[-4.2,-5.6,3.6],[0,-7,3.8],[4,-5.8,3.4],[5.4,-2.2,3]])E(dx,hy+dy,rr,rr*.92,LG(0,hy+dy-rr,0,hy+dy+rr,['#8ad870','#4a9a44','#2e6a30']),OL,.45);
  /* ผ้าคลุมใบไม้ (หลัง) */
  P([-5.2,-9.6+br*.3,-7.4,-4,-6.8+wd*.3,2.6,-4.6,1,-3.8,-6],LG(0,-10,0,3,['#5a9a48','#2e5a2c']),OL,.45);
  /* ขาเปล่า ลายเปลือกไม้ + กำไลราก + รองเท้าสานราก */
  for(const s of[-1,1]){const lx=s*2.3;R(lx-1.4,3.6,2.8,9.6,1,LG(0,4,0,13,[SK[0],SK[1]]),OL);g.strokeStyle='rgba(110,70,40,.45)';g.lineWidth=.35;g.beginPath();g.moveTo(lx-.6,5);g.lineTo(lx-.4,11);g.moveTo(lx+.5,6);g.lineTo(lx+.6,10);g.stroke();
    g.strokeStyle='#7a5434';g.lineWidth=.7;g.beginPath();g.moveTo(lx-1.5,10.6);g.lineTo(lx+1.5,10.2);g.stroke();
    P([lx-1.8,13,lx+2.2,13,lx+2.6,14.8,lx-1.8,14.8],LG(0,13,0,15,['#8a6440','#5a3e24']),OL,.4)}
  /* เสื้อทอใยราก + ชายรุ่ย */
  P([-4.6,-9.4+br*.3,4.6,-9.4+br*.3,5.6,2,6.4,5,4.2,4.4,2.6,5.8,.6,4.6,-1.4,5.8,-3.2,4.4,-5.4,5.2,-5.6,2],LG(-5,-9,5,5,['#c8a070','#a87c4c','#7a5630']),OL,.7);
  g.strokeStyle='rgba(90,58,30,.42)';g.lineWidth=.35;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(k*1.4-1,-8.6);g.lineTo(k*1.4+1.4,4.2);g.moveTo(k*1.4+1.4,-8.6);g.lineTo(k*1.4-1,4.2);g.stroke()}
  /* เข็มขัดรากถัก + ถุงย่าม (มีเมล็ดเรือง) */
  R(-5.6,-.6+br*.2,11.2,1.8,.6,LG(0,-.6,0,1.2,['#8a6038','#5a3c20']),OL);g.fillStyle='rgba(255,220,160,.28)';for(let k=0;k<5;k++){g.beginPath();g.ellipse(-4.4+k*2.2,.3+br*.2,.7,.5,0,0,7);g.fill()}
  P([2.6,.6,5.4,.6,5.8,4.2,3,4.6],LG(0,.6,0,4.6,['#a0784a','#6a4a2a']),OL,.45);E(4.2,1.6,.6,.6,'#ffb84a');
  /* แขนหลัง */
  NP3.arm(-4.6,-7.8+br*.3,-6.6,-3,-5.4,1+SW,'#b48858',SK[0]);
  /* ผ้าคลุมใบไม้ด้านหน้า */
  for(let k=0;k<6;k++){const a=-2.6+k*.42,lx=Math.cos(a)*5.6,ly=-9.4+Math.sin(a)*1.6+br*.3+(k%2)*.8;P([lx-1.6,ly,lx,ly-1.2,lx+1.8,ly+.2,lx+.4,ly+2.6],LG(0,ly-1,0,ly+3,[k%2?'#7ac060':'#5aa048','#2e6a2c']),OL,.4);g.strokeStyle='rgba(220,255,180,.5)';g.lineWidth=.3;g.beginPath();g.moveTo(lx-1,ly+.4);g.lineTo(lx+1,ly+.8);g.stroke()}
  /* หน้า */
  E(.5,hy,5.4,5.6,LG(0,hy-6,0,hy+6,SK),OL,.5);
  g.strokeStyle='rgba(120,74,40,.4)';g.lineWidth=.35;for(const[x0,y0,x1,y1]of[[-3.2,hy+1,-2.8,hy+3.6],[-2.2,hy+1.8,-2,hy+4],[5.6,hy+1.4,5.2,hy+3.6]]){g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke()}
  const blink=(t%3.9)<.12,ey=hy+.2;for(const ex of[2.4,5.0]){if(blink){g.strokeStyle='#4a2a10';g.lineWidth=.5;g.beginPath();g.moveTo(ex-.9,ey+.3);g.quadraticCurveTo(ex,ey+.9,ex+.9,ey+.3);g.stroke()}
    else{E(ex,ey+.1,.92,1.18,'#fff8ec',null);E(ex+.06,ey+.16-lk*.45,.84,1.1,LG(0,ey-1,0,ey+1.2,['#ffd468','#e88a1a','#b85a10']),null);E(ex+.1,ey+.28-lk*.5,.4,.52,'#2a1406',null);g.fillStyle='#ffffff';g.fillRect(ex-.3,ey-.42-lk*.45,.5,.5);g.fillRect(ex+.36,ey+.5-lk*.45,.24,.24);
      g.strokeStyle='#3a2210';g.lineWidth=.55;g.beginPath();g.moveTo(ex-1.05,ey-.5);g.quadraticCurveTo(ex,ey-1.35,ex+1.05,ey-.6);g.stroke()}}
  if(!LOWQ){glow(2.4,ey,2.4,'255,200,90',.14);glow(5.0,ey,2.4,'255,200,90',.14)}
  g.fillStyle='rgba(255,150,110,.35)';g.beginPath();g.arc(1.2,hy+2.4,.9,0,7);g.arc(5.8,hy+2.3,.8,0,7);g.fill();
  g.strokeStyle='rgba(90,40,20,.75)';g.lineWidth=.45;if(lk>.3){g.fillStyle='#5a2414';g.beginPath();g.ellipse(3.8,hy+3.2,.7,.5+.4*lk,0,0,7);g.fill()}else{g.beginPath();g.moveTo(3,hy+3.1);g.quadraticCurveTo(3.8,hy+3.8,4.6,hy+3.1);g.stroke()}
  /* ปอยมอสห้อยข้างแก้มสองข้าง */for(const[sx,sg]of[[-4.6,-1],[6.4,1]]){const sw2=Math.sin(t*1.7+sg)*.4;P([sx-1.1,hy-1,sx+1.1,hy-1,sx+1.2+sw2,hy+5.6,sx+sw2*.6,hy+7.2,sx-1+sw2,hy+5.4],LG(0,hy-1,0,hy+7,['#7ad060','#3e8a36']),OL,.4);if(!LOWQ){g.fillStyle='rgba(230,255,150,.8)';g.beginPath();g.arc(sx+sw2*.5,hy+4.4,.35,0,7);g.fill()}}
  /* ผมมอสด้านหน้า + จุดเรืองแสง */
  g.beginPath();g.moveTo(-5.4,hy+3.6);g.quadraticCurveTo(-6.6,hy-6.4,.8,hy-6.8);g.quadraticCurveTo(7.2,hy-6.4,6.8,hy-.4);g.quadraticCurveTo(5.8,hy-2.6,4.6,hy-1.6);g.quadraticCurveTo(3.4,hy-3.4,2,hy-1.8);g.quadraticCurveTo(.4,hy-3.6,-1.2,hy-2.2);g.quadraticCurveTo(-3.2,hy-2,-3.6,hy+4);g.closePath();
  g.fillStyle=LG(0,hy-7,0,hy+3,['#a8ec84','#62b850','#3a8236']);g.fill();g.strokeStyle=OL;g.lineWidth=.5;g.stroke();
  g.fillStyle='rgba(30,80,30,.35)';for(const[dx,dy]of[[-3,-4.6],[-.6,-5.6],[2,-5],[4.4,-4],[-4.4,-1.4],[5.6,-2]]){g.beginPath();g.arc(dx,hy+dy,.6,0,7);g.fill()}
  if(!LOWQ){const D=[[-4,-3],[-1.8,-6],[1.4,-6.4],[4,-5],[6,-2.6],[-5.6,0],[2.8,-3.6]];for(let i=0;i<7;i++){const q=.5+.5*Math.sin(t*2.4+i*1.7),[dx,dy]=D[i];g.fillStyle='rgba(230,255,150,'+(.35+.6*q)+')';g.beginPath();g.arc(dx,hy+dy,.42,0,7);g.fill();if(q>.8)glow(dx,hy+dy,2.2,'210,255,140',.4*(q-.8)*5)}}
  /* ต้นอ่อนสองใบ + เห็ดดอกเล็กบนหัว */
  {const sx=-1,sy=hy-7.6;g.strokeStyle='#4a8a34';g.lineWidth=.5;g.beginPath();g.moveTo(sx,sy+1.2);g.quadraticCurveTo(sx+.2,sy-.6,sx+.1,sy-1.4);g.stroke();
    g.save();g.translate(sx+.1,sy-1.4);g.rotate(-.5+SW);P([0,0,-2.4,-.8,-2.8,.4,-.6,.6],'#86d466',OL,.35);g.restore();g.save();g.translate(sx+.1,sy-1.4);g.rotate(.4-SW);P([0,0,2.4,-.9,2.9,.3,.6,.6],'#9ae07a',OL,.35);g.restore()}
  {const mx=5.4,my=hy-5.2;R(mx-.35,my,.7,1.6,.3,'#f0e6d0',OL);P([mx-1.8,my+.2,mx,my-1.6,mx+1.8,my+.2],LG(0,my-1.6,0,my+.2,['#ff9a7a','#d85a4a']),OL,.35);g.fillStyle='#fff4e8';g.beginPath();g.arc(mx-.5,my-.6,.32,0,7);g.arc(mx+.6,my-.3,.26,0,7);g.fill()}
  /* แขนหน้า ถือไม้ห้อยโคมเห็ดเรือง */
  {const hx=7.4,hh=-3.4+br*.2+SW*.6;NP3.arm(4.6,-7.8+br*.3,7.2,-5.6,hx,hh,'#b48858',SK[0]);
    const tx=hx+2.6,ty=hh-9.6-lk*1.4;g.strokeStyle=LG(hx,hh,tx,ty,['#7a5434','#a8804e']);g.lineWidth=.9;g.beginPath();g.moveTo(hx-.6,hh+3);g.quadraticCurveTo(hx+1.6,hh-4,tx,ty);g.stroke();
    const sway=Math.sin(t*2.1)*1.2,lx=tx+.8+sway*.4,ly=ty+4.6;g.strokeStyle='rgba(200,170,120,.8)';g.lineWidth=.35;g.beginPath();g.moveTo(tx,ty);g.lineTo(lx,ly-1.6);g.stroke();
    const fk=.75+.25*Math.sin(t*3.1);if(!LOWQ){glow(lx,ly,14,'120,255,220',.42*fk);glow(lx,ly,5,'220,255,245',.5*fk)}
    P([lx-3,ly,lx-2.2,ly-1.8,lx,ly-2.6,lx+2.2,ly-1.8,lx+3,ly],LG(0,ly-2.6,0,ly,['#c8fff0','#5ae0c8','#2aa898']),OL,.45);
    g.strokeStyle='rgba(30,120,110,.6)';g.lineWidth=.3;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(lx+k*.9,ly);g.lineTo(lx+k*.6,ly+1.4);g.stroke()}
    R(lx-.45,ly,.9,2.2,.35,'#e8fff8',OL);g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.arc(lx-1.2,ly-1.4,.35,0,7);g.arc(lx+.8,ly-1.8,.3,0,7);g.fill();
    if(!LOWQ){for(let i=0;i<4;i++){const q=(t*.5+i/4)%1;g.globalAlpha=Math.sin(q*Math.PI)*.85;g.fillStyle='#b8fff0';g.fillRect(lx-2+i*1.3+Math.sin(t*2+i)*.8,ly+2-q*9,.55,.55)}g.globalAlpha=1}}
  g.restore()}
/* แบบง่าย (สำรองเมื่อ error) */
function thuD0(x,y,f,T){g.save();g.translate(x,y);g.scale(f,1);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,16,9,3,0,0,7);g.fill();g.fillStyle='#a87c4c';g.fillRect(-6,-10,12,16);g.fillStyle='#d8aa78';g.beginPath();g.arc(0,-16,6,0,7);g.fill();g.fillStyle='#5ab048';g.beginPath();g.arc(0,-19,6.5,3.1,6.3);g.fill();
  g.save();g.globalCompositeOperation='lighter';glowAt(10,-14,16,'120,255,220',.5);g.restore();g.fillStyle='#7ae8d8';g.beginPath();g.ellipse(10,-14,4,2.4,0,Math.PI,0);g.fill();g.restore()}

/* ---------- ชาวค่ายที่ติดอยู่ 5 คน (ใช้ NPK/NP3 ขนาดเดียวกับลูกเรือ v544) · st 0 = ติดอยู่ (โบกมือตะโกน) · 1 = ปลอดภัย (ยืนยิ้ม) ---------- */
const PAFK=[{sk:['#e8c4a0','#c89a74','#966a4e'],hair:'#c8c4c0',body:['#7a4a8a','#4a2a5a'],skirt:['#c86a3a','#8a3a1e'],old:1},
 {sk:['#e0b48a','#bc8a5e','#8a6040'],hair:'#2a1a10',body:['#4a6a8a','#2e4660']},
 {sk:['#e8c8a8','#c8a080','#9a7458'],hair:'#ececec',body:['#8a6a44','#5a4428'],robe:1,old:1},
 {sk:['#f0cca8','#d4a47e','#a87a58'],hair:'#3a2214',body:['#e8c040','#b88a1a'],skirt:['#3a6a9a','#24466a']},
 {sk:['#d8a878','#b4845a','#84603e'],hair:'#4a3a2a',body:['#e8a040','#b06a1a'],stripe:1}];
function paFolkV(x,y,f,t,v,st){const{O,LG,P,E,R,glow}=NPK,K=PAFK[v],br=Math.sin(t*1.7+v)*.4,wv=st?0:Math.sin(t*7+v)*.9;NPK.sh(x,y+16,11);g.save();g.translate(x,y);g.scale(f*1.12,1.12);g.lineJoin='round';g.lineCap='round';
  const hy=-15.4+br*.4+(K.old?.9:0);
  /* ของด้านหลัง */
  if(v===4){g.strokeStyle=LG(0,-26,0,15,['#c8a070','#6a4424']);g.lineWidth=1.2;g.beginPath();g.moveTo(-7.4,15);g.lineTo(-8.2,-20);g.quadraticCurveTo(-8.6,-25,-5.4,-24.6);g.quadraticCurveTo(-3.6,-24,-4.4,-22);g.stroke()}
  if(v===2){g.strokeStyle='#6a4a2a';g.lineWidth=1.1;g.beginPath();g.moveTo(-7.6,15);g.lineTo(-6.8,-2);g.stroke();E(-6.8,-2.4,1.2,1,'#8a6440',O,.4)}
  if(K.robe)NP3.robe([K.body[0],K.body[1],'#3a2a18'],'#c8a060',br);
  else{NP3.legs(K.skirt?K.skirt[1]:'#3a3430',['#5a3a24','#2a1a10'],K.skirt?8:6);NP3.coat([K.body[0],K.body[1],K.body[1]],br);if(K.skirt)P([-6.4,1,6.4,1,7.4,10.6,-7.4,10.6],LG(0,1,0,11,K.skirt),O,.7)}
  if(v===0&&K.skirt){g.strokeStyle='rgba(255,220,150,.55)';g.lineWidth=.6;for(let k=0;k<3;k++){g.beginPath();g.moveTo(-6.8,3+k*2.6);g.lineTo(6.8,3+k*2.6);g.stroke()}}
  if(K.stripe){g.strokeStyle='rgba(40,24,10,.78)';g.lineWidth=1.1;for(let k=0;k<4;k++){g.beginPath();g.moveTo(-5.4,-6.4+k*3.2);g.quadraticCurveTo(-3,-5+k*3.2,-1.6,-6.6+k*3.2);g.moveTo(5.4,-6.4+k*3.2);g.quadraticCurveTo(3,-5+k*3.2,1.6,-6.6+k*3.2);g.stroke()}}
  if(v===1){R(-6,1.6,12,2,.5,'#3a2818',O);g.save();g.translate(4.6,3.4);g.rotate(.5);R(-.5,0,1,5.6,.3,'#8a6440',O);R(-1.8,-.6,3.6,1.6,.4,'#9aa2ae',O);g.restore()}
  /* แขนหลัง + ของที่ถือ */
  NP3.arm(-5,-8.4+br*.3,-7,-3,-5.6,1.4,K.body[1],K.sk[0]);
  if(v===0){const cx=-7,cy=1.6;E(cx,cy,4.4,1.6,'#3a3230',O,.5);g.fillStyle='#e8c070';for(let k=0;k<4;k++){g.beginPath();g.arc(cx-2.7+k*1.8,cy-.3,.75,0,7);g.fill()}g.fillStyle='rgba(255,255,255,.7)';for(let k=0;k<4;k++)g.fillRect(cx-2.9+k*1.8,cy-.8,.6,.4)}
  if(v===3){P([-8.8,-.6,-5,-1.6,-4.4,2.6,-8.4,3.4],LG(0,-1,0,3,['#e86a8a','#a83a5a']),O,.5);g.strokeStyle='#ffe0a0';g.lineWidth=.5;g.beginPath();g.moveTo(-6.6,-1.2);g.lineTo(-6.4,3);g.stroke()}
  /* แขนหน้า: โบกมือ / ยืนพัก */
  if(st===0)NP3.arm(5,-8.4+br*.3,8.6,-12,7.6+wv,-17.6,K.body[0],K.sk[0]);else NP3.arm(5,-8.4+br*.3,7,-3,5.8,1.4,K.body[0],K.sk[0]);
  NP3.face(hy,K.sk,{eye:'#1a1410',brow:K.old?'#b8b4b0':'#2a1a10',mouth:false});
  if(st===0)E(3.6,hy+2.9,.9,.75+.3*Math.abs(Math.sin(t*5+v)),'#5a1e14');else{g.strokeStyle='rgba(70,30,20,.7)';g.lineWidth=.5;g.beginPath();g.moveTo(2.4,hy+2.6);g.quadraticCurveTo(3.4,hy+3.4,4.4,hy+2.6);g.stroke()}
  /* ผม / หมวก / ผ้าโพก */
  if(v===0){E(-4.4,hy-3.6,2.6,2.4,'#d8d4d0',O,.45);P([-5.6,hy-.4,-5.2,hy-5.2,.6,hy-6.8,6,hy-4.8,6.4,hy-1.6,1,hy-3.4],LG(0,hy-7,0,hy,['#9a5ab0','#6a3a80']),O,.6);g.fillStyle='rgba(255,220,240,.5)';g.beginPath();g.arc(1,hy-4.6,.5,0,7);g.arc(3.6,hy-4.4,.5,0,7);g.fill()}
  if(v===1){P([-5.6,hy-1,-5.4,hy-5.2,.6,hy-6.6,6,hy-4.6,6,hy-2,2.6,hy-3.4,-1,hy-2.8],'#2a1a10',O,.5);P([-5.8,hy-2.6,-5,hy-4.6,6.2,hy-3.6,6.2,hy-2,-1,hy-1.8],LG(0,hy-5,0,hy-2,['#e84a3a','#a82a22']),O,.5);const w2=Math.sin(t*3+v);P([-5.4,hy-3,-8.4+w2,hy-2+w2*.4,-8,hy+.2,-5.2,hy-1.6],'#c8302a',O,.4)}
  if(v===2){g.fillStyle='#ececec';g.beginPath();g.ellipse(-4.6,hy-1,1.8,2.6,0,0,7);g.fill();P([-3.8,hy+1.6,-3,hy+8.6,1.6,hy+11,5.4,hy+8,5.8,hy+2.4,3.4,hy+3.6,.4,hy+3.6,-2.2,hy+2.4],LG(0,hy+1,0,hy+11,['#ffffff','#d0d0d0']),O,.45);
    g.strokeStyle='#5a4a30';g.lineWidth=.45;g.beginPath();g.arc(2.6,hy-.2,1.15,0,7);g.moveTo(3.75,hy-.2);g.lineTo(4.05,hy-.2);g.arc(5.2,hy-.2,1.15,Math.PI,Math.PI*3);g.stroke()}
  if(v===3){P([-5.6,hy+1,-6,hy-5,.6,hy-6.8,6.4,hy-5,6.4,hy-1.6,3,hy-3.6,-1.4,hy-3.2,-3.4,hy+1.6],LG(0,hy-7,0,hy+2,['#4a2a18','#2a1408']),O,.5);
    const bw=Math.sin(t*2.2+v)*.5;for(let k=0;k<4;k++)E(-6.4+bw*k*.2,hy+1+k*2.4,1.3-k*.12,1.4,'#3a2214',O,.35);E(5.2,hy-5.4,1.2,1.2,'#ff8aa8',O,.35);E(5.2,hy-5.4,.45,.45,'#fff0a0')}
  if(v===4){P([-5.4,hy-1,-5,hy-4.6,.6,hy-5.6,6,hy-4.4,6,hy-1.6],'#4a3a2a',O,.45);P([-9.4,hy-3,-4.6,hy-5.2,0,hy-9.6,5,hy-5.2,10.4,hy-3,0,hy-2.4],LG(0,hy-9.6,0,hy-2.4,['#f2d880','#c8a040']),O,.6);g.strokeStyle='#8a3a20';g.lineWidth=.9;g.beginPath();g.moveTo(-4.4,hy-4.4);g.quadraticCurveTo(.4,hy-5.6,5,hy-4.4);g.stroke();
    P([-3,hy+2.8,-2.4,hy+5.2,1.6,hy+6,5.2,hy+4.6,5.4,hy+2.6,3.2,hy+3.6,.6,hy+3.8,-1.6,hy+3],'#5a4a3a',O,.4)}
  g.restore()}
/* แพะ (ของลุงเสือ) · gm = ปากเปื้อนมอสเรืองแสง */
function paGoat(x,y,f,t,k,gm){const{O,LG,P,E,R}=NPK,b=Math.sin(t*2+k)*.3,chew=Math.sin(t*6+k),dn=Math.sin(t*.7+k*1.3)>.55?2.6:0,wh=k%2;NPK.sh(x,y+7,8);g.save();g.translate(x,y);g.scale(f*1.08,1.08);g.lineJoin='round';g.lineCap='round';
  for(const dx of[-4.4,-2,2.4,4.6])R(dx-.6,2,1.2,5.4,.4,wh?'#d8d0c0':'#8a6440',O);
  P([-6.6,-1.8+b,-8.6,-3.8+b,-7.2,-.8+b],wh?'#f4efe4':'#a8784a',O,.4);
  E(0,b,7,4.2,LG(0,-4,0,4,wh?['#f8f4ea','#d0c6b4']:['#c89a6a','#8a6440']),O,.7);
  if(!wh){g.fillStyle='rgba(255,240,220,.6)';g.beginPath();g.ellipse(1,b+2,3,1.2,0,0,7);g.fill()}
  const hx=7,hy=-3.6+b+dn;E(hx,hy,2.8,2.3,wh?'#f4efe4':'#b88a5a',O,.6);
  g.strokeStyle='#7a6a54';g.lineWidth=.9;g.beginPath();g.moveTo(hx-.6,hy-2);g.quadraticCurveTo(hx-2.6,hy-4.6,hx-4,hy-3.2);g.stroke();
  P([hx-1.6,hy+.2,hx-3.6,hy-.8,hx-1.8,hy-1],wh?'#e8e0d0':'#9a7048',O,.35);P([hx+.8,hy+1.8,hx+1.4,hy+4+chew*.2,hx+2,hy+1.8],'#e8e0d0',null);
  g.fillStyle='#1a120c';g.fillRect(hx+.6,hy-.7,.7,.7);
  if(gm){g.fillStyle='rgba(170,255,120,.9)';g.beginPath();g.arc(hx+2.3,hy+.9,.75,0,7);g.fill();if(!LOWQ)NPK.glow(hx+2.3,hy+.9,3.4,'170,255,120',.65)}
  g.restore()}

/* ---------- ภาพสลักบนราก 5 ภาพ (เส้นเรืองอำพันลอยเหนือรากหลังฟังแล้ว) ---------- */
function paGlyph(i,x,y,a,T){if(a<=.01)return;g.save();g.translate(x,y);g.lineCap='round';g.lineJoin='round';
  g.save();g.globalCompositeOperation='lighter';glowAt(0,0,52,'255,180,80',.22*a);g.restore();g.globalAlpha=Math.min(1,a);
  const S=pts=>{g.beginPath();pts.forEach(([px,py],k)=>k?g.lineTo(px,py):g.moveTo(px,py));g.stroke()},C=(cx,cy,r)=>{g.beginPath();g.arc(cx,cy,r,0,7);g.stroke()};
  for(const[lw,col]of[[5,'rgba(110,56,10,.55)'],[2.2,'rgba(255,206,120,.96)']]){g.strokeStyle=col;g.lineWidth=lw;
    if(i===0){S([[-26,-16],[26,-16]]);S([[-10,-15],[-7,-3],[7,-3],[10,-15]]);C(0,-8,3.4);S([[-6,-3],[-5,10]]);S([[6,-3],[5,10]]);S([[-5,10],[-7,20]]);S([[5,10],[7,20]]);for(const px of[-20,-14,14,20]){S([[px,-16],[px,-22]]);C(px,-24.4,1.8)}}
    else if(i===1){S([[-26,-2],[26,-2]]);for(let k=0;k<5;k++){const w=7-k*1.1,yy=-26+k*7;S([[-w,yy],[w,yy],[w,yy+7],[-w,yy+7],[-w,yy]])}S([[-1.8,9],[0,14],[1.8,9]]);
      S([[0,14],[-9,18],[-15,15]]);S([[0,14],[8,19],[16,16]]);S([[0,14],[-3,22]]);S([[-9,18],[-11,24]]);S([[8,19],[11,25]])}
    else if(i===2){S([[-26,-20],[26,-20]]);g.beginPath();g.moveTo(-18,-6);g.arc(-12,-11,6.5,Math.PI*.9,Math.PI*1.75);g.arc(0,-14,7,Math.PI*1.15,Math.PI*1.85);g.arc(12,-11,6.5,Math.PI*1.25,Math.PI*2.1);g.lineTo(-18,-6);g.stroke();S([[-2,-6],[-2,10]]);S([[2,-6],[2,10]]);
      S([[-2,10],[-12,17],[-16,24]]);S([[2,10],[12,17],[16,24]]);S([[0,10],[0,22]]);C(0,26,2.6)}
    else if(i===3){const wv=(y0,amp,w)=>{g.lineWidth=w*(lw>3?2:1);g.beginPath();for(let k=0;k<=24;k++){const px=-24+k*2,py=y0+Math.sin(k*.7+T*1.4)*amp;k?g.lineTo(px,py):g.moveTo(px,py)}g.stroke()};wv(-14,3,lw>3?4:2.6);wv(0,2,lw>3?2.4:1.5);wv(14,1.2,lw>3?1.2:.6)}
    else{S([[-6,26],[-2,14],[-8,2],[-2,-10],[-6,-20]]);C(-3.6,-2,2);S([[-3.6,0],[-3,7]]);S([[-3,3],[0,0]]);C(1,-1.2,1.3);C(10,-22,7);S([[10,-31],[10,-34]]);S([[18,-22],[21,-22]]);S([[2,-22],[-1,-22]]);
      g.beginPath();g.arc(20,-6,3,Math.PI*1.1,Math.PI*2.3);g.stroke();S([[21.6,-3.4],[20.6,1]]);C(20.4,4.6,.5)}}
  g.restore()}
