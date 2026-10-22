
/* ===== v487 · สกิลทางเลือกสายทมิฬ (ส่วนภาพ): เอฟเฟกต์ · ไอคอน · เสียง =====
   q8grd โล่เหล็กรอบตัว · q8gsl กระแทกโล่ · q8kn/q8kns อัศวินวิญญาณ · q8wnd ศรลมเด้ง · q8gale ลมกรดรอบตัว · q8wbl ใบมีดลม · q8cyc ไซโคลน
   q8imp/q8imf อิมป์ไฟ · q8hand หัตถ์ปีศาจ · q8orbt วงใบมีด · q8cln/q8cls ร่างเงา · q8vdo ตุ๊กตาคำสาป · q8rit/q8rp วงพิธีสาป */
function q8Knight(x,y,s,al,sw,fl){g.save();g.translate(x,y);g.scale(s*(fl||1),s);g.globalAlpha*=al;g.lineJoin='round';
  g.globalCompositeOperation='lighter';glowAt(0,-18,26,'140,190,255',.45);g.globalCompositeOperation='source-over';
  g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(0,2,11,3.5,0,0,7);g.fill();
  const C='rgba(150,195,255,.72)',D='rgba(40,70,130,.85)',L='rgba(225,240,255,.9)';g.strokeStyle=D;g.lineWidth=1.1;
  g.fillStyle=C;g.beginPath();g.moveTo(-6,0);g.lineTo(-5,-12);g.lineTo(5,-12);g.lineTo(6,0);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(-8,-12);g.lineTo(-9,-26);g.quadraticCurveTo(0,-30,9,-26);g.lineTo(8,-12);g.closePath();g.fill();g.stroke();
  g.beginPath();g.arc(0,-33,7,0,7);g.fill();g.stroke();g.fillStyle=D;g.fillRect(-5,-34,10,2.2);g.fillStyle=L;g.fillRect(-4,-33.6,8,1);
  g.strokeStyle='rgba(255,120,120,.8)';g.lineWidth=2;g.beginPath();g.moveTo(0,-40);g.quadraticCurveTo(6,-46,10,-40);g.stroke();
  g.save();g.translate(7,-16);g.rotate(-.9+sw*1.9);g.fillStyle=L;g.strokeStyle=D;g.lineWidth=.9;g.beginPath();g.moveTo(-1.6,0);g.lineTo(-1.6,-24);g.lineTo(0,-28);g.lineTo(1.6,-24);g.lineTo(1.6,0);g.closePath();g.fill();g.stroke();g.fillStyle=D;g.fillRect(-4.5,-1,9,2.4);g.restore();
  g.fillStyle='rgba(120,160,230,.8)';g.strokeStyle=L;g.lineWidth=1.2;g.beginPath();g.moveTo(-14,-25);g.lineTo(-4,-25);g.lineTo(-4,-10);g.quadraticCurveTo(-9,-3,-14,-10);g.closePath();g.fill();g.stroke();
  g.strokeStyle='rgba(225,240,255,.7)';g.beginPath();g.moveTo(-9,-23);g.lineTo(-9,-8);g.moveTo(-13,-17);g.lineTo(-5,-17);g.stroke();g.restore()}
function q8Shade(x,y,s,al,t,fl){g.save();g.translate(x,y);g.scale(s*(fl||1),s);g.globalAlpha*=al;g.globalCompositeOperation='lighter';glowAt(0,-16,22,'150,80,230',.4);g.globalCompositeOperation='source-over';
  g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(0,2,10,3,0,0,7);g.fill();
  const wv=Math.sin(t*8)*2;g.fillStyle='rgba(30,14,48,.82)';g.strokeStyle='rgba(170,110,255,.85)';g.lineWidth=1;g.beginPath();g.moveTo(-7,1+wv*.3);g.quadraticCurveTo(-9,-14,-6,-24);g.quadraticCurveTo(0,-38,6,-24);g.quadraticCurveTo(9,-14,7,1-wv*.3);
  g.lineTo(3,-2+wv);g.lineTo(0,1);g.lineTo(-3,-2-wv);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(10,4,18,.95)';g.beginPath();g.ellipse(0,-25,4.6,5,0,0,7);g.fill();
  g.fillStyle='#d8a8ff';g.beginPath();g.arc(-1.8,-25.5,1.1,0,7);g.arc(1.8,-25.5,1.1,0,7);g.fill();
  g.strokeStyle='rgba(225,210,255,.9)';g.lineWidth=1.6;g.beginPath();g.moveTo(5,-13);g.lineTo(13,-19+Math.sin(t*6)*3);g.stroke();g.restore()}
function q8Imp(x,y,s,t,i){g.save();g.translate(x,y);const fl=Math.sin(t*16+i);g.scale(s,s);g.globalCompositeOperation='lighter';glowAt(0,0,16,'255,110,40',.5);g.globalCompositeOperation='source-over';
  g.lineJoin='round';g.fillStyle='#5a1408';g.strokeStyle='#1a0402';g.lineWidth=.8;for(const sd of[-1,1]){g.beginPath();g.moveTo(sd*3,-2);g.lineTo(sd*13,-8-6*fl);g.lineTo(sd*11,-2-3*fl);g.lineTo(sd*14,1-2*fl);g.lineTo(sd*4,3);g.closePath();g.fill();g.stroke()}
  g.fillStyle='#d8401a';g.beginPath();g.ellipse(0,1,5,6,0,0,7);g.fill();g.stroke();g.beginPath();g.arc(0,-6,4.6,0,7);g.fill();g.stroke();
  g.fillStyle='#2a0804';g.beginPath();g.moveTo(-3.5,-9);g.lineTo(-5.5,-14);g.lineTo(-1.6,-10);g.closePath();g.fill();g.beginPath();g.moveTo(3.5,-9);g.lineTo(5.5,-14);g.lineTo(1.6,-10);g.closePath();g.fill();
  g.fillStyle='#ffe060';g.beginPath();g.arc(-1.7,-6.4,1,0,7);g.arc(1.7,-6.4,1,0,7);g.fill();g.strokeStyle='#5a1408';g.lineWidth=1.2;g.beginPath();g.moveTo(0,6);g.quadraticCurveTo(5,11,8,7);g.stroke();
  g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,200,80,.85)';g.beginPath();g.arc(0,-13-Math.abs(Math.sin(t*9+i))*2,1.8,0,7);g.fill();g.restore()}
