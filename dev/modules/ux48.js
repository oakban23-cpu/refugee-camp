/* ---------- v430 โฉมใหม่ของอสูรกิลด์ + ห้องโถงกิลด์ ----------
   บอส: «อสูรเกราะศึก» อัศวินยักษ์เกราะหนัก ถือค้อนศึก ผ้าคลุมสีกิลด์ ธงกิลด์สองผืนบนหลัง หมวกเกราะช่องตาเรืองแสงสีกิลด์
        เกราะเปลี่ยนตามขั้น: ขั้น 1–5 เหล็ก · 6–10 เหล็กกล้าฟ้า · 11–15 ทองคำ · 16–20 ออบซิเดียนม่วง
        ใช้สถานะท่าเดิมของบอสโลก (wbAnim): ทุบ = ยกค้อน/กำปั้นฟาด · พ่นไฟ/คำราม = ช่องหมวกเปิดสว่าง · จุดอ่อน = อัญมณีที่อกแตกสว่าง
   ลาน: «ห้องโถงกิลด์» พื้นหินแผ่นใหญ่ · โมเสกตรากิลด์กลางห้อง · พรมแดงทางเข้า · เสาหินแขวนธงกิลด์ + กระถางไฟ · บัลลังก์+ธงผืนใหญ่หลังบอส */
