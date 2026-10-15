/* ---------- v394 VFX รูน: รูนที่ภาพด้อยกว่าไม่ใส่ · สถานะรูนที่มองไม่เห็น · ภาพเล็ก/ไม่ตรงคำอธิบาย ----------
   1) ซัพ สกิล 2 รูน คม/เร่ง → วงเวทคู่ + เสาแสง + สัญลักษณ์ลอย (แทนวงรีบาง+อีโมจิ) และออร่าที่เท้าตลอดเวลาบัฟ
   2) ฟ้าผ่าโซ่ (ทุกแบบ) → สายฟ้าหนาขึ้น ค้างนานขึ้น จุดกระทบสว่าง · รวมพลัง (เป้าเดียว) มีสายฟ้าผ่าจากฟ้าลงเป้า
   3) ซัพ อัลติ รูนพิทักษ์ → โดมทองตอนร่าย + โดมคลุมตัวตลอดเวลาอมตะ
   4) นักรบ: โทสะ+กระหายเลือด (ออร่าเลือดแรงขึ้นตามเลือดที่หาย) · โทสะ+หินผา (แผ่นหินหมุนรอบตัว)
            คำราม+สะท้อน (วงหนามรอบตัว 5 วิ) · คำราม+ปลุกขวัญ (โดมโล่ฟ้าตอนร่าย — เดิมไม่มีภาพเลย) · พุ่ง (ภาพติดตา+แสงเฉือนปลายทาง)
   5) นักธนู: ลมกรด (ลูกธนูลมหนา มีหาง+ประกายตอนโดน) · เจาะเกราะ (ตราเกราะแตกบนหัวมอน+วงที่เท้าตลอด 4 วิ) · สุริยะ (ตราดวงอาทิตย์+ลำแสงฟาดลงจากฟ้า)
   6) นักฆ่า: ม่านควัน (ควันหมุนรอบตัวตลอดเวลาหลบได้) · พิษร้าย (หมอกม่วงเดือดฟองแยกจากหมอกปกติ)
   7) ป้ายปฏิกิริยาธาตุที่ถูกรวม (×N) ไม่วาดวงซ้ำเต็มขนาด — ลดวงซ้อนบนฝูงมอน (แก้ใน patch340.py) */
const R23={tox:[]};
const r23Now=()=>performance.now();
/* สัญลักษณ์ที่วาดเอง (แทนอีโมจิ) */
function r23Cross(x,y,s,c,a){g.strokeStyle='rgba('+c+','+a+')';g.lineWidth=Math.max(1.2,s*.18);g.beginPath();g.arc(x,y,s*.62,0,7);g.stroke();g.beginPath();
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){g.moveTo(x+dx*s*.3,y+dy*s*.3);g.lineTo(x+dx*s,y+dy*s)}g.stroke();g.fillStyle='rgba(255,255,255,'+a+')';g.beginPath();g.arc(x,y,s*.12+.6,0,7);g.fill()}
function r23Bolt(x,y,s,c,a){g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.moveTo(x+s*.15,y-s);g.lineTo(x-s*.5,y+s*.12);g.lineTo(x-s*.02,y+s*.12);g.lineTo(x-s*.18,y+s);g.lineTo(x+s*.5,y-s*.18);g.lineTo(x+s*.02,y-s*.18);g.closePath();g.fill();
  g.strokeStyle='rgba(255,255,255,'+a*.9+')';g.lineWidth=1;g.stroke()}
function r23Shield(x,y,s,c,a,crack){g.beginPath();g.moveTo(x,y-s);g.lineTo(x+s*.85,y-s*.62);g.lineTo(x+s*.7,y+s*.35);g.lineTo(x,y+s);g.lineTo(x-s*.7,y+s*.35);g.lineTo(x-s*.85,y-s*.62);g.closePath();
  g.fillStyle='rgba('+c+','+a*.35+')';g.fill();g.strokeStyle='rgba('+c+','+a+')';g.lineWidth=1.6;g.stroke();
  if(crack){g.strokeStyle='rgba(255,250,235,'+a+')';g.lineWidth=1.4;g.beginPath();g.moveTo(x-s*.1,y-s*.95);g.lineTo(x+s*.18,y-s*.35);g.lineTo(x-s*.2,y+s*.05);g.lineTo(x+s*.12,y+s*.55);g.lineTo(x-s*.05,y+s*.95);g.stroke()}}
