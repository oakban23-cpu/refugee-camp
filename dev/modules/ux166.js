/* ---------- v595 พื้น/กำแพงย่านวงแหวนล่างเข้าชุดภาพ HD (ต่อจาก v594) ----------
   ลานหิน: หินปูนก้อนครีมขอบน้ำตาลเข้มแบบภาพวาดมือ (เดิมเป็นแผ่นเทาเรียบ) · ถนน 4 สาย + ถนนวงแหวน: แผ่นหินใหญ่เรียงสลับ + ขอบถนนเข้ม
   ขอบเกาะ: ผาดินหินมีชั้น · กำแพงเมืองเก่า: ก้อนหินเรียง 3 ชั้น + ใบเสมา + ไม้เลื้อย · ช่วงกำแพงพัง: เศษหินครีม · ทางเข้าประตู: แผ่นหินใหญ่
   ลายพื้นสร้างครั้งเดียวเป็นแผ่นลายวนซ้ำ (pattern) วาดลงแผ่นพื้นแคช → ไม่เพิ่มงานต่อเฟรม · ใช้เมื่อเปิด HD ชุดตลาด (MKA) · ปิด: MKW.off=1 แล้ว PALC.m.clear() */
const MKW={off:0,t:{}};
function mkwOn(){try{return !MKW.off&&curMap===31&&!MKA.off&&HDI.on&&!lqHD()}catch(e){return false}}
function mkwTile(k){if(MKW.t[k])return MKW.t[k];const cob=k==='cob',N=cob?240:192,rh=cob?20:48,cv=document.createElement('canvas');cv.width=cv.height=N;const c=cv.getContext('2d'),r=gxRng(cob?9137:4421);
  c.fillStyle=cob?'#c2ae8c':'#b09c78';c.fillRect(0,0,N,N);
  const CO=cob?['#e4d9c0','#dccfb2','#eae1cb','#d6c8a8','#e0d3b6']:['#e6dcc4','#ddd1b4','#ebe2cd','#d6c9aa'];
  const stone=(x,y,w,h,rad,col,ck)=>{for(const dx of[-N,0,N]){const X=x+dx;if(X>N||X+w<0)continue;for(const dy of[-N,0,N]){const Y=y+dy;if(Y>N||Y+h<0)continue;
      c.fillStyle='rgba(70,52,30,.25)';c.beginPath();c.roundRect(X+.6,Y+1.2,w,h,rad);c.fill();
      c.fillStyle=col;c.beginPath();c.roundRect(X,Y,w,h,rad);c.fill();
      c.fillStyle='rgba(255,252,240,.2)';c.beginPath();c.roundRect(X+2,Y+1.5,w-4,h*.4,rad*.7);c.fill();
      c.strokeStyle=cob?'rgba(110,84,52,.48)':'rgba(110,84,52,.6)';c.lineWidth=.9;c.beginPath();c.roundRect(X,Y,w,h,rad);c.stroke();
      if(ck){c.strokeStyle='rgba(110,84,52,.4)';c.lineWidth=.7;c.beginPath();c.moveTo(X+w*.3,Y+2);c.lineTo(X+w*.42,Y+h*.5);c.lineTo(X+w*.36,Y+h-2);c.stroke()}}}};
  for(let row=0;row<N/rh;row++){const ws=[];let t=0;while(t<N){const w=cob?22+r()*20:60+r()*36;ws.push(w);t+=w}const f=N/t;let x=r()*N;const y=row*rh;
    for(const w0 of ws){const w=w0*f;if(cob)stone(x+1.6,y+1.6+(r()-.5)*1.6,w-3.2,rh-3.4+(r()-.5)*1.2,6+r()*3,CO[(r()*CO.length)|0],r()<.05);else stone(x+2,y+2,w-4,rh-4,5,CO[(r()*CO.length)|0],r()<.16);x+=w}}
  return MKW.t[k]=cv}
