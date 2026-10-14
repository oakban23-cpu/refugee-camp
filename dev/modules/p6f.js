/* ---------- v346 ภาค 6 บทที่ 5 · หลุมหัวใจว่าง (แมพ 33 · แอ่งขั้นบันไดใต้หอนาฬิกา) ---------- */
const HPC={x:1600,y:1700},HPR=1300,HPS=250,HPGT=[1480,140,1720,430];
const HPAN=[[1600+580,1700-580],[1600+580,1700+580],[1600-580,1700+580],[1600-580,1700-580]];
const HPLORE=['สมอโซ่ต้นแรกแตก… เสียงกระซิบไหลออกมา: «เวสเปอร์บอกว่าแค่ดึงหัวใจกลับมา ทุกอย่างจะจบ เราเชื่อเขา เราเชื่อเขาเสมอ»',
 'สมอต้นที่สองสลักชื่อไว้นับร้อยชื่อ — ชื่อของชาวอารัณยาทุกคนที่ยอมสละเงาของตัวเองมาถักเป็นโซ่ดึงหัวใจ',
 'สมอต้นที่สาม: «ถ้าอัสตราร่วง ลูกหลานของคนที่ปีนขึ้นไปก็จะร่วงด้วย…» ลายมือของเวสเปอร์ ขีดฆ่าซ้ำจนกระดาษขาด',
 'สมอต้นสุดท้ายแตก โซ่แสงทั้งสี่เส้นคลายตัว หัวใจดาวข้างบนหยุดสั่น… แต่จากก้นหลุม มีเสียงฝีเท้าหนัก ๆ เดินขึ้นมา'];
const HPZN={gate:['ทางลงหลุม','ใต้หอนาฬิกา มีบันไดที่ไม่มีใครเคยเดินลงมาสามร้อยปี'],rim:['ขอบแอ่งหัวใจ','ทุกขั้นบันไดคือที่นั่งของคนที่รอ'],terr:['ขั้นบันไดแห่งการรอคอย','เงานับพันนั่งหันหน้าเข้าหาหลุมเดียวกัน'],core:['หลุมหัวใจว่าง','ที่ที่หัวใจของอารัณยาเคยเต้น']};
let HPN={cl:[],deb:[],gh:[],dec:[]},HPS2={lp:{x:1600,y:300}};
const hpD=(x,y)=>Math.hypot(x-HPC.x,y-HPC.y);
function hpIn(x,y,m){m=m||0;const d=hpD(x,y);if(d<HPR-m&&d>HPS+m)return true;return x>HPGT[0]+m&&x<HPGT[2]-m&&y>HPGT[1]+m&&y<HPGT[3]+60}
const hpZone=(x,y)=>y<430?'gate':hpD(x,y)>1000?'rim':hpD(x,y)>520?'terr':'core';
const gP6end=()=>p6Past('p6z');
function hpBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;
  const P=(x,y,r,k,o)=>{if(Math.hypot(x-M.sx,y-M.sy)<M.sr+20||M.gates.some(G=>Math.hypot(x-G.x,y-G.y)<90))return null;const t=Object.assign({x,y,r,k},o||{});trees.push(t);return t},I=(x,y)=>{if(!hpIn(x,y,-6))trees.push({x,y,r:22,inv:1,ns:1})};
  for(let i=0;i<300;i++){const a=i/300*6.283;I(HPC.x+Math.cos(a)*(HPR+18),HPC.y+Math.sin(a)*(HPR+18))}
  for(let i=0;i<60;i++){const a=i/60*6.283;trees.push({x:HPC.x+Math.cos(a)*(HPS-18),y:HPC.y+Math.sin(a)*(HPS-18),r:22,inv:1,ns:1})}
  for(let y=140;y<=420;y+=28){I(HPGT[0]-18,y);I(HPGT[2]+18,y)}for(let x=HPGT[0];x<=HPGT[2];x+=28)I(x,HPGT[1]-18);
  HPAN.forEach(([x,y],i)=>trees.push({x,y,r:24,k:'hanc',ai:i,ht:220,hw:60}));
  const R=gxRng(3333);
  for(let i=0;i<10;i++){const a=i/10*6.283+.3,r=1120+R()*80;const x=HPC.x+Math.cos(a)*r,y=HPC.y+Math.sin(a)*r;if(y<520)continue;P(x,y,30,'hgear',{ht:120,hw:60,v:i%3})}
  for(let i=0;i<8;i++){const a=i/8*6.283+.7,r=760+R()*120;const x=HPC.x+Math.cos(a)*r,y=HPC.y+Math.sin(a)*r;if(HPAN.some(([ax,ay])=>Math.hypot(x-ax,y-ay)<200))continue;P(x,y,34,'hbellf',{ht:70,hw:50,v:i%3})}
  for(let i=0;i<12;i++){const a=i/12*6.283+.15,r=i%2?640:1000;const x=HPC.x+Math.cos(a)*r,y=HPC.y+Math.sin(a)*r;if(y<520||HPAN.some(([ax,ay])=>Math.hypot(x-ax,y-ay)<160))continue;P(x,y,12,'alamp',{ht:100,v:i%2?9:0})}
  for(const x of[1450,1750])P(x,360,12,'alamp',{ht:100,v:9});
  HPN.cl=[];HPN.deb=[];for(let i=0;i<80;i++)HPN.cl.push([R()*3200,R()*3200,60+R()*120,R()]);for(let i=0;i<60;i++){const x=R()*3200,y=R()*3200;if(hpD(x,y)<HPR+120)continue;HPN.deb.push([x,y,4+R()*16,R()])}
  HPN.gh=[];for(let i=0;i<40;i++){const ring=360+((i*7)%6)*150,a=i/40*6.283+(i%3)*.05;HPN.gh.push({x:HPC.x+Math.cos(a)*ring,y:HPC.y+Math.sin(a)*ring,a,k:i})}
  HPN.dec=[];trees.forEach(t=>{if(t.inv||!t.k)return;HPN.dec.push({k:'ao',b:[t.x-80,t.y-30,t.x+80,t.y+40],x:t.x,y:t.y,r:t.r,w:t.hw||0})})}
function hpPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sk=c.createRadialGradient(HPC.x,HPC.y,200,HPC.x,HPC.y,2400);sk.addColorStop(0,'#3a1e4a');sk.addColorStop(.5,'#1a1028');sk.addColorStop(1,'#08060e');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  for(const cl of HPN.cl){const[x,y,rr]=cl,r=rr*1.4;if(x+r<ox||x-r>X1||y+r<oy||y-r>Y1)continue;const g2=c.createRadialGradient(x,y,4,x,y,r);g2.addColorStop(0,'rgba(170,120,210,.1)');g2.addColorStop(1,'rgba(170,120,210,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}
  for(const[x,y,r]of HPN.deb){if(x<ox-30||x>X1+30||y<oy-30||y>Y1+30)continue;c.fillStyle='rgba(70,56,90,.8)';c.beginPath();c.moveTo(x-r,y);c.lineTo(x-r*.4,y-r*.6);c.lineTo(x+r*.8,y-r*.3);c.lineTo(x+r,y+r*.2);c.lineTo(x,y+r*.9);c.closePath();c.fill()}
  /* ความหนาขอบแอ่ง */
  c.fillStyle='#120c1a';c.beginPath();c.arc(HPC.x+8,HPC.y+50,HPR+40,0,7);c.fill();c.fillStyle='#2a2034';c.beginPath();c.arc(HPC.x,HPC.y+22,HPR+40,0,7);c.fill();
  c.fillStyle='#2a2034';c.fillRect(HPGT[0]-40,HPGT[1]-40,HPGT[2]-HPGT[0]+80,HPGT[3]-HPGT[1]+120);
  /* ขั้นบันไดวงแหวน: ยิ่งลึกยิ่งมืด */
  const steps=[[HPR+40,'#6a5c78'],[1180,'#625470'],[1040,'#5a4c68'],[900,'#524460'],[760,'#4a3c58'],[620,'#423450'],[480,'#3a2c48'],[360,'#30243e']];
  steps.forEach(([r,col],i)=>{if(HPC.x+r<ox||HPC.x-r>X1||HPC.y+r<oy||HPC.y-r>Y1){}c.fillStyle=col;c.beginPath();c.arc(HPC.x,HPC.y,r,0,7);c.fill();
    c.save();c.beginPath();c.arc(HPC.x,HPC.y,r,0,7);c.arc(HPC.x,HPC.y,Math.max(HPS,r-140),0,7,true);c.clip();
    palGrid(ox,oy,X1,Y1,32,22,1,(x,y,ii,jj)=>{const h=palH(ii,jj,330+i);if(h<.55)return;c.fillStyle='rgba(255,255,255,'+((h-.55)*.12)+')';c.beginPath();c.roundRect(x+2,y+2,28,18,3);c.fill()});
    c.strokeStyle='rgba(20,14,26,.35)';c.lineWidth=1;for(let k=0;k<120;k++){const a=k/120*6.283;c.beginPath();c.moveTo(HPC.x+Math.cos(a)*r,HPC.y+Math.sin(a)*r);c.lineTo(HPC.x+Math.cos(a)*(r-140),HPC.y+Math.sin(a)*(r-140));c.stroke()}c.restore();
    c.strokeStyle='rgba(10,6,16,.6)';c.lineWidth=10;c.beginPath();c.arc(HPC.x,HPC.y+4,r-142,0,7);c.stroke();c.strokeStyle='rgba(220,180,120,.22)';c.lineWidth=2;c.beginPath();c.arc(HPC.x,HPC.y,r-2,0,7);c.stroke()});
  /* บันไดลง 4 ทิศ */
  for(let k=0;k<4;k++){const a=k*Math.PI/2+Math.PI/4;c.save();c.translate(HPC.x,HPC.y);c.rotate(a);c.fillStyle='rgba(150,130,160,.35)';c.fillRect(HPS,-50,HPR-HPS,100);c.strokeStyle='rgba(30,20,40,.55)';c.lineWidth=2;for(let q=HPS;q<HPR;q+=20){c.beginPath();c.moveTo(q,-50);c.lineTo(q,50);c.stroke()}c.fillStyle='rgba(176,122,58,.6)';c.fillRect(HPS,-54,HPR-HPS,5);c.fillRect(HPS,49,HPR-HPS,5);c.restore()}
  /* ทางเดินเข้า */
  c.fillStyle='#6a5c78';c.fillRect(HPGT[0],HPGT[1],HPGT[2]-HPGT[0],HPGT[3]-HPGT[1]+80);c.strokeStyle='rgba(30,20,40,.5)';for(let y=HPGT[1];y<HPGT[3]+80;y+=22){c.beginPath();c.moveTo(HPGT[0],y);c.lineTo(HPGT[2],y);c.stroke()}
  /* หลุมกลาง: เปลสำริดที่แตก */
  {const x=HPC.x,y=HPC.y,g2=c.createRadialGradient(x,y,10,x,y,HPS+20);g2.addColorStop(0,'#000');g2.addColorStop(.7,'#0a0612');g2.addColorStop(1,'#241838');c.fillStyle=g2;c.beginPath();c.arc(x,y,HPS+12,0,7);c.fill();
    c.strokeStyle='#7a5228';c.lineWidth=18;for(let k=0;k<8;k++){const a0=k/8*6.283+.08,a1=a0+.62;c.beginPath();c.arc(x,y,HPS+4,a0,a1);c.stroke()}c.strokeStyle='#d8a050';c.lineWidth=2;for(let k=0;k<8;k++){const a0=k/8*6.283+.08,a1=a0+.62;c.beginPath();c.arc(x,y,HPS+12,a0,a1);c.stroke()}
    c.fillStyle='#8a5a2c';for(let k=0;k<8;k++){const a=k/8*6.283+.39;c.save();c.translate(x+Math.cos(a)*(HPS-6),y+Math.sin(a)*(HPS-6));c.rotate(a+Math.PI);c.beginPath();c.moveTo(0,-14);c.quadraticCurveTo(60,-10,96,0);c.quadraticCurveTo(60,10,0,14);c.closePath();c.fill();c.strokeStyle='#3a2410';c.lineWidth=1.4;c.stroke();c.restore()}
    c.font='18px serif';c.fillStyle='rgba(216,160,80,.45)';c.textAlign='center';for(let i=0;i<32;i++){const a=i/32*6.283;c.save();c.translate(x+Math.cos(a)*(HPS+46),y+Math.sin(a)*(HPS+46));c.rotate(a+1.57);c.fillText('ᚨᚱᚢᚾᛃᚨᛟᛞ'[i%8],0,6);c.restore()}}
  for(const d of HPN.dec){const b=d.b;if(b[0]<X1&&b[2]>ox&&b[1]<Y1&&b[3]>oy){c.save();try{PALD.ao(c,d,ox,oy,X1,Y1)}catch(e){}c.restore()}}}
function hpAnBroken(i){if(gP6end())return true;const q=me.sty;if(!q)return false;if(p6Past('p6an'))return true;return !!((q.p6an|0)>>i&1)}
function hpGroundFx(){const T=performance.now()/1000,Q=LOWQ,end=gP6end(),e6=me.sty&&me.sty.e6|0;g.save();
  /* ผู้รอคอยนั่งบนขั้นบันได */
  for(const h of HPN.gh){if(!palVis(h.x,h.y,30))continue;g.globalAlpha=end?.7:.28+.1*Math.sin(T*.6+h.k);campFolk(h.x,h.y,{c:end?'#c8a070':'#6a5a8a',sh:end?'#e0b050':null,hair:end?'#5a3a20':'#2a2040',f:Math.cos(h.a)>0?-1:1,k:h.k,sit:1,s:1.05},T);g.globalAlpha=1}
  g.globalCompositeOperation='lighter';
  /* โซ่แสงจากสมอเข้าหาหลุม แล้วพุ่งขึ้นฟ้า */
  HPAN.forEach(([ax,ay],i)=>{if(hpAnBroken(i))return;const n=14;for(let k=0;k<n;k++){const u=(k+((T*1.4)%1))/n,x=ax+(HPC.x-ax)*u,y=ay-120+(HPC.y-60-(ay-120))*u-Math.sin(u*Math.PI)*80;if(!palVis(x,y,40))continue;g.strokeStyle='rgba(220,180,255,.75)';g.lineWidth=2.4;g.beginPath();g.ellipse(x,y,7,4,Math.atan2(HPC.y-ay,HPC.x-ax)+(k%2?1.57:0),0,7);g.stroke();glowAt(x,y,12,'200,150,255',.22)}});
  {const brk=HPAN.filter((_,i)=>hpAnBroken(i)).length;if(!end&&brk<4&&palVis(HPC.x,HPC.y-400,600)){const gr=g.createLinearGradient(0,HPC.y,0,0);gr.addColorStop(0,'rgba(210,160,255,'+(.4*(1-brk/4))+')');gr.addColorStop(1,'rgba(210,160,255,0)');g.fillStyle=gr;const w=30+18*Math.sin(T*3);g.fillRect(HPC.x-w,0,w*2,HPC.y)}}
  /* หลุม: หลังจบภาค */
  if(palVis(HPC.x,HPC.y,HPS+80)){if(end&&e6===1){glowAt(HPC.x,HPC.y,HPS,'255,220,150',.4+.12*Math.sin(T*1.6));glowAt(HPC.x,HPC.y,80,'255,250,230',.7);const gr=g.createLinearGradient(0,HPC.y,0,0);gr.addColorStop(0,'rgba(255,230,170,.35)');gr.addColorStop(1,'rgba(255,230,170,0)');g.fillStyle=gr;g.fillRect(HPC.x-40,0,80,HPC.y)}
    else if(end){glowAt(HPC.x,HPC.y,60+10*Math.sin(T*2),'255,200,140',.6);for(let i=0;i<6;i++){const a=T*.5+i*1.05;glowAt(HPC.x+Math.cos(a)*120,HPC.y+Math.sin(a)*60,6,'255,220,170',.6)}}
    else glowAt(HPC.x,HPC.y,HPS,'140,60,200',.12+.06*Math.sin(T*1.2))}
  if(!Q)for(let i=0;i<20;i++){const q=(T*.07+i/20)%1,a=i*1.7,r=300+((i*97)%900);const x=HPC.x+Math.cos(a)*r,y=HPC.y+Math.sin(a)*r-q*200;if(!palVis(x,y,20))continue;glowAt(x,y,2.4,end?'255,210,150':'200,150,255',.7*Math.sin(q*3.14))}
  (MAPS[curMap].nests||[]).forEach(([x,y],i)=>{if(!palVis(x,y,90))return;glowAt(x,y,56,'150,70,200',.16+.12*Math.sin(T*1.6+i));g.globalCompositeOperation='source-over';g.fillStyle='rgba(12,4,20,.85)';g.beginPath();g.ellipse(x,y,22,12,0,0,7);g.fill();g.globalCompositeOperation='lighter';glowAt(x-5,y-2,3,'255,170,80',.9);glowAt(x+5,y-2,3,'255,170,80',.9)});
  const st=stCur();if(st&&st.p6an&&me.sty&&me.sty.a===1){g.globalCompositeOperation='source-over';HPAN.forEach(([x,y],i)=>{if(hpAnBroken(i)||!palVis(x,y,80))return;g.font='18px system-ui';g.textAlign='center';g.fillText('⛓️',x,y-250+Math.sin(T*2.4)*4)})}
  g.restore()}
function hpScreen(T,z,Hs){g.save();const end=gP6end(),vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.32,SW0/2,Hs/2,Math.max(SW0,Hs)*.75);vg.addColorStop(0,'rgba(40,10,60,0)');vg.addColorStop(1,end?'rgba(60,30,20,.25)':'rgba(40,10,60,.38)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  g.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const x=((T*5+i*150)%(SW0+300))-150,a=.04+.02*Math.sin(T*.7+i);const gr=g.createLinearGradient(0,0,0,Hs);gr.addColorStop(0,'rgba('+(end?'255,220,170':'210,170,255')+','+a+')');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.moveTo(x,0);g.lineTo(x+70,0);g.lineTo(x+170,Hs);g.lineTo(x+100,Hs);g.closePath();g.fill()}g.restore()}
function hpTick(dt,now,x,y,mv){if(hpIn(x,y,-4)){HPS2.lp.x=x;HPS2.lp.y=y}else if(!hpIn(x,y,-34)&&me.down<=0){me.x=HPS2.lp.x;me.y=HPS2.lp.y}
  {const V=MAPS[33].npc2,sh=p6From('p6vf')&&!gP6end();V.x=sh?1600:-9999;V.y=sh?HPC.y-HPS-60:-9999}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p6an)return;
  HPAN.forEach(([ax,ay],i)=>{if((q.p6an|0)>>i&1||Math.hypot(x-ax,y-ay)>70)return;q.p6an=(q.p6an|0)|(1<<i);let n=0;for(let k=0;k<4;k++)if(q.p6an>>k&1)n++;q.n=n;PALG.card={h:'⛓️ สมอโซ่แสง '+n+'/4',t:HPLORE[i],s:now,d:9};try{sfx('ek_shatter')}catch(e){}try{burst(ax,ay-120,['#e0c8ff','#ffffff','#ffd090'],34,160,1,{glow:1,g:-60})}catch(e){}try{shk=.4}catch(e){}try{stHud();writeSave()}catch(e){}})}
function hpAqT(st){if(st.p6an&&me.sty){let b=null,bd=1e9;HPAN.forEach(([x,y],i)=>{if((me.sty.p6an|0)>>i&1)return;const d=curMap===33?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x,y:y+40}}});return b?{mp:33,act:'reach',x:b.x,y:b.y,lb:'ไปทำลายสมอโซ่'}:null}return null}
Object.assign(PALK,{
 hanc(t,T){const x=t.x,y=t.y,br=hpAnBroken(t.ai);PALSH(x,y+4,40,10,.45);
  if(br){g.save();g.translate(x,y);g.rotate(.9);const wg=g.createLinearGradient(-20,0,20,0);wg.addColorStop(0,'#3a2410');wg.addColorStop(.5,'#8a5a2c');wg.addColorStop(1,'#3a2410');g.fillStyle=wg;g.fillRect(-18,-120,36,120);g.restore();g.fillStyle='#4a3020';for(let i=0;i<5;i++){g.beginPath();g.ellipse(x-30+i*16,y+6+(i%2)*4,10,6,0,0,7);g.fill()}return}
  g.fillStyle='#3a2a1a';g.fillRect(x-30,y-14,60,16);const wg=g.createLinearGradient(x-20,0,x+20,0);wg.addColorStop(0,'#3a2410');wg.addColorStop(.5,'#9a6a34');wg.addColorStop(1,'#3a2410');g.fillStyle=wg;g.beginPath();g.moveTo(x-20,y-14);g.lineTo(x-14,y-190);g.lineTo(x,y-215);g.lineTo(x+14,y-190);g.lineTo(x+20,y-14);g.closePath();g.fill();g.strokeStyle='#d8a050';g.lineWidth=1.4;g.stroke();
  g.strokeStyle='#d8a050';g.lineWidth=2;g.beginPath();g.arc(x,y-120,13,0,7);g.stroke();for(let i=0;i<8;i++){const a=i*.785+T*.6;g.beginPath();g.moveTo(x+Math.cos(a)*13,y-120+Math.sin(a)*13);g.lineTo(x+Math.cos(a)*19,y-120+Math.sin(a)*19);g.stroke()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-120,40,'210,160,255',.45+.15*Math.sin(T*4+t.ai));glowAt(x,y-210,30,'230,200,255',.6);g.restore();
  if(stCur()&&stCur().p6an&&me.cls&&Math.hypot(me.x-x,me.y-y)<260){g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,10,20,.85)';g.strokeText('เดินเข้าไปทำลายสมอ',x,y-232);g.fillStyle='#e8d0ff';g.fillText('เดินเข้าไปทำลายสมอ',x,y-232)}},
 hgear(t,T){const x=t.x,y=t.y,r=[44,58,36][t.v|0];PALSH(x,y+4,r,10);g.save();g.translate(x,y-r*.8);g.rotate(.3+t.v);g.scale(1,.9);g.fillStyle='#7a5228';g.beginPath();for(let i=0;i<24;i++){const a=i/24*6.283,R=i%2?r:r*1.14;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.fill();g.strokeStyle='#2a1408';g.lineWidth=1.4;g.stroke();g.fillStyle='#2a1a2a';g.beginPath();g.arc(0,0,r*.4,0,7);g.fill();g.strokeStyle='#b07a3a';g.lineWidth=3;for(let k=0;k<4;k++){const a=k*1.57;g.beginPath();g.moveTo(Math.cos(a)*r*.4,Math.sin(a)*r*.4);g.lineTo(Math.cos(a)*r*.85,Math.sin(a)*r*.85);g.stroke()}g.restore()},
 hbellf(t,T){const x=t.x,y=t.y;PALSH(x,y+4,40,10);g.save();g.translate(x,y-16);g.rotate([.5,-.4,1.2][t.v|0]);const bg=g.createLinearGradient(-30,0,30,0);bg.addColorStop(0,'#4a2a12');bg.addColorStop(.45,'#9a6a34');bg.addColorStop(1,'#3a2010');g.fillStyle=bg;g.beginPath();g.moveTo(-10,-30);g.quadraticCurveTo(-14,-14,-18,0);g.quadraticCurveTo(-24,16,-34,24);g.lineTo(34,24);g.quadraticCurveTo(24,16,18,0);g.quadraticCurveTo(14,-14,10,-30);g.closePath();g.fill();g.strokeStyle='#2a1408';g.lineWidth=1.4;g.stroke();g.strokeStyle='rgba(60,90,40,.7)';g.lineWidth=2;g.beginPath();g.moveTo(-20,10);g.quadraticCurveTo(0,-10,22,14);g.stroke();g.restore()},
 hves(t,T){const N=MAPS[33].npc2;if(!N||N.x<0)return;const o=MAPS[32].npc2;MAPS[32].npc2=N;try{PALK.aves(t,T)}catch(e){}finally{MAPS[32].npc2=o}}});
/* ---------- ดันเจี้ยนก้นหลุม: เวสเปอร์ (ห้อง 81000–81999) ---------- */
const VSPI=()=>!!(MAPS[curMap]&&MAPS[curMap].vsp),vspBack=()=>({x:1600,y:HPC.y-HPS-140});
let VLN=[],VFZ=null,VHD={a:0,w:0,t0:0,on:0};
setTimeout(()=>{DT[21]={n:'ก้นหลุมหัวใจ',lv:1,L:118,bL:22,hp:4400000,xp:520000,g:80000,dm:52,tn:9,sm:2,rm:4,lg:1,tm:780,gold:500000,exp:4200000}},0);
function vspMap(id){if(MAPS[id])return MAPS[id];const D=DT[21];VLN=[];VFZ=null;VHD={a:0,w:0,t0:0,on:0};
  return MAPS[id]={n:'ก้นหลุมหัวใจว่าง',dg:21,vsp:1,th:30,bth:30,sx:CX,sy:CY+440,sr:0,seed:341,bg:'#0a0612',tile:'#3a2c48',safe:'#4a3c58',ring:'#d8a050',t1:'#0a0612',t2:'#1a1028',d1:'#2a2034',d2:'#d8a050',nests:[],
    gates:[{x:CX-180,y:CY+400,to:33,req:1,ars:1,nm:'หลุมหัวใจว่าง',arr:vspBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY-160,n:'เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:118,col:'#d8a050',bar:'#5a2a6a',ln:'#ffe0a0',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'กลางเปลหัวใจที่ว่างเปล่า',dg:1}}}
const VSP_IN=[['nar','ก้นหลุมคือเปลสำริดขนาดมหึมาที่ว่างเปล่า ตรงกลางมีรอยประทับรูปหัวใจลึกลงไปในหิน เย็นเฉียบมาสามร้อยปี'],
  ['ves','เจ้าทำลายโซ่ของข้า… โซ่ที่คนของข้าถักขึ้นจากเงาของตัวเอง'],
  ['ves','ข้าไม่ได้โกรธเจ้า ผู้ถือตรา ข้าแค่ไม่รู้จะหยุดอย่างไรแล้ว สามร้อยปีที่ข้าบอกทุกคนว่าให้รออีกนิด'],
  ['ves','ถ้าเจ้าจะพูดแทนทั้งสองเมือง ก็พิสูจน์ให้ข้าเห็น ว่าคำสัญญาของเจ้าหนักกว่าเวลาที่ข้าหยุดไว้'],
  ['nar','💡 หอกเข็มนาฬิกา (เส้นตรงหลายเส้น) → หลบออกจากแถบ · ระฆัง (วงเตือนใต้เท้า) → ขยับออก · ร่างที่ 2 เวลาหยุด: ฟ้ามืดหมด เหลือวงเฟืองทอง 4 วง → วิ่งเข้าวงก่อนหมดเวลา · ร่างที่ 3 เข็มนาฬิกาใหญ่กวาดรอบลาน → อย่าขวางทาง']];
function vspEnter(){if(!me.cls||me.down>0||isDg())return;const id=81000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='⌛ เปิดก้นหลุมหัวใจ รหัส '+id+' มาช่วยกันหยุดเวสเปอร์!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+60,y:CY+380});setTimeout(()=>{if(VSPI()&&dg.ph==='lobby')banner={s:'⌛ ก้นหลุมหัวใจ · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function vspStart(){if(!VSPI()||dg.ph!=='lobby')return;const D=DT[21];stSay(VSP_IN,()=>{if(!VSPI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];VLN=[];VFZ=null;bossCd=1e9;spawnBoss();fx({k:'msg',s:'⌛ เวสเปอร์ชักหอกเข็มนาฬิกา! «มาเถิด ผู้ถือตรา»'});try{sfx('boss')}catch(e){}},{cine:1})}
function vspReward(){if(dgRew)return;dgRew=1;const D=DT[21],st=stCur(),sto=st&&st.g==='vsp',gd=sto?D.gold:60000;VLN=[];VFZ=null;
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?20:6));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?30:8+(Math.random()*6|0),'ก้นหลุมหัวใจ')}catch(e){}try{ecGive(sto?30:8+(Math.random()*5|0),'ก้นหลุมหัวใจ')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.45)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  me.ach=me.ach||{};if(sto){me.sty.n=1;me.sty.a=1;me.ach.stVs=1}else me.vsT=Date.now();
  banner={s:'⌛ เวสเปอร์คุกเข่าลง… หอกเข็มนาฬิกาปักนิ่ง +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?20:6),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe0a0','#ffffff','#d8b0ff','#ffb070'],140,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(VSPI())enterMap(33,vspBack())},10000)}
function vspAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,ph=f>.6?1:f>.3?2:3,x=Math.round(m.x),y=Math.round(m.y),now=performance.now();
  if(ph>(m.vp|0)){m.vp=ph;if(ph===2)fx({k:'msg',s:'⏸️ เวสเปอร์หยุดเวลา! «สามร้อยปี… เจ้ารู้ไหมว่ามันยาวแค่ไหน»'});if(ph===3){m.vh={a:Math.atan2((pl[0]||{y:CY}).y-CY,(pl[0]||{x:CX}).x-CX)+1.2,dir:1,hit:{},bt:0,rv:9};fx({k:'msg',s:'🕰️ เข็มนาฬิกาใหญ่ลุกขึ้นจากเปล! «ถ้าเวลาต้องเดิน ก็ให้มันเดินทับข้าไปเสีย!»'})}fx({k:'bslam',x,y,r:200})}
  (m.vl||[]).forEach(z=>{z.t-=dt;if(z.t<=0&&!z.dn){z.dn=1;pl.forEach(p=>{const dx=p.x-z.x,dy=p.y-z.y;if(z.A.some(a=>{const al=dx*Math.cos(a)+dy*Math.sin(a),pe=Math.abs(-dx*Math.sin(a)+dy*Math.cos(a));return al>-10&&al<z.L&&pe<32}))dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(52*dm)})}});if(m.vl)m.vl=m.vl.filter(z=>!z.dn);
  if(m.vz){m.vz.t-=dt;if(m.vz.t<=0){const G=m.vz.g;pl.forEach(p=>{if(!G.some(q=>Math.hypot(p.x-q[0],p.y-q[1])<74))dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(90*dm)});fx({k:'bslam',x:CX,y:CY,r:480});m.vz=null}}
  if(m.vh){const K=m.vh;K.rv-=dt;if(K.rv<=0){K.rv=9;K.dir*=-1;fx({k:'msg',s:'⏪ เข็มใหญ่เปลี่ยนทิศ!'})}K.a+=.5*K.dir*dt;pl.forEach(p=>{const dx=p.x-CX,dy=p.y-CY,d=Math.hypot(dx,dy);if(d>480||d<40)return;const da=Math.atan2(Math.sin(Math.atan2(dy,dx)-K.a),Math.cos(Math.atan2(dy,dx)-K.a));if(Math.cos(da)<0)return;if(Math.abs(d*Math.sin(da))<30&&!(K.hit[p.u]>now)){K.hit[p.u]=now+900;dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(46*dm)}});
    K.bt-=dt;if(K.bt<=0){K.bt=.5;fx({k:'vhd',x:CX,y:CY,a:+K.a.toFixed(3),w:+(.5*K.dir).toFixed(3)})}}
  if(m.stun>0||m.inv)return;
  m.v1=(m.v1===undefined?4:m.v1)-dt;if(m.v1<=0&&pl.length){m.v1=(ph===1?7:ph===2?6.5:6)*(enr?.85:1);const p=pl[Math.random()*pl.length|0],a0=Math.atan2(p.y-y,p.x-x),n=ph===1?3:ph===2?5:6,sp=ph===3?Math.PI*2/n:.34,A=[];for(let i=0;i<n;i++)A.push(+(a0+(i-(n-1)/2)*sp).toFixed(3));
    (m.vl=m.vl||[]).push({x,y,A,t:1.2,L:640});fx({k:'vln',x,y,A,L:640,dur:1.2});fx({k:'msg',s:'⚔️ หอกเข็มนาฬิกา! หลบออกจากแถบแสง'})}
  m.v2=(m.v2===undefined?6:m.v2)-dt;if(m.v2<=0&&pl.length){m.v2=ph===1?9:8;pl.forEach(p=>{for(let i=0;i<(ph>1?2:1);i++){const px=Math.round(p.x+(i?rnd(-90,90):0)),py=Math.round(p.y+(i?rnd(-90,90):0));m.tl.push({x:px,y:py,r:80,t:1.5,k:'star'});fx({k:'tele',x:px,y:py,r:80,dur:1.5})}})}
  if(ph>=2&&!m.vz){m.v3=(m.v3===undefined?3:m.v3)-dt;if(m.v3<=0){m.v3=enr?15:18;const G=[];const a0=Math.random()*6.283;for(let i=0;i<4;i++){const a=a0+i*1.5708+(Math.random()-.5)*.5,r=200+Math.random()*170;G.push([Math.round(CX+Math.cos(a)*r),Math.round(CY+Math.sin(a)*r)])}m.vz={g:G,t:3.4};fx({k:'vfz',x:CX,y:CY,g:G,dur:3.4});fx({k:'msg',s:'⏸️ เวลาหยุด! วิ่งเข้าวงเฟืองทองก่อนหมดเวลา'})}}
  if(ph>=2){m.v4=(m.v4===undefined?6:m.v4)-dt;if(m.v4<=0){m.v4=enr?18:24;const cur=mons.filter(q=>q.vsa).length,n=Math.min(4-cur,1+Math.min(2,pl.length));for(let i=0;i<n;i++){const a=Math.random()*6.283,px=CX+Math.cos(a)*380,py=CY+Math.sin(a)*380,hp=mhp(0,118)*1.4;mons.push({id:++mid,x:px,y:py,tx:px,ty:py,t:0,L:118,p:0,vsa:1,hp,mh:hp,tg:null,tt:6,ac:0,w:null,lg:0});fx({k:'tele',x:Math.round(px),y:Math.round(py),r:40,dur:.6})}if(n>0)fx({k:'msg',s:'🌑 เงาของชาวอารัณยาลุกขึ้นปกป้องเวสเปอร์!'})}}}
