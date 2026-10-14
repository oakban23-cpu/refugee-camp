/* ---------- v369 ยกระดับภาพแมพภาค 7 (34 ที่ราบดาวตก · 35 เหมืองคาร์น · 36 ยอดหอดูดาว) ----------
   รอบ v347–v354 ทำถึงแมพ 33 — ภาค 7 ยังขาด: ลายพื้นชั้นสอง · ของประกอบฉาก · ชั้นหน้าจอ (ของห้อย/ของข้างจอที่เลื่อนเร็วกว่ากล้อง)
   ทุกอย่างวาดลงชิ้นพื้นครั้งเดียว (ไม่กินเฟรม) ยกเว้นชั้นหน้าจอซึ่งใช้ภาพแคช depSpr */
const P7G={R:(s)=>gxRng(s)};
/* ระยะห่างจุด→ชุดเส้น */
function p7gSeg(x,y,P){let d=1e9;for(const L of P)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy||1)));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d}
function p7gFree(x,y,m){/* ไม่ทับของที่ชนได้ที่มีอยู่แล้ว */return trees.every(t=>!(t.r>0)||Math.hypot(t.x-x,t.y-y)>t.r+m)}
function p7gAdd(L,decW){for(const t of L){trees.push(t);if(t.r>0&&!t.nc&&decW)PAL.dec.push({k:'ao',b:[t.x-(t.hw||40)-30,t.y-30,t.x+(t.hw||40)+30,t.y+40],x:t.x,y:t.y,r:t.r,w:t.hw||0})}}

/* =================== 35 เหมืองคาร์น =================== */
{const _kb=kmBuild;kmBuild=window.kmBuild=function(M){_kb(M);const R=P7G.R(35350),out=[];
  const ok=(x,y,m)=>x>200&&x<3000&&y>600&&y<3000&&Math.hypot(x-M.sx,y-M.sy)>M.sr+80+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>150+m)&&Math.hypot(x-KPIT.x,y-KPIT.y)>KPIT.r+110+m
    &&Math.hypot(x-KCAMP.x,y-KCAMP.y)>320+m&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>140+m)&&KMIN.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>150+m)&&KTUN.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>160+m)&&kmSegD(x,y)>80+m&&Math.hypot(x-1880,y-520)>170+m&&p7gFree(x,y,40+m);
  const put=(n,tries,fn)=>{const mine=[];for(let i=0,k=0;i<tries&&k<n;i++){const x=200+R()*2800,y=620+R()*2380,t=fn(x,y,k);if(!t)continue;mine.push(t);trees.push(t);k++}for(const t of mine){trees.splice(trees.indexOf(t),1);out.push(t)}};
  /* เสาหินทรายตั้งโด่ (หลักหินที่ลมกัด) */put(9,500,(x,y,k)=>ok(x,y,40)?{x,y,r:24,k:'kspire',v:k%3,sc:.85+R()*.35,ht:200,hw:40}:null);
  /* กองไม้ค้ำ · ลังแร่ · ถังน้ำ */put(10,500,(x,y,k)=>ok(x,y,0)?{x,y,r:20,k:'kwood',v:k%2,ht:60,hw:44}:null);
  put(10,500,(x,y,k)=>ok(x,y,0)?{x,y,r:18,k:'kbox',v:k%3,ht:56,hw:36}:null);
  /* โครงไม้ค้ำเหมืองที่ตั้งทิ้งไว้ (มีตะเกียงแขวน) */put(6,500,(x,y,k)=>ok(x,y,30)?{x,y,r:16,k:'kframe',v:k%2,ht:150,hw:60}:null);
  /* หินก้อนเพิ่ม (จับกลุ่ม 2–3 ก้อน) */put(18,600,(x,y,k)=>ok(x,y,-20)?{x,y,r:14,k:'kbld',v:(R()*3)|0,sc:.7+R()*.6,ht:70,hw:30}:null);
  /* ของเล็กไม่ชน: จอบ/พลั่วปักดิน · เศษไม้ · กองกรวด */put(22,700,(x,y,k)=>ok(x,y,-50)?{x,y,r:0,nc:1,ns:1,k:'kjunk',v:k%4,ht:40}:null);
  p7gAdd(out,1)}}
{const _kp=kmPaint;kmPaint=window.kmPaint=function(c,ox,oy,S){_kp(c,ox,oy,S);const X1=ox+S,Y1=oy+S;
  const far=(px,py,m)=>kmSegD(px,py)>m&&Math.hypot(px-KPIT.x,py-KPIT.y)>KPIT.r*1.25+m&&Math.hypot(px-KCAMP.x,py-KCAMP.y)>290+m&&px>140&&px<3060&&py>200&&py<3040;
  /* แผ่นหินชั้นพื้น: แผ่นหลายเหลี่ยมสีเข้ม/อ่อนสลับ + ขอบรับแสง + รอยร้าว */
  palGrid(ox,oy,X1,Y1,230,190,1,(x,y,i,j)=>{const h=palH(i,j,3501);if(h<.55)return;const px=x+palH(j,i,3502)*150,py=y+palH(i,j,3503)*120;if(!far(px,py,70))return;
    const n=6+((h*10)|0)%3,rr=46+h*60,pts=[];for(let k=0;k<n;k++){const a=k/n*6.283+palH(i+k,j,3504)*.5,r=rr*(.7+palH(k,i+j,3505)*.4);pts.push([px+Math.cos(a)*r,py+Math.sin(a)*r*.62])}
    const dark=palH(i,j,3506)<.5;c.fillStyle='rgba(20,10,4,.22)';c.beginPath();pts.forEach(([a,b],k)=>k?c.lineTo(a+3,b+4):c.moveTo(a+3,b+4));c.closePath();c.fill();
    c.fillStyle=dark?'rgba(70,42,26,.55)':'rgba(150,104,70,.32)';c.beginPath();pts.forEach(([a,b],k)=>k?c.lineTo(a,b):c.moveTo(a,b));c.closePath();c.fill();
    c.strokeStyle='rgba(210,160,110,.28)';c.lineWidth=2;c.beginPath();for(let k=n-2;k<n+2;k++){const p=pts[(k+n)%n];k===n-2?c.moveTo(p[0],p[1]):c.lineTo(p[0],p[1])}c.stroke();
    c.strokeStyle='rgba(28,14,8,.42)';c.lineWidth=1.3;c.beginPath();c.moveTo(px-rr*.4,py-rr*.1);c.lineTo(px-rr*.05,py+rr*.06);c.lineTo(px+rr*.2,py-rr*.12);c.moveTo(px-rr*.05,py+rr*.06);c.lineTo(px+rr*.02,py+rr*.3);c.stroke()});
  /* เส้นแร่ดาวยาว แตกแขนง (ฝังในหิน) */
  palGrid(ox,oy,X1,Y1,420,360,1,(x,y,i,j)=>{const h=palH(i,j,3511);if(h<.5)return;let px=x+palH(j,i,3512)*300,py=y+palH(i,j,3513)*260;if(!far(px,py,60))return;let a=palH(i,j,3514)*6.283;
    c.lineCap='round';for(let k=0;k<9;k++){const L=18+palH(i+k,j,3515)*22,nx=px+Math.cos(a)*L,ny=py+Math.sin(a)*L*.7;if(!far(nx,ny,40))break;
      c.strokeStyle='rgba(30,60,90,.45)';c.lineWidth=4.5;c.beginPath();c.moveTo(px,py);c.lineTo(nx,ny);c.stroke();c.strokeStyle='rgba(110,200,245,.6)';c.lineWidth=2;c.stroke();c.strokeStyle='rgba(225,248,255,.75)';c.lineWidth=.8;c.stroke();
      if(palH(k,i,3516)>.72){const ba=a+(palH(k,j,3517)>.5?1:-1)*.9,bx=nx+Math.cos(ba)*16,by=ny+Math.sin(ba)*11;c.strokeStyle='rgba(110,200,245,.5)';c.lineWidth=1.5;c.beginPath();c.moveTo(nx,ny);c.lineTo(bx,by);c.stroke();c.fillStyle='#d8f6ff';c.beginPath();c.moveTo(bx,by-4);c.lineTo(bx+2.5,by);c.lineTo(bx,by+3);c.lineTo(bx-2.5,by);c.closePath();c.fill()}
      px=nx;py=ny;a+=(palH(k,i+j,3518)-.5)*1.1}});
  /* เศษไม้ หมอนรางหัก ตะปูสนิม */
  palGrid(ox,oy,X1,Y1,150,130,1,(x,y,i,j)=>{const h=palH(i,j,3521);if(h<.8)return;const px=x+palH(j,i,3522)*100,py=y+palH(i,j,3523)*90;if(!far(px,py,30))return;const a=(palH(i,j,3524)-.5)*2.4,L=18+h*20;
    c.save();c.translate(px,py);c.rotate(a);c.fillStyle='rgba(20,10,4,.3)';c.fillRect(-L/2+2,-3,L,7);c.fillStyle=h>.9?'#5a3a22':'#6e4a2c';c.fillRect(-L/2,-4,L,6);c.fillStyle='rgba(200,150,100,.3)';c.fillRect(-L/2,-4,L,1.4);c.fillStyle='#2a2a30';c.fillRect(-L/2+3,-2,2,2);c.fillRect(L/2-5,-2,2,2);c.restore()});
  /* แอ่งน้ำสนิม (สะท้อนแสงฟ้าจาง ๆ) */
  palGrid(ox,oy,X1,Y1,520,460,1,(x,y,i,j)=>{const h=palH(i,j,3531);if(h<.62)return;const px=x+palH(j,i,3532)*380,py=y+palH(i,j,3533)*320;if(!far(px,py,80))return;const w=34+h*30,hh=w*.42;
    c.fillStyle='rgba(30,14,6,.35)';c.beginPath();c.ellipse(px,py+2,w+6,hh+4,0,0,7);c.fill();const gr=c.createLinearGradient(px,py-hh,px,py+hh);gr.addColorStop(0,'#4a2c1e');gr.addColorStop(1,'#6e3a22');c.fillStyle=gr;c.beginPath();c.ellipse(px,py,w,hh,0,0,7);c.fill();
    c.strokeStyle='rgba(170,200,230,.35)';c.lineWidth=1.4;c.beginPath();c.moveTo(px-w*.5,py-hh*.3);c.lineTo(px+w*.1,py-hh*.42);c.moveTo(px-w*.1,py+hh*.1);c.lineTo(px+w*.45,py);c.stroke();c.strokeStyle='rgba(150,80,40,.6)';c.lineWidth=2;c.beginPath();c.ellipse(px,py,w,hh,0,0,7);c.stroke()});
  /* รอยล้อเกวียนเก่า (คู่ขนาน ไม่อยู่บนราง) */
  palGrid(ox,oy,X1,Y1,600,520,1,(x,y,i,j)=>{const h=palH(i,j,3541);if(h<.55)return;let px=x+palH(j,i,3542)*400,py=y+palH(i,j,3543)*360,a=palH(i,j,3544)*6.283;if(!far(px,py,60))return;c.strokeStyle='rgba(36,18,10,.28)';c.lineWidth=3;
    for(const s of[-9,9]){let qx=px,qy=py,qa=a;c.beginPath();c.moveTo(qx-Math.sin(qa)*s,qy+Math.cos(qa)*s);for(let k=0;k<8;k++){qx+=Math.cos(qa)*30;qy+=Math.sin(qa)*22;qa+=(palH(i+k,j,3545)-.5)*.3;if(!far(qx,qy,30))break;c.lineTo(qx-Math.sin(qa)*s,qy+Math.cos(qa)*s)}c.stroke()}})}}
{const _kg=kmGroundFx;kmGroundFx=window.kmGroundFx=function(){_kg();const T=performance.now()/1000;g.save();g.globalCompositeOperation='lighter';
  for(const t of trees){if(t.k!=='kframe'||!palVis(t.x,t.y-120,60))continue;const sw=Math.sin(T*1.6+t.x)*5;glowAt(t.x+sw,t.y-96,30,'255,190,110',.42+.08*Math.sin(T*7+t.y));glowAt(t.x,t.y,60,'255,170,90',.08)}
  g.restore()}}
