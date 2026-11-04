/* ---------- v587 พื้นค่ายมีมิติ: ลานดินใต้อาคาร + ทางเดินดินแยกเข้าแต่ละร้าน + กรวด/หญ้า/ดอกไม้ริมทาง ----------
   วาดครั้งเดียวในแคชพื้นค่าย (ไม่เพิ่มงานต่อเฟรม) · พิกัดสัมพัทธ์กลางค่าย · ทางเดินแยกออกจากถนนหินเส้นที่ใกล้สุด
   ปิด: CG2.off=1 แล้ว CAMP.cache=null */
const CG2={off:0,a:[]};
/* [x,y,rx,ry,ทางเข้า dx,dy] : ลานดิน (จุดกลาง/รัศมี) + จุดหน้าร้านที่ทางเดินมาถึง */
function cg2Anch(){const A=[],M=MAPS[1],P=(o,dx,dy,rx,ry,fx,fy)=>{if(o)A.push([o.x-CX+dx,o.y-CY+dy,rx,ry,fx,fy])};
  P(M.npc5,12,8,64,30,8,30);                       /* ร้านรูนไอริส */
  P({x:CX-261,y:CY+101.5},2,18,68,28,20,26);         /* คอกม้า */
  P(M.npc3,0,14,62,28,-10,30);                      /* ช่างตีบวก */
  P(M.npc,0,14,44,20,0,22);                         /* พ่อค้ายา */
  try{P(WBS[0],0,24,92,30,0,32)}catch(e){}          /* อนุสาวรีย์วีรชน */
  try{P(TFN,0,46,62,26,0,30)}catch(e){}             /* ไซลัส ช่างโอนบวก */
  try{P(GHG,0,14,56,24,0,26)}catch(e){}             /* ประตูบ้านกิลด์ */
  (M.gates||[]).forEach(G=>{const x=G.x-CX,y=G.y-CY;if(Math.hypot(x,y)<CAMP.R-60&&!A.some(q=>Math.hypot(q[0]-x,q[1]-y)<40))A.push([x,y+18,40,18,0,24])});
  return A}
function campG2Hit(x,y){if(CG2.off)return false;for(const a of CG2.a){if(a[2]&&((x-a[0])/(a[2]+6))**2+((y-a[1])/(a[3]+6))**2<1)return true}for(const t of CG2.tr||[]){for(let i=0;i<=8;i++){const q=i/8,px=(1-q)*(1-q)*t[0]+2*(1-q)*q*t[2]+q*q*t[4],py=(1-q)*(1-q)*t[1]+2*(1-q)*q*t[3]+q*q*t[5];if(Math.hypot(x-px,y-py)<13)return true}}return false}
function cg2Blob(x,y,rx,ry,r){const N=22,pts=[];for(let i=0;i<N;i++){const a=i/N*6.283,k=.86+r()*.26+Math.sin(a*3+x)*.05;pts.push([x+Math.cos(a)*rx*k,y+Math.sin(a)*ry*k])}
  const path=()=>{g.beginPath();pts.forEach((p,i)=>{const q=pts[(i+1)%N],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;i?g.quadraticCurveTo(p[0],p[1],mx,my):g.moveTo(mx,my)});g.closePath()};
  /* ขอบนุ่ม: วงนอกจาง → ใน */
  g.save();g.globalAlpha=.35;g.fillStyle='#6e5a3c';g.translate(x,y);g.scale(1.12,1.16);g.translate(-x,-y);path();g.fill();g.restore();
  const gr=g.createRadialGradient(x,y-ry*.2,2,x,y,Math.max(rx,ry));gr.addColorStop(0,'rgba(150,120,84,.92)');gr.addColorStop(.7,'rgba(128,100,68,.88)');gr.addColorStop(1,'rgba(104,82,54,.7)');g.fillStyle=gr;path();g.fill();
  /* คราบดิน รอยเท้า กรวด */
  for(let i=0;i<rx*ry/22;i++){const a=r()*6.283,d=Math.sqrt(r())*.9,px=x+Math.cos(a)*rx*d,py=y+Math.sin(a)*ry*d;g.fillStyle=r()<.5?'rgba(80,60,38,.28)':'rgba(196,170,128,.22)';g.beginPath();g.ellipse(px,py,1.2+r()*3,.8+r()*1.6,r()*3,0,7);g.fill()}
  for(let i=0;i<rx/5;i++){const a=r()*6.283,d=Math.sqrt(r())*.85,px=x+Math.cos(a)*rx*d,py=y+Math.sin(a)*ry*d;cg2Peb(px,py,r)}
  /* หญ้าขึ้นแซมขอบ */
  for(let i=0;i<rx*.9;i++){const a=r()*6.283,k=.88+r()*.2,px=x+Math.cos(a)*rx*k,py=y+Math.sin(a)*ry*k;cg2Tuft(px,py,r)}}
