/* ===================== v554 · ลวดลายพื้นตามต้นฉบับ (อัปเกรดรายละเอียด) =====================
   หลัก: ใช้ "ลวดลายเดิม" ของแต่ละแมพ (อิฐ/แผ่นหิน/รอยแตกเรือง/คลื่นทราย/ลานน้ำแข็ง/อักขระ ฯลฯ) แต่วาดให้ละเอียด มีมิติแสงเงา
   วัสดุย่อยของแต่ละแมพเป็น "ครอบครัวเดียวกัน" (ไม่ใส่ลายแปลกปลอม) · อิฐทุกวัสดุใช้กริดเดียวกัน → รอยต่อตรงกันเสมอ */

/* ---------- แปรงเพิ่ม ---------- */
MXB.bricks=B=>(cell,c0,c1,o)=>{o=o||{};const {x,R,W8,S}=B,n=Math.max(1,Math.round(S/cell)),cw=S/n,rows=Math.max(1,Math.round(S/(o.ch||cell))),ch=S/rows,jw=o.jw||1.2,bev=o.bev===undefined?.2:o.bev,rad=o.rad===undefined?2.4:o.rad,vr=o.var===undefined?14:o.var;
  const RB=gxRng(o.seed||(cell*131+7));/* เลย์เอาต์/ขนาด จากซีดคงที่ → ทุกวัสดุตรงกัน */
  for(let j=0;j<rows;j++){const off=o.noff?0:(j%2)*cw/2;for(let i=0;i<n;i++){const X=i*cw+off,Y=j*ch,ins=jw*(.7+RB()*.5),w=cw-ins*2,h=ch-ins*2,c=mxMix(c0,c1,R()),sh=(R()-.5)*vr,cc=[c[0]+sh,c[1]+sh,c[2]+sh],chip=R()<(o.chip||0),ck=R()<(o.crk||0),ca=R()*6.28;
    W8(X+cw/2,Y+ch/2,cw,(XX,YY)=>{const x0=XX-cw/2+ins,y0=YY-ch/2+ins;
      x.fillStyle=mxRgb(cc);x.beginPath();x.roundRect(x0,y0,w,h,rad);x.fill();
      if(bev){const gr=x.createLinearGradient(x0,y0,x0+w*.4,y0+h);gr.addColorStop(0,'rgba(255,255,255,'+bev*.8+')');gr.addColorStop(.45,'rgba(255,255,255,0)');gr.addColorStop(1,'rgba(0,0,0,'+bev+')');x.fillStyle=gr;x.beginPath();x.roundRect(x0,y0,w,h,rad);x.fill();
        x.lineWidth=.8;x.strokeStyle='rgba(255,255,255,'+bev*1.1+')';x.beginPath();x.moveTo(x0+rad,y0+.6);x.lineTo(x0+w-rad,y0+.6);x.moveTo(x0+.6,y0+rad);x.lineTo(x0+.6,y0+h-rad);x.stroke();
        x.strokeStyle='rgba(0,0,0,'+bev*1.4+')';x.beginPath();x.moveTo(x0+rad,y0+h-.6);x.lineTo(x0+w-rad,y0+h-.6);x.moveTo(x0+w-.6,y0+rad);x.lineTo(x0+w-.6,y0+h-rad);x.stroke()}
      if(chip){const cx0=R()<.5?x0:x0+w,cy0=R()<.5?y0:y0+h,sx=cx0===x0?1:-1,sy=cy0===y0?1:-1,q=Math.min(w,h)*(.18+R()*.14);x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.moveTo(cx0,cy0);x.lineTo(cx0+sx*q,cy0);x.lineTo(cx0+sx*q*.35,cy0+sy*q*.45);x.lineTo(cx0,cy0+sy*q);x.closePath();x.fill()}
      if(ck){x.strokeStyle='rgba(0,0,0,.42)';x.lineWidth=.7;x.beginPath();let px=x0+w*(.25+R()*.5),py=y0+h*(.2+R()*.3);x.moveTo(px,py);for(let k=0;k<4;k++){px+=Math.cos(ca+(R()-.5)*1.2)*w*.12;py+=Math.sin(ca+(R()-.5)*1.2)*h*.14;x.lineTo(px,py)}x.stroke();
        x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=.5;x.save();x.translate(.5,.6);x.stroke();x.restore()}})}}};
/* รอยแตกแบบเดิม (กิ่งก้าน) + เรืองแสงด้านล่าง + ขอบสว่าง */
MXB.gcrack=B=>(n,col,w,len,glow,hl)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,P=[[px,py]];let a=R()*6.283,cx=px,cy=py;const L=len*(.5+R());for(let k=0;k<6;k++){a+=(R()-.5)*1.4;cx+=Math.cos(a)*L/6;cy+=Math.sin(a)*L/6;P.push([cx,cy])}
  const br=R()<.55?[2+(R()*3|0),(R()-.5)*20,(R()-.5)*20]:null;
  W8(px,py,len+14,(X,Y)=>{const dx=X-px,dy=Y-py,pth=()=>{x.beginPath();P.forEach((p,j)=>j?x.lineTo(p[0]+dx,p[1]+dy):x.moveTo(p[0]+dx,p[1]+dy));if(br){const b=P[br[0]];x.moveTo(b[0]+dx,b[1]+dy);x.lineTo(b[0]+dx+br[1],b[1]+dy+br[2])}};
    if(glow){x.strokeStyle=glow;x.lineWidth=w*4.2;pth();x.stroke();x.lineWidth=w*2.2;pth();x.stroke()}
    if(hl){x.strokeStyle=hl;x.lineWidth=w*.8;x.save();x.translate(.55,.65);pth();x.stroke();x.restore()}x.strokeStyle=col;x.lineWidth=w;pth();x.stroke()})}};
