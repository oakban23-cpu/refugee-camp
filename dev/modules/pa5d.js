
/* ---------- v551 ดันเจี้ยนสุดท้าย «ฐานฟ้า» (ห้อง 44000–44999 · DT[34]) ----------
   บนฝ่ามือของธรณินที่ยันฐานแผ่นดิน · แถบ «แผ่นดินทรุด» (เริ่ม 35% · ถึง 100% = แพ้) · วงยก 3 วง (ตะวันตก · ตะวันออก · ใต้)
   วงที่มีคนยืน (ผู้เล่นหรือพันธมิตร) = ยกแผ่นดิน · เศษความล้านั่งทับ = วงนั้นยกไม่ได้ · ถูกกระซิบจนจบ = วงดับ 6 วิ
   พันธมิตรลงมาทีละกลุ่มทุก 22 วิ ตามคำมั่นในบทที่ 3 (ผลต่างกันตามทางเลือกเก่า):
     ค่าย (ประจำวงใต้) · อารัณยา (ประจำวงตะวันตก) · อัสตรา e6 · คาร์น p7m · กองเรือ p8g · วาฬดาว e8 · ห้วงดาว e9 · หอคอย e · รากพิภพ e4
   บอส «เงาผู้แบก» (ความสิ้นหวังของธรณิน): น้ำหนักสามร้อยปี (ทับตามตัว 2 วิ · อยู่ในวงยก = รับครึ่ง ไม่ทรุด) · กระซิบให้ปล่อย 4 วิ (ตีถึงเกณฑ์ = ขัด)
   · เศษความล้า (เดินไปนั่งทับวงยก) · เลือด <33% ความสิ้นหวังหนักสุด (ทรุดเร็วขึ้น) */
setTimeout(()=>{DT[34]={n:'ฐานฟ้า',lv:1,L:168,bL:22,hp:16000000,xp:1600000,g:200000,dm:86,tn:4,sm:0,rm:4,lg:1,tm:1200,gold:1800000,exp:12500000}},0);
const PFNI=()=>!!(MAPS[curMap]&&MAPS[curMap].pfn),pfnBack=()=>({x:PZTHU.x+60,y:PZTHU.y+60});
const PFC=[[CX-300,CY+40],[CX+300,CY+40],[CX,CY+330]],PFCR=78,PFB={x:CX,y:CY-180};
/* พันธมิตร 9 กลุ่ม: [คีย์ทางเลือก, ชื่อ, ไอคอน 1, ผล 1, ไอคอน 2, ผล 2, มุมที่ยืนขอบลาน, แบบคน] */
const PFAL=[[null,'ชาวค่าย','🏕️','ชาวค่ายผู้อพยพลงมาถึง! เรนน์พาทุกคนเข้าประจำวงยกทางใต้','🏕️','ชาวนครลี้ภัยลงมาถึง! เรนน์พาทุกคนเข้าประจำวงยกทางใต้',1.85,4],
  ['e7','อารัณยา','🧶','ยายเอดาผูกเชือกลายเฟืองตะวันกับวงยกตะวันตก · วงนี้ยกเองตลอด','🧶','ยายเอดาห่มผ้าทอลายเฟืองตะวันให้วงยกตะวันตก · วงนี้ยกเองตลอด',2.9,3],
  ['e6','อัสตรา','🏮','ช่างแก้วดาวแขวนโคมเหนือวงยก · ยืนในวงยก = ฟื้นเลือด','🛡️','องครักษ์ดาวเฝ้าวงยก · เศษความล้าที่เข้าใกล้วงจะถูกแทง',-2.55,0],
  ['p7m','คาร์น','🛒','รางเหมืองของบรอม! รถเข็นแร่พุ่งชนเงาทุก 15 วิ','⛏️','สหกรณ์คาร์นขุดร่องระบายน้ำหนัก · แผ่นดินยกขึ้น 8% และทรุดช้าลง',-.6,1],
  ['p8g','กองเรือ','💣','เรือดำของกริฟยิงปืนใหญ่ลงมาตามเชือกทุก 18 วิ','🪏','ลูกเรือที่วางดาบหยิบพลั่ว เข้าประจำวงยกตะวันออก',.25,5],
  ['e8','วาฬดาว','🐋','เพลงวาฬดาวดังลงมา · เศษความล้าหยุดนิ่งทุก 20 วิ','⛓️','โซ่ดาวของโอเรียนรัดเงาผู้แบก! (มึน 4 วิ · รัดซ้ำทุก 12 วิ)',1.25,2],
  ['e9','ห้วงดาว','🪞','กระจกโอเรียนส่องลำแสงดาวใส่เงาทุก 16 วิ','🕸️','ด้ายดาวดึงแผ่นดินขึ้น 10% · วงยกแรงขึ้น',-1.95,0],
  ['e','หอคอย','🔩','ผู้เฝ้าหอคอยคลายหมุดทีละตัว · แผ่นดินเบาลงทุก 10 วิ','🔩','หมุดฐานหอคอยทั้งร้อยถูกถอน · แผ่นดินยกขึ้น 12%',-1.3,1],
  ['e4','รากพิภพ','🌱','เมล็ดหัวใจของเทพโปรยลงมา · ทุกคนฟื้นเลือดเต็ม','✨','ยางทองไหลถึงมือธรณิน · ธรณินมีแรงยกเอง และวงยกตะวันออกยกเอง',.75,-1]];
const pfV=k=>{if(!k)return((me.sty&&me.sty.e7)===2)?2:1;const v=me.sty&&me.sty[k];return v===2?2:1};
let PFN={},PFFX=[],PFWT=[],PFDU=[];const PFDC={},PFFW={};
const pfnReset=()=>{PFN={s:35,al:[],av:[],at:10,man:[0,0,0],dis:0,ws:0,wg:0,wk:1,wt:[],hs:[],ht:0,pr:0,cs:[0,0,0],cart:null,ct:4,cn:6,wh:8,ch:0,bm:5,tw:10,gd:3,bt:0,lt:0,red:0,str:1,ph:0,card:null};PFFX=[];PFWT=[];PFDU=[]};pfnReset();
const pfHas=(i,v)=>{const k=PFN.al.indexOf(i);return k>=0&&PFN.av[k]===v};
const PFN_IN=[['nar','ธุลีพาปีนขึ้นมาตามนิ้วของธรณิน… จนถึงฝ่ามือหินที่กว้างเท่าลานค่าย เหนือหัวคือฐานแผ่นดินทั้งผืน ใกล้จนได้ยินเสียงรากข้างบนลั่นเหมือนเชือกที่ตึงจนสุด'],
  ['nar','กลางฝ่ามือ เงาดำที่ไหลออกจากรอยร้าวของธรณินรวมตัวเป็น «เงาผู้แบก» มันก้มหน้าแบกแผ่นหินแตกไว้บนหลัง แล้วกระซิบด้วยเสียงเดียวกับธรณิน «วางลงเถิด… วางลงเถิด…»'],
  ['cmd','(เรนน์ปักธงค่ายลงบนฝ่ามือหิน) ทุกคนฟัง! ใครยืนในวงยกได้ ยืน! ใครถือดาบได้ ฟันเงานั่น! วันนี้ไม่มีใครแบกคนเดียว!'],
  ['thu45','คนจากเมืองอื่นกำลังไต่ลงมาตามเชือก… อดทนไว้ก่อนนะ พวกเขามาแน่ ๆ!'],
  ['nar','💡 แถบ «แผ่นดินทรุด» ถึง 100% = แพ้ · ยืนในวงยกสีทอง = ยกแผ่นดิน (ยิ่งหลายวงยิ่งยกเร็ว) · เศษความล้านั่งทับวงยก = วงนั้นยกไม่ได้ ไล่มันออก · วงม่วงรอบเงา = กำลังกระซิบ รุมตีให้แถบขัดเต็ม ไม่งั้นวงยกดับ 6 วิ · หินตกตามตัว = รีบเข้าวงยก ให้วงรับน้ำหนักแทน · พันธมิตรจะลงมาทีละกลุ่มตามคำมั่นที่เจ้าขอไว้']];
