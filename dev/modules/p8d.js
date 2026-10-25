/* ---------- v529 ดันเจี้ยน «ดวลบนเรือดำ» (ห้อง 70000–70999 · DT[26] · ธีมมอน 39) ----------
   ดาดฟ้าเรือดำยาวกลางพายุ (หัวเรือแหลมทางขวา) · บอสกัปตันกริฟ (เลือด 8.4 ล้าน · Lv 140)
   ปืนใหญ่: วงแดง 2–5 วงตรงผู้เล่น 1.5 วิแล้วระเบิด · คานใบเรือกวาด: แถบครึ่งดาดฟ้า (บน/ล่าง) 1.7 วิ
   โยนสมอใส่คนที่ไกลสุด: โดนแล้วถูกดึงเข้าหากริฟ · เรือเอียง: ทุกคนไถลไปทางเดียวกัน 4.5 วิ + ถังไม้กลิ้งจากฝั่งสูง
   เลือด 70% / 35%: ลูกเรือวิญญาณปีนขึ้นมา · ต่ำกว่า 40% ท่าถี่ขึ้น · หลายคน: โฮสต์ส่งสถานะเรือเอียง/ถังทุก 0.4 วิ (gdlv) */
setTimeout(()=>{DT[26]={n:'ดวลบนเรือดำ',lv:1,L:140,bL:22,hp:8400000,xp:900000,g:120000,dm:70,tn:10,sm:0,rm:4,lg:1,tm:900,gold:820000,exp:7200000}},0);
const GDLI=()=>!!(MAPS[curMap]&&MAPS[curMap].gdl),gdlBack=()=>({x:760,y:1600});
const GDX0=CX-620,GDX1=CX+720,GDHH=250;
const gdHH=x=>x<CX+280?GDHH:GDHH*Math.max(0,1-Math.pow((x-(CX+280))/440,1.5));
function gdlIn(x,y,m){m=m||0;return x>GDX0+m&&x<GDX1-m&&Math.abs(y-CY)<gdHH(x)-m}
let GDL={tl:0,tt:0,nt:12,bt:0,br:[],a7:0,a3:0,wn:0},GDFX={c:[],b:[],a:[],x:[]},GDLT=0;
const gdlReset=()=>{GDL={tl:0,tt:0,nt:12,bt:0,br:[],a7:0,a3:0,wn:0};GDFX={c:[],b:[],a:[],x:[]}};
const GDL_IN=[['nar','เรือเล็กเทียบกราบเรือดำ ดาดฟ้าไม้สีดำเปียกฝนลื่นเป็นมัน ทุกครั้งที่ลมพายุตี เรือทั้งลำเอียงวูบ'],
  ['grif','ยินดีต้อนรับสู่เรือดำ ผู้ถือตรา! ที่นี่ไม่มีท่าเรือ ไม่มีสภา มีแต่ลมกับดาบ!'],
  ['nar','💡 ปืนใหญ่ (วงแดงบนพื้น) → ออกจากวง · คานใบเรือกวาด (แถบครึ่งดาดฟ้า) → ไปอีกฝั่ง · โยนสมอใส่คนที่ยืนไกล → โดนแล้วถูกดึงเข้าหากริฟ · เรือเอียง → ทุกคนไถลไปทางเดียวกัน และถังไม้กลิ้งตามมา หลบให้พ้น · เลือด 70% / 35% ลูกเรือวิญญาณปีนขึ้นมาช่วยกริฟ']];
function gdlMap(id){if(MAPS[id])return MAPS[id];const D=DT[26];gdlReset();
  return MAPS[id]={n:'ดวลบนเรือดำ',dg:26,gdl:1,th:39,bth:39,sx:CX-420,sy:CY+80,sr:0,seed:392,bg:'#5a6480',tile:'#3a2c26',safe:'#46342c',ring:'#c8e4ff',t1:'#1e1612',t2:'#3a2c26',d1:'#5a6480',d2:'#c8d0e0',nests:[],
    gates:[{x:CX-560,y:CY+170,to:39,req:1,ars:1,nm:'สุสานเรือเมฆ',arr:gdlBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX+360,y:CY,n:'กัปตันกริฟ',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:140,col:'#d0c8e0',bar:'#4a3a5a',ln:'#f0e8ff',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'บนดาดฟ้าหัวเรือ',dg:1}}}
function gdlEnter(){if(!me.cls||me.down>0||isDg())return;const id=70000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🏴 เปิดดวลบนเรือดำ รหัส '+id+' มาช่วยกันสู้กัปตันกริฟ!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  gdlReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX-420,y:CY+80});setTimeout(()=>{if(GDLI()&&dg.ph==='lobby')banner={s:'🏴 ดวลบนเรือดำ · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function gdlStart(){if(!GDLI()||dg.ph!=='lobby')return;const D=DT[26];stSay(GDL_IN,()=>{if(!GDLI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;gdlReset();spawnBoss();
  fx({k:'msg',s:'🏴 กัปตันกริฟชักดาบ! ยืนให้มั่นบนดาดฟ้าที่โคลงเคลง'});try{sfx('boss')}catch(e){}},{cine:1})}
