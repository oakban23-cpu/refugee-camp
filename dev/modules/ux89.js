
/* ===== v484 · คลังสกิล (ส่วนภาพ): เอฟเฟกต์ · ไอคอน · เสียง ของสกิลทางเลือก 10 แบบ =====
   ภาพทุกอันส่งผ่าน fx() เดิม → เพื่อนเห็นเหมือนกัน · ตำแหน่งกระสุนคิดจากเวลา (ตรงกับที่คิดดาเมจฝั่งคนร่าย)
   q8wave คลื่นเสี้ยวจันทร์ · q8boom ดาบบูมเมอแรง · q8fan ลูกธนูพัด · q8pop ระเบิดเล็ก · q8flag ธงล่า · q8lance หอกน้ำแข็ง
   q8blink วาร์ป · q8shur ดาวกระจาย · q8hook ตะขอโซ่ · q8bar โล่แสง · q8ham ค้อนพิพากษา */
const q8eo=x=>1-(1-x)*(1-x),q8ei=x=>x*x,q8c=(x,a,b)=>Math.max(0,Math.min(1,(x-a)/(b-a)));
function q8Own(f){try{const o=f.by===uid?me:(typeof others!=='undefined'&&others[f.by]);return o&&typeof o.x==='number'?{x:o.x,y:o.y}:null}catch(e){return null}}
/* วิถีดาบบูมเมอแรง: ออกไป (ช้าลง) → ลอยหมุน → กลับหาเจ้าของ (เร็วขึ้น) */
function q8BoomPos(x0,y0,a,L,tO,hv,tB,t,own){if(t<tO){const q=q8eo(t/tO);return[x0+Math.cos(a)*L*q,y0+Math.sin(a)*L*q,0]}const ex=x0+Math.cos(a)*L,ey=y0+Math.sin(a)*L;if(t<tO+hv)return[ex,ey,1];
  const q=q8ei(Math.min(1,(t-tO-hv)/Math.max(.05,tB))),ox=own?own.x:x0,oy=own?own.y:y0;return[ex+(ox-ex)*q,ey+(oy-ey)*q,2]}
function q8Blade(x,y,rot,s){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.lineJoin='round';
  g.fillStyle='#eef3f8';g.strokeStyle='#1a1010';g.lineWidth=.9;g.beginPath();g.moveTo(-3,-1.7);g.lineTo(12,-1.3);g.lineTo(15.5,0);g.lineTo(12,1.3);g.lineTo(-3,1.7);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.75)';g.fillRect(-2,-.7,13,.6);g.fillStyle='#c8a040';g.beginPath();g.roundRect(-4.8,-4.6,2.3,9.2,1);g.fill();g.stroke();
  g.fillStyle='#6a3a1a';g.fillRect(-10.4,-1.2,5.8,2.4);g.strokeRect(-10.4,-1.2,5.8,2.4);g.fillStyle='#c8a040';g.beginPath();g.arc(-11,0,1.6,0,7);g.fill();g.restore()}
function q8Star(x,y,rot,s,glow){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
  if(glow){g.globalCompositeOperation='lighter';glowAt(0,0,11,'190,120,255',.5);g.globalCompositeOperation='source-over'}
  const P=(R0,R1)=>{g.beginPath();for(let i=0;i<8;i++){const r=i%2?R1:R0,an=i*Math.PI/4;i?g.lineTo(Math.cos(an)*r,Math.sin(an)*r):g.moveTo(Math.cos(an)*r,Math.sin(an)*r)}g.closePath()};
  g.fillStyle='#3a3448';g.strokeStyle='#0e0a14';g.lineWidth=.8;P(7.6,2.3);g.fill();g.stroke();g.fillStyle='#cfc8e0';P(5.4,1.1);g.fill();
  g.fillStyle='#120e18';g.beginPath();g.arc(0,0,1.4,0,7);g.fill();g.restore()}
function q8Arrow(x,y,a,tl,col,al){g.save();g.translate(x,y);g.rotate(a);g.globalAlpha*=al;g.lineCap='round';
  g.globalCompositeOperation='lighter';g.strokeStyle='rgba('+col+',.55)';g.lineWidth=4;g.beginPath();g.moveTo(-tl,0);g.lineTo(-4,0);g.stroke();
  g.globalCompositeOperation='source-over';g.strokeStyle='#5a3a1a';g.lineWidth=1.5;g.beginPath();g.moveTo(-16,0);g.lineTo(-3,0);g.stroke();
  g.fillStyle='#e8eef4';g.strokeStyle='#1a1010';g.lineWidth=.6;g.beginPath();g.moveTo(1.5,0);g.lineTo(-4,-2.4);g.lineTo(-4,2.4);g.closePath();g.fill();g.stroke();
  g.fillStyle='#f4f0e0';g.beginPath();g.moveTo(-15,0);g.lineTo(-19,-2.6);g.lineTo(-13.5,0);g.lineTo(-19,2.6);g.closePath();g.fill();g.restore()}
