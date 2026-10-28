
/* ---------- v554 แผนที่โฉมใหม่ — ธีมแมพภาค 1 (1 ทุ่งรอบค่าย · 2 หุบเขากระดูก · 3 เพลิงนรก · 4 น้ำแข็ง · 5 ลานหอคอย · 6 นครจมบาดาล · 7 เหมืองทอง · 8 ทะเลทราย · 10 รอยแยกนภา · 11 หลังรอยแยก) ---------- */

/* ===================== 1 · ทุ่งหญ้ารอบค่าย ===================== */
MXC[1]={k:'grass',amp:130,sc:640,lit:[255,250,220],shd:[12,34,26],kl:.36,ks:.24,ao:.5,ff:.1,cs:.26,dap:.18,cla:.12,gw:1.3,base:'g0',ug:'grass',tree:'oak',dk:{0:1,1:1,3:1,4:1},mr:1,mats:[
  {t:'g1',c:f=>mxSS(.6,.7,f.m*.45+(1-f.h)*.35+f.d*.35),e:-10},
  {t:'g2',c:f=>mxSS(.47,.55,f.h*.7+f.q*.3)*(1-mxSS(.35,.8,f.d)),e:3},
  {t:'g4',c:f=>mxSS(.62,.7,f.w)*(1-mxSS(.3,.6,f.d))*mxSS(.36,.48,f.h),e:0},
  {t:'g3',c:f=>mxSS(.63,.69,f.w*.55+f.m*.45)*mxSS(.5,.38,f.h)*(1-mxSS(.15,.45,f.d)),e:0,hi:1,fr:'grass',rim:[[40,26,14],[255,230,190]],rk:[90,40]}]};
Object.assign(MXT,{
 g0:B=>{B.fill([46,80,38]);B.blob(40,[64,102,46],[36,66,32],16,46,.24,.38);
   B.carpet(2200,[[26,50,26],[34,62,30],[42,74,34]],2.4,4.6,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(3400,[[30,58,28],[44,80,36],[60,100,44],[80,124,54],[104,148,64],[132,172,80]],3.4,7.6,{per:10,cr:7,w:.95,tip:[200,236,140]});
   B.tuft(26,[[28,56,28],[52,94,42],[90,136,62],[190,228,130]],6,10,{per:[1,2],cr:4,sh:.18});
   B.clover(10,[60,110,48],[84,138,62]);B.flower(26,[['rgba(250,248,240,1)','#ffd860'],['rgba(255,214,80,1)','#c88a10'],['rgba(150,180,255,1)','#fff8e0'],['rgba(255,170,196,1)','#fff0f4'],['rgba(196,160,250,1)','#fff6d0']],1,3,7);
   B.leaf(5,[[128,140,62],[104,126,56]],1.2,1.9);B.peb(4,[110,104,90],[150,142,124],.8,1.4,.22)},
 g1:B=>{B.fill([28,52,30]);B.blob(36,[40,70,38],[20,40,24],12,40,.26,.4);
   B.carpet(2000,[[14,30,18],[20,40,22],[26,50,28]],2.6,5,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(3000,[[18,38,22],[28,56,30],[40,74,38],[56,96,48],[78,122,62]],4,9,{per:10,cr:7,w:.95,tip:[150,196,120]});
   B.fern(16,[44,92,46],[58,110,56],7,12);B.leaf(14,[[140,110,54],[112,90,46],[90,110,50]],1.3,2.1);B.tuft(20,[[16,36,22],[34,68,36],[60,104,56],[140,188,116]],7,12,{per:[1,2],cr:4})},
 g2:B=>{B.fill([84,118,48]);B.blob(40,[104,136,58],[70,102,42],12,40,.22,.34);
   B.carpet(1800,[[54,84,34],[64,98,40],[74,108,44]],2,4,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(3000,[[58,90,36],[78,112,46],[100,134,56],[124,156,66],[152,178,82],[184,200,104]],2.8,6.2,{per:10,cr:7,w:.95,tip:[236,236,160]});
   B.tuft(18,[[140,122,74],[170,150,92],[196,178,112]],4,7,{per:[1,2],cr:3,k0:2,k1:4,sh:.12});
   B.flower(10,[['rgba(255,236,120,1)','#c88a10'],['rgba(250,248,240,1)','#ffd860']],1,3,7)},
 g3:B=>{B.fill([118,90,60]);B.blob(36,[138,108,74],[90,68,46],10,30,.28,.42);B.crack(8,'rgba(56,40,26,.6)',.75,20,'rgba(190,160,120,.3)');
   B.peb(40,[124,112,94],[176,162,136],.9,2.3,.3);B.peb(7,[110,100,86],[156,142,120],2.4,3.8,.32);B.leaf(8,[[150,108,56],[120,88,44]],1.2,2);B.grain(1600,.05,.07)},
 g4:B=>{B.flower(34,[['rgba(250,248,240,1)','#ffd860'],['rgba(255,214,80,1)','#c88a10'],['rgba(190,156,246,1)','#f6ecff'],['rgba(255,164,186,1)','#fff0f4']],3,6,10);B.tuft(30,[[40,76,38],[66,108,54],[96,138,68],[170,206,116]],4,7,{per:[1,2],cr:3})}});
MXU.grass=[
  ()=>mxTuftSpr('gt0',[[26,52,28],[50,90,44],[84,128,62]],11,7,11),
  ()=>mxTuftSpr('gt1',[[30,58,30],[58,98,48],[96,138,68]],8,5,12),
  ()=>mxDSpr('gf0',30,18,(x,w,h)=>{const R=gxRng(13);for(let f=0;f<5;f++){const a=-2.5+f*.5+(R()-.5)*.15,L=11+R()*4,X=w/2,Y=h-2;x.strokeStyle='#24461f';x.lineWidth=.7;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*L,Y+Math.sin(a)*L*.62);x.stroke();
     for(let k=1;k<7;k++){const t=k/7,qx=X+Math.cos(a)*L*t,qy=Y+Math.sin(a)*L*.62*t,s=(1-t)*2.2+.5;x.fillStyle=k%2?'#3e8238':'#4e9644';x.beginPath();x.ellipse(qx+Math.cos(a-1.57)*s*.8,qy+Math.sin(a-1.57)*s*.8,s,s*.42,a-1,0,7);x.ellipse(qx+Math.cos(a+1.57)*s*.8,qy+Math.sin(a+1.57)*s*.8,s,s*.42,a+1,0,7);x.fill()}}}),
  ()=>mxDSpr('gl0',18,10,(x,w,h)=>{const R=gxRng(14);for(let i=0;i<6;i++){const X=2+R()*14,Y=2+R()*6,a=R()*6.28,s=1.3+R()*.8;x.fillStyle=['#a8823a','#8e6a2c','#c0924a','#76823a'][i%4];x.save();x.translate(X,Y);x.rotate(a);x.beginPath();x.moveTo(-s,0);x.quadraticCurveTo(0,-s*.6,s,0);x.quadraticCurveTo(0,s*.6,-s,0);x.fill();x.restore()}}),
  ()=>mxDSpr('gm0',12,11,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(6.6,9.3,3.8,1.3,0,0,7);x.fill();x.fillStyle='#ece2c6';x.fillRect(5.3,5,1.5,4.4);const gr=x.createLinearGradient(3,2,9,6);gr.addColorStop(0,'#e0583a');gr.addColorStop(1,'#a8321e');x.fillStyle=gr;x.beginPath();x.ellipse(6,5.2,3.6,2.3,0,Math.PI,0);x.fill();x.fillStyle='#fff6ea';x.beginPath();x.arc(4.8,4,.5,0,7);x.arc(7,3.6,.45,0,7);x.fill()}),
  ()=>mxStoneSpr('gs0',[150,144,128],7,5,{top:[96,150,66],ta:.7})];
MXDC.grass={0:o=>[mxTuftSpr('dt0',[[30,60,30],[56,98,46],[92,136,66]],8,5,21),.7+o.k*.5],1:o=>[mxTuftSpr('dt1',[[60,104,48],[96,144,66],[140,184,92]],7,4,22),.7+o.k*.4],
  3:o=>[mxDSpr('dc0',10,7,(x,w,h)=>{for(let q=0;q<4;q++){const cx=2.5+q*1.8,cy=3+(q%2)*1.4;for(let l=0;l<3;l++){const a=l*2.094-1.57;x.fillStyle=l?'#4e8c3e':'#68a84e';x.beginPath();x.arc(cx+Math.cos(a)*1.1,cy+Math.sin(a)*.9,1.05,0,7);x.fill()}}}),.8+o.k*.5],
  4:o=>[mxDSpr('dw0',16,6,(x,w,h)=>{x.strokeStyle='#5a3e26';x.lineWidth=.9;x.beginPath();x.moveTo(1,4);x.lineTo(8,3);x.lineTo(15,4.5);x.moveTo(8,3);x.lineTo(11,1);x.stroke();x.strokeStyle='rgba(255,220,170,.35)';x.lineWidth=.4;x.beginPath();x.moveTo(1,3.5);x.lineTo(8,2.5);x.stroke()}),.8+o.k*.4]};
MXNS.grass={rim:[92,70,46],sp:[120,96,64],gl:'255,120,60',bone:[226,216,196]};

/* ----- ต้นไม้ใบกลมแบบมีปริมาตร (ใช้ร่วม: ทุ่งหญ้า · ลานหอคอย) ----- */
const MXTP={
 oak:[{o:[14,34,16],d:[30,64,28],m:[52,100,42],l:[90,144,58],hl:[164,212,100]},{o:[16,36,14],d:[36,72,30],m:[62,112,46],l:[100,154,62],hl:[176,220,108]},{o:[22,38,14],d:[48,80,30],m:[80,118,44],l:[124,166,66],hl:[196,226,124]}],
 spirit:[{o:[20,14,34],d:[42,32,66],m:[70,56,104],l:[108,92,150],hl:[184,166,226]},{o:[18,16,36],d:[40,38,74],m:[64,62,110],l:[100,98,156],hl:[170,174,230]},{o:[28,14,36],d:[58,34,72],m:[92,60,108],l:[138,98,156],hl:[210,170,226]}]};
function mxOakSpr(kind,r,v){const key=kind+r+'|'+v;return mxSprite(key,r*3.7,r*3.9,r*3.7/2,r*3.9-r*.3,(x,w,h)=>{
  const P=MXTP[kind][v%3],R=gxRng(r*977+v*131+7),bx=w/2,by=h-r*.3,cx=bx+(R()-.5)*r*.12,cy=by-r*1.62,RX=r*1.08,RY=r*.98;
  const tw=r*.2;const tg=x.createLinearGradient(bx-tw,0,bx+tw,0);tg.addColorStop(0,kind==='spirit'?'#6a5a7a':'#7a5a3c');tg.addColorStop(.35,kind==='spirit'?'#4a3e5a':'#5a3e28');tg.addColorStop(1,kind==='spirit'?'#1e1828':'#26180e');x.fillStyle=tg;
  x.beginPath();x.moveTo(bx-tw*1.9,by+1);x.quadraticCurveTo(bx-tw*.9,by-r*.12,bx-tw*.75,by-r*.5);x.lineTo(bx-tw*.55,cy+r*.3);x.lineTo(bx+tw*.55,cy+r*.3);x.lineTo(bx+tw*.8,by-r*.5);x.quadraticCurveTo(bx+tw,by-r*.12,bx+tw*2,by+1);x.closePath();x.fill();
  x.strokeStyle='rgba(20,12,6,.45)';x.lineWidth=.7;for(let i=0;i<4;i++){const ox=(i-1.5)*tw*.42;x.beginPath();x.moveTo(bx+ox,by-1);x.quadraticCurveTo(bx+ox*.8+(R()-.5),by-r*.4,bx+ox*.6,by-r*.85);x.stroke()}
  x.strokeStyle='rgba(255,220,170,.22)';x.lineWidth=.8;x.beginPath();x.moveTo(bx-tw*.7,by-2);x.quadraticCurveTo(bx-tw*.75,by-r*.4,bx-tw*.5,by-r*.95);x.stroke();
  x.strokeStyle=kind==='spirit'?'#2e2438':'#3a2616';x.lineWidth=r*.07;for(const sg of[-1,1]){x.beginPath();x.moveTo(bx,cy+r*.45);x.quadraticCurveTo(bx+sg*r*.3,cy+r*.25,bx+sg*r*.62,cy-r*.05);x.stroke()}
  const B=[];const nr=7+(v%2);for(let i=0;i<nr;i++){const a=i/nr*6.283+R()*.5,px=cx+Math.cos(a)*RX*.62,py=cy+Math.sin(a)*RY*.55+r*.06,rr=r*(.4+R()*.12);B.push([px,py,rr])}
  for(let i=0;i<4;i++){const a=R()*6.283,d=R()*.35,px=cx+Math.cos(a)*RX*d,py=cy+Math.sin(a)*RY*d-r*.12,rr=r*(.42+R()*.12);B.push([px,py,rr])}
  B.push([cx-r*.08,cy-r*.42,r*.44]);B.push([cx+r*.22,cy-r*.3,r*.36]);B.sort((a,b)=>(a[1]+a[2]*.3)-(b[1]+b[2]*.3));
  const bump=(px,py,rr,sd)=>{x.beginPath();const k=11;for(let i=0;i<=k;i++){const a=i/k*6.283,a2=(i+.5)/k*6.283,q=rr*(.9+.1*Math.sin(i*2.3+sd)),q2=rr*(1.04+.06*Math.sin(i*1.7+sd));const X1=px+Math.cos(a)*q,Y1=py+Math.sin(a)*q*.94;if(!i)x.moveTo(X1,Y1);else{const Xm=px+Math.cos(a2-6.283/k)*q2*1.08,Ym=py+Math.sin(a2-6.283/k)*q2*1.02;x.quadraticCurveTo(Xm,Ym,X1,Y1)}}x.closePath()};
  x.fillStyle=mxRgb(P.o);B.forEach(([px,py,rr],i)=>{bump(px,py+rr*.06,rr+1.3,i);x.fill()});
  B.forEach(([px,py,rr],i)=>{const up=Math.max(0,Math.min(1,(cy-py)/r+.6));const gr=x.createRadialGradient(px-rr*.38,py-rr*.46,rr*.08,px+rr*.1,py+rr*.12,rr*1.12);
    gr.addColorStop(0,mxRgb(mxMix(P.l,P.hl,up*.35)));gr.addColorStop(.42,mxRgb(P.m));gr.addColorStop(1,mxRgb(P.d));x.fillStyle=gr;bump(px,py,rr,i);x.fill();
    for(let k=0;k<9;k++){const a=R()*6.283,dd=Math.sqrt(R())*rr*.85,lx=px+Math.cos(a)*dd,ly=py+Math.sin(a)*dd,lit=(Math.cos(a)*-.55+Math.sin(a)*-.75)*dd/rr;x.fillStyle=lit>.1?mxRgb(P.hl,.28+.25*lit):mxRgb(P.o,.22);x.beginPath();x.ellipse(lx,ly,1.5+R()*.9,.9+R()*.5,R()*3,0,7);x.fill()}
    x.strokeStyle=mxRgb(P.hl,.32+.3*up);x.lineWidth=1.1;x.beginPath();x.arc(px,py,rr*.9,3.6,4.9);x.stroke()});
  x.globalCompositeOperation='source-atop';const sh=x.createLinearGradient(0,cy-r*.9,0,by);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(.5,'rgba(0,10,0,.06)');sh.addColorStop(1,'rgba(0,8,6,.42)');x.fillStyle=sh;x.fillRect(0,0,w,h);
  const sh2=x.createLinearGradient(cx-RX,0,cx+RX,0);sh2.addColorStop(0,'rgba(255,250,210,.06)');sh2.addColorStop(.6,'rgba(0,0,0,0)');sh2.addColorStop(1,'rgba(0,6,10,.16)');x.fillStyle=sh2;x.fillRect(0,0,w,h);x.globalCompositeOperation='source-over'})}
MXTR.oak=(t,r,sw)=>{const v=Math.abs((t.x*13+t.y*7)|0)%6,rr=Math.round(r/2)*2,s=mxOakSpr('oak',rr,v);mxBlit(s,t.x,t.y+r*.7,r/rr,sw*.025)};

/* ===================== 2 · หุบเขากระดูก (ดินฝุ่นยามเย็น) ===================== */
MXC[2]={k:'bone',amp:150,sc:600,lit:[255,226,186],shd:[34,20,30],kl:.32,ks:.28,ao:.5,ff:.08,cs:.24,cla:.11,gw:1.15,gwc:'255,206,150',gcc:'70,40,100',base:'b0',ug:'bone',tree:'dead',tby:.55,uby:.55,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'b1',c:f=>mxSS(.6,.68,(1-f.h)*.6+f.m*.4),e:-8},
  {t:'b3',c:f=>mxSS(.6,.68,f.h*.7+f.q*.3),e:4},
  {t:'b4',c:f=>mxSS(.63,.7,f.w*.6+f.q*.4)*(1-mxSS(.55,.7,f.h)),e:0},
  {t:'b2',c:f=>mxSS(.6,.66,f.m*.6+f.w*.4)*mxSS(.38,.5,f.h)*(1-mxSS(.6,.7,f.h)),e:0,hi:1,rim:[[40,26,18],[240,214,176]],rk:[120,60]}]};
