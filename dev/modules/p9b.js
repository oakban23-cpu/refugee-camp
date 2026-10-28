/* ---------- v536 ภาค 9 บทที่ 2 «วงแหวนเฟือง» (แมพ 41) ----------
   แมพ 41 Lv 148–152: สถานีวงแหวนทองเหลืองโคจรรอบ «ดาวแคระ» กลางแมพ · ตัววงแหวน (รัศมี 600–880) หมุนตามเข็มนาฬิกา → ยืนบนวงแหวนแล้วถูกพาไหลช้า ๆ
   ท่าเทียบ 3 ท่า (ลานขึ้นบก ตะวันตกเฉียงใต้ · ท่าหอนาฬิกา เหนือ · ท่าตะวันออก) ต่อกับวงแหวนด้วยสะพานซี่ล้อ · ดาวแคระ/ความว่างเดินไม่ได้
   คลื่นหยุดเวลา: ทุก ~9 วิ วงแสงฟ้าขยายออกจากดาวแคระ ใครโดนแนวคลื่นจะ «ค้าง» ขยับไม่ได้ 1.2 วิ (ลานขึ้นบกปลอดภัย)
   เฟืองเวลา 4 ตัวบนวงแหวน: วงซ่อมสลับ เขียว (ซ่อม) / แดง (เฟืองหมุนคลั่ง) ทุก 1.5 วิ · ยืนในวงตอนเขียวสะสม 3 วิ = ซ่อมเสร็จ · ยืนตอนแดงโดนดีด เสียความคืบหน้า
   มอนธีม 43: แมวดาวหาง · นกฮูกเฟือง (ยิงเฟือง) · ผีดาวดับ */
const Q9C={x:1600,y:1600},Q9R0=600,Q9R1=880,Q9STAR=260,Q9OM=55;/* ความเร็ววงแหวน px/วิ ที่ขอบนอก */
const Q9D=[{a:2.356,r:1200,nm:'ลานขึ้นบก'},{a:-1.571,r:1200,nm:'ท่าหอนาฬิกา'},{a:0,r:1200,nm:'ท่าตะวันออก'}].map(d=>({...d,x:Q9C.x+Math.cos(d.a)*d.r,y:Q9C.y+Math.sin(d.a)*d.r,rd:180}));
const Q9G=[-.785,.785,2.356,3.927].map((a,i)=>({a,x:Q9C.x+Math.cos(a)*740,y:Q9C.y+Math.sin(a)*740,ph:i*.7}));
const Q9GN=['เฟืองเข็มวินาที','เฟืองเข็มนาที','เฟืองเข็มชั่วโมง','เฟืองเข็มปี'];
const Q9GLORE=[['⚙️ เฟืองเข็มวินาที · ซ่อมแล้ว','เฟืองเล็กหมุนกลับเข้าจังหวะ… ลูมิน่าแตะมันเบา ๆ «ทุกครั้งที่มันเดินหนึ่งทีก์ ดาวหนึ่งดวงถูกทอลงตาข่าย สามร้อยปีมาแล้ว»'],
 ['⚙️ เฟืองเข็มนาที · ซ่อมแล้ว','ใต้เฟืองมีแผ่นทองเหลืองสลักลายมือ: «วงแหวนนี้คือนาฬิกาที่นับเวลาจนกว่าดาวดวงสุดท้ายจะปลอดภัย —โอ.»'],
 ['⚙️ เฟืองเข็มชั่วโมง · ซ่อมแล้ว','เซเลสต์ลูบรอยสลัก «ท่านโอเรียนคำนวณไว้… ถ้าวงแหวนหมุนครบรอบ ตาข่ายจะปิด และฟ้าจะไม่มีดาวเหลือเลย»'],
 ['⚙️ เฟืองเข็มปี · ซ่อมแล้ว','เฟืองใหญ่ที่สุดหยุดสั่นแล้ว… วงแหวนทั้งวงส่งเสียงหวีดยาว แล้วประตูบนท่าหอนาฬิกาก็เรืองแสงขึ้นมา']];
const Q9RZN={land:['ลานขึ้นบก','ท่าเทียบที่ประตูเฟืองจากลานดาวลอยมาส่ง'],tow:['ท่าหอนาฬิกา','หอนาฬิกาดาวตั้งตระหง่าน เข็มยักษ์บนหน้าปัดเดินไม่หยุด'],east:['ท่าตะวันออก','ท่าที่เงียบที่สุด… มองเห็นทุ่งตาข่ายดาวเรืองเงินไกล ๆ'],
  ring:['วงแหวนเฟือง','พื้นทองเหลืองใต้เท้าเลื่อนไปช้า ๆ ตามเข็มนาฬิกา'],spoke:['สะพานซี่ล้อ','ซี่ล้อเหล็กที่ยึดวงแหวนไว้กับท่า']};
