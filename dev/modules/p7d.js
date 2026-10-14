/* ---------- v360 ภาค 7 บทที่ 4 · เปลือกราชินี (ทุ่งรอยแยกนภา + ดันเจี้ยนรังเก่า) ---------- */
const QSA=[[1120,1520],[1620,1000],[1700,2230],[2150,1480]];
const QSWH=['«คืนมา… แสงพวกนี้เคยเป็นของข้า ข้ากลืนมันมาทีละดวง ทีละคืน»',
 '«เจ้าตัดสายของข้า… เจ้าคนที่ทำให้ข้าตาบอด ข้าจำกลิ่นแสงของเจ้าได้»',
 '«นักดาราศาสตร์ตัวน้อยแห่งอัสตรา… นางได้ยินข้า นางอยากได้ดาวทุกดวงเหมือนที่ข้าเคยอยาก»',
 '«เปลือกไม่ต้องการหัวใจ เปลือกต้องการแค่ความว่างที่ต้องเติม… มาเติมข้าสิ»'];
let QSL={on:-1,ch:0,t:0,card:null};
const gP7qv=()=>p6Past('p7k1')&&!p6Past('p7qd');
/* ---------- ทุ่งรอยแยกนภา: สายแสงดาว + เซเลสต์ ---------- */
function qsField(dt){const N=MAPS[10].npc2;if(N){const on=p6Past('p7ls');N.x=on?470:-9999;N.y=on?1650:-9999}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p7ls||me.down>0){QSL.on=-1;QSL.ch=0;return}
  let on=-1;QSA.forEach(([x,y],i)=>{if(!((q.p7ls|0)>>i&1)&&Math.hypot(me.x-x,me.y-y)<66)on=i});
  if(on<0){QSL.on=-1;QSL.ch=0;return}if(QSL.on!==on){QSL.on=on;QSL.ch=0}
  QSL.ch+=dt;if(QSL.ch<1.6)return;QSL.ch=0;QSL.on=-1;
  q.p7ls=(q.p7ls|0)|(1<<on);let n=0;for(let k=0;k<4;k++)if(q.p7ls>>k&1)n++;q.n=n;QSL.card={h:'🌘 สายแสงขาด '+n+'/4',t:QSWH[on],s:performance.now(),d:9};
  try{sfx('quest')}catch(e){}try{burst(QSA[on][0],QSA[on][1]-20,['#ffd0f0','#ffffff','#c8a0ff'],36,170,1,{glow:1,g:-40})}catch(e){}try{sdGive(2,'ตัดสายแสง')}catch(e){}try{stHud();writeSave()}catch(e){}}
function qsFieldDraw(T){if(curMap!==10||isDg())return;const q=me.sty,act=gP7qv();
  {const N=MAPS[10].npc2;if(N&&N.x>0&&palVis(N.x,N.y,60)){celD(N.x,N.y,T,me.x<N.x?-1:1)}}
  if(!act&&!p6Past('p7ls'))return;g.save();
  QSA.forEach(([x,y],i)=>{if(!palVis(x,y-300,420))return;const cut=((q&&q.p7ls)|0)>>i&1||p6Past('p7ls');
    g.fillStyle='rgba(10,4,20,.4)';g.beginPath();g.ellipse(x+3,y+5,26,8,0,0,7);g.fill();
    for(const[dx,h,w,c]of[[-9,20,6,'#d8b0ff'],[2,32,8,'#fff0ff'],[11,16,5,'#c8a0ff']]){g.fillStyle=cut?'#6a5a80':c;g.beginPath();g.moveTo(x+dx-w,y);g.lineTo(x+dx,y-h);g.lineTo(x+dx+w,y);g.closePath();g.fill();g.fillStyle=cut?'rgba(255,255,255,.15)':'rgba(255,255,255,.7)';g.beginPath();g.moveTo(x+dx,y-h);g.lineTo(x+dx+w*.4,y-2);g.lineTo(x+dx,y);g.closePath();g.fill()}
    g.globalCompositeOperation='lighter';
    if(!cut&&act){const pu=.6+.4*Math.sin(T*3+i);glowAt(x,y-14,46,'255,150,230',.35*pu);const th=(w,a,c)=>{const gr=g.createLinearGradient(x,y-20,x+160,y-760);gr.addColorStop(0,'rgba('+c+','+a+')');gr.addColorStop(1,'rgba('+c+',0)');g.strokeStyle=gr;g.lineWidth=w;g.beginPath();g.moveTo(x,y-20);g.bezierCurveTo(x+20,y-260,x+100,y-480,x+160,y-760);g.stroke()};th(14,.18,'255,120,220');th(5,.6,'255,190,240');th(1.8,.85,'255,255,255');if(!LOWQ)for(let k=0;k<6;k++){const u=(T*.45+k/6+i*.2)%1,bx=x+20*3*u*(1-u)*(1-u)+100*3*u*u*(1-u)+160*u*u*u,by=y-20-240*3*u*(1-u)*(1-u)-460*3*u*u*(1-u)-740*u*u*u;glowAt(bx,by,4,'255,230,250',.9*(1-u))}}
    else glowAt(x,y-12,20,'200,160,255',.12);
    g.globalCompositeOperation='source-over';
    if(!cut&&act&&q&&q.a===1&&stCur()&&stCur().p7ls){const b=Math.sin(T*3+i)*3;g.font='15px system-ui';g.textAlign='center';g.fillText('✂️',x,y-48+b)}});
  if(QSL.on>=0){const[x,y]=QSA[QSL.on],k=Math.min(1,QSL.ch/1.6);g.strokeStyle='rgba(16,8,24,.6)';g.lineWidth=5;g.beginPath();g.arc(me.x,me.y-78,11,0,7);g.stroke();g.strokeStyle='#ffc8f0';g.lineWidth=3;g.beginPath();g.arc(me.x,me.y-78,11,-1.57,-1.57+6.283*k);g.stroke();
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(16,8,24,.85)';g.strokeText('✂️ กำลังตัดสายแสง',x,y+30);g.fillStyle='#ffe0f8';g.fillText('✂️ กำลังตัดสายแสง',x,y+30)}
  g.restore()}
function qsFieldScreen(){if(curMap!==10||isDg()||!me.cls)return;const T=performance.now()/1000,Hs=H;g.save();g.setTransform(DPR,0,0,DPR,0,0);
  if(gP7qv()){const q=me.sty;let n=0;for(let k=0;k<4;k++)if(((q&&q.p7ls)|0)>>k&1)n++;if(p6Past('p7ls'))n=4;const k=1-n/4*.75,cx=SW0*.5,cy=Hs*.21,R=42;
    const rg=g.createRadialGradient(cx,cy,0,cx,cy,R*2.1);rg.addColorStop(0,'rgba(14,2,24,'+(.9*k)+')');rg.addColorStop(.4,'rgba(50,10,70,'+(.5*k)+')');rg.addColorStop(1,'rgba(50,10,70,0)');g.fillStyle=rg;g.beginPath();g.ellipse(cx,cy,R*2.1,R*1.15,0,0,7);g.fill();
    g.globalCompositeOperation='lighter';for(let arm=0;arm<3;arm++){g.strokeStyle='rgba(255,140,220,'+(.4*k)+')';g.lineWidth=2;g.beginPath();for(let t=0;t<=1;t+=.05){const a=-T*1.1+arm*2.094+t*5,r=R*1.9*(1-t)+3,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r*.55;t?g.lineTo(px,py):g.moveTo(px,py)}g.stroke()}
    for(let i=0;i<(LOWQ?6:14);i++){const a=i/14*6.283+T*.4,u=(T*.5+i*.13)%1,r0=R*3.4*(1-u)+R*.7;g.strokeStyle='rgba(255,170,235,'+(.45*k*u)+')';g.lineWidth=1.6;g.beginPath();g.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0*.55);g.lineTo(cx+Math.cos(a+.25)*(r0-26),cy+Math.sin(a+.25)*(r0-26)*.55);g.stroke()}
    glowAt(cx,cy,R*.45,'255,180,240',.28*k);g.globalCompositeOperation='source-over'}
  const Cd=QSL.card;if(Cd){const now=performance.now(),age=(now-Cd.s)/1000,D=Cd.d||7.5;if(age>D)QSL.card=null;else{const a=Math.min(1,age/.35,(D-age)/.6),cw=Math.min(SW0-24,330);g.font='12px system-ui';const L=palWrap(Cd.t,cw-28),ch=46+L.length*17,cx=SW0/2-cw/2,cy=Math.min(Hs*.545,Hs*.69-ch);
    g.globalAlpha=a;g.fillStyle='rgba(22,14,30,.9)';g.beginPath();g.roundRect(cx,cy,cw,ch,10);g.fill();g.strokeStyle='rgba(255,150,230,.85)';g.lineWidth=1.4;g.stroke();g.strokeStyle='rgba(255,150,230,.3)';g.beginPath();g.roundRect(cx+4,cy+4,cw-8,ch-8,7);g.stroke();
    g.textAlign='center';g.font='bold 12px system-ui';g.fillStyle='#ffc8f0';g.fillText(Cd.h,SW0/2,cy+21);g.font='12px system-ui';g.fillStyle='#f4ecff';L.forEach((l,i)=>g.fillText(l,SW0/2,cy+42+i*17));g.globalAlpha=1}}
  g.restore()}