function gdlAdds(n){const D=DT[26],np=Math.max(1,plCount());for(let i=0;i<n;i++){const s=i%2?1:-1,x=CX+rnd(-420,300),y=CY+s*(GDHH-40),t=Math.random()<.35?1:0,L=D.L,hp=mhp(t,L)*(1.4+.25*(np-1));
    mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,gdl:1})}}
function gdlSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  const B=mons.find(m=>m.t===3&&m.hp>0),pl=escPl(),dm=DT[26].dm/66;
  /* ลูกเรือวิญญาณ */if(B){const f=B.hp/B.mh;if(f<.7&&!GDL.a7){GDL.a7=1;gdlAdds(3+Math.min(3,pl.length-1));fx({k:'msg',s:'👻 ลูกเรือวิญญาณของเรือดำปีนขึ้นมาจากกราบเรือ!'})}
    if(f<.35&&!GDL.a3){GDL.a3=1;gdlAdds(4+Math.min(3,pl.length-1));fx({k:'msg',s:'👻 กริฟเป่าแตรต้อนเมฆ… ลูกเรือวิญญาณขึ้นมาอีกระลอก!'})}}
  /* เรือเอียง */if(GDL.tl){GDL.tt-=dt;if(GDL.tt<=0){GDL.tl=0;GDL.nt=B&&B.hp<B.mh*.4?10:14}}
  else if(GDL.wn){GDL.wn-=dt;if(GDL.wn<=0){GDL.wn=0;GDL.tl=GDL.wd;GDL.tt=4.5;const ys=[];for(let k=0;k<3+Math.min(2,pl.length-1);k++)ys.push(Math.round(CY+rnd(-GDHH+50,GDHH-50)));GDL.br=ys.map((y,k)=>({y,t0:performance.now()+k*650,h:{}}));fx({k:'gdbr',y:ys,d:GDL.tl});fx({k:'msg',s:GDL.tl<0?'🌊 เรือเอียงซ้าย! ถังไม้กลิ้งมาจากหัวเรือ':'🌊 เรือเอียงขวา! ถังไม้กลิ้งมาจากท้ายเรือ'});try{sfx('boss')}catch(e){}}}
  else{GDL.nt-=dt;if(GDL.nt<=0){GDL.wd=Math.random()<.5?-1:1;GDL.wn=1.5;fx({k:'msg',s:'⚠️ ลมพายุตีกราบเรือ… เรือกำลังจะเอียง!'})}}
  /* ถังไม้กลิ้ง: โฮสต์คิดดาเมจ */if(GDL.br.length&&GDL.tl){const n=performance.now();GDL.br.forEach((b,k)=>{const x=gdBrX(b,n,GDL.tl);if(x==null)return;pl.forEach(p=>{if(b.h[p.u])return;if(Math.abs(p.x-x)<34&&Math.abs(p.y-b.y)<30){b.h[p.u]=1;dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(65*dm)}})})}
  GDL.bt-=dt;if(GDL.bt<=0){GDL.bt=.4;fx({k:'gdlv',tl:GDL.tl,tt:Math.round(GDL.tt*10)/10,wn:GDL.wn?GDL.wd:0})}}
