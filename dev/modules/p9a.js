/* ---------- v535 ภาค 9 · ห้วงดาวไร้ขอบ · บทที่ 1 «บันไดดาว» (แมพ 40 · ลานดาวลอย) ----------
   แมพ 40 Lv 144–148: เกาะอุกกาบาตลอยกลางห้วงอวกาศ (เดินได้) · ความว่างเปล่ารอบตัว (ตกไม่ได้ → ดึงกลับจุดล่าสุด)
   สะพานแสง (กระจกดาวสีฟ้า) เชื่อมเกาะใกล้ · «สายธารดาว» ทางเดียว พาลอยข้ามความว่างไปเกาะไกล (เกาะ 4, 6 ไปได้ทางธารเท่านั้น · มีธารกลับ)
   ฝนดาวตก: วงเตือนสีส้มใต้เท้า แล้วอุกกาบาตพุ่งลงเฉียงจากฟ้า (ไม่ตกที่ลานบันได) · ไม่มีกลางวันกลางคืน (แสงอวกาศคงที่)
   ฉากหลัง: เนบิวลาม่วง-ชมพู-ฟ้า · ดาวสามชั้น · กาแล็กซีวน · ดาวเคราะห์มีวงแหวน · ดาวหางพาด · ยอดหอทอดาวไกลทางเหนือยิงลำแสงขึ้นฟ้า
   มอนธีม 42: อุกกาบาตเดินได้ · แมงกะพรุนเนบิวลา (ยิงดาว) · หุ่นเย็บดาว (ปาเข็ม) */
const Q9I=[{x:560,y:2600,rx:380,ry:290},{x:1250,y:2050,rx:300,ry:220},{x:520,y:1450,rx:280,ry:210},{x:1900,y:1500,rx:360,ry:250},{x:2620,y:2300,rx:300,ry:210},{x:1300,y:800,rx:300,ry:210},{x:2520,y:700,rx:330,ry:230}];
const Q9B=[[820,2420,1060,2180,34],[1440,1930,1700,1680,32],[540,1640,560,2330,32],[1720,1310,1480,960,32]];
/* สายธารดาว [x0,y0,x1,y1,ครึ่งกว้าง,ไปเกาะ] */
const Q9W=[[2160,1640,2480,2170,40,4],[2740,2120,2160,1350,40,3],[1580,760,2210,720,40,6],[2400,900,2040,1300,40,3]];
const Q9SH=[[1,120,-40],[2,-60,40],[4,80,20],[5,-90,-30],[6,110,40]];
const Q9LORE=[['✨ เศษดาว «เวกา» · กระพริบครั้งสุดท้าย','«…ข้าเคยส่องทางให้เรือของคนเลี้ยงแกะ ตอนนี้ข้าเหลือแค่เศษเท่ากำปั้น มีเส้นด้ายเงินพันรอบตัวข้าไว้ ดึงข้าขึ้นไปข้างบนทีละนิด…»'],
 ['✨ เศษดาว «อัลไต» · เสียงกระซิบ','«อย่าเชื่อเพลงที่ดังมาจากยอดหอ มันร้องเพลงกล่อมเหมือนของพวกเจ้า แต่ร้องเพื่อให้ดาวหลับ ดาวที่หลับจะถูกทอลงไปในตาข่าย»'],
 ['✨ เศษดาว «สไปกา» · ความทรงจำ','«สามร้อยปีก่อน มีชายสวมมงกุฎปีนบันไดนี้ขึ้นมา เขาปักหมุดทองเหลืองไว้ทุกเกาะ แล้วสั่งเครื่องจักรให้ทอต่อไปเรื่อย ๆ จนกว่าดาวทุกดวงจะปลอดภัย…»'],
 ['✨ เศษดาว «เดเนบ» · คำเตือน','«ปลอดภัยจากอะไร? เขาบอกว่าจากวาฬ จากความหิว จากความมืด… แต่ดาวที่ถูกขังไว้ ไม่ได้ส่องแสงให้ใครเลย»'],
 ['✨ เศษดาว «โพลาริส» · ดาวเหนือ','«ข้าคือดาวที่ชี้ทางให้นักเดินทางทุกคน และข้าคือดวงสุดท้ายที่ยังไม่ถูกทอ ตามแสงของข้าไปที่ใจกลางลาน… มีเด็กคนหนึ่งรอเจ้าอยู่»']];
const Q9ZN={land:['ลานบันไดดาว','ปลายบันไดแสงจากหอดูดาวโอเรียน… ข้างใต้คือเมฆทั้งผืนของโลก'],gard:['สวนผลึกดาว','ผลึกที่ตกค้างจากดาวแตก ส่งเสียงกังวานเบา ๆ เวลาเดินผ่าน'],west:['เกาะหินเย็น','หินเย็นเฉียบ มีรอยเท้าเก่าแก่ของใครบางคน'],
  ruin:['ซากเครื่องจักรโอเรียน','เฟืองทองเหลืองขนาดเท่าบ้านลอยหมุนช้า ๆ… ยังทำงานอยู่'],east:['เกาะดาวตก','หลุมอุกกาบาตใหม่ ๆ ยังร้อนระอุ'],north:['เกาะหอส่อง','จากตรงนี้มองเห็นยอดหอทอดาวชัดที่สุด'],far:['เกาะขอบฟ้า','สุดขอบลาน… ข้างหน้าคือความว่างที่ไม่มีที่สิ้นสุด'],
  bridge:['สะพานแสงดาว','กระจกแสงที่ถูกถักไว้ระหว่างเกาะ เดินแล้วมีเสียงระฆังแก้ว'],stream:['สายธารดาว','ธารฝุ่นดาวหอบตัวลอยข้ามความว่าง!']};
