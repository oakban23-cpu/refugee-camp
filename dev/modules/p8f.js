/* ---------- v532 ดันเจี้ยน «ในท้องวาฬ» (ห้อง 46000–46999 · DT[27] · ธีมมอน 40) ----------
   ท้องวาฬยาวจากปาก (ซ้าย) ถึงห้องหัวใจ (ขวา) · พื้นเนื้อชมพูเข้ม ซี่โครงงาช้างพาดขวางเป็นแถบ = ที่ยืนพ้นกรด
   กรดขึ้นลงเป็นจังหวะ: ลดต่ำ ~9 วิ → เตือน (ฟองผุด) 2 วิ → ท่วม 4.5 วิ (ยืนบนซี่โครง/แท่นกระดูก ไม่งั้นโดนกรดทุกครึ่งวิ)
   ผนังท้องบีบ: แถบขอบบน-ล่าง (ห้องหัวใจ = วงนอก) เตือน 1.6 วิแล้วบีบ ดันเข้ากลาง + ดาเมจ
   ช่วงเดิน: ปรสิต 3 รัง ฆ่าให้หมด → เยื่อกั้นห้องหัวใจเปิด → เดินเข้าห้อง = บอสตื่น
   บอส «ผู้เฝ้าไข่มุก» (ปรสิตแสงเกาะหัวใจวาฬ · 9.8 ล้าน · Lv 142): หนวดแสง (แนวเส้นรัศมี) · ดูดแสง (ดึงทุกคนเข้าหา วงในโดนหนัก) · พ่นสปอร์ (ปรสิตเพิ่ม)
   เลือด 50%: หดเข้าไข่มุก (อมตะ 6 วิ) + กรดท่วมทันที · ต่ำกว่า 40% ท่าถี่ขึ้น · หลายคน: โฮสต์ส่งสถานะทุก 0.4 วิ (wbv) */
setTimeout(()=>{DT[27]={n:'ในท้องวาฬ',lv:1,L:142,bL:22,hp:9800000,xp:1000000,g:130000,dm:74,tn:10,sm:0,rm:4,lg:1,tm:900,gold:880000,exp:7800000}},0);
const WBLI=()=>!!(MAPS[curMap]&&MAPS[curMap].wbl),wblBack=()=>({x:620,y:1720});
const WBX0=CX-1050,WBXM=CX+400,WBCX=CX+720,WBRX=330,WBRY=300;
const WBRB=[CX-830,CX-590,CX-350,CX-110,CX+130,CX+330],WBPL=[[CX+560,CY-175],[CX+560,CY+175],[CX+890,CY-175],[CX+890,CY+175],[CX+720,CY]];
const wbHH=x=>215+38*Math.sin((x-CX)/170)+(x<WBX0+160?-(WBX0+160-x)*.45:0);
function wbInC(x,y,m){return Math.pow((x-WBCX)/(WBRX-(m||0)),2)+Math.pow((y-CY)/(WBRY-(m||0)),2)<1}
function wblIn(x,y,m){m=m||0;if(x>WBX0+m&&x<WBXM+40&&Math.abs(y-CY)<wbHH(x)-m)return true;return wbInC(x,y,m)}
/* ที่ปลอดกรด: ซี่โครงในท้อง (แถบกว้าง 68) · แท่นกระดูกในห้องหัวใจ (วงรี 74×48) */
function wbSafe(x,y){for(const r of WBRB)if(Math.abs(x-r)<34&&x<WBXM+20&&Math.abs(y-CY)<wbHH(x))return true;for(const[px,py]of WBPL)if(Math.pow((x-px)/74,2)+Math.pow((y-py)/48,2)<1)return true;return false}
/* ขอบที่ผนังบีบ */
function wbOuter(x,y){if(wbInC(x,y,0)&&x>WBXM-10)return Math.pow((x-WBCX)/WBRX,2)+Math.pow((y-CY)/WBRY,2)>.6*.6+.0001&&Math.hypot((x-WBCX)/WBRX,(y-CY)/WBRY)>.66;return Math.abs(y-CY)>wbHH(x)*.52}
let WBQ={ac:0,at:9,sq:0,st:16,sk:0,bt:0,mb:1,a7:0,a3:0,sh:0,sp:12},WBFX={t:[],d:[],x:[],b:[]},WBLT=0;
const wblReset=()=>{WBQ={ac:0,at:9,sq:0,st:16,sk:0,bt:0,mb:1,a7:0,a3:0,sh:0,sp:12};WBFX={t:[],d:[],x:[],b:[]}};
const WBL_IN=[['nar','ปากวาฬปิดลงข้างหลังเสียงดังสนั่น ความมืดอุ่นชื้นโอบรอบตัว… แล้วจุดเรืองแสงสีฟ้าบนผนังท้องก็ค่อย ๆ สว่างขึ้นทีละดวง'],
  ['grif','(เสียงกริฟก้องมาจากข้างนอก) สมอเรือดำง้างปากมันไว้ได้ไม่นาน! หานาวินให้เจอแล้วรีบออกมา!'],
  ['nar','💡 กรดในท้องขึ้นลงเป็นจังหวะ: ฟองผุด = กรดกำลังขึ้น → ยืนบนซี่โครงสีงาช้างที่พาดขวาง (ห้องหัวใจ = แท่นกระดูก) · ผนังท้องบีบ (แถบแดงขอบบน-ล่าง) → เข้ากลาง · ฆ่าปรสิตทั้งสามรังให้หมด เยื่อกั้นห้องหัวใจถึงจะเปิด']];
function wblMap(id){if(MAPS[id])return MAPS[id];const D=DT[27];wblReset();
  return MAPS[id]={n:'ในท้องวาฬ',dg:27,wbl:1,th:40,bth:40,sx:WBX0+110,sy:CY,sr:0,seed:402,bg:'#1a0a12',tile:'#4a1a2c',safe:'#5a2236',ring:'#9ad8ff',t1:'#2a0c18',t2:'#4a1a2c',d1:'#6a2a40',d2:'#ffd8e8',nests:[],
    gates:[{x:WBX0+60,y:CY+150,to:39,req:1,ars:1,nm:'ปากวาฬ (ออกไปสุสานเรือ)',arr:wblBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:WBCX+40,y:CY,n:'ผู้เฝ้าไข่มุก',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:142,col:'#c8f0ff',bar:'#3a6a8a',ln:'#e8fbff',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'ห้องหัวใจวาฬ',dg:1}}}
function wblEnter(){if(!me.cls||me.down>0||isDg())return;const id=46000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🐋 เปิดดันในท้องวาฬ รหัส '+id+' มาช่วยกันตามหานาวิน!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  wblReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:WBX0+110,y:CY});setTimeout(()=>{if(WBLI()&&dg.ph==='lobby')banner={s:'🐋 ในท้องวาฬ · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
/* รังปรสิต 3 รังตามทางเดิน */
function wblNest(cx,n){const D=DT[27],np=Math.max(1,plCount());for(let i=0;i<n;i++){let x=cx+rnd(-110,110),y=CY+rnd(-120,120),k=0;while(!wblIn(x,y,40)&&k++<20){x=cx+rnd(-100,100);y=CY+rnd(-100,100)}
    const t=i%3,L=D.L,hp=mhp(t,L)*(1.25+.25*(np-1));mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,wbl:1,wr:1})}}
function wblAdds(n){const D=DT[27],np=Math.max(1,plCount());for(let i=0;i<n;i++){const a=Math.random()*6.28,x=WBCX+Math.cos(a)*rnd(140,230),y=CY+Math.sin(a)*rnd(110,200),t=Math.random()<.5?0:(Math.random()<.5?1:2),L=D.L,hp=mhp(t,L)*(1.3+.25*(np-1));
    mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,wbl:1})}}