function r23Feather(x,y,s,rot,a){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle='rgba(255,246,215,'+a+')';g.beginPath();g.ellipse(0,0,s*.32,s,0,0,7);g.fill();g.strokeStyle='rgba(255,215,120,'+a+')';g.lineWidth=.8;g.beginPath();g.moveTo(0,-s);g.lineTo(0,s*1.2);g.stroke();g.restore()}
/* ----- 1) บัฟทีมของซัพ (รูน คม / เร่ง) ----- */
function r23Buf(f,p,x,y,r,now,col,col2,gl){const a=p<.12?p/.12:1-Math.max(0,(p-.55)/.45),rr=r*(.5+.5*Math.min(1,p*2.4));g.save();g.globalCompositeOperation='lighter';
  glowAt(x,y,rr*.85,col,.3*a);vxRune(x,y+4,rr,now*.8+(f.s||0),col,.85*a,12);vxRune(x,y+4,rr*.6,-now*1.5,col2,.75*a,8);
  {const ph=170*Math.min(1,p*3.2),gr=g.createLinearGradient(x,y,x,y-ph);gr.addColorStop(0,'rgba('+col+','+.5*a+')');gr.addColorStop(1,'rgba('+col+',0)');g.fillStyle=gr;g.fillRect(x-16,y-ph,32,ph);
    const g2=g.createLinearGradient(x,y,x,y-ph*.8);g2.addColorStop(0,'rgba(255,255,255,'+.55*a+')');g2.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=g2;g.fillRect(x-4,y-ph*.8,8,ph*.8)}
  const n=LOWQ?5:9;for(let i=0;i<n;i++){const q=(p*1.5+i/n)%1,aa=i*6.283/n+(f.s||0),px=x+Math.cos(aa)*rr*.78,py=y+4+Math.sin(aa)*rr*.78*.55-q*70;gl(px,py,6+4*(1-q),col2,a*(1-q)*.95)}
  {const s=1+.25*Math.max(0,1-p*4);g.save();g.translate(x,y-58-p*26);g.scale(s,s);glowAt(0,0,30,col,.6*a);gl(0,0,15,col2,a);g.restore()}
  g.restore()}
FXB.rcr=(f,p,x,y,r,now)=>r23Buf(f,p,x,y,r,now,'255,90,70','255,190,150',r23Cross);
FXB.ras=(f,p,x,y,r,now)=>r23Buf(f,p,x,y,r,now,'255,210,60','170,235,255',r23Bolt);
/* ----- 3) โดมพิทักษ์ (อัลติซัพ รูน B) ----- */
FXB.rinv=(f,p,x,y,r,now)=>{const a=p<.1?p/.1:1-Math.max(0,(p-.5)/.5),R=r*Math.min(1,.35+p*1.6);g.save();g.globalCompositeOperation='lighter';
  glowAt(x,y-R*.3,R*.9,'255,235,170',.32*a);
  {const gr=g.createRadialGradient(x,y,R*.2,x,y,R);gr.addColorStop(0,'rgba(255,240,190,0)');gr.addColorStop(.85,'rgba(255,225,140,'+.22*a+')');gr.addColorStop(1,'rgba(255,250,220,'+.5*a+')');g.fillStyle=gr;g.beginPath();g.ellipse(x,y,R,R*.75,0,Math.PI,0);g.ellipse(x,y,R,R*.32,0,0,Math.PI);g.fill()}
  g.strokeStyle='rgba(255,245,200,'+.9*a+')';g.lineWidth=2.5;g.beginPath();g.ellipse(x,y,R,R*.75,0,Math.PI,0);g.stroke();g.beginPath();g.ellipse(x,y,R,R*.32,0,0,7);g.stroke();
  vxRune(x,y+2,R*.7,now*.7,'255,225,140',.7*a,10);
  const n=LOWQ?6:12;for(let i=0;i<n;i++){const q=(p*.9+fxR(f,i,1))%1,px=x+(fxR(f,i,2)-.5)*R*1.6,py=y-R*.8+q*R*.9;r23Feather(px,py,6,Math.sin(now*3+i)*.6,a*(1-q))}
  {g.save();g.translate(x,y-R*.75-18);g.globalAlpha=a;for(const s of[-1,1]){g.save();g.scale(s,1);for(let i=0;i<4;i++)r23Feather(10+i*7,-4+i*3,8-i,.9+i*.25,1);g.restore()}g.restore()}
  g.restore()};
