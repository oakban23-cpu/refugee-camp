/* ===== v462 · เดินบนกำแพงบ้านกิลด์ (ขั้น 2+) =====
   - บันได 2 ฝั่งชิดกำแพงเหนือ (x ±368..408) ขึ้นได้จากปลายล่างเท่านั้น → ทางเดินกำแพงเหนือ (เว้นช่วงหลังตึกหลัก) · กำแพงข้าง · กำแพงใต้ (เว้นช่วงประตู)
   - ตำแหน่งบนกำแพงอนุมานจากพิกัด (ghWReg ใน ux70) → ทุกเครื่องวาดคนบนกำแพงยกสูงตรงกัน โดยไม่ต้องส่งข้อมูลเพิ่ม
   - ศึกมอนบุก: บนเชิงเทินได้ดาเมจ +25% · มอนประชิดตีไม่ถึง (ไม่เล็งคนบนกำแพง) · มอนหัวหน้า/ยักษ์ด้านนอกยิงธนูใส่ได้ · บอสยังโจมตีโดน · กำแพงทะลุตรงไหน คนที่ยืนตรงนั้นตกลงมา */
const GWW={on:0,lx:0,ly:0,tip:0,wq:[]};
const ghWOn=p=>{try{if(!ghHere())return null;const R=ghWReg(p.x-1600,p.y-1600,ghT());return R&&(R.k!=='st'||R.l>18)?R:null}catch(e){return null}};
ghEnter=(f=>function(){GWW.on=0;GWW.wq=[];return f.apply(this,arguments)})(ghEnter);
ghCollide=(f=>function(){
  if(!ghHere()){GWW.on=0;return f.apply(this,arguments)}
  const t=ghT();
  if(t<2){if(GWW.on){GWW.on=0;me.x=1600+388*(me.x<1600?-1:1);me.y=1600-380}return f.apply(this,arguments)}
  let lx=me.x-1600,ly=me.y-1600;
  if(GWW.on&&Math.hypot(lx-GWW.lx,ly-GWW.ly)>90)GWW.on=0;
  if(GWW.on){try{if(ghrHere()&&SR!==0)SR=0}catch(e){}let R=ghWReg(lx,ly,t);
    if(!R){const px=GWW.lx,py=GWW.ly,pR=ghWReg(px,py,t);
      if(pR&&pR.k==='st'&&ly>-392&&Math.abs(Math.abs(lx)-388)<=20){GWW.on=0;f.apply(this,arguments);GWW.lx=me.x-1600;GWW.ly=me.y-1600;return}
      if(ghWReg(lx,py,t))me.y=1600+py;else if(ghWReg(px,ly,t))me.x=1600+px;else{me.x=1600+px;me.y=1600+py}
      lx=me.x-1600;ly=me.y-1600;R=ghWReg(lx,ly,t)}
    if(R&&R.k==='s'&&ghrHere()&&GRD.bx!=null&&Math.abs(lx-GRD.bx)<58){GWW.on=0;me.y=1600+402;try{me.hp=Math.max(1,me.hp-Math.round(me.mh*.05))}catch(e){}try{fx({k:'msg',s:'💥 กำแพงตรงนี้พัง! ตกลงมาข้างล่าง'})}catch(e){}}
    GWW.lx=me.x-1600;GWW.ly=me.y-1600;return}
  f.apply(this,arguments);
  lx=me.x-1600;ly=me.y-1600;const R=ghWReg(lx,ly,t);
  if(R&&R.k==='st'){if(ly>-412&&GWW.ly>=-414){GWW.on=1;if(!GWW.tip){GWW.tip=1;try{fx({k:'msg',s:'🏰 ขึ้นเชิงเทิน · ตอนศึกมอนบุกได้ดาเมจ +25% มอนประชิดตีไม่ถึง ระวังธนูจากข้างนอก'})}catch(e){}}}
    else{const sg=lx<0?-1:1,ax=Math.abs(lx);me.x=1600+sg*(ax<388?366:410)}}
  else if(R){me.x=1600+GWW.lx;me.y=1600+GWW.ly}
  GWW.lx=me.x-1600;GWW.ly=me.y-1600})(ghCollide);
