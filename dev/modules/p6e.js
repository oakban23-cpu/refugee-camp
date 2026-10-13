/* ---------- v345 ภาค 6 บทที่ 4 · หอนาฬิกาหยุดเดิน (ดันเจี้ยน 80000–80999 · บอสผู้เฝ้าระฆังร่วง) ---------- */
const ARGR=[[690,1330],[2540,1340],[1290,2300],[1380,1400]];
const CKLORE=['เฟืองชิ้นแรกสลักชื่อไว้ด้านใน: «เวสเปอร์ — หัวหน้าองครักษ์ และช่างนาฬิกาหลวงแห่งอารัณยา»',
 'เฟืองชิ้นที่สองมีรอยมือกำแน่นจนสำริดบุบ… ภาพในแสง: คืนที่หัวใจหาย ชายในชุดองครักษ์ปีนขึ้นหอนาฬิกา แล้วหยุดเข็มทุกเข็มด้วยมือตัวเอง เพื่อไม่ให้ใครในเมืองต้องตายก่อนหัวใจกลับมา',
 'เฟืองชิ้นที่สาม: «เวลาหยุดแล้ว แต่ความหิวไม่หยุด… ผู้คนค่อย ๆ จางกลายเป็นเงา ข้าหยุดความตายได้ แต่หยุดการรอคอยไม่ได้»',
 'เฟืองชิ้นสุดท้ายห่อด้วยจดหมายเก่า ลายมือของโอเรียน: «ข้าจะกลับมาพร้อมหัวใจ เมื่อเมืองข้างบนมั่นคงพอ อดทนอีกนิด เพื่อนข้า» — จดหมายฉบับเดียวที่ส่งลงมาในสามร้อยปี'];
const CLKI=()=>!!(MAPS[curMap]&&MAPS[curMap].clk),clkBack=()=>({x:2060,y:2620});
let CLKH={a0:0,a1:0,w0:.55,w1:.14,t0:0,on:0},CLKB=[];
setTimeout(()=>{DT[20]={n:'หอนาฬิกาหยุดเดิน',lv:1,L:116,bL:22,hp:3600000,xp:450000,g:65000,dm:48,tn:8,sm:2,rm:4,lg:.9,tm:720,gold:420000,exp:3600000}},0);
function clkMap(id){if(MAPS[id])return MAPS[id];const D=DT[20];CLKH={a0:-1.57,a1:-1.05,w0:0,w1:0,t0:performance.now(),on:0};CLKB=[];
  return MAPS[id]={n:'ยอดหอนาฬิกาหยุดเดิน',dg:20,clk:1,th:30,bth:30,sx:CX,sy:CY+440,sr:0,seed:331,bg:'#120c1c',tile:'#1c2440',safe:'#2a3050',ring:'#d8a050',t1:'#0c0814',t2:'#1a1424',d1:'#2a2236',d2:'#d8a050',nests:[],
    gates:[{x:CX-180,y:CY+400,to:32,req:1,ars:1,nm:'ซากอารัณยา',arr:clkBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY-200,n:'ผู้เฝ้าระฆังร่วง',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:116,col:'#c8904a',bar:'#5a3a1a',ln:'#ffd090',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'กลางหน้าปัดนาฬิกาใหญ่',dg:1}}}
const CLK_IN=[['nar','บันไดวนพาขึ้นสู่ยอดหอนาฬิกา พื้นทั้งห้องคือหน้าปัดนาฬิกายักษ์ เข็มสองเล่มยาวเกือบสุดผนัง ค้างนิ่งมาสามร้อยปี'],
  ['nar','กลางหน้าปัด ร่างกลไกสำริดสูงเท่าบ้านคุกเข่าอยู่ หัวของมันคือระฆังที่ร่วงลงมาคว่ำหงาย ข้างในมีแสงเดียวดวงเดียวลืมตาขึ้น'],
  ['ves','(เสียงก้องจากข้างบน) ผู้เฝ้าระฆัง… ข้าสร้างมันไว้เฝ้าเวลา มันไม่รู้จักคำว่าเพื่อน ถ้าเจ้าอยากขึ้นมาหาข้า ก็ต้องผ่านมันไปให้ได้'],
  ['eda','(ยายเอดากอดทิลไว้ที่ปากบันได) ระวังเข็มนาฬิกานะลูก!'],
  ['nar','💡 เข็มนาฬิกา 2 เล่มกวาดรอบหน้าปัด (เส้นทองขอบแดง) → อย่ายืนขวางทาง หรือกระโดดข้ามจังหวะที่มันผ่าน · ระฆังร่วง (วงเตือน) → หลบ แล้วระวังคลื่นเสียงที่กระจายออก · เลือด <50% เวลาเร่ง · <25% เข็มเริ่มเดินย้อน']];
function clkEnter(){if(!me.cls||me.down>0||isDg())return;const id=80000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='⌛ เปิดหอนาฬิกาหยุดเดิน รหัส '+id+' มาช่วยกันล้มผู้เฝ้าระฆัง!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+60,y:CY+380});setTimeout(()=>{if(CLKI()&&dg.ph==='lobby')banner={s:'⌛ ยอดหอนาฬิกา · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function clkStart(){if(!CLKI()||dg.ph!=='lobby')return;const D=DT[20];stSay(CLK_IN,()=>{if(!CLKI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];CLKB=[];bossCd=1e9;spawnBoss();fx({k:'msg',s:'⌛ เข็มนาฬิกาเริ่มเดินเป็นครั้งแรกในสามร้อยปี! ล้มผู้เฝ้าระฆังร่วง'});try{sfx('boss')}catch(e){}},{cine:1})}
function clkReward(){if(dgRew)return;dgRew=1;const D=DT[20],st=stCur(),sto=st&&st.g==='clk',gd=sto?D.gold:55000;CLKB=[];
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?15:5));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?25:8+(Math.random()*5|0),'หอนาฬิกา')}catch(e){}try{ecGive(sto?25:8+(Math.random()*4|0),'หอนาฬิกา')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.4)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  me.ach=me.ach||{};if(sto){me.sty.n=1;me.sty.a=1;me.ach.stCk=1}else me.ckT=Date.now();
  banner={s:'⌛ ผู้เฝ้าระฆังร่วงหยุดนิ่ง… เข็มนาฬิกาเดินต่อ! +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?15:5),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe0a0','#ffffff','#d8b0ff','#ffb070'],120,280,1.6,{glow:1,g:-50});
  setTimeout(()=>{if(CLKI())enterMap(32,clkBack())},10000)}
