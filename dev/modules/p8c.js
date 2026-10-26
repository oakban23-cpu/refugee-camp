/* ---------- v529 ภาค 8 บทที่ 3 · สุสานเรือ (แมพ 39 · สุสานเรือเมฆ) ----------
   แมพ 39 Lv 138–142: ซากเรือเกยบนแนวเมฆแข็ง (เดินได้) ท่ามกลางทะเลเมฆ (เดินไม่ได้) · สะพานไม้ผุเชื่อมระหว่างซาก
   กระแสลม: แถบลมพัดทางเดียว ก้าวเข้าไปแล้วลมหอบข้ามเมฆไปซากที่ไกล (ซาก «สำเภาเงิน» และเกาะซี่โครงยักษ์ไปได้ทางลมเท่านั้น · มีลมพัดกลับ)
   ฟ้าผ่าเป็นระยะ: วงเตือนใต้เท้าแล้วผ่า (ไม่ผ่าที่จุดขึ้นฝั่ง) · มอนธีม 39: วิญญาณกะลาสี (โยนสมอ) · ปลาไหลอสนี (ช็อต) · ลูกวาฬเงา (ถึก)
   เนื้อเรื่อง 7 ขั้น ต่อจาก p8c2: ซารา → ไปสุสานเรือ → สมุดปูม 5 เล่ม → ล่า 40 → นาวินอ่านปูม → ดวลบนเรือดำ (p8d) → กริฟ (แยก p8g) */
const SGI=[{k:'c',x:520,y:1600,rx:400,ry:310},{k:'w',x:1160,y:1130,hw:280,hh:92,a:-.22,nm:'ดาวรุ่ง'},{k:'c',x:1620,y:1700,rx:330,ry:230},{k:'w',x:2170,y:1230,hw:320,hh:100,a:.18,nm:'อัสนี'},
  {k:'c',x:1300,y:2430,rx:310,ry:210},{k:'w',x:2620,y:2330,hw:270,hh:92,a:-.3,nm:'สำเภาเงิน'},{k:'c',x:2520,y:520,rx:260,ry:185}];
const SGB=[[760,1450,1020,1190,34],[860,1660,1330,1700,34],[1400,1080,1890,1170,32],[1760,1540,2000,1330,32],[1520,1890,1360,2260,32]];
/* กระแสลม [x0,y0,x1,y1,ครึ่งกว้าง,ไปเกาะ] ทางเดียว start→end */
const SGW=[[1860,1790,2540,2290,40,5],[2450,2420,1760,1840,40,2],[2240,1180,2470,640,40,6],[2610,640,2350,1220,40,3],[1080,2390,680,1800,40,0]];
const SGLOGP=[[1,150,10],[3,-170,0],[4,60,30],[5,110,0],[6,40,10]];/* [เกาะ, x/dx, y/dy] */
const SGLORE=[['📜 ปูมเรือ «ดาวรุ่ง» · วันที่ 1','«คืนที่นาวาลัยหายไป ทะเลเมฆสงบผิดปกติ ไม่มีลมสักนิด แล้วเกาะทั้งเกาะก็ค่อย ๆ จมลงเหมือนมีอะไรสูดมันลงไป… เราขึ้นเรือได้แค่สิบสองลำ»'],
 ['📜 ปูมเรือ «อัสนี» · ปีที่ 41','«แกนดาวของเรือทุกลำหรี่ลงทุกปี เหมือนแสงดาวบนฟ้าที่บางลงทุกปี ช่างเครื่องบอกว่าแกนไม่ได้เสีย… ฟ้าแค่ไม่มีแสงเหลือให้มันดูดซับ»'],
 ['📜 สมุดของต้นหนนิรนาม','«ข้าแกะเข็มทิศเสียงอันแรกตามท่อนที่สี่ของเพลงกล่อม ท่อนที่ร้องถึงสิ่งที่ว่ายอยู่ใต้เมฆ ยายข้าบอกว่า ถ้าวันหนึ่งได้ยินเพลงตอบกลับมา ให้ตามเสียงนั้นไป»'],
 ['📜 หน้ากระดาษในสำเภาเงิน · ลายมือราชาโอเรียน','«…คืนนี้กล้องใหญ่เห็นเกาะลอยทางตะวันออกจมหายลงทะเลเมฆ เงาใต้เมฆใหญ่กว่าเกาะสามเท่า มันดูดแสงจากฟ้าเป็นสาย ๆ ถ้ามันกินดาวหมด ทุกเมืองจะมืด ข้าต้องหาทางเก็บแสงไว้ก่อน»'],
 ['📜 ปูมเล่มสุดท้าย · ใต้ซี่โครงยักษ์','«ข้าเห็นตามันใกล้พอ… มันไม่ได้โกรธ มันหิว ฟ้ามืดลงทุกปีเพราะแสงดาวถูกขังไว้ในเมือง มันว่ายขึ้นมาหาแสงที่เหลืออยู่ น่าแปลก… ข้ากลับสงสารมัน»']];
const SGZN={land:['จุดขึ้นฝั่งเมฆแข็ง','เมฆตรงนี้แข็งราวหินปูน… รอยไหม้ของฟ้าผ่าทับกันเป็นชั้น ๆ'],bank:['แนวเมฆแข็ง','ใต้เท้าแข็งเหมือนหิน แต่ส่งเสียงกรอบแกรบเหมือนน้ำแข็ง'],
  w1:['ซากเรือ «ดาวรุ่ง»','เรือลำแรกที่หนีจากนาวาลัย จมลงที่นี่ในปีที่สิบ'],w3:['ซากเรือ «อัสนี»','ฟ้าผ่าลงเสากระโดงลำนี้มาสามร้อยปี ไม้ยังไหม้ไม่หมด'],w5:['ซากสำเภาเงิน','ไม่ใช่เรือของนาวาเมฆ… ตราบนหัวเรือเป็นรูปดาวของอัสตรา'],
  ribs:['ซี่โครงยักษ์','กระดูกแต่ละซี่สูงเท่าหอคอย… ของสิ่งที่ตายไปนานแล้ว หรือยังไม่ตาย?'],bridge:['สะพานไม้ผุ','ไม้กระดานที่ชาวเรือรุ่นก่อนวางข้ามระหว่างซาก'],wind:['กระแสลม','ลมหอบตัวลอยข้ามทะเลเมฆ!']};
