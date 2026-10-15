/* ---------- v386 รูนเสริม · ลิงก์สกิลแบบ Path of Exile ----------
   สกิล 1/2/3/4 มีช่องลิงก์ 3 ช่อง (ปลดที่ Lv 20/45/70 · จุติแล้วเปิดครบ) ใส่รูนเสริมผสมกันได้อิสระทุกอาชีพ
   รูนเสริมเปลี่ยน "วิธีทำงาน" ของสกิล: ร่ายซ้ำ แยกร่าง ทอเท็ม กับดัก ทริกเกอร์ เปลี่ยนธาตุ โซ่ กระจาย ระเบิดซาก ฯลฯ
   ทุกอันมีราคา (มานา/คูลดาวน์/พลัง) · ใช้ไม่ได้ในลานประลอง PvP
   กลไก: (1) ห่อ useSkill0 → ร่ายจริง + สำเนา (ย้ายตำแหน่งร่ายชั่วคราวแล้วคืน) (2) ห่อ M('s{k}p') → คูณพลังสกิลผ่าน P
         (3) ห่อ addHit → ผลเมื่อโดน (นับว่าดาเมจไหนมาจากสกิลไหนจากบริบทการร่าย + ck ที่เรียนรู้หลังร่าย) */
const SGT={melee:{0:'atk aoe melee',1:'atk move melee',3:'self buff',4:'atk aoe cry'},
  archer:{0:'atk aoe proj',1:'atk move',3:'atk proj',4:'atk aoe'},
  mage:{0:'atk aoe proj',1:'atk aoe',3:'atk proj chain',4:'atk aoe dur'},
  assn:{0:'atk move',1:'atk aoe dur',3:'atk',4:'atk aoe'},
  sup:{0:'heal aoe',1:'buff party',3:'atk proj',4:'heal aoe atk'}};
const SGTN={atk:'โจมตี',aoe:'วงกว้าง',melee:'ประชิด',move:'เคลื่อนที่',self:'บัฟตัวเอง',buff:'บัฟ',cry:'คำราม',proj:'ยิง',chain:'โซ่',dur:'ต่อเนื่อง',heal:'ฮีล',party:'ทีม'};
/* id: [ไอคอน, ชื่อ, คำอธิบาย, หมวด, เงื่อนไขแท็ก, ตัวคูณ] */
const SGD={
 echo:['🔁','ร่ายซ้ำ','ร่ายสกิลซ้ำเองอีกครั้งหลัง 0.4 วิ (ครั้งที่สองพลัง 60%)','cast','!self',{mana:1.4,cd:1.1}],
 split:['👥','แยกร่าง','สกิลแยกไปเกิดซ้ำที่มอน 2 ตัวถัดไป (จุดละ 50%) · สกิลฮีล/บัฟจะแยกไปเกิดที่เพื่อนปาร์ตี้แทน','cast','!self',{mana:1.5}],
 party:['🤝','สายใยทีม','ทุกครั้งที่ร่าย สกิลเกิดซ้ำที่ตัวเพื่อนปาร์ตี้ทุกคนในแมพ (คนละ 60%)','cast','!self',{mana:1.3}],
 totem:['🗿','ทอเท็ม','ปักทอเท็มที่ร่ายสกิลนี้แทนเรา นาน 9 วิ (ครั้งละ 45% · ร่ายถี่สุดทุก 1.8 วิ สกิลคูลดาวน์ยาวจะร่ายห่างขึ้น) · ตัวเราไม่ได้ร่ายเอง','cast','!self !move',{cd:1.2}],
 trap:['🪤','กับดัก','โยนกับดักใส่เป้า มอนเหยียบแล้วระเบิดเป็นสกิลนี้ (พลัง 130%) · วางค้างได้ 3 อัน','cast','!self !move',{}],
 coc:['🎯','คริแล้วร่าย','ตีปกติติดคริเมื่อไร ร่ายสกิลนี้ใส่เป้าเองฟรี (พลัง 50%)','trig','!self',{mana:1.2}],
 cwdt:['🛡️','เจ็บแล้วร่าย','โดนตีสะสมครบ 10% ของเลือด ร่ายสกิลนี้ที่ตัวเราเองฟรี (พลัง 80%)','trig','',{mana:1.1}],
 cok:['💀','ฆ่าแล้วร่าย','ฆ่ามอนเมื่อไร ร่ายสกิลนี้ที่ซากมอนเองฟรี (พลัง 60%)','trig','!self',{mana:1.2}],
 fire:['🔥','ธาตุไฟ','ดาเมจกลายเป็นธาตุไฟ ติดไฟเผาต่อเนื่อง 4 วิ · จุดปฏิกิริยาธาตุกับเพื่อนได้','elem','atk',{mana:1.1}],
 ice:['❄️','ธาตุน้ำแข็ง','ดาเมจกลายเป็นน้ำแข็ง โอกาส 20% แช่แข็ง 1.2 วิ (บอสโดนช้าลงแทน)','elem','atk',{mana:1.1}],
 zap:['⚡','ธาตุสายฟ้า','ดาเมจกลายเป็นสายฟ้า เป้าช็อตรับดาเมจเรา +25% 3 วิ และไฟฟ้ากระโดดต่ออีก 1 ตัว (30%)','elem','atk',{mana:1.1}],
 chain:['⛓️','โซ่','ทุกครั้งที่โดน เด้งต่อไปมอนอีก 2 ตัว (60% → 40%)','hit','atk',{mana:1.25,pow:.9}],
 wide:['🌐','กระจายวง','ทุกครั้งที่โดน กระเซ็นใส่มอนรอบเป้า (45%)','hit','atk',{mana:1.25,pow:.9}],
 burst:['💥','ระเบิดซาก','มอนที่ตายจากสกิลนี้ระเบิดใส่รอบ ๆ (15% ของเลือดสูงสุดของมอนตัวนั้น)','hit','atk',{mana:1.2}],
 leech:['🩸','ดูดชีวิต','ดาเมจจากสกิลนี้ดูดเลือด 3% และมานา 0.5%','hit','atk',{pow:.9}],
 prec:['🔍','แม่นยำ','สกิลนี้โอกาสคริ +25% และดาเมจคริ +30%','stat','atk',{mana:1.2}],
 brut:['💢','ทุ่มสุดตัว','พลังสกิล +45% แต่คูลดาวน์นานขึ้น 35%','stat','',{pow:1.45,cd:1.35}],
 haste:['⏩','เร่งร่าย','คูลดาวน์ −35% แต่พลังเหลือ 80%','stat','',{cd:.65,pow:.8}],
 blood:['🫀','สังเวยโลหิต','ใช้เลือดแทนมานา (4% ของเลือดสูงสุด × ตัวคูณมานา) พลัง +15%','stat','',{pow:1.15}],
 pierce:['🏹','ทะลุทวีคูณ','ยิงเพิ่มอีก 2 ลูกใส่มอนตัวถัดไป (ลูกละ 60%) และทุกลูกทะลุโดนมอนในแนวทาง (40%)','rare','proj',{mana:1.35}],
 minion:['👻','วิญญาณรับใช้','ร่ายแล้วเรียกวิญญาณลอยตามตัว 12 วิ คอยร่ายสกิลนี้ใส่มอนใกล้ ๆ เอง (ครั้งละ 35%)','rare','!self !move',{mana:1.3,cd:1.4}],
 charge:['⏳','สะสมพลัง','ร่าย 2 ครั้งแรกพลังเหลือ 75% ครั้งที่ 3 ปลดพลังทั้งหมด ×2.6','rare','',{}],
 nova:['🌟','วงแหวนระเบิด','0.5 วิหลังร่าย วงแหวนพลังระเบิดรอบตัวเรา (160% ของพลังโจมตี) ทุกตัวในวง','rare','atk',{mana:1.25}]};
