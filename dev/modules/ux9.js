/* ---------- v378 VFX สกิลชุดใหม่ (ชั้นเสริมทับของเดิม · เห็นทุกเครื่องเพราะดักที่ handleFx) ----------
   ดาบอสูร: วังวนดาบ · พุ่งฟัน · โทสะ · คำราม     นักธนู: ห่าธนู · ถอยกระโดด · ธนูตรึงเงา · กับดักจันทรา
   จอมเวท: ลูกไฟ · โซ่สายฟ้า · รอยแยกกาลเวลา     นักฆ่า: ก้าวเงา/ร่างแยก · หมอกพิษ · ตราประทับมรณะ
   นักบวช: บทสวดพลัง · วงอรุณศักดิ์สิทธิ์
   อัลติเมต/ฮีล/ทัณฑ์แสง/ผนึกน้ำแข็งเดิมสวยอยู่แล้ว ไม่แตะ · โหมดประหยัดลดจำนวนอนุภาคลงครึ่ง */
const VXL=[];const VXN={whirl:.75,dash:.5,rage:1.1,roar:.9,arrows:.85,leap:.7,pin:.9,mtrap:1.3,fire:.85,chain:.55,rift:3,shadow:.7,fog:1.6,mark:1.1,atk:1.3,sanct:6};
const vxT=()=>performance.now()/1000;
const vxQ=n=>LOWQ?Math.ceil(n/2):n;
const vxR=(s)=>{let h=s|0;return()=>{h=Math.imul(h^h>>>15,2246822507)^Math.imul(h^h>>>13,3266489909);return((h^=h>>>16)>>>0)/4294967296}};
function vxPos(z){if(!z.fol)return[z.x,z.y];if(z.by===uid&&me.cls)return[me.x,me.y];const o=others[z.by];return o?[o.x,o.y]:[z.x,z.y]}
const VXRL={};function vxAdd(o){const k=o&&o.k,D=VXN[k];if(!D||!isFinite(+o.x)||!isFinite(+o.y))return;{const key=(o.by||'')+k,n=vxT(),gap=k==='chain'||k==='arrows'?.15:k==='shadow'||k==='mark'?.5:.35;if(n-(VXRL[key]||0)<gap)return;VXRL[key]=n}if(VXL.length>60)VXL.shift();
  const z={k,x:+o.x,y:+o.y,r:+o.r||60,a:+o.a||0,len:+o.len||0,by:o.by,t0:vxT(),d:k==='rift'?(+o.dur||3):k==='sanct'?(+o.dur||6):k==='fog'?Math.min(2.2,+o.dur||1.6):D,seed:(Math.random()*1e9)|0};
  if(k==='pin'){z.sx=+o.sx||z.x-100;z.sy=+o.sy||z.y}if(k==='chain')z.pts=(Array.isArray(o.pts)?o.pts:[]).slice(0,8).map(p=>[+p[0],+p[1]]);if(k==='rage')z.fol=1;if(k==='shadow')z.tgt=o.len===1&&o.x!==undefined;VXL.push(z)}
/* ---------- ตัววาด ---------- */
const vxLG=(f)=>{g.save();g.globalCompositeOperation='lighter';try{f()}finally{g.restore()}};
function vxArc(x,y,r,a0,a1,w,col,al){g.strokeStyle='rgba('+col+','+al+')';g.lineWidth=w;g.beginPath();g.arc(x,y,r,a0,a1);g.stroke()}
function vxBlade(x,y,r,a,sweep,col,al){/* ใบดาบรูปพระจันทร์เสี้ยว หนาตรงหัว บางตรงหาง */const n=14;g.beginPath();for(let i=0;i<=n;i++){const u=i/n,aa=a-sweep*u,rr=r*(1+.06*Math.sin(u*3.14));const px=x+Math.cos(aa)*rr,py=y+Math.sin(aa)*rr*.62;i?g.lineTo(px,py):g.moveTo(px,py)}
  for(let i=n;i>=0;i--){const u=i/n,aa=a-sweep*u,th=(1-u)*r*.11;const rr=r-th;g.lineTo(x+Math.cos(aa)*rr,y+Math.sin(aa)*rr*.62)}g.closePath();
  const gr=g.createRadialGradient(x,y,r*.6,x,y,r*1.05);gr.addColorStop(0,'rgba('+col+',0)');gr.addColorStop(.8,'rgba('+col+','+al*.8+')');gr.addColorStop(1,'rgba(255,255,255,'+al+')');g.fillStyle=gr;g.fill()}
