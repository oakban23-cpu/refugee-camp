/* ---------- v513 บอสใหญ่วาดใหม่ ชุด 3: บอสโลก «อสูรยักษ์โลกันตร์» · บอสกิลด์ «อสูรเกราะศึก» ----------
   ครอบ drawWorldBoss / drawGuildBoss (ตัวห่อของบอสกิลด์เรียกชื่อ drawGuildBoss ตอนรัน จึงได้แบบใหม่ด้วย) · error → กลับไปวาดแบบเดิม
   ท่าตามกลไกเดิมจาก wbAnim(): ro = คำราม/พ่นไฟ (อ้าปาก ช่องตาสว่าง) · rs/rv = ยกแขนข้างหนึ่งทุบ · arms = ยกสองแขน · core = แกนอก (จุดอ่อน) เปิด/ร้อนขาว · WBA.enr = คลั่ง */
const WBV={on:1,err:''};
function wbV(m,T,hf){const x=m.x,y=m.y,W=hf>.35,now=performance.now()/1000,A=wbAnim(),ro=dg.ph==='boss'?A.ro:((now%9)>7.6?Math.sin(((now%9)-7.6)/1.4*Math.PI):0),by=Math.sin(now*1.6)*3,enr=!!WBA.enr;
  const RK='#2e1814',RD='#1e0e0a',RL='#4a261c',BN='#e2d2ac',HT=W?'#fff':'rgba(255,'+(120+Math.round(60*Math.sin(now*3)))+',40,.9)';
  const seam=(P,w)=>{vK(W,P,HT,w);if(!LOWQ&&!W)bvAdd(W,()=>vK(W,P,'rgba(255,160,60,.25)',w*3))};
  g.save();g.translate(x,y);
  /* บ่อลาวา */glowAt(0,-20,190,'255,90,30',.32+.06*Math.sin(now*2));
  {const gr=g.createRadialGradient(0,4,10,0,4,130);gr.addColorStop(0,'#ffd060');gr.addColorStop(.35,'#ff7a1a');gr.addColorStop(.75,'#a82808');gr.addColorStop(1,'#3a0c04');g.fillStyle=gr;g.beginPath();g.ellipse(0,4,128,36,0,0,7);g.fill()}
  g.strokeStyle='#1a0a06';g.lineWidth=7;g.beginPath();g.ellipse(0,4,130,38,0,0,7);g.stroke();
  for(let i=0;i<14;i++){const a=i/14*6.283+.2,rx=Math.cos(a)*132,ry=4+Math.sin(a)*38;if(Math.sin(a)<-.1)continue;g.save();g.translate(rx,ry);g.rotate(a);vS(W,[[-9,-5],[-3,-11],[8,-6],[10,4],[-6,7]],i%2?'#2a1610':'#3a2218',1,1.2);g.restore()}
  for(let i=0;i<5;i++){const q=(now*.7+i*.21)%1,bx=Math.sin(i*2.7)*90,bby=6+Math.cos(i*1.9)*16;g.strokeStyle='rgba(255,220,120,'+(1-q)+')';g.lineWidth=1.5;g.beginPath();g.arc(bx,bby,2+q*7,0,7);g.stroke()}
  g.translate(Math.sin(now*40)*ro*1.2,0);
  /* ควัน/แผงไฟหลังหัวและบ่า */bvAdd(W,()=>{for(let i=0;i<9;i++){const q=(now*.5+i/9)%1,px=-90+i*22+Math.sin(now+i)*6,py=-190+by-q*90;glowAt(px,py,26*(1-q*.5),enr?'255,60,20':'255,110,40',.32*(1-q))}if(enr)glowAt(0,-120,220,'255,30,10',.22+.1*Math.sin(now*6))});
  if(!W)for(let i=0;i<6;i++){const q=(now*.3+i/6)%1,px=-70+i*28,py=-200+by-q*70;g.fillStyle='rgba(30,16,14,'+(.5*(1-q))+')';g.beginPath();g.arc(px+Math.sin(now+i)*8,py,18+q*16,0,7);g.fill()}
  /* แขน + มือกรงเล็บ */const armUp=s=>(A.rs===s?A.rv:0)+A.arms;
  for(const s of[-1,1]){const up=armUp(s),sx=s*86,sy=-150+by,ex=s*(138+ro*4),ey=-104+by-up*.55,hx=s*(124+ro*8),hy=-20-ro*12-up;
    vLimb(W,[sx,sy,ex,ey,hx,hy],s<0?RD:RK,46,32);seam([[sx+s*6,sy+10],[ex-s*4,ey+4],[ex+s*6,ey+26]],2.4);seam([[ex,ey+10],[hx-s*6,hy-16]],1.8);
    vS(W,[[hx-30,hy-10],['q',hx-32,hy-34,hx,hy-36],['q',hx+32,hy-34,hx+30,hy-10],['q',hx+26,hy+6,hx,hy+8],['q',hx-26,hy+6,hx-30,hy-10]],RL,1,2);
    for(let k=-2;k<=1;k++){const cx=hx+k*15+s*4,cy=hy+2;vS(W,[[cx-6,cy-2],['q',cx+s*2,cy+10,cx+s*6,cy+22],['q',cx+s*1,cy+12,cx+6,cy-2]],BN,1,1.2)}
    if(up>20)bvAdd(W,()=>glowAt(hx,hy,30,'255,140,40',.3*(up/80)))}
  /* ลำตัวหินภูเขาไฟ (อกกว้าง เอวคอด) */vS(W,[[-62,-6],['q',-66,-60+by,-90,-112+by],['q',-108,-150+by,-72,-174+by],['q',0,-192+by,72,-174+by],['q',108,-150+by,90,-112+by],['q',66,-60+by,62,-6]],RK,1,2);
  vS(W,[[-70,-160+by],['q',-36,-170+by,-4,-150+by],[-10,-112+by],['q',-46,-104+by,-72,-120+by]],RL,1,1.4);vS(W,[[70,-160+by],['q',36,-170+by,4,-150+by],[10,-112+by],['q',46,-104+by,72,-120+by]],RL,1,1.4);
  for(let i=0;i<3;i++){const yy=-66+i*22+by;vS(W,[[-42+i*3,yy],['q',0,yy-10,42-i*3,yy],['q',0,yy+12,-42+i*3,yy]],i%2?RL:'#3a1e16',1,1.2)}
  seam([[-56,-10],[-50,-50+by],[-66,-90+by],[-56,-128+by]],3);seam([[54,-14],[50,-60+by],[66,-98+by],[54,-136+by]],3);seam([[-24,-150+by],[-14,-130+by],[-26,-118+by]],2);
  /* แกนลาวาในกรงซี่โครง */{const cy=-96+by,wk=A.core|0,op=wk?(wk===2?1:.6):0,pu=(.75+.25*Math.sin(now*(wk===2?14:4)))*(wk===2?1.6:wk?1.3:1);
    glowAt(0,cy,58*pu+(W?20:0),wk===2?'255,230,190':wk?'255,220,90':'255,140,40',.75);
    bvE(W,0,cy,22,26,'#2a0c06',1.6);bvDE(W,0,cy,15*pu,19*pu,W?'#fff':'#ffb030');bvDE(W,0,cy-3,6*pu,8*pu,'#fff4c0');
    for(const s of[-1,1])for(let k=0;k<3;k++){const ry=cy-16+k*14,ang=op*.5*s;g.save();g.translate(s*6,ry);g.rotate(ang);vK(W,[[0,0],['q',s*30,-4,s*30,16+k*2]],BN,6-k);g.restore()}}
  /* บ่าหนามออบซิเดียน */for(const s of[-1,1]){const px=s*86,py=-164+by;vS(W,[[px-36,py+10],['q',px-34,py-22,px,py-26],['q',px+34,py-22,px+36,py+10],['q',px,py+24,px-36,py+10]],'#24120e',1,2);
    for(let k=0;k<4;k++){const bx=px+s*(-24+k*16),h=40+k*8-(k===3?16:0);vS(W,[[bx-7,py-16],[bx+s*4,py-16-h],[bx+7,py-16]],k%2?'#1a0c0a':'#2e1612',1,1.2);vS(W,[[bx+s*1,py-16-h*.7],[bx+s*4,py-16-h],[bx+s*6,py-16-h*.66]],BN,0)}}
  /* หัวปีศาจ (ขยาย 1.25 รอบคอ) */const hy=-206+by*1.3-ro*6;g.save();g.translate(0,hy+24);g.scale(1.25,1.25);g.translate(0,-(hy+24));
  for(const s of[-1,1]){/* เขาใหญ่ */const P=[s*24,hy-20,s*58,hy-26,s*80,hy-52,s*84,hy-84,s*70,hy-104];vLimb(W,P,BN,24,5);for(let k=1;k<4;k++){const px=P[k*2],py=P[k*2+1];vK(W,[[px-7,py-2],[px+7,py+3]],'rgba(120,96,60,.6)',2)}
    vLimb(W,[s*16,hy-30,s*30,hy-52,s*28,hy-66],'#c8b48a',10,3)}
  vS(W,[[-40,hy+20],['q',-50,hy-14,-30,hy-40],['q',0,hy-54,30,hy-40],['q',50,hy-14,40,hy+20],['q',0,hy+30,-40,hy+20]],RL,1,2);
  vS(W,[[-36,hy-22],['q',0,hy-34,36,hy-22],[30,hy-10],['q',0,hy-18,-30,hy-10]],RK,1,1.4);
  /* ตา */for(const s of[-1,1]){vS(W,[[s*8,hy-12],[s*32,hy-20],[s*28,hy-2]],'#120604',0);bvAdd(W,()=>glowAt(s*20,hy-12,20,'255,60,20',.9));bvDE(W,s*20,hy-12,6,3.4,'#ffe060');bvDE(W,s*20,hy-12,2.4,2.4,'#ffffff')}
  /* จมูก */for(const s of[-1,1])bvDE(W,s*6,hy+6,2.6,1.8,'#120604');bvAdd(W,()=>{glowAt(-6,hy+6,5,'255,120,40',.6);glowAt(6,hy+6,5,'255,120,40',.6)});
  /* กราม (คำราม/พ่นไฟ) */{const jw=10+ro*18;vS(W,[[-32,hy+12],[-28,hy+28+jw],['q',0,hy+38+jw,28,hy+28+jw],[32,hy+12]],'#24100c',1,1.6);vS(W,[[-26,hy+16],[26,hy+16],['q',22,hy+26+jw,0,hy+30+jw],['q',-22,hy+26+jw,-26,hy+16]],'#0e0402',0);
    if(ro>0){bvAdd(W,()=>glowAt(0,hy+22+jw*.6,30+ro*24,'255,150,40',.85*ro));bvDE(W,0,hy+22+jw*.5,14,4+jw*.35,'#ffcf6a')}
    for(let k=-2;k<=2;k++){vFang(W,k*10,hy+14,7,10+(Math.abs(k)===2?4:0),'#fff0d0');const fx=k*10,fy=hy+28+jw;vD(W,[[fx-3.5,fy],[fx,fy-9],[fx+3.5,fy]],'#fff0d0')}}
  seam([[-28,hy-30],[-20,hy-20],[-26,hy-6]],1.8);seam([[28,hy-30],[22,hy-18]],1.8);g.restore();
  /* มงกุฎเปลวไฟ */bvAdd(W,()=>{for(let i=0;i<7;i++){const q=(now*1.3+i/7)%1,fx2=-36+i*12+Math.sin(now*4+i)*3,fy=hy-40-q*40;g.fillStyle='rgba(255,'+(160-q*100|0)+',40,'+(.75*(1-q))+')';g.beginPath();g.ellipse(fx2,fy,6*(1-q)+2,10*(1-q)+3,0,0,7);g.fill()}});
  /* ประกายไฟลอย */bvAdd(W,()=>{for(let i=0;i<10;i++){const q=(now*.35+i*.1)%1,px=Math.sin(i*3.1+now*.5)*120,py=-q*260;g.fillStyle='rgba(255,'+(150+i*8)+',60,'+(.8*(1-q))+')';g.beginPath();g.arc(px,py,1.6,0,7);g.fill()}});
  g.restore();
  const hyA=y+hy;g.font='bold 13px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='#000';const nm=typeof GBS!=='undefined'&&GBS.go?'🐉 อสูรกิลด์ ขั้น '+GBS.go.s:'🐉 '+WBN+' · HP ∞';g.strokeText(nm,x,hyA-150);g.fillStyle='#ffb070';g.fillText(nm,x,hyA-150);g.lineWidth=1}
{const _wb0=drawWorldBoss;drawWorldBoss=function(m,T,hf){if(WBV.on&&!BV1.off){const r0=MPC.rich,o0=V1.O;MPC.rich=0;V1.O='#120806';g.save();try{wbV(m,T,hf);return}catch(e){WBV.err=String(e&&e.stack||e).slice(0,300)}finally{g.restore();MPC.rich=r0;V1.O=o0}}return _wb0.apply(this,arguments)}}

/* ===== บอสกิลด์ «อสูรเกราะศึก» ===== */
function gbV(m,T,hf){const x=m.x,y=m.y,W=hf>.35,now=performance.now()/1000,A=wbAnim(),TI=gbTier(),gc=gbGC(),rc=h2r(gc),em=gbEm(),
    ro=dg.ph==='boss'?A.ro:((now%8)>6.8?Math.sin(((now%8)-6.8)/1.2*Math.PI):0),by=Math.sin(now*1.4)*2.5;
  try{gbDrawThrone(now)}catch(e){}
  const TR=W?'#fff':TI.tr,trim=(P,w)=>vK(W,P,TR,w||2);
  g.save();g.translate(x,y);
  /* แท่นวงอักขระสีกิลด์ */glowAt(0,-40,200,rc,.18+.05*Math.sin(now*1.6));
  bvDE(W,0,10,138,40,'#23262e');bvE(W,0,4,130,36,'#30343e',2.4);g.save();g.translate(0,4);g.scale(1,.28);g.globalCompositeOperation='lighter';g.strokeStyle='rgba('+rc+','+(.55+.25*Math.sin(now*2))+')';g.lineWidth=5;g.beginPath();g.arc(0,0,112,0,7);g.stroke();
  for(let i=0;i<12;i++){const a=i*.5236+now*.25;g.fillStyle='rgba('+rc+',.8)';g.fillRect(Math.cos(a)*112-3,Math.sin(a)*112-3,6,6)}g.restore();
  if(WBA.enr)bvAdd(W,()=>glowAt(0,-120,230,'255,40,30',.22+.1*Math.sin(now*6)));
  g.translate(Math.sin(now*40)*ro*.9,0);
  /* ธงกิลด์สองผืนบนหลัง */for(const s of[-1,1]){const px=s*62,top=-300+by;vK(W,[[px,-150+by],[px+s*8,top]],'#2a1e10',7);vK(W,[[px,-150+by],[px+s*8,top]],'rgba(255,255,255,.15)',2);bvE(W,px+s*8,top-5,6,6,'#d8b060',1);
    g.save();g.translate(px+s*8,top+6);const sw=Math.sin(now*2+s)*5;vS(W,[[0,0],['q',s*30,-4,s*60,4],[s*60+sw,64],[s*40+sw*.7,52],[s*24+sw*.5,68],[0,60]],gc,1,2);trim([[0,4],[s*58,8]],2.4);
    if(!W){g.font='26px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(em,s*30+sw*.4,32)}g.restore()}
  /* ผ้าคลุมสีกิลด์ */{const sw=Math.sin(now*1.6)*6;vS(W,[[-70,-176+by],['q',-96,-90+by,-104+sw,-4],[-86+sw*.8,-16],[-74+sw*.7,8],[-56+sw*.6,-10],[-40+sw*.4,6],[-20,-8],[0,4],[20,-8],[40+sw*.4,6],[56+sw*.6,-10],[74+sw*.7,8],[86+sw*.8,-16],[104+sw,-4],['q',96,-90+by,70,-176+by]],gc,1,2);vD(W,[[-70,-176+by],['q',-96,-90+by,-100+sw,-6],[-80+sw*.8,-2],['q',-70,-90+by,-50,-170+by]],'rgba(0,0,0,.25)')}
  /* ขา + สนับแข้ง */for(const s of[-1,1]){const lx=s*34;vS(W,[[lx-22,-4],['q',lx-28,-40,lx-24,-72+by*.4],[lx+24,-72+by*.4],['q',lx+28,-40,lx+20,-4]],TI.c,1,2);
    vS(W,[[lx-28,6],['q',lx-30,-12,lx-12,-16],[lx+14,-16],['q',lx+32,-12,lx+30,6]],TI.a,1,2);bvE(W,lx,-62+by*.4,20,15,TI.b,2);trim([[lx-14,-62+by*.4],['q',lx,-76+by*.4,lx+14,-62+by*.4]],2);
    for(let k=0;k<3;k++)trim([[lx-20+k*2,-44+k*12],[lx+20-k*2,-44+k*12]],1.2)}
  /* กระโปรงเกราะโซ่ + ผ้าคาดสีกิลด์ */vS(W,[[-60,-100+by],[60,-100+by],[66,-34],[-66,-34]],'#5a5e68',1,2);if(!W&&!LOWQ){g.fillStyle='rgba(30,32,40,.45)';for(let r=0;r<5;r++)for(let c=0;c<12;c++){g.beginPath();g.arc(-56+c*10+(r%2)*5,-92+r*12+by*(1-r/5),2,0,7);g.fill()}}
  for(const s of[-1,1])for(let k=0;k<3;k++){const tx=s*(36+k*8),ty=-96+by+k*20,wd=30-k*2;vS(W,[[tx-wd,ty],[tx+wd,ty],[tx+wd+s*3,ty+24],['q',tx,ty+30,tx-wd+s*3,ty+24]],k%2?TI.c:TI.a,1,1.8);trim([[tx-wd+2,ty+4],[tx+wd-2,ty+4]],1.4);bvE(W,tx+s*(wd-8),ty+12,2.6,2.6,TI.tr,0)}
  {const sw=Math.sin(now*1.7)*4;vS(W,[[-30,-98+by],[30,-98+by],[26+sw,-10],[0+sw*.5,0],[-26+sw,-10]],gc,1,2);trim([[-30,-94+by],[30,-94+by]],3);trim([[-26+sw,-12],[sw*.5,-2],[26+sw,-12]],2);if(!W){g.font='30px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(em,sw*.5,-50+by)}}
  /* แขน (ซ้ายกำปั้น · ขวาค้อน) */const armY=s=>(A.rs===s?A.rv:0)+A.arms*.6;
  const arm=(s,front)=>{const sx=s*96,sy=-176+by,up=armY(s),hx=s*(122+ro*6),hy=-74-up,ex=s*112,ey=(sy+hy)/2+6;
    vLimb(W,[sx,sy,ex,ey,hx,hy],TI.c,34,26);bvE(W,ex,ey,20,15,TI.a,2);trim([[ex-s*12,ey-8],[ex+s*14,ey+6]],2);
    vS(W,[[hx-26,hy-22],['q',hx,hy-30,hx+26,hy-22],[hx+28,hy+10],['q',hx,hy+18,hx-28,hy+10]],TI.a,1,2);trim([[hx-26,hy-14],[hx+26,hy-14]],2);for(let k=-1;k<=1;k++)vS(W,[[hx+k*14-6,hy+10],[hx+k*14+6,hy+10],[hx+k*14,hy+19]],TI.tr,1,1);
    if(s===1){const ang=.55+(A.rs===1?-(Math.max(0,A.rv)/80)*1.1:0)+Math.sin(now*1.2)*.05;g.save();g.translate(hx,hy-4);g.rotate(ang);
      vS(W,[[-5,20],[-5,-150],[5,-150],[5,20]],'#3a2a18',1,2);for(let k=0;k<5;k++)vS(W,[[-6,-130+k*28],[6,-130+k*28],[6,-126+k*28],[-6,-126+k*28]],'#c8a050',0);
      vS(W,[[-50,-152],['q',-56,-176,-44,-196],[44,-196],['q',56,-176,50,-152]],TI.b,1,2);vS(W,[[-50,-152],[50,-152],[44,-134],[-44,-134]],TI.a,1,2);
      for(const ss of[-1,1])vS(W,[[ss*50,-186],[ss*66,-174],[ss*50,-162]],TI.tr,1,1.4);trim([[-42,-176],[42,-176]],3);
      bvAdd(W,()=>glowAt(0,-168,30,rc,.5+.3*Math.sin(now*3)));if(!W){g.font='22px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(em,0,-168)}g.restore()}};
  arm(-1);
  /* อกเกราะ */vS(W,[[-74,-92+by],['q',-96,-140+by,-74,-198+by],['q',0,-208+by,74,-198+by],['q',96,-140+by,74,-92+by],['q',0,-82+by,-74,-92+by]],TI.a,1,2.4);
  vS(W,[[-60,-188+by],['q',0,-182+by,60,-188+by],['q',58,-130+by,40,-108+by],['q',0,-96+by,-40,-108+by],['q',-58,-130+by,-60,-188+by]],TI.b,1,1.6);
  trim([[0,-184+by],[0,-100+by]],2.4);for(let i=0;i<3;i++)trim([[-52+i*5,-128-i*18+by],['q',0,-116-i*18+by,52-i*5,-128-i*18+by]],1.6);
  vS(W,[[-70,-96+by],[70,-96+by],[70,-84+by],[-70,-84+by]],'#3a2a1a',1,1.6);bvE(W,0,-90+by,10,8,'#d8b060',1.4);
  /* อัญมณีอก (จุดอ่อน) */{const cy=-150+by,wk=A.core,pu=(.8+.2*Math.sin(now*(wk?12:3)))*(wk?1.5:1);g.save();g.globalCompositeOperation='lighter';glowAt(0,cy,(wk?70:42)*pu,wk?'255,245,220':rc,.8);g.restore();
    vS(W,[[0,cy-19],[16,cy],[0,cy+19],[-16,cy]],wk?'#ffffff':gc,1,2);vD(W,[[0,cy-12],[6,cy],[0,cy+4],[-8,cy-2]],'rgba(255,255,255,.55)');
    if(wk)vK(W,[[-12,cy-4],[-2,cy+2],[8,cy-6]],'rgba(255,255,255,.9)',1.5)}
  /* บ่าเกราะซ้อน 3 ชั้น + หนาม */for(const s of[-1,1]){const px=s*94,py=-184+by;for(let k=2;k>=0;k--){const ry=py+k*12;vS(W,[[px-42+k*4,ry+8],['q',px-40,ry-26+k*6,px,ry-30+k*6],['q',px+40,ry-26+k*6,px+42-k*4,ry+8],['q',px,ry+20,px-42+k*4,ry+8]],k?TI.c:TI.a,1,2);trim([[px-38+k*4,ry+6],['q',px,ry+16,px+38-k*4,ry+6]],1.6)}
    for(let k=0;k<3;k++)vS(W,[[px+s*(-18+k*16)-6,py-24],[px+s*(-14+k*16),py-54-k*6],[px+s*(-18+k*16)+6,py-24]],TI.tr,1,1.6)}
  /* โล่หอคอยสีกิลด์ (มือซ้าย) */{const up=armY(-1),sx=-118-ro*6,sy=-98-up*.85,tl=-.06-(A.rs===-1?Math.max(0,A.rv)/80*.35:0)+Math.sin(now*1.1)*.02;g.save();g.translate(sx,sy);g.rotate(tl);
    const SP=[[-44,-84],['q',0,-96,44,-84],[44,40],['q',40,72,0,96],['q',-40,72,-44,40]];vS(W,SP,TI.a,1,2.6);
    vS(W,[[-36,-76],['q',0,-86,36,-76],[36,36],['q',32,62,0,84],['q',-32,62,-36,36]],gc,1,1.6);
    vD(W,[[-36,-20],[0,8],[36,-20],[36,-2],[0,26],[-36,-2]],W?'#fff':TI.c);trim([[-36,-20],[0,8],[36,-20]],1.6);trim([[-36,-2],[0,26],[36,-2]],1.6);
    vD(W,[[-36,-76],['q',-20,-80,-8,-80],[-8,70],['q',-28,50,-36,36]],'rgba(0,0,0,.18)');
    for(let i=0;i<9;i++){const q=i/8,[rx,ry]=q<.5?[-40,-78+q*2*118]:[40,-78+(q-.5)*2*118];bvE(W,rx,ry,2.6,2.6,TI.tr,0)}
    bvE(W,0,-40,22,22,TI.b,2);bvE(W,0,-40,15,15,TI.a,1.4);if(!W){g.font='22px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(em,0,-39)}
    vK(W,[[-22,52],[-8,60]],'rgba(0,0,0,.35)',1.4);vK(W,[[14,-64],[24,-56]],'rgba(0,0,0,.35)',1.4);vK(W,[[-40,-80],['q',0,-92,40,-80]],'rgba(255,255,255,.35)',2);g.restore()}
  arm(1);
  /* ขนสัตว์คลุมคอ */{const fy=-200+by;vS(W,[[-70,fy+8],['q',-60,fy-16,-40,fy-12],['q',-30,fy-26,-12,fy-18],['q',0,fy-30,12,fy-18],['q',30,fy-26,40,fy-12],['q',60,fy-16,70,fy+8],['q',0,fy+20,-70,fy+8]],'#4a3626',1,2);
    for(let i=0;i<9;i++){const fx=-58+i*14.5;vK(W,[[fx,fy+2],[fx+3,fy-10-(i%2)*4]],'rgba(255,230,190,.25)',1.4)}}
  /* คอ + หมวกเกราะ */const hy=-236+by*1.2-ro*7;vS(W,[[-30,hy+34],[30,hy+34],[34,hy+50],[-34,hy+50]],TI.c,1,2);
  {const pl=Math.sin(now*2.2)*4;vK(W,[[0,hy-40],['q',-30+pl,hy-96,-80+pl,hy-70]],'#0c0a0e',17);vK(W,[[0,hy-40],['q',-30+pl,hy-96,-80+pl,hy-70]],W?'#fff':gc,12);vK(W,[[0,hy-44],['q',-28+pl,hy-92,-72+pl,hy-72]],'rgba(255,255,255,.25)',3)}
  bvAdd(W,()=>{glowAt(0,hy+40,46,rc,.55+.2*Math.sin(now*5));for(let i=0;i<5;i++){const q=(now*.7+i*.2)%1;g.fillStyle='rgba('+rc+','+(.7*(1-q))+')';g.beginPath();g.arc(Math.sin(i*2.3+now*2)*26,hy+36-q*40,3.4*(1-q)+1,0,7);g.fill()}});
  for(const s of[-1,1]){vLimb(W,[s*30,hy-18,s*58,hy-26,s*68,hy-48,s*62,hy-68],TI.tr,11,3)}
  for(let i=-2;i<=2;i++)vS(W,[[i*12-6,hy-42+Math.abs(i)*3],[i*12,hy-60+Math.abs(i)*6],[i*12+6,hy-42+Math.abs(i)*3]],TI.tr,1,1.4);
  vS(W,[[-40,hy+32],['q',-46,hy-10,-30,hy-40],['q',0,hy-54,30,hy-40],['q',46,hy-10,40,hy+32],['q',0,hy+44,-40,hy+32]],TI.a,1,2.4);
  for(const s of[-1,1])vS(W,[[s*40,hy+4],[s*48,hy+20],[s*38,hy+38],[s*24,hy+36]],TI.c,1,1.8);
  vS(W,[[-30,hy-34],['q',0,hy-50,30,hy-34],[20,hy-22],[-20,hy-22]],TI.b,1,1.6);trim([[0,hy-46],[0,hy+40]],2.4);trim([[-38,hy+26],['q',0,hy+40,38,hy+26]],2);
  /* ช่องตา */{const op=4+ro*10;vD(W,[[-32,hy-6-op/2],[32,hy-6-op/2],[32,hy-6+op/2],[-32,hy-6+op/2]],'#08060a');
    bvAdd(W,()=>{glowAt(0,hy-6,34+ro*40,ro>.3?'255,180,90':rc,.8+ro*.2);for(const s of[-1,1]){g.fillStyle=ro>.3?'#fff2c0':'#ffffff';g.beginPath();g.ellipse(s*15,hy-6,8,2+ro*3,0,0,7);g.fill()}});
    vD(W,[[-4,hy-6],[4,hy-6],[4,hy+26],[-4,hy+26]],'#08060a');bvAdd(W,()=>{g.fillStyle='rgba('+rc+','+(.35+ro*.4)+')';g.fillRect(-2,hy-2,4,26)});
    for(const k of[-2,-1,1,2])vD(W,[[k*11-1,hy+8],[k*11+1,hy+8],[k*11+1,hy+20],[k*11-1,hy+20]],'#0c0a0e')}
  /* ประกายสีกิลด์ */bvAdd(W,()=>{for(let i=0;i<10;i++){const q=(now*.3+i*.1)%1,px=Math.sin(i*3.1+now*.5)*125,py=-q*280;g.fillStyle='rgba('+rc+','+(.75*(1-q))+')';g.beginPath();g.arc(px,py,1.8,0,7);g.fill()}});
  g.restore();
  g.font='bold 13px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='#000';const nm='⚔️ อสูรเกราะศึก · ขั้น '+((GBS.go&&GBS.go.s)|0)+' ('+TI.n+')';g.strokeText(nm,x,y+hy-112);g.fillStyle='#ffe0a0';g.fillText(nm,x,y+hy-112);g.lineWidth=1}
{const _gb0=drawGuildBoss;drawGuildBoss=function(m,T,hf){if(WBV.on&&!BV1.off){const r0=MPC.rich,o0=V1.O;MPC.rich=0;V1.O='#0c0a0e';g.save();try{gbV(m,T,hf);return}catch(e){WBV.err=String(e&&e.stack||e).slice(0,300)}finally{g.restore();MPC.rich=r0;V1.O=o0}}return _gb0.apply(this,arguments)}}
