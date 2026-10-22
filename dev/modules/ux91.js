
/* ===== v485 · คลังสกิลรอบ 2 (ส่วนภาพ): เอฟเฟกต์ · ไอคอน · เสียง ของสกิลทางเลือกปุ่ม 3–4 =====
   q8leap กระโดดทุบ · q8shk แผ่นดินสั่น · q8gsw ดาบเทพ · q8snipe ศรสังหาร · q8chg ง้างธนู · q8hawk/q8dive เหยี่ยว · q8orb ลูกแก้ว
   q8bliz พายุหิมะ · q8dag กริชไล่ล่า · q8scy เคียวเงา · q8beam ลำแสง · q8orbs/q8ray ดวงแก้วเทวา · q8hl แสงฮีล
   ตัวที่ตามตัวคนร่าย (เหยี่ยว ดวงแก้ว เคียว ลำแสง พายุเดิน) วาดตามตำแหน่งปัจจุบันของเจ้าของ · ตอนกระโดด ตัวละครลอยขึ้นจริง (ทุกเครื่อง) */
const Q8J={},Q8HK={};
function q8Bird(x,y,a,s,fl,glow){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);
  if(glow){g.globalCompositeOperation='lighter';glowAt(0,0,17,glow,.55);g.globalCompositeOperation='source-over'}
  const w=Math.sin(fl),sp=13+4.5*w,sw=-2-6*w;g.lineJoin='round';g.strokeStyle='#1a1008';g.lineWidth=.8;
  for(const sd of[-1,1]){g.fillStyle='#7a4a22';g.beginPath();g.moveTo(3,sd*1.5);g.quadraticCurveTo(3,sd*sp*.6,sw,sd*sp);g.quadraticCurveTo(-3,sd*sp*.62,-5,sd*2.2);g.closePath();g.fill();g.stroke();
    g.strokeStyle='#2a160a';g.lineWidth=.7;for(let i=0;i<3;i++){const u=.55+i*.15;g.beginPath();g.moveTo(sw*u+1,sd*sp*u);g.lineTo(sw*u-2.5,sd*sp*u*.92);g.stroke()}g.strokeStyle='#1a1008';g.lineWidth=.8}
  g.fillStyle='#5e3818';g.beginPath();g.moveTo(-5,-2);g.lineTo(-12.5,-4);g.lineTo(-11,0);g.lineTo(-12.5,4);g.lineTo(-5,2);g.closePath();g.fill();g.stroke();
  g.fillStyle='#8c5c2c';g.beginPath();g.ellipse(0,0,7,3.3,0,0,7);g.fill();g.stroke();g.fillStyle='rgba(255,230,190,.45)';g.beginPath();g.ellipse(1,-1,4,1.2,0,0,7);g.fill();
  g.fillStyle='#f4efe4';g.beginPath();g.arc(6.6,0,2.9,0,7);g.fill();g.stroke();g.fillStyle='#ffc830';g.beginPath();g.moveTo(9.2,-1.1);g.lineTo(12,0);g.lineTo(9.2,1.1);g.closePath();g.fill();
  g.fillStyle='#111';g.beginPath();g.arc(7.6,-1.2,.6,0,7);g.arc(7.6,1.2,.6,0,7);g.fill();g.restore()}
function q8BigSword(x,y,s,gc,ga){g.save();g.translate(x,y);g.scale(s,s);g.lineJoin='round';
  if(ga>0){g.globalCompositeOperation='lighter';glowAt(0,-50,46,gc,.5*ga);g.globalCompositeOperation='source-over'}
  const gr=g.createLinearGradient(-7,0,7,0);gr.addColorStop(0,'#7c8a9c');gr.addColorStop(.45,'#f4f8ff');gr.addColorStop(.55,'#dfe7f2');gr.addColorStop(1,'#68768a');
  g.fillStyle=gr;g.strokeStyle='#141018';g.lineWidth=1.3;g.beginPath();g.moveTo(0,0);g.lineTo(-6.5,-15);g.lineTo(-7,-88);g.lineTo(7,-88);g.lineTo(6.5,-15);g.closePath();g.fill();g.stroke();
  g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1;g.beginPath();g.moveTo(-.4,-6);g.lineTo(-.4,-84);g.stroke();
  if(ga>0){g.globalCompositeOperation='lighter';g.strokeStyle='rgba('+gc+','+(.9*ga)+')';g.lineWidth=2.2;g.beginPath();for(let i=0;i<5;i++){const yy=-24-i*12;g.moveTo(-2.4,yy);g.lineTo(2.4,yy-4);g.moveTo(2.4,yy);g.lineTo(-2.4,yy-4)}g.stroke();g.globalCompositeOperation='source-over'}
  const gg=g.createLinearGradient(0,-96,0,-87);gg.addColorStop(0,'#fff2b0');gg.addColorStop(1,'#b07818');g.fillStyle=gg;g.beginPath();g.moveTo(-22,-90);g.quadraticCurveTo(-12,-97,0,-96);g.quadraticCurveTo(12,-97,22,-90);g.lineTo(18,-86);g.lineTo(-18,-86);g.closePath();g.fill();g.stroke();
  g.fillStyle='#5aa8ff';g.beginPath();g.arc(0,-91,2.8,0,7);g.fill();g.stroke();g.fillStyle='#4a2c14';g.fillRect(-3.2,-121,6.4,25);g.strokeRect(-3.2,-121,6.4,25);
  g.strokeStyle='#c8a050';g.lineWidth=1;for(let i=0;i<5;i++){g.beginPath();g.moveTo(-3.2,-99-i*4.6);g.lineTo(3.2,-101.5-i*4.6);g.stroke()}
  g.fillStyle='#e8c060';g.strokeStyle='#141018';g.lineWidth=1.2;g.beginPath();g.arc(0,-124.5,5,0,7);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.arc(-1.5,-126,1.5,0,7);g.fill();g.restore()}
function q8Kunai(x,y,a,s){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.lineJoin='round';g.fillStyle='#4a3e5c';g.strokeStyle='#0c0812';g.lineWidth=.8;
  g.beginPath();g.moveTo(10,0);g.lineTo(2,-2.8);g.lineTo(-1,0);g.lineTo(2,2.8);g.closePath();g.fill();g.stroke();g.fillStyle='#d8d0ec';g.beginPath();g.moveTo(8.5,0);g.lineTo(2.4,-1.2);g.lineTo(1,0);g.lineTo(2.4,1.2);g.closePath();g.fill();
  g.fillStyle='#22182c';g.fillRect(-6,-1,5.4,2);g.strokeStyle='#8a7aa8';g.lineWidth=1;g.beginPath();g.arc(-7.6,0,1.8,0,7);g.stroke();g.restore()}