let SGS={lx:420,ly:1600,w:-1,ws:0,lp:-1,lt:0,bt:2.5,bolt:[],warn:[],fl:0,snd:0},SGN={gl:[]};
const SGSP=400;/* ความเร็วลม px/วิ */
function sgLocal(I,x,y){const dx=x-I.x,dy=y-I.y,c=Math.cos(-I.a),s=Math.sin(-I.a);return[dx*c-dy*s,dx*s+dy*c]}
function sgWorld(I,lx,ly){const c=Math.cos(I.a),s=Math.sin(I.a);return[I.x+lx*c-ly*s,I.y+lx*s+ly*c]}
function sgInI(I,x,y,m){if(I.k==='c'){const rx=I.rx-m,ry=I.ry-m;if(rx<=0||ry<=0)return false;const a=(x-I.x)/rx,b=(y-I.y)/ry;return a*a+b*b<=1}const[lx,ly]=sgLocal(I,x,y);return Math.abs(ly)<I.hh-m&&lx>-I.hw+m&&lx<I.hw+I.hh*.6-m-Math.abs(ly)*.6}
const sgSegT=(x,y,s)=>{const dx=s[2]-s[0],dy=s[3]-s[1],L2=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((x-s[0])*dx+(y-s[1])*dy)/L2));return[t,Math.hypot(x-s[0]-dx*t,y-s[1]-dy*t)]};
function sgIsle(x,y,m){for(let i=0;i<SGI.length;i++)if(sgInI(SGI[i],x,y,m||0))return i;return -1}
function sgOnB(x,y,m){for(const b of SGB){const[,d]=sgSegT(x,y,b);if(d<b[4]-(m||0))return true}return false}
function sgWind(x,y,m){for(let i=0;i<SGW.length;i++){const w=SGW[i],[t,d]=sgSegT(x,y,w);if(d<w[4]-(m||0)&&t>.0&&t<.995)return i}return -1}
function sgIn(x,y,m,noW){m=m||0;if(x<80||y<80||x>3120||y>3120)return false;return sgIsle(x,y,m)>=0||sgOnB(x,y,m)||(!noW&&sgWind(x,y,m)>=0)}
function sgSafe(x,y){return sgInI(SGI[0],x,y,-60)}
function sgLog(i){const[k,a,b]=SGLOGP[i],I=SGI[k];return I.k==='w'?sgWorld(I,a,b):[I.x+a,I.y+b]}
const sgZone=(x,y)=>{if(sgWind(x,y,0)>=0&&sgIsle(x,y,0)<0)return'wind';const i=sgIsle(x,y,0);if(i===0)return'land';if(i===1)return'w1';if(i===3)return'w3';if(i===5)return'w5';if(i===6)return'ribs';if(i>=0)return'bank';return'bridge'};
const gP8s3=()=>p6Past('p8s3'),gP8gd=()=>p6Past('p8gd');
/* ---------- สร้างฉาก ---------- */
function sgBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(3939);
  /* เสากระโดงหัก + ใบเรือขาด (ชนได้) บนซาก */
  [[1,-120,-6,0],[1,90,8,1],[3,-150,0,1],[3,60,-10,0],[3,210,6,2],[5,-90,0,2],[5,120,4,0]].forEach(([k,a,b,v])=>{const[x,y]=sgWorld(SGI[k],a,b);trees.push({x,y,r:16,k:'sgmast',v,ht:230,hw:70})});
  /* ซี่โครงวาฬยักษ์ (เกาะเหนือ + โผล่จากเมฆรอบ ๆ) */
  [[2360,470,0,1],[2470,420,1,1],[2590,410,2,1],[2700,450,1,1],[2060,1960,2,0],[880,2700,0,0],[2860,1500,1,0]].forEach(([x,y,v,c])=>trees.push({x,y,r:c?18:0,k:'sgrib',v,ht:260,hw:90,ns:c?0:1,nc:c?0:1}));
  /* ตะเกียงผี ลัง ถัง ขดเชือก สมอ */
  [[1,-40,-60],[1,200,55],[3,-40,70],[3,250,-60],[4,-150,-40],[2,120,-80],[5,0,-58],[0,180,-160],[0,190,150]].forEach(([k,a,b],i)=>{const I=SGI[k],[x,y]=I.k==='w'?sgWorld(I,a,b):[I.x+a,I.y+b];trees.push({x,y,r:0,k:'sglamp',ht:90,ns:1,nc:1,v:i})});
  [[1,-200,30,'phcrate'],[1,-180,-40,'phbarrel'],[3,0,40,'phcrate'],[3,-260,-30,'phbarrel'],[3,120,60,'phrope'],[5,-180,20,'phcrate'],[2,-160,40,'phbarrel'],[4,140,60,'phcrate'],[0,240,60,'phcrate'],[0,260,100,'phbarrel']].forEach(([k,a,b,kk],i)=>{const I=SGI[k],[x,y]=I.k==='w'?sgWorld(I,a,b):[I.x+a,I.y+b];trees.push({x,y,r:14,k:kk,ht:40,v:i%2})});
  trees.push({x:430,y:1440,r:20,k:'phanc',ht:90,hw:40});
  /* เรือเล็กที่พามา (จุดขึ้นฝั่ง) · เรือดำลอยไกลทางตะวันออก */
  trees.push({x:250,y:1790,r:0,k:'sgboat',ht:120,ns:1,nc:1});trees.push({x:3000,y:1560,r:0,k:'sgbk',ht:200,ns:1,nc:1});
  trees.push({x:740,y:1560,r:0,k:'sgtil',ht:60,ns:1,nc:1});trees.push({x:600,y:1700,r:0,k:'sggrif',ht:80,ns:1,nc:1});
  /* หินเมฆแข็งเล็ก ๆ บนแนวเมฆ */
  for(let i=0,n=0;i<900&&n<34;i++){const k=[0,2,4,6][(R()*4)|0],I=SGI[k],a=R()*6.283,rr=Math.sqrt(R())*.8,x=I.x+Math.cos(a)*I.rx*rr,y=I.y+Math.sin(a)*I.ry*rr;
    if(!sgInI(I,x,y,40)||Math.hypot(x-M.sx,y-M.sy)<160||sgWind(x,y,-30)>=0||sgOnB(x,y,-30)||M.nests.some(([nx,ny])=>Math.hypot(x-nx,y-ny)<110)||SGLOGP.some((p,j)=>{const[lx,ly]=sgLog(j);return Math.hypot(x-lx,y-ly)<90}))continue;trees.push({x,y,r:14,k:'sgstone',v:(R()*3)|0,sc:.6+R()*.5,ht:40,hw:30});n++}
  SGN.gl=[];for(let i=0;i<70;i++)SGN.gl.push([200+R()*2800,200+R()*2800,R()*6]);
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc)return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
/* ---------- พื้น (แคชเป็นแผ่น) ---------- */
function sgDeckPath(c,I,dy,pad){const hw=I.hw+(pad||0),hh=I.hh+(pad||0);c.beginPath();c.moveTo(-hw,-hh+dy);c.lineTo(hw*.72,-hh+dy);c.quadraticCurveTo(hw+hh*.55,-hh*.5+dy,hw+hh*.62,dy);c.quadraticCurveTo(hw+hh*.55,hh*.5+dy,hw*.72,hh+dy);c.lineTo(-hw,hh+dy);c.quadraticCurveTo(-hw-hh*.25,dy,-hw,-hh+dy);c.closePath()}
function sgCloudBank(c,I,seed,ox,oy,S){const R=gxRng(seed),N=34;
  /* เงาใต้ก้อน */c.fillStyle='rgba(70,82,110,.42)';c.beginPath();c.ellipse(I.x+14,I.y+30,I.rx+18,I.ry+12,0,0,7);c.fill();
  /* ขอบก้อนเมฆแข็ง (ปุ่มรอบขอบ) */const P=[];for(let k=0;k<N;k++){const a=k/N*6.283+R()*.08,rr=.94+R()*.12;P.push([I.x+Math.cos(a)*I.rx*rr,I.y+Math.sin(a)*I.ry*rr,22+R()*30])}
  c.fillStyle='#454f6c';for(const[x,y,r]of P){c.beginPath();c.ellipse(x+4,y+14,r,r*.62,0,0,7);c.fill()}
  const gr=c.createRadialGradient(I.x-I.rx*.25,I.y-I.ry*.3,10,I.x,I.y,Math.max(I.rx,I.ry)*1.1);gr.addColorStop(0,'#a9b3c8');gr.addColorStop(.55,'#8a95ae');gr.addColorStop(1,'#6c7792');c.fillStyle=gr;
  c.beginPath();c.ellipse(I.x,I.y,I.rx*.97,I.ry*.97,0,0,7);c.fill();for(const[x,y,r]of P){c.beginPath();c.ellipse(x,y,r,r*.6,0,0,7);c.fill()}
  c.strokeStyle='rgba(225,234,250,.7)';c.lineWidth=2.6;for(const[x,y,r]of P){if(y>I.y)continue;c.beginPath();c.ellipse(x,y,r,r*.6,0,3.5,5.9);c.stroke()}
  /* ลายชั้นเมฆ + รอยไหม้ฟ้าผ่า + กรวด */
  c.save();c.beginPath();c.ellipse(I.x,I.y,I.rx,I.ry,0,0,7);c.clip();
  c.strokeStyle='rgba(120,136,168,.35)';c.lineWidth=2;for(let k=0;k<7;k++){const yy=I.y-I.ry+((k+1)/8)*I.ry*2;c.beginPath();for(let x=I.x-I.rx;x<=I.x+I.rx;x+=24){const y2=yy+Math.sin(x*.02+k*1.7)*6;x===I.x-I.rx?c.moveTo(x,y2):c.lineTo(x,y2)}c.stroke()}
  for(let k=0;k<5;k++){let x=I.x+(R()-.5)*I.rx*1.2,y=I.y+(R()-.5)*I.ry*1.2;c.strokeStyle='rgba(60,64,92,.42)';c.lineWidth=2.4;c.beginPath();c.moveTo(x,y);for(let s=0;s<6;s++){x+=(R()-.5)*44;y+=(R()-.5)*44;c.lineTo(x,y)}c.stroke();c.fillStyle='rgba(40,44,70,.32)';c.beginPath();c.ellipse(x,y,12,7,0,0,7);c.fill()}
  for(let k=0;k<60;k++){const x=I.x+(R()-.5)*I.rx*1.8,y=I.y+(R()-.5)*I.ry*1.8,r=1.5+R()*3;c.fillStyle=R()<.5?'rgba(110,118,140,.55)':'rgba(255,255,255,.55)';c.beginPath();c.ellipse(x,y,r,r*.7,0,0,7);c.fill()}
  c.restore()}
function sgWreckPaint(c,I,i){c.save();c.translate(I.x,I.y);c.rotate(I.a);
  /* เงา + กราบเรือด้านล่าง (ไม้มืด เพรียง) */c.fillStyle='rgba(60,70,96,.38)';sgDeckPath(c,I,46,10);c.fill();
  c.fillStyle='#3e2a1c';sgDeckPath(c,I,26,0);c.fill();c.fillStyle='rgba(20,12,8,.5)';for(let x=-I.hw;x<I.hw;x+=34){c.fillRect(x,I.hh+6,3,20)}
  c.fillStyle='rgba(220,226,232,.75)';const R=gxRng(4100+i);for(let k=0;k<26;k++){const x=-I.hw+R()*I.hw*2,y=I.hh+8+R()*16;c.beginPath();c.ellipse(x,y,3+R()*3,2,0,0,7);c.fill()}
  /* ดาดฟ้า */c.save();sgDeckPath(c,I,0,0);c.clip();try{phvPlanksH(c,-I.hw-40,-I.hh-10,I.hw+I.hh+10,I.hh+10,3950+i,15)}catch(e){c.fillStyle='#8a6440';c.fillRect(-I.hw-40,-I.hh,I.hw*2+I.hh+60,I.hh*2)}
  c.fillStyle='rgba(30,36,60,.28)';c.fillRect(-I.hw-40,-I.hh-10,I.hw*2+I.hh+60,I.hh*2+20);
  /* ฝาห้องเก็บของ · รูพัง */c.fillStyle='#3a2616';c.fillRect(-I.hw*.3-26,-24,52,48);c.strokeStyle='#1e120a';c.lineWidth=2;c.strokeRect(-I.hw*.3-26,-24,52,48);c.beginPath();c.moveTo(-I.hw*.3-26,0);c.lineTo(-I.hw*.3+26,0);c.stroke();
  c.fillStyle='#1a120c';c.beginPath();c.moveTo(I.hw*.35,-30);c.lineTo(I.hw*.35+40,-20);c.lineTo(I.hw*.35+34,18);c.lineTo(I.hw*.35+6,26);c.lineTo(I.hw*.35-12,0);c.closePath();c.fill();
  c.restore();
  /* ราวกราบเรือ (หักเป็นช่วง) */c.strokeStyle='#4a3020';c.lineWidth=5;for(const s of[-1,1]){for(let x=-I.hw+10;x<I.hw*.7;x+=70){if(((x/70)|0)%3===2)continue;c.beginPath();c.moveTo(x,s*(I.hh-4));c.lineTo(x+56,s*(I.hh-4));c.stroke();c.fillStyle='#2e1e10';c.fillRect(x-3,s*(I.hh-4)-4,6,8)}}
  c.font='bold 14px system-ui';c.textAlign='center';c.fillStyle='rgba(240,220,170,.55)';c.fillText('«'+I.nm+'»',I.hw*.6,8);c.restore()}