/* ----- 4) โดมโล่ (นักรบ คำราม รูนปลุกขวัญ — เดิมไม่มีตัววาด) ----- */
FXB.shield=(f,p,x,y,r,now)=>{const a=p<.1?p/.1:1-Math.max(0,(p-.45)/.55),R=Math.min(r*.7,105)*Math.min(1,.3+p*2);g.save();g.globalCompositeOperation='lighter';
  glowAt(x,y-10,R*.9,'120,190,255',.45*a);
  {g.save();g.globalCompositeOperation='source-over';const gr=g.createRadialGradient(x,y-8,R*.2,x,y-8,R*.75);gr.addColorStop(0,'rgba(90,160,255,0)');gr.addColorStop(1,'rgba(90,160,255,'+.22*a+')');g.fillStyle=gr;g.beginPath();g.ellipse(x,y-8,R*.75,R*.8,0,Math.PI,0);g.ellipse(x,y-8,R*.75,R*.3,0,0,Math.PI);g.fill();g.strokeStyle='rgba(40,90,200,'+.55*a+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y-8,R*.75,R*.8,0,Math.PI,0);g.stroke();g.restore()}
  g.save();g.translate(x,y+2);g.scale(1,.55);g.strokeStyle='rgba(150,210,255,'+.9*a+')';g.lineWidth=3;g.beginPath();for(let i=0;i<=6;i++){const aa=i/6*6.283+now*.5;i?g.lineTo(Math.cos(aa)*R,Math.sin(aa)*R):g.moveTo(Math.cos(aa)*R,Math.sin(aa)*R)}g.stroke();
  g.lineWidth=1.4;g.beginPath();for(let i=0;i<=6;i++){const aa=i/6*6.283-now*.7;i?g.lineTo(Math.cos(aa)*R*.7,Math.sin(aa)*R*.7):g.moveTo(Math.cos(aa)*R*.7,Math.sin(aa)*R*.7)}g.stroke();g.restore();
  for(let i=0;i<6;i++){const aa=i/6*6.283+now*.5,px=x+Math.cos(aa)*R,py=y+2+Math.sin(aa)*R*.55;g.fillStyle='rgba(220,240,255,'+a+')';g.beginPath();g.arc(px,py,3,0,7);g.fill()}
  r23Shield(x,y-56-p*18,14,'150,210,255',a,0);g.restore()};
/* ----- 2) ฟ้าผ่าโซ่: ชั้นเสริมที่หนาและค้างนานขึ้น ----- */
function r23Pts(x0,y0,x1,y1,jit){const L=Math.hypot(x1-x0,y1-y0)||1,n=Math.max(3,L/16|0),nx=-(y1-y0)/L,ny=(x1-x0)/L,P=[[x0,y0]];for(let i=1;i<n;i++){const u=i/n,o=(Math.random()-.5)*jit*Math.sin(u*3.14);P.push([x0+(x1-x0)*u+nx*o,y0+(y1-y0)*u+ny*o])}P.push([x1,y1]);return P}
function r23Stroke(P,w,col,al){g.strokeStyle='rgba('+col+','+al+')';g.lineWidth=w;g.beginPath();P.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()}
function r23Zig(x0,y0,x1,y1,jit,w,col,al){r23Stroke(r23Pts(x0,y0,x1,y1,jit),w,col,al)}
/* สายฟ้า 3 ชั้น: ขอบน้ำเงินเข้ม (เห็นชัดบนพื้นสว่าง) → แกนฟ้า → แกนขาว ใช้เส้นซิกแซกชุดเดียวกัน */
function r23Light(x0,y0,x1,y1,jit,a,fl,big){const P=r23Pts(x0,y0,x1,y1,jit);g.globalCompositeOperation='source-over';r23Stroke(P,(big?12:9)*a+2,'40,80,200',.42*a);g.globalCompositeOperation='lighter';r23Stroke(P,(big?7:5)*a+1.5,'130,195,255',.9*a*fl);r23Stroke(P,big?3.2:2.3,'255,255,255',Math.min(1,a*1.3)*fl)}
FXB.r23ch=(f,p,x,y,r,now)=>{const P=f.pts;if(!P||P.length<2)return;const a=p<.1?1:Math.pow(1-(p-.1)/.9,.7),fl=.75+.25*Math.sin(now*55),big=P.length===2;g.save();g.lineCap='round';g.lineJoin='round';
  for(let i=1;i<P.length;i++){const [x0,y0]=P[i-1],[x1,y1]=P[i];r23Light(x0,y0,x1,y1,24,a,fl,big)}
  g.globalCompositeOperation='lighter';
  for(let i=1;i<P.length;i++){const [px,py]=P[i];glowAt(px,py,(big?44:30)*a+10,'150,205,255',.85*a);if(!LOWQ)for(let k=0;k<3;k++){const aa=Math.random()*6.283;r23Zig(px,py,px+Math.cos(aa)*20,py+Math.sin(aa)*20,6,1.4,'235,248,255',a)}}
  if(big){const [tx,ty]=P[1],k=Math.min(1,p*4),sx=tx+(fxR(f,1,1)-.5)*40;r23Light(sx,ty-250,tx,ty,40,a,fl,1);g.globalCompositeOperation='lighter';
    g.save();g.translate(tx,ty+12);g.scale(1,.5);g.strokeStyle='rgba(170,215,255,'+.9*(1-k)+')';g.lineWidth=5*(1-k)+1;g.beginPath();g.arc(0,0,20+k*80,0,7);g.stroke();g.restore();glowAt(tx,ty-60,80*a,'150,200,255',.35*a)}
  g.restore()};
