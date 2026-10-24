/* ---------- v508 วาดมอนใหม่รายตัว ชุด 2: แมพ 10–18 (27 ตัว) ----------
   ใช้เครื่องมือชุดเดียวกับ v501 (vS/vD/vK/vLimb/vEye/vGlow/vFang) · หันขวา · เท้าที่ y≈r*.88 · ตัวบิน (t1) ลอยรอบ y≈-r*.25 */
/* ดาว n แฉก */
/* ขยายให้ขนาดใกล้ภาพเดิม (วัดพื้นที่+ความสูงเทียบกัน) */
Object.assign(MV1S,{100:1.15,101:1.3,102:1.12,110:1.3,111:1.3,112:1.05,120:1.1,121:1.4,122:1.1,130:1.12,131:1.12,132:1.12,140:1.12,141:1.3,142:1.06,150:1.22,151:1.25,152:1.05,160:1.08,161:1.0,162:1.05,170:1.15,171:1.06,172:1.08,180:1.1,181:1.12,182:1.05});
function wStar(W,x,y,R,ri,c,a0,n){n=n||5;a0=a0===undefined?-Math.PI/2:a0;g.beginPath();for(let i=0;i<n*2;i++){const a=a0+i*Math.PI/n,q=i%2?ri:R;g.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}g.closePath();g.fillStyle=W?'#fff':c;g.fill()}
/* วงแหวนครึ่งหน้า/หลัง (front=1 ครึ่งล่าง ใกล้ตา) */
function wRing(W,x,y,rx,ry,c,lw,front){g.beginPath();g.ellipse(x,y,rx,ry,0,front?0:Math.PI,front?Math.PI:Math.PI*2);g.strokeStyle=W?'#fff':c;g.lineWidth=lw;g.stroke()}
/* สายฟ้าหยัก: จากจุดถึงจุด n ช่วง สุ่มตามเวลา */
function wBolt(W,x1,y1,x2,y2,n,amp,T,sd,c,w){const P=[[x1,y1]],dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,tq=Math.floor(T*14);
  for(let i=1;i<n;i++){const k=i/n,o=Math.sin(tq*12.9898+sd*78.233+i*37.719)*43758.5453;const j=((o-Math.floor(o))-.5)*2*amp;P.push([x1+dx*k+nx*j,y1+dy*k+ny*j])}P.push([x2,y2]);
  if(!W&&!LOWQ){vK(W,P,'rgba(140,220,255,.35)',w*3)}vK(W,P,c||'#eaffff',w)}
/* ขนนก: ก้านจาก (x,y) มุม a ยาว L กว้าง w */
function wFeather(W,x,y,a,L,w,c,cs){const ca=Math.cos(a),sa=Math.sin(a),px=-sa,py=ca,ex=x+ca*L,ey=y+sa*L;
  vS(W,[[x+px*w*.3,y+py*w*.3],['q',x+ca*L*.5+px*w,y+sa*L*.5+py*w,ex,ey],['q',x+ca*L*.5-px*w,y+sa*L*.5-py*w,x-px*w*.3,y-py*w*.3]],c,1,.6);if(cs)vK(W,[[x,y],[x+ca*L*.85,y+sa*L*.85]],cs,Math.max(.3,w*.14))}

/* ================= 10: ทุ่งรอยแยกนภา ================= */
MV1D[100]=(r,T,W)=>{/* ภูตผลึกนภา: ร่างผลึกเจียระไน ตาแกนทอง วงรัศมีผลึก มือผลึกลอย หางแสงดาว */const by=-r*.12+Math.sin(T*2.2)*r*.08,sp=T*1.6;
  vGlow(W,0,by-r*.2,r*1.5,'150,205,255',.2);
  /* หางแสง */for(let i=-1;i<=1;i++){const w=Math.sin(T*3+i*2)*r*.12;vD(W,[[i*r*.12-r*.1,by+r*.3],['q',i*r*.2+w,by+r*.62,i*r*.1+w*1.6,by+r*.95],['q',i*r*.12+r*.04+w,by+r*.6,i*r*.12+r*.1,by+r*.3]],W?'#fff':'rgba(170,215,255,.55)')}
  const shard=(a,front)=>{const x=Math.cos(a)*r*.95,y=by-r*.1+Math.sin(a)*r*.3,s=front?1:.8;if((Math.sin(a)>0)!==front)return;vS(W,[[x,y-r*.16*s],[x+r*.07*s,y],[x,y+r*.16*s],[x-r*.07*s,y]],front?'#bfe4ff':'#7aa6dc',1,.6)};
  for(let i=0;i<3;i++)shard(sp+i*2.094,false);
  /* มือผลึก */for(const s of[-1,1]){const x=s*r*.66,y=by-r*.02+Math.sin(T*2.6+s)*r*.07;vS(W,[[x,y-r*.24],[x+s*r*.12,y-r*.04],[x+s*r*.04,y+r*.2],[x-s*r*.08,y+r*.02]],s>0?'#d4ecff':'#86b0e4',1,.7);vD(W,[[x,y-r*.24],[x+s*r*.12,y-r*.04],[x+s*r*.01,y-r*.02]],W?'#fff':'rgba(255,255,255,.55)')}
  /* ลำตัวเจียระไน */const P={t:[0,by-r*.98],ls:[-r*.44,by-r*.46],lw:[-r*.36,by+r*.06],b:[0,by+r*.56],rw:[r*.36,by+r*.06],rs:[r*.44,by-r*.46],c:[r*.04,by-r*.22]};
  vS(W,[P.t,P.rs,P.rw,P.b,P.lw,P.ls],'#8fc0f0');
  for(const[a,b,c]of[['t','ls','#cfe9ff'],['ls','lw','#6c9cdc'],['lw','b','#4a74b6'],['t','rs','#eef8ff'],['rs','rw','#a4d0f8'],['rw','b','#78a8e4']])vD(W,[P[a],P[b],P.c],c);
  vK(W,[P.t,P.rs,P.rw,P.b,P.lw,P.ls,P.t],V1.O,1);vK(W,[P.t,P.c,P.b],'rgba(255,255,255,.5)',r*.03);
  /* ตาแกนทอง */const bl=(T*.7)%3<.12?.2:1;vGlow(W,P.c[0],P.c[1],r*.5,'255,235,150',.4);vS(W,[[P.c[0]-r*.22,P.c[1]],['q',P.c[0],P.c[1]-r*.2*bl,P.c[0]+r*.22,P.c[1]],['q',P.c[0],P.c[1]+r*.2*bl,P.c[0]-r*.22,P.c[1]]],'#fff4b8',1,.7);
  if(bl>.5){vEye(W,P.c[0]+r*.03,P.c[1],r*.1,r*.1,'#ff7ae0',6);vD(W,[[P.c[0]+r*.01,P.c[1]-r*.08],['q',P.c[0]+r*.06,P.c[1],P.c[0]+r*.01,P.c[1]+r*.08],['q',P.c[0],P.c[1],P.c[0]+r*.01,P.c[1]-r*.08]],'#2a1240')}
  /* วงรัศมีผลึก */const hy=by-r*1.18;wRing(W,0,hy,r*.34,r*.09,'#ffe38a',r*.06,false);for(let i=0;i<3;i++){const a=sp*1.4+i*2.094,x=Math.cos(a)*r*.34,y=hy+Math.sin(a)*r*.09;vS(W,[[x,y-r*.12],[x+r*.05,y],[x,y+r*.07],[x-r*.05,y]],'#fff1b0',1,.5)}wRing(W,0,hy,r*.34,r*.09,'#ffe38a',r*.06,true);
  for(let i=0;i<3;i++)shard(sp+i*2.094,true);
  return true};
MV1D[101]=(r,T,W)=>{/* หมาป่ารอยแยก: ร่างความมืดลายดาว รอยแยกเรืองม่วง แผงคอเปลว ห้อกลางอากาศ */const by=-r*.22+Math.sin(T*3)*r*.06,ph=T*9;
  const BD='#2a2442',BL='#3e365e',FAR='#1a1630',RF='#d79bff';
  /* หางรอยแยก */const tw=Math.sin(T*5)*r*.12;vD(W,[[-r*.62,by-r*.18],['q',-r*1.0,by-r*.42+tw,-r*1.5,by-r*.3+tw*1.5],['q',-r*1.25,by-r*.14+tw,-r*1.56,by+r*.02+tw*1.2],['q',-r*1.1,by-r*.02,-r*.6,by-r*.02]],W?'#fff':'#4a2a8a');
  vD(W,[[-r*.66,by-r*.13],['q',-r*1.0,by-r*.3+tw,-r*1.36,by-r*.24+tw*1.4],['q',-r*1.0,by-r*.12+tw,-r*.66,by-r*.06]],W?'#fff':'#e4b8ff');vGlow(W,-r*1.0,by-r*.2,r*.6,'200,140,255',.3);
  const leg=(x,y,a,c,w)=>{const k=Math.sin(a),k2=Math.sin(a-.9);const kx=x+k*r*.28,ky=y+r*.26,px=kx+k2*r*.3,py=ky+r*.24;vLimb(W,[x,y,kx,ky,px,py],c,w,w*.55);vS(W,[[px-r*.08,py-r*.03],['q',px+r*.12,py-r*.06,px+r*.14,py+r*.03],[px-r*.06,py+r*.05]],c,1,.6);
    if(!W&&!LOWQ){g.fillStyle='rgba(190,140,255,.35)';g.beginPath();g.arc(px-r*.1,py+r*.06,r*.07,0,7);g.fill()}};
  leg(r*.34,by+r*.02,Math.sin(ph+.6)*.9,FAR,r*.17);leg(-r*.46,by+r*.06,Math.sin(ph+Math.PI+.6)*.9,FAR,r*.2);
  /* ลำตัว */vS(W,[[-r*.72,by-r*.22],['c',-r*.4,by-r*.46,r*.12,by-r*.46,r*.38,by-r*.4],['q',r*.66,by-r*.3,r*.6,by-r*.02],['q',r*.52,by+r*.24,r*.3,by+r*.2],['q',0,by+r*.06,-r*.3,by+r*.16],['q',-r*.66,by+r*.24,-r*.74,by+r*.02],['q',-r*.82,by-r*.1,-r*.72,by-r*.22]],BD);
  vD(W,[[-r*.2,by+r*.1],['q',r*.1,by+r*.02,r*.32,by+r*.18],['q',r*.08,by+r*.12,-r*.2,by+r*.14]],BL);
  /* ลายดาว */if(!W)for(const[x,y,k]of[[-.5,-.12,0],[-.3,-.26,1],[-.05,-.18,2],[.18,-.3,3],[-.58,.06,4],[.05,-.02,5]]){const a=.45+.55*Math.abs(Math.sin(T*2+k*1.7));g.fillStyle='rgba(235,225,255,'+a+')';g.beginPath();g.arc(x*r,by+y*r,r*.035,0,7);g.fill()}
  /* รอยแยกเรือง */vGlow(W,-r*.15,by-r*.12,r*.55,'200,140,255',.25);vK(W,[[-r*.58,by-r*.08],[-r*.4,by-r*.2],[-r*.3,by-r*.06],[-r*.12,by-r*.22],[r*.02,by-r*.08],[r*.2,by-r*.2]],RF,r*.06);vK(W,[[-r*.3,by-r*.06],[-r*.24,by+r*.08]],RF,r*.04);
  /* แผงคอเปลว */for(let i=0;i<6;i++){const x=r*(.02+i*.1),y=by-r*(.36+Math.sin(i*.9)*.04),h=r*(.3+(i%2)*.12)+Math.sin(T*10+i)*r*.05;vD(W,[[x-r*.07,y+r*.04],['q',x-r*.12,y-h*.6,x-r*.22,y-h],['q',x,y-h*.5,x+r*.08,y+r*.04]],i%2?'#7a3ad8':'#a866f0')}
  leg(r*.4,by+r*.04,Math.sin(ph)*.9,'#3a3258',r*.19);leg(-r*.4,by+r*.08,Math.sin(ph+Math.PI)*.9,'#3a3258',r*.22);
  /* หัว */const hx=r*.72,hy=by-r*.3;vS(W,[[hx-r*.26,hy+r*.16],['q',hx-r*.28,hy-r*.2,hx,hy-r*.22],['q',hx+r*.24,hy-r*.2,hx+r*.5,hy-r*.04],['q',hx+r*.56,hy+r*.04,hx+r*.48,hy+r*.08],['q',hx+r*.2,hy+r*.12,hx+r*.02,hy+r*.26],['q',hx-r*.16,hy+r*.28,hx-r*.26,hy+r*.16]],BD);
  vS(W,[[hx+r*.04,hy+r*.14],['q',hx+r*.26,hy+r*.12,hx+r*.42,hy+r*.12],['q',hx+r*.24,hy+r*.26,hx+r*.06,hy+r*.24]],'#1a1428',1,.6);vFang(W,hx+r*.32,hy+r*.1,r*.06,r*.07);vFang(W,hx+r*.18,hy+r*.12,r*.05,r*.06);
  vS(W,[[hx-r*.14,hy-r*.12],[hx-r*.26,hy-r*.5],[hx+r*.04,hy-r*.18]],BD,1,.7);vD(W,[[hx-r*.12,hy-r*.16],[hx-r*.2,hy-r*.4],[hx-r*.02,hy-r*.18]],'#7a3ad8');
  vD(W,[[hx+r*.48,hy-r*.06],['q',hx+r*.56,hy-r*.02,hx+r*.5,hy+r*.03]],'#0c0814');vEye(W,hx+r*.14,hy-r*.08,r*.08,r*.045,'#7af0ff',7);vGlow(W,hx+r*.14,hy-r*.08,r*.3,'120,240,255',.3);
  return true};
MV1D[102]=(r,T,W,bob,sw,la,ra)=>{/* อัศวินดาวตก: เกราะเงินขอบทอง ปีกขาดข้างเดียว รัศมีแตก ดาบดาวเรือง */const b=bob*.6,fl=Math.sin(T*2.4)*r*.04;
  const AR='#b8c0d2',AD='#7d869c',GD='#e8c45a',CP='#2c3050';
  /* ปีกขาด */for(let i=0;i<5;i++){const a=-2.25-i*.2+fl*.02,L=r*(.62-i*.04)*(i===2?.7:1);wFeather(W,-r*.2,-r*.5+b+i*r*.04,a,L,r*.1,i%2?'#d8dce8':'#eef0f6','#9aa0b4')}
  /* ผ้าคลุม */vS(W,[[-r*.3,-r*.52+b],['q',-r*.62,-r*.1+b,-r*.66+fl,r*.56],[-r*.5,r*.46],[-r*.42,r*.66],[-r*.3,r*.5],[-r*.16,r*.6],['q',-r*.12,0,-r*.06,-r*.5+b]],CP);
  /* ขา */for(const[s,l,c]of[[-1,la,AD],[1,ra,AR]]){const x=s*r*.16;vLimb(W,[x,r*.18+b,x+s*r*.03,r*.52,x,r*.82-l],c,r*.2,r*.17);vS(W,[[x-r*.11,r*.78-l],[x+r*.17,r*.8-l],[x+r*.16,r*.9-l],[x-r*.11,r*.9-l]],AD,1,.7);vS(W,[[x-r*.07,r*.44],['q',x,r*.38,x+r*.07,r*.44],['q',x,r*.52,x-r*.07,r*.44]],GD,1,.5)}
  /* แขนหลัง (โล่ดาวเล็ก) */vLimb(W,[-r*.26,-r*.4+b,-r*.36,-r*.08+b,-r*.3,r*.14+b],AD,r*.15,r*.12);
  /* ลำตัว */vS(W,[[-r*.3,-r*.5+b],['q',0,-r*.6+b,r*.3,-r*.5+b],['q',r*.34,-r*.1+b,r*.24,r*.12+b],[r*.26,r*.34+b],[-r*.26,r*.34+b],[-r*.24,r*.12+b],['q',-r*.34,-r*.1+b,-r*.3,-r*.5+b]],AR);
  for(let i=0;i<3;i++)vS(W,[[-r*.26+i*r*.18,r*.12+b],[-r*.08+i*r*.18,r*.12+b],[-r*.1+i*r*.18,r*.38+b],[-r*.24+i*r*.18,r*.36+b]],AD,1,.5);
  vK(W,[[-r*.26,r*.12+b],[r*.24,r*.12+b]],GD,r*.05);vK(W,[[-r*.22,-r*.46+b],['q',0,-r*.36+b,r*.22,-r*.46+b]],GD,r*.04);
  vGlow(W,0,-r*.18+b,r*.4,'255,230,140',.3);wStar(W,0,-r*.18+b,r*.14,r*.06,'#ffe88a');
  /* หมวกเกราะ */const hy=-r*.72+b;vS(W,[[-r*.2,hy+r*.2],['q',-r*.24,hy-r*.18,0,hy-r*.24],['q',r*.24,hy-r*.18,r*.22,hy+r*.2],['q',0,hy+r*.28,-r*.2,hy+r*.2]],AR);
  vK(W,[[0,hy-r*.24],[0,hy+r*.24]],GD,r*.04);vD(W,[[-r*.15,hy-r*.02],[r*.18,hy-r*.02],[r*.18,hy+r*.05],[-r*.15,hy+r*.05]],'#141826');vD(W,[[r*.04,hy-r*.02],[r*.1,hy-r*.02],[r*.1,hy+r*.16],[r*.04,hy+r*.16]],'#141826');
  vGlow(W,r*.06,hy+r*.02,r*.3,'150,210,255',.35);vK(W,[[-r*.1,hy+r*.015],[r*.16,hy+r*.015]],W?'#fff':'#9ad8ff',r*.035);
  for(const s of[-1,1])wFeather(W,s*r*.2,hy-r*.04,s>0?-.6:-2.54,r*.24,r*.06,'#f2f4fa','#b0b6c8');
  /* รัศมีแตก */const ry=-r*1.12+b+Math.sin(T*1.8)*r*.03;vGlow(W,0,ry,r*.45,'255,225,130',.3);g.beginPath();g.ellipse(0,ry,r*.3,r*.08,-.12,.5,5.6);g.strokeStyle=W?'#fff':'#ffd970';g.lineWidth=r*.06;g.stroke();
  vS(W,[[r*.3,ry+r*.02],[r*.38,ry-r*.06+Math.sin(T*3)*r*.02],[r*.36,ry+r*.04]],'#ffd970',1,.4);
  /* บ่า */for(const[s,c]of[[-1,AD],[1,AR]]){vS(W,[[s*r*.12,-r*.54+b],['q',s*r*.44,-r*.66+b,s*r*.48,-r*.36+b],['q',s*r*.3,-r*.3+b,s*r*.12,-r*.38+b]],c);vK(W,[[s*r*.16,-r*.56+b],['q',s*r*.44,-r*.64+b,s*r*.46,-r*.38+b]],GD,r*.035)}
  /* แขนหน้า + ดาบดาว */const ax=r*.36,ay=-r*.42+b,hx=r*.5,hy2=-r*.02+b+sw*.6;vLimb(W,[ax,ay,r*.48,-r*.2+b,hx,hy2],AR,r*.16,r*.13);
  const bl=-1.15+sw*.08,ca=Math.cos(bl),sa=Math.sin(bl),L=r*1.1;g.save();g.translate(hx,hy2);
  vGlow(W,ca*L*.6,sa*L*.6,r*.5,'255,235,160',.3);vS(W,[[-sa*r*.06,ca*r*.06],[ca*L-sa*r*.02,sa*L+ca*r*.02],[ca*(L+r*.12),sa*(L+r*.12)],[ca*L+sa*r*.02,sa*L-ca*r*.02],[sa*r*.06,-ca*r*.06]],'#f4f2e0',1,.7);
  vK(W,[[0,0],[ca*L*.9,sa*L*.9]],W?'#fff':'rgba(255,220,120,.8)',r*.03);vK(W,[[-sa*r*.2,ca*r*.2],[sa*r*.2,-ca*r*.2]],GD,r*.08);vK(W,[[0,0],[-ca*r*.2,-sa*r*.2]],'#5a3a24',r*.07);
  wStar(W,ca*L*.55,sa*L*.55,r*.09+Math.sin(T*6)*r*.02,r*.035,'#fffbe0',T*2,4);g.restore();
  vS(W,[[hx-r*.08,hy2-r*.06],[hx+r*.08,hy2-r*.06],[hx+r*.08,hy2+r*.07],[hx-r*.08,hy2+r*.07]],AD,1,.6);
  return true};

