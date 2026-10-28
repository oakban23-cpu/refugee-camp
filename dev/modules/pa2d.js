
/* ---------- v548 ดันเจี้ยน «ศึกป้องกันต้นค้ำ» (ห้อง 41000–41999 · DT[32]) ----------
   โพรงรากใต้นครรากลึก: ลำต้นแม่ไม้กลางลาน (เดินทะลุไม่ได้) · รากแก้ว 3 เส้นมีเลือด · อุโมงค์ 4 ทาง
   3 คลื่น → บอส «ตัวกัดรากยักษ์»: รอยแยก (เตือน 1.5 วิ) · มุดดินไปโผล่ที่รากแก้ว (ยืนขวางในวงเตือน = รากเสียครึ่งเดียว + บอสมึน)
   เรียกลูกฝูง (<50%) · คลั่ง (<30%) · รากขาดหมด / หมดเวลา / ทีมล้มหมด = แพ้ */
setTimeout(()=>{DT[32]={n:'ศึกป้องกันต้นค้ำ',lv:1,L:160,bL:22,hp:12500000,xp:1250000,g:150000,dm:80,tn:10,sm:2,rm:4,lg:1,tm:960,gold:1000000,exp:9200000}},0);
const PTDI=()=>!!(MAPS[curMap]&&MAPS[curMap].ptd),ptdBack=()=>({x:PBKED.x+80,y:PBKED.y+70});
const PTRA=[-2.618,-.5236,1.5708],ptdE=()=>PTRA.map(a=>[CX+Math.cos(a)*265,CY+Math.sin(a)*265]);
const PTLA=[-2.0,-1.13,.52,2.62],ptL=()=>PTLA.map(a=>[CX+Math.cos(a)*(DR-24),CY+Math.sin(a)*(DR-24)]);
const PTTR=126,PTBD=3.4,PTMV=2.2,PTBR=120,PTH=640,PTR0=118,ptdHW=y=>PTR0*(1+.3*Math.exp(-((y/40)**2)))*(1-.14*(-y/PTH)),ptdVein=(v,u)=>Math.sin(u*5.2+v*2.1)*.72;
let PTW={e:[100,100,100],wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:[0,0,0],bur:0,bd:PTBD,bi:-1,bp:null,bw:null,tr:[],lt:0},PTLN=[],PTTL=[],PTEB=[];const PTDC={};
const ptdReset=()=>{PTW={e:[100,100,100],wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:[0,0,0],bur:0,bd:PTBD,bi:-1,bp:null,bw:null,tr:[],lt:0};PTLN=[];PTTL=[];PTEB=[]};
const ptDest=i=>{const[x,y]=ptdE()[i],a=PTRA[i];return[x+Math.cos(a)*46,y+Math.sin(a)*46]};
const PTD_IN=[['nar','โพรงรากใต้นครรากลึก… ลำต้นของแม่ไม้หยั่งลงมาจากความมืดเบื้องบน รากแก้วสามเส้นแผ่ออกไปตามพื้นแล้วมุดลงสู่ฐานแผ่นดิน แต่ละเส้นใหญ่กว่าบ้านทั้งหลัง'],
  ['thu','(ธุลีชูโคมเห็ดส่องรอบโพรง) ฟังสิ… เสียงกัดแทะดังมาจากอุโมงค์ทั้งสี่ พวกมันตามกลิ่นยางที่เรารดเมื่อวานมา!'],
  ['thu','ปุ่มรากที่มีก้อนยางทองเรือง ๆ คือหัวใจของรากแก้วแต่ละเส้น ถ้ามันถูกกัดขาด… แม่ไม้จะเอนลง'],
  ['nar','💡 ฝูงกัดแผ่นดินจะวิ่งไปกัดรากแก้วที่ใกล้สุด → สกัดไว้ก่อน · ยืนในวงทองรอบรากตอนไม่มีศัตรูใกล้ = รดยางซ่อมราก · ผ่าน 3 คลื่นแล้วตัวกัดรากยักษ์จะมุดขึ้นมา · รอยแยกสีอำพันบนพื้น → หลบออกจากแนว · มันมุดดินไปโผล่ที่รากไหน (วงเตือน) → ยืนขวางในวง = รากเสียหายครึ่งเดียวและมันจะมึนงง · รากขาดหมดทั้ง 3 = แพ้']];
function ptdMap(id){if(MAPS[id])return MAPS[id];const D=DT[32];ptdReset();
  return MAPS[id]={n:'ศึกป้องกันต้นค้ำ',dg:32,ptd:1,th:46,bth:46,sx:CX,sy:CY+400,sr:0,seed:461,bg:'#1a130d',tile:'#3e3022',safe:'#4a3a2a',ring:'#ffd8a0',t1:'#2a1e14',t2:'#4a3a2a',d1:'#2a2018',d2:'#ffe8c0',nests:[],
    gates:[{x:CX-170,y:CY+420,to:44,req:1,ars:1,nm:'นครรากลึก',arr:ptdBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX+202,y:CY-400,n:'ตัวกัดรากยักษ์',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:160,col:'#ffd8a0',bar:'#8a5a2a',ln:'#fff0d0',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'อุโมงค์ฝั่งเหนือ',dg:1}}}
function ptdEnter(){if(!me.cls||me.down>0||isDg())return;const id=41000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🌳 เปิดศึกป้องกันต้นค้ำ รหัส '+id+' มาช่วยกันเฝ้ารากแก้วของแม่ไม้!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  ptdReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+60,y:CY+400});setTimeout(()=>{if(PTDI()&&dg.ph==='lobby')banner={s:'🌳 ศึกป้องกันต้นค้ำ · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function ptdStart(){if(!PTDI()||dg.ph!=='lobby')return;const D=DT[32];stSay(PTD_IN,()=>{if(!PTDI()||dg.ph!=='lobby')return;dg={ph:'run',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;ptdReset();PTW.st='brk';PTW.nt=4;
  fx({k:'msg',s:'🌳 เสียงกัดแทะดังขึ้นจากอุโมงค์ทั้งสี่! ปกป้องรากแก้วทั้งสามของแม่ไม้'});try{sfx('quest')}catch(e){}},{cine:1})}
function ptdAlive(){const r=[];PTW.e.forEach((h,i)=>{if(h>0)r.push(i)});return r}
function ptdSpawn(n,yg){const D=DT[32],np=Math.max(1,plCount()),pts=[];for(let i=0;i<n;i++){const T=ptL()[Math.random()*4|0],x=T[0]+rnd(-26,26),y=T[1]+rnd(-26,26);
    const t=yg?0:(Math.random()<.14+PTW.wv*.06?2:(Math.random()<.45?1:0)),L=D.L+(PTW.wv|0),hp=mhp(t,L)*(1+.25*(np-1));mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,ptd:1});if(pts.length<10)pts.push([Math.round(x),Math.round(y)])}
  if(pts.length)fx({k:'ptdtl',p:pts})}
/* เดินอ้อมลำต้นกลางลาน */
const ptSteer=(x,y,tx,ty)=>{const dx=tx-x,dy=ty-y,L2=dx*dx+dy*dy||1,t=Math.max(0,Math.min(1,((CX-x)*dx+(CY-y)*dy)/L2)),qx=x+dx*t,qy=y+dy*t;if(Math.hypot(qx-CX,qy-CY)>PTTR+26)return[tx,ty];
  const a0=Math.atan2(y-CY,x-CX),a1=Math.atan2(ty-CY,tx-CX);let da=a1-a0;while(da>Math.PI)da-=6.2832;while(da<-Math.PI)da+=6.2832;const a=a0+(da<0?-1:1)*Math.min(Math.abs(da),.7),R=PTTR+64;return[CX+Math.cos(a)*R,CY+Math.sin(a)*R]};