/* ---------- วาดคนบนกำแพงยกสูง + ใบเสมาบังเท้า (กำแพงใต้) ---------- */
function ghParPatch(x,t){const y0=1600+430-ghWH(t),xa=x<1600?1000:1674,xb=x<1600?1526:2200,l=x-20,r=x+20;g.save();g.beginPath();g.rect(l,y0-20,40,t===2?28:22);g.clip();
  if(t===2){for(let k=xa;k<xb;k+=12){if(k+12<l||k>r)continue;g.fillStyle='#6c4829';g.fillRect(k,y0-2,12,10);g.fillStyle='#b58a5a';g.beginPath();g.moveTo(k,y0-2);g.lineTo(k+6,y0-12);g.lineTo(k+12,y0-2);g.closePath();g.fill();g.strokeStyle='#1e140c';g.lineWidth=1;g.stroke();g.beginPath();g.moveTo(k,y0-2);g.lineTo(k,y0+8);g.moveTo(k+12,y0-2);g.lineTo(k+12,y0+8);g.stroke()}g.restore();return}
  const WT=t===5?'#959ca4':t===4?'#8b9198':'#979996',OL='#24242a';g.fillStyle=ghShade(WT,-.04);g.fillRect(l,y0-7,40,8);g.strokeStyle=OL;g.lineWidth=1.4;g.beginPath();g.moveTo(l,y0-7);g.lineTo(r,y0-7);g.moveTo(l,y0+1);g.lineTo(r,y0+1);g.stroke();
  for(let k=xa+5;k<xb-12;k+=24){if(k+14<l||k>r)continue;g.fillStyle=ghShade(WT,-.01);g.beginPath();g.roundRect(k,y0-19,14,13,2);g.fill();g.fillStyle=ghShade(WT,.2);g.fillRect(k+1.5,y0-18,11,1.6);g.strokeStyle=OL;g.lineWidth=1.3;g.stroke()}g.restore()}
drawP=(f=>function(x,y){try{if(ghHere()){const t=ghT();if(t>=2){const R=ghWReg(x-1600,y-1600,t);if(R&&R.l>0){const a=Array.prototype.slice.call(arguments);a[1]=y-R.l;const r=f.apply(this,a);if(R.k==='s')ghParPatch(x,t);return r}}}}catch(e){}return f.apply(this,arguments)})(drawP);
/* ป้ายบอกบันได */
ghDraw2=(f=>function(t,col,now){const r=f.apply(this,arguments);try{if(t>=2&&!(GHS.hd&&GHS.gq))ghWVec(t)}catch(e){}try{if(t>=2&&!GWW.on)[-388,388].forEach(x=>{const X=1600+x,Y=1600-392;if(Math.hypot(me.x-X,me.y-Y)<230){g.font='bold 11px system-ui';g.textAlign='center';const s='🪜 ขึ้นกำแพง',w=g.measureText(s).width+14;g.fillStyle='rgba(30,20,10,.78)';g.beginPath();g.roundRect(X-w/2,Y+34,w,17,8);g.fill();g.fillStyle='#ffe6b0';g.fillText(s,X,Y+47)}})}catch(e){}return r})(ghDraw2);
/* ---------- ศึก: ดาเมจบนเชิงเทิน ---------- */
const ghWBuf=()=>{try{return ghrHere()&&GWW.on&&me.down<=0&&!!ghWOn(me)}catch(e){return false}};
fdM=(f=>function(k){let v=f.apply(this,arguments);try{if(k==='dm'&&ghWBuf())v+=.25}catch(e){}return v})(fdM);
buffList=(f=>function(){const L=f.apply(this,arguments);try{if(ghWBuf())L.push({k:'ghw',ic:'🏰',n:'บนเชิงเทิน',d:'ดาเมจ +25% · มอนประชิดตีไม่ถึง · ระวังธนู',t:0,mx:0,col:'#c8d0d8'})}catch(e){}return L})(buffList);
/* ---------- ศึก: มอนไม่เล็งคนบนกำแพง · ยิงธนูขึ้นกำแพง ---------- */
const nwT=()=>performance.now();
function ghWArrow(m,p,R,isS){GWW.nf=(GWW.nf|0)+1;const lift=R.l,sx=m.x,sy=m.y-14,tx=p.x,ty=p.y-lift-14,a=Math.atan2(ty-sy,tx-sx),d=Math.hypot(tx-sx,ty-sy),spd=300,dur=d/spd,dmg=Math.round((4+2*(m.L|0))*.6*(m.dmx||1));
  m.akN=((m.akN|0)+1)%100;m.akT=performance.now();GWW.wq.push(isS?{sd:p,at:performance.now()+dur*1000,dmg:Math.round(dmg*1.4)}:{u:p.u,at:performance.now()+dur*1000,dmg});try{fx({k:'mproj',x:Math.round(sx),y:Math.round(sy),a:Math.round(a*1000)/1000,s:spd,d:Math.round(dur*100)/100,kd:'bolt',c:'255,214,150',big:0})}catch(e){}}
