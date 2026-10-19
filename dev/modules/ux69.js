/* ===== v455 · บ้านกิลด์ รอบ 4 — ศึกมอนบุก =====
   - หัวหน้า/รองกด «⚔️ เปิดศึก» ในแท็บป้อม (บ้านขั้น 2+ · สมาชิกในบ้าน ≥3 · วันละครั้ง · ต้องซ่อมแนวป้องกันจากศึกก่อนให้เสร็จ) · นับถอยหลัง 60 วิ
   - คลื่นมอน 4+ขั้นบ้าน คลื่น บุกจากทุ่งด้านใต้ → ตีประตูเมือง/กำแพงใต้ → พังแล้ววิ่งเข้าหา «ธงศึก» หน้าอาคารหลัก · คลื่นสุดท้ายมีบอส «จอมทัพอสูร»
   - ระหว่างศึก: ประตูปิด (ผู้เล่นเดินผ่านได้ มอนผ่านไม่ได้) · ออกไปสู้ในทุ่งด้านใต้ได้ · เขตปลอดภัยปิด
   - ป้อมยิงเอง (ธนู/ไฟเป็นวง/น้ำแข็งทำให้ช้า/หินยักษ์เน้นตัวใหญ่) · ทหารหอกออกไปรับ · นักธนูยิง · นักบวชฮีลทหาร+ผู้เล่น · ทหารที่ตายหายจากค่าย
   - โฮสต์ของแมพจำลองศึก ส่งสถานะผ่านเซิร์ฟเวอร์ทุก 0.3 วิ · โฮสต์หลุด → คนใหม่รับช่วงต่อจากสถานะล่าสุด */
const GRD={id:'',ph:'',fin:0,nid:0,q:[],tc:{},sol:null,so:null,wt:0,sT:0,st:0,res:null,boss0:null,sr0:760,cf:''};
const GHFX={x:0,y:-150};
const ghrOn=()=>!!(GRD.id&&!GRD.fin&&(GRD.ph==='cd'||GRD.ph==='run'));
const ghrHere=()=>ghrOn()&&ghHere();
function ghrSet(v){if(!v||!v.id)return;const nw=GRD.id!==v.id;if(nw){Object.assign(GRD,{id:v.id,fin:0,nid:0,q:[],tc:{},sol:null,so:null,wt:0,sT:0,res:null,bossOn:0});GRD.st=Date.now()+(v.in|0)}
  ['ph','w','W','gate','gm','wall','wm','flag','fm','L','np','sw'].forEach(k=>{if(v[k]!=null)GRD[k]=v[k]});if(v.tt!=null)GRD.t=v.tt;if(v.bx!=null)GRD.bx=v.bx;else if(nw)GRD.bx=null;
  if(Array.isArray(v.so))GRD.so=v.so;if(nw)ghrSetup()}
function ghrBossDef(){let best=null,bd=1e9;for(let i=1;i<=33;i++){const B=MAPS[i]&&MAPS[i].boss;if(!B||!(B.hp>1)||!(B.x>0))continue;const d=Math.abs((B.L|0)-GRD.L);if(d<bd){bd=d;best=B}}
  const B=Object.assign({},best||{n:'',hp:20000,xp:2000,L:GRD.L,rm:2,g:500,dm:6,tn:3,sm:1,col:'#6a2a2a',bar:'#c84a3a',ln:'#ff9a7a',rec:'',pos:''});
  return Object.assign(B,{x:-9999,y:-9999,n:'👹 จอมทัพอสูร',hp:Math.round((B.hp||20000)*(1+.4*Math.max(0,(GRD.np|0)-1))*(.8+.1*(GRD.t|2))),pos:' หน้าประตูเมือง',rec:'ช่วยกันทั้งกิลด์'})}
