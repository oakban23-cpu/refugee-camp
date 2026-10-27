
/* ===== v545 มอนแมพ 39–42 วาดใหม่ 10 แบบ (ธีม 39 · 40 · 42 · 43 · 44) — ห่อ MV1D เดิม: error → แบบเดิม · คงเงื่อนไขซ่อนตัวในดัน (432 hg · 442 mr) ===== */
const MV9={on:1,err:'',n:0,old:{}};
/* ช่วย: จุดบนเส้นโค้ง → ลำตัวยาวหนา (วาดเป็นปล้องวงรีซ้อน) */
function mv9Seg(W,P,w0,w1,c1,c2,band){for(let i=P.length-1;i>=0;i--){const u=i/(P.length-1),w=w0+(w1-w0)*u,[x,y]=P[i];bvE(W,x,y,w*1.05,w,i%2&&band?c2:c1,1,.8)}}
const MV9D={
/* วิญญาณกะลาสี: ร่างโปร่งฟ้าเรืองแสง ผ้าโพกแดงชายปลิว เสื้อลายขวาง ตาโพรงเรืองฟ้า ปากอ้า ร่างล่างเป็นควันพลิ้ว ถือสมอสนิมโซ่ห้อย ฟองอากาศลอย */
390:(r,T,W,bob)=>{const b=Math.sin(T*2.2)*r*.08-r*.06,sw=Math.sin(T*1.6)*.14;
  const GH='rgba(150,210,245,.85)',GL='rgba(215,240,255,.92)',ST='#2c4c78';vGlow(W,0,-r*.45+b,r*1.15,'140,205,255',.24);try{sgGhostTrail(W,r,T,b)}catch(e){}
  /* ร่างล่างควัน 3 สาย */for(let k=0;k<3;k++){const ox=(k-1)*r*.16,wv=Math.sin(T*2.6+k*1.7)*r*.1;vS(W,[[ox-r*.2,r*.02+b],['q',ox-r*.24,r*.4+b,ox+wv-r*.04,r*.72+b],['q',ox+wv+r*.06,r*.5+b,ox+r*.2,r*.02+b]],k===1?GL:GH,1,.7)}
  /* แขนหลังถือสมอ */{const ax=-r*.5,ay=r*.16+b+sw*r*.2;vLimb(W,[-r*.26,-r*.3+b,-r*.46,-r*.08+b,ax,ay],GH,r*.13,r*.1);
    if(!W)wChain(W,ax,ay,ax-r*.04,ay+r*.3,4,r*.05,'#6a4a30');const qx=ax-r*.04,qy=ay+r*.32;vS(W,[[qx-r*.03,qy-r*.06],[qx+r*.03,qy-r*.06],[qx+r*.03,qy+r*.26],[qx-r*.03,qy+r*.26]],'#7a5434',1,.7);
    vS(W,[[qx-r*.22,qy+r*.12],['q',qx-r*.2,qy+r*.34,qx,qy+r*.34],['q',qx+r*.2,qy+r*.34,qx+r*.22,qy+r*.12],[qx+r*.16,qy+r*.18],['q',qx+r*.12,qy+r*.27,qx,qy+r*.27],['q',qx-r*.12,qy+r*.27,qx-r*.16,qy+r*.18]],'#8a5a36',1,.7);
    vS(W,[[qx-r*.12,qy-r*.02],[qx+r*.12,qy-r*.02],[qx+r*.12,qy+r*.03],[qx-r*.12,qy+r*.03]],'#6a4428',1,.6);if(!W){g.fillStyle='rgba(200,110,60,.55)';g.beginPath();g.arc(qx+r*.1,qy+r*.28,r*.03,0,7);g.arc(qx-r*.14,qy+r*.2,r*.025,0,7);g.fill()}}
  /* ลำตัวเสื้อลายขวาง */const tb=vS(W,[[-r*.3,-r*.48+b],[r*.3,-r*.48+b],['q',r*.38,-r*.1+b,r*.26,r*.1+b],[-r*.26,r*.1+b],['q',-r*.38,-r*.1+b,-r*.3,-r*.48+b]],GL,1,1);
  if(!W){g.save();vP([[-r*.3,-r*.48+b],[r*.3,-r*.48+b],['q',r*.38,-r*.1+b,r*.26,r*.1+b],[-r*.26,r*.1+b],['q',-r*.38,-r*.1+b,-r*.3,-r*.48+b]]);g.clip();g.fillStyle='rgba(44,76,120,.75)';for(let k=0;k<4;k++)g.fillRect(-r*.5,-r*.42+k*r*.13+b,r,r*.055);g.restore()}
  vD(W,[[-r*.12,-r*.48+b],[0,-r*.36+b],[r*.12,-r*.48+b]],'#e8f6ff');
  /* หัว */const hx=r*.04,hy=-r*.72+b;wE(W,hx,hy,r*.27,r*.25,GL);
  for(const s of[-1,1]){vD(W,[[hx+s*r*.1-r*.055,hy-r*.02],['q',hx+s*r*.1,hy-r*.1,hx+s*r*.1+r*.055,hy-r*.02],['q',hx+s*r*.1,hy+r*.07,hx+s*r*.1-r*.055,hy-r*.02]],'#16304e');vEye(W,hx+s*r*.1,hy-r*.01,r*.03,r*.03,'#8af4ff',W?0:8)}
  vD(W,[[hx-r*.06,hy+r*.09],['q',hx,hy+r*.2+Math.sin(T*3)*r*.03,hx+r*.06,hy+r*.09],['q',hx,hy+r*.12,hx-r*.06,hy+r*.09]],'#16304e');
  /* ผ้าโพกแดง + ชายปลิว */vS(W,[[hx-r*.26,hy-r*.04],['q',hx-r*.24,hy-r*.28,hx,hy-r*.28],['q',hx+r*.24,hy-r*.28,hx+r*.26,hy-r*.04],['q',hx,hy-r*.14,hx-r*.26,hy-r*.04]],'#d8382e',1,.8);
  const wv=Math.sin(T*4)*r*.06;vS(W,[[hx-r*.24,hy-r*.12],['q',hx-r*.42,hy-r*.16+wv,hx-r*.5,hy-r*.02+wv],['q',hx-r*.4,hy-r*.04,hx-r*.26,hy-r*.04]],'#b82a24',1,.6);vS(W,[[hx-r*.24,hy-r*.1],['q',hx-r*.38,hy+r*.02+wv,hx-r*.42,hy+r*.12+wv],['q',hx-r*.3,hy+r*.06,hx-r*.24,hy-r*.04]],'#c8302a',1,.6);
  if(!W){g.fillStyle='rgba(255,255,255,.7)';for(const[dx,dy]of[[-.14,-.2],[.1,-.22],[.0,-.14]]){g.beginPath();g.arc(hx+dx*r,hy+dy*r,r*.018,0,7);g.fill()}}
  /* แขนหน้ายกชี้ */vLimb(W,[r*.24,-r*.34+b,r*.44,-r*.38+b-sw*r*.3,r*.56,-r*.5+b-sw*r*.4],GL,r*.12,r*.09);
  /* ฟองอากาศลอย */if(!W)for(let k=0;k<4;k++){const p=(T*.4+k/4)%1;g.strokeStyle='rgba(210,240,255,'+(.7*(1-p))+')';g.lineWidth=r*.015;g.beginPath();g.arc(Math.sin(k*2.3)*r*.4+Math.sin(T*2+k)*r*.04,-r*.4-p*r*.8+b,r*(.025+k%2*.015),0,7);g.stroke()}
  return true},
/* ปลาไหลอสนี: ลำตัวหนาคดเคี้ยวเป็นปล้อง น้ำเงินเข้ม ท้องฟ้าอ่อน ลายสายฟ้าเหลือง ครีบริบบิ้นโปร่ง หัวขากรรไกรอ้า หนวด ตาเหลือง ประกายไฟฟ้า */
391:(r,T,W)=>{const by=-r*.32+Math.sin(T*2.4)*r*.1,N=12,P=[];for(let i=0;i<=N;i++){const u=i/N,x=r*1.0-u*r*2.3,y=by+Math.sin(T*5-u*6.4)*r*.24*(.25+u*.75);P.push([x,y])}
  vGlow(W,-r*.1,by,r*1.4,'120,200,255',.24);
  /* ครีบริบบิ้นโปร่ง (บน) */if(!W){g.beginPath();g.moveTo(P[1][0],P[1][1]-r*.12);for(let i=2;i<N;i++)g.lineTo(P[i][0],P[i][1]-r*(.2-i*.008)+Math.sin(T*8+i)*r*.03);for(let i=N-1;i>=1;i--)g.lineTo(P[i][0],P[i][1]-r*.08);g.closePath();g.fillStyle='rgba(150,210,255,.45)';g.fill();g.strokeStyle='rgba(30,58,106,.6)';g.lineWidth=r*.015;g.stroke()}
  /* ลำตัว */for(let i=N;i>=1;i--){const u=i/N,w=r*(.2-u*.13),[x,y]=P[i];bvE(W,x,y,w*1.15,w,i%2?'#24467e':'#1e3a6a',1,.7);if(!W){g.fillStyle='rgba(170,215,255,.55)';g.beginPath();g.ellipse(x,y+w*.45,w*.8,w*.3,0,0,7);g.fill()}}
  /* ลายสายฟ้าเหลืองบนหลัง */for(let i=2;i<N-1;i+=2){const[x,y]=P[i],[x2,y2]=P[i+1],w=r*(.2-i/N*.13);vK(W,[[x+w*.5,y-w*.6],[x,y-w*.1],[x+w*.2,y-w*.2],[(x+x2)/2-w*.4,y2-w*.5]],W?'#fff':'#ffe066',r*.035)}
  /* หาง */{const[x,y]=P[N];vS(W,[[x+r*.04,y-r*.02],[x-r*.2,y-r*.14+Math.sin(T*6)*r*.05],[x-r*.16,y+r*.1+Math.sin(T*6)*r*.05]],'#3a6aaa',1,.6)}
  /* หัว */const[hx,hy]=P[0],op=.5+.5*Math.sin(T*3);vS(W,[[hx-r*.16,hy-r*.16],['q',hx+r*.08,hy-r*.22,hx+r*.3,hy-r*.06],[hx+r*.2,hy-r*.0],['q',hx,hy+r*.02,hx-r*.16,hy+r*.12]],'#2a4e8a',1,.9);
  vS(W,[[hx-r*.12,hy+r*.06],['q',hx+r*.06,hy+r*.06+op*r*.06,hx+r*.26,hy+r*.06+op*r*.08],['q',hx+r*.04,hy+r*.18,hx-r*.14,hy+r*.14]],'#1e3a6a',1,.8);
  if(!W){g.fillStyle='#0a1a30';g.beginPath();g.moveTo(hx+r*.2,hy+r*.0);g.lineTo(hx+r*.24,hy+r*.06+op*r*.07);g.lineTo(hx-r*.02,hy+r*.06);g.closePath();g.fill()}for(let i=0;i<3;i++)vFang(W,hx+r*(.06+i*.06),hy+r*.0,r*.03,r*.04,'#e8f4ff');
  vGlow(W,hx+r*.06,hy-r*.1,r*.2,'255,224,100',.5);vEye(W,hx+r*.06,hy-r*.1,r*.045,r*.04,'#ffe066',W?0:6);
  for(const s of[0,1])vK(W,[[hx+r*.22,hy-r*.02+s*r*.06],['q',hx+r*.4,hy-r*.06+s*r*.1+Math.sin(T*4+s)*r*.05,hx+r*.5,hy+r*.06+s*r*.1]],W?'#fff':'#9ac8ff',r*.018);
  /* ประกายไฟฟ้า */if(!W&&Math.sin(T*7)>.1){const i=(Math.floor(T*5)%(N-3))+2,[x,y]=P[i];try{wBolt(W,x,y-r*.1,x+r*.1,y-r*.5,4,r*.08,T,i,'rgba(255,240,140,.9)',r*.03);wBolt(W,x,y+r*.1,x-r*.14,y+r*.42,4,r*.08,T,i+3,'rgba(190,230,255,.85)',r*.025)}catch(e){}}
  return true},
/* ปรสิตแสง: ร่มโปร่งฟ้าอมเขียวเป็นร่อง ขอบระบาย แกนเรืองเขียว ตาสามดวง หนวดยาว + ขอเกี่ยวปรสิต หนวดปากพลิ้ว */
400:(r,T,W,bob)=>{const b=Math.sin(T*2)*r*.08-r*.12,pu=.6+.4*Math.sin(T*3),sq=1+Math.sin(T*3)*.06;
  vGlow(W,0,-r*.2+b,r*1.0,'140,255,200',.26*pu);
  if(!W){g.lineCap='round';for(let k=0;k<7;k++){const x0=-r*.42+k*r*.14;g.strokeStyle=k%2?'rgba(150,230,255,.55)':'rgba(170,255,210,.5)';g.lineWidth=r*.035;g.beginPath();g.moveTo(x0,r*.06+b);g.bezierCurveTo(x0+Math.sin(T*3+k)*r*.2,r*.4+b,x0+Math.sin(T*2.2+k)*r*.1,r*.62+b,x0+Math.sin(T*2.4+k*1.3)*r*.26,r*.92+b);g.stroke();
      if(k%2===0){const ex=x0+Math.sin(T*2.4+k*1.3)*r*.26,ey=r*.92+b;g.strokeStyle='rgba(220,255,200,.8)';g.lineWidth=r*.02;g.beginPath();g.arc(ex+r*.03,ey,r*.035,Math.PI*.2,Math.PI*1.4);g.stroke()}}}
  /* หนวดปากพลิ้ว */for(const s of[-1,1])vS(W,[[s*r*.08,r*.02+b],['q',s*r*.2+Math.sin(T*2+s)*r*.06,r*.3+b,s*r*.1,r*.52+b],['q',s*r*.02,r*.3+b,s*r*.0,r*.04+b]],'rgba(170,240,230,.7)',1,.5);
  /* ร่ม */g.save();g.translate(0,b);g.scale(sq,2-sq);
  const bp=[[-r*.56,r*.02],['q',-r*.6,-r*.6,0,-r*.62],['q',r*.6,-r*.6,r*.56,r*.02]];for(let k=5;k>=0;k--){const x0=-r*.56+(k+1)*r*.187,x1=-r*.56+k*r*.187;bp.push(['q',(x0+x1)/2,r*.12,x1,r*.02])}
  vS(W,bp,'rgba(140,220,230,.78)',1,1);
  if(!W){g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=r*.02;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(k*r*.06,-r*.6);g.quadraticCurveTo(k*r*.2,-r*.3,k*r*.24,r*.0);g.stroke()}g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(-r*.22,-r*.36,r*.12,r*.06,-.5,0,7);g.fill()}
  /* แกนเรือง + ตาสามดวง */vGlow(W,0,-r*.24,r*.36,'160,255,180',.6*pu);if(!W){const gr=g.createRadialGradient(0,-r*.2,0,0,-r*.2,r*.2);gr.addColorStop(0,'rgba(240,255,220,.95)');gr.addColorStop(.6,'rgba(160,255,170,.55)');gr.addColorStop(1,'rgba(120,230,170,0)');g.fillStyle=gr;g.beginPath();g.arc(0,-r*.2,r*.2,0,7);g.fill()}for(const[dx,dy]of[[-r*.17,-r*.38],[r*.15,-r*.4],[r*.0,-r*.5]]){wE(W,dx,dy,r*.05,r*.05,'#e8fff0');vEye(W,dx+r*.01,dy,r*.03,r*.035,'#0a3a2a',0)}
  g.restore();return true},