Object.assign(MXT,{
 b0:B=>{B.fill([102,86,68]);B.blob(44,[122,104,82],[80,66,54],14,46,.22,.36);B.blob(30,[134,112,86],[88,72,58],4,12,.2,.32);
   B.crack(14,'rgba(42,30,22,.5)',.75,26,'rgba(210,178,136,.2)');B.peb(14,[124,110,92],[166,150,128],.7,1.6,.26);B.shard(8,[110,98,84],[150,136,118],1,2,.28);
   B.tuft(14,[[112,92,60],[150,128,84],[190,168,112],[232,212,162]],3,6,{per:[1,2],cr:3,sh:.14});B.grain(1600,.05,.07)},
 b1:B=>{B.fill([74,64,60]);B.blob(40,[90,80,74],[56,48,46],12,36,.24,.38);B.speck(60,[[30,24,22],[40,32,30]],.6,1.4,.7);B.ripple(10,'rgba(150,136,126,.18)','rgba(30,24,22,.2)',18,1,-.3);B.grain(1400,.03,.07)},
 b2:B=>{B.fill([138,114,86]);B.blob(30,[156,132,100],[116,94,70],10,30,.2,.32);B.cells(17,'rgba(64,44,28,.8)',1.15,'rgba(226,196,156,.38)',.85);B.grain(1200,.05,.06)},
 b3:B=>{B.fill([110,98,86]);B.blob(30,[128,116,102],[90,80,70],10,30,.2,.3);B.shard(70,[118,108,96],[176,162,144],1,2.6,.32);B.peb(16,[130,120,108],[180,168,150],.8,1.8,.3);B.grain(1200,.04,.07)},
 b4:B=>{B.tuft(110,[[118,94,56],[158,132,84],[198,174,116],[240,222,170]],5,10,{per:[2,4],cr:5,sh:.18});B.fuzz(160,[[150,126,80],[176,152,100]],2.5,4.5,.8)}});
MXU.bone=[
  ()=>mxTuftSpr('bt0',[[116,92,56],[160,134,86],[204,180,120]],10,6,31),
  ()=>mxDSpr('bw0',20,10,(x,w,h)=>{x.strokeStyle='#3e2e22';x.lineWidth=1.1;x.beginPath();x.moveTo(1,7);x.quadraticCurveTo(8,5,18,6.5);x.moveTo(7,6);x.lineTo(11,2.5);x.moveTo(13,6.2);x.lineTo(16,3.5);x.stroke();x.strokeStyle='rgba(220,190,150,.35)';x.lineWidth=.45;x.beginPath();x.moveTo(1,6.3);x.quadraticCurveTo(8,4.4,18,5.9);x.stroke()}),
  ()=>mxDSpr('bb0',16,8,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(9,6,6.5,1.5,0,0,7);x.fill();x.save();x.translate(8,4);x.rotate(-.2);x.fillStyle='#e8dcc4';x.fillRect(-5,-.9,10,1.8);x.beginPath();x.arc(-5,-.5,1.4,0,7);x.arc(-5,.6,1.4,0,7);x.arc(5,-.5,1.4,0,7);x.arc(5,.6,1.4,0,7);x.fill();x.fillStyle='rgba(120,100,80,.5)';x.fillRect(-4,.3,8,.6);x.restore()}),
  ()=>mxStoneSpr('bs0',[150,136,118],6,4.5,{sharp:1})];
const mxSkullSpr=()=>mxDSpr('bsk',11,10,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(6.4,8.2,4.2,1.4,0,0,7);x.fill();const gr=x.createLinearGradient(2,1,9,8);gr.addColorStop(0,'#fbf4e2');gr.addColorStop(1,'#b8aa8e');x.fillStyle=gr;x.beginPath();x.ellipse(5.5,4.5,3.8,3.4,0,0,7);x.fill();x.fillRect(3.4,5.5,4.2,2.4);
  x.fillStyle='#2a2018';x.beginPath();x.ellipse(4.2,4.6,1.05,1.2,0,0,7);x.ellipse(6.9,4.6,1.05,1.2,0,0,7);x.fill();x.fillRect(5.3,6,.5,.9);x.strokeStyle='rgba(60,50,40,.6)';x.lineWidth=.35;x.beginPath();for(let i=0;i<4;i++){x.moveTo(3.9+i*1,7.9);x.lineTo(3.9+i*1,7)}x.stroke()});
MXDC.bone={0:o=>[mxTuftSpr('bd0',[[120,96,58],[164,138,88],[206,182,124]],7,5,32),.75+o.k*.5],1:o=>[mxSkullSpr(),.62+o.k*.3],
  3:o=>[mxStoneSpr('bd3',[140,126,108],4,3,{sharp:1}),.8+o.k*.5],4:o=>[mxDSpr('bd4',18,6,(x,w,h)=>{x.strokeStyle='rgba(40,28,20,.75)';x.lineWidth=.9;x.beginPath();x.moveTo(1,3);x.lineTo(6,4);x.lineTo(10,2.5);x.lineTo(17,3.6);x.moveTo(6,4);x.lineTo(7,5.6);x.stroke();x.strokeStyle='rgba(220,190,150,.3)';x.lineWidth=.4;x.beginPath();x.moveTo(1,3.7);x.lineTo(6,4.7);x.lineTo(10,3.2);x.stroke()}),.8+o.k*.4]};
MXNS.bone={rim:[96,80,64],sp:[232,222,200],gl:'255,120,60',bone:[236,228,208]};
/* ต้นไม้ตาย: ลำต้นบิด กิ่งแตกแขนง ด้านซ้ายรับแสง */
function mxDeadSpr(r,v){return mxSprite('dead'+r+'|'+v,r*3.4,r*3.6,r*1.7,r*3.6-r*.2,(x,w,h)=>{const R=gxRng(r*131+v*977+5),bx=w/2,by=h-r*.2,s=v%2?1:-1;
  const br=(x0,y0,a,L,wd,d)=>{const x1=x0+Math.cos(a)*L,y1=y0+Math.sin(a)*L,cxp=x0+Math.cos(a+(R()-.5)*.6)*L*.55,cyp=y0+Math.sin(a+(R()-.5)*.6)*L*.55;
    x.strokeStyle='#2a1e16';x.lineWidth=wd;x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo(cxp,cyp,x1,y1);x.stroke();
    x.strokeStyle='rgba(176,148,116,.55)';x.lineWidth=Math.max(.4,wd*.3);x.beginPath();x.moveTo(x0-wd*.25,y0);x.quadraticCurveTo(cxp-wd*.25,cyp,x1-wd*.2,y1);x.stroke();
    if(d<3){const k=d<1?3:2;for(let i=0;i<k;i++)if(R()<.85)br(x1,y1,a+(i-(k-1)/2)*(.55+R()*.35)+(R()-.5)*.25,L*(.55+R()*.2),wd*.6,d+1)}};
  x.fillStyle='rgba(0,0,0,.0)';
  /* ลำต้น (ทรงเรียวบิด) */
  const tw=r*.22,top=[bx+s*r*.12,by-r*1.35];const tg=x.createLinearGradient(bx-tw,0,bx+tw,0);tg.addColorStop(0,'#8a7058');tg.addColorStop(.4,'#4e3c2e');tg.addColorStop(1,'#1e140e');x.fillStyle=tg;
  x.beginPath();x.moveTo(bx-tw*1.7,by+1);x.quadraticCurveTo(bx-tw*.8,by-r*.3,bx-tw*.6+s*r*.05,by-r*.8);x.quadraticCurveTo(top[0]-tw*.5,by-r*1.1,top[0]-tw*.35,top[1]);x.lineTo(top[0]+tw*.35,top[1]);x.quadraticCurveTo(top[0]+tw*.5,by-r*1.05,bx+tw*.7+s*r*.05,by-r*.7);x.quadraticCurveTo(bx+tw*.9,by-r*.25,bx+tw*1.8,by+1);x.closePath();x.fill();
  x.strokeStyle='rgba(20,12,8,.5)';x.lineWidth=.6;for(let i=0;i<3;i++){x.beginPath();x.moveTo(bx+(i-1)*tw*.5,by);x.quadraticCurveTo(bx+(i-1)*tw*.35+s*2,by-r*.6,top[0]+(i-1)*tw*.2,top[1]+4);x.stroke()}
  /* รากโผล่ */
  x.strokeStyle='#3a2a1e';x.lineWidth=r*.08;for(const q of[-1,1]){x.beginPath();x.moveTo(bx+q*tw*.8,by-1);x.quadraticCurveTo(bx+q*tw*2,by+r*.02,bx+q*tw*2.6,by+r*.12);x.stroke()}
  /* กิ่ง */
  br(top[0],top[1],-1.57-s*.5-.25,r*.85,r*.14,0);br(top[0],top[1]+r*.12,-1.57+s*.7,r*.7,r*.12,1);br(top[0]-s*tw*.2,top[1]+r*.35,-1.57-s*1.2,r*.55,r*.1,1);if(v%3===0)br(top[0],top[1],-1.57+s*.15,r*.9,r*.11,1)})}
MXTR.dead=(t,r,sw)=>{const v=Math.abs((t.x*7+t.y*3)|0)%6,rr=Math.round(r/2)*2;mxBlit(mxDeadSpr(rr,v),t.x,t.y+r*.55,r/rr,sw*.012)};

/* ===================== 3 · ดินแดนเพลิงนรก (หินบะซอลต์ · ทุ่งเถ้า · เปลือกร้อนเรือง · กระจกออบซิเดียน) ===================== */
MXC[3]={k:'lava',amp:120,sc:560,lit:[255,196,150],shd:[18,4,8],kl:.26,ks:.34,ao:.55,ff:.06,cs:.2,cla:.07,gw:.7,gwc:'255,170,110',gcc:'40,10,40',base:'l0',ug:'lava',tree:'basalt',tby:.45,uby:.45,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'l1',c:f=>mxSS(.56,.64,f.h*.7+f.q*.3),e:5},
  {t:'l2',c:f=>mxSS(.63,.7,(1-f.h)*.6+f.m*.4),e:-6},
  {t:'l3',c:f=>mxSS(.66,.72,f.m*.6+f.w*.4)*mxSS(.52,.42,f.h),e:0,hi:1,rim:[[0,0,0],[200,150,255]],rk:[110,80]}]};
Object.assign(MXT,{
 l0:B=>{B.fill([56,40,36]);B.blob(40,[72,52,46],[40,28,26],14,44,.22,.36);B.cells(23,'rgba(14,8,8,.78)',1.3,'rgba(160,110,90,.2)',.9);B.blob(18,[90,40,26],[60,30,24],4,10,.18,.3);
   B.peb(10,[70,56,52],[104,88,80],.7,1.6,.32);B.grain(1500,.03,.08)},
 l1:B=>{B.fill([92,82,78]);B.blob(40,[112,102,96],[74,66,62],12,40,.22,.36);B.ripple(16,'rgba(190,176,166,.25)','rgba(40,32,30,.25)',20,1.1,-.3);B.speck(70,[[40,32,30],[56,46,42]],.5,1.2,.75);B.peb(12,[120,110,104],[160,150,142],.7,1.5,.25);B.grain(1500,.05,.06)},
 l2:B=>{B.fill([72,30,22]);B.blob(30,[96,40,26],[50,20,16],10,30,.25,.4);B.cells(15,'rgba(255,122,40,.9)',1.25,'rgba(255,214,140,.45)',.8);B.stroke((x,R,W8,S)=>{x.globalCompositeOperation='lighter';for(let i=0;i<22;i++){const px=R()*S,py=R()*S,r=6+R()*10;W8(px,py,r,(X,Y)=>{const gr=x.createRadialGradient(X,Y,0,X,Y,r);gr.addColorStop(0,'rgba(255,110,30,.22)');gr.addColorStop(1,'rgba(255,80,20,0)');x.fillStyle=gr;x.fillRect(X-r,Y-r,r*2,r*2)})}x.globalCompositeOperation='source-over'});B.grain(1000,.03,.08)},
 l3:B=>{B.fill([24,18,28]);B.blob(30,[46,34,58],[14,10,18],10,30,.3,.45);B.stroke((x,R,W8,S)=>{for(let i=0;i<26;i++){const px=R()*S,py=R()*S,L=6+R()*14,a=-.7+(R()-.5)*.4;W8(px,py,L,(X,Y)=>{x.strokeStyle='rgba(210,180,255,'+(.25+R()*.3)+')';x.lineWidth=.6+R()*.6;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*L,Y+Math.sin(a)*L);x.stroke()})}});B.crack(10,'rgba(0,0,0,.7)',.7,16,'rgba(170,140,220,.25)');B.grain(800,.04,.06)}});
MXU.lava=[
  ()=>mxDSpr('la0',18,9,(x,w,h)=>{const gr=x.createRadialGradient(9,5,1,9,5,9);gr.addColorStop(0,'rgba(130,118,112,.95)');gr.addColorStop(1,'rgba(90,80,76,0)');x.fillStyle=gr;x.beginPath();x.ellipse(9,5.5,8.5,3.6,0,0,7);x.fill();x.fillStyle='rgba(40,30,28,.6)';for(let i=0;i<6;i++){x.beginPath();x.arc(4+i*2.1,4+(i%2)*2,.5,0,7);x.fill()}}),
  ()=>mxStoneSpr('lb0',[70,52,46],7,5,{sharp:1}),
  ()=>mxStoneSpr('lb1',[96,76,66],5,3.6,{sharp:1}),
  ()=>mxDSpr('lc0',8,6,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(4.6,4.4,2.8,1.1,0,0,7);x.fill();x.fillStyle='#2a1a16';x.beginPath();x.ellipse(4,3.4,2.4,1.7,0,0,7);x.fill();x.fillStyle='#ff8a34';x.beginPath();x.ellipse(4.2,3.2,1.1,.7,0,0,7);x.fill();x.fillStyle='#ffe0a0';x.beginPath();x.arc(4.1,3.1,.35,0,7);x.fill()})];