function ghrSetup(){try{const M=ghHere()&&MAPS[curMap];if(M){if(!GRD.boss0)GRD.boss0=M.boss;M.boss=ghrBossDef()}}catch(e){}}
function ghrClean(){try{if(ghHere()){const M=MAPS[curMap];if(GRD.boss0)M.boss=GRD.boss0;SR=M.sr;mons=mons.filter(m=>!(m.id>=900000));if(me.y>1600+412){me.x=1600;me.y=1600+372}}}catch(e){}GRD.boss0=null}
/* ---------- โฮสต์: จำลองศึก ---------- */
const ghrAlive=()=>mons.filter(m=>m.id>=900000&&m.hp>0);
function ghrMh0(){return mhp(0,GRD.L|0||30)}
function ghrSolInit(){const H=GDS.g&&GDS.g.hq,L=GRD.L|0||30,t=GRD.t|0||2,S=[];const mh={sp:50*L*(1+.1*t),ar:25*L,pr:22*L};
  if(Array.isArray(GRD.so)&&GRD.so.length){GRD.so.forEach((q,i)=>{if(!q)return;const k=q[0];S.push({k,i,x:1600+q[1],y:1600+q[2],px:1600+(GHSP[k][S.filter(o=>o.k===k).length]||[0,0])[0],py:1600+(GHSP[k][S.filter(o=>o.k===k).length]||[0,0])[1],mh:mh[k],hp:mh[k]*q[3]/100,cd:0,fx:1})})}
  else if(H){['sp','ar','pr'].forEach(k=>{const n=Math.min(16,(H.sol&&H.sol[k])|0);for(let i=0;i<n;i++){const P=GHSP[k][i];if(!P)continue;S.push({k,i,x:1600+P[0],y:1600+P[1],px:1600+P[0],py:1600+P[1],mh:mh[k],hp:mh[k],cd:Math.random(),fx:P[0]<0?1:-1})}})}
  GRD.sol=S}
function ghrSpawnWave(w){const t=GRD.t|0||2,np=Math.max(1,1+Object.keys(others).length),L=GRD.L|0||30,boss=w>=GRD.W;let n=Math.min(45,Math.round((6+2*w+3*t)*(.5+.25*np)));if(boss)n=Math.round(n*.6);
  const now=performance.now();for(let i=0;i<n;i++){const r=Math.random(),tt=r<.1+.03*w?2:r<.45?1:0;GRD.q.push({at:now+i*(4000/n),t:tt,L,x:1600+(Math.random()*1120-560),y:1600+640+Math.random()*140})}
  if(boss)GRD.q.push({at:now+1500,boss:1});
  try{fx({k:'msg',s:boss?'👹 คลื่นสุดท้าย! จอมทัพอสูรบุกมาแล้ว!':'⚔️ คลื่นที่ '+w+'/'+GRD.W+' กำลังบุก!'})}catch(e){}}
function ghrPop(){const now=performance.now();while(GRD.q.length&&GRD.q[0].at<=now){const e=GRD.q.shift(),id=900000+(++GRD.nid);
  if(e.boss){const B=BS(),hp=Math.round(B.hp);B.x=1600;B.y=2330;mons.push({id,x:B.x,y:B.y,tx:B.x,ty:B.y,t:3,L:B.L,p:1,hx:B.x,hy:B.y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,a1:4,a2:9,tl:[],enr:0});try{sfx('boss')}catch(e2){}continue}
  const hp=mhp(e.t,e.L);mons.push({id,x:e.x,y:e.y,tx:e.x,ty:e.y,t:e.t,L:e.L,p:0,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,esc:1})}}
function ghrStruct(m,dt,dmg,which){if(m.ac>0)return;m.ac=1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();
  if(which==='gate'){GRD.gate=Math.max(0,GRD.gate-dmg);const gl=(GDS.g&&GDS.g.hq&&GDS.g.hq.gl)|0;if(gl>=5){m.hp-=m.mh*.02*(gl-4);m.hitT=performance.now()}if(GRD.gate<=0&&GRD.bx==null){GRD.bx=0;try{fx({k:'msg',s:'💥 ประตูเมืองพังแล้ว! ปกป้องธงศึก!'})}catch(e){}}}
  else if(which==='wall'){GRD.wall=Math.max(0,GRD.wall-dmg);if(GRD.wall<=0&&GRD.bx==null){GRD.bx=Math.max(-520,Math.min(520,Math.round(m.x-1600)));try{fx({k:'msg',s:'💥 กำแพงทะลุแล้ว! ปกป้องธงศึก!'})}catch(e){}}}
  else{GRD.flag=Math.max(0,GRD.flag-dmg)}
  try{fx({k:'ghhit',x:Math.round(m.x),y:Math.round(m.y-10)})}catch(e){}}
