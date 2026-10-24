
/* ---------- v507 วาดบอสใหม่ ชุด 4: บอสหอคอยวิญญาณ 10 แบบ ----------
   ดักใน drawTowerBoss ก่อนตัวเลือกเดิม (หลังวาดเงา/ออร่าคลั่ง/วงรอบ) · ภายในขยาย TB_SC=2 อยู่แล้ว → หน่วยท้องถิ่น พื้น y=30 สูงไม่เกิน ~−88 (แถบเลือดอยู่ 178 เหนือ) */
const TV={},TWVS={1:1.15,2:1.1,3:1.2,4:1.1,6:1.15,7:1.35,8:1.12,9:1.2};/* ขยายให้ไม่เล็กกว่าแบบเดิม (วัดพื้นที่ภาพ) */
function drawTowerV(bi,T,W,br,up,cf){const f=TV[bi];if(!f||BV1.off)return false;const r0=MPC.rich,o0=V1.O;MPC.rich=0;V1.O=BV.O;g.save();const k=TWVS[bi];if(k){g.translate(0,30);g.scale(k,k);g.translate(0,-30)}
  try{f(T,W,br,up,cf||0);return true}catch(e){BV1.err=String(e&&e.stack||e).slice(0,300);return false}finally{g.restore();MPC.rich=r0;V1.O=o0}}

/* 0 · ราชินีแมงมุมพิษ */
TV[0]=(T,W,br,up,cf)=>{const b=br*.6,CH='#2e2040',CHD='#170f22',CHL='#4c3666',VN='#8cff5c',VG='140,255,90',mv=BWK.mv||0;
  const leg=(s,k)=>{const ph=T*4+BWK.ph*2+k*1.6+(s>0?.8:0),lift=Math.max(0,Math.sin(ph))*3*(.35+mv),hx=s*7,hy=-2+k*3,kx=s*(24+k*6),ky=-22+k*6-lift,fx=s*(33+k*6),fy=28-(k===0?8:0);
    vLimb(W,[hx,hy,(hx+kx)/2,(hy+ky)/2-3,kx,ky],CHL,5,3.4);vLimb(W,[kx,ky,(kx+fx)/2+s*3,(ky+fy)/2-2,fx,fy],CH,3.4,1,0);bvE(W,kx,ky,1.9,1.9,'#6a4c8a',.5);bvDE(W,fx,fy-1,.9,.9,VN)};
  for(let k=3;k>=1;k--)for(const s of[-1,1])leg(s,k);
  /* ท้องแมงมุมลายกะโหลกเรือง */
  vS(W,[[-22,0],['q',-30,20,-12,26],['q',0,30,12,26],['q',30,20,22,0],['q',0,-14,-22,0]],CH,1,1.2);
  if(!LOWQ)for(let i=0;i<3;i++)vK(W,[[-18+i*2,4+i*6],['q',0,8+i*6,18-i*2,4+i*6]],'rgba(110,70,150,.45)',1);
  vS(W,[[-6,4],['q',0,0,6,4],[5,10],[2,12],[3,18],[-3,18],[-2,12],[-5,10]],VN,1,.7);bvDE(W,-2.4,7,1.2,1.4,CHD);bvDE(W,2.4,7,1.2,1.4,CHD);bvAdd(W,()=>glowAt(0,10,12,VG,.5));
  {const q=(T*.8)%1;vD(W,[[-1.2,25],[1.2,25],[0,25+q*8]],VN);bvDE(W,0,25+q*8+1.2,1.4*(1-q*.4),1.4*(1-q*.4),VN)}
  for(const s of[-1,1])leg(s,0);
  /* ลำตัวเกราะไคติน */
  vS(W,[[-8,-4],['q',-12,-22+b,-13,-40+b],['q',0,-46+b,13,-40+b],['q',12,-22+b,8,-4],['q',0,0,-8,-4]],CHL,1,1.2);
  for(let i=0;i<3;i++)vK(W,[[-10+i,-34+i*9+b],['q',0,-31+i*9+b,10-i,-34+i*9+b]],CHD,1);
  bvAdd(W,()=>glowAt(0,-26+b,8,VG,.4));bvE(W,0,-26+b,2.6,3.4,VN,.6);
  /* แขนเคียวไคติน */for(const s of[-1,1]){const lift=s<0?up*.5:0,ex=s*20,ey=-34+b-lift,hx=s*24,hy=-50+b-lift*1.4;vLimb(W,[s*11,-38+b,ex,ey],CHL,4.4,3.4);vLimb(W,[ex,ey,hx,hy],CH,3.4,2.4);
    vS(W,[[hx-1.6,hy],['q',hx+s*6,hy-6,hx+s*3,hy-14],['q',hx+s*2,hy-6,hx+1.6,hy]],'#d8f0c0',1,.7)}
  /* หัว: หมวกไคติน ตา 4 ดวง เขี้ยว มงกุฎหนาม */
  {const hy=-52+b;vS(W,[[-8,hy+6],['q',-10,hy-6,-6,hy-10],['q',0,hy-13,6,hy-10],['q',10,hy-6,8,hy+6],['q',0,hy+10,-8,hy+6]],CH,1,1.1);
    vS(W,[[-6,hy+4],['q',0,hy+2,6,hy+4],['q',4,hy+8,0,hy+9],['q',-4,hy+8,-6,hy+4]],'#dcd0ec',1,.7);
    for(const[x,y,r]of[[-3.6,hy-3,1.6],[3.6,hy-3,1.6],[-6.4,hy-6,1.1],[6.4,hy-6,1.1]])vEye(W,x,y,r,r*.8,VN,6);
    for(const s of[-1,1])vS(W,[[s*2,hy+8],['q',s*5,hy+11,s*3,hy+15],['q',s*2.4,hy+11,s*.6,hy+9]],'#e8f8d8',1,.6);
    for(let i=-3;i<=3;i++){const x=i*2.8,h=5+(3-Math.abs(i))*2.6;vS(W,[[x-1.4,hy-10],[x+i*.5,hy-10-h],[x+1.4,hy-10]],'#3a2a50',1,.6);if(i%2===0){bvE(W,x+i*.5,hy-10-h,1.1,1.1,VN,.4);bvAdd(W,()=>glowAt(x+i*.5,hy-10-h,3.6,VG,.6))}}}
  if(cf>0)bvAdd(W,()=>glowAt(-24,-64+b-up*.7,10*cf+3,VG,.8*cf));
};