MXDC.lava={0:o=>[mxStoneSpr('ld0',[64,48,44],5,3.6,{sharp:1}),.7+o.k*.5],1:o=>[MXU.lava[3](),.8+o.k*.4],3:o=>[MXU.lava[0](),.6+o.k*.4],
  4:o=>[mxDSpr('ld4',20,7,(x,w,h)=>{x.strokeStyle='rgba(20,8,6,.8)';x.lineWidth=1.6;x.beginPath();x.moveTo(1,3.5);x.lineTo(7,4.4);x.lineTo(12,2.8);x.lineTo(19,4);x.stroke();x.strokeStyle='#ff7a2a';x.lineWidth=.9;x.stroke();x.strokeStyle='rgba(255,226,150,.85)';x.lineWidth=.35;x.stroke()}),.8+o.k*.4]};
MXNS.lava={rim:[70,40,32],sp:[40,28,30],gl:'255,110,40'};
/* หินบะซอลต์เหลี่ยม + รอยแตกแมกมา */
function mxBasaltSpr(r,v){return mxSprite('bas'+r+'|'+v,r*2.6,r*2.4,r*1.3,r*2.4-r*.35,(x,w,h)=>{const R=gxRng(r*71+v*313+9),cx=w/2,by=h-r*.35,k=7+(v%3),P=[];
  for(let i=0;i<k;i++){const a=Math.PI+i/(k-1)*Math.PI,rr=r*(.85+R()*.3)*(i===0||i===k-1?.95:1);P.push([cx+Math.cos(a)*rr*1.05,by+Math.sin(a)*rr*(1.05+(v%2)*.25)])}
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(cx+r*.15,by+r*.05,r*1.15,r*.28,0,0,7);x.fill();
  x.fillStyle='#1c1210';x.beginPath();x.moveTo(cx-r*1.12,by+1);P.forEach(p=>x.lineTo(p[0],p[1]));x.lineTo(cx+r*1.12,by+1);x.closePath();x.fill();
  /* หน้าตัด: ซ้ายบนรับแสงอุ่น · ขวาเงา */
  const top=P[Math.floor(k/2)];for(let i=0;i<k-1;i++){const p=P[i],q=P[i+1],lit=Math.max(0,Math.cos((p[0]+q[0])/2-cx<0?.6:2.4))*(i<k/2?1:.4);const c=mxMix([44,32,30],[118,90,78],lit*(.6+R()*.4));x.fillStyle=mxRgb(c);x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(q[0],q[1]);x.lineTo(cx+(top[0]-cx)*.25,by-r*.35);x.closePath();x.fill()}
  x.fillStyle='rgba(20,10,10,.35)';x.beginPath();x.moveTo(cx-r*1.1,by);x.lineTo(cx+(top[0]-cx)*.25,by-r*.35);x.lineTo(cx+r*1.1,by);x.closePath();x.fill();
  x.strokeStyle='rgba(255,210,170,.28)';x.lineWidth=.9;x.beginPath();P.slice(0,Math.ceil(k/2)+1).forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();
  x.strokeStyle='#0a0606';x.lineWidth=1.1;x.beginPath();x.moveTo(cx-r*1.12,by+1);P.forEach(p=>x.lineTo(p[0],p[1]));x.lineTo(cx+r*1.12,by+1);x.stroke();
  /* แมกมาในรอยแตก */
  const L=[[cx-r*.55,by-r*.1],[cx-r*.2,by-r*.45],[cx+r*.05,by-r*.25],[cx+r*.45,by-r*.6]];x.strokeStyle='#3a0c04';x.lineWidth=2.2;x.beginPath();L.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();x.strokeStyle='#ff6a20';x.lineWidth=1.2;x.stroke();x.strokeStyle='#ffe090';x.lineWidth=.45;x.stroke();
  x.globalCompositeOperation='lighter';const gr=x.createRadialGradient(cx-r*.1,by-r*.3,0,cx-r*.1,by-r*.3,r*.7);gr.addColorStop(0,'rgba(255,110,30,.25)');gr.addColorStop(1,'rgba(255,80,20,0)');x.fillStyle=gr;x.fillRect(0,0,w,h);x.globalCompositeOperation='source-over'})}
MXTR.basalt=(t,r,sw,now)=>{const v=Math.abs((t.x*13+t.y)|0)%6,rr=Math.round(r/2)*2;mxBlit(mxBasaltSpr(rr,v),t.x,t.y+r*.45,r/rr,0);if(!LOWQ){const gl=.55+.45*Math.sin(now/500+t.x);g.save();g.globalCompositeOperation='lighter';glowAt(t.x-r*.1,t.y+r*.15,r*1.1,'255,90,30',.07+.07*gl);g.restore()}};

/* ===================== 4 · วิหารน้ำแข็งนิรันดร์ (หิมะอัด · หิมะใหม่นูน · น้ำแข็งฟ้า · กรวดเยือกแข็ง) ===================== */
MXC[4]={k:'snow',amp:140,sc:620,lit:[255,255,255],shd:[40,72,132],kl:.42,ks:.3,ao:.42,ff:.06,cs:.22,cla:.09,gw:.85,gwc:'255,250,232',gcc:'60,90,160',base:'s0',ug:'snow',tree:'icecr',tby:.45,uby:.45,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'s1',c:f=>mxSS(.54,.62,f.h*.75+f.q*.25),e:10},
  {t:'s3',c:f=>mxSS(.67,.73,f.m*.5+f.w*.5)*mxSS(.58,.46,f.h),e:0},
  {t:'s2',c:f=>mxSS(.645,.7,(1-f.h)*.55+f.m*.45),e:-6,hi:1,rim:[[56,96,150],[255,255,255]],rk:[130,110]}]};
Object.assign(MXT,{
 s0:B=>{B.fill([178,200,220]);B.blob(44,[200,218,234],[150,174,200],14,46,.25,.4);B.ripple(30,'rgba(255,255,255,.6)','rgba(100,132,176,.32)',22,1.4,-.25);B.speck(80,[[255,255,255]],.4,.9,.7);B.peb(6,[120,136,156],[160,176,194],.7,1.4,.2);B.grain(1400,.06,.05)},
 s1:B=>{B.fill([216,230,242]);B.blob(40,[240,248,255],[190,208,228],12,40,.3,.45);B.ripple(16,'rgba(255,255,255,.7)','rgba(130,160,200,.25)',26,1.2,-.25);B.speck(120,[[255,255,255],[220,240,255]],.4,1,.85);B.grain(1000,.06,.03)},
 s2:B=>{B.fill([126,172,212]);B.blob(30,[160,204,236],[96,142,190],10,34,.3,.45);B.stroke((x,R,W8,S)=>{for(let i=0;i<16;i++){const px=R()*S,py=R()*S,L=14+R()*20;W8(px,py,L,(X,Y)=>{x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=2.4;x.beginPath();x.moveTo(X,Y);x.lineTo(X+L,Y-L*.45);x.stroke()})}});
   B.crack(12,'rgba(255,255,255,.65)',.7,24,'rgba(40,80,130,.35)');B.speck(40,[[230,246,255]],.4,1,.6);B.grain(600,.05,.04)},
 s3:B=>{B.fill([150,166,184]);B.blob(24,[170,186,202],[126,142,162],8,24,.2,.32);B.peb(46,[118,130,148],[170,182,198],.9,2.2,.28);B.speck(60,[[245,250,255]],.5,1.2,.8);B.grain(900,.05,.05)}});
MXU.snow=[
  ()=>mxDSpr('sm0',22,10,(x,w,h)=>{x.fillStyle='rgba(60,96,150,.3)';x.beginPath();x.ellipse(12,7,10,2.4,0,0,7);x.fill();const gr=x.createLinearGradient(0,2,0,8);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#cfe0f0');x.fillStyle=gr;x.beginPath();x.ellipse(11,6,9.5,3.4,0,Math.PI,0);x.lineTo(20.5,6.4);x.ellipse(11,6.4,9.5,1.6,0,0,Math.PI);x.fill()}),
  ()=>mxDSpr('si0',10,10,(x,w,h)=>{x.fillStyle='rgba(60,96,150,.3)';x.beginPath();x.ellipse(5.6,8.6,3.6,1,0,0,7);x.fill();x.fillStyle='#bfe6ff';x.beginPath();x.moveTo(3,8.4);x.lineTo(4.4,2);x.lineTo(6,8.4);x.closePath();x.fill();x.fillStyle='#ffffff';x.beginPath();x.moveTo(3.6,8);x.lineTo(4.4,2);x.lineTo(4.6,8);x.closePath();x.fill();x.fillStyle='#8cc4ee';x.beginPath();x.moveTo(5.4,8.4);x.lineTo(7,4.6);x.lineTo(8,8.4);x.closePath();x.fill()}),
  ()=>mxStoneSpr('ss0',[124,138,158],7,5,{top:[244,250,255],ta:.95})];
MXDC.snow={0:o=>[mxTuftSpr('sd0',[[150,176,200],[196,216,234],[236,246,255]],7,5,41),.7+o.k*.45],1:o=>[mxStoneSpr('sd1',[214,226,240],4.5,3.6,{top:[255,255,255],ta:.9}),.8+o.k*.5],
  3:o=>[mxDSpr('sd3',8,8,(x,w,h)=>{x.strokeStyle='rgba(255,255,255,.95)';x.lineWidth=.6;x.beginPath();x.moveTo(1,4);x.lineTo(7,4);x.moveTo(4,1);x.lineTo(4,7);x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(4,4,.8,0,7);x.fill()}),.6+o.k*.5],
  4:o=>[mxDSpr('sd4',20,7,(x,w,h)=>{x.strokeStyle='rgba(60,100,150,.55)';x.lineWidth=.9;x.beginPath();x.moveTo(1,3.4);x.lineTo(7,4.3);x.lineTo(12,2.6);x.lineTo(19,4);x.stroke();x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=.45;x.beginPath();x.moveTo(1,2.8);x.lineTo(7,3.7);x.lineTo(12,2);x.stroke()}),.8+o.k*.4]};
MXNS.snow={rim:[120,140,172],sp:[214,236,255],gl:'120,200,255'};
/* กลุ่มผลึกน้ำแข็งหกเหลี่ยม (หน้าซ้ายสว่าง · หน้าขวากลาง · ยอดขาว) + กองหิมะที่โคน */
function mxIceSpr(r,v){return mxSprite('ice'+r+'|'+v,r*2.8,r*3.6,r*1.4,r*3.6-r*.4,(x,w,h)=>{const R=gxRng(r*53+v*211+11),cx=w/2,by=h-r*.4,n=3+(v%2)*2;
  x.fillStyle='rgba(50,90,150,.28)';x.beginPath();x.ellipse(cx+r*.2,by+r*.05,r*1.15,r*.3,0,0,7);x.fill();
  const C=[];for(let i=0;i<n;i++){const f=n>1?i/(n-1)-.5:0,dx=f*r*1.15+(R()-.5)*r*.12,hh=r*(Math.abs(f)<.2?1.75+R()*.45:1.05+R()*.45)*(1-Math.abs(f)*.25),ww=r*(.26+R()*.08)*(Math.abs(f)<.2?1.15:1),tilt=f*.42+(R()-.5)*.1;C.push([dx,hh,ww,tilt])}
  C.sort((a,b)=>b[1]-a[1]);const draw=([dx,hh,ww,tilt])=>{x.save();x.translate(cx+dx,by);x.rotate(tilt);
    const L=[[-ww,0],[-ww,-hh*.78],[0,-hh],[0,0]],Rt=[[0,0],[0,-hh],[ww,-hh*.78],[ww,0]];
    let gr=x.createLinearGradient(-ww,0,0,0);gr.addColorStop(0,'#e8f8ff');gr.addColorStop(1,'#a6d8f8');x.fillStyle=gr;x.beginPath();L.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill();
    gr=x.createLinearGradient(0,0,ww,0);gr.addColorStop(0,'#78b4e4');gr.addColorStop(1,'#4a86c4');x.fillStyle=gr;x.beginPath();Rt.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill();
    x.fillStyle='#ffffff';x.beginPath();x.moveTo(-ww,-hh*.78);x.lineTo(0,-hh);x.lineTo(ww,-hh*.78);x.lineTo(0,-hh*.86);x.closePath();x.fill();
    x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=.7;x.beginPath();x.moveTo(-ww*.55,-hh*.12);x.lineTo(-ww*.55,-hh*.7);x.stroke();x.strokeStyle='rgba(30,70,130,.5)';x.lineWidth=.6;x.beginPath();x.moveTo(-ww,0);x.lineTo(-ww,-hh*.78);x.lineTo(0,-hh);x.lineTo(ww,-hh*.78);x.lineTo(ww,0);x.stroke();
    x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=.5;x.beginPath();x.moveTo(ww*.3,-hh*.2);x.lineTo(ww*.55,-hh*.55);x.stroke();x.restore()};
  C.forEach(draw);
  /* กองหิมะโคน */
  const sg=x.createLinearGradient(0,by-r*.3,0,by+r*.2);sg.addColorStop(0,'#ffffff');sg.addColorStop(1,'#cde0f2');x.fillStyle=sg;x.beginPath();x.ellipse(cx,by,r*1.05,r*.28,0,Math.PI,0);x.lineTo(cx+r*1.05,by+1);x.ellipse(cx,by+1,r*1.05,r*.2,0,0,Math.PI);x.fill();x.strokeStyle='rgba(80,120,170,.45)';x.lineWidth=.8;x.beginPath();x.ellipse(cx,by+1,r*1.05,r*.2,0,.2,Math.PI-.2);x.stroke()})}
MXTR.icecr=(t,r,sw,now)=>{const v=Math.abs((t.x*13+t.y)|0)%6,rr=Math.round(r/2)*2;mxBlit(mxIceSpr(rr,v),t.x,t.y+r*.45,r/rr,0);
  const tw=(now/400+t.x*.37)%6;if(tw<1){const q=Math.sin(tw*Math.PI),sx=t.x+r*.1,sy=t.y-r*1.4;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,255,255,'+q+')';g.lineWidth=1.2;g.beginPath();g.moveTo(sx-5*q,sy);g.lineTo(sx+5*q,sy);g.moveTo(sx,sy-5*q);g.lineTo(sx,sy+5*q);g.stroke();g.restore()}};

/* ===================== 5 · ลานหอคอยวิญญาณ (หินปูลานม่วงเทา · มอส · หญ้าลาเวนเดอร์ · หินแตก) ===================== */
MXC[5]={k:'stone',amp:80,sc:600,lit:[246,238,255],shd:[22,14,44],kl:.24,ks:.28,ao:.5,ff:.08,cs:.24,cla:0,gw:.8,gwc:'240,222,255',gcc:'30,20,70',base:'p0',ug:'stone',tree:'spirit',dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'p1',c:f=>mxSS(.6,.68,(1-f.h)*.5+f.m*.5),e:0},
  {t:'p2',c:f=>mxSS(.62,.7,f.w*.6+f.q*.4)*(1-mxSS(.6,.7,f.h)),e:2},
  {t:'p3',c:f=>mxSS(.67,.73,f.m*.5+f.z*.5),e:0}]};
Object.assign(MXT,{
 p0:B=>{B.slabs(30,[86,80,110],[106,100,132],1.1,2.6,[34,28,52]);B.blob(30,[120,112,150],[70,64,92],10,34,.12,.22);B.crack(8,'rgba(30,24,48,.55)',.7,18,'rgba(200,190,230,.2)');B.grain(1600,.04,.06)},
 p1:B=>{B.slabs(30,[80,92,96],[96,108,112],1.3,2.2,[30,44,34]);B.blob(46,[86,130,90],[60,100,70],6,18,.35,.55);B.speck(90,[[110,160,100],[80,130,80]],.6,1.4,.8);B.grain(1000,.03,.06)},
 p2:B=>{B.fill([88,84,112]);B.tuft(120,[[70,64,104],[110,100,150],[156,146,196],[214,204,246]],4,8,{per:[1,3],cr:4,sh:.18});B.flower(10,[['rgba(210,170,255,1)','#fff2ff'],['rgba(170,150,240,1)','#f4eeff']],2,4,8);B.grain(800,.03,.05)},
 p3:B=>{B.slabs(30,[86,80,110],[106,100,132],1.1,2.6,[34,28,52]);B.shard(40,[96,90,120],[140,132,168],1,2.6,.32);B.crack(14,'rgba(26,20,44,.7)',.9,22,'rgba(200,190,230,.22)');B.grain(1000,.04,.06)}});
MXU.stone=[()=>mxStoneSpr('ps0',[120,114,146],6,4.5,{sharp:1}),()=>mxTuftSpr('pt0',[[80,72,116],[126,116,170],[176,166,216]],9,6,51),
  ()=>mxDSpr('pp0',14,8,(x,w,h)=>{const R=gxRng(52);for(let i=0;i<6;i++){const X=2+R()*10,Y=2+R()*4,a=R()*6;x.save();x.translate(X,Y);x.rotate(a);x.fillStyle=i%2?'rgba(214,170,240,.9)':'rgba(240,200,140,.85)';x.beginPath();x.ellipse(0,0,1.8,.8,0,0,7);x.fill();x.restore()}}),
  ()=>mxDSpr('pm0',14,8,(x,w,h)=>{x.fillStyle='#4e7a4e';x.beginPath();x.ellipse(7,5,6,2.4,0,0,7);x.fill();x.fillStyle='#6a9a62';for(let i=0;i<7;i++){x.beginPath();x.arc(3+i*1.4,4+(i%2),1,0,7);x.fill()}})];
MXDC.stone={0:o=>[MXU.stone[1](),.7+o.k*.4],1:o=>[mxStoneSpr('pd1',[126,120,154],4,3,{sharp:1}),.8+o.k*.5],3:o=>[MXU.stone[2](),.7+o.k*.4],
  4:o=>[mxDSpr('pd4',18,6,(x,w,h)=>{x.strokeStyle='rgba(26,20,44,.7)';x.lineWidth=.9;x.beginPath();x.moveTo(1,3);x.lineTo(7,4);x.lineTo(11,2.5);x.lineTo(17,3.5);x.stroke();x.strokeStyle='rgba(210,200,240,.3)';x.lineWidth=.4;x.beginPath();x.moveTo(1,3.6);x.lineTo(7,4.6);x.stroke()}),.8+o.k*.4]};
MXNS.stone={rim:[80,74,104],sp:[150,140,186],gl:'190,130,255'};
MXTR.spirit=(t,r,sw,now)=>{const v=Math.abs((t.x*13+t.y*7)|0)%6,rr=Math.round(r/2)*2,s=mxOakSpr('spirit',rr,v);mxBlit(s,t.x,t.y+r*.7,r/rr,sw*.025);
  if(!LOWQ){const T=now/1000;g.save();g.globalCompositeOperation='lighter';for(let i=0;i<2;i++){const q=(T*.25+i*.5+t.x*.001)%1,px=t.x+Math.sin(T*.9+i*3+t.y)*r*.7,py=t.y-r*.9-q*r*1.4;glowAt(px,py,3.2,'210,170,255',.6*Math.sin(q*Math.PI))}g.restore()}};

/* ===================== 6 · ซากนครจมบาดาล (กระเบื้องจม · ทรายกลบ · หญ้าทะเล · เศษปะการัง + แสงกระเพื่อมใต้น้ำ) ===================== */
MXC[6]={k:'sunk',amp:110,sc:600,lit:[200,255,240],shd:[0,20,32],kl:.24,ks:.32,ao:.5,ff:.08,cs:.22,cla:0,gw:.6,gwc:'170,255,236',gcc:'0,30,70',base:'u0',ug:'sunk',tree:'pillar6',tby:.5,uby:.52,dk:{0:1,1:1,4:1},mats:[
  {t:'u1',c:f=>mxSS(.55,.63,f.h*.6+f.m*.4),e:4},
  {t:'u2',c:f=>mxSS(.62,.7,(1-f.h)*.5+f.w*.5),e:0},
  {t:'u3',c:f=>mxSS(.67,.73,f.m*.5+f.q*.5),e:0}],
 wfx:t=>mxCaustic(t)};
Object.assign(MXT,{
 u0:B=>{B.slabs(34,[40,84,88],[52,98,102],1.4,2.2,[10,30,34]);B.blob(30,[60,116,116],[24,60,66],10,34,.16,.28);B.speck(50,[[60,140,120],[40,110,100]],.6,1.6,.6);B.crack(8,'rgba(8,26,30,.6)',.7,18,'rgba(150,230,220,.15)');B.grain(1200,.03,.06)},
 u1:B=>{B.fill([100,120,104]);B.blob(36,[124,140,118],[80,100,88],10,34,.22,.36);B.ripple(26,'rgba(210,236,214,.35)','rgba(40,70,64,.3)',20,1.3,-.2);B.peb(12,[150,150,130],[200,196,170],.6,1.3,.2);
   B.stroke((x,R,W8,S)=>{for(let i=0;i<10;i++){const px=R()*S,py=R()*S,a=R()*6;W8(px,py,4,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='#e8dcc6';x.beginPath();x.moveTo(0,-1.8);x.lineTo(1.7,1);x.lineTo(-1.7,1);x.closePath();x.fill();x.strokeStyle='rgba(150,120,100,.6)';x.lineWidth=.3;x.beginPath();x.moveTo(0,-1.6);x.lineTo(-.9,.9);x.moveTo(0,-1.6);x.lineTo(.9,.9);x.stroke();x.restore()})}});B.grain(1000,.04,.05)},
 u2:B=>{B.fill([28,72,68]);B.blob(30,[40,96,86],[18,50,50],10,30,.25,.4);B.tuft(120,[[16,56,48],[30,96,74],[56,140,104],[120,210,170]],6,13,{per:[2,4],cr:5,k0:3,k1:5,sp:.7,sh:.22});B.grain(800,.02,.06)},
 u3:B=>{B.slabs(34,[40,84,88],[52,98,102],1.4,2.2,[10,30,34]);B.shard(40,[70,110,108],[120,160,150],1,2.4,.3);B.blob(26,[70,140,90],[50,110,80],4,10,.4,.6);B.speck(30,[[230,140,120],[240,180,120],[200,120,200]],.6,1.2,.85);B.grain(800,.03,.06)}});