/* แผ่นหินหลายเหลี่ยม (บะซอลต์/หินลอย) ไล่แสง + ขอบเข้ม + ขอบบนสว่าง */
MXB.plates=B=>(n,r0,r1,cT,cB,edge,hl,sq)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,k=5+(R()*3|0),rr=r0+R()*(r1-r0),ro=R()*6,P=[];for(let q=0;q<k;q++){const a=q/k*6.283,qq=rr*(.76+R()*.26);P.push([Math.cos(a)*qq,Math.sin(a)*qq*(sq||.72)])}
  W8(px,py,rr+4,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(ro);const pth=()=>{x.beginPath();P.forEach(([u,v],q)=>q?x.lineTo(u,v):x.moveTo(u,v));x.closePath()};
    const gr=x.createLinearGradient(-rr*.5,-rr,rr*.4,rr);gr.addColorStop(0,cT);gr.addColorStop(1,cB);x.fillStyle=gr;pth();x.fill();x.strokeStyle=edge;x.lineWidth=1.3;x.stroke();
    if(hl){x.strokeStyle=hl;x.lineWidth=.9;x.beginPath();const t=Math.floor(k*.55);for(let q=t;q<=t+Math.floor(k*.35);q++){const p=P[q%k];q===t?x.moveTo(p[0],p[1]+.8):x.lineTo(p[0],p[1]+.8)}x.stroke()}x.restore()})}};
/* บ่อลาวาเล็ก: ไอร้อน + ขอบหินเข้ม + ลาวาไล่สี + เปลือกแข็งลอย */
MXB.pools=B=>(n,rx0,rx1,C)=>{const {x,R,W8}=B;C=C||{};for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,rx=rx0+R()*(rx1-rx0),cr=[...Array(3)].map(()=>[(R()-.5)*rx*1.1,(R()-.5)*rx*.4,rx*(.12+R()*.14)]);
  W8(px,py,rx*2.4,(X,Y)=>{const gr=x.createRadialGradient(X,Y,0,X,Y,rx*2.3);gr.addColorStop(0,C.halo||'rgba(255,120,30,.38)');gr.addColorStop(1,'rgba(255,60,10,0)');x.fillStyle=gr;x.fillRect(X-rx*2.3,Y-rx*2.3,rx*4.6,rx*4.6);
    x.fillStyle=C.rim||'#24100e';x.beginPath();x.ellipse(X,Y+.6,rx+1.8,rx*.55+1.5,0,0,7);x.fill();
    const lg=x.createRadialGradient(X-rx*.25,Y-rx*.12,0,X,Y,rx);lg.addColorStop(0,C.c0||'#fff4b0');lg.addColorStop(.32,C.c1||'#ffb030');lg.addColorStop(1,C.c2||'#d03c16');x.fillStyle=lg;x.beginPath();x.ellipse(X,Y,rx,rx*.55,0,0,7);x.fill();
    x.fillStyle=C.crust||'rgba(90,26,12,.7)';for(const[u,v,s]of cr){x.beginPath();x.ellipse(X+u,Y+v,s*1.4,s*.6,.2,0,7);x.fill()}
    x.strokeStyle='rgba(255,240,190,.5)';x.lineWidth=.7;x.beginPath();x.ellipse(X,Y,rx*.92,rx*.5,0,3.5,5.2);x.stroke()})}};
/* วงอักขระเรือง */
MXB.glyph=B=>(n,r0,r1,col,glow,o)=>{const {x,R,W8}=B;o=o||{};for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,rr=r0+R()*(r1-r0),sk=o.sq||1,sp=o.sp||3,a0=R()*6.28;
  W8(px,py,rr*2.4,(X,Y)=>{if(glow){const gr=x.createRadialGradient(X,Y,0,X,Y,rr*2.1);gr.addColorStop(0,glow);gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(X-rr*2.1,Y-rr*2.1,rr*4.2,rr*4.2)}
    x.save();x.translate(X,Y);x.scale(1,sk);x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=1.6;x.beginPath();x.arc(.4,.6,rr,0,7);x.stroke();x.strokeStyle=col;x.lineWidth=.95;x.beginPath();x.arc(0,0,rr,0,7);x.stroke();x.lineWidth=.6;x.beginPath();x.arc(0,0,rr*.72,0,7);x.stroke();
    x.lineWidth=.9;x.beginPath();for(let k=0;k<sp;k++){const a=a0+k*6.283/sp;x.moveTo(Math.cos(a)*rr*.25,Math.sin(a)*rr*.25);x.lineTo(Math.cos(a)*rr*.72,Math.sin(a)*rr*.72)}x.stroke();
    x.fillStyle=col;for(let k=0;k<6;k++){const a=a0+k*1.047+.5;x.fillRect(Math.cos(a)*rr*.86-.5,Math.sin(a)*rr*.86-.5,1,1)}x.restore()})}};
/* กระดูก/กะโหลก/ซี่โครง (มีเงา + แสง) */
MXB.bones=B=>(n,L0,L1)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,a=R()*3.14,L=L0+R()*(L1-L0);W8(px,py,L+6,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='rgba(30,20,14,.35)';x.beginPath();x.ellipse(1,1.7,L+2,1.7,0,0,7);x.fill();
  x.strokeStyle='#4a3a2c';x.lineWidth=2.8;x.lineCap='round';x.beginPath();x.moveTo(-L,0);x.lineTo(L,0);x.stroke();x.strokeStyle='#e6dac0';x.lineWidth=1.8;x.stroke();x.strokeStyle='rgba(255,255,245,.7)';x.lineWidth=.6;x.beginPath();x.moveTo(-L*.8,-.5);x.lineTo(L*.8,-.5);x.stroke();
  [-1,1].forEach(s=>{x.fillStyle='#4a3a2c';x.beginPath();x.arc(s*L,-.9,1.9,0,7);x.arc(s*L,.9,1.9,0,7);x.fill();x.fillStyle='#efe5cc';x.beginPath();x.arc(s*L,-.9,1.3,0,7);x.arc(s*L,.9,1.3,0,7);x.fill();x.fillStyle='rgba(255,255,250,.8)';x.beginPath();x.arc(s*L-.3,-1.3,.45,0,7);x.fill()});x.restore()})}};