function q8Bez(x0,y0,x1,y1,sp,q){const mx=(x0+x1)/2,my=(y0+y1)/2,dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy)||1,cx=mx-dy/L*sp,cy=my+dx/L*sp-30,u=1-q;return[u*u*x0+2*u*q*cx+q*q*x1,u*u*y0+2*u*q*cy+q*q*y1]}
function q8Crk(f,x,y,r,al,n){g.strokeStyle='rgba(40,24,12,'+(.75*al)+')';g.lineWidth=2;for(let i=0;i<n;i++){const an=fxR(f,i,11)*6.283,L=r*(.55+.45*fxR(f,i,12));g.beginPath();g.moveTo(x,y);
  let px=x,py=y;for(let j=1;j<=3;j++){const u=j/3,o=(fxR(f,i,13+j)-.5)*.5;px=x+Math.cos(an+o)*L*u;py=y+Math.sin(an+o)*L*u*.45;g.lineTo(px,py)}g.stroke()}
  g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,170,80,'+(.5*al)+')';g.lineWidth=.9;for(let i=0;i<n;i++){const an=fxR(f,i,11)*6.283,L=r*(.55+.45*fxR(f,i,12))*.7;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(an)*L,y+Math.sin(an)*L*.45);g.stroke()}g.globalCompositeOperation='source-over'}
function q8Rocks(f,x,y,r,q,n,col){for(let i=0;i<n;i++){const an=fxR(f,i,21)*6.283,dd=r*(.3+.8*fxR(f,i,22))*q8eo(q),hh=(150*q-150*q*q)*(.4+fxR(f,i,23)),s=2+fxR(f,i,24)*2.6;
  g.fillStyle=col||'rgba(110,84,60,'+(1-q*q)+')';g.beginPath();g.ellipse(x+Math.cos(an)*dd,y+Math.sin(an)*dd*.45-hh,s,s*.8,an,0,7);g.fill()}}