function q8Doll(x,y,s,t,hot){g.save();g.translate(x,y);g.scale(s,s);g.rotate(Math.sin(t*2)*.06);g.lineJoin='round';
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,1,9,3,0,0,7);g.fill();g.fillStyle='#8a6a44';g.strokeStyle='#2a1a0c';g.lineWidth=1;
  g.beginPath();g.moveTo(-4,-2);g.lineTo(-6,0);g.lineTo(-3,0);g.lineTo(-1,-4);g.lineTo(1,-4);g.lineTo(3,0);g.lineTo(6,0);g.lineTo(4,-2);g.lineTo(5,-12);g.lineTo(11,-10);g.lineTo(11,-14);g.lineTo(5,-17);g.lineTo(-5,-17);g.lineTo(-11,-14);g.lineTo(-11,-10);g.lineTo(-5,-12);g.closePath();g.fill();g.stroke();
  g.beginPath();g.arc(0,-23,7,0,7);g.fill();g.stroke();g.strokeStyle='#2a1a0c';g.lineWidth=1.1;g.beginPath();g.moveTo(-4,-25);g.lineTo(-1.6,-22.6);g.moveTo(-1.6,-25);g.lineTo(-4,-22.6);g.moveTo(1.6,-25);g.lineTo(4,-22.6);g.moveTo(4,-25);g.lineTo(1.6,-22.6);g.stroke();
  g.beginPath();for(let i=0;i<4;i++){g.moveTo(-3+i*2,-19.4);g.lineTo(-3+i*2,-18)}g.moveTo(-3.5,-18.7);g.lineTo(3.5,-18.7);g.stroke();g.strokeStyle='#5a3a1c';g.setLineDash([1.4,1.4]);g.beginPath();g.moveTo(0,-16);g.lineTo(0,-4);g.stroke();g.setLineDash([]);
  [[-7,-14,-.6],[6,-8,.5],[1,-27,.2]].forEach(([px,py,a])=>{g.save();g.translate(px,py);g.rotate(a);g.strokeStyle='#c8c8d0';g.lineWidth=1;g.beginPath();g.moveTo(0,0);g.lineTo(-9,-4);g.stroke();g.fillStyle=hot?'#ff4060':'#b040ff';g.beginPath();g.arc(-9,-4,1.8,0,7);g.fill();g.restore()});
  g.globalCompositeOperation='lighter';glowAt(0,-14,22,'170,80,255',.3+.2*Math.sin(t*5));g.restore()}