Object.assign(PALK,{
 kspire(t,T){const x=t.x,y=t.y,s=t.sc||1,h=170*s,w=34*s;PALSH(x+6,y+5,w*1.5,w*.4,.42);
  const C=[['#7a4a2e','#9a6440','#5a3420'],['#6e4230','#8e5c42','#4e2e1e'],['#845034','#a46e48','#603a24']][t.v];
  g.fillStyle=C[2];g.beginPath();g.moveTo(x-w*1.2,y);g.lineTo(x-w*.9,y-h*.35);g.lineTo(x-w*.55,y-h*.62);g.lineTo(x-w*.75,y-h*.82);g.lineTo(x-w*.3,y-h);g.lineTo(x+w*.45,y-h*.96);g.lineTo(x+w*.7,y-h*.7);g.lineTo(x+w*.5,y-h*.45);g.lineTo(x+w*.95,y-h*.2);g.lineTo(x+w*1.15,y);g.closePath();g.fill();
  g.fillStyle=C[0];g.beginPath();g.moveTo(x-w*1.2,y);g.lineTo(x-w*.9,y-h*.35);g.lineTo(x-w*.55,y-h*.62);g.lineTo(x-w*.75,y-h*.82);g.lineTo(x-w*.3,y-h);g.lineTo(x+w*.05,y-h*.9);g.lineTo(x-w*.1,y-h*.5);g.lineTo(x+w*.1,y-h*.2);g.lineTo(x+w*.2,y);g.closePath();g.fill();
  /* ชั้นหินตะกอน */g.strokeStyle='rgba(30,14,6,.4)';g.lineWidth=2;for(let k=1;k<6;k++){const yy=y-h*k/6.2,ww=w*(1.15-k*.08);g.beginPath();g.moveTo(x-ww,yy+3);g.quadraticCurveTo(x,yy-4,x+ww,yy+2);g.stroke()}
  g.strokeStyle='rgba(230,180,130,.35)';g.lineWidth=2;g.beginPath();g.moveTo(x-w*.3,y-h);g.lineTo(x-w*.75,y-h*.82);g.lineTo(x-w*.55,y-h*.62);g.stroke();
  /* หินหมวกด้านบน */g.fillStyle=C[1];g.beginPath();g.ellipse(x+w*.05,y-h*.98,w*.85,w*.32,-.1,0,7);g.fill();g.fillStyle='rgba(255,220,180,.2)';g.beginPath();g.ellipse(x-w*.15,y-h*1.02,w*.45,w*.12,-.1,0,7);g.fill();
  if(t.v!==1){g.fillStyle='#8ad8ff';for(const[dx,dy,r]of[[-.35,.45,1],[.3,.3,.8]]){const cx=x+w*dx,cy=y-h*dy;g.beginPath();g.moveTo(cx-4*r,cy);g.lineTo(cx,cy-12*r);g.lineTo(cx+4*r,cy);g.closePath();g.fill()}}},
 kwood(t,T){const x=t.x,y=t.y;PALSH(x+2,y+4,40,9,.4);const L=[[-30,0,64],[-28,-11,60],[-24,-22,52],[-14,-33,36]];
  for(const[dx,dy,w]of L){const yy=y+dy;g.fillStyle='#5e3c22';g.fillRect(x+dx,yy-9,w,10);g.fillStyle='rgba(200,150,100,.3)';g.fillRect(x+dx,yy-9,w,2);g.fillStyle='#8a6440';g.beginPath();g.ellipse(x+dx+w,yy-4,4,5,0,0,7);g.fill();g.strokeStyle='#4a2e18';g.lineWidth=.8;g.beginPath();g.ellipse(x+dx+w,yy-4,2,2.5,0,0,7);g.stroke()}
  if(t.v){g.strokeStyle='#3a2414';g.lineWidth=2;g.beginPath();g.moveTo(x-6,y+1);g.lineTo(x-6,y-34);g.moveTo(x+18,y+1);g.lineTo(x+18,y-34);g.stroke()}
  else{g.save();g.translate(x+36,y-2);g.rotate(-.9);g.strokeStyle='#6e4a2a';g.lineWidth=3;g.beginPath();g.moveTo(0,0);g.lineTo(30,0);g.stroke();g.fillStyle='#8a8a92';g.beginPath();g.moveTo(28,-9);g.quadraticCurveTo(36,0,28,9);g.lineTo(32,0);g.closePath();g.fill();g.restore()}},
 kbox(t,T){const x=t.x,y=t.y;PALSH(x+2,y+4,34,8,.4);
  const crate=(cx,cy,s)=>{g.fillStyle='#7a5432';g.fillRect(cx-14*s,cy-26*s,28*s,26*s);g.fillStyle='#5a3a20';g.fillRect(cx-14*s,cy-26*s,28*s,4*s);g.fillRect(cx-14*s,cy-4*s,28*s,4*s);g.strokeStyle='#4a2e18';g.lineWidth=2.4*s;g.beginPath();g.moveTo(cx-12*s,cy-22*s);g.lineTo(cx+12*s,cy-4*s);g.stroke();g.strokeStyle='rgba(220,170,120,.3)';g.lineWidth=1;g.strokeRect(cx-14*s,cy-26*s,28*s,26*s)};
  if(t.v===0){crate(x-12,y,1);crate(x+16,y,.85);crate(x-2,y-26,.8);g.fillStyle='#9ad8ff';g.beginPath();g.moveTo(x-8,y-47);g.lineTo(x-4,y-56);g.lineTo(x,y-47);g.fill()}
  else if(t.v===1){for(const dx of[-14,12]){g.fillStyle='#6a4024';g.beginPath();g.ellipse(x+dx,y-16,12,17,0,0,7);g.fill();g.fillStyle='#4a2c16';g.fillRect(x+dx-12,y-24,24,3);g.fillRect(x+dx-12,y-10,24,3);g.fillStyle='#3a2414';g.beginPath();g.ellipse(x+dx,y-32,10,4,0,0,7);g.fill();g.fillStyle='rgba(120,170,210,.6)';g.beginPath();g.ellipse(x+dx,y-32,7,2.6,0,0,7);g.fill()}}
  else{crate(x,y,1.1);g.strokeStyle='#c8b090';g.lineWidth=1.2;g.beginPath();g.moveTo(x-15,y-29);g.quadraticCurveTo(x,y-22,x+15,y-29);g.stroke();g.fillStyle='#e8d8b0';g.fillRect(x-8,y-20,14,9);g.fillStyle='#6a4a2a';g.fillRect(x-6,y-18,10,1.2);g.fillRect(x-6,y-15,7,1.2)}},
 kframe(t,T){const x=t.x,y=t.y,s=t.v?1:.9;PALSH(x,y+4,52*s,10,.4);g.lineCap='round';
  for(const sx of[-1,1]){g.strokeStyle='#4a2e16';g.lineWidth=9*s;g.beginPath();g.moveTo(x+sx*40*s,y);g.lineTo(x+sx*34*s,y-120*s);g.stroke();g.strokeStyle='rgba(200,150,100,.3)';g.lineWidth=2;g.beginPath();g.moveTo(x+sx*40*s-3,y);g.lineTo(x+sx*34*s-3,y-120*s);g.stroke()}
  g.strokeStyle='#5a3a1e';g.lineWidth=10*s;g.beginPath();g.moveTo(x-50*s,y-122*s);g.lineTo(x+50*s,y-122*s);g.stroke();g.lineWidth=5*s;g.beginPath();g.moveTo(x-34*s,y-96*s);g.lineTo(x-14*s,y-118*s);g.moveTo(x+34*s,y-96*s);g.lineTo(x+14*s,y-118*s);g.stroke();
  const sw=Math.sin(T*1.6+t.x)*5;g.strokeStyle='#2a1a10';g.lineWidth=1.2;g.beginPath();g.moveTo(x,y-118*s);g.lineTo(x+sw,y-102);g.stroke();g.fillStyle='#3a2a1a';g.fillRect(x+sw-5,y-102,10,14);g.fillStyle='#ffd27a';g.fillRect(x+sw-3,y-99,6,8);
  if(t.v){g.fillStyle='rgba(30,16,8,.6)';g.beginPath();g.ellipse(x,y-2,26,7,0,0,7);g.fill()}},
 kjunk(t,T){const x=t.x,y=t.y;if(t.v===0){/* จอบปักดิน */g.fillStyle='rgba(20,10,4,.3)';g.beginPath();g.ellipse(x+3,y+1,12,4,0,0,7);g.fill();g.strokeStyle='#6e4a2a';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x+8,y-34);g.stroke();g.fillStyle='#8a8a92';g.beginPath();g.moveTo(x-8,y-36);g.quadraticCurveTo(x+8,y-44,x+22,y-30);g.lineTo(x+8,y-36);g.closePath();g.fill()}
  else if(t.v===1){/* พลั่ว */g.fillStyle='rgba(20,10,4,.3)';g.beginPath();g.ellipse(x+2,y+1,10,3,0,0,7);g.fill();g.strokeStyle='#6e4a2a';g.lineWidth=3;g.beginPath();g.moveTo(x,y-8);g.lineTo(x-4,y-40);g.stroke();g.fillStyle='#7a7a84';g.beginPath();g.moveTo(x-6,y-8);g.lineTo(x+6,y-8);g.lineTo(x+4,y+2);g.lineTo(x-4,y+2);g.closePath();g.fill();g.fillStyle='#4a2e18';g.fillRect(x-9,y-44,10,3)}
  else if(t.v===2){/* กองกรวดแร่ */for(const[dx,dy,r,c]of[[-8,0,6,'#6a4430'],[4,1,7,'#5a3a28'],[-2,-6,5,'#7a5038'],[9,-4,4,'#9ad8ff']]){g.fillStyle=c;g.beginPath();g.ellipse(x+dx,y+dy,r,r*.7,0,0,7);g.fill()}}
  else{/* ตะเกียงล้ม */g.fillStyle='rgba(20,10,4,.3)';g.beginPath();g.ellipse(x,y+2,12,3,0,0,7);g.fill();g.save();g.translate(x,y-4);g.rotate(1.3);g.fillStyle='#3a2a1a';g.fillRect(-5,-7,10,14);g.fillStyle='rgba(255,210,120,.5)';g.fillRect(-3,-5,6,10);g.restore()}}});

