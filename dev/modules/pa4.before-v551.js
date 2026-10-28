
/* ---------- v550 ภาค 10 บทที่ 4 «ราชินีกัดแผ่นดิน» (แมพ 45 ฐานแผ่นดิน) ----------
   แมพ 45 Lv 164–168 (ธีมมอน 47): ความว่างใต้แผ่นดิน · รากของต้นค้ำทุกต้นหยั่งลงมาถักเป็นตาข่าย (ปมราก 7 ปม + สะพานราก 12 เส้น)
   ธรณินคุกเข่าแบกฐานแผ่นดินอยู่ทางเหนือ (สไปรต์ใหญ่ใน pa4v.js) · ลานปล่องราก (ใต้) กับลานเท้าธรณิน (เหนือ) ปลอดภัย
   เดินได้แค่บนตาข่าย (ตกความว่าง = ดึงกลับ) · หินร่วงจากฐานแผ่นดิน · มอนเดินออกนอกตาข่ายไม่ได้ (แมงกะพรุนลอยได้)
   ผูกเชือกคำมั่น 5 ปม: ยืนในวง 3 วิ ตอนไม่มีมอนใน 160 · ดันเจี้ยน «รังกัดแผ่นดิน» (pa4d.js · คุยธุลี) */
const PZK=[{x:1600,y:2690,rx:330,ry:200},{x:930,y:2260,rx:230,ry:150},{x:2290,y:2270,rx:230,ry:150},{x:1600,y:1880,rx:270,ry:170},{x:830,y:1520,rx:220,ry:145},{x:2370,y:1500,rx:220,ry:145},{x:1600,y:1280,rx:430,ry:185}];
const PZB=[[1330,2600,1080,2340,36],[1870,2600,2140,2350,36],[1600,2500,1600,2040,40],[900,2120,850,1640,34],[2320,2130,2360,1620,34],[1360,1840,1010,1570,34],[1840,1840,2190,1560,34],[1600,1720,1600,1420,42],[960,1420,1210,1300,34],[2240,1400,1990,1300,34],[1110,2190,1390,1960,32],[2110,2200,1810,1960,32]];
const PZTH={x:1600,y:1085},PZNPC={x:1600,y:1132},PZTHU={x:1474,y:1196},PZGATE={x:1600,y:2850},PZ44={x:1470,y:1395};
/* ปมรากใหญ่ 5 ปม: ที่ผูกเชือกคำมั่น */
const PZJ=[[980,2236],[2240,2246],[1600,1850],[880,1500],[2320,1484]];
const PZJN=[['🪢 เชือกของค่ายและอารัณยา','เชือกลายเฟืองตะวันที่ยายเอดาทอ ผูกต่อกับเชือกป่านของชาวค่าย… มือที่เคยไม่มีบ้าน จับปลายเดียวกับมือที่ทอผ้าห่มให้คนทั้งเมือง'],
  ['🪢 เชือกของกองเรือและวาฬดาว','เชือกเรือเหาะของซาราพันรอบโซ่ดาวของโอเรียน… ข้างบนนั้น เรือทั้งกองเรือกำลังเร่งเครื่องดึงพร้อมกัน'],
  ['🪢 เถาวัลย์ของรากพิภพและนครรากลึก','เถาวัลย์ที่คนรากลึกถักมาทั้งคืน ร้อยเข้ากับรากที่อัลดริคส่งลงมาจากรากพิภพ… ทุกปมผูกด้วยมือคนที่ไม่เคยรู้จักกันมาก่อน'],
  ['🪢 โซ่ของคาร์นและหอคอย','โซ่รางเหมืองของบรอมคล้องกับหมุดเหล็กที่ถอนจากฐานหอคอยร้อยชั้น… เหล็กที่เคยตอกกดแผ่นดิน วันนี้ช่วยดึงมันขึ้น'],
  ['🪢 ด้ายดาวของอัสตราและห้วงดาว','ด้ายดาวจากสะพานดาวเบาเหมือนไม่มีน้ำหนัก แต่ไม่เคยขาด… ที่ปลายเชือกมีโบผูกไว้ ลายมือของราชินีเอลิรา']];
/* สีเชือกแต่ละปม: [ตัวเชือก, ลายเกลียว, แบบ] แบบ 0 เชือก · 1 โซ่ · 2 ด้ายเรือง */
const PZJC=[['#b8582e','#f0c060',0],['#34343e','#c8d0e8',0],['#4a7a36','#a8d870',0],['#5e5e68','#c0c0cc',1],['#9ab8ff','#ffffff',2]];
const PZZN={lift:['ลานปล่องราก','ปลายปล่องรากจากนครรากลึก… เหนือหัวมีแต่ความมืด ใต้เท้ามีแต่ความว่าง'],web:['ตาข่ายราก','รากของต้นค้ำทุกต้นหยั่งลงมาถักกันเป็นตาข่าย ทุกเส้นมุ่งไปหาคนคนเดียว'],
  knot:['ปมรากใหญ่','ตรงนี้รากหลายร้อยเส้นมาบรรจบกัน… มันตึงเหมือนสายพิณที่ถูกดึงจนสุด'],feet:['ลานเท้าธรณิน','ก้อนหินก้อนสุดท้ายของโลก… ผู้แบกคนแรกคุกเข่าอยู่ตรงนี้มาสามร้อยปี'],bridge:['สะพานราก','รากเส้นเดียวพาดข้ามความว่าง… อย่ามองลงไปนาน']};
let PZS={lx:1600,ly:2760,mt:5,warn:[],fl:0,jp:-1,jt:0,blk:0,gl:{},pull:null,pw:0},PZN={ff:[],sp:[]};
const pzInK=(K,x,y,m)=>{const rx=K.rx-m,ry=K.ry-m;if(rx<=0||ry<=0)return false;const a=(x-K.x)/rx,b=(y-K.y)/ry;return a*a+b*b<=1};
function pzK(x,y,m){for(let i=0;i<PZK.length;i++)if(pzInK(PZK[i],x,y,m||0))return i;return -1}
const pzSegT=(x,y,s)=>{const dx=s[2]-s[0],dy=s[3]-s[1],L2=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((x-s[0])*dx+(y-s[1])*dy)/L2));return[t,Math.hypot(x-s[0]-dx*t,y-s[1]-dy*t)]};
function pzOnB(x,y,m){for(let i=0;i<PZB.length;i++){const b=PZB[i],[,d]=pzSegT(x,y,b);if(d<b[4]-(m||0))return i}return -1}
function pzIn(x,y,m){m=m||0;if(x<90||y<90||x>3110||y>3110)return false;return pzK(x,y,m)>=0||pzOnB(x,y,m)>=0}
function pzSafe(x,y){return pzInK(PZK[0],x,y,-24)||pzInK(PZK[6],x,y,-24)}
const pzZone=(x,y)=>pzInK(PZK[0],x,y,0)?'lift':pzInK(PZK[6],x,y,0)?'feet':pzK(x,y,0)>=0?'knot':pzOnB(x,y,0)>=0?'bridge':'web';
const pzTied=i=>p6Past('pa4t')||!!(me.sty&&((me.sty.pa4t|0)>>i&1)),pzTiedN=()=>{let n=0;for(let i=0;i<5;i++)if(pzTied(i))n++;return n};
/* รากชั้นลึก (เดินไม่ได้ · เห็นลาง ๆ ใต้ตาข่าย) — ทุกเส้นโค้งไปหาฐานของธรณิน */
const PZDR=(()=>{const R=gxRng(5150),L=[];for(let i=0;i<30;i++){const side=i%4,t=R();let x0,y0;if(side===0){x0=-60;y0=600+t*2600}else if(side===1){x0=3260;y0=600+t*2600}else if(side===2){x0=t*3200;y0=3260}else{x0=200+t*2800;y0=3260-R()*500}
  const x1=1600+(R()-.5)*700,y1=1020+R()*160,cx=(x0+x1)/2+(R()-.5)*700,cy=(y0+y1)/2+(R()-.5)*500;L.push([x0,y0,cx,cy,x1,y1,10+R()*22,R()])}return L})();
