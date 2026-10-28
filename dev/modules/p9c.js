/* ---------- v536 ดันเจี้ยน «หอนาฬิกาดาว» (ห้อง 48000–48999 · DT[29] · ธีมมอน 43) ----------
   ลานคือหน้าปัดนาฬิกายักษ์ (รัศมี 560) · บอส «ผู้รักษาเวลา» ยืนกลางหน้าปัด (11 ล้าน · Lv 150)
   เข็มนาฬิกา 2 เข็มกวาดตลอด: เข็มชั่วโมง (ช้า ตามเข็ม) · เข็มนาที (เร็ว ทวนเข็ม) โดนเข็ม = ดาเมจ (คูลดาวน์ต่อคน 1.2 วิ)
   หยุดเวลา (ทุก ~17 วิ): ขีดชั่วโมงทอง 3 ขีดเรือง 2 วิ → เวลาหยุด 3.5 วิ ใครไม่อยู่บนขีดทอง ค้างกับที่ + เวลากดทับ (ดาเมจทุก 0.5 วิ) ขณะเข็มยังกวาด
   ฝนเฟือง: วงเตือนใต้ผู้เล่น 1.3 วิแล้วเฟืองตกใส่ · เลือด 50%: ย้อนเวลา — นาฬิกาทราย 4 ใบบนขีด 12/3/6/9 ทุบให้แตกใน 10 วิ ไม่งั้นบอสฟื้น 10%
   เลือด 70%/35%: สัตว์ดาวออกมาช่วย · < 40% เข็มเร็วขึ้น หยุดเวลาถี่ขึ้น · หลายคน: โฮสต์ส่งสถานะทุก 0.4 วิ (ctv) */
setTimeout(()=>{DT[29]={n:'หอนาฬิกาดาว',lv:1,L:150,bL:22,hp:11000000,xp:1100000,g:140000,dm:76,tn:10,sm:0,rm:4,lg:1,tm:960,gold:950000,exp:8400000}},0);
const CTWI=()=>!!(MAPS[curMap]&&MAPS[curMap].ctw),ctwBack=()=>{const N=MAPS[41]&&MAPS[41].npc;return N?{x:N.x-60,y:N.y-40}:{x:900,y:2300}};
const CTR=560,CTHW=34,CTHL=540,CTMK=[...Array(12)].map((_,k)=>{const a=k/12*6.283-1.571;return[CX+Math.cos(a)*470,CY+Math.sin(a)*470]});
let CT={ah:0,am:3.14,t0:0,ts:0,tt:17,lit:[],hg:0,hgt:0,a7:0,a3:0,a5:0,bt:0,gc:[]},CTFX={g:[],x:[]},CTLT=0,CTH={};
const ctwReset=()=>{CT={ah:0,am:3.14,t0:performance.now(),ts:0,tt:17,lit:[],hg:0,hgt:0,a7:0,a3:0,a5:0,bt:0,gc:[]};CTFX={g:[],x:[]};CTH={}};
const ctSpd=()=>{const B=mons.find(m=>m.t===3&&m.hp>0),h=B&&B.hp<B.mh*.4;return[h?.5:.34,h?-1.25:-.85]};
const CTW_IN=[['nar','ประตูหอนาฬิกาปิดลงข้างหลัง… พื้นใต้เท้าคือหน้าปัดนาฬิกาทั้งหน้า ตัวเลขโรมันใหญ่เท่าตัวคน เข็มยักษ์สองเข็มกวาดผ่านหัวไปเสียงหวือ'],
  ['nar','กลางหน้าปัด หุ่นสูงในเสื้อคลุมทองเหลืองยืนนิ่ง หัวของมันคือหน้าปัดนาฬิกาเล็ก ๆ เข็มบนหน้ามันเดินถอยหลัง'],
  ['nar','«ผู้มาเยือน… ท่านโอเรียนสั่งไว้ว่า ห้ามใครหยุดนาฬิกา» มันยกมือ เวลาทั้งห้องกระตุกหนึ่งครั้ง'],
  ['nar','💡 เข็มนาฬิกา 2 เข็มกวาดตลอด → หลบเส้นเข็ม · ขีดชั่วโมงสีทองเรือง = เวลากำลังจะหยุด → ไปยืนบนขีดทอง ไม่งั้นค้างกับที่ · วงใต้เท้า = เฟืองตก · เลือดบอสครึ่งหนึ่ง นาฬิกาทราย 4 ใบโผล่ ทุบให้หมดใน 10 วิ']];