/* =================== 36 ยอดหอดูดาว =================== */
{const _ob=obBuild;obBuild=window.obBuild=function(M){_ob(M);const R=P7G.R(36360),out=[];
  const ok=(x,y,m)=>x>200&&x<3000&&y>420&&y<2860&&Math.hypot(x-M.sx,y-M.sy)>M.sr+70+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>150+m)&&Math.hypot(x-OBDOME.x,y-OBDOME.y)>360+m&&Math.hypot(x-OBL.x,y-OBL.y)>400+m&&Math.hypot(x-OBS.x,y-OBS.y)>150+m
    &&OBM.every(([mx,my])=>Math.hypot(x-mx,y-my-30)>170+m)&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>130+m)&&p7gSeg(x,y,OBPATH)>100+m&&p7gSeg(x,y,OBFOOT)>75+m&&!(y>2560&&Math.abs(x-1600)<480)&&Math.hypot(x-1330,y-1040)>130+m&&Math.hypot(x-2350,y-2450)>240+m&&p7gFree(x,y,40+m);
  const put=(n,tries,fn)=>{const mine=[];for(let i=0,k=0;i<tries&&k<n;i++){const x=200+R()*2800,y=420+R()*2440,t=fn(x,y,k);if(!t)continue;mine.push(t);trees.push(t);k++}for(const t of mine){trees.splice(trees.indexOf(t),1);out.push(t)}};
  put(9,500,(x,y,k)=>ok(x,y,20)?{x,y,r:16,k:'obcairn',v:k%3,ht:90,hw:34}:null);
  put(6,500,(x,y,k)=>ok(x,y,30)?{x,y,r:16,k:'obinst',v:k%2,ht:110,hw:40}:null);
  put(6,500,(x,y,k)=>ok(x,y,0)?{x,y,r:18,k:'obbox',v:k%2,ht:50,hw:38}:null);
  put(14,600,(x,y,k)=>ok(x,y,-10)?{x,y,r:20,k:'obrock',v:(R()*3)|0,sc:.7+R()*.6,ht:60,hw:40}:null);
  put(26,800,(x,y,k)=>ok(x,y,-40)?{x,y,r:0,nc:1,ns:1,k:'obbush',v:k%3,ht:40}:null);
  p7gAdd(out,1)}}
{const _op=obPaint;obPaint=window.obPaint=function(c,ox,oy,S){_op(c,ox,oy,S);const X1=ox+S,Y1=oy+S;
  const far=(px,py,m)=>px>170&&px<3030&&py>230&&py<3030&&p7gSeg(px,py,OBPATH)>45+m&&p7gSeg(px,py,OBFOOT)>20+m&&Math.hypot(px-OBL.x,py-OBL.y)>330+m&&Math.hypot(px-1600,py-706)>(m+300)&&!(py>2780&&Math.abs(px-1600)<260)&&Math.hypot(px-2350,py-2450)>200+m&&OBM.every(([mx,my])=>Math.hypot(px-mx,py-my-OBPL)>70+m);
  /* แอ่งเงาฟ้า (ทำให้หิมะมีมิติ ไม่ขาวแบน) */
  palGrid(ox,oy,X1,Y1,300,250,1,(x,y,i,j)=>{const h=palH(i,j,3601);if(h<.45)return;const px=x+palH(j,i,3602)*220,py=y+palH(i,j,3603)*180;if(!far(px,py,0))return;const r=70+h*90;
    const gr=c.createRadialGradient(px+r*.15,py+r*.1,4,px,py,r);gr.addColorStop(0,'rgba(96,120,170,.2)');gr.addColorStop(.6,'rgba(110,135,185,.1)');gr.addColorStop(1,'rgba(120,140,190,0)');c.fillStyle=gr;c.beginPath();c.ellipse(px,py,r,r*.55,0,0,7);c.fill();
    c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2.4;c.beginPath();c.ellipse(px-r*.05,py-r*.08,r*.82,r*.42,0,Math.PI*1.12,Math.PI*1.75);c.stroke()});
  /* ลานน้ำแข็งบาง ๆ + รอยร้าว */
  palGrid(ox,oy,X1,Y1,460,400,1,(x,y,i,j)=>{const h=palH(i,j,3611);if(h<.6)return;const px=x+palH(j,i,3612)*320,py=y+palH(i,j,3613)*280;if(!far(px,py,60))return;const w=50+h*50,hh=w*.5;
    c.fillStyle='rgba(80,110,150,.18)';c.beginPath();c.ellipse(px+3,py+4,w+4,hh+3,0,0,7);c.fill();const gr=c.createLinearGradient(px-w,py-hh,px+w,py+hh);gr.addColorStop(0,'rgba(190,226,246,.95)');gr.addColorStop(.55,'rgba(150,196,226,.95)');gr.addColorStop(1,'rgba(184,220,242,.95)');c.fillStyle=gr;c.beginPath();c.ellipse(px,py,w,hh,0,0,7);c.fill();
    c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=1.1;c.beginPath();c.moveTo(px-w*.6,py-hh*.1);c.lineTo(px-w*.15,py+hh*.12);c.lineTo(px+w*.2,py-hh*.25);c.lineTo(px+w*.6,py-hh*.05);c.moveTo(px-w*.15,py+hh*.12);c.lineTo(px,py+hh*.6);c.stroke();
    c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=4;c.beginPath();c.moveTo(px-w*.5,py-hh*.55);c.lineTo(px-w*.15,py-hh*.7);c.stroke();c.strokeStyle='#f4f8fc';c.lineWidth=5;c.beginPath();c.ellipse(px,py,w,hh,0,0,7);c.stroke()});
  /* หญ้าแห้งโผล่พ้นหิมะ */
  palGrid(ox,oy,X1,Y1,70,60,1,(x,y,i,j)=>{const h=palH(i,j,3621);if(h<.84)return;const px=x+palH(j,i,3622)*60,py=y+palH(i,j,3623)*50;if(!far(px,py,10))return;
    c.strokeStyle=h>.93?'rgba(120,96,70,.75)':'rgba(84,96,120,.7)';c.lineWidth=1.2;c.lineCap='round';for(let k=0;k<5;k++){const a=-1.57+(k-2)*.28+(palH(k,i,3624)-.5)*.2,L=6+palH(k,j,3625)*8;c.beginPath();c.moveTo(px+(k-2)*1.5,py);c.quadraticCurveTo(px+(k-2)*1.5+Math.cos(a)*L*.4,py+Math.sin(a)*L*.6,px+(k-2)*1.5+Math.cos(a)*L,py+Math.sin(a)*L);c.stroke()}
    c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.ellipse(px,py+1,7,2.4,0,0,7);c.fill()});
  /* รอยเท้าสัตว์ (กระต่ายหิมะ) เดินเป็นแนวโค้ง */
  palGrid(ox,oy,X1,Y1,700,620,1,(x,y,i,j)=>{const h=palH(i,j,3631);if(h<.45)return;let px=x+palH(j,i,3632)*500,py=y+palH(i,j,3633)*440,a=palH(i,j,3634)*6.283;c.fillStyle='rgba(110,130,170,.45)';
    for(let k=0;k<16;k++){px+=Math.cos(a)*22;py+=Math.sin(a)*15;a+=(palH(i+k,j,3635)-.5)*.35;if(!far(px,py,0))continue;const nx=-Math.sin(a),ny=Math.cos(a),s=k%2?4:-4;c.beginPath();c.ellipse(px+nx*s,py+ny*s,2.6,1.8,a,0,7);c.fill();c.beginPath();c.ellipse(px+nx*s+Math.cos(a)*7,py+ny*s+Math.sin(a)*5,1.6,1.2,a,0,7);c.fill()}})}}
