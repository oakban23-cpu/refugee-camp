
/* ===== v486 · อัลติทางเลือก (ส่วนภาพ): เอฟเฟกต์ · ไอคอน · เสียง =====
   q8av ร่างอสูร (ไฟลุกรอบตัว) · q8cone คลื่นกระแทกรูปพัด · q8sky ปีกแสงตอนเหินฟ้า · q8sar ศรดิ่งจากฟ้า · q8drg มังกรอัคคี/น้ำแข็ง
   q8moon ประทับจันทร์ · q8mcut ฟันจันทร์เสี้ยว · q8chn โซ่ตรวนสวรรค์ · q8hlr คลื่นฮีลจากโซ่ · q8vul (ไม่มีภาพ ใช้ส่งช่องโหว่ดาเมจ) */
function q8Lp(f){if(!f.lp)f.lp={};const L=[];(f.pts||[]).forEach((q,i)=>{const m=mons.find(o=>o.id===q[0]);if(m&&m.hp>0)f.lp[i]=[m.x,m.y];if(f.lp[i])L.push(f.lp[i])});return L}
function q8Wing(x,y,sd,s,fl,al,C){g.save();g.translate(x,y);g.scale(sd*s,s);g.rotate(-.25+.18*Math.sin(fl));g.globalAlpha*=al;
  const gr=g.createLinearGradient(0,0,46,-30);gr.addColorStop(0,'rgba(255,250,225,.95)');gr.addColorStop(1,'rgba('+C+',.15)');g.fillStyle=gr;g.strokeStyle='rgba(255,236,170,.85)';g.lineWidth=1;
  g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(14,-34,48,-40);g.quadraticCurveTo(40,-28,44,-22);g.quadraticCurveTo(34,-16,38,-10);g.quadraticCurveTo(26,-6,28,0);g.quadraticCurveTo(14,4,0,6);g.closePath();g.fill();g.stroke();
  g.strokeStyle='rgba(255,240,190,.6)';g.lineWidth=.8;for(let i=0;i<3;i++){g.beginPath();g.moveTo(4,0);g.quadraticCurveTo(18,-14-i*7,36+i*3,-26+i*9);g.stroke()}g.restore()}
