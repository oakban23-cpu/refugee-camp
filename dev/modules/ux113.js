
/* ---------- v505 วาดบอสใหม่รายตัว ชุด 2: บอสเนื้อเรื่อง 8 ตัว ----------
   ใช้ระบบเดียวกับชุด 1 (ux112.js: BV1 · BVH · bvE · bvL3 · bvAdd · bvShadow) · คงกลไกภาพเดิมตามเลือดบอส (ร้าว/เฟส/มงกุฎลอย ฯลฯ) */
const bvHF=()=>{if(BV1.hf!=null)return BV1.hf;const B=mons.find(q=>q.t===3);return B?B.hp/(B.mh||1):1};
const bvStar=(W,x,y,R,r,n,a0,c)=>{g.beginPath();for(let i=0;i<n*2;i++){const a=a0+i*Math.PI/n,q=i%2?r:R;g.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}g.closePath();g.fillStyle=W?'#fff':c;g.fill()};

/* ================= คืนรากดำ · ราชันรากดำ ================= */
BV1['ราชันรากดำ']=(T,W,br,sw,up,cf)=>{const b=br*.8,BK='#4c3220',BKD='#24160c',BKL='#74502e',MS='#4e6e2a',AM='255,170,60';
  const mv=BWK.mv||0,ph=BWK.ph||0;bvShadow(64,16);
  /* รากคืบบนพื้น */for(let i=0;i<9;i++){const a=-2.95+i*.37+Math.sin(T*.7+i)*.05,L=40+(i%3)*12+Math.sin(T*1.3+i*2)*3,ex=Math.cos(a)*L*-1.1,ey=27+Math.abs(Math.sin(a))*5;
    vLimb(W,[Math.sign(ex)*8,22,ex*.55,22+((i%2)?-4:4),ex,ey],BKD,6-(i%3),1.4,0);if(i%2===0)bvAdd(W,()=>glowAt(ex,ey,5,AM,.4+.25*Math.sin(T*3+i)))}
  /* ขามัดราก */
  for(const s of[-1,1]){const lf=mv*Math.max(0,Math.sin(ph+(s>0?0:Math.PI)))*6;g.save();g.translate(0,-lf);
    vS(W,[[s*6,-10+b],[s*24,-8+b],['q',s*30,8,s*30,26],[s*36,30],[s*24,29],[s*20,31],[s*12,28],[s*6,30],['q',s*8,10,s*6,-10+b]],BK,1,1.4);
    for(let k=0;k<3;k++)vK(W,[[s*(9+k*5),-6+b],['q',s*(12+k*6),10,s*(10+k*7),27]],'rgba(14,8,4,.55)',1.6);g.restore()}
  /* แขนหลัง: รากยาวลากพื้น */
  {const hx=-48,hy=4+b+Math.sin(T*1.6)*2;vLimb(W,[-26,-62+b,-46,-44+b,hx,hy],BKD,16,10);for(let k=-1;k<=1;k++)vLimb(W,[hx,hy,hx-3+k*5,hy+10,hx-4+k*8,hy+20],BKD,4,1.4,0);
    vK(W,[[-36,-56+b],['q',-48,-36+b,-46,-14+b]],'rgba(140,96,52,.35)',1.4)}
  /* ลำตัวรากบิดเกลียว */
  const TB=[[-30,-64+b],['q',0,-80+b,30,-64+b],['c',42,-48+b,36,-14+b,26,0+b],['q',0,8+b,-26,0+b],['c',-36,-14+b,-42,-48+b,-30,-64+b]];
  vS(W,TB,BK,1,1.6);
  if(!LOWQ){g.save();vP(TB);g.clip();for(let i=0;i<10;i++){const x0=-36+i*8;vK(W,[[x0,-80+b],['c',x0+10,-56+b,x0-10,-26+b,x0+4,6+b]],i%2?'rgba(12,6,2,.5)':'rgba(150,104,58,.32)',i%2?3.4:1.8)}g.restore()}
  /* โพรงอก + แกนอำพัน + ซี่ราก */
  {const cy=-36+b,pu=.7+.3*Math.sin(T*2.6)+cf*.5;bvE(W,0,cy,13,15,'#120804',1.1);
    bvAdd(W,()=>{glowAt(0,cy,26*pu,AM,.75);glowAt(0,cy,9,'255,240,200',.95)});bvE(W,0,cy,6.5,8,'#ffb040',.8);
    for(const s of[-1,1])for(let k=0;k<3;k++)vLimb(W,[s*2,cy-12+k*9,s*12,cy-10+k*9,s*15,cy-4+k*9],BKD,3.4,2,0);
    if(!W){g.strokeStyle='rgba(255,190,90,'+(.55+.3*pu)+')';g.lineWidth=1.2;g.beginPath();for(const[a,c,d,e]of[[12,-14,22,-26],[-12,-12,-24,-22],[13,10,24,18],[-13,9,-24,16]]){g.moveTo(a,cy+c);g.lineTo((a+d)/2+2,cy+(c+e)/2);g.lineTo(d,cy+e)}g.stroke()}}
  /* บ่า: ปุ่มเปลือกไม้ + มอส + หนาม + เห็ดเรือง */
  for(const s of[-1,1]){const px=s*30,py=-62+b;bvE(W,px,py,15,11,BKL,1.3);vS(W,[[px-12,py-2],['q',px,py-12,px+12,py-2],['q',px+6,py+2,px,py],['q',px-6,py+3,px-12,py-2]],MS,1,.8);
    for(let k=0;k<3;k++){const bx=px+s*(k*7-6),by=py-8+k*2;vS(W,[[bx-3,by],[bx+s*4,by-16-k*4],[bx+3,by]],BKD,1,.9)}
    for(let k=0;k<2;k++){const mx=px-s*(4+k*6),my=py-9+k;vK(W,[[mx,my],[mx,my-4]],'#d8c8a0',1.2);bvE(W,mx,my-4.6,2.6,1.6,'#ffb860',.6);bvAdd(W,()=>glowAt(mx,my-4,5,AM,.45))}}
  /* หัว: หน้ากากไม้แกะ + มงกุฎรากหนาม */
  {const hy=-86+b;
    for(let i=-3;i<=3;i++){const bx=i*5.4,bh=16+(3-Math.abs(i))*6,cv=i*2;vLimb(W,[bx,hy-8,bx+cv,hy-8-bh*.6,bx+cv*2.3,hy-8-bh],BKD,4.4-Math.abs(i)*.4,1.2,0);
      if(i%2===0){bvE(W,bx+cv*2.3,hy-8-bh,2.4,2.4,'#ffb040',.6);bvAdd(W,()=>glowAt(bx+cv*2.3,hy-8-bh,7,AM,.6))}}
    vS(W,[[-15,hy-6],['q',0,hy-15,15,hy-6],['q',18,hy+6,12,hy+16],['q',0,hy+22,-12,hy+16],['q',-18,hy+6,-15,hy-6]],BKL,1,1.4);
    vK(W,[[-12,hy-4],['q',0,hy-9,12,hy-4]],'rgba(20,10,4,.6)',1.6);vK(W,[[0,hy-11],[0,hy+3]],'rgba(20,10,4,.45)',1.2);
    for(const s of[-1,1]){vD(W,[[s*2,hy-1],['q',s*7,hy-6,s*11,hy-1],['q',s*7,hy+5,s*2,hy-1]],'#060302');vEye(W,s*6.5,hy-.6,1.9,2.2,'#ffb040',8)}
    bvAdd(W,()=>{glowAt(-6.5,hy,8,AM,.7);glowAt(6.5,hy,8,AM,.7)});
    vD(W,[[-6,hy+10],[-3,hy+7],[0,hy+11],[3,hy+7],[6,hy+10],[3,hy+13],[0,hy+12],[-3,hy+13]],'#0a0604');
    vS(W,[[-8,hy+16],['q',-6,hy+26,-2,hy+30],['q',0,hy+24,2,hy+30],['q',6,hy+26,8,hy+16]],MS,1,.8)}
  /* แขนหน้า (ยกตอนร่าย) */
  {const hx=46,hy=-14+b-up*1.6;vLimb(W,[26,-62+b,48,-48+b-up*.6,hx,hy],BK,17,11);vK(W,[[34,-58+b],['q',48,-44+b-up*.6,46,-22+b-up]],'rgba(150,104,58,.35)',1.4);
    for(let k=-1;k<=1;k++)vLimb(W,[hx,hy,hx+5+k*3,hy+8-up*.4,hx+3+k*7,hy+16-up*.8],BKD,4.6,1.4,0);
    if(cf>0)bvAdd(W,()=>glowAt(hx+3,hy+8,12+cf*16,AM,.8*cf))}
  /* สปอร์ลอย */bvAdd(W,()=>{for(let i=0;i<8;i++){const q=(T*.35+i/8)%1;glowAt(-40+((i*23)%80)+Math.sin(T+i)*4,22-q*110,2.8,AM,.6*Math.sin(q*Math.PI))}});
};

