/* ---------- v542 ภาค 9 บทที่ 5 «ผู้ทอ» (บทจบภาค 9) ----------
   เนื้อเรื่อง 3 ขั้น (ต่อจาก p9c4): ลูมิน่า (ใจกลางตาข่าย แมพ 42) → ดันเจี้ยน «ยอดหอทอดาว» (ห้อง 45000–45999 · DT[31]) บอส «ผู้ทอ» 3 ร่าง
   → คุยเซเลสต์ · ฉากจบ e9: 1 🌠 คืนดาวทุกดวงสู่ฟ้า (รื้อตาข่าย · ลูมิน่ากลับเป็นดาว) · 2 🕸️ ทอตาข่ายใหม่เป็นสะพานดาว (ลูมิน่าเฝ้าสะพาน)
   ผู้ทอ 3 ร่าง (ตามเลือด): ① แขนเข็ม (>66%) ยิงเข็มเป็นแนว (เส้นเตือน 1.2 วิ) · ② กี่ทอ (66–33%) ด้ายรัดใต้เท้า (โดนแล้วติด 1.8 วิ) + ซี่ใยกระตุก
   ③ แกนกลาง (<33%) หมุดด้าย 3 หมุดผูกแกนไว้ (เลือดล็อก 33% จนทำลายครบ) + ดึงดาวลงมาเป็นอุกกาบาต
   q9=1 ผู้ทอตื่นเต็มที่ เลือด +10% เข็มถี่ขึ้น · q9=2 ผู้ทอยังงัวเงีย เข็มช้าลง · e8=1 วาฬดาวชนตาข่ายทุก 20 วิ (ยกเลิกท่าที่เตือน · บอส −2.5% · ร่าง ③ ทำลายหมุดด้าย 1 หมุด)
   รางวัลจบภาค: ฉายาตามฉากจบ · สัตว์เลี้ยง «ดาวน้อย» · สัตว์ขี่ «ดาวหางเงิน» · ตัวกรองบทพูด L[11] = e9 */
setTimeout(()=>{DT[31]={n:'ยอดหอทอดาว',lv:1,L:156,bL:22,hp:15000000,xp:1500000,g:180000,dm:82,tn:12,sm:0,rm:4,lg:1,tm:1080,gold:1500000,exp:11000000}},0);
const WVRI=()=>!!(MAPS[curMap]&&MAPS[curMap].wvr),wvrBack=()=>{const N=MAPS[42]&&MAPS[42].npc;return N?{x:N.x-70,y:N.y+30}:{x:1600,y:1650}};
const WVRR=560;
let WVR={ph:1,nt:3,nd:null,rt:8,rp:null,st:10,sp:[],spt:0,mt:5,mp:null,ank:0,wh:20,wk:0,bt:0,tr:0,hk:0},WVRFX={ph:1,nd:null,rp:null,sp:null,mp:null,fx:[],wh:0,root:0,rx:0,ry:0};
const wvrReset=()=>{WVR={ph:1,nt:3,nd:null,rt:8,rp:null,st:10,sp:[],spt:0,mt:5,mp:null,ank:0,wh:20,wk:0,bt:0,tr:0,hk:0};WVRFX={ph:1,nd:null,rp:null,sp:null,mp:null,fx:[],wh:0,root:0,rx:0,ry:0}};
const WVR_IN=[['nar','บันไดเกลียวสุดท้ายพาขึ้นมาถึงยอดหอทอดาว… ลานกลมทองเหลืองกว้างใหญ่ลอยอยู่เหนือทุกสิ่ง ด้ายเงินนับล้านเส้นพุ่งออกจากขอบลานขึ้นไปหาดาวทุกดวง'],
  ['nar','กลางลาน «ผู้ทอ» หยุดทอ… เครื่องจักรรูปแมงมุมขนาดเท่าวิหาร แขนเข็มหกแขน หลังเป็นกี่ทอผ้ายักษ์ ใจกลางอกมีแสงม่วงเต้นเป็นจังหวะเหมือนหัวใจ'],
  ['nar','มันร้องเพลงกล่อมด้วยเสียงของราชาโอเรียน «นอนเถิดลูกเอ๋ย พ่อจะเก็บดาวไว้ให้…» แล้วหันมาหาผู้บุกรุก'],
  ['cel42','ข้าคือเซเลสต์ ลูกศิษย์ของท่านโอเรียน… ท่านไม่ต้องกลัวอีกแล้ว!'],['nar','«ท่านยังกลัวอยู่ ข้ารู้สึกได้» แขนเข็มทั้งหกยกขึ้นพร้อมกัน'],
  ['nar','💡 ร่าง ① เส้นแดงจากผู้ทอ = แนวเข็ม หลบออกจากเส้น · ร่าง ② วงใต้เท้า = ด้ายรัด (ติดกับที่) · ร่าง ③ ทำลายหมุดด้าย 3 หมุดก่อน แกนถึงจะเจ็บ · วงส้ม = ดาวตก']];