function vxBolt(x0,y0,x1,y1,R,jit,w,col,al){const L=Math.hypot(x1-x0,y1-y0),n=Math.max(3,L/18|0),nx=-(y1-y0)/L,ny=(x1-x0)/L;g.beginPath();g.moveTo(x0,y0);for(let i=1;i<n;i++){const u=i/n,o=(R()-.5)*jit*Math.sin(u*3.14);g.lineTo(x0+(x1-x0)*u+nx*o,y0+(y1-y0)*u+ny*o)}g.lineTo(x1,y1);
  g.strokeStyle='rgba('+col+','+al*.5+')';g.lineWidth=w*3;g.stroke();g.strokeStyle='rgba('+col+','+al+')';g.lineWidth=w;g.stroke();g.strokeStyle='rgba(255,255,255,'+al+')';g.lineWidth=Math.max(1,w*.4);g.stroke()}
function vxRune(x,y,r,rot,col,al,n){g.save();g.translate(x,y);g.scale(1,.55);g.rotate(rot);g.strokeStyle='rgba('+col+','+al+')';g.lineWidth=2;g.beginPath();g.arc(0,0,r,0,7);g.stroke();g.lineWidth=1.2;g.beginPath();g.arc(0,0,r*.82,0,7);g.stroke();
  for(let i=0;i<n;i++){const a=i/n*6.283;g.save();g.rotate(a);g.translate(r*.91,0);g.rotate(1.57);g.beginPath();g.moveTo(-4,-3);g.lineTo(0,3);g.lineTo(4,-3);g.moveTo(0,-4);g.lineTo(0,4);g.stroke();g.restore()}
  g.beginPath();for(let i=0;i<=n;i++){const a=i/n*6.283*2;const px=Math.cos(a)*r*.82,py=Math.sin(a)*r*.82;i?g.lineTo(px,py):g.moveTo(px,py)}g.globalAlpha=.6;g.stroke();g.restore()}