function mkwPat(c,k){return c.createPattern(mkwTile(k),'repeat')}
/* กำแพงเมืองเก่าแบบก้อนหินเรียง */
function mkwWall(c,a0,a1){const X=MKC.x,Y=MKC.y,R0=MKR+6,R1=MKR+58,seg=(ra,rb,b0,b1)=>{c.beginPath();c.arc(X,Y,rb,b0,b1);c.arc(X,Y,ra,b1,b0,true);c.closePath()};
  seg(R0-4,R1+4,a0,a1);c.fillStyle='#5e4a32';c.fill();
  const rr=gxRng(Math.round(a0*1000)+77),CO=['#ddd1b6','#d2c4a6','#e6dcc4','#c9bb9c'],rows=[[R0,R0+17],[R0+17,R0+34],[R0+34,R1]];
  rows.forEach(([ra,rb],ri)=>{const L=34/((ra+rb)/2);let b=a0-(ri%2)*L*.5;while(b<a1){const e=Math.min(a1,b+L*(.75+rr()*.5)),s=Math.max(a0,b);if(e>s+.001){seg(ra+1,rb-1,s+.0012,e-.0012);c.fillStyle=CO[(rr()*4)|0];c.fill();c.strokeStyle='#6e5638';c.lineWidth=1;c.stroke();
      seg(rb-5,rb-1.5,s+.002,e-.002);c.fillStyle='rgba(255,250,236,.3)';c.fill()}b=e}});
  /* ใบเสมาริมนอก */
  const n=Math.round((a1-a0)*(R1+8)/24);for(let i=0;i<n;i+=2){const a=a0+(i+.5)/n*(a1-a0);c.save();c.translate(X+Math.cos(a)*(R1+6),Y+Math.sin(a)*(R1+6));c.rotate(a);
    c.fillStyle='rgba(40,28,16,.4)';c.fillRect(-5,-9,13,20);c.fillStyle='#e2d6ba';c.fillRect(-7,-10,13,20);c.strokeStyle='#5e4a32';c.lineWidth=1.2;c.strokeRect(-7,-10,13,20);c.fillStyle='rgba(255,250,236,.4)';c.fillRect(-6,-9,4,18);c.restore()}
  /* ไม้เลื้อย */
  for(let i=0;i<Math.round((a1-a0)*6);i++){const a=a0+rr()*(a1-a0),d=R0+rr()*(R1-R0);const x=X+Math.cos(a)*d,y=Y+Math.sin(a)*d;for(let k=0;k<5;k++){const px=x+(rr()-.5)*22,py=y+(rr()-.5)*14,s=4+rr()*4;c.fillStyle=k%2?'#5f8a3c':'#4b7432';c.beginPath();c.arc(px,py,s,0,7);c.fill();c.strokeStyle='rgba(30,50,20,.6)';c.lineWidth=.8;c.stroke()}}
  /* เงาด้านในกำแพงบนพื้น */
  c.strokeStyle='rgba(50,36,20,.28)';c.lineWidth=10;c.beginPath();c.arc(X,Y,R0-9,a0,a1);c.stroke()}