/* ---------- พื้น: ความว่าง + ตาข่ายราก (แคชเป็นแผ่น) ---------- */
function pzPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1,cg=(x,y,r,col,a)=>{if(!inB(x-r,y-r,x+r,y+r))return;const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  /* 1) ความว่าง: มืดลึก ไล่สีม่วงคราม + หมอก + ประกายไกลลิบ */
  {const gr=c.createRadialGradient(1600,1300,120,1600,1700,2400);gr.addColorStop(0,'#1a1426');gr.addColorStop(.45,'#0e0b16');gr.addColorStop(1,'#06050a');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  {const R=gxRng(5101);for(let i=0;i<34;i++){const x=R()*3200,y=R()*3200,r=180+R()*420,a=.035+R()*.05,v=R();if(!inB(x-r,y-r,x+r,y+r))continue;cg(x,y,r,v<.5?'90,70,150':'60,80,140',a)}
    for(let i=0;i<620;i++){const x=R()*3200,y=R()*3200,s=.6+R()*1.4,v=R(),a=.18+R()*.42;if(!inB(x-4,y-4,x+4,y+4))continue;c.fillStyle=v<.5?'rgba(170,150,230,'+a+')':v<.8?'rgba(120,150,220,'+a+')':'rgba(230,210,255,'+a+')';c.fillRect(x-s/2,y-s/2,s,s)}
    for(let i=0;i<40;i++){const x=R()*3200,y=R()*3200,r=6+R()*10;cg(x,y,r,'190,160,255',.22);if(inB(x-2,y-2,x+2,y+2)){c.fillStyle='rgba(240,230,255,.85)';c.fillRect(x-.8,y-.8,1.6,1.6)}}}
  /* 2) รากชั้นลึก (มืด เบลอ) */
  c.lineCap='round';for(const[x0,y0,cx,cy,x1,y1,w,v]of PZDR){if(!inB(Math.min(x0,cx,x1)-60,Math.min(y0,cy,y1)-60,Math.max(x0,cx,x1)+60,Math.max(y0,cy,y1)+60))continue;
    for(const[lw,col]of[[w*1.9,'rgba(14,10,12,.32)'],[w,'rgba(42,30,24,.62)'],[w*.45,'rgba(80,58,40,.4)'],[1.4,'rgba(255,170,90,'+(v<.4?.16:.06)+')']]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(cx,cy,x1,y1);c.stroke()}}
  /* 3) เงาของตาข่ายตกลงบนรากชั้นลึก */
  c.fillStyle='rgba(0,0,0,.34)';for(const K of PZK){if(!inB(K.x-K.rx-20,K.y-K.ry+20,K.x+K.rx+20,K.y+K.ry+120))continue;c.beginPath();c.ellipse(K.x+10,K.y+66,K.rx*1.02,K.ry*.92,0,0,7);c.fill()}
  c.strokeStyle='rgba(0,0,0,.3)';for(const b of PZB){if(!inB(Math.min(b[0],b[2])-60,Math.min(b[1],b[3])-10,Math.max(b[0],b[2])+60,Math.max(b[1],b[3])+120))continue;c.lineWidth=b[4]*2;c.beginPath();c.moveTo(b[0]+10,b[1]+62);c.lineTo(b[2]+10,b[3]+62);c.stroke()}
  /* 4) สะพานราก (ก่อนปม ให้ปมทับปลายราก) */
  PZB.forEach((b,i)=>{if(inB(Math.min(b[0],b[2])-90,Math.min(b[1],b[3])-80,Math.max(b[0],b[2])+90,Math.max(b[1],b[3])+170))pzRootB(c,b,i,cg)});
  /* 5) ปมราก + ลานหินใต้เท้าธรณิน */
  PZK.forEach((K,i)=>{if(inB(K.x-K.rx-90,K.y-K.ry-70,K.x+K.rx+90,K.y+K.ry+180))(i===6?pzLedge:pzKnot)(c,K,i,cg)});
  /* 6) รังของฝูงกัดแผ่นดิน (รูในปมราก) */
  const M=MAPS[45];(M&&M.nests||[]).forEach(([x,y],i)=>{if(!inB(x-80,y-60,x+80,y+60))return;const R=gxRng(5170+i);
    c.fillStyle='rgba(20,12,8,.6)';c.beginPath();c.ellipse(x,y+4,50,21,0,0,7);c.fill();c.fillStyle='#5a4230';c.beginPath();c.ellipse(x,y,42,17,0,0,7);c.fill();
    c.fillStyle='#0c0705';c.beginPath();c.ellipse(x,y+2,25,9.5,0,0,7);c.fill();cg(x,y+2,26,'200,140,255',.18);
    for(let k=0;k<7;k++){const a=k/7*6.2832+R()*.4,rx=x+Math.cos(a)*(32+R()*12),ry=y+Math.sin(a)*(13+R()*6);c.strokeStyle='#3a2616';c.lineWidth=4+R()*3;c.beginPath();c.moveTo(rx,ry);c.lineTo(rx+Math.cos(a)*(10+R()*10),ry+Math.sin(a)*(5+R()*5)-4);c.stroke()}
    for(let k=0;k<4;k++){const a=R()*6.2832;c.fillStyle='rgba(230,220,190,.55)';c.beginPath();c.ellipse(x+Math.cos(a)*48,y+Math.sin(a)*20,4,2.6,a,0,7);c.fill()}})}
/* สะพานราก: ลำรากหนา เปลือกเกลียว มอส เส้นยางอำพัน · รากฝอยห้อยลงความว่างตลอดแนว */
function pzRootB(c,b,i,cg){const[x0,y0,x1,y1,hw]=b,a=Math.atan2(y1-y0,x1-x0),R=gxRng(5300+i),nx=-Math.sin(a),ny=Math.cos(a),bend=(R()<.5?-1:1)*(4+R()*4),ph=R()*6,N=34;
  const wf=u=>1.12-.12*Math.sin(u*Math.PI)+.06*Math.sin(u*17+ph)+.04*Math.sin(u*31+ph*2),
    pt=(u,o)=>{const off=Math.sin(u*Math.PI)*bend+Math.sin(u*Math.PI*3+ph)*2.5+o*(Math.abs(o)>=hw*.99?wf(u):1);return[x0+(x1-x0)*u+nx*off,y0+(y1-y0)*u+ny*off]};
  /* รากฝอยห้อยลงความว่าง (ใต้ลำราก) */for(let k=1;k<N;k++){if(R()<.3)continue;const u=k/N,[xa,ya]=pt(u,-hw),[xb,yb]=pt(u,hw),x=ya>yb?xa:xb,lo=Math.max(ya,yb),Lh=26+R()*80,sw=(R()-.5)*18;
    c.strokeStyle='rgba(44,28,18,.9)';c.lineWidth=1.4+R()*2;c.beginPath();c.moveTo(x,lo-2);c.quadraticCurveTo(x+sw,lo+Lh*.5,x+sw*.4,lo+Lh);c.stroke();if(R()<.25)cg(x+sw*.4,lo+Lh,6,R()<.5?'255,190,90':'190,160,255',.45)}
  const P=[];for(let k=0;k<=N;k++)P.push(pt(k/N,-hw));for(let k=N;k>=0;k--)P.push(pt(k/N,hw));
  c.beginPath();P.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();
  const gr=c.createLinearGradient(x0+nx*-hw,y0+ny*-hw,x0+nx*hw,y0+ny*hw);gr.addColorStop(0,'#9a7452');gr.addColorStop(.35,'#7a5638');gr.addColorStop(.75,'#523822');gr.addColorStop(1,'#301e10');c.fillStyle=gr;c.fill();c.strokeStyle='#1e120a';c.lineWidth=2.6;c.stroke();
  c.save();c.clip();
  /* ร่องเปลือกเกลียว */for(let s=-4;s<=4;s++){const f1=10+R()*9,f2=R()*6,o0=s*hw*.21+(R()-.5)*5;let u=R()*.15;while(u<1){const u1=Math.min(1,u+.12+R()*.3);c.strokeStyle='rgba(34,20,10,'+(.35+R()*.25)+')';c.lineWidth=1.4+R()*1.8;c.beginPath();for(let k=0;k<=12;k++){const uu=u+(u1-u)*k/12,[px,py]=pt(uu,o0+Math.sin(uu*f1+f2)*3.4);k?c.lineTo(px,py):c.moveTo(px,py)}c.stroke();u=u1+.03+R()*.08}}
  c.strokeStyle='rgba(232,204,156,.18)';c.lineWidth=1.3;for(let s=-3;s<=0;s++){const f1=12+R()*6;c.beginPath();for(let k=0;k<=N;k++){const u=k/N,[px,py]=pt(u,s*hw*.21-3+Math.sin(u*f1+s)*3);k?c.lineTo(px,py):c.moveTo(px,py)}c.stroke()}
  for(let k=0;k<4;k++){const[x,y]=pt(.15+R()*.7,(R()-.5)*hw);c.fillStyle='rgba(36,22,12,.6)';c.beginPath();c.ellipse(x,y,7,4,a,0,7);c.fill();c.strokeStyle='rgba(220,180,130,.28)';c.lineWidth=1;c.beginPath();c.ellipse(x,y,10,6,a,0,7);c.stroke()}
  /* เส้นยางอำพัน (ไหลไปหาธรณิน) */c.strokeStyle='rgba(255,176,80,.32)';c.lineWidth=1.8;c.beginPath();for(let k=0;k<=N;k++){const u=k/N,[x,y]=pt(u,Math.sin(u*9+i)*hw*.35);k?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
  /* มอส + ผลึกความว่างเกาะ */for(let k=0;k<12;k++){const u=.05+R()*.9,[x,y]=pt(u,-hw*(.25+R()*.55)),s=5+R()*11;c.fillStyle=R()<.5?'rgba(96,140,64,.7)':'rgba(120,170,80,.62)';c.beginPath();c.ellipse(x,y,s,s*.5,a,0,7);c.fill();if(R()<.35){c.fillStyle='rgba(230,255,170,.8)';c.beginPath();c.arc(x+(R()-.5)*s,y,1.3,0,7);c.fill()}}
  c.restore();
  /* ปุ่มรากตามขอบ */for(let k=0;k<9;k++){const u=.08+R()*.84,sd=R()<.5?-1:1,[px,py]=pt(u,sd*hw*.98),r2=4+R()*5;c.fillStyle=sd<0?'#8a6646':'#3e2818';c.beginPath();c.ellipse(px,py,r2*1.3,r2*.8,a,0,7);c.fill();c.strokeStyle='#1e120a';c.lineWidth=1.2;c.stroke()}}
/* ปมราก: รากหลายสิบเส้นสานกันเป็นลาน · ขอบใต้เห็นความหนาเป็นมัดราก · รากฝอยห้อยลงความว่าง */
function pzKnot(c,K,i,cg){const R=gxRng(5200+i),{x,y,rx,ry}=K,TH=26;
  /* รากฝอยห้อยจากขอบล่าง */for(let k=0;k<40;k++){const q=.1+R()*(Math.PI-.2),ex=x+Math.cos(q)*rx*.97,ey=y+Math.sin(q)*ry*.97+TH,L=30+R()*120,sw=(R()-.5)*40,w=1.6+R()*3.4;c.strokeStyle='rgba(40,26,16,.92)';c.lineWidth=w;c.beginPath();c.moveTo(ex,ey-4);c.bezierCurveTo(ex+sw*.3,ey+L*.35,ex+sw,ey+L*.65,ex+sw*.6,ey+L);c.stroke();if(R()<.3)cg(ex+sw*.6,ey+L,7,R()<.6?'255,190,90':'190,160,255',.5)}
  /* ความหนา: มัดรากด้านข้าง */c.fillStyle='#24180e';c.beginPath();c.ellipse(x,y+TH,rx,ry,0,0,7);c.fill();
  c.save();c.beginPath();c.ellipse(x,y+TH,rx,ry,0,0,7);c.clip();for(let k=0;k<70;k++){const q=k/70*Math.PI,ex=x+Math.cos(q)*rx,ey=y+Math.sin(q)*ry;c.strokeStyle=k%3?'#3a2616':'#4e3420';c.lineWidth=7+R()*7;c.beginPath();c.moveTo(ex-3,ey-6);c.quadraticCurveTo(ex+(R()-.5)*10,ey+TH*.5,ex+(R()-.5)*8,ey+TH+4);c.stroke()}c.restore();
  /* ผิวบน */const gr=c.createRadialGradient(x-rx*.25,y-ry*.35,10,x,y,Math.max(rx,ry));gr.addColorStop(0,'#7a5a3c');gr.addColorStop(.7,'#5a4028');gr.addColorStop(1,'#3e2a18');c.fillStyle=gr;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();
  c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.clip();
  /* รากสานไขว้กัน */const n=16+((rx/30)|0);for(let k=0;k<n;k++){const a0=R()*6.2832,a1=a0+Math.PI+(R()-.5)*1.3,sx=x+Math.cos(a0)*rx*1.1,sy=y+Math.sin(a0)*ry*1.1,ex=x+Math.cos(a1)*rx*1.1,ey=y+Math.sin(a1)*ry*1.1,mx=x+(R()-.5)*rx*.7,my=y+(R()-.5)*ry*.7,w=14+R()*20;
    c.strokeStyle='rgba(16,10,6,.55)';c.lineWidth=w+7;c.beginPath();c.moveTo(sx,sy+3);c.quadraticCurveTo(mx,my+3,ex,ey+3);c.stroke();
    c.strokeStyle=k%3===0?'#6e4e32':k%3===1?'#5e4228':'#7a5a3a';c.lineWidth=w;c.beginPath();c.moveTo(sx,sy);c.quadraticCurveTo(mx,my,ex,ey);c.stroke();
    c.strokeStyle='rgba(30,18,8,.4)';c.lineWidth=1.4;for(const o of[-.25,.2]){c.beginPath();c.moveTo(sx,sy+w*o);c.quadraticCurveTo(mx,my+w*o,ex,ey+w*o);c.stroke()}
    c.strokeStyle='rgba(236,200,150,.16)';c.lineWidth=w*.3;c.beginPath();c.moveTo(sx,sy-w*.22);c.quadraticCurveTo(mx,my-w*.22,ex,ey-w*.22);c.stroke();
    if(R()<.3){c.strokeStyle='rgba(255,170,80,.28)';c.lineWidth=1.6;c.beginPath();c.moveTo(sx,sy);c.quadraticCurveTo(mx,my,ex,ey);c.stroke()}}
  /* มอส + จุดเรือง + เห็ดเล็ก */for(let k=0;k<20;k++){const q=R()*6.2832,rr=Math.sqrt(R())*.9,px=x+Math.cos(q)*rx*rr,py=y+Math.sin(q)*ry*rr,s=8+R()*16;c.fillStyle=R()<.5?'rgba(96,146,66,.72)':'rgba(70,118,50,.72)';c.beginPath();c.ellipse(px,py,s,s*.5,0,0,7);c.fill();c.fillStyle='rgba(190,235,140,.3)';c.beginPath();c.ellipse(px-s*.2,py-s*.15,s*.45,s*.2,0,0,7);c.fill()}
  for(let k=0;k<14;k++){const q=R()*6.2832,rr=Math.sqrt(R())*.85,px=x+Math.cos(q)*rx*rr,py=y+Math.sin(q)*ry*rr;cg(px,py,8,R()<.6?'210,255,140':'200,170,255',.38);c.fillStyle='rgba(245,255,200,.9)';c.fillRect(px-.8,py-.8,1.6,1.6)}
  /* ลานปล่องราก: วงแสงอำพันจากปล่องเหนือหัว */if(i===0){cg(x,y-10,rx*.8,'255,190,110',.13);for(let k=0;k<9;k++){const a=k/9*6.2832,L=rx*.7;c.strokeStyle='rgba(30,18,8,.5)';c.lineWidth=10;c.beginPath();c.moveTo(x+Math.cos(a)*30,y+Math.sin(a)*18);c.quadraticCurveTo(x+Math.cos(a+.5)*L*.5,y+Math.sin(a+.5)*L*.3,x+Math.cos(a+.8)*L,y+Math.sin(a+.8)*L*.55);c.stroke()}}
  /* ขอบในมืดลง */c.strokeStyle='rgba(16,10,6,.35)';c.lineWidth=26;c.beginPath();c.ellipse(x,y+5,rx,ry,0,0,7);c.stroke();
  c.restore();
  /* ปมรากใหญ่ (จุดผูกเชือก): ก้อนรากบิดเกลียวนูนขึ้นมา */const ji=i>=1&&i<=5?i-1:-1;if(ji>=0){const[jx,jy]=PZJ[ji];
    c.fillStyle='rgba(10,6,4,.5)';c.beginPath();c.ellipse(jx+4,jy+10,64,26,0,0,7);c.fill();
    for(let k=0;k<11;k++){const a=k/11*6.2832+R()*.3,L=46+R()*30;c.strokeStyle='#3a2616';c.lineWidth=12;c.beginPath();c.moveTo(jx+Math.cos(a)*16,jy+Math.sin(a)*7);c.quadraticCurveTo(jx+Math.cos(a+.4)*L*.6,jy+Math.sin(a+.4)*L*.3,jx+Math.cos(a+.6)*L,jy+Math.sin(a+.6)*L*.45);c.stroke();c.strokeStyle='#7a5838';c.lineWidth=7;c.stroke()}
    for(let r2=40;r2>8;r2-=8){c.fillStyle=r2%16?'#6e4e32':'#583e26';c.beginPath();c.ellipse(jx,jy-(40-r2)*.35,r2*1.25,r2*.62,0,0,7);c.fill();c.strokeStyle='rgba(20,12,6,.55)';c.lineWidth=1.6;c.beginPath();c.ellipse(jx,jy-(40-r2)*.35,r2*1.25,r2*.62,.3,.4,2.8);c.stroke()}
    c.strokeStyle='rgba(255,180,90,.4)';c.lineWidth=1.6;for(let k=0;k<3;k++){c.beginPath();c.arc(jx,jy-12,14+k*8,3.6+k*.3,5.6+k*.3);c.stroke()}cg(jx,jy-10,40,'255,180,90',.12)}}
/* ลานเท้าธรณิน: ก้อนหินก้อนสุดท้ายของโลก · รากจากสะพานคลานขึ้นไปพันขาเขา */
function pzLedge(c,K,i,cg){const R=gxRng(5260),{x,y,rx,ry}=K,TH=60;
  c.fillStyle='rgba(0,0,0,.5)';c.beginPath();c.ellipse(x+12,y+TH+40,rx*1.02,ry*.8,0,0,7);c.fill();
  /* หน้าผาด้านใต้ (ชั้นหิน) */c.fillStyle='#2a2420';c.beginPath();c.ellipse(x,y+TH,rx,ry,0,0,7);c.fill();
  c.save();c.beginPath();c.ellipse(x,y+TH,rx,ry,0,0,7);c.clip();for(let k=0;k<5;k++){c.strokeStyle=k%2?'#3a322a':'#4a4036';c.lineWidth=10;c.beginPath();c.ellipse(x,y+14+k*11,rx,ry,0,.05,Math.PI-.05);c.stroke()}
    for(let k=0;k<40;k++){const q=.1+R()*(Math.PI-.2),ex=x+Math.cos(q)*rx,ey=y+Math.sin(q)*ry+10;c.strokeStyle='rgba(14,10,8,.6)';c.lineWidth=1.4;c.beginPath();c.moveTo(ex,ey);c.lineTo(ex+(R()-.5)*6,ey+TH*.8);c.stroke()}c.restore();
  /* ผิวหิน */{const gr=c.createRadialGradient(x-rx*.2,y-ry*.4,20,x,y,rx);gr.addColorStop(0,'#5e564c');gr.addColorStop(.6,'#48403a');gr.addColorStop(1,'#34302a');c.fillStyle=gr;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill()}
  c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.clip();
  /* แผ่นหินแตกเป็นเหลี่ยม */for(let k=0;k<26;k++){const px=x+(R()-.5)*rx*1.9,py=y+(R()-.5)*ry*1.9,s=26+R()*40;c.fillStyle=R()<.5?'rgba(110,100,88,.22)':'rgba(20,16,12,.2)';c.beginPath();for(let q=0;q<6;q++){const a=q/6*6.2832+R()*.4,rr=s*(.7+R()*.4);c.lineTo(px+Math.cos(a)*rr,py+Math.sin(a)*rr*.55)}c.closePath();c.fill();c.strokeStyle='rgba(16,12,10,.45)';c.lineWidth=1.4;c.stroke()}
  /* เงาร่างธรณินบนลาน */cg(x,y-ry*.75,rx*.85,'0,0,0',.42);
  /* รอยร้าวเรืองจากใต้เข่า */for(const[sx,sy]of[[1338,1100],[1886,1095]]){let px=sx,py=sy;c.strokeStyle='rgba(16,8,4,.85)';c.lineWidth=3;c.beginPath();c.moveTo(px,py);const P=[[px,py]];for(let k=0;k<6;k++){px+=(R()-.5)*60;py+=12+R()*22;c.lineTo(px,py);P.push([px,py])}c.stroke();c.strokeStyle='rgba(255,140,60,.5)';c.lineWidth=1.2;c.beginPath();P.forEach(([a,b],k)=>k?c.lineTo(a,b):c.moveTo(a,b));c.stroke();for(const[a,b]of P)cg(a,b,10,'255,140,60',.12)}
  /* มอสในซอกหิน */for(let k=0;k<16;k++){const px=x+(R()-.5)*rx*1.7,py=y+(R()-.3)*ry*1.4,s=8+R()*16;c.fillStyle='rgba(84,128,60,.6)';c.beginPath();c.ellipse(px,py,s,s*.45,0,0,7);c.fill()}
  c.restore();
  /* รากจากสะพานทั้งสามคลานขึ้นลานไปพันขาธรณิน */for(const[sx,sy,tx,ty,w]of[[1600,1430,1600,1120,30],[1570,1420,1380,1110,20],[1630,1420,1840,1110,20],[1210,1300,1350,1112,22],[1990,1300,1870,1106,22],[1240,1330,1460,1130,14],[1960,1330,1740,1126,14]]){const mx=(sx+tx)/2+(R()-.5)*60,my=(sy+ty)/2+(R()-.5)*30;
    for(const[lw,col,o]of[[w+8,'rgba(10,6,4,.45)',4],[w,'#4a3220',0],[w*.55,'#6e4e32',-1],[w*.18,'rgba(230,190,140,.22)',-w*.25]]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(sx,sy+o);c.quadraticCurveTo(mx,my+o,tx,ty+o);c.stroke()}
    c.strokeStyle='rgba(255,170,80,.3)';c.lineWidth=1.6;c.beginPath();c.moveTo(sx,sy);c.quadraticCurveTo(mx,my,tx,ty);c.stroke()}
  /* ขอบลาน */c.strokeStyle='rgba(220,200,170,.2)';c.lineWidth=2;c.beginPath();c.ellipse(x,y-2,rx-3,ry-3,0,Math.PI*.05,Math.PI*.95);c.stroke()}
/* ---------- ของประกอบฉาก ---------- */
function pzBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;const R=gxRng(4545);
  const ok=(x,y,m,sf)=>pzK(x,y,44+m)>=0&&(sf||!pzSafe(x,y))&&pzOnB(x,y,-28-m)<0&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>90+m)&&PZJ.every(([jx,jy])=>Math.hypot(x-jx,y-jy)>100+m)&&Math.hypot(x-M.sx,y-M.sy)>M.sr+60&&Math.hypot(x-PZNPC.x,y-PZNPC.y)>150&&Math.hypot(x-PZTHU.x,y-PZTHU.y)>90&&Math.hypot(x-PZGATE.x,y-PZGATE.y)>120&&Math.abs(x-1600)>60;
  trees.push({x:PZTH.x,y:PZTH.y,r:0,k:'pzthr',ht:1100,hw:560,ns:1,nc:1});try{thrSpr()}catch(e){}
  trees.push({x:PZTHU.x,y:PZTHU.y,r:0,k:'pzthu',ht:60,ns:1,nc:1});trees.push({x:PZGATE.x,y:PZGATE.y-8,r:0,k:'pzlift',ht:300,ns:1,nc:1});
  PZJ.forEach(([x,y],i)=>trees.push({x,y,r:0,k:'pzjn',v:i,ht:920,hw:60,ns:1,nc:1}));
  /* หินที่ร่วงจากฐานแผ่นดิน (ชนได้) · ผลึกความว่าง · เห็ดเรือง · ฝักยางอำพัน */
  for(let i=0,n=0;i<3000&&n<12;i++){const x=500+R()*2200,y=1100+R()*1800;if(!ok(x,y,10))continue;trees.push({x,y,r:18,k:'pzrock',v:(R()*3)|0,sc:.8+R()*.5,ht:60,hw:34});n++}
  for(let i=0,n=0;i<3000&&n<16;i++){const x=500+R()*2200,y=1100+R()*1800;if(!ok(x,y,0,1))continue;trees.push({x,y,r:12,k:'pzcry',v:(R()*3)|0,sc:.7+R()*.6,ht:80,hw:30});n++}
  for(let i=0,n=0;i<3000&&n<10;i++){const x=500+R()*2200,y=1100+R()*1800;if(!ok(x,y,0))continue;trees.push({x,y,r:12,k:'pbmush',v:(R()*3)|0,sc:.6+R()*.4,ht:100,hw:36});n++}
  for(let i=0,n=0;i<3000&&n<26;i++){const x=500+R()*2200,y=1100+R()*1800;if(!ok(x,y,-30,1))continue;trees.push({x,y,r:0,k:'pbshroom',v:(R()*4)|0,sc:.7+R()*.6,ht:24,nc:1});n++}
  for(let i=0,n=0;i<3000&&n<12;i++){const x=500+R()*2200,y=1100+R()*1800;if(!ok(x,y,-20,1))continue;trees.push({x,y,r:0,k:'pzpod',v:i,sc:.8+R()*.5,ht:60,ns:1,nc:1});n++}
  /* โคมเห็ดที่ธุลีปักไว้ทางเดินหลัก (หลังลงมาแล้ว) */for(const[x,y]of[[1652,2420],[1548,2140],[1652,1660],[1548,1500],[1680,1230],[1520,2610]])trees.push({x,y,r:0,k:'pblamp',v:(x+y)|0,ht:80,ns:1,nc:1});
  PZN.ff=[];for(let i=0;i<70;i++){const x=300+R()*2600,y=600+R()*2500;PZN.ff.push([x,y,R()*6,R()])}
  PZN.sp=[];for(let i=0;i<46;i++)PZN.sp.push([R()*3200,R()*3200,R()*6,R()]);
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc||t.r<=0)return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
Object.assign(PALK,{
 pzthr(t,T){const n=pzTiedN(),tr=p6Past('pa4c')?1:p6Past('pa4t')?.3:Math.max(.35,1-n*.13);try{thrDraw(t.x,t.y,T,{tired:tr})}catch(e){}
  /* เชือกคำมั่นที่ผูกแล้ว: แสงวิ่งขึ้นไปตามแขน */if(n>0&&!LOWQ){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<n;k++){const u=(T*.18+k/n)%1,s=k%2?1:-1;glowAt(t.x+s*(240+u*100),t.y-590-u*300,14,'255,210,140',.35*Math.sin(u*Math.PI))}g.restore()}},
 pzthu(t,T){const N=MAPS[45]&&MAPS[45].npc2;if(!N||N.x<0)return;const f=me.x<N.x?-1:1;try{NPC3[43].d(N.x,N.y,f,T)}catch(e){try{thuD0(N.x,N.y,f,T)}catch(e2){}}npvLbl(N.n,N.x,N.y-44,'#c8f0a8');try{npcSay('thu45',N.x,N.y,p6Past('pa4c')?PZTHU2:PZTHUSAY,190,50)}catch(e){}},
 pzlift(t,T){const x=t.x,y=t.y,sw=Math.sin(T*.8)*3,rg=g.createLinearGradient(0,y-300,0,y-40);rg.addColorStop(0,'rgba(120,90,60,0)');rg.addColorStop(.55,'rgba(120,90,60,.85)');rg.addColorStop(1,'rgba(120,90,60,.95)');g.strokeStyle=rg;g.lineWidth=3;for(const s of[-26,26]){g.beginPath();g.moveTo(x+s*.4,y-300);g.lineTo(x+s+sw,y-30);g.stroke()}
  g.fillStyle='#6a4c30';g.beginPath();g.moveTo(x-34+sw,y-32);g.lineTo(x+34+sw,y-32);g.lineTo(x+28+sw,y+4);g.lineTo(x-28+sw,y+4);g.closePath();g.fill();g.strokeStyle='#3a2616';g.lineWidth=1.6;g.stroke();
  g.strokeStyle='rgba(160,120,80,.8)';g.lineWidth=1.4;for(let k=0;k<4;k++){g.beginPath();g.moveTo(x-32+sw,y-26+k*8);g.lineTo(x+32+sw,y-26+k*8);g.stroke()}for(let k=0;k<7;k++){g.beginPath();g.moveTo(x-28+k*9.4+sw,y-32);g.lineTo(x-26+k*8.6+sw,y+4);g.stroke()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-250,60,'255,190,110',.1);g.restore()},
 pzjn(t,T){const i=t.v,x=t.x,y=t.y,st=stCur(),q=me.sty,act=!!(st&&st.pa4t&&q&&q.a===1),tied=pzTied(i);
  if(!tied){if(!act)return;/* ม้วนเชือกรอผูก */const C=PZJC[i];g.save();g.strokeStyle=C[0];g.lineWidth=4;for(let k=0;k<4;k++){g.beginPath();g.ellipse(x+30,y+4-k*3,16-k*1.5,6-k*.5,0,0,7);g.stroke()}g.strokeStyle=C[1];g.lineWidth=1.2;g.setLineDash([3,4]);g.beginPath();g.ellipse(x+30,y-5,13,5,0,0,7);g.stroke();g.setLineDash([]);g.restore();
   if(PZS.jp!==i){const b=Math.sin(T*3+i)*3;g.font='16px system-ui';g.textAlign='center';g.fillText('🪢',x,y-58+b)}return}
  const C=PZJC[i],sw=Math.sin(T*.7+i)*5,top=y-360,gl=PZS.gl[i]?Math.max(0,1-(T-PZS.gl[i])/1.8):0;
  const path=()=>{g.beginPath();g.moveTo(x,y-14);g.bezierCurveTo(x+sw*.3,y-120,x+sw,y-240,x+sw*1.3,top)};
  g.save();g.lineCap='round';
  if(C[2]===1){/* โซ่ */for(let k=0;k<26;k++){const u=k/26,yy=y-14-(y-14-top)*u,xx=x+sw*1.3*u*u,al=Math.max(0,1-u*1.1);if(al<=0)break;g.globalAlpha=al;g.strokeStyle=k%2?C[1]:C[0];g.lineWidth=3;g.beginPath();g.ellipse(xx,yy,k%2?2.4:5,k%2?7:6,0,0,7);g.stroke()}g.globalAlpha=1}
  else{const gr=g.createLinearGradient(0,y,0,top);gr.addColorStop(0,C[0]);gr.addColorStop(.4,C[0]);gr.addColorStop(1,'rgba(0,0,0,0)');g.strokeStyle=(()=>{const q=g.createLinearGradient(0,y,0,top);q.addColorStop(0,'rgba(0,0,0,.4)');q.addColorStop(1,'rgba(0,0,0,0)');return q})();g.lineWidth=C[2]===2?5:10;path();g.stroke();g.strokeStyle=gr;g.lineWidth=C[2]===2?3:7;path();g.stroke();
   const g2=g.createLinearGradient(0,y,0,top);g2.addColorStop(0,C[1]);g2.addColorStop(.35,C[1]);g2.addColorStop(1,'rgba(0,0,0,0)');g.strokeStyle=g2;g.lineWidth=C[2]===2?1.2:2;g.setLineDash(C[2]===2?[]:[5,6]);g.lineDashOffset=-T*6;path();g.stroke();g.setLineDash([])}
  if(C[2]===2){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<7;k++){const u=((T*.06+k/7)%1),yy=y-14-(y-14-top)*u,xx=x+sw*1.3*u*u;glowAt(xx,yy,9,'190,210,255',.6*(1-u))}g.restore()}
  /* ปมผูกที่โคน */g.strokeStyle=C[0];g.lineWidth=6;for(let k=0;k<3;k++){g.beginPath();g.ellipse(x,y-18+k*5,22-k*2,8,0,0,7);g.stroke()}g.strokeStyle=C[1];g.lineWidth=1.4;g.beginPath();g.ellipse(x,y-13,20,7,0,0,7);g.stroke();
  if(i===0){g.fillStyle='#d84a2a';g.beginPath();g.moveTo(x+18,y-20);g.lineTo(x+34,y-30);g.lineTo(x+32,y-12);g.closePath();g.fill();g.fillStyle='#f0c060';g.beginPath();g.arc(x+26,y-21,2.6,0,7);g.fill()}
  if(i===4){g.save();g.globalCompositeOperation='lighter';glowAt(x+22,y-24,16,'200,220,255',.6);g.restore();g.fillStyle='#fff';g.font='10px system-ui';g.textAlign='center';g.fillText('🎀',x+22,y-20)}
  if(gl>0){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const u=Math.min(1,(1-gl)*1.4+k*.1);glowAt(x+sw*1.3*u*u,y-14-(y-14-top)*u,30-k*6,'255,230,170',.7*gl)}glowAt(x,y-16,70,'255,220,150',.45*gl);g.restore()}
  g.restore()},
 pzrock(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0;PALSH(x,y+4,30*s,9*s,.5);const R=gxRng(5400+((x*3+y)|0));g.fillStyle=['#5a5248','#4e463e','#625a50'][v];g.beginPath();for(let k=0;k<9;k++){const a=k/9*6.2832,rr=(22+R()*8)*s;g.lineTo(x+Math.cos(a)*rr*1.1,y-14*s+Math.sin(a)*rr*.75)}g.closePath();g.fill();g.strokeStyle='#1e1a16';g.lineWidth=1.4;g.stroke();
  g.fillStyle='rgba(220,200,170,.2)';g.beginPath();g.ellipse(x-6*s,y-24*s,12*s,5*s,-.3,0,7);g.fill();g.strokeStyle='rgba(20,14,10,.6)';g.lineWidth=1.2;g.beginPath();g.moveTo(x-8*s,y-20*s);g.lineTo(x+2*s,y-10*s);g.lineTo(x+10*s,y-16*s);g.stroke();
  if(v===1){g.fillStyle='rgba(84,128,60,.7)';g.beginPath();g.ellipse(x+4*s,y-30*s,10*s,3.6*s,0,0,7);g.fill()}},
 pzcry(t,T){const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,C=[['190,150,255','#c8a8ff','#6a4ac0'],['140,170,255','#a8c0ff','#3a5ab0'],['230,170,255','#e8b8ff','#8a3ab0']][v],pu=.6+.4*Math.sin(T*1.6+x);PALSH(x,y+3,22*s,7*s,.45);
  for(const[dx,h,w,a]of[[-10,34,7,-.35],[8,44,8,.25],[0,58,10,0],[16,26,6,.5],[-18,22,5,-.6]]){g.save();g.translate(x+dx*s,y);g.rotate(a);const gr=g.createLinearGradient(-w*s,0,w*s,0);gr.addColorStop(0,C[2]);gr.addColorStop(.5,C[1]);gr.addColorStop(1,C[2]);g.fillStyle=gr;g.beginPath();g.moveTo(-w*s,0);g.lineTo(-w*.7*s,-h*s);g.lineTo(0,-(h+w*1.2)*s);g.lineTo(w*.7*s,-h*s);g.lineTo(w*s,0);g.closePath();g.fill();g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1;g.beginPath();g.moveTo(-w*.2*s,-2);g.lineTo(-w*.1*s,-h*s);g.stroke();g.restore()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-30*s,44*s,C[0],.3*pu);g.restore()},
 pzpod(t,T){const x=t.x,y=t.y,s=t.sc||1,sw=Math.sin(T*1.2+t.v)*2,pu=.6+.4*Math.sin(T*2+t.v);g.strokeStyle='#3a2616';g.lineWidth=3*s;g.beginPath();g.moveTo(x-6*s,y);g.quadraticCurveTo(x-10*s,y-20*s,x+sw,y-34*s);g.stroke();
  g.fillStyle='#8a5a28';g.beginPath();g.ellipse(x+sw,y-44*s,9*s,13*s,0,0,7);g.fill();g.fillStyle='rgba(255,196,96,'+(.55+.35*pu)+')';g.beginPath();g.ellipse(x+sw,y-44*s,6*s,9.5*s,0,0,7);g.fill();g.strokeStyle='rgba(90,50,20,.6)';g.lineWidth=1;g.beginPath();g.moveTo(x+sw,y-56*s);g.lineTo(x+sw,y-32*s);g.stroke();
  g.save();g.globalCompositeOperation='lighter';glowAt(x+sw,y-44*s,26*s,'255,180,80',.35*pu);g.restore()}});