function q8Hand(c,s,col){/* หัตถ์ปีศาจ (หันฝ่ามือเข้าหาจอ): c = งอนิ้ว 0 (กาง) → 1 (กำเป็นกรงเล็บ) */g.save();g.scale(s,s);g.lineJoin='round';g.lineCap='round';
  g.fillStyle=col[0];g.strokeStyle='#120404';g.lineWidth=2;g.beginPath();g.moveTo(-18,30);g.lineTo(-30,-22);g.quadraticCurveTo(-28,-36,-14,-38);g.lineTo(18,-38);g.quadraticCurveTo(32,-36,30,-22);g.lineTo(18,30);g.closePath();g.fill();g.stroke();
  const F=[[-21,-.22,34],[-7,-.07,40],[7,.07,40],[21,.22,34]];
  F.forEach(([bx,a0,L],i)=>{const sg=bx<0?1:-1,k=1-.45*c;let x=bx,y=-36,a=-Math.PI/2+a0*(1-c)+sg*.18*c;const P=[[x,y]];
    for(let j=0;j<3;j++){const l=L*[.42,.33,.25][j]*k;x+=Math.cos(a)*l;y+=Math.sin(a)*l;P.push([x,y]);a+=sg*c*(.5+j*.25)+(c*.9)*(j===2?1:0)*0}
    g.strokeStyle='#120404';g.lineWidth=11;g.beginPath();P.forEach((p,j)=>j?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.strokeStyle=col[0];g.lineWidth=8.4;g.stroke();
    g.strokeStyle=col[1];g.lineWidth=1.2;g.beginPath();P.forEach((p,j)=>j?g.lineTo(p[0]+1.5,p[1]):g.moveTo(p[0]+1.5,p[1]));g.stroke();
    const e=P[3],ca=a+sg*.5*c;g.fillStyle='#ece2cc';g.strokeStyle='#120404';g.lineWidth=1;g.beginPath();g.moveTo(e[0]-3.4,e[1]+1);g.lineTo(e[0]+Math.cos(ca)*12,e[1]+Math.sin(ca)*12);g.lineTo(e[0]+3.4,e[1]+1);g.closePath();g.fill();g.stroke()});
  {let x=-28,y=0,a=-2.3+1.1*c;const P=[[x,y]];for(let j=0;j<2;j++){const l=[16,13][j]*(1-.3*c);x+=Math.cos(a)*l;y+=Math.sin(a)*l;P.push([x,y]);a+=.6*c}g.strokeStyle='#120404';g.lineWidth=11;g.beginPath();P.forEach((p,j)=>j?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.strokeStyle=col[0];g.lineWidth=8.4;g.stroke();
    const e=P[2];g.fillStyle='#ece2cc';g.beginPath();g.moveTo(e[0]-3,e[1]);g.lineTo(e[0]+Math.cos(a)*11,e[1]+Math.sin(a)*11);g.lineTo(e[0]+3,e[1]+2);g.closePath();g.fill();g.stroke()}
  g.strokeStyle=col[1];g.lineWidth=1.6;g.beginPath();g.moveTo(-10,24);g.quadraticCurveTo(-2,2,-12,-26);g.moveTo(8,24);g.quadraticCurveTo(14,0,6,-30);g.stroke();
  g.globalCompositeOperation='lighter';g.fillStyle=col[1];g.beginPath();g.arc(0,-8,3.4+1.2*Math.sin(performance.now()/120),0,7);g.fill();g.restore()}
Object.assign(FXB,{
 /* ปราการสะท้อนแค้น: แผ่นเหล็กหกเหลี่ยมหมุนล้อมตัว + โล่หอคอยด้านหน้า (u='a' หนาม) */
 q8grd:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||2.5,t=p*D,al=Math.min(1,t/.15,(D-t)/.2),sp=q8eo(Math.min(1,t/.25));g.save();
   g.globalCompositeOperation='lighter';glowAt(o.x,o.y-14,46,'180,190,210',.35*al);q8Ring(o.x,o.y+5,36*sp,'200,210,230',.7*al,2.2);g.globalCompositeOperation='source-over';
   for(let i=0;i<8;i++){const an=now*.9+i*.785,px=o.x+Math.cos(an)*34*sp,py=o.y-12+Math.sin(an)*14*sp,bk=Math.sin(an)<0;g.save();g.translate(px,py);g.globalAlpha=al*(bk?.55:.92);
     g.fillStyle='#7a828e';g.strokeStyle='#22262e';g.lineWidth=1;g.beginPath();for(let j=0;j<6;j++){const b=j*1.047+.52;j?g.lineTo(Math.cos(b)*7,Math.sin(b)*9):g.moveTo(Math.cos(b)*7,Math.sin(b)*9)}g.closePath();g.fill();g.stroke();
     g.fillStyle='#b8c0cc';g.fillRect(-3,-6,2,10);if(f.u==='a'){g.fillStyle='#d8dde6';g.beginPath();g.moveTo(-2,-9);g.lineTo(0,-16);g.lineTo(2,-9);g.closePath();g.fill();g.stroke()}g.restore()}
   const pu=.5+.5*Math.sin(now*10);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,140,100,'+(.4*al*pu)+')';g.lineWidth=1.4;g.beginPath();g.ellipse(o.x,o.y-12,40,22,0,0,7);g.stroke();g.restore()},
 /* กระแทกโล่ */
 q8gsl:(f,p,x,y,r,now)=>{const q=q8eo(p),al=1-p;g.save();q8Crk(f,x,y+4,r*.95,al,10);g.globalCompositeOperation='lighter';glowAt(x,y-10,r*.8,'255,150,90',.6*al);
   for(let i=0;i<3;i++){const qq=Math.min(1,q*1.2+i*.1);q8Ring(x,y+4,r*(.2+qq*.85),i?'255,170,120':'240,240,255',.9*(1-qq),4*(1-qq)+1)}g.globalCompositeOperation='source-over';q8Rocks(f,x,y+4,r*.9,p,12);g.restore()},
 /* อัศวินวิญญาณ: ยืนล้อมตัวเจ้าของ (ตัวที่กำลังฟาดจะหายไปจากวง) */
 q8kn:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||8,t=p*D,n=parseInt(f.u)||3,al=Math.min(1,t/.4,(D-t)/.4),tn=performance.now();g.save();
   g.globalCompositeOperation='lighter';g.save();g.translate(o.x,o.y+4);g.scale(1,.45);g.strokeStyle='rgba(150,200,255,'+(.35*al)+')';g.lineWidth=1.6;g.setLineDash([6,8]);g.lineDashOffset=-now*12;g.beginPath();g.arc(0,0,r,0,7);g.stroke();g.setLineDash([]);g.restore();
   if(t<.5){const q=t/.5;glowAt(o.x,o.y-20,80*(1-q)+20,'170,210,255',.5*(1-q))}g.globalCompositeOperation='source-over';
   const L=[];for(let i=0;i<n;i++){if(Q8HK[f.by+':k'+i]>tn)continue;const P=q8KnP(o.x,o.y,t,i,n);L.push([P[1],P[0],i])}L.sort((a,b)=>a[0]-b[0]);
   L.forEach(([py,px,i])=>{const rise=Math.min(1,t/.5);q8Knight(px,py+(1-rise)*10,1,al*(.5+.5*rise),.15+.1*Math.sin(now*2+i),px<o.x?-1:1)});g.restore()},
 /* อัศวินพุ่งฟาด */
 q8kns:(f,p,x,y,r,now)=>{const sx=f.sx,sy=f.sy,q=p<.4?q8eo(p/.4):p<.6?1:1-q8ei((p-.6)/.4),px=sx+(x-18*Math.sign(x-sx||1)-sx)*q,py=sy+(y-sy)*q,sw=p<.4?0:p<.6?(p-.4)/.2:1;g.save();
   if(p>.38&&p<.75){const k=(p-.38)/.37;g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,230,255,'+(1-k)+')';g.lineWidth=4*(1-k)+1;g.beginPath();g.arc(x,y-14,26,-2.2+k,-.4+k);g.stroke();glowAt(x,y-12,20*(1-k)+6,'170,210,255',.7*(1-k));g.globalCompositeOperation='source-over'}
   q8Knight(px,py,1,.9,sw,x<sx?-1:1);g.restore()},
 /* ศรลมเด้ง: ศรวิ่งตามลำดับมอน (pts) */
 q8wnd:(f,p,x,y,r,now)=>{const L=q8Lp(f),st=.12,D=f.d||1,t=p*D;if(!L.length)return;const P=[[x,y-12]].concat(L.map(q=>[q[0],q[1]-12])),i=Math.min(P.length-2,Math.floor(t/st)),q=Math.min(1,(t-i*st)/st),fin=t>=st*(P.length-1);g.save();g.globalCompositeOperation='lighter';
   const C=f.u==='b'?'150,255,210':'170,255,170';g.lineCap='round';for(let j=Math.max(0,i-2);j<=i;j++){const a=P[j],b=P[j+1],e=j<i?1:q,al=(1-(i-j)*.35)*(fin?Math.max(0,1-(t-st*(P.length-1))/.25):1);g.strokeStyle='rgba('+C+','+(.55*al)+')';g.lineWidth=4;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(a[0]+(b[0]-a[0])*e,a[1]+(b[1]-a[1])*e);g.stroke()}
   for(let j=1;j<=Math.min(P.length-1,i+(q>=1?1:0));j++){const k=Math.min(1,(t-j*st)/.25);if(k<0||k>=1)continue;q8Ring(P[j][0],P[j][1]+16,10+20*k,C,.8*(1-k),2*(1-k)+.5)}
   if(!fin){const a=P[i],b=P[i+1],hx=a[0]+(b[0]-a[0])*q,hy=a[1]+(b[1]-a[1])*q,an=Math.atan2(b[1]-a[1],b[0]-a[0]);glowAt(hx,hy,14,C,.7);g.globalCompositeOperation='source-over';q8Arrow(hx,hy,an,0,C,1)}g.restore()},
 /* ลมกรดรอบตัว */
 q8gale:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||5,t=p*D,al=Math.min(1,t/.3,(D-t)/.3);g.save();g.globalCompositeOperation='lighter';
   g.save();g.translate(o.x,o.y-10);g.scale(1,.55);for(let i=0;i<5;i++){const an=-now*7+i*1.257;g.strokeStyle='rgba(190,255,200,'+(.55*al)+')';g.lineWidth=2-i*.2;g.beginPath();g.arc(0,0,22+i*5,an,an+1.4);g.stroke()}g.restore();
   for(let i=0;i<7;i++){const q=(now*1.4+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283-now*3;g.fillStyle='rgba(150,230,120,'+(al*.9*Math.sin(q*Math.PI))+')';g.save();g.translate(o.x+Math.cos(an)*(26+q*8),o.y-10+Math.sin(an)*12-q*26);g.rotate(an+now*6);g.beginPath();g.ellipse(0,0,3.2,1.4,0,0,7);g.fill();g.restore()}
   glowAt(o.x,o.y-12,30,'150,255,190',.25*al);g.restore()},
 /* ใบมีดลม */
 q8wbl:(f,p,x,y,r,now)=>{const T=.5,tx=x,ty=y-12;g.save();g.globalCompositeOperation='lighter';
   if(p<T){const q=p/T,px=f.sx+(tx-f.sx)*q,py=f.sy+(ty-f.sy)*q;g.translate(px,py);g.rotate(now*25);g.fillStyle='rgba(200,255,210,.9)';g.beginPath();g.arc(0,0,r,0,4.2);g.arc(-r*.3,0,r*.8,4,0,true);g.closePath();g.fill();glowAt(0,0,r*1.4,'160,255,180',.5)}
   else{const q=(p-T)/(1-T);q8Ring(tx,ty+14,8+16*q,'190,255,200',.8*(1-q),1.6);glowAt(tx,ty,12*(1-q)+3,'160,255,180',.6*(1-q))}g.restore()},
 /* ไซโคลนปิดฉาก */
 q8cyc:(f,p,x,y,r,now)=>{const al=1-p,q=q8eo(p);g.save();g.globalCompositeOperation='lighter';g.translate(x,y-8);
   for(let i=0;i<5;i++){g.save();g.scale(1,.5);const R=r*(.3+.7*q)*(1-i*.12),an=-now*9+i*1.2;g.strokeStyle='rgba(200,255,215,'+(.7*al)+')';g.lineWidth=5*al+1;g.beginPath();g.arc(0,0,R,an,an+2.2);g.stroke();g.restore()}
   for(let i=0;i<6;i++){const hh=i*14*q;g.strokeStyle='rgba(180,250,200,'+(.45*al)+')';g.lineWidth=2;g.beginPath();g.ellipse(0,-hh,20+i*8*(1-q*.3),(20+i*8)*.3,0,0,7);g.stroke()}g.restore()},
 /* อิมป์ไฟบินวนรอบตัว */
 q8imp:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||10,t=p*D,n=parseInt(f.u)||2,al=Math.min(1,t/.3,(D-t)/.25);g.save();g.globalAlpha=al;
   for(let i=0;i<n;i++){const P=q8ImpP(o.x,o.y,t,i,n);if(t<.4){const q=t/.4;g.save();g.globalCompositeOperation='lighter';glowAt(P[0],P[1],26*(1-q)+6,'255,120,40',.7*(1-q));g.restore()}q8Imp(P[0],P[1],1.15,now,i)}g.restore()},
 /* ลูกไฟอิมป์ (u='k' อิมป์พุ่งพลีชีพ) */
 q8imf:(f,p,x,y,r,now)=>{const T=f.u==='k'?.85:.62,tx=x,ty=y-10;g.save();
   if(p<T){const q=q8ei(p/T),px=f.sx+(tx-f.sx)*q,py=f.sy+(ty-f.sy)*q-Math.sin(q*Math.PI)*16;g.globalCompositeOperation='lighter';for(let j=1;j<5;j++){const qq=Math.max(0,q-j*.06),qx=f.sx+(tx-f.sx)*qq,qy=f.sy+(ty-f.sy)*qq-Math.sin(qq*Math.PI)*16;g.fillStyle='rgba(255,'+(140-j*20)+',40,'+(.5-j*.1)+')';g.beginPath();g.arc(qx,qy,(f.u==='k'?6:4)-j*.6,0,7);g.fill()}
     if(f.u==='k'){g.globalCompositeOperation='source-over';q8Imp(px,py,1.1,now*2,0)}else{glowAt(px,py,10,'255,140,40',.8);g.fillStyle='#fff0b0';g.beginPath();g.arc(px,py,2.6,0,7);g.fill()}}
   else{const q=(p-T)/(1-T);g.globalCompositeOperation='lighter';glowAt(tx,ty,(f.u==='k'?22:12)*(1-q)+4,'255,130,40',.8*(1-q));for(let i=0;i<5;i++){const an=fxR(f,i,1)*6.283;g.fillStyle='rgba(255,200,90,'+(1-q)+')';g.beginPath();g.arc(tx+Math.cos(an)*14*q,ty+Math.sin(an)*9*q-6*q,1.6,0,7);g.fill()}}g.restore()},
 /* หัตถ์ปีศาจ: รอยแยกนรก → มือโผล่ → กำ → ยกขึ้นฟาด */
 q8hand:(f,p,x,y,r,now)=>{const D=f.d||2.95,t=p*D,col=f.u==='b'?['#5a0a18','rgba(255,60,90,.9)']:['#3a0c0c','rgba(255,120,40,.9)'],al=Math.min(1,(D-t)/.3);g.save();
   g.save();g.translate(x,y+4);g.scale(1,.42);const gr=g.createRadialGradient(0,0,10,0,0,r);gr.addColorStop(0,'rgba(255,90,20,'+(.45*al)+')');gr.addColorStop(.6,'rgba(120,10,0,'+(.3*al)+')');gr.addColorStop(1,'rgba(40,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,r*Math.min(1,t/.3),0,7);g.fill();g.restore();
   q8Crk(f,x,y+4,r*.9*Math.min(1,t/.3),al,9);
   const emerge=q8eo(Math.min(1,t/.45)),curl=q8c(t,.35,.75),lift=t<2.1?0:Math.min(1,q8eo((t-2.1)/.3)),slam=t>=2.5?Math.min(1,(t-2.5)/.4):0;
   const dn=t>2.4?q8ei(Math.min(1,(t-2.4)/.14)):0,hy=y+30-emerge*58-lift*60+dn*150;g.save();g.beginPath();g.rect(x-200,y-400,400,412);g.clip();g.globalAlpha=al;g.translate(x,hy);q8Hand(Math.max(curl,t>2.1?1:0),1.3,col);g.restore();
   if(t>.4&&t<2.5){g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const q=(now*1.2+fxR(f,i,1))%1;g.fillStyle='rgba(255,120,40,'+(.7*(1-q))+')';g.beginPath();g.arc(x+(fxR(f,i,2)-.5)*r*1.4,y-q*60,2,0,7);g.fill()}g.globalCompositeOperation='source-over'}
   if(slam>0){g.globalCompositeOperation='lighter';glowAt(x,y-10,r*1.1,'255,110,40',.8*(1-slam));for(let i=0;i<3;i++){const qq=Math.min(1,slam*1.3+i*.12);q8Ring(x,y+4,r*(.3+qq),'255,190,120',.9*(1-qq),4*(1-qq)+1)}g.globalCompositeOperation='source-over';q8Rocks(f,x,y+4,r,slam,14)}g.restore()},
 /* วงใบมีดระบำ */
 q8orbt:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||6,t=p*D,al=Math.min(1,t/.2,(D-t)/.25),R=r*q8eo(Math.min(1,t/.3));g.save();g.globalCompositeOperation='lighter';
   g.save();g.globalCompositeOperation='source-over';g.translate(o.x,o.y);g.scale(1,.55);g.strokeStyle='rgba(70,30,120,'+(.3*al)+')';g.lineWidth=10;g.beginPath();g.arc(0,0,R,0,7);g.stroke();g.restore();
   for(let i=0;i<6;i++){const an=t*4.2+i*1.0472,bx=o.x+Math.cos(an)*R,by=o.y+Math.sin(an)*R*.55-10;g.strokeStyle='rgba(210,170,255,'+(.4*al)+')';g.lineWidth=3;g.beginPath();g.moveTo(o.x+Math.cos(an-.35)*R,o.y+Math.sin(an-.35)*R*.55-10);g.lineTo(bx,by);g.stroke();
     g.save();g.translate(bx,by);g.rotate(now*20+i);g.globalAlpha=al;g.globalCompositeOperation='source-over';g.fillStyle='#e8e0f8';g.strokeStyle='#2a1a3a';g.lineWidth=.8;g.beginPath();for(let j=0;j<3;j++){const b=j*2.094;g.moveTo(Math.cos(b)*2,Math.sin(b)*2);g.quadraticCurveTo(Math.cos(b+.6)*8,Math.sin(b+.6)*8,Math.cos(b+1.2)*10,Math.sin(b+1.2)*10);g.quadraticCurveTo(Math.cos(b+.5)*5,Math.sin(b+.5)*5,Math.cos(b+.9)*2,Math.sin(b+.9)*2)}g.fill();g.stroke();g.fillStyle='#6a3a9a';g.beginPath();g.arc(0,0,2,0,7);g.fill();g.restore()}g.restore()},
 /* ร่างเงาล้อมตัว (u='4'/'6' · 'b' เรืองก่อนระเบิด) */
 q8cln:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||6,t=p*D,n=parseInt(f.u)||4,al=Math.min(1,t/.3,(D-t)/.25);g.save();
   const L=[];for(let i=0;i<n;i++){const P=q8ClnP(o.x,o.y,t,i,n);L.push([P[1],P[0],i])}L.sort((a,b)=>a[0]-b[0]);
   L.forEach(([py,px,i])=>{if(t<.35){const q=t/.35;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(190,130,255,'+(1-q)+')';g.lineWidth=2;g.beginPath();g.moveTo(o.x,o.y-14);g.lineTo(px,py-14);g.stroke();g.restore()}
     q8Shade(px,py,1,al*.85*(/b/.test(f.u||'')&&t>D-1?.7+.3*Math.sin(now*30):1),now+i,px<o.x?1:-1)});g.restore()},
 /* ร่างเงาฟัน */
 q8cls:(f,p,x,y,r,now)=>{const al=1-p,a=Math.atan2(y-f.sy,x-f.sx);g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(190,130,255,'+(.6*al)+')';g.lineWidth=3*al+.5;g.lineCap='round';g.beginPath();g.moveTo(f.sx,f.sy-14);g.lineTo(x,y-14);g.stroke();
   g.translate(x,y-14);g.rotate(a+.8);g.strokeStyle='rgba(240,225,255,'+al+')';g.lineWidth=2.6*al+.5;g.beginPath();g.arc(0,0,r,-1+p,.6+p);g.stroke();g.restore()},
 /* ตุ๊กตาคำสาป + ด้ายผูกมอน */
 q8vdo:(f,p,x,y,r,now)=>{const D=f.d||6,t=p*D,L=q8Lp(f),al=Math.min(1,t/.3,(D-t)/.25),drop=q8eo(Math.min(1,t/.3)),hot=f.u==='a'&&t>D-1.2;g.save();
   g.save();g.translate(x,y+4);g.scale(1,.42);g.strokeStyle='rgba(110,40,190,'+(.55*al)+')';g.lineWidth=1.8;g.setLineDash([3,5]);g.lineDashOffset=now*10;g.beginPath();g.arc(0,0,r,0,7);g.stroke();g.setLineDash([]);g.restore();
   L.forEach(([mx,my],i)=>{const k=(now*.8+i*.3)%1;g.strokeStyle='rgba(120,40,200,'+(.75*al)+')';g.lineWidth=1.4;g.beginPath();g.moveTo(x,y-18);g.quadraticCurveTo((x+mx)/2,Math.min(y,my)-40,mx,my-14);g.stroke();
     const u=k,qx=(1-u)*(1-u)*x+2*u*(1-u)*(x+mx)/2+u*u*mx,qy=(1-u)*(1-u)*(y-18)+2*u*(1-u)*(Math.min(y,my)-40)+u*u*(my-14);g.fillStyle='rgba(230,190,255,'+al+')';g.beginPath();g.arc(qx,qy,1.8,0,7);g.fill();
     g.save();g.translate(mx,my-46);g.fillStyle='rgba(200,130,255,'+(.8*al)+')';g.beginPath();g.moveTo(0,-5);g.lineTo(4,0);g.lineTo(0,5);g.lineTo(-4,0);g.closePath();g.fill();g.restore()});
   g.globalCompositeOperation='source-over';g.globalAlpha=al;q8Doll(x,y+4-(1-drop)*60,1.2,now,hot);g.restore()},
 /* วงพิธีสาปแช่ง (u='b' สีแดงเร็ว) */
 q8rit:(f,p,x,y,r,now)=>{const D=f.d||6,t=p*D,al=Math.min(1,t/.4,(D-t)/.3),C=f.u==='b'?['60,4,16','255,70,100']:['36,8,58','180,90,255'],R=r*q8eo(Math.min(1,t/.5)),sp=f.u==='b'?1.8:1;g.save();
   g.save();g.translate(x,y+4);g.scale(1,.45);const gr=g.createRadialGradient(0,0,R*.2,0,0,R);gr.addColorStop(0,'rgba('+C[0]+','+(.18*al)+')');gr.addColorStop(.85,'rgba('+C[0]+','+(.38*al)+')');gr.addColorStop(1,'rgba('+C[1]+','+(.35*al)+')');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,7);g.fill();
   g.strokeStyle='rgba('+C[1]+','+(.75*al)+')';g.lineWidth=2;g.beginPath();g.arc(0,0,R,0,7);g.stroke();g.beginPath();g.arc(0,0,R*.82,0,7);g.stroke();
   g.rotate(now*.5*sp);g.beginPath();for(let i=0;i<=5;i++){const an=i*2.513-1.571;i?g.lineTo(Math.cos(an)*R*.8,Math.sin(an)*R*.8):g.moveTo(Math.cos(an)*R*.8,Math.sin(an)*R*.8)}g.stroke();
   g.strokeStyle='rgba('+C[1]+','+(.85*al)+')';g.lineWidth=1.4;for(let i=0;i<10;i++){const an=i*.628;g.save();g.rotate(an);g.translate(0,-R*.91);g.beginPath();if(i%2){g.moveTo(-4,3);g.lineTo(0,-4);g.lineTo(4,3);g.closePath();g.moveTo(0,-1);g.lineTo(0,2)}else{g.arc(0,0,3.2,0,7);g.moveTo(-4,-4);g.lineTo(4,4)}g.stroke();g.restore()}g.restore();
   g.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const q=(now*.7*sp+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283,rr=R*Math.sqrt(fxR(f,i,3));g.fillStyle='rgba('+C[1]+','+(al*.8*Math.sin(q*Math.PI))+')';g.beginPath();g.ellipse(x+Math.cos(an)*rr+Math.sin(now*3+i)*4,y+4+Math.sin(an)*rr*.45-q*60,2.4,4,0,0,7);g.fill()}g.restore()},
 q8rp:(f,p,x,y,r,now)=>{const al=1-p;g.save();q8Ring(x,y+4,r*(.3+.7*q8eo(p)),'150,60,230',.85*al,4*al+.8);g.globalCompositeOperation='lighter';q8Ring(x,y+4,r*(.3+.7*q8eo(p)),'220,180,255',.5*al,1.2);g.restore()}});