Object.assign(FXB,{
 /* ฟันเสี้ยวจันทร์: คลื่นพลังรูปเสี้ยววิ่งไปข้างหน้า มีภาพติดตา */
 q8wave:(f,p,x,y,r,now)=>{const a=f.a,L=f.len||260,d=L*p,cx=x+Math.cos(a)*d,cy=y-8+Math.sin(a)*d,al=Math.min(1,(1-p)/.25),big=f.u==='b';
   g.save();g.globalCompositeOperation='lighter';
   const C1=big?'110,180,255':'255,130,50',C2=big?'215,240,255':'255,236,200';
   for(let j=2;j>=0;j--){const dd=d-j*(big?16:12);if(dd<0)continue;const k=j?(.34-j*.12):1;g.save();g.translate(x+Math.cos(a)*dd,y-8+Math.sin(a)*dd);g.rotate(a);const R=r;
     const gr=g.createLinearGradient(R*.35,0,R,0);gr.addColorStop(0,'rgba('+C1+',0)');gr.addColorStop(.55,'rgba('+C1+','+(.6*al*k)+')');gr.addColorStop(1,'rgba('+C2+','+(.95*al*k)+')');
     if(!j)g.globalCompositeOperation='source-over';g.fillStyle=gr;g.beginPath();g.arc(0,0,R,-1.15,1.15);g.arc(-R*.2,0,R*.98,1.0,-1.0,true);g.closePath();g.fill();
     if(!j){g.strokeStyle='rgba(255,255,255,'+(.95*al)+')';g.lineWidth=1.8;g.beginPath();g.arc(0,0,R-1,-1.05,1.05);g.stroke();g.strokeStyle='rgba('+(big?'30,70,140':'140,50,10')+','+(.45*al)+')';g.lineWidth=1;g.beginPath();g.arc(0,0,R+.6,-1.12,1.12);g.stroke();g.globalCompositeOperation='lighter'}g.restore()}
   glowAt(cx+Math.cos(a)*r*.7,cy+Math.sin(a)*r*.7,r*.8,big?'140,190,255':'255,140,60',.3*al);
   if(p<.2){const q=p/.2;g.strokeStyle='rgba(255,230,190,'+(1-q)+')';g.lineWidth=3*(1-q)+1;g.beginPath();g.arc(x,y-8,20+16*q,a-1.3,a+1.3);g.stroke()}
   for(let i=0;i<6;i++){const q=(p*2+fxR(f,i,1))%1,dd=d-q*44,s2=(fxR(f,i,2)-.5)*r*1.4;if(dd<0)continue;g.fillStyle='rgba(255,'+(180+fxR(f,i,3)*60|0)+',110,'+(al*(1-q))+')';g.beginPath();g.arc(x+Math.cos(a)*dd-Math.sin(a)*s2,y-8+Math.sin(a)*dd+Math.cos(a)*s2,1.7*(1-q)+.5,0,7);g.fill()}
   g.restore()},
 /* ดาบบูมเมอแรง: ดาบหมุนออกไปแล้ววนกลับหาเจ้าของ (u='h' ลอยหมุนค้างที่ปลายทาง) */
 q8boom:(f,p,x,y,r,now)=>{const tO=f.sx||.36,hv=f.sy||0,D=f.d||1,tB=Math.max(.1,D-tO-hv),t=p*D,P=q8BoomPos(x,y,f.a,f.len||220,tO,hv,tB,t,q8Own(f)),bx=P[0],by=P[1]-10,sp=now*24,al=Math.min(1,(1-p)/.06);
   g.save();g.globalCompositeOperation='lighter';glowAt(bx,by,22,'170,220,255',.35*al);
   g.strokeStyle='rgba(205,236,255,'+(.6*al)+')';g.lineWidth=2.2;for(let i=0;i<2;i++){g.beginPath();g.arc(bx,by,15,sp+i*Math.PI,sp+i*Math.PI+1.7);g.stroke()}
   if(P[2]===1){g.save();g.translate(bx,by+10);g.scale(1,.45);g.strokeStyle='rgba(170,220,255,'+(.45+.3*Math.sin(now*30))+')';g.lineWidth=1.8;g.beginPath();g.arc(0,0,46,0,7);g.stroke();
     g.strokeStyle='rgba(230,245,255,.5)';g.lineWidth=1;for(let i=0;i<3;i++){const an=-now*9+i*2.09;g.beginPath();g.arc(0,0,40,an,an+1);g.stroke()}g.restore()}
   g.globalCompositeOperation='source-over';g.globalAlpha=al;q8Blade(bx,by,sp,1.3);g.restore()},
 /* ยิงกระจาย: ลูกธนูหลายดอกเป็นรูปพัด (คนร่ายเห็นลูกหยุดตรงจุดที่โดน · f.st) */
 q8fan:(f,p,x,y,r,now)=>{const u=f.u||'5',n=parseInt(u)||5,ex=/x/.test(u),sp=f.sx||.87,L=f.len||230,d=L*p,al=Math.min(1,(1-p)/.2),col=ex?'255,150,60':'150,255,120';
   g.save();if(p<.2){g.globalCompositeOperation='lighter';glowAt(x+Math.cos(f.a)*10,y-10+Math.sin(f.a)*10,18,col,.6*(1-p/.2));g.globalCompositeOperation='source-over'}
   for(let i=0;i<n;i++){const an=f.a+(n>1?(i/(n-1)-.5)*sp:0),st=f.st&&f.st[i];if(st!=null&&d>st+4)continue;q8Arrow(x+Math.cos(an)*d,y-10+Math.sin(an)*d,an,Math.min(30,d),col,al)}
   g.restore()},
 /* ระเบิดเล็ก (u='i' = น้ำแข็ง) */
 q8pop:(f,p,x,y,r,now)=>{const C=f.u==='i'?['170,230,255','220,245,255']:f.u==='h'?['255,215,110','255,248,210']:f.u==='v'?['170,110,255','230,215,255']:['255,150,60','255,220,150'],k=1-p;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-6,r*(.6+p),C[0],.7*k);
   g.strokeStyle='rgba('+C[1]+','+k+')';g.lineWidth=2*k+.5;g.beginPath();g.ellipse(x,y,r*(.3+.8*p),r*(.3+.8*p)*.55,0,0,7);g.stroke();
   for(let i=0;i<7;i++){const an=fxR(f,i,1)*6.283,dd=r*.9*q8eo(p);g.fillStyle='rgba('+C[1]+','+k+')';g.beginPath();g.arc(x+Math.cos(an)*dd,y-6+Math.sin(an)*dd*.6-10*p,1.9*k+.4,0,7);g.fill()}g.restore()},
 /* ธงล่าเหยื่อ: ปักธงลงพื้น วงเขตรอบธง (u='a' อัสนี · 'b' ลมกรด) */
 q8flag:(f,p,x,y,r,now)=>{const D=f.d||7,t=p*D,v=f.u||'',al=Math.min(1,(D-t)/.4),drop=q8c(t,0,.22),C=v==='a'?['90,150,255','#2a4a9a','#ffd84a']:v==='b'?['80,210,190','#1e7a6a','#dfffe8']:['120,220,120','#2e7a3a','#ffe27a'];
   g.save();g.save();g.translate(x,y+4);g.scale(1,.42);g.globalAlpha=al;g.fillStyle='rgba('+C[0]+',.11)';g.beginPath();g.arc(0,0,r,0,7);g.fill();
   g.setLineDash([10,8]);g.lineDashOffset=-now*20;g.strokeStyle='rgba('+C[0]+',.8)';g.lineWidth=2.4;g.beginPath();g.arc(0,0,r*(t<.3?q8eo(t/.3):1),0,7);g.stroke();g.setLineDash([]);g.restore();
   if(t<.45){const q=t/.45;g.save();g.globalAlpha=1-q;g.strokeStyle='rgba(235,225,195,.85)';g.lineWidth=3*(1-q)+.5;g.beginPath();g.ellipse(x,y+4,10+44*q,(10+44*q)*.4,0,0,7);g.stroke();g.restore()}
   const py=y+4-(1-q8ei(drop))*80,top=py-50;g.globalAlpha=al;g.lineWidth=1;g.strokeStyle='#140a04';
   g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x+2,y+5,6,2.2,0,0,7);g.fill();
   g.fillStyle='#5a3a1e';g.fillRect(x-1.6,top,3.2,py-top);g.strokeRect(x-1.6,top,3.2,py-top);g.fillStyle='#e0c060';g.beginPath();g.arc(x,top-1.5,2.7,0,7);g.fill();g.stroke();
   const W=25,Hh=16,wv=u=>Math.sin(now*6-u*4)*2.6*u;g.beginPath();g.moveTo(x+1.6,top+2);for(let i=1;i<=6;i++){const u=i/6;g.lineTo(x+1.6+W*u,top+2+wv(u))}g.lineTo(x+1.6+W-4,top+2+Hh/2+wv(1));for(let i=6;i>=0;i--){const u=i/6;g.lineTo(x+1.6+W*u,top+2+Hh+wv(u))}g.closePath();
   g.fillStyle=C[1];g.fill();g.stroke();g.strokeStyle='rgba(255,230,150,.7)';g.lineWidth=.8;g.beginPath();g.moveTo(x+2,top+4);for(let i=1;i<=6;i++){const u=i/6;g.lineTo(x+1.6+W*u-2,top+4+wv(u))}g.stroke();
   const ex=x+1.6+W*.45,ey=top+2+Hh/2+wv(.45);g.fillStyle=C[2];g.strokeStyle=C[2];
   if(v==='a'){g.beginPath();g.moveTo(ex+1.4,ey-5.5);g.lineTo(ex-2.6,ey+.6);g.lineTo(ex,ey+.6);g.lineTo(ex-1.2,ey+5.5);g.lineTo(ex+2.8,ey-1);g.lineTo(ex+.3,ey-1);g.closePath();g.fill()}
   else if(v==='b'){g.lineWidth=1.3;g.beginPath();g.arc(ex,ey,3.6,0,4.8);g.stroke();g.beginPath();g.arc(ex,ey,1.6,0,4.8);g.stroke()}
   else{g.beginPath();g.ellipse(ex,ey,4.8,3,0,0,7);g.fill();g.fillStyle='#1a1a1a';g.beginPath();g.arc(ex,ey,1.6,0,7);g.fill()}
   g.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const q=(now*.5+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283,rr=r*Math.sqrt(fxR(f,i,3));g.fillStyle='rgba('+C[0]+','+(.6*al*Math.sin(q*Math.PI))+')';g.beginPath();g.arc(x+Math.cos(an)*rr,y+4+Math.sin(an)*rr*.42-q*26,1.5,0,7);g.fill()}
   if(v==='b'){g.strokeStyle='rgba(200,255,240,'+(.4*al)+')';g.lineWidth=1.3;for(let i=0;i<3;i++){const an=now*2.4+i*2.09;g.beginPath();g.ellipse(x,y-6,r*.6,r*.22,0,an,an+1.2);g.stroke()}}
   if(v==='a'&&Math.sin(now*13)>.7){g.strokeStyle='rgba(255,240,150,.8)';g.lineWidth=1;g.beginPath();g.moveTo(x,top-3);g.lineTo(x+4,top-8);g.lineTo(x+1,top-10);g.lineTo(x+5,top-15);g.stroke()}
   g.restore()},
 /* หอกน้ำแข็ง: แท่งผลึกพุ่งทะลุแนว แล้วแตกกระจายที่ปลาย */
 q8lance:(f,p,x,y,r,now)=>{const a=f.a,L=f.len||340,T=.85,d=L*Math.min(1,p/T),cx=x+Math.cos(a)*d,cy=y-10+Math.sin(a)*d,end=p>T,al=end?1-(p-T)/(1-T):1;
   g.save();g.globalCompositeOperation='lighter';
   for(let i=0;i<9;i++){const q=fxR(f,i,1),dd=d-12-q*Math.min(d,100),off=(fxR(f,i,2)-.5)*10;if(dd<0)continue;g.fillStyle='rgba(170,230,255,'+(.35*al*(1-q))+')';g.beginPath();g.arc(x+Math.cos(a)*dd-Math.sin(a)*off,y-10+Math.sin(a)*dd+Math.cos(a)*off,3*(1-q)+1,0,7);g.fill()}
   if(!end){glowAt(cx,cy,26,'150,220,255',.65);g.save();g.translate(cx,cy);g.rotate(a);g.scale(1.45,1.35);const gr=g.createLinearGradient(-30,0,12,0);gr.addColorStop(0,'rgba(120,200,255,0)');gr.addColorStop(.5,'rgba(170,230,255,.9)');gr.addColorStop(1,'rgba(255,255,255,1)');
     g.fillStyle=gr;g.beginPath();g.moveTo(13,0);g.lineTo(-4,-4.4);g.lineTo(-32,0);g.lineTo(-4,4.4);g.closePath();g.fill();g.globalCompositeOperation='source-over';g.strokeStyle='rgba(40,90,140,.9)';g.lineWidth=.8;g.beginPath();g.moveTo(13,0);g.lineTo(-4,-4.4);g.lineTo(-15,0);g.lineTo(-4,4.4);g.closePath();g.stroke();
     g.fillStyle='#ffffff';g.beginPath();g.moveTo(11,0);g.lineTo(-2,-1.5);g.lineTo(-11,0);g.lineTo(-2,1.5);g.closePath();g.fill();g.restore()}
   else{const q=(p-T)/(1-T),ex=x+Math.cos(a)*L,ey=y-10+Math.sin(a)*L;glowAt(ex,ey,18*(1-q)+6,'170,230,255',.6*(1-q));g.fillStyle='rgba(220,245,255,'+(1-q)+')';
     for(let i=0;i<8;i++){const an=fxR(f,i,4)*6.283,dd=20*q8eo(q);g.beginPath();g.moveTo(ex+Math.cos(an)*dd,ey+Math.sin(an)*dd);g.lineTo(ex+Math.cos(an+.2)*(dd-5),ey+Math.sin(an+.2)*(dd-5));g.lineTo(ex+Math.cos(an-.2)*(dd-5),ey+Math.sin(an-.2)*(dd-5));g.closePath();g.fill()}}
   g.restore()},
 /* วาร์ปพริบตา: จุดเดิมยุบหาย (sx,sy) → จุดใหม่วงเวทกระจาย (x,y) */
 q8blink:(f,p,x,y,r,now)=>{const ox=f.sx,oy=f.sy;g.save();g.globalCompositeOperation='lighter';
   const q1=q8c(p,0,.5);if(q1<1){glowAt(ox,oy-12,30*(1-q1)+8,'180,140,255',.7*(1-q1));g.strokeStyle='rgba(200,170,255,'+(1-q1)+')';g.lineWidth=2;g.beginPath();g.ellipse(ox,oy+6,r*(1-q1*.7),r*(1-q1*.7)*.45,0,0,7);g.stroke();
     g.fillStyle='rgba(220,200,255,'+(.5*(1-q1))+')';g.fillRect(ox-3*(1-q1),oy-40,6*(1-q1),46)}
   if(p<.32){const q=p/.32;for(let i=0;i<12;i++){const u=fxR(f,i,1),px=ox+(x-ox)*u,py=oy+(y-oy)*u-10+(fxR(f,i,2)-.5)*12;g.fillStyle='rgba(205,185,255,'+((1-q)*.85)+')';g.beginPath();g.arc(px,py,1.9,0,7);g.fill()}}
   const q2=q8c(p,.04,1);glowAt(x,y-12,26*(1-q2)+6,'150,200,255',.6*(1-q2));g.strokeStyle='rgba(170,210,255,'+(1-q2)+')';g.lineWidth=2.4*(1-q2)+.6;g.beginPath();g.ellipse(x,y+6,r*q8eo(q2),r*q8eo(q2)*.45,0,0,7);g.stroke();
   g.save();g.translate(x,y+6);g.scale(1,.45);g.rotate(now*2);g.strokeStyle='rgba(200,180,255,'+(.7*(1-q2))+')';g.lineWidth=1.3;g.beginPath();for(let i=0;i<=5;i++){const an=i*2.513;i?g.lineTo(Math.cos(an)*r*.62,Math.sin(an)*r*.62):g.moveTo(Math.cos(an)*r*.62,Math.sin(an)*r*.62)}g.stroke();g.restore();
   g.restore()},
 /* ดาวกระจาย: ดาวกระจายหมุนเร็ว (u='3' · '3r' บินกลับ · 'g' ดาวยักษ์) */
 q8shur:(f,p,x,y,r,now)=>{const u=f.u||'3',gi=u==='g',ret=/r/.test(u),n=gi?1:(parseInt(u)||3),sp=f.sx||.44,L=f.len||260,D=f.d||.4,own=q8Own(f),tO=ret?D*.5:D,t=p*D;g.save();
   for(let i=0;i<n;i++){const an=f.a+(n>1?(i/(n-1)-.5)*sp:0),st=f.st&&f.st[i];let px,py;
     if(t<=tO||!ret){const q=Math.min(1,t/tO);if(st!=null&&!ret&&L*q>st+6)continue;const dd=st!=null?Math.min(L*q,st):L*q;px=x+Math.cos(an)*dd;py=y-10+Math.sin(an)*dd}
     else{const q=q8ei((t-tO)/(D-tO)),dd=st!=null?Math.min(L,st):L,ex=x+Math.cos(an)*dd,ey=y-10+Math.sin(an)*dd,ox=own?own.x:x,oy=(own?own.y:y)-10;px=ex+(ox-ex)*q;py=ey+(oy-ey)*q}
     if(!gi){g.globalCompositeOperation='lighter';g.strokeStyle='rgba(190,140,255,.35)';g.lineWidth=3;g.beginPath();g.moveTo(px-Math.cos(an)*14,py-Math.sin(an)*14);g.lineTo(px,py);g.stroke();g.globalCompositeOperation='source-over'}
     q8Star(px,py,now*30,gi?2.2:1,1)}
   g.restore()},
 /* ตะขอเงา: โซ่พุ่งไปที่ (sx,sy) แล้วดึงกลับ (u='s' ดึงตัวเราไปหา · 'm' พลาด) */
 q8hook:(f,p,x,y,r,now)=>{const own=q8Own(f)||{x,y},hx=f.sx,hy=f.sy,self=f.u==='s',T=.32;let tx,ty;
   if(p<T){const q=q8eo(p/T);tx=x+(hx-x)*q;ty=y+(hy-y)*q}else if(self){tx=hx;ty=hy}else{const q=q8ei(q8c(p,T,1));tx=hx+(own.x-hx)*q;ty=hy+(own.y-hy)*q}
   const sx=own.x,sy=own.y-8,ex=tx,ey=ty-8,L=Math.hypot(ex-sx,ey-sy),a=Math.atan2(ey-sy,ex-sx),al=Math.min(1,(1-p)/.12);if(L<4)return;
   g.save();g.globalAlpha=al;g.globalCompositeOperation='lighter';g.strokeStyle='rgba(170,110,255,.35)';g.lineWidth=5;g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.stroke();g.globalCompositeOperation='source-over';
   const N=Math.max(1,Math.floor(L/6));for(let i=0;i<N;i++){const u=(i+.5)/N,px=sx+(ex-sx)*u,py=sy+(ey-sy)*u+Math.sin(u*Math.PI)*(p<T?4:1);g.save();g.translate(px,py);g.rotate(a+(i%2?Math.PI/2:0));g.strokeStyle='#241e2c';g.lineWidth=2.6;g.beginPath();g.ellipse(0,0,2.7,1.5,0,0,7);g.stroke();g.strokeStyle='#9890a8';g.lineWidth=1;g.stroke();g.restore()}
   g.save();g.translate(ex,ey);g.rotate(a);g.lineCap='round';g.strokeStyle='#1a1420';g.lineWidth=3.6;g.beginPath();g.moveTo(-4,0);g.lineTo(4,0);g.moveTo(4,0);g.arc(4,-4.2,4.2,Math.PI/2,-Math.PI*.2,true);g.moveTo(4,0);g.arc(4,4.2,4.2,-Math.PI/2,Math.PI*.2);g.stroke();
   g.strokeStyle='#d0c8e0';g.lineWidth=1.4;g.stroke();g.restore();
   if(p>.26&&p<.48&&f.u!=='m'){g.globalCompositeOperation='lighter';glowAt(hx,hy-8,20,'200,140,255',.8*(1-q8c(p,.26,.48)))}
   g.restore()},
 /* โล่แสง: โดมทองกระจายออก ลายหกเหลี่ยม */
 q8bar:(f,p,x,y,r,now)=>{const k=1-p,R=r*q8eo(Math.min(1,p*2.2));g.save();g.globalCompositeOperation='lighter';
   g.save();g.translate(x,y);g.scale(1,.5);const gr=g.createRadialGradient(0,0,R*.2+1,0,0,R+1);gr.addColorStop(0,'rgba(255,240,170,0)');gr.addColorStop(.85,'rgba(255,220,120,'+(.16*k)+')');gr.addColorStop(1,'rgba(255,250,210,'+(.55*k)+')');g.fillStyle=gr;g.beginPath();g.arc(0,0,R+1,0,7);g.fill();
   g.strokeStyle='rgba(255,236,170,'+(.55*k)+')';g.lineWidth=1.2;for(let i=0;i<6;i++){const an=i*1.047+now*.6,cx=Math.cos(an)*R*.55,cy=Math.sin(an)*R*.55;g.beginPath();for(let j=0;j<=6;j++){const b=j*1.047;j?g.lineTo(cx+Math.cos(b)*R*.18,cy+Math.sin(b)*R*.18):g.moveTo(cx+Math.cos(b)*R*.18,cy+Math.sin(b)*R*.18)}g.stroke()}g.restore();
   g.strokeStyle='rgba(255,240,190,'+(.7*k)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y,R,R*.55,0,Math.PI,0);g.stroke();g.strokeStyle='rgba(255,250,220,'+(.35*k)+')';g.lineWidth=1;g.beginPath();g.ellipse(x,y,R*.62,R*.5,0,Math.PI,0);g.stroke();
   for(let i=0;i<10;i++){const q=(p*1.3+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283,rr=R*fxR(f,i,3);g.fillStyle='rgba(255,240,180,'+(k*(1-q))+')';g.beginPath();g.arc(x+Math.cos(an)*rr,y+Math.sin(an)*rr*.5-q*40,1.7,0,7);g.fill()}
   g.restore()},
 /* ค้อนพิพากษา: ค้อนทองตกจากฟ้า กระแทกพื้นเป็นคลื่น (u='b' ค้อนใหญ่) */
 q8ham:(f,p,x,y,r,now)=>{const D=f.d||1,t=p*D,S=f.u==='b'?1.35:f.u==='s'?.75:1,ti=.34,fall=q8c(t,0,ti),al=Math.min(1,(D-t)/.25);
   g.save();
   if(t<ti){g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,230,140,'+(.3+.5*fall)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+4,r*(.5+.5*fall),r*(.5+.5*fall)*.42,0,0,7);g.stroke();g.globalCompositeOperation='source-over'}
   else{const q=q8c(t,ti,ti+.45);g.globalCompositeOperation='lighter';glowAt(x,y-6,r*1.1,'255,220,120',.7*(1-q));
     for(let i=0;i<3;i++){const qq=Math.min(1,q*1.2+i*.12);g.strokeStyle='rgba(255,240,180,'+(.9*(1-qq))+')';g.lineWidth=4*(1-qq)+1;g.beginPath();g.ellipse(x,y+4,r*(.3+qq*1.1),r*(.3+qq*1.1)*.42,0,0,7);g.stroke()}
     const ph=q8c(t,ti,ti+.3);g.fillStyle='rgba(255,245,200,'+(.55*(1-ph))+')';g.fillRect(x-10*S*(1-ph),y-170,20*S*(1-ph),174);g.globalCompositeOperation='source-over';
     for(let i=0;i<9;i++){const an=fxR(f,i,1)*6.283,dd=r*.9*q8eo(q),hh=(60*q-60*q*q)*(.5+fxR(f,i,2));g.fillStyle='rgba(150,120,90,'+(1-q)+')';g.beginPath();g.arc(x+Math.cos(an)*dd,y+4+Math.sin(an)*dd*.42-hh,2.3,0,7);g.fill()}}
   const hy=y-8-(1-q8ei(fall))*170,rot=-.5*(1-fall);g.globalAlpha=al;g.save();g.translate(x,hy);g.rotate(rot);g.scale(S,S);
   g.globalCompositeOperation='lighter';glowAt(0,-10,28,'255,220,120',.55);g.globalCompositeOperation='source-over';
   g.fillStyle='#6a4520';g.strokeStyle='#1a1008';g.lineWidth=1.2;g.fillRect(-2.5,-50,5,42);g.strokeRect(-2.5,-50,5,42);g.fillStyle='#e8c060';g.fillRect(-3.2,-42,6.4,2.5);g.fillRect(-3.2,-30,6.4,2.5);
   const gr=g.createLinearGradient(0,-16,0,4);gr.addColorStop(0,'#fff2b0');gr.addColorStop(1,'#c89020');g.fillStyle=gr;g.beginPath();g.roundRect(-18,-16,36,20,4);g.fill();g.stroke();
   g.fillStyle='rgba(255,255,255,.75)';g.fillRect(-15,-14,30,3);g.strokeStyle='#a87010';g.lineWidth=1.2;g.beginPath();g.moveTo(0,-12);g.lineTo(0,0);g.moveTo(-5,-6.5);g.lineTo(5,-6.5);g.stroke();
   g.restore();g.restore()}});