/* ================= 11: ดินแดนหลังรอยแยก ================= */
MV1D[110]=(r,T,W,bob,sw,la,ra)=>{/* ลูกกลืนดาว: ตัวอ้วนเปลือกม่วง ท้องใสเห็นดาวที่กลืน ปากกว้าง ล่อดาวบนหัว */const b=bob*.8,ch=Math.max(0,Math.sin(T*3.2))*r*.14,cy=r*.18+b;
  const SH='#3c2660',SD='#271840',SP='#8a5ad0';
  /* ขาหนวด */for(let i=0;i<4;i++){const x=-r*.4+i*r*.26,w=Math.sin(T*6+i*1.4)*r*.08,l=(i%2?la:ra)*.6;vLimb(W,[x,cy+r*.3,x+w,cy+r*.5,x+w*1.6+r*.04,r*.88-l],i%2?SD:'#33204e',r*.16,r*.07);if(!W){g.fillStyle='rgba(255,200,120,.75)';g.beginPath();g.arc(x+w*1.6+r*.04,r*.88-l,r*.035,0,7);g.fill()}}
  /* เปลือก */vS(W,[[-r*.66,cy],['c',-r*.7,cy-r*.62,r*.2,cy-r*.78,r*.54,cy-r*.36],['q',r*.72,cy-r*.1,r*.62,cy+r*.16],['q',r*.4,cy+r*.48,-r*.06,cy+r*.46],['q',-r*.6,cy+r*.42,-r*.66,cy]],SH);
  /* หนามผลึกหลัง */for(let i=0;i<4;i++){const x=-r*.46+i*r*.2,y=cy-r*.42-Math.sin((i+.5)/4*Math.PI)*r*.12+(i===0?r*.12:0);vS(W,[[x-r*.07,y+r*.08],[x-r*.02,y-r*.2-(i%2)*r*.06],[x+r*.07,y+r*.06]],SP,1,.6)}
  /* ลายปล้อง */for(let i=0;i<3;i++)vK(W,[[-r*(.54-i*.2),cy-r*(.34-i*.1)],['q',-r*(.42-i*.2),cy,-r*(.5-i*.2),cy+r*.36]],'rgba(20,10,36,.6)',r*.04);
  /* ท้องใส เห็นดาว */vS(W,[[-r*.42,cy+r*.06],['q',-r*.36,cy-r*.2,-r*.02,cy-r*.18],['q',r*.24,cy-r*.12,r*.2,cy+r*.14],['q',r*.08,cy+r*.36,-r*.18,cy+r*.34],['q',-r*.42,cy+r*.28,-r*.42,cy+r*.06]],W?'#fff':'#2a1a50',1,.6);
  if(!W){vGlow(W,-r*.1,cy+r*.08,r*.5,'255,210,120',.25);for(let i=0;i<5;i++){const a=T*(.6+i*.13)+i*1.3,x=-r*.1+Math.cos(a)*r*(.12+i*.035),y=cy+r*.08+Math.sin(a)*r*.1;wStar(W,x,y,r*(.06+(i%2)*.025),r*.025,i%2?'#fff3b0':'#ffd36a',a)}}
  /* ปาก */const mx=r*.5,my=cy-r*.08;vS(W,[[mx-r*.18,my-r*.04-ch*.5],['q',mx+r*.14,my-r*.22-ch,mx+r*.3,my-r*.08-ch*.6],['q',mx+r*.2,my+r*.04,mx+r*.3,my+r*.14+ch*.4],['q',mx+r*.1,my+r*.28+ch*.4,mx-r*.16,my+r*.1]],'#120818',1,.8);
  vGlow(W,mx+r*.08,my+r*.02,r*.25,'255,220,140',.2);for(let i=0;i<4;i++){vFang(W,mx-r*.08+i*r*.09,my-r*.12-ch*.7+i*r*.01,r*.06,r*.09);const x=mx-r*.08+i*r*.09,y=my+r*.18+ch*.35;vD(W,[[x-r*.03,y],[x,y-r*.08],[x+r*.03,y]],'#f2ead2')}
  /* ตาสามดวง */for(const[x,y,s]of[[.22,-.42,1],[.36,-.36,.8],[.12,-.5,.7]])vEye(W,x*r,cy+y*r,r*.07*s,r*.07*s,'#ffd84a',6);
  /* ล่อดาว */const lx=r*.62+Math.sin(T*2)*r*.06,ly=cy-r*.92+Math.cos(T*2.3)*r*.04;vK(W,[[r*.1,cy-r*.52],['q',r*.3,cy-r*1.0,lx,ly]],'#4a3070',r*.06);vGlow(W,lx,ly,r*.4,'255,230,140',.5);wStar(W,lx,ly,r*.13,r*.06,'#fff2a0',T*1.5);
  return true};
MV1D[111]=(r,T,W)=>{/* ผีเสื้อสุริยคราส: ปีกครามจุดสุริยคราส (จานดำวงทอง) หางปีก ขนตัวฟู หนวดขนนก ผงทองโปรย */const by=-r*.3+Math.sin(T*2.4)*r*.1,fk=.55+.45*Math.abs(Math.cos(T*7));
  vGlow(W,0,by,r*1.4,'255,190,90',.14);
  for(const s of[-1,1]){g.save();g.translate(0,by);g.scale(s*fk*1.12,1.12);
    /* ปีกหลัง */vS(W,[[r*.08,r*.02],['q',r*.6,r*.04,r*.8,r*.34],['q',r*.66,r*.56,r*.5,r*.5],['q',r*.5,r*.9,r*.38,r*1.06],['q',r*.3,r*.7,r*.14,r*.36]],'#3a2a66');
    vEye(W,r*.5,r*.32,r*.08,r*.07,'#ff9a3a',0);
    /* ปีกหน้า */vS(W,[[r*.08,-r*.06],['q',r*.4,-r*.62,r*1.06,-r*.86],['q',r*1.18,-r*.5,r*1.0,-r*.12],['q',r*.62,r*.08,r*.1,r*.08]],'#2a1e50');
    vK(W,[[r*.2,-r*.2],['q',r*.6,-r*.62,r*1.04,-r*.8]],'rgba(255,170,80,.6)',r*.05);vK(W,[[r*.98,-r*.78],['q',r*1.14,-r*.48,r*.98,-r*.16]],'#e89a3a',r*.08);
    /* จุดสุริยคราส */const ex=r*.66,ey=-r*.42;if(!W&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(ex,ey,r*.32,'255,200,90',.6);g.restore()}
    g.beginPath();g.arc(ex,ey,r*.19,0,7);g.strokeStyle=W?'#fff':'#ffd060';g.lineWidth=r*.07;g.stroke();vD(W,[[ex-r*.16,ey],['q',ex-r*.16,ey-r*.16,ex,ey-r*.16],['q',ex+r*.16,ey-r*.16,ex+r*.16,ey],['q',ex+r*.16,ey+r*.16,ex,ey+r*.16],['q',ex-r*.16,ey+r*.16,ex-r*.16,ey]],'#0a0612');
    g.restore()}
  /* ตัว */vS(W,[[0,by-r*.32],['q',r*.16,by-r*.24,r*.13,by],['q',r*.1,by+r*.56,0,by+r*.62],['q',-r*.1,by+r*.56,-r*.13,by],['q',-r*.16,by-r*.24,0,by-r*.32]],'#4a3644');
  for(let i=0;i<3;i++)vK(W,[[-r*.11,by+r*(.12+i*.14)],[r*.11,by+r*(.12+i*.14)]],'#e8a040',r*.04);
  vS(W,[[-r*.14,by-r*.3],['q',0,by-r*.5,r*.14,by-r*.3],['q',0,by-r*.18,-r*.14,by-r*.3]],'#5a4450',1,.6);
  vEye(W,-r*.09,by-r*.34,r*.06,r*.06,'#ffb04a',5);vEye(W,r*.09,by-r*.34,r*.06,r*.06,'#ffb04a',5);
  /* หนวดขนนก */for(const s of[-1,1]){vK(W,[[s*r*.05,by-r*.42],['q',s*r*.16,by-r*.78,s*r*.4,by-r*.86]],'#c89a5a',r*.035);for(let i=1;i<5;i++){const k=i/5,x=s*(r*.05+(r*.35)*k*k),y=by-r*.42-r*.44*Math.sqrt(k);vK(W,[[x,y],[x+s*r*.08,y-r*.03]],'#c89a5a',r*.02)}}
  /* ผงทอง */if(!W)for(let i=0;i<4;i++){const p=(T*.8+i*.25)%1;g.fillStyle='rgba(255,210,110,'+(.8*(1-p))+')';g.beginPath();g.arc(Math.sin(i*2.1+T)*r*.4,by+r*.6+p*r*1.3,r*.04,0,7);g.fill()}
  return true};
MV1D[112]=(r,T,W,bob,sw,la,ra)=>{/* ยักษ์ดาวแหลกสลาย: หินอุกกาบาตแตกลอยแยก รอยร้าวพลังทอง แกนดาวเสี้ยวที่อก บ่าผลึก กำปั้นผลึก */const b=bob*.6,fl=Math.sin(T*2)*r*.03,gl=.5+.5*Math.sin(T*3);
  const RK='#4a4062',RD='#302a44',RL='#62587c',CR='#a072e0',GC='#ffc65a',CK=W?'#fff':'rgba(255,198,90,'+(.45+gl*.45)+')';
  const rock=(L,c)=>vS(W,L.map(p=>[p[0]*r,p[1]*r+b]),c);
  const deb=front=>{for(let i=0;i<3;i++){const a=T*1.1+i*2.1,x=Math.cos(a)*r*.9,y=-r*.6+b+Math.sin(a)*r*.2;if((Math.sin(a)>=0)===front)vS(W,[[x-r*.09,y],[x-r*.03,y-r*.08],[x+r*.08,y-r*.04],[x+r*.05,y+r*.07],[x-r*.04,y+r*.06]],front?RL:RD,1,.5)}};
  deb(false);
  /* ขา */for(const[s,l,c]of[[-1,la,RD],[1,ra,RK]]){const x=s*r*.26;vS(W,[[x-r*.17,r*.22+b],['q',x,r*.16+b,x+r*.17,r*.22+b],[x+r*.2,r*.6],[x+r*.22,r*.88-l],[x-r*.22,r*.88-l],[x-r*.2,r*.58]],c);vK(W,[[x-r*.13,r*.5],[x-r*.02,r*.56],[x+r*.12,r*.5]],CK,r*.035)}
  /* แขนหลัง */vLimb(W,[-r*.5,-r*.42+b,-r*.72,-r*.1+b,-r*.66,r*.2+b+fl],RD,r*.3,r*.26);rock([[-.86,.18],[-.66,.08],[-.46,.2],[-.44,.46],[-.62,.56],[-.84,.46]],RD);
  /* แสงรอยแยกด้านใน */vGlow(W,0,-r*.3+b,r*.9,'255,190,90',.16+gl*.12);vD(W,[[-r*.5,-r*.58+b],[r*.56,-r*.6+b],[r*.5,r*.3+b],[-r*.42,r*.3+b]],W?'#fff':'#ffb84a');
  /* แผ่นหินลำตัว */rock([[-.58,-.56],[-.36,-.74],[-.04,-.78],[0,-.46],[-.06,-.14],[-.3,-.08],[-.54,-.14],[-.62,-.36]],RK);
  rock([[.06,-.78],[.36,-.74],[.6,-.56],[.62,-.3],[.54,-.12],[.3,-.1],[.08,-.16],[.04,-.46]],RL);
  rock([[-.5,-.04],[-.24,-.02],[.04,-.08],[.3,-.04],[.54,-.06],[.48,.18],[.36,.34],[0,.38],[-.36,.34],[-.48,.16]],RD);
  for(const[x,y]of[[-.4,-.5],[.38,-.5],[-.22,.14],[.24,.18],[-.3,-.28]])vD(W,[[x*r-r*.05,y*r+b],['q',x*r,y*r-r*.05+b,x*r+r*.05,y*r+b],['q',x*r,y*r+r*.04+b,x*r-r*.05,y*r+b]],'rgba(18,12,28,.5)');
  vK(W,[[-r*.5,-r*.32+b],[-r*.36,-r*.4+b],[-r*.26,-r*.3+b]],CK,r*.03);vK(W,[[r*.3,-r*.66+b],[r*.4,-r*.5+b],[r*.52,-r*.48+b]],CK,r*.03);
  /* แกนดาวเสี้ยว */const cx=r*.02,cy=-r*.4+b;vGlow(W,cx,cy,r*.55,'255,210,120',.5);vD(W,[[cx-r*.17,cy],['q',cx-r*.17,cy-r*.18,cx,cy-r*.18],['q',cx+r*.18,cy-r*.18,cx+r*.18,cy],['q',cx+r*.18,cy+r*.18,cx,cy+r*.18],['q',cx-r*.17,cy+r*.18,cx-r*.17,cy]],GC);
  vD(W,[[cx-r*.02,cy-r*.16],['q',cx+r*.19,cy-r*.12,cx+r*.15,cy+r*.06],['q',cx+r*.06,cy+r*.17,cx-r*.04,cy+r*.15],['q',cx+r*.08,cy+r*.04,cx-r*.02,cy-r*.16]],W?'#fff':'#3a2440');wStar(W,cx-r*.06,cy,r*.065,r*.027,'#fffbe0',T);
  /* บ่าผลึก */for(const[s,c]of[[-1,RD],[1,RK]]){const x=s*r*.6,y=-r*.66+b-fl;vS(W,[[x-r*.26,y+r*.1],['q',x-r*.24,y-r*.12,x,y-r*.14],['q',x+r*.24,y-r*.12,x+r*.26,y+r*.1],['q',x,y+r*.26,x-r*.26,y+r*.1]],c);
    for(let i=0;i<3;i++){const px=x+(i-1)*r*.13,h=r*(.24+(i===1?.16:0));vS(W,[[px-r*.06,y-r*.07],[px+s*r*.04,y-r*.07-h],[px+r*.06,y-r*.07]],i===1?'#c49af8':CR,1,.6)}}
  /* หัว */const hx=r*.06,hy=-r*.88+b;vS(W,[[hx-r*.22,hy+r*.1],['q',hx-r*.24,hy-r*.12,hx-r*.06,hy-r*.16],['q',hx+r*.16,hy-r*.18,hx+r*.24,hy-r*.02],['q',hx+r*.22,hy+r*.16,hx,hy+r*.18],['q',hx-r*.16,hy+r*.18,hx-r*.22,hy+r*.1]],RK);
  vK(W,[[hx-r*.16,hy-r*.06],[hx+r*.2,hy-r*.08]],'rgba(18,12,28,.6)',r*.05);vEye(W,hx-r*.06,hy+r*.01,r*.05,r*.035,GC,6);vEye(W,hx+r*.12,hy,r*.05,r*.035,GC,6);
  for(let i=0;i<3;i++)wStar(W,hx-r*.12+i*r*.12,hy-r*.24-(i===1?r*.07:0)+Math.sin(T*2+i)*r*.02,r*.08,r*.03,'#c49af8',-Math.PI/2,4);
  /* แขนหน้า + กำปั้นผลึก */const hy2=r*.2+b+sw*.5;vLimb(W,[r*.52,-r*.44+b,r*.74,-r*.12+b,r*.68,hy2-r*.06],RK,r*.32,r*.26);vK(W,[[r*.62,-r*.2+b],[r*.72,-r*.1+b]],CK,r*.035);
  rock([[.44,(hy2-b)/r-.1],[.64,(hy2-b)/r-.18],[.86,(hy2-b)/r-.08],[.9,(hy2-b)/r+.14],[.72,(hy2-b)/r+.26],[.48,(hy2-b)/r+.2]],RL);
  for(let i=0;i<3;i++)vS(W,[[r*(.52+i*.11),hy2-r*.12],[r*(.56+i*.11),hy2-r*.34-(i%2)*r*.06],[r*(.62+i*.11),hy2-r*.12]],CR,1,.5);
  deb(true);return true};