MXB.skulls=B=>n=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,f=R()<.5?1:-1,ro=(R()-.5)*.5;W8(px,py,10,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(ro);x.scale(f,1);x.fillStyle='rgba(30,20,14,.38)';x.beginPath();x.ellipse(1.4,4.4,6.4,2.1,0,0,7);x.fill();
  const gr=x.createLinearGradient(-4,-4,4,4);gr.addColorStop(0,'#fbf3dc');gr.addColorStop(1,'#bfae8c');x.fillStyle=gr;x.strokeStyle='#3a2c22';x.lineWidth=.8;x.beginPath();x.ellipse(0,0,4.6,4,0,0,7);x.fill();x.stroke();x.beginPath();x.roundRect(-2.6,2,5.2,2.6,1);x.fill();x.stroke();
  x.fillStyle='#22180f';x.beginPath();x.ellipse(-1.7,.1,1.2,1.35,0,0,7);x.ellipse(1.7,.1,1.2,1.35,0,0,7);x.fill();x.beginPath();x.moveTo(0,1.4);x.lineTo(-.6,2.5);x.lineTo(.6,2.5);x.fill();x.strokeStyle='rgba(60,44,30,.6)';x.lineWidth=.35;x.beginPath();for(let k=-1;k<=1;k++){x.moveTo(k*1.2,2.6);x.lineTo(k*1.2,4.3)}x.stroke();
  x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.ellipse(-1.8,-2.3,1.6,.7,-.3,0,7);x.fill();x.restore()})}};
MXB.ribs=B=>n=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,a=R()*6.28;W8(px,py,18,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.lineCap='round';
  x.strokeStyle='rgba(30,20,14,.3)';x.lineWidth=2.6;for(let k=-2;k<=2;k++){x.beginPath();x.arc(.6,k*3+1,7,3.6,5.8);x.stroke()}
  x.strokeStyle='#4a3a2c';x.lineWidth=2.3;for(let k=-2;k<=2;k++){x.beginPath();x.arc(0,k*3,7,3.6,5.8);x.stroke()}x.strokeStyle='#e6dac0';x.lineWidth=1.3;for(let k=-2;k<=2;k++){x.beginPath();x.arc(0,k*3,7,3.6,5.8);x.stroke()}
  x.strokeStyle='#4a3a2c';x.lineWidth=2.6;x.beginPath();x.moveTo(0,-8);x.lineTo(0,8);x.stroke();x.strokeStyle='#f0e6cc';x.lineWidth=1.5;x.stroke();x.restore()})}};
/* คลื่นทรายแนวนอนแบบเดิม (ต่อเนื่องไร้รอย: ความถี่เป็นจำนวนเต็มรอบ) + เงาร่อง + สันสว่าง */
MXB.waves=B=>(n,a0,a1,o)=>{const {x,R}=B,S=B.S;o=o||{};for(let i=0;i<n;i++){const by=R()*S,amp=a0+R()*(a1-a0),ph=R()*6.283,k=(1+(R()*3|0))*6.283/S,ph2=R()*6.283,k2=(2+(R()*3|0))*6.283/S;
  const yf=px=>by+Math.sin(px*k+ph)*amp+Math.sin(px*k2+ph2)*amp*.25;
  for(const oy of[-S,0,S]){x.lineWidth=o.wd||2.2;x.strokeStyle=o.dk||'rgba(70,40,14,.16)';x.beginPath();for(let px=0;px<=S;px+=3){const y=yf(px)+oy+1.8;px?x.lineTo(px,y):x.moveTo(px,y)}x.stroke();
    x.lineWidth=o.wl||1.3;x.strokeStyle=o.lt||'rgba(255,232,180,.2)';x.beginPath();for(let px=0;px<=S;px+=3){const y=yf(px)+oy;px?x.lineTo(px,y):x.moveTo(px,y)}x.stroke()}}};
/* กองหิมะนูน (บนสว่าง ล่างเงาฟ้า) */
MXB.drifts=B=>(n,r0,r1,o)=>{const {x,R,W8}=B;o=o||{};for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,rx=r0+R()*(r1-r0),ro=R()*.4-.2;W8(px,py,rx+4,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(ro);
  x.fillStyle=o.sh||'rgba(60,90,130,.18)';x.beginPath();x.ellipse(1.5,rx*.2,rx*.95,rx*.17,0,0,7);x.fill();const gr=x.createLinearGradient(0,-rx*.3,0,rx*.3);gr.addColorStop(0,o.hi||'rgba(255,255,255,.5)');gr.addColorStop(1,'rgba(235,244,255,.12)');x.fillStyle=gr;x.beginPath();x.ellipse(0,0,rx,rx*.3,0,0,7);x.fill();
  x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=.8;x.beginPath();x.ellipse(0,0,rx*.92,rx*.26,0,3.4,5.9);x.stroke();x.restore()})}};
/* ลานน้ำแข็งหกเหลี่ยม (มันวาว + รอยร้าวใน + ขอบหิมะ) */
MXB.iceplates=B=>(n,r0,r1)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,rx=r0+R()*(r1-r0),P=[];for(let k=0;k<7;k++){const a=k/7*6.283,q=rx*(.8+R()*.22);P.push([Math.cos(a)*q,Math.sin(a)*q])}
  W8(px,py,rx+5,(X,Y)=>{x.save();x.translate(X,Y);x.scale(1,.5);const pth=()=>{x.beginPath();P.forEach(([u,v],q)=>q?x.lineTo(u,v):x.moveTo(u,v));x.closePath()};
    x.fillStyle='rgba(255,255,255,.75)';x.save();x.translate(0,-2.2);pth();x.fill();x.restore();
    const gr=x.createLinearGradient(-rx,-rx,rx,rx);gr.addColorStop(0,'rgba(186,232,255,.92)');gr.addColorStop(.5,'rgba(104,176,228,.9)');gr.addColorStop(1,'rgba(150,212,246,.92)');x.fillStyle=gr;pth();x.fill();
    x.strokeStyle='rgba(40,90,140,.45)';x.lineWidth=1;x.stroke();x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=1.6;x.beginPath();x.moveTo(-rx*.55,-rx*.32);x.lineTo(-rx*.08,-rx*.6);x.moveTo(-rx*.32,-rx*.02);x.lineTo(rx*.14,-rx*.36);x.stroke();
    x.strokeStyle='rgba(50,110,170,.5)';x.lineWidth=.8;x.beginPath();x.moveTo(-rx*.2,rx*.1);x.lineTo(rx*.12,rx*.32);x.lineTo(rx*.45,rx*.12);x.moveTo(rx*.12,rx*.32);x.lineTo(rx*.05,rx*.6);x.stroke();x.restore()})}};