function wblStart(){if(!WBLI()||dg.ph!=='lobby')return;const D=DT[27],np=Math.max(1,plCount());stSay(WBL_IN,()=>{if(!WBLI()||dg.ph!=='lobby')return;dg={ph:'run',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;wblReset();
  wblNest(CX-600,3+Math.min(3,np-1));wblNest(CX-120,4+Math.min(3,np-1));wblNest(CX+250,4+Math.min(3,np-1));
  fx({k:'msg',s:'🐋 ปรสิตแสงเกาะผนังท้องวาฬเป็นรัง… ฆ่าให้หมดเพื่อเปิดทางไปห้องหัวใจ'});try{sfx('boss')}catch(e){}},{cine:1})}
/* ดาเมจจากกลไกฉาก: dgSim ทำงานก่อนที่โฮสต์ล้าง dmgQ ในเฟรมเดียวกัน → ส่งตรง (ตัวเอง hurt · คนอื่น dmgOut) */
function wblHit(u,d){if(u===uid){WBQ.hk=(WBQ.hk|0)+1;try{hurt(d)}catch(e){}}else dmgOut.push([u,d])}
function wblSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  const B=mons.find(m=>m.t===3&&m.hp>0),pl=escPl(),dm=DT[27].dm/66,hard=B&&B.hp<B.mh*.4;
  /* ช่วงเดิน: ปรสิตหมด → เยื่อเปิด · มีคนเข้าห้องหัวใจ → บอสตื่น */
  if(dg.ph==='run'){if(WBQ.mb&&!mons.some(m=>m.wr&&m.hp>0)){WBQ.mb=0;fx({k:'msg',s:'💗 เยื่อกั้นห้องหัวใจคลายออก… ได้ยินเสียงนาวินร้องเรียกจากข้างใน!'});fx({k:'wbm'})}
    if(!WBQ.mb&&pl.some(p=>p.x>WBXM+70&&wbInC(p.x,p.y,0))){dg.ph='boss';WBQ.at=Math.min(WBQ.at,7);spawnBoss();fx({k:'msg',s:'👁️ ผู้เฝ้าไข่มุกคลายหนวดออกจากหัวใจวาฬ… มันตื่นแล้ว!'});try{sfx('boss')}catch(e){}}}
  /* ผู้เฝ้าไข่มุก: ระลอกปรสิต + หดเข้าไข่มุกที่ 50% */
  if(B){const f=B.hp/B.mh;if(f<.7&&!WBQ.a7){WBQ.a7=1;wblAdds(3+Math.min(3,pl.length-1));fx({k:'msg',s:'🦠 ผู้เฝ้าไข่มุกพ่นสปอร์… ปรสิตแสงงอกขึ้นจากผนังห้อง!'})}
    if(f<.5&&!WBQ.sh){WBQ.sh=1;B.shH=B.hp;B.shT=6;WBQ.ac=1;WBQ.at=2;fx({k:'wbs',d:6});fx({k:'msg',s:'🫧 ผู้เฝ้าไข่มุกหดเข้าไปในไข่มุก… หัวใจวาฬบีบตัว กรดกำลังท่วม! ขึ้นแท่นกระดูก!'})}
    if(B.shT>0){B.shT-=dt;if(B.hp<B.shH)B.hp=B.shH;if(B.shT<=0){fx({k:'msg',s:'👁️ ไข่มุกแตกออก ผู้เฝ้าไข่มุกกลับมาแล้ว!'})}}
    if(f<.35&&!WBQ.a3){WBQ.a3=1;wblAdds(4+Math.min(3,pl.length-1));fx({k:'msg',s:'🦠 ปรสิตระลอกใหญ่! อย่าให้มันเกาะหัวใจวาฬ!'})}}
  /* กรดขึ้นลง: 0 ต่ำ → 1 เตือน → 2 ท่วม */
  WBQ.at-=dt;if(WBQ.at<=0){if(WBQ.ac===0){WBQ.ac=1;WBQ.at=2;fx({k:'msg',s:'🫧 ฟองกรดผุดขึ้นมา… ขึ้นซี่โครง/แท่นกระดูกเร็ว!'})}else if(WBQ.ac===1){WBQ.ac=2;WBQ.at=4.5;WBQ.tk=0}else{WBQ.ac=0;WBQ.at=hard?7:dg.ph==='boss'?8.5:9.5}}
  if(WBQ.ac===2){WBQ.tk=(WBQ.tk||0)-dt;if(WBQ.tk<=0){WBQ.tk=.5;pl.forEach(p=>{if(wblIn(p.x,p.y,0)&&!wbSafe(p.x,p.y))wblHit(p.u,Math.round(30*dm))})}}
  /* ผนังท้องบีบ */
  if(WBQ.sq){WBQ.sk-=dt;if(WBQ.sk<=0){if(WBQ.sq===1){WBQ.sq=2;WBQ.sk=.6;pl.forEach(p=>{if(wbOuter(p.x,p.y))wblHit(p.u,Math.round(90*dm))});fx({k:'wbqx'})}else{WBQ.sq=0;WBQ.st=hard?12:16}}}
  else{WBQ.st-=dt;if(WBQ.st<=0&&WBQ.ac!==2){WBQ.sq=1;WBQ.sk=1.6;fx({k:'wbq',d:1.6});fx({k:'msg',s:'💢 ผนังท้องวาฬกำลังบีบ! เข้าตรงกลาง'})}}
  WBQ.bt-=dt;if(WBQ.bt<=0){WBQ.bt=.4;fx({k:'wbv',ac:WBQ.ac,at:Math.round(WBQ.at*10)/10,mb:WBQ.mb,sq:WBQ.sq})}}