let Q9Q={lx:0,ly:0,wv:-1,wt:4,frz:0,fx:0,fy:0,gp:[0,0,0,0],gh:0,gi:-1},Q9QN={st:[]};
const q9rD=(x,y)=>Math.hypot(x-Q9C.x,y-Q9C.y);
function q9rDock(x,y,m){for(let i=0;i<Q9D.length;i++){const d=Q9D[i];if(Math.hypot(x-d.x,y-d.y)<d.rd-(m||0))return i}return -1}
function q9rRing(x,y,m){const r=q9rD(x,y);return r>Q9R0+(m||0)&&r<Q9R1-(m||0)}
function q9rSpoke(x,y,m){const r=q9rD(x,y);if(r<Q9R1-20||r>1080)return false;const a=Math.atan2(y-Q9C.y,x-Q9C.x);for(const d of Q9D){const da=Math.atan2(Math.sin(a-d.a),Math.cos(a-d.a));if(Math.abs(da*r)<34-(m||0))return true}return false}
function q9rIn(x,y,m){m=m||0;if(x<80||y<80||x>3120||y>3120)return false;return q9rRing(x,y,m)||q9rDock(x,y,m)>=0||q9rSpoke(x,y,m)}
function q9rSafe(x,y){return Math.hypot(x-Q9D[0].x,y-Q9D[0].y)<Q9D[0].rd+30}
const q9rZone=(x,y)=>{const d=q9rDock(x,y,0);if(d===0)return'land';if(d===1)return'tow';if(d===2)return'east';if(q9rRing(x,y,0))return'ring';return'spoke'};
const q9rGOn=i=>((performance.now()/1000+Q9G[i].ph)%3)<1.5;/* เขียว = ซ่อมได้ */
const gP9s2=()=>p6Past('p9s2');
/* ---------- ฉาก ---------- */
function q9rPaint(c,ox,oy,S){q9Space(c,ox,oy,S);c.fillStyle='rgba(30,14,10,.18)';c.fillRect(ox,oy,S,S);const X1=ox+S,Y1=oy+S;
  /* แสงดาวแคระส่องทั้งลาน */{const gr=c.createRadialGradient(Q9C.x,Q9C.y,Q9STAR*.6,Q9C.x,Q9C.y,1500);gr.addColorStop(0,'rgba(255,170,90,.32)');gr.addColorStop(.4,'rgba(255,120,70,.1)');gr.addColorStop(1,'rgba(255,100,60,0)');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  /* สะพานซี่ล้อ */for(const d of Q9D){const x0=Q9C.x+Math.cos(d.a)*(Q9R1-30),y0=Q9C.y+Math.sin(d.a)*(Q9R1-30),x1=d.x-Math.cos(d.a)*(d.rd-30),y1=d.y-Math.sin(d.a)*(d.rd-30),L=Math.hypot(x1-x0,y1-y0);
    c.save();c.translate(x0,y0);c.rotate(d.a);c.fillStyle='rgba(0,0,0,.35)';c.fillRect(0,-30,L,72);const sg=c.createLinearGradient(0,-34,0,34);sg.addColorStop(0,'#6a5236');sg.addColorStop(.5,'#9a7a4a');sg.addColorStop(1,'#5a4228');c.fillStyle=sg;c.fillRect(0,-34,L,68);
    c.strokeStyle='#3a2a18';c.lineWidth=2;for(let x=0;x<L;x+=24){c.beginPath();c.moveTo(x,-34);c.lineTo(x,34);c.stroke()}c.strokeStyle='#d8b070';c.lineWidth=3;c.beginPath();c.moveTo(0,-34);c.lineTo(L,-34);c.moveTo(0,34);c.lineTo(L,34);c.stroke();c.restore()}
  /* ท่าเทียบ: แผ่นทองเหลืองกลมมีลายเฟือง */Q9D.forEach((d,i)=>{if(d.x+d.rd+40<ox||d.x-d.rd-40>X1||d.y+d.rd+60<oy||d.y-d.rd-40>Y1)return;c.fillStyle='rgba(0,0,0,.4)';c.beginPath();c.ellipse(d.x+10,d.y+30,d.rd+6,d.rd*.9,0,0,7);c.fill();
    c.fillStyle='#3a2a1a';c.beginPath();c.arc(d.x,d.y+14,d.rd+4,0,7);c.fill();const gr=c.createRadialGradient(d.x-d.rd*.3,d.y-d.rd*.3,10,d.x,d.y,d.rd);gr.addColorStop(0,'#d8b47a');gr.addColorStop(.6,'#a8844e');gr.addColorStop(1,'#6a4e2e');c.fillStyle=gr;c.beginPath();c.arc(d.x,d.y,d.rd,0,7);c.fill();
    c.strokeStyle='rgba(60,40,20,.55)';c.lineWidth=3;for(const rr of[d.rd*.45,d.rd*.8]){c.beginPath();c.arc(d.x,d.y,rr,0,7);c.stroke()}for(let k=0;k<12;k++){const a=k/12*6.283;c.beginPath();c.moveTo(d.x+Math.cos(a)*d.rd*.45,d.y+Math.sin(a)*d.rd*.45);c.lineTo(d.x+Math.cos(a)*d.rd*.8,d.y+Math.sin(a)*d.rd*.8);c.stroke()}
    c.strokeStyle='#f0d090';c.lineWidth=3;c.beginPath();c.arc(d.x,d.y,d.rd-2,3.5,5.9);c.stroke();c.fillStyle='rgba(255,240,200,.15)';for(let k=0;k<16;k++){const a=k/16*6.283;c.beginPath();c.arc(d.x+Math.cos(a)*(d.rd-14),d.y+Math.sin(a)*(d.rd-14),4,0,7);c.fill()}
    {const R=gxRng(9600+i);c.save();c.beginPath();c.arc(d.x,d.y,d.rd-3,0,7);c.clip();
     /* ลายโลหะขัดวงกลม */c.lineWidth=1;for(let rr=14;rr<d.rd;rr+=5){c.strokeStyle=(rr/5|0)%2?'rgba(255,236,190,.07)':'rgba(70,46,20,.07)';c.beginPath();c.arc(d.x,d.y,rr,0,7);c.stroke()}
     /* คราบสนิมเขียว (ทองเหลืองเก่า) */for(let k=0;k<5;k++){const a=R()*6.283,rr=d.rd*(.55+R()*.4),x=d.x+Math.cos(a)*rr,y=d.y+Math.sin(a)*rr,r=16+R()*26,gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(90,150,130,.3)');gr.addColorStop(1,'rgba(90,150,130,0)');c.fillStyle=gr;c.beginPath();c.arc(x,y,r,0,7);c.fill()}
     /* รอยขีดข่วน */c.strokeStyle='rgba(255,240,210,.18)';c.lineWidth=1;for(let k=0;k<10;k++){const x=d.x+(R()-.5)*d.rd*1.5,y=d.y+(R()-.5)*d.rd*1.5,a=R()*3.14,L=10+R()*24;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);c.stroke()}c.restore()}
    /* หมุดย้ำรอบขอบ (มีเงา+ไฮไลต์) */for(let k=0;k<20;k++){const a=(k+.5)/20*6.283,x=d.x+Math.cos(a)*(d.rd-7),y=d.y+Math.sin(a)*(d.rd-7);c.fillStyle='#4a3218';c.beginPath();c.arc(x+.8,y+1.2,3.4,0,7);c.fill();c.fillStyle='#caa064';c.beginPath();c.arc(x,y,3,0,7);c.fill();c.fillStyle='rgba(255,246,220,.8)';c.beginPath();c.arc(x-1,y-1,1.1,0,7);c.fill()}
    /* ตราเข็มทิศดาวสลักกลางแผ่น (เรืองจาง) */{const r0=d.rd*.3;c.save();c.translate(d.x,d.y);const gl=c.createRadialGradient(0,0,0,0,0,r0*1.6);gl.addColorStop(0,'rgba(255,220,150,.28)');gl.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=gl;c.beginPath();c.arc(0,0,r0*1.6,0,7);c.fill();
     for(const[rr,w,cl]of[[r0,.2,'rgba(70,46,20,.55)'],[r0*.55,.14,'rgba(70,46,20,.4)']]){c.fillStyle=cl;for(let k=0;k<(rr===r0?4:8);k++){const a=k/(rr===r0?4:8)*6.283+(rr===r0?0:.39);c.beginPath();c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);c.lineTo(Math.cos(a+1.57)*rr*w,Math.sin(a+1.57)*rr*w);c.lineTo(0,0);c.lineTo(Math.cos(a-1.57)*rr*w,Math.sin(a-1.57)*rr*w);c.closePath();c.fill()}}
     c.strokeStyle='rgba(255,236,190,.45)';c.lineWidth=1.4;c.beginPath();c.arc(0,0,r0*1.12,0,7);c.stroke();c.fillStyle='#ffe6b0';c.beginPath();c.arc(0,0,3.2,0,7);c.fill();c.restore()}})}
