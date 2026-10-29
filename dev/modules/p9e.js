/* ---------- v541 ภาค 9 บทที่ 4 «ภาพสะท้อนในตาข่าย» ----------
   เนื้อเรื่อง 5 ขั้น (ต่อจาก p9c3): เซเลสต์ (แมพ 42) → เศษกระจกภาพสะท้อน 3 ชิ้นบนหมุดยึด (ความทรงจำของโอเรียน) → ลูมิน่าเปิดทางที่ใจกลาง
   → ดันเจี้ยน «ใจกลางตาข่าย» (ห้อง 49000–49999 · DT[30]) บอส «ภาพสะท้อนโอเรียน» → เซเลสต์คุยกับภาพสะท้อนของอาจารย์ · ฉายา «ผู้มองเห็นภาพสะท้อน»
   กลไกบอส: ซี่ใยกระตุก (3 เส้นเรืองเตือน แล้วแรงกระตุกวิ่งออก) · เงาแห่งความกลัว (บ่อแสงดาว 3 บ่อ ใครไม่อยู่ในแสงโดนความมืด) ·
   เลือด 50% ภาพสะท้อนหลบเข้ากระจก 4 บาน (ทุบกระจกให้หมด ไม่งั้นเลือดไม่ลด) · 70%/30% แมงมุมทอแสงออกมาช่วย
   ผลจากทางเลือกเดิม: q9=1 (ผู้ทอตื่น) บอสเลือด +15% ด้ายกระตุกถี่ขึ้น · q9=2 (แอบเข้า) บอสยังไม่ตื่นเต็มที่ เริ่มที่เลือด 88% และ 10 วิแรกไม่กระตุกด้าย
   e8=1 (ปล่อยวาฬ) วาฬดาวว่ายผ่านทุก ~22 วิ ดึงตาข่ายขาด: ยกเลิกด้ายที่กำลังเตือน + บอสเสียเลือด 2.5% */
setTimeout(()=>{DT[30]={n:'ใจกลางตาข่าย',lv:1,L:154,bL:22,hp:12500000,xp:1200000,g:150000,dm:78,tn:10,sm:0,rm:4,lg:1,tm:960,gold:1050000,exp:9000000}},0);
const CWNI=()=>!!(MAPS[curMap]&&MAPS[curMap].cwn),cwnBack=()=>{const N=MAPS[42]&&MAPS[42].npc;return N?{x:N.x-70,y:N.y+30}:{x:1600,y:1650}};
const CWR=540,CWSP=[0,1,2,3,4,5,6,7].map(k=>k*Math.PI/4);
let CWN={ph:0,st:9,sp:[],spt:0,fp:[],ft:20,fs:0,a7:0,a3:0,a5:0,mr:0,wh:22,bt:0,wk:0},CWNFX={sp:null,fp:null,wh:0,fx:[]},CWH={};
const cwnReset=()=>{CWN={ph:0,st:9,sp:[],spt:0,fp:[],ft:20,fs:0,a7:0,a3:0,a5:0,mr:0,wh:22,bt:0,wk:0};CWNFX={sp:null,fp:null,wh:0,fx:[]};CWH={}};
const CWN_IN=[['nar','ดักแด้ที่เปิดออกไม่ได้นำไปไหนเลย… มันนำ «เข้าไปข้างใน» ด้ายทุกเส้นในทุ่งตาข่ายมารวมกันที่นี่ เป็นลานกลมสีเงินลอยอยู่ในความมืดสนิท'],
  ['nar','กลางลาน ชายสวมมงกุฎยืนหันหลังให้ ร่างของเขาเป็นกระจก… มองไปทางไหนก็เห็นแต่เงาของตัวเองสะท้อนอยู่ในตัวเขา'],
  ['cel42','…ท่านอาจารย์?'],
  ['nar','«อย่าเข้ามา ข้าเห็นมันอีกแล้ว ความมืดที่กลืนฟ้า… ถ้าข้าปล่อยดาวไป ความมืดจะกลืนพวกเจ้าทั้งหมด» ภาพสะท้อนหันกลับมา ใบหน้าของมันแตกร้าวเป็นเสี่ยง'],
  ['nar','💡 ซี่ใยเรืองแดง = กำลังกระตุก ออกจากเส้น · บ่อแสงดาวโผล่ = ความมืดกำลังมา ไปยืนในแสง · เลือดครึ่งหนึ่ง ภาพสะท้อนหลบเข้ากระจก 4 บาน ทุบกระจกให้หมด']];
