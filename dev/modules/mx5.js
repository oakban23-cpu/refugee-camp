/* ===================== v556 · แผนที่โฉมใหม่ ช่วงที่ 3: แผ่นดินเงา (19–22) + รากพิภพ (23–26) =====================
   ลายพื้นเดิม: มอสสปอร์เรืองแสง · โคลนม่วงแอ่งน้ำ · แผ่นหินนครเก่า · ออบซิเดียนรอยร้าวม่วง · ดินโพรงราก · หินถ้ำชื้นแอ่งเรือง · พื้นหินสุสาน · หินร้อนลาวา
   "ต้นไม้" เดิม: เห็ดยักษ์ · ต้นไม้ตายกลางบึง/กก · เสาหินหัก · เสาออบซิเดียน · เสารากพัน · ผลึกเรือง · หลุมศพ/ดาบปัก · เสารากแมกมา → สไปรต์มีมิติ (v เดิม) */
const mxSV=t=>Math.abs(Math.round(t.x*7+t.y*3))%4;/* ตัวแปรเดียวกับ shadeTree/rootTree เดิม */
MXB.mush=B=>(n,cols,s0,s1)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,s=s0+R()*(s1-s0),c=cols[(R()*cols.length)|0];W8(px,py,s*3,(X,Y)=>{
  const gr=x.createRadialGradient(X,Y-s,0,X,Y-s,s*3);gr.addColorStop(0,'rgba('+c[2]+',.22)');gr.addColorStop(1,'rgba('+c[2]+',0)');x.fillStyle=gr;x.fillRect(X-s*3,Y-s*4,s*6,s*6);
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(X+.5,Y+.4,s*.9,s*.3,0,0,7);x.fill();x.fillStyle='#d8e8d0';x.fillRect(X-s*.18,Y-s*.9,s*.36,s*.9);
  const cg=x.createLinearGradient(X-s,Y-s*1.5,X+s*.6,Y-s*.6);cg.addColorStop(0,c[1]);cg.addColorStop(1,c[0]);x.fillStyle=cg;x.beginPath();x.ellipse(X,Y-s*.9,s,s*.62,0,Math.PI,0);x.quadraticCurveTo(X,Y-s*.68,X-s,Y-s*.9);x.fill();
  x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.arc(X-s*.35,Y-s*1.22,s*.14,0,7);x.arc(X+s*.25,Y-s*1.3,s*.11,0,7);x.fill()})}};
MXB.glowdots=B=>(n,cols,r0,r1)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,r=r0+R()*(r1-r0),c=cols[(R()*cols.length)|0];W8(px,py,r*4,(X,Y)=>{const gr=x.createRadialGradient(X,Y,0,X,Y,r*3.5);gr.addColorStop(0,'rgba('+c+',.45)');gr.addColorStop(1,'rgba('+c+',0)');x.fillStyle=gr;x.fillRect(X-r*3.5,Y-r*3.5,r*7,r*7);x.fillStyle='rgba('+c+',.95)';x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.fillStyle='rgba(255,255,255,.8)';x.beginPath();x.arc(X-r*.3,Y-r*.3,r*.35,0,7);x.fill()})}};
MXB.roots=B=>(n,w0,w1,L0,L1,col,hl)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,a=R()*6.28,l=L0+R()*(L1-L0),w=w0+R()*(w1-w0),c1=[Math.cos(a+1)*l*.5,Math.sin(a+1)*l*.5],e=[Math.cos(a)*l,Math.sin(a)*l],br=R()<.6?[R()*.6+.2,a+(R()<.5?1:-1)*(.6+R()*.5),l*.35]:null;
  W8(px,py,l+6,(X,Y)=>{x.lineCap='round';const pth=(dx,dy)=>{x.beginPath();x.moveTo(X+dx,Y+dy);x.quadraticCurveTo(X+c1[0]+dx,Y+c1[1]+dy,X+e[0]+dx,Y+e[1]+dy)};
    x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=w+1.4;pth(.8,1.2);x.stroke();x.strokeStyle=col;x.lineWidth=w;pth(0,0);x.stroke();if(hl){x.strokeStyle=hl;x.lineWidth=w*.3;pth(-w*.2,-w*.25);x.stroke()}
    if(br){const t=br[0],bx=X+(1-t)*(1-t)*0+2*(1-t)*t*c1[0]+t*t*e[0],by=Y+2*(1-t)*t*c1[1]+t*t*e[1];x.strokeStyle=col;x.lineWidth=w*.55;x.beginPath();x.moveTo(bx,by);x.lineTo(bx+Math.cos(br[1])*br[2],by+Math.sin(br[1])*br[2]);x.stroke()}})}};
MXB.webs=B=>(n,col)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,a=R()*6.28,l=20+R()*40;W8(px,py,l,(X,Y)=>{x.strokeStyle=col;x.lineWidth=.7;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+Math.cos(a+.3)*l*.5,Y+Math.sin(a+.3)*l*.5+3,X+Math.cos(a)*l,Y+Math.sin(a)*l);x.stroke();
  x.lineWidth=.4;for(let k=1;k<4;k++){const t=k/4;x.beginPath();x.moveTo(X+Math.cos(a)*l*t,Y+Math.sin(a)*l*t);x.lineTo(X+Math.cos(a)*l*t+Math.cos(a+1.5)*5,Y+Math.sin(a)*l*t+Math.sin(a+1.5)*5);x.stroke()}})}};

/* ===================== 19 · ป่าเห็ดเรืองแสง ===================== */
MXC[19]={k:'s19',amp:90,sc:600,lit:[200,255,240],shd:[2,12,16],kl:.24,ks:.34,ao:.55,ff:.1,cs:.26,dap:.1,cla:0,gw:.6,gwc:'190,255,236',gcc:'10,20,60',base:'s190',ug:'s19',tree:'s19',tby:.5,uby:.5,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'s191',c:f=>mxSS(.6,.68,f.w*.6+f.m*.4),e:0},
  {t:'s192',c:f=>mxSS(.62,.7,(1-f.h)*.6+f.d*.4),e:-6},
  {t:'s193',c:f=>mxSS(.66,.72,f.q*.6+f.m*.4),e:0}]};
MXDC.s19=MXDC.gen;
Object.assign(MXT,{
 s190:B=>{B.fill([26,52,54]);B.blob(56,[40,110,100],[8,24,26],12,44,.16,.3);B.carpet(2200,[[18,44,44],[26,62,60],[36,82,76],[52,108,96]],1.4,2.8,{per:9,cr:6,w:.8,hv:.4,tip:[150,240,210]});
   B.glowdots(40,['120,255,230','180,255,200'],.6,1.3);B.mush(22,[['#2ab0a0','#9afff0','90,240,220'],['#7a4ad0','#d8c0ff','170,120,255']],1.6,3);B.grain(1000,.03,.06)},
 s191:B=>{B.carpet(1600,[[30,90,84],[44,124,110],[70,160,140],[120,210,190]],1.4,3,{per:9,cr:6,w:.8,hv:.4,tip:[200,255,240]});B.glowdots(50,['120,255,230','160,255,240'],.6,1.4)},
 s192:B=>{B.fill([20,30,30]);B.blob(30,[34,50,48],[10,16,16],10,30,.24,.36);B.roots(10,1.4,2.6,14,34,'#1a2420','rgba(140,200,180,.18)');B.peb(30,[40,56,54],[70,90,86],.6,1.6,.3);B.grain(1000,.03,.07)},
 s193:B=>{B.mush(40,[['#2ab0a0','#9afff0','90,240,220'],['#2a90b0','#a0f0ff','90,200,255'],['#7a4ad0','#d8c0ff','170,120,255']],1.8,3.4)}});