Object.assign(PALK,{
 obcairn(t,T){const x=t.x,y=t.y;PALSH(x+2,y+4,26,7,.3);const S=[[0,0,22,9,'#6e7a90'],[2,-12,17,8,'#7c889c'],[-1,-22,13,7,'#6a768c'],[1,-31,9,6,'#8692a8']];if(t.v===2)S.push([0,-39,6,4,'#7c889c']);
  for(const[dx,dy,rx,ry,c]of S){g.fillStyle=c;g.beginPath();g.ellipse(x+dx,y+dy,rx,ry,0,0,7);g.fill();g.fillStyle='rgba(244,248,252,.92)';g.beginPath();g.ellipse(x+dx-rx*.15,y+dy-ry*.45,rx*.75,ry*.4,0,0,7);g.fill()}
  if(t.v!==1){const top=y-(t.v===2?43:36),w=Math.sin(T*3+x)*3;g.strokeStyle='#5a4a3a';g.lineWidth=2;g.beginPath();g.moveTo(x,top);g.lineTo(x,top-30);g.stroke();
   const cols=['#c8463a','#e8c060','#4a7ad0'];for(let k=0;k<3;k++){g.fillStyle=cols[k];g.beginPath();g.moveTo(x,top-28+k*7);g.quadraticCurveTo(x+10,top-30+k*7+w,x+20+w,top-26+k*7+w*1.4);g.lineTo(x+18+w,top-22+k*7+w*1.4);g.quadraticCurveTo(x+9,top-24+k*7+w,x,top-23+k*7);g.closePath();g.fill()}}},
 obinst(t,T){const x=t.x,y=t.y;PALSH(x,y+4,30,8,.3);g.strokeStyle='#5a4428';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(x,y-46);g.lineTo(x-20,y);g.moveTo(x,y-46);g.lineTo(x+20,y);g.moveTo(x,y-46);g.lineTo(x+4,y+4);g.stroke();
  if(t.v===0){/* กล้องดูดาวเก่า */g.save();g.translate(x,y-50);g.rotate(-.55);const gr=g.createLinearGradient(0,-7,0,7);gr.addColorStop(0,'#f0c868');gr.addColorStop(.5,'#c8963a');gr.addColorStop(1,'#7a5420');g.fillStyle=gr;g.beginPath();g.moveTo(-26,-5);g.lineTo(30,-8);g.lineTo(30,8);g.lineTo(-26,5);g.closePath();g.fill();g.fillStyle='#5a3c16';g.fillRect(-4,-8,6,16);g.fillRect(24,-9,4,18);g.fillStyle='rgba(180,220,255,.8)';g.beginPath();g.ellipse(30,0,2.5,7,0,0,7);g.fill();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(4,-7,16,3,0,0,7);g.fill();g.restore()}
  else{/* วงแหวนวัดดาว (อาร์มิลลารี) เล็ก */const cy=y-62,a=T*.3+x;g.strokeStyle='#c8963a';g.lineWidth=2.4;g.beginPath();g.arc(x,cy,16,0,7);g.stroke();g.lineWidth=1.8;g.beginPath();g.ellipse(x,cy,16,Math.abs(Math.cos(a))*16+1,0,0,7);g.stroke();g.beginPath();g.ellipse(x,cy,Math.abs(Math.sin(a*.7))*16+1,16,0,0,7);g.stroke();g.fillStyle='#ffe8a0';g.beginPath();g.arc(x,cy,3,0,7);g.fill();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x-3,cy-16,8,2.6,0,0,7);g.fill()}},
 obbox(t,T){const x=t.x,y=t.y;PALSH(x+2,y+4,34,8,.3);const crate=(cx,cy,s)=>{g.fillStyle='#7a5a3c';g.fillRect(cx-14*s,cy-24*s,28*s,24*s);g.strokeStyle='#4a3420';g.lineWidth=2*s;g.strokeRect(cx-14*s,cy-24*s,28*s,24*s);g.beginPath();g.moveTo(cx-12*s,cy-22*s);g.lineTo(cx+12*s,cy-2*s);g.stroke();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(cx,cy-24*s,16*s,4.5*s,0,0,7);g.fill()};
  crate(x-12,y,1);crate(x+14,y+2,.85);if(t.v){g.fillStyle='#8a6a40';g.beginPath();g.ellipse(x+2,y-34,9,12,0,0,7);g.fill();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x+2,y-44,8,3,0,0,7);g.fill()}
  else{g.strokeStyle='#c8963a';g.lineWidth=1.6;g.beginPath();g.arc(x-12,y-34,8,Math.PI,0);g.stroke();g.fillStyle='#c8963a';g.fillRect(x-14,y-34,4,8)}},
 obbush(t,T){const x=t.x,y=t.y,sw=Math.sin(T*1.8+x)*1.5;g.fillStyle='rgba(90,110,150,.2)';g.beginPath();g.ellipse(x+2,y+1,14,4,0,0,7);g.fill();g.strokeStyle=t.v===1?'#6e5a44':'#5e6a80';g.lineWidth=1.6;g.lineCap='round';
  for(let k=0;k<6;k++){const a=-1.57+(k-2.5)*.32,L=14+(k*7%5)*3;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*L+sw,y+Math.sin(a)*L);g.stroke();g.beginPath();g.moveTo(x+Math.cos(a)*L*.6+sw*.6,y+Math.sin(a)*L*.6);g.lineTo(x+Math.cos(a+.6)*L*.85+sw,y+Math.sin(a+.6)*L*.8);g.stroke()}
  g.fillStyle='rgba(250,252,255,.95)';for(let k=0;k<3;k++){g.beginPath();g.ellipse(x+(k-1)*7+sw,y-10-k%2*5,3.5,1.6,0,0,7);g.fill()}g.beginPath();g.ellipse(x,y+1,10,3,0,0,7);g.fill()}});