/* ================= 12: สะพานลมตะวันตก ================= */
MV1D[120]=(r,T,W)=>{/* ภูตเมฆ: ปุยเมฆหลายก้อน ใต้ท้องเทา ตาโต แก้มชมพู แขนเกลียวลม หางเกลียว วงลมรอบตัว */const by=-r*.08+Math.sin(T*2.6)*r*.07,sq=1+Math.sin(T*5.2)*.03;
  const rg=(front)=>{if(LOWQ&&!front)return;const ry=r*.16,rx=r*.86,y=by+r*.18;g.save();g.globalAlpha*=W?1:.7;wRing(W,0,y,rx,ry,'#c8ecff',r*.06,front);for(let i=0;i<3;i++){const a=T*3+i*2.09;if((Math.sin(a)>0)===front){const x=Math.cos(a)*rx,yy=y+Math.sin(a)*ry;vK(W,[[x,yy],[x-Math.sin(a)*r*.22,yy+Math.cos(a)*ry*.4]],'#ffffff',r*.05)}}g.restore()};
  rg(false);
  /* หางเกลียว */const tw=Math.sin(T*3)*r*.1;vS(W,[[-r*.22,by+r*.3],['q',-r*.1+tw,by+r*.6,r*.04+tw,by+r*.72],['q',r*.2+tw,by+r*.74,r*.14+tw,by+r*.6],['q',r*.06+tw,by+r*.62,r*.08+tw,by+r*.54],['q',r*.2,by+r*.44,r*.24,by+r*.3]],'#dce8f8',1,.7);
  /* ก้อนเมฆ */g.save();g.translate(0,by);g.scale(1/sq,sq);const C=[[-.5,.06,.32],[-.3,-.24,.36],[.04,-.38,.42],[.38,-.2,.36],[.54,.08,.3],[.2,.18,.36],[-.2,.18,.36]];
  g.beginPath();for(const[x,y,q]of C){g.moveTo(x*r+q*r,y*r);g.arc(x*r,y*r,q*r,0,7)}g.fillStyle=W?'#fff':'#9cb0d0';g.lineWidth=r*.14;g.strokeStyle=W?'#fff':V1.O;g.stroke();g.fill();
  g.beginPath();for(const[x,y,q]of C){g.moveTo(x*r+q*r,y*r);g.arc(x*r,y*r,q*r,0,7)}g.fillStyle=W?'#fff':'#9cb0d0';g.fill();
  if(!W){g.beginPath();for(const[x,y,q]of C){g.moveTo(x*r+q*r*.94,y*r-q*r*.08);g.arc(x*r,y*r-q*r*.08,q*r*.94,0,7)}g.fillStyle='#f4f8ff';g.fill();
    g.fillStyle='rgba(255,255,255,.9)';for(const[x,y,q]of C.slice(1,4)){g.beginPath();g.ellipse(x*r-q*r*.3,y*r-q*r*.42,q*r*.32,q*r*.18,-.4,0,7);g.fill()}}
  g.restore();
  /* หน้า */const fy=by-r*.08,bl=(T*.6)%3.4<.12?.15:1;for(const s of[-1,1]){const ex=s*r*.18+r*.06;vEye(W,ex,fy,r*.09,r*.12*bl,'#2a3c6a',0);if(!W&&bl>.5){g.fillStyle='#6ab0ff';g.beginPath();g.ellipse(ex,fy+r*.05,r*.06,r*.04,0,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(ex-r*.03,fy-r*.05,r*.035,0,7);g.fill()}
    if(!W){g.fillStyle='rgba(255,140,170,.55)';g.beginPath();g.ellipse(s*r*.34+r*.06,fy+r*.14,r*.08,r*.045,0,0,7);g.fill()}}
  vK(W,[[-r*.02,fy+r*.15],['q',r*.03,fy+r*.21,r*.06,fy+r*.15],['q',r*.09,fy+r*.21,r*.14,fy+r*.15]],'#2a3c6a',r*.035);
  /* แขนเกลียวลม */for(const s of[-1,1]){const x=s*r*.7,y=by+r*.02+Math.sin(T*4+s)*r*.05;vK(W,[[s*r*.5,by+r*.04],['q',x+s*r*.16,y-r*.04,x+s*r*.12,y-r*.18],['q',x,y-r*.26,x-s*r*.02,y-r*.12]],'#e6f2ff',r*.08)}
  rg(true);return true};
MV1D[121]=(r,T,W)=>{/* นกนางแอ่นลม: ปีกเคียวยาว หางแฉกยาว หลังน้ำเงิน อกขาว คอสนิม ลายลม */const by=-r*.3+Math.sin(T*3)*r*.08,fp=Math.sin(T*10);
  const BK='#1e2c52',BL='#2e4478',WH='#f2f2ea',RU='#c8562e';
  /* ลายลม */if(!W)for(let i=0;i<3;i++){const p=(T*1.6+i*.33)%1;g.strokeStyle='rgba(230,245,255,'+(.55*(1-p))+')';g.lineWidth=r*.05;g.beginPath();g.moveTo(-r*(.6+p*.9),by+r*(-.3+i*.24));g.quadraticCurveTo(-r*(.9+p*.9),by+r*(-.36+i*.24),-r*(1.2+p*.9),by+r*(-.3+i*.24));g.stroke()}
  const wing=(far)=>{const tipY=by-r*(.1+fp*.75)*(far?.8:1),tx=-r*(far?.5:.62);const c=far?'#141e3c':BK;
    vS(W,[[r*.16,by-r*.08],['q',-r*.06,tipY-r*.04,tx-r*.48,tipY],['q',-r*.1,tipY*.4+by*.6+r*.18,-r*.12,by+r*.06]],c);if(!far)vK(W,[[r*.1,by-r*.04],['q',-r*.1,tipY+r*.04,tx-r*.4,tipY+r*.02]],BL,r*.05)};
  wing(true);
  /* หางแฉก */const tw=Math.sin(T*5)*r*.05;for(const[d,c]of[[-1,'#141e3c'],[1,BK]])vS(W,[[-r*.42,by+r*.02],['q',-r*.8,by+r*.04+d*r*.06,-r*1.22,by+r*.14+d*r*.16+tw],['q',-r*.82,by+r*.12+d*r*.04,-r*.4,by+r*.14]],c,1,.6);
  /* ตัว */vS(W,[[-r*.5,by+r*.06],['q',-r*.1,by-r*.26,r*.36,by-r*.22],['q',r*.6,by-r*.14,r*.58,by+r*.02],['q',r*.3,by+r*.24,-r*.5,by+r*.06]],BK);
  vD(W,[[-r*.36,by+r*.1],['q',r*.1,by+r*.02,r*.44,by+r*.06],['q',r*.2,by+r*.22,-r*.36,by+r*.1]],WH);
  vD(W,[[r*.34,by-r*.02],['q',r*.5,by-r*.04,r*.56,by+r*.04],['q',r*.46,by+r*.12,r*.32,by+r*.08]],RU);vD(W,[[r*.48,by-r*.18],['q',r*.58,by-r*.14,r*.6,by-r*.06],['q',r*.52,by-r*.1,r*.46,by-r*.12]],RU);
  vD(W,[[r*.58,by-r*.06],[r*.76,by-r*.02],[r*.58,by+r*.02]],'#2a2a22');vEye(W,r*.44,by-r*.1,r*.045,r*.045,'#0a0a10',0);
  wing(false);return true};
MV1D[122]=(r,T,W,bob,sw,la,ra)=>{/* ยักษ์หินลม: หินทรายซ้อนชั้น บ่าหินลอย อักขระเรืองฟ้า วงลมรอบเอว ตาช่องเรือง */const b=bob*.6,fl=Math.sin(T*2.2)*r*.05,gl=.55+.45*Math.sin(T*2.6);
  const ST='#b4a890',SD='#857a66',SL='#d0c6ae',RN=W?'#fff':'rgba(130,240,255,'+(.6+gl*.4)+')';
  const ring=front=>{if(LOWQ&&!front)return;const y=r*.12+b;g.save();g.globalAlpha*=W?1:.75;wRing(W,0,y,r*.82,r*.18,'#d6f6ff',r*.05,front);wRing(W,0,y-r*.08,r*.7,r*.15,'#b0e8ff',r*.035,front);
    for(let i=0;i<4;i++){const a=T*3.4+i*1.57;if((Math.sin(a)>0)===front){const x=Math.cos(a)*r*.82,yy=y+Math.sin(a)*r*.18;vK(W,[[x,yy],[x+Math.sin(a)*r*.26,yy-Math.cos(a)*r*.06]],'#ffffff',r*.045)}}g.restore()};
  /* บ่าหลังลอย */vS(W,[[-r*.86,-r*.66+b-fl],[-r*.56,-r*.84+b-fl],[-r*.36,-r*.6+b-fl],[-r*.5,-r*.36+b-fl],[-r*.82,-r*.4+b-fl]],SD);
  vS(W,[[-r*.82,-r*.3+b],[-r*.54,-r*.3+b],[-r*.52,r*.06+b+fl],[-r*.84,r*.04+b+fl]],SD);vS(W,[[-r*.9,r*.06+b+fl],[-r*.5,r*.06+b+fl],[-r*.52,r*.34+b+fl],[-r*.88,r*.36+b+fl]],SD);
  ring(false);
  /* ขา */for(const[s,l,c]of[[-1,la,SD],[1,ra,ST]]){const x=s*r*.24;vS(W,[[x-r*.17,r*.3+b],[x+r*.17,r*.3+b],[x+r*.2,r*.88-l],[x-r*.2,r*.88-l]],c);vK(W,[[x-r*.17,r*.6],[x+r*.18,r*.58]],'rgba(70,60,46,.5)',r*.04)}
  /* ลำตัวหินซ้อน */vS(W,[[-r*.44,r*.36+b],[-r*.5,r*.02+b],[r*.5,r*.02+b],[r*.44,r*.36+b]],SD);
  vS(W,[[-r*.58,r*.04+b],[-r*.62,-r*.36+b],[-r*.4,-r*.62+b],[r*.4,-r*.64+b],[r*.62,-r*.38+b],[r*.58,r*.04+b]],ST);
  for(const y of[-.36,-.14])vK(W,[[-r*.6,y*r+b],['q',0,y*r+r*.05+b,r*.6,y*r+b]],'rgba(90,76,56,.55)',r*.035);
  vD(W,[[-r*.36,-r*.6+b],[r*.36,-r*.62+b],[r*.3,-r*.5+b],[-r*.3,-r*.48+b]],SL);
  /* อักขระลมเรือง */vGlow(W,0,-r*.3+b,r*.5,'130,240,255',.22*gl);vK(W,[[0,-r*.5+b],[0,-r*.1+b]],RN,r*.05);vK(W,[[-r*.16,-r*.42+b],[0,-r*.3+b],[r*.16,-r*.42+b]],RN,r*.05);
  vK(W,[[-r*.12,-r*.18+b],['q',0,-r*.08+b,r*.12,-r*.18+b]],RN,r*.04);
  /* หัว */const hy=-r*.82+b;vS(W,[[-r*.2,hy+r*.18],[-r*.24,hy-r*.08],[-r*.1,hy-r*.22],[r*.14,hy-r*.22],[r*.26,hy-r*.06],[r*.22,hy+r*.18]],ST);vD(W,[[-r*.16,hy-r*.02],[r*.2,hy-r*.02],[r*.18,hy+r*.06],[-r*.14,hy+r*.06]],'#2a241c');
  vGlow(W,r*.03,hy+r*.02,r*.3,'130,240,255',.4);vEye(W,-r*.04,hy+r*.02,r*.05,r*.03,'#8af4ff',6);vEye(W,r*.12,hy+r*.02,r*.05,r*.03,'#8af4ff',6);
  ring(true);
  /* บ่าหน้าลอย + แขน */vS(W,[[r*.38,-r*.62+b-fl],[r*.58,-r*.86+b-fl],[r*.88,-r*.7+b-fl],[r*.84,-r*.42+b-fl],[r*.52,-r*.38+b-fl]],ST);vK(W,[[r*.56,-r*.7+b-fl],[r*.74,-r*.56+b-fl]],RN,r*.04);
  vS(W,[[r*.56,-r*.32+b],[r*.84,-r*.32+b],[r*.86,r*.04+b+fl+sw*.3],[r*.54,r*.06+b+fl+sw*.3]],ST);vS(W,[[r*.5,r*.08+b+fl+sw*.3],[r*.92,r*.08+b+fl+sw*.3],[r*.9,r*.4+b+fl+sw*.3],[r*.52,r*.42+b+fl+sw*.3]],SL);
  vK(W,[[r*.6,r*.2+b+fl+sw*.3],[r*.82,r*.2+b+fl+sw*.3]],'rgba(90,76,56,.5)',r*.035);
  return true};
/* เฟือง: ฟัน n ซี่ หมุนมุม a */
function wGear(W,x,y,R,ri,n,a,c,hole){g.beginPath();for(let i=0;i<n;i++){const a0=a+i*Math.PI*2/n,d=Math.PI/n;for(const[k,q]of[[-.55,ri],[-.35,R],[.35,R],[.55,ri]]){const aa=a0+k*d;g.lineTo(x+Math.cos(aa)*q,y+Math.sin(aa)*q)}}g.closePath();g.fillStyle=W?'#fff':c;g.fill();g.lineWidth=.7;g.strokeStyle=V1.O;g.stroke();
  if(hole&&!W){g.fillStyle=hole;g.beginPath();g.arc(x,y,ri*.42,0,7);g.fill()}}

/* ================= 13: สวนลอยฟ้าร้าง ================= */
MV1D[130]=(r,T,W,bob,sw,la,ra)=>{/* ดอกกัดยักษ์: กลีบบานเย็นซ้อน ปากฟันกลางดอก ใบแขน ก้านโค้ง เดินด้วยราก */const b=bob*.7,ch=(.5+.5*Math.sin(T*4))*r*.12,hx=r*.18,hy=-r*.42+b+Math.sin(T*2)*r*.03;
  const PK='#d23c88',PL='#f27ab4',PD='#9a2464',GR='#4f8a34',GD='#356424';
  /* ราก */for(let i=0;i<4;i++){const x=-r*.24+i*r*.15,l=(i%2?la:ra)*.8,d=(i-1.5)*r*.14;vLimb(W,[-r*.02,r*.3+b,x+d*.4,r*.58,x+d,r*.88-l],i%2?'#6a4a2a':'#7a5632',r*.12,r*.05)}
  /* ใบหลัง */vS(W,[[-r*.06,r*.06+b],['q',-r*.5,-r*.16+b-sw,-r*.8,r*.0+b-sw*1.4],['q',-r*.5,r*.2+b,-r*.06,r*.16+b]],GD);
  /* ก้าน */vLimb(W,[0,r*.36+b,-r*.08,r*.06+b,hx-r*.06,hy+r*.2],GR,r*.22,r*.16);
  /* ใบหน้า */vS(W,[[r*.0,r*.12+b],['q',r*.44,-r*.02+b+sw,r*.78,r*.14+b+sw*1.4],['q',r*.46,r*.32+b,r*.0,r*.22+b]],GR);vK(W,[[r*.04,r*.17+b],['q',r*.4,r*.14+b+sw,r*.72,r*.15+b+sw*1.3]],'#7ab25a',r*.03);
  const pet=(a,L,w,c)=>{const P=(aa,q)=>[hx+Math.cos(aa)*q,hy+Math.sin(aa)*q];const b0=P(a-.32,r*.22),b1=P(a+.32,r*.22),c1=P(a-w,L*.78),c2=P(a-w*.45,L*1.06),tp=P(a,L),c3=P(a+w*.45,L*1.06),c4=P(a+w,L*.78);
    return vS(W,[b0,['c',c1[0],c1[1],c2[0],c2[1],tp[0],tp[1]],['c',c3[0],c3[1],c4[0],c4[1],b1[0],b1[1]]],c,1,.7)};
  /* กลีบหลัง */for(let i=0;i<8;i++)pet(i*Math.PI/4+.2,r*.74,.42,PD);
  /* กลีบหน้า */for(let i=0;i<8;i++){const a=i*Math.PI/4+.2+Math.PI/8,L=r*(.66+Math.sin(T*3+i)*.02);pet(a,L,.4,PK);
    vD(W,[[hx+Math.cos(a)*L*.42,hy+Math.sin(a)*L*.42],['q',hx+Math.cos(a+.16)*L*.8,hy+Math.sin(a+.16)*L*.8,hx+Math.cos(a)*L*.9,hy+Math.sin(a)*L*.9],['q',hx+Math.cos(a-.16)*L*.8,hy+Math.sin(a-.16)*L*.8,hx+Math.cos(a)*L*.42,hy+Math.sin(a)*L*.42]],PL);
    if(!W&&i%2===0){g.fillStyle='rgba(255,240,250,.85)';g.beginPath();g.arc(hx+Math.cos(a)*L*.66,hy+Math.sin(a)*L*.66,r*.035,0,7);g.fill()}}
  /* หน้าเกสร + ปาก */vS(W,[[hx-r*.34,hy],['q',hx-r*.34,hy-r*.34,hx,hy-r*.34],['q',hx+r*.34,hy-r*.34,hx+r*.34,hy],['q',hx+r*.34,hy+r*.34,hx,hy+r*.34],['q',hx-r*.34,hy+r*.34,hx-r*.34,hy]],'#f2d66a');
  vS(W,[[hx-r*.22,hy+r*.02-ch*.4],['q',hx,hy-r*.1-ch,hx+r*.22,hy+r*.02-ch*.4],['q',hx+r*.2,hy+r*.18+ch*.5,hx,hy+r*.2+ch*.5],['q',hx-r*.2,hy+r*.18+ch*.5,hx-r*.22,hy+r*.02-ch*.4]],'#3a0a1a',1,.7);
  vD(W,[[hx-r*.1,hy+r*.14+ch*.4],['q',hx,hy+r*.06+ch*.2,hx+r*.1,hy+r*.14+ch*.4],['q',hx,hy+r*.2+ch*.5,hx-r*.1,hy+r*.14+ch*.4]],'#e86a8a');
  for(let i=0;i<5;i++){const x=hx-r*.16+i*r*.08;vFang(W,x,hy-r*.04-ch*.6+Math.abs(i-2)*r*.03,r*.06,r*.08);vD(W,[[x-r*.03,hy+r*.16+ch*.45-Math.abs(i-2)*r*.02],[x,hy+r*.08+ch*.45],[x+r*.03,hy+r*.16+ch*.45-Math.abs(i-2)*r*.02]],'#f6efdc')}
  vEye(W,hx-r*.12,hy-r*.18-ch*.5,r*.05,r*.04,'#7a1a3a',0);vEye(W,hx+r*.12,hy-r*.18-ch*.5,r*.05,r*.04,'#7a1a3a',0);
  /* น้ำลายหยด */if(!W){const p=(T*.9)%1;g.fillStyle='rgba(200,255,150,'+(.7*(1-p))+')';g.beginPath();g.ellipse(hx+r*.06,hy+r*.24+ch*.5+p*r*.5,r*.03,r*.05,0,0,7);g.fill()}
  return true};
MV1D[131]=(r,T,W)=>{/* ผึ้งหนามทอง: ก้นทองลายดำมีหนาม เหล็กไนเงา อกขนฟู ตารวมใหญ่ ปีกใสลายเส้น */const by=-r*.28+Math.sin(T*3.4)*r*.08,wf=Math.sin(T*28);
  const GO='#f2b628',GL='#ffd860',BK='#2a1a10';
  const wing=(far,ph)=>{const a=-1.9+wf*.5*(far?.8:1)+ph,L=r*(far?.8:.95);g.save();g.translate(-r*.02,by-r*.28);g.rotate(a);vS(W,[[0,0],['q',L*.3,-r*.3,L,-r*.12],['q',L*.9,r*.1,L*.3,r*.12],['q',L*.1,r*.08,0,0]],W?'#fff':far?'rgba(210,235,255,.4)':'rgba(230,245,255,.55)',1,.5);
    vK(W,[[0,0],[L*.85,-r*.08]],'rgba(80,90,110,.5)',r*.025);vK(W,[[L*.3,-r*.06],[L*.6,r*.06]],'rgba(80,90,110,.4)',r*.02);g.restore()};
  wing(true,-.3);
  /* ขา */for(let i=0;i<3;i++){const x=-r*.05+i*r*.14,w=Math.sin(T*6+i)*r*.04;vLimb(W,[x,by+r*.16,x+r*.02+w,by+r*.36,x-r*.04+w,by+r*.5],BK,r*.07,r*.04,0)}
  /* ก้น */g.save();g.translate(-r*.34,by+r*.06);g.rotate(.32);vS(W,[[r*.3,-r*.26],['q',-r*.3,-r*.36,-r*.58,0],['q',-r*.3,r*.34,r*.3,r*.26],['q',r*.4,0,r*.3,-r*.26]],GO);
  for(let i=0;i<3;i++){const x=r*.14-i*r*.22;vD(W,[[x,-r*.3+i*r*.02],['q',x-r*.08,0,x,r*.3-i*r*.02],[x-r*.1,r*.28-i*r*.03],['q',x-r*.18,0,x-r*.1,-r*.28+i*r*.03]],BK);vS(W,[[x-r*.08,-r*.27+i*r*.03],[x-r*.03,-r*.44+i*r*.03],[x+r*.01,-r*.28+i*r*.03]],'#e8e0c8',1,.5)}
  vD(W,[[r*.2,-r*.2],['q',r*.0,-r*.26,-r*.2,-r*.16],['q',0,-r*.12,r*.2,-r*.14]],W?'#fff':'rgba(255,250,210,.6)');
  /* เหล็กไน */vS(W,[[-r*.54,-r*.06],[-r*.86,r*.02],[-r*.54,r*.07]],'#c0c4cc',1,.6);g.restore();
  /* อก */vS(W,[[-r*.2,by],['q',-r*.22,by-r*.3,r*.06,by-r*.3],['q',r*.3,by-r*.26,r*.28,by],['q',r*.26,by+r*.22,r*.04,by+r*.22],['q',-r*.18,by+r*.22,-r*.2,by]],'#6a4a1a');
  for(let i=0;i<8;i++){const a=-2.8+i*.4;vK(W,[[r*.04+Math.cos(a)*r*.2,by+Math.sin(a)*r*.2],[r*.04+Math.cos(a)*r*.28,by+Math.sin(a)*r*.27]],GL,r*.05)}
  /* หัว */const hx=r*.42,hy=by-r*.02;vS(W,[[hx-r*.16,hy],['q',hx-r*.14,hy-r*.22,hx+r*.06,hy-r*.2],['q',hx+r*.22,hy-r*.12,hx+r*.2,hy+r*.06],['q',hx+r*.12,hy+r*.2,hx-r*.04,hy+r*.18],['q',hx-r*.16,hy+r*.14,hx-r*.16,hy]],BK);
  vS(W,[[hx-r*.04,hy-r*.16],['q',hx+r*.14,hy-r*.18,hx+r*.16,hy-r*.02],['q',hx+r*.12,hy+r*.1,hx,hy+r*.06],['q',hx-r*.08,hy-r*.04,hx-r*.04,hy-r*.16]],'#8a1c1c',1,.5);if(!W){g.fillStyle='rgba(255,180,160,.8)';g.beginPath();g.arc(hx+r*.03,hy-r*.1,r*.035,0,7);g.fill()}
  vFang(W,hx+r*.14,hy+r*.12,r*.05,r*.08,'#d8a030');
  for(const d of[0,1])vK(W,[[hx+r*.02,hy-r*.18],[hx+r*(.04+d*.1),hy-r*.42],[hx+r*(.22+d*.08),hy-r*.5]],BK,r*.035);
  wing(false,0);return true};
MV1D[132]=(r,T,W,bob,sw,la,ra)=>{/* พฤกษายักษ์ร้าง: ต้นไม้งอกจากโถหินอ่อนแตก รากทะลักเป็นขา แขนกิ่ง เรือนยอดดอกชมพู ตาเรืองในโพรง (ปาเมล็ด) */const b=bob*.6,fl=Math.sin(T*1.8)*r*.03;
  const MB='#c06a3c',MD='#8a4426',GD='#e0a070',TR='#6e4a2e',TD='#4e321e',LF='#4e8c3a',LL='#6eae4c',BL='#f6a8c8';
  /* รากขา */for(const[s,l]of[[-1,la],[1,ra]]){vLimb(W,[s*r*.2,r*.4+b,s*r*.32,r*.64,s*r*.3,r*.88-l],TD,r*.24,r*.14);for(const d of[-1,1])vK(W,[[s*r*.3,r*.86-l],['q',s*r*.3+d*r*.1,r*.9-l,s*r*.3+d*r*.18,r*.9-l]],TD,r*.06)}
  for(const x of[-.42,.4])vK(W,[[x*r,r*.36+b],['q',x*r*1.3,r*.5,x*r*1.25,r*.66]],TD,r*.06);
  /* แขนกิ่งหลัง */vLimb(W,[-r*.24,-r*.52+b,-r*.62,-r*.44+b-sw,-r*.84,-r*.16+b-sw],TD,r*.16,r*.07);for(const d of[-.12,.1])vK(W,[[-r*.84,-r*.16+b-sw],[-r*(.92+d),-r*(.02-d)+b-sw]],TD,r*.04);
  /* ลำต้น */vS(W,[[-r*.24,r*.02+b],['q',-r*.3,-r*.4+b,-r*.2,-r*.72+b],[r*.2,-r*.74+b],['q',r*.32,-r*.4+b,r*.24,r*.02+b]],TR);
  for(let i=0;i<4;i++)vK(W,[[-r*.16+i*r*.11,-r*.66+b],['q',-r*.2+i*r*.11+(i%2?.04:-.04)*r,-r*.3+b,-r*.16+i*r*.11,r*.0+b]],'rgba(40,24,12,.55)',r*.035);
  /* หน้าในโพรง */const fy=-r*.42+b;for(const s of[-1,1]){vD(W,[[s*r*.02+r*.02,fy],['q',s*r*.1+r*.02,fy-r*.1,s*r*.17+r*.02,fy],['q',s*r*.1+r*.02,fy+r*.07,s*r*.02+r*.02,fy]],'#1a0e06');vEye(W,s*r*.09+r*.02,fy-r*.01,r*.045,r*.035,'#d8ff6a',6)}
  vD(W,[[-r*.06,fy+r*.14],['q',r*.02,fy+r*.1,r*.12,fy+r*.15],['q',r*.04,fy+r*.24,-r*.06,fy+r*.14]],'#1a0e06');
  /* โถหินอ่อน */const uy=r*.02+b;vS(W,[[-r*.36,uy],[r*.36,uy],['q',r*.5,uy+r*.08,r*.46,uy+r*.2],['q',r*.4,uy+r*.42,r*.18,uy+r*.48],[-r*.18,uy+r*.48],['q',-r*.4,uy+r*.42,-r*.46,uy+r*.2],['q',-r*.5,uy+r*.08,-r*.36,uy]],MB);
  vS(W,[[-r*.46,uy-r*.1],[r*.46,uy-r*.1],[r*.44,uy+r*.06],[-r*.44,uy+r*.06]],'#d07a48',1,.7);vK(W,[[-r*.44,uy-r*.04],[r*.44,uy-r*.04]],MD,r*.03);vK(W,[[-r*.36,uy+r*.3],['q',0,uy+r*.36,r*.36,uy+r*.3]],GD,r*.035);
  vK(W,[[r*.1,uy+r*.06],[r*.16,uy+r*.18],[r*.1,uy+r*.26],[r*.18,uy+r*.42]],'#3a1a0e',r*.035);vK(W,[[-r*.26,uy+r*.1],[-r*.2,uy+r*.22]],'#3a1a0e',r*.03);vD(W,[[-r*.42,uy+r*.12],['q',-r*.3,uy+r*.08,-r*.2,uy+r*.16],['q',-r*.3,uy+r*.24,-r*.44,uy+r*.24]],'#5e9a40');
  vD(W,[[r*.3,uy-r*.06],[r*.42,uy-r*.06],[r*.44,uy+r*.12],[r*.36,uy+r*.06]],'#2a1a10');vD(W,[[-r*.42,uy-r*.06],[-r*.22,uy-r*.06],['q',-r*.3,uy+r*.04,-r*.4,uy+r*.02]],'#5e9a40');
  /* เรือนยอด */const cy=-r*.92+b+fl;for(const[x,y,q,c]of[[-.42,.06,.3,LF],[.42,.04,.3,LF],[-.2,-.18,.34,LL],[.2,-.2,.34,LF],[0,.04,.36,LL],[0,-.32,.28,LL]])vS(W,[[x*r-q*r,y*r+cy],['q',x*r-q*r,y*r-q*r+cy,x*r,y*r-q*r+cy],['q',x*r+q*r,y*r-q*r+cy,x*r+q*r,y*r+cy],['q',x*r+q*r*.6,y*r+q*r*.8+cy,x*r,y*r+q*r*.6+cy],['q',x*r-q*r*.6,y*r+q*r*.8+cy,x*r-q*r,y*r+cy]],c);
  for(const[x,y]of[[-.5,-.02],[-.24,-.3],[.08,-.42],[.3,-.18],[.5,.02],[-.06,-.08],[.16,.12],[-.3,.12]]){wStar(W,x*r,y*r+cy,r*.075,r*.035,BL,T*.3,5);if(!W){g.fillStyle='#fff3a0';g.beginPath();g.arc(x*r,y*r+cy,r*.022,0,7);g.fill()}}
  /* กลีบร่วง */if(!W)for(let i=0;i<3;i++){const p=(T*.5+i*.33)%1;g.fillStyle='rgba(250,170,205,'+(.9*(1-p))+')';g.beginPath();g.ellipse(-r*.5+i*r*.5+Math.sin(T*2+i)*r*.12,cy+r*.3+p*r*1.4,r*.05,r*.03,T+i,0,7);g.fill()}
  /* แขนกิ่งหน้า ถือเมล็ด */const hx=r*.82,hy=-r*.14+b+sw;vLimb(W,[r*.2,-r*.5+b,r*.58,-r*.44+b+sw*.5,hx,hy],TR,r*.17,r*.08);for(const[dx,dy]of[[.12,-.04],[.1,.1],[-.02,.14]])vK(W,[[hx,hy],[hx+dx*r,hy+dy*r]],TR,r*.05);
  vGlow(W,hx+r*.06,hy+r*.02,r*.3,'200,255,140',.4);vS(W,[[hx-r*.02,hy-r*.06],['q',hx+r*.16,hy-r*.08,hx+r*.14,hy+r*.06],['q',hx+r*.04,hy+r*.12,hx-r*.02,hy-r*.06]],'#b8e86a',1,.6);
  return true};

/* ================= 14: หอนาฬิกาเมฆ ================= */
MV1D[140]=(r,T,W,bob,sw,la,ra)=>{/* หุ่นกลไกทองเหลือง: ตัวหม้อต้มกลมหมุดย้ำ หน้าต่างเตาเรือง หัวโดมเลนส์เดี่ยว ลานไขหมุนหลัง ปล่องไอน้ำ ขาลูกสูบ แขนคีม */const b=bob*.7;
  const BR='#c8984a',BD='#8a6430',CU='#b06a3a',ST='#8a8e98';
  /* ไอน้ำ */if(!W)for(let i=0;i<3;i++){const p=(T*.7+i*.33)%1;g.fillStyle='rgba(235,240,245,'+(.55*(1-p))+')';g.beginPath();g.arc(-r*.3-p*r*.3,-r*.95+b-p*r*.7,r*(.08+p*.14),0,7);g.fill()}
  vS(W,[[-r*.36,-r*.6+b],[-r*.22,-r*.6+b],[-r*.22,-r*.92+b],[-r*.36,-r*.92+b]],ST,1,.7);vS(W,[[-r*.4,-r*.98+b],[-r*.18,-r*.98+b],[-r*.2,-r*.9+b],[-r*.38,-r*.9+b]],BD,1,.6);
  /* ลานไข */const kw=Math.cos(T*4);vK(W,[[-r*.42,-r*.18+b],[-r*.62,-r*.18+b]],ST,r*.07);g.save();g.translate(-r*.66,-r*.18+b);g.scale(1,1);vS(W,[[0,-r*.04],[-r*.06*Math.abs(kw)-r*.02,-r*.26],[-r*.02,-r*.04]],BD,1,.6);vS(W,[[0,r*.04],[-r*.06*Math.abs(kw)-r*.02,r*.26],[-r*.02,r*.04]],BD,1,.6);
  vS(W,[[-r*.12*Math.abs(kw)-r*.02,-r*.3],['q',-r*.24*Math.abs(kw)-r*.04,-r*.2,-r*.08*Math.abs(kw)-r*.02,-r*.1],[-r*.02,-r*.18]],BR,1,.6);vS(W,[[-r*.12*Math.abs(kw)-r*.02,r*.3],['q',-r*.24*Math.abs(kw)-r*.04,r*.2,-r*.08*Math.abs(kw)-r*.02,r*.1],[-r*.02,r*.18]],BR,1,.6);g.restore();
  /* แขนหลัง */vLimb(W,[-r*.3,-r*.24+b,-r*.4,r*.04+b,-r*.3,r*.24+b-sw*.5],BD,r*.12,r*.1);
  /* ขาลูกสูบ */for(const[s,l,c]of[[-1,la,BD],[1,ra,BR]]){const x=s*r*.2;vS(W,[[x-r*.1,r*.3+b],[x+r*.1,r*.3+b],[x+r*.08,r*.52+b*.5],[x-r*.08,r*.52+b*.5]],c,1,.8);vS(W,[[x-r*.04,r*.5],[x+r*.04,r*.5],[x+r*.04,r*.8-l],[x-r*.04,r*.8-l]],ST,1,.6);
    wGear(W,x,r*.5,r*.09,r*.06,8,T*3*s,'#d8b060');vS(W,[[x-r*.14,r*.8-l],[x+r*.18,r*.8-l],[x+r*.16,r*.9-l],[x-r*.14,r*.9-l]],c,1,.7)}
  /* ตัวหม้อต้ม */vS(W,[[-r*.44,-r*.1+b],['q',-r*.46,-r*.58+b,0,-r*.6+b],['q',r*.46,-r*.58+b,r*.44,-r*.1+b],['q',r*.44,r*.36+b,0,r*.38+b],['q',-r*.44,r*.36+b,-r*.44,-r*.1+b]],BR);
  for(const y of[-.42,.18])vK(W,[[-r*.42,y*r+b],['q',0,y*r+r*.08+b,r*.42,y*r+b]],CU,r*.07);
  if(!W)for(let i=0;i<5;i++){const x=-r*.32+i*r*.16;g.fillStyle='#f0d890';g.beginPath();g.arc(x,-r*.38+b+Math.abs(i-2)*r*.02,r*.025,0,7);g.fill();g.beginPath();g.arc(x,r*.22+b+Math.abs(i-2)*r*.02,r*.025,0,7);g.fill()}
  /* หน้าต่างเตา */const fl=.6+.4*Math.sin(T*9);vS(W,[[r*.0,-r*.14+b],['q',r*.16,-r*.3+b,r*.3,-r*.14+b],[r*.3,r*.06+b],[r*.0,r*.06+b]],'#3a2a20',1,.7);vGlow(W,r*.15,-r*.04+b,r*.35,'255,150,60',.3*fl);
  vD(W,[[r*.04,r*.04+b],['q',r*.15,-r*.22*fl+b,r*.26,r*.04+b]],W?'#fff':'#ff9a3a');for(let i=0;i<3;i++)vK(W,[[r*(.06+i*.09),-r*.2+b],[r*(.06+i*.09),r*.06+b]],BD,r*.03);
  /* หัวโดม + เลนส์ */const hy=-r*.74+b;vS(W,[[-r*.26,hy+r*.16],['q',-r*.28,hy-r*.22,r*.04,hy-r*.24],['q',r*.32,hy-r*.2,r*.3,hy+r*.16]],BR);vK(W,[[-r*.26,hy+r*.14],[r*.3,hy+r*.14]],CU,r*.06);
  vK(W,[[r*.0,hy-r*.24],[r*.0,hy-r*.42]],ST,r*.04);vEye(W,r*.0,hy-r*.44,r*.05,r*.05,'#ff6a4a',5);
  vS(W,[[r*.1-r*.18,hy],['q',r*.1-r*.18,hy-r*.18,r*.1,hy-r*.18],['q',r*.1+r*.18,hy-r*.18,r*.1+r*.18,hy],['q',r*.1+r*.18,hy+r*.18,r*.1,hy+r*.18],['q',r*.1-r*.18,hy+r*.18,r*.1-r*.18,hy]],'#5a4020');
  vGlow(W,r*.12,hy,r*.32,'120,255,170',.4);vEye(W,r*.12,hy,r*.12,r*.12,'#6affaa',6);vEye(W,r*.14,hy,r*.05,r*.05,'#0a3a2a',0);
  /* แขนหน้า + คีม */const ax=r*.62,ay=r*.06+b+sw*.6;vLimb(W,[r*.36,-r*.26+b,r*.56,-r*.12+b,ax,ay],BR,r*.13,r*.1);wGear(W,r*.4,-r*.24+b,r*.1,r*.07,8,-T*3,'#d8b060','#5a4020');
  vS(W,[[ax-r*.04,ay],[ax+r*.2,ay-r*.1],[ax+r*.24,ay-r*.02],[ax+r*.08,ay+r*.02]],ST,1,.6);vS(W,[[ax-r*.04,ay+r*.02],[ax+r*.2,ay+r*.14],[ax+r*.16,ay+r*.2],[ax+r*.02,ay+r*.08]],ST,1,.6);
  return true};
MV1D[141]=(r,T,W)=>{/* แมลงเฟือง: ปีกแข็งทองเหลืองกาง ปีกใบมีดไขลาน เฟืองหมุนบนหลัง ขาทองแดง หนวดสปริง ตาอำพัน */const by=-r*.28+Math.sin(T*3)*r*.07,wf=Math.sin(T*24);
  const BR='#c8984a',BD='#8a6430',CU='#b46e3c',ST='#5a5e68';
  /* ปีกใบมีด */for(const[far,c]of[[1,'rgba(200,150,90,.45)'],[0,'rgba(230,190,120,.6)']]){g.save();g.translate(-r*.05,by-r*.2);g.rotate(-2.2+wf*.45+(far?-.25:0));vS(W,[[0,-r*.04],[r*.9,-r*.1],[r*.96,0],[r*.9,r*.06],[0,r*.06]],W?'#fff':c,1,.5);vK(W,[[r*.1,0],[r*.85,-r*.04]],'rgba(120,80,40,.6)',r*.025);g.restore()}
  /* ขา */for(let i=0;i<3;i++){const x=-r*.2+i*r*.2,w=Math.sin(T*7+i*2)*r*.05;vK(W,[[x,by+r*.12],[x+r*.06+w,by+r*.3],[x-r*.02+w,by+r*.48]],CU,r*.06);vK(W,[[x-r*.02+w,by+r*.48],[x+r*.04+w,by+r*.52]],CU,r*.04)}
  /* ใต้ท้อง */vS(W,[[-r*.56,by+r*.04],['q',-r*.2,by+r*.28,r*.36,by+r*.12],[r*.36,by],[-r*.56,by]],ST);
  /* ปีกแข็งกาง */vS(W,[[-r*.6,by],['q',-r*.58,by-r*.44,-r*.1,by-r*.5],['q',r*.3,by-r*.46,r*.38,by-r*.08],[-r*.6,by+r*.04]],BR);
  vS(W,[[-r*.5,by-r*.06],['q',-r*.62,by-r*.52,-r*.2,by-r*.66],['q',r*.06,by-r*.66,r*.2,by-r*.48],['q',-r*.06,by-r*.36,-r*.5,by-r*.06]],BD,1,.7);
  for(let i=0;i<4;i++)if(!W){g.fillStyle='#f0d890';g.beginPath();g.arc(-r*.46+i*r*.24,by-r*.06-Math.sin((i+.5)/4*Math.PI)*r*.34,r*.025,0,7);g.fill()}
  /* เฟืองหลัง */wGear(W,-r*.12,by-r*.4,r*.34,r*.25,12,T*2.5,'#e0b860','#3a2a14');wGear(W,r*.22,by-r*.34,r*.16,r*.11,8,-T*5,'#c8a050','#3a2a14');
  /* หัว */const hx=r*.48,hy=by-r*.04;vS(W,[[hx-r*.16,hy-r*.12],['q',hx+r*.1,hy-r*.22,hx+r*.2,hy-r*.02],['q',hx+r*.14,hy+r*.14,hx-r*.14,hy+r*.12]],ST);vEye(W,hx+r*.04,hy-r*.05,r*.07,r*.06,'#ffb03a',6);
  vS(W,[[hx+r*.16,hy+r*.02],[hx+r*.32,hy+r*.0],[hx+r*.24,hy+r*.1]],CU,1,.5);vS(W,[[hx+r*.14,hy+r*.08],[hx+r*.3,hy+r*.14],[hx+r*.18,hy+r*.16]],CU,1,.5);
  /* หนวดสปริง */for(const d of[0,1]){const P=[[hx+r*.02,hy-r*.12]];for(let i=1;i<=6;i++)P.push([hx+r*(.02+i*.06+d*.04),hy-r*.12-i*r*.06+(i%2?r*.04:-r*.02)]);vK(W,P,'#d0a050',r*.03)}
  return true};
MV1D[142]=(r,T,W,bob,sw,la,ra)=>{/* ป้อมปืนนาฬิกา: ตู้นาฬิกาไม้ขอบทอง หน้าปัดเข็มเดิน ลูกตุ้มแกว่งในกระจก ระฆังบนโดม ปืนใหญ่ข้างตัว ขาแมงมุมทองเหลือง 3 ขา ไอน้ำ (ยิงสลักเกลียว) */const b=bob*.5;
  const WD='#6e4024',WL='#8e5a34',GD='#d8b05a',BR='#b88a40',BD='#7a5a28';
  /* ไอน้ำ */if(!W)for(let i=0;i<3;i++){const p=(T*.6+i*.33)%1;g.fillStyle='rgba(235,240,245,'+(.5*(1-p))+')';g.beginPath();g.arc(-r*.42-p*r*.2,-r*.7+b-p*r*.6,r*(.07+p*.12),0,7);g.fill()}
  /* ขาแมงมุม */const leg=(x,k,l,c)=>{const kx=x+k*r*.42,ky=r*.12+b-r*.14,fx=x+k*r*.6;vLimb(W,[x,r*.24+b,kx,ky,fx,r*.88-l],c,r*.12,r*.07);wGear(W,kx,ky,r*.08,r*.055,7,T*2*k,'#d8b060');vS(W,[[fx-r*.07,r*.86-l],[fx+r*.07,r*.86-l],[fx+r*.05,r*.92-l],[fx-r*.05,r*.92-l]],BD,1,.5)};
  leg(-r*.02,-.3,0,BD);leg(-r*.2,-1,la,BR);leg(r*.2,1,ra,BR);
  /* ท่อไอ */vS(W,[[-r*.46,-r*.2+b],[-r*.38,-r*.2+b],[-r*.38,-r*.72+b],[-r*.46,-r*.72+b]],'#8a8e98',1,.6);
  /* ตู้ไม้ */vS(W,[[-r*.34,r*.3+b],[-r*.36,-r*.36+b],[r*.36,-r*.36+b],[r*.34,r*.3+b]],WD);vS(W,[[-r*.4,r*.24+b],[r*.4,r*.24+b],[r*.38,r*.34+b],[-r*.38,r*.34+b]],WL,1,.6);
  /* หน้าต่างลูกตุ้ม */vS(W,[[-r*.18,r*.18+b],[-r*.18,-r*.2+b],[r*.18,-r*.2+b],[r*.18,r*.18+b]],'#2a1a14',1,.6);g.save();g.beginPath();g.rect(-r*.18,-r*.2+b,r*.36,r*.38);g.clip();
  const pa=Math.sin(T*3.2)*.35;g.translate(0,-r*.2+b);g.rotate(pa);vK(W,[[0,0],[0,r*.26]],GD,r*.03);vS(W,[[-r*.07,r*.28],['q',0,r*.18,r*.07,r*.28],['q',0,r*.38,-r*.07,r*.28]],GD,1,.5);g.restore();
  if(!W){g.fillStyle='rgba(200,230,255,.15)';g.fillRect(-r*.18,-r*.2+b,r*.12,r*.38)}vK(W,[[-r*.18,-r*.2+b],[r*.18,-r*.2+b],[r*.18,r*.18+b],[-r*.18,r*.18+b],[-r*.18,-r*.2+b]],GD,r*.035);
  /* หน้าปัด */const cy=-r*.66+b,R=r*.42;vS(W,[[-R-r*.06,cy],['q',-R-r*.06,cy-R-r*.06,0,cy-R-r*.06],['q',R+r*.06,cy-R-r*.06,R+r*.06,cy],['q',R+r*.06,cy+R+r*.06,0,cy+R+r*.06],['q',-R-r*.06,cy+R+r*.06,-R-r*.06,cy]],GD);
  vS(W,[[-R,cy],['q',-R,cy-R,0,cy-R],['q',R,cy-R,R,cy],['q',R,cy+R,0,cy+R],['q',-R,cy+R,-R,cy]],'#f2e8d0',1,.6);
  for(let i=0;i<12;i++){const a=i*Math.PI/6,k=i%3?.84:.76;vK(W,[[Math.cos(a)*R*.92,cy+Math.sin(a)*R*.92],[Math.cos(a)*R*k,cy+Math.sin(a)*R*k]],'#3a2a1a',i%3?r*.025:r*.045)}
  const hA=T*.4-1.6,mA=T*2.4;vK(W,[[0,cy],[Math.cos(hA)*R*.5,cy+Math.sin(hA)*R*.5]],'#2a1a10',r*.06);vK(W,[[0,cy],[Math.cos(mA)*R*.78,cy+Math.sin(mA)*R*.78]],'#2a1a10',r*.035);vEye(W,0,cy,r*.045,r*.045,'#e8402a',0);
  /* โดม + ระฆัง */vS(W,[[-r*.26,cy-R-r*.02],['q',0,cy-R-r*.3,r*.26,cy-R-r*.02]],WL,1,.7);const bs=Math.sin(T*5)*.15;g.save();g.translate(0,cy-R-r*.22);g.rotate(bs);vS(W,[[-r*.1,r*.1],['q',-r*.1,-r*.1,0,-r*.1],['q',r*.1,-r*.1,r*.1,r*.1]],GD,1,.6);g.restore();
  /* ปืนใหญ่ */const gy=-r*.28+b;vS(W,[[r*.28,gy-r*.1],[r*.92,gy-r*.08],[r*.92,gy+r*.1],[r*.28,gy+r*.12]],'#4a4e58');vS(W,[[r*.86,gy-r*.13],[r*1.0,gy-r*.13],[r*1.0,gy+r*.15],[r*.86,gy+r*.15]],BR,1,.7);vD(W,[[r*.98,gy-r*.06],[r*1.0,gy-r*.06],[r*1.0,gy+r*.08],[r*.98,gy+r*.08]],'#140e0c');
  for(const x of[.46,.66])vK(W,[[x*r,gy-r*.1],[x*r,gy+r*.11]],BR,r*.05);wGear(W,r*.3,gy,r*.14,r*.1,9,-T*2,'#d8b060','#3a2a14');
  return true};

/* ================= 15: ทะเลสาบดาวตก ================= */
MV1D[150]=(r,T,W)=>{/* ปลาคาร์ปฟ้า: ว่ายกลางอากาศ ลายส้มแดงบนขาว จุดดาวฟ้า ครีบหางม่านพลิ้ว หนวด ฟองลอย */const by=-r*.36+Math.sin(T*2.2)*r*.1,wv=Math.sin(T*4.4);
  const FN=W?'#fff':'rgba(196,228,255,.78)',FE='rgba(255,170,110,.75)';
  /* ฟอง */if(!W)for(let i=0;i<3;i++){const p=(T*.6+i*.33)%1;g.strokeStyle='rgba(220,240,255,'+(.7*(1-p))+')';g.lineWidth=r*.04;g.beginPath();g.arc(r*.8+Math.sin(T*3+i)*r*.08,by-r*.2-p*r*.9,r*(.05+i*.02),0,7);g.stroke()}
  /* ครีบอกไกล */vS(W,[[r*.3,by+r*.16],['q',r*.2,by+r*.5,-r*.02+wv*r*.06,by+r*.56],['q',r*.1,by+r*.36,r*.16,by+r*.16]],W?'#fff':'rgba(160,200,240,.6)',1,.5);
  /* หางม่าน */g.save();g.translate(-r*.5,by);g.rotate(wv*.22);for(const[d,k]of[[-1,1],[1,.9]]){vS(W,[[0,d*r*.04],['c',-r*.3,d*r*.1,-r*.42,d*r*(.42+wv*.06)*k,-r*.66,d*r*.5*k],['q',-r*.56,d*r*.3*k,-r*.72,d*r*.14*k],['q',-r*.4,d*r*.1,0,0]],FN,1,.6);
    for(let i=0;i<3;i++)vK(W,[[0,d*r*.02],['q',-r*.3,d*r*(.1+i*.08),-r*(.5+i*.06),d*r*(.18+i*.1)*k]],'rgba(120,170,220,.45)',r*.025);vK(W,[[-r*.66,d*r*.5*k],['q',-r*.56,d*r*.3*k,-r*.72,d*r*.14*k]],FE,r*.05)}g.restore();
  /* ครีบหลัง */vS(W,[[-r*.22,by-r*.24],['q',-r*.06,by-r*.56+wv*r*.04,r*.22,by-r*.3],['q',0,by-r*.32,-r*.22,by-r*.24]],FN,1,.6);
  /* ตัว */const L=[[r*.7,by+r*.02],['c',r*.62,by-r*.3,r*.2,by-r*.36,-r*.1,by-r*.28],['q',-r*.4,by-r*.18,-r*.56,by-r*.04],[-r*.56,by+r*.04],['q',-r*.4,by+r*.2,-r*.1,by+r*.26],['c',r*.2,by+r*.34,r*.62,by+r*.28,r*.7,by+r*.02]];
  vS(W,L,'#f8f4ec');if(!W){g.save();vP(L);g.clip();
    for(const[x,y,a,q]of[[.36,-.26,.24,.18],[-.04,-.2,.22,.2],[-.36,.08,.18,.12],[.12,.16,.16,.1]]){g.fillStyle='#e8602a';g.beginPath();g.ellipse(x*r,by+y*r,a*r,q*r,.3,0,7);g.fill()}
    g.fillStyle='#ffd0b0';g.globalAlpha=.6;g.beginPath();g.ellipse(r*.4,by-r*.28,r*.12,r*.06,.3,0,7);g.fill();g.globalAlpha=1;
    for(const[x,y]of[[-.2,.06],[.22,-.02],[-.42,-.08]])wStar(W,x*r,by+y*r,r*.06,r*.025,'#6ab0ff',T*.5);
    g.strokeStyle='rgba(120,90,70,.25)';g.lineWidth=r*.025;for(let i=0;i<5;i++)for(let j=0;j<2;j++){g.beginPath();g.arc(-r*.3+i*r*.16,by-r*.08+j*r*.16,r*.07,-1.2,1.2);g.stroke()}g.restore()}
  /* ครีบอกใกล้ */vS(W,[[r*.36,by+r*.18],['q',r*.3,by+r*.56,r*.06+wv*r*.06,by+r*.62],['q',r*.2,by+r*.4,r*.24,by+r*.2]],FN,1,.6);vK(W,[[r*.06+wv*r*.06,by+r*.62],['q',r*.2,by+r*.4,r*.24,by+r*.2]],FE,r*.04);
  /* หัว */vK(W,[[r*.44,by-r*.22],['q',r*.38,by,r*.46,by+r*.22]],'rgba(120,80,60,.35)',r*.035);vEye(W,r*.52,by-r*.08,r*.06,r*.06,'#1a1a2a',0);
  vD(W,[[r*.66,by+r*.06],['q',r*.72,by+r*.1,r*.68,by+r*.14]],'#c04a3a');for(const d of[0,1])vK(W,[[r*.66,by+r*.1],['q',r*(.78+d*.06),by+r*(.18+d*.08)+wv*r*.04,r*(.7+d*.12),by+r*(.3+d*.1)]],'#e8c0a0',r*.03);
  return true};
MV1D[151]=(r,T,W)=>{/* หิ่งห้อยดาว: ก้นเป็นโคมดาวเรืองกะพริบ ปีกใส หัวกลมตาโต หนวดปลายดาว ประกายตามหลัง */const by=-r*.3+Math.sin(T*3)*r*.12,pu=.75+.25*Math.sin(T*5),wf=Math.sin(T*22);
  if(!W)for(let i=0;i<4;i++){const p=(T*.9+i*.25)%1;g.fillStyle='rgba(255,240,150,'+(.8*(1-p))+')';wStar(W,-r*.5-p*r*.8,by+r*.3+Math.sin(T*2+i*2)*r*.2,r*.07*(1-p),r*.03*(1-p),'rgba(255,240,150,'+(.8*(1-p))+')',T)}
  vGlow(W,-r*.28,by+r*.16,r*(1.1+pu*.3),'255,230,120',.3*pu);
  /* ปีกหลัง */for(const[k,c]of[[-.3,'rgba(220,240,255,.4)'],[0,'rgba(230,248,255,.55)']]){g.save();g.translate(0,by-r*.18);g.rotate(-2.1+wf*.4+k);vS(W,[[0,0],['q',r*.3,-r*.24,r*.66,-r*.06],['q',r*.4,r*.14,0,0]],W?'#fff':c,1,.5);g.restore()}
  /* โคมดาว */g.save();g.translate(-r*.3,by+r*.16);g.rotate(-.3+Math.sin(T*2)*.08);const s=(.92+pu*.1)*1.3;g.scale(s,s);vGlow(W,0,0,r*.6,'255,240,140',.5*pu);
  g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.2:r*.42;g.lineTo(Math.cos(a)*q,Math.sin(a)*q)}g.closePath();g.fillStyle=W?'#fff':'#ffe46a';g.fill();g.lineWidth=.8;g.strokeStyle='#8a6a1a';g.stroke();
  wStar(W,0,0,r*.24,r*.11,'#fffbe0');g.restore();
  /* ตัว + ขา */vS(W,[[-r*.14,by-r*.02],['q',-r*.1,by-r*.22,r*.12,by-r*.2],['q',r*.26,by-r*.08,r*.18,by+r*.08],['q',0,by+r*.16,-r*.14,by-r*.02]],'#3a3458');for(let i=0;i<3;i++)vK(W,[[-r*.04+i*r*.1,by+r*.08],[-r*.06+i*r*.1,by+r*.24]],'#2a2440',r*.035);
  /* หัว */const hx=r*.3,hy=by-r*.12;vS(W,[[hx-r*.2,hy],['q',hx-r*.2,hy-r*.22,hx,hy-r*.22],['q',hx+r*.22,hy-r*.22,hx+r*.22,hy],['q',hx+r*.22,hy+r*.2,hx,hy+r*.2],['q',hx-r*.2,hy+r*.2,hx-r*.2,hy]],'#4a4270');
  vEye(W,hx+r*.02,hy-r*.02,r*.07,r*.09,'#1a1430',0);vEye(W,hx+r*.15,hy-r*.02,r*.06,r*.08,'#1a1430',0);if(!W){g.fillStyle='rgba(255,150,180,.6)';g.beginPath();g.ellipse(hx+r*.12,hy+r*.1,r*.05,r*.03,0,0,7);g.fill()}
  for(const d of[0,1]){const ex=hx+r*(.1+d*.16),ey=hy-r*(.48-d*.04);vK(W,[[hx+r*(.02+d*.08),hy-r*.18],['q',hx+r*(.04+d*.14),hy-r*.4,ex,ey]],'#3a3458',r*.03);vGlow(W,ex,ey,r*.16,'255,240,150',.5);wStar(W,ex,ey,r*.08,r*.035,'#fff2a0',T*2+d)}
  return true};