MXU.s19=[()=>mxDSpr('s19u0',12,12,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(6.5,10.6,4,1.2,0,0,7);x.fill();x.fillStyle='#d8e8d0';x.fillRect(5.3,6,1.4,4.6);const gr=x.createLinearGradient(2,3,9,7);gr.addColorStop(0,'#9afff0');gr.addColorStop(1,'#2ab0a0');x.fillStyle=gr;x.beginPath();x.ellipse(6,6.4,4,2.6,0,Math.PI,0);x.fill()}),
  ()=>mxTuftSpr('s19u1',[[16,48,46],[30,86,78],[70,150,130]],8,5,191),()=>mxStoneSpr('s19u2',[60,84,82],6,4.4,{top:[60,150,130],ta:.6})];
MXNS.s19={rim:[36,60,58],sp:[160,255,240],gl:'120,255,230'};
function mxGiantMushSpr(r,v){return mxSprite('gms'+r+'|'+v,r*3,r*4.4,r*1.4,r*4.4-r*.55,(x,w,h)=>{const bx=r*1.4,by=h-r*.55,R=gxRng(r*7+v*3),H=r*(1.6+v*.25)+r*.5,cw=r*(1.1+(v%2)*.3),cc=v===3?['#8a6ae0','#c8b0ff','#4a2e8a']:['#2ab8a8','#9afff0','#136a64'];
  const sg=x.createLinearGradient(bx-r*.28,0,bx+r*.28,0);sg.addColorStop(0,'#f2fbe8');sg.addColorStop(.5,'#c8d8bc');sg.addColorStop(1,'#7a8a74');x.fillStyle=sg;x.beginPath();x.moveTo(bx-r*.3,by+r*.05);x.quadraticCurveTo(bx-r*.18,by-H*.5,bx-r*.2,by-H);x.lineTo(bx+r*.2,by-H);x.quadraticCurveTo(bx+r*.18,by-H*.5,bx+r*.3,by+r*.05);x.closePath();x.fill();x.strokeStyle='#0e0a14';x.lineWidth=1;x.stroke();
  x.strokeStyle='rgba(90,110,90,.4)';x.lineWidth=.6;for(let i=0;i<4;i++){x.beginPath();x.moveTo(bx-r*.12+i*r*.08,by);x.quadraticCurveTo(bx-r*.1+i*r*.07,by-H*.5,bx-r*.12+i*r*.08,by-H*.95);x.stroke()}
  x.fillStyle='rgba(220,240,210,.5)';x.beginPath();x.ellipse(bx,by-H*.55,r*.24,r*.06,0,0,7);x.fill();
  x.fillStyle=cc[2];x.beginPath();x.ellipse(bx,by-H+r*.02,cw*.95,cw*.22,0,0,Math.PI);x.fill();x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=.6;for(let i=-6;i<=6;i++){x.beginPath();x.moveTo(bx,by-H+r*.02);x.lineTo(bx+i*cw*.14,by-H+cw*.18);x.stroke()}
  const cg=x.createRadialGradient(bx-cw*.35,by-H-cw*.35,cw*.05,bx,by-H-cw*.1,cw*1.05);cg.addColorStop(0,cc[1]);cg.addColorStop(.5,cc[0]);cg.addColorStop(1,cc[2]);x.fillStyle=cg;x.beginPath();x.ellipse(bx,by-H,cw,cw*.6,0,Math.PI,0);x.quadraticCurveTo(bx,by-H+cw*.24,bx-cw,by-H);x.fill();x.strokeStyle='#0e0a14';x.lineWidth=1;x.stroke();
  for(let i=0;i<7;i++){const a=Math.PI+.3+i*.42,sx=bx+Math.cos(a)*cw*.62,sy=by-H+Math.sin(a)*cw*.34;x.fillStyle=cc[1];x.beginPath();x.ellipse(sx,sy,r*(.1+R()*.05),r*.07,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.arc(sx-r*.03,sy-r*.02,r*.03,0,7);x.fill()}
  x.strokeStyle='rgba(255,255,255,.4)';x.lineWidth=1.2;x.beginPath();x.ellipse(bx,by-H,cw*.86,cw*.5,0,Math.PI*1.1,Math.PI*1.5);x.stroke();
  if(v<2){const sx=bx+r*.7,sy=by-r*.15;x.fillStyle='#d8e4cc';x.fillRect(sx-r*.04,sy-r*.22,r*.08,r*.24);const g2=x.createLinearGradient(sx-r*.3,sy-r*.4,sx+r*.3,sy-r*.2);g2.addColorStop(0,cc[1]);g2.addColorStop(1,cc[0]);x.fillStyle=g2;x.beginPath();x.ellipse(sx,sy-r*.2,r*.32,r*.18,0,Math.PI,0);x.fill()}
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(bx,by+r*.05,r*.7,r*.2,0,0,7);x.fill()})}
MXTR.s19=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2,H=r*(1.6+v*.25),cw=r*(1.1+(v%2)*.3),sway=Math.sin(T*.8+x)*1.2;
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x+sway,y-H,cw*1.6,v===3?'200,160,255':'120,255,230',.22+.08*Math.sin(T*2+x));g.restore()}mxBlit(mxGiantMushSpr(rr,v),x,y+r*.5,r/rr,sway/(H||1))};

/* ===================== 20 · บึงหมอกม่วง ===================== */
MXC[20]={k:'s20',amp:80,sc:600,lit:[226,210,255],shd:[8,4,18],kl:.24,ks:.32,ao:.5,ff:.08,cs:.24,cla:.06,gw:.6,gwc:'226,206,255',gcc:'20,10,50',base:'s200',ug:'s20',tree:'s20',tby:.5,uby:.5,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'s201',c:f=>mxSS(.62,.69,(1-f.h)*.65+f.m*.35),e:-6,hi:1,rim:[[10,6,20],[200,180,240]],rk:[90,60]},
  {t:'s202',c:f=>mxSS(.62,.7,f.w*.6+f.q*.4),e:0},
  {t:'s203',c:f=>mxSS(.64,.7,f.h*.6+f.m*.4),e:2}]};
MXDC.s20=MXDC.gen;
Object.assign(MXT,{
 s200:B=>{B.fill([46,36,64]);B.blob(48,[110,70,140],[16,10,24],14,48,.14,.28);B.ripple(16,'rgba(200,170,255,.12)','rgba(10,6,20,.18)',22,1,-.2);
   B.ponds(12,12,26,'rgba(30,20,50,.55)','rgba(200,170,255,.16)');B.clumps(24,[[70,56,90],[96,80,116],[130,112,150],[180,166,200]],4,8,{k:5,cr:2.4,w:.9});B.grain(1200,.03,.07)},
 s201:B=>{B.fill([24,16,38]);B.blob(30,[40,30,64],[12,8,22],12,36,.24,.38);B.rings(20,4,14,'rgba(210,190,255,.18)');B.stroke((x,R,W8,S)=>{for(let i=0;i<14;i++){const px=R()*S,py=R()*S,L=10+R()*20;W8(px,py,L,(X,Y)=>{x.strokeStyle='rgba(220,200,255,.14)';x.lineWidth=1;x.beginPath();x.moveTo(X,Y);x.lineTo(X+L,Y-L*.2);x.stroke()})}});B.grain(800,.03,.05)},
 s202:B=>{B.clumps(120,[[60,48,80],[90,74,110],[124,108,146],[176,160,196]],6,12,{k:5,cr:2.6,w:1,ln:2})},
 s203:B=>{B.fill([56,44,74]);B.blob(24,[76,60,96],[40,30,56],10,30,.2,.32);B.gcrack(28,'rgba(20,12,32,.6)',.9,26,0,'rgba(200,180,240,.16)');B.grain(1200,.04,.07)}});