function wblMon(m,dt,pl,spd){if(!WBLI())return false;if(WBQ.mb&&m.t!==3&&m.x>WBXM-30&&!wbInC(m.x,m.y,30))m.x=WBXM-30;if(!wblIn(m.x,m.y,20)){if(m.x>WBXM&&!wbInC(m.x,m.y,20)){const a=Math.atan2(m.y-CY,m.x-WBCX);m.x=WBCX+Math.cos(a)*(WBRX-40);m.y=CY+Math.sin(a)*(WBRY-40)}else{m.x=Math.max(WBX0+40,Math.min(WBXM,m.x));m.y=CY+Math.max(-wbHH(m.x)+30,Math.min(wbHH(m.x)-30,m.y-CY))}}return false}
function wblAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,hard=f<.4;if(!wbInC(m.x,m.y,70)){m.x=WBCX+Math.max(-200,Math.min(200,m.x-WBCX));m.y=CY+Math.max(-160,Math.min(160,m.y-CY))}
  /* หนวดแสงฟาด */if(m.tn){m.tn.t-=dt;if(m.tn.t<=0){const A=m.tn;pl.forEach(p=>{if(A.a.some(a=>{const dx=Math.cos(a),dy=Math.sin(a),px=p.x-A.x,py=p.y-A.y,t=px*dx+py*dy;return t>0&&t<640&&Math.abs(px*dy-py*dx)<44}))dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(95*dm)});fx({k:'wbtx',x:A.x,y:A.y,a:A.a});m.tn=null}}
  /* ดูดแสง */if(m.dr){m.dr.t-=dt;if(m.dr.t<=0){m.dr=null}else if(m.dr.t<3){m.dr.k=(m.dr.k||0)-dt;if(m.dr.k<=0){m.dr.k=.5;pl.forEach(p=>{if(Math.hypot(p.x-m.x,(p.y-m.y)*1.3)<150)dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(45*dm)})}}}
  if(m.stun>0||m.inv||!pl.length)return;
  m.g1=(m.g1===undefined?3.5:m.g1)-dt;if(m.g1<=0&&!m.tn){m.g1=hard?5.5:7.5;const a=[],n=hard?5:3;pl.slice(0,n).forEach(p=>a.push(Math.atan2(p.y-m.y,p.x-m.x)));while(a.length<n)a.push(Math.random()*6.28);
    m.tn={t:1.4,x:Math.round(m.x),y:Math.round(m.y-20),a:a.map(v=>Math.round(v*100)/100)};fx({k:'wbt',x:m.tn.x,y:m.tn.y,a:m.tn.a,d:1.4});fx({k:'msg',s:'🪢 หนวดแสงง้างออก! หลบออกจากแนวเส้น'})}
  m.g2=(m.g2===undefined?12:m.g2)-dt;if(m.g2<=0&&!m.dr&&WBQ.ac!==2){m.g2=hard?13:17;m.dr={t:4.2};fx({k:'wbd',x:Math.round(m.x),y:Math.round(m.y),d:4.2});fx({k:'msg',s:'🌀 ผู้เฝ้าไข่มุกดูดแสง! วิ่งสวนออกไป อย่าให้ถูกดึงเข้าวงใน'})}
  m.g3=(m.g3===undefined?16:m.g3)-dt;if(m.g3<=0){m.g3=hard?14:19;if(mons.filter(q=>q.wbl&&q.t!==3&&q.hp>0).length<8){wblAdds(2+Math.min(2,pl.length-1));fx({k:'msg',s:'🦠 สปอร์ปรสิตลอยออกมา'})}}}
function wblFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='wbt'){WBFX.t.push({x:+o.x,y:+o.y,a:o.a||[],t0:n,d:(+o.d||1.4)*1000,x2:0});return true}
  if(o.k==='wbtx'){WBFX.t=WBFX.t.filter(e=>e.x2);WBFX.t.push({x:+o.x,y:+o.y,a:o.a||[],t0:n,d:420,x2:1});try{shk=Math.max(shk,.25)}catch(e){}return true}
  if(o.k==='wbd'){WBFX.d.push({x:+o.x,y:+o.y,t0:n,d:(+o.d||4.2)*1000});return true}
  if(o.k==='wbq'){WBFX.b.push({t0:n,d:(+o.d||1.6)*1000,x:0});if(!isHost()){WBQ.sq=1}return true}
  if(o.k==='wbqx'){WBFX.b.push({t0:n,d:600,x:1});try{shk=Math.max(shk,.35)}catch(e){}try{sfx('boom')}catch(e){}return true}
  if(o.k==='wbm'){WBQ.mb=0;WBFX.x.push({k:'m',t0:n});try{sfx('gate')}catch(e){}return true}
  if(o.k==='wbs'){WBFX.x.push({k:'s',t0:n,d:(+o.d||6)*1000});return true}
  if(o.k==='wbv'){if(!isHost()||!WBLI()){WBQ.ac=+o.ac||0;WBQ.at=+o.at||0;WBQ.mb=o.mb?1:0;WBQ.sq=+o.sq||0}return true}
  return false}
/* ---------- ฉาก ---------- */
function wbTubePath(c,pad){const xj=WBXM+60,ht=wbHH(xj)+pad,rx=WBRX+pad,ry=WBRY+pad;c.beginPath();c.moveTo(WBX0-pad,CY-wbHH(WBX0)-pad);for(let x=WBX0;x<=xj;x+=20)c.lineTo(x,CY-wbHH(x)-pad);
  /* โค้งห้องหัวใจ: จากรอยต่อบน วนผ่านด้านขวา ไปรอยต่อล่าง */const aT=Math.atan2(Math.max(-1,-ht/ry),(xj-WBCX)/rx),aB=-aT,N=56;for(let k=0;k<=N;k++){const a=aT+(aB-aT)*k/N;c.lineTo(WBCX+Math.cos(a)*rx,CY+Math.sin(a)*ry)}
  for(let x=xj;x>=WBX0;x-=20)c.lineTo(x,CY+wbHH(x)+pad);c.lineTo(WBX0-pad,CY+wbHH(WBX0)+pad);c.quadraticCurveTo(WBX0-pad-70,CY,WBX0-pad,CY-wbHH(WBX0)-pad);c.closePath()}
function wblBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};const I=(x,y,r)=>trees.push({x,y,r,inv:1,ns:1});
  for(let x=WBX0;x<=WBXM+30;x+=30){const h=wbHH(x);if(!(x>WBXM-40&&wbInC(x,CY-h-24,0)))I(x,CY-h-24,24);if(!(x>WBXM-40&&wbInC(x,CY+h+24,0)))I(x,CY+h+24,24)}
  for(let y=CY-wbHH(WBX0);y<=CY+wbHH(WBX0);y+=30)I(WBX0-24,y,24);
  for(let a=0;a<6.283;a+=.07){const x=WBCX+Math.cos(a)*(WBRX+24),y=CY+Math.sin(a)*(WBRY+24);if(x<WBXM+30&&Math.abs(y-CY)<wbHH(x)+10)continue;I(x,y,24)}
  /* ซี่โครง: กระดูกโค้งพาดจากผนังบน-ล่าง (ต้นไม้ตกแต่ง) */WBRB.forEach((x,i)=>{const h=wbHH(x);trees.push({x,y:CY-h+6,r:10,k:'wbrib',v:-1,ht:120,hw:40});trees.push({x,y:CY+h-4,r:10,k:'wbrib',v:1,ht:60,hw:40})});
  /* ติ่งเรืองแสงบนผนัง */for(let x=WBX0+120;x<WBXM;x+=150){const h=wbHH(x);trees.push({x:x+40,y:CY-h+30,r:8,k:'wbpol',v:x%3,ht:30});trees.push({x:x-30,y:CY+h-24,r:8,k:'wbpol',v:(x+1)%3,ht:30})}
  trees.push({x:WBCX+250,y:CY-10,r:40,k:'wbheart',ht:220,hw:120});trees.push({x:WBCX+150,y:CY-150,r:20,k:'wbnav',ht:90,hw:40});trees.push({x:WBCX-150,y:CY+235,r:20,k:'wbcore',ht:60,hw:40});
  trees.push({x:WBX0+30,y:CY,r:30,k:'wbteeth',ht:200,hw:40})}
function wblPaint(c,ox,oy,S){c.fillStyle='#14060c';c.fillRect(ox,oy,S,S);
  /* เส้นเลือดฉากหลัง */c.strokeStyle='rgba(120,30,60,.35)';c.lineWidth=6;const R=depRng(4021);for(let k=0;k<26;k++){const x=WBX0-200+R()*2400,y=CY-600+R()*1200;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+R()*200-100,y+R()*200-100,x+R()*300-150,y+R()*300-150);c.stroke()}
  c.fillStyle='rgba(0,0,0,.5)';wbTubePath(c,34);c.fill();c.fillStyle='#3a1020';wbTubePath(c,18);c.fill();
  c.save();wbTubePath(c,0);c.clip();
  const gr=c.createLinearGradient(0,CY-260,0,CY+260);gr.addColorStop(0,'#5a1c34');gr.addColorStop(.5,'#7a2a44');gr.addColorStop(1,'#4a1428');c.fillStyle=gr;c.fillRect(WBX0-100,CY-420,2300,840);
  /* รอยย่นเนื้อ */c.strokeStyle='rgba(40,8,20,.35)';c.lineWidth=3;const R2=depRng(4022);for(let k=0;k<70;k++){const x=WBX0+R2()*2100,y=CY+(R2()*2-1)*300,w=40+R2()*90;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+w/2,y+(R2()*16-8),x+w,y);c.stroke()}
  c.strokeStyle='rgba(255,170,200,.08)';c.lineWidth=2;for(let k=0;k<50;k++){const x=WBX0+R2()*2100,y=CY+(R2()*2-1)*300;c.beginPath();c.arc(x,y,8+R2()*18,3.6,5.8);c.stroke()}
  /* ห้องหัวใจ: พื้นสว่างกว่า มีเส้นเลือดวิ่งเข้าหัวใจ */const g2=c.createRadialGradient(WBCX+120,CY,30,WBCX,CY,WBRX+40);g2.addColorStop(0,'rgba(200,90,130,.5)');g2.addColorStop(1,'rgba(120,30,60,0)');c.fillStyle=g2;c.fillRect(WBCX-WBRX-40,CY-WBRY-40,WBRX*2+80,WBRY*2+80);
  c.strokeStyle='rgba(150,30,70,.6)';c.lineWidth=5;for(let k=0;k<9;k++){const a=k/9*6.28;c.beginPath();c.moveTo(WBCX+250,CY-10);c.quadraticCurveTo(WBCX+Math.cos(a)*160,CY+Math.sin(a)*120,WBCX+Math.cos(a+.4)*(WBRX-10),CY+Math.sin(a+.4)*(WBRY-10));c.stroke()}
  c.restore();
  /* ซี่โครงบนพื้น (แถบงาช้าง = ที่พ้นกรด) */for(const x of WBRB)wbRibBand(c,x);for(const[px,py]of WBPL)wbPlat(c,px,py);
  c.strokeStyle='#1a0610';c.lineWidth=14;wbTubePath(c,6);c.stroke();c.strokeStyle='rgba(255,150,190,.35)';c.lineWidth=2;wbTubePath(c,0);c.stroke()}
function wbRibBand(c,x){const h=wbHH(x);c.fillStyle='rgba(0,0,0,.35)';c.fillRect(x-36,CY-h,76,h*2);const gr=c.createLinearGradient(x-34,0,x+34,0);gr.addColorStop(0,'#a8987a');gr.addColorStop(.35,'#efe4c8');gr.addColorStop(.7,'#d8c8a4');gr.addColorStop(1,'#8a7a5c');c.fillStyle=gr;
  c.beginPath();c.moveTo(x-30,CY-h);c.quadraticCurveTo(x-38,CY,x-30,CY+h);c.lineTo(x+30,CY+h);c.quadraticCurveTo(x+38,CY,x+30,CY-h);c.closePath();c.fill();c.strokeStyle='#5a4a32';c.lineWidth=2;c.stroke();
  c.strokeStyle='rgba(120,100,70,.45)';c.lineWidth=1.4;for(let y=CY-h+20;y<CY+h-10;y+=26){c.beginPath();c.moveTo(x-22,y);c.quadraticCurveTo(x,y+5,x+22,y);c.stroke()}}
function wbPlat(c,px,py){c.fillStyle='rgba(0,0,0,.4)';c.beginPath();c.ellipse(px+4,py+8,78,50,0,0,7);c.fill();const gr=c.createRadialGradient(px-20,py-14,6,px,py,80);gr.addColorStop(0,'#f6ecd4');gr.addColorStop(1,'#a8987a');c.fillStyle=gr;c.beginPath();c.ellipse(px,py,74,48,0,0,7);c.fill();c.strokeStyle='#5a4a32';c.lineWidth=2.4;c.stroke();
  c.strokeStyle='rgba(120,100,70,.5)';c.lineWidth=1.4;for(const k of[-1,1]){c.beginPath();c.ellipse(px,py,74*.6,48*.6,0,k>0?.2:3.3,k>0?2.9:6.1);c.stroke()}}