MV1D[152]=(r,T,W,bob,sw,la,ra)=>{/* เต่าเกาะดาว: กระดองเป็นเกาะหิน หญ้าบนหลัง ต้นไม้เล็ก ผลึกอุกกาบาตเรือง ดอกไม้ หัวเต่าชรา */const b=bob*.4;
  const SK='#6e8e5a',SD='#4e6a40',RK='#7a7266',RD='#585248',GR='#5aa040',GL='#7cc458';
  /* ขาไกล */for(const[x,l]of[[-r*.46,ra],[r*.3,la]])vS(W,[[x-r*.12,r*.3+b],[x+r*.14,r*.3+b],['q',x+r*.18,r*.6,x+r*.13,r*.84-l],['q',x,r*.88-l,x-r*.13,r*.84-l],['q',x-r*.18,r*.6,x-r*.12,r*.3+b]],SD,1,.8);
  /* หาง */vS(W,[[-r*.66,r*.2+b],[-r*.92,r*.36+b],[-r*.62,r*.34+b]],SK,1,.6);
  /* กระดองหินด้านข้าง */vS(W,[[-r*.78,r*.3+b],['q',-r*.84,-r*.1+b,-r*.56,-r*.36+b],[r*.4,-r*.38+b],['q',r*.66,-r*.12+b,r*.62,r*.3+b],['q',0,r*.44+b,-r*.78,r*.3+b]],RK);
  for(const y of[-.12,.08])vK(W,[[-r*.78,y*r+b],['q',-r*.1,y*r+r*.1+b,r*.6,y*r+b]],'rgba(50,44,36,.5)',r*.035);
  vD(W,[[-r*.8,r*.24+b],['q',0,r*.4+b,r*.64,r*.24+b],['q',r*.62,r*.32+b,r*.6,r*.34+b],['q',0,r*.5+b,-r*.78,r*.34+b]],RD);
  /* หญ้าบนหลัง */vS(W,[[-r*.62,-r*.3+b],['q',-r*.5,-r*.62+b,-r*.04,-r*.64+b],['q',r*.44,-r*.62+b,r*.5,-r*.3+b],[r*.42,-r*.18+b],[r*.32,-r*.28+b],[r*.2,-r*.14+b],[r*.06,-r*.3+b],[-r*.12,-r*.16+b],[-r*.26,-r*.3+b],[-r*.44,-r*.18+b],[-r*.52,-r*.3+b]],GR);
  for(let i=0;i<6;i++){const x=-r*.5+i*r*.18;vK(W,[[x,-r*.52+b],[x+r*.03,-r*.64+b]],GL,r*.035)}
  /* ดอกไม้ */for(const[x,c]of[[-.42,'#ffb0d0'],[.32,'#fff0a0'],[-.1,'#b0d8ff']]){const y=-r*.6+b;for(let i=0;i<5;i++){const a=i*1.256;vD(W,[[x*r,y],['q',x*r+Math.cos(a-.4)*r*.07,y+Math.sin(a-.4)*r*.07,x*r+Math.cos(a)*r*.07,y+Math.sin(a)*r*.07],['q',x*r+Math.cos(a+.4)*r*.07,y+Math.sin(a+.4)*r*.07,x*r,y]],c)}if(!W){g.fillStyle='#ffd040';g.beginPath();g.arc(x*r,y,r*.025,0,7);g.fill()}}
  /* ต้นไม้เล็ก */const tx=-r*.2,ty=-r*.6+b,sw2=Math.sin(T*1.5)*r*.03;vLimb(W,[tx,ty,tx+r*.02,ty-r*.2,tx-r*.02+sw2,ty-r*.36],'#6a4a2a',r*.08,r*.05);
  for(const[x,y,q,c]of[[-.14,-.36,.18,'#3e7e34'],[.1,-.42,.16,'#4a9040'],[0,-.54,.18,'#5aa448']])vS(W,[[tx+x*r-q*r+sw2,ty+y*r],['q',tx+x*r-q*r+sw2,ty+y*r-q*r,tx+x*r+sw2,ty+y*r-q*r],['q',tx+x*r+q*r+sw2,ty+y*r-q*r,tx+x*r+q*r+sw2,ty+y*r],['q',tx+x*r+sw2,ty+y*r+q*r*.8,tx+x*r-q*r+sw2,ty+y*r]],c);
  /* ผลึกอุกกาบาต */const cx=r*.16,cy=-r*.62+b,pu=.6+.4*Math.sin(T*3);vGlow(W,cx,cy-r*.16,r*.5,'140,210,255',.4*pu);vS(W,[[cx-r*.1,cy],[cx-r*.04,cy-r*.42],[cx+r*.06,cy-r*.46],[cx+r*.1,cy]],'#9ad8ff',1,.7);vD(W,[[cx-r*.04,cy-r*.42],[cx+r*.06,cy-r*.46],[cx+r*.01,cy]],W?'#fff':'#dff4ff');
  vS(W,[[cx+r*.08,cy],[cx+r*.16,cy-r*.22],[cx+r*.2,cy]],'#7ac0f0',1,.6);if(!W){const p=(T*.7)%1;wStar(W,cx+r*.04,cy-r*.5-p*r*.3,r*.06*(1-p),r*.025*(1-p),'rgba(220,240,255,'+(1-p)+')',T)}
  /* ขาใกล้ */for(const[x,l]of[[-r*.36,la],[r*.4,ra]]){vS(W,[[x-r*.14,r*.28+b],[x+r*.14,r*.28+b],['q',x+r*.22,r*.58,x+r*.16,r*.86-l],['q',x,r*.9-l,x-r*.16,r*.86-l],['q',x-r*.22,r*.58,x-r*.14,r*.28+b]],SK);for(let i=0;i<3;i++)vD(W,[[x-r*.12+i*r*.1,r*.86-l],[x-r*.08+i*r*.1,r*.92-l],[x-r*.04+i*r*.1,r*.86-l]],'#e8e0c8');vK(W,[[x-r*.12,r*.56],[x+r*.12,r*.54]],'rgba(40,56,30,.4)',r*.03)}
  /* หัว */const hx=r*.82,hy=r*.04+b+Math.sin(T*1.2)*r*.03;vLimb(W,[r*.52,r*.16+b,r*.68,r*.1+b,hx-r*.1,hy],SK,r*.26,r*.22);vK(W,[[r*.6,r*.04+b],['q',r*.64,r*.14+b,r*.6,r*.24+b]],'rgba(40,56,30,.45)',r*.03);
  vS(W,[[hx-r*.18,hy+r*.02],['q',hx-r*.14,hy-r*.2,hx+r*.08,hy-r*.18],['q',hx+r*.26,hy-r*.12,hx+r*.24,hy+r*.04],['q',hx+r*.16,hy+r*.16,hx-r*.04,hy+r*.14],['q',hx-r*.16,hy+r*.12,hx-r*.18,hy+r*.02]],SK);
  vK(W,[[hx+r*.06,hy+r*.06],[hx+r*.24,hy+r*.04]],'#2a3a20',r*.03);vEye(W,hx+r*.06,hy-r*.06,r*.045,r*.05,'#2a2a1a',0);vK(W,[[hx-r*.04,hy-r*.14],['q',hx+r*.06,hy-r*.18,hx+r*.12,hy-r*.12]],'#e8e4d8',r*.04);
  return true};

