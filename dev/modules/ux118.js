/* ---------- v510 วาดมอนใหม่รายตัว ชุด 4: แมพ 28–38 (30 ตัว · 35 เหลือค้างคาว · 38 เหลือฉลาม/นางนวล) ---------- */
Object.assign(MV1S,{280:1.3,281:1.0,282:1.1,290:1.3,291:1.15,292:1.18,300:1.3,301:1.1,302:1.05,310:1.32,311:1.2,312:1.38,320:1.38,321:1.2,322:1.3,330:1.32,331:1.3,332:1.15,340:1.18,341:1.45,342:1.25,351:1.0,360:1.12,361:1.12,362:1.3,370:1.0,371:1.0,372:1.08,380:1.25,381:1.35});
/* โซ่ข้อ: จากจุดถึงจุด n ข้อ */
function wChain(W,x1,y1,x2,y2,n,w,c){const dx=(x2-x1)/n,dy=(y2-y1)/n,a=Math.atan2(dy,dx);for(let i=0;i<n;i++){const x=x1+dx*(i+.5),y=y1+dy*(i+.5);g.save();g.translate(x,y);g.rotate(a+(i%2?Math.PI/2*.0:0));g.beginPath();g.ellipse(0,0,Math.hypot(dx,dy)*.62,w*(i%2?.35:.7),0,0,7);g.strokeStyle=W?'#fff':c;g.lineWidth=w*.45;g.stroke();g.restore()}}
/* ก้อนเมฆ (ฐาน) */
function wCloud(W,x,y,w,h,T,c,cs){const C=[[-.8,.1,.36],[-.42,-.18,.46],[0,-.3,.52],[.44,-.16,.44],[.8,.12,.34],[.3,.24,.4],[-.3,.24,.4]];g.beginPath();for(const[cx,cy,q]of C){const px=x+cx*w+Math.sin(T*1.6+cx*3)*w*.04,py=y+cy*h;g.moveTo(px+q*h,py);g.arc(px,py,q*h,0,7)}g.fillStyle=W?'#fff':(cs||'#c8b0c8');g.fill();
  if(W)return;g.beginPath();for(const[cx,cy,q]of C){const px=x+cx*w+Math.sin(T*1.6+cx*3)*w*.04,py=y+cy*h-q*h*.12;g.moveTo(px+q*h*.9,py);g.arc(px,py,q*h*.9,0,7)}g.fillStyle=c||'#ffe6f0';g.fill()}

/* ================= 28: สวนลอยแห่งราชินี ================= */
MV1D[280]=(r,T,W,bob,sw,la,ra)=>{/* ภูตหนามเงิน: ร่างเถาหนามเงินบิดเป็นตัวคน หัวเป็นกุหลาบบานแดงชมพู ตาเรืองกลางดอก ใบ หนามแหลม */const b=bob*.6;
  const VN='#b8bcc8',VD='#80869a',RS='#d8325e',RL='#ff7a9a',LF='#4e8a4a';
  const thorns=(P,c)=>{for(let i=1;i<P.length-1;i++){const[x0,y0]=P[i-1],[x1,y1]=P[i],a=Math.atan2(y1-y0,x1-x0)+(i%2?1.4:-1.4);vD(W,[[x1-Math.cos(a+1.57)*r*.03,y1-Math.sin(a+1.57)*r*.03],[x1+Math.cos(a)*r*.12,y1+Math.sin(a)*r*.12],[x1+Math.cos(a+1.57)*r*.03,y1+Math.sin(a+1.57)*r*.03]],c)}};
  const vine=(P,c,w)=>{vK(W,P,V1.O,w+r*.05);vK(W,P,c,w);vK(W,P,W?'#fff':'rgba(255,255,255,.35)',w*.3);thorns(P,c)};
  /* ขาเถา */for(const[s,l,c]of[[-1,la,VD],[1,ra,VN]]){const P=[[s*r*.12,r*.16+b],[s*r*.2,r*.42],[s*r*.14,r*.62],[s*r*.2,r*.84-l]];vine(P,c,r*.14);for(const d of[-1,1])vK(W,[[s*r*.2,r*.84-l],['q',s*r*.2+d*r*.08,r*.88-l,s*r*.2+d*r*.14,r*.9-l]],c,r*.05)}
  /* แขนหลัง */vine([[-r*.2,-r*.32+b],[-r*.46,-r*.12+b-sw*.3],[-r*.5,r*.14+b-sw*.5]],VD,r*.1);
  /* ลำตัวเถาบิด */vS(W,[[-r*.16,r*.24+b],['q',-r*.3,r*.0+b,-r*.2,-r*.2+b],['q',-r*.34,-r*.36+b,-r*.16,-r*.46+b],[r*.16,-r*.46+b],['q',r*.34,-r*.36+b,r*.2,-r*.2+b],['q',r*.3,r*.0+b,r*.16,r*.24+b],['q',0,r*.3+b,-r*.16,r*.24+b]],VN);
  for(let k=0;k<3;k++){const P=[];for(let i=0;i<=6;i++){const t=i/6,y=r*.24-t*r*.68+b,x=Math.sin(t*Math.PI*1.6+k*2.1)*r*.16;P.push([x,y])}vK(W,P,k===1?'#6a7084':'#8a90a2',r*.04);thorns(P,VD)}
  for(const[x,y,a]of[[-.28,.06,2.6],[.3,-.18,-.4]])vS(W,[[x*r,y*r+b],['q',x*r+Math.cos(a-.5)*r*.2,y*r+Math.sin(a-.5)*r*.2+b,x*r+Math.cos(a)*r*.26,y*r+Math.sin(a)*r*.26+b],['q',x*r+Math.cos(a+.5)*r*.14,y*r+Math.sin(a+.5)*r*.14+b,x*r,y*r+b]],LF,1,.5);
  /* หัวกุหลาบ */const hx=r*.04,hy=-r*.7+b,sp=Math.sin(T*2)*.06;vS(W,[[hx-r*.06,hy+r*.2],[hx+r*.06,hy+r*.2],[hx+r*.04,hy+r*.32],[hx-r*.04,hy+r*.32]],LF,1,.5);
  for(let i=0;i<6;i++){const a=i*1.047+sp;vS(W,[[hx,hy],['q',hx+Math.cos(a-.5)*r*.42,hy+Math.sin(a-.5)*r*.36,hx+Math.cos(a)*r*.44,hy+Math.sin(a)*r*.38],['q',hx+Math.cos(a+.5)*r*.48,hy+Math.sin(a+.5)*r*.42,hx,hy]],'#e04a72',1,.6)}
  for(let i=0;i<5;i++){const a=i*1.256+.6-sp;vS(W,[[hx,hy],['q',hx+Math.cos(a-.5)*r*.3,hy+Math.sin(a-.5)*r*.26,hx+Math.cos(a)*r*.32,hy+Math.sin(a)*r*.28],['q',hx+Math.cos(a+.5)*r*.34,hy+Math.sin(a+.5)*r*.3,hx,hy]],'#ff6a90',1,.6)}
  wE(W,hx,hy,r*.17,r*.15,'#ffb0c4');vK(W,[[hx-r*.1,hy-r*.02],['q',hx,hy-r*.12,hx+r*.1,hy-r*.02],['q',hx+r*.02,hy+r*.06,hx-r*.04,hy]],'#a8244a',r*.03);
  vGlow(W,hx,hy+r*.02,r*.3,'230,220,255',.4);vEye(W,hx-r*.06,hy+r*.04,r*.035,r*.03,'#f0eaff',5);vEye(W,hx+r*.06,hy+r*.04,r*.035,r*.03,'#f0eaff',5);
  /* แขนหน้า หนามแส้ */vine([[r*.2,-r*.32+b],[r*.46,-r*.16+b+sw*.3],[r*.6,r*.06+b+sw*.5],[r*.66,r*.28+b+sw*.6]],VN,r*.1);
  return true};
MV1D[281]=(r,T,W)=>{/* ผีเสื้อคราส (สวนราชินี): ปีกม่วงดำขอบลูกไม้เงิน จุดจันทร์เสี้ยวเงิน หางปีกยาว ตัวสีม่วงอ่อน ผงเงินโปรย */const by=-r*.32+Math.sin(T*2.4)*r*.1,fk=.5+.5*Math.abs(Math.cos(T*6.5));
  vGlow(W,0,by,r*1.3,'210,190,255',.14);
  for(const s of[-1,1]){g.save();g.translate(0,by);g.scale(s*fk*1.1,1.1);
    vS(W,[[r*.06,r*.02],['q',r*.5,r*.0,r*.66,r*.3],['q',r*.6,r*.5,r*.46,r*.46],['q',r*.5,r*.8,r*.42,r*1.0],['q',r*.3,r*.66,r*.12,r*.4]],'#3a2458');
    vS(W,[[r*.06,-r*.06],['q',r*.36,-r*.72,r*1.04,-r*.82],['q',r*1.2,-r*.5,r*1.02,-r*.14],['q',r*.6,r*.06,r*.08,r*.06]],'#2a1a42');
    for(let i=0;i<6;i++){const t=i/5,x=r*(1.04+(1.02-1.04)*t)+Math.sin(t*3.1)*r*.14,y=-r*.82+t*r*.68;wED(W,x,y,r*.05,r*.04,'#d8d0f0')}
    const ex=r*.64,ey=-r*.42;vGlow(W,ex,ey,r*.25,'230,220,255',.4);vD(W,[[ex-r*.12,ey-r*.1],['q',ex+r*.12,ey-r*.18,ex+r*.12,ey+r*.04],['q',ex+r*.08,ey+r*.16,ex-r*.06,ey+r*.12],['q',ex+r*.06,ey+r*.04,ex-r*.12,ey-r*.1]],W?'#fff':'#e8e4ff');
    wED(W,r*.34,r*.36,r*.07,r*.06,'#ff7a9a');g.restore()}
  vS(W,[[0,by-r*.3],['q',r*.12,by-r*.18,r*.1,by+r*.08],['q',r*.06,by+r*.5,0,by+r*.56],['q',-r*.06,by+r*.5,-r*.1,by+r*.08],['q',-r*.12,by-r*.18,0,by-r*.3]],'#c8b8f0');
  for(let i=0;i<3;i++)vK(W,[[-r*.08,by+r*(.1+i*.13)],[r*.08,by+r*(.1+i*.13)]],'#7a68a8',r*.03);
  vEye(W,-r*.05,by-r*.24,r*.045,r*.045,'#ffffff',4);vEye(W,r*.05,by-r*.24,r*.045,r*.045,'#ffffff',4);
  for(const s of[-1,1])vK(W,[[s*r*.04,by-r*.32],['q',s*r*.14,by-r*.66,s*r*.32,by-r*.74]],'#c8b8f0',r*.03);
  wMotes(W,0,by+r*.6,r*.5,-r*.9,T,4,'230,225,255',r*.04);return true};
MV1D[282]=(r,T,W,bob,sw,la,ra)=>{/* อัศวินพุ่มกุหลาบ: เกราะเป็นพุ่มไม้ตัดแต่ง หมวกเงิน เถากุหลาบพันมีดอกชมพู ทวนปลายเงินธงชมพู */const b=bob*.5,wv=Math.sin(T*2.6);
  const HG='#3e7a3a',HD='#2c5a2a',HL='#5a9a4a',AR='#c8ccd8',RS='#e8406a',RL='#ff8aa8';
  const leafy=(L,c)=>{const bb=vS(W,L,c);if(W||LOWQ)return;g.save();vP(L);g.clip();g.fillStyle='rgba(120,190,90,.35)';for(let i=0;i<10;i++){const x=bb[0]+((i*37)%10/10)*(bb[2]-bb[0]),y=bb[1]+((i*61)%10/10)*(bb[3]-bb[1]);g.beginPath();g.ellipse(x,y,r*.07,r*.045,i,0,7);g.fill()}g.restore()};
  const rose=(x,y,q)=>{for(let i=0;i<5;i++){const a=i*1.256+.3;vS(W,[[x,y],['q',x+Math.cos(a-.6)*q*1.3,y+Math.sin(a-.6)*q*1.2,x+Math.cos(a)*q*1.15,y+Math.sin(a)*q*1.05],['q',x+Math.cos(a+.6)*q*1.3,y+Math.sin(a+.6)*q*1.2,x,y]],'#b8284e',1,.5)}
    wE(W,x,y,q*.62,q*.56,RS);vK(W,[[x-q*.36,y+q*.08],['q',x-q*.2,y-q*.36,x+q*.16,y-q*.24],['q',x+q*.32,y-q*.04,x+q*.04,y+q*.12]],'#8a1838',q*.16);wED(W,x-q*.1,y-q*.14,q*.18,q*.12,RL)};
  const bush=(x0,y0,x1,y1)=>{const L=[[x0,y1]],n=Math.max(2,Math.round((y1-y0)/(r*.16)));for(let i=1;i<=n;i++){const y=y1-(y1-y0)*i/n;L.push(['q',x0-r*.08,y+(y1-y0)/n/2,x0,y])}const m=Math.max(2,Math.round((x1-x0)/(r*.16)));for(let i=1;i<=m;i++){const x=x0+(x1-x0)*i/m;L.push(['q',x-(x1-x0)/m/2,y0-r*.08,x,y0])}
    for(let i=1;i<=n;i++){const y=y0+(y1-y0)*i/n;L.push(['q',x1+r*.08,y-(y1-y0)/n/2,x1,y])}return L};
  /* ทวน + ธง */const sx=r*.5,sy=-r*.04+b+sw*.4;vK(W,[[sx-r*.06,sy+r*.9],[sx+r*.08,sy-r*1.1]],'#6a4a2a',r*.06);vS(W,[[sx+r*.05,sy-r*1.06],[sx+r*.14,sy-r*1.4],[sx+r*.17,sy-r*1.04]],'#e8eef6',1,.6);
  vS(W,[[sx+r*.07,sy-r*1.0],['q',sx-r*.2,sy-r*.98+wv*r*.04,sx-r*.4,sy-r*.9+wv*r*.08],[sx-r*.28,sy-r*.84],[sx-r*.38,sy-r*.76+wv*r*.06],['q',sx-r*.14,sy-r*.8,sx+r*.06,sy-r*.84]],'#f07aa0',1,.6);
  /* ขาพุ่ม */for(const[s,l,c]of[[-1,la,HD],[1,ra,HG]]){const x=s*r*.24;leafy(bush(x-r*.17,r*.3+b,x+r*.17,r*.78-l),c);vS(W,[[x-r*.2,r*.76-l],[x+r*.24,r*.78-l],[x+r*.22,r*.9-l],[x-r*.2,r*.9-l]],'#8a8e9a',1,.7)}
  /* แขนหลัง */leafy(bush(-r*.74,-r*.4+b,-r*.52,r*.14+b-sw*.3),HD);
  /* ลำตัวพุ่ม */leafy(bush(-r*.52,-r*.54+b,r*.52,r*.36+b),HG);
  vK(W,[[-r*.54,-r*.1+b],[r*.54,-r*.1+b]],'rgba(30,60,26,.4)',r*.03);vK(W,[[-r*.52,r*.16+b],[r*.52,r*.16+b]],'#8a8e9a',r*.07);
  /* เถากุหลาบพาด */vK(W,[[-r*.5,r*.3+b],['q',-r*.1,-r*.1+b,r*.24,r*.06+b],['q',r*.5,r*.16+b,r*.5,-r*.4+b]],'#2a5a26',r*.045);rose(-r*.3,r*.14+b,r*.13);rose(r*.1,-r*.04+b,r*.15);rose(r*.4,-r*.3+b,r*.11);
  /* บ่าพุ่มกลม */for(const[s,c]of[[-1,HD],[1,HL]])leafy([[s*r*.62-r*.2,-r*.5+b],['q',s*r*.62-r*.2,-r*.76+b,s*r*.62,-r*.76+b],['q',s*r*.62+r*.2,-r*.76+b,s*r*.62+r*.2,-r*.5+b],['q',s*r*.62,-r*.36+b,s*r*.62-r*.2,-r*.5+b]],c);rose(r*.66,-r*.68+b,r*.11);
  /* หมวกเงิน */const hy=-r*.78+b;vS(W,[[-r*.22,hy+r*.18],[-r*.24,hy-r*.12],['q',0,hy-r*.3,r*.24,hy-r*.12],[r*.24,hy+r*.18],['q',0,hy+r*.26,-r*.22,hy+r*.18]],AR);vK(W,[[0,hy-r*.26],[0,hy+r*.2]],'#9aa0b0',r*.03);
  vD(W,[[-r*.16,hy+r*.0],[r*.2,hy+r*.0],[r*.2,hy+r*.06],[-r*.16,hy+r*.06]],'#0c140c');vGlow(W,r*.02,hy+r*.03,r*.24,'230,220,255',.4);vEye(W,-r*.06,hy+r*.03,r*.04,r*.025,'#f0eaff',5);vEye(W,r*.1,hy+r*.03,r*.04,r*.025,'#f0eaff',5);
  rose(0,hy-r*.32,r*.11);
  /* แขนหน้าจับทวน */leafy(bush(r*.48,-r*.42+b,r*.7,sy+r*.04),HL);wE(W,sx,sy,r*.08,r*.08,'#8a8e9a');
  return true};

