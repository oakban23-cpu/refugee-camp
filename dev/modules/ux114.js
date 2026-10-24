
/* ---------- v506 วาดบอสใหม่รายตัว ชุด 3: เทมเปสต์ · นิกซ์ · ราชาหมาป่าดาว · ร่างจริงราชันย์ห้วงลึก ----------
   (อาซาเอล · โวราธ · โรซาลีน · ราชาหุ่นเชิด วาดละเอียดแล้วในเวอร์ชันก่อน คงไว้) */

/* ================= เรดห้วงลึก · ราชันย์ห้วงลึก ร่างที่แท้จริง (ต่อยอดจากแบบใหม่ของราชันย์ห้วงลึก) ================= */
const BVAT={SK:'#3c3c92',SKD:'#1e1a56',SKL:'#6a6ad6',BL:'#a0a0e4',FIN:'#5a3ab4',MEM:'#9c80ec',COR:'#6af8e4',GD:'#bcc4ec',LU:'120,255,230'};
BV1['ราชันย์ห้วงลึก · ร่างที่แท้จริง']=(T,W,br,sw,up,cf)=>{
  /* หนวดยักษ์จากห้วงลึกด้านหลัง */
  for(let i=0;i<6;i++){const s=i%2?1:-1,k=i>>1,bx=s*(14+k*6),ex=s*(66+k*12)+Math.sin(T*1.2+i)*10,ey=-88+k*34+Math.cos(T*1.1+i)*9,P=[bx,14,bx+s*24,-16,ex-s*8,ey+30,ex,ey];
    vLimb(W,P,k?'#2a1e64':'#1a1042',17-k*3,3.4);vK(W,[[bx+s*2,12],['c',bx+s*26,-16,ex-s*6,ey+28,ex,ey+2]],'rgba(150,120,255,.35)',1.4);
    for(let j=1;j<5;j++){const q=j/5,x=bx+(ex-bx)*q+s*Math.sin(q*3)*6,y=14+(ey-14)*q;bvDE(W,x,y,1.8,1.8,'#bffcf2');bvAdd(W,()=>glowAt(x,y,5,'120,255,230',.6))}}
  bvAdd(W,()=>glowAt(0,-44,74,'90,60,200',.28+.08*Math.sin(T*2)));
  bvAbyss(T,W,br,sw,up,cf,BVAT);
  /* ดวงตาห้วงลึกที่สาม + หนามผลึกรอบมงกุฎ */
  {const hy=-92+br;for(let i=-4;i<=4;i++){if(Math.abs(i)<2)continue;const bx=i*6,h=12+(4-Math.abs(i))*5,y0=hy-16;vS(W,[[bx-2.6,y0],[bx+i*1.4,y0-h],[bx+2.6,y0]],'#160c34',1,.9);bvAdd(W,()=>glowAt(bx+i*1.4,y0-h,5,'120,255,230',.8))}
    const ey=hy-30+Math.sin(T*1.4)*1.5;vS(W,[[-6,ey],['q',0,ey-7,6,ey],['q',0,ey+7,-6,ey]],'#080418',1,1);bvAdd(W,()=>glowAt(0,ey,10+cf*8,'120,255,230',.8));vD(W,[[-1.4,ey],[0,ey-4],[1.4,ey],[0,ey+4]],W?'#fff':'#7affea')}
};
BVS['ราชันย์ห้วงลึก · ร่างที่แท้จริง']=1.2;