let Q9S={lx:420,ly:2620,w:-1,lp:-1,lt:0,mt:4,met:[],warn:[],fl:0},Q9N={st:[],cm:[]};
const Q9SP=420;
const q9SegT=(x,y,s)=>{const dx=s[2]-s[0],dy=s[3]-s[1],L2=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((x-s[0])*dx+(y-s[1])*dy)/L2));return[t,Math.hypot(x-s[0]-dx*t,y-s[1]-dy*t)]};
function q9InI(I,x,y,m){const rx=I.rx-m,ry=I.ry-m;if(rx<=0||ry<=0)return false;const a=(x-I.x)/rx,b=(y-I.y)/ry;return a*a+b*b<=1}
function q9Isle(x,y,m){for(let i=0;i<Q9I.length;i++)if(q9InI(Q9I[i],x,y,m||0))return i;return -1}
function q9OnB(x,y,m){for(const b of Q9B){const[,d]=q9SegT(x,y,b);if(d<b[4]-(m||0))return true}return false}
function q9Wind(x,y,m){for(let i=0;i<Q9W.length;i++){const w=Q9W[i],[t,d]=q9SegT(x,y,w);if(d<w[4]-(m||0)&&t>0&&t<.995)return i}return -1}
function q9In(x,y,m,noW){m=m||0;if(x<80||y<80||x>3120||y>3120)return false;return q9Isle(x,y,m)>=0||q9OnB(x,y,m)||(!noW&&q9Wind(x,y,m)>=0)}
function q9Safe(x,y){return q9InI(Q9I[0],x,y,-40)}
function q9Shard(i){const[k,a,b]=Q9SH[i],I=Q9I[k];return[I.x+a,I.y+b]}
const q9Zone=(x,y)=>{if(q9Wind(x,y,0)>=0&&q9Isle(x,y,0)<0)return'stream';const i=q9Isle(x,y,0);return i<0?'bridge':['land','gard','west','ruin','east','north','far'][i]};
const gP9s1=()=>p6Past('p9s1');
/* ---------- ฉากหลังอวกาศ (แคชเป็นแผ่น) ---------- */
function q9Space(c,ox,oy,S){const g0=c.createLinearGradient(ox,oy,ox+S*.3,oy+S);g0.addColorStop(0,'#090a1e');g0.addColorStop(1,'#0c0820');c.fillStyle=g0;c.fillRect(ox,oy,S,S);
  /* เนบิวลา: กลุ่มก้อนสีซ้อนกัน (ตำแหน่งโลกคงที่ ต่อเนื่องข้ามแผ่น) */
  const NB=[[700,600,900,'120,60,200',.34],[1100,500,600,'200,70,160',.22],[2600,1300,1000,'40,130,200',.26],[2900,1100,600,'90,200,220',.16],[1700,2900,1100,'160,60,190',.26],[400,2000,700,'60,90,210',.2],[2300,2600,700,'220,90,140',.16],[1600,1600,1200,'70,40,140',.18]];
  for(const[x,y,r,col,a]of NB){if(x+r<ox||x-r>ox+S||y+r<oy||y-r>oy+S)continue;const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(.5,'rgba('+col+','+(a*.45)+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)}
  /* เส้นใยเนบิวลา: ตำแหน่งโลกคงที่ วาดต่อเนื่องข้ามแผ่น (เดิมสุ่มต่อแผ่น → ขอบเหลี่ยม) */if(!window.Q9FIB){const F=gxRng(9101);window.Q9FIB=[];for(let k=0;k<46;k++){const x=F()*3400-100,y=F()*3400-100,p=[x,y,x+F()*500-250,y+F()*500-250,x+F()*500-250,y+F()*500-250,x+F()*700-350,y+F()*700-350],w=50+F()*90;Q9FIB.push({p,w,col:F()<.5?'180,120,255':'120,200,255',b:[Math.min(p[0],p[2],p[4],p[6])-w,Math.min(p[1],p[3],p[5],p[7])-w,Math.max(p[0],p[2],p[4],p[6])+w,Math.max(p[1],p[3],p[5],p[7])+w]})}}const R=gxRng(9100+((ox/S)|0)*31+((oy/S)|0)*7);c.save();c.globalCompositeOperation='lighter';c.lineCap='round';for(const f of Q9FIB){if(f.b[2]<ox||f.b[0]>ox+S||f.b[3]<oy||f.b[1]>oy+S)continue;const p=f.p;for(const[lw,al]of[[f.w,.028],[f.w*.45,.04]]){c.strokeStyle='rgba('+f.col+','+al+')';c.lineWidth=lw;c.beginPath();c.moveTo(p[0],p[1]);c.bezierCurveTo(p[2],p[3],p[4],p[5],p[6],p[7]);c.stroke()}}
  /* ดาวสามขนาด */for(let k=0;k<(LOWQ?110:220);k++){const x=ox+14+R()*(S-28),y=oy+14+R()*(S-28),s=R(),r=s<.85?.7+R()*.6:s<.97?1.4+R()*.8:2.2+R(),cl=R()<.15?'255,220,190':R()<.3?'190,210,255':'255,255,255';c.fillStyle='rgba('+cl+','+(.45+R()*.55)+')';c.beginPath();c.arc(x,y,r,0,7);c.fill();
    if(r>2.1){c.strokeStyle='rgba('+cl+',.35)';c.lineWidth=.8;c.beginPath();c.moveTo(x-r*4,y);c.lineTo(x+r*4,y);c.moveTo(x,y-r*4);c.lineTo(x,y+r*4);c.stroke()}}c.restore();
  /* กาแล็กซีวน (ทิศตะวันตกเฉียงเหนือ) */{const gx=320,gy=320,gr2=260;if(gx+gr2>ox&&gx-gr2<ox+S&&gy+gr2>oy&&gy-gr2<oy+S){c.save();c.translate(gx,gy);c.rotate(-.5);c.scale(1,.42);c.globalCompositeOperation='lighter';const r0=c.createRadialGradient(0,0,0,0,0,gr2);r0.addColorStop(0,'rgba(255,240,220,.55)');r0.addColorStop(.18,'rgba(255,200,170,.25)');r0.addColorStop(1,'rgba(150,120,255,0)');c.fillStyle=r0;c.beginPath();c.arc(0,0,gr2,0,7);c.fill();
    const R3=gxRng(9177);for(let arm=0;arm<2;arm++)for(let k=0;k<160;k++){const t=k/160,a=arm*Math.PI+t*7,rr=20+t*gr2*.95;c.fillStyle='rgba(220,210,255,'+(.5*(1-t))+')';c.beginPath();c.arc(Math.cos(a)*rr+(R3()-.5)*14,Math.sin(a)*rr+(R3()-.5)*14,.8+R3()*1.6,0,7);c.fill()}c.restore()}}
  /* ดาวเคราะห์วงแหวน (ตะวันออกเฉียงใต้ · ในความว่าง) */{const px=2950,py=2850,pr=150;if(px+pr*2.2>ox&&px-pr*2.2<ox+S&&py+pr>oy&&py-pr<oy+S){c.save();c.translate(px,py);
    c.strokeStyle='rgba(230,200,160,.35)';c.lineWidth=14;c.beginPath();c.ellipse(0,0,pr*2,pr*.45,-.25,Math.PI,0);c.stroke();
    const pg=c.createRadialGradient(-pr*.4,-pr*.4,10,0,0,pr);pg.addColorStop(0,'#e8b88a');pg.addColorStop(.6,'#a8644a');pg.addColorStop(1,'#3a1a24');c.fillStyle=pg;c.beginPath();c.arc(0,0,pr,0,7);c.fill();
    c.save();c.beginPath();c.arc(0,0,pr,0,7);c.clip();c.strokeStyle='rgba(255,220,180,.18)';c.lineWidth=10;for(let k=-3;k<=3;k++){c.beginPath();c.ellipse(0,k*36,pr*1.2,14,-.25,0,7);c.stroke()}c.restore();
    c.strokeStyle='rgba(240,214,170,.55)';c.lineWidth=10;c.beginPath();c.ellipse(0,0,pr*2,pr*.45,-.25,0,Math.PI);c.stroke();c.strokeStyle='rgba(255,240,210,.3)';c.lineWidth=3;c.beginPath();c.ellipse(0,0,pr*1.75,pr*.38,-.25,0,Math.PI);c.stroke();c.restore()}}
  /* ดวงจันทร์เล็ก */{const mx=2750,my=380,mr=60;if(mx+mr>ox&&mx-mr<ox+S&&my+mr>oy&&my-mr<oy+S){const mg=c.createRadialGradient(mx-20,my-20,4,mx,my,mr);mg.addColorStop(0,'#e8eaf6');mg.addColorStop(1,'#5a5e80');c.fillStyle=mg;c.beginPath();c.arc(mx,my,mr,0,7);c.fill();c.fillStyle='rgba(60,64,90,.35)';for(const[dx,dy,r]of[[-14,8,10],[18,-12,7],[8,22,6]]){c.beginPath();c.arc(mx+dx,my+dy,r,0,7);c.fill()}}}}