/* ================= 29: ห้องบัลลังก์ดาว ================= */
MV1D[290]=(r,T,W,bob,sw,la,ra)=>{/* องครักษ์หุ่นเชิดของโอเรียน: เกราะเงิน ข้อต่อลูกกลม หน้ากากกระเบื้อง เส้นเชือกแสงดาวดึงจากฟ้า หอก */const b=bob*.6,jk=Math.sin(T*3)*r*.04;
  const AR='#d0d4e0',AD='#9298ac',JT='#6a6e80',ST=W?'#fff':'rgba(255,240,170,.75)';
  const ball=(x,y,q)=>wE(W,x,y,q,q,JT,1);
  /* เชือกแสง */for(const[x,y]of[[-r*.36,r*.1+b-jk],[r*.5,-r*.1+b+jk],[0,-r*.92+b],[-r*.14,r*.5],[r*.14,r*.5]])vK(W,[[x,y],[x*.5,-r*2.2]],ST,r*.02);
  /* หอก */const sx=r*.5,sy=-r*.1+b+jk;vK(W,[[sx-r*.04,sy+r*.9],[sx+r*.06,sy-r*1.0]],'#5a4a3a',r*.05);vS(W,[[sx+r*.03,sy-r*.96],[sx+r*.11,sy-r*1.24],[sx+r*.15,sy-r*.94]],'#e8eef6',1,.6);
  /* ขาหุ่น */for(const[s,l]of[[-1,la],[1,ra]]){const x=s*r*.14;vS(W,[[x-r*.08,r*.24+b],[x+r*.08,r*.24+b],[x+r*.07,r*.5],[x-r*.07,r*.5]],s<0?AD:AR,1,.7);ball(x,r*.52,r*.07);vS(W,[[x-r*.07,r*.56],[x+r*.07,r*.56],[x+r*.06,r*.8-l],[x-r*.06,r*.8-l]],s<0?AD:AR,1,.7);vS(W,[[x-r*.09,r*.8-l],[x+r*.14,r*.82-l],[x+r*.12,r*.9-l],[x-r*.09,r*.9-l]],JT,1,.6)}
  /* แขนหลัง */ball(-r*.28,-r*.36+b,r*.07);vS(W,[[-r*.32,-r*.32+b],[-r*.24,-r*.3+b],[-r*.32,-r*.04+b-jk],[-r*.4,-r*.06+b-jk]],AD,1,.6);ball(-r*.36,r*.0+b-jk,r*.06);vS(W,[[-r*.4,r*.04+b-jk],[-r*.32,r*.04+b-jk],[-r*.34,r*.12+b-jk],[-r*.4,r*.12+b-jk]],JT,1,.5);
  /* ลำตัวเกราะ */vS(W,[[-r*.26,-r*.46+b],['q',0,-r*.54+b,r*.26,-r*.46+b],[r*.22,r*.06+b],[-r*.22,r*.06+b]],AR);vK(W,[[0,-r*.48+b],[0,r*.04+b]],'#9aa0b0',r*.03);for(const y of[-.26,-.1])vK(W,[[-r*.22,y*r+b],['q',0,y*r+r*.04+b,r*.22,y*r+b]],'#9aa0b0',r*.025);
  wStar(W,0,-r*.3+b,r*.09,r*.035,'#ffe08a');ball(0,r*.14+b,r*.1);vS(W,[[-r*.22,r*.2+b],[r*.22,r*.2+b],[r*.18,r*.3+b],[-r*.18,r*.3+b]],AD,1,.6);
  /* บ่าลูกกลม */ball(-r*.28,-r*.44+b,r*.1);ball(r*.28,-r*.44+b,r*.1);
  /* หัว: หน้ากากกระเบื้อง + หมวก */const hy=-r*.74+b;wE(W,0,hy,r*.18,r*.2,'#f4eef0');vS(W,[[-r*.22,hy-r*.04],['q',-r*.2,hy-r*.32,0,hy-r*.32],['q',r*.2,hy-r*.32,r*.22,hy-r*.04],['q',0,hy-r*.14,-r*.22,hy-r*.04]],AR);wStar(W,0,hy-r*.36,r*.07,r*.03,'#ffe08a');
  vEye(W,-r*.07,hy+r*.02,r*.035,r*.04,'#2a2a3a',0);vEye(W,r*.07,hy+r*.02,r*.035,r*.04,'#2a2a3a',0);vK(W,[[-r*.05,hy+r*.12],[r*.05,hy+r*.12]],'#b04a5a',r*.025);if(!W){g.fillStyle='rgba(255,140,160,.45)';g.beginPath();g.arc(-r*.11,hy+r*.08,r*.03,0,7);g.arc(r*.11,hy+r*.08,r*.03,0,7);g.fill()}
  vK(W,[[-r*.06,hy+r*.06],[-r*.08,hy+r*.18]],'rgba(80,80,100,.35)',r*.015);vK(W,[[r*.06,hy+r*.06],[r*.08,hy+r*.18]],'rgba(80,80,100,.35)',r*.015);
  /* แขนหน้าจับหอก */ball(r*.28,-r*.36+b,r*.07);vS(W,[[r*.26,-r*.32+b],[r*.34,-r*.32+b],[r*.44,sy-r*.04],[r*.38,sy]],AR,1,.6);ball(sx,sy,r*.07);
  return true};
MV1D[291]=(r,T,W)=>{/* ดาวล่ามโซ่: ดาวทองห้าแฉกมีหน้า ดิ้นรน โซ่ห้อยมีกุญแจมือ ข้อโซ่ขาด ประกาย */const by=-r*.34+Math.sin(T*2.6)*r*.08,rot=Math.sin(T*3.4)*.18;
  vGlow(W,0,by,r*1.2,'255,230,140',.3);
  /* โซ่ */const cx=Math.sin(T*2)*r*.1;wChain(W,0,by+r*.3,cx,by+r*1.0,5,r*.14,'#9aa0b0');vS(W,[[cx-r*.14,by+r*1.0],['q',cx-r*.16,by+r*1.18,cx,by+r*1.2],['q',cx+r*.16,by+r*1.18,cx+r*.14,by+r*1.0]],'#8a90a0',1,.6);vD(W,[[cx-r*.08,by+r*1.04],['q',cx,by+r*1.14,cx+r*.08,by+r*1.04]],'#2a2a34');
  g.save();g.translate(0,by);g.rotate(rot);g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.28:r*.62;g.lineTo(Math.cos(a)*q,Math.sin(a)*q)}g.closePath();const bb=[-r*.62,-r*.62,r*.62,r*.5];g.fillStyle=vCol(W,'#ffd040',bb[1],bb[3]);g.fill();if(!W)vOv(bb);g.lineWidth=1;g.strokeStyle=V1.O;g.stroke();
  wStar(W,0,-r*.02,r*.4,r*.18,W?'#fff':'#ffe88a');wStar(W,-r*.1,-r*.16,r*.12,r*.05,W?'#fff':'rgba(255,255,255,.7)');
  /* หน้าโกรธดิ้น */vEye(W,-r*.1,-r*.02,r*.05,r*.06,'#5a3a10',0);vEye(W,r*.1,-r*.02,r*.05,r*.06,'#5a3a10',0);vK(W,[[-r*.18,-r*.14],[-r*.04,-r*.08]],'#8a5a10',r*.03);vK(W,[[r*.18,-r*.14],[r*.04,-r*.08]],'#8a5a10',r*.03);vK(W,[[-r*.06,r*.12],['q',0,r*.06,r*.06,r*.12]],'#8a5a10',r*.03);
  /* ห่วงที่ปลายแฉกล่าง */g.beginPath();g.ellipse(r*.02,r*.36,r*.08,r*.06,0,0,7);g.strokeStyle=W?'#fff':'#9aa0b0';g.lineWidth=r*.05;g.stroke();g.restore();
  /* ข้อโซ่ขาดลอย */for(let i=0;i<2;i++){const p=(T*.6+i*.5)%1,x=(i?r*.6:-r*.6)+Math.sin(T+i)*r*.05,y=by-r*.1-p*r*.4;g.save();g.globalAlpha*=1-p;g.beginPath();g.ellipse(x,y,r*.08,r*.05,i+T,0,5.4);g.strokeStyle=W?'#fff':'#c8ccd8';g.lineWidth=r*.04;g.stroke();g.restore()}
  return true};
MV1D[292]=(r,T,W,bob,sw,la,ra)=>{/* ผู้คุมกลุ่มดาว: ร่างเสื้อคลุมยาวสีห้วงฟ้ามืด ดาวจุดเชื่อมเป็นกลุ่มดาว มงกุฎสามดาว ไม้เท้าดาว */const b=bob*.4,wv=Math.sin(T*2);
  const SK='#1c2450',SL='#2e3a78',SD='#141a3a',LN=W?'#fff':'rgba(170,200,255,.6)';
  const st=(x,y,q,k)=>{if(!W&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y,q*3,'200,220,255',.5+.3*Math.sin(T*3+k));g.restore()}wStar(W,x,y,q,q*.4,'#f0f4ff',T*.3+k,4)};
  /* ผ้าคลุมยาว */vS(W,[[-r*.36,-r*.5+b],['q',-r*.6,r*.1+b,-r*.66+wv*r*.04,r*.86],[r*.66-wv*r*.04,r*.86],['q',r*.6,r*.1+b,r*.36,-r*.5+b],['q',0,-r*.62+b,-r*.36,-r*.5+b]],SK);
  if(!W){g.save();g.fillStyle='rgba(220,230,255,.6)';for(let i=0;i<16;i++){const x=((i*37)%20/20-.5)*r*1.1,y=-r*.4+((i*53)%20/20)*r*1.2+b;g.globalAlpha=.3+.5*Math.abs(Math.sin(T*2+i));g.beginPath();g.arc(x,y,r*.02,0,7);g.fill()}g.restore()}
  vD(W,[[-r*.12,-r*.5+b],[r*.12,-r*.5+b],[r*.2,r*.86],[-r*.2,r*.86]],SL);
  /* กลุ่มดาวบนร่าง */const P=[[-r*.3,-r*.3+b],[-r*.08,-r*.12+b],[r*.24,-r*.3+b],[r*.06,r*.22+b],[-r*.24,r*.46+b],[r*.3,r*.6+b]];vK(W,[P[0],P[1],P[2]],LN,r*.025);vK(W,[P[1],P[3],P[4]],LN,r*.025);vK(W,[P[3],P[5]],LN,r*.025);P.forEach((p,i)=>st(p[0],p[1],r*(i===1?.08:.055),i));
  /* แขนกลุ่มดาว */for(const s of[-1,1]){const A=[[s*r*.34,-r*.4+b],[s*r*.62,-r*.12+b+(s>0?sw*.3:-sw*.3)],[s*r*.7,r*.24+b+(s>0?sw*.4:0)]];vLimb(W,A.flat(),s<0?SD:SL,r*.16,r*.1);vK(W,A,LN,r*.02);A.forEach((p,i)=>st(p[0],p[1],r*.045,i+7))}
  /* ไหล่ */vS(W,[[-r*.4,-r*.4+b],['q',0,-r*.66+b,r*.4,-r*.4+b],['q',0,-r*.48+b,-r*.4,-r*.4+b]],SL);
  /* หัว */const hy=-r*.76+b;vS(W,[[-r*.18,hy+r*.16],['q',-r*.22,hy-r*.18,0,hy-r*.2],['q',r*.22,hy-r*.18,r*.18,hy+r*.16],['q',0,hy+r*.26,-r*.18,hy+r*.16]],SK);vGlow(W,0,hy,r*.3,'200,220,255',.4);vEye(W,-r*.07,hy,r*.04,r*.03,'#e8f0ff',6);vEye(W,r*.07,hy,r*.04,r*.03,'#e8f0ff',6);
  /* มงกุฎสามดาว */for(let i=-1;i<=1;i++){const x=i*r*.14,y=hy-r*.3-(i===0?r*.1:0);vK(W,[[i*r*.08,hy-r*.18],[x,y]],LN,r*.02);st(x,y,r*.08,i+20)}
  /* ไม้เท้าดาว */const hx=r*.7,hy2=r*.24+b+sw*.4;vK(W,[[hx,hy2+r*.6],[hx+r*.04,hy2-r*1.1]],'#3a4070',r*.05);const ox=hx+r*.04,oy=hy2-r*1.22;vGlow(W,ox,oy,r*.5,'200,220,255',.5);wStar(W,ox,oy,r*.18,r*.07,'#f4f8ff',T*.8,4);wStar(W,ox,oy,r*.1,r*.04,'#ffffff',T*.8+.78,4);
  return true};