ghrMon=(f=>function(m,dt,pl,spd){
  const W=[],G=[];for(const p of pl){const R=ghWOn(p);if(R)W.push([p,R]);else G.push(p)}
  if(GRD.sol)GRD.sol.forEach((sd,i)=>{if(sd.hp>0){const R=ghWOn(sd);if(R)W.push([sd,R,'s'+i])}});
  if(GWW.wq.length){const now=performance.now();GWW.wq=GWW.wq.filter(q=>{if(q.at>now)return true;if(q.sd){if(q.sd.hp>0)q.sd.hp-=q.dmg;return false}const p=pl.find(o=>o.u===q.u);if(p&&ghWOn(p)){try{dmgQ[q.u]=(dmgQ[q.u]||0)+q.dmg}catch(e){}}return false})}
  if(W.length&&m.hp>0&&m.t!==3&&(m.t|0)>=1&&m.y>1600+440){m.rc=(m.rc||0)-dt;if(m.rc<=0){const C=W.filter(q=>Math.hypot(q[0].x-m.x,q[0].y-m.y)<300&&(nwT()-((GWW.pc||{})[q[2]||q[0].u]||0))>1000),b=C.length?C[Math.floor(Math.random()*C.length)]:null;const pc=GWW.pc||(GWW.pc={}),nw=performance.now();const key=b?(b[2]||b[0].u):'';if(b&&(nw-(pc[key]||0))>1000){pc[key]=nw;m.rc=2.2+Math.random()*1.6;ghWArrow(m,b[0],b[1],!!b[2])}else m.rc=.3}}
  if(m.tg&&W.some(q=>q[0].u===m.tg)){m.tg=null;m.tt=0}
  const S0=GRD.sol;if(S0)GRD.sol=S0.filter(sd=>!ghWOn(sd));let r;try{r=f.call(this,m,dt,G,spd)}finally{GRD.sol=S0}
  if(r===false){let b=null,bd=150;for(const p of G){const d=Math.hypot(p.x-m.x,p.y-m.y);if(d<bd){bd=d;b=p}}if(b){m.tg=b.u;m.tt=.6}else return true}
  return r})(ghrMon);

/* ---------- v464 ----------
   - ghLiftOf: ระยะยกของคนบนกำแพง (ใช้กับกล่องแชตเหนือหัว)
   - ghWVec: ทางเดินบนกำแพง+บันไดแบบเรียบ สำหรับโหมดภาพเวกเตอร์/ประหยัด (ขึ้นกำแพงได้ทุกโหมด)
   - กระดานประกาศ: ขีดเขียนบนกระดาษ + เดินใกล้แล้วขึ้นแผ่นประกาศอ่านได้ */
function ghLiftOf(x,y){try{if(!ghHere())return 0;const R=ghWReg(x-1600,y-1600,ghT());return R?R.l:0}catch(e){return 0}}
function ghWVec(t){const L=ghWL(t),hw=ghHWd(t),X=1600,Y=1600,st=t>=3,fill=st?'#7a7670':'#8a6038',ln=st?'#2a2a2e':'#2a1a0c';
  const band=(x0,x1,y0,y1,l)=>{const a=Y+y0-l+15,b=Y+y1-l+15;if(!inView((X+x0+X+x1)/2,(a+b)/2,Math.max(x1-x0,b-a)))return;g.fillStyle=fill;g.fillRect(X+x0,a,x1-x0,b-a);g.strokeStyle=ln;g.lineWidth=1.4;g.strokeRect(X+x0,a,x1-x0,b-a)};
  band(-612,-hw,-498,-474,L.n);band(hw,612,-498,-474,L.n);band(-614,-586,-498,436,L.e);band(586,614,-498,436,L.e);band(-612,-170,412,436,L.s);band(170,612,412,436,L.s);
  [-1,1].forEach(sg=>{const x0=X+(sg<0?-408:368),top=Y-474-(L.n-15),bot=Y-392;if(!inView(x0+20,(top+bot)/2,120))return;g.fillStyle=st?'#5a5a60':'#5a3a1e';g.fillRect(x0,top,40,bot-top);g.strokeStyle=ln;g.lineWidth=1.2;g.strokeRect(x0,top,40,bot-top);for(let k=1;k<9;k++){const yy=bot-(bot-top)*k/9;g.beginPath();g.moveTo(x0,yy);g.lineTo(x0+40,yy);g.stroke()}})}