/* ================= ศาลาราชินี · คาสเซียน ================= */
BV1['คาสเซียน · ผู้บัญชาการองครักษ์ดาว']=(T,W,br,sw,up,cf)=>{const b=br-1,hf=bvHF(),cr=hf<.5,AR='#d4def2',ARD='#8e9cc0',ARL='#f2f6ff',GD='#d6aa44',BL='#2a3c86',EY=cr?'#ffe0a0':'#e8f0ff';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;bvShadow(56,14);
  /* ผ้าคลุมดาว */{const cs=Math.sin(T*1.3)*4;vS(W,[[-28,-74+b],[28,-74+b],['q',44+cs,-30,50+cs,26],[34,30],[18,25],[0,31],[-18,25],[-34,30],[-50-cs,26],['q',-44-cs,-30,-28,-74+b]],'#1a2654',1,1.4);
    if(!W)for(let i=0;i<16;i++){const x=-42+(i*29)%84,y=-50+(i*37)%74,tw=.5+.5*Math.abs(Math.sin(T*2+i));g.fillStyle='rgba(225,235,255,'+tw+')';g.beginPath();g.arc(x,y,i%4?1:1.7,0,7);g.fill()}
    vK(W,[[-50-cs,26],[-34,30],[-18,25],[0,31],[18,25],[34,30],[50+cs,26]],W?'#fff':GD,1.4)}
  /* ขาเกราะ */for(const s of[-1,1]){const st=s*wk,kx=s*11+st*3,ax=s*11+st*5,ay=27-Math.max(0,st)*3;vLimb(W,[s*9,-12+b,kx,6,ax,ay-3],ARD,12,10);
    vS(W,[[kx-6,6],[kx+6,6],[ax+5,ay-4],[ax-5,ay-4]],AR,1,1.1);vK(W,[[kx-5,11],[kx+5,11]],W?'#fff':GD,1.2);bvE(W,kx,3,6,5,ARL,1);vS(W,[[ax-6,ay-5],[ax+6,ay-5],[ax+s*11,ay+2],[ax-6,ay+3]],ARD,1,1.1)}
  /* ผ้าคาดหน้าน้ำเงินลายดาว */vS(W,[[-9,-16+b],[9,-16+b],[11,16],[0,21],[-11,16]],BL,1,1.1);vK(W,[[-9,-16+b],[-11,16],[0,21],[11,16],[9,-16+b]],W?'#fff':GD,1.3);bvStar(W,0,2+b*.5,4.6,1.9,4,-Math.PI/2,'#f0f4ff');
  /* เกราะอก */
  vS(W,[[-17,-14+b],['c',-23,-30+b,-30,-50+b,-26,-66+b],['q',0,-74+b,26,-66+b],['c',30,-50+b,23,-30+b,17,-14+b],['q',0,-9+b,-17,-14+b]],AR,1,1.5);
  for(const s of[-1,1])vS(W,[[s*3,-64+b],['q',s*16,-68+b,s*24,-58+b],['q',s*22,-44+b,s*8,-40+b],['q',s*3,-48+b,s*3,-64+b]],ARL,1,1);
  vK(W,[[-19,-20+b],['q',0,-14+b,19,-20+b]],W?'#fff':GD,2.2);vK(W,[[0,-66+b],[0,-18+b]],'rgba(120,130,170,.5)',1.2);
  {const pu=.6+.4*Math.sin(T*3);bvAdd(W,()=>glowAt(0,-40+b,14+(cr?8:0),'215,225,255',(cr?.9:.6)*pu));bvStar(W,0,-40+b,10,4,4,-Math.PI/2,'#eef2ff');bvStar(W,0,-40+b,4.4,1.8,4,-Math.PI/4,GD);
    if(cr&&!W){vK(W,[[-7,-50+b],[-2,-42+b],[-6,-34+b],[-1,-26+b]],'#1a1430',1.5);vK(W,[[3,-48+b],[6,-40+b],[3,-33+b]],'#1a1430',1.3);bvAdd(W,()=>glowAt(-3,-40+b,10,'255,220,160',.5))}}
  /* โล่กุหลาบ (มือซ้าย) */
  {const sx=-40,sy=-30+b-up*.2;vLimb(W,[-26,-62+b,-38,-46+b,sx+4,sy-2],ARD,11,9);
    vS(W,[[sx-18,sy-26],['q',sx-2,sy-30,sx+16,sy-26],[sx+15,sy+4],['q',sx+10,sy+20,sx-1,sy+30],['q',sx-12,sy+20,sx-17,sy+4]],ARL,1,1.4);
    vS(W,[[sx-14,sy-22],['q',sx-1,sy-25,sx+12,sy-22],[sx+11,sy+3],['q',sx+7,sy+16,sx-1,sy+24],['q',sx-9,sy+16,sx-13,sy+3]],'#3a5ab0',1,1);
    vK(W,[[sx-1,sy+6],['q',sx-3,sy+12,sx-1,sy+20]],'#2e6a28',1.8);vS(W,[[sx-1,sy+12],['q',sx-8,sy+10,sx-9,sy+15],['q',sx-4,sy+16,sx-1,sy+12]],'#3e8a34',1,.7);
    for(let k=0;k<5;k++){const a=k*1.2566+T*.2;bvE(W,sx-1+Math.cos(a)*4,sy-4+Math.sin(a)*4,4.4,3.6,'#c82a46',.7)}bvE(W,sx-1,sy-4,3.4,3.4,'#ff6a86',.7);
    for(const[x,y]of[[sx-15,sy-23],[sx+13,sy-23],[sx-1,sy+27]])bvE(W,x,y,1.8,1.8,GD,.5)}
  /* หอกดาว (มือขวา) */
  {const hx=38,hy=-28+b-up*.5;vS(W,[[hx+1,hy+56],[hx+4,hy+56],[hx-1,hy-96],[hx-4,hy-96]],'#5a4a2a',1,1);for(let k=0;k<8;k++){const y=hy+40-k*17;vK(W,[[hx+3-k*.26,y],[hx-.6-k*.26,y-3]],GD,1.4)}
    const tx=hx-4.6,ty=hy-100;vS(W,[[tx-6,ty+6],[tx+6,ty+6],[tx+3,ty],[tx,ty-22],[tx-3,ty]],'#e8eef8',1,1);vS(W,[[tx-9,ty+8],[tx+9,ty+8],[tx+6,ty+12],[tx-6,ty+12]],GD,1,.9);
    bvAdd(W,()=>glowAt(tx,ty-30,16+cf*16+Math.sin(T*5)*2,'230,236,255',.75+cf*.25));bvStar(W,tx,ty-30,14+cf*4,4.4,4,T*.6,'#f2f6ff');bvStar(W,tx,ty-30,6,2.2,4,T*.6+Math.PI/4,'#ffe8a0');
    vLimb(W,[26,-62+b,40,-46+b,hx+2,hy],ARD,11,9);bvE(W,hx+2,hy,5.4,5,AR,1)}
  /* บ่าเกราะซ้อน ขอบทอง */
  for(const s of[-1,1]){const px=s*28,py=-66+b;vS(W,[[px-s*14,py+6],['q',px-s*13,py-9,px+s*3,py-10],['q',px+s*16,py-8,px+s*17,py+7],['q',px+s*2,py+3,px-s*14,py+6]],AR,1,1.3);
    vS(W,[[px-s*11,py+7],['q',px+s*3,py+3,px+s*18,py+9],[px+s*15,py+15],['q',px+s*2,py+11,px-s*9,py+12]],ARD,1,1.1);vK(W,[[px-s*14,py+6],['q',px+s*2,py+3,px+s*17,py+7]],W?'#fff':GD,1.6);
    bvStar(W,px+s*2,py-2,3.4,1.4,4,-Math.PI/2,GD)}
  /* หมวกเกราะ + พู่ */
  {const hy=-90+b,pw=Math.sin(T*1.6)*3;vS(W,[[0,hy-16],['q',-10+pw,hy-34,-24+pw,hy-38],['q',-14+pw,hy-26,-14+pw*.5,hy-14],['q',-6,hy-22,0,hy-16]],'#4a6ad8',1,1.1);vS(W,[[0,hy-16],['q',6+pw,hy-30,2+pw,hy-38],['q',10+pw,hy-28,6,hy-14]],'#7a96f0',1,.9);
    vS(W,[[-13,hy+12],[-14,hy-6],['q',-12,hy-19,0,hy-20],['q',12,hy-19,14,hy-6],[13,hy+12],['q',0,hy+16,-13,hy+12]],AR,1,1.4);vS(W,[[2,hy-19],['q',12,hy-17,13,hy-6],[12,hy+12],[3,hy+14]],ARD,0);
    vS(W,[[-1.6,hy-20],[1.6,hy-20],[1.4,hy+14],[-1.4,hy+14]],GD,1,.8);vD(W,[[-11,hy-5],[11,hy-5],[10,hy-1],[-10,hy-1]],'#0c1020');
    vEye(W,-5,hy-3,2.4,1.4,EY,8);vEye(W,5,hy-3,2.4,1.4,EY,8);if(!LOWQ)for(let i=0;i<3;i++)for(const s of[-1,1])bvDE(W,s*(4+i*2.6),hy+6+i*1.4,.8,.8,'#1a1e30');
    if(cr&&!W){vK(W,[[-12,hy-14],[-6,hy-8],[-9,hy+2],[-5,hy+8]],'rgba(255,230,180,.9)',1.3);bvAdd(W,()=>glowAt(-8,hy-4,8,'255,220,160',.45))}}
};