/* กลไกบอส (ฝั่งโฮสต์) */
function clkAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,x=Math.round(m.x),y=Math.round(m.y);
  if(!m.ck){m.ck={a:[-1.57,-1.05],dir:1,rv:7,hit:{},bt:0};fx({k:'msg',s:'🕰️ เข็มนาฬิกาทั้งสองเริ่มกวาด! อย่ายืนขวางเข็ม'})}const K=m.ck,ph=f>.5?1:f>.25?2:3,sp=ph===1?[.5,.14]:[.8,.22];
  if(ph>(m.ckp|0)){m.ckp=ph;if(ph===2)fx({k:'msg',s:'⏩ เวลาเร่ง! เข็มนาฬิกาเดินเร็วขึ้น'});if(ph===3)fx({k:'msg',s:'⏪ ผู้เฝ้าระฆังบิดกลไก… เข็มเริ่มเดินย้อนเป็นช่วง ๆ!'})}
  if(ph===3){K.rv-=dt;if(K.rv<=1.5&&!K.rw){K.rw=1;fx({k:'msg',s:'⏪ เข็มกำลังจะเปลี่ยนทิศ!'})}if(K.rv<=0){K.rv=7;K.rw=0;K.dir*=-1}}
  for(let i=0;i<2;i++)K.a[i]+=sp[i]*K.dir*dt;
  const now=performance.now();pl.forEach(p=>{const dx=p.x-CX,dy=p.y-CY,d=Math.hypot(dx,dy);if(d>470||d<30)return;const pa=Math.atan2(dy,dx);for(let i=0;i<2;i++){const da=Math.atan2(Math.sin(pa-K.a[i]),Math.cos(pa-K.a[i]));if(Math.cos(da)<0)continue;const pd=Math.abs(d*Math.sin(da)),lim=i?32:24,len=i?330:470;if(d>len)continue;
    const key=p.u+':'+i;if(pd<lim&&!(K.hit[key]>now)){K.hit[key]=now+900;dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round((i?50:34)*dm);fx({k:'bhit',x:Math.round(p.x),y:Math.round(p.y),r:30,a:Math.round(K.a[i]*100)/100})}}});
  K.bt-=dt;if(K.bt<=0){K.bt=.5;fx({k:'clkh',a0:+K.a[0].toFixed(3),a1:+K.a[1].toFixed(3),w0:+(sp[0]*K.dir).toFixed(3),w1:+(sp[1]*K.dir).toFixed(3)})}
  if(m.stun>0||m.inv)return;
  m.c1=(m.c1===undefined?5:m.c1)-dt;if(m.c1<=0&&pl.length){m.c1=enr?6.5:8.5;const n=Math.min(4,1+pl.length+(ph>1?1:0)),pts=[];for(let i=0;i<n;i++){const p=pl[i%pl.length],a=Math.random()*6.283,r=i<pl.length?0:60+Math.random()*120;let bx=p.x+Math.cos(a)*r,by=p.y+Math.sin(a)*r;const q=Math.hypot(bx-CX,by-CY);if(q>440){bx=CX+(bx-CX)*440/q;by=CY+(by-CY)*440/q}pts.push([Math.round(bx),Math.round(by)]);fx({k:'tele',x:Math.round(bx),y:Math.round(by),r:72,dur:1.5})}
    (m.cb=m.cb||[]).push({pts,t:1.5});fx({k:'msg',s:'🔔 ระฆังร่วงจากเพดาน! หลบวงเตือน'})}
  (m.cb||[]).forEach(z=>{z.t-=dt;if(z.t<=0&&!z.dn){z.dn=1;z.pts.forEach(([bx,by])=>{pl.forEach(p=>{if(Math.hypot(p.x-bx,p.y-by)<72)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(44*dm)});(m.rg=m.rg||[]).push({x:bx,y:by,r:72,hit:{}})});fx({k:'clkb',p:z.pts})}});if(m.cb)m.cb=m.cb.filter(z=>!z.dn);
  (m.rg||[]).forEach(R=>{R.r+=160*dt;pl.forEach(p=>{const d=Math.hypot(p.x-R.x,p.y-R.y);if(Math.abs(d-R.r)<16&&!R.hit[p.u]){R.hit[p.u]=1;dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(22*dm)}})});if(m.rg)m.rg=m.rg.filter(R=>R.r<270);
  m.c2=(m.c2===undefined?10:m.c2)-dt;if(m.c2<=0){m.c2=enr?11:14;m.tl.push({x,y,r:240,t:2,k:'mvn'});fx({k:'tele',x,y,r:240,dur:2});fx({k:'msg',s:'🔔 ผู้เฝ้าระฆังตีระฆังบนหัว! วิ่งออกจากวงรอบตัวมัน'})}}