/* หินโผล่หิมะ (หมวกหิมะ) */
MXB.capstones=B=>(n,r0,r1,rock,cap)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,r=r0+R()*(r1-r0),ro=(R()-.5)*.4;W8(px,py,r+4,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(ro);
  x.fillStyle='rgba(30,50,80,.32)';x.beginPath();x.ellipse(1.2,r*.55,r*1.25,r*.42,0,0,7);x.fill();const gr=x.createLinearGradient(-r,-r,r,r);gr.addColorStop(0,mxRgb(mxMix(rock,MXW,.25)));gr.addColorStop(1,mxRgb(mxMix(rock,MXK,.35)));x.fillStyle=gr;x.beginPath();x.ellipse(0,0,r,r*.72,0,0,7);x.fill();
  x.fillStyle=mxRgb(cap||[246,250,255]);x.beginPath();x.ellipse(-r*.1,-r*.33,r*.88,r*.4,0,0,7);x.fill();x.fillStyle='rgba(150,180,215,.5)';x.beginPath();x.ellipse(-r*.05,-r*.12,r*.7,r*.08,0,0,7);x.fill();x.restore()})}};
/* ทองในโพรง / ไม้กระดาน / ถ่านหิน */
MXB.nuggets=B=>n=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,pts=[...Array(4)].map(()=>[(R()-.5)*4,(R()-.5)*2.4]);W8(px,py,6,(X,Y)=>{x.fillStyle='rgba(16,10,6,.65)';x.beginPath();x.ellipse(X,Y,3.8,2.2,0,0,7);x.fill();
  for(const[u,v]of pts){x.fillStyle='#b88a20';x.beginPath();x.moveTo(X+u,Y+v-1.3);x.lineTo(X+u+1.2,Y+v+.3);x.lineTo(X+u-1.1,Y+v+.4);x.closePath();x.fill();x.fillStyle='#ffe27a';x.beginPath();x.moveTo(X+u,Y+v-1.3);x.lineTo(X+u+.3,Y+v-.1);x.lineTo(X+u-1.1,Y+v+.4);x.closePath();x.fill()}})}};
MXB.planks=B=>n=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,a=R()*3.14;W8(px,py,11,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(-7.6,-.9,16,3.4);const gr=x.createLinearGradient(0,-1.6,0,1.6);gr.addColorStop(0,'#8a6440');gr.addColorStop(1,'#4e3420');x.fillStyle=gr;x.fillRect(-8,-1.6,16,3.2);
  x.strokeStyle='rgba(30,16,6,.5)';x.lineWidth=.35;x.beginPath();x.moveTo(-7.5,-.4);x.lineTo(7.5,-.6);x.moveTo(-7.5,.7);x.lineTo(7.5,.6);x.stroke();x.strokeStyle='#2a1a0e';x.lineWidth=.6;x.strokeRect(-8,-1.6,16,3.2);x.fillStyle='#1a120a';x.beginPath();x.arc(-6.6,0,.45,0,7);x.arc(6.6,0,.45,0,7);x.fill();x.restore()})}};
MXB.shells=B=>n=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,c=R()<.5?[240,176,160]:[244,228,200],ro=(R()-.5)*.8;W8(px,py,5,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(ro);x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.ellipse(.6,1.2,2.8,1.2,0,0,7);x.fill();
  const gr=x.createLinearGradient(0,-2.6,0,1);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.4)));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.15)));x.fillStyle=gr;x.beginPath();x.moveTo(-2.5,1);x.quadraticCurveTo(0,-3.6,2.5,1);x.closePath();x.fill();x.strokeStyle='rgba(120,80,60,.6)';x.lineWidth=.4;x.beginPath();for(let k=-1;k<=1;k++){x.moveTo(0,.9);x.lineTo(k*1.6,-1.9)}x.stroke();x.restore()})}};
/* วงสะท้อนแสงใต้น้ำ / แอ่งเข้ม */
MXB.rings=B=>(n,r0,r1,col)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,rx=r0+R()*(r1-r0),ro=R();W8(px,py,rx+2,(X,Y)=>{x.strokeStyle=col;x.lineWidth=1.2;x.beginPath();x.ellipse(X,Y,rx,rx*.45,ro,0,4.2);x.stroke();x.lineWidth=.6;x.beginPath();x.ellipse(X,Y,rx*.6,rx*.27,ro,1,4.6);x.stroke()})}};
MXB.ponds=B=>(n,r0,r1,fill,hl)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,rx=r0+R()*(r1-r0),ry=rx*(.36+R()*.12);W8(px,py,rx+3,(X,Y)=>{x.fillStyle=fill;x.beginPath();x.ellipse(X,Y,rx,ry,0,0,7);x.fill();x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.ellipse(X,Y-ry*.15,rx*.92,ry*.75,0,0,7);x.fill();
  x.strokeStyle=hl;x.lineWidth=.9;x.beginPath();x.ellipse(X,Y,rx,ry,0,3.5,5.9);x.stroke();x.fillStyle=hl;x.beginPath();x.ellipse(X-rx*.3,Y-ry*.25,rx*.3,ry*.12,0,0,7);x.fill()})}};
/* เกล็ดผลึก (ปักพื้น) */
MXB.shards=B=>(n,h0,h1,col,dk)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,h=h0+R()*(h1-h0),a=(R()-.5)*.8,w=1.4+R()*.8;W8(px,py,h+4,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle=dk||'rgba(20,14,50,.5)';x.beginPath();x.ellipse(1,1,h*.5,1.2,0,0,7);x.fill();
  x.fillStyle=col;x.beginPath();x.moveTo(-w,0);x.lineTo(0,-h);x.lineTo(w,0);x.closePath();x.fill();x.fillStyle='rgba(0,0,30,.25)';x.beginPath();x.moveTo(0,-h);x.lineTo(w,0);x.lineTo(0,.2);x.closePath();x.fill();x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.moveTo(-w*.35,-.4);x.lineTo(0,-h*.9);x.lineTo(-w*.05,-.4);x.closePath();x.fill();x.restore()})}};
