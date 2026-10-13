/* ---------- เนื้อเรื่องภาค 6 บทที่ 1 · สะพานแสง ---------- */
Object.assign(SPK,{til:['ทิล · เด็กจากค่ายผู้อพยพ','🧒','#ffc890']});STNPC.til=[30,'npc'];
STCH.push('ภาค 6 · บทที่ 1 · สะพานแสง');
{const C6=STCH.length-1;STY.push(
 {c:C6,g:'talk',k:'qn',tx:'เข้าเฝ้าราชินีเอลิราในนครลอยฟ้า',
  pre:[['nar','เจ็ดวันหลังรุ่งอรุณ… สะพานแสงยังทอดยาวจากประตูใต้ของอัสตราลงไปถึงค่ายผู้อพยพ ไม่เคยดับแม้ในยามค่ำ'],
   ['qn','ผู้นำแห่งรุ่งอรุณ มาพอดี วันนี้ขบวนผู้อพยพขบวนแรกจะขึ้นมาตามสะพาน สองร้อยคน… คนกลุ่มแรกในรอบสามร้อยปีที่จะได้เดินผ่านประตูนี้'],
   ['cas','องครักษ์ดาวเฝ้าหัวสะพานไว้แล้วพ่ะย่ะค่ะ แต่มีเรื่องต้องรายงาน… ตั้งแต่สะพานเปิด แสงของมันส่องทะลุทะเลเมฆลงไปด้วย'],
   ['cas','เมื่อคืนทหารยามเห็นเงาบางอย่างไต่ขึ้นมาตามขอบสะพาน พอส่องไฟใส่ มันก็ไหลกลับลงไปใต้เมฆ'],
   ['qn','ข้าไม่อยากให้วันแรกที่ประตูเปิด กลายเป็นวันที่ผู้คนต้องหวาดกลัวอีก… ช่วยเดินลงไปตามสะพาน ดูให้แน่ว่ามีอะไรรออยู่ได้ไหม'],
   ['me','(สะพานรุ่งอรุณเริ่มที่ประตูแสงดาว ทางใต้ของนคร)']],rw:{g:80000}},
 {c:C6,g:'map',m:30,tx:'ลงสะพานรุ่งอรุณ (ประตูแสงดาวทางใต้ของนคร → เดินสะพาน)',
  post:[['nar','สะพานทำจากแสงล้วน ๆ แผ่นแสงสีทองต่อกันเป็นทางยาวลงไปในทะเลเมฆสีชมพูอมทอง ลมเย็นพัดผ่านราวสะพานที่ส่องประกาย'],
   ['nar','แต่ตามขอบสะพาน… มีรอยดำเหมือนหมึกซึมเกาะอยู่เป็นจุด ๆ บางรอยยังขยับอยู่'],
   ['me','(ลานพักกลางสะพานมีใครอยู่… เด็กหรือ?)']]},
 {c:C6,g:'talk',k:'til',tx:'คุยกับเด็กที่ลานพักกลางเมฆ',
  pre:[['til','ว้าย! …อ๊ะ ไม่ใช่เงา นึกว่าพวกมันกลับมาอีกแล้ว'],
   ['til','ข้าชื่อทิล มาจากค่าย ข้าแอบวิ่งขึ้นมาก่อนขบวน อยากเป็นคนแรกที่ได้เห็นเมืองบนฟ้า… แต่พอมาถึงตรงนี้ พวกเงาก็ไต่ขึ้นมาจากใต้เมฆ'],
   ['til','พวกมันไม่ทำร้ายข้านะ มันแค่… มองข้า แล้วก็พึมพำคำเดิมซ้ำ ๆ «กลับบ้าน… กลับบ้าน…»'],
   ['til','แปลกไหม ข้าฝันถึงเสียงนั้นมาตั้งแต่สะพานเปิด ฝันถึงเมืองที่ห้อยกลับหัวอยู่ใต้เมฆ มีระฆังดังทุกคืน'],
   ['til','ขบวนของท่านเรนน์จะออกจากค่ายเร็ว ๆ นี้ ถ้าเงายังเกาะสะพานอยู่แบบนี้ คนแก่กับเด็ก ๆ จะขึ้นมาได้ยังไง… ช่วยไล่พวกมันไปทีได้ไหม']],rw:{g:40000}},
 {c:C6,g:'kill',m:30,n:40,tx:'ไล่เงาที่ไต่ขึ้นสะพานรุ่งอรุณ',
  pre:[['til','ข้าจะรออยู่ตรงนี้! ระวังตัวด้วยนะ… อ้อ เงาที่เกาะราวสะพานน่ะ เดินเข้าไปใกล้ ๆ มันก็หลุดแล้ว']],
  post:[['nar','เงาตัวสุดท้ายสลายเป็นควันดำ ทิ้งไว้เพียงเศษโลหะสำริดขึ้นสนิมชิ้นหนึ่ง… สลักเป็นรูปเฟืองตะวัน'],
   ['me','(ตราเดียวกับเกราะของทหารกระดูกในคืนรากดำ…)'],
   ['til','ทางโล่งแล้ว! ลงไปบอกท่านเรนน์ที่ค่ายเถอะ ข้าจะรอดูขบวนอยู่ตรงนี้']]},
 {c:C6,g:'talk',k:'cmd',tx:'ลงไปพบผู้บัญชาการเรนน์ที่ค่ายผู้อพยพ',
  pre:[['cmd','ผู้นำแห่งรุ่งอรุณ! ได้ข่าวว่าเจ้าไล่เงาบนสะพานไปแล้ว… ฮะ ทิลแอบขึ้นไปก่อนอีกแล้วหรือ เด็กคนนั้นนี่'],
   ['me','(ยื่นเศษสำริดรูปเฟืองตะวันให้เรนน์ดู)'],
   ['cmd','…ตรานี้ ข้าเห็นมันบนเกราะของทหารกระดูกที่ถูกรากดำลากขึ้นมาในคืนนั้น ทหารของ «อารัณยา»'],
   ['cmd','คนแก่ในค่ายเล่าต่อกันมาว่าอารัณยาคือเมืองที่ร่วงจากฟ้าเมื่อนานมาแล้ว ข้าเคยคิดว่าเป็นแค่นิทานกล่อมเด็ก'],
   ['cmd','นิทานหรือไม่ก็ตาม ขบวนต้องออกเดินทางวันนี้ ผู้คนรอมาทั้งชีวิตแล้ว ข้าจะนำขบวนเอง เจ้าช่วยคุ้มกันให้ถึงประตูอัสตราด้วย']],rw:{g:40000,s3:5}},
 {c:C6,g:'esc',k:'cmd',p6e:1,tx:'คุ้มกันขบวนผู้อพยพข้ามสะพานแสง (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['cmd','ขบวนพร้อมแล้ว! ทุกคนจับมือกันไว้ — ขึ้นสะพาน!']],
  post:[['nar','ล้อเกวียนคันแรกแตะพื้นหินของอัสตรา… เสียงโห่ร้องดังลั่นจากทั้งสองฝั่งประตู ชาวเมืองโปรยกลีบดอกไม้ลงมาจากกำแพง'],
   ['cmd','(เรนน์ถอดหมวกเหล็ก มองขึ้นไปบนกำแพงเมืองนิ่งนาน) …พ่อข้าเคยบอกว่า สักวันเราจะได้กลับบ้าน ข้าไม่เคยเข้าใจว่าเขาหมายถึงอะไร'],
   ['nar','ท่ามกลางเสียงเฉลิมฉลอง ไม่มีใครสังเกตว่าทิลหยุดยืนนิ่งอยู่ที่หัวสะพาน หันหน้ามองลงไปใต้ทะเลเมฆ']]},
 {c:C6,g:'talk',k:'qn',p6c1:1,cine:1,tx:'รายงานราชินีเอลิราในนครลอยฟ้า',
  pre:[['qn','ขบวนแรกขึ้นมาถึงแล้ว… ข้าเฝ้าดูจากกำแพงตลอดทาง ขอบคุณที่ดูแลพวกเขา'],
   ['me','(เล่าเรื่องเงา คำว่า «กลับบ้าน» และตราเฟืองตะวันให้ราชินีฟัง)'],
   ['qn','อารัณยา… ในหอจดหมายเหตุ ชื่อนั้นถูกขีดฆ่าออกจากทุกบันทึก ราชาโอเรียนกลัวมันยิ่งกว่าอะไร แต่ไม่เคยบอกใครว่าเพราะอะไร'],
   ['qn','หัวใจดาวทั้งดวงส่องลงไปถึงแผ่นดินแล้ว… บางทีแสงนั้นอาจปลุกบางอย่างที่หลับอยู่ใต้เมฆด้วย',0,1],
   ['qn','อัสตราลอยต่ำลงมาให้หัวใจสองครึ่งได้ยินกัน… บางทีเราอาจลงมาใกล้บางอย่างที่ไม่ควรปลุก',0,2],
   ['til','(ทิลวิ่งเข้ามา ตัวสั่น) ท่านราชินี! ท่านผู้นำ! ข้าได้ยินอีกแล้ว ระฆัง… มันดังมาจากใต้สะพาน ดังกว่าทุกคืน'],
   ['til','และมีเสียงพูดด้วย… «ประตูเปิดแล้ว… ในที่สุดก็เปิดให้ทุกคน… รวมทั้งพวกเราด้วย»'],
   ['nar','ไกลลงไปใต้ทะเลเมฆ เสียงระฆังสำริดดังขึ้นหนึ่งครั้ง… ก้องขึ้นมาตามแนวสะพาน จนแผ่นแสงทุกแผ่นสั่นไหว'],
   ['nar','🌉 — จบภาค 6 บทที่ 1 · สะพานแสง — บทต่อไป: ตลาดสองฟ้า (เร็ว ๆ นี้)']],rw:{g:150000,s3:10}})}