function ptRoute(x0,y0,x1,y1){const P=[[x0,y0]];let x=x0,y=y0;for(let k=0;k<8;k++){const[wx,wy]=ptSteer(x,y,x1,y1);if(wx===x1&&wy===y1)break;P.push([wx,wy]);x=wx;y=wy}P.push([x1,y1]);return P}
function ptdPath(P,u){let L=0;const S=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);S.push(d);L+=d}let r=u*L;for(let i=1;i<P.length;i++){if(r<=S[i-1]||i===P.length-1){const k=S[i-1]?Math.min(1,r/S[i-1]):1;return[P[i-1][0]+(P[i][0]-P[i-1][0])*k,P[i-1][1]+(P[i][1]-P[i-1][1])*k]}r-=S[i-1]}return P[P.length-1]}
function ptdSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  if(!ptdAlive().length){dgEnd(0,'รากแก้วทั้งสามถูกกัดขาด');return}
  const pl=escPl(),E=ptdE();E.forEach(([ex,ey],i)=>{if(PTW.e[i]<=0)return;const thr=mons.some(m=>m.t!==3&&m.hp>0&&Math.hypot(m.x-ex,m.y-ey)<170),guard=pl.some(p=>Math.hypot(p.x-ex,p.y-ey)<110);if(guard&&!thr)PTW.e[i]=Math.min(100,PTW.e[i]+.9*dt)});
  /* มอนเดินทะลุลำต้นไม่ได้ */for(const m of mons){if(m.hp<=0||(m.t===3&&PTW.bur>0))continue;const dx=m.x-CX,dy=m.y-CY,d=Math.hypot(dx,dy);if(d<PTTR&&d>.01){m.x=CX+dx/d*PTTR;m.y=CY+dy/d*PTTR}}
  /* มุดดิน: เนินดินเคลื่อนไปหารากแก้ว แล้วโผล่ */if(PTW.bur>0){const B=mons.find(q=>q.t===3&&q.hp>0);PTW.bur-=dt;if(B&&PTW.bp){const u=Math.min(1,(PTW.bd-PTW.bur)/PTMV),p=ptdPath(PTW.bp,u);B.x=p[0];B.y=p[1];B.tx=B.x;B.ty=B.y}if(PTW.bur<=0){PTW.bur=0;ptdErupt(B)}}
  if(dg.ph==='run'){const np=Math.max(1,plCount());
    if(PTW.st==='brk'){PTW.nt-=dt;if(PTW.nt<=0){PTW.wv++;dg.w=PTW.wv;PTW.st='wave';PTW.q=Math.round((6+PTW.wv*3)*(.7+.45*np));PTW.qt=0;fx({k:'msg',s:'🪲 คลื่นที่ '+PTW.wv+'/3 · ฝูงกัดแผ่นดินมุดออกจากอุโมงค์!'});try{sfx('boss')}catch(e){}}}
    else if(PTW.st==='wave'){PTW.qt-=dt;if(PTW.q>0&&PTW.qt<=0){const k=Math.min(3,PTW.q);ptdSpawn(k);PTW.q-=k;PTW.qt=2.4}
      if(PTW.q<=0&&!mons.some(m=>m.ptd&&m.hp>0)){if(PTW.wv>=3){dg.ph='boss';PTW.st='boss';bossCd=1e9;spawnBoss();dg.tl+=DGBOSS;const b=BS();fx({k:'ptdtl',p:[[b.x,b.y]],big:1});fx({k:'msg',s:'🪲 พื้นทั้งโพรงสั่น… ตัวกัดรากยักษ์มุดขึ้นมาจากอุโมงค์ฝั่งเหนือ!'});try{sfx('boss')}catch(e){}}
        else{PTW.st='brk';PTW.nt=6;fx({k:'msg',s:'✨ ฝูงถอยลงรูแล้ว! ยืนในวงทองเพื่อรดยางซ่อมราก'})}}}}
  PTW.bt-=dt;if(PTW.bt<=0){PTW.bt=.4;fx({k:'ptdv',e:PTW.e.map(v=>Math.round(v*10)/10),wv:PTW.wv,st:PTW.st,bur:Math.round(PTW.bur*10)/10,bi:PTW.bi})}}
function ptdMon(m,dt,pl,spd){if(!PTDI()||(dg.ph!=='run'&&dg.ph!=='boss'))return false;for(const p of pl)if(Math.hypot(p.x-m.x,p.y-m.y)<140)return false;
  const E=ptdE();let bi=-1,bd=1e9;E.forEach(([ex,ey],i)=>{if(PTW.e[i]<=0)return;const d=Math.hypot(ex-m.x,ey-m.y);if(d<bd){bd=d;bi=i}});if(bi<0)return false;
  if(bd>70){const[wx,wy]=ptSteer(m.x,m.y,E[bi][0],E[bi][1]);moveTo(m,wx,wy,spd*1.1*dt);return true}
  if(m.ac<=0){m.ac=1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();PTW.e[bi]=Math.max(0,PTW.e[bi]-(m.t===2?1.6:m.t===0?1.3:1));PTW.hit[bi]=performance.now()}return true}
function ptdBurrow(m,i){const[ex,ey]=ptDest(i),P=ptRoute(m.x,m.y,ex,ey);PTW.bur=PTW.bd=PTBD;PTW.bi=i;PTW.bp=P;m.tf=PTBD+.15;m.tl=[];
  fx({k:'ptdb',p:P.map(q=>[Math.round(q[0]),Math.round(q[1])]),d:PTBD,mv:PTMV,i});fx({k:'msg',s:'🕳️ ตัวกัดรากยักษ์มุดลงดิน… มันกำลังไปที่รากแก้ว '+'๑๒๓'[i]+'! ไปยืนขวางในวงเตือน (ตีเนินดินได้)'})}
function ptdErupt(B){const i=PTW.bi,P=PTW.bp,[ex,ey]=P?P[P.length-1]:(B?[B.x,B.y]:[CX,CY]),pl=escPl(),dm=BS().dm*bossX(),blk=pl.some(p=>Math.hypot(p.x-ex,p.y-ey)<PTBR);
  pl.forEach(p=>{if(Math.hypot(p.x-ex,p.y-ey)<PTBR)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(110*dm)});
  if(i>=0&&PTW.e[i]>0){PTW.e[i]=Math.max(0,PTW.e[i]-(blk?3.5:7));PTW.hit[i]=performance.now()}
  if(B){B.tf=0;B.inv=0;B.x=ex;B.y=ey;B.tx=ex;B.ty=ey;B.hx=ex;B.hy=ey;if(blk)B.stun=2.5;B.w1=Math.max(B.w1||0,3)}
  PTW.bi=-1;PTW.bp=null;fx({k:'ptde',x:Math.round(ex),y:Math.round(ey),b:blk?1:0});fx({k:'msg',s:blk?'🛡️ ขวางไว้ได้! รากแก้วเสียหายแค่ครึ่งเดียว · ตัวกัดรากยักษ์มึนงง':'💥 ตัวกัดรากยักษ์โผล่ขึ้นมากัดรากแก้ว!'})}
function ptdAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh;
  if(m.ql){m.ql.t-=dt;if(m.ql.t<=0){const L=m.ql.l;pl.forEach(p=>{if(L.some(l=>hdSegD(p.x,p.y,l)<46))dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(90*dm)});ptdE().forEach(([ex,ey],i)=>{if(PTW.e[i]>0&&L.some(l=>hdSegD(ex,ey,l)<60)){PTW.e[i]=Math.max(0,PTW.e[i]-5);PTW.hit[i]=performance.now()}});fx({k:'ptdls',l:L});m.ql=null}}
  if(m.stun>0||m.inv||PTW.bur>0)return;
  m.w1=(m.w1===undefined?5:m.w1)-dt;if(m.w1<=0&&!m.ql&&pl.length){m.w1=enr?8:11;const L=[],n=enr?3:2;for(let i=0;i<n;i++){const p=pl[(Math.random()*pl.length)|0];L.push(hdfLine(i?{x:CX+rnd(-200,200),y:CY+rnd(-200,200)}:p))}m.ql={t:1.5,l:L};fx({k:'ptdl',l:L,dur:1.5});fx({k:'msg',s:'🪲 ตัวกัดรากยักษ์ตะกุยดิน! ออกจากแนวรอยแยก'})}
  m.w2=(m.w2===undefined?12:m.w2)-dt;if(m.w2<=0&&!m.ql){m.w2=enr?12:16;const A=ptdAlive();if(A.length)ptdBurrow(m,A[(Math.random()*A.length)|0]);return}
  if(f<.5){m.w3=(m.w3===undefined?2:m.w3)-dt;if(m.w3<=0){m.w3=enr?14:18;ptdSpawn(2+Math.min(2,pl.length-1),1);fx({k:'msg',s:'🪲 ตัวกัดรากยักษ์เรียกลูกฝูงจากอุโมงค์! อย่าให้ถึงรากแก้ว'})}}}
function ptdFx(o){if(!o)return false;const n=performance.now(),own=isHost()&&PTDI();
  if(o.k==='ptdl'){PTLN.push({l:o.l||[],t0:n,d:(+o.dur||1.5)*1000,s:0});if(PTLN.length>8)PTLN.splice(0,PTLN.length-8);return true}
  if(o.k==='ptdls'){PTLN.push({l:o.l||[],t0:n,d:600,s:1});try{shk=Math.max(shk,.28)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='ptdtl'){(o.p||[]).forEach(p=>PTTL.push({x:+p[0],y:+p[1],t0:n,big:o.big?1:0}));if(PTTL.length>30)PTTL.splice(0,PTTL.length-30);return true}
  if(o.k==='ptdb'){if(!own){PTW.bur=+o.d||PTBD;PTW.bd=PTW.bur;PTW.bi=o.i|0}PTW.bw={p:o.p||[],t0:n,d:(+o.d||PTBD)*1000,i:o.i|0};PTW.tr=[];try{sfx('ek_growl')}catch(e){}return true}
  if(o.k==='ptde'){PTEB.push({x:+o.x,y:+o.y,t0:n,b:o.b?1:0});if(PTEB.length>6)PTEB.shift();if(!own){PTW.bur=0;PTW.bi=-1}PTW.bw=null;try{shk=Math.max(shk,.45)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='ptdv'){if(!own){(o.e||[]).forEach((h,i)=>{h=+h;if(h<PTW.e[i]-.05)PTW.hit[i]=n;PTW.e[i]=h});PTW.wv=o.wv|0;PTW.st=o.st;const b=+o.bur||0;if(b<=0)PTW.bur=0;else if(!(PTW.bur>0)||Math.abs(PTW.bur-b)>.5)PTW.bur=b;PTW.bi=o.bi==null?-1:+o.bi}return true}return false}
/* ---------- ฉาก ---------- */
const ptTaper=(c,P,w0,w1,dy,col)=>{const A=[],Bq=[];for(let k=0;k<P.length;k++){const a=P[Math.min(k+1,P.length-1)],b=P[Math.max(k-1,0)],dx=a[0]-b[0],dyy=a[1]-b[1],l=Math.hypot(dx,dyy)||1,nx=-dyy/l,ny=dx/l,w=(w0+(w1-w0)*k/(P.length-1))/2;A.push([P[k][0]+nx*w,P[k][1]+ny*w+dy]);Bq.push([P[k][0]-nx*w,P[k][1]-ny*w+dy])}
  c.fillStyle=col;c.beginPath();A.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));for(let k=Bq.length-1;k>=0;k--)c.lineTo(Bq[k][0],Bq[k][1]);c.closePath();c.fill()};
function ptdPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1,cg=(x,y,r,col,a)=>{if(!inB(x-r,y-r,x+r,y+r))return;const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  c.fillStyle='#120c08';c.fillRect(ox,oy,S,S);
  /* หินนอกลาน */{const R=gxRng(4921);for(let i=0;i<110;i++){const a=R()*6.2832,d=DR+50+R()*520,x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,r=40+R()*100,v=R();if(!inB(x-r,y-r,x+r,y+r))continue;const gr=c.createRadialGradient(x-r*.3,y-r*.35,4,x,y,r);gr.addColorStop(0,v<.5?'#3a2e22':'#2c2218');gr.addColorStop(1,'rgba(18,12,8,0)');c.fillStyle=gr;c.beginPath();c.arc(x,y,r,0,7);c.fill()}}
  c.save();c.beginPath();c.arc(CX,CY,DR+24,0,7);c.clip();
  {const gr=c.createRadialGradient(CX,CY,60,CX,CY,DR+30);gr.addColorStop(0,'#4a3a28');gr.addColorStop(.55,'#3a2c1f');gr.addColorStop(1,'#271d14');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  palGrid(ox,oy,X1,Y1,120,90,1,(x,y,i,j)=>{const h=palH(i,j,4922),px=x+palH(j,i,4923)*80,py=y+palH(i,j,4924)*60,r=30+h*70;c.fillStyle=h<.4?'rgba(20,14,8,.28)':h<.75?'rgba(96,76,52,.2)':'rgba(70,110,50,.22)';c.beginPath();c.ellipse(px,py,r,r*.5,0,0,7);c.fill();
    for(let k=0;k<6;k++){const qx=x+palH(i*7+k,j,4925)*120,qy=y+palH(i,j*7+k,4926)*90,s=1.4+palH(k,i+j,4927)*3;c.fillStyle=k%2?'rgba(14,10,6,.4)':'rgba(140,116,84,.32)';c.beginPath();c.ellipse(qx,qy,s,s*.6,0,0,7);c.fill()}});
  /* มอสเรือง + เส้นใยเห็ด */{const R=gxRng(4928);for(let i=0;i<46;i++){const a=R()*6.2832,d=150+R()*(DR-170),x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,r=20+R()*46,gl=R(),an=R();if(!inB(x-r,y-r,x+r,y+r))continue;c.fillStyle='rgba(60,108,44,.5)';c.beginPath();c.ellipse(x,y,r,r*.5,an-.5,0,7);c.fill();c.fillStyle='rgba(110,170,74,.35)';c.beginPath();c.ellipse(x-r*.2,y-r*.1,r*.5,r*.22,0,0,7);c.fill();
      if(gl<.55)for(let k=0;k<4;k++){const px=x+(palH(i,k,4929)-.5)*r*1.3,py=y+(palH(k,i,4930)-.5)*r*.6;cg(px,py,6,'190,255,130',.35);c.fillStyle='rgba(230,255,170,.9)';c.fillRect(px-.8,py-.8,1.6,1.6)}}
    c.lineCap='round';for(let i=0;i<26;i++){const a=R()*6.2832,d=160+R()*(DR-190);let x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d;const P=[[x,y]];for(let k=0;k<6;k++){x+=(R()-.5)*44;y+=(R()-.5)*28;P.push([x,y])}if(!P.some(([px,py])=>inB(px-30,py-30,px+30,py+30)))continue;pbThread(c,P,cg)}}
  /* ดินร่วงพูนออกจากอุโมงค์ */PTLA.forEach((a,i)=>{const R=gxRng(4960+i),pts=[];for(let k=0;k<26;k++){const d=DR-40-R()*130,w=(R()-.5)*(DR-d)*.9,x=CX+Math.cos(a)*d-Math.sin(a)*w,y=CY+Math.sin(a)*d+Math.cos(a)*w;pts.push([x,y,4+R()*12,R()])}
    for(const[x,y,s,v]of pts){if(!inB(x-s,y-s,x+s,y+s))continue;c.fillStyle=v<.5?'rgba(96,74,50,.55)':'rgba(70,54,36,.55)';c.beginPath();c.ellipse(x,y,s,s*.55,0,0,7);c.fill()}
    for(let k=0;k<5;k++){const d=DR-60-k*26,x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,ph=palH(i,k,4965)*6.2832;if(!inB(x-14,y-14,x+14,y+14))continue;c.fillStyle='rgba(20,12,6,.35)';for(const s of[-1,1]){c.beginPath();c.ellipse(x+Math.cos(ph)*6*s,y+Math.sin(ph)*4*s,4,2.4,ph,0,7);c.fill()}}});
  /* รากค้ำสั้น ๆ รอบโคน */[-1.5708,.5236,2.618,-1.15,-2.0,.12,.95,2.2,3.05].forEach((a,i)=>{const P=[];for(let d=90;d<=172;d+=12){const w=Math.sin(d*.05+i)*6;P.push([CX+Math.cos(a)*d-Math.sin(a)*w,CY+Math.sin(a)*d+Math.cos(a)*w])}if(!inB(CX-200,CY-200,CX+200,CY+200))return;ptTaper(c,P,44,10,7,'rgba(8,4,2,.38)');ptTaper(c,P,40,8,0,'#3e2a18');ptTaper(c,P,26,5,-3,'#5e4228');ptTaper(c,P,8,2,-8,'rgba(220,180,130,.2)')});
  /* รากแก้ว 3 เส้น: จากโคนไปปุ่มราก แล้วมุดลงดิน (สันดินนูนต่อไปถึงผนัง) */PTRA.forEach((a,i)=>{const R=gxRng(4940+i),P=[],Q=[],kn=[];for(let d=96;d<=262;d+=11){const w=Math.sin(d*.03+i)*9;P.push([CX+Math.cos(a)*d-Math.sin(a)*w,CY+Math.sin(a)*d+Math.cos(a)*w])}
    for(let d=300;d<=DR+24;d+=18){const w=Math.sin(d*.025+i*2)*14;Q.push([CX+Math.cos(a)*d-Math.sin(a)*w,CY+Math.sin(a)*d+Math.cos(a)*w])}for(let q=0;q<12;q++)kn.push([R(),R(),R()]);
    let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[x,y]of P.concat(Q)){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y)}if(!inB(x0-80,y0-80,x1+80,y1+80))return;
    for(const[w,col,o]of[[30,'rgba(10,6,4,.32)',4],[22,'#3a2a1c',0],[9,'rgba(150,120,80,.24)',-4]]){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();Q.forEach(([x,y],k)=>k?c.lineTo(x,y+o):c.moveTo(x,y+o));c.stroke()}
    c.strokeStyle='rgba(14,8,4,.7)';c.lineWidth=1.6;for(let k=1;k<Q.length;k+=2){const[x,y]=Q[k];c.beginPath();c.moveTo(x-9,y-3);c.lineTo(x+1,y+1);c.lineTo(x+9,y-3);c.stroke()}
    ptTaper(c,P,72,44,9,'rgba(8,4,2,.42)');ptTaper(c,P,66,40,0,'#3a2616');ptTaper(c,P,50,28,-3,'#5e4228');ptTaper(c,P,24,10,-9,'rgba(220,176,120,.2)');
    c.strokeStyle='rgba(20,12,6,.5)';c.lineWidth=2;for(const s of[-.6,-.2,.25,.6]){c.beginPath();P.forEach(([x,y],k)=>{const w=(66-26*k/(P.length-1))/2*s,nx=-Math.sin(a),ny=Math.cos(a);k?c.lineTo(x+nx*w,y+ny*w-2):c.moveTo(x+nx*w,y+ny*w-2)});c.stroke()}
    for(const[u,v,s]of kn){const k=Math.min(P.length-1,Math.floor(u*(P.length-1))),[x,y]=P[k];c.fillStyle='#4a3220';c.beginPath();c.ellipse(x+(v-.5)*22,y-5,6+s*6,4+s*3,0,0,7);c.fill();c.fillStyle='rgba(230,190,140,.18)';c.beginPath();c.ellipse(x+(v-.5)*22-2,y-7,3+s*3,1.6+s*1.4,0,0,7);c.fill()}
    c.strokeStyle='rgba(255,176,70,.38)';c.lineWidth=3;c.beginPath();P.forEach(([x,y],k)=>k?c.lineTo(x,y-7):c.moveTo(x,y-7));c.stroke();c.strokeStyle='rgba(255,230,160,.3)';c.lineWidth=1;c.stroke();
    for(let k=2;k<P.length;k+=4){const[x,y]=P[k];c.fillStyle='rgba(84,140,58,.7)';c.beginPath();c.ellipse(x+4,y-10,10,4,0,0,7);c.fill()}});
  /* วงซ่อม (รดยาง) รอบรากแก้ว */c.strokeStyle='rgba(255,214,140,.5)';c.lineWidth=3;c.setLineDash([12,9]);ptdE().forEach(([x,y])=>{if(!inB(x-115,y-115,x+115,y+115))return;c.beginPath();c.arc(x,y,110,0,7);c.stroke()});c.setLineDash([]);
  /* แอ่งยางซึม */ptdE().forEach(([x,y],i)=>{const a=PTRA[i]+1.9,px=x+Math.cos(a)*70,py=y+Math.sin(a)*42;if(!inB(px-30,py-30,px+30,py+30))return;c.fillStyle='rgba(150,96,30,.55)';c.beginPath();c.ellipse(px,py,22,8,0,0,7);c.fill();c.fillStyle='rgba(255,200,110,.4)';c.beginPath();c.ellipse(px-5,py-2,9,2.6,0,0,7);c.fill();cg(px,py,30,'255,180,80',.12)});
  c.restore();
  /* ขอบผนังดิน + หิน + รากห้อย */c.strokeStyle='#1e150e';c.lineWidth=36;c.beginPath();c.arc(CX,CY,DR+30,0,7);c.stroke();c.strokeStyle='#3e3022';c.lineWidth=10;c.beginPath();c.arc(CX,CY,DR+16,0,7);c.stroke();c.strokeStyle='rgba(210,180,140,.2)';c.lineWidth=2;c.beginPath();c.arc(CX,CY,DR+11,0,7);c.stroke();
  {const R=gxRng(4970);for(let i=0;i<70;i++){const a=R()*6.2832,d=DR+14+R()*26,x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,s=8+R()*16,v=R();if(!inB(x-s,y-s,x+s,y+s))continue;c.fillStyle=v<.5?'#3a2e22':'#4a3a2c';c.beginPath();c.ellipse(x,y,s,s*.66,0,0,7);c.fill();c.fillStyle='rgba(220,190,150,.15)';c.beginPath();c.ellipse(x-s*.25,y-s*.3,s*.5,s*.22,0,0,7);c.fill()}
    for(let i=0;i<34;i++){const a=R()*6.2832,x=CX+Math.cos(a)*(DR+12),y=CY+Math.sin(a)*(DR+12),L=26+R()*50,w=2+R()*3.4,bd=(R()-.5)*20;if(!inB(x-L,y-L,x+L,y+L))continue;const ix=-Math.cos(a),iy=-Math.sin(a);c.strokeStyle='#3a2818';c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+ix*L*.5+bd,y+iy*L*.5,x+ix*L,y+iy*L);c.stroke();if(R()<.35)cg(x+ix*L,y+iy*L,8,'255,190,90',.4)}}}