/* ---------- เกาะอุกกาบาต ---------- */
function q9Isle_(c,I,i){const R=gxRng(9200+i),N=30;
  /* ใต้เกาะ: หินหนาย้อยลง (ให้รู้ว่าลอยอยู่) */c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(I.x+20,I.y+I.ry*.55+40,I.rx*.9,I.ry*.7,0,0,7);c.fill();
  c.fillStyle='#231a33';c.beginPath();c.moveTo(I.x-I.rx,I.y);for(let k=0;k<=12;k++){const t=k/12,x=I.x-I.rx+t*I.rx*2,d=Math.sin(t*Math.PI)*(I.ry*.9+R()*60)+20;c.lineTo(x,I.y+d)}c.lineTo(I.x+I.rx,I.y);c.closePath();c.fill();
  c.fillStyle='#352848';c.beginPath();c.moveTo(I.x-I.rx*.95,I.y+10);for(let k=0;k<=10;k++){const t=k/10,x=I.x-I.rx*.95+t*I.rx*1.9,d=Math.sin(t*Math.PI)*(I.ry*.55+R()*30)+16;c.lineTo(x,I.y+d)}c.lineTo(I.x+I.rx*.95,I.y+10);c.closePath();c.fill();
  /* ผลึกห้อยใต้เกาะ */for(let k=0;k<4;k++){const x=I.x+(R()-.5)*I.rx*1.2,y=I.y+I.ry*.5+R()*I.ry*.3;c.fillStyle='rgba(140,220,255,.55)';c.beginPath();c.moveTo(x-6,y);c.lineTo(x,y+26+R()*20);c.lineTo(x+6,y);c.closePath();c.fill()}
  /* ขอบหิน */const P=[];for(let k=0;k<N;k++){const a=k/N*6.283+R()*.08,rr=.93+R()*.12;P.push([I.x+Math.cos(a)*I.rx*rr,I.y+Math.sin(a)*I.ry*rr,20+R()*26])}
  c.fillStyle='#4a3e62';for(const[x,y,r]of P){c.beginPath();c.ellipse(x+3,y+10,r,r*.6,0,0,7);c.fill()}
  /* ผิวหน้าเกาะ (ฝุ่นดาวม่วงอ่อน) */const gr=c.createRadialGradient(I.x-I.rx*.3,I.y-I.ry*.35,10,I.x,I.y,Math.max(I.rx,I.ry)*1.1);gr.addColorStop(0,'#b8acd8');gr.addColorStop(.55,'#8a7cb0');gr.addColorStop(1,'#5e5084');c.fillStyle=gr;
  c.beginPath();c.ellipse(I.x,I.y,I.rx*.97,I.ry*.97,0,0,7);c.fill();for(const[x,y,r]of P){c.beginPath();c.ellipse(x,y,r,r*.58,0,0,7);c.fill()}
  /* ขอบสะท้อนแสงเนบิวลา (ฟ้าด้านบน · ชมพูด้านล่าง) */c.lineWidth=2.6;for(const[x,y,r]of P){c.strokeStyle=y<I.y?'rgba(170,230,255,.75)':'rgba(255,150,220,.4)';c.beginPath();c.ellipse(x,y,r,r*.58,0,y<I.y?3.5:.4,y<I.y?5.9:2.7);c.stroke()}
  c.save();c.beginPath();c.ellipse(I.x,I.y,I.rx,I.ry,0,0,7);c.clip();
  /* หลุมอุกกาบาต */for(let k=0;k<7;k++){const x=I.x+(R()-.5)*I.rx*1.4,y=I.y+(R()-.5)*I.ry*1.3,r=10+R()*26;c.fillStyle='rgba(60,46,96,.45)';c.beginPath();c.ellipse(x,y,r,r*.62,0,0,7);c.fill();c.strokeStyle='rgba(220,210,255,.4)';c.lineWidth=2;c.beginPath();c.ellipse(x,y+2,r,r*.62,0,.3,2.8);c.stroke()}
  /* ลายผิวฝุ่นดาว (ด่างอ่อน/เข้ม ให้พื้นมีมิติ) */{const R2=gxRng(9260+i);for(let k=0;k<26;k++){const x=I.x+(R2()-.5)*I.rx*1.8,y=I.y+(R2()-.5)*I.ry*1.8,r=40+R2()*90,lt=R2()<.5,cl=lt?'214,204,248':'60,46,104',al=lt?.28:.24,gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+cl+','+al+')');gr.addColorStop(1,'rgba('+cl+',0)');c.fillStyle=gr;c.beginPath();c.ellipse(x,y,r,r*.62,0,0,7);c.fill()}
   /* รอยแตกเรืองแสงดาว */c.lineCap='round';c.lineJoin='round';for(let k=0;k<3;k++){let x=I.x+(R2()-.5)*I.rx*1.2,y=I.y+(R2()-.5)*I.ry*1.1,a=R2()*6.283;const P2=[[x,y]];for(let q=0;q<7;q++){a+=(R2()-.5)*.9;const L=12+R2()*16;x+=Math.cos(a)*L;y+=Math.sin(a)*L*.62;P2.push([x,y])}
     for(const[lw,st]of[[6,'rgba(120,190,255,.12)'],[2.4,'rgba(150,210,255,.22)'],[1,'rgba(225,242,255,.45)']]){c.strokeStyle=st;c.lineWidth=lw;c.beginPath();P2.forEach(([px,py],q)=>q?c.lineTo(px,py):c.moveTo(px,py));c.stroke()}}
   /* ก้อนหินเล็ก */for(let k=0;k<20;k++){const x=I.x+(R2()-.5)*I.rx*1.6,y=I.y+(R2()-.5)*I.ry*1.5,r=3+R2()*6;c.fillStyle='rgba(40,30,70,.35)';c.beginPath();c.ellipse(x+1.5,y+r*.5,r,r*.5,0,0,7);c.fill();c.fillStyle='#6e5e98';c.beginPath();c.ellipse(x,y,r,r*.7,0,0,7);c.fill();c.fillStyle='rgba(230,224,255,.55)';c.beginPath();c.ellipse(x-r*.25,y-r*.25,r*.45,r*.25,0,0,7);c.fill()}
   /* เงาขอบใน (ให้ผิวนูนขึ้นจากขอบ) */c.strokeStyle='rgba(40,26,76,.22)';c.lineWidth=60;c.beginPath();c.ellipse(I.x,I.y,I.rx*1.01,I.ry*1.01,0,0,7);c.stroke()}
  /* ประกายฝุ่นดาว */for(let k=0;k<70;k++){const x=I.x+(R()-.5)*I.rx*1.9,y=I.y+(R()-.5)*I.ry*1.9;c.fillStyle=R()<.6?'rgba(255,255,255,.55)':'rgba(180,220,255,.6)';c.fillRect(x,y,1.6,1.6)}
  /* ราวทองเหลืองของโอเรียน (เกาะซากเครื่องจักร) */if(i===3){c.strokeStyle='rgba(200,150,70,.7)';c.lineWidth=4;for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(I.x-I.rx,I.y+k*60);c.lineTo(I.x+I.rx,I.y+k*60+30);c.stroke()}c.fillStyle='#c89a4a';for(let k=-3;k<=3;k++){c.beginPath();c.arc(I.x+k*90,I.y+k*15,7,0,7);c.fill()}}
  c.restore()}
function q9Bridge_(c,b){const[x0,y0,x1,y1,hw]=b,L=Math.hypot(x1-x0,y1-y0),a=Math.atan2(y1-y0,x1-x0);c.save();c.translate(x0,y0);c.rotate(a);
  c.fillStyle='rgba(0,0,0,.3)';c.fillRect(0,-hw+20,L,hw*2);const gr=c.createLinearGradient(0,-hw,0,hw);gr.addColorStop(0,'rgba(120,200,255,.55)');gr.addColorStop(.5,'rgba(190,235,255,.35)');gr.addColorStop(1,'rgba(120,200,255,.55)');c.fillStyle=gr;c.fillRect(0,-hw,L,hw*2);
  c.strokeStyle='rgba(220,245,255,.5)';c.lineWidth=1;for(let x=0;x<L;x+=28){c.beginPath();c.moveTo(x,-hw);c.lineTo(x+14,hw);c.stroke()}
  c.strokeStyle='#bff0ff';c.lineWidth=3;for(const s of[-1,1]){c.beginPath();c.moveTo(0,s*hw);c.lineTo(L,s*hw);c.stroke()}c.restore()}
function q9Paint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1;q9Space(c,ox,oy,S);
  Q9B.forEach(b=>{if(inB(Math.min(b[0],b[2])-60,Math.min(b[1],b[3])-60,Math.max(b[0],b[2])+60,Math.max(b[1],b[3])+60))q9Bridge_(c,b)});
  Q9I.forEach((I,i)=>{if(inB(I.x-I.rx-60,I.y-I.ry-60,I.x+I.rx+60,I.y+I.ry*1.8+60))q9Isle_(c,I,i)})}