function qsAqT(st){if(!st.p7ls||!me.sty)return null;let b=null,bd=1e9;QSA.forEach(([x,y],i)=>{if((me.sty.p7ls|0)>>i&1)return;const d=curMap===10?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x,y:y+30}}});return b?{mp:10,act:'reach',x:b.x,y:b.y,lb:'ไปตัดสายแสงดาว'}:null}
/* ---------- ดันเจี้ยนเปลือกราชินี (ห้อง 84000–84999) ---------- */
setTimeout(()=>{DT[23]={n:'เปลือกราชินี',lv:1,L:130,bL:22,hp:6000000,xp:700000,g:100000,dm:60,tn:10,sm:2,rm:4,lg:1,tm:840,gold:640000,exp:5600000}},0);
const QSHI=()=>!!(MAPS[curMap]&&MAPS[curMap].qsh),qshBack=()=>({x:520,y:1660}),QSW={x:CX,y:CY+330,r:95};
let QS={o:[],z:[],w:0,need:3,nt:6,bt:0,oid:0,inh:null},QSV={o:{},t:0},QSFX={ab:[],ln:null,inh:null,lt:0},QSLT=0;
function qshMap(id){if(MAPS[id])return MAPS[id];const D=DT[23];QS={o:[],z:[],w:0,need:3,nt:6,bt:0,oid:0,inh:null};QSV={o:{},t:0};QSFX={ab:[],ln:null,inh:null,lt:0};
  return MAPS[id]={n:'รังเก่าของราชินี · เปลือกราชินี',dg:23,qsh:1,th:11,bth:14,sx:CX,sy:CY+440,sr:0,seed:371,bg:'#0c0818',tile:'#2a1840',safe:'#3a2450',ring:'#ff9ae0',t1:'#08051a',t2:'#140c28',d1:'#2a1c4a',d2:'#ffd0f0',nests:[],
    gates:[{x:CX-170,y:CY+420,to:10,req:1,ars:1,nm:'ทุ่งรอยแยกนภา',arr:qshBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY-150,n:'ราชินีที่เหลือแต่เปลือก',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:130,col:'#d8b0ff',bar:'#5a2a8a',ln:'#ffe0ff',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'กลางรังเก่า',dg:1}}}
const QSH_IN=[['nar','รังเก่าของราชินีเหลือเพียงโพรงผลึกแตก ๆ… ตรงกลาง เปลือกของนางลอยอยู่ ว่างเปล่า แต่ยังขยับได้'],
  ['qsh','เจ้า… คนที่ทำให้ข้าตาบอด… ดาวที่เจ้าปล่อยออกไป ข้าจะกลืนคืนทีละดวง'],
  ['cel','ข้าจะตั้งวงผนึกดาวไว้ที่ปากทางเข้า! ลูกแสงดวงไหนที่นางเรียก แย่งมันมาส่งให้ข้า ข้าจะยิงมันกลับใส่นางเอง!'],
  ['qsh','นักดาราศาสตร์ตัวน้อย… มาอยู่ข้างข้าสิ ข้าจะคืนหัวใจเต็มดวงให้อัสตรา'],
  ['cel','(เซเลสต์กำคทาแน่นจนมือสั่น) …ไม่ ข้าเห็นแล้วว่าราคาของมันคืออะไร'],
  ['nar','💡 ลูกแสงดาวจะลอยเข้าหาราชินี ถ้าถึงตัว นางจะฟื้นพลังและแรงขึ้น · เดินชนลูกแสงเพื่อถือ (ถือได้ทีละลูก ระหว่างถือจะถูกดูดเข้าหานาง) · พาไปส่งที่วงผนึกของเซเลสต์ ครบแล้วเซเลสต์ยิงหอกดาวใส่นาง (มึน + ดาเมจหนัก) · หลุมดำดูดตัว → เดินออก · นางสูดลมหายใจ → วิ่งออกให้ไกล']];
function qshEnter(){if(!me.cls||me.down>0||isDg())return;const id=84000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🌘 เปิดรังเก่าของราชินี รหัส '+id+' มาช่วยกันทุบเปลือกนาง!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+60,y:CY+380});setTimeout(()=>{if(QSHI()&&dg.ph==='lobby')banner={s:'🌘 รังเก่าของราชินี · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function qshStart(){if(!QSHI()||dg.ph!=='lobby')return;const D=DT[23];stSay(QSH_IN,()=>{if(!QSHI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;QS={o:[],z:[],w:0,need:Math.max(3,Math.min(4,plCount()+1)),nt:6,bt:0,oid:0,inh:null};spawnBoss();
  fx({k:'msg',s:'🌘 เปลือกราชินีตื่นแล้ว! แย่งลูกแสงดาวไปส่งให้เซเลสต์'});try{sfx('boss')}catch(e){}},{cine:1})}
