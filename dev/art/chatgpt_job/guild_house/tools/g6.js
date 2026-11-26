/* ===== v666 · บ้านกิลด์โฉมใหม่ (ภาพวาดชุดใหม่ 10 ภาพ) =====
   - hd-gh.webp ตึกหลัก/ประตู/หอมุม/อาคาร/ของแต่ง/อนุสาวรีย์ · hd-gh-w.webp แถบกำแพงต่อกันไร้รอย · hd-gh-t.webp ลายพื้น ดิน ไม้กระดาน หินปู หินอ่อน
   - จุดใช้งานเดิมคงที่ (คลัง โกดัง ครัว ค่ายทหาร กระดาน ฟาร์ม สวนผลไม้ ป้อม ทางเดินบนกำแพง) · ของแต่งจัดเป็นกลุ่มตามขั้น · อนุสาวรีย์ตรากิลด์
   - ธงขาวทุกผืนย้อมเป็นสีกิลด์ด้วยมาสก์ · ใช้เมื่อเปิดภาพ HD · โหลดไม่ได้ = ภาพเดิม · ปิด: G6.on=0 */
const G6={M:__M__,W:__W__,T:__T__,I:{},ok:0,on:1,tc:{},L:[],C:[],bh:0};
function g6Load(){if(G6.I.a||!G6.on)return;let n=0;[['a','hd-gh.webp'],['w','hd-gh-w.webp'],['t','hd-gh-t.webp']].forEach(([k,s])=>{const im=new Image();im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{if(++n===3&&G6.ok===0)G6.ok=1})};im.onerror=()=>{G6.ok=-1};im.src=s;G6.I[k]=im})}
function g6ok(){try{return !!G6.on&&G6.ok===1&&HDI.on&&!lqHD()}catch(e){return false}}
const g6Cut=(img,r,fl)=>{const cv=document.createElement('canvas');cv.width=r[2];cv.height=r[3];const c=cv.getContext('2d');if(fl){c.translate(r[2],0);c.scale(-1,1)}c.drawImage(img,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return cv};
const g6Tex=k=>G6.tc['t'+k]||(G6.tc['t'+k]=g6Cut(G6.I.t,G6.T[k]));
const g6Wl=(k,fl)=>G6.tc['w'+k+(fl?1:0)]||(G6.tc['w'+k+(fl?1:0)]=g6Cut(G6.I.w,G6.W[k].r,fl));
function g6Spr(k,col){const m=G6.M[k];if(!m||!m.m)return null;const key='s'+k+col;if(G6.tc[key])return G6.tc[key];const r=m.r,cv=g6Cut(G6.I.a,r),x=cv.getContext('2d');
  const tc=document.createElement('canvas');tc.width=r[2];tc.height=r[3];const y=tc.getContext('2d'),q=m.m;y.drawImage(G6.I.a,q[0],q[1],q[2],q[3],0,0,r[2],r[3]);y.globalCompositeOperation='source-in';y.fillStyle=ghShade(col,.25);y.fillRect(0,0,r[2],r[3]);
  x.globalCompositeOperation='multiply';x.drawImage(tc,0,0);x.globalCompositeOperation='destination-in';x.drawImage(G6.I.a,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return G6.tc[key]=cv}
const G6HW=[0,300,330,380,420,480];
/* ผังของแต่ละขั้น: [ชื่อภาพ, x, ฐาน y, กว้าง, {fl กลับด้าน · c รัศมีกันชน · gl แสง}] */
function g6Lay(t){const L=[],P=(k,x,y,w,o)=>L.push([k,x,y,w,o||{}]),lo=t<=2;
  P('HALL_T'+t,0,-290,G6HW[t],{gl:1});
  P('GUILD_MONUMENT',205,296,118,{c:34,gl:1,mon:1});
  P(lo?'TREASURY_LO':'TREASURY_HI',-430,-146,lo?200:196,{gl:1});
  P(lo?'WAREHOUSE_LO':'WAREHOUSE_HI',470,100,lo?196:186,{gl:1});
  P(lo?'KITCHEN_LO':'KITCHEN_HI',470,340,lo?204:196,{gl:1,ki:1});
  P(lo?'BARRACKS_LO':'BARRACKS_HI',-450,240,lo?236:228);
  P('GUILD_BOARD',GHBD.x,GHBD.y,100,{gl:1,bd:1});
  /* ลานกลาง */
  if(t<=2)P('CAMPFIRE_RING',0,22+(t===1?180:196)*.714*.42,t===1?180:196,{gl:1,fire:1});
  else if(t<5){const w=t===3?212:228;P('STATUE_FOUNTAIN',0,22+w*1.04*.3,w,{ftn:1})}
  else P('CRYSTAL_FOUNTAIN',0,22+216*1.17*.3,216,{gl:1,ftn:1});
  /* โคมทางเดิน */
  GHLP(t).forEach(([x,y])=>{if(t<=3)P('LANTERN_WOOD',x,y+2,40,{fl:x>0,gl:1});else if(t===4)P('STANDING_TORCH',x,y+2,26,{gl:1});else P('LANTERN_GOLD',x,y+2,24,{gl:1})});
  P('BANNER_POLE',-128,-108,46,{c:8});P('BANNER_POLE',128,-108,46,{fl:1,c:8});
  /* ลานฝึก (ซ้ายล่าง) */
  P('TRAINING_DUMMY',-470,300,48);P('TRAINING_DUMMY',-410,316,48,{fl:1});P('WEAPON_RACK',-336,306,64,{c:18});
  if(t>=2)P('ARCHERY_TARGET',-548,370,50,{c:14});
  if(t>=3)P('ARMOR_STAND',-278,336,50,{c:14});
  /* มุมบนซ้าย/ขวา */
  if(lo){P('HAY_BALES',-522,-392,62,{c:18});P('FIREWOOD_PILE',-458,-396,54,{c:16})}else{P('BARREL_STACK',-522,-392,50,{c:17});P('CRATE_STACK',-462,-396,52,{c:17})}
  P('CRATE_STACK',476,-396,52,{c:17});P('BARREL_STACK',536,-392,50,{c:17});
  /* ข้างตึกหลัก */
  if(t===1)P('SUPPLY_CART',-252,-206,100,{c:24});else if(t<=4)P('ANVIL_FORGE',-258,-204,74,{c:22,gl:1});else P('POTTED_TREE',-262,-202,52,{c:16});
  if(t>=3)P('POTTED_TREE',262,-202,52,{c:16,fl:1});
  if(t===4){P('STANDING_TORCH',-236,-288,26,{gl:1});P('STANDING_TORCH',236,-288,26,{gl:1})}
  if(t===5){P('LANTERN_GOLD',-262,-286,24,{gl:1});P('LANTERN_GOLD',262,-286,24,{gl:1})}
  /* ข้างลานกลาง */
  if(t>=2&&t<=4)P('WELL',256,12,72,{c:24});if(t===5)P('FLOWER_BUSH',256,12,62,{c:18});
  if(t>=3){P('BENCH',-188,134,64,{c:16});P('BENCH',188,134,64,{fl:1,c:16})}
  /* ล่างซ้าย/ล่างขวา */
  if(t<=2)P('WAR_DRUM',-205,306,56,{c:18});else if(t===3)P('FLOWER_BUSH',-205,302,62,{c:18});else if(t===4)P('WAR_DRUM',-205,306,58,{c:18});else{P('ROSE_ARCH',-205,306,74);P('FLOWER_BUSH',-140,330,44,{c:12})}
  if(t===3||t===5){P('FLOWER_PLANTER',-165,396,84,{c:14});P('FLOWER_PLANTER',165,396,84,{c:14})}else if(t===4){P('CRATE_STACK',-165,398,50,{c:16});P('BARREL_STACK',165,398,48,{c:16})}
  if(lo)P('FIREWOOD_PILE',548,404,50,{fl:1});
  /* หอมุม */
  const TW=(k,x,y,w)=>P(k,x,y,w,{fl:x>0,tw:1});
  if(t<=2){TW('TOWER_T12',-588,-436,96);TW('TOWER_T12',588,-436,96);if(t===2){TW('TOWER_T12',-588,458,92);TW('TOWER_T12',588,458,92)}}
  else{const k=t===5?'TOWER_T5':'TOWER_T34',w=t===5?92:104;[[-600,-438],[600,-438],[-600,460],[600,460]].forEach(([x,y])=>TW(k,x,y,w));if(t>=4){TW(k,-600,22,w*.9);TW(k,600,22,w*.9)}}
  P('GATE_T'+t,0,452,[0,236,250,256,262,272][t],{gl:1});
  return L}
function g6Build(t,col,em){const S=1.2,X0=-690,Y0=-800,WD=1380,HT=1310;
  const cv=document.createElement('canvas');cv.width=Math.round(WD*S);cv.height=Math.round(HT*S);const c=cv.getContext('2d');c.scale(S,S);c.translate(-X0,-Y0);try{c.imageSmoothingQuality='high'}catch(e){}
  let sd=6661+t*31;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647,RR=(a,b)=>a+rn()*(b-a);
  const A=G6.I.a,M=G6.M,cD=ghShade(col,-.45),cL=ghShade(col,.35),WH=ghWH(t);
  const E=(x,y,rx,ry,f,s,lw)=>{c.beginPath();c.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,7);if(f){c.fillStyle=f;c.fill()}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.stroke()}};
  const soft=(x,y,rx,ry,a)=>{c.save();c.translate(x,y);c.scale(1,ry/rx);const gr=c.createRadialGradient(0,0,rx*.2,0,0,rx);gr.addColorStop(0,'rgba(10,6,16,'+(a||.38)+')');gr.addColorStop(1,'rgba(10,6,16,0)');c.fillStyle=gr;c.beginPath();c.arc(0,0,rx,0,7);c.fill();c.restore()};
  const blob=(x,y,r,rgb,a)=>{const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+rgb+','+a+')');gr.addColorStop(1,'rgba('+rgb+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  const pat=(src,sc,ox,oy)=>{const p=c.createPattern(src,'repeat');p.setTransform(new DOMMatrix().translate(ox||0,oy||0).scale(sc));return p};
  const tuft=(x,y,s2)=>{const G=t>=3?['#4f6b34','#5f7d3c','#3f5a2a','#6e8c46']:['#5d8c36','#6fa042','#4a7a2c','#86b452'];c.lineCap='round';for(let k=0;k<5;k++){const bx=x+(k-2)*1.7*s2,tx=x+(k-2)*2.8*s2+RR(-1,1)*s2,ty=y-RR(5,10)*s2;c.strokeStyle='#1e2414';c.lineWidth=2.4*s2;c.beginPath();c.moveTo(bx,y);c.quadraticCurveTo(bx,y-4*s2,tx,ty);c.stroke();c.strokeStyle=G[k%4];c.lineWidth=1.2*s2;c.beginPath();c.moveTo(bx,y);c.quadraticCurveTo(bx,y-4*s2,tx,ty);c.stroke()}};
  const PV=(x0,y0,x1,y1,k,sc,tint,bc)=>{c.save();c.fillStyle='rgba(0,0,0,.26)';c.fillRect(x0-4,y0-2,x1-x0+8,y1-y0+6);c.fillStyle=pat(g6Tex(k),sc,x0,y0);c.fillRect(x0,y0,x1-x0,y1-y0);if(tint){c.fillStyle=tint;c.fillRect(x0,y0,x1-x0,y1-y0)}
    const e1=c.createLinearGradient(x1,0,x1-9,0);e1.addColorStop(0,'rgba(0,0,0,.3)');e1.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=e1;c.fillRect(x1-9,y0,9,y1-y0);const e2=c.createLinearGradient(0,y1,0,y1-7);e2.addColorStop(0,'rgba(0,0,0,.28)');e2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=e2;c.fillRect(x0,y1-7,x1-x0,7);
    c.strokeStyle=bc||'#24242a';c.lineWidth=1.6;c.strokeRect(x0,y0,x1-x0,y1-y0);c.strokeStyle='rgba(255,255,255,.16)';c.lineWidth=1;c.beginPath();c.moveTo(x0+1.6,y1-1.6);c.lineTo(x0+1.6,y0+1.6);c.lineTo(x1-1.6,y0+1.6);c.stroke();c.restore()};
  /* ================= พื้น ================= */
  const F0=(k,sc,tint)=>{c.fillStyle=pat(g6Tex(k),sc,-600,-470);c.fillRect(-600,-470,1200,900);if(tint){c.fillStyle=tint;c.fillRect(-600,-470,1200,900)}};
  if(t<=3){F0('dirt',.9,t===3?'rgba(70,72,66,.3)':t===2?'rgba(30,20,10,.06)':null);for(let i=0;i<60;i++)blob(RR(-600,600),RR(-470,430),RR(40,140),rn()<.5?'255,236,190':'40,26,12',RR(.03,.07));for(let i=0;i<(t===3?50:36);i++)blob(RR(-600,600),RR(-470,430),RR(24,70),'70,110,40',RR(.08,.16))}
  else if(t===4)F0('cobble',.82,'rgba(24,26,32,.16)');else F0('marble',.9);
  const PS=[[0,-300,0,440],[0,-78,-430,-78],[0,-88,420,-88]];
  if(t<=2){c.save();c.lineCap='round';c.lineJoin='round';try{c.filter='blur(7px)'}catch(e){}const st=(w,s2,a)=>{c.globalAlpha=a;c.strokeStyle=s2;c.lineWidth=w;c.beginPath();PS.forEach(p=>{c.moveTo(p[0],p[1]);c.lineTo(p[2],p[3])});c.ellipse(0,22,112,84,0,0,7);c.stroke()};st(104,'#d8b888',.2);st(40,'#ecd2a4',.13);c.beginPath();c.ellipse(0,22,128,96,0,0,7);c.fillStyle='rgba(226,196,146,.2)';c.fill();try{c.filter='none'}catch(e){}c.restore()
    if(t===2)PV(-42,-300,42,432,'planks',.62,'rgba(40,24,10,.08)')}
  else if(t===3){PV(-54,-300,54,432,'cobble',.8);PV(-432,-112,-54,-44,'cobble',.8);PV(54,-120,422,-56,'cobble',.8)}
  else if(t===4){PV(-58,-300,58,432,'cobble',.95,'rgba(255,250,240,.08)');PV(-432,-112,-58,-44,'cobble',.95,'rgba(255,250,240,.08)');PV(58,-120,422,-56,'cobble',.95,'rgba(255,250,240,.08)')}
  else{PV(-432,-112,-48,-44,'marble',.55,'rgba(190,150,80,.14)','#b08a48');PV(48,-120,422,-56,'marble',.55,'rgba(190,150,80,.14)','#b08a48');
    c.fillStyle='rgba(0,0,0,.18)';c.fillRect(-48,-298,96,734);const gr=c.createLinearGradient(-44,0,44,0);gr.addColorStop(0,cD);gr.addColorStop(.18,col);gr.addColorStop(.5,cL);gr.addColorStop(.82,col);gr.addColorStop(1,cD);c.fillStyle=gr;c.fillRect(-44,-300,88,736);
    c.fillStyle='#e8c060';c.fillRect(-44,-300,5,736);c.fillRect(39,-300,5,736);c.fillStyle='rgba(255,240,180,.6)';c.fillRect(-42,-300,1.5,736);c.fillRect(41,-300,1.5,736);
    for(let y=-270;y<420;y+=56){c.fillStyle='#e8c060';c.beginPath();c.moveTo(0,y-14);c.lineTo(12,y);c.lineTo(0,y+14);c.lineTo(-12,y);c.closePath();c.fill();c.fillStyle=cD;c.beginPath();c.moveTo(0,y-8);c.lineTo(7,y);c.lineTo(0,y+8);c.lineTo(-7,y);c.closePath();c.fill()}}
  /* ลานกลาง */
  if(t>=3){E(0,26,140,106,'rgba(0,0,0,.22)');c.save();c.beginPath();c.ellipse(0,22,132,100,0,0,7);c.clip();c.fillStyle=pat(g6Tex(t===5?'marble':'cobble'),t===5?.5:.7,0,22);c.fillRect(-140,-90,280,220);const rg=c.createLinearGradient(-130,-80,130,120);rg.addColorStop(0,'rgba(255,246,220,.12)');rg.addColorStop(1,'rgba(0,0,0,.18)');c.fillStyle=rg;c.fillRect(-140,-90,280,220);c.restore();
    E(0,22,132,100,null,'#24242a',1.6);E(0,22,122,92,null,cD,4.4);E(0,22,122,92,null,col,2.6);E(0,22,122.6,92.4,null,'rgba(255,255,255,.22)',.7);for(let i=0;i<16;i++){const a=i/16*6.283,x=Math.cos(a)*122,y=22+Math.sin(a)*92;E(x,y,3.4,2.5,'#c8964a','#2a1a0c',1);E(x-.8,y-.7,1.2,.8,'rgba(255,240,200,.75)')}}
  /* หญ้าริมกำแพง/หินเล็ก */
  if(t<=3){for(let i=0;i<(t===3?260:420);i++){const e=rn();let x,y;if(e<.3){x=RR(-596,-548);y=RR(-460,425)}else if(e<.6){x=RR(548,596);y=RR(-460,425)}else if(e<.8){x=RR(-596,596);y=RR(-462,-424)}else{x=RR(-596,596);y=RR(396,428)}if(Math.abs(x)<70&&y>380)continue;tuft(x,y,RR(.75,1.2))}
    for(let i=0;i<60;i++){const x=RR(-560,560),y=RR(-420,400);if(Math.abs(x)<80||Math.hypot(x,(y-22)*1.3)<160)continue;tuft(x,y,RR(.7,1))}}
  /* แปลงผัก (ภาพแปลงดินมองจากบน) + รั้ว */
  {const n=GHPLOT[t],q=M.FARM_PLOT.r;for(let i=0;i<n;i++){const P=ghPlot(i);soft(P.x+50,P.y+42,58,8,.3);c.drawImage(A,q[0],q[1],q[2],q[3],P.x-5,P.y-4,106,48)}
    for(let x=326;x<=570;x+=24){soft(x+1,-260,5,2,.3);const gp=c.createLinearGradient(x-2.5,0,x+2.5,0);gp.addColorStop(0,'#5a3a1e');gp.addColorStop(.4,'#9a7046');gp.addColorStop(1,'#4a2e16');c.fillStyle=gp;c.fillRect(x-2.5,-276,5,16);c.fillStyle='#b88a58';c.beginPath();c.moveTo(x-2.5,-276);c.lineTo(x,-280);c.lineTo(x+2.5,-276);c.fill()}
    const gr2=c.createLinearGradient(0,-271,0,-266);gr2.addColorStop(0,'#a87a4a');gr2.addColorStop(1,'#6a4626');c.fillStyle=gr2;c.fillRect(326,-271,244,3.5);c.fillRect(326,-265,244,2.5)}
  /* พื้นใต้สวนผลไม้ */
  if(t<3)[[-540,76],[-460,76]].forEach(([a,b])=>{soft(a,b+2,22,6,.3);const gr=c.createRadialGradient(a-3,b-1,1,a,b,12);gr.addColorStop(0,'#c8a070');gr.addColorStop(1,'#6a4626');c.fillStyle=gr;c.beginPath();c.ellipse(a,b,12,6,0,0,7);c.fill()});else{const nt=[0,0,0,2,4,6][t];for(let i=0;i<nt;i++){const[a,b]=GHTP[i];E(a,b+2,28,10,'rgba(70,50,26,.35)')}}
  /* เงาใต้กำแพง + ถนนนอกประตู */
  {const gN=c.createLinearGradient(0,-470,0,-430);gN.addColorStop(0,'rgba(15,10,6,.42)');gN.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gN;c.fillRect(-600,-470,1200,40);
    const gW=c.createLinearGradient(-600,0,-566,0);gW.addColorStop(0,'rgba(15,10,6,.34)');gW.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gW;c.fillRect(-600,-470,34,900);
    const gE=c.createLinearGradient(600,0,566,0);gE.addColorStop(0,'rgba(15,10,6,.34)');gE.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gE;c.fillRect(566,-470,34,900);
    const gr=c.createLinearGradient(0,430,0,510);gr.addColorStop(0,t>=3?'rgba(150,144,128,1)':'rgba(165,140,99,1)');gr.addColorStop(1,'rgba(150,130,90,0)');c.fillStyle=gr;c.fillRect(-50,430,100,80)}
  /* ================= กำแพง ================= */
  const Hs=t===1?60:WH+14,HW=G6.W['H'+t],hr=HW.r,hs=Hs/(hr[3]*HW.base),WK=t===2?'planks':t===5?'marble':'cobble';
  const walk=(xa,xb,yb)=>{if(t<2)return;const y0=yb-WH-46,y1=yb-WH+6;c.fillStyle='rgba(0,0,0,.4)';c.fillRect(xa,y0-3,xb-xa,y1-y0+3);c.fillStyle=pat(g6Tex(WK),t===2?.5:.6,0,y0);c.fillRect(xa,y0,xb-xa,y1-y0);c.fillStyle='rgba(20,16,12,.22)';c.fillRect(xa,y0,xb-xa,y1-y0);c.fillStyle='rgba(0,0,0,.35)';c.fillRect(xa,y0,xb-xa,4);c.strokeStyle='#24242a';c.lineWidth=1.4;c.beginPath();c.moveTo(xa,y0);c.lineTo(xb,y0);c.stroke()};
  const hWall=(xa,xb,yb)=>{const top=yb-Hs;soft((xa+xb)/2,yb+3,(xb-xa)/2+6,9,.3);c.save();c.beginPath();c.rect(xa,top,xb-xa,hr[3]*hs);c.clip();c.fillStyle=pat(g6Wl('H'+t),hs,-600,top);c.fillRect(xa,top,xb-xa,hr[3]*hs);c.restore()};
  const vWall=x=>{const k='V'+t,r=G6.W[k].r,Wv=t===1?30:40,sv=Wv/r[2],lift=t===1?Hs-14:WH,ya=-470-lift-46,yb=430-lift+6,ot=x<0?-1:1;
    c.fillStyle='rgba(10,8,8,.26)';c.fillRect(x-ot*Wv/2-(ot<0?0:18),-470,18,900);c.fillStyle=pat(g6Wl(k,x<0),sv,x-Wv/2,ya);c.fillRect(x-Wv/2,ya,Wv,yb-ya);
    const gs=c.createLinearGradient(x-ot*Wv/2,0,x-ot*(Wv/2-9),0);gs.addColorStop(0,'rgba(0,0,0,.36)');gs.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gs;c.fillRect(Math.min(x-ot*Wv/2,x-ot*(Wv/2-9)),ya,9,yb-ya);c.strokeStyle='#24242a';c.lineWidth=1.3;c.strokeRect(x-Wv/2,ya,Wv,yb-ya)};
  walk(-600,600,-470);hWall(-600,600,-470);vWall(-600);vWall(600);
  /* ================= ของทุกชิ้น เรียงตามความลึก ================= */
  const Q=[],add=(by,fn)=>Q.push([by,fn]),GL=[],CO=[];GHS.ks=null;G6.bh=0;
  /* บันไดขึ้นกำแพง */
  if(t>=2){const Ln=ghWL(t).n-15,N=9,OL=t===2?'#1e140c':'#24242a',sc=t===2?'#8a6038':t===3?'#8e8c86':t===4?'#76777b':'#d6ccb8';[-1,1].forEach(sg=>{const x0=sg<0?-408:368,x1=x0+40;add(-392,()=>{soft((x0+x1)/2,-392,30,7,.35);
      const sy=ly=>ly-Math.max(0,(-392-ly)/82*Ln),top=sy(-474);c.fillStyle=t===2?'#3a2414':'#34343a';c.fillRect(x0-4,top,x1-x0+8,-392-top);
      for(let k=N-1;k>=0;k--){const la=-392-k*82/N,lb=-392-(k+1)*82/N,ya2=sy(la),yb2=sy(lb),rz=Ln/N;c.fillStyle=ghShade(sc,-.3);c.fillRect(x0,ya2-rz,x1-x0,rz);c.fillStyle=ghShade(sc,k%2?.06:-.04);c.fillRect(x0,yb2,x1-x0,ya2-rz-yb2);c.fillStyle='rgba(255,255,255,.18)';c.fillRect(x0,yb2,x1-x0,1.2);c.strokeStyle=OL;c.lineWidth=1.1;c.strokeRect(x0,yb2,x1-x0,ya2-yb2)}
      [x0-4,x1].forEach(rx=>{c.fillStyle=ghShade(sc,-.15);c.fillRect(rx,top-6,4,-392-top+6);c.strokeStyle=OL;c.lineWidth=1.2;c.strokeRect(rx,top-6,4,-392-top+6)})})})}
  /* ไม้หุ่นไล่กา/บัวรดน้ำของชุดเดิม (ถ้าโหลดไว้) */
  try{if(GHPLOT[t]>0&&GQI.ok===1&&GQI.img)[['fm_scare',312,-198,46],['fm_water',306,-118,42]].forEach(([k,x,by,w])=>{const q=GQD.f[k];if(!q)return;const h=w*q[3]/q[2];add(by,()=>{soft(x+2,by-2,w*.4,5,.3);c.drawImage(GQI.img,q[0],q[1],q[2],q[3],x-w/2,by-h,w,h)})})}catch(e){}
  g6Lay(t).forEach(([k,x,by,w,o])=>{const m=M[k];if(!m)return;const r=m.r,h=w*r[3]/r[2],y0=by-h*m.b,x0=x-w/2,fl=!!o.fl;
    if(o.c)CO.push([x,by-8,o.c]);
    if(o.gl&&m.g)m.g.forEach(([fx,fy,n])=>{if(n<60&&!(k.startsWith('LANTERN')||k==='STANDING_TORCH'))return;if(n<20)return;GL.push([x0+(fl?1-fx:fx)*w,y0+fy*h,Math.max(16,Math.min(60,w*.22+Math.sqrt(n)*.8)),k==='CRYSTAL_FOUNTAIN'?'140,220,255':'255,180,90',rn()*6])});
    if(o.ki){const q=k==='KITCHEN_HI'?[.747,.12]:[.5,.72];GHS.ks=[x0+q[0]*w,y0+q[1]*h]}
    if(o.bd)G6.bh=h;if(o.fire&&m.g)G6.fy=y0+m.g[0][1]*h;if(o.ftn)G6.fy=y0+h*(k==='CRYSTAL_FOUNTAIN'?.7:.66);
    add(by,()=>{if(w>=86&&!o.tw){try{const sc=document.createElement('canvas');sc.width=Math.max(6,Math.ceil(w*.1));sc.height=Math.max(6,Math.ceil(h*.1));const s2=sc.getContext('2d');s2.drawImage(A,r[0],r[1],r[2],r[3],0,0,sc.width,sc.height);s2.globalCompositeOperation='source-in';s2.fillStyle='#0c0a10';s2.fillRect(0,0,sc.width,sc.height);
        c.save();c.globalAlpha=.22;c.translate(x0,by);c.transform(1,0,-.62,.36,0,0);c.drawImage(sc,-w*.03,-h*1.02,w*1.06,h*1.04);c.restore()}catch(e){}}
      if(!o.ftn)soft(x+w*.03,by-3,w*.47,Math.max(4,w*.09),.34);else soft(x,by-h*.12,w*.5,w*.16,.3);
      const img=g6Spr(k,col);c.save();if(fl){c.translate(x,0);c.scale(-1,1);c.translate(-x,0)}if(img)c.drawImage(img,x0,y0,w,h);else c.drawImage(A,r[0],r[1],r[2],r[3],x0,y0,w,h);c.restore();
      if(o.mon&&m.disk){const d=m.disk,cx=x0+d[0]*w,cy=y0+d[1]*h,rx=d[2]*w,ry=d[3]*h;const gr=c.createRadialGradient(cx-rx*.3,cy-ry*.3,1,cx,cy,rx);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,ghShade(col,.55));c.fillStyle=gr;c.beginPath();c.ellipse(cx,cy,rx*.97,ry*.97,0,0,7);c.fill();c.strokeStyle=col;c.lineWidth=2.4;c.beginPath();c.ellipse(cx,cy,rx*.84,ry*.84,0,0,7);c.stroke();
        c.font='bold '+Math.round(ry*1.15)+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,cx,cy+1);c.textBaseline='alphabetic'}})});
  Q.sort((a,b)=>a[0]-b[0]);Q.filter(q=>q[0]<430).forEach(q=>q[1]());
  const gw=[0,236,250,256,262,272][t]*.4;walk(-600,-gw,430);walk(gw,600,430);hWall(-600,-gw,430);hWall(gw,600,430);
  Q.filter(q=>q[0]>=430).forEach(q=>q[1]());
  G6.L=GL;G6.C=CO;return{cv,S,X0,Y0,WD,HT}}