/* ---------- ประตูแสงดาว: เลือกลิฟต์หรือเดินสะพาน ---------- */
function brgChoose(G){stSay([['me','(ข้างประตูแสงดาว สะพานรุ่งอรุณทอดยาวลงไปในทะเลเมฆ)']],()=>{},{choice:[['☁️ ลิฟต์แสงดาว (ถึงทันที)',1],['🌉 เดินสะพานรุ่งอรุณ',2],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1)setTimeout(()=>skyLift(G),150);else if(e===2)setTimeout(()=>{try{sfx('gate')}catch(_){}enterMap(30,curMap===9?{x:1600,y:420}:{x:1600,y:2860})},150)}}
function brgGateDraw(G){const t=performance.now()/1000;g.save();g.globalCompositeOperation='lighter';glowAt(G.x,G.y,70,'255,220,160',.2+.08*Math.sin(t*2));g.restore();g.save();g.strokeStyle='rgba(232,184,80,.7)';g.lineWidth=2;g.setLineDash([8,6]);g.lineDashOffset=-t*20;g.beginPath();g.ellipse(G.x,G.y,44,14,0,0,7);g.stroke();g.setLineDash([]);
  const lb='🌉 '+(G.nm||'');g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,16,10,.8)';g.strokeText(lb,G.x,G.y-20);g.fillStyle='#ffe8b0';g.fillText(lb,G.x,G.y-20);g.restore()}
/* ---------- ดันเจี้ยนคุ้มกันขบวน (ห้อง 79000–79999) ---------- */
setTimeout(()=>{DT[19]={n:'สะพานแสง · คุ้มกันขบวน',lv:1,L:112,bL:22,hp:2400000,xp:380000,g:55000,dm:44,tn:8,sm:1,rm:4,lg:.85,tm:780,gold:350000,exp:3200000}},0);
const ESCI=()=>!!(MAPS[curMap]&&MAPS[curMap].esc),ESC_Y0=CY+470,ESC_END=CY-300,ESC_CP=[CY+170,CY-70];
let ESC={y:ESC_Y0,hp:100,st:'stop',cp:0,wv:0,tk:4,bt:0,hit:0,lh:100};
function escMap(id){if(MAPS[id])return MAPS[id];const D=DT[19];ESC={y:ESC_Y0,hp:100,st:'stop',cp:0,wv:0,tk:4,bt:0,hit:0,lh:100};
  return MAPS[id]={n:'สะพานแสง · ขบวนผู้อพยพ',dg:19,esc:1,th:30,bth:30,sx:CX,sy:CY+440,sr:0,seed:301,bg:'#e8a888',tile:'#fff0d8',safe:'#ffe8c0',ring:'#e0ac48',t1:'#8a5a2c',t2:'#d0a050',d1:'#e0c090',d2:'#fff4d8',nests:[],
    gates:[{x:CX-130,y:CY+620,to:1,req:1,brg:1,nm:'ค่ายผู้อพยพ',arr:{x:1720,y:1880}}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY-520,n:'ผู้ตีระฆังเงา',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:112,col:'#c8904a',bar:'#6a3a1a',ln:'#ffd090',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'หน้าประตูอัสตรา',dg:1}}}
const ESC_IN=[['nar','ขบวนเกวียนเคลื่อนออกจากเชิงสะพาน ผู้เฒ่า เด็ก ๆ และครอบครัวนับร้อยเดินตามกันขึ้นไปบนแผ่นแสง'],
  ['cmd','อยู่ใกล้เกวียนนำไว้! ถ้าเงาเข้าใกล้ ขบวนจะหยุดทันที'],
  ['til','(ทิลโบกมือจากบนเกวียน) ท่านผู้นำ! ข้าได้ยินเสียงระฆังอีกแล้ว…'],
  ['nar','💡 ขบวนเดินเองเมื่อรอบเกวียนปลอดภัย · ถึงจุดพักจะมีเงาซุ่มโจมตี ต้องตีให้ถอยก่อน · ยืนในวงทองรอบเกวียนเพื่อซ่อมขบวน · บอส: มือเงาคว้าเกวียน (วงรอบเกวียน) → เข้าไปยืนรับแทน · ระฆังเงา (วงรอบตัวบอส) → วิ่งออก']];
function escEnter(){if(!me.cls||me.down>0||isDg())return;const id=79000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🌉 เปิดภารกิจคุ้มกันขบวน รหัส '+id+' มาช่วยกันพาผู้อพยพขึ้นเมือง!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  ESC={y:ESC_Y0,hp:100,st:'stop',cp:0,wv:0,tk:4,bt:0,hit:0,lh:100};ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+70,y:CY+440});setTimeout(()=>{if(ESCI()&&dg.ph==='lobby')banner={s:'🌉 คุ้มกันขบวน · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function escStart(){if(!ESCI()||dg.ph!=='lobby')return;const D=DT[19];stSay(ESC_IN,()=>{if(!ESCI()||dg.ph!=='lobby')return;dg={ph:'run',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;ESC={y:ESC_Y0,hp:100,st:'go',cp:0,wv:0,tk:5,bt:0,hit:0,lh:100};
  fx({k:'msg',s:'🌉 ขบวนออกเดินทาง! พาเกวียนไปให้ถึงประตูอัสตรา'});try{sfx('quest')}catch(e){}},{cine:1})}