const VXD={
 whirl(z,p,el,x,y,R){const r=z.r*1.15,a=1-Math.max(0,(p-.7)/.3),spin=el*15;vxLG(()=>{
   glowAt(x,y-6,r*1.1,'255,90,40',.22*a);for(let i=0;i<3;i++)vxBlade(x,y-6,r*(.82+i*.1),spin+i*2.094,2.4,i===1?'255,220,150':'255,100,50',.75*a);
   const sh=Math.min(1,p*1.6);vxArc(x,y+4,r*(.5+.7*sh),0,7,6*(1-sh)+1,'255,150,80',.6*(1-sh));
   for(let i=0;i<vxQ(14);i++){const aa=R()*6.283+spin*.3,d=r*(.6+p*.9+R()*.3);glowAt(x+Math.cos(aa)*d,y-6+Math.sin(aa)*d*.62,2+R()*2,R()<.5?'255,220,150':'255,120,60',.9*a)}})},
 dash(z,p,el,x,y,R){const L=z.len||120,ex=x+Math.cos(z.a)*L,ey=y+Math.sin(z.a)*L,a=1-p,nx=-Math.sin(z.a),ny=Math.cos(z.a);vxLG(()=>{
   const gr=g.createLinearGradient(x,y,ex,ey);gr.addColorStop(0,'rgba(255,120,60,0)');gr.addColorStop(.7,'rgba(255,170,90,'+.7*a+')');gr.addColorStop(1,'rgba(255,255,255,'+a+')');g.fillStyle=gr;
   const w=16*(1-p*.6);g.beginPath();g.moveTo(x,y-8);g.lineTo(ex+nx*w,ey-8+ny*w);g.lineTo(ex+Math.cos(z.a)*14,ey-8+Math.sin(z.a)*14);g.lineTo(ex-nx*w,ey-8-ny*w);g.closePath();g.fill();
   for(let i=1;i<=3;i++){const u=i/4,gx=x+(ex-x)*u,gy=y+(ey-y)*u;glowAt(gx,gy-10,16,'255,140,70',.35*a*(1-u*.4))}
   if(p<.6){const k=1-p/.6;g.strokeStyle='rgba(255,255,230,'+k+')';g.lineWidth=3;g.beginPath();g.moveTo(ex-18,ey-26);g.lineTo(ex+18,ey+6);g.moveTo(ex+18,ey-26);g.lineTo(ex-18,ey+6);g.stroke();glowAt(ex,ey-10,40*k+10,'255,200,120',.6*k)}
   for(let i=0;i<vxQ(8);i++){const u=R(),px=x+(ex-x)*u+nx*(R()-.5)*30,py=y+(ey-y)*u+ny*(R()-.5)*30+10-p*12;glowAt(px,py,3,'220,180,140',.4*a)}})},
 rage(z,p,el,x,y,R){const a=p<.12?p/.12:1-(p-.12)/.88;vxLG(()=>{glowAt(x,y-18,64,'255,50,20',.45*a);glowAt(x,y-20,26,'255,220,150',.5*a);vxArc(x,y+6,z.r*(.5+p*1.3),0,7,4*(1-p)+.5,'255,90,40',.55*(1-p));
   for(let i=0;i<vxQ(18);i++){const ph=(el*1.8+R())%1,aa=i/18*6.283+R()*.3,rx=Math.cos(aa)*(12+R()*8),ry=Math.sin(aa)*(6+R()*4),px=x+rx,py=y+2+ry,hh=(26+R()*30)*(1-ph*.6)*(.7+.3*a),w=5+R()*5;
     const gr=g.createLinearGradient(px,py,px,py-hh);gr.addColorStop(0,'rgba(255,60,20,'+.85*a+')');gr.addColorStop(.5,'rgba(255,150,40,'+.7*a+')');gr.addColorStop(1,'rgba(255,240,180,0)');g.fillStyle=gr;
     const sw=Math.sin(el*9+i)*4;g.beginPath();g.moveTo(px-w,py);g.quadraticCurveTo(px-w*.6+sw,py-hh*.55,px+sw*1.6,py-hh);g.quadraticCurveTo(px+w*.6+sw,py-hh*.55,px+w,py);g.closePath();g.fill()}
   for(let i=0;i<vxQ(10);i++){const ph=(el*1.1+R())%1;glowAt(x+(R()-.5)*44+Math.sin(el*3+i)*6,y-10-ph*70,2.2,'255,210,130',a*(1-ph))}})},
 roar(z,p,el,x,y,R){const r=z.r;vxLG(()=>{for(let i=0;i<3;i++){const q=Math.max(0,Math.min(1,(p-i*.12)/.7));if(q<=0||q>=1)continue;vxArc(x,y-4,r*q*1.2,0,7,(10-i*3)*(1-q)+1,i?'255,120,90':'255,220,200',.8*(1-q))}
   const a=1-p;for(let i=0;i<vxQ(24);i++){const aa=i/24*6.283+R()*.1,d0=r*(.3+p*.9),d1=d0+18+R()*26;g.strokeStyle='rgba(255,'+(170+R()*80|0)+',150,'+.7*a+')';g.lineWidth=2;g.beginPath();g.moveTo(x+Math.cos(aa)*d0,y-4+Math.sin(aa)*d0*.6);g.lineTo(x+Math.cos(aa)*d1,y-4+Math.sin(aa)*d1*.6);g.stroke()}
   glowAt(x,y-18,40*(1-p)+10,'255,90,60',.5*a)})},
 arrows(z,p,el,x,y,R){const r=z.r;vxLG(()=>{const a=p<.1?p/.1:1-Math.max(0,(p-.75)/.25);vxRune(x,y,r,el*1.4,'160,255,140',.55*a,8);
   for(let i=0;i<vxQ(18);i++){const st=R()*.6,q=(p-st)/.25;const ax=x+(R()-.5)*r*1.6,ay=y+(R()-.5)*r*.9;if(q<0)continue;if(q<1){const hy=ay-(1-q)*170,hx=ax-(1-q)*40;g.strokeStyle='rgba(200,255,170,.9)';g.lineWidth=2;g.beginPath();g.moveTo(hx,hy);g.lineTo(hx-10,hy-32);g.stroke();glowAt(hx,hy,7,'200,255,150',.8)}
     else if(q<2.2){const k=1-(q-1)/1.2;glowAt(ax,ay,14*k+3,'230,255,180',.8*k);g.strokeStyle='rgba(210,255,170,'+k+')';g.lineWidth=1.5;g.beginPath();g.ellipse(ax,ay,10*(2-k),4*(2-k),0,0,7);g.stroke()}}})},
 leap(z,p,el,x,y,R){const a=1-p;vxLG(()=>{for(let i=0;i<3;i++){const q=Math.min(1,p*1.4+i*.08);vxArc(x,y+6,26+q*60,el*6+i*2,el*6+i*2+3.6,4*(1-q)+1,'170,255,190',.7*(1-q))}
   for(let i=0;i<vxQ(12);i++){const aa=R()*6.283+el*3,d=20+p*90*R()+p*30,px=x+Math.cos(aa)*d,py=y+Math.sin(aa)*d*.5-p*30*R();g.save();g.translate(px,py);g.rotate(aa+el*8);g.fillStyle='rgba(150,240,160,'+.8*a+')';g.beginPath();g.ellipse(0,0,6,2.2,0,0,7);g.fill();g.restore()}
   glowAt(x,y,40*a+10,'170,255,190',.3*a)})},
 pin(z,p,el,x,y,R){const fl=.22;vxLG(()=>{if(p<fl){const q=p/fl,hx=z.sx+(x-z.sx)*q,hy=z.sy+(y-z.sy)*q-10,tx=z.sx+(x-z.sx)*Math.max(0,q-.35),ty=z.sy+(y-z.sy)*Math.max(0,q-.35)-10;
     const gr=g.createLinearGradient(tx,ty,hx,hy);gr.addColorStop(0,'rgba(180,140,255,0)');gr.addColorStop(1,'rgba(230,210,255,1)');g.strokeStyle=gr;g.lineWidth=4;g.beginPath();g.moveTo(tx,ty);g.lineTo(hx,hy);g.stroke();glowAt(hx,hy,12,'200,160,255',1)}
   else{const q=(p-fl)/(1-fl),a=1-q;glowAt(x,y-10,50*(1-q*.5),'170,110,255',.5*a);vxRune(x,y,z.r*.55*(.7+.3*Math.min(1,q*3)),-el*2,'190,150,255',.8*a,6);
     for(let i=0;i<4;i++){const aa=i*1.57+.78;g.strokeStyle='rgba(220,200,255,'+a+')';g.lineWidth=2.4;g.beginPath();g.moveTo(x+Math.cos(aa)*34,y+Math.sin(aa)*18);g.lineTo(x+Math.cos(aa)*12,y+Math.sin(aa)*6);g.stroke()}
     g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=3;g.beginPath();g.moveTo(x,y-46);g.lineTo(x,y);g.stroke()}})},
 mtrap(z,p,el,x,y,R){const r=z.r,a=p<.2?p/.2:1-Math.max(0,(p-.7)/.3);vxLG(()=>{vxRune(x,y,r*(.7+.3*Math.min(1,p*4)),el*.8,'170,210,255',.75*a,12);
   g.save();g.translate(x,y);g.scale(1,.55);g.fillStyle='rgba(210,230,255,'+.55*a+')';g.beginPath();g.arc(0,0,r*.42,0,7);g.arc(r*.16,-r*.08,r*.36,0,7,true);g.fill();g.restore();
   for(let i=0;i<vxQ(6);i++){const aa=i/6*6.283+el*.6,px=x+Math.cos(aa)*r*.8,py=y+Math.sin(aa)*r*.44;const gr=g.createLinearGradient(px,py,px,py-70);gr.addColorStop(0,'rgba(190,220,255,'+.5*a+')');gr.addColorStop(1,'rgba(190,220,255,0)');g.fillStyle=gr;g.fillRect(px-3,py-70,6,70);glowAt(px,py,6,'220,240,255',.8*a)}})},
 fire(z,p,el,x,y,R){const fl=.18;vxLG(()=>{if(p<fl){const q=p/fl,sx=x-120,sy=y-200,hx=sx+(x-sx)*q,hy=sy+(y-sy)*q;const gr=g.createLinearGradient(sx+(x-sx)*Math.max(0,q-.5),sy+(y-sy)*Math.max(0,q-.5),hx,hy);gr.addColorStop(0,'rgba(255,120,30,0)');gr.addColorStop(1,'rgba(255,220,120,1)');g.strokeStyle=gr;g.lineWidth=10;g.beginPath();g.moveTo(sx+(x-sx)*Math.max(0,q-.5),sy+(y-sy)*Math.max(0,q-.5));g.lineTo(hx,hy);g.stroke();glowAt(hx,hy,24,'255,180,80',1)}
   else{const q=(p-fl)/(1-fl),a=1-q;if(q<.25)glowAt(x,y-10,z.r*1.4*(q/.25),'255,250,220',(1-q/.25)*.9);for(let i=0;i<vxQ(12);i++){const aa=i/12*6.283+R()*.4,L=z.r*(.35+q*.9)*(.8+R()*.4),w=12*(1-q)+2,ex=x+Math.cos(aa)*L,ey=y-10+Math.sin(aa)*L*.6,mx=x+Math.cos(aa)*L*.45,my=y-10+Math.sin(aa)*L*.27,nx=-Math.sin(aa)*w,ny=Math.cos(aa)*w*.6;const gr=g.createLinearGradient(x,y-10,ex,ey);gr.addColorStop(0,'rgba(255,250,210,'+a+')');gr.addColorStop(.45,'rgba(255,150,40,'+.85*a+')');gr.addColorStop(1,'rgba(200,40,10,0)');g.fillStyle=gr;g.beginPath();g.moveTo(x,y-10);g.quadraticCurveTo(mx+nx,my+ny,ex,ey);g.quadraticCurveTo(mx-nx,my-ny,x,y-10);g.fill()}glowAt(x,y-10,z.r*(.6+q*.8),'255,110,30',.55*a);vxArc(x,y,z.r*(.3+q*1.1),0,7,7*a+1,'255,120,40',.75*a);vxArc(x,y,z.r*(.25+q*1.05),0,7,2,'255,240,190',.6*a);
     for(let i=0;i<vxQ(20);i++){const aa=R()*6.283,sp=.5+R(),d=z.r*q*sp*1.3,px=x+Math.cos(aa)*d,py=y-10+Math.sin(aa)*d*.6-q*q*30*R();glowAt(px,py,2.5+R()*2,R()<.5?'255,220,120':'255,120,40',a)}
     g.globalCompositeOperation='source-over';if(q>.35)for(let i=0;i<vxQ(6);i++){const aa=R()*6.283,d=z.r*.5*q+R()*20;g.fillStyle='rgba(60,40,30,'+.25*a*Math.min(1,(q-.35)*4)+')';g.beginPath();g.arc(x+Math.cos(aa)*d,y-14-q*30+Math.sin(aa)*d*.4,10+q*14,0,7);g.fill()}}})},
 chain(z,p,el,x,y,R){const P=z.pts&&z.pts.length>1?z.pts:[[x,y],[x+80,y]],a=1-p;vxLG(()=>{for(let f=0;f<2;f++){const RR=vxR(z.seed+((el*30)|0)*7+f);for(let i=1;i<P.length;i++)vxBolt(P[i-1][0],P[i-1][1]-14,P[i][0],P[i][1]-14,RR,26,2.4-f,'150,200,255',a*(f?.5:1))}
   for(const[px,py]of P){glowAt(px,py-14,28*a+8,'170,210,255',.7*a);for(let k=0;k<vxQ(3);k++){const aa=R()*6.283;g.strokeStyle='rgba(220,240,255,'+a+')';g.lineWidth=1.2;g.beginPath();g.moveTo(px,py-14);g.lineTo(px+Math.cos(aa)*16,py-14+Math.sin(aa)*16);g.stroke()}}})},
 rift(z,p,el,x,y,R){const r=z.r,a=Math.min(1,el*4)*(1-Math.max(0,(p-.85)/.15));vxLG(()=>{glowAt(x,y-6,r*.9,'150,80,255',.3*a);vxRune(x,y,r,el*1.2,'190,140,255',.7*a,12);vxRune(x,y,r*.6,-el*2,'230,200,255',.6*a,8);
   g.save();g.translate(x,y-4);g.scale(1,.55);g.strokeStyle='rgba(240,220,255,'+.9*a+')';g.lineWidth=3;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(el*3)*r*.5,Math.sin(el*3)*r*.5);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(el*.5)*r*.75,Math.sin(el*.5)*r*.75);g.stroke();g.restore();
   for(let i=0;i<vxQ(16);i++){const ph=(el*.7+R())%1,aa=R()*6.283+ph*3,d=r*(1-ph)*1.1;glowAt(x+Math.cos(aa)*d,y-4+Math.sin(aa)*d*.55,2.4,'210,170,255',.9*a*ph)}})},
 shadow(z,p,el,x,y,R){const a=1-p;g.save();for(let i=0;i<vxQ(10);i++){const aa=R()*6.283,d=8+p*(30+R()*40),px=x+Math.cos(aa)*d,py=y-12+Math.sin(aa)*d*.6-p*20*R();g.fillStyle='rgba(40,10,60,'+.45*a+')';g.beginPath();g.arc(px,py,8+p*16*R()+4,0,7);g.fill()}g.restore();
   vxLG(()=>{glowAt(x,y-14,30*a+10,'170,80,255',.5*a);if(z.tgt&&p<.6){const k=1-p/.6;g.strokeStyle='rgba(230,180,255,'+k+')';g.lineWidth=3;for(const s of[-1,1]){g.beginPath();g.moveTo(x-22,y-36*s-10+(s>0?0:-10));g.lineTo(x+22,y+16*s-10);g.stroke()}glowAt(x,y-12,36*k,'220,150,255',.6*k)}
   for(let i=0;i<vxQ(8);i++){const aa=R()*6.283,d=p*60*R();glowAt(x+Math.cos(aa)*d,y-14+Math.sin(aa)*d*.6,2,'220,170,255',a)}})},
 fog(z,p,el,x,y,R){const r=z.r,a=Math.min(1,el*3)*(1-Math.max(0,(p-.6)/.4));g.save();for(let i=0;i<vxQ(14);i++){const aa=R()*6.283+el*(.3+R()*.4),d=r*(.2+R()*.8),px=x+Math.cos(aa)*d,py=y+Math.sin(aa)*d*.55-8,s=18+R()*22;const gr=g.createRadialGradient(px,py,2,px,py,s);gr.addColorStop(0,'rgba(140,220,90,'+.32*a+')');gr.addColorStop(1,'rgba(90,160,60,0)');g.fillStyle=gr;g.fillRect(px-s,py-s,s*2,s*2)}g.restore();
   vxLG(()=>{for(let i=0;i<vxQ(10);i++){const ph=(el*.8+R())%1,px=x+(R()-.5)*r*1.4,py=y+(R()-.5)*r*.6-ph*30;g.strokeStyle='rgba(200,255,150,'+.7*a*(1-ph)+')';g.lineWidth=1.2;g.beginPath();g.arc(px,py,2+ph*3,0,7);g.stroke()}})},
 mark(z,p,el,x,y,R){const a=p<.15?p/.15:1-Math.max(0,(p-.7)/.3),cy=y-50,s=1+(p<.15?(1-p/.15)*.8:0);vxLG(()=>{glowAt(x,cy,30*s,'255,40,70',.5*a);
   g.save();g.translate(x,cy);g.scale(s,s);g.rotate(el*1.5);g.strokeStyle='rgba(255,90,110,'+a+')';g.lineWidth=2.4;g.beginPath();g.arc(0,0,18,0,7);g.stroke();for(let i=0;i<4;i++){g.rotate(1.57);g.beginPath();g.moveTo(0,-26);g.lineTo(0,-12);g.stroke()}
   g.rotate(-el*3);g.beginPath();for(let i=0;i<3;i++){const aa=i/3*6.283-1.57;g.lineTo(Math.cos(aa)*10,Math.sin(aa)*10)}g.closePath();g.fillStyle='rgba(255,140,160,'+a+')';g.fill();g.restore();
   for(let i=0;i<vxQ(6);i++){const aa=i/6*6.283,d=60*(1-Math.min(1,p*2));if(d<=2)continue;g.strokeStyle='rgba(255,120,140,'+.6*a+')';g.lineWidth=1.5;g.beginPath();g.moveTo(x+Math.cos(aa)*d,cy+Math.sin(aa)*d);g.lineTo(x+Math.cos(aa)*(d+16),cy+Math.sin(aa)*(d+16));g.stroke()}})},
 atk(z,p,el,x,y,R){const a=p<.1?p/.1:1-Math.max(0,(p-.6)/.4);vxLG(()=>{for(let i=0;i<2;i++){const q=Math.min(1,p*1.5-i*.25);if(q<=0)continue;vxArc(x,y+2,z.r*q,0,7,6*(1-q)+1,'255,210,110',.7*(1-q))}
   for(let i=0;i<vxQ(14);i++){const ph=(el*.6+R())%1,aa=R()*6.283,d=20+R()*z.r*.6,px=x+Math.cos(aa)*d,py=y+Math.sin(aa)*d*.5-ph*70;const s=5+R()*3;g.fillStyle='rgba(255,'+(200+R()*50|0)+',120,'+a*(1-ph)+')';g.font='bold '+(s*2|0)+'px serif';g.textAlign='center';g.fillText(['♪','✦','♫','✧'][i%4],px,py)}
   glowAt(x,y-16,46,'255,210,120',.3*a)})},
 sanct(z,p,el,x,y,R){const r=z.r,a=Math.min(1,el*3)*(1-Math.max(0,(p-.9)/.1));vxLG(()=>{const gr=g.createRadialGradient(x,y,4,x,y,r);gr.addColorStop(0,'rgba(255,230,150,'+.22*a+')');gr.addColorStop(1,'rgba(255,200,100,0)');g.fillStyle=gr;g.save();g.translate(x,y);g.scale(1,.55);g.beginPath();g.arc(0,0,r,0,7);g.fill();g.restore();
   vxRune(x,y,r,el*.5,'255,220,140',.6*a,16);g.save();g.translate(x,y);g.scale(1,.55);g.rotate(-el*.8);g.strokeStyle='rgba(255,240,190,'+.5*a+')';g.lineWidth=1.5;for(let i=0;i<12;i++){g.rotate(.5236);g.beginPath();g.moveTo(r*.3,0);g.lineTo(r*.7,0);g.stroke()}g.restore();
   for(let i=0;i<vxQ(10);i++){const ph=(el*.5+R())%1,aa=R()*6.283,d=R()*r*.9;glowAt(x+Math.cos(aa)*d,y+Math.sin(aa)*d*.55-ph*60,2.4,'255,240,180',a*Math.sin(ph*3.14))}})}};
function vxDraw(){if(!VXL.length)return;const t=vxT(),cap=(typeof FQ!=='undefined'&&FQ.avg>20)||LOWQ?6:14;let n=0;g.save();for(let i=VXL.length-1;i>=0;i--){if(n>=cap)break;const z=VXL[i],el=t-z.t0,p=el/z.d;if(p>=1||el<0){VXL.splice(i,1);continue}const [x,y]=vxPos(z);if(!palVis(x,y,z.r+200))continue;
  n++;try{VXD[z.k](z,p,el,x,y,vxR(z.seed))}catch(e){VXL.splice(i,1)}}g.restore()}
setTimeout(()=>{try{const _hf=handleFx;window.handleFx=handleFx=function(o){const r=_hf.apply(this,arguments);try{if(o&&VXN[o.k]&&!(typeof CFGV!=='undefined'&&CFGV.vfx===0))vxAdd(o)}catch(e){}return r}}catch(e){console.warn('vx hf',e)}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){_dn();try{vxDraw()}catch(e){}}}catch(e){console.warn('vx draw',e)}
  try{const _em=enterMap;window.enterMap=enterMap=function(){VXL.length=0;return _em.apply(this,arguments)}}catch(e){}},90);