const GBT=[{a:'#4e535e',b:'#767d8a',c:'#2a2d34',tr:'#c8a050',n:'เหล็ก'},{a:'#3a4c6c',b:'#5f7cab',c:'#1c2436',tr:'#dfe8f8',n:'เหล็กกล้า'},{a:'#7a5a1e',b:'#cf9c32',c:'#3a2a0e',tr:'#fff0b0',n:'ทองคำ'},{a:'#2c2040',b:'#4f3870',c:'#120c1c',tr:'#d8a8ff',n:'ออบซิเดียน'}];
function gbTier(){const s=(GBS.go&&GBS.go.s)|0;return GBT[Math.min(3,Math.max(0,Math.floor((s-1)/5)))]}
function gbGC(){try{const G=GDS.g;return G?gdCol(G.col):'#e8b54a'}catch(e){return'#e8b54a'}}
function gbEm(){try{return(GDS.g&&GDS.g.e)||'🐉'}catch(e){return'🐉'}}
function gbTag(){try{return(GDS.g&&GDS.g.tag)||''}catch(e){return''}}
/* สีพื้นห้องโถง (ตั้งก่อนเข้าแมพ · ห้อง 82000 ใช้เฉพาะกิลด์) */
function gbTheme(M){Object.assign(M,{bg:'#0f1117',tile:'#1d2029',safe:'#262a34',t1:'#0a0b0f',t2:'#171a21',d1:'#2b2f3a',d2:gbGC(),ring:gbGC(),gbh:1})}
/* ---- ห้องโถง ---- */
function gbHallPillars(){const L=[],cx=CX,cy=CY+90;for(let i=0;i<12;i++){const a=-Math.PI/2+i*Math.PI*2/12;if(Math.abs(Math.sin(a))>.8)continue;L.push({x:Math.round(cx+Math.cos(a)*215),y:Math.round(cy+Math.sin(a)*330),i})}return L}
let GBPL=null;
function gbDrawFloor(){const t=performance.now()/1000,gc=gbGC(),rc=h2r(gc);g.save();
  /* แผ่นหินใหญ่ลายตาราง */
  const x0=Math.floor((cam.x-40)/96)*96,y0=Math.floor((cam.y-40)/64)*64;g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=2;
  for(let y=y0;y<cam.y+H+64;y+=64){g.beginPath();g.moveTo(cam.x-40,y);g.lineTo(cam.x+W+40,y);g.stroke();const off=((y/64)|0)%2?48:0;for(let x=x0+off;x<cam.x+W+96;x+=96){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+64);g.stroke()}}
  g.strokeStyle='rgba(255,255,255,.04)';g.lineWidth=1;for(let y=y0;y<cam.y+H+64;y+=64){g.beginPath();g.moveTo(cam.x-40,y+2);g.lineTo(cam.x+W+40,y+2);g.stroke()}
  /* พรมทางเข้า */
  {const px=CX,top=CY+225,bot=CY+620;if(inView(px,(top+bot)/2,320)){g.fillStyle='#5a1414';g.fillRect(px-40,top,80,bot-top);g.fillStyle='#8a1e1e';g.fillRect(px-34,top,68,bot-top);g.strokeStyle='#d8a848';g.lineWidth=2.5;g.strokeRect(px-34,top,68,bot-top);
    g.strokeStyle='rgba(216,168,72,.5)';g.lineWidth=1.5;for(let y=top+30;y<bot;y+=40){g.beginPath();g.moveTo(px-22,y);g.lineTo(px,y-9);g.lineTo(px+22,y);g.stroke()}}}
  /* โมเสกตรากิลด์กลางห้อง */
  {const mx=CX,my=CY+120;if(inView(mx,my,200)){g.save();g.translate(mx,my);g.scale(.56,.56*.68);
    g.fillStyle='rgba(10,10,14,.55)';g.beginPath();g.arc(0,0,236,0,7);g.fill();
    g.strokeStyle='rgba('+rc+',.75)';g.lineWidth=6;g.beginPath();g.arc(0,0,226,0,7);g.stroke();g.strokeStyle='#c8a050';g.lineWidth=2.5;g.beginPath();g.arc(0,0,214,0,7);g.stroke();g.beginPath();g.arc(0,0,150,0,7);g.stroke();
    for(let i=0;i<16;i++){const a=i*Math.PI/8;g.fillStyle=i%2?'rgba('+rc+',.55)':'rgba(200,160,80,.45)';g.beginPath();g.moveTo(Math.cos(a)*150,Math.sin(a)*150);g.lineTo(Math.cos(a+.2)*212,Math.sin(a+.2)*212);g.lineTo(Math.cos(a-.2)*212,Math.sin(a-.2)*212);g.closePath();g.fill()}
    g.fillStyle='rgba('+rc+',.22)';g.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8,r=i%2?70:140;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill();g.strokeStyle='rgba('+rc+',.8)';g.lineWidth=2;g.stroke();
    g.globalCompositeOperation='lighter';g.strokeStyle='rgba('+rc+','+(.25+.15*Math.sin(t*1.5))+')';g.lineWidth=10;g.beginPath();g.arc(0,0,226,0,7);g.stroke();g.globalCompositeOperation='source-over';
    g.scale(1,1/.68);g.globalAlpha=.85;g.font='88px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(gbEm(),0,-4);g.globalAlpha=1;
    g.font='bold 22px system-ui';g.lineWidth=4;g.strokeStyle='rgba(0,0,0,.6)';const tg=gbTag();if(tg){g.strokeText('['+tg+']',0,62);g.fillStyle='#ffe6a8';g.fillText('['+tg+']',0,62)}
    g.restore()}}
  g.restore()}