function mktPaintHD(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sk=c.createLinearGradient(0,0,0,3200);sk.addColorStop(0,'#7aa8e0');sk.addColorStop(.6,'#c8d8f0');sk.addColorStop(1,'#f4dcc0');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  for(const cl of MKT.cl){const r=cl[2]*1.6;if(cl[0]+r<ox||cl[0]-r>X1||cl[1]+r<oy||cl[1]-r>Y1)continue;brgCloud(c,cl)}
  const disk=(cc,dx,dy,gr)=>{cc.beginPath();cc.arc(MKC.x+(dx||0),MKC.y+(dy||0),MKR+(gr||0),0,6.2832);cc.rect(MKGATE[0]-40+(dx||0),MKGATE[1]-60+(dy||0),MKGATE[2]-MKGATE[0]+80,MKGATE[3]-MKGATE[1]+60)};
  /* ขอบเกาะ: ผาหินมีชั้น */
  c.fillStyle='rgba(60,50,80,.18)';disk(c,40,90,40);c.fill();
  {const cg=c.createLinearGradient(0,MKC.y-MKR,0,MKC.y+MKR+90);cg.addColorStop(0,'#7c6646');cg.addColorStop(1,'#5a4630');c.fillStyle=cg;disk(c,0,26,60);c.fill();c.strokeStyle='#3a2c1c';c.lineWidth=2.4;c.stroke();
    c.strokeStyle='rgba(40,28,16,.4)';c.lineWidth=2;for(const k of[10,18]){c.beginPath();c.arc(MKC.x,MKC.y+k,MKR+60,.2,2.94);c.stroke()}
    c.fillStyle='#bba98a';disk(c,0,0,64);c.fill();c.strokeStyle='#5e4a32';c.lineWidth=2.2;c.stroke()}
  c.save();disk(c,0,0,0);c.clip();c.fillStyle=mkwPat(c,'cob');c.fillRect(ox,oy,S,S);
  /* ถนนใหญ่ 4 สาย + ถนนวงแหวน (แผ่นหินใหญ่) */
  const fp=mkwPat(c,'flag');c.fillStyle=fp;c.fillRect(1520,0,160,MKC.y);c.fillRect(1520,MKC.y,160,1600);c.fillRect(0,MKC.y-80,MKC.x,160);c.fillRect(MKC.x,MKC.y-80,1600,160);
  c.strokeStyle=fp;c.lineWidth=140;c.beginPath();c.arc(MKC.x,MKC.y,640,0,7);c.stroke();
  const curb=()=>{c.beginPath();for(const rr of[570,710]){c.moveTo(MKC.x+rr,MKC.y);c.arc(MKC.x,MKC.y,rr,0,7)}for(const x of[1520,1680]){c.moveTo(x,0);c.lineTo(x,3200)}for(const y of[MKC.y-80,MKC.y+80]){c.moveTo(0,y);c.lineTo(3200,y)}};
  curb();c.strokeStyle='#6a5236';c.lineWidth=5;c.stroke();curb();c.strokeStyle='#cdbf9e';c.lineWidth=2;c.stroke();
  /* ลานน้ำพุ: โมเสกดาวอัสตรา */
  {const x=MKC.x,y=MKC.y;c.fillStyle='#ebdfc4';c.beginPath();c.arc(x,y,380,0,7);c.fill();for(let k=0;k<6;k++){c.strokeStyle=k%2?'rgba(42,74,154,.4)':'rgba(200,150,60,.55)';c.lineWidth=k%2?6:3;c.beginPath();c.arc(x,y,370-k*48,0,7);c.stroke()}
    c.fillStyle='rgba(42,74,154,.3)';PST(c,x,y,300,120,8,Math.PI/8);c.fill();c.strokeStyle='rgba(40,50,90,.5)';c.lineWidth=1.4;c.stroke();c.fillStyle='rgba(216,170,70,.5)';PST(c,x,y,240,90,8,0);c.fill();c.strokeStyle='rgba(110,80,30,.55)';c.stroke();
    c.strokeStyle='rgba(120,100,70,.25)';c.lineWidth=1;for(let i=0;i<48;i++){const a=i/48*6.283;c.beginPath();c.moveTo(x+Math.cos(a)*110,y+Math.sin(a)*110);c.lineTo(x+Math.cos(a)*370,y+Math.sin(a)*370);c.stroke()}
    c.strokeStyle='#6a5236';c.lineWidth=4;c.beginPath();c.arc(x,y,382,0,7);c.stroke();c.strokeStyle='#d8c8a4';c.lineWidth=1.6;c.beginPath();c.arc(x,y,377,0,7);c.stroke()}
  /* ซอยร้างรอบนอก */
  {const gr=c.createRadialGradient(MKC.x,MKC.y,860,MKC.x,MKC.y,MKR);gr.addColorStop(0,'rgba(50,40,30,0)');gr.addColorStop(.25,'rgba(50,40,30,.28)');gr.addColorStop(1,'rgba(40,30,40,.45)');c.fillStyle=gr;c.fillRect(ox,oy,S,S);
    const Rr=gxRng(Math.floor(ox/S)*31+Math.floor(oy/S)*7+5);for(let i=0;i<18;i++){const x=ox+Rr()*S,y=oy+Rr()*S,d=mktD(x,y);if(d<920||d>MKR-10)continue;if(Rr()<.6){c.fillStyle='rgba(78,110,52,'+(.22+Rr()*.2)+')';c.beginPath();c.ellipse(x,y,20+Rr()*30,10+Rr()*16,Rr()*3,0,7);c.fill()}else{c.strokeStyle='rgba(60,44,28,.55)';c.lineWidth=1.4;c.beginPath();c.moveTo(x,y);let px=x,py=y;for(let k=0;k<5;k++){px+=(Rr()-.5)*40;py+=(Rr()-.5)*40;c.lineTo(px,py)}c.stroke()}}}
  for(const d of MKT.dec){const b=d.b;if(b[0]<X1&&b[2]>ox&&b[1]<Y1&&b[3]>oy){c.save();try{PALD.ao(c,d,ox,oy,X1,Y1)}catch(e){}c.restore()}}
  c.restore();
  /* กำแพงเมืองเก่า (มีช่วงพังให้เห็นฟ้า) */
  mkwWall(c,-1.46,.95);mkwWall(c,1.3,1.85);mkwWall(c,2.25,4.62);
  {const rr=gxRng(4242);for(const[a0,a1]of[[.95,1.3],[1.85,2.25]]){for(let i=0;i<26;i++){const a=a0+(a1-a0)*rr(),d=MKR+6+rr()*56,x=MKC.x+Math.cos(a)*d,y=MKC.y+Math.sin(a)*d,s=3+rr()*rr()*12,ro=a+rr()*3;
      c.fillStyle='rgba(40,28,16,.4)';c.beginPath();c.ellipse(x+1,y+2,s,s*.6,ro,0,7);c.fill();c.fillStyle=['#ddd1b6','#cfc2a4','#e6dcc4','#b4553a'][(rr()*3.3)|0];c.beginPath();c.ellipse(x,y,s,s*.6,ro,0,7);c.fill();c.strokeStyle='#5e4a32';c.lineWidth=1;c.stroke()}}}
  /* ทางเข้าประตู: แผ่นหินใหญ่ + ขอบ */
  {const x0=MKGATE[0],y0=MKGATE[1]-20,w=MKGATE[2]-MKGATE[0],h=MKGATE[3]-MKGATE[1]+20;c.fillStyle=fp;c.fillRect(x0,y0,w,h);c.strokeStyle='#6a5236';c.lineWidth=5;c.beginPath();c.moveTo(x0,y0);c.lineTo(x0,y0+h);c.moveTo(x0+w,y0);c.lineTo(x0+w,y0+h);c.stroke()}}
setTimeout(()=>{try{const _p=mktPaint;window.mktPaint=mktPaint=function(c,ox,oy,S){if(mkwOn()){mktPaintHD(c,ox,oy,S);if(mkdOn())try{mkdPaint(c,ox,oy,S)}catch(e){}return}return _p.apply(this,arguments)}}catch(e){console.warn('mkw',e)}},1800);