/* หนอนกรด: โผล่จากหลุมเนื้อขอบนูน ลำตัวปล้องหนาโค้ง สีเขียวเหลืองมีแถบเข้ม ปากกลมฟันวงซ้อน น้ำลายกรดหยด แอ่งกรดเรือง */
401:(r,T,W,bob)=>{const sw=Math.sin(T*2.2)*r*.16,rise=.92+.08*Math.sin(T*1.4);
  /* หลุมเนื้อ */if(!W){g.fillStyle='rgba(90,20,40,.75)';g.beginPath();g.ellipse(0,r*.72,r*.56,r*.16,0,0,7);g.fill()}wE(W,0,r*.68,r*.5,r*.12,'#8a3a4a');if(!W){g.fillStyle='#3a0a18';g.beginPath();g.ellipse(0,r*.68,r*.36,r*.08,0,0,7);g.fill()}
  /* แอ่งกรด */vGlow(W,r*.36,r*.76,r*.26,'200,255,90',.4);if(!W){g.fillStyle='rgba(190,240,80,.6)';g.beginPath();g.ellipse(r*.36,r*.78,r*.16,r*.04,0,0,7);g.fill()}
  const N=7,P=[];for(let k=0;k<=N;k++){const q=k/N;P.push([sw*q*q*1.2+Math.sin(T*3+q*3)*r*.03,r*.66-q*r*1.18*rise])}
  for(let k=0;k<N;k++){const[x,y]=P[k],q=k/N,rr=r*(.24-q*.05);bvE(W,x,y,rr*1.12,rr*.9,k%2?'#9ab83a':'#b8d24a',1,1);if(!W){g.strokeStyle='rgba(70,90,20,.75)';g.lineWidth=r*.025;g.beginPath();g.ellipse(x,y+rr*.2,rr*1.02,rr*.5,0,.15,Math.PI-.15);g.stroke();g.fillStyle='rgba(255,255,220,.35)';g.beginPath();g.ellipse(x-rr*.4,y-rr*.35,rr*.3,rr*.14,-.3,0,7);g.fill()}}
  /* หัว + ปากกลมฟันวงซ้อน */const[hx,hy]=P[N],op=.6+.4*Math.sin(T*2.6);wE(W,hx,hy,r*.26,r*.2,'#c8e050');
  if(!W){g.fillStyle='#4a0a1e';g.beginPath();g.ellipse(hx,hy-r*.02,r*.18*op,r*.12*op,0,0,7);g.fill();g.fillStyle='#1a0008';g.beginPath();g.ellipse(hx,hy-r*.02,r*.08*op,r*.05*op,0,0,7);g.fill()}
  for(let k=0;k<10;k++){const a=k/10*6.283,x=hx+Math.cos(a)*r*.17*op,y=hy-r*.02+Math.sin(a)*r*.11*op;g.save();g.translate(x,y);g.rotate(a+Math.PI/2);vFang(W,0,0,r*.05,r*.06,'#f4f0d0');g.restore()}
  /* น้ำลายกรดหยด */if(!W)for(let k=0;k<2;k++){const p=(T*.9+k*.5)%1,dx=hx+(k?-1:1)*r*.12;g.fillStyle='rgba(210,255,90,'+(.9*(1-p))+')';g.beginPath();g.ellipse(dx,hy+r*.1+p*r*.5,r*.03,r*.05,0,0,7);g.fill()}
  vGlow(W,hx,hy,r*.3,'200,255,90',.25);return true},
