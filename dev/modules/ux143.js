
/* ===== v546 บอสภาค 8–9 วาดใหม่ 5 ตัว — วาฬกลืนฟ้า · ผู้เฝ้าไข่มุก · ผู้รักษาเวลา · ภาพสะท้อนโอเรียน · ผู้ทอ
   ห่อ BV1 เดิม: error → แบบเดิม (BV9.err) · ปิด BV9.on=0 · คงสถานะในดัน (วาฬดำน้ำ WSK.dv · ร่างผู้ทอ WVRFX.ph) ===== */
const BV9={on:1,err:'',n:0,old:{}};
const BV9D={
/* วาฬกลืนฟ้า: หัวมหึมาโผล่จากทะเลเมฆ ผิวม่วงคราม ท้องร่องคางสีอ่อน ลายกลุ่มดาวกะพริบบนหลัง เพรียงเกาะ รอยแผลเก่า
   ตาข้างเศร้าเปลือกหนา ปากกว้างมีซี่กรองห้อย ในคอเป็นกาแล็กซีหมุน รูหายใจพ่นไอ ครีบอกโผล่จากเมฆ ทะเลเมฆหลายชั้น */
'วาฬกลืนฟ้า':(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.2)+.15*Math.sin(T*5),SK='#4a4878',SD='#2a2850',BL='#c8c8ec',op=12+cf*18+Math.sin(T*1.4)*4;
  bvShadow(140,28,.3);
  /* ทะเลเมฆชั้นหลัง */try{wCloud(W,-120,10+b,120,34,T*.8,'#d8deec','#9aa6c0');wCloud(W,130,6+b,110,30,T*.9+1,'#d8deec','#9aa6c0')}catch(e){}
  /* ครีบอกสองข้าง (กระพือช้า) */for(const s of[-1,1]){const fl=Math.sin(T*1.3+(s>0?1:0))*.18;g.save();g.translate(s*118,-6+b);g.rotate(s*(.5+fl));vS(W,[[0,-14],['q',s*40,-30,s*92,-6],['q',s*96,4,s*84,10],['q',s*40,20,0,16]],SD,1,2);
    if(!W){g.strokeStyle='rgba(200,200,240,.35)';g.lineWidth=2;for(let k=1;k<4;k++){g.beginPath();g.moveTo(s*10*k,-8+k);g.quadraticCurveTo(s*(30+k*14),-14+k*2,s*(60+k*8),-2+k*3);g.stroke()}}
    for(let k=0;k<3;k++)bvE(W,s*(56+k*12),-6+k*2,3.4,2.6,'#d8ccb0',.7);g.restore()}
  /* หัว */vS(W,[[-130,30+b],['q',-150,-92+b,-70,-158+b],['q',0,-186+b,70,-158+b],['q',150,-92+b,130,30+b],['q',64,52+b,0,48+b],['q',-64,52+b,-130,30+b]],SK,1,2.6);
  /* ท้อง/คาง สีอ่อนมีร่อง */vS(W,[[-108,-2+b],['q',0,24+op+b,108,-2+b],['q',96,40+b,0,46+b],['q',-96,40+b,-108,-2+b]],'#8a86b8',1,1.6);
  if(!W)for(let k=-4;k<=4;k++){g.strokeStyle='rgba(40,36,80,.45)';g.lineWidth=2.2;g.beginPath();g.moveTo(k*22,8+op*.8+b+Math.abs(k)*-2);g.quadraticCurveTo(k*23,30+b,k*20,44+b-Math.abs(k)*1.4);g.stroke()}
  /* แสงริมบน + ไฮไลต์ */vD(W,[[-110,-20+b],['q',-118,-104+b,-46,-146+b],['q',-6,-160+b,22,-150+b],['q',-56,-120+b,-110,-20+b]],'rgba(210,210,255,.16)');
  /* ปากกว้าง + ซี่กรอง */{const PM=[[-96,-14+b],['q',0,8+op+b,96,-14+b],['q',0,30+op*1.7+b,-96,-14+b]];vS(W,PM,'#140c26',1,2.2);
    if(!W){g.save();vP(PM);g.clip();
      /* กาแล็กซีหมุนในลำคอ */g.translate(0,10+op*.7+b);g.rotate(T*.35);g.scale(1,.42);g.globalCompositeOperation='lighter';glowAt(0,0,70,'190,160,255',.45*pu);glowAt(0,0,22,'255,240,210',.7);
      for(let arm=0;arm<2;arm++)for(let k=0;k<26;k++){const q=k/26,a=arm*Math.PI+q*5.5,rr=6+q*80;g.fillStyle='rgba(235,225,255,'+(.8*(1-q))+')';g.beginPath();g.arc(Math.cos(a)*rr,Math.sin(a)*rr,1.4+(k%3)*.6,0,7);g.fill()}g.restore();
      g.strokeStyle='rgba(220,210,190,.45)';g.lineWidth=1.3;for(let k=-12;k<=12;k+=2){const x=k*7,u=1-(k*k)/150,y0=-14+b+u*(6+op*.5),L=6+u*(4+op*.25);g.beginPath();g.moveTo(x,y0);g.lineTo(x+Math.sin(T+k)*.6,y0+L);g.stroke()}
      g.strokeStyle='rgba(120,100,80,.5)';g.lineWidth=1;g.beginPath();g.moveTo(-90,-12+b);g.quadraticCurveTo(0,6+op*.6+b,90,-12+b);g.stroke()}
    vK(W,[[-98,-14+b],['q',0,6+op+b,98,-14+b]],W?'#fff':'#1a1430',3)}
  /* ตา: เปลือกหนา เศร้า ใส */for(const s of[-1,1]){const ex=s*92,ey=-58+b;vS(W,[[ex-s*30,ey+4],['q',ex,ey-30,ex+s*26,ey-2],['q',ex,ey+8,ex-s*30,ey+4]],'#3a3866',1,1.6);
    bvE(W,ex,ey,17,13,'#eef0ff',1.4);vEye(W,ex-s*2,ey+1,9,10,'#141436',0);if(!W){g.fillStyle='rgba(120,160,255,.5)';g.beginPath();g.arc(ex-s*2,ey+3,5,0,7);g.fill();g.fillStyle='rgba(255,255,255,.95)';g.beginPath();g.arc(ex-s*2-4,ey-3,3.2,0,7);g.arc(ex-s*2+3,ey+5,1.4,0,7);g.fill()}
    vS(W,[[ex-s*20,ey-6],['q',ex,ey-20,ex+s*20,ey-6],['q',ex,ey-11,ex-s*20,ey-6]],SK,1,1.2);
    if(!W){g.strokeStyle='rgba(30,28,60,.6)';g.lineWidth=1.6;for(let k=0;k<3;k++){g.beginPath();g.moveTo(ex+s*(18+k*4),ey+6+k*5);g.quadraticCurveTo(ex+s*(26+k*4),ey+10+k*5,ex+s*(30+k*3),ey+18+k*4);g.stroke()}
      /* น้ำตาดาว */const p=(T*.3+(s>0?.5:0))%1;g.fillStyle='rgba(200,230,255,'+(.8*(1-p))+')';g.beginPath();g.ellipse(ex-s*6,ey+14+p*30,2,3.4,0,0,7);g.fill()}}
  /* ลายกลุ่มดาว + เส้นเชื่อม */if(!W){const C=[[-60,-118],[-30,-136],[4,-146],[34,-132],[62,-112],[-14,-110],[22,-104]];g.strokeStyle='rgba(220,226,255,.35)';g.lineWidth=1.2;g.beginPath();C.slice(0,5).forEach(([x,y],i)=>i?g.lineTo(x,y+b):g.moveTo(x,y+b));g.moveTo(-30,-136+b);g.lineTo(-14,-110+b);g.lineTo(22,-104+b);g.lineTo(34,-132+b);g.stroke();
    C.forEach(([x,y],i)=>{const tw=.55+.45*Math.sin(T*2.2+i*1.7);bvStar(W,x,y+b,4.6*tw+1.4,1.6,4,T*.2+i,'rgba(245,248,255,'+(.6+.4*tw)+')')});vGlow(W,0,-120+b,130,'170,180,255',.22*pu)}
  /* รอยแผลเก่า */vK(W,[[46,-92+b],[70,-70+b],[66,-50+b]],'rgba(200,196,236,.5)',3);vK(W,[[-72,-30+b],[-52,-22+b]],'rgba(200,196,236,.45)',2.6);
  /* เพรียงเกาะ */for(const[x,y,s]of[[-96,-84,1],[-84,-96,.7],[-104,-70,.6],[104,-34,.8],[94,-22,.6]]){vS(W,[[x-6*s,y+b+4*s],[x-3*s,y+b-5*s],[x+3*s,y+b-5*s],[x+6*s,y+b+4*s]],'#d8ccb0',1,.8);bvDE(W,x,y+b-5*s,2.6*s,1.2*s,'#3a2a2a')}
  /* รูหายใจพ่นไอ */bvE(W,-10,-168+b,7,3,'#2a2850',1);bvE(W,10,-168+b,7,3,'#2a2850',1);if(!W&&!LOWQ){for(let k=0;k<6;k++){const p=(T*.7+k/6)%1;g.fillStyle='rgba(240,246,255,'+(.6*(1-p))+')';g.beginPath();g.ellipse(Math.sin(k*2)*14*p+(k%2?-10:10),-172+b-p*100,8+p*24,6+p*14,0,0,7);g.fill()}}
  /* ทะเลเมฆชั้นหน้า */try{wCloud(W,0,44+b,190,40,T,'#f2f5fc','#aab6ce');wCloud(W,-150,38+b,70,24,T*1.2,'#eef2fa','#a8b4cc');wCloud(W,150,40+b,70,24,T*1.1+2,'#eef2fa','#a8b4cc')}catch(e){}
  bvAdd(W,()=>glowAt(0,10+op*.7+b,110,'220,210,255',.25*pu+.2*cf))},