function sgBridgePaint(c,b,i){const[x0,y0,x1,y1,hw]=b,L=Math.hypot(x1-x0,y1-y0),a=Math.atan2(y1-y0,x1-x0);c.save();c.translate(x0,y0);c.rotate(a);
  c.fillStyle='rgba(70,82,110,.35)';c.fillRect(0,-hw+16,L,hw*2);
  for(let x=0;x<L;x+=15){const R=palH(i,x|0,3961);if(R<.08)continue;c.fillStyle=R<.4?'#7e5636':R<.7?'#8a6242':'#6e4a2e';c.fillRect(x,-hw+3+(R>.9?4:0),13,hw*2-6-(R>.9?8:0));c.fillStyle='rgba(30,18,10,.35)';c.fillRect(x+13,-hw+3,2,hw*2-6)}
  c.strokeStyle='#c8b080';c.lineWidth=2.4;for(const s of[-1,1]){c.beginPath();c.moveTo(0,s*hw);for(let x=0;x<=L;x+=L/6)c.quadraticCurveTo(x+L/12,s*hw+8,x+L/6,s*hw);c.stroke()}
  c.fillStyle='#4a3020';for(let x=0;x<=L;x+=L/6)for(const s of[-1,1])c.fillRect(x-3,s*hw-6,6,12);c.restore()}
function sgPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1;
  try{phvCloudSea(c,ox,oy,S,3990)}catch(e){c.fillStyle='#b8c4d8';c.fillRect(ox,oy,S,S)}
  c.fillStyle='rgba(30,38,70,.34)';c.fillRect(ox,oy,S,S);
  SGI.forEach((I,i)=>{if(I.k!=='c')return;if(!inB(I.x-I.rx-80,I.y-I.ry-80,I.x+I.rx+80,I.y+I.ry+90))return;sgCloudBank(c,I,3970+i,ox,oy,S)});
  SGB.forEach((b,i)=>{if(!inB(Math.min(b[0],b[2])-60,Math.min(b[1],b[3])-60,Math.max(b[0],b[2])+60,Math.max(b[1],b[3])+60))return;sgBridgePaint(c,b,i)});
  SGI.forEach((I,i)=>{if(I.k!=='w')return;const R=I.hw+I.hh+80;if(!inB(I.x-R,I.y-R,I.x+R,I.y+R))return;sgWreckPaint(c,I,i)})}
/* ---------- กระแสลม / ปูม / ฟ้าผ่า บนพื้น ---------- */
function sgGroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();
  for(let i=0;i<SGW.length;i++){const w=SGW[i],[x0,y0,x1,y1,hw]=w,L=Math.hypot(x1-x0,y1-y0),a=Math.atan2(y1-y0,x1-x0);if(!palVis((x0+x1)/2,(y0+y1)/2,L/2+60))continue;
    g.save();g.translate(x0,y0);g.rotate(a);const gr=g.createLinearGradient(0,-hw,0,hw);gr.addColorStop(0,'rgba(220,240,255,0)');gr.addColorStop(.5,'rgba(220,240,255,'+(SGS.w===i?.34:.2)+')');gr.addColorStop(1,'rgba(220,240,255,0)');g.fillStyle=gr;g.fillRect(0,-hw,L,hw*2);
    g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=3;g.lineCap='round';const n=Q?Math.ceil(L/120):Math.ceil(L/70);for(let k=0;k<n;k++){const u=((T*.55+k/n)%1),x=u*L,al=Math.sin(u*Math.PI);g.globalAlpha=al*.9;g.beginPath();g.moveTo(x-12,-14);g.lineTo(x,0);g.lineTo(x-12,14);g.stroke()}
    if(!Q){g.lineWidth=1.4;for(let k=0;k<4;k++){const u=((T*.8+k*.27)%1),x=u*L,yy=Math.sin(T*3+k*2)*hw*.6;g.globalAlpha=Math.sin(u*Math.PI)*.6;g.beginPath();g.moveTo(x-40,yy);g.quadraticCurveTo(x-20,yy-6,x,yy);g.stroke()}}
    g.globalAlpha=1;g.restore();
    /* ป้ายต้นลม */if(palVis(x0,y0,60)){g.font='13px system-ui';g.textAlign='center';g.fillText('🌬️',x0,y0-hw-6)}}
  /* สมุดปูมเรือ: เรืองแสงทอง */{const st=stCur(),q=me.sty;if(st&&st.p8lg&&q&&q.a===1)for(let i=0;i<5;i++){if((q.p8lg|0)>>i&1)continue;const[x,y]=sgLog(i);if(!palVis(x,y,60))continue;const pu=.6+.4*Math.sin(T*3+i);
    g.save();g.globalCompositeOperation='lighter';glowAt(x,y-14,34,'255,220,140',.35*pu);g.restore();g.fillStyle='#5a3a1c';g.fillRect(x-11,y-22,22,15);g.fillStyle='#e8d8b0';g.fillRect(x-9,y-21,18,12);g.strokeStyle='#3a2414';g.lineWidth=1;g.strokeRect(x-11,y-22,22,15);g.beginPath();g.moveTo(x,y-21);g.lineTo(x,y-9);g.stroke();
    g.strokeStyle='rgba(255,214,140,'+(.5+.3*pu)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+2,30,11,0,0,7);g.stroke();
    if(SGS.lp===i){const p=Math.min(1,SGS.lt/1);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-42,11,0,7);g.stroke();g.strokeStyle='#ffd06a';g.lineWidth=3.4;g.beginPath();g.arc(x,y-42,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}}}
  /* วงเตือนฟ้าผ่า */for(const w of SGS.warn){const k=1-w.t/w.d;g.strokeStyle='rgba(255,240,150,'+(.4+.5*k)+')';g.lineWidth=2.4;g.beginPath();g.ellipse(w.x,w.y,46,18,0,0,7);g.stroke();g.fillStyle='rgba(255,230,120,'+(.1+.25*k)+')';g.beginPath();g.ellipse(w.x,w.y,46*k,18*k,0,0,7);g.fill()}
  g.globalCompositeOperation='lighter';for(const[x,y,ph]of SGN.gl){if(!palVis(x,y,10))continue;const q=Math.sin(T*1.1+ph);if(q<.8)continue;glowAt(x,y,4,'170,210,255',(q-.8)*3)}
  g.restore()}
/* ฟ้าผ่า (วาดทับตัวละคร) */
function sgBoltDraw(){if(curMap!==39||!SGS.bolt.length)return;const now=performance.now();g.save();SGS.bolt=SGS.bolt.filter(b=>now-b.t0<420);
  for(const b of SGS.bolt){const k=(now-b.t0)/420,R=depRng(b.s);g.globalCompositeOperation='lighter';glowAt(b.x,b.y,90,'200,220,255',.6*(1-k));g.strokeStyle='rgba(235,245,255,'+(1-k)+')';g.lineWidth=4*(1-k)+1;g.beginPath();let x=b.x+(R()-.5)*60,y=b.y-620;g.moveTo(x,y);
    while(y<b.y){y+=40+R()*40;x+=(R()-.5)*50;if(y>b.y){y=b.y;x=b.x}g.lineTo(x,y)}g.stroke();g.strokeStyle='rgba(150,190,255,'+(.6*(1-k))+')';g.lineWidth=10*(1-k);g.stroke()}g.restore()}
/* ---------- แสงยามค่ำ / ทับจอ ---------- */
function sgNight(){if(curMap!==39||isDg())return;let k=.55;try{k=Math.max(.35,Math.min(1,dnState().dk/.42))}catch(e){}const T=performance.now()/1000;g.save();if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);g.globalCompositeOperation='lighter';
  for(const t of trees){if(t.k!=='sglamp'&&t.k!=='sgmast')continue;if(!palVis(t.x,t.y-60,60))continue;const lx=t.k==='sglamp'?t.x+6:t.x+18,ly=t.k==='sglamp'?t.y-56:t.y-120;glowAt(lx,ly,26,'140,200,255',(.38+.08*Math.sin(T*3+t.x))*k)}
  {const st=stCur(),q=me.sty;if(st&&st.p8lg&&q&&q.a===1)for(let i=0;i<5;i++){if((q.p8lg|0)>>i&1)continue;const[x,y]=sgLog(i);if(palVis(x,y,60))glowAt(x,y-14,40,'255,210,130',.4*k)}}
  g.restore()}