function cwnMap(id){if(MAPS[id])return MAPS[id];const D=DT[30];cwnReset();
  return MAPS[id]={n:'ใจกลางตาข่าย',dg:30,cwn:1,th:44,bth:44,sx:CX,sy:CY+460,sr:0,seed:431,bg:'#06060f',tile:'#9aa6d8',safe:'#b8c2e8',ring:'#e0e8ff',t1:'#2a2e50',t2:'#6a74a8',d1:'#1a1c34',d2:'#ffffff',nests:[],
    gates:[{x:CX+90,y:CY+480,to:42,req:1,ars:1,nm:'ทุ่งตาข่ายดาว',arr:cwnBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY,n:'ภาพสะท้อนโอเรียน',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:154,col:'#dfe6ff',bar:'#6a74a8',ln:'#ffffff',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'กลางลานใย',dg:1}}}
function cwnEnter(){if(!me.cls||me.down>0||isDg())return;const id=49000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🪞 เปิดใจกลางตาข่าย รหัส '+id+' มาช่วยกันเผชิญภาพสะท้อนโอเรียน!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  cwnReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX,y:CY+460});setTimeout(()=>{if(CWNI()&&dg.ph==='lobby')banner={s:'🪞 ใจกลางตาข่าย · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function cwnStart(){if(!CWNI()||dg.ph!=='lobby')return;const D=DT[30];stSay(CWN_IN,()=>{if(!CWNI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;cwnReset();spawnBoss();
  const q9=(me.sty&&me.sty.q9)|0;if(q9===1)fx({k:'msg',s:'🕸️ ผู้ทอตื่นแล้ว… ภาพสะท้อนแข็งแกร่งขึ้น (ทางเลือก «ตัดด้ายหลัก»)'});else if(q9===2){CWN.st=10;fx({k:'msg',s:'🪢 ภาพสะท้อนยังไม่ตื่นเต็มที่… โจมตีตอนมันเผลอ! (ทางเลือก «แก้ปม»)'})}
  fx({k:'msg',s:'🪞 ภาพสะท้อนโอเรียนยกคทา ด้ายทุกเส้นในลานตึงขึ้นพร้อมกัน!'});try{sfx('boss')}catch(e){}},{cine:1})}
function cwnAdds(n,mr){const D=DT[30],np=Math.max(1,plCount());for(let i=0;i<n;i++){const a=mr?(i/4*6.283+.785):Math.random()*6.283,r=mr?380:200+Math.random()*260,x=CX+Math.cos(a)*r,y=CY+Math.sin(a)*r,t=mr?2:0,hp=mhp(t,D.L)*(mr?2.4:1.3)*(1+.25*(np-1));
    mons.push({id:++mid,x,y,tx:x,ty:y,t,L:D.L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,cwn:1,mr:mr?1:0})}}
function cwHit(u,d){if(u===uid){CWN.hk=(CWN.hk|0)+1;try{hurt(d)}catch(e){}}else dmgOut.push([u,d])}
function cwOnSp(x,y,i){const a=CWSP[i],dx=Math.cos(a),dy=Math.sin(a),px=x-CX,py=y-CY,t=px*dx+py*dy;return t>70&&t<CWR+20&&Math.abs(px*dy-py*dx)<46}
function cwnSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  const B=mons.find(m=>m.t===3&&m.hp>0),pl=escPl(),dm=BS().dm*bossX(),q9=(me.sty&&me.sty.q9)|0,e8=(me.sty&&me.sty.e8)|0;if(!B)return;if(!B.cwq){B.cwq=1;if(q9===1){B.mh*=1.15;B.hp=B.mh}else if(q9===2)B.hp=B.mh*.88}const f=B.hp/B.mh,hard=f<.4;
  /* แมงมุม */if(f<.7&&!CWN.a7){CWN.a7=1;cwnAdds(3+Math.min(3,pl.length-1));fx({k:'msg',s:'🕷️ แมงมุมทอแสงไต่ลงมาจากความมืด!'})}if(f<.3&&!CWN.a3){CWN.a3=1;cwnAdds(4+Math.min(3,pl.length-1));fx({k:'msg',s:'🕷️ ผู้ทอส่งแมงมุมมาเพิ่ม!'})}
  /* กระจก 4 บาน (ล็อกเลือด 50%) */if(f<=.5&&!CWN.a5){CWN.a5=1;CWN.mr=1;cwnAdds(4,1);fx({k:'msg',s:'🪞 ภาพสะท้อนหลบเข้ากระจก! ทุบกระจกทั้ง 4 บาน มันถึงจะเจ็บอีกครั้ง'})}
  if(CWN.mr){if(B.hp<B.mh*.5)B.hp=B.mh*.5;if(!mons.some(m=>m.mr&&m.hp>0)){CWN.mr=0;B.hp=Math.min(B.hp,B.mh*.499);fx({k:'msg',s:'💥 กระจกแตกหมด! ภาพสะท้อนโอเรียนร้าวไปทั้งร่าง'});fx({k:'cwbr'})}}
  /* ซี่ใยกระตุก */if(CWN.spt>0){CWN.spt-=dt;if(CWN.spt<=0){const S=CWN.sp;pl.forEach(p=>{if(S.some(i=>cwOnSp(p.x,p.y,i)))cwHit(p.u,Math.round(45*dm))});fx({k:'cwsx',s:S});CWN.sp=[]}}
  else{CWN.st-=dt;if(CWN.st<=0){CWN.st=(q9===1?6:9)*(hard?.75:1);const k0=(Math.random()*8)|0,S=[k0,(k0+3)%8,(k0+5)%8];if(pl[0]){const a=Math.atan2(pl[0].y-CY,pl[0].x-CX),kk=((Math.round(a/(Math.PI/4))%8)+8)%8;if(!S.includes(kk))S[0]=kk}CWN.sp=S;CWN.spt=1.4;fx({k:'cwsp',s:S,d:1.4})}}
  /* เงาแห่งความกลัว */if(CWN.fs>0){CWN.fs-=dt;if(CWN.fs<=0){const P=CWN.fp;pl.forEach(p=>{if(!P.some(([x,y])=>Math.hypot(p.x-x,(p.y-y)*1.3)<80))cwHit(p.u,Math.round(70*dm))});fx({k:'cwfx'});CWN.fp=[]}}
  else{CWN.ft-=dt;if(CWN.ft<=0){CWN.ft=hard?16:20;const P=[];for(let i=0;i<3;i++){const a=i/3*6.283+Math.random()*1.5,r=180+Math.random()*230;P.push([Math.round(CX+Math.cos(a)*r),Math.round(CY+Math.sin(a)*r)])}CWN.fp=P;CWN.fs=2.6;fx({k:'cwfp',p:P,d:2.6})}}
  /* วาฬดาว (ปล่อยวาฬในภาค 8) */if(e8===1){CWN.wh-=dt;if(CWN.wh<=0){CWN.wh=22;fx({k:'cwwh'});setTimeout(()=>{if(!CWNI())return;CWN.sp=[];CWN.spt=0;fx({k:'cwsx',s:[],c:1});const B2=mons.find(m=>m.t===3&&m.hp>0);if(B2){const lo=CWN.mr?B2.mh*.5:1;B2.hp=Math.max(lo,B2.hp-B2.mh*.025);CWN.wk=(CWN.wk|0)+1}fx({k:'msg',s:'🐋 วาฬดาวพุ่งชนตาข่าย! ด้ายขาดเป็นแถบ ภาพสะท้อนเซ'})},1500)}}}