/* ---------- ของประกอบฉาก ---------- */
function q9Build(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(9400);
  /* ผลึกดาว */for(let i=0,n=0;i<1200&&n<40;i++){const k=(R()*7)|0,I=Q9I[k],a=R()*6.283,rr=Math.sqrt(R())*.82,x=I.x+Math.cos(a)*I.rx*rr,y=I.y+Math.sin(a)*I.ry*rr;
    if(!q9InI(I,x,y,40)||Math.hypot(x-M.sx,y-M.sy)<170||q9Wind(x,y,-30)>=0||q9OnB(x,y,-30)||M.nests.some(([nx,ny])=>Math.hypot(x-nx,y-ny)<110)||Q9SH.some((p,j)=>{const[lx,ly]=q9Shard(j);return Math.hypot(x-lx,y-ly)<90})||Math.hypot(x-1850,y-1470)<110)continue;
    trees.push({x,y,r:k===1?12:10,k:'q9cr',v:(R()*3)|0,sc:.6+R()*.6,ht:50,hw:24});n++}
  /* เฟืองทองเหลืองของโอเรียน (ลอยหมุน) */[[1740,1380,0,1.3],[2080,1600,1,1],[2150,1380,2,.8],[1640,1620,1,.7]].forEach(([x,y,v,s])=>trees.push({x,y,r:24*s,k:'q9gear',v,sc:s,ht:130*s,hw:70*s}));
  /* โคมดาว */[[0,200,-150],[0,230,120],[1,-160,-40],[3,-250,-90],[3,250,110],[5,140,-60],[6,-170,60],[2,140,-70],[4,-150,-50]].forEach(([k,a,b],i)=>{const I=Q9I[k];trees.push({x:I.x+a,y:I.y+b,r:0,k:'q9lamp',ht:90,ns:1,nc:1,v:i})});
  /* ปลายบันไดแสง (ลานขึ้นบก) · กล้องส่องดาวพัง · ยอดหอทอดาว (ไกลทางเหนือ ในความว่าง) */
  trees.push({x:300,y:2740,r:0,k:'q9lad',ht:260,ns:1,nc:1});trees.push({x:2650,y:620,r:18,k:'q9tel',ht:110,hw:50});trees.push({x:2950,y:200,r:0,k:'q9spire',ht:900,ns:1,nc:1});
  trees.push({x:720,y:2556,r:0,k:'q9cel',ht:70,ns:1,nc:1});
  Q9N.st=[];for(let i=0;i<90;i++)Q9N.st.push([100+R()*3000,100+R()*3000,R()*6,R()]);
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc)return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
Object.assign(PALK,{
 q9cr(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,C=[['150,230,255','#bfeaff','#5aa8d8'],['220,170,255','#e8d0ff','#9a6ad8'],['255,200,240','#ffd8f0','#d878b8']][v],pu=.6+.4*Math.sin(T*1.6+x*.01);PALSH(x,y+3,20*s,6*s,.35);
  for(const[dx,h,w,r]of[[-9,30,8,-.3],[0,44,10,0],[10,26,7,.35],[-4,18,6,-.6]]){g.save();g.translate(x+dx*s,y);g.rotate(r);g.fillStyle=C[2];g.beginPath();g.moveTo(-w*s,0);g.lineTo(-w*.6*s,-h*s);g.lineTo(0,-(h+10)*s);g.lineTo(w*.6*s,-h*s);g.lineTo(w*s,0);g.closePath();g.fill();
    g.fillStyle=C[1];g.beginPath();g.moveTo(-w*.6*s,-h*s);g.lineTo(0,-(h+10)*s);g.lineTo(0,0);g.lineTo(-w*s,0);g.closePath();g.fill();g.restore()}
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-24*s,40*s,C[0],.35*pu);g.restore()}},
 q9gear(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,a=T*(v%2?.25:-.18),fl=Math.sin(T*.8+v)*6*s,cy=y-70*s+fl;g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(x,y+4,46*s,12*s,0,0,7);g.fill();
  g.save();g.translate(x,cy);g.rotate(a);g.fillStyle='#8a6a32';g.beginPath();for(let k=0;k<12;k++){const q=k/12*6.283;g.lineTo(Math.cos(q-.12)*58*s,Math.sin(q-.12)*58*s);g.lineTo(Math.cos(q-.08)*70*s,Math.sin(q-.08)*70*s);g.lineTo(Math.cos(q+.08)*70*s,Math.sin(q+.08)*70*s);g.lineTo(Math.cos(q+.12)*58*s,Math.sin(q+.12)*58*s)}g.closePath();g.fill();
  g.fillStyle='#c89a4a';g.beginPath();g.arc(0,0,54*s,0,7);g.fill();g.fillStyle='#8a6a32';for(let k=0;k<5;k++){const q=k/5*6.283;g.beginPath();g.arc(Math.cos(q)*32*s,Math.sin(q)*32*s,11*s,0,7);g.fill()}g.fillStyle='#5a4220';g.beginPath();g.arc(0,0,14*s,0,7);g.fill();
  g.strokeStyle='rgba(255,230,170,.6)';g.lineWidth=2*s;g.beginPath();g.arc(0,0,50*s,3.6,5.4);g.stroke();g.restore();
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,cy,22*s,'150,200,255',.35+.15*Math.sin(T*2+v));g.restore()}},
 q9lamp(t,T){const x=t.x,y=t.y,f=.7+.3*Math.sin(T*2.4+t.v);g.strokeStyle='#6a5228';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-60);g.stroke();g.fillStyle='#c89a4a';g.fillRect(x-9,y-80,18,4);g.fillRect(x-9,y-62,18,4);
  g.fillStyle='rgba(200,230,255,.3)';g.fillRect(x-7,y-76,14,14);g.save();g.translate(x,y-69);g.rotate(T*.8+t.v);g.fillStyle='#fff6d8';g.beginPath();for(let k=0;k<5;k++){const a=k/5*6.283-1.57,a2=a+.63;g.lineTo(Math.cos(a)*6,Math.sin(a)*6);g.lineTo(Math.cos(a2)*2.6,Math.sin(a2)*2.6)}g.closePath();g.fill();g.restore();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-69,34*f,'200,220,255',.5);g.restore()},
 q9lad(t,T){const x=t.x,y=t.y;g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(x-50,0,x+50,0);gr.addColorStop(0,'rgba(180,220,255,0)');gr.addColorStop(.5,'rgba(220,240,255,'+(.4+.1*Math.sin(T*2))+')');gr.addColorStop(1,'rgba(180,220,255,0)');g.fillStyle=gr;g.fillRect(x-50,y-20,100,400);
  for(let k=0;k<10;k++){const q=(T*.4+k/10)%1;g.fillStyle='rgba(240,250,255,'+(.8*(1-q))+')';g.fillRect(x-40+((k*37)%80),y+380-q*400,2,6)}g.restore();
  g.strokeStyle='rgba(220,240,255,.6)';g.lineWidth=2;for(let k=0;k<7;k++){g.beginPath();g.moveTo(x-36,y+k*40);g.lineTo(x+36,y+k*40);g.stroke()}phLbl('บันไดดาว ↓ หอดูดาวโอเรียน',x,y-30,'#cfe8ff')},
 q9tel(t,T){const x=t.x,y=t.y;PALSH(x,y+4,34,9,.4);g.fillStyle='#5a4a3a';for(const d of[-18,0,18]){g.save();g.translate(x+d*.4,y);g.rotate(d*.03);g.fillRect(-2,-40,4,40);g.restore()}
  g.save();g.translate(x,y-42);g.rotate(-.7);g.fillStyle='#c89a4a';g.fillRect(-10,-50,20,90);g.fillStyle='#8a6a32';g.fillRect(-12,-56,24,10);g.fillStyle='#3a4a6a';g.beginPath();g.ellipse(0,-56,10,4,0,0,7);g.fill();g.restore();g.strokeStyle='#6a5228';g.lineWidth=2;g.beginPath();g.moveTo(x-30,y-6);g.lineTo(x+26,y-22);g.stroke()},
 q9spire(t,T){const x=t.x,y=t.y;g.save();g.globalAlpha=.85;g.fillStyle='#2a2440';g.beginPath();g.moveTo(x-50,y+80);g.lineTo(x-14,y-420);g.lineTo(x,y-470);g.lineTo(x+14,y-420);g.lineTo(x+50,y+80);g.closePath();g.fill();
  g.strokeStyle='rgba(200,150,70,.7)';g.lineWidth=2;for(let k=0;k<8;k++){const yy=y+40-k*60,w=46-k*4.5;g.beginPath();g.moveTo(x-w,yy);g.lineTo(x+w,yy);g.stroke()}
  g.globalCompositeOperation='lighter';const pu=.6+.4*Math.sin(T*1.3);const gr=g.createLinearGradient(x-16,0,x+16,0);gr.addColorStop(0,'rgba(220,180,255,0)');gr.addColorStop(.5,'rgba(240,220,255,'+(.55*pu)+')');gr.addColorStop(1,'rgba(220,180,255,0)');g.fillStyle=gr;g.fillRect(x-16,y-1400,32,940);
  glowAt(x,y-470,60,'230,200,255',.6*pu);for(let k=0;k<8;k++){const a=T*.5+k*.785;g.strokeStyle='rgba(220,200,255,.18)';g.lineWidth=1;g.beginPath();g.moveTo(x,y-470);g.quadraticCurveTo(x+Math.cos(a)*200,y-700,x+Math.cos(a)*420,y-1100);g.stroke()}g.restore()},
 q9cel(t,T){const N=MAPS[40]&&MAPS[40].npc2;if(!N||N.x<0)return;try{celD(N.x,N.y,T,1)}catch(e){}}});