const SGCAT={cast:['🌀','รูปแบบการร่าย','#c8a0ff'],trig:['⚡','ทริกเกอร์','#ffd84a'],elem:['🔥','เปลี่ยนธาตุ','#ff9a5a'],hit:['💥','เมื่อโดน','#ff7ad0'],stat:['📊','ปรับค่า','#7dffa8'],rare:['✨','หายาก','#ffb0f0']};
const SGEC={fire:'#ff7a3a',ice:'#8fe0ff',zap:'#d8f4ff'},SGEL={fire:'mage',ice:'frost',zap:'bolt'},SGK=[0,1,3,4],SGLV=[20,45,70],SGRC=40,SGSC=120,SGSR=300,SGUC=[0,[2,60],[3,150]];
const sgCol=id=>SGEC[id]||SGCAT[SGD[id][3]][2];
let SGX=null,SGIN=0,SGTAB='',SGSEL=null,SGMSG=0;const SGLAST={},SGCK={},SGTH={},SGIC={},SGDT={acc:0,t:0},SGTO=[],SGTR=[],SGV=[],SGE=[],SGBURN={},SGLB={t:0,v:0},SGMI=[],SGCH={};
function sgSt(){const S=rnSt();if(!S.x||typeof S.x!=='object')S.x={i:{},l:{},g:0};S.x.i=S.x.i||{};S.x.l=S.x.l||{};S.x.v=S.x.v||{};if(!Array.isArray(S.x.sv))S.x.sv=[];return S.x}
function sgLv(id){return Math.max(1,Math.min(3,(sgSt().v[id]|0)||1))}
function sgQ(id){return 1+.2*(sgLv(id)-1)}
const SGRM=['','I','II','III'],sgStar=id=>'<span style="color:#ffd84a;letter-spacing:1px">'+'★'.repeat(sgLv(id))+'<span style="opacity:.3">'+'★'.repeat(3-sgLv(id))+'</span></span>';
function sgSockN(){if(!me.cls)return 0;const L=me.rb?999:me.lv|0;return L>=SGLV[2]?3:L>=SGLV[1]?2:L>=SGLV[0]?1:0}
function sgTags(k){return((SGT[me.cls]||{})[k]||'').split(' ').filter(Boolean)}
function sgOk(id,k){const d=SGD[id];if(!d)return false;const r=d[4];if(!r)return true;const T=sgTags(k);return r.split(' ').every(q=>q[0]==='!'?!T.includes(q.slice(1)):T.includes(q))}
function sgLinks(k){if(!me.cls||SGK.indexOf(k)<0)return[];const a=sgSt().l[k];if(!Array.isArray(a))return[];return a.slice(0,sgSockN()).filter(id=>id&&sgOk(id,k))}
function sgHas(k,id){return sgLinks(k).indexOf(id)>=0}
function sgMods(k){const o={mana:1,cd:1,pow:1};sgLinks(k).forEach(id=>{const m=SGD[id][5],qq=sgQ(id);for(const p in m){let v=m[p];if((id==='brut'||id==='blood')&&p==='pow')v=1+(v-1)*qq;else if(id==='haste'&&p==='cd')v=1-(1-v)*qq;o[p]*=v}});return o}
function sgUsed(id){const X=sgSt();let n=0;for(const k in X.l)(X.l[k]||[]).forEach(q=>{if(q===id)n++});return n}
function sgFree(id){return(sgSt().i[id]|0)-sgUsed(id)}
function sgOff(){try{return isArena()||!!(MAPS[curMap]&&MAPS[curMap].trial)}catch(e){return false}}
function sgMcL(k){if(!me.cls)return'';const L=sgLinks(k);if(!L.length)return mcOf(k)+' MP';const mo=sgMods(k);if(L.indexOf('blood')>=0)return'❤️'+Math.round(4*mo.mana)+'%';return Math.round(mcOf(k)*mo.mana)+' MP'}
function sgMsg(t){const n=performance.now();if(n-SGMSG<900)return;SGMSG=n;dn.push({x:me.x,y:me.y-44,v:t,t:.9,col:'#c8a0ff'})}
function sgFx(o){try{fx(o)}catch(e){}}
function sgNear(m,r,ex){return mons.filter(q=>q.hp>0&&!q.inv&&!q.pv&&q.t!==4&&!q.dum&&ex.indexOf(q.id)<0&&Math.hypot(q.x-m.x,q.y-m.y)<r).sort((a,b)=>Math.hypot(a.x-m.x,a.y-m.y)-Math.hypot(b.x-m.x,b.y-m.y))}
function sgFoe(x,y,r){let b=null,bd=r;for(const m of mons){if(m.hp<=0||m.inv||m.pv||m.t===4||m.dum)continue;const d=Math.hypot(m.x-x,m.y-y);if(d<bd){bd=d;b=m}}return b}
function sgAlly(k){const T=sgTags(k);return T.indexOf('heal')>=0||T.indexOf('buff')>=0||T.indexOf('self')>=0}
function sgPals(r){try{return Object.values(others).filter(o=>o&&inPty(o.u)&&Math.hypot(o.x-me.x,o.y-me.y)<r)}catch(e){return[]}}
function sgRec(k){const n=performance.now();SGLAST[k]=n}
/* ดาเมจนี้มาจากสกิลช่องไหน */
function sgSlot(ck,lv){if(SGX){if(ck){(SGCK[ck]=SGCK[ck]||{})[SGX.k]=1}return SGX.k}if(!ck||!lv||lv===2)return-1;const n=performance.now();let b=-1,bt=0;
  for(const k of SGK){const t=SGLAST[k];if(!t)continue;if(lv===1&&n-t<700&&t>bt){b=k;bt=t;continue}if(n-t<7000&&SGCK[ck]&&SGCK[ck][k]&&t>bt){b=k;bt=t}}
  if(b>=0&&lv===1&&n-SGLAST[b]<700&&ck)(SGCK[ck]=SGCK[ck]||{})[b]=1;return b}
/* ร่ายสำเนาที่ตำแหน่งอื่น (ย้ายตัวชั่วคราว แล้วคืนทุกอย่าง) */
let _sgU0=null;
function sgRaw(k,free,ctx){const p=SGX;SGX=ctx;try{_sgU0(k,free)}finally{SGX=p}}
function sgCastAt(k,x,y,pow,o){o=o||{};if(!me.cls||me.down>0||!_sgU0)return false;
  const sv={x:me.x,y:me.y,f:me.face,sk:me.sk[k],mp:me.mp,lk:lockId,st:me.stealth,shv:me.shv,sh:me.shield,d2:me.rnD2,sp:me.rnSpin,fc:me.freeC},away=!o.keep&&Math.hypot(x-me.x,y-me.y)>8;
  if(!o.keep){me.x=x;me.y=y;const t=sgFoe(x,y,420);if(t)me.face=Math.atan2(t.y-y,t.x-x)}
  me.sk[k]=0;lockId=o.lock!=null?o.lock:null;if(o.lock!=null){const t=mons.find(q=>q.id===o.lock);if(t)me.face=Math.atan2(t.y-me.y,t.x-me.x)}const dq=dqProg;dqProg=function(){};let ok=false;
  try{sgRaw(k,true,{k,pow,src:o.src||'copy'});ok=me.sk[k]>0}catch(e){console.warn('sgc',e)}
  finally{dqProg=dq;if(!o.keep){me.x=sv.x;me.y=sv.y;me.face=sv.f}me.sk[k]=sv.sk;me.mp=sv.mp;lockId=sv.lk;me.rnD2=sv.d2;me.freeC=sv.fc;if(away){me.stealth=sv.st;me.shv=sv.shv;me.shield=sv.sh;me.rnSpin=sv.sp}}
  return ok}
function sgChg(k,c){if(c<0)return;SGCH[k]=(SGCH[k]|0)+1;if(c===0){dn.push({x:me.x,y:me.y-70,v:'⏳💥 ปลดพลังสะสม!',t:1.2,col:'#ffb0f0'});sgFlash(me.x,me.y,'charge');try{shk=Math.max(shk,.18)}catch(e){}}else dn.push({x:me.x,y:me.y-62,v:'⏳ สะสม '+c+'/3',t:.8,col:'#ffb0f0'})}
function sgFlash(x,y,id){sgFx({k:'sgf',x:Math.round(x),y:Math.round(y),i:SGD[id][0],c:sgCol(id)})}
/* หลังร่ายจริงสำเร็จ: ร่ายซ้ำ / แยกร่าง / สายใยทีม */
function sgAfter(k,L,mo){const T=sgTags(k),ally=sgAlly(k);
  if(L.indexOf('split')>=0){let P=[];if(ally)P=sgPals(900).slice(0,2).map(o=>[o.x,o.y]);
    else{const F=mons.filter(m=>m.hp>0&&!m.inv&&!m.pv&&m.t!==4&&!m.dum&&Math.hypot(m.x-me.x,m.y-me.y)<440).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y));
      const used=[];for(const m of F.slice(1)){if(used.some(u=>Math.hypot(u[0]-m.x,u[1]-m.y)<60))continue;used.push([m.x,m.y]);if(used.length>=2)break}P=used.map(([x,y])=>{const a=Math.atan2(y-me.y,x-me.x);return[x-Math.cos(a)*26,y-Math.sin(a)*26]})}
    P.forEach(([x,y],i)=>setTimeout(()=>{if(sgCastAt(k,x,y,mo.pow*.5*sgQ('split'),{src:'split'}))sgFlash(x,y,'split')},90+i*90))}
  if(L.indexOf('party')>=0)sgPals(1000).forEach((o,i)=>setTimeout(()=>{const p=others[o.u]||o;if(sgCastAt(k,p.x,p.y,mo.pow*.6*sgQ('party'),{src:'party'}))sgFlash(p.x,p.y,'party')},150+i*110));
  if(L.indexOf('echo')>=0)setTimeout(()=>{if(!me.cls||me.down>0||sgOff())return;const mv=T.indexOf('move')>=0;if(sgCastAt(k,me.x,me.y,mo.pow*Math.min(.9,.6*sgQ('echo')),{src:'echo',keep:mv}))sgFlash(me.x,me.y,'echo')},400);
  if(L.indexOf('pierce')>=0){const F=mons.filter(m=>m.hp>0&&!m.inv&&!m.pv&&m.t!==4&&!m.dum&&Math.hypot(m.x-me.x,m.y-me.y)<380).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y));
    F.slice(1,3).forEach((m,i)=>setTimeout(()=>{if(m.hp>0&&sgCastAt(k,me.x,me.y,mo.pow*.6*sgQ('pierce'),{src:'pierce',lock:m.id}))sgFx({k:'sgl',p:[[me.x|0,(me.y-14)|0],[m.x|0,(m.y-12)|0]],c:'#ffb0f0'})},70+i*70))}
  if(L.indexOf('minion')>=0){for(let i=SGMI.length-1;i>=0;i--)if(SGMI[i].k===k){sgFx({k:'sgx',id:SGMI[i].id});SGMI.splice(i,1)}const id=uid+'m'+(++SGID);SGMI.push({id,k,t:12,nx:.7,pow:mo.pow*.35*sgQ('minion'),m:curMap,ph:Math.random()*6});sgFx({k:'sgm',id,o:uid,dur:12,c:(CL[me.cls]||{}).c||'#c8a0ff'})}
  if(L.indexOf('nova')>=0){const q=sgQ('nova'),el=L.indexOf('fire')>=0?'mage':L.indexOf('ice')>=0?'frost':L.indexOf('zap')>=0?'bolt':undefined,pw=mo.pow;setTimeout(()=>{if(!me.cls||me.down>0||sgOff())return;const v=pd()*1.6*q*pw;SGIN=1;try{mons.forEach(m=>{if(m.hp>0&&!m.inv&&!m.pv&&m.t!==4&&Math.hypot(m.x-me.x,m.y-me.y)<170+bigR(m))addHit(m,v,0,3,el)})}finally{SGIN=0}sgFx({k:'sgn',x:me.x|0,y:me.y|0,r:170,c:el==='mage'?'#ff9a5a':el==='frost'?'#8fe0ff':el==='bolt'?'#d8f4ff':'#ffd84a'})},500)}}
