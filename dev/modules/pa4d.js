
/* ---------- v550 ดันเจี้ยน «รังกัดแผ่นดิน» (ห้อง 43000–43999 · DT[33]) ----------
   ใต้เท้าขวาของธรณิน: เท้าหินยักษ์ทางเหนือ (เดินทะลุไม่ได้) · แถบ «ธรณิน» 100% · วงยันเท้า 2 วง · รังไข่ทางใต้ · อุโมงค์ 4 ทาง
   2 คลื่น (ไข่ + ฝูงวิ่งไปกัดเท้า) → บอส «ราชินีกัดแผ่นดิน»: กรวยกรด (เตือน 1.1 วิ) · วางไข่ (ยืนทับ 0.8 วิ = เหยียบแตก · ฟักใน 10 วิ = ปลวก 2 ตัว)
   กัดเท้าธรณิน 6 วิ (ตีมันให้ได้ตามเกณฑ์ระหว่างกัด = ขัด + มึน 3 วิ · ยืนในวงยันเท้า = ลดการกัด) → หินร่วงทั้งรังหลังกัด · ลอกคราบ (<50%) · คลั่ง (<30%)
   ยืนในวงยันเท้าตอนไม่มีฝูงใกล้เท้า = ธรณินฟื้นช้า ๆ · แถบธรณินหมด / หมดเวลา / ทีมล้มหมด = แพ้ */
setTimeout(()=>{DT[33]={n:'รังกัดแผ่นดิน',lv:1,L:164,bL:22,hp:13500000,xp:1350000,g:160000,dm:84,tn:10,sm:2,rm:4,lg:1,tm:960,gold:1100000,exp:9800000}},0);
const PNQI=()=>!!(MAPS[curMap]&&MAPS[curMap].pnq),pnqBack=()=>({x:PZTHU.x+70,y:PZTHU.y+50});
const PNF={x:CX,y:CY-372,rx:230,ry:120},PNGN={x:CX,y:CY-196},PNBR=[[CX-262,CY-232],[CX+262,CY-232]],PNBRR=74,PNNE={x:CX,y:CY+300},PNTA=[2.95,.2,2.15,1.2];
const pnTun=()=>PNTA.map(a=>[CX+Math.cos(a)*(DR-24),CY+Math.sin(a)*(DR-24)]);
let PNQ={f:100,wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:0,gn:0,gs:'',gt:0,gh:0,gm:1,gk:1,gx:0,gy:0,eggs:[],eid:0,br:[0,0],mo:0,rk:[],hs:[],ht:0,rg:0,lt:0},PNRK=[],PNAC=[],PNHB=[],PNDU=[];const PNDC={};
const pnqReset=()=>{PNQ={f:100,wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:0,gn:0,gs:'',gt:0,gh:0,gm:1,gk:1,gx:0,gy:0,eggs:[],eid:0,br:[0,0],mo:0,rk:[],hs:[],ht:0,rg:0,lt:0};PNRK=[];PNAC=[];PNHB=[];PNDU=[]};
const pnqFootIn=(x,y,m)=>{const a=(x-PNF.x)/(PNF.rx+(m||0)),b=(y-PNF.y)/(PNF.ry+(m||0));return a*a+b*b<1};
const PNQ_IN=[['nar','รังกัดแผ่นดิน… โพรงหินใต้เท้าขวาของธรณิน ผนังเคลือบยางเหนียวเป็นมันวาว ไข่สีขาวขุ่นเรียงซ้อนกันเต็มซอก ทุกฟองเต้นตุบ ๆ เหมือนหัวใจ'],
  ['thu45','(ธุลีชี้ไปที่หินยักษ์ทางเหนือ) นั่นนิ้วเท้าของธรณิน… ดูรอยกัดสิ บางรอยลึกเท่าบ้านทั้งหลัง'],
  ['thu45','ข้างเท้ามีวงหินเก่าสองวง มีรอยมือแกะไว้เต็มเลย… ต้องเป็นบรรพบุรุษของเราที่เคยลงมายันเท้าท่านไว้แน่ ๆ'],
  ['nar','💡 ไข่ฟักใน 10 วิ → ยืนทับ 0.8 วิเพื่อเหยียบให้แตก · ฝูงจะวิ่งไปกัดเท้าธรณิน → สกัดไว้ · ผ่าน 2 คลื่นแล้วราชินีจะคลานออกจากรัง · ราชินีพุ่งไปกัดเท้า → รุมตีให้แถบขัดเต็มเพื่อให้มันปล่อย หรือเข้าไปยืนในวงยันเท้า (ลดการกัด) · กรวยกรดสีเขียว → หลบออกนอกกรวย · ยืนในวงยันเท้าตอนสงบ = ธรณินฟื้นช้า ๆ · แถบธรณินหมด = แพ้']];
function pnqMap(id){if(MAPS[id])return MAPS[id];const D=DT[33];pnqReset();
  return MAPS[id]={n:'รังกัดแผ่นดิน',dg:33,pnq:1,th:47,bth:47,sx:CX+330,sy:CY+180,sr:0,seed:471,bg:'#120c10',tile:'#3a3032',safe:'#4a3a3a',ring:'#e8d0ff',t1:'#2a2024',t2:'#4a3a3a',d1:'#2a2024',d2:'#f0e0ff',nests:[],
    gates:[{x:CX+410,y:CY+250,to:45,req:1,ars:1,nm:'ฐานแผ่นดิน',arr:pnqBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:PNNE.x,y:PNNE.y-10,n:'ราชินีกัดแผ่นดิน',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:164,col:'#f0d8a0',bar:'#8a5a2a',ln:'#fff0d0',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'จากรังทางใต้',dg:1}}}
function pnqEnter(){if(!me.cls||me.down>0||isDg())return;const id=43000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🪲 เปิดรังกัดแผ่นดิน รหัส '+id+' มาช่วยกันยันเท้าธรณิน!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  pnqReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+330,y:CY+180});setTimeout(()=>{if(PNQI()&&dg.ph==='lobby')banner={s:'🪲 รังกัดแผ่นดิน · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function pnqStart(){if(!PNQI()||dg.ph!=='lobby')return;const D=DT[33];stSay(PNQ_IN,()=>{if(!PNQI()||dg.ph!=='lobby')return;dg={ph:'run',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;pnqReset();PNQ.st='brk';PNQ.nt=4;
  fx({k:'msg',s:'🪲 เสียงเปลือกไข่แตกดังจากทุกซอก… ปกป้องเท้าของธรณิน!'});try{sfx('quest')}catch(e){}},{cine:1})}
function pnqSpawn(n,egg,x0,y0){const D=DT[33],np=Math.max(1,plCount()),pts=[];for(let i=0;i<n;i++){let x,y;if(x0!==undefined){x=x0+rnd(-22,22);y=y0+rnd(-14,14)}else{const T=pnTun()[Math.random()*4|0];x=T[0]+rnd(-26,26);y=T[1]+rnd(-26,26)}
    const t=egg?0:(Math.random()<.12+PNQ.wv*.06?2:(Math.random()<.35?1:0)),L=D.L+(PNQ.wv|0),hp=mhp(t,L)*(1+.25*(np-1))*(egg?.7:1);mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,pnq:1});if(pts.length<10)pts.push([Math.round(x),Math.round(y)])}
  if(pts.length&&x0===undefined)fx({k:'pnqtl',p:pts})}
function pnqEgg(x,y){if(PNQ.eggs.length>=12)return;const e={i:++PNQ.eid,x:Math.round(x),y:Math.round(y),t:10,c:0};PNQ.eggs.push(e);fx({k:'pnqeg',i:e.i,x:e.x,y:e.y})}
function pnqEggs(n){let k=0;for(let tr=0;tr<80&&k<n;tr++){const a=Math.random()*6.283,d=110+Math.random()*(DR-170),x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d;if(pnqFootIn(x,y,90)||Math.hypot(x-PNNE.x,y-PNNE.y)<110||PNQ.eggs.some(e=>Math.hypot(e.x-x,e.y-y)<70)||PNBR.some(([bx,by])=>Math.hypot(x-bx,y-by)<90))continue;pnqEgg(x,y);k++}}
/* หินร่วงหลังกัด: เล็งผู้เล่นทุกคน + สุ่มทั่วรัง (โฮสต์คิดดาเมจ) */
function pnqRocks(int){const pl=escPl(),np=Math.max(1,plCount()),n=5+np*2,L=[];for(const p of pl)L.push([p.x+rnd(-30,30),p.y+rnd(-20,20)]);for(let tr=0;tr<90&&L.length<n+pl.length;tr++){const a=Math.random()*6.283,d=Math.random()*(DR-60),x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d;if(pnqFootIn(x,y,20))continue;L.push([x,y])}
  const P=L.map(([x,y])=>[Math.round(x),Math.round(y)]);P.forEach(([x,y],i)=>PNQ.rk.push({x,y,t:1.5+i*.06}));fx({k:'pnqr',p:P,d:1.5});fx({k:'msg',s:int?'🪨 ราชินีสะบัดหัว… หินร่วงจากฝ่าเท้าธรณิน!':'🪨 เท้าธรณินสั่นสะท้าน… หินร่วงลงมาทั้งรัง!'})}