/* ---------- เอฟเฟกต์บนพื้น: สายธารดาว · เศษดาว · ดาวกระพริบ · วงเตือนดาวตก ---------- */
function q9GroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();
  for(let i=0;i<Q9W.length;i++){const w=Q9W[i],[x0,y0,x1,y1,hw]=w,L=Math.hypot(x1-x0,y1-y0),a=Math.atan2(y1-y0,x1-x0);if(!palVis((x0+x1)/2,(y0+y1)/2,L/2+60))continue;
    g.save();g.translate(x0,y0);g.rotate(a);const gr=g.createLinearGradient(0,-hw,0,hw);gr.addColorStop(0,'rgba(255,210,140,0)');gr.addColorStop(.5,'rgba(255,220,160,'+(Q9S.w===i?.32:.18)+')');gr.addColorStop(1,'rgba(255,210,140,0)');g.fillStyle=gr;g.fillRect(0,-hw,L,hw*2);
    g.globalCompositeOperation='lighter';const n=Q?Math.ceil(L/40):Math.ceil(L/18);for(let k=0;k<n;k++){const R=depRng(k*13+i*101),u=((T*(.25+R()*.2)+R())%1),x=u*L,yy=(R()-.5)*hw*1.6+Math.sin(T*2+k)*4,al=Math.sin(u*Math.PI);g.fillStyle='rgba(255,'+(220+((R()*35)|0))+',170,'+(al*.9)+')';g.fillRect(x,yy,2+R()*2,2+R()*2)}
    g.strokeStyle='rgba(255,240,200,.7)';g.lineWidth=2.4;g.lineCap='round';for(let k=0;k<Math.ceil(L/120);k++){const u=((T*.5+k/Math.ceil(L/120))%1),x=u*L;g.globalAlpha=Math.sin(u*Math.PI)*.8;g.beginPath();g.moveTo(x-10,-12);g.lineTo(x,0);g.lineTo(x-10,12);g.stroke()}
    g.globalAlpha=1;g.restore();if(palVis(x0,y0,60)){g.font='13px system-ui';g.textAlign='center';g.fillText('🌠',x0,y0-hw-6)}}
  /* เศษดาว (ขั้นเก็บ) */{const st=stCur(),q=me.sty;if(st&&st.p9sf&&q&&q.a===1)for(let i=0;i<5;i++){if((q.p9sf|0)>>i&1)continue;const[x,y]=q9Shard(i);if(!palVis(x,y,60))continue;const pu=.5+.5*Math.sin(T*(2+i*.4)),fl=Math.sin(T*1.6+i)*4;
    g.save();g.globalCompositeOperation='lighter';glowAt(x,y-20+fl,44,'200,220,255',.35*pu+.1);g.restore();g.save();g.translate(x,y-22+fl);g.rotate(T*.6);g.fillStyle='rgba(255,255,255,'+(.6+.4*pu)+')';g.beginPath();for(let k=0;k<4;k++){const a=k*1.571;g.lineTo(Math.cos(a)*12,Math.sin(a)*12);g.lineTo(Math.cos(a+.785)*4,Math.sin(a+.785)*4)}g.closePath();g.fill();g.restore();
    g.strokeStyle='rgba(200,225,255,'+(.4+.4*pu)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+2,30,11,0,0,7);g.stroke();
    if(Q9S.lp===i){const p=Math.min(1,Q9S.lt/1);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-50,11,0,7);g.stroke();g.strokeStyle='#bfe0ff';g.lineWidth=3.4;g.beginPath();g.arc(x,y-50,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}}}
  /* วงเตือนดาวตก */for(const w of Q9S.warn){const k=1-w.t/w.d;g.strokeStyle='rgba(255,170,90,'+(.4+.5*k)+')';g.lineWidth=2.4;g.beginPath();g.ellipse(w.x,w.y,52,21,0,0,7);g.stroke();g.fillStyle='rgba(255,140,60,'+(.1+.25*k)+')';g.beginPath();g.ellipse(w.x,w.y,52*k,21*k,0,0,7);g.fill()}
  /* ดาวกระพริบบนเกาะ */g.globalCompositeOperation='lighter';for(const[x,y,ph,s]of Q9N.st){if(!palVis(x,y,10))continue;const q=Math.sin(T*(1+s)+ph);if(q<.7)continue;glowAt(x,y,5,'200,220,255',(q-.7)*2.5)}
  g.restore()}
/* ดาวตก (วาดทับตัวละคร) */
function q9MetDraw(){if(curMap!==40)return;const now=performance.now();if(!Q9S.met.length)return;g.save();Q9S.met=Q9S.met.filter(b=>now-b.t0<700);
  for(const b of Q9S.met){const k=(now-b.t0)/700;g.globalCompositeOperation='lighter';if(k<.35){const q=k/.35,sx=b.x+300*(1-q),sy=b.y-520*(1-q);const gr=g.createLinearGradient(sx,sy,sx+120,sy-200);gr.addColorStop(0,'rgba(255,240,200,1)');gr.addColorStop(1,'rgba(255,140,60,0)');g.strokeStyle=gr;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+120,sy-200);g.stroke();glowAt(sx,sy,24,'255,230,180',.9)}
    else{const q=(k-.35)/.65;glowAt(b.x,b.y,110*(1-q*.4),'255,170,90',.7*(1-q));g.globalCompositeOperation='source-over';g.fillStyle='rgba(70,50,90,'+(.5*(1-q))+')';g.beginPath();g.ellipse(b.x,b.y+4,50,18,0,0,7);g.fill()}}g.restore()}
/* ทับจอ: ดาวหาง · เกล็ดดาวลอย · ป้ายสายธาร */
function q9Screen(T,z,Hs){const Q=LOWQ;g.save();
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.32,SW0/2,Hs/2,Math.max(SW0,Hs)*.8);vg.addColorStop(0,'rgba(10,6,30,0)');vg.addColorStop(1,'rgba(10,6,30,.4)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  g.globalCompositeOperation='lighter';/* ดาวหางพาดจอ */{const per=26,k=(T%per)/per;if(k<.22){const q=k/.22,x=SW0*1.1-q*SW0*1.4,y=Hs*.08+q*Hs*.3,a=Math.sin(q*Math.PI);const gr=g.createLinearGradient(x,y,x+180,y-60);gr.addColorStop(0,'rgba(220,240,255,'+a+')');gr.addColorStop(1,'rgba(150,180,255,0)');g.strokeStyle=gr;g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x+180,y-60);g.stroke();glowAt(x,y,10,'230,245,255',a)}}
  /* เกล็ดดาวลอยช้า ๆ */const n=Q?14:34;for(let i=0;i<n;i++){const R=depRng(i*29+7),x=((R()*SW0+T*(6+R()*8))%(SW0+20))-10,y=((R()*Hs-T*(4+R()*6))%(Hs+20)+Hs+20)%(Hs+20)-10,tw=.4+.6*Math.abs(Math.sin(T*(1+R())+i));g.fillStyle='rgba(220,230,255,'+(.4*tw)+')';g.fillRect(x,y,1.5,1.5)}
  g.globalCompositeOperation='source-over';if(Q9S.fl>0){g.fillStyle='rgba(255,200,150,'+Math.min(.3,Q9S.fl)+')';g.fillRect(0,0,SW0,Hs)}
  if(Q9S.w>=0&&!SD.on){const t='🌠 สายธารดาวพาลอยข้ามห้วงว่าง…';g.font='bold 12px system-ui';g.textAlign='center';const w=g.measureText(t).width+20,cx=SW0/2,cy=Hs*.2;g.fillStyle='rgba(20,14,40,.8)';g.beginPath();g.roundRect(cx-w/2,cy-14,w,26,13);g.fill();g.fillStyle='#ffe8c8';g.fillText(t,cx,cy+4)}
  g.restore()}