function sgScreen(T,z,Hs){const Q=LOWQ;g.save();
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.3,SW0/2,Hs/2,Math.max(SW0,Hs)*.78);vg.addColorStop(0,'rgba(20,26,50,0)');vg.addColorStop(1,'rgba(20,26,50,.34)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  /* ฝนเฉียง */g.strokeStyle='rgba(200,215,240,.32)';g.lineWidth=1;g.beginPath();const n=Q?24:60;for(let k=0;k<n;k++){const R=depRng(k*7+1),sp=600+R()*300,x=((R()*SW0*1.4+T*sp*.35)%(SW0+120))-60,y=((R()*Hs+T*sp)%(Hs+80))-40;g.moveTo(x,y);g.lineTo(x-7,y+16)}g.stroke();
  /* แฟลชฟ้าผ่าทั้งจอ */if(SGS.fl>0){g.fillStyle='rgba(220,230,255,'+Math.min(.45,SGS.fl)+')';g.fillRect(0,0,SW0,Hs)}
  if(SGS.w>=0&&!SD.on){const t='🌬️ ลมหอบตัวข้ามทะเลเมฆ…';g.font='bold 12px system-ui';g.textAlign='center';const w=g.measureText(t).width+20,cx=SW0/2,cy=Hs*.2;g.fillStyle='rgba(20,30,46,.78)';g.beginPath();g.roundRect(cx-w/2,cy-14,w,26,13);g.fill();g.fillStyle='#d8f0ff';g.fillText(t,cx,cy+4)}
  g.restore()}
/* ---------- ติ๊ก: เดินบนเกาะ · ลม · ฟ้าผ่า · ปูม ---------- */
function sgyTick(dt,now,x,y,mv){
  /* กระแสลม */const wi=me.down>0?-1:sgWind(x,y,0);if(wi>=0){const w=SGW[wi],L=Math.hypot(w[2]-w[0],w[3]-w[1]),ux=(w[2]-w[0])/L,uy=(w[3]-w[1])/L,[t,d]=sgSegT(x,y,w);
      me.x+=ux*SGSP*dt;me.y+=uy*SGSP*dt;/* ดึงเข้ากลางแถบ */const cx=w[0]+(w[2]-w[0])*t,cy=w[1]+(w[3]-w[1])*t;me.x+=(cx-me.x)*Math.min(1,dt*3);me.y+=(cy-me.y)*Math.min(1,dt*3);
      if(SGS.w!==wi){SGS.w=wi;try{sfx('dash')}catch(e){}}x=me.x;y=me.y}else if(SGS.w>=0){SGS.w=-1}
  if(sgIn(x,y,-4)){SGS.lx=x;SGS.ly=y}else if(!sgIn(x,y,-30)&&me.down<=0){me.x=SGS.lx;me.y=SGS.ly;x=me.x;y=me.y}
  /* ฟ้าผ่า: เตือนแล้วผ่า */SGS.fl=Math.max(0,SGS.fl-dt*1.6);
  for(const w of SGS.warn){w.t-=dt;if(w.t<=0&&!w.hit){w.hit=1;SGS.bolt.push({x:w.x,y:w.y,t0:performance.now(),s:(Math.random()*1e6)|0});SGS.fl=.5;try{shk=Math.max(shk,.2)}catch(e){}try{sfx('zap')}catch(e){}
      if(Math.hypot(me.x-w.x,(me.y-w.y)*2.4)<48&&me.down<=0&&!gmGod&&!(me.inv3>0)){const d=Math.round(me.mh*.08);me.hp=Math.max(1,me.hp-d);SGS.hk=(SGS.hk|0)+1;SGS.hd=d;try{mtCd=3}catch(e){}try{dn.push({x:me.x,y:me.y-60,v:'⚡ ฟ้าผ่า!',t:1.2,col:'#fff0a0'})}catch(e){}}}}
  SGS.warn=SGS.warn.filter(w=>!w.hit);
  if(!SD.on&&me.down<=0&&!sgSafe(x,y)){SGS.bt-=dt;if(SGS.bt<=0){SGS.bt=4.5+Math.random()*3.5;for(let k=0;k<6;k++){const a=Math.random()*6.283,r=Math.random()<.45?0:60+Math.random()*220,bx=x+Math.cos(a)*r+(mv?0:0),by=y+Math.sin(a)*r*.7;if(sgIn(bx,by,10,1)&&!sgSafe(bx,by)){SGS.warn.push({x:bx,y:by,t:1.15,d:1.15});break}}}}
  /* สมุดปูม */const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p8lg){SGS.lp=-1;SGS.lt=0;return}
  let near=-1;for(let i=0;i<5;i++){if((q.p8lg|0)>>i&1)continue;const[lx,ly]=sgLog(i);if(Math.hypot(x-lx,y-ly)<60)near=i}
  if(near!==SGS.lp){SGS.lp=near;SGS.lt=0}
  if(near>=0&&me.down<=0){SGS.lt+=dt;if(SGS.lt>=1){q.p8lg=(q.p8lg|0)|(1<<near);let n=0;for(let k=0;k<5;k++)if(q.p8lg>>k&1)n++;q.n=n;SGS.lp=-1;SGS.lt=0;
      PALG.card={h:SGLORE[near][0]+' · '+n+'/5',t:SGLORE[near][1],s:now,d:10};try{sfx('quest')}catch(e){}const[lx,ly]=sgLog(near);try{burst(lx,ly-20,['#fff4c0','#ffd27a','#ffffff'],30,150,1,{glow:1,g:-40})}catch(e){}try{stHud();writeSave()}catch(e){}}}}
/* ออโต้เควส: เกาะไกล (สำเภาเงิน · ซี่โครง) ไปทางลม · ขากลับก็ทางลม */
function sgAqT(st){if(!me.sty||!st.p8lg)return null;let b=null,bd=1e9;for(let i=0;i<5;i++){if((me.sty.p8lg|0)>>i&1)continue;const[x,y]=sgLog(i),d=curMap===39?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b=i}}if(b==null)return null;
  const[lx,ly]=sgLog(b),isl=SGLOGP[b][0],here=curMap===39?sgIsle(me.x,me.y,0):0,lb='ตามหาสมุดปูมเรือ ('+((me.sty.p8lg|0).toString(2).split('1').length-1)+'/5)';
  if(curMap===39&&SGS.w>=0)return{mp:39,act:'reach',x:me.x,y:me.y,lb:'🌬️ ปล่อยให้ลมพาไป'};
  const wIn=w=>{const L=Math.hypot(w[2]-w[0],w[3]-w[1]);return[w[0]+(w[2]-w[0])/L*25,w[1]+(w[3]-w[1])/L*25]};
  if(curMap===39&&(here===5||here===6)&&here!==isl){const[wx,wy]=wIn(SGW[here===5?1:3]);return{mp:39,act:'reach',x:wx,y:wy,lb:'🌬️ ขึ้นกระแสลมกลับ'}}
  if((isl===5||isl===6)&&here!==isl){const[wx,wy]=wIn(SGW[isl===5?0:2]);return{mp:39,act:'reach',x:wx,y:wy,lb:'🌬️ ไปขึ้นกระแสลม → '+(isl===5?'ซากสำเภาเงิน':'เกาะซี่โครงยักษ์')}}
  return{mp:39,act:'reach',x:lx,y:ly+30,lb}}
/* ---------- ภาพมอนธีม 39 (ระบบ MV1D) ---------- */
function sgGhostTrail(W,r,T,b){if(W||LOWQ)return;for(let i=0;i<5;i++){const p=(T*.7+i/5)%1;g.fillStyle='rgba(170,220,255,'+(.35*(1-p))+')';g.beginPath();g.ellipse(-r*.1-p*r*.5,r*.5+b-p*r*.1,r*(.2-p*.12),r*(.12-p*.06),0,0,7);g.fill()}}
MV1D[390]=(r,T,W,bob)=>{/* วิญญาณกะลาสี: ร่างโปร่งฟ้า ผ้าโพกหัว เสื้อลายขวาง ล่องลอยไม่มีขา ถือสมอสนิมโซ่ห้อย ตาไฟฟ้า */const b=Math.sin(T*2.2)*r*.08,sw=Math.sin(T*1.6)*.12;
  const BD='rgba(150,205,240,.82)',BL='rgba(200,235,255,.9)',ST='#2c4c78';vGlow(W,0,-r*.5+b,r*1.1,'140,200,255',.22);sgGhostTrail(W,r,T,b);
  /* ร่างล่างเป็นควัน */vS(W,[[-r*.42,-r*.2+b],['q',-r*.5,r*.3+b,-r*.2,r*.62+b],['q',-r*.05,r*.4+b,r*.06,r*.7+b],['q',r*.18,r*.4+b,r*.36,r*.56+b],['q',r*.5,r*.2+b,r*.42,-r*.2+b]],BD,1,.7);
  /* ตัวเสื้อลายขวาง */vS(W,[[-r*.42,-r*.2+b],['q',-r*.46,-r*.7+b,-r*.2,-r*.8+b],[r*.2,-r*.8+b],['q',r*.46,-r*.7+b,r*.42,-r*.2+b],['q',0,-r*.06+b,-r*.42,-r*.2+b]],'#e8f2fa',1,.9);
  for(let k=0;k<4;k++){const y=-r*.68+k*r*.13+b;vK(W,[[-r*.4,y],['q',0,y+r*.04,r*.4,y]],ST,r*.05)}
  /* แขนซ้ายลอย */vLimb(W,[-r*.36,-r*.66+b,-r*.62,-r*.4+b+sw*r*.3,-r*.66,-r*.16+b],BL,r*.15,r*.1);
  /* หัว + ผ้าโพก + หนวด */const hy=-r*1.02+b;wE(W,0,hy,r*.26,r*.25,BL);vS(W,[[-r*.27,hy-r*.06],['q',-r*.2,hy-r*.36,r*.04,hy-r*.32],['q',r*.3,hy-r*.28,r*.27,hy-r*.04],['q',0,hy-r*.12,-r*.27,hy-r*.06]],'#c23a3a',1,.7);vS(W,[[r*.24,hy-r*.12],[r*.44,hy-r*.2],[r*.4,hy-r*.02]],'#a82a2a',1,.6);
  vK(W,[[-r*.12,hy+r*.12],['q',0,hy+r*.06,r*.12,hy+r*.12]],'rgba(60,90,130,.8)',r*.05);vEye(W,-r*.09,hy-r*.02,r*.05,r*.06,'#c8f4ff',7);vEye(W,r*.11,hy-r*.02,r*.05,r*.06,'#c8f4ff',7);
  /* แขนขวาถือสมอ */const ax=r*.62,ay=-r*.38+b+Math.sin(T*2)*r*.04;vLimb(W,[r*.34,-r*.66+b,r*.58,-r*.6+b,ax,ay-r*.2],BL,r*.15,r*.1);
  g.save();g.translate(ax,ay);g.rotate(.25+sw);vK(W,[[0,-r*.3],[0,r*.42]],'#5a5a66',r*.08);vK(W,[[-r*.16,-r*.2],[r*.16,-r*.2]],'#5a5a66',r*.06);vK(W,[[-r*.28,r*.22],['q',0,r*.56,r*.28,r*.22]],'#5a5a66',r*.09);
  vS(W,[[-r*.3,r*.22],[-r*.38,r*.12],[-r*.2,r*.18]],'#6a6a76',1,.5);vS(W,[[r*.3,r*.22],[r*.38,r*.12],[r*.2,r*.18]],'#6a6a76',1,.5);wE(W,0,-r*.36,r*.07,r*.07,'#6a6a76');
  if(!W){g.fillStyle='rgba(150,80,40,.5)';g.beginPath();g.arc(r*.1,r*.32,r*.05,0,7);g.arc(-r*.12,r*.05,r*.04,0,7);g.fill()}g.restore();
  /* โซ่ห้อย */if(!W){g.strokeStyle='#7a7a86';g.lineWidth=r*.025;for(let k=0;k<5;k++){const y=-r*.1+k*r*.09+b;g.beginPath();g.ellipse(r*.5+Math.sin(T*2+k)*r*.03,y,r*.03,r*.045,0,0,7);g.stroke()}}
  return true};