try{Object.assign(R27D,{q8grd:1,q8kn:1,q8wnd:1,q8gale:1,q8imp:1,q8hand:1,q8orbt:1,q8cln:1,q8vdo:1,q8rit:1})}catch(e){}
setTimeout(()=>{try{Object.assign(FXD,{q8gsl:.55,q8kns:.45,q8wbl:.24,q8cyc:.7,q8imf:.36,q8cls:.3,q8rp:.5})}catch(e){}try{Object.assign(FXTOP,{q8grd:1,q8kn:1,q8kns:1,q8wnd:1,q8gale:1,q8wbl:1,q8imp:1,q8imf:1,q8hand:1,q8orbt:1,q8cln:1,q8cls:1,q8vdo:1})}catch(e){}},0);
/* ---------- ไอคอน ---------- */
Object.assign(Q8SVG,{
 mk:'<path d="M16 3L27 7V16Q27 25 16 30Q5 25 5 16V7Z" fill="#7a828e" stroke="#22262e" stroke-width="1.4"/><path d="M16 6L24 9V16Q24 23 16 27Q8 23 8 16V9Z" fill="#a8b0bc"/><g fill="#d8dde6" stroke="#22262e" stroke-width=".7"><path d="M3 12l-2-2 3 .4z"/><path d="M29 12l2-2-3 .4z"/><path d="M16 1.4l1.4 2.6h-2.8z"/></g><path d="M12 13l4 4 4-4M16 17v6" stroke="#ff6a4a" stroke-width="2" fill="none" stroke-linecap="round"/>',
 yk:'<g opacity=".9"><path d="M8 29L9 17L4 15V7L8 5L12 7V15L13 29Z" fill="#96c3ff" fill-opacity=".55" stroke="#dff0ff" stroke-width=".8"/><path d="M20 29L21 15L16 13V5L20 3L24 5V13L25 29Z" fill="#96c3ff" fill-opacity=".75" stroke="#dff0ff" stroke-width=".9"/></g><path d="M18 8h4M8 10h4" stroke="#283e70" stroke-width="1.6"/><path d="M27 2L23 20" stroke="#e8f4ff" stroke-width="1.6" stroke-linecap="round"/><path d="M20 4q3-4 6 0" stroke="#ff7a7a" stroke-width="1.4" fill="none"/>',
 aw:'<g fill="#b05a8a"><circle cx="9" cy="24" r="2.8"/><circle cx="17" cy="9" r="2.8"/><circle cx="27" cy="21" r="2.8"/></g><path d="M3 30L9 24L17 9L27 21L30 12" fill="none" stroke="#aaffaa" stroke-width="1.8" stroke-linejoin="round" stroke-dasharray="3 1.4"/><path d="M30 12l-1-3.6-2.4 3z" fill="#e8eef4" stroke="#1a1010" stroke-width=".5"/><g stroke="#ccffd8" stroke-width="1" fill="none"><path d="M6 26a4 2 0 1 0 6-2M14 11a4 2 0 1 0 6-2M24 23a4 2 0 1 0 6-2"/></g>',
 yw:'<g fill="none" stroke="#bfffc8" stroke-linecap="round"><path d="M16 16m-12 0a12 6 0 1 0 24 0" stroke-width="1.8" opacity=".7"/><path d="M16 14m-9 0a9 4.5 0 1 1 18 0" stroke-width="1.6"/><path d="M16 12m-6 0a6 3 0 1 0 12 0" stroke-width="1.4"/></g><g fill="#c8ffd0"><path d="M4 6q8-2 12 4q-6-2-12-4z"/><path d="M28 26q-8 2-12-4q6 2 12 4z"/></g><path d="M9 26L25 6" stroke="#6a4a2a" stroke-width="1.6"/><path d="M25 6l-4.4.6 3.4 3z" fill="#e8eef4"/>',
 gd:'<g fill="#5a1408" stroke="#1a0402" stroke-width=".8"><path d="M13 14L2 6L5 13L1 17L12 18Z"/><path d="M19 14L30 6L27 13L31 17L20 18Z"/></g><ellipse cx="16" cy="19" rx="6" ry="7" fill="#d8401a" stroke="#1a0402"/><circle cx="16" cy="11" r="5.6" fill="#d8401a" stroke="#1a0402"/><path d="M12 8L9.4 2L14 7M20 8L22.6 2L18 7" fill="#2a0804"/><g fill="#ffe060"><circle cx="13.8" cy="11" r="1.2"/><circle cx="18.2" cy="11" r="1.2"/></g><path d="M16 26q6 4 9 0" stroke="#5a1408" stroke-width="1.4" fill="none"/><circle cx="26" cy="27" r="2.4" fill="#ff9a30"/>',
 yg:'<ellipse cx="16" cy="28" rx="13" ry="3.4" fill="#ff5a14" fill-opacity=".5"/><path d="M8 28V14Q8 10 10 10Q12 10 12 13V6Q12 3 14 3Q16 3 16 6V4Q16 1.4 18 1.4Q20 1.4 20 4V7Q20 4.6 22 4.6Q24 4.6 24 7V16L27 13Q29 12 29.4 14L24 24V28Z" fill="#3a0c0c" stroke="#ff7a2a" stroke-width="1.1"/><g fill="#e8dcc8"><path d="M12 6l1-4 1 4z"/><path d="M16 4l1-4 1 4z"/><path d="M20 4.4l1-4 1 4z"/></g><path d="M12 22q3-6 0-10M17 24q2-8 0-14" stroke="#ff7a2a" stroke-width=".9" fill="none"/>',
 nb:'<ellipse cx="16" cy="16" rx="12" ry="7" fill="none" stroke="#c8a0ff" stroke-width="1.2" opacity=".6"/><g fill="#e8e0f8" stroke="#2a1a3a" stroke-width=".6"><path d="M4 16q2-5 7-5q-4 2-5 6z"/><path d="M28 16q-2 5-7 5q4-2 5-6z"/><path d="M16 9q5 1 6 5q-3-3-7-3z"/><path d="M16 23q-5-1-6-5q3 3 7 3z"/></g><circle cx="16" cy="16" r="3.4" fill="#3a2a4a" stroke="#b48aff"/>',
 yb:'<g fill="#1e0e30" stroke="#b48aff" stroke-width=".8"><path d="M4 28Q3 18 6 13Q9 8 12 13Q15 18 14 28Z" opacity=".55"/><path d="M18 28Q17 18 20 13Q23 8 26 13Q29 18 28 28Z" opacity=".55"/><path d="M10 30Q9 17 13 11Q16 5 19 11Q23 17 22 30Z"/></g><g fill="#e0b8ff"><circle cx="14.8" cy="13" r=".9"/><circle cx="17.2" cy="13" r=".9"/></g><path d="M22 18l7-6" stroke="#f0e6ff" stroke-width="1.4" stroke-linecap="round"/>',
 uc:'<path d="M11 16L4 13V17L11 19L10 29L14 29L16 23L18 29L22 29L21 19L28 17V13L21 16Z" fill="#8a6a44" stroke="#2a1a0c" stroke-width=".9"/><circle cx="16" cy="9" r="6.4" fill="#8a6a44" stroke="#2a1a0c" stroke-width=".9"/><path d="M12.4 7l2.2 2.2M14.6 7l-2.2 2.2M17.4 7l2.2 2.2M19.6 7l-2.2 2.2M13 12.4h6" stroke="#2a1a0c" stroke-width=".9"/><g stroke="#c8c8d0" stroke-width="1"><path d="M8 16L2 12M23 22l6 2M16 3L19 0"/></g><g fill="#b040ff"><circle cx="2" cy="12" r="1.6"/><circle cx="29" cy="24" r="1.6"/><circle cx="19" cy="1" r="1.4"/></g>',
 yu:'<ellipse cx="16" cy="18" rx="14" ry="9" fill="#2a1240" stroke="#b48aff" stroke-width="1.4"/><ellipse cx="16" cy="18" rx="10.6" ry="6.6" fill="none" stroke="#d8b8ff" stroke-width=".8"/><path d="M16 10.6L19.6 23.6L8.4 15.4H23.6L12.4 23.6Z" fill="none" stroke="#e0c8ff" stroke-width="1"/><g fill="#d8b8ff"><ellipse cx="9" cy="6" rx="1.6" ry="2.6"/><ellipse cx="23" cy="4" rx="1.6" ry="2.6"/><ellipse cx="16" cy="3" rx="1.2" ry="2"/></g>'});