/* ---------- ติ๊ก ---------- */
function q9Tick(dt,now,x,y,mv){
  const wi=me.down>0?-1:q9Wind(x,y,0);if(wi>=0){const w=Q9W[wi],L=Math.hypot(w[2]-w[0],w[3]-w[1]),ux=(w[2]-w[0])/L,uy=(w[3]-w[1])/L,[t]=q9SegT(x,y,w);me.x+=ux*Q9SP*dt;me.y+=uy*Q9SP*dt;const cx=w[0]+(w[2]-w[0])*t,cy=w[1]+(w[3]-w[1])*t;me.x+=(cx-me.x)*Math.min(1,dt*3);me.y+=(cy-me.y)*Math.min(1,dt*3);
    if(Q9S.w!==wi){Q9S.w=wi;try{sfx('dash')}catch(e){}}x=me.x;y=me.y}else if(Q9S.w>=0)Q9S.w=-1;
  if(q9In(x,y,-4)){Q9S.lx=x;Q9S.ly=y}else if(!q9In(x,y,-30)&&me.down<=0){me.x=Q9S.lx;me.y=Q9S.ly;x=me.x;y=me.y}
  /* ฝนดาวตก */Q9S.fl=Math.max(0,Q9S.fl-dt*1.6);
  for(const w of Q9S.warn){w.t-=dt;if(w.t<=0&&!w.hit){w.hit=1;Q9S.met.push({x:w.x,y:w.y,t0:performance.now()});setTimeout(()=>{Q9S.fl=.35;try{shk=Math.max(shk,.25)}catch(e){}try{sfx('boom')}catch(e){}
        if(curMap===40&&Math.hypot(me.x-w.x,(me.y-w.y)*2.4)<54&&me.down<=0&&!gmGod&&!(me.inv3>0)){const d=Math.round(me.mh*.08);me.hp=Math.max(1,me.hp-d);Q9S.hk=(Q9S.hk|0)+1;Q9S.hd=d;try{mtCd=3}catch(e){}try{dn.push({x:me.x,y:me.y-60,v:'☄️ ดาวตก!',t:1.2,col:'#ffc890'})}catch(e){}}},240)}}
  Q9S.warn=Q9S.warn.filter(w=>!w.hit);
  if(!SD.on&&me.down<=0&&!q9Safe(x,y)){Q9S.mt-=dt;if(Q9S.mt<=0){Q9S.mt=5+Math.random()*3.5;for(let k=0;k<6;k++){const a=Math.random()*6.283,r=Math.random()<.4?0:60+Math.random()*240,bx=x+Math.cos(a)*r,by=y+Math.sin(a)*r*.7;if(q9In(bx,by,10,1)&&!q9Safe(bx,by)){Q9S.warn.push({x:bx,y:by,t:1.2,d:1.2});break}}}}
  /* เศษดาว */const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p9sf){Q9S.lp=-1;Q9S.lt=0;return}
  let near=-1;for(let i=0;i<5;i++){if((q.p9sf|0)>>i&1)continue;const[lx,ly]=q9Shard(i);if(Math.hypot(x-lx,y-ly)<60)near=i}
  if(near!==Q9S.lp){Q9S.lp=near;Q9S.lt=0}
  if(near>=0&&me.down<=0){Q9S.lt+=dt;if(Q9S.lt>=1){q.p9sf=(q.p9sf|0)|(1<<near);let n=0;for(let k=0;k<5;k++)if(q.p9sf>>k&1)n++;q.n=n;Q9S.lp=-1;Q9S.lt=0;
      PALG.card={h:Q9LORE[near][0]+' · '+n+'/5',t:Q9LORE[near][1],s:now,d:10};try{sfx('quest')}catch(e){}const[lx,ly]=q9Shard(near);try{burst(lx,ly-20,['#ffffff','#bfe0ff','#e8d0ff'],34,160,1,{glow:1,g:-40})}catch(e){}try{stHud();writeSave()}catch(e){}}}}
function q9AqT(st){if(!me.sty||!st.p9sf)return null;let b=null,bd=1e9;for(let i=0;i<5;i++){if((me.sty.p9sf|0)>>i&1)continue;const[x,y]=q9Shard(i),d=curMap===40?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b=i}}if(b==null)return null;
  const[lx,ly]=q9Shard(b),isl=Q9SH[b][0],here=curMap===40?q9Isle(me.x,me.y,0):0,lb='ตามหาเศษดาวกระพริบ ('+((me.sty.p9sf|0).toString(2).split('1').length-1)+'/5)';
  if(curMap===40&&Q9S.w>=0)return{mp:40,act:'reach',x:me.x,y:me.y,lb:'🌠 ปล่อยให้สายธารพาไป'};
  const wIn=w=>{const L=Math.hypot(w[2]-w[0],w[3]-w[1]);return[w[0]+(w[2]-w[0])/L*25,w[1]+(w[3]-w[1])/L*25]};
  if(curMap===40&&(here===4||here===6)&&here!==isl){const[wx,wy]=wIn(Q9W[here===4?1:3]);return{mp:40,act:'reach',x:wx,y:wy,lb:'🌠 ขึ้นสายธารกลับ'}}
  if((isl===4||isl===6)&&here!==isl){if(isl===6&&here!==5&&curMap===40){const I=Q9I[5];return{mp:40,act:'reach',x:I.x,y:I.y+60,lb:'ไปเกาะเหนือ (ต้นธารไปเกาะขอบฟ้า)'}}const[wx,wy]=wIn(Q9W[isl===4?0:2]);return{mp:40,act:'reach',x:wx,y:wy,lb:'🌠 ไปขึ้นสายธาร → '+(isl===4?'เกาะดาวตก':'เกาะขอบฟ้า')}}
  return{mp:40,act:'reach',x:lx,y:ly+30,lb}}
/* ---------- มอนธีม 42 ---------- */
MV1D[420]=(r,T,W,bob)=>{/* อุกกาบาตเดินได้: ก้อนหินม่วงดำ รอยแตกเรืองส้ม ขาหินสั้น ตาลาวา */const b=Math.sin(T*3)*r*.04,sw=Math.sin(T*4)*r*.1,pu=.6+.4*Math.sin(T*3);
  for(const s of[-1,1])vS(W,[[s*r*.3-r*.12,r*.3],[s*r*.3+r*.12,r*.3],[s*r*.34+r*.12+s*sw*.3,r*.66],[s*r*.34-r*.14+s*sw*.3,r*.66]],'#3a2e44',1,1);
  vS(W,[[-r*.62,r*.2+b],['q',-r*.78,-r*.3+b,-r*.4,-r*.6+b],['q',-r*.05,-r*.82+b,r*.36,-r*.62+b],['q',r*.76,-r*.36+b,r*.66,r*.12+b],['q',r*.44,r*.44+b,0,r*.42+b],['q',-r*.42,r*.44+b,-r*.62,r*.2+b]],'#4a3a5e',1,1.4);
  vD(W,[[-r*.4,-r*.4+b],['q',-r*.1,-r*.66+b,r*.24,-r*.52+b],['q',-r*.05,-r*.48+b,-r*.4,-r*.4+b]],'rgba(200,190,240,.3)');
  if(!W){g.strokeStyle='rgba(255,'+(140+(pu*60|0))+',60,.95)';g.lineWidth=r*.05;g.lineCap='round';for(const P of[[[-r*.3,-r*.2],[-r*.1,0],[-r*.18,r*.22]],[[r*.2,-r*.4],[r*.3,-r*.1],[r*.12,r*.1]],[[-r*.5,0],[-r*.36,r*.1]]]){g.beginPath();g.moveTo(P[0][0],P[0][1]+b);for(const p of P.slice(1))g.lineTo(p[0],p[1]+b);g.stroke()}vGlow(W,0,0,r*.8,'255,150,60',.22*pu)}
  for(const dx of[-r*.18,r*.18])vEye(W,dx,-r*.22+b,r*.07,r*.05,'#ffb040',W?0:6);return true};
MV1D[421]=(r,T,W,bob)=>{/* แมงกะพรุนเนบิวลา: ร่มโปร่งไล่ม่วง-ชมพู มีดาวในตัว หนวดยาวเรืองฟ้า */const b=Math.sin(T*1.8)*r*.12-r*.2,pu=.6+.4*Math.sin(T*2.2);
  if(!W){g.lineCap='round';for(let k=0;k<6;k++){const x0=-r*.45+k*r*.18;g.strokeStyle='rgba(150,200,255,.5)';g.lineWidth=r*.035;g.beginPath();g.moveTo(x0,r*.1+b);g.quadraticCurveTo(x0+Math.sin(T*2.6+k)*r*.24,r*.5+b,x0+Math.sin(T*2+k*1.4)*r*.3,r*.95+b);g.stroke()}}
  vS(W,[[-r*.62,r*.12+b],['q',-r*.66,-r*.64+b,0,-r*.68+b],['q',r*.66,-r*.64+b,r*.62,r*.12+b],['q',r*.32,r*.02+b,0,r*.14+b],['q',-r*.32,r*.02+b,-r*.62,r*.12+b]],'rgba(170,110,230,.72)',1,1);
  if(!W){const gr=g.createRadialGradient(0,-r*.3+b,2,0,-r*.2+b,r*.6);gr.addColorStop(0,'rgba(255,170,230,.6)');gr.addColorStop(1,'rgba(120,80,220,0)');g.fillStyle=gr;g.beginPath();g.ellipse(0,-r*.25+b,r*.55,r*.38,0,0,7);g.fill();
    for(const[dx,dy,s]of[[-r*.25,-r*.35,1],[r*.1,-r*.45,.7],[r*.28,-r*.22,1.1],[-r*.05,-r*.15,.6]]){g.fillStyle='rgba(255,255,255,'+(.6+.4*Math.sin(T*3+dx))+')';g.beginPath();g.arc(dx,dy+b,r*.03*s,0,7);g.fill()}}
  vD(W,[[-r*.4,-r*.3+b],['q',-r*.3,-r*.6+b,0,-r*.6+b],['q',-r*.24,-r*.5+b,-r*.4,-r*.3+b]],'rgba(255,255,255,.3)');vGlow(W,0,-r*.2+b,r*.8,'200,140,255',.28*pu);return true};