const qshBoss=()=>mons.find(q=>q.t===3&&q.hp>0);
function qshPl(){const a=[];if(me.cls&&me.down<=0)a.push({u:uid,x:me.x,y:me.y});Object.entries(others).forEach(([u,o])=>{if(o.hp>0)a.push({u,x:o.x,y:o.y})});return a}
/* จำลองฝั่งโฮสต์: ลูกแสง · การถือ · การส่ง · หอกดาว · หลุมดำ */
function qshSim(dt){if(!QSHI()||dg.ph!=='boss')return;const B=qshBoss();if(!B)return;const f=B.hp/B.mh,pl=qshPl(),np=Math.max(1,plCount());
  QS.nt-=dt;if(QS.nt<=0){QS.nt=f>.5?14:f>.25?11:9;const k=2+Math.min(2,np-1),wa=Math.atan2(QSW.y-CY,QSW.x-CX);for(let i=0;i<k;i++){let a,c=0;do{a=Math.random()*6.283;c++}while(Math.abs(Math.atan2(Math.sin(a-wa),Math.cos(a-wa)))<.9&&c<20);QS.o.push({id:++QS.oid,x:CX+Math.cos(a)*(DR-50),y:CY+Math.sin(a)*(DR-50),c:'',t:0})}fx({k:'msg',s:'✨ ราชินีเรียกแสงดาว '+k+' ดวง! แย่งมาก่อนถึงตัวนาง'})}
  const pos=u=>u===uid?(me.down<=0?{x:me.x,y:me.y}:null):(others[u]&&others[u].hp>0?{x:others[u].x,y:others[u].y}:null);
  const inh=QS.inh&&QS.inh.t>0;
  for(const o of QS.o){o.t+=dt;if(o.c){const p=pos(o.c);if(!p){o.c='';continue}o.x=p.x;o.y=p.y-6;if(Math.hypot(p.x-QSW.x,p.y-QSW.y)<QSW.r){o.dn=1;QS.w++;fx({k:'qsd',x:CX,y:CY});fx({k:'msg',s:'🌟 ส่งแสงดาวให้เซเลสต์ '+Math.min(QS.w,QS.need)+'/'+QS.need});
        if(QS.w>=QS.need){QS.w=0;if(!B.inv){B.hp=Math.max(1,B.hp-B.mh*.05)}B.stun=Math.max(B.stun||0,5);fx({k:'qsl',x:CX,y:CY,lx:Math.round(B.x),ly:Math.round(B.y)});fx({k:'msg',s:'⚡ เซเลสต์ยิงหอกดาว! ราชินีมึนงง'});try{sfx('boss')}catch(e){}}}continue}
    const d=Math.hypot(B.x-o.x,B.y-o.y),sp=(inh?190:55+(1-f)*40)*dt;if(d>1){o.x+=(B.x-o.x)/d*Math.min(d,sp);o.y+=(B.y-o.y)/d*Math.min(d,sp)}
    if(d<70){o.dn=1;B.hp=Math.min(B.mh,B.hp+B.mh*.03);B.qsb=Math.min(5,(B.qsb|0)+1);fx({k:'qsab',x:CX,y:CY,ax:Math.round(o.x),ay:Math.round(o.y),bx:Math.round(B.x),by:Math.round(B.y)});fx({k:'msg',s:'🌑 ราชินีกลืนแสงดาว! ฟื้นพลังและแรงขึ้น (×'+(B.qsb|0)+')'});continue}
    for(const p of pl){if(Math.hypot(p.x-o.x,p.y-o.y)<44&&!QS.o.some(q=>q.c===p.u&&!q.dn)){o.c=p.u;fx({k:'msg',s:'✋ '+(p.u===uid?'คุณ':(others[p.u]&&others[p.u].n)||'เพื่อน')+'ถือลูกแสงดาว · รีบพาไปที่วงผนึก!'});break}}}
  QS.o=QS.o.filter(o=>!o.dn);
  QS.z.forEach(z=>{z.t-=dt;z.k-=dt;if(z.k<=0){z.k=1;pl.forEach(p=>{if(Math.hypot(p.x-z.x,p.y-z.y)<z.r)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(24*BS().dm*(1+.06*(B.qsb|0)))})}});QS.z=QS.z.filter(z=>z.t>0);
  if(QS.inh){QS.inh.t-=dt;if(QS.inh.t<=0&&!QS.inh.dn){QS.inh.dn=1;pl.forEach(p=>{if(Math.hypot(p.x-B.x,p.y-B.y)<230)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(95*BS().dm*(1+.06*(B.qsb|0)))});fx({k:'bslam',x:Math.round(B.x),y:Math.round(B.y),r:230});QS.inh=null}}
  QS.bt-=dt;if(QS.bt<=0){QS.bt=.22;fx({k:'qsv',x:CX,y:CY,o:QS.o.map(o=>[o.id,Math.round(o.x),Math.round(o.y),o.c]),z:QS.z.map(z=>[Math.round(z.x),Math.round(z.y),z.r,+z.t.toFixed(1)]),w:QS.w,n:QS.need,i:QS.inh?+QS.inh.t.toFixed(2):0,b:B.qsb|0})}}