function pnqGnaw(m){PNQ.gn=6.9;PNQ.gs='move';PNQ.gt=0;PNQ.gx=m.x;PNQ.gy=m.y;m.tf=7.4;m.tl=[];
  /* เกณฑ์ขัด: ~3.6 วิของดาเมจเฉลี่ยของทีมใน 20 วิที่ผ่านมา (อย่างน้อย 1.2% · อย่างมาก 4% ของเลือดบอส) */const H=PNQ.hs,now=performance.now()/1000;let dps=0;if(H.length>1){const a=H[0],b=H[H.length-1];if(b[0]-a[0]>2)dps=Math.max(0,(a[1]-b[1])/(b[0]-a[0]))}
  PNQ.gk=Math.round(Math.max(m.mh*.012,Math.min(m.mh*.04,dps*3.6||m.mh*.04)));
  fx({k:'pnqg',s:'move'});fx({k:'msg',s:'🦷 ราชินีพุ่งไปกัดเท้าธรณิน! รุมตีให้มันปล่อย หรือเข้าไปยืนยันเท้าในวงทอง'})}
function pnqSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  if(PNQ.f<=0){dgEnd(0,'ธรณินทรุดลงหนึ่งเข่า… เท้าของเขาแบกต่อไม่ไหว');return}
  const pl=escPl(),B=mons.find(q=>q.t===3&&q.hp>0),dm=BS().dm*bossX(),now=performance.now()/1000;
  /* มอนเดินทะลุเท้าไม่ได้ */for(const m of mons){if(m.hp<=0||(m.t===3&&PNQ.gn>0))continue;const dx=(m.x-PNF.x)/PNF.rx,dy=(m.y-PNF.y)/PNF.ry,d=Math.hypot(dx,dy);if(d<1&&d>.001){m.x=PNF.x+dx/d*PNF.rx;m.y=PNF.y+dy/d*PNF.ry}}
  /* ไข่: เหยียบ / ฟัก */if(PNQ.eggs.length){for(const e of PNQ.eggs){e.t-=dt;const on=pl.some(p=>Math.hypot(p.x-e.x,(p.y-e.y)*1.2)<40);e.c=on?e.c+dt:Math.max(0,e.c-dt*.5);
      if(e.c>=.8){e.dead=1;fx({k:'pnqcr',i:e.i,x:e.x,y:e.y})}else if(e.t<=0){e.dead=1;pnqSpawn(2,1,e.x,e.y);fx({k:'pnqht',i:e.i,x:e.x,y:e.y})}}PNQ.eggs=PNQ.eggs.filter(e=>!e.dead)}
  /* หินร่วง (โฮสต์คิดดาเมจ) */if(PNQ.rk.length){for(const r of PNQ.rk){r.t-=dt;if(r.t<=0){r.dead=1;pl.forEach(p=>{if(Math.hypot(p.x-r.x,(p.y-r.y)*2)<58)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(70*dm)})}}PNQ.rk=PNQ.rk.filter(r=>!r.dead)}
  /* บันทึกเลือดบอส (ไว้คิดเกณฑ์ขัด) */if(B){PNQ.ht-=dt;if(PNQ.ht<=0){PNQ.ht=1;PNQ.hs.push([now,B.hp]);if(PNQ.hs.length>21)PNQ.hs.shift()}}
  /* วงยันเท้า */let nb=0;PNBR.forEach(([bx,by],i)=>{const o=pl.some(p=>Math.hypot(p.x-bx,(p.y-by)*1.3)<PNBRR)?1:0;PNQ.br[i]=o;nb+=o});
  /* กัดเท้า */if(PNQ.gn>0){PNQ.gn-=dt;PNQ.gt+=dt;
    if(!B){PNQ.gn=0;PNQ.gs=''}else if(PNQ.gn<=0&&PNQ.gs==='move'){PNQ.gn=0;PNQ.gs='';B.tf=0}
    else if(PNQ.gs==='move'){const u=Math.min(1,PNQ.gt/.9);B.x=PNQ.gx+(PNGN.x-PNQ.gx)*u;B.y=PNQ.gy+(PNGN.y-PNQ.gy)*u;B.tx=B.x;B.ty=B.y;B.tf=Math.max(B.tf||0,.4);if(u>=1){PNQ.gs='gnaw';PNQ.gh=B.hp;fx({k:'pnqg',s:'gnaw',gh:Math.round(B.hp),gk:PNQ.gk,t:+PNQ.gn.toFixed(2)})}}
    else if(PNQ.gs==='gnaw'){const mul=nb>=2?.5:nb===1?.75:1;PNQ.f=Math.max(0,PNQ.f-2.3*mul*dt);PNQ.hit=performance.now();B.tf=Math.max(B.tf||0,.4);B.x=PNGN.x;B.y=PNGN.y;B.tx=B.x;B.ty=B.y;
      if(PNQ.gh-B.hp>=PNQ.gk){PNQ.gn=0;B.tf=0;B.stun=3;PNQ.gs='';fx({k:'pnqg',s:'int'});fx({k:'msg',s:'💥 ขัดได้! ราชินีปล่อยเท้าธรณินแล้วมึนงง'});pnqRocks(1)}
      else if(PNQ.gn<=0){PNQ.gs='';PNQ.gn=0;B.tf=0;fx({k:'pnqg',s:'end'});pnqRocks(0)}}}
  else if(nb>0&&PNQ.f<100&&!mons.some(m=>m.t!==3&&m.hp>0&&pnqFootIn(m.x,m.y,170))){PNQ.f=Math.min(100,PNQ.f+.6*nb*dt)}
  if(dg.ph==='run'){const np=Math.max(1,plCount());
    if(PNQ.st==='brk'){PNQ.nt-=dt;if(PNQ.nt<=0){PNQ.wv++;dg.w=PNQ.wv;PNQ.st='wave';PNQ.q=Math.round((5+PNQ.wv*3)*(.7+.45*np));PNQ.qt=0;pnqEggs(3+PNQ.wv+Math.min(2,np-1));fx({k:'msg',s:'🥚 คลื่นที่ '+PNQ.wv+'/2 · ไข่เต้นตุบ ๆ ทั่วรัง และฝูงมุดออกจากอุโมงค์!'});try{sfx('boss')}catch(e){}}}
    else if(PNQ.st==='wave'){PNQ.qt-=dt;if(PNQ.q>0&&PNQ.qt<=0){const k=Math.min(3,PNQ.q);pnqSpawn(k);PNQ.q-=k;PNQ.qt=2.6}
      if(PNQ.q<=0&&!PNQ.eggs.length&&!mons.some(m=>m.pnq&&m.hp>0)){if(PNQ.wv>=2){dg.ph='boss';PNQ.st='boss';bossCd=1e9;spawnBoss();dg.tl+=DGBOSS;const b=BS();fx({k:'pnqtl',p:[[b.x,b.y]],big:1});fx({k:'msg',s:'👑 ทั้งรังสั่น… ราชินีกัดแผ่นดินคลานขึ้นมาจากรัง!'});try{sfx('boss')}catch(e){}}
        else{PNQ.st='brk';PNQ.nt=6;fx({k:'msg',s:'✨ คลื่นแรกผ่านไปแล้ว! ยืนในวงยันเท้าเพื่อให้ธรณินพักแรง'})}}}}
  PNQ.bt-=dt;if(PNQ.bt<=0){PNQ.bt=.4;fx({k:'pnqv',f:Math.round(PNQ.f*10)/10,wv:PNQ.wv,st:PNQ.st,br:PNQ.br.slice(),mo:PNQ.mo,gn:Math.round(PNQ.gn*10)/10,gs:PNQ.gs,gh:Math.round(PNQ.gh),gk:PNQ.gk,e:PNQ.eggs.map(e=>[e.i,e.x,e.y,Math.round(e.t*10)/10,Math.round(e.c*100)/100])})}}
