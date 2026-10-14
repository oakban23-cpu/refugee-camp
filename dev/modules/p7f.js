/* ---------- v363 มอนชุดใหม่ของเหมืองดาวคาร์น (แมพ 35 + ดันเจี้ยนลิฟต์เหมือง) ----------
   0 หมาป่าแร่คาร์น — ขนสีสนิมฝุ่นหุบผา ผลึกแร่ดาวงอกจากไหล่ · สายรัดคนงานขาด ๆ กับตะเกียงเหมืองแกว่ง
   1 ค้างคาวผลึกถ้ำ — ปีกหนังสีน้ำตาลเข้ม ปลายปีกเป็นผลึก ยิงเศษแร่
   2 โกเลมแร่ดาว — หินแดงต่อกันด้วยไม้ค้ำเหมือง แกนแร่สีฟ้ากลางอก จอบปักไหล่ */
function drawMonKM(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){const glow=(x,y,rr,c,a)=>{if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';glowAt(x,y,rr,c,Math.min(1,a*1.6));g.restore()};
  const cry=(x,y,w,h,rot)=>{g.save();g.translate(x,y);g.rotate(rot||0);Pg([-w,0,-w*.45,-h*.75,0,-h,w*.5,-h*.7,w,0],F('#5ac4f0'),1);if(!W){g.fillStyle='rgba(220,248,255,.75)';g.beginPath();g.moveTo(-w*.45,-h*.75);g.lineTo(0,-h);g.lineTo(w*.05,0);g.lineTo(-w*.5,0);g.closePath();g.fill()}g.restore()};
  if(t===0){
    Ln([-r*.45,-r*.15,-r*.56,r*.8-la],F('#4a2616'),r*.21);Ln([-r*.15,-r*.15,-r*.2,r*.82-ra],F('#5e321e'),r*.21);Ln([r*.25,-r*.15,r*.3,r*.82-la],F('#4a2616'),r*.21);Ln([r*.52,-r*.15,r*.62,r*.8-ra],F('#5e321e'),r*.21);
    Ln([-r*.72,-r*.42+bob,-r*1.05,-r*.62+bob+sw*r*.12,-r*1.22,-r*.5+bob+sw*r*.16],F('#5e321e'),r*.17);
    E(0,-r*.4+bob,r*.8,r*.4,F('#6e3a22'),1);E(-r*.05,-r*.26+bob,r*.56,r*.17,F('#8a5232'),0);
    if(!W){g.strokeStyle='rgba(40,18,8,.55)';g.lineWidth=1.3;for(let i=0;i<5;i++){g.beginPath();g.moveTo(-r*.55+i*r*.24,-r*.62+bob);g.lineTo(-r*.5+i*r*.24,-r*.48+bob);g.stroke()}}
    cry(-r*.3,-r*.68+bob,r*.13,r*.5,-.35);cry(-r*.05,-r*.72+bob,r*.11,r*.36,.1);cry(r*.18,-r*.7+bob,r*.08,r*.24,.4);
    /* สายรัด + ตะเกียงเหมือง */
    Ln([r*.42,-r*.72+bob,r*.42,-r*.12+bob],F('#2a1a10'),r*.07);
    {const lx=r*.38+Math.sin(T*4)*r*.05,ly=-r*.02+bob;Ln([r*.42,-r*.12+bob,lx,ly],F('#2a1a10'),1.2);E(lx,ly+r*.09,r*.08,r*.1,F('#3a2a1a'),1);if(!W){g.fillStyle='#ffd27a';g.fillRect(lx-r*.045,ly+r*.05,r*.09,r*.08)}glow(lx,ly+r*.09,r*.28,'255,190,90',.45)}
    E(r*.76,-r*.6+bob,r*.33,r*.26,F('#6e3a22'),1);Pg([r*.95,-r*.68+bob,r*1.34,-r*.54+bob,r*1.28,-r*.38+bob,r*.95,-r*.4+bob],F('#5e321e'),1);
    if(!W){g.fillStyle='#efe4d0';Pg([r*1.06,-r*.43+bob,r*1.1,-r*.33+bob,r*1.14,-r*.42+bob],'#efe4d0',0);Pg([r*1.18,-r*.42+bob,r*1.21,-r*.34+bob,r*1.24,-r*.41+bob],'#efe4d0',0)}
    Pg([r*.58,-r*.8+bob,r*.62,-r*1.1+bob,r*.76,-r*.84+bob],F('#4a2616'),1);Pg([r*.8,-r*.82+bob,r*.9,-r*1.08+bob,r*.96,-r*.8+bob],F('#4a2616'),1);
    glow(r*.86,-r*.66+bob,r*.24,'140,230,255',.4);eye(r*.85,-r*.66+bob,r*.07,r*.05,'#a8f4ff');eye(r*1.02,-r*.64+bob,r*.06,r*.045,'#a8f4ff');return true}
  if(t===1){const hv=Math.sin(T*3.4)*r*.14,fl=Math.sin(T*16),cy=-r*.62+hv;
    for(const s of[-1,1]){g.save();g.translate(s*r*.2,cy);g.rotate(s*fl*.32);const P=[0,-r*.08,s*r*.45,-r*.42,s*r*.95,-r*.3,s*r*1.18,r*.02,s*r*.92,r*.06,s*r*.78,r*.22,s*r*.58,r*.1,s*r*.4,r*.24,s*r*.2,r*.1,0,r*.12];
      Pg(P,F('#3a2418'),1);if(!W){g.strokeStyle='rgba(120,70,40,.8)';g.lineWidth=1.2;g.beginPath();g.moveTo(0,0);g.lineTo(s*r*.92,r*.06);g.moveTo(0,0);g.lineTo(s*r*.58,r*.1);g.moveTo(s*r*.45,-r*.42);g.lineTo(s*r*.4,r*.24);g.stroke()}
      cry(s*r*1.16,r*.04,r*.07,r*.22,s*1.9);g.restore()}
    E(0,cy,r*.28,r*.34,F('#5a3420'),1);E(0,cy+r*.08,r*.18,r*.2,F('#7a4a2c'),0);
    Pg([-r*.2,cy-r*.22,-r*.3,cy-r*.56,-r*.06,cy-r*.3],F('#4a2a18'),1);Pg([r*.2,cy-r*.22,r*.3,cy-r*.56,r*.06,cy-r*.3],F('#4a2a18'),1);
    glow(0,cy-r*.12,r*.22,'140,230,255',.35);eye(-r*.09,cy-r*.12,r*.065,r*.07,'#a8f4ff');eye(r*.09,cy-r*.12,r*.065,r*.07,'#a8f4ff');
    if(!W){g.fillStyle='#efe4d0';Pg([-r*.05,cy+r*.02,-r*.03,cy+r*.1,-r*.01,cy+r*.02],'#efe4d0',0);Pg([r*.01,cy+r*.02,r*.03,cy+r*.1,r*.05,cy+r*.02],'#efe4d0',0)}
    Ln([-r*.08,cy+r*.32,-r*.12,cy+r*.46],F('#2a1a10'),r*.05);Ln([r*.08,cy+r*.32,r*.12,cy+r*.46],F('#2a1a10'),r*.05);return true}
  /* โกเลมแร่ดาว */
  Ln([-r*.36,r*.05,-r*.42,r*.85-la],F('#5a2e1c'),r*.32);Ln([r*.36,r*.05,r*.42,r*.85-ra],F('#5a2e1c'),r*.32);E(-r*.44,r*.86-la,r*.2,r*.09,F('#3a1e12'),0);E(r*.44,r*.86-ra,r*.2,r*.09,F('#3a1e12'),0);
  Pg([-r*.72,-r*1.0+bob,-r*.28,-r*1.22+bob,r*.4,-r*1.15+bob,r*.78,-r*.68+bob,r*.64,r*.18,r*.1,r*.3,-r*.52,r*.22,-r*.84,-r*.28+bob],F('#7a3e24'),1);
  Pg([-r*.72,-r*1.0+bob,-r*.28,-r*1.22+bob,-r*.02,-r*.92+bob,-r*.42,-r*.5+bob,-r*.84,-r*.28+bob],F('#9a5432'),0);
  if(!W){g.strokeStyle='rgba(40,16,8,.6)';g.lineWidth=1.6;g.beginPath();g.moveTo(-r*.7,-r*.62+bob);g.lineTo(r*.7,-r*.56+bob);g.moveTo(-r*.6,-r*.12);g.lineTo(r*.6,-r*.08);g.moveTo(r*.05,-r*1.15+bob);g.lineTo(-r*.05,-r*.62+bob);g.stroke()}
  /* ไม้ค้ำเหมืองรัดตัว */for(const[a,b,c,d]of[[-r*.8,-r*.36+bob,r*.72,-r*.4+bob],[-r*.55,-r*1.05+bob,-r*.62,r*.12]]){Ln([a,b,c,d],F('#6a4a2a'),r*.11);if(!W){g.strokeStyle='rgba(30,16,6,.6)';g.lineWidth=1;g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.stroke()}}
  if(!W){g.fillStyle='#c8c0b0';for(const[x,y]of[[-r*.6,-r*.37+bob],[r*.5,-r*.39+bob],[-r*.58,-r*.7+bob]]){g.beginPath();g.arc(x,y,r*.035,0,7);g.fill()}}
  /* แกนแร่ดาวกลางอก */{const cg=.6+.4*Math.sin(T*2.6);glow(r*.1,-r*.68+bob,r*.5,'120,215,255',.4*cg);cry(r*.02,-r*.55+bob,r*.13,r*.36,-.2);cry(r*.2,-r*.56+bob,r*.1,r*.28,.35)}
  /* จอบปักไหล่ */{const px=r*.55,py=-r*1.05+bob;Ln([px-r*.1,py+r*.12,px+r*.22,py-r*.42],F('#7a5232'),r*.07);Pg([px+r*.04,py-r*.42,px+r*.4,py-r*.48,px+r*.42,py-r*.4,px+r*.1,py-r*.34],F('#8a8a92'),1)}
  for(const s of[-1,1]){const ax=s*r*.84,ay=-r*.72+bob,sv=(s<0?la:ra)*.5;Ln([s*r*.62,-r*.9+bob,ax+s*r*.18,ay+r*.32+sv],F('#6e3820'),r*.28);
    Pg([ax-s*r*.02,ay+r*.36+sv,ax+s*r*.14,ay+r*.26+sv,ax+s*r*.36,ay+r*.3+sv,ax+s*r*.44,ay+r*.48+sv,ax+s*r*.34,ay+r*.64+sv,ax+s*r*.1,ay+r*.66+sv,ax-s*r*.04,ay+r*.52+sv],F('#6a3420'),1);if(!W){g.fillStyle='rgba(170,100,70,.5)';g.beginPath();g.ellipse(ax+s*r*.16,ay+r*.36+sv,r*.1,r*.05,0,0,7);g.fill()}if(s>0)cry(ax+s*r*.3,ay+r*.32+sv,r*.07,r*.18,.4)}
  E(0,-r*1.32+bob,r*.25,r*.19,F('#7a3e24'),1);Pg([-r*.28,-r*1.36+bob,-r*.2,-r*1.5+bob,r*.18,-r*1.5+bob,r*.28,-r*1.36+bob],F('#5a2e1c'),1);
  glow(0,-r*1.33+bob,r*.2,'140,230,255',.4);eye(-r*.09,-r*1.33+bob,r*.065,r*.04,'#a8f4ff');eye(r*.09,-r*1.33+bob,r*.065,r*.04,'#a8f4ff');
  if(!W)for(let i=0;i<4;i++){const q=(T*.7+i/4)%1;g.fillStyle='rgba(150,100,70,'+(.5*(1-q))+')';g.beginPath();g.arc(-r*.4+i*r*.26,r*.7-q*r*.5,r*.05*(1+q),0,7);g.fill()}
  return true}