function wvrMap(id){if(MAPS[id])return MAPS[id];const D=DT[31];wvrReset();
  return MAPS[id]={n:'ยอดหอทอดาว',dg:31,wvr:1,th:44,bth:44,sx:CX,sy:CY+480,sr:0,seed:451,bg:'#0a0816',tile:'#b8a070',safe:'#c8b080',ring:'#ffe8c0',t1:'#2a2030',t2:'#8a6a3e',d1:'#1a1428',d2:'#ffffff',nests:[],
    gates:[{x:CX+100,y:CY+500,to:42,req:1,ars:1,nm:'ทุ่งตาข่ายดาว',arr:wvrBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY,n:'ผู้ทอ',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:156,col:'#e8d8ff',bar:'#7a4ac0',ln:'#ffffff',rec:'ปาร์ตี้แนะนำ · เล่นเดี่ยวได้',pos:'กลางยอดหอ',dg:1}}}
function wvrEnter(){if(!me.cls||me.down>0||isDg())return;const id=45000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🕸️ เปิดยอดหอทอดาว รหัส '+id+' มาช่วยกันหยุดผู้ทอ!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  wvrReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX,y:CY+480});setTimeout(()=>{if(WVRI()&&dg.ph==='lobby')banner={s:'🕸️ ยอดหอทอดาว · พร้อมเมื่อไหร่กด "เริ่ม" (ปาร์ตี้แนะนำ)',t:5}},700)}
function wvrStart(){if(!WVRI()||dg.ph!=='lobby')return;const D=DT[31];stSay(WVR_IN,()=>{if(!WVRI()||dg.ph!=='lobby')return;dg={ph:'boss',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;wvrReset();spawnBoss();
  const q9=(me.sty&&me.sty.q9)|0;fx({k:'msg',s:q9===1?'🕸️ ผู้ทอตื่นเต็มที่… เพราะด้ายหลักที่ถูกตัด มันแข็งแกร่งกว่าเดิม':q9===2?'🪢 ผู้ทอยังงัวเงีย… แขนเข็มของมันช้ากว่าปกติ':'🕸️ ผู้ทอยกแขนเข็มทั้งหก!'});try{sfx('boss')}catch(e){}},{cine:1})}
function wvrAdds(n,ank){const D=DT[31],np=Math.max(1,plCount());for(let i=0;i<n;i++){const a=ank?(i/3*6.283-1.571):Math.random()*6.283,r=ank?420:200+Math.random()*260,x=CX+Math.cos(a)*r,y=CY+Math.sin(a)*r,t=ank?1:(Math.random()*3)|0,hp=mhp(t,D.L)*(ank?3:1.3)*(1+.25*(np-1));
    mons.push({id:++mid,x,y,tx:x,ty:y,t,L:D.L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,wvr:1,ank:ank?1:0})}}
function wvHit(u,d){if(u===uid){WVR.hk=(WVR.hk|0)+1;try{hurt(d)}catch(e){}}else dmgOut.push([u,d])}
const wvOnLine=(x,y,a)=>{const dx=Math.cos(a),dy=Math.sin(a),px=x-CX,py=y-CY,t=px*dx+py*dy;return t>40&&t<WVRR+30&&Math.abs(px*dy-py*dx)<40};
const wvOnSp=(x,y,i)=>wvOnLine(x,y,i*Math.PI/4)&&Math.hypot(x-CX,y-CY)>70;
function wvrSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  const B=mons.find(m=>m.t===3&&m.hp>0),pl=escPl(),dm=DT[31].dm/66,q9=(me.sty&&me.sty.q9)|0,e8=(me.sty&&me.sty.e8)|0;if(!B)return;
  if(!B.wvq){B.wvq=1;if(q9===1){B.mh*=1.1;B.hp=B.mh}}
  const f=B.hp/B.mh,ph=f>.66?1:f>.33?2:3;
  if(ph!==WVR.ph){WVR.ph=ph;WVR.tr=2;WVR.nd=null;WVR.rp=null;WVR.sp=[];WVR.spt=0;fx({k:'wvph',ph});
    if(ph===2){fx({k:'msg',s:'🕸️ แขนเข็มหัก! ผู้ทอหมุนกี่ทอผ้าขึ้นมา — ระวังด้ายรัดใต้เท้า'});wvrAdds(3+Math.min(3,pl.length-1))}
    if(ph===3){fx({k:'msg',s:'💜 เปลือกผู้ทอแตก แกนกลางเปิดออก! หมุดด้าย 3 หมุดผูกแกนไว้ ทำลายให้หมด'});wvrAdds(3,1);WVR.ank=1;wvrAdds(2+Math.min(3,pl.length-1))}}
  if(WVR.ank){if(B.hp<B.mh*.33)B.hp=B.mh*.33;if(!mons.some(m=>m.ank&&m.hp>0)){WVR.ank=0;B.hp=Math.min(B.hp,B.mh*.329);fx({k:'msg',s:'💥 หมุดด้ายขาดหมด! แกนกลางของผู้ทอสั่นไหว — ตีแกนได้แล้ว'});fx({k:'wvbr'})}}
  if(WVR.tr>0){WVR.tr-=dt;return}
  /* ① เข็ม */if(ph===1){if(WVR.nd){WVR.nd.t-=dt;if(WVR.nd.t<=0){const A=WVR.nd.a;pl.forEach(p=>{if(A.some(a=>wvOnLine(p.x,p.y,a)))wvHit(p.u,Math.round(75*dm))});fx({k:'wvnx',a:A});WVR.nd=null}}
    else{WVR.nt-=dt;if(WVR.nt<=0){WVR.nt=q9===1?2.8:q9===2?4.6:3.5;const A=pl.slice(0,3).map(p=>Math.round(Math.atan2(p.y-CY,p.x-CX)*1000)/1000);while(A.length<3)A.push(Math.round(Math.random()*6283)/1000);WVR.nd={t:1.2,a:A};fx({k:'wvnd',a:A,d:1.2})}}}
  /* ② ด้ายรัด + ซี่ใย */if(ph===2){if(WVR.rp){WVR.rp.t-=dt;if(WVR.rp.t<=0){const P=WVR.rp.p,hit=[];pl.forEach(p=>{if(P.some(([x,y])=>Math.hypot(p.x-x,(p.y-y)*1.3)<70)){wvHit(p.u,Math.round(50*dm));hit.push(p.u)}});fx({k:'wvrx',p:P,u:hit});WVR.rp=null}}
    else{WVR.rt-=dt;if(WVR.rt<=0){WVR.rt=6.5;const P=pl.slice(0,5).map(p=>[Math.round(p.x),Math.round(p.y)]);WVR.rp={t:1.4,p:P};fx({k:'wvrp',p:P,d:1.4})}}
    if(WVR.spt>0){WVR.spt-=dt;if(WVR.spt<=0){const S=WVR.sp;pl.forEach(p=>{if(S.some(i=>wvOnSp(p.x,p.y,i)))wvHit(p.u,Math.round(65*dm))});fx({k:'wvsx',s:S});WVR.sp=[]}}
    else{WVR.st-=dt;if(WVR.st<=0){WVR.st=9;const k0=(Math.random()*8)|0,S=[k0,(k0+3)%8,(k0+5)%8];WVR.sp=S;WVR.spt=1.4;fx({k:'wvsp',s:S,d:1.4})}}}
  /* ③ ดาวตก */if(ph===3){if(WVR.mp){WVR.mp.t-=dt;if(WVR.mp.t<=0){const P=WVR.mp.p;pl.forEach(p=>{if(P.some(([x,y])=>Math.hypot(p.x-x,(p.y-y)*1.4)<72))wvHit(p.u,Math.round(85*dm))});fx({k:'wvmx',p:P});WVR.mp=null}}
    else{WVR.mt-=dt;if(WVR.mt<=0){WVR.mt=4;const P=pl.slice(0,5).map(p=>[Math.round(p.x),Math.round(p.y)]);while(P.length<6){const a=Math.random()*6.283,r=Math.random()*470;P.push([Math.round(CX+Math.cos(a)*r),Math.round(CY+Math.sin(a)*r)])}WVR.mp={t:1.3,p:P};fx({k:'wvmp',p:P,d:1.3})}}}
  /* วาฬดาว */if(e8===1){WVR.wh-=dt;if(WVR.wh<=0){WVR.wh=20;fx({k:'cwwh'});setTimeout(()=>{if(!WVRI())return;WVR.nd=null;WVR.rp=null;WVR.sp=[];WVR.spt=0;WVR.mp=null;fx({k:'wvcl'});const B2=mons.find(m=>m.t===3&&m.hp>0);if(B2){const lo=WVR.ank?B2.mh*.33:1;B2.hp=Math.max(lo,B2.hp-B2.mh*.025);WVR.wk=(WVR.wk|0)+1}
      let s='🐋 วาฬดาวพุ่งชนตาข่าย! ท่าของผู้ทอขาดกลางคัน';if(WVR.ank&&!WVR.wa){const A=mons.find(m=>m.ank&&m.hp>0);if(A){A.hp=0;WVR.wa=1;s='🐋 วาฬดาวงับหมุดด้ายขาดไปหนึ่งหมุด!'}}fx({k:'msg',s})},1500)}}
  WVR.bt-=dt;if(WVR.bt<=0){WVR.bt=1;fx({k:'wvv',ph})}}