/* ----- 4) พุ่ง: ภาพติดตา + เส้นความเร็ว + แสงเฉือนปลายทาง ----- */
FXB.r23dsh=(f,p,x,y,r,now)=>{const L=f.len||100,an=f.a||0,ca=Math.cos(an),sa=Math.sin(an),ex=x+ca*L,ey=y+sa*L,a=1-p,nx=-sa,ny=ca;g.save();g.globalCompositeOperation='lighter';
  g.globalCompositeOperation='source-over';for(let i=0;i<3;i++){const u=.2+i*.27,px=x+ca*L*u,py=y+sa*L*u-14,al=a*(.22+i*.14);g.fillStyle='rgba(200,80,40,'+al+')';g.beginPath();g.ellipse(px,py,10,18,0,0,7);g.fill();g.beginPath();g.arc(px,py-19,7,0,7);g.fill()}g.globalCompositeOperation='lighter';
  for(let i=0;i<3;i++){const u=.2+i*.27,px=x+ca*L*u,py=y+sa*L*u-14,al=a*(.25+i*.15);g.strokeStyle='rgba(255,220,170,'+al+')';g.lineWidth=1.6;g.beginPath();g.ellipse(px,py,10,18,0,0,7);g.stroke()}
  for(let i=0;i<(LOWQ?3:6);i++){const o=(fxR(f,i,1)-.5)*36,u0=fxR(f,i,2)*.5,u1=u0+.35+fxR(f,i,3)*.3,s=p*.4;g.strokeStyle='rgba(255,240,220,'+.7*a+')';g.lineWidth=1.4;g.beginPath();g.moveTo(x+ca*L*(u0+s)+nx*o,y-12+sa*L*(u0+s)+ny*o);g.lineTo(x+ca*L*Math.min(1,u1+s)+nx*o,y-12+sa*L*Math.min(1,u1+s)+ny*o);g.stroke()}
  if(p<.7){const k=p/.7,sw=1.8;g.save();g.translate(ex,ey-12);g.rotate(an);g.strokeStyle='rgba(255,220,160,'+(1-k)+')';g.lineWidth=6*(1-k)+1;g.beginPath();g.arc(0,0,24+k*16,-sw/2,sw/2);g.stroke();g.strokeStyle='rgba(255,255,255,'+(1-k)+')';g.lineWidth=2;g.beginPath();g.arc(0,0,22+k*16,-sw/2.4,sw/2.4);g.stroke();g.restore();glowAt(ex,ey-12,30*(1-k),'255,170,90',.6*(1-k))}
  g.restore()};