function ctwMap(id){if(MAPS[id])return MAPS[id];const D=DT[29];ctwReset();
  return MAPS[id]={n:'หอนาฬิกาดาว',dg:29,ctw:1,th:43,bth:43,sx:CX,sy:CY+500,sr:0,seed:421,bg:'#120a1c',tile:'#c8b48a',safe:'#bca67a',ring:'#ffd890',t1:'#3a2a20',t2:'#c89a4a',d1:'#2a2036',d2:'#fff0d0',nests:[],
    gates:[{x:CX+80,y:CY+520,to:41,req:1,ars:1,nm:'วงแหวนเฟือง',arr:ctwBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY,n:'ผู้รักษาเวลา',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:150,col:'#ffe0a0',bar:'#8a6a32',ln:'#fff4d8',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'กลางหน้าปัด',dg:1}}}
function ctwEnter(){if(!me.cls||me.down>0||isDg())return;const id=48000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🕰️ เปิดหอนาฬิกาดาว รหัส '+id+' มาช่วยกันหยุดผู้รักษาเวลา!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  ctwReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX,y:CY+500});setTimeout(()=>{if(CTWI()&&dg.ph==='lobby')banner={s:'🕰️ หอนาฬิกาดาว · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function ctwStart(){if(!CTWI()||dg.ph!=='lobby')return;const D=DT[29];stSay(CTW_IN,()=>{if(!CTWI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;ctwReset();spawnBoss();
  fx({k:'msg',s:'🕰️ ผู้รักษาเวลาหมุนเข็มทุกเข็มบนหน้าปัด!'});try{sfx('boss')}catch(e){}},{cine:1})}
function ctwAdds(n,hg){const D=DT[29],np=Math.max(1,plCount());for(let i=0;i<n;i++){const P=hg?CTMK[[0,3,6,9][i%4]]:CTMK[(Math.random()*12)|0],x=P[0]+(hg?0:rnd(-40,40)),y=P[1]+(hg?0:rnd(-40,40)),t=hg?2:(Math.random()*3)|0,hp=mhp(t,D.L)*(hg?2.2:1.3)*(1+.25*(np-1));
    mons.push({id:++mid,x,y,tx:x,ty:y,t,L:D.L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,ctw:1,hg:hg?1:0})}}