/* ---------- ต่อเข้าระบบเดิม ---------- */
ghBuild=(f=>function(t,col,em){GHS.g6=0;if(g6ok()){try{const r=g6Build(t,col,em);GHS.hd=1;GHS.gq=1;GHS.g6=1;const hw=G6HW[t]*.43;GHR[0][0]=-hw;GHR[0][2]=hw;return r}catch(e){console.warn('g6',e)}}return f.apply(this,arguments)})(ghBuild);
ghCols=(f=>function(){const L=f.apply(this,arguments);try{if(GHS.g6&&GHS.hd){const t=ghT(),D=GHDEC(t);for(let i=L.length-1;i>=0;i--){const e=L[i];if(D.some(d=>d[0]===e[0]&&d[1]===e[1]&&d[2]===e[2]))L.splice(i,1)}if(L[0])L[0][2]=[0,56,60,92,96,94][t];G6.C.forEach(d=>L.push(d))}}catch(e){}return L})(ghCols);
function g6Live(t,now){const X=1600,Y=1600;g.save();g.globalCompositeOperation='lighter';
  G6.L.forEach(([x,y,r,rgb,ph])=>{if(inView(X+x,Y+y,r+20))glowAt(X+x,Y+y,r,rgb,.36+.1*Math.sin(now*7+ph))});
  if(t<=2){const fy=G6.fy||-10;glowAt(X,Y+fy,80,'255,140,60',.4+.12*Math.sin(now*9));for(let k=0;k<7;k++){const q=(now*1.2+k/7)%1;g.fillStyle='rgba(255,'+(160+k*12)+',60,'+(.8*(1-q))+')';g.beginPath();g.arc(X+Math.sin(now*3+k*2)*10,Y+fy+6-q*60,2*(1-q)+.6,0,7);g.fill()}}
  else{const fy=G6.fy||40;for(let k=0;k<12;k++){const q=(now*.8+k/12)%1,a=k/12*6.283;g.fillStyle='rgba(200,240,255,'+(.7*(1-q))+')';g.beginPath();g.arc(X+Math.cos(a)*q*50,Y+fy-q*12+Math.sin(a)*q*16,1.8,0,7);g.fill()}glowAt(X,Y+fy-20,56,'140,220,255',t===5?.26:.14)}
  g.restore();if(inView(X+GHBD.x,Y+GHBD.y-90,80)){g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText('📜 กระดานกิลด์',X+GHBD.x,Y+GHBD.y-(G6.bh||100)-6)}}
ghLiveHD=(f=>function(t,now){if(GHS.g6&&GHS.hd)return g6Live(t,now);return f.apply(this,arguments)})(ghLiveHD);
ghEnter=(f=>function(){try{g6Load()}catch(e){}return f.apply(this,arguments)})(ghEnter);
setInterval(()=>{try{if(!ghHere())return;g6Load();if(g6ok()!==!!GHS.g6)GHS.C=null}catch(e){}},700);