function escPl(){const a=[];if(me.cls&&me.down<=0)a.push({u:uid,x:me.x,y:me.y});Object.entries(others).forEach(([u,o])=>{if(o.hp>0)a.push({u,x:o.x,y:o.y})});return a}
function escSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  if(ESC.hp<=0){dgEnd(0,'ขบวนผู้อพยพถูกเงากลืน');return}
  const pl=escPl(),thr=mons.some(m=>m.t!==3&&m.hp>0&&Math.hypot(m.x-CX,m.y-ESC.y)<170),guard=pl.some(p=>Math.hypot(p.x-CX,p.y-ESC.y)<100);
  if(guard&&!thr)ESC.hp=Math.min(100,ESC.hp+.7*dt);
  if(dg.ph==='run'){if(ESC.wv&&!mons.some(m=>m.esc&&m.hp>0)){ESC.wv=0;fx({k:'msg',s:'✨ ตีเงาถอยได้แล้ว! ขบวนเดินต่อ'})}
    ESC.st=(!ESC.wv&&!thr)?'go':'stop';
    if(ESC.st==='go'){ESC.y-=26*dt;if(ESC.cp<ESC_CP.length&&ESC.y<=ESC_CP[ESC.cp]){ESC.cp++;dg.w=ESC.cp;const np=Math.max(1,plCount());escSpawn(Math.round((6+ESC.cp*2)*(.7+.45*np)),ESC.cp);ESC.wv=1;fx({k:'msg',s:'⚠️ เงาซุ่มโจมตีที่จุดพัก '+ESC.cp+'/'+ESC_CP.length+'! ปกป้องเกวียน'});try{sfx('boss')}catch(e){}}
      if(ESC.y<=ESC_END){ESC.y=ESC_END;ESC.st='stop';dg.ph='boss';bossCd=1e9;spawnBoss();dg.tl+=DGBOSS;fx({k:'escc',p:[[CX,CY-520]],big:1});fx({k:'msg',s:'🔔 ผู้ตีระฆังเงาขวางประตูอัสตรา! ล้มมันให้ได้'})}
      ESC.tk-=dt;if(ESC.tk<=0){ESC.tk=8;escSpawn(2,0,1)}}}
  ESC.bt-=dt;if(ESC.bt<=0){ESC.bt=.4;fx({k:'escv',cy:Math.round(ESC.y),hp:Math.round(ESC.hp*10)/10,st:ESC.st,cp:ESC.cp})}}
function escMon(m,dt,pl,spd){if(!ESCI()||(dg.ph!=='run'&&dg.ph!=='boss'))return false;for(const p of pl)if(Math.hypot(p.x-m.x,p.y-m.y)<150)return false;
  const d=Math.hypot(CX-m.x,ESC.y-m.y);if(d>46){moveTo(m,CX,ESC.y,spd*1.1*dt);return true}
  if(m.ac<=0){m.ac=1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();ESC.hp=Math.max(0,ESC.hp-(m.t===0?1.3:m.t===2?1.1:.8));ESC.hit=performance.now()}return true}
function escBossAI(m,dt,pl,enr,dm){if(m.t!==3||m.stun>0||m.inv)return;const x=Math.round(m.x),y=Math.round(m.y),f=m.hp/m.mh;
  m.e1=(m.e1===undefined?6:m.e1)-dt;if(m.e1<=0){m.e1=enr?9:12;m.tl.push({x,y,r:250,t:2,k:'mvn'});fx({k:'tele',x,y,r:250,dur:2});fx({k:'msg',s:'🔔 ระฆังเงาดังกังวาน! วิ่งออกจากวงรอบตัวมัน'})}
  m.e2=(m.e2===undefined?9:m.e2)-dt;if(m.e2<=0){m.e2=enr?11:14;const a0=Math.random()*6.283,H=[];for(let i=0;i<4;i++){const a=a0+i*Math.PI/2,hx=Math.round(CX+Math.cos(a)*78),hy=Math.round(ESC.y+Math.sin(a)*60);H.push({x:hx,y:hy});fx({k:'tele',x:hx,y:hy,r:56,dur:2.2})}(m.hs=m.hs||[]).push({H,t:2.2});fx({k:'esch',p:H.map(h=>[h.x,h.y]),dur:2.2});fx({k:'msg',s:'🖐️ มือเงาคว้าเกวียน! เข้าไปยืนในวงเพื่อรับแทน'})}
  (m.hs||[]).forEach(z=>{z.t-=dt;if(z.t<=0){z.H.forEach(h=>{const ps=pl.filter(p=>Math.hypot(p.x-h.x,p.y-h.y)<56);if(ps.length)ps.forEach(p=>dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(22*dm));else{ESC.hp=Math.max(0,ESC.hp-6);ESC.hit=performance.now()}fx({k:'bslam',x:h.x,y:h.y,r:56})})}});if(m.hs)m.hs=m.hs.filter(z=>z.t>0);
  if(f<.5){m.e3=(m.e3===undefined?3:m.e3)-dt;if(m.e3<=0){m.e3=enr?13:17;escSpawn(2+Math.min(2,pl.length-1),1,1);fx({k:'msg',s:'🌑 เงาไต่ทะลักขึ้นจากขอบสะพาน! อย่าให้มันถึงเกวียน'})}}}
let EHD=[];function escFx(o){if(o&&o.k==='esch'){EHD.push({p:o.p||[],t0:performance.now(),d:(+o.dur||2.2)*1000});if(EHD.length>6)EHD.shift();return true}if(o&&o.k==='escc'){const n=performance.now();(o.p||[]).forEach(p=>ECL.push({x:+p[0],y:+p[1],t0:n,big:o.big?1:0}));if(ECL.length>40)ECL.splice(0,ECL.length-40);return true}if(o&&o.k==='escv'){if(!isHost()||!ESCI()){const h=+o.hp;if(h<ESC.hp-.05)ESC.hit=performance.now();ESC.y=+o.cy;ESC.hp=h;ESC.st=o.st;ESC.cp=o.cp|0}return true}return false}
/* ---------- v341 ลานคุ้มกันขบวน: ช่วงหนึ่งของสะพานรุ่งอรุณ ---------- */
const EHW=200,EY0=CY-640,EY1=CY+620,EC=[[CX,CY+500,230],[CX+170,CY+170,190],[CX-170,CY-70,190],[CX,CY-470,300]];
let ECL=[],ESCD={cl:null,dec:[],st:[]},ESCLP={x:CX,y:CY+330};
function escIn(x,y,m){m=m||0;if(Math.abs(x-CX)<EHW-m&&y>EY0+m&&y<EY1-m)return true;for(const[cx,cy,r]of EC)if(Math.hypot(x-cx,y-cy)<r-m)return true;return false}
function escClamp(p,m){m=m||12;if(escIn(p.x,p.y,m))return;let bx=p.x,by=p.y,bd=1e9;const tryP=(x,y)=>{const d=Math.hypot(x-p.x,y-p.y);if(d<bd){bd=d;bx=x;by=y}};
  tryP(Math.max(CX-EHW+m,Math.min(CX+EHW-m,p.x)),Math.max(EY0+m,Math.min(EY1-m,p.y)));for(const[cx,cy,r]of EC){const d=Math.hypot(p.x-cx,p.y-cy)||1;tryP(cx+(p.x-cx)/d*(r-m),cy+(p.y-cy)/d*(r-m))}p.x=bx;p.y=by}