/* ท่าบอส (โฮสต์) */
function qshAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,mul=1+.06*(m.qsb|0);if(m.stun>0||m.inv)return;
  m.q1=(m.q1===undefined?4:m.q1)-dt;if(m.q1<=0&&pl.length){m.q1=enr?5.5:7;pl.forEach(p=>{const px=Math.round(p.x),py=Math.round(p.y);m.tl.push({x:px,y:py,r:85,t:1.4,k:'star'});fx({k:'tele',x:px,y:py,r:85,dur:1.4})});fx({k:'msg',s:'🦂 กรงเล็บเปลือก! ขยับออกจากวง'})}
  if(f<.7){m.q2=(m.q2===undefined?3:m.q2)-dt;if(m.q2<=0&&pl.length){m.q2=enr?12:15;const n=Math.min(3,1+Math.floor(pl.length/2));for(let i=0;i<n;i++){const p=pl[Math.random()*pl.length|0],x=Math.max(CX-DR+90,Math.min(CX+DR-90,p.x+rnd(-60,60))),y=Math.max(CY-DR+90,Math.min(CY+DR-90,p.y+rnd(-60,60)));QS.z.push({x,y,r:100,t:7,k:1})}fx({k:'msg',s:'🌀 หลุมดำเปิด! เดินออกก่อนถูกดูดลงไป'})}}
  if(f<.42&&!QS.inh){m.q3=(m.q3===undefined?4:m.q3)-dt;if(m.q3<=0){m.q3=enr?16:20;QS.inh={t:3.2};fx({k:'qsi',x:CX,y:CY,dur:3.2});fx({k:'msg',s:'🌬️ ราชินีสูดลมหายใจกลืนฟ้า! วิ่งออกจากตัวนางให้ไกล'});try{sfx('boss')}catch(e){}}}}
/* รับสถานะ + ผลบนผู้เล่นเอง (ทุกเครื่อง) */
function qshFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='qsv'){const seen={};(o.o||[]).forEach(([id,x,y,c])=>{seen[id]=1;const v=QSV.o[id];if(v){v.tx=x;v.ty=y;v.c=c}else QSV.o[id]={x,y,tx:x,ty:y,c,t0:n}});for(const id in QSV.o)if(!seen[id])delete QSV.o[id];
    QSV.z=o.z||[];QSV.w=o.w|0;QSV.n=o.n|0||3;QSV.b=o.b|0;QSV.t=n;if(o.i>0&&(!QSFX.inh||n-QSFX.inh.t0>500))QSFX.inh={t0:n-(3.2-o.i)*1000,d:3200};return true}
  if(o.k==='qsab'){QSFX.ab.push({x:+(o.ax!=null?o.ax:o.x),y:+(o.ay!=null?o.ay:o.y),bx:+o.bx,by:+o.by,t0:n});if(QSFX.ab.length>8)QSFX.ab.shift();return true}
  if(o.k==='qsl'){QSFX.ln={x:+(o.lx!=null?o.lx:o.x),y:+(o.ly!=null?o.ly:o.y),t0:n};return true}
  if(o.k==='qsi'){QSFX.inh={t0:n,d:(+o.dur||3.2)*1000,x:+o.x,y:+o.y};return true}
  if(o.k==='qsd'){QSFX.dl=n;return true}return false}
function qshLocal(dt){if(!QSHI()||dg.ph!=='boss'||me.down>0||!me.cls)return;const B=qshBoss();if(!B)return;let px=0,py=0;
  const car=Object.values(QSV.o).some(v=>v.c===uid);const dx=B.x-me.x,dy=B.y-me.y,d=Math.hypot(dx,dy)||1;
  if(car&&d>60){px+=dx/d*72;py+=dy/d*72}
  if(QSFX.inh&&performance.now()-QSFX.inh.t0<QSFX.inh.d&&d>50){px+=dx/d*150;py+=dy/d*150}
  for(const z of QSV.z||[]){const zx=z[0]-me.x,zy=z[1]-me.y,zd=Math.hypot(zx,zy);if(zd<z[2]+40&&zd>8){px+=zx/zd*95;py+=zy/zd*95}}
  me.x+=px*dt;me.y+=py*dt;const cd=Math.hypot(me.x-CX,me.y-CY);if(cd>DR-14){me.x=CX+(me.x-CX)/cd*(DR-14);me.y=CY+(me.y-CY)/cd*(DR-14)}}
/* ฉากรัง */
function qshBuild(M){PALC.warm=0;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  for(let i=0;i<10;i++){const a=i/10*6.283+.3;if(Math.sin(a)>.82)continue;trees.push({x:CX+Math.cos(a)*(DR+100),y:CY+Math.sin(a)*(DR+80),r:0,k:i%2?'qspk':'qshl',v:i%3,ht:200,ns:1,nc:1})}
  trees.push({x:QSW.x+80,y:QSW.y+6,r:0,k:'qcel',ht:90,ns:1,nc:1})}
function qshPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,bg=c.createRadialGradient(CX,CY,300,CX,CY,1800);bg.addColorStop(0,'#1a0e2c');bg.addColorStop(1,'#05020a');c.fillStyle=bg;c.fillRect(ox,oy,S,S);
  c.fillStyle='rgba(255,220,250,.7)';for(let i=0;i<140;i++){const x=CX+(palH(i,1,801)-.5)*2600,y=CY+(palH(i,2,802)-.5)*2600;if(Math.hypot(x-CX,y-CY)<DR+60||x<ox||x>X1||y<oy||y>Y1)continue;c.fillRect(x,y,1.4,1.4)}
  for(let r=DR+360;r>DR+40;r-=80){c.strokeStyle='rgba(90,50,130,'+(.08+(DR+360-r)/2200)+')';c.lineWidth=30;c.beginPath();c.arc(CX,CY,r,0,7);c.stroke()}
  c.fillStyle='#0a0612';c.beginPath();c.arc(CX+6,CY+30,DR+30,0,7);c.fill();
  const fl=c.createRadialGradient(CX,CY-60,40,CX,CY,DR+20);fl.addColorStop(0,'#3e2660');fl.addColorStop(.55,'#2a1844');fl.addColorStop(1,'#1a0e2c');c.fillStyle=fl;c.beginPath();c.arc(CX,CY,DR+20,0,7);c.fill();
  c.save();c.beginPath();c.arc(CX,CY,DR+20,0,7);c.clip();
  /* ลายเปลือกแตก (เศษเปลือกไข่ผลึกขนาดใหญ่) */
  for(let i=0;i<26;i++){const a=palH(i,4,811)*6.283,d=120+palH(i,5,812)*(DR-120),x=CX+Math.cos(a)*d,y=CY+Math.sin(a)*d,s=40+palH(i,6,813)*60,rot=palH(i,7,814)*6.283;c.save();c.translate(x,y);c.rotate(rot);
    c.fillStyle=i%3?'rgba(200,170,230,.12)':'rgba(255,200,240,.1)';c.beginPath();c.moveTo(-s,0);c.lineTo(-s*.3,-s*.5);c.lineTo(s*.6,-s*.35);c.lineTo(s,s*.1);c.lineTo(s*.2,s*.5);c.lineTo(-s*.6,s*.35);c.closePath();c.fill();c.strokeStyle='rgba(255,170,230,.28)';c.lineWidth=1.4;c.stroke();c.restore()}
  c.strokeStyle='rgba(255,120,210,.35)';c.lineWidth=2;for(let i=0;i<9;i++){const a=i/9*6.283+.2;let x=CX+Math.cos(a)*70,y=CY+Math.sin(a)*70;c.beginPath();c.moveTo(x,y);for(let k=1;k<6;k++){const d=70+k*(DR-70)/5,j=(palH(i,k,815)-.5)*.5;x=CX+Math.cos(a+j)*d;y=CY+Math.sin(a+j)*d;c.lineTo(x,y)}c.stroke()}
  c.fillStyle='rgba(255,230,250,.5)';for(let i=0;i<90;i++){const a=palH(i,8,816)*6.283,d=palH(i,9,817)*DR;c.fillRect(CX+Math.cos(a)*d,CY+Math.sin(a)*d,1.6,1.6)}
  /* วงผนึกของเซเลสต์ */
  {const{x,y,r}=QSW;c.fillStyle='rgba(40,60,120,.35)';c.beginPath();c.ellipse(x,y,r,r*.55,0,0,7);c.fill();for(const[rr,w,a]of[[r,3,.85],[r-14,1.2,.6],[r*.55,1.6,.7]]){c.strokeStyle='rgba(170,210,255,'+a+')';c.lineWidth=w;c.beginPath();c.ellipse(x,y,rr,rr*.55,0,0,7);c.stroke()}
    for(let i=0;i<8;i++){const a=i/8*6.283;c.fillStyle='rgba(220,235,255,.85)';PST(c,x+Math.cos(a)*(r-7),y+Math.sin(a)*(r-7)*.55,4,1.6,4,0);c.fill()}}
  c.restore();
  c.strokeStyle='#2a1640';c.lineWidth=24;c.beginPath();c.arc(CX,CY,DR+18,0,7);c.stroke();c.strokeStyle='rgba(255,150,230,.3)';c.lineWidth=3;c.beginPath();c.arc(CX,CY,DR+8,0,7);c.stroke()}
