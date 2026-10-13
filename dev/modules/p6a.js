/* ---------- v340 ภาค 6 บทที่ 1 · สะพานรุ่งอรุณ (แมพ 30 · สะพานแสงเหนือทะเลเมฆ) ---------- */
const BRP=[[1600,3010],[1600,2760],[1400,2420],[1320,2080],[1600,1700],[1940,1330],[1980,1000],[1720,660],[1600,430],[1600,200]],BHW=140;
const BRC=[[1600,2930,250],[1600,1700,330],[1600,330,250],[860,2120,190],[2580,1150,190]];
const BRS=[[1330,2090,860,2120,74],[1960,1150,2580,1150,74]];
let BRG={pa:null,F:null,dec:[],cl:[],ns:[]};const BRGS={ses:new Set(),sh:[0,0,0,0,0,0],shb:0,lx:1600,ly:2900};
const gP6esc=()=>{const i=STY.findIndex(x=>x.p6e);return i>=0&&!!me.sty&&(me.sty.s|0)>i};
function brgPath(){if(BRG.pa)return BRG.pa;const P=BRP,raw=[];
  for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
    for(let k=0;k<30;k++){const t=k/30,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);raw.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}
  raw.push(P[P.length-1].slice());
  const S=10,out=[raw[0].slice()];let px=raw[0][0],py=raw[0][1],rem=S;
  for(let i=1;i<raw.length;i++){const x=raw[i][0],y=raw[i][1];let dx=x-px,dy=y-py,d=Math.hypot(dx,dy);while(d>=rem&&d>0){const t=rem/d;px+=dx*t;py+=dy*t;out.push([px,py]);dx=x-px;dy=y-py;d=Math.hypot(dx,dy);rem=S}rem-=d;px=x;py=y}
  out.push(raw[raw.length-1].slice());
  const N=out.map((p,i)=>{const a=out[Math.max(0,i-1)],b=out[Math.min(out.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1;return[-dy/d,dx/d]});
  return BRG.pa={p:out,n:N}}
function brgField(){if(BRG.F)return BRG.F;const P=brgPath().p,G=16,N=200,F=new Float32Array(N*N);
  for(let j=0;j<N;j++){const y=j*G+G/2,idx=[];for(let k=0;k<P.length;k++)if(Math.abs(P[k][1]-y)<BHW+60)idx.push(k);
    for(let i=0;i<N;i++){const x=i*G+G/2;let v=-1e9;
      for(const k of idx){const d=BHW-Math.hypot(x-P[k][0],y-P[k][1]);if(d>v)v=d}
      for(const[cx,cy,r]of BRC){const d=r-Math.hypot(x-cx,y-cy);if(d>v)v=d}
      for(const[x0,y0,x1,y1,w]of BRS){const dx=x1-x0,dy=y1-y0,t=Math.max(0,Math.min(1,((x-x0)*dx+(y-y0)*dy)/(dx*dx+dy*dy))),d=w-Math.hypot(x-x0-dx*t,y-y0-dy*t);if(d>v)v=d}
      F[j*N+i]=v}}
  return BRG.F=F}
function brgIn(x,y,m){if(x<0||y<0||x>=3200||y>=3200)return false;return brgField()[(y/16|0)*200+(x/16|0)]>(m||0)}
/* รูปรวมของสะพาน (ทุกชิ้นวนทิศเดียวกัน เพื่อให้เติม/ตัดเป็นเนื้อเดียว) */
function brgPolys(){if(BRG.pg)return BRG.pg;const pa=brgPath(),P=pa.p,N=pa.n,L=[];const A=[];
  for(let i=0;i<P.length;i++)A.push([P[i][0]+N[i][0]*BHW,P[i][1]+N[i][1]*BHW]);for(let i=P.length-1;i>=0;i--)A.push([P[i][0]-N[i][0]*BHW,P[i][1]-N[i][1]*BHW]);L.push(A);
  for(const[x0,y0,x1,y1,w]of BRS){const a=Math.atan2(y1-y0,x1-x0),nx=-Math.sin(a)*w,ny=Math.cos(a)*w;L.push([[x0+nx,y0+ny],[x1+nx,y1+ny],[x1-nx,y1-ny],[x0-nx,y0-ny]])}
  L.forEach((Q,k)=>{let s=0;for(let i=0;i<Q.length;i++){const a=Q[i],b=Q[(i+1)%Q.length];s+=a[0]*b[1]-b[0]*a[1]}if(s<0)Q.reverse()});return BRG.pg=L}
function brgU(c,dx,dy){dx=dx||0;dy=dy||0;c.beginPath();for(const Q of brgPolys()){c.moveTo(Q[0][0]+dx,Q[0][1]+dy);for(let i=1;i<Q.length;i++)c.lineTo(Q[i][0]+dx,Q[i][1]+dy);c.closePath()}for(const[cx,cy,r]of BRC){c.moveTo(cx+r+dx,cy+dy);c.arc(cx+dx,cy+dy,r,0,6.2832)}}
const BRGZN={land:['ฐานสะพานรุ่งอรุณ','ก้าวแรกจากแผ่นดิน สู่เมืองที่เคยปิดประตู'],low:['สะพานแสงช่วงล่าง','เมฆใต้เท้าเปลี่ยนสีตามแสงหัวใจดาว'],rest:['ลานพักกลางเมฆ','ทุกคนที่ขึ้นมา ต้องหยุดหายใจตรงนี้สักครั้ง'],
  high:['สะพานแสงช่วงบน','ยิ่งสูง เสียงจากใต้เมฆยิ่งชัด'],gate:['ประตูอัสตราที่เปิดกว้าง','สามร้อยปีที่ปิดตาย วันนี้เปิดให้ทุกคน'],west:['ระเบียงมองเมฆ','ใต้ทะเลเมฆ มีเงาของเมืองที่ห้อยกลับหัว'],east:['ระเบียงระฆังเงียบ','ระฆังที่ไม่มีใครตี แต่มีคนได้ยินทุกคืน']};
const brgZone=(x,y)=>Math.hypot(x-860,y-2120)<240?'west':Math.hypot(x-2580,y-1150)<240?'east':Math.hypot(x-1600,y-1700)<340?'rest':y>2660?'land':y<640?'gate':y>1700?'low':'high';
const P6LORE=[
 {x:1720,y:2990,t:'รอยสลักบนแผ่นแสงแผ่นแรก ด้วยมือเด็ก: «ปู่บอกว่าบรรพบุรุษของเราเคยอยู่บนฟ้า ข้าไม่เคยเชื่อ… จนวันนี้»'},
 {x:900,y:2180,t:'มองลงไปใต้ทะเลเมฆ… มีหอคอยห้อยหัวลงมา ยอดแหลมชี้ลงหาแผ่นดิน เหมือนเมืองที่ร่วงแล้วค้างอยู่กลางทาง'},
 {x:1460,y:1640,t:'เพลงกล่อมเด็กของค่ายมีท่อนหนึ่งว่า «หลับเถิดลูก แสงของเราอยู่บนฟ้า» ไม่มีใครในค่ายรู้ว่าหมายถึงแสงไหน'},
 {x:2540,y:1210,t:'ระฆังสำริดไร้ลิ้น สลักตราเฟืองตะวัน — ตราเดียวกับเกราะของทหารกระดูกที่ถูกรากดำลากขึ้นมาในคืนนั้น'},
 {x:1470,y:300,t:'บันทึกทหารเฝ้าประตู ปีที่หนึ่งแห่งอัสตรา: «วันนี้มีผู้คนจากเมืองที่ร่วงมาขอขึ้นเมือง ราชารับสั่งให้ปิดประตู ข้าไม่กล้ามองหน้าพวกเขา»'}];
const BRGSH=[[2520,1],[2160,-1],[1960,1],[1420,-1],[1080,1],[760,-1]];
const p6Got=i=>!!(me.sty&&((me.sty.p6m|0)>>i&1));
function brgShP(i){const pa=brgPath(),P=pa.p,N=pa.n,[yy,s]=BRGSH[i];let k=0,bd=1e9;P.forEach((p,j)=>{const d=Math.abs(p[1]-yy);if(d<bd){bd=d;k=j}});return[P[k][0]+N[k][0]*s*(BHW-18),P[k][1]+N[k][1]*s*(BHW-18)]}
function brgBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;brgField();
  const P=(x,y,r,k,o)=>{if(Math.hypot(x-M.sx,y-M.sy)<M.sr+30||M.gates.some(G=>Math.hypot(x-G.x,y-G.y)<100)||(M.npc&&Math.hypot(x-M.npc.x,y-M.npc.y)<60))return null;const t=Object.assign({x,y,r,k},o||{});trees.push(t);return t},
    I=(x,y,r)=>trees.push({x,y,r,inv:1,ns:1}),D=[],dec=(k,x0,y0,x1,y1,o)=>D.push(Object.assign({k,b:[x0,y0,x1,y1]},o||{}));
  BRG.dec=D;const pa=brgPath(),Pp=pa.p,Nn=pa.n;
  /* ชนขอบ (กำแพงล่องหน) */
  const E=(x,y)=>{if(!brgIn(x,y,-6))I(x,y,22)};
  for(let i=0;i<Pp.length;i+=3)for(const s of[-1,1])E(Pp[i][0]+Nn[i][0]*s*(BHW+18),Pp[i][1]+Nn[i][1]*s*(BHW+18));
  for(const[cx,cy,r]of BRC){const n=Math.round(r*6.283/30);for(let i=0;i<n;i++){const a=i/n*6.283;E(cx+Math.cos(a)*(r+18),cy+Math.sin(a)*(r+18))}}
  for(const[x0,y0,x1,y1,w]of BRS){const a=Math.atan2(y1-y0,x1-x0),L=Math.hypot(x1-x0,y1-y0);for(let q=0;q<L;q+=30)for(const s of[-1,1])E(x0+Math.cos(a)*q-Math.sin(a)*s*(w+18),y0+Math.sin(a)*q+Math.cos(a)*s*(w+18))}
  /* ตะเกียงผลึกตามราว */
  for(let i=8;i<Pp.length-8;i+=19){const[x,y]=Pp[i];if(BRC.some(([cx,cy,r])=>Math.hypot(x-cx,y-cy)<r+20))continue;for(const s of[-1,1])P(x+Nn[i][0]*s*(BHW-16),y+Nn[i][1]*s*(BHW-16),10,'blamp',{ht:86})}
  /* ฐานสะพาน · ฝั่งค่าย */
  trees.push({x:1600,y:3150,r:0,k:'barch',ht:230,hw:170,fw:110,ns:1,nc:1,lo:1});for(const x of[1420,1780])P(x,2860,10,'bban',{ht:90});for(const x of[1410,1790])P(x,3010,18,'bpyl',{ht:150});
  /* ลานพักกลางเมฆ */
  P(1430,1570,30,'btent',{ht:70,v:0});P(1790,1590,30,'btent',{ht:70,v:1});P(1600,1770,26,'bfire',{ht:50});P(1440,1820,24,'bcart',{ht:60});P(1770,1840,16,'bcrate',{ht:40});P(1810,1800,14,'bcrate',{ht:40,v:1});
  for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2;P(1600+Math.cos(a)*292,1700+Math.sin(a)*292,18,'bpyl',{ht:150})}
  /* ระเบียง */
  P(800,2060,16,'bscope',{ht:60});P(940,2040,10,'bban',{ht:90});P(2620,1090,30,'bbell',{ht:140,hw:60});P(2470,1080,10,'bban',{ht:90});
  /* ประตูอัสตรา */
  trees.push({x:1600,y:240,r:0,k:'barch',ht:300,hw:200,fw:130,ns:1,nc:1});for(const x of[1440,1760])P(x,430,10,'bban',{ht:90});for(const x of[1400,1800])P(x,300,18,'bpyl',{ht:150});
  /* เงาเกาะราว */
  BRGSH.forEach((_,i)=>{const[x,y]=brgShP(i);trees.push({x,y,r:0,k:'bshd',si:i,ht:60,ns:1,nc:1})});
  /* เมฆ + คราบเงา */
  {const R=gxRng(3030);BRG.cl=[];for(let i=0;i<170;i++)BRG.cl.push([R()*3200,R()*3200,60+R()*120,R()])}
  BRG.ns=(M.nests||[]).map(([x,y],i)=>{const R=gxRng(400+i),b=[];for(let k=0;k<7;k++)b.push([x+(R()-.5)*120,y+(R()-.5)*80,14+R()*26,R()*6.28]);return{x,y,b}});
  trees.forEach(t=>{if(t.inv||t.k==='bshd')return;dec('ao',t.x-70,t.y-30,t.x+70,t.y+40,{x:t.x,y:t.y,r:t.r,w:t.hw||0})})}