MXU.sunk=[()=>mxStoneSpr('us0',[90,120,116],6,4.4),()=>mxTuftSpr('ut0',[[20,70,58],[40,120,90],[90,190,150]],12,5,61),
  ()=>mxDSpr('uc0',12,10,(x,w,h)=>{x.strokeStyle='#e86a7a';x.lineWidth=1.2;x.beginPath();x.moveTo(6,9);x.lineTo(6,5);x.lineTo(3,2);x.moveTo(6,6);x.lineTo(9,3);x.moveTo(6,5);x.lineTo(5,1.5);x.stroke();x.fillStyle='#ffb0b8';[[3,2],[9,3],[5,1.5]].forEach(([a,b])=>{x.beginPath();x.arc(a,b,.8,0,7);x.fill()})}),
  ()=>mxDSpr('ush',8,6,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(4.6,4.6,3,1,0,0,7);x.fill();x.fillStyle='#f0e2c8';x.beginPath();x.moveTo(4,1);x.lineTo(7,4.4);x.lineTo(1,4.4);x.closePath();x.fill();x.strokeStyle='rgba(160,120,90,.7)';x.lineWidth=.35;x.beginPath();x.moveTo(4,1.2);x.lineTo(2.5,4.3);x.moveTo(4,1.2);x.lineTo(4,4.3);x.moveTo(4,1.2);x.lineTo(5.5,4.3);x.stroke()})];
MXDC.sunk={0:o=>[MXU.sunk[1](),.6+o.k*.4],1:o=>[MXU.sunk[3](),.8+o.k*.5],4:o=>[mxDSpr('ud4',18,6,(x,w,h)=>{x.strokeStyle='rgba(8,26,30,.7)';x.lineWidth=.9;x.beginPath();x.moveTo(1,3);x.lineTo(7,4);x.lineTo(11,2.5);x.lineTo(17,3.5);x.stroke()}),.8+o.k*.4]};
MXNS.sunk={rim:[56,92,90],sp:[110,170,160],gl:'90,240,220'};
/* แสงกระเพื่อมใต้น้ำ (caustics): ลายเครือข่ายเส้นสว่าง 2 ชั้นเลื่อนสวนกัน */
function mxCausticTex(){if(MX.cau)return MX.cau;const S=256,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d'),id=x.createImageData(S,S),D=id.data,n=5,cw=S/n,R=gxRng(616),P=[];for(let j=0;j<n;j++)for(let i=0;i<n;i++)P.push([(i+.15+R()*.7)*cw,(j+.15+R()*.7)*cw]);
  for(let y=0;y<S;y++)for(let X=0;X<S;X++){let b=1e9,b2=1e9;const ci=Math.floor(X/cw),cj=Math.floor(y/cw);for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){const ii=((ci+di)%n+n)%n,jj=((cj+dj)%n+n)%n,k=jj*n+ii,ox=Math.floor((ci+di)/n)*S,oy=Math.floor((cj+dj)/n)*S,dx=X-P[k][0]-ox,dy=y-P[k][1]-oy,d=Math.sqrt(dx*dx+dy*dy);if(d<b){b2=b;b=d}else if(d<b2)b2=d}
    const e=b2-b,v=Math.pow(Math.max(0,1-e/9),2.2),o=(y*S+X)*4;D[o]=190;D[o+1]=255;D[o+2]=240;D[o+3]=v*255}
  x.putImageData(id,0,0);return MX.cau={c,p:g.createPattern(c,'repeat')}}
function mxCaustic(t){if(LOWQ)return;const C=mxCausticTex(),nl=(typeof LITEQ!=='undefined'&&LITEQ)?1:2;g.save();g.globalCompositeOperation='lighter';
  for(let l=0;l<nl;l++){const sc=l?1.7:2.3,ox=(l?-1:1)*t*7+l*90,oy=t*(l?5:-4);try{C.p.setTransform(new DOMMatrix().translate(ox,oy).scale(sc))}catch(e){}g.globalAlpha=l?.07:.09;g.fillStyle=C.p;g.fillRect(cam.x-20,cam.y-20,W+40,H+40)}g.restore()}
/* เสาหินจม: ลายสลัก · ตะไคร่ · เพรียง · ยอดหัก + สาหร่ายไหวรายเฟรม */
function mxPillarSpr(r,v){return mxSprite('pil'+r+'|'+v,r*1.6,r*2.6,r*.8,r*2.6-r*.2,(x,w,h)=>{const R=gxRng(r*97+v*31+3),cx=w/2,by=h-r*.2,pw=r*.36,top=by-r*1.62-r*.1*(v%3);
  x.fillStyle='rgba(0,10,14,.35)';x.beginPath();x.ellipse(cx+r*.15,by+1,r*.62,r*.16,0,0,7);x.fill();
  x.fillStyle='#0e2428';x.fillRect(cx-r*.52,by-r*.2,r*1.04,r*.22);x.fillStyle='#1c3e44';x.fillRect(cx-r*.52,by-r*.24,r*1.04,r*.06);
  const gr=x.createLinearGradient(cx-pw,0,cx+pw,0);gr.addColorStop(0,'#3c6a70');gr.addColorStop(.4,'#24484e');gr.addColorStop(1,'#0e2428');x.fillStyle=gr;x.beginPath();x.moveTo(cx-pw,by-r*.18);x.lineTo(cx-pw,top+r*.12);x.lineTo(cx-pw*.4,top-r*.08);x.lineTo(cx+pw*.15,top+r*.06);x.lineTo(cx+pw*.6,top-r*.12);x.lineTo(cx+pw,top+r*.1);x.lineTo(cx+pw,by-r*.18);x.closePath();x.fill();
  x.strokeStyle='rgba(0,0,0,.3)';x.lineWidth=.8;for(let i=1;i<4;i++){x.beginPath();x.moveTo(cx-pw+i*pw*.5,by-r*.2);x.lineTo(cx-pw+i*pw*.5,top+r*.2);x.stroke()}
  x.strokeStyle='rgba(150,230,220,.2)';x.lineWidth=.7;x.beginPath();x.moveTo(cx-pw+1,by-r*.2);x.lineTo(cx-pw+1,top+r*.14);x.stroke();
  x.fillStyle='rgba(60,140,90,.75)';for(let i=0;i<5;i++){const yy=by-r*.25-R()*r*1.1;x.beginPath();x.ellipse(cx-pw*.3+(R()-.5)*pw,yy,pw*.5,r*.07,0,0,7);x.fill()}
  x.fillStyle='#d8d2bc';for(let i=0;i<6;i++){x.beginPath();x.arc(cx+(R()-.5)*pw*1.6,by-r*.3-R()*r*.5,.9+R()*.5,0,7);x.fill()}
  x.fillStyle='rgba(120,255,230,.85)';for(let i=0;i<3;i++){x.beginPath();x.arc(cx-pw*.4+i*pw*.4,by-r*(.5+i*.25),1,0,7);x.fill()}})}
MXTR.pillar6=(t,r,sw,now)=>{const v=Math.abs((t.x*13+t.y)|0)%6,rr=Math.round(r/2)*2;mxBlit(mxPillarSpr(rr,v),t.x,t.y+r*.52,r/rr,0);
  g.lineCap='round';for(let i=0;i<3;i++){const kx=t.x-r*.5+i*r*.5;g.strokeStyle=i===1?'#2a8a66':'#1e6a50';g.lineWidth=2.2;g.beginPath();g.moveTo(kx,t.y+r*.5);g.quadraticCurveTo(kx+sw*4+Math.sin(now/500+i)*4,t.y-r*.15,kx+Math.sin(now/420+i+t.x)*5,t.y-r*(.62+i*.18));g.stroke();g.strokeStyle='rgba(140,240,190,.35)';g.lineWidth=.8;g.stroke()}g.lineCap='butt';
  if(!LOWQ){const gl=.55+.45*Math.sin(now/600+t.x);g.save();g.globalCompositeOperation='lighter';glowAt(t.x,t.y-r*.3,r*.8,'60,220,200',.1*gl);g.restore()}};

/* ===================== 7 · เหมืองทองร้าง (ดินอัด · กรวด · หินดาน · ดินผงทอง) ===================== */
MXC[7]={k:'mine',amp:110,sc:560,lit:[255,216,156],shd:[22,12,6],kl:.26,ks:.32,ao:.55,ff:.08,cs:.24,cla:0,gw:.9,gwc:'255,204,140',gcc:'30,20,50',base:'m0',ug:'mine',tree:'orerock',tby:.45,uby:.45,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'m1',c:f=>mxSS(.58,.66,f.m*.6+f.q*.4),e:2},
  {t:'m2',c:f=>mxSS(.61,.68,f.h*.7+f.q*.3),e:6,hi:1,rim:[[20,12,6],[230,200,160]],rk:[110,60]},
  {t:'m3',c:f=>mxSS(.67,.73,f.w*.6+f.m*.4),e:0}]};