function q8DragDraw(f,t,x,y,ph,own,T1,T2,ice,al){const N=18,C=ice?['#1c3c6a','#7ac8ff','#e8f8ff','150,215,255']:['#4a0c04','#e8501a','#ffd060','255,140,40'],P=[];
  for(let j=0;j<N;j++){const tt=Math.max(0,t-j*.045);P.push(q8DragP(x,y,f.a,f.len||420,Math.min(tt,T1+T2),T1,T2,own,ph))}
  g.save();g.globalAlpha=al;g.globalCompositeOperation='lighter';for(let j=0;j<10;j++){const q=(t*1.7+fxR(f,j+ph*20,1))%1,i=Math.min(N-1,Math.floor(q*N)),p=P[i];g.fillStyle='rgba('+C[3]+','+(.7*(1-q))+')';g.beginPath();g.arc(p[0]+(fxR(f,j,2)-.5)*18,p[1]-20-q*18,2.4*(1-q)+.6,0,7);g.fill()}
  glowAt(P[0][0],P[0][1]-22,44,C[3],.55);g.globalCompositeOperation='source-over';
  for(let j=N-1;j>=1;j--){const p=P[j],q=P[j-1],rr=4+9*(1-j/N),a=Math.atan2(q[1]-p[1],q[0]-p[0]);g.save();g.translate(p[0],p[1]-22);g.rotate(a);
    g.fillStyle=C[0];g.beginPath();g.ellipse(0,0,rr*1.25+1,rr+1,0,0,7);g.fill();g.fillStyle=C[1];g.beginPath();g.ellipse(0,0,rr*1.25,rr,0,0,7);g.fill();g.fillStyle=C[2];g.beginPath();g.ellipse(0,rr*.35,rr*.9,rr*.42,0,0,7);g.fill();
    if(j%2===0){g.fillStyle=C[0];g.beginPath();g.moveTo(-rr*.4,-rr*.8);g.lineTo(rr*.1,-rr*1.7);g.lineTo(rr*.5,-rr*.75);g.closePath();g.fill()}g.restore()}
  const h=P[0],h1=P[2],ha=Math.atan2(h[1]-h1[1],h[0]-h1[0]),fl=Math.cos(ha)<0?-1:1;g.save();g.translate(h[0],h[1]-22);g.rotate(ha);g.scale(1,fl);g.lineJoin='round';
  g.fillStyle=C[1];g.strokeStyle=C[0];g.lineWidth=1.6;g.beginPath();g.moveTo(-10,-10);g.quadraticCurveTo(6,-13,22,-5);g.lineTo(26,-1);g.lineTo(14,1);g.lineTo(24,6);g.quadraticCurveTo(8,12,-10,9);g.closePath();g.fill();g.stroke();
  g.fillStyle=C[2];g.beginPath();g.moveTo(-6,5);g.quadraticCurveTo(8,9,22,6);g.lineTo(12,3);g.closePath();g.fill();
  g.fillStyle=C[0];g.beginPath();g.moveTo(-8,-9);g.lineTo(-20,-19);g.lineTo(-4,-12);g.closePath();g.fill();g.beginPath();g.moveTo(-2,-11);g.lineTo(-10,-23);g.lineTo(3,-12);g.closePath();g.fill();
  g.fillStyle='#fff6b0';g.beginPath();g.ellipse(6,-5,2.6,1.6,.2,0,7);g.fill();g.fillStyle='#200';g.beginPath();g.arc(6.6,-5,.9,0,7);g.fill();
  g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const q=(t*3+fxR(f,i+30,1))%1;g.fillStyle='rgba('+C[3]+','+(.85*(1-q))+')';g.beginPath();g.arc(26+q*26,(fxR(f,i,3)-.5)*10*q+1,3.4*(1-q)+1,0,7);g.fill()}g.restore();g.restore()}