/* วงแหวน + ดาวแคระ วาดสดทุกเฟรม (หมุน) */
function q9rRingDraw(){const T=performance.now()/1000,rot=-T*Q9OM/Q9R1;if(!palVis(Q9C.x,Q9C.y,Q9R1+60))return;g.save();
  /* เงาใต้วงแหวน */g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.arc(Q9C.x+12,Q9C.y+30,Q9R1,0,7);g.arc(Q9C.x+12,Q9C.y+30,Q9R0,0,7,true);g.fill('evenodd');
  g.fillStyle='#3a2816';g.beginPath();g.arc(Q9C.x,Q9C.y+18,Q9R1+2,0,7);g.arc(Q9C.x,Q9C.y+18,Q9R0-2,0,7,true);g.fill('evenodd');
  const gr=g.createRadialGradient(Q9C.x,Q9C.y,Q9R0,Q9C.x,Q9C.y,Q9R1);gr.addColorStop(0,'#8a6a3e');gr.addColorStop(.3,'#c09a5e');gr.addColorStop(.7,'#b08a52');gr.addColorStop(1,'#6e5232');g.fillStyle=gr;g.beginPath();g.arc(Q9C.x,Q9C.y,Q9R1,0,7);g.arc(Q9C.x,Q9C.y,Q9R0,0,7,true);g.fill('evenodd');
  /* แผ่นพื้นแบ่งช่อง (หมุน) */g.save();g.translate(Q9C.x,Q9C.y);g.rotate(rot);g.strokeStyle='rgba(60,40,20,.55)';g.lineWidth=2.4;const N=LOWQ?48:72;for(let k=0;k<N;k++){const a=k/N*6.283;g.beginPath();g.moveTo(Math.cos(a)*Q9R0,Math.sin(a)*Q9R0);g.lineTo(Math.cos(a)*Q9R1,Math.sin(a)*Q9R1);g.stroke()}
    g.beginPath();g.arc(0,0,(Q9R0+Q9R1)/2,0,7);g.stroke();g.fillStyle='rgba(255,230,170,.5)';for(let k=0;k<N;k++){const a=(k+.5)/N*6.283;for(const rr of[Q9R0+24,Q9R1-24]){g.beginPath();g.arc(Math.cos(a)*rr,Math.sin(a)*rr,3,0,7);g.fill()}}
    /* ลูกศรทิศหมุน */g.strokeStyle='rgba(255,220,150,.35)';g.lineWidth=3;for(let k=0;k<12;k++){const a=k/12*6.283,rr=(Q9R0+Q9R1)/2;g.save();g.rotate(a);g.translate(rr,0);g.beginPath();g.moveTo(-8,-10);g.lineTo(0,0);g.lineTo(-8,10);g.stroke();g.restore()}g.restore();
  g.strokeStyle='#f0d090';g.lineWidth=4;g.beginPath();g.arc(Q9C.x,Q9C.y,Q9R1-2,0,7);g.stroke();g.strokeStyle='#5a3e20';g.lineWidth=5;g.beginPath();g.arc(Q9C.x,Q9C.y,Q9R0+2,0,7);g.stroke();
  /* ดาวแคระ: ลูกไฟส้มขาว มีเปลวโคโรนา */const pu=.85+.15*Math.sin(T*1.7);g.globalCompositeOperation='lighter';glowAt(Q9C.x,Q9C.y,Q9STAR*2.2,'255,140,60',.35*pu);glowAt(Q9C.x,Q9C.y,Q9STAR*1.3,'255,200,120',.5*pu);
  g.globalCompositeOperation='source-over';const sg=g.createRadialGradient(Q9C.x-60,Q9C.y-60,20,Q9C.x,Q9C.y,Q9STAR*.85);sg.addColorStop(0,'#fffbe8');sg.addColorStop(.35,'#ffd890');sg.addColorStop(.8,'#ff8a3a');sg.addColorStop(1,'#d8441a');g.fillStyle=sg;g.beginPath();g.arc(Q9C.x,Q9C.y,Q9STAR*.85,0,7);g.fill();
  if(!LOWQ){g.fillStyle='rgba(255,120,40,.35)';for(let k=0;k<9;k++){const a=k*.7+T*.08,rr=Q9STAR*.55;g.beginPath();g.ellipse(Q9C.x+Math.cos(a)*rr*.6,Q9C.y+Math.sin(a)*rr*.6,24,14,a,0,7);g.fill()}}
  g.globalCompositeOperation='lighter';for(let k=0;k<(LOWQ?4:8);k++){const a=k/8*6.283+T*.2,L=Q9STAR*(.95+.25*Math.sin(T*2+k*1.7));g.strokeStyle='rgba(255,170,80,.4)';g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(Q9C.x+Math.cos(a)*Q9STAR*.8,Q9C.y+Math.sin(a)*Q9STAR*.8);g.quadraticCurveTo(Q9C.x+Math.cos(a+.25)*L*1.15,Q9C.y+Math.sin(a+.25)*L*1.15,Q9C.x+Math.cos(a+.5)*Q9STAR*.85,Q9C.y+Math.sin(a+.5)*Q9STAR*.85);g.stroke()}
  g.restore()}