/* ผู้เฝ้าไข่มุก: แมงกะพรุนยักษ์ร่มสองชั้นโปร่ง ร่องรัศมี ขอบระบายเป็นแฉก จุดเรืองรอบขอบ ตาหลายดวงมีเปลือก
   แขนปากหนาเป็นริบบิ้นพันกอดไข่มุกดาว (ไข่มุกมีรุ้งเหลือบ ดาวในตัว) หนวดยาวมีแสงวิ่ง ฟองลอย */
'ผู้เฝ้าไข่มุก':(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.5)+.15*Math.sin(T*6.3),sq=1+Math.sin(T*1.5)*.05,BC='rgba(80,150,210,.8)';bvShadow(80,18,.3);
  vGlow(W,0,-50+b,150,'150,220,255',.22*pu);
  /* หนวดยาว + แสงวิ่ง */if(!W){g.lineCap='round';for(let k=0;k<12;k++){const x0=-58+k*10.5,ph=T*1.6+k*.8,P=[[x0,-14+b]];for(let q=1;q<=5;q++)P.push([x0+Math.sin(ph+q*.9)*(8+q*4)+(x0*.18*q/5),-14+b+q*24]);
      g.strokeStyle=k%3?'rgba(130,200,240,.55)':'rgba(190,230,255,.65)';g.lineWidth=k%3?3:4.6;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();
      const p=(T*.6+k/12)%1,i=Math.min(4,Math.floor(p*5)),f=p*5-i,[ax,ay]=P[i],[bx,by]=P[i+1];g.save();g.globalCompositeOperation='lighter';glowAt(ax+(bx-ax)*f,ay+(by-ay)*f,7,'200,245,255',.9);g.restore()}}
  /* แขนปากริบบิ้นด้านหลัง */for(const s of[-1,1])vS(W,[[s*12,-20+b],['c',s*50,0+b,s*40,40+b,s*24+Math.sin(T*1.4+s)*6,70+b],['c',s*14,40+b,s*24,6+b,s*2,-18+b]],'rgba(200,170,230,.7)',1,1);
  g.save();g.translate(0,b);g.scale(sq,2-sq);
  /* ร่มชั้นนอก ขอบแฉก */const RIM=[];for(let k=8;k>=0;k--){const x0=-70+(k+1)*15.6,x1=-70+k*15.6;RIM.push(['q',(x0+x1)/2,6+(k%2)*4,x1,-12])}
  vS(W,[[-70,-12],['q',-82,-118,0,-126],['q',82,-118,70,-12],...RIM],BC,1,1.8);
  if(!W){g.save();vP([[-70,-12],['q',-82,-118,0,-126],['q',82,-118,70,-12],...RIM]);g.clip();g.strokeStyle='rgba(200,240,255,.35)';g.lineWidth=2;for(let k=-4;k<=4;k++){g.beginPath();g.moveTo(k*6,-124);g.quadraticCurveTo(k*20,-70,k*17,-10);g.stroke()}
    const gr=g.createLinearGradient(-60,-120,40,-40);gr.addColorStop(0,'rgba(255,255,255,.45)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.beginPath();g.ellipse(-30,-92,34,20,-.5,0,7);g.fill();g.restore()}
  /* ร่มชั้นใน */vS(W,[[-46,-22],['q',-52,-96,0,-100],['q',52,-96,46,-22],['q',0,-12,-46,-22]],'rgba(120,190,235,.55)',1,1);
  /* จุดเรืองรอบขอบ */for(let k=0;k<9;k++){const x=-64+k*16,y=-12+(k%2)*4;bvAdd(W,()=>glowAt(x,y,6,'200,250,255',.9*pu));bvDE(W,x,y,2,2,'#eaffff')}
  /* ตาหลายดวงมีเปลือก */for(const[ex,ey,s]of[[-32,-84,1],[0,-100,1.25],[32,-84,1],[-18,-62,.75],[18,-62,.75]]){bvE(W,ex,ey,7.6*s,6.6*s,'#0a2840',1);vEye(W,ex,ey+.6*s,4*s,4.4*s,'#bff4ff',W?0:7);vS(W,[[ex-8*s,ey-2*s],['q',ex,ey-11*s,ex+8*s,ey-2*s],['q',ex,ey-5*s,ex-8*s,ey-2*s]],'#3a7ab0',1,.8)}
  g.restore();
  /* ไข่มุกดาว */{const py=-30+b+Math.sin(T*1.5)*2;bvAdd(W,()=>{glowAt(0,py,80,'190,235,255',.45*pu+.2*cf);glowAt(0,py,22,'255,255,255',.9*pu)});bvE(W,0,py,26,26,'#eef6ff',1.4);
    if(!W){const gr=g.createLinearGradient(-26,py-26,26,py+26);gr.addColorStop(0,'rgba(255,190,230,.35)');gr.addColorStop(.5,'rgba(190,255,240,.3)');gr.addColorStop(1,'rgba(180,200,255,.4)');g.fillStyle=gr;g.beginPath();g.arc(0,py,25,0,7);g.fill();
      g.fillStyle='rgba(255,255,255,.95)';g.beginPath();g.ellipse(-9,py-11,8,4.6,-.6,0,7);g.fill()}bvStar(W,2,py+2,9,3.6,5,-Math.PI/2+T*.4,'rgba(255,246,210,.95)')}
  /* แขนปากด้านหน้าพันกอดไข่มุก */for(const s of[-1,1]){vS(W,[[s*30,-50+b],['c',s*44,-30+b,s*36,-6+b,s*10,-4+b],['c',s*28,-14+b,s*30,-34+b,s*20,-46+b]],'rgba(220,180,240,.85)',1,1.2);if(!W){g.strokeStyle='rgba(255,230,255,.7)';g.lineWidth=1;g.beginPath();g.moveTo(s*28,-44+b);g.bezierCurveTo(s*38,-30+b,s*30,-12+b,s*14,-6+b);g.stroke()}}
  if(!W)for(let k=0;k<5;k++){const p=(T*.35+k/5)%1;g.strokeStyle='rgba(220,245,255,'+(.7*(1-p))+')';g.lineWidth=1.4;g.beginPath();g.arc(Math.sin(k*2.3)*70+Math.sin(T+k)*5,10-p*150+b,3+k%3*2,0,7);g.stroke()}},
/* ผู้รักษาเวลา: หน้าปัดนาฬิกาเป็นหัว (เลขโรมัน กระจกสะท้อน ขอบหมุดย้ำ ระฆังบนยอด) วงแหวนชั่วโมงหมุนด้านหลัง ลูกตุ้มลวดลาย
   เสื้อคลุมม่วงปักเลขนาฬิกาทอง ชายเป็นฟันเฟือง อกเกราะทองเหลืองเปิดเห็นเฟืองหมุน บ่าซ้อนชั้น สี่แขนกลถือเข็มนาฬิกาลวดลาย */
'ผู้รักษาเวลา':(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.4),BR='#b08a42',BD='#6a5228',BL='#e8c878',RB='#2c2248',RD='#1c1430';bvShadow(64,15,.3);
  /* วงแหวนชั่วโมงหมุนด้านหลัง */{const cy=-90+b;if(!W){g.save();g.translate(0,cy);g.rotate(T*.15);g.strokeStyle='rgba(232,200,120,.55)';g.lineWidth=3;g.beginPath();g.arc(0,0,58,0,7);g.stroke();g.lineWidth=1.2;g.beginPath();g.arc(0,0,50,0,7);g.stroke();
      g.fillStyle='rgba(255,226,150,.8)';g.font='bold 9px serif';g.textAlign='center';g.textBaseline='middle';const RN=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];for(let k=0;k<12;k++){const a=k/12*6.283-Math.PI/2;g.save();g.translate(Math.cos(a)*54,Math.sin(a)*54);g.rotate(a+Math.PI/2);g.fillText(RN[k],0,0);g.restore()}g.restore()}
    bvAdd(W,()=>glowAt(0,cy,70,'255,220,150',.12*pu+.15*cf))}
  /* ลูกตุ้มลวดลาย */{const a=Math.sin(T*2.2)*.5;g.save();g.translate(0,-40+b);g.rotate(a);vK(W,[[0,0],[0,70]],BD,4.4);vK(W,[[0,0],[0,70]],W?'#fff':BL,1.4);vS(W,[[0,60],[14,74],[10,88],[0,92],[-10,88],[-14,74]],BR,1,1.4);bvStar(W,0,77,7,3,6,T,'#fff0c8');bvAdd(W,()=>glowAt(0,77,20,'255,220,150',.45*pu));g.restore()}
  /* เสื้อคลุม ชายฟันเฟือง */const HEM=[];for(let k=10;k>=0;k--){const x=-54+k*10.8;HEM.push([x+5.4,30],[x+3,24],[x,24])}
  vS(W,[[-30,-70+b],[30,-70+b],['q',48,-10,54,30],...HEM.slice(0,-1),[-54,30],['q',-48,-10,-30,-70+b]],RB,1,1.6);
  vS(W,[[-13,-68+b],[13,-68+b],[18,30],[-18,30]],RD,1,1);vK(W,[[-13,-68+b],[-18,30]],W?'#fff':BR,1.4);vK(W,[[13,-68+b],[18,30]],W?'#fff':BR,1.4);
  if(!W){g.fillStyle='rgba(232,200,120,.55)';g.font='bold 8px serif';g.textAlign='center';for(const[t,x,y]of[['III',-36,0],['VI',-30,18],['IX',34,4],['XII',38,20]])g.fillText(t,x,y+b*.5)}
  /* อกเกราะทองเหลือง + ช่องเฟือง */vS(W,[[-24,-70+b],[24,-70+b],[22,-34+b],[0,-26+b],[-22,-34+b]],BR,1,1.4);
  {const cy=-50+b;bvE(W,0,cy,13,13,'#2a1e14',1);for(const[gx,gy,gr,dir]of[[-4,cy-2,8,1],[7,cy+5,5.4,-1]]){if(!W){g.save();g.translate(gx,gy);g.rotate(T*1.4*dir);g.fillStyle=BL;g.beginPath();for(let k=0;k<16;k++){const a=k/16*6.283,rr=k%2?gr:gr*.78;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}g.closePath();g.fill();g.fillStyle='#2a1e14';g.beginPath();g.arc(0,0,gr*.32,0,7);g.fill();g.restore()}}
    if(!W){g.strokeStyle='rgba(255,240,200,.6)';g.lineWidth=1;g.beginPath();g.arc(0,cy,13,3.6,5.2);g.stroke()}}
  for(const x of[-18,18])for(const y of[-64,-40])bvDE(W,x,y+b,1.6,1.6,BL);
  /* เข็มขัดนาฬิกาทราย */vS(W,[[-30,-28+b],[30,-28+b],[30,-22+b],[-30,-22+b]],BD,1,1);vS(W,[[-5,-32+b],[5,-32+b],[1,-25+b],[5,-18+b],[-5,-18+b],[-1,-25+b]],BL,1,.8);
  /* บ่าซ้อนชั้น + สี่แขนกลถือเข็ม */for(const s of[-1,1]){for(let k=0;k<2;k++)vS(W,[[s*(24+k*2),-74+k*6+b],['q',s*(48-k*2),-78+k*6+b,s*(50-k*3),-62+k*7+b],[s*(28+k*2),-60+k*6+b]],k?BD:BR,1,1);bvDE(W,s*40,-70+b,1.6,1.6,BL);
    for(const[k,ang]of[[0,-.6-cf*.6],[1,.4+Math.sin(T*2)*.2]]){const ex=s*(42+k*6),ey=-58+k*22+b,hx=ex+s*Math.cos(ang)*26,hy=ey+Math.sin(ang)*26;vLimb(W,[s*30,-62+k*20+b,ex,ey,hx,hy],BD,9,7);bvE(W,ex,ey,4.4,4.4,BR,1);
      g.save();g.translate(hx,hy);g.rotate(s>0?ang:Math.PI-ang);const L=k?50:68;vS(W,[[0,-3],[L*.55,-2],[L*.62,-6],[L*.72,0],[L*.62,6],[L*.55,2],[L*.86,1.4],[L,0],[L*.86,-1.4],[L*.55,-2],[0,3]],'#2a1e14',1,1);
      bvE(W,L*.62,0,3,3,BL,.8);bvE(W,0,0,5.4,5.4,BR,1);g.restore()}}
  /* หัว = หน้าปัด */const hy=-98+b;bvE(W,0,hy,27,27,BR,1.8);for(let k=0;k<16;k++){const a=k/16*6.283;bvDE(W,Math.cos(a)*24,hy+Math.sin(a)*24,1.4,1.4,BL)}bvE(W,0,hy,21,21,'#f6eedc',1);
  if(!W){g.fillStyle='#3a2a20';g.font='bold 6.4px serif';g.textAlign='center';g.textBaseline='middle';const RN=['XII','III','VI','IX'];for(let k=0;k<4;k++){const a=k/4*6.283-Math.PI/2;g.fillText(RN[k],Math.cos(a)*15,hy+Math.sin(a)*15)}
    for(let k=0;k<12;k++)if(k%3){const a=k/12*6.283;g.fillRect(Math.cos(a)*16-.8,hy+Math.sin(a)*16-.8,1.6,1.6)}}
  vK(W,[[0,hy],[Math.cos(-T*.8)*12,hy+Math.sin(-T*.8)*12]],'#2a1e14',2.8);vK(W,[[0,hy],[Math.cos(-T*3)*17,hy+Math.sin(-T*3)*17]],'#c8302a',1.4);bvDE(W,0,hy,2.6,2.6,BR);
  if(!W){g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.ellipse(-8,hy-9,10,5,-.6,0,7);g.fill()}
  /* ยอดหัว: ระฆัง + ยอดแหลม */vS(W,[[-10,hy-24],[-6,hy-34],[6,hy-34],[10,hy-24]],BD,1,1);vS(W,[[-8,hy-34],['q',-8,hy-46,0,hy-48],['q',8,hy-46,8,hy-34]],BR,1,1);bvDE(W,0,hy-33,2,2,BL);vS(W,[[-2,hy-48],[0,hy-60],[2,hy-48]],BL,1,.8);
  bvAdd(W,()=>{glowAt(0,hy-60,16,'255,230,170',.6*pu);glowAt(0,hy,44,'255,240,200',.16*pu)});
  if(!W&&!LOWQ&&cf>0){g.save();g.globalCompositeOperation='lighter';glowAt(0,-60+b,90,'200,220,255',.28*cf);g.restore()}},
