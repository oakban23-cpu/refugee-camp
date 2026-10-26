/* ---------- v533 ดันเจี้ยนบอสสุดท้ายภาค 8 «วาฬกลืนฟ้า» (ห้อง 47000–47999 · DT[28] · ธีมมอน 41) ----------
   ลานคือวงเรือ 6 ลำของสามเมือง + กองเรือนาวาเมฆ ล้อมตาพายุ · กลางวงเป็นแอ่งเมฆที่วาฬโผล่ขึ้นมา
   บอสหลายส่วน: หัว (บอสหลัก 14 ล้าน) · ครีบซ้าย · ครีบขวา · หาง (มอนแยก เลือดของตัวเอง)
   ดำลงเมฆ (ทุก ~20 วิ ขณะยังมีครีบ): เตือน 2 วิ → 6 วิ หัวจมหาย (เลือดไม่ลด) เมฆในแอ่งและช่องระหว่างเรือปั่นป่วน = ต้องยืนบนเรือ · ตัดครีบทั้งสองข้าง → วาฬดำไม่ได้อีก
   กลืนฟ้า (เลือด 66% · 33%): วงเพลงทอง 4 วงบนเรือ เตือน 3 วิ → ดูด 4 วิ ทุกคนที่ไม่อยู่ในวงเพลงถูกดึงเข้าหาปากวาฬ + ดาเมจหนัก
   พายุ (เลือด < 50%): วงฟ้าผ่าใต้เท้าทุกคนทุก 7 วิ · หัว: ลำแสงกลืนดาว (แนวเส้นใส่ผู้เล่น) · ครีบ: ฟาดข้างลำ · หาง: กวาดครึ่งล่างของลาน
   เลือด 75% / 40%: ฝูงสัตว์เมฆตามพายุมา · หลายคน: โฮสต์ส่งสถานะทุก 0.4 วิ (wsv) */
setTimeout(()=>{DT[28]={n:'วาฬกลืนฟ้า',lv:1,L:144,bL:22,hp:14000000,xp:1300000,g:160000,dm:78,tn:12,sm:0,rm:4,lg:1,tm:1080,gold:1200000,exp:9500000}},0);
const WSKI=()=>!!(MAPS[curMap]&&MAPS[curMap].wsk),wskBack=()=>{const N=MAPS[38]&&MAPS[38].npc;return N?{x:N.x+70,y:N.y+70}:{x:2000,y:1900}};
const WSAR=620,WSPR=225,WSSH=[0,1,2,3,4,5].map(k=>(k*60+30)*Math.PI/180),WSSP=22*Math.PI/180;
const wsAng=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
function wskIn(x,y,m){return Math.hypot(x-CX,y-CY)<WSAR-(m||0)}
function wskShip(x,y){const r=Math.hypot(x-CX,y-CY);if(r<290||r>WSAR-6)return -1;const a=Math.atan2(y-CY,x-CX);for(let k=0;k<6;k++)if(wsAng(a,WSSH[k])<WSSP)return k;return -1}
const WSPT={fl:[CX-260,CY+10],fr:[CX+260,CY+10],tl:[CX,CY+250]};
let WSK={dv:0,dt:0,nd:14,sw:0,stw:0,c:[],a66:0,a33:0,a75:0,a40:0,lt:7,fl:2,fm:0,bt:0},WSFX={b:[],s:[],t:[],l:[],x:[]},WSLT=0;
const wskReset=()=>{WSK={dv:0,dt:0,nd:14,sw:0,stw:0,c:[],a66:0,a33:0,a75:0,a40:0,lt:7,fl:2,fm:0,bt:0};WSFX={b:[],s:[],t:[],l:[],x:[]}};
const WSK_IN=[['nar','เรือหกลำจอดเทียบกันเป็นวงรอบตาพายุ… ค่ายผู้อพยพ อัสตรา อารัณยา และกองเรือนาวาเมฆ โคมทุกดวงจุดพร้อมกัน แสงสะท้อนบนผนังพายุที่หมุนวนรอบตัว'],
  ['mek','ร้องพร้อมกันนะลูก ๆ ทั้งสี่ท่อน… ให้มันได้ยินว่าเราไม่ได้มาล่า'],
  ['nar','เพลงกล่อมสี่ท่อนดังขึ้นจากเรือทุกลำ… แอ่งเมฆกลางวงเดือดพล่าน แล้วหัวขนาดเท่าเกาะทั้งเกาะก็โผล่ขึ้นมา ปากเปิดกว้าง ดวงดาวที่มันกลืนไว้ลอยวนอยู่ในลำคอ'],
  ['sara','มันหิวจนฟังเพลงไม่ได้แล้ว! ทำให้มันอ่อนแรงก่อน แล้วค่อยคุยกับมัน!'],
  ['nar','💡 วาฬดำลงเมฆ → ยืนบน «เรือ» (ไม่ใช่แอ่งเมฆหรือช่องระหว่างลำ) · ตัด «ครีบ» ทั้งสองข้างแล้ววาฬจะดำไม่ได้อีก · วาฬกลืนฟ้า → เข้า «วงเพลงทอง» บนเรือ · หางกวาดครึ่งล่าง · ต่ำกว่าครึ่ง พายุผ่าลงใต้เท้า']];