function ctHit(u,d){if(u===uid){CT.hk=(CT.hk|0)+1;try{hurt(d)}catch(e){}}else dmgOut.push([u,d])}
/* มุมเข็มปัจจุบัน (ทุกเครื่องคำนวณเองจากฐานที่โฮสต์ส่ง) */
function ctAng(){const t=(performance.now()-CT.t0)/1000,[sh,sm]=ctSpd();return[CT.ah+sh*t,CT.am+sm*t]}
function ctOnHand(x,y,a){const dx=Math.cos(a),dy=Math.sin(a),px=x-CX,py=y-CY,t=px*dx+py*dy;return t>60&&t<CTHL&&Math.abs(px*dy-py*dx)<CTHW+12}
function ctSwept(x,y,a0,a1,L){const r=Math.hypot(x-CX,y-CY);if(r<60||r>L)return false;const w=(CTHW+12)/r,pa=Math.atan2(y-CY,x-CX),d0=Math.atan2(Math.sin(pa-a0),Math.cos(pa-a0)),sw=Math.atan2(Math.sin(a1-a0),Math.cos(a1-a0));if(Math.abs(d0)<w)return true;const lo=Math.min(0,sw)-w,hi=Math.max(0,sw)+w;return d0>=lo&&d0<=hi}
function ctwSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  const B=mons.find(m=>m.t===3&&m.hp>0),pl=escPl(),dm=DT[29].dm/66;if(!B)return;const f=B.hp/B.mh,hard=f<.4,now=performance.now();
  /* เข็มกวาด (เช็กทั้งช่วงที่เข็มกวาดผ่านตั้งแต่รอบก่อน ไม่ให้ทะลุ) */const[ah,am]=ctAng(),pa=CT.pa||[ah,am];CT.pa=[ah,am];pl.forEach(p=>{if((CTH[p.u]||0)>now)return;if(ctSwept(p.x,p.y,pa[0],ah,CTHL*.82)||ctSwept(p.x,p.y,pa[1],am,CTHL)){CTH[p.u]=now+1200;ctHit(p.u,Math.round(70*dm))}});
  /* สัตว์ดาว */if(f<.7&&!CT.a7){CT.a7=1;ctwAdds(3+Math.min(3,pl.length-1));fx({k:'msg',s:'🐈 สัตว์ดาวกระโจนออกมาจากตัวเลขบนหน้าปัด!'})}if(f<.35&&!CT.a3){CT.a3=1;ctwAdds(4+Math.min(3,pl.length-1));fx({k:'msg',s:'🦉 ฝูงนกฮูกเฟืองบินออกจากหอ!'})}
  /* ย้อนเวลา */if(f<.5&&!CT.a5){CT.a5=1;CT.hg=1;CT.hgt=10;ctwAdds(4,1);fx({k:'msg',s:'⏳ ผู้รักษาเวลาพลิกนาฬิกาทราย! ทุบให้แตกทั้ง 4 ใบใน 10 วิ ไม่งั้นมันจะย้อนเวลาตัวเอง'})}
  if(CT.hg){CT.hgt-=dt;const left=mons.filter(m=>m.hg&&m.hp>0).length;if(!left){CT.hg=0;fx({k:'msg',s:'💥 นาฬิกาทรายแตกหมด! ย้อนเวลาไม่สำเร็จ'})}else if(CT.hgt<=0){CT.hg=0;mons=mons.filter(m=>!m.hg);B.hp=Math.min(B.mh,B.hp+B.mh*.1);fx({k:'msg',s:'⏪ ทรายหมด… ผู้รักษาเวลาย้อนเวลาตัวเอง ฟื้นเลือด 10%!'});fx({k:'ctrw'})}}
  /* หยุดเวลา: 0 ปกติ → 1 เตือน (ขีดทองเรือง) → 2 หยุด */
  CT.tt-=dt;if(CT.tt<=0){if(CT.ts===0){CT.ts=1;CT.tt=2;CT.lit=[0,1,2,3,4,5,6,7,8,9,10,11].sort(()=>Math.random()-.5).slice(0,3);fx({k:'msg',s:'⏳ ขีดชั่วโมงทองเรือง… เวลากำลังจะหยุด ไปยืนบนขีดทอง!'})}else if(CT.ts===1){CT.ts=2;CT.tt=3.5;try{sfx('zap')}catch(e){}}else{CT.ts=0;CT.tt=hard?12:17;CT.lit=[]}}
  if(CT.ts===2){CT.tk=(CT.tk||0)-dt;if(CT.tk<=0){CT.tk=.5;pl.forEach(p=>{if(!CT.lit.some(i=>Math.hypot(p.x-CTMK[i][0],p.y-CTMK[i][1])<62))ctHit(p.u,Math.round(25*dm))})}}
  /* ฝนเฟือง */CT.gt=(CT.gt===undefined?6:CT.gt)-dt;if(CT.gt<=0&&CT.ts!==2){CT.gt=hard?6:8;const P=pl.slice(0,5).map(p=>[Math.round(p.x),Math.round(p.y)]);while(P.length<Math.min(5,pl.length+2)){const a=Math.random()*6.283,r=Math.random()*440;P.push([Math.round(CX+Math.cos(a)*r),Math.round(CY+Math.sin(a)*r)])}CT.gc={t:1.3,p:P};fx({k:'ctg',p:P,d:1.3})}
  if(CT.gc&&CT.gc.t!==undefined){CT.gc.t-=dt;if(CT.gc.t<=0){const P=CT.gc.p;pl.forEach(p=>{if(P.some(([x,y])=>Math.hypot(p.x-x,(p.y-y)*1.4)<70))ctHit(p.u,Math.round(80*dm))});fx({k:'ctgx',p:P});CT.gc={}}}
  CT.bt-=dt;if(CT.bt<=0){CT.bt=.4;const[a1,a2]=ctAng();fx({k:'ctv',ah:Math.round(a1*1000)/1000,am:Math.round(a2*1000)/1000,ts:CT.ts,tt:Math.round(CT.tt*10)/10,lit:CT.lit,hg:CT.hg,hgt:Math.round(CT.hgt*10)/10})}}