/* ================= แมพ 18 · เทมเปสต์ พญาวิหคพายุ (นกอินทรีพายุ) ================= */
BV1['เทมเปสต์ พญาวิหคพายุ']=(T,W,br,sw,up,cf)=>{const fy=-42+Math.sin(T*1.6)*6,fl=Math.sin(T*2.2)*.25-cf*.3,NV='#22356c',NVD='#121e42',NVL='#4a68b0',WH='#eef3fa',GD='#e8b830',EL='170,220,255';
  g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(0,30,62,13,0,0,7);g.fill();
  bvAdd(W,()=>{glowAt(0,fy-10,96,'120,170,255',.16)});
  /* ปีก */
  const wing=s=>{g.save();g.translate(s*14,fy-18);g.scale(s,1);g.rotate(-.12-fl);
    const TP=[[140,-42],[137,-24],[126,-10],[112,3],[96,13],[78,20],[60,24],[42,24],[24,20],[8,12]];
    const P=[[0,0],['q',26,-48,60,-54],['q',104,-58,TP[0][0],TP[0][1]]];for(let i=1;i<TP.length;i++){const a=TP[i-1],c=TP[i];P.push(['q',(a[0]+c[0])/2+4,(a[1]+c[1])/2+7,c[0],c[1]])}P.push([0,0]);
    vS(W,P,NV,1,1.4);
    for(let i=1;i<TP.length-1;i++){const t=TP[i],ax=i<4?60+(i-1)*18:Math.max(10,60-(i-3)*10),ay=i<4?-50+i*2:-40+(i-3)*6;vK(W,[[ax,ay],[t[0]-2,t[1]-2]],NVD,1.6)}
    for(let i=1;i<TP.length;i++){const a=TP[i-1],c=TP[i];vK(W,[[(a[0]*.25+c[0]*.75),(a[1]*.25+c[1]*.75)+3],['q',(a[0]+c[0])/2+4,(a[1]+c[1])/2+7,c[0],c[1]]],'#9ab8ec',2.2)}
    const CB=[[2,-2],['q',26,-46,60,-50],['q',100,-54,132,-40],['q',100,-38,62,-32],['q',30,-24,10,8]];vS(W,CB,NVL,1,1.1);
    for(let r=0;r<2;r++)for(let i=0;i<8;i++){const t=.06+i*.115,x=6+t*118,y=-4-Math.sin(Math.min(1,t*1.7)*1.4)*42+r*8+t*4;vS(W,[[x-6.5,y-2],['q',x,y-5,x+6.5,y-2],['q',x+5,y+6,x,y+8],['q',x-5,y+6,x-6.5,y-2]],r?'#5c7cc2':'#7e9ad8',1,.6)}
    vK(W,[[0,-2],['q',26,-48,60,-54],['q',104,-58,140,-42]],W?'#fff':'#d8e6fa',1.8);
    if(!W&&Math.sin(T*6+s*2)>.55)bvAdd(W,()=>{g.strokeStyle='rgba(235,248,255,.95)';g.lineWidth=1.8;g.beginPath();g.moveTo(40,-30);g.lineTo(58,-16);g.lineTo(50,-8);g.lineTo(78,4);g.lineTo(72,12);g.lineTo(100,18);g.stroke();glowAt(68,0,26,EL,.45)});
    g.restore()};
  wing(-1);wing(1);
  /* หางพัด */for(let i=0;i<7;i++){const a=(i-3)*.2+Math.sin(T*2+i)*.04,L=50-Math.abs(i-3)*5;g.save();g.translate(0,fy+22);g.rotate(a);
    vS(W,[[-5,0],['q',-6,L*.6,-2,L],['q',0,L+4,2,L],['q',6,L*.6,5,0]],i%2?NVD:NV,1,.9);for(let k=0;k<3;k++)vK(W,[[-4.6,L*(.35+k*.2)],[4.6,L*(.35+k*.2)]],'rgba(220,232,250,.7)',1.6);g.restore()}
  /* ขา + กรงเล็บทองกำสายฟ้า */
  for(const s of[-1,1]){const lx=s*12,ly=fy+18;vS(W,[[lx-7,ly-6],[lx+7,ly-6],[lx+6,ly+10],[lx-6,ly+10]],NVL,1,1);vLimb(W,[lx,ly+8,lx+s*3,ly+22],GD,5,4);
    for(let k=-1;k<=1;k++)vLimb(W,[lx+s*3,ly+22,lx+s*3+k*6,ly+28,lx+s*3+k*7,ly+32],'#1a1410',2.4,1.2,0)}
  bvAdd(W,()=>{g.strokeStyle='rgba(220,240,255,.95)';g.lineWidth=1.6;g.beginPath();g.moveTo(-26,fy+40);g.lineTo(-10,fy+34);g.lineTo(-14,fy+44);g.lineTo(8,fy+38);g.lineTo(2,fy+48);g.lineTo(26,fy+40);g.stroke();glowAt(0,fy+40,18,EL,.45)});
  /* ลำตัว + อกขนเกล็ด */
  vS(W,[[-26,fy-28],['q',0,fy-40,26,fy-28],['q',38,fy-4,22,fy+20],['q',0,fy+30,-22,fy+20],['q',-38,fy-4,-26,fy-28]],NV,1,1.5);
  vS(W,[[-17,fy-24],['q',0,fy-30,17,fy-24],['q',25,fy-2,13,fy+16],['q',0,fy+22,-13,fy+16],['q',-25,fy-2,-17,fy-24]],WH,1,1);
  if(!LOWQ)for(let r=0;r<4;r++)for(let i=-2;i<=2;i++){const x=i*5+(r%2)*2.5,y=fy-14+r*8;if(Math.abs(x)>13-r)continue;vK(W,[[x-2.6,y],['q',x,y+3,x+2.6,y]],'rgba(110,140,190,.55)',1)}
  /* คอ + หัวขาวหงอนพายุ จะงอยทอง */
  {const hy=fy-44;vS(W,[[-14,fy-24],['q',-16,hy+10,-8,hy+2],['q',0,hy-2,8,hy+2],['q',16,hy+10,14,fy-24]],WH,1,1.2);
    for(let i=0;i<6;i++){const a=-2.5+i*.32,L=20+(i===2||i===3?10:0);vS(W,[[Math.cos(a)*10-2,hy-4+Math.sin(a)*8],[Math.cos(a)*(10+L)-6+Math.sin(T*3+i)*1.5,hy-8+Math.sin(a)*(8+L)],[Math.cos(a)*10+3,hy-2+Math.sin(a)*8]],i%2?'#ffe070':'#9ad8ff',1,.8)}
    bvE(W,0,hy,16,15,WH,1.3);vS(W,[[-12,hy-6],['q',0,hy-12,12,hy-6],['q',8,hy-8,0,hy-8],['q',-8,hy-8,-12,hy-6]],'#c8d4e8',0);
    vS(W,[[8,hy-4],['q',20,hy-6,30,hy+2],['q',28,hy+10,22,hy+12],['q',22,hy+6,16,hy+6],['q',12,hy+6,8,hy+4]],GD,1,1.2);vK(W,[[10,hy+2],['q',18,hy+2,26,hy+6]],'#8a6410',1);
    vK(W,[[-2,hy-9],[14,hy-6]],'#1a2a4a',2.4);vEye(W,6,hy-4,3.4,2.8,cf>0?'#ffffff':'#8ae8ff',10);bvAdd(W,()=>glowAt(6,hy-4,9+cf*6,EL,.7))}
  /* ประกายไฟฟ้ารอบตัว */bvAdd(W,()=>{if(LOWQ)return;for(let i=0;i<3;i++){const a=T*3+i*2.1;g.strokeStyle='rgba(190,230,255,.75)';g.lineWidth=1.3;g.beginPath();g.moveTo(Math.cos(a)*44,fy+Math.sin(a)*32);g.lineTo(Math.cos(a+.15)*52,fy+Math.sin(a+.15)*38+4);g.lineTo(Math.cos(a+.3)*60,fy+Math.sin(a+.3)*42);g.stroke()}});
};

