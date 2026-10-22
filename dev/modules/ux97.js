
/* ===== v488 · สกิลที่ 6 ทางเลือก (ส่วนภาพ): เอฟเฟกต์ · ไอคอน · เสียง =====
   q8rift รอยแยกโลหิต · q8cst กลุ่มดาว · q8clk หยุดกาลเวลา · q8veil ม่านราตรี · q8dawn อรุณฟื้นคืน
   q8wall กำแพงสวรรค์ · q8tar ศรอสนีปักเป้า · q8hnd/q8hbt สุนัขนรก · q8cage กรงดาบ · q8sph ดูดวิญญาณ */
function q8Spark4(x,y,s,c,al){g.save();g.translate(x,y);g.globalAlpha*=al;g.fillStyle=c;g.beginPath();for(let i=0;i<8;i++){const r=i%2?s*.28:s,an=i*Math.PI/4-Math.PI/2;i?g.lineTo(Math.cos(an)*r,Math.sin(an)*r):g.moveTo(Math.cos(an)*r,Math.sin(an)*r)}g.closePath();g.fill();g.restore()}
function q8Hound(x,y,a,t,i,al){g.save();g.translate(x,y);const fl=Math.cos(a)<0?-1:1;g.scale(fl,1);g.globalAlpha*=al;const run=Math.sin(t*18+i*2);
  g.globalCompositeOperation='lighter';glowAt(0,-8,20,'255,90,30',.45);g.globalCompositeOperation='source-over';g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,3,14,4,0,0,7);g.fill();
  g.strokeStyle='#120404';g.lineWidth=3;g.lineCap='round';[[-8,1],[-4,-1],[5,1],[9,-1]].forEach(([lx,ph],j)=>{const sw=run*ph*4;g.beginPath();g.moveTo(lx,-6);g.lineTo(lx+sw,2);g.stroke()});
  g.fillStyle='#2a0806';g.strokeStyle='#0c0202';g.lineWidth=1;g.beginPath();g.ellipse(0,-9,13,6,0,0,7);g.fill();g.stroke();
  g.beginPath();g.moveTo(9,-12);g.lineTo(19,-15);g.lineTo(23,-11);g.lineTo(18,-7);g.lineTo(10,-6);g.closePath();g.fill();g.stroke();
  g.fillStyle='#120404';g.beginPath();g.moveTo(13,-15);g.lineTo(14,-21);g.lineTo(17,-15);g.closePath();g.fill();g.fillStyle='#ffd040';g.beginPath();g.arc(18,-12.5,1.3,0,7);g.fill();
  g.globalCompositeOperation='lighter';for(let j=0;j<5;j++){const q=(t*3+j*.2+i*.37)%1;g.fillStyle='rgba(255,'+(160-q*100|0)+',40,'+(.8*(1-q))+')';g.beginPath();g.arc(-6+j*4-q*6,-14-q*12,2.6*(1-q)+.8,0,7);g.fill()}
  g.fillStyle='rgba(255,120,40,.8)';g.beginPath();g.ellipse(-14-Math.sin(t*10)*2,-12,5,2,-.5,0,7);g.fill();g.restore()}