function ctwMon(m,dt,pl,spd){if(!CTWI())return false;if(m.hg){m.x=m.hx;m.y=m.hy;return true}if(Math.hypot(m.x-CX,m.y-CY)>CTR-40){const a=Math.atan2(m.y-CY,m.x-CX);m.x=CX+Math.cos(a)*(CTR-40);m.y=CY+Math.sin(a)*(CTR-40)}return false}
function ctwAI(m,dt,pl,enr,dm){if(m.t!==3)return;m.x=CX;m.y=CY}
function ctwFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='ctg'){CTFX.g.push({p:o.p||[],t0:n,d:(+o.d||1.3)*1000,x:0});return true}
  if(o.k==='ctgx'){CTFX.g=CTFX.g.filter(e=>e.x);CTFX.g.push({p:o.p||[],t0:n,d:450,x:1});try{shk=Math.max(shk,.25)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='ctrw'){CTFX.x.push({k:'rw',t0:n});return true}
  if(o.k==='ctv'){if(!isHost()||!CTWI()){const[s1,s2]=ctSpd();CT.t0=n;CT.ah=+o.ah;CT.am=+o.am;CT.ts=+o.ts||0;CT.tt=+o.tt||0;CT.lit=o.lit||[];CT.hg=+o.hg||0;CT.hgt=+o.hgt||0}return true}
  return false}
/* ---------- ฉาก ---------- */
function ctwBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let a=0;a<6.283;a+=.05)trees.push({x:CX+Math.cos(a)*(CTR+24),y:CY+Math.sin(a)*(CTR+24),r:24,inv:1,ns:1});
  for(let k=0;k<8;k++){const a=k/8*6.283+.39;trees.push({x:CX+Math.cos(a)*(CTR+90),y:CY+Math.sin(a)*(CTR+90),r:0,k:'q9gear',v:k%2,sc:.9+(k%3)*.2,ht:150,ns:1,nc:1})}}