/* ================= 30: สะพานรุ่งอรุณ ================= */
MV1D[300]=(r,T,W,bob,sw)=>{/* เงาไต่ขอบสะพาน: ครึ่งล่างจมในเมฆชมพูทอง แขนยาวลากพื้น ตาส้มเรือง หลังโก่ง */const b=bob*.8,ph=T*3.4;
  const SH='#2a2034',SL='#3c304a';
  /* แขนหลัง */vLimb(W,[-r*.26,-r*.3+b,-r*.66,-r*.1+b,-r*.86,r*.44+Math.sin(ph)*r*.06],SH,r*.16,r*.08);for(const d of[-1,0,1])vK(W,[[-r*.86,r*.44+Math.sin(ph)*r*.06],['q',-r*.9+d*r*.05,r*.56,-r*.86+d*r*.12,r*.62]],SH,r*.05);
  /* ร่างโผล่ */vS(W,[[-r*.4,r*.4],['q',-r*.48,-r*.2+b,-r*.16,-r*.5+b],['q',r*.2,-r*.62+b,r*.42,-r*.34+b],['q',r*.54,r*.0+b,r*.44,r*.4]],SH);
  for(let i=0;i<4;i++)vK(W,[[-r*.3+i*r*.2,-r*.4+b+Math.abs(i-1.5)*r*.04],['q',-r*.26+i*r*.2,-r*.1+b,-r*.32+i*r*.2,r*.3]],'rgba(90,70,110,.4)',r*.035);
  /* หัว */const hx=r*.3,hy=-r*.44+b;vS(W,[[hx-r*.22,hy+r*.06],['q',hx-r*.2,hy-r*.22,hx+r*.04,hy-r*.24],['q',hx+r*.28,hy-r*.18,hx+r*.3,hy+r*.04],['q',hx+r*.2,hy+r*.2,hx,hy+r*.2],['q',hx-r*.18,hy+r*.18,hx-r*.22,hy+r*.06]],SL);
  vGlow(W,hx+r*.06,hy-r*.02,r*.3,'255,170,90',.5);vEye(W,hx-r*.02,hy-r*.02,r*.05,r*.035,'#ffb060',6);vEye(W,hx+r*.14,hy-r*.03,r*.045,r*.03,'#ffb060',6);vK(W,[[hx,hy+r*.1],['q',hx+r*.1,hy+r*.14,hx+r*.2,hy+r*.08]],'#140c1c',r*.035);
  /* แขนหน้ายาวลาก */vLimb(W,[r*.34,-r*.24+b,r*.7,-r*.02+b,r*.86,r*.44+Math.sin(ph+2)*r*.06],SL,r*.16,r*.08);for(const d of[-1,0,1])vK(W,[[r*.86,r*.44+Math.sin(ph+2)*r*.06],['q',r*.9+d*r*.05,r*.56,r*.88+d*r*.12,r*.62]],SL,r*.05);
  /* เมฆชมพูทอง */wCloud(W,0,r*.56,r*.86,r*.36,T,'#ffe0e8','#e8a8c0');if(!W){g.fillStyle='rgba(255,220,140,.35)';g.beginPath();g.ellipse(r*.1,r*.42,r*.5,r*.08,0,0,7);g.fill()}
  return true};
MV1D[301]=(r,T,W)=>{/* นกเงาสนธยา: เงาดำขอบปีกไล่สีส้มชมพูแบบฟ้าสนธยา หางยาวสองเส้น ตาส้ม */const by=-r*.3+Math.sin(T*2.8)*r*.1,fp=Math.sin(T*7);
  const BK='#241a2e';
  const wing=(far)=>{const k=far?.8:1,tipY=by-r*(.1+fp*.8)*k,tx=-r*(far?.6:.8);const P=[[r*.1,by-r*.08],['q',-r*.1,tipY-r*.1,tx,tipY]];for(let i=1;i<=5;i++){const t=i/5,x=tx+(-r*.2-tx)*t,y=tipY+(by+r*.1-tipY)*t+Math.sin(t*Math.PI)*r*.2;P.push([x-r*.12,y+r*.1]);P.push([x+r*.03,y])}
    const bb=vS(W,P,far?'#1a1222':BK,1,.8);if(!W&&!far){g.save();vP(P);g.clip();const G=g.createLinearGradient(tx,tipY,r*.1,by);G.addColorStop(0,'rgba(255,150,90,.85)');G.addColorStop(.35,'rgba(255,110,150,.5)');G.addColorStop(.7,'rgba(255,110,150,0)');g.fillStyle=G;g.fillRect(bb[0]-2,bb[1]-2,bb[2]-bb[0]+4,bb[3]-bb[1]+4);g.restore()}};
  wing(true);
  /* หางยาว */for(const[d,c]of[[-1,'#1a1222'],[1,BK]])vK(W,[[-r*.4,by+r*.06],['q',-r*.8,by+r*(.1+d*.04)+Math.sin(T*4)*r*.06,-r*1.2,by+r*(.2+d*.12)]],c,r*.06);for(const d of[-1,1])wED(W,-r*1.2,by+r*(.2+d*.12),r*.06,r*.04,'#ff9a6a');
  vS(W,[[-r*.46,by+r*.06],['q',-r*.12,by-r*.3,r*.3,by-r*.26],['q',r*.52,by-r*.16,r*.5,by+r*.04],['q',r*.3,by+r*.28,-r*.46,by+r*.06]],BK);
  vS(W,[[r*.42,by-r*.14],[r*.66,by-r*.06],[r*.42,by+r*.0]],'#3a2a3e',1,.6);vGlow(W,r*.32,by-r*.12,r*.2,'255,170,90',.5);vEye(W,r*.32,by-r*.12,r*.045,r*.04,'#ffb060',5);
  wing(false);return true};
MV1D[302]=(r,T,W,bob,sw,la,ra)=>{/* ผู้แบกเฟืองสำริด: ยักษ์เงาหลังค่อม แบกเฟืองสำริดยักษ์บนหลังด้วยสายรัด เกราะสำริดบางส่วน แกนเรืองที่อก */const b=bob*.5,gl=.6+.4*Math.sin(T*2.2);
  const SH='#2c2238',SL='#3e3250',BZ='#c08a40',BD='#8a5e28';
  /* เฟืองใหญ่บนหลัง */const gx=-r*.24,gy=-r*.62+b;wGear(W,gx,gy,r*.62,r*.5,14,T*.4,BZ,null);if(!W){g.fillStyle='#6a4a20';g.beginPath();g.arc(gx,gy,r*.36,0,7);g.fill();g.fillStyle=BZ;g.beginPath();g.arc(gx,gy,r*.28,0,7);g.fill();g.fillStyle='#4a3218';g.beginPath();g.arc(gx,gy,r*.1,0,7);g.fill()}
  for(let i=0;i<6;i++){const a=T*.4+i*1.047;vK(W,[[gx+Math.cos(a)*r*.1,gy+Math.sin(a)*r*.1],[gx+Math.cos(a)*r*.36,gy+Math.sin(a)*r*.36]],BD,r*.05)}
  /* ขา */for(const[s,l,c]of[[-1,la,SH],[1,ra,SL]]){const x=s*r*.24;vS(W,[[x-r*.17,r*.3+b],[x+r*.17,r*.3+b],['q',x+r*.22,r*.6,x+r*.19,r*.86-l],[x-r*.21,r*.86-l],['q',x-r*.22,r*.6,x-r*.17,r*.3+b]],c);vS(W,[[x-r*.16,r*.5],[x+r*.16,r*.5],[x+r*.14,r*.64],[x-r*.14,r*.64]],BD,1,.6)}
  /* ลำตัวค่อม */vS(W,[[-r*.5,r*.36+b],['q',-r*.6,-r*.2+b,-r*.24,-r*.46+b],['q',r*.2,-r*.56+b,r*.46,-r*.24+b],['q',r*.62,r*.1+b,r*.46,r*.36+b],['q',0,r*.46+b,-r*.5,r*.36+b]],SL);
  /* สายรัด */vK(W,[[-r*.5,-r*.2+b],['q',0,r*.0+b,r*.44,-r*.3+b]],'#5a3a20',r*.08);vK(W,[[-r*.46,r*.1+b],['q',-r*.1,-r*.3+b,r*.1,-r*.52+b]],'#5a3a20',r*.07);
  /* เกราะอกสำริด */vS(W,[[r*.0,-r*.2+b],[r*.4,-r*.24+b],[r*.42,r*.16+b],[r*.04,r*.2+b]],BZ);vGlow(W,r*.22,-r*.02+b,r*.4,'255,200,110',.4*gl);wE(W,r*.22,-r*.02+b,r*.1,r*.1,W?'#fff':'#ffe0a0');
  /* หัวต่ำ */const hx=r*.44,hy=-r*.36+b;vS(W,[[hx-r*.18,hy+r*.06],['q',hx-r*.16,hy-r*.18,hx+r*.06,hy-r*.18],['q',hx+r*.26,hy-r*.12,hx+r*.24,hy+r*.06],['q',hx+r*.14,hy+r*.2,hx-r*.04,hy+r*.18],['q',hx-r*.16,hy+r*.16,hx-r*.18,hy+r*.06]],SH);
  vS(W,[[hx-r*.14,hy-r*.08],[hx+r*.2,hy-r*.1],[hx+r*.2,hy-r*.02],[hx-r*.14,hy+r*.0]],BD,1,.5);vEye(W,hx+r*.0,hy+r*.06,r*.04,r*.03,'#ffb060',6);vEye(W,hx+r*.14,hy+r*.05,r*.04,r*.03,'#ffb060',6);
  /* แขน */vLimb(W,[r*.34,-r*.2+b,r*.6,r*.06+b,r*.58,r*.36+b+sw*.4],SL,r*.2,r*.14);wE(W,r*.6,r*.4+b+sw*.4,r*.12,r*.1,SL);vLimb(W,[-r*.4,-r*.16+b,-r*.6,r*.1+b,-r*.58,r*.36+b-sw*.4],SH,r*.18,r*.12);
  return true};

/* ================= 31: ย่านวงแหวนล่าง ================= */
MV1D[310]=(r,T,W,bob,sw,la,ra)=>{/* ภูตเถ้าเย็น: ร่างเถ้าดำ รอยร้าวเรืองฟ้าเย็น ผ้าแผงตลาดลายทางไหม้คลุมไหล่ เถ้าปลิวขึ้น */const b=bob*.6,gl=.6+.4*Math.sin(T*3);
  const AS='#2e2c30',AD='#1e1c22',CK=W?'#fff':'rgba(140,220,255,'+(.6+gl*.4)+')';
  for(const[s,l,c]of[[-1,la,AD],[1,ra,AS]]){const x=s*r*.14;vLimb(W,[x,r*.2+b,x+s*r*.02,r*.5,x,r*.82-l],c,r*.17,r*.12);vK(W,[[x-r*.03,r*.4],[x+r*.02,r*.56]],CK,r*.025)}
  vLimb(W,[-r*.24,-r*.34+b,-r*.36,-r*.04+b,-r*.3,r*.18+b-sw*.4],AD,r*.13,r*.09);
  vS(W,[[-r*.28,-r*.44+b],['q',0,-r*.54+b,r*.28,-r*.44+b],['q',r*.32,-r*.06+b,r*.24,r*.26+b],[-r*.24,r*.26+b],['q',-r*.32,-r*.06+b,-r*.28,-r*.44+b]],AS);
  vGlow(W,0,-r*.1+b,r*.45,'140,220,255',.25*gl);vK(W,[[-r*.06,-r*.4+b],[r*.04,-r*.24+b],[-r*.04,-r*.1+b],[r*.08,r*.06+b],[r*.02,r*.2+b]],CK,r*.035);vK(W,[[r*.04,-r*.24+b],[r*.18,-r*.18+b]],CK,r*.025);vK(W,[[-r*.04,-r*.1+b],[-r*.18,-r*.02+b]],CK,r*.025);
  /* ผ้าแผงตลาดลายทาง ไหม้ */const L=[[-r*.36,-r*.42+b],['q',0,-r*.6+b,r*.36,-r*.42+b],[r*.38,-r*.16+b],[r*.28,-r*.2+b],[r*.22,-r*.08+b],[r*.12,-r*.18+b],[r*.02,-r*.06+b],[-r*.1,-r*.16+b],[-r*.2,-r*.04+b],[-r*.3,-r*.18+b],[-r*.38,-r*.12+b]];vS(W,L,'#c8b8a0');
  if(!W){g.save();vP(L);g.clip();g.fillStyle='#b83a2a';for(let i=-3;i<4;i++){g.beginPath();g.moveTo(i*r*.16-r*.04,-r*.6+b);g.lineTo(i*r*.16+r*.04,-r*.6+b);g.lineTo(i*r*.16+r*.08,0+b);g.lineTo(i*r*.16,0+b);g.closePath();g.fill()}g.fillStyle='rgba(30,20,20,.45)';g.beginPath();g.ellipse(r*.2,-r*.14+b,r*.2,r*.1,0,0,7);g.ellipse(-r*.26,-r*.12+b,r*.14,r*.08,0,0,7);g.fill();g.restore()}
  /* หัวเถ้า */const hy=-r*.68+b;wE(W,0,hy,r*.18,r*.19,AS);vK(W,[[-r*.06,hy-r*.18],[r*.0,hy-r*.06],[-r*.04,hy+r*.06]],CK,r*.03);vGlow(W,r*.04,hy,r*.26,'140,220,255',.45);vEye(W,-r*.04,hy+r*.0,r*.04,r*.03,'#bfefff',6);vEye(W,r*.1,hy+r*.0,r*.035,r*.03,'#bfefff',6);
  vLimb(W,[r*.24,-r*.34+b,r*.38,-r*.06+b,r*.36,r*.18+b+sw*.4],AS,r*.13,r*.09);
  wMotes(W,0,-r*.5+b,r*.4,r*.8,T,5,'120,120,130',r*.04);return true};