/* 1 · อัศวินไร้เศียร */
TV[1]=(T,W,br,up,cf)=>{const b=br*.7,AR='#8a94aa',ARD='#4a5266',ARL='#c8d0e0',CL='#1e2436',SG='120,190,255',mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;
  {const cs=Math.sin(T*1.6)*2;vS(W,[[-16,-40+b],[16,-40+b],['q',26+cs,-6,28+cs,26],[20,22],[12,28],[4,22],[-4,28],[-12,22],[-20,27],[-28-cs,24],['q',-26-cs,-6,-16,-40+b]],CL,1,1.1)}
  for(const s of[-1,1]){const st=s*wk,kx=s*8+st*2,ax=s*8+st*3,ay=27-Math.max(0,st)*2;vLimb(W,[s*6,-8+b,kx,8,ax,ay-2],ARD,7.6,6);vS(W,[[kx-4,6],[kx+4,6],[ax+3.6,ay-3],[ax-3.6,ay-3]],AR,1,.9);bvE(W,kx,5,4,3.4,ARL,.8);vS(W,[[ax-4.6,ay-3],[ax+4.6,ay-3],[ax+s*8,ay+2],[ax-4.6,ay+2.6]],ARD,1,.9)}
  for(const s of[-1,1])vS(W,[[s*3,-12+b],[s*14,-12+b],[s*13,0+b],[s*4,-1+b]],AR,1,.9);
  vS(W,[[-12,-10+b],['c',-16,-20+b,-19,-32+b,-17,-42+b],['q',0,-47+b,17,-42+b],['c',19,-32+b,16,-20+b,12,-10+b],['q',0,-7+b,-12,-10+b]],AR,1,1.2);
  for(const s of[-1,1])vS(W,[[s*2,-41+b],['q',s*11,-44+b,s*16,-37+b],['q',s*14,-28+b,s*5,-25+b],['q',s*2,-31+b,s*2,-41+b]],ARL,1,.8);
  vK(W,[[-13,-14+b],['q',0,-10+b,13,-14+b]],'#7a5a2a',2);bvE(W,0,-12+b,2.2,2,'#d8b050',.6);
  /* ไฟวิญญาณจากคอ */bvAdd(W,()=>glowAt(0,-48+b,14+cf*6,SG,.55));vFlame(W,0,-44+b,10,16+Math.sin(T*5)*2,T,1,['#2a5ac8','#5aa8ff','#c8ecff']);
  vS(W,[[-7,-44+b],[7,-44+b],[6,-40+b],[-6,-40+b]],ARD,1,.8);
  /* แขนซ้ายถือหมวกตัวเอง */{const ex=-20,ey=-26+b-up*.3,hx=-22,hy=-14+b-up*.6;vLimb(W,[-15,-38+b,ex,ey,hx,hy],ARD,6,5);vS(W,[[ex-3.4,ey-2],[ex+3.4,ey-2],[hx+3,hy-2],[hx-3,hy-2]],AR,1,.8);
    const kx=hx-1,ky=hy+8;vS(W,[[kx-7,ky+6],[kx-7.6,ky-4],['q',kx-6,ky-11,kx,ky-11.6],['q',kx+6,ky-11,kx+7.6,ky-4],[kx+7,ky+6],['q',kx,ky+8,kx-7,ky+6]],AR,1,1);vS(W,[[kx-.8,ky-11.6],[kx+.8,ky-11.6],[kx+.7,ky+7],[kx-.7,ky+7]],ARL,1,.5);
    vD(W,[[kx-6,ky-3],[kx+6,ky-3],[kx+5.6,ky-1],[kx-5.6,ky-1]],'#05060c');vEye(W,kx-2.8,ky-2,1.4,.8,'#8ad0ff',6);vEye(W,kx+2.8,ky-2,1.4,.8,'#8ad0ff',6);bvAdd(W,()=>glowAt(kx,ky-2,7,SG,.6));
    vS(W,[[kx,ky-11.6],['q',kx-4,ky-18,kx-10,ky-20],['q',kx-5,ky-15,kx-1,ky-11]],'#4a6ad8',1,.6)}
  /* แขนขวา + ดาบใหญ่ */{const hx=22,hy=-22+b;g.save();g.translate(hx,hy);g.rotate(.2-cf*1.1+Math.sin(T*1.4)*.03);
    vS(W,[[-2.6,-4],[-3.2,-52],[0,-60],[3.2,-52],[2.6,-4]],'#d8dce8',1,1);vD(W,[[-.7,-6],[.7,-6],[.5,-50],[-.5,-50]],'#7a8090');bvAdd(W,()=>{g.strokeStyle='rgba(130,200,255,.55)';g.lineWidth=.9;g.beginPath();g.moveTo(3.2,-52);g.lineTo(2.6,-6);g.stroke();if(cf>0)glowAt(0,-30,20,SG,.35*cf)});
    vS(W,[[-9,-4],[9,-4],[8,-1],[-8,-1]],'#5a6278',1,.8);vS(W,[[-1.4,-1],[1.4,-1],[1.4,8],[-1.4,8]],'#2a2030',1,.6);bvE(W,0,9.6,2,2,'#8a94aa',.6);g.restore();
    vLimb(W,[15,-38+b,21,-30+b,hx,hy],ARD,6,5);bvE(W,hx,hy,3.4,3,AR,.8)}
  for(const s of[-1,1]){const px=s*16,py=-40+b;vS(W,[[px-s*8,py+4],['q',px-s*7,py-6,px+s*2,py-6.6],['q',px+s*10,py-5,px+s*10,py+5],['q',px+s*1,py+2,px-s*8,py+4]],AR,1,1);vK(W,[[px-s*8,py+4],['q',px+s*1,py+2,px+s*10,py+5]],ARL,1);
    for(let k=0;k<2;k++)vS(W,[[px+s*(k*4-2)-1.6,py-5],[px+s*(k*4-1),py-12-k*2],[px+s*(k*4-2)+1.6,py-5]],ARL,1,.6)}
};