function wskMap(id){if(MAPS[id])return MAPS[id];const D=DT[28];wskReset();
  return MAPS[id]={n:'ตาพายุ · วาฬกลืนฟ้า',dg:28,wsk:1,th:41,bth:41,sx:CX,sy:CY+460,sr:0,seed:412,bg:'#3a4466',tile:'#5a4632',safe:'#6a5440',ring:'#ffe0a0',t1:'#2a2018',t2:'#5a4632',d1:'#4a5478',d2:'#e8f0ff',nests:[],
    gates:[{x:CX+60,y:CY+520,to:38,req:1,ars:1,nm:'ผาท่าเรือเมฆ (ถอยกลับ)',arr:wskBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY-40,n:'วาฬกลืนฟ้า',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:144,col:'#d8d0ff',bar:'#5a4a9a',ln:'#f4f0ff',rec:'ปาร์ตี้แนะนำ · เล่นเดี่ยวได้',pos:'กลางตาพายุ',dg:1}}}
function wskEnter(){if(!me.cls||me.down>0||isDg())return;const id=47000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🐋 เปิดศึกตาพายุ รหัส '+id+' มาช่วยกันร้องเพลงกล่อมให้วาฬกลืนฟ้า!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  wskReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX,y:CY+460});setTimeout(()=>{if(WSKI()&&dg.ph==='lobby')banner={s:'🌀 ตาพายุ · พร้อมเมื่อไหร่กด "เริ่ม" (ปาร์ตี้แนะนำ)',t:5}},700)}
function wskParts(){const D=DT[28],np=Math.max(1,plCount()),ph=D.hp*.11*(1+.3*(np-1));for(const k of['fl','fr','tl']){const[x,y]=WSPT[k],hp=k==='tl'?ph*1.2:ph;mons.push({id:++mid,x,y,tx:x,ty:y,t:0,L:D.L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,wsk:1,wsp:k,sl:0})}}
function wskAdds(n){const D=DT[28],np=Math.max(1,plCount());for(let i=0;i<n;i++){const k=Math.random()*6|0,a=WSSH[k]+rnd(-.25,.25),r=rnd(360,540),x=CX+Math.cos(a)*r,y=CY+Math.sin(a)*r,t=Math.random()<.5?0:(Math.random()<.5?1:2),hp=mhp(t,D.L)*(1.4+.25*(np-1));
    mons.push({id:++mid,x,y,tx:x,ty:y,t,L:D.L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,wsk:1})}}
function wskStart(){if(!WSKI()||dg.ph!=='lobby')return;const D=DT[28];stSay(WSK_IN,()=>{if(!WSKI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;wskReset();spawnBoss();wskParts();
  fx({k:'msg',s:'🐋 วาฬกลืนฟ้าโผล่จากตาพายุ! ครีบทั้งสองข้างกับหางฟาดเมฆเป็นคลื่น'});try{sfx('boss')}catch(e){}},{cine:1})}
/* ดาเมจจากกลไกฉาก (dgSim ทำงานก่อนโฮสต์ล้าง dmgQ) → ส่งตรง */
function wskHit(u,d){if(u===uid){WSK.hk=(WSK.hk|0)+1;try{hurt(d)}catch(e){}}else dmgOut.push([u,d])}
function wskSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  const B=mons.find(m=>m.t===3&&m.hp>0),pl=escPl(),dm=DT[28].dm/66;if(!B)return;const f=B.hp/B.mh;
  /* ครีบ */const fl=mons.filter(m=>(m.wsp==='fl'||m.wsp==='fr')&&m.hp>0).length;if(fl<WSK.fl){WSK.fl=fl;fx({k:'msg',s:fl?'✂️ ครีบข้างหนึ่งขาด! วาฬเสียหลัก':'✂️ ครีบทั้งสองข้างขาด! วาฬดำลงเมฆไม่ได้อีกแล้ว'});fx({k:'wsx',k2:'fin'})}
  /* ฝูงสัตว์เมฆ */if(f<.75&&!WSK.a75){WSK.a75=1;wskAdds(3+Math.min(3,pl.length-1));fx({k:'msg',s:'🦈 ฝูงสัตว์เมฆถูกพายุหอบมาเกาะเรือ!'})}
  if(f<.4&&!WSK.a40){WSK.a40=1;wskAdds(4+Math.min(3,pl.length-1));fx({k:'msg',s:'🦈 ฝูงสัตว์เมฆระลอกใหญ่! ปกป้องเรือไว้'})}
  /* ดำลงเมฆ */if(WSK.dv){WSK.dt-=dt;if(WSK.dv===2){if(B.hp<B.dvH)B.hp=B.dvH;WSK.tk=(WSK.tk||0)-dt;if(WSK.tk<=0){WSK.tk=.5;pl.forEach(p=>{if(wskShip(p.x,p.y)<0)wskHit(p.u,Math.round(42*dm))})}}
    if(WSK.dt<=0){if(WSK.dv===1){WSK.dv=2;WSK.dt=6;B.dvH=B.hp;fx({k:'msg',s:'🌊 วาฬดำลงเมฆ! ขึ้นเรือเดี๋ยวนี้'})}else{WSK.dv=0;WSK.nd=f<.4?15:19;fx({k:'msg',s:'🐋 วาฬโผล่กลับขึ้นมา!'})}}}
  else if(WSK.fl>0&&!WSK.sw){WSK.nd-=dt;if(WSK.nd<=0){WSK.dv=1;WSK.dt=2;fx({k:'msg',s:'⚠️ วาฬกำลังจะดำลงเมฆ… ไปยืนบนเรือ!'})}}
  /* กลืนฟ้า */if(!WSK.sw&&!WSK.dv&&((f<.66&&!WSK.a66)||(f<.33&&!WSK.a33))){if(f<.66)WSK.a66=1;if(f<.33)WSK.a33=1;WSK.sw=1;WSK.stw=3;const ks=[0,1,2,3,4,5].sort(()=>Math.random()-.5).slice(0,4);WSK.c=ks.map(k=>[Math.round(CX+Math.cos(WSSH[k])*450),Math.round(CY+Math.sin(WSSH[k])*450)]);fx({k:'wss',c:WSK.c,d:3});fx({k:'msg',s:'🌀 วาฬกลืนฟ้าสูดลมหายใจ… เข้าวงเพลงทองบนเรือ!'});try{sfx('boss')}catch(e){}}
  if(WSK.sw){WSK.stw-=dt;if(WSK.sw===2){if(B.hp<B.swH)B.hp=B.swH;WSK.tk2=(WSK.tk2||0)-dt;if(WSK.tk2<=0){WSK.tk2=.5;pl.forEach(p=>{if(!WSK.c.some(([x,y])=>Math.hypot(p.x-x,p.y-y)<84))wskHit(p.u,Math.round(55*dm))})}}
    if(WSK.stw<=0){if(WSK.sw===1){WSK.sw=2;WSK.stw=4;B.swH=B.hp;fx({k:'msg',s:'🌀 วาฬกลืนฟ้า! อยู่ในวงเพลงไว้'})}else{WSK.sw=0;WSK.c=[];fx({k:'msg',s:'🎵 เพลงกล่อมต้านแรงดูดไว้ได้!'})}}}
  /* พายุ */if(f<.5){WSK.lt-=dt;if(WSK.lt<=0){WSK.lt=f<.25?5.5:7;const P=pl.map(p=>[Math.round(p.x),Math.round(p.y)]);WSK.lp={t:1.3,p:P};fx({k:'wsl',p:P,d:1.3})}
    if(WSK.lp){WSK.lp.t-=dt;if(WSK.lp.t<=0){const P=WSK.lp.p;pl.forEach(p=>{if(P.some(([x,y])=>Math.hypot(p.x-x,(p.y-y)*1.4)<72))wskHit(p.u,Math.round(72*dm))});fx({k:'wslx',p:P});WSK.lp=null}}}
  WSK.bt-=dt;if(WSK.bt<=0){WSK.bt=.4;fx({k:'wsv',dv:WSK.dv,dt:Math.round(WSK.dt*10)/10,sw:WSK.sw,st:Math.round(WSK.stw*10)/10,c:WSK.c,fl:WSK.fl})}}