function ghrMon(m,dt,pl,spd){if(m.hp<=0)return true;const out=y=>y>1600+430,pre=GRD.bx==null;if(pre&&m.tg){const p=pl.find(q=>q.u===m.tg);if(p&&out(p.y)!==out(m.y)){m.tg=null;m.tt=0}}for(const p of pl){if(Math.hypot(p.x-m.x,p.y-m.y)<145&&(!pre||out(p.y)===out(m.y)))return false}
  const X=1600,Y=1600,t=GRD.t|0||2,sd=[18,26,45][m.t|0]*(1+.1*t);
  /* ทหาร */
  if(GRD.sol){let b=null,bd=120;for(const s of GRD.sol){if(s.hp<=0)continue;const d=Math.hypot(s.x-m.x,s.y-m.y);if(d<bd){bd=d;b=s}}
    if(b){if(bd>34)moveTo(m,b.x,b.y,spd*dt);else if(m.ac<=0){m.ac=.9;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();b.hp-=Math.round((4+2*m.L)*(m.dmx||1))}return true}}
  if(GRD.bx==null){if(m.gx===undefined)m.gx=Math.max(-540,Math.min(540,Math.round(m.x-X)));const gate=Math.abs(m.gx)<170,tx=X+(gate?Math.max(-58,Math.min(58,m.gx)):m.gx),ty=Y+458;
    if(Math.hypot(tx-m.x,ty-m.y)>8)moveTo(m,tx,ty,spd*dt);else ghrStruct(m,dt,sd,gate?'gate':'wall');return true}
  const bx=X+GRD.bx;let tx,ty;if(m.y>Y+440&&Math.abs(m.x-bx)>14){tx=bx+(m.x<bx?-6:6)*0;ty=Y+452}else{tx=X+GHFX.x;ty=Y+GHFX.y+20}
  if(Math.hypot(tx-m.x,ty-m.y)>(ty<Y?30:6))moveTo(m,tx,ty,spd*dt);else if(ty<Y)ghrStruct(m,dt,sd*1.5,'flag');return true}
escMon=(f=>function(m,dt,pl,spd){try{if(m&&m.id>=900000&&ghrHere())return ghrMon(m,dt,pl,spd)}catch(e){}return f.apply(this,arguments)})(escMon);
function ghrTowers(dt){const H=GDS.g&&GDS.g.hq;if(!H||!Array.isArray(H.tw))return;const A=ghrAlive(),mh0=ghrMh0();if(!A.length)return;
  H.tw.forEach((T,i)=>{if(!T||!GHTS[i])return;GRD.tc[i]=(GRD.tc[i]||0)-dt;if(GRD.tc[i]>0)return;const sx=1600+GHTS[i][0],sy=1600+GHTS[i][1]-34-T.lv*3;
    const rg={ar:400,fi:360,ic:320,ca:520}[T.k]||400;let L=A.filter(m=>Math.hypot(m.x-sx,m.y-sy-30)<rg).sort((a,b)=>Math.hypot(a.x-sx,a.y-sy)-Math.hypot(b.x-sx,b.y-sy));if(!L.length)return;
    if(T.k==='ca')L.sort((a,b)=>(b.t===3?1e12:b.hp)-(a.t===3?1e12:a.hp));
    const tg=L[0],hit=(m,d)=>{m.hp-=d;m.hitT=performance.now()};
    if(T.k==='ar'){GRD.tc[i]=1;hit(tg,.05*T.lv*mh0)}
    else if(T.k==='fi'){GRD.tc[i]=1.6;A.forEach(m=>{if(Math.hypot(m.x-tg.x,m.y-tg.y)<80)hit(m,.035*T.lv*mh0)})}
    else if(T.k==='ic'){GRD.tc[i]=1.2;L.slice(0,3).forEach(m=>{hit(m,.012*T.lv*mh0);m.sl=Math.max(m.sl||0,1.2)})}
    else{GRD.tc[i]=4;hit(tg,.22*T.lv*mh0)}
    try{fx({k:'ght'+T.k,x:Math.round(sx),y:Math.round(sy),a:Math.atan2(tg.y-12-sy,tg.x-sx),len:Math.round(Math.hypot(tg.x-sx,tg.y-12-sy))})}catch(e){}})}
function ghrSoldiers(dt){if(!GRD.sol)return;const A=ghrAlive(),mh0=ghrMh0(),X=1600,Y=1600;
  GRD.sol.forEach(s=>{if(s.hp<=0)return;s.cd-=dt;s.mv=0;
    if(s.k==='sp'){let b=null,bd=280;for(const m of A){const d=Math.hypot(m.x-s.px,m.y-s.py);if(d<bd&&Math.hypot(m.x-s.x,m.y-s.y)<330){bd=d;b=m}}
      if(b){const d=Math.hypot(b.x-s.x,b.y-s.y);if(d>44){const ox=s.x;moveTo(s,b.x,Math.min(b.y,Y+420),120*dt);s.mv=s.x-ox}else if(s.cd<=0){s.cd=.8;b.hp-=.08*mh0;b.hitT=performance.now();s.fx=b.x<s.x?-1:1}}
      else{const ox=s.x;moveTo(s,s.px,s.py,90*dt);s.mv=s.x-ox;s.hp=Math.min(s.mh,s.hp+s.mh*.02*dt)}
      s.y=Math.min(s.y,Y+420);if(GRD.bx==null&&s.y>Y+400)s.y=Math.min(s.y,Y+420)}
    else if(s.k==='ar'){let b=null,bd=400;for(const m of A){const d=Math.hypot(m.x-s.x,m.y-s.y);if(d<bd){bd=d;b=m}}if(b&&s.cd<=0){s.cd=1.1;b.hp-=.05*mh0;b.hitT=performance.now();s.fx=b.x<s.x?-1:1;s.sh=performance.now()/1000;try{fx({k:'ghtar',x:Math.round(s.x),y:Math.round(s.y-26),a:Math.atan2(b.y-12-s.y+26,b.x-s.x),len:Math.round(bd)})}catch(e){}}}
    else if(s.cd<=0){s.cd=2.5;let lo=null,lv=1;for(const o of GRD.sol){if(o.hp<=0||Math.hypot(o.x-s.x,o.y-s.y)>300)continue;const v=o.hp/o.mh;if(v<lv){lv=v;lo=o}}if(lo)lo.hp=Math.min(lo.mh,lo.hp+lo.mh*.12);try{fx({k:'ghh',x:Math.round(s.x),y:Math.round(s.y),r:260})}catch(e){}}})}