function pfnMap(id){if(MAPS[id])return MAPS[id];const D=DT[34];pfnReset();
  return MAPS[id]={n:'ฐานฟ้า',dg:34,pfn:1,th:47,bth:47,sx:CX,sy:CY+170,sr:0,seed:481,bg:'#08060c',tile:'#5a524a',safe:'#6a6056',ring:'#ffe8c0',t1:'#2a2420',t2:'#5a524a',d1:'#3a322a',d2:'#fff0d0',nests:[],
    gates:[{x:CX+150,y:CY+440,to:45,req:1,ars:1,nm:'ฐานแผ่นดิน',arr:pfnBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:PFB.x,y:PFB.y,n:'เงาผู้แบก',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:168,col:'#e8d8ff',bar:'#5a3a8a',ln:'#fff0d0',rec:'ปาร์ตี้แนะนำ · เล่นเดี่ยวได้',pos:'กลางฝ่ามือธรณิน',dg:1}}}
function pfnEnter(){if(!me.cls||me.down>0||isDg())return;const id=44000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🌍 เปิดฐานฟ้า รหัส '+id+' มาช่วยกันแบกแผ่นดิน!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  pfnReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX,y:CY+170});setTimeout(()=>{if(PFNI()&&dg.ph==='lobby')banner={s:'🌍 ฐานฟ้า · พร้อมเมื่อไหร่กด "เริ่ม" (ปาร์ตี้แนะนำ · เล่นเดี่ยวได้)',t:5}},700)}
function pfnStart(){if(!PFNI()||dg.ph!=='lobby')return;const D=DT[34];stSay(PFN_IN,()=>{if(!PFNI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;pfnReset();spawnBoss();
  fx({k:'msg',s:'🌍 ธรณินคลายมือ… แผ่นดินกำลังทรุด! เข้าวงยกแล้วช่วยกันแบก'});try{sfx('boss')}catch(e){}},{cine:1})}
function pfnFrag(n){const D=DT[34],np=Math.max(1,plCount()),pts=[];for(let i=0;i<n;i++){const a=Math.random()*6.283,x=CX+Math.cos(a)*(DR-40),y=CY+Math.sin(a)*(DR-40),hp=mhp(2,D.L)*(1+.25*(np-1))*.8;
    mons.push({id:++mid,x,y,tx:x,ty:y,t:2,L:D.L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,pfn:1});pts.push([Math.round(x),Math.round(y)])}if(pts.length)fx({k:'pfndu',p:pts})}
function pfnWhisper(m){PFN.ws=4;PFN.wg=m.hp;const H=PFN.hs;let dps=0;if(H.length>1){const a=H[0],b=H[H.length-1];if(b[0]-a[0]>2)dps=Math.max(0,(a[1]-b[1])/(b[0]-a[0]))}
  PFN.wk=Math.round(Math.max(m.mh*.012,Math.min(m.mh*.035,dps*2.6||m.mh*.035)));m.tf=4.4;m.tl=[];fx({k:'pfnws',s:'start',wg:Math.round(m.hp),wk:PFN.wk});fx({k:'msg',s:'🌑 เงาผู้แบกกระซิบ «วางลงเถิด…» รุมตีให้แถบขัดเต็มก่อนวงยกดับ!'})}
function pfnAlly(i,B){const A=PFAL[i],v=pfV(A[0]);PFN.al.push(i);PFN.av.push(v);
  if(i===0)PFN.man[2]=1;if(i===1)PFN.man[0]=1;
  if(i===3&&v===2){PFN.s=Math.max(0,PFN.s-8);PFN.red+=.1}
  if(i===4&&v===2)PFN.man[1]=1;
  if(i===5&&v===2&&B){B.stun=Math.max(B.stun||0,4);PFN.ch=12}
  if(i===6&&v===2){PFN.s=Math.max(0,PFN.s-10);PFN.str=1.25}
  if(i===7&&v===2)PFN.s=Math.max(0,PFN.s-12);
  if(i===8&&v===2){PFN.red+=.15;PFN.man[1]=1}
  fx({k:'pfna',i,v})}
function pfnHitB(B,f){if(!B||B.inv||B.hp<=1)return;B.hp=Math.max(1,B.hp-B.mh*f);B.hitT=performance.now()}
function pfnAllyTick(dt,B,frag){
  if(pfHas(2,2)){PFN.gd-=dt;if(PFN.gd<=0){PFN.gd=3;const hit=[];frag.forEach(m=>{if(PFC.some(([cx,cy])=>Math.hypot(m.x-cx,m.y-cy)<PFCR+50)){m.hp-=m.mh*.35;hit.push([Math.round(m.x),Math.round(m.y)])}});if(hit.length)fx({k:'pfnfx',t:'spear',p:hit})}}
  if(pfHas(3,1)){PFN.ct-=dt;if(PFN.ct<=0&&!PFN.cart){PFN.ct=15;const y=CY-200+Math.random()*380,d=Math.random()<.5?1:-1;PFN.cart={y,d,t:0,hb:0};fx({k:'pfnfx',t:'cart',cy:Math.round(y),dr:d})}}
  if(PFN.cart){const C=PFN.cart;C.t+=dt;const u=C.t/2.2,x=CX-C.d*DR+C.d*2*DR*u;frag.forEach(m=>{if(Math.hypot(m.x-x,m.y-C.y)<56)m.hp=0});if(B&&!C.hb&&Math.abs(B.x-x)<80&&Math.abs(B.y-C.y)<90){C.hb=1;pfnHitB(B,.012);B.stun=Math.max(B.stun||0,1)}if(u>=1)PFN.cart=null}
  if(pfHas(4,1)&&B){PFN.cn-=dt;if(PFN.cn<=0){PFN.cn=18;const P=[];for(let k=0;k<5;k++)P.push([Math.round(B.x+rnd(-90,90)),Math.round(B.y+rnd(-50,50))]);fx({k:'pfnfx',t:'cannon',p:P});const Bi=B.id;setTimeout(()=>{const b2=mons.find(q=>q.id===Bi&&q.hp>0);if(b2&&PFNI()){pfnHitB(b2,.015);b2.stun=Math.max(b2.stun||0,1.5)}},1200)}}
  if(pfHas(5,1)){PFN.wh-=dt;if(PFN.wh<=0){PFN.wh=20;frag.forEach(m=>{m.root=3});fx({k:'pfnfx',t:'whale'})}}
  if(pfHas(5,2)&&B){PFN.ch-=dt;if(PFN.ch<=0){PFN.ch=12;pfnHitB(B,.01);fx({k:'pfnfx',t:'chain',bx:Math.round(B.x),by:Math.round(B.y)})}}
  if(pfHas(6,1)&&B){PFN.bm-=dt;if(PFN.bm<=0){PFN.bm=16;pfnHitB(B,.015);fx({k:'pfnfx',t:'beam',bx:Math.round(B.x),by:Math.round(B.y)})}}
  if(pfHas(7,1)){PFN.tw-=dt;if(PFN.tw<=0){PFN.tw=10;PFN.s=Math.max(0,PFN.s-1);fx({k:'pfnfx',t:'pin'})}}}
/* ดาเมจจาก pfnSim อยู่นอกรอบมอน (dmgQ ถูกล้างก่อนรอบมอน) → ลงตรงเหมือนท้ายรอบมอน */
function pfnDmg(u,d){if(!(d>0))return;if(u===uid)hurt(d);else dmgOut.push([u,d])}
function pfnSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  if(PFN.s>=100){dgEnd(0,'แผ่นดินทรุดลงจนธรณินรับไม่ไหว');return}
  const pl=escPl(),B=mons.find(q=>q.t===3&&q.hp>0),dm=BS().dm*bossX(),now=performance.now()/1000,hf=B&&B.mh?B.hp/B.mh:1,frag=mons.filter(m=>m.pfn&&m.hp>0);
  if(B){PFN.ht-=dt;if(PFN.ht<=0){PFN.ht=1;PFN.hs.push([now,B.hp]);if(PFN.hs.length>21)PFN.hs.shift()}}
  /* วงยก: 2 = พันธมิตรประจำ · 1 = มีผู้เล่น · 0 = ว่าง · −1 = เศษความล้านั่งทับ · −2 = ดับ (ถูกกระซิบ) */
  if(PFN.dis>0)PFN.dis=Math.max(0,PFN.dis-dt);let act=0;
  PFC.forEach(([cx,cy],i)=>{const blk=frag.some(m=>Math.hypot(m.x-cx,(m.y-cy)*1.2)<PFCR*.9),pp=pl.some(p=>Math.hypot(p.x-cx,(p.y-cy)*1.3)<PFCR),st=PFN.dis>0?-2:blk?-1:PFN.man[i]?2:pp?1:0;PFN.cs[i]=st;if(st>0)act++});
  const rate=(hf<.33?.8:.5)-PFN.red-act*.32*PFN.str;PFN.s=Math.max(0,Math.min(100,PFN.s+rate*dt));PFN.pr=rate;
  for(const w of PFN.wt){w.t-=dt;if(w.t<=0){w.dead=1;const p=pl.find(q=>q.u===w.u),px=p?p.x:w.x,py=p?p.y:w.y,inC=PFC.some(([cx,cy],i)=>PFN.cs[i]>0&&Math.hypot(px-cx,(py-cy)*1.3)<PFCR);
      pl.forEach(q=>{if(Math.hypot(q.x-px,(q.y-py)*1.6)<90)pfnDmg(q.u,Math.round((inC?45:90)*dm))});if(!inC)PFN.s=Math.min(100,PFN.s+2.5);fx({k:'pfnwl',x:Math.round(px),y:Math.round(py),c:inC?1:0})}}PFN.wt=PFN.wt.filter(w=>!w.dead);
  if(PFN.ws>0){PFN.ws-=dt;if(B){B.tf=Math.max(B.tf||0,.3);if(PFN.wg-B.hp>=PFN.wk){PFN.ws=0;B.tf=0;B.stun=3;fx({k:'pfnws',s:'int'});fx({k:'msg',s:'💥 ขัดได้! เงาผู้แบกเงียบเสียงลง… วงยกยังสว่างอยู่'})}
      else if(PFN.ws<=0){PFN.ws=0;B.tf=0;PFN.dis=6;PFN.s=Math.min(100,PFN.s+4);fx({k:'pfnws',s:'done'});fx({k:'msg',s:'🌑 «วางลงเถิด…» วงยกทุกวงดับลง 6 วิ!'})}}else PFN.ws=0}
  PFN.at-=dt;if(PFN.at<=0&&PFN.al.length<PFAL.length){PFN.at=22;pfnAlly(PFN.al.length,B)}
  pfnAllyTick(dt,B,frag);
  if(B){const ph=hf<.33?2:hf<.66?1:0;if(ph>PFN.ph){PFN.ph=ph;fx({k:'msg',s:ph===1?'🗿 นิ้วของธรณินกระตุก… เขาได้ยินเสียงพวกเจ้า':'🌑 ความสิ้นหวังหนักที่สุดก่อนรุ่งเช้า… แผ่นดินทรุดเร็วขึ้น!'})}}
  PFN.bt-=dt;if(PFN.bt<=0){PFN.bt=.4;fx({k:'pfnv',s:Math.round(PFN.s*10)/10,cs:PFN.cs.slice(),pr:Math.round(PFN.pr*100)/100,al:PFN.al.slice(),av:PFN.av.slice(),dis:Math.round(PFN.dis*10)/10,ws:Math.round(PFN.ws*10)/10,wg:Math.round(PFN.wg),wk:PFN.wk,man:PFN.man.slice(),str:PFN.str,ph:PFN.ph})}}