/* ทริกเกอร์ */
function sgTrig(type,m){if(!me.cls||me.down>0||SGX||sgOff()||!_sgU0)return;const n=performance.now();
  for(const k of SGK){if(!sgHas(k,type))continue;try{if(!skOpen(k))continue}catch(e){}const key=type+k;if(SGIC[key]>n)continue;
    const cd=cdOf(k),ic=type==='coc'?Math.max(1.5,cd*.5):type==='cok'?Math.max(1,cd*.4):Math.max(2,cd*.5);SGIC[key]=n+ic*1000;
    const self=type==='cwdt'||sgAlly(k)||!m,x=self?me.x:m.x,y=self?me.y:m.y,pw=(type==='coc'?.5:type==='cok'?.6:.8)*sgQ(type)*sgMods(k).pow;
    if(sgCastAt(k,x,y,pw,{src:type}))sgFlash(x,y,type)}}
/* ผลเมื่อโดน */
function sgOnHit(k,L,m,d,ck,kill,ah){const n=performance.now(),id=m.id,th=(nm,ms,bud)=>{const q=nm+k+':'+id;if(SGTH[q]>n)return false;if(bud){const B=SGTH['b'+nm+k]||(SGTH['b'+nm+k]={t:0,c:0});if(n-B.t>600){B.t=n;B.c=0}if(B.c>=bud)return false;B.c++}SGTH[q]=n+ms;return true};
  /* โซ่/กระจาย/ไฟฟ้า จำกัดจำนวนครั้งต่อการร่าย (สกิลวงกว้างจะได้ไม่คูณทวีเกินไป) */
  if(L.indexOf('fire')>=0&&th('f',500)){try{rxCC(m,'t',d*.12*sgQ('fire'),4)}catch(e){}SGBURN[id]=n+4000}
  if(L.indexOf('ice')>=0&&Math.random()<.2*sgQ('ice')&&th('i',1500)){try{rxCC(m,'f',0,1.2)}catch(e){}if(m.t<3)RXV[id]=Object.assign(RXV[id]||{},{frz:n+1200,u:uid})}
  if(L.indexOf('zap')>=0){RVUL[id]=n+3000;if(th('z',450,3)){const q=sgNear(m,170,[id])[0];if(q){ah(q,d*.3*sgQ('zap'),0,3,'bolt');sgFx({k:'sgz',p:[[m.x|0,(m.y-12)|0],[q.x|0,(q.y-12)|0]],c:SGEC.zap})}}}
  if(L.indexOf('chain')>=0&&th('c',350,2)){const hit=[id],pts=[[m.x|0,(m.y-12)|0]];let cur=m,f=.6*sgQ('chain');for(let j=0;j<2;j++){const q=sgNear(cur,240,hit)[0];if(!q)break;hit.push(q.id);ah(q,d*f,0,3,ck);pts.push([q.x|0,(q.y-12)|0]);cur=q;f=.4*sgQ('chain')}if(pts.length>1)sgFx({k:'sgz',p:pts,c:'#ff9ae0'})}
  if(L.indexOf('wide')>=0&&th('w',300,3)){const Q=sgNear(m,95,[id]).slice(0,8);Q.forEach(q=>ah(q,d*.45*sgQ('wide'),0,3,ck));sgFx({k:'sgw',x:m.x|0,y:m.y|0,r:95,c:'#ff7ad0'})}
  if(L.indexOf('burst')>=0&&kill&&!m.dum){const v=Math.min((m.mh||0)*.15*sgQ('burst'),pd()*6*sgQ('burst'));if(v>0){sgNear(m,115,[id]).slice(0,10).forEach(q=>ah(q,v,0,3,ck));sgFx({k:'sgb',x:m.x|0,y:m.y|0,r:115})}}
  if(L.indexOf('leech')>=0&&me.down<=0){if(n-SGLB.t>1000){SGLB.t=n;SGLB.v=0}const cap=me.mh*.08,h=Math.min(d*.03*sgQ('leech'),Math.max(0,cap-SGLB.v));if(h>0){SGLB.v+=h;me.hp=Math.min(me.mh,me.hp+h)}me.mp=Math.min(me.mm,me.mp+d*.005)}
  if(L.indexOf('pierce')>=0&&th('p',300,4)){const ax=me.x,ay=me.y-10,bx=m.x,by=m.y-10,dx=bx-ax,dy=by-ay,LL=dx*dx+dy*dy||1;mons.forEach(q=>{if(q===m||q.hp<=0||q.inv||q.pv||q.t===4||q.dum)return;const u=((q.x-ax)*dx+(q.y-10-ay)*dy)/LL;if(u<.05||u>1)return;if(Math.hypot(ax+dx*u-q.x,ay+dy*u-q.y+10)<26+bigR(q)*.5)ah(q,d*.4*sgQ('pierce'),0,3,ck)})}}
/* ทอเท็ม/กับดัก */
let SGID=0;
function sgPlace(k,L,mo){const kind=L.indexOf('totem')>=0?'totem':'trap',c=(CL[me.cls]||{}).c||'#c8a0ff';
  if(kind==='totem'){for(let i=SGTO.length-1;i>=0;i--)if(SGTO[i].k===k){sgFx({k:'sgx',id:SGTO[i].id});SGTO.splice(i,1)}
    const a=me.face||0,x=Math.round(me.x+Math.cos(a)*34),y=Math.round(me.y+Math.sin(a)*20+6),id=uid+'t'+(++SGID);SGTO.push({id,k,x,y,t:9,nx:.35,pow:mo.pow*.45*sgQ('totem'),m:curMap});sgFx({k:'sgt',id,x,y,dur:9,c,i:SGD.totem[0]})}
  else{const t=sgFoe(me.x,me.y,340),a=me.face||0;const pts=[[t?t.x:me.x+Math.cos(a)*120,t?t.y:me.y+Math.sin(a)*120]];
    if(L.indexOf('split')>=0)mons.filter(m=>m.hp>0&&!m.inv&&!m.pv&&m.t!==4&&!m.dum&&m!==t&&Math.hypot(m.x-me.x,m.y-me.y)<420).slice(0,2).forEach(m=>pts.push([m.x,m.y]));
    pts.forEach(([x,y],i)=>{const mine=SGTR.filter(q=>q.k===k);if(mine.length>=3+(pts.length-1)){const o=mine[0];sgFx({k:'sgx',id:o.id});SGTR.splice(SGTR.indexOf(o),1)}
      x=Math.round(cl(x,20,WW-20));y=Math.round(cl(y,20,WH-20));const id=uid+'p'+(++SGID);SGTR.push({id,k,x,y,t:20,arm:.45+i*.1,pow:mo.pow*(i?.85:1.3)*sgQ('trap'),m:curMap});sgFx({k:'sgp',id,x,y,sx:Math.round(me.x),sy:Math.round(me.y-20),dur:20,c})})}}
function sgTick(dt){if(!me.cls)return;const n=performance.now();
  for(let i=SGTO.length-1;i>=0;i--){const T=SGTO[i];T.t-=dt;T.nx-=dt;if(T.t<=0||curMap!==T.m){SGTO.splice(i,1);continue}
    if(T.nx<=0){T.nx=Math.max(1.8,cdOf(T.k)*.45);if(sgAlly(T.k)||sgFoe(T.x,T.y,320))if(sgCastAt(T.k,T.x,T.y,T.pow,{src:'totem'}))T.pl=n}}
  for(let i=SGTR.length-1;i>=0;i--){const T=SGTR[i];T.t-=dt;T.arm-=dt;if(T.t<=0||curMap!==T.m){sgFx({k:'sgx',id:T.id});SGTR.splice(i,1);continue}
    if(T.arm<=0){const f=sgFoe(T.x,T.y,72);if(f||sgAlly(T.k)&&T.t<19){SGTR.splice(i,1);sgFx({k:'sgx',id:T.id,b:1});sgCastAt(T.k,T.x,T.y,T.pow,{src:'trap'})}}}
  for(let i=SGMI.length-1;i>=0;i--){const M2=SGMI[i];M2.t-=dt;M2.nx-=dt;if(M2.t<=0||curMap!==M2.m||me.down>0){SGMI.splice(i,1);continue}
    if(M2.nx<=0){const[px,py]=sgMiPos(me.x,me.y,n/1000,M2.ph),f=sgAlly(M2.k)?null:sgFoe(px,py,300);M2.nx=f||sgAlly(M2.k)?Math.max(2,cdOf(M2.k)*.5):.4;if(f||sgAlly(M2.k))sgCastAt(M2.k,px,py,M2.pow,{src:'minion'})}}
  if(SGDT.acc>0)SGDT.acc=Math.max(0,SGDT.acc-me.mh*.02*dt);
  /* ปุ่มสกิล: วงรูนเสริม */
  if(n-SGDT.t>500){SGDT.t=n;for(const k of SGK){const e=$('s'+k);if(!e)continue;const v=String(sgOff()?0:sgLinks(k).length);if((e.dataset.sgn||'0')!==v){if(v!=='0')e.dataset.sgn=v;else delete e.dataset.sgn}}
    const X=sgSt();if(!X.g&&sgSockN()>=1){X.g=1;const pick=c=>{const L=Object.keys(SGD).filter(id=>SGD[id][3]===c);return L[Math.random()*L.length|0]};['cast','elem','hit'].forEach(c=>{const id=pick(c);X.i[id]=(X.i[id]|0)+1});
      banner={s:'🔗 ปลดช่องรูนเสริมแล้ว! ได้รูนเสริมฟรี 3 อัน — ไปหาช่างรูนไอริสที่ค่าย',t:6};try{sysMsg('🔗 ช่องลิงก์สกิลเปิดแล้ว (ช่องที่ 2 ที่ Lv '+SGLV[1]+' · ช่องที่ 3 ที่ Lv '+SGLV[2]+') · ได้รูนเสริมเริ่มต้น 3 อัน ใส่ได้ที่ช่างรูนไอริสในค่าย')}catch(e){}}}}