function brgCloud(c,cl){const[x,y,r,v]=cl,warm=y>1900,col=warm?'255,236,222':'236,226,255';for(let k=0;k<5;k++){const px=x+Math.cos(k*1.7+v*6)*r*.7,py=y+Math.sin(k*2.3+v*4)*r*.3,rr=r*(.55+((k*37+v*100)%10)/22);
  const gr=c.createRadialGradient(px,py-rr*.2,rr*.1,px,py,rr);gr.addColorStop(0,'rgba('+col+',.55)');gr.addColorStop(.6,'rgba('+col+',.25)');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(px-rr,py-rr,rr*2,rr*2)}}
function brgRuin(c){c.save();c.globalAlpha=.2;c.fillStyle='#2a1c48';
  for(const[x,y,w,h]of[[420,1820,70,520],[560,1900,46,380],[700,1760,90,640],[860,1980,52,330],[990,1860,64,460],[300,2050,40,260],[1120,2080,38,240]]){c.fillRect(x-w/2,y,w,h);c.beginPath();c.moveTo(x-w/2-8,y+h);c.lineTo(x,y+h+w*1.6);c.lineTo(x+w/2+8,y+h);c.closePath();c.fill();c.fillRect(x-w/2-10,y+h*.3,w+20,8)}
  c.beginPath();c.moveTo(640,2440);c.quadraticCurveTo(640,2560,600,2600);c.lineTo(800,2600);c.quadraticCurveTo(760,2560,760,2440);c.closePath();c.fill();c.globalAlpha=.35;c.fillStyle='#ffb060';
  for(let i=0;i<26;i++){const x=300+((i*137)%840),y=1900+((i*211)%560);c.fillRect(x,y,3,5)}c.restore()}
function brgPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S;const sk=c.createLinearGradient(0,0,0,3200);sk.addColorStop(0,'#2c2f6e');sk.addColorStop(.3,'#6a5a9a');sk.addColorStop(.6,'#d88aa0');sk.addColorStop(.85,'#f4b48a');sk.addColorStop(1,'#ffd49a');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  if(ox<1200&&X1>220&&Y1>1700&&oy<2700)brgRuin(c);
  for(const cl of BRG.cl){const r=cl[2]*1.6;if(cl[0]+r<ox||cl[0]-r>X1||cl[1]+r<oy||cl[1]-r>Y1)continue;brgCloud(c,cl)}
  c.fillStyle='rgba(60,24,84,.16)';brgU(c,48,100);c.fill();c.fillStyle='rgba(60,24,84,.12)';brgU(c,22,46);c.fill();
  c.fillStyle='#8a5a2c';brgU(c,0,20);c.fill();c.fillStyle='#d0a050';brgU(c,0,9);c.fill();
  c.strokeStyle='rgba(255,236,170,.4)';c.lineWidth=24;brgU(c);c.stroke();c.strokeStyle='#e0ac48';c.lineWidth=12;c.stroke();
  c.fillStyle='#f4e0b8';c.fill();
  c.save();brgU(c);c.clip();const pa=brgPath(),P=pa.p,N=pa.n,Lp=i=>[P[i][0]+N[i][0]*BHW,P[i][1]+N[i][1]*BHW],Rp=i=>[P[i][0]-N[i][0]*BHW,P[i][1]-N[i][1]*BHW];
  for(let i=0;i<P.length;i+=24){const[x,y]=P[i];if(x<ox-300||x>X1+300||y<oy-300||y>Y1+300)continue;const gr=c.createRadialGradient(x,y,10,x,y,240);gr.addColorStop(0,'rgba(255,250,235,.32)');gr.addColorStop(1,'rgba(255,250,235,0)');c.fillStyle=gr;c.fillRect(x-240,y-240,480,480)}
  for(let i=0;i+3<P.length;i+=3){const[x,y]=P[i];if(x<ox-220||x>X1+220||y<oy-220||y>Y1+220)continue;const a=Lp(i),b=Rp(i),a2=Lp(i+3),b2=Rp(i+3);
    if((i/3)%2){c.fillStyle='rgba(214,160,90,'+(.12+palH(i,3,30)*.12)+')';c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.lineTo(b2[0],b2[1]);c.lineTo(a2[0],a2[1]);c.closePath();c.fill()}
    c.strokeStyle='rgba(150,100,40,.38)';c.lineWidth=1.6;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke()}
  c.beginPath();c.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++)c.lineTo(P[i][0],P[i][1]);c.strokeStyle='rgba(205,150,60,.4)';c.lineWidth=60;c.stroke();c.strokeStyle='rgba(255,248,230,.55)';c.lineWidth=48;c.stroke();c.strokeStyle='rgba(225,170,70,.5)';c.lineWidth=1.2;
  for(const s of[-1,1]){c.beginPath();for(let i=0;i<P.length;i++)c.lineTo(P[i][0]+N[i][0]*s*27,P[i][1]+N[i][1]*s*27);c.stroke()}
  for(let i=11;i<P.length;i+=22){const[x,y]=P[i];if(x<ox-30||x>X1+30||y<oy-30||y>Y1+30)continue;c.fillStyle='rgba(216,160,60,.75)';PST(c,x,y,13,5,8,0);c.fill();c.fillStyle='rgba(255,250,235,.9)';c.beginPath();c.arc(x,y,3.4,0,7);c.fill()}
  for(const[cx,cy,r]of BRC){if(cx+r<ox||cx-r>X1||cy+r<oy||cy-r>Y1)continue;const gr=c.createRadialGradient(cx,cy,10,cx,cy,r);gr.addColorStop(0,'rgba(255,248,230,.4)');gr.addColorStop(1,'rgba(255,236,200,0)');c.fillStyle=gr;c.beginPath();c.arc(cx,cy,r,0,7);c.fill();
    for(const[rr,w,a]of[[r-16,3,.6],[r-30,1.2,.45],[r*.42,1.4,.5],[r*.28,1,.4]]){c.strokeStyle='rgba(216,164,64,'+a+')';c.lineWidth=w;c.beginPath();c.arc(cx,cy,rr,0,7);c.stroke()}
    c.strokeStyle='rgba(216,164,64,.22)';c.lineWidth=1;for(let i=0;i<24;i++){const a=i*Math.PI/12;c.beginPath();c.moveTo(cx+Math.cos(a)*r*.42,cy+Math.sin(a)*r*.42);c.lineTo(cx+Math.cos(a)*(r-30),cy+Math.sin(a)*(r-30));c.stroke()}
    c.fillStyle='rgba(206,150,56,.4)';PST(c,cx,cy,r*.2,r*.08,12,0);c.fill();c.fillStyle='rgba(255,248,225,.9)';c.beginPath();c.arc(cx,cy,r*.08,0,7);c.fill()}
  for(const n of BRG.ns){if(n.x<ox-140||n.x>X1+140||n.y<oy-140||n.y>Y1+140)continue;for(const[x,y,r,a]of n.b){c.fillStyle='rgba(34,14,46,.26)';c.beginPath();c.ellipse(x,y,r,r*.6,a,0,7);c.fill()}
    c.strokeStyle='rgba(34,14,46,.32)';c.lineWidth=2.4;for(let k=0;k<6;k++){const a=k*1.05+n.x*.01;c.beginPath();c.moveTo(n.x,n.y);c.quadraticCurveTo(n.x+Math.cos(a+.5)*50,n.y+Math.sin(a+.5)*36,n.x+Math.cos(a)*90,n.y+Math.sin(a)*60);c.stroke()}}
  for(const d of BRG.dec){const b=d.b;if(b[0]<X1&&b[2]>ox&&b[1]<Y1&&b[3]>oy){c.save();try{PALD.ao(c,d,ox,oy,X1,Y1)}catch(e){}c.restore()}}
  c.restore()}