const gdBrX=(b,n,dir)=>{const t=(n-b.t0)/1000;if(t<0||t>4)return null;const x=(dir<0?GDX1-60:GDX0+30)+dir*t*360;return gdlIn(x,b.y,8)?x:null};
function gdlMon(m,dt,pl,spd){if(!GDLI())return false;if(!gdlIn(m.x,m.y,20)){m.x=Math.max(GDX0+30,Math.min(GDX1-60,m.x));m.y=CY+Math.max(-gdHH(m.x)+30,Math.min(gdHH(m.x)-30,m.y-CY))}return false}
function gdlAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,hard=f<.4;if(!gdlIn(m.x,m.y,40)){m.x=Math.max(GDX0+60,Math.min(GDX1-120,m.x));m.y=CY+Math.max(-gdHH(m.x)+50,Math.min(gdHH(m.x)-50,m.y-CY))}
  /* ระเบิดปืนใหญ่ */if(m.cn){m.cn.t-=dt;if(m.cn.t<=0){const P=m.cn.p;pl.forEach(p=>{if(P.some(q=>Math.hypot(p.x-q[0],(p.y-q[1])*1.6)<72))dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(85*dm)});fx({k:'gdcx',p:P});m.cn=null}}
  if(m.bm){m.bm.t-=dt;if(m.bm.t<=0){const s=m.bm.s;pl.forEach(p=>{if((p.y-CY)*s>-24)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(110*dm)});fx({k:'gdbx',s});m.bm=null}}
  if(m.an){m.an.t-=dt;if(m.an.t<=0){const A=m.an,p=pl.find(q=>q.u===A.u);if(p){const dx=A.x1-A.x0,dy=A.y1-A.y0,L2=dx*dx+dy*dy||1,t=Math.max(0,Math.min(1,((p.x-A.x0)*dx+(p.y-A.y0)*dy)/L2)),d=Math.hypot(p.x-A.x0-dx*t,p.y-A.y0-dy*t);
      if(d<54){dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(70*dm);fx({k:'gdap',u:p.u,x:Math.round(m.x),y:Math.round(m.y)})}}fx({k:'gdax',x0:A.x0,y0:A.y0,x1:A.x1,y1:A.y1});m.an=null}}
  if(m.stun>0||m.inv||!pl.length)return;
  m.g1=(m.g1===undefined?4:m.g1)-dt;if(m.g1<=0&&!m.cn){m.g1=hard?6.5:9;const P=[];pl.forEach(p=>{if(P.length<5)P.push([Math.round(p.x),Math.round(p.y)])});while(P.length<Math.min(5,pl.length+(hard?3:2))){const x=CX+rnd(-500,550),y=CY+rnd(-180,180);if(gdlIn(x,y,40))P.push([Math.round(x),Math.round(y)])}
    m.cn={t:1.5,p:P};fx({k:'gdc',p:P,d:1.5});fx({k:'msg',s:'💣 ปืนใหญ่บนดาดฟ้าเล็งมา! ออกจากวงแดง'})}
  m.g2=(m.g2===undefined?11:m.g2)-dt;if(m.g2<=0&&!m.bm){m.g2=hard?10:14;let up=0,dn2=0;pl.forEach(p=>{if(p.y<CY)up++;else dn2++});const s=up>=dn2?-1:1;m.bm={t:1.7,s};fx({k:'gdb',s,d:1.7});fx({k:'msg',s:'⛵ คานใบเรือกำลังกวาด'+(s<0?'ฝั่งบน':'ฝั่งล่าง')+'! ไปอีกฝั่ง'})}
  m.g3=(m.g3===undefined?7:m.g3)-dt;if(m.g3<=0&&!m.an&&pl.length){m.g3=hard?8:11;let far=null,fd=-1;pl.forEach(p=>{const d=Math.hypot(p.x-m.x,p.y-m.y);if(d>fd){fd=d;far=p}});if(far&&fd>160){m.an={t:1,u:far.u,x0:Math.round(m.x),y0:Math.round(m.y-20),x1:Math.round(far.x),y1:Math.round(far.y)};fx({k:'gda',x0:m.an.x0,y0:m.an.y0,x1:m.an.x1,y1:m.an.y1,u:far.u,d:1})}}}
function gdlFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='gdc'){GDFX.c.push({p:o.p||[],t0:n,d:(+o.d||1.5)*1000});return true}
  if(o.k==='gdcx'){(o.p||[]).forEach(q=>GDFX.x.push({x:+q[0],y:+q[1],t0:n}));try{shk=Math.max(shk,.28)}catch(e){}try{sfx('boom')}catch(e){}GDFX.c=GDFX.c.filter(e=>n-e.t0<e.d-60);return true}
  if(o.k==='gdb'){GDFX.b.push({s:+o.s,t0:n,d:(+o.d||1.7)*1000,x:0});return true}
  if(o.k==='gdbx'){GDFX.b.push({s:+o.s,t0:n,d:450,x:1});try{shk=Math.max(shk,.3)}catch(e){}return true}
  if(o.k==='gda'){GDFX.a.push({x0:+o.x0,y0:+o.y0,x1:+o.x1,y1:+o.y1,u:o.u,t0:n,d:(+o.d||1)*1000,x:0});return true}
  if(o.k==='gdax'){GDFX.a.push({x0:+o.x0,y0:+o.y0,x1:+o.x1,y1:+o.y1,t0:n,d:350,x:1});return true}
  if(o.k==='gdap'){if(o.u===uid&&GDLI()&&me.down<=0){const tx=+o.x,ty=+o.y,dx=tx-me.x,dy=ty-me.y,d=Math.hypot(dx,dy);if(d>90){const k=(d-80)/d*.75;let nx=me.x+dx*k,ny=me.y+dy*k;if(gdlIn(nx,ny,24)){me.x=nx;me.y=ny}}try{dn.push({x:me.x,y:me.y-60,v:'⚓ ถูกสมอดึง!',t:1.2,col:'#d0c8e0'})}catch(e){}}return true}
  if(o.k==='gdbr'){GDL.br=(o.y||[]).map((y,k)=>({y:+y,t0:n+k*650,h:{}}));if(!isHost()){GDL.tl=+o.d;GDL.tt=4.5}return true}
  if(o.k==='gdlv'){if(!isHost()||!GDLI()){GDL.tl=+o.tl||0;GDL.tt=+o.tt||0;GDL.wn=o.wn?1:0;GDL.wd=+o.wn||GDL.wd}return true}
  return false}