const PZTHUSAY=['ธรณินตัวใหญ่กว่าในเพลงกล่อมตั้งร้อยเท่า…','ทุกครั้งที่ท่านหายใจ ตาข่ายรากหายใจตาม','อย่ามองลงไปในความว่างนานนะ… มันจะมองกลับมา','ข้าจะแขวนโคมดวงสุดท้ายไว้ที่นิ้วเท้าของท่าน'],
  PZTHU2=['…ท่านจะไม่วางมันลงใช่ไหม ธรณิน','ข้าจะไม่ยอมให้ท่านปล่อยมือ','ข้างบนทุกคนกำลังดึงเชือกอยู่นะ ข้ารู้สึกได้'],
  PZTHR1=['…หนัก…','สามร้อยปี… หรือสามพันปี…','อย่าเหยียบนิ้วข้าล่ะ… มันชาไปนานแล้ว','เสียงฝีเท้าข้างบน… ดังขึ้นทุกวัน'],
  PZTHR2=['เชือกพวกนั้น… อุ่นจัง','ข้างบนมีคนนับจังหวะดึงทุกคืน','เบาลงนิดเดียว… แต่ข้ารู้สึกได้'],
  PZTHR3=['ปล่อยให้ร่วงเถิด…','ข้าเหนื่อยเหลือเกิน…','ราชินีตายแล้ว… แต่รอยกัดยังอยู่'];