MV1D[311]=(r,T,W)=>{/* หนูเงาซอย: กระโจนกลางอากาศ ขนดำยุ่ง ตาแดงเรือง หางยาวสะบัด ควันเงาตามหลัง */const by=-r*.24+Math.sin(T*3)*r*.08,lg=Math.sin(T*10);
  const FR='#221c26',FL='#38303e';
  wMotes(W,-r*.6,by+r*.2,r*.2,-r*.1,T,3,'60,40,80',r*.08);
  /* หาง */vK(W,[[-r*.5,by+r*.06],['q',-r*.9,by-r*.1+Math.sin(T*5)*r*.12,-r*1.24,by+r*.12+Math.sin(T*5+1)*r*.14]],'#5a3a48',r*.05);
  /* ขาหลัง */vLimb(W,[-r*.36,by+r*.12,-r*.5-lg*r*.08,by+r*.3,-r*.66-lg*r*.12,by+r*.3],FR,r*.1,r*.05);
  /* ตัว */vS(W,[[-r*.6,by+r*.08],['q',-r*.5,by-r*.36,r*.04,by-r*.36],['q',r*.4,by-r*.3,r*.5,by-r*.04],['q',r*.4,by+r*.24,-r*.06,by+r*.24],['q',-r*.46,by+r*.26,-r*.6,by+r*.08]],FR);
  for(let i=0;i<6;i++){const x=-r*.46+i*r*.14,y=by-r*.3+Math.abs(i-2.5)*r*.03;vD(W,[[x-r*.05,y+r*.04],[x+r*.02,y-r*.08],[x+r*.06,y+r*.04]],FL)}
  /* ขาหน้า */vLimb(W,[r*.24,by+r*.14,r*.4+lg*r*.08,by+r*.3,r*.56+lg*r*.1,by+r*.28],FR,r*.09,r*.05);
  /* หัว */vS(W,[[r*.3,by-r*.18],['q',r*.5,by-r*.3,r*.8,by-r*.04],['q',r*.6,by+r*.1,r*.36,by+r*.08]],FL);wED(W,r*.8,by-r*.04,r*.04,r*.04,'#e88a9a');
  for(const[x,c]of[[r*.34,'#2a2030'],[r*.44,FL]]){wE(W,x,by-r*.26,r*.1,r*.12,c);wED(W,x,by-r*.26,r*.05,r*.07,'#8a5a6a')}
  vGlow(W,r*.54,by-r*.12,r*.2,'255,60,60',.5);vEye(W,r*.54,by-r*.12,r*.045,r*.04,'#ff4a4a',6);
  for(const d of[-1,1])vK(W,[[r*.76,by-r*.02],[r*.96,by-r*.02+d*r*.06]],'rgba(200,190,200,.6)',r*.015);
  return true};
MV1D[312]=(r,T,W,bob,sw,la,ra)=>{/* เงาโคมแดง: ร่างเงาสูง หัวเป็นโคมกระดาษแดงเรือง ลายพู่ทอง พวงโคมเล็กรอบคอ เสื้อคลุมดำขาดชาย */const b=bob*.5,wv=Math.sin(T*2.4),fl=.7+.3*Math.sin(T*9);
  const SH='#1e1824',SL='#2e2636',RD='#d8302a',RL='#ff6a40',GD='#e8c45a';
  const lantern=(x,y,w,h,k)=>{vGlow(W,x,y,w*2.4,'255,120,60',.45*fl);vK(W,[[x,y-h*.62],[x,y-h*.5]],GD,w*.12);vS(W,[[x-w*.5,y-h*.42],[x+w*.5,y-h*.42],[x+w*.5,y-h*.5],[x-w*.5,y-h*.5]],'#2a1a10',1,.4);
    vS(W,[[x-w*.4,y-h*.42],['q',x-w*1.05,y,x-w*.4,y+h*.42],[x+w*.4,y+h*.42],['q',x+w*1.05,y,x+w*.4,y-h*.42]],RD,1,.6);vD(W,[[x-w*.2,y-h*.4],['q',x-w*.5,y,x-w*.2,y+h*.4],[x+w*.0,y+h*.4],['q',x-w*.24,y,x+w*.0,y-h*.4]],W?'#fff':'rgba(255,190,120,.6)');
    for(const k2 of[-.2,0,.2])vK(W,[[x-w*.8,y+h*k2],['q',x,y+h*k2+h*.06,x+w*.8,y+h*k2]],'rgba(80,10,10,.45)',w*.05);vS(W,[[x-w*.4,y+h*.42],[x+w*.4,y+h*.42],[x+w*.4,y+h*.5],[x-w*.4,y+h*.5]],'#2a1a10',1,.4);vK(W,[[x,y+h*.5],[x+Math.sin(T*3+k)*w*.1,y+h*.8]],GD,w*.1)};
  /* เสื้อคลุม */vS(W,[[-r*.3,-r*.44+b],['q',-r*.52,r*.1+b,-r*.56+wv*r*.04,r*.8],[-r*.4,r*.68],[-r*.28,r*.86],[-r*.12,r*.7],[0,r*.86],[r*.12,r*.7],[r*.28,r*.86],[r*.4,r*.68],[r*.56-wv*r*.04,r*.8],['q',r*.52,r*.1+b,r*.3,-r*.44+b],['q',0,-r*.54+b,-r*.3,-r*.44+b]],SH);
  vK(W,[[-r*.04,-r*.4+b],[-r*.08,r*.7]],SL,r*.06);
  /* แขน */vLimb(W,[-r*.26,-r*.36+b,-r*.46,-r*.04+b,-r*.4,r*.24+b-sw*.4],SL,r*.13,r*.09);vLimb(W,[r*.26,-r*.36+b,r*.46,-r*.04+b,r*.42,r*.24+b+sw*.4],SL,r*.13,r*.09);
  /* พวงโคมรอบคอ */vK(W,[[-r*.34,-r*.44+b],['q',0,-r*.24+b,r*.34,-r*.44+b]],'#3a2a20',r*.03);for(let i=0;i<5;i++){const t=(i+.5)/5,x=-r*.34+t*r*.68,y=-r*.44+b+Math.sin(t*Math.PI)*r*.16+r*.08;lantern(x,y,r*.08,r*.12,i)}
  /* หัวโคม */const hy=-r*.76+b;lantern(0,hy,r*.32,r*.42,9);vD(W,[[-r*.12,hy-r*.02],[-r*.04,hy-r*.06],[-r*.04,hy+r*.0]],'#2a0a08');vD(W,[[r*.12,hy-r*.02],[r*.04,hy-r*.06],[r*.04,hy+r*.0]],'#2a0a08');vK(W,[[-r*.08,hy+r*.1],['q',0,hy+r*.06,r*.08,hy+r*.1]],'#2a0a08',r*.03);
  return true};

/* ================= 32: ซากอารัณยา ================= */
MV1D[320]=(r,T,W,bob,sw,la,ra)=>{/* ทหารเงาอารัณยา: หน้ากากสำริดรูปตะวัน พู่ เสื้อคลุมม่วงดำตราตะวัน หอกยาว ร่างเงาสลาย */const b=bob*.6,wv=Math.sin(T*2.8);
  const SH='#2a2038',SL='#3a2e4c',BZ='#d0903a',BD='#8a5a22';
  /* หอก */const sx=r*.44,sy=-r*.06+b+sw*.4;vK(W,[[sx-r*.06,sy+r*.92],[sx+r*.08,sy-r*1.04]],'#3a2a20',r*.06);vS(W,[[sx+r*.05,sy-r*1.0],[sx+r*.12,sy-r*1.3],[sx+r*.17,sy-r*.98]],BZ,1,.6);vK(W,[[sx+r*.03,sy-r*.94],[sx+r*.16,sy-r*.92]],BD,r*.05);
  /* เสื้อคลุม */vS(W,[[-r*.28,-r*.46+b],['q',0,-r*.56+b,r*.28,-r*.46+b],['q',r*.4,r*.0+b,r*.36,r*.5+b],[r*.24,r*.62+wv*r*.03],[r*.1,r*.5],[-r*.02,r*.66-wv*r*.03],[-r*.14,r*.5],[-r*.28,r*.62],[-r*.38,r*.5+b],['q',-r*.4,r*.0+b,-r*.28,-r*.46+b]],SH);
  for(const s of[-1,1])vK(W,[[s*r*.14,r*.4],[s*r*.14,r*.82-(s<0?la:ra)]],SL,r*.14);
  vGlow(W,0,-r*.1+b,r*.3,'255,180,80',.3);const ex=0,ey=-r*.12+b;for(let i=0;i<8;i++){const a=i*.785+T*.4;vK(W,[[ex+Math.cos(a)*r*.08,ey+Math.sin(a)*r*.08],[ex+Math.cos(a)*r*.16,ey+Math.sin(a)*r*.16]],BZ,r*.035)}wE(W,ex,ey,r*.07,r*.07,BZ);
  vK(W,[[-r*.3,r*.16+b],[r*.3,r*.16+b]],BD,r*.05);
  /* หัว + หน้ากากตะวัน */const hy=-r*.7+b;wE(W,0,hy+r*.02,r*.18,r*.2,SH);vS(W,[[r*.0,hy-r*.18],['q',-r*.24,hy-r*.44+wv*r*.04,-r*.44,hy-r*.3],['q',-r*.22,hy-r*.26,-r*.04,hy-r*.12]],'#8a2a3a',1,.6);
  for(let i=0;i<10;i++){const a=i*.628;vS(W,[[r*.04+Math.cos(a-.16)*r*.16,hy+Math.sin(a-.16)*r*.16],[r*.04+Math.cos(a)*r*.26,hy+Math.sin(a)*r*.26],[r*.04+Math.cos(a+.16)*r*.16,hy+Math.sin(a+.16)*r*.16]],BD,1,.4)}
  wE(W,r*.04,hy,r*.17,r*.17,BZ);vEye(W,-r*.02,hy-r*.02,r*.04,r*.025,'#ffd070',5);vEye(W,r*.12,hy-r*.02,r*.04,r*.025,'#ffd070',5);vK(W,[[-r*.02,hy+r*.08],['q',r*.05,hy+r*.12,r*.12,hy+r*.08]],BD,r*.03);
  /* แขน */vLimb(W,[r*.22,-r*.36+b,r*.36,-r*.12+b,sx,sy],SL,r*.13,r*.1);wE(W,sx,sy,r*.07,r*.07,SH);
  wMotes(W,0,r*.7,r*.3,r*.7,T,4,'90,70,130',r*.06);return true};
MV1D[321]=(r,T,W)=>{/* เงาไต่: ก้อนเงาลอยมีขาบางหลายขา ตาส้มหลายดวง หยดเงา */const by=-r*.26+Math.sin(T*2.8)*r*.08,ph=T*7;
  const SH='#241c30',SL='#342a44';
  for(let i=0;i<6;i++){const s=i<3?-1:1,k=i%3,a=Math.sin(ph+i)*r*.06,x0=s*r*.2,y0=by+r*.04,kx=s*r*(.5+k*.12),ky=by-r*(.2-k*.1)+a,fx=s*r*(.66+k*.1),fy=by+r*(.4+k*.1)+a;vLimb(W,[x0,y0,kx,ky,fx,fy],k===1?SH:SL,r*.07,r*.025)}
  vS(W,[[-r*.42,by+r*.06],['q',-r*.46,-r*.36+by,0,-r*.38+by],['q',r*.46,-r*.36+by,r*.44,by+r*.06],['q',r*.3,r*.3+by,0,r*.28+by],['q',-r*.3,r*.3+by,-r*.42,by+r*.06]],SH);
  for(let i=0;i<5;i++)vD(W,[[-r*.3+i*r*.15,-r*.3+by+Math.abs(i-2)*r*.04],[-r*.26+i*r*.15,-r*.46+by+Math.abs(i-2)*r*.04],[-r*.22+i*r*.15,-r*.3+by+Math.abs(i-2)*r*.04]],SL);
  vGlow(W,0,-r*.06+by,r*.36,'255,160,80',.45);for(const[x,y,q]of[[-.16,-.1,.06],[.14,-.12,.065],[0,-.2,.045],[-.26,.02,.035],[.26,.0,.035],[.04,.04,.035]])vEye(W,x*r,y*r+by,q*r,q*r,'#ffb060',5);
  if(!W){const p=(T*.8)%1;g.fillStyle='rgba(40,28,60,'+(.8*(1-p))+')';g.beginPath();g.ellipse(-r*.06,r*.28+by+p*r*.6,r*.05,r*.08,0,0,7);g.fill()}
  return true};