function q9rBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(9500);
  Q9D.forEach((d,i)=>{const a=d.a+Math.PI;[[.6,.55],[-.6,.55]].forEach(([da,rf])=>trees.push({x:d.x+Math.cos(a+da)*d.rd*rf,y:d.y+Math.sin(a+da)*d.rd*rf,r:0,k:'q9lamp',ht:90,ns:1,nc:1,v:i}))});
  trees.push({x:Q9D[1].x,y:Q9D[1].y-60,r:40,k:'q9tower',ht:420,hw:110});trees.push({x:Q9D[2].x+60,y:Q9D[2].y-40,r:20,k:'q9tel',ht:110,hw:50});trees.push({x:Q9D[0].x-70,y:Q9D[0].y+60,r:0,k:'q9gate2',ht:120,ns:1,nc:1});
  [[Q9D[0].x+90,Q9D[0].y-80,0,.8],[Q9D[2].x-70,Q9D[2].y+80,1,.7]].forEach(([x,y,v,s])=>trees.push({x,y,r:20*s,k:'q9gear',v,sc:s,ht:130*s,hw:70*s}));
  Q9QN.st=[];for(let i=0;i<60;i++)Q9QN.st.push([100+R()*3000,100+R()*3000,R()*6,R()]);
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc)return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
Object.assign(PALK,{
 q9tower(t,T){const x=t.x,y=t.y;PALSH(x+10,y+8,90,22,.5);{const tg=g.createLinearGradient(x-80,0,x+80,0);tg.addColorStop(0,'#2a1e34');tg.addColorStop(.35,'#5a4868');tg.addColorStop(.6,'#46385a');tg.addColorStop(1,'#1e1628');g.fillStyle=tg}g.beginPath();g.moveTo(x-80,y);g.lineTo(x-60,y-300);g.lineTo(x+60,y-300);g.lineTo(x+80,y);g.closePath();g.fill();g.fillStyle='#4e3e58';g.fillRect(x-60,y-300,120,10);
  g.strokeStyle='#c89a4a';g.lineWidth=3;for(let k=1;k<6;k++){g.beginPath();g.moveTo(x-80+k*3,y-k*50);g.lineTo(x+80-k*3,y-k*50);g.stroke()}for(let k=1;k<5;k++)for(const s of[-1,1]){const wx=x+s*34,wy=y-k*50-28;g.fillStyle='#1a1222';g.beginPath();g.moveTo(wx-9,wy+16);g.lineTo(wx-9,wy-6);g.quadraticCurveTo(wx,wy-18,wx+9,wy-6);g.lineTo(wx+9,wy+16);g.closePath();g.fill();const on=((k*7+s*3+(T*.3|0))%5)>1;if(on){g.fillStyle='rgba(255,210,140,.85)';g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(wx,wy+4,22,'255,200,120',.35);g.restore()}}
  /* หน้าปัด */const cx=x,cy=y-370;g.fillStyle='#2a2036';g.beginPath();g.arc(cx,cy,78,0,7);g.fill();g.fillStyle='#f4ecd8';g.beginPath();g.arc(cx,cy,66,0,7);g.fill();g.strokeStyle='#c89a4a';g.lineWidth=5;g.beginPath();g.arc(cx,cy,70,0,7);g.stroke();
  g.fillStyle='#3a2a20';for(let k=0;k<12;k++){const a=k/12*6.283;g.beginPath();g.arc(cx+Math.cos(a)*56,cy+Math.sin(a)*56,k%3?2:4,0,7);g.fill()}
  g.strokeStyle='#2a1e14';g.lineCap='round';g.lineWidth=6;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(T*.05-1.57)*36,cy+Math.sin(T*.05-1.57)*36);g.stroke();g.lineWidth=3.6;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(T*.6-1.57)*54,cy+Math.sin(T*.6-1.57)*54);g.stroke();
  g.strokeStyle='#c8302a';g.lineWidth=1.6;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(T*6.283/4)*58,cy+Math.sin(T*6.283/4)*58);g.stroke();g.fillStyle='#c89a4a';g.beginPath();g.arc(cx,cy,6,0,7);g.fill();
  g.fillStyle='#3a2c40';g.beginPath();g.moveTo(cx-70,cy-60);g.lineTo(cx,cy-150);g.lineTo(cx+70,cy-60);g.closePath();g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(cx,cy-150,40,'230,200,255',.5+.2*Math.sin(T*2));glowAt(cx,cy,100,'255,220,160',.18);g.restore();
  g.fillStyle='#120c18';g.beginPath();g.moveTo(x-26,y);g.lineTo(x-26,y-60);g.quadraticCurveTo(x,y-90,x+26,y-60);g.lineTo(x+26,y);g.closePath();g.fill();if(gP9s2()){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-40,40,'200,180,255',.4+.2*Math.sin(T*3));g.restore()}phLbl('หอนาฬิกาดาว',x,y-480,'#ffe8b0')},
 q9gate2(t,T){const x=t.x,y=t.y;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-40,50,'200,170,255',.4+.15*Math.sin(T*2));g.restore();g.strokeStyle='#c89a4a';g.lineWidth=6;g.beginPath();g.arc(x,y-40,34,0,7);g.stroke();g.save();g.translate(x,y-40);g.rotate(T*.6);g.strokeStyle='rgba(220,200,255,.7)';g.lineWidth=2;for(let k=0;k<8;k++){g.rotate(.785);g.beginPath();g.moveTo(10,0);g.lineTo(28,0);g.stroke()}g.restore()}});