/* ================= 16: ป่าผลึกสายฟ้า ================= */
MV1D[160]=(r,T,W,bob,sw,la,ra)=>{/* หมาป่าสายฟ้า: ขนน้ำเงินเข้ม แผงคอสายฟ้าเหลือง ผลึกฟ้าที่บ่า หางปลายสายฟ้า ไฟฟ้าแลบ */const b=bob*.6+r*.2,ph=T*7;
  const BD='#22305c',BL='#3a4e86',FAR='#18224a',YL='#ffe24a',CY='#8ae8ff';
  /* หาง */const tw=Math.sin(T*4)*r*.08;vS(W,[[-r*.56,-r*.18+b],['q',-r*.9,-r*.34+b+tw,-r*1.12,-r*.12+b+tw],['q',-r*.92,-r*.02+b,-r*.56,-r*.02+b]],BD);vS(W,[[-r*.96,-r*.2+b+tw],[-r*1.06,-r*.3+b+tw],[-r*1.02,-r*.2+b+tw],[-r*1.2,-r*.16+b+tw],[-r*1.0,-r*.08+b+tw]],YL,1,.6);
  const leg=(x,a,c,l)=>{const kx=x+Math.sin(a)*r*.12,ky=r*.62,px=x+Math.sin(a)*r*.2;vLimb(W,[x,r*.0+b,kx,ky,px,r*.84-l],c,r*.3,r*.13);vS(W,[[px-r*.06,r*.8-l],[px+r*.12,r*.82-l],[px+r*.1,r*.88-l],[px-r*.06,r*.88-l]],c,1,.6)};
  leg(r*.32,Math.sin(ph+1),FAR,ra*.6);leg(-r*.38,Math.sin(ph+Math.PI+1),FAR,la*.6);
  /* ลำตัว */vS(W,[[-r*.66,-r*.18+b],['c',-r*.4,-r*.42+b,r*.1,-r*.44+b,r*.36,-r*.38+b],['q',r*.6,-r*.26+b,r*.56,r*.0+b],['q',r*.46,r*.3+b,r*.24,r*.26+b],['q',0,r*.12+b,-r*.3,r*.2+b],['q',-r*.62,r*.24+b,-r*.7,r*.0+b],['q',-r*.76,-r*.1+b,-r*.66,-r*.18+b]],BD);
  vD(W,[[-r*.16,r*.1+b],['q',r*.12,r*.0+b,r*.3,r*.16+b],['q',r*.1,r*.12+b,-r*.16,r*.14+b]],BL);for(let i=0;i<4;i++)vK(W,[[-r*.5+i*r*.2,-r*.3+b],['q',-r*.46+i*r*.2,-r*.2+b,-r*.5+i*r*.2,-r*.1+b]],'rgba(80,110,180,.5)',r*.035);
  /* ผลึกที่บ่า */for(const[x,h,a]of[[-.1,.34,-.2],[.06,.26,.15],[-.26,.22,-.4]]){const px=x*r,py=-r*.36+b;g.save();g.translate(px,py);g.rotate(a);vS(W,[[-r*.06,0],[-r*.03,-h*r],[r*.03,-h*r-r*.05],[r*.06,0]],CY,1,.6);vD(W,[[-r*.03,-h*r],[r*.03,-h*r-r*.05],[0,0]],W?'#fff':'#dff8ff');g.restore()}
  /* แผงคอสายฟ้า */vGlow(W,r*.36,-r*.42+b,r*.5,'255,230,90',.3);for(let i=0;i<5;i++){const x=r*(.18+i*.08),y=-r*(.34+Math.sin(i*.8)*.04)+b,h=r*(.38+(i%2)*.14);vS(W,[[x-r*.06,y],[x-r*.12,y-h*.5],[x-r*.04,y-h*.45],[x-r*.12,y-h],[x+r*.04,y-h*.4],[x-r*.02,y-h*.42],[x+r*.04,y]],i%2?'#fff3a0':YL,1,.5)}
  leg(r*.4,Math.sin(ph),BD,la);leg(-r*.32,Math.sin(ph+Math.PI),BD,ra);
  /* หัว */const hx=r*.7,hy=-r*.34+b;vS(W,[[hx-r*.24,hy+r*.16],['q',hx-r*.26,hy-r*.2,hx,hy-r*.22],['q',hx+r*.24,hy-r*.18,hx+r*.48,hy-r*.02],['q',hx+r*.52,hy+r*.06,hx+r*.44,hy+r*.1],['q',hx+r*.2,hy+r*.12,hx+r*.04,hy+r*.26],['q',hx-r*.14,hy+r*.28,hx-r*.24,hy+r*.16]],BD);
  vS(W,[[hx+r*.06,hy+r*.12],['q',hx+r*.26,hy+r*.12,hx+r*.4,hy+r*.12],['q',hx+r*.24,hy+r*.24,hx+r*.08,hy+r*.22]],'#10182e',1,.6);vFang(W,hx+r*.3,hy+r*.12,r*.05,r*.06);vFang(W,hx+r*.18,hy+r*.12,r*.05,r*.06);
  vS(W,[[hx-r*.12,hy-r*.12],[hx-r*.2,hy-r*.48],[hx+r*.06,hy-r*.18]],BD,1,.7);vD(W,[[hx-r*.1,hy-r*.16],[hx-r*.16,hy-r*.38],[hx,hy-r*.18]],YL);
  vD(W,[[hx+r*.46,hy-r*.04],['q',hx+r*.54,hy,hx+r*.48,hy+r*.04]],'#0a0e1a');vEye(W,hx+r*.14,hy-r*.07,r*.075,r*.045,YL,7);
  /* ไฟฟ้าแลบ */if((T*1.3)%1<.35)wBolt(W,-r*.1,-r*.5+b,r*.3,-r*.62+b,4,r*.08,T,1,'#fffbe0',r*.04);
  return true};