function ghrPack(){const so=(GRD.sol||[]).map(s=>[s.k,Math.round(s.x-1600),Math.round(s.y-1600),Math.max(0,Math.min(100,Math.round(s.hp/s.mh*100)))]);GRD.so=so;
  return{id:GRD.id,w:GRD.w|0,sw:GRD.sw?1:0,gate:Math.round(GRD.gate),wall:Math.round(GRD.wall),flag:Math.round(GRD.flag),bx:GRD.bx,so}}
function ghrSend(){gdEmit('hrt',ghrPack())}
function ghrHost(dt){if(!ghrHere()||!isHost())return;const now=Date.now();if(GRD.ph==='cd'){if(now<GRD.st)return;GRD.ph='run'}
  if(!GRD.sol){ghrSolInit();mons.forEach(m=>{if(m.id>=900000)GRD.nid=Math.max(GRD.nid,m.id-900000)})}mons.forEach(m=>{if(m.id>=900000&&m.t!==3)m.esc=1});ghrPop();GRD.wt+=dt;
  const A=ghrAlive().length,go=w=>{GRD.w=w;GRD.sw=1;GRD.wt=0;ghrSpawnWave(w)};if((GRD.w|0)<1)go(1);else if(!GRD.sw)go(GRD.w);else if(GRD.w<GRD.W&&!GRD.q.length&&(A===0||GRD.wt>55))go(GRD.w+1);
  if(GRD.bx==null)mons.forEach(m=>{if(m.id>=900000&&m.y<1600+452)m.y=1600+452});ghrTowers(dt);ghrSoldiers(dt);
  if(GRD.flag<=0){GRD.fin=1;gdEmit('hre',Object.assign(ghrPack(),{res:'l',flag:0}));return}
  if(GRD.w>=GRD.W&&GRD.sw&&!GRD.q.length&&A===0&&GRD.wt>1){GRD.fin=1;gdEmit('hre',Object.assign(ghrPack(),{res:'w'}));return}
  GRD.sT-=dt;if(GRD.sT<=0){GRD.sT=.3;ghrSend()}}
simHost=(f=>function(dt){const r=f.apply(this,arguments);try{ghrHost(dt)}catch(e){console.warn('ghr',e)}return r})(simHost);
/* ---------- ผู้เล่น: เดินออกทุ่งได้ · ผ่านกำแพงได้เฉพาะประตู/รอยทะลุ ---------- */
ghCollide=(f=>function(){if(!ghrHere())return f.apply(this,arguments);if(SR!==0)SR=0;
  me.x=Math.max(1600-578,Math.min(1600+578,me.x));me.y=Math.max(1600-444,Math.min(1600+760,me.y));
  if(me.y>1600+410&&me.y<1600+452){const ok=Math.abs(me.x-1600)<64||(GRD.bx!=null&&Math.abs(me.x-1600-GRD.bx)<44);if(!ok)me.y=me.y<1600+431?1600+410:1600+452}
  if(me.y<1600+408)f.apply(this,arguments)})(ghCollide);