/* 2 · ยักษ์ลาวาศิลา */
TV[2]=(T,W,br,up,cf)=>{const b=br*.6,RK='#4e3a30',RKD='#2a1c16',RKL='#76584a',gl=.6+.4*Math.sin(T*3),LV=W?'#fff':'rgb(255,'+(120+gl*90|0)+',40)',LG='255,140,40',mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;
  bvAdd(W,()=>{for(let i=0;i<5;i++){const a=T*.6+i*1.257,x=Math.cos(a)*40,y=-50+Math.sin(a*1.3)*8;glowAt(x,y,5,LG,.35)}});
  for(let i=0;i<5;i++){const a=T*.6+i*1.257,x=Math.cos(a)*40,y=-50+Math.sin(a*1.3)*8+Math.sin(T*2+i)*2,r=2.6+(i%2)*1.4;vS(W,[[x-r,y],[x-r*.4,y-r],[x+r,y-r*.6],[x+r*.8,y+r*.7],[x-r*.3,y+r]],RKL,1,.6)}
  /* ขา */for(const s of[-1,1]){const st=s*wk,x=s*12+st*2;vS(W,[[x-8,-4+b],[x+8,-4+b],[x+9,26],[x+s*3,30],[x-8,29]],RK,1,1.1);vK(W,[[x-6,6],[x+2,10],[x-2,18]],LV,1.2)}
  /* ลำตัวหลังค่อม แผ่นหิน + รอยแตกลาวา */
  const BD=[[-18,-4+b],['q',-28,-18+b,-30,-36+b],['q',-26,-56+b,0,-58+b],['q',26,-56+b,30,-36+b],['q',28,-18+b,18,-4+b],['q',0,2+b,-18,-4+b]];vS(W,BD,RK,1,1.3);
  for(const P of [[[-22,-40],[-10,-48],[-2,-40],[-14,-30]],[[4,-44],[18,-48],[24,-34],[10,-30]],[[-12,-24],[4,-26],[8,-12],[-8,-10]]])vS(W,P.map(p=>[p[0],p[1]+b]),RKL,1,.7);
  {const LC=[[[-20,-44],[-12,-36],[-16,-26],[-8,-18]],[[18,-46],[12,-38],[18,-28],[10,-16]],[[0,-52],[-2,-40],[3,-30]]];for(const c of LC){const P=c.map(p=>[p[0],p[1]+b]);vK(W,P,'#200a04',2.2);vK(W,P,LV,1.1)}bvAdd(W,()=>{for(const c of LC)for(const p of c)glowAt(p[0],p[1]+b,4.6,LG,.3*gl)})}
  bvAdd(W,()=>glowAt(0,-32+b,13+cf*8,LG,.6*gl));bvE(W,0,-32+b,5,5,LV,.8);
  /* แขนหินใหญ่ */for(const s of[-1,1]){const lift=s<0?up*.6:0,ex=s*34,ey=-30+b-lift*.5,hx=s*36,hy=-8+b-lift;vS(W,[[s*22,-48+b],[ex+s*6,ey-6],[ex+s*2,ey+8],[s*24,-34+b]],RK,1,1.1);
    vS(W,[[ex-7,ey],[ex+7,ey],[hx+8,hy+6],[hx+2,hy+12],[hx-8,hy+8]],RKL,1,1.1);vK(W,[[ex-2,ey+2],[hx,hy+4]],LV,1);for(let k=-1;k<=1;k++)vS(W,[[hx+k*4-1.6,hy+8],[hx+k*4,hy+13],[hx+k*4+1.6,hy+8]],RKD,1,.6);
    if(lift>0)bvAdd(W,()=>glowAt(hx,hy+6,8+cf*10,LG,.7*cf))}
  /* บ่าหิน */for(const s of[-1,1])vS(W,[[s*14,-52+b],[s*30,-54+b],[s*34,-44+b],[s*24,-40+b],[s*14,-44+b]],RKL,1,1);
  /* หัวฝังในไหล่ */{const hy=-56+b;vS(W,[[-7,hy+6],[-8,hy-4],[-3,hy-9],[4,hy-9],[8,hy-4],[7,hy+6]],RKD,1,1);vD(W,[[-6,hy-2],[-1,hy-1],[-2,hy+1],[-6,hy]],LV);vD(W,[[6,hy-2],[1,hy-1],[2,hy+1],[6,hy]],LV);bvAdd(W,()=>{glowAt(-3.6,hy-.6,5,LG,.7);glowAt(3.6,hy-.6,5,LG,.7)});vK(W,[[-4,hy+4],[4,hy+4]],LV,1)}
  /* ลาวาหยด */for(let i=0;i<2;i++){const q=(T*.7+i*.5)%1,x=i?30:-30;bvDE(W,x+(i?6:-6),-2+b+q*28,1.4*(1-q*.5),2*(1-q*.4),'#ff8a20')}
};

