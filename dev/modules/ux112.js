
/* ---------- v504 วาดบอสใหม่รายตัว ชุด 1: บอสยุคแรก (แมพ 2–8) + ผู้คุมสุสาน ----------
   ดักใน drawBoss ตามชื่อบอส (BV1[ชื่อ]) ก่อนตัวเลือกเดิม · ตัวใหญ่ขึ้น ~1.35 เท่า สัดส่วนผู้ใหญ่ (หัวเล็กลง ไหล่กว้าง)
   ใช้เครื่องมือวาดของ v501 (vS ไล่สี + แสงเงาทรงกลม · vLimb · vBone · vFlame · vEye · vGlow) · พื้นอยู่ที่ y=30 */
const BV={O:'#120c0a'};
const BV1={},BVS={};
const bvKey=n=>n&&(BV1[n]?n:n.indexOf('ทูตแห่งความหิว')===0?'ทูตแห่งความหิว · ผู้กลืนดาว':n);
function drawBossV(bn,T,W,br,sw,up,cf){const f=BV1[bvKey(bn)];if(!f||BV1.off)return false;const r0=MPC.rich,o0=V1.O;MPC.rich=0;/* แสงเงาทั้งตัวมาจากเลเยอร์มอน (gxLayerMark) · ไม่ลงแสงรายชิ้นเพราะบอสตัวใหญ่ราคาสูง (~5 ms/เฟรมบน CPU) */const k=BVS[bvKey(bn)];if(k){g.translate(0,30);g.scale(k,k);g.translate(0,-30)}V1.O=BV.O;g.save();
  try{f(T,W,br,sw,up,cf||0);return true}catch(e){BV1.err=String(e&&e.stack||e).slice(0,300);return false}finally{g.restore();MPC.rich=r0;V1.O=o0}}