/* ================= บัลลังก์ดาว · ราชาโอเรียน ================= */
BV1['ราชาโอเรียน · ผู้ครองบัลลังก์ดาว']=(T,W,br,sw,up,cf)=>{const b=br-2,hf=bvHF(),ph=hf>.66?1:hf>.33?2:3,RB='#4c2a80',RBD='#2a1448',GD='#dcb454',SK='#ead8c6',BE='#f4f4f8';
  bvShadow(56,14);
  if(ph===3){bvAdd(W,()=>{for(let i=0;i<10;i++){const q=(T*.5+i/10)%1;glowAt(-44+(i*19)%88,30-q*120,2.6,'230,220,255',1-q)}});if(!W)g.globalAlpha=.9}
  /* ผ้าคลุมดาว + ปกเออร์มิน */{const cs=Math.sin(T*1.1)*4;vS(W,[[-30,-74+b],[30,-74+b],['q',48+cs,-28,54+cs,28],[-54-cs,28],['q',-48-cs,-28,-30,-74+b]],'#2a1450',1,1.4);
    if(!W)for(let i=0;i<16;i++){const x=-46+(i*31)%92,y=-56+(i*37)%80,tw=.5+.5*Math.abs(Math.sin(T*1.6+i));g.fillStyle='rgba(255,232,170,'+tw+')';g.beginPath();g.arc(x,y,i%5?1.1:1.9,0,7);g.fill()}
    vK(W,[[-54-cs,28],[54+cs,28]],W?'#fff':GD,1.8)}
  /* เสื้อคลุมยาว + แถบผ้าทองลายดาว */
  vS(W,[[-19,-66+b],[19,-66+b],['q',26,-20,28,28],[-28,28],['q',-26,-20,-19,-66+b]],RB,1,1.4);
  vS(W,[[-8,-64+b],[8,-64+b],[11,28],[-11,28]],GD,1,1);for(let k=0;k<4;k++)bvStar(W,0,-40+k*17+b*.5,3.4,1.4,5,-Math.PI/2,'#6a3aa8');
  vK(W,[[-24,-10+b],['q',0,-5+b,24,-10+b]],W?'#fff':GD,2.6);bvE(W,0,-8+b,4,3.4,'#a03ad8',.9);
  if(!LOWQ)for(const s of[-1,1])for(let k=0;k<3;k++)vK(W,[[s*(12+k*4),-50+b+k*4],['q',s*(15+k*4),-10,s*(14+k*5),26]],'rgba(20,6,40,.4)',1.4);
  /* แกนดาวในอก (เฟส 2+) */
  if(ph>=2){const cy=-44+b;bvAdd(W,()=>glowAt(0,cy,20+Math.sin(T*8)*3,'255,200,120',.95));bvStar(W,0,cy,9,4,5,-Math.PI/2+T*.3,'#fff4d8');
    if(!W){g.strokeStyle='rgba(255,220,150,.9)';g.lineWidth=1.4;for(let i=0;i<6;i++){const a=i*1.05+.3;g.beginPath();g.moveTo(Math.cos(a)*10,cy+Math.sin(a)*10);g.lineTo(Math.cos(a)*24,cy+Math.sin(a)*26);g.stroke()}}}
  /* ปกขนเออร์มิน */for(let i=-4;i<=4;i++){const x=i*7,y=-68+b+Math.abs(i)*1.4;bvE(W,x,y,6.6,5.2,'#f4f0e4',1);if(!LOWQ&&i%2===0)vD(W,[[x,y-1],[x+.8,y+1.4],[x-.8,y+1.4]],'#1a1a1a')}
  /* คทาดาว (ขวา) */
  {const hx=38,hy=-30+b-up*.5;vS(W,[[hx+1.4,hy+58],[hx+4.4,hy+58],[hx-.6,hy-92],[hx-3.6,hy-92]],GD,1,1);for(let k=0;k<3;k++)bvE(W,hx+1.4-k*1.6,hy+20-k*36,3.4,2.4,GD,.8);
    const sx=hx-3,sy=hy-106;vS(W,[[sx-7,sy+14],['q',sx,sy+4,sx+7,sy+14],[sx+4,sy+18],[sx-4,sy+18]],GD,1,.9);
    bvAdd(W,()=>glowAt(sx,sy,18+cf*16,'255,230,170',.85+cf*.15));bvStar(W,sx,sy,13+cf*4,5.4,5,-Math.PI/2+T*.5,'#fff4d8');
    if(!W)for(let i=0;i<3;i++){const a=T*1.6+i*2.094;bvStar(W,sx+Math.cos(a)*20,sy+Math.sin(a)*8,3,1.2,4,T,'#ffe8b0')}
    vLimb(W,[24,-62+b,40,-48+b,hx+2,hy],RB,11,9);vS(W,[[hx-4,hy-8],[hx+8,hy-8],[hx+7,hy-2],[hx-3,hy-2]],'#f4f0e4',1,.8);bvE(W,hx+2,hy,4.6,4.2,SK,1)}
  /* มือซ้ายยกร่าย */{const lx=-44,ly=-50+b-up;vLimb(W,[-24,-62+b,-40,-46+b,lx,ly],RB,11,9);vS(W,[[lx-6,ly+6],[lx+6,ly+6],[lx+5,ly+12],[lx-5,ly+12]],'#f4f0e4',1,.8);bvE(W,lx,ly,4.6,4.2,SK,1);
    if(cf>0)bvAdd(W,()=>glowAt(lx,ly-8,16*cf+4,'200,180,255',.8*cf))}
  /* ศีรษะ: เคราขาวยาว คิ้วหนา */
  {const hy=-88+b,EY=ph>=2?'#ffe8b0':'#e8f0ff';
    vS(W,[[-12,hy-2],['q',-16,hy+16,-8,hy+36],['q',0,hy+46,8,hy+36],['q',16,hy+16,12,hy-2]],BE,1,1.2);
    if(!LOWQ)for(let i=-2;i<=2;i++)vK(W,[[i*4,hy+6],['q',i*5,hy+20,i*3,hy+36]],'rgba(170,170,190,.55)',1);
    bvE(W,0,hy-4,11,12.5,SK,1.2);vS(W,[[-11,hy+2],['q',0,hy+8,11,hy+2],['q',8,hy+12,0,hy+13],['q',-8,hy+12,-11,hy+2]],BE,1,1);
    for(const s of[-1,1]){vS(W,[[s*2,hy-8],['q',s*7,hy-12,s*12,hy-8],['q',s*7,hy-9,s*2,hy-7]],BE,1,.7);vEye(W,s*5,hy-5,2.6,1.4,EY,8);vK(W,[[s*9.5,hy-1],[s*11,hy+1]],'rgba(120,90,70,.6)',.9)}
    vK(W,[[0,hy-4],['q',2,hy+1,0,hy+2]],'rgba(150,110,90,.7)',1.1);
    vS(W,[[-12,hy-6],['q',-16,hy-14,-11,hy-18],['q',0,hy-22,11,hy-18],['q',16,hy-14,12,hy-6],['q',0,hy-12,-12,hy-6]],BE,1,1);
    /* มงกุฎ (เฟส 3 ลอยขึ้น) */const cy=ph===3?hy-46+Math.sin(T*2)*3:hy-15;
    vS(W,[[-15,cy+3],[-17,cy-13],[-10,cy-6],[-6,cy-18],[-2,cy-7],[0,cy-24],[2,cy-7],[6,cy-18],[10,cy-6],[17,cy-13],[15,cy+3]],GD,1,1.2);vK(W,[[-15,cy],[15,cy]],W?'#fff':'#8a6418',1.3);
    for(const[x,y]of[[-17,cy-13],[-6,cy-18],[0,cy-24],[6,cy-18],[17,cy-13]])bvE(W,x,y-1.4,1.8,1.8,'#fff0c0',.6);vEye(W,0,cy-5,2.8,3,'#b04ae8',6);vEye(W,-9,cy-3,1.4,1.6,'#4ac8ff',4);vEye(W,9,cy-3,1.4,1.6,'#4ac8ff',4);
    if(ph===3)bvAdd(W,()=>{glowAt(0,cy-6,26,'230,220,255',.6);g.strokeStyle='rgba(230,220,255,.75)';g.lineWidth=1.6;g.beginPath();g.ellipse(0,cy+6,20,5.6,0,0,7);g.stroke()})}
  g.globalAlpha=1;
};