/* เพรียงท้องวาฬ: กองเปลือกกรวยเป็นแผ่นสีกระดูก ขอบปากสีชมพูเนื้อ ตาก้านยาวโผล่จากกรวยใหญ่หันมอง หนวดขนนกปัดเข้าออก ฐานเนื้อ */
402:(r,T,W,bob)=>{const op=.5+.5*Math.sin(T*1.8),look=Math.sin(T*.9)*.5;
  if(!W){g.fillStyle='rgba(110,40,60,.7)';g.beginPath();g.ellipse(0,r*.74,r*.78,r*.16,0,0,7);g.fill()}
  const cone=(dx,dy,s,ph)=>{const c=[[dx-r*.36*s,dy+r*.32*s],['q',dx-r*.34*s,dy,dx-r*.18*s,dy-r*.3*s],[dx+r*.18*s,dy-r*.3*s],['q',dx+r*.34*s,dy,dx+r*.36*s,dy+r*.32*s]];vS(W,c,'#e2d6b8',1,1);
    if(!W){g.strokeStyle='rgba(120,100,70,.6)';g.lineWidth=r*.02*s;for(const q of[-.2,0,.2]){g.beginPath();g.moveTo(dx+q*r*.6*s,dy+r*.3*s);g.lineTo(dx+q*r*.3*s,dy-r*.28*s);g.stroke()}g.strokeStyle='rgba(120,100,70,.4)';for(const q of[.05,.18]){g.beginPath();g.moveTo(dx-r*(.32-q*.3)*s,dy+r*q*s);g.lineTo(dx+r*(.32-q*.3)*s,dy+r*q*s);g.stroke()}}
    wE(W,dx,dy-r*.3*s,r*.18*s,r*.07*s,'#c87a86');if(!W){g.fillStyle='#3a1a22';g.beginPath();g.ellipse(dx,dy-r*.3*s,r*.12*s,r*.04*s,0,0,7);g.fill()}
    /* หนวดขนนก */const o=(.5+.5*Math.sin(T*2.2+ph));if(o>.25)for(let k=-2;k<=2;k++){const a=-Math.PI/2+k*.32,L=r*.34*s*o,ex=dx+Math.cos(a)*L*(1+look*.2),ey=dy-r*.3*s+Math.sin(a)*L;vK(W,[[dx,dy-r*.3*s],['q',dx+Math.cos(a)*L*.6+r*.06*s,dy-r*.3*s+Math.sin(a)*L*.6,ex,ey]],W?'#fff':'#f0d8b0',r*.03*s);if(!W){g.strokeStyle='rgba(240,216,176,.7)';g.lineWidth=r*.012*s;for(let q=1;q<4;q++){const px=dx+(ex-dx)*q/4,py=dy-r*.3*s+(ey-dy+r*.3*s)*q/4;g.beginPath();g.moveTo(px,py);g.lineTo(px+r*.05*s,py+r*.03*s);g.stroke()}}}};
  cone(-r*.46,r*.42,.62,1.2);cone(r*.44,r*.46,.58,2.6);
  /* ตาก้าน (จากกรวยใหญ่ หลังกรวย) */{const sx=0,sy=r*.0,ex=look*r*.22,ey=-r*.62-op*r*.1;vLimb(W,[sx,sy,ex*.5,-r*.36,ex,ey],'#d88a96',r*.08,r*.06);wE(W,ex,ey,r*.13,r*.12,'#f8f0e8');vEye(W,ex+look*r*.04,ey,r*.06,r*.065,'#2a0a14',0);if(!W){g.fillStyle='rgba(200,40,60,.5)';g.lineWidth=r*.01;g.strokeStyle='rgba(200,40,60,.5)';g.beginPath();g.moveTo(ex-r*.12,ey);g.lineTo(ex-r*.06,ey+r*.02);g.stroke()}}
  cone(0,r*.3,1,0);
  if(!W)for(let k=0;k<3;k++){const p=(T*.5+k/3)%1;g.fillStyle='rgba(255,220,230,'+(.5*(1-p))+')';g.beginPath();g.arc((k-1)*r*.4,r*.6-p*r*.5,r*.025,0,7);g.fill()}
  return true},