function sgPick(rc){const rare=Math.random()<rc,L=Object.keys(SGD).filter(q=>(SGD[q][3]==='rare')===rare);return L[Math.random()*L.length|0]}
function sgGive(id,why){if(!me.cls)return;const X=sgSt();if(!id)id=sgPick(why==='บอส MVP'?.3:.06);X.i[id]=(X.i[id]|0)+1;
  banner={s:(SGD[id][3]==='rare'?'✨ ได้รูนเสริมหายาก «':'🔗 ได้รูนเสริม «')+SGD[id][0]+' '+SGD[id][1]+'»'+(why?' · '+why:''),t:SGD[id][3]==='rare'?6:4};try{sysMsg('🔗 ได้รูนเสริม '+SGD[id][0]+' '+SGD[id][1]+' — ใส่ลิงก์สกิลได้ที่ช่างรูนไอริสในค่าย')}catch(e){}
  try{burst(me.x,me.y-24,[sgCol(id),'#ffffff','#c8a0ff'],22,130,.7,{glow:1,g:-30})}catch(e){}try{sfx('lg_get')}catch(e){}}
function sgMiPos(x,y,t,ph){return[x+Math.cos(t*1.7+ph)*36,y-38+Math.sin(t*1.7+ph)*12]}
/* ---------- ภาพ ---------- */
function sgDrawW(){const n=performance.now(),t=n/1000;
  for(let i=SGV.length-1;i>=0;i--){const v=SGV[i];if(n>v.end+400){SGV.splice(i,1);continue}if(v.k==='mi'){const ow=v.o===uid?me:others[v.o];if(!ow){continue}const P=sgMiPos(ow.x,ow.y,t,v.ph||0);v.x=P[0];v.y=P[1]}if(v.x<cam.x-80||v.x>cam.x+W+80||v.y<cam.y-120||v.y>cam.y+H+60)continue;
    const fi=Math.min(1,(n-v.t0)/250),fo=Math.min(1,Math.max(0,(v.end-n)/400)),A=fi*fo,rgb=h2r(v.c||'#c8a0ff');g.save();g.globalAlpha=A;
    if(v.k==='to'){const x=v.x,y=v.y,pu=.6+.4*Math.sin(t*4+x);g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(x,y+2,20,7,0,0,7);g.fill();
      g.save();g.translate(x,y);g.scale(1,.42);g.rotate(t*.8);g.setLineDash([6,7]);g.strokeStyle='rgba('+rgb+','+(.55*pu)+')';g.lineWidth=2.4;g.beginPath();g.arc(0,0,34,0,7);g.stroke();g.setLineDash([]);g.restore();
      const rise=Math.min(1,(n-v.t0)/300),hgt=50*rise;g.fillStyle='#2c2838';g.strokeStyle='#100c18';g.lineWidth=1.2;g.beginPath();g.moveTo(x-10,y);g.lineTo(x-8,y-hgt);g.lineTo(x,y-hgt-8);g.lineTo(x+8,y-hgt);g.lineTo(x+10,y);g.closePath();g.fill();g.stroke();
      g.fillStyle='#3e3a50';g.beginPath();g.moveTo(x-10,y);g.lineTo(x-8,y-hgt);g.lineTo(x,y-hgt-8);g.lineTo(x-1,y);g.closePath();g.fill();
      g.strokeStyle='rgba('+rgb+','+(.6+.4*pu)+')';g.lineWidth=1.4;for(let j=0;j<3;j++){const yy=y-hgt*(.25+j*.24);g.beginPath();g.moveTo(x-5,yy);g.lineTo(x,yy-4);g.lineTo(x+5,yy);g.stroke()}
      const ty=y-hgt-20-Math.sin(t*2.4+x)*3;glowAt(x,ty,26,rgb,.35+.25*pu);g.save();g.translate(x,ty);g.rotate(Math.PI/4+t*1.2);g.fillStyle='rgba('+rgb+',.95)';g.fillRect(-5,-5,10,10);g.strokeStyle='#fff';g.lineWidth=1;g.strokeRect(-5,-5,10,10);g.restore();
      if(v.pl&&n-v.pl<300){const q=(n-v.pl)/300;g.strokeStyle='rgba('+rgb+','+(1-q)+')';g.lineWidth=3;g.beginPath();g.ellipse(x,y,20+q*60,(20+q*60)*.42,0,0,7);g.stroke()}}
    else if(v.k==='mi'){const x=v.x,y=v.y,b=Math.sin(t*5+x)*2;glowAt(x,y,30,rgb,.45);for(let j=0;j<4;j++){const q=(t*1.5+j/4)%1;g.fillStyle='rgba('+rgb+','+(.5*(1-q))+')';g.beginPath();g.arc(x-Math.cos(t*1.7+(v.ph||0))*q*14,y+6+q*16,3.5*(1-q)+1,0,7);g.fill()}
      g.fillStyle='rgba(235,240,255,.88)';g.beginPath();g.moveTo(x-9,y+2+b);g.quadraticCurveTo(x-10,y-12+b,x,y-13+b);g.quadraticCurveTo(x+10,y-12+b,x+9,y+2+b);g.quadraticCurveTo(x+5,y+12+b,x+1,y+8+b);g.quadraticCurveTo(x-3,y+13+b,x-9,y+2+b);g.fill();
      g.strokeStyle='rgba('+rgb+',.9)';g.lineWidth=1.4;g.stroke();g.fillStyle='#1a1430';g.beginPath();g.ellipse(x-3.2,y-4+b,1.6,2.3,0,0,7);g.ellipse(x+3.2,y-4+b,1.6,2.3,0,0,7);g.fill()}
    else if(v.k==='tr'){const x=v.x,y=v.y,fly=Math.min(1,(n-v.t0)/280);if(fly<1&&v.sx!==undefined){const px=v.sx+(x-v.sx)*fly,py=v.sy+(y-v.sy)*fly-Math.sin(fly*Math.PI)*60;g.fillStyle='rgba('+rgb+',.95)';g.beginPath();g.arc(px,py,4,0,7);g.fill();glowAt(px,py,14,rgb,.5);g.restore();continue}
      const arm=n-v.t0>450,pu=arm?.65+.35*Math.sin(t*6+x):.3;g.save();g.translate(x,y);g.scale(1,.45);g.fillStyle='rgba(10,8,16,.55)';g.beginPath();g.arc(0,0,24,0,7);g.fill();
      g.strokeStyle='rgba('+rgb+','+pu+')';g.lineWidth=2.6;g.beginPath();g.arc(0,0,24,0,7);g.stroke();g.lineWidth=1.4;g.rotate(-t*1.6);for(let j=0;j<6;j++){const a=j*1.047;g.beginPath();g.moveTo(Math.cos(a)*12,Math.sin(a)*12);g.lineTo(Math.cos(a+.5)*20,Math.sin(a+.5)*20);g.stroke()}g.restore();
      if(arm)glowAt(x,y,30,rgb,.18+.12*pu);g.fillStyle='#d8d0e8';g.strokeStyle='#1a1424';g.lineWidth=1;for(let j=0;j<4;j++){const a=j*1.5708+.785,sx=x+Math.cos(a)*14,sy=y+Math.sin(a)*6;g.beginPath();g.moveTo(sx-3,sy);g.lineTo(sx,sy-(arm?9:4));g.lineTo(sx+3,sy);g.closePath();g.fill();g.stroke()}}
    g.restore()}
  for(let i=SGE.length-1;i>=0;i--){const e=SGE[i],q=(n-e.t0)/e.d;if(q>=1){SGE.splice(i,1);continue}const rgb=h2r(e.c||'#ffffff');g.save();g.globalCompositeOperation='lighter';
    if(e.k==='z'){const P=e.p;for(let pass=0;pass<2;pass++){g.strokeStyle=pass?'rgba(255,255,255,'+(1-q)+')':'rgba('+rgb+','+(.75*(1-q))+')';g.lineWidth=pass?1.4:4;g.beginPath();for(let j=0;j<P.length-1;j++){const[a,b]=P[j],[c2,d2]=P[j+1];if(!j)g.moveTo(a,b);const N=5;for(let s=1;s<=N;s++){const u=s/N,jx=s<N?(Math.sin(e.sd+j*7+s*3.1+n*.02)*9):0,jy=s<N?(Math.cos(e.sd+j*5+s*2.3+n*.02)*9):0;g.lineTo(a+(c2-a)*u+jx,b+(d2-b)*u+jy)}}g.stroke()}
      P.forEach(([a,b])=>glowAt(a,b,18,rgb,.4*(1-q)))}
    else if(e.k==='l'){const[a,b]=e.p[0],[c2,d2]=e.p[1],gr=g.createLinearGradient(a,b,c2,d2);gr.addColorStop(0,'rgba('+rgb+',0)');gr.addColorStop(1,'rgba('+rgb+','+(1-q)+')');g.strokeStyle=gr;g.lineWidth=5*(1-q)+1;g.beginPath();g.moveTo(a,b);g.lineTo(c2,d2);g.stroke();g.strokeStyle='rgba(255,255,255,'+(1-q)+')';g.lineWidth=1.2;g.stroke()}
    else if(e.k==='n'){const r=e.r*(.25+.75*Math.sqrt(q));glowAt(e.x,e.y-8,r,rgb,.35*(1-q));g.strokeStyle='rgba('+rgb+','+(1-q)+')';g.lineWidth=6*(1-q)+1;g.beginPath();g.ellipse(e.x,e.y,r,r*.5,0,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,'+(.8*(1-q))+')';g.lineWidth=1.5;g.beginPath();g.ellipse(e.x,e.y,r*.92,r*.46,0,0,7);g.stroke()}
    else if(e.k==='w'){g.strokeStyle='rgba('+rgb+','+(.8*(1-q))+')';g.lineWidth=3*(1-q)+1;g.beginPath();g.ellipse(e.x,e.y,e.r*(.3+.7*q),e.r*(.3+.7*q)*.5,0,0,7);g.stroke()}
    else if(e.k==='b'){glowAt(e.x,e.y-10,e.r*(.5+q),'255,150,70',.55*(1-q));g.strokeStyle='rgba(255,210,140,'+(1-q)+')';g.lineWidth=4*(1-q)+1;g.beginPath();g.ellipse(e.x,e.y,e.r*q,e.r*q*.5,0,0,7);g.stroke()}
    else if(e.k==='f'){g.globalCompositeOperation='source-over';const y=e.y-38-q*26;g.globalAlpha=Math.min(1,(1-q)*2);g.save();g.translate(e.x,y);g.rotate(Math.PI/4);g.strokeStyle=e.c;g.lineWidth=2;g.strokeRect(-11,-11,22,22);g.fillStyle='rgba(20,12,30,.75)';g.fillRect(-10,-10,20,20);g.restore();
      g.font='14px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(e.i||'',e.x,y+1)}
    g.restore()}
  /* มอนติดไฟจากรูนธาตุไฟ */
  for(const m of mons){const b=SGBURN[m.id];if(!b)continue;if(b<n||m.hp<=0){delete SGBURN[m.id];continue}if(m.x<cam.x-30||m.x>cam.x+W+30||m.y<cam.y-60||m.y>cam.y+H+30)continue;const r=(MT[m.t]&&mR(m))||12;
    g.save();g.globalCompositeOperation='lighter';for(let j=0;j<3;j++){const ph=(t*2.2+j/3+m.id*.37)%1,fx2=m.x+Math.sin(j*2.1+m.id)*r*.6,fy=m.y-r*.4-ph*r*1.4;g.fillStyle='rgba(255,'+(120+80*(1-ph)|0)+',40,'+(.65*(1-ph))+')';g.beginPath();g.ellipse(fx2,fy,3.5*(1-ph)+1.5,6*(1-ph)+2,0,0,7);g.fill()}g.restore()}}
/* ---------- รับ fx (ทุกเครื่องเห็นทอเท็ม/กับดัก/โซ่) ---------- */
function sgRecv(o){const n=performance.now();
  if(o.k==='sgt'||o.k==='sgp'){SGV.push({k:o.k==='sgt'?'to':'tr',id:o.id,x:+o.x,y:+o.y,sx:o.sx===undefined?undefined:+o.sx,sy:o.sy===undefined?undefined:+o.sy,c:o.c,t0:n,end:n+(+o.dur||9)*1000});if(SGV.length>40)SGV.shift();return}
  if(o.k==='sgx'){const v=SGV.find(q=>q.id===o.id);if(v){v.end=Math.min(v.end,n);if(o.b){SGE.push({k:'b',x:v.x,y:v.y,r:70,t0:n,d:450});try{spark(v.x,v.y-6,v.c||'#c8a0ff',12,160,.45)}catch(e){}}}return}
  if(o.k==='sgz'&&Array.isArray(o.p)){SGE.push({k:'z',p:o.p.slice(0,6).map(q=>[+q[0],+q[1]]),c:o.c,t0:n,d:450,sd:Math.random()*99});return}
  if(o.k==='sgm'){SGV.push({k:'mi',id:o.id,o:String(o.o||o.by||''),ph:Math.random()*6,c:o.c,t0:n,end:n+(+o.dur||12)*1000,x:0,y:0});return}
  if(o.k==='sgl'&&Array.isArray(o.p)&&o.p.length>1){SGE.push({k:'l',p:[[+o.p[0][0],+o.p[0][1]],[+o.p[1][0],+o.p[1][1]]],c:o.c,t0:n,d:260});return}
  if(o.k==='sgn'){SGE.push({k:'n',x:+o.x,y:+o.y,r:+o.r||170,c:o.c||'#ffd84a',t0:n,d:520});try{if(Math.hypot(me.x-o.x,me.y-o.y)<380)shk=Math.max(shk,.12)}catch(e){}return}
  if(o.k==='sgw'){SGE.push({k:'w',x:+o.x,y:+o.y,r:+o.r||90,c:o.c,t0:n,d:380});return}
  if(o.k==='sgb'){SGE.push({k:'b',x:+o.x,y:+o.y,r:+o.r||110,t0:n,d:500});try{spark(+o.x,+o.y-8,'#ffb060',14,200,.5);if(Math.hypot(me.x-o.x,me.y-o.y)<380)shk=Math.max(shk,.1)}catch(e){}return}
  if(o.k==='sgf'){SGE.push({k:'f',x:+o.x,y:+o.y,i:String(o.i||'').slice(0,4),c:o.c||'#c8a0ff',t0:n,d:700});if(SGE.length>60)SGE.splice(0,SGE.length-60);return}}
/* ---------- หน้าจอช่างรูน: แท็บรูนเสริม ---------- */
function sgCSS(){if($('sgcss'))return;const s=document.createElement('style');s.id='sgcss';s.textContent=
 '.sgtabs{display:flex;gap:6px;margin:4px 0 8px}.sgtabs button{flex:1;padding:8px 4px!important;font-size:13px!important;border-radius:10px!important;opacity:.7}.sgtabs button.on{opacity:1;background:linear-gradient(#5a3a8a,#3a2460)!important;border-color:#c8a0ff!important;color:#fff!important}'+
 '.sgsk{text-align:left;padding:9px 10px!important}.sgsk .hd{display:flex;align-items:center;gap:8px}.sgsk .hd b{font-size:14px}.sgsk .tg{display:flex;flex-wrap:wrap;gap:3px;margin-top:3px}.sgsk .tg i{font-style:normal;font-size:10px;padding:1px 6px;border-radius:8px;background:rgba(200,160,255,.16);color:#d8c8ff}'+
 '.sgso{display:flex;align-items:center;gap:0;margin:9px 0 4px}.sgso .ln{flex:0 0 14px;height:4px;background:linear-gradient(90deg,#6a4a9a,#c8a0ff);border-radius:2px;opacity:.85}.sgso .ln.off{background:rgba(255,255,255,.12)}'+
 '.sgs{flex:1;min-width:0;display:flex;align-items:center;gap:6px;padding:6px 7px!important;border-radius:12px!important;font-size:11.5px!important;text-align:left;line-height:1.2;border:1.5px dashed rgba(200,160,255,.5)!important;background:rgba(40,24,64,.55)!important;color:#e8deff!important}'+
 '.sgs.full{border-style:solid!important}.sgs.sel{box-shadow:0 0 0 2px #ffd84a}.sgs.lk{opacity:.45;border-color:rgba(255,255,255,.2)!important}.sgs .gi{font-size:18px;flex:0 0 auto}.sgs small{display:block;opacity:.75;font-size:9.5px}'+
 '.sgmd{font-size:11px;opacity:.9;margin-top:3px}.sgmd b{color:#ffd84a}.sgpk{margin-top:6px;padding:6px;border-radius:10px;background:rgba(0,0,0,.25)}.sgpk .it{display:flex;align-items:center;gap:8px;padding:6px 4px;border-bottom:1px solid rgba(255,255,255,.07);text-align:left}'+
 '.sgpk .it:last-child{border-bottom:0}.sgpk .it .gi{font-size:20px;width:26px;text-align:center}.sgpk .it .tx{flex:1;font-size:11.5px;line-height:1.3}.sgpk .it .tx b{font-size:12.5px}.sgpk .it.no{opacity:.45}.sgpk .it button{font-size:11.5px!important;padding:5px 9px!important}'+
 '.sgcat{font-size:12px;font-weight:800;margin:10px 2px 4px;text-align:left}.sgbag .it{display:flex;align-items:center;gap:8px;padding:7px 8px;margin:4px 0;border-radius:10px;background:rgba(255,255,255,.05);text-align:left;border-left:4px solid}'+
 '.sgbag .it .gi{font-size:20px;width:26px;text-align:center}.sgbag .it .tx{flex:1;font-size:11.5px;line-height:1.3}.sgbag .it .n{font-weight:800;color:#ffd84a;font-size:12px;white-space:nowrap}.sgbag .it button{font-size:11px!important;padding:4px 8px!important}'+
 '#sk button[data-sgn]{outline:2px solid rgba(200,160,255,.6);outline-offset:-1px}#sk button[data-sgn="2"]{outline-color:rgba(220,170,255,.85);outline-width:2.5px}#sk button[data-sgn="3"]{outline:2.5px solid #ffd84a;box-shadow:0 0 10px rgba(255,216,74,.55)}';
 document.head.appendChild(s)}
function sgTabBar(cur){return'<div class="sgtabs"><button data-sgtab=""'+(cur?'':' class="on"')+'>💠 รูนหลัก</button><button data-sgtab="sup"'+(cur?' class="on"':'')+'>🔗 รูนเสริม · ลิงก์</button></div>'}
function sgModsTxt(k){const o=sgMods(k),L=sgLinks(k),f=v=>'×'+(Math.round(v*100)/100);if(!L.length)return'';const P=[];if(L.indexOf('blood')>=0)P.push('ใช้ ❤️ '+Math.round(4*o.mana)+'% แทนมานา');else if(o.mana!==1)P.push('มานา <b>'+f(o.mana)+'</b>');if(o.cd!==1)P.push('คูลดาวน์ <b>'+f(o.cd)+'</b>');if(o.pow!==1)P.push('พลัง <b>'+f(o.pow)+'</b>');return P.length?'<div class="sgmd">'+P.join(' · ')+'</div>':''}
function sgUI(msg){if(!me.cls)return;sgCSS();ov.dataset.k='rune';const S=rnSt(),X=sgSt(),N=sgSockN(),inCamp=curMap===1;
  let h='<div class="pn" data-pn="rune">'+hdr('🔗','ช่างรูน ไอริส · รูนเสริม','ผงรูน 💠 '+(S.sh|0)+' · ช่องลิงก์ '+N+'/3')+sgTabBar('sup');if(msg)h+='<div class="note">'+msg+'</div>';
  h+='<div class="card" style="font-size:12px;line-height:1.55;text-align:left">🔗 ใส่รูนเสริมลงช่องลิงก์ของสกิล รูนแต่ละอันเปลี่ยนวิธีทำงานของสกิล ผสมกันได้อิสระแบบ Path of Exile<br>🔓 ช่องที่ 1/2/3 ปลดที่ Lv '+SGLV.join('/')+' (จุติแล้วเปิดครบ) · ทุกอันมีราคา มานา/คูลดาวน์/พลัง<br>'+(inCamp?'':'⚠️ เปลี่ยนรูนเสริมได้ที่ค่ายเท่านั้น<br>')+'⚔️ ปิดผลในลานประลอง PvP</div>';
  h+=sgSetsCard(true);
  SGK.forEach(k=>{let open=true;try{open=skOpen(k)}catch(e){}const T=sgTags(k),A=X.l[k]||[];
    h+='<div class="card sgsk"><div class="hd">'+skImg(me.cls,k,28)+'<div style="flex:1"><b>'+skName(k)+'</b>'+(open?'':' <small style="opacity:.7">(ยังไม่ปลดสกิล)</small>')+'<div class="tg">'+T.map(t=>'<i>'+(SGTN[t]||t)+'</i>').join('')+'</div></div></div><div class="sgso">';
    for(let i=0;i<3;i++){const id=A[i],lk=i>=N,sel=SGSEL&&SGSEL.k===k&&SGSEL.i===i,bad=id&&!sgOk(id,k);if(i)h+='<span class="ln'+(lk||!id||!A[i-1]?' off':'')+'"></span>';
      h+='<button class="sgs'+(id?' full':'')+(sel?' sel':'')+(lk?' lk':'')+'" data-sgs="'+k+':'+i+'"'+(lk||!inCamp?' disabled':'')+' style="'+(id?'border-color:'+sgCol(id)+'!important':'')+'">'+(lk?'<span class="gi">🔒</span><span>Lv '+SGLV[i]+'</span>':id?'<span class="gi">'+SGD[id][0]+'</span><span>'+SGD[id][1]+(sgLv(id)>1?' '+SGRM[sgLv(id)]:'')+(bad?'<small>⚠️ ใช้กับสกิลนี้ไม่ได้</small>':'<small>แตะเพื่อถอด</small>')+'</span>':'<span class="gi" style="opacity:.6">➕</span><span>ว่าง<small>แตะเพื่อใส่</small></span>')+'</button>'}
    h+='</div>'+sgModsTxt(k);
    if(SGSEL&&SGSEL.k===k){const L=Object.keys(SGD).filter(id=>(X.i[id]|0)>0);h+='<div class="sgpk"><div style="font-size:11.5px;opacity:.85;margin-bottom:3px;text-align:left">เลือกรูนเสริมใส่ช่องที่ '+(SGSEL.i+1)+'</div>';
      if(!L.length)h+='<div style="font-size:12px;opacity:.8;padding:6px">ยังไม่มีรูนเสริม — สร้างได้ด้านล่าง หรือหาจากบอส/ดันเจี้ยน/หัวหน้ามอน</div>';
      L.forEach(id=>{const ok=sgOk(id,k),fr=sgFree(id),dup=A.indexOf(id)>=0,can=ok&&fr>0&&!dup;h+='<div class="it'+(can?'':' no')+'"><span class="gi">'+SGD[id][0]+'</span><div class="tx"><b style="color:'+sgCol(id)+'">'+SGD[id][1]+'</b> '+sgStar(id)+' <small>×'+fr+' ว่าง</small><br>'+SGD[id][2]+(ok?'':'<br><small>❌ ต้องการแท็ก: '+SGD[id][4].split(' ').map(q=>q[0]==='!'?'ไม่ใช่'+(SGTN[q.slice(1)]||q):(SGTN[q]||q)).join(', ')+'</small>')+(dup?'<br><small>❌ ใส่ซ้ำในสกิลเดียวกันไม่ได้</small>':'')+'</div>'+(can?'<button class="pri" data-sgp="'+id+'">ใส่</button>':'')+'</div>'});
      h+='<div style="text-align:right;margin-top:4px"><button data-sgc="1">ปิด</button></div></div>'}
    h+='</div>'});
  h+='<div class="card"><div style="display:flex;gap:6px;align-items:center;text-align:left"><div style="flex:1;font-size:12px"><b>🎲 สร้างรูนเสริมแบบสุ่ม</b><br><small>ได้ 1 อันจากทั้งหมด '+Object.keys(SGD).length+' แบบ · โอกาสได้รูนหายาก ✨ 6%</small></div><button class="pri" data-sgr="1"'+((S.sh|0)>=SGRC?'':' disabled')+'>สุ่ม<br><small>💠'+SGRC+'</small></button></div></div>';
  h+='<div class="sgbag">';Object.keys(SGCAT).forEach(c=>{const C=SGCAT[c];h+='<div class="sgcat" style="color:'+C[2]+'">'+C[0]+' '+C[1]+'</div>';
    Object.keys(SGD).filter(id=>SGD[id][3]===c).forEach(id=>{const D=SGD[id],own=X.i[id]|0,col=sgCol(id),m=D[5],cost=[];if(m.mana)cost.push('มานา ×'+m.mana);if(m.cd)cost.push('คูลดาวน์ ×'+m.cd);if(m.pow)cost.push('พลัง ×'+m.pow);
      h+='<div class="it" style="border-left-color:'+col+(own?'':';opacity:.78')+'"><span class="gi">'+D[0]+'</span><div class="tx"><b style="color:'+col+'">'+D[1]+'</b>'+(own?' '+sgStar(id)+(sgLv(id)>1?' <small style="color:#ffd84a">ผล +'+(sgLv(id)-1)*20+'%</small>':''):'')+'<br>'+D[2]+(cost.length?'<br><small style="opacity:.75">ราคา: '+cost.join(' · ')+'</small>':'')+(D[4]?'<br><small style="opacity:.6">ต้องการ: '+D[4].split(' ').map(q=>q[0]==='!'?'ไม่ใช่'+(SGTN[q.slice(1)]||q):(SGTN[q]||q)).join(', ')+'</small>':'')+'</div><div style="text-align:right"><div class="n">×'+own+'</div>'+sgUpBtn(id)+'<button data-sgb="'+id+'"'+((S.sh|0)>=(D[3]==='rare'?SGSR:SGSC)?'':' disabled')+'>สร้าง<br><small>💠'+(D[3]==='rare'?SGSR:SGSC)+'</small></button></div></div>'})});
  h+='</div><div class="card hint" style="font-size:11.5px;opacity:.85">💡 ลองคอมโบ: ทอเท็ม + ร่ายซ้ำ · กับดัก + แยกร่าง · เจ็บแล้วร่าย + โทสะ · ธาตุไฟ + เพื่อนธาตุน้ำแข็ง = ไอน้ำระเบิด</div></div>';
  ov.innerHTML=h;ov.hidden=false;
  ov.querySelectorAll('[data-sgtab]').forEach(b=>b.onclick=()=>{SGTAB=b.dataset.sgtab;SGSEL=null;runeUI()});
  ov.querySelectorAll('[data-sgs]').forEach(b=>b.onclick=()=>{if(curMap!==1)return;const[k,i]=b.dataset.sgs.split(':').map(Number),A=X.l[k]=X.l[k]||[];if(A[i]){const id=A[i];A.splice(i,1);SGSEL=null;X.cur=-1;try{sfx('equip')}catch(e){}sgUI('ถอด «'+SGD[id][1]+'» แล้ว')}else{SGSEL=SGSEL&&SGSEL.k===k&&SGSEL.i===i?null:{k,i:Math.min(i,A.length)};sgUI()}});
  ov.querySelectorAll('[data-sgp]').forEach(b=>b.onclick=()=>{if(!SGSEL||curMap!==1)return;const id=b.dataset.sgp,k=SGSEL.k,A=X.l[k]=X.l[k]||[];if(!sgOk(id,k)||sgFree(id)<=0||A.indexOf(id)>=0)return;A.splice(Math.min(SGSEL.i,A.length),0,id);if(A.length>3)A.length=3;SGSEL=null;X.cur=-1;try{sfx('equip')}catch(e){}try{burst(me.x,me.y-20,[sgCol(id),'#ffffff'],14,110,.5,{glow:1,g:-30})}catch(e){}sgUI('ลิงก์ «'+SGD[id][0]+' '+SGD[id][1]+'» เข้ากับ '+skName(k)+' แล้ว — ลองใช้สกิลได้เลย')});
  ov.querySelectorAll('[data-sgc]').forEach(b=>b.onclick=()=>{SGSEL=null;sgUI()});
  ov.querySelectorAll('[data-sgu]').forEach(b=>b.onclick=()=>{const id=b.dataset.sgu,r=sgUpOk(id);if(!r.ok)return;X.i[id]-=r.n;S.sh-=r.sh;X.v[id]=sgLv(id)+1;try{sfx('up')}catch(e){}try{burst(me.x,me.y-20,['#ffd84a',sgCol(id),'#ffffff'],30,140,.8,{glow:1,g:-30})}catch(e){}sgUI('⬆️ «'+SGD[id][0]+' '+SGD[id][1]+'» ขึ้นขั้น '+SGRM[sgLv(id)]+' แล้ว! ผลรูน +'+(sgLv(id)-1)*20+'%')});
  sgSetsBind(m=>sgUI(m));
  ov.querySelectorAll('[data-sgr]').forEach(b=>b.onclick=()=>{if((S.sh|0)<SGRC)return;S.sh-=SGRC;const id=sgPick(.06);X.i[id]=(X.i[id]|0)+1;try{sfx('lg_get')}catch(e){}sgUI((SGD[id][3]==='rare'?'✨ โชคดี! ได้รูนหายาก «':'🎲 ได้ «')+SGD[id][0]+' '+SGD[id][1]+'»!')});
  ov.querySelectorAll('[data-sgb]').forEach(b=>b.onclick=()=>{const id=b.dataset.sgb,cs=SGD[id][3]==='rare'?SGSR:SGSC;if((S.sh|0)<cs)return;S.sh-=cs;X.i[id]=(X.i[id]|0)+1;try{sfx('lg_get')}catch(e){}sgUI('💠 สร้าง «'+SGD[id][0]+' '+SGD[id][1]+'» แล้ว')})}
/* ---------- อัปขั้นรูนเสริม: ใช้ชิ้นซ้ำ + ผงรูน · ทุกชิ้นของแบบนั้นได้ขั้นเดียวกัน ---------- */
function sgUpOk(id){const lv=sgLv(id);if(lv>=3)return{ok:false,max:1};const[n,sh]=SGUC[lv],X=sgSt(),own=X.i[id]|0,keep=Math.max(1,sgUsed(id));return{ok:own-n>=keep&&(rnSt().sh|0)>=sh,n,sh,lack:own-n<keep}}
function sgUpBtn(id){const X=sgSt();if(!(X.i[id]|0))return'';const lv=sgLv(id);if(lv>=3)return'<span class="rnmax" style="display:block;margin-bottom:4px">MAX</span>';const r=sgUpOk(id);
  return'<button class="rnup" data-sgu="'+id+'"'+(r.ok?'':' disabled')+' style="margin-bottom:4px">⬆️ '+SGRM[lv+1]+'<br><small>ใช้ '+r.n+' ชิ้น · 💠'+r.sh+'</small></button>'}
/* ---------- ชุดลิงก์ 3 ชุด: บันทึกที่ช่างรูน · สลับได้ทุกที่ (หน้าสกิล) ---------- */
function sgSetSum(l){return SGK.map(k=>(l&&l[k]||[]).map(id=>SGD[id]?SGD[id][0]:'').join('')).filter(Boolean).join(' · ')||'ว่าง'}
function sgSetLoad(i){const X=sgSt(),S=X.sv[i];if(!S||!S.l)return'ชุดนี้ยังว่าง';const av={};Object.keys(X.i).forEach(id=>av[id]=X.i[id]|0);const nl={},miss=[];
  SGK.forEach(k=>{const A=[];(S.l[k]||[]).forEach(id=>{if(!SGD[id]||A.indexOf(id)>=0)return;if(!sgOk(id,k)||(av[id]|0)<=0){miss.push(SGD[id][0]+SGD[id][1]);return}av[id]--;A.push(id)});if(A.length)nl[k]=A});
  X.l=nl;X.cur=i;SGSEL=null;try{sfx('equip')}catch(e){}return'🔗 ใช้ชุดลิงก์ '+(i+1)+' แล้ว'+(miss.length?' · ขาด: '+miss.join(', '):'')}
function sgSetsCard(save){const X=sgSt(),N=sgSockN();if(!N)return'';let h='<div class="card" style="text-align:left;padding:9px 10px"><b style="font-size:13px">💾 ชุดลิงก์รูนเสริม</b> <small style="opacity:.75">'+(save?'บันทึกชุดที่ตั้งไว้ แล้วสลับได้ทุกที่ (เมนู ✨ สกิล → หน้าตัวละคร)':'สลับได้ทุกที่ · แก้ลิงก์ได้ที่ช่างรูนไอริสในค่าย')+'</small>';
  for(let i=0;i<3;i++){const S=X.sv[i],on=X.cur===i;h+='<div style="display:flex;align-items:center;gap:6px;margin-top:6px;padding:6px 8px;border-radius:10px;background:'+(on?'rgba(200,160,255,.18)':'rgba(255,255,255,.05)')+';border:1px solid '+(on?'#c8a0ff':'transparent')+'"><b style="font-size:12px;white-space:nowrap">ชุด '+(i+1)+(on?' ✓':'')+'</b><span style="flex:1;font-size:13px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">'+sgSetSum(S&&S.l)+'</span>'+
    '<button data-sgsl="'+i+'"'+(S?'':' disabled')+' style="font-size:11.5px;padding:5px 9px">ใช้</button>'+(save?'<button data-sgss="'+i+'" style="font-size:11.5px;padding:5px 9px">บันทึก</button>':'')+'</div>'}
  return h+'</div>'}
function sgSetsBind(re){ov.querySelectorAll('[data-sgsl]').forEach(b=>b.onclick=()=>{const m=sgSetLoad(+b.dataset.sgsl);re(m)});
  ov.querySelectorAll('[data-sgss]').forEach(b=>b.onclick=()=>{const X=sgSt(),i=+b.dataset.sgss;X.sv[i]={l:JSON.parse(JSON.stringify(X.l))};X.cur=i;try{sfx('equip')}catch(e){}re('💾 บันทึกชุดลิงก์ '+(i+1)+' แล้ว')})}
/* ---------- ติดตั้งตัวห่อ (หลังโมดูลอื่นห่อเสร็จ ให้อยู่ชั้นนอกสุด) ---------- */
setTimeout(()=>{try{
  _sgU0=useSkill0;
  window.useSkill0=useSkill0=function(k,free){
    if(SGX||!me.cls||SGK.indexOf(k)<0||sgOff())return _sgU0(k,free);const L=sgLinks(k);if(!L.length)return _sgU0(k,free);
    if(!run||me.down>0||me.sk[k]>0)return;if(k===4&&!me.cls2)return;if(k===3&&me.lv<SK3LV)return _sgU0(k,free);
    const mo=sgMods(k),chg=L.indexOf('charge')>=0?((SGCH[k]|0)+1)%3:-1;if(chg>=0)mo.pow*=chg===0?2.6+.3*(sgLv('charge')-1):.75;const base=free?0:mcOf(k),blood=L.indexOf('blood')>=0,need=blood?0:Math.round(base*mo.mana);
    if(me.mp<need){sgMsg('MP ไม่พอ (รูนเสริม ×'+(Math.round(mo.mana*10)/10)+')');return}
    const hpc=blood&&!free?Math.round(me.mh*.04*mo.mana):0;if(hpc&&me.hp<=hpc+1){sgMsg('เลือดไม่พอสังเวย');return}
    if(L.indexOf('totem')>=0||L.indexOf('trap')>=0){me.sk[k]=Math.max(1,cdOf(k)*mo.cd);if(hpc){me.hp-=hpc;dn.push({x:me.x,y:me.y-30,v:'-'+hpc,t:.8,col:'#ff6a6a'})}else me.mp-=need;try{dqProg('skill',1)}catch(e){}try{skSfx(k)}catch(e){}sgRec(k);sgPlace(k,L,mo);sgChg(k,chg);return}
    const s0=me.sk[k],mp0=me.mp;sgRaw(k,free||blood,{k,pow:mo.pow,src:'cast'});if(!(me.sk[k]>s0))return;
    if(blood){me.mp=mp0;if(hpc){me.hp-=hpc;dn.push({x:me.x,y:me.y-30,v:'-'+hpc,t:.8,col:'#ff6a6a'})}}else if(need>base)me.mp=Math.max(0,me.mp-(need-base));
    me.sk[k]*=mo.cd;sgRec(k);sgChg(k,chg);sgAfter(k,L,mo)};
  const _M=M;window.M=M=function(q){const v=_M(q);if(SGX&&SGX.pow!==1&&q==='s'+SGX.k+'p'){let sp=0;try{sp=skPow(SGX.k)||0}catch(e){}return v+(SGX.pow-1)*(1+v+sp)}return v};
  const _ah=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(SGIN||!me.cls||!m||m.pv||sgOff())return _ah(m,d,cr,lv,ck);
    const alive=m.hp>0,hp0=m.hp;let k=-1,L=null;if(lv&&lv!==2&&ck!=='rx'&&ck!=='s6l'){k=sgSlot(ck,lv);if(k>=0){L=sgLinks(k);if(!L.length)L=null}}
    if(L){if(L.indexOf('prec')>=0){if(!cr&&lv&&Math.random()<.25*sgQ('prec')){cr=1;try{d*=crD()}catch(e){d*=2}}if(cr)d*=1+.3*sgQ('prec')}const el=L.indexOf('fire')>=0?'fire':L.indexOf('ice')>=0?'ice':L.indexOf('zap')>=0?'zap':null;if(el)ck=SGEL[el]}
    const r=_ah(m,d,cr,lv,ck);if(!alive)return r;const kill=hp0-d<=0;
    SGIN=1;try{if(!lv&&cr)sgTrig('coc',m);if(kill)sgTrig('cok',m);if(L&&d>0)sgOnHit(k,L,m,d,ck,kill,_ah)}catch(e){console.warn('sgh',e)}finally{SGIN=0}return r};
  const _hu=hurt;window.hurt=hurt=function(d){const h0=me.hp,r=_hu.apply(this,arguments);const lost=h0-me.hp;if(lost>0&&me.cls&&!sgOff()){SGDT.acc+=lost;if(SGDT.acc>=me.mh*.1){SGDT.acc=0;try{sgTrig('cwdt',null)}catch(e){}}}return r};
  const _hf=handleFx;window.handleFx=handleFx=function(o){if(o&&typeof o.k==='string'&&o.k.slice(0,2)==='sg'&&o.k.length===3){try{sgRecv(o)}catch(e){}return}return _hf(o)};
  const _dr=drawRx;window.drawRx=drawRx=function(){_dr.apply(this,arguments);try{sgDrawW()}catch(e){}};
  const _st=starTick;window.starTick=starTick=function(dt){_st(dt);try{sgTick(dt)}catch(e){}};
  const _ru=runeUI;window.runeUI=runeUI=function(msg){if(SGTAB==='sup')return sgUI(msg);_ru(msg);try{sgCSS();const p=ov.querySelector('.pn[data-pn="rune"]'),hd=p&&p.querySelector('.ph');if(hd){hd.insertAdjacentHTML('afterend',sgTabBar(''));p.querySelectorAll('[data-sgtab]').forEach(b=>b.onclick=()=>{SGTAB=b.dataset.sgtab;SGSEL=null;runeUI()})}}catch(e){}};
  try{const _tu=treeUI;window.treeUI=treeUI=function(){const r=_tu.apply(this,arguments);try{if(sgSockN()>0&&sgSt().sv.some(Boolean)){sgCSS();const p=ov.querySelector('.pn'),hd=p&&p.querySelector('.ph');if(hd){hd.insertAdjacentHTML('afterend',sgSetsCard(false));sgSetsBind(m=>{treeUI();try{banner={s:m,t:3}}catch(e){}})}}}catch(e){}return r}}catch(e){}
  const _bl=bossLoot;window.bossLoot=bossLoot=function(x,y,mv){const r=_bl.apply(this,arguments);try{if(me.cls&&Math.hypot(me.x-x,me.y-y)<=650&&sgSockN()>0&&Math.random()<(mv?.6:.25))sgGive(null,mv?'บอส MVP':'บอส')}catch(e){}return r};
  const _dg=dgReward;window.dgReward=dgReward=function(){const r=_dg.apply(this,arguments);try{if(sgSockN()>0&&Math.random()<.35)sgGive(null,'ดันเจี้ยน')}catch(e){}return r};
  const _rs=rnShard;window.rnShard=rnShard=function(n,why){const r=_rs.apply(this,arguments);try{if(n>0&&n<=10&&sgSockN()>0&&Math.random()<n*.015)sgGive(null,'หัวหน้ามอน/เหตุการณ์')}catch(e){}return r};
}catch(e){console.warn('sg init',e)}},300);
/* ---------- กระเป๋า «ของใช้ & วัตถุดิบ»: โชว์ผงรูน + รูนเสริม (ดูอย่างเดียว ไม่เข้าระบบแลกเปลี่ยน) ---------- */
function sgGdCells(sel){if(!me.cls)return'';const S=rnSt(),X=sgSt(),sh=S.sh|0,ns=Object.values(X.i).reduce((a,b)=>a+(b|0),0),cell=(k,ic,v)=>'<button class="cell" data-gd="'+k+'" style="'+(v?'':'opacity:.45;')+(sel===k?'border-color:#d8a040;box-shadow:0 0 0 2px rgba(216,160,64,.5);':'')+'font-size:22px">'+ic+'<span style="position:absolute;right:4px;bottom:2px;font-size:11px;font-weight:700;text-shadow:0 1px 2px #000;color:#fff">'+(v>9999?Math.floor(v/1000)+'k':v)+'</span></button>';
  return cell('rnsh','<span style="filter:hue-rotate(40deg) saturate(1.3)">💠</span>',sh)+cell('rnsg','🔗',ns)}
function sgGdNote(sel){const S=rnSt(),X=sgSt();
  if(sel==='rnsh')return'<div class="note" style="margin-top:8px"><b>💠 ผงรูน</b> · มี '+((S.sh|0).toLocaleString())+'<br><small>ใช้ที่ช่างรูนไอริสในค่าย: สร้างรูนหลัก ('+RNC+') · อัปเกรดรูน ('+RNU[1]+'/'+RNU[2]+') · สุ่มรูนเสริม ('+SGRC+') · สร้างรูนเสริมแบบเลือกเอง ('+SGSC+') · ได้จากหัวหน้ามอน เหตุการณ์สุ่ม ดันเจี้ยน บอส และรูนซ้ำ</small></div>';
  if(sel==='rnsg'){const L=Object.keys(SGD).filter(id=>(X.i[id]|0)>0);return'<div class="note" style="margin-top:8px"><b>🔗 รูนเสริม</b> · มี '+L.reduce((a,id)=>a+(X.i[id]|0),0)+' ชิ้น ('+L.length+'/'+Object.keys(SGD).length+' แบบ)<br><small>'+(L.length?L.map(id=>SGD[id][0]+' '+SGD[id][1]+' ×'+(X.i[id]|0)+(sgUsed(id)?' (ใส่อยู่ '+sgUsed(id)+')':'')).join(' · '):'ยังไม่มี — ปลดช่องลิงก์ที่ Lv '+SGLV[0]+' แล้วรับฟรี 3 อัน')+'<br>ใส่ลิงก์สกิลได้ที่ช่างรูนไอริส แท็บ 🔗 รูนเสริม</small></div>'}
  return''}
/* ---------- แผง GM: เสกผงรูน / รูนเสริมครบ / อัปขั้น III (เห็นเฉพาะเจ้าของเกม) ---------- */
async function gmLocalOk(){try{const h=location.hostname;if(location.protocol==='file:'||h==='localhost'||h==='127.0.0.1')return true;const u=window.claude&&await claude.use('user');return!!(u&&u.isOwner&&await u.isOwner())}catch(e){return false}}
setTimeout(()=>{try{
  const _gu=gmUI;window.gmUI=gmUI=function(msg){const r=_gu.apply(this,arguments);try{if(!gmOk||!me.cls)return r;const S=rnSt(),X=sgSt(),nk=Object.keys(SGD).length,own=Object.keys(SGD).filter(id=>(X.i[id]|0)>0).length;
    const B=(k,t)=>'<button data-gm="'+k+'">'+t+'</button>',c='<div class="card" style="border-left:5px solid #c8a0ff"><div class="cap">💠 รูน · ผงรูน '+(S.sh|0).toLocaleString()+' · รูนเสริม '+own+'/'+nk+' แบบ · ช่องลิงก์ '+sgSockN()+'/3</div><div class="bt" style="flex-wrap:wrap">'+
      B('sgsh','💠 +1,000 ผงรูน')+B('sgall','🔗 รูนเสริมครบทุกแบบ ×3')+B('sgmax','⬆️ รูนเสริมทุกแบบขั้น III')+B('sgmain','💠 รูนหลักครบทุกสกิล ขั้น III')+'</div><small style="opacity:.75">ช่องลิงก์เปิดที่ Lv 20/45/70 (ตั้งเลเวลด้านบนได้) · แก้ลิงก์ได้ที่ช่างรูนไอริสในค่าย</small></div>';
    const cards=ov.querySelectorAll('.card');if(cards.length>1)cards[1].insertAdjacentHTML('afterend',c)}catch(e){}return r};
  const _ga=gmAct;window.gmAct=gmAct=function(k){if(typeof k!=='string'||k.slice(0,2)!=='sg'||!gmOk||!me.cls)return _ga.apply(this,arguments);gmUsed=true;const S=rnSt(),X=sgSt();let msg='';
    if(k==='sgsh'){S.sh=Math.min(99999,(S.sh|0)+1000);msg='+1,000 ผงรูน (รวม '+S.sh.toLocaleString()+')'}
    else if(k==='sgall'){Object.keys(SGD).forEach(id=>X.i[id]=Math.max(3,X.i[id]|0));X.g=1;msg='ได้รูนเสริมครบ '+Object.keys(SGD).length+' แบบ แบบละ 3 ชิ้น (รวมรูนหายาก)'}
    else if(k==='sgmax'){Object.keys(SGD).forEach(id=>{X.i[id]=Math.max(1,X.i[id]|0);X.v[id]=3});X.g=1;msg='รูนเสริมทุกแบบเป็นขั้น III แล้ว'}
    else if(k==='sgmain'){const R=RUNES[me.cls]||{};let n=0;Object.keys(R).forEach(q=>['a','b'].forEach(e=>{if(R[q]&&R[q][e]){S.u[R[q][e][0]]=3;n++}}));msg='ได้รูนหลักครบ '+n+' แบบ ขั้น III'}
    try{sfx('lg_get')}catch(e){}gmUI(msg)};
}catch(e){console.warn('sg gm',e)}},320);