MV1D[161]=(r,T,W)=>{/* ค้างคาวผลึก: ปีกเป็นแผ่นผลึกฟ้าเหลี่ยม ขนน้ำเงินเข้ม หูปลายผลึก ตาเรืองฟ้า */const fl=Math.sin(T*12),by=-r*.25+Math.sin(T*3)*r*.1;
  vGlow(W,0,by,r*1.3,'130,220,255',.14);
  const wing=s=>{const tip=-r*(.3+fl*.6),mid=-r*(.08+fl*.3);const P=[[s*r*.24,-r*.1+by],[s*r*.7,mid-r*.24+by],[s*r*1.5,tip+by],[s*r*1.4,tip+r*.5+by],[s*r*1.08,mid+r*.4+by],[s*r*.82,mid+r*.5+by],[s*r*.5,r*.14+by],[s*r*.28,r*.16+by]];
    vS(W,P,'#7ccaf0',1,.9);vD(W,[P[1],P[2],P[3],P[4]],W?'#fff':'#a8e2ff');vD(W,[P[1],P[4],P[5]],W?'#fff':'#5aaee0');vD(W,[P[0],P[1],P[5],P[6]],W?'#fff':'#8ad4f6');
    vK(W,[P[0],P[1],P[2]],'#2a3456',r*.06);vK(W,[P[1],P[4]],'#2a3456',r*.04);vK(W,[P[1],P[5]],'#2a3456',r*.04);vD(W,[[P[2][0],P[2][1]],[P[2][0]+s*r*.1,P[2][1]-r*.06],[P[2][0]+s*r*.02,P[2][1]+r*.08]],'#e8f8ff')};
  wing(-1);wing(1);
  vS(W,[[0,-r*.46+by],['q',r*.42,-r*.42+by,r*.4,by],['q',r*.38,r*.46+by,0,r*.48+by],['q',-r*.38,r*.46+by,-r*.4,by],['q',-r*.42,-r*.42+by,0,-r*.46+by]],'#2a3458');
  vD(W,[[-r*.18,r*.06+by],['q',0,r*.42+by,r*.18,r*.06+by],['q',0,r*.18+by,-r*.18,r*.06+by]],'#4a5a84');
  for(const s of[-1,1]){vS(W,[[s*r*.12,-r*.34+by],[s*r*.3,-r*.86+by],[s*r*.38,-r*.28+by]],'#2a3458',1,.8);vS(W,[[s*r*.24,-r*.64+by],[s*r*.3,-r*.96+by],[s*r*.36,-r*.6+by]],'#a8e2ff',1,.5)}
  vEye(W,-r*.14,-r*.14+by,r*.08,r*.07,'#8af0ff',7);vEye(W,r*.14,-r*.14+by,r*.08,r*.07,'#8af0ff',7);vD(W,[[-r*.06,-r*.02+by],[r*.06,-r*.02+by],[0,r*.04+by]],'#141a2a');vFang(W,-r*.05,r*.06+by,r*.05,r*.09,'#e8f8ff');vFang(W,r*.05,r*.06+by,r*.05,r*.09,'#e8f8ff');
  return true};