/* =================== 34 ที่ราบดาวตก =================== */
{const _sb=sfBuild;sfBuild=window.sfBuild=function(M){_sb(M);const R=P7G.R(34340),out=[];
  const ok=(x,y,m)=>x>200&&x<3000&&y>640&&y<3000&&Math.hypot(x-M.sx,y-M.sy)>M.sr+70+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>150+m)&&SFCR.every(([cx,cy,r])=>Math.hypot(x-cx,y-cy)>r+30+m)&&SFMET.every(([mx,my,r])=>Math.hypot(x-mx,y-my)>r+70+m)
    &&Math.hypot(x-SFCAMP.x,y-SFCAMP.y)>350+m&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>140+m)&&SFSH.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>150+m)&&sfSegD(x,y)>90+m&&p7gFree(x,y,40+m);
  for(let i=0,k=0;i<600&&k<16;i++){const x=200+R()*2800,y=640+R()*2360;if(!ok(x,y,0))continue;const t={x,y,r:14,k:'sfdeb',v:k%3,sc:.75+R()*.5,ht:50,hw:30};out.push(t);trees.push(t);k++}
  for(let i=0,k=0;i<600&&k<20;i++){const x=200+R()*2800,y=640+R()*2360;if(!ok(x,y,-40))continue;const t={x,y,r:0,nc:1,ns:1,k:'sfflw',v:k%3,ht:30};out.push(t);trees.push(t);k++}
  for(const t of out)trees.splice(trees.indexOf(t),1);p7gAdd(out,1)}}
{const _sp=sfPaint;sfPaint=window.sfPaint=function(c,ox,oy,S){_sp(c,ox,oy,S);const X1=ox+S,Y1=oy+S;
  const far=(px,py,m)=>sfSegD(px,py)>50+m&&SFCR.every(([cx,cy,r])=>Math.hypot(px-cx,py-cy)>r+20+m)&&Math.hypot(px-SFCAMP.x,py-SFCAMP.y)>300+m&&px>140&&px<3060&&py>560&&py<3060;
  /* รอยไหม้ + พื้นที่หลอมเป็นแก้ว (ดาวตกลูกเล็ก) */
  palGrid(ox,oy,X1,Y1,380,330,1,(x,y,i,j)=>{const h=palH(i,j,3401);if(h<.5)return;const px=x+palH(j,i,3402)*260,py=y+palH(i,j,3403)*220;if(!far(px,py,40))return;const r=38+h*40;
    const gr=c.createRadialGradient(px,py,4,px,py,r*1.5);gr.addColorStop(0,'rgba(4,6,20,.55)');gr.addColorStop(.5,'rgba(10,12,34,.3)');gr.addColorStop(1,'rgba(10,14,40,0)');c.fillStyle=gr;c.beginPath();c.ellipse(px,py,r*1.5,r*.95,0,0,7);c.fill();
    c.strokeStyle='rgba(6,8,24,.5)';c.lineWidth=1.6;for(let k=0;k<7;k++){const a=k/7*6.283+palH(k,i,3404),L=r*(1+palH(k,j,3405)*.7);c.beginPath();c.moveTo(px+Math.cos(a)*r*.4,py+Math.sin(a)*r*.26);c.lineTo(px+Math.cos(a)*L,py+Math.sin(a)*L*.62);c.stroke()}
    const g2=c.createLinearGradient(px-r*.5,py-r*.3,px+r*.5,py+r*.3);g2.addColorStop(0,'rgba(120,150,230,.55)');g2.addColorStop(.5,'rgba(40,60,140,.6)');g2.addColorStop(1,'rgba(150,120,230,.5)');c.fillStyle=g2;c.beginPath();c.ellipse(px,py,r*.45,r*.26,0,0,7);c.fill();
    c.strokeStyle='rgba(230,240,255,.65)';c.lineWidth=1.4;c.beginPath();c.ellipse(px-r*.06,py-r*.05,r*.3,r*.14,0,Math.PI*1.1,Math.PI*1.7);c.stroke()});
  /* ดอกไม้ดาว (บานเฉพาะที่ราบนี้) เป็นหย่อม */
  palGrid(ox,oy,X1,Y1,240,210,1,(x,y,i,j)=>{const h=palH(i,j,3411);if(h<.62)return;const px=x+palH(j,i,3412)*180,py=y+palH(i,j,3413)*160;if(!far(px,py,10))return;const col=['#c8d8ff','#e8c8ff','#a8f0ff'][(h*30|0)%3];
    for(let k=0;k<9;k++){const qx=px+(palH(k,i,3414)-.5)*70,qy=py+(palH(k,j,3415)-.5)*40;if(!far(qx,qy,0))continue;c.strokeStyle='rgba(60,90,110,.7)';c.lineWidth=1;c.beginPath();c.moveTo(qx,qy+6);c.lineTo(qx,qy);c.stroke();c.fillStyle=col;for(let p=0;p<5;p++){const a=p/5*6.283;c.beginPath();c.ellipse(qx+Math.cos(a)*2.4,qy+Math.sin(a)*2,1.8,1.1,a,0,7);c.fill()}c.fillStyle='#fff8d8';c.beginPath();c.arc(qx,qy,1.1,0,7);c.fill()}})}}