function vspFx(o){if(!o)return false;const n=performance.now();if(o.k==='vln'){VLN.push({x:+o.x,y:+o.y,A:o.A||[],L:+o.L||640,d:(+o.dur||1.2)*1000,t0:n});if(VLN.length>6)VLN.shift();return true}
  if(o.k==='vfz'){VFZ={g:o.g||[],d:(+o.dur||3.4)*1000,t0:n};return true}if(o.k==='vhd'){VHD={a:+o.a,w:+o.w,t0:n,on:1};return true}return false}
function vspBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  for(let i=0;i<8;i++){const a=i/8*6.283+Math.PI/8;trees.push({x:CX+Math.cos(a)*(DR+110),y:CY+Math.sin(a)*(DR+110),r:0,k:'hanc',ai:9,ht:220,ns:1,nc:1})}}
function vspPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sk=c.createRadialGradient(CX,CY,300,CX,CY,1700);sk.addColorStop(0,'#2a1838');sk.addColorStop(1,'#06040a');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  for(let r=DR+500;r>DR+40;r-=110){c.strokeStyle='rgba(120,90,140,'+(.08+(DR+500-r)/2600)+')';c.lineWidth=40;c.beginPath();c.arc(CX,CY,r,0,7);c.stroke()}
  c.fillStyle='#1a1222';c.beginPath();c.arc(CX+6,CY+36,DR+30,0,7);c.fill();
  const fl=c.createRadialGradient(CX,CY,60,CX,CY,DR+20);fl.addColorStop(0,'#5a4030');fl.addColorStop(.5,'#3e2c26');fl.addColorStop(1,'#2a1c1c');c.fillStyle=fl;c.beginPath();c.arc(CX,CY,DR+20,0,7);c.fill();
  c.save();c.beginPath();c.arc(CX,CY,DR+20,0,7);c.clip();for(const[rr,w,a]of[[DR+8,12,.85],[DR-40,2,.5],[DR-120,1.4,.45],[360,3,.6],[240,1.4,.4],[140,2,.5]]){c.strokeStyle='rgba(216,160,80,'+a+')';c.lineWidth=w;c.beginPath();c.arc(CX,CY,rr,0,7);c.stroke()}
  c.strokeStyle='rgba(216,160,80,.25)';c.lineWidth=1.4;for(let i=0;i<48;i++){const a=i/48*6.283;c.beginPath();c.moveTo(CX+Math.cos(a)*140,CY+Math.sin(a)*140);c.lineTo(CX+Math.cos(a)*(DR-40),CY+Math.sin(a)*(DR-40));c.stroke()}
  c.font='22px serif';c.fillStyle='rgba(216,160,80,.4)';c.textAlign='center';for(let i=0;i<36;i++){const a=i/36*6.283;c.save();c.translate(CX+Math.cos(a)*(DR-80),CY+Math.sin(a)*(DR-80));c.rotate(a+1.57);c.fillText('ᚨᚱᚢᚾᛃᚨᛟᛞ'[i%8],0,7);c.restore()}
  /* รอยประทับหัวใจ */c.fillStyle='rgba(10,6,14,.85)';c.beginPath();c.moveTo(CX,CY+70);c.bezierCurveTo(CX-110,CY-10,CX-70,CY-110,CX,CY-50);c.bezierCurveTo(CX+70,CY-110,CX+110,CY-10,CX,CY+70);c.fill();c.strokeStyle='#d8a050';c.lineWidth=3;c.stroke();c.restore();
  c.strokeStyle='#7a5228';c.lineWidth=22;c.beginPath();c.arc(CX,CY,DR+18,0,7);c.stroke();c.fillStyle='#e8c070';for(let i=0;i<40;i++){const a=i/40*6.283;c.beginPath();c.arc(CX+Math.cos(a)*(DR+18),CY+Math.sin(a)*(DR+18),3.4,0,7);c.fill()}}