/* ----- 5) ลูกธนูลมกรด (เดิมเส้นบาง 2.4px) ----- */
FXB.rnarrow=(f,p,x,y,r,now)=>{const k=1-p*.6,q=Math.min(1,p*1.4),ex=x+(f.sx-x)*q,ey=y+(f.sy-y)*q,an=Math.atan2(f.sy-y,f.sx-x),ca=Math.cos(an),sa=Math.sin(an);g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
  if(q<1){const tx=ex-ca*70,ty=ey-sa*70,gr=g.createLinearGradient(tx,ty,ex,ey);gr.addColorStop(0,'rgba(120,255,190,0)');gr.addColorStop(1,'rgba(180,255,215,'+.75*k+')');g.strokeStyle=gr;g.lineWidth=8;g.beginPath();g.moveTo(tx,ty);g.lineTo(ex,ey);g.stroke();
    for(const s of[-1,1]){g.strokeStyle='rgba(200,255,225,'+.5*k+')';g.lineWidth=1.2;g.beginPath();for(let i=0;i<=8;i++){const u=i/8,px=ex-ca*60*u-sa*s*Math.sin(u*9+now*30)*5,py=ey-sa*60*u+ca*s*Math.sin(u*9+now*30)*5;i?g.lineTo(px,py):g.moveTo(px,py)}g.stroke()}
    g.globalCompositeOperation='source-over';g.strokeStyle='rgba(20,90,60,'+.55*k+')';g.lineWidth=5;g.beginPath();g.moveTo(ex-ca*26,ey-sa*26);g.lineTo(ex,ey);g.stroke();g.globalCompositeOperation='lighter';
    g.strokeStyle='rgba(255,255,255,'+k+')';g.lineWidth=2.6;g.beginPath();g.moveTo(ex-ca*24,ey-sa*24);g.lineTo(ex,ey);g.stroke();
    g.fillStyle='rgba(235,255,245,'+k+')';g.beginPath();g.moveTo(ex+ca*7,ey+sa*7);g.lineTo(ex-ca*3-sa*5,ey-sa*3+ca*5);g.lineTo(ex-ca*3+sa*5,ey-sa*3-ca*5);g.closePath();g.fill();glowAt(ex,ey,18,'160,255,200',.7*k)}
  else{const z=(p-.71)/.29;glowAt(f.sx,f.sy,24*(1-z)+6,'170,255,210',.8*(1-z));g.strokeStyle='rgba(210,255,230,'+(1-z)+')';g.lineWidth=2;g.beginPath();g.arc(f.sx,f.sy,6+z*22,0,7);g.stroke();if(!f.r23i){f.r23i=1;try{spark(f.sx,f.sy,'#c8ffe0',LOWQ?4:9,150,.35)}catch(e){}}}
  g.restore()};
/* ----- 5) สุริยะ: ตราดวงอาทิตย์ก่อตัว → ลำแสงฟาดลงจากฟ้าตรงจังหวะระเบิด (1 วิ) ----- */
FXB.r23sun=(f,p,x,y,r,now)=>{const T=.667;g.save();g.globalCompositeOperation='lighter';
  if(p<T){const k=p/T,R=40+k*50;glowAt(x,y,R*1.2,'255,190,80',.25+.35*k);vxRune(x,y+2,R,now*1.6,'255,210,110',.5+.4*k,12);vxRune(x,y+2,R*.55,-now*2.4,'255,240,170',.4+.5*k,6);
    for(let i=0;i<8;i++){const aa=i*.785+now*.8;g.strokeStyle='rgba(255,220,120,'+(.25+.5*k)+')';g.lineWidth=2;g.beginPath();g.moveTo(x+Math.cos(aa)*R*1.05,y+2+Math.sin(aa)*R*.58);g.lineTo(x+Math.cos(aa)*R*1.35,y+2+Math.sin(aa)*R*.74);g.stroke()}
    const w=2+k*6,gr=g.createLinearGradient(x,y-320,x,y);gr.addColorStop(0,'rgba(255,240,180,0)');gr.addColorStop(1,'rgba(255,230,150,'+(.15+.45*k)+')');g.fillStyle=gr;g.fillRect(x-w/2,y-320,w,320);glowAt(x,y-300,30+k*30,'255,220,140',.3+.4*k)}
  else{const k=(p-T)/(1-T),a=k<.3?1:1-(k-.3)/.7,w=56*(1-k*.5);
    {const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'rgba(255,170,60,0)');gr.addColorStop(.5,'rgba(255,220,140,'+.8*a+')');gr.addColorStop(1,'rgba(255,170,60,0)');g.fillStyle=gr;g.fillRect(x-w,y-340,w*2,340)}
    g.fillStyle='rgba(255,255,240,'+.95*a+')';g.fillRect(x-w*.18,y-340,w*.36,340);glowAt(x,y,140*a+20,'255,210,120',.75*a);
    g.save();g.translate(x,y+4);g.scale(1,.5);g.strokeStyle='rgba(255,230,160,'+a+')';g.lineWidth=7*a+1;g.beginPath();g.arc(0,0,60+k*110,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=2;g.beginPath();g.arc(0,0,45+k*90,0,7);g.stroke();g.restore();
    if(!f.r23i){f.r23i=1;try{burst(x,y,['#fff4c0','#ffd070','#ffffff'],LOWQ?10:26,200,.6,{glow:1,g:-40,rad:20,up:40})}catch(e){}}}
  g.restore()};