function cwnMon(m,dt,pl,spd){if(!CWNI())return false;if(m.mr){m.x=m.hx;m.y=m.hy;return true}if(Math.hypot(m.x-CX,m.y-CY)>CWR-40){const a=Math.atan2(m.y-CY,m.x-CX);m.x=CX+Math.cos(a)*(CWR-40);m.y=CY+Math.sin(a)*(CWR-40)}return false}
function cwnAI(m,dt,pl,enr,dm){if(m.t!==3)return;m.x=CX;m.y=CY}
function cwnFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='cwsp'){CWNFX.sp={s:o.s||[],t0:n,d:(+o.d||1.4)*1000};return true}
  if(o.k==='cwsx'){CWNFX.sp=null;if(!o.c&&o.s&&o.s.length)CWNFX.fx.push({k:'sx',s:o.s,t0:n});try{sfx('zap')}catch(e){}return true}
  if(o.k==='cwfp'){CWNFX.fp={p:o.p||[],t0:n,d:(+o.d||2.6)*1000};return true}
  if(o.k==='cwfx'){CWNFX.fp=null;CWNFX.fx.push({k:'fx',t0:n});try{shk=Math.max(shk,.35)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='cwwh'){CWNFX.wh=n;return true}
  if(o.k==='cwbr'){CWNFX.fx.push({k:'br',t0:n});try{sfx('boom')}catch(e){}return true}
  return false}
/* ---------- ฉาก ---------- */
function cwnBuild(M){PALC.warm=0;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let a=0;a<6.283;a+=.05)trees.push({x:CX+Math.cos(a)*(CWR+24),y:CY+Math.sin(a)*(CWR+24),r:24,inv:1,ns:1})}
function cwnPaint(c,ox,oy,S){q9Space(c,ox,oy,S);c.fillStyle='rgba(4,4,14,.55)';c.fillRect(ox,oy,S,S);
  c.fillStyle='rgba(0,0,0,.5)';c.beginPath();c.arc(CX+10,CY+30,CWR+30,0,7);c.fill();
  const gr=c.createRadialGradient(CX,CY,40,CX,CY,CWR);gr.addColorStop(0,'#3a3e66');gr.addColorStop(.7,'#24264a');gr.addColorStop(1,'#16182e');c.fillStyle=gr;c.beginPath();c.arc(CX,CY,CWR,0,7);c.fill();
  /* ใยวงกลม + ซี่ใย */c.lineCap='round';for(const R of[110,220,330,440,CWR-6]){c.strokeStyle='rgba(200,210,255,.35)';c.lineWidth=R===CWR-6?6:3;c.beginPath();for(let k=0;k<=16;k++){const a=k/16*6.283,rr=R*(k%2?.97:1);k?c.lineTo(CX+Math.cos(a)*rr,CY+Math.sin(a)*rr):c.moveTo(CX+Math.cos(a)*rr,CY+Math.sin(a)*rr)}c.stroke()}
  for(const a of CWSP){c.strokeStyle='rgba(30,30,60,.7)';c.lineWidth=40;c.beginPath();c.moveTo(CX+Math.cos(a)*60,CY+Math.sin(a)*60+8);c.lineTo(CX+Math.cos(a)*CWR,CY+Math.sin(a)*CWR+8);c.stroke();
    c.strokeStyle='#9aa6d8';c.lineWidth=30;c.beginPath();c.moveTo(CX+Math.cos(a)*60,CY+Math.sin(a)*60);c.lineTo(CX+Math.cos(a)*CWR,CY+Math.sin(a)*CWR);c.stroke();c.strokeStyle='#d8e0ff';c.lineWidth=16;c.stroke();
    c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;c.setLineDash([14,10]);c.stroke();c.setLineDash([])}
  /* กลุ่มดาวบนพื้น */c.fillStyle='rgba(255,255,255,.6)';const R0=gxRng(4310);for(let i=0;i<70;i++){const a=R0()*6.283,r=Math.sqrt(R0())*(CWR-30);c.fillRect(CX+Math.cos(a)*r,CY+Math.sin(a)*r,2,2)}
  c.fillStyle='#4a5080';c.beginPath();c.arc(CX,CY,62,0,7);c.fill();c.strokeStyle='rgba(80,90,150,.6)';c.lineWidth=2;for(let r=14;r<62;r+=12){c.beginPath();c.arc(CX,CY,r,0,7);c.stroke()}}