MXU.s20=[()=>mxDSpr('s20u0',14,16,(x,w,h)=>{x.lineCap='round';for(let i=0;i<4;i++){const bx=4+i*2.2,hh=10+i%2*3;x.strokeStyle=i%2?'#5a4a6a':'#3a2e48';x.lineWidth=1.1;x.beginPath();x.moveTo(bx,h-1);x.quadraticCurveTo(bx+1,h-hh*.5,bx+1.6,h-hh);x.stroke();if(i%2===0){x.fillStyle='#6a4a3a';x.beginPath();x.ellipse(bx+1.6,h-hh,1.1,2.6,0,0,7);x.fill()}}}),
  ()=>mxTuftSpr('s20u1',[[40,30,56],[70,56,92],[110,96,136]],9,5,201),()=>mxStoneSpr('s20u2',[80,66,104],6,4.4,{sharp:1})];
MXNS.s20={rim:[52,40,70],sp:[224,200,255],gl:'200,150,255'};
function mxSwampTreeSpr(r,v){return mxSprite('swt'+r+'|'+v,r*3,r*4.2,r*1.5,r*4.2-r*.7,(x,w,h)=>{const bx=r*1.5,B0=h-r*.7,by=B0-r*.5,R=gxRng(r*19+v*7);
  x.fillStyle='rgba(90,60,120,.5)';x.beginPath();x.ellipse(bx,B0,r*.9,r*.25,0,0,7);x.fill();x.fillStyle='rgba(200,170,255,.18)';x.beginPath();x.ellipse(bx-r*.2,B0-r*.05,r*.5,r*.08,0,0,7);x.fill();
  const tg=x.createLinearGradient(bx-r*.4,0,bx+r*.4,0);tg.addColorStop(0,'#4e4060');tg.addColorStop(.4,'#2e2438');tg.addColorStop(1,'#140e1c');x.fillStyle=tg;x.beginPath();x.moveTo(bx-r*.42,B0);x.quadraticCurveTo(bx-r*.3,by-r*.4,bx-r*.18,by-r*1.6);x.lineTo(bx+r*.18,by-r*1.6);x.quadraticCurveTo(bx+r*.28,by-r*.4,bx+r*.42,B0);x.closePath();x.fill();x.strokeStyle='#0e0a14';x.lineWidth=1;x.stroke();
  x.strokeStyle='rgba(10,6,16,.5)';x.lineWidth=.7;for(let i=0;i<4;i++){x.beginPath();x.moveTo(bx-r*.25+i*r*.14,B0-1);x.quadraticCurveTo(bx-r*.2+i*r*.12,by-r*.8,bx-r*.12+i*r*.08,by-r*1.5);x.stroke()}
  x.lineCap='round';const br=(x0,y0,x1,y1,wd)=>{x.strokeStyle='#140e1c';x.lineWidth=wd+1.2;x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.stroke();x.strokeStyle='#2e2438';x.lineWidth=wd;x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.stroke();x.strokeStyle='rgba(180,160,210,.22)';x.lineWidth=wd*.3;x.beginPath();x.moveTo(x0-wd*.2,y0);x.lineTo(x1-wd*.2,y1);x.stroke()};
  br(bx,by-r*1.4,bx-r*1.0,by-r*2.1,3);br(bx,by-r*1.2,bx+r*1.1,by-r*1.9,3);br(bx-r*.6,by-r*1.8,bx-r*.8,by-r*2.5,2);br(bx+r*.7,by-r*1.65,bx+r*.95,by-r*2.2,1.6);br(bx-r*.2,by-r*1.55,bx-r*.1,by-r*2.3,1.8);
  for(const[ax,ay]of[[-r*.9,-r*2.0],[r*1.0,-r*1.85],[-r*.3,-r*1.6],[r*.5,-r*1.75]]){for(let k=0;k<4;k++){const L=r*(.45+R()*.4);x.strokeStyle=k%2?'rgba(140,170,120,.75)':'rgba(110,140,100,.7)';x.lineWidth=1.1;x.beginPath();x.moveTo(bx+ax+k*1.8,by+ay);x.quadraticCurveTo(bx+ax+k*1.8+1.2,by+ay+L*.5,bx+ax+k*1.8+(R()-.5)*2,by+ay+L);x.stroke()}}})}
MXTR.s20=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000;
  if(v===3){g.lineCap='round';for(let i=0;i<9;i++){const bx=x-r*.6+i*r*.15,h=r*(.9+((i*7)%5)*.15),s1=Math.sin(T+i)*2,s2=Math.sin(T*.8+i)*3;g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2.2;g.beginPath();g.moveTo(bx+1,y+r*.4+1);g.quadraticCurveTo(bx+s1+1,y-h*.5,bx+s2+1,y-h);g.stroke();
      g.strokeStyle=i%2?'#5a4a6a':'#3a2e48';g.lineWidth=1.6;g.beginPath();g.moveTo(bx,y+r*.4);g.quadraticCurveTo(bx+s1,y-h*.5,bx+s2,y-h);g.stroke();g.strokeStyle='rgba(200,180,230,.35)';g.lineWidth=.5;g.beginPath();g.moveTo(bx-.4,y+r*.3);g.quadraticCurveTo(bx+s1-.4,y-h*.5,bx+s2-.4,y-h);g.stroke();
      if(i%3===0){const gr=g.createLinearGradient(bx+s2-1.6,0,bx+s2+1.6,0);gr.addColorStop(0,'#8a6450');gr.addColorStop(1,'#4a2e22');g.fillStyle=gr;g.beginPath();g.ellipse(bx+s2,y-h,1.7,4.2,0,0,7);g.fill()}}g.lineCap='butt';return}
  const rr=Math.round(r/2)*2;mxBlit(mxSwampTreeSpr(rr,v),x,y+r*.5,r/rr,Math.sin(T*.6+x)*.008)};

/* ===================== 21 · ซากนครใต้เมฆ (แผ่นหินเก่า 56) ===================== */
MXC[21]={k:'s21',amp:80,sc:600,lit:[232,232,255],shd:[6,6,16],kl:.24,ks:.32,ao:.5,ff:.06,cs:.2,cla:.05,gw:.6,gwc:'230,230,255',gcc:'10,10,40',base:'s210',ug:'s21',tree:'s21',tby:.45,uby:.48,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'s211',c:f=>mxSS(.64,.7,f.h*.6+f.q*.4),e:2},
  {t:'s212',c:f=>mxSS(.62,.7,f.w*.6+f.m*.4),e:0},
  {t:'s213',c:f=>mxSS(.63,.7,(1-f.h)*.6+f.m*.4),e:-4}]};