function gbBanner(x,y,w,h,t,ph){const gc=gbGC(),sw=Math.sin(t*1.8+ph)*4;g.save();g.translate(x,y);
  g.fillStyle='#3a2a14';g.fillRect(-w/2-6,-3,w+12,6);g.fillStyle='#c8a050';g.beginPath();g.arc(-w/2-6,0,4,0,7);g.arc(w/2+6,0,4,0,7);g.fill();
  g.beginPath();g.moveTo(-w/2,0);g.lineTo(w/2,0);g.lineTo(w/2+sw*.6,h*.82);g.lineTo(sw,h);g.lineTo(-w/2+sw*.6,h*.82);g.closePath();g.fillStyle=gc;g.fill();g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=2;g.stroke();
  g.strokeStyle='#e8c060';g.lineWidth=2;g.beginPath();g.moveTo(-w/2+4,4);g.lineTo(w/2-4,4);g.stroke();
  g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.moveTo(w*.15,0);g.lineTo(w/2,0);g.lineTo(w/2+sw*.6,h*.82);g.lineTo(sw+w*.1,h*.95);g.closePath();g.fill();
  g.font=Math.round(w*.62)+'px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(gbEm(),sw*.5,h*.42);g.restore()}
function gbDrawPillar(P,t){const x=P.x,y=P.y,T=gbTier();if(!inView(x,y-90,140))return;g.save();g.translate(x,y);g.scale(.72,.72);g.translate(-x,-y);
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x+8,y+6,40,12,0,0,7);g.fill();
  g.fillStyle='#3a3d46';g.fillRect(x-30,y-14,60,18);g.fillStyle='#4c505b';g.fillRect(x-26,y-24,52,12);
  const gr=g.createLinearGradient(x-20,0,x+20,0);gr.addColorStop(0,'#3e424c');gr.addColorStop(.45,'#7a808c');gr.addColorStop(1,'#33363e');g.fillStyle=gr;g.fillRect(x-20,y-210,40,188);
  g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1.5;for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(x+k*9,y-206);g.lineTo(x+k*9,y-26);g.stroke()}
  g.fillStyle='#4c505b';g.fillRect(x-28,y-226,56,16);g.fillStyle='#5c616d';g.fillRect(x-32,y-236,64,10);g.fillStyle='#c8a050';g.fillRect(x-32,y-228,64,2);
  gbBanner(x,y-200,30,96,t,P.i*1.3);
  if(P.i%2===0){const fx=x,fy=y-246;g.fillStyle='#2a2420';g.beginPath();g.moveTo(fx-14,fy);g.lineTo(fx+14,fy);g.lineTo(fx+9,fy+10);g.lineTo(fx-9,fy+10);g.closePath();g.fill();
    g.globalCompositeOperation='lighter';glowAt(fx,fy-10,46,'255,170,70',.45+.12*Math.sin(t*7+P.i));for(let k=0;k<4;k++){const q=(t*1.6+k/4+P.i*.3)%1;g.fillStyle='rgba(255,'+(200-q*120|0)+',60,'+(.85*(1-q))+')';g.beginPath();g.ellipse(fx+Math.sin(t*5+k*2)*3,fy-4-q*24,5*(1-q)+1.5,8*(1-q)+2,0,0,7);g.fill()}g.globalCompositeOperation='source-over'}
  g.restore()}
function gbDrawThrone(t){const x=CX,y=CY-300,gc=gbGC();if(!inView(x,y,300))return;g.save();g.translate(x,y+40);g.scale(.62,.62);g.translate(-x,-y-40);
  /* ผนังหลังบัลลังก์ */
  g.fillStyle='#22252d';g.beginPath();g.moveTo(x-330,y+40);g.lineTo(x-330,y-120);g.quadraticCurveTo(x,y-230,x+330,y-120);g.lineTo(x+330,y+40);g.closePath();g.fill();g.strokeStyle='#3c404b';g.lineWidth=4;g.stroke();
  for(let i=-3;i<=3;i++){g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=2;g.beginPath();g.moveTo(x+i*90,y-150+Math.abs(i)*12);g.lineTo(x+i*90,y+40);g.stroke()}
  gbBanner(x-210,y-150,56,170,t,1);gbBanner(x+210,y-150,56,170,t,2);gbBanner(x,y-196,96,220,t,0);
  g.font='bold 18px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(0,0,0,.7)';let nm='';try{nm=GDS.g?GDS.g.nm:''}catch(e){}if(nm){g.strokeText('ห้องโถงกิลด์ '+nm,x,y+30);g.fillStyle='#ffe6a8';g.fillText('ห้องโถงกิลด์ '+nm,x,y+30)}
  g.globalCompositeOperation='lighter';glowAt(x,y-90,160,h2r(gc),.12+.05*Math.sin(t*1.2));g.restore()}
