/* ===== v456 · บ้านกิลด์ HD — ยกระดับภาพทั้งบ้าน =====
   - ใช้สไปรต์ภาพวาด HD ชุดเดียวกับค่าย/นคร/ป้อมเมฆ (hd-camp · hd-fort · hd-city · hd-city2) วาดลงแคชตามขั้นบ้าน
   - พื้นมีพื้นผิว (ดินอัดเป็นด่าง ๆ · หญ้าริมกำแพง · ทางเดินสึก · ร่องล้อ · หินปูถนนมีแสงเงา · แผ่นหินอ่อน · พรมขอบทอง) + เงาใต้กำแพง
   - กำแพงวาดใหม่: รั้วไม้มีแสงเงา · ซุงทรงกระบอกปลายตัด · ก้อนหินขนาดไม่เท่ากันมีไฮไลต์/มอส · ใบเสมามีมิติ · ธงแขวนสีกิลด์ (ขั้น 3+)
   - หอมุม/ประตูเป็นหอหินภาพวาด · ขั้น 5 ประตูดาว · อาคาร: เต็นท์บัญชาการ → บ้านหลังคาม่วง → โถงหลังคาน้ำเงิน+หอคู่ → พระราชวัง
   - ใช้เมื่อเปิดภาพ HD และไม่ใช่โหมดประหยัด · ไม่งั้นใช้ภาพเวกเตอร์เดิม */