/* ================= แมพ 22 / ห้องบัลลังก์เงา · นิกซ์ ผู้ทอเงา (เจ้าหญิงร่างแมงมุมทอใยเงา) ================= */
BV1['นิกซ์ ผู้ทอเงา']=(T,W,br,sw,up,cf)=>{const b=br,DK='#1c0e2a',DKD='#0c0614',DKL='#3a2056',SK='#e6dcf0',HR='#140a1e',MG=cf>0?'255,70,110':'210,110,255',MGc=cf>0?'#ff5a7a':'#e090ff';
  bvShadow(78,16);
  /* ใยหลังวงกลม */{const cx=0,cy=-92+b,R=56;if(!W){g.save();g.translate(cx,cy);g.rotate(T*.08);g.strokeStyle='rgba(200,150,255,.32)';g.lineWidth=1;for(let i=0;i<12;i++){const a=i*.5236;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a)*R,Math.sin(a)*R);g.stroke()}
      for(let r=12;r<=R;r+=10){g.beginPath();for(let i=0;i<=12;i++){const a=i*.5236,rr=r+Math.sin(i*2+r)*1.4;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}g.stroke()}g.restore()}}
  /* ขาแมงมุม 8 ขา */
  const leg=(s,i,front)=>{const k=i,ph=Math.sin(T*2.4+k*1.3+(s>0?.8:0))*3,hx=s*(10+k*2.6),hy=-24+b+k*3,kx=s*(36+k*13),ky=-66+k*12+b+ph,fx=s*(50+k*17)+ph*s,fy2=29,mx=(kx+fx)/2+s*(10-k),my=(ky+fy2)/2-8;
    vLimb(W,[hx,hy,(hx+kx)/2,(hy+ky)/2-6,kx,ky],front?DKL:DK,7-k*.5,4.6);vLimb(W,[kx,ky,mx,my,fx,fy2],front?DK:DKD,4.6-k*.3,1.2,0);
    vK(W,[[hx,hy-1],['q',(hx+kx)/2,(hy+ky)/2-8,kx,ky-1]],'rgba(170,110,230,.35)',1.1);bvAdd(W,()=>glowAt(kx,ky,4.6,MG,.4));for(const q of[.35,.65])bvDE(W,kx+(mx-kx)*q*1.4,ky+(my-ky)*q*1.4,.9,.9,'#b070e0')};
  for(let i=3;i>=0;i--)for(const s of[-1,1])leg(s,i,false);
  /* ท้องแมงมุม + ลายนาฬิกาทรายเรือง */
  vS(W,[[-30,-30+b],['q',-42,-6+b,-26,14],['q',0,24,26,14],['q',42,-6+b,30,-30+b],['q',0,-46+b,-30,-30+b]],DK,1,1.5);
  if(!LOWQ)for(let i=0;i<4;i++)vK(W,[[-24+i*2,-22+i*9+b],['q',0,-18+i*9+b,24-i*2,-22+i*9+b]],'rgba(120,70,170,.4)',1.4);
  vS(W,[[-6,-20+b],[6,-20+b],[1.6,-8+b],[6,4+b],[-6,4+b],[-1.6,-8+b]],MGc,1,.8);bvAdd(W,()=>glowAt(0,-8+b,14,MG,.55));
  /* ส่วนอกแมงมุมรับลำตัวเจ้าหญิง */bvE(W,0,-30+b,16,10,DKL,1.2);
  /* ผมดำยาวด้านหลัง สลายเป็นเส้นใย */{const hy=-82+b;vS(W,[[-11,hy-4],['q',-19,hy+14,-17+Math.sin(T*1.4)*2,hy+44],['q',-8,hy+34,0,hy+40],['q',8,hy+34,17+Math.sin(T*1.4+1)*2,hy+44],['q',19,hy+14,11,hy-4]],HR,1,1.1);
    if(!W)for(let i=-3;i<=3;i++)vK(W,[[i*4,hy+34],['q',i*5.4+Math.sin(T*2+i)*3,hy+48,i*7.4+Math.sin(T*1.7+i)*5,hy+62]],'rgba(200,150,255,.35)',.8)}
  /* ชุดราตรีขาดลูกไม้ + ลำตัว */
  vS(W,[[-9,-70+b],[9,-70+b],['q',12,-50+b,16,-30+b],[10,-26+b],[5,-31+b],[0,-25+b],[-5,-31+b],[-10,-26+b],[-16,-30+b],['q',-12,-50+b,-9,-70+b]],'#4a2a6e',1,1.3);vK(W,[[-16,-30+b],[-10,-26+b],[-5,-31+b],[0,-25+b],[5,-31+b],[10,-26+b],[16,-30+b]],W?'#fff':'#c8a0f0',1.2);vK(W,[[-6,-50+b],['q',-8,-40+b,-11,-32+b]],'rgba(20,6,30,.5)',1.2);vK(W,[[6,-50+b],['q',8,-40+b,11,-32+b]],'rgba(20,6,30,.5)',1.2);
  vS(W,[[-8,-70+b],['q',0,-64+b,8,-70+b],[6,-58+b],['q',0,-55+b,-6,-58+b]],DKL,1,.9);if(!LOWQ)for(let i=-3;i<=3;i++)bvDE(W,i*2.6,-56.6+b+Math.abs(i)*.3,.9,.9,'#b890e0');
  vS(W,[[-2.4,-58+b],[2.4,-58+b],[0,-52+b]],MGc,1,.6);
  /* แขน + มือทอใย */
  const hand=(s)=>{const ex=s*24,ey=-56+b-(s<0?up*.4:0),hx=s*34+Math.sin(T*2+s)*2,hy=-70+b-(s<0?up:0)+Math.sin(T*1.7+s)*3;vLimb(W,[s*9,-68+b,ex,ey,hx,hy],SK,5,3.4);
    for(let k=-1;k<=1;k++)vK(W,[[hx,hy],[hx+s*(3+k),hy-4+k*2]],SK,1.2);return[hx,hy]};
  const HL=hand(-1),HR2=hand(1);
  /* ใยจากนิ้ว + หุ่นเงาห้อย */
  if(!W){g.save();g.strokeStyle='rgba(225,180,255,'+(.55+.35*cf)+')';g.lineWidth=.9;for(const[H,s]of[[HL,-1],[HR2,1]]){for(let k=0;k<3;k++){g.beginPath();g.moveTo(H[0]+s*3,H[1]-4);g.lineTo(s*(30+k*16),-118+b+k*10);g.stroke()}
      const px=H[0]+s*22+Math.sin(T*1.6+s)*5,py=H[1]+34;g.beginPath();g.moveTo(H[0]+s*3,H[1]-2);g.lineTo(px,py-12);g.moveTo(H[0]+s*3,H[1]-2);g.lineTo(px-5,py+2);g.moveTo(H[0]+s*3,H[1]-2);g.lineTo(px+5,py+2);g.stroke()}g.restore()}
  for(const[H,s]of[[HL,-1],[HR2,1]]){const px=H[0]+s*22+Math.sin(T*1.6+s)*5,py=H[1]+34,sw2=Math.sin(T*2.6+s)*.2;g.save();g.translate(px,py);g.rotate(sw2);g.scale(1.4,1.4);bvAdd(W,()=>glowAt(0,-2,14,MG,.3));const PC='#3c2456';
    bvE(W,0,-12,3.6,3.6,PC,.7);vS(W,[[-4,-8],[4,-8],[5,4],[-5,4]],PC,1,.7);vLimb(W,[-3,4,-5,14],PC,2.4,2,0);vLimb(W,[3,4,5,14],PC,2.4,2,0);vLimb(W,[-4,-6,-8,2],PC,2,1.6,0);vLimb(W,[4,-6,8,2],PC,2,1.6,0);vK(W,[[-5,4],[5,4]],'rgba(200,150,255,.6)',1);
    bvAdd(W,()=>{glowAt(-1.2,-12.6,2.6,MG,.9);glowAt(1.2,-12.6,2.6,MG,.9)});g.restore()}
  /* หัว: ผมดำยาวสลายเป็นเส้นใย + มงกุฎหนาม */
  {const hy=-82+b;
    vS(W,[[-8,hy-6],['q',-9,hy+6,-5,hy+10],['q',0,hy+13,5,hy+10],['q',9,hy+6,8,hy-6],['q',0,hy-12,-8,hy-6]],SK,1,1.1);
    vS(W,[[-10,hy-4],['q',-8,hy-16,0,hy-16],['q',8,hy-16,10,hy-4],['q',4,hy-10,0,hy-8],['q',-4,hy-10,-10,hy-4]],HR,1,1);
    for(const s of[-1,1]){vD(W,[[s*1.8,hy],[s*6,hy-1.4],[s*5.6,hy+1.4]],W?'#fff':MGc);bvAdd(W,()=>glowAt(s*3.8,hy,6,MG,.8))}vK(W,[[-2,hy+6.4],['q',0,hy+7.4,2,hy+6.4]],'#8a5070',.9);
    if(!LOWQ){vK(W,[[-3.6,hy+1.6],[-3.6,hy+5]],'rgba(60,20,80,.5)',.7);vK(W,[[3.6,hy+1.6],[3.6,hy+5]],'rgba(60,20,80,.5)',.7)}
    for(let i=-3;i<=3;i++){const bx=i*3.2,h=6+(3-Math.abs(i))*3;vS(W,[[bx-1.6,hy-14],[bx+i*.6,hy-14-h],[bx+1.6,hy-14]],'#2a1440',1,.7);if(i%2===0){bvE(W,bx+i*.6,hy-14-h,1.4,1.4,'#c070ff',.4);bvAdd(W,()=>glowAt(bx+i*.6,hy-14-h,4,MG,.7))}}}
};