Object.assign(MXT,{
 m0:B=>{B.fill([94,74,54]);B.blob(44,[112,90,66],[74,58,42],14,44,.22,.36);B.crack(10,'rgba(40,28,18,.5)',.7,22,'rgba(200,170,130,.18)');B.peb(14,[110,96,80],[150,134,112],.7,1.6,.28);B.shard(8,[100,88,74],[140,124,104],1,2,.28);B.grain(1800,.05,.08)},
 m1:B=>{B.fill([106,94,82]);B.blob(30,[124,112,98],[86,76,66],10,30,.2,.3);B.shard(80,[110,100,90],[172,160,146],1,2.8,.32);B.peb(20,[120,110,100],[170,160,148],.8,1.8,.3);B.grain(1200,.04,.07)},
 m2:B=>{B.fill([80,68,60]);B.blob(30,[96,84,74],[62,52,46],10,30,.22,.34);B.cells(26,'rgba(26,18,12,.8)',1.3,'rgba(190,160,130,.22)',.9);B.grain(1000,.04,.07)},
 m3:B=>{B.fill([118,94,56]);B.blob(30,[140,112,64],[96,76,46],10,30,.24,.36);B.speck(140,[[250,214,100],[255,236,150],[210,160,60]],.35,.9,.95);B.grain(1000,.06,.06)}});
MXU.mine=[()=>mxStoneSpr('ms0',[120,108,94],6,4.4,{sharp:1}),()=>mxStoneSpr('ms1',[96,84,72],8,5,{sharp:1}),
  ()=>mxDSpr('mg0',8,6,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(4.6,4.6,2.8,1,0,0,7);x.fill();x.fillStyle='#d8a020';x.beginPath();x.moveTo(2,4);x.lineTo(3.4,1.6);x.lineTo(5.6,1.8);x.lineTo(6.4,4);x.closePath();x.fill();x.fillStyle='#fff0a0';x.beginPath();x.moveTo(3.4,1.6);x.lineTo(4.4,2.6);x.lineTo(3,3.4);x.closePath();x.fill()}),
  ()=>mxDSpr('mw0',16,6,(x,w,h)=>{x.fillStyle='#6a4a2a';x.save();x.translate(8,3);x.rotate(.15);x.fillRect(-7,-1.2,14,2.4);x.fillStyle='rgba(255,220,170,.25)';x.fillRect(-7,-1.2,14,.7);x.restore()})];
MXDC.mine={0:o=>[MXU.mine[0](),.7+o.k*.4],1:o=>[MXU.mine[2](),.8+o.k*.5],3:o=>[mxStoneSpr('md3',[130,118,104],3.5,2.6,{sharp:1}),.8+o.k*.5],
  4:o=>[mxDSpr('md4',18,6,(x,w,h)=>{x.strokeStyle='rgba(30,20,12,.75)';x.lineWidth=.9;x.beginPath();x.moveTo(1,3);x.lineTo(7,4);x.lineTo(11,2.5);x.lineTo(17,3.5);x.stroke();x.strokeStyle='rgba(230,190,90,.55)';x.lineWidth=.4;x.beginPath();x.moveTo(7,4);x.lineTo(11,2.5);x.stroke()}),.8+o.k*.4]};
MXNS.mine={rim:[86,66,46],sp:[96,80,62],gl:'255,180,70'};
function mxOreSpr(r,v){return mxSprite('ore'+r+'|'+v,r*2.4,r*2.8,r*1.2,r*2.8-r*.5,(x,w,h)=>{const R=gxRng(r*41+v*73+5),cx=w/2,by=h-r*.5,s=v%2?1:-1;
  const P=[[cx-r*.95,by+r*.05],[cx-r*.75,by-r*.85],[cx-r*.2*s,by-r*1.75-(v%3)*r*.12],[cx+r*.45,by-r*1.1],[cx+r*.95,by]];
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(cx+r*.15,by+r*.02,r*1.05,r*.26,0,0,7);x.fill();
  x.fillStyle='#2a2117';x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill();
  const lg=x.createLinearGradient(cx-r,by-r*1.6,cx+r*.2,by);lg.addColorStop(0,'#7a6448');lg.addColorStop(1,'#3e3122');x.fillStyle=lg;x.beginPath();x.moveTo(P[1][0],P[1][1]);x.lineTo(P[2][0],P[2][1]);x.lineTo(cx-r*.02,by-r*.55);x.lineTo(cx-r*.5,by+r*.02);x.lineTo(P[0][0],P[0][1]);x.closePath();x.fill();
  x.fillStyle='rgba(0,0,0,.22)';x.beginPath();x.moveTo(P[2][0],P[2][1]);x.lineTo(P[3][0],P[3][1]);x.lineTo(P[4][0],P[4][1]);x.lineTo(cx-r*.02,by-r*.55);x.closePath();x.fill();
  x.strokeStyle='rgba(255,230,190,.3)';x.lineWidth=.9;x.beginPath();x.moveTo(P[0][0],P[0][1]);x.lineTo(P[1][0],P[1][1]);x.lineTo(P[2][0],P[2][1]);x.stroke();x.strokeStyle='#100b06';x.lineWidth=1.1;x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.stroke();
  if(v%3===0){x.strokeStyle='#7a5a10';x.lineWidth=2.6;x.beginPath();x.moveTo(cx-r*.5,by-r*.35);x.lineTo(cx-r*.1,by-r*.75);x.lineTo(cx+r*.3,by-r*.6);x.stroke();x.strokeStyle='#e8b830';x.lineWidth=1.4;x.stroke();x.strokeStyle='#fff0a0';x.lineWidth=.5;x.stroke();
    x.fillStyle='#ffd23a';for(let i=0;i<3;i++){x.beginPath();x.arc(cx-r*.35+i*r*.3,by-r*(.45+(i%2)*.2),1.1,0,7);x.fill()}}})}
MXTR.orerock=(t,r,sw,now)=>{const v=Math.abs(Math.round(t.x+t.y))%6,rr=Math.round(r/2)*2;mxBlit(mxOreSpr(rr,v),t.x,t.y+r*.45,r/rr,0);
  if(v%3===0){const tw=Math.max(0,Math.sin(now/450+t.x))**10;if(tw>.1){g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,240,170,'+tw+')';g.beginPath();g.arc(t.x-r*.1,t.y-r*.3,2.4*tw+.4,0,7);g.fill();g.restore()}}};

/* ===================== 8 · ทะเลทรายสุสานฟาโรห์ (ทรายลอน · สันเนินนูน · ดินดานแตก · ลานกรวด) ===================== */
MXC[8]={k:'sand',amp:170,sc:700,lit:[255,240,204],shd:[74,40,16],kl:.4,ks:.3,ao:.45,ff:.06,cs:.22,cla:.1,gw:1.2,gwc:'255,226,170',gcc:'80,56,100',base:'d0',ug:'sand',tree:'sandrock',tby:.4,uby:.4,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'d1',c:f=>mxSS(.54,.62,f.h*.8+f.q*.2),e:12},
  {t:'d3',c:f=>mxSS(.67,.73,f.m*.5+f.w*.5)*mxSS(.56,.46,f.h),e:0},
  {t:'d2',c:f=>mxSS(.64,.7,(1-f.h)*.6+f.m*.4),e:-4,hi:1,rim:[[70,40,16],[255,236,190]],rk:[120,80]}]};
Object.assign(MXT,{
 d0:B=>{B.fill([178,140,92]);B.blob(40,[196,158,106],[154,118,76],14,46,.2,.34);B.ripple(70,'rgba(255,238,196,.55)','rgba(120,82,42,.38)',24,1.5,-.35);B.peb(6,[150,120,86],[190,160,120],.6,1.3,.2);B.grain(2000,.06,.06)},
 d1:B=>{B.fill([200,164,110]);B.blob(36,[220,186,130],[176,140,92],12,40,.22,.36);B.ripple(56,'rgba(255,246,214,.6)','rgba(140,100,56,.36)',30,1.8,-.35);B.grain(1400,.06,.05)},
 d2:B=>{B.fill([152,114,78]);B.blob(30,[170,132,92],[130,96,64],10,30,.2,.32);B.cells(19,'rgba(84,56,32,.75)',1,'rgba(236,206,160,.4)',.85);B.grain(1200,.05,.06)},
 d3:B=>{B.fill([160,126,88]);B.blob(30,[176,142,100],[136,104,72],10,30,.2,.3);B.peb(60,[140,112,84],[200,170,130],.8,2.2,.28);B.ripple(14,'rgba(255,236,190,.35)','rgba(110,76,40,.25)',16,1,-.35);B.grain(1200,.05,.06)}});
MXU.sand=[()=>mxDSpr('sa0',22,8,(x,w,h)=>{const gr=x.createLinearGradient(0,1,0,7);gr.addColorStop(0,'#f2d8a6');gr.addColorStop(1,'#c09060');x.fillStyle=gr;x.beginPath();x.moveTo(1,6);x.quadraticCurveTo(8,1,21,5.5);x.quadraticCurveTo(10,7.4,1,6);x.fill();x.strokeStyle='rgba(120,80,40,.4)';x.lineWidth=.5;x.beginPath();x.moveTo(3,5.6);x.quadraticCurveTo(10,3.4,19,5.4);x.stroke()}),
  ()=>mxStoneSpr('sr0',[176,140,100],6,4.2),()=>mxTuftSpr('st0',[[130,110,60],[176,156,96],[214,196,140]],9,6,81)];
MXDC.sand={0:o=>[MXU.sand[2](),.7+o.k*.4],1:o=>[mxStoneSpr('sd1',[190,160,124],4,3),.8+o.k*.5],3:o=>[mxStoneSpr('sd3',[160,128,96],3,2.2,{sharp:1}),.8+o.k*.5],
  4:o=>[mxDSpr('sd4x',18,6,(x,w,h)=>{x.strokeStyle='rgba(90,60,30,.6)';x.lineWidth=.8;x.beginPath();x.moveTo(1,3);x.lineTo(7,4);x.lineTo(11,2.5);x.lineTo(17,3.5);x.stroke();x.strokeStyle='rgba(255,236,190,.4)';x.lineWidth=.4;x.beginPath();x.moveTo(1,3.6);x.lineTo(7,4.6);x.stroke()}),.8+o.k*.4]};
MXNS.sand={rim:[150,114,74],sp:[196,160,104],gl:'255,150,60',bone:[240,232,214]};
/* หินทรายเป็นชั้น / แท่งหินสลักโบราณ */
function mxSandRockSpr(r,v){return mxSprite('sdr'+r+'|'+v,r*2.4,r*2.8,r*1.2,r*2.8-r*.4,(x,w,h)=>{const R=gxRng(r*37+v*91+1),cx=w/2,by=h-r*.4;
  x.fillStyle='rgba(90,50,20,.32)';x.beginPath();x.ellipse(cx+r*.25,by+r*.04,r*1.05,r*.26,0,0,7);x.fill();
  if(v%3===0){/* แท่งหินสลัก */const bw=r*.8,bh=r*1.5;const gr=x.createLinearGradient(cx-bw,0,cx+bw,0);gr.addColorStop(0,'#d6aa72');gr.addColorStop(.62,'#b0824e');gr.addColorStop(1,'#7e5630');x.fillStyle=gr;x.fillRect(cx-bw,by-bh,bw*2,bh);
    x.fillStyle='#e8c48c';x.fillRect(cx-bw,by-bh-r*.24,bw*2,r*.26);x.fillStyle='rgba(255,240,200,.45)';x.fillRect(cx-bw,by-bh-r*.24,bw*2,r*.06);x.strokeStyle='#3a2410';x.lineWidth=1;x.strokeRect(cx-bw,by-bh-r*.24,bw*2,bh+r*.24);
    x.strokeStyle='rgba(60,36,14,.65)';x.lineWidth=1.1;const gx=cx-r*.15,gy=by-bh*.55;if(v%2){x.beginPath();x.arc(gx,gy-r*.2,r*.13,0,7);x.moveTo(gx,gy-r*.07);x.lineTo(gx,gy+r*.32);x.moveTo(gx-r*.18,gy+r*.04);x.lineTo(gx+r*.18,gy+r*.04);x.stroke()}else{x.beginPath();x.moveTo(gx,gy-r*.3);x.lineTo(gx+r*.22,gy);x.lineTo(gx,gy+r*.3);x.lineTo(gx-r*.22,gy);x.closePath();x.stroke();x.beginPath();x.arc(gx,gy,r*.06,0,7);x.stroke()}
    x.fillStyle='rgba(120,80,40,.3)';for(let i=0;i<5;i++){x.beginPath();x.arc(cx-bw+R()*bw*2,by-bh+R()*bh,.6+R()*.8,0,7);x.fill()}return}
  const top=by-r*(1.15+(v%2)*.25);x.fillStyle='#9a6e42';x.beginPath();x.moveTo(cx-r*.98,by+1);x.quadraticCurveTo(cx-r*1.02,top+r*.2,cx-r*.25,top);x.quadraticCurveTo(cx+r*.75,top+r*.05,cx+r*.98,by+1);x.closePath();x.fill();
  x.save();x.clip();for(let i=0;i<6;i++){const yy=top+i*r*.26+R()*r*.06;x.fillStyle=i%2?'rgba(214,170,116,.55)':'rgba(170,120,72,.45)';x.beginPath();x.moveTo(cx-r*1.1,yy);x.quadraticCurveTo(cx,yy-r*.08,cx+r*1.1,yy+r*.04);x.lineTo(cx+r*1.1,yy+r*.14);x.quadraticCurveTo(cx,yy+r*.06,cx-r*1.1,yy+r*.12);x.closePath();x.fill()}
  const sh=x.createLinearGradient(cx-r,0,cx+r,0);sh.addColorStop(0,'rgba(255,236,190,.28)');sh.addColorStop(.5,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(60,30,10,.35)');x.fillStyle=sh;x.fillRect(0,0,w,h);x.restore();
  x.strokeStyle='#3a2410';x.lineWidth=1.1;x.beginPath();x.moveTo(cx-r*.98,by+1);x.quadraticCurveTo(cx-r*1.02,top+r*.2,cx-r*.25,top);x.quadraticCurveTo(cx+r*.75,top+r*.05,cx+r*.98,by+1);x.stroke();
  x.fillStyle='#e8c48c';x.beginPath();x.ellipse(cx-r*.35,top+r*.18,r*.36,r*.14,-.25,0,7);x.fill();
  x.fillStyle='rgba(240,214,170,.9)';x.beginPath();x.moveTo(cx-r*1.05,by+1);x.quadraticCurveTo(cx-r*.6,by-r*.22,cx-r*.1,by+1);x.closePath();x.fill()})}
MXTR.sandrock=(t,r,sw)=>{const v=Math.abs(Math.round(t.x+t.y))%6,rr=Math.round(r/2)*2;mxBlit(mxSandRockSpr(rr,v),t.x,t.y+r*.4,r/rr,0)};

/* ===================== 10 · ทุ่งรอยแยกนภา (หินชนวนคราม · ไลเคนเรือง · แผ่นหินแตกนูน · ทรายดาว) ===================== */
MXC[10]={k:'rift',amp:120,sc:600,lit:[226,216,255],shd:[10,6,34],kl:.26,ks:.32,ao:.5,ff:.06,cs:.22,cla:.07,gw:.7,gwc:'210,200,255',gcc:'10,10,60',base:'r0',ug:'rift',tree:'riftrock',tby:.45,uby:.45,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'r1',c:f=>mxSS(.6,.68,f.w*.6+f.q*.4),e:0},
  {t:'r3',c:f=>mxSS(.64,.7,(1-f.h)*.6+f.m*.4),e:-6},
  {t:'r2',c:f=>mxSS(.6,.67,f.h*.7+f.q*.3),e:6,hi:1,rim:[[10,6,30],[220,210,255]],rk:[120,80]}]};