function clkFx(o){if(!o)return false;if(o.k==='clkh'){CLKH={a0:+o.a0,a1:+o.a1,w0:+o.w0,w1:+o.w1,t0:performance.now(),on:1};return true}if(o.k==='clkb'){const n=performance.now();(o.p||[]).forEach(p=>CLKB.push({x:+p[0],y:+p[1],t0:n}));if(CLKB.length>16)CLKB.splice(0,CLKB.length-16);return true}return false}
/* ฉากยอดหอนาฬิกา */
function clkBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  for(let i=0;i<8;i++){const a=i/8*6.283+Math.PI/8;if(Math.sin(a)>.8)continue;trees.push({x:CX+Math.cos(a)*(DR+90),y:CY+Math.sin(a)*(DR+90),r:0,k:'cpend',ht:260,hw:60,ns:1,nc:1,v:i})}
  for(let i=0;i<12;i++){const a=i/12*6.283;trees.push({x:CX+Math.cos(a)*(DR+150),y:CY+Math.sin(a)*(DR+150),r:0,k:'cwbell',ht:200,ns:1,nc:1,v:i})}}
function clkGear(c,x,y,r,n,rot,col){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle=col;c.beginPath();for(let i=0;i<n*2;i++){const a=i/(n*2)*6.283,R=i%2?r:r*1.12;c.lineTo(Math.cos(a)*R,Math.sin(a)*R)}c.closePath();c.fill();c.globalCompositeOperation='destination-out';c.beginPath();c.arc(0,0,r*.35,0,7);c.fill();c.restore()}
function clkPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S;c.fillStyle='#120c1c';c.fillRect(ox,oy,S,S);
  /* ผนังหอ: ซุ้มหน้าต่างมองเห็นห้วงม่วง */
  for(let i=0;i<16;i++){const a=i/16*6.283,wx=CX+Math.cos(a)*(DR+260),wy=CY+Math.sin(a)*(DR+260);if(wx<ox-120||wx>X1+120||wy<oy-160||wy>Y1+160)continue;c.fillStyle='#2a2236';c.fillRect(wx-60,wy-120,120,200);const g2=c.createLinearGradient(0,wy-100,0,wy+60);g2.addColorStop(0,'#5a3a8a');g2.addColorStop(1,'#1a1030');c.fillStyle=g2;c.beginPath();c.moveTo(wx-38,wy+60);c.lineTo(wx-38,wy-60);c.arc(wx,wy-60,38,Math.PI,0);c.lineTo(wx+38,wy+60);c.closePath();c.fill();
    c.fillStyle='rgba(255,220,240,.5)';for(let k=0;k<5;k++){c.beginPath();c.arc(wx-24+((k*17+i*7)%48),wy-70+((k*23+i*11)%110),1.2,0,7);c.fill()}c.strokeStyle='#8a6a3a';c.lineWidth=3;c.stroke()}
  /* ฟันเฟืองใต้หน้าปัด (มองทะลุแก้ว) */
  c.save();c.beginPath();c.arc(CX,CY,DR,0,7);c.clip();c.fillStyle='#141a30';c.fillRect(ox,oy,S,S);
  for(const[gx,gy,r,n,col]of[[CX-220,CY-160,150,24,'#3a3220'],[CX+180,CY+120,190,30,'#4a3e26'],[CX+60,CY-280,110,18,'#2e2818'],[CX-160,CY+260,130,20,'#3a3220'],[CX+330,CY-140,90,14,'#2e2818'],[CX-360,CY+40,100,16,'#4a3e26']])clkGear(c,gx,gy,r,n,(gx+gy)*.01,col);
  const fc=c.createRadialGradient(CX,CY,60,CX,CY,DR);fc.addColorStop(0,'rgba(36,48,90,.82)');fc.addColorStop(.85,'rgba(26,34,66,.86)');fc.addColorStop(1,'rgba(14,18,40,.95)');c.fillStyle=fc;c.fillRect(ox,oy,S,S);
  for(const[rr,w,a]of[[DR-8,10,.9],[DR-30,2,.7],[DR-96,1.4,.5],[300,2,.55],[160,1.4,.45],[90,3,.7]]){c.strokeStyle='rgba(216,160,80,'+a+')';c.lineWidth=w;c.beginPath();c.arc(CX,CY,rr,0,7);c.stroke()}
  for(let i=0;i<60;i++){const a=i/60*6.283-Math.PI/2,big=i%5===0;c.strokeStyle='rgba(232,200,130,'+(big?.9:.5)+')';c.lineWidth=big?5:2;c.beginPath();c.moveTo(CX+Math.cos(a)*(DR-34),CY+Math.sin(a)*(DR-34));c.lineTo(CX+Math.cos(a)*(DR-(big?78:52)),CY+Math.sin(a)*(DR-(big?78:52)));c.stroke()}
  c.font='bold 46px serif';c.textAlign='center';c.textBaseline='middle';const RN=['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];for(let i=0;i<12;i++){const a=i/12*6.283-Math.PI/2,tx=CX+Math.cos(a)*(DR-140),ty=CY+Math.sin(a)*(DR-140);c.fillStyle='rgba(0,0,0,.45)';c.fillText(RN[i],tx+3,ty+4);c.fillStyle='#e8c878';c.fillText(RN[i],tx,ty)}
  c.fillStyle='rgba(216,160,80,.18)';PST(c,CX,CY,280,110,12,0);c.fill();c.strokeStyle='rgba(255,230,180,.08)';c.lineWidth=60;c.beginPath();c.moveTo(CX-420,CY-300);c.lineTo(CX+300,CY+420);c.stroke();c.restore();
  c.strokeStyle='#8a6a3a';c.lineWidth=26;c.beginPath();c.arc(CX,CY,DR+14,0,7);c.stroke();c.strokeStyle='#d8a050';c.lineWidth=4;c.beginPath();c.arc(CX,CY,DR+2,0,7);c.stroke();c.beginPath();c.arc(CX,CY,DR+26,0,7);c.stroke();
  c.fillStyle='#e8c070';for(let i=0;i<48;i++){const a=i/48*6.283;c.beginPath();c.arc(CX+Math.cos(a)*(DR+14),CY+Math.sin(a)*(DR+14),3.4,0,7);c.fill()}}