/* ฝูงในรัง: ปลวก/ร่างรากวิ่งไปกัดเท้าธรณิน (ถ้ามีผู้เล่นใกล้ 140 จะหันมาสู้) · แมงกะพรุนสู้ปกติ */
function pnqMon(m,dt,pl,spd){if(!PNQI()||(dg.ph!=='run'&&dg.ph!=='boss')||m.t===1)return false;for(const p of pl)if(Math.hypot(p.x-m.x,p.y-m.y)<140)return false;
  if(m.gk===undefined)m.gk=(Math.random()-.5)*320;const tx=PNF.x+m.gk,ty=PNF.y+PNF.ry*Math.sqrt(Math.max(0,1-(m.gk/PNF.rx)**2))+24,d=Math.hypot(tx-m.x,ty-m.y);
  if(d>30){moveTo(m,tx,ty,spd*1.1*dt);return true}
  if(m.ac<=0){m.ac=1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();PNQ.f=Math.max(0,PNQ.f-(m.t===2?.8:.5));PNQ.hit=performance.now()}return true}
/* ท่าบอส (โฮสต์) */
function pnqAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,sp=(PNQ.mo?.82:1)*(enr?.85:1);
  if(f<.5&&!PNQ.mo){PNQ.mo=1;fx({k:'pnqmo',x:Math.round(m.x),y:Math.round(m.y)});fx({k:'msg',s:'🪲 ราชินีลอกคราบ! เปลือกใหม่ยังนิ่ม แต่มันเร็วขึ้น'});pnqSpawn(2,1,m.x,m.y)}
  if(m.ac2){m.ac2.t-=dt;if(m.ac2.t<=0){const A=m.ac2;pl.forEach(p=>{const dx=p.x-A.x,dy=p.y-A.y,d=Math.hypot(dx,dy);if(d<A.r&&Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-A.a),Math.cos(Math.atan2(dy,dx)-A.a)))<A.w)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(105*dm)});fx({k:'pnqas',x:A.x,y:A.y,a:+A.a.toFixed(3),r:A.r,w:A.w});m.ac2=null}}
  if(m.stun>0||m.inv||PNQ.gn>0)return;
  m.w1=(m.w1===undefined?5:m.w1)-dt;if(m.w1<=0&&!m.ac2&&pl.length){m.w1=(enr?7:9)*sp;const p=pl[(Math.random()*pl.length)|0],a=Math.atan2(p.y-m.y,p.x-m.x);m.ac2={t:1.1,x:Math.round(m.x),y:Math.round(m.y),a,r:340,w:.44};fx({k:'pnqa',x:m.ac2.x,y:m.ac2.y,a:+a.toFixed(3),r:340,w:.44,dur:1.1});fx({k:'msg',s:'🟢 ราชินีง้างคอ… กรดกำลังมา! หลบออกนอกกรวยสีเขียว'})}
  m.w3=(m.w3===undefined?8:m.w3)-dt;if(m.w3<=0){m.w3=(enr?10:14)*sp;pnqEggs((enr?4:3)+(pl.length>2?1:0));fx({k:'msg',s:'🥚 ราชินีวางไข่! ไปยืนทับให้แตกก่อนฟัก'})}
  m.w2=(m.w2===undefined?16:m.w2)-dt;if(m.w2<=0&&!m.ac2){m.w2=(enr?14:20)*sp;pnqGnaw(m)}}