/* ประกาย/ละอองจุด */
MXB.sparks=B=>(n,cols,s0,s1)=>{const {x,R}=B;for(let i=0;i<n;i++){x.fillStyle=cols[(R()*cols.length)|0];const s=s0+R()*(s1-s0);x.fillRect(R()*B.S,R()*B.S,s,s)}};
MXB.petals=B=>(n,cols)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,a=R()*6.28,c=cols[(R()*cols.length)|0];W8(px,py,5,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.ellipse(.5,.6,2.3,1,0,0,7);x.fill();x.fillStyle=c;x.beginPath();x.ellipse(0,0,2.3,1.05,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.ellipse(-.6,-.3,1,.4,0,0,7);x.fill();x.restore()})}};
/* ก้อนกำมะถัน / เถ้าถ่าน */
MXB.sulfur=B=>n=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,pts=[...Array(5)].map(()=>[(R()-.5)*8,(R()-.5)*5,.6+R()*1.2]);W8(px,py,8,(X,Y)=>{for(const[u,v,s]of pts){x.fillStyle='rgba(60,50,10,.4)';x.beginPath();x.arc(X+u+.4,Y+v+.5,s,0,7);x.fill();x.fillStyle='rgba(236,214,80,.75)';x.beginPath();x.arc(X+u,Y+v,s,0,7);x.fill();x.fillStyle='rgba(255,250,190,.6)';x.beginPath();x.arc(X+u-s*.3,Y+v-s*.3,s*.35,0,7);x.fill()}})}};
/* หญ้า/สาหร่าย/หญ้าผลึก (เป็นกอ ไล่สี) — ใช้ carpet เดิมแต่จำนวนน้อยเป็นกอ */
MXB.clumps=B=>(n,pal,h0,h1,o)=>{o=o||{};B.carpet(n*(o.k||6),pal,h0,h1,{per:o.k||6,cr:o.cr||3.4,w:o.w||.9,ln:o.ln||2.4,tip:o.tip,hv:o.hv})};

/* ===================== 2 · หุบเขากระดูก ===================== */
Object.assign(MXT,{
 b0:B=>{B.fill([84,70,58]);B.blob(64,[132,108,84],[52,40,32],12,50,.18,.32);B.blob(16,[118,72,52],[92,62,48],8,22,.14,.24);
   B.carpet(900,[[96,80,58],[120,100,68],[146,122,80]],1.6,3.2,{per:8,cr:6,w:.8,hv:.3});
   B.gcrack(24,'rgba(30,20,14,.62)',1,48,0,'rgba(220,190,150,.16)');B.gcrack(9,'rgba(255,224,176,.12)',.6,28);
   B.peb(56,[118,104,88],[168,154,132],.8,2.4,.3);B.clumps(64,[[112,86,48],[150,118,60],[188,156,92],[220,196,130]],3,6.5,{k:5,cr:3,tip:[240,220,160]});
   B.bones(6,3,6.5);B.skulls(2);B.ribs(1);B.grain(1400,.03,.06)},
 b1:B=>{B.fill([70,58,50]);B.blob(46,[92,78,66],[46,36,30],12,40,.2,.34);B.gcrack(30,'rgba(26,18,12,.6)',.9,36,0,'rgba(200,170,130,.14)');B.peb(26,[100,88,76],[140,126,108],.7,1.8,.28);B.speck(50,[[40,30,24],[54,42,34]],.6,1.4,.7);B.bones(3,2.4,4);B.grain(1400,.03,.07)},
 b3:B=>{B.fill([96,82,68]);B.blob(30,[118,102,84],[70,58,48],10,30,.2,.32);B.peb(150,[110,98,84],[176,162,140],.7,2.4,.32);B.shard(60,[104,92,78],[152,138,118],1,2.6,.3);B.grain(1200,.04,.07)},
 b4:B=>{B.clumps(150,[[96,74,40],[130,104,56],[168,140,78],[206,182,118]],3.5,7.5,{k:6,cr:3.4,tip:[240,224,170]})}});
MXC[2].mats=[
  {t:'b1',c:f=>mxSS(.6,.68,(1-f.h)*.6+f.m*.4),e:-8},
  {t:'b3',c:f=>mxSS(.62,.69,f.h*.7+f.q*.3),e:4},
  {t:'b4',c:f=>mxSS(.6,.68,f.w*.6+f.q*.4)*(1-mxSS(.55,.7,f.h)),e:0}];

/* ===================== 3 · ดินแดนเพลิง ===================== */
Object.assign(MXT,{
 l0:B=>{B.fill([43,29,27]);B.blob(56,[74,52,46],[14,8,8],14,50,.22,.38);
   B.plates(16,12,28,'rgba(100,78,70,.55)','rgba(28,18,18,.55)','rgba(8,3,3,.8)','rgba(255,220,190,.12)');
   B.gcrack(22,'rgba(0,0,0,.72)',1.3,56);B.gcrack(9,'rgba(255,164,64,.92)',1,48,'rgba(255,70,20,.2)');B.gcrack(5,'rgba(255,238,156,.9)',.6,30,'rgba(255,140,40,.22)');
   B.pools(4,5,12);B.peb(46,[42,32,32],[90,72,66],.8,2.3,.34);B.sulfur(6);
   B.sparks(200,['rgba(170,160,160,.16)','rgba(170,160,160,.1)','rgba(255,150,50,.45)','rgba(255,200,80,.4)'],.6,.9);B.grain(1200,.02,.07)},
 l1:B=>{B.fill([62,52,50]);B.blob(40,[86,76,72],[40,32,30],12,40,.2,.32);B.ripple(12,'rgba(150,140,136,.16)','rgba(26,20,20,.2)',20,1,-.3);B.gcrack(10,'rgba(0,0,0,.45)',.8,30);
   B.peb(20,[70,62,60],[110,100,96],.7,1.7,.3);B.sparks(260,['rgba(200,190,186,.2)','rgba(40,30,30,.3)','rgba(255,140,50,.35)'],.5,.9);B.grain(1400,.03,.06)},
 l2:B=>{B.fill([34,20,18]);B.blob(30,[70,40,30],[18,8,8],10,30,.24,.36);B.plates(10,10,22,'rgba(70,46,40,.5)','rgba(20,10,10,.55)','rgba(6,2,2,.85)','rgba(255,170,110,.14)');
   B.gcrack(12,'rgba(255,150,56,.95)',1.1,40,'rgba(255,70,20,.24)');B.gcrack(6,'rgba(255,240,170,.9)',.6,24,'rgba(255,140,40,.24)');B.pools(4,5,11);B.sparks(160,['rgba(255,150,50,.5)','rgba(255,210,90,.45)'],.6,1)},
 l3:B=>{B.fill([20,14,22]);B.blob(30,[52,40,62],[8,6,10],10,30,.22,.34);B.plates(14,8,18,'rgba(90,70,120,.45)','rgba(10,8,14,.6)','rgba(0,0,0,.8)','rgba(220,200,255,.3)',.6);
   B.shard(24,[30,24,38],[80,64,110],1.2,3,.3);B.gcrack(6,'rgba(255,120,50,.6)',.7,24,'rgba(255,80,20,.14)');B.grain(800,.05,.05)}});