/* ---------- เอฟเฟกต์บนพื้น ---------- */
function pzGroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();
  /* รัง: แสงม่วงจากรู */(MAPS[45].nests||[]).forEach(([x,y],i)=>{if(!palVis(x,y,90))return;g.save();g.globalCompositeOperation='lighter';glowAt(x,y+2,40,'190,140,255',.12+.08*Math.sin(T*1.7+i));g.restore()});
  g.globalCompositeOperation='lighter';
  /* ชีพจรอำพันวิ่งตามสะพานไปหาธรณิน (ตาข่ายช่วยแบก) */PZB.forEach((b,i)=>{const[x0,y0,x1,y1]=b,fw=y1<y0,sx=fw?x0:x1,sy=fw?y0:y1,ex=fw?x1:x0,ey=fw?y1:y0;if(!palVis((x0+x1)/2,(y0+y1)/2,Math.hypot(x1-x0,y1-y0)/2+40))return;const n=Q?1:2;for(let k=0;k<n;k++){const u=(T*.16+k/n+i*.13)%1;glowAt(sx+(ex-sx)*u,sy+(ey-sy)*u,10,'255,190,100',.4*Math.sin(u*Math.PI))}});
  /* ประกายความว่างลอยขึ้นจากเบื้องล่าง */for(const[x,y0,ph,s]of PZN.sp){const q=((T*(.04+s*.03)+ph)%1),y=y0-q*600,x2=x+Math.sin(T*.5+ph*3)*16;if(!palVis(x2,y,8)||pzIn(x2,y,-30))continue;glowAt(x2,y,3+s*2.4,'190,160,255',.6*Math.sin(q*Math.PI))}
  for(const[x,y,ph,s]of PZN.ff){if(!palVis(x,y,20)||!pzIn(x,y,0))continue;const q=Math.sin(T*1.3+ph);if(q<.3)continue;glowAt(x+Math.sin(T*.6+ph)*14,y-14+Math.cos(T*.8+ph)*8,3.6,s<.5?'210,255,150':'255,210,140',(q-.3)*.9)}
  g.globalCompositeOperation='source-over';
  /* วงเตือนหินร่วง */for(const w of PZS.warn){const k=1-w.t/w.d;g.strokeStyle='rgba(255,220,150,'+(.4+.5*k)+')';g.lineWidth=2.4;g.beginPath();g.ellipse(w.x,w.y,52,21,0,0,7);g.stroke();g.fillStyle='rgba(0,0,0,'+(.15+.35*k)+')';g.beginPath();g.ellipse(w.x,w.y,40*k+8,15*k+3,0,0,7);g.fill()}
  /* ความว่างดึงกลับ */if(PZS.pull){const k=(T-PZS.pull.t)/.8;if(k>=1)PZS.pull=null;else{g.strokeStyle='rgba(190,160,255,'+(.8*(1-k))+')';g.lineWidth=3;g.beginPath();g.ellipse(PZS.pull.x,PZS.pull.y,20+k*60,8+k*24,0,0,7);g.stroke()}}
  /* วงผูกเชือกที่ปมราก */{const st=stCur(),q=me.sty;if(st&&st.pa4t&&q&&q.a===1){for(let i=0;i<5;i++){if((q.pa4t|0)>>i&1)continue;const[x,y]=PZJ[i];if(!palVis(x,y,120))continue;const pu=.6+.4*Math.sin(T*3+i),me_=PZS.jp===i;
      g.strokeStyle=me_&&PZS.blk?'rgba(255,120,90,'+(.6+.3*pu)+')':'rgba(255,214,140,'+(.45+.35*pu)+')';g.lineWidth=2.4;g.setLineDash([10,7]);g.beginPath();g.ellipse(x,y+2,78,40,0,0,7);g.stroke();g.setLineDash([]);
      if(me_){const p=Math.min(1,PZS.jt/3);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-62,13,0,7);g.stroke();g.strokeStyle=PZS.blk?'#ff9a7a':'#ffd06a';g.lineWidth=3.6;g.beginPath();g.arc(x,y-62,13,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke();
        if(PZS.blk){g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,10,6,.85)';g.strokeText('⚔️ ไล่มอนรอบปมก่อน',x,y-86);g.fillStyle='#ffb8a0';g.fillText('⚔️ ไล่มอนรอบปมก่อน',x,y-86)}}}}}
  g.restore()}
/* หินร่วง (วาดทับตัวละคร): ก้อนหินดิ่งลงมาหาวงเตือน */
function pzFallDraw(){if(curMap!==45||!PZS.warn.length)return;g.save();for(const w of PZS.warn){const k=1-w.t/w.d,yy=w.y-(1-k)*(1-k)*420-14,s=9+(w.s%5);g.globalAlpha=Math.min(1,k*3);g.fillStyle='#5a5248';g.beginPath();g.ellipse(w.x,yy,s*1.2,s,k*3,0,7);g.fill();g.strokeStyle='#1e1a16';g.lineWidth=1.2;g.stroke();g.fillStyle='rgba(220,200,170,.3)';g.beginPath();g.ellipse(w.x-s*.3,yy-s*.35,s*.5,s*.25,0,0,7);g.fill();
  g.strokeStyle='rgba(200,190,170,'+(.3*k)+')';g.lineWidth=2;g.beginPath();g.moveTo(w.x,yy-s);g.lineTo(w.x,yy-s-40*k);g.stroke()}g.restore()}
/* ทับจอ: ขอบจอม่วงมืด · ฝุ่นร่วงจากฐานแผ่นดิน · แสงวาบตอนหินกระแทก */
function pzScreen(T,z,Hs){const Q=LOWQ;g.save();
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.3,SW0/2,Hs/2,Math.max(SW0,Hs)*.78);vg.addColorStop(0,'rgba(10,6,16,0)');vg.addColorStop(1,'rgba(10,6,16,.6)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  const n=Q?12:28;for(let i=0;i<n;i++){const R=depRng(i*47+19),x=((R()*SW0+Math.sin(T*.4+i)*14)%SW0+SW0)%SW0,y=((R()*Hs+T*(14+R()*22))%(Hs+20))-10,tw=.4+.6*Math.abs(Math.sin(T*(1+R())+i));g.fillStyle='rgba(200,180,150,'+(.3*tw)+')';g.fillRect(x,y,1.5,1.5+R()*2)}
  if(!Q){for(let i=0;i<3;i++){const R=depRng(i*13+5),per=3+R()*4,q=((T+R()*per)%per)/per,x=R()*SW0;if(q<.35){g.strokeStyle='rgba(180,170,150,'+(.5*(1-q/.35))+')';g.lineWidth=1.2;g.beginPath();g.moveTo(x,q/.35*Hs-30);g.lineTo(x,q/.35*Hs);g.stroke()}}}
  if(PZS.fl>0){g.fillStyle='rgba(120,100,80,'+Math.min(.28,PZS.fl)+')';g.fillRect(0,0,SW0,Hs)}
  g.restore()}
/* ---------- ติ๊ก ---------- */
function pzTick(dt,now,x,y,mv){const T=performance.now()/1000;
  if(pzIn(x,y,-4)){PZS.lx=x;PZS.ly=y}else if(!pzIn(x,y,-18)&&me.down<=0){me.x=PZS.lx;me.y=PZS.ly;x=me.x;y=me.y;PZS.pull={x,y,t:T};if(T-PZS.pw>2.5){PZS.pw=T;try{dn.push({x:me.x,y:me.y-60,v:'🕳️ ความว่างดึงกลับ…',t:1.1,col:'#d0c0ff'})}catch(e){}}}
  PZS.fl=Math.max(0,PZS.fl-dt*1.6);
  for(const w of PZS.warn){w.t-=dt;if(w.t<=0&&!w.hit){w.hit=1;PZS.fl=.24;try{shk=Math.max(shk,.2)}catch(e){}try{sfx('boom')}catch(e){}try{burst(w.x,w.y-6,['#8a8478','#5a4a3a','#c8b8a0'],24,150,.8,{g:280})}catch(e){}
      if(Math.hypot(me.x-w.x,(me.y-w.y)*2.4)<54&&me.down<=0&&!gmGod&&!(me.inv3>0)){const d=Math.round(me.mh*.08);me.hp=Math.max(1,me.hp-d);try{mtCd=3}catch(e){}try{dn.push({x:me.x,y:me.y-60,v:'🪨 หินร่วงจากฐานแผ่นดิน!',t:1.2,col:'#ffc890'})}catch(e){}}}}
  PZS.warn=PZS.warn.filter(w=>!w.hit);
  if(!SD.on&&me.down<=0&&!pzSafe(x,y)&&pzIn(x,y,0)){PZS.mt-=dt;if(PZS.mt<=0){PZS.mt=5+Math.random()*3.5;for(let k=0;k<8;k++){const a=Math.random()*6.283,r=Math.random()<.4?0:50+Math.random()*190,bx=x+Math.cos(a)*r,by=y+Math.sin(a)*r*.7;if(pzIn(bx,by,14)&&!pzSafe(bx,by)){PZS.warn.push({x:bx,y:by,t:1.3,d:1.3,s:(Math.random()*1e4)|0});break}}}}
  /* ผูกเชือกคำมั่น */const st=stCur(),q=me.sty;
  if(st&&q&&q.a===1&&st.pa4t){let near=-1;for(let i=0;i<5;i++){if((q.pa4t|0)>>i&1)continue;const[jx,jy]=PZJ[i];if(Math.hypot(x-jx,(y-jy)*1.6)<78)near=i}
    if(near!==PZS.jp){PZS.jp=near;PZS.jt=0;PZS.blk=0}
    if(near>=0&&me.down<=0){const[jx,jy]=PZJ[near];PZS.blk=mons.some(m=>m.hp>0&&m.t<3&&!m.dum&&!m.pv&&!m.wb&&Math.hypot(m.x-jx,m.y-jy)<160)?1:0;
      if(PZS.blk)PZS.jt=Math.max(0,PZS.jt-dt*2);else{PZS.jt+=dt;if(PZS.jt>=3){q.pa4t=(q.pa4t|0)|(1<<near);let n=0;for(let k=0;k<5;k++)if(q.pa4t>>k&1)n++;q.n=n;PZS.gl[near]=T;PZS.jp=-1;PZS.jt=0;
        PALG.card={h:PZJN[near][0]+' · '+n+'/5',t:PZJN[near][1],s:now,d:11};try{sfx('quest')}catch(e){}try{burst(jx,jy-30,['#ffd890','#ffffff','#c8b0ff'],34,160,1,{glow:1,g:-60})}catch(e){}try{shk=Math.max(shk,.12)}catch(e){}try{stHud();writeSave()}catch(e){}}}}}
  else{PZS.jp=-1;PZS.jt=0;PZS.blk=0}}
/* มอนเดินบนตาข่าย (แมงกะพรุนลอยได้) */
function pzMons(){if(curMap!==45)return;for(const m of mons){if(m.t>=3||m.t===1||m.dum||m.pv||m.wb)continue;const px=m._px,py=m._py;if(px===undefined){m._px=m.x;m._py=m.y;continue}
  if(!pzIn(m.x,m.y,6)){if(pzIn(m.x,py,6))m.y=py;else if(pzIn(px,m.y,6))m.x=px;else if(pzIn(px,py,6)){m.x=px;m.y=py}}m._px=m.x;m._py=m.y}}
function pzAqT(st){const q=me.sty;if(!q||!st.pa4t)return null;const bits=q.pa4t|0,n=bits.toString(2).split('1').length-1;let b=-1,bd=1e9;for(let i=0;i<5;i++){if(bits>>i&1)continue;const[x,y]=PZJ[i],d=curMap===45?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b=i}}if(b<0)return null;
  const[x,y]=PZJ[b];return{mp:45,act:'reach',x,y:y+28,lb:'ไปผูกเชือกคำมั่นที่ปมรากใหญ่ ('+n+'/5)'}}
/* ประตู: ปล่องรากในห้องโถงราก (แมพ 44 → 45) · ตะกร้าขึ้น (แมพ 45 → 44) */
function pzGateDraw(G){const T=performance.now()/1000,x=G.x,y=G.y;g.save();
  if(G.pa===5){g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(x,y+5,58,22,0,0,7);g.fill();
    for(let k=0;k<12;k++){const a=k/12*6.2832;g.strokeStyle=k%2?'#4a3220':'#5e4228';g.lineWidth=9;g.beginPath();g.ellipse(x+Math.cos(a)*44,y+Math.sin(a)*16,12,5,a,0,7);g.stroke()}
    g.fillStyle='#07050a';g.beginPath();g.ellipse(x,y,40,14,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y+2,46,'170,130,255',.22+.1*Math.sin(T*1.6));g.restore();
    g.strokeStyle='rgba(200,170,120,.85)';g.lineWidth=1.5;for(const s of[-7,7]){g.beginPath();g.moveTo(x+s,y-12);g.lineTo(x+s*.6,y+10);g.stroke()}for(let k=0;k<3;k++){g.beginPath();g.moveTo(x-7+k*.8,y-8+k*6);g.lineTo(x+7-k*.8,y-8+k*6);g.stroke()}}
  else{const pu=.5+.5*Math.sin(T*2.2);g.strokeStyle='rgba(255,220,150,'+(.35+.25*pu)+')';g.lineWidth=2;g.setLineDash([9,7]);g.beginPath();g.ellipse(x,y+22,54,18,0,0,7);g.stroke();g.setLineDash([])}
  const lb=(G.pa===5?'⬇ ปล่องราก: ':'⬆ ขึ้นตะกร้า: ')+(G.nm||MAPS[G.to].n),ly=G.pa===5?y-34:y-70;g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,8,6,.85)';g.strokeText(lb,x,ly);g.fillStyle=G.pa===5?'#e0d0ff':'#e8f0d0';g.fillText(lb,x,ly);g.restore()}
/* ---------- เนื้อเรื่องภาค 10 บทที่ 4 ---------- */
Object.assign(SPK,{thr:['ธรณิน · ผู้แบกคนแรก','🗿','#d8c8a8'],thu45:SPK.thu});STNPC.thr=[45,'npc'];STNPC.thu45=[45,'npc2'];
STCH.push('ภาค 10 · บทที่ 4 · ราชินีกัดแผ่นดิน');
{const C4=STCH.length-1;STY.push(
 {c:C4,g:'talk',k:'ked',pa4s:1,tx:'คุยเฒ่าแก่นไม้ที่ห้องโถงราก (นครรากลึก)',
  pre:[['ked','(เฒ่าแก่นไม้ลุกขึ้นจากบัลลังก์ราก ไม่มีใครในนครเคยเห็นท่านยืนมาสิบปีแล้ว) …เสียงกัดแทะเมื่อคืน ไม่ได้มาจากย่านรอบนอก มันมาจากฐานแผ่นดิน'],
   ['ked','ข้างโคนแม่ไม้มีปล่องรากเก่า บรรพบุรุษของเราขุดลงไปหาธรณินเมื่อสามร้อยปีก่อน… แล้วก็ปิดตายไว้ เพราะไม่มีใครทนฟังเสียงครางของเขาได้'],
   ['thu44','ข้าจะลงไปด้วย! โคมเห็ดดวงสุดท้ายข้ายังเก็บไว้ ข้าจะเอาไปให้ธรณิน'],
   ['ked','(เฒ่าแก่นไม้แตะหน้าผากธุลีด้วยปลายไม้เท้า) เชือกคำมั่นจากแปดเมืองหย่อนลงมาถึงยอดแม่ไม้แล้ว… เอาปลายเชือกลงไปด้วย ผูกไว้กับรากที่ฐาน ให้ธรณินรู้ว่าคนข้างบนจับปลายอีกข้างไว้'],
   ['ked','💡 ปล่องรากอยู่ข้างโคนแม่ไม้ ฝั่งตะวันตกของห้องโถงราก · ลงไปสุดทางคือฐานแผ่นดิน']],rw:{g:180000}},
 {c:C4,g:'map',m:45,pa4m:1,tx:'ลงปล่องรากข้างโคนแม่ไม้ (ฝั่งตะวันตกของห้องโถงราก) ไปฐานแผ่นดิน',
  post:[['nar','ปล่องรากพาลงไปลึกจนแสงจากนครรากลึกเหลือเป็นจุดอำพันเล็ก ๆ… แล้วผนังปล่องก็หายไป เหลือแต่รากที่ทอดตัวข้ามความว่าง'],
   ['nar','ใต้แผ่นดินไม่มีพื้นดิน มีแต่ความมืดที่ไม่มีก้น… รากของต้นค้ำทุกต้นหยั่งลงมาถักกันเป็นตาข่ายขนาดมหึมา ทุกเส้นมุ่งไปทางเดียวกัน'],
   ['nar','และที่ปลายตาข่ายนั้น… มีภูเขาที่กำลังหายใจ'],
   ['nar','ยักษ์หินคุกเข่าอยู่บนก้อนหินก้อนสุดท้ายของโลก สองแขนชูขึ้นยันฐานแผ่นดินไว้เหนือหัว รากนับพันพันแขนพันไหล่ช่วยเขาแบก… เขาไม่ขยับมาสามร้อยปีแล้ว'],
   ['thu','(ธุลีกำโคมเห็ดดวงสุดท้ายแน่น เสียงสั่น) …ธรณิน ผู้แบกคนแรก ในเพลงกล่อมของเรา เขาเป็นแค่เรื่องเล่า'],
   ['me','(หน้าแข้งของเขามีรอยกัดเต็มไปหมด… บางรอยยังเรืองแดงเหมือนหินที่เพิ่งแตก)'],
   ['thu','💡 เดินได้แค่บนปมรากกับสะพานราก (ตกความว่างจะถูกดึงกลับ) · ระวังหินร่วงจากฐานแผ่นดิน · ลานปล่องรากกับลานเท้าธรณินปลอดภัย']]},
 {c:C4,g:'talk',k:'thr',pa4k:1,tx:'เดินข้ามตาข่ายรากไปคุยธรณินที่ลานเท้าธรณิน (ทางเหนือ)',
  pre:[['thr','(เสียงทุ้มต่ำดังมาจากทุกทิศ เหมือนแผ่นดินพูดเอง) …เสียงฝีเท้า… เบาจัง… ไม่ใช่เสียงกัด'],
   ['thr','สามร้อยปี… หรือสามพันปี… ข้านับไม่ไหวแล้ว ข้ารู้แค่ว่าตั้งแต่วันที่แผ่นดินร้าว ข้ายังไม่เคยวางมันลงเลยสักวินาที'],
   ['thu45','(ธุลียกโคมขึ้นสุดแขน) ท่านธรณิน! ข้าชื่อธุลี ข้าเกิดในโพรงชั้นสามของแม่ไม้… ข้าเอาโคมมาให้ท่าน'],
   ['thr','(ดวงตาอำพันคู่ใหญ่ค่อย ๆ ก้มลงมอง) …แม่ไม้… ต้นเล็ก ๆ ที่พวกเจ้าปลูกลงตรงรอยร้าว รากของมันมาถึงข้าเมื่อร้อยปีก่อน มันเป็นเพื่อนคนแรกที่มาช่วยแบก'],
   ['thr','วันหนึ่งข้ารู้สึกถึงหัวใจดวงหนึ่งกลับคืนสู่เทพ… แผ่นดินเบาลงนิดเดียว แต่ยางทองก็หยุดไหลลงมาหาข้า',0,1],
   ['thr','วันหนึ่งข้ารู้สึกถึงผนึกที่ปิดลงใต้แกนพิภพ… หัวใจครึ่งดวงอยู่ใกล้ข้าขึ้น แต่ยางทองก็ไหลมาช้าลงทุกปี',0,2],
   ['me','(…ข้าไม่เคยรู้เลยว่าทุกอย่างที่ข้าเลือกข้างบน ตกลงมาถึงข้างล่างนี้ด้วย)'],
   ['thr','ข้าไม่ได้โทษใคร… คนที่ยืนอยู่บนแผ่นดิน ไม่จำเป็นต้องรู้ว่าใครแบกมันอยู่ นั่นคือหน้าที่ของคนแบก'],
   ['thu45','แต่ตอนนี้เขารู้แล้ว! แปดเมืองให้คำมั่นว่าจะช่วยกันแบก! เชือกของพวกเขาหย่อนลงมาถึงแม่ไม้แล้ว!'],
   ['thr','(ยักษ์หินนิ่งไปนาน) …เชือก… จากข้างบน?'],
   ['thu45','ปลายเชือกอยู่กับเรา! ถ้าผูกไว้กับปมรากที่ใหญ่ที่สุดในตาข่าย น้ำหนักจะแบ่งขึ้นไปให้คนข้างบนช่วยดึง!'],
   ['thr','ถ้าเช่นนั้น… ผูกมันเถิด ปมรากใหญ่ทั้งห้าคือที่ที่รากของต้นค้ำมาบรรจบกัน… แต่ระวัง ลูก ๆ ของราชินีวนเวียนอยู่ทุกปม']],rw:{g:200000}},
 {c:C4,g:'clue',m:45,n:5,pa4t:1,tx:'ผูกเชือกคำมั่นที่ปมรากใหญ่ทั้ง 5 (ยืนในวงที่ป้าย 🪢 3 วิ · ถ้ามีมอนใกล้ปมต้องไล่ก่อน)',
  pre:[['thu45','ข้าถือปลายเชือกไว้หมดแล้ว! ห้าปม ห้าเชือก… ท่านยืนกดปมไว้ให้แน่น ข้าจะผูกเอง'],
   ['thu45','💡 ปมรากใหญ่มีวงทองกับป้าย 🪢 · ยืนในวง 3 วินาที · ถ้ามีมอนเข้ามาใกล้ปม ต้องไล่ให้หมดก่อน · ผูกแล้วเชือกจะตึงขึ้นไปในความมืด']],
  post:[['nar','ปมสุดท้ายถูกผูก… เชือกทั้งห้าตึงขึ้นไปในความมืดพร้อมกัน แล้วก็มีเสียงลอยลงมาตามเชือก — เสียงคนนับจังหวะ «หนึ่ง… สอง… ดึง!»'],
   ['nar','ฐานแผ่นดินเหนือหัวธรณินยกขึ้นนิดเดียว… นิดเดียวจริง ๆ แต่แขนทั้งสองของยักษ์หินคลายลงเป็นครั้งแรกในรอบสามร้อยปี'],
   ['thr','(เสียงสั่นเหมือนหินกำลังแตก) …เบา… มันเบาลง…'],
   ['nar','แล้วก็มีเสียงกรีดร้องดังขึ้นจากใต้เท้าของเขา… ทั้งตาข่ายสั่น ฝูงกัดแผ่นดินพรั่งพรูขึ้นมาจากทุกรอยแยก'],
   ['thu45','ราชินีโกรธ! มันรู้ว่าเชือกพวกนี้จะทำให้มันกัดไม่ทัน… มันส่งลูก ๆ มากัดเชือก!']],rw:{g:240000,s3:10}},
 {c:C4,g:'kill',m:45,n:40,tx:'ปกป้องเชือกคำมั่น: ขับไล่ปลวกศิลาทหาร แมงกะพรุนความว่าง และร่างรากซากในตาข่ายราก',
  post:[['nar','ฝูงสุดท้ายร่วงลงไปในความว่าง… เชือกทั้งห้ายังตึงอยู่'],
   ['thr','(ยักษ์หินคราง) …มันอยู่ใต้เท้าข้า… ราชินี มันกัดข้ามาตั้งแต่วันแรก ทุกวัน ทุกคืน…'],
   ['thu45','ข้ารู้ทางลงไปรังของมัน… ข้าได้ยินเสียงมันวางไข่มาทั้งชีวิต']],rw:{g:120000}},
 {c:C4,g:'pnq',k:'thu45',pa4d:1,tx:'คุยธุลีที่ลานเท้าธรณิน · ลงไปรังใต้เท้าขวาของธรณิน (ดันเจี้ยน «รังกัดแผ่นดิน»)',
  pre:[['thu45','รังของมันอยู่ใต้เท้าขวาของธรณิน… ตรงที่หินเรืองแดงที่สุด'],
   ['thr','อย่าไปเลย ลูก… ราชินีตัวนั้นกินหินมาสามร้อยปี มันใหญ่กว่าบ้านของพวกเจ้าทั้งหลัง'],
   ['me','(…ท่านแบกมาคนเดียวสามร้อยปี คืนนี้ให้คนข้างบนลงไปสู้แทนบ้าง)'],
   ['thu45','ถ้ามันกัดเท้าท่าน ข้ากับผู้ถือตราจะยันเท้าท่านไว้เอง! (ธุลีชูโคมเห็ดดวงสุดท้าย) ไปกันเถอะ!']],
  post:[['nar','ราชินีกัดแผ่นดินล้มลงในรังของมันเอง… เปลือกที่ลอกทิ้งไว้แตกเป็นเสี่ยง ๆ ไข่ใบสุดท้ายดับแสงลง'],
   ['thu45','(ธุลีทรุดลงนั่งพิงเท้าธรณิน หอบ) …เราทำได้… เราทำได้แล้ว!']],rw:{g:220000,s3:12}},
 {c:C4,g:'talk',k:'thr',pa4c:1,tx:'กลับไปหาธรณินที่ลานเท้าธรณิน',
  pre:[['thr','(ไม่มีเสียงกัดแทะเป็นครั้งแรก… ความเงียบหนักกว่าเสียงไหน ๆ) …ข้าได้ยินความเงียบแล้ว'],
   ['thr','ขอบใจนะ คนตัวเล็ก… ขอบใจที่ลงมา ไม่มีใครเคยลงมาถึงตรงนี้'],
   ['thr','(ยักษ์หินหลับตา แขนที่ยันฐานแผ่นดินสั่นเป็นจังหวะ) …แต่ข้าเหนื่อยเหลือเกิน ราชินีตายแล้ว รอยกัดของมันยังอยู่ หินในเข่าข้าร้าวทะลุไปถึงอีกฝั่ง'],
   ['thr','ข้าแบกมาสามร้อยปีเพื่อรอวันที่มีคนลงมา… ตอนนี้มีคนลงมาแล้ว ข้าวางมันลงได้แล้วใช่ไหม'],
   ['thu45','…ท่านพูดอะไรน่ะ?'],
   ['thr','ปล่อยให้ร่วงเถิด… แผ่นดินจะร่วงลงมาหนึ่งชั่วคน แล้วพวกเจ้าจะได้สร้างใหม่บนที่ที่ไม่ต้องมีใครแบก'],
   ['thu45','ไม่! ข้างบนมีค่าย มีอัสตรา มีอารัณยา มีนครรากลึก มีทุกคน!'],
   ['nar','แขนข้างซ้ายของธรณินคลายลงหนึ่งคืบ… ทั้งตาข่ายรากครางเหมือนเชือกที่จะขาด และไกลขึ้นไปข้างบน ค่ายผู้อพยพทรุดลงอีกหนึ่งคืบ'],
   ['me','(…ไม่มีใครควรต้องแบกคนเดียว แต่ก็ไม่มีใครควรปล่อยมือ ตอนที่ทุกคนเพิ่งมาถึง)']],
  post:[['nar','🌳 — จบภาค 10 บทที่ 4 · ราชินีกัดแผ่นดิน — บทต่อไป: แผ่นดินที่แบกฟ้า (บทสุดท้าย · เร็ว ๆ นี้)']],rw:{g:240000,s3:14}})}
/* ---------- ลงทะเบียน ---------- */
setTimeout(()=>{try{
    if(MAPS[44])MAPS[44].gates.push({x:PZ44.x,y:PZ44.y,to:45,req:1,pa5:1,pa:5,nm:'ฐานแผ่นดิน',arr:{x:1600,y:2760}});
    const Mb=MAPS[38];MAPS[45]=Object.assign({},Mb,{n:'ฐานแผ่นดิน',mth:47,sx:1600,sy:2760,sr:110,seed:451,bg:'#08060c',tile:'#3a2c20',safe:'#4a3a2a',ring:'#e8d0ff',t1:'#1a1420',t2:'#3a2c20',d1:'#4a3a2a',d2:'#f0e0ff',bth:47,fsw:[],
      gates:[{x:PZGATE.x,y:PZGATE.y,to:44,req:1,pa:6,nm:'นครรากลึก',arr:{x:PZ44.x,y:PZ44.y+64}}],npc:{x:PZNPC.x,y:PZNPC.y,n:'ธรณิน · ผู้แบกคนแรก',L:22},npc2:{x:-9999,y:-9999,n:'ธุลี · เด็กคนรากลึก'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[790,2300],[2430,2310],[690,1540],[2510,1520],[1430,1930],[1770,1930]]});
    FIELDM[45]=1;BTR[47]='200,170,255';GLOWC[45]='200,170,255';FXST[47]='root';BTC[47]=['#f0e8ff','#6a5a8a','#ffffff'];TIER[45]=[94,26.6,3.52];
    WRG[45]={1:{rg:260,cd:2.2,spd:280,dm:1.0,k:'seed',c:'190,150,255'},2:{rg:240,cd:2.8,spd:240,dm:1.4,k:'seed',c:'255,120,60',big:1}}}catch(e){console.warn('pz map',e)}
  try{NPC3[45]={d:()=>{},s:PZTHR1,hy:330}}catch(e){}
  try{Object.assign(DEPM,{45:'base'});DEP4.base={fog:'40,30,60',fa:.16,bd:.22};AMB2.base=['rgba(210,190,255,.08)','rgba(6,4,10,.55)','210,190,255']}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.pa4t)return pzAqT(st);return _q(st)}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===45&&!pzIn(x,y,12))return false;return _aw(x,y)}}catch(e){}
  try{const _tm=terMons;window.terMons=terMons=function(){const r=_tm.apply(this,arguments);try{pzMons()}catch(e){}return r}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{pzFallDraw()}catch(e){}_dn()}}catch(e){}
  try{const _pg=paGateDraw;window.paGateDraw=paGateDraw=function(G){if(G.pa===5||G.pa===6)return pzGateDraw(G);return _pg(G)}}catch(e){}
  try{WMN[45]=[40,1004,'ฐานแผ่นดิน','🗿'];WMLV[45]=[164,168]}catch(e){}
  try{NMLR[45]=[[790,2300],[2430,2310],[690,1540],[2510,1520],[1430,1930]]}catch(e){}
  /* สายแร่/สมุนไพรอยู่บนปมรากเท่านั้น (ไม่ลอยในความว่าง · ไม่อยู่ลานปลอดภัย) */
  try{const _gb=gtBuild;window.gtBuild=gtBuild=function(){_gb();try{if(curMap!==45||!GTN||!GTN.L)return;const OUT=[[1000,2330],[860,2180],[2200,2330],[2380,2190],[1500,1790],[1700,1800],[760,1440],[930,1590],[2440,1430],[2280,1580]];let k=0;
    GTN.L.forEach(n=>{if(pzK(n.x,n.y,50)>=0&&!pzSafe(n.x,n.y)&&PZJ.every(([jx,jy])=>Math.hypot(n.x-jx,n.y-jy)>110))return;for(;k<OUT.length;k++){const[x,y]=OUT[k];if(GTN.L.some(o=>o!==n&&Math.hypot(o.x-x,o.y-y)<120))continue;n.x=x;n.y=y;k++;break}})}catch(e){}}}catch(e){}
  /* ฉากภาพยนตร์: มาถึงฐานแผ่นดิน · คุยธรณินครั้งแรก · «ปล่อยให้ร่วงเถิด» */
  try{CZDEF.pa4m={nm:'ภาค 10 · ฐานแผ่นดิน',sub:'บทที่ 4 · ราชินีกัดแผ่นดิน',mp:45,get:()=>{const s=STY.find(x=>x.pa4m);return s&&s.post},base:['motes'],
    shots:[{i:0,cam:'me',z:1.05,dz:-.04},{m:'ไม่มีพื้นดิน',cam:[1600,2050],z:.55,dz:-.01},{m:'ภูเขาที่กำลังหายใจ',cam:[1600,760],z:.5,shake:.25,sfx:'boss'},{m:'ยักษ์หินคุกเข่า',cam:[1600,560],z:.55,dz:.01},
     {m:'ผู้แบกคนแรก ในเพลงกล่อม',cam:'npc:thu45',z:1.25},{m:'หน้าแข้งของเขา',cam:[1600,960],z:.85},{m:'💡',cam:'me',z:1.1}]};
    CZDEF.pa4k={nm:'ภาค 10 · ธรณิน',sub:'บทที่ 4 · ผู้แบกคนแรก',mp:45,get:()=>{const s=STY.find(x=>x.pa4k);return s&&s.pre},base:['motes'],
    shots:[{i:0,cam:[1600,660],z:.55,dz:-.01,sfx:'boss',shake:.2},{m:'สามร้อยปี… หรือสามพันปี',cam:[1600,440],z:.72},{m:'ท่านธรณิน! ข้าชื่อธุลี',cam:'npc:thu45',z:1.25},{m:'ดวงตาอำพันคู่ใหญ่',cam:[1600,430],z:.78},
     {m:'วันหนึ่งข้ารู้สึก',cam:[1600,560],z:.62},{m:'ข้าไม่เคยรู้เลยว่า',cam:'me',z:1.3},{m:'ข้าไม่ได้โทษใคร',cam:[1600,470],z:.7},{m:'แต่ตอนนี้เขารู้แล้ว',cam:'npc:thu45',z:1.25},
     {m:'เชือก… จากข้างบน',cam:[1600,400],z:.82},{m:'ปลายเชือกอยู่กับเรา',cam:'npc:thu45',z:1.2},{m:'ผูกมันเถิด',cam:[1600,1760],z:.55,dz:-.01}]};
    CZDEF.pa4c={nm:'ภาค 10 · ปล่อยให้ร่วงเถิด',sub:'บทที่ 4 · ตอนจบ',mp:45,get:()=>{const s=STY.find(x=>x.pa4c);return s&&s.pre},base:['motes'],
    shots:[{i:0,cam:[1600,620],z:.6,dz:-.01},{m:'ขอบใจนะ คนตัวเล็ก',cam:[1600,430],z:.78},{m:'แต่ข้าเหนื่อยเหลือเกิน',cam:[1600,560],z:.62},{m:'ข้าวางมันลงได้แล้วใช่ไหม',cam:[1600,420],z:.85},
     {m:'ท่านพูดอะไรน่ะ',cam:'npc:thu45',z:1.3},{m:'ปล่อยให้ร่วงเถิด',cam:[1600,440],z:.9,sfx:'ek_growl'},{m:'ไม่! ข้างบนมีค่าย',cam:'npc:thu45',z:1.3},
     {m:'แขนข้างซ้ายของธรณินคลายลง',cam:[1400,500],z:.55,shake:.6,sfx:'boss',fx:['dust','dark']},{m:'ไม่มีใครควรต้องแบกคนเดียว',cam:'me',z:1.3}]};
    CZORD.push('pa4m','pa4k','pa4c');CZMAP=null}catch(e){console.warn('pz cz',e)}
  /* ธุลีตามลงมาหลังคุยเฒ่าแก่นไม้ · บทพูดลอย ๆ ของธรณินตามช่วงเรื่อง */
  setInterval(()=>{try{const N=MAPS[45]&&MAPS[45].npc2;if(N){if(p6Past('pa4s')){N.x=PZTHU.x;N.y=PZTHU.y}else{N.x=-9999;N.y=-9999}}
    if(NPC3[45]){const L=p6Past('pa4c')?PZTHR3:p6Past('pa4t')?PZTHR2:PZTHR1;if(NPC3[45].s!==L)NPC3[45].s=L}}catch(e){}},600);
},0);