ghDraw2=(f=>function(t,col,now){const r=f.apply(this,arguments);try{ghBoardHD(t,now)}catch(e){}return r})(ghDraw2);
function ghBoardHD(t,now){if(!(GHS.hd&&GHS.gq))return;const G=GDS.g,X=1600+GHBD.x,Y=1600+GHBD.y,w=76*1.08,q=GQD.f.pr_board;if(!q||!inView(X,Y-50,140))return;const h=w*q[3]/q[2],x0=X-w/2,y0=Y-h;
  g.save();g.strokeStyle='rgba(60,40,20,.55)';g.lineWidth=.8;[[.34,.25,.31,4],[.2,.46,.15,4],[.42,.47,.24,4],[.42,.66,.16,3]].forEach(([fx,fy,fw,n])=>{for(let k=0;k<n;k++){const yy=y0+h*fy+k*2.6,ww=w*fw*(k===n-1?.6:1);g.beginPath();g.moveTo(x0+w*fx,yy);g.lineTo(x0+w*fx+ww,yy);g.stroke()}});g.restore();
  if(Math.hypot(me.x-X,me.y-Y)>130)return;const nt=String((G&&G.nt)||'ยังไม่มีประกาศจากหัวหน้ากิลด์');g.save();g.font='11px system-ui';const L=[];let ln='';for(const ch of nt){const tt=ln+ch;if(g.measureText(tt).width>190&&ln){L.push(ln);ln=ch;if(L.length>=5)break}else ln=tt}if(ln&&L.length<6)L.push(ln);
  const bw=214,bh=30+L.length*15,bx=X-bw/2,by=y0-bh-10;g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.roundRect(bx+3,by+4,bw,bh,6);g.fill();const gr=g.createLinearGradient(0,by,0,by+bh);gr.addColorStop(0,'#f2e4c2');gr.addColorStop(1,'#d8c49a');g.fillStyle=gr;g.beginPath();g.roundRect(bx,by,bw,bh,6);g.fill();g.strokeStyle='#5a3a1e';g.lineWidth=1.6;g.stroke();
  g.fillStyle='#5a3a1e';g.beginPath();g.moveTo(X-7,by+bh);g.lineTo(X+7,by+bh);g.lineTo(X,by+bh+8);g.closePath();g.fill();g.textAlign='center';g.font='bold 11px system-ui';g.fillStyle='#4a2a10';g.fillText('📜 ประกาศกิลด์'+(G?' ['+G.tag+']':''),X,by+16);g.font='11px system-ui';g.fillStyle='#3a2410';L.forEach((s2,i)=>g.fillText(s2,X,by+32+i*15));g.restore()}
/* ---------- v465 · ทุ่งรบด้านใต้ (นอกกำแพง) ----------
   ภาพแคชแยก (x −920..920 · y 440..1200) วาดก่อนภาพบ้าน: หญ้า · ลานดินที่ถูกเหยียบหน้ากำแพง · ถนนจากประตู · หิน/หญ้า/รอยไหม้
   · แนวรั้วไม้แหลมกันม้า · ชายป่าด้านใต้และด้านข้าง (มอนโผล่จากป่า) */