/* 3 · ผู้พิทักษ์คริสตัล */
TV[3]=(T,W,br,up,cf)=>{const hv=Math.sin(T*1.6)*4,y0=-38+hv,CR='#a8e8ff',CRD='#3a8ac8',CRL='#e8faff',CG='170,230,255';
  bvAdd(W,()=>{glowAt(0,24,26,CG,.35);glowAt(0,y0,40+cf*14,CG,.25)});
  const shard=front=>{for(let i=0;i<6;i++){const a=T*.9+i*1.047,x=Math.cos(a)*34,y=y0+6+Math.sin(a)*8+Math.sin(T*2+i)*2;if((Math.sin(a)>=0)!==front)continue;const k=front?1:.75;vS(W,[[x,y-6*k],[x+2.8*k,y],[x,y+6*k],[x-2.8*k,y]],CR,1,.6);bvAdd(W,()=>glowAt(x,y,5,CG,.4))}};
  shard(false);
  /* ปีกผลึก */for(const s of[-1,1])for(const[dx,dy,L,a]of[[8,-10,30,-.9],[9,-2,24,-.45],[8,6,16,0]]){const x=s*dx,y=y0+dy,aa=a+Math.sin(T*1.4)*.06,tx=x+s*Math.cos(aa)*L,ty=y+Math.sin(aa)*L,nx=-Math.sin(aa)*3.4*s,ny=Math.cos(aa)*3.4;
    vS(W,[[x-nx,y-ny],[tx-nx*.4,ty-ny*.4],[tx+s*Math.cos(aa)*4,ty+Math.sin(aa)*4],[tx+nx*.4,ty+ny*.4],[x+nx,y+ny]],'rgba(170,230,255,.82)',1,.7);vK(W,[[x,y],[tx,ty]],'rgba(255,255,255,.6)',.6)}
  /* ลำตัวผลึก */vS(W,[[0,y0-30],[10,y0-14],[12,y0+6],[0,y0+30],[-12,y0+6],[-10,y0-14]],CR,1,1.1);vS(W,[[0,y0-30],[10,y0-14],[12,y0+6],[0,y0+30],[0,y0-30]],CRD,0);
  vK(W,[[0,y0-30],[0,y0+30]],'rgba(255,255,255,.5)',.8);vK(W,[[-10,y0-14],[0,y0-6],[10,y0-14]],'rgba(255,255,255,.45)',.7);vK(W,[[-12,y0+6],[0,y0+12],[12,y0+6]],'rgba(255,255,255,.35)',.7);
  /* แกนตา */bvAdd(W,()=>glowAt(0,y0-4,10+cf*6,CG,.7));bvE(W,0,y0-4,4.6,3.6,CRL,.8);bvE(W,0,y0-4,2.2,2.6,'#1a5ad8',.5);bvDE(W,-.8,y0-5,.7,.7,'#fff');
  /* มงกุฎผลึก */for(let i=-2;i<=2;i++){const x=i*4,h=6+(2-Math.abs(i))*4;vS(W,[[x-1.6,y0-26+Math.abs(i)*2],[x+i*.6,y0-26-h+Math.abs(i)*2],[x+1.6,y0-26+Math.abs(i)*2]],CRL,1,.6)}
  /* แขนผลึกลอย */for(const s of[-1,1]){const x=s*20,y=y0+2-(s<0?up*.6:0)+Math.sin(T*2+s)*2;vS(W,[[x-3,y-8],[x+3,y-8],[x+4,y+4],[x,y+10],[x-4,y+4]],CR,1,.8);if(s<0&&cf>0)bvAdd(W,()=>glowAt(x,y-12,8*cf+3,CG,.8*cf))}
  shard(true);
};