MV1D[391]=(r,T,W)=>{/* ปลาไหลอสนี: ตัวยาวคดเคี้ยวกลางอากาศ ลำตัวน้ำเงินเข้มลายสายฟ้าเหลือง ครีบหลังโปร่ง หัวมีหนวด ตาเหลือง ประกายไฟฟ้า */const by=-r*.3+Math.sin(T*2.4)*r*.1;
  const BK='#1e3a6a',BLT='#3a6aaa',YL='#ffe066',N=9,P=[];for(let i=0;i<=N;i++){const u=i/N,x=r*.9-u*r*2.0,y=by+Math.sin(T*5-u*6)*r*.22*(.3+u*.7);P.push([x,y])}
  vGlow(W,0,by,r*1.2,'120,200,255',.2);
  /* ลำตัว (เส้นหนาเรียวไปหาง) */for(let i=N;i>0;i--){const[x0,y0]=P[i],[x1,y1]=P[i-1],w=r*(.12+.22*(1-i/N));vK(W,[[x0,y0],[x1,y1]],'#0e1c34',w+r*.05);vK(W,[[x0,y0],[x1,y1]],i%2?BK:BLT,w)}
  /* ครีบหลังโปร่ง */if(!W){g.fillStyle='rgba(150,200,255,.35)';g.beginPath();g.moveTo(P[1][0],P[1][1]-r*.14);for(let i=1;i<N-1;i++)g.lineTo(P[i][0],P[i][1]-r*(.3-.02*i)+Math.sin(T*9+i)*r*.03);for(let i=N-2;i>=1;i--)g.lineTo(P[i][0],P[i][1]-r*.1);g.closePath();g.fill()}
  /* ลายสายฟ้า */if(!W){g.strokeStyle=YL;g.lineWidth=r*.035;for(let i=2;i<N-1;i+=2){const[x,y]=P[i];g.beginPath();g.moveTo(x-r*.05,y-r*.07);g.lineTo(x+r*.03,y);g.lineTo(x-r*.03,y+r*.02);g.lineTo(x+r*.05,y+r*.08);g.stroke()}}
  /* หัว */const[hx,hy]=P[0];wE(W,hx+r*.04,hy,r*.2,r*.15,BLT);vS(W,[[hx+r*.18,hy-r*.02],[hx+r*.34,hy+r*.02],[hx+r*.18,hy+r*.08]],'#0e1c34',1,.6);
  vEye(W,hx+r*.1,hy-r*.05,r*.05,r*.05,YL,8);vK(W,[[hx+r*.2,hy+r*.06],['q',hx+r*.36,hy+r*.18,hx+r*.42,hy+r*.32]],'#8ab8f0',r*.03);vK(W,[[hx+r*.16,hy+r*.08],['q',hx+r*.22,hy+r*.26,hx+r*.18,hy+r*.38]],'#8ab8f0',r*.03);
  /* ประกายไฟฟ้า */if(!W&&!LOWQ&&((T*8)|0)%3===0){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,250,180,.9)';g.lineWidth=1.4;const R=depRng(((T*8)|0)+((r*10)|0));for(let k=0;k<2;k++){const i=2+((R()*(N-3))|0);let px=P[i][0],py=P[i][1];g.beginPath();g.moveTo(px,py);for(let s=0;s<3;s++){px+=(R()-.5)*r*.4;py+=(R()-.5)*r*.4;g.lineTo(px,py)}g.stroke()}g.restore()}
  return true};
MV1D[392]=(r,T,W,bob)=>{/* ลูกวาฬเงา: ว่ายโผล่หลังจากเมฆ ผิวม่วงเทาเข้มลายจุดดาว ท้องร่อง ครีบใหญ่ ตาโตใสเศร้า พ่นไอเมฆจากรูหายใจ */const b=Math.sin(T*1.6)*r*.07,tl=Math.sin(T*2.2)*.18;
  const SK='#4a4a6e',SD='#33335a',BL='#9a9ab8';try{wCloud(W,-r*.1,r*.66,r*1.0,r*.32,T,'#eef2fa','#a8b4cc')}catch(e){}
  /* หาง */g.save();g.translate(-r*.82,-r*.06+b);g.rotate(tl);vS(W,[[0,0],['q',-r*.2,-r*.08,-r*.34,-r*.36],['q',-r*.22,-r*.18,-r*.06,-r*.12],['q',-r*.24,r*.0,-r*.36,r*.2],['q',-r*.18,r*.08,0,r*.06]],SD);g.restore();
  /* ตัว */vS(W,[[-r*.86,-r*.02+b],['q',-r*.5,-r*.62+b,r*.3,-r*.56+b],['q',r*.92,-r*.48+b,r*.96,r*.0+b],['q',r*.8,r*.32+b,r*.2,r*.34+b],['q',-r*.5,r*.32+b,-r*.86,-r*.02+b]],SK);
  vD(W,[[-r*.4,r*.24+b],['q',r*.2,r*.14+b,r*.84,r*.08+b],['q',r*.66,r*.3+b,r*.2,r*.32+b],['q',-r*.2,r*.32+b,-r*.4,r*.24+b]],BL);for(let k=0;k<4;k++)vK(W,[[-r*.2+k*r*.22,r*.2+b],['q',-r*.1+k*r*.22,r*.26+b,r*.0+k*r*.22,r*.22+b]],'rgba(60,60,100,.5)',r*.02);
  /* จุดดาวบนหลัง */if(!W){for(const[dx,dy,s]of[[-r*.3,-r*.4,1],[r*.0,-r*.46,.7],[r*.3,-r*.42,1.1],[r*.56,-r*.3,.8],[-r*.55,-r*.2,.7]]){g.fillStyle='rgba(220,230,255,.85)';g.beginPath();g.arc(dx,dy+b,r*.025*s,0,7);g.fill()}vGlow(W,r*.1,-r*.42+b,r*.5,'170,180,255',.18)}
  /* ครีบอก */vS(W,[[r*.2,r*.16+b],['q',r*.06,r*.5+b,-r*.24,r*.54+b],['q',-r*.02,r*.34+b,r*.06,r*.18+b]],SD,1,.7);
  /* ตา + ปาก */vS(W,[[r*.6,r*.1+b],['q',r*.78,r*.14+b,r*.92,r*.06+b]],'rgba(0,0,0,0)',1,.8);wE(W,r*.6,-r*.12+b,r*.08,r*.08,'#e8eef8');vEye(W,r*.62,-r*.12+b,r*.05,r*.055,'#141428',0);if(!W){g.fillStyle='rgba(150,180,255,.6)';g.beginPath();g.ellipse(r*.6,-r*.02+b,r*.03,r*.05,0,0,7);g.fill()}
  /* ไอพ่นจากรูหายใจ */if(!W&&!LOWQ){for(let k=0;k<4;k++){const p=(T*.9+k/4)%1;g.fillStyle='rgba(240,246,255,'+(.6*(1-p))+')';g.beginPath();g.ellipse(r*.36+Math.sin(k*2)*r*.06*p,-r*.6+b-p*r*.6,r*(.06+p*.1),r*(.05+p*.06),0,0,7);g.fill()}}
  try{wCloud(W,r*.1,r*.74,r*.8,r*.24,T+1,'#ffffff','#c0cade')}catch(e){}return true};