Object.assign(MXT,{
 r0:B=>{B.fill([58,56,98]);B.blob(40,[72,70,118],[44,42,78],14,44,.2,.34);B.crack(12,'rgba(16,12,40,.55)',.75,24,'rgba(200,190,255,.18)');B.speck(60,[[180,180,240],[150,150,220]],.35,.8,.5);B.grain(1500,.04,.07)},
 r1:B=>{B.fill([52,58,104]);B.blob(36,[60,74,124],[40,44,84],10,34,.24,.36);B.speck(110,[[120,230,255],[200,170,255],[150,250,230]],.4,1.1,.9);B.stroke((x,R,W8,S)=>{x.globalCompositeOperation='lighter';for(let i=0;i<30;i++){const px=R()*S,py=R()*S,r=3+R()*5;W8(px,py,r,(X,Y)=>{const gr=x.createRadialGradient(X,Y,0,X,Y,r);gr.addColorStop(0,'rgba(140,220,255,.25)');gr.addColorStop(1,'rgba(140,220,255,0)');x.fillStyle=gr;x.fillRect(X-r,Y-r,r*2,r*2)})}x.globalCompositeOperation='source-over'});B.grain(900,.03,.06)},
 r2:B=>{B.fill([72,70,118]);B.blob(30,[88,86,140],[56,54,96],10,30,.2,.3);B.cells(26,'rgba(14,10,36,.8)',1.4,'rgba(210,200,255,.28)',.9);B.grain(900,.04,.06)},
 r3:B=>{B.fill([38,36,72]);B.blob(30,[50,46,92],[26,24,52],10,30,.24,.36);B.speck(160,[[255,255,255],[200,210,255]],.25,.7,.85);B.grain(900,.03,.08)}});
MXU.rift=[()=>mxStoneSpr('rs0',[84,80,130],6,4.4,{sharp:1}),
  ()=>mxDSpr('rc0',10,12,(x,w,h)=>{x.fillStyle='rgba(10,6,30,.35)';x.beginPath();x.ellipse(5.6,10.6,3.6,1,0,0,7);x.fill();x.fillStyle='#bfe6ff';x.beginPath();x.moveTo(3,10.4);x.lineTo(4.6,2);x.lineTo(6.4,10.4);x.closePath();x.fill();x.fillStyle='#8aa8f0';x.beginPath();x.moveTo(4.6,2);x.lineTo(6.4,10.4);x.lineTo(5,10.4);x.closePath();x.fill();x.fillStyle='#d8c8ff';x.beginPath();x.moveTo(6,10.4);x.lineTo(7.6,5.4);x.lineTo(8.6,10.4);x.closePath();x.fill()})];
MXDC.rift={0:o=>[MXU.rift[0](),.7+o.k*.4],1:o=>[MXU.rift[1](),.6+o.k*.4],3:o=>[mxDSpr('rd3',6,6,(x,w,h)=>{const gr=x.createRadialGradient(3,3,0,3,3,3);gr.addColorStop(0,'rgba(200,220,255,1)');gr.addColorStop(1,'rgba(200,220,255,0)');x.fillStyle=gr;x.fillRect(0,0,6,6)}),.8+o.k*.6],
  4:o=>[mxDSpr('rd4',20,7,(x,w,h)=>{x.strokeStyle='rgba(10,6,30,.85)';x.lineWidth=1.8;x.beginPath();x.moveTo(1,3.5);x.lineTo(7,4.4);x.lineTo(12,2.8);x.lineTo(19,4);x.stroke();x.strokeStyle='rgba(170,150,255,.9)';x.lineWidth=.8;x.stroke()}),.8+o.k*.4]};
MXNS.rift={rim:[70,66,110],sp:[150,170,230],gl:'160,140,255'};
function mxRiftSpr(r,v,pal){return mxSprite('rft'+pal.k+r+'|'+v,r*2.4,r*2.8,r*1.2,r*2.8-r*.45,(x,w,h)=>{const R=gxRng(r*29+v*57+7),cx=w/2,by=h-r*.45;
  x.fillStyle='rgba(6,4,20,.4)';x.beginPath();x.ellipse(cx+r*.15,by+r*.03,r*1.05,r*.26,0,0,7);x.fill();
  const P=[[cx-r*.95,by],[cx-r*.8,by-r*.9],[cx-r*.2,by-r*1.35],[cx+r*.55,by-r*1.15],[cx+r*.95,by]];x.fillStyle=pal.d;x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill();
  x.fillStyle=pal.l;x.beginPath();x.moveTo(P[0][0],P[0][1]);x.lineTo(P[1][0],P[1][1]);x.lineTo(P[2][0],P[2][1]);x.lineTo(cx+r*.05,by-r*.5);x.lineTo(cx-r*.4,by);x.closePath();x.fill();
  x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.moveTo(P[2][0],P[2][1]);x.lineTo(P[3][0],P[3][1]);x.lineTo(P[4][0],P[4][1]);x.lineTo(cx+r*.05,by-r*.5);x.closePath();x.fill();
  x.strokeStyle='rgba(220,210,255,.35)';x.lineWidth=.9;x.beginPath();x.moveTo(P[0][0],P[0][1]);x.lineTo(P[1][0],P[1][1]);x.lineTo(P[2][0],P[2][1]);x.stroke();x.strokeStyle=pal.o;x.lineWidth=1.1;x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.stroke();
  const cc=pal.cr[v%pal.cr.length];if(cc){const bx=cx+r*.2,b2=by-r*.6;for(let k=0;k<3;k++){const ox=(k-1)*r*.22,hh=r*(k===1?1.05:.7),ww=r*.13;x.fillStyle=cc[0];x.beginPath();x.moveTo(bx+ox-ww,b2+r*.1);x.lineTo(bx+ox-ww*.2,b2-hh);x.lineTo(bx+ox+ww,b2+r*.1);x.closePath();x.fill();x.fillStyle=cc[1];x.beginPath();x.moveTo(bx+ox-ww*.2,b2-hh);x.lineTo(bx+ox+ww,b2+r*.1);x.lineTo(bx+ox+ww*.1,b2+r*.1);x.closePath();x.fill();x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.moveTo(bx+ox-ww*.6,b2);x.lineTo(bx+ox-ww*.25,b2-hh*.8);x.lineTo(bx+ox-ww*.1,b2);x.closePath();x.fill()}}
  else{x.strokeStyle='rgba(20,10,40,.9)';x.lineWidth=2.2;x.beginPath();x.moveTo(cx-r*.5,by-r*.2);x.lineTo(cx-r*.15,by+r*.02);x.lineTo(cx+r*.05,by-r*.3);x.lineTo(cx+r*.4,by-r*.05);x.stroke();x.strokeStyle=pal.gl;x.lineWidth=1;x.stroke()}})}
const MXRP={rift:{k:'r',d:'#2a2444',l:'#4a4474',o:'#120e22',gl:'rgba(230,150,255,.9)',cr:[['#9ae0ff','#4a8ae0','120,210,255'],['#d8b4ff','#8a5ae0','200,150,255'],null]},
  void:{k:'v',d:'#1c1430',l:'#3a2a5e',o:'#0a0614',gl:'rgba(250,120,255,.95)',cr:[['#f0a0ff','#9a40d0','240,120,255'],['#9ad0ff','#4a70d0','140,200,255'],['#ffb4e4','#b8449a','255,150,220'],null]}};
MXTR.riftrock=(t,r,sw,now)=>{const v=Math.round(t.x*3+t.y)%3,rr=Math.round(r/2)*2,P=MXRP.rift;mxBlit(mxRiftSpr(rr,Math.abs(v),P),t.x,t.y+r*.45,r/rr,0);const cc=P.cr[Math.abs(v)%3];
  if(cc&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(t.x+r*.2,t.y-r*.5,r*.9,cc[2],.18+.08*Math.sin(now/500+t.x));g.restore()}};

/* ===================== 11 · ดินแดนหลังรอยแยก (หินห้วงม่วง · ฝุ่นผลึก · แผ่นแตก · โคลนห้วง) ===================== */
MXC[11]={k:'void',amp:120,sc:600,lit:[236,210,255],shd:[8,4,20],kl:.26,ks:.34,ao:.5,ff:.06,cs:.22,cla:0,gw:.6,gwc:'230,190,255',gcc:'20,0,50',base:'v0',ug:'void',tree:'voidrock',tby:.45,uby:.45,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'v1',c:f=>mxSS(.6,.68,f.w*.6+f.q*.4),e:0},
  {t:'v3',c:f=>mxSS(.64,.7,(1-f.h)*.6+f.m*.4),e:-6},
  {t:'v2',c:f=>mxSS(.6,.67,f.h*.7+f.q*.3),e:6,hi:1,rim:[[6,2,16],[230,200,255]],rk:[120,80]}]};
Object.assign(MXT,{
 v0:B=>{B.fill([38,28,60]);B.blob(40,[52,40,80],[26,18,44],14,44,.2,.34);B.crack(12,'rgba(10,4,24,.6)',.75,24,'rgba(220,170,255,.16)');B.speck(50,[[210,160,255],[170,140,240]],.35,.8,.45);B.grain(1500,.04,.07)},
 v1:B=>{B.fill([44,32,70]);B.blob(30,[60,44,94],[30,22,50],10,30,.24,.36);B.speck(140,[[240,170,255],[200,150,255],[255,220,255]],.35,1,.9);B.grain(900,.04,.06)},
 v2:B=>{B.fill([56,42,86]);B.blob(30,[70,54,104],[40,30,64],10,30,.2,.3);B.cells(26,'rgba(10,4,24,.82)',1.4,'rgba(230,190,255,.26)',.9);B.grain(900,.04,.06)},
 v3:B=>{B.fill([22,14,38]);B.blob(30,[34,22,56],[12,8,24],10,30,.26,.4);B.speck(110,[[255,255,255],[230,200,255]],.25,.7,.75);B.grain(900,.03,.08)}});
MXU.void=[()=>mxStoneSpr('vs0',[70,56,104],6,4.4,{sharp:1}),
  ()=>mxDSpr('vc0',10,12,(x,w,h)=>{x.fillStyle='rgba(6,2,16,.4)';x.beginPath();x.ellipse(5.6,10.6,3.6,1,0,0,7);x.fill();x.fillStyle='#f0b4ff';x.beginPath();x.moveTo(3,10.4);x.lineTo(4.6,2);x.lineTo(6.4,10.4);x.closePath();x.fill();x.fillStyle='#a050d8';x.beginPath();x.moveTo(4.6,2);x.lineTo(6.4,10.4);x.lineTo(5,10.4);x.closePath();x.fill()})];
MXDC.void={0:o=>[MXU.void[0](),.7+o.k*.4],1:o=>[MXU.void[1](),.6+o.k*.4],3:o=>[mxDSpr('vd3',6,6,(x,w,h)=>{const gr=x.createRadialGradient(3,3,0,3,3,3);gr.addColorStop(0,'rgba(240,190,255,1)');gr.addColorStop(1,'rgba(240,190,255,0)');x.fillStyle=gr;x.fillRect(0,0,6,6)}),.8+o.k*.6],
  4:o=>[mxDSpr('vd4',20,7,(x,w,h)=>{x.strokeStyle='rgba(6,2,16,.85)';x.lineWidth=1.8;x.beginPath();x.moveTo(1,3.5);x.lineTo(7,4.4);x.lineTo(12,2.8);x.lineTo(19,4);x.stroke();x.strokeStyle='rgba(230,120,255,.9)';x.lineWidth=.8;x.stroke()}),.8+o.k*.4]};
MXNS.void={rim:[56,40,84],sp:[120,90,170],gl:'220,110,255'};
MXTR.voidrock=(t,r,sw,now)=>{const v=Math.abs(Math.round(t.x*3+t.y))%4,rr=Math.round(r/2)*2,P=MXRP.void;mxBlit(mxRiftSpr(rr,v,P),t.x,t.y+r*.45,r/rr,0);const cc=P.cr[v];
  if(cc&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(t.x+r*.2,t.y-r*.5,r*1.0,cc[2],.16+.08*Math.sin(now/600+t.x));g.restore()}};

/* ===================== ของประดับชั้นพื้นวาดใหม่ (ใช้ตอนอบลงชังก์ · ขนาด/ตำแหน่งเดิม) ===================== */
const MXVP={};
function mxRockV(x,y,s,c,o){o=o||{};const R=gxRng(((x*7)|0)^((y*13)|0)^(o.sd||0)),w=12*s,h=9*s,k=9,P=[];for(let i=0;i<k;i++){const a=Math.PI*(1+i/(k-1)),rr=(.82+R()*.26);P.push([x+Math.cos(a)*w*rr,y-h*.15+Math.sin(a)*h*1.05*rr])}
  const D=mxMix(c,MXK,.45),L=mxMix(c,MXW,.3);g.fillStyle=mxRgb(D);g.beginPath();g.moveTo(x-w,y+h*.12);P.forEach(p=>g.lineTo(p[0],p[1]));g.lineTo(x+w,y+h*.12);g.quadraticCurveTo(x,y+h*.42,x-w,y+h*.12);g.closePath();g.fill();
  const gr=g.createLinearGradient(x-w,y-h,x+w*.5,y+h*.2);gr.addColorStop(0,mxRgb(L));gr.addColorStop(.55,mxRgb(c));gr.addColorStop(1,mxRgb(D));g.fillStyle=gr;g.beginPath();g.moveTo(x-w,y+h*.05);P.forEach(p=>g.lineTo(p[0],p[1]));g.lineTo(x+w,y+h*.05);g.quadraticCurveTo(x,y+h*.22,x-w,y+h*.05);g.closePath();g.fill();
  /* หน้าตัดบนรับแสง */const ti=Math.floor(k/2);g.fillStyle=mxRgb(mxMix(L,MXW,.12),.55);g.beginPath();g.moveTo(P[1][0],P[1][1]);for(let i=2;i<=ti;i++)g.lineTo(P[i][0],P[i][1]);g.lineTo(x+w*.05,y-h*.45);g.lineTo(x-w*.55,y-h*.2);g.closePath();g.fill();
  g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=.8;g.beginPath();g.moveTo(x-w,y+h*.12);P.forEach(p=>g.lineTo(p[0],p[1]));g.lineTo(x+w,y+h*.12);g.stroke();
  g.strokeStyle=mxRgb(mxMix(D,MXK,.3),.7);g.lineWidth=.7;g.beginPath();g.moveTo(x+w*.15,y-h*.55);g.lineTo(x+w*.32,y-h*.22);g.lineTo(x+w*.24,y+h*.02);g.stroke();
  if(o.cap){const cp=()=>{g.beginPath();g.moveTo(P[1][0]-w*.04,P[1][1]+h*.12);for(let i=2;i<k-1;i++)g.lineTo(P[i][0]+(i>k/2?w*.03:0),P[i][1]-h*.03);g.quadraticCurveTo(x+w*.6,y-h*.42,x+w*.32,y-h*.5);g.quadraticCurveTo(x+w*.18,y-h*.38,x+w*.02,y-h*.52);g.quadraticCurveTo(x-w*.28,y-h*.6,x-w*.45,y-h*.42);g.quadraticCurveTo(x-w*.62,y-h*.3,P[1][0]-w*.04,P[1][1]+h*.12)};
    if(o.cb){g.fillStyle='rgba(120,150,190,.55)';g.save();g.translate(.6,1.4);cp();g.fill();g.restore()}g.fillStyle=mxRgb(o.cap,o.ca||.92);cp();g.fill();
    g.fillStyle=mxRgb(mxMix(o.cap,MXW,.35),.6);g.beginPath();g.ellipse(x-w*.25,y-h*.78,w*.25,h*.1,-.2,0,7);g.fill()}}
