/* ===== v526 สัตว์เลี้ยงวาดใหม่ 12 ตัว — ทรงจิบิหัวโต ตาโตมีประกาย · ขาโค้งมนมีอุ้งเท้า เดินตามจังหวะเดิม
   แสงเงาบน/ล่าง · ขอบสว่างให้เห็นชัดบนแมพมืด · เอฟเฟกต์เฉพาะตัว (หางเพลิง เปลวไฟซ้อนชั้น ฟองน้ำ โคมไฟ สปอร์ ขนนกเพลิง)
   ขนาด/จุดยืนเท่าเดิม (ไอคอน ป้ายเลเวลในเต็นท์ไม่เลื่อน) · ห่อ drawPet ทางชื่อ · error → แบบเดิม (PTV.on=0 ปิด) ===== */
const PTV={on:1,err:'',n:0};
const ptO='#140e0c';
function ptE(cx,cy,rx,ry,c,st,r){g.beginPath();g.ellipse(cx,cy,Math.max(.1,rx),Math.max(.1,ry),r||0,0,7);g.fillStyle=c;g.fill();if(st&&!(LOWQ&&rx*ry<9)){g.lineWidth=.9;g.strokeStyle=ptO;g.stroke()}}
function ptPath(p){g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;){if(p[i]==='q'){g.quadraticCurveTo(p[i+1],p[i+2],p[i+3],p[i+4]);i+=5}else{g.lineTo(p[i],p[i+1]);i+=2}}g.closePath()}
function ptF(p,c,st,lc){ptPath(p);g.fillStyle=c;g.fill();if(st){g.lineWidth=.9;g.strokeStyle=lc||ptO;g.stroke()}}
const ptSh=(cx,cy,rx,ry,r)=>{if(!LOWQ)ptE(cx,cy,rx,ry,'rgba(30,10,40,.2)',0,r)};
const ptHi=(cx,cy,rx,ry,r,a)=>{if(!LOWQ)ptE(cx,cy,rx,ry,'rgba(255,255,255,'+(a||.32)+')',0,r)};
/* ตา: พื้นเข้ม + ม่านตา + รูม่านตา (slit=แมว) + ประกาย 2 จุด · กะพริบ = เส้นโค้ง */
function ptEye(x,y,r,iris,bl,slit){if(bl){g.strokeStyle=ptO;g.lineWidth=.8;g.beginPath();g.arc(x,y-r*.5,r*.85,.5,2.6);g.stroke();return}
  ptE(x,y,r*.86,r,ptO,0);if(iris){ptE(x,y+r*.12,r*.66,r*.76,iris,0);if(!LOWQ)ptE(x,y+r*.16,slit?r*.17:r*.36,slit?r*.66:r*.42,ptO,0)}
  ptE(x+r*.3,y-r*.36,r*.3,r*.3,'#fff',0);if(!LOWQ)ptE(x-r*.26,y+r*.42,r*.14,r*.14,'#fff',0)}
/* ขา: เส้นขอบเข้ม + สีขา + อุ้งเท้า */
function ptLeg(x,top,bot,w,c,paw,sw){g.lineCap='round';g.beginPath();g.moveTo(x,top);g.lineTo(x+sw,bot);if(LOWQ){g.strokeStyle=c;g.lineWidth=w+.5;g.stroke();return}g.strokeStyle=ptO;g.lineWidth=w+1.5;g.stroke();g.strokeStyle=c;g.lineWidth=w;g.stroke();if(paw)ptE(x+sw+.35,bot+.15,w*.64,w*.44,paw,0)}
function ptTube(c,w){if(LOWQ){g.strokeStyle=c;g.lineWidth=w+.6;g.stroke();return}g.strokeStyle=ptO;g.lineWidth=w+1.3;g.stroke();g.strokeStyle=c;g.lineWidth=w;g.stroke()}
const ptBlush=(x,y,r)=>LOWQ||ptE(x,y,r||1,(r||1)*.6,'rgba(255,110,130,.5)',0);
function ptSmile(x,y,r,c){g.strokeStyle=c||ptO;g.lineWidth=.7;g.beginPath();g.arc(x,y,r,.25,2.9);g.stroke()}
let PTD=0;const ptS=()=>{g.save();PTD++},ptR=()=>{g.restore();PTD--};
const ptLit=fn=>{g.save();g.globalCompositeOperation='lighter';try{fn()}finally{g.restore()}};