/* ================= ลิฟต์เหมือง · ราชาหมาป่าดาว ================= */
BV1['ราชาหมาป่าดาว']=(T,W,br,sw,up,cf)=>{const hf=bvHF(),b=br-2,FU='#26305e',FUD='#161c3c',FUL='#4a5a9e',CR='#9aeaff',CRL='#dcfaff',cr=hf<.5,mv=BWK.mv||0,am=2.5+mv*6;
  bvShadow(86,15);
  bvAdd(W,()=>glowAt(0,-46+b,78,cr?'170,200,255':'120,200,255',.16+(cr?.1:0)));
  /* หางดาว */{const ts=Math.sin(T*2.4)*6;vS(W,[[-58,-58+b],['q',-84,-80+b+ts*.4,-108,-74+b+ts],['q',-98,-62+b+ts,-104,-52+b+ts*.6],['q',-84,-52+b,-60,-44+b]],FU,1,1.3);
    vS(W,[[-92,-76+b+ts*.8],['q',-104,-74+b+ts,-108,-74+b+ts],['q',-102,-64+b+ts,-96,-60+b+ts*.7]],FUL,0);
    bvAdd(W,()=>{for(let i=0;i<4;i++){const q=(T*1.2+i/4)%1;glowAt(-108-q*22,-74+b+ts-q*12,4,'170,230,255',.7*(1-q))}})}
  /* ขา: หน้า = ตรงมีศอก · หลัง = ต้นขาหนา + ข้อเท้างอ */
  const leg=(x,ph,near,front)=>{const k=Math.sin(T*(mv?7:3)+ph)*am,c=near?FU:FUD,cd=near?'#1a2246':'#10142c';
    if(front){const top=[x,-50+b],el=[x+3+k*.3,-26+b],ft=[x+2+k,24];vLimb(W,[top[0],top[1],el[0],el[1]],c,18,11);vLimb(W,[el[0],el[1],ft[0],ft[1]-3],c,11,8);
      vS(W,[[ft[0]-6,ft[1]-5],[ft[0]+8,ft[1]-4],[ft[0]+10,ft[1]+3],[ft[0]-6,ft[1]+3]],cd,1,1);for(let i=0;i<3;i++)vFang(W,ft[0]+5+i*2.4,ft[1]+1,1.6,3,'#e8f2ff')}
    else{const hip=[x,-52+b],kn=[x+12+k*.3,-30+b],hk=[x-4+k*.5,-8+b],ft=[x+2+k,24];vS(W,[[hip[0]-16,hip[1]-6],['q',hip[0]+6,hip[1]-14,hip[0]+18,hip[1]+2],['q',kn[0]+6,kn[1]+4,kn[0]-2,kn[1]+8],['q',hip[0]-14,hip[1]+16,hip[0]-16,hip[1]-6]],c,1,1.3);
      vLimb(W,[kn[0],kn[1]+2,hk[0],hk[1]],c,11,8);vLimb(W,[hk[0],hk[1],ft[0],ft[1]-3],c,8,7);
      vS(W,[[ft[0]-6,ft[1]-5],[ft[0]+8,ft[1]-4],[ft[0]+10,ft[1]+3],[ft[0]-6,ft[1]+3]],cd,1,1);for(let i=0;i<3;i++)vFang(W,ft[0]+5+i*2.4,ft[1]+1,1.6,3,'#e8f2ff')}};
  leg(-40,3.1,false,false);leg(30,4.7,false,true);
  /* ลำตัว: อกลึก เอวคอด สะโพก หลังโค้ง */
  const BD=[[-64,-56+b],['q',-62,-74+b,-42,-74+b],['q',-14,-70+b,8,-78+b],['q',30,-88+b,50,-74+b],['q',62,-58+b,50,-36+b],['q',40,-20+b,24,-24+b],['q',4,-38+b,-20,-40+b],['q',-48,-34+b,-60,-42+b],['q',-66,-48+b,-64,-56+b]];
  vS(W,BD,FU,1,1.6);vS(W,[[-50,-44+b],['q',-24,-36+b,-4,-40+b],['q',20,-28+b,40,-30+b],['q',26,-24+b,6,-34+b],['q',-26,-32+b,-50,-44+b]],FUD,0);
  if(!LOWQ){g.save();vP(BD);g.clip();for(let i=0;i<8;i++){const x=-56+i*14;vK(W,[[x,-66+b],['q',x+10,-58+b,x+6,-50+b]],'rgba(130,150,230,.22)',1.8)}g.restore()}
  for(let i=0;i<6;i++){const x=34-i*7,y=-24+b-i*2.4;vD(W,[[x-3,y-1],[x,y+5],[x+3,y-1]],FU)}
  /* หนามคริสตัลบนหลัง */
  for(let i=0;i<7;i++){const x=-48+i*12,y=-70+b-(i>=3&&i<=5?6:0)-Math.max(0,i-3)*2,h=14+(i%2)*8+(i===4||i===5?12:0),lean=-.18+i*.03;
    vS(W,[[x-5.4,y+4],[x-3+lean*h,y-h*.7],[x+lean*h*1.2,y-h],[x+3+lean*h,y-h*.7],[x+5.4,y+4]],i%2?CR:CRL,1,1);vK(W,[[x-1,y+2],[x+lean*h*1.1,y-h+3]],'rgba(255,255,255,.7)',.8);bvAdd(W,()=>glowAt(x+lean*h*.6,y-h*.5,10,'150,230,255',.4))}
  if(cr&&!W){vK(W,[[-30,-62+b],[-20,-50+b],[-28,-40+b]],'rgba(225,248,255,.95)',1.6);vK(W,[[8,-66+b],[2,-52+b],[10,-42+b]],'rgba(225,248,255,.95)',1.4)}
  /* แผงคอขนดาว */for(let i=0;i<7;i++){const a=-1.9+i*.36,x=36+Math.cos(a)*22,y=-62+b+Math.sin(a)*22;vS(W,[[x-5,y+3],[x+Math.cos(a)*14,y+Math.sin(a)*14],[x+5,y+3]],i%2?FUL:FU,1,.8)}
  if(!W)for(let i=0;i<5;i++){const x=24+i*7,y=-72+b+Math.sin(i*2)*8;bvStar(W,x,y,2.2,.9,4,T+i,'rgba(230,248,255,.85)')}
  /* ขาฝั่งใกล้ */leg(-46,0,true,false);leg(38,1.6,true,true);
  /* หัวหมาป่า */
  {const hx=60,hy=-74+b+up*.15,mo=1.5+cf*6+Math.max(0,Math.sin(T*2))*1.4;
    vS(W,[[hx-6,hy-16],[hx-12,hy-38],[hx+2,hy-20]],FUD,1,1);vS(W,[[hx+6,hy-18],[hx+4,hy-40],[hx+16,hy-20]],FU,1,1);vD(W,[[hx+7,hy-21],[hx+6,hy-34],[hx+13,hy-21]],'#4a3a6a');
    vS(W,[[hx-16,hy+6],['q',hx-18,hy-16,hx,hy-18],['q',hx+14,hy-18,hx+22,hy-8],[hx+42,hy-2],['q',hx+46,hy+2,hx+42,hy+6],[hx+22,hy+8],['q',hx,hy+16,hx-16,hy+6]],FU,1,1.4);
    vS(W,[[hx+20,hy+8],[hx+40,hy+6+mo*.4],['q',hx+34,hy+14+mo,hx+18,hy+14+mo],['q',hx+8,hy+14,hx+4,hy+10]],FUD,1,1.1);
    vS(W,[[hx+20,hy+7],[hx+40,hy+6],[hx+36,hy+9+mo*.5],[hx+18,hy+10+mo*.5]],'#3a0e1a',0);
    for(let i=0;i<4;i++){vFang(W,hx+24+i*4.6,hy+6.6,2,3.6,'#f0f6ff');vD(W,[[hx+22+i*4.6,hy+12+mo*.6],[hx+24+i*4.6,hy+8+mo*.6],[hx+26+i*4.6,hy+12+mo*.6]],'#f0f6ff')}
    bvE(W,hx+43,hy+1,3.4,2.6,'#0c0e1a',.8);vK(W,[[hx+6,hy-10],[hx+20,hy-6]],FUD,2.6);vEye(W,hx+14,hy-4,3.6,2.4,'#bff4ff',10);bvAdd(W,()=>glowAt(hx+14,hy-4,9,'170,235,255',.7));
    if(cf>0)bvAdd(W,()=>glowAt(hx+40,hy+8,10+cf*16,'170,230,255',.7*cf));
    /* มงกุฎดาวลอย */for(let i=0;i<5;i++){const a=-2.4+i*.35,px=hx-2+Math.cos(a)*26,py=hy-14+Math.sin(a)*24+Math.sin(T*2+i)*1.2;bvAdd(W,()=>glowAt(px,py,7,'200,235,255',.5));bvStar(W,px,py,4.4,1.8,4,T+i,'#e8f8ff')}}
};

Object.assign(BVH,{'ราชันย์ห้วงลึก · ร่างที่แท้จริง':176,'เทมเปสต์ พญาวิหคพายุ':150,'นิกซ์ ผู้ทอเงา':150,'ราชาหมาป่าดาว':124});
Object.assign(BVWD,{'เทมเปสต์ พญาวิหคพายุ':160,'ราชาหมาป่าดาว':124,'นิกซ์ ผู้ทอเงา':112,'ราชันย์ห้วงลึก · ร่างที่แท้จริง':118});