/* ----- ชั้นพื้น (ใต้ตัวละคร): ออร่าที่เท้า · วงเจาะเกราะ · หมอกพิษร้าย ----- */
function r23Ground(){if(!me.cls&&!R23.tox.length)return;const n=r23Now(),t=n/1000;g.save();g.globalCompositeOperation='lighter';
  if(me.cls&&me.down<=0){const x=me.x,y=me.y+2;
    const ring=(R,col,al,dash,rot)=>{g.save();g.translate(x,y);g.scale(1,.5);g.rotate(rot);g.strokeStyle='rgba('+col+','+al+')';g.lineWidth=2.2;if(dash)g.setLineDash(dash);g.beginPath();g.arc(0,0,R,0,7);g.stroke();g.restore()};
    if(me.rcrT>0){const a=Math.min(1,me.rcrT)*.85;ring(25,'255,100,80',a,[5,4],t*1.2);for(let i=0;i<4;i++){const aa=i*1.571+t*1.2;g.strokeStyle='rgba(255,170,140,'+a+')';g.lineWidth=2;g.beginPath();g.moveTo(x+Math.cos(aa)*20,y+Math.sin(aa)*10);g.lineTo(x+Math.cos(aa)*30,y+Math.sin(aa)*15);g.stroke()}}
    if(me.rasT>0){const a=Math.min(1,me.rasT)*.85;ring(me.rcrT>0?33:25,'255,215,80',a,[3,5],-t*2.2);if(!LOWQ&&Math.random()<.18)try{spark(x+(Math.random()-.5)*40,y-4,'#fff0a0',1,60,.3)}catch(e){}}
    if(me.rnThorn>n){const a=Math.min(1,(me.rnThorn-n)/400),R=40;glowAt(x,y,46,'255,70,60',.18*a);g.fillStyle='rgba(255,90,70,'+.8*a+')';
      for(let i=0;i<12;i++){const aa=i/12*6.283+t*.6,px=x+Math.cos(aa)*R,py=y+Math.sin(aa)*R*.5,ox=Math.cos(aa),oy=Math.sin(aa)*.5;g.beginPath();g.moveTo(px+ox*12,py+oy*12-3);g.lineTo(px-oy*4,py+ox*4*.5);g.lineTo(px+oy*4,py-ox*4*.5);g.closePath();g.fill()}
      ring(R,'255,120,90',.6*a,null,0)}
    if(me.rage>0&&me.rnBlood>0){const k=.35+.65*Math.max(0,1-me.hp/me.mh),pu=.75+.25*Math.sin(t*(6+8*k));glowAt(x,y-14,34+20*k,'255,30,40',(.25+.35*k)*pu);ring(26+6*k,'255,50,60',.7*pu,null,0)}
    if(me.rage>0&&me.rnRock>0){ring(28,'200,180,150',.6,[10,4],t*.4)}}
  /* วงเจาะเกราะที่เท้ามอน */
  for(const m of mons){const v=RVUL[m.id];if(!v||v<=n||m.hp<=0||m.x<cam.x-60||m.x>cam.x+W+60||m.y<cam.y-60||m.y>cam.y+H+60)continue;const a=Math.min(1,(v-n)/400),R=((MT[m.t]&&mR(m))||12)*1.5+6;
    g.save();g.translate(m.x,m.y+2);g.scale(1,.5);g.rotate(t*1.5);g.strokeStyle='rgba(255,150,60,'+.85*a+')';g.lineWidth=2.5;for(let i=0;i<6;i++){g.beginPath();g.arc(0,0,R,i*1.047,i*1.047+.7);g.stroke()}g.restore()}
  /* หมอกพิษร้าย (ม่วงเดือดฟอง) */
  if(R23.tox.length){R23.tox=R23.tox.filter(z=>n-z.t0<z.d);for(const z of R23.tox){const e=n-z.t0,a=Math.min(1,e/300,(z.d-e)/500);g.globalCompositeOperation='source-over';
      const gr=g.createRadialGradient(z.x,z.y,0,z.x,z.y,z.r);gr.addColorStop(0,'rgba(120,40,150,'+.22*a+')');gr.addColorStop(.75,'rgba(90,20,110,'+.16*a+')');gr.addColorStop(1,'rgba(60,10,80,0)');g.fillStyle=gr;g.beginPath();g.ellipse(z.x,z.y,z.r,z.r*.62,0,0,7);g.fill();
      g.globalCompositeOperation='lighter';const nb=LOWQ?6:14;for(let i=0;i<nb;i++){const sd=i*97.13+z.t0,q=((t*.7+((sd*.618)%1))%1),aa=(sd*1.7)%6.283,d=((sd*.37)%1)*z.r*.85,px=z.x+Math.cos(aa)*d,py=z.y+Math.sin(aa)*d*.6-q*26;
        g.strokeStyle='rgba(210,120,255,'+.6*a*(1-q)+')';g.lineWidth=1.3;g.beginPath();g.arc(px,py,2+q*4,0,7);g.stroke()}
      g.save();g.translate(z.x,z.y);g.scale(1,.62);g.strokeStyle='rgba(190,90,230,'+.45*a+')';g.lineWidth=2;g.setLineDash([8,6]);g.lineDashOffset=-t*20;g.beginPath();g.arc(0,0,z.r,0,7);g.stroke();g.restore()}}
  g.restore()}