function vspDraw(){if(!VSPI())return;const T=performance.now()/1000,now=performance.now();g.save();
  g.globalCompositeOperation='lighter';glowAt(CX,CY,140,'200,150,255',.12+.06*Math.sin(T*1.6));g.globalCompositeOperation='source-over';
  VLN=VLN.filter(z=>now-z.t0<z.d+300);for(const z of VLN){const k=Math.min(1,(now-z.t0)/z.d),post=now-z.t0>z.d;for(const a of z.A){g.save();g.translate(z.x,z.y);g.rotate(a);if(post){const q=1-(now-z.t0-z.d)/300;g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,220,150,'+(.8*q)+')';g.fillRect(0,-30,z.L,60);g.fillStyle='rgba(255,255,240,'+q+')';g.fillRect(0,-8,z.L,16)}
      else{g.fillStyle='rgba(255,70,50,'+(.12+.1*k)+')';g.fillRect(0,-32,z.L,64);g.strokeStyle='rgba(255,90,60,.8)';g.lineWidth=2;g.setLineDash([12,8]);g.lineDashOffset=-T*40;g.strokeRect(0,-32,z.L,64);g.setLineDash([]);g.fillStyle='rgba(255,220,150,'+(.5*k)+')';g.fillRect(0,-32*k,z.L*k,64*k)}g.restore()}}
  if(VHD.on&&dg.ph==='boss'){const a=VHD.a+VHD.w*Math.min(1.5,(now-VHD.t0)/1000),len=480,w=22;g.save();g.translate(CX,CY);g.rotate(a);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(8,-w/2+10,len,w);g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,80,60,'+(.3+.18*Math.sin(T*8))+')';g.fillRect(0,-w/2-8,len,w+16);g.restore();
    const hg=g.createLinearGradient(0,-w/2,0,w/2);hg.addColorStop(0,'#fff0b8');hg.addColorStop(.5,'#d8a040');hg.addColorStop(1,'#8a5a1a');g.fillStyle=hg;g.beginPath();g.moveTo(-40,-w*.35);g.lineTo(len-50,-w/2);g.lineTo(len,0);g.lineTo(len-50,w/2);g.lineTo(-40,w*.35);g.closePath();g.fill();g.strokeStyle='#5a3a10';g.lineWidth=1.6;g.stroke();g.restore();g.fillStyle='#d8a050';g.beginPath();g.arc(CX,CY,30,0,7);g.fill()}
  if(VFZ){const a=(now-VFZ.t0)/VFZ.d;if(a>1.2)VFZ=null;else{const k=a<1?Math.min(1,a*2.5):1-(a-1)/.2;g.fillStyle='rgba(12,8,24,'+(.7*k)+')';g.beginPath();g.rect(cam.x-60,cam.y-60,W+120,H+120);for(const[x,y]of VFZ.g){g.moveTo(x+74,y);g.arc(x,y,74,0,7,true)}g.fill();
    for(const[x,y]of VFZ.g){g.save();g.translate(x,y);g.rotate(T*.8);g.strokeStyle='rgba(255,220,140,.95)';g.lineWidth=3;g.beginPath();for(let i=0;i<24;i++){const aa=i/24*6.283,R=i%2?70:78;g.lineTo(Math.cos(aa)*R,Math.sin(aa)*R)}g.closePath();g.stroke();g.restore();g.save();g.globalCompositeOperation='lighter';glowAt(x,y,80,'255,210,140',.3);g.restore()}
    if(a<1){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,10,30,.9)';const tx='⏸️ เข้าวงเฟือง! '+Math.max(0,(1-a)*VFZ.d/1000).toFixed(1);g.strokeText(tx,me.x,me.y-70);g.fillStyle='#ffe8b0';g.fillText(tx,me.x,me.y-70)}}}
  g.restore()}
function vspScreen(){if(!VSPI()||dg.ph!=='boss')return;const B=mons.find(q=>q.t===3);if(!B)return;const f=B.hp/B.mh;if(f>.6)return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const c=f>.3?'150,90,255':'255,170,60',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(.16+.06*Math.sin(T*3))+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);g.restore()}
function gxVesper(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,ph=hf>.6?1:hf>.3?2:3,fy=br-4;g.save();g.translate(0,30);g.scale(1.3,1.3);g.translate(0,-30);
  /* วงเฟืองด้านหลัง */if(!W){g.save();g.translate(0,-50+fy);g.rotate(T*(ph===3?.8:.25));g.strokeStyle='rgba(216,160,80,'+(ph===3?.8:.5)+')';g.lineWidth=2;g.beginPath();for(let i=0;i<32;i++){const a=i/32*6.283,R=i%2?46:52;g.lineTo(Math.cos(a)*R,Math.sin(a)*R)}g.closePath();g.stroke();g.restore();if(ph>=2){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-50+fy,60,ph===3?'255,190,110':'190,140,255',.25);g.restore()}}
  {const cs=Math.sin(T*1.2)*4;Pg([-24,-46+fy,24,-46+fy,44+cs,30,22,26,0,34,-22,26,-44-cs,30],F('#1e1428'),1);if(!W){g.fillStyle='rgba(216,160,80,.6)';for(let i=0;i<6;i++){const gx=-30+i*12,gy=14+(i%2)*6;g.beginPath();g.arc(gx,gy,3,0,7);g.fill()}}}
  for(const s of[-1,1])Ln([s*10,8,s*14,30],F('#5a3a1e'),9);
  {const bg=W?'#fff':(()=>{const q=g.createLinearGradient(-22,0,22,0);q.addColorStop(0,'#4a2c14');q.addColorStop(.5,'#a87038');q.addColorStop(1,'#3a2010');return q})();g.fillStyle=bg;g.beginPath();g.roundRect(-20,-48+fy,40,56,6);g.fill();g.strokeStyle='#2a1408';g.lineWidth=1.4;g.stroke()}
  E(0,-26+fy,10,10,F('#d8a050'),1);if(!W){g.strokeStyle='#ffe0a0';g.lineWidth=1.4;for(let i=0;i<8;i++){const a=i*.785+T*.5;g.beginPath();g.moveTo(Math.cos(a)*10,-26+fy+Math.sin(a)*10);g.lineTo(Math.cos(a)*15,-26+fy+Math.sin(a)*15);g.stroke()}if(ph===3){g.strokeStyle='rgba(255,220,150,.9)';g.lineWidth=1.4;g.beginPath();g.moveTo(-12,-40+fy);g.lineTo(-4,-30+fy);g.lineTo(-10,-14+fy);g.moveTo(10,-44+fy);g.lineTo(4,-30+fy);g.stroke();g.save();g.globalCompositeOperation='lighter';glowOrb(0,-26+fy,22,'255,200,120',.6);g.restore()}}
  for(const s of[-1,1]){E(s*22,-44+fy,11,8,F('#8a5a2c'),1);Pg([s*14,-50+fy,s*30,-54+fy,s*28,-40+fy],F('#b07a3a'),1)}
  /* หมวกเกราะ + ผ้าคลุมหัว */E(0,-62+fy,11,12,F('#8a5a2c'),1);Pg([-13,-58+fy,-14,-74+fy,0,-82+fy,14,-74+fy,13,-58+fy],F('#6a4422'),1);if(!W){g.fillStyle='#0a0612';g.fillRect(-8,-66+fy,16,5)}eye(-4,-64+fy,2.4,1.4,ph===3?'#ffd090':'#d8b0ff');eye(4,-64+fy,2.4,1.4,ph===3?'#ffd090':'#d8b0ff');Pg([-3,-82+fy,0,-98+fy,3,-82+fy],F('#d8a050'),1);
  /* หอกเข็มนาฬิกา */{const hx=34,hy=-10+fy-up*.6;Ln([18,-40+fy,hx,hy],F('#1e1428'),7);g.save();g.translate(hx,hy);g.rotate(-.15-cf*.3);Ln([0,40,0,-110],F('#6a4422'),4);Pg([-6,-108,0,-140,6,-108,3,-100,-3,-100],F('#ffe8a0'),1);if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-124,14+cf*14,'255,210,140',.6+cf*.4);g.restore()}g.restore()}
  {const lx=-34,ly=-24+fy-up*.3;Ln([-18,-40+fy,lx,ly],F('#1e1428'),7);E(lx,ly,5,5,F('#8a5a2c'),1);if(!W&&cf>0){g.save();g.globalCompositeOperation='lighter';glowOrb(lx,ly-6,12*cf+4,'200,160,255',.8*cf);g.restore()}}
  g.restore()}