/* ภาพสะท้อนโอเรียน: ร่างกษัตริย์ทำจากกระจกโปร่งเป็นเหลี่ยมเพชร แสงวาบวิ่งผ่าน รอยร้าวเพิ่มตามเลือดที่ลด
   ผ้าคลุมด้ายดาวลากพื้น เคราและมงกุฎเป็นแก้ว หน้ากากร้าวตาโพรงเรือง คทาขังดาว เศษกระจกลอยวน */
'ภาพสะท้อนโอเรียน':(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.3),hf=bvHF(),cr=hf<.5?2:hf<.8?1:0,GL='rgba(170,186,240,.9)',GD='#4a5490',GV='rgba(120,130,210,.85)';bvShadow(58,14,.3);
  const facet=(L,a)=>{if(W)return;g.save();vP(L);g.clip();g.strokeStyle='rgba(255,255,255,'+(a||.3)+')';g.lineWidth=.8;for(const[x1,y1,x2,y2]of[[-30,-80,10,-30],[10,-30,-20,20],[30,-70,-6,-40],[-6,-40,20,10],[-40,-20,30,-10]]){g.beginPath();g.moveTo(x1,y1+b);g.lineTo(x2,y2+b);g.stroke()}
    const sx=((T*40)%220)-110;const gr=g.createLinearGradient(sx-20,0,sx+20,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,255,255,.45)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.translate(0,-30+b);g.rotate(-.5);g.fillRect(sx-20,-120,40,240);g.restore()};
  /* เศษกระจกลอยวน (หลัง) */const SH=[];for(let k=0;k<6;k++){const a=T*.7+k*1.047,x=Math.cos(a)*66,y=-60+b+Math.sin(a)*16+Math.sin(T*2+k)*4;SH.push([x,y,Math.sin(a),k])}
  const shard=([x,y,z,k])=>{g.save();g.translate(x,y);g.rotate(T*1.2+k);vS(W,[[-5,-8],[6,-3],[3,9],[-4,5]],GL,1,.8);if(!W){g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.moveTo(-3,-5);g.lineTo(2,-3);g.lineTo(-2,0);g.fill()}g.restore()};
  SH.filter(q=>q[2]<0).forEach(shard);
  /* ผ้าคลุมด้ายดาว */{const cs=Math.sin(T*1.1)*4,CL=[[-28,-76+b],[28,-76+b],['q',50+cs,-24,58+cs,32],[-58-cs,32],['q',-50-cs,-24,-28,-76+b]];vS(W,CL,'#1c1e48',1,1.6);
    if(!W){g.save();vP(CL);g.clip();g.strokeStyle='rgba(220,228,255,.45)';g.lineWidth=1;for(let k=-6;k<=6;k++){g.beginPath();g.moveTo(k*4.4,-74+b);g.quadraticCurveTo(k*9+Math.sin(T*1.5+k)*5,-10,k*12+Math.sin(T+k)*7,34);g.stroke()}
      for(let i=0;i<12;i++){const x=-48+(i*29)%96,y=-50+(i*37)%80,tw=.5+.5*Math.abs(Math.sin(T*1.7+i));g.fillStyle='rgba(230,236,255,'+tw+')';g.beginPath();g.arc(x,y,i%4?1:1.8,0,7);g.fill()}g.restore()}
    vK(W,[[-58-cs,32],[58+cs,32]],W?'#fff':'#c8d0f0',1.6)}
  /* ร่างกระจกเหลี่ยม */const BD=[[-20,-72+b],[20,-72+b],[26,-24+b],[22,30],[-22,30],[-26,-24+b]];vS(W,BD,GL,1,1.4);facet(BD,.32);
  vS(W,[[-8,-70+b],[8,-70+b],[10,30],[-10,30]],GV,1,.9);for(let k=0;k<4;k++)bvStar(W,0,-48+k*18+b*.5,3.4,1.4,4,T*.3+k,'rgba(255,255,255,.9)');
  /* รอยร้าวตามเลือด */if(!W&&cr>0){g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=1.3;g.beginPath();g.moveTo(-14,-62+b);g.lineTo(-4,-44+b);g.lineTo(-16,-22+b);g.lineTo(-8,4);if(cr>1){g.moveTo(12,-56+b);g.lineTo(4,-36+b);g.lineTo(16,-14+b);g.lineTo(10,16);g.moveTo(-4,-44+b);g.lineTo(8,-40+b)}g.stroke();
    if(cr>1)bvAdd(W,()=>{glowAt(-4,-44+b,12,'200,180,255',.7);glowAt(4,-36+b,10,'200,180,255',.6)})}
  /* ไหล่ + ปกขนแก้ว */for(const s of[-1,1])vS(W,[[s*16,-78+b],['q',s*38,-82+b,s*40,-62+b],[s*22,-62+b]],GD,1,1);for(let i=-3;i<=3;i++)bvE(W,i*7,-74+b+Math.abs(i)*1.2,6,4.6,'rgba(230,236,255,.9)',.9);
  /* แขนซ้ายห้อย/ยกตามร่าย */vLimb(W,[-22,-64+b,-34,-42+b-up*.5,-30,-20+b-up+Math.sin(T*1.6)*3],GL,9,7);bvE(W,-30,-20+b-up,4.4,4,'rgba(220,228,255,.95)',1);
  /* คทาขังดาว (ขวา) */{const ang=-.3-cf*.5+Math.sin(T*1.2)*.08,ex=32,ey=-50+b,hx=ex+Math.cos(ang)*20,hy=ey+Math.sin(ang)*20+16;vLimb(W,[22,-64+b,ex,ey,hx,hy],GL,9,7);
    vS(W,[[hx-1.6,hy+34],[hx+1.6,hy+34],[hx+1.6,hy-48],[hx-1.6,hy-48]],'#c8d0f0',1,.9);bvE(W,hx,hy,4.4,4,'rgba(220,228,255,.95)',1);
    const cy=hy-60;bvAdd(W,()=>glowAt(hx,cy,18+cf*14,'255,240,190',.85*pu+.1));bvStar(W,hx,cy,6,2.6,5,T*.8,'#fff4d0');
    if(!W){g.strokeStyle='#e0e6ff';g.lineWidth=1.2;g.beginPath();g.ellipse(hx,cy,10,12,0,0,7);g.stroke();for(let q=-1;q<=1;q++){g.beginPath();g.ellipse(hx,cy,Math.abs(q)*6+.5,12,0,0,7);g.stroke()}}
    vS(W,[[hx-8,cy-12],[hx,cy-20],[hx+8,cy-12]],'#c8d0f0',1,.8)}
  /* หัว: หน้ากากแก้วร้าว เครา มงกุฎดาวแก้ว */{const hy=-96+b;vS(W,[[-12,hy+2],['q',-15,hy+18,-7,hy+34],['q',0,hy+42,7,hy+34],['q',15,hy+18,12,hy+2]],'rgba(220,228,255,.85)',1,1.1);
    if(!W)for(let i=-2;i<=2;i++){g.strokeStyle='rgba(150,160,220,.6)';g.lineWidth=.9;g.beginPath();g.moveTo(i*4,hy+8);g.quadraticCurveTo(i*5,hy+20,i*3,hy+34);g.stroke()}
    bvE(W,0,hy,14,16,GL,1.4);facet([[-14,hy-16],[14,hy-16],[14,hy+16],[-14,hy+16]],.25);
    if(!W){g.strokeStyle='rgba(255,255,255,.95)';g.lineWidth=1.2;g.beginPath();g.moveTo(-6,hy-13);g.lineTo(2,hy-3);g.lineTo(-4,hy+8);g.moveTo(2,hy-3);g.lineTo(11,hy+3);g.stroke()}
    for(const s of[-1,1]){bvDE(W,s*5,hy-1,3.4,2.6,'#141838');vEye(W,s*5,hy-1,2.2,1.8,cr>1?'#d8c0ff':'#e8eeff',W?0:7)}
    vS(W,[[-15,hy-12],[-16,hy-26],[-9,hy-18],[-5,hy-33],[0,hy-20],[5,hy-33],[9,hy-18],[16,hy-26],[15,hy-12]],'rgba(210,220,250,.95)',1,1.2);
    for(const[x,y]of[[-16,hy-26],[-5,hy-33],[5,hy-33],[16,hy-26]]){bvAdd(W,()=>glowAt(x,y,8,'230,235,255',.85*pu));bvStar(W,x,y,3,1.2,4,T,'#ffffff')}}
  SH.filter(q=>q[2]>=0).forEach(shard);
  if(!W&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(0,-50+b,80,'170,180,255',.16+.14*cf);g.restore()}},