Object.assign(PALK,{
 wbrib(t,T){const x=t.x,y=t.y,v=t.v;g.save();g.translate(x,y);const L=v<0?110:46,w=22;const gr=g.createLinearGradient(-w,0,w,0);gr.addColorStop(0,'#9a8a6a');gr.addColorStop(.45,'#f4ead0');gr.addColorStop(1,'#8a7a5a');g.fillStyle=gr;
  g.beginPath();g.moveTo(-w,0);g.quadraticCurveTo(-w-6,-L*.6,-6,-L);g.quadraticCurveTo(10,-L-6,w*.4,-L*.8);g.quadraticCurveTo(w+4,-L*.4,w,0);g.closePath();g.fill();g.strokeStyle='#3a2a1c';g.lineWidth=1.6;g.stroke();g.restore()},
 wbpol(t,T){const x=t.x,y=t.y,v=t.v|0,pu=.55+.45*Math.sin(T*(1.4+v*.3)+x*.01),C=['120,220,255','170,140,255','140,255,210'][v];g.fillStyle='#4a1a30';g.beginPath();g.ellipse(x,y,10,7,0,0,7);g.fill();
  g.fillStyle='rgba('+C+','+(.7+.3*pu)+')';g.beginPath();g.arc(x,y-6,5.5,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y-6,26,C,.45*pu);g.restore()},
 wbheart(t,T){const x=t.x,y=t.y,beat=Math.max(0,Math.sin(T*2.6))**8,s=1+.06*beat;g.save();g.translate(x,y-90);g.scale(s,s);
  g.fillStyle='#5a0c22';g.beginPath();g.moveTo(0,90);g.bezierCurveTo(-120,20,-110,-80,-40,-80);g.bezierCurveTo(-10,-80,0,-55,0,-45);g.bezierCurveTo(0,-55,10,-80,40,-80);g.bezierCurveTo(110,-80,120,20,0,90);g.fill();g.strokeStyle='#2a0410';g.lineWidth=3;g.stroke();
  g.strokeStyle='#8a2040';g.lineWidth=6;for(const[a,b,c2,d]of[[-30,-70,-50,-120],[20,-74,30,-130],[50,-60,90,-110]]){g.beginPath();g.moveTo(a,b);g.quadraticCurveTo(a,d+30,c2,d);g.stroke()}
  /* แสงดาวที่ถูกขัง (ไข่มุก) */g.save();g.globalCompositeOperation='lighter';glowAt(0,0,90,'190,230,255',.35+.35*beat);glowAt(0,0,22,'255,255,255',.6+.3*beat);g.restore();
  g.strokeStyle='rgba(180,240,255,.5)';g.lineWidth=1.6;for(let k=0;k<6;k++){const a=k*1.05+T*.3;g.beginPath();g.moveTo(Math.cos(a)*16,Math.sin(a)*16);g.quadraticCurveTo(Math.cos(a+.5)*50,Math.sin(a+.5)*44,Math.cos(a+.2)*80,Math.sin(a+.2)*70);g.stroke()}g.restore()},
 wbnav(t,T){if(dg.ph==='win')return;const x=t.x,y=t.y+Math.sin(T*1.4)*4;g.save();g.globalAlpha=.9;try{navinD(x,y+30,-1,T)}catch(e){}g.restore();g.fillStyle='rgba(200,240,255,.16)';g.beginPath();g.arc(x,y,40,0,7);g.fill();g.strokeStyle='rgba(220,250,255,.6)';g.lineWidth=2;g.stroke();
  g.save();g.globalCompositeOperation='lighter';glowAt(x-14,y-16,10,'255,255,255',.5);g.restore();phLbl('นาวิน (ติดอยู่ในฟองเมือก)',x,y-54,'#ffd27a')},
 wbcore(t,T){const x=t.x,y=t.y,pu=.35+.25*Math.sin(T*1.1);PALSH(x,y+4,34,9,.5);g.fillStyle='#3a2e22';g.save();g.translate(x,y);g.rotate(-.35);g.fillRect(-30,-16,60,22);g.fillStyle='rgba(120,140,180,.35)';g.beginPath();g.arc(0,-28,20,Math.PI,0);g.lineTo(20,-16);g.lineTo(-20,-16);g.closePath();g.fill();g.restore();
  g.save();g.globalCompositeOperation='lighter';glowAt(x+6,y-30,22,'120,150,255',pu);g.restore();phLbl('แกนดาวของเรือดำ',x,y-58,'#c8d8ff')},
 wbteeth(t,T){const x=t.x,y=t.y;for(let k=-4;k<=4;k++){const yy=CY+k*44;g.fillStyle='#e8dcc0';g.beginPath();g.moveTo(x-30,yy-16);g.lineTo(x+16,yy);g.lineTo(x-30,yy+16);g.closePath();g.fill();g.strokeStyle='#5a4a32';g.lineWidth=1.4;g.stroke()}}});