try{GHTP.forEach(p=>{if(p[1]===112)p[1]=100})}catch(e){}
const ghHDok=()=>{try{return HDI.on&&!LOWQ&&HDI.ok===1&&HDI.ok2===1&&FHI.ok===1&&CHI.ok===1}catch(e){return false}};
function ghHDload(){try{if(!HDI.on||LOWQ)return;hdLoad();hdbLoad();fhdLoad();chdLoad()}catch(e){}}
const GHLP=t=>t<=1?[[-70,300],[70,300],[-70,-200],[70,-200]]:[[-70,360],[70,360],[-70,190],[70,190],[-70,-200],[70,-200],[-330,-60],[330,-60]];
const GHDEC=t=>{const L=[];if(t>=3)L.push([-175,120,16],[175,120,16]);if(t>=4)L.push([-232,150,24],[232,150,24]);if(t>=5)L.push([-150,322,20],[150,322,20]);return L};
function ghBuildHD(t,col,em){const S=1.2,X0=-690,Y0=-800,WD=1380,HT=1310;
  const cv=document.createElement('canvas');cv.width=Math.round(WD*S);cv.height=Math.round(HT*S);const c=cv.getContext('2d');c.scale(S,S);c.translate(-X0,-Y0);try{c.imageSmoothingQuality='high'}catch(e){}
  let sd=7771+t*53;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647,RR=(a,b)=>a+rn()*(b-a);
  const O='#1a120a',cD=ghShade(col,-.45),cL=ghShade(col,.35);
  const P=(p,f,s,lw)=>{c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)c.lineTo(p[i],p[i+1]);c.closePath();if(f){c.fillStyle=f;c.fill()}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.stroke()}};
  const Rc=(x,y,w,h,f,s,lw)=>{if(f){c.fillStyle=f;c.fillRect(x,y,w,h)}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.strokeRect(x,y,w,h)}};
  const E=(x,y,rx,ry,f,s,lw)=>{c.beginPath();c.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,7);if(f){c.fillStyle=f;c.fill()}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.stroke()}};
  const blob=(x,y,r,rgb,a)=>{const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+rgb+','+a+')');gr.addColorStop(1,'rgba('+rgb+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  const soft=(x,y,rx,ry,a)=>{c.save();c.translate(x,y);c.scale(1,ry/rx);const gr=c.createRadialGradient(0,0,rx*.2,0,0,rx);gr.addColorStop(0,'rgba(10,6,16,'+(a||.38)+')');gr.addColorStop(1,'rgba(10,6,16,0)');c.fillStyle=gr;c.beginPath();c.arc(0,0,rx,0,7);c.fill();c.restore()};
  const AT={a:[HDI.img,AHD.f],b:[HDI.img2,AHB.f],f:[FHI.img,FHD.f],c:[CHI.img,CHD.f]};
  const spr=(at,id,x,by,w,fl)=>{const A=AT[at],q=A[1][id];if(!q)return 0;const h=w*q[3]/q[2];if(fl){c.save();c.translate(x,by);c.scale(-1,1);c.drawImage(A[0],q[0],q[1],q[2],q[3],-w/2,-h,w,h);c.restore()}else c.drawImage(A[0],q[0],q[1],q[2],q[3],x-w/2,by-h,w,h);return h};
  const L=[],add=(by,fn)=>L.push([by,fn]),SP=(at,id,x,by,w,o)=>{o=o||{};add(by,()=>{if(o.sh!==0)soft(x+w*.04,by-3,w*(o.sh||.46),w*.12,o.sa);if(o.flt){try{c.filter=o.flt}catch(e){}}spr(at,id,x,by,w,o.fl);if(o.flt){try{c.filter='none'}catch(e){}}})};
  const stone=t>=3,WH=[0,26,50,46,62,68][t],WF=t===5?'#cfc6b0':t===4?'#8a857c':'#918a79',WT=t===5?'#ebe3ce':t===4?'#a8a399':'#aea795';
  /* ================= พื้น ================= */
  if(t<=2){Rc(-600,-470,1200,900,t===1?'#7b6747':'#76613f');
    for(let i=0;i<110;i++)blob(RR(-600,600),RR(-470,430),RR(40,150),rn()<.5?'255,236,190':'40,26,12',RR(.04,.09));
    for(let i=0;i<70;i++)blob(RR(-600,600),RR(-470,430),RR(20,60),'70,110,40',RR(.05,.12));
    const path=(pts,w,col2,a)=>{c.save();c.globalAlpha=a;c.strokeStyle=col2;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.stroke();c.restore()};
    const PS=[[0,-300,0,440],[0,-78,-430,-78],[0,-88,420,-88]];
    PS.forEach(p=>path(p,116,'#5e4b30',.25));c.save();c.globalAlpha=.3;E(0,22,140,106,'#5e4b30');c.restore();
    PS.forEach(p=>path(p,98,'#a58c63',.95));E(0,22,130,98,'#a58c63');PS.forEach(p=>path(p,46,'#bba179',.45));
    for(let i=0;i<900;i++){const x=RR(-600,600),y=RR(-470,430);c.globalAlpha=RR(.18,.5);const r=RR(.8,2.6);E(x,y,r,r*.7,rn()<.5?'#4a3a24':'#c6ad80');if(rn()<.3){c.fillStyle='rgba(255,240,210,.5)';c.fillRect(x-r*.4,y-r*.5,r*.5,r*.3)}}c.globalAlpha=1;
    c.strokeStyle='rgba(70,52,30,.32)';c.lineWidth=3;[-20,20].forEach(dx=>{c.beginPath();for(let y=-290;y<=440;y+=10){const x=dx+Math.sin(y*.03)*2;y===-290?c.moveTo(x,y):c.lineTo(x,y)}c.stroke()});
    if(t===2){c.save();Rc(-41,-292,6,722,'#5a3c22');Rc(35,-292,6,722,'#5a3c22');for(let y=-290;y<428;y+=14){const gr=c.createLinearGradient(0,y,0,y+12);gr.addColorStop(0,'#9b7148');gr.addColorStop(1,'#73502f');c.fillStyle=gr;c.fillRect(-35,y,70,12);c.fillStyle='rgba(255,226,170,.28)';c.fillRect(-35,y,70,1.4);c.fillStyle='rgba(30,16,6,.55)';c.fillRect(-35,y+11,70,1.6);
      c.strokeStyle='rgba(60,36,16,.35)';c.lineWidth=.7;for(let k=0;k<3;k++){const gy=y+3+k*3;c.beginPath();c.moveTo(-33+RR(0,8),gy);c.lineTo(33-RR(0,8),gy+RR(-.6,.6));c.stroke()}c.fillStyle='#3a3a3a';[[-30,y+6],[30,y+6]].forEach(([a,b])=>{c.beginPath();c.arc(a,b,1.1,0,7);c.fill()})}c.restore()}
    /* หญ้าริมกำแพง */
    const tuft=(x,y,s)=>{const G=['#5d8c36','#6fa042','#4a7a2c','#86b452'];for(let k=0;k<5;k++){c.strokeStyle=G[(k+((x*7)|0))%4];c.lineWidth=1.3*s;c.beginPath();c.moveTo(x+k*1.6*s-3*s,y);c.quadraticCurveTo(x+k*1.6*s-3*s+RR(-2,2)*s,y-5*s,x+(k-2)*2.6*s,y-RR(6,11)*s);c.stroke()}if(rn()<.18){c.fillStyle=rn()<.5?'#fff3a8':'#ffffff';c.beginPath();c.arc(x+RR(-4,4),y-RR(5,9)*s,1.4*s,0,7);c.fill()}};
    for(let i=0;i<520;i++){const e=rn();let x,y;if(e<.3){x=RR(-598,-540);y=RR(-460,425)}else if(e<.6){x=RR(540,598);y=RR(-460,425)}else if(e<.8){x=RR(-598,598);y=RR(-462,-420)}else{x=RR(-598,598);y=RR(395,428)}if(Math.abs(x)<60&&y>380)continue;tuft(x,y,RR(.8,1.3))}
    for(let i=0;i<70;i++){const x=RR(-560,560),y=RR(-420,400);if(Math.abs(x)<70||Math.hypot(x,(y-22)*1.3)<160)continue;tuft(x,y,RR(.7,1))}}
  else{const ST=(x,y,w,h,base,vr,rr)=>{const k=(rn()-.5)*vr;const gr=c.createLinearGradient(x,y,x+w*.4,y+h);gr.addColorStop(0,ghShade(base,Math.min(.9,k+.15)));gr.addColorStop(1,ghShade(base,Math.max(-.9,k-.2)));
      c.fillStyle=gr;c.beginPath();c.roundRect(x+1,y+1,w-2,h-2,rr||3.5);c.fill();c.strokeStyle='rgba(30,26,20,.35)';c.lineWidth=.8;c.stroke()};
    const cob=(x0,y0,x1,y1,w,h,base,vr,rr)=>{for(let y=y0,r=0;y<y1;y+=h,r++)for(let x=x0-(r%2?w/2:0);x<x1;x+=w){const xa=Math.max(x0,x),xb=Math.min(x1,x+w);if(xb-xa<4)continue;const ww=xb-xa,hh=Math.min(h,y1-y);ST(xa+RR(-.6,.6),y,ww,hh,base,vr,rr)}};
    if(t===3){Rc(-600,-470,1200,900,'#827a68');for(let i=0;i<120;i++)blob(RR(-600,600),RR(-470,430),RR(40,140),rn()<.5?'255,246,220':'30,26,18',RR(.04,.08));for(let i=0;i<60;i++)blob(RR(-600,600),RR(-470,430),RR(20,50),'80,110,50',RR(.06,.12));
      for(let i=0;i<1400;i++){const x=RR(-600,600),y=RR(-470,430);c.globalAlpha=RR(.2,.5);E(x,y,RR(.8,2.2),RR(.6,1.6),rn()<.5?'#5a5446':'#b8b09c')}c.globalAlpha=1;
      c.fillStyle='rgba(0,0,0,.14)';c.fillRect(-56,-300,112,732);c.fillRect(-434,-114,434,72);c.fillRect(56,-122,368,68);
      cob(-52,-300,52,432,21,13,'#a49e90',.24);cob(-430,-110,-52,-46,21,13,'#a49e90',.24);cob(52,-118,420,-58,21,13,'#a49e90',.24)}
    else if(t===4){Rc(-600,-470,1200,900,'#5f5b54');cob(-600,-470,600,430,25,16,'#88837a',.22,4);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-62,-300,124,730);cob(-58,-300,58,430,29,18,'#a7a196',.18,5);for(let i=0;i<90;i++)blob(RR(-600,600),RR(-470,430),RR(30,110),rn()<.6?'255,250,235':'20,18,14',RR(.04,.07))}
    else{Rc(-600,-470,1200,900,'#b8ad92');for(let y=-470,r=0;y<430;y+=44,r++)for(let x=-600-(r%2?32:0);x<600;x+=64){const xa=Math.max(-600,x),xb=Math.min(600,x+64);const base=ghShade('#dcd2b8',(rn()-.5)*.1);const gr=c.createLinearGradient(xa,y,xb,y+44);gr.addColorStop(0,ghShade('#e8dfc8',(rn()-.5)*.06));gr.addColorStop(1,ghShade('#cbbf9f',(rn()-.5)*.06));c.fillStyle=gr;c.fillRect(xa+1,y+1,xb-xa-2,42);
        c.strokeStyle='rgba(150,130,100,.22)';c.lineWidth=.8;for(let v=0;v<2;v++){c.beginPath();let px=xa+RR(4,xb-xa-4),py=y+RR(4,40);c.moveTo(px,py);for(let s=0;s<4;s++){px+=RR(-10,10);py+=RR(-6,6);c.lineTo(px,py)}c.stroke()}
        c.fillStyle='rgba(255,255,255,.35)';c.fillRect(xa+1,y+1,xb-xa-2,1.2);c.fillStyle='rgba(90,76,52,.35)';c.fillRect(xa+1,y+42,xb-xa-2,1.2)}
      /* พรมสีกิลด์ */
      c.fillStyle='rgba(0,0,0,.18)';c.fillRect(-48,-298,96,734);const gr=c.createLinearGradient(-44,0,44,0);gr.addColorStop(0,cD);gr.addColorStop(.18,col);gr.addColorStop(.5,cL);gr.addColorStop(.82,col);gr.addColorStop(1,cD);c.fillStyle=gr;c.fillRect(-44,-300,88,736);
      c.fillStyle='#e8c060';c.fillRect(-44,-300,5,736);c.fillRect(39,-300,5,736);c.fillStyle='rgba(255,240,180,.6)';c.fillRect(-42,-300,1.5,736);c.fillRect(41,-300,1.5,736);
      for(let y=-270;y<420;y+=56){c.fillStyle='#e8c060';c.beginPath();c.moveTo(0,y-14);c.lineTo(12,y);c.lineTo(0,y+14);c.lineTo(-12,y);c.closePath();c.fill();c.fillStyle=cD;c.beginPath();c.moveTo(0,y-8);c.lineTo(7,y);c.lineTo(0,y+8);c.lineTo(-7,y);c.closePath();c.fill()}}
    /* ลานกลาง: วงโมเสก */
    E(0,22,138,104,'rgba(0,0,0,.18)');E(0,22,132,100,t===5?'#bdb296':'#8f8a7e');for(let i=0;i<36;i++){const a=i/36*6.283,a2=(i+1)/36*6.283;c.fillStyle=i%2?col:cL;c.beginPath();c.moveTo(Math.cos(a)*112,22+Math.sin(a)*84);c.lineTo(Math.cos(a)*130,22+Math.sin(a)*98);c.lineTo(Math.cos(a2)*130,22+Math.sin(a2)*98);c.lineTo(Math.cos(a2)*112,22+Math.sin(a2)*84);c.closePath();c.fill()}
    E(0,22,130,98,null,'rgba(255,240,200,.35)',1.2);E(0,22,112,84,t===5?'#e6ddc6':'#a6a194');E(0,22,112,84,null,'rgba(40,30,20,.35)',1)}
  /* เงาใต้กำแพง (AO) */
  {const gN=c.createLinearGradient(0,-470,0,-430);gN.addColorStop(0,'rgba(15,10,6,.42)');gN.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gN;c.fillRect(-600,-470,1200,40);
    const gW=c.createLinearGradient(-600,0,-570,0);gW.addColorStop(0,'rgba(15,10,6,.32)');gW.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gW;c.fillRect(-600,-470,30,900);
    const gE=c.createLinearGradient(600,0,570,0);gE.addColorStop(0,'rgba(15,10,6,.32)');gE.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gE;c.fillRect(570,-470,30,900)}
  /* ถนนนอกประตู */
  {const gr=c.createLinearGradient(0,430,0,510);gr.addColorStop(0,stone?'rgba(150,144,128,1)':'rgba(165,140,99,1)');gr.addColorStop(1,'rgba(150,130,90,0)');c.fillStyle=gr;c.fillRect(-50,430,100,80)}
  /* ================= แปลงผัก (กรอบไม้ + ดินร่อง) ================= */
  {const n=GHPLOT[t];for(let i=0;i<n;i++){const x=i%2?458:342,y=-252+(i>>1)*50;soft(x+50,y+42,58,8,.3);
      const gf=c.createLinearGradient(0,y-3,0,y+43);gf.addColorStop(0,'#9a7248');gf.addColorStop(1,'#6a4828');c.fillStyle=gf;c.beginPath();c.roundRect(x-4,y-3,104,46,4);c.fill();c.strokeStyle=O;c.lineWidth=.8;c.stroke();
      const gs=c.createLinearGradient(0,y,0,y+40);gs.addColorStop(0,'#4e3520');gs.addColorStop(1,'#3a2614');c.fillStyle=gs;c.fillRect(x,y,96,40);
      for(let k=0;k<4;k++){const gy=y+4+k*9;const g2=c.createLinearGradient(0,gy,0,gy+7);g2.addColorStop(0,'#7a5634');g2.addColorStop(1,'#5a3c22');c.fillStyle=g2;c.beginPath();c.roundRect(x+3,gy,90,6.5,3);c.fill();c.fillStyle='rgba(255,220,170,.18)';c.fillRect(x+5,gy+.5,86,1.2)}
      c.fillStyle='rgba(255,236,190,.35)';c.fillRect(x-3,y-2,102,1.5)}
    for(let x=326;x<=570;x+=24){soft(x+1,-260,5,2,.3);const gp=c.createLinearGradient(x-2.5,0,x+2.5,0);gp.addColorStop(0,'#5a3a1e');gp.addColorStop(.4,'#9a7046');gp.addColorStop(1,'#4a2e16');c.fillStyle=gp;c.fillRect(x-2.5,-276,5,16);P([x-2.5,-276,x,-280,x+2.5,-276],'#b88a58')}
    const gr2=c.createLinearGradient(0,-271,0,-266);gr2.addColorStop(0,'#a87a4a');gr2.addColorStop(1,'#6a4626');c.fillStyle=gr2;c.fillRect(326,-271,244,3.5);c.fillRect(326,-265,244,2.5)}
  /* ================= กำแพง ================= */
  const logV=(x,y0,y1,w,base)=>{const gr=c.createLinearGradient(x,0,x+w,0);gr.addColorStop(0,ghShade(base,-.38));gr.addColorStop(.3,ghShade(base,.18));gr.addColorStop(.55,base);gr.addColorStop(1,ghShade(base,-.45));c.fillStyle=gr;c.fillRect(x,y0,w,y1-y0)};
  const hWall=(xa,xb,y)=>{
    if(t===1){soft((xa+xb)/2,y+2,(xb-xa)/2+4,5,.25);
      [y-18,y-9].forEach(ry=>{const gr=c.createLinearGradient(0,ry,0,ry+4);gr.addColorStop(0,'#b0844f');gr.addColorStop(1,'#6a4626');c.fillStyle=gr;c.fillRect(xa,ry,xb-xa,4)});
      for(let x=xa;x<=xb;x+=26){logV(x-3.5,y-WH,y,7,'#7a5232');P([x-3.5,y-WH,x,y-WH-5,x+3.5,y-WH],'#a07448');c.fillStyle='#c8a070';c.beginPath();c.ellipse(x,y-WH-.5,3.2,1.3,0,0,7);c.fill();c.strokeStyle='#d8c090';c.lineWidth=1;c.beginPath();c.moveTo(x-4,y-15);c.lineTo(x+4,y-12);c.stroke()}return}
    soft((xa+xb)/2,y+4,(xb-xa)/2+8,10,.32);
    if(t===2){for(let x=xa;x<xb;x+=12){const hh=WH+RR(-3,4);logV(x,y-hh+5,y,12,rn()<.5?'#7a5232':'#6c4829');c.fillStyle='#b58a5a';P([x,y-hh+5,x+6,y-hh-6,x+12,y-hh+5],null);c.fill();c.fillStyle='rgba(255,220,170,.35)';P([x+2,y-hh+4,x+6,y-hh-4,x+6,y-hh+5],null);c.fill();
        c.strokeStyle='rgba(30,16,6,.35)';c.lineWidth=.7;for(let k=0;k<2;k++){const bx=x+RR(2,10);c.beginPath();c.moveTo(bx,y-hh+10);c.lineTo(bx+RR(-1,1),y-hh+RR(20,40));c.stroke()}}
      [y-WH*.38,y-WH*.78].forEach(ry=>{const gr=c.createLinearGradient(0,ry,0,ry+5);gr.addColorStop(0,'#5a4a3a');gr.addColorStop(.5,'#9a8a74');gr.addColorStop(1,'#3a2e22');c.fillStyle=gr;c.fillRect(xa,ry,xb-xa,5);for(let x=xa+6;x<xb;x+=24){c.fillStyle='#c8b896';c.beginPath();c.arc(x,ry+2.5,1.2,0,7);c.fill()}});return}
    /* หิน */
    for(let yy=y-WH,r=0;yy<y;yy+=12,r++){let x=xa-(r%2?RR(4,14):0);while(x<xb){const w=RR(16,30),x0=Math.max(xa,x),x1=Math.min(xb,x+w);if(x1-x0>2){const b=ghShade(WF,(rn()-.5)*.18),hh=Math.min(12,y-yy);c.fillStyle=b;c.fillRect(x0,yy,x1-x0,hh);c.fillStyle='rgba(255,255,255,.2)';c.fillRect(x0,yy,x1-x0,1.3);c.fillRect(x0,yy,1.2,hh);c.fillStyle='rgba(20,16,10,.38)';c.fillRect(x0,yy+hh-1.3,x1-x0,1.3);c.fillRect(x1-1.2,yy,1.2,hh);
        if(yy>y-26&&rn()<.25){c.fillStyle='rgba(80,120,50,.35)';c.beginPath();c.ellipse(x0+(x1-x0)/2,yy+hh-2,(x1-x0)/2,3,0,0,7);c.fill()}if(rn()<.06){c.strokeStyle='rgba(20,16,10,.4)';c.lineWidth=.7;c.beginPath();c.moveTo(x0+3,yy+2);c.lineTo(x0+7,yy+6);c.lineTo(x0+5,yy+10);c.stroke()}}x+=w}}
    {const gr=c.createLinearGradient(0,y-WH,0,y);gr.addColorStop(0,'rgba(255,250,235,.10)');gr.addColorStop(1,'rgba(10,8,4,.28)');c.fillStyle=gr;c.fillRect(xa,y-WH,xb-xa,WH)}
    Rc(xa,y-WH-10,xb-xa,10,WT);c.fillStyle='rgba(0,0,0,.18)';c.fillRect(xa,y-WH-2,xb-xa,2);c.fillStyle='rgba(255,255,255,.3)';c.fillRect(xa,y-WH-10,xb-xa,1.4);
    if(t===5){c.fillStyle='#e8c060';c.fillRect(xa,y-WH-1,xb-xa,2.2)}
    for(let x=xa+4;x<xb-10;x+=22){Rc(x,y-WH-19,12,9,ghShade(WT,-.06));Rc(x,y-WH-21,12,3,ghShade(WT,.12));c.fillStyle='rgba(0,0,0,.25)';c.fillRect(x+11,y-WH-19,1.2,9);c.fillStyle='rgba(255,255,255,.28)';c.fillRect(x,y-WH-21,12,1)}
    if(t>=3){for(let x=xa+70;x<xb-50;x+=170){const bx=x,by=y-WH+3,bw=26,bh=WH-14;c.fillStyle='#5a4a3a';c.fillRect(bx-bw/2-3,by-2,bw+6,3);const gb=c.createLinearGradient(bx-bw/2,0,bx+bw/2,0);gb.addColorStop(0,cD);gb.addColorStop(.4,cL);gb.addColorStop(1,cD);c.fillStyle=gb;
        c.beginPath();c.moveTo(bx-bw/2,by);c.lineTo(bx+bw/2,by);c.lineTo(bx+bw/2,by+bh);c.lineTo(bx,by+bh-8);c.lineTo(bx-bw/2,by+bh);c.closePath();c.fill();c.strokeStyle='#e8c060';c.lineWidth=1.4;c.stroke();c.font='bold 14px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,bx,by+bh*.42);c.textBaseline='alphabetic'}}};
  const vWall=(x,ya,yb)=>{if(t===1){for(let y=ya;y<=yb;y+=26){soft(x,y+1,6,2,.25);logV(x-3.5,y-WH,y,7,'#7a5232');c.fillStyle='#c8a070';c.beginPath();c.ellipse(x,y-WH,3.2,1.3,0,0,7);c.fill()}logV(x-2,ya-18,yb-18,4,'#9a6e42');return}
    const tw=t===2?14:22;c.fillStyle='rgba(10,6,4,.22)';c.fillRect(x+(x<0?tw/2:-tw/2-14),ya,14,yb-ya);
    if(t===2){logV(x-tw/2,ya-WH,yb-WH,tw,'#6a4628');for(let y=ya-WH;y<yb-WH;y+=12){const gr=c.createRadialGradient(x-1,y+5,1,x,y+6,6.5);gr.addColorStop(0,'#d2a874');gr.addColorStop(.6,'#a87c4c');gr.addColorStop(1,'#5a3a1e');c.fillStyle=gr;c.beginPath();c.ellipse(x,y+6,tw/2-.5,5.6,0,0,7);c.fill();c.strokeStyle='rgba(90,60,30,.5)';c.lineWidth=.6;c.beginPath();c.ellipse(x,y+6,3,2.4,0,0,7);c.stroke()}logV(x-tw/2,yb-WH,yb,tw,'#6a4628');return}
    const gr=c.createLinearGradient(x-tw/2,0,x+tw/2,0);gr.addColorStop(0,ghShade(WT,-.15));gr.addColorStop(.5,WT);gr.addColorStop(1,ghShade(WT,-.2));c.fillStyle=gr;c.fillRect(x-tw/2,ya-WH-10,tw,yb-ya);
    for(let y=ya-WH;y<yb-WH-10;y+=14){c.fillStyle='rgba(40,34,26,.25)';c.fillRect(x-tw/2,y,tw,1)}
    for(let y=ya-WH;y<yb-WH-16;y+=22){[x-tw/2-1,x+tw/2-6].forEach(mx=>{Rc(mx,y,7,11,ghShade(WT,.05));c.fillStyle='rgba(0,0,0,.25)';c.fillRect(mx,y+10,7,1.2)})}
    for(let yy=yb-WH-10,r=0;yy<yb;yy+=12,r++){Rc(x-tw/2,yy,tw,Math.min(12,yb-yy),ghShade(WF,(rn()-.5)*.15));c.fillStyle='rgba(0,0,0,.3)';c.fillRect(x-tw/2,yy+11,tw,1)}};
  /* หอไม้ (ขั้น 2) */
  const towerWood=(x,y,w,h)=>add(y,()=>{soft(x,y+3,w*.7,9,.35);[[-1,0],[1,0],[-1,1],[1,1]].forEach(([a,b])=>logV(x+a*w*.38-3.5,y-h+(b?16:0),y-(b?0:6),7,'#6a4628'));c.strokeStyle='#4a3018';c.lineWidth=2.4;c.beginPath();c.moveTo(x-w*.38,y-12);c.lineTo(x+w*.38,y-h*.55);c.moveTo(x+w*.38,y-12);c.lineTo(x-w*.38,y-h*.55);c.stroke();
    const gp=c.createLinearGradient(0,y-h-8,0,y-h+4);gp.addColorStop(0,'#b08250');gp.addColorStop(1,'#6a4626');c.fillStyle=gp;c.fillRect(x-w/2-2,y-h-8,w+4,12);for(let k=0;k<w;k+=7){logV(x-w/2+k,y-h-24,y-h-8,6,'#7a5232');P([x-w/2+k,y-h-24,x-w/2+k+3,y-h-28,x-w/2+k+6,y-h-24],'#a87c4c')}
    const gr=c.createLinearGradient(x-w/2,0,x+w/2,0);gr.addColorStop(0,'#7a5a2e');gr.addColorStop(.5,'#c8a060');gr.addColorStop(1,'#6a4a22');c.fillStyle=gr;P([x-w/2-8,y-h-24,x,y-h-58,x+w/2+8,y-h-24],null);c.fill();c.strokeStyle='rgba(60,40,16,.55)';c.lineWidth=.9;for(let k=1;k<7;k++){c.beginPath();c.moveTo(x-w/2-8+k*(w+16)/7,y-h-24);c.lineTo(x,y-h-58);c.stroke()}
    c.fillStyle='rgba(255,200,120,.65)';c.fillRect(x-4,y-h-20,8,8)});
  /* กำแพงเหนือ + ข้าง (วาดก่อนของทุกชิ้น) */
  hWall(-600,600,-470);vWall(-600,-470,430);vWall(600,-470,430);
  /* ================= หอคอย/ประตู ================= */
  const TW=(x,by,w)=>SP('f','tower',x,by,w,{sh:.55});
  if(t>=3){const w=t>=4?100:90;TW(-600,-440,w);TW(600,-440,w);TW(-600,456,w);TW(600,456,w);if(t>=4){TW(-600,20,w*.9);TW(600,20,w*.9)}}
  else if(t===2){towerWood(-560,-430,46,72);towerWood(560,-430,46,72)}
  /* ประตูใต้ */
  if(t===1){add(431,()=>{[-80,80].forEach(px=>{soft(px,433,9,3,.3);logV(px-5,350,432,10,'#7a5232');c.fillStyle='#c8a070';c.beginPath();c.ellipse(px,350,5,2,0,0,7);c.fill()});logV(-90,344,358,180,'#8a6038');const gs=c.createLinearGradient(0,358,0,378);gs.addColorStop(0,'#d8b880');gs.addColorStop(1,'#a8844e');c.fillStyle=gs;c.beginPath();c.roundRect(-52,360,104,20,3);c.fill();c.strokeStyle=O;c.lineWidth=.8;c.stroke();c.strokeStyle='#5a3a1e';c.lineWidth=1;c.beginPath();c.moveTo(-40,358);c.lineTo(-40,346);c.moveTo(40,358);c.lineTo(40,346);c.stroke();
    c.font='bold 13px system-ui';c.textAlign='center';c.fillStyle='#3a2410';c.fillText('บ้านกิลด์',0,375)});SP('c','lantern_post',-104,440,34);SP('c','lantern_post',104,440,34,{fl:1})}
  else if(t===2){towerWood(-96,432,44,84);towerWood(96,432,44,84);add(433,()=>{logV(-76,346,358,152,'#7a5232');const gb=c.createLinearGradient(-14,0,14,0);gb.addColorStop(0,cD);gb.addColorStop(.5,cL);gb.addColorStop(1,cD);c.fillStyle=gb;P([-14,358,14,358,14,392,0,384,-14,392],null);c.fill();c.strokeStyle='#e8c060';c.lineWidth=1.2;c.stroke();c.font='bold 13px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,0,372);c.textBaseline='alphabetic'})}
  else if(t<=4){const w=t>=4?94:86;TW(-110,452,w);TW(110,452,w);add(436,()=>{const y=430-WH;Rc(-74,y-22,148,24,WF);for(let x=-74;x<74;x+=24){c.fillStyle='rgba(255,255,255,.18)';c.fillRect(x,y-22,23,1.2);c.fillStyle='rgba(0,0,0,.3)';c.fillRect(x+23,y-22,1,24)}
      c.beginPath();c.moveTo(-68,y+4);c.quadraticCurveTo(0,y-26,68,y+4);c.lineWidth=5;c.strokeStyle=ghShade(WF,-.35);c.stroke();Rc(-78,y-30,156,8,WT);for(let x=-76;x<72;x+=18)Rc(x,y-38,11,8,WT);
      if(t>=4){c.strokeStyle='#4a4a52';c.lineWidth=2.2;for(let x=-60;x<=60;x+=12){c.beginPath();c.moveTo(x,y-8);c.lineTo(x,y+12);c.stroke()}}
      const gb=c.createLinearGradient(-16,0,16,0);gb.addColorStop(0,cD);gb.addColorStop(.5,cL);gb.addColorStop(1,cD);c.fillStyle=gb;P([-16,y-20,16,y-20,16,y+16,0,y+8,-16,y+16],null);c.fill();c.strokeStyle='#e8c060';c.lineWidth=1.3;c.stroke();c.font='bold 13px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,0,y-3);c.textBaseline='alphabetic'})}
  else SP('f','sgate',0,458,268,{sh:.5});
  /* ================= อาคารหลัก ================= */
  if(t===1){SP('c','command_tent',0,-296,260);SP('c','family_tent',-205,-312,128);SP('c','family_tent',205,-312,128,{fl:1});SP('c','crates',-122,-292,52);SP('c','barrels',128,-288,44);SP('c','lantern_post',-150,-262,32);SP('c','lantern_post',150,-262,32,{fl:1})}
  else if(t===2){SP('f','inn',0,-294,300);TW(-205,-292,64);TW(205,-292,64);SP('c','barrels',-140,-288,42);SP('c','crates',146,-290,46)}
  else if(t===3){SP('f','barracks',0,-294,372);TW(-232,-290,82);TW(232,-290,82);SP('a','star_banner',-150,-286,22);SP('a','star_banner',150,-286,22)}
  else if(t===4){SP('b','palace',0,-292,336,{sh:.5});TW(-215,-288,88);TW(215,-288,88)}
  else{SP('b','palace',0,-290,446,{sh:.5});SP('a','star_banner',-250,-292,30);SP('a','star_banner',250,-292,30);SP('f','tower',-292,-300,80);SP('f','tower',292,-300,80)}
  /* ================= คลัง / โกดัง / ครัว / ค่ายทหาร / กระดาน ================= */
  if(t===1){SP('c','supply_cart',-450,-150,150);SP('c','crates',-360,-150,52)}
  else if(t===2){SP('c','supply_cart',-470,-150,140);SP('c','crates',-370,-152,58);SP('c','barrels',-332,-146,40)}
  else SP('b','rare_shop',-430,-148,t>=5?206:192,{sh:.5});
  if(t<=2){SP('c','supply_shelter',470,100,176);SP('c','grain_sacks',372,104,42)}else{SP('f','inn',470,100,178);SP(t>=4?'a':'c',t>=4?'barrels':'barrels',378,104,t>=4?46:40);SP(t>=4?'a':'c','crates',560,104,t>=4?52:44)}
  if(t===1){SP('c','cooking_pot',470,330,62);SP('c','log_bench',400,300,62);SP('c','log_bench',540,300,62,{fl:1});SP('c','firewood',545,346,64);SP('c','barrels',394,346,38)}
  else if(t===2){SP('f','mkt_t',486,340,160)}
  else{SP('f','inn',476,340,184,{flt:'hue-rotate(150deg) saturate(1.15)'});SP(t>=4?'a':'c','barrels',560,346,t>=4?44:38)}
  if(t>=2){SP('c','cooking_pot',402,354,58);SP('c','firewood',372,372,46)}
  if(t<=2){SP('f','tent_t',-512,240,124);SP('f','tent_p',-390,240,124,{fl:1})}else if(t===3)SP('f','store',-450,244,196);else SP('f','barracks',-450,246,214);
  SP('c','training_dummy',-470,300,38);SP('c','training_dummy',-410,316,38);if(t>=2)SP('f','targets',-548,360,104);
  add(302,()=>{soft(-340,302,22,5,.3);for(let k=0;k<4;k++){logV(-354+k*9,262,300,2.6,'#c8ccd0')}logV(-362,296,300,46,'#6a4628');logV(-362,268,272,46,'#6a4628')});
  SP(t>=3?'a':'c','noticeboard',GHBD.x,GHBD.y,t>=3?86:72);
  /* ลานกลาง */
  if(t<=2)SP('f','campfire',0,62,124,{sh:0});else if(t===3)SP('f','pool',0,134,246,{sh:0});else SP('a','crystal_fountain',0,128,232,{sh:.5});
  /* โคมทางเดิน */
  GHLP(t).forEach(([x,y],i)=>{if(t<=2)SP('c','lantern_post',x,y+2,34,{fl:x>0,sh:.3});else SP('a','lantern',x,y+2,24,{sh:.3})});
  /* ของตกแต่ง */
  const dec=[[-300,-100,'barrels',44],[-262,-92,'grain_sacks',42],[300,336,'crates',54],[556,252,'chopping_stump',30]];
  dec.forEach(([x,y,id,w])=>{if(t>=4&&(id==='barrels'||id==='crates'))SP('a',id,x,y,w*1.2);else if(id==='chopping_stump'&&t>=3)return;else SP('c',id,x,y,w)});
  if(t>=3){SP('a','bench',-175,124,64);SP('a','bench',175,124,64,{fl:1})}
  if(t>=4){SP('a',t>=5?'pink_tree':'evergreen_tree',-232,160,t>=5?84:70);SP('a',t>=5?'pink_tree':'evergreen_tree',232,160,t>=5?84:70,{fl:1})}
  if(t>=5){SP('a','gryphon_statue',-150,330,58);SP('a','gryphon_statue',150,330,58,{fl:1});SP('a','star_banner',-150,26,24);SP('a','star_banner',150,26,24)}
  if(t===2)SP('c','well',300,336,64);
  /* มุมต่าง ๆ ให้มีชีวิต */
  if(t<=2){SP('c','firewood',-520,-392,64);SP('c','chopping_stump',-470,-386,30);SP('c','barrels',520,-392,44);SP('c','crates',474,-394,48);SP('c','grain_sacks',-546,-300,40);SP('c','crates',-300,404,46);SP('c','barrels',-262,408,38);
    SP('c','log_bench',-150,262,58);SP('c','log_bench',150,262,58,{fl:1});SP('c','grain_sacks',300,400,40);SP('c','lantern_post',-560,-330,32,{sh:.3});SP('c','lantern_post',560,-330,32,{fl:1,sh:.3})}
  else{const D=t>=4?'a':'c';SP(D,'barrels',-520,-394,t>=4?50:44);SP(D,'crates',-470,-396,t>=4?56:48);SP(D,'crates',520,-394,t>=4?56:48);SP(D,'barrels',-300,404,t>=4?48:40);SP('a','star_banner',-560,-330,22);SP('a','star_banner',560,-330,22);SP('a','lantern',-560,180,22,{sh:.3});SP('a','lantern',560,180,22,{sh:.3});
    if(t>=4){SP('a','bench',-150,262,60);SP('a','bench',150,262,60,{fl:1})}}
  /* สวนผลไม้ (พื้นใต้ต้น) */
  if(t<3){[[-540,76],[-460,76]].forEach(([a,b])=>add(b,()=>{soft(a,b+2,22,6,.3);const gr=c.createRadialGradient(a-3,b-1,1,a,b,12);gr.addColorStop(0,'#c8a070');gr.addColorStop(1,'#6a4626');c.fillStyle=gr;c.beginPath();c.ellipse(a,b,12,6,0,0,7);c.fill()}))}else{const nt=[0,0,0,2,4,6][t];for(let i=0;i<nt;i++){const[a,b]=GHTP[i];E(a,b+2,28,10,'rgba(70,50,26,.35)')}}
  /* ===== วาดของตามลำดับความลึก: ก่อนกำแพงใต้ → กำแพงใต้ → หลังกำแพง ===== */
  L.sort((a,b)=>a[0]-b[0]);L.filter(q=>q[0]<430).forEach(q=>q[1]());
  hWall(-600,-74,430);hWall(74,600,430);
  L.filter(q=>q[0]>=430).forEach(q=>q[1]());
  return{cv,S,X0,Y0,WD,HT}}
/* ---------- ต่อเข้าระบบเดิม ---------- */
ghBuild=(f=>function(t,col,em){GHS.hd=0;try{if(ghHDok()){const r=ghBuildHD(t,col,em);GHS.hd=1;try{const w=[0,140,150,186,170,226][t];GHR[0][0]=-Math.max(185,w);GHR[0][2]=Math.max(185,w)}catch(e){}return r}}catch(e){console.warn('ghHD',e)}try{GHR[0][0]=-185;GHR[0][2]=185}catch(e){}return f.apply(this,arguments)})(ghBuild);
ghCols=(f=>function(){const L=f.apply(this,arguments);try{if(GHS.hd){const t=ghT();if(L[0])L[0][2]=t>=4?100:t===3?104:52;GHDEC(t).forEach(d=>L.push(d))}}catch(e){}return L})(ghCols);
/* วาดสด: แสงโคม/กองไฟ/น้ำพุแบบ HD */
function ghLiveHD(t,now){if(!GHS.hd)return;const X=1600,Y=1600;g.save();g.globalCompositeOperation='lighter';
  GHLP(t).forEach(([x,y],i)=>{const hx=X+x+(t<=2?(x>0?-8:8):0),hy=Y+y+(t<=2?-40:-62);if(!inView(hx,hy,60))return;glowAt(hx,hy,34,'255,180,90',.42+.1*Math.sin(now*7+i))});
  if(t<=2){glowAt(X,Y+40,72,'255,140,60',.5+.15*Math.sin(now*9));for(let k=0;k<6;k++){const q=(now*1.3+k/6)%1;g.fillStyle='rgba(255,'+(160+k*12)+',60,'+(.8*(1-q))+')';g.beginPath();g.arc(X+Math.sin(now*3+k*2)*10,Y+30-q*50,2*(1-q)+.6,0,7);g.fill()}}
  else{for(let k=0;k<12;k++){const q=(now*.8+k/12)%1,a=k/12*6.283;g.fillStyle='rgba(200,240,255,'+(.7*(1-q))+')';g.beginPath();g.arc(X+Math.cos(a)*q*60,Y+(t===3?30:-10)-q*20+Math.sin(a)*q*22,1.8,0,7);g.fill()}glowAt(X,Y+(t===3?30:-20),70,'140,220,255',.25)}
  if(t>=3){[[-430,-160],[470,90]].forEach(([x,y],i)=>glowAt(X+x,Y+y-40,40,'255,200,120',.18+.06*Math.sin(now*2+i)))}
  g.restore();if(inView(X+GHBD.x,Y+GHBD.y-90,80)){g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText('📜 กระดานกิลด์',X+GHBD.x,Y+GHBD.y-(t>=3?92:90))}}
ghDraw2=(f=>function(t,col,now){try{ghLiveHD(t,now)}catch(e){}return f.apply(this,arguments)})(ghDraw2);
/* โหลดภาพเมื่อเข้าบ้าน */
ghEnter=(f=>function(){ghHDload();return f.apply(this,arguments)})(ghEnter);
setInterval(()=>{try{if(ghHere()&&!ghHDok())ghHDload()}catch(e){}},2000);