/* ---------- ฉาก ---------- */
function gdlBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};const I=(x,y,r)=>trees.push({x,y,r,inv:1,ns:1});
  for(let x=GDX0;x<=GDX1;x+=30){const h=gdHH(x);I(x,CY-h-22,24);I(x,CY+h+22,24)}for(let y=CY-GDHH;y<=CY+GDHH;y+=30)I(GDX0-22,y,24);
  trees.push({x:CX-230,y:CY-10,r:24,k:'gdmast',v:0,ht:320,hw:110});trees.push({x:CX+170,y:CY+10,r:24,k:'gdmast',v:1,ht:340,hw:120});
  for(let x=CX-520;x<=CX+260;x+=130)for(const s of[-1,1])trees.push({x,y:CY+s*(GDHH-14),r:16,k:'gdcan',v:s,ht:40,hw:30});
  trees.push({x:GDX0+50,y:CY,r:30,k:'gdcore',ht:120,hw:50});
  [[CX-420,CY-120,'phbarrel'],[CX-390,CY-150,'phcrate'],[CX+40,CY+150,'phrope'],[CX-80,CY-160,'phcrate'],[CX+420,CY+90,'phbarrel'],[CX-300,CY+170,'phrope']].forEach(([x,y,k],i)=>trees.push({x,y,r:14,k,ht:40,v:i%2}))}
function gdlPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S;try{phvCloudSea(c,ox,oy,S,3995)}catch(e){c.fillStyle='#8a94aa';c.fillRect(ox,oy,S,S)}c.fillStyle='rgba(24,28,52,.5)';c.fillRect(ox,oy,S,S);
  const hull=(dy,pad)=>{c.beginPath();c.moveTo(GDX0-pad,CY-GDHH-pad+dy);for(let x=GDX0;x<=GDX1;x+=20)c.lineTo(x,CY-gdHH(x)-pad+dy);c.lineTo(GDX1+pad*.6,CY+dy);for(let x=GDX1;x>=GDX0;x-=20)c.lineTo(x,CY+gdHH(x)+pad+dy);c.lineTo(GDX0-pad,CY+GDHH+pad+dy);c.quadraticCurveTo(GDX0-pad-60,CY+dy,GDX0-pad,CY-GDHH-pad+dy);c.closePath()};
  c.fillStyle='rgba(10,12,24,.45)';hull(60,20);c.fill();c.fillStyle='#16100e';hull(34,16);c.fill();
  c.save();hull(0,12);c.clip();try{phvPlanksH(c,GDX0-80,CY-GDHH-20,GDX1+20,CY+GDHH+20,3996,15)}catch(e){c.fillStyle='#4a362a';c.fillRect(ox,oy,S,S)}c.fillStyle='rgba(16,10,18,.52)';c.fillRect(GDX0-80,CY-GDHH-20,GDX1-GDX0+120,GDHH*2+40);
  /* แอ่งน้ำฝนสะท้อน */for(const[x,y,r]of[[CX-300,CY+60,60],[CX+60,CY-80,80],[CX+330,CY+120,50],[CX-120,CY+180,40]]){c.fillStyle='rgba(150,170,210,.14)';c.beginPath();c.ellipse(x,y,r,r*.36,0,0,7);c.fill()}
  /* ช่องลงห้องใต้ดาดฟ้า */c.fillStyle='#0c080a';c.fillRect(CX-40,CY-36,80,72);c.strokeStyle='#4a3a2a';c.lineWidth=3;c.strokeRect(CX-40,CY-36,80,72);for(let k=-28;k<36;k+=14){c.beginPath();c.moveTo(CX-40,CY+k);c.lineTo(CX+40,CY+k);c.stroke()}
  c.restore();
  c.strokeStyle='#2a1e18';c.lineWidth=16;hull(0,8);c.stroke();c.strokeStyle='#8a6a3a';c.lineWidth=2.4;hull(0,1);c.stroke();
  c.fillStyle='#1a1210';for(let x=GDX0+10;x<GDX1-30;x+=40){const h=gdHH(x)+8;c.fillRect(x-4,CY-h-6,8,12);c.fillRect(x-4,CY+h-6,8,12)}}