function escU(c,dx,dy){dx=dx||0;dy=dy||0;c.beginPath();c.moveTo(CX-EHW+dx,EY0+dy);c.lineTo(CX+EHW+dx,EY0+dy);c.lineTo(CX+EHW+dx,EY1+dy);c.lineTo(CX-EHW+dx,EY1+dy);c.closePath();for(const[cx,cy,r]of EC){c.moveTo(cx+r+dx,cy+dy);c.arc(cx+dx,cy+dy,r,0,6.2832)}}
function escBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};
  const I=(x,y)=>{if(!escIn(x,y,-6))trees.push({x,y,r:22,inv:1,ns:1})},P=(x,y,r,k,o)=>{if(Math.abs(x-CX)<80&&k!=='barch')return null;if(M.gates.some(G=>Math.hypot(x-G.x,y-G.y)<90))return null;const t=Object.assign({x,y,r,k},o||{});trees.push(t);return t};
  for(let y=EY0;y<=EY1;y+=28)for(const s of[-1,1])I(CX+s*(EHW+18),y);for(const[cx,cy,r]of EC){const n=Math.round(r*6.283/28);for(let i=0;i<n;i++){const a=i/n*6.283;I(cx+Math.cos(a)*(r+18),cy+Math.sin(a)*(r+18))}}
  const inPl=(x,y)=>EC.some(([cx,cy,r])=>Math.hypot(x-cx,y-cy)<r-24);
  for(let y=EY0+60;y<EY1;y+=150)for(const s of[-1,1]){const x=CX+s*(EHW-14);if(!inPl(x,y))P(x,y,10,'blamp',{ht:86})}
  for(const[cx,cy,r]of[EC[1],EC[2]]){const sd=cx>CX?1:-1;for(const a of[-.9,0,.9]){const x=cx+sd*Math.cos(a)*(r-16),y=cy+Math.sin(a)*(r-16);P(x,y,10,'blamp',{ht:86})}P(cx+sd*(r-60),cy-70,18,'bpyl',{ht:150});P(cx+sd*(r-60),cy+70,10,'bban',{ht:90})}
  {const[cx,cy,r]=EC[3];for(let i=0;i<12;i++){const a=-Math.PI+i*Math.PI/6+Math.PI/12;if(Math.sin(a)>.55)continue;const x=cx+Math.cos(a)*(r-16),y=cy+Math.sin(a)*(r-16);if(Math.abs(x-CX)<110&&y<cy)continue;P(x,y,10,'blamp',{ht:86})}
    for(const s of[-1,1]){P(cx+s*170,cy-150,18,'bpyl',{ht:150});P(cx+s*120,cy-230,10,'bban',{ht:90})}trees.push({x:CX,y:CY-720,r:0,k:'barch',ht:300,hw:200,fw:130,ns:1,nc:1})}
  {const[cx,cy]=EC[0];P(cx+150,cy+40,16,'bcrate',{ht:40});P(cx+176,cy+10,14,'bcrate',{ht:40,v:1});P(cx-140,cy+80,24,'bcart',{ht:60});P(cx+120,cy+130,30,'btent',{ht:70,v:1});for(const s of[-1,1])P(cx+s*170,cy-90,10,'bban',{ht:90})}
  {const R=gxRng(7070);ESCD.cl=[];for(let i=0;i<110;i++)ESCD.cl.push([CX+(R()-.5)*2400,CY+(R()-.5)*2400,60+R()*120,R()]);ESCD.st=[];for(let i=0;i<16;i++){const s=R()<.5?-1:1,y=EY0+120+R()*(EY1-EY0-240);ESCD.st.push([CX+s*(EHW-10),y,16+R()*20,R()*6.28])}}
  ESCD.dec=[];trees.forEach(t=>{if(t.inv||!t.k)return;ESCD.dec.push({k:'ao',b:[t.x-70,t.y-30,t.x+70,t.y+40],x:t.x,y:t.y,r:t.r,w:t.hw||0})})}
function escPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S;const sk=c.createLinearGradient(0,CY-1100,0,CY+1100);sk.addColorStop(0,'#2c2f6e');sk.addColorStop(.3,'#6a5a9a');sk.addColorStop(.6,'#d88aa0');sk.addColorStop(.85,'#f4b48a');sk.addColorStop(1,'#ffd49a');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  if(ox<1200&&X1>220&&Y1>1700&&oy<2700)brgRuin(c);
  for(const cl of ESCD.cl||[]){const r=cl[2]*1.6;if(cl[0]+r<ox||cl[0]-r>X1||cl[1]+r<oy||cl[1]-r>Y1)continue;brgCloud(c,cl)}
  if(X1<CX-EHW-400||ox>CX+EHW+400)return;
  c.fillStyle='rgba(60,24,84,.16)';escU(c,48,100);c.fill();c.fillStyle='rgba(60,24,84,.12)';escU(c,22,46);c.fill();
  c.fillStyle='#8a5a2c';escU(c,0,20);c.fill();c.fillStyle='#d0a050';escU(c,0,9);c.fill();
  /* ซุ้มโค้งใต้สะพาน (มองทะลุลงไปเห็นโครงสร้าง) */
  c.strokeStyle='rgba(150,96,40,.55)';c.lineWidth=5;for(let y=EY0+80;y<EY1;y+=180){c.beginPath();c.moveTo(CX-EHW+6,y+30);c.quadraticCurveTo(CX,y+70,CX+EHW-6,y+30);c.stroke()}
  c.strokeStyle='rgba(255,236,170,.4)';c.lineWidth=24;escU(c);c.stroke();c.strokeStyle='#c8963c';c.lineWidth=12;c.stroke();
  c.fillStyle='#d4ba90';c.fill();
  c.save();escU(c);c.clip();
  for(let y=EY0-20;y<EY1+260;y+=220){if(y<oy-260||y>Y1+260)continue;const gr=c.createRadialGradient(CX,y,10,CX,y,260);gr.addColorStop(0,'rgba(255,244,220,.14)');gr.addColorStop(1,'rgba(255,244,220,0)');c.fillStyle=gr;c.fillRect(CX-300,y-260,600,520)}
  for(let y=Math.floor((oy-40)/30)*30;y<Y1+40;y+=30){const j=Math.round(y/30);if(j%2){c.fillStyle='rgba(214,160,90,'+(.12+palH(j,3,31)*.12)+')';c.fillRect(ox,y,S,30)}c.strokeStyle='rgba(150,100,40,.38)';c.lineWidth=1.6;c.beginPath();c.moveTo(ox,y);c.lineTo(X1,y);c.stroke();
    for(let x=CX-EHW+(j%2?40:80);x<CX+EHW;x+=120){c.strokeStyle='rgba(150,100,40,.22)';c.lineWidth=1;c.beginPath();c.moveTo(x,y);c.lineTo(x,y+30);c.stroke()}}
  c.fillStyle='rgba(170,110,40,.42)';c.fillRect(CX-30,EY0-200,60,EY1-EY0+400);c.fillStyle='rgba(240,214,160,.5)';c.fillRect(CX-24,EY0-200,48,EY1-EY0+400);c.fillStyle='rgba(225,170,70,.5)';c.fillRect(CX-28,EY0-200,1.4,EY1-EY0+400);c.fillRect(CX+27,EY0-200,1.4,EY1-EY0+400);
  for(let y=EY0+50;y<EY1;y+=200){c.fillStyle='rgba(216,160,60,.75)';PST(c,CX,y,13,5,8,0);c.fill();c.fillStyle='rgba(255,250,235,.9)';c.beginPath();c.arc(CX,y,3.4,0,7);c.fill()}
  for(const[cx,cy,r]of EC){if(cx+r<ox||cx-r>X1||cy+r<oy||cy-r>Y1)continue;const gr=c.createRadialGradient(cx,cy,10,cx,cy,r);gr.addColorStop(0,'rgba(255,240,205,.2)');gr.addColorStop(1,'rgba(255,236,200,0)');c.fillStyle=gr;c.beginPath();c.arc(cx,cy,r,0,7);c.fill();
    for(const[rr,w,a]of[[r-16,3,.6],[r-30,1.2,.45],[r*.42,1.4,.5],[r*.28,1,.4]]){c.strokeStyle='rgba(216,164,64,'+a+')';c.lineWidth=w;c.beginPath();c.arc(cx,cy,rr,0,7);c.stroke()}
    c.strokeStyle='rgba(216,164,64,.22)';c.lineWidth=1;for(let i=0;i<24;i++){const a=i*Math.PI/12;c.beginPath();c.moveTo(cx+Math.cos(a)*r*.42,cy+Math.sin(a)*r*.42);c.lineTo(cx+Math.cos(a)*(r-30),cy+Math.sin(a)*(r-30));c.stroke()}
    if(cx!==CX){c.fillStyle='rgba(206,150,56,.4)';PST(c,cx,cy,r*.2,r*.08,12,0);c.fill()}}
  for(const[x,y,r,a]of ESCD.st){for(let k=0;k<3;k++){c.fillStyle='rgba(34,14,46,.24)';c.beginPath();c.ellipse(x+Math.cos(a+k*2)*r*.6,y+Math.sin(a+k*2)*r*.4,r*(1-k*.2),r*.5,a,0,7);c.fill()}c.strokeStyle='rgba(34,14,46,.3)';c.lineWidth=2.2;for(let k=0;k<4;k++){const b=a+k*1.4,sx=x>CX?-1:1;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+sx*30,y+Math.sin(b)*30,x+sx*(50+k*8),y+Math.sin(b)*48);c.stroke()}}
  for(const d of ESCD.dec){const b=d.b;if(b[0]<X1&&b[2]>ox&&b[1]<Y1&&b[3]>oy){c.save();try{PALD.ao(c,d,ox,oy,X1,Y1)}catch(e){}c.restore()}}
  c.restore()}