MV1D[422]=(r,T,W,bob)=>{/* หุ่นเย็บดาว: หุ่นทองเหลืองตัวผอม หัวกลมตาเดียวฟ้า แขนเป็นเข็มยาว ลากด้ายเงิน */const b=Math.sin(T*3)*r*.03,sw=Math.sin(T*5)*r*.08;
  for(const s of[-1,1])vLimb(W,[s*r*.12,r*.2,s*r*.16+s*sw*.4,r*.45,s*r*.14,r*.66],'#8a6a32',r*.07,r*.06);
  vS(W,[[-r*.22,-r*.3+b],[r*.22,-r*.3+b],[r*.26,r*.22+b],[-r*.26,r*.22+b]],'#c89a4a',1,1.2);vS(W,[[-r*.12,-r*.2+b],[r*.12,-r*.2+b],[r*.1,r*.1+b],[-r*.1,r*.1+b]],'#6a5228',1,.8);
  if(!W){g.save();g.translate(0,-r*.05+b);g.rotate(T*2);g.strokeStyle='#e8c070';g.lineWidth=r*.025;for(let k=0;k<6;k++){g.rotate(1.047);g.beginPath();g.moveTo(0,0);g.lineTo(r*.08,0);g.stroke()}g.restore()}
  for(const s of[-1,1]){const a=s<0?-.9+Math.sin(T*4)*.3:.9-Math.sin(T*4+1)*.3;g.save();g.translate(s*r*.24,-r*.22+b);g.rotate(a);vS(W,[[-r*.03,0],[r*.03,0],[r*.01,r*.62],[-r*.01,r*.62]],'#d8dde8',1,.8);g.restore()}
  if(!W){g.strokeStyle='rgba(220,230,255,.7)';g.lineWidth=1;g.beginPath();g.moveTo(r*.3,r*.3+b);g.quadraticCurveTo(r*.5,r*.6+Math.sin(T*3)*r*.1,r*.2,r*.8);g.stroke()}
  bvE(W,0,-r*.5+b,r*.2,r*.2,'#a8803c',1,1);wE(W,0,-r*.5+b,r*.11,r*.11,'#0a1428');vEye(W,0,-r*.5+b,r*.07,r*.07,'#7ad8ff',W?0:8);vK(W,[[0,-r*.7+b],[0,-r*.84+b]],'#8a6a32',r*.03);if(!W){g.fillStyle='#ffe8a0';g.beginPath();g.arc(0,-r*.86+b,r*.04,0,7);g.fill()}return true};
MV1S[420]=1.4;MV1S[421]=1.15;MV1S[422]=1.35;
/* ---------- NPC: ลูมิน่า (เด็กดาว) ---------- */
function lumD(x,y,f,T){const fl=Math.sin(T*1.6)*3,pu=.6+.4*Math.sin(T*2);g.save();g.translate(x,y+fl-6);g.scale(f,1);
  g.save();g.globalCompositeOperation='lighter';glowAt(0,-20,46,'200,220,255',.45*pu);g.restore();g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(0,20-fl,12,4,0,0,7);g.fill();
  /* ชุดยาวโปร่ง มีดาวในเนื้อผ้า */const gr=g.createLinearGradient(0,-24,0,16);gr.addColorStop(0,'#e8f0ff');gr.addColorStop(1,'rgba(150,170,255,.35)');g.fillStyle=gr;g.beginPath();g.moveTo(-6,-22);g.lineTo(6,-22);g.quadraticCurveTo(12,0,14+Math.sin(T*2)*2,16);g.lineTo(-14+Math.sin(T*2+1)*2,16);g.quadraticCurveTo(-12,0,-6,-22);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.9)';for(const[dx,dy]of[[-5,-6],[4,2],[-2,10],[7,-12]]){g.fillRect(dx,dy,1.6,1.6)}
  /* หัว + ผมเรืองแสงลอยขึ้น */g.fillStyle='#f4f0ff';g.beginPath();g.arc(0,-30,7.4,0,7);g.fill();g.fillStyle='#c8d8ff';g.beginPath();g.moveTo(-8,-31);g.quadraticCurveTo(-10,-46-Math.sin(T*2)*2,0,-44);g.quadraticCurveTo(10,-46-Math.sin(T*2+1)*2,8,-31);g.quadraticCurveTo(0,-38,-8,-31);g.fill();
  g.fillStyle='#2a3a7a';g.beginPath();g.arc(-2.4,-30,1.3,0,7);g.arc(2.6,-30,1.3,0,7);g.fill();g.fillStyle='rgba(255,170,200,.5)';g.beginPath();g.arc(-4.6,-27.6,1.6,0,7);g.arc(4.6,-27.6,1.6,0,7);g.fill();
  /* ดาวเหนือหัว */g.save();g.translate(0,-54);g.rotate(T*.8);g.fillStyle='#fffbe0';g.beginPath();for(let k=0;k<5;k++){const a=k/5*6.283-1.57;g.lineTo(Math.cos(a)*5,Math.sin(a)*5);g.lineTo(Math.cos(a+.63)*2,Math.sin(a+.63)*2)}g.closePath();g.fill();g.restore();g.restore()}