/* ---------- ชั้นพื้นที่ขยับได้ ---------- */
function brgGroundFx(){const T=performance.now()/1000,Q=LOWQ,pa=brgPath(),P=pa.p,N=pa.n,n=P.length;g.save();try{if(gP6c2())brgStairs()}catch(e){}
  for(let i=0;i<(Q?4:9);i++){const cx=((i*733+T*(9+i%3*4))%3800+3800)%3800-300,cy=(i*977+140)%3200,r=90+(i%4)*30;if(!palVis(cx,cy,r*2)||brgIn(cx,cy,-r*.7))continue;g.globalAlpha=.24;try{g.drawImage(plxCloud(),cx-r*1.5,cy-r*.75,r*3,r*1.5)}catch(e){}g.globalAlpha=1}
  /* ผู้อพยพทยอยขึ้นสะพาน (หลังขบวนแรก) */
  if(gP6esc()){const C=['#7a4a3a','#3a5a7a','#6a6a3a','#7a3a6a','#4a6a4a','#8a6a3a'],H=['#3a2414','#d8b060','#1a1a1a','#8a4a2a'];for(let i=0;i<(Q?5:9);i++){const s=(T*16+i*n*10/9)%(n*10),k=Math.min(n-1,s/10|0);for(let j=0;j<1+i%3;j++){const off=((i*29+j*41)%110)-55,x=P[k][0]+N[k][0]*off-j*6,y=P[k][1]+N[k][1]*off+j*14;if(!palVis(x,y,30))continue;campFolk(x,y,{c:C[(i+j)%6],hair:H[(i*3+j)%4],hat:(i+j)%4===0?'#8a5a2a':null,f:P[Math.min(n-1,k+3)][0]>P[k][0]?1:-1,k:i*3+j,run:1,s:1.05},T)}}}
  g.globalCompositeOperation='lighter';
  /* ชีพจรแสงไหลลงจากประตูอัสตรา */
  for(const off of[0,2.6]){const q=((T+off)%5.2)/4.2;if(q>1)continue;const k=Math.round((1-q)*(n-1)),[x,y]=P[k];if(!palVis(x,y,260))continue;glowAt(x,y,200,'255,240,200',.22*Math.sin(q*3.14));glowAt(x,y,70,'255,250,235',.3*Math.sin(q*3.14));for(let j=1;j<6;j++){const kk=Math.min(n-1,k+j*6);glowAt(P[kk][0],P[kk][1],40,'255,230,170',.12*(1-j/6))}}
  /* ละอองทองลอยจากราว */
  for(let i=0;i<(Q?10:26);i++){const k=(i*53)%n,s=i%2?1:-1,q=(T*.35+i/7)%1,x=P[k][0]+N[k][0]*s*(BHW-4),y=P[k][1]+N[k][1]*s*(BHW-4)-q*46;if(!palVis(x,y,20))continue;glowAt(x,y,2.4,'255,226,160',.8*Math.sin(q*3.14))}
  /* รังเงา: หนวดดำไต่ขึ้นจากขอบ */
  (MAPS[curMap].nests||[]).forEach(([x,y],i)=>{if(!palVis(x,y,110))return;const pu=.5+.5*Math.sin(T*1.6+i);glowAt(x,y,60,'150,70,200',.14+.14*pu);
    g.globalCompositeOperation='source-over';g.lineCap='round';for(let k=0;k<6;k++){const a=k*1.05+i,L=40+16*Math.sin(T*1.3+k+i),ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L*.7,cx=x+Math.cos(a+.6)*L*.6+Math.sin(T*2+k)*6,cy=y+Math.sin(a+.6)*L*.4;
      g.strokeStyle='rgba(22,8,32,.85)';g.lineWidth=6-k%3;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(cx,cy,ex,ey);g.stroke();g.fillStyle='rgba(22,8,32,.85)';g.beginPath();g.arc(ex,ey,2.6,0,7);g.fill()}
    g.fillStyle='#0c0612';g.beginPath();g.ellipse(x,y,18,11,0,0,7);g.fill();g.globalCompositeOperation='lighter';if(Math.sin(T*.9+i*2)>-.6){glowAt(x-5,y-2,3,'255,170,80',.9);glowAt(x+5,y-2,3,'255,170,80',.9)}});
  /* เศษความทรงจำ */
  P6LORE.forEach((L,i)=>{if(!palVis(L.x,L.y,80))return;if(p6Got(i)||BRGS.ses.has(i)){glowAt(L.x,L.y,8,'255,230,170',.2);return}const by=L.y-20+Math.sin(T*2+i)*4,pu=.6+.4*Math.sin(T*3+i);glowAt(L.x,by,24,'255,210,150',.55*pu);
    g.globalCompositeOperation='source-over';g.strokeStyle='rgba(230,170,80,'+(.4+.25*pu)+')';g.lineWidth=1.4;g.beginPath();g.ellipse(L.x,L.y,16+4*pu,6+1.5*pu,0,0,7);g.stroke();g.fillStyle='#fff6e0';g.beginPath();g.moveTo(L.x,by-9);g.lineTo(L.x+5,by);g.lineTo(L.x,by+9);g.lineTo(L.x-5,by);g.closePath();g.fill();g.globalCompositeOperation='lighter'});
  g.restore()}