function escSpawn(n,w,crawl){const D=DT[19],np=Math.max(1,plCount()),pts=[];for(let i=0;i<n;i++){let x,y;const P=w>0&&!crawl&&i%2===0?EC[w]:null;
    if(P){const sd=P[0]>CX?1:-1,a=(Math.random()-.5)*2.2;x=P[0]+sd*Math.cos(a)*(P[2]-26);y=P[1]+Math.sin(a)*(P[2]-26)}else{const s=Math.random()<.5?-1:1;x=CX+s*(EHW-24);y=Math.max(EY0+40,Math.min(EY1-40,ESC.y+rnd(-200,60)))}
    const t=crawl?1:(Math.random()<.18+w*.08?2:(Math.random()<.4?1:0)),L=D.L+(w|0),hp=mhp(t,L)*(1+.25*(np-1))*(crawl?.8:1);mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,esc:1});if(pts.length<12)pts.push([Math.round(x),Math.round(y)])}
  if(pts.length)fx({k:'escc',p:pts})}
/* วาดชั้นพื้นที่ขยับได้ + เกวียน */
function escDraw(){if(!ESCI())return;const T=performance.now()/1000,now=performance.now(),Q=LOWQ;
  if(me.cls&&me.down<=0){if(escIn(me.x,me.y,-4)){ESCLP.x=me.x;ESCLP.y=me.y}else if(!escIn(me.x,me.y,-30)){me.x=ESCLP.x;me.y=ESCLP.y}}
  g.save();
  for(let i=0;i<(Q?3:7);i++){const cx=((i*733+T*(9+i%3*4))%2800+2800)%2800+200,cy=CY-1000+(i*977)%2000,r=90+(i%4)*30;if(!palVis(cx,cy,r*2)||escIn(cx,cy,-r*.7))continue;g.globalAlpha=.24;try{g.drawImage(plxCloud(),cx-r*1.5,cy-r*.75,r*3,r*1.5)}catch(e){}g.globalAlpha=1}
  g.globalCompositeOperation='lighter';
  for(const off of[0,2.2]){const q=((T+off)%4.4)/3.6;if(q>1)continue;const y=EY0+q*(EY1-EY0);if(palVis(CX,y,260)){glowAt(CX,y,150,'255,230,180',.1*Math.sin(q*3.14));glowAt(CX,y,40,'255,250,235',.16*Math.sin(q*3.14))}}
  for(let i=0;i<(Q?10:24);i++){const s=i%2?1:-1,q=(T*.35+i/7)%1,x=CX+s*(EHW-4),y=EY0+((i*97)%(EY1-EY0))-q*46;if(!palVis(x,y,20))continue;glowAt(x,y,2.4,'255,226,160',.8*Math.sin(q*3.14))}
  /* เงาไต่ขึ้นจากขอบ */
  ECL=ECL.filter(e=>now-e.t0<1400);for(const e of ECL){const k=(now-e.t0)/1400,sd=e.x>CX?1:e.x<CX?-1:0;if(!palVis(e.x,e.y,120))continue;g.globalCompositeOperation='lighter';glowAt(e.x,e.y,70*(e.big?2:1),'150,60,210',.35*(1-k));g.globalCompositeOperation='source-over';
    g.fillStyle='rgba(16,6,24,'+(.75*(1-k))+')';g.beginPath();g.ellipse(e.x,e.y,(22+k*30)*(e.big?2.2:1),(10+k*12)*(e.big?2.2:1),0,0,7);g.fill();g.strokeStyle='rgba(16,6,24,'+(.85*(1-k))+')';g.lineCap='round';
    for(let j=0;j<5;j++){const a=-Math.PI/2+(j-2)*.45+sd*.6,L=(30+j%3*14)*Math.sin(Math.min(1,k*2)*1.57)*(e.big?2:1);g.lineWidth=5-j%2;g.beginPath();g.moveTo(e.x,e.y);g.quadraticCurveTo(e.x+Math.cos(a+.5)*L*.6,e.y+Math.sin(a+.5)*L*.5,e.x+Math.cos(a)*L,e.y+Math.sin(a)*L);g.stroke()}}
  g.globalCompositeOperation='source-over';
  /* เส้นทาง */
  g.lineCap='round';g.strokeStyle='rgba(180,120,40,.45)';g.lineWidth=4;g.setLineDash([10,10]);g.lineDashOffset=T*20;g.beginPath();g.moveTo(CX,ESC_Y0);g.lineTo(CX,ESC_END);g.stroke();g.setLineDash([]);
  g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,200,90,.7)';g.lineWidth=8;g.beginPath();g.moveTo(CX,ESC_Y0);g.lineTo(CX,Math.max(ESC_END,ESC.y));g.stroke();g.globalCompositeOperation='source-over';
  ESC_CP.forEach((cy,i)=>{const P=EC[i+1],done=ESC.cp>i,act=ESC.cp===i+1&&ESC.wv,x=P[0]+(P[0]>CX?60:-60),y=P[1]-40;g.fillStyle='#8a6a3a';g.fillRect(x-1.5,y-46,3,48);g.fillStyle=done&&!act?'#e0b050':act?'#c03a3a':'#2a4a9a';const w=Math.sin(T*3+i)*2;g.beginPath();g.moveTo(x+1.5,y-46);g.lineTo(x+26,y-38+w);g.lineTo(x+1.5,y-30);g.closePath();g.fill();
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(255,246,226,.9)';const lb=act?'⚠️ ซุ่มโจมตี!':'จุดพัก '+(i+1);g.strokeText(lb,x,y+14);g.fillStyle=act?'#a02a2a':'#6a4a1a';g.fillText(lb,x,y+14);
    if(act){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,60,255,'+(.3+.2*Math.sin(T*6))+')';g.lineWidth=3;g.beginPath();g.arc(P[0],P[1],P[2]-14,0,7);g.stroke();g.restore()}});
  /* มือเงาคว้าเกวียน */
  EHD=EHD.filter(e=>performance.now()-e.t0<e.d+500);for(const e of EHD){const a=(performance.now()-e.t0)/e.d,k=Math.min(1,a);for(const[x,y]of e.p){if(a>1){const q=(a-1)*e.d/500;g.save();g.globalCompositeOperation='lighter';glowAt(x,y,60,'170,60,230',.5*(1-q));g.restore();continue}
    g.fillStyle='rgba(26,6,40,'+(.25+.35*k)+')';g.beginPath();g.ellipse(x,y,56,40,0,0,7);g.fill();g.strokeStyle='rgba(190,80,255,'+(.6+.4*Math.sin(T*12))+')';g.lineWidth=2.4;g.setLineDash([8,5]);g.lineDashOffset=-T*30;g.stroke();g.setLineDash([]);
    g.strokeStyle='rgba(255,230,200,.9)';g.lineWidth=2;g.beginPath();g.ellipse(x,y,56*k,40*k,0,0,7);g.stroke();
    const h=10+34*k;g.fillStyle='rgba(14,4,22,.92)';g.beginPath();g.ellipse(x,y-h*.3,12,8+h*.25,0,0,7);g.fill();g.strokeStyle='rgba(14,4,22,.92)';g.lineCap='round';for(let f=0;f<5;f++){const fx2=x-10+f*5,L=h*(f===2?1:f===0?.6:.85);g.lineWidth=f===0?4:3.4;g.beginPath();g.moveTo(fx2,y-h*.4);g.quadraticCurveTo(fx2+(f-2)*3,y-h*.4-L*.6,fx2+(f-2)*5+Math.sin(T*8+f)*2,y-h*.4-L);g.stroke()}
    g.save();g.globalCompositeOperation='lighter';glowAt(x-3,y-h*.35,3,'255,160,80',.9);glowAt(x+3,y-h*.35,3,'255,160,80',.9);g.restore();
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,8,24,.85)';g.strokeText('ยืนรับแทน!',x,y+24);g.fillStyle='#f0c8ff';g.fillText('ยืนรับแทน!',x,y+24)}}
  escCaravan(T);g.restore()}
function escCaravan(T){const x=CX,y=ESC.y,mv=ESC.st==='go'&&dg.ph==='run',hit=performance.now()-ESC.hit<220,bob=mv?Math.sin(T*8)*1.2:0,sh=hit?Math.sin(T*90)*2:0,wr=mv?T*5:0;
  const near=me.cls&&Math.hypot(me.x-x,me.y-y)<100,heal=near&&ESC.hp<100&&!mons.some(m=>m.t!==3&&Math.hypot(m.x-x,m.y-y)<170);
  g.save();g.strokeStyle='rgba(232,184,80,'+(near?.9:.5)+')';g.lineWidth=near?3:2;g.setLineDash([12,8]);g.lineDashOffset=-T*24;g.beginPath();g.ellipse(x,y+20,100,62,0,0,7);g.stroke();g.setLineDash([]);
  if(heal){g.globalCompositeOperation='lighter';glowAt(x,y,120,'140,255,160',.16+.06*Math.sin(T*5));for(let i=0;i<5;i++){const q=(T*.8+i/5)%1;glowAt(x-40+i*20,y+10-q*60,3,'170,255,180',Math.sin(q*3.14))}g.globalCompositeOperation='source-over'}g.restore();
  /* ขบวนท้าย: รถเข็นของ + คนเดินตาม */
  {const y2=y+118;if(y2<EY1){g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x,y2+12,30,7,0,0,7);g.fill();g.fillStyle='#6a4a2a';g.fillRect(x-22,y2-14,44,20);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(x-22,y2-14,44,20);for(const s of[-1,1]){g.fillStyle='#4a3020';g.beginPath();g.ellipse(x+s*24,y2+4,5,9,0,0,7);g.fill()}
    for(const[dx,dy,c]of[[-12,-20,'#c8a870'],[4,-24,'#9a8a6a'],[14,-18,'#b89060']]){g.fillStyle=c;g.beginPath();g.ellipse(x+dx,y2+dy,9,7,0,0,7);g.fill();g.strokeStyle='#5a4020';g.lineWidth=1;g.stroke()}
    for(const[dx,dy,c,h]of[[-44,0,'#5a6a8a','#d8b060'],[44,-4,'#8a5a3a','#3a2414'],[-30,40,'#6a4a6a','#1a1a1a'],[30,44,'#4a6a5a','#8a4a2a'],[0,58,'#7a6a4a','#3a2414']])campFolk(x+dx,y2+dy,{c,hair:h,f:dx<0?1:-1,k:dx*3+dy,run:mv?1:0,sit:!mv&&dg.ph==='run'&&ESC.wv?1:0,s:1.1},T)}}
  for(const[dx,dy,c,h,hat]of[[-56,4,'#6a6a3a','#d8b060',null],[56,-6,'#7a3a6a','#8a4a2a','#8a5a2a'],[-48,40,'#4a6a4a','#3a2414',null],[46,40,'#8a6a3a','#1a1a1a',null]])campFolk(x+dx,y+dy,{c,hair:h,hat,f:dx<0?1:-1,k:dx+dy,run:mv?1:0,s:1.15},T);
  /* คนลากเชือกด้านหน้า */
  for(const s of[-1,1]){const px=x+s*16,py=y-74;g.strokeStyle='#8a6a3a';g.lineWidth=1.4;g.beginPath();g.moveTo(x+s*10,y-34);g.quadraticCurveTo(x+s*14,y-50,px,py+4);g.stroke();campFolk(px,py,{c:s<0?'#7a4a3a':'#3a5a7a',hair:'#3a2414',f:s<0?1:-1,k:s*5,run:mv?1:0,s:1.15,arm:mv?.6:0},T)}
  g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(x,y+24,44,11,0,0,7);g.fill();
  g.save();g.translate(sh,bob);
  for(const s of[-1,1]){const wx=x+s*31,wy=y+12;g.fillStyle='#3a2414';g.beginPath();g.ellipse(wx,wy,8,14,0,0,7);g.fill();g.strokeStyle='#a07a40';g.lineWidth=1.6;g.beginPath();g.ellipse(wx,wy,6,11,0,0,7);g.stroke();g.lineWidth=1;for(let k=0;k<4;k++){const a=wr+k*.785;g.beginPath();g.moveTo(wx,wy);g.lineTo(wx+Math.cos(a)*5,wy+Math.sin(a)*10);g.stroke()}}
  {const bg=g.createLinearGradient(x-30,0,x+30,0);bg.addColorStop(0,'#5a3820');bg.addColorStop(.5,'#8a5c34');bg.addColorStop(1,'#5a3820');g.fillStyle=bg;g.fillRect(x-29,y-14,58,32)}g.strokeStyle='#2a1810';g.lineWidth=1.4;g.strokeRect(x-29,y-14,58,32);g.strokeStyle='rgba(40,24,12,.6)';for(let i=1;i<4;i++){g.beginPath();g.moveTo(x-29,y-14+i*8);g.lineTo(x+29,y-14+i*8);g.stroke()}
  g.fillStyle='#c8a040';for(const s of[-1,1])g.fillRect(x+s*26-2,y-14,4,32);
  {const cg=g.createLinearGradient(0,y-64,0,y-6);cg.addColorStop(0,'#fffaf0');cg.addColorStop(1,'#d8c8a4');g.fillStyle=cg;g.beginPath();g.moveTo(x-31,y-6);g.lineTo(x-31,y-30);g.quadraticCurveTo(x,y-66,x+31,y-30);g.lineTo(x+31,y-6);g.closePath();g.fill();g.strokeStyle='#8a7a5a';g.lineWidth=1.2;g.stroke()}
  g.strokeStyle='rgba(138,122,90,.6)';g.lineWidth=1;for(const k of[-16,0,16]){g.beginPath();g.moveTo(x+k,y-6);g.quadraticCurveTo(x+k*1.05,y-40,x+k*.6,y-48+Math.abs(k)*.4);g.stroke()}
  g.fillStyle='#b88a5a';g.fillRect(x+8,y-34,10,9);g.fillStyle='#7a9ac0';g.fillRect(x-20,y-28,9,8);
  g.fillStyle='#2a4a9a';g.fillRect(x-31,y-22,62,6);g.fillStyle='#e0b050';g.fillRect(x-31,y-17,62,2);
  /* ธงอัสตรา */{const fx2=x-26,fy=y-30,w=Math.sin(T*4)*3;g.strokeStyle='#5a3a1a';g.lineWidth=2;g.beginPath();g.moveTo(fx2,fy);g.lineTo(fx2,fy-52);g.stroke();g.fillStyle='#2a4a9a';g.beginPath();g.moveTo(fx2,fy-52);g.lineTo(fx2-22,fy-48+w);g.lineTo(fx2-18,fy-40+w*.5);g.lineTo(fx2-22,fy-32+w);g.lineTo(fx2,fy-36);g.closePath();g.fill();g.fillStyle='#e0b050';PST(g,fx2-9,fy-44+w*.5,4,1.6,5,0);g.fill()}
  campFolk(x+6,y-52,{c:'#8a6a3a',sh:'#d84a3a',hair:'#3a2414',f:1,k:9,sit:1,s:1,arm:Math.sin(T*4)*.8-.6},T);
  /* ตะเกียงหน้าเกวียน */g.strokeStyle='#5a3a1a';g.lineWidth=2;g.beginPath();g.moveTo(x+27,y-14);g.lineTo(x+34,y-60);g.lineTo(x+40,y-60);g.stroke();{const lx=x+40,ly=y-54+Math.sin(T*3)*1.5;g.fillStyle='#c8a040';g.fillRect(lx-4,ly-6,8,10);g.fillStyle='#fff4d0';g.fillRect(lx-2.5,ly-4,5,6);g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly-1,28,'255,210,130',.6+.15*Math.sin(T*5));g.restore()}
  if(hit){g.fillStyle='rgba(255,60,40,.35)';g.fillRect(x-31,y-44,62,62)}g.restore();
  if(mv&&!LOWQ){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const q=(T*.9+i/6)%1;glowAt(x+Math.sin(i*2.3+T)*24,y+30+q*70,2.4,'255,230,160',.7*(1-q))}g.restore()}
  const bw=90,by=y-92,k=Math.max(0,ESC.hp)/100;g.fillStyle='rgba(20,12,8,.78)';g.beginPath();g.roundRect(x-bw/2-3,by-3,bw+6,12,5);g.fill();g.fillStyle=k>.5?'#7ad04a':k>.25?'#e0b030':'#e04a3a';g.beginPath();g.roundRect(x-bw/2,by,bw*k,6,3);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(x-bw/2+2,by+1,Math.max(0,bw*k-4),1.5);
  g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.85)';const lb=(dg.ph==='boss'?'🛡️ ':mv?'▶ ':'⛔ หยุด · ')+'ขบวนผู้อพยพ '+Math.ceil(ESC.hp)+'%';g.strokeText(lb,x,by-6);g.fillStyle='#ffe8b0';g.fillText(lb,x,by-6);
  if(heal){g.font='9px system-ui';g.strokeText('✚ กำลังซ่อมขบวน',x,y+52);g.fillStyle='#b8ffb8';g.fillText('✚ กำลังซ่อมขบวน',x,y+52)}}