Object.assign(FXB,{
 /* รอยแยกโลหิต: รอยแตกแดงตามทางพุ่ง → ปะทุ → หนามเลือดทุก 0.5 วิ (u='a' สามแนวไม่มีหนาม) */
 q8rift:(f,p,x,y,r,now)=>{const D=f.d||2.8,t=p*D,A=f.u==='a',te=A?.45:.6,sx=f.sx,sy=f.sy,L=Math.hypot(x-sx,y-sy)||1,ux=(x-sx)/L,uy=(y-sy)/L,nx=-uy,ny=ux,grow=Math.min(1,t/(A?.25:.18)),al=Math.min(1,(D-t)/.3);g.save();
   g.strokeStyle='rgba(40,0,0,'+(.8*al)+')';g.lineWidth=5;g.lineJoin='round';g.beginPath();const N=12;for(let i=0;i<=N*grow;i++){const u=i/N,w=(fxR(f,i,1)-.5)*10;const px=sx+ux*L*u+nx*w,py=sy+uy*L*u+ny*w*.6+4;i?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();
   g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,'+(t>te?120:40)+',60,'+(.85*al)+')';g.lineWidth=t>te&&t<te+.3?4:1.8;g.stroke();
   if(t>=te&&t<te+.4){const q=(t-te)/.4;for(let i=0;i<8;i++){const u=(i+.5)/8;glowAt(sx+ux*L*u,sy+uy*L*u-6,28*(1-q)+6,'255,60,50',.6*(1-q))}}
   g.globalCompositeOperation='source-over';const sp=(ph,sc)=>{for(let i=0;i<9;i++){const u=(i+.5)/9,h=(18+fxR(f,i,2)*16)*sc*Math.sin(Math.min(1,ph)*Math.PI),px=sx+ux*L*u+nx*(fxR(f,i,3)-.5)*24,py=sy+uy*L*u+ny*(fxR(f,i,3)-.5)*14+4;if(h<1)continue;
       g.fillStyle='#8a0a10';g.strokeStyle='#2a0204';g.lineWidth=1;g.beginPath();g.moveTo(px-4*sc,py);g.lineTo(px,py-h);g.lineTo(px+4*sc,py);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(255,150,150,.7)';g.beginPath();g.moveTo(px-1,py-2);g.lineTo(px,py-h*.9);g.lineTo(px+.6,py-2);g.closePath();g.fill()}};
   if(t>=te)sp((t-te)/.35,1.2);if(!A)for(let j=1;j<=4;j++){const ts=te+j*.5;if(t>=ts&&t<ts+.35)sp((t-ts)/.35,.7)}g.restore()},
 /* ธนูกลุ่มดาว: ดาวบนตัวมอน + เส้นเชื่อม → ระเบิด */
 q8cst:(f,p,x,y,r,now)=>{const D=f.d||1.15,t=p*D,L=q8Lp(f).map(q=>[q[0],q[1]-26]),al=Math.min(1,(D-t)/.25);if(!L.length)return;g.save();g.globalCompositeOperation='lighter';
   const draw=Math.min(1,t/.6)*(L.length-1);g.strokeStyle='rgba(200,220,255,'+(.75*al)+')';g.lineWidth=1.6;g.setLineDash([4,3]);g.lineDashOffset=-now*20;g.beginPath();for(let i=0;i<L.length-1&&i<draw;i++){const a=L[i],b=L[i+1],e=Math.min(1,draw-i);g.moveTo(a[0],a[1]);g.lineTo(a[0]+(b[0]-a[0])*e,a[1]+(b[1]-a[1])*e)}g.stroke();g.setLineDash([]);
   L.forEach((q,i)=>{const ap=Math.min(1,Math.max(0,(t-i*.08)/.2));if(ap<=0)return;glowAt(q[0],q[1],14,'190,215,255',.6*al*ap);q8Spark4(q[0],q[1],9*ap+Math.sin(now*8+i)*1.5,'rgba(255,255,255,'+al+')',1)});
   [.8].concat(f.u==='a'?[1.3]:[]).forEach(tb=>{if(t>=tb&&t<tb+.35){const q=(t-tb)/.35;g.strokeStyle='rgba(255,250,220,'+(1-q)+')';g.lineWidth=4*(1-q)+1;g.beginPath();L.forEach((pt,i)=>i?g.lineTo(pt[0],pt[1]):g.moveTo(pt[0],pt[1]));g.stroke();
     L.forEach(pt=>{glowAt(pt[0],pt[1]+20,(f.u==='b'?60:30)*(.4+q),'200,225,255',.8*(1-q));q8Ring(pt[0],pt[1]+30,(f.u==='b'?60:24)*q8eo(q),'220,235,255',.9*(1-q),2)})}});g.restore()},
 /* หยุดกาลเวลา: หน้าปัดนาฬิกา + โทนเทา */
 q8clk:(f,p,x,y,r,now)=>{const D=f.d||3,t=p*D,al=Math.min(1,t/.2,(D-t)/.2),R=r*q8eo(Math.min(1,t/.3));g.save();
   g.save();g.translate(x,y+4);g.scale(1,.45);g.fillStyle='rgba(150,170,200,'+(.22*al)+')';g.beginPath();g.arc(0,0,R,0,7);g.fill();g.strokeStyle='rgba(220,235,255,'+(.85*al)+')';g.lineWidth=2.4;g.beginPath();g.arc(0,0,R,0,7);g.stroke();g.lineWidth=1.2;g.beginPath();g.arc(0,0,R*.86,0,7);g.stroke();
   for(let i=0;i<12;i++){const an=i*.5236,r0=R*(i%3?.8:.74);g.lineWidth=i%3?1.2:2.4;g.beginPath();g.moveTo(Math.cos(an)*r0,Math.sin(an)*r0);g.lineTo(Math.cos(an)*R*.86,Math.sin(an)*R*.86);g.stroke()}
   const h1=-1.5708+t*.4,h2=-1.5708-t*2.2;g.strokeStyle='rgba(255,240,200,'+(.95*al)+')';g.lineCap='round';g.lineWidth=4;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(h1)*R*.45,Math.sin(h1)*R*.45);g.stroke();g.lineWidth=2.4;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(h2)*R*.7,Math.sin(h2)*R*.7);g.stroke();
   g.fillStyle='rgba(255,240,200,'+al+')';g.beginPath();g.arc(0,0,5,0,7);g.fill();g.restore();
   g.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const an=fxR(f,i,1)*6.283,rr=R*Math.sqrt(fxR(f,i,2));g.fillStyle='rgba(210,230,255,'+(.6*al*(.5+.5*Math.sin(now*3+i)))+')';g.beginPath();g.arc(x+Math.cos(an)*rr,y+4+Math.sin(an)*rr*.45-20-fxR(f,i,3)*30,1.6,0,7);g.fill()}g.restore()},
 /* ม่านราตรี: โดมมืด ดาวระยิบ */
 q8veil:(f,p,x,y,r,now)=>{const D=f.d||5,t=p*D,al=Math.min(1,t/.3,(D-t)/.4),R=r*q8eo(Math.min(1,t/.35));g.save();
   g.save();g.translate(x,y);g.scale(1,.55);const gr=g.createRadialGradient(0,0,R*.1,0,0,R);gr.addColorStop(0,'rgba(10,4,24,'+(.42*al)+')');gr.addColorStop(.8,'rgba(24,8,48,'+(.36*al)+')');gr.addColorStop(1,'rgba(90,40,170,'+(.45*al)+')');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,7);g.fill();
   g.strokeStyle='rgba(150,90,255,'+(.7*al)+')';g.lineWidth=2;g.setLineDash([10,6]);g.lineDashOffset=-now*14;g.beginPath();g.arc(0,0,R,0,7);g.stroke();g.setLineDash([]);g.restore();
   g.globalCompositeOperation='lighter';for(let i=0;i<16;i++){const an=fxR(f,i,1)*6.283,rr=R*Math.sqrt(fxR(f,i,2)),tw=.5+.5*Math.sin(now*4+i*1.7);q8Spark4(x+Math.cos(an)*rr,y+Math.sin(an)*rr*.55-14-fxR(f,i,3)*24,2+tw*2.4,'rgba(220,200,255,1)',al*tw)}
   const mx=x+R*.45,my=y-R*.32;g.fillStyle='rgba(235,225,255,'+(.8*al)+')';g.beginPath();g.arc(mx,my,9,0,7);g.arc(mx+4,my-3,8,0,7,true);g.fill('evenodd');
   if(f.u==='b'){g.globalCompositeOperation='source-over';g.strokeStyle='rgba(30,10,50,'+(.6*al)+')';g.lineWidth=1.2;for(let i=0;i<6;i++){const an=i*1.047+now*.2;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(an+.4)*R*.5,y+Math.sin(an+.4)*R*.25,x+Math.cos(an)*R,y+Math.sin(an)*R*.55);g.stroke()}}g.restore()},
 /* อรุณฟื้นคืน: แสงอาทิตย์ระเบิดรอบตัว */
 q8dawn:(f,p,x,y,r,now)=>{const q=q8eo(p),al=1-p;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-20,80*(1-p*.4),'255,220,120',.8*al);
   for(let i=0;i<14;i++){const an=i*.4488+p*.6;g.strokeStyle='rgba(255,235,170,'+(.55*al)+')';g.lineWidth=5*(1-p)+1;g.beginPath();g.moveTo(x+Math.cos(an)*24,y-20+Math.sin(an)*14);g.lineTo(x+Math.cos(an)*r*q,y-20+Math.sin(an)*r*q*.5);g.stroke()}
   for(let i=0;i<3;i++){const qq=Math.min(1,q*1.2+i*.12);q8Ring(x,y+4,r*(.15+.85*qq),'255,'+(225+i*10)+',150',.85*(1-qq),3*(1-qq)+1)}
   for(let i=0;i<10;i++){const an=fxR(f,i,1)*6.283,d2=r*.6*q;g.fillStyle='rgba(255,250,220,'+al+')';g.save();g.translate(x+Math.cos(an)*d2,y-20+Math.sin(an)*d2*.5-30*q);g.rotate(an+now);g.beginPath();g.ellipse(0,0,4,1.5,0,0,7);g.fill();g.restore()}g.restore()},
 /* กำแพงสวรรค์: ขึ้นจากพื้น → ล้มไปข้างหน้า (u='b' ตั้งค้าง) */
 q8wall:(f,p,x,y,r,now)=>{const D=f.d||1.3,t=p*D,a=f.a,stay=f.u==='b',ux=Math.cos(a),uy=Math.sin(a)*.55;let sx=-Math.sin(a)+.5*Math.cos(a),sy=Math.cos(a)*.55;const sl=Math.hypot(sx,sy/.55)||1;sx/=sl;sy/=sl;
   const H=72,rise=q8eo(Math.min(1,t/.4)),th=stay?0:q8ei(q8c(t,.4,.75))*1.5708,al=stay?Math.min(1,(D-t)/.4):Math.min(1,(D-t)/.35),hh=H*rise*Math.cos(th),fw=H*rise*Math.sin(th)*1.5;g.save();g.globalAlpha=al;
   const B1=[x+sx*r,y+sy*r],B2=[x-sx*r,y-sy*r],T1=[B1[0]+ux*fw,B1[1]+uy*fw-hh],T2=[B2[0]+ux*fw,B2[1]+uy*fw-hh],th2=8*rise;
   g.fillStyle='rgba(0,0,0,.24)';g.beginPath();g.moveTo(B1[0],B1[1]+4);g.lineTo(B2[0],B2[1]+4);g.lineTo(B2[0]+ux*(fw+16),B2[1]+4+uy*(fw+16));g.lineTo(B1[0]+ux*(fw+16),B1[1]+4+uy*(fw+16));g.closePath();g.fill();
   const gr=g.createLinearGradient(0,Math.min(T1[1],T2[1]),0,Math.max(B1[1],B2[1]));gr.addColorStop(0,'#fff0b0');gr.addColorStop(1,'#b88a28');g.fillStyle=gr;g.strokeStyle='#4a3008';g.lineWidth=1.6;
   g.beginPath();g.moveTo(B1[0],B1[1]);g.lineTo(B2[0],B2[1]);g.lineTo(T2[0],T2[1]);g.lineTo(T1[0],T1[1]);g.closePath();g.fill();g.stroke();
   g.fillStyle='#ffe7a0';g.beginPath();g.moveTo(T1[0],T1[1]);g.lineTo(T2[0],T2[1]);g.lineTo(T2[0]-ux*th2*.6,T2[1]-uy*th2*.6-th2*.5);g.lineTo(T1[0]-ux*th2*.6,T1[1]-uy*th2*.6-th2*.5);g.closePath();g.fill();g.stroke();
   g.strokeStyle='rgba(110,70,10,.55)';g.lineWidth=1;for(let i=1;i<4;i++){const v=i/4,L1=[B1[0]+(T1[0]-B1[0])*v,B1[1]+(T1[1]-B1[1])*v],L2=[B2[0]+(T2[0]-B2[0])*v,B2[1]+(T2[1]-B2[1])*v];g.beginPath();g.moveTo(L1[0],L1[1]);g.lineTo(L2[0],L2[1]);g.stroke();
     for(let j=1;j<6;j++){const u=(j+(i%2?.5:0))/6;if(u>=1)continue;const v0=(i-1)/4;g.beginPath();g.moveTo(B1[0]+(B2[0]-B1[0])*u+(T1[0]-B1[0])*v0,B1[1]+(B2[1]-B1[1])*u+(T1[1]-B1[1])*v0);g.lineTo(B1[0]+(B2[0]-B1[0])*u+(T1[0]-B1[0])*v,B1[1]+(B2[1]-B1[1])*u+(T1[1]-B1[1])*v);g.stroke()}}
   g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,245,200,.7)';g.lineWidth=2;g.beginPath();g.moveTo(T1[0],T1[1]);g.lineTo(T2[0],T2[1]);g.stroke();
   if(stay&&t>.4){const pu=.5+.5*Math.sin(now*8);glowAt(x,y-30,r*.8,'255,220,120',.25*pu*al)}
   if(!stay&&t>=.75&&t<1.2){const q=(t-.75)/.45,cx=x+ux*70,cy=y+uy*70;glowAt(cx,cy,120*(1-q)+20,'255,210,120',.6*(1-q));g.globalCompositeOperation='source-over';q8Rocks(f,cx,cy,120,q,14)}g.restore()},
 /* ศรอสนีปักเป้า: ศรพุ่งไปปักแล้วไฟฟ้าแลบรอบ ๆ */
 q8tar:(f,p,x,y,r,now)=>{const L=q8Lp(f);if(!L.length)return;const D=f.d||4.2,t=p*D,[mx,my]=L[0],T=.2,al=Math.min(1,(D-t)/.25);g.save();
   if(t<T){const q=t/T,px=f.sx+(mx-f.sx)*q,py=f.sy+(my-14-f.sy)*q;g.globalCompositeOperation='lighter';glowAt(px,py,14,'150,200,255',.7);g.globalCompositeOperation='source-over';q8Arrow(px,py,Math.atan2(my-14-f.sy,mx-f.sx),20,'150,200,255',1)}
   else{const a=Math.atan2(my-14-f.sy,mx-f.sx);g.globalAlpha=al;g.save();g.translate(mx-Math.cos(a)*4,my-16-Math.sin(a)*4);g.rotate(a);g.strokeStyle='#5a3a1a';g.lineWidth=1.6;g.beginPath();g.moveTo(-16,0);g.lineTo(-2,0);g.stroke();g.fillStyle='#f4f0e0';g.beginPath();g.moveTo(-15,0);g.lineTo(-19,-2.6);g.lineTo(-13.5,0);g.lineTo(-19,2.6);g.closePath();g.fill();g.restore();
     g.globalCompositeOperation='lighter';glowAt(mx,my-16,16+3*Math.sin(now*20),'140,190,255',.55*al);g.strokeStyle='rgba(200,230,255,'+(.9*al)+')';g.lineWidth=1.2;for(let i=0;i<3;i++){if(Math.sin(now*23+i*2.1)<.2)continue;const an=fxR(f,i+Math.floor(now*12),1)*6.283;g.beginPath();g.moveTo(mx,my-16);g.lineTo(mx+Math.cos(an)*9+(fxR(f,i,3)-.5)*6,my-16+Math.sin(an)*9);g.lineTo(mx+Math.cos(an)*17,my-16+Math.sin(an)*15);g.stroke()}}g.restore()},
 /* สุนัขนรก: จำลองการวิ่งในแต่ละเครื่อง (ตามจุดกัดที่คนร่ายส่งมา) */
 q8hnd:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||8,t=p*D,n=parseInt(f.u)||2,al=Math.min(1,t/.3,(D-t)/.3),tn=performance.now();if(!f.H){f.H=[];for(let i=0;i<n;i++)f.H.push({x:o.x+(i-(n-1)/2)*30,y:o.y+16,a:0})}
   const dt=Math.min(.05,Math.max(0,(tn-(f.lt||tn))/1000));f.lt=tn;
   f.H.forEach((h,i)=>{const B=Q8HB[f.by+':'+i];let tx,ty;if(B&&tn-B.t<700){tx=B.tx-Math.cos(Math.atan2(B.ty-h.y,B.tx-h.x))*20;ty=B.ty}else{const m=q8Near(h.x,h.y,420)[0];if(m){tx=m.x;ty=m.y}else{tx=o.x+(i-(n-1)/2)*30;ty=o.y+16}}
     const dx=tx-h.x,dy=ty-h.y,d=Math.hypot(dx,dy);if(d>22){const s=Math.min(d,300*dt);h.x+=dx/d*s;h.y+=dy/d*s;h.a=Math.atan2(dy,dx)}
     if(t<.35){g.save();g.globalCompositeOperation='lighter';glowAt(h.x,h.y-8,30*(1-t/.35)+6,'255,80,20',.7*(1-t/.35));g.restore()}q8Hound(h.x,h.y,h.a,now,i,al*(/b/.test(f.u||'')&&t>D-1?.7+.3*Math.sin(now*30):1))})},
 q8hbt:(f,p,x,y,r,now)=>{const al=1-p;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10,18*(1-p)+4,'255,110,40',.8*al);g.strokeStyle='rgba(255,220,180,'+al+')';g.lineWidth=2;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(x-8+i*5,y-18);g.quadraticCurveTo(x+i*5,y-10,x+6+i*5,y-2);g.stroke()}g.restore()},
 /* กรงดาบ: ดาบปักเป็นวง ฟันเข้ากลางเป็นจังหวะ แล้วพุ่งรวม (u='b' จางหาย) */
 q8cage:(f,p,x,y,r,now)=>{const D=f.d||4.45,t=p*D,al=Math.min(1,(D-t)/.15),conv=f.u==='b'?0:q8ei(q8c(t,D-.45,D-.15));g.save();
   g.save();g.translate(x,y+4);g.scale(1,.42);g.strokeStyle='rgba(120,60,200,'+(.5*al)+')';g.lineWidth=2;g.beginPath();g.arc(0,0,r,0,7);g.stroke();g.restore();
   const S=[];for(let i=0;i<12;i++){const an=i*.5236,drop=q8eo(Math.min(1,Math.max(0,(t-i*.02)/.3))),px=x+Math.cos(an)*r*(1-conv),py=y+Math.sin(an)*r*.42*(1-conv);S.push([py,px,drop,an])}S.sort((a,b)=>a[0]-b[0]);
   S.forEach(([py,px,drop,an])=>{const ph=(t-.25)%.5,sl=t>.25&&t<D-.45&&ph<.15;q8BigSword(px,py+6-(1-drop)*160-conv*40,.3,'190,140,255',sl?1:.35);if(sl){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(220,190,255,'+(1-ph/.15)+')';g.lineWidth=2;g.beginPath();g.moveTo(px,py-14);g.lineTo(px+(x-px)*.6,py-14+(y-py)*.6);g.stroke();g.restore()}});g.restore()},
 /* ดูดวิญญาณ: สายวิญญาณจากตัวมอนเข้าหาคนร่าย */
 q8sph:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},L=q8Lp(f),D=f.d||4.2,t=p*D,al=Math.min(1,t/.2,(D-t)/.25);g.save();
   L.forEach(([mx,my],i)=>{const sx=mx,sy=my-16,ex=o.x,ey=o.y-20,N=16;g.strokeStyle='rgba(60,20,90,'+(.6*al)+')';g.lineWidth=4;g.beginPath();for(let j=0;j<=N;j++){const u=j/N,w=Math.sin(u*Math.PI*3+now*8+i)*6*Math.sin(u*Math.PI);const px=sx+(ex-sx)*u,py=sy+(ey-sy)*u+w;j?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();
     g.globalCompositeOperation='lighter';g.strokeStyle='rgba(170,255,200,'+(.55*al)+')';g.lineWidth=1.4;g.stroke();for(let j=0;j<4;j++){const u=(now*.9+j*.25+i*.13)%1,w=Math.sin(u*Math.PI*3+now*8+i)*6*Math.sin(u*Math.PI);g.fillStyle='rgba(190,255,210,'+(al*Math.sin(u*Math.PI))+')';g.beginPath();g.arc(sx+(ex-sx)*u,sy+(ey-sy)*u+w,2.6,0,7);g.fill()}
     glowAt(mx,my-16,14,'150,255,190',.4*al);g.globalCompositeOperation='source-over'});g.globalCompositeOperation='lighter';glowAt(o.x,o.y-20,22,'150,255,190',.35*al);g.restore()}});
try{Object.assign(R27D,{q8rift:1,q8cst:1,q8clk:1,q8veil:1,q8wall:1,q8tar:1,q8hnd:1,q8cage:1,q8sph:1})}catch(e){}
setTimeout(()=>{try{Object.assign(FXD,{q8dawn:1,q8hbt:.3})}catch(e){}try{Object.assign(FXTOP,{q8cst:1,q8dawn:1,q8wall:1,q8tar:1,q8hnd:1,q8hbt:1,q8cage:1,q8sph:1})}catch(e){}},0);
/* ---------- ไอคอน ---------- */
Object.assign(Q8SVG,{
 zm:'<path d="M3 26L12 21L17 23L29 7" fill="none" stroke="#2a0204" stroke-width="5" stroke-linejoin="round"/><path d="M3 26L12 21L17 23L29 7" fill="none" stroke="#ff4040" stroke-width="2" stroke-linejoin="round"/><g fill="#8a0a10" stroke="#2a0204" stroke-width=".6"><path d="M8 25l2-8 2 7z"/><path d="M15 23l2-9 2 8z"/><path d="M21 17l2-8 1.6 7z"/></g><circle cx="29" cy="7" r="2.4" fill="#ffb0a0"/>',
 zc:'<path d="M5 22L12 9L20 16L27 6" fill="none" stroke="#c8dcff" stroke-width="1.2" stroke-dasharray="2 1.6"/><g fill="#fff">'+[[5,22],[12,9],[20,16],[27,6]].map(([x,y])=>'<path d="M'+x+' '+(y-4)+'l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>').join('')+'</g><path d="M4 30L12 24" stroke="#6a4a2a" stroke-width="1.6"/><path d="M12 24l-1-3 3.4 1z" fill="#e8eef4"/>',
 zt:'<circle cx="16" cy="16" r="13" fill="#9ab0d0" fill-opacity=".35" stroke="#e0ecff" stroke-width="1.6"/><g stroke="#e0ecff" stroke-width="1.4"><path d="M16 4v3M16 25v3M4 16h3M25 16h3"/></g><path d="M16 16V8M16 16l6 3" stroke="#fff4c8" stroke-width="2.2" stroke-linecap="round"/><circle cx="16" cy="16" r="2" fill="#fff4c8"/><path d="M26 25l3 3M28 23l2 1" stroke="#bfe0ff" stroke-width="1.2"/>',
 zv:'<ellipse cx="16" cy="19" rx="14" ry="10" fill="#160a2a" stroke="#9a5aff" stroke-width="1.4" stroke-dasharray="4 2"/><path d="M22 8A6 6 0 1 0 25 16A5 5 0 1 1 22 8Z" fill="#ece4ff"/><g fill="#d8c8ff"><path d="M8 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/><circle cx="12" cy="24" r=".9"/><circle cx="20" cy="25" r="1"/></g><path d="M9 26L15 18" stroke="#e0d0ff" stroke-width="1.4" stroke-linecap="round"/>',
 zr:'<circle cx="16" cy="17" r="7" fill="#ffe08a" stroke="#e0a830"/><g stroke="#fff2b0" stroke-width="1.6" stroke-linecap="round">'+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return'<path d="M'+(16+Math.cos(a)*10).toFixed(1)+' '+(17+Math.sin(a)*10).toFixed(1)+'L'+(16+Math.cos(a)*14).toFixed(1)+' '+(17+Math.sin(a)*14).toFixed(1)+'"/>'}).join('')+'</g><path d="M13 17h6M16 14v6" stroke="#b07818" stroke-width="1.8"/>',
 zw:'<path d="M3 27L29 27L29 11L3 11Z" fill="#e0b848" stroke="#4a3008" stroke-width="1.2"/><g stroke="#8a6010" stroke-width=".9"><path d="M3 16h26M3 21h26M10 11v5M20 11v5M15 16v5M25 16v5M8 21v6M18 21v6"/></g><path d="M3 11Q16 2 29 11" fill="none" stroke="#fff2b0" stroke-width="1.4"/><g fill="#a08060"><circle cx="6" cy="30" r="1.2"/><circle cx="26" cy="30" r="1.4"/></g>',
 zl:'<path d="M4 28L22 10" stroke="#6a4a2a" stroke-width="1.8"/><path d="M22 10l-4 .6 3.4 3.4z" fill="#e8eef4"/><path d="M24 2L19 12h5L18 24" fill="none" stroke="#ffe680" stroke-width="2.2" stroke-linejoin="round"/><circle cx="22" cy="12" r="5" fill="#8ac8ff" opacity=".35"/>',
 zh:'<g transform="translate(16 20)"><ellipse cx="-2" cy="-2" rx="10" ry="5" fill="#2a0806" stroke="#0c0202"/><path d="M6-5L14-8L17-4L13-1L7 0Z" fill="#2a0806" stroke="#0c0202"/><path d="M9-8l1-5 2 4z" fill="#120404"/><circle cx="13" cy="-5" r="1.1" fill="#ffd040"/><g stroke="#120404" stroke-width="2.2" stroke-linecap="round"><path d="M-8 2l-1 6M-4 2l1 6M3 2l-1 6M6 1l2 6"/></g></g><g fill="#ff8a30"><circle cx="9" cy="9" r="2.6"/><circle cx="14" cy="6" r="2"/><circle cx="6" cy="6" r="1.6"/></g>',
 zb:'<ellipse cx="16" cy="22" rx="13" ry="6" fill="none" stroke="#9a5aff" stroke-width="1.2"/><g fill="#e8f0fa" stroke="#141018" stroke-width=".6">'+[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3,x=16+Math.cos(a)*12,y=22+Math.sin(a)*5;return'<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+'l-1.4-2v-10h2.8v10z"/>'}).join('')+'</g>',
 zs:'<circle cx="8" cy="10" r="4" fill="#2a1a3a" stroke="#9affc0"/><circle cx="24" cy="9" r="4" fill="#2a1a3a" stroke="#9affc0"/><circle cx="16" cy="26" r="4.6" fill="#ffe8c0" stroke="#b07818"/><path d="M8 14Q10 22 14 24M24 13Q22 21 18 24" fill="none" stroke="#9affc0" stroke-width="1.6" stroke-dasharray="2 1.4"/><g fill="#d0ffe0"><circle cx="10" cy="18" r="1.2"/><circle cx="21" cy="18" r="1.2"/></g>'});