/* ครีบ/หาง: อยู่กับที่ ฟาดตามจังหวะ (ข้ามการเดินปกติ) */
function wskMon(m,dt,pl,spd){if(!WSKI())return false;
  if(m.wsp){const[x,y]=WSPT[m.wsp];m.x=x;m.y=y;m.tx=x;m.ty=y;if(!isHost()||m.stun>0||!pl.length)return true;const dm=DT[28].dm/66,B=mons.find(q=>q.t===3&&q.hp>0);if(WSK.dv===2)return true;
    if(m.sl0){m.sl0.t-=dt;if(m.sl0.t<=0){const A=m.sl0;pl.forEach(p=>{if(A.k==='tl'?(p.y>CY+110&&wskIn(p.x,p.y,0)):Math.hypot(p.x-A.x,(p.y-A.y)*1.2)<A.r)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round((A.k==='tl'?100:80)*dm)});fx({k:'wsfx',k2:A.k,x:A.x,y:A.y,r:A.r});m.sl0=null}}
    m.g1=(m.g1===undefined?(m.wsp==='tl'?9:m.wsp==='fl'?5:7):m.g1)-dt;if(m.g1<=0&&!m.sl0){if(m.wsp==='tl'){m.g1=13;m.sl0={k:'tl',t:1.8,x:CX,y:CY+300,r:0};fx({k:'wsf',k2:'tl',x:CX,y:CY+300,r:0,d:1.8});fx({k:'msg',s:'🐋 หางวาฬง้างขึ้น! ออกจากครึ่งล่างของวง'})}
      else{m.g1=8;const s=m.wsp==='fl'?-1:1,x=Math.round(CX+s*440),y=CY;m.sl0={k:m.wsp,t:1.5,x,y,r:190};fx({k:'wsf',k2:m.wsp,x,y,r:190,d:1.5})}}
    return true}
  if(!wskIn(m.x,m.y,30)){const a=Math.atan2(m.y-CY,m.x-CX);m.x=CX+Math.cos(a)*(WSAR-40);m.y=CY+Math.sin(a)*(WSAR-40)}return false}
function wskAI(m,dt,pl,enr,dm){if(m.t!==3)return;m.x=CX;m.y=CY-40;if(WSK.dv===2||WSK.sw===2||m.stun>0||!pl.length)return;
  if(m.bm){m.bm.t-=dt;if(m.bm.t<=0){const A=m.bm;pl.forEach(p=>{const dx=Math.cos(A.a),dy=Math.sin(A.a),px=p.x-A.x,py=p.y-A.y,t=px*dx+py*dy;if(t>0&&t<720&&Math.abs(px*dy-py*dx)<46)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(95*dm)});fx({k:'wsbx',x:A.x,y:A.y,a:A.a});m.bm=null}}
  m.g1=(m.g1===undefined?6:m.g1)-dt;if(m.g1<=0&&!m.bm){const f=m.hp/m.mh;m.g1=f<.4?6.5:9;const p=pl[Math.random()*pl.length|0];const a=Math.round(Math.atan2(p.y-(m.y+30),p.x-m.x)*100)/100;m.bm={t:1.4,x:m.x,y:m.y+30,a};fx({k:'wsb',x:m.x,y:m.y+30,a,d:1.4});fx({k:'msg',s:'✨ ลำแสงกลืนดาวพุ่งออกจากปากวาฬ! หลบออกจากแนว'})}}
function wskFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='wsb'){WSFX.b.push({x:+o.x,y:+o.y,a:+o.a,t0:n,d:(+o.d||1.4)*1000,x2:0});return true}
  if(o.k==='wsbx'){WSFX.b=WSFX.b.filter(e=>e.x2);WSFX.b.push({x:+o.x,y:+o.y,a:+o.a,t0:n,d:450,x2:1});try{shk=Math.max(shk,.3)}catch(e){}return true}
  if(o.k==='wsf'){WSFX.t.push({k:o.k2,x:+o.x,y:+o.y,r:+o.r,t0:n,d:(+o.d||1.5)*1000,x2:0});return true}
  if(o.k==='wsfx'){WSFX.t=WSFX.t.filter(e=>!(e.k===o.k2&&!e.x2));WSFX.t.push({k:o.k2,x:+o.x,y:+o.y,r:+o.r,t0:n,d:500,x2:1});try{shk=Math.max(shk,.35)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='wss'){WSK.c=o.c||[];if(!isHost()){WSK.sw=1;WSK.stw=+o.d||3}return true}
  if(o.k==='wsl'){WSFX.l.push({p:o.p||[],t0:n,d:(+o.d||1.3)*1000,x2:0});return true}
  if(o.k==='wslx'){WSFX.l=WSFX.l.filter(e=>e.x2);WSFX.l.push({p:o.p||[],t0:n,d:380,x2:1});try{sfx('boom')}catch(e){}return true}
  if(o.k==='wsx'){WSFX.x.push({k:o.k2,t0:n});return true}
  if(o.k==='wsv'){if(!isHost()||!WSKI()){WSK.dv=+o.dv||0;WSK.dt=+o.dt||0;WSK.sw=+o.sw||0;WSK.stw=+o.st||0;WSK.c=o.c||[];WSK.fl=+o.fl}return true}
  return false}
/* ---------- ฉาก ---------- */
function wskShipPath(c,k,pad){const a0=WSSH[k]-WSSP-pad/500,a1=WSSH[k]+WSSP+pad/500,r0=300-pad,r1=WSAR-12+pad;c.beginPath();c.arc(CX,CY,r1,a0,a1);
  const am=WSSH[k],bx=CX+Math.cos(am)*(r1+26+pad),by=CY+Math.sin(am)*(r1+26+pad);c.lineTo(bx,by);c.lineTo(CX+Math.cos(a0)*r1,CY+Math.sin(a0)*r1);c.closePath();
  c.moveTo(CX+Math.cos(a1)*r0,CY+Math.sin(a1)*r0);c.arc(CX,CY,r0,a1,a0,true);c.lineTo(CX+Math.cos(a0)*r1,CY+Math.sin(a0)*r1);c.arc(CX,CY,r1,a0,a1);c.closePath()}
const WSCOL=['#8a5a34','#6a5a8a','#5a7a9a','#7a4a3a','#4a6a5a','#8a7040'],WSSAIL=['#f4ecd8','#e8e0ff','#dceeff','#ffe8d8','#e0f4e8','#fff4d0'],WSFLAG=['🏕️','🔭','⌛','⚓','⛵','🌙'];
function wskPaint(c,ox,oy,S){try{phvCloudSea(c,ox,oy,S,4121)}catch(e){c.fillStyle='#6a7490';c.fillRect(ox,oy,S,S)}c.fillStyle='rgba(20,22,48,.55)';c.fillRect(ox,oy,S,S);
  /* ตาพายุ: เมฆหมุนเป็นวง */c.save();c.strokeStyle='rgba(200,210,240,.12)';c.lineWidth=18;for(let k=0;k<5;k++){c.beginPath();c.arc(CX,CY,WSAR+80+k*70,k*.7,k*.7+4.4);c.stroke()}c.restore();
  /* แอ่งเมฆกลาง */const gr=c.createRadialGradient(CX,CY,20,CX,CY,WSPR+60);gr.addColorStop(0,'#1a1430');gr.addColorStop(.7,'#3a3a64');gr.addColorStop(1,'rgba(90,100,140,0)');c.fillStyle=gr;c.beginPath();c.arc(CX,CY,WSPR+60,0,7);c.fill();
  c.strokeStyle='rgba(220,230,255,.18)';c.lineWidth=3;for(let k=0;k<4;k++){c.beginPath();c.arc(CX,CY,70+k*45,k,k+3.6);c.stroke()}
  /* เรือ 6 ลำ */for(let k=0;k<6;k++){c.fillStyle='rgba(10,12,30,.45)';c.save();c.translate(10,22);wskShipPath(c,k,10);c.fill('evenodd');c.restore();
    c.fillStyle='#2a1c12';wskShipPath(c,k,8);c.fill('evenodd');c.save();wskShipPath(c,k,0);c.clip('evenodd');try{phvPlanksH(c,CX-WSAR-40,CY-WSAR-40,CX+WSAR+40,CY+WSAR+40,4130+k,15)}catch(e){c.fillStyle=WSCOL[k];c.fillRect(ox,oy,S,S)}
      c.fillStyle=WSCOL[k];c.globalAlpha=.28;c.fillRect(CX-WSAR-40,CY-WSAR-40,WSAR*2+80,WSAR*2+80);c.globalAlpha=1;c.restore();
    c.strokeStyle='#e8c878';c.lineWidth=2;wskShipPath(c,k,0);c.stroke()}}
function wskBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let a=0;a<6.283;a+=.045)trees.push({x:CX+Math.cos(a)*(WSAR+22),y:CY+Math.sin(a)*(WSAR+22),r:24,inv:1,ns:1});
  for(let k=0;k<6;k++){const a=WSSH[k];trees.push({x:CX+Math.cos(a)*470,y:CY+Math.sin(a)*470,r:16,k:'wsmast',v:k,ht:300,hw:100});trees.push({x:CX+Math.cos(a+.28)*560,y:CY+Math.sin(a+.28)*560,r:6,k:'wslamp',v:k,ht:60});trees.push({x:CX+Math.cos(a-.28)*560,y:CY+Math.sin(a-.28)*560,r:6,k:'wslamp',v:k+1,ht:60})}}