MXC[3].mats=[
  {t:'l1',c:f=>mxSS(.6,.68,f.m*.6+(1-f.h)*.4),e:-6},
  {t:'l2',c:f=>mxSS(.64,.7,f.w*.6+f.m*.4)*(1-mxSS(.5,.62,f.h)),e:-3}];

/* ===================== 4 · วิหารน้ำแข็ง ===================== */
Object.assign(MXT,{
 s0:B=>{B.fill([138,164,188]);B.blob(56,[236,244,252],[100,128,160],14,54,.22,.38);B.drifts(30,14,42);B.iceplates(5,12,28);B.capstones(9,2.5,6.5,[90,106,128]);
   B.clumps(40,[[60,88,108],[84,112,132],[120,148,166]],2.5,5,{k:3,cr:2,w:.75});B.gcrack(6,'rgba(90,140,190,.28)',.7,30);B.sparks(240,['rgba(255,255,255,.7)','rgba(255,255,255,.45)','rgba(210,236,255,.6)'],.6,1);B.grain(900,.04,.04)},
 s1:B=>{B.fill([214,228,242]);B.blob(40,[250,253,255],[170,192,214],14,44,.22,.36);B.drifts(26,16,40,{sh:'rgba(80,110,150,.16)',hi:'rgba(255,255,255,.7)'});B.sparks(300,['rgba(255,255,255,.9)','rgba(200,226,255,.6)'],.6,1);B.grain(600,.05,.03)},
 s3:B=>{B.fill([150,170,190]);B.blob(30,[200,214,230],[110,130,152],10,30,.2,.32);B.capstones(46,1.6,4.4,[80,94,114]);B.peb(40,[90,104,122],[140,156,176],.6,1.6,.3);B.sparks(160,['rgba(255,255,255,.7)'],.6,.9)},
 s2:B=>{B.fill([118,176,222]);B.blob(30,[170,220,250],[70,130,190],12,40,.24,.38);B.stroke((x,R,W8,S)=>{for(let i=0;i<22;i++){const px=R()*S,py=R()*S,L=10+R()*24,a=-.5+(R()-.5)*.3;W8(px,py,L,(X,Y)=>{x.strokeStyle='rgba(255,255,255,.4)';x.lineWidth=1.3;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*L,Y+Math.sin(a)*L);x.stroke()})}});
   B.gcrack(16,'rgba(40,96,150,.5)',.8,34,0,'rgba(240,250,255,.5)');B.speck(40,[[220,244,255]],.4,1.1,.7);B.sparks(80,['rgba(255,255,255,.9)'],.7,1.1)}});
MXC[4].mats=[
  {t:'s1',c:f=>mxSS(.58,.66,f.m*.5+f.w*.5),e:10},
  {t:'s3',c:f=>mxSS(.64,.7,f.h*.6+f.q*.4),e:3},
  {t:'s2',c:f=>mxSS(.69,.74,(1-f.h)*.6+f.m*.4),e:-4,hi:1,rim:[[60,100,150],[255,255,255]],rk:[110,80]}];
Object.assign(MXC[4],{amp:100,ks:.22,kl:.3,ao:.3,ff:.03,cs:.14});

/* ===================== 5 · ลานหอคอยวิญญาณ (อิฐ 32 แบบเดิม) ===================== */
Object.assign(MXT,{
 p0:B=>{B.fill([42,38,60]);B.bricks(32,[86,82,110],[66,62,88],{jw:1.3,bev:.16,var:12,chip:.08,crk:.14,rad:2.6});
   B.blob(36,[200,190,230],[40,34,60],12,40,.08,.18);B.blob(12,[90,130,80],[70,110,70],6,14,.2,.32);B.gcrack(8,'rgba(20,16,36,.45)',.7,24);
   B.glyph(5,6,11,'rgba(222,204,255,.85)','rgba(190,150,255,.32)');B.petals(10,['rgba(200,120,220,.65)','rgba(240,200,120,.6)']);B.grain(1400,.03,.06)},
 p1:B=>{B.fill([40,40,56]);B.bricks(32,[84,84,106],[64,66,86],{jw:1.3,bev:.15,var:12,chip:.08,crk:.1,rad:2.6});B.blob(46,[76,128,70],[46,96,54],5,16,.32,.55);B.blob(20,[110,160,90],[70,120,70],3,8,.3,.5);
   B.clumps(70,[[40,84,46],[60,110,58],[90,140,74]],1.6,3.4,{k:5,cr:2.6,w:.8});B.speck(80,[[90,150,80],[60,120,60]],.6,1.4,.7);B.grain(1200,.03,.06)},
 p2:B=>{B.clumps(60,[[64,58,96],[96,88,140],[140,126,190],[190,176,230]],3,6,{k:5,cr:3,tip:[230,220,255]});B.petals(16,['rgba(200,120,220,.7)','rgba(240,220,255,.6)'])},
 p3:B=>{B.fill([32,28,46]);B.bricks(32,[80,76,104],[58,54,80],{jw:1.5,bev:.14,var:16,chip:.35,crk:.6,rad:2});B.peb(40,[70,66,90],[110,104,136],.8,2.2,.32);B.shard(20,[66,62,86],[100,96,124],1,2.4,.3);B.grain(1400,.04,.07)}});