function cg2Peb(x,y,r){const s=.9+r()*1.7,c=['#a49a88','#8a8272','#b8ae9a','#7e766a'][(r()*4)|0];g.fillStyle='rgba(30,22,14,.35)';g.beginPath();g.ellipse(x+.4,y+.6,s*1.2,s*.8,0,0,7);g.fill();g.fillStyle=c;g.beginPath();g.ellipse(x,y,s*1.2,s*.8,r()*.6,0,7);g.fill();g.fillStyle='rgba(255,250,235,.3)';g.beginPath();g.ellipse(x-s*.3,y-s*.25,s*.45,s*.25,0,0,7);g.fill()}
function cg2Tuft(x,y,r){const n=3+(r()*3|0),c=r()<.5?'rgba(44,76,30,.85)':'rgba(104,146,62,.8)';g.strokeStyle=c;g.lineWidth=.9;for(let i=0;i<n;i++){g.beginPath();g.moveTo(x+(i-n/2)*.9,y);g.quadraticCurveTo(x+(i-n/2)*1.4,y-2,x+(i-n/2)*2+(r()-.5),y-3-r()*3);g.stroke()}}
function cg2Trail(t,r){const[sx,sy,cx,cy,ex,ey]=t,L=Math.hypot(ex-sx,ey-sy),stroke=(w,c)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(cx,cy,ex,ey);g.stroke()};
  g.save();g.lineCap='round';stroke(19,'rgba(96,78,50,.28)');stroke(13,'rgba(132,104,70,.75)');stroke(6,'rgba(170,140,98,.35)');g.restore();
  const pt=q=>[(1-q)*(1-q)*sx+2*(1-q)*q*cx+q*q*ex,(1-q)*(1-q)*sy+2*(1-q)*q*cy+q*q*ey];
  const n=Math.max(4,L/9|0);for(let i=0;i<=n;i++){const q=i/n,[px,py]=pt(q),[qx,qy]=pt(Math.min(1,q+.02)),dx=qx-px,dy=qy-py,dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl;
    if(r()<.55)cg2Peb(px+nx*(r()-.5)*8,py+ny*(r()-.5)*8,r);for(const sd of[-1,1])if(r()<.7)cg2Tuft(px+nx*sd*(7+r()*3),py+ny*sd*(7+r()*3),r);
    if(r()<.12){const f=[['#ffd84a','#c88a10'],['#f4f0e8','#ffe080'],['#b890f0','#e8d8ff']][(r()*3)|0],sd=r()<.5?-1:1,fx=px+nx*sd*12,fy=py+ny*sd*12;g.fillStyle=f[0];for(let k=0;k<4;k++){g.beginPath();g.arc(fx+Math.cos(k*1.57)*1.2,fy+Math.sin(k*1.57),1.05,0,7);g.fill()}g.fillStyle=f[1];g.beginPath();g.arc(fx,fy,.6,0,7);g.fill()}}}
/* เรียกจาก campStatic หลังวาดถนนหิน/ลานกองไฟ ก่อนดอกไม้ */
function campG2(){if(CG2.off){CG2.a=[];CG2.tr=[];return}const r=rng(hseed('campg2')),PW=26,ry=.88;CG2.a=cg2Anch();CG2.tr=[];
  /* ต่อทางเดินจากจุดที่ใกล้สุด: ขอบถนนแนวตั้ง (ระดับเดียวกับหน้าร้าน) · ถนนแนวนอนเฉพาะร้านที่อยู่เหนือถนน (เดินเข้าหน้าร้านจากด้านล่าง) · หรือปลายทางเดินร้านก่อนหน้า */
  const ends=[],ord=CG2.a.map((a,i)=>i).sort((i,j)=>Math.hypot(CG2.a[i][0],CG2.a[i][1])-Math.hypot(CG2.a[j][0],CG2.a[j][1]));
  for(const i of ord){const[x,y,rx,ry2,fx,fy]=CG2.a[i],ex=x+fx,ey=y+fy,C=[[(ex>0?1:-1)*(PW-2),ey]];if(ey<0)C.push([ex,-(PW-2)]);ends.forEach(e=>C.push(e));
    let best=null,bd=1e9;for(const[cx,cy]of C){let sx=cx,sy=cy;if(Math.hypot(sx,sy/ry)<142){const k=148/Math.max(1,Math.hypot(ex,ey/ry));sx=ex*k;sy=ey*k}const d=Math.hypot(ex-sx,ey-sy);if(d<bd){bd=d;best=[sx,sy]}}
    ends.push([ex,ey]);if(best&&bd>16){const[sx,sy]=best,mx=(sx+ex)/2+(ey-sy)*.12,my=(sy+ey)/2-(ex-sx)*.12;CG2.tr.push([sx,sy,mx,my,ex,ey])}}
  for(const t of CG2.tr)cg2Trail(t,r);
  for(const a of CG2.a)if(a[2])cg2Blob(a[0],a[1],a[2],a[3],r)}