/* ================= ศึกป้องกันนคร · ทูตแห่งความหิว ================= */
BV1.__hunger=(T,W,br,sw,up,cf)=>{const fy=-16+Math.sin(T*1.3)*5,VO='#2c1648',VOD='#120820',LM='#7a54b0',PU='200,120,255';
  g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(0,30,40,11,0,0,7);g.fill();
  /* วงดาวแตกเหนือหัว */{const cy=-112+fy;if(!W){g.save();g.strokeStyle='rgba(200,140,255,.6)';g.lineWidth=1.8;g.setLineDash([12,7]);g.lineDashOffset=-T*12;g.beginPath();g.arc(0,cy,34,0,7);g.stroke();g.setLineDash([]);g.restore()}
    for(let i=0;i<8;i++){const a=i*.785+T*.4,x=Math.cos(a)*34,y=cy+Math.sin(a)*34;bvAdd(W,()=>glowAt(x,y,6,i%2?'255,230,160':'190,140,255',.7));bvStar(W,x,y,3.4,1.3,4,a,i%2?'#ffe8b0':'#d8b8ff')}}
  /* แขนหลัง 2 คู่ */
  for(const[sy,ln]of[[-70,1],[-56,0]])for(const s of[-1,1]){const hx=s*(46+ln*6),hy=sy+22+fy+Math.sin(T*1.8+ln+s)*3;vLimb(W,[s*14,sy+fy,s*34,sy-8+fy,hx,hy],'#3a2258',5,3);for(let k=-1;k<=1;k++)vLimb(W,[hx,hy,hx+s*2+k*3,hy+8],'#1a0e2a',2.2,.8,0)}
  /* ผ้าคลุมห้วงอวกาศ */
  const CP=[[-18,-84+fy],[18,-84+fy],['q',34,-50+fy,38+sw*3,4],['q',34,22,24,30+Math.sin(T*2)*3],[12,20],[0,31],[-12,20],[-24,30+Math.cos(T*2)*3],['q',-34,22,-38-sw*3,4],['q',-34,-50+fy,-18,-84+fy]];
  vS(W,CP,VO,1,1.6);
  if(!W){g.save();vP(CP);g.clip();for(let i=0;i<30;i++){const px=-36+((i*37)%72),py=-82+((i*53)%112)+fy*.3,tw=.4+.6*Math.abs(Math.sin(T*2+i));g.fillStyle='rgba(230,220,255,'+tw+')';g.fillRect(px,py,i%5?1:1.8,i%5?1:1.8)}
    if(!LOWQ){glowAt(-12,-20+fy,30,'120,60,200',.35);glowAt(14,0,26,'60,120,220',.25)}g.restore();vP(CP);g.strokeStyle='rgba(190,130,255,'+(.5+.25*Math.sin(T*2))+')';g.lineWidth=1.2;g.stroke()}
  /* ลำตัวผอม + ซี่โครงเรือง */
  vS(W,[[-14,-86+fy],[14,-86+fy],['q',13,-56+fy,8,-34+fy],[-8,-34+fy],['q',-13,-56+fy,-14,-86+fy]],'#4a2a6a',1,1.3);
  for(let i=0;i<5;i++){const yy=-80+i*8+fy;for(const s of[-1,1])bvL3(W,[[s*1,yy],['q',s*9,yy+1,s*8,yy+5]],'#2a1640','#d0a0ff',1.4)}
  bvAdd(W,()=>glowAt(0,-60+fy,16,PU,.35));
  /* หัวยาวแยกเป็นปาก */
  {const hy=-104+fy,op=3.5+3*Math.sin(T*2.2)+cf*6;
    vS(W,[[-11,hy+12],[-13,hy-8],[-7,hy-26],[0,hy-34],[-1.2,hy-op]],'#34205a',1,1.2);vS(W,[[11,hy+12],[13,hy-8],[7,hy-26],[0,hy-34],[1.2,hy-op]],'#40286a',1,1.2);
    vS(W,[[-11,hy+12],[-1.2,hy-op],[1.2,hy-op],[11,hy+12],[0,hy+16]],'#100618',1,1);
    for(let i=0;i<6;i++){const q=i/6,yy=hy-op+q*(op+14);vD(W,[[-1.4-q*7,yy],[-4.4-q*7,yy+1.6],[-1.4-q*7,yy+3.2]],'#f0e0ff');vD(W,[[1.4+q*7,yy],[4.4+q*7,yy+1.6],[1.4+q*7,yy+3.2]],'#f0e0ff')}
    bvAdd(W,()=>glowAt(0,hy+2,12+op,PU,.5));
    for(const s of[-1,1]){vEye(W,s*8,hy-10,1.9,1.2,'#e0a0ff',7);vEye(W,s*6,hy-18,1.4,.9,'#e0a0ff',6)}}
  /* หลุมดำกลางมือ */
  {const ox=0,oy=-26+fy-up*1.2,R=11+cf*8+Math.sin(T*3);
    bvAdd(W,()=>glowAt(ox,oy,R*3.2,'170,100,255',.6));
    if(!W){g.strokeStyle='rgba(230,190,255,.85)';g.lineWidth=1.6;g.beginPath();g.ellipse(ox,oy,R*1.9,R*.55,T*.6,0,7);g.stroke();
      for(let i=0;i<12;i++){const q=(T*.5+i/12)%1,a=i*2.4+q*5,r=(1-q)*R*4.4+R;g.fillStyle='rgba(255,240,200,'+q+')';g.beginPath();g.arc(ox+Math.cos(a)*r,oy+Math.sin(a)*r*.55,1.8*(1-q)+.4,0,7);g.fill()}}
    bvDE(W,ox,oy,R,R,'#000000');if(!W){g.strokeStyle='rgba(255,220,255,.9)';g.lineWidth=1.1;g.beginPath();g.arc(ox,oy,R,0,7);g.stroke()}}
  /* แขนหน้า 3 แขนประคองหลุมดำ */
  for(const[sx,sy,k]of[[15,-80,1],[13,-62,0],[-13,-64,-1]]){const s=sx>0?1:-1,hx=s*14,hy=-26+fy-up*1.2+(k===1?-10:k===0?8:-2);vLimb(W,[sx,sy+fy,s*34,sy+12+fy,hx,hy],LM,6,4);
    for(let j=-1;j<=1;j++)vLimb(W,[hx,hy,hx-s*5,hy+j*4],W?'#fff':'#c8a8ff',2,.8,0)}
};
BV1['ทูตแห่งความหิว · ผู้กลืนดาว']=BV1.__hunger;