MV1D[162]=(r,T,W,bob)=>{/* ภูตผลึกอัสนี: กอผลึกฐาน แกนผลึกใหญ่ลอยมีตา ผลึกเล็กโคจร สายฟ้าเชื่อม (ยิงสายฟ้า) */const by=-r*.36+Math.sin(T*2.4)*r*.06,sp=T*1.3;
  const CY='#8adcff',CL='#d4f4ff',CD='#4a9ad0';
  vGlow(W,0,by,r*1.3,'130,220,255',.22);
  const cr=(x,y,h,w,a,c)=>{g.save();g.translate(x,y);g.rotate(a);vS(W,[[-w,0],[-w*.7,-h],[0,-h-w*.9],[w*.7,-h],[w,0]],c||CY,1,.7);vD(W,[[-w*.7,-h],[0,-h-w*.9],[0,0],[-w,0]],W?'#fff':'rgba(255,255,255,.4)');g.restore()};
  /* กอฐาน */for(const[x,h,w,a]of[[-.34,.32,.1,-.4],[.36,.36,.1,.35],[-.12,.46,.13,-.1],[.14,.5,.14,.12],[0,.3,.1,0]])cr(x*r,r*.86,h*r,w*r,a,x===0?CD:CY);
  const orb=(front)=>{for(let i=0;i<5;i++){const a=sp+i*1.2566,x=Math.cos(a)*r*.8,y=by+Math.sin(a)*r*.22;if((Math.sin(a)>0)!==front)continue;cr(x,y+r*.12,r*.2,r*.06,Math.cos(a)*.3,front?CY:CD);
    if(front&&(Math.floor(T*6)+i)%3===0)wBolt(W,0,by,x,y,4,r*.1,T,i,'#f4ffff',r*.035)}};
  orb(false);
  /* แกนผลึก */vS(W,[[0,by-r*.66],[r*.3,by-r*.2],[r*.24,by+r*.3],[0,by+r*.52],[-r*.24,by+r*.3],[-r*.3,by-r*.2]],CY);vD(W,[[0,by-r*.66],[-r*.3,by-r*.2],[0,by-r*.05]],W?'#fff':CL);vD(W,[[0,by-r*.66],[r*.3,by-r*.2],[0,by-r*.05]],W?'#fff':'#b4e8ff');vD(W,[[-r*.24,by+r*.3],[0,by+r*.52],[0,by-r*.05]],W?'#fff':CD);
  vK(W,[[0,by-r*.66],[r*.3,by-r*.2],[r*.24,by+r*.3],[0,by+r*.52],[-r*.24,by+r*.3],[-r*.3,by-r*.2],[0,by-r*.66]],V1.O,1);
  /* ตา */const pu=.7+.3*Math.sin(T*6);vGlow(W,0,by-r*.06,r*.45,'255,255,200',.5*pu);vS(W,[[-r*.15,by-r*.06],['q',0,by-r*.2,r*.15,by-r*.06],['q',0,by+r*.08,-r*.15,by-r*.06]],'#fffbe0',1,.6);vEye(W,r*.02,by-r*.06,r*.05,r*.07,'#3a7ad0',0);
  orb(true);
  if((T*1.7)%1<.3)wBolt(W,0,by+r*.4,r*.04,r*.62,3,r*.08,T,9,'#f4ffff',r*.035);
  return true};

/* ================= 17: หุบเหวลมหวน ================= */
MV1D[170]=(r,T,W,bob,sw,la,ra)=>{/* ฮาร์ปี้: ปีกขนนกใหญ่ยกเป็นตัววี ผมยาวปลิว ตาเหลือง อกขนนก ขานกกรงเล็บ หางขนนก (ขว้างขนนก) */const b=bob*.6+Math.sin(T*2.6)*r*.04,fw=Math.sin(T*5)*.2;
  const FT='#8a78aa',FD='#5e4e7e',FL='#c6b8dc',SK='#e6d6ea',HR='#3e2456',LG='#e0a040';
  const wing=(s,c,cl)=>{g.save();g.translate(s*r*.12,-r*.36+b);g.rotate(s*fw);
    const P=[[0,r*.04],['q',s*r*.24,-r*.5,s*r*.56,-r*.72],['q',s*r*.86,-r*.86,s*r*1.08,-r*.7]];
    let x=s*r*1.08,y=-r*.7;const E=[[s*.98,-.48],[s*.86,-.3],[s*.7,-.14],[s*.52,-.02],[s*.32,.08],[s*.12,.14]];for(const[ex,ey]of E){const nx=ex*r,ny=ey*r;P.push(['q',(x+nx)/2+s*r*.1,(y+ny)/2+r*.1,nx,ny]);x=nx;y=ny}
    vS(W,P,c);vD(W,[[s*r*.06,-r*.06],['q',s*r*.26,-r*.5,s*r*.56,-r*.66],['q',s*r*.82,-r*.78,s*r*.98,-r*.64],['q',s*r*.66,-r*.48,s*r*.42,-r*.22],['q',s*r*.24,-r*.04,s*r*.06,-r*.06]],cl);
    for(let i=0;i<5;i++){const t=(i+1)/6;vK(W,[[s*r*(.2+t*.6),-r*(.3+t*.36)],[s*r*(.16+t*.8),-r*(.0+t*.5)+r*.14]],'rgba(40,30,60,.45)',r*.03)}g.restore()};
  wing(-1,FD,'#7a6a9a');
  /* หาง */for(let i=0;i<3;i++)wFeather(W,-r*.14,r*.24+b,2.3+i*.24,r*.48,r*.1,i===1?FT:FD,'#3a2e52');
  /* ขา */for(const[s,l,c]of[[-1,la,'#c08a30'],[1,ra,LG]]){const x=s*r*.12;vS(W,[[x-r*.12,r*.2+b],['q',x,r*.12+b,x+r*.12,r*.2+b],[x+r*.08,r*.46+b],[x-r*.08,r*.46+b]],FD,1,.7);vLimb(W,[x,r*.44+b,x+r*.04,r*.64,x,r*.82-l],c,r*.07,r*.05);
    for(const d of[-1,0,1])vK(W,[[x,r*.82-l],['q',x+d*r*.06+r*.04,r*.86-l,x+d*r*.1+r*.06,r*.9-l]],'#2a2018',r*.04)}
  /* ผมหลังหัว */const hx=r*.08,hy=-r*.62+b,hw=Math.sin(T*3)*r*.06;vS(W,[[hx-r*.02,hy-r*.24],['q',hx-r*.42,hy-r*.26,hx-r*.58+hw,hy+r*.02],['q',hx-r*.42,hy+r*.04,hx-r*.54+hw,hy+r*.26],['q',hx-r*.3,hy+r*.18,hx-r*.32+hw,hy+r*.46],['q',hx-r*.14,hy+r*.3,hx-r*.08,hy+r*.14]],HR);
  /* ลำตัวขนนก */vS(W,[[-r*.22,r*.28+b],['q',-r*.3,-r*.1+b,-r*.16,-r*.4+b],['q',r*.06,-r*.48+b,r*.22,-r*.36+b],['q',r*.32,-r*.04+b,r*.2,r*.28+b],['q',0,r*.36+b,-r*.22,r*.28+b]],FT);
  for(let j=0;j<3;j++)for(let i=0;i<3;i++){const x=-r*.12+i*r*.12+(j%2)*r*.06,y=-r*.24+j*r*.15+b;vD(W,[[x-r*.07,y],['q',x,y+r*.12,x+r*.07,y],['q',x,y+r*.05,x-r*.07,y]],FL)}
  /* หน้า */vS(W,[[hx-r*.18,hy-r*.02],['q',hx-r*.18,hy-r*.24,hx+r*.04,hy-r*.24],['q',hx+r*.22,hy-r*.22,hx+r*.22,hy],['q',hx+r*.2,hy+r*.18,hx+r*.04,hy+r*.22],['q',hx-r*.14,hy+r*.18,hx-r*.18,hy-r*.02]],SK);
  vS(W,[[hx-r*.2,hy-r*.02],['q',hx-r*.18,hy-r*.32,hx+r*.08,hy-r*.3],['q',hx+r*.28,hy-r*.26,hx+r*.24,hy-r*.06],[hx+r*.14,hy-r*.14],[hx+r*.06,hy-r*.08],[hx-r*.02,hy-r*.14],[hx-r*.1,hy-r*.02]],HR,1,.7);
  for(const[x,y,a]of[[.0,-.3,-1.9],[.12,-.28,-1.45],[-.12,-.26,-2.35]])wFeather(W,hx+x*r,hy+y*r,a,r*.26,r*.055,'#b0a0d0',null);
  vEye(W,hx+r*.04,hy+r*.0,r*.045,r*.04,'#ffd23a',5);vEye(W,hx+r*.16,hy+r*.0,r*.04,r*.035,'#ffd23a',5);vK(W,[[hx-r*.01,hy-r*.07],[hx+r*.09,hy-r*.04]],'#2a1830',r*.03);
  vK(W,[[hx+r*.07,hy+r*.11],['q',hx+r*.11,hy+r*.13,hx+r*.15,hy+r*.1]],'#7a3a4a',r*.025);
  wing(1,FT,FL);
  return true};
MV1D[171]=(r,T,W)=>{/* พายุหมุนน้อย: กรวยลมเกลียวหลายชั้น ตาโกรธ เศษหิน-ใบไม้หมุนรอบ ฝุ่นที่ปลาย */const by=-r*.2,sp=T*6;
  const deb=front=>{for(let i=0;i<4;i++){const a=sp*.6+i*1.57,h=by-r*(.5-i*.22),rx=r*(.9-i*.12),x=Math.cos(a)*rx,y=h+Math.sin(a)*r*.12;if((Math.sin(a)>0)!==front)continue;
    if(i%2)vS(W,[[x-r*.07,y],[x-r*.02,y-r*.07],[x+r*.07,y-r*.02],[x+r*.03,y+r*.06]],'#8a7a66',1,.5);else vD(W,[[x-r*.08,y],['q',x,y-r*.07,x+r*.08,y],['q',x,y+r*.05,x-r*.08,y]],'#6aa04a')}};
  deb(false);
  /* ฝุ่นปลาย */if(!W){g.fillStyle='rgba(200,190,170,.4)';g.beginPath();g.ellipse(0,r*.62,r*.36+Math.sin(T*8)*r*.04,r*.1,0,0,7);g.fill()}
  /* กรวย */const N=6;for(let i=N-1;i>=0;i--){const k=i/(N-1),y=by-r*.62+k*r*1.2,rx=r*(.78-k*.62),ry=r*(.16-k*.08),ox=Math.sin(T*3+k*3)*r*.12*k;
    vS(W,[[ox-rx,y],['q',ox-rx,y-ry*1.6,ox,y-ry*1.6],['q',ox+rx,y-ry*1.6,ox+rx,y],['q',ox+rx*.9,y+ry*1.8,ox,y+ry*1.6],['q',ox-rx*.9,y+ry*1.8,ox-rx,y]],i%2?'#d4dce6':'#e8eef4',1,.6);
    if(!W)for(let j=0;j<2;j++){const a=(sp+j*3.1+i)%(Math.PI*2);if(Math.sin(a)>0){const x=ox+Math.cos(a)*rx*.8;vK(W,[[x-rx*.3,y+ry*.2],['q',x,y+ry*.9,x+rx*.3,y+ry*.2]],'rgba(120,140,160,.6)',r*.035)}}}
  /* หน้าโกรธ */const fy=by-r*.36,fx=Math.sin(T*3+.8)*r*.04;for(const s of[-1,1]){vS(W,[[fx+s*r*.06,fy],['q',fx+s*r*.18,fy-r*.1,fx+s*r*.28,fy-r*.02],['q',fx+s*r*.18,fy+r*.1,fx+s*r*.06,fy]],'#fff',1,.6);vEye(W,fx+s*r*.17,fy,r*.05,r*.05,'#d02a2a',4);vK(W,[[fx+s*r*.04,fy-r*.1],[fx+s*r*.3,fy-r*.18]],'#3a4a5a',r*.06)}
  vK(W,[[fx-r*.1,fy+r*.18],['q',fx,fy+r*.12,fx+r*.1,fy+r*.18]],'#3a4a5a',r*.05);
  deb(true);return true};
MV1D[172]=(r,T,W,bob,sw,la,ra)=>{/* ยักษ์เขาหิน: หลังค่อมบ่าใหญ่ เขาแกะม้วน ผิวหินมีมอส ตาส้มเรือง หมัดค้อนหิน ผ้าขนสัตว์ */const b=bob*.6;
  const ST='#8e7e6a',SD='#62564a',SL='#ab9c86',HN='#e2d6b8',MS='#6a8a44';
  /* แขนหลัง */vLimb(W,[-r*.42,-r*.42+b,-r*.66,-r*.04+b,-r*.6,r*.3+b-sw*.4],SD,r*.32,r*.24);vS(W,[[-r*.8,r*.24+b-sw*.4],['q',-r*.82,r*.06+b,-r*.6,r*.1+b-sw*.4],['q',-r*.38,r*.16+b,-r*.42,r*.38+b-sw*.4],['q',-r*.5,r*.56+b-sw*.4,-r*.66,r*.54+b-sw*.4],['q',-r*.84,r*.48+b,-r*.8,r*.24+b-sw*.4]],SD);
  /* ขา */for(const[s,l,c]of[[-1,la,SD],[1,ra,ST]]){const x=s*r*.24;vS(W,[[x-r*.17,r*.3+b],[x+r*.17,r*.3+b],['q',x+r*.22,r*.6,x+r*.2,r*.86-l],[x-r*.2,r*.86-l],['q',x-r*.22,r*.6,x-r*.17,r*.3+b]],c);for(let i=0;i<3;i++)vD(W,[[x-r*.15+i*r*.1,r*.86-l],[x-r*.12+i*r*.1,r*.92-l],[x-r*.07+i*r*.1,r*.86-l]],'#3a3228')}
  /* ลำตัวค่อม */vS(W,[[-r*.5,r*.36+b],['q',-r*.66,-r*.2+b,-r*.4,-r*.6+b],['q',0,-r*.8+b,r*.4,-r*.62+b],['q',r*.62,-r*.3+b,r*.46,r*.36+b],['q',0,r*.46+b,-r*.5,r*.36+b]],ST);
  vD(W,[[-r*.2,-r*.3+b],['q',r*.1,-r*.42+b,r*.36,-r*.3+b],['q',r*.3,-r*.06+b,r*.1,-r*.04+b],['q',-r*.12,-r*.08+b,-r*.2,-r*.3+b]],SL);
  for(const[x,y]of[[-.36,-.2],[.3,.1],[-.12,.16],[.04,-.56]])vK(W,[[x*r-r*.06,y*r+b],[x*r,y*r+r*.04+b],[x*r+r*.07,y*r+b]],'rgba(40,32,24,.55)',r*.035);
  for(const[x,y,q]of[[-.38,-.52,.14],[.1,-.66,.12],[-.48,.0,.08]])vD(W,[[x*r-q*r,y*r+b],['q',x*r,y*r-q*r*.8+b,x*r+q*r,y*r+b],['q',x*r,y*r+q*r*.5+b,x*r-q*r,y*r+b]],MS);
  /* ผ้าขนสัตว์ */vS(W,[[-r*.46,r*.16+b],[r*.44,r*.16+b],[r*.4,r*.38+b],[r*.28,r*.48+b],[r*.12,r*.38+b],[-r*.04,r*.5+b],[-r*.2,r*.38+b],[-r*.34,r*.48+b],[-r*.46,r*.36+b]],'#7a5a3a');vK(W,[[-r*.46,r*.18+b],[r*.44,r*.18+b]],'#4a3420',r*.06);
  /* หัว (ต่ำ ยื่นหน้า) */const hx=r*.48,hy=-r*.64+b;
  /* เขาม้วน */const horn=(ox,oy,c,k)=>{const cx=hx-r*.12+ox,cy=hy-r*.02+oy,P=[];for(let i=0;i<=14;i++){const t=i/14,a=-.55-t*4.9,R=r*(.3-t*.17)*k;P.push(cx+Math.cos(a)*R,cy+Math.sin(a)*R)}vLimb(W,P,c,r*.17*k,r*.05*k);
    for(let i=3;i<12;i+=3){const x=P[i*2],y=P[i*2+1],a=-.55-i/14*4.9;vK(W,[[x-Math.cos(a)*r*.07*k,y-Math.sin(a)*r*.07*k],[x+Math.cos(a)*r*.07*k,y+Math.sin(a)*r*.07*k]],'rgba(110,96,70,.55)',r*.03)}};
  vS(W,[[hx-r*.22,hy+r*.12],['q',hx-r*.22,hy-r*.18,hx+r*.04,hy-r*.2],['q',hx+r*.28,hy-r*.18,hx+r*.32,hy+r*.06],['q',hx+r*.3,hy+r*.26,hx+r*.08,hy+r*.28],['q',hx-r*.16,hy+r*.26,hx-r*.22,hy+r*.12]],SL);
  vK(W,[[hx-r*.04,hy-r*.06],[hx+r*.28,hy-r*.04]],SD,r*.07);vEye(W,hx+r*.06,hy+r*.01,r*.05,r*.035,'#ff9a2a',6);vEye(W,hx+r*.2,hy+r*.02,r*.045,r*.035,'#ff9a2a',6);
  vD(W,[[hx+r*.12,hy+r*.12],['q',hx+r*.22,hy+r*.1,hx+r*.28,hy+r*.16],['q',hx+r*.2,hy+r*.22,hx+r*.12,hy+r*.12]],'#3a2e24');vFang(W,hx+r*.04,hy+r*.2,r*.05,r*.08,'#efe6d0');vFang(W,hx+r*.22,hy+r*.2,r*.05,r*.08,'#efe6d0');
  horn(0,0,HN,1);
  /* แขนหน้า + หมัดค้อน */const fy=r*.24+b+sw*.5;vLimb(W,[r*.24,-r*.3+b,r*.62,-r*.04+b,r*.64,fy-r*.1],ST,r*.3,r*.24);
  vS(W,[[r*.42,fy],['q',r*.4,fy-r*.24,r*.64,fy-r*.24],['q',r*.9,fy-r*.24,r*.9,fy],['q',r*.9,fy+r*.26,r*.66,fy+r*.26],['q',r*.42,fy+r*.26,r*.42,fy]],SL);for(let i=0;i<3;i++)vK(W,[[r*(.52+i*.12),fy-r*.2],[r*(.52+i*.12),fy-r*.06]],'rgba(40,32,24,.5)',r*.03);
  return true};