MV1D[322]=(r,T,W,bob,sw,la,ra)=>{/* ผู้ถือระฆังเงา: ร่างคลุมสูงม่วงดำ เครื่องประดับสำริด หน้ากากสำริดตาส้ม ไม้เท้าแขวนระฆังสำริด คลื่นเสียงระฆัง */const b=bob*.4,wv=Math.sin(T*2),rg=Math.sin(T*4)*.3;
  const SH='#22182e',SL='#32263e',BZ='#d0903a',BD='#8a5a22';
  /* ไม้เท้า + ระฆัง */const sx=r*.56,sy=-r*.2+b;vK(W,[[sx-r*.04,sy+r*1.06],[sx+r*.04,sy-r*.9]],'#3a2a20',r*.07);vK(W,[[sx+r*.04,sy-r*.9],['q',sx+r*.3,sy-r*1.04,sx+r*.32,sy-r*.84]],BD,r*.05);
  g.save();g.translate(sx+r*.32,sy-r*.84);g.rotate(rg);vS(W,[[-r*.16,r*.24],['q',-r*.16,-r*.04,0,-r*.04],['q',r*.16,-r*.04,r*.16,r*.24],[r*.2,r*.28],[-r*.2,r*.28]],BZ,1,.7);wED(W,0,r*.3,r*.05,r*.04,BD);g.restore();
  if(!W)for(let i=0;i<2;i++){const p=(T*.9+i*.5)%1;g.strokeStyle='rgba(255,200,120,'+(.6*(1-p))+')';g.lineWidth=r*.04;g.beginPath();g.arc(sx+r*.32,sy-r*.7,r*(.3+p*.6),-1.2,1.2);g.stroke();g.beginPath();g.arc(sx+r*.32,sy-r*.7,r*(.3+p*.6),Math.PI-1.2,Math.PI+1.2);g.stroke()}
  /* เสื้อคลุมยาว */vS(W,[[-r*.32,-r*.5+b],['q',-r*.56,r*.1+b,-r*.58+wv*r*.04,r*.86],[r*.58-wv*r*.04,r*.86],['q',r*.56,r*.1+b,r*.32,-r*.5+b],['q',0,-r*.62+b,-r*.32,-r*.5+b]],SH);
  vK(W,[[0,-r*.46+b],[0,r*.84]],BD,r*.05);for(let i=0;i<3;i++)wE(W,0,-r*.3+i*r*.3+b,r*.05,r*.05,BZ);vK(W,[[-r*.56,r*.8],[r*.56,r*.8]],BD,r*.04);
  /* แขน */vLimb(W,[-r*.3,-r*.4+b,-r*.44,-r*.06+b,-r*.38,r*.2+b],SL,r*.15,r*.11);vLimb(W,[r*.3,-r*.4+b,r*.46,-r*.2+b,sx,sy],SL,r*.15,r*.11);wE(W,sx,sy,r*.07,r*.07,'#d8c8b8');
  /* ฮู้ด + หน้ากาก */const hy=-r*.74+b;vS(W,[[-r*.26,hy+r*.2],['q',-r*.3,hy-r*.2,0,hy-r*.34],['q',r*.3,hy-r*.2,r*.26,hy+r*.2],['q',0,hy+r*.3,-r*.26,hy+r*.2]],SL);vD(W,[[-r*.16,hy+r*.16],['q',-r*.16,hy-r*.12,0,hy-r*.14],['q',r*.16,hy-r*.12,r*.16,hy+r*.16]],'#0e0a14');
  vS(W,[[-r*.12,hy-r*.06],['q',0,hy-r*.12,r*.12,hy-r*.06],[r*.1,hy+r*.12],['q',0,hy+r*.18,-r*.1,hy+r*.12]],BZ,1,.6);vEye(W,-r*.05,hy+r*.0,r*.035,r*.025,'#ff9a40',6);vEye(W,r*.05,hy+r*.0,r*.035,r*.025,'#ff9a40',6);vGlow(W,0,hy,r*.26,'255,160,80',.4);
  return true};

/* ================= 33: หลุมหัวใจว่าง ================= */
MV1D[330]=(r,T,W,bob,sw,la,ra)=>{/* เงาผู้รอคอย: หลังค่อมเหมือนนั่งรอมานาน ตาเดียวกลวงเรืองม่วง กุญแจมือ โซ่แสงม่วงขาดห้อย */const b=bob*.4,wv=Math.sin(T*2);
  const SH='#241a32',SL='#342848',CH=W?'#fff':'#c890ff';
  vGlow(W,0,-r*.2+b,r*1.0,'190,130,255',.14);
  vS(W,[[-r*.4,r*.86],['q',-r*.5,r*.1+b,-r*.3,-r*.36+b],['q',-r*.06,-r*.6+b,r*.24,-r*.5+b],['q',r*.46,-r*.3+b,r*.44,r*.1+b],['q',r*.46,r*.5,r*.4,r*.86],[r*.26,r*.74],[r*.12,r*.88],[0,r*.76],[-r*.14,r*.88],[-r*.26,r*.76]],SH);
  for(let i=0;i<3;i++)vK(W,[[-r*.26+i*r*.2,-r*.3+b],['q',-r*.3+i*r*.2,r*.2,-r*.24+i*r*.2,r*.7]],'rgba(80,60,120,.4)',r*.035);
  /* หัวก้ม */const hx=r*.2,hy=-r*.54+b;vS(W,[[hx-r*.2,hy+r*.06],['q',hx-r*.2,hy-r*.2,hx+r*.02,hy-r*.22],['q',hx+r*.24,hy-r*.2,hx+r*.24,hy+r*.04],['q',hx+r*.14,hy+r*.22,hx-r*.02,hy+r*.2],['q',hx-r*.16,hy+r*.18,hx-r*.2,hy+r*.06]],SL);
  vGlow(W,hx+r*.04,hy,r*.3,'200,140,255',.5);wE(W,hx+r*.04,hy,r*.07,r*.08,'#0a0614');vEye(W,hx+r*.04,hy,r*.04,r*.05,'#e0b8ff',7);
  /* แขนห้อย + กุญแจมือ + โซ่ขาด */for(const[s,c]of[[-1,SH],[1,SL]]){const x=s*r*.34,y=r*.26+b+(s>0?wv:-wv)*r*.02;vLimb(W,[s*r*.3,-r*.3+b,s*r*.4,r*.0+b,x,y],c,r*.13,r*.1);vS(W,[[x-r*.1,y-r*.04],[x+r*.1,y-r*.04],[x+r*.1,y+r*.06],[x-r*.1,y+r*.06]],'#7a7488',1,.6);
    vGlow(W,x,y+r*.3,r*.3,'200,140,255',.3);wChain(W,x,y+r*.06,x+s*r*.06+Math.sin(T*2+s)*r*.04,y+r*.48,4,r*.1,CH);if(!W&&!LOWQ){g.fillStyle='rgba(220,180,255,.7)';g.beginPath();g.arc(x+s*r*.06,y+r*.52,r*.03,0,7);g.fill()}}
  return true};
MV1D[331]=(r,T,W)=>{/* ข้อโซ่แสง: ข้อโซ่เรืองม่วงต่อกันเลื้อยกลางอากาศ หัวเป็นกุญแจมีรูกุญแจเป็นตา */const by=-r*.3,CH=W?'#fff':'#c890ff';
  vGlow(W,0,by,r*1.2,'190,130,255',.24);
  const P=[];for(let i=0;i<6;i++){const t=i/5;P.push([-r*.8+t*r*1.2,by+Math.sin(T*3-i*.9)*r*.24])}
  for(let i=P.length-1;i>0;i--){const[x0,y0]=P[i-1],[x1,y1]=P[i],a=Math.atan2(y1-y0,x1-x0),mx=(x0+x1)/2,my=(y0+y1)/2;g.save();g.translate(mx,my);g.rotate(a);g.beginPath();if(i%2)g.ellipse(0,0,r*.16,r*.09,0,0,7);else g.ellipse(0,0,r*.16,r*.03,0,0,7);g.strokeStyle=CH;g.lineWidth=r*.07;g.stroke();g.restore()}
  /* หัวกุญแจ */const[hx,hy]=P[5];g.save();g.translate(hx+r*.12,hy);g.rotate(Math.sin(T*3)*.15);g.beginPath();g.arc(0,-r*.1,r*.18,Math.PI,0);g.strokeStyle=W?'#fff':'#9a8ab8';g.lineWidth=r*.07;g.stroke();
  vS(W,[[-r*.26,-r*.1],[r*.26,-r*.1],[r*.24,r*.3],[-r*.24,r*.3]],'#8a7aa8');vK(W,[[-r*.24,r*.0],[r*.24,r*.0]],'#5a4a78',r*.03);vGlow(W,0,r*.1,r*.3,'210,160,255',.5);vD(W,[[-r*.06,r*.06],['q',-r*.06,-r*.04,0,-r*.04],['q',r*.06,-r*.04,r*.06,r*.06],[r*.03,r*.08],[r*.05,r*.22],[-r*.05,r*.22],[-r*.03,r*.08]],W?'#fff':'#e8d0ff');g.restore();
  if(!W)for(let i=0;i<3;i++){const p=(T*.8+i*.33)%1;g.fillStyle='rgba(220,180,255,'+(.8*(1-p))+')';g.beginPath();g.arc(-r*.9-p*r*.3,by+Math.sin(T+i)*r*.2,r*.03,0,7);g.fill()}
  return true};
MV1D[332]=(r,T,W,bob,sw,la,ra)=>{/* ผู้ถักโซ่: ร่างใหญ่ 4 แขน หน้ากากซีด ถักโซ่แสงระหว่างมือ จี้สมอที่อก เสื้อคลุมยาว */const b=bob*.4,wv=Math.sin(T*2.2),kn=Math.sin(T*3)*r*.06;
  const SH='#22182e',SL='#342846',MK='#e8e2ea',CH=W?'#fff':'#c890ff';
  vGlow(W,0,-r*.3+b,r*1.3,'190,130,255',.14);
  /* แขนล่างคู่หลัง */vLimb(W,[-r*.36,-r*.2+b,-r*.62,r*.06+b,-r*.46,r*.24+b+kn],SH,r*.14,r*.1);vLimb(W,[r*.36,-r*.2+b,r*.62,r*.06+b,r*.46,r*.24+b-kn],SH,r*.14,r*.1);
  /* เสื้อคลุม */vS(W,[[-r*.4,-r*.54+b],['q',-r*.66,r*.1+b,-r*.66+wv*r*.04,r*.86],[r*.66-wv*r*.04,r*.86],['q',r*.66,r*.1+b,r*.4,-r*.54+b],['q',0,-r*.68+b,-r*.4,-r*.54+b]],SL);
  for(let i=0;i<4;i++)vK(W,[[-r*.3+i*r*.2,-r*.4+b],[-r*.4+i*r*.26,r*.84]],'rgba(20,14,30,.4)',r*.03);
  /* โซ่ที่ถัก */wChain(W,-r*.46,r*.24+b+kn,r*.46,r*.24+b-kn,7,r*.12,CH);wChain(W,-r*.62,-r*.36+b,r*.62,-r*.36+b-kn,8,r*.11,CH);vGlow(W,0,r*.0+b,r*.6,'200,140,255',.3);
  /* จี้สมอ */const ay=-r*.12+b;vK(W,[[0,-r*.44+b],[0,ay-r*.1]],'#9a8ab8',r*.025);vK(W,[[0,ay-r*.1],[0,ay+r*.14]],'#c8bce0',r*.05);vK(W,[[-r*.1,ay+r*.06],['q',0,ay+r*.2,r*.1,ay+r*.06]],'#c8bce0',r*.05);vK(W,[[-r*.06,ay-r*.04],[r*.06,ay-r*.04]],'#c8bce0',r*.04);
  /* แขนบนคู่หน้า */vLimb(W,[-r*.38,-r*.5+b,-r*.66,-r*.42+b,-r*.62,-r*.36+b],SL,r*.14,r*.1);vLimb(W,[r*.38,-r*.5+b,r*.66,-r*.42+b-kn*.5,r*.62,-r*.36+b-kn],SL,r*.14,r*.1);for(const s of[-1,1])wE(W,s*r*.62,-r*.36+b-(s>0?kn:0),r*.06,r*.06,MK);
  /* หัว + หน้ากากซีด */const hy=-r*.82+b;vS(W,[[-r*.24,hy+r*.2],['q',-r*.28,hy-r*.2,0,hy-r*.28],['q',r*.28,hy-r*.2,r*.24,hy+r*.2],['q',0,hy+r*.3,-r*.24,hy+r*.2]],SH);
  vS(W,[[0,hy-r*.18],['q',r*.16,hy-r*.16,r*.16,hy+r*.04],['q',r*.12,hy+r*.2,0,hy+r*.22],['q',-r*.12,hy+r*.2,-r*.16,hy+r*.04],['q',-r*.16,hy-r*.16,0,hy-r*.18]],MK);
  for(const s of[-1,1]){vD(W,[[s*r*.02,hy-r*.02],['q',s*r*.08,hy-r*.08,s*r*.12,hy-r*.02],['q',s*r*.08,hy+r*.02,s*r*.02,hy-r*.02]],'#1a1024');vEye(W,s*r*.07,hy-r*.02,r*.025,r*.025,'#e0b8ff',5)}vK(W,[[-r*.05,hy+r*.12],[r*.05,hy+r*.12]],'#8a7a90',r*.02);
  return true};