function wvrMon(m,dt,pl,spd){if(!WVRI())return false;if(m.ank){m.x=m.hx;m.y=m.hy;return true}if(Math.hypot(m.x-CX,m.y-CY)>WVRR-40){const a=Math.atan2(m.y-CY,m.x-CX);m.x=CX+Math.cos(a)*(WVRR-40);m.y=CY+Math.sin(a)*(WVRR-40)}return false}
function wvrAI(m,dt,pl,enr,dm){if(m.t!==3)return;m.x=CX;m.y=CY}
function wvrFx(o){if(!o)return false;const n=performance.now(),F=WVRFX;
  if(o.k==='wvnd'){F.nd={a:o.a||[],t0:n,d:(+o.d||1.2)*1000};return true}
  if(o.k==='wvnx'){F.nd=null;F.fx.push({k:'nx',a:o.a||[],t0:n});try{sfx('zap')}catch(e){}return true}
  if(o.k==='wvrp'){F.rp={p:o.p||[],t0:n,d:(+o.d||1.4)*1000};return true}
  if(o.k==='wvrx'){F.rp=null;if((o.u||[]).includes(uid)&&me.down<=0){F.root=n+1800;F.rx=me.x;F.ry=me.y;WVR.rk=(WVR.rk|0)+1}F.fx.push({k:'rx',p:o.p||[],t0:n});return true}
  if(o.k==='wvsp'){F.sp={s:o.s||[],t0:n,d:(+o.d||1.4)*1000};return true}
  if(o.k==='wvsx'){F.sp=null;F.fx.push({k:'sx',s:o.s||[],t0:n});try{sfx('zap')}catch(e){}return true}
  if(o.k==='wvmp'){F.mp={p:o.p||[],t0:n,d:(+o.d||1.3)*1000};return true}
  if(o.k==='wvmx'){F.mp=null;F.fx.push({k:'mx',p:o.p||[],t0:n});try{shk=Math.max(shk,.3)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='wvcl'){F.nd=null;F.rp=null;F.sp=null;F.mp=null;return true}
  if(o.k==='wvph'||o.k==='wvv'){if(o.k==='wvph'&&+o.ph!==F.ph)F.fx.push({k:'ph',t0:n});F.ph=+o.ph||1;if(!isHost()||!WVRI())WVR.ph=F.ph;return true}
  if(o.k==='wvbr'){F.fx.push({k:'br',t0:n});try{sfx('boom')}catch(e){}return true}
  if(o.k==='cwwh'&&WVRI()){F.wh=n;return true}
  return false}
/* ---------- ฉาก ---------- */
function wvrBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let a=0;a<6.283;a+=.05)trees.push({x:CX+Math.cos(a)*(WVRR+24),y:CY+Math.sin(a)*(WVRR+24),r:24,inv:1,ns:1})}
function wvrPaint(c,ox,oy,S){q9Space(c,ox,oy,S);c.fillStyle='rgba(10,6,20,.3)';c.fillRect(ox,oy,S,S);
  /* ด้ายเงินพุ่งจากขอบลานขึ้นฟ้า */c.lineCap='round';for(let k=0;k<64;k++){const a=k/64*6.283,x0=CX+Math.cos(a)*(WVRR+20),y0=CY+Math.sin(a)*(WVRR+20),L=500+((k*37)%7)*120;c.strokeStyle='rgba(210,220,255,'+(.12+((k*13)%5)*.04)+')';c.lineWidth=1.5+(k%3);c.beginPath();c.moveTo(x0,y0);c.lineTo(x0+Math.cos(a)*L*.4,y0+Math.sin(a)*L*.4-L);c.stroke()}
  c.fillStyle='rgba(0,0,0,.5)';c.beginPath();c.arc(CX+12,CY+36,WVRR+30,0,7);c.fill();c.fillStyle='#2a1e18';c.beginPath();c.arc(CX,CY+22,WVRR+28,0,7);c.fill();
  const rim=c.createRadialGradient(CX,CY,WVRR,CX,CY,WVRR+28);rim.addColorStop(0,'#6a5232');rim.addColorStop(.5,'#d8b070');rim.addColorStop(1,'#5a4224');c.fillStyle=rim;c.beginPath();c.arc(CX,CY,WVRR+26,0,7);c.fill();
  const fc=c.createRadialGradient(CX-100,CY-120,40,CX,CY,WVRR);fc.addColorStop(0,'#5a4e6a');fc.addColorStop(.6,'#3e344e');fc.addColorStop(1,'#2a2236');c.fillStyle=fc;c.beginPath();c.arc(CX,CY,WVRR,0,7);c.fill();
  /* ลายทอผ้าบนพื้น */c.strokeStyle='rgba(216,176,112,.35)';c.lineWidth=2;for(const r of[120,240,360,480]){c.beginPath();c.arc(CX,CY,r,0,7);c.stroke()}
  for(let k=0;k<8;k++){const a=k*Math.PI/4;c.strokeStyle='rgba(30,24,40,.7)';c.lineWidth=34;c.beginPath();c.moveTo(CX+Math.cos(a)*70,CY+Math.sin(a)*70+6);c.lineTo(CX+Math.cos(a)*WVRR,CY+Math.sin(a)*WVRR+6);c.stroke();c.strokeStyle='#8a7a9a';c.lineWidth=26;c.beginPath();c.moveTo(CX+Math.cos(a)*70,CY+Math.sin(a)*70);c.lineTo(CX+Math.cos(a)*WVRR,CY+Math.sin(a)*WVRR);c.stroke();c.strokeStyle='#cfc4e0';c.lineWidth=12;c.stroke();c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=2;c.setLineDash([12,9]);c.stroke();c.setLineDash([])}
  c.fillStyle='rgba(255,240,210,.55)';const R0=gxRng(4510);for(let i=0;i<60;i++){const a=R0()*6.283,r=Math.sqrt(R0())*(WVRR-30);c.fillRect(CX+Math.cos(a)*r,CY+Math.sin(a)*r,2,2)}
  c.fillStyle='#1e1828';c.beginPath();c.arc(CX,CY,70,0,7);c.fill();c.strokeStyle='#d8b070';c.lineWidth=4;c.beginPath();c.arc(CX,CY,70,0,7);c.stroke()}