Object.assign(PALK,{
 qshl(t,T){const x=t.x,y=t.y,s=1+t.v*.18;PALSH(x+6,y+6,70*s,18*s,.4);const gr=g.createLinearGradient(x-60*s,0,x+60*s,0);gr.addColorStop(0,'#cdb8e8');gr.addColorStop(.5,'#f2e6ff');gr.addColorStop(1,'#a890cc');g.fillStyle=gr;
  g.beginPath();g.moveTo(x-60*s,y);g.quadraticCurveTo(x-70*s,y-110*s,x-10*s,y-170*s);g.lineTo(x+4*s,y-140*s);g.lineTo(x+20*s,y-160*s);g.quadraticCurveTo(x+64*s,y-100*s,x+56*s,y);g.quadraticCurveTo(x,y+18*s,x-60*s,y);g.fill();g.strokeStyle='#3a2050';g.lineWidth=1.6;g.stroke();
  g.fillStyle='#1a0c2a';g.beginPath();g.moveTo(x-34*s,y-8*s);g.quadraticCurveTo(x-40*s,y-90*s,x-6*s,y-128*s);g.quadraticCurveTo(x+34*s,y-80*s,x+30*s,y-8*s);g.closePath();g.fill();
  g.strokeStyle='rgba(255,140,220,.7)';g.lineWidth=1.6;g.beginPath();g.moveTo(x-20*s,y-60*s);g.lineTo(x-4*s,y-90*s);g.lineTo(x+10*s,y-70*s);g.stroke();g.save();g.globalCompositeOperation='lighter';glowAt(x,y-60*s,30*s,'255,120,220',.18+.08*Math.sin(T*2+x));g.restore()},
 qspk(t,T){const x=t.x,y=t.y;PALSH(x+4,y+4,30,9,.4);for(const[dx,h,w]of[[-14,80,12],[4,120,16],[20,70,10]]){g.fillStyle='#4a2a6a';g.beginPath();g.moveTo(x+dx-w,y);g.lineTo(x+dx,y-h);g.lineTo(x+dx+w,y);g.closePath();g.fill();g.fillStyle='rgba(255,170,230,.35)';g.beginPath();g.moveTo(x+dx,y-h);g.lineTo(x+dx+w*.4,y-4);g.lineTo(x+dx,y);g.closePath();g.fill()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x+4,y-60,36,'200,100,255',.14);g.restore()},
 qcel(t,T){celD(QSW.x+80,QSW.y+6,T,-1)}});