/* ผู้ทอ: แมงมุมจักรกลหน้ากี่ทอใหญ่ (โครงไม้สลักขอบทองเหลือง ยอดดาว) ด้ายยืนสั่น ท้องใหญ่ด้านหลังเป็นลายกลุ่มดาวเรือง
   ลำตัวเกราะแผ่นหมุดย้ำ ขาเข็ม 6 ขามีข้อทองเหลือง (ร่าง ③ เหลือสอง ขาที่หักห้อย) ก้ามหน้าถือกระสวย หัวหน้ากากตาเดียวมงกุฎ
   แกนกลางความกลัวโตขึ้นตามร่าง · ร่าง ③ เกราะแตก */
'ผู้ทอ':(T,W,br,sw,up,cf)=>{const b=br,ph=(typeof WVRFX!=='undefined'&&WVRFX.ph)||1,pu=.55+.35*Math.sin(T*2.2),IR='#3c3650',IRL='#565072',BR='#b08a42',BL='#e8c878',WD='#5a4632',CO='#b070ff';bvShadow(92,20,.32);
  /* กี่ทอ: เสา + คานบนสลัก + ยอดดาว */for(const s of[-1,1]){vS(W,[[s*70-5,30],[s*70+5,30],[s*70+4,-124+b],[s*70-4,-124+b]],WD,1,1.2);for(let k=0;k<4;k++)bvE(W,s*70,-100+k*34+b*.5,6,3,BR,.8);
    vS(W,[[s*70,-138+b],[s*70+6,-130+b],[s*70,-122+b],[s*70-6,-130+b]],BR,1,.9);bvAdd(W,()=>glowAt(s*70,-130+b,10,'255,230,160',.5*pu));bvStar(W,s*70,-130+b,4,1.6,5,T,'#fff0c0')}
  vS(W,[[-80,-124+b],[80,-124+b],[76,-114+b],[-76,-114+b]],WD,1,1.2);vK(W,[[-76,-119+b],[76,-119+b]],W?'#fff':BL,1.6);for(let k=-6;k<=6;k++)bvDE(W,k*11,-119+b,1.2,1.2,BL);
  vS(W,[[-74,-2],[74,-2],[74,6],[-74,6]],WD,1,1);
  /* ด้ายยืน + ผ้าที่ทอไปแล้ว */if(!W){g.save();g.strokeStyle='rgba(225,230,255,'+(ph===2?.85:.5)+')';g.lineWidth=1;for(let k=-7;k<=7;k++){g.beginPath();g.moveTo(k*9,-114+b);g.lineTo(k*9+Math.sin(T*3+k)*(ph===2?6:2),-2);g.stroke()}
    const gr=g.createLinearGradient(0,-40,0,-2);gr.addColorStop(0,'rgba(120,110,200,0)');gr.addColorStop(1,'rgba(150,140,230,.55)');g.fillStyle=gr;g.fillRect(-64,-40+b*.3,128,38);
    g.fillStyle='rgba(255,250,220,.8)';for(let i=0;i<10;i++){g.beginPath();g.arc(-58+(i*37)%116,-34+(i*13)%30+b*.3,1.1,0,7);g.fill()}g.restore();if(ph===2)bvAdd(W,()=>glowAt(0,-56+b,96,'220,210,255',.22*pu))}
  /* ท้องใหญ่ด้านหลัง ลายกลุ่มดาว */{const ay=-62+b;vS(W,[[-34,ay+18],['q',-50,ay-30,0,ay-40],['q',50,ay-30,34,ay+18],['q',0,ay+26,-34,ay+18]],'#2a2440',1,1.6);
    if(!W){const C=[[-20,ay-12],[-6,ay-26],[10,ay-20],[22,ay-4],[0,ay+4]];g.strokeStyle='rgba(200,190,255,.5)';g.lineWidth=1;g.beginPath();C.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.stroke();C.forEach(([x,y],i)=>{const tw=.5+.5*Math.sin(T*2+i*1.3);bvStar(W,x,y,3*tw+1.2,1,4,0,'rgba(240,235,255,'+(.6+.4*tw)+')')})}}
  /* ขาเข็ม */const arms=ph===3?[[-1,.2],[1,.2]]:[[-1,-.6],[-1,.1],[-1,.75],[1,-.6],[1,.1],[1,.75]];
  for(const[s,a0]of arms){const a=a0+Math.sin(T*2+a0*3)*.12-(ph===1?cf*.3:0),ex=s*(50+Math.cos(a)*30),ey=-42+b+Math.sin(a)*30,fx=s*(82+Math.cos(a)*40),fy=-32+b+Math.sin(a)*50+30;
    vLimb(W,[s*24,-40+b,ex,ey],IR,8,6.4);vLimb(W,[ex,ey,fx,fy],IRL,6.4,4.6);bvE(W,ex,ey,4.4,4.4,BR,1);bvDE(W,ex,ey,1.4,1.4,BL);
    vS(W,[[fx-1.6,fy],[fx+1.6,fy],[fx+s*16,fy+32],[fx+s*13,fy+33]],'#e4e8f2',1,.8);if(!W){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=.6;g.beginPath();g.moveTo(fx,fy+2);g.lineTo(fx+s*13,fy+30);g.stroke()}}
  if(ph===3)for(const s of[-1,1]){vLimb(W,[s*26,-34+b,s*40,-14+b,s*42+Math.sin(T*1.4+s)*3,10],'#2a2638',6,4);vS(W,[[s*40,10],[s*46,8],[s*44,16]],'#c8ccd8',1,.6)}
  /* ลำตัวเกราะ */bvE(W,0,-40+b,40,32,IR,1.8);vS(W,[[-34,-56+b],[0,-72+b],[34,-56+b],[26,-28+b],[0,-22+b],[-26,-28+b]],ph<3?IRL:'#46405e',1,1.2);
  for(const[x,y]of[[-26,-54],[26,-54],[-18,-34],[18,-34],[0,-66]])bvDE(W,x,y+b,1.8,1.8,BL);
  if(ph<3)for(const s of[-1,1])vK(W,[[s*6,-68+b],[s*28,-56+b],[s*22,-32+b]],W?'#fff':BR,1.4);
  /* ก้ามหน้าถือกระสวย */{const sx=0,sy=-16+b+Math.sin(T*3)*2;for(const s of[-1,1])vLimb(W,[s*12,-30+b,s*16,-20+b,s*10,sy],IR,5,4);
    g.save();g.translate(sx,sy);g.rotate(Math.sin(T*1.6)*.2);vS(W,[[-16,0],['q',0,-6,16,0],['q',0,6,-16,0]],WD,1,1);bvE(W,0,0,4,3.4,'#e8ecf8',.8);g.restore()}
  /* แกนกลาง */const cr=ph===3?18:ph===2?11:8;bvE(W,0,-40+b,cr+5,cr+5,'#2a1a40',1.2);bvE(W,0,-40+b,cr,cr,CO,1);bvAdd(W,()=>{glowAt(0,-40+b,cr*3,'190,120,255',.5*pu+(ph===3?.3:0));glowAt(0,-40+b,cr,'255,230,255',.65)});
  if(!W){g.strokeStyle='rgba(255,220,255,.8)';g.lineWidth=1;for(let k=0;k<6;k++){const a=k*1.047+T*.6;g.beginPath();g.moveTo(Math.cos(a)*cr*.5,-40+b+Math.sin(a)*cr*.5);g.lineTo(Math.cos(a)*cr*.95,-40+b+Math.sin(a)*cr*.95);g.stroke()}}
  if(ph===3&&!W){g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1.3;for(const[x1,y1,x2,y2,x3,y3]of[[-32,-62,-16,-50,-22,-40],[26,-64,12,-48,18,-38],[-28,-20,-14,-30,-6,-24],[30,-24,16,-32,10,-26]]){g.beginPath();g.moveTo(x1,y1+b);g.lineTo(x2,y2+b);g.lineTo(x3,y3+b);g.stroke()}
    bvAdd(W,()=>{for(let k=0;k<4;k++){const p=(T*.8+k/4)%1;glowAt(Math.sin(k*2.1)*30,-40+b-p*50,4,'220,180,255',1-p)}})}
  /* หัว: หน้ากากตาเดียว + มงกุฎ */const hy=-84+b;bvE(W,0,hy,19,15,IRL,1.4);vS(W,[[-14,hy+4],['q',0,hy+16,14,hy+4],['q',0,hy+9,-14,hy+4]],'#2a2638',1,.8);
  bvE(W,0,hy-1,7.6,6.4,'#140e1e',1);vEye(W,0,hy-1,5.2,4.4,ph===3?'#ffb0ff':'#e0d0ff',W?0:9);bvAdd(W,()=>glowAt(0,hy-1,14,ph===3?'255,150,255':'210,190,255',.6*pu));
  for(const s of[-1,1])for(let k=0;k<2;k++)bvE(W,s*(10+k*4),hy-6+k*4,1.8,1.8,'#c8b8ff',.6);
  vS(W,[[-17,hy-8],[-12,hy-22],[-6,hy-14],[0,hy-26],[6,hy-14],[12,hy-22],[17,hy-8]],BR,1,1.1);bvStar(W,0,hy-26,3.4,1.4,5,-Math.PI/2,'#fff0c0');bvAdd(W,()=>glowAt(0,hy-26,8,'255,230,170',.7*pu))}};