Object.assign(FXB,{
 /* ร่างอสูรสงคราม: ไฟลุกรอบตัว + วงพื้นเต้นเป็นจังหวะ (คำรามแรกเป็นคลื่นกระจาย) */
 q8av:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||8,t=p*D,al=Math.min(1,(D-t)/.3),C=f.u==='b'?['200,20,40','255,90,110']:['255,80,30','255,190,90'];g.save();g.globalCompositeOperation='lighter';
   if(t<.6){const q=t/.6;for(let i=0;i<3;i++){const qq=Math.min(1,q*1.3+i*.12);q8Ring(o.x,o.y+4,r*(.2+qq),C[1],.9*(1-qq),4*(1-qq)+1)}glowAt(o.x,o.y-14,70*(1-q)+20,C[0],.6*(1-q))}
   const pu=.6+.4*Math.sin(now*9);glowAt(o.x,o.y-20,58,C[0],.5*al*pu);glowAt(o.x,o.y+4,40,C[0],.35*al);q8Ring(o.x,o.y+5,30+5*pu,C[1],.75*al,2.4);q8Ring(o.x,o.y+5,44+6*pu,C[0],.35*al,1.4);
   for(let i=0;i<22;i++){const q=(now*1.5+fxR(f,i,1))%1,ox=(fxR(f,i,2)-.5)*50*(1-q*.5),w=6*(1-q)+2;g.fillStyle='rgba('+(q<.35?C[1]:C[0])+','+(al*.8*Math.sin(q*Math.PI))+')';g.beginPath();g.ellipse(o.x+ox+Math.sin(now*6+i)*3,o.y+4-q*84,w*.7,w*1.5,0,0,7);g.fill()}
   for(let i=0;i<6;i++){const q=(now*.8+fxR(f,i,7))%1,an=fxR(f,i,8)*6.283;g.fillStyle='rgba(255,220,150,'+(al*(1-q))+')';g.beginPath();g.arc(o.x+Math.cos(an)*(20+q*30),o.y-30-q*50+Math.sin(an)*8,1.6,0,7);g.fill()}
   if(f.u==='b')for(let i=0;i<4;i++){const q=(now*1.1+fxR(f,i,5))%1;g.fillStyle='rgba(220,30,50,'+(al*(1-q))+')';g.beginPath();g.arc(o.x+(fxR(f,i,6)-.5)*40,o.y-30+q*34,1.8,0,7);g.fill()}
   if(t>D-.3){const q=(t-(D-.3))/.3;glowAt(o.x,o.y-12,60*q+10,C[1],.6*(1-q))}g.restore()},
 /* คลื่นกระแทกรูปพัด */
 q8cone:(f,p,x,y,r,now)=>{const a=f.a,q=q8eo(p),R=r*(.25+.75*q),al=1-p,C=f.u==='b'?'230,40,60':'255,120,50';g.save();g.globalCompositeOperation='lighter';g.translate(x,y-6);g.scale(1,.6);
   for(let i=0;i<3;i++){const rr=R-i*9;if(rr<4)continue;g.strokeStyle='rgba('+(i?C:'255,230,190')+','+(al*(i?.55:.95))+')';g.lineWidth=(i?7:3)*(1-p*.6);g.beginPath();g.arc(0,0,rr,a-.95,a+.95);g.stroke()}
   const gr=g.createRadialGradient(0,0,R*.3,0,0,R);gr.addColorStop(0,'rgba('+C+',0)');gr.addColorStop(1,'rgba('+C+','+(.25*al)+')');g.fillStyle=gr;g.beginPath();g.moveTo(0,0);g.arc(0,0,R,a-.95,a+.95);g.closePath();g.fill();g.restore();
   g.save();for(let i=0;i<6;i++){const an=a+(fxR(f,i,1)-.5)*1.8,dd=R*(.6+.4*fxR(f,i,2));g.fillStyle='rgba(140,110,80,'+(.8*al)+')';g.beginPath();g.arc(x+Math.cos(an)*dd,y-6+Math.sin(an)*dd*.6-10*q,2.2,0,7);g.fill()}g.restore()},
 /* เหินฟ้า: เสาแสง + ลมวนที่พื้น + ปีกแสงด้านหลัง (ความสูงตรงกับตัวที่ลอย) */
 q8sky:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||2.8,t=p*D,J=Q8J[f.by],h=J?q8LiftH(J,performance.now()):74*Math.min(1,t/.3,(D-t)/.3),al=Math.min(1,t/.25,(D-t)/.3),C=f.u==='b'?'255,215,110':f.u==='a'?'255,160,80':'170,230,255';g.save();g.globalCompositeOperation='lighter';
   const pg=g.createLinearGradient(0,o.y-h-40,0,o.y+4);pg.addColorStop(0,'rgba('+C+',0)');pg.addColorStop(1,'rgba('+C+','+(.16*al)+')');g.fillStyle=pg;for(let i=0;i<3;i++){const w=8+i*7;g.fillRect(o.x-w,o.y-h-40,w*2,h+44)}
   g.save();g.translate(o.x,o.y+4);g.scale(1,.42);g.strokeStyle='rgba('+C+','+(.6*al)+')';g.lineWidth=2;for(let i=0;i<4;i++){const an=now*3+i*1.571;g.beginPath();g.arc(0,0,r*(.6+.15*(i%2)),an,an+1);g.stroke()}g.restore();
   for(let i=0;i<8;i++){const q=(now*.7+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283;g.fillStyle='rgba(255,250,235,'+(al*.8*Math.sin(q*Math.PI))+')';g.beginPath();g.ellipse(o.x+Math.cos(an)*30*(1-q*.3),o.y-h*.5+q*40-20+Math.sin(an)*8,2.6,1.2,an,0,7);g.fill()}
   g.globalCompositeOperation='source-over';const wy=o.y-h-22,fl=now*4;[-1,1].forEach(sd=>q8Wing(o.x+sd*4,wy,sd,1,fl,al*.9,C));g.restore()},
 /* ศรดิ่งจากฟ้า (u='a' ระเบิด · 'b' ศรเทวะยักษ์) */
 q8sar:(f,p,x,y,r,now)=>{const T=.47,big=f.u==='b',C=big?'255,220,120':f.u==='a'?'255,150,70':'170,230,255',tx=x,ty=y-10;g.save();
   if(p<T){const q=q8ei(p/T),px=f.sx+(tx-f.sx)*q,py=f.sy+(ty-f.sy)*q,a=Math.atan2(ty-f.sy,tx-f.sx);g.globalCompositeOperation='lighter';
     g.strokeStyle='rgba('+C+',.55)';g.lineWidth=big?8:3.5;g.lineCap='round';g.beginPath();g.moveTo(f.sx+(tx-f.sx)*Math.max(0,q-.35),f.sy+(ty-f.sy)*Math.max(0,q-.35));g.lineTo(px,py);g.stroke();glowAt(px,py,big?26:12,C,.7);
     g.globalCompositeOperation='source-over';g.translate(px,py);g.scale(big?2.2:1.15,big?2.2:1.15);q8Arrow(0,0,a,0,C,1)}
   else{const q=(p-T)/(1-T);g.globalCompositeOperation='lighter';glowAt(tx,ty,(big?40:16)*(1-q)+4,C,.8*(1-q));q8Ring(tx,y+4,(big?30:10)+(big?40:16)*q,C,.8*(1-q),2*(1-q)+.5)}g.restore()},
 /* มังกรอัคคี (u='i' น้ำแข็ง · '2' สองตัว) */
 q8drg:(f,p,x,y,r,now)=>{const D=f.d||2.35,T1=f.sx||1.1,T2=f.sy||1,t=p*D,own=q8Own(f)||{x,y},al=Math.min(1,t/.12,(D-t)/.25),ice=f.u==='i';
   (f.u==='2'?[1,-1]:[1]).forEach(ph=>q8DragDraw(f,t,x,y,ph,own,T1,T2,ice,al));
   if(t<.3){const q=t/.3;g.save();g.globalCompositeOperation='lighter';q8Ring(x,y+4,20+50*q,ice?'170,220,255':'255,160,60',.8*(1-q),3*(1-q)+.5);glowAt(x,y-20,40*(1-q)+10,ice?'150,215,255':'255,120,30',.6*(1-q));g.restore()}},
 /* จันทราประหาร: ความมืดรอบตัว + ตราจันทร์เสี้ยวบนหัวมอน (ล็อกเป้า) */
 q8moon:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||1.3,t=p*D,L=q8Lp(f),al=Math.min(1,t/.15,(D-t)/.2),lock=Math.min(1,t/.9);g.save();
   const gr=g.createRadialGradient(o.x,o.y,20,o.x,o.y,320);gr.addColorStop(0,'rgba(20,6,40,'+(.32*al)+')');gr.addColorStop(1,'rgba(20,6,40,0)');g.fillStyle=gr;g.fillRect(o.x-320,o.y-320,640,640);
   g.globalCompositeOperation='lighter';L.forEach(([mx,my],i)=>{const cy=my-50-Math.sin(now*3+i)*2,s=.6+.4*q8eo(lock);glowAt(mx,cy,16*s,'200,170,255',.6*al);
     g.save();g.translate(mx,cy);g.rotate(-.5+lock*.5);g.scale(s,s);g.fillStyle='rgba(235,225,255,'+al+')';g.beginPath();g.arc(0,0,9,0,7);g.arc(3.5,-2.5,7.6,0,7,true);g.fill('evenodd');g.restore();
     q8Ring(mx,my+4,(30-18*lock),'200,160,255',.8*al,1.6);g.strokeStyle='rgba(200,170,255,'+(.4*al)+')';g.lineWidth=1;g.setLineDash([3,4]);g.beginPath();g.moveTo(mx,cy+9);g.lineTo(mx,my-12);g.stroke();g.setLineDash([])});
   if(t>.95&&t<1.15){const q=(t-.95)/.2;g.fillStyle='rgba(235,225,255,'+(.25*(1-q))+')';g.fillRect(o.x-400,o.y-300,800,600)}g.restore()},
 /* ฟันจันทร์เสี้ยว: เสี้ยวจันทร์ใหญ่กวาดผ่านตัวมอน */
 q8mcut:(f,p,x,y,r,now)=>{const q=q8eo(Math.min(1,p/.28)),al=p<.28?1:1-(p-.28)/.72,cy=y-14,R=r*(.8+.25*q);g.save();g.globalCompositeOperation='lighter';glowAt(x,cy,r,'190,150,255',.6*al);
   g.save();g.translate(x,cy);g.rotate(f.a+(q-.5)*1.6);g.fillStyle='rgba(170,120,255,'+(.5*al)+')';g.beginPath();g.arc(0,0,R,-1.35,1.35);g.arc(-R*.3,0,R*.88,1.2,-1.2,true);g.closePath();g.fill();
   g.fillStyle='rgba(250,246,255,'+(.95*al)+')';g.beginPath();g.arc(0,0,R,-1.2,1.2);g.arc(-R*.13,0,R*.93,1.1,-1.1,true);g.closePath();g.fill();g.restore();
   if(p<.22){const k=p/.22;g.strokeStyle='rgba(255,255,255,'+(1-k)+')';g.lineWidth=3*(1-k)+.5;g.beginPath();g.moveTo(x-Math.cos(f.a)*r*1.3,cy-Math.sin(f.a)*r*1.3);g.lineTo(x+Math.cos(f.a)*r*1.3,cy+Math.sin(f.a)*r*1.3);g.stroke()}
   for(let i=0;i<10;i++){const an=fxR(f,i,1)*6.283,dd=r*.8*q8eo(p);g.fillStyle='rgba(230,215,255,'+al+')';g.beginPath();g.arc(x+Math.cos(an)*dd,cy+Math.sin(an)*dd*.6,1.9,0,7);g.fill()}g.restore()},
 /* โซ่ตรวนสวรรค์: โซ่ทองหย่อนจากฟ้าล่ามมอน + วงอักขระใต้ตัว (u='b' เรืองแดงก่อนระเบิด · 'a' ชีวิตไหลกลับหาคนร่าย) */
 q8chn:(f,p,x,y,r,now)=>{const D=f.d||3.4,t=p*D,L=q8Lp(f),o=q8Own(f)||{x,y},drop=q8eo(Math.min(1,t/.35)),brk=t>D-.35?(t-(D-.35))/.35:0,al=1-brk,hot=f.u==='b'?Math.min(1,t/D):0;g.save();
   L.forEach(([mx,my],i)=>{g.globalCompositeOperation='lighter';g.save();g.translate(mx,my+4);g.scale(1,.42);g.strokeStyle='rgba(255,'+(220-120*hot|0)+','+(120-80*hot|0)+','+(.8*al)+')';g.lineWidth=1.8;g.setLineDash([5,4]);g.lineDashOffset=-now*20;g.beginPath();g.arc(0,0,22,0,7);g.stroke();g.setLineDash([]);
     g.lineWidth=1;g.beginPath();for(let j=0;j<=6;j++){const an=j*2.513+now;j?g.lineTo(Math.cos(an)*17,Math.sin(an)*17):g.moveTo(Math.cos(an)*17,Math.sin(an)*17)}g.stroke();g.restore();
     glowAt(mx,my-12,22,hot>.5?'255,120,60':'255,215,120',(.35+.3*hot)*al);g.globalCompositeOperation='source-over';
     [-1,1].forEach(sd=>{const tx=mx+sd*6,ty=my-14,sx2=mx+sd*36+Math.sin(now*1.3+i)*4,sy2=my-270,ey=sy2+(ty-sy2)*drop,ex=sx2+(tx-sx2)*drop,N=Math.max(2,Math.floor(Math.hypot(ex-sx2,ey-sy2)/7)),ang=Math.atan2(ey-sy2,ex-sx2);
       for(let j=0;j<N;j++){const u=(j+.5)/N;let px=sx2+(ex-sx2)*u,py=sy2+(ey-sy2)*u;if(brk){px+=(fxR(f,j+i*40,1)-.5)*30*brk;py+=60*brk*brk*u}g.save();g.translate(px,py);g.rotate(ang+(j%2?Math.PI/2:0));g.globalAlpha=al*Math.min(1,u*4);
         g.strokeStyle='#5a3a08';g.lineWidth=2.6;g.beginPath();g.ellipse(0,0,3.2,1.8,0,0,7);g.stroke();g.strokeStyle=hot>.6?'#ffb060':'#ffd968';g.lineWidth=1.2;g.stroke();g.restore()}});
     if(f.u==='a'&&!brk&&t>.4){g.globalCompositeOperation='lighter';for(let j=0;j<3;j++){const q=(now*.9+fxR(f,i*5+j,2))%1,px=mx+(o.x-mx)*q,py=my-14+(o.y-20-my+14)*q-Math.sin(q*Math.PI)*30;g.fillStyle='rgba(255,150,200,'+(.8*Math.sin(q*Math.PI))+')';g.beginPath();g.arc(px,py,2.4,0,7);g.fill()}}});
   g.restore()},
 /* คลื่นฮีลสีชมพูจากคนร่าย */
 q8hlr:(f,p,x,y,r,now)=>{const al=1-p;g.save();g.globalCompositeOperation='lighter';q8Ring(x,y+4,r*.15+r*.85*q8eo(p),'255,150,200',.7*al,3*al+.5);glowAt(x,y-14,30,'255,140,190',.5*al);
   for(let i=0;i<6;i++){const px=x+(fxR(f,i,1)-.5)*40,py=y-10-q8eo(p)*40-fxR(f,i,2)*14;g.fillStyle='rgba(255,180,215,'+al+')';g.fillRect(px-.9,py-3.4,1.8,6.8);g.fillRect(px-3.4,py-.9,6.8,1.8)}g.restore()},
 q8vul:()=>{}});