/* วาดลูกแสง · หลุมดำ · หอกดาว · สูดลมหายใจ */
function qshDraw(){if(!QSHI())return;const T=performance.now()/1000,now=performance.now(),B=qshBoss();
  if(QSLT){const dt=Math.min(.1,(now-QSLT)/1000);try{qshLocal(dt)}catch(e){}}QSLT=now;
  for(const id in QSV.o){const v=QSV.o[id];v.x+=(v.tx-v.x)*.25;v.y+=(v.ty-v.y)*.25}
  g.save();
  /* วงผนึก: แสงเรือง + แต้มชาร์จ */
  {const{x,y,r}=QSW,dl=QSFX.dl&&now-QSFX.dl<600;g.globalCompositeOperation='lighter';glowAt(x,y,r*1.1,'150,200,255',.12+(dl?.3:0)+.04*Math.sin(T*2));g.globalCompositeOperation='source-over';
    const n=QSV.n||3,w=QSV.w|0;for(let i=0;i<n;i++){const px=x+80+(i-(n-1)/2)*16,py=y-74;g.fillStyle=i<w?'#ffffff':'rgba(60,70,110,.8)';PST(g,px,py,6,2.4,4,0);g.fill();g.strokeStyle=i<w?'#6ab8ff':'#2a3050';g.lineWidth=1.2;g.stroke();if(i<w){g.globalCompositeOperation='lighter';glowAt(px,py,10,'170,220,255',.7);g.globalCompositeOperation='source-over'}}
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,8,24,.85)';g.strokeText('วงผนึกดาว · ส่งลูกแสงที่นี่',x,y+r*.55+18);g.fillStyle='#d8ecff';g.fillText('วงผนึกดาว · ส่งลูกแสงที่นี่',x,y+r*.55+18)}
  /* หลุมดำ */
  for(const z of QSV.z||[]){const[x,y,r,tl]=z,a=Math.min(1,tl/1.2);g.fillStyle='rgba(8,2,16,'+(.6*a)+')';g.beginPath();g.ellipse(x,y,r,r*.62,0,0,7);g.fill();g.strokeStyle='rgba(200,90,255,'+(.7*a)+')';g.lineWidth=2;g.setLineDash([10,7]);g.lineDashOffset=T*30;g.stroke();g.setLineDash([]);
    g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?5:10);i++){const u=(T*.7+i/10)%1,an=i*.63+T*1.6,rr=r*(1-u);glowAt(x+Math.cos(an)*rr,y+Math.sin(an)*rr*.62,2.4,'230,170,255',.9*u*a)}g.globalCompositeOperation='source-over'}
  /* สูดลมหายใจ */
  if(QSFX.inh&&B){const u=(now-QSFX.inh.t0)/QSFX.inh.d;if(u>=0&&u<1){g.strokeStyle='rgba(255,90,170,'+(.5+.4*Math.sin(T*12))+')';g.lineWidth=3;g.setLineDash([14,8]);g.lineDashOffset=-T*60;g.beginPath();g.ellipse(B.x,B.y,230,230*.62,0,0,7);g.stroke();g.setLineDash([]);
      g.fillStyle='rgba(255,60,150,'+(.08+.12*u)+')';g.beginPath();g.ellipse(B.x,B.y,230*u,230*.62*u,0,0,7);g.fill();g.globalCompositeOperation='lighter';
      for(let i=0;i<(LOWQ?10:22);i++){const an=i/22*6.283+T,q=(T*1.4+i*.17)%1,r0=460*(1-q)+40;g.strokeStyle='rgba(255,200,240,'+(.6*q)+')';g.lineWidth=1.6;g.beginPath();g.moveTo(B.x+Math.cos(an)*r0,B.y+Math.sin(an)*r0*.62);g.lineTo(B.x+Math.cos(an)*(r0-40),B.y+Math.sin(an)*(r0-40)*.62);g.stroke()}g.globalCompositeOperation='source-over';
      g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,6,24,.9)';const tx='🌬️ วิ่งออกจากวง! '+Math.max(0,(1-u)*QSFX.inh.d/1000).toFixed(1);g.strokeText(tx,me.x,me.y-74);g.fillStyle='#ffd0f0';g.fillText(tx,me.x,me.y-74)}else if(u>=1)QSFX.inh=null}
  /* ลูกแสงดาว */
  for(const id in QSV.o){const v=QSV.o[id];if(v.c)continue;let x=v.x,y=v.y-26;
    g.globalCompositeOperation='lighter';glowAt(x,y,26,'255,220,160',.4+.1*Math.sin(T*6+(+id)));if(!LOWQ&&!v.c&&B){const dx=B.x-x,dy=B.y-y,d=Math.hypot(dx,dy)||1;for(let k=1;k<5;k++)glowAt(x-dx/d*k*9,y-dy/d*k*9,6-k,'255,160,220',.5-k*.1)}g.globalCompositeOperation='source-over';
    g.fillStyle='#fff6d8';PST(g,x,y,9,3.6,5,T*1.5+(+id));g.fill();g.strokeStyle='#d88a3a';g.lineWidth=1.2;g.stroke();g.fillStyle='#ffffff';g.beginPath();g.arc(x,y,2.6,0,7);g.fill()}
  /* ถูกกลืน */
  QSFX.ab=QSFX.ab.filter(e=>now-e.t0<700);for(const e of QSFX.ab){const u=(now-e.t0)/700,x=e.x+(e.bx-e.x)*u,y=e.y-26+(e.by-60-(e.y-26))*u;g.globalCompositeOperation='lighter';glowAt(x,y,18*(1-u)+6,'255,120,200',.8*(1-u));glowAt(e.bx,e.by-60,50*u,'255,90,200',.4*(1-u));g.globalCompositeOperation='source-over'}
  /* หอกดาวของเซเลสต์ */
  if(QSFX.ln){const u=(now-QSFX.ln.t0)/900;if(u>1)QSFX.ln=null;else{const ax=QSW.x+80,ay=QSW.y-30,bx=QSFX.ln.x,by=QSFX.ln.y-60,k=u<.2?u/.2:1-(u-.2)/.8;g.globalCompositeOperation='lighter';g.lineCap='round';for(const[w,a,c]of[[26,.25,'120,190,255'],[10,.6,'190,235,255'],[3,1,'255,255,255']]){g.strokeStyle='rgba('+c+','+(a*k)+')';g.lineWidth=w;g.beginPath();g.moveTo(ax,ay);g.lineTo(bx,by);g.stroke()}glowAt(bx,by,90*k,'200,230,255',.5*k);g.globalCompositeOperation='source-over'}}
  g.restore()}
function qshCarry(){const T=performance.now()/1000,B=qshBoss();g.save();if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);
  for(const id in QSV.o){const v=QSV.o[id];if(!v.c)continue;const p=v.c===uid?me:others[v.c];if(!p)continue;const x=p.x,y=p.y-100+Math.sin(T*3)*3;
    if(B){g.strokeStyle='rgba(255,120,210,.5)';g.lineWidth=1.6;g.setLineDash([6,6]);g.lineDashOffset=-T*30;g.beginPath();g.moveTo(x,y);g.lineTo(B.x,B.y-60);g.stroke();g.setLineDash([])}
    g.globalCompositeOperation='lighter';glowAt(x,y,34,'255,220,160',.5+.12*Math.sin(T*6));g.globalCompositeOperation='source-over';
    g.fillStyle='#fff6d8';PST(g,x,y,12,4.8,5,T*1.5+(+id));g.fill();g.strokeStyle='#d88a3a';g.lineWidth=1.4;g.stroke();g.fillStyle='#ffffff';g.beginPath();g.arc(x,y,3.2,0,7);g.fill();
    if(v.c===uid){g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,8,24,.85)';g.strokeText('⬇ พาไปวงผนึก',x,y-20);g.fillStyle='#ffe8b0';g.fillText('⬇ พาไปวงผนึก',x,y-20)}}
  g.restore()}