MV1S[390]=1.15;MV1S[391]=1.2;MV1S[392]=1.25;
/* ---------- ของประกอบฉาก ---------- */
Object.assign(PALK,{
 sgmast(t,T){const x=t.x,y=t.y,v=t.v|0,sw=Math.sin(T*1.3+x*.01)*4;PALSH(x+6,y+4,22,7,.4);
  try{phSpr('sgm'+v,x,y,[-90,-240,180,250],()=>{const H=[200,150,180][v];g.strokeStyle='#2e1e12';g.lineWidth=10;g.beginPath();g.moveTo(0,0);g.lineTo(3,-H);g.stroke();g.strokeStyle='#5a3e26';g.lineWidth=6;g.beginPath();g.moveTo(-1,0);g.lineTo(2,-H);g.stroke();
    /* หักปลาย */g.fillStyle='#3a2616';g.beginPath();g.moveTo(-3,-H);g.lineTo(2,-H-14);g.lineTo(6,-H+2);g.lineTo(9,-H-8);g.lineTo(8,-H+6);g.closePath();g.fill();
    g.lineWidth=5;g.strokeStyle='#4a3020';g.beginPath();g.moveTo(-50,-H+40);g.lineTo(60,-H+30);g.stroke();
    /* ใบขาด */g.fillStyle='rgba(196,190,176,.92)';g.beginPath();g.moveTo(-46,-H+44);g.lineTo(56,-H+36);g.lineTo(50,-H+96);g.lineTo(38,-H+84);g.lineTo(30,-H+110);g.lineTo(14,-H+90);g.lineTo(0,-H+118);g.lineTo(-14,-H+92);g.lineTo(-30,-H+104);g.lineTo(-40,-H+80);g.closePath();g.fill();g.strokeStyle='rgba(90,80,60,.6)';g.lineWidth=1.4;g.stroke();
    g.strokeStyle='rgba(110,100,80,.4)';for(const k of[-20,6,30]){g.beginPath();g.moveTo(k,-H+40);g.lineTo(k+2,-H+100);g.stroke()}g.fillStyle='rgba(60,50,40,.55)';g.beginPath();g.ellipse(10,-H+66,7,9,0,0,7);g.fill();
    g.strokeStyle='#b8a072';g.lineWidth=1.4;g.beginPath();g.moveTo(3,-H+4);g.lineTo(-60,-20);g.moveTo(3,-H+4);g.lineTo(70,-14);g.stroke()})}catch(e){}
  /* ตะเกียงผีห้อยเสา */const lx=x+18+sw*.2,ly=y-120;g.strokeStyle='#3a2a1c';g.lineWidth=1.2;g.beginPath();g.moveTo(x+4,y-136);g.lineTo(lx,ly-8);g.stroke();g.fillStyle='rgba(150,210,255,.8)';g.beginPath();g.ellipse(lx,ly,5,7,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly,18,'140,200,255',.4+.1*Math.sin(T*3+x));g.restore()},
 sgrib(t,T){const x=t.x,y=t.y,v=t.v|0;PALSH(x+8,y+4,46,10,.3);try{phSpr('sgr'+v,x,y,[-110,-270,220,290],()=>{const H=[230,190,250][v],c=[[-40,0],[40,0]];
    for(const s of[-1,1]){const b0=s*28;g.strokeStyle='#5a5a66';g.lineWidth=26;g.lineCap='round';g.beginPath();g.moveTo(b0,0);g.bezierCurveTo(b0+s*16,-H*.5,s*(70+v*6),-H*.85,s*(20+v*4),-H);g.stroke();
      const gr=g.createLinearGradient(-60,0,60,0);gr.addColorStop(0,'#d8d2c0');gr.addColorStop(.5,'#f2ecdc');gr.addColorStop(1,'#a8a090');g.strokeStyle=gr;g.lineWidth=20;g.stroke();
      g.strokeStyle='rgba(120,110,90,.5)';g.lineWidth=2;for(let k=1;k<5;k++){const u=k/5;g.beginPath();g.arc(b0+s*(16*u+50*u*u),-H*u,9,0,3.14);g.stroke()}}
    g.fillStyle='rgba(255,255,255,.85)';for(const[dx,r]of[[-46,30],[0,36],[46,28]]){g.beginPath();g.ellipse(dx,4,r,r*.42,0,0,7);g.fill()}})}catch(e){}},
 sgstone(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0;PALSH(x+3,y+3,22*s,6*s,.35);const P=[[-20,0],[-14,-16-v*3],[-2,-24],[12,-20+v*2],[20,-6],[18,0]];g.fillStyle='#6a7590';g.beginPath();P.forEach(([a,b],i)=>i?g.lineTo(x+a*s,y+b*s):g.moveTo(x+a*s,y+b*s));g.closePath();g.fill();
  g.fillStyle='#9aa6c0';g.beginPath();g.moveTo(x-14*s,y-16*s-v*3*s);g.lineTo(x-2*s,y-24*s);g.lineTo(x+4*s,y-12*s);g.lineTo(x-10*s,y-6*s);g.closePath();g.fill();g.strokeStyle='rgba(30,36,56,.6)';g.lineWidth=1;g.beginPath();P.forEach(([a,b],i)=>i?g.lineTo(x+a*s,y+b*s):g.moveTo(x+a*s,y+b*s));g.closePath();g.stroke();
  if(v===1){g.save();g.globalCompositeOperation='lighter';glowAt(x+4*s,y-14*s,8*s,'170,210,255',.35);g.restore()}},
 sglamp(t,T){const x=t.x,y=t.y,sw=Math.sin(T*1.8+t.v)*2;PALSH(x+3,y+3,8,3,.35);g.strokeStyle='#2e2016';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-64);g.lineTo(x+8,y-66);g.stroke();
  g.strokeStyle='#4a3a2a';g.lineWidth=1;g.beginPath();g.moveTo(x+8,y-66);g.lineTo(x+6+sw*.3,y-60);g.stroke();g.fillStyle='rgba(160,215,255,.85)';g.beginPath();g.ellipse(x+6+sw*.3,y-52,5.6,7.4,0,0,7);g.fill();g.strokeStyle='rgba(30,50,80,.8)';g.lineWidth=.8;g.stroke();g.fillStyle='#2e2016';g.fillRect(x+3+sw*.3,y-61,6,2);g.fillRect(x+3+sw*.3,y-45,6,2);
  g.save();g.globalCompositeOperation='lighter';glowAt(x+6+sw*.3,y-52,22,'140,200,255',.35+.08*Math.sin(T*3+t.v));g.restore()},
 sgboat(t,T){const x=t.x,y=t.y+Math.sin(T*1.3)*4;g.save();g.fillStyle='rgba(60,70,100,.3)';g.beginPath();g.ellipse(t.x,t.y+20,62,12,0,0,7);g.fill();g.translate(x,y);
  g.fillStyle='#d8ccb0';g.beginPath();g.ellipse(0,-78,40,24,0,0,7);g.fill();g.strokeStyle='#7a6a4a';g.lineWidth=1.2;g.stroke();g.strokeStyle='#8a7a5a';g.lineWidth=1;for(const dx of[-30,30]){g.beginPath();g.moveTo(dx,-66);g.lineTo(dx*.9,-14);g.stroke()}
  g.fillStyle='#7a5434';g.beginPath();g.moveTo(-50,-16);g.quadraticCurveTo(-40,4,0,6);g.quadraticCurveTo(40,4,50,-16);g.closePath();g.fill();g.strokeStyle='#3a2414';g.lineWidth=1.6;g.stroke();g.fillStyle='#d8b050';g.fillRect(-48,-18,96,3);g.restore();
  g.strokeStyle='#c8b080';g.lineWidth=1.2;g.beginPath();g.moveTo(x+46,y-12);g.quadraticCurveTo(x+90,y+10,x+150,t.y-150);g.stroke()},
 sgbk(t,T){const x=t.x,y=t.y,lit=gP8gd()&&(me.sty&&me.sty.p8g)===1;g.save();g.translate(x,y);g.scale(1.5,1.5);try{phShipD(0,0,T,{f:-1,dark:1,nm:'เรือดำ'})}catch(e){}g.restore();
  if(lit){g.save();g.globalCompositeOperation='lighter';for(const k of[-100,0,100])glowAt(x+k,y-70,14,'255,210,140',.5+.2*Math.sin(T*2+k));g.restore()}
  else{g.save();g.globalCompositeOperation='lighter';glowAt(x+60,y-40,24,'140,170,255',.2+.1*Math.sin(T*1.5));g.restore()}},
 sgtil(t,T){const N=MAPS[39]&&MAPS[39].npc;if(!N)return;try{sfTil(N.x+40,N.y+12,me.x<N.x+40?-1:1,T)}catch(e){}},
 sggrif(t,T){const N=MAPS[39]&&MAPS[39].npc2;if(!N||N.x<0)return;grifD(N.x,N.y,me.x<N.x?-1:1,T);phLbl('กัปตันกริฟ · เรือดำ',N.x,N.y-50,'#d0c8e0');
  for(const[dx,dy,k]of[[-36,16,0],[-56,6,1]]){try{campFolk(N.x+dx,N.y+dy,{c:'#4a4a5a',sh:'#c8c0b8',hair:k?'#2a1a10':'#c8a060',f:1,s:.72,k:20+k,arm:Math.sin(T*2+k)*.3-.3},T)}catch(e){}}}});