try{Object.assign(R27D,{q8av:1,q8sky:1,q8drg:1,q8moon:1,q8chn:1})}catch(e){}
setTimeout(()=>{try{Object.assign(FXD,{q8cone:.32,q8sar:.3,q8mcut:.45,q8hlr:.7,q8vul:.1})}catch(e){}try{Object.assign(FXTOP,{q8av:1,q8cone:1,q8sar:1,q8drg:1,q8moon:1,q8mcut:1,q8chn:1,q8hlr:1})}catch(e){}},0);
/* ---------- ไอคอน ---------- */
Object.assign(Q8SVG,{
 xa:'<defs><radialGradient id="q" cx=".5" cy=".6" r=".6"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#a01808"/></radialGradient></defs><path d="M6 28Q4 16 9 9Q9 15 12 17Q12 8 16 3Q20 8 20 17Q23 15 23 9Q28 16 26 28Z" fill="url(#q)" opacity=".9"/><path d="M10 15L6 6L13 12M22 15L26 6L19 12" fill="#3a1408" stroke="#1a0804" stroke-width=".8"/><path d="M10 15Q16 11 22 15L21 24Q16 27 11 24Z" fill="#5a2a14" stroke="#1a0804" stroke-width="1"/><path d="M12.5 18.5l3 1.2M19.5 18.5l-3 1.2" stroke="#ffde40" stroke-width="1.6" stroke-linecap="round"/><path d="M13 23q3 1.6 6 0" stroke="#ffde40" stroke-width="1" fill="none"/>',
 xh:'<g fill="#fff6dc" stroke="#e0b040" stroke-width=".8"><path d="M15 9Q8 2 1 4Q5 6 4 9Q7 9 7 12Q11 11 15 13Z"/><path d="M17 9Q24 2 31 4Q27 6 28 9Q25 9 25 12Q21 11 17 13Z"/></g><circle cx="16" cy="10" r="2.4" fill="#2e7a3a" stroke="#1a1010" stroke-width=".6"/><g stroke-linecap="round"><path d="M10 15L7 29M16 15V30M22 15L25 29" stroke="#8ae6ff" stroke-width="1.3" opacity=".6"/><path d="M10.5 17L8.4 26M16 17V27M21.5 17L23.6 26" stroke="#6a4a2a" stroke-width="1.4"/></g><g fill="#e8eef4" stroke="#1a1010" stroke-width=".5"><path d="M7.8 29.5l-1.6-3.6 3.4.7z"/><path d="M16 30.6l-1.8-3.4h3.6z"/><path d="M24.2 29.5l-1.8-3 3.4-.6z"/></g>',
 xd:'<path d="M4 26Q10 30 14 24Q18 18 13 14Q9 10 14 6Q18 3 24 6" fill="none" stroke="#7a1a08" stroke-width="5" stroke-linecap="round"/><path d="M4 26Q10 30 14 24Q18 18 13 14Q9 10 14 6Q18 3 24 6" fill="none" stroke="#ff7a2a" stroke-width="3" stroke-linecap="round"/><path d="M21 3.5Q27 2.4 30 6L27.6 7.4L30 9Q25 11 21 9Z" fill="#ff7a2a" stroke="#4a0c04" stroke-width=".9"/><path d="M21 4L17 1.4L22.4 3.8" fill="#4a0c04"/><circle cx="25" cy="5.4" r=".9" fill="#fff6b0"/><g fill="#ffd060"><circle cx="31" cy="11" r="1.1"/><circle cx="29" cy="13.4" r=".8"/><circle cx="8" cy="20" r=".9"/></g>',
 xm:'<circle cx="16" cy="16" r="13" fill="#1a0e2a"/><path d="M21 5A11 11 0 1 0 25 23A9 9 0 1 1 21 5Z" fill="#ece4ff"/><path d="M4 27L28 6" stroke="#c8a8ff" stroke-width="2.4" stroke-linecap="round" opacity=".85"/><path d="M4 27L28 6" stroke="#fff" stroke-width=".9" stroke-linecap="round"/><g fill="#d8c8ff"><circle cx="8" cy="8" r=".9"/><circle cx="26" cy="27" r="1"/></g>',
 xc:'<g fill="none" stroke-linecap="round"><path d="M9 2v14M23 2v14" stroke="#7a5408" stroke-width="3.4" stroke-dasharray="3 1.6"/><path d="M9 2v14M23 2v14" stroke="#ffd968" stroke-width="1.6" stroke-dasharray="3 1.6"/></g><ellipse cx="16" cy="25" rx="11" ry="4" fill="none" stroke="#ffe08a" stroke-width="1.3" stroke-dasharray="3 2"/><path d="M9 16Q9 22 16 22Q23 22 23 16" fill="none" stroke="#ffd968" stroke-width="2.4"/><rect x="12" y="17.6" width="8" height="7" rx="2" fill="#e0b040" stroke="#5a3a08" stroke-width=".9"/><circle cx="16" cy="20.6" r="1.2" fill="#5a3a08"/><g stroke="#fff2b0" stroke-width="1" stroke-linecap="round"><path d="M3 9h3M26 9h3"/></g>'});