function wblDraw(){if(!WBLI())return;const T=performance.now()/1000,now=performance.now(),dt=Math.min(.1,(now-(WBLT||now))/1000);WBLT=now;g.save();
  /* เยื่อกั้นห้องหัวใจ */if(WBQ.mb){if(me.cls&&me.x>WBXM-24&&me.x<WBXM+90&&!(wbInC(me.x,me.y,0)&&me.x>WBXM+60))me.x=WBXM-24;
    const h=wbHH(WBXM);g.fillStyle='rgba(220,90,140,.42)';g.beginPath();g.moveTo(WBXM-6,CY-h);for(let y=CY-h;y<=CY+h;y+=12)g.lineTo(WBXM+Math.sin(y*.05+T*2)*8,y);g.lineTo(WBXM+20,CY+h);g.lineTo(WBXM+20,CY-h);g.closePath();g.fill();
    g.strokeStyle='rgba(120,20,50,.7)';g.lineWidth=2;for(let k=0;k<6;k++){g.beginPath();g.moveTo(WBXM,CY-h+k*h/3);g.quadraticCurveTo(WBXM+14,CY-h+k*h/3+30,WBXM+4,CY-h+k*h/3+60);g.stroke()}
    const left=mons.filter(m=>m.wr&&m.hp>0).length;phLbl('💗 เยื่อกั้นห้องหัวใจ · ปรสิตเหลือ '+left,WBXM,CY-h-30,'#ffb8d0')}
  /* กรด */if(WBQ.ac){const hi=WBQ.ac===2,k=hi?1:Math.max(0,1-WBQ.at/2);g.save();wbTubePath(g,0);g.clip();g.fillStyle=hi?'rgba(170,230,60,.5)':'rgba(170,230,60,'+(.1+.18*k)+')';g.fillRect(WBX0-80,CY-WBRY-60,2300,WBRY*2+120);
    const n=LOWQ?24:60,R=depRng(4031);for(let i=0;i<n;i++){const x=WBX0+R()*2050,y=CY+(R()*2-1)*280,p=(T*(.6+R())+R())%1;if(!wblIn(x,y,0)||wbSafe(x,y))continue;g.fillStyle='rgba(220,255,150,'+(.7*(1-p))+')';g.beginPath();g.arc(x,y-p*14,2+p*5,0,7);g.fill()}
    g.restore();if(hi||WBQ.ac===1){if(hi){for(const x of WBRB)wbRibBand(g,x);for(const[px,py]of WBPL)wbPlat(g,px,py)}const pu=.55+.45*Math.sin(T*6);g.save();g.strokeStyle='rgba(255,250,200,'+(.5+.4*pu)+')';g.lineWidth=3;g.shadowColor='rgba(255,240,160,.9)';g.shadowBlur=LOWQ?0:10;for(const x of WBRB){const h=wbHH(x);g.strokeRect(x-32,CY-h+4,64,h*2-8)}for(const[px,py]of WBPL){g.beginPath();g.ellipse(px,py,76,50,0,0,7);g.stroke()}g.restore()}}
  /* ผนังบีบ */WBFX.b=WBFX.b.filter(e=>now-e.t0<e.d);for(const e of WBFX.b){const k=(now-e.t0)/e.d;g.save();wbTubePath(g,0);g.clip();g.fillStyle=e.x?'rgba(255,160,180,'+(.45*(1-k))+')':'rgba(230,40,70,'+(.15+.22*k)+')';
    g.beginPath();for(let x=WBX0;x<=WBXM+20;x+=20){g.rect(x,CY-wbHH(x)-10,20,wbHH(x)*.48+10);g.rect(x,CY+wbHH(x)*.52,20,wbHH(x)*.48+10)}g.fill();
    g.beginPath();g.ellipse(WBCX,CY,WBRX+20,WBRY+20,0,0,7);g.ellipse(WBCX,CY,WBRX*.66,WBRY*.66,0,0,7);g.fill('evenodd');g.restore()}
  if(WBQ.sq===1&&me.cls&&me.down<=0&&wbOuter(me.x,me.y)){const t='💢 เข้ากลาง! ผนังกำลังบีบ';g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,0,10,.9)';g.strokeText(t,me.x,me.y-88);g.fillStyle='#ffb0c0';g.fillText(t,me.x,me.y-88)}
  if(WBQ.sq===2&&me.cls&&me.down<=0&&wbOuter(me.x,me.y)){const tx=me.x>WBXM&&wbInC(me.x,me.y,0)?WBCX:me.x,ny=me.y+(CY-me.y)*Math.min(1,dt*4),nx=me.x+(tx-me.x)*Math.min(1,dt*4);if(wblIn(nx,ny,20)){me.x=nx;me.y=ny}}
  /* หนวดแสง */WBFX.t=WBFX.t.filter(e=>now-e.t0<e.d);for(const e of WBFX.t){const k=(now-e.t0)/e.d;for(const a of e.a){const x1=e.x+Math.cos(a)*640,y1=e.y+Math.sin(a)*640;
      if(!e.x2){g.strokeStyle='rgba(120,220,255,'+(.15+.25*k)+')';g.lineWidth=88;g.lineCap='round';g.beginPath();g.moveTo(e.x,e.y);g.lineTo(x1,y1);g.stroke();g.strokeStyle='rgba(200,245,255,.85)';g.lineWidth=2;g.setLineDash([12,9]);g.beginPath();g.moveTo(e.x,e.y);g.lineTo(e.x+(x1-e.x)*k,e.y+(y1-e.y)*k);g.stroke();g.setLineDash([])}
      else{g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(170,240,255,'+(.8*(1-k))+')';g.lineWidth=26*(1-k*.5);g.lineCap='round';g.beginPath();g.moveTo(e.x,e.y);let px=e.x,py=e.y;for(let s=1;s<=8;s++){const q=s/8;px=e.x+(x1-e.x)*q+Math.sin(q*9+a*3)*14;py=e.y+(y1-e.y)*q+Math.cos(q*9+a*3)*14;g.lineTo(px,py)}g.stroke();g.restore()}}}
  /* ดูดแสง */WBFX.d=WBFX.d.filter(e=>now-e.t0<e.d);for(const e of WBFX.d){const el=(now-e.t0)/1000,on=el>1.2,B=mons.find(m=>m.t===3&&m.hp>0),x=B?B.x:e.x,y=B?B.y:e.y;
    g.strokeStyle='rgba(200,240,255,'+(on?.5:.25+.2*Math.sin(T*12))+')';g.lineWidth=2;g.setLineDash([8,8]);g.beginPath();g.ellipse(x,y,150,115,0,0,7);g.stroke();g.setLineDash([]);
    if(on){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<(LOWQ?6:14);k++){const a=k/14*6.28+T*2.4,r=(1-((T*.9+k*.07)%1))*360;g.fillStyle='rgba(180,235,255,.6)';g.beginPath();g.arc(x+Math.cos(a)*r,y+Math.sin(a)*r*.78,3,0,7);g.fill()}g.restore();
      if(me.cls&&me.down<=0){const dx=x-me.x,dy=y-me.y,d=Math.hypot(dx,dy);if(d>40&&d<720){const nx=me.x+dx/d*130*dt,ny=me.y+dy/d*130*dt;if(wblIn(nx,ny,20)){me.x=nx;me.y=ny}}}}
    if(Math.hypot(me.x-x,(me.y-y)*1.3)<150){const t=on?'🌀 ถูกดูด! วิ่งสวนออกไป':'🌀 ออกห่างจากผู้เฝ้าไข่มุก!';g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(0,10,30,.9)';g.strokeText(t,me.x,me.y-88);g.fillStyle='#c8f0ff';g.fillText(t,me.x,me.y-88)}}
  /* ไข่มุกห่อบอส */for(const e of WBFX.x){if(e.k==='s'&&now-e.t0<e.d){const B=mons.find(m=>m.t===3&&m.hp>0);if(B){const pu=.6+.4*Math.sin(T*3);g.fillStyle='rgba(230,245,255,.3)';g.beginPath();g.arc(B.x,B.y-40,110,0,7);g.fill();g.strokeStyle='rgba(255,255,255,'+(.5+.3*pu)+')';g.lineWidth=3;g.stroke();g.save();g.globalCompositeOperation='lighter';glowAt(B.x-30,B.y-80,40,'255,255,255',.35*pu);g.restore()}}}
  WBFX.x=WBFX.x.filter(e=>now-e.t0<(e.d||1500));
  /* เตือนกรดเหนือหัว */if(WBQ.ac&&me.cls&&me.down<=0&&wblIn(me.x,me.y,0)&&!wbSafe(me.x,me.y)){const t=WBQ.ac===2?'🧪 ยืนในกรด! ขึ้นซี่โครงสีงาช้าง':'🫧 กรดกำลังขึ้น! ขึ้นซี่โครง/แท่นกระดูก';g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,20,0,.9)';g.strokeText(t,me.x,me.y-72);g.fillStyle='#e0ff9a';g.fillText(t,me.x,me.y-72)}
  g.restore()}
function wblScreen(){if(!WBLI())return;const T=performance.now()/1000,beat=Math.max(0,Math.sin(T*2.6))**8;g.save();g.setTransform(DPR,0,0,DPR,0,0);const gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.28,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba(40,0,15,0)');gr.addColorStop(1,'rgba(40,0,15,'+(.42+.14*beat)+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);
  if(WBQ.ac){const hi=WBQ.ac===2;g.fillStyle=hi?'rgba(150,220,40,.1)':'rgba(150,220,40,'+(.04+.04*Math.sin(T*8))+')';g.fillRect(0,0,SW0,H);const t=hi?'🧪 กรดท่วม! ('+Math.max(0,WBQ.at).toFixed(1)+' วิ)':'🫧 กรดกำลังขึ้น…';g.font='bold 15px system-ui';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(10,20,0,.85)';g.strokeText(t,SW0/2,H*.26);g.fillStyle='#e0ff9a';g.fillText(t,SW0/2,H*.26)}
  g.restore()}
/* ---------- มอนธีม 40 (ในท้องวาฬ) ---------- */
MV1D[400]=(r,T,W,bob)=>{/* ปรสิตแสง: แมงกะพรุนโปร่งฟ้า แกนเรืองแสง หนวดยาวพลิ้ว ตาเล็กสามดวง */const b=Math.sin(T*2)*r*.08,pu=.6+.4*Math.sin(T*3);
  if(!W){g.strokeStyle='rgba(150,220,255,.55)';g.lineWidth=r*.05;g.lineCap='round';for(let k=0;k<5;k++){const x0=-r*.4+k*r*.2;g.beginPath();g.moveTo(x0,r*.1+b);g.quadraticCurveTo(x0+Math.sin(T*3+k)*r*.2,r*.45+b,x0+Math.sin(T*2.4+k*1.3)*r*.24,r*.8+b);g.stroke()}}
  vS(W,[[-r*.62,r*.12+b],['q',-r*.7,-r*.62+b,0,-r*.66+b],['q',r*.7,-r*.62+b,r*.62,r*.12+b],['q',r*.3,r*.0+b,0,r*.14+b],['q',-r*.3,r*.0+b,-r*.62,r*.12+b]],'rgba(120,190,230,.72)',1,1);
  vD(W,[[-r*.42,-r*.2+b],['q',-r*.36,-r*.52+b,0,-r*.54+b],['q',r*.2,-r*.52+b,r*.26,-r*.36+b],['q',0,-r*.4+b,-r*.42,-r*.2+b]],'rgba(230,250,255,.45)');
  vGlow(W,0,-r*.2+b,r*.7,'150,230,255',.4*pu);if(!W){g.fillStyle='rgba(240,255,255,'+(.7+.3*pu)+')';g.beginPath();g.arc(0,-r*.2+b,r*.13,0,7);g.fill()}
  for(const dx of[-r*.22,0,r*.22]){wE(W,dx,-r*.02+b,r*.06,r*.06,'#e8faff');vEye(W,dx,-r*.02+b,r*.035,r*.04,'#08304a',0)}return true};
MV1D[401]=(r,T,W,bob)=>{/* หนอนกรด: หนอนปล้องโผล่จากพื้นเนื้อ สีเขียวเหลือง ปากวงฟันซี่ น้ำลายกรดหยด */const sw=Math.sin(T*2.2)*r*.14;
  if(!W){g.fillStyle='rgba(60,10,30,.6)';g.beginPath();g.ellipse(0,r*.62,r*.5,r*.14,0,0,7);g.fill()}
  for(let k=5;k>=0;k--){const q=k/5,x=sw*(1-q)*1.2,y=r*.55-q*r*1.05,rr=r*(.26-q*.06);bvE(W,x,y,rr*1.1,rr,k%2?'#9ab83a':'#b8d24a',1,1);if(!W){g.strokeStyle='rgba(60,80,20,.6)';g.lineWidth=r*.025;g.beginPath();g.arc(x,y,rr*.8,3.5,5.9);g.stroke()}}
  const hx=sw*1.2*0,hy=-r*.5;bvE(W,hx,hy,r*.24,r*.2,'#5a1a20',1,1.2);if(!W){g.fillStyle='#f4ecd0';for(let k=0;k<8;k++){const a=k/8*6.28;g.beginPath();g.moveTo(hx+Math.cos(a)*r*.2,hy+Math.sin(a)*r*.16);g.lineTo(hx+Math.cos(a+.2)*r*.1,hy+Math.sin(a+.2)*r*.08);g.lineTo(hx+Math.cos(a+.4)*r*.2,hy+Math.sin(a+.4)*r*.16);g.fill()}
    const p=(T*1.2)%1;g.fillStyle='rgba(200,255,90,'+(1-p)+')';g.beginPath();g.arc(hx+r*.1,hy+r*.2+p*r*.6,r*.05,0,7);g.fill()}
  vGlow(W,0,-r*.3,r*.5,'180,255,90',.18);return true};
MV1D[402]=(r,T,W,bob)=>{/* เพรียงท้องวาฬ: กองเปลือกเพรียงสีกระดูก มีตาก้านยาวโผล่กลาง หนวดขนนกตะครุบ */const op=.5+.5*Math.sin(T*1.8);
  for(const[dx,dy,s]of[[-r*.42,r*.2,.7],[r*.4,r*.24,.66],[0,r*.04,1]]){vS(W,[[dx-r*.34*s,dy+r*.3*s],[dx-r*.2*s,dy-r*.3*s],[dx+r*.2*s,dy-r*.3*s],[dx+r*.34*s,dy+r*.3*s]],'#d8ccae',1,1);if(!W){g.fillStyle='#3a2a2a';g.beginPath();g.ellipse(dx,dy-r*.3*s,r*.16*s,r*.06*s,0,0,7);g.fill();g.strokeStyle='rgba(120,100,70,.6)';g.lineWidth=r*.02;for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(dx+k*r*.12*s,dy+r*.28*s);g.lineTo(dx+k*r*.06*s,dy-r*.26*s);g.stroke()}}}
  if(!W){g.strokeStyle='rgba(255,200,170,.85)';g.lineWidth=r*.03;for(let k=0;k<6;k++){const a=-1.57+(k-2.5)*.28*op;g.beginPath();g.moveTo(0,-r*.3);g.quadraticCurveTo(Math.cos(a)*r*.4,-r*.3+Math.sin(a)*r*.4,Math.cos(a)*r*.6*op+Math.sin(T*3+k)*r*.04,-r*.3+Math.sin(a)*r*.62*op);g.stroke()}}
  vK(W,[[r*.05,-r*.3],['q',r*.2,-r*.7,r*.08,-r*.92]],'#c8a890',r*.06);wE(W,r*.08,-r*.95,r*.1,r*.1,'#fff4e0');vEye(W,r*.1,-r*.95,r*.055,r*.06,'#2a0a14',0);return true};
MV1S[400]=1.15;MV1S[401]=1.2;MV1S[402]=1.2;
/* ---------- บอส: ผู้เฝ้าไข่มุก ---------- */
BV1['ผู้เฝ้าไข่มุก']=(T,W,br,sw,up,cf)=>{const b=br,pu=.55+.3*Math.sin(T*1.5)+.15*Math.sin(T*6.3);bvShadow(70,16,.3);
  /* หนวดยาวรอบตัว */if(!W){for(let k=0;k<9;k++){const a=-2.6+k*.65,L=70+20*Math.sin(T*1.3+k);g.strokeStyle='rgba(120,200,240,.6)';g.lineWidth=7-k%3;g.lineCap='round';g.beginPath();g.moveTo(Math.cos(a)*30,-30+Math.sin(a)*24+b);g.quadraticCurveTo(Math.cos(a+.3)*(L*.7),-30+Math.sin(a+.3)*L*.6+b+Math.sin(T*2+k)*10,Math.cos(a)*L*1.25,-30+Math.sin(a)*L+b+Math.sin(T*2.4+k)*14);g.stroke();
    g.fillStyle='rgba(220,250,255,.8)';g.beginPath();g.arc(Math.cos(a)*L*1.25,-30+Math.sin(a)*L+b+Math.sin(T*2.4+k)*14,3,0,7);g.fill()}}
  /* ร่างโปร่ง (หมวกแมงกะพรุนยักษ์) */vS(W,[[-62,-10+b],['q',-74,-110+b,0,-118+b],['q',74,-110+b,62,-10+b],['q',40,4+b,20,-6+b],['q',0,8+b,-20,-6+b],['q',-40,4+b,-62,-10+b]],'rgba(80,150,200,.78)',1,1.6);
  vD(W,[[-44,-60+b],['q',-36,-104+b,0,-106+b],['q',30,-104+b,40,-84+b],['q',0,-90+b,-44,-60+b]],'rgba(220,245,255,.4)');
  for(let k=0;k<6;k++)vK(W,[[-50+k*20,-14+b],['q',-50+k*20+Math.sin(T*2+k)*4,-50+b,-30+k*12,-90+b]],'rgba(170,230,255,.45)',1.4);
  /* ไข่มุกดาวที่มันกอดไว้ */bvE(W,0,-46+b,24,24,'#eef6ff',1,1.2);bvAdd(W,()=>{glowAt(0,-46+b,70,'190,235,255',.5*pu);glowAt(0,-46+b,18,'255,255,255',.9*pu)});
  if(!W){g.strokeStyle='rgba(90,160,210,.9)';g.lineWidth=5;for(const s of[-1,1]){g.beginPath();g.moveTo(s*28,-70+b);g.quadraticCurveTo(s*34,-46+b,s*14,-26+b);g.stroke()}}
  /* ตาหลายดวงบนหมวก */for(const[ex,ey,s]of[[-30,-82,1],[0,-96,1.2],[30,-82,1],[-16,-66,.7],[16,-66,.7]]){wE(W,ex,ey+b,6*s,6*s,'#0a2a40');vEye(W,ex,ey+b,3.6*s,4*s,'#bff4ff',W?0:6)}
  if(!W&&!LOWQ&&cf>0){g.save();g.globalCompositeOperation='lighter';glowAt(0,-60+b,110,'150,220,255',.22*cf);g.restore()}};
BVS['ผู้เฝ้าไข่มุก']=1.3;
function wblReward(){if(dgRew)return;dgRew=1;const D=DT[27],st=stCur(),sto=st&&st.g==='wbl',gd=sto?D.gold:76000;WBFX={t:[],d:[],x:[],b:[]};WBQ.ac=0;WBQ.sq=0;
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?22:6));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?32:8+(Math.random()*6|0),'ท้องวาฬ')}catch(e){}try{ecGive(sto?32:8+(Math.random()*5|0),'ท้องวาฬ')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.45)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?16:6,'ไข่มุกดาว')}catch(e){}if(sto){me.sty.n=1;me.sty.a=1}else me.wbT=Date.now();
  banner={s:'🐋 ผู้เฝ้าไข่มุกสลาย! ช่วยนาวินออกมาได้ · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?22:6),t:8};sfx('lvl');burst(me.x,me.y-10,['#eef6ff','#ffffff','#bfe8ff','#ffd27a'],140,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(WBLI())enterMap(39,wblBack())},10000)}
function instRepeatWbl(){const l=Math.max(0,(me.wbT||0)+30*60000-Date.now());
  stSay([['navin','วาฬยังว่ายวนอยู่ใต้สุสานเรือ… ปรสิตแสงงอกขึ้นในท้องมันอีกแล้ว ข้าได้ยินมันร้องเจ็บ จะลงไปช่วยมันไหม?']],()=>{},{choice:[[l>0?'🐋 ในท้องวาฬ (อีก '+Math.ceil(l/60000)+' นาที)':'🐋 ในท้องวาฬ (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'🐋 วาฬดำลงลึกอยู่ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(wblEnter,250)}};return true}
setTimeout(()=>{
  try{DGTH[27]='harbor'}catch(e){}
  try{BTC[40]=['#eafcff','#5aa8c8','#ffffff'];TIER[40]=TIER[39];WRG[40]={0:{rg:240,cd:2.4,spd:280,dm:1,k:'zap',c:'170,230,255'},1:{rg:220,cd:2.6,spd:240,dm:1.3,k:'seed',c:'190,240,90',big:1}}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=46000&&id<47000)return wblMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(WBLI())return wblStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(WBLI())return wblSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(WBLI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return wblReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=WBLI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(WBLI()){enterMap(39,wblBack());sysMsg('🐋 วาฬพ่นทุกคนออกมาทางรูหายใจ… คุยกับกัปตันกริฟเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(WBLI()){const ac=WBQ.ac===2?' · 🧪 กรดท่วม':WBQ.ac===1?' · 🫧 กรดกำลังขึ้น':'';return dg.ph==='run'?'🐋 ทางเดินในท้องวาฬ'+(WBQ.mb?' · ปรสิตเหลือ '+mons.filter(m=>m.wr&&m.hp>0).length:' · เยื่อเปิดแล้ว ไปห้องหัวใจ')+ac+' · ⏱ '+fmtT(dg.tl):dg.ph==='boss'?'👁️ ผู้เฝ้าไข่มุก'+ac+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🐋 ช่วยนาวินได้แล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🐋 ปากวาฬ · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(WBLI()){ov.hidden=true;sfx('gate');enterMap(39,wblBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(wblFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{wblDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{wblScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='wbl')return instRepeatWbl();return _ir(k)}}catch(e){}
},0);