try{Object.assign(R27D,{q8wave:1,q8boom:1,q8fan:1,q8flag:1,q8lance:1,q8shur:1,q8hook:1,q8ham:1})}catch(e){}
setTimeout(()=>{try{Object.assign(FXD,{q8pop:.42,q8blink:.6,q8bar:.9,q8ham:1})}catch(e){}},0);
/* ---------- ไอคอนสกิล (32×32 สไตล์เดียวกับของเดิม) ---------- */
const Q8SVG={
 mw:'<defs><linearGradient id="q" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff6a30"/><stop offset="1" stop-color="#fff4d0"/></linearGradient></defs><path d="M11 3Q31 16 11 29Q23 16 11 3Z" fill="url(#q)" stroke="#a83a10" stroke-width="1"/><g stroke="#ffb070" stroke-linecap="round"><path d="M3 11h6" stroke-width="1.6"/><path d="M2 16h8" stroke-width="2.2"/><path d="M3 21h6" stroke-width="1.6"/></g><circle cx="26" cy="9" r="1.4" fill="#fff"/>',
 mb:'<g fill="none" stroke="#9ad8ff" stroke-linecap="round"><path d="M5 11a12 12 0 0 1 15-7" stroke-width="2.2"/><path d="M27 21a12 12 0 0 1-15 7" stroke-width="2.2"/></g><g transform="rotate(-40 16 16)"><path d="M15 3.5h2.2l.9 14.5h-4z" fill="#eef3f8" stroke="#1a1010" stroke-width=".8"/><rect x="11.4" y="18" width="9.2" height="2.3" rx="1" fill="#c8a040" stroke="#1a1010" stroke-width=".7"/><rect x="15" y="20.3" width="2" height="5" fill="#6a3a1a"/><circle cx="16" cy="26" r="1.3" fill="#c8a040"/></g><path d="M25 5l1.6 2.6M28 9l-2.8.4" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>',
 af:'<g stroke-linecap="round"><g stroke="#9cff7a" stroke-width="1.4" opacity=".55"><path d="M4 28L26 6"/><path d="M4 28L29 14"/><path d="M4 28L18 3"/></g><g stroke="#6a4a2a" stroke-width="1.6"><path d="M6 26l16-16"/><path d="M6 26l19-9"/><path d="M6 26l9-19"/></g></g><g fill="#e8eef4" stroke="#1a1010" stroke-width=".6"><path d="M26 6l-5 1.2 3.8 3.8z"/><path d="M29 14.4l-5-1.6 1 5.2z"/><path d="M18 3l-3.8 3.4 4.8 1.4z"/></g><g fill="#f4f0e0"><path d="M4 28l3-1-1-2z"/></g>',
 ag:'<ellipse cx="15" cy="27" rx="11" ry="3.2" fill="none" stroke="#9cff7a" stroke-width="1.4" stroke-dasharray="3 2.4"/><rect x="9" y="4" width="2.4" height="23" rx="1" fill="#7a5030" stroke="#1a1010" stroke-width=".7"/><circle cx="10.2" cy="3.6" r="1.8" fill="#e0c060" stroke="#1a1010" stroke-width=".6"/><path d="M11.4 5.5Q19 3.5 26 7L23 11.5L26 16Q19 13 11.4 15Z" fill="#2e7a3a" stroke="#1a1010" stroke-width=".8"/><ellipse cx="18.4" cy="10.2" rx="3.2" ry="2" fill="#ffe27a"/><circle cx="18.4" cy="10.2" r="1" fill="#1a1a1a"/>',
 gl:'<defs><linearGradient id="q" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#5ab0ff" stop-opacity="0"/><stop offset=".55" stop-color="#9ad8ff"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><path d="M28 4L19 9.5L5 27L21.5 12.5Z" fill="url(#q)" stroke="#1d4a7a" stroke-width=".9"/><path d="M27 5l-6 4.6-2 3.4" stroke="#fff" stroke-width="1" fill="none"/><g fill="#cfefff"><circle cx="8" cy="19" r="1.2"/><circle cx="12" cy="25" r="1"/><circle cx="5" cy="22" r=".8"/></g>',
 gb:'<ellipse cx="8.5" cy="24" rx="5.5" ry="2.2" fill="none" stroke="#b48aff" stroke-width="1.4" stroke-dasharray="2 1.6"/><ellipse cx="23.5" cy="12" rx="6" ry="2.4" fill="none" stroke="#9ad8ff" stroke-width="1.8"/><path d="M10 21Q14 13 20 12.5" fill="none" stroke="#e0d0ff" stroke-width="1.4" stroke-dasharray="1.6 2" stroke-linecap="round"/><path d="M18 10.5l3 2-3.4 1.4z" fill="#e0d0ff"/><g fill="#fff"><path d="M23.5 4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><circle cx="29" cy="8" r=".9"/></g><rect x="7.6" y="14" width="1.8" height="9" fill="#cdb8ff" opacity=".6"/>',
 nf:'<g stroke="#b48aff" stroke-width="1.2" opacity=".6" stroke-linecap="round"><path d="M3 22l7-3"/><path d="M3 16h7"/><path d="M4 9l6 3"/></g><g fill="#3a3448" stroke="#0e0a14" stroke-width=".6"><path d="M16 3.5l1.3 3.6 3.7 1.3-3.7 1.3-1.3 3.7-1.3-3.7-3.7-1.3 3.7-1.3z"/><path d="M24 12.5l1.3 3.6 3.7 1.3-3.7 1.3-1.3 3.7-1.3-3.7-3.7-1.3 3.7-1.3z"/><path d="M16 19.5l1.3 3.6 3.7 1.3-3.7 1.3-1.3 3.7-1.3-3.7-3.7-1.3 3.7-1.3z"/></g><g fill="#cfc8e0"><circle cx="16" cy="8.4" r="1"/><circle cx="24" cy="17.4" r="1"/><circle cx="16" cy="24.4" r="1"/></g>',
 nh:'<g fill="none" stroke-linecap="round"><path d="M4 27Q10 18 18 13" stroke="#6a6278" stroke-width="3.4" stroke-dasharray="2.4 1.2"/><path d="M4 27Q10 18 18 13" stroke="#b48aff" stroke-width="1" opacity=".7"/><path d="M18 13l6-4" stroke="#1a1420" stroke-width="3"/><path d="M24 9a4 4 0 1 1 3.6 5.6" stroke="#1a1420" stroke-width="3"/><path d="M24 9a4 4 0 1 0-5.4 2.6" stroke="#1a1420" stroke-width="3"/><path d="M24 9a4 4 0 1 1 3.6 5.6M24 9a4 4 0 1 0-5.4 2.6" stroke="#d0c8e0" stroke-width="1.2"/></g>',
 sb:'<path d="M16 3L27 8V16Q27 24 16 29Q5 24 5 16V8Z" fill="#fff0b0" fill-opacity=".35" stroke="#ffd66a" stroke-width="1.8"/><g fill="none" stroke="#ffe8a0" stroke-width="1"><path d="M16 9l4 2.3v4.6L16 18.2 12 15.9v-4.6z"/><path d="M16 18.2v4.4M20 15.9l3.6 2.1M12 15.9l-3.6 2.1M20 11.3l3.4-2M12 11.3l-3.4-2"/></g><circle cx="16" cy="13.6" r="1.6" fill="#fff"/>',
 sh:'<g stroke="#fff2b0" stroke-width="1.2" stroke-linecap="round" opacity=".8"><path d="M16 2v4"/><path d="M6 6l2.6 2.6"/><path d="M26 6l-2.6 2.6"/></g><g transform="rotate(-25 16 18)"><rect x="14.6" y="12" width="2.8" height="17" rx="1" fill="#6a4520" stroke="#1a1008" stroke-width=".7"/><rect x="8" y="7" width="16" height="9" rx="2" fill="#f0c860" stroke="#1a1008" stroke-width=".9"/><rect x="9.5" y="8" width="13" height="1.6" fill="#fff8d0"/><path d="M16 9.6v4.6M13.6 11.9h4.8" stroke="#a87010" stroke-width="1"/></g><ellipse cx="16" cy="28.4" rx="9" ry="2" fill="none" stroke="#ffe08a" stroke-width="1.2"/>'};