/* ---------- วาด ---------- */
function ghrDraw(now){if(!ghrOn())return;const X=1600,Y=1600,O='#1a120a',t=ghT(),G=GDS.g,col=G?gdCol(G.col):'#c84a3a';
  /* ประตูปิด */
  {const y=Y+430,h=t>=4?58:t>=3?48:t===2?46:28;if(GRD.gate>0){g.fillStyle=t>=4?'#4a4a52':'#5a3a1e';g.fillRect(X-64,y-h,128,h);g.strokeStyle=O;g.lineWidth=1;g.strokeRect(X-64,y-h,128,h);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(X-1,y-h,2,h);
      g.fillStyle=t>=4?'#8a8a92':'#3a3a3a';for(let k=1;k<4;k++)g.fillRect(X-64,y-h+k*h/4-2,128,3);g.fillStyle='#e8c060';g.beginPath();g.arc(X-8,y-h/2,2.5,0,7);g.arc(X+8,y-h/2,2.5,0,7);g.fill()}
    else{g.fillStyle='#4a3018';[[-50,-6,30,8,.3],[22,-4,34,7,-.4],[-12,-10,20,6,.9]].forEach(([a,b,w,hh,r])=>{g.save();g.translate(X+a,y+b);g.rotate(r);g.fillRect(-w/2,-hh/2,w,hh);g.restore()})}
    ghrBar(X,y-h-14,90,GRD.gate/GRD.gm,'🚪 ประตู','#e8b54a')}
  /* กำแพงทะลุ */
  if(GRD.wall<=0&&GRD.bx!=null&&GRD.bx!==0){const x=X+GRD.bx,y=Y+430;g.fillStyle='#3a3226';g.beginPath();g.moveTo(x-46,y);g.lineTo(x-40,y-30);g.lineTo(x-14,y-18);g.lineTo(x,y-40);g.lineTo(x+18,y-16);g.lineTo(x+44,y-28);g.lineTo(x+48,y);g.closePath();g.fill();for(let k=0;k<7;k++){g.fillStyle=k%2?'#8a8478':'#6e685c';g.beginPath();g.ellipse(x-36+k*12,y-4+(k%3)*2,6,4,0,0,7);g.fill()}}
  ghrBar(X-330,Y+430-(t>=4?86:70),90,GRD.wall/GRD.wm,'🧱 กำแพง','#c8a870');ghrBar(X+330,Y+430-(t>=4?86:70),90,GRD.wall/GRD.wm,'🧱 กำแพง','#c8a870');
  /* ธงศึก */
  {const x=X+GHFX.x,y=Y+GHFX.y,fl=GRD.flag/GRD.fm;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+3,18,6,0,0,7);g.fill();g.fillStyle='#6e685c';g.fillRect(x-14,y-8,28,10);g.strokeStyle=O;g.lineWidth=.8;g.strokeRect(x-14,y-8,28,10);
    const hh=120*(fl>0?1:.35);g.fillStyle='#e8c060';g.fillRect(x-2.5,y-8-hh,5,hh);if(fl>0){g.beginPath();g.moveTo(x+2,y-hh);for(let s=0;s<=8;s++){const u=s/8;g.lineTo(x+2+u*58,y-hh+Math.sin(now*4+u*4)*4*u)}for(let s=8;s>=0;s--){const u=s/8;g.lineTo(x+2+u*58,y-hh+38+Math.sin(now*4+u*4)*4*u)}g.closePath();g.fillStyle=col;g.fill();g.stroke();
      g.font='bold 20px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(G?G.e:'🏰',x+30,y-hh+19);g.textBaseline='alphabetic'}
    ghrBar(x,y-8-hh-16,80,fl,'🚩 ธงศึก','#ff6a5a')}}
function ghrBar(x,y,w,v,lb,c){v=Math.max(0,Math.min(1,v||0));g.fillStyle='rgba(10,8,14,.78)';g.beginPath();g.roundRect(x-w/2,y,w,9,4);g.fill();g.fillStyle=v>.3?c:'#ff4a3a';g.beginPath();g.roundRect(x-w/2+1.5,y+1.5,(w-3)*v,6,3);g.fill();g.font='bold 9px system-ui';g.textAlign='center';g.fillStyle='#fff3d8';g.fillText(lb+' '+Math.round(v*100)+'%',x,y-3)}
ghSolList=(f=>function(H,now){if(!ghrOn()||!(GRD.ph==='run'))return f.apply(this,arguments);const host=isHost()&&GRD.sol,L=[];
  if(host)GRD.sol.forEach((s,i)=>{if(s.hp>0)L.push({k:s.k,i,x:s.x,y:s.y,mx:s.mv?s.mv*6:null,fx:s.fx||1,hp:Math.round(s.hp/s.mh*100),sh:s.sh})});
  else if(Array.isArray(GRD.so)){GRD.lp=GRD.lp||{};GRD.so.forEach((q,i)=>{if(!q||q[3]<=0)return;const tx=1600+q[1],ty=1600+q[2],P=GRD.lp[i]||(GRD.lp[i]={x:tx,y:ty});const ox=P.x;P.x+=(tx-P.x)*.15;P.y+=(ty-P.y)*.15;L.push({k:q[0],i,x:P.x,y:P.y,mx:Math.abs(P.x-ox)>.3?(P.x-ox)*12:null,fx:tx<P.x?-1:1,hp:q[3]})})}
  else return f.apply(this,arguments);return L})(ghSolList);