function cwnDraw(){if(!CWNI())return;const T=performance.now()/1000,now=performance.now();g.save();
  /* ซี่ใยเตือน */const SP=CWNFX.sp;if(SP){const k=Math.min(1,(now-SP.t0)/SP.d),pu=.5+.5*Math.sin(T*18);for(const i of SP.s){const a=CWSP[i];g.save();g.translate(CX,CY);g.rotate(a);g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,110,140,'+(.15+.25*k*pu)+')';g.fillRect(70,-46,CWR-70,92);g.strokeStyle='rgba(255,200,215,'+(.5+.5*k)+')';g.lineWidth=3;g.setLineDash([18,12]);g.lineDashOffset=-T*60;g.beginPath();g.moveTo(70,-46);g.lineTo(CWR,-46);g.moveTo(70,46);g.lineTo(CWR,46);g.stroke();g.setLineDash([]);g.restore()}}
  /* บ่อแสงดาว */const FP=CWNFX.fp;if(FP){const k=Math.min(1,(now-FP.t0)/FP.d);g.save();g.globalCompositeOperation='source-over';g.fillStyle='rgba(0,0,10,'+(.25*k)+')';g.beginPath();g.arc(CX,CY,CWR,0,7);g.fill();g.globalCompositeOperation='lighter';
    for(const[x,y]of FP.p){glowAt(x,y,110,'255,240,190',.55);g.strokeStyle='rgba(255,240,200,.9)';g.lineWidth=3;g.beginPath();g.ellipse(x,y,80,62,0,0,7);g.stroke();g.fillStyle='rgba(255,250,220,.9)';for(let q=0;q<6;q++){const a=q/6*6.283+T;g.fillRect(x+Math.cos(a)*60-1.5,y+Math.sin(a)*46-1.5,3,3)}}
    g.restore();g.strokeStyle='rgba(30,10,50,'+(.6*k)+')';g.lineWidth=18;g.beginPath();g.arc(CX,CY,CWR*(1-k*.9),0,7);g.stroke()}
  /* เอฟเฟกต์ปะทุ */CWNFX.fx=CWNFX.fx.filter(e=>now-e.t0<900);for(const e of CWNFX.fx){const k=(now-e.t0)/900;g.save();g.globalCompositeOperation='lighter';
    if(e.k==='sx')for(const i of e.s){const a=CWSP[i],f=70+k*(CWR-70);glowAt(CX+Math.cos(a)*f,CY+Math.sin(a)*f,70,'255,220,240',.8*(1-k))}
    else if(e.k==='fx'){g.strokeStyle='rgba(120,60,200,'+(1-k)+')';g.lineWidth=30*(1-k);g.beginPath();g.arc(CX,CY,60+k*(CWR-60),0,7);g.stroke()}
    else{for(let q=0;q<14;q++){const a=q/14*6.283,r=40+k*260;g.fillStyle='rgba(220,235,255,'+(1-k)+')';g.fillRect(CX+Math.cos(a)*r-4,CY-80+Math.sin(a)*r*.7-4,8,8)}}g.restore()}
  /* เตือนเหนือหัว */if(me.cls&&me.down<=0){let t='';if(SP&&SP.s.some(i=>cwOnSp(me.x,me.y,i)))t='🕸️ ด้ายจะกระตุก! ออกจากเส้น';else if(FP&&!FP.p.some(([x,y])=>Math.hypot(me.x-x,(me.y-y)*1.3)<80))t='🌑 ความมืดมา! เข้าไปในแสงดาว';
    if(t){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,6,20,.9)';g.strokeText(t,me.x,me.y-88);g.fillStyle='#ffe0f0';g.fillText(t,me.x,me.y-88)}}
  g.restore()}
/* กระจกบานยืน (มอน mr) */
function cwMrDraw(){if(!CWNI())return;const T=performance.now()/1000;for(const m of mons){if(!m.mr||m.hp<=0)continue;g.save();g.translate(m.x,m.y);PALSH(0,4,34,9,.45);
  g.fillStyle='#4a4e78';g.beginPath();g.roundRect(-30,-110,60,110,[30,30,4,4]);g.fill();const gr=g.createLinearGradient(-24,-104,24,-6);gr.addColorStop(0,'#e8eeff');gr.addColorStop(.5,'#8a94c8');gr.addColorStop(1,'#c8d0f0');g.fillStyle=gr;g.beginPath();g.roundRect(-24,-104,48,98,[24,24,3,3]);g.fill();
  g.globalAlpha=.55;g.fillStyle='#2a2e50';g.beginPath();g.arc(0,-70,8,0,7);g.fill();g.fillRect(-9,-62,18,40);g.globalAlpha=1;g.save();g.globalCompositeOperation='lighter';glowAt(0,-56,50,'200,215,255',.25+.15*Math.sin(T*4+m.id));g.restore();
  const k=1-m.hp/m.mh;if(k>.2){g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1.4;g.beginPath();g.moveTo(-6,-90);g.lineTo(4,-60);g.lineTo(-8,-40);if(k>.55){g.moveTo(10,-80);g.lineTo(-2,-50);g.lineTo(12,-20)}g.stroke()}g.restore()}}
{const f2=MV1D[442];MV1D[442]=(r,T,W,bob)=>{if(typeof MON_CUR!=='undefined'&&MON_CUR&&MON_CUR.mr)return true;return f2(r,T,W,bob)}}
function cwnScreen(){if(!CWNI())return;const now=performance.now();g.save();g.setTransform(DPR,0,0,DPR,0,0);const vg=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.28,SW0/2,H/2,Math.max(SW0,H)*.8);vg.addColorStop(0,'rgba(6,6,20,0)');vg.addColorStop(1,'rgba(6,6,20,.5)');g.fillStyle=vg;g.fillRect(0,0,SW0,H);
  /* วาฬดาวว่ายผ่าน */if(CWNFX.wh&&now-CWNFX.wh<3200){const k=(now-CWNFX.wh)/3200,x=-SW0*.4+k*SW0*1.8,y=H*.16+Math.sin(k*Math.PI)*H*.06,s=Math.min(SW0,H)*.0026;g.save();g.translate(x,y);g.scale(s*60,s*60);g.globalAlpha=Math.sin(k*Math.PI)*.85;
    const wg=g.createLinearGradient(0,-1,0,1);wg.addColorStop(0,'#5a7ac8');wg.addColorStop(1,'#1a2a5a');g.fillStyle=wg;g.beginPath();g.ellipse(0,0,2.2,.7,0,0,7);g.fill();g.beginPath();g.moveTo(-2,0);g.lineTo(-3.1,-.7+Math.sin(now/200)*.15);g.lineTo(-2.9,.1);g.lineTo(-3.1,.8+Math.sin(now/200)*.15);g.closePath();g.fill();
    g.fillStyle='rgba(220,235,255,.9)';for(let q=0;q<8;q++)g.fillRect(-1.6+q*.42,-.25+Math.sin(q)*.2,.05,.05);g.fillStyle='#fff';g.beginPath();g.arc(1.5,-.15,.07,0,7);g.fill();g.restore()}
  let t='';const SP=CWNFX.sp,FP=CWNFX.fp;if(FP)t='🌑 ความมืดแห่งความกลัวกำลังแผ่… ไปยืนในบ่อแสงดาว';else if(CWN.mr||mons.some(m=>m.mr&&m.hp>0))t='🪞 ทุบกระจก '+mons.filter(m=>m.mr&&m.hp>0).length+' บาน ภาพสะท้อนถึงจะเจ็บ';
  if(t){g.font='bold 15px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(10,6,20,.85)';g.strokeText(t,SW0/2,H*.26);g.fillStyle='#e8ecff';g.fillText(t,SW0/2,H*.26)}g.restore()}
/* ---------- บอส: ภาพสะท้อนโอเรียน ---------- */
BV1['ภาพสะท้อนโอเรียน']=(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.3),GL='rgba(160,176,236,.92)',GD='#4a5490',VI='#6a4ab0';bvShadow(56,14,.3);
  /* ผ้าคลุมด้ายดาวลากพื้น */if(!W){g.save();g.strokeStyle='rgba(220,228,255,.5)';g.lineWidth=1;for(let k=-5;k<=5;k++){g.beginPath();g.moveTo(k*5,-70+b);g.quadraticCurveTo(k*9+Math.sin(T*1.5+k)*6,-10,k*13+Math.sin(T+k)*8,30);g.stroke()}g.restore()}
  vS(W,[[-26,-74+b],[26,-74+b],['q',50,-20,58,32],[-58,32],['q',-50,-20,-26,-74+b]],'#1a1c40',1,1.6);
  /* ร่างกระจก */vS(W,[[-20,-76+b],[20,-76+b],[24,-20+b],[16,24],[-16,24],[-24,-20+b]],GL,1,1.4);
  if(!W){g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=1.2;g.beginPath();g.moveTo(-10,-70+b);g.lineTo(-2,-46+b);g.lineTo(-12,-24+b);g.moveTo(8,-60+b);g.lineTo(2,-40+b);g.lineTo(14,-10+b);g.stroke();
    g.fillStyle='rgba(255,255,255,.85)';for(const[x,y]of[[-8,-56],[10,-36],[-4,-14],[6,-66],[-14,-30]])g.fillRect(x,y+b,2,2);
    g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=.8;g.beginPath();g.moveTo(-8,-56+b);g.lineTo(10,-36+b);g.lineTo(-4,-14+b);g.stroke()}
  /* ไหล่ + แขน (คทามีดาวในกรง) */for(const s of[-1,1]){vS(W,[[s*18,-78+b],['q',s*36,-80+b,s*38,-62+b],[s*22,-62+b]],GD,1,1)}
  {const ang=-.3-cf*.5+Math.sin(T*1.2)*.08,ex=30,ey=-50+b,hx=ex+Math.cos(ang)*20,hy=ey+Math.sin(ang)*20+16;vLimb(W,[22,-64+b,ex,ey,hx,hy],GL,8,6);vK(W,[[hx,hy+30],[hx,hy-50]],'#c8d0f0',3);bvE(W,hx,hy-56,8,8,'rgba(40,40,80,.6)',1,1.2);if(!W){g.strokeStyle='#e0e6ff';g.lineWidth=1;for(let q=0;q<4;q++){g.beginPath();g.moveTo(hx-8+q*5.3,hy-62);g.lineTo(hx-8+q*5.3,hy-50);g.stroke()}}bvAdd(W,()=>glowAt(hx,hy-56,14,'255,240,190',.8*pu))}
  vLimb(W,[-22,-64+b,-32,-40+b,-28,-18+b+Math.sin(T*1.6)*3],GL,8,6);
  /* หัว: หน้ากากกระจกร้าว + มงกุฎดาว */const hy=-94+b;bvE(W,0,hy,15,17,GL,1,1.4);if(!W){g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=1.2;g.beginPath();g.moveTo(-6,hy-12);g.lineTo(2,hy-2);g.lineTo(-4,hy+8);g.moveTo(2,hy-2);g.lineTo(10,hy+4);g.stroke()}
  for(const s of[-1,1])vEye(W,s*5,hy-1,2.4,2,'#e8eeff',W?0:6);
  vS(W,[[-15,hy-12],[-15,hy-26],[-9,hy-18],[-5,hy-32],[0,hy-20],[5,hy-32],[9,hy-18],[15,hy-26],[15,hy-12]],'#c8d0f0',1,1.2);for(const[x,y]of[[-15,hy-26],[-5,hy-32],[5,hy-32],[15,hy-26]])bvAdd(W,()=>glowAt(x,y,7,'230,235,255',.8*pu));
  if(!W&&!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(0,-50+b,70,'170,180,255',.18+.12*cf);g.restore()}};