function instRepeatVsp(){const l=Math.max(0,(me.vsT||0)+30*60000-Date.now());if(l>0){stSay([['eda5','ท่านเวสเปอร์บอกว่าให้พักก่อนลูก… อีก '+Math.ceil(l/60000)+' นาทีค่อยลงไปซ้อมกับท่านใหม่']]);return true}
  stSay([['eda5','ท่านเวสเปอร์ยังลงไปยืนที่ก้นหลุมทุกวัน ท่านว่าถ้าใครอยากฝึก ท่านยินดีประลองด้วย (หินขั้นสูง · เศษคราส · ของ Lv 22)']],()=>{},{choice:[['⌛ ลงไปประลองกับเวสเปอร์',1],['ไว้ก่อน',0]]});SD.onChoose=e=>{stClose();if(e===1)setTimeout(vspEnter,250)};return true}
/* ---------- เนื้อเรื่องภาค 6 บทที่ 5 (บทสุดท้าย) ---------- */
Object.assign(SPK,{eda5:SPK.eda,ves5:SPK.ves});STNPC.eda5=[33,'npc'];STNPC.ves5=[33,'npc2'];
STCH.push('ภาค 6 · บทสุดท้าย · หลุมหัวใจว่าง');
{const CA=STCH.length-1;STY.push(
 {c:CA,g:'talk',k:'qn',tx:'รีบขึ้นไปหาราชินีเอลิราในนครลอยฟ้า ก่อนเวสเปอร์จะถึง',
  pre:[['nar','ท้องพระโรงของอัสตราเงียบกริบ ประตูทุกบานยังเปิดอยู่ตามที่ราชินีสั่ง… และเวสเปอร์ก็เดินเข้ามาทางประตูนั้นเอง ไม่มีใครขวาง'],
   ['ves','ราชินีแห่งอัสตรา ข้าคือเวสเปอร์ ผู้พิทักษ์แห่งอารัณยา ข้ามาขอสิ่งที่เป็นของเรา'],
   ['qn','ข้ารู้เรื่องทั้งหมดแล้ว… และข้าขอโทษ แทนราชาทุกองค์ที่ไม่เคยกล้าพูดคำนี้'],
   ['qn','แต่ถ้าข้ายกหัวใจทั้งดวงให้ อัสตราจะร่วง ผู้อพยพหลายพันคนที่เพิ่งขึ้นมา… ลูกหลานของคนอารัณยาเอง ก็จะร่วงไปด้วย'],
   ['ves','…ข้ารู้ ข้าถึงไม่ได้มาเพื่อขอ ข้ามาเพื่อบอก'],
   ['nar','พื้นท้องพระโรงสั่นสะเทือน แสงสีม่วงพุ่งขึ้นมาจากใต้เมฆ ล้อมรอบเมืองไว้ดุจโซ่ หัวใจดาวใต้บัลลังก์ส่งเสียงครวญ'],
   ['cas','ฝ่าบาท! โซ่แสงสี่เส้นจากใต้เมฆพันหัวใจดาวไว้แล้ว มันกำลังดึงลง… เมืองเริ่มเอียงพ่ะย่ะค่ะ!'],
   ['ves','คนของข้าถักโซ่นั้นจากเงาของตัวเอง สามร้อยปีที่พวกเขารอ… ข้าจะไม่ให้พวกเขารอต่อแม้แต่วันเดียว'],
   ['nar','เวสเปอร์หันหลังเดินกลับไปตามสะพาน ร่างของเขาจางหายลงไปในทะเลเมฆ'],
   ['qn','ผู้นำแห่งรุ่งอรุณ… สมอของโซ่ต้องอยู่ใต้หอนาฬิกา ข้าขอให้เจ้าไปหยุดเขา — ไม่ใช่ฆ่า แค่หยุด'],
   ['til','(ทิลวิ่งมาถึงพร้อมยายเอดา) ข้ารู้ทาง! ใต้ลานหอนาฬิกามีบันไดลงไปอีก ข้าเห็นในฝัน']],rw:{g:100000}},
 {c:CA,g:'map',m:33,tx:'ลงหลุมหัวใจว่าง (บันไดใต้ลานหอนาฬิกา · ซากอารัณยา)',
  post:[['nar','บันไดวนพาลงลึกใต้หอนาฬิกา จนเปิดออกสู่แอ่งหินขนาดมหึมา ขั้นบันไดวงแหวนลดหลั่นลงไปสู่หลุมมืดตรงกลาง'],
   ['nar','บนทุกขั้นบันได มีเงานั่งหันหน้าเข้าหาหลุมเดียวกัน นับพันนับหมื่น… นิ่งสนิท ราวกับนั่งรอแบบนี้มาสามร้อยปี'],
   ['eda','(ยายเอดากระซิบ) …ที่นั่งของคนที่รอ ยายเข้าใจแล้ว เพลงกล่อมนั่น ร้องให้คนที่นั่งตรงนี้ฟัง'],
   ['me','(สมอโซ่แสงสี่ต้นปักอยู่รอบหลุม แสงสีม่วงพุ่งจากสมอเข้าหาหลุม แล้วพุ่งขึ้นฟ้าไปหาอัสตรา)']]},
 {c:CA,g:'clue',m:33,n:4,p6an:1,tx:'ทำลายสมอโซ่แสงทั้ง 4 ต้นรอบหลุม',
  pre:[['til','ถ้าทำลายสมอได้ โซ่จะคลาย อัสตราจะไม่ร่วง!'],['eda','ระวังนะลูก… เงาพวกนั้นเป็นคนถักโซ่ พวกเขาจะไม่ยอมง่าย ๆ']],
  post:[['nar','สมอต้นสุดท้ายพังลง โซ่แสงทั้งสี่เส้นสลายเป็นละอองม่วง ไกลขึ้นไปบนฟ้า เสียงครวญของหัวใจดาวเงียบลง'],
   ['nar','แต่เงาบนขั้นบันไดลุกขึ้นพร้อมกัน… นับพัน หันหน้ามาทางผู้ถือตรา']]},
 {c:CA,g:'kill',m:33,n:50,tx:'ฝ่าเงาบนขั้นบันไดแห่งการรอคอย',
  post:[['nar','เงาตนสุดท้ายทรุดลง แทนที่จะสลาย มันกลับนั่งลงบนขั้นบันไดตามเดิม… แล้วหันกลับไปมองหลุมเงียบ ๆ'],
   ['eda','พวกเขาไม่ได้อยากสู้หรอกลูก… พวกเขาแค่ไม่อยากให้ความหวังสุดท้ายหายไป']],rw:{g:80000}},
 {c:CA,g:'talk',k:'eda5',p6vf:1,tx:'ไปหายายเอดาที่ทางลงหลุม',
  pre:[['eda','ท่านเวสเปอร์ลงไปที่ก้นหลุมแล้ว ยายเห็นแสงหอกของท่าน'],
   ['hed','ข้าจะไปด้วย… ไม่ ข้าจะรอที่นี่ ถ้าเจ้าไม่กลับมา ข้าจะลงไปเอง',0,0,2],
   ['til','ท่านผู้นำ… อย่าทำร้ายท่านเวสเปอร์มากนะ ท่านแค่เหนื่อย'],
   ['eda','ยายจะร้องเพลงไว้ตรงนี้ ให้ได้ยินไปถึงข้างล่าง']],rw:{g:40000,s3:5}},
 {c:CA,g:'vsp',k:'eda5',tx:'ลงก้นหลุมหัวใจ หยุดเวสเปอร์ (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['eda','พร้อมเมื่อไหร่ก็ลงไปเถอะลูก']],
  post:[['nar','หอกเข็มนาฬิกาปักลงกลางรอยประทับหัวใจ เวสเปอร์คุกเข่าลงข้างมัน เกราะสำริดร้าวทั้งตัว'],
   ['ves','…สามร้อยปี ข้ารอคนที่จะกลับมา แต่คนที่มากลับเป็นเจ้า คนที่ไม่ได้ติดหนี้อะไรเราเลย'],
   ['nar','เสียงเพลงกล่อมของยายเอดาลอยลงมาจากขอบหลุม เงานับพันบนขั้นบันไดร้องตามเบา ๆ'],
   ['ves','ขึ้นไปเถอะ ข้าจะตามไป… ข้าอยากฟังคำตอบของเจ้า ต่อหน้าคนของข้าทุกคน']]},
 {c:CA,g:'talk',k:'ves5',p6z:1,cine:1,tx:'ตัดสินใจอนาคตของสองเมือง · คุยกับเวสเปอร์ที่ขอบหลุม',
  pre:[['nar','ขอบหลุมหัวใจ… ราชินีเอลิราลงมาตามสะพานแสงพร้อมคาสเซียน เรนน์ และชาวค่ายจำนวนหนึ่ง ยืนหันหน้าเข้าหาเงานับพันบนขั้นบันได'],
   ['qn','ข้าลงมาเองเพราะคำตอบนี้ ข้าไม่มีสิทธิ์ตัดสินคนเดียว'],
   ['qn','ผู้นำแห่งรุ่งอรุณ เจ้าคือคนที่เดินผ่านทั้งสองเมือง ทั้งบนฟ้าและใต้เมฆ… บอกเราเถอะ ว่าทางไหนที่ทุกคนจะได้กลับบ้าน'],
   ['ves','ข้าจะยอมรับคำตอบของเจ้า ผู้ถือตรา ไม่ว่ามันจะเป็นอะไร']],
  post:[['nar','🌅 — จบภาค 6 · สะพานรุ่งอรุณ — ขอบคุณที่เดินทางลงมาจนถึงก้นหลุมแห่งการรอคอย']],rw:{g:600000,s3:25,rbs:1}})}