/* อุกกาบาตเดินได้: ร่างหินขรุขระม่วงดำมีหลุม รอยแตกลาวาเรืองส้มเต้นตามจังหวะ แกนหลอมเหลวกลางอก ตาลาวาเฉียง แขนขาหินท่อน ควันและถ่านไฟลอยจากหลัง หินก้อนเล็กโคจร */
420:(r,T,W,bob,sw0,la,ra)=>{const b=Math.sin(T*3)*r*.04,sw=Math.sin(T*4)*r*.1,pu=.6+.4*Math.sin(T*3),LV=W?'#fff':'rgba(255,'+(140+60*pu|0)+',60,.95)';
  vGlow(W,0,-r*.2+b,r*1.1,'255,140,60',.2*pu);
  /* ควัน+ถ่าน */if(!W)for(let k=0;k<5;k++){const p=(T*.5+k/5)%1;g.fillStyle=k%2?'rgba(90,80,100,'+(.45*(1-p))+')':'rgba(255,170,80,'+(.9*(1-p))+')';g.beginPath();g.arc(-r*.2+k*r*.1+Math.sin(T*2+k)*r*.06,-r*.66-p*r*.6+b,k%2?r*(.06+p*.08):r*.025,0,7);g.fill()}
  /* ขาหิน */for(const[s,l]of[[-1,la||0],[1,ra||0]])vS(W,[[s*r*.3-r*.14,r*.28],[s*r*.3+r*.14,r*.28],[s*r*.34+r*.16+s*sw*.3,r*.8-l],[s*r*.34-r*.16+s*sw*.3,r*.8-l]],'#3a2e44',1,1);
  /* แขนหลัง */vS(W,[[-r*.5,-r*.2+b],[-r*.78,-r*.0+b-sw*.4],[-r*.82,r*.3+b-sw*.4],[-r*.56,r*.3+b],[-r*.46,r*.04+b]],'#3a2e44',1,1);
  /* ลำตัวหินหลายเหลี่ยม */const BP=[[-r*.6,r*.24+b],[-r*.72,-r*.12+b],[-r*.54,-r*.5+b],[-r*.2,-r*.7+b],[r*.2,-r*.68+b],[r*.56,-r*.48+b],[r*.72,-r*.1+b],[r*.6,r*.26+b],[r*.2,r*.38+b],[-r*.24,r*.38+b]];vS(W,BP,'#4a3a58',1,1.3);
  /* หลุม */if(!W)for(const[x,y,q]of[[-.36,-.36,.1],[.34,-.4,.08],[.4,.08,.07],[-.44,.08,.06],[.0,-.56,.05]]){g.fillStyle='rgba(30,20,40,.55)';g.beginPath();g.ellipse(x*r,y*r+b,q*r,q*r*.7,0,0,7);g.fill();g.strokeStyle='rgba(170,150,190,.4)';g.lineWidth=r*.015;g.beginPath();g.ellipse(x*r,y*r+b+r*.01,q*r,q*r*.7,0,.3,2.8);g.stroke()}
  /* รอยแตกลาวา */vGlow(W,0,-r*.1+b,r*.5,'255,140,60',.4*pu);for(const L of[[[-r*.62,-r*.1],[-r*.3,-r*.18],[-r*.1,-r*.06],[r*.0,r*.06]],[[r*.66,-r*.2],[r*.38,-r*.18],[r*.18,-r*.04]],[[-r*.18,-r*.66],[-r*.12,-r*.42],[r*.04,-r*.3]],[[r*.1,r*.36],[r*.06,r*.18]]])vK(W,L.map(([x,y])=>[x,y+b]),LV,r*.045);
  /* แกนหลอมเหลว */wE(W,r*.02,r*.04+b,r*.14,r*.12,W?'#fff':'#ffb040');vGlow(W,r*.02,r*.04+b,r*.24,'255,200,90',.6*pu);if(!W){g.fillStyle='rgba(255,250,200,.85)';g.beginPath();g.arc(r*.02,r*.04+b,r*.06,0,7);g.fill()}
  /* ตาลาวาเฉียง */for(const s of[-1,1]){vD(W,[[r*.1+s*r*.16-r*.08,-r*.3+b-s*r*.0],[r*.1+s*r*.16+r*.08,-r*.34+b+s*r*.03],[r*.1+s*r*.16+r*.06,-r*.26+b],[r*.1+s*r*.16-r*.07,-r*.25+b]],'#1a0e10');vEye(W,r*.1+s*r*.16,-r*.29+b,r*.05,r*.025,'#ffb040',W?0:7)}
  /* แขนหน้า + หมัดหิน */vS(W,[[r*.5,-r*.2+b],[r*.78,-r*.0+b+sw*.4],[r*.86,r*.28+b+sw*.4],[r*.6,r*.3+b],[r*.46,r*.04+b]],'#56446a',1,1);wE(W,r*.76,r*.3+b+sw*.4,r*.14,r*.12,'#4a3a58');
  /* หินบริวาร */{const a=T*1.6,ox=Math.cos(a)*r*.86,oy=-r*.5+Math.sin(a)*r*.18+b;if(Math.sin(a)<0||!W)vS(W,[[ox-r*.07,oy],[ox-r*.02,oy-r*.07],[ox+r*.07,oy-r*.03],[ox+r*.05,oy+r*.05],[ox-r*.04,oy+r*.06]],'#5a4a6a',1,.6)}
  return true},