/* ================= 34: ที่ราบดาวตก ================= */
MV1D[340]=(r,T,W,bob,sw,la,ra)=>{/* หมาป่าคลั่งดาว: ก้มหัวขู่ ขนดำน้ำเงินลายดาวขาว ผลึกอุกกาบาตฟ้าระเบิดจากหลัง รอยร้าวเรือง ตาคลั่ง น้ำลายเรือง */const b=bob*.6+r*.18,ph=T*7;
  const BD='#1e2440',BL='#323c66',FAR='#141a30',CY='#7ae8ff';
  const tw=Math.sin(T*6)*r*.1;vS(W,[[-r*.56,-r*.2+b],['q',-r*.9,-r*.46+b+tw,-r*1.08,-r*.3+b+tw],['q',-r*.9,-r*.14+b,-r*.56,-r*.04+b]],BD);vS(W,[[-r*.98,-r*.38+b+tw],[-r*1.14,-r*.44+b+tw],[-r*1.06,-r*.3+b+tw]],CY,1,.5);
  const leg=(x,a,c,l)=>{const kx=x+Math.sin(a)*r*.12,ky=r*.42,px=x+Math.sin(a)*r*.2;vLimb(W,[x,r*.0+b,kx,ky,px,r*.84-l],c,r*.28,r*.12);vS(W,[[px-r*.06,r*.8-l],[px+r*.14,r*.82-l],[px+r*.12,r*.88-l],[px-r*.06,r*.88-l]],c,1,.6)};
  leg(r*.34,Math.sin(ph+1),FAR,ra*.6);leg(-r*.38,Math.sin(ph+Math.PI+1),FAR,la*.6);
  vS(W,[[-r*.66,-r*.2+b],['c',-r*.4,-r*.48+b,r*.1,-r*.5+b,r*.36,-r*.36+b],['q',r*.58,-r*.2+b,r*.56,r*.04+b],['q',r*.46,r*.28+b,r*.24,r*.24+b],['q',0,r*.1+b,-r*.3,r*.2+b],['q',-r*.62,r*.22+b,-r*.7,r*.0+b],['q',-r*.76,-r*.1+b,-r*.66,-r*.2+b]],BD);
  if(!W)for(const[x,y,k]of[[-.44,-.16,0],[-.2,-.26,1],[.06,-.2,2],[-.5,.04,3],[.2,-.08,4]]){g.fillStyle='rgba(240,245,255,'+(.5+.5*Math.abs(Math.sin(T*2+k)))+')';wStar(W,x*r,y*r+b,r*.05,r*.02,'rgba(240,245,255,.9)',0,4)}
  vGlow(W,-r*.1,-r*.3+b,r*.5,'120,230,255',.35);vK(W,[[-r*.5,-r*.06+b],[-r*.36,-r*.18+b],[-r*.24,-r*.06+b],[-r*.08,-r*.2+b]],W?'#fff':CY,r*.04);
  for(const[x,h,a]of[[-.34,.42,-.5],[-.16,.56,-.2],[.04,.46,.15],[.18,.3,.4],[-.5,.28,-.8]]){g.save();g.translate(x*r,-r*.38+b);g.rotate(a);vS(W,[[-r*.06,0],[-r*.03,-h*r],[r*.03,-h*r-r*.06],[r*.06,0]],CY,1,.6);vD(W,[[-r*.03,-h*r],[r*.03,-h*r-r*.06],[0,0]],W?'#fff':'#dff8ff');g.restore()}
  leg(r*.4,Math.sin(ph),BL,la);leg(-r*.32,Math.sin(ph+Math.PI),BL,ra);
  /* หัวก้มขู่ */const hx=r*.72,hy=-r*.16+b;vS(W,[[hx-r*.24,hy+r*.12],['q',hx-r*.26,hy-r*.22,hx,hy-r*.22],['q',hx+r*.24,hy-r*.16,hx+r*.48,hy+r*.02],['q',hx+r*.52,hy+r*.1,hx+r*.44,hy+r*.14],['q',hx+r*.2,hy+r*.16,hx+r*.04,hy+r*.28],['q',hx-r*.14,hy+r*.3,hx-r*.24,hy+r*.12]],BD);
  vS(W,[[hx+r*.04,hy+r*.12],['q',hx+r*.26,hy+r*.12,hx+r*.42,hy+r*.14],['q',hx+r*.24,hy+r*.3,hx+r*.06,hy+r*.26]],'#0e1020',1,.6);for(let i=0;i<3;i++)vFang(W,hx+r*(.16+i*.1),hy+r*.12,r*.05,r*.07);
  vS(W,[[hx-r*.12,hy-r*.14],[hx-r*.26,hy-r*.44],[hx+r*.04,hy-r*.2]],BD,1,.7);vK(W,[[hx+r*.02,hy-r*.14],[hx+r*.24,hy-r*.06]],'#0a0c18',r*.05);
  vGlow(W,hx+r*.14,hy-r*.06,r*.26,'120,230,255',.5);vEye(W,hx+r*.14,hy-r*.06,r*.07,r*.05,'#bff6ff',7);vD(W,[[hx+r*.13,hy-r*.1],[hx+r*.16,hy-r*.1],[hx+r*.16,hy-r*.02],[hx+r*.13,hy-r*.02]],'#0a2a3a');
  if(!W){const p=(T*1.1)%1;g.fillStyle='rgba(150,240,255,'+(.8*(1-p))+')';g.beginPath();g.ellipse(hx+r*.3,hy+r*.3+p*r*.3,r*.03,r*.05,0,0,7);g.fill()}
  return true};
MV1D[341]=(r,T,W)=>{/* ภูตเศษดาว: เศษดาวผลึกพุ่งเป็นดาวหาง หางแสงยาว หน้าเล็ก เศษย่อยหมุนตาม */const by=-r*.32+Math.sin(T*3)*r*.1,rot=T*1.5;
  vGlow(W,0,by,r*1.2,'190,230,255',.3);
  /* หางดาวหาง */vD(W,[[-r*.1,by-r*.22],['q',-r*.7,by-r*.4,-r*1.3,by-r*.1+Math.sin(T*4)*r*.06],['q',-r*.7,by+r*.0,-r*.1,by+r*.22]],W?'#fff':'rgba(160,220,255,.5)');vD(W,[[-r*.1,by-r*.12],['q',-r*.5,by-r*.22,-r*.9,by-r*.06],['q',-r*.5,by+r*.04,-r*.1,by+r*.12]],W?'#fff':'rgba(230,248,255,.7)');
  /* เศษย่อย */for(let i=0;i<3;i++){const a=rot*1.4+i*2.09,x=Math.cos(a)*r*.6,y=by+Math.sin(a)*r*.3;vS(W,[[x,y-r*.08],[x+r*.05,y],[x,y+r*.08],[x-r*.05,y]],'#bfe8ff',1,.5)}
  /* ตัวผลึก */g.save();g.translate(0,by);g.rotate(Math.sin(T*2)*.15);vS(W,[[r*.0,-r*.44],[r*.3,-r*.08],[r*.18,r*.34],[-r*.16,r*.32],[-r*.3,-r*.06]],'#9ad8ff');vD(W,[[r*.0,-r*.44],[-r*.3,-r*.06],[-r*.02,-r*.02]],W?'#fff':'#e4f6ff');vD(W,[[r*.0,-r*.44],[r*.3,-r*.08],[-r*.02,-r*.02]],W?'#fff':'#c0e8ff');vD(W,[[-r*.16,r*.32],[r*.18,r*.34],[-r*.02,-r*.02]],W?'#fff':'#6ab0e8');
  vEye(W,-r*.07,r*.02,r*.04,r*.05,'#1a2a50',0);vEye(W,r*.09,r*.02,r*.04,r*.05,'#1a2a50',0);vK(W,[[-r*.03,r*.14],['q',r*.02,r*.18,r*.06,r*.14]],'#1a2a50',r*.025);g.restore();
  wStar(W,r*.22,by-r*.4,r*.08+Math.sin(T*8)*r*.03,r*.03,'#ffffff',T,4);
  return true};
MV1D[342]=(r,T,W,bob,sw,la,ra)=>{/* ยักษ์อุกกาบาต: ร่างหินอุกกาบาตไหม้มีหลุม รอยร้าวหลอมเหลวส้ม-ฟ้า ตาเดียวเรือง แขนหินหนัก ควันร้อนลอย */const b=bob*.5,gl=.6+.4*Math.sin(T*3);
  const RK='#4a3a32',RD='#32261e',RL='#62504a',HT=W?'#fff':'rgba(255,150,60,'+(.6+gl*.4)+')',CY=W?'#fff':'rgba(120,230,255,'+(.6+gl*.4)+')';
  const crater=(x,y,q)=>{wED(W,x,y,q,q*.7,'rgba(20,14,10,.5)');vK(W,[[x-q,y+q*.1],['q',x,y+q*.9,x+q,y+q*.1]],'rgba(150,120,100,.4)',q*.25)};
  wMotes(W,0,-r*.9+b,r*.5,r*.8,T,4,'120,110,110',r*.08);
  /* แขนหลัง */vLimb(W,[-r*.5,-r*.4+b,-r*.76,-r*.04+b,-r*.68,r*.26+b-sw*.4],RD,r*.3,r*.24);wE(W,-r*.68,r*.34+b-sw*.4,r*.2,r*.16,RD);
  /* ขา */for(const[s,l,c]of[[-1,la,RD],[1,ra,RK]]){const x=s*r*.26;vS(W,[[x-r*.18,r*.3+b],[x+r*.18,r*.3+b],['q',x+r*.24,r*.6,x+r*.2,r*.86-l],[x-r*.22,r*.86-l],['q',x-r*.24,r*.6,x-r*.18,r*.3+b]],c);vK(W,[[x-r*.1,r*.5],[x+r*.04,r*.6],[x-r*.02,r*.72]],HT,r*.035)}
  /* ลำตัวอุกกาบาต */vGlow(W,0,-r*.3+b,r*.9,'255,140,60',.16*gl);vS(W,[[-r*.6,r*.3+b],['q',-r*.74,-r*.24+b,-r*.42,-r*.62+b],['q',0,-r*.86+b,r*.44,-r*.64+b],['q',r*.76,-r*.26+b,r*.6,r*.3+b],['q',0,r*.46+b,-r*.6,r*.3+b]],RK);
  crater(-r*.34,-r*.42+b,r*.1);crater(r*.3,r*.06+b,r*.12);crater(-r*.2,r*.16+b,r*.08);crater(r*.4,-r*.4+b,r*.07);
  vK(W,[[-r*.5,-r*.1+b],[-r*.3,-r*.2+b],[-r*.12,-r*.04+b],[r*.06,-r*.18+b],[r*.24,-r*.06+b],[r*.46,-r*.2+b]],HT,r*.05);vK(W,[[-r*.12,-r*.04+b],[-r*.06,r*.2+b]],HT,r*.04);vK(W,[[r*.06,-r*.18+b],[r*.12,-r*.48+b]],CY,r*.04);
  /* ตาเดียว */const hx=r*.12,hy=-r*.52+b;vGlow(W,hx,hy,r*.35,'255,170,80',.5);wE(W,hx,hy,r*.13,r*.11,'#1a0e08');vEye(W,hx,hy,r*.09,r*.08,'#ffb040',8);vD(W,[[hx-r*.015,hy-r*.07],[hx+r*.015,hy-r*.07],[hx+r*.015,hy+r*.07],[hx-r*.015,hy+r*.07]],'#2a0e04');vK(W,[[hx-r*.18,hy-r*.14],[hx+r*.18,hy-r*.12]],RD,r*.06);
  /* แขนหน้า */const fy=r*.3+b+sw*.5;vLimb(W,[r*.46,-r*.4+b,r*.76,-r*.04+b,r*.7,fy-r*.06],RL,r*.3,r*.24);vS(W,[[r*.5,fy],['q',r*.48,fy-r*.22,r*.7,fy-r*.24],['q',r*.94,fy-r*.22,r*.92,fy],['q',r*.92,fy+r*.24,r*.7,fy+r*.24],['q',r*.48,fy+r*.24,r*.5,fy]],RL);vK(W,[[r*.6,fy-r*.06],[r*.72,fy+r*.06],[r*.82,fy-r*.02]],HT,r*.035);
  return true};

/* ================= 35: เหมืองดาวคาร์น (เหลือตัวบิน) ================= */
MV1D[351]=(r,T,W)=>{/* ค้างคาวผลึกถ้ำ: ปีกหนังน้ำตาลเข้ม ปลายนิ้วปีกเป็นผลึกแร่ฟ้า ขนสนิม หูใหญ่ ตาฟ้าเรือง เศษแร่ร่วง */const fl=Math.sin(T*11),by=-r*.25+Math.sin(T*3)*r*.1;
  const WG='#4a3022',WD='#2e1e14',FR='#7a5238',CY='#8ae0ff';
  const wing=s=>{const tip=-r*(.3+fl*.62),mid=-r*(.08+fl*.32);const P=[[s*r*.24,-r*.1+by],['q',s*r*.7,mid-r*.24+by,s*r*1.46,tip+by],['q',s*r*1.32,tip+r*.36+by,s*r*1.42,tip+r*.62+by],['q',s*r*1.12,tip+r*.5+by,s*r*1.06,mid+r*.42+by],['q',s*r*.84,mid+r*.32+by,s*r*.78,mid+r*.56+by],['q',s*r*.5,r*.1+by,s*r*.28,r*.18+by]];
    vS(W,P,WG,1,.9);vK(W,[[s*r*.28,-r*.08+by],['q',s*r*.78,mid+by,s*r*1.42,tip+r*.04+by]],WD,r*.06);vK(W,[[s*r*.6,mid*.6+by],[s*r*1.08,mid+r*.4+by]],WD,r*.045);
    for(const[x,y]of[[s*r*1.46,tip+by],[s*r*1.42,tip+r*.62+by],[s*r*1.06,mid+r*.42+by],[s*r*.78,mid+r*.56+by]])vS(W,[[x-r*.05,y],[x+s*r*.04,y-r*.14],[x+r*.05,y+r*.02]],CY,1,.5)};
  wing(-1);wing(1);
  vS(W,[[0,-r*.48+by],['q',r*.44,-r*.44+by,r*.42,by],['q',r*.4,r*.48+by,0,r*.5+by],['q',-r*.4,r*.48+by,-r*.42,by],['q',-r*.44,-r*.44+by,0,-r*.48+by]],FR);
  for(let i=0;i<6;i++){const a=-1.2+i*.48;vK(W,[[Math.cos(a)*r*.34,Math.sin(a)*r*.38+by+r*.08],[Math.cos(a)*r*.44,Math.sin(a)*r*.46+by+r*.1]],'#4a3020',r*.05)}
  for(const s of[-1,1]){vS(W,[[s*r*.12,-r*.36+by],[s*r*.34,-r*.94+by],[s*r*.4,-r*.3+by]],FR,1,.8);vD(W,[[s*r*.2,-r*.38+by],[s*r*.32,-r*.78+by],[s*r*.34,-r*.36+by]],'#b07a6a')}
  vS(W,[[-r*.04,-r*.44+by],[r*.02,-r*.66+by],[r*.08,-r*.42+by]],CY,1,.5);
  vEye(W,-r*.15,-r*.14+by,r*.08,r*.07,CY,7);vEye(W,r*.15,-r*.14+by,r*.08,r*.07,CY,7);vD(W,[[-r*.06,-r*.0+by],[r*.06,-r*.0+by],[0,r*.08+by]],'#2a1a10');vFang(W,-r*.05,r*.06+by,r*.05,r*.09);vFang(W,r*.05,r*.06+by,r*.05,r*.09);
  if(!W){const p=(T*1.2)%1;vS(W,[[r*.1,r*.4+by+p*r*1.0],[r*.14,r*.34+by+p*r*1.0],[r*.18,r*.42+by+p*r*1.0]],'rgba(140,220,255,'+(1-p)+')',0)}
  return true};