function pnqFx(o){if(!o)return false;const n=performance.now(),own=isHost()&&PNQI();
  if(o.k==='pnqtl'){(o.p||[]).forEach(p=>PNDU.push({x:+p[0],y:+p[1],t0:n,big:o.big?1:0}));if(PNDU.length>30)PNDU.splice(0,PNDU.length-30);return true}
  if(o.k==='pnqeg'){if(!own&&!PNQ.eggs.some(e=>e.i===o.i))PNQ.eggs.push({i:o.i,x:+o.x,y:+o.y,t:10,c:0});PNHB.push({x:+o.x,y:+o.y,t0:n,k:'lay'});return true}
  if(o.k==='pnqcr'){if(!own)PNQ.eggs=PNQ.eggs.filter(e=>e.i!==o.i);PNHB.push({x:+o.x,y:+o.y,t0:n,k:'cr'});try{sfx('hit')}catch(e){}return true}
  if(o.k==='pnqht'){if(!own)PNQ.eggs=PNQ.eggs.filter(e=>e.i!==o.i);PNHB.push({x:+o.x,y:+o.y,t0:n,k:'ht'});try{sfx('ek_growl')}catch(e){}return true}
  if(o.k==='pnqa'){PNAC.push({x:+o.x,y:+o.y,a:+o.a,r:+o.r,w:+o.w,t0:n,d:(+o.dur||1.1)*1000,s:0});if(PNAC.length>8)PNAC.shift();return true}
  if(o.k==='pnqas'){PNAC.push({x:+o.x,y:+o.y,a:+o.a,r:+o.r,w:+o.w,t0:n,d:750,s:1});if(PNAC.length>8)PNAC.shift();try{shk=Math.max(shk,.25)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='pnqr'){(o.p||[]).forEach((p,i)=>PNRK.push({x:+p[0],y:+p[1],t0:n+i*60,d:(+o.d||1.5)*1000}));if(PNRK.length>40)PNRK.splice(0,PNRK.length-40);return true}
  if(o.k==='pnqg'){if(o.s==='move'){if(!own){PNQ.gn=6.9;PNQ.gs='move'}try{sfx('ek_growl')}catch(e){}}
    else if(o.s==='gnaw'){if(!own){PNQ.gs='gnaw';PNQ.gn=+o.t||6;PNQ.gh=+o.gh||0;PNQ.gk=+o.gk||1}try{shk=Math.max(shk,.32)}catch(e){}try{sfx('boom')}catch(e){}}
    else{if(!own){PNQ.gn=0;PNQ.gs=''}if(o.s==='int'){PNHB.push({x:PNGN.x,y:PNGN.y,t0:n,k:'int'});try{sfx('lvl')}catch(e){}}}return true}
  if(o.k==='pnqmo'){PNHB.push({x:+o.x,y:+o.y,t0:n,k:'mo'});try{shk=Math.max(shk,.4)}catch(e){}if(!own)PNQ.mo=1;return true}
  if(o.k==='pnqv'){if(!own){const f=+o.f;if(f<PNQ.f-.05)PNQ.hit=n;PNQ.f=f;PNQ.wv=o.wv|0;PNQ.st=o.st;PNQ.br=Array.isArray(o.br)?o.br:[0,0];PNQ.mo=o.mo|0;const gn=+o.gn||0;if(gn<=0)PNQ.gn=0;else if(!(PNQ.gn>0)||Math.abs(PNQ.gn-gn)>.5)PNQ.gn=gn;PNQ.gs=o.gs||'';PNQ.gh=+o.gh||0;PNQ.gk=+o.gk||1;
      if(Array.isArray(o.e)){const M=new Map(PNQ.eggs.map(e=>[e.i,e]));PNQ.eggs=o.e.map(a=>{const e=M.get(a[0])||{i:a[0]};e.x=+a[1];e.y=+a[2];e.t=+a[3];e.c=+a[4];return e})}}return true}
  return false}
/* ---------- ฉาก ---------- */
function pnqPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1,cg=(x,y,r,col,a)=>{if(!inB(x-r,y-r,x+r,y+r))return;const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  c.fillStyle='#0e0a0c';c.fillRect(ox,oy,S,S);
  {const R=gxRng(5521);for(let i=0;i<110;i++){const a=R()*6.2832,d=DR+50+R()*520,x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,r=40+R()*100,v=R();if(!inB(x-r,y-r,x+r,y+r))continue;const gr=c.createRadialGradient(x-r*.3,y-r*.35,4,x,y,r);gr.addColorStop(0,v<.5?'#2e2628':'#241c1e');gr.addColorStop(1,'rgba(14,10,12,0)');c.fillStyle=gr;c.beginPath();c.arc(x,y,r,0,7);c.fill()}}
  c.save();c.beginPath();c.arc(CX,CY,DR+24,0,7);c.clip();
  {const gr=c.createRadialGradient(CX,CY-120,60,CX,CY,DR+30);gr.addColorStop(0,'#40363a');gr.addColorStop(.6,'#30282c');gr.addColorStop(1,'#201a1c');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  /* แผ่นหินพื้นแตกเป็นเหลี่ยม */palGrid(ox,oy,X1,Y1,96,72,1,(x,y,i,j)=>{const h=palH(i,j,5522),px=x+palH(j,i,5523)*70,py=y+palH(i,j,5524)*50,s=26+h*30;c.fillStyle=h<.4?'rgba(16,12,14,.26)':h<.75?'rgba(110,96,96,.16)':'rgba(70,60,62,.2)';c.beginPath();for(let q=0;q<6;q++){const a=q/6*6.2832+h,rr=s*(.75+palH(q,i+j,5525)*.4);c.lineTo(px+Math.cos(a)*rr,py+Math.sin(a)*rr*.55)}c.closePath();c.fill();c.strokeStyle='rgba(12,8,10,.4)';c.lineWidth=1.2;c.stroke()});
  /* คราบยางรังมันวาว */{const R=gxRng(5526);for(let i=0;i<18;i++){const a=R()*6.2832,d=R()*(DR-60),x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d*.9+90,r=30+R()*70,rot=R();if(!inB(x-r,y-r,x+r,y+r)||pnqFootIn(x,y,40))continue;c.fillStyle='rgba(120,78,30,.2)';c.beginPath();c.ellipse(x,y,r,r*.42,rot,0,7);c.fill();c.fillStyle='rgba(255,200,120,.08)';c.beginPath();c.ellipse(x-r*.2,y-r*.1,r*.4,r*.12,0,0,7);c.fill()}}
  /* ช่องรวงรอบรัง (หกเหลี่ยม) */for(let ring=1;ring<=3;ring++){const n=ring*8;for(let k=0;k<n;k++){const a=k/n*6.2832+ring*.2,d=150+ring*58,x=PNNE.x+Math.cos(a)*d,y=PNNE.y+Math.sin(a)*d*.55;if(Math.hypot(x-CX,y-CY)>DR-30||!inB(x-30,y-20,x+30,y+20))continue;const s=24-ring*2;
    c.fillStyle='rgba(40,26,14,.55)';c.beginPath();for(let q=0;q<6;q++){const b=q/6*6.2832;c.lineTo(x+Math.cos(b)*s,y+Math.sin(b)*s*.55)}c.closePath();c.fill();c.strokeStyle='rgba(170,120,60,.45)';c.lineWidth=2;c.stroke();if(palH(k,ring,5527)<.3){c.fillStyle='rgba(235,225,200,.55)';c.beginPath();c.ellipse(x,y-2,s*.42,s*.3,0,0,7);c.fill()}}}
  /* รากจากผนังพุ่งเข้าหาเท้า */for(let k=0;k<9;k++){const a=-Math.PI/2+(k-4)*.34,sx=CX+Math.cos(a)*(DR+20),sy=CY+Math.sin(a)*(DR+20)+(Math.abs(k-4)>2?60:0),ex=PNF.x+(k-4)*46,ey=PNF.y+PNF.ry*.7,mx=(sx+ex)/2+(palH(k,1,5528)-.5)*80,my=(sy+ey)/2+40;if(!inB(Math.min(sx,ex)-40,Math.min(sy,ey)-40,Math.max(sx,ex)+40,Math.max(sy,ey)+80))continue;
    for(const[lw,col,o]of[[22,'rgba(8,4,2,.4)',5],[16,'#3a2616',0],[8,'#5e4228',-2],[2,'rgba(230,190,140,.2)',-5]]){c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';c.beginPath();c.moveTo(sx,sy+o);c.quadraticCurveTo(mx,my+o,ex,ey+o);c.stroke()}}
  /* รอยร้าวเรืองแดงแผ่ออกจากหน้าเท้า */{const R=gxRng(5529);for(let k=0;k<7;k++){let x=PNF.x+(k-3)*64,y=PNF.y+PNF.ry+10;const P=[[x,y]];for(let q=0;q<6;q++){x+=(R()-.5)*50;y+=16+R()*26;P.push([x,y])}if(!P.some(([px,py])=>inB(px-20,py-20,px+20,py+20)))continue;
    c.strokeStyle='rgba(14,6,4,.9)';c.lineWidth=3.4;c.beginPath();P.forEach(([px,py],q)=>q?c.lineTo(px,py):c.moveTo(px,py));c.stroke();c.strokeStyle='rgba(255,120,50,.55)';c.lineWidth=1.2;c.stroke();for(const[px,py]of P)cg(px,py,12,'255,110,40',.1)}}
  /* วงยันเท้า: วงหินแกะ มีรอยมือของบรรพบุรุษ */PNBR.forEach(([x,y],i)=>{if(!inB(x-90,y-50,x+90,y+50))return;c.fillStyle='rgba(10,8,8,.4)';c.beginPath();c.ellipse(x,y+4,PNBRR+8,(PNBRR+8)*.44,0,0,7);c.fill();c.fillStyle='#4e4446';c.beginPath();c.ellipse(x,y,PNBRR,PNBRR*.44,0,0,7);c.fill();c.strokeStyle='#2a2224';c.lineWidth=3;c.stroke();
    c.strokeStyle='rgba(220,200,170,.25)';c.lineWidth=2;c.beginPath();c.ellipse(x,y,PNBRR-12,(PNBRR-12)*.44,0,0,7);c.stroke();
    for(let k=0;k<6;k++){const a=k/6*6.2832+i,hx=x+Math.cos(a)*PNBRR*.6,hy=y+Math.sin(a)*PNBRR*.26;c.fillStyle='rgba(20,14,14,.55)';c.beginPath();c.ellipse(hx,hy,7,4.4,a,0,7);c.fill();for(let f=0;f<4;f++){const fa=a-.9+f*.6;c.beginPath();c.ellipse(hx+Math.cos(fa)*8,hy+Math.sin(fa)*4.6,2,1.4,fa,0,7);c.fill()}}
    cg(x,y,PNBRR,'255,200,120',.08)});
  /* รัง: หลุมยางเหนียว ไข่ซ้อนกัน */if(inB(PNNE.x-200,PNNE.y-110,PNNE.x+200,PNNE.y+110)){const{x,y}=PNNE,R=gxRng(5530);c.fillStyle='rgba(8,4,2,.5)';c.beginPath();c.ellipse(x,y+8,170,74,0,0,7);c.fill();
    c.fillStyle='#5a3a1c';c.beginPath();c.ellipse(x,y,158,66,0,0,7);c.fill();c.fillStyle='rgba(255,190,110,.18)';c.beginPath();c.ellipse(x-20,y-24,110,14,0,0,7);c.fill();
    c.fillStyle='#140a06';c.beginPath();c.ellipse(x,y+6,124,48,0,0,7);c.fill();
    for(let k=0;k<26;k++){const a=R()*6.2832,rr=Math.sqrt(R()),ex=x+Math.cos(a)*100*rr,ey=y+8+Math.sin(a)*36*rr,s=8+R()*5;c.fillStyle='#e8e0cc';c.beginPath();c.ellipse(ex,ey,s,s*.7,0,0,7);c.fill();c.fillStyle='rgba(160,140,110,.5)';c.beginPath();c.ellipse(ex+1,ey+2,s*.8,s*.4,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.6)';c.beginPath();c.ellipse(ex-s*.3,ey-s*.25,s*.3,s*.15,0,0,7);c.fill()}
    cg(x,y+4,120,'255,170,80',.16)}
  /* เปลือกไข่แตก */{const R=gxRng(5531);for(let i=0;i<44;i++){const a=R()*6.2832,d=60+R()*(DR-90),x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,s=3+R()*5,an=R()*3;if(!inB(x-8,y-8,x+8,y+8)||pnqFootIn(x,y,20))continue;c.fillStyle='rgba(230,220,196,.6)';c.beginPath();c.moveTo(x,y);c.lineTo(x+s,y-s*.4);c.lineTo(x+s*.6,y+s*.5);c.closePath();c.fill()}}
  c.restore();
  /* ผนังโพรง */c.strokeStyle='#1a1214';c.lineWidth=36;c.beginPath();c.arc(CX,CY,DR+30,0,7);c.stroke();c.strokeStyle='#3a3032';c.lineWidth=10;c.beginPath();c.arc(CX,CY,DR+16,0,7);c.stroke();c.strokeStyle='rgba(210,190,170,.18)';c.lineWidth=2;c.beginPath();c.arc(CX,CY,DR+11,0,7);c.stroke();
  {const R=gxRng(5532);for(let i=0;i<70;i++){const a=R()*6.2832,d=DR+14+R()*26,x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,s=8+R()*16,v=R();if(!inB(x-s,y-s,x+s,y+s))continue;c.fillStyle=v<.5?'#342a2c':'#443a3a';c.beginPath();c.ellipse(x,y,s,s*.66,0,0,7);c.fill();c.fillStyle='rgba(220,200,180,.13)';c.beginPath();c.ellipse(x-s*.25,y-s*.3,s*.5,s*.22,0,0,7);c.fill()}}}
/* เท้าขวาของธรณิน (แคชสไปรต์): หน้าแข้งพุ่งขึ้นไปในความมืด · ฝ่าเท้าหินกว้าง · นิ้วเท้า 4 ก้อน · รากพัน · รอยกัด */
function pnqFootSpr(){if(PNDC.f)return PNDC.f;const W=700,Hh=860,bx=350,by=790,cv=document.createElement('canvas');cv.width=W;cv.height=Hh;const c=cv.getContext('2d'),R=gxRng(5540);c.translate(bx,by);c.lineJoin='round';c.lineCap='round';
  const bould=(x,y,rx,ry,rot,c1,c2)=>{c.save();c.translate(x,y);c.rotate(rot);const gr=c.createRadialGradient(-rx*.35,-ry*.4,rx*.1,0,0,Math.max(rx,ry));gr.addColorStop(0,c1);gr.addColorStop(1,c2);c.fillStyle=gr;c.beginPath();c.ellipse(0,0,rx,ry,0,0,7);c.fill();c.strokeStyle='#140e0c';c.lineWidth=2.4;c.stroke();c.restore()};
  const crack=(x,y,L,a,w)=>{c.strokeStyle='rgba(14,8,6,.85)';c.lineWidth=w;c.beginPath();c.moveTo(x,y);let px=x,py=y;for(let k=0;k<5;k++){a+=(R()-.5)*.9;px+=Math.cos(a)*L/5;py+=Math.sin(a)*L/5;c.lineTo(px,py)}c.stroke()};
  const root=(P,w,col)=>{for(const[lw,cl,o]of[[w+5,'rgba(8,4,2,.5)',3],[w,col,0],[w*.3,'rgba(230,190,140,.22)',-w*.25]]){c.strokeStyle=cl;c.lineWidth=lw;c.beginPath();P.forEach(([x,y],k)=>k?c.lineTo(x,y+o):c.moveTo(x,y+o));c.stroke()}};
  /* เงาบนพื้นหน้าเท้า */{const gr=c.createRadialGradient(0,10,20,0,10,320);gr.addColorStop(0,'rgba(0,0,0,.55)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.beginPath();c.ellipse(0,10,320,70,0,0,7);c.fill()}
  /* หน้าแข้ง */const sh=()=>{c.beginPath();c.moveTo(-150,-150);c.bezierCurveTo(-160,-360,-136,-600,-128,-790);c.lineTo(128,-790);c.bezierCurveTo(136,-600,160,-360,150,-150);c.closePath()};
  sh();{const gr=c.createLinearGradient(-160,0,160,0);gr.addColorStop(0,'#3a3430');gr.addColorStop(.3,'#6e6458');gr.addColorStop(.55,'#5a5248');gr.addColorStop(1,'#26221e');c.fillStyle=gr;c.fill();c.strokeStyle='#120c0a';c.lineWidth=3;c.stroke()}
  c.save();sh();c.clip();for(let k=0;k<12;k++){const y=-180-k*52;c.strokeStyle='rgba(16,10,8,.35)';c.lineWidth=3;c.beginPath();c.moveTo(-170,y);c.quadraticCurveTo(0,y+14,170,y);c.stroke();c.strokeStyle='rgba(230,210,180,.08)';c.lineWidth=1.6;c.beginPath();c.moveTo(-170,y-3);c.quadraticCurveTo(0,y+11,170,y-3);c.stroke()}
    for(let k=0;k<6;k++)crack(-110+R()*220,-200-R()*500,60+R()*80,-1.6+(R()-.5),2+R()*2);
    for(let k=0;k<10;k++){const x=-130+R()*260,y=-180-R()*560,s=10+R()*22;c.fillStyle='rgba(76,120,56,.6)';c.beginPath();c.ellipse(x,y,s,s*.45,0,0,7);c.fill()}
    /* รอยกัดบนหน้าแข้ง */for(const[x,y,s]of[[-60,-240,1],[70,-300,.8],[-20,-380,.7],[40,-200,.6]]){c.fillStyle='rgba(206,180,140,.3)';c.beginPath();c.ellipse(x,y,30*s,17*s,0,0,7);c.fill();c.fillStyle='#0c0705';c.beginPath();for(let q=0;q<=40;q++){const t=q/40*6.2832,k=1+(Math.sin(t)<0?.2*Math.abs(Math.sin(t*5)):.05);c.lineTo(x+Math.cos(t)*25*s*k,y+Math.sin(t)*12*s*k)}c.closePath();c.fill()}
  c.restore();
  /* ฝ่าเท้า (มองจากหน้า-บน): หินกว้างแผ่ลงพื้น */const ft=()=>{c.beginPath();c.moveTo(-170,-200);c.bezierCurveTo(-250,-190,-280,-110,-262,-40);c.quadraticCurveTo(-250,-6,-200,-4);c.lineTo(200,-4);c.quadraticCurveTo(250,-6,262,-40);c.bezierCurveTo(280,-110,250,-190,170,-200);c.quadraticCurveTo(0,-230,-170,-200);c.closePath()};
  ft();{const gr=c.createLinearGradient(0,-220,0,0);gr.addColorStop(0,'#7a6e60');gr.addColorStop(.5,'#5e5448');gr.addColorStop(1,'#3a332c');c.fillStyle=gr;c.fill();c.strokeStyle='#120c0a';c.lineWidth=3;c.stroke()}
  c.save();ft();c.clip();for(let k=0;k<5;k++){const y=-190+k*38;c.strokeStyle='rgba(16,10,8,.3)';c.lineWidth=2.4;c.beginPath();c.moveTo(-280,y);c.quadraticCurveTo(0,y+16,280,y);c.stroke()}for(let k=0;k<5;k++)crack(-200+R()*400,-180+R()*120,50+R()*50,R()*6,2);
    for(let k=0;k<8;k++){const x=-220+R()*440,y=-190+R()*120,s=12+R()*20;c.fillStyle='rgba(76,120,56,.6)';c.beginPath();c.ellipse(x,y,s,s*.4,0,0,7);c.fill();c.fillStyle='rgba(170,220,120,.3)';c.beginPath();c.ellipse(x-s*.2,y-s*.1,s*.45,s*.15,0,0,7);c.fill()}c.restore();
  /* ข้อเท้า: ก้อนหินนูน */bould(-150,-190,46,34,.2,'#7a6e60','#3a332c');bould(150,-196,50,36,-.2,'#6e6458','#2e2822');
  /* นิ้วเท้า 4 ก้อน */for(const[x,w,h,y]of[[-178,58,46,-30],[-62,62,50,-22],[56,60,48,-24],[168,54,44,-32]]){bould(x,y,w,h,0,'#8a7e6e','#3a332c');c.fillStyle='rgba(210,196,170,.35)';c.beginPath();c.ellipse(x-w*.1,y-h*.45,w*.5,h*.2,0,0,7);c.fill();c.strokeStyle='rgba(20,14,10,.5)';c.lineWidth=1.6;c.beginPath();c.ellipse(x,y-h*.35,w*.62,h*.3,0,.2,2.9);c.stroke()}
  /* รากพันข้อเท้าแล้วแผ่ลงพื้น */for(let k=0;k<10;k++){const s=k%2?1:-1,x0=s*(110+R()*40),y0=-300-R()*200,ex=s*(220+R()*120),ey=-10+R()*30;root([[x0,y0],[x0+s*20,(y0+ey)*.55],[ex,ey]],5+R()*7,k%3?'#3e2a18':'#4e3420')}
  for(let k=0;k<4;k++){const x=-120+k*80+(R()-.5)*30;root([[x,-232],[x+(R()-.5)*30,-120],[x+(R()-.5)*60,-60]],4+R()*3,'#3a2616')}
  /* ด้านบนจางหายในความมืด */c.globalCompositeOperation='destination-out';{const fg=c.createLinearGradient(0,-790,0,-480);fg.addColorStop(0,'rgba(0,0,0,1)');fg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=fg;c.fillRect(-W,-800,W*2,330)}c.globalCompositeOperation='source-over';
  return PNDC.f={cv,bx,by}}
/* รอยกัดบนนิ้วเท้า (เพิ่มตามความเสียหาย) */const PNBITE=[[-62,-36,1],[56,-40,.9],[-178,-44,.8],[168,-46,.8],[0,-120,1.1],[-120,-150,.9],[120,-150,.9],[-60,-170,.7]];
const PNTHU=['ยันไว้! ข้าอยู่ตรงนี้!','อย่าให้มันกัดอีก!','ไข่! ตรงนั้นมีไข่!','ธรณินเจ็บ… ข้ารู้สึกได้ผ่านรากเลย','ทุกคนข้างบนกำลังดึงเชือกอยู่นะ สู้ต่อ!'];
Object.assign(PALK,{
 pnqfoot(t,T){const S=pnqFootSpr(),x=t.x,y=t.y,now=performance.now(),hit=now-PNQ.hit<240,sh=hit?Math.sin(T*80)*1.6:0,dmg=1-Math.max(0,PNQ.f)/100;g.drawImage(S.cv,x-S.bx+sh,y-S.by);
  const nb=Math.min(PNBITE.length,Math.ceil(dmg*PNBITE.length*1.1));for(let k=0;k<nb;k++){const[bx,by,s]=PNBITE[k],px=x+bx+sh,py=y+by;g.fillStyle='rgba(206,180,140,.3)';g.beginPath();g.ellipse(px,py,22*s,11*s,0,0,7);g.fill();g.fillStyle='#0c0705';g.beginPath();for(let q=0;q<=32;q++){const a=q/32*6.2832,kk=1+(Math.sin(a)<0?.22*Math.abs(Math.sin(a*5)):.05);g.lineTo(px+Math.cos(a)*18*s*kk,py+Math.sin(a)*8*s*kk)}g.closePath();g.fill()}
  g.save();g.globalCompositeOperation='lighter';const pu=.55+.45*Math.sin(T*2.4);for(let k=0;k<nb;k++){const[bx,by,s]=PNBITE[k];glowAt(x+bx+sh,y+by+2,20*s,'255,130,50',(.35+.3*pu)*(.5+dmg*.5))}if(PNQ.gn>0&&PNQ.gs==='gnaw')glowAt(PNGN.x,PNGN.y-50,90,'255,90,40',.25+.15*Math.sin(T*16));g.restore();
  const k=Math.max(0,PNQ.f)/100,bw=150,byy=y-150;g.fillStyle='rgba(20,12,8,.8)';g.beginPath();g.roundRect(x-bw/2-3,byy-3,bw+6,11,5);g.fill();g.fillStyle=k>.5?'#d8c8a0':k>.25?'#e0b030':'#e04a3a';g.beginPath();g.roundRect(x-bw/2,byy,bw*k,5,2.5);g.fill();if(hit){g.fillStyle='rgba(255,120,80,.6)';g.beginPath();g.roundRect(x-bw/2,byy,bw*k,5,2.5);g.fill()}
  g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.9)';const lb='🗿 ธรณิน · '+Math.ceil(Math.max(0,PNQ.f))+'%';g.strokeText(lb,x,byy-6);g.fillStyle=k>.25?'#f0e4c8':'#ffb0a0';g.fillText(lb,x,byy-6)},
 pnqtun(t,T){const x=t.x,y=t.y,wv=PNQ.st==='wave'||PNQ.st==='boss',pu=.5+.5*Math.sin(T*3+t.v);PALSH(x,y+10,70,22,.35);
  for(const[dx,dy,r,cl]of[[-46,6,24,'#4a3e3e'],[44,4,26,'#463a3a'],[-20,-16,22,'#524646'],[24,-18,20,'#4e4242'],[0,16,26,'#403436']]){g.fillStyle=cl;g.beginPath();g.ellipse(x+dx,y+dy,r,r*.55,0,0,7);g.fill();g.fillStyle='rgba(220,200,190,.1)';g.beginPath();g.ellipse(x+dx-r*.2,y+dy-r*.2,r*.5,r*.18,0,0,7);g.fill()}
  g.fillStyle='#080406';g.beginPath();g.ellipse(x,y-2,36,16,0,0,7);g.fill();g.fillStyle='rgba(170,120,60,.4)';g.beginPath();g.ellipse(x,y-12,30,6,0,Math.PI,0);g.fill();
  if(wv){for(let q=0;q<2;q++){const ex=x-12+q*22+Math.sin(T*.7+q)*3,ey=y-3;if(Math.sin(T*2.3+q*1.7+t.v)<-.85)continue;g.fillStyle='rgba(255,190,90,.95)';g.fillRect(ex-3.4,ey-1,2.6,2);g.fillRect(ex+1.4,ey-1,2.6,2)}g.save();g.globalCompositeOperation='lighter';glowAt(x,y-2,40,'200,140,255',.1+.1*pu);g.restore()}},
 pnqthu(t,T){const x=t.x,y=t.y,f=me.x<x?-1:1;try{NPC3[43].d(x,y,f,T)}catch(e){try{thuD0(x,y,f,T)}catch(e2){}}npvLbl('ธุลี',x,y-46,'#c8f0a8');if(dg.ph==='run'||dg.ph==='boss'){try{npcSay('pnqthu',x,y,PNTHU,260,52)}catch(e){}}}});
function pnqBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  for(const[dx,dy,r]of[[-170,-350,80],[-85,-332,90],[0,-326,94],[85,-332,90],[170,-350,80],[-230,-420,60],[230,-420,60]])trees.push({x:CX+dx,y:CY+dy,r,inv:1,ns:1});
  trees.push({x:CX,y:CY-252,r:0,k:'pnqfoot',ht:800,hw:360,ns:1,nc:1});try{pnqFootSpr()}catch(e){}
  PNTA.forEach((a,i)=>trees.push({x:CX+Math.cos(a)*(DR-16),y:CY+Math.sin(a)*(DR-16),r:0,k:'pnqtun',v:i,ht:40,ns:1,nc:1}));
  trees.push({x:CX-350,y:CY-150,r:0,k:'pnqthu',ht:60,ns:1,nc:1});
  const R=gxRng(5550),dA=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b))),okA=a=>PNTA.every(b=>dA(a,b)>.32)&&dA(a,-Math.PI/2)>.75&&dA(a,.55)>.3;
  for(let i=0,n=0;i<300&&n<10;i++){const a=R()*6.2832,d=DR-40-R()*30,v=(R()*3)|0,sc=.55+R()*.4;if(!okA(a))continue;const x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d;if(trees.some(t=>t.k==='pzcry'&&Math.hypot(t.x-x,t.y-y)<110))continue;trees.push({x,y,r:10,k:'pzcry',v,sc,ht:80,hw:30});n++}
  for(let i=0,n=0;i<300&&n<8;i++){const a=R()*6.2832,d=DR-30-R()*40;if(!okA(a))continue;trees.push({x:CX+Math.cos(a)*d,y:CY+Math.sin(a)*d,r:0,k:'pzpod',v:i,sc:.7+R()*.4,ht:60,ns:1,nc:1});n++}
  for(let i=0,n=0;i<300&&n<10;i++){const a=R()*6.2832,d=DR-26-R()*50,v=(R()*4)|0,sc=.7+R()*.5;if(!okA(a))continue;trees.push({x:CX+Math.cos(a)*d,y:CY+Math.sin(a)*d,r:0,k:'pbshroom',v,sc,ht:24,nc:1,ns:1});n++}}
/* ---------- ชั้นพื้น (ใต้ตัวละคร): วงยันเท้า · ไข่ · กรวยกรด · วงหินร่วง · ฝุ่น ---------- */
function pnqGround(){if(!PNQI())return;const T=performance.now()/1000,now=performance.now(),dtf=Math.min(.1,(now-(PNQ.lt||now))/1000);PNQ.lt=now;const own=isHost();if(!own){if(PNQ.gn>0)PNQ.gn=Math.max(0,PNQ.gn-dtf);for(const e of PNQ.eggs)e.t=Math.max(0,(e.t||0)-dtf)}g.save();
  const gnw=PNQ.gn>0&&PNQ.gs==='gnaw';
  PNBR.forEach(([x,y],i)=>{if(!palVis(x,y,100))return;const on=PNQ.br[i],pu=.5+.5*Math.sin(T*(gnw?9:3)+i);g.strokeStyle=on?'rgba(255,230,150,.95)':gnw?'rgba(255,200,110,'+(.5+.4*pu)+')':'rgba(255,214,140,'+(.3+.2*pu)+')';g.lineWidth=on?4:2.6;g.setLineDash(on?[]:[11,8]);g.beginPath();g.ellipse(x,y,PNBRR,PNBRR*.44,0,0,7);g.stroke();g.setLineDash([]);
    if(on||gnw){g.save();g.globalCompositeOperation='lighter';glowAt(x,y,PNBRR,'255,210,120',on?.22:.1*pu);g.restore()}
    if(on){g.strokeStyle='rgba(255,220,150,.55)';g.lineWidth=3;g.setLineDash([6,8]);g.lineDashOffset=-T*30;g.beginPath();g.moveTo(x,y-10);g.quadraticCurveTo((x+PNF.x)/2,y-80,PNF.x+(x<PNF.x?-170:170),PNF.y+40);g.stroke();g.setLineDash([])}
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.85)';const lb=on?(gnw?'🤲 ยันไว้! (ลดการกัด)':'🤲 ยันเท้า · ธรณินพักแรง'):'🤲 วงยันเท้า';g.strokeText(lb,x,y+PNBRR*.44+16);g.fillStyle=on?'#ffe8b0':'#e8d8b8';g.fillText(lb,x,y+PNBRR*.44+16)});
  /* กรวยกรด */PNAC=PNAC.filter(e=>now-e.t0<e.d);for(const e of PNAC){const k=(now-e.t0)/e.d;if(!e.s){g.fillStyle='rgba(150,230,60,'+(.08+.2*k)+')';g.beginPath();g.moveTo(e.x,e.y);g.arc(e.x,e.y,e.r,e.a-e.w,e.a+e.w);g.closePath();g.fill();g.strokeStyle='rgba(190,255,90,'+(.5+.4*k)+')';g.lineWidth=2.4;g.stroke();
      g.strokeStyle='rgba(230,255,160,.8)';g.lineWidth=3;g.beginPath();g.arc(e.x,e.y,e.r*k,e.a-e.w,e.a+e.w);g.stroke()}
    else{g.fillStyle='rgba(130,210,40,'+(.38*(1-k))+')';g.beginPath();g.moveTo(e.x,e.y);g.arc(e.x,e.y,e.r,e.a-e.w,e.a+e.w);g.closePath();g.fill();const R=gxRng((e.x*3+e.y)|0);for(let q=0;q<(LOWQ?6:16);q++){const a=e.a+(R()-.5)*e.w*2,d=e.r*(.2+R()*.8);g.fillStyle='rgba(170,240,70,'+(.7*(1-k))+')';g.beginPath();g.ellipse(e.x+Math.cos(a)*d,e.y+Math.sin(a)*d,5+R()*7,3+R()*3,0,0,7);g.fill()}}}
  /* วงหินร่วง */PNRK=PNRK.filter(r=>now-r.t0<r.d+500);for(const r of PNRK){const k=(now-r.t0)/r.d;if(k<0)continue;if(k<1){g.strokeStyle='rgba(255,220,150,'+(.4+.5*k)+')';g.lineWidth=2.2;g.beginPath();g.ellipse(r.x,r.y,54,22,0,0,7);g.stroke();g.fillStyle='rgba(0,0,0,'+(.15+.35*k)+')';g.beginPath();g.ellipse(r.x,r.y,42*k+6,16*k+3,0,0,7);g.fill()}
    else{const q=(k-1)*2;g.fillStyle='rgba(110,96,90,'+(.6*(1-q))+')';g.beginPath();g.ellipse(r.x,r.y,30+q*40,12+q*14,0,0,7);g.fill()}}
  /* ไข่ */for(const e of PNQ.eggs){if(!palVis(e.x,e.y,60))continue;const t=Math.max(0,e.t||0),urg=t<3,pu=.5+.5*Math.sin(T*(urg?14:5)+e.i),sw=urg?Math.sin(T*30+e.i)*1.4:0;PALSH(e.x,e.y+6,22,7,.4);
    g.fillStyle='#e8e0cc';g.beginPath();g.ellipse(e.x+sw,e.y-12,15,20,0,0,7);g.fill();g.strokeStyle='rgba(110,90,60,.7)';g.lineWidth=1.4;g.stroke();
    g.fillStyle='rgba(200,140,255,'+(.15+.25*pu)+')';g.beginPath();g.ellipse(e.x+sw,e.y-10,9,13,0,0,7);g.fill();g.strokeStyle='rgba(120,80,60,.5)';g.lineWidth=1;g.beginPath();g.moveTo(e.x+sw-8,e.y-20);g.quadraticCurveTo(e.x+sw-2,e.y-12,e.x+sw-6,e.y-2);g.moveTo(e.x+sw+7,e.y-24);g.quadraticCurveTo(e.x+sw+2,e.y-14,e.x+sw+8,e.y-4);g.stroke();
    if(t<5){g.strokeStyle='rgba(30,14,8,.8)';g.lineWidth=1.4;g.beginPath();g.moveTo(e.x+sw-4,e.y-30);g.lineTo(e.x+sw+1,e.y-22);g.lineTo(e.x+sw-3,e.y-16);g.stroke()}
    g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.ellipse(e.x+sw-5,e.y-20,3.6,5,-.3,0,7);g.fill();
    /* เวลาฟัก */const p=t/10;g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=4;g.beginPath();g.ellipse(e.x,e.y+4,26,10,0,0,7);g.stroke();g.strokeStyle=urg?'rgba(255,110,80,.95)':'rgba(220,180,255,.9)';g.lineWidth=2.6;g.beginPath();g.ellipse(e.x,e.y+4,26,10,0,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke();
    if(e.c>0){const q=Math.min(1,e.c/.8);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(e.x,e.y-46,10,0,7);g.stroke();g.strokeStyle='#ffd06a';g.lineWidth=3.2;g.beginPath();g.arc(e.x,e.y-46,10,-Math.PI/2,-Math.PI/2+q*6.283);g.stroke()}
    else{g.font='12px system-ui';g.textAlign='center';g.fillText(urg?'⚠️':'🥚',e.x,e.y-40+Math.sin(T*4+e.i)*2)}}
  /* ไข่แตก / ฟัก / ขัด / ลอกคราบ */PNHB=PNHB.filter(e=>now-e.t0<(e.k==='mo'?1600:900));for(const e of PNHB){const k=(now-e.t0)/(e.k==='mo'?1600:900),R=gxRng((e.x*7+e.y+e.t0)|0);
    if(e.k==='lay'){g.strokeStyle='rgba(220,190,255,'+(.7*(1-k))+')';g.lineWidth=2;g.beginPath();g.ellipse(e.x,e.y,10+k*30,4+k*12,0,0,7);g.stroke();continue}
    if(e.k==='int'){g.strokeStyle='rgba(255,240,180,'+(.9*(1-k))+')';g.lineWidth=5*(1-k)+1;g.beginPath();g.ellipse(e.x,e.y,30+k*160,12+k*60,0,0,7);g.stroke();continue}
    if(e.k==='mo'){for(let q=0;q<(LOWQ?6:14);q++){const a=R()*6.2832,v=40+R()*130;g.fillStyle='rgba(210,180,120,'+(.8*(1-k))+')';g.beginPath();g.ellipse(e.x+Math.cos(a)*v*k,e.y+Math.sin(a)*v*k*.5-Math.sin(k*Math.PI)*40,8+R()*10,4+R()*4,a,0,7);g.fill()}continue}
    for(let q=0;q<(LOWQ?5:10);q++){const a=R()*6.2832,v=20+R()*50,h=Math.sin(Math.min(1,k*1.4)*Math.PI)*(14+R()*20);g.fillStyle=e.k==='cr'?'rgba(240,230,210,'+(1-k)+')':'rgba(200,160,255,'+(1-k)+')';g.beginPath();g.moveTo(e.x+Math.cos(a)*v*k,e.y+Math.sin(a)*v*k*.5-h);g.lineTo(e.x+Math.cos(a)*v*k+5,e.y+Math.sin(a)*v*k*.5-h-3);g.lineTo(e.x+Math.cos(a)*v*k+2,e.y+Math.sin(a)*v*k*.5-h+4);g.closePath();g.fill()}
    if(e.k==='cr'){g.fillStyle='rgba(180,230,120,'+(.5*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y,22+k*10,8+k*4,0,0,7);g.fill()}}
  /* ฝุ่นตอนฝูงมุดขึ้น */PNDU=PNDU.filter(e=>now-e.t0<1300);for(const e of PNDU){const k=(now-e.t0)/1300,s=e.big?2.6:1;g.fillStyle='rgba(110,90,80,'+(.5*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y,(18+k*44)*s,(8+k*18)*s,0,0,7);g.fill();g.strokeStyle='rgba(220,200,180,'+(.6*(1-k))+')';g.lineWidth=2;g.beginPath();g.ellipse(e.x,e.y,(22+k*50)*s,(10+k*21)*s,0,0,7);g.stroke()}
  /* รังเรือง */if(palVis(PNNE.x,PNNE.y,180)){g.save();g.globalCompositeOperation='lighter';glowAt(PNNE.x,PNNE.y+4,140,'255,170,80',.08+.05*Math.sin(T*1.4));g.restore()}
  g.restore()}
/* ---------- ชั้นบน: หินที่กำลังร่วง · แถบขัด · ป้ายเตือน ---------- */
function pnqDraw(){if(!PNQI())return;const T=performance.now()/1000,now=performance.now(),B=mons.find(q=>q.t===3&&q.hp>0);g.save();
  for(const r of PNRK){const k=(now-r.t0)/r.d;if(k<0||k>=1)continue;const yy=r.y-(1-k)*(1-k)*480-14,s=10+((r.x+r.y)%6);g.globalAlpha=Math.min(1,k*3);g.fillStyle='#5a5250';g.beginPath();g.ellipse(r.x,yy,s*1.2,s,k*4,0,7);g.fill();g.strokeStyle='#1a1416';g.lineWidth=1.2;g.stroke();g.fillStyle='rgba(220,200,190,.3)';g.beginPath();g.ellipse(r.x-s*.3,yy-s*.35,s*.5,s*.25,0,0,7);g.fill()}g.globalAlpha=1;
  if(B&&PNQ.gn>0&&PNQ.gs==='gnaw'){const p=Math.max(0,Math.min(1,(PNQ.gh-B.hp)/Math.max(1,PNQ.gk))),x=B.x,y=B.y-150,w=120;g.fillStyle='rgba(20,10,8,.85)';g.beginPath();g.roundRect(x-w/2-3,y-3,w+6,12,6);g.fill();g.fillStyle='#ffd040';g.beginPath();g.roundRect(x-w/2,y,w*p,6,3);g.fill();
    g.font='bold 12px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,10,6,.9)';const lb='🦷 กำลังกัดเท้าธรณิน! รุมตีเพื่อขัด · '+Math.max(0,PNQ.gn).toFixed(1)+' วิ';g.strokeText(lb,x,y-8);g.fillStyle='#ffd8a0';g.fillText(lb,x,y-8)}
  {const inC=PNAC.some(e=>!e.s&&Math.hypot(me.x-e.x,me.y-e.y)<e.r&&Math.abs(Math.atan2(Math.sin(Math.atan2(me.y-e.y,me.x-e.x)-e.a),Math.cos(Math.atan2(me.y-e.y,me.x-e.x)-e.a)))<e.w);if(inC&&me.cls){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,30,6,.9)';g.strokeText('🟢 ออกจากกรวยกรด!',me.x,me.y-70);g.fillStyle='#d8ff90';g.fillText('🟢 ออกจากกรวยกรด!',me.x,me.y-70)}}
  g.restore()}
function pnqScreen(){if(!PNQI())return;const T=performance.now()/1000,bs=PNQ.st==='boss',gnw=PNQ.gn>0&&PNQ.gs==='gnaw',low=PNQ.f<30;g.save();g.setTransform(DPR,0,0,DPR,0,0);const c=gnw||low?'70,16,8':bs?'40,20,30':'14,10,14',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.76);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(gnw?.32+.1*Math.sin(T*8):low?.3+.08*Math.sin(T*3):.32)+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);
  const n=LOWQ?10:22;for(let i=0;i<n;i++){const R=depRng(i*59+3),x=(R()*SW0+Math.sin(T*.3+i)*12+SW0)%SW0,y=((R()*H+T*(12+R()*18))%(H+10))-5;g.fillStyle='rgba(200,180,160,'+(.14+.18*R())+')';g.fillRect(x,y,1.5,1.5)}g.restore()}
function pnqReward(){if(dgRew)return;dgRew=1;const D=DT[33],st=stCur(),sto=st&&st.g==='pnq',gd=sto?D.gold:95000;PNAC=[];PNRK=[];PNQ.eggs=[];
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?28:7));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?50:12+(Math.random()*6|0),'รังกัดแผ่นดิน')}catch(e){}try{ecGive(sto?30:8+(Math.random()*5|0),'รังกัดแผ่นดิน')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});if(sto)drops.push({x:me.x,y:me.y-20,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?20:6,'รังกัดแผ่นดิน')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.pnT=Date.now();
  banner={s:'👑 ราชินีกัดแผ่นดินล้มแล้ว! ธรณินเหลือ '+Math.ceil(Math.max(0,PNQ.f))+'% · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?28:7),t:8};sfx('lvl');burst(me.x,me.y-10,['#f0e4c8','#ffffff','#ffc860','#c8b0ff'],150,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(PNQI())enterMap(45,pnqBack())},10000)}
function instRepeatPnq(){const l=Math.max(0,(me.pnT||0)+30*60000-Date.now());
  stSay([['thu45','ลูกฝูงที่เหลือยังแอบวางไข่อยู่ใต้เท้าธรณินทุกคืน… เราลงไปเหยียบไข่กันอีกไหม?']],()=>{},{choice:[[l>0?'🪲 ลงรังอีกครั้ง (อีก '+Math.ceil(l/60000)+' นาที)':'🪲 รังกัดแผ่นดิน (หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🪲 รังยังเงียบอยู่ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(pnqEnter,250)}};return true}
setTimeout(()=>{
  try{DGTH[33]='base'}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=43000&&id<44000)return pnqMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(PNQI())return pnqStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(PNQI())return pnqSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(PNQI()){try{rnShard(4)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.4)}}catch(e){}return pnqReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=PNQI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(PNQI()){enterMap(45,pnqBack());sysMsg('🪲 ฝูงกัดแผ่นดินดันพวกเราออกจากรัง… คุยกับธุลีเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(PNQI()){const f=Math.ceil(Math.max(0,PNQ.f));return dg.ph==='run'?'🗿 ธรณิน '+f+'% · '+(PNQ.st==='wave'?'คลื่น '+PNQ.wv+'/2':'พักคลื่น')+' · 🥚 '+PNQ.eggs.length+' · ⏱ '+fmtT(dg.tl):dg.ph==='boss'?'👑 ราชินีกัดแผ่นดิน · 🗿 '+f+'% · 🥚 '+PNQ.eggs.length+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🗿 เท้าธรณินรอดแล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🪲 รังใต้เท้าธรณิน · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(PNQI()){ov.hidden=true;sfx('gate');enterMap(45,pnqBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(pnqFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _vg=vmGround;window.vmGround=vmGround=function(){try{pnqGround()}catch(e){}return _vg.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{pnqDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{pnqScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='pnq')return instRepeatPnq();return _ir(k)}}catch(e){}
},0);