const CTRN=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
function ctwPaint(c,ox,oy,S){q9Space(c,ox,oy,S);c.fillStyle='rgba(20,8,30,.3)';c.fillRect(ox,oy,S,S);
  c.fillStyle='rgba(0,0,0,.45)';c.beginPath();c.arc(CX+14,CY+34,CTR+30,0,7);c.fill();c.fillStyle='#2a1e14';c.beginPath();c.arc(CX,CY+20,CTR+28,0,7);c.fill();
  const rim=c.createRadialGradient(CX,CY,CTR,CX,CY,CTR+28);rim.addColorStop(0,'#8a6a32');rim.addColorStop(.5,'#e8c070');rim.addColorStop(1,'#6a4e24');c.fillStyle=rim;c.beginPath();c.arc(CX,CY,CTR+26,0,7);c.fill();
  const fc=c.createRadialGradient(CX-120,CY-140,40,CX,CY,CTR);fc.addColorStop(0,'#e6d6b0');fc.addColorStop(.6,'#cdb88c');fc.addColorStop(1,'#a88c5c');c.fillStyle=fc;c.beginPath();c.arc(CX,CY,CTR,0,7);c.fill();
  c.strokeStyle='rgba(140,110,60,.35)';c.lineWidth=2;for(const rr of[140,300,420,520]){c.beginPath();c.arc(CX,CY,rr,0,7);c.stroke()}
  for(let k=0;k<60;k++){const a=k/60*6.283,L=k%5?14:28;c.strokeStyle=k%5?'rgba(60,40,20,.5)':'#3a2a18';c.lineWidth=k%5?2:5;c.beginPath();c.moveTo(CX+Math.cos(a)*(CTR-6),CY+Math.sin(a)*(CTR-6));c.lineTo(CX+Math.cos(a)*(CTR-6-L),CY+Math.sin(a)*(CTR-6-L));c.stroke()}
  c.font='bold 46px Georgia,serif';c.textAlign='center';c.textBaseline='middle';CTMK.forEach(([x,y],k)=>{const a=k/12*6.283-1.571,tx=CX+Math.cos(a)*395,ty=CY+Math.sin(a)*395;c.fillStyle='rgba(60,40,20,.25)';c.fillText(CTRN[k],tx+3,ty+3);c.fillStyle='#3a2a18';c.fillText(CTRN[k],tx,ty);
    c.fillStyle='rgba(120,80,40,.45)';c.beginPath();c.ellipse(x,y,56,38,0,0,7);c.fill();c.strokeStyle='#8a6a32';c.lineWidth=3;c.stroke()});c.textBaseline='alphabetic';
  /* ลวดลายดาวตรงกลาง */c.strokeStyle='rgba(120,90,50,.35)';c.lineWidth=2;for(let k=0;k<8;k++){const a=k/8*6.283;c.beginPath();c.moveTo(CX,CY);c.lineTo(CX+Math.cos(a)*240,CY+Math.sin(a)*240);c.stroke()}}