function gdBarrelDraw(x,y,rot){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle='#5a3a20';g.beginPath();g.ellipse(0,0,16,20,0,0,7);g.fill();g.strokeStyle='#2a2a30';g.lineWidth=3;for(const k of[-10,10]){g.beginPath();g.moveTo(-15,k);g.lineTo(15,k);g.stroke()}g.strokeStyle='#1a0e08';g.lineWidth=1.4;g.beginPath();g.ellipse(0,0,16,20,0,0,7);g.stroke();g.restore()}
Object.assign(PALK,{
 gdmast(t,T){const x=t.x,y=t.y,v=t.v|0,H=v?300:270,sw=Math.sin(T*1.6+v)*6;PALSH(x+10,y+6,30,9,.5);
  g.strokeStyle='#120c0a';g.lineWidth=16;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-H);g.stroke();g.strokeStyle='#3a2a20';g.lineWidth=10;g.beginPath();g.moveTo(x-1,y);g.lineTo(x-1,y-H);g.stroke();
  g.strokeStyle='#2a1e18';g.lineWidth=7;for(const yy of[H-30,H-150]){g.beginPath();g.moveTo(x-120,y-yy);g.lineTo(x+120,y-yy+6);g.stroke()}
  g.save();g.globalAlpha=.9;g.fillStyle='#22202a';for(const[y0,y1,w]of[[H-34,H-140,110],[H-154,H-250,90]]){g.beginPath();g.moveTo(x-w,y-y0);g.quadraticCurveTo(x+sw,y-y0-10,x+w,y-y0+4);g.lineTo(x+w*.9+sw,y-y1+30);g.lineTo(x+w*.6+sw,y-y1+46);g.lineTo(x+w*.3+sw,y-y1+22);g.lineTo(x+sw,y-y1+40);g.lineTo(x-w*.4+sw,y-y1+18);g.lineTo(x-w*.8+sw,y-y1+36);g.closePath();g.fill()}
  g.fillStyle='rgba(200,40,40,.7)';g.beginPath();g.arc(x+sw*.5,y-H+100,12,0,7);g.fill();g.restore();
  g.fillStyle='#0c0a10';g.beginPath();g.moveTo(x,y-H);g.lineTo(x+40+sw*1.4,y-H+6);g.lineTo(x+30+sw,y-H+14);g.lineTo(x+42+sw*1.6,y-H+22);g.lineTo(x,y-H+24);g.closePath();g.fill()},
 gdcan(t,T){const x=t.x,y=t.y,s=t.v;PALSH(x,y+4,20,6,.4);g.fillStyle='#3a2a1c';g.fillRect(x-16,y-10,32,14);g.fillStyle='#1a1a20';g.beginPath();g.ellipse(x,y-14,9,9,0,0,7);g.fill();g.fillStyle='#22222a';g.save();g.translate(x,y-14);g.rotate(s<0?-1.57:1.57);g.fillRect(-6,0,12,30);g.fillStyle='#0a0a0e';g.beginPath();g.ellipse(0,30,6,3,0,0,7);g.fill();g.restore();
  g.fillStyle='#2a1e14';for(const dx of[-12,12]){g.beginPath();g.arc(x+dx,y+2,5,0,7);g.fill()}},
 gdcore(t,T){const x=t.x,y=t.y,pu=.4+.25*Math.sin(T*1.3)+.15*Math.sin(T*7.3);PALSH(x+4,y+6,40,10,.45);g.fillStyle='#3a2e22';g.fillRect(x-34,y-20,68,24);g.strokeStyle='#120c08';g.lineWidth=1.4;g.strokeRect(x-34,y-20,68,24);
  g.fillStyle='rgba(120,140,180,.3)';g.beginPath();g.arc(x,y-46,24,Math.PI,0);g.lineTo(x+24,y-20);g.lineTo(x-24,y-20);g.closePath();g.fill();g.strokeStyle='#6a5a3a';g.lineWidth=2;g.stroke();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-40,26,'120,150,255',.35*pu);glowAt(x,y-40,6,'220,230,255',.8*pu);g.restore()}});
