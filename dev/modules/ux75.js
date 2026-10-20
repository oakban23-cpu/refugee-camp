/* ===== v469 · มอนแมพที่เคยซ้ำ ออกแบบใหม่ =====
   เดิม: แมพ 30–33 ใช้มอนชุดเดียวกัน (เงาอารัณยา) · แมพ 29 ใช้ชุดเดียวกับพระราชวัง 27
   ใหม่: 32 ซากอารัณยา คงชุดเงาอารัณยาเดิม (ระฆัง/ทหารเงา ตรงกับเนื้อเรื่อง) · 29/30/31/33 ได้ชุดของตัวเองตามเนื้อเรื่องแต่ละแมพ
   29 ห้องบัลลังก์ดาว: องครักษ์หุ่นเชิด · ดาวล่ามโซ่ · ผู้คุมกลุ่มดาว
   30 สะพานรุ่งอรุณ: เงาไต่ขอบสะพาน · นกเงาสนธยา · ผู้แบกเฟืองสำริด
   31 ย่านวงแหวนล่าง: ภูตเถ้าเย็น · หนูเงาซอย · เงาโคมแดง
   33 หลุมหัวใจว่าง: เงาผู้รอคอย · ข้อโซ่แสง · ผู้ถักโซ่ */
const MNNAME={29:['องครักษ์หุ่นเชิด','ดาวล่ามโซ่','ผู้คุมกลุ่มดาว'],30:['เงาไต่ขอบสะพาน','นกเงาสนธยา','ผู้แบกเฟืองสำริด'],31:['ภูตเถ้าเย็น','หนูเงาซอย','เงาโคมแดง'],33:['เงาผู้รอคอย','ข้อโซ่แสง','ผู้ถักโซ่']};
function drawMonN(th,t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){
  const glow=(x,y,rr,c,a)=>{if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,y,0,x,y,rr);gr.addColorStop(0,'rgba('+c+','+a+')');gr.addColorStop(1,'rgba('+c+',0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.restore()};
  const O='#140e0c',cap=()=>{g.lineCap='round';g.lineJoin='round'};cap();
  const chain=(x0,y0,x1,y1,n,col,lw,sag)=>{const P=q=>[x0+(x1-x0)*q,y0+(y1-y0)*q+(sag||0)*4*q*(1-q)],L=Math.hypot(x1-x0,y1-y0)/n;for(let i=0;i<n;i++){const q=(i+.5)/n,[x,y]=P(q),[xa,ya]=P(Math.max(0,q-.05)),[xb,yb]=P(Math.min(1,q+.05)),a=Math.atan2(yb-ya,xb-xa);g.save();g.translate(x,y);g.rotate(a);g.strokeStyle=W?'#fff':col;g.lineWidth=lw;g.beginPath();if(i%2)g.ellipse(0,0,L*.6,lw*1.4,0,0,7);else{g.moveTo(-L*.55,0);g.lineTo(L*.55,0)}g.stroke();g.restore()}};
  const gear=(cx,cy,R,col,teeth,rot)=>{g.save();g.translate(cx,cy);g.rotate(rot);g.fillStyle=F(col);for(let i=0;i<teeth;i++){g.save();g.rotate(i/teeth*6.283);g.fillRect(-R*.16,-R*1.22,R*.32,R*.3);if(!W){g.strokeStyle=O;g.lineWidth=1;g.strokeRect(-R*.16,-R*1.22,R*.32,R*.3)}g.restore()}g.restore();E(cx,cy,R,R,F(col),1);E(cx,cy,R*.62,R*.62,F('#8a5a26'),1)};
  /* ---------------- 30 สะพานรุ่งอรุณ ---------------- */
  if(th===30){
    if(t===0){/* เงาไต่ขอบสะพาน: ครึ่งล่างยังจมในเมฆชมพูทอง แขนยาวลากพื้น */
      const reach=Math.sin(T*3)*r*.12;glow(0,-r*.55+bob,r*.9,'255,150,80',.12);
      Ln([-r*.42,-r*.35+bob,-r*.95,r*.1,-r*1.05-reach,r*.72],F('#1c1430'),r*.24);Ln([r*.42,-r*.35+bob,r*.95,r*.05,r*1.08+reach,r*.7],F('#1c1430'),r*.24);
      [-1,1].forEach(s=>{const hx=s*(r*1.06+(s>0?reach:-reach)*s),hy=r*.72;for(let k=-1;k<=1;k++)Ln([hx,hy,hx+s*r*.12+k*r*.1,hy+r*.16],F('#120c20'),r*.07)});
      Pg([-r*.62,r*.45,-r*.5,-r*.3+bob,-r*.2,-r*.62+bob,r*.2,-r*.62+bob,r*.5,-r*.3+bob,r*.62,r*.45],F('#211838'),1);
      E(0,-r*.8+bob,r*.36,r*.32,F('#1c1430'),1);Pg([-r*.3,-r*.92+bob,-r*.42,-r*1.3+bob,-r*.12,-r*1.02+bob],F('#1c1430'),1);Pg([r*.3,-r*.92+bob,r*.42,-r*1.3+bob,r*.12,-r*1.02+bob],F('#1c1430'),1);
      glow(0,-r*.82+bob,r*.42,'255,170,90',.35);eye(-r*.13,-r*.82+bob,r*.08,r*.06,'#ffb860');eye(r*.13,-r*.82+bob,r*.08,r*.06,'#ffb860');
      if(!W){g.strokeStyle='rgba(255,190,120,.55)';g.lineWidth=1;g.beginPath();g.moveTo(-r*.1,-r*.68+bob);g.quadraticCurveTo(0,-r*.62+bob,r*.1,-r*.68+bob);g.stroke()}
      /* เมฆที่ตัวโผล่ออกมา */
      for(let i=0;i<5;i++){const x=(i-2)*r*.32,y=r*.62+Math.sin(T*2+i)*r*.05;E(x,y,r*.3,r*.2,F(i%2?'#f2c0cc':'#f8d4c0'),1)}
      if(!W){g.fillStyle='rgba(255,220,150,.6)';for(let i=0;i<5;i++){g.beginPath();g.ellipse((i-2)*r*.32-r*.06,r*.55,r*.14,r*.05,0,0,7);g.fill()}}return true}
    if(t===1){/* นกเงาสนธยา */const fy=-r*.75+Math.sin(T*3)*r*.15,fl=Math.sin(T*14);
      if(!W){for(let i=0;i<3;i++){const q=(T*1.6+i/3)%1;g.fillStyle='rgba(40,20,50,'+(.45*(1-q))+')';g.beginPath();g.arc(-r*.6-q*r*.9,fy+r*.1,r*(.14+q*.12),0,7);g.fill()}}
      [-1,1].forEach(s=>{const wy=fy-fl*r*.65*s*-1;Pg([-r*.15,fy,-r*.55,fy-s*r*.15-fl*r*.7,-r*.05,fy-s*r*.2-fl*r*.5,r*.25,fy],F('#241838'),1);Pg([-r*.5,fy-s*r*.12-fl*r*.68,-r*.62,fy-s*r*.06-fl*r*.82,-r*.38,fy-s*r*.1-fl*r*.55],F('#e8a070'),0)});
      E(0,fy,r*.42,r*.22,F('#2a1c40'),1);Pg([-r*.38,fy,-r*.85,fy-r*.16,-r*.75,fy,-r*.85,fy+r*.16],F('#1c1430'),1);
      E(r*.38,fy-r*.08,r*.2,r*.17,F('#2a1c40'),1);Pg([r*.54,fy-r*.1,r*.8,fy-r*.04,r*.54,fy+r*.02],F('#e8b060'),1);eye(r*.42,fy-r*.12,r*.06,r*.06,'#ffb860');glow(r*.42,fy-r*.12,r*.3,'255,160,80',.3);return true}
    /* ผู้แบกเฟืองสำริด */
    glow(0,-r*.3,r*1.3,'200,120,60',.1);Ln([-r*.3,r*.3,-r*.36,r*.88-la],F('#1a1228'),r*.3);Ln([r*.3,r*.3,r*.36,r*.88-ra],F('#1a1228'),r*.3);
    Pg([-r*.85,-r*.55+bob,r*.85,-r*.55+bob,r*.6,r*.45,-r*.6,r*.45],F('#1e1630'),1);E(-r*.82,-r*.5+bob,r*.3,r*.24,F('#261c3a'),1);E(r*.82,-r*.5+bob,r*.3,r*.24,F('#261c3a'),1);
    E(0,-r*.82+bob,r*.3,r*.26,F('#1e1630'),1);glow(0,-r*.82+bob,r*.36,'255,170,80',.4);eye(0,-r*.84+bob,r*.1,r*.08,'#ffb050');
    if(!W){for(let i=0;i<3;i++){const q=(T*.7+i/3)%1;g.fillStyle='rgba(40,20,60,'+(.4*(1-q))+')';g.beginPath();g.arc(-r*.5+i*r*.5,-r*.7+bob-q*r*.6,r*(.08+q*.1),0,7);g.fill()}}
    gear(r*.08,r*.12+bob,r*.5,'#b07a3a',10,T*.6);
    if(!W){g.strokeStyle='#2a1808';g.lineWidth=1.4;g.beginPath();g.moveTo(r*.0,-r*.3+bob);g.lineTo(r*.12,-r*.05+bob);g.lineTo(r*.02,r*.2+bob);g.stroke();
      g.fillStyle='#ffd27a';g.beginPath();for(let i=0;i<8;i++){const a=i*.785+T*.6,R=i%2?r*.14:r*.26;g.lineTo(r*.08+Math.cos(a)*R,r*.12+bob+Math.sin(a)*R)}g.closePath();g.fill()}
    glow(r*.08,r*.12+bob,r*.5,'255,190,90',.25+.1*Math.sin(T*3));
    Ln([-r*.75,-r*.4+bob,-r*.4,-r*.1+bob],F('#1e1630'),r*.22);Ln([r*.75,-r*.4+bob,r*.55,-r*.05+bob],F('#1e1630'),r*.22);return true}
  /* ---------------- 31 ย่านวงแหวนล่าง ---------------- */
  if(th===31){
    if(t===0){/* ภูตเถ้าเย็น: ร่างเถ้าดำ รอยร้าวเรืองฟ้าเย็น ผ้าแผงตลาดไหม้คลุมไหล่ */
      glow(0,-r*.4+bob,r*.9,'140,200,255',.12);Ln([-r*.22,r*.3,-r*.3,r*.88-la],F('#2a2a32'),r*.22);Ln([r*.22,r*.3,r*.3,r*.88-ra],F('#2a2a32'),r*.22);
      Pg([-r*.5,-r*.4+bob,r*.5,-r*.4+bob,r*.58,r*.4,-r*.58,r*.4],F('#2e2e36'),1);
      Pg([-r*.62,-r*.5+bob,r*.2,-r*.58+bob,r*.05,r*.1,-r*.25,-r*.05,-r*.7,r*.15],F('#a8382a'),1);if(!W){g.fillStyle='#e8d4b0';g.fillRect(-r*.55,-r*.38+bob,r*.5,r*.08);g.fillRect(-r*.5,-r*.2+bob,r*.45,r*.08);g.fillStyle='#14100e';g.beginPath();g.ellipse(-r*.42,r*.05,r*.16,r*.1,0,0,7);g.fill()}
      E(0,-r*.82+bob,r*.34,r*.32,F('#34343c'),1);Pg([-r*.36,-r*.82+bob,-r*.2,-r*1.22+bob,r*.24,-r*1.18+bob,r*.38,-r*.78+bob],F('#2a2a32'),1);
      if(!W){g.strokeStyle='#9fd8ff';g.lineWidth=1.1;[[r*.05,-r*.38,r*.12,-r*.22,r*.04,-r*.1,r*.14,r*.05],[r*.32,-r*.3,r*.26,-r*.12,r*.36,r*.02],[-r*.05,r*.12,r*.08,r*.22,r*.02,r*.34],[-r*.12,-r*.9,-r*.04,-r*1.02,-r*.1,-r*1.12]].forEach(p=>{g.beginPath();g.moveTo(p[0],p[1]+bob);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]+bob);g.stroke()})}
      glow(0,-r*.82+bob,r*.4,'150,210,255',.35);eye(-r*.12,-r*.84+bob,r*.07,r*.05,'#bfe8ff');eye(r*.12,-r*.84+bob,r*.07,r*.05,'#bfe8ff');
      Ln([r*.45,-r*.3+bob,r*.75,r*.1+sw*r*.1],F('#2e2e36'),r*.18);for(let k=-1;k<=1;k++)Ln([r*.75,r*.1+sw*r*.1,r*.86+k*r*.06,r*.28+sw*r*.1],F('#1a1a20'),r*.06);
      if(!W){for(let i=0;i<4;i++){const q=(T*.6+i/4)%1;g.fillStyle='rgba(60,60,70,'+(.7*(1-q))+')';g.fillRect((i-1.5)*r*.3+Math.sin(T+i)*r*.1,-r*1.1-q*r*.8,r*.08,r*.08)}}return true}
    if(t===1){/* หนูเงาซอย */const run=Math.sin(T*16)*r*.08;
      Ln([-r*.5,r*.35,-r*.9,r*.2+Math.sin(T*8)*r*.2,-r*1.25,r*.3+Math.sin(T*8+1)*r*.25],F('#3a2a30'),r*.08);
      [-r*.3,r*.3].forEach((x,i)=>{Ln([x,r*.4,x+(i?run:-run),r*.82],F('#1a141c'),r*.12)});
      E(0,r*.3,r*.58,r*.34,F('#241c26'),1);if(!W){g.strokeStyle='#4a3a44';g.lineWidth=1;for(let i=0;i<4;i++){g.beginPath();g.moveTo(-r*.3+i*r*.15,r*.02);g.lineTo(-r*.24+i*r*.15,-r*.1);g.stroke()}}
      E(r*.55,r*.18,r*.3,r*.24,F('#241c26'),1);Pg([r*.72,r*.1,r*1.02,r*.24,r*.72,r*.32],F('#2e242e'),1);E(r*1.0,r*.24,r*.05,r*.05,F('#c8607a'),0);
      E(r*.42,-r*.04,r*.12,r*.14,F('#3a2a34'),1);E(r*.62,-r*.06,r*.12,r*.14,F('#3a2a34'),1);eye(r*.66,r*.12,r*.07,r*.06,'#ff4a3a');glow(r*.66,r*.12,r*.3,'255,80,60',.35);return true}
    /* เงาโคมแดง */
    glow(0,-r*1.1+bob,r*1.1,'255,90,60',.16);
    Ln([-r*.25,r*.25,-r*.32,r*.88-la],F('#1a1218'),r*.2);Ln([r*.25,r*.25,r*.32,r*.88-ra],F('#1a1218'),r*.2);
    Pg([-r*.42,-r*.75+bob,r*.42,-r*.75+bob,r*.78,r*.55,r*.4,r*.45,0,r*.62,-r*.4,r*.45,-r*.78,r*.55],F('#1e161e'),1);
    if(!W){const S=[[-r*.6,'#c83a2a'],[-r*.3,'#efe2c4'],[0,'#c83a2a'],[r*.3,'#efe2c4']];g.save();g.beginPath();g.moveTo(-r*.6,-r*.6+bob);g.lineTo(r*.6,-r*.6+bob);g.lineTo(r*.66,r*.1);g.lineTo(-r*.66,r*.1);g.closePath();g.clip();S.forEach(([x,c])=>{g.fillStyle=c;g.fillRect(x,-r*.7+bob,r*.3,r*.9)});g.restore();
      g.strokeStyle=O;g.lineWidth=1;g.beginPath();g.moveTo(-r*.6,-r*.6+bob);g.lineTo(r*.6,-r*.6+bob);g.lineTo(r*.66,r*.1);for(let i=0;i<6;i++){g.lineTo(r*.66-(i+.5)*r*.22,r*.1+(i%2?0:r*.12))}g.lineTo(-r*.66,r*.1);g.closePath();g.stroke()}
    Ln([-r*.42,-r*.6+bob,-r*.9,-r*.1+bob+sw*r*.1],F('#1e161e'),r*.16);Ln([r*.42,-r*.6+bob,r*.9,-r*.15+bob-sw*r*.1],F('#1e161e'),r*.16);
    /* พวงโคมแดงรอบคอ */
    for(let i=0;i<5;i++){const a=-2.6+i*.55,x=Math.cos(a)*r*.55,y=-r*.78+bob+Math.sin(a)*r*.18+r*.12;E(x,y,r*.1,r*.13,F('#e04030'),1);glow(x,y,r*.2,'255,120,60',.3)}
    /* หัวเป็นโคมกระดาษแดง */
    const hy=-r*1.22+bob+Math.sin(T*2)*r*.03;Ln([0,hy-r*.5,0,hy-r*.62],F('#3a2414'),1.5);
    E(0,hy,r*.27,r*.4,F('#d8402c'),1);if(!W){g.strokeStyle='rgba(120,30,20,.7)';g.lineWidth=1;for(let k=1;k<4;k++){const yy=hy-r*.4+k*r*.2;const w=r*.27*Math.sqrt(Math.max(0,1-((yy-hy)/(r*.4))**2));g.beginPath();g.moveTo(-w,yy);g.lineTo(w,yy);g.stroke()}}
    Pg([-r*.17,hy-r*.44,r*.17,hy-r*.44,r*.12,hy-r*.36,-r*.12,hy-r*.36],F('#c8a040'),1);Pg([-r*.17,hy+r*.44,r*.17,hy+r*.44,r*.12,hy+r*.36,-r*.12,hy+r*.36],F('#c8a040'),1);
    Ln([0,hy+r*.44,0,hy+r*.62],F('#c8a040'),1.2);if(!W){g.strokeStyle='#e04030';g.lineWidth=2;g.beginPath();g.moveTo(0,hy+r*.6);g.lineTo(Math.sin(T*3)*r*.05,hy+r*.78);g.stroke()}
    glow(0,hy,r*.55,'255,140,70',.5+.15*Math.sin(T*7));if(!W){g.fillStyle='#1a0804';g.beginPath();g.moveTo(-r*.17,hy-r*.08);g.lineTo(-r*.03,hy);g.lineTo(-r*.17,hy+r*.02);g.closePath();g.fill();g.beginPath();g.moveTo(r*.17,hy-r*.08);g.lineTo(r*.03,hy);g.lineTo(r*.17,hy+r*.02);g.closePath();g.fill()}
    eye(-r*.11,hy-r*.03,r*.04,r*.035,'#ffe070');eye(r*.11,hy-r*.03,r*.04,r*.035,'#ffe070');return true}
  /* ---------------- 33 หลุมหัวใจว่าง ---------------- */
  if(th===33){
    if(t===0){/* เงาผู้รอคอย: นั่งรอมาสามร้อยปี กุญแจมือ โซ่แสงม่วงขาด */
      glow(0,-r*.4,r*1,'170,90,255',.12);
      Pg([-r*.5,-r*.55+bob,r*.5,-r*.55+bob,r*.7,r*.85,r*.3,r*.7,0,r*.88,-r*.3,r*.7,-r*.7,r*.85],F('#1e1630'),1);
      Pg([-r*.38,-r*.6+bob,-r*.42,-r*1.05+bob,-r*.05,-r*1.28+bob,r*.4,-r*1.08+bob,r*.42,-r*.58+bob],F('#261c3a'),1);E(r*.02,-r*.86+bob,r*.24,r*.24,F('#08040e'),0);
      glow(-r*.06,-r*.88+bob,r*.3,'200,140,255',.35);eye(-r*.06,-r*.88+bob,r*.07,r*.07,'#d8b0ff');
      Ln([-r*.45,-r*.4+bob,-r*.5,r*.15],F('#1e1630'),r*.18);Ln([r*.45,-r*.4+bob,r*.42,r*.18],F('#1e1630'),r*.18);
      E(-r*.5,r*.18,r*.13,r*.08,F('#7a6a8a'),1);E(r*.42,r*.2,r*.13,r*.08,F('#7a6a8a'),1);
      chain(-r*.5,r*.2,-r*.95,r*.8+Math.sin(T*2)*r*.05,5,'#b47aff',1,r*.12);chain(r*.42,r*.22,r*.8,r*.82+Math.sin(T*2+1)*r*.05,5,'#b47aff',1,r*.12);
      glow(-r*.95,r*.7,r*.25,'190,120,255',.3);glow(r*.8,r*.75,r*.25,'190,120,255',.3);return true}
    if(t===1){/* ข้อโซ่แสง */const fy=-r*.7+Math.sin(T*2.4)*r*.18,rot=T*2.2;glow(0,fy,r*1.2,'180,110,255',.2);
      for(let i=0;i<3;i++){const a=rot+i*2.094,x=Math.cos(a)*r*.55,y=fy+Math.sin(a)*r*.3;g.save();g.translate(x,y);g.rotate(a+1.57);g.strokeStyle=W?'#fff':'#c89aff';g.lineWidth=r*.12;g.beginPath();g.ellipse(0,0,r*.28,r*.15,0,0,7);g.stroke();if(!W){g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=1;g.stroke()}g.restore()}
      E(0,fy,r*.28,r*.28,F('#140a22'),1);eye(0,fy,r*.11,r*.11,'#e0c0ff');
      if(!W){for(let i=0;i<4;i++){const q=(T*1.2+i/4)%1;g.fillStyle='rgba(200,150,255,'+(.7*(1-q))+')';g.beginPath();g.arc(Math.sin(i*2.1)*r*.5,fy+r*.3+q*r*.6,1.4,0,7);g.fill()}}return true}
    /* ผู้ถักโซ่: ร่างใหญ่ 4 แขน หน้ากากซีด ถักโซ่แสง */
    glow(0,-r*.5,r*1.4,'170,90,255',.16);
    Ln([-r*.3,r*.3,-r*.38,r*.88-la],F('#1a1228'),r*.26);Ln([r*.3,r*.3,r*.38,r*.88-ra],F('#1a1228'),r*.26);
    Pg([-r*.7,-r*.65+bob,r*.7,-r*.65+bob,r*.85,r*.5,r*.4,r*.42,0,r*.55,-r*.4,r*.42,-r*.85,r*.5],F('#1c1430'),1);
    const k=Math.sin(T*3)*r*.12;
    [[-1,-r*.5,-r*.95,-r*.1],[1,-r*.5,r*.95,-r*.1],[-1,-r*.2,-r*.8,r*.2],[1,-r*.2,r*.8,r*.2]].forEach(([s,y0,x1,y1],i)=>Ln([s*r*.6,y0+bob,x1+(i<2?k*s:-k*s),y1+bob],F('#211838'),r*.15));
    chain(-r*.95-k,-r*.1+bob,r*.95+k,-r*.1+bob,9,'#c08aff',1.1,r*.3);chain(-r*.8+k,r*.2+bob,r*.8-k,r*.2+bob,8,'#b07aff',1,r*.25);glow(0,r*.1+bob,r*.7,'190,130,255',.18);
    /* หน้ากากซีด */
    E(0,-r*.95+bob,r*.34,r*.36,F('#1c1430'),1);Pg([-r*.24,-r*1.15+bob,r*.24,-r*1.15+bob,r*.2,-r*.72+bob,0,-r*.62+bob,-r*.2,-r*.72+bob],F('#d8d0e0'),1);
    if(!W){g.strokeStyle='#6a5a7a';g.lineWidth=1;g.beginPath();g.moveTo(0,-r*1.12+bob);g.lineTo(0,-r*.68+bob);g.stroke()}eye(-r*.1,-r*.95+bob,r*.06,r*.04,'#b47aff');eye(r*.1,-r*.95+bob,r*.06,r*.04,'#b47aff');
    /* จี้สมอ */
    if(!W){g.strokeStyle='#c08aff';g.lineWidth=1.5;const ax=0,ay=-r*.42+bob;g.beginPath();g.moveTo(ax,ay-r*.1);g.lineTo(ax,ay+r*.18);g.moveTo(ax-r*.12,ay+r*.08);g.quadraticCurveTo(ax,ay+r*.28,ax+r*.12,ay+r*.08);g.stroke()}return true}
  /* ---------------- 29 ห้องบัลลังก์ดาว ---------------- */
  if(th===29){
    if(t===0){/* องครักษ์หุ่นเชิดของโอเรียน: เกราะเงิน ข้อต่อลูกกลม เส้นเชือกแสงดาวดึงจากฟ้า */
      const lim=Math.sin(T*1.8)*.12;g.save();g.rotate(lim*.4);
      if(!W){g.strokeStyle='rgba(220,230,255,.55)';g.lineWidth=.8;[[-r*.6,-r*.2],[r*.6,-r*.2],[0,-r*1.2]].forEach(([x,y],i)=>{g.beginPath();g.moveTo(x,y+bob);g.lineTo(x*.3+Math.sin(T+i)*r*.2,-r*3.2);g.stroke()})}
      Ln([-r*.22,r*.3,-r*.28+lim*r,r*.9-la],F('#9aa0b8'),r*.2);Ln([r*.22,r*.3,r*.28-lim*r,r*.9-ra],F('#9aa0b8'),r*.2);E(-r*.24,r*.58,r*.1,r*.1,F('#6a6a88'),1);E(r*.24,r*.58,r*.1,r*.1,F('#6a6a88'),1);
      Pg([-r*.46,-r*.5+bob,r*.46,-r*.5+bob,r*.38,r*.38,-r*.38,r*.38],F('#c8cce0'),1);Pg([-r*.46,-r*.5+bob,r*.46,-r*.5+bob,r*.3,-r*.05+bob,-r*.3,-r*.05+bob],F('#e6eaf8'),0);
      if(!W){g.fillStyle='#4a3a8a';g.beginPath();for(let i=0;i<10;i++){const a=i*.628-1.57,R=i%2?r*.07:r*.16;g.lineTo(Math.cos(a)*R,-r*.1+bob+Math.sin(a)*R)}g.closePath();g.fill()}
      [-1,1].forEach(s=>{E(s*r*.54,-r*.42+bob,r*.13,r*.13,F('#6a6a88'),1);Ln([s*r*.56,-r*.36+bob,s*r*.72,r*.05+bob+s*lim*r],F('#b0b4cc'),r*.15);E(s*r*.72,r*.06+bob+s*lim*r,r*.09,r*.09,F('#6a6a88'),1)});
      E(0,-r*.82+bob,r*.3,r*.3,F('#d8dcec'),1);if(!W){g.fillStyle='#14102a';g.fillRect(-r*.22,-r*.86+bob,r*.44,r*.09);g.strokeStyle='#6a6a88';g.lineWidth=1;g.beginPath();g.moveTo(-r*.3,-r*.82+bob);g.lineTo(r*.3,-r*.82+bob);g.stroke()}
      glow(0,-r*.82+bob,r*.34,'210,220,255',.4);eye(-r*.1,-r*.82+bob,r*.05,r*.03,'#e8f0ff');eye(r*.1,-r*.82+bob,r*.05,r*.03,'#e8f0ff');
      Ln([r*.72,r*.1+bob,r*.82,-r*1.55+bob],F('#8a7a4a'),2);Pg([r*.76,-r*1.5+bob,r*.84,-r*1.9+bob,r*.92,-r*1.5+bob],F('#e8ecf8'),1);g.restore();return true}
    if(t===1){/* ดาวล่ามโซ่ */const fy=-r*.85+Math.sin(T*3.4)*r*.2,fx=Math.sin(T*1.7)*r*.2,rot=Math.sin(T*2)*.25;
      chain(fx,fy+r*.3,fx*.3,r*.75,6,'#a8a0c8',1);E(fx*.3,r*.78,r*.14,r*.08,F('#6a6488'),1);
      glow(fx,fy,r*1.1,'255,230,150',.3);g.save();g.translate(fx,fy);g.rotate(rot);g.beginPath();for(let i=0;i<10;i++){const a=i*.628-1.57,R=i%2?r*.24:r*.55;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.fillStyle=F('#ffe28a');g.fill();g.lineWidth=1;g.strokeStyle=O;g.stroke();
      if(!W){g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.ellipse(-r*.1,-r*.15,r*.12,r*.06,-.5,0,7);g.fill();g.strokeStyle='#5a3a10';g.lineWidth=1;g.beginPath();g.arc(0,r*.12,r*.08,3.6,5.8);g.stroke()}
      eye(-r*.1,-r*.02,r*.04,r*.05,'#4a2a10');eye(r*.1,-r*.02,r*.04,r*.05,'#4a2a10');g.restore();return true}
    /* ผู้คุมกลุ่มดาว: ร่างยักษ์สีห้วงฟ้ามืด จุดดาวเชื่อมเป็นกลุ่มดาว มงกุฎสามดาว */
    glow(0,-r*.5,r*1.5,'150,160,255',.14);
    Ln([-r*.3,r*.3,-r*.38,r*.88-la],F('#141a3a'),r*.3);Ln([r*.3,r*.3,r*.38,r*.88-ra],F('#141a3a'),r*.3);
    Pg([-r*.75,-r*.6+bob,r*.75,-r*.6+bob,r*.62,r*.45,-r*.62,r*.45],F('#18204a'),1);E(-r*.8,-r*.5+bob,r*.3,r*.26,F('#1c2656'),1);E(r*.8,-r*.5+bob,r*.3,r*.26,F('#1c2656'),1);
    Ln([-r*.88,-r*.35+bob,-r*1.0,r*.25+bob],F('#18204a'),r*.24);Ln([r*.88,-r*.35+bob,r*1.0,r*.25+bob],F('#18204a'),r*.24);
    E(0,-r*.92+bob,r*.32,r*.3,F('#18204a'),1);
    const S=[[-r*.8,-r*.5],[-r*.35,-r*.3],[0,-r*.1],[r*.4,-r*.35],[r*.8,-r*.5],[r*.2,r*.25],[-r*.3,r*.3],[-r*1.0,r*.25],[r*1.0,r*.25],[0,-r*.92]];
    if(!W){g.strokeStyle='rgba(200,215,255,.7)';g.lineWidth=1;g.beginPath();[[0,1],[1,2],[2,3],[3,4],[2,5],[2,6],[0,7],[4,8],[2,9]].forEach(([a,b])=>{g.moveTo(S[a][0],S[a][1]+bob);g.lineTo(S[b][0],S[b][1]+bob)});g.stroke();
      g.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<14;i++){g.fillRect(Math.sin(i*7.3)*r*.6,Math.cos(i*3.1)*r*.4-r*.1+bob,1,1)}}
    S.forEach(([x,y],i)=>{const tw=.6+.4*Math.sin(T*3+i);glow(x,y+bob,r*.18,'220,230,255',.5*tw);if(!W){g.fillStyle='#ffffff';g.beginPath();g.arc(x,y+bob,1.4+tw*.6,0,7);g.fill()}});
    [-r*.22,0,r*.22].forEach((x,i)=>{const y=-r*1.24+bob-(i===1?r*.12:0);if(!W){g.fillStyle='#ffe28a';g.beginPath();for(let k=0;k<10;k++){const a=k*.628-1.57,R=k%2?r*.04:r*.1;g.lineTo(x+Math.cos(a)*R,y+Math.sin(a)*R)}g.closePath();g.fill()}glow(x,y,r*.16,'255,230,140',.5)});
    eye(-r*.1,-r*.92+bob,r*.06,r*.04,'#cfd8ff');eye(r*.1,-r*.92+bob,r*.06,r*.04,'#cfd8ff');return true}
  return false}
drawMonC=(f=>function(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){try{const th=bTheme();if((th===29||th===30||th===31||th===33)&&t>=0&&t<=2&&drawMonN(th,t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra))return true}catch(e){}return f.apply(this,arguments)})(drawMonC);