function brgScreen(T,z,Hs){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const x=((T*6+i*140)%(SW0+300))-150,a=.05+.03*Math.sin(T*.7+i);const gr=g.createLinearGradient(x,0,x+120,Hs);gr.addColorStop(0,'rgba(255,230,190,'+a+')');gr.addColorStop(1,'rgba(255,230,190,0)');g.fillStyle=gr;g.beginPath();g.moveTo(x,0);g.lineTo(x+60,0);g.lineTo(x+200,Hs);g.lineTo(x+120,Hs);g.closePath();g.fill()}g.restore()}
function brgTick(dt,now,x,y,mv){
  if(brgIn(x,y,-4)){BRGS.lx=x;BRGS.ly=y}else if(!brgIn(x,y,-36)&&me.down<=0){me.x=BRGS.lx;me.y=BRGS.ly}
  P6LORE.forEach((L,i)=>{if(p6Got(i)||BRGS.ses.has(i)||Math.hypot(x-L.x,y-L.y)>46)return;BRGS.ses.add(i);if(me.sty)me.sty.p6m=(me.sty.p6m|0)|(1<<i);let n=0;for(let k=0;k<P6LORE.length;k++)if(p6Got(k)||BRGS.ses.has(k))n++;
    PALG.card={h:'🌉 เสียงจากใต้เมฆ '+n+'/'+P6LORE.length,t:L.t,s:now};try{sfx('lg_get')}catch(e){}try{burst(L.x,L.y-20,['#ffe8b0','#ffffff','#ffb070'],22,90,.8,{glow:1,g:-40})}catch(e){}
    if(n>=P6LORE.length&&me.sty&&!me.sty.p6mr){me.sty.p6mr=1;const tx=stGive({g:120000});setTimeout(()=>{PALG.card={h:'✨ เสียงจากใต้เมฆครบแล้ว',t:'ทุกเสียงชี้ไปที่เดียวกัน… เมืองที่ร่วงลงไปไม่ได้ตาย มันแค่รอให้ประตูเปิด '+tx,s:performance.now(),d:8};try{sfx('lvl')}catch(e){}},2600)}try{writeSave()}catch(e){}});
  BRGSH.forEach((_,i)=>{if(BRGS.sh[i])return;const[sx,sy]=brgShP(i);if(Math.hypot(x-sx,y-sy)>72)return;BRGS.sh[i]=now;try{sfx('ek_shatter')}catch(e){}try{burst(sx,sy-20,['#fff4d0','#ffffff','#ffc070'],24,140,.8,{glow:1,g:-50})}catch(e){}
    const c=BRGS.sh.filter(v=>v).length;dn.push({x:sx,y:sy-70,v:'✨ ปัดเงาออกจากราว '+c+'/'+BRGSH.length,t:1.6})});
  if(!BRGS.shb&&BRGS.sh.every(v=>v)){BRGS.shb=1;me.shrB={k:'sp',t:60};banner={s:'🌉 ราวสะพานสะอาดแล้ว · ผู้อพยพเดินได้ไม่ต้องกลัว — '+SHRB.sp[0]+' '+SHRB.sp[1]+' 60 วิ',t:5};try{sfx('lvl')}catch(e){}}}