/* ติดตั้ง: ห่อ BV1 เดิม · วาฬตอนดำน้ำใช้ภาพเดิม (วงคลื่น) */
function bv9Install(){let n=0;for(const k in BV9D){const old=BV1[k];if(!old||old.bv9)continue;BV9.old[k]=old;
    const F=function(T,W,br,sw,up,cf){if(k==='วาฬกลืนฟ้า'&&typeof WSK!=='undefined'&&WSK.dv===2)return old.apply(this,arguments);
      if(BV9.on){try{const r=BV9D[k](T,W,br,sw,up,cf);BV9.n++;return r}catch(e){BV9.err=k+' '+String(e&&e.stack||e).slice(0,240)}}return old.apply(this,arguments)};F.bv9=1;BV1[k]=F;n++}return n}
{let k=0;const iv=setInterval(()=>{k++;if(BV1['ผู้ทอ']&&BV1['ภาพสะท้อนโอเรียน']&&BV1['ผู้รักษาเวลา']&&BV1['วาฬกลืนฟ้า']&&BV1['ผู้เฝ้าไข่มุก']){bv9Install();clearInterval(iv)}else if(k>200)clearInterval(iv)},200)}
/* จอแนวตั้ง: ป้ายสถานะดัน (ชื่อบอส · ร่าง · เวลา) เดิมทับแถบเลือดบอส → เลื่อนลงใต้แถบ+เกจเบรก+เกจไฟ (🔥) เมื่อมีแถบบอสแบบแนวตั้ง */
function dgPillOff(){try{if(typeof vwBossBar==='function'&&VW&&VW.on&&VW.bb&&(VW.bb.r-VW.bb.l)>=130)return 0;const bo=mons.find(m=>m.t===3);if(!bo||!me.cls||Math.hypot(bo.x-me.x,bo.y-me.y)>=650)return 0;return (typeof FEVC!=='undefined'&&FEVC?36:0)+80}catch(e){return 0}}