function clkHA(i){const now=performance.now(),dtt=(now-CLKH.t0)/1000;return i?CLKH.a1+CLKH.w1*Math.min(1.5,dtt):CLKH.a0+CLKH.w0*Math.min(1.5,dtt)}
function clkDraw(){if(!CLKI())return;const T=performance.now()/1000,now=performance.now();g.save();
  /* เฟืองหมุนเบา ๆ ใต้แก้ว */
  if(!LOWQ){g.save();g.beginPath();g.arc(CX,CY,DR-10,0,7);g.clip();g.globalAlpha=.16;for(const[gx,gy,r,n,s]of[[CX+180,CY+120,190,30,.12],[CX-220,CY-160,150,24,-.16]]){g.save();g.translate(gx,gy);g.rotate(T*s);g.strokeStyle='#ffd890';g.lineWidth=2;g.beginPath();for(let i=0;i<n*2;i++){const a=i/(n*2)*6.283,R=i%2?r:r*1.12;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.stroke();g.restore()}g.restore()}
  /* เข็มนาฬิกา */
  const act=dg.ph==='boss';for(const i of[1,0]){const a=act?clkHA(i):(i?-1.05:-1.57),len=i?330:470,w=i?22:14,ca=Math.cos(a),sa=Math.sin(a);
    g.save();g.translate(CX,CY);g.rotate(a);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(8,-w/2+10,len,w);
    if(act){g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,80,60,'+(.28+.18*Math.sin(T*8))+')';g.fillRect(0,-w/2-8,len,w+16);g.restore()}
    const hg=g.createLinearGradient(0,-w/2,0,w/2);hg.addColorStop(0,'#fff0b8');hg.addColorStop(.5,'#d8a040');hg.addColorStop(1,'#8a5a1a');g.fillStyle=hg;g.beginPath();g.moveTo(-40,-w*.35);g.lineTo(len-50,-w/2);g.lineTo(len,0);g.lineTo(len-50,w/2);g.lineTo(-40,w*.35);g.closePath();g.fill();g.strokeStyle='#5a3a10';g.lineWidth=1.6;g.stroke();
    g.fillStyle='#5a3a10';for(let k=1;k<4;k++){g.beginPath();g.arc(len*k/4,0,w*.28,0,7);g.fill()}g.fillStyle='#fff0c0';g.beginPath();g.moveTo(len-46,-w*.3);g.lineTo(len-6,0);g.lineTo(len-46,w*.3);g.closePath();g.fill();g.restore()}
  g.fillStyle='#d8a050';g.beginPath();g.arc(CX,CY,34,0,7);g.fill();g.strokeStyle='#5a3a10';g.lineWidth=3;g.stroke();g.fillStyle='#fff0c0';PST(g,CX,CY,20,8,8,T*.3);g.fill();
  /* ระฆังร่วง + คลื่นเสียง */
  CLKB=CLKB.filter(b=>now-b.t0<1800);for(const b of CLKB){const k=(now-b.t0)/1800,r=72+k*1800*.16;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,190,110,'+(.8*(1-k))+')';g.lineWidth=6*(1-k)+2;g.beginPath();g.ellipse(b.x,b.y,r,r*.8,0,0,7);g.stroke();g.restore();
    if(k<.7){const a=1-k/.7;g.globalAlpha=a;const bg=g.createLinearGradient(b.x-26,0,b.x+26,0);bg.addColorStop(0,'#5a3418');bg.addColorStop(.45,'#c88a44');bg.addColorStop(1,'#4a2a12');g.fillStyle=bg;g.beginPath();g.moveTo(b.x-10,b.y-50);g.quadraticCurveTo(b.x-16,b.y-30,b.x-30,b.y);g.lineTo(b.x+30,b.y);g.quadraticCurveTo(b.x+16,b.y-30,b.x+10,b.y-50);g.closePath();g.fill();g.globalAlpha=1}}
  g.restore()}