Object.assign(PALK,{
 wsmast(t,T){const x=t.x,y=t.y,k=t.v|0,sw=Math.sin(T*1.8+k)*5;PALSH(x+8,y+5,24,7,.45);g.strokeStyle='#1a120c';g.lineWidth=11;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-230);g.stroke();g.strokeStyle='#5a3a24';g.lineWidth=6;g.stroke();
  g.strokeStyle='#2a1e14';g.lineWidth=4;g.beginPath();g.moveTo(x-66,y-202);g.lineTo(x+66,y-198);g.stroke();
  g.save();g.globalAlpha=Math.hypot(me.x-x,me.y-y)<160?.45:.92;g.fillStyle=WSSAIL[k];g.strokeStyle='rgba(60,40,30,.6)';g.lineWidth=1.4;g.beginPath();g.moveTo(x-60,y-200);g.quadraticCurveTo(x+sw,y-208,x+60,y-198);g.lineTo(x+54+sw,y-120);g.quadraticCurveTo(x+sw*1.4,y-106,x-54+sw,y-122);g.closePath();g.fill();g.stroke();g.restore();
  g.font='24px system-ui';g.textAlign='center';g.fillText(WSFLAG[k],x+sw*.6,y-150);
  g.fillStyle='#c8302a';g.beginPath();g.moveTo(x,y-230);g.lineTo(x+30+sw*1.4,y-224);g.lineTo(x,y-216);g.closePath();g.fill()},
 wslamp(t,T){const x=t.x,y=t.y,f=.75+.25*Math.sin(T*3+t.v);g.strokeStyle='#3a2a1c';g.lineWidth=2.4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-50);g.stroke();g.fillStyle='rgba(255,200,110,'+(.7+.3*f)+')';g.beginPath();g.ellipse(x,y-56,6,8,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y-56,30*f,'255,190,100',.5);g.restore()}});
/* ครีบ/หางวาด (มอนที่เป็นชิ้นส่วนวาดว่าง ๆ ในระบบปกติ แล้ววาดใหญ่ที่นี่) */
function wskPartDraw(m,T){const k=m.wsp,x=m.x,y=m.y,hit=m.hp/m.mh,dv=WSK.dv===2;if(dv){g.fillStyle='rgba(230,240,255,.25)';g.beginPath();g.ellipse(x,y,60,16,0,0,7);g.fill();return}
  g.save();g.translate(x,y);const SK='#4e4c78',SD='#33315a',BL='#a8a8d0';
  g.fillStyle='rgba(230,240,255,.35)';g.beginPath();g.ellipse(0,6,90,22,0,0,7);g.fill();
  if(k==='tl'){const sw=Math.sin(T*1.2)*.18;g.rotate(sw);g.fillStyle=SK;g.strokeStyle='#1a1830';g.lineWidth=2.4;g.beginPath();g.moveTo(-14,0);g.quadraticCurveTo(-18,-60,0,-90);g.quadraticCurveTo(-60,-130,-150,-118);g.quadraticCurveTo(-80,-150,0,-120);g.quadraticCurveTo(80,-150,150,-118);g.quadraticCurveTo(60,-130,0,-90);g.quadraticCurveTo(18,-60,14,0);g.closePath();g.fill();g.stroke();
    g.fillStyle=SD;g.beginPath();g.moveTo(0,-96);g.quadraticCurveTo(-70,-128,-140,-118);g.quadraticCurveTo(-70,-122,0,-104);g.fill()}
  else{const s=k==='fl'?-1:1,fl=Math.sin(T*1.5+(s>0?1:0))*.12;g.scale(s,1);g.rotate(fl);g.fillStyle=SK;g.strokeStyle='#1a1830';g.lineWidth=2.4;g.beginPath();g.moveTo(-40,0);g.quadraticCurveTo(-30,-80,40,-150);g.quadraticCurveTo(70,-170,80,-150);g.quadraticCurveTo(50,-90,60,0);g.closePath();g.fill();g.stroke();
    g.fillStyle=BL;g.beginPath();g.moveTo(40,0);g.quadraticCurveTo(36,-80,70,-148);g.quadraticCurveTo(50,-90,58,0);g.fill();for(let i=0;i<4;i++){g.strokeStyle='rgba(30,28,60,.5)';g.lineWidth=1.6;g.beginPath();g.moveTo(-26+i*18,-6);g.quadraticCurveTo(-14+i*20,-70,30+i*10,-130+i*8);g.stroke()}}
  if(!LOWQ){g.fillStyle='rgba(230,236,255,.85)';for(const[dx,dy]of[[-10,-60],[14,-90],[-4,-110],[24,-40]]){g.beginPath();g.arc(dx,dy,2.4,0,7);g.fill()}}
  if(hit<.5){g.strokeStyle='rgba(255,120,140,.7)';g.lineWidth=2;g.beginPath();g.moveTo(-10,-30);g.lineTo(10,-50);g.lineTo(0,-70);g.stroke()}g.restore()}