/* เศษความล้า: เดินไปนั่งทับวงยกที่ใกล้สุด (ถ้ามีผู้เล่นใกล้ 110 จะหันมาสู้) */
function pfnMon(m,dt,pl,spd){if(!PFNI()||dg.ph!=='boss')return false;for(const p of pl)if(Math.hypot(p.x-m.x,p.y-m.y)<110)return false;
  let bi=-1,bd=1e9;PFC.forEach(([cx,cy],i)=>{const d=Math.hypot(cx-m.x,cy-m.y);if(d<bd){bd=d;bi=i}});if(bi<0)return false;const[cx,cy]=PFC[bi],tx=cx+((m.id%3)-1)*18,ty=cy+(m.id%2)*12;
  if(Math.hypot(tx-m.x,ty-m.y)>8)moveTo(m,tx,ty,spd*1.05*dt);return true}
function pfnAI(m,dt,pl,enr,dm){if(m.t!==3)return;if(m.stun>0||m.inv||PFN.ws>0)return;
  m.w1=(m.w1===undefined?6:m.w1)-dt;if(m.w1<=0&&pl.length){m.w1=enr?7:9;const n=Math.min(pl.length,1+(pl.length>2?1:0)),sh=pl.slice().sort(()=>Math.random()-.5).slice(0,n);sh.forEach(p=>PFN.wt.push({u:p.u,x:p.x,y:p.y,t:2}));fx({k:'pfnw',u:sh.map(p=>p.u),d:2});fx({k:'msg',s:'🪨 น้ำหนักสามร้อยปีกดลงมา! เข้าวงยกให้วงรับไว้'})}
  m.w3=(m.w3===undefined?10:m.w3)-dt;if(m.w3<=0){m.w3=enr?10:14;pfnFrag(2+Math.min(3,pl.length));fx({k:'msg',s:'🌑 เศษความล้าคลานออกมา… มันจะไปนั่งทับวงยก!'})}
  m.w2=(m.w2===undefined?18:m.w2)-dt;if(m.w2<=0){m.w2=enr?17:22;pfnWhisper(m)}}