/* แมงกะพรุนเนบิวลา: ร่มใหญ่ไล่ม่วง-ชมพู-ฟ้าแบบเนบิวลา มีดาวในตัว ขอบระบาย วงแสงใน แขนปากม้วน หนวดยาวปลายเป็นดาว ประกายตามหลัง */
421:(r,T,W,bob)=>{const b=Math.sin(T*1.8)*r*.12-r*.36,pu=.6+.4*Math.sin(T*2.2),sq=1+Math.sin(T*2.2)*.07;
  vGlow(W,0,b,r*1.2,'210,150,255',.3*pu);
  if(!W){g.lineCap='round';for(let k=0;k<7;k++){const x0=-r*.48+k*r*.16,ex=x0+Math.sin(T*2+k*1.4)*r*.32,ey=r*1.0+b+Math.sin(T*1.6+k)*r*.06;const gr=g.createLinearGradient(0,b,0,ey);gr.addColorStop(0,'rgba(190,170,255,.7)');gr.addColorStop(1,'rgba(140,210,255,.15)');g.strokeStyle=gr;g.lineWidth=r*.03;g.beginPath();g.moveTo(x0,r*.08+b);g.bezierCurveTo(x0+Math.sin(T*2.6+k)*r*.24,r*.4+b,x0-Math.sin(T*2+k)*r*.1,r*.7+b,ex,ey);g.stroke();if(k%2)wStar(W,ex,ey,r*.06,r*.022,'rgba(255,240,200,.9)',T+k,5)}}
  /* แขนปากม้วน */for(const s of[-1,1])vS(W,[[s*r*.06,r*.04+b],['c',s*r*.3,r*.24+b,s*r*.0,r*.46+b,s*r*.2+Math.sin(T*2+s)*r*.06,r*.62+b],['c',s*r*.06,r*.44+b,s*r*.18,r*.22+b,-s*r*.04,r*.06+b]],'rgba(240,170,230,.75)',1,.5);
  g.save();g.translate(0,b);g.scale(sq,2-sq);
  const bp=[[-r*.62,r*.04],['q',-r*.66,-r*.66,0,-r*.68],['q',r*.66,-r*.66,r*.62,r*.04]];for(let k=6;k>=0;k--){const x0=-r*.62+(k+1)*r*.177,x1=-r*.62+k*r*.177;bp.push(['q',(x0+x1)/2,r*.14,x1,r*.04])}
  if(W)vS(W,bp,'#fff',1,1);else{vP(bp);const gr=g.createRadialGradient(-r*.2,-r*.4,r*.05,0,-r*.2,r*.8);gr.addColorStop(0,'rgba(255,200,240,.95)');gr.addColorStop(.45,'rgba(180,110,240,.85)');gr.addColorStop(1,'rgba(90,120,230,.8)');g.fillStyle=gr;g.fill();g.lineWidth=1;g.strokeStyle=V1.O;g.stroke();
    g.save();g.clip();g.globalCompositeOperation='lighter';for(const[x,y,q,c]of[[-.24,-.3,.22,'255,150,220'],[.22,-.18,.26,'120,180,255'],[.0,-.48,.18,'200,160,255']]){glowAt(x*r,y*r,q*r,c,.35)}g.restore();
    for(const[x,y,k]of[[-.3,-.22,0],[.1,-.42,1],[.3,-.1,2],[-.06,-.12,3],[.22,-.32,4],[-.18,-.46,5]])wStar(W,x*r,y*r,r*.045*(.6+.4*Math.abs(Math.sin(T*2.4+k))),r*.016,'rgba(255,255,255,.95)',0,4);
    g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-r*.28,-r*.42,r*.14,r*.06,-.5,0,7);g.fill();
    g.strokeStyle='rgba(255,220,250,'+(.5+.3*pu)+')';g.lineWidth=r*.025;g.beginPath();g.ellipse(0,-r*.06,r*.4,r*.08,0,0,Math.PI);g.stroke()}
  g.restore();return true},