function wskDraw(){if(!WSKI())return;const T=performance.now()/1000,now=performance.now(),dt=Math.min(.1,(now-(WSLT||now))/1000);WSLT=now;g.save();
  /* ตัววาฬใต้แอ่ง */{const B=mons.find(m=>m.t===3&&m.hp>0);g.save();g.globalAlpha=WSK.dv===2?.12:.32;g.fillStyle='#1c1838';g.beginPath();g.ellipse(CX,CY+40,200,120,0,0,7);g.fill();g.restore()}
  /* แอ่ง/ช่องระหว่างเรือปั่นป่วนตอนดำ */if(WSK.dv){const hi=WSK.dv===2,k=hi?1:Math.max(0,1-WSK.dt/2);g.save();g.beginPath();g.arc(CX,CY,WSAR,0,7);g.clip();g.fillStyle='rgba(120,160,255,'+(hi?.38:.1+.18*k)+')';g.beginPath();g.arc(CX,CY,300,0,7);g.fill();
    for(let i=0;i<6;i++){const a=(WSSH[i]+WSSH[(i+1)%6]+(i===5?Math.PI*2:0))/2;g.beginPath();g.moveTo(CX+Math.cos(a-.15)*300,CY+Math.sin(a-.15)*300);g.arc(CX,CY,WSAR,a-.15,a+.15);g.lineTo(CX+Math.cos(a+.15)*300,CY+Math.sin(a+.15)*300);g.closePath();g.fill()}
    g.strokeStyle='rgba(220,235,255,'+(hi?.6:.3)+')';g.lineWidth=3;for(let r=40;r<300;r+=40){g.beginPath();g.arc(CX,CY,r,T*2+r,T*2+r+2.4);g.stroke()}g.restore();
    const pu=.5+.5*Math.sin(T*6);g.save();g.strokeStyle='rgba(255,236,170,'+(.45+.4*pu)+')';g.lineWidth=3;for(let i=0;i<6;i++){wskShipPath(g,i,0);g.stroke()}g.restore()}
  /* ครีบ/หาง */for(const m of mons)if(m.wsp&&m.hp>0)wskPartDraw(m,T);
  /* วงเพลง */if(WSK.sw&&WSK.c.length){const pu=.6+.4*Math.sin(T*4);for(const[x,y]of WSK.c){g.save();g.globalCompositeOperation='lighter';glowAt(x,y,100,'255,215,120',.28*pu);g.restore();g.strokeStyle='rgba(255,226,140,'+(.7+.3*pu)+')';g.lineWidth=3;g.beginPath();g.ellipse(x,y,84,60,0,0,7);g.stroke();
      g.font='18px system-ui';g.textAlign='center';g.fillStyle='rgba(255,240,190,.9)';for(let i=0;i<3;i++){const q=(T*.6+i/3)%1;g.globalAlpha=Math.sin(q*Math.PI);g.fillText(i%2?'♪':'♫',x-30+i*30,y-10-q*40)}g.globalAlpha=1}
    if(WSK.sw===2&&me.cls&&me.down<=0&&!WSK.c.some(([x,y])=>Math.hypot(me.x-x,me.y-y)<84)){const dx=CX-me.x,dy=CY-40-me.y,d=Math.hypot(dx,dy);if(d>60){const nx=me.x+dx/d*150*dt,ny=me.y+dy/d*150*dt;if(wskIn(nx,ny,20)){me.x=nx;me.y=ny}}}
    if(WSK.sw===2){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?10:26);i++){const a=i/26*6.283+T*1.6,r=(1-((T*.8+i*.05)%1))*WSAR;g.fillStyle='rgba(220,230,255,.5)';g.beginPath();g.arc(CX+Math.cos(a)*r,CY+Math.sin(a)*r,2.6,0,7);g.fill()}g.restore()}}
  /* ลำแสงกลืนดาว */WSFX.b=WSFX.b.filter(e=>now-e.t0<e.d);for(const e of WSFX.b){const k=(now-e.t0)/e.d,x1=e.x+Math.cos(e.a)*720,y1=e.y+Math.sin(e.a)*720;if(!e.x2){g.strokeStyle='rgba(200,180,255,'+(.15+.25*k)+')';g.lineWidth=92;g.lineCap='round';g.beginPath();g.moveTo(e.x,e.y);g.lineTo(x1,y1);g.stroke();g.strokeStyle='rgba(240,230,255,.85)';g.lineWidth=2;g.setLineDash([12,9]);g.beginPath();g.moveTo(e.x,e.y);g.lineTo(e.x+(x1-e.x)*k,e.y+(y1-e.y)*k);g.stroke();g.setLineDash([])}
    else{g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(220,210,255,'+(.85*(1-k))+')';g.lineWidth=60*(1-k*.5);g.lineCap='round';g.beginPath();g.moveTo(e.x,e.y);g.lineTo(x1,y1);g.stroke();g.strokeStyle='rgba(255,255,255,'+(1-k)+')';g.lineWidth=14;g.stroke();g.restore()}}
  /* ฟาดครีบ/กวาดหาง */WSFX.t=WSFX.t.filter(e=>now-e.t0<e.d);for(const e of WSFX.t){const k=(now-e.t0)/e.d;g.save();g.beginPath();g.arc(CX,CY,WSAR,0,7);g.clip();
    if(e.k==='tl'){g.fillStyle=e.x2?'rgba(255,220,220,'+(.4*(1-k))+')':'rgba(230,50,70,'+(.12+.22*k)+')';g.fillRect(CX-WSAR,CY+110,WSAR*2,WSAR);if(!e.x2){g.strokeStyle='rgba(255,140,150,.8)';g.lineWidth=2;g.setLineDash([14,10]);g.beginPath();g.moveTo(CX-WSAR,CY+110);g.lineTo(CX+WSAR,CY+110);g.stroke();g.setLineDash([])}}
    else{g.fillStyle=e.x2?'rgba(255,220,220,'+(.4*(1-k))+')':'rgba(230,50,70,'+(.12+.22*k)+')';g.beginPath();g.ellipse(e.x,e.y,e.r,e.r/1.2,0,0,7);g.fill();if(!e.x2){g.strokeStyle='rgba(255,140,150,.8)';g.lineWidth=2.4;g.beginPath();g.ellipse(e.x,e.y,e.r*k,e.r*k/1.2,0,0,7);g.stroke()}}g.restore()}
  /* ฟ้าผ่า */WSFX.l=WSFX.l.filter(e=>now-e.t0<e.d);for(const e of WSFX.l){const k=(now-e.t0)/e.d;for(const[x,y]of e.p){if(!e.x2){g.fillStyle='rgba(255,240,120,'+(.12+.25*k)+')';g.beginPath();g.ellipse(x,y,72,51,0,0,7);g.fill();g.strokeStyle='rgba(255,250,180,.9)';g.lineWidth=2;g.beginPath();g.ellipse(x,y,72*k,51*k,0,0,7);g.stroke()}
      else{g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(240,248,255,'+(1-k)+')';g.lineWidth=5;g.beginPath();let px=x,py=y-500;g.moveTo(px,py);for(let s=1;s<=7;s++){px=x+(Math.random()-.5)*40*(1-s/7);py=y-500+s*500/7;g.lineTo(px,py)}g.stroke();glowAt(x,y,90,'230,240,255',.7*(1-k));g.restore()}}}
  /* เตือนเหนือหัว */if(me.cls&&me.down<=0){let t='';if(WSK.dv&&wskShip(me.x,me.y)<0)t=WSK.dv===2?'🌊 ตกเมฆ! ขึ้นเรือ':'⚠️ วาฬจะดำ! ขึ้นเรือ';else if(WSK.sw&&!WSK.c.some(([x,y])=>Math.hypot(me.x-x,me.y-y)<84))t='🎵 เข้าวงเพลงทอง!';else if(WSFX.l.some(e=>!e.x2&&e.p.some(([x,y])=>Math.hypot(me.x-x,(me.y-y)*1.4)<72)))t='⚡ ออกจากวงฟ้าผ่า!';
    if(t){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,10,30,.9)';g.strokeText(t,me.x,me.y-88);g.fillStyle='#e8f0ff';g.fillText(t,me.x,me.y-88)}}
  g.restore()}
function wskScreen(){if(!WSKI())return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.8);gr.addColorStop(0,'rgba(20,20,50,0)');gr.addColorStop(1,'rgba(20,20,50,.42)');g.fillStyle=gr;g.fillRect(0,0,SW0,H);
  g.strokeStyle='rgba(200,215,240,.26)';g.lineWidth=1;g.beginPath();for(let k=0;k<(LOWQ?18:40);k++){const R=depRng(k*17+3),x=((R()*SW0*1.4+T*300)%(SW0+120))-60,y=((R()*H+T*860)%(H+80))-40;g.moveTo(x,y);g.lineTo(x-9,y+19)}g.stroke();
  if(WSFX.l.some(e=>e.x2&&performance.now()-e.t0<120)){g.fillStyle='rgba(240,245,255,.25)';g.fillRect(0,0,SW0,H)}
  let t='';if(WSK.dv===1)t='⚠️ วาฬกำลังจะดำลงเมฆ… ขึ้นเรือ!';else if(WSK.dv===2)t='🌊 วาฬดำลงเมฆ ('+Math.max(0,WSK.dt).toFixed(1)+' วิ) · ยืนบนเรือ';else if(WSK.sw===1)t='🌀 วาฬสูดลมหายใจ… เข้าวงเพลงทอง!';else if(WSK.sw===2)t='🌀 กลืนฟ้า! ('+Math.max(0,WSK.stw).toFixed(1)+' วิ) อยู่ในวงเพลง';
  if(t){g.font='bold 15px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(10,12,30,.85)';g.strokeText(t,SW0/2,H*.26);g.fillStyle='#d8e8ff';g.fillText(t,SW0/2,H*.26)}
  g.restore()}
/* ---------- มอนธีม 41 (ตาพายุ): ชิ้นส่วนวาฬวาดว่าง · ฝูงสัตว์เมฆใช้ภาพธีม 38 ---------- */
MV1D[410]=(r,T,W,bob)=>{if(typeof MON_CUR!=='undefined'&&MON_CUR&&MON_CUR.wsp)return true;const f=MV1D[380];return f?f(r,T,W,bob):false};
MV1D[411]=(r,T,W,bob)=>{const f=MV1D[381];return f?f(r,T,W,bob):false};
MV1D[412]=(r,T,W,bob)=>{const f=MV1D[382];return f?f(r,T,W,bob):false};
setTimeout(()=>{try{MV1S[410]=MV1S[380]||1;MV1S[411]=MV1S[381]||1;MV1S[412]=MV1S[382]||1}catch(e){}},0);
/* ---------- บอส: วาฬกลืนฟ้า (หัวโผล่จากแอ่งเมฆ) ---------- */
BV1['วาฬกลืนฟ้า']=(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.2)+.15*Math.sin(T*5),SK='#4e4c78',SD='#2e2c52',BL='#b8b8e0';
  if(typeof WSK!=='undefined'&&WSK.dv===2){if(!W){g.strokeStyle='rgba(230,240,255,.5)';g.lineWidth=3;for(let k=0;k<3;k++){g.beginPath();g.ellipse(0,20,60+k*40+Math.sin(T*3)*6,18+k*12,0,0,7);g.stroke()}}return}
  bvShadow(120,26,.3);
  /* หัว: ทรงโค้งใหญ่ ผิวม่วงเทาลายดาว */vS(W,[[-120,30+b],['q',-140,-90+b,-60,-150+b],['q',0,-180+b,60,-150+b],['q',140,-90+b,120,30+b],['q',60,50+b,0,46+b],['q',-60,50+b,-120,30+b]],SK,1,2.4);
  vD(W,[[-100,-10+b],['q',-110,-100+b,-40,-140+b],['q',0,-150+b,20,-140+b],['q',-60,-110+b,-100,-10+b]],'rgba(200,200,255,.18)');
  /* ร่องคาง */for(let k=0;k<6;k++)vK(W,[[-90+k*36,20+b],['q',-80+k*34,40+b,-72+k*32,44+b]],'rgba(20,18,40,.5)',2);
  /* ปากเปิด มีดาววนในลำคอ */const op=10+cf*16+Math.sin(T*1.4)*4;vS(W,[[-80,-10+b],['q',0,10+op+b,80,-10+b],['q',0,40+op*1.6+b,-80,-10+b]],'#120c22',1,2);
  if(!W){for(let k=0;k<9;k++){const a=T*1.4+k*.7,rx=Math.cos(a)*50,ry=10+Math.sin(a)*12;g.fillStyle='rgba(255,250,220,'+(.5+.5*Math.sin(T*3+k))+')';g.beginPath();g.arc(rx,ry+op*.6+b,2+k%3,0,7);g.fill()}}
  bvAdd(W,()=>{glowAt(0,6+op*.6+b,90,'230,220,255',.4*pu)});
  /* ตา: ใหญ่ เศร้า ใส */for(const s of[-1,1]){bvE(W,s*72,-62+b,20,16,'#eef0ff',1,1.6);vEye(W,s*72+s*-2,-60+b,10,12,'#1a1a3a',0);if(!W){g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.arc(s*72-4,-66+b,3.4,0,7);g.fill();g.strokeStyle='rgba(30,28,60,.8)';g.lineWidth=2;g.beginPath();g.moveTo(s*50,-80+b);g.quadraticCurveTo(s*72,-90+b,s*94,-78+b);g.stroke()}}
  /* ลายดาวบนหัว */if(!W){for(const[dx,dy,s]of[[-40,-120,1.2],[0,-136,1],[38,-118,1.3],[-70,-100,.8],[76,-104,.9],[10,-104,.7],[-20,-96,.6]]){g.fillStyle='rgba(235,240,255,.9)';g.beginPath();g.arc(dx,dy+b,2.4*s,0,7);g.fill()}vGlow(W,0,-110+b,120,'180,190,255',.2*pu)}
  /* รูหายใจพ่นไอ */if(!W&&!LOWQ){for(let k=0;k<5;k++){const p=(T*.7+k/5)%1;g.fillStyle='rgba(240,246,255,'+(.55*(1-p))+')';g.beginPath();g.ellipse(Math.sin(k*2)*12*p,-160+b-p*90,10+p*22,8+p*12,0,0,7);g.fill()}}
  /* เมฆรอบคอ */try{wCloud(W,0,40+b,170,40,T,'#eef2fa','#a8b4cc')}catch(e){}};
BVS['วาฬกลืนฟ้า']=1.8;
function wskReward(){if(dgRew)return;dgRew=1;const D=DT[28],st=stCur(),sto=st&&st.g==='wsk',gd=sto?D.gold:90000;WSFX={b:[],s:[],t:[],l:[],x:[]};WSK.dv=0;WSK.sw=0;WSK.c=[];mons=mons.filter(m=>!m.wsp);
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?30:8));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?40:10+(Math.random()*6|0),'ตาพายุ')}catch(e){}try{ecGive(sto?40:10+(Math.random()*5|0),'ตาพายุ')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?25:8,'ตาพายุ')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.wsT=Date.now();
  banner={s:'🐋 วาฬกลืนฟ้าหยุดดิ้น… มันกำลังฟังเพลง · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?30:8),t:8};sfx('lvl');burst(me.x,me.y-10,['#e8e0ff','#ffffff','#bfd8ff','#ffd27a'],160,320,1.8,{glow:1,g:-50});
  setTimeout(()=>{if(WSKI())enterMap(38,wskBack())},10000)}