/* ---------- พื้น: เฟืองเวลา · คลื่นหยุดเวลา · ดาวกระพริบ ---------- */
function q9rGroundFx(){const T=performance.now()/1000;q9rRingDraw();g.save();
  const st=stCur(),q=me.sty,act=st&&st.p9gr&&q&&q.a===1;
  Q9G.forEach((G,i)=>{if(!palVis(G.x,G.y,120))return;const done=act?((q.p9gr|0)>>i&1):1,on=q9rGOn(i),rot=T*(done?.4:on?.6:3)*(i%2?1:-1);
    if(act&&!done){g.fillStyle=on?'rgba(110,230,140,.22)':'rgba(240,80,70,.25)';g.beginPath();g.ellipse(G.x,G.y,72,46,0,0,7);g.fill();g.strokeStyle=on?'rgba(150,255,170,.85)':'rgba(255,120,110,.9)';g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=-T*30;g.beginPath();g.ellipse(G.x,G.y,72,46,0,0,7);g.stroke();g.setLineDash([])}
    g.save();g.translate(G.x,G.y-56);g.rotate(rot);g.fillStyle=done?'#c89a4a':'#7a5a2e';g.beginPath();for(let k=0;k<10;k++){const a=k/10*6.283;g.lineTo(Math.cos(a-.15)*30,Math.sin(a-.15)*30);g.lineTo(Math.cos(a-.08)*38,Math.sin(a-.08)*38);g.lineTo(Math.cos(a+.08)*38,Math.sin(a+.08)*38);g.lineTo(Math.cos(a+.15)*30,Math.sin(a+.15)*30)}g.closePath();g.fill();g.fillStyle='#4a3418';g.beginPath();g.arc(0,0,10,0,7);g.fill();g.restore();
    if(done&&act){g.save();g.globalCompositeOperation='lighter';glowAt(G.x,G.y-56,44,'255,220,150',.35);g.restore()}
    if(act&&!done&&Q9Q.gi===i){const p=Math.min(1,Q9Q.gp[i]/3);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(G.x,G.y-110,12,0,7);g.stroke();g.strokeStyle='#9cf0b0';g.lineWidth=3.4;g.beginPath();g.arc(G.x,G.y-110,12,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}
    if(act&&!done&&palVis(G.x,G.y,60)){g.font='bold 12px system-ui';g.textAlign='center';g.fillStyle=on?'#c8ffd0':'#ffc0b8';g.fillText(on?'ซ่อมได้!':'หมุนคลั่ง!',G.x,G.y+66)}});
  /* คลื่นหยุดเวลา */if(Q9Q.wv>=0){const r=Q9STAR+Q9Q.wv*(1300-Q9STAR),a=1-Q9Q.wv;g.strokeStyle='rgba(150,210,255,'+(.7*a+.2)+')';g.lineWidth=40;g.beginPath();g.arc(Q9C.x,Q9C.y,r,0,7);g.stroke();g.strokeStyle='rgba(230,245,255,'+(.8*a+.2)+')';g.lineWidth=3;g.beginPath();g.arc(Q9C.x,Q9C.y,r,0,7);g.stroke();
    g.fillStyle='rgba(230,245,255,.8)';for(let k=0;k<24;k++){const q2=k/24*6.283;g.fillRect(Q9C.x+Math.cos(q2)*r-2,Q9C.y+Math.sin(q2)*r-2,4,4)}}
  if(Q9Q.frz>0&&me.cls){g.strokeStyle='rgba(170,220,255,.9)';g.lineWidth=2;for(let k=0;k<3;k++){g.beginPath();g.arc(me.x,me.y-20,22+k*6,0,7);g.stroke()}g.font='bold 13px system-ui';g.textAlign='center';g.fillStyle='#d8f0ff';g.fillText('⏸️ เวลาหยุด!',me.x,me.y-72)}
  g.globalCompositeOperation='lighter';for(const[x,y,ph,s]of Q9QN.st){if(!palVis(x,y,10))continue;const q2=Math.sin(T*(1+s)+ph);if(q2<.7)continue;glowAt(x,y,5,'255,220,180',(q2-.7)*2.5)}
  g.restore()}
function q9rScreen(T,z,Hs){g.save();const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.32,SW0/2,Hs/2,Math.max(SW0,Hs)*.8);vg.addColorStop(0,'rgba(30,10,10,0)');vg.addColorStop(1,'rgba(30,10,20,.38)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  if(Q9Q.frz>0){g.fillStyle='rgba(150,200,255,'+(.12+.06*Math.sin(T*20))+')';g.fillRect(0,0,SW0,Hs)}
  if(q9rRing(me.x,me.y,0)&&!SD.on){const t='⚙️ วงแหวนหมุนพาไหล ↻';g.font='bold 11px system-ui';g.textAlign='center';const w=g.measureText(t).width+18,cx=SW0/2,cy=Hs*.2;g.fillStyle='rgba(40,24,10,.7)';g.beginPath();g.roundRect(cx-w/2,cy-12,w,22,11);g.fill();g.fillStyle='#ffe0b0';g.fillText(t,cx,cy+3)}
  g.restore()}
function q9rTick(dt,now,x,y,mv){
  /* ค้าง */if(Q9Q.frz>0){Q9Q.frz-=dt;me.x=Q9Q.fx;me.y=Q9Q.fy;x=me.x;y=me.y}
  /* วงแหวนพาไหล (ตามเข็มนาฬิกา) */if(me.down<=0&&q9rRing(x,y,-4)){const r=q9rD(x,y),a=Math.atan2(y-Q9C.y,x-Q9C.x)-Q9OM*dt/Q9R1*(r/Q9R1)*1.0;const nx=Q9C.x+Math.cos(a)*r,ny=Q9C.y+Math.sin(a)*r;me.x=nx;me.y=ny;x=nx;y=ny;if(Q9Q.frz>0){Q9Q.fx=nx;Q9Q.fy=ny}}
  if(q9rIn(x,y,-4)){Q9Q.lx=x;Q9Q.ly=y}else if(!q9rIn(x,y,-30)&&me.down<=0&&Q9Q.lx){me.x=Q9Q.lx;me.y=Q9Q.ly;x=me.x;y=me.y}
  /* คลื่นหยุดเวลา */if(Q9Q.wv>=0){const r0=Q9STAR+Q9Q.wv*(1300-Q9STAR);Q9Q.wv+=dt/2.2;const r1=Q9STAR+Math.min(1,Q9Q.wv)*(1300-Q9STAR),d=q9rD(x,y);if(d>=r0-20&&d<=r1+20&&Q9Q.frz<=0&&me.down<=0&&!q9rSafe(x,y)&&!gmGod){Q9Q.frz=1.2;Q9Q.fx=x;Q9Q.fy=y;Q9Q.fk=(Q9Q.fk|0)+1;try{sfx('zap')}catch(e){}}if(Q9Q.wv>=1)Q9Q.wv=-1}
  else if(!SD.on){Q9Q.wt-=dt;if(Q9Q.wt<=0){Q9Q.wt=8+Math.random()*3;Q9Q.wv=0}}
  /* เฟืองเวลา */const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p9gr){Q9Q.gi=-1;return}
  let near=-1;for(let i=0;i<4;i++){if((q.p9gr|0)>>i&1)continue;if(Math.hypot((x-Q9G[i].x)/72,(y-Q9G[i].y)/46)<1)near=i}Q9Q.gi=near;if(near<0||me.down>0)return;
  if(q9rGOn(near)){Q9Q.gp[near]+=dt;if(Q9Q.gp[near]>=3){q.p9gr=(q.p9gr|0)|(1<<near);let n=0;for(let k=0;k<4;k++)if(q.p9gr>>k&1)n++;q.n=n;Q9Q.gp[near]=0;PALG.card={h:Q9GLORE[near][0]+' · '+n+'/4',t:Q9GLORE[near][1],s:now,d:10};try{sfx('quest')}catch(e){}try{burst(Q9G[near].x,Q9G[near].y-56,['#ffe8a0','#ffffff','#c89a4a'],36,170,1,{glow:1,g:-30})}catch(e){}try{stHud();writeSave()}catch(e){}}}
  else{Q9Q.gh=(Q9Q.gh||0)-dt;if(Q9Q.gh<=0){Q9Q.gh=1;Q9Q.gp[near]=Math.max(0,Q9Q.gp[near]-1);if(!gmGod){const d=Math.round(me.mh*.06);me.hp=Math.max(1,me.hp-d);Q9Q.hk=(Q9Q.hk|0)+1}try{dn.push({x:me.x,y:me.y-60,v:'⚙️ เฟืองดีด!',t:1,col:'#ffc0a0'})}catch(e){}const a=Math.atan2(y-Q9G[near].y,x-Q9G[near].x);me.x+=Math.cos(a)*40;me.y+=Math.sin(a)*40}}}