Object.keys(Q8SVG).forEach(k=>{if(!Q8IMG[k])Q8IMG[k]='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'+Q8SVG[k]+'</svg>')});
/* ---------- เสียง ---------- */
Object.assign(Q8SFX,{
 zm:()=>{sWhoosh(.3,.32,300,1800);sGrowl(90,.6,.16,.05);setTimeout(()=>{try{sBoom(70,.5,.4,0);sCrack(.4,.02,900)}catch(e){}},600)},
 zc:()=>{for(let i=0;i<5;i++)sO('sine',1200+i*240,1260+i*240,.3,.04,{dl:i*.07,rv:.5});setTimeout(()=>{try{sShim(2600,.6,.06,0,10);sBoom(140,.3,.2,0)}catch(e){}},800)},
 zt:()=>{for(let i=0;i<6;i++)sO('square',1800,1800,.03,.035,{dl:i*.18});sO('sine',600,150,1.2,.06,{rv:.6})},
 zv:()=>{sO('sine',300,120,1.2,.06,{rv:.6});sN(1,.12,{ft:'lowpass',f0:800,f1:200,at:.3});sShim(1400,.8,.03,.2,6)},
 zr:()=>{sChoir([523,659,784,1047],1.6,.05,0);sBell(1047,1.4,.08,.1);sShim(2200,1,.05,.1,12)},
 zw:()=>{sBoom(60,.5,.35,0);sN(.5,.16,{ft:'lowpass',f0:600,f1:200,at:.2});setTimeout(()=>{try{sBoom(45,.8,.55,0);sCrack(.5,.02,800)}catch(e){}},700)},
 zl:()=>{sTwang(.3);setTimeout(()=>{try{sZap(1800,.3,.12,0)}catch(e){}},200)},
 zh:()=>{sGrowl(120,.8,.26,0);sGrowl(160,.6,.2,.15);sN(.5,.1,{ft:'bandpass',f0:600,f1:1400,q:1,dl:.1})},
 zb:()=>{for(let i=0;i<12;i++)sMetal(800+i*40,.1,.04,i*.025);sBoom(100,.3,.2,.3)},
 zs:()=>{sO('sine',220,440,1.4,.05,{rv:.6,vib:6,vr:4});sChoir([220,262,330],1.2,.03,.1)}});