Object.assign(PALK,{
 sfdeb(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x+2,y+3,22*s,6*s,.45);g.fillStyle=['#2a2a3e','#323046','#28283a'][t.v];g.beginPath();g.moveTo(x-20*s,y);g.lineTo(x-16*s,y-14*s);g.lineTo(x-4*s,y-22*s);g.lineTo(x+12*s,y-18*s);g.lineTo(x+20*s,y-4*s);g.lineTo(x+14*s,y+2*s);g.closePath();g.fill();
  g.fillStyle='rgba(160,170,220,.25)';g.beginPath();g.moveTo(x-16*s,y-14*s);g.lineTo(x-4*s,y-22*s);g.lineTo(x+2*s,y-12*s);g.lineTo(x-10*s,y-8*s);g.closePath();g.fill();
  const q=.6+.4*Math.sin(T*2+x);g.strokeStyle='rgba(255,'+(150+60*q|0)+',90,'+(.7*q+.2)+')';g.lineWidth=1.6*s;g.beginPath();g.moveTo(x-12*s,y-6*s);g.lineTo(x-2*s,y-12*s);g.lineTo(x+4*s,y-6*s);g.lineTo(x+12*s,y-10*s);g.moveTo(x-2*s,y-12*s);g.lineTo(x-4*s,y-19*s);g.stroke();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10*s,16*s,'255,150,80',.12*q);g.restore()},
 sfflw(t,T){const x=t.x,y=t.y,col=['170,200,255','220,180,255','160,240,255'][t.v],q=.5+.5*Math.sin(T*1.4+x*.01);g.strokeStyle='rgba(70,110,130,.8)';g.lineWidth=1.2;for(const[dx,h]of[[-4,12],[0,16],[5,10]]){g.beginPath();g.moveTo(x+dx,y);g.quadraticCurveTo(x+dx+2,y-h*.5,x+dx,y-h);g.stroke();g.fillStyle='rgb('+col+')';for(let p=0;p<5;p++){const a=p/5*6.283+T*.2;g.beginPath();g.ellipse(x+dx+Math.cos(a)*2.6,y-h+Math.sin(a)*2.2,2,1.2,a,0,7);g.fill()}}
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-13,10,col,.18+.2*q);g.restore()}});

/* =================== ชั้นหน้าจอ (ของห้อย/ของข้างจอ) =================== */
function p7gRockSpr(v){return depSpr('p7gr'+v,170,380,(x,w,h)=>{const R=depRng(7700+v);const pts=[[0,0]];let px=60+R()*30;for(let y=0;y<=h;y+=28){px=Math.max(40,Math.min(150,px+(R()-.5)*44));pts.push([px,y])}pts.push([0,h]);
  const gr=x.createLinearGradient(0,0,150,0);gr.addColorStop(0,'#1e0f08');gr.addColorStop(.7,'#4a2c1a');gr.addColorStop(1,'#6a4028');x.fillStyle=gr;x.beginPath();pts.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fill();
  x.strokeStyle='rgba(30,14,6,.55)';x.lineWidth=3;for(let y=30;y<h;y+=46+R()*20){x.beginPath();x.moveTo(0,y);x.quadraticCurveTo(50,y-8,pts[Math.min(pts.length-2,1+(y/28|0))][0]-4,y+4);x.stroke()}
  x.strokeStyle='rgba(220,160,110,.45)';x.lineWidth=3;x.beginPath();for(let i=1;i<pts.length-1;i++){const[a,b]=pts[i];i===1?x.moveTo(a-2,b):x.lineTo(a-2,b)}x.stroke();
  for(let k=0;k<3;k++){const y=60+R()*(h-120),bx=pts[Math.min(pts.length-2,1+(y/28|0))][0]-10;x.fillStyle='#7ad0f8';x.beginPath();x.moveTo(bx-6,y);x.lineTo(bx+8,y-16);x.lineTo(bx+4,y+2);x.closePath();x.fill();x.fillStyle='rgba(230,250,255,.8)';x.beginPath();x.moveTo(bx-6,y);x.lineTo(bx+8,y-16);x.lineTo(bx,y-4);x.closePath();x.fill()}})}