/* หุ่นเย็บดาว: หุ่นทองเหลืองผอมสูง หัวกลมเลนส์ตาเดียวฟ้ามีวงปรับโฟกัส เสาอากาศปลายดาว อกเป็นหลอดด้ายเงินหมุน แขนเป็นเข็มยาว ลากด้ายเงินเป็นวง ขาข้อต่อ */
422:(r,T,W,bob,sw0,la,ra)=>{const b=Math.sin(T*3)*r*.03,sw=Math.sin(T*5)*r*.08,st=Math.sin(T*4)*.35;
  const BR='#c89a4a',BD='#8a6a32',BL='#e8c070';
  /* ด้ายเงินเป็นวงตามเข็ม */if(!W){g.strokeStyle='rgba(225,232,255,.8)';g.lineWidth=r*.018;g.beginPath();g.moveTo(r*.56,-r*.62+b+st*r*.3);g.bezierCurveTo(r*.9,-r*.2,r*.2,r*.3+Math.sin(T*2)*r*.1,-r*.4,r*.1+b);g.bezierCurveTo(-r*.7,r*.0,-r*.5,-r*.4,-r*.2,-r*.2+b);g.stroke();
    for(let k=0;k<3;k++){const p=(T*.6+k/3)%1;wStar(W,r*.56-p*r*.9,-r*.5+p*r*.6+b,r*.04,r*.014,'rgba(255,255,255,'+(1-p)+')',p*4,4)}}
  /* ขา */for(const[s,l]of[[-1,la||0],[1,ra||0]]){vLimb(W,[s*r*.12,r*.18+b,s*r*.18+s*sw*.4,r*.48,s*r*.14,r*.8-l],BD,r*.07,r*.06);wE(W,s*r*.18+s*sw*.4,r*.48,r*.05,r*.05,BL);vS(W,[[s*r*.14-r*.1,r*.78-l],[s*r*.14+r*.1,r*.78-l],[s*r*.14+r*.12,r*.84-l],[s*r*.14-r*.1,r*.84-l]],BD,1,.6)}
  /* แขนเข็มหลัง */g.save();g.translate(-r*.24,-r*.34+b);g.rotate(-.7-st*.4);vS(W,[[-r*.03,0],[r*.03,0],[r*.02,r*.5],[0,r*.66],[-r*.02,r*.5]],'#d8dce8',1,.7);g.restore();
  /* ลำตัว */vS(W,[[-r*.24,-r*.38+b],[r*.24,-r*.38+b],[r*.2,r*.04+b],[r*.12,r*.2+b],[-r*.12,r*.2+b],[-r*.2,r*.04+b]],BR,1,1.2);
  for(const y of[-.3,.1])vS(W,[[-r*.22,y*r+b],[r*.22,y*r+b],[r*.21,y*r+r*.05+b],[-r*.21,y*r+r*.05+b]],BL,1,.5);
  /* หลอดด้ายหมุนกลางอก */{const cy=-r*.12+b;wE(W,0,cy,r*.13,r*.11,'#5a4422');wE(W,0,cy,r*.09,r*.08,'#e8ecf8');if(!W){g.strokeStyle='rgba(150,160,190,.8)';g.lineWidth=r*.012;for(let k=0;k<4;k++){const a=T*4+k*1.57;g.beginPath();g.moveTo(Math.cos(a)*r*.02,cy+Math.sin(a)*r*.02);g.lineTo(Math.cos(a)*r*.08,cy+Math.sin(a)*r*.07);g.stroke()}}}
  /* หัวกลม + เลนส์ */const hx=r*.02,hy=-r*.6+b;vS(W,[[hx-r*.04,-r*.38+b],[hx+r*.04,-r*.38+b],[hx+r*.04,hy+r*.1],[hx-r*.04,hy+r*.1]],BD,1,.6);wE(W,hx,hy,r*.2,r*.19,BR);
  wE(W,hx+r*.04,hy,r*.13,r*.13,'#3a2a14');vGlow(W,hx+r*.04,hy,r*.22,'120,220,255',.5);wE(W,hx+r*.04,hy,r*.09,r*.09,W?'#fff':'#7ad8ff');if(!W){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=r*.012;g.beginPath();g.arc(hx+r*.04,hy,r*.11,T*2,T*2+2);g.stroke();g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.arc(hx+r*.01,hy-r*.03,r*.025,0,7);g.fill()}
  for(let k=0;k<6;k++){const a=k/6*6.283+T*.5;vD(W,[[hx+Math.cos(a)*r*.2,hy+Math.sin(a)*r*.19],[hx+Math.cos(a)*r*.24,hy+Math.sin(a)*r*.23],[hx+Math.cos(a+.2)*r*.2,hy+Math.sin(a+.2)*r*.19]],BL)}
  /* เสาอากาศดาว */vK(W,[[hx-r*.06,hy-r*.18],['q',hx-r*.1,hy-r*.32,hx-r*.04,hy-r*.38]],BD,r*.025);vGlow(W,hx-r*.04,hy-r*.4,r*.12,'255,230,140',.5);wStar(W,hx-r*.04,hy-r*.4,r*.06,r*.024,'#ffe48a',T,5);
  /* แขนเข็มหน้า */g.save();g.translate(r*.24,-r*.32+b);g.rotate(-1.9+st);vS(W,[[-r*.035,0],[r*.035,0],[r*.025,r*.5],[0,r*.7],[-r*.025,r*.5]],'#eef0f8',1,.7);if(!W){g.fillStyle='#3a2a14';g.beginPath();g.ellipse(0,r*.12,r*.012,r*.03,0,0,7);g.fill()}wE(W,0,0,r*.05,r*.05,BL);g.restore();
  return true},