/* ---------- ของตั้งบนสะพาน ---------- */
Object.assign(PALK,{
 blamp(t,T){const x=t.x,y=t.y,pu=.7+.3*Math.sin(T*2+x*.013+y*.007);PALSH(x,y+2,9,3);g.fillStyle='#c89a48';g.fillRect(x-6,y-5,12,7);g.fillStyle='#f6ead0';g.fillRect(x-2.5,y-60,5,56);g.fillStyle='#d8a848';g.fillRect(x-4.5,y-62,9,4);g.fillRect(x-4,y-30,8,3);
  g.fillStyle='#fffaec';g.beginPath();g.moveTo(x,y-84);g.lineTo(x+7,y-71);g.lineTo(x,y-60);g.lineTo(x-7,y-71);g.closePath();g.fill();g.strokeStyle='#d8a848';g.lineWidth=1.2;g.stroke();g.fillStyle='rgba(255,210,140,.6)';g.beginPath();g.moveTo(x,y-84);g.lineTo(x+7,y-71);g.lineTo(x,y-71);g.closePath();g.fill();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-71,30,'255,214,140',.42*pu);glowAt(x,y-71,9,'255,250,230',.85);g.restore()},
 bban(t,T){const x=t.x,y=t.y,sw=Math.sin(T*1.7+x)*3;PALSH(x,y+2,8,3);g.fillStyle='#8a6a3a';g.fillRect(x-2,y-92,4,92);g.fillStyle='#e0b050';g.beginPath();g.arc(x,y-95,4,0,7);g.fill();g.fillRect(x-16,y-88,32,3);
  g.fillStyle='#2a4a9a';g.beginPath();g.moveTo(x-14,y-85);g.lineTo(x+14,y-85);g.lineTo(x+14+sw*.4,y-40);g.lineTo(x+sw*.6,y-48);g.lineTo(x-14+sw*.4,y-40);g.closePath();g.fill();g.strokeStyle='#e0b050';g.lineWidth=1.4;g.stroke();
  g.fillStyle='#f4d890';PST(g,x+sw*.2,y-66,8,3.2,5,0);g.fill()},
 bpyl(t,T){const x=t.x,y=t.y,a=T*.8+x;PALSH(x,y+3,20,6);g.fillStyle='#c8a050';g.beginPath();g.moveTo(x-18,y+2);g.lineTo(x-12,y-10);g.lineTo(x+12,y-10);g.lineTo(x+18,y+2);g.closePath();g.fill();
  const lg=g.createLinearGradient(x-12,0,x+12,0);lg.addColorStop(0,'#f0e0b8');lg.addColorStop(.5,'#fffaf0');lg.addColorStop(1,'#d8bc84');g.fillStyle=lg;g.beginPath();g.moveTo(x-11,y-10);g.lineTo(x-7,y-118);g.lineTo(x,y-140);g.lineTo(x+7,y-118);g.lineTo(x+11,y-10);g.closePath();g.fill();g.strokeStyle='rgba(200,150,60,.8)';g.lineWidth=1.2;g.stroke();
  g.strokeStyle='rgba(216,160,60,.9)';g.lineWidth=2;g.beginPath();g.ellipse(x,y-96+Math.sin(T*1.5+x)*4,22,6,0,0,7);g.stroke();for(let i=0;i<3;i++){const b=a+i*2.09;g.fillStyle='#fff4d0';g.beginPath();g.arc(x+Math.cos(b)*22,y-96+Math.sin(b)*6+Math.sin(T*1.5+x)*4,2.4,0,7);g.fill()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-132,30,'255,226,170',.5+.15*Math.sin(T*2+x));g.restore()},
 btent(t,T){const x=t.x,y=t.y,C=t.v?['#8a6a4a','#b08a5a','#5a7a9a']:['#7a5a6a','#a07a8a','#9a7a3a'];PALSH(x,y+3,36,8);g.fillStyle=C[0];g.beginPath();g.moveTo(x-38,y);g.lineTo(x,y-58);g.lineTo(x+38,y);g.closePath();g.fill();g.fillStyle=C[1];g.beginPath();g.moveTo(x,y-58);g.lineTo(x+38,y);g.lineTo(x+8,y);g.closePath();g.fill();
  g.fillStyle='#2a1a14';g.beginPath();g.moveTo(x-10,y);g.lineTo(x,y-30);g.lineTo(x+8,y);g.closePath();g.fill();g.fillStyle=C[2];g.fillRect(x-28,y-22,12,9);g.strokeStyle='#3a2a1a';g.lineWidth=1.4;g.beginPath();g.moveTo(x,y-58);g.lineTo(x,y-66);g.stroke();g.fillStyle='#e0b050';g.fillRect(x,y-66,9,5)},
 bfire(t,T){const x=t.x,y=t.y;for(let i=0;i<9;i++){const a=i/9*6.283;g.fillStyle=i%2?'#8a8070':'#a89c88';g.beginPath();g.ellipse(x+Math.cos(a)*16,y+Math.sin(a)*7,5,3.5,0,0,7);g.fill()}g.fillStyle='#4a2a14';g.fillRect(x-10,y-3,20,4);
  try{palFlame(x,y-2,1.4,T)}catch(e){}g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10,60,'255,170,80',.3+.08*Math.sin(T*9));g.restore();
  for(const[dx,dy,c,f]of[[-34,6,'#7a4a3a',1],[34,6,'#3a5a7a',-1],[0,-18,'#6a6a3a',1]])campFolk(x+dx,y+dy,{c,hair:'#3a2414',f,k:dx,sit:1,s:1.1},T)},
 bcart(t,T){const x=t.x,y=t.y;PALSH(x,y+4,30,7);g.fillStyle='#6a4a2a';g.fillRect(x-26,y-24,52,20);g.strokeStyle='#3a2414';g.lineWidth=1.4;g.strokeRect(x-26,y-24,52,20);for(let i=1;i<4;i++){g.beginPath();g.moveTo(x-26+i*13,y-24);g.lineTo(x-26+i*13,y-4);g.stroke()}
  for(const s of[-1,1]){g.fillStyle='#4a3020';g.beginPath();g.arc(x+s*18,y,8,0,7);g.fill();g.strokeStyle='#8a6a3a';g.lineWidth=1.2;g.beginPath();g.arc(x+s*18,y,5,0,7);g.stroke()}g.strokeStyle='#5a3a1a';g.lineWidth=3;g.beginPath();g.moveTo(x+26,y-12);g.lineTo(x+46,y-4);g.stroke();
  for(const[dx,dy,c]of[[-14,-30,'#c8a870'],[2,-32,'#9a8a6a'],[14,-28,'#b89060']]){g.fillStyle=c;g.beginPath();g.ellipse(x+dx,y+dy,10,8,0,0,7);g.fill();g.strokeStyle='#5a4020';g.lineWidth=1;g.stroke()}},
 bcrate(t,T){const x=t.x,y=t.y;PALSH(x,y+2,16,5);if(t.v){g.fillStyle='#c8a870';g.beginPath();g.ellipse(x,y-10,12,13,0,0,7);g.fill();g.strokeStyle='#6a4a20';g.lineWidth=1.2;g.stroke();g.beginPath();g.moveTo(x-5,y-22);g.lineTo(x+5,y-22);g.stroke();return}
  g.fillStyle='#8a6034';g.fillRect(x-14,y-26,28,26);g.strokeStyle='#4a3018';g.lineWidth=1.4;g.strokeRect(x-14,y-26,28,26);g.beginPath();g.moveTo(x-14,y-26);g.lineTo(x+14,y);g.moveTo(x+14,y-26);g.lineTo(x-14,y);g.stroke()},
 bscope(t,T){const x=t.x,y=t.y;PALSH(x,y+2,14,4);g.strokeStyle='#6a4a24';g.lineWidth=2.4;for(const s of[-1,0,1]){g.beginPath();g.moveTo(x,y-34);g.lineTo(x+s*12,y);g.stroke()}g.save();g.translate(x,y-38);g.rotate(.5);g.fillStyle='#c8963c';g.fillRect(-22,-5,40,10);g.fillStyle='#e8c070';g.fillRect(-26,-6,6,12);g.fillStyle='#8a6a2a';g.fillRect(14,-4,8,8);g.restore()},
 bbell(t,T){const x=t.x,y=t.y,sw=Math.sin(T*.9)*.05;PALSH(x,y+3,46,9);g.fillStyle='#5a3a20';g.fillRect(x-44,y-120,8,122);g.fillRect(x+36,y-120,8,122);g.fillRect(x-50,y-128,100,10);g.fillStyle='#3a2414';g.fillRect(x-50,y-120,100,2);
  g.save();g.translate(x,y-116);g.rotate(sw);const bg=g.createLinearGradient(-32,0,32,0);bg.addColorStop(0,'#6a4020');bg.addColorStop(.45,'#d09048');bg.addColorStop(1,'#5a3418');g.fillStyle=bg;g.beginPath();g.moveTo(-10,0);g.quadraticCurveTo(-14,10,-16,30);g.quadraticCurveTo(-22,58,-34,70);g.lineTo(34,70);g.quadraticCurveTo(22,58,16,30);g.quadraticCurveTo(14,10,10,0);g.closePath();g.fill();g.strokeStyle='#3a2010';g.lineWidth=1.6;g.stroke();
  g.strokeStyle='#e8b060';g.lineWidth=1.2;g.beginPath();g.arc(0,40,9,0,7);g.stroke();for(let i=0;i<8;i++){const a=i*.785;g.beginPath();g.moveTo(Math.cos(a)*9,40+Math.sin(a)*9);g.lineTo(Math.cos(a)*13,40+Math.sin(a)*13);g.stroke()}g.restore();
  const q=(T*.25)%1;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,180,100,'+(.3*(1-q))+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y-70,40+q*120,14+q*40,0,0,7);g.stroke();g.restore()},
 barch(t,T){const x=t.x,y=t.y,w=t.lo?150:200,h=t.lo?190:260,top=y-h;PALSH(x,y+6,w*.7,14,.4);
  g.save();g.beginPath();g.moveTo(x-w/2+22,y);g.lineTo(x-w/2+22,top+w/2-10);g.arc(x,top+w/2-10,w/2-22,Math.PI,0);g.lineTo(x+w/2-22,y);g.closePath();g.clip();const sk=g.createLinearGradient(0,top,0,y);sk.addColorStop(0,t.lo?'#ffe8c0':'#fff8e8');sk.addColorStop(1,t.lo?'#f0b070':'#ffe0a0');g.fillStyle=sk;g.fillRect(x-w/2,top,w,h);
  g.globalCompositeOperation='lighter';glowAt(x,y-h*.4,w*.6,'255,230,170',.4+.1*Math.sin(T*2));for(let i=0;i<10;i++){const q=(T*.3+i/10)%1;glowAt(x-w/2+30+((i*53)%(w-60)),y-q*h,2.5,'255,250,230',Math.sin(q*3.14))}g.restore();
  for(const s of[-1,1]){g.fillStyle='#f4ead4';g.fillRect(x+s*(w/2-11)-11,top+w/2-14,22,h-w/2+14);g.fillStyle='#d0b07a';g.fillRect(x+s*(w/2-11)-14,y-12,28,12);g.fillRect(x+s*(w/2-11)-13,top+w/2-20,26,8)}
  g.strokeStyle='#f4ead4';g.lineWidth=22;g.beginPath();g.arc(x,top+w/2-10,w/2-11,Math.PI,0);g.stroke();g.strokeStyle='#d8a848';g.lineWidth=3;g.beginPath();g.arc(x,top+w/2-10,w/2+1,Math.PI,0);g.stroke();g.beginPath();g.arc(x,top+w/2-10,w/2-22,Math.PI,0);g.stroke();
  g.fillStyle='#e0b050';PST(g,x,top-12,t.lo?12:17,t.lo?5:7,8,T*.2);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,top-12,36,'255,220,150',.5);g.restore();
  for(let i=0;i<9;i++){const a=Math.PI+(i+.5)/9*Math.PI;g.fillStyle=i%2?'#d8a848':'#fff4d8';g.beginPath();g.arc(x+Math.cos(a)*(w/2-11),top+w/2-10+Math.sin(a)*(w/2-11),2.6,0,7);g.fill()}},
 bshd(t,T){const x=t.x,y=t.y,ok=BRGS.sh[t.si];if(ok){const k=Math.min(1,(performance.now()-ok)/1500);if(k<1){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-20-k*60,14,'255,230,170',1-k);g.restore()}return}
  const pu=Math.sin(T*2+t.si);g.fillStyle='rgba(16,6,24,.85)';g.beginPath();g.moveTo(x-20,y+4);g.quadraticCurveTo(x-26,y-30+pu*3,x-6,y-44);g.quadraticCurveTo(x+4,y-52,x+12,y-40);g.quadraticCurveTo(x+28,y-22,x+20,y+4);g.closePath();g.fill();
  g.strokeStyle='rgba(16,6,24,.8)';g.lineWidth=3;g.lineCap='round';for(let k=0;k<4;k++){const a=-2.4+k*.9;g.beginPath();g.moveTo(x+Math.cos(a)*14,y-20+Math.sin(a)*14);g.quadraticCurveTo(x+Math.cos(a)*30,y-24+Math.sin(a)*24+pu*4,x+Math.cos(a+.3)*40,y-18+Math.sin(a+.3)*30);g.stroke()}
  g.save();g.globalCompositeOperation='lighter';if(Math.sin(T*.7+t.si*3)>-.7){glowAt(x-6,y-28,3,'255,170,80',1);glowAt(x+5,y-28,3,'255,170,80',1)}g.restore();
  if(me.cls&&Math.hypot(me.x-x,me.y-y)<200){g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,8,24,.8)';g.strokeText('เดินเข้าไปปัดเงา',x,y-58);g.fillStyle='#ffe0b0';g.fillText('เดินเข้าไปปัดเงา',x,y-58)}}});