function instRepeatWsk(){const l=Math.max(0,(me.wsT||0)+30*60000-Date.now());
  stSay([['navin','เข็มทิศเสียงชี้ไปตาพายุอีกแล้ว… ทุกครั้งที่พายุก่อตัว วาฬจะขึ้นมาหายใจ จะไปร้องเพลงให้มันฟังอีกไหม?']],()=>{},{choice:[[l>0?'🐋 ตาพายุ · วาฬกลืนฟ้า (อีก '+Math.ceil(l/60000)+' นาที)':'🐋 ตาพายุ · วาฬกลืนฟ้า (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🐋 พายุยังไม่ก่อตัว · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(wskEnter,250)}};return true}
setTimeout(()=>{
  try{DGTH[28]='harbor'}catch(e){}
  try{BTC[41]=['#eef0ff','#6a6aa8','#ffffff'];TIER[41]=TIER[39];WRG[41]=WRG[38]||{}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=47000&&id<48000)return wskMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(WSKI())return wskStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(WSKI())return wskSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(WSKI()){try{rnShard(4)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.45)}}catch(e){}return wskReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=WSKI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(WSKI()){enterMap(38,wskBack());sysMsg('🐋 กองเรือถอยออกจากตาพายุ… คุยกับกัปตันซาราเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(WSKI()){const s=WSK.dv===2?' · 🌊 ดำ':WSK.sw?' · 🌀 กลืนฟ้า':'',fn=' · ครีบ '+WSK.fl+'/2';return dg.ph==='boss'||dg.ph==='run'?'🐋 วาฬกลืนฟ้า'+fn+s+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🐋 วาฬหยุดดิ้นแล้ว… มันกำลังฟัง':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🌀 ตาพายุ · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(WSKI()){ov.hidden=true;sfx('gate');enterMap(38,wskBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(wskFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{wskDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{wskScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='wsk')return instRepeatWsk();return _ir(k)}}catch(e){}
},0);