const STEND6={1:[['me','(วางมือที่มีตรารุ่งอรุณลงบนรอยประทับหัวใจ) …แบ่งแสงกันเถอะ หัวใจดวงเดียวส่องสองเมืองได้'],
   ['qn','ถ้าอย่างนั้น อัสตราจะลอยต่ำลง ต่ำจนแทบแตะทะเลเมฆ… ข้ายอม เมืองที่เปิดประตูให้ทุกคน ไม่จำเป็นต้องอยู่สูงกว่าใคร'],
   ['nar','ราชินีและเวสเปอร์วางมือบนรอยประทับพร้อมกัน ไกลขึ้นไปบนฟ้า หัวใจดาวเต้นแรงหนึ่งครั้ง… แล้วแสงครึ่งหนึ่งก็ไหลลงมาตามสะพานรุ่งอรุณ เป็นสายน้ำสีทอง'],
   ['nar','แสงทองตกลงในหลุมที่ว่างเปล่ามาสามร้อยปี ระฆังทุกใบในอารัณยาดังพร้อมกัน… และเงาบนขั้นบันไดก็ได้ใบหน้าของตัวเองคืนมาทีละคน'],
   ['ves','(เวสเปอร์มองคนของเขาหลับตาลงอย่างสงบ ทีละคน) …หลับเถิด ทุกคน ไม่ต้องรออีกแล้ว'],
   ['qn','หัวใจทั้งดวงที่เคยอยู่บนอัสตรา บัดนี้แบ่งให้ใต้เมฆครึ่งหนึ่ง… พอจะให้ทั้งสองเมืองหายใจได้',0,1],
   ['qn','หัวใจครึ่งบนฟ้า แบ่งอีกครึ่งให้อารัณยา… ส่วนครึ่งใต้แผ่นดินที่เจ้าผนึกไว้ ก็ได้ยินเสียงของมันเช่นกัน หัวใจสามส่วน ต่อกันเป็นเพลงเดียว',0,2],
   ['nar','อัสตราค่อย ๆ ลดระดับลงจนลอยอยู่เหนือทะเลเมฆ ส่วนเกาะทั้งหกของอารัณยาเริ่มลอยขึ้นช้า ๆ… สองเมืองพบกันกลางทาง'],
   ['eda','(ยายเอดาร้องเพลงกล่อมจนจบทั้งเพลงเป็นครั้งแรก) «…วันหนึ่งประตูจะเปิด แล้วเราจะกลับบ้าน — และเราก็กลับมาแล้ว»'],
   ['ves','ผู้ถือตรา… ไม่สิ ผู้เชื่อมสองฟ้า หอนาฬิกาของข้าจะเดินต่อ เพื่อนับวันที่สองเมืองอยู่ด้วยกัน'],
   ['til','ท่านเวสเปอร์! สอนข้าซ่อมนาฬิกาได้ไหม ข้าอยากเป็นคนตีระฆังตอนเช้า!']],
 2:[['me','(ยกมือที่มีตรารุ่งอรุณขึ้น) หัวใจดวงนี้ไม่ต้องย้ายที่อีก… ข้าจะสร้างหัวใจดวงใหม่ให้อารัณยาเอง'],
   ['ves','สร้าง…? หัวใจดาวไม่ใช่สิ่งที่หล่อขึ้นได้ในเตา ผู้ถือตรา มันเกิดจากดาวที่ร่วง'],
   ['me','(ตรารุ่งอรุณเปลี่ยนเป็นสีทองเจิดจ้า) ข้าสาบานด้วยตรานี้ ตราที่คนของท่านเคยเชื่อว่าจะกลับมารับพวกเขา… ครั้งนี้มันจะกลับมาจริง'],
   ['qn','อัสตราจะช่วย ทุกอย่างที่เรามี นักดาราศาสตร์ ช่างหลวง หอจดหมายเหตุ ข้าจะเปิดให้หมด'],
   ['cas','องครักษ์ดาวจะออกไปตามหาดาวที่ร่วงทุกดวงบนแผ่นดิน ข้าสาบานด้วย',0,1],
   ['qn','หัวใจครึ่งใต้แผ่นดินที่เจ้าผนึกไว้… บางทีมันอาจรู้ทางไปหาดาวดวงใหม่ เพราะมันเคยเป็นส่วนหนึ่งของฟ้ามาก่อน',0,2],
   ['nar','เวสเปอร์ลุกขึ้น เดินไปที่หอนาฬิกา แล้วปลดกลไกที่หยุดเวลาไว้ เข็มนาฬิกาเริ่มเดิน… ช้ามาก ช้ากว่าเวลาข้างบนนับร้อยเท่า'],
   ['ves','อารัณยาจะรอต่อ… แต่ครั้งนี้ ไม่ต้องรอในความมืด และไม่ต้องรอคนที่ไม่กลับมา'],
   ['nar','เงาบนขั้นบันไดหลับตาลงทีละคน ตรงกลางหลุม มีแสงเล็ก ๆ ดวงหนึ่งลอยขึ้นมา เหมือนเมล็ดพันธุ์ของดาว — จุดเริ่มต้นของหัวใจดวงใหม่'],
   ['eda','(ยายเอดาร้องเพลงกล่อมจนจบทั้งเพลง) «…วันหนึ่งประตูจะเปิด แล้วเราจะกลับบ้าน» — ไม่ต้องรีบนะลูก ยายจะร้องรอ'],
   ['til','ข้าจะไปกับท่านผู้นำด้วย! ไปตามหาดาวที่ร่วงทุกดวงเลย!']]};