/* ---------- เนื้อเรื่องภาค 9 บทที่ 1 ---------- */
Object.assign(SPK,{lum:['ลูมิน่า · เด็กดาว','⭐','#dfe8ff'],cel9:SPK.cel||['เซเลสต์ · นักดาราศาสตร์หลวงแห่งอัสตรา','🔭','#c8d8ff']});STNPC.lum=[40,'npc'];STNPC.cel9=[40,'npc2'];
STCH.push('ภาค 9 · บทที่ 1 · บันไดดาว');
{const C1=STCH.length-1;STY.push(
 {c:C1,g:'talk',k:'orr',p9s1:1,tx:'ภาค 9 เริ่มแล้ว · ไปยอดหอดูดาวโอเรียน (ผ่านนครลอยฟ้าอัสตรา) คุยกับออร์รี',
  pre:[['nar','หนึ่งฤดูหลังเรื่องที่ตาพายุ… ออร์รีส่งนกกระดาษทองเหลืองมาถึงเต็นท์ของเจ้าในคืนเดียวกันสามตัว ทุกตัวเขียนข้อความเดียวกัน: «ดาวดับ จากบนลงล่าง»'],
   ['orr','(หุ่นเฝ้าหอหมุนหัวเสียงดังแกรก) ผู้มาเยือน! กล้องใหญ่นับดาวทุกคืน คืนนี้ขาดไปสี่สิบเอ็ดดวง… ไม่ได้ดับเพราะความหิว ข้าคำนวณแล้ว พวกมันถูก «ดึง» ขึ้นไป'],
   ['cel','(เซเลสต์ลุกจากเลนส์กล้อง ขอบตาดำคล้ำ) ข้าเฝ้ามาเจ็ดคืน ดาวที่หายไปไม่ได้ตก มันลอยขึ้น… ขึ้นไปที่จุดเดียวกันหมด เหนือฟ้าชั้นสุดท้าย'],
   ['cel','คืนที่วาฬว่ายขึ้นไปท่ามกลางดวงดาว ข้าเห็นมันเลี้ยวหนีจุดนั้น เหมือนกลัวอะไรบางอย่าง',0,0,0,0,0,0,0,1],
   ['cel','ตั้งแต่ผนึกวาฬไว้ใต้ทะเลเมฆ กำแพงพายุก็หมุนเร็วขึ้นทุกครั้งที่มีดาวหาย… เหมือนวาฬข้างใต้รู้สึกได้',0,0,0,0,0,0,0,2],
   ['orr','ใต้หอดูดาวมีของที่ท่านโอเรียนสร้างไว้และไม่เคยบอกใคร… «บันไดดาว» บันไดแสงที่ทอดขึ้นไปถึงห้วงอวกาศ คืนนี้มันเปิดเอง'],
   ['cel','ข้าจะขึ้นไปด้วย ผู้ถือตรา… ถ้าท่านโอเรียนทิ้งอะไรไว้ข้างบนนั้นอีก ข้าอยากเป็นคนแรกที่เห็นมัน']],rw:{g:150000}},
 {c:C1,g:'map',m:40,tx:'ขึ้นบันไดดาวไปลานดาวลอย (ประตูแสงข้างออร์รี ยอดหอดูดาว)',
  post:[['nar','บันไดแสงพาขึ้นไปสูงจนเมฆทั้งโลกกลายเป็นพรมสีขาวใต้เท้า… แล้วอากาศก็หายไป เสียงก็หายไป เหลือแต่ความเงียบที่กว้างที่สุดที่เจ้าเคยรู้สึก'],
   ['nar','ห้วงอวกาศ… เนบิวลาสีม่วงชมพูม้วนตัวเหมือนควันเทียน ดาวเคราะห์มีวงแหวนลอยอยู่ไกล ๆ และเกาะหินนับสิบลอยนิ่งอยู่ในความว่าง เชื่อมกันด้วยสะพานแสง'],
   ['cel9','(เซเลสต์ก้าวขึ้นมาข้างหลัง หายใจได้ปกติ) มงกุฎดาว… ท่านโอเรียนถักเกราะอากาศรอบลานนี้ไว้ เราหายใจได้ เดินได้ แต่ถ้าตกจากเกาะ…'],
   ['nar','ไกลออกไปทางเหนือ มีหอคอยสีดำแหลมสูงทะลุเนบิวลา ปลายหอยิงลำแสงสีม่วงขึ้นไปในความมืด และมีเส้นด้ายเงินบาง ๆ นับพันเส้นลากจากดาวทุกดวงลงมาหามัน'],
   ['cel9','💡 สายธารดาว (ทางลูกศรสีทอง) พาลอยข้ามความว่างไปเกาะไกล · วงส้มใต้เท้า = ดาวตกกำลังจะลงตรงนั้น หลบด่วน (ลานบันไดปลอดภัย)']]},
 {c:C1,g:'clue',m:40,n:5,p9sf:1,tx:'ตามหาเศษดาวกระพริบ 5 ชิ้นบนเกาะลอย (ยืนข้างแสงฟ้า 1 วิ · เกาะไกลต้องขึ้นสายธารดาว 🌠)',
  pre:[['cel9','ดาวที่ถูกดึงขึ้นไป บางดวงแตกกระจายระหว่างทาง… เศษมันยังกระพริบอยู่บนเกาะพวกนี้ ถ้าฟังใกล้ ๆ ข้าว่ามันพูดได้'],['cel9','เกาะที่อยู่ไกลออกไปต้องขี่สายธารดาวไป ขากลับก็มีธารไหลย้อนกลับมา']],
  post:[['nar','เศษดาวชิ้นสุดท้ายสว่างวาบแล้วดับลงในมือ… ทุกเกาะสั่นสะเทือนพร้อมกัน หินที่นอนนิ่งลุกขึ้นยืน แมงกะพรุนแสงลอยออกมาจากเนบิวลา'],
   ['nar','และจากซากเครื่องจักรทองเหลือง หุ่นผอมสูงแขนเป็นเข็มเดินออกมาเป็นแถว ลากด้ายเงินตามหลัง… มันมาเก็บเศษดาวที่เจ้าปลุก'],['cel9','หุ่นเย็บดาว… ของท่านโอเรียน! ไล่มันไปก่อน!']],rw:{g:110000}},
 {c:C1,g:'kill',m:40,n:40,tx:'ขับไล่หุ่นเย็บดาว อุกกาบาตเดินได้ และแมงกะพรุนเนบิวลา',
  post:[['nar','หุ่นเย็บดาวตัวสุดท้ายล้มลง ด้ายเงินในมือมันขาดผึง… และปลายด้ายนั้นลอยไปทางใจกลางลาน ไปหาแสงดวงเล็ก ๆ ที่ส่องอยู่บนซากเครื่องจักร'],
   ['cel9','มีใครอยู่ตรงนั้น… ดูสิ เด็กคนหนึ่ง ตัวเรืองแสงเหมือนดาว']],rw:{g:100000}},
 {c:C1,g:'talk',k:'lum',p9c1:1,tx:'คุยกับเด็กเรืองแสงบนซากเครื่องจักรโอเรียน',
  pre:[['lum','(เด็กหญิงตัวโปร่งแสงลอยลงมาจากเฟืองยักษ์ ผมของเธอลอยขึ้นเหมือนเปลวไฟเย็น) …พวกเจ้ามองเห็นข้าด้วย? ไม่มีใครเห็นข้ามาสามร้อยปีแล้ว'],
   ['lum','ข้าชื่อลูมิน่า… ข้าเคยเป็นดาว ดวงเล็ก ๆ ข้างดาวเหนือ วันที่หุ่นพวกนั้นทอข้าลงไปในตาข่าย ข้าแตก ครึ่งหนึ่งติดอยู่ข้างบน ครึ่งหนึ่งเหลือเป็นแบบนี้'],
   ['cel9','ตาข่าย… ตาข่ายอะไร?'],
   ['lum','«ตาข่ายดาว» ของคนสวมมงกุฎ เขาบอกเครื่องจักรว่า ให้เก็บดาวทุกดวงไว้ให้ปลอดภัยจากความมืด แล้วเขาก็ไม่เคยกลับมาบอกให้หยุด… ผู้ทอบนยอดหอยังทอทุกคืน ดาวบนฟ้าเหลือน้อยลงทุกคืน'],
   ['me','(การกักตุนครั้งสุดท้ายของโอเรียน… ใหญ่กว่าเมืองไหน ๆ)'],
   ['lum','ถ้าพวกเจ้าจะไปยอดหอ ต้องผ่านวงแหวนเฟืองข้างหน้าก่อน… ข้าจะนำทางให้ ข้ารู้จักทุกเกาะ ข้านับมันมาสามร้อยปี'],
   ['cel9','(เซเลสต์มองไปที่หอสีดำไกลลิบ) ท่านโอเรียน… ท่านกลัวความมืดมากขนาดนี้เลยหรือ']],
  post:[['nar','🌌 — จบภาค 9 บทที่ 1 · บันไดดาว — บทต่อไป: วงแหวนเฟือง (เร็ว ๆ นี้)']],rw:{g:150000,s3:10}})}
setTimeout(()=>{try{
    const M7=MAPS[36],Mb=MAPS[39]||MAPS[38];M7.gates.push({x:1500,y:2700,to:40,req:1,p91:1,nm:'บันไดดาว (ห้วงอวกาศ)',arr:{x:430,y:2620}});
    MAPS[40]=Object.assign({},Mb,{n:'ลานดาวลอย',mth:42,sx:430,sy:2620,sr:110,seed:401,bg:'#0a0a20',tile:'#8a7cb0',safe:'#b8acd8',ring:'#bfe0ff',t1:'#2a2244',t2:'#5e5084',d1:'#3a3060',d2:'#ffffff',bth:42,fsw:[],
      gates:[{x:290,y:2700,to:36,req:1,nm:'บันไดดาว ↓ หอดูดาวโอเรียน',arr:{x:1500,y:2830}}],npc:{x:1850,y:1470,n:'ลูมิน่า · เด็กดาว',L:22},npc2:{x:720,y:2560,n:'เซเลสต์ · นักดาราศาสตร์หลวง'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[1250,2050],[520,1450],[1900,1600],[2620,2300],[1300,820],[2520,700],[1100,2150],[2050,1420]]});
    FIELDM[40]=1;BTR[42]='200,180,255';GLOWC[40]='200,220,255';FXST[42]='cosmic';BTC[42]=['#f0eaff','#8a6ad8','#ffffff'];TIER[40]=[79,23.6,3.12];WRG[40]={1:{rg:250,cd:1.9,spd:320,dm:.85,k:'star',c:'230,180,255'},2:{rg:240,cd:2.4,spd:360,dm:1.1,k:'zap',c:'200,230,255'}}}catch(e){console.warn('q9 map',e)}
  try{NPC3[40]={d:lumD,s:['ข้านับดาวมาสามร้อยปี… คืนนี้หายไปอีกสามดวง','สะพานแสงพวกนี้ ข้าเห็นตอนมันถูกถักขึ้นมา','อย่าตกจากเกาะนะ ความว่างข้างล่างไม่มีก้น','เจ้าตัวอุ่นจัง… ดาวก็อุ่นแบบนี้'],hy:44}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p9sf)return q9AqT(st);return _q(st)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{q9MetDraw()}catch(e){}_dn()}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===40&&!q9In(x,y,12,1))return false;return _aw(x,y)}}catch(e){}
  try{WMN[40]=[180,960,'ลานดาวลอย','🌌'];WMLV[40]=[144,148]}catch(e){}
  try{NMLR[40]=[[1250,2050],[520,1450],[1900,1500],[2620,2300],[1300,800]]}catch(e){}
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur();if(st&&st.p9c1)setTimeout(()=>{try{sdGive(10,'แสงของลูมิน่า')}catch(e){}},400);if(st&&st.p9sf)setTimeout(()=>{try{sdGive(5,'เศษดาวกระพริบ')}catch(e){}},400);return _st()}}catch(e){}
  /* เซเลสต์ยืนที่ลานบันไดตั้งแต่บทนี้ */setInterval(()=>{try{const N=MAPS[40]&&MAPS[40].npc2;if(!N)return;if(gP9s1()){N.x=720;N.y=2560}else{N.x=-9999;N.y=-9999}}catch(e){}},600);
},0);