MXVP.rock=o=>mxRockV(o.x,o.y,o.s,[118,112,104]);
MXVP.mrock=o=>mxRockV(o.x,o.y,o.s,[104,110,96],{cap:[86,138,60],ca:.88});
MXVP.snowrock=o=>mxRockV(o.x,o.y,o.s,[134,150,170],{cap:[248,252,255],ca:.98,cb:1});
MXVP.rockV=o=>mxRockV(o.x,o.y,o.s,[78,64,108]);
MXVP.icicle=o=>{const x=o.x,y=o.y,s=o.s;mxRockV(x,y,s*1.1,[138,158,178],{cap:[248,252,255],ca:.98,cb:1});g.fillStyle='rgba(225,244,255,.95)';for(let i=0;i<4;i++){const bx=x-8*s+i*5*s,L=5*s*(1+i%2);g.beginPath();g.moveTo(bx,y-1*s);g.lineTo(bx+1.5*s,y+L);g.lineTo(bx+3*s,y-1*s);g.fill();g.fillStyle='rgba(255,255,255,.9)';g.fillRect(bx+.6*s,y,.5*s,L*.6);g.fillStyle='rgba(225,244,255,.95)'}};
/* พุ่มไม้: ก้อนใบหลายลูกเรียงโดม (หลังไปหน้า) · ไล่แสงบนซ้าย · ใบเล็กเป็นเกล็ด · ไม่มีขอบดำรอบลูก */
function mxBushV(x,y,s,P,o){o=o||{};const R=gxRng(((x*3)|0)^((y*5)|0)^(o.sd||0)),B=[],cx=x,cy=y-8.5*s,RX=11*s,RY=7.5*s;
  for(let i=0;i<7;i++){const a=Math.PI*(1.05+i/6*.9)+(R()-.5)*.2;B.push([cx+Math.cos(a)*RX*.62,cy+Math.sin(a)*RY*.5+1.5*s,(4.6+R()*1.4)*s])}
  for(let i=0;i<3;i++)B.push([cx+(i-1)*5.2*s+(R()-.5)*s,cy+2.6*s,(5+R())*s]);B.push([cx-1.5*s,cy-2.4*s,5.6*s]);B.push([cx+2.6*s,cy-1.4*s,4.8*s]);
  B.sort((a,b)=>(a[1]-a[2]*.2)-(b[1]-b[2]*.2));
  const bump=(px,py,rr,sd)=>{g.beginPath();const k=9;for(let i=0;i<=k;i++){const a=i/k*6.283,q=rr*(.92+.09*Math.sin(i*2.3+sd));const X1=px+Math.cos(a)*q,Y1=py+Math.sin(a)*q*.92;if(!i)g.moveTo(X1,Y1);else{const am=(i-.5)/k*6.283,qm=rr*1.07;g.quadraticCurveTo(px+Math.cos(am)*qm,py+Math.sin(am)*qm*.95,X1,Y1)}}g.closePath()};
  g.fillStyle=mxRgb(P.o);B.forEach(([px,py,rr],i)=>{bump(px+.5,py+.9,rr+.5,i);g.fill()});
  B.forEach(([px,py,rr],i)=>{const up=Math.max(0,Math.min(1,(cy-py)/(6*s)+.55));const gr=g.createRadialGradient(px-rr*.4,py-rr*.5,rr*.08,px+rr*.1,py+rr*.15,rr*1.15);
    gr.addColorStop(0,mxRgb(mxMix(P.l,P.hl,up*.4)));gr.addColorStop(.45,mxRgb(P.m));gr.addColorStop(1,mxRgb(P.d));g.fillStyle=gr;bump(px,py,rr,i);g.fill();
    for(let k=0;k<5;k++){const a=R()*6.283,dd=Math.sqrt(R())*rr*.8,lx=px+Math.cos(a)*dd,ly=py+Math.sin(a)*dd,lit=(Math.cos(a)*-.55+Math.sin(a)*-.75)*dd/rr;g.fillStyle=lit>.1?mxRgb(P.hl,.25+.3*lit):mxRgb(P.o,.2);g.beginPath();g.ellipse(lx,ly,1.1*s+.3,.65*s+.2,R()*3,0,7);g.fill()}
    g.strokeStyle=mxRgb(P.hl,.25+.3*up);g.lineWidth=.8;g.beginPath();g.arc(px,py,rr*.88,3.6,4.9);g.stroke()});
  if(o.snow){g.fillStyle='rgba(250,253,255,.97)';B.forEach(([px,py,rr],i)=>{if(py<cy+1.5*s){g.beginPath();g.ellipse(px-rr*.12,py-rr*.5,rr*.78,rr*.42,-.1,Math.PI*.98,Math.PI*2.02);g.quadraticCurveTo(px,py-rr*.2,px-rr*.9,py-rr*.48);g.fill()}});
    g.fillStyle='rgba(190,214,236,.55)';B.forEach(([px,py,rr])=>{if(py<cy+1.5*s){g.beginPath();g.ellipse(px+rr*.1,py-rr*.28,rr*.55,rr*.1,0,0,7);g.fill()}})}
  if(o.fl){for(let i=0;i<7;i++){const a=i*.9+(o.fr||0)*6,d=(4+(i%3)*2.2)*s,fx=cx+Math.cos(a)*d,fy=cy-1.5*s+Math.sin(a)*d*.55;g.fillStyle=mxRgb(mxMix(o.fl,MXK,.35));g.beginPath();g.arc(fx+.4,fy+.5,1.6*s,0,7);g.fill();g.fillStyle=mxRgb(o.fl);g.beginPath();g.arc(fx,fy,1.5*s,0,7);g.fill();g.fillStyle='rgba(255,250,200,.9)';g.beginPath();g.arc(fx-.3*s,fy-.3*s,.55*s,0,7);g.fill()}}}
const MXBP={g:{o:[24,50,22],d:[42,86,36],m:[70,124,52],l:[122,174,80],hl:[194,228,132]},f:{o:[70,92,116],d:[124,150,174],m:[176,198,218],l:[224,236,248],hl:[255,255,255]},s:{o:[30,46,24],d:[58,84,40],m:[92,122,56],l:[140,170,88],hl:[206,226,150]}};
MXVP.bush=o=>mxBushV(o.x,o.y,o.s,MXBP.g);
MXVP.fbush=o=>mxBushV(o.x,o.y,o.s,MXBP.g,{fl:[[255,138,176],[255,224,122],[255,255,255],[200,160,255]][Math.min(3,o.r*4|0)],fr:o.r});
MXVP.frozbush=o=>mxBushV(o.x,o.y,o.s,MXBP.f,{snow:1});
/* ตอไม้: วงปีบนหน้าตัด · เปลือกมีลาย · ราก */
MXVP.stump=o=>{const x=o.x,y=o.y,s=o.s;g.fillStyle='#3a2616';for(const q of[-1,1]){g.beginPath();g.ellipse(x+q*7*s,y-.5*s,3.6*s,1.8*s,q*.4,0,7);g.fill()}
  const gr=g.createLinearGradient(x-8*s,0,x+8*s,0);gr.addColorStop(0,'#7a5634');gr.addColorStop(.45,'#5a3c24');gr.addColorStop(1,'#2a1a0e');g.fillStyle=gr;g.beginPath();g.moveTo(x-8*s,y+1);g.lineTo(x-7*s,y-9*s);g.lineTo(x+7*s,y-9*s);g.lineTo(x+8*s,y+1);g.quadraticCurveTo(x,y+3*s,x-8*s,y+1);g.closePath();g.fill();
  g.strokeStyle='rgba(20,10,4,.5)';g.lineWidth=.6;for(let i=0;i<4;i++){const bx=x-5*s+i*3.3*s;g.beginPath();g.moveTo(bx,y);g.lineTo(bx+.4*s,y-8*s);g.stroke()}
  const tg=g.createRadialGradient(x-1.5*s,y-9.5*s,.5,x,y-9*s,7*s);tg.addColorStop(0,'#ecc68a');tg.addColorStop(1,'#b8884e');g.fillStyle=tg;g.beginPath();g.ellipse(x,y-9*s,7*s,2.7*s,0,0,7);g.fill();
  g.strokeStyle='rgba(120,80,40,.7)';g.lineWidth=.5;for(const q of[.3,.55,.8]){g.beginPath();g.ellipse(x,y-9*s,7*s*q,2.7*s*q,0,0,7);g.stroke()}g.strokeStyle='#3a2616';g.lineWidth=.8;g.beginPath();g.ellipse(x,y-9*s,7*s,2.7*s,0,0,7);g.stroke();
  g.fillStyle='rgba(90,146,60,.85)';g.beginPath();g.ellipse(x-5.5*s,y-2*s,3*s,1.8*s,0,0,7);g.fill()};
MXVP.log=o=>{const x=o.x,y=o.y,s=o.s,f=o.f;g.save();g.translate(x,y);g.scale(f,1);const gr=g.createLinearGradient(0,-8*s,0,2*s);gr.addColorStop(0,'#86603c');gr.addColorStop(.5,'#5a3e26');gr.addColorStop(1,'#2e1e10');g.fillStyle=gr;
  g.beginPath();g.moveTo(-18*s,-6*s);g.quadraticCurveTo(0,-9*s,16*s,-8*s);g.lineTo(17*s,1*s);g.quadraticCurveTo(0,3*s,-18*s,2*s);g.closePath();g.fill();g.strokeStyle='rgba(20,10,4,.45)';g.lineWidth=.6;for(let i=0;i<3;i++){g.beginPath();g.moveTo(-16*s,-4*s+i*2.2*s);g.quadraticCurveTo(0,-6.5*s+i*2.2*s,14*s,-5.5*s+i*2.2*s);g.stroke()}
  const tg=g.createRadialGradient(15.6*s,-4.3*s,.5,16.5*s,-3.5*s,4.6*s);tg.addColorStop(0,'#eccb92');tg.addColorStop(1,'#b48650');g.fillStyle=tg;g.beginPath();g.ellipse(16.5*s,-3.5*s,2.6*s,4.6*s,0,0,7);g.fill();g.strokeStyle='rgba(120,80,40,.7)';g.lineWidth=.5;g.beginPath();g.ellipse(16.5*s,-3.5*s,1.4*s,2.6*s,0,0,7);g.stroke();
  g.fillStyle='rgba(90,146,60,.9)';g.beginPath();g.ellipse(-6*s,-7.5*s,6*s,2*s,0,0,7);g.fill();g.fillStyle='rgba(150,200,100,.6)';g.beginPath();g.ellipse(-7*s,-8.2*s,3*s,.9*s,0,0,7);g.fill();g.restore()};
MXVP.skull=o=>{const x=o.x,y=o.y,s=o.s,gr=g.createLinearGradient(x-5*s,y-10*s,x+5*s,y);gr.addColorStop(0,'#fffaf0');gr.addColorStop(1,'#bcae92');g.fillStyle=gr;g.beginPath();g.arc(x,y-5*s,5*s,Math.PI*.9,Math.PI*2.1);g.lineTo(x+3*s,y);g.lineTo(x-3*s,y);g.closePath();g.fill();
  g.strokeStyle='rgba(60,46,30,.55)';g.lineWidth=.6;g.stroke();g.fillStyle='#241a12';g.beginPath();g.ellipse(x-2*s,y-5*s,1.4*s,1.6*s,0,0,7);g.ellipse(x+2*s,y-5*s,1.4*s,1.6*s,0,0,7);g.fill();g.beginPath();g.moveTo(x,y-3.4*s);g.lineTo(x-.7*s,y-2*s);g.lineTo(x+.7*s,y-2*s);g.fill();
  g.strokeStyle='rgba(60,46,30,.6)';g.lineWidth=.4;g.beginPath();for(let i=0;i<4;i++){g.moveTo(x-1.8*s+i*1.2*s,y-.3*s);g.lineTo(x-1.8*s+i*1.2*s,y-1.3*s)}g.stroke()};
MXVP.crate=o=>{const x=o.x,y=o.y,s=o.s;g.fillStyle='#6e4c28';g.fillRect(x-8*s,y-14*s,16*s,14*s);const gr=g.createLinearGradient(x-8*s,0,x+8*s,0);gr.addColorStop(0,'#b08452');gr.addColorStop(1,'#7a5430');g.fillStyle=gr;g.fillRect(x-7*s,y-13*s,14*s,12*s);
  g.fillStyle='#d2a66a';g.fillRect(x-8*s,y-14*s,16*s,2.6*s);g.strokeStyle='#4a3018';g.lineWidth=1;g.strokeRect(x-8*s,y-14*s,16*s,14*s);g.lineWidth=1.6*s;g.strokeStyle='#5a3a1c';g.beginPath();g.moveTo(x-7*s,y-11*s);g.lineTo(x+7*s,y-1*s);g.stroke();
  g.strokeStyle='rgba(40,24,10,.4)';g.lineWidth=.5;for(let i=1;i<4;i++){g.beginPath();g.moveTo(x-7*s,y-13*s+i*3*s);g.lineTo(x+7*s,y-13*s+i*3*s);g.stroke()}g.fillStyle='#2a1a0c';for(const[a,b]of[[-6.5,-12.6],[6.5,-12.6],[-6.5,-1.4],[6.5,-1.4]]){g.beginPath();g.arc(x+a*s,y+b*s,.6*s,0,7);g.fill()}};
MXVP.barrel=o=>{const x=o.x,y=o.y,s=o.s,gr=g.createLinearGradient(x-7*s,0,x+7*s,0);gr.addColorStop(0,'#9a6e40');gr.addColorStop(.4,'#7a5230');gr.addColorStop(1,'#3e2814');g.fillStyle=gr;g.beginPath();g.ellipse(x,y-7*s,7*s,8*s,0,0,7);g.fill();
  g.strokeStyle='rgba(30,16,6,.45)';g.lineWidth=.5;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(x+i*2.6*s,y-14*s);g.quadraticCurveTo(x+i*3.3*s,y-7*s,x+i*2.6*s,y);g.stroke()}
  g.fillStyle='#4a4a50';g.fillRect(x-7*s,y-11.4*s,14*s,1.5*s);g.fillRect(x-7*s,y-4*s,14*s,1.5*s);g.fillStyle='rgba(220,220,230,.45)';g.fillRect(x-6*s,y-11.4*s,4*s,.5*s);g.fillRect(x-6*s,y-4*s,4*s,.5*s);
  const tg=g.createRadialGradient(x-1.5*s,y-14.5*s,.5,x,y-14*s,5.5*s);tg.addColorStop(0,'#b88a56');tg.addColorStop(1,'#7a5430');g.fillStyle=tg;g.beginPath();g.ellipse(x,y-14*s,5.5*s,2*s,0,0,7);g.fill();g.strokeStyle='#3a2410';g.lineWidth=.7;g.stroke()};
MXVP.pot=o=>{const x=o.x,y=o.y,s=o.s,gr=g.createLinearGradient(x-8*s,0,x+8*s,0);gr.addColorStop(0,'#e09460');gr.addColorStop(.45,'#b0683a');gr.addColorStop(1,'#6a3418');g.fillStyle=gr;g.beginPath();g.moveTo(x-3*s,y-14*s);g.quadraticCurveTo(x-9.5*s,y-8*s,x-4*s,y);g.lineTo(x+4*s,y);g.quadraticCurveTo(x+9.5*s,y-8*s,x+3*s,y-14*s);g.closePath();g.fill();
  g.strokeStyle='rgba(60,24,8,.6)';g.lineWidth=.7;g.stroke();g.fillStyle='#8a4a24';g.fillRect(x-3.6*s,y-15.2*s,7.2*s,2.2*s);g.fillStyle='rgba(255,220,170,.5)';g.fillRect(x-3.6*s,y-15.2*s,7.2*s,.6*s);
  g.strokeStyle='#f0d29a';g.lineWidth=.9;g.beginPath();g.moveTo(x-6.4*s,y-7*s);g.quadraticCurveTo(x,y-6*s,x+6.4*s,y-7*s);g.stroke();g.strokeStyle='rgba(240,210,150,.6)';g.beginPath();g.moveTo(x-5.6*s,y-9.4*s);g.quadraticCurveTo(x,y-8.6*s,x+5.6*s,y-9.4*s);g.stroke();
  g.fillStyle='rgba(255,236,200,.35)';g.beginPath();g.ellipse(x-3.5*s,y-9*s,1.2*s,3.4*s,.2,0,7);g.fill();if(o.r<.4){g.fillStyle='#140c06';g.beginPath();g.moveTo(x+2*s,y-12*s);g.lineTo(x+6*s,y-9*s);g.lineTo(x+3*s,y-7*s);g.fill()}};