const Q8IMG={};Object.keys(Q8SVG).forEach(k=>{Q8IMG[k]='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'+Q8SVG[k]+'</svg>')});
/* ---------- เสียง ---------- */
const Q8SFX={
 mw:()=>{sWhoosh(.24,.34,500,3200);sWhoosh(.2,.22,900,2600,.08);sShim(1500,.35,.05,.05,6)},
 mb:()=>{for(let i=0;i<5;i++)sWhoosh(.11,.2,700,2500,i*.08,i%2?.5:-.5);sMetal(700,.3,.06,.02)},
 af:()=>{sTwang(.3);for(let i=0;i<5;i++)sArrow(.1,.04+i*.025,(i-2)*.35)},
 ag:()=>{sBoom(130,.3,.3,.18);sO('sine',520,980,.3,.07,{dl:.05});sN(.5,.12,{ft:'bandpass',f0:700,f1:1100,q:2,at:.1,dl:.15})},
 gl:()=>{for(let i=0;i<6;i++){const f=2600+i*320;sO('sine',f,f*1.02,.14,.05,{dl:i*.025,rv:.4})}sCrack(.3,.02,3200);sN(.3,.15,{ft:'highpass',f0:4200,dl:.05})},
 gb:()=>{sO('sine',1400,220,.24,.1);sShim(2200,.45,.06,.05,8);sBoom(160,.2,.25,.12)},
 nf:()=>{for(let i=0;i<3;i++)sShing(.18,i*.05,(i-1)*.6);sN(.2,.12,{ft:'highpass',f0:3000,dl:.02})},
 nh:()=>{for(let i=0;i<7;i++)sMetal(900+i*70,.07,.05,i*.03);sCrack(.25,.2,1800)},
 sb:()=>{sChoir([392,494,587],.9,.05);sShim(1800,.8,.05,.1,10)},
 sh:()=>{sO('sine',1600,400,.35,.06,{rv:.4});sBell(330,1,.14,.32);sBoom(90,.5,.45,.34);sCrack(.4,.34,1500)}};