const GHF={cv:null,k:''};
function ghFieldBuild(t){const X0=-920,Y0=440,WD=1840,HT=920,cv=document.createElement('canvas');cv.width=WD;cv.height=HT;const c=cv.getContext('2d');c.translate(-X0,-Y0);
  let sd=4242+t*7;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647,RR=(a,b)=>a+rn()*(b-a),OL='#1e2414';
  const blob=(x,y,r,rgb,a)=>{const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+rgb+','+a+')');gr.addColorStop(1,'rgba('+rgb+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  const MXF=typeof mxOn==='function'&&mxOn();if(!MXF){c.fillStyle='#4b6a33';c.fillRect(X0,Y0,WD,HT)}
  for(let i=0;i<(MXF?40:160);i++)blob(RR(X0,X0+WD),RR(Y0,Y0+HT),RR(40,140),rn()<.5?'120,150,70':'26,40,18',RR(.05,.12)*(MXF?.6:1));
  /* ลานดินที่ถูกเหยียบหน้ากำแพง + รอยไหม้ */
  for(let i=0;i<70;i++){const x=RR(-640,640),y=RR(455,640);blob(x,y,RR(30,90),'110,88,58',RR(.18,.32))}
  for(let i=0;i<14;i++){const x=RR(-780,780),y=RR(500,1000);blob(x,y,RR(18,40),'20,14,10',RR(.25,.4))}
  /* ถนนจากประตู */
  c.save();c.lineCap='round';c.lineJoin='round';const road=[0,446,6,600,-14,760,10,920,-6,1080,0,1220];const path=(w,col,a)=>{c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(road[0],road[1]);for(let i=2;i<road.length;i+=2)c.lineTo(road[i],road[i+1]);c.stroke()};
  path(124,'#3a2c1a',.35);path(108,'#8a7452',1);path(60,'#a08a64',.45);c.globalAlpha=1;c.strokeStyle='rgba(60,44,26,.4)';c.lineWidth=3;[-22,22].forEach(dx=>{c.beginPath();for(let y=450;y<1210;y+=12){const x=dx+Math.sin(y*.02)*3;y===450?c.moveTo(x,y):c.lineTo(x,y)}c.stroke()});c.restore();
  /* หินกับหญ้า (เส้นขอบเข้มแบบเดียวกับอาคาร) */
  const peb=(x,y,r)=>{c.fillStyle=ghShade('#7a7c7a',RR(-.15,.12));c.strokeStyle='#22201c';c.lineWidth=1.1;c.beginPath();c.ellipse(x,y,r,r*.62,0,0,7);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.ellipse(x-r*.3,y-r*.25,r*.42,r*.2,0,0,7);c.fill()};
  const tuft=(x,y,s)=>{const G=['#5d8c36','#6fa042','#4a7a2c','#86b452'];c.lineCap='round';for(let k=0;k<5;k++){const bx=x+(k-2)*1.7*s,tx=x+(k-2)*2.8*s+RR(-1,1)*s,ty=y-RR(6,12)*s;c.strokeStyle=OL;c.lineWidth=2.4*s;c.beginPath();c.moveTo(bx,y);c.quadraticCurveTo(bx,y-4*s,tx,ty);c.stroke();c.strokeStyle=G[k%4];c.lineWidth=1.2*s;c.beginPath();c.moveTo(bx,y);c.quadraticCurveTo(bx,y-4*s,tx,ty);c.stroke()}};
  for(let i=0;i<120;i++){const x=RR(-900,900),y=RR(470,1150);if(Math.abs(x)<70)continue;peb(x,y,RR(2.5,7))}
  for(let i=0;i<420;i++){const x=RR(-910,910),y=RR(460,1170);if(Math.abs(x)<64)continue;tuft(x,y,RR(.7,1.3))}
  /* รั้วไม้แหลมกันม้า (ของแต่ง ไม่ชน) */
  const stake=(x,y)=>{c.save();c.translate(x,y);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,4,34,6,0,0,7);c.fill();c.fillStyle='#5a3a1e';c.strokeStyle='#1e140c';c.lineWidth=1.4;c.fillRect(-32,-6,64,7);c.strokeRect(-32,-6,64,7);
    [-24,-8,8,24].forEach((dx,i)=>{const s=i%2?1:-1;c.save();c.translate(dx,-3);c.rotate(s*.6);c.fillStyle='#8a6038';c.fillRect(-3,-22,6,30);c.strokeRect(-3,-22,6,30);c.fillStyle='#c8a070';c.beginPath();c.moveTo(-3,-22);c.lineTo(0,-30);c.lineTo(3,-22);c.closePath();c.fill();c.stroke();c.restore()});c.restore()};
  [[-560,720],[-330,760],[330,750],[560,710],[-720,860],[720,880],[-200,880],[220,900]].forEach(([x,y])=>stake(x,y));
  /* ชายป่า: ด้านใต้ + ด้านข้าง (ต้นไม้ชุดบ้านกิลด์ถ้าโหลดแล้ว) */
  c.fillStyle='#1c2814';c.fillRect(X0,1190,WD,180);const fg=c.createLinearGradient(0,1060,0,1200);fg.addColorStop(0,'rgba(10,16,8,0)');fg.addColorStop(1,'rgba(20,30,14,.85)');c.fillStyle=fg;c.fillRect(X0,1060,WD,140);
  const TR=[];for(let x=-930;x<=930;x+=RR(52,74)){if(Math.abs(x)<80)continue;TR.push([x+RR(-10,10),1150+RR(-24,28),RR(.85,1.25)])}
  for(let y=520;y<1150;y+=RR(56,80)){TR.push([-905+RR(-12,12),y,RR(.8,1.15)]);TR.push([905+RR(-12,12),y,RR(.8,1.15)])}
  for(let x=-930;x<=930;x+=RR(46,66))TR.push([x+RR(-10,10),1230+RR(-20,30),RR(.9,1.3)]);for(let x=-930;x<=930;x+=RR(46,66))TR.push([x+RR(-10,10),1320+RR(-16,30),RR(.9,1.3)]);TR.sort((a,b)=>a[1]-b[1]);const ok=typeof GQI!=='undefined'&&GQI.ok===1&&GQI.img;
  TR.forEach(([x,y,s],i)=>{c.fillStyle='rgba(0,0,0,.32)';c.beginPath();c.ellipse(x+4,y+2,30*s,8*s,0,0,7);c.fill();
    if(ok){const q=GQD.f[i%3===0?'fm_oak':'fm_tree'];if(q){const w=100*s,h=w*q[3]/q[2];c.save();c.filter='brightness('+(y>1280?.4:y>1180?.5:y>1120?.62:.8)+') saturate(.85)';c.drawImage(GQI.img,q[0],q[1],q[2],q[3],x-w/2,y-h,w,h);c.restore();return}}
    c.fillStyle='#4a3020';c.fillRect(x-5*s,y-34*s,10*s,34*s);c.fillStyle=y>1120?'#2a4020':'#3a5a2a';c.strokeStyle=OL;c.lineWidth=1.5;c.beginPath();c.arc(x,y-50*s,32*s,0,7);c.fill();c.stroke()});
  return{cv,X0,Y0,WD,HT}}