MXVP.cactus=o=>{const x=o.x,y=o.y,s=o.s,arm=(cx,cy,rx,ry)=>{const gr=g.createLinearGradient(cx-rx,0,cx+rx,0);gr.addColorStop(0,'#86b864');gr.addColorStop(.5,'#4e8a3c');gr.addColorStop(1,'#2a5a24');g.fillStyle=gr;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.fill();g.strokeStyle='rgba(20,50,16,.55)';g.lineWidth=.5;g.beginPath();g.moveTo(cx,cy-ry*.9);g.lineTo(cx,cy+ry*.9);g.stroke()};
  arm(x-7*s,y-13*s,2.6*s,5*s);g.fillStyle='#4e8a3c';g.fillRect(x-7*s,y-10*s,5*s,3*s);arm(x+7*s,y-17*s,2.6*s,5*s);g.fillRect(x+2*s,y-14*s,5*s,3*s);arm(x,y-12*s,4.6*s,12*s);
  g.fillStyle='rgba(255,255,230,.7)';for(let i=0;i<10;i++){g.fillRect(x-3.5*s+(i%3)*3.3*s,y-21*s+i*1.9*s,.5,.5)}if(o.r<.3){g.fillStyle='#ff7aa0';g.beginPath();g.arc(x,y-24*s,2*s,0,7);g.fill();g.fillStyle='#ffe07a';g.beginPath();g.arc(x,y-24*s,.8*s,0,7);g.fill()}};
MXVP.pillarB=o=>{const x=o.x,y=o.y,s=o.s,h=(14+o.r*14)*s,gr=g.createLinearGradient(x-7*s,0,x+7*s,0);gr.addColorStop(0,'#ece4d4');gr.addColorStop(.35,'#c8bea8');gr.addColorStop(1,'#8a8270');g.fillStyle=gr;g.fillRect(x-7*s,y-h,14*s,h);
  g.strokeStyle='rgba(60,50,40,.3)';g.lineWidth=.6;for(let i=1;i<4;i++){g.beginPath();g.moveTo(x-7*s+i*3.5*s,y-h);g.lineTo(x-7*s+i*3.5*s,y);g.stroke()}
  g.fillStyle='#b4aa96';g.beginPath();g.moveTo(x-8*s,y-h);g.lineTo(x-3*s,y-h-4*s);g.lineTo(x+2*s,y-h-1*s);g.lineTo(x+8*s,y-h-3*s);g.lineTo(x+8*s,y-h);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.moveTo(x-8*s,y-h);g.lineTo(x-3*s,y-h-4*s);g.lineTo(x-1*s,y-h-2*s);g.closePath();g.fill();
  g.fillStyle='#9a907c';g.fillRect(x-9*s,y-3*s,18*s,3*s);g.fillStyle='rgba(255,255,255,.3)';g.fillRect(x-9*s,y-3*s,18*s,.8*s);g.strokeStyle='rgba(60,50,40,.5)';g.lineWidth=.6;g.strokeRect(x-7*s,y-h,14*s,h);mxRockV(x+12*s,y+2,s*.4,[176,166,148])};
MXVP.rubble=o=>{const x=o.x,y=o.y,s=o.s;for(let i=0;i<4;i++){const a=o.r*6+i*1.6,px=x+Math.cos(a)*6*s,py=y+Math.sin(a)*3*s;mxRockV(px,py,s*(.35+.15*i),[118,112,106],{sd:i})}};
MXVP.coral=o=>{const x=o.x,y=o.y,s=o.s,c=[[255,122,138],[255,176,90],[200,122,255]][o.r*3|0],cd=mxMix(c,MXK,.35),cl=mxMix(c,MXW,.4);g.lineCap='round';
  for(const[col,w,dx]of[[cd,2.9,.5],[c,2.4,0]]){g.strokeStyle=mxRgb(col);g.lineWidth=w*s;g.beginPath();for(let i=-2;i<=2;i++){const a=-Math.PI/2+i*.38,l=(10+((i*i*3+o.r*20)%6))*s;const ex=x+dx+Math.cos(a)*l,ey=y+Math.sin(a)*l;g.moveTo(x+dx,y);g.quadraticCurveTo(x+dx+Math.cos(a)*l*.3,y-l*.6,ex,ey);g.moveTo(x+dx+Math.cos(a)*l*.6,y+Math.sin(a)*l*.6);g.lineTo(ex+Math.cos(a+.6)*4*s,ey+Math.sin(a+.6)*4*s)}g.stroke()}
  g.fillStyle=mxRgb(cl);for(let i=-2;i<=2;i++){const a=-Math.PI/2+i*.38,l=(10+((i*i*3+o.r*20)%6))*s;g.beginPath();g.arc(x+Math.cos(a)*l,y+Math.sin(a)*l,1.2*s,0,7);g.fill()}g.lineCap='butt'};
MXVP.shell=o=>{const x=o.x,y=o.y,s=o.s,gr=g.createLinearGradient(x,y-7*s,x,y);gr.addColorStop(0,'#fff0de');gr.addColorStop(1,'#d8b494');g.fillStyle=gr;g.beginPath();g.moveTo(x-4*s,y);g.quadraticCurveTo(x,y-7.5*s,x+4*s,y);g.closePath();g.fill();g.strokeStyle='#b88a68';g.lineWidth=.5;g.beginPath();for(let i=-2;i<=2;i++){g.moveTo(x,y);g.lineTo(x+i*1.8*s,y-5*s)}g.stroke();g.fillStyle='#c8a080';g.fillRect(x-1.2*s,y-.8*s,2.4*s,1*s)};
MXVP.obsid=o=>{const x=o.x,y=o.y,s=o.s;for(const[dx,h,w]of[[-5,14,4],[0,22,5],[5,12,4]]){g.fillStyle='#120c12';g.beginPath();g.moveTo(x+(dx-w)*s,y);g.lineTo(x+dx*s,y-h*s);g.lineTo(x+(dx+w)*s,y);g.closePath();g.fill();
  const gr=g.createLinearGradient(x+(dx-w)*s,y-h*s,x+dx*s,y);gr.addColorStop(0,'rgba(210,180,255,.65)');gr.addColorStop(1,'rgba(90,60,140,.15)');g.fillStyle=gr;g.beginPath();g.moveTo(x+(dx-w)*s,y);g.lineTo(x+dx*s,y-h*s);g.lineTo(x+(dx-w*.25)*s,y);g.closePath();g.fill();g.strokeStyle='rgba(255,140,60,.35)';g.lineWidth=.6;g.beginPath();g.moveTo(x+(dx-w)*s,y);g.lineTo(x+dx*s,y-h*s);g.lineTo(x+(dx+w)*s,y);g.stroke()}
  g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,y,0,x,y,14*s);gr.addColorStop(0,'rgba(255,90,30,.3)');gr.addColorStop(1,'rgba(255,60,20,0)');g.fillStyle=gr;g.fillRect(x-14*s,y-14*s,28*s,28*s);g.restore()};
MXVP.stake=o=>{const x=o.x,y=o.y,s=o.s,gr=g.createLinearGradient(x-1.5*s,0,x+1.5*s,0);gr.addColorStop(0,'#7a5a3e');gr.addColorStop(1,'#3a2618');g.fillStyle=gr;g.fillRect(x-1.5*s,y-18*s,3*s,18*s);MXVP.skull({x,y:y-15.5*s,s:s*.85})};
MXVP.bones=o=>{const x=o.x,y=o.y,s=o.s;g.lineCap='round';for(let i=0;i<3;i++){const a=o.r*6+i*2.1,bx=x+Math.cos(a)*5*s,by=y+Math.sin(a)*3*s,dx=Math.cos(a+1)*5*s,dy=Math.sin(a+1)*2*s;
  g.strokeStyle='rgba(40,28,18,.28)';g.lineWidth=2.2*s;g.beginPath();g.moveTo(bx-dx+.6,by-dy+.9);g.lineTo(bx+dx+.6,by+dy+.9);g.stroke();
  g.strokeStyle='#cbbd9e';g.lineWidth=2*s;g.beginPath();g.moveTo(bx-dx,by-dy);g.lineTo(bx+dx,by+dy);g.stroke();g.strokeStyle='rgba(250,244,226,.75)';g.lineWidth=.7*s;g.beginPath();g.moveTo(bx-dx*.8,by-dy*.8-.5*s);g.lineTo(bx+dx*.8,by+dy*.8-.5*s);g.stroke();
  g.fillStyle='#d8ccb0';for(const q of[-1,1]){g.beginPath();g.arc(bx+dx*q,by+dy*q,1.15*s,0,7);g.fill()}}g.lineCap='butt'};
MXVP.rib=o=>{const x=o.x,y=o.y,s=o.s*1.2;g.lineCap='round';g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2.6*s;g.beginPath();g.moveTo(x-16*s,y+1.5);g.lineTo(x+16*s,y-.5);g.stroke();g.strokeStyle='#e4d8be';g.lineWidth=2.4*s;g.beginPath();g.moveTo(x-16*s,y);g.lineTo(x+16*s,y-2*s);g.stroke();
  for(let i=0;i<5;i++){const bx=x-11*s+i*5.5*s;g.strokeStyle='#b8aa8c';g.lineWidth=2*s;g.beginPath();g.moveTo(bx+.5,y-1*s+.5);g.quadraticCurveTo(bx-4*s+.5,y-12*s,bx+2*s+.5,y-(16-i)*s);g.stroke();g.strokeStyle='#f0e6d0';g.lineWidth=1.5*s;g.beginPath();g.moveTo(bx,y-1*s);g.quadraticCurveTo(bx-4*s,y-12*s,bx+2*s,y-(16-i)*s);g.stroke()}g.lineCap='butt'};
MXVP.cart=o=>{const x=o.x,y=o.y,s=o.s,f=o.f;g.save();g.translate(x,y);g.scale(f,1);g.rotate(.12);const gr=g.createLinearGradient(0,-14*s,0,-4*s);gr.addColorStop(0,'#8a6440');gr.addColorStop(1,'#4a3220');g.fillStyle=gr;g.fillRect(-16*s,-14*s,28*s,10*s);
  g.strokeStyle='rgba(30,16,6,.5)';g.lineWidth=.6;for(let i=1;i<3;i++){g.beginPath();g.moveTo(-16*s,-14*s+i*3.3*s);g.lineTo(12*s,-14*s+i*3.3*s);g.stroke()}g.fillStyle='#3a2818';g.fillRect(-16*s,-6*s,28*s,2*s);
  g.strokeStyle='#2a1c10';g.lineWidth=2*s;g.beginPath();g.arc(-8*s,-2*s,6*s,0,7);g.stroke();g.lineWidth=.8*s;for(let i=0;i<4;i++){const a=i*.785;g.beginPath();g.moveTo(-8*s+Math.cos(a)*6*s,-2*s+Math.sin(a)*6*s);g.lineTo(-8*s-Math.cos(a)*6*s,-2*s-Math.sin(a)*6*s);g.stroke()}
  g.lineWidth=2*s;g.beginPath();g.moveTo(12*s,-8*s);g.lineTo(24*s,-2*s);g.stroke();g.restore()};
MXVP.amph=o=>{const x=o.x,y=o.y,s=o.s;g.save();g.translate(x,y);g.rotate(o.f*.9);const gr=g.createLinearGradient(-5*s,0,5*s,0);gr.addColorStop(0,'#b08a64');gr.addColorStop(1,'#5e4630');g.fillStyle=gr;g.beginPath();g.ellipse(0,-6*s,5*s,7*s,0,0,7);g.fill();g.fillRect(-2*s,-15*s,4*s,4*s);
  g.fillStyle='rgba(255,255,255,.25)';g.fillRect(-3.5*s,-10*s,1.6*s,8*s);g.fillStyle='rgba(40,140,120,.55)';g.beginPath();g.ellipse(0,-3*s,4*s,2*s,0,0,7);g.fill();g.restore()};
/* พุ่มไม้แห้ง: กิ่งเรียวแตกแขนง ไล่สีโคนเข้มปลายอ่อน */
MXVP.dshrub=o=>{const x=o.x,y=o.y,s=o.s;g.lineCap='round';const br=(x0,y0,a,l,w,d)=>{const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;g.strokeStyle=d>1?'#5a4430':'#8a6c48';g.lineWidth=w;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(x0+Math.cos(a+.25)*l*.5,y0+Math.sin(a+.25)*l*.5,x1,y1);g.stroke();
   if(d<3&&l>3*s){br(x0+(x1-x0)*.55,y0+(y1-y0)*.55,a-.55,l*.5,w*.65,d+1);br(x1,y1,a+.4,l*.42,w*.6,d+1)}};
  for(let i=0;i<6;i++){const a=-Math.PI/2+(i-2.5)*.34,l=(7+((i*37+o.r*50)%6))*s;br(x+(i-2.5)*.6*s,y,a,l,1.5,1)}
  g.fillStyle='rgba(210,180,130,.55)';for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.45;g.beginPath();g.arc(x+Math.cos(a)*9*s,y+Math.sin(a)*9*s,.7*s,0,7);g.fill()}g.lineCap='butt'};
/* เห็ด: ก้านไล่เงา · ครีบใต้หมวก · หมวกไล่แสง · จุดขาว */
MXVP.mush=o=>{const x=o.x,y=o.y,s=o.s,red=o.r<.5,cap=red?[204,66,44]:[176,122,64],dot=red?[255,244,226]:[236,212,166];
  const sg=g.createLinearGradient(x-1.8*s,0,x+1.8*s,0);sg.addColorStop(0,'#fbf4e4');sg.addColorStop(1,'#c4b494');g.fillStyle=sg;g.beginPath();g.moveTo(x-1.6*s,y);g.quadraticCurveTo(x-2.1*s,y-4*s,x-1.3*s,y-8*s);g.lineTo(x+1.3*s,y-8*s);g.quadraticCurveTo(x+2.1*s,y-4*s,x+1.6*s,y);g.closePath();g.fill();
  g.fillStyle=mxRgb(mxMix(cap,[240,222,192],.62));g.beginPath();g.ellipse(x,y-8*s,6.4*s,1.7*s,0,0,Math.PI);g.fill();g.strokeStyle=mxRgb(mxMix(cap,MXK,.2),.35);g.lineWidth=.4;g.beginPath();for(let i=-4;i<=4;i++){g.moveTo(x+i*.7*s,y-7.9*s);g.lineTo(x+i*1.4*s,y-6.7*s)}g.stroke();
  const cg=g.createRadialGradient(x-2.6*s,y-11.2*s,.4,x,y-9*s,7.6*s);cg.addColorStop(0,mxRgb(mxMix(cap,MXW,.38)));cg.addColorStop(.58,mxRgb(cap));cg.addColorStop(1,mxRgb(mxMix(cap,MXK,.38)));g.fillStyle=cg;g.beginPath();g.ellipse(x,y-8*s,7*s,4.8*s,0,Math.PI,0);g.quadraticCurveTo(x,y-6.5*s,x-7*s,y-8*s);g.fill();
  g.fillStyle=mxRgb(dot);for(const[a,b,r]of[[-3.6,-10,1.15],[-.4,-11.7,1.25],[2.9,-10.3,1],[4.9,-8.7,.7],[-5.3,-8.5,.7]]){g.beginPath();g.ellipse(x+a*s,y+b*s,r*s,r*.72*s,0,0,7);g.fill()}
  g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=.7;g.beginPath();g.ellipse(x,y-8*s,6.1*s,4*s,0,Math.PI*1.12,Math.PI*1.48);g.stroke()};