/* 4 · ราชินีเงาสะท้อน */
TV[4]=(T,W,br,up,cf)=>{const b=br*.6,GW='#2a1840',GWD='#140a22',GWL='#5a3a86',SK='#e8dcf4',MG='190,130,255';
  const mir=front=>{for(let i=0;i<4;i++){const a=T*.8+i*1.571,x=Math.cos(a)*42,y=-36+Math.sin(a)*10;if((Math.sin(a)>=0)!==front)continue;g.save();g.translate(x,y);g.rotate(Math.sin(a+T)*.2);
    bvE(W,0,0,7,10,'#6a4a90',.8);bvE(W,0,0,5.4,8.2,'#c8bcf0',.6);if(!W){const gr=g.createLinearGradient(-5,-8,5,8);gr.addColorStop(0,'rgba(255,255,255,.7)');gr.addColorStop(.5,'rgba(140,110,200,.2)');gr.addColorStop(1,'rgba(220,210,255,.5)');g.fillStyle=gr;g.beginPath();g.ellipse(0,0,5.4,8.2,0,0,7);g.fill()}
    bvE(W,0,-10.6,2,1.6,'#d8b050',.5);if(cf>0)bvAdd(W,()=>glowAt(0,0,12*cf+4,MG,.8*cf));g.restore()}};
  mir(false);
  /* ชุดราตรียาวเป็นระลอก */vS(W,[[-9,-44+b],[9,-44+b],['q',16,-10,26,26],[16,24],[8,29],[0,25],[-8,29],[-16,24],[-26,26],['q',-16,-10,-9,-44+b]],GW,1,1.2);
  for(let i=-2;i<=2;i++)vK(W,[[i*3,-30+b],['q',i*6,0,i*9,26]],'rgba(150,110,220,.4)',.9);vK(W,[[-26,26],[-16,24],[-8,29],[0,25],[8,29],[16,24],[26,26]],W?'#fff':'#c8a8f8',1.1);
  vS(W,[[-8,-46+b],[8,-46+b],[7,-32+b],[0,-28+b],[-7,-32+b]],GWL,1,.9);vS(W,[[-2.4,-38+b],[2.4,-38+b],[0,-33+b]],'#d8b050',1,.5);
  /* แขน */for(const s of[-1,1]){const lift=s<0?up:0,ex=s*15,ey=-36+b-lift*.4,hx=s*18,hy=-48+b-lift;vLimb(W,[s*7,-44+b,ex,ey,hx,hy],SK,3,2.2);bvAdd(W,()=>glowAt(hx,hy-3,4,MG,.5))}
  /* ปีกเงาบาง */for(const s of[-1,1])vS(W,[[s*6,-44+b],['q',s*18,-62+b,s*28,-60+b],['q',s*22,-52+b,s*26,-46+b],['q',s*16,-46+b,s*8,-40+b]],'rgba(110,70,180,.65)',1,.7);
  /* หัว */{const hy=-54+b;vS(W,[[-6,hy-4],['q',-9,hy+8,-8,hy+14],[8,hy+14],['q',9,hy+8,6,hy-4]],'#1a0e28',1,.8);bvE(W,0,hy,5.4,6.2,SK,.9);vD(W,[[-5,hy-1.6],[5,hy-1.6],[4.6,hy+.6],[-4.6,hy+.6]],'#2a1a40');vEye(W,-2.2,hy-.5,1.1,.6,'#d8b0ff',5);vEye(W,2.2,hy-.5,1.1,.6,'#d8b0ff',5);
    for(let i=-2;i<=2;i++){const x=i*2.6,h=4+(2-Math.abs(i))*2.6;vS(W,[[x-1.2,hy-5.6],[x,hy-5.6-h],[x+1.2,hy-5.6]],'#c8b0f0',1,.5)}bvE(W,0,hy-12,1.2,1.2,'#a060f0',.4)}
  mir(true);
};

/* 5 · พฤกษาปีศาจโบราณ */
TV[5]=(T,W,br,up,cf)=>{const b=br*.5,BK='#4e3624',BKD='#2a1a10',BKL='#6e5038',LF='#2e4e22',LFL='#4e7a32',GG='170,230,90';
  for(let i=0;i<6;i++){const a=Math.PI*(.06+i*.18),L=24+(i%2)*8;vLimb(W,[Math.cos(a)*8,24,Math.cos(a)*L*1.4,27+Math.sin(a)*2],BKD,4,1.4,0)}
  /* เรือนยอด */for(const[x,y,r]of[[-24,-62,13],[22,-64,14],[0,-74,16],[-12,-78,11],[12,-80,11]]){const yy=y+b+Math.sin(T*1.2+x)*1.2;bvE(W,x,yy,r,r*.8,LF,1);bvE(W,x-3,yy-3,r*.6,r*.45,LFL,0)}
  for(const[x,y]of[[-20,-58],[16,-70],[4,-82],[-6,-66]]){bvE(W,x,y+b,2,2.4,'#d83a3a',.6);bvAdd(W,()=>glowAt(x,y+b,4,'255,90,60',.4))}
  /* กิ่งแขน */for(const s of[-1,1]){const lift=s<0?up:0,ex=s*30,ey=-40+b-lift*.6,hx=s*40,hy=-30+b-lift;vLimb(W,[s*12,-46+b,ex,ey,hx,hy],BK,7,3.4);
    for(let k=-1;k<=1;k++)vLimb(W,[hx,hy,hx+s*4+k*2,hy+6+k*3],BKD,2,.8,0);vLimb(W,[ex,ey,ex+s*4,ey-10],BKD,2.4,1,0);if(lift>0&&cf>0)bvAdd(W,()=>glowAt(hx,hy,8*cf+3,GG,.7*cf))}
  /* ลำต้นบิด + หน้า */
  const TR=[[-14,26],['q',-18,0,-14,-24+b],['q',-18,-46+b,-10,-56+b],['q',0,-60+b,10,-56+b],['q',18,-46+b,14,-24+b],['q',18,0,14,26],['q',0,22,-14,26]];vS(W,TR,BK,1,1.3);
  if(!LOWQ){g.save();vP(TR);g.clip();for(let i=0;i<6;i++){const x=-14+i*6;vK(W,[[x,26],['q',x+4,-10,x-2,-56]],'rgba(20,10,4,.4)',1.6)}g.restore()}
  {const hy=-30+b;vD(W,[[-9,hy-6],['q',-5,hy-10,-2,hy-6],['q',-5,hy-2,-9,hy-6]],'#0a0604');vD(W,[[9,hy-6],['q',5,hy-10,2,hy-6],['q',5,hy-2,9,hy-6]],'#0a0604');vEye(W,-5.4,hy-6,1.6,1.4,'#c8ff5a',6);vEye(W,5.4,hy-6,1.6,1.4,'#c8ff5a',6);bvAdd(W,()=>{glowAt(-5.4,hy-6,5,GG,.7);glowAt(5.4,hy-6,5,GG,.7)});
    const mo=2+Math.max(0,Math.sin(T*1.8))*2+cf*3;vS(W,[[-8,hy+4],['q',0,hy+1,8,hy+4],['q',5,hy+8+mo,0,hy+9+mo],['q',-5,hy+8+mo,-8,hy+4]],'#0a0604',1,.8);for(let i=0;i<4;i++){vD(W,[[-5+i*3.2,hy+3.4],[-3.8+i*3.2,hy+6],[-2.6+i*3.2,hy+3.4]],'#d8c8a0')}
    vK(W,[[-11,hy-11],['q',-5,hy-13,-1,hy-9]],BKD,1.6);vK(W,[[11,hy-11],['q',5,hy-13,1,hy-9]],BKD,1.6)}
  for(const[x,y]of[[-10,-10],[8,4],[-6,14]]){bvE(W,x,y+b*.5,2.6,1.6,LFL,.5)}
  bvAdd(W,()=>{for(let i=0;i<5;i++){const q=(T*.3+i/5)%1;glowAt(-30+i*15+Math.sin(T+i)*4,20-q*90,1.8,GG,.6*Math.sin(q*Math.PI))}});
};