function gdlDraw(){if(!GDLI())return;const T=performance.now()/1000,now=performance.now(),dt=Math.min(.1,(now-(GDLT||now))/1000);GDLT=now;g.save();
  /* ไถลตามเรือเอียง (ฝั่งตัวเอง) */if(GDL.tl&&me.cls&&me.down<=0&&!SD.on){const nx=me.x+GDL.tl*175*dt;if(gdlIn(nx,me.y,26))me.x=nx}
  /* ถังกลิ้ง */if(GDL.br.length&&GDL.tl){for(const b of GDL.br){const x=gdBrX(b,now,GDL.tl);if(x==null)continue;if(Math.abs(x-me.x)<34&&Math.abs(me.y-b.y)<30&&!b.me){b.me=1;try{dn.push({x:me.x,y:me.y-60,v:'🛢️ ถังไม้กลิ้งชน!',t:1,col:'#ffd0a0'})}catch(e){}}gdBarrelDraw(x,b.y-16,(now-b.t0)/1000*6*GDL.tl)}}
  /* วงปืนใหญ่ */GDFX.c=GDFX.c.filter(e=>now-e.t0<e.d);for(const e of GDFX.c){const k=(now-e.t0)/e.d;for(const[x,y]of e.p){g.fillStyle='rgba(230,50,40,'+(.12+.25*k)+')';g.beginPath();g.ellipse(x,y,72,45,0,0,7);g.fill();g.strokeStyle='rgba(255,120,100,'+(.6+.3*Math.sin(T*14))+')';g.lineWidth=2.4;g.beginPath();g.ellipse(x,y,72,45,0,0,7);g.stroke();g.beginPath();g.ellipse(x,y,72*k,45*k,0,0,7);g.stroke();
      if(!LOWQ){const sy=y-600*(1-k);g.fillStyle='#1a1a20';g.beginPath();g.arc(x,sy,7,0,7);g.fill()}}}
  GDFX.x=GDFX.x.filter(e=>now-e.t0<600);for(const e of GDFX.x){const k=(now-e.t0)/600;g.save();g.globalCompositeOperation='lighter';glowAt(e.x,e.y,90*(1-k*.4),'255,160,80',.8*(1-k));g.restore();g.fillStyle='rgba(60,50,50,'+(.5*(1-k))+')';g.beginPath();g.arc(e.x+10*k,e.y-30-40*k,20+30*k,0,7);g.fill()}
  /* คานใบเรือ */GDFX.b=GDFX.b.filter(e=>now-e.t0<e.d);for(const e of GDFX.b){const k=(now-e.t0)/e.d,y0=e.s<0?CY-GDHH-20:CY-24,y1=e.s<0?CY+24:CY+GDHH+20;
    if(!e.x){g.fillStyle='rgba(230,50,40,'+(.14+.22*k)+')';g.fillRect(GDX0,y0,GDX1-GDX0,y1-y0);g.strokeStyle='rgba(255,140,110,.8)';g.lineWidth=2;g.setLineDash([14,10]);g.strokeRect(GDX0,y0,GDX1-GDX0,y1-y0);g.setLineDash([]);const bx=GDX0+(GDX1-GDX0)*k;g.fillStyle='rgba(40,30,30,.6)';g.fillRect(bx-10,y0,20,y1-y0)}
    else{g.fillStyle='rgba(255,220,200,'+(.4*(1-k))+')';g.fillRect(GDX0,y0,GDX1-GDX0,y1-y0)}}
  /* สมอ */GDFX.a=GDFX.a.filter(e=>now-e.t0<e.d);for(const e of GDFX.a){const k=(now-e.t0)/e.d;if(!e.x){g.strokeStyle='rgba(200,180,255,'+(.4+.4*k)+')';g.lineWidth=46;g.globalAlpha=.25;g.lineCap='round';g.beginPath();g.moveTo(e.x0,e.y0);g.lineTo(e.x1,e.y1);g.stroke();g.globalAlpha=1;g.strokeStyle='rgba(220,200,255,.9)';g.lineWidth=2;g.setLineDash([10,8]);g.stroke();g.setLineDash([]);
      if(e.u===uid){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,10,30,.9)';g.strokeText('⚓ สมอเล็งมาที่คุณ! หลบออกจากแนว',me.x,me.y-72);g.fillStyle='#e8d8ff';g.fillText('⚓ สมอเล็งมาที่คุณ! หลบออกจากแนว',me.x,me.y-72)}}
    else{const x=e.x0+(e.x1-e.x0)*Math.min(1,k*1.6),y=e.y0+(e.y1-e.y0)*Math.min(1,k*1.6);g.strokeStyle='#6a6a76';g.lineWidth=3;g.beginPath();g.moveTo(e.x0,e.y0);g.lineTo(x,y);g.stroke();g.save();g.translate(x,y);g.strokeStyle='#4a4a56';g.lineWidth=6;g.beginPath();g.moveTo(0,-18);g.lineTo(0,18);g.moveTo(-14,10);g.quadraticCurveTo(0,26,14,10);g.stroke();g.restore()}}
  /* เตือนในวง */{const inC=GDFX.c.some(e=>e.p.some(([x,y])=>Math.hypot(me.x-x,(me.y-y)*1.6)<72)),inB=GDFX.b.some(e=>!e.x&&(me.y-CY)*e.s>-24);if(inC||inB){const t=inC?'💣 ออกจากวงแดง!':'⛵ ไปอีกฝั่งของดาดฟ้า!';g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,10,10,.9)';g.strokeText(t,me.x,me.y-88);g.fillStyle='#ffb0a0';g.fillText(t,me.x,me.y-88)}}
  g.restore()}
function gdlScreen(){if(!GDLI())return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.78);gr.addColorStop(0,'rgba(20,20,40,0)');gr.addColorStop(1,'rgba(20,20,40,.36)');g.fillStyle=gr;g.fillRect(0,0,SW0,H);
  g.strokeStyle='rgba(200,215,240,.28)';g.lineWidth=1;g.beginPath();for(let k=0;k<(LOWQ?20:46);k++){const R=depRng(k*13+5),x=((R()*SW0*1.4+T*260)%(SW0+120))-60,y=((R()*H+T*820)%(H+80))-40;g.moveTo(x,y);g.lineTo(x-8,y+18)}g.stroke();
  if(GDL.tl||GDL.wn){const d=GDL.tl||GDL.wd||1,a=GDL.tl?.22:.12+.08*Math.sin(T*10);g.save();g.translate(SW0/2,H/2);g.rotate(d*.06);g.strokeStyle='rgba(180,200,240,'+a+')';g.lineWidth=2;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(-SW0,k*H/6);g.lineTo(SW0,k*H/6);g.stroke()}g.restore();
    const t=GDL.tl?(d<0?'⟵ เรือเอียง! ไถลไปทางซ้าย':'เรือเอียง! ไถลไปทางขวา ⟶'):'⚠️ เรือกำลังจะเอียง…';g.font='bold 15px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(10,14,30,.85)';g.strokeText(t,SW0/2,H*.26);g.fillStyle='#c8e4ff';g.fillText(t,SW0/2,H*.26)}
  g.restore()}
