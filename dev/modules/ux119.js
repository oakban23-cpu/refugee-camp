/* ---------- v511 บอสใหญ่วาดใหม่ ชุด 1: ราชินีผู้กลืนดาว · ราชินีที่เหลือแต่เปลือก ----------
   แบบเดียวกันสองร่าง: ร่างจริง (ศึกปิดรอยแยก) กับเปลือกที่เหลือ (ภาค 7 รังเปลือก) · ใช้ระบบ BV1 ของ v504
   ท่าตามกลไก: ร่ายสกิล = อ้าปากอกกว้าง ยกแขน · «เอียงหัวฟังเสียง» (QSIL) = เอียงหัว มือป้องหู คลื่นเสียง ·
   «ลืมตาที่ไม่มีอยู่จริง» (EYEG) = ตาที่สามกลางหน้าผากลืม · เปลือก: กลืนดาวสะสม (qsb) หลุมดำโตขึ้น · สูดลม (QSFX.inh) ปีก/ผมถูกดูดเข้า */
function qnDraw(T,W,br,sw,up,cf,SH){const fy=-38+Math.sin(T*1.0)*5,O=BV.O;
  const qn=typeof QUEEN==='function'&&QUEEN();
  const L=qn&&typeof QSIL!=='undefined'&&QSIL?Math.min(1,(QSIL.d-QSIL.t)/.35,Math.max(0,QSIL.t)/.35+0):0;
  const EY=qn&&typeof EYEG!=='undefined'&&EYEG&&!EYEG.flash?Math.min(1,(EYEG.d-EYEG.t)/.5):qn&&typeof EYEG!=='undefined'&&EYEG&&EYEG.flash?1:0;
  const st=SH?SH.st:0,inh=SH?SH.inh:0,mo=Math.min(1.6,.5+.4*Math.abs(Math.sin(T*1.3))+cf*.6+inh*.6);
  const GW=SH?'#5e4e78':'#2a1048',GD=SH?'#3e3254':'#170828',GL=SH?'#8a7aa8':'#4a2272',SK=SH?'#d8d0e0':'#ece2f4',RIB=SH?'rgba(255,190,240,.6)':'rgba(190,140,255,.55)';
  const pc=SH?'255,150,230':'255,110,210';
  /* ออร่า */bvAdd(W,()=>{glowAt(0,fy-40,150,pc,.14+inh*.1);glowAt(0,fy-26,46,'255,200,150',.18+cf*.2)});
  /* ===== ปีกม่านห้วงดาว 4 ปีก ===== */
  const wing=(s,lo)=>{g.save();g.translate(s*12,fy-52+(lo?14:0));g.scale(s,1);
    const fl=Math.sin(T*1.6+(lo?1:0))*.08,rot=(lo?.16:-.12)+fl-cf*.12+inh*(lo?-.35:.3)-up*.002;g.rotate(rot);
    const tip=lo?[96,16]:[124,-76],E2=lo?[[98,40],[74,58],[42,54],[14,26]]:[[132,-36],[114,-2],[84,16],[48,20],[14,12]];
    const P=[[0,0],['c',30,-20*(lo?-.2:1)-(lo?0:40),tip[0]*.6,tip[1]-(lo?-6:22),tip[0],tip[1]]];let px=tip[0],py=tip[1];
    for(const[ex,ey]of E2){const mx=(px+ex)/2,my=(py+ey)/2,dx=ex-px,dy=ey-py,cx=mx-dy*.22*(SH?.6:1)*-1*.0-(mx)*.12,cy=my-(my)*.12;P.push(['q',mx-mx*.14,my-my*.14+ (lo?-4:-6),ex,ey]);px=ex;py=ey}
    P.push([0,8]);
    g.save();if(!W&&SH)g.globalAlpha*=.88;const bb=vS(W,P,lo?GD:GW,1,1.2);
    if(!W&&!LOWQ){g.save();vP(P);g.clip();g.fillStyle=SH?'rgba(255,200,240,.12)':'rgba(120,40,160,.25)';g.beginPath();g.ellipse(tip[0]*.5,tip[1]*.4,70,40,-.4,0,7);g.fill();
      g.globalCompositeOperation='lighter';for(let i=0;i<14;i++){const x=6+((i*41+(lo?17:0))%(Math.abs(tip[0])+10)),y=(lo?4:-60)+((i*29)%(lo?50:76)),tw=.3+.7*Math.abs(Math.sin(T*1.8+i));g.fillStyle=i%4?'rgba(255,230,255,'+tw+')':'rgba(255,210,140,'+tw+')';g.fillRect(x,y,1.7,1.7)}g.restore()}
    for(const[ex,ey]of[tip,...E2.slice(0,-1)])vK(W,[[2,2],['q',ex*.45,ey*.45-6,ex,ey]],RIB,1.2);
    if(SH&&!W)for(const[hx,hy,hr]of(lo?[[56,30,6]]:[[70,-30,8],[100,-20,5]])){g.fillStyle='rgba(8,2,16,.9)';g.beginPath();g.ellipse(hx,hy,hr,hr*.7,.4,0,7);g.fill();g.strokeStyle='rgba(255,170,230,.6)';g.lineWidth=.8;g.stroke()}
    g.restore();bvAdd(W,()=>glowAt(tip[0],tip[1],7,'255,210,240',.7));g.restore()};
  for(const s of[-1,1])wing(s,1);for(const s of[-1,1])wing(s,0);
  /* ===== ผมห้วงดาวยาว (หลัง) ===== */
  {const hp=Math.sin(T*1.3)*3+inh*6;for(const s of[-1,1])vS(W,[[s*4,fy-90],['q',s*26,fy-86,s*24+hp*s,fy-58],['q',s*30+hp*s,fy-30,s*24+hp*s,fy-8],[s*18+hp*s,fy-14],[s*14+hp*s*.5,fy+2],['q',s*12,fy-30,s*10,fy-60]],SH?'#2a2236':'#120822',1,1);
    if(!W&&!LOWQ){g.fillStyle='rgba(230,210,255,.8)';for(let i=0;i<8;i++){const s=i%2?1:-1,y=fy-80+((i*13)%70),x=s*(14+((i*7)%9));g.globalAlpha=.3+.6*Math.abs(Math.sin(T*2+i));g.fillRect(x,y,1.3,1.3)}g.globalAlpha=1}}
  /* ===== เส้นห้วงใต้ชายกระโปรง ===== */
  for(let i=0;i<5;i++){const x0=-28+i*14,ln=22+((i*7)%3)*8,ph=T*1.5+i*.9,P=[x0,fy+46];for(let k=1;k<=4;k++)P.push(x0+Math.sin(ph+k*.8)*(3+k*2.2)-(inh*k*3*(x0>0?1:-1)),fy+46+ln*k/4);
    vLimb(W,P,SH?'rgba(200,180,230,.5)':'rgba(130,60,200,.5)',12-Math.abs(i-2)*1.5,1.5,0);vLimb(W,P,SH?'rgba(255,220,250,.35)':'rgba(255,160,240,.3)',4,.6,0);bvAdd(W,()=>glowAt(P[P.length-2],P[P.length-1],4,pc,.7))}
  /* ===== ชุดราตรีผลึก ===== */
  const hem=[];for(let i=0;i<=10;i++){const x=-44+i*8.8,y=fy+48+(i%2?8:0)+Math.sin(T*1.4+i)*2;hem.push([x,y])}
  const GP=[[-13,fy-6],['q',-26,fy+18,-44,fy+48],...hem.slice(1,-1),[44,fy+48],['q',26,fy+18,13,fy-6]];vS(W,GP,GW,1,1.2);
  if(!W){for(const[x0,y0,x1,y1,x2,y2]of[[-30,fy+44,-18,fy+6,-10,fy+44],[2,fy+46,10,fy+10,22,fy+48],[-8,fy+20,0,fy-2,8,fy+22]])vD(W,[[x0,y0],[x1,y1],[x2,y2]],SH?'rgba(200,190,220,.35)':'rgba(110,60,170,.45)');
    for(const x of[-24,-10,6,22])vK(W,[[x*.4,fy-2],['q',x*.8,fy+20,x*1.2,fy+50]],SH?'rgba(40,30,60,.45)':'rgba(255,170,230,.28)',1)}
  if(SH){vK(W,[[-20,fy+10],[-12,fy+22],[-18,fy+34],[-10,fy+46]],W?'#fff':'rgba(255,190,240,.9)',1.4);vK(W,[[16,fy+4],[10,fy+20],[18,fy+30]],W?'#fff':'rgba(255,190,240,.9)',1.2);
    if(!W){g.fillStyle='rgba(6,2,14,.92)';g.beginPath();g.ellipse(24,fy+36,7,5,.3,0,7);g.fill();g.beginPath();g.ellipse(-28,fy+24,5,4,-.2,0,7);g.fill()}}
  /* ===== เสื้อตัวบนผลึก + บ่า ===== */
  vS(W,[[-13,fy-4],[-17,fy-30],[-22,fy-48],[-7,fy-57],[7,fy-57],[22,fy-48],[17,fy-30],[13,fy-4]],GD,1,1.2);
  vD(W,[[-17,fy-30],[-22,fy-48],[-7,fy-56],[0,fy-40]],SH?'#7a6a92':'#3a1a5c');vD(W,[[17,fy-30],[22,fy-48],[7,fy-56],[0,fy-40]],SH?'#6a5a82':'#2e1250');
  vK(W,[[-13,fy-5],[13,fy-5]],SH?'#c8b8e0':'#ffb0e8',1.2);
  for(const s of[-1,1])for(let i=0;i<3;i++){const x=s*(18+i*5),y=fy-50+i*3;vS(W,[[x-3,y+3],[x+s*2-1,y-12-(i===1?6:0)],[x+3,y+3]],SH?'#a898c0':'#5a2a8a',1,.7)}
  /* ===== ปากกลางอก / หลุมดำ ===== */
  const my=fy-26;
  if(!SH){const mh=13*mo,mw=7.5+mo*1.5;bvE(W,0,my,mw+2.4,mh+2.4,'#e0c8ff',1.2);
    if(!W){g.save();g.beginPath();g.ellipse(0,my,mw,mh,0,0,7);g.clip();const sg=g.createRadialGradient(0,my,1,0,my,mh);sg.addColorStop(0,'#fff4c8');sg.addColorStop(.3,'#ff8ad8');sg.addColorStop(.7,'#5a1a8a');sg.addColorStop(1,'#05010c');g.fillStyle=sg;g.fillRect(-mw,my-mh,mw*2,mh*2);
      for(let i=0;i<10;i++){const a=T*2+i*.628,rr=(i%3+1)*2.6;g.fillStyle='rgba(255,255,230,.9)';g.fillRect(Math.cos(a)*rr-.8,my+Math.sin(a)*rr*1.5-.8,1.6,1.6)}g.restore();
      g.fillStyle='#f4e8ff';for(let i=0;i<7;i++){const yy=my-mh+3+i*(mh*2-6)/6,xx=Math.sqrt(Math.max(0,1-Math.pow((yy-my)/mh,2)))*mw,w=2.6;for(const s of[-1,1]){g.beginPath();g.moveTo(s*xx,yy-1.6);g.lineTo(s*(xx-w),yy);g.lineTo(s*xx,yy+1.6);g.closePath();g.fill()}}}
  }else{const R=10+st*1.4+inh*3;bvE(W,0,my,R*.9+2,R*1.2+2,'#c8b8e0',1);if(!W){g.fillStyle='#020006';g.beginPath();g.ellipse(0,my,R*.9,R*1.2,0,0,7);g.fill();g.strokeStyle='rgba(255,140,230,.7)';g.lineWidth=1.2;g.beginPath();g.ellipse(0,my,R*.9,R*1.2,0,0,7);g.stroke()}
    bvAdd(W,()=>{glowAt(0,my,R*2,'200,90,255',.22+st*.04+inh*.2);for(let i=0;i<10;i++){const u=(T*(1.2+inh*1.5)+i/10)%1,an=i*.628+T*2,rr=R*2.4*(1-u);glowAt(Math.cos(an)*rr,my+Math.sin(an)*rr*1.3,1.6,'255,230,250',.9*u)}})}
  /* ผงดาวถูกดูดเข้าปาก */if(!W&&!LOWQ)bvAdd(W,()=>{const n=8+Math.round(inh*10+cf*6);for(let i=0;i<n;i++){const q=(T*(.6+inh+cf*.5)+i/n)%1,a=i*2.4,r0=(90+inh*60)*(1-q);glowAt(Math.cos(a)*r0,my+Math.sin(a)*r0*.6,1.6,'255,220,250',.9*q)}});
  /* ===== แขนยาว กรงเล็บ ===== */
  for(const s of[-1,1]){const lis=s>0?L:0,raise=Math.max(cf,inh*.6),sx=s*22,sy=fy-46;
    let ex=s*(38+raise*6),ey=fy-24-raise*26,hx=s*(48+raise*12)+Math.sin(T*1.4+s)*2,hy=fy-2-raise*58+Math.sin(T*1.4+s)*3;
    if(lis){ex=ex*(1-lis)+s*34*lis;ey=ey*(1-lis)+(fy-44)*lis;hx=hx*(1-lis)+s*16*lis;hy=hy*(1-lis)+(fy-76)*lis}
    vLimb(W,[sx,sy,ex,ey,hx,hy],SH?'#4a3e5e':'#1e0c34',6,4);vK(W,[[ex-s*1,ey-1],[hx,hy]],SH?'rgba(220,200,240,.4)':'rgba(170,110,240,.45)',1.2);
    bvDE(W,(ex+hx)/2,(ey+hy)/2,3.4,2,SH?'#ffc8f0':'#ff8ad8');
    const ha=Math.atan2(hy-ey,hx-ex);for(let k=-1;k<=2;k++){const a=ha+k*.32,L1=10+(k===0?3:0);vK(W,[[hx,hy],['q',hx+Math.cos(a)*L1*.6,hy+Math.sin(a)*L1*.6,hx+Math.cos(a+s*.5)*L1,hy+Math.sin(a+s*.5)*L1]],SH?'#e8e0f0':'#e0c8ff',1.4)}
    bvAdd(W,()=>{for(let i=0;i<3;i++){const a=T*2.4+i*2.09+s,ox=hx+Math.cos(a)*11,oy=hy+Math.sin(a)*7;glowAt(ox,oy,3,i%2?'255,224,138':'255,176,240',.8)}})}
  /* ===== คลื่นฟังเสียง ===== */if(L>0)bvAdd(W,()=>{for(let i=0;i<3;i++){const q=(T*1.2+i/3)%1;g.strokeStyle='rgba(255,170,230,'+(.6*(1-q)*L)+')';g.lineWidth=1.6;g.beginPath();g.arc(22,fy-80,8+q*40,-1,1);g.stroke()}});
  /* ===== คอ + หน้ากาก ===== */
  g.save();g.translate(0,fy-58);g.rotate(L*.32+inh*-.12);g.translate(0,-(fy-58));
  vS(W,[[-4.5,fy-56],[-4,fy-66],[4,fy-66],[4.5,fy-56]],SK,1,.9);vK(W,[[-5,fy-60],[5,fy-60]],SH?'#c8b8e0':'#ff8ad8',1.4);
  const hy=fy-76;vS(W,[[0,hy-15],['c',9,hy-15,12,hy-7,11,hy+2],['q',9,hy+12,0,hy+16],['q',-9,hy+12,-11,hy+2],['c',-12,hy-7,-9,hy-15,0,hy-15]],SK,1,1.1);
  if(!W){g.fillStyle='rgba(120,90,160,.3)';g.beginPath();g.ellipse(4,hy+3,6,10,0,0,7);g.fill()}
  /* เบ้าตาบอด */for(const s of[-1,1])bvDE(W,s*4.6,hy-2,3.4,2.4,'#1a0626');
  bvAdd(W,()=>glowAt(-4.6,hy-2,7,pc,.55+.3*Math.sin(T*4)));vK(W,[[-4.6,hy],['q',-6,hy+6,-5,hy+13+Math.sin(T*2)*1.5]],W?'#fff':'#ff6ad0',1.2);
  vK(W,[[4.6,hy-5],[3,hy-1],[6,hy+2],[4,hy+6]],W?'#fff':'rgba(40,10,50,.85)',1.1);vK(W,[[2,hy-1],[7,hy-1]],W?'#fff':'rgba(40,10,50,.6)',.8);
  vK(W,[[-2.6,hy+8],['q',0,hy+9.4,2.6,hy+8]],SH?'#6a5a7a':'#5a1a4a',1.2);
  if(SH)vK(W,[[-2,hy-14],[-3,hy-8],[0,hy-4],[-1,hy+2]],W?'#fff':'rgba(80,40,90,.8)',.9);
  /* ตาที่สามกลางหน้าผาก */if(EY>0){const eh=3.6*EY;bvAdd(W,()=>glowAt(0,hy-9,16*EY,'255,90,200',.7));vS(W,[[-3.4,hy-9],['q',0,hy-9-eh*1.4,3.4,hy-9],['q',0,hy-9+eh*1.4,-3.4,hy-9]],'#fff0f8',1,.8);if(EY>.4)vEye(W,0,hy-9,1.6,eh*.8,'#ff3ab0',6)}
  /* มงกุฎดาวดับ */
  bvAdd(W,()=>{g.strokeStyle='rgba(255,190,240,.35)';g.lineWidth=1;g.beginPath();g.ellipse(0,hy-14,24,6,0,0,7);g.stroke();for(let i=0;i<6;i++){const a=T*.5+i*1.047,x=Math.cos(a)*24,y=hy-14+Math.sin(a)*6;if(Math.sin(a)<0)glowAt(x,y,3,'255,230,200',.6)}});
  for(let i=0;i<7;i++){const a=-Math.PI/2+(i-3)*.34,bx=Math.cos(a)*10,by=hy-12+Math.sin(a)*4+5,h=12+(i===3?11:i%2?4:7),tx=Math.cos(a)*(10+h*.45),ty=hy-12-h+Math.abs(i-3)*2;
    vS(W,[[bx-2.4,by],[tx,ty],[bx+2.4,by]],SH?'#4a3e5a':'#1a0a2a',1,.8);const tw=.5+.5*Math.sin(T*2+i*1.3);bvAdd(W,()=>glowAt(tx,ty,5,i%2?'255,170,220':'255,220,150',.55*tw));bvDE(W,tx,ty,1.3,1.3,'#fff4e0')}
  g.restore();
  /* เปลือก: เศษเปลือกลอยวน */
  if(SH){for(let i=0;i<6;i++){const a=T*(.6+inh*.6)+i*1.047,R=50-inh*14,x=Math.cos(a)*R,y=fy-24+Math.sin(a)*18+Math.sin(T*2+i)*4,s=5+i%3*2;g.save();g.translate(x,y);g.rotate(T+i);vS(W,[[0,-s],[s*.8,0],[s*.2,s*.9],[-s*.7,s*.2]],i%2?'#e8d8ff':'#c8b0e8',1,.8);g.restore()}
    if(st>0)bvAdd(W,()=>glowAt(0,fy-30,70+st*8,'255,90,200',.06*st))}
}
BV1['ราชินีผู้กลืนดาว']=(T,W,br,sw,up,cf)=>{bvShadow(52,14,.3);qnDraw(T,W,br,sw,up,cf,null)};
BV1['ราชินีที่เหลือแต่เปลือก']=(T,W,br,sw,up,cf)=>{bvShadow(52,14,.3);let st=0,inh=0;try{const B=qshBoss();st=B?(B.qsb|0):0}catch(e){}try{if(QSFX&&QSFX.inh){const k=(performance.now()-QSFX.inh.t0)/QSFX.inh.d;if(k>=0&&k<1)inh=Math.min(1,k*4,(1-k)*4)}}catch(e){}qnDraw(T,W,br,sw,up,cf,{st,inh})};
Object.assign(BVH,{'ราชินีผู้กลืนดาว':172,'ราชินีที่เหลือแต่เปลือก':172});Object.assign(BVWD,{'ราชินีผู้กลืนดาว':150,'ราชินีที่เหลือแต่เปลือก':150});