/* วงรีแบบเติมไล่สี + แสงเงา */
function bvE(W,x,y,rx,ry,c,lw,st){const k=.5523;return vS(W,[[x-rx,y],['c',x-rx,y-ry*k,x-rx*k,y-ry,x,y-ry],['c',x+rx*k,y-ry,x+rx,y-ry*k,x+rx,y],['c',x+rx,y+ry*k,x+rx*k,y+ry,x,y+ry],['c',x-rx*k,y+ry,x-rx,y+ry*k,x-rx,y]],c,st===0?0:1,lw||1.2)}
function bvDE(W,x,y,rx,ry,c){g.beginPath();g.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,7);g.fillStyle=W?'#ffffff':c;g.fill()}
/* เส้นสองชั้น (ขอบเข้ม + เนื้อ + ไฮไลต์) */
function bvL3(W,P,c,cl,w){vK(W,P,BV.O,w+1.6);vK(W,P,c,w);if(!LOWQ)vK(W,P,cl,Math.max(.8,w*.4))}
/* แสงบวกแบบไม่โดนกะพริบขาว */
function bvAdd(W,fn){if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';try{fn()}finally{g.restore()}}
/* เงาพื้นนุ่มใต้บอสตัวใหญ่ */
function bvShadow(rx,ry,a){g.fillStyle='rgba(0,0,0,'+(a||.22)+')';g.beginPath();g.ellipse(0,30,rx,ry,0,0,7);g.fill()}

/* ================= 2 · ราชากระดูกโบราณ ================= */
BV1['ราชากระดูกโบราณ']=(T,W,br,sw,up,cf)=>{const b=br,BN='#ece3ca',BM='#c9bc98',BK='#8f8466',CP='#432458',GD='#d9aa3c',SO='#8fd6ff';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv,fl=Math.sin(T*1.7);bvShadow(58,15);
  /* วิญญาณวนรอบ (หลัง) */bvAdd(W,()=>{for(let i=0;i<4;i++){const a=T*.8+i*1.571,x=Math.cos(a)*52,y=-50+Math.sin(a*1.3)*24;if(Math.sin(a)<0)glowAt(x,y,9,'120,200,255',.55)}});
  /* ผ้าคลุมกษัตริย์ ขาดวิ่น */{const s=fl*4;
    vS(W,[[-30,-77+b],[30,-77+b],['q',47+s,-34,55+s*1.4,24],[46+s,20],[40+s,30],[30+s,23],[21,31],[11+s*.5,24],[1,31],[-9+s*.5,24],[-19,31],[-29+s,22],[-39+s,30],[-47+s,21],[-56+s*1.3,25],['q',-47+s,-34,-30,-77+b]],CP,1,1.4);
    for(let i=-2;i<=2;i++)vK(W,[[i*10,-70+b],['q',i*15+s,-24,i*19+s*1.2,22]],'rgba(12,4,20,.38)',2.2);
    vK(W,[[-55+s*1.3,25],[-47+s,21],[-39+s,30],[-29+s,22],[-19,31],[-9+s*.5,24],[1,31],[11+s*.5,24],[21,31],[30+s,23],[40+s,30],[46+s,20],[55+s*1.4,24]],W?'#fff':'#b88a2c',1.4)}
  /* ขา: กระดูก + สนับแข้งเหล็กสนิม */
  for(const s of[-1,1]){const st=s*wk,kx=s*13+st*4,ky=7,ax=s*12+st*7,ay=25-Math.max(0,st)*3;
    vBone(W,s*9,-9+b,kx,ky,5.2,BM);vBone(W,kx,ky,ax,ay,4.6,BM);
    vS(W,[[kx-5,ky+3],[kx+5,ky+3],[ax+4.4,ay-4],[ax-4.4,ay-4]],'#5f5872',1,1.1);vK(W,[[kx-3,ky+8],[kx+3,ky+8]],'#8a5a3a',1.2);
    vS(W,[[kx-6.5,ky-2],['q',kx,ky-10,kx+6.5,ky-2],['q',kx,ky+4,kx-6.5,ky-2]],'#7d7594',1,1);vD(W,[[kx-1.5,ky-6],[kx,ky-11],[kx+1.5,ky-6]],'#a8a0bc');
    vS(W,[[ax-6,ay-3],[ax+s*9,ay-1],[ax+s*12,ay+4],[ax-6,ay+5]],'#4c4660',1,1.1)}
  /* เชิงกราน + ผ้าคาดหน้าสีม่วงปักทอง */
  vS(W,[[-16,-15+b],['q',0,-21+b,16,-15+b],['q',18,-5+b,9,0+b],['q',0,-5+b,-9,0+b],['q',-18,-5+b,-16,-15+b]],BN,1,1.2);
  {const tf=Math.sin(T*2.1)*2;vS(W,[[-9,-17+b],[9,-17+b],[11+tf,10],[6+tf,7],[3+tf,15],[-1+tf,9],[-5+tf,16],[-11+tf,10]],CP,1,1.2);
    vK(W,[[-7.5,-12+b],[7.5,-12+b]],W?'#fff':GD,1.6);vS(W,[[0,-9+b],[3.6,-3+b],[0,3+b],[-3.6,-3+b]],GD,1,.8);vEye(W,0,-3+b,1.4,1.4,'#7ad0ff',5)}
  /* เข็มขัดทอง + หัวกะโหลก */vS(W,[[-17,-21+b],[17,-21+b],[16,-15+b],[-16,-15+b]],'#7a5a2a',1,1);bvE(W,0,-18+b,4.6,4,GD,1);bvDE(W,-1.5,-18.6+b,1,1,'#2a1a0a');bvDE(W,1.5,-18.6+b,1,1,'#2a1a0a');
  /* แขนซ้าย (หลัง): มือแบถือเปลวไฟวิญญาณ */
  {const ex=-43,ey=-48+b-up*.35,hx=-41,hy=-26+b-up;vBone(W,-30,-71+b,ex,ey,4.8,BM);vBone(W,ex,ey,hx,hy,4.2,BM);{const a=Math.atan2(hy-ey,hx-ex),c=Math.cos(a),n=Math.sin(a),m1=[ex+(hx-ex)*.2,ey+(hy-ey)*.2],m2=[ex+(hx-ex)*.62,ey+(hy-ey)*.62];vS(W,[[m1[0]-n*3.8,m1[1]+c*3.8],[m2[0]-n*3.3,m2[1]+c*3.3],[m2[0]+n*3.3,m2[1]-c*3.3],[m1[0]+n*3.8,m1[1]-c*3.8]],'#5f5872',1,1);vK(W,[[m2[0]-n*3.3,m2[1]+c*3.3],[m2[0]+n*3.3,m2[1]-c*3.3]],W?'#fff':GD,1.2)}
    for(let k=-1;k<=1;k++)bvL3(W,[[hx,hy],[hx+k*3,hy-6]],BM,BN,1.6);vK(W,[[hx+2,hy+1],[hx+6,hy-3]],BM,1.8);
    bvAdd(W,()=>glowAt(hx,hy-10,16+cf*12,'110,190,255',.75));vFlame(W,hx,hy-4,9+cf*5,16+cf*10,T,1.3,['#2b6fe0','#5cb2ff','#c4ecff','#ffffff'])}
  /* แกนวิญญาณในอก (หลังซี่โครง) */
  bvAdd(W,()=>{const pu=.8+.2*Math.sin(T*4);glowAt(0,-50+b,24*pu+cf*10,'110,190,255',.7);glowAt(0,-50+b,8,'230,245,255',.9)});
  vFlame(W,0,-38+b,13,24,T,0,['#2a5fd0','#4fa6ff','#bfe6ff','#ffffff']);
  /* กระดูกสันหลัง */for(let i=0;i<8;i++){const yy=-66+i*6.2+b;bvE(W,Math.sin(T*1.4+i*.5)*.5,yy,3,2.4,BM,.9)}
  /* ซี่โครง */for(let i=0;i<5;i++){const yy=-66+i*7.2+b,w=25-i*2.3;for(const s of[-1,1])bvL3(W,[[s*2,yy],['c',s*w*.7,yy-6,s*w*1.12,yy+2,s*w*.86,yy+8]],BM,BN,3)}
  vS(W,[[-2.6,-70+b],[2.6,-70+b],[2,-40+b],[0,-37+b],[-2,-40+b]],BN,1,1);
  /* ไหปลาร้า */for(const s of[-1,1])vBone(W,s*3,-70+b,s*27,-74+b,3.4,BN);
  /* แขนขวา + ดาบใหญ่อักขระ */
  {const ex=44,ey=-50+b,hx=45,hy=-31+b;
    g.save();g.translate(hx,hy);g.rotate(.24-cf*1.05+Math.sin(T*1.5)*.03);
    vS(W,[[-4.8,-9],[-5.8,-80],[0,-97],[5.8,-80],[4.8,-9]],'#cfccc2',1,1.3);vD(W,[[-1.3,-13],[1.3,-13],[1,-79],[-1,-79]],'#6e6b64');
    vD(W,[[5.8,-60],[3.2,-57],[5.4,-53]],'#4a4844');vD(W,[[-5.6,-36],[-3.4,-33],[-5.4,-30]],'#4a4844');
    bvAdd(W,()=>{const pu=.55+.45*Math.sin(T*3);g.strokeStyle='rgba(140,215,255,'+(.75*pu+cf*.25)+')';g.lineWidth=1.3;for(let k=0;k<6;k++){const yy=-18-k*10;g.beginPath();g.moveTo(-2,yy);g.lineTo(0,yy-4);g.lineTo(2,yy);g.moveTo(0,yy-4);g.lineTo(0,yy-7);g.stroke()}if(cf>0)glowAt(0,-50,40,'120,200,255',.35*cf)});
    vS(W,[[-16,-8],['q',-8,-13,0,-11],['q',8,-13,16,-8],[14,-3],['q',0,-6,-14,-3]],GD,1,1.1);bvE(W,0,-8,3.8,3.4,BN,.9);bvDE(W,-1.3,-8.6,.9,.9,'#1a1210');bvDE(W,1.3,-8.6,.9,.9,'#1a1210');
    vS(W,[[-2.4,-3],[2.4,-3],[2.2,14],[-2.2,14]],'#3c2a1e',1,1);for(let k=0;k<4;k++)vK(W,[[-2.4,k*3.6],[2.4,k*3.6+2]],'#6a4a2e',1);bvE(W,0,17,3.8,3.8,GD,1);
    g.restore();
    vBone(W,30,-71+b,ex,ey,4.8,BM);vBone(W,ex,ey,hx,hy,4.2,BM);{const m1=[ex,ey+4],m2=[hx,hy-6];vS(W,[[m1[0]-3.8,m1[1]],[m2[0]-3.3,m2[1]],[m2[0]+3.3,m2[1]],[m1[0]+3.8,m1[1]]],'#5f5872',1,1);vK(W,[[m2[0]-3.3,m2[1]],[m2[0]+3.3,m2[1]]],W?'#fff':GD,1.2)}bvE(W,hx,hy,4.4,3.8,BN,1)}
  /* บ่า: เกราะกะโหลก + หนาม + ขอบทอง */
  for(const s of[-1,1]){const px=s*30,py=-74+b;for(let k=0;k<3;k++){const bx=px+s*(k*5-3),h=13+k*4;vS(W,[[bx-2.8,py-6],['q',bx+s*1.5,py-6-h*.6,bx+s*4,py-6-h],[bx+2.8,py-6]],BN,1,.9)}
    vS(W,[[px-s*16,py+6],['q',px-s*16,py-11,px+s*2,py-12],['q',px+s*16,py-11,px+s*16,py+8],['q',px+s*4,py+4,px-s*16,py+6]],'#56506a',1,1.3);
    vS(W,[[px-s*14,py+8],['q',px+s*2,py+3,px+s*17,py+11],['q',px+s*14,py+16,px+s*2,py+13],['q',px-s*8,py+12,px-s*14,py+8]],'#4a4460',1,1.1);
    vK(W,[[px-s*16,py+6],['q',px+s*4,py+4,px+s*16,py+8]],W?'#fff':GD,1.6);vK(W,[[px-s*12,py-6],['q',px+s*2,py-9,px+s*12,py-4]],'rgba(255,255,255,.18)',1.2);
    {const kx=px+s*2,ky=py-2;bvE(W,kx,ky,6.2,5.6,BN,1);vS(W,[[kx-3.6,ky+3.4],['q',kx,ky+8,kx+3.6,ky+3.4]],BM,1,.8);bvDE(W,kx-2.2,ky-.6,1.6,1.9,'#16111a');bvDE(W,kx+2.2,ky-.6,1.6,1.9,'#16111a');vD(W,[[kx,ky+1.4],[kx-.9,ky+3.2],[kx+.9,ky+3.2]],'#16111a')}}
  /* คอเสื้อคลุมตั้งสูงด้านหลังหัว */{const cb=-77+b;vS(W,[[-28,cb],['q',-34,cb-22,-26,cb-40],['q',-14,cb-28,0,cb-30],['q',14,cb-28,26,cb-40],['q',34,cb-22,28,cb]],CP,1,1.3);
    vS(W,[[-22,cb],['q',-26,cb-18,-21,cb-32],['q',-10,cb-22,0,cb-24],['q',10,cb-22,21,cb-32],['q',26,cb-18,22,cb]],'#5a1c30',0);
    vK(W,[[-28,cb],['q',-34,cb-22,-26,cb-40],['q',-14,cb-28,0,cb-30],['q',14,cb-28,26,cb-40],['q',34,cb-22,28,cb]],W?'#fff':GD,1.8)}
  /* กะโหลก + กราม + มงกุฎ */
  {const hy=-97+b,jo=Math.max(0,Math.sin(T*2.6))*1.4+cf*3.2;
    vS(W,[[-10,hy+8+jo],['q',0,hy+21+jo,10,hy+8+jo],[8.5,hy+15+jo],['q',0,hy+19.5+jo,-8.5,hy+15+jo]],BM,1,1.1);
    for(let i=0;i<5;i++)vD(W,[[-6+i*2.8,hy+12+jo],[-4.8+i*2.8,hy+9+jo],[-3.6+i*2.8,hy+12+jo]],'#fff6e0');
    vS(W,[[-15,hy+2],['c',-17.5,hy-14,-9.5,hy-21.5,0,hy-21.5],['c',9.5,hy-21.5,17.5,hy-14,15,hy+2],['q',14,hy+7,10.5,hy+10],[-10.5,hy+10],['q',-14,hy+7,-15,hy+2]],BN,1,1.3);
    for(let i=0;i<6;i++)vD(W,[[-7.6+i*2.7,hy+8],[-6.4+i*2.7,hy+12],[-5.2+i*2.7,hy+8]],'#fff6e0');
    for(const s of[-1,1])vD(W,[[s*1.8,hy-4],['q',s*3.6,hy-10.5,s*10.5,hy-8.5],['q',s*12.5,hy-2,s*8,hy+1.2],['q',s*2.6,hy+1.5,s*1.8,hy-4]],'#0c0912');
    vD(W,[[0,hy+1],[-2.1,hy+6],[2.1,hy+6]],'#0c0912');for(const s of[-1,1])vK(W,[[s*1.5,hy-5.5],['q',s*6,hy-8.5,s*12.5,hy-10.5]],'#8f8466',2.2);vK(W,[[-14,hy+3],['q',-11,hy+6,-8,hy+5]],'rgba(110,98,74,.7)',1.2);vK(W,[[14,hy+3],['q',11,hy+6,8,hy+5]],'rgba(110,98,74,.7)',1.2);vK(W,[[6,hy-21],[4,hy-15],[7,hy-12],[5,hy-7]],'rgba(70,58,44,.75)',.9);
    vEye(W,-6.6,hy-4,2.5,2.5,SO,12);vEye(W,6.6,hy-4,2.5,2.5,SO,12);bvAdd(W,()=>{glowAt(-6.6,hy-4,7,'120,200,255',.6);glowAt(6.6,hy-4,7,'120,200,255',.6)});
    const cy=hy-17;vS(W,[[-14.5,cy+5],[-16,cy-9],[-10.5,cy-3],[-8,cy-16],[-3.5,cy-4],[0,cy-23],[3.5,cy-4],[8,cy-16],[10.5,cy-3],[16,cy-9],[14.5,cy+5]],GD,1,1.2);
    vK(W,[[-14.5,cy+1.5],[14.5,cy+1.5]],W?'#fff':'#8a6418',1.3);for(const[x,y]of[[-16,cy-9],[-8,cy-16],[0,cy-23],[8,cy-16],[16,cy-9]])bvE(W,x,y-1.6,1.9,1.9,BN,.7);
    vEye(W,0,cy-2,2.2,2.6,'#4aa8ff',6);vEye(W,-8.5,cy,1.5,1.7,'#e04a4a',4);vEye(W,8.5,cy,1.5,1.7,'#e04a4a',4)}
  /* วิญญาณวนรอบ (หน้า) */bvAdd(W,()=>{for(let i=0;i<4;i++){const a=T*.8+i*1.571,x=Math.cos(a)*52,y=-50+Math.sin(a*1.3)*24;if(Math.sin(a)>=0){glowAt(x,y,11,'120,200,255',.7);glowAt(x,y,3,'230,245,255',.9)}}});
};

/* ================= 3 · จอมมารเพลิงนรก ================= */
BV1['จอมมารเพลิงนรก']=(T,W,br,sw,up,cf)=>{const b=br,SK='#a62a1c',SKD='#5c140c',HR='#3e2f28',HRL='#eadcc0',MB='#7e1c12',IR='#2f2725',RIM=W?'#fff':'#ff7a2a';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv,fl=Math.sin(T*1.6),lp=.62+.38*Math.sin(T*3.2);bvShadow(66,16);
  
  /* ปีกค้างคาว */
  for(const s of[-1,1]){const rx=s*15,ry=-70+b,ex=s*46,ey=-100+b-fl*9,t1=[s*86,-116+b-fl*14],t2=[s*90,-80+b-fl*9],t3=[s*79,-48+b-fl*5],t4=[s*56,-28+b-fl*2];
    vS(W,[[rx,ry],[ex,ey],t1,['q',s*74,-96+b-fl*12,t2[0],t2[1]],['q',s*70,-66+b-fl*7,t3[0],t3[1]],['q',s*60,-45+b-fl*4,t4[0],t4[1]],['q',s*38,-38+b,s*20,-40+b]],MB,1,1.4);
    for(const t of[t1,t2,t3,t4])bvL3(W,[[ex,ey],t],'#3a0c08','#8a2a1c',2.4);
    bvL3(W,[[rx,ry],[ex,ey]],'#3a0c08','#8a2a1c',4.4);
    for(const t of[t1,t2,t3])vS(W,[[t[0],t[1]],[t[0]+s*5,t[1]-3],[t[0]+s*2,t[1]+3]],HRL,1,.7);
    vS(W,[[ex-2,ey+1],['q',ex+s*2,ey-9,ex+s*8,ey-11],['q',ex+s*3,ey-4,ex+2,ey+2]],HRL,1,.8)}
  /* หาง */{const ts=Math.sin(T*2)*6,tx=-64+ts*1.2,ty=-24+ts*.6;vLimb(W,[-6,-4+b,-28,10,-52+ts*.3,6,-64+ts,-12+ts*.4,tx,ty],SKD,10,3);vS(W,[[tx,ty+4],[tx-8,ty-2],[tx-1,ty-15],[tx+7,ty-3]],HR,1,1)}
  /* ขาแพะ */
  for(const s of[-1,1]){const st=s*wk,kx=s*23+st*3,ky=4,hx=s*15+st*6,hy=17,fx=s*17+st*7,fy=27-Math.max(0,st)*3;
    vLimb(W,[s*12,-12+b,kx,ky],SK,18,13);vLimb(W,[kx,ky,hx,hy],SKD,12,8);vLimb(W,[hx,hy,fx,fy-2],'#2a1410',8,7);
    vS(W,[[kx-s*3,ky+1],[kx+s*7,ky+8],[hx+s*7,hy-2],[hx+s*3,hy+4],[hx-s*6,hy+2],[kx-s*7,ky+7]],'#3a1a12',1,1);
    vS(W,[[fx-6.5,fy-3],[fx+6.5,fy-3],[fx+7.5,fy+3],[fx+1,fy+3],[fx,fy+.5],[fx-1,fy+3],[fx-7.5,fy+3]],'#161010',1,1.1)}
  /* ผ้านุ่งหนัง + เข็มขัดกะโหลก */
  vS(W,[[-17,-15+b],[17,-15+b],[14,10],[8,6],[3,15],[-3,8],[-9,13],[-15,6]],'#3c2c24',1,1.2);
  vS(W,[[-20,-21+b],[20,-21+b],[19,-13+b],[-19,-13+b]],IR,1,1.1);for(let i=-2;i<=2;i++)if(i)bvDE(W,i*7,-17+b,1.3,1.3,'#9a8a80');
  bvE(W,0,-17+b,5.2,4.6,'#ece0c4',1);bvDE(W,-1.8,-17.6+b,1.2,1.3,'#2a0a04');bvDE(W,1.8,-17.6+b,1.2,1.3,'#2a0a04');
  vK(W,[[-19,-13+b],['q',-26,2,-14,5]],'#7a7270',1.8);vK(W,[[19,-13+b],['q',26,2,14,5]],'#7a7270',1.8);
  /* ลำตัวกล้ามเนื้อ + รอยแตกลาวา */
  vS(W,[[-16,-14+b],['c',-21,-30+b,-38,-48+b,-36,-66+b],['q',-20,-77+b,0,-74+b],['q',20,-77+b,36,-66+b],['c',38,-48+b,21,-30+b,16,-14+b],['q',0,-10+b,-16,-14+b]],SK,1,1.5);
  for(const s of[-1,1])vK(W,[[s*2,-56+b],['q',s*14,-45+b,s*29,-57+b]],SKD,2);
  for(let i=0;i<3;i++){const yy=-43+i*8+b;vK(W,[[-9,yy],['q',0,yy+2.4,9,yy]],'rgba(70,14,8,.55)',1.5)}vK(W,[[0,-50+b],[0,-18+b]],'rgba(70,14,8,.55)',1.5);
  {const LC=[[[-31,-62],[-22,-54],[-27,-46],[-17,-38]],[[25,-61],[18,-51],[26,-43],[20,-34],[12,-28]],[[-6,-31],[2,-25],[-2,-18]]];
    for(const c of LC){const P=c.map(p=>[p[0],p[1]+b]);vK(W,P,'#3a0a04',2.8);vK(W,P,W?'#fff':'rgb(255,'+(150+70*lp|0)+',60)',1.3)}
    bvAdd(W,()=>{for(const c of LC)for(const p of c)glowAt(p[0],p[1]+b,7,'255,140,40',.32*lp)})}
  /* แขนขวา (ลง) กรงเล็บไฟหยด */
  {const ex=51,ey=-42+b,hx=50,hy=-18+b+sw;vLimb(W,[33,-64+b,ex,ey],SK,16,13);vLimb(W,[ex,ey,hx,hy],SK,13,10);
    vS(W,[[ex-6,ey+3],[ex+6,ey+3],[hx+5,hy-5],[hx-5,hy-5]],IR,1,1);for(let k=0;k<2;k++)vS(W,[[ex+5,ey+6+k*7],[ex+12,ey+5+k*7],[ex+5.5,ey+10+k*7]],HRL,1,.7);
    bvE(W,hx,hy,6,5.5,SK,1.1);for(let k=-1;k<=1;k++)vS(W,[[hx+k*3.4-1.4,hy+3],['q',hx+k*4,hy+9,hx+k*4.6+1,hy+12],['q',hx+k*3.4+1,hy+8,hx+k*3.4+1.4,hy+3]],HRL,1,.6);
    vFlame(W,hx,hy+16,6,-10-Math.sin(T*8)*2,T,4,['#ff4a10','#ffa030'])}
  /* แขนซ้าย ยกลูกไฟ */
  {const ex=-53,ey=-48+b-up*.3,hx=-55,hy=-70+b-up;vLimb(W,[-33,-64+b,ex,ey],SK,16,13);vLimb(W,[ex,ey,hx,hy],SK,13,10);
    vS(W,[[ex-6,ey-3],[ex+6,ey-3],[hx+5,hy+6],[hx-5,hy+6]],IR,1,1);for(let k=0;k<2;k++)vS(W,[[ex-5,ey-5-k*7],[ex-12,ey-6-k*7],[ex-5.5,ey-10-k*7]],HRL,1,.7);
    bvE(W,hx,hy,6,5.5,SK,1.1);for(let k=-1;k<=1;k++)vS(W,[[hx+k*3.4-1.4,hy-3],['q',hx+k*4,hy-8,hx+k*4.6+1,hy-10],['q',hx+k*3.4+1,hy-7,hx+k*3.4+1.4,hy-3]],HRL,1,.6);
    const fr=11+cf*8+Math.sin(T*7);bvAdd(W,()=>{glowAt(hx,hy-15,fr*2.5,'255,110,30',.55);glowAt(hx,hy-15,fr,'255,230,150',.8)});vFlame(W,hx,hy-5,fr*1.3,fr*2.3,T,2,['#ff3a10','#ff8a20','#ffd060','#fff8d8'])}
  /* เกราะบ่าหนาม */
  for(const s of[-1,1]){const px=s*32,py=-68+b;for(let k=0;k<3;k++){const bx=px+s*(k*6-5),by=py-7+k;vS(W,[[bx-3.2,by],[bx+s*4,by-15-k*3],[bx+3.2,by]],HRL,1,.9)}
    vS(W,[[px-s*13,py+7],['q',px-s*12,py-6,px+s*2,py-9],['q',px+s*14,py-8,px+s*16,py+5],[px+s*11,py+10],['q',px,py+5,px-s*13,py+7]],'#4a3c36',1,1.3);
    vS(W,[[px-s*10,py+6],['q',px+s*2,py+2,px+s*15,py+7],[px+s*12,py+13],['q',px+s*1,py+10,px-s*9,py+11]],'#3a2e2a',1,1.1);
    vK(W,[[px-s*10,py-3],['q',px+s*2,py-7,px+s*12,py-3]],'rgba(255,220,190,.22)',1.4);vK(W,[[px-s*13,py+7],['q',px,py+5,px+s*11,py+10]],RIM,1.4);bvAdd(W,()=>glowAt(px+s*2,py+7,10,'255,120,40',.3*lp))}
  vS(W,[[-10,-76+b],[10,-76+b],[12,-66+b],[-12,-66+b]],SKD,1,1);
  /* หัวปีศาจ + แผงไฟ + เขาแกะ */
  {const hy=-90+b;
    for(let i=-3;i<=3;i++)vFlame(W,i*5.4,hy-7,10,20+(3-Math.abs(i))*5,T,i*1.7,['#c81e0a','#ff6a1a','#ffc040']);
    for(const s of[-1,1])vS(W,[[s*12,hy-3],[s*27,hy-10],[s*15,hy+5]],SK,1,1);
    vS(W,[[-14,hy-10],['q',0,hy-19,14,hy-10],['q',17.5,hy,13,hy+10],['q',8,hy+18.5,0,hy+19],['q',-8,hy+18.5,-13,hy+10],['q',-17.5,hy,-14,hy-10]],SK,1,1.3);
    vS(W,[[-14.5,hy-6],['q',-7,hy-1.5,0,hy-5],['q',7,hy-1.5,14.5,hy-6],['q',8,hy-10,0,hy-9],['q',-8,hy-10,-14.5,hy-6]],SKD,1,.9);
    for(const s of[-1,1]){vD(W,[[s*2.4,hy-3.4],[s*10.5,hy-5.5],[s*8.4,hy-1.2]],W?'#fff':'#ffe24a');vK(W,[[s*5,hy+3],[s*7,hy+5]],'rgba(60,10,6,.6)',1)}
    bvAdd(W,()=>{glowAt(-6.5,hy-3.5,7,'255,220,60',.7);glowAt(6.5,hy-3.5,7,'255,220,60',.7)});
    vD(W,[[-1.6,hy+1],[-2.6,hy+4],[-1,hy+4]],'#3a0a06');vD(W,[[1.6,hy+1],[2.6,hy+4],[1,hy+4]],'#3a0a06');
    const mo=1.6+cf*3+Math.max(0,Math.sin(T*2.2));vS(W,[[-8.5,hy+8],['q',0,hy+6,8.5,hy+8],['q',6,hy+13+mo,0,hy+14+mo],['q',-6,hy+13+mo,-8.5,hy+8]],'#2a0604',1,.9);
    bvAdd(W,()=>glowAt(0,hy+11,7,'255,120,30',.6));vFang(W,-5.2,hy+7.4,2.6,4.8);vFang(W,5.2,hy+7.4,2.6,4.8);vD(W,[[-3.6,hy+13+mo],[-2.6,hy+9.5+mo],[-1.6,hy+13+mo]],'#f2ead2');vD(W,[[1.6,hy+13+mo],[2.6,hy+9.5+mo],[3.6,hy+13+mo]],'#f2ead2');
    vS(W,[[-4,hy+17],[0,hy+27],[4,hy+17]],'#2a0c08',1,.8);
    for(const s of[-1,1]){const P=[s*8,hy-11,s*19,hy-24,s*34,hy-27,s*42,hy-15,s*36,hy-3,s*29,hy-7];vLimb(W,P,HR,10,2.6);
      if(!LOWQ)for(let k=1;k<5;k++){const x=P[k*2],y=P[k*2+1];vK(W,[[x-3,y-2],[x+3,y+2]],'rgba(20,12,8,.6)',1)}vK(W,[[s*20,hy-22],['q',s*33,hy-27,s*40,hy-15]],'rgba(255,240,210,.35)',1.3);vS(W,[[s*35,hy-4],[s*29,hy-7],[s*32,hy-1]],HRL,1,.6)}}
  /* ประกายไฟลอยขึ้น */bvAdd(W,()=>{for(let i=0;i<10;i++){const ph=(T*.45+i*.1)%1,x=Math.sin(i*7.3+T*.6)*54,y=24-ph*130;glowAt(x,y,3.4*(1-ph)+1,'255,150,40',.85*(1-ph))}});
};

/* ================= 4 · จักรพรรดิน้ำแข็งนิรันดร์ ================= */
BV1['จักรพรรดิน้ำแข็งนิรันดร์']=(T,W,br,sw,up,cf)=>{const b=br,A='#aedbf8',AD='#4f8bc8',ADD='#25508a',RB='#dfeefc',CP='#2b4e8a',FUR='#f5f9ff',CRY='#a8f2ff',TR=W?'#fff':'#7fb8ea';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv,fl=Math.sin(T*1.4);bvShadow(58,14);
  
  const shard=front=>{for(let i=0;i<5;i++){const a=T*.7+i*1.2566,x=Math.cos(a)*58,y=-60+Math.sin(a)*12+Math.sin(T*2+i)*4;if((Math.sin(a)>=0)!==front)continue;const k=front?1:.8;bvAdd(W,()=>glowAt(x,y,11,'150,230,255',.45));vS(W,[[x,y-10*k],[x+4.4*k,y],[x,y+10*k],[x-4.4*k,y]],CRY,1,.9);vK(W,[[x,y-9*k],[x,y+9*k]],'rgba(255,255,255,.6)',.8)}};
  shard(false);
  /* ผ้าคลุม + ระย้าน้ำแข็ง */
  {const s=fl*3;vS(W,[[-30,-74+b],[30,-74+b],['q',44+s,-30,53+s,24],[-53+s,24],['q',-44+s,-30,-30,-74+b]],CP,1,1.4);
    for(let i=-2;i<=2;i++)vK(W,[[i*11,-68+b],['q',i*16+s,-22,i*20+s,22]],'rgba(255,255,255,.12)',2);
    for(let i=0;i<11;i++){const x=-50+s+i*10,h=6+((i*7)%4)*2.5;vS(W,[[x-3.6,23],[x,23+h],[x+3.6,23]],CRY,1,.7)}vK(W,[[-53+s,24],[53+s,24]],W?'#fff':'#c4ecff',1.8)}
  /* ขาเกราะ */
  for(const s of[-1,1]){const st=s*wk,kx=s*10+st*3,ax=s*10+st*5,ay=27-Math.max(0,st)*3;vLimb(W,[s*9,-12+b,kx,6,ax,ay-4],AD,12,9);
    vS(W,[[kx-5.5,6],[kx+5.5,6],[ax+5,ay-5],[ax-5,ay-5]],A,1,1.1);vS(W,[[kx-6,3],['q',kx,-4,kx+6,3],['q',kx,8,kx-6,3]],CRY,1,.9);
    vS(W,[[ax-6,ay-5],[ax+6,ay-5],[ax+s*10,ay+2],[ax-6,ay+3]],ADD,1,1.1)}
  /* กระโปรงเสื้อคลุมผ่าหน้า */
  for(const s of[-1,1]){vS(W,[[s*5,-16+b],[s*21,-16+b],['q',s*31,4,s*37+fl*2,26],[s*24,25],['q',s*15,4,s*5,-16+b]],RB,1,1.3);vK(W,[[s*5,-16+b],['q',s*15,4,s*24,25]],TR,2.2);
    if(!LOWQ)for(let k=0;k<3;k++)vK(W,[[s*(14+k*5),-6+k*6],[s*(16+k*5),2+k*6],[s*(13+k*5),6+k*6]],'rgba(110,170,230,.55)',1)}
  /* เกราะอก + แกนผลึก */
  vS(W,[[-15,-14+b],['c',-21,-28+b,-31,-46+b,-28,-64+b],['q',0,-73+b,28,-64+b],['c',31,-46+b,21,-28+b,15,-14+b],['q',0,-9+b,-15,-14+b]],AD,1,1.4);
  for(const s2 of[-1,1]){vS(W,[[s2*2,-63+b],['q',s2*17,-68+b,s2*26,-58+b],['q',s2*24,-44+b,s2*9,-38+b],['q',s2*2,-46+b,s2*2,-63+b]],A,1,1.1);vK(W,[[s2*5,-60+b],['q',s2*16,-63+b,s2*22,-56+b]],'rgba(255,255,255,.5)',1)}
  for(let k=0;k<3;k++){const y=-35+k*7+b,w=13-k*1.6;vS(W,[[-w,y],['q',0,y-3,w,y],[w-1,y+5.4],['q',0,y+2.4,-w+1,y+5.4]],k%2?A:'#c4e6fb',1,.9)}
  {const pu=.7+.3*Math.sin(T*3);bvAdd(W,()=>glowAt(0,-48+b,18+cf*8,'150,235,255',.6*pu));vS(W,[[0,-58+b],[6.5,-48+b],[0,-38+b],[-6.5,-48+b]],CRY,1,1.1);vD(W,[[0,-56+b],[2.6,-49+b],[0,-45+b],[-2.2,-50+b]],'rgba(255,255,255,.75)')}
  vS(W,[[-19,-19+b],[19,-19+b],[18,-12+b],[-18,-12+b]],ADD,1,1);vS(W,[[0,-19+b],[3.6,-15.5+b],[0,-12+b],[-3.6,-15.5+b]],CRY,1,.8);
  /* แขนซ้าย: ลูกแก้วน้ำแข็ง */
  {const ex=-47,ey=-46+b-up*.3,hx=-49,hy=-64+b-up;vLimb(W,[-30,-64+b,ex,ey],AD,13,11);vLimb(W,[ex,ey,hx,hy],A,11,9);vS(W,[[ex-6,ey-2],[ex+6,ey-2],[hx+5,hy+5],[hx-5,hy+5]],A,1,1);bvE(W,hx,hy,5.6,5,ADD,1);
    const orr=8+cf*5+Math.sin(T*4)*.8,oy=hy-15;bvAdd(W,()=>{glowAt(hx,oy,orr*2.8,'150,230,255',.6);glowAt(hx,oy,orr,'240,252,255',.85)});
    vS(W,[[hx,oy-orr],[hx+orr*.86,oy-orr*.5],[hx+orr*.86,oy+orr*.5],[hx,oy+orr],[hx-orr*.86,oy+orr*.5],[hx-orr*.86,oy-orr*.5]],'#d8fbff',1,.9);
    if(!W)for(let k=0;k<3;k++){const a=T*2+k*2.094;g.strokeStyle='rgba(200,245,255,.8)';g.lineWidth=1;g.beginPath();g.ellipse(hx,oy,orr*1.7,orr*.6,a*.3,a,a+1.6);g.stroke()}}
  /* แขนขวา: ดาบผลึก ปักลงพื้น */
  {const ex=46,ey=-44+b,hx=47,hy=-28+b;
    g.save();g.translate(hx,hy);g.rotate(-cf*2.5+Math.sin(T*1.2)*.02);
    vS(W,[[-6.5,6],[6.5,6],[5,56],[0,66],[-5,56]],'#c8f4ff',1,1.2);vD(W,[[-1.2,8],[1.2,8],[.8,54],[-.8,54]],'rgba(255,255,255,.8)');vK(W,[[-4,14],[-2,22],[-4.4,30]],'rgba(80,150,220,.5)',1);vK(W,[[4,34],[2,42],[4.2,48]],'rgba(80,150,220,.5)',1);bvAdd(W,()=>glowAt(0,32,22+cf*20,'150,230,255',.35+cf*.3));
    vS(W,[[-14,2],[-6,-2],[0,1],[6,-2],[14,2],[6,5],[0,8],[-6,5]],ADD,1,1);vS(W,[[-2,-1],[2,-1],[2,-14],[-2,-14]],'#2a3a5a',1,1);vS(W,[[0,-21],[3.4,-16],[0,-12],[-3.4,-16]],CRY,1,.8);
    g.restore();
    vLimb(W,[30,-64+b,ex,ey],AD,13,11);vLimb(W,[ex,ey,hx,hy],A,11,9);vS(W,[[ex-6,ey+2],[ex+6,ey+2],[hx+5,hy-4],[hx-5,hy-4]],A,1,1);bvE(W,hx,hy,5.6,5,ADD,1)}
  /* ขนสัตว์คลุมไหล่ */
  for(let i=-4;i<=4;i++){const x=i*8,y=-70+b+Math.abs(i)*1.8;bvE(W,x,y,8,6.4,FUR,1.1)}
  if(!LOWQ)for(let i=-3;i<=3;i++)vK(W,[[i*8-3,-68+b+Math.abs(i)*1.8],['q',i*8,-66+b+Math.abs(i)*1.8,i*8+3,-68+b+Math.abs(i)*1.8]],'rgba(120,160,210,.5)',1);
  /* บ่าเกราะน้ำแข็ง + ผลึกพุ่งออกด้านข้าง */
  for(const s of[-1,1]){const px=s*31,py=-69+b;
    for(const[dx,dy,len,ang,w]of[[4,-4,20,-1.05,4.4],[10,-1,16,-.6,3.8],[1,-6,12,-1.45,3.2]]){const x=px+s*dx,y=py+dy,a=ang,tx=x+s*Math.cos(a)*len,ty=y+Math.sin(a)*len,nx=-Math.sin(a)*w*s,ny=Math.cos(a)*w;
      vS(W,[[x-nx,y-ny],[tx-nx*.6,ty-ny*.6],[tx+s*Math.cos(a)*5,ty+Math.sin(a)*5],[tx+nx*.6,ty+ny*.6],[x+nx,y+ny]],CRY,1,.9);vK(W,[[x,y],[tx,ty]],'rgba(255,255,255,.6)',.8)}
    vS(W,[[px-s*14,py+7],['q',px-s*13,py-8,px+s*3,py-9],['q',px+s*16,py-7,px+s*17,py+8],['q',px+s*2,py+4,px-s*14,py+7]],AD,1,1.3);
    vS(W,[[px-s*11,py+7],['q',px+s*3,py+3,px+s*18,py+9],[px+s*15,py+15],['q',px+s*2,py+11,px-s*9,py+12]],A,1,1.1);
    vK(W,[[px-s*11,py-3],['q',px+s*2,py-7,px+s*13,py-3]],'rgba(255,255,255,.4)',1.3)}
  /* หัว: หน้ากากน้ำแข็ง เคราน้ำแข็ง มงกุฎผลึก */
  {const hy=-94+b;
    for(let i=-3;i<=3;i++)vS(W,[[i*3.3-2.2,hy+6],[i*4.2+Math.sin(T*1.5+i)*1.2,hy+20+(3-Math.abs(i))*5],[i*3.3+2.2,hy+6]],'#e6f6ff',1,.6);
    vS(W,[[-12.5,hy-1],['q',-14,hy-12,-11,hy-14],['q',0,hy-21,11,hy-14],['q',14,hy-12,12.5,hy-1],['q',10,hy+8,0,hy+12],['q',-10,hy+8,-12.5,hy-1]],'#d6ecfa',1,1.3);
    for(const s of[-1,1])vK(W,[[s*12,hy-2],['q',s*8,hy+6,s*1,hy+10]],'rgba(80,130,190,.5)',1.2);
    vS(W,[[-11,hy-8],['q',0,hy-5,11,hy-8],[10,hy-2],['q',0,hy+1,-10,hy-2]],ADD,1,.9);
    for(const s of[-1,1])vD(W,[[s*2,hy-5],[s*9,hy-6.5],[s*8,hy-3.6],[s*2.6,hy-3]],W?'#fff':'#9ff6ff');
    bvAdd(W,()=>{glowAt(-5.5,hy-4.6,7,'150,240,255',.75);glowAt(5.5,hy-4.6,7,'150,240,255',.75)});
    vS(W,[[-1.6,hy-9],[1.6,hy-9],[1.2,hy+5],[0,hy+7],[-1.2,hy+5]],'#9cc8ee',1,.8);
    const cy=hy-14;vS(W,[[-14,cy+4],[14,cy+4],[13,cy-2],[-13,cy-2]],AD,1,1);
    const SP=[[-12,10],[-8,15],[-4,22],[0,32],[4,22],[8,15],[12,10]];for(const[x,h]of SP){const y=cy-2;vS(W,[[x-2.6,y],[x-2.2,y-h*.7],[x,y-h],[x+2.2,y-h*.7],[x+2.6,y]],CRY,1,.8)}
    bvAdd(W,()=>glowAt(0,cy-18,14,'150,235,255',.5));vS(W,[[0,cy-5],[2.6,cy-1.6],[0,cy+1.8],[-2.6,cy-1.6]],'#5ad8ff',1,.7)}
  shard(true);
  /* เกล็ดหิมะ */bvAdd(W,()=>{for(let i=0;i<8;i++){const ph=(T*.25+i*.125)%1,x=Math.sin(i*5.1+T*.4)*58,y=-118+ph*146;glowAt(x,y,2.4,'230,248,255',.8*(1-Math.abs(ph-.5)*1.6))}});
};

/* ================= 6 · ราชันย์ห้วงลึก ================= */
BV1['ราชันย์ห้วงลึก']=(T,W,br,sw,up,cf)=>{const b=br,SK='#2f918a',SKD='#185650',SKL='#5fc3b3',BL='#a4dccb',FIN='#35a898',MEM='#86e2d2',COR='#ff7a5a',GD='#dcb44c',LU='120,250,255';bvShadow(60,15);
  
  const bub=front=>{if(W)return;for(let i=0;i<7;i++){const ph=(T*.35+i*.143)%1,x=Math.sin(i*4.7+T*.8)*(40+i*3),y=22-ph*140,r=1.6+(i%3);if((i%2===0)!==front)continue;g.globalAlpha=Math.min(1,(1-ph)*1.6);g.strokeStyle='rgba(200,255,250,.8)';g.lineWidth=1;g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.arc(x-r*.35,y-r*.35,r*.3,0,7);g.fill();g.globalAlpha=1}};
  bub(false);
  /* ครีบหลังแผ่เหมือนพัด */
  {const cx=0,cy=-80+b,N=7,tips=[];for(let i=0;i<N;i++){const a=-2.75+i*(2.35/(N-1))+Math.sin(T*1.3+i)*.03;tips.push([cx+Math.cos(a)*46,cy+Math.sin(a)*50,a])}
    const P=[[-22,-66+b],[tips[0][0],tips[0][1]]];for(let i=1;i<N;i++){const am=(tips[i-1][2]+tips[i][2])/2;P.push(['q',cx+Math.cos(am)*36,cy+Math.sin(am)*39,tips[i][0],tips[i][1]])}P.push([22,-66+b]);
    vS(W,P,MEM,1,1.3);for(const t of tips)bvL3(W,[[cx,cy+10],[t[0],t[1]]],SKD,FIN,2.2)}
  /* หนวดล่าง */
  const ten=(x0,d,col)=>{const wv=Math.sin(T*2+x0*.2)*4,s=Math.sign(x0)||1,P=[x0,-10+b,x0*1.3+s*3+wv*.2,6,x0*1.7+s*7+wv*.7,18,x0*2.1+s*12+wv,25.5,x0*2.4+s*19+wv*1.2,27];vLimb(W,P,col,d,3);
    if(!LOWQ)for(let k=1;k<4;k++){const x=P[k*2],y=P[k*2+1];bvDE(W,x-s*1.5,y+d*.24-k*.8,1.4,1.1,'#c4f0e4')}};
  for(const x of[-20,20,-13,13])ten(x,13,SKD);for(const x of[-6,6])ten(x,14,SK);
  /* ลำตัวถัง เกล็ด เพรียง */
  vS(W,[[-21,-6+b],['c',-32,-20+b,-34,-50+b,-29,-66+b],['q',0,-77+b,29,-66+b],['c',34,-50+b,32,-20+b,21,-6+b],['q',0,0+b,-21,-6+b]],SK,1,1.5);
  vS(W,[[-13,-58+b],['q',0,-63+b,13,-58+b],['q',17,-30+b,10,-6+b],['q',0,-2+b,-10,-6+b],['q',-17,-30+b,-13,-58+b]],BL,1,1.1);
  for(let i=0;i<5;i++){const yy=-52+i*10+b;vK(W,[[-12+i*.6,yy],['q',0,yy+3,12-i*.6,yy]],'rgba(40,110,100,.55)',1.2)}
  if(!LOWQ)for(const s of[-1,1])for(let r=0;r<4;r++)for(let c=0;c<3;c++){const x=s*(17+c*4.5+(r%2)*2),y=-58+r*9+c*1.5+b;vK(W,[[x-2.6,y],['q',x,y+3,x+2.6,y]],'rgba(20,70,66,.6)',1)}
  for(const[x,y]of[[-24,-62],[-20,-58],[25,-60],[21,-63]]){bvE(W,x,y+b,2.6,2.2,'#d8d0b8',.8);bvDE(W,x,y-.6+b,.9,.9,'#4a4038')}
  /* สร้อยมุก */for(let i=-5;i<=5;i++){const x=i*3.6,y=-64+b+i*i*.18;bvE(W,x,y,1.8,1.8,'#f4f2ff',.6)}
  /* แขนซ้าย: ลูกน้ำหมุน */
  {const ex=-48,ey=-50+b-up*.3,hx=-50,hy=-70+b-up;vLimb(W,[-29,-64+b,ex,ey],SK,16,13);vS(W,[[ex-2,ey],[ex-12,ey+2+Math.sin(T*3)*1.5],[ex-9,ey-6],[hx-8,hy+6],[hx-3,hy+5]],MEM,1,.9);vLimb(W,[ex,ey,hx,hy],SK,13,10);bvL3(W,[[-37,-60+b],[-33,-55+b]],GD,'#fff0b0',2.4);bvE(W,hx,hy,5.8,5.2,SK,1);
    for(let k=-1;k<=1;k++)vK(W,[[hx+k*3,hy-3],[hx+k*4,hy-8]],SKD,2);
    const orr=9+cf*6,oy=hy-16;bvAdd(W,()=>{glowAt(hx,oy,orr*2.6,'90,230,230',.55);glowAt(hx,oy,orr,'220,255,255',.75)});bvE(W,hx,oy,orr,orr,'#4ad8d0',1);
    if(!W){g.strokeStyle='rgba(220,255,255,.85)';g.lineWidth=1.2;for(let k=0;k<3;k++){const a=T*3+k*2.09;g.beginPath();g.arc(hx,oy,orr*.62,a,a+1.4);g.stroke()}}}
  /* แขนขวา + ตรีศูล */
  {const ex=46,ey=-50+b,hx=48,hy=-36+b,tx=49,top=-118+b;
    vS(W,[[tx-1.8,26],[tx+1.8,26],[tx+1.8,top],[tx-1.8,top]],GD,1,1);for(let k=0;k<6;k++)vK(W,[[tx-1.8,-10-k*16+b],[tx+1.8,-12-k*16+b]],'#8a6a20',1);
    vS(W,[[tx-12,top+2],['q',tx,top+8,tx+12,top+2],[tx+12,top-2],['q',tx,top+3,tx-12,top-2]],GD,1,1);
    for(const[dx,h]of[[-11,14],[0,22],[11,14]]){vS(W,[[tx+dx-1.8,top-1],[tx+dx-1.8,top-h+4],[tx+dx,top-h],[tx+dx+1.8,top-h+4],[tx+dx+1.8,top-1]],GD,1,.9);vD(W,[[tx+dx+1.8,top-h+6],[tx+dx+4.2,top-h+9],[tx+dx+1.8,top-h+10]],GD)}
    bvAdd(W,()=>{const pu=.6+.4*Math.sin(T*4);for(const[dx,h]of[[-11,14],[0,22],[11,14]])glowAt(tx+dx,top-h,7+cf*6,LU,.7*pu);if(cf>0)glowAt(tx,top-12,40,LU,.4*cf)});
    vLimb(W,[29,-64+b,ex,ey],SK,16,13);vS(W,[[ex+2,ey],[ex+12,ey+3+Math.sin(T*3+1)*1.5],[ex+9,ey+8],[hx+7,hy-2],[hx+3,hy-2]],MEM,1,.9);vLimb(W,[ex,ey,hx,hy],SK,13,10);bvL3(W,[[37,-60+b],[33,-55+b]],GD,'#fff0b0',2.4);bvE(W,hx,hy,5.8,5.2,SK,1)}
  /* ไหล่: ปะการัง + เพรียง */
  for(const s of[-1,1]){const px=s*29,py=-67+b;vLimb(W,[px-s*2,py-4,px+s*5,py-15,px+s*2,py-22],COR,4,1.8);vLimb(W,[px+s*4,py-12,px+s*11,py-17],COR,3,1.4);
    const SH=[];for(let k=0;k<=6;k++){const a=Math.PI+k*Math.PI/6,r=13;SH.push([px+Math.cos(a)*r,py+Math.sin(a)*r*.8]);if(k<6){const am=a+Math.PI/12;SH.push(['q',px+Math.cos(am)*r*1.12,py+Math.sin(am)*r*.9,px+Math.cos(a+Math.PI/6)*r,py+Math.sin(a+Math.PI/6)*r*.8])}}SH.push([px+4,py+6]);SH.push([px-4,py+6]);
    vS(W,SH,'#f2d6c4',1,1.1);for(let k=1;k<6;k++){const a=Math.PI+k*Math.PI/6;vK(W,[[px,py+5],[px+Math.cos(a)*12,py+Math.sin(a)*10]],'rgba(170,110,90,.6)',1)}vS(W,[[px-4,py+4],[px+4,py+4],[px+3,py+8],[px-3,py+8]],'#e0b8a4',1,.8)}
  /* หัวปลา: ปากกว้างฟันเข็ม ตาโต ครีบหู เหงือก */
  {const hy=-92+b,mo=1.5+cf*3+Math.max(0,Math.sin(T*2))*1.2;
    for(const s of[-1,1]){const P=[[s*14,hy-8]];for(let k=0;k<4;k++){const a=-.9+k*.5;P.push([s*(18+Math.cos(a)*14),hy+Math.sin(a)*14-2]);P.push([s*(18+Math.cos(a+.25)*9),hy+Math.sin(a+.25)*9-2])}P.push([s*14,hy+6]);vS(W,P,MEM,1,1);for(let k=0;k<4;k++){const a=-.9+k*.5;vK(W,[[s*15,hy-1],[s*(18+Math.cos(a)*13),hy+Math.sin(a)*13-2]],FIN,1.2)}}
    vS(W,[[-17,hy+4],['c',-19,hy-10,-12,hy-22,0,hy-22],['c',12,hy-22,19,hy-10,17,hy+4],['q',12,hy+9+mo,0,hy+10+mo],['q',-12,hy+9+mo,-17,hy+4]],SK,1,1.4);
    vS(W,[[-14,hy+4],['q',0,hy+1,14,hy+4],['q',10,hy+12+mo,0,hy+13+mo],['q',-10,hy+12+mo,-14,hy+4]],'#0e2624',1,.9);
    for(let i=0;i<7;i++){const x=-10.5+i*3.5;vD(W,[[x-1,hy+4],[x,hy+8.5],[x+1,hy+4]],'#f0f4e8');vD(W,[[x+.8,hy+12+mo],[x+1.8,hy+8+mo],[x+2.8,hy+12+mo]],'#f0f4e8')}
    vS(W,[[-17,hy+4],['q',-12,hy+16+mo,0,hy+17+mo],['q',12,hy+16+mo,17,hy+4],['q',12,hy+11+mo,0,hy+12+mo],['q',-12,hy+11+mo,-17,hy+4]],SKD,1,1);
    for(const s of[-1,1]){bvE(W,s*10,hy-8,5,5,'#f2f0a0',1);vD(W,[[s*10,hy-12],[s*11.4,hy-8],[s*10,hy-4],[s*8.6,hy-8]],'#1a1a10');if(!W){g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.arc(s*10-1.6,hy-9.6,1.2,0,7);g.fill()}
      for(let k=0;k<3;k++)vK(W,[[s*(12+k*2.2),hy+1],['q',s*(14+k*2.2),hy-2,s*(13.5+k*2.2),hy-6]],'rgba(10,50,46,.7)',1)}
    bvAdd(W,()=>{glowAt(-10,hy-8,8,'240,250,140',.4);glowAt(10,hy-8,8,'240,250,140',.4)});
    const cy=hy-17;vS(W,[[-13,cy+3],['q',0,cy-1,13,cy+3],[12,cy+7],['q',0,cy+3,-12,cy+7]],GD,1,1);
    for(const[x,h,l]of[[-10,10,-.4],[-4,14,-.1],[4,13,.2],[10,10,.5]]){vLimb(W,[x,cy+1,x+l*h,cy-h*.6,x+l*h*1.4,cy-h],COR,3.4,1.6);vLimb(W,[x+l*h*.6,cy-h*.45,x+l*h*.6+(l>0?4:-4),cy-h*.8],COR,2.2,1.2)}
    vEye(W,0,cy+3,1.8,1.8,'#7af8ff',6);
    const sx=Math.sin(T*1.7)*4,bx=10+sx,by=hy-42;vK(W,[[0,hy-20],['q',4,hy-34,bx,by+4]],SKD,2.4);vK(W,[[0,hy-20],['q',4,hy-34,bx,by+4]],FIN,1.2);
    bvAdd(W,()=>{const pu=.75+.25*Math.sin(T*5);glowAt(bx,by,16*pu+cf*8,LU,.7);glowAt(bx,by,5,'240,255,255',.95)});bvE(W,bx,by,3.4,3.4,'#cffcff',.8)}
  bub(true);
};

/* ================= 7 · ราชาก็อบลินถุงทอง ================= */
BV1['ราชาก็อบลินถุงทอง']=(T,W,br,sw,up,cf)=>{const b=br,SK='#78b450',SKD='#416f2e',SKL='#a8d878',RO='#b3252e',FUR='#f4eedc',GD='#f2c240',GDD='#a87818',SA='#9c7244';
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv;bvShadow(60,15);
  const coin=(x,y,r,rot)=>{const sx=Math.abs(Math.cos(rot||0))*.85+.15;g.save();g.translate(x,y);g.scale(sx,1);bvE(W,0,0,r,r,GD,.8);if(!W){vK(W,[[-r*.45,-r*.3],[r*.2,-r*.6]],'rgba(255,255,230,.8)',.8)}g.restore()};
  /* ถุงทองบนบ่าซ้าย */
  {const sx=-31,sy=-62+b;vS(W,[[sx+8,sy-26],['c',sx-14,sy-30,sx-34,sy-6,sx-30,sy+16],['c',sx-26,sy+36,sx+6,sy+40,sx+18,sy+22],['c',sx+26,sy+8,sx+22,sy-20,sx+8,sy-26]],SA,1,1.4);
    vS(W,[[sx-18,sy+6],[sx-8,sy+4],[sx-9,sy+14],[sx-19,sy+15]],'#7a5430',1,.8);vK(W,[[sx-17,sy+8],[sx-10,sy+13]],'#5a3a1e',.8);
    if(!LOWQ)for(let k=0;k<4;k++)vK(W,[[sx-22+k*6,sy-8+k*3],['q',sx-18+k*6,sy+10,sx-20+k*7,sy+26]],'rgba(70,46,20,.35)',1);
    for(const[x,y]of[[-6,-30],[-1,-33],[4,-31],[-3,-36],[2,-37],[7,-35]])coin(sx+x+8,sy+y+4,3.2,x);
    vK(W,[[sx+2,sy-24],['q',sx+10,sy-30,sx+16,sy-22]],'#6a4a24',2.4);
    vS(W,[[sx-3,sy-23],[sx+15,sy-23],[sx+13,sy-19],[sx-1,sy-19]],'#c8a060',1,.8);
    vD(W,[[sx-10,sy+18],['q',sx-4,sy+10,sx+2,sy+18],['q',sx-4,sy+26,sx-10,sy+18]],GDD);vK(W,[[sx-4,sy+13],[sx-4,sy+23]],'#6a4a14',1.2)}
  /* เสื้อคลุมแดง (หลัง) */
  vS(W,[[-28,-70+b],[28,-70+b],['q',42,-24,46,24],[-46,24],['q',-42,-24,-28,-70+b]],'#8e1820',1,1.4);
  vS(W,[[-46,22],[46,22],[46,28],[-46,28]],FUR,1,1);if(!LOWQ)for(let i=0;i<9;i++)vD(W,[[-40+i*10,24],[-38.6+i*10,26.6],[-41.4+i*10,26.6]],'#1a1a1a');
  /* ขาสั้น + รองเท้าปลายงอน */
  for(const s of[-1,1]){const st=s*wk,ax=s*13+st*4,ay=24-Math.max(0,st)*3;vLimb(W,[s*11,-8+b,s*13+st*2,10,ax,ay-2],SKD,11,9);
    vS(W,[[ax-6,ay-4],[ax+s*11,ay-2],['q',ax+s*18,ay-2,ax+s*16,ay-9],['q',ax+s*20,ay+2,ax+s*8,ay+4],[ax-6,ay+4]],'#5a2a6a',1,1.1);bvE(W,ax+s*16,ay-9.5,1.8,1.8,GD,.6)}
  vS(W,[[-24,-16+b],['q',0,-22+b,24,-16+b],['q',28,0+b,14,6+b],['q',0,0+b,-14,6+b],['q',-28,0+b,-24,-16+b]],RO,1,1.2);
  /* พุงพลุ้ย */
  bvE(W,0,-34+b,29,30,SK,1.4);if(!W)bvDE(W,-8,-44+b,10,8,'rgba(200,240,160,.25)');vK(W,[[-1.5,-24+b],['q',0,-21+b,1.5,-24+b]],SKD,1.4);
  /* เสื้อคลุมด้านข้างลำตัว + ขลิบขนเออร์มิน */
  for(const s of[-1,1]){vS(W,[[s*13,-70+b],['q',s*37,-54+b,s*34,-14+b],['q',s*30,1+b,s*20,4+b],['q',s*31,-32+b,s*13,-70+b]],RO,1,1.3);vK(W,[[s*13,-70+b],['q',s*31,-32+b,s*20,4+b]],W?'#fff':FUR,4);if(!LOWQ)for(let k=0;k<4;k++){const t=k/3.4,x=s*(14+t*13),y=-66+t*64+b;vD(W,[[x,y],[x+.8,y+2],[x-.8,y+2]],'#1a1a1a')}}
  /* เข็มขัดใต้พุง */
  vS(W,[[-27,-12+b],['q',0,-3+b,27,-12+b],[27,-5+b],['q',0,4+b,-27,-5+b]],'#4a2a18',1,1.1);vS(W,[[-7,-9+b],[7,-9+b],[7,1+b],[-7,1+b]],GD,1,1);vEye(W,0,-4+b,2.6,2.6,'#e0303a',5);
  /* สร้อยเหรียญ */for(let i=-4;i<=4;i++)coin(i*5,-62+b+i*i*.35,2.8,i*.7);
  /* แขนขวา + คทาอัญมณี */
  {const ex=43,ey=-44+b,hx=44,hy=-30+b,top=-110+b;vS(W,[[hx-1.6,22],[hx+1.6,22],[hx+1.6,top+4],[hx-1.6,top+4]],GD,1,1);bvE(W,hx,-4+b,3,2.4,GD,.8);bvE(W,hx,-60+b,3,2.4,GD,.8);
    vS(W,[[hx-8,top+6],['q',hx-10,top-6,hx-4,top-12],[hx,top-8],[hx+4,top-12],['q',hx+10,top-6,hx+8,top+6]],GD,1,1);
    bvAdd(W,()=>{const pu=.7+.3*Math.sin(T*3);glowAt(hx,top-2,14*pu+cf*10,'100,240,255',.7)});vS(W,[[hx,top-9],[hx+5,top-2],[hx,top+5],[hx-5,top-2]],'#5ae8ff',1,1);vD(W,[[hx-1,top-7],[hx+2,top-3],[hx-1.4,top-2]],'rgba(255,255,255,.8)');
    vLimb(W,[27,-62+b,ex,ey],SK,12,10);vLimb(W,[ex,ey,hx,hy],SK,10,8);bvE(W,hx,hy,5,4.6,SK,1);bvE(W,hx+2,hy+2,1.6,1.6,GD,.5)}
  /* แขนซ้ายจับเชือกถุง */
  {const ex=-41,ey=-52+b-up*.25,hx=-31,hy=-80+b-up*.3;vLimb(W,[-27,-62+b,ex,ey],SK,12,10);vLimb(W,[ex,ey,hx,hy],SK,10,8);bvE(W,hx,hy,5,4.6,SK,1);bvE(W,hx+2,hy+1,1.6,1.6,'#e0303a',.5)}
  /* ปกขนเออร์มิน */for(let i=-4;i<=4;i++){const x=i*7,y=-69+b+Math.abs(i)*1.4;bvE(W,x,y,6.4,5,FUR,1);if(!LOWQ&&i%2===0)vD(W,[[x,y-1],[x+.8,y+1.4],[x-.8,y+1.4]],'#1a1a1a')}
  /* หัวก็อบลิน */
  {const hy=-88+b;
    for(const s of[-1,1]){vS(W,[[s*14,hy-6],['q',s*28,hy-14,s*44,hy-20],['q',s*34,hy-4,s*15,hy+6]],SK,1,1.2);vS(W,[[s*17,hy-3],['q',s*28,hy-10,s*38,hy-15],['q',s*30,hy-5,s*17,hy+3]],'#d88a8a',0);
      if(!W){g.strokeStyle=GD;g.lineWidth=1.6;g.beginPath();g.arc(s*30,hy-3,3.2,0,7);g.stroke()}}
    vS(W,[[-16,hy-8],['c',-18,hy-22,18,hy-22,16,hy-8],['q',19,hy+6,10,hy+14],['q',0,hy+19,-10,hy+14],['q',-19,hy+6,-16,hy-8]],SK,1,1.4);
    for(const s of[-1,1]){bvE(W,s*7,hy-5,4.6,3.6,'#f4e8a0',.9);bvDE(W,s*7+1,hy-5,1.8,2,'#c81e1e');bvDE(W,s*7+1,hy-5,.8,1,'#1a0a0a');vK(W,[[s*2,hy-9],[s*12,hy-12]],'#2a3a1a',2.4)}
    if(!W){g.strokeStyle=GD;g.lineWidth=1.3;g.beginPath();g.arc(7,hy-5,5.4,0,7);g.stroke();vK(W,[[12,hy-3],['q',16,hy+8,10,hy+18]],GDD,.8)}
    vS(W,[[-1,hy-6],['q',8,hy-2,6,hy+5],['q',2,hy+7,-2,hy+4]],SKD,1,1);
    vS(W,[[-11,hy+6],['q',0,hy+12,11,hy+6],['q',8,hy+13,0,hy+14],['q',-8,hy+13,-11,hy+6]],'#3a0e0e',1,.9);
    for(let i=0;i<6;i++){const x=-7.5+i*3;vD(W,[[x-1.2,hy+7.5+Math.abs(i-2.5)*.4],[x+1.2,hy+7.5+Math.abs(i-2.5)*.4],[x+1,hy+10.5],[x-1,hy+10.5]],i===1||i===4?GD:'#f4f0dc')}
    bvDE(W,-12,hy+2,1.2,1.2,SKD);bvDE(W,13,hy-1,1,1,SKD);
    g.save();g.translate(0,hy-15);g.rotate(-.12+Math.sin(T*1.4)*.03);
    vS(W,[[-17,4],[-19,-12],[-11,-5],[-6,-18],[0,-8],[6,-18],[11,-5],[19,-12],[17,4]],GD,1,1.3);vK(W,[[-17,1],[17,1]],W?'#fff':GDD,1.4);
    for(const[x,y]of[[-19,-12],[-6,-18],[6,-18],[19,-12]])bvE(W,x,y-1.6,1.9,1.9,'#fff6c0',.6);
    vEye(W,0,-3,2.2,2.6,'#e0303a',5);vEye(W,-10,-1,1.6,1.8,'#3a8af0',4);vEye(W,10,-1,1.6,1.8,'#3ad06a',4);g.restore()}
  /* เหรียญหล่นจากถุง */
  for(let i=0;i<3;i++){const ph=(T*.7+i*.333)%1,x=-22-i*6+ph*6,y=-86+b+ph*ph*112;if(y<26)coin(x,y,2.8,T*8+i)}
  bvAdd(W,()=>{for(let i=0;i<4;i++){const ph=(T*.9+i*.25)%1,a=i*1.7;glowAt(-30+Math.cos(a)*16,-90+Math.sin(a)*8+b,3.4*Math.sin(ph*Math.PI),'255,240,150',.9)}});
};

/* ================= 8 · ฟาโรห์อมตะ เนเฟอร์ราห์ ================= */
BV1['ฟาโรห์อมตะ เนเฟอร์ราห์']=(T,W,br,sw,up,cf)=>{const hov=-5+Math.sin(T*1.5)*3,b=br+hov,BD='#eadfc0',BDD='#b9a57c',GD='#edbd36',GDD='#a37a1a',LA='#2c56b4',TQ='#36cfc4',CA='#c8442c',fl=Math.sin(T*1.3);
  bvShadow(46,12,.2);
  /* ทรายหมุนที่พื้น */
  if(!W)for(let k=0;k<3;k++){const a=T*1.6+k*2.09;g.strokeStyle='rgba(225,190,120,'+(.45-k*.1)+')';g.lineWidth=1.6;g.beginPath();g.ellipse(0,22-k*5,32+k*8,6+k*2,0,a,a+2.2);g.stroke()}
  /* จานสุริยะ */
  {const cy=-94+b;bvAdd(W,()=>glowAt(0,cy,46+cf*16,'255,210,90',.5));
    if(!W){g.save();g.translate(0,cy);g.rotate(T*.15);g.strokeStyle='rgba(255,215,110,.75)';g.lineWidth=1.6;for(let i=0;i<16;i++){const a=i*.3927,r1=36,r2=45+(i%2)*8;g.beginPath();g.moveTo(Math.cos(a)*r1,Math.sin(a)*r1);g.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);g.stroke()}g.restore()}
    g.lineWidth=4.4;g.strokeStyle=W?'#fff':GD;g.beginPath();g.arc(0,cy,34,0,7);g.stroke();g.lineWidth=1;g.strokeStyle=BV.O;g.beginPath();g.arc(0,cy,36.2,0,7);g.stroke();g.beginPath();g.arc(0,cy,31.8,0,7);g.stroke()}
  /* ปีกทองแบบอียิปต์ */
  for(const s of[-1,1]){const r0=[s*20,-72+b],tp=[s*94,-98+b+fl*4];
    const rows=[[LA,TQ,46,1],[TQ,LA,30,.72],[GD,GDD,16,.46]];
    for(const[c1,c2,L0,kk]of rows){const N=9;for(let k=N-1;k>=0;k--){const t=k/(N-1),bx=r0[0]+(tp[0]-r0[0])*t,by=r0[1]+(tp[1]-r0[1])*t+2,L=(10+t*L0)*kk+6,dx=s*t*7;
      vS(W,[[bx-s*4,by],[bx+s*4.4,by],[bx+s*4.4+dx,by+L],['q',bx+dx,by+L+5,bx-s*4+dx,by+L]],k%2?c1:c2,1,.8)}}
    vLimb(W,[r0[0],r0[1],r0[0]+(tp[0]-r0[0])*.5,r0[1]+(tp[1]-r0[1])*.5-4,tp[0],tp[1]],GD,7,3)}
  /* ผ้าพันแผลปลิว */
  for(const[x,y,l]of[[-30,-40,26],[30,-40,24],[-12,10,18],[12,12,20]]){const w=Math.sin(T*3+x)*5;vLimb(W,[x,y+b,x+w*.5+Math.sign(x)*6,y+b+l*.5,x+w+Math.sign(x)*10,y+b+l],BD,3.4,1.6,0)}
  /* ขาพันผ้า + กระโปรงลินิน */
  for(const s of[-1,1]){vLimb(W,[s*8,-10+b,s*10,8+b*.5,s*9,22],BD,10,7.6);if(!LOWQ)for(let k=0;k<4;k++)vK(W,[[s*10-4,-4+k*6+b*.5],[s*10+4,-1+k*6+b*.5]],'rgba(120,100,70,.5)',1);vS(W,[[s*9-4,20],[s*9+s*7,21],[s*9+s*7,25],[s*9-4,25]],BD,1,1)}
  vS(W,[[-17,-16+b],[17,-16+b],[23,6+b],[-23,6+b]],'#f6eed8',1,1.2);if(!LOWQ)for(let i=-3;i<=3;i++)vK(W,[[i*4.4,-14+b],[i*5.8,5+b]],'rgba(170,140,90,.5)',.9);
  vS(W,[[-6,-14+b],[6,-14+b],[8,12+b],[-8,12+b]],GD,1,1);for(let k=0;k<4;k++)vS(W,[[-7+k*.5,-9+k*6+b],[7-k*.5,-9+k*6+b],[7-k*.4,-6+k*6+b],[-7+k*.4,-6+k*6+b]],LA,0);
  vS(W,[[-18,-19+b],[18,-19+b],[18,-13+b],[-18,-13+b]],GD,1,1);for(let i=-3;i<=3;i++)vD(W,[[i*5-1.6,-17.6+b],[i*5+1.6,-17.6+b],[i*5+1.6,-14.4+b],[i*5-1.6,-14.4+b]],i%2?LA:TQ);
  /* ลำตัวพันผ้า */
  vS(W,[[-15,-16+b],['c',-19,-30+b,-27,-48+b,-25,-64+b],['q',0,-72+b,25,-64+b],['c',27,-48+b,19,-30+b,15,-16+b]],BD,1,1.3);
  if(!LOWQ)for(let k=0;k<6;k++){const y=-58+k*7+b;vK(W,[[-20+k*.6,y],[20-k*.6,y+4]],'rgba(130,110,76,.5)',1)}
  vS(W,[[-22,-54+b],[-17,-58+b],[20,-22+b],[14,-18+b]],GD,1,.9);vS(W,[[-20,-52+b],[-18,-54+b],[17,-21+b],[15,-19.5+b]],LA,0);
  /* ปลอกคออูเซค */
  {const cx=0,cy=-70+b,BB=[[31,GD],[27,LA],[23,TQ],[19,CA],[15,GD],[11,LA]];for(const[r,c]of BB){g.beginPath();g.ellipse(cx,cy,r,r*.72,0,0,Math.PI);g.closePath();g.fillStyle=W?'#fff':c;g.fill();g.lineWidth=.8;g.strokeStyle=BV.O;g.stroke()}
    if(!LOWQ)for(let i=0;i<11;i++){const a=.15+i*(Math.PI-.3)/10,x=cx+Math.cos(a)*31,y=cy+Math.sin(a)*31*.72;vD(W,[[x-1.6,y-.5],[x,y+3.6],[x+1.6,y-.5]],GD)}}
  /* แขนซ้าย + ไม้เท้าตะขอ */
  {const ex=-42,ey=-48+b-up*.3,hx=-40,hy=-64+b-up;
    {const x=hx-1,y0=hy+40,y1=hy-34;for(let k=0;k<8;k++){const ya=y0+(y1-y0)*k/8,yb=y0+(y1-y0)*(k+1)/8;vS(W,[[x-1.8,ya],[x+1.8,ya],[x+1.8,yb],[x-1.8,yb]],k%2?LA:GD,1,.7)}
      vLimb(W,[x,y1+1,x,y1-8,x-6,y1-14,x-12,y1-9,x-11,y1-4],GD,3.8,3.2);}
    vLimb(W,[-25,-64+b,ex,ey],BD,11,9);vLimb(W,[ex,ey,hx,hy],BD,9,7);vS(W,[[ex-5,ey-1],[ex+5,ey-1],[ex+4,ey+4],[ex-4,ey+4]],GD,1,.8);vS(W,[[hx-4,hy+3],[hx+4,hy+3],[hx+4,hy+7],[hx-4,hy+7]],GD,1,.8);bvE(W,hx,hy,4.4,4,BD,1)}
  /* แขนขวา + แส้ลูกปัด */
  {const ex=40,ey=-46+b,hx=41,hy=-30+b,tx=46,ty=-52+b;
    vS(W,[[hx-1.6,hy+2],[tx-1.6,ty],[tx+1.6,ty],[hx+1.6,hy+2]],GD,1,.8);
    for(let k=0;k<3;k++){const sw2=Math.sin(T*2.2+k*.9)*3,a0=.25+k*.32;vK(W,[[tx,ty],[tx+Math.sin(a0)*30+sw2,ty+Math.cos(a0)*30]],'#6a4a1a',.8);for(let j=0;j<5;j++){const d=4+j*6.2,nx=tx+Math.sin(a0)*d+sw2*(j/4),ny=ty+Math.cos(a0)*d;g.save();g.translate(nx,ny);g.rotate(-a0);vS(W,[[-1.7,-2.4],['q',0,-3.2,1.7,-2.4],[1.7,2.4],['q',0,3.2,-1.7,2.4]],j%2?LA:GD,1,.6);g.restore()}}
    vLimb(W,[25,-64+b,ex,ey],BD,11,9);vLimb(W,[ex,ey,hx,hy],BD,9,7);vS(W,[[ex-5,ey-1],[ex+5,ey-1],[ex+4,ey+4],[ex-4,ey+4]],GD,1,.8);vS(W,[[hx-4,hy-6],[hx+4,hy-6],[hx+4,hy-2],[hx-4,hy-2]],GD,1,.8);bvE(W,hx,hy,4.4,4,BD,1)}
  /* หัว: เนเมส หน้ากากทอง เคราปลอม งูเห่า */
  {const hy=-94+b;
    vS(W,[[-14,hy-12],['q',0,hy-26,14,hy-12],['q',22,hy+4,24,hy+24],[13,hy+24],['q',12,hy+6,11,hy-2],[-11,hy-2],['q',-12,hy+6,-13,hy+24],[-24,hy+24],['q',-22,hy+4,-14,hy-12]],GD,1,1.3);
    if(!LOWQ)for(let i=0;i<6;i++){const y=hy-6+i*5;for(const s of[-1,1])vK(W,[[s*(12.5+i*.2),y],[s*(19+i*.9),y+1]],LA,2)}
    for(let i=-2;i<=2;i++)vK(W,[[i*3.6,hy-19+Math.abs(i)],[i*5.6,hy-9]],LA,1.8);
    vS(W,[[-10,hy-10],['q',0,hy-14,10,hy-10],['q',12,hy+2,8,hy+10],['q',0,hy+15,-8,hy+10],['q',-12,hy+2,-10,hy-10]],'#f4cc4a',1,1.2);
    for(const s of[-1,1]){vD(W,[[s*1.6,hy-4],['q',s*5.4,hy-7.4,s*10,hy-4.6],['q',s*6,hy-1.6,s*1.6,hy-4]],'#1a1830');vEye(W,s*5.4,hy-4.6,1.9,1.5,'#5af0ff',8);vK(W,[[s*1.6,hy-8],['q',s*6,hy-10.6,s*10.5,hy-8]],LA,1.6);vK(W,[[s*9.6,hy-4.4],[s*12,hy-2.6]],'#1a1830',1)}
    bvAdd(W,()=>{glowAt(-5.4,hy-4.6,7,'90,240,255',.65);glowAt(5.4,hy-4.6,7,'90,240,255',.65)});
    vK(W,[[0,hy-3],['q',1.4,hy+2,0,hy+3]],'#a37a1a',1);vK(W,[[-3,hy+6],['q',0,hy+7,3,hy+6]],'#a3561a',1.2);
    vS(W,[[-2.4,hy+11],[2.4,hy+11],[2,hy+24],[0,hy+27],[-2,hy+24]],LA,1,.9);for(let k=0;k<4;k++)vK(W,[[-2.4,hy+13+k*3.4],[2.4,hy+14+k*3.4]],GD,1);
    vS(W,[[-1.4,hy-12],['q',-4,hy-18,0,hy-22],['q',4,hy-18,1.4,hy-12]],LA,1,.9);vS(W,[[-.9,hy-21],['q',0,hy-25,.9,hy-21]],GD,1,.6);vEye(W,0,hy-18,.8,.8,'#ff3a2a',3);
    for(const s of[-1,1])vS(W,[[s*11,hy-2],[s*13,hy+24],[s*20,hy+24],['q',s*18,hy+6,s*13,hy-6]],GD,1,1)}
  /* แมลงสคารับบินวน */
  for(let i=0;i<3;i++){const a=T*1.1+i*2.094,x=Math.cos(a)*50,y=-50+Math.sin(a)*14+Math.sin(T*4+i)*2;bvE(W,x,y,3.4,2.6,GD,.8);vK(W,[[x,y-2.4],[x,y+2.4]],LA,.8);bvAdd(W,()=>glowAt(x,y,7,'255,220,110',.5))}
  bvAdd(W,()=>{for(let i=0;i<8;i++){const ph=(T*.3+i*.125)%1,x=Math.sin(i*3.3+T*.5)*60,y=20-ph*90;glowAt(x,y,2,'250,220,150',.6*(1-ph))}});
};