/* 6 · ลิชผู้ทรงอาคม */
TV[6]=(T,W,br,up,cf)=>{const hv=Math.sin(T*1.5)*3,b=hv-4,RB='#2a1e40',RBD='#140c22',RBL='#4a3670',BN='#e6dcc2',MG='170,120,255';
  bvAdd(W,()=>{for(let i=0;i<5;i++){const a=T*1.1+i*1.257;glowAt(Math.cos(a)*34,-36+b+Math.sin(a)*10,4,MG,.5)}});
  /* เสื้อคลุมลอยขาด */vS(W,[[-12,-44+b],[12,-44+b],['q',20,-10+b,24,22+b],[16,16+b],[10,24+b],[4,16+b],[-2,25+b],[-8,16+b],[-14,23+b],[-24,20+b],['q',-20,-10+b,-12,-44+b]],RB,1,1.2);
  for(let i=-2;i<=2;i++)vK(W,[[i*4,-38+b],['q',i*6,-8+b,i*8,18+b]],'rgba(10,4,20,.45)',1.1);for(let i=0;i<4;i++)bvE(W,0,-30+i*9+b,1.4,1.4,'#c8a8ff',.4);
  vS(W,[[-12,-46+b],['q',0,-38+b,12,-46+b],[10,-40+b],['q',0,-34+b,-10,-40+b]],RBL,1,.8);
  /* มือซ้ายถือคัมภีร์ */{const hx=-24,hy=-28+b-up*.4;vLimb(W,[-10,-42+b,-20,-36+b,hx,hy],RBD,4.6,3.6);vS(W,[[hx-8,hy-2],[hx,hy-4],[hx+1,hy+4],[hx-7,hy+6]],'#e8dcc0',1,.7);vS(W,[[hx-8,hy-2],[hx-9.4,hy-1],[hx-8.4,hy+7],[hx-7,hy+6]],'#5a2a3a',1,.5);
    if(!LOWQ)for(let k=0;k<3;k++)vK(W,[[hx-6,hy-.4+k*2.2],[hx-1.4,hy-1.4+k*2.2]],'#7a6a50',.5);bvAdd(W,()=>glowAt(hx-4,hy-6,8+cf*8,MG,.6))}
  /* มือขวา: ไม้เท้ากะโหลก */{const hx=22,hy=-30+b;vS(W,[[hx-1,hy+50],[hx+1,hy+50],[hx+1.4,hy-26],[hx-1.4,hy-26]],'#3a2a20',1,.7);bvE(W,hx,hy-30,4.4,4.2,BN,.8);bvDE(W,hx-1.4,hy-30.6,1,1.2,'#1a0e28');bvDE(W,hx+1.4,hy-30.6,1,1.2,'#1a0e28');
    bvAdd(W,()=>glowAt(hx,hy-32,10+cf*10,MG,.6+cf*.3));vLimb(W,[10,-42+b,18,-36+b,hx,hy],RBD,4.6,3.6);for(let k=-1;k<=1;k++)vK(W,[[hx-1,hy],[hx-3+k*1.6,hy-2]],BN,.9)}
  /* ฮู้ด + กะโหลก + เขามงกุฎ */{const hy=-54+b;vS(W,[[-10,hy+10],['q',-13,hy-4,-6,hy-11],['q',0,hy-14,6,hy-11],['q',13,hy-4,10,hy+10],['q',0,hy+4,-10,hy+10]],RBD,1,1);
    bvE(W,0,hy,5.6,6,BN,.9);vS(W,[[-3.6,hy+4],['q',0,hy+9,3.6,hy+4]],'#c8bca0',1,.5);bvDE(W,-2.2,hy-.6,1.5,1.8,'#120a1a');bvDE(W,2.2,hy-.6,1.5,1.8,'#120a1a');vEye(W,-2.2,hy-.6,.8,.8,'#c8a8ff',6);vEye(W,2.2,hy-.6,.8,.8,'#c8a8ff',6);
    for(const s of[-1,1])vLimb(W,[s*4,hy-8,s*8,hy-16,s*7,hy-24],BN,2.4,.8,0);vS(W,[[-5,hy-8],[-3,hy-13],[0,hy-10],[3,hy-13],[5,hy-8]],'#a070e0',1,.6)}
};