function qshScreen(){if(!QSHI())return;try{qshCarry()}catch(e){}const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const inh=QSFX.inh&&performance.now()-QSFX.inh.t0<QSFX.inh.d,c=inh?'255,60,150':'60,20,90',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(inh?.28+.08*Math.sin(T*10):.26)+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);g.restore()}
/* ภาพบอส: เปลือกของราชินีผู้กลืนดาว (โพรงว่าง รอยร้าว เศษเปลือกลอย) */
function gxQueenShell(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=qshBoss(),st=B?(B.qsb|0):0,fy=-30+Math.sin(T*1.0)*5;try{gxBoss14(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf)}catch(e){}if(W)return;
  g.save();g.scale(1.25,1.25);
  g.strokeStyle='rgba(255,215,245,.85)';g.lineWidth=1.6;g.lineCap='round';for(const P of[[-22,fy-40,-12,fy-24,-18,fy-6,-8,fy+14],[16,fy-48,8,fy-30,18,fy-12],[-4,fy+18,6,fy+30,-2,fy+40],[-10,fy-74,-4,fy-62]]){g.beginPath();g.moveTo(P[0],P[1]);for(let i=2;i<P.length;i+=2)g.lineTo(P[i],P[i+1]);g.stroke()}
  g.save();g.globalCompositeOperation='lighter';glowOrb(-14,fy-20,14,'255,150,230',.35);glowOrb(12,fy-34,12,'255,150,230',.3);g.restore();
  {const my=fy-6,R=13+st*1.4;g.fillStyle='#030008';g.beginPath();g.ellipse(0,my,R*.85,R*1.25,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const u=(T*1.2+i/10)%1,an=i*.628+T*2,rr=R*2.2*(1-u);glowAt(Math.cos(an)*rr,my+Math.sin(an)*rr*1.3,1.6,'255,230,250',.9*u)}glowOrb(0,my,R*1.6,'200,90,255',.25+st*.05);g.restore()}
  for(let i=0;i<5;i++){const a=T*.6+i*1.2566,x=Math.cos(a)*44,y=fy-20+Math.sin(a)*16+Math.sin(T*2+i)*4,s=5+i%3*2;g.fillStyle=i%2?'#e8d8ff':'#c8b0e8';g.beginPath();g.moveTo(x,y-s);g.lineTo(x+s*.8,y);g.lineTo(x+s*.2,y+s*.9);g.lineTo(x-s*.7,y+s*.2);g.closePath();g.fill();g.strokeStyle='#3a2050';g.lineWidth=.8;g.stroke()}
  if(st>0){g.save();g.globalCompositeOperation='lighter';glowOrb(0,fy-30,70+st*8,'255,90,200',.08*st);g.restore()}
  g.restore()}
function qshReward(){if(dgRew)return;dgRew=1;const D=DT[23],st=stCur(),sto=st&&st.g==='qsh',gd=sto?D.gold:70000;QSV={o:{},t:0};QSFX={ab:[],ln:null,inh:null,lt:0};
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?22:7));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?32:9+(Math.random()*6|0),'เปลือกราชินี')}catch(e){}try{ecGive(sto?32:9+(Math.random()*5|0),'เปลือกราชินี')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.5)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  sdGive(sto?15:6,'เปลือกราชินี');me.ach=me.ach||{};if(sto){me.sty.n=1;me.sty.a=1}else me.qsT=Date.now();
  banner={s:'🌘 เปลือกราชินีแตกสลาย! แสงดาวพุ่งกลับขึ้นฟ้า +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?22:7),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffd0f0','#ffffff','#c8a0ff','#ffe8a0'],150,320,1.8,{glow:1,g:-60});
  setTimeout(()=>{if(QSHI())enterMap(10,qshBack())},10000)}
function instRepeatQsh(){const l=Math.max(0,(me.qsT||0)+30*60000-Date.now());if(l>0){stSay([['cel','วงผนึกยังต้องพักแสงอีก '+Math.ceil(l/60000)+' นาที… แล้วค่อยลงไปใหม่นะ']]);return true}
  stSay([['cel','เปลือกของนางยังรวมตัวใหม่ได้เรื่อย ๆ ตราบใดที่ยังมีดาวร่วงลงมา จะลงไปทุบมันอีกรอบไหม? (เศษดาว · หินขั้นสูง · ของ Lv 22)']],()=>{},{choice:[['🌘 ลงไปในรังเก่า',1],['ไว้ก่อน',0]]});SD.onChoose=e=>{stClose();if(e===1)setTimeout(qshEnter,250)};return true}