/* ================= ห้วงความทรงจำ · เงามืดของอาซาเอล ================= */
BV1['เงามืดของอาซาเอล']=(T,W,br,sw,up,cf)=>{const fy=-12+Math.sin(T*1.4)*4,DK='#1c0c2a',DKD='#0a0410',DKL='#3a1e52',RD='255,40,70',fl=Math.sin(T*1.5);
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,30,44,12,0,0,7);g.fill();
  /* ควันมืดลอยขึ้น */if(!W)for(let i=0;i<10;i++){const q=(T*.4+i/10)%1,px=-46+((i*31)%92)+Math.sin(T+i)*6,py=26-q*120;g.fillStyle='rgba(18,6,28,'+(.45*Math.sin(q*Math.PI))+')';g.beginPath();g.arc(px,py,8+q*12,0,7);g.fill()}
  /* ปีกดำขาดวิ่น 2 คู่ */
  const wing=(s,sc,ang,col)=>{g.save();g.translate(s*12,-70+fy);g.rotate(s*(ang+fl*.06));g.scale(s*sc,sc);
    vS(W,[[0,0],['q',30,-34,70,-46],['q',62,-34,74,-24],['q',62,-20,70,-6],['q',56,-6,62,8],['q',48,4,50,20],['q',38,10,34,26],['q',26,12,18,28],['q',14,10,0,8]],col,1,1.3);
    for(let k=0;k<5;k++)vK(W,[[4,2],['q',30,-14-k*2,[72,74,70,62,50][k]-6,[-42,-24,-6,8,20][k]]],'rgba(130,60,180,.45)',1.2);
    bvAdd(W,()=>{g.strokeStyle='rgba(170,70,220,.55)';g.lineWidth=1.4;g.beginPath();g.moveTo(70,-46);g.quadraticCurveTo(62,-34,74,-24);g.quadraticCurveTo(62,-20,70,-6);g.stroke()});g.restore()};
  for(const s of[-1,1]){wing(s,1.15,.18,DKD);wing(s,.8,-.25,DK)}
  /* ชุดยาวสลายเป็นควัน */
  vS(W,[[-16,-72+fy],[16,-72+fy],['q',28,-30+fy,30,6],[22,20],[14,10],[6,26],[-4,12],[-12,24],[-20,10],[-28,18],['q',-28,-30+fy,-16,-72+fy]],DK,1,1.4);
  vK(W,[[0,-70+fy],[0,4]],'rgba(120,50,160,.4)',1.4);for(const s of[-1,1])vK(W,[[s*8,-60+fy],['q',s*14,-20+fy,s*18,10]],'rgba(0,0,0,.4)',1.6);
  /* เกราะอกร้าว */vS(W,[[-14,-72+fy],[14,-72+fy],[12,-46+fy],[0,-40+fy],[-12,-46+fy]],DKL,1,1.2);bvAdd(W,()=>glowAt(0,-56+fy,10+cf*10,'150,40,200',.45+cf*.4));vK(W,[[-6,-66+fy],[0,-58+fy],[-4,-50+fy]],W?'#fff':'rgba(255,80,110,.9)',1.2);
  /* ดาบเงา (ขวา) */
  {const hx=34,hy=-40+fy-up*.4;g.save();g.translate(hx,hy);g.rotate(.32-cf*1.2+Math.sin(T*1.2)*.03);
    vS(W,[[-3.6,-6],[-4.4,-74],[0,-88],[4.4,-74],[3.6,-6]],'#1a0a22',1,1.2);bvAdd(W,()=>{g.strokeStyle='rgba(255,60,90,'+(.6+.3*Math.sin(T*4))+')';g.lineWidth=1.4;g.beginPath();g.moveTo(3.6,-8);g.lineTo(4.4,-74);g.lineTo(0,-88);g.stroke();glowAt(0,-50,18+cf*16,RD,.25+cf*.3)});
    vS(W,[[-12,-6],[12,-6],[10,-2],[-10,-2]],'#3a1e52',1,1);vS(W,[[-2,-2],[2,-2],[2,12],[-2,12]],'#120618',1,1);g.restore();
    vLimb(W,[16,-68+fy,32,-56+fy,hx,hy],DKL,9,7);bvE(W,hx,hy,4.4,4,DKD,1)}
  /* มือซ้าย: ลูกแก้วมืด */{const lx=-34,ly=-46+fy-up;vLimb(W,[-16,-68+fy,-30,-58+fy,lx,ly],DKL,9,7);bvE(W,lx,ly,4.4,4,DKD,1);
    bvAdd(W,()=>glowAt(lx,ly-12,14+cf*12,'150,40,200',.6));bvE(W,lx,ly-12,7+cf*3,7+cf*3,'#160620',1);if(!W){g.strokeStyle='rgba(255,70,110,.8)';g.lineWidth=1;g.beginPath();g.arc(lx,ly-12,7+cf*3,T*2,T*2+3.6);g.stroke()}}
  /* หัวคลุมฮู้ด ตาแดง */{const hy=-88+fy;
    vS(W,[[-14,hy+14],['q',-18,hy-6,-8,hy-18],['q',0,hy-24,8,hy-18],['q',18,hy-6,14,hy+14],['q',0,hy+6,-14,hy+14]],DKD,1,1.3);
    vS(W,[[-9,hy+8],['q',-11,hy-6,0,hy-10],['q',11,hy-6,9,hy+8],['q',0,hy+12,-9,hy+8]],'#050208',0);
    for(const s of[-1,1]){vD(W,[[s*1.6,hy-1],[s*7.6,hy-3],[s*6.6,hy+.6]],W?'#fff':'#ff3a5a');bvAdd(W,()=>glowAt(s*4.8,hy-1.4,8,RD,.8))}
    /* รัศมีแตก */if(!W){g.save();g.strokeStyle='rgba(150,40,190,.9)';g.lineWidth=2.4;g.setLineDash([8,5]);g.lineDashOffset=T*8;g.beginPath();g.ellipse(0,hy-26,18,5.4,0,0,7);g.stroke();g.setLineDash([]);g.restore();bvAdd(W,()=>glowAt(0,hy-26,16,'160,50,210',.35))}}
};