function ctwDraw(){if(!CTWI())return;const T=performance.now()/1000,now=performance.now(),dt=Math.min(.1,(now-(CTLT||now))/1000);CTLT=now;g.save();
  /* ขีดทอง (หยุดเวลา) */if(CT.ts&&CT.lit.length){const pu=.6+.4*Math.sin(T*8);for(const i of CT.lit){const[x,y]=CTMK[i];g.save();g.globalCompositeOperation='lighter';glowAt(x,y,90,'255,210,110',.45*pu);g.restore();g.strokeStyle='rgba(255,230,140,'+(.7+.3*pu)+')';g.lineWidth=4;g.beginPath();g.ellipse(x,y,62,42,0,0,7);g.stroke()}}
  /* เข็มนาฬิกา */const[ah,am]=ctAng();for(const[a,w,col,L]of[[ah,CTHW*1.2,'#2a1e14',CTHL*.82],[am,CTHW,'#3a2a20',CTHL]]){g.save();g.translate(CX,CY);g.rotate(a);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(60,-w+14,L-60,w*2);
    const gr=g.createLinearGradient(0,-w,0,w);gr.addColorStop(0,'#5a4228');gr.addColorStop(.5,col);gr.addColorStop(1,'#1a120c');g.fillStyle=gr;g.beginPath();g.moveTo(40,-w*.6);g.lineTo(L-50,-w);g.lineTo(L,0);g.lineTo(L-50,w);g.lineTo(40,w*.6);g.closePath();g.fill();
    g.strokeStyle='#c89a4a';g.lineWidth=2.4;g.stroke();g.fillStyle='#c89a4a';g.beginPath();g.arc(L-90,0,w*.45,0,7);g.fill();g.restore()}
  g.fillStyle='#c89a4a';g.beginPath();g.arc(CX,CY,30,0,7);g.fill();g.fillStyle='#5a4220';g.beginPath();g.arc(CX,CY,14,0,7);g.fill();
  /* ฝนเฟือง */CTFX.g=CTFX.g.filter(e=>now-e.t0<e.d);for(const e of CTFX.g){const k=(now-e.t0)/e.d;for(const[x,y]of e.p){if(!e.x){g.fillStyle='rgba(200,120,40,'+(.12+.25*k)+')';g.beginPath();g.ellipse(x,y,70,50,0,0,7);g.fill();g.strokeStyle='rgba(255,180,90,.85)';g.lineWidth=2;g.beginPath();g.ellipse(x,y,70*k,50*k,0,0,7);g.stroke();
        if(!LOWQ){const sy=y-500*(1-k);g.save();g.translate(x,sy);g.rotate(T*6);g.fillStyle='#a8803c';g.beginPath();for(let q=0;q<8;q++){const a=q/8*6.283;g.lineTo(Math.cos(a)*14,Math.sin(a)*14);g.lineTo(Math.cos(a+.39)*10,Math.sin(a+.39)*10)}g.fill();g.restore()}}
      else{g.save();g.globalCompositeOperation='lighter';glowAt(x,y,80*(1-k*.4),'255,190,110',.7*(1-k));g.restore()}}}
  CTFX.x=CTFX.x.filter(e=>now-e.t0<1500);for(const e of CTFX.x){const k=(now-e.t0)/1500;g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(180,220,255,'+(1-k)+')';g.lineWidth=6;g.beginPath();g.arc(CX,CY,60+k*500,0,-6.283*(1-k),true);g.stroke();g.restore()}
  /* ค้างเพราะหยุดเวลา (ฝั่งตัวเอง) */const safe=CT.lit.some(i=>Math.hypot(me.x-CTMK[i][0],me.y-CTMK[i][1])<62);
  if(CT.ts===2&&me.cls&&me.down<=0&&!safe){if(!CT.fz){CT.fz=[me.x,me.y]}me.x=CT.fz[0];me.y=CT.fz[1];g.strokeStyle='rgba(170,220,255,.9)';g.lineWidth=2;for(let k=0;k<3;k++){g.beginPath();g.arc(me.x,me.y-20,22+k*6,0,7);g.stroke()}}else CT.fz=null;
  /* เตือนเหนือหัว */if(me.cls&&me.down<=0){let t='';if(CT.ts===1&&!safe)t='⏳ ไปยืนบนขีดทอง!';else if(CT.ts===2&&!safe)t='⏸️ เวลาหยุด! (ค้าง)';else if(ctOnHand(me.x,me.y,ah)||ctOnHand(me.x,me.y,am))t='🕰️ หลบเข็ม!';else if(CTFX.g.some(e=>!e.x&&e.p.some(([x,y])=>Math.hypot(me.x-x,(me.y-y)*1.4)<70)))t='⚙️ เฟืองตก! ออกจากวง';
    if(t){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,10,0,.9)';g.strokeText(t,me.x,me.y-88);g.fillStyle='#ffe8c0';g.fillText(t,me.x,me.y-88)}}
  g.restore()}
function ctwScreen(){if(!CTWI())return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const vg=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.8);vg.addColorStop(0,'rgba(20,10,30,0)');vg.addColorStop(1,'rgba(20,10,30,.42)');g.fillStyle=vg;g.fillRect(0,0,SW0,H);
  if(CT.ts===2){g.fillStyle='rgba(150,190,255,.14)';g.fillRect(0,0,SW0,H);g.strokeStyle='rgba(220,235,255,.4)';g.lineWidth=2;g.beginPath();g.arc(SW0/2,H/2,Math.min(SW0,H)*.42,0,7);g.stroke()}
  let t='';if(CT.ts===1)t='⏳ เวลากำลังจะหยุด… ไปยืนบนขีดชั่วโมงทอง';else if(CT.ts===2)t='⏸️ เวลาหยุด ('+Math.max(0,CT.tt).toFixed(1)+' วิ)';else if(CT.hg)t='⏳ นาฬิกาทราย: เหลือ '+Math.max(0,CT.hgt).toFixed(1)+' วิ ทุบให้หมด!';
  if(t){g.font='bold 15px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(20,10,0,.85)';g.strokeText(t,SW0/2,H*.26);g.fillStyle='#ffe8c0';g.fillText(t,SW0/2,H*.26)}g.restore()}
/* ---------- นาฬิกาทราย (มอน hg วาดแทน) ---------- */
function ctHgDraw(){if(!CTWI())return;const T=performance.now()/1000;for(const m of mons){if(!m.hg||m.hp<=0)continue;const x=m.x,y=m.y;g.save();g.translate(x,y-50);PALSH(0,52,30,8,.4);g.fillStyle='#8a6a32';g.fillRect(-30,-46,60,8);g.fillRect(-30,38,60,8);
  g.fillStyle='rgba(220,240,255,.35)';g.beginPath();g.moveTo(-24,-38);g.lineTo(24,-38);g.lineTo(4,0);g.lineTo(24,38);g.lineTo(-24,38);g.lineTo(-4,0);g.closePath();g.fill();g.strokeStyle='#c89a4a';g.lineWidth=2;g.stroke();
  const k=Math.max(0,CT.hgt/10);g.fillStyle='#ffd27a';g.beginPath();g.moveTo(-20*k,-38+34*(1-k));g.lineTo(20*k,-38+34*(1-k));g.lineTo(2,-2);g.lineTo(-2,-2);g.closePath();g.fill();g.beginPath();g.moveTo(-20*(1-k),38);g.lineTo(20*(1-k),38);g.lineTo(0,38-30*(1-k));g.closePath();g.fill();g.fillRect(-1,-2,2,40*(1-k));
  g.save();g.globalCompositeOperation='lighter';glowAt(0,0,40,'255,210,120',.3+.2*Math.sin(T*6));g.restore();g.restore()}}

{const f2=MV1D[432];MV1D[432]=(r,T,W,bob)=>{if(typeof MON_CUR!=='undefined'&&MON_CUR&&MON_CUR.hg)return true;return f2(r,T,W,bob)}}
/* ---------- บอส: ผู้รักษาเวลา ---------- */
BV1['ผู้รักษาเวลา']=(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.4),BR='#a8803c',BD='#6a5228',RB='#2a2240';bvShadow(60,15,.3);
  /* ลูกตุ้มแกว่งด้านหลัง */{const a=Math.sin(T*2.2)*.5;g.save();g.translate(0,-40+b);g.rotate(a);vK(W,[[0,0],[0,70]],BD,4);bvE(W,0,76,14,14,BR,1,1.4);bvAdd(W,()=>glowAt(0,76,18,'255,220,150',.4*pu));g.restore()}
  /* เสื้อคลุมยาว */vS(W,[[-30,-70+b],[30,-70+b],['q',46,-10,50,30],[-50,30],['q',-46,-10,-30,-70+b]],RB,1,1.6);vS(W,[[-12,-70+b],[12,-70+b],[16,30],[-16,30]],'#3a3058',0,1);
  for(let k=0;k<5;k++)bvDE(W,0,-56+k*16+b,2.4,2.4,'#e8c070');
  /* ไหล่ทองเหลือง + แขนสี่แขนถือเข็ม */for(const s of[-1,1]){vS(W,[[s*28,-72+b],['q',s*46,-76+b,s*48,-60+b],[s*30,-58+b]],BR,1,1);
    for(const[k,ang]of[[0,-.6-cf*.6],[1,.4+Math.sin(T*2)*.2]]){const ex=s*(40+k*6),ey=-58+k*22+b,hx=ex+s*Math.cos(ang)*26,hy=ey+Math.sin(ang)*26;vLimb(W,[s*30,-62+k*20+b,ex,ey,hx,hy],BD,9,7);
      g.save();g.translate(hx,hy);g.rotate(s>0?ang:Math.PI-ang);vS(W,[[0,-3],[k?44:60,-1],[k?52:70,0],[k?44:60,1],[0,3]],'#2a1e14',1,1);g.restore()}}
  /* หัว = หน้าปัด */const hy=-96+b;bvE(W,0,hy,24,24,BR,1,1.6);bvE(W,0,hy,19,19,'#f4ecd8',1,1);for(let k=0;k<12;k++){const a=k/12*6.283;bvDE(W,Math.cos(a)*15,hy+Math.sin(a)*15,k%3?1:1.8,k%3?1:1.8,'#3a2a20')}
  vK(W,[[0,hy],[Math.cos(-T*.8)*12,hy+Math.sin(-T*.8)*12]],'#2a1e14',2.6);vK(W,[[0,hy],[Math.cos(-T*3)*16,hy+Math.sin(-T*3)*16]],'#c8302a',1.4);bvDE(W,0,hy,2.6,2.6,BR);
  vS(W,[[-14,hy-22],[0,hy-40],[14,hy-22]],BR,1,1);bvAdd(W,()=>{glowAt(0,hy-40,16,'255,230,170',.6*pu);glowAt(0,hy,40,'255,240,200',.18*pu)});
  if(!W&&!LOWQ&&cf>0){g.save();g.globalCompositeOperation='lighter';glowAt(0,-60+b,80,'200,220,255',.25*cf);g.restore()}};