function q9rAqT(st){if(!me.sty||!st.p9gr)return null;let b=null,bd=1e9;for(let i=0;i<4;i++){if((me.sty.p9gr|0)>>i&1)continue;const d=curMap===41?Math.hypot(me.x-Q9G[i].x,me.y-Q9G[i].y):i;if(d<bd){bd=d;b=i}}if(b==null)return null;
  return{mp:41,act:'reach',x:Q9G[b].x,y:Q9G[b].y,lb:'ซ่อมเฟืองเวลา ('+((me.sty.p9gr|0).toString(2).split('1').length-1)+'/4) · ยืนในวงตอนเขียว'}}
/* ---------- มอนธีม 43 ---------- */
MV1D[430]=(r,T,W,bob)=>{/* แมวดาวหาง: แมวผอมสีน้ำเงินเข้ม หูแหลม ตาเหลือง หางยาวเป็นดาวหางเรือง */const b=Math.sin(T*4)*r*.04,tw=Math.sin(T*2.4)*.3;
  if(!W){g.save();g.translate(-r*.5,-r*.05+b);g.rotate(-.5+tw);g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,0,-r*1.3,0);gr.addColorStop(0,'rgba(170,220,255,.9)');gr.addColorStop(1,'rgba(120,150,255,0)');g.fillStyle=gr;g.beginPath();g.moveTo(0,-r*.08);g.quadraticCurveTo(-r*.7,-r*.3,-r*1.3,-r*.05);g.quadraticCurveTo(-r*.7,r*.15,0,r*.08);g.fill();
    for(let k=0;k<5;k++){const p=(T*.8+k/5)%1;wStar(W,-p*r*1.2,Math.sin(k*2)*r*.1,r*.05*(1-p*.5),r*.016,'rgba(255,255,255,'+(1-p)+')',p*3,4)}g.restore()}
  for(const s of[-1,1])vLimb(W,[s*r*.25,r*.15+b,s*r*.27,r*.45,s*r*.25,r*.62],'#2a2e5a',r*.09,r*.08);
  vS(W,[[-r*.45,r*.05+b],['q',-r*.45,-r*.25+b,0,-r*.22+b],['q',r*.4,-r*.24+b,r*.42,r*.05+b],['q',r*.2,r*.28+b,-r*.1,r*.24+b],['q',-r*.4,r*.24+b,-r*.45,r*.05+b]],'#2e3466',1,1.1);
  const hx=r*.42,hy=-r*.3+b;bvE(W,hx,hy,r*.24,r*.22,'#343a72',1,1);for(const s of[-1,1])vS(W,[[hx+s*r*.16,hy-r*.12],[hx+s*r*.24,hy-r*.38],[hx+s*r*.04,hy-r*.2]],'#343a72',1,.9);
  for(const s of[-1,1])vEye(W,hx+s*r*.09,hy-r*.02,r*.05,r*.06,'#ffd040',W?0:6);if(!W){g.fillStyle='#ff9ab0';g.beginPath();g.arc(hx,hy+r*.07,r*.025,0,7);g.fill();for(const[dx,dy,k]of[[-r*.2,-r*.08,0],[r*.05,-r*.14,1],[-r*.05,r*.05,2]])wStar(W,dx,dy+b,r*.04*(.6+.4*Math.abs(Math.sin(T*2.4+k*2))),r*.012,'rgba(235,242,255,.9)',0,4)}return true};
MV1D[431]=(r,T,W,bob)=>{/* นกฮูกเฟือง: ตัวทองเหลือง ตากล้องสองวง ปีกเป็นแผ่นเฟือง กระพือ */const b=Math.sin(T*3)*r*.06-r*.15,fl=Math.sin(T*8)*.4;
  for(const s of[-1,1]){g.save();g.translate(s*r*.3,-r*.05+b);g.rotate(s*(.4+fl*.5));vS(W,[[0,0],[s*r*.55,-r*.15],[s*r*.6,r*.1],[s*r*.4,r*.25],[0,r*.2]],'#a8803c',1,1);if(!W){g.strokeStyle='#6a5228';g.lineWidth=r*.02;for(let k=1;k<4;k++){g.beginPath();g.moveTo(0,r*.05*k);g.lineTo(s*r*(.15+k*.12),-r*.05+k*r*.07);g.stroke()}}g.restore()}
  bvE(W,0,b,r*.34,r*.4,'#c89a4a',1,1.2);vD(W,[[-r*.2,b],['q',0,r*.3+b,r*.2,b],['q',0,r*.15+b,-r*.2,b]],'#e8d090');
  for(const s of[-1,1]){bvE(W,s*r*.14,-r*.16+b,r*.12,r*.12,'#5a4220',1,1);wE(W,s*r*.14,-r*.16+b,r*.08,r*.08,'#1a2a40');vEye(W,s*r*.14,-r*.16+b,r*.05,r*.05,'#7ae0ff',W?0:6)}
  vS(W,[[-r*.04,-r*.06+b],[r*.04,-r*.06+b],[0,r*.04+b]],'#e8a040',1,.6);for(const s of[-1,1])vS(W,[[s*r*.18,-r*.34+b],[s*r*.28,-r*.5+b],[s*r*.08,-r*.36+b]],'#a8803c',1,.8);
  if(!W){g.save();g.translate(0,r*.2+b);g.rotate(T*2);g.strokeStyle='#8a6a32';g.lineWidth=r*.03;for(let k=0;k<6;k++){g.rotate(1.047);g.beginPath();g.moveTo(0,0);g.lineTo(r*.07,0);g.stroke()}g.restore()}return true};