/* ---------- บอส: กัปตันกริฟ ---------- */
BV1['กัปตันกริฟ']=(T,W,br,sw,up,cf)=>{const b=br,CO='#1a1820',COD='#0e0c14',RD='#7a1e22',GD='#c89a3a',SK='#d8b8a0',BE='#3c3438',pu=.5+.3*Math.sin(T*1.4)+.2*Math.sin(T*7);
  const mv=BWK.mv||0,wk=Math.sin(BWK.ph||0)*mv,fl=Math.sin(T*1.7);bvShadow(54,14);
  /* เสื้อคลุมยาวด้านหลัง */{const s=fl*5;vS(W,[[-24,-66+b],[24,-66+b],['q',42+s,-20,48+s*1.3,24],[34+s,28],[22,22],[8+s*.5,28],[-8,22],[-22+s*.5,28],[-36,22],[-48+s,24],['q',-42,-20,-24,-66+b]],CO,1,1.4);
    vS(W,[[-20,-60+b],[20,-60+b],['q',30+s,-20,34+s,20],[-34+s,20],['q',-30,-20,-20,-60+b]],RD,0,1)}
  /* ขา + บูต */for(const s of[-1,1]){const st=s*wk,kx=s*10+st*4,ky=6,ax=s*11+st*7,ay=26-Math.max(0,st)*3;vLimb(W,[s*9,-14+b,kx,ky],'#2a2228',13,11);vLimb(W,[kx,ky,ax,ay-4],'#2a2228',11,10);
    vS(W,[[ax-8,ay-14],[ax+7,ay-14],[ax+7,ay-2],[ax+s*13,ay+1],[ax+s*13,ay+5],[ax-8,ay+5]],'#18120e',1,1.1);vK(W,[[ax-8,ay-12],[ax+7,ay-12]],'#4a3a2a',2)}
  /* ลำตัว: เสื้อกั๊กแดง + เข็มขัด + ตะเกียงแกนดาวที่เอว */vS(W,[[-18,-62+b],['c',-24,-44+b,-22,-26+b,-17,-12+b],[17,-12+b],['c',22,-26+b,24,-44+b,18,-62+b],['q',0,-68+b,-18,-62+b]],RD,1,1.3);
  for(let i=0;i<4;i++)bvDE(W,-1,-56+i*10+b,1.8,1.8,GD);vS(W,[[-19,-22+b],[19,-22+b],[19,-15+b],[-19,-15+b]],'#2a1e14',1,1);vS(W,[[-4,-23+b],[4,-23+b],[4,-14+b],[-4,-14+b]],GD,1,.8);
  {const lx=-15,ly=-10+b;vK(W,[[lx,-16+b],[lx,ly-6]],'#4a3a2a',1.4);vS(W,[[lx-5,ly-6],[lx+5,ly-6],[lx+4,ly+6],[lx-4,ly+6]],'rgba(140,170,230,.6)',1,.8);bvAdd(W,()=>{glowAt(lx,ly,14,'140,170,255',.5*pu);glowAt(lx,ly,4,'230,240,255',.9*pu)})}
  /* ปกเสื้อคลุม + ไหล่ทอง */for(const s of[-1,1]){vS(W,[[s*14,-66+b],[s*26,-60+b],[s*22,-30+b],[s*16,-40+b]],COD,1,1);vS(W,[[s*14,-68+b],['q',s*30,-72+b,s*32,-60+b],[s*18,-60+b]],GD,1,.9);for(let k=0;k<3;k++)vK(W,[[s*(20+k*3),-60+b],[s*(19+k*3),-54+b]],GD,1.2)}
  /* แขนซ้าย: แขนกลแกนดาว */{const ex=-30,ey=-34+b+Math.sin(T*1.2)*2,hx=-34,hy=-12+b;vLimb(W,[-20,-58+b,ex,ey],'#4a505e',12,10);vLimb(W,[ex,ey,hx,hy],'#5a6070',10,9);
    for(let k=0;k<3;k++)vK(W,[[ex-5+k*1,ey+4+k*6],[ex+5+k*.6,ey+4+k*6]],'#2a2e38',1.4);bvE(W,ex,ey,5,5,'#7a8090',1);vS(W,[[hx-6,hy-2],[hx+6,hy-2],[hx+5,hy+8],[hx-5,hy+8]],'#4a505e',1,1);
    bvAdd(W,()=>{glowAt(ex,ey,10,'140,170,255',.45*pu);glowAt(hx,hy+3,9,'140,170,255',.35*pu)});for(let k=0;k<3;k++)vK(W,[[hx-4+k*4,hy+8],[hx-5+k*4,hy+14]],'#5a6070',2)}
  /* แขนขวา + ดาบโค้ง (ยกเมื่อชาร์จ) */{const ra=-.6-cf*1.4+Math.sin(T*1.6)*.06,ex=24,ey=-40+b,hx=ex+Math.cos(ra+1.6)*16,hy=ey+Math.sin(ra+1.6)*16;vLimb(W,[20,-58+b,ex,ey],CO,13,11);vLimb(W,[ex,ey,hx,hy],CO,11,10);bvE(W,hx,hy,4.6,4.6,SK,1);
    g.save();g.translate(hx,hy);g.rotate(ra);vS(W,[[-2,-2],[60,-6],['q',84,-10,96,-24],['q',82,0,60,4],[-2,3]],'#c8ccd8',1,1);vK(W,[[4,-1],[60,-3]],'rgba(255,255,255,.7)',1.2);vS(W,[[-10,-8],[2,-8],[2,8],[-10,8]],GD,1,1);vK(W,[[-14,0],[-4,0]],'#2a1e14',4);g.restore();
    if(cf>0)bvAdd(W,()=>glowAt(hx+Math.cos(ra)*60,hy+Math.sin(ra)*60,30,'200,220,255',.5*cf))}
  /* หัว: ผมเทา หนวดเครา ผ้าปิดตา หมวกสามมุม ขนนก */const hy=-82+b;bvE(W,0,hy,12,12.6,SK,1.2);
  vS(W,[[-12,hy+2],['q',-14,hy+18,0,hy+22],['q',14,hy+18,12,hy+2],['q',6,hy+12,0,hy+10],['q',-6,hy+12,-12,hy+2]],'#4a4450',1,1);vK(W,[[-6,hy+8],['q',0,hy+5,6,hy+8]],'#2a2630',2);
  bvDE(W,4.6,hy-1,2,2.2,'#0e0a10');vEye(W,4.6,hy-1.2,1.1,1.2,'#e8d8c0',0);vS(W,[[-9,hy-5],[-1,hy-5],[-1,hy+1],[-9,hy+1]],'#0a0a0e',1,.8);vK(W,[[-13,hy-8],[13,hy-2]],'#0a0a0e',1.4);vK(W,[[-6,hy+4],[-9,hy+12]],'rgba(140,60,60,.6)',1.2);
  vS(W,[[-20,hy-8],['q',0,hy-20,20,hy-8],['q',8,hy-12,0,hy-12],['q',-8,hy-12,-20,hy-8]],'#121016',1,1.2);vS(W,[[-11,hy-11],[-9,hy-30],[9,hy-30],[11,hy-11]],'#121016',1,1.2);vK(W,[[-19,hy-9],['q',0,hy-18,19,hy-9]],GD,1.6);
  bvDE(W,0,hy-24,3.4,3.4,'#e8e0d0');{const fw=Math.sin(T*2.4)*3;vS(W,[[4,hy-28],['q',22,hy-46+fw,34,hy-36+fw],['q',20,hy-34,4,hy-26]],'#e8e8f0',1,.9);vK(W,[[6,hy-28],['q',20,hy-40+fw,32,hy-36+fw]],'#a8a8b8',1)}
  if(!W&&!LOWQ&&cf>0){g.save();g.globalCompositeOperation='lighter';glowAt(0,-40+b,60,'150,170,255',.18*cf);g.restore()}};