function q8Ring(x,y,R,c,a,w){g.strokeStyle='rgba('+c+','+a+')';g.lineWidth=w;g.beginPath();g.ellipse(x,y,Math.max(1,R),Math.max(1,R)*.45,0,0,7);g.stroke()}
Object.assign(FXB,{
 /* กระโดดทุบพสุธา: วงเป้าที่จุดลง + เส้นโค้งกระโดด → ลงกระแทก แผ่นดินแตก (u='b' วงดูดก่อนลง) */
 q8leap:(f,p,x,y,r,now)=>{const D=f.d||1,t=p*D,T=.38,sx=f.sx,sy=f.sy,pull=f.u==='b',R=pull?r*.55:r;g.save();
   if(t<T){const q=t/T;g.globalCompositeOperation='lighter';q8Ring(x,y+4,R*(1.25-.25*q),'255,150,70',.35+.5*q,2.2);q8Ring(x,y+4,R*.45*q,'255,210,140',.5*q,1.4);
     if(pull){g.save();g.translate(x,y+4);g.scale(1,.45);g.strokeStyle='rgba(255,170,110,'+(.5*q)+')';g.lineWidth=1.6;for(let i=0;i<8;i++){const an=i*.785+now*3,rr=r*(1-((now*1.6+i*.125)%1)*.6);g.beginPath();g.arc(0,0,rr,an,an+.5);g.stroke()}g.restore()}
     const N=14;g.strokeStyle='rgba(255,200,130,.55)';g.lineWidth=2.4;g.beginPath();for(let i=0;i<=N;i++){const u=i/N*q8io(q),px=sx+(x-sx)*u,py=sy+(y-sy)*u-Math.sin(u*Math.PI)*58;i?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();
     g.globalCompositeOperation='source-over';const e=q8io(q),gx=sx+(x-sx)*e,gy=sy+(y-sy)*e;g.fillStyle='rgba(0,0,0,'+(.42-.14*Math.sin(q*Math.PI))+')';g.beginPath();g.ellipse(gx,gy+4,14-5*Math.sin(q*Math.PI),5-1.6*Math.sin(q*Math.PI),0,0,7);g.fill();
     for(let i=0;i<6;i++){const qq=Math.min(1,t/.3),an=fxR(f,i,1)*6.283;g.fillStyle='rgba(170,150,120,'+(.6*(1-qq))+')';g.beginPath();g.arc(sx+Math.cos(an)*16*qq,sy+4+Math.sin(an)*6*qq-6*qq,4*(1-qq)+1.5,0,7);g.fill()}}
   else{const q=q8c(t,T,D),al=1-q;q8Crk(f,x,y+4,R*1.15,Math.min(1,(1-q)*1.6),9);g.globalCompositeOperation='lighter';glowAt(x,y-4,R*1.1,'255,150,60',.75*Math.max(0,1-q*2.2));
     for(let i=0;i<3;i++){const qq=Math.min(1,q*1.5+i*.12);q8Ring(x,y+4,R*(.25+qq*1.05),'255,'+(200+i*20)+',150',.9*(1-qq),4*(1-qq)+1)}
     if(q<.25){const qq=q/.25;g.fillStyle='rgba(255,240,200,'+(.7*(1-qq))+')';g.beginPath();g.ellipse(x,y+4,R*.5*(1-qq*.5),R*.2,0,0,7);g.fill()}
     g.globalCompositeOperation='source-over';q8Rocks(f,x,y+4,R,q,10);for(let i=0;i<8;i++){const an=fxR(f,i,31)*6.283,dd=R*(.6+.6*q8eo(q));g.fillStyle='rgba(160,140,115,'+(.45*al)+')';g.beginPath();g.arc(x+Math.cos(an)*dd,y+4+Math.sin(an)*dd*.45-8*q,7*q+3,0,7);g.fill()}}
   g.restore()},
 /* แผ่นดินแยก: ระลอกสั่นซ้ำ */
 q8shk:(f,p,x,y,r,now)=>{g.save();const al=1-p;q8Crk(f,x,y+4,r*.9,al,6);g.globalCompositeOperation='lighter';q8Ring(x,y+4,r*(.3+.8*q8eo(p)),'255,190,120',.8*al,3*al+.8);glowAt(x,y,r*.6,'255,140,60',.35*al);
   g.globalCompositeOperation='source-over';q8Rocks(f,x,y+4,r*.8,p,6);g.restore()},
 /* ดาบเทพตกฟ้า: ดาบยักษ์ร่วงจากฟ้า ปักพื้น ปล่อยพลังเป็นจังหวะ (u='s' ดาบเล็กสามเล่ม · 'b' ระเบิดตอนจบ) */
 q8gsw:(f,p,x,y,r,now)=>{const D=f.d||3.5,t=p*D,u=f.u||'',S=u==='s'?.62:1,ti=.5,fall=q8c(t,0,ti),gc=u==='b'?'255,150,60':'150,200,255',out=Math.min(1,(D-t)/.35);g.save();
   if(t<ti){g.globalCompositeOperation='lighter';const pl=.4+.4*Math.sin(now*24);q8Ring(x,y+4,r*(1.1-.1*fall),'255,90,70',(.35+.4*fall)*pl+.2,2);q8Ring(x,y+4,r*.5,'255,200,150',.35*fall,1.2);
     g.fillStyle='rgba(200,225,255,'+(.25*fall)+')';g.fillRect(x-9*S,y-420,18*S,424);g.globalCompositeOperation='source-over';
     g.fillStyle='rgba(0,0,0,'+(.1+.25*fall)+')';g.beginPath();g.ellipse(x,y+4,8+18*fall*S,3+6*fall*S,0,0,7);g.fill();
     const ty=y+10-(1-q8ei(fall))*320;g.globalAlpha=Math.min(1,t/.08);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,230,255,.5)';g.lineWidth=2;for(let i=0;i<4;i++){const ox=(fxR(f,i,1)-.5)*20*S;g.beginPath();g.moveTo(x+ox,ty-130*S-30-fxR(f,i,2)*60);g.lineTo(x+ox,ty-130*S-90-fxR(f,i,2)*80);g.stroke()}
     g.globalCompositeOperation='source-over';q8BigSword(x,ty,S,gc,.6);g.globalAlpha=1}
   else{const q=q8c(t,ti,ti+.6);if(q<1){q8Crk(f,x,y+4,r*1.1,1-q,10);g.globalCompositeOperation='lighter';glowAt(x,y-20,r*1.2,gc,.8*(1-q));for(let i=0;i<3;i++){const qq=Math.min(1,q*1.3+i*.13);q8Ring(x,y+4,r*(.3+qq*1.1),'220,240,255',.9*(1-qq),4*(1-qq)+1)}
       g.fillStyle='rgba(235,245,255,'+(.5*(1-q8c(q,0,.4)))+')';g.fillRect(x-12*S,y-420,24*S,424);g.globalCompositeOperation='source-over';q8Rocks(f,x,y+4,r,q,12)}
     else q8Crk(f,x,y+4,r*1.1,out*.6,10);
     let ga=.35;if(u!=='s'&&t>1){const ph=((t-1)%.5)/.5;ga=.35+.65*(1-ph);g.globalCompositeOperation='lighter';q8Ring(x,y+4,75*(.35+.75*q8eo(ph)),gc,.75*(1-ph)*out,2.6*(1-ph)+.6);g.globalCompositeOperation='source-over'}
     if(u==='b'){const k=q8c(t,1,D);ga=Math.max(ga,k)+.25*Math.sin(now*30)*k}
     g.globalAlpha=out;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x+4,y+5,18*S,6*S,0,0,7);g.fill();q8BigSword(x,y+14,S,gc,Math.max(0,ga)*out);
     g.fillStyle='#5a4632';g.strokeStyle='#2a1e12';g.lineWidth=1;g.beginPath();g.ellipse(x,y+7,13*S,5*S,0,0,7);g.fill();g.stroke();g.fillStyle='#6e5840';g.beginPath();g.ellipse(x-3*S,y+5.5,6*S,2.4*S,0,0,7);g.fill();
     if(out<1){g.globalCompositeOperation='lighter';for(let i=0;i<8;i++){const qq=1-out,yy=y-10-fxR(f,i,5)*110*S-qq*40;g.fillStyle='rgba('+gc+','+(out*.9)+')';g.beginPath();g.arc(x+(fxR(f,i,6)-.5)*16,yy,1.8,0,7);g.fill()}}}
   g.restore()},
 /* ศรสังหาร: ศรพลังพุ่งทะลุแนว ลมหมุนรอบหัวศร (u='a' หัวระเบิดสีส้ม) */
 q8snipe:(f,p,x,y,r,now)=>{const D=f.d||.55,T=Math.max(.05,D-.3),t=p*D,a=f.a,L=f.len||380,d=L*Math.min(1,t/T),hx=x+Math.cos(a)*d,hy=y-12+Math.sin(a)*d,boom=f.u==='a',C=boom?'255,160,80':'140,230,255',al=t<T?1:1-(t-T)/.3;
   g.save();g.globalCompositeOperation='lighter';const b0=Math.max(0,d-170);
   const gr=g.createLinearGradient(x+Math.cos(a)*b0,y-12+Math.sin(a)*b0,hx,hy);gr.addColorStop(0,'rgba('+C+',0)');gr.addColorStop(1,'rgba('+C+','+(.7*al)+')');
   g.strokeStyle=gr;g.lineCap='round';g.lineWidth=9;g.beginPath();g.moveTo(x+Math.cos(a)*b0,y-12+Math.sin(a)*b0);g.lineTo(hx,hy);g.stroke();g.lineWidth=2.4;g.strokeStyle='rgba(255,255,255,'+(.8*al)+')';g.beginPath();g.moveTo(x+Math.cos(a)*Math.max(0,d-90),y-12+Math.sin(a)*Math.max(0,d-90));g.lineTo(hx,hy);g.stroke();
   if(t>=T){g.strokeStyle='rgba('+C+','+(.4*al)+')';g.lineWidth=1.5;g.beginPath();g.moveTo(x,y-12);g.lineTo(x+Math.cos(a)*L,y-12+Math.sin(a)*L);g.stroke()}
   for(let i=0;i<3;i++){const dd=d-28-i*34;if(dd<0)continue;g.save();g.translate(x+Math.cos(a)*dd,y-12+Math.sin(a)*dd);g.rotate(a);g.strokeStyle='rgba('+C+','+(.65*al*(1-i*.25))+')';g.lineWidth=1.4;g.beginPath();g.ellipse(0,0,3.5,9+i*2.5,0,0,7);g.stroke();g.restore()}
   if(t<T){glowAt(hx,hy,22,C,.7);g.globalCompositeOperation='source-over';g.save();g.translate(hx,hy);g.scale(1.6,1.6);q8Arrow(0,0,a,0,C,1);g.restore()}
   else if(t<T+.15){const q=(t-T)/.15;glowAt(x+Math.cos(a)*L,y-12+Math.sin(a)*L,18*(1-q)+4,C,.6*(1-q))}
   if(t<.08){const q=t/.08;glowAt(x+Math.cos(a)*12,y-12+Math.sin(a)*12,26,'255,255,255',.6*(1-q));q8Ring(x,y+2,20+30*q,C,.7*(1-q),2)}
   g.restore()},
 /* ง้างธนู: พลังไหลเข้าหาปลายศร */
 q8chg:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},a=f.a,px=o.x+Math.cos(a)*16,py=o.y-12+Math.sin(a)*16;g.save();g.globalCompositeOperation='lighter';glowAt(px,py,8+16*p,'150,230,255',.4+.5*p);
   g.strokeStyle='rgba(170,235,255,'+(.8*(1-p))+')';g.lineWidth=1.6;g.beginPath();g.arc(px,py,26*(1-p)+3,0,7);g.stroke();
   for(let i=0;i<10;i++){const an=fxR(f,i,1)*6.283,q=(p*1.6+fxR(f,i,2))%1,dd=34*(1-q);g.fillStyle='rgba(200,245,255,'+(.9*q)+')';g.beginPath();g.arc(px+Math.cos(an)*dd,py+Math.sin(an)*dd*.8,1.5,0,7);g.fill()}g.restore()},
 /* เหยี่ยวล่าเหยื่อ: เหยี่ยวบินวนเหนือหัวเจ้าของ (u='2' สองตัว) · ตอนโฉบจะซ่อนตัวที่วนอยู่ */
 q8hawk:(f,p,x,y,r,now)=>{const o=q8Own(f);if(!o)return;const D=f.d||8,t=p*D,n=parseInt(f.u)||1,al=Math.min(1,t/.3,(D-t)/.4),tn=performance.now();g.save();
   if(t<.45){const q=t/.45;g.globalCompositeOperation='lighter';glowAt(o.x,o.y-40,30*(1-q)+8,'255,230,160',.6*(1-q));g.globalCompositeOperation='source-over'}
   for(let h=0;h<n;h++){if(Q8HK[f.by+':'+h]>tn)continue;const an=tn/1000*2.2+h*Math.PI,hx=o.x+Math.cos(an)*42,hy=o.y-46+Math.sin(an)*16,hd=Math.atan2(Math.cos(an)*16,-Math.sin(an)*42);
     g.globalAlpha=al*.22;g.fillStyle='#000';g.beginPath();g.ellipse(hx,o.y+6+Math.sin(an)*6,11,3.4,0,0,7);g.fill();g.globalAlpha=al;q8Bird(hx,hy,hd,1.4,now*13+h*2,/b/.test(f.u||'')?'120,170,255':null)}
   g.restore()},
 /* โฉบจิก: บินโค้งลงหาเป้า จิกแล้วบินกลับขึ้น */
 q8dive:(f,p,x,y,r,now)=>{const sx=f.sx,sy=f.sy,tx=x,ty=y-12,T=.44;let px,py,hd;g.save();
   if(p<T){const q=q8ei(p/T),cx=(sx+tx)/2,cy=Math.min(sy,ty)-40;const u=1-q;px=u*u*sx+2*u*q*cx+q*q*tx;py=u*u*sy+2*u*q*cy+q*q*ty;const dx=2*u*(cx-sx)+2*q*(tx-cx),dy=2*u*(cy-sy)+2*q*(ty-cy);hd=Math.atan2(dy,dx);
     g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,230,170,.35)';g.lineWidth=3;g.beginPath();for(let i=0;i<=8;i++){const qq=Math.max(0,q-.25)+(q-Math.max(0,q-.25))*i/8,uu=1-qq;const X=uu*uu*sx+2*uu*qq*cx+qq*qq*tx,Y=uu*uu*sy+2*uu*qq*cy+qq*qq*ty;i?g.lineTo(X,Y):g.moveTo(X,Y)}g.stroke();g.globalCompositeOperation='source-over'}
   else{const q=q8eo(q8c(p,T,1));px=tx+(sx-tx)*q;py=ty+(sy-ty)*q-Math.sin(q*Math.PI)*20;hd=Math.atan2(sy-ty,sx-tx)}
   if(p>T-.06&&p<.85){const q=q8c(p,T-.06,.85);g.globalCompositeOperation='lighter';glowAt(tx,ty,18*(1-q)+4,'255,240,200',.7*(1-q));g.strokeStyle='rgba(255,250,235,'+(1-q)+')';g.lineWidth=2.2*(1-q)+.5;
     for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(tx-10+i*5,ty-10);g.quadraticCurveTo(tx+i*5,ty-2,tx+8+i*5,ty+10);g.stroke()}
     g.globalCompositeOperation='source-over'}
   g.globalAlpha=Math.min(1,(1-p)/.12);q8Bird(px,py,hd,1.35,now*(p<T?6:16),null);g.restore()},
 /* ลูกแก้วพลังเวท: ลูกแก้วลอยช้า ๆ ไปข้างหน้า (u='o' วนรอบตัวเจ้าของ) */
 q8orb:(f,p,x,y,r,now)=>{const D=f.d||2.2,t=p*D,orb=f.u==='o';let ox,oy;if(orb){const o=q8Own(f)||{x,y},an=t*3.2;ox=o.x+Math.cos(an)*75;oy=o.y+Math.sin(an)*45}else{ox=x+Math.cos(f.a)*(f.len||330)*p;oy=y+Math.sin(f.a)*(f.len||330)*p}
   const al=Math.min(1,t/.15,(D-t)/.25),R=orb?50:r;g.save();g.globalCompositeOperation='lighter';
   g.save();g.translate(ox,oy+4);g.scale(1,.45);const gr=g.createRadialGradient(0,0,0,0,0,R);gr.addColorStop(0,'rgba(170,120,255,'+(.25*al)+')');gr.addColorStop(1,'rgba(120,80,255,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,7);g.fill();
   g.strokeStyle='rgba(200,160,255,'+(.5*al)+')';g.lineWidth=1.6;g.setLineDash([6,6]);g.lineDashOffset=-now*30;g.beginPath();g.arc(0,0,R*.9,0,7);g.stroke();g.setLineDash([]);g.restore();
   for(let i=0;i<8;i++){const q=(now*1.4+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283;g.fillStyle='rgba(210,180,255,'+(al*(1-q))+')';g.beginPath();g.arc(ox+Math.cos(an)*(10+q*14)-(orb?0:Math.cos(f.a)*q*30),oy-18+Math.sin(an)*(8+q*8)-(orb?0:Math.sin(f.a)*q*30),1.8*(1-q)+.5,0,7);g.fill()}
   const cy=oy-18+Math.sin(now*5)*2.5;glowAt(ox,cy,30,'160,110,255',.75*al);g.globalCompositeOperation='source-over';g.globalAlpha=al;
   const og=g.createRadialGradient(ox-3,cy-4,1,ox,cy,13);og.addColorStop(0,'#ffffff');og.addColorStop(.35,'#d8c0ff');og.addColorStop(1,'#5a2ab8');g.fillStyle=og;g.beginPath();g.arc(ox,cy,12,0,7);g.fill();g.strokeStyle='rgba(40,10,90,.8)';g.lineWidth=1;g.stroke();
   g.globalCompositeOperation='lighter';g.strokeStyle='rgba(230,210,255,.85)';g.lineWidth=1.3;for(let i=0;i<2;i++){g.save();g.translate(ox,cy);g.rotate(now*(i?2.6:-3.4)+i);g.scale(1,.35);g.beginPath();g.arc(0,0,18,0,7);g.stroke();g.restore()}
   if(Math.sin(now*17+f.s)>.55){const an=now*7%6.283;g.strokeStyle='rgba(220,200,255,.9)';g.lineWidth=1;g.beginPath();g.moveTo(ox,cy);g.lineTo(ox+Math.cos(an)*14,cy+Math.sin(an)*8);g.lineTo(ox+Math.cos(an+.4)*24,cy+Math.sin(an+.4)*14);g.stroke()}
   g.restore()},
 /* พายุหิมะ: ลานน้ำแข็ง + หิมะหมุนวน (u='f' เดินตามตัว · 'b' ผลึกน้ำแข็งงอกตอนท้าย) */
 q8bliz:(f,p,x,y,r,now)=>{const D=f.d||4,t=p*D,fol=f.u==='f';let cx=x,cy=y;if(fol){const o=q8Own(f);if(o){cx=o.x;cy=o.y}}const al=Math.min(1,t/.35,(D-t)/.4);g.save();g.globalCompositeOperation='lighter';
   g.save();g.translate(cx,cy+4);g.scale(1,.45);const gr=g.createRadialGradient(0,0,r*.2,0,0,r);gr.addColorStop(0,'rgba(140,190,255,'+(.07*al)+')');gr.addColorStop(.7,'rgba(140,200,255,'+(.1*al)+')');gr.addColorStop(.93,'rgba(190,230,255,'+(.26*al)+')');gr.addColorStop(1,'rgba(150,210,255,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,r,0,7);g.fill();
   g.strokeStyle='rgba(225,245,255,'+(.55*al)+')';g.lineWidth=2;for(let i=0;i<4;i++){const an=-now*2.2+i*1.571;g.beginPath();g.arc(0,0,r*(.55+.12*(i%2)),an,an+.9);g.stroke()}g.restore();
   for(let i=0;i<5;i++){const an=-now*2.6+i*1.257;g.strokeStyle='rgba(235,248,255,'+(.4*al)+')';g.lineWidth=1.4;g.beginPath();g.ellipse(cx,cy-22-i*7,r*(.75-i*.08),r*(.75-i*.08)*.3,0,an,an+1.1);g.stroke()}
   for(let i=0;i<38;i++){const h=(now*.9+fxR(f,i,1))%1,an=fxR(f,i,2)*6.283-now*(1.6+fxR(f,i,4)),rr=r*Math.sqrt(fxR(f,i,3)),px=cx+Math.cos(an)*rr,py=cy+4+Math.sin(an)*rr*.45-(1-h)*90;
     g.fillStyle='rgba(245,252,255,'+(al*Math.sin(h*Math.PI)*.95)+')';g.beginPath();g.arc(px,py,1.3+fxR(f,i,5)*1.4,0,7);g.fill()}
   if(f.u==='b'){const k=q8c(t,D-1.2,D);if(k>0){g.globalCompositeOperation='source-over';for(let i=0;i<14;i++){const an=fxR(f,i,7)*6.283,rr=r*.85*Math.sqrt(fxR(f,i,8)),px=cx+Math.cos(an)*rr,py=cy+4+Math.sin(an)*rr*.45,hh=(14+fxR(f,i,9)*20)*q8eo(k),w=4+fxR(f,i,10)*3;
       g.fillStyle='rgba(205,238,255,'+(.9*al)+')';g.strokeStyle='rgba(50,110,165,'+al+')';g.lineWidth=.9;g.beginPath();g.moveTo(px-w,py);g.lineTo(px-w*.3,py-hh);g.lineTo(px+w*.2,py-hh*.8);g.lineTo(px+w,py);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(255,255,255,'+(.7*al)+')';g.fillRect(px-w*.35,py-hh*.85,1.2,hh*.7)}}}
   g.restore()},
 /* กริชเงาไล่ล่า: กริชโค้งไล่ไปหามอนแต่ละตัว (pts = [id มอน, ระยะโค้ง]) */
 q8dag:(f,p,x,y,r,now)=>{if(!f.pts)return;if(!f.lp)f.lp={};g.save();const q=q8io(p);
   for(let i=0;i<f.pts.length;i++){const [id,sp]=f.pts[i],m=mons.find(o=>o.id===id);if(m)f.lp[i]=[m.x,m.y];const T=f.lp[i];if(!T)continue;const tx=T[0],ty=T[1]-12,sy=y-14;
     const P=q8Bez(x,sy,tx,ty,sp,q),P0=q8Bez(x,sy,tx,ty,sp,Math.max(0,q-.12)),a=Math.atan2(P[1]-P0[1],P[0]-P0[0]);
     g.globalCompositeOperation='lighter';g.strokeStyle='rgba(170,100,255,.5)';g.lineWidth=3;g.beginPath();for(let j=0;j<=6;j++){const Q=q8Bez(x,sy,tx,ty,sp,Math.max(0,q-.22)+(q-Math.max(0,q-.22))*j/6);j?g.lineTo(Q[0],Q[1]):g.moveTo(Q[0],Q[1])}g.stroke();
     glowAt(P[0],P[1],9,'180,110,255',.5);g.globalCompositeOperation='source-over';if(p<.97)q8Kunai(P[0],P[1],a,1.15)}
   if(p>.9){const k=q8c(p,.9,1);g.globalCompositeOperation='lighter';for(const i in f.lp){const T=f.lp[i];glowAt(T[0],T[1]-12,14,'200,140,255',.8*(1-k*.5))}}
   g.restore()},
 /* เคียวเงาพิฆาต: เคียวยักษ์กวาดรอบตัว n รอบ (u='2'/'3') */
 q8scy:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||1,t=p*D,n=parseInt(f.u)||2,gap=.33,R=r;g.save();
   g.globalCompositeOperation='lighter';glowAt(o.x,o.y-6,46,'120,60,200',.35*Math.min(1,(D-t)/.2));g.globalCompositeOperation='source-over';
   for(let i=0;i<n;i++){const s0=.02+gap*i,q=(t-s0)/.2;if(q<0||q>1.8)continue;const dir=i%2?-1:1,a0=fxR(f,i,1)*6.283,th=a0+dir*6.283*q8io(Math.min(1,q)),fa=q>1?1-(q-1)/.8:1;
     g.save();g.translate(o.x,o.y-6);g.scale(1,.55);
     for(let j=0;j<16;j++){const u1=(j+1)/16,b0=th-dir*2.2*(1-j/16),b1=th-dir*2.2*(1-u1);g.strokeStyle='rgba(38,10,66,'+(.42*u1*fa)+')';g.lineWidth=R*.36;g.beginPath();g.arc(0,0,R*.74,Math.min(b0,b1),Math.max(b0,b1));g.stroke()}
     g.globalCompositeOperation='lighter';for(let j=0;j<12;j++){const u1=(j+1)/12,b0=th-dir*1.7*(1-j/12),b1=th-dir*1.7*(1-u1);g.strokeStyle='rgba(170,90,255,'+(.4*u1*fa)+')';g.lineWidth=R*.09;g.beginPath();g.arc(0,0,R*.9,Math.min(b0,b1),Math.max(b0,b1));g.stroke()}
     const e0=th-dir*1.3;g.strokeStyle='rgba(240,225,255,'+(.9*fa)+')';g.lineWidth=2.2;g.beginPath();g.arc(0,0,R*.97,Math.min(e0,th),Math.max(e0,th));g.stroke();g.globalCompositeOperation='source-over';g.restore();
     if(q<=1){const bx=o.x+Math.cos(th)*R*.84,by=o.y-6+Math.sin(th)*R*.84*.55,tx=-Math.sin(th)*dir,ty=Math.cos(th)*.55*dir,ang=Math.atan2(ty,tx),inv=Math.cos(th)*Math.sin(ang)-Math.sin(th)*.55*Math.cos(ang),sg=inv>0?1:-1;
       g.lineCap='round';g.strokeStyle='#1e120a';g.lineWidth=4.2;g.beginPath();g.moveTo(o.x,o.y-14);g.lineTo(bx,by);g.stroke();g.strokeStyle='#6a4a30';g.lineWidth=2;g.stroke();
       g.save();g.translate(bx,by);g.rotate(ang);g.scale(1,sg);g.globalCompositeOperation='lighter';glowAt(26,2,26,'170,90,255',.55);g.globalCompositeOperation='source-over';
       g.fillStyle='#1e1428';g.strokeStyle='#e4d4ff';g.lineWidth=1.4;g.lineJoin='round';g.beginPath();g.moveTo(-2,-4);g.quadraticCurveTo(28,-13,54,9);g.quadraticCurveTo(30,-1,-1,5);g.closePath();g.fill();g.stroke();
       g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=.9;g.beginPath();g.moveTo(4,-4.6);g.quadraticCurveTo(28,-11.5,50,6);g.stroke();g.fillStyle='#c8a050';g.beginPath();g.arc(0,0,2.6,0,7);g.fill();g.restore()}}
   g.restore()},
 /* ลำแสงศักดิ์สิทธิ์: ลำแสงจากมือเจ้าของไปทางเป้า (sx/sy = id มอน · u='b' สีเยียวยา) */
 q8beam:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||2.2,t=p*D,al=Math.min(1,t/.12,(D-t)/.2),L=r,C=f.u==='b'?'160,255,170':'255,220,120';if(!f.la)f.la=[0,0];g.save();g.globalCompositeOperation='lighter';
   [f.sx,f.sy].forEach((id,i)=>{if(!id)return;const m=mons.find(q=>q.id===id);if(m&&m.hp>0)f.la[i]=Math.atan2(m.y-o.y,m.x-o.x);const a=f.la[i],sx=o.x+Math.cos(a)*10,sy=o.y-16+Math.sin(a)*10,ex=o.x+Math.cos(a)*L,ey=o.y-12+Math.sin(a)*L,w=(i?.75:1)*(1+.18*Math.sin(now*22));
     g.lineCap='round';const bg=(c,a2)=>{const q=g.createLinearGradient(sx,sy,ex,ey);q.addColorStop(0,'rgba('+c+','+a2+')');q.addColorStop(.75,'rgba('+c+','+(a2*.8)+')');q.addColorStop(1,'rgba('+c+',0)');return q};g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.strokeStyle=bg(C,.16*al);g.lineWidth=15*w;g.stroke();g.strokeStyle=bg(C,.45*al);g.lineWidth=6*w;g.stroke();g.strokeStyle=bg('255,255,240',.85*al);g.lineWidth=2*w;g.stroke();
     for(let j=0;j<10;j++){const q=(now*1.7+fxR(f,j+i*10,1))%1,off=(fxR(f,j+i*10,2)-.5)*14;g.fillStyle='rgba(255,250,220,'+(al*(1-q))+')';g.beginPath();g.arc(sx+(ex-sx)*q-Math.sin(a)*off,sy+(ey-sy)*q+Math.cos(a)*off,1.7,0,7);g.fill()}
     glowAt(sx,sy,15,C,.7*al);if(m&&m.hp>0){const dm=Math.min(L,Math.hypot(m.x-o.x,m.y-o.y));glowAt(o.x+Math.cos(a)*dm,o.y-12+Math.sin(a)*dm,20+4*Math.sin(now*30),'255,255,230',.6*al)}});
   g.restore()},
 /* ดวงแก้วเทวา: ดวงแก้ว 3 ดวงวนรอบตัว + วงเยียวยา (u='a' สีชมพู · 'b' สีส้ม) */
 q8orbs:(f,p,x,y,r,now)=>{const o=q8Own(f)||{x,y},D=f.d||8,t=p*D,al=Math.min(1,t/.3,(D-t)/.3),C=f.u==='a'?'255,150,200':f.u==='b'?'255,170,90':'255,225,130';g.save();g.globalCompositeOperation='lighter';
   g.save();g.translate(o.x,o.y+4);g.scale(1,.45);g.strokeStyle='rgba('+C+','+(.35*al)+')';g.lineWidth=1.5;g.setLineDash([4,7]);g.lineDashOffset=now*16;g.beginPath();g.arc(0,0,90,0,7);g.stroke();g.setLineDash([]);g.restore();
   for(let oi=0;oi<3;oi++){const an=t*2.4+oi*2.0944,ox=o.x+Math.cos(an)*34,oy=o.y-18+Math.sin(an)*14,bk=Math.sin(an)<0?.55:1;
     for(let j=1;j<=4;j++){const a2=an-j*.16;g.fillStyle='rgba('+C+','+(.25*al*(1-j/5))+')';g.beginPath();g.arc(o.x+Math.cos(a2)*34,o.y-18+Math.sin(a2)*14,6-j*.9,0,7);g.fill()}
     glowAt(ox,oy,20,C,.75*al*bk);g.fillStyle='rgba(255,255,245,'+(al*bk)+')';g.beginPath();g.arc(ox,oy,5.2,0,7);g.fill();g.strokeStyle='rgba('+C+','+(.85*al*bk)+')';g.lineWidth=1.4;g.beginPath();g.arc(ox,oy,8.5+Math.sin(now*8+oi)*1.5,0,7);g.stroke();g.save();g.translate(ox,oy);g.rotate(now*2+oi);g.strokeStyle='rgba(255,255,230,'+(.6*al*bk)+')';g.lineWidth=1;g.beginPath();g.moveTo(-11,0);g.lineTo(11,0);g.moveTo(0,-11);g.lineTo(0,11);g.stroke();g.restore()}
   g.restore()},
 /* ลำแสงสั้นจากดวงแก้ว (u='h' แสงฮีลสีเขียว) */
 q8ray:(f,p,x,y,r,now)=>{const C=f.u==='h'?'150,255,170':'255,225,130',al=1-p,ex=x,ey=y-12;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
   g.strokeStyle='rgba('+C+','+(.5*al)+')';g.lineWidth=6*al+1;g.beginPath();g.moveTo(f.sx,f.sy);g.lineTo(ex,ey);g.stroke();g.strokeStyle='rgba(255,255,240,'+al+')';g.lineWidth=1.8*al+.4;g.stroke();
   glowAt(ex,ey,14*(1-p*.5),C,.8*al);glowAt(f.sx,f.sy,8,C,.7*al);g.restore()},
 /* แสงฮีลลงที่ตัวคนรับ */
 q8hl:(f,p,x,y,r,now)=>{const al=1-p;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-14,22,'140,255,160',.55*al);q8Ring(x,y+4,10+16*q8eo(p),'170,255,180',.8*al,1.6);
   for(let i=0;i<5;i++){const px=x+(fxR(f,i,1)-.5)*22,py=y-6-q8eo(p)*30-fxR(f,i,2)*12;g.fillStyle='rgba(190,255,200,'+al+')';g.fillRect(px-.8,py-3,1.6,6);g.fillRect(px-3,py-.8,6,1.6)}g.restore()}});
try{Object.assign(R27D,{q8leap:1,q8gsw:1,q8snipe:1,q8chg:1,q8hawk:1,q8orb:1,q8bliz:1,q8dag:1,q8scy:1,q8beam:1,q8orbs:1})}catch(e){}
setTimeout(()=>{try{Object.assign(FXD,{q8shk:.45,q8dive:.5,q8ray:.28,q8hl:.7})}catch(e){}try{Object.assign(FXTOP,{q8gsw:1,q8chg:1,q8hawk:1,q8dive:1,q8bliz:1,q8dag:1,q8scy:1,q8beam:1,q8orbs:1,q8ray:1,q8hl:1})}catch(e){}},0);
/* ---------- ไอคอน ---------- */
Object.assign(Q8SVG,{
 mj:'<path d="M4 20Q9 4 21 13" fill="none" stroke="#ffc890" stroke-width="1.6" stroke-dasharray="2.2 1.8" stroke-linecap="round"/><path d="M19.5 9.5l3 4-4.6.6z" fill="#ffc890"/><ellipse cx="22" cy="25" rx="9" ry="3.2" fill="none" stroke="#ff8a40" stroke-width="1.8"/><g stroke="#3a2010" stroke-width="1.4" stroke-linecap="round"><path d="M22 25l-6 2.6M22 25l5.6 2.4M22 25l1-3.4M22 25l-7-1.6"/></g><g fill="#a08060"><circle cx="14" cy="20" r="1.4"/><circle cx="29" cy="19" r="1.2"/><circle cx="25" cy="18" r="1"/></g><path d="M22 14l1.4 4 4-1.6-2.4 3.4" fill="none" stroke="#fff2c0" stroke-width="1.2"/>',
 mg:'<rect x="13.4" y="0" width="5.2" height="18" fill="#cfe4ff" opacity=".35"/><path d="M16 29l-3-5V8h6v16z" fill="#e8f0fa" stroke="#141018" stroke-width=".9"/><path d="M16 26V9" stroke="#fff" stroke-width=".8"/><path d="M9 8.4Q16 5 23 8.4L21.6 10H10.4z" fill="#e8c060" stroke="#141018" stroke-width=".8"/><rect x="14.6" y="1.6" width="2.8" height="5.6" fill="#4a2c14"/><circle cx="16" cy="1.6" r="1.6" fill="#e8c060"/><ellipse cx="16" cy="28.6" rx="11" ry="2.6" fill="none" stroke="#9ad0ff" stroke-width="1.5"/><g stroke="#9ad0ff" stroke-width="1" stroke-linecap="round"><path d="M5 25l-2-2M27 25l2-2M8 22l-1.4-2.4M24 22l1.4-2.4"/></g>',
 ad:'<g fill="none" stroke="#8ae6ff" stroke-linecap="round"><path d="M3 29L27 5" stroke-width="3" opacity=".45"/><ellipse cx="10" cy="22" rx="2" ry="5" transform="rotate(45 10 22)" stroke-width="1.2"/><ellipse cx="15" cy="17" rx="2" ry="4" transform="rotate(45 15 17)" stroke-width="1.2"/></g><path d="M5 27L24 8" stroke="#5a3a1a" stroke-width="1.8"/><path d="M28.5 3.5l-7.4 2.2 5.2 5.2z" fill="#e8eef4" stroke="#1a1010" stroke-width=".7"/><path d="M5 27l-3 .4 1.6-2.6M5 27l-.4 3 2.6-1.6" stroke="#f4f0e0" stroke-width="1.2" fill="none"/><circle cx="25" cy="7" r="5.6" fill="none" stroke="#ff7060" stroke-width="1"/>',
 ah:'<g transform="translate(16 15) rotate(-90)"><path d="M3 -1.5Q3 -10 -4 -14Q-4 -8 -5 -2Z" fill="#7a4a22" stroke="#1a1008" stroke-width=".7"/><path d="M3 1.5Q3 10 -4 14Q-4 8 -5 2Z" fill="#7a4a22" stroke="#1a1008" stroke-width=".7"/><path d="M-5 -2L-12 -4L-10.6 0L-12 4L-5 2Z" fill="#5e3818" stroke="#1a1008" stroke-width=".7"/><ellipse cx="0" cy="0" rx="6.6" ry="3.2" fill="#8c5c2c" stroke="#1a1008" stroke-width=".7"/><circle cx="6" cy="0" r="2.8" fill="#f4efe4" stroke="#1a1008" stroke-width=".6"/><path d="M8.4 -1L11 0L8.4 1Z" fill="#ffc830"/></g><g stroke="#ffe8b0" stroke-width="1" stroke-linecap="round" opacity=".8"><path d="M4 27l3-3M10 29l2-3.4M24 28l-2.4-3"/></g>',
 go:'<ellipse cx="16" cy="25" rx="11" ry="3.6" fill="none" stroke="#b48aff" stroke-width="1.3" stroke-dasharray="3 2.4"/><circle cx="16" cy="14" r="8" fill="#7a46d8" stroke="#2a0e5a" stroke-width="1"/><circle cx="13.6" cy="11.4" r="3.6" fill="#e8dcff" opacity=".85"/><ellipse cx="16" cy="14" rx="12" ry="3.6" fill="none" stroke="#ead8ff" stroke-width="1.2" transform="rotate(-18 16 14)"/><g fill="#d8c0ff"><circle cx="4" cy="8" r="1.1"/><circle cx="28" cy="20" r="1"/><circle cx="26" cy="5" r=".9"/></g>',
 gz:'<ellipse cx="16" cy="25" rx="13" ry="4" fill="#bfe6ff" fill-opacity=".25" stroke="#d8f2ff" stroke-width="1.2"/><g fill="none" stroke="#e8f8ff" stroke-width="1.3" stroke-linecap="round"><path d="M5 12Q16 4 27 12"/><path d="M8 17Q16 12 24 17"/></g><g stroke="#fff" stroke-width="1.4" stroke-linecap="round"><path d="M16 4v10M11.7 6.5l8.6 5M11.7 11.5l8.6-5"/></g><g fill="#fff"><circle cx="7" cy="21" r="1.1"/><circle cx="24" cy="21" r="1.2"/><circle cx="12" cy="24" r=".9"/><circle cx="20" cy="9" r=".8"/><circle cx="27" cy="16" r=".9"/></g>',
 nd:'<g fill="none" stroke="#b48aff" stroke-width="1.3" stroke-linecap="round" opacity=".75"><path d="M4 26Q6 10 22 6"/><path d="M4 26Q14 20 26 16"/><path d="M4 26Q12 28 25 25"/></g><g fill="#4a3e5c" stroke="#0c0812" stroke-width=".6"><path d="M26 5l-6 .4 1.6 3.4z"/><path d="M29 16l-5.6-2.2-.2 3.8z"/><path d="M28.4 25.4l-5.4-2.6.2 3.8z"/></g><circle cx="4" cy="26" r="2.4" fill="#2a2036" stroke="#b48aff" stroke-width=".8"/>',
 ns:'<ellipse cx="16" cy="17" rx="13" ry="7" fill="none" stroke="#9a5aff" stroke-width="2.2" stroke-dasharray="14 5" opacity=".8"/><path d="M8 29L22 4" stroke="#4a3a2a" stroke-width="2.2" stroke-linecap="round"/><path d="M21 4.6Q31 6 30 16Q27 9 19.4 8.2z" fill="#2a2036" stroke="#e0d0ff" stroke-width="1"/><path d="M22 6.4Q27 8 28 12" stroke="#fff" stroke-width=".7" fill="none"/>',
 ub:'<g stroke-linecap="round"><path d="M5 27L28 5" stroke="#ffd66a" stroke-width="6" opacity=".35"/><path d="M5 27L28 5" stroke="#ffe8a0" stroke-width="3"/><path d="M5 27L28 5" stroke="#fff" stroke-width="1.2"/></g><circle cx="5" cy="27" r="3.4" fill="#fff6c8" stroke="#e0a830" stroke-width=".8"/><g fill="#fff2b0"><path d="M18 9l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/><circle cx="24" cy="15" r="1"/><circle cx="12" cy="17" r=".9"/></g>',
 uo:'<ellipse cx="16" cy="17" rx="12" ry="5" fill="none" stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2.4 2"/><circle cx="16" cy="16" r="3.4" fill="#fff6d0" opacity=".9"/><g fill="#fff8e0" stroke="#e0a830" stroke-width=".9"><circle cx="5.4" cy="15" r="3.2"/><circle cx="24.6" cy="12" r="3.2"/><circle cx="19" cy="22.6" r="3.2"/></g><g stroke="#fff2b0" stroke-width="1" stroke-linecap="round"><path d="M24.6 4.6v3M16 4v3M7 7.6l1.4 2"/></g>'});
Object.keys(Q8SVG).forEach(k=>{if(!Q8IMG[k])Q8IMG[k]='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'+Q8SVG[k]+'</svg>')});
/* ---------- เสียง ---------- */
Object.assign(Q8SFX,{
 mj:()=>{sWhoosh(.24,.36,300,1800);sO('sine',260,520,.3,.05)},
 mg:()=>{sShim(2400,.5,.05,0,8);sO('sine',1800,600,.45,.05,{rv:.4})},
 ad:()=>{sO('sine',600,1400,.3,.05);sTwang(.32);sArrow(.16,.3,0)},
 ah:()=>{sO('triangle',2400,1500,.18,.06);sO('triangle',2600,1700,.16,.05,{dl:.16});sWhoosh(.14,.3,600,2200,.05)},
 go:()=>{sO('sine',220,440,.6,.07,{rv:.5});sShim(1300,.6,.04,.05,7)},
 gz:()=>{sN(1.2,.14,{ft:'bandpass',f0:600,f1:1800,q:1.2,at:.25});sShim(2600,.9,.04,.1,10)},
 nd:()=>{for(let i=0;i<5;i++)sShing(.12,i*.04,(i-2)*.4);sWhoosh(.12,.3,800,3000,.02)},
 ns:()=>{sWhoosh(.28,.4,200,1400);sWhoosh(.24,.36,240,1600,.33);sO('sawtooth',90,60,.5,.05,{rv:.3})},
 ub:()=>{sChoir([523,659,784],1.6,.05);sO('sine',1200,1250,1.6,.04,{rv:.4})},
 uo:()=>{sBell(660,.9,.08,0);sBell(880,.8,.06,.12);sBell(990,.8,.05,.24);sShim(2000,.8,.04,.05,8)}});