function wvrDraw(){if(!WVRI())return;const T=performance.now()/1000,now=performance.now(),F=WVRFX;g.save();
  if(F.nd){const k=Math.min(1,(now-F.nd.t0)/F.nd.d),pu=.5+.5*Math.sin(T*20);for(const a of F.nd.a){g.save();g.translate(CX,CY);g.rotate(a);g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,90,120,'+(.12+.25*k*pu)+')';g.fillRect(40,-40,WVRR,80);g.strokeStyle='rgba(255,190,200,'+(.5+.5*k)+')';g.lineWidth=2.5;g.setLineDash([16,10]);g.lineDashOffset=-T*80;g.beginPath();g.moveTo(40,-40);g.lineTo(WVRR+30,-40);g.moveTo(40,40);g.lineTo(WVRR+30,40);g.stroke();g.setLineDash([]);g.restore()}}
  if(F.sp){const k=Math.min(1,(now-F.sp.t0)/F.sp.d),pu=.5+.5*Math.sin(T*18);for(const i of F.sp.s){g.save();g.translate(CX,CY);g.rotate(i*Math.PI/4);g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,120,150,'+(.12+.22*k*pu)+')';g.fillRect(70,-40,WVRR-70,80);g.restore()}}
  const circ=(P,k,col,lab)=>{for(const[x,y]of P){g.fillStyle='rgba('+col+','+(.12+.25*k)+')';g.beginPath();g.ellipse(x,y,72,52,0,0,7);g.fill();g.strokeStyle='rgba('+col+',.9)';g.lineWidth=2.4;g.beginPath();g.ellipse(x,y,72*k,52*k,0,0,7);g.stroke()}};
  if(F.rp){const k=Math.min(1,(now-F.rp.t0)/F.rp.d);circ(F.rp.p,k,'200,170,255');for(const[x,y]of F.rp.p){g.strokeStyle='rgba(230,220,255,.7)';g.lineWidth=1.4;for(let q=0;q<6;q++){const a=q/6*6.283+T;g.beginPath();g.moveTo(x+Math.cos(a)*70,y+Math.sin(a)*50);g.lineTo(x+Math.cos(a)*20*k,y+Math.sin(a)*14*k);g.stroke()}}}
  if(F.mp){const k=Math.min(1,(now-F.mp.t0)/F.mp.d);circ(F.mp.p,k,'255,160,80');if(!LOWQ)for(const[x,y]of F.mp.p){const sy=y-520*(1-k);g.save();g.globalCompositeOperation='lighter';glowAt(x+90*(1-k),sy,26,'255,230,180',.9);g.restore()}}
  F.fx=F.fx.filter(e=>now-e.t0<900);for(const e of F.fx){const k=(now-e.t0)/900;g.save();g.globalCompositeOperation='lighter';
    if(e.k==='nx')for(const a of e.a){for(let q=0;q<4;q++){const r=60+(k*1.3+q*.22)%1*WVRR;glowAt(CX+Math.cos(a)*r,CY+Math.sin(a)*r,26,'255,220,230',.8*(1-k))}}
    else if(e.k==='sx')for(const i of e.s){const a=i*Math.PI/4,r=70+k*(WVRR-70);glowAt(CX+Math.cos(a)*r,CY+Math.sin(a)*r,60,'255,210,230',.8*(1-k))}
    else if(e.k==='rx'||e.k==='mx')for(const[x,y]of e.p)glowAt(x,y,90*(1-k*.4),e.k==='mx'?'255,170,90':'200,170,255',.7*(1-k));
    else{g.strokeStyle='rgba(220,200,255,'+(1-k)+')';g.lineWidth=12*(1-k);g.beginPath();g.arc(CX,CY,60+k*WVRR,0,7);g.stroke()}g.restore()}
  /* ด้ายรัดตัวเอง */if(F.root>now&&me.down<=0){me.x=F.rx;me.y=F.ry;g.strokeStyle='rgba(220,210,255,.9)';g.lineWidth=2;for(let q=0;q<5;q++){g.beginPath();g.ellipse(me.x,me.y-18+q*6,16,5,0,0,7);g.stroke()}}
  /* หมุดด้าย */for(const m of mons){if(!m.ank||m.hp<=0)continue;g.save();g.strokeStyle='rgba(230,220,255,.85)';g.lineWidth=3;g.setLineDash([10,6]);g.lineDashOffset=-T*30;g.beginPath();g.moveTo(m.x,m.y-50);g.lineTo(CX,CY-90);g.stroke();g.setLineDash([]);
    PALSH(m.x,m.y+4,30,8,.45);g.fillStyle='#5a4a3a';g.fillRect(m.x-12,m.y-70,24,70);g.fillStyle='#d8b070';g.fillRect(m.x-16,m.y-76,32,10);g.globalCompositeOperation='lighter';glowAt(m.x,m.y-50,30,'220,200,255',.4+.2*Math.sin(T*4+m.id));g.restore()}
  if(me.cls&&me.down<=0){let t='';if(F.root>now)t='🕸️ ด้ายรัด! ติดอยู่กับที่';else if(F.nd&&F.nd.a.some(a=>wvOnLine(me.x,me.y,a)))t='🪡 แนวเข็ม! หลบออกจากเส้น';else if(F.sp&&F.sp.s.some(i=>wvOnSp(me.x,me.y,i)))t='🕸️ ด้ายจะกระตุก!';else if(F.rp&&F.rp.p.some(([x,y])=>Math.hypot(me.x-x,(me.y-y)*1.3)<70))t='🕸️ ด้ายรัดใต้เท้า! ออกจากวง';else if(F.mp&&F.mp.p.some(([x,y])=>Math.hypot(me.x-x,(me.y-y)*1.4)<72))t='☄️ ดาวตก! ออกจากวง';
    if(t){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,6,20,.9)';g.strokeText(t,me.x,me.y-88);g.fillStyle='#ffe0f0';g.fillText(t,me.x,me.y-88)}}
  g.restore()}
{const f1=MV1D[441];MV1D[441]=(r,T,W,bob)=>{if(typeof MON_CUR!=='undefined'&&MON_CUR&&MON_CUR.ank)return true;return f1(r,T,W,bob)}}
function wvrScreen(){if(!WVRI())return;const now=performance.now(),F=WVRFX;g.save();g.setTransform(DPR,0,0,DPR,0,0);const vg=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.8);vg.addColorStop(0,'rgba(12,6,24,0)');vg.addColorStop(1,'rgba(12,6,24,.45)');g.fillStyle=vg;g.fillRect(0,0,SW0,H);
  if(F.wh&&now-F.wh<3200){const k=(now-F.wh)/3200,x=-SW0*.4+k*SW0*1.8,y=H*.16+Math.sin(k*Math.PI)*H*.06,s=Math.min(SW0,H)*.0026;g.save();g.translate(x,y);g.scale(s*60,s*60);g.globalAlpha=Math.sin(k*Math.PI)*.85;const wg=g.createLinearGradient(0,-1,0,1);wg.addColorStop(0,'#5a7ac8');wg.addColorStop(1,'#1a2a5a');g.fillStyle=wg;g.beginPath();g.ellipse(0,0,2.2,.7,0,0,7);g.fill();g.beginPath();g.moveTo(-2,0);g.lineTo(-3.1,-.7);g.lineTo(-2.9,.1);g.lineTo(-3.1,.8);g.closePath();g.fill();g.fillStyle='#fff';g.beginPath();g.arc(1.5,-.15,.07,0,7);g.fill();g.restore()}
  const pt=F.fx.find(e=>e.k==='ph');if(pt){const k=(now-pt.t0)/900;g.fillStyle='rgba(255,255,255,'+(.5*(1-k))+')';g.fillRect(0,0,SW0,H)}
  let t='ร่าง '+['','① แขนเข็ม','② กี่ทอ','③ แกนกลาง'][F.ph||1];const na=mons.filter(m=>m.ank&&m.hp>0).length;if(na)t+=' · ทำลายหมุดด้ายอีก '+na+' หมุด';
  g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(10,6,20,.85)';g.strokeText(t,SW0/2,H*.26);g.fillStyle='#f0e4ff';g.fillText(t,SW0/2,H*.26);g.restore()}
/* ---------- บอส: ผู้ทอ ---------- */
BV1['ผู้ทอ']=(T,W,br,sw,up,cf)=>{const b=br,ph=WVRFX.ph||1,pu=.55+.35*Math.sin(T*2.2),IR='#3a3446',BR='#a8803c',CO='#b070ff';bvShadow(86,20,.32);
  /* กี่ทอด้านหลัง */vK(W,[[-70,30],[-70,-120+b]],'#5a4632',7);vK(W,[[70,30],[70,-120+b]],'#5a4632',7);vK(W,[[-76,-118+b],[76,-118+b]],BR,6);
  if(!W){g.save();g.strokeStyle='rgba(225,230,255,'+(ph===2?.85:.45)+')';g.lineWidth=1;for(let k=-6;k<=6;k++){g.beginPath();g.moveTo(k*10,-114+b);g.lineTo(k*10+Math.sin(T*3+k)*(ph===2?6:2),20);g.stroke()}g.restore();if(ph===2)bvAdd(W,()=>glowAt(0,-50+b,90,'220,210,255',.2*pu))}
  /* แขนเข็ม (ร่าง ③ เหลือสองแขน) */const arms=ph===3?[[-1,.2],[1,.2]]:[[-1,-.6],[-1,.1],[-1,.75],[1,-.6],[1,.1],[1,.75]];
  for(const[s,a0]of arms){const a=a0+Math.sin(T*2+a0*3)*.12-(ph===1?cf*.3:0),ex=s*(48+Math.cos(a)*30),ey=-40+b+Math.sin(a)*30,fx=s*(80+Math.cos(a)*40),fy=-30+b+Math.sin(a)*50+30;vLimb(W,[s*24,-40+b,ex,ey,fx,fy],IR,7,5);vK(W,[[fx,fy],[fx+s*14,fy+30]],'#d8dce8',2.4)}
  /* ลำตัว */bvE(W,0,-40+b,40,32,IR,1,1.8);if(ph<3){vS(W,[[-34,-56+b],[0,-72+b],[34,-56+b],[26,-30+b],[-26,-30+b]],'#4e4660',1,1.2);for(const s of[-1,1])bvDE(W,s*18,-50+b,3,3,BR)}
  /* แกนกลาง (หัวใจความกลัว) */const cr=ph===3?18:ph===2?11:8;bvE(W,0,-40+b,cr+4,cr+4,'#2a1a40',1,1.2);bvE(W,0,-40+b,cr,cr,CO,0,1);bvAdd(W,()=>{glowAt(0,-40+b,cr*3,'190,120,255',.5*pu+(ph===3?.3:0));glowAt(0,-40+b,cr,'255,230,255',.6)});
  if(ph===3&&!W){g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=1.2;for(const[x1,y1,x2,y2]of[[-30,-60,-14,-44],[24,-62,12,-46],[-26,-20,-12,-34],[28,-24,14,-36]]){g.beginPath();g.moveTo(x1,y1+b);g.lineTo(x2,y2+b);g.stroke()}}
  /* หัว: หน้ากากตาเดียว */const hy=-82+b;bvE(W,0,hy,18,14,'#4e4660',1,1.4);vEye(W,0,hy,6,5,ph===3?'#ffb0ff':'#e0d0ff',W?0:8);vS(W,[[-16,hy-8],[-8,hy-20],[0,hy-12],[8,hy-20],[16,hy-8]],BR,1,1)};
BVS['ผู้ทอ']=1.5;
function wvrReward(){if(dgRew)return;dgRew=1;const D=DT[31],st=stCur(),sto=st&&st.g==='wvr',gd=sto?D.gold:100000;WVRFX={ph:1,nd:null,rp:null,sp:null,mp:null,fx:[],wh:0,root:0,rx:0,ry:0};
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?30:7));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?40:9+(Math.random()*6|0),'ยอดหอทอดาว')}catch(e){}try{ecGive(sto?40:9+(Math.random()*5|0),'ยอดหอทอดาว')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});if(sto)drops.push({x:me.x,y:me.y-20,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?24:7,'ยอดหอทอดาว')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.wvT=Date.now();
  banner={s:'🕸️ ผู้ทอหยุดทอแล้ว · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?30:7),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffffff','#e8d8ff','#b070ff','#fff0c0'],170,320,1.8,{glow:1,g:-50});
  setTimeout(()=>{if(WVRI())enterMap(42,wvrBack())},10000)}