function clkScreen(){if(!CLKI()||dg.ph!=='boss')return;const B=mons.find(q=>q.t===3);if(!B)return;const f=B.hp/B.mh;if(f>.5)return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const c=f>.25?'255,170,60':'140,80,255',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(.16+.06*Math.sin(T*3))+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);g.restore()}
/* ภาพบอส: ผู้เฝ้าระฆังร่วง */
function gxBellWarden(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,fy=br-4;g.save();g.translate(0,30);g.scale(1.35,1.35);g.translate(0,-30);
  {const cs=Math.sin(T*1.1)*3;Pg([-26,-46+fy,26,-46+fy,40+cs,26,20,22,0,30,-20,22,-40-cs,26],F('#2a1838'),1)}
  for(const s of[-1,1]){Ln([s*12,6,s*16,30],F('#6a4422'),11);E(s*16,30,9,4,F('#4a2c14'),1)}
  {const bg=W?'#fff':(()=>{const q=g.createLinearGradient(-26,0,26,0);q.addColorStop(0,'#5a3418');q.addColorStop(.5,'#b07a3a');q.addColorStop(1,'#4a2a12');return q})();g.fillStyle=bg;g.beginPath();g.roundRect(-24,-46+fy,48,52,8);g.fill();g.strokeStyle='#2a1408';g.lineWidth=1.4;g.stroke()}
  E(0,-22+fy,15,15,F('#efe4c8'),1);if(!W){g.strokeStyle='#3a2a1a';g.lineWidth=1;for(let i=0;i<12;i++){const a=i/12*6.283;g.beginPath();g.moveTo(Math.cos(a)*12,-22+fy+Math.sin(a)*12);g.lineTo(Math.cos(a)*14,-22+fy+Math.sin(a)*14);g.stroke()}const ma=T*(hf<.5?2.4:1.2),ha=T*.2;g.lineWidth=2;g.beginPath();g.moveTo(0,-22+fy);g.lineTo(Math.cos(ma)*11,-22+fy+Math.sin(ma)*11);g.stroke();g.lineWidth=3;g.beginPath();g.moveTo(0,-22+fy);g.lineTo(Math.cos(ha)*7,-22+fy+Math.sin(ha)*7);g.stroke()}
  for(const s of[-1,1]){g.save();g.translate(s*28,-42+fy);g.rotate(T*(s>0?.8:-.8));g.fillStyle=F('#8a5a2c');g.beginPath();for(let i=0;i<20;i++){const a=i/20*6.283,R=i%2?13:16;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.fill();g.strokeStyle='#2a1408';g.lineWidth=1;g.stroke();g.fillStyle=F('#3a2410');g.beginPath();g.arc(0,0,5,0,7);g.fill();g.restore()}
  /* หัว = ระฆังหงาย */
  {const hy=-60+fy;const bg=W?'#fff':(()=>{const q=g.createLinearGradient(-22,0,22,0);q.addColorStop(0,'#5a3418');q.addColorStop(.45,'#d09048');q.addColorStop(1,'#4a2a12');return q})();g.fillStyle=bg;g.beginPath();g.moveTo(-8,hy+6);g.quadraticCurveTo(-12,hy-4,-14,hy-16);g.quadraticCurveTo(-18,hy-30,-26,hy-36);g.lineTo(26,hy-36);g.quadraticCurveTo(18,hy-30,14,hy-16);g.quadraticCurveTo(12,hy-4,8,hy+6);g.closePath();g.fill();g.strokeStyle='#2a1408';g.lineWidth=1.4;g.stroke();
    E(0,hy-36,26,6,F('#1a0e08'),0);if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,hy-38,16+cf*10,hf<.25?'170,110,255':'255,180,90',.9);g.restore()}eye(0,hy-38,4,4,hf<.25?'#d8b0ff':'#ffd090');if(!W){g.strokeStyle='rgba(255,180,90,.7)';g.lineWidth=1.2;g.beginPath();g.moveTo(-6,hy-20);g.lineTo(-10,hy-8);g.lineTo(-4,hy);g.stroke()}}
  /* แขนขวา: ลูกตุ้มนาฬิกาเป็นอาวุธ */
  {const hx=34,hy=-28+fy-up*.6,swg=Math.sin(T*2.2)*.25+(cf>0?-.6*cf:0);Ln([20,-38+fy,hx,hy],F('#6a4422'),8);g.save();g.translate(hx,hy);g.rotate(swg);Ln([0,0,0,-86],F('#b07a3a'),4);E(0,-96,18,18,F('#d8a050'),1);if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-96,18+cf*16,'255,200,120',.5+cf*.4);g.restore()}g.fillStyle=W?'#fff':'#fff0c0';PST(g,0,-96,10,4,8,T);g.fill();g.restore()}
  {const lx=-34,ly=-26+fy-up*.3;Ln([-20,-38+fy,lx,ly],F('#6a4422'),8);E(lx,ly,6,6,F('#4a2c14'),1);Ln([lx,ly,lx-6,ly+22],F('#8a6a3a'),1.4);const bx=lx-6,by=ly+22;Pg([bx-4,by,bx-7,by+8,bx+7,by+8,bx+4,by],F('#b07a3a'),1)}
  g.restore()}
function instRepeatClk(){const l=Math.max(0,(me.ckT||0)+30*60000-Date.now());if(l>0){stSay([['eda3','กลไกในหอยังหมุนไม่เข้าที่… อีก '+Math.ceil(l/60000)+' นาทีค่อยขึ้นไปใหม่นะลูก']]);return true}
  stSay([['eda3','ผู้เฝ้าระฆังยังลุกขึ้นมาทุกครั้งที่เข็มนาฬิกาตีครบรอบ จะขึ้นไปฝึกกับมันอีกไหมลูก? (หินขั้นสูง · เศษคราส · ของ Lv 22)']],()=>{},{choice:[['⌛ ขึ้นหอนาฬิกา',1],['ไว้ก่อน',0]]});SD.onChoose=e=>{stClose();if(e===1)setTimeout(clkEnter,250)};return true}