Object.keys(Q8SVG).forEach(k=>{if(!Q8IMG[k])Q8IMG[k]='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'+Q8SVG[k]+'</svg>')});
/* ---------- เสียง ---------- */
Object.assign(Q8SFX,{
 mk:()=>{sMetal(320,.6,.12,0);sMetal(480,.4,.08,.05);sBoom(90,.3,.25,0)},
 yk:()=>{sChoir([196,247,294],1.4,.05,0);for(let i=0;i<3;i++)sMetal(260+i*40,.5,.07,.15+i*.12);sBoom(70,.6,.3,.1)},
 aw:()=>{sTwang(.28);sWhoosh(.4,.28,800,3200,.02);for(let i=0;i<4;i++)sWhoosh(.12,.12,1400,3600,.14+i*.12,i%2?.5:-.5)},
 yw:()=>{sN(1.4,.2,{ft:'bandpass',f0:800,f1:2200,q:1.5,at:.2});sWhoosh(.6,.3,300,2800,.05);sShim(2400,.6,.04,.1,6)},
 gd:()=>{sO('square',300,900,.2,.04);sO('square',340,1000,.2,.035,{dl:.12});sN(.5,.14,{ft:'lowpass',f0:1200,f1:300,at:.05,dl:.05})},
 yg:()=>{sGrowl(55,1.6,.34,0);sN(1.2,.22,{ft:'lowpass',f0:600,f1:120,at:.3});setTimeout(()=>{try{sBoom(45,.8,.55,0);sCrack(.45,.03,900)}catch(e){}},2450)},
 nb:()=>{for(let i=0;i<6;i++)sShing(.14,i*.05,(i%2?.6:-.6));sWhoosh(.5,.22,600,2600,.05)},
 yb:()=>{sO('sine',700,120,.8,.06,{rv:.5});for(let i=0;i<4;i++)sShing(.18,.12+i*.06,(i%2?.7:-.7))},
 uc:()=>{sO('triangle',220,180,.6,.05,{rv:.5});sBell(180,1,.06,.05);sN(.5,.1,{ft:'highpass',f0:3000,dl:.1})},
 yu:()=>{sChoir([147,175,208],2,.05,0);sO('sawtooth',73,70,2,.035,{rv:.5});sBell(147,1.6,.08,.2)}});