MV1D[432]=(r,T,W,bob)=>{/* ผีดาวดับ: ร่างโปร่งเทาเย็น แกนดาวดับมืดกลางอก ปลายลำตัวเป็นควัน มือยาว */const b=Math.sin(T*1.6)*r*.1-r*.15,pu=.4+.3*Math.sin(T*2);
  vS(W,[[-r*.36,-r*.2+b],['q',-r*.4,-r*.66+b,0,-r*.7+b],['q',r*.4,-r*.66+b,r*.36,-r*.2+b],['q',r*.3,r*.3+b,r*.1,r*.62+b+Math.sin(T*3)*r*.05],['q',0,r*.4+b,-r*.1,r*.62+b+Math.sin(T*3+1)*r*.05],['q',-r*.3,r*.3+b,-r*.36,-r*.2+b]],'rgba(120,130,160,.75)',1,1);
  for(const s of[-1,1])vK(W,[[s*r*.3,-r*.25+b],['q',s*r*.6,-r*.1+b,s*r*.55,r*.2+b+Math.sin(T*2+s)*r*.06]],'rgba(110,120,150,.8)',r*.07);
  if(!W){g.fillStyle='rgba(20,18,30,.9)';g.beginPath();g.arc(0,-r*.15+b,r*.12,0,7);g.fill();g.strokeStyle='rgba(255,150,90,'+pu+')';g.lineWidth=r*.025;g.beginPath();g.arc(0,-r*.15+b,r*.14,0,7);g.stroke()}
  for(const s of[-1,1])vEye(W,s*r*.12,-r*.45+b,r*.05,r*.035,'#d8e4ff',W?0:5);vGlow(W,0,-r*.15+b,r*.4,'255,140,80',.15*pu);return true};
MV1S[430]=1.6;MV1S[431]=1.75;MV1S[432]=1.4;
/* ---------- เนื้อเรื่องภาค 9 บทที่ 2 ---------- */
Object.assign(SPK,{lum2:SPK.lum,cel41:SPK.cel9||SPK.cel});STNPC.lum2=[41,'npc'];STNPC.cel41=[41,'npc2'];
STCH.push('ภาค 9 · บทที่ 2 · วงแหวนเฟือง');
{const C2=STCH.length-1;STY.push(
 {c:C2,g:'talk',k:'lum',p9s2:1,tx:'คุยกับลูมิน่าที่ซากเครื่องจักร (ลานดาวลอย) · ทางไปยอดหอ',
  pre:[['lum','ยอดหอทอดาวอยู่ไกลเกินกว่าสะพานแสงจะไปถึง… แต่คนสวมมงกุฎสร้างทางไว้ «วงแหวนเฟือง» นาฬิกายักษ์ที่หมุนรอบดาวแคระ'],
   ['lum','วงแหวนนั้นคือหัวใจของการทอ ทุกทีก์ของมัน ดาวหนึ่งดวงถูกทอลงไป… เฟืองเวลาสี่ตัวของมันพังมาตั้งแต่สามร้อยปีก่อน มันเลยเดินเร็วผิดจังหวะ'],
   ['cel9','ถ้าซ่อมเฟืองให้กลับเข้าจังหวะ… นาฬิกาจะเดินช้าลง ตาข่ายจะทอช้าลง!'],
   ['lum','และประตูหอนาฬิกาจะเปิด… ประตูเฟืองอยู่ตรงนี้เอง ข้างเฟืองยักษ์ ข้าจะเปิดให้']],rw:{g:150000}},
 {c:C2,g:'map',m:41,tx:'ผ่านประตูเฟืองไปวงแหวนเฟือง (ข้างเฟืองยักษ์ เกาะซากเครื่องจักร)',
  post:[['nar','ประตูเฟืองหมุนครั้งเดียว แล้วโลกทั้งใบก็เปลี่ยน… วงแหวนทองเหลืองกว้างสุดตาโคจรอยู่รอบดาวแคระสีส้มที่ลุกโชน เปลวไฟบนผิวมันม้วนตัวช้า ๆ เหมือนหายใจ'],
   ['nar','พื้นวงแหวนทั้งวงเลื่อนไปตามเข็มนาฬิกา เสียงทีก์… ทีก์… ดังมาจากทุกทิศ ทางเหนือมีหอนาฬิกาสูงเสียดฟ้า หน้าปัดของมันใหญ่กว่าบ้านทั้งหลัง'],
   ['lum2','ระวังคลื่นจากดาวแคระนะ! มันคือคลื่นหยุดเวลา ใครโดนจะค้างไปครู่หนึ่ง… ลานขึ้นบกตรงนี้ปลอดภัย'],
   ['cel41','💡 วงแหวนหมุนพาไหลตลอด · คลื่นฟ้าจากดาวแคระ = หยุดเวลา (ค้าง 1 วิ) · เฟืองเวลา: ยืนในวงตอน «เขียว» ให้ครบ 3 วิ ตอน «แดง» ออกมาก่อน ไม่งั้นโดนดีด']]},
 {c:C2,g:'clue',m:41,n:4,p9gr:1,tx:'ซ่อมเฟืองเวลา 4 ตัวบนวงแหวน (ยืนในวงตอนเขียว 3 วิ · ตอนแดงออก)',
  pre:[['lum2','เฟืองสี่ตัวอยู่สี่มุมของวงแหวน… ข้าจะร้องจังหวะให้ฟัง ตอนวงเป็นสีเขียวคือจังหวะที่มันยอมให้แตะ']],
  post:[['nar','เฟืองตัวสุดท้ายกลับเข้าจังหวะ เสียงทีก์ทั้งวงแหวนช้าลงครึ่งหนึ่ง… แล้วจากท่อทุกท่อนของวงแหวน ฝูงสัตว์ดาวก็ทะลักออกมา'],
   ['lum2','พวกมันอาศัยอยู่ในจังหวะที่ผิด! พอนาฬิกาเดินถูก มันก็ตื่นตกใจ… ไล่มันออกไปก่อน!']],rw:{g:110000}},
 {c:C2,g:'kill',m:41,n:40,tx:'ขับไล่แมวดาวหาง นกฮูกเฟือง และผีดาวดับ',
  post:[['nar','ผีดาวดับตัวสุดท้ายแตกเป็นฝุ่นเทา… ประตูหอนาฬิกาบนท่าเหนือเรืองแสงม่วงรอผู้มาเยือน'],['lum2','ผู้ถือตรา มาตรงนี้ ข้ามีเรื่องต้องบอกก่อนเข้าไป']],rw:{g:100000}},
 {c:C2,g:'talk',k:'lum2',p9tw:1,tx:'คุยกับลูมิน่าที่ลานขึ้นบก · ผู้รักษาเวลา',
  pre:[['lum2','ในหอนั้นมี «ผู้รักษาเวลา» หุ่นที่คนสวมมงกุฎสั่งให้เฝ้านาฬิกาไว้ไม่ให้ใครหยุดมัน มันหยุดเวลาได้ ย้อนเวลาได้… และมันไม่เคยแพ้'],
   ['cel41','(เซเลสต์ส่องกล้องไปที่หน้าปัด) เข็มนาฬิกาบนหน้าปัดกวาดเป็นวงตลอด… ถ้าเราสู้กับมันข้างใน เข็มพวกนั้นจะเป็นอาวุธของมัน'],
   ['lum2','ตอนมันหยุดเวลา ยืนบนขีดชั่วโมงสีทองที่เรืองอยู่ ขีดพวกนั้นคือเวลาที่มันหยุดไม่ได้… ข้าจำได้ ข้าเคยอยู่ในนั้น'],
   ['cel41','พร้อมเมื่อไหร่บอกลูมิน่า ข้าจะรอที่ท่าหอนาฬิกา']],rw:{g:80000,s3:5}},
 {c:C2,g:'ctw',k:'lum2',p9ct:1,tx:'หอนาฬิกาดาว: สู้ผู้รักษาเวลา (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['lum2','เข็มนาฬิกาจะกวาดตลอด หลบมันให้ดี… ตอนเวลาหยุด ไปยืนบนขีดชั่วโมงสีทอง'],['lum2','พร้อมเมื่อไหร่บอกข้า']],
  post:[['nar','ผู้รักษาเวลาทรุดลงกลางหน้าปัด เข็มทุกเข็มหยุดนิ่ง… เป็นครั้งแรกในสามร้อยปีที่หอนาฬิกาดาวเงียบสนิท'],
   ['nar','ใต้หน้าปัดมีสมุดปกหนังเก่า ๆ เล่มหนึ่งหล่นออกมา ลายมือบนหน้าปกเป็นของคนที่เซเลสต์จำได้ดีที่สุดในโลก']]},
 {c:C2,g:'talk',k:'cel41',p9c2:1,tx:'คุยกับเซเลสต์ที่ท่าหอนาฬิกา · สมุดของโอเรียน',
  pre:[['cel41','(เซเลสต์กอดสมุดไว้แน่น) สมุดบันทึกของท่านโอเรียน… หน้าสุดท้ายเขียนไว้ก่อนเขาตายสามวัน'],
   ['cel41','«ข้าทำผิด ตาข่ายไม่ได้ปกป้องดาว มันขังดาว ข้าสั่งผู้ทอให้หยุดแล้ว แต่มันไม่ฟัง มันบอกว่า —ท่านยังกลัวอยู่ ข้ารู้สึกได้— ข้าจะขึ้นไปบอกมันด้วยตัวเองพรุ่งนี้»'],
   ['lum2','…แล้วเขาก็ไม่เคยขึ้นมา'],
   ['cel41','ผู้ทอไม่ได้ทอเพราะคำสั่ง มันทอเพราะความกลัวของท่านโอเรียนที่ติดอยู่ในมัน… ข้าต้องไปบอกมันแทนท่าน'],
   ['lum2','(ลูมิน่าชี้ไปทางตะวันออก ทุ่งเงินเรืองไกลลิบ) ทุ่งตาข่ายดาว… ครึ่งที่เหลือของข้าอยู่ในนั้น']],
  post:[['nar','🌌 — จบภาค 9 บทที่ 2 · วงแหวนเฟือง — บทต่อไป: ทุ่งตาข่ายดาว (เร็ว ๆ นี้)']],rw:{g:160000,s3:10}})}