ghDraw2=(f=>function(t,col,now){const r=f.apply(this,arguments);try{ghrDraw(now)}catch(e){}return r})(ghDraw2);
/* HUD จอ */
function ghrHud(){if(!ghrOn()||!me.cls||(typeof PH!=='undefined'&&PH.on))return;const here=ghHere();g.save();g.setTransform(DPR,0,0,DPR,0,0);const y=(typeof FEVC!=='undefined'&&FEVC?48:12)+56;
  let s;if(GRD.ph==='cd'||Date.now()<GRD.st){const n=Math.max(0,Math.ceil((GRD.st-Date.now())/1000));s='⚔️ ศึกมอนบุกเริ่มใน '+n+' วิ'+(here?' · เตรียมตัว!':' · รีบกลับบ้านกิลด์!')}
  else s='⚔️ คลื่น '+(GRD.w|0)+'/'+(GRD.W|0)+' · 🚪'+Math.round(100*GRD.gate/GRD.gm)+'% 🧱'+Math.round(100*GRD.wall/GRD.wm)+'% 🚩'+Math.round(100*GRD.flag/GRD.fm)+'%'+(here?'':' · ไปช่วยที่บ้านกิลด์!');
  g.font='bold 12px system-ui';g.textAlign='center';g.textBaseline='middle';const tw=g.measureText(s).width+24;g.fillStyle='rgba(40,10,8,.82)';g.beginPath();g.roundRect(W/2-tw/2,y,tw,22,11);g.fill();g.strokeStyle='#ff8a5a';g.lineWidth=1;g.stroke();g.fillStyle='#ffe6d0';g.fillText(s,W/2,y+11);g.restore()}
{const o=vigDraw;vigDraw=function(){const r=o.apply(this,arguments);try{ghrHud()}catch(e){}return r}}
/* เอฟเฟกต์ยิง */
setTimeout(()=>{try{Object.assign(FXD,{ghtar:.35,ghtfi:.5,ghtic:.45,ghtca:.8,ghh:.8,ghhit:.35});Object.assign(FXTOP,{ghtar:1,ghtfi:1,ghtic:1,ghtca:1,ghhit:1})}catch(e){}},0);
const ghShot=(f,p,x,y,col,w,head)=>{const a=f.a||0,L=f.len||100,ex=x+Math.cos(a)*L*p,ey=y+Math.sin(a)*L*p-Math.sin(p*Math.PI)*(head==='ca'?60:0);return[ex,ey]};
FXB.ghtar=(f,p,x,y)=>{const[ex,ey]=ghShot(f,p,x,y);const a=f.a||0;g.save();g.translate(ex,ey);g.rotate(a);g.strokeStyle='#7a5530';g.lineWidth=1.8;g.beginPath();g.moveTo(-12,0);g.lineTo(4,0);g.stroke();g.fillStyle='#e6edf0';g.beginPath();g.moveTo(7,0);g.lineTo(1,-3);g.lineTo(1,3);g.closePath();g.fill();g.restore()};
FXB.ghtfi=(f,p,x,y)=>{const[ex,ey]=ghShot(f,p,x,y);g.save();g.globalCompositeOperation='lighter';glowAt(ex,ey,p>.85?60:18,'255,120,40',.8);if(p>.85){g.strokeStyle='rgba(255,170,80,'+(1-p)*5+')';g.lineWidth=3;g.beginPath();g.arc(ex,ey,80*(p-.85)/.15,0,7);g.stroke()}g.restore()};
FXB.ghtic=(f,p,x,y)=>{const[ex,ey]=ghShot(f,p,x,y);g.save();g.globalCompositeOperation='lighter';glowAt(ex,ey,16,'140,220,255',.8);g.fillStyle='#e8f8ff';g.beginPath();g.arc(ex,ey,3,0,7);g.fill();g.restore()};
FXB.ghtca=(f,p,x,y)=>{const[ex,ey]=ghShot(f,p,x,y,0,0,'ca');g.save();g.fillStyle='#7a746a';g.beginPath();g.arc(ex,ey,7,0,7);g.fill();g.strokeStyle='#1a120a';g.lineWidth=1;g.stroke();if(p>.9){g.globalAlpha=(1-p)*10;g.fillStyle='rgba(120,100,80,.6)';g.beginPath();g.arc(ex,ey,30,0,7);g.fill()}g.restore()};
FXB.ghh=(f,p,x,y,r)=>{g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,236,160,'+(1-p)*.7+')';g.lineWidth=3;g.beginPath();g.ellipse(x,y+6,(r||260)*p,(r||260)*p*.4,0,0,7);g.stroke();glowAt(x,y-30,30,'255,236,170',(1-p)*.6);g.restore()};
FXB.ghhit=(f,p,x,y)=>{g.save();g.globalAlpha=1-p;g.fillStyle='#d8c8a0';for(let k=0;k<5;k++){const a=k*1.26+f.s;g.beginPath();g.arc(x+Math.cos(a)*12*p,y+Math.sin(a)*8*p-6*p,2.4,0,7);g.fill()}g.restore()};
handleFx=(f=>function(o){try{if(o&&o.k==='ghh'&&me.cls&&me.hp>0&&me.down<=0&&ghHere()&&Math.hypot(me.x-o.x,me.y-o.y)<(o.r||260)){me.hp=Math.min(me.mh,me.hp+me.mh*.06);dn.push({x:me.x,y:me.y-40,v:'+'+Math.round(me.mh*.06),t:.9,col:'#9fe89f'})}}catch(e){}return f.apply(this,arguments)})(handleFx);
/* ---------- ข้อความ ---------- */
gdN=(f=>function(d){try{if(d&&(d.t==='hrs'||d.t==='hrx'||d.t==='hrd')){const G=GDS.g,tg=G?'🏰['+G.tag+'] ':'🏰 ';
  if(d.t==='hrs'){ghrSet(d);banner={s:'⚔️ '+d.n+' เปิดศึกมอนบุก! เริ่มใน '+Math.ceil((d.in|0)/1000)+' วิ · '+(ghHere()?'ประจำตำแหน่ง!':'รีบกลับบ้านกิลด์!'),t:6};try{sysMsg(tg+'⚔️ '+d.n+' เปิดศึกมอนบุก! มาช่วยกันที่บ้านกิลด์')}catch(e){}try{sfx('boss')}catch(e){}return}
  if(d.t==='hrx'){if(!isHost()||!ghHere())ghrSet(d);else if(d.id===GRD.id&&!GRD.sol)ghrSet(d);return}
  if(d.t==='hrd'){const res=d.res,wn=res==='win';GRD.fin=1;GRD.res=d;ghrClean();
    if(d.me&&d.rw&&d.id&&!GH2.got.has(d.id)){GH2.got.add(d.id);me.gold+=d.rw.g|0;try{writeSave()}catch(e){}}
    const L=[];if(wn)L.push('🏆 ชนะศึก! ป้องกันได้ครบ '+d.W+' คลื่น');else if(res==='lose')L.push('💀 ธงศึกล้ม · แพ้ที่คลื่น '+d.w+'/'+d.W);else L.push('⚠️ ศึกถูกยุติ'+(d.why?' ('+d.why+')':''));
    if(d.rw)L.push('🎁 คลัง +'+(d.rw.fund|0).toLocaleString()+' · 🪵 +'+(d.rw.wood|0)+(d.me?' · คุณได้ 💰 '+(d.rw.g|0).toLocaleString()+' + แต้มกิลด์ '+(d.rw.pt|0):''));else if(wn)L.push('(รางวัลเต็มเฉพาะ 3 ศึกแรกของสัปดาห์)');
    if(d.rp)L.push('🛠️ ค่าซ่อม '+(d.rp|0).toLocaleString()+' ทอง');const ls=d.lost||{},lt=Object.keys(ls).filter(k=>ls[k]>0).map(k=>GHSO[k][0]+'×'+ls[k]);if(lt.length)L.push('⚰️ ทหารเสียชีวิต '+lt.join(' '));
    banner={s:L.join(' · '),t:9};try{sysMsg(tg+L.join(' · '))}catch(e){}try{sfx(wn?'lvl':'fail')}catch(e){}if(wn)try{GHS.fw=Date.now()+5000}catch(e){}if(ov.dataset.k==='gh'&&!ov.hidden)ghUI(L.join('<br>'));return}}}catch(e){}return f.apply(this,arguments)})(gdN);