MXDC.s21=MXDC.gen;
Object.assign(MXT,{
 s210:B=>{B.fill([22,22,30]);B.bricks(56,[66,68,82],[52,54,66],{jw:1.3,bev:.14,var:12,chip:.12,crk:.25,rad:1.8});B.blob(28,[120,120,150],[14,14,20],12,40,.08,.18);B.gcrack(12,'rgba(10,10,16,.6)',1.1,34,0,'rgba(220,220,255,.12)');
   B.stroke((x,R,W8,S)=>{for(let i=0;i<40;i++){const px=R()*S,py=R()*S,w=2+R()*3,h=1.5+R()*2;W8(px,py,6,(X,Y)=>{x.fillStyle='rgba(0,0,0,.3)';x.fillRect(X+.5,Y+.6,w,h);x.fillStyle='rgba(160,160,180,.65)';x.fillRect(X,Y,w,h);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(X,Y,w,.5)})}});
   B.blob(10,[170,200,220],[150,180,200],8,20,.08,.14);B.grain(1200,.03,.07)},
 s211:B=>{B.fill([18,18,26]);B.bricks(56,[60,62,76],[46,48,60],{jw:1.6,bev:.12,var:16,chip:.45,crk:.7,rad:1.4});B.peb(60,[64,66,80],[110,112,130],.8,2.6,.34);B.shard(30,[60,62,76],[100,102,120],1,2.8,.3);B.grain(1200,.04,.07)},
 s212:B=>{B.blob(30,[150,180,200],[120,150,170],4,12,.22,.4);B.speck(70,[[180,210,226],[150,180,200]],.5,1.3,.6);B.clumps(30,[[60,80,90],[90,120,130],[150,180,190]],2,4,{k:4,cr:2,w:.7})},
 s213:B=>{B.ponds(12,10,24,'rgba(40,46,70,.42)','rgba(220,220,255,.2)');B.rings(14,4,12,'rgba(220,220,255,.16)')}});
MXU.s21=[()=>mxStoneSpr('s21u0',[96,98,112],7,5,{sharp:1}),()=>mxStoneSpr('s21u1',[80,82,96],5,3.6,{sharp:1}),()=>mxTuftSpr('s21u2',[[40,52,58],[66,86,94],[120,150,160]],8,5,211)];
MXNS.s21={rim:[56,58,70],sp:[216,216,240],gl:'190,190,255'};
function mxCityPillarSpr(r,v){return mxSprite('cpl'+r+'|'+v,r*2.6,r*3.8,r*1,r*3.8-r*.85,(x,w,h)=>{const bx=r,by=h-r*.85,R=gxRng(r*29+v*5),H=r*(1.4+v*.35);
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(bx+r*.2,by+r*.62,r*.8,r*.2,0,0,7);x.fill();
  const body=x.createLinearGradient(bx-r*.42,0,bx+r*.42,0);body.addColorStop(0,'#8a8a9c');body.addColorStop(.35,'#6a6a7a');body.addColorStop(.7,'#545466');body.addColorStop(1,'#3a3a48');x.fillStyle=body;x.fillRect(bx-r*.42,by-H,r*.84,H+r*.5);
  for(let k=1;k<4;k++){const yy=by-H+k*H/4;x.strokeStyle='rgba(20,20,30,.55)';x.lineWidth=1;x.beginPath();x.moveTo(bx-r*.42,yy);x.lineTo(bx+r*.42,yy);x.stroke();x.strokeStyle='rgba(255,255,255,.14)';x.beginPath();x.moveTo(bx-r*.42,yy+1);x.lineTo(bx+r*.42,yy+1);x.stroke();if(R()<.6){x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.moveTo(bx+r*.42,yy);x.lineTo(bx+r*.42-r*.12,yy);x.lineTo(bx+r*.42,yy+r*.14);x.closePath();x.fill()}}
  x.strokeStyle='#0e0a14';x.lineWidth=1;x.strokeRect(bx-r*.42,by-H,r*.84,H+r*.5);
  const top=x.createLinearGradient(0,by-H-r*.35,0,by-H);top.addColorStop(0,'#9a9aac');top.addColorStop(1,'#6a6a7a');x.fillStyle=top;x.beginPath();x.moveTo(bx-r*.55,by-H);x.lineTo(bx-r*.2,by-H-r*.35);x.lineTo(bx+r*.1,by-H-r*.1);x.lineTo(bx+r*.55,by-H-r*.28);x.lineTo(bx+r*.55,by-H);x.closePath();x.fill();x.stroke();
  const ft=x.createLinearGradient(0,by+r*.35,0,by+r*.6);ft.addColorStop(0,'#7a7a8a');ft.addColorStop(1,'#46465a');x.fillStyle=ft;x.fillRect(bx-r*.55,by+r*.35,r*1.1,r*.25);x.strokeRect(bx-r*.55,by+r*.35,r*1.1,r*.25);
  x.fillStyle='rgba(150,180,200,.45)';for(let i=0;i<6;i++){x.beginPath();x.ellipse(bx-r*.35+R()*r*.3,by+r*.3-R()*H*.6,r*.07,r*.05,0,0,7);x.fill()}
  if(v<2){x.save();x.translate(bx+r*.9,by+r*.45);x.rotate(.3);const fg=x.createLinearGradient(-r*.32,-r*.18,r*.32,r*.18);fg.addColorStop(0,'#8a8a9c');fg.addColorStop(1,'#46465a');x.fillStyle=fg;x.beginPath();x.ellipse(0,0,r*.32,r*.18,0,0,7);x.fill();x.strokeStyle='#0e0a14';x.stroke();x.restore()}})}
MXTR.s21=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2,H=r*(1.4+v*.35);mxBlit(mxCityPillarSpr(rr,v),x,y,r/rr,0);
  if(v===2){if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-H*.5,r*.6,'190,190,255',.35+.15*Math.sin(T*2+x));g.restore()}g.fillStyle='rgba(220,220,255,.85)';g.font='bold 8px system-ui';g.textAlign='center';g.fillText('✦',x,y-H*.45)}};

/* ===================== 22 · ห้วงบัลลังก์เงา (ออบซิเดียน + รอยร้าวม่วง + ใยเงา) ===================== */
MXC[22]={k:'s22',amp:80,sc:600,lit:[236,210,255],shd:[4,2,10],kl:.22,ks:.34,ao:.5,ff:.06,cs:.2,cla:0,gw:.5,gwc:'230,200,255',gcc:'10,0,30',base:'s220',ug:'s22',tree:'s22',tby:.45,uby:.48,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'s221',c:f=>mxSS(.62,.69,(1-f.h)*.6+f.m*.4),e:-6},
  {t:'s222',c:f=>mxSS(.64,.7,f.w*.6+f.m*.4),e:0},
  {t:'s223',c:f=>mxSS(.65,.71,f.h*.6+f.q*.4),e:3}]};
MXDC.s22=MXDC.gen;
Object.assign(MXT,{
 s220:B=>{B.fill([28,20,40]);B.blob(40,[70,30,110],[4,2,10],12,44,.16,.3);B.plates(12,10,24,'rgba(70,50,100,.32)','rgba(12,8,20,.4)','rgba(0,0,0,.6)','rgba(220,180,255,.16)',.62);
   B.gcrack(16,'rgba(200,110,255,.62)',1.1,40,'rgba(170,80,255,.14)');B.webs(14,'rgba(220,190,255,.16)');B.sparks(40,['rgba(220,150,255,.7)','rgba(255,220,255,.5)'],.7,1.3);B.grain(900,.03,.06)},
 s221:B=>{B.fill([14,10,22]);B.blob(30,[30,20,48],[6,4,12],10,30,.26,.4);B.sparks(110,['rgba(255,220,255,.55)','rgba(180,170,255,.4)'],.5,.9);B.grain(700,.03,.05)},
 s222:B=>{B.gcrack(22,'rgba(220,130,255,.75)',1,30,'rgba(180,90,255,.18)');B.glowdots(10,['220,140,255'],.8,1.4)},
 s223:B=>{B.shards(40,4,10,'rgba(200,140,255,.62)','rgba(10,4,20,.5)')}});