BVS['กัปตันกริฟ']=1.25;
function gdlReward(){if(dgRew)return;dgRew=1;const D=DT[26],st=stCur(),sto=st&&st.g==='gdl',gd=sto?D.gold:72000;GDFX={c:[],b:[],a:[],x:[]};GDL.tl=0;
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?20:6));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?30:8+(Math.random()*6|0),'เรือดำ')}catch(e){}try{ecGive(sto?30:8+(Math.random()*5|0),'เรือดำ')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.45)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?15:6,'เรือดำ')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.gdT=Date.now();
  banner={s:'🏴 กัปตันกริฟยอมแพ้! · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?20:6),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe8b0','#ffffff','#c8d8ff','#d0c8e0'],140,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(GDLI())enterMap(39,gdlBack())},10000)}
function instRepeatGdl(){const l=Math.max(0,(me.gdT||0)+30*60000-Date.now());
  stSay([['navin','กัปตันกริฟชวนประลองดาบบนเรือดำทุกคืน… เขาบอกว่าเป็นการซ้อมรับมือวาฬ จะไปไหม?']],()=>{},{choice:[[l>0?'🏴 ดวลบนเรือดำ (อีก '+Math.ceil(l/60000)+' นาที)':'🏴 ดวลบนเรือดำ (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🏴 กริฟยังพักแผลอยู่ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(gdlEnter,250)}};return true}
setTimeout(()=>{
  try{DGTH[26]='harbor'}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=70000&&id<71000)return gdlMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(GDLI())return gdlStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(GDLI())return gdlSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(GDLI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return gdlReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=GDLI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(GDLI()){enterMap(39,gdlBack());sysMsg('🏴 ถอยกลับเรือเล็ก… คุยกับนาวินเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(GDLI()){const tl=GDL.tl?(GDL.tl<0?' · 🌊 เอียงซ้าย':' · 🌊 เอียงขวา'):'';return dg.ph==='boss'||dg.ph==='run'?'🏴 กัปตันกริฟ'+tl+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🏴 กริฟยอมแพ้แล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🏴 ดาดฟ้าเรือดำ · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(GDLI()){ov.hidden=true;sfx('gate');enterMap(39,gdlBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(gdlFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{gdlDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{gdlScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='gdl')return instRepeatGdl();return _ir(k)}}catch(e){}
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur();if(st&&st.p8c3)setTimeout(()=>{try{sdGive(10,'ของขวัญจากเรือดำ')}catch(e){}},400);if(st&&st.p8lg)setTimeout(()=>{try{sdGive(5,'ปูมเรือนาวาเมฆ')}catch(e){}},400);return _st()}}catch(e){}
},0);