/* ================= สะพานแสง · ผู้ตีระฆังเงา ================= */
BV1['ผู้ตีระฆังเงา']=(T,W,br,sw,up,cf)=>{const b=br-2,hf=bvHF(),bsw=Math.sin(T*1.4)*.08+(cf>0?Math.sin(T*16)*.06:0),RB='#1e1230',RBD='#0e0818',BZ='#b07a3a',BZD='#5a3418',BZL='#e0a860',GL='255,170,80';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;bvShadow(60,15);
  /* แอกไม้ + ระฆังยักษ์บนหลัง */
  /* โครงไม้แบกบนหลัง: เสาสองข้าง + คาน */for(const s of[-1,1]){vLimb(W,[s*24,-66+b,s*22,-104+b,s*20,-134+b],'#4a2e16',6,5);vK(W,[[s*24,-80+b],[s*10,-128+b]],'#3a2414',2.6)}
  vLimb(W,[-30,-134+b,0,-138+b,30,-134+b],'#3a2414',7,7);for(const s of[-1,1])bvE(W,s*30,-134+b,3.4,3.4,'#8a5a2c',.8);
  g.save();g.translate(0,-132+b);g.rotate(bsw);
  vS(W,[[-6,-6],[6,-6],[6,2],[-6,2]],'#4a2e16',1,1);
  const BL=[[-13,0],['q',-20,14,-24,34],['q',-31,58,-48,68],[48,68],['q',31,58,24,34],['q',20,14,13,0]];vS(W,BL,BZ,1,1.6);
  if(!LOWQ){g.save();vP(BL);g.clip();const gr=g.createLinearGradient(-44,0,44,0);gr.addColorStop(0,'rgba(40,20,8,.5)');gr.addColorStop(.42,'rgba(255,230,170,.35)');gr.addColorStop(.55,'rgba(255,230,170,0)');gr.addColorStop(1,'rgba(30,14,4,.55)');g.fillStyle=W?'rgba(0,0,0,0)':gr;g.fillRect(-50,-2,100,72);g.restore()}
  vK(W,[[-21,24],['q',0,28,21,24]],BZD,2);vK(W,[[-40,60],['q',0,66,40,60]],BZD,2.4);vS(W,[[-48,66],[48,66],[47,71],[-47,71]],BZD,1,1);
  for(let k=0;k<5;k++)bvStar(W,-20+k*10,42+Math.abs(k-2)*1.4,2.2,1,6,0,'#e8c080');
  if(!W){const cr=.5+.45*(1-hf);g.strokeStyle='rgba(255,170,80,'+cr+')';g.lineWidth=1.6;g.beginPath();g.moveTo(-10,10);g.lineTo(-16,30);g.lineTo(-8,46);g.lineTo(-14,62);g.moveTo(12,18);g.lineTo(18,38);g.lineTo(12,52);g.stroke()}
  bvAdd(W,()=>{glowAt(0,46,26+cf*22,GL,.38+.4*cf);if(cf>0){g.strokeStyle='rgba(255,190,110,'+(.7*cf)+')';g.lineWidth=2;for(let i=0;i<3;i++){const q=(T*1.5+i/3)%1;g.beginPath();g.ellipse(0,58,44+q*64,12+q*22,0,0,7);g.stroke()}}});
  bvE(W,0,62,5,5,BZD,1);g.restore();
  /* ร่างคลุมผ้าขาดวิ่น */{const cs=Math.sin(T*1.2)*4;vS(W,[[-28,-72+b],[28,-72+b],['q',44+cs,-24,50+cs,22],[38,30],[26,22],[14,31],[2,22],[-10,31],[-22,22],[-36,30],[-50-cs,22],['q',-44-cs,-24,-28,-72+b]],RB,1,1.4);
    if(!W)for(let i=0;i<7;i++){const q=(T*.7+i/7)%1;g.fillStyle='rgba(30,12,44,'+(.5*(1-q))+')';g.beginPath();g.arc(-40+i*13,26+q*14,4+q*6,0,7);g.fill()}}
  for(const s of[-1,1]){const st=s*wk;vLimb(W,[s*9,-6+b,s*11+st*3,10,s*11+st*5,26],'#3a2a40',10,8);vS(W,[[s*11+st*5-5,23],[s*11+st*5+s*9,24],[s*11+st*5+s*9,29],[s*11+st*5-5,29]],'#2a1a20',1,1)}
  /* เสื้อหนังบรอนซ์ + เหรียญตะวัน */
  vS(W,[[-20,-70+b],[20,-70+b],['q',24,-34+b,18,2+b],[-18,2+b],['q',-24,-34+b,-20,-70+b]],'#6a4424',1,1.4);
  for(let k=0;k<3;k++)vK(W,[[-18,-52+k*14+b],['q',0,-48+k*14+b,18,-52+k*14+b]],'rgba(30,16,6,.5)',1.4);
  {const cy=-42+b;bvE(W,0,cy,10,10,BZ,1.2);if(!W){g.strokeStyle='#ffc070';g.lineWidth=1.4;for(let i=0;i<8;i++){const a=i*.785+T*.4;g.beginPath();g.moveTo(Math.cos(a)*10,cy+Math.sin(a)*10);g.lineTo(Math.cos(a)*15,cy+Math.sin(a)*15);g.stroke()}}bvAdd(W,()=>glowAt(0,cy,15,GL,.7));bvE(W,0,cy,4.6,4.6,'#ffd8a0',.8)}
  /* แขนซ้าย: เส้นเงาหยด */{const lx=-40,ly=-34+b-up*.3;vLimb(W,[-22,-64+b,-36,-52+b,lx,ly],RB,10,8);bvE(W,lx,ly,4.6,4.2,BZD,1);
    if(!W)for(let i=0;i<4;i++){vK(W,[[lx,ly],['q',lx-10-i*4,ly+12,lx-6-i*6,ly+28+Math.sin(T*3+i)*5]],'rgba(30,12,44,.85)',2.6-i*.4)}}
  /* ค้อนตีระฆัง (ขวา) */{const hx=40,hy=-28+b-up*.6;vS(W,[[hx-1.8,hy+34],[hx+1.8,hy+34],[hx+.2,hy-86],[hx-3.4,hy-86]],'#4a2e16',1,1);
    vS(W,[[hx-18,hy-104],['q',hx-2,hy-108,hx+14,hy-104],[hx+15,hy-84],['q',hx-2,hy-80,hx-17,hy-84]],BZ,1,1.3);vK(W,[[hx-17,hy-98],[hx+14,hy-98]],BZD,1.4);vK(W,[[hx-17,hy-90],[hx+14,hy-90]],BZD,1.4);
    if(cf>0)bvAdd(W,()=>glowAt(hx-1,hy-94,18*cf+6,'255,180,90',.7*cf));vLimb(W,[22,-64+b,38,-48+b,hx,hy],RB,10,8);bvE(W,hx,hy,4.6,4.2,BZD,1)}
  /* บ่า: ปลอกไหล่บรอนซ์ + ผ้า */for(const s of[-1,1]){const px=s*26,py=-66+b;vS(W,[[px-s*12,py+6],['q',px-s*11,py-8,px+s*3,py-9],['q',px+s*14,py-6,px+s*14,py+8],['q',px+s*2,py+4,px-s*12,py+6]],BZ,1,1.2);vK(W,[[px-s*11,py+6],['q',px,py+3,px+s*14,py+8]],BZD,1.4)}
  /* หัว: ฮู้ด + หน้ากากบรอนซ์ช่องแนวตั้ง */{const hy=-86+b;
    vS(W,[[-16,hy+14],['q',-20,hy-6,-10,hy-20],['q',0,hy-27,10,hy-20],['q',20,hy-6,16,hy+14],['q',0,hy+6,-16,hy+14]],RBD,1,1.3);
    vS(W,[[-10,hy+10],[-11,hy-6],['q',-8,hy-15,0,hy-16],['q',8,hy-15,11,hy-6],[10,hy+10],['q',0,hy+14,-10,hy+10]],BZ,1,1.2);
    vD(W,[[-1.6,hy-14],[1.6,hy-14],[1.6,hy+10],[-1.6,hy+10]],'#08030c');for(const s of[-1,1]){vD(W,[[s*2.6,hy-4],[s*8,hy-5.4],[s*7.6,hy-2.4],[s*2.6,hy-2]],'#08030c');vEye(W,s*5.4,hy-3.6,2,1.2,'#ffb050',8)}
    bvAdd(W,()=>{glowAt(-5.4,hy-3.6,8,GL,.7);glowAt(5.4,hy-3.6,8,GL,.7)})}
};