function instRepeatWvr(){const l=Math.max(0,(me.wvT||0)+30*60000-Date.now());
  stSay([['cel42','ผู้ทอฝันร้ายบางคืน… ถ้ามันเริ่มทออีก ข้าต้องการคนช่วยปลุกมัน จะขึ้นไปยอดหอไหม?']],()=>{},{choice:[[l>0?'🕸️ ยอดหอทอดาว (อีก '+Math.ceil(l/60000)+' นาที)':'🕸️ ยอดหอทอดาว (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🕸️ ผู้ทอยังหลับสนิท · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(wvrEnter,250)}};return true}
/* ---------- รางวัลจบภาค: สัตว์เลี้ยง «ดาวน้อย» · สัตว์ขี่ «ดาวหางเงิน» ---------- */
function petStarD(x,y,fx,t,mv,S){g.save();g.translate(x,y-14+Math.sin(t*2.4)*3);g.scale(S||1,S||1);g.save();g.globalCompositeOperation='lighter';glowAt(0,0,22,'255,240,180',.5);g.restore();
  g.rotate(Math.sin(t*1.3)*.2);g.fillStyle='#fff3b0';g.strokeStyle='#c8902a';g.lineWidth=1.2;g.beginPath();for(let k=0;k<5;k++){const a=k/5*6.283-1.571;g.lineTo(Math.cos(a)*10,Math.sin(a)*10);g.lineTo(Math.cos(a+.63)*4.4,Math.sin(a+.63)*4.4)}g.closePath();g.fill();g.stroke();
  g.fillStyle='#3a2a10';g.beginPath();g.arc(-2.4,-.5,1.1,0,7);g.arc(2.4,-.5,1.1,0,7);g.fill();g.strokeStyle='#3a2a10';g.lineWidth=.8;g.beginPath();g.arc(0,1.2,1.8,.3,2.84);g.stroke();g.fillStyle='rgba(255,150,170,.6)';g.beginPath();g.arc(-4,1.5,1.2,0,7);g.arc(4,1.5,1.2,0,7);g.fill();
  g.restore();if(!LOWQ){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<4;k++){const q=(t*.8+k/4)%1;g.fillStyle='rgba(255,240,190,'+(1-q)+')';g.fillRect(x-(fx||1)*q*16-1,y-14+q*8,2,2)}g.restore()}}
function mtComet(x,y,fx,ph,t,sc){const S=sc||1,mv=!!ph,bob=Math.sin(t*2.6)*2+(mv?Math.sin(t*10)*.8:0);g.save();g.translate(x,y);g.scale(fx*S,S);
  g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(-60,0,0,0);gr.addColorStop(0,'rgba(170,200,255,0)');gr.addColorStop(1,'rgba(220,235,255,.85)');g.fillStyle=gr;g.beginPath();g.moveTo(0,-8+bob);g.quadraticCurveTo(-30,-14+bob+Math.sin(t*4)*2,-62,-2+bob);g.quadraticCurveTo(-30,8+bob,0,6+bob);g.fill();
  for(let k=0;k<6;k++){const q=(t*1.2+k/6)%1;g.fillStyle='rgba(255,255,255,'+(1-q)+')';g.fillRect(-q*60,-4+Math.sin(k*2)*5+bob,2,2)}glowAt(4,-1+bob,20,'220,235,255',.6);g.restore();
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,14,18,4,0,0,7);g.fill();
  const bg=g.createRadialGradient(2,-4+bob,2,0,0+bob,14);bg.addColorStop(0,'#ffffff');bg.addColorStop(.6,'#c8d8ff');bg.addColorStop(1,'#7a90d8');g.fillStyle=bg;g.beginPath();g.ellipse(0,-1+bob,16,9,0,0,7);g.fill();g.strokeStyle='#5a6aa8';g.lineWidth=1;g.stroke();
  g.fillStyle='#e8f0ff';g.beginPath();g.moveTo(-6,-8+bob);g.lineTo(0,-16+bob);g.lineTo(4,-8+bob);g.fill();g.restore()}
/* ---------- ฉากจบ e9 ---------- */
const STE9={1:[['me','(วางมือบนแกนกลางของผู้ทอที่ยังเต้นอ่อน ๆ) …พอแล้ว ไม่มีใครต้องกลัวความมืดอีกแล้ว ปล่อยพวกเขาไปเถอะ'],
   ['cel42','(เซเลสต์ร้องเพลงกล่อมเพลงเดิม… แต่ด้วยเสียงของนางเอง) «นอนเถิดลูกเอ๋ย ฟ้าจะมืดบ้าง สว่างบ้าง ดาวจะกลับมาเสมอ»'],
   ['nar','ผู้ทอฟังจนจบเพลง แล้วคลายด้ายเส้นแรก… เส้นที่สอง… ตาข่ายดาวทั้งผืนคลายออกเหมือนดอกไม้บาน ดาวนับล้านดวงลอยกลับขึ้นฟ้าพร้อมกัน'],
   ['lum3','(ลูมิน่าเรืองแสงจนมองแทบไม่เห็นตัว) ข้าต้องกลับขึ้นไปแล้ว… ข้างดาวเหนือ ที่ที่ข้าจากมา'],['lum3','มองขึ้นมานะ ทุกคืน ข้าจะกระพริบให้เจ้าสามครั้ง'],
   ['nar','คืนนั้น ทั่วทั้งโลก ทุกคนเงยหน้ามองฟ้าที่สว่างที่สุดในประวัติศาสตร์… ที่ค่ายผู้อพยพ เด็กคนหนึ่งชี้นิ้วไปที่ดาวดวงเล็กข้างดาวเหนือ ดาวดวงนั้นกระพริบสามครั้ง']],
 2:[['me','(วางมือบนแกนกลางของผู้ทอ) ไม่ต้องทำลายเจ้าหรอก… แต่ต้องทอใหม่ ทอให้ดาวเป็นอิสระ'],
   ['cel42','ท่านอาจารย์อยากเก็บดาวไว้ให้ทุกคน… งั้นเราทอทางให้ทุกคนขึ้นมาหาดาวเองเถอะ!'],
   ['nar','ผู้ทอหยุดนิ่ง แล้วเริ่มทอใหม่อย่างช้า ๆ… ตาข่ายคลายเป็นเส้นเงินเส้นเดียว ทอดยาวจากยอดหอลงไปถึงผืนดิน กลายเป็น «สะพานดาว»'],
   ['nar','ดาวส่วนใหญ่ลอยกลับขึ้นฟ้า บางดวงเลือกอยู่ต่อ ห้อยเรียงเป็นโคมตลอดสะพาน ส่องทางให้ใครก็ตามที่อยากขึ้นมาดูดาวใกล้ ๆ'],
   ['lum3','ข้าจะอยู่เฝ้าสะพานนี้… ใครขึ้นมาข้าจะเล่าเรื่องดาวทุกดวงให้ฟัง รวมถึงเรื่องของเจ้าด้วย'],
   ['nar','คืนแรกที่สะพานดาวเปิด เด็ก ๆ จากค่ายผู้อพยพวิ่งขึ้นไปเป็นกลุ่มแรก เสียงหัวเราะดังไปถึงยอดหอทอดาว และผู้ทอ… ร้องเพลงกล่อมคลอไปด้วยเบา ๆ']]};
const p9EndName=()=>((me.sty&&me.sty.e9)===2?'ผู้ถักสะพานดาว':'ผู้คืนดาวสู่ฟ้า');
/* ---------- เนื้อเรื่องภาค 9 บทที่ 5 ---------- */
STCH.push('ภาค 9 · บทที่ 5 · ผู้ทอ (บทจบ)');
{const C5=STCH.length-1;STY.push(
 {c:C5,g:'talk',k:'lum3',p9s8:1,tx:'คุยกับลูมิน่าที่ใจกลางตาข่าย · ทางขึ้นยอดหอทอดาว',
  pre:[['lum3','ภาพสะท้อนแตกแล้ว… ด้ายทุกเส้นในตาข่ายชี้ไปทางเดียว ยอดหอทอดาว'],
   ['lum3','ผู้ทอโกรธมาก มันทอกำแพงหนาขึ้นทุกนาที แต่ด้ายที่วาฬดาวชนขาดไว้ยังเป็นช่องให้เราลอดขึ้นไปได้',0,0,0,0,0,0,0,1,1],
   ['lum3','ผู้ทอโกรธมาก มันทอกำแพงหนาขึ้นทุกนาที… เราต้องฝ่าขึ้นไปตรง ๆ',0,0,0,0,0,0,0,2,1],
   ['lum3','ผู้ทอยังงัวเงียอยู่ ด้ายรอบยอดหอหย่อนพอให้เราปีนขึ้นไปเงียบ ๆ',0,0,0,0,0,0,0,0,2],
   ['cel42','ข้าจะพูดกับมัน… ด้วยเสียงของข้าเอง ไม่ใช่เสียงความกลัวของท่านอาจารย์'],
   ['lum3','ผู้ทอมีสามร่าง แขนเข็ม กี่ทอ และแกนกลางที่ความกลัวติดอยู่… พร้อมเมื่อไหร่บอกข้า ข้าจะพาขึ้นไป']],rw:{g:200000,s3:8}},
 {c:C5,g:'wvr',k:'lum3',p9tv:1,tx:'ยอดหอทอดาว: หยุดผู้ทอ 3 ร่าง (ปาร์ตี้แนะนำ · เล่นเดี่ยวได้)',
  pre:[['lum3','ร่างแรกยิงเข็มเป็นแนว ร่างที่สองรัดด้ายใต้เท้า ร่างสุดท้ายผูกแกนไว้กับหมุดสามหมุด… ระวังดาวที่มันดึงลงมาด้วย'],['lum3','พร้อมเมื่อไหร่บอกข้า']],
  post:[['nar','ผู้ทอทรุดลงกลางยอดหอ แขนเข็มทุกแขนวางลงกับพื้น… แกนกลางสีม่วงยังเต้นอยู่อ่อน ๆ และมันยังร้องเพลงกล่อมแผ่ว ๆ'],
   ['nar','«ท่านยังกลัวอยู่… ข้ารู้สึกได้…» เสียงนั้นสั่นเครือ มันไม่ได้พูดกับผู้บุกรุก มันพูดกับตัวเอง']]},
 {c:C5,g:'talk',k:'cel42',p9e9:1,tx:'ตัดสินชะตาของตาข่ายดาว (ฉากจบภาค 9)',
  pre:[['cel42','(เซเลสต์คุกเข่าข้างแกนกลาง) ผู้ทอไม่ใช่ปีศาจ… มันคือความรักของท่านอาจารย์ที่ถูกความกลัวกลืนไป'],
   ['lum3','ดาวทุกดวงในตาข่ายรอคำตอบอยู่… ข้าด้วย'],['cel42','เจ้าเป็นคนพาเรามาถึงตรงนี้ ผู้ถือตรา… เจ้าเลือกเถิด']],
  post:[['nar','— หลายวันต่อมา ที่ค่ายผู้อพยพ —'],
   ['nar','ออร์รีที่ยอดหอดูดาวนับดาวครบทุกดวงเป็นครั้งแรกในสามร้อยปี มันนับซ้ำสามรอบเพื่อให้แน่ใจ แล้วจดลงสมุดว่า «ครบ»',0,0,0,0,0,0,0,0,0,1],
   ['nar','ออร์รีที่ยอดหอดูดาวเปลี่ยนเลนส์กล้องใหญ่ให้หันไปทางสะพานดาว แล้วนับคนที่เดินขึ้นไปแทนการนับดาว',0,0,0,0,0,0,0,0,0,2],
   ['cel42','ข้าจะเขียนหน้าสุดท้ายในสมุดของท่านอาจารย์ให้จบ… «ความมืดไม่ได้กลืนฟ้า เราแค่ต้องเรียนรู้ที่จะรอดาว»'],
   ['nar','🌌 — จบภาค 9 · ห้วงดาวไร้ขอบ — ขอบคุณที่เดินทางมาด้วยกันจนถึงยอดฟ้า'],['nar','ภาคต่อไปเร็ว ๆ นี้']],rw:{g:400000,s3:20}})}
setTimeout(()=>{
  try{DGTH[31]='harbor'}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=45000&&id<46000)return wvrMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(WVRI())return wvrStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(WVRI())return wvrSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(WVRI()){try{rnShard(4)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.4)}}catch(e){}return wvrReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=WVRI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(WVRI()){enterMap(42,wvrBack());sysMsg('🕸️ ถูกด้ายเหวี่ยงตกจากยอดหอ… คุยกับลูมิน่าเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(WVRI()){const s=' · ร่าง '+(WVRFX.ph||1);return dg.ph==='boss'||dg.ph==='run'?'🕸️ ผู้ทอ'+s+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🕸️ ผู้ทอหยุดทอแล้ว':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🕸️ ยอดหอทอดาว · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(WVRI()){ov.hidden=true;sfx('gate');enterMap(42,wvrBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(wvrFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{wvrDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{wvrScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='wvr')return instRepeatWvr();return _ir(k)}}catch(e){}
  /* สัตว์เลี้ยง/สัตว์ขี่ */
  try{const _dp=drawPet;window.drawPet=drawPet=function(id,x,y,fx,t,mv,sc,noSh){if(id===PT_N&&PETS[id]&&PETS[id].star9){try{petStarD(x,y,fx,t,mv,sc);return}catch(e){}}return _dp.apply(this,arguments)}}catch(e){}
  try{const _dm2=drawMount;window.drawMount=drawMount=function(id,x,y,fx,ph,t,sc){if(id===8){try{mtComet(x,y,fx,ph,t,sc);return}catch(e){}}return _dm2.apply(this,arguments)}}catch(e){}
  try{const _mb=mountBuy;window.mountBuy=mountBuy=function(id){if(id===8)return mountUI('☄️ ดาวหางเงิน ได้จากการจบภาค 9 · ห้วงดาวไร้ขอบ');return _mb.apply(this,arguments)}}catch(e){}
  /* ฉากจบ e9 + รางวัลจบภาค */
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur(),q=me.sty;
    if(st&&st.p9e9&&q&&!q.e9){q.a=2;setTimeout(()=>{stSay([['me','(ผู้ทอ เซเลสต์ ลูมิน่า และดาวนับล้านดวงในตาข่าย รอคำตอบเดียว…)']],()=>{},{cine:1,choice:[['🌠 คืนดาวทุกดวงสู่ฟ้า (รื้อตาข่าย · ลูมิน่ากลับเป็นดาว)',1],['🕸️ ทอตาข่ายใหม่เป็นสะพานดาว (ลูมิน่าเฝ้าสะพาน)',2]]});
      SD.onChoose=e=>{q.e9=e;stClose();setTimeout(()=>stSay(STE9[e],()=>{_st();setTimeout(()=>{try{petGive(PT_N)}catch(_){}try{me.mts=me.mts||[];if(!me.mts.includes(8)){me.mts.push(8)}}catch(_){}try{sdGive(30,'จบภาค 9')}catch(_){}
        banner={s:(e===1?'🌠 ดาวทุกดวงกลับสู่ฟ้า':'🕸️ สะพานดาวเปิดแล้ว')+' · ฉายา «'+p9EndName()+'» · สัตว์เลี้ยง «ดาวน้อย» · สัตว์ขี่ «ดาวหางเงิน»',t:9};try{stFlash()}catch(_){}try{achCheck()}catch(_){}try{writeSave()}catch(_){}},600)},{cine:1}),250)}},200);return}
    return _st()}}catch(e){}
  /* หลังจบภาค: ตาข่ายไม่มีดาวห้อยแล้ว · ยอดหอเปลี่ยนตามฉากจบ */
  try{const _sp=PALK.q9spire;PALK.q9spire=function(t,T){const e9=me.sty&&me.sty.e9;if(!e9)return _sp.apply(this,arguments);const x=t.x,y=t.y;g.save();g.globalAlpha=.85;g.fillStyle='#2a2440';g.beginPath();g.moveTo(x-50,y+80);g.lineTo(x-14,y-420);g.lineTo(x,y-470);g.lineTo(x+14,y-420);g.lineTo(x+50,y+80);g.closePath();g.fill();g.globalCompositeOperation='lighter';
    if(e9===2){const pu=.6+.4*Math.sin(T*1.5);g.strokeStyle='rgba(255,230,170,'+(.5*pu)+')';g.lineWidth=10;g.beginPath();g.moveTo(x,y-470);g.quadraticCurveTo(x+600,y-900,x+1400,y+200);g.stroke();for(let k=0;k<12;k++){const u=k/12,bx=(1-u)*(1-u)*x+2*u*(1-u)*(x+600)+u*u*(x+1400),by=(1-u)*(1-u)*(y-470)+2*u*(1-u)*(y-900)+u*u*(y+200);glowAt(bx,by,14,'255,240,190',.7)}}
    else glowAt(x,y-470,40,'230,235,255',.4);g.restore()}}catch(e){}
},0);