function escScreen(){if(!ESCI())return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);brgScreen(T,ZM.z,H);
  /* ลดแสงจ้า: ขอบจอโทนอุ่นจาง ๆ ให้สายตาโฟกัสกลางจอ */if(dg.ph!=='boss')g.drawImage(escVig(),0,0,SW0,H);
  if(dg.ph==='boss'){const gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.3,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba(60,20,90,0)');gr.addColorStop(1,'rgba(60,20,90,'+(.28+.06*Math.sin(T*2))+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H)}g.restore()}
/* ภาพบอส: ผู้ตีระฆังเงา */
function gxBellKeeper(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,fy=br-4,bsw=Math.sin(T*1.4)*.08+(cf>0?Math.sin(T*16)*.06:0);g.save();g.translate(0,30);g.scale(1.25,1.25);g.translate(0,-30);
  /* ระฆังยักษ์บนหลัง */
  g.save();g.translate(0,-76+fy);g.rotate(bsw);Ln([-46,-10,46,-10],F('#3a2414'),5);const bg=W?'#fff':(()=>{const q=g.createLinearGradient(-40,0,40,0);q.addColorStop(0,'#5a3418');q.addColorStop(.45,'#c88a44');q.addColorStop(1,'#4a2a12');return q})();
  g.beginPath();g.moveTo(-12,-8);g.quadraticCurveTo(-18,8,-22,28);g.quadraticCurveTo(-30,52,-44,62);g.lineTo(44,62);g.quadraticCurveTo(30,52,22,28);g.quadraticCurveTo(18,8,12,-8);g.closePath();g.fillStyle=bg;g.fill();g.lineWidth=1.6;g.strokeStyle='#2a1408';g.stroke();
  if(!W){g.strokeStyle='rgba(255,170,80,'+(.5+.4*(1-hf))+')';g.lineWidth=1.6;g.beginPath();g.moveTo(-8,10);g.lineTo(-14,30);g.lineTo(-6,44);g.moveTo(10,18);g.lineTo(16,38);g.stroke();g.save();g.globalCompositeOperation='lighter';glowOrb(0,40,24+cf*20,'255,170,80',.4+.4*cf);g.restore();
    if(cf>0){g.strokeStyle='rgba(255,190,110,'+(.7*cf)+')';g.lineWidth=2;for(let i=0;i<3;i++){const q=(T*1.5+i/3)%1;g.beginPath();g.ellipse(0,50,40+q*60,12+q*20,0,0,7);g.stroke()}}}
  g.restore();
  /* ร่าง */
  {const cs=Math.sin(T*1.2)*4;Pg([-26,-44+fy,26,-44+fy,44+cs,22,30,30,18,24,6,32,-8,24,-22,32,-44-cs,22],F('#1c1028'),1);if(!W){for(let i=0;i<6;i++){const q=(T*.7+i/6)%1;g.fillStyle='rgba(30,12,44,'+(.5*(1-q))+')';g.beginPath();g.arc(-36+i*14,28+q*14,4+q*5,0,7);g.fill()}}}
  Pg([-20,-44+fy,20,-44+fy,16,6,-16,6],F('#7a4c24'),1);E(0,-20+fy,8,8,F('#c8904a'),1);if(!W){g.strokeStyle='#ffc070';g.lineWidth=1.2;for(let i=0;i<8;i++){const a=i*.785+T*.4;g.beginPath();g.moveTo(Math.cos(a)*8,-20+fy+Math.sin(a)*8);g.lineTo(Math.cos(a)*12,-20+fy+Math.sin(a)*12);g.stroke()}g.save();g.globalCompositeOperation='lighter';glowOrb(0,-20+fy,12,'255,170,80',.7);g.restore()}
  for(const s of[-1,1]){E(s*24,-40+fy,11,8,F('#8a5a2c'),1);Ln([s*24,-42+fy,s*30,-58+fy],F('#3a2414'),3)}
  E(0,-56+fy,11,12,F('#7a4c24'),1);Pg([-11,-58+fy,-12,-72+fy,0,-80+fy,12,-72+fy,11,-58+fy],F('#8a5a2c'),1);if(!W){g.fillStyle='#08030c';g.fillRect(-2,-74+fy,4,18)}eye(-4,-62+fy,2.4,1.4,'#ffb050');eye(4,-62+fy,2.4,1.4,'#ffb050');
  /* ค้อนตีระฆัง */{const hx=34,hy=-10+fy-up*.6;Ln([20,-36+fy,hx,hy],F('#1c1028'),6);Ln([hx,hy+30,hx-2,hy-80],F('#4a2e16'),3.4);g.fillStyle=F('#8a5a2c');g.fillRect(hx-14,hy-96,26,18);g.strokeStyle='#2a1408';g.lineWidth=1.4;g.strokeRect(hx-14,hy-96,26,18);if(!W&&cf>0){g.save();g.globalCompositeOperation='lighter';glowOrb(hx-1,hy-87,16*cf+6,'255,180,90',.7*cf);g.restore()}}
  {const lx=-36,ly=-22+fy-up*.3;Ln([-20,-36+fy,lx,ly],F('#1c1028'),6);if(!W){g.strokeStyle='rgba(30,12,44,.85)';g.lineWidth=2.4;for(let i=0;i<3;i++){g.beginPath();g.moveTo(lx,ly);g.quadraticCurveTo(lx-10-i*4,ly+10,lx-6-i*6,ly+24+Math.sin(T*3+i)*4);g.stroke()}}}
  g.restore()}
function escReward(){if(dgRew)return;dgRew=1;const D=DT[19],st=stCur(),sto=st&&st.g==='esc',gd=sto?D.gold:50000;
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?12:5));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?20:6+(Math.random()*5|0),'คุ้มกันขบวน')}catch(e){}try{ecGive(sto?20:6+(Math.random()*4|0),'คุ้มกันขบวน')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.5)drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.3)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  me.ach=me.ach||{};if(sto){me.sty.n=1;me.sty.a=1;me.ach.stEs=1}else me.esT=Date.now();
  banner={s:'🌉 ขบวนผู้อพยพถึงประตูอัสตรา! +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?12:5)+' · ขบวนเหลือ '+Math.ceil(ESC.hp)+'%',t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe8a0','#ffffff','#ffb070','#a8d0ff'],120,280,1.6,{glow:1,g:-50});
  setTimeout(()=>{if(ESCI())enterMap(9,{x:1600,y:2140})},9000)}