/* ---------- เนื้อเรื่องภาค 7 บทที่ 4 ---------- */
Object.assign(SPK,{qsh:['ราชินีที่เหลือแต่เปลือก','🌘','#e0b8ff'],cel7:SPK.cel});STNPC.cel7=[10,'npc2'];
STCH.push('ภาค 7 · บทที่ 4 · เปลือกราชินี');
{const C4=STCH.length-1;STY.push(
 {c:C4,g:'talk',k:'cel6',p7h:1,tx:'คุยกับเซเลสต์ที่ลานเครื่องเย็บดาว · สายแสงที่ถูกดึงไป',
  pre:[['cel','ข้าส่องกล้องใหญ่ทั้งคืน… สายแสงบาง ๆ จากดาวที่ร่วงทุกดวงไหลไปที่ทุ่งรอยแยกนภา ไหลไปหาเปลือกของราชินี'],
   ['cel','ถ้านางกลืนแสงพวกนั้นหมด เราจะไม่เหลือแสงดาวสักหยดสำหรับเตาหลอม… และดาวที่คาร์นจะดับก่อนสี่สิบคืน'],
   ['orr','(ออร์รีเดินตามมา) ทุ่งรอยแยกอยู่ทางตะวันออกของนครอัสตรา ลงเรือฟ้าไปนครแล้วเดินออกประตูตะวันออกได้เลย ท่าน'],
   ['cel','ข้าจะไปก่อน ไปหาไคล์ นักล่าดาวตก ที่ขอบทุ่งตะวันตกนะ เขาเฝ้ารังของราชินีมาตั้งแต่วันที่เจ้าล้มนาง']],rw:{g:60000}},
 {c:C4,g:'talk',k:'hnt',p7k1:1,tx:'ไปหาไคล์ นักล่าดาวตก ที่ทุ่งรอยแยกนภา (ประตูตะวันออกของนครอัสตรา)',
  pre:[['hnt','ผู้นำแห่งค่าย! นานแล้วนะ… ไม่สิ ตอนนี้ต้องเรียกว่าผู้เชื่อมสองฟ้าสินะ'],
   ['hnt','ข้าเฝ้ารังเก่าของราชินีมาตั้งแต่วันที่เจ้าล้มนาง สามคืนก่อน ซากเปลือกของนางเริ่มเรืองแสงอีกครั้ง'],
   ['hnt','ดูบนฟ้านั่นสิ… สายแสงจากดาวที่ร่วงทั่วแผ่นดินถูกดึงมาที่นี่หมด ต้นสายคือเศษดาวที่ปักอยู่กลางทุ่ง'],
   ['hnt','ตัดสายพวกนั้นให้หมด เปลือกจะอ่อนแรงลง แล้วเราค่อยลงไปจัดการมันในรัง… ยืนข้างเศษดาวสักพัก ตราของเจ้าจะตัดสายได้เอง']],rw:{g:50000}},
 {c:C4,g:'clue',m:10,n:4,p7ls:1,tx:'ตัดสายแสงดาว 4 สายที่ปักอยู่กลางทุ่งรอยแยก (ยืนข้างเศษดาวที่มี ✂️)',
  post:[['nar','สายแสงเส้นสุดท้ายขาดลง… วังวนบนฟ้าหดเล็กลง แต่ยังไม่หายไป เสียงกระซิบเงียบไปชั่วครู่'],
   ['hnt','ได้ผล! ดูนั่น เซเลสต์มาถึงแล้ว นางยืนรออยู่ข้างค่ายข้า']],rw:{g:80000}},
 {c:C4,g:'talk',k:'cel7',p7cq:1,tx:'คุยกับเซเลสต์ที่ขอบทุ่งตะวันตก',
  pre:[['cel','สายแสงขาดหมดแล้ว… แต่ข้าต้องบอกอะไรเจ้าบางอย่างก่อนลงไป'],
   ['cel','ตั้งแต่ขึ้นยอดเขา ข้าได้ยินเสียงผู้หญิงคนหนึ่งในหัว นางสัญญาว่าถ้าข้าช่วยนางเรียกดาวกลับ นางจะคืนหัวใจเต็มดวงให้อัสตรา'],
   ['cel','เมื่อก่อนข้าคงตอบตกลงไปแล้ว… ข้าไม่ไว้ใจตัวเองเท่าไหร่ ถ้าข้าเริ่มลังเลในรังนั้น ช่วยดึงข้ากลับมาด้วย'],
   ['hnt','เสียงเดียวกับที่ข้าได้ยินในคืนที่ฟ้าแตก… นางยังไม่ตายจริง ๆ สินะ'],
   ['cel','ข้าจะตั้งวงผนึกดาวที่ปากทางลงรัง พร้อมเมื่อไหร่ก็คุยกับข้า']],rw:{g:50000,s3:5}},
 {c:C4,g:'qsh',k:'cel7',p7qd:1,tx:'ลงไปในรังเก่า ทุบเปลือกราชินี (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['cel','วงผนึกพร้อมแล้ว… ไปกันเถอะ']],
  post:[['nar','เปลือกของราชินีแตกออกเป็นเสี่ยง ๆ… แสงดาวนับพันที่ถูกกลืนไว้พวยพุ่งขึ้นฟ้าเหมือนน้ำพุ'],
   ['nar','ทั่วแผ่นดิน ผู้คนเงยหน้ามองดาวที่กลับขึ้นไปอยู่ที่เดิมทีละดวง… ฟ้าคืนนั้นสว่างที่สุดในรอบหลายปี']]},
 {c:C4,g:'talk',k:'cel7',p7c4:1,tx:'คุยกับเซเลสต์หลังทุบเปลือกราชินี',
  pre:[['hnt','ข้าเฝ้ารังนี้มาตั้งแต่วันที่เจ้าล้มนาง… คืนนี้ข้าคงหลับตาได้สนิทเสียที'],
   ['cel','(เซเลสต์ยื่นขวดแก้วที่บรรจุแสงดาวบริสุทธิ์ให้) แสงดาวที่ไม่ได้เป็นของใคร… ข้าเก็บไว้ได้แค่ขวดเดียว แต่ข้าว่ามันพอ'],
   ['cel','ในห้องนั้น นางเกือบหลอกข้าได้… ถ้าเจ้าไม่วิ่งเอาดาวมาส่งให้ข้า ข้าอาจเลือกผิดไปแล้ว'],
   ['cel','สองเมืองที่แบ่งแสงกันจะได้หัวใจดวงใหม่… ข้าอยากให้ท่านโอเรียนได้เห็นวันนั้น',0,0,0,1],
   ['cel','คำสาบานของเจ้าเหลืออีกสองอย่าง เวลากับเสียงเพลง… ข้าจะอยู่ด้วยจนถึงวันที่มันสำเร็จ',0,0,0,2],
   ['me','(แบบเตาหลอมหัวใจ: แสงดาว ✓ · เวลา … · เสียงเพลง …)'],
   ['cel','เวลาต้องขอจากเวสเปอร์ ผู้เฝ้าหลุมหัวใจ ส่วนเสียงเพลง… ยายเอดาบอกว่าต้องให้คนทั้งสามเมืองร้องพร้อมกัน'],
   ['cel','ไปที่หลุมหัวใจว่างกันเถอะ ที่นั่นคือที่เดียวที่หัวใจดวงใหม่จะเกิดได้']],
  post:[['nar','🌘 — จบภาค 7 บทที่ 4 · เปลือกราชินี — บทต่อไป: เตาหลอมหัวใจ · บทสุดท้ายของภาค 7']],rw:{g:180000,s3:12}})}
setTimeout(()=>{try{MAPS[10].npc2=MAPS[10].npc2||{x:-9999,y:-9999,n:'เซเลสต์ · นักดาราศาสตร์หลวง'}}catch(e){}
  try{const _bt=buildTrees;window.buildTrees=buildTrees=function(){_bt();try{if(curMap===10&&!isDg())for(let i=trees.length-1;i>=0;i--){const t=trees[i];if(QSA.some(([x,y])=>Math.hypot(t.x-x,t.y-y)<96)||Math.hypot(t.x-470,t.y-1650)<70)trees.splice(i,1)}}catch(e){}}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p7ls)return qsAqT(st);return _q(st)}}catch(e){}
  try{try{DGTH[23]='stars'}catch(e){}const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=84000&&id<85000)return qshMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(QSHI())return qshStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){const r=_sm(dt);if(QSHI())try{qshSim(dt)}catch(e){console.warn('qsh',e)}return r}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(QSHI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return qshReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=QSHI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(QSHI()){enterMap(10,qshBack());sysMsg('🌘 ถูกดูดออกจากรังเก่า · คุยกับเซเลสต์เพื่อลงไปใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(QSHI())return dg.ph==='boss'?'🌘 เปลือกราชินี · วงผนึก '+(QSV.w|0)+'/'+(QSV.n||3)+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🌘 เปลือกราชินีแตกสลาย!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🌘 รังเก่า · กด "เริ่ม" เมื่อพร้อม';return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(QSHI()){ov.hidden=true;sfx('gate');enterMap(10,qshBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(qshFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{let lt=0;const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{qshDraw()}catch(e){}try{if(curMap===10&&!isDg()){const n=performance.now(),dt=lt?Math.min(.1,(n-lt)/1000):0;lt=n;qsField(dt);qsFieldDraw(n/1000)}else lt=0}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{qshScreen()}catch(e){}try{qsFieldScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='qsh')return instRepeatQsh();return _ir(k)}}catch(e){}
  try{const _sd=stDone;window.stDone=stDone=function(){const st=stCur();if(st&&st.p7c4)setTimeout(()=>sdGive(10,'เซเลสต์แบ่งแสงดาวให้'),400);return _sd()}}catch(e){}},0);