MXC[5].mats=[
  {t:'p1',c:f=>mxSS(.6,.68,f.m*.6+(1-f.h)*.4),e:-4},
  {t:'p2',c:f=>mxSS(.64,.7,f.w*.6+f.q*.4),e:0},
  {t:'p3',c:f=>mxSS(.64,.7,f.h*.6+f.q*.4),e:2}];

/* ===================== 6 · ซากนครจมบาดาล (อิฐ 64 แบบเดิม) ===================== */
Object.assign(MXT,{
 u0:B=>{B.fill([12,40,44]);B.bricks(64,[36,82,88],[28,70,76],{jw:1.4,bev:.14,var:12,chip:.12,crk:.25,rad:3.5});
   B.blob(60,[60,150,130],[8,36,42],10,42,.12,.28);B.blob(14,[200,190,140],[170,160,120],10,24,.16,.28);B.gcrack(10,'rgba(0,0,0,.45)',.8,30);
   B.clumps(20,[[24,96,66],[40,140,90],[70,170,110],[120,210,150]],6,13,{k:4,cr:3,w:1.1,ln:4,tip:[170,240,200]});B.shells(10);
   B.rings(14,6,16,'rgba(180,255,240,.15)');B.ponds(8,8,20,'rgba(16,56,66,.4)','rgba(150,240,230,.14)');B.grain(1400,.03,.06)},
 u1:B=>{B.fill([150,144,112]);B.blob(30,[190,182,146],[120,112,86],12,36,.2,.32);B.ripple(16,'rgba(240,232,200,.28)','rgba(80,70,50,.22)',22,1.2,-.25);B.shells(8);B.peb(20,[150,140,112],[196,186,154],.6,1.5,.28);B.grain(1600,.05,.06)},
 u2:B=>{B.clumps(130,[[18,80,56],[30,118,80],[56,156,100],[110,206,146]],7,15,{k:5,cr:3,w:1.15,ln:5,tip:[170,240,200]})},
 u3:B=>{B.fill([12,36,40]);B.bricks(64,[34,78,84],[24,62,68],{jw:1.8,bev:.12,var:16,chip:.5,crk:.8,rad:2.5});B.peb(70,[60,96,100],[110,150,150],.8,2.8,.34);B.shard(30,[50,86,90],[96,136,138],1.2,3,.3);B.shells(4);B.grain(1400,.04,.07)}});
MXC[6].mats=[
  {t:'u2',c:f=>mxSS(.62,.69,f.w*.6+(1-f.h)*.4),e:0},
  {t:'u3',c:f=>mxSS(.65,.71,f.q*.5+f.h*.5),e:2}];

/* ===================== 7 · เหมืองทองร้าง ===================== */
Object.assign(MXT,{
 m0:B=>{B.fill([70,54,42]);B.blob(56,[130,104,72],[24,16,10],12,46,.2,.36);B.gcrack(14,'rgba(0,0,0,.55)',1.1,40,0,'rgba(220,190,150,.12)');
   B.peb(110,[86,70,56],[150,132,104],.6,2.3,.32);B.gcrack(6,'rgba(255,214,90,.85)',.8,26,'rgba(255,190,60,.2)');B.nuggets(8);B.planks(4);
   B.speck(6,[[26,20,16]],1.6,2.2,1);B.sparks(14,['rgba(255,214,96,.6)'],1,1.2);B.grain(1400,.03,.07)},
 m1:B=>{B.peb(260,[84,70,58],[150,134,112],.6,2.2,.34);B.shard(70,[80,68,56],[140,124,104],.9,2.4,.32)},
 m2:B=>{B.fill([48,38,32]);B.blob(30,[76,62,52],[24,18,14],10,30,.22,.34);B.plates(12,10,24,'rgba(96,80,66,.5)','rgba(30,22,18,.55)','rgba(10,6,4,.75)','rgba(255,220,180,.12)');B.gcrack(16,'rgba(0,0,0,.55)',1,30);B.gcrack(5,'rgba(255,210,90,.75)',.7,20,'rgba(255,190,60,.18)');B.grain(1000,.03,.07)},
 m3:B=>{B.speck(160,[[250,214,100],[255,236,150],[210,160,60]],.35,.9,.9);B.gcrack(10,'rgba(255,220,100,.85)',.7,22,'rgba(255,190,60,.2)');B.nuggets(6)}});
MXC[7].mats=[
  {t:'m1',c:f=>mxSS(.6,.68,f.m*.6+f.q*.4),e:2},
  {t:'m3',c:f=>mxSS(.67,.73,f.w*.6+f.m*.4),e:0}];

/* ===================== 8 · ทะเลทรายสุสานฟาโรห์ (คลื่นทรายแนวนอนแบบเดิม) ===================== */
Object.assign(MXT,{
 d0:B=>{B.fill([138,106,66]);B.blob(46,[150,112,70],[84,58,32],16,58,.14,.26);B.waves(16,2,4.5);
   B.peb(14,[130,100,66],[172,138,98],.8,2,.28);B.clumps(6,[[110,118,52],[140,144,66],[170,170,86]],3,6,{k:5,cr:2.2,w:.9});
   B.stroke((x,R,W8,S)=>{for(let i=0;i<5;i++){const px=R()*S,py=R()*S,a=R()*6.28,c=R()<.5?'#b8603a':'#c88a50';W8(px,py,6,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='rgba(60,30,12,.35)';x.beginPath();x.ellipse(.6,.8,3.6,2.2,0,0,7);x.fill();x.fillStyle=c;x.beginPath();x.moveTo(-3.4,-1.6);x.lineTo(2.6,-2.2);x.lineTo(3.4,1.4);x.lineTo(-2.6,2);x.closePath();x.fill();x.strokeStyle='rgba(255,230,180,.5)';x.lineWidth=.6;x.beginPath();x.moveTo(-3,-.6);x.lineTo(2.8,-1);x.stroke();x.strokeStyle='rgba(60,24,10,.5)';x.lineWidth=.4;x.beginPath();x.moveTo(-3.4,-1.6);x.lineTo(2.6,-2.2);x.lineTo(3.4,1.4);x.stroke();x.restore()})}});
   B.stroke((x,R,W8,S)=>{for(let i=0;i<4;i++){const px=R()*S,py=R()*S,rx=10+R()*14,A=[...Array(5)].map(()=>R()*6.28);W8(px,py,rx,(X,Y)=>{x.strokeStyle='rgba(80,52,24,.3)';x.lineWidth=.8;for(const a of A){x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*rx,Y+Math.sin(a)*rx*.55);x.stroke()}})}});
   B.grain(2000,.05,.05)},
 d1:B=>{B.fill([170,134,86]);B.blob(30,[196,160,108],[140,106,66],14,44,.18,.3);B.waves(20,2.5,5,{lt:'rgba(255,240,200,.3)',dk:'rgba(90,56,22,.2)',wd:2.4,wl:1.5});B.grain(1800,.06,.05)},
 d3:B=>{B.peb(70,[120,92,62],[180,148,108],.7,2,.3);B.shard(16,[140,108,74],[190,156,116],1,2,.28)},
 d2:B=>{B.fill([122,92,58]);B.blob(24,[142,108,70],[100,74,46],10,30,.18,.3);B.stroke((x,R,W8,S)=>{for(let i=0;i<22;i++){const px=R()*S,py=R()*S,rx=8+R()*14,A=[...Array(5)].map(()=>[R()*6.28,.6+R()*.4]);W8(px,py,rx,(X,Y)=>{x.lineWidth=.9;for(const[a,l]of A){x.strokeStyle='rgba(70,44,20,.42)';x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*rx*l,Y+Math.sin(a)*rx*l*.55);x.stroke();x.strokeStyle='rgba(255,226,180,.14)';x.beginPath();x.moveTo(X+.5,Y+.6);x.lineTo(X+Math.cos(a)*rx*l+.5,Y+Math.sin(a)*rx*l*.55+.6);x.stroke()}})}});B.grain(1600,.05,.06)}});