setTimeout(()=>{try{
    MAPS[32].gates.push({x:2120,y:2900,to:33,req:1,p6v:1,ars:1,nm:'หลุมหัวใจว่าง',arr:{x:1600,y:300}});
    const M7=MAPS[27];MAPS[33]=Object.assign({},M7,{n:'หลุมหัวใจว่าง',sx:1600,sy:300,sr:100,seed:331,bg:'#1a1028',tile:'#5a4c68',safe:'#6a5c78',ring:'#d8a050',t1:'#120c1a',t2:'#2a2034',d1:'#3a2c48',d2:'#d8a050',bth:30,
      gates:[{x:1600,y:170,to:32,req:1,ars:1,nm:'ซากอารัณยา',arr:{x:2120,y:2820}}],npc:{x:1720,y:520,n:'ยายเอดา · ทางลงหลุม',L:22},npc2:{x:-9999,y:-9999,n:'เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[2300,1250],[2400,2050],[1950,2650],[1250,2650],[800,2050],[800,1300],[1100,900],[2100,900],[1600,2800],[2700,1700],[500,1700]]});
    FIELDM[33]=1;BTR[33]='150,40,170';GLOWC[33]='220,170,255';FXST[33]='void';try{BTC[33]=['#ffe0b0','#8a5ad0','#ffffff'];TIER[33]=[16.5,19,2.45];WRG[33]={2:{rg:270,cd:3,spd:230,dm:1.5,k:'bell',c:'255,190,120',big:1}}}catch(e){}}catch(e){console.warn('hp map',e)}
  try{NPC3[33]={d:NPC3[32].d,s:['ยายจะร้องเพลงรอไว้ตรงนี้นะลูก','เงาพวกนั้น… ยายรู้สึกเหมือนเคยรู้จักทุกคน','หลับเถิดลูก แสงของเราอยู่บนฟ้า…'],hy:46}}catch(e){}
  try{const _b=hpBuild;window.hpBuild=hpBuild=function(M){_b(M);trees.push({x:1600,y:HPC.y-HPS-60,r:0,k:'hves',ht:90,ns:1,nc:1})}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=81000&&id<82000)return vspMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(VSPI())return vspStart();return _ds()}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(VSPI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return vspReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=VSPI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(VSPI()){enterMap(33,vspBack());sysMsg('⌛ ถูกเหวี่ยงขึ้นจากก้นหลุม · คุยกับยายเอดาเพื่อลงไปใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(VSPI())return dg.ph==='boss'?'⌛ เวสเปอร์ · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'⌛ เวสเปอร์วางหอกลงแล้ว':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'⌛ ก้นหลุมหัวใจ · กด "เริ่ม" เมื่อพร้อม';return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(VSPI()){ov.hidden=true;sfx('gate');enterMap(33,vspBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(vspFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{vspDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{vspScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='vsp')return instRepeatVsp();return _ir(k)}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p6an)return hpAqT(st);return _q(st)}}catch(e){}
  try{const _sd=stDone;window.stDone=stDone=function(){const st=stCur(),q=me.sty;if(st&&st.p6z&&q&&!q.e6){q.a=2;setTimeout(()=>{stSay([['me','(ทุกสายตาจับจ้องมาที่ผู้ถือตรา… จะเลือกอนาคตแบบไหนให้สองเมือง?)']],()=>{},{cine:1,choice:[['🌗 แบ่งแสงหัวใจให้สองเมือง',1],['🌱 สาบานจะสร้างหัวใจดวงใหม่ให้อารัณยา',2]]});
      SD.onChoose=e=>{q.e6=e;stClose();setTimeout(()=>stSay(STEND6[e],()=>{_sd();setTimeout(()=>{banner={s:e===1?'🌗 ผู้เชื่อมสองฟ้า · แสงหัวใจส่องถึงอารัณยาแล้ว':'🌱 ผู้เชื่อมสองฟ้า · คำสาบานแห่งดาวดวงใหม่',t:6};try{stFlash()}catch(_){}},600)},{cine:1}),250)}},200);return}return _sd()}}catch(e){}},0);