BVS['ผู้รักษาเวลา']=1.35;
function ctwReward(){if(dgRew)return;dgRew=1;const D=DT[29],st=stCur(),sto=st&&st.g==='ctw',gd=sto?D.gold:80000;CTFX={g:[],x:[]};CT.ts=0;CT.lit=[];
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?24:6));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?34:8+(Math.random()*6|0),'หอนาฬิกาดาว')}catch(e){}try{ecGive(sto?34:8+(Math.random()*5|0),'หอนาฬิกาดาว')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.45)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?18:6,'หอนาฬิกาดาว')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.ctT=Date.now();
  banner={s:'🕰️ ผู้รักษาเวลาหยุดนิ่ง! · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?24:6),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe8b0','#ffffff','#c89a4a','#bfe0ff'],140,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(CTWI())enterMap(41,ctwBack())},10000)}
function instRepeatCtw(){const l=Math.max(0,(me.ctT||0)+30*60000-Date.now());
  stSay([['lum2','ผู้รักษาเวลาซ่อมตัวเองทุกคืน… มันยังเชื่อว่าต้องเฝ้านาฬิกาไว้ จะไปหยุดมันอีกไหม?']],()=>{},{choice:[[l>0?'🕰️ หอนาฬิกาดาว (อีก '+Math.ceil(l/60000)+' นาที)':'🕰️ หอนาฬิกาดาว (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🕰️ ผู้รักษาเวลากำลังซ่อมตัวเอง · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(ctwEnter,250)}};return true}
setTimeout(()=>{
  try{DGTH[29]='harbor'}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=48000&&id<49000)return ctwMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(CTWI())return ctwStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(CTWI())return ctwSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(CTWI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return ctwReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=CTWI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(CTWI()){enterMap(41,ctwBack());sysMsg('🕰️ ถูกดีดออกจากหอนาฬิกา… คุยกับลูมิน่าเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(CTWI()){const s=CT.ts===2?' · ⏸️ หยุดเวลา':CT.ts===1?' · ⏳ ขีดทองเรือง':CT.hg?' · ⏳ นาฬิกาทราย':'';return dg.ph==='boss'||dg.ph==='run'?'🕰️ ผู้รักษาเวลา'+s+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🕰️ นาฬิกาหยุดแล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🕰️ หน้าปัดนาฬิกา · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(CTWI()){ov.hidden=true;sfx('gate');enterMap(41,ctwBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(ctwFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{ctwDraw();ctHgDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{ctwScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='ctw')return instRepeatCtw();return _ir(k)}}catch(e){}
},0);