/* กัปตันกริฟ (NPC) */
function grifD(x,y,f,T){const O='#100c14';g.save();g.translate(x,y);g.scale(f*1.12,1.12);PALSH(0,14,18,5,.4);
  g.fillStyle='#16141c';g.beginPath();g.moveTo(-10,-22);g.lineTo(10,-22);g.lineTo(16,14);g.quadraticCurveTo(0,18,-16,14);g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
  g.fillStyle='#7a1e22';g.beginPath();g.moveTo(-4,-20);g.lineTo(4,-20);g.lineTo(6,12);g.lineTo(-6,12);g.closePath();g.fill();g.strokeStyle='#b88a3a';g.lineWidth=1.3;g.beginPath();g.moveTo(-10,-22);g.lineTo(-15.4,13);g.moveTo(10,-22);g.lineTo(15.4,13);g.stroke();
  g.fillStyle='#2a2018';g.fillRect(-11,-4,22,4);g.fillStyle='#b88a3a';g.fillRect(-2,-4.4,4,4.8);
  /* แขนแกนดาวกล (ซ้าย) */g.strokeStyle='#5a6070';g.lineWidth=4.4;g.lineCap='round';g.beginPath();g.moveTo(-9,-17);g.lineTo(-12,-3);g.stroke();g.save();g.globalCompositeOperation='lighter';glowAt(-12,-3,7,'140,180,255',.35+.2*Math.sin(T*2));g.restore();
  g.strokeStyle='#16141c';g.beginPath();g.moveTo(9,-17);g.lineTo(12,-5);g.stroke();g.fillStyle='#d8b8a0';g.beginPath();g.arc(12,-4,2,0,7);g.fill();
  g.fillStyle='#d8b8a0';g.beginPath();g.arc(0,-27,6.6,0,7);g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();g.fillStyle='#4a4048';g.beginPath();g.moveTo(-6,-25);g.quadraticCurveTo(0,-14,6,-25);g.quadraticCurveTo(0,-20,-6,-25);g.fill();
  g.fillStyle='#0a0a0e';g.fillRect(-4.6,-30,4,3);g.strokeStyle='#0a0a0e';g.lineWidth=.8;g.beginPath();g.moveTo(-6.4,-31);g.lineTo(6,-29);g.stroke();g.fillRect(2.2,-29,1.6,1.6);
  g.fillStyle='#121016';g.beginPath();g.moveTo(-13,-31);g.quadraticCurveTo(0,-39,13,-31);g.quadraticCurveTo(0,-34,-13,-31);g.fill();g.beginPath();g.moveTo(-8,-32);g.lineTo(-6,-42);g.lineTo(6,-42);g.lineTo(8,-32);g.closePath();g.fill();
  g.strokeStyle='#b88a3a';g.lineWidth=1;g.beginPath();g.moveTo(-12,-31.4);g.quadraticCurveTo(0,-37,12,-31.4);g.stroke();g.fillStyle='#e8e0d0';g.beginPath();g.arc(0,-37,2,0,7);g.fill();g.restore()}
/* ---------- เนื้อเรื่องภาค 8 บทที่ 3 ---------- */
Object.assign(SPK,{navin3:['นาวิน · เด็กต้นหน','🧭','#ffd27a'],grif:['กัปตันกริฟ · เรือดำ','🏴','#d0c8e0']});STNPC.navin3=[39,'npc'];STNPC.grif=[39,'npc2'];
STCH.push('ภาค 8 · บทที่ 3 · สุสานเรือ');
{const C3=STCH.length-1;STY.push(
 {c:C3,g:'talk',k:'sara',p8s3:1,tx:'คุยกับกัปตันซารา · แสงดาวที่ไหลลงสุสานเรือ',
  pre:[['nar','สามคืนหลังศึกที่ท่าเรือ เข็มทิศเสียงของนาวินไม่ยอมหยุดสั่น มันชี้ไปทางตะวันออกไกล ตรงที่ทะเลเมฆกลายเป็นสีเทาหม่น และฟ้าแลบอยู่ไม่ขาดสาย'],
   ['sara','เซเลสต์ส่งแผนที่จากกล้องใหญ่มาให้… แสงดาวไหลลงทะเลเมฆเป็นสายที่ «สุสานเรือ» ทุกคืน ที่นั่นคือที่ที่เรือของเราจมไปนับร้อยลำตลอดสามร้อยปี'],
   ['sara','ชาวเรือไม่มีใครกล้าเข้าไป ลมที่นั่นพัดเป็นสาย แรงพอจะหอบคนข้ามเมฆได้ และฟ้าผ่าไม่เคยหยุด'],
   ['navin','แต่เข็มทิศชี้ไปที่นั่น! ปูมเรือของเรือทุกลำที่จมยังอยู่ในซาก ถ้าอ่านปูมได้ เราจะรู้ว่าเงาที่กลืนนาวาลัยคืออะไร'],
   ['bkc','(ลูกเรือเรือดำคนหนึ่งยกมือ) กัปตันกริฟทอดสมอเรือดำไว้ที่สุสานเรือมาหลายคืนแล้ว… เขาตามแสงดาวไปเหมือนกัน เขาฝากบอกว่าจะรอพบผู้ถือตราที่นั่น',0,0,0,0,0,0,1],
   ['sara','เรือดำหายไปจากขอบฟ้าตั้งแต่เมื่อวาน… ไปทางเดียวกับแสงดาว ข้าไม่ชอบเรื่องบังเอิญแบบนี้',0,0,0,0,0,0,2],
   ['sara','ข้าเตรียมเรือเล็กไว้ที่ปลายสะพานเหนือแล้ว นาวินจะนำทาง… ผู้ถือตรา ระวังตัวด้วย']],rw:{g:120000}},
 {c:C3,g:'map',m:39,tx:'ขึ้นเรือเล็กไปสุสานเรือเมฆ (ปลายสะพานเหนือของผาท่าเรือเมฆ)',
  post:[['nar','เรือเล็กแล่นฝ่าม่านเมฆสีเทาเข้าไป เสียงลมหวีดหวิวเหมือนคนร้องเพลงผิดคีย์ แล้วซากเรือก็โผล่ขึ้นมาทีละลำ… เกยค้างอยู่บนแนวเมฆที่แข็งราวหินปูน'],
   ['nar','ไกลออกไปทางเหนือ มีกระดูกโค้งขนาดเท่าหอคอยโผล่พ้นเมฆเป็นแถว… ซี่โครงของอะไรสักอย่างที่ใหญ่เกินกว่าจะเป็นปลา'],
   ['navin','(นาวินกระโดดลงบนเมฆแข็ง) ที่นี่เดินได้! เมฆตรงนี้แข็งเพราะฟ้าผ่าเผามันมานาน… แต่ตรงที่เป็นเมฆฟู เดินไม่ได้นะ'],
   ['til','(ทิลตามลงมา กอดเข็มทิศดาวแน่น) เข็มทิศดาวของข้าหมุนติ้วเลย! แสงดาวที่ไหลลงมา… มันไหลลงไปข้างใต้ซากพวกนี้'],
   ['navin','เห็นสายลมสีขาวพวกนั้นไหม ลมที่นี่พัดเป็นสายตายตัว ก้าวเข้าไปมันจะหอบเราไปซากที่อยู่ไกล ๆ ได้ บางซากไปทางอื่นไม่ได้เลย'],
   ['nar','💡 ระวังฟ้าผ่า: วงสีเหลืองใต้เท้า = อีกไม่ถึงวินาทีจะผ่า เดินออกจากวงทันที (จุดขึ้นฝั่งปลอดภัย)']]},
 {c:C3,g:'clue',m:39,n:5,p8lg:1,tx:'ตามหาสมุดปูมเรือ 5 เล่มในซากเรือ (ยืนข้างแสงทอง · ซากที่ไกลต้องขึ้นกระแสลม 🌬️)',
  pre:[['navin','ปูมเรือมักอยู่ในห้องกัปตันท้ายเรือ ข้าเห็นแสงเรืองจากซากห้าแห่ง… ไปหามันทีละเล่มนะ'],
   ['navin','ซากที่อยู่ไกลออกไปต้องอาศัยสายลมพาไป ส่วนขากลับ มีสายลมพัดย้อนกลับมาเหมือนกัน ดูลูกศรบนสายลมให้ดี']],
  post:[['nar','สมุดปูมเล่มสุดท้ายเปียกชื้นและกรอบจนแทบจับไม่ได้ แต่ตัวอักษรยังชัด… และทุกเล่มเล่าเรื่องเดียวกันจากคนละมุม'],
   ['nar','เมฆรอบซากเริ่มเดือด ปลาไหลแสงฟ้าแลบพุ่งขึ้นมาเป็นสาย วิญญาณกะลาสีลอยออกมาจากช่องหน้าต่างเรือทุกบาน'],
   ['navin','พวกมันตามแสงของปูมเรือมา! ไล่มันไปก่อน แล้วค่อยมาอ่านด้วยกัน!']],rw:{g:100000}},
 {c:C3,g:'kill',m:39,n:40,tx:'ขับไล่วิญญาณกะลาสี ปลาไหลอสนี และลูกวาฬเงา',
  post:[['nar','วิญญาณกะลาสีตนสุดท้ายสลายเป็นละอองฟ้า ทิ้งเสียงฮัมเพลงกล่อมแผ่ว ๆ ไว้ในอากาศ'],
   ['navin','(นาวินนั่งลงบนเมฆแข็งที่จุดขึ้นฝั่ง กางสมุดปูมทั้งห้าเล่ม) ผู้ถือตรา มาตรงนี้สิ ข้าอ่านมันจบแล้ว']],rw:{g:90000}},
 {c:C3,g:'talk',k:'navin3',p8nv:1,tx:'คุยกับนาวินที่จุดขึ้นฝั่ง · ปูมเรือเล่าอะไร',
  pre:[['navin','เงาที่กลืนนาวาลัย… ปูมทุกเล่มเรียกมันเหมือนกัน «วาฬกลืนฟ้า» มันกินแสงดาว'],
   ['til','ราชาโอเรียนก็เห็นมัน! นี่ไงที่เขาบอกว่าดาวกำลังดับ… เขาเลยขังแสงไว้ในเมืองอัสตรา'],
   ['navin','แต่ปูมเล่มสุดท้ายบอกว่ามันหิวเพราะฟ้าไม่มีแสงเหลือ… ยิ่งทุกเมืองเก็บแสงไว้ มันก็ยิ่งหิว แล้วก็ยิ่งขึ้นมาใกล้'],
   ['me','(ความหิวที่เกิดจากการกักตุน… แบบเดียวกับที่ราชาโอเรียนเคยทำ)'],
   ['nar','ทันใดนั้น เสียงแตรต้อนเมฆดังทุ้มต่ำมาจากทางตะวันออก เรือสีดำลำใหญ่ถอนสมอแล่นออกจากม่านพายุ ปืนใหญ่ทุกกระบอกหันมาทางนี้'],
   ['grif','ผู้ถือตรา! (เสียงตะโกนก้องข้ามเมฆ) ข้าได้ยินว่าเจ้าเปิดท่าให้ลูกเรือข้า… ขอบใจ แต่แกนดาวในสุสานนี้ข้าต้องได้ ขึ้นมาบนเรือข้าสิ ถ้าจะห้าม!',0,0,0,0,0,0,1],
   ['grif','ผู้ถือตรา! คนที่ปิดท่าใส่เด็กบนเรือข้า… แกนดาวในสุสานนี้ข้าจะเอาไปให้หมด ขึ้นมาหยุดข้าสิ ถ้าแน่จริง!',0,0,0,0,0,0,2],
   ['navin','(นาวินกำเข็มทิศแน่น) ข้าพาเรือเล็กไปเทียบเรือดำได้… บอกข้าเมื่อพร้อม']],rw:{g:80000,s3:5}},
 {c:C3,g:'gdl',k:'navin3',p8gd:1,tx:'ดวลบนเรือดำ: สู้กัปตันกริฟบนดาดฟ้าที่เอียงตามพายุ (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['navin','เรือดำเอียงตามลมพายุตลอดเวลา ยืนให้มั่น แล้วระวังถังไม้ที่กลิ้งมา'],['navin','พร้อมเมื่อไหร่บอกข้า ข้าจะพาเรือเล็กไปเทียบกราบ']],
  post:[['nar','กริฟทรุดเข่าลงกลางดาดฟ้า ดาบหลุดมือ… แล้วประตูห้องท้ายเรือก็เปิดออก เด็กนับสิบคนในเสื้อผ้าขาดวิ่นยืนเบียดกันอยู่ในนั้น'],
   ['nar','บนผนังห้องเครื่อง แกนดาวของเรือดำเหลือแสงริบหรี่ เหมือนถ่านไฟใกล้มอด']]},
 {c:C3,g:'talk',k:'grif',p8c3:1,tx:'คุยกับกัปตันกริฟที่จุดขึ้นฝั่ง',
  pre:[['grif','(กริฟหัวเราะแห้ง ๆ ปาดเลือดที่มุมปาก) สิบปี… ข้าขโมยแกนดาวมาสิบปีเพื่อให้เรือลำนี้บินต่อได้ เด็กสี่สิบคนบนนั้นไม่มีที่อื่นให้ไป'],
   ['grif','สภากองเรือปฏิเสธข้าคืนที่เครื่องดาวเริ่มดับ… ข้าเลยเลือกเป็นโจร ดีกว่าปล่อยให้เด็กพวกนี้จมเมฆไปพร้อมเรือ'],
   ['grif','แต่เจ้า… เปิดท่าให้ลูกเรือข้า ทั้งที่รู้ว่าข้าเป็นใคร (เขาหยิบดาบขึ้นมาแล้วยื่นด้ามให้) ถ้าวาฬนั่นขึ้นมาอีก เรือดำจะสู้ข้างเจ้า',0,0,0,0,0,0,1],
   ['sara','(ซาราก้าวขึ้นมาตามหลัง มองดาบในมือกริฟอยู่นาน) …ยินดีต้อนรับกลับกองเรือ ต้นหนกริฟ ครั้งนี้จะไม่มีใครปฏิเสธเจ้าอีก',0,0,0,0,0,0,1],
   ['grif','เจ้าไม่ไว้ใจข้า ข้าก็ไม่ไว้ใจเจ้า… ยุติธรรมดี (เขาโยนดาบลงทะเลเมฆ) ข้ายอมแพ้ แต่ข้าจะไม่ขึ้นท่าของเจ้า จนกว่าเด็กพวกนี้จะได้ขึ้นก่อน',0,0,0,0,0,0,2],
   ['sara','(ซาราพยักหน้าช้า ๆ) เด็ก ๆ ขึ้นท่าได้เลย ส่วนเจ้า กริฟ… เรือดำจะลอยอยู่ข้างท่า และยามของกองเรือจะเฝ้าทั้งคืน',0,0,0,0,0,0,2],
   ['navin','(เข็มทิศเสียงในมือนาวินหมุนลงพื้นทันที เข็มชี้ดิ่งลงไปใต้เมฆ) …ทุกคน เงียบก่อน ได้ยินไหม'],
   ['nar','ใต้สุสานเรือ เมฆทั้งผืนสั่นสะเทือนเป็นจังหวะช้า ๆ เหมือนหัวใจขนาดมหึมา… แล้วก็มีเสียงหนึ่งดังขึ้นมาจากข้างใต้ ยาว ต่ำ และเศร้า เหมือนเพลงกล่อมท่อนที่สี่ที่ร้องผิดคีย์'],
   ['grif','(กริฟหน้าซีด) …มันมาแล้ว มันตามแสงแกนดาวมา']],
  post:[['nar','🐋 — จบภาค 8 บทที่ 3 · สุสานเรือ — บทต่อไป: ท้องวาฬ']],rw:{g:150000,s3:10}})}