/* เสียงกระแทกตามจังหวะจริง (ทุกเครื่องที่อยู่ใกล้) + ตัวลอยตอนกระโดด + ซ่อนเหยี่ยวตอนโฉบ */
function q8Near2(o,R){return me.cls&&Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0))<(R||520)}
q8Recv=(f=>function(o){f.apply(this,arguments);if(!o||typeof o.k!=='string')return;const n=performance.now();
  if(o.k==='q8leap'&&typeof o.by==='string'){Q8J[o.by]={t0:n,T:380};if(q8Near2(o))setTimeout(()=>{try{sBoom(80,.45,.42,0);sCrack(.35,.02,1200)}catch(e){}},360)}
  else if(o.k==='q8gsw'){if(q8Near2(o))setTimeout(()=>{try{sBoom(70,.6,o.u==='s'?.3:.5,0);sMetal(500,.5,.08,.02);sCrack(.4,.04,1400)}catch(e){}},480)}
  else if(o.k==='q8dive'&&typeof o.by==='string'){Q8HK[o.by+':'+(o.u||'0')]=n+500;if(q8Near2(o,420))try{sO('triangle',2800,1800,.12,.035);setTimeout(()=>{try{sN(.12,.08,{ft:'highpass',f0:2500})}catch(e){}},210)}catch(e){}}
  else if(o.k==='q8shk'){if(q8Near2(o,420))try{sBoom(110,.25,.2,0)}catch(e){}}})(q8Recv);
setTimeout(()=>{try{drawP=(f=>function(x,y){const u=arguments[13]&&arguments[13].u,J=u&&Q8J[u];if(J){const e=(performance.now()-J.t0)/J.T;if(e>=0&&e<1){const a=Array.prototype.slice.call(arguments);a[1]=y-Math.sin(e*Math.PI)*62;return f.apply(this,a)}if(e>=1.5)delete Q8J[u]}return f.apply(this,arguments)})(drawP)}catch(e){}},1800);