function ghFieldClear(){const inF=o=>o&&o.x>1600-960&&o.x<1600+960&&o.y>1600-520&&o.y<1600+1240;[typeof trees!=='undefined'?trees:null,typeof decor!=='undefined'?decor:null].forEach(A=>{if(!Array.isArray(A))return;let j=0;for(let i=0;i<A.length;i++){if(!inF(A[i]))A[j++]=A[i]}A.length=j})}
ghEnter=(f=>function(){const r=f.apply(this,arguments);GHF.cl=0;return r})(ghEnter);
ghDraw=(f=>function(){try{if(ghHere()){if(!GHF.cl){GHF.cl=1;try{ghFieldClear()}catch(e){}}const t=ghT(),k=t+'|'+((typeof GQI!=='undefined'&&GQI.ok===1)?1:0)+'|'+((typeof mxOn==='function'&&mxOn())?1:0);if(GHF.k!==k||!GHF.cv){GHF.F=ghFieldBuild(t);GHF.cv=GHF.F.cv;GHF.k=k}const F=GHF.F,ox=1600+F.X0,oy=1600+F.Y0,sx=Math.max(0,cam.x-ox),sy=Math.max(0,cam.y-oy),sw=Math.min(F.WD-sx,W+2),sh=Math.min(F.HT-sy,H+2);if(sw>0&&sh>0)g.drawImage(GHF.cv,sx,sy,sw,sh,ox+sx,oy+sy,sw,sh)}}catch(e){}return f.apply(this,arguments)})(ghDraw);