/* ================= 36: ยอดเขาดาวน้ำแข็ง ================= */
MV1D[360]=(r,T,W,bob,sw,la,ra)=>{/* จิ้งจอกหิมะดาว: ขนเงินอมฟ้าฟู หูใหญ่ อกขนขาวฟู หางพวงใหญ่ปลายเป็นดาวเรือง เกล็ดหิมะ */const b=bob*.6+r*.12,ph=T*7;
  const FR='#c8d8ec',FD='#94a8c8',FW='#f4f8ff',FAR='#7a8eb0';
  /* หางพวง */const tw=Math.sin(T*3)*r*.1;vS(W,[[-r*.5,-r*.14+b],['c',-r*.9,-r*.2+b+tw,-r*1.1,-r*.6+b+tw,-r*.86,-r*.86+b+tw],['q',-r*.7,-r*.62+b+tw,-r*.54,-r*.62+b],['q',-r*.4,-r*.4+b,-r*.36,-r*.12+b]],FR);
  vS(W,[[-r*.86,-r*.86+b+tw],['q',-r*.66,-r*.76+b+tw,-r*.64,-r*.64+b+tw],['q',-r*.8,-r*.64+b+tw,-r*.92,-r*.72+b+tw]],FW,1,.6);vGlow(W,-r*.86,-r*.9+b+tw,r*.4,'190,230,255',.5);wStar(W,-r*.86,-r*.92+b+tw,r*.14,r*.06,'#e8f8ff',T);
  const leg=(x,a,c,l)=>{const kx=x+Math.sin(a)*r*.1,ky=r*.46,px=x+Math.sin(a)*r*.18;vLimb(W,[x,r*.04+b,kx,ky,px,r*.84-l],c,r*.2,r*.09);wE(W,px+r*.03,r*.85-l,r*.08,r*.05,c)};
  leg(r*.28,Math.sin(ph+1),FAR,ra*.6);leg(-r*.34,Math.sin(ph+Math.PI+1),FAR,la*.6);
  vS(W,[[-r*.56,-r*.14+b],['c',-r*.34,-r*.42+b,r*.1,-r*.4+b,r*.34,-r*.3+b],['q',r*.5,-r*.14+b,r*.46,r*.06+b],['q',r*.36,r*.24+b,r*.14,r*.2+b],['q',-r*.1,r*.1+b,-r*.36,r*.18+b],['q',-r*.6,r*.18+b,-r*.62,r*.0+b],['q',-r*.64,-r*.08+b,-r*.56,-r*.14+b]],FR);
  for(let i=0;i<4;i++)vK(W,[[-r*.44+i*r*.2,-r*.26+b],['q',-r*.4+i*r*.2,-r*.16+b,-r*.44+i*r*.2,-r*.08+b]],'rgba(120,140,180,.45)',r*.03);
  leg(r*.34,Math.sin(ph),FR,la);leg(-r*.28,Math.sin(ph+Math.PI),FR,ra);
  /* อกขนฟู */vS(W,[[r*.2,-r*.3+b],['q',r*.46,-r*.2+b,r*.44,r*.08+b],[r*.36,r*.02+b],[r*.32,r*.14+b],[r*.24,r*.04+b],['q',r*.14,-r*.1+b,r*.2,-r*.3+b]],FW,1,.6);
  /* หัว */const hx=r*.56,hy=-r*.4+b;vS(W,[[hx-r*.22,hy+r*.1],['q',hx-r*.24,hy-r*.18,hx,hy-r*.18],['q',hx+r*.2,hy-r*.14,hx+r*.44,hy+r*.04],['q',hx+r*.46,hy+r*.1,hx+r*.4,hy+r*.12],['q',hx+r*.18,hy+r*.2,hx,hy+r*.22],['q',hx-r*.16,hy+r*.22,hx-r*.22,hy+r*.1]],FR);
  vD(W,[[hx+r*.04,hy+r*.08],['q',hx+r*.24,hy+r*.06,hx+r*.42,hy+r*.1],['q',hx+r*.2,hy+r*.22,hx+r*.04,hy+r*.2]],FW);
  for(const[dx,c]of[[-.16,FD],[.04,FR]]){vS(W,[[hx+dx*r-r*.06,hy-r*.12],[hx+dx*r+r*.0,hy-r*.52],[hx+dx*r+r*.12,hy-r*.14]],c,1,.7);vD(W,[[hx+dx*r-r*.02,hy-r*.14],[hx+dx*r+r*.01,hy-r*.4],[hx+dx*r+r*.08,hy-r*.15]],'#e8b8c8')}
  vD(W,[[hx+r*.42,hy+r*.02],['q',hx+r*.5,hy+r*.06,hx+r*.44,hy+r*.1]],'#2a3044');vEye(W,hx+r*.12,hy-r*.04,r*.05,r*.045,'#4ab8ff',5);
  wMotes(W,0,-r*.8+b,r*.8,-r*.6,T,4,'235,245,255',r*.035);return true};
MV1D[361]=(r,T,W)=>{/* นกฮูกดาวน้ำแข็ง: ขนขาวอมฟ้าปลายน้ำแข็ง ลายดาวบนอก ตากลมโตเรืองฟ้า เขาขนหู ปีกกระพือ เกล็ดน้ำแข็งร่วง */const by=-r*.3+Math.sin(T*2.4)*r*.08,fp=Math.sin(T*8);
  const FW='#e8f0fa',FB='#a8c4e4',FD='#6a8ab8',IC='#bfe8ff';
  for(const s of[-1,1]){g.save();g.translate(s*r*.3,by-r*.06);g.rotate(s*(-.3+fp*.5));vS(W,[[0,0],['q',s*r*.5,-r*.3,s*r*.96,-r*.1],[s*r*.86,r*.0],[s*r*.92,r*.1],[s*r*.76,r*.14],[s*r*.8,r*.24],[s*r*.6,r*.24],['q',s*r*.3,r*.3,0,r*.2]],FB,1,.8);
    for(let i=0;i<3;i++)vK(W,[[s*r*(.3+i*.18),-r*.06],[s*r*(.36+i*.18),r*.16]],'rgba(70,100,150,.45)',r*.025);vS(W,[[s*r*.86,r*.0],[s*r*1.0,-r*.04],[s*r*.92,r*.08]],IC,1,.4);g.restore()}
  vS(W,[[0,by-r*.56],['q',r*.46,by-r*.52,r*.42,by],['q',r*.38,by+r*.46,0,by+r*.48],['q',-r*.38,by+r*.46,-r*.42,by],['q',-r*.46,by-r*.52,0,by-r*.56]],FW);
  for(let j=0;j<2;j++)for(let i=0;i<3-j;i++){const x=-r*.14+i*r*.14+j*r*.07,y=by+r*.12+j*r*.14;vK(W,[[x-r*.05,y],['q',x,y+r*.06,x+r*.05,y]],FD,r*.025)}wStar(W,0,by+r*.06,r*.07,r*.03,'#9ad8ff',0,4);
  /* หน้า */for(const s of[-1,1]){wE(W,s*r*.16,by-r*.24,r*.15,r*.14,'#f8fcff');vGlow(W,s*r*.16,by-r*.24,r*.2,'130,210,255',.4);vEye(W,s*r*.16,by-r*.24,r*.09,r*.09,'#5ac8ff',6);vEye(W,s*r*.16,by-r*.24,r*.045,r*.045,'#0a2040',0);
    vS(W,[[s*r*.18,by-r*.46],[s*r*.34,by-r*.76],[s*r*.36,by-r*.44]],FB,1,.6)}
  vS(W,[[-r*.05,by-r*.14],[r*.05,by-r*.14],[0,by-r*.02]],'#e8b040',1,.5);
  for(const s of[-1,1])vS(W,[[s*r*.14,by+r*.44],[s*r*.1,by+r*.58],[s*r*.18,by+r*.52],[s*r*.22,by+r*.6],[s*r*.24,by+r*.44]],'#c8a050',1,.4);
  wMotes(W,0,by+r*.5,r*.6,-r*.8,T,3,'210,240,255',r*.035);return true};
MV1D[362]=(r,T,W,bob,sw,la,ra)=>{/* อัศวินกระจก: เกราะแผ่นกระจกขัดเงาสะท้อนแสงวิ่ง โล่กลมกระจก ทวนเงิน ผ้าคลุมฟ้าน้ำแข็ง ขอบเงินเพชร */const b=bob*.5,wv=Math.sin(T*2.4),sh=((T*.6)%2-.5);
  const MR='#b8d4ec',MD='#7a9ac0',ED='#e8f0fa',CP='#4a7ab8';
  const mirror=(L)=>{const bb=vS(W,L,MR);if(W||LOWQ)return;g.save();vP(L);g.clip();const w=bb[2]-bb[0],h=bb[3]-bb[1],x=bb[0]+sh*w*1.4;g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.moveTo(x,bb[1]);g.lineTo(x+w*.18,bb[1]);g.lineTo(x-w*.12,bb[3]);g.lineTo(x-w*.3,bb[3]);g.closePath();g.fill();g.restore()};
  /* ทวน */const sx=r*.5,sy=-r*.06+b+sw*.4;vK(W,[[sx-r*.06,sy+r*.92],[sx+r*.08,sy-r*1.08]],'#8a90a0',r*.06);vS(W,[[sx+r*.05,sy-r*1.04],[sx+r*.14,sy-r*1.38],[sx+r*.18,sy-r*1.02]],ED,1,.6);
  /* ผ้าคลุม */vS(W,[[-r*.3,-r*.5+b],['q',-r*.62,-r*.1+b,-r*.64+wv*r*.04,r*.66],[-r*.48,r*.58],[-r*.36,r*.7],[-r*.22,r*.56],['q',-r*.1,0,-r*.04,-r*.5+b]],CP);
  /* ขา */for(const[s,l]of[[-1,la],[1,ra]]){const x=s*r*.16;mirror([[x-r*.11,r*.2+b],[x+r*.11,r*.2+b],[x+r*.1,r*.8-l],[x-r*.1,r*.8-l]]);vS(W,[[x-r*.12,r*.78-l],[x+r*.17,r*.8-l],[x+r*.16,r*.9-l],[x-r*.12,r*.9-l]],MD,1,.7)}
  /* ลำตัวกระจก */mirror([[-r*.3,-r*.5+b],['q',0,-r*.6+b,r*.3,-r*.5+b],['q',r*.34,-r*.1+b,r*.26,r*.14+b],[r*.28,r*.34+b],[-r*.28,r*.34+b],[-r*.26,r*.14+b],['q',-r*.34,-r*.1+b,-r*.3,-r*.5+b]]);
  for(const[x0,y0,x1,y1]of[[0,-.56,0,.32],[-.28,-.12,.28,-.12],[-.26,.14,.26,.14]])vK(W,[[x0*r,y0*r+b],[x1*r,y1*r+b]],ED,r*.03);wStar(W,0,-r*.3+b,r*.08,r*.03,'#ffffff',0,4);
  /* บ่า */for(const s of[-1,1])mirror([[s*r*.1,-r*.56+b],['q',s*r*.46,-r*.66+b,s*r*.48,-r*.36+b],['q',s*r*.3,-r*.3+b,s*r*.1,-r*.42+b]]);
  /* หมวก */const hy=-r*.76+b;mirror([[-r*.2,hy+r*.2],[-r*.22,hy-r*.12],['q',0,hy-r*.32,r*.22,hy-r*.12],[r*.22,hy+r*.2],['q',0,hy+r*.28,-r*.2,hy+r*.2]]);vS(W,[[-r*.04,hy-r*.26],[0,hy-r*.46],[r*.04,hy-r*.26]],ED,1,.5);
  vD(W,[[-r*.15,hy+r*.0],[r*.18,hy+r*.0],[r*.18,hy+r*.07],[-r*.15,hy+r*.07]],'#0e1a2e');vGlow(W,r*.02,hy+r*.035,r*.26,'150,220,255',.45);vK(W,[[-r*.1,hy+r*.035],[r*.14,hy+r*.035]],W?'#fff':'#bff0ff',r*.035);
  /* โล่กลมกระจก (แขนหลังถือหน้าอก) */const ox=-r*.4,oy=-r*.06+b;vS(W,[[ox-r*.32,oy],['q',ox-r*.32,oy-r*.32,ox,oy-r*.32],['q',ox+r*.32,oy-r*.32,ox+r*.32,oy],['q',ox+r*.32,oy+r*.32,ox,oy+r*.32],['q',ox-r*.32,oy+r*.32,ox-r*.32,oy]],'#c8ccd8');
  mirror([[ox-r*.26,oy],['q',ox-r*.26,oy-r*.26,ox,oy-r*.26],['q',ox+r*.26,oy-r*.26,ox+r*.26,oy],['q',ox+r*.26,oy+r*.26,ox,oy+r*.26],['q',ox-r*.26,oy+r*.26,ox-r*.26,oy]]);wStar(W,ox,oy,r*.1,r*.04,'#ffffff',T*.5,4);
  /* แขนหน้าจับทวน */vLimb(W,[r*.24,-r*.4+b,r*.38,-r*.16+b,sx,sy],MR,r*.13,r*.1);wE(W,sx,sy,r*.07,r*.07,MD);
  return true};