/* 7 · วิหคเพลิงอเวจี */
TV[7]=(T,W,br,up,cf)=>{const fp=Math.sin(T*3),hv=Math.sin(T*3)*3,y0=-30+hv,FR='255,120,30';
  bvAdd(W,()=>glowAt(0,y0,52,FR,.3));
  /* หางขนยาวเปลว */for(let i=0;i<5;i++){const a=(i-2)*.22+Math.sin(T*2+i)*.06;g.save();g.translate(0,y0+10);g.rotate(a);vS(W,[[-2.6,0],['q',-4,24,-1,46],['q',0,50,1,46],['q',4,24,2.6,0]],i%2?'#ff7a1a':'#d8381a',1,.6);bvE(W,0,46,3,4,'#ffd060',.5);bvAdd(W,()=>glowAt(0,46,6,'255,200,90',.6));g.restore()}
  /* ปีกเปลวไฟ */for(const s of[-1,1]){g.save();g.translate(s*6,y0-6);g.scale(s,1);g.rotate(-.2-fp*.22-cf*.2);
    for(let i=6;i>=0;i--){const t=i/6,x=8+t*44,y=-10-t*18+t*t*14,L=14+t*12;g.save();g.translate(x,y);g.rotate(.6+t*.5);vS(W,[[-2.6,0],['q',-3,L*.6,0,L],['q',3,L*.6,2.6,0]],i%2?'#ff9a2a':'#e8501a',1,.5);g.restore()}
    vS(W,[[0,0],['q',20,-28,52,-20],['q',36,-12,24,-6],['q',12,0,2,6]],'#c8341a',1,.9);vK(W,[[0,-1],['q',20,-28,52,-20]],W?'#fff':'#ffd070',1.1);
    bvAdd(W,()=>{for(let k=0;k<4;k++){const q=(T*1.4+k/4)%1;glowAt(20+k*10,-18+q*6,3*(1-q),'255,200,90',.6*(1-q))}});g.restore()}
  /* ลำตัว */vS(W,[[-8,y0-12],['q',0,y0-18,8,y0-12],['q',12,y0+4,0,y0+14],['q',-12,y0+4,-8,y0-12]],'#e8401a',1,1);vS(W,[[-4,y0-8],['q',0,y0-12,4,y0-8],['q',7,y0+3,0,y0+10],['q',-7,y0+3,-4,y0-8]],'#ffb040',0);
  /* หัว + หงอนเปลว */{const hy=y0-20;vFlame(W,-2,hy-4,8,14,T,0,['#ff4a10','#ff9a20','#ffe070']);bvE(W,0,hy,5.6,5,'#e8401a',.9);vS(W,[[4,hy-1],[11,hy+1],[4,hy+3]],'#ffd050',1,.6);vEye(W,2,hy-1,1.3,1,'#fff6c0',6);
    vS(W,[[-4,hy+4],['q',0,hy+10,4,hy+4]],'#c8341a',0)}
  /* กรงเล็บ */for(const s of[-1,1])for(let k=-1;k<=1;k++)vLimb(W,[s*3,y0+12,s*4+k*2,y0+18],'#3a1a10',1.6,.8,0);
  bvAdd(W,()=>{for(let i=0;i<8;i++){const q=(T*.6+i/8)%1;glowAt(Math.sin(i*2.3+T)*26,y0+30-q*70,2.2*(1-q)+.4,'255,170,60',.8*(1-q))}});
  if(cf>0)bvAdd(W,()=>glowAt(0,y0-6,20+cf*20,FR,.6*cf));
};

/* 8 · ยักษ์เหมันต์ */
TV[8]=(T,W,br,up,cf)=>{const b=br*.6,SK='#9ab8d8',SKD='#5a7898',FUR='#e8eef4',FURD='#a8b8c8',IR='#5a6a80',IC='#c8f0ff',mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;
  bvAdd(W,()=>{for(let i=0;i<3;i++){const a=T*.5+i*2.1;glowAt(Math.cos(a)*30,-20+Math.sin(a)*8,8,'190,230,255',.25)}});
  for(const s of[-1,1]){const st=s*wk,x=s*11+st*2;vLimb(W,[s*9,-8+b,x,10,x,24],SKD,11,9);vS(W,[[x-7,8],[x+7,8],[x+8,18],[x-8,18]],FURD,1,.9);vS(W,[[x-6,21],[x+6,21],[x+s*9,26],[x+s*9,30],[x-6,30]],'#4a3a2a',1,.9)}
  /* ผ้าขนสัตว์คาดเอว */vS(W,[[-18,-14+b],[18,-14+b],[20,4+b],[12,0+b],[6,6+b],[0,1+b],[-6,6+b],[-12,0+b],[-20,4+b]],'#6a5038',1,1);vS(W,[[-18,-17+b],[18,-17+b],[18,-12+b],[-18,-12+b]],IR,1,.8);bvE(W,0,-14.6+b,3,2.6,IC,.6);
  /* ลำตัวใหญ่ */vS(W,[[-16,-14+b],['c',-24,-26+b,-28,-44+b,-22,-54+b],['q',0,-60+b,22,-54+b],['c',28,-44+b,24,-26+b,16,-14+b],['q',0,-10+b,-16,-14+b]],SK,1,1.3);
  for(const s of[-1,1])vK(W,[[s*2,-46+b],['q',s*10,-40+b,s*18,-46+b]],SKD,1.2);for(let i=0;i<2;i++)vK(W,[[-7,-32+i*7+b],['q',0,-30+i*7+b,7,-32+i*7+b]],'rgba(60,90,130,.5)',1);
  /* แขนซ้าย */{const ex=-28,ey=-34+b-up*.3,hx=-28,hy=-18+b-up*.6;vLimb(W,[-20,-50+b,ex,ey,hx,hy],SK,10,8);vS(W,[[ex-5,ey+2],[ex+5,ey+2],[hx+5,hy-2],[hx-5,hy-2]],IR,1,.9);bvE(W,hx,hy,5,4.6,SK,.9)}
  /* ค้อนน้ำแข็ง (ขวา) */{const hx=28,hy=-24+b;g.save();g.translate(hx,hy);g.rotate(.5-cf*1.3+Math.sin(T*1.2)*.03);
    vS(W,[[-1.6,10],[1.6,10],[1.6,-48],[-1.6,-48]],'#5a4a3a',1,.8);vS(W,[[-14,-62],[14,-62],[16,-56],[14,-44],[-14,-44],[-16,-56]],IC,1,1);vK(W,[[-12,-56],[12,-56]],'rgba(255,255,255,.6)',.8);for(const x of[-14,14])vS(W,[[x,-62],[x+(x>0?5:-5),-53],[x,-44]],'#a8e0f8',1,.6);
    bvAdd(W,()=>glowAt(0,-53,12+cf*12,'190,235,255',.4+cf*.3));g.restore();vLimb(W,[20,-50+b,30,-38+b,hx,hy],SK,10,8);bvE(W,hx,hy,5,4.6,SK,.9)}
  /* ปกขนสัตว์ */for(let i=-3;i<=3;i++){const x=i*7,y=-54+b+Math.abs(i)*1.4;bvE(W,x,y,6.6,5,FUR,.9)}
  /* หัว: หมวกเขา + เคราน้ำแข็ง */{const hy=-62+b;for(let i=-3;i<=3;i++)vS(W,[[i*2.6-1.8,hy+4],[i*3+Math.sin(T+i)*.6,hy+16+(3-Math.abs(i))*2.4],[i*2.6+1.8,hy+4]],FUR,1,.5);
    bvE(W,0,hy,7.6,7,SK,.9);vS(W,[[-9,hy-2],['q',-8,hy-12,0,hy-12],['q',8,hy-12,9,hy-2],[8,hy+1],[-8,hy+1]],IR,1,1);vD(W,[[-6,hy-1],[6,hy-1],[5.6,hy+1.4],[-5.6,hy+1.4]],'#0a1018');vEye(W,-2.8,hy,1.4,.9,'#bff4ff',6);vEye(W,2.8,hy,1.4,.9,'#bff4ff',6);
    for(const s of[-1,1])vLimb(W,[s*8,hy-6,s*14,hy-10,s*16,hy-18,s*13,hy-24],'#e8dcc0',2.8,1,0)}
};