function gbDrawHall(){if(!(GBS.go&&isWB()))return;const t=performance.now()/1000;try{gbDrawFloor()}catch(e){}
  if(!GBPL)GBPL=gbHallPillars();for(const P of GBPL)try{gbDrawPillar(P,t)}catch(e){}}
/* ---- บอส: อสูรเกราะศึก ---- */
function drawGuildBoss(m,T,hf){const x=m.x,y=m.y,O='#0c0a0e',W2=hf>.35,now=performance.now()/1000,br=Math.sin(now*1.4),A=wbAnim(),TI=gbTier(),gc=gbGC(),rc=h2r(gc),
    ro=dg.ph==='boss'?A.ro:((now%8)>6.8?Math.sin(((now%8)-6.8)/1.2*Math.PI):0),F=c=>W2?'#ffece0':c;
  const E=(cx,cy,rx,ry,c,st,r)=>{g.beginPath();g.ellipse(cx,cy,Math.max(.1,rx),Math.max(.1,ry),r||0,0,7);g.fillStyle=c;g.fill();if(st){g.lineWidth=2.4;g.strokeStyle=O;g.stroke()}};
  const Pg=(p,c,st)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath();g.fillStyle=c;g.fill();if(st){g.lineWidth=2.4;g.strokeStyle=O;g.stroke()}};
  const trim=(p,w)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.strokeStyle=W2?'#fff':TI.tr;g.lineWidth=w||2;g.stroke()};
  try{gbDrawThrone(now)}catch(e){}
  g.save();
  /* แท่นหินวงอักขระสีกิลด์ */
  glowAt(x,y-40,200,rc,.18+.05*Math.sin(now*1.6));
  E(x,y+10,138,40,'#23262e',0);E(x,y+4,130,36,'#30343e',1);g.save();g.translate(x,y+4);g.scale(1,.28);g.globalCompositeOperation='lighter';g.strokeStyle='rgba('+rc+','+(.55+.25*Math.sin(now*2))+')';g.lineWidth=5;g.beginPath();g.arc(0,0,112,0,7);g.stroke();
  for(let i=0;i<12;i++){const a=i*.5236+now*.25;g.fillStyle='rgba('+rc+',.8)';g.fillRect(Math.cos(a)*112-3,Math.sin(a)*112-3,6,6)}g.restore();
  if(WBA.enr){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-120,230,'255,40,30',.22+.1*Math.sin(now*6));g.restore()}
  const by=br*2.5,sh=ro*3;g.translate(Math.sin(now*40)*sh*.3,0);
  /* ธงกิลด์สองผืนบนหลัง */
  for(const s of[-1,1]){const px=x+s*64,top=y-292+by;g.strokeStyle='#2a1e10';g.lineWidth=6;g.beginPath();g.moveTo(px,y-150+by);g.lineTo(px+s*8,top);g.stroke();g.fillStyle='#c8a050';g.beginPath();g.arc(px+s*8,top-4,6,0,7);g.fill();
    g.save();g.translate(px+s*8,top+6);const sw=Math.sin(now*2+s)*5;g.beginPath();g.moveTo(0,0);g.lineTo(s*58,4);g.lineTo(s*58+sw,62);g.lineTo(s*36+sw*.7,52);g.lineTo(s*20+sw*.5,66);g.lineTo(0,58);g.closePath();g.fillStyle=F(gc);g.fill();g.strokeStyle=O;g.lineWidth=2;g.stroke();
    g.font='26px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(gbEm(),s*29+sw*.4,30);g.restore()}
  /* ขา + เกราะแข้ง */
  for(const s of[-1,1]){const lx=x+s*34;Pg([lx-22,y-6,lx-26,y-70+by*.4,lx+22,y-70+by*.4,lx+20,y-6],F(TI.c),1);Pg([lx-26,y+4,lx-30,y-14,lx+28,y-14,lx+30,y+4],F(TI.a),1);E(lx,y-62+by*.4,20,14,F(TI.b),1);trim([lx-14,y-62+by*.4,lx,y-72+by*.4,lx+14,y-62+by*.4],2)}
  /* ผ้าคลุมเอวสีกิลด์ */
  {const sw=Math.sin(now*1.7)*4;Pg([x-46,y-96+by,x+46,y-96+by,x+40+sw,y-14,x+sw*.5,y-4,x-40+sw,y-14],F(gc),1);g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x+12,y-94+by,28,70);
    trim([x-46,y-92+by,x+46,y-92+by],3);g.font='34px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(gbEm(),x+sw*.5,y-52+by)}
  /* แขนด้านหลัง (กำปั้นซ้าย / ค้อนขวา) */
  const armY=s=>(A.rs===s?A.rv:0)+A.arms*.6;
  for(const s of[-1,1]){const sx=x+s*96,sy=y-176+by,up=armY(s),hx=x+s*(122+ro*6),hy=y-74-up;
    Pg([sx-s*18,sy,sx+s*22,sy+6,hx+s*22,hy-10,hx-s*18,hy-16],F(TI.c),1);E((sx+hx)/2+s*4,(sy+hy)/2,22,16,F(TI.a),1);trim([(sx+hx)/2-s*10,(sy+hy)/2-10,(sx+hx)/2+s*16,(sy+hy)/2+4],2);
    /* กำปั้นเกราะ */
    Pg([hx-24,hy-22,hx+24,hy-22,hx+26,hy+12,hx-26,hy+12],F(TI.a),1);for(let k=-1;k<=1;k++)Pg([hx+k*14-6,hy+10,hx+k*14+6,hy+10,hx+k*14,hy+18],F(TI.tr),0);
    if(s===1){/* ค้อนศึก */const ang=.55+(A.rs===1?-(Math.max(0,A.rv)/80)*1.1:0)+Math.sin(now*1.2)*.05;g.save();g.translate(hx,hy-4);g.rotate(ang);
      g.fillStyle='#3a2a18';g.strokeStyle=O;g.lineWidth=2;g.fillRect(-5,-150,10,170);g.strokeRect(-5,-150,10,170);for(let k=0;k<5;k++){g.fillStyle='#c8a050';g.fillRect(-6,-130+k*28,12,4)}
      Pg([-46,-190,46,-190,52,-150,-52,-150],F(TI.b),1);Pg([-52,-150,52,-150,46,-128,-46,-128],F(TI.a),1);trim([-40,-170,40,-170],3);
      g.globalCompositeOperation='lighter';glowAt(0,-160,30,rc,.5+.3*Math.sin(now*3));g.globalCompositeOperation='source-over';g.font='22px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(gbEm(),0,-160);g.restore()}}
  /* ลำตัว: เกราะอก */
  Pg([x-74,y-92+by,x-92,y-150+by,x-70,y-196+by,x+70,y-196+by,x+92,y-150+by,x+74,y-92+by],F(TI.a),1);
  Pg([x-64,y-188+by,x,y-176+by,x+64,y-188+by,x+52,y-110+by,x,y-96+by,x-52,y-110+by],F(TI.b),1);
  trim([x-64,y-188+by,x,y-176+by,x+64,y-188+by],3);trim([x,y-176+by,x,y-100+by],2.4);for(let i=0;i<3;i++)trim([x-56+i*4,y-128-i*18+by,x,y-120-i*18+by,x+56-i*4,y-128-i*18+by],1.6);
  /* อัญมณีที่อก (จุดอ่อน) */
  {const cy=y-150+by,wk=A.core,pu=(.8+.2*Math.sin(now*(wk?12:3)))*(wk?1.5:1);g.save();g.globalCompositeOperation='lighter';glowAt(x,cy,(wk?70:42)*pu,wk?'255,245,220':rc,.8);g.restore();
    Pg([x,cy-18,x+15,cy,x,cy+18,x-15,cy],wk?'#ffffff':F(gc),1);Pg([x,cy-12,x+6,cy,x,cy+4,x-8,cy-2],'rgba(255,255,255,.55)',0);
    if(wk){g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=1.5;g.beginPath();g.moveTo(x-12,cy-4);g.lineTo(x-2,cy+2);g.lineTo(x+8,cy-6);g.moveTo(x-2,cy+2);g.lineTo(x+2,cy+14);g.stroke()}}
  /* บ่าเกราะ + หนาม */
  for(const s of[-1,1]){const px=x+s*92,py=y-184+by;E(px,py,40,28,F(TI.a),1);E(px,py-4,30,18,F(TI.b),0);trim([px-s*30,py+8,px+s*36,py+4],2.4);
    for(let k=0;k<3;k++)Pg([px+s*(-18+k*16)-6,py-22,px+s*(-18+k*16)+6,py-22,px+s*(-14+k*16),py-50-k*6],F(TI.tr),1)}
  /* หมวกเกราะ */
  const hy=y-232+by*1.2-ro*7;
  {const pl=Math.sin(now*2.2)*4;g.strokeStyle=O;g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(x,hy-40);g.quadraticCurveTo(x-30+pl,hy-90,x-70+pl,hy-70);g.stroke();g.strokeStyle=F(gc);g.lineWidth=12;g.stroke();g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=3;g.stroke()}
  for(const s of[-1,1]){g.strokeStyle=O;g.lineWidth=11;g.lineCap='round';g.beginPath();g.moveTo(x+s*32,hy-18);g.quadraticCurveTo(x+s*66,hy-26,x+s*62,hy-64);g.stroke();g.strokeStyle=F(TI.tr);g.lineWidth=7;g.stroke()}
  Pg([x-38,hy+30,x-42,hy-18,x-26,hy-42,x+26,hy-42,x+42,hy-18,x+38,hy+30,x,hy+40],F(TI.a),1);Pg([x-30,hy-34,x,hy-46,x+30,hy-34,x+20,hy-22,x-20,hy-22],F(TI.b),1);trim([x,hy-44,x,hy+38],2.4);trim([x-38,hy+26,x,hy+36,x+38,hy+26],2);
  /* ช่องตา (พ่นไฟ/คำราม = เปิดกว้าง สว่างจ้า) */
  {const op=4+ro*10;g.fillStyle='#08060a';g.beginPath();g.roundRect?g.roundRect(x-32,hy-6-op/2,64,op,3):g.rect(x-32,hy-6-op/2,64,op);g.fill();g.save();g.globalCompositeOperation='lighter';
    glowAt(x,hy-6,34+ro*40,ro>.3?'255,180,90':rc,.8+ro*.2);for(const s of[-1,1]){E(x+s*15,hy-6,8,2+ro*3,ro>.3?'#fff2c0':'#ffffff',0)}g.restore();
    for(let k=-2;k<=2;k++){g.fillStyle=O;g.fillRect(x+k*10-1,hy+6,2,14)}}
  /* ประกายสีกิลด์ลอย */
  {g.save();g.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const q=(now*.3+i*.1)%1,px=x+Math.sin(i*3.1+now*.5)*125,py=y-q*280;g.fillStyle='rgba('+rc+','+(.75*(1-q))+')';g.beginPath();g.arc(px,py,1.8,0,7);g.fill()}g.restore()}
  g.restore();
  g.font='bold 13px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='#000';const nm='⚔️ อสูรเกราะศึก · ขั้น '+((GBS.go&&GBS.go.s)|0)+' ('+TI.n+')';g.strokeText(nm,x,hy-104);g.fillStyle='#ffe0a0';g.fillText(nm,x,hy-104);g.lineWidth=1}
setTimeout(()=>{try{
  const _d=drawWorldBoss;drawWorldBoss=function(m,T,hf){if(GBS.go&&isWB())return drawGuildBoss(m,T,hf);return _d.apply(this,arguments)};
  const _g=drawWBGuards;drawWBGuards=function(){_g.apply(this,arguments);try{gbDrawHall()}catch(e){}};
}catch(e){console.warn('gb hall',e)}},1400);