/* ================= 18: ซากวิหารพายุ ================= */
MV1D[180]=(r,T,W,bob,sw,la,ra)=>{/* อัศวินวิหารพายุ: เกราะเงิน ผ้าคลุมน้ำเงิน เสื้อคลุมตราสายฟ้า หมวกพู่ ดาบสายฟ้า */const b=bob*.6,fl=Math.sin(T*3)*r*.04;
  const AR='#c4ccdc',AD='#8890a6',BL='#2a4c9e',BD='#1c3270',YL='#ffe04a';
  /* ผ้าคลุม */vS(W,[[-r*.26,-r*.5+b],['q',-r*.58,-r*.1+b,-r*.62+fl,r*.62],[-r*.44,r*.52],[-r*.34,r*.68],[-r*.22,r*.5],[-r*.1,r*.6],['q',-r*.08,0,-r*.04,-r*.5+b]],BD);
  /* ขา */for(const[s,l,c]of[[-1,la,AD],[1,ra,AR]]){const x=s*r*.14;vLimb(W,[x,r*.2+b,x+s*r*.02,r*.52,x,r*.82-l],c,r*.18,r*.15);vS(W,[[x-r*.1,r*.78-l],[x+r*.16,r*.8-l],[x+r*.15,r*.9-l],[x-r*.1,r*.9-l]],AD,1,.7)}
  /* แขนหลัง */vLimb(W,[-r*.26,-r*.4+b,-r*.36,-r*.1+b,-r*.28,r*.12+b-sw*.4],AD,r*.14,r*.11);
  /* ลำตัว + เสื้อคลุม */vS(W,[[-r*.28,-r*.5+b],['q',0,-r*.58+b,r*.28,-r*.5+b],['q',r*.32,-r*.1+b,r*.24,r*.12+b],[-r*.24,r*.12+b],['q',-r*.32,-r*.1+b,-r*.28,-r*.5+b]],AR);
  vS(W,[[-r*.16,-r*.46+b],[r*.16,-r*.46+b],[r*.2,r*.46+b],[r*.04,r*.4+b],[-r*.08,r*.48+b],[-r*.2,r*.42+b]],BL);vK(W,[[-r*.16,-r*.46+b],[-r*.2,r*.42+b]],YL,r*.025);vK(W,[[r*.16,-r*.46+b],[r*.2,r*.46+b]],YL,r*.025);
  vGlow(W,0,-r*.12+b,r*.3,'255,230,90',.25);vS(W,[[r*.04,-r*.34+b],[-r*.08,-r*.1+b],[r*.0,-r*.1+b],[-r*.06,r*.12+b],[r*.1,-r*.16+b],[r*.02,-r*.16+b],[r*.1,-r*.34+b]],YL,1,.5);
  vS(W,[[-r*.26,r*.06+b],[r*.26,r*.06+b],[r*.26,r*.14+b],[-r*.26,r*.14+b]],'#5a3e24',1,.6);vS(W,[[-r*.04,r*.05+b],[r*.06,r*.05+b],[r*.06,r*.15+b],[-r*.04,r*.15+b]],'#d8b05a',1,.5);
  /* บ่า */for(const[s,c]of[[-1,AD],[1,AR]])vS(W,[[s*r*.1,-r*.54+b],['q',s*r*.42,-r*.64+b,s*r*.44,-r*.34+b],['q',s*r*.26,-r*.3+b,s*r*.1,-r*.4+b]],c);
  /* หมวก + พู่ */const hy=-r*.72+b;vS(W,[[-r*.06,hy-r*.2],['q',-r*.3,hy-r*.44+fl,-r*.5,hy-r*.2+fl],['q',-r*.36,hy-r*.26,-r*.2,hy-r*.12]],BL,1,.7);
  vS(W,[[-r*.19,hy+r*.18],['q',-r*.22,hy-r*.18,0,hy-r*.22],['q',r*.22,hy-r*.18,r*.21,hy+r*.18],['q',0,hy+r*.26,-r*.19,hy+r*.18]],AR);vK(W,[[0,hy-r*.22],[0,hy-r*.04]],YL,r*.035);
  vD(W,[[-r*.13,hy-r*.02],[r*.17,hy-r*.02],[r*.17,hy+r*.05],[-r*.13,hy+r*.05]],'#141826');vD(W,[[r*.04,hy-r*.02],[r*.1,hy-r*.02],[r*.1,hy+r*.16],[r*.04,hy+r*.16]],'#141826');
  vGlow(W,r*.06,hy+r*.02,r*.26,'140,230,255',.4);vK(W,[[-r*.08,hy+r*.015],[r*.14,hy+r*.015]],W?'#fff':'#9ae8ff',r*.035);
  /* แขนหน้า + ดาบสายฟ้า */const hx=r*.46,hy2=-r*.04+b+sw*.6;vLimb(W,[r*.32,-r*.4+b,r*.46,-r*.2+b,hx,hy2],AR,r*.15,r*.12);
  const bl=-.95+sw*.08,ca=Math.cos(bl),sa=Math.sin(bl),L=r*.95;g.save();g.translate(hx,hy2);vGlow(W,ca*L*.6,sa*L*.6,r*.5,'140,230,255',.35);
  vS(W,[[-sa*r*.06,ca*r*.06],[ca*L-sa*r*.02,sa*L+ca*r*.02],[ca*(L+r*.12),sa*(L+r*.12)],[ca*L+sa*r*.02,sa*L-ca*r*.02],[sa*r*.06,-ca*r*.06]],'#e8f6ff',1,.7);vK(W,[[-sa*r*.18,ca*r*.18],[sa*r*.18,-ca*r*.18]],'#d8b05a',r*.07);vK(W,[[0,0],[-ca*r*.18,-sa*r*.18]],'#3a2a20',r*.07);
  if((T*2)%1<.5)wBolt(W,ca*r*.2,sa*r*.2,ca*L,sa*L,5,r*.08,T,3,'#fffbe0',r*.03);g.restore();
  vS(W,[[hx-r*.07,hy2-r*.06],[hx+r*.07,hy2-r*.06],[hx+r*.07,hy2+r*.06],[hx-r*.07,hy2+r*.06]],AD,1,.6);
  return true};
MV1D[181]=(r,T,W)=>{/* นกฟ้าผ่า: ลูกนกกลมขนฟูเหลือง หงอนสายฟ้า ปีกเล็กปลายหยัก หางหยัก ประกายไฟฟ้ารอบตัว */const by=-r*.3+Math.sin(T*4)*r*.1,fp=Math.sin(T*16);
  const YL='#ffd23a',YD='#e8a820',YW='#fff6c0';
  vGlow(W,0,by,r*1.1,'255,230,90',.18);
  /* หางหยัก */vS(W,[[-r*.36,by+r*.06],[-r*.7,by-r*.1],[-r*.6,by+r*.02],[-r*.84,by+r*.02],[-r*.6,by+r*.14],[-r*.7,by+r*.22],[-r*.34,by+r*.2]],YD,1,.6);
  /* ปีกไกล */g.save();g.translate(-r*.06,by-r*.04);g.rotate(-.6-fp*.6);vS(W,[[0,0],[-r*.2,-r*.32],[-r*.12,-r*.3],[-r*.24,-r*.5],[-r*.02,-r*.36],[r*.06,-r*.06]],YD,1,.6);g.restore();
  /* ตัวกลมขนฟู */vS(W,[[0,by-r*.46],['q',r*.48,by-r*.44,r*.46,by],['q',r*.44,by+r*.44,0,by+r*.44],['q',-r*.46,by+r*.44,-r*.46,by],['q',-r*.46,by-r*.44,0,by-r*.46]],YL);
  for(let i=0;i<7;i++){const a=.4+i*.42,x=Math.cos(a)*r*.4,y=by+Math.sin(a)*r*.4;vD(W,[[x-Math.sin(a)*r*.06,y+Math.cos(a)*r*.06],[x+Math.cos(a)*r*.1,y+Math.sin(a)*r*.1],[x+Math.sin(a)*r*.06,y-Math.cos(a)*r*.06]],YL)}
  vD(W,[[-r*.1,by+r*.06],['q',r*.14,by+r*.0,r*.32,by+r*.16],['q',r*.1,by+r*.4,-r*.1,by+r*.06]],YW);
  /* หงอนสายฟ้า */vS(W,[[-r*.06,by-r*.4],[-r*.18,by-r*.76],[-r*.06,by-r*.66],[-r*.08,by-r*.92],[r*.1,by-r*.6],[r*.0,by-r*.62],[r*.12,by-r*.42]],'#fff3a0',1,.6);vS(W,[[r*.08,by-r*.4],[r*.14,by-r*.64],[r*.22,by-r*.56],[r*.22,by-r*.38]],YD,1,.5);
  /* หน้า */vEye(W,r*.16,by-r*.12,r*.07,r*.08,'#1a1410',0);vK(W,[[r*.06,by-r*.26],[r*.26,by-r*.2]],'#6a4a10',r*.04);
  vS(W,[[r*.36,by-r*.06],[r*.6,by+r*.0],[r*.36,by+r*.08]],'#f08a2a',1,.6);vK(W,[[r*.36,by+r*.01],[r*.54,by+r*.01]],'#a84a10',r*.02);
  /* ปีกใกล้ */g.save();g.translate(-r*.02,by+r*.04);g.rotate(-.3+fp*.7);vS(W,[[0,0],['q',-r*.3,-r*.06,-r*.44,-r*.2],[-r*.36,-r*.1],[-r*.5,-r*.06],[-r*.34,r*.0],[-r*.44,r*.1],['q',-r*.2,r*.14,0,r*.1]],YD,1,.6);g.restore();
  /* ประกายไฟฟ้า */if((T*2.4)%1<.4){wBolt(W,-r*.4,by-r*.4,-r*.7,by-r*.6,3,r*.06,T,1,'#bff4ff',r*.03);wBolt(W,r*.36,by+r*.34,r*.62,by+r*.52,3,r*.06,T,2,'#bff4ff',r*.03)}
  return true};
MV1D[182]=(r,T,W)=>{/* นักบวชพายุ: ลอยตัว ฮู้ดเงาตาเรืองฟ้า เสื้อคลุมครามขอบเงินทอง ผ้าพันคอปลิว ไม้เท้าจันทร์เสี้ยวกุมลูกแก้วพายุ หินอักขระโคจร (ยิงลูกแก้วพายุ) */const by=-r*.12+Math.sin(T*2)*r*.06,wv=Math.sin(T*3);
  const RB='#2c2c62',RD='#1c1c44',TR='#c8ccdc',GD='#d8b05a',CY='#8ae8ff';
  const rune=front=>{for(let i=0;i<3;i++){const a=T*1.4+i*2.09,x=Math.cos(a)*r*.82,y=by-r*.3+Math.sin(a)*r*.2;if((Math.sin(a)>0)!==front)continue;vS(W,[[x-r*.09,y-r*.1],[x+r*.08,y-r*.12],[x+r*.1,y+r*.08],[x-r*.08,y+r*.1]],'#6a6e86',1,.6);vK(W,[[x-r*.03,y-r*.06],[x+r*.03,y],[x-r*.02,y+r*.06]],W?'#fff':CY,r*.03)}};
  vGlow(W,0,by-r*.2,r*1.1,'130,200,255',.14);rune(false);
  /* ผ้าพันคอปลิว */for(const[d,c]of[[0,'#3a3a80'],[1,'#4848a0']])vS(W,[[-r*.12,-r*.56+by],['q',-r*.5,-r*.5+by+wv*r*.1,-r*.86,-r*.34+by+wv*r*.16-d*r*.08],[-r*.8,-r*.24+by+wv*r*.16-d*r*.08],['q',-r*.46,-r*.36+by,-r*.1,-r*.44+by]],c,1,.6);
  /* เสื้อคลุมลอย ชายขาด */const L=[[-r*.3,-r*.5+by],['q',-r*.46,r*.0+by,-r*.5,r*.5+by],[-r*.36,r*.42+by+wv*r*.04],[-r*.26,r*.64+by],[-r*.12,r*.5+by-wv*r*.04],[0,r*.7+by],[r*.12,r*.5+by+wv*r*.04],[r*.26,r*.62+by],[r*.36,r*.42+by],[r*.48,r*.48+by-wv*r*.04],['q',r*.44,r*.0+by,r*.3,-r*.5+by]];
  vS(W,L,RB);vK(W,[[-r*.06,-r*.4+by],[-r*.06,r*.56+by]],TR,r*.05);vK(W,[[r*.08,-r*.4+by],[r*.1,r*.5+by]],GD,r*.035);
  for(let i=0;i<3;i++){const y=-r*.1+i*r*.2+by;vK(W,[[-r*.04,y],[r*.06,y-r*.03]],GD,r*.03)}
  if(!W){g.fillStyle='rgba(140,220,255,.25)';for(let i=0;i<3;i++){const p=(T*.8+i*.33)%1;g.beginPath();g.arc(-r*.3+i*r*.3,r*.66+by+p*r*.2,r*.06*(1-p),0,7);g.fill()}}
  /* ไหล่ + ปก */vS(W,[[-r*.34,-r*.42+by],['q',0,-r*.6+by,r*.34,-r*.42+by],['q',r*.2,-r*.3+by,0,-r*.32+by],['q',-r*.2,-r*.3+by,-r*.34,-r*.42+by]],RD);vK(W,[[-r*.32,-r*.42+by],['q',0,-r*.36+by,r*.32,-r*.42+by]],TR,r*.035);
  /* ฮู้ด */const hy=-r*.66+by;vS(W,[[-r*.24,hy+r*.2],['q',-r*.28,hy-r*.18,-r*.02,hy-r*.34],['q',r*.08,hy-r*.38,r*.22,hy-r*.12],['q',r*.3,hy+r*.06,r*.24,hy+r*.22],['q',0,hy+r*.3,-r*.24,hy+r*.2]],RB);
  vD(W,[[-r*.12,hy+r*.16],['q',-r*.12,hy-r*.12,r*.06,hy-r*.12],['q',r*.2,hy-r*.08,r*.18,hy+r*.16],['q',r*.04,hy+r*.22,-r*.12,hy+r*.16]],'#0a0a18');vK(W,[[-r*.22,hy+r*.18],['q',-r*.24,hy-r*.18,-r*.02,hy-r*.32]],TR,r*.035);
  vGlow(W,r*.04,hy+r*.02,r*.3,'140,230,255',.45);vEye(W,-r*.02,hy+r*.03,r*.04,r*.03,CY,6);vEye(W,r*.1,hy+r*.03,r*.04,r*.03,CY,6);
  rune(true);
  /* ไม้เท้า */const sx=r*.5,sy=-r*.06+by;vK(W,[[sx,sy+r*.7],[sx+r*.02,sy-r*.8]],'#5a3e2a',r*.07);vK(W,[[sx,sy+r*.7],[sx+r*.02,sy-r*.8]],'rgba(255,255,255,.15)',r*.02);
  const oy=sy-r*.98;vS(W,[[sx-r*.2,oy+r*.2],['q',sx-r*.28,oy-r*.16,sx-r*.04,oy-r*.28],['q',sx-r*.18,oy-r*.12,sx-r*.12,oy+r*.14],[sx+r*.02,oy+r*.2]],GD,1,.6);
  const pu=.7+.3*Math.sin(T*7);vGlow(W,sx+r*.02,oy,r*.55,'140,220,255',.55*pu);vS(W,[[sx-r*.13,oy],['q',sx-r*.13,oy-r*.15,sx+r*.02,oy-r*.15],['q',sx+r*.17,oy-r*.15,sx+r*.17,oy],['q',sx+r*.17,oy+r*.15,sx+r*.02,oy+r*.15],['q',sx-r*.13,oy+r*.15,sx-r*.13,oy]],'#bff0ff',1,.6);
  if(!W){g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.arc(sx-r*.03,oy-r*.05,r*.04,0,7);g.fill()}wBolt(W,sx-r*.08,oy+r*.06,sx+r*.12,oy-r*.08,3,r*.05,T,5,'#ffffff',r*.025);
  /* มือ */vS(W,[[sx-r*.12,sy-r*.04],[sx+r*.08,sy-r*.06],[sx+r*.08,sy+r*.08],[sx-r*.1,sy+r*.08]],'#d8c8b8',1,.6);vS(W,[[r*.24,-r*.38+by],['q',r*.46,-r*.2+by,sx-r*.06,sy-r*.06],[sx-r*.1,sy+r*.1],['q',r*.3,-r*.06+by,r*.18,-r*.2+by]],RB,1,.8);
  return true};