function pfnFx(o){if(!o)return false;const n=performance.now(),own=isHost()&&PFNI();
  if(o.k==='pfnv'){if(!own){PFN.s=+o.s;PFN.cs=o.cs||[0,0,0];PFN.pr=+o.pr||0;PFN.al=o.al||[];PFN.av=o.av||[];PFN.dis=+o.dis||0;const ws=+o.ws||0;if(ws<=0)PFN.ws=0;else if(!(PFN.ws>0)||Math.abs(PFN.ws-ws)>.5)PFN.ws=ws;PFN.wg=+o.wg||0;PFN.wk=+o.wk||1;PFN.man=o.man||[0,0,0];PFN.str=+o.str||1;PFN.ph=o.ph|0}return true}
  if(o.k==='pfna'){if(!own&&!PFN.al.includes(o.i)){PFN.al.push(o.i);PFN.av.push(o.v)}PFN.card={i:o.i,v:o.v,t0:n};if(o.i===8&&o.v===1&&me.cls&&me.down<=0)me.hp=me.mh;try{sfx('quest')}catch(e){}return true}
  if(o.k==='pfnw'){(o.u||[]).forEach(u=>PFWT.push({u,t0:n,d:(+o.d||2)*1000}));if(PFWT.length>8)PFWT.splice(0,PFWT.length-8);return true}
  if(o.k==='pfnwl'){PFFX.push({t:'wl',x:+o.x,y:+o.y,c:o.c|0,t0:n,d:900});try{shk=Math.max(shk,o.c?.15:.35)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='pfnws'){if(o.s==='start'){if(!own){PFN.ws=4;PFN.wg=+o.wg||0;PFN.wk=+o.wk||1}try{sfx('ek_growl')}catch(e){}}else{if(!own)PFN.ws=0;if(o.s==='int'){PFFX.push({t:'int',t0:n,d:900});try{sfx('lvl')}catch(e){}}if(o.s==='done'){if(!own)PFN.dis=6;try{shk=Math.max(shk,.3)}catch(e){}}}return true}
  if(o.k==='pfnfx'){const d=o.t==='cart'?2200:o.t==='whale'?2600:o.t==='beam'?1200:o.t==='cannon'?1700:o.t==='chain'?1400:1000;PFFX.push(Object.assign({},o,{t0:n,d}));if(PFFX.length>24)PFFX.shift();try{sfx(o.t==='cannon'?'boom':o.t==='whale'?'quest':'hit')}catch(e){}return true}
  if(o.k==='pfndu'){(o.p||[]).forEach(p=>PFDU.push({x:+p[0],y:+p[1],t0:n}));if(PFDU.length>20)PFDU.splice(0,PFDU.length-20);return true}
  return false}
/* ---------- ฉาก: ฝ่ามือของธรณิน ---------- */
function pfnPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1,cg=(x,y,r,col,a)=>{if(!inB(x-r,y-r,x+r,y+r))return;const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  {const gr=c.createRadialGradient(CX,CY-300,100,CX,CY,1600);gr.addColorStop(0,'#1a1426');gr.addColorStop(1,'#06050a');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  {const R=gxRng(5801);for(let i=0;i<360;i++){const x=CX-1600+R()*3200,y=CY-1600+R()*3200,s=.6+R()*1.2,a=.2+R()*.4;if(!inB(x-3,y-3,x+3,y+3))continue;c.fillStyle='rgba(190,170,240,'+a+')';c.fillRect(x,y,s,s)}}
  const stoneG=(x0,y0,x1,y1)=>{const gr=c.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,'#7a7064');gr.addColorStop(.5,'#5e564c');gr.addColorStop(1,'#3a342e');return gr};
  /* แขน/ข้อมือทางใต้ */if(inB(CX-420,CY+300,CX+420,CY+1700)){c.fillStyle=stoneG(CX-400,0,CX+400,0);c.beginPath();c.moveTo(CX-330,CY+380);c.bezierCurveTo(CX-360,CY+800,CX-380,CY+1200,CX-400,CY+1700);c.lineTo(CX+400,CY+1700);c.bezierCurveTo(CX+380,CY+1200,CX+360,CY+800,CX+330,CY+380);c.closePath();c.fill();
    c.strokeStyle='rgba(20,14,10,.4)';c.lineWidth=3;for(let k=0;k<8;k++){const y=CY+560+k*120;c.beginPath();c.moveTo(CX-380,y);c.quadraticCurveTo(CX,y+20,CX+380,y);c.stroke()}
    for(let k=0;k<7;k++){const x=CX-300+k*100;c.strokeStyle='#3a2616';c.lineWidth=12;c.beginPath();c.moveTo(x,CY+1700);c.quadraticCurveTo(x+(k%2?30:-30),CY+1000,x+(k%2?-10:10),CY+450);c.stroke();c.strokeStyle='#6a4a30';c.lineWidth=6;c.stroke()}}
  /* นิ้ว 4 นิ้ว (เหนือ) + นิ้วโป้ง (ตะวันออก) */for(const[a,L,w]of[[-2.25,520,150],[-1.82,600,160],[-1.38,590,158],[-.95,500,146],[.15,470,170]]){const sx=CX+Math.cos(a)*(DR-40),sy=CY+Math.sin(a)*(DR-40),ex=CX+Math.cos(a)*(DR+L),ey=CY+Math.sin(a)*(DR+L);if(!inB(Math.min(sx,ex)-w,Math.min(sy,ey)-w,Math.max(sx,ex)+w,Math.max(sy,ey)+w))continue;
    c.save();c.translate(sx,sy);c.rotate(a);c.fillStyle='rgba(0,0,0,.45)';c.beginPath();c.roundRect(-10,-w/2+14,L+60,w,w/2);c.fill();c.fillStyle=stoneG(0,-w/2,0,w/2);c.beginPath();c.roundRect(-10,-w/2,L+50,w,w/2);c.fill();c.strokeStyle='#120c0a';c.lineWidth=3;c.stroke();
    c.strokeStyle='rgba(20,12,8,.5)';c.lineWidth=3;for(const u of[.35,.68]){c.beginPath();c.moveTo(L*u,-w*.42);c.quadraticCurveTo(L*u+10,0,L*u,w*.42);c.stroke()}
    c.fillStyle='rgba(190,175,150,.35)';c.beginPath();c.ellipse(L+10,-w*.1,w*.34,w*.26,0,0,7);c.fill();c.fillStyle='rgba(70,120,50,.6)';c.beginPath();c.ellipse(L*.5,-w*.2,40,10,0,0,7);c.fill();
    c.strokeStyle='#3a2616';c.lineWidth=8;c.beginPath();c.moveTo(L*.2,-w*.5);c.bezierCurveTo(L*.3,-w*.1,L*.25,w*.3,L*.4,w*.5);c.stroke();c.strokeStyle='#6a4a30';c.lineWidth=4;c.stroke();c.restore()}
  /* ฝ่ามือ */c.save();c.beginPath();c.arc(CX,CY,DR+24,0,7);c.clip();
  {const gr=c.createRadialGradient(CX-80,CY-120,40,CX,CY,DR+40);gr.addColorStop(0,'#8a8072');gr.addColorStop(.6,'#6a6256');gr.addColorStop(1,'#4a443c');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  palGrid(ox,oy,X1,Y1,90,70,1,(x,y,i,j)=>{const h=palH(i,j,5802),px=x+palH(j,i,5803)*60,py=y+palH(i,j,5804)*44,r=18+h*40;c.fillStyle=h<.4?'rgba(30,24,20,.16)':h<.75?'rgba(170,156,136,.14)':'rgba(80,120,60,.18)';c.beginPath();c.ellipse(px,py,r,r*.5,h*3,0,7);c.fill()});
  /* เส้นลายมือ 3 เส้น */for(const[x0,y0,cx,cy,x1,y1,w]of[[CX-420,CY-120,CX-80,CY-260,CX+330,CY-260,16],[CX-430,CY-10,CX-60,CY-60,CX+260,CY+80,13],[CX-260,CY-260,CX-330,CY+120,CX-100,CY+440,15]]){for(const[lw,col,o]of[[w+6,'rgba(16,10,8,.45)',3],[w,'rgba(30,22,18,.75)',0],[2,'rgba(220,200,170,.25)',-w*.5]]){c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';c.beginPath();c.moveTo(x0,y0+o);c.quadraticCurveTo(cx,cy+o,x1,y1+o);c.stroke()}}
  /* รอยร้าว (สิ้นหวัง) */{const R=gxRng(5805);for(let k=0;k<12;k++){let x=CX+(R()-.5)*700,y=CY+(R()-.5)*700;if(Math.hypot(x-CX,y-CY)>DR-40){R();R();continue}const P=[[x,y]];for(let q=0;q<5;q++){x+=(R()-.5)*60;y+=(R()-.5)*60;P.push([x,y])}c.strokeStyle='rgba(16,8,20,.8)';c.lineWidth=3;c.beginPath();P.forEach(([px,py],q)=>q?c.lineTo(px,py):c.moveTo(px,py));c.stroke();c.strokeStyle='rgba(170,120,255,.35)';c.lineWidth=1.2;c.stroke()}}
  /* รากของต้นค้ำพันฝ่ามือ */for(let k=0;k<6;k++){const a=-2.4+k*.62,sx=CX+Math.cos(a)*(DR+30),sy=CY+Math.sin(a)*(DR+30),ex=CX+Math.cos(a+2.4)*(DR*.3),ey=CY+Math.sin(a+2.4)*(DR*.3)+60,mx=(sx+ex)/2+40,my=(sy+ey)/2;for(const[lw,col,o]of[[18,'rgba(8,4,2,.35)',5],[12,'#3a2616',0],[6,'#6a4a30',-2],[1.6,'rgba(255,190,90,.35)',-4]]){c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';c.beginPath();c.moveTo(sx,sy+o);c.quadraticCurveTo(mx,my+o,ex,ey+o);c.stroke()}}
  /* วงยก: วงหินแกะ + รอยมือ */PFC.forEach(([x,y],i)=>{if(!inB(x-100,y-60,x+100,y+60))return;c.fillStyle='rgba(10,8,8,.35)';c.beginPath();c.ellipse(x,y+5,PFCR+8,(PFCR+8)*.44,0,0,7);c.fill();c.fillStyle='#5a5048';c.beginPath();c.ellipse(x,y,PFCR,PFCR*.44,0,0,7);c.fill();c.strokeStyle='#2a2420';c.lineWidth=3;c.stroke();
    c.strokeStyle='rgba(255,220,150,.3)';c.lineWidth=2;c.beginPath();c.ellipse(x,y,PFCR-12,(PFCR-12)*.44,0,0,7);c.stroke();
    for(let k=0;k<8;k++){const a=k/8*6.2832+i,hx=x+Math.cos(a)*PFCR*.6,hy=y+Math.sin(a)*PFCR*.26;c.fillStyle='rgba(20,14,12,.5)';c.beginPath();c.ellipse(hx,hy,7,4.4,a,0,7);c.fill();for(let f=0;f<4;f++){const fa=a-.9+f*.6;c.beginPath();c.ellipse(hx+Math.cos(fa)*8,hy+Math.sin(fa)*4.6,2,1.4,fa,0,7);c.fill()}}cg(x,y,PFCR,'255,210,130',.1)});
  c.restore();
  /* ขอบฝ่ามือ */c.strokeStyle='#2a2420';c.lineWidth=30;c.beginPath();c.arc(CX,CY,DR+30,0,7);c.stroke();c.strokeStyle='#7a7064';c.lineWidth=8;c.beginPath();c.arc(CX,CY,DR+16,0,7);c.stroke();c.strokeStyle='rgba(230,215,190,.25)';c.lineWidth=2;c.beginPath();c.arc(CX,CY,DR+11,3.4,6.0);c.stroke()}
function pfnBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  trees.push({x:CX-380,y:CY+200,r:0,k:'pfnthu',ht:60,ns:1,nc:1});
  const R=gxRng(5850);for(let i=0,n=0;i<300&&n<8;i++){const a=R()*6.2832,d=DR-34-R()*30;if(Math.abs(Math.atan2(Math.sin(a-.95),Math.cos(a-.95)))<.3)continue;trees.push({x:CX+Math.cos(a)*d,y:CY+Math.sin(a)*d,r:0,k:'pzpod',v:i,sc:.7+R()*.4,ht:60,ns:1,nc:1});n++}
  for(let i=0,n=0;i<300&&n<8;i++){const a=R()*6.2832,d=DR-26-R()*40;trees.push({x:CX+Math.cos(a)*d,y:CY+Math.sin(a)*d,r:0,k:'pbshroom',v:(R()*4)|0,sc:.7+R()*.5,ht:24,nc:1,ns:1});n++}}
const PFTHU=['ยกไว้! อีกนิดเดียว!','ข้าเห็นโคมจากข้างบนแล้ว! เขามาแล้ว!','เงานั่นพูดเสียงเหมือนท่านธรณินเลย… อย่าฟังมันนะ!','ท่านธรณิน! ทุกคนอยู่ตรงนี้!'];
Object.assign(PALK,{pfnthu(t,T){const x=t.x,y=t.y,f=me.x<x?-1:1;try{NPC3[43].d(x,y,f,T)}catch(e){try{thuD0(x,y,f,T)}catch(e2){}}npvLbl('ธุลี',x,y-46,'#c8f0a8');if(dg.ph==='boss'){try{npcSay('pfnthu',x,y,PFTHU,300,52)}catch(e){}}}});
const pfFolk=(v,x,y,f,T)=>{try{if(v<0){PALK.pbfolk({x,y,v:Math.abs((x+y)|0)%6},T);return}(PFFW[v]||(PFFW[v]=typeof npvW==='function'?npvW((xx,yy,ff,tt)=>pcFolkV(xx,yy,ff,tt,v),null):(xx,yy,ff,tt)=>pcFolkV(xx,yy,ff,tt,v)))(x,y,f,T)}catch(e){}};
/* ---------- ชั้นพื้น: วงยก · พันธมิตร · น้ำหนัก · ผลของพันธมิตร ---------- */
function pfnGround(){if(!PFNI())return;const T=performance.now()/1000,now=performance.now(),dtf=Math.min(.1,(now-(PFN.lt||now))/1000);PFN.lt=now;if(!isHost()&&PFN.ws>0)PFN.ws=Math.max(0,PFN.ws-dtf);g.save();
  /* อัสตรา (โคม): ยืนในวงยก = ฟื้นเลือด (แต่ละเครื่องคิดเอง) */if(pfHas(2,1)&&me.cls&&me.down<=0&&PFC.some(([cx,cy],i)=>PFN.cs[i]>0&&Math.hypot(me.x-cx,(me.y-cy)*1.3)<PFCR))me.hp=Math.min(me.mh,me.hp+me.mh*.02*dtf);
  PFC.forEach(([x,y],i)=>{if(!palVis(x,y,140))return;const st=PFN.cs[i],pu=.5+.5*Math.sin(T*4+i),on=st>0;
    g.strokeStyle=st===-2?'rgba(150,110,220,.5)':st===-1?'rgba(255,120,90,'+(.55+.3*pu)+')':on?'rgba(255,226,150,.95)':'rgba(255,214,140,'+(.35+.25*pu)+')';g.lineWidth=on?4:2.6;g.setLineDash(on?[]:[11,8]);g.beginPath();g.ellipse(x,y,PFCR,PFCR*.44,0,0,7);g.stroke();g.setLineDash([]);
    if(on){g.save();g.globalCompositeOperation='lighter';glowAt(x,y,PFCR*1.1,'255,210,120',.18+.06*pu);g.restore()}
    if(PFN.man[i]&&st!==-2){const v=i===2?4:i===0?3:(pfHas(4,2)?5:-1);pfFolk(v,x-24,y-4,1,T+i);pfFolk(v,x+24,y+2,-1,T+i+1.3)}
    if(pfHas(2,1)&&on){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-70,26,'150,220,255',.5);g.restore();g.fillStyle='rgba(180,230,255,.9)';g.beginPath();g.ellipse(x,y-70,6,8,0,0,7);g.fill()}
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.85)';const lb=st===-2?'🌑 วงยกดับ':st===-1?'⚠️ เศษความล้านั่งทับ':st===2?'⬆ พันธมิตรยกอยู่':st===1?'⬆ กำลังยก!':'⬆ วงยก · ยืนตรงนี้';g.strokeText(lb,x,y+PFCR*.44+16);g.fillStyle=st===-1?'#ffb0a0':on?'#ffe8b0':'#e8d8b8';g.fillText(lb,x,y+PFCR*.44+16)});
  /* พันธมิตรที่มาถึง: ยืนที่ขอบฝ่ามือ */PFN.al.forEach((i,k)=>{const A=PFAL[i];if(!A)return;const a=A[6],x=CX+Math.cos(a)*(DR-34),y=CY+Math.sin(a)*(DR-34);if(!palVis(x,y,80))return;for(let q=0;q<3;q++){const dx=(q-1)*26,dy=(q%2)*10;pfFolk(A[7],x+dx,y+dy,x<CX?1:-1,T+q+i)}
    g.font='bold 9px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.8)';const lb=(PFN.av[k]===2?A[4]:A[2])+' '+A[1];g.strokeText(lb,x,y-44);g.fillStyle='#ffe8b0';g.fillText(lb,x,y-44)});
  /* น้ำหนักตามตัว: วงเตือนใต้ผู้เล่นที่ถูกเลือก */PFWT=PFWT.filter(w=>now-w.t0<w.d);for(const w of PFWT){const p=w.u===uid?me:others[w.u];if(!p)continue;const k=(now-w.t0)/w.d,inC=PFC.some(([cx,cy],i)=>PFN.cs[i]>0&&Math.hypot(p.x-cx,(p.y-cy)*1.3)<PFCR);g.strokeStyle=inC?'rgba(255,230,150,.9)':'rgba(255,120,80,'+(.6+.3*k)+')';g.lineWidth=3;g.beginPath();g.ellipse(p.x,p.y,90,36,0,0,7);g.stroke();g.fillStyle='rgba(0,0,0,'+(.12+.3*k)+')';g.beginPath();g.ellipse(p.x,p.y,80*k+8,32*k+3,0,0,7);g.fill()}
  /* ผลบนพื้น */PFFX=PFFX.filter(e=>now-e.t0<e.d);for(const e of PFFX){const k=(now-e.t0)/e.d;
    if(e.t==='wl'){g.fillStyle='rgba(90,80,70,'+(.6*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y,40+k*70,16+k*28,0,0,7);g.fill();if(e.c){g.strokeStyle='rgba(255,230,150,'+(1-k)+')';g.lineWidth=3;g.beginPath();g.ellipse(e.x,e.y,30+k*60,12+k*24,0,0,7);g.stroke()}}
    else if(e.t==='cart'){const u=Math.min(1,k),x=CX-e.dr*DR+e.dr*2*DR*u,y=e.cy;g.strokeStyle='rgba(120,100,70,.5)';g.lineWidth=3;g.beginPath();g.moveTo(CX-DR,y-6);g.lineTo(CX+DR,y-6);g.moveTo(CX-DR,y+6);g.lineTo(CX+DR,y+6);g.stroke();
      g.fillStyle='#5a4a3a';g.fillRect(x-24,y-26,48,22);g.strokeStyle='#2a1e14';g.lineWidth=2;g.strokeRect(x-24,y-26,48,22);g.fillStyle='#8a7a5a';for(let q=0;q<5;q++){g.beginPath();g.arc(x-16+q*8,y-28,5,0,7);g.fill()}g.fillStyle='#1a120c';g.beginPath();g.arc(x-14,y-2,6,0,7);g.arc(x+14,y-2,6,0,7);g.fill();
      for(let q=0;q<4;q++){g.fillStyle='rgba(255,200,120,'+(.7-q*.15)+')';g.fillRect(x-e.dr*(30+q*12),y-4+((q*7)%9)-4,3,3)}}
    else if(e.t==='cannon'){(e.p||[]).forEach(([x,y],q)=>{const kk=k*1.7-q*.08;if(kk<.7){g.strokeStyle='rgba(255,170,90,'+(.5+.4*kk)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y,30,12,0,0,7);g.stroke()}else if(kk<1.5){const z=(kk-.7)/.8;g.fillStyle='rgba(255,200,110,'+(.8*(1-z))+')';g.beginPath();g.ellipse(x,y,20+z*50,8+z*20,0,0,7);g.fill()}})}
    else if(e.t==='spear'){(e.p||[]).forEach(([x,y])=>{g.strokeStyle='rgba(220,230,255,'+(1-k)+')';g.lineWidth=3;g.beginPath();g.moveTo(x-30+k*20,y-60);g.lineTo(x,y-8);g.stroke()})}
    else if(e.t==='pin'){g.save();g.globalCompositeOperation='lighter';glowAt(CX,CY-DR+40,80,'200,200,220',.3*(1-k));g.restore()}}
  /* ฝุ่นตอนเศษความล้าคลานขึ้น */PFDU=PFDU.filter(e=>now-e.t0<1200);for(const e of PFDU){const k=(now-e.t0)/1200;g.fillStyle='rgba(60,40,90,'+(.5*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y,20+k*40,8+k*16,0,0,7);g.fill()}
  g.restore()}
/* ---------- ชั้นบน: เส้นยกสีทอง · แสง/โซ่/วาฬ · แถบขัด ---------- */
function pfnDraw(){if(!PFNI())return;const T=performance.now()/1000,now=performance.now(),B=mons.find(q=>q.t===3&&q.hp>0);g.save();g.lineCap='round';
  PFC.forEach(([x,y],i)=>{if(PFN.cs[i]<=0||!palVis(x,y-200,260))return;for(let q=0;q<3;q++){const dx=(q-1)*26,sw=Math.sin(T*1.4+q+i)*4,gr=g.createLinearGradient(0,y,0,y-320);gr.addColorStop(0,'rgba(255,220,140,.55)');gr.addColorStop(1,'rgba(255,220,140,0)');g.strokeStyle=gr;g.lineWidth=3;g.beginPath();g.moveTo(x+dx,y-6);g.quadraticCurveTo(x+dx+sw,y-160,x+dx*1.4+sw,y-320);g.stroke()}
    g.save();g.globalCompositeOperation='lighter';for(let q=0;q<3;q++){const u=((T*.5+q/3+i*.2)%1);glowAt(x+(q-1)*26,y-6-u*300,6,'255,230,160',.6*(1-u))}g.restore()});
  for(const e of PFFX){const k=(now-e.t0)/e.d;
    if(e.t==='beam'){const x=e.bx,y=e.by;g.save();g.globalCompositeOperation='lighter';const w=(1-Math.abs(k*2-1))*40+6,gr=g.createLinearGradient(0,y-700,0,y);gr.addColorStop(0,'rgba(200,220,255,0)');gr.addColorStop(1,'rgba(230,240,255,.8)');g.fillStyle=gr;g.fillRect(x-w/2,y-700,w,700);glowAt(x,y-40,90*(1-k*.5),'220,235,255',.5*(1-k));g.restore()}
    else if(e.t==='chain'){const x=e.bx,y=e.by;g.strokeStyle='rgba(255,215,120,'+(1-k)+')';g.lineWidth=3;for(const a of[-2.6,-.5,1.6]){const sx=CX+Math.cos(a)*DR,sy=CY+Math.sin(a)*DR;for(let q=0;q<10;q++){const u=q/10;g.beginPath();g.ellipse(sx+(x-sx)*u,sy+(y-60-sy)*u,5,3,a,0,7);g.stroke()}}}
    else if(e.t==='whale'){g.save();g.globalAlpha=.45*Math.sin(k*Math.PI);const x=CX-700+k*1400,y=CY-560;g.fillStyle='#8ac8e8';g.beginPath();g.ellipse(x,y,170,46,0,0,7);g.fill();g.beginPath();g.moveTo(x-160,y);g.lineTo(x-240,y-40);g.lineTo(x-230,y+30);g.closePath();g.fill();g.globalCompositeOperation='lighter';for(let q=0;q<3;q++){g.strokeStyle='rgba(180,230,255,.6)';g.lineWidth=3;g.beginPath();g.arc(x+120,y,50+q*40+k*80,-.6,.6);g.stroke()}g.restore()}}
  if(B&&PFN.ws>0){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const r=110+k*44+((T*70)%44);g.strokeStyle='rgba(180,120,255,'+(.42-k*.11)+')';g.lineWidth=4;g.beginPath();g.ellipse(B.x,B.y,r,r*.4,0,0,7);g.stroke()}g.restore()}
  if(B&&PFN.ws>0){const p=Math.max(0,Math.min(1,(PFN.wg-B.hp)/Math.max(1,PFN.wk))),x=B.x,y=B.y-260,w=130;g.fillStyle='rgba(20,10,20,.85)';g.beginPath();g.roundRect(x-w/2-3,y-3,w+6,12,6);g.fill();g.fillStyle='#ffd040';g.beginPath();g.roundRect(x-w/2,y,w*p,6,3);g.fill();
    g.font='bold 12px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,10,30,.9)';const lb='🌑 «วางลงเถิด…» รุมตีเพื่อขัด · '+Math.max(0,PFN.ws).toFixed(1)+' วิ';g.strokeText(lb,x,y-8);g.fillStyle='#e8d0ff';g.fillText(lb,x,y-8)}
  {const mine=PFWT.some(w=>w.u===uid&&now-w.t0<w.d);if(mine&&me.cls){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,10,6,.9)';g.strokeText('🪨 น้ำหนักกำลังตก! เข้าวงยก!',me.x,me.y-74);g.fillStyle='#ffd8a0';g.fillText('🪨 น้ำหนักกำลังตก! เข้าวงยก!',me.x,me.y-74)}}
  g.restore()}
/* ---------- ทับจอ: รากห้อยจากฐานแผ่นดิน · แถบแผ่นดินทรุด · ไอคอนพันธมิตร · การ์ดพันธมิตรมาถึง ---------- */
function pfnScreen(){if(!PFNI())return;const T=performance.now()/1000,now=performance.now(),Hs=H;g.save();g.setTransform(DPR,0,0,DPR,0,0);
  const dark=PFN.dis>0?.4:PFN.s>75?.3:.22,vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.3,SW0/2,Hs/2,Math.max(SW0,Hs)*.76);vg.addColorStop(0,'rgba(14,8,20,0)');vg.addColorStop(1,'rgba(14,8,20,'+dark+')');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  g.strokeStyle='rgba(20,12,8,.85)';g.lineCap='round';for(let i=0;i<Math.ceil(SW0/120)+1;i++){const R=depRng(i*29+3),x=i*120+R()*60,L=24+R()*70+(PFN.s/100)*40,sw=Math.sin(T*.6+i)*3;g.lineWidth=2+R()*3;g.beginPath();g.moveTo(x,-4);g.quadraticCurveTo(x+sw,L*.5,x+sw*1.5,L);g.stroke()}
  const y=8+(typeof hudTY==='function'?hudTY():0)+(typeof dgPillOff==='function'?dgPillOff():0)+36;let cy=y+66;
  if(dg.ph==='boss'){const s=Math.max(0,Math.min(100,PFN.s)),w=Math.min(300,SW0-140),x=SW0/2-w/2;g.fillStyle='rgba(16,10,8,.82)';g.beginPath();g.roundRect(x-6,y-6,w+12,24,10);g.fill();
    const gr=g.createLinearGradient(x,0,x+w,0);gr.addColorStop(0,'#6ad070');gr.addColorStop(.6,'#e0b030');gr.addColorStop(1,'#e04a3a');g.fillStyle=gr;g.beginPath();g.roundRect(x,y,w*s/100,12,6);g.fill();g.strokeStyle='rgba(255,240,200,.35)';g.lineWidth=1;g.beginPath();g.roundRect(x,y,w,12,6);g.stroke();
    g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(16,10,8,.9)';const ar=PFN.pr>0.02?' ▼ ทรุด':PFN.pr<-0.02?' ▲ ยกขึ้น':'';const lb='🌍 แผ่นดินทรุด '+s.toFixed(0)+'%'+ar;g.strokeText(lb,SW0/2,y+28);g.fillStyle=PFN.pr<-0.02?'#c8ffb0':s>75?'#ffb0a0':'#fff0d0';g.fillText(lb,SW0/2,y+28);
    let ix=SW0/2-PFAL.length*11;g.font='14px system-ui';PFAL.forEach((A,i)=>{const k=PFN.al.indexOf(i);g.globalAlpha=k>=0?1:.25;g.fillText(k>=0&&PFN.av[k]===2?A[4]:A[2],ix+11,y+48);ix+=22});g.globalAlpha=1;
    /* กระซิบ: แถบขัดบนจอ (เห็นแม้บอสอยู่นอกจอ) */
    const B=mons.find(q=>q.t===3&&q.hp>0);if(B&&PFN.ws>0){const p=Math.max(0,Math.min(1,(PFN.wg-B.hp)/Math.max(1,PFN.wk))),w2=Math.min(260,SW0-120),x2=SW0/2-w2/2,y2=y+60,pu=.5+.5*Math.sin(T*8);
      g.fillStyle='rgba(30,10,40,.88)';g.beginPath();g.roundRect(x2-6,y2-4,w2+12,30,10);g.fill();g.strokeStyle='rgba(190,130,255,'+(.5+.4*pu)+')';g.lineWidth=1.6;g.stroke();
      g.fillStyle='rgba(80,40,110,.9)';g.beginPath();g.roundRect(x2,y2+14,w2,8,4);g.fill();g.fillStyle='#ffd040';g.beginPath();g.roundRect(x2,y2+14,w2*p,8,4);g.fill();
      g.font='bold 11px system-ui';g.fillStyle='#ecd8ff';g.fillText('🌑 «วางลงเถิด…» รุมตีเงาผู้แบกให้แถบเต็ม · '+Math.max(0,PFN.ws).toFixed(1)+' วิ',SW0/2,y2+10,w2+6);cy=y2+40}}
  if(PFN.card&&now-PFN.card.t0<4200){const C=PFN.card,A=PFAL[C.i],k=(now-C.t0)/4200,al=Math.min(1,k*6,(1-k)*5),w=Math.min(420,SW0-40),x=SW0/2-w/2,yy=Math.max(cy,Math.min(Hs*.24,Hs-200));g.globalAlpha=al;g.fillStyle='rgba(24,16,10,.88)';g.beginPath();g.roundRect(x,yy,w,58,12);g.fill();g.strokeStyle='rgba(255,220,150,.6)';g.lineWidth=1.5;g.stroke();
    g.textAlign='center';g.font='bold 13px system-ui';g.fillStyle='#ffd88a';g.fillText((C.v===2?A[4]:A[2])+' '+A[1]+' ลงมาถึงแล้ว!',SW0/2,yy+22);g.font='11.5px system-ui';g.fillStyle='#f4ecff';g.fillText(C.v===2?A[5]:A[3],SW0/2,yy+42,w-20);g.globalAlpha=1}
  g.restore()}
function pfnReward(){if(dgRew)return;dgRew=1;const D=DT[34],st=stCur(),sto=st&&st.g==='pfn',gd=sto?D.gold:110000;PFFX=[];PFWT=[];
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?30:8));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?60:14+(Math.random()*6|0),'ฐานฟ้า')}catch(e){}try{ecGive(sto?36:9+(Math.random()*5|0),'ฐานฟ้า')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});if(sto){drops.push({x:me.x,y:me.y-20,k:'e',L:22,rm:4,lg:1,t:60});drops.push({x:me.x+40,y:me.y-10,k:'e',L:22,rm:4,lg:1,t:60})}
  try{sdGive(sto?24:7,'ฐานฟ้า')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.pfT=Date.now();
  banner={s:'🌍 เงาผู้แบกสลายเป็นแสง! แผ่นดินยกขึ้นแล้ว · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?30:8),t:8};sfx('lvl');burst(me.x,me.y-10,['#fff0c8','#ffffff','#ffd060','#c8b0ff'],170,320,1.8,{glow:1,g:-50});
  setTimeout(()=>{if(PFNI())enterMap(45,pfnBack())},10000)}
function instRepeatPfn(){const l=Math.max(0,(me.pfT||0)+30*60000-Date.now());
  stSay([['thr','(ธรณินยิ้มด้วยดวงตาอำพัน) ฝ่ามือข้ายังจำน้ำหนักของวันนั้นได้… อยากขึ้นมาช่วยแบกอีกสักครั้งไหม เจ้าตัวเล็ก']],()=>{},{choice:[[l>0?'🌍 ขึ้นฐานฟ้าอีกครั้ง (อีก '+Math.ceil(l/60000)+' นาที)':'🌍 ฐานฟ้า (หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🌍 ฝ่ามือธรณินยังพักอยู่ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(pfnEnter,250)}};return true}
setTimeout(()=>{
  try{DGTH[34]='base'}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=44000&&id<45000)return pfnMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(PFNI())return pfnStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(PFNI())return pfnSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(PFNI()){try{rnShard(4)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.45)}}catch(e){}return pfnReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=PFNI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(PFNI()){enterMap(45,pfnBack());sysMsg('🌍 แผ่นดินทรุดลงอีกคืบ… พักแล้วคุยกับธุลีเพื่อขึ้นไปใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(PFNI()){const s=Math.ceil(Math.max(0,PFN.s)),a=PFN.cs.filter(v=>v>0).length;return dg.ph==='boss'||dg.ph==='run'?'🌍 ทรุด '+s+'% · ⬆ วงยก '+a+'/3 · 🤝 '+PFN.al.length+'/'+PFAL.length+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🌍 แผ่นดินยกขึ้นแล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🌍 ฝ่ามือธรณิน · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(PFNI()){ov.hidden=true;sfx('gate');enterMap(45,pfnBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(pfnFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _vg=vmGround;window.vmGround=vmGround=function(){try{pfnGround()}catch(e){}return _vg.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{pfnDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{pfnScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='pfn')return instRepeatPfn();return _ir(k)}}catch(e){}
},0);