/* ลำต้นแม่ไม้ (แคชสไปรต์) */
function ptdTrunkSpr(){if(PTDC.t)return PTDC.t;const r=PTR0,H=PTH,Wd=Math.ceil(r*3.1),Hh=H+110,cv=document.createElement('canvas');cv.width=Wd;cv.height=Hh;const c=cv.getContext('2d'),bx=Wd/2,by=H+60,R=gxRng(4931),hw=ptdHW;
  c.save();c.translate(bx,by);
  const out=()=>{c.beginPath();for(let k=0;k<=36;k++){const y=-k/36*H;c.lineTo(-hw(y)+Math.sin(k*1.7)*2,y)}for(let k=36;k>=0;k--){const y=-k/36*H;c.lineTo(hw(y)+Math.sin(k*1.3+1)*2,y)}c.closePath()};
  out();{const gr=c.createLinearGradient(-r*1.3,0,r*1.3,0);gr.addColorStop(0,'#1e140a');gr.addColorStop(.24,'#4e3824');gr.addColorStop(.42,'#7a5838');gr.addColorStop(.58,'#5e4430');gr.addColorStop(.82,'#36261a');gr.addColorStop(1,'#140c06');c.fillStyle=gr;c.fill()}
  c.save();out();c.clip();
  for(let k=0;k<18;k++){const x0=-r*1.15+(k+.5)/18*2.3*r,ph=R()*6,w=2+R()*3;for(const[lw,col,o]of[[w,'rgba(16,10,4,.6)',0],[1.2,'rgba(220,180,130,.13)',w]]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();for(let q=0;q<=40;q++){const y=-q/40*H,s=hw(y)/hw(0),x=x0*s+Math.sin(q*.45+ph)*5+o;q?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}}
  for(let k=0;k<5;k++){const y=-100-R()*H*.55,x=(R()-.5)*r*1.1,s=8+R()*10;c.fillStyle='#24160c';c.beginPath();c.ellipse(x,y,s*.7,s,0,0,7);c.fill();c.strokeStyle='rgba(200,160,110,.25)';c.lineWidth=2;c.beginPath();c.ellipse(x,y,s*.95,s*1.3,0,0,7);c.stroke();c.fillStyle='rgba(255,170,60,.45)';c.beginPath();c.ellipse(x,y,s*.25,s*.4,0,0,7);c.fill()}
  for(let k=0;k<28;k++){const y=-R()*H*.7,x=(R()-.62)*r*1.6,s=8+R()*20,an=R()-.5;c.fillStyle='rgba(76,132,56,.62)';c.beginPath();c.ellipse(x,y,s,s*.45,an,0,7);c.fill();c.fillStyle='rgba(150,210,100,.4)';c.beginPath();c.ellipse(x-s*.2,y-s*.12,s*.5,s*.18,0,0,7);c.fill()}
  for(let v=0;v<3;v++){for(const[lw,col]of[[4.4,'rgba(200,130,40,.55)'],[1.3,'rgba(255,220,140,.5)']]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();for(let q=0;q<=40;q++){const u=q/40,y=-u*H*.85,x=ptdVein(v,u)*hw(y);q?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}}
  c.restore();
  /* บันไดเชือกที่คนรากลึกใช้ลงมาดูแลราก + โคมเห็ด */{const lx=-r*.62;c.strokeStyle='rgba(196,164,112,.8)';c.lineWidth=1.6;for(const s of[-6,6]){c.beginPath();c.moveTo(lx+s,-H*.8);c.lineTo(lx+s+2,-24);c.stroke()}for(let y=-34;y>-H*.8;y-=16){c.beginPath();c.moveTo(lx-6,y);c.lineTo(lx+7,y);c.stroke()}
    for(const[x,y]of PTLAMP){c.strokeStyle='#3a2616';c.lineWidth=1.4;c.beginPath();c.moveTo(x,y-26);c.lineTo(x,y-8);c.stroke();c.fillStyle='#e8fff8';c.fillRect(x-1.4,y-8,2.8,7);c.fillStyle='rgba(120,240,215,.9)';c.beginPath();c.moveTo(x-10,y-4);c.quadraticCurveTo(x,y-18,x+10,y-4);c.closePath();c.fill()}}
  /* ปุ่มรากค้ำโคนด้านหน้า */for(let k=-2;k<=2;k++){const x0=k*56+(k%2)*6,w=30+(k===0?6:0),h=78-Math.abs(k)*14;const gr=c.createLinearGradient(x0-w,0,x0+w,0);gr.addColorStop(0,'#24160c');gr.addColorStop(.45,'#6e4e32');gr.addColorStop(1,'#1e120a');c.fillStyle=gr;c.beginPath();c.moveTo(x0-w,10);c.bezierCurveTo(x0-w*.8,-h*.4,x0-10,-h*.9,x0,-h);c.bezierCurveTo(x0+10,-h*.9,x0+w*.8,-h*.4,x0+w,10);c.closePath();c.fill();
    c.strokeStyle='rgba(16,10,4,.55)';c.lineWidth=1.6;for(const s of[-.4,.15]){c.beginPath();c.moveTo(x0+s*w,8);c.quadraticCurveTo(x0+s*w*.6,-h*.5,x0+s*6,-h*.92);c.stroke()}c.fillStyle='rgba(90,150,60,.65)';c.beginPath();c.ellipse(x0-4,-h*.5,w*.42,5,0,0,7);c.fill()}
  c.globalCompositeOperation='destination-out';{const fg=c.createLinearGradient(0,-H,0,-H*.5);fg.addColorStop(0,'rgba(0,0,0,1)');fg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=fg;c.fillRect(-Wd,-H-60,Wd*2,H*.56)}c.globalCompositeOperation='source-over';
  c.restore();return PTDC.t={cv,bx,by,H,r}}
const PTLAMP=[[-PTR0*.62,-232],[PTR0*.34,-410],[-PTR0*.2,-118]],PTTHU=['ระวังอุโมงค์ฝั่งซ้าย!','รากแก้วยังร้องเพลงอยู่… สู้ต่อ!','ข้าได้ยินมันมุดอยู่ใต้เท้าเรา!','ยืนในวงทองแล้วรากจะดีขึ้นนะ!','เฒ่าแก่นไม้ต้องได้ยินเสียงนี้แน่ ๆ'];
Object.assign(PALK,{
 ptdtrunk(t,T){const S=ptdTrunkSpr(),x=t.x,y=t.y,B=mons.find(q=>q.t===3&&q.hp>0),bh=o=>!!o&&Math.abs(o.x-x)<S.r*1.25&&o.y<y-16&&o.y>y-S.H*.75,fa=(me.cls&&bh(me))||bh(B)||Object.values(others).some(o=>o.hp>0&&bh(o))?.3:1;
  PALSH(x,y+10,S.r*1.7,S.r*.42,.5);const a0=g.globalAlpha;g.globalAlpha=Math.min(a0,fa);g.drawImage(S.cv,x-S.bx,y-S.by);
  g.save();g.globalCompositeOperation='lighter';const al=Math.max(.25,ptdAlive().length/3),n=LOWQ?2:4;for(let v=0;v<3;v++)for(let j=0;j<n;j++){const u=(T*.11+j/n+v*.13)%1,yy=-u*S.H*.85;glowAt(x+ptdVein(v,u)*ptdHW(yy),y+yy,9,'255,200,110',.55*Math.sin(u*Math.PI)*al)}
  for(const[lx,ly]of PTLAMP){glowAt(x+lx,y+ly-8,24,'120,255,220',.38+.1*Math.sin(T*3+lx))}glowAt(x,y-12,170,'255,170,70',(.07+.04*Math.sin(T*1.3))*al);g.restore();g.globalAlpha=a0},
 ptdroot(t,T){const i=t.v,x=t.x,y=t.y,h=PTW.e[i],k=Math.max(0,h)/100,dead=h<=0,now=performance.now(),hit=now-PTW.hit[i]<220,sh=hit?Math.sin(T*90)*2.2:0,tar=PTW.bur>0&&PTW.bi===i,pu=.6+.4*Math.sin(T*(2+3*(1-k))+i);
  PALSH(x,y+8,62,16,.5);g.save();g.translate(sh,0);
  g.strokeStyle='#3a2616';g.lineCap='round';for(let q=0;q<7;q++){const an=q/7*6.2832+i,lx=x+Math.cos(an)*42,ly=y+Math.sin(an)*15+4;g.lineWidth=5-q%3;g.beginPath();g.moveTo(x+Math.cos(an)*24,y+Math.sin(an)*8-6);g.quadraticCurveTo(lx,ly-10,lx+Math.cos(an)*12,ly+2);g.stroke()}
  const body=()=>{g.beginPath();g.moveTo(x-44,y+2);g.bezierCurveTo(x-54,y-30,x-30,y-62,x-6,y-60);g.bezierCurveTo(x+18,y-70,x+52,y-44,x+46,y-10);g.bezierCurveTo(x+44,y+6,x-36,y+12,x-44,y+2);g.closePath()};
  {const gr=g.createLinearGradient(x-50,0,x+50,0);gr.addColorStop(0,'#2a1a0e');gr.addColorStop(.35,dead?'#4a3a30':'#6e4e32');gr.addColorStop(.6,dead?'#3e3028':'#56402a');gr.addColorStop(1,'#1e140a');g.fillStyle=gr;body();g.fill();g.strokeStyle='#160e06';g.lineWidth=1.6;g.stroke()}
  g.save();body();g.clip();for(const[lw,col,o]of[[2,'rgba(20,12,6,.55)',0],[1.2,'rgba(230,190,140,.16)',3]]){g.strokeStyle=col;g.lineWidth=lw;for(let q=0;q<6;q++){const bx=x-34+q*13+o;g.beginPath();g.moveTo(bx,y+8);g.bezierCurveTo(bx-4,y-20,bx+6,y-40,bx+2,y-66);g.stroke()}}
   g.fillStyle=dead?'rgba(80,90,60,.4)':'rgba(90,150,60,.75)';g.beginPath();g.ellipse(x-14,y-56,22,7,-.2,0,7);g.fill();
   const nb=Math.min(5,Math.floor((1-k)*5.5));for(let q=0;q<nb;q++){const bx=x+[-30,24,-6,34,-38][q],by=y+[-22,-32,-10,-8,-38][q];g.fillStyle='#120a04';g.beginPath();g.arc(bx,by,7,0,7);g.fill();g.fillStyle='#c8a070';for(let z=0;z<5;z++){const za=z/5*6.2832;g.fillRect(bx+Math.cos(za)*6.4-1,by+Math.sin(za)*6.4-1,2,2)}}
   if(k<.5&&!dead){g.strokeStyle='rgba(20,10,4,.85)';g.lineWidth=1.6;g.beginPath();g.moveTo(x-6,y-58);g.lineTo(x+2,y-40);g.lineTo(x-4,y-26);g.lineTo(x+4,y-12);g.stroke()}g.restore();
  if(!dead){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-66,32+18*k,'255,180,70',(.25+.35*k)*pu);g.restore();
    for(const[dx,dy,s]of[[-10,-62,9],[6,-70,11],[17,-60,7]]){g.fillStyle='#b8761e';g.beginPath();g.moveTo(x+dx,y+dy-s*1.3);g.lineTo(x+dx+s*.7,y+dy);g.lineTo(x+dx,y+dy+s*.5);g.lineTo(x+dx-s*.7,y+dy);g.closePath();g.fill();g.fillStyle='rgba(255,236,170,'+(.45+.45*k*pu)+')';g.beginPath();g.moveTo(x+dx,y+dy-s*1.1);g.lineTo(x+dx+s*.35,y+dy-s*.1);g.lineTo(x+dx-s*.2,y+dy+s*.2);g.closePath();g.fill()}}
  else{g.fillStyle='#2a1e14';for(const[dx,dy]of[[-8,-62],[8,-66],[0,-58]]){g.beginPath();g.moveTo(x+dx-4,y+dy+6);g.lineTo(x+dx,y+dy-14);g.lineTo(x+dx+4,y+dy+6);g.closePath();g.fill()}g.fillStyle='rgba(160,110,40,.5)';g.beginPath();g.ellipse(x+20,y+10,16,5,0,0,7);g.fill();if(!LOWQ){for(let q=0;q<3;q++){const p=(T*.3+q/3)%1;g.fillStyle='rgba(60,50,40,'+(.35*(1-p))+')';g.beginPath();g.arc(x+p*10,y-60-p*70,7+p*12,0,7);g.fill()}}}
  g.restore();
  const bw=74,by=y-100;g.fillStyle='rgba(20,12,8,.78)';g.beginPath();g.roundRect(x-bw/2-2,by-2,bw+4,9,4);g.fill();g.fillStyle=k>.5?'#7ad04a':k>.25?'#e0b030':'#e04a3a';g.beginPath();g.roundRect(x-bw/2,by,bw*k,5,2.5);g.fill();
  g.font='bold 9px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.85)';const lb=(dead?'💥 ':tar?'🕳️ ':'🌳 ')+'รากแก้ว '+'๑๒๓'[i]+' · '+Math.ceil(Math.max(0,h))+'%';g.strokeText(lb,x,by-5);g.fillStyle=dead?'#ffb0a0':tar?'#ffd080':'#ffe8b0';g.fillText(lb,x,by-5)},
 ptdtun(t,T){const x=t.x,y=t.y,wv=PTW.st==='wave'||PTW.st==='boss',pu=.5+.5*Math.sin(T*3+t.v);PALSH(x,y+10,70,22,.35);
  for(const[dx,dy,r,c]of[[-46,6,24,'#4e3c28'],[44,4,26,'#4a3826'],[-20,-16,22,'#5a4630'],[24,-18,20,'#54402c'],[0,16,26,'#46341f']]){g.fillStyle=c;g.beginPath();g.ellipse(x+dx,y+dy,r,r*.55,0,0,7);g.fill();g.fillStyle='rgba(220,190,150,.12)';g.beginPath();g.ellipse(x+dx-r*.2,y+dy-r*.2,r*.5,r*.18,0,0,7);g.fill()}
  g.fillStyle='#0a0603';g.beginPath();g.ellipse(x,y-2,36,16,0,0,7);g.fill();g.fillStyle='rgba(150,118,76,.35)';g.beginPath();g.ellipse(x,y-12,30,6,0,Math.PI,0);g.fill();
  g.strokeStyle='#3a2616';g.lineWidth=4;g.lineCap='round';for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*30,y-6);g.quadraticCurveTo(x+s*46,y-26,x+s*38,y-42);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(x+s*40,y-30);g.lineTo(x+s*50,y-34);g.stroke();g.lineWidth=4}
  if(wv){for(let q=0;q<2;q++){const ex=x-12+q*22+Math.sin(T*.7+q)*3,ey=y-3;if(Math.sin(T*2.3+q*1.7+t.v)<-.85)continue;g.fillStyle='rgba(255,200,90,.95)';g.fillRect(ex-3.4,ey-1,2.6,2);g.fillRect(ex+1.4,ey-1,2.6,2)}g.save();g.globalCompositeOperation='lighter';glowAt(x,y-2,40,'255,140,60',.12+.1*pu);g.restore()}},
 ptdthu(t,T){const x=t.x,y=t.y,f=me.x<x?-1:1;try{NPC3[43].d(x,y,f,T)}catch(e){try{thuD0(x,y,f,T)}catch(e2){}}npvLbl('ธุลี',x,y-46,'#c8f0a8');if(dg.ph==='run'||dg.ph==='boss'){try{npcSay('ptdthu',x,y,PTTHU,260,52)}catch(e){}}}});
function ptdBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  trees.push({x:CX,y:CY,r:112,k:'ptdtrunk',ht:PTH,hw:180,ns:1});try{ptdTrunkSpr()}catch(e){}
  ptdE().forEach(([x,y],i)=>trees.push({x,y,r:30,k:'ptdroot',v:i,ht:110,hw:56,ns:1}));
  PTLA.forEach((a,i)=>trees.push({x:CX+Math.cos(a)*(DR-16),y:CY+Math.sin(a)*(DR-16),r:0,k:'ptdtun',v:i,ht:40,ns:1,nc:1}));
  trees.push({x:CX+150,y:CY+150,r:0,k:'ptdthu',ht:60,ns:1,nc:1});
  const R=gxRng(4950),dA=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b))),okA=a=>PTLA.every(b=>dA(a,b)>.34)&&PTRA.every(b=>dA(a,b)>.24);
  for(let i=0,n=0;i<300&&n<9;i++){const a=R()*6.2832,d=DR-44-R()*30,v=(R()*3)|0,sc=.5+R()*.32;if(!okA(a))continue;const x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d;if(trees.some(t=>t.k==='pbmush'&&Math.hypot(t.x-x,t.y-y)<120))continue;trees.push({x,y,r:10,k:'pbmush',v,sc,ht:90,hw:30});n++}
  for(let i=0,n=0;i<300&&n<10;i++){const a=R()*6.2832,d=DR-26-R()*50,v=(R()*4)|0,sc=.7+R()*.5;if(!okA(a))continue;trees.push({x:CX+Math.cos(a)*d,y:CY+Math.sin(a)*d,r:0,k:'pbshroom',v,sc,ht:24,nc:1,ns:1});n++}
  for(let i=0,n=0;i<300&&n<6;i++){const a=R()*6.2832;if(!okA(a))continue;const x=CX+Math.cos(a)*(DR-30),y=CY+Math.sin(a)*(DR-30);if(trees.some(t=>t.k==='pblamp'&&Math.hypot(t.x-x,t.y-y)<200))continue;trees.push({x,y,r:0,k:'pblamp',v:i,ht:80,ns:1,nc:1});n++}}