/* ================= หอนาฬิกา · ผู้เฝ้าระฆังร่วง ================= */
BV1['ผู้เฝ้าระฆังร่วง']=(T,W,br,sw,up,cf)=>{const b=br-3,hf=bvHF(),BZ='#b07a3a',BZD='#5a3418',BZL='#e0a860',IR='#3a2a20',EYC=hf<.25?'170,110,255':'255,180,90';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;bvShadow(60,15);
  {const cs=Math.sin(T*1.1)*3;vS(W,[[-28,-72+b],[28,-72+b],['q',44+cs,-24,48+cs,26],[-48-cs,26],['q',-44-cs,-24,-28,-72+b]],'#2a1838',1,1.3)}
  /* ขาลูกสูบ */for(const s of[-1,1]){const st=s*wk,kx=s*15+st*3,ax=s*16+st*5,ay=26-Math.max(0,st)*3;vLimb(W,[s*12,-6+b,kx,8],BZD,14,12);vS(W,[[kx-4,6],[kx+4,6],[ax+3.6,ay-4],[ax-3.6,ay-4]],'#c8c0b0',1,1);bvE(W,kx,7,6,5,BZ,1);
    vS(W,[[ax-9,ay-5],[ax+9,ay-5],[ax+s*13,ay+3],[ax-9,ay+4]],BZD,1,1.2)}
  /* ลำตัวถังบรอนซ์ + หน้าปัด */
  vS(W,[[-28,-70+b],['q',0,-78+b,28,-70+b],[30,-4+b],['q',0,6+b,-30,-4+b]],BZ,1,1.5);
  for(const y of[-62,-12])vK(W,[[-28,y+b],['q',0,y-4+b,28,y+b]],BZD,2);if(!LOWQ)for(let i=0;i<7;i++)for(const y of[-66,-8])bvDE(W,-24+i*8,y+b,1.2,1.2,'#5a3418');
  {const cy=-36+b;bvE(W,0,cy,17,17,'#efe4c8',1.3);vK(W,[[-17,cy],['q',0,cy-34,17,cy]],'rgba(255,255,255,.25)',1.2);
    if(!W){g.strokeStyle='#3a2a1a';for(let i=0;i<12;i++){const a=i/12*6.283;g.lineWidth=i%3?1:1.8;g.beginPath();g.moveTo(Math.cos(a)*13,cy+Math.sin(a)*13);g.lineTo(Math.cos(a)*15.5,cy+Math.sin(a)*15.5);g.stroke()}
      const ma=T*(hf<.5?2.4:1.2),ha=T*.2;g.lineWidth=2;g.beginPath();g.moveTo(0,cy);g.lineTo(Math.cos(ma)*12.5,cy+Math.sin(ma)*12.5);g.stroke();g.lineWidth=3;g.beginPath();g.moveTo(0,cy);g.lineTo(Math.cos(ha)*8,cy+Math.sin(ha)*8);g.stroke();g.fillStyle='#b07a3a';g.beginPath();g.arc(0,cy,2.2,0,7);g.fill()}
    vK(W,[[-17,cy],['q',0,cy+20,17,cy]],BZD,1.6)}
  /* ไอน้ำ */bvAdd(W,()=>{for(let i=0;i<4;i++){const q=(T*.6+i/4)%1,s=i%2?1:-1;glowAt(s*30+s*q*8,-72+b-q*30,4+q*8,'230,220,210',.3*(1-q))}});
  /* แขนซ้าย: กระดิ่งห้อยโซ่ */{const lx=-40,ly=-30+b-up*.3;vLimb(W,[-26,-64+b,-40,-48+b,lx,ly],BZD,12,10);bvE(W,lx,ly,6.6,6,IR,1);
    const sg=Math.sin(T*2.4)*.3,bx=lx-2+Math.sin(sg)*22,by=ly+Math.cos(sg)*22;vK(W,[[lx,ly],[bx,by-6]],'#8a6a3a',1.4);
    vS(W,[[bx-3,by-7],[bx+3,by-7],['q',bx+5,by,bx+9,by+5],[bx-9,by+5],['q',bx-5,by,bx-3,by-7]],BZ,1,1);bvE(W,bx,by+6,1.8,1.8,BZD,.7)}
  /* แขนขวา: ลูกตุ้มนาฬิกาเป็นอาวุธ */{const hx=40,hy=-34+b-up*.6,swg=Math.sin(T*2.2)*.25+(cf>0?-.6*cf:0);vLimb(W,[26,-64+b,42,-50+b,hx,hy],BZD,12,10);
    g.save();g.translate(hx,hy);g.rotate(swg);vS(W,[[-2.4,0],[2.4,0],[2.4,-82],[-2.4,-82]],BZ,1,1);bvE(W,0,-98,20,20,'#d8a050',1.4);bvE(W,0,-98,14,14,'#b07a3a',1);
      bvAdd(W,()=>glowAt(0,-98,20+cf*18,'255,200,120',.5+cf*.4));bvStar(W,0,-98,11,4.4,8,T,'#fff0c0');g.restore();bvE(W,hx,hy,6.6,6,IR,1)}
  /* เฟืองบ่าหมุน */for(const s of[-1,1]){g.save();g.translate(s*31,-70+b);g.rotate(T*(s>0?.8:-.8));g.beginPath();for(let i=0;i<24;i++){const a=i/24*6.283,R=i%2?15:19;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.fillStyle=W?'#fff':chSh('#a8723a',-19,19);g.fill();g.lineWidth=1.2;g.strokeStyle=BV.O;g.stroke();
    bvE(W,0,0,10,10,'#7a4c24',1);for(let k=0;k<4;k++){const a=k*1.571;bvDE(W,Math.cos(a)*6,Math.sin(a)*6,1.8,1.8,'#2a1408')}bvE(W,0,0,3.4,3.4,'#3a2410',.8);g.restore()}
  /* หัว = ระฆังหงาย */{const hy=-82+b;
    const HB=[[-9,hy+8],['q',-13,hy-4,-15,hy-18],['q',-20,hy-34,-30,hy-42],[30,hy-42],['q',20,hy-34,15,hy-18],['q',13,hy-4,9,hy+8]];vS(W,HB,BZ,1,1.5);
    if(!LOWQ){g.save();vP(HB);g.clip();const gr=g.createLinearGradient(-26,0,26,0);gr.addColorStop(0,'rgba(40,20,8,.45)');gr.addColorStop(.42,'rgba(255,230,170,.35)');gr.addColorStop(.56,'rgba(255,230,170,0)');gr.addColorStop(1,'rgba(30,14,4,.5)');g.fillStyle=W?'rgba(0,0,0,0)':gr;g.fillRect(-32,hy-44,64,54);g.restore()}
    vK(W,[[-20,hy-28],['q',0,hy-24,20,hy-28]],BZD,1.6);bvDE(W,0,hy-42,30,7,'#1a0e08');
    bvAdd(W,()=>glowAt(0,hy-44,20+cf*12,EYC,.9));vEye(W,0,hy-43,4.6,4,hf<.25?'#d8b0ff':'#ffd090',10);
    if(!W){g.strokeStyle='rgba(255,180,90,'+(.5+.4*(1-hf))+')';g.lineWidth=1.3;g.beginPath();g.moveTo(-7,hy-22);g.lineTo(-11,hy-10);g.lineTo(-5,hy-1);g.stroke()}
    vS(W,[[-6,hy+6],[6,hy+6],[5,hy+12],[-5,hy+12]],BZD,1,1)}
};

/* ================= ก้นหลุมหัวใจ · เวสเปอร์ ================= */
BV1['เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา']=(T,W,br,sw,up,cf)=>{const b=br-3,hf=bvHF(),ph=hf>.6?1:hf>.3?2:3,BZ='#a87038',BZD='#4a2c14',BZL='#d8a050',CL='#1e1428',EYc=ph===3?'#ffd090':'#d8b0ff';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;bvShadow(58,15);
  /* วงเฟืองด้านหลัง */{const cy=-70+b;if(ph>=2)bvAdd(W,()=>glowAt(0,cy,68,ph===3?'255,190,110':'190,140,255',.25));
    if(!W){g.save();g.translate(0,cy);g.rotate(T*(ph===3?.8:.25));g.strokeStyle='rgba(216,160,80,'+(ph===3?.85:.55)+')';g.lineWidth=2.4;g.beginPath();for(let i=0;i<36;i++){const a=i/36*6.283,R=i%2?54:60;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.stroke();
      g.lineWidth=1.2;g.beginPath();g.arc(0,0,48,0,7);g.stroke();for(let i=0;i<12;i++){const a=i*.5236;g.beginPath();g.moveTo(Math.cos(a)*42,Math.sin(a)*42);g.lineTo(Math.cos(a)*48,Math.sin(a)*48);g.stroke()}g.restore()}}
  /* ผ้าคลุม */{const cs=Math.sin(T*1.2)*4;vS(W,[[-26,-72+b],[26,-72+b],['q',44+cs,-24,50+cs,28],[30,24],[14,31],[0,24],[-14,31],[-30,24],[-50-cs,28],['q',-44-cs,-24,-26,-72+b]],CL,1,1.4);
    if(!W)for(let i=0;i<6;i++){const x=-34+i*13,y=12+(i%2)*7;bvStar(W,x,y,3.4,2,8,T*.3+i,'rgba(216,160,80,.55)')}}
  /* ขาเกราะ */for(const s of[-1,1]){const st=s*wk,kx=s*11+st*3,ax=s*12+st*5,ay=27-Math.max(0,st)*3;vLimb(W,[s*9,-10+b,kx,6,ax,ay-3],BZD,12,10);vS(W,[[kx-6,6],[kx+6,6],[ax+5,ay-4],[ax-5,ay-4]],BZ,1,1.1);bvE(W,kx,4,6,5,BZL,1);vS(W,[[ax-6,ay-5],[ax+6,ay-5],[ax+s*11,ay+2],[ax-6,ay+3]],BZD,1,1.1)}
  /* ผ้าคาด + เกราะสะโพก */vS(W,[[-8,-14+b],[8,-14+b],[10,18],[0,22],[-10,18]],'#3a2448',1,1);for(const s of[-1,1])vS(W,[[s*6,-14+b],[s*22,-14+b],[s*21,0+b],[s*7,-2+b]],BZ,1,1);
  /* เกราะอก + แกนเฟือง */
  vS(W,[[-18,-14+b],['c',-24,-30+b,-29,-50+b,-25,-66+b],['q',0,-74+b,25,-66+b],['c',29,-50+b,24,-30+b,18,-14+b],['q',0,-9+b,-18,-14+b]],BZ,1,1.5);
  for(const s of[-1,1])vS(W,[[s*3,-64+b],['q',s*15,-68+b,s*23,-58+b],['q',s*21,-46+b,s*8,-42+b],['q',s*3,-50+b,s*3,-64+b]],BZL,1,1);
  {const cy=-42+b;g.save();g.translate(0,cy);g.rotate(T*.5);g.beginPath();for(let i=0;i<16;i++){const a=i/16*6.283,R=i%2?10:13;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.fillStyle=W?'#fff':'#d8a050';g.fill();g.lineWidth=1;g.strokeStyle=BV.O;g.stroke();g.restore();
    bvE(W,0,cy,6,6,'#ffe0a0',1);bvAdd(W,()=>glowAt(0,cy,ph===3?24:14,'255,200,120',ph===3?.7:.45));
    if(ph===3&&!W){vK(W,[[-14,-58+b],[-5,-48+b],[-12,-30+b]],'rgba(255,220,150,.95)',1.4);vK(W,[[12,-60+b],[5,-48+b],[10,-36+b]],'rgba(255,220,150,.95)',1.3)}}
  /* หอกเข็มนาฬิกา (ขวา) */{const hx=38,hy=-30+b-up*.6;g.save();g.translate(hx,hy);g.rotate(-.12-cf*.3);
    vS(W,[[-2,56],[2,56],[2,-104],[-2,-104]],BZD,1,1);for(let k=0;k<6;k++)vK(W,[[-2,30-k*22],[2,27-k*22]],BZL,1.2);
    vS(W,[[-8,-102],[0,-142],[8,-102],[3,-96],[0,-104],[-3,-96]],'#ffe8a0',1,1.1);bvE(W,0,-96,4,4,BZL,1);bvAdd(W,()=>glowAt(0,-122,16+cf*16,'255,210,140',.6+cf*.4));g.restore();
    vLimb(W,[24,-64+b,40,-50+b,hx+1,hy],CL,11,9);bvE(W,hx+1,hy,5,4.6,BZ,1)}
  /* มือซ้ายร่าย */{const lx=-40,ly=-44+b-up*.4;vLimb(W,[-24,-64+b,-38,-52+b,lx,ly],CL,11,9);bvE(W,lx,ly,5,4.6,BZ,1);if(cf>0)bvAdd(W,()=>glowAt(lx,ly-8,14*cf+4,'200,160,255',.8*cf))}
  /* บ่าเกราะ */for(const s of[-1,1]){const px=s*27,py=-66+b;vS(W,[[px-s*13,py+6],['q',px-s*12,py-9,px+s*3,py-10],['q',px+s*16,py-8,px+s*17,py+7],['q',px+s*2,py+3,px-s*13,py+6]],BZ,1,1.3);
    vS(W,[[px+s*4,py-8],[px+s*14,py-18],[px+s*12,py-6]],BZL,1,.9);vK(W,[[px-s*13,py+6],['q',px+s*2,py+3,px+s*17,py+7]],BZD,1.4)}
  /* หมวก + ฮู้ด + ยอดแหลม */{const hy=-88+b;
    vS(W,[[-16,hy+14],['q',-20,hy-6,-10,hy-18],['q',0,hy-24,10,hy-18],['q',20,hy-6,16,hy+14],['q',0,hy+6,-16,hy+14]],CL,1,1.3);
    vS(W,[[-12,hy+11],[-13,hy-5],['q',-10,hy-17,0,hy-18],['q',10,hy-17,13,hy-5],[12,hy+11],['q',0,hy+15,-12,hy+11]],BZ,1,1.3);
    vS(W,[[-3,hy-17],[0,hy-38],[3,hy-17]],BZL,1,1);vD(W,[[-10,hy-4],[10,hy-4],[9,hy],[-9,hy]],'#0a0612');
    vEye(W,-4.6,hy-2.2,2.4,1.4,EYc,8);vEye(W,4.6,hy-2.2,2.4,1.4,EYc,8);if(!LOWQ)for(let i=0;i<4;i++)vK(W,[[-6+i*4,hy+4],[-6+i*4,hy+9]],'#3a2410',1)}
};

Object.assign(BVH,{'ราชันรากดำ':132,'คาสเซียน · ผู้บัญชาการองครักษ์ดาว':130,'ราชาโอเรียน · ผู้ครองบัลลังก์ดาว':130,'ทูตแห่งความหิว · ผู้กลืนดาว':152,'เงามืดของอาซาเอล':128,'ผู้ตีระฆังเงา':144,'ผู้เฝ้าระฆังร่วง':148,'เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา':136});
BVS['ผู้เฝ้าระฆังร่วง']=1.1;