gdR=(f=>function(d){const r=f.apply(this,arguments);try{const H=GDS.g&&GDS.g.hq,R=H&&H.rd;if(R&&(R.ph==='cd'||R.ph==='run')){if(R.id!==GRD.id)ghrSet(R);else if(!(isHost()&&ghHere()))ghrSet(R)}else if(GRD.id&&!GRD.fin&&!R){GRD.fin=1;ghrClean()}}catch(e){}return r})(gdR);
/* เข้า/ออกแมพระหว่างศึก */
enterMap=(f=>function(id,arr){const r=f.apply(this,arguments);try{if(ghrOn()){if(ghHere()){SR=0;ghrSetup();GRD.sol=null}}}catch(e){}return r})(enterMap);
/* ---------- แท็บป้อม: การ์ดศึก ---------- */
ghDefBody=(f=>function(G,H,t,col){let h='';const R=H.rd,r1=G.r>=1,np=ghHere()?1+Object.keys(others).length:0,RB=H.rb;
  h+='<div class="card" style="text-align:left;border-color:#ff8a5a88"><div class="cap">⚔️ ศึกมอนบุก</div>';
  if(R&&(R.ph==='cd'||R.ph==='run'))h+='<b style="color:#ff9a7a">กำลังมีศึก! คลื่น '+(R.w|0)+'/'+R.W+'</b><small style="display:block;opacity:.8">ประตู '+Math.round(100*R.gate/R.gm)+'% · กำแพง '+Math.round(100*R.wall/R.wm)+'% · ธงศึก '+Math.round(100*R.flag/R.fm)+'%</small>';
  else{const cf=GRD.cf==='go';
    h+='<small style="display:block;opacity:.8;margin-bottom:4px">มอน '+(4+t)+' คลื่นบุกจากทุ่งด้านใต้ ตีประตู/กำแพง แล้ววิ่งเข้าหาธงศึก · คลื่นสุดท้ายมีจอมทัพอสูร · ป้อมกับทหารช่วยสู้ · ธงล้ม = แพ้ (เสียค่าซ่อม) · ทหารที่ตายต้องจ้างใหม่</small>'+
      '<div style="font-size:12px">'+(t>=2?'✅':'⬜')+' บ้านขั้น 2+ &nbsp; '+(np>=3?'✅':'⬜')+' สมาชิกในบ้าน '+np+'/3 &nbsp; '+(H.rdd?'⬜ วันนี้เปิดไปแล้ว':'✅ วันนี้ยังไม่ได้เปิด')+(H.rp?'<br>⬜ ค่าซ่อมค้าง '+(H.rp|0).toLocaleString()+' ทอง':'')+'</div>'+
      '<small style="display:block;opacity:.75">รางวัลเต็ม 3 ศึกแรกของสัปดาห์ (ใช้ไปแล้ว '+(H.rw|0)+'/3) · ชนะ = คลัง + ไม้ + ทอง/แต้มกิลด์ให้ทุกคนที่อยู่ในบ้าน</small>';
    if(r1){if(H.rp)h+='<button class="pri" data-gh2="rr" style="margin-top:4px"'+((H.f|0)>=H.rp?'':' disabled')+'>🛠️ ซ่อมแนวป้องกัน ('+(H.rp|0).toLocaleString()+' ทอง)</button>';
      h+='<button class="pri" data-gh2="rs" style="margin-top:4px;background:linear-gradient(#c8402a,#8a2414)"'+(t>=2&&!H.rdd&&!H.rp?'':' disabled')+'>'+(cf?'⚠️ ยืนยันเปิดศึก! (นับถอยหลัง 60 วิ)':'⚔️ เปิดศึก')+'</button>'}
    else h+='<small style="opacity:.7">หัวหน้า/รองเป็นคนเปิดศึก</small>'}
  h+='</div>';
  const K=H.rkl||[];h+='<div class="card" style="text-align:left"><div class="cap">🏆 อันดับป้องกันเมือง (สัปดาห์นี้ · ทุกกิลด์)</div>'+(RB?'<small style="display:block;opacity:.8">กิลด์เรา: '+RB.s+' แต้ม · คลื่น '+RB.w+'/'+RB.W+(RB.win?' · ชนะ':'')+'</small>':'')+
    (K.length?K.map((r,i)=>'<div style="display:flex;gap:8px;font-size:12.5px;padding:2px;'+(r[7]?'color:'+col+';font-weight:700':'')+'"><span style="width:22px">'+(i<3?['🥇','🥈','🥉'][i]:(i+1)+'.')+'</span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">['+esc(r[0])+'] '+esc(r[1])+'</span><small>ขั้น '+r[6]+' · '+r[3]+'/'+r[4]+(r[5]?' ✅':'')+'</small><b>'+r[2]+'</b></div>').join(''):'<small style="opacity:.6">ยังไม่มีกิลด์ไหนลงศึกสัปดาห์นี้</small>')+
    '<small style="display:block;opacity:.6;margin-top:3px">แต้ม = ขั้นบ้าน×100 + คลื่น×10 + ชนะ 50 + ธงที่เหลือ</small></div>';
  return h+f.apply(this,arguments)})(ghDefBody);
ghAct2=(f=>function(a){if(a==='rs'){if(GRD.cf!=='go'){GRD.cf='go';ghUI();return}GRD.cf='';gdEmit('hrs');ghUI('⏳ กำลังเปิดศึก…');return}if(a==='rr'){gdEmit('hrr');return}return f.apply(this,arguments)})(ghAct2);