/* ---------- มอนเงาอารัณยา ---------- */
function drawMonB(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){const glow=(x,y,rr,c,a)=>{if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.restore()};
  const smoke=(y0,w)=>{if(W)return;for(let i=0;i<4;i++){const q=(T*.8+i/4)%1;g.fillStyle='rgba(30,12,44,'+(.45*(1-q))+')';g.beginPath();g.arc((i-1.5)*w*.5+Math.sin(T*2+i)*2,y0+q*r*.5,r*(.16+q*.14),0,7);g.fill()}};
  if(t===0){/* ทหารเงาอารัณยา */smoke(r*.7,r);Ln([-r*.22,r*.3,-r*.3,r*.85-la],F('#1a1024'),r*.22);Ln([r*.22,r*.3,r*.3,r*.85-ra],F('#1a1024'),r*.22);
    Pg([-r*.5,-r*.45+bob,r*.5,-r*.45+bob,r*.72,r*.75,r*.36,r*.55,0,r*.82,-r*.36,r*.55,-r*.72,r*.75],F('#21142e'),1);
    Pg([-r*.42,-r*.48+bob,r*.42,-r*.48+bob,r*.34,r*.15,-r*.34,r*.15],F('#7a4c24'),1);E(0,-r*.18+bob,r*.15,r*.15,F('#c8904a'),1);if(!W){g.strokeStyle='#e8b060';g.lineWidth=1;for(let i=0;i<8;i++){const a=i*.785;g.beginPath();g.moveTo(Math.cos(a)*r*.15,-r*.18+bob+Math.sin(a)*r*.15);g.lineTo(Math.cos(a)*r*.24,-r*.18+bob+Math.sin(a)*r*.24);g.stroke()}}
    E(-r*.5,-r*.42+bob,r*.2,r*.14,F('#8a5a2c'),1);E(r*.5,-r*.42+bob,r*.2,r*.14,F('#8a5a2c'),1);
    Pg([-r*.32,-r*.5+bob,-r*.34,-r*.98+bob,0,-r*1.16+bob,r*.34,-r*.98+bob,r*.32,-r*.5+bob],F('#8a5a2c'),1);Pg([-r*.04,-r*1.14+bob,0,-r*1.42+bob,r*.06,-r*1.12+bob],F('#c8904a'),0);
    if(!W){g.fillStyle='#0a0410';g.fillRect(-r*.24,-r*.86+bob,r*.48,r*.14)}glow(0,-r*.8+bob,r*.34,'255,150,70',.35);eye(-r*.1,-r*.8+bob,r*.06,r*.035,'#ffb050');eye(r*.1,-r*.8+bob,r*.06,r*.035,'#ffb050');
    Ln([r*.6,r*.5,r*.74+sw*r*.06,-r*1.7+bob],F('#4a2e16'),2.2);Pg([r*.68+sw*r*.06,-r*1.62+bob,r*.75+sw*r*.06,-r*2.02+bob,r*.84+sw*r*.06,-r*1.62+bob],F('#c8904a'),1);return true}
  if(t===1){/* เงาไต่ */const cr=Math.sin(T*10)*r*.08;glow(0,-r*.2,r*1.1,'130,60,180',.14);
    for(let i=0;i<4;i++){const s=i<2?-1:1,f=i%2?.4:-.3,k=Math.sin(T*10+i*1.6)*r*.12;g.strokeStyle=F('#120818');g.lineWidth=r*.14;g.lineCap='round';g.beginPath();g.moveTo(s*r*.3,-r*.1+f*r*.4);g.lineTo(s*r*.85,-r*.45+f*r*.4+k);g.lineTo(s*r*1.05,r*.35+f*r*.3+k);g.stroke()}
    E(0,-r*.15+cr,r*.62,r*.36,F('#1a0c24'),1);for(let i=0;i<5;i++){const x=-r*.4+i*r*.2;Pg([x-r*.07,-r*.42+cr,x,-r*.75+cr-Math.sin(T*6+i)*r*.08,x+r*.07,-r*.42+cr],F('#2a1438'),0)}
    E(r*.55,-r*.25+cr,r*.3,r*.24,F('#1a0c24'),1);eye(r*.5,-r*.32+cr,r*.06,r*.06,'#ffb050');eye(r*.66,-r*.3+cr,r*.06,r*.06,'#ffb050');eye(r*.58,-r*.18+cr,r*.045,r*.045,'#ff8a40');
    if(!W){for(let i=0;i<3;i++){const q=(T*1.4+i/3)%1;g.fillStyle='rgba(26,10,36,'+(.5*(1-q))+')';g.beginPath();g.arc(-r*.7-q*r*.8,-r*.1+Math.sin(i*2+T)*r*.15,r*(.14+q*.1),0,7);g.fill()}}return true}
  /* ผู้ถือระฆังเงา */
  smoke(r*.9,r*1.1);glow(0,-r*.6,r*1.4,'120,50,170',.14);
  Pg([-r*.42,-r*.9+bob,r*.42,-r*.9+bob,r*.62,r*.2,r*.78,r*.92,r*.4,r*.78,0,r*.95,-r*.4,r*.78,-r*.78,r*.92,-r*.62,r*.2],F('#1e1228'),1);
  Pg([-r*.12,-r*.85+bob,r*.12,-r*.85+bob,r*.16,r*.8,-r*.16,r*.8],F('#2c1a3a'),0);Ln([-r*.5,-r*.2+bob,r*.5,-r*.2+bob],F('#8a5a2c'),2);
  Pg([-r*.4,-r*.86+bob,-r*.36,-r*1.42+bob,0,-r*1.66+bob,r*.36,-r*1.42+bob,r*.4,-r*.86+bob],F('#24162e'),1);E(0,-r*1.12+bob,r*.24,r*.26,F('#06020a'),0);glow(0,-r*1.12+bob,r*.4,'255,150,70',.4);eye(0,-r*1.14+bob,r*.09,r*.09,'#ffb050');
  {const hx=r*.72,hy=-r*.4+bob;Ln([r*.35,-r*.6+bob,hx,hy],F('#1e1228'),r*.18);Ln([hx,hy+r*.5,hx,hy-r*1.4],F('#4a2e16'),2.4);const bx=hx+sw*r*.12,by=hy-r*1.35;Ln([hx,hy-r*1.4,bx,by+r*.05],F('#3a2414'),1.4);
    Pg([bx-r*.1,by,bx-r*.16,by+r*.22,bx-r*.24,by+r*.36,bx+r*.24,by+r*.36,bx+r*.16,by+r*.22,bx+r*.1,by],F('#b07a3a'),1);glow(bx,by+r*.24,r*.4,'255,180,90',.35+.2*Math.abs(sw))}
  return true}