BVS['ภาพสะท้อนโอเรียน']=1.4;
function cwnReward(){if(dgRew)return;dgRew=1;const D=DT[30],st=stCur(),sto=st&&st.g==='cwn',gd=sto?D.gold:85000;CWNFX={sp:null,fp:null,wh:0,fx:[]};
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?26:6));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?36:8+(Math.random()*6|0),'ใจกลางตาข่าย')}catch(e){}try{ecGive(sto?36:8+(Math.random()*5|0),'ใจกลางตาข่าย')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.45)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?20:6,'ใจกลางตาข่าย')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.cwT=Date.now();
  banner={s:'🪞 ภาพสะท้อนโอเรียนแตกเป็นประกาย · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?26:6),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffffff','#dfe6ff','#b8c2e8','#fff0c0'],150,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(CWNI())enterMap(42,cwnBack())},10000)}
function instRepeatCwn(){const l=Math.max(0,(me.cwT||0)+30*60000-Date.now());
  stSay([['lum3','ภาพสะท้อนก่อตัวขึ้นใหม่ทุกครั้งที่ผู้ทอฝันร้าย… จะเข้าไปใจกลางตาข่ายอีกไหม?']],()=>{},{choice:[[l>0?'🪞 ใจกลางตาข่าย (อีก '+Math.ceil(l/60000)+' นาที)':'🪞 ใจกลางตาข่าย (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🪞 ภาพสะท้อนยังก่อตัวไม่เสร็จ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(cwnEnter,250)}};return true}
/* ---------- เศษกระจกภาพสะท้อน 3 ชิ้น (แมพ 42) ---------- */
const WB9EC=[1,5,7].map(k=>{const P=WB9PL[1+k];return[P.x,P.y-20]});
const ECLORE=[['🪞 เศษกระจก «ภาพแรก» · 1/3','เด็กชายสวมมงกุฎเล็ก ๆ ยืนเขย่งที่กล้องใหญ่ของหอดูดาว… เขาเห็นเงาดำยักษ์ว่ายกลืนดาวไปทีละดวง «ถ้ามันกลืนฟ้าหมด ข้าจะไม่มีดาวให้นับ» เขาร้องไห้ทั้งคืน'],
 ['🪞 เศษกระจก «ภาพที่สอง» · 2/3','ราชาโอเรียนอุ้มลูกสาวไว้ใต้ฟ้าที่ไม่มีดาว ร้องเพลงกล่อมเบา ๆ «พ่อจะเก็บดาวทุกดวงไว้ให้ลูก ไม่มีความมืดไหนจะเอาไปได้» เพลงเดียวกับที่ผู้ทอร้องทุกคืน'],
 ['🪞 เศษกระจก «ภาพที่สาม» · 3/3','ชายชราบนยอดหอทอดาวยกมือสั่น «พอแล้ว หยุดทอเถิด» … ผู้ทอตอบกลับด้วยเสียงของเขาเอง «ท่านยังกลัวอยู่ ข้ารู้สึกได้ ข้าจะทอต่อไปจนกว่าท่านจะหายกลัว»']];
let WB9Q={lp:-1,lt:0};
{const _t=wb9Tick;wb9Tick=function(dt,now,x,y,mv){_t.apply(this,arguments);const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p9ec){WB9Q.lp=-1;return}x=me.x;y=me.y;let near=-1;for(let i=0;i<3;i++){if((q.p9ec|0)>>i&1)continue;const[ex,ey]=WB9EC[i];if(Math.hypot(x-ex,(y-ey)*1.3)<70)near=i}if(near!==WB9Q.lp){WB9Q.lp=near;WB9Q.lt=0}
  if(near>=0&&me.down<=0){WB9Q.lt+=dt;if(WB9Q.lt>=2){q.p9ec=(q.p9ec|0)|(1<<near);let n=0;for(let k=0;k<3;k++)if(q.p9ec>>k&1)n++;q.n=n;WB9Q.lp=-1;WB9Q.lt=0;PALG.card={h:ECLORE[near][0],t:ECLORE[near][1],s:now,d:12};try{sfx('quest')}catch(e){}const[ex,ey]=WB9EC[near];try{burst(ex,ey-30,['#ffffff','#dfe6ff','#c8b8ff'],40,180,1.1,{glow:1,g:-60})}catch(e){}try{stHud();writeSave()}catch(e){}}}}}
{const _g=wb9GroundFx;wb9GroundFx=function(){_g.apply(this,arguments);const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p9ec)return;const T=performance.now()/1000;g.save();
  WB9EC.forEach(([x,y],i)=>{if((q.p9ec|0)>>i&1||!palVis(x,y,90))return;const fl=Math.sin(T*1.5+i)*5,pu=.5+.5*Math.sin(T*2+i);g.save();g.globalCompositeOperation='lighter';glowAt(x,y-50+fl,60,'200,210,255',.3+.2*pu);g.restore();
    g.save();g.translate(x,y-50+fl);g.rotate(Math.sin(T*.8+i)*.2);const gr=g.createLinearGradient(-16,-26,16,26);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,'#9aa6d8');gr.addColorStop(1,'#e8eeff');g.fillStyle=gr;g.beginPath();g.moveTo(0,-30);g.lineTo(16,-6);g.lineTo(8,28);g.lineTo(-12,20);g.lineTo(-16,-10);g.closePath();g.fill();g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=1.5;g.stroke();
    g.globalAlpha=.45;g.fillStyle='#3a3e70';g.beginPath();g.arc(0,-6,5,0,7);g.fill();g.fillRect(-4,-1,8,14);g.restore();
    g.strokeStyle='rgba(220,228,255,'+(.4+.4*pu)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y,60,22,0,0,7);g.stroke();
    if(WB9Q.lp===i){const p=Math.min(1,WB9Q.lt/2);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-100,11,0,7);g.stroke();g.strokeStyle='#e8eeff';g.lineWidth=3.4;g.beginPath();g.arc(x,y-100,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}});g.restore()}}
/* ---------- เนื้อเรื่องภาค 9 บทที่ 4 ---------- */
STCH.push('ภาค 9 · บทที่ 4 · ภาพสะท้อนในตาข่าย');
{const C4=STCH.length-1;STY.push(
 {c:C4,g:'talk',k:'cel42',p9s5:1,tx:'คุยกับเซเลสต์ที่หมุดยึดขอบตาข่าย · เสียงสะท้อน',
  pre:[['cel42','ตั้งแต่ดักแด้เปิดออก หมุดยึดสามก้อนรอบตาข่ายก็ส่งเสียงฮัมแปลก ๆ… ข้าส่องกล้องดู บนนั้นมีเศษกระจกลอยอยู่'],
   ['cel42','ยอดหอสว่างไม่หยุดเลยตั้งแต่ด้ายหลักขาด… ผู้ทอกำลังทอกำแพงกระจกรอบใจกลางของมัน',0,0,0,0,0,0,0,0,1],
   ['cel42','ผู้ทอยังหลับ แต่มันละเมอ… ด้ายทุกเส้นสั่นเป็นจังหวะเดียวกับเพลงกล่อม',0,0,0,0,0,0,0,0,2],
   ['lum3','เศษกระจกพวกนั้นคือความฝันของผู้ทอ… ไม่สิ ความฝันของท่านโอเรียน ที่ผู้ทอเก็บไว้แทนเขา'],
   ['cel42','ข้าอยากเห็นมันด้วยตาตัวเอง ช่วยเก็บมาให้ข้าที ทั้งสามชิ้น']],rw:{g:170000}},
 {c:C4,g:'clue',m:42,n:3,p9ec:1,tx:'ฟังเศษกระจกภาพสะท้อน 3 ชิ้นบนหมุดยึด (ยืนข้างกระจก 2 วิ)',
  pre:[['lum3','หมุดยึดทางตะวันออกเฉียงใต้ ตะวันตกเฉียงเหนือ และตะวันออกเฉียงเหนือ… เดินตามเส้นด้ายไปนะ']],
  post:[['nar','เศษกระจกชิ้นสุดท้ายแตกเป็นผงแสง ภาพทั้งสามลอยกลับไปรวมกันที่ใจกลางตาข่าย… ดักแด้ที่เปิดอยู่ส่องแสงสีเงินขึ้นฟ้า'],
   ['cel42','(เซเลสต์เงียบไปนาน) ท่านอาจารย์ไม่ได้อยากขังดาว… ท่านแค่กลัวว่าจะไม่มีดาวเหลือให้ลูกสาว']],rw:{g:130000}},
 {c:C4,g:'talk',k:'lum3',p9s6:1,tx:'ไปหาลูมิน่าที่ใจกลางตาข่าย · ทางเข้าภาพสะท้อน',
  pre:[['lum3','ภาพทั้งสามรวมกันเป็นประตูแล้ว… ข้างในคือ «ใจกลางตาข่าย» ที่ที่ความกลัวของท่านโอเรียนยังมีรูปร่างอยู่'],
   ['lum3','มันจะใช้ด้ายทุกเส้นเป็นอาวุธ และเรียกความมืดที่ท่านโอเรียนกลัวที่สุดมาด้วย… ยืนในแสงดาวไว้ ข้าจะจุดแสงให้'],
   ['lum3','(ลูมิน่าเงยหน้า) …ข้าได้ยินเสียงร้องเพลงไกล ๆ เหมือนวาฬ เพื่อนที่เจ้าปล่อยกลับห้วงดาวตามเรามาด้วย',0,0,0,0,0,0,0,1],
   ['cel42','ข้าจะไปด้วย… ข้ามีเรื่องที่ต้องพูดกับท่านอาจารย์']],rw:{g:90000,s3:6}},
 {c:C4,g:'cwn',k:'lum3',p9cw:1,tx:'ใจกลางตาข่าย: เผชิญภาพสะท้อนโอเรียน (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['lum3','ซี่ใยที่เรืองแดงจะกระตุก หลบออกจากเส้น… บ่อแสงดาวโผล่เมื่อไหร่ ไปยืนในแสง'],['lum3','พร้อมเมื่อไหร่บอกข้า']],
  post:[['nar','ภาพสะท้อนโอเรียนคุกเข่าลงกลางลานใย ร่างกระจกร้าวไปทั้งตัว แต่มันยังไม่แตก… มันเงยหน้ามองเซเลสต์'],
   ['nar','«ลูกศิษย์ของข้า… เจ้าโตแล้ว» เสียงของมันไม่ใช่เสียงของความกลัวอีกต่อไป']]},
 {c:C4,g:'talk',k:'cel42',p9c4:1,tx:'คุยกับเซเลสต์ · คำพูดสุดท้ายของภาพสะท้อน',
  pre:[['cel42','(เซเลสต์ยังสั่นอยู่) ข้าบอกท่านแล้ว… ว่าความมืดไม่ได้กลืนฟ้า ฟ้าแค่ต้องการพักบ้าง ดาวจะกลับมาเสมอ'],
   ['cel42','ภาพสะท้อนยิ้ม… แล้วบอกว่า «ผู้ทอได้ยินแต่เสียงความกลัวของข้า ไปบอกมันด้วยเสียงของเจ้า มันจะฟัง»'],
   ['lum3','ภาพสะท้อนแตกเป็นแสงกระจายไปทั่วตาข่าย… ยอดหอทอดาวสั่นไปทั้งหลัง ผู้ทอรู้แล้วว่าใจกลางของมันว่างเปล่า'],
   ['lum3','มันโกรธมาก… ด้ายบนยอดหอหนาขึ้นทุกวินาที คืนนี้เราต้องขึ้นไป',0,0,0,0,0,0,0,0,1],
   ['lum3','มันยังไม่รู้ว่าเรามาถึงตรงนี้… แต่มันกำลังจะตื่น เราต้องไปก่อนมันลืมตา',0,0,0,0,0,0,0,0,2],
   ['cel42','ยอดหอทอดาว… ที่ที่ท่านอาจารย์ไม่เคยได้กลับไปบอกลา ข้าจะไปแทนท่าน']],
  post:[['nar','🌌 — จบภาค 9 บทที่ 4 · ภาพสะท้อนในตาข่าย — บทต่อไป: ผู้ทอ (บทจบภาค 9 · เร็ว ๆ นี้)']],rw:{g:190000,s3:12}})}
setTimeout(()=>{
  try{DGTH[30]='harbor'}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p9ec){const q=me.sty;let b=null,bd=1e9;for(let i=0;i<3;i++){if((q.p9ec|0)>>i&1)continue;const[x,y]=WB9EC[i],d=curMap===42?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b=i}}if(b==null)return null;const[x,y]=WB9EC[b];return{mp:42,act:'reach',x,y:y+20,lb:'ฟังเศษกระจกภาพสะท้อน ('+((q.p9ec|0).toString(2).split('1').length-1)+'/3)'}}return _q(st)}}catch(e){}
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur();if(st&&st.p9c4)setTimeout(()=>{try{sdGive(12,'คำพูดสุดท้ายของภาพสะท้อน')}catch(e){}},400);if(st&&st.p9ec)setTimeout(()=>{try{sdGive(5,'เศษกระจกภาพสะท้อน')}catch(e){}},400);return _st()}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=49000&&id<50000)return cwnMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(CWNI())return cwnStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(CWNI())return cwnSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(CWNI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return cwnReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=CWNI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(CWNI()){enterMap(42,cwnBack());sysMsg('🪞 ถูกดีดออกจากใจกลางตาข่าย… คุยกับลูมิน่าเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(CWNI()){const s=CWNFX.fp?' · 🌑 ความมืด':CWN.mr?' · 🪞 กระจก':'';return dg.ph==='boss'||dg.ph==='run'?'🪞 ภาพสะท้อนโอเรียน'+s+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🪞 ภาพสะท้อนสงบลงแล้ว':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🪞 ลานใยกลางความมืด · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(CWNI()){ov.hidden=true;sfx('gate');enterMap(42,cwnBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(cwnFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{cwnDraw();cwMrDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{cwnScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='cwn')return instRepeatCwn();return _ir(k)}}catch(e){}
},0);