/* ---------- เพิ่มเติมบนแมพ 32: เฟืองนาฬิกา · ประตูเปิด · เวสเปอร์ ---------- */
Object.assign(PALK,{
 aves(t,T){const N=MAPS[32].npc2;if(!N||N.x<0)return;const x=N.x,y=N.y,f=me.x<x?-1:1;PALSH(x,y+4,24,7);g.save();g.translate(x,y);g.scale(f,1);
  g.fillStyle='#1e1428';g.beginPath();g.moveTo(-16,-50);g.lineTo(16,-50);g.lineTo(24+Math.sin(T*1.3)*3,6);g.lineTo(-24-Math.sin(T*1.3)*3,6);g.closePath();g.fill();
  g.fillStyle='#6a4422';g.fillRect(-12,-52,24,40);g.strokeStyle='#d8a050';g.lineWidth=1.4;g.strokeRect(-12,-52,24,40);g.beginPath();g.arc(0,-32,7,0,7);g.stroke();for(let i=0;i<8;i++){const a=i*.785+T*.5;g.beginPath();g.moveTo(Math.cos(a)*7,-32+Math.sin(a)*7);g.lineTo(Math.cos(a)*10,-32+Math.sin(a)*10);g.stroke()}
  g.fillStyle='#8a5a2c';g.beginPath();g.arc(0,-62,10,0,7);g.fill();g.fillStyle='#120a18';g.fillRect(-7,-64,14,4);g.save();g.globalCompositeOperation='lighter';glowAt(-3,-62,3,'210,170,255',1);glowAt(3,-62,3,'210,170,255',1);g.restore();
  g.strokeStyle='#b07a3a';g.lineWidth=3;g.beginPath();g.moveTo(16,-40);g.lineTo(24,10);g.stroke();g.fillStyle='#d8a050';g.beginPath();g.arc(24,14,6,0,7);g.fill();g.restore();
  g.font='11px system-ui';g.textAlign='center';g.fillStyle='#e0d0ff';g.fillText(N.n,x,y-80)}});
{const _ac=PALK.aclock;PALK.aclock=function(t,T){_ac(t,T);if(!p6From('p6ck2'))return;const dx=t.x,dy=t.y;g.save();g.beginPath();g.moveTo(dx-46,dy);g.lineTo(dx-46,dy-90);g.arc(dx,dy-90,46,Math.PI,0);g.lineTo(dx+46,dy);g.closePath();g.clip();const gr=g.createLinearGradient(0,dy-136,0,dy);gr.addColorStop(0,'#ffe8b0');gr.addColorStop(1,'#d89040');g.fillStyle=gr;g.fillRect(dx-46,dy-136,92,136);
  for(let i=0;i<6;i++){g.fillStyle='rgba(120,70,20,'+(.25+i*.08)+')';g.fillRect(dx-30+i*2,dy-20-i*14,60-i*4,6)}g.restore();g.save();g.globalCompositeOperation='lighter';glowAt(dx,dy-50,90,'255,200,120',.4+.1*Math.sin(T*2));g.restore();
  g.fillStyle='#3a2410';for(const s of[-1,1]){g.beginPath();g.moveTo(dx+s*46,dy);g.lineTo(dx+s*46,dy-90);g.lineTo(dx+s*64,dy-84);g.lineTo(dx+s*64,dy+4);g.closePath();g.fill()}}}