MXC[8].mats=[
  {t:'d1',c:f=>mxSS(.58,.66,f.h*.7+f.m*.3),e:12},
  {t:'d3',c:f=>mxSS(.64,.7,f.q*.6+(1-f.h)*.4),e:0},
  {t:'d2',c:f=>mxSS(.65,.71,f.m*.6+f.w*.4)*(1-mxSS(.5,.62,f.h)),e:-2,hi:1,rim:[[70,44,20],[255,226,180]],rk:[80,40]}];

/* ===================== 10 · ทุ่งรอยแยกนภา ===================== */
Object.assign(MXT,{
 r0:B=>{B.fill([52,52,94]);B.blob(56,[120,110,200],[16,14,40],14,50,.18,.32);
   B.clumps(60,[[96,110,180],[140,160,230],[186,170,250],[220,226,255]],3,7,{k:3,cr:2,w:.75,tip:[240,244,255]});
   B.gcrack(14,'rgba(0,0,0,.5)',1,50);B.gcrack(9,'rgba(196,176,255,.5)',.7,40,'rgba(150,120,255,.12)');B.shards(18,3,8,'rgba(196,182,255,.55)');
   B.sparks(70,['rgba(230,226,255,.5)','rgba(200,210,255,.35)'],.7,1);B.grain(1000,.03,.06)},
 r1:B=>{B.sparks(90,['rgba(230,236,255,.85)','rgba(190,180,255,.6)'],.6,1.1);B.shards(10,2.5,5,'rgba(210,200,255,.6)')},
 r2:B=>{B.shards(46,4,10,'rgba(186,170,255,.7)');B.clumps(30,[[110,120,200],[150,170,240],[210,220,255]],3,6,{k:3,cr:2,w:.75})},
 r3:B=>{B.fill([30,30,60]);B.blob(30,[60,56,110],[14,12,30],12,36,.2,.32);B.gcrack(12,'rgba(0,0,0,.5)',.9,36);B.sparks(120,['rgba(220,220,255,.55)','rgba(160,170,255,.4)'],.6,.9);B.grain(800,.03,.05)}});
MXC[10].mats=[
  {t:'r1',c:f=>mxSS(.62,.7,f.w*.6+f.m*.4),e:0},
  {t:'r2',c:f=>mxSS(.65,.71,f.h*.6+f.q*.4),e:3},
  {t:'r3',c:f=>mxSS(.62,.69,(1-f.h)*.6+f.m*.4),e:-6}];

/* ===================== 11 · ดินแดนหลังรอยแยก ===================== */
Object.assign(MXT,{
 v0:B=>{B.fill([34,24,56]);B.blob(56,[100,56,150],[8,4,20],14,54,.2,.36);B.glyph(4,7,12,'rgba(244,186,255,.8)','rgba(230,120,255,.3)',{sp:6,sq:.6});
   B.plates(9,10,26,'rgba(70,50,110,.32)','rgba(30,20,50,.32)','rgba(200,140,255,.16)',0);B.gcrack(16,'rgba(0,0,0,.6)',1.1,52);B.gcrack(10,'rgba(240,124,255,.55)',.8,44,'rgba(220,90,255,.14)');
   B.sparks(120,['rgba(255,220,255,.5)','rgba(180,200,255,.4)','rgba(255,200,140,.3)'],.7,1);B.grain(900,.03,.06)},
 v1:B=>{B.sparks(100,['rgba(255,220,255,.8)','rgba(200,180,255,.6)'],.6,1.1);B.shards(8,2.5,5,'rgba(240,170,255,.6)','rgba(20,8,40,.45)')},
 v2:B=>{B.shards(40,4,10,'rgba(230,150,255,.6)','rgba(20,8,40,.5)');B.gcrack(8,'rgba(250,150,255,.6)',.7,26,'rgba(220,90,255,.16)')},
 v3:B=>{B.fill([20,14,34]);B.blob(30,[60,36,90],[6,4,14],12,36,.2,.32);B.gcrack(12,'rgba(0,0,0,.55)',.9,36);B.sparks(110,['rgba(255,220,255,.5)','rgba(180,170,255,.4)'],.6,.9);B.grain(700,.03,.05)}});
MXC[11].mats=[
  {t:'v1',c:f=>mxSS(.62,.7,f.w*.6+f.m*.4),e:0},
  {t:'v2',c:f=>mxSS(.65,.71,f.h*.6+f.q*.4),e:3},
  {t:'v3',c:f=>mxSS(.62,.69,(1-f.h)*.6+f.m*.4),e:-6}];