function ptArt(id,t,mv){const bl=((t+id*.73)%3.4)<.12;
  if(id===1){/* ลูกหมาค่าย */const hp=mv?-Math.abs(Math.sin(t*14))*1.6:Math.sin(t*2)*.2,s=mv?Math.sin(t*14):0,wg=Math.sin(t*(mv?18:8));
    const B='#d69c5c',D='#a8703c',C='#f6e4c6';
    g.lineCap='round';g.beginPath();g.moveTo(-5.4,-7.6+hp);g.quadraticCurveTo(-9-wg*.6,-8.6+hp,-8.6-wg*1.4,-12.6+hp);ptTube(B,2.1);ptE(-8.6-wg*1.4,-12.8+hp,1.15,1.15,C,0);
    ptLeg(-2.8,-5+hp,-.5,2,D,'#8a5a30',-s*1.2);ptLeg(3.6,-5+hp,-.5,2,D,'#8a5a30',s*1.2);
    ptE(0,-7+hp,7,4.6,B,1);ptE(.9,-5.1+hp,4.6,2,C,0);if(!LOWQ)ptE(-2.2,-9.3+hp,3.4,1.9,D,0,-.15);ptSh(.4,-3.6+hp,5.4,1.1);ptHi(-.6,-10.4+hp,3.2,.9);
    ptLeg(-4.6,-5+hp,0,2.3,B,C,s*1.4);ptLeg(5,-5+hp,0,2.3,B,C,-s*1.4);
    ptF([2.6,-9.2+hp,7.4,-8+hp,4.4,-4.4+hp],'#d63a30',1);ptE(3.2,-8.6+hp,.8,.8,'#ffd84a',0);
    const hx=7,hy=-12.4+hp;ptE(hx-1.4,hy-2.8,1.5,2.6,'#8a5a30',1,.7);
    ptE(hx,hy,5,4.6,B,1);if(!LOWQ)ptE(hx+1.4,hy-2.4,1,1.9,C,0,.35);ptHi(hx-1.4,hy-2.8,2,.8);
    ptE(hx+3.4,hy+1.6,2.9,2.1,C,1);ptE(hx+5.8,hy+.9,1.05,.85,ptO,0);if(!LOWQ)ptE(hx+5.5,hy+.6,.35,.25,'#fff',0);
    ptEye(hx+1.8,hy-.7,1.3,'#3a2010',bl);ptBlush(hx+.7,hy+1.9,.95);
    g.strokeStyle=ptO;g.lineWidth=.7;g.beginPath();g.moveTo(hx+5.6,hy+1.6);g.quadraticCurveTo(hx+5,hy+3,hx+3.6,hy+2.8);g.stroke();
    if(mv)ptE(hx+4.4,hy+3.5,.85,1.15,'#ff7a8a',1);
    ptE(hx-2.6,hy-.4,1.9,3.4,'#8a5a30',1,.45+Math.sin(t*6)*.1+(mv?s*.18:0))}
  else if(id===2){/* แมวดำนำโชค */const hp=mv?-Math.abs(Math.sin(t*12))*1.2:0,s=mv?Math.sin(t*12):0,tl=Math.sin(t*2.6);
    const B='#2e2838',L='#4a4060',I='#c46a9a';
    g.lineCap='round';g.beginPath();g.moveTo(-5.4,-7+hp);g.bezierCurveTo(-11,-7.4+hp,-11.6+tl,-12.6+hp,-9+tl*1.5,-15.6+hp);ptTube(LOWQ?'#3a3248':B,1.8);
    if(!LOWQ){g.strokeStyle='rgba(170,150,230,.45)';g.lineWidth=.6;g.beginPath();g.moveTo(-6.4,-7.8+hp);g.bezierCurveTo(-10.4,-8.2+hp,-11+tl,-12.4+hp,-9.2+tl*1.5,-15+hp);g.stroke()}
    ptLeg(-3,-5+hp,-.5,1.7,'#1e1a26',L,-s);ptLeg(3.4,-5+hp,-.5,1.7,'#1e1a26',L,s);
    ptE(0,-7+hp,6.4,3.9,B,1);ptE(.8,-5.2+hp,4,1.5,'#3a3248',0);ptHi(-.6,-9.8+hp,4,.8,0,.22);
    ptLeg(-4.4,-5+hp,0,1.9,B,L,s*1.3);ptLeg(4.6,-5+hp,0,1.9,B,L,-s*1.3);
    const hx=6.4,hy=-11.4+hp;
    ptF([hx-3.6,hy-1.6,hx-3.2,hy-7.2,hx-.4,hy-3.4],B,1);ptF([hx-3,hy-2.4,hx-2.9,hy-5.8,hx-1.2,hy-3.4],I,0);
    ptF([hx+.4,hy-3.6,hx+2.8,hy-7.4,hx+3.9,hy-2.2],B,1);ptF([hx+1.2,hy-3.6,hx+2.7,hy-6,hx+3.3,hy-2.8],I,0);
    ptE(hx,hy,4.7,4,B,1);ptHi(hx-1.2,hy-2.2,2.4,.8,0,.24);
    ptEye(hx+.2,hy-.2,1.35,'#c8f048',bl,1);ptEye(hx+3,hy-.2,1.15,'#c8f048',bl,1);
    ptE(hx+4.2,hy+1.4,.6,.42,'#ff8aa0',0);ptSmile(hx+3.6,hy+1.7,.6,'#8a7a9a');
    if(!LOWQ){g.strokeStyle='rgba(225,220,240,.6)';g.lineWidth=.4;g.beginPath();g.moveTo(hx+3.6,hy+1.9);g.lineTo(hx+7.2,hy+1.2);g.moveTo(hx+3.6,hy+2.2);g.lineTo(hx+7,hy+2.6);g.stroke()}
    g.strokeStyle='#d63a30';g.lineWidth=1.3;g.beginPath();g.arc(hx-.6,hy+.6,3.6,.85,2.4);g.stroke();
    ptE(hx-.4,hy+4.3,1.3,1.3,'#ffd84a',1);g.strokeStyle='#a87a10';g.lineWidth=.5;g.beginPath();g.moveTo(hx-1.5,hy+4.3);g.lineTo(hx+.7,hy+4.3);g.stroke();
    if(Math.sin(t*1.7)>.97)ptLit(()=>ptE(hx+.2,hy+3.8,2,2,'rgba(255,230,120,.7)',0))}
  else if(id===3){/* นกฮูกปราชญ์ */const oy=-16+Math.sin(t*3)*1.8,fl=Math.sin(t*(mv?18:6))*(mv?.8:.25);
    const B='#8a6a44',D='#5e4228',C='#ecd8b0';
    for(const s of[-1,1]){ptS();g.translate(s*4.6,oy-.6);g.rotate(s*(.32+fl));ptE(s*1.3,2.4,2.6,5.4,D,1);if(!LOWQ){g.strokeStyle='#3e2a18';g.lineWidth=.5;g.beginPath();g.moveTo(s*.4,4.4);g.lineTo(s*1.4,7.2);g.moveTo(s*1.6,3.6);g.lineTo(s*2.6,6.6);g.stroke()}ptR()}
    ptE(0,oy,5.8,6.8,B,1);ptE(0,oy+2,4,4.4,C,0);ptSh(0,oy+5.4,4,1.2);
    g.strokeStyle='#a88a60';g.lineWidth=.6;for(let i=0;i<3;i++)for(const dx of[-1.6,1.4]){g.beginPath();g.moveTo(dx-.8,oy+.8+i*1.7);g.lineTo(dx,oy+1.4+i*1.7);g.lineTo(dx+.8,oy+.8+i*1.7);g.stroke()}
    ptF([-4.4,oy-4,-5.2,oy-9.6,-1.8,oy-6],D,1);ptF([4.4,oy-4,5.2,oy-9.6,1.8,oy-6],D,1);
    ptE(-2.2,oy-3,2.8,2.6,'#f4e6c8',0);ptE(2.2,oy-3,2.8,2.6,'#f4e6c8',0);ptHi(-2.6,oy-6,2.4,.7,0,.25);
    ptEye(-2.1,oy-3,1.75,'#ffb020',bl);ptEye(2.3,oy-3,1.75,'#ffb020',bl);
    g.strokeStyle='#e0b050';g.lineWidth=.7;g.beginPath();g.arc(-2.1,oy-3,2.35,0,7);g.moveTo(4.65,oy-3);g.arc(2.3,oy-3,2.35,0,7);g.moveTo(-.1,oy-3.4);g.quadraticCurveTo(.1,oy-4.2,.2,oy-3.4);g.stroke();
    ptF([-.8,oy-1,.8,oy-1,0,oy+1],'#e8a030',1);
    ptE(-1.6,oy+6.8,1,.7,'#e8a030',1);ptE(1.6,oy+6.8,1,.7,'#e8a030',1)}
  else if(id===4){/* สไลม์เยลลี่ */const ph=mv?Math.sin(t*10):Math.sin(t*3)*.35,j=mv?-Math.max(0,Math.sin(t*10))*3.5:0,w=7.2+ph*1.1,h=6.6-ph*1.1;
    g.beginPath();g.moveTo(-w,j);g.bezierCurveTo(-w,-h*1.55+j,w,-h*1.55+j,w,j);g.quadraticCurveTo(0,j+1.2,-w,j);g.closePath();g.fillStyle='rgba(92,212,118,.9)';g.fill();g.lineWidth=1;g.strokeStyle='#1f6a34';g.stroke();
    ptE(-.4,-h*.42+j,w*.62,h*.4,'rgba(40,150,70,.35)',0);
    if(!LOWQ){for(let i=0;i<2;i++){const q=(t*.5+i*.5)%1;ptE(-3+i*5.4,j-1-q*h*.8,.6+q*.4,.6+q*.4,'rgba(220,255,220,'+(.7*(1-q))+')',0)}}
    g.beginPath();g.moveTo(-w*.72,j-.8);g.bezierCurveTo(-w*.72,-h*.92+j,w*.1,-h*1.08+j,w*.36,-h*.94+j);g.strokeStyle='rgba(210,255,210,.4)';g.lineWidth=1.5;g.stroke();
    ptE(-w*.38,-h*.96+j,1.7,1,'rgba(255,255,255,.8)',0,-.3);ptE(-w*.62,-h*.6+j,.6,.6,'rgba(255,255,255,.7)',0);
    const ty=-h*1.16+j;g.strokeStyle='#2a8a3a';g.lineWidth=.9;g.beginPath();g.moveTo(-.4,ty+.4);g.quadraticCurveTo(-.2,ty-1.4,.4,ty-2.6);g.stroke();
    ptF([.4,ty-2.6,'q',2.6,ty-4.6,4.4,ty-3,'q',2.6,ty-1.4,.4,ty-2.6],'#8ae870',1,'#1f6a34');ptF([.2,ty-2.2,'q',-1.6,ty-4,-3,ty-2.6,'q',-1.4,ty-1.2,.2,ty-2.2],'#6ad058',1,'#1f6a34');
    ptEye(1.6,-h*.56+j,1.1,0,bl);ptEye(4.7,-h*.56+j,1.1,0,bl);ptBlush(.2,-h*.3+j,1.1);ptBlush(6.1,-h*.3+j,1);ptSmile(3.15,-h*.4+j,1.1)}
  else if(id===5){/* ภูติไฟจิ๋ว */const oy=-14+Math.sin(t*2.5)*2.2,fk=Math.sin(t*13)*.8,fk2=Math.sin(t*9+1)*.8,tl=mv?-3:0;
    glowAt(0,oy,16,'255,140,40',.55+.1*Math.sin(t*7));
    ptLit(()=>{for(let i=0;i<4;i++){const q=(t*1.2+i/4)%1;g.fillStyle='rgba(255,'+(150+q*80|0)+',60,'+(.7*(1-q))+')';g.beginPath();g.arc(-3-q*6+Math.sin(t*5+i)*1.2,oy+2-q*8,1.4*(1-q)+.4,0,7);g.fill()}});
    const fl=(k,c,st)=>{ptS();g.translate(0,oy+1.6);g.scale(k,k);ptF([-5.6,0,'q',-6.8,-6.4,-3.8+tl*.5+fk2*.4,-10.6,'q',-2.8,-7.6,-1+tl+fk,-15,'q',1.6,-9.4,3.4+fk*.5,-12,'q',4.4,-7.6,5.4+fk2*.3,-8.8,'q',6.8,-4.4,5.6,0,'q',5.6,5.6,0,5.6,'q',-5.6,5.6,-5.6,0],c,st,'#7a2008');ptR()};
    fl(1,'#ea4a1e',1);fl(.76,'#ff9a2a',0);if(!LOWQ)fl(.48,'#fff0a0',0);
    ptE(-6,oy+1,1.5,1,'#ff8a30',!LOWQ,-.4);ptE(6,oy+1,1.5,1,'#ff8a30',!LOWQ,.4);
    ptEye(-.4,oy-.4,1.1,0,bl);ptEye(2.6,oy-.4,1.1,0,bl);ptBlush(-1.6,oy+1.4,.9);ptBlush(3.8,oy+1.4,.9);ptSmile(1.1,oy+1,1,'#5a1408')}
  else if(id===6){/* มังกรน้อย */const oy=-15+Math.sin(t*3)*2,fl=Math.sin(t*(mv?15:7)),B='#d4483a',C='#ffd08a';
    glowAt(0,oy,16,'255,120,80',.18);
    const wing=(dx,c,m)=>{ptS();g.translate(-1+dx,oy-3);g.rotate(-.12-fl*.38);g.scale(1.22,1.22);ptF([0,0,-4,-9,'q',-7.4,-9.6,-10.6,-7,'q',-8.4,-5.8,-8.8,-3.6,'q',-6.6,-3.6,-6.2,-1.2,'q',-3.2,-1.8,0,1.2],m,!(LOWQ&&dx));
      if(!LOWQ){g.strokeStyle=c;g.lineWidth=.9;g.beginPath();g.moveTo(0,0);g.lineTo(-4,-9);g.moveTo(-4,-9);g.lineTo(-8.8,-3.6);g.moveTo(-4,-9);g.lineTo(-6.2,-1.2);g.stroke()}ptF([-4,-9,-4.6,-11,-3.2,-9.4],'#f4e4c0',0);ptR()};
    wing(2.4,'#6a1a2a','#a83848');
    const sw=Math.sin(t*4)*1.5;g.lineCap='round';g.beginPath();g.moveTo(-4.4,oy+1.4);g.quadraticCurveTo(-9,oy+4.6,-11,oy+1.4+sw);ptTube(B,2.1);
    ptF([-10.4,oy-.2+sw,-14.2,oy+1.4+sw,-10.6,oy+3.4+sw,-11.6,oy+1.4+sw],C,1);
    ptLeg(-2,oy+2.6,oy+5.4,1.7,'#b83a2e',C,mv?-.6:0);ptLeg(2.6,oy+2.6,oy+5.4,1.7,'#b83a2e',C,mv?-.6:0);
    ptE(0,oy,5.8,4.4,B,1);ptE(1.2,oy+1.4,3.4,2.2,C,0);if(!LOWQ){g.strokeStyle='#e0a860';g.lineWidth=.5;g.beginPath();for(let i=0;i<3;i++){g.moveTo(-1+i*1.6,oy-.4);g.lineTo(-.6+i*1.6,oy+3.2)}g.stroke()}
    for(let i=0;i<3;i++)ptF([-3.4+i*2.4,oy-3.8,-2.4+i*2.4,oy-6,-1.2+i*2.4,oy-3.8],C,!LOWQ);ptHi(-1.6,oy-2.2,2.6,.9);
    const hx=6.6,hy=oy-4.6;ptF([hx-2.4,hy-2.2,hx-4.6,hy-6.6,hx-.8,hy-3.2],'#f4e4c0',1);
    ptE(hx,hy,4.2,3.6,B,1);ptE(hx+3.4,hy+1.2,2.6,1.9,'#e2604c',1);ptE(hx+5.2,hy+.5,.45,.35,ptO,0);ptHi(hx-1,hy-2,2,.7);
    ptF([hx-.2,hy-3.2,hx+.4,hy-7.2,hx+1.6,hy-3],'#f4e4c0',1);
    ptEye(hx+.9,hy-.5,1.35,'#ffd84a',bl,1);ptBlush(hx+.2,hy+1.8,.9);
    wing(0,'#8a2a3a','#e86a6a');
    const fp=t%4.5;if(fp<.7)ptLit(()=>{for(let i=0;i<5;i++){const q=Math.min(1,fp/.7+i*.08),r=(1.2+q*2.6)*(1-fp/.7*.6);g.fillStyle='rgba(255,'+(200-i*25)+',60,'+(.75*(1-fp/.7))+')';g.beginPath();g.arc(hx+6+q*8+i*1.5,hy+1+Math.sin(i*2),r,0,7);g.fill()}})}
  else if(id===7){/* ปลาทองลอยฟ้า */const oy=-15+Math.sin(t*2.4)*2.4,tw=Math.sin(t*(mv?14:6));
    ptE(0,oy,10,9.6,'rgba(150,215,255,.18)',0);
    ptS();g.translate(-3.2,oy);g.rotate(tw*.3);g.scale(.86,.86);ptF([0,0,'q',-2.6,-5.4,-6.6,-4.8,'q',-4.8,-1.8,-5.6,0,'q',-4.8,1.8,-6.6,4.8,'q',-2.6,5.4,0,0],'rgba(255,140,50,.9)',1);
    if(!LOWQ){g.strokeStyle='rgba(255,220,160,.7)';g.lineWidth=.45;g.beginPath();g.moveTo(-.6,-.4);g.lineTo(-5.4,-3.8);g.moveTo(-.8,0);g.lineTo(-4.6,0);g.moveTo(-.6,.4);g.lineTo(-5.4,3.8);g.stroke()}ptR();
    ptF([-.8,oy-3,'q',1,oy-7.6,3.8,oy-3.4],'#ff7a2a',1);
    ptE(1,oy,5.3,3.9,'#ffa040',1);ptE(1.6,oy+1.3,3.6,1.8,'#ffe0a0',0);ptHi(0,oy-2.2,3,.8,0,.38);
    if(!LOWQ){g.strokeStyle='rgba(220,110,30,.5)';g.lineWidth=.45;g.beginPath();g.arc(-.4,oy-.4,1.1,-1.2,1.2);g.moveTo(2.2,oy-1.5);g.arc(1.4,oy-.4,1.1,-1.2,1.2);g.stroke()}
    ptS();g.translate(1.2,oy+1.4);g.rotate(1.1+tw*.25);ptE(0,1.3,.7,1.5,'rgba(255,150,60,.95)',1);ptR();
    ptE(4.2,oy-.8,1.65,1.65,'#fff',1);ptEye(4.5,oy-.8,1.05,0,bl);ptE(6.2,oy+.5,.5,.6,'#c8401a',0);
    g.strokeStyle='rgba(225,245,255,.9)';g.lineWidth=.8;g.beginPath();g.arc(0,oy,9.6,0,7);g.stroke();
    if(!LOWQ){g.strokeStyle='rgba(120,190,240,.5)';g.lineWidth=1.3;g.beginPath();g.arc(0,oy,8.7,.4,2.7);g.stroke()}
    ptE(-4.4,oy-5.2,2.4,1.2,'rgba(255,255,255,.85)',0,-.6);ptE(-6.6,oy-2.4,.7,.7,'rgba(255,255,255,.75)',0);
    if(!PTV.ico)for(let i=0;i<2;i++){const q=(t*.8+i*.5)%1;g.strokeStyle='rgba(220,245,255,'+(1-q)+')';g.lineWidth=.6;g.beginPath();g.arc(6+i*2,oy-10-q*10,1+q,0,7);g.stroke()}}
  else if(id===8){/* จิ้งจอกเพลิง */const hp=mv?-Math.abs(Math.sin(t*13))*1.8:0,s=mv?Math.sin(t*13):0,tl=Math.sin(t*(mv?10:3));
    const B='#e8662a',C='#fff0d8',K='#3a1a10';
    ptS();g.translate(-5.4,-8+hp);g.rotate(-.42+tl*.22);
    ptF([0,-1.8,'q',-6,-6.6,-12.4,-6.8,'q',-15.8,-6.8,-16.4,-4.4,'q',-13.4,-1,-9,1,'q',-4,2.6,0,1.8],B,1,'#6a2008');
    if(!LOWQ)ptF([-1,-1,'q',-6,-5,-11.6,-5.4,'q',-13.4,-3,-9,-.2,'q',-4.6,1.4,-1,1],'#ff9a3a',0);
    ptE(-14.2,-5,2.4,1.7,'#fff0c0',0,-.2);
    ptLit(()=>{for(let i=0;i<(LOWQ?1:3);i++){const f=Math.sin(t*12+i*2.1);g.fillStyle=i===1?'rgba(255,220,90,.85)':'rgba(255,120,30,.8)';g.beginPath();g.moveTo(-13+i*1.6,-6+i*.4);g.quadraticCurveTo(-15-i+f,-9.6-i*.6,-17.6-i*.4+f,-10.4+i);g.quadraticCurveTo(-15.4,-7,-12+i*1.6,-4.6);g.fill()}glowAt(-14.6,-5.6,7,'255,150,50',.45+.25*Math.sin(t*9))});
    ptR();
    ptLeg(-2.8,-5+hp,-.5,1.6,'#b8461c',K,-s*1.2);ptLeg(3.4,-5+hp,-.5,1.6,'#b8461c',K,s*1.2);
    ptE(0,-7+hp,6.6,3.8,B,1);ptE(1.2,-5.2+hp,4,1.6,C,0);ptSh(.4,-3.7+hp,5,1);ptHi(-1,-9.6+hp,3.8,.9);
    ptLeg(-4.2,-5+hp,0,1.8,'#d85a22',K,s*1.3);ptLeg(4.6,-5+hp,0,1.8,'#d85a22',K,-s*1.3);
    const hx=6.2,hy=-11+hp;ptF([hx-2.6,hy+1.4,hx+1.6,hy+5,hx+2.6,hy+1.8],C,1);
    ptF([hx-3,hy-1.6,hx-2.4,hy-7.8,hx,hy-3],B,1);ptF([hx-2.4,hy-2.4,hx-2.2,hy-6.2,hx-.8,hy-3.2],K,0);
    ptE(hx,hy,4,3.5,B,1);ptF([hx+1.8,hy-1.6,'q',hx+5,hy-1,hx+7.6,hy+.6,'q',hx+4.8,hy+2.6,hx+1.6,hy+2.2],B,1);
    ptF([hx-1,hy+.8,'q',hx+2,hy+3.6,hx+7,hy+1,'q',hx+3.6,hy+2,hx-1,hy+.8],C,0);ptE(hx+7.4,hy+.5,.75,.6,ptO,0);
    ptF([hx+.2,hy-3.2,hx+2,hy-8.2,hx+2.8,hy-2.4],B,1);ptF([hx+.9,hy-3.2,hx+1.9,hy-6.6,hx+2.3,hy-3],K,0);ptHi(hx-1.4,hy-2,1.8,.7);
    ptEye(hx+1.7,hy-.5,1.15,'#ffcf40',bl,1)}
  else if(id===9){/* เต่าน้ำแข็ง */const hp=mv?Math.sin(t*6)*.5:0,lg=mv?Math.sin(t*6):0,S='#6ab0a0';
    ptE(-4.2+lg*.8,-1.2,2,1.5,'#4a9080',1);ptE(5.4-lg*.8,-1.2,2,1.5,'#4a9080',1);
    ptF([-8.2,-3.4+hp,-10.8,-2.2+hp,-8,-1.6+hp],S,1);
    ptE(7.6,-4.2+hp,2.6,1.9,S,1);ptE(10.4,-5.8+hp,3.5,3,'#7ac4b4',1);ptHi(9.6,-7.4+hp,1.8,.7);ptEye(11.3,-6.4+hp,1.2,'#1a2a30',bl);ptBlush(10.2,-4.6+hp,.8);ptSmile(12.6,-5+hp,.7);
    ptE(0,-2.8+hp,9.2,2,'#cfeae2',1);
    g.beginPath();g.moveTo(-9,-3.4+hp);g.bezierCurveTo(-8.6,-13.2+hp,8.6,-13.2+hp,9,-3.4+hp);g.closePath();g.fillStyle='#8cc8ea';g.fill();g.lineWidth=.9;g.strokeStyle=ptO;g.stroke();
    ptE(-1.6,-9.4+hp,5,1.9,'rgba(225,246,255,.55)',0,-.08);
    g.strokeStyle='rgba(50,100,150,.8)';g.lineWidth=.7;g.beginPath();g.moveTo(-3.4,-4+hp);g.lineTo(-2.2,-8.4+hp);g.lineTo(2.2,-8.4+hp);g.lineTo(3.4,-4+hp);g.moveTo(-2.2,-8.4+hp);g.lineTo(-6.6,-6.6+hp);g.moveTo(2.2,-8.4+hp);g.lineTo(6.6,-6.6+hp);g.moveTo(-2.2,-8.4+hp);g.lineTo(-1.4,-10.6+hp);g.moveTo(2.2,-8.4+hp);g.lineTo(1.4,-10.6+hp);g.stroke();
    g.strokeStyle='rgba(235,250,255,.7)';g.lineWidth=.8;g.beginPath();g.moveTo(-8.4,-3.8+hp);g.quadraticCurveTo(0,-5.2+hp,8.4,-3.8+hp);g.stroke();
    for(const[cx,h2]of[[-2.4,5.6],[1.2,8],[4.4,5]]){ptF([cx-1.5,-10.6+hp,cx,-10.6-h2+hp,cx+1.5,-10.6+hp],'#bfe6fa',1);if(!LOWQ)ptF([cx-1.4,-10.7+hp,cx,-10.6-h2+hp,cx,-10.7+hp],'#f4fcff',0)}
    ptE(-6+lg*.8,-.6,2.3,1.7,S,1);ptE(5.6-lg*.8,-.6,2.3,1.7,S,1);
    if(!LOWQ){g.strokeStyle='#2e6a5e';g.lineWidth=.5;g.beginPath();for(const x0 of[-6+lg*.8,5.6-lg*.8]){g.moveTo(x0+.4,.4);g.lineTo(x0+.6,1.1);g.moveTo(x0+1.4,.2);g.lineTo(x0+1.7,.9)}g.stroke()}
    if(Math.sin(t*2.2)>.9)ptLit(()=>VX.star(1.2,-19.4+hp,3.5,'255,255,255',1))}
  else if(id===10){/* ผีน้อยโคมไฟ */const oy=-15+Math.sin(t*2)*2.4,sw=Math.sin(t*3)*.3;
    g.beginPath();g.moveTo(-6.4,oy+4);g.quadraticCurveTo(-7.4,oy-10,0,oy-10.6);g.quadraticCurveTo(7.4,oy-10,6.4,oy+4);for(let i=0;i<4;i++){const xx=6.4-i*3.2;g.quadraticCurveTo(xx-1.6,oy+7.4+Math.sin(t*6+i)*1.4,xx-3.2,oy+4)}g.closePath();g.fillStyle='rgba(238,244,255,.94)';g.fill();g.lineWidth=.9;g.strokeStyle='#5a6a8a';g.stroke();
    if(!LOWQ){ptE(3.2,oy-.4,2.4,4.6,'rgba(120,140,210,.16)',0);ptE(-3,oy-6.4,2.2,1.2,'rgba(255,255,255,.75)',0,-.5)}
    ptEye(-2,oy-3.2,1.35,0,bl);ptEye(2.3,oy-3.2,1.35,0,bl);ptBlush(-3.4,oy-1.2,.9);ptBlush(3.7,oy-1.2,.9);ptE(.15,oy-.6,.7,.9,'#5a3a4a',0);
    ptE(6.4,oy-.8,1.6,1.2,'rgba(238,244,255,.95)',1,-.4);
    ptS();g.translate(8.6,oy-2.4);g.rotate(sw);g.strokeStyle='#5a4a3a';g.lineWidth=.8;g.beginPath();g.moveTo(0,-4);g.lineTo(0,-1);g.arc(0,-1.6,1.2,Math.PI,0);g.stroke();
    const fk=.8+.2*Math.sin(t*11);ptLit(()=>glowAt(0,3.6,14,'255,180,80',.55*fk));
    ptF([-2.6,0,2.6,0,2,1.2,-2,1.2],'#4a3220',1);ptE(0,3.6,2.2,2.6,'rgba(255,'+(196+fk*20|0)+',90,'+fk+')',0);ptE(0,3.8,1,1.4,'#fff6c8',0);
    if(!LOWQ){g.strokeStyle='#4a3220';g.lineWidth=.6;g.beginPath();g.moveTo(-1.9,1.2);g.lineTo(-1.9,6.2);g.moveTo(1.9,1.2);g.lineTo(1.9,6.2);g.stroke()}ptF([-2,6.2,2,6.2,2.6,7.4,-2.6,7.4],'#4a3220',1);ptR()}
  else if(id===11){/* เห็ดน้อยเรืองแสง */const hp=mv?-Math.abs(Math.sin(t*10))*2.2:0,lg=mv?Math.sin(t*10):0,sq=mv?1+Math.sin(t*20)*.05:1;
    ptLit(()=>glowAt(0,-12+hp,14,'90,240,220',.38+.14*Math.sin(t*2)));
    ptE(-1.9+lg*.7,-.5,1.6,.9,'#d8ccb8',1);ptE(1.9-lg*.7,-.5,1.6,.9,'#d8ccb8',1);
    ptE(-4,-5.2+hp,1,1.7,'#f4ead8',1,.6+lg*.2);ptE(4,-5.2+hp,1,1.7,'#f4ead8',1,-.6-lg*.2);
    ptE(0,-5.6+hp,4.2,4.8*sq,'#f6eedc',1);ptSh(1.4,-3.6+hp,2.4,2);
    ptEye(-1.4,-6+hp,1.05,0,bl);ptEye(1.6,-6+hp,1.05,0,bl);ptBlush(-2.6,-4.4+hp,.8);ptBlush(2.8,-4.4+hp,.8);ptSmile(.1,-4.9+hp,.8);
    ptE(0,-9.8+hp,8,1.9,'#1e6a7a',1);if(!LOWQ){g.strokeStyle='rgba(140,230,230,.5)';g.lineWidth=.45;g.beginPath();for(let i=-3;i<=3;i++){g.moveTo(i*1.9,-8.6+hp);g.lineTo(i*2.3,-10.4+hp)}g.stroke()}
    g.beginPath();g.moveTo(-8.8,-10+hp);g.bezierCurveTo(-8.8,-18+hp,8.8,-18+hp,8.8,-10+hp);g.quadraticCurveTo(0,-8.2+hp,-8.8,-10+hp);g.closePath();g.fillStyle='#36c4c0';g.fill();g.lineWidth=.9;g.strokeStyle=ptO;g.stroke();
    ptE(-2.4,-14.8+hp,4,1.5,'rgba(220,255,250,.42)',0,-.15);ptSh(3.6,-11.2+hp,4,1,-.1);
    for(const[dx,dy,r]of(LOWQ?[[-4.6,-12.2,1.3],[-.4,-14.6,1.4],[4,-12.6,1.2]]:[[-4.6,-12.2,1.3],[-.4,-14.6,1.4],[4,-12.6,1.2],[-1.8,-11,.8],[6.4,-11.2,.7]])){ptE(dx,dy+hp,r,r*.85,'#eafffb',0)}
    if(!LOWQ)ptLit(()=>{for(let i=0;i<3;i++){const q=(t*.35+i/3)%1;g.fillStyle='rgba(140,255,235,'+(.75*(1-q))+')';g.beginPath();g.arc(-5+i*5+Math.sin(t*2+i)*1.6,-14-q*12+hp,.7,0,7);g.fill()}})}
  else if(id===12){/* ฟีนิกซ์ทองคำ */const oy=-17+Math.sin(t*2.6)*2.2,fl=Math.sin(t*(mv?14:6));
    ptLit(()=>{glowAt(0,oy,22,'255,190,80',.45);for(let i=0;i<5;i++){const q=(t*1.1+i/5)%1;glowAt(-6-q*10,oy+3+Math.sin(t*4+i)*2,3*(1-q)+1,'255,'+(160+q*60|0)+',60',.8*(1-q))}});
    const TC=['#ff5a1a','#ffcf4a','#ff8a2a'];for(let i=-1;i<=1;i++){const sw=Math.sin(t*5+i)*1.5,tx=-16-Math.abs(i)*-1.4,ty=oy+3+i*4.4+sw;
      ptF([-2.6,oy+.4,'q',-8.6,oy+2.4+i*2.4,tx,ty,'q',-9.6,oy+6+i*2.8,-2.6,oy+4],TC[i+1],!LOWQ,'#c0501a');if(!LOWQ){ptE(tx+1.4,ty-.2,1.5,1.1,'#fff2b0',0);ptE(tx+1.5,ty-.2,.6,.5,'#e83a1a',0)}}
    const wing=(k,a,b2,c)=>{ptS();g.translate(-.4,oy-1.8);g.scale(k,k);g.rotate(-.1-fl*.5);
      ptF([0,0,'q',-3,-9.4,-12.6,-11.6,'q',-10.6,-8.6,-11.8,-7,'q',-9.4,-6.6,-10,-4.4,'q',-7.6,-4.4,-7.8,-2,'q',-5.2,-2.2,-4.8,.4,'q',-2.2,0,0,1.6],a,1,'#8a3a10');
      if(!(LOWQ&&k<1))ptF([0,-.4,'q',-2.6,-6.6,-8.6,-8,'q',-7.2,-5.4,-7.8,-4,'q',-5.6,-3.8,-5.6,-1.6,'q',-3,-1.4,0,.8],b2,0);
      if(!LOWQ)ptF([0,-.6,'q',-1.6,-3.6,-4.8,-4.4,'q',-4,-2.2,-3.2,-.6,'q',-1.4,0,0,.4],c,0);
      if(!LOWQ){g.strokeStyle='rgba(140,60,10,.55)';g.lineWidth=.45;g.beginPath();g.moveTo(-2.4,-2.4);g.lineTo(-10.6,-8.4);g.moveTo(-2,-1.4);g.lineTo(-9,-5.2);g.moveTo(-1.6,-.6);g.lineTo(-6.8,-2.6);g.stroke()}ptR()};
    wing(.9,'#d8601a','#e88a2a','#f0b040');
    ptE(0,oy,4.6,5.2,'#ffd24a',1);ptE(.9,oy+1.6,2.8,3,'#fff0b0',0);ptSh(-.6,oy+3.6,3.2,1.2);
    ptE(3.6,oy-5.4,3.1,2.9,'#ffd24a',1);ptHi(2.8,oy-7,1.6,.6,0,.45);
    for(let i=0;i<3;i++){const f=Math.sin(t*10+i*1.7)*.6;ptF([1.4+i*1.1,oy-7.2,'q',-.4+i*.8+f,oy-10.6-i*.8,-1.8+i*1.5+f,oy-13-i*.6,'q',2.4+i*1.2,oy-11,4.2+i*1,oy-7.6],i===1?'#ff6a1a':'#ffb030',!LOWQ,'#c0501a')}
    ptF([5.9,oy-6.3,'q',8.8,oy-6.1,9.6,oy-4.6,'q',7.6,oy-4.8,5.9,oy-4.4],'#e89a20',1);
    ptEye(4.5,oy-6,1,'#c8201a',bl);g.strokeStyle='#e8401a';g.lineWidth=.6;g.beginPath();g.moveTo(3.6,oy-5.6);g.lineTo(1.6,oy-5);g.stroke();
    ptE(-1,oy+5.4,.8,.6,'#c87a10',0);ptE(1.4,oy+5.4,.8,.6,'#c87a10',0);
    wing(1.04,'#ff8a2a','#ffc040','#ffe680')}
  else return false;
  return true}