function ckTickX(dt,now,x,y){const H=MAPS[32].npc2;if(H){const sh=p6From('p6ves')&&!p6Past('p6c4');H.x=sh?2230:-9999;H.y=sh?2560:-9999}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p6gr)return;ARGR.forEach(([gx,gy],i)=>{if((q.p6g|0)>>i&1||Math.hypot(x-gx,y-gy)>58)return;q.p6g=(q.p6g|0)|(1<<i);let n=0;for(let k=0;k<4;k++)if(q.p6g>>k&1)n++;q.n=n;PALG.card={h:'⚙️ เฟืองนาฬิกา '+n+'/'+ARGR.length,t:CKLORE[i],s:now,d:9};try{sfx('lg_get')}catch(e){}try{burst(gx,gy-20,['#ffd090','#ffffff','#d8b0ff'],24,100,.8,{glow:1,g:-40})}catch(e){}try{stHud();writeSave()}catch(e){}})}
function ckGround(){const st=stCur();if(!st||!me.sty||me.sty.a!==1||!st.p6gr)return;const T=performance.now()/1000;ARGR.forEach(([x,y],i)=>{if((me.sty.p6g|0)>>i&1||!palVis(x,y,60))return;const by=y-16+Math.sin(T*2+i)*4;g.save();g.globalCompositeOperation='lighter';glowAt(x,by,30,'255,200,120',.5);g.restore();g.save();g.translate(x,by);g.rotate(T*1.5);g.fillStyle='#d8a050';g.beginPath();for(let k=0;k<16;k++){const a=k/16*6.283,R=k%2?10:13;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.fill();g.fillStyle='#3a2410';g.beginPath();g.arc(0,0,4,0,7);g.fill();g.restore();g.font='16px system-ui';g.textAlign='center';g.fillText('⚙️',x,by-30)})}
/* ---------- เนื้อเรื่องภาค 6 บทที่ 4 ---------- */
Object.assign(SPK,{ves:['เวสเปอร์ · ผู้พิทักษ์คนสุดท้ายของอารัณยา','⌛','#d8b0ff']});STNPC.ves=[32,'npc2'];
STCH.push('ภาค 6 · บทที่ 4 · หอนาฬิกาหยุดเดิน');
{const C9=STCH.length-1;STY.push(
 {c:C9,g:'talk',k:'eda3',tx:'คุยกับยายเอดาหน้าประตูหอนาฬิกา',
  pre:[['eda','(ยายเอดาลูบเฟืองตะวันบนประตู) กลไกนี้ขาดเฟืองไปสี่ซี่ ตอนเมืองร่วง มันคงกระเด็นไปตามเกาะต่าง ๆ'],
   ['til','ข้าได้ยินมัน… ติ๊ก ติ๊ก เบา ๆ จากหลายทิศเลย เหมือนมันเรียกหากัน'],
   ['hed','ถ้าเวสเปอร์อยู่ข้างบนจริง ข้าอยากได้ยินจากปากเขาเอง ว่าตระกูลข้าทิ้งอะไรไว้',0,0,2],
   ['eda','ไปหาเฟืองให้ยายทีลูก ยายจะรอตรงนี้ ส่องโคมไว้ให้เห็นทางกลับ']],rw:{g:60000}},
 {c:C9,g:'clue',m:32,n:4,p6gr:1,tx:'ตามหาเฟืองนาฬิกา 4 ชิ้นบนเกาะต่าง ๆ',
  post:[['me','(เวสเปอร์คือคนหยุดเวลาของอารัณยาไว้เอง… เพื่อรอโอเรียนกลับมาพร้อมหัวใจ ตามที่จดหมายสัญญาไว้)'],['til','เขารอมาสามร้อยปีเลยหรือ… เพราะจดหมายฉบับเดียว']],rw:{g:60000}},
 {c:C9,g:'talk',k:'eda3',p6ck2:1,tx:'นำเฟืองไปใส่ประตูหอนาฬิกา',
  pre:[['nar','เฟืองซี่สุดท้ายล็อกเข้าที่ เฟืองตะวันบนประตูหมุนครบรอบ… ประตูหอนาฬิกาที่ปิดมาสามร้อยปีค่อย ๆ แง้มออก แสงอำพันทะลักออกมา'],
   ['ves','(เสียงจากยอดหอ) …เจ้าหาเฟืองครบ แปลว่าเจ้าอ่านความทรงจำของข้าแล้ว'],
   ['ves','ขึ้นมาเถอะ แต่ผู้เฝ้าระฆังจะไม่ยอมให้ใครผ่าน มันถูกสร้างมาเพื่อเฝ้าเวลา ไม่ใช่เพื่อฟังเหตุผล'],
   ['eda','ยายกับทิลจะรอที่ปากบันได… กลับมาให้ได้นะลูก']],rw:{g:40000,s3:5}},
 {c:C9,g:'clk',k:'eda3',tx:'ขึ้นยอดหอนาฬิกา ล้มผู้เฝ้าระฆังร่วง (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['eda','ประตูยังเปิดรออยู่ ขึ้นไปเมื่อพร้อมนะลูก']],
  post:[['nar','ผู้เฝ้าระฆังร่วงคุกเข่าลง แสงในระฆังบนหัวดับวูบ… เข็มนาฬิกายักษ์ใต้เท้าไม่หยุดตามมัน มันเดินต่อ ติ๊ก… ติ๊ก…'],
   ['nar','เสียงฝีเท้าหนัก ๆ ดังลงมาจากบันไดวนเหนือหน้าปัด ร่างสูงโปร่งในเกราะสำริด สวมผ้าคลุมลายเฟืองตะวัน เดินลงมาช้า ๆ']]},
 {c:C9,g:'talk',k:'ves',p6ves:1,p6c4:1,cine:1,tx:'คุยกับเวสเปอร์หน้าประตูหอนาฬิกา',
  pre:[['ves','เวลาเดินแล้ว… สามร้อยปีที่ข้าไม่ได้ยินเสียงนี้'],
   ['ves','ข้าไม่ได้เกลียดอัสตรา ผู้ถือตรา ข้าเกลียดการรอ ทุกวินาทีที่หยุดไว้ ผู้คนของข้าจางลงทีละนิด จนเหลือเพียงเงาที่จำชื่อตัวเองไม่ได้'],
   ['ves','ถ้าหัวใจกลับมา เวลาของอารัณยาจะเดินต่อ เงาทุกตนจะได้หลับอย่างสงบเสียที… และอารัณยาจะลอยขึ้นอีกครั้ง'],
   ['me','(แต่ถ้าหัวใจถูกนำไปจากอัสตรา อัสตราจะร่วงแทน — ทั้งเมืองที่เพิ่งเปิดประตู ทั้งผู้อพยพที่เพิ่งขึ้นไปอยู่)'],
   ['ves','ข้ารู้ว่าเจ้าคิดอะไรอยู่ คนข้างบนก็ไม่ผิด เด็กพวกนั้นไม่ได้ขโมยอะไร… แต่คนของข้าก็รอมานานพอแล้ว'],
   ['ves','หัวใจทั้งดวงอยู่บนนั้น สว่างพอจะส่องลงมาถึงที่นี่… แต่ไม่ใช่ของเรา',0,1],
   ['ves','หัวใจครึ่งหนึ่งถูกผนึกไว้ใต้แผ่นดิน อีกครึ่งเต้นอยู่บนอัสตรา… ครึ่งเดียว บางทีอาจพอให้ทั้งสองเมืองหายใจได้',0,2],
   ['eda','(ยายเอดาก้าวออกมา ร้องเพลงกล่อมท่อนที่หายไปเบา ๆ) «…วันหนึ่งประตูจะเปิด แล้วเราจะกลับบ้าน…»'],
   ['ves','(เวสเปอร์นิ่งไปนาน) …เพลงนั้น ภรรยาข้าร้องให้ลูกฟังทุกคืน ก่อนเมืองจะร่วง'],
   ['hed','ท่านเวสเปอร์ ปู่ทวดข้า… เคยเป็นลูกน้องท่าน เขาหนีไปพร้อมโอเรียน ข้าขอโทษแทนเขา',0,0,2],
   ['ves','(วางมือบนไหล่เฮเดรียน) อย่างน้อยหลานของเขาก็กลับมา… นั่นมากกว่าที่โอเรียนเคยทำ',0,0,2],
   ['ves','ข้าจะไม่ขโมยหัวใจกลับ เหมือนที่โอเรียนทำกับเรา ข้าจะขึ้นไปขอมัน ต่อหน้าราชินีของพวกเจ้า'],
   ['ves','แต่ถ้าคำตอบคือไม่… ข้าจะไม่รออีกแล้ว'],
   ['nar','เวสเปอร์เดินขึ้นบันไดแสงไปทางสะพานรุ่งอรุณ เงาชาวอารัณยานับร้อยลุกขึ้นเดินตามเขาเงียบ ๆ'],
   ['til','(ทิลกระซิบ) …ท่านผู้นำ เราต้องไปถึงราชินีก่อนเขา'],
   ['nar','⌛ — จบภาค 6 บทที่ 4 · หอนาฬิกาหยุดเดิน — บทต่อไป: หลุมหัวใจว่าง · บทสุดท้ายของภาค 6 (เร็ว ๆ นี้)']],rw:{g:250000,s3:15}})}
setTimeout(()=>{try{MAPS[32].npc2={x:-9999,y:-9999,n:'เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา'};trees&&0}catch(e){}
  try{const _b=arBuild;window.arBuild=arBuild=function(M){_b(M);trees.push({x:2230,y:2560,r:0,k:'aves',ht:90,ns:1,nc:1})}}catch(e){}
  try{const _t=arTick;window.arTick=arTick=function(dt,now,x,y,mv){_t(dt,now,x,y,mv);try{ckTickX(dt,now,x,y)}catch(e){}}}catch(e){}
  try{const _g=arGroundFx;window.arGroundFx=arGroundFx=function(){_g();try{ckGround()}catch(e){}}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p6gr&&me.sty){let b=null,bd=1e9;ARGR.forEach(([x,y],i)=>{if((me.sty.p6g|0)>>i&1)return;const d=curMap===32?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x,y:y+20}}});return b?{mp:32,act:'reach',x:b.x,y:b.y,lb:'ไปเก็บเฟือง'}:null}return _q(st)}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=80000&&id<81000)return clkMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(CLKI())return clkStart();return _ds()}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(CLKI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return clkReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=CLKI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(CLKI()){enterMap(32,clkBack());sysMsg('⌛ ถูกเหวี่ยงลงจากหอนาฬิกา · คุยกับยายเอดาเพื่อขึ้นไปใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(CLKI())return dg.ph==='boss'?'⌛ ผู้เฝ้าระฆังร่วง · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'⌛ เข็มนาฬิกาเดินต่อแล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'⌛ ยอดหอนาฬิกา · กด "เริ่ม" เมื่อพร้อม';return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(CLKI()){ov.hidden=true;sfx('gate');enterMap(32,clkBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(clkFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{clkDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{clkScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='clk')return instRepeatClk();return _ir(k)}}catch(e){}},0);
Object.assign(PALK,{
 cpend(t,T){const x=t.x,y=t.y,sw=Math.sin(T*1.6+t.v)*.35;PALSH(x,y+4,30,8);const wg=g.createLinearGradient(x-26,0,x+26,0);wg.addColorStop(0,'#2a1810');wg.addColorStop(.5,'#5a3820');wg.addColorStop(1,'#2a1810');g.fillStyle=wg;g.fillRect(x-26,y-240,52,240);g.strokeStyle='#b07a3a';g.lineWidth=2;g.strokeRect(x-26,y-240,52,240);
  g.fillStyle='#e8dcc0';g.beginPath();g.arc(x,y-200,20,0,7);g.fill();g.strokeStyle='#3a2410';g.lineWidth=1.4;g.stroke();g.beginPath();g.moveTo(x,y-200);g.lineTo(x+Math.cos(T*.5+t.v)*14,y-200+Math.sin(T*.5+t.v)*14);g.stroke();
  g.fillStyle='#120a14';g.fillRect(x-18,y-170,36,150);g.save();g.translate(x,y-168);g.rotate(sw);g.strokeStyle='#d8a050';g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(0,110);g.stroke();g.fillStyle='#d8a050';g.beginPath();g.arc(0,118,12,0,7);g.fill();g.restore();
  g.save();g.globalCompositeOperation='lighter';glowAt(x+Math.sin(sw)*118,y-50,20,'255,200,120',.3);g.restore()},
 cwbell(t,T){const x=t.x,y=t.y,sw=Math.sin(T*.8+t.v)*.08;g.strokeStyle='#4a3420';g.lineWidth=2;g.beginPath();g.moveTo(x,y-200);g.lineTo(x,y-90);g.stroke();g.save();g.translate(x,y-90);g.rotate(sw);const bg=g.createLinearGradient(-22,0,22,0);bg.addColorStop(0,'#5a3418');bg.addColorStop(.45,'#b07a3a');bg.addColorStop(1,'#4a2a12');g.fillStyle=bg;g.beginPath();g.moveTo(-7,0);g.quadraticCurveTo(-10,10,-12,22);g.quadraticCurveTo(-15,38,-24,46);g.lineTo(24,46);g.quadraticCurveTo(15,38,12,22);g.quadraticCurveTo(10,10,7,0);g.closePath();g.fill();g.restore()}});