MXU.s22=[()=>mxStoneSpr('s22u0',[46,34,64],6,4.4,{sharp:1}),()=>mxDSpr('s22u1',10,12,(x,w,h)=>{x.fillStyle='rgba(6,2,16,.4)';x.beginPath();x.ellipse(5.6,10.6,3.6,1,0,0,7);x.fill();x.fillStyle='#d8a0ff';x.beginPath();x.moveTo(3,10.4);x.lineTo(4.6,2);x.lineTo(6.4,10.4);x.closePath();x.fill();x.fillStyle='#7a40b0';x.beginPath();x.moveTo(4.6,2);x.lineTo(6.4,10.4);x.lineTo(5,10.4);x.closePath();x.fill()})];
MXNS.s22={rim:[40,28,58],sp:[224,176,255],gl:'200,120,255'};
function mxObsSpireSpr(r,v){return mxSprite('obs'+r+'|'+v,r*3.2,r*3.6,r*1.6,r*3.6-r*.65,(x,w,h)=>{const bx=r*1.6,by=h-r*.65,H=r*(1.8+v*.3),R=gxRng(r*43+v*7);
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(bx+r*.15,by+r*.5,r*.75,r*.2,0,0,7);x.fill();
  const A=[[bx-r*.5,by+r*.5],[bx-r*.3,by-H*.6],[bx-r*.05,by-H],[bx+r*.25,by-H*.7],[bx+r*.5,by+r*.5]],pth=Q=>{x.beginPath();Q.forEach(([u,q],i)=>i?x.lineTo(u,q):x.moveTo(u,q));x.closePath()};
  let gr=x.createLinearGradient(bx-r*.5,by-H,bx+r*.2,by);gr.addColorStop(0,'#3a2a52');gr.addColorStop(.5,'#1a1226');gr.addColorStop(1,'#0e0818');x.fillStyle=gr;pth(A);x.fill();
  gr=x.createLinearGradient(bx,0,bx+r*.5,0);gr.addColorStop(0,'#4a3a68');gr.addColorStop(1,'#241a36');x.fillStyle=gr;pth([[bx-r*.05,by-H],[bx+r*.25,by-H*.7],[bx+r*.5,by+r*.5],[bx+r*.1,by+r*.5]]);x.fill();
  x.strokeStyle='#060410';x.lineWidth=1;pth(A);x.stroke();x.strokeStyle='rgba(230,200,255,.45)';x.lineWidth=1.1;x.beginPath();x.moveTo(bx-r*.45,by+r*.4);x.lineTo(bx-r*.27,by-H*.6);x.lineTo(bx-r*.05,by-H+2);x.stroke();
  x.fillStyle='rgba(255,255,255,.12)';x.beginPath();x.moveTo(bx-r*.3,by-H*.55);x.lineTo(bx-r*.1,by-H*.9);x.lineTo(bx-r*.15,by-H*.4);x.closePath();x.fill();
  if(v<2){x.strokeStyle='rgba(225,200,255,.38)';x.lineWidth=.8;const ax=bx+r*(v?1.3:-1.3),ay=by-H*.4;for(let k=0;k<5;k++){x.beginPath();x.moveTo(bx+r*(v?.2:-.2),by-H*(.3+k*.1));x.quadraticCurveTo((bx+ax)/2,by-H*(.3+k*.1)+r*.15,ax,ay+k*r*.25);x.stroke()}x.lineWidth=.4;for(let k=1;k<4;k++){x.beginPath();x.moveTo(bx+r*(v?.5:-.5)+(v?k:-k)*r*.25,by-H*.48);x.lineTo(bx+r*(v?.5:-.5)+(v?k:-k)*r*.25,by-H*.12);x.stroke()}}
  for(let i=0;i<4;i++)mxRockMini(x,bx+r*(.55+R()*.3)*(R()<.5?-1:1),by+r*.5,1.4+R()*1.8,[46,34,66])})}
MXTR.s22=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2,H=r*(1.8+v*.3);mxBlit(mxObsSpireSpr(rr,v),x,y,r/rr,0);
  g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,120,255,'+(.55+.25*Math.sin(T*2+x))+')';g.lineWidth=1.2;g.beginPath();g.moveTo(x-r*.15,y+r*.3);g.lineTo(x-r*.05,y-H*.3);g.lineTo(x+r*.1,y-H*.55);g.stroke();if(!LOWQ)glowAt(x,y-H*.3,r*.6,'200,120,255',.14+.06*Math.sin(T*2+x));g.restore()};

/* ===================== 23 · โพรงรากหิน ===================== */
MXC[23]={k:'r23',amp:90,sc:600,lit:[255,226,170],shd:[12,6,2],kl:.26,ks:.34,ao:.55,ff:.08,cs:.22,cla:0,gw:.7,gwc:'255,210,150',gcc:'30,14,10',base:'r230',ug:'r23',tree:'r23',tby:.5,uby:.5,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'r231',c:f=>mxSS(.62,.7,f.w*.6+f.m*.4),e:2},
  {t:'r232',c:f=>mxSS(.65,.71,f.q*.6+(1-f.h)*.4),e:-3},
  {t:'r233',c:f=>mxSS(.63,.7,f.h*.6+f.q*.4),e:3}]};
MXDC.r23=MXDC.gen;
Object.assign(MXT,{
 r230:B=>{B.fill([62,46,30]);B.blob(48,[110,80,50],[14,10,6],12,44,.16,.3);B.gcrack(10,'rgba(20,10,4,.6)',1.2,36,0,'rgba(240,200,150,.14)');B.roots(10,1.6,3,20,50,'#24140a','rgba(220,170,110,.2)');
   B.peb(40,[80,62,44],[130,106,76],.7,2,.3);B.glowdots(22,['255,190,90'],.6,1.1);B.grain(1400,.04,.07)},
 r231:B=>{B.roots(26,1.4,3.2,16,44,'#22130a','rgba(220,170,110,.22)');B.roots(16,.8,1.6,8,20,'#3a2414','rgba(220,170,110,.2)')},
 r232:B=>{B.ponds(10,6,14,'rgba(160,100,20,.55)','rgba(255,230,140,.4)');B.glowdots(26,['255,200,100'],.7,1.3)},
 r233:B=>{B.peb(220,[70,54,38],[130,106,78],.6,2.2,.34);B.shard(60,[80,62,44],[130,106,76],.9,2.4,.3)}});