/* ผีดาวดับ: ร่างผ้าคลุมเทาม่วงเย็นมีฮู้ด ใต้ฮู้ดมืดมีตาซีดสองดวง หลุมดาวดับกลางอก (ขอบแสงหรี่ รังสีหัก) มือยาวกรงเล็บ ปลายร่างสลายเป็นควัน เถ้าดาวปลิว */
432:(r,T,W,bob)=>{const b=Math.sin(T*1.6)*r*.1-r*.18,pu=.4+.3*Math.sin(T*2),CL='rgba(118,126,160,.88)',CD='rgba(80,86,120,.9)';
  vGlow(W,0,-r*.2+b,r*1.1,'150,160,220',.16);
  /* เถ้าดาวปลิว */if(!W)for(let k=0;k<6;k++){const p=(T*.35+k/6)%1;g.fillStyle='rgba(200,205,230,'+(.6*(1-p))+')';g.save();g.translate(Math.sin(k*2.1)*r*.5+p*r*.3,r*.5-p*r*1.2+b);g.rotate(p*4);g.fillRect(-r*.02,-r*.01,r*.04,r*.02);g.restore()}
  /* ปลายร่างควัน */for(let k=0;k<3;k++){const ox=(k-1)*r*.18,wv=Math.sin(T*2.4+k*1.9)*r*.1;vS(W,[[ox-r*.18,r*.1+b],['q',ox-r*.2,r*.5+b,ox+wv,r*.84+b],['q',ox+r*.14,r*.5+b,ox+r*.18,r*.1+b]],k===1?CL:CD,1,.7)}
  /* แขนหลัง */vLimb(W,[-r*.3,-r*.36+b,-r*.58,-r*.1+b+Math.sin(T*1.8)*r*.06,-r*.62,r*.2+b],CD,r*.12,r*.07);for(let k=0;k<3;k++)vK(W,[[-r*.62,r*.2+b],[-r*.66+k*r*.04,r*.32+b]],W?'#fff':'#c8cce0',r*.02);
  /* ผ้าคลุมลำตัว */vS(W,[[-r*.36,-r*.42+b],['q',-r*.44,-r*.0+b,-r*.36,r*.2+b],[-r*.2,r*.14+b],[-r*.06,r*.24+b],[r*.08,r*.14+b],[r*.22,r*.24+b],[r*.36,r*.16+b],['q',r*.44,-r*.0+b,r*.36,-r*.42+b]],CL,1,1);
  if(!W){g.strokeStyle='rgba(60,64,96,.5)';g.lineWidth=r*.02;for(const x of[-.18,.0,.18]){g.beginPath();g.moveTo(x*r,-r*.3+b);g.quadraticCurveTo(x*r*1.2,-r*.0+b,x*r*1.1,r*.16+b);g.stroke()}}
  /* หลุมดาวดับกลางอก */{const cx=r*.0,cy=-r*.16+b;if(!W){g.save();g.translate(cx,cy);g.rotate(T*.3);g.strokeStyle='rgba(200,190,255,'+(.25+.25*pu)+')';g.lineWidth=r*.02;for(let k=0;k<6;k++){const a=k*1.047,L=r*(.2+(k%2)*.08);g.beginPath();g.moveTo(Math.cos(a)*r*.12,Math.sin(a)*r*.12);g.lineTo(Math.cos(a)*L*.7,Math.sin(a)*L*.7);g.lineTo(Math.cos(a+.15)*L,Math.sin(a+.15)*L);g.stroke()}g.restore()}
    wE(W,cx,cy,r*.12,r*.12,'#14121e');vGlow(W,cx,cy,r*.2,'170,150,255',.3*pu);if(!W){g.strokeStyle='rgba(210,200,255,'+(.4+.4*pu)+')';g.lineWidth=r*.018;g.beginPath();g.arc(cx,cy,r*.12,0,7);g.stroke()}}
  /* ฮู้ด + หน้าเงามืด */const hx=r*.04,hy=-r*.56+b;vS(W,[[hx-r*.28,hy+r*.18],['q',hx-r*.32,hy-r*.2,hx-r*.04,hy-r*.3],['q',hx+r*.2,hy-r*.3,hx+r*.3,hy-r*.08],['q',hx+r*.34,hy+r*.14,hx+r*.22,hy+r*.2]],CL,1,1);
  vD(W,[[hx-r*.18,hy+r*.14],['q',hx-r*.18,hy-r*.12,hx+r*.04,hy-r*.14],['q',hx+r*.22,hy-r*.1,hx+r*.2,hy+r*.12],['q',hx,hy+r*.2,hx-r*.18,hy+r*.14]],'#0e0c18');
  for(const s of[-1,1]){vGlow(W,hx+s*r*.07+r*.02,hy,r*.08,'220,225,255',.5);vEye(W,hx+s*r*.07+r*.02,hy,r*.03,r*.04,'#e8ecff',W?0:5)}
  /* แขนหน้ายื่นกรงเล็บ */const rx2=r*.62,ry2=-r*.2+b+Math.sin(T*2.2)*r*.06;vLimb(W,[r*.3,-r*.36+b,r*.5,-r*.32+b,rx2,ry2],CL,r*.12,r*.07);for(let k=0;k<4;k++)vK(W,[[rx2,ry2],['q',rx2+r*.08,ry2-r*.04+k*r*.04,rx2+r*.14,ry2+k*r*.05]],W?'#fff':'#d8dcf0',r*.022);
  return true},