/* ---------- เอฟเฟกต์ในโลก ---------- */
function ptdDraw(){if(!PTDI())return;const T=performance.now()/1000,now=performance.now(),dtf=Math.min(.1,(now-(PTW.lt||now))/1000),B=mons.find(q=>q.t===3&&q.hp>0);PTW.lt=now;if(!(isHost()&&PTDI())&&PTW.bur>0)PTW.bur=Math.max(0,PTW.bur-dtf);g.save();
  /* ฝุ่นตอนมอนมุดขึ้น */PTTL=PTTL.filter(e=>now-e.t0<1300);for(const e of PTTL){const k=(now-e.t0)/1300,s=e.big?2.4:1;g.fillStyle='rgba(110,86,58,'+(.5*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y,(18+k*44)*s,(8+k*18)*s,0,0,7);g.fill();g.strokeStyle='rgba(220,190,140,'+(.6*(1-k))+')';g.lineWidth=2;g.beginPath();g.ellipse(e.x,e.y,(22+k*50)*s,(10+k*21)*s,0,0,7);g.stroke();
    for(let q=0;q<(LOWQ?4:8);q++){const a=q/8*6.2832+e.x,d=(10+k*60)*s;g.fillStyle='rgba(80,60,40,'+(.7*(1-k))+')';g.fillRect(e.x+Math.cos(a)*d-2,e.y+Math.sin(a)*d*.45-k*30*s*Math.sin(k*Math.PI)-2,4,4)}}
  /* รอยแยก */PTLN=PTLN.filter(e=>now-e.t0<e.d);for(const e of PTLN){const k=(now-e.t0)/e.d;for(const l of e.l){if(!e.s){g.strokeStyle='rgba(255,140,50,'+(.1+.18*k)+')';g.lineWidth=92;g.lineCap='round';g.beginPath();g.moveTo(l[0],l[1]);g.lineTo(l[2],l[3]);g.stroke();
      const n=18,m=Math.max(2,Math.ceil(n*Math.min(1,k*1.3)));g.lineCap='round';g.beginPath();for(let q=0;q<=m;q++){const u=q/n,x=l[0]+(l[2]-l[0])*u,y=l[1]+(l[3]-l[1])*u,j=((q*7919)%13-6)*1.5;q?g.lineTo(x+j,y-j*.6):g.moveTo(x+j,y-j*.6)}g.strokeStyle='rgba(18,8,2,.9)';g.lineWidth=5;g.stroke();g.strokeStyle='rgba(255,190,90,'+(.5+.4*Math.sin(T*14))+')';g.lineWidth=1.8;g.stroke()}
    else{g.strokeStyle='rgba(255,200,120,'+(.7*(1-k))+')';g.lineWidth=70*(1-k*.4);g.lineCap='round';g.beginPath();g.moveTo(l[0],l[1]);g.lineTo(l[2],l[3]);g.stroke();g.strokeStyle='rgba(90,60,30,'+(.8*(1-k))+')';g.lineWidth=10;g.stroke();
      for(let q=0;q<(LOWQ?5:12);q++){const u=(q+.5)/12,x=l[0]+(l[2]-l[0])*u,y=l[1]+(l[3]-l[1])*u-Math.sin(k*Math.PI)*(30+(q%3)*14);g.fillStyle='rgba(110,84,56,'+(1-k)+')';g.beginPath();g.ellipse(x,y,5+(q%3)*2,4,q,0,7);g.fill()}}}}
  /* มุดดิน: รอยดินที่เนินลากผ่าน · ทางไป · วงเตือนที่ปลายทาง */if(PTW.bur>0){if(B){const L=PTW.tr[PTW.tr.length-1];if(!L||Math.hypot(L.x-B.x,L.y-B.y)>18){PTW.tr.push({x:B.x,y:B.y,t0:now});if(PTW.tr.length>48)PTW.tr.shift()}}
    const wn=PTW.bur<=PTBD-PTMV+.05,i=PTW.bi;if(i>=0&&i<3){const[dx,dy]=ptDest(i),pu=.5+.5*Math.sin(T*10);
      if(!wn&&B){g.strokeStyle='rgba(255,190,110,.45)';g.lineWidth=3;g.setLineDash([10,10]);g.beginPath();g.moveTo(B.x,B.y);g.lineTo(dx,dy);g.stroke();g.setLineDash([]);g.strokeStyle='rgba(255,170,80,.7)';g.lineWidth=2;g.beginPath();g.arc(dx,dy,PTBR*.4,0,7);g.stroke()}
      else{const p=1-Math.max(0,PTW.bur)/(PTBD-PTMV);g.fillStyle='rgba(255,90,40,'+(.12+.12*pu)+')';g.beginPath();g.arc(dx,dy,PTBR,0,7);g.fill();g.strokeStyle='rgba(255,160,90,'+(.6+.3*pu)+')';g.lineWidth=3;g.beginPath();g.arc(dx,dy,PTBR,0,7);g.stroke();g.strokeStyle='#ffe0a0';g.lineWidth=5;g.beginPath();g.arc(dx,dy,PTBR+6,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke();
        g.font='bold 13px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,10,6,.9)';g.strokeText('🛡️ ยืนขวางในวงนี้!',dx,dy+5);g.fillStyle='#ffe0b0';g.fillText('🛡️ ยืนขวางในวงนี้!',dx,dy+5)}}}
  PTW.tr=(PTW.tr||[]).filter(e=>now-e.t0<2600);for(const e of PTW.tr){const k=(now-e.t0)/2600;g.fillStyle='rgba(40,26,14,'+(.5*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y+6,20,8,0,0,7);g.fill();g.fillStyle='rgba(120,94,62,'+(.4*(1-k))+')';g.fillRect(e.x-12,e.y+2,3,3);g.fillRect(e.x+9,e.y+5,3,3)}
  /* โผล่ขึ้นมา */PTEB=PTEB.filter(e=>now-e.t0<1100);for(const e of PTEB){const k=(now-e.t0)/1100,R=gxRng((e.x*7+e.y)|0);g.strokeStyle='rgba(255,'+(e.b?'230,160':'170,90')+','+(.8*(1-k))+')';g.lineWidth=6*(1-k)+1;g.beginPath();g.arc(e.x,e.y,20+k*(PTBR+10),0,7);g.stroke();
    g.fillStyle='rgba(90,66,42,'+(.55*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y,PTBR*.8*(.4+k*.6),PTBR*.36*(.4+k*.6),0,0,7);g.fill();for(let q=0;q<(LOWQ?6:14);q++){const a=R()*6.2832,v=60+R()*120,h=Math.sin(Math.min(1,k*1.2)*Math.PI)*(40+R()*60),s=3+R()*6;g.fillStyle=R()<.5?'#5a4630':'#7a6040';g.beginPath();g.ellipse(e.x+Math.cos(a)*v*k,e.y+Math.sin(a)*v*k*.5-h,s,s*.75,a,0,7);g.fill()}
    if(e.b){g.font='bold 14px system-ui';g.textAlign='center';g.fillStyle='rgba(255,240,190,'+(1-k)+')';g.fillText('🛡️ ขวางไว้ได้!',e.x,e.y-70-k*20)}}
  /* วงรดยางซ่อม */if(me.cls)ptdE().forEach(([ex,ey],i)=>{if(PTW.e[i]<=0||PTW.e[i]>=100)return;if(Math.hypot(me.x-ex,me.y-ey)>110)return;if(mons.some(m=>m.t!==3&&m.hp>0&&Math.hypot(m.x-ex,m.y-ey)<170))return;g.save();g.globalCompositeOperation='lighter';glowAt(ex,ey,110,'255,200,110',.12+.05*Math.sin(T*5));g.restore();g.font='9px system-ui';g.textAlign='center';g.fillStyle='#ffe0a8';g.fillText('✚ กำลังรดยางซ่อมราก',ex,ey+30)});
  {const inL=PTLN.some(e=>!e.s&&e.l.some(l=>hdSegD(me.x,me.y,l)<46));if(inL){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,10,6,.9)';g.strokeText('🪲 ออกจากแนวรอยแยก!',me.x,me.y-70);g.fillStyle='#ffc890';g.fillText('🪲 ออกจากแนวรอยแยก!',me.x,me.y-70)}}
  g.restore()}
function ptdScreen(){if(!PTDI())return;const T=performance.now()/1000,bs=PTW.st==='boss';g.save();g.setTransform(DPR,0,0,DPR,0,0);const c=bs?'60,28,8':'18,12,6',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.76);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(bs?.3+.06*Math.sin(T*2):.34)+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);
  const n=LOWQ?10:22;for(let i=0;i<n;i++){const R=depRng(i*53+7),x=(R()*SW0+Math.sin(T*.3+i)*12+SW0)%SW0,y=((R()*H+T*(10+R()*16))%(H+10))-5;g.fillStyle='rgba(200,170,130,'+(.16+.18*R())+')';g.fillRect(x,y,1.5,1.5)}g.restore()}