MXU.r23=[()=>mxStoneSpr('r23u0',[110,86,58],7,5,{sharp:1}),()=>mxDSpr('r23u1',18,10,(x,w,h)=>{x.lineCap='round';x.strokeStyle='#24140a';x.lineWidth=2;x.beginPath();x.moveTo(1,8);x.quadraticCurveTo(7,2,17,6);x.stroke();x.strokeStyle='rgba(220,170,110,.3)';x.lineWidth=.6;x.beginPath();x.moveTo(1.5,7.3);x.quadraticCurveTo(7,1.4,16.6,5.3);x.stroke()}),()=>mxTuftSpr('r23u2',[[50,40,24],[80,66,40],[120,104,66]],8,5,231)];
MXNS.r23={rim:[70,52,32],sp:[255,208,128],gl:'255,170,60'};
function mxRootPillarSpr(r,v){return mxSprite('rpl'+r+'|'+v,r*2.4,r*3.4,r*1.2,r*3.4-r*.75,(x,w,h)=>{const bx=r*1.2,by=h-r*.75,H=r*(1.5+v*.3),R=gxRng(r*31+v*3),O='#0c0806';
  x.fillStyle='rgba(0,0,0,.32)';x.beginPath();x.ellipse(bx,by+r*.55,r*.95,r*.3,0,0,7);x.fill();
  let gr=x.createLinearGradient(bx-r*.55,0,bx+r*.55,0);gr.addColorStop(0,'#7a6448');gr.addColorStop(.45,'#5a4834');gr.addColorStop(1,'#3a2c1e');x.fillStyle=gr;x.beginPath();x.moveTo(bx-r*.55,by+r*.5);x.lineTo(bx-r*.35,by-H);x.lineTo(bx+r*.3,by-H*1.05);x.lineTo(bx+r*.55,by+r*.5);x.closePath();x.fill();x.strokeStyle=O;x.lineWidth=1;x.stroke();
  x.fillStyle='rgba(30,20,10,.45)';x.beginPath();x.moveTo(bx+r*.05,by-H*1.03);x.lineTo(bx+r*.3,by-H*1.05);x.lineTo(bx+r*.55,by+r*.5);x.lineTo(bx+r*.15,by+r*.5);x.closePath();x.fill();
  for(let i=1;i<5;i++){const yy=by-H*i/5;x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=.9;x.beginPath();x.moveTo(bx-r*.5,yy+1);x.lineTo(bx+r*.5,yy+1);x.stroke();x.strokeStyle='rgba(255,220,170,.14)';x.beginPath();x.moveTo(bx-r*.5,yy);x.lineTo(bx+r*.5,yy);x.stroke()}
  x.lineCap='round';for(let k=0;k<3;k++){const sg=k%2?1:-1,P=[bx+sg*r*.6,by+r*.5,bx-sg*r*.7,by-H*.3,bx+sg*r*.7,by-H*.55,bx-sg*r*.2,by-H*(.8+k*.07)];x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=3.6-k*.5;x.beginPath();x.moveTo(P[0]+1,P[1]+1);x.bezierCurveTo(P[2]+1,P[3]+1,P[4]+1,P[5]+1,P[6]+1,P[7]+1);x.stroke();
    x.strokeStyle='#24140a';x.lineWidth=2.8-k*.5;x.beginPath();x.moveTo(P[0],P[1]);x.bezierCurveTo(P[2],P[3],P[4],P[5],P[6],P[7]);x.stroke();x.strokeStyle='rgba(200,150,100,.35)';x.lineWidth=.8;x.beginPath();x.moveTo(P[0]-.6,P[1]-.8);x.bezierCurveTo(P[2]-.6,P[3]-.8,P[4]-.6,P[5]-.8,P[6]-.6,P[7]-.8);x.stroke()}
  for(let i=0;i<4;i++)mxRockMini(x,bx+r*(.6+R()*.4)*(R()<.5?-1:1),by+r*.5,1.4+R()*1.8,[110,86,58])})}
MXTR.r23=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2,H=r*(1.5+v*.3);mxBlit(mxRootPillarSpr(rr,v),x,y,r/rr,0);
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-H*.4,r*.5,'255,170,60',.25+.1*Math.sin(T*2+x));g.restore()}const gr=g.createRadialGradient(x-r*.12,y-H*.42,.4,x-r*.1,y-H*.4,r*.12);gr.addColorStop(0,'#fff0b0');gr.addColorStop(1,'rgba(255,170,60,.9)');g.fillStyle=gr;g.beginPath();g.ellipse(x-r*.1,y-H*.4,r*.07,r*.12,0,0,7);g.fill()};

/* ===================== 24 · ทะเลสาบใต้ดินเรืองแสง ===================== */
MXC[24]={k:'r24',amp:80,sc:600,lit:[190,240,255],shd:[2,6,12],kl:.24,ks:.34,ao:.55,ff:.06,cs:.2,cla:0,gw:.6,gwc:'190,236,255',gcc:'4,10,40',base:'r240',ug:'r24',tree:'r24',tby:.45,uby:.48,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'r241',c:f=>mxSS(.67,.73,(1-f.h)*.6+f.m*.4),e:-5,hi:1,rim:[[4,10,20],[160,230,255]],rk:[80,60]},
  {t:'r242',c:f=>mxSS(.63,.7,f.w*.6+f.m*.4),e:0},
  {t:'r243',c:f=>mxSS(.65,.71,f.h*.6+f.q*.4),e:3}]};
MXDC.r24=MXDC.gen;
Object.assign(MXT,{
 r240:B=>{B.fill([16,32,46]);B.blob(48,[40,90,130],[4,10,18],14,48,.16,.3);B.plates(12,10,24,'rgba(50,80,110,.4)','rgba(8,16,26,.45)','rgba(0,4,10,.6)','rgba(180,230,255,.16)',.65);
   B.ponds(9,14,30,'rgba(20,80,120,.55)','rgba(140,230,255,.22)');B.glowdots(30,['150,240,255','180,190,255'],.6,1.2);B.stroke((x,R,W8,S)=>{for(let i=0;i<20;i++){const px=R()*S,py=R()*S,L=6+R()*12;W8(px,py,L,(X,Y)=>{x.strokeStyle='rgba(200,240,255,.12)';x.lineWidth=1.2;x.beginPath();x.moveTo(X,Y);x.lineTo(X+L,Y-L*.3);x.stroke()})}});B.grain(1000,.03,.06)},
 r241:B=>{B.fill([12,50,76]);B.blob(30,[30,100,140],[8,30,50],10,30,.24,.38);B.rings(18,5,14,'rgba(160,230,255,.22)');B.glowdots(20,['140,240,255'],.5,1);B.grain(600,.03,.05)},
 r242:B=>{B.carpet(1200,[[16,60,70],[24,90,100],[40,130,140],[90,200,210]],1.4,3,{per:9,cr:6,w:.8,hv:.4,tip:[180,250,255]});B.glowdots(30,['120,240,255'],.5,1)},
 r243:B=>{B.shards(40,4,10,'rgba(150,220,255,.7)','rgba(2,8,20,.5)')}});