Object.keys(Q8SVG).forEach(k=>{if(!Q8IMG[k])Q8IMG[k]='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'+Q8SVG[k]+'</svg>')});
/* ---------- เสียง ---------- */
Object.assign(Q8SFX,{
 xa:()=>{sGrowl(70,1.2,.32,0);sBoom(55,.8,.5,.05);sN(.9,.2,{ft:'lowpass',f0:900,f1:200,at:.1,dl:.05})},
 xh:()=>{sWhoosh(.5,.3,300,2400);sChoir([523,784,1047],1.2,.04,.1);sShim(2200,.8,.04,.2,8)},
 xd:()=>{sGrowl(110,1,.26,0);sN(1.6,.22,{ft:'bandpass',f0:500,f1:1400,q:1,at:.3,dl:.1});sBoom(70,.6,.3,.1)},
 xm:()=>{sO('sine',900,160,.7,.06,{rv:.5});sShim(1600,.6,.04,.1,6);setTimeout(()=>{try{sShing(.3,0,0);sShing(.24,.04,-.4);sShing(.24,.08,.4);sBoom(90,.4,.3,0)}catch(e){}},950)},
 xc:()=>{sBell(392,1.4,.12,0);for(let i=0;i<6;i++)sMetal(700+i*90,.12,.05,.15+i*.04);sChoir([392,494,587],1,.04,.2)}});