setTimeout(()=>{try{
    MAPS[40].gates.push({x:2150,y:1560,to:41,req:1,p92:1,nm:'วงแหวนเฟือง (ประตูเฟือง)',arr:{x:Q9D[0].x+40,y:Q9D[0].y-40}});
    const Mb=MAPS[40];MAPS[41]=Object.assign({},Mb,{n:'วงแหวนเฟือง',mth:43,sx:Q9D[0].x+40,sy:Q9D[0].y-40,sr:100,seed:411,bg:'#0a0814',tile:'#b08a52',safe:'#c09a5e',ring:'#ffd890',t1:'#3a2816',t2:'#8a6a3e',d1:'#3a2a1a',d2:'#fff0d0',bth:43,fsw:[],
      gates:[{x:Q9D[0].x-70,y:Q9D[0].y+60,to:40,req:1,nm:'ลานดาวลอย (ประตูเฟือง)',arr:{x:2100,y:1580}}],npc:{x:Q9D[0].x+120,y:Q9D[0].y-30,n:'ลูมิน่า · เด็กดาว',L:22},npc2:{x:Q9D[1].x+110,y:Q9D[1].y+60,n:'เซเลสต์ · นักดาราศาสตร์หลวง'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[0,1,2,3,4,5,6,7].map(k=>{const a=k/8*6.283+.39,r=740;return[Math.round(Q9C.x+Math.cos(a)*r),Math.round(Q9C.y+Math.sin(a)*r)]}).concat([[Math.round(Q9D[2].x),Math.round(Q9D[2].y)]])});
    FIELDM[41]=1;BTR[43]='255,200,140';GLOWC[41]='255,220,180';FXST[43]='cosmic';BTC[43]=['#fff0e0','#c89a4a','#ffffff'];TIER[41]=[82,24.2,3.2];WRG[41]={1:{rg:250,cd:2.1,spd:320,dm:.9,k:'zap',c:'255,220,150'},2:{rg:230,cd:2.6,spd:260,dm:1.2,k:'seed',c:'180,190,220',big:1}}}catch(e){console.warn('q9r map',e)}
  try{NPC3[41]={d:lumD,s:['ทีก์… ทีก์… เจ้าได้ยินไหม มันเดินช้าลงแล้ว','ดาวแคระดวงนี้เคยเป็นดาวยักษ์ คนสวมมงกุฎบีบมันให้เล็กลง','วงแหวนหมุนพาเราไหล ไม่ต้องเดินก็ไปถึง','ข้าจำเสียงหอนาฬิกาได้ทุกเสียง'],hy:44}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p9gr)return q9rAqT(st);return _q(st)}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===41&&!q9rIn(x,y,12))return false;return _aw(x,y)}}catch(e){}
  try{WMN[41]=[150,1015,'วงแหวนเฟือง','⚙️'];WMLV[41]=[148,152]}catch(e){}
  try{NMLR[41]=Q9G.map(G=>[Math.round(G.x),Math.round(G.y)])}catch(e){}
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur();if(st&&st.p9c2)setTimeout(()=>{try{sdGive(10,'สมุดของโอเรียน')}catch(e){}},400);if(st&&st.p9gr)setTimeout(()=>{try{sdGive(5,'เฟืองเวลา')}catch(e){}},400);return _st()}}catch(e){}
  try{Object.assign(PALK,{q9cel41(t,T){const N=MAPS[41]&&MAPS[41].npc2;if(!N||N.x<0)return;try{celD(N.x,N.y,T,1)}catch(e){}}});const _b=q9rBuild;window.q9rBuild=q9rBuild=function(M){_b(M);const N=MAPS[41].npc2;trees.push({x:N.x,y:N.y-4,r:0,k:'q9cel41',ht:70,ns:1,nc:1})}}catch(e){}
},0);