function p7gRopeSpr(v){return depSpr('p7gp'+v,90,300,(x,w,h)=>{const L=150+v*60;x.strokeStyle='#6a5236';x.lineWidth=3;x.beginPath();x.moveTo(30,0);x.lineTo(30,L);x.moveTo(52,0);x.lineTo(52,L-30);x.stroke();x.strokeStyle='rgba(30,18,10,.6)';x.lineWidth=1;for(let y=4;y<L;y+=6){x.beginPath();x.moveTo(28,y);x.lineTo(32,y+3);x.stroke()}
  x.fillStyle='#3a2414';x.beginPath();x.arc(41,L-34,15,0,7);x.fill();x.strokeStyle='#8a6a40';x.lineWidth=2;x.beginPath();x.arc(41,L-34,10,0,7);x.stroke();x.fillStyle='#8a8a92';x.beginPath();x.arc(41,L-34,3,0,7);x.fill();
  x.strokeStyle='#5a5a62';x.lineWidth=4;x.beginPath();x.arc(30,L+8,9,-1.4,2.6);x.stroke()})}
function p7gBoughSpr(v){return depSpr('p7gb'+v,120,230,(x,w,h)=>{const R=depRng(7800+v);x.lineCap='round';const P=[];for(let k=0;k<=12;k++){const u=k/12;P.push([60+Math.sin(u*2.2+v)*18*(u),u*(170+v*30)])}
  x.strokeStyle='#2a2016';x.lineWidth=6;x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.stroke();
  for(let k=1;k<P.length;k++){const[bx,by]=P[k],L=(30-k*1.4)+R()*8;for(const s of[-1,1]){x.strokeStyle=k%2?'#1c3832':'#24443c';x.lineWidth=2.6;for(let n=0;n<5;n++){const a=1.57+s*(.5+n*.17)+(R()-.5)*.15;x.beginPath();x.moveTo(bx,by);x.lineTo(bx+Math.cos(a)*L,by+Math.sin(a)*L*.7);x.stroke()}}
    if(k%2===0){x.fillStyle='rgba(248,252,255,.96)';x.beginPath();x.ellipse(bx+(R()-.5)*6,by-2,L*.7,4.5,(R()-.5)*.3,Math.PI,0);x.fill();x.beginPath();x.ellipse(bx,by-2,L*.7,2.4,0,0,Math.PI);x.fill()}}
  for(let k=3;k<P.length;k+=3){const[bx,by]=P[k];for(const s of[-1,1]){const ix=bx+s*(10+R()*8),iy=by+6;x.fillStyle='rgba(215,236,255,.9)';x.beginPath();x.moveTo(ix-2,iy);x.lineTo(ix,iy+10+R()*12);x.lineTo(ix+2,iy);x.closePath();x.fill()}}})}
function p7gCrySpr(v){return depSpr('p7gc'+v,140,260,(x,w,h)=>{const R=depRng(7900+v);x.fillStyle='#0c1030';x.beginPath();x.moveTo(0,h);x.lineTo(0,h*.25);x.quadraticCurveTo(40,h*.4,58,h*.7);x.lineTo(70,h);x.closePath();x.fill();
  for(let k=0;k<7;k++){const bx=8+R()*60,by=h*.45+R()*h*.5,L=40+R()*80,a=-1.1-R()*.6,ww=7+R()*7,tx=bx+Math.cos(a)*L,ty=by+Math.sin(a)*L;const gr=x.createLinearGradient(bx,by,tx,ty);gr.addColorStop(0,'#2a4aa0');gr.addColorStop(1,'#a8d8ff');x.fillStyle=gr;
    x.beginPath();x.moveTo(bx-ww,by);x.lineTo(tx,ty);x.lineTo(bx+ww,by);x.closePath();x.fill();x.fillStyle='rgba(240,250,255,.6)';x.beginPath();x.moveTo(bx-ww*.2,by);x.lineTo(tx,ty);x.lineTo(bx+ww*.6,by);x.closePath();x.fill()}})}
function p7gScreen(th,dgn){if(!(dgn||depOn())||!me.cls)return;const t=performance.now()/1000,z=ZM.z,cx=CAMF.x,cy=CAMF.y,Hs=H,Q=LOWQ,wrap=(v,s)=>((v%s)+s)%s;let nt=0;try{nt=isNight()?1:0}catch(e){}
  g.save();g.setTransform(DPR,0,0,DPR,0,0);
  if(th==='karn'){/* เชือกรอกห้อยจากด้านบน + ตะเกียงแกว่ง */for(let s=0;s<2;s++){const px=hudTX(s,90),sw=Math.sin(t*.8+s*2)*.04,yo=-wrap(cy*1.5+s*110,90);g.save();g.translate(px+45,yo);g.rotate(sw);g.globalAlpha=.95;g.drawImage(p7gRopeSpr(s),-45,0,90,300);
      const L=150+s*60,lx=-15,ly=L+18;g.globalAlpha=1;g.fillStyle='#2a1a10';g.fillRect(lx-6,ly,12,16);g.fillStyle='#ffd27a';g.fillRect(lx-4,ly+3,8,9);g.globalCompositeOperation='lighter';glowAt(lx,ly+8,36,'255,180,90',.35+.08*Math.sin(t*7+s));g.globalCompositeOperation='source-over';g.restore()}
    /* หน้าผาหินข้างจอ */for(let i=0;i<(Q?1:2);i++){const side=i%2,y=wrap(i*330+120-cy*1.3,Hs+520)-260+FGO.y;g.save();if(side){g.translate(SW0,0);g.scale(-1,1)}g.globalAlpha=.97;g.drawImage(p7gRockSpr(i),-58,y,170,380);g.restore()}
    /* ฝุ่นในแสงอุ่น + กรวดร่วง */g.globalCompositeOperation='lighter';for(let i=0;i<(Q?6:16);i++){const x=wrap(i*89-cx*1.3+Math.sin(t*.5+i)*14,SW0+20)-10,y=wrap(i*131-cy*1.3-t*(6+i%3*3),Hs+20)-10;glowAt(x,y,2.2+i%2,'255,200,140',.25+.25*Math.sin(t*2+i*1.3))}g.globalCompositeOperation='source-over';
    if(!Q){g.fillStyle='rgba(60,36,20,.7)';for(let i=0;i<5;i++){const per=3+i*.7,q=((t+i*1.3)%per)/per;if(q>.35)continue;const x=wrap(i*173+40-cx*.9,SW0),y=q/.35*Hs*.8;g.fillRect(x,y,2,3);g.fillRect(x+5,y-8,1.5,2)}}}
  if(th==='summit'){/* ปลายกิ่งสนหิมะห้อยลงมา (ช่องระหว่างปุ่มเมนูกับมินิแมพ) */for(let s=0;s<2;s++){const px=hudTX(s,88),yo=-wrap(cy*1.5+s*120,70)-10;g.save();g.translate(px+44,yo);g.rotate(Math.sin(t*.7+s*1.7)*.03);g.globalAlpha=.94;g.drawImage(p7gBoughSpr(s),-44,-40,88,168);g.restore()}
    /* ลมหิมะเป็นสาย */if(!Q){g.strokeStyle='rgba(255,255,255,.35)';g.lineCap='round';for(let i=0;i<9;i++){const per=2.4+i*.37,q=((t+i*.9)%per)/per,x=wrap(i*143-cx*.8,SW0+300)-150+q*260,y=wrap(i*97-cy*.8,Hs)+q*60,L=40+i%3*20;g.globalAlpha=Math.sin(q*3.14)*.8;g.lineWidth=1+i%2;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+L*.5,y+4,x+L,y+12);g.stroke()}g.globalAlpha=1}
    /* น้ำค้างแข็งเกาะขอบจอ */for(const s of[0,1]){const gr=g.createLinearGradient(s?SW0:0,0,s?SW0-46:46,0);gr.addColorStop(0,'rgba(225,238,255,.38)');gr.addColorStop(1,'rgba(225,238,255,0)');g.fillStyle=gr;g.fillRect(s?SW0-46:0,0,46,Hs)}}
  if(th==='starfall'){for(let i=0;i<(Q?1:2);i++){const side=i%2,y=wrap(i*360+200-cy*1.3,Hs+460)-200+FGO.y;g.save();if(side){g.translate(SW0,0);g.scale(-1,1)}g.globalAlpha=.92;g.drawImage(p7gCrySpr(i),-40,y,140,260);g.globalCompositeOperation='lighter';glowAt(20,y+150,60,'130,180,255',.12+.05*Math.sin(t*1.5+i));g.restore()}
    g.globalCompositeOperation='lighter';for(let i=0;i<(Q?5:14);i++){const x=wrap(i*97-cx*1.35+Math.sin(t*.4+i)*16,SW0+20)-10,y=wrap(i*151-cy*1.35-t*(5+i%3*3),Hs+20)-10;glowAt(x,y,2+i%2,i%3?'200,225,255':'230,200,255',.25+.3*Math.sin(t*2+i*1.7))}g.globalCompositeOperation='source-over'}
  g.restore()}
{const _d4=d4Screen;d4Screen=window.d4Screen=function(thO){_d4(thO);const th=thO||DEPM[curMap];if(th==='karn'||th==='summit'||th==='starfall'){try{p7gScreen(th,!!thO)}catch(e){console.warn('p7gScreen',e)}}}}