/* 9 · เทพผู้ถูกผนึก */
TV[9]=(T,W,br,up,cf)=>{const hv=Math.sin(T*1.2)*3,b=hv-4,rot=T*.3,GD='#e8c050',GDD='#a07818',RB='#f6efd8',SK='#f0d8c0',GL='255,220,120';
  /* วงรัศมีหมุน */bvAdd(W,()=>glowAt(0,-46+b,40+cf*14,GL,.3));if(!W){g.save();g.translate(0,-48+b);g.rotate(rot);g.strokeStyle='rgba(255,220,120,.7)';g.lineWidth=1.6;g.beginPath();g.arc(0,0,26,0,7);g.stroke();g.lineWidth=.8;for(let i=0;i<12;i++){const a=i*.5236;g.beginPath();g.moveTo(Math.cos(a)*22,Math.sin(a)*22);g.lineTo(Math.cos(a)*29,Math.sin(a)*29);g.stroke()}g.restore()}
  /* แขน 4 แขน (ถูกโซ่ล่าม) */const H=[];for(const[s,yy,ex]of[[-1,-36,30],[1,-36,30],[-1,-26,26],[1,-26,26]]){const lift=s<0&&yy===-36?up:0,hx=s*ex,hy=yy-8+b-lift+Math.sin(T*1.6+yy)*1.4;vLimb(W,[s*8,yy-6+b,s*(ex*.6),yy-2+b,hx,hy],SK,3.4,2.6);vS(W,[[hx-2.6,hy-1],[hx+2.6,hy-1],[hx+2.4,hy+2],[hx-2.4,hy+2]],GD,1,.5);H.push([hx,hy])}
  /* โซ่ */if(!W)for(const[hx,hy]of H){const ex=hx*1.5,ey=26;for(let i=0;i<=7;i++){const t=i/7,x=hx+(ex-hx)*t,y=hy+(ey-hy)*t+Math.sin(t*Math.PI)*6;g.strokeStyle='#b8a888';g.lineWidth=.9;g.beginPath();g.ellipse(x,y,1.6,i%2?1:1.8,i%2?0:.6,0,7);g.stroke()}}
  /* ชุดคลุมสีงาช้าง + แถบทอง */vS(W,[[-9,-44+b],[9,-44+b],['q',14,-10+b,18,24],[-18,24],['q',-14,-10+b,-9,-44+b]],RB,1,1.1);vS(W,[[-4,-44+b],[4,-44+b],[6,24],[-6,24]],GD,1,.8);
  for(let k=0;k<3;k++)bvE(W,0,-30+k*14+b,1.6,1.6,'#c83a3a',.4);vK(W,[[-14,-8+b],['q',0,-4+b,14,-8+b]],GDD,1.2);
  vS(W,[[-9,-46+b],['q',0,-40+b,9,-46+b],[8,-41+b],['q',0,-36+b,-8,-41+b]],GD,1,.7);
  /* หัว: ผ้าปิดตา มงกุฎ */{const hy=-54+b;bvE(W,0,hy,5.6,6.4,SK,.9);vS(W,[[-6,hy-1.6],[6,hy-1.6],[6,hy+1.4],[-6,hy+1.4]],'#8a2a2a',1,.5);bvStar(W,0,hy,1.6,.7,4,0,'#ffe8a0');
    vS(W,[[-6,hy-4],[-7,hy-10],[-3,hy-7],[0,hy-14],[3,hy-7],[7,hy-10],[6,hy-4]],GD,1,.8);bvE(W,0,hy-8,1.2,1.2,'#c83a3a',.4);vK(W,[[-2,hy+3.6],['q',0,hy+4.4,2,hy+3.6]],'#a0705a',.6)}
  bvAdd(W,()=>{for(let i=0;i<6;i++){const q=(T*.4+i/6)%1;glowAt(Math.sin(i*2.7+T*.4)*36,-80+q*100,1.8,GL,.6*Math.sin(q*Math.PI))}});
};