/* ================= ดันเจี้ยน · ผู้คุมสุสาน ================= */
BV1['ผู้คุมสุสาน']=(T,W,br,sw,up,cf)=>{const b=br,IR='#4e4862',IRD='#2c2738',IRL='#857ca0',CL='#221a30',BN='#dcd3be',HO='#1c1824',RU='200,140,255',pu=.65+.35*Math.sin(T*2.8);
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv,fl=Math.sin(T*1.5);bvShadow(58,15);
  bvAdd(W,()=>glowAt(0,26,34,'150,90,220',.3));
  const sk=front=>{for(let i=0;i<2;i++){const a=T*.9+i*Math.PI,x=Math.cos(a)*62,y=-58+Math.sin(a)*14+Math.sin(T*3+i)*3;if((Math.sin(a)>=0)!==front)continue;
    bvAdd(W,()=>glowAt(x,y,17,RU,.55));for(let k=0;k<3;k++){const ph=(T*1.4+k*.33+i*.5)%1;bvAdd(W,()=>glowAt(x-Math.cos(a)*ph*10,y-6-ph*16,3*(1-ph)+1,RU,.6*(1-ph)))}
    bvE(W,x,y,6.6,6,BN,1);vS(W,[[x-4,y+3.4],['q',x,y+8.6,x+4,y+3.4]],'#b8ae96',1,.8);bvDE(W,x-2.4,y-.6,1.7,2,'#1a1022');bvDE(W,x+2.4,y-.6,1.7,2,'#1a1022');vEye(W,x-2.4,y-.6,.9,.9,'#e0a8ff',5);vEye(W,x+2.4,y-.6,.9,.9,'#e0a8ff',5)}};
  sk(false);
  /* ผ้าคลุมขาดวิ่น */
  {const s=fl*4;vS(W,[[-28,-74+b],[28,-74+b],['q',46+s,-28,52+s,22],[44+s,29],[36+s,20],[28,30],[18+s,22],[8,31],[-4+s,22],[-14,31],[-24+s,21],[-34,30],[-44+s,22],[-52+s,26],['q',-46+s,-28,-28,-74+b]],CL,1,1.4);
    for(let i=-2;i<=2;i++)vK(W,[[i*10,-68+b],['q',i*15+s,-24,i*19+s*1.2,22]],'rgba(0,0,0,.35)',2.2)}
  /* ขาเกราะหนัก */
  for(const s of[-1,1]){const st=s*wk,kx=s*12+st*3,ky=6,ax=s*12+st*6,ay=26-Math.max(0,st)*3;vLimb(W,[s*10,-12+b,kx,ky],IRD,15,12);vLimb(W,[kx,ky,ax,ay-3],IRD,12,10);
    vS(W,[[kx-6.5,ky+3],[kx+6.5,ky+3],[ax+5.5,ay-4],[ax-5.5,ay-4]],IR,1,1.1);vK(W,[[kx-5.5,ky+9],[kx+5.5,ky+9]],IRL,1);
    vS(W,[[kx-7,ky-1],['q',kx,ky-9,kx+7,ky-1],['q',kx,ky+6,kx-7,ky-1]],IRL,1,1);vS(W,[[kx-2,ky-4],[kx+s*1,ky-13],[kx+2,ky-4]],'#b8b0cc',1,.7);
    vS(W,[[ax-7,ay-4],[ax+7,ay-4],[ax+s*12,ay+2],[ax+s*12,ay+5],[ax-7,ay+5]],IR,1,1.1)}
  /* แผ่นเกราะสะโพก + โซ่ */
  for(const s of[-1,1])for(let k=0;k<2;k++)vS(W,[[s*(4+k*3),-14+k*7+b],[s*(22+k*2),-14+k*7+b],[s*(21+k*2),-4+k*7+b],[s*(5+k*3),-5+k*7+b]],k?IRD:IR,1,1);
  if(!W)for(const[x0,x1,dy]of[[-18,6,14],[-6,18,18]]){for(let i=0;i<=8;i++){const t=i/8,x=x0+(x1-x0)*t,y=-8+b+Math.sin(t*Math.PI)*dy;g.strokeStyle='#8a8296';g.lineWidth=1.1;g.beginPath();g.ellipse(x,y,1.8,i%2?1.2:2,i%2?0:.6,0,7);g.stroke()}}
  /* เกราะอก + อักขระเรือง + ตราหัวกะโหลก */
  vS(W,[[-20,-16+b],['c',-27,-32+b,-31,-50+b,-28,-64+b],['q',0,-75+b,28,-64+b],['c',31,-50+b,27,-32+b,20,-16+b],['q',0,-11+b,-20,-16+b]],IR,1,1.5);
  for(let i=0;i<3;i++){const y=-36+i*7+b;vK(W,[[-18+i,y],['q',0,y+4,18-i,y]],IRD,1.4)}
  {const RL=[[[-16,-58],[-8,-50],[-14,-42]],[[16,-58],[8,-50],[14,-42]],[[0,-46],[0,-38],[-5,-33]],[[0,-38],[5,-33]]];for(const P0 of RL){const P=P0.map(p=>[p[0],p[1]+b]);vK(W,P,'#1a1424',2.6);vK(W,P,W?'#fff':'rgba(215,165,255,'+(.6+.4*pu)+')',1.2)}
    bvAdd(W,()=>{for(const P of RL)for(const p of P)glowAt(p[0],p[1]+b,6,RU,.3*pu)})}
  bvE(W,0,-60+b,6.4,5.8,BN,1);vS(W,[[-3.8,-57+b],['q',0,-52+b,3.8,-57+b]],'#b8ae96',1,.7);bvDE(W,-2.3,-61+b,1.6,1.8,'#1a1022');bvDE(W,2.3,-61+b,1.6,1.8,'#1a1022');
  vS(W,[[-21,-20+b],[21,-20+b],[20,-13+b],[-20,-13+b]],IRD,1,1);bvE(W,0,-16.5+b,4.4,3.8,BN,.9);
  /* แขนซ้าย + ตะเกียงวิญญาณห้อยโซ่ */
  {const ex=-45,ey=-44+b-up*.3,hx=-45,hy=-24+b-up,swg=Math.sin(T*1.8)*.25,lx=hx+Math.sin(swg)*16,ly=hy+Math.cos(swg)*16;
    vLimb(W,[-29,-64+b,ex,ey],IRD,13,11);vLimb(W,[ex,ey,hx,hy],IR,12,10);vS(W,[[ex-6.5,ey+2],[ex+6.5,ey+2],[hx+6,hy-3],[hx-6,hy-3]],IR,1,1);bvE(W,hx,hy,5.6,5,IRL,1);
    vK(W,[[hx,hy+3],[lx,ly-6]],'#8a8296',1.4);
    bvAdd(W,()=>{glowAt(lx,ly+3,22+cf*12,RU,.55);glowAt(lx,ly+3,6,'240,220,255',.9)});
    vS(W,[[lx-5,ly-5],[lx+5,ly-5],[lx+6,ly+10],[lx-6,ly+10]],'rgba(60,40,80,.35)',1,1);vFlame(W,lx,ly+8,6,11,T,3,['#7a3ad0','#b070ff','#e8c8ff']);
    for(const x of[-5,0,5])vK(W,[[lx+x,ly-5],[lx+x*1.2,ly+10]],'#2a2434',1.2);vS(W,[[lx-7,ly-8],[lx+7,ly-8],[lx+5,ly-5],[lx-5,ly-5]],IRD,1,.9);vS(W,[[lx-7,ly+10],[lx+7,ly+10],[lx+6,ly+13],[lx-6,ly+13]],IRD,1,.9)}
  /* แขนขวา + เคียวใหญ่ */
  {const ex=46,ey=-46+b,hx=45,hy=-28+b;
    g.save();g.translate(hx,hy);g.rotate(.14-cf*.95+Math.sin(T*1.3)*.03);
    vS(W,[[-2,58],[2,58],[2.2,-96],[-2.2,-96]],'#2a2230',1,1);for(let k=0;k<5;k++)vK(W,[[-2,-20-k*14],[2,-23-k*14]],'#5a5068',1);
    vS(W,[[-1,-92],['c',-22,-112,-52,-104,-70,-80],['q',-48,-92,-30,-90],['q',-14,-89,-1,-82]],'#c8c0d8',1,1.3);
    vK(W,[[-2,-84],['q',-30,-98,-66,-81]],'rgba(80,70,100,.6)',1.2);
    if(!W){g.save();g.shadowColor='#b070ff';g.shadowBlur=LOWQ?0:10+cf*10;g.strokeStyle='rgba(210,160,255,.95)';g.lineWidth=1.6;g.beginPath();g.moveTo(-3,-93);g.bezierCurveTo(-22,-111,-50,-103,-68,-81);g.stroke();g.restore()}
    bvE(W,0,-90,5.4,5,BN,1);bvDE(W,-1.8,-91,1.3,1.5,'#1a1022');bvDE(W,1.8,-91,1.3,1.5,'#1a1022');vS(W,[[-4,-100],[0,-108],[4,-100]],IRD,1,.8);
    vS(W,[[-3,56],[3,56],[0,64]],IRL,1,.8);g.restore();
    vLimb(W,[29,-64+b,ex,ey],IRD,13,11);vLimb(W,[ex,ey,hx,hy],IR,12,10);vS(W,[[ex-6.5,ey+2],[ex+6.5,ey+2],[hx+6,hy-3],[hx-6,hy-3]],IR,1,1);bvE(W,hx,hy,5.6,5,IRL,1)}
  /* เกราะบ่าใหญ่ซ้อนชั้น + หนาม */
  for(const s of[-1,1]){const px=s*30,py=-70+b;for(let k=0;k<3;k++){const bx=px+s*(k*6-6),by=py-8+k*1.4;vS(W,[[bx-3,by],[bx+s*3,by-14-k*3],[bx+3,by]],'#b8b0cc',1,.8)}
    vS(W,[[px-s*16,py+6],['q',px-s*15,py-10,px+s*3,py-11],['q',px+s*17,py-9,px+s*18,py+7],['q',px+s*2,py+3,px-s*16,py+6]],IR,1,1.3);
    vS(W,[[px-s*13,py+7],['q',px+s*3,py+3,px+s*19,py+10],[px+s*16,py+16],['q',px+s*2,py+12,px-s*11,py+13]],IRD,1,1.1);
    vK(W,[[px-s*12,py-4],['q',px+s*2,py-8,px+s*13,py-3]],'rgba(255,255,255,.16)',1.3);bvAdd(W,()=>glowAt(px+s*3,py+2,8,RU,.25*pu))}
  /* หมวกเกราะเขาโค้ง + ฮู้ด */
  {const hy=-94+b;
    vS(W,[[-19,hy+14],['q',-24,hy-8,-12,hy-20],['q',0,hy-26,12,hy-20],['q',24,hy-8,19,hy+14],['q',0,hy+6,-19,hy+14]],HO,1,1.2);
    for(const s of[-1,1]){const P=[s*11,hy-10,s*23,hy-17,s*30,hy-32,s*26,hy-48];vLimb(W,P,'#221c2c',7,1.6);vK(W,[[s*13,hy-12],['q',s*26,hy-20,s*28,hy-36]],'rgba(200,180,230,.3)',1.2)}
    vS(W,[[-13,hy+12],[-14,hy-6],['q',-12,hy-19,0,hy-20],['q',12,hy-19,14,hy-6],[13,hy+12],['q',0,hy+16,-13,hy+12]],IR,1,1.3);
    vS(W,[[-1.6,hy-20],[1.6,hy-20],[1.4,hy+14],[-1.4,hy+14]],IRL,1,.8);
    vD(W,[[-10,hy-4],[10,hy-4],[10,hy-.6],[1.6,hy-.6],[1.6,hy+9],[-1.6,hy+9],[-1.6,hy-.6],[-10,hy-.6]],'#07040c');
    for(const s of[-1,1]){if(!W){g.save();g.shadowColor='#c890ff';g.shadowBlur=LOWQ?0:12;g.fillStyle='#e0b8ff';g.fillRect(s>0?3:-8,hy-3.4,5,2);g.restore()}}
    bvAdd(W,()=>{glowAt(-5.5,hy-2.4,8,RU,.7);glowAt(5.5,hy-2.4,8,RU,.7)});
    if(!LOWQ)for(let i=0;i<3;i++)for(const s of[-1,1])bvDE(W,s*(5+i*2.4),hy+5+i*1.6,.8,.8,'#1a1424')}
  sk(true);
  bvAdd(W,()=>{for(let i=0;i<6;i++){const ph=(T*.4+i*.167)%1,x=Math.sin(i*4.1+T*.6)*44,y=24-ph*80;glowAt(x,y,3*(1-ph)+1,RU,.5*(1-ph))}});
};

/* ความสูงถึงยอดหัว (ไว้วางแถบเลือด/ป้ายเลเวลเหนือหัวบอสที่ตัวสูงขึ้น) */
const BVH={'ราชากระดูกโบราณ':140,'จอมมารเพลิงนรก':134,'จักรพรรดิน้ำแข็งนิรันดร์':140,'ราชันย์ห้วงลึก':140,'ราชาก็อบลินถุงทอง':124,'ฟาโรห์อมตะ เนเฟอร์ราห์':128,'ผู้คุมสุสาน':140};
function bvBox(m){if(BV1.off||isTw()||m.wb)return;const B=BS(),h=B&&BVH[bvKey(B.n)];if(!h)return;const k=m.mvp?1.3:1,top=30-(30+h+22)*k,bot=30+14*k;gxLayerBox(m.x,m.y+(top+bot)/2,2*112*k,bot-top)}
function bvTop(m){try{if(BV1.off||isTw()||(m&&m.wb))return 82;const B=BS(),h=B&&BVH[bvKey(B.n)];if(!h)return 82;return Math.round(m&&m.mvp?(h+30)*1.3-30:h)}catch(e){return 82}}