{const old=drawPet;drawPet=function(id,x,y,fx,t,mv,sc,noSh){const P=PETS[id];if(PTV.on&&P){const S=sc||1;g.save();PTD=0;let ok=false;
    try{if(!noSh){g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x,y+1,(P.fly?5:7)*S,2.2*S,0,0,7);g.fill()}
      g.translate(x,y);g.scale((fx<0?-1:1)*S,S);g.lineJoin='round';g.lineCap='round';ok=ptArt(id,t,mv);if(ok)PTV.n++}
    catch(e){PTV.err=String(e&&e.stack||e).slice(0,300);ok=false;while(PTD>0){g.restore();PTD--}}
    g.restore();if(ok)return}
  return old.apply(this,arguments)};PTV.old=old;try{for(const k in PTI)delete PTI[k]}catch(e){}}
/* ไอคอนสัตว์เลี้ยง: วาดภาพใหม่แล้วจัดให้พอดีกรอบ 64 px อัตโนมัติ (หางจิ้งจอก/ปีกมังกรไม่ล้นขอบ) · t=0.9 ไม่ติดจังหวะกะพริบตา */
function ptIcon(id){const W=220,c=document.createElement('canvas');c.width=c.height=W;const g0=g;let bb=null;
  g=c.getContext('2d',{willReadFrequently:true});try{drawPet(id,W/2,W*.72,1,.9,0,4,1);const d=g.getImageData(0,0,W,W).data;let x0=W,y0=W,x1=-1,y1=-1;
    for(let y=0;y<W;y++)for(let x=0;x<W;x++)if(d[(y*W+x)*4+3]>90){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}if(x1>x0&&y1>y0)bb=[x0,y0,x1,y1]}finally{g=g0}
  if(!bb)return '';const k=Math.min(56/(bb[2]-bb[0]+1),56/(bb[3]-bb[1]+1),.8),o=document.createElement('canvas');o.width=o.height=64;
  g=o.getContext('2d');try{drawPet(id,32-((bb[0]+bb[2])/2-W/2)*k,32-((bb[1]+bb[3])/2-W*.72)*k,1,.9,0,4*k,1)}finally{g=g0}return o.toDataURL()}
{const old=petIcon;petIcon=function(id){if(PTV.on&&PETS[id]&&!PTI[id]){PTV.ico=1;try{const n0=PTV.n,u=ptIcon(id);if(u&&PTV.n>n0)return PTI[id]=u}catch(e){PTV.err='icon '+String(e).slice(0,200)}finally{PTV.ico=0}}return old.apply(this,arguments)};PTV.oldIcon=old}