MXU.r24=[()=>mxStoneSpr('r24u0',[50,80,106],6,4.4,{sharp:1}),()=>mxDSpr('r24u1',10,12,(x,w,h)=>{x.fillStyle='rgba(2,8,20,.4)';x.beginPath();x.ellipse(5.6,10.6,3.6,1,0,0,7);x.fill();x.fillStyle='#a0f0ff';x.beginPath();x.moveTo(3,10.4);x.lineTo(4.6,2);x.lineTo(6.4,10.4);x.closePath();x.fill();x.fillStyle='#3a8ab0';x.beginPath();x.moveTo(4.6,2);x.lineTo(6.4,10.4);x.lineTo(5,10.4);x.closePath();x.fill()})];
MXNS.r24={rim:[30,50,70],sp:[170,240,255],gl:'120,220,255'};
function mxCaveCrystalSpr(r,v){return mxSprite('ccr'+r+'|'+v,r*2.4,r*3.2,r*1.2,r*3.2-r*.6,(x,w,h)=>{const bx=r*1.2,by=h-r*.6,H=r*(1.3+v*.35),c=v%2?['#5ac8f0','#d0f8ff','#2a6a9a']:['#7a8af0','#e0e4ff','#3a46a0'],R=gxRng(r*13+v);
  x.fillStyle='rgba(0,4,12,.4)';x.beginPath();x.ellipse(bx,by+r*.42,r*.8,r*.22,0,0,7);x.fill();
  for(const[dx,hh,ww]of[[-r*.35,.65,.25],[r*.3,.75,.22],[0,1,.32]]){const X=bx+dx,top=by-H*hh,W=r*ww;
    let gr=x.createLinearGradient(X-W,0,X+W,0);gr.addColorStop(0,c[1]);gr.addColorStop(.45,c[0]);gr.addColorStop(1,c[2]);x.fillStyle=gr;x.beginPath();x.moveTo(X-W,by+r*.4);x.lineTo(X-W*.6,top+r*.2);x.lineTo(X,top);x.lineTo(X+W*.6,top+r*.2);x.lineTo(X+W,by+r*.4);x.closePath();x.fill();x.strokeStyle='#0a1a2a';x.lineWidth=1;x.stroke();
    x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.moveTo(X-W*.3,by+r*.2);x.lineTo(X-W*.2,top+r*.3);x.lineTo(X,top+r*.1);x.closePath();x.fill();x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=.6;x.beginPath();x.moveTo(X,top+2);x.lineTo(X+W*.1,by+r*.35);x.stroke()}
  for(let i=0;i<3;i++)mxRockMini(x,bx+r*(.55+R()*.3)*(R()<.5?-1:1),by+r*.42,1.4+R()*1.6,[50,80,106])})}
MXTR.r24=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2,H=r*(1.3+v*.35);if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-H*.5,r*1.2,v%2?'120,220,255':'150,160,255',.2+.08*Math.sin(T*1.5+x));g.restore()}mxBlit(mxCaveCrystalSpr(rr,v),x,y,r/rr,0)};

/* ===================== 25 · สุสานอัศวินร้อยดวง (พื้นหิน 52) ===================== */
MXC[25]={k:'r25',amp:80,sc:600,lit:[220,236,255],shd:[4,6,12],kl:.24,ks:.32,ao:.5,ff:.06,cs:.2,cla:.04,gw:.55,gwc:'210,230,255',gcc:'10,14,40',base:'r250',ug:'r25',tree:'r25',tby:.45,uby:.48,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'r251',c:f=>mxSS(.62,.7,f.w*.6+f.m*.4),e:0},
  {t:'r252',c:f=>mxSS(.64,.7,f.h*.6+f.q*.4),e:2},
  {t:'r253',c:f=>mxSS(.63,.7,(1-f.h)*.6+f.m*.4),e:-3}]};
MXDC.r25=MXDC.gen;
Object.assign(MXT,{
 r250:B=>{B.fill([16,18,24]);B.bricks(52,[58,60,68],[44,46,54],{jw:1.3,bev:.14,var:12,chip:.12,crk:.25,rad:1.8});B.blob(28,[110,120,140],[10,12,16],12,40,.08,.18);B.gcrack(10,'rgba(8,10,14,.6)',1,32,0,'rgba(220,230,255,.1)');
   B.bones(5,2.4,4.4);B.glowdots(14,['160,210,255'],.7,1.2);B.grain(1200,.03,.07)},
 r251:B=>{B.clumps(70,[[44,48,40],[64,70,58],[94,100,82],[140,146,120]],3,6,{k:5,cr:2.8,w:.85});B.speck(40,[[80,110,70]],.5,1.2,.6)},
 r252:B=>{B.fill([14,16,22]);B.bricks(52,[54,56,64],[40,42,50],{jw:1.6,bev:.12,var:16,chip:.45,crk:.7,rad:1.4});B.peb(60,[56,58,66],[100,104,114],.8,2.4,.34);B.bones(6,2,3.6);B.grain(1200,.04,.07)},
 r253:B=>{B.glowdots(26,['170,220,255','200,230,255'],.6,1.2);B.blob(12,[150,190,230],[120,160,210],8,20,.08,.14)}});
MXU.r25=[()=>mxStoneSpr('r25u0',[90,94,104],7,5,{sharp:1}),()=>mxTuftSpr('r25u1',[[36,40,34],[60,66,54],[100,106,88]],9,5,251),()=>mxDSpr('r25u2',16,8,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(9,6,6.5,1.5,0,0,7);x.fill();x.save();x.translate(8,4);x.rotate(-.2);x.fillStyle='#d8d2c0';x.fillRect(-5,-.9,10,1.8);x.beginPath();x.arc(-5,-.5,1.4,0,7);x.arc(-5,.6,1.4,0,7);x.arc(5,-.5,1.4,0,7);x.arc(5,.6,1.4,0,7);x.fill();x.restore()})];
MXNS.r25={rim:[50,54,62],sp:[208,232,255],gl:'150,210,255',bone:[220,214,200]};
function mxKnightGraveSpr(r,v){return mxSprite('kgv'+r+'|'+v,r*1.6,r*2.4,r*.8,r*2.4-r*.7,(x,w,h)=>{const bx=r*.8,by=h-r*.7,R=gxRng(r*7+v);
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(bx+r*.15,by+r*.48,r*.6,r*.16,0,0,7);x.fill();
  const gr=x.createLinearGradient(bx-r*.45,0,bx+r*.45,0);gr.addColorStop(0,'#9a9eaa');gr.addColorStop(.4,'#6a6e78');gr.addColorStop(1,'#3e424c');x.fillStyle=gr;x.beginPath();x.moveTo(bx-r*.45,by+r*.45);x.lineTo(bx-r*.45,by-r*.6);x.quadraticCurveTo(bx,by-r*1.2,bx+r*.45,by-r*.6);x.lineTo(bx+r*.45,by+r*.45);x.closePath();x.fill();x.strokeStyle='#0c0806';x.lineWidth=1;x.stroke();
  x.strokeStyle='rgba(255,255,255,.22)';x.lineWidth=1;x.beginPath();x.moveTo(bx-r*.38,by+r*.4);x.lineTo(bx-r*.38,by-r*.58);x.quadraticCurveTo(bx-r*.1,by-r*.98,bx+r*.1,by-r*.94);x.stroke();
  x.strokeStyle='#2a2e38';x.lineWidth=2;x.beginPath();x.moveTo(bx,by-r*.75);x.lineTo(bx,by-r*.1);x.moveTo(bx-r*.2,by-r*.5);x.lineTo(bx+r*.2,by-r*.5);x.stroke();x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=.6;x.beginPath();x.moveTo(bx+1,by-r*.75);x.lineTo(bx+1,by-r*.1);x.stroke();
  x.strokeStyle='rgba(10,10,14,.5)';x.lineWidth=.6;x.beginPath();x.moveTo(bx+r*.2,by-r*.2);x.lineTo(bx+r*.3,by+r*.05);x.lineTo(bx+r*.24,by+r*.3);x.stroke();
  x.strokeStyle='#2a1a0e';x.lineWidth=1.6;x.beginPath();x.moveTo(bx-r*.5,by+r*.4);x.quadraticCurveTo(bx-r*.2,by-r*.2,bx-r*.45,by-r*.55);x.stroke();x.fillStyle='#4a6a3a';for(let i=0;i<5;i++){x.beginPath();x.ellipse(bx-r*(.48-i*.02),by+r*(.3-i*.18),r*.06,r*.035,.6,0,7);x.fill()}
  x.fillStyle='rgba(80,110,70,.7)';x.beginPath();x.ellipse(bx-r*.25,by+r*.45,r*.3,r*.08,0,0,7);x.fill()})}