/* =================== กล่องติดตามเควสบังตัวละคร =================== */
/* เล่นเนื้อเรื่องครบแล้ว → ย่อเหลือไอคอนเอง · ระหว่างเล่น ถ้ากล่องทับชื่อ/ตัวละครบนจอ ให้จางลง (แตะได้ตามปกติ) */
setInterval(()=>{try{const e=$('stq');if(!e||e.hidden)return;const done=!STY[me.sty&&me.sty.s];e.classList.toggle('stqdone',done);
  const r=e.getBoundingClientRect(),cv=document.querySelector('canvas'),cr=cv?cv.getBoundingClientRect():{left:0,top:0};const z=ZM.z,sx=cr.left+(me.x*z-CAMF.x+SW0/2),sy=cr.top+(me.y*z-CAMF.y+H/2);
  const hit=r.right>sx-55&&r.left<sx+55&&r.bottom>sy-58*z&&r.top<sy+30;e.classList.toggle('stqdim',!!hit)}catch(_){}},250);
{const st=document.createElement('style');st.textContent='#stq{transition:opacity .25s}#stq.stqdim:not(:active){opacity:.42}#stq.stqdone:not(.min) span,#stq.stqdone:not(.min) u.aqs{display:none}#stq.stqdone:not(.min){max-width:150px!important}';document.head.appendChild(st)}

/* =================== ดันเจี้ยนป้องกันลิฟต์เหมือง (พื้นห้องโล่ง → ปล่องเหมืองจริง) =================== */
{const _mp=mdfPaint;mdfPaint=window.mdfPaint=function(c,ox,oy,S){_mp(c,ox,oy,S);const X1=ox+S,Y1=oy+S;if(CX+DR+700<ox||CX-DR-700>X1||CY+DR+700<oy||CY-DR-700>Y1)return;
  /* พื้นในวง: แผ่นหิน + เส้นแร่ดาว (ไม่ทับราง/วงซ่อม) */
  c.save();c.beginPath();c.arc(CX,CY,DR+16,0,7);c.clip();const onRail=(px,py)=>MDTA.some(a=>{const ux=Math.cos(a),uy=Math.sin(a),d=(px-CX)*ux+(py-CY)*uy;return d>90&&Math.abs(-(px-CX)*uy+(py-CY)*ux)<30});
  for(let i=0;i<26;i++){const a=palH(i,1,3701)*6.283,d=170+palH(i,2,3702)*(DR-190),px=CX+Math.cos(a)*d,py=CY+Math.sin(a)*d;if(onRail(px,py))continue;const n=6,rr=34+palH(i,3,3703)*36,pts=[];
    for(let k=0;k<n;k++){const b=k/n*6.283+palH(i+k,4,3704)*.5,r=rr*(.7+palH(k,i,3705)*.4);pts.push([px+Math.cos(b)*r,py+Math.sin(b)*r*.62])}
    c.fillStyle=palH(i,5,3706)<.5?'rgba(60,36,22,.5)':'rgba(150,104,70,.28)';c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();c.strokeStyle='rgba(28,14,8,.4)';c.lineWidth=1.2;c.stroke()}
  c.lineCap='round';for(let v=0;v<7;v++){let a=palH(v,6,3711)*6.283,px=CX+Math.cos(a)*(200+palH(v,7,3712)*(DR-260)),py=CY+Math.sin(a)*(200+palH(v,7,3712)*(DR-260)),b=palH(v,8,3713)*6.283;
    for(let k=0;k<7;k++){const nx=px+Math.cos(b)*22,ny=py+Math.sin(b)*16;if(onRail(nx,ny)||Math.hypot(nx-CX,ny-CY)<165)break;c.strokeStyle='rgba(30,60,90,.45)';c.lineWidth=4;c.beginPath();c.moveTo(px,py);c.lineTo(nx,ny);c.stroke();c.strokeStyle='rgba(120,205,245,.6)';c.lineWidth=1.8;c.stroke();px=nx;py=ny;b+=(palH(k,v,3714)-.5)*1.1}}
  c.restore();
  /* ผนังปล่องรอบวง: ก้อนหินเรียงเป็นชั้น + เสาไม้ค้ำเป็นระยะ */
  for(let ring=0;ring<3;ring++){const r0=DR+60+ring*110,n=34+ring*8;for(let i=0;i<n;i++){const a=(i+ring*.5)/n*6.283,px=CX+Math.cos(a)*r0,py=CY+Math.sin(a)*r0*.96;if(px<ox-80||px>X1+80||py<oy-80||py>Y1+80)continue;const w=40+palH(i,ring,3721)*30,h=24+palH(ring,i,3722)*16;
    c.fillStyle='rgba(8,4,2,.5)';c.beginPath();c.ellipse(px+3,py+5,w*.55,h*.6,a+1.57,0,7);c.fill();c.fillStyle=['#4a2e1c','#3e2618','#563622'][(i+ring)%3];c.beginPath();c.ellipse(px,py,w*.52,h*.55,a+1.57,0,7);c.fill();
    c.strokeStyle='rgba(200,140,90,'+(.22-ring*.06)+')';c.lineWidth=2;c.beginPath();c.ellipse(px,py,w*.48,h*.5,a+1.57,Math.PI*1.1,Math.PI*1.8);c.stroke()}}
  for(let i=0;i<12;i++){const a=(i+.5)/12*6.283;if(MDTA.some(b=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)))<.32))continue;const px=CX+Math.cos(a)*(DR+46),py=CY+Math.sin(a)*(DR+46);if(px<ox-60||px>X1+60||py<oy-60||py>Y1+60)continue;
    c.save();c.translate(px,py);c.rotate(a+1.57);c.fillStyle='rgba(10,6,2,.5)';c.fillRect(-6,-30,16,62);c.fillStyle='#5a3a1e';c.fillRect(-9,-32,18,62);c.fillStyle='rgba(200,150,100,.3)';c.fillRect(-9,-32,3,62);c.fillStyle='#6a4a28';c.fillRect(-26,-36,52,10);c.fillStyle='#2a2a30';c.fillRect(-4,-30,3,3);c.fillRect(2,20,3,3);c.restore()}}}