function ptdReward(){if(dgRew)return;dgRew=1;const D=DT[32],st=stCur(),sto=st&&st.g==='ptd',gd=sto?D.gold:90000;PTLN=[];PTEB=[];
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?26:7));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?50:12+(Math.random()*6|0),'รากแก้วแม่ไม้')}catch(e){}try{ecGive(sto?30:8+(Math.random()*5|0),'รากแก้วแม่ไม้')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});if(sto)drops.push({x:me.x,y:me.y-20,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?20:6,'รากแก้วแม่ไม้')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.ptT=Date.now();
  const al=ptdAlive().length;banner={s:'🌳 ตัวกัดรากยักษ์ล้มแล้ว! รากแก้วรอด '+al+'/3 · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?26:7),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe8b0','#ffffff','#ffc860','#c8f0a0'],150,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(PTDI())enterMap(44,ptdBack())},10000)}
function instRepeatPtd(){const l=Math.max(0,(me.ptT||0)+30*60000-Date.now());
  stSay([['ked','ฝูงกัดแผ่นดินยังมุดขึ้นมาใต้แม่ไม้ทุกคืน… รากแก้วต้องการคนเฝ้า เจ้าจะลงไปช่วยอีกไหม?']],()=>{},{choice:[[l>0?'🌳 เฝ้ารากแก้ว (อีก '+Math.ceil(l/60000)+' นาที)':'🌳 ศึกป้องกันต้นค้ำ (ยางรากทอง · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🌳 รากแก้วยังพักฟื้นอยู่ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(ptdEnter,250)}};return true}
setTimeout(()=>{
  try{DGTH[32]='deep'}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=41000&&id<42000)return ptdMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(PTDI())return ptdStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(PTDI())return ptdSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(PTDI()){try{rnShard(4)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.4)}}catch(e){}return ptdReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=PTDI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(PTDI()){enterMap(44,ptdBack());sysMsg('🌳 ฝูงกัดแผ่นดินดันพวกเราถอยขึ้นมา… คุยกับเฒ่าแก่นไม้เพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(PTDI()){const e=PTW.e.map(v=>Math.ceil(Math.max(0,v))).join('/');return dg.ph==='run'?'🌳 ราก '+e+' · '+(PTW.st==='wave'?'คลื่น '+PTW.wv+'/3':'พักคลื่น')+' · ⏱ '+fmtT(dg.tl):dg.ph==='boss'?'🪲 ตัวกัดรากยักษ์ · 🌳 '+e+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🌳 รากแก้วรอดแล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🌳 โพรงรากใต้แม่ไม้ · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(PTDI()){ov.hidden=true;sfx('gate');enterMap(44,ptdBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(ptdFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{ptdDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{ptdScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='ptd')return instRepeatPtd();return _ir(k)}}catch(e){}
},0);