/* ----- ชั้นบน (ทับตัวละคร): โดมอมตะ · หินผา · หยดเลือด · ควันหลบ · ตราเกราะแตก · สัญลักษณ์บัฟ ----- */
function r23Top(){const n=r23Now(),t=n/1000;g.save();
  if(me.cls&&me.down<=0){const x=me.x,y=me.y;g.globalCompositeOperation='lighter';
    if(me.r23inv>n&&me.inv3>0){const a=Math.min(1,(me.r23inv-n)/400),pu=.8+.2*Math.sin(t*6);
      const gr=g.createRadialGradient(x,y-8,8,x,y-8,34);gr.addColorStop(0,'rgba(255,240,190,0)');gr.addColorStop(.8,'rgba(255,225,140,'+.18*a*pu+')');gr.addColorStop(1,'rgba(255,250,220,'+.5*a*pu+')');g.fillStyle=gr;g.beginPath();g.ellipse(x,y-6,32,38,0,Math.PI,0);g.ellipse(x,y-6,32,12,0,0,Math.PI);g.fill();
      g.strokeStyle='rgba(255,240,190,'+.8*a+')';g.lineWidth=1.6;g.beginPath();g.ellipse(x,y-6,32,38,0,Math.PI,0);g.stroke();
      for(let i=0;i<2;i++){const aa=t*2.2+i*3.14;r23Feather(x+Math.cos(aa)*30,y-24+Math.sin(aa)*10,6,aa,.9*a)}}
    if(me.rage>0&&me.rnRock>0){for(let i=0;i<3;i++){const aa=t*1.8+i*2.094,px=x+Math.cos(aa)*28,py=y-16+Math.sin(aa)*12,front=Math.sin(aa)>0;g.globalCompositeOperation='source-over';g.globalAlpha=front?1:.55;
        g.fillStyle='#8a7a66';g.strokeStyle='#3a3026';g.lineWidth=1.2;g.beginPath();g.moveTo(px-7,py-5);g.lineTo(px+2,py-8);g.lineTo(px+8,py-2);g.lineTo(px+4,py+6);g.lineTo(px-6,py+5);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(255,240,210,.5)';g.beginPath();g.moveTo(px-5,py-4);g.lineTo(px+1,py-6);g.lineTo(px-1,py-1);g.closePath();g.fill()}g.globalAlpha=1;g.globalCompositeOperation='lighter'}
    if(me.rage>0&&me.rnBlood>0){const k=Math.max(0,1-me.hp/me.mh),nd=LOWQ?2:3+Math.round(k*4);g.globalCompositeOperation='source-over';for(let i=0;i<nd;i++){const q=(t*.9+i/nd)%1,px=x+Math.sin(i*2.4+t)*16,py=y-8-q*36;g.fillStyle='rgba(220,20,40,'+.85*(1-q)+')';g.beginPath();g.moveTo(px,py-4);g.quadraticCurveTo(px+3,py+1,px,py+3);g.quadraticCurveTo(px-3,py+1,px,py-4);g.fill()}g.globalCompositeOperation='lighter'}
    if(me.rnSmk>n){const a=Math.min(1,(me.rnSmk-n)/400);g.globalCompositeOperation='source-over';for(let i=0;i<6;i++){const aa=t*1.4+i*1.047,px=x+Math.cos(aa)*22,py=y-12+Math.sin(aa)*9,rr=9+Math.sin(t*3+i)*2;g.fillStyle='rgba(70,60,90,'+.28*a+')';g.beginPath();g.arc(px,py+2,rr+1,0,7);g.fill();g.fillStyle='rgba(215,205,235,'+.42*a+')';g.beginPath();g.arc(px,py,rr,0,7);g.fill()}g.globalCompositeOperation='lighter'}
    if(me.rcrT>0||me.rasT>0){const a=Math.min(1,Math.max(me.rcrT||0,me.rasT||0))*.9,bx=x+20,by=y-48+Math.sin(t*3)*2;if(me.rcrT>0)r23Cross(bx,by,6,'255,110,90',a);if(me.rasT>0)r23Bolt(me.rcrT>0?bx+13:bx,by,6,'255,220,80',a)}}
  /* ตราเกราะแตกบนหัวมอนที่ถูกเจาะเกราะ */
  g.globalCompositeOperation='source-over';
  for(const m of mons){const v=RVUL[m.id];if(!v||v<=n||m.hp<=0||m.x<cam.x-60||m.x>cam.x+W+60||m.y<cam.y-80||m.y>cam.y+H+60)continue;const a=Math.min(1,(v-n)/400),r=(MT[m.t]&&mR(m))||12,by=m.y-r*(m.t>=3?3.4:1.9)-16+Math.sin(t*4+m.id)*1.5;
    g.globalCompositeOperation='lighter';glowAt(m.x-18,by,17,'255,140,60',.6*a);g.globalCompositeOperation='source-over';g.save();g.translate(m.x-18,by);g.scale(1.15,1.15);r23Shield(0,0,10,'40,20,10',.75*a,0);g.restore();r23Shield(m.x-18,by,10,'255,150,70',a,1)}
  g.restore()}
/* ----- ตัวรับ fx: เพิ่มชั้นภาพเสริมทุกเครื่อง (ทั้งของเราและที่ส่งมาจากผู้เล่นอื่น) ----- */
function r23On(o){if(!o||!o.k)return;const k=o.k,n=r23Now();
  if(k==='chain'&&Array.isArray(o.pts)&&o.pts.length>1){const P=o.pts.slice(0,9).filter(q=>Array.isArray(q)).map(q=>[+q[0]||0,+q[1]||0]);if(P.length>1)fxs.push({k:'r23ch',x:P[0][0],y:P[0][1],r:40,t:.75,d:.75,s:Math.random()*999,pts:P})}
  if(k==='dash'&&isFinite(+o.a)&&isFinite(+o.x)){fxs.push({k:'r23dsh',x:+o.x,y:+o.y,r:30,a:+o.a,len:+o.len||100,t:.5,d:.5,s:Math.random()*999});if(!LOWQ)try{burst(+o.x,+o.y,['#c8b090','#8a7a66'],8,70,.4,{g:20,r:3})}catch(e){}}
  if(k==='fog'&&o.ns&&isFinite(+o.x)){R23.tox.push({x:+o.x,y:+o.y,r:+o.r||100,t0:n,d:Math.min(9000,(+o.dur||5)*1000)});if(R23.tox.length>6)R23.tox.shift()}
  if(k==='rinv'&&me.cls&&me.down<=0&&dist(me,o)<(+o.r||230))me.r23inv=n+(+o.v||2)*1000}
setTimeout(()=>{
  try{Object.assign(FXD,{rcr:1.3,ras:1.3,rinv:1.2,shield:1,r23sun:1.5})}catch(e){}
  try{Object.assign(FXTOP,{r23sun:1,r23ch:1,rnarrow:1,rinv:1,r23dsh:1})}catch(e){}
  try{const _h=handleFx;handleFx=function(o){const r=_h.apply(this,arguments);try{r23On(o)}catch(e){}return r}}catch(e){}
  try{const _gg=gxGroundFx;gxGroundFx=function(){const r=_gg.apply(this,arguments);try{r23Ground()}catch(e){}return r}}catch(e){}
  try{const _dr=drawRx;drawRx=function(){const r=_dr.apply(this,arguments);try{r23Top()}catch(e){}return r}}catch(e){}
  try{const _u=rnUlt;rnUlt=function(c,P){try{if(c==='archer'&&me.cls&&rnOf(2)==='a'){const t=pickTarget(360)||nearestMon(360);if(t)fx({k:'r23sun',x:Math.round(t.x),y:Math.round(t.y),r:70})}}catch(e){}return _u.apply(this,arguments)}}catch(e){}
},0);