function mxSwordGraveSpr(r,v){return mxSprite('sgv'+r+'|'+v,r*1.4,r*2.8,r*.7,r*2.8-r*.7,(x,w,h)=>{const bx=r*.7,by=h-r*.7,H=r*(1.4+(v-2)*.3);
  x.fillStyle='#2a2e38';x.beginPath();x.ellipse(bx,by+r*.4,r*.6,r*.2,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.12)';x.beginPath();x.ellipse(bx-r*.15,by+r*.35,r*.3,r*.07,0,0,7);x.fill();
  const bl=x.createLinearGradient(bx-r*.08,0,bx+r*.08,0);bl.addColorStop(0,'#f0f6ff');bl.addColorStop(.5,'#b8c4d4');bl.addColorStop(1,'#6a7484');x.fillStyle=bl;x.beginPath();x.moveTo(bx-r*.08,by+r*.35);x.lineTo(bx-r*.08,by-H);x.lineTo(bx,by-H-r*.2);x.lineTo(bx+r*.08,by-H);x.lineTo(bx+r*.08,by+r*.35);x.closePath();x.fill();x.strokeStyle='#0c0806';x.lineWidth=1;x.stroke();
  x.strokeStyle='rgba(60,70,90,.5)';x.lineWidth=.5;x.beginPath();x.moveTo(bx,by+r*.3);x.lineTo(bx,by-H);x.stroke();
  const gd=x.createLinearGradient(0,by+r*.05,0,by+r*.17);gd.addColorStop(0,'#a08060');gd.addColorStop(1,'#4a3a2a');x.fillStyle=gd;x.fillRect(bx-r*.35,by+r*.05,r*.7,r*.12);x.fillStyle='#6a5a4a';x.fillRect(bx-r*.06,by+r*.17,r*.12,r*.3);x.fillStyle='rgba(200,170,120,.4)';x.fillRect(bx-r*.35,by+r*.05,r*.7,r*.03)})}
MXTR.r25=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2;if(v<2){mxBlit(mxKnightGraveSpr(rr,v),x,y,r/rr,0);return}
  const H=r*(1.4+(v-2)*.3);mxBlit(mxSwordGraveSpr(rr,v),x,y,r/rr,0);if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-H*.6,r*.6,'150,210,255',.18+.1*Math.sin(T*2+x));g.restore()}};

/* ===================== 26 · แกนพิภพ (หินร้อน + ลาวาในรอยแตก) ===================== */
MXC[26]={k:'r26',amp:100,sc:560,lit:[255,196,150],shd:[18,4,2],kl:.26,ks:.34,ao:.55,ff:.06,cs:.2,cla:0,gw:.7,gwc:'255,170,110',gcc:'40,10,30',base:'r260',ug:'r26',tree:'r26',tby:.45,uby:.48,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'r262',c:f=>mxSS(.64,.7,f.w*.6+f.m*.4)*(1-mxSS(.5,.62,f.h)),e:-3}]};
MXDC.r26=MXDC.gen;
Object.assign(MXT,{
 r260:B=>{B.fill([58,26,16]);B.blob(40,[90,30,16],[10,2,0],12,44,.18,.32);B.plates(12,10,24,'rgba(110,50,30,.45)','rgba(30,10,6,.5)','rgba(8,2,0,.8)','rgba(255,190,140,.14)');
   B.gcrack(18,'rgba(255,124,44,.7)',1.2,42,'rgba(255,90,30,.16)');B.gcrack(8,'rgba(0,0,0,.6)',1.1,40);B.sparks(60,['rgba(255,170,70,.7)','rgba(255,220,120,.5)'],.8,1.5);B.grain(1200,.03,.07)},
 r261:B=>{B.fill([48,38,36]);B.blob(30,[70,58,54],[30,22,20],12,36,.22,.34);B.ripple(12,'rgba(150,136,130,.16)','rgba(20,12,10,.2)',20,1,-.3);B.sparks(200,['rgba(200,190,186,.2)','rgba(255,140,50,.35)'],.5,.9);B.grain(1200,.03,.06)},
 r262:B=>{B.gcrack(14,'rgba(255,150,56,.95)',1.1,36,'rgba(255,70,20,.24)');B.gcrack(8,'rgba(255,240,170,.9)',.6,22,'rgba(255,140,40,.24)');B.pools(3,5,10)}});
MXU.r26=[()=>mxStoneSpr('r26u0',[70,40,30],6,4.4,{sharp:1}),()=>mxStoneSpr('r26u1',[40,24,20],5,3.6,{sharp:1})];
MXNS.r26={rim:[70,34,20],sp:[255,176,112],gl:'255,110,40'};
function mxMagmaPillarSpr(r,v){return mxSprite('mgp'+r+'|'+v,r*2.4,r*3.4,r*1.2,r*3.4-r*.7,(x,w,h)=>{const bx=r*1.2,by=h-r*.7,H=r*(1.6+v*.3),R=gxRng(r*17+v*3);
  x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(bx,by+r*.55,r*.9,r*.26,0,0,7);x.fill();
  const gr=x.createLinearGradient(bx-r*.6,0,bx+r*.6,0);gr.addColorStop(0,'#5a2a18');gr.addColorStop(.45,'#2a100a');gr.addColorStop(1,'#120604');x.fillStyle=gr;x.beginPath();x.moveTo(bx-r*.5,by+r*.5);x.quadraticCurveTo(bx-r*.6,by-H*.5,bx-r*.15,by-H);x.lineTo(bx+r*.2,by-H*.9);x.quadraticCurveTo(bx+r*.6,by-H*.4,bx+r*.5,by+r*.5);x.closePath();x.fill();x.strokeStyle='#0a0402';x.lineWidth=1;x.stroke();
  x.strokeStyle='rgba(255,180,120,.2)';x.lineWidth=1;x.beginPath();x.moveTo(bx-r*.45,by+r*.4);x.quadraticCurveTo(bx-r*.55,by-H*.5,bx-r*.15,by-H+2);x.stroke();
  for(let i=0;i<5;i++){x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(bx+(R()-.5)*r*.6,by-R()*H*.8,r*.08,r*.05,0,0,7);x.fill()}
  if(v===3){const pg=x.createRadialGradient(bx+r*.7,by+r*.4,0,bx+r*.7,by+r*.4,r*.32);pg.addColorStop(0,'#fff0a0');pg.addColorStop(.5,'#ffaa40');pg.addColorStop(1,'#c03c10');x.fillStyle=pg;x.beginPath();x.ellipse(bx+r*.7,by+r*.4,r*.3,r*.12,0,0,7);x.fill()}})}
MXTR.r26=(t,r,sw,now)=>{const v=mxSV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2,H=r*(1.6+v*.3);mxBlit(mxMagmaPillarSpr(rr,v),x,y,r/rr,0);
  g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,140,50,'+(.6+.3*Math.sin(T*3+x))+')';g.lineWidth=1.6;g.beginPath();g.moveTo(x-r*.2,y+r*.4);g.lineTo(x-r*.1,y-H*.3);g.lineTo(x+r*.1,y-H*.6);g.lineTo(x,y-H*.85);g.stroke();if(!LOWQ)glowAt(x,y-H*.4,r*.7,'255,120,40',.2);g.restore()};