setTimeout(()=>{try{
    MAPS[38].gates.push({x:2900,y:1250,to:39,req:1,p83:1,nm:'สุสานเรือเมฆ (ขึ้นเรือเล็ก)',arr:{x:420,y:1600}});
    const M8=MAPS[38];MAPS[39]=Object.assign({},M8,{n:'สุสานเรือเมฆ',sx:420,sy:1600,sr:110,seed:391,bg:'#9aa8c0',tile:'#c8d2e2',safe:'#dfe6f0',ring:'#c8e4ff',t1:'#3a4660',t2:'#8a98b4',d1:'#7a88a8',d2:'#ffffff',bth:39,fsw:[],
      gates:[{x:200,y:1600,to:38,req:1,nm:'ผาท่าเรือเมฆ (ขึ้นเรือเล็ก)',arr:{x:2850,y:1250}}],npc:{x:700,y:1540,n:'นาวิน · เด็กต้นหน',L:22},npc2:{x:-9999,y:-9999,n:'กัปตันกริฟ · เรือดำ'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[1160,1130],[1640,1720],[2150,1230],[2330,1300],[1300,2430],[2620,2330],[2520,540]]});
    FIELDM[39]=1;BTR[39]='170,200,255';GLOWC[39]='200,225,255';FXST[39]='storm';try{BTC[39]=['#eaf2ff','#5a7ab8','#ffffff'];TIER[39]=[76,23,3.05];WRG[39]={0:{rg:230,cd:2.7,spd:250,dm:1.5,k:'seed',c:'110,120,140',big:1},1:{rg:250,cd:1.8,spd:340,dm:.85,k:'zap',c:'170,220,255'}}}catch(e){}}catch(e){console.warn('sg map',e)}
  try{NPC3[39]={d:navinD,s:['เข็มทิศชี้ลงไปใต้เมฆอีกแล้ว…','ทิลสอนข้าอ่านเข็มทิศดาวด้วยนะ!','ฟ้าผ่าที่นี่ไม่เคยหยุดเลยสักคืน','ปูมเรือพวกนี้เขียนโดยปู่ของปู่ของปู่ข้า'],hy:40}}catch(e){}
  try{Object.assign(DEPM,{39:'gyard'});DEP4.gyard={fog:'150,165,200',fa:.1,bd:.16};AMB2.gyard=['rgba(200,215,245,.12)','rgba(20,26,56,.48)','190,210,255']}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p8lg)return sgAqT(st);return _q(st)}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{sgNight()}catch(e){}}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{sgBoltDraw()}catch(e){}_dn()}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===39&&!sgIn(x,y,12,1))return false;return _aw(x,y)}}catch(e){}
  try{WMN[39]=[322,905,'สุสานเรือเมฆ','🐋'];WMLV[39]=[138,142]}catch(e){}
  try{NMLR[39]=[[1160,1130],[1640,1720],[2150,1230],[1300,2430],[2620,2330]]}catch(e){}
  /* NPC กริฟโผล่ที่จุดขึ้นฝั่งหลังดวลบนเรือดำ */
  setInterval(()=>{try{const N=MAPS[39]&&MAPS[39].npc2;if(!N)return;if(gP8gd()){N.x=600;N.y=1700}else{N.x=-9999;N.y=-9999}}catch(e){}},500);
},0);