/* ฝูงดาวเคราะห์น้อย: แกนเรืองร้อนเหมือนดวงอาทิตย์จิ๋วมีตาเดียว วงฝุ่นรอบแกน หินมีหลุมไฮไลต์ 6 ก้อนโคจร (หน้า/หลัง) ประกาย */
441:(r,T,W,bob)=>{const b=-r*.26+Math.sin(T*1.5)*r*.06,pu=.6+.4*Math.sin(T*2.6),R0=[];
  for(let k=0;k<6;k++){const a=T*(1.0+k*.12)+k*1.05,rx=r*(.5+k*.05),ry=r*(.2+k*.025);R0.push([Math.cos(a)*rx,Math.sin(a)*ry+b,r*(.15+(k%3)*.05),k,Math.sin(a)])}
  const rock=([x,y,s,k])=>{const R=gxRng(4410+k),P=[];for(let q=0;q<7;q++){const a=q/7*6.283+T*(k%2?.8:-.6),rr=s*(.75+R()*.35);P.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr*.85])}vS(W,P,k%2?'#7a6a88':'#8a7a6a',1,.7);
    if(!W){g.fillStyle='rgba(40,30,50,.45)';g.beginPath();g.ellipse(x+s*.2,y+s*.1,s*.28,s*.2,0,0,7);g.fill();g.fillStyle='rgba(255,230,200,.5)';g.beginPath();g.ellipse(x-s*.3,y-s*.3,s*.25,s*.14,-.5,0,7);g.fill()}};
  /* วงฝุ่น (ครึ่งหลัง) */if(!W)wRing(W,0,b,r*.62,r*.22,'rgba(255,210,160,.25)',r*.05,0);
  R0.filter(q=>q[4]<0).forEach(rock);
  /* แกนเรือง */vGlow(W,0,b,r*.8,'255,180,90',.6*pu);if(!W){g.save();g.translate(0,b);g.rotate(T*.6);g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,200,120,.35)';for(let k=0;k<8;k++){g.rotate(.785);g.beginPath();g.moveTo(-r*.04,-r*.16);g.lineTo(0,-r*(.3+.06*Math.sin(T*4+k)));g.lineTo(r*.04,-r*.16);g.fill()}g.restore()}
  wE(W,0,b,r*.19,r*.19,W?'#fff':'#ffd070');if(!W){const gr=g.createRadialGradient(-r*.05,b-r*.05,0,0,b,r*.19);gr.addColorStop(0,'rgba(255,255,220,.95)');gr.addColorStop(1,'rgba(255,160,60,0)');g.fillStyle=gr;g.beginPath();g.arc(0,b,r*.19,0,7);g.fill()}
  vD(W,[[-r*.08,b],['q',0,b-r*.07,r*.08,b],['q',0,b+r*.07,-r*.08,b]],'#5a2a10');vEye(W,0,b,r*.035,r*.04,'#fff0a0',W?0:4);
  /* วงฝุ่น (ครึ่งหน้า) */if(!W)wRing(W,0,b,r*.62,r*.22,'rgba(255,220,170,.35)',r*.04,1);
  R0.filter(q=>q[4]>=0).forEach(rock);
  if(!W)for(let k=0;k<4;k++){const a=T*2+k*1.57;wStar(W,Math.cos(a)*r*.8,b+Math.sin(a)*r*.3,r*.035*(.5+.5*Math.abs(Math.sin(T*3+k))),r*.012,'rgba(255,240,210,.9)',0,4)}
  return true}};
MV9.s0={};for(const k of[390,391,400,401,402,420,421,422,432,441])MV9.s0[k]=MV1S[k]||1;
Object.assign(MV1S,{390:1.75,391:1.5,400:1.45,401:1.5,402:1.4,420:1.5,421:1.6,422:1.6,432:1.65,441:2.15});
/* ติดตั้ง: ห่อ MV1D เดิม (เก็บไว้เป็นตัวสำรอง) · คงเงื่อนไขซ่อนตัวในดัน */
function mv9Install(){let n=0;for(const k in MV9D){const kk=+k;if(MV1D[kk]&&MV1D[kk].mv9)continue;const old=MV1D[kk];MV9.old[kk]=old;
    const F=function(r,T,W,bob,sw,la,ra){if(typeof MON_CUR!=='undefined'&&MON_CUR&&((kk===432&&MON_CUR.hg)||(kk===442&&MON_CUR.mr)))return true;
      if(MV9.on){try{const ok=MV9D[kk](r,T,W,bob,sw,la,ra);MV9.n++;if(ok!==false)return ok}catch(e){MV9.err=kk+' '+String(e&&e.stack||e).slice(0,240)}}
      return old?old.apply(this,arguments):false};F.mv9=1;MV1D[kk]=F;n++}return n}
{let k=0;const iv=setInterval(()=>{k++;if(MV1D[441]&&MV1D[432]&&MV1D[402]&&MV1D[391]){mv9Install();clearInterval(iv)}else if(k>200)clearInterval(iv)},200)}