function instRepeatEsc(){const l=Math.max(0,(me.esT||0)+30*60000-Date.now());if(l>0){stSay([['til','ขบวนถัดไปยังเตรียมของอยู่เลย… อีก '+Math.ceil(l/60000)+' นาทีค่อยมาใหม่นะ']]);return true}
  stSay([['til','ผู้อพยพยังทยอยขึ้นมาทุกวันเลย แต่เงาก็ยังไต่ขึ้นมาอยู่ดี… ช่วยคุ้มกันขบวนอีกรอบได้ไหม? (หินขั้นสูง · เศษคราส · ของ Lv 22)']],()=>{},{choice:[['🌉 คุ้มกันขบวน',1],['ไว้ก่อน',0]]});SD.onChoose=e=>{stClose();if(e===1)setTimeout(escEnter,250)};return true}
setTimeout(()=>{try{
    const C=MAPS[9],K=MAPS[1];C.gates.push({x:1600,y:2250,to:30,req:1,p6:1,alias:1,nm:'สะพานรุ่งอรุณ',arr:{x:1600,y:420}});K.gates.push({x:1720,y:1775,to:30,req:1,p6:1,alias:1,nm:'สะพานรุ่งอรุณ',arr:{x:1600,y:2860}});
    const M7=MAPS[27];MAPS[30]=Object.assign({},M7,{n:'สะพานรุ่งอรุณ',sx:1600,sy:2900,sr:110,seed:301,bg:'#e8a888',tile:'#fff0d8',safe:'#ffe8c0',ring:'#e0ac48',t1:'#8a5a2c',t2:'#d0a050',d1:'#e0c090',d2:'#fff4d8',bth:30,
      gates:[{x:1600,y:3090,to:1,req:1,brg:1,nm:'ค่ายผู้อพยพ',arr:{x:1720,y:1880}},{x:1600,y:150,to:9,req:1,brg:1,nm:'นครลอยฟ้าอัสตรา',arr:{x:1600,y:2140}}],npc:{x:1680,y:1640,n:'ทิล · เด็กจากค่าย',L:22},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[1500,2520],[1400,2360],[1310,2140],[1290,1960],[1950,1260],[1990,1060],[1890,860],[880,2160],[2560,1180]]});
    FIELDM[30]=1;BTR[30]='150,40,170';GLOWC[30]='255,225,180';FXST[30]='holy';try{BTC[30]=['#fff4d8','#d8a040','#ffffff'];TIER[30]=[15,17.5,2.3];WRG[30]={2:{rg:270,cd:3,spd:230,dm:1.5,k:'bell',c:'255,190,120',big:1}}}catch(e){}}catch(e){console.warn('brg map',e)}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=79000&&id<80000)return escMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(ESCI())return escStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(ESCI())return escSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(ESCI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return escReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=ESCI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(ESCI()){enterMap(1,{x:1720,y:1880});sysMsg('🌉 ขบวนถอยกลับลงเชิงสะพาน · คุยกับผู้บัญชาการเรนน์ (หรือทิลบนสะพาน) เพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(ESCI())return dg.ph==='run'?'🌉 ขบวน '+Math.ceil(ESC.hp)+'% · '+(ESC.st==='go'?'กำลังเดิน':'หยุด')+' · ⏱ '+fmtT(dg.tl):dg.ph==='boss'?'🔔 ผู้ตีระฆังเงา · ขบวน '+Math.ceil(ESC.hp)+'% · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🌉 ขบวนถึงประตูอัสตรา!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🌉 เชิงสะพาน · กด "เริ่ม" เมื่อพร้อม';return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(ESCI()){ov.hidden=true;sfx('gate');enterMap(1,{x:1720,y:1880});return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(escFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{escDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{escScreen()}catch(e){}}}catch(e){}
  try{const _og=drawOneGate;window.drawOneGate=drawOneGate=function(G){if(G&&G.alias)return;if(G&&G.brg)return brgGateDraw(G);return _og(G)}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='esc')return instRepeatEsc();return _ir(k)}}catch(e){}
  try{const _sm2=stMini;window.stMini=stMini=function(dot){_sm2(dot);try{if(curMap===30&&!isDg()&&Math.sin(performance.now()/260)>-.3){P6LORE.forEach((L,i)=>{if(!p6Got(i)&&!BRGS.ses.has(i))dot(L.x,L.y,'#ffd890',4)});BRGSH.forEach((_,i)=>{if(!BRGS.sh[i]){const[x,y]=brgShP(i);dot(x,y,'#6a3a8a',3)}})}}catch(e){}}}catch(e){}
  try{const qnD=(x,y,f,t)=>{if(!npcModel({k:'qn',x,y},t,f))campFolk(x,y,{c:'#e8e0f8',sh:'#d8b050',hair:'#e8d8a0',f,s:1.2},t)},
      lirD=(x,y,f,t)=>campFolk(x,y,{c:'#c8b8e8',sh:'#ffffff',hair:'#c8904a',f,s:1.25,arm:-.3},t),
      tilD=(x,y,f,t)=>{g.fillStyle='#6a4a2a';g.beginPath();g.roundRect(x-f*9-4,y-15,8,11,2);g.fill();campFolk(x,y,{c:'#8a6a3a',sh:'#d84a3a',hair:'#3a2414',f,s:1.15,k:3,arm:Math.sin(t*3)*.6-.4},t)};
    NPC3[27]={d:(x,y,f,t)=>{(String(MAPS[27].npc.n).indexOf('ราชินี')===0?qnD:lirD)(x,y,f,t)},s:['หัวใจดาวเต้นช้าลงทุกวัน… ช้า แต่สงบ','ระวังกระจกนะ บางบานยังกระซิบอยู่','ประตูบัลลังก์ยังเปิดอยู่ ถ้าเจ้าอยากกลับไปดู'],hy:48};
    NPC3[28]={d:lirD,s:['ดอกไม้ในสวนนี้ องค์ราชินีปลูกเองทุกต้น','ได้ยินเพลงกล่อมไหม… ข้าร้องให้ทุกเย็น','หนามรอบศาลาเริ่มออกดอกแล้วล่ะ'],hy:46};
    NPC3[29]={d:qnD,s:['บัลลังก์ว่างแล้ว… ดีแล้วที่มันว่าง','ข้ายังได้ยินหัวใจสองดวงเต้นพร้อมกัน','ขอบคุณที่มากับข้าจนถึงที่นี่'],hy:52};
    NPC3[30]={d:tilD,s:['ข้าจะเป็นคนแรกที่เห็นเมืองบนฟ้า!','ได้ยินไหม… เสียงระฆังใต้เมฆ','ลมบนสะพานหอมเหมือนดอกไม้เลย','ท่านเรนน์ต้องดุข้าแน่ ๆ ที่แอบขึ้นมาก่อน'],hy:40}}catch(e){console.warn('npc3',e)}},0);

/* ขอบจอโทนอุ่น (แคชตามขนาดจอ) — ลดความจ้าของลานสะพานแสงโดยไม่ทำให้ตัวละครกลางจอมืด */
let ESCVG=null;function escVig(){const w=Math.round(SW0),h=Math.round(H);if(ESCVG&&ESCVG.width===w&&ESCVG.height===h)return ESCVG;const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
  const gr=x.createRadialGradient(w/2,h*.52,Math.min(w,h)*.32,w/2,h*.52,Math.max(w,h)*.72);gr.addColorStop(0,'rgba(70,36,14,0)');gr.addColorStop(1,'rgba(70,36,14,.3)');x.fillStyle=gr;x.fillRect(0,0,w,h);return ESCVG=c}