/* ================= 37: ธีมความหิว (เตาหลอมหัวใจ) ================= */
MV1D[370]=(r,T,W,bob,sw,la,ra)=>{/* เงาหิว: ก้อนเงาคลานต่ำ ปากใหญ่ฟันขาวเรืองชมพูข้างใน ตาเหลืองหลายดวง มงกุฎดาวเล็ก ขาตอสั้น */const b=bob*.5,mo=(.5+.5*Math.sin(T*3.4))*r*.1,ph=T*8;
  const SH='#22123a',SL='#2e1a4a',SD='#160a26';
  for(const[lx,k]of[[-r*.5,0],[-r*.22,2],[r*.12,1],[r*.42,3]]){const a=Math.sin(ph+k)*r*.1;vLimb(W,[lx,r*.2+b,lx+a,r*.56,lx+a*1.4+r*.06,r*.86],k%2?SD:SH,r*.14,r*.08)}
  const P=[];for(let i=0;i<=14;i++){const a=Math.PI+i/14*Math.PI,R=r*(.66+(i%2)*.12)+Math.sin(T*5+i)*r*.03;P.push([Math.cos(a)*R*1.1,r*.06+b+Math.sin(a)*R*.86])}P.push(['q',r*.4,r*.4+b,-r*.72,r*.06+b]);vS(W,P,SL);
  vD(W,[[-r*.5,r*.0+b],['q',-r*.2,-r*.4+b,r*.24,-r*.36+b],['q',-r*.1,-r*.2+b,-r*.5,r*.0+b]],'rgba(120,80,170,.3)');
  /* ปาก */const mx=r*.36,my=r*.02+b;vGlow(W,mx,my,r*.4,'255,110,190',.45);vS(W,[[mx-r*.28,my-r*.06-mo*.5],['q',mx,my-r*.22-mo,mx+r*.34,my-r*.08-mo*.6],[mx+r*.34,my+r*.1+mo*.6],['q',mx,my+r*.24+mo,mx-r*.28,my+r*.08+mo*.5]],'#0a0412',1,.7);
  vD(W,[[mx-r*.16,my+r*.0],['q',mx+r*.06,my-r*.08,mx+r*.24,my+r*.0],['q',mx+r*.06,my+r*.08,mx-r*.16,my+r*.0]],W?'#fff':'rgba(255,110,190,.6)');
  for(let i=0;i<5;i++){const x=mx-r*.22+i*r*.12;vFang(W,x,my-r*.1-mo*.7+Math.abs(i-2)*r*.02,r*.07,r*.11,'#efe6ff');const y=my+r*.14+mo*.7-Math.abs(i-2)*r*.02;vD(W,[[x-r*.035,y],[x,y-r*.1],[x+r*.035,y]],'#efe6ff')}
  for(const[x,y,q]of[[.04,-.36,.07],[.24,-.4,.06],[-.16,-.3,.05],[-.34,-.2,.04],[.12,-.22,.04]])vEye(W,x*r,y*r+b,q*r,q*r*.75,'#ffd060',5);
  for(let i=0;i<3;i++)wStar(W,-r*.34+i*r*.22,-r*.56+b-Math.abs(i-1)*r*.0,r*.08,r*.032,'#a88ae8',T+i,4);
  return true};
MV1D[371]=(r,T,W)=>{/* ปากดาวลอย: ปากกลมฟันวงแหวนหมุน ปีกเยื่อม่วง ตาเดียวด้านบน หนวดห้อย แสงชมพูในคอ */const by=-r*.34+Math.sin(T*3)*r*.12,fl=Math.sin(T*9)*.4;
  vGlow(W,0,by,r*1.2,'255,120,200',.16);
  for(const s of[-1,1]){g.save();g.translate(s*r*.38,by);g.rotate(s*(.2+fl));vS(W,[[0,0],['q',s*r*.5,-r*.52,s*r*.98,-r*.22],['q',s*r*.62,-r*.06,s*r*.82,r*.16],['q',s*r*.4,r*.1,0,r*.12]],'#341c56',1,.7);vK(W,[[0,0],['q',s*r*.5,-r*.4,s*r*.9,-r*.2]],'#5a3a86',r*.04);g.restore()}
  for(const s of[-1,1])vLimb(W,[s*r*.14,by+r*.42,s*r*.2+Math.sin(T*4+s)*r*.06,by+r*.66,s*r*.16,by+r*.86],'#1a0e2a',r*.08,r*.03);
  wE(W,0,by,r*.5,r*.5,'#22123a');vD(W,[[-r*.42,by-r*.1],['q',-r*.3,by-r*.44,r*.06,by-r*.46],['q',-r*.2,by-r*.36,-r*.42,by-r*.1]],'rgba(140,100,200,.35)');
  wED(W,0,by+r*.05,r*.32,r*.32,'#05020a');vGlow(W,0,by+r*.05,r*.28,'255,110,190',.5);
  for(let i=0;i<10;i++){const a=i/10*6.283+T,ox=Math.cos(a)*r*.32,oy=by+r*.05+Math.sin(a)*r*.32,ix=Math.cos(a)*r*.17,iy=by+r*.05+Math.sin(a)*r*.17,pa=a+1.57;vD(W,[[ox+Math.cos(pa)*r*.05,oy+Math.sin(pa)*r*.05],[ix,iy],[ox-Math.cos(pa)*r*.05,oy-Math.sin(pa)*r*.05]],'#efe6ff')}
  vEye(W,0,by-r*.38,r*.1,r*.07,'#ffe080',6);vD(W,[[-r*.015,by-r*.44],[r*.015,by-r*.44],[r*.015,by-r*.32],[-r*.015,by-r*.32]],'#3a1a00');
  return true};
MV1D[372]=(r,T,W,bob,sw,la,ra)=>{/* ยักษ์กลืนแสง: ร่างสูงมืด อกเป็นหลุมดำดูดแสงเป็นเกลียว หัวเล็กหนามสามแฉก แขนยาว รอยร้าวทองเรือง */const b=bob*.4;
  const SH='#22123a',SD='#160a28',SL='#2e1a4a',GD=W?'#fff':'rgba(255,210,140,.85)';
  /* ขา */for(const[s,l,c]of[[-1,la,SD],[1,ra,SH]]){const x=s*r*.24;vLimb(W,[x,r*.18+b,x+s*r*.04,r*.52,x,r*.86-l],c,r*.24,r*.16);vS(W,[[x-r*.14,r*.82-l],[x+r*.2,r*.84-l],[x+r*.16,r*.9-l],[x-r*.14,r*.9-l]],c,1,.6)}
  /* แขนหลัง */vLimb(W,[-r*.5,-r*.58+b,-r*.82,-r*.18+b-sw*.3,-r*.74,r*.3+b],SD,r*.2,r*.12);for(const d of[-1,0,1])vK(W,[[-r*.74,r*.3+b],['q',-r*.76+d*r*.05,r*.42+b,-r*.74+d*r*.1,r*.48+b]],SD,r*.05);
  /* ลำตัว */vS(W,[[-r*.56,-r*.5+b],['q',-r*.66,-r*.9+b,-r*.24,-r*1.0+b],[r*.24,-r*1.0+b],['q',r*.66,-r*.9+b,r*.56,-r*.5+b],['q',r*.5,r*.1+b,r*.28,r*.24+b],[-r*.28,r*.24+b],['q',-r*.5,r*.1+b,-r*.56,-r*.5+b]],SH);
  vK(W,[[-r*.46,-r*.86+b],[-r*.32,-r*.68+b],[-r*.44,-r*.46+b]],GD,r*.035);vK(W,[[r*.42,-r*.9+b],[r*.3,-r*.72+b],[r*.4,-r*.56+b]],GD,r*.035);
  /* หลุมดำที่อก + แสงถูกดูด */const cx=0,cy=-r*.42+b;vGlow(W,cx,cy,r*.6,'255,110,190',.35);wED(W,cx,cy,r*.28,r*.3,'#000000');
  if(!W&&!LOWQ){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<9;i++){const u=(T*.7+i/9)%1,a=i*2.1+T*2.4+u*3,rr=r*.62*(1-u);g.fillStyle='rgba(255,220,250,'+(.9*u)+')';g.beginPath();g.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.9,r*.035*(1-u*.5),0,7);g.fill()}g.restore()}
  g.beginPath();g.ellipse(cx,cy,r*.3,r*.32,0,0,7);g.strokeStyle=W?'#fff':'rgba(255,140,210,.7)';g.lineWidth=r*.04;g.stroke();
  /* หัวเล็ก + หนาม */const hy=-r*1.14+b;wE(W,0,hy,r*.2,r*.17,SL);vEye(W,-r*.07,hy,r*.045,r*.03,'#ffd060',6);vEye(W,r*.07,hy,r*.045,r*.03,'#ffd060',6);for(let i=0;i<3;i++)vS(W,[[-r*.14+i*r*.14,hy-r*.12],[-r*.1+i*r*.14,hy-r*.36-(i===1?r*.08:0)],[-r*.06+i*r*.14,hy-r*.12]],'#4a3a64',1,.5);
  /* แขนหน้า */vLimb(W,[r*.5,-r*.58+b,r*.82,-r*.18+b+sw*.3,r*.74,r*.3+b],SL,r*.2,r*.12);for(const d of[-1,0,1])vK(W,[[r*.74,r*.3+b],['q',r*.76+d*r*.05,r*.42+b,r*.74+d*r*.1,r*.48+b]],SL,r*.05);
  return true};

/* ================= 38: ผาท่าเรือเมฆ (เหลือ 2 ตัว) ================= */
MV1D[380]=(r,T,W,bob)=>{/* ฉลามเมฆ: ว่ายครึ่งตัวโผล่จากก้อนเมฆ ครีบหลังสูง ปากฟันซี่ ตาดำ เหงือก ลายท้องขาว */const b=Math.sin(T*2.4)*r*.06,tw=Math.sin(T*4)*.2;
  const SK='#7a8eaa',SD='#5a6e8c',BL='#e8eef4';
  wCloud(W,-r*.1,r*.62,r*.86,r*.3,T,'#f4f8ff','#b8c8dc');
  /* หาง */g.save();g.translate(-r*.62,r*.12+b);g.rotate(tw);vS(W,[[0,-r*.04],['q',-r*.24,-r*.18,-r*.36,-r*.44],['q',-r*.3,-r*.1,-r*.24,r*.0],['q',-r*.32,r*.12,-r*.3,r*.26],['q',-r*.14,r*.08,0,r*.08]],SD);g.restore();
  /* ตัว */vS(W,[[-r*.66,r*.1+b],['q',-r*.4,-r*.3+b,r*.2,-r*.3+b],['q',r*.66,-r*.26+b,r*.84,r*.0+b],['q',r*.7,r*.2+b,r*.3,r*.28+b],['q',-r*.3,r*.32+b,-r*.66,r*.1+b]],SK);
  vD(W,[[-r*.3,r*.24+b],['q',r*.2,r*.1+b,r*.76,r*.06+b],['q',r*.5,r*.24+b,r*.1,r*.3+b],['q',-r*.16,r*.32+b,-r*.3,r*.24+b]],BL);
  /* ครีบหลัง + ครีบอก */vS(W,[[-r*.06,-r*.26+b],['q',r*.02,-r*.6+b,-r*.2,-r*.78+b],['q',r*.16,-r*.5+b,r*.24,-r*.3+b]],SD);vS(W,[[r*.14,r*.18+b],['q',r*.06,r*.44+b,-r*.16,r*.5+b],['q',r*.06,r*.3+b,r*.0,r*.2+b]],SD,1,.6);
  for(let i=0;i<3;i++)vK(W,[[r*.34+i*r*.06,-r*.12+b],['q',r*.3+i*r*.06,r*.0+b,r*.34+i*r*.06,r*.1+b]],'rgba(40,50,70,.5)',r*.025);
  /* ปาก */const mo=(.5+.5*Math.sin(T*2))*r*.06;vS(W,[[r*.5,r*.06+b],['q',r*.68,r*.02+b-mo,r*.82,r*.04+b-mo*.5],[r*.8,r*.1+b+mo*.5],['q',r*.66,r*.2+b+mo,r*.5,r*.12+b]],'#2a1018',1,.6);for(let i=0;i<4;i++){vFang(W,r*(.56+i*.06),r*.05+b-mo*.6,r*.04,r*.06,'#f4f4f0');const x=r*(.58+i*.06),y=r*.15+b+mo*.6;vD(W,[[x-r*.02,y],[x,y-r*.06],[x+r*.02,y]],'#f4f4f0')}
  vEye(W,r*.56,-r*.08+b,r*.045,r*.045,'#0a0a10',0);
  /* เมฆหน้า */wCloud(W,r*.0,r*.7,r*.7,r*.22,T+1,'#ffffff','#c8d4e4');
  return true};
MV1D[381]=(r,T,W)=>{/* นางนวลพายุ: ปีกยาวเทาปลายดำ ตัวขาว จะงอยเหลืองจุดแดง ร่อนฝ่าลม เส้นลม หยดฝน */const by=-r*.32+Math.sin(T*2.6)*r*.1,fp=Math.sin(T*6);
  const WH='#f4f6f8',GR='#9aa6b4',BK='#2a2e36';
  if(!W)for(let i=0;i<4;i++){const p=(T*1.6+i*.25)%1;g.strokeStyle='rgba(200,220,240,'+(.6*(1-p))+')';g.lineWidth=r*.035;g.beginPath();g.moveTo(-r*(.4+p*1.0),by+r*(-.5+i*.3));g.lineTo(-r*(.8+p*1.0),by+r*(-.5+i*.3)+r*.04);g.stroke();g.fillStyle='rgba(170,200,230,'+(.7*(1-p))+')';g.beginPath();g.ellipse(r*(.6-i*.3),by-r*.6+p*r*1.4,r*.02,r*.05,.3,0,7);g.fill()}
  const wing=(far)=>{const k=far?.8:1,tipY=by-r*(.2+fp*.6)*k,tx=-r*(far?.7:.96),c=far?'#7a8696':GR;const P=[[r*.14,by-r*.06],['q',-r*.1,tipY-r*.18,tx,tipY],['q',tx+r*.2,tipY+r*.14,-r*.24,by+r*.1]];vS(W,P,c,1,.8);
    vS(W,[[tx,tipY],[tx+r*.26,tipY-r*.06],[tx+r*.22,tipY+r*.1]],BK,1,.5);if(!far)vK(W,[[r*.1,by-r*.04],['q',-r*.1,tipY-r*.1,tx+r*.2,tipY+r*.02]],'#c8d0da',r*.04)};
  wing(true);
  vS(W,[[-r*.42,by+r*.04],['q',-r*.64,by-r*.02,-r*.7,by+r*.1],['q',-r*.6,by+r*.14,-r*.42,by+r*.14]],WH,1,.6);vK(W,[[-r*.68,by+r*.08],[-r*.56,by+r*.1]],BK,r*.04);
  vS(W,[[-r*.46,by+r*.08],['q',-r*.1,by-r*.26,r*.3,by-r*.24],['q',r*.54,by-r*.18,r*.52,by+r*.02],['q',r*.3,by+r*.26,-r*.46,by+r*.08]],WH);
  vS(W,[[r*.48,by-r*.1],[r*.78,by-r*.04],[r*.74,by+r*.02],[r*.48,by-r*.0]],'#f0c030',1,.6);wED(W,r*.68,by+r*.0,r*.025,r*.02,'#d83a2a');vEye(W,r*.36,by-r*.12,r*.04,r*.04,'#1a1a20',0);vK(W,[[r*.28,by-r*.18],[r*.42,by-r*.16]],'#8a96a6',r*.025);
  wing(false);return true};
