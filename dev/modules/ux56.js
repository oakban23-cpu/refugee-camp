
/* ===== v439 · คัตซีนเนื้อเรื่องในเกม ===== */
/* ทุกบทสนทนาเนื้อเรื่อง: ซ่อน HUD · แถบดำ · กล้องหันหาคนพูด (ผู้กำกับอัตโนมัติ)
   ฉากสำคัญ 14 ฉาก (เปิด/ปิดภาค 1–7): กล้องตามบท + เอฟเฟกต์ทั้งจอ + การ์ดชื่อภาค + เสียง
   แตะเพื่อไปบรรทัดต่อไปเหมือนเดิม · ปุ่ม ⏭ ข้ามฉาก · ดูซ้ำได้ที่เมนูเนื้อเรื่อง */
const CZ={on:0,sc:null,id:'',soft:0,li:-1,T0:0,t0:0,shot:null,from:null,to:null,cur:null,ttl:null,fl:0,fade:0,rp:0,P:[]};
const czE=q=>{q=Math.max(0,Math.min(1,q));return q<.5?4*q*q*q:1-Math.pow(-2*q+2,3)/2};
const czNow=()=>performance.now()/1000;
function czNpc(k){try{const N=STNPC[k];if(!N||N[0]!==curMap)return null;const o=MAPS[N[0]][N[1]];return o&&typeof o.x==='number'?o:null}catch(e){return null}}
/* ---------- นิยามฉาก ---------- */
const czCh=(name)=>{const i=STCH.findIndex(n=>n.indexOf(name)>=0);return i};
const czFirst=c=>STY.find(s=>s.c===c),czLast=c=>{let r=null;for(const s of STY)if(s.c===c)r=s;return r};
const CZDEF={
 p1o:{nm:'ภาค 1 · รอยผนึกแตก',sub:'บทเปิด',mp:1,get:()=>STY[0]&&STY[0].pre,base:['motes'],tint:'rgba(40,60,30,.10)',
  title:['ภาค 1','รอยผนึกแตก'],
  shots:[
   {m:'สามร้อยปีก่อน',cam:'sky',z:.62,dz:-.012,fx:['sepia','tower','grain'],sfx:'gate'},
   {m:'ผนึกนั้นร้าว',cam:'sky',z:.7,fx:['crack','dark'],shake:.45,flash:'#b070ff',sfx:'boss'},
   {m:'ฟื้นแล้วรึ',cam:'mid:cmd',z:1.25,fx:['mist'],sfx:'quest',title:1},
   {m:'ข้าคือเรนน์',cam:'npc:cmd',z:1.45,dz:.01},
   {m:'ฝ่ามือข้า',cam:'me',z:1.85,fx:['palm'],sfx:'lg_get'},
   {m:'หมอกพิษพาสัตว์ประหลาด',cam:'me',z:.85,fx:['mist','dark'],sfx:'ek_growl'}]},
 p1e:{nm:'ภาค 1 · ยอดหอคอย',sub:'บทจบ',mp:0,get:()=>{const c=czCh('บทสุดท้าย · ยอดหอคอย');const s=czLast(c);return s&&s.post},base:['dark','motes'],
  shots:[
   {m:'ในที่สุดเราก็พบกัน',cam:'sky',z:.75,fx:['eyes','pillar:me:#ffe08a','chains'],flash:'#fff3c0',sfx:'boss'},
   {m:'ข้าไม่โกรธพวกเจ้า',cam:'me',z:1.1,dz:.02,fx:['eyes','sepia','chains']},
   {m:'ทางเลือกเป็นของเจ้า',cam:'me',z:1.7,fx:['palm','eyes','chains'],sfx:'lg_get'}]},
 p1e1:{nm:'ภาค 1 · ผนึกนิรันดร์',sub:'ตอนจบ «ผนึก»',mp:0,get:()=>STEND&&STEND[1],base:['motes'],
  shots:[{i:0,cam:'sky',z:.8,fx:['eyes','pillar:me:#9ad8ff'],flash:'#9ad8ff',sfx:'lvl'},{m:'ผนึกกลับมาสมบูรณ์',cam:'sky',z:.65,fx:['pillar:me:#9ad8ff','gold']},{m:'เจ้าทำได้',cam:'me',z:1.3,fx:['gold']}]},
 p1e2:{nm:'ภาค 1 · ปลดโซ่เทพ',sub:'ตอนจบ «ปลดปล่อย»',mp:0,get:()=>STEND&&STEND[2],base:['motes'],
  shots:[{i:0,cam:'sky',z:.8,fx:['eyes','breakchains','pillar:me:#ffd84a'],flash:'#ffffff',shake:.5,sfx:'lvl'},{i:1,cam:'sky',z:.6,fx:['pillar:me:#ffd84a','gold','rise']}]},
 p2o:{nm:'ภาค 2 · ฟ้าแตก',sub:'บทเปิด',mp:1,get:()=>{const s=czFirst(czCh('ภาค 2 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 2','ฟ้าแตก'],
  shots:[
   {m:'รอยร้าวสีดำ',cam:'sky',z:.62,dz:-.01,fx:['night','crack2'],sfx:'boss',shake:.25,title:1},
   {m:'เจ้ากลับมาแล้ว',cam:'mid:cmd',z:1.3,fx:['crack2s']},
   {m:'หัวใจดาว',cam:'sky',z:.6,fx:['island','crack2s'],sfx:'lg_get'},
   {m:'ราชินีต้องการพบเจ้า',cam:'gate:sky',z:.9,fx:['island','pillar:gate:#9ad8ff']}]},
 p2e:{nm:'ภาค 2 · ราชินีผู้กลืนดาว',sub:'บทจบ',mp:9,get:()=>{const s=czLast(czCh('ภาค 2 · บทที่ 7'));return s&&s.pre},base:['motes'],
  shots:[
   {i:0,cam:'mid:qn',z:1.1,fx:['fireworks','gold'],sfx:'lvl'},
   {m:'คืนดวงดาวให้ทั้งฟ้า',cam:'sky',z:.65,fx:['fireworks','stars']},
   {m:'ใต้ดาวอาซาเอล',cam:'npc:qn',z:1.35,fx:['gold','rise']},
   {m:'ไม่หยุดเดินทาง',cam:'me',z:1.4,fx:['gold']},
   {m:'— จบภาค 2',cam:'sky',z:.6,fx:['fireworks','stars']}]},
 p3o:{nm:'ภาค 3 · แผ่นดินเงาใต้เมฆ',sub:'บทเปิด',mp:9,get:()=>{const s=czFirst(czCh('ภาค 3 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 3','แผ่นดินเงาใต้เมฆ'],
  shots:[
   {i:0,cam:'mid:qn',z:1.15,fx:['night','shadows'],sfx:'ek_growl',title:1},
   {m:'มาจาก "ข้างล่าง"',cam:'sky',z:.62,fx:['night','shadows','clouds']},
   {m:'ประตูเมฆ',cam:{dx:0,dy:-320},z:.75,fx:['night','clouds']},
   {m:'กุญแจผนึกนี้',cam:'npc:qn',z:1.4,fx:['palm']},
   {m:'กุญแจเย็นเฉียบ',cam:'me',z:1.85,fx:['palm','shadows']}]},
 p3e:{nm:'ภาค 3 · ผู้ทอเงา',sub:'บทจบ',mp:9,get:()=>{const s=czLast(czCh('ภาค 3 · บทที่ 5'));return s&&s.pre},base:['motes'],
  shots:[
   {i:0,cam:'mid:qn',z:1.2,fx:['gold']},
   {m:'เจ้าเล่าเรื่องอัมบรา',cam:'me',z:1.1,dz:.02,fx:['sepia','grain','shadows']},
   {m:'ราชินีเงียบไปนาน',cam:'npc:qn',z:1.5},
   {m:'แต่ข้าจะไม่ลืม',cam:'sky',z:.65,fx:['pillar:me:#ffe08a','gold','rise'],sfx:'lvl'},
   {m:'— จบภาค 3',cam:'sky',z:.62,fx:['gold','rise']}]},
 p4o:{nm:'ภาค 4 · หัวใจที่ถูกแบ่ง',sub:'บทเปิด',mp:1,get:()=>{const s=czFirst(czCh('ภาค 4 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 4','หัวใจที่ถูกแบ่ง'],
  shots:[
   {i:0,cam:'sky',z:.6,fx:['night','roots'],shake:.35,sfx:'boom',title:1},
   {m:'นกสื่อสารไปหาเจ้า',cam:'mid:cmd',z:1.3,fx:['roots']},
   {m:'รากสีดำโผล่ขึ้นมา',cam:'me',z:.8,fx:['roots','dark'],shake:.3,sfx:'ek_summon'},
   {m:'ลึกกว่านั้น',cam:'npc:cmd',z:1.4,fx:['roots']},
   {m:'แสงสีทองบนยอดหอคอยก็ดับลง',cam:'sky',z:.62,fx:['tower','dark','roots']},
   {m:'ร้อนวูบขึ้นมา',cam:'me',z:1.85,fx:['palm','roots']},
   {m:'ไปหาผู้เฝ้าหอคอย',cam:'mid:cmd',z:1.1}]},
 p4e:{nm:'ภาค 4 · หัวใจที่ถูกแบ่ง',sub:'บทจบ',mp:26,get:()=>{const s=czLast(czCh('ภาค 4 · บทสุดท้าย'));return s&&s.pre},base:['dark','motes'],
  shots:[
   {i:0,cam:'me',z:.85,fx:['rootsdie','heart'],shake:.4,flash:'#ffd84a',sfx:'boom'},
   {m:'อัลดริคก้าวเข้ามา',cam:'me',z:1.35,fx:['heart','ghost']},
   {m:'กลับมาเป็นดาวที่สมบูรณ์',cam:'sky',z:.7,fx:['heart','eyes']},
   {m:'โซ่ของข้าจะแตก',cam:'sky',z:.7,fx:['heart','eyes','chains']},
   {m:'ตะปูดวงใหม่',cam:'me',z:1.6,fx:['heart','ghost']}]},
 p5o:{nm:'ภาค 5 · บัลลังก์ลอยฟ้า',sub:'บทเปิด',mp:9,get:()=>{const s=czFirst(czCh('ภาค 5 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 5','บัลลังก์ลอยฟ้า'],
  shots:[
   {i:0,cam:'me',z:1.4,fx:['bird','gold'],title:1,sfx:'quest'},
   {m:'ขอบคุณเจ้า',cam:'mid:qn',z:1.2,fx:['gold']},
   {m:'ท้องพระโรงสว่างไสว',cam:'sky',z:.7,fx:['gold','rise']},
   {m:'ในนามของอัสตรา',cam:'npc:qn',z:1.55,dz:.03,fx:['gold']},
   {m:'ปึง!',cam:'npc:qn',z:1.1,fx:['silver','dark'],flash:'#dfe8ff',shake:.55,sfx:'boss'},
   {m:'ใครอนุญาต',cam:'sky',z:.75,fx:['silver','eyes2','dark']},
   {m:'แสงสีเงินพุ่งขึ้น',cam:'npc:qn',z:1.0,fx:['silver','pillar:qn:#dfe8ff','dark'],shake:.4,sfx:'ek_summon'},
   {m:'ทางนี้!',cam:'me',z:1.3,fx:['fadeblk'],sfx:'gate'},
   {m:'ข้าชื่อลิเรีย',cam:'me',z:1.25,fx:['night']},
   {m:'ช่วยนางด้วย',cam:'me',z:1.6,fx:['night','palm']}]},
 p5e:{nm:'ภาค 5 · บัลลังก์ดาว',sub:'บทจบ',mp:29,get:()=>{const s=czLast(czCh('ภาค 5 · บทสุดท้าย'));return s&&s.pre},base:['motes'],
  shots:[
   {i:0,cam:'mid:qnt',z:1.2,fx:['gold']},
   {m:'หัวใจทั้งดวง',cam:'sky',z:.7,fx:['heart','gold','rise'],sfx:'lg_get'},
   {m:'หัวใจอีกครึ่ง',cam:'sky',z:.7,fx:['heart','gold']},
   {m:'ตอนข้าเจ็ดขวบ',cam:'npc:qnt',z:1.5,fx:['sepia','grain']},
   {m:'ประตูทุกบาน',cam:'sky',z:.6,dz:-.01,fx:['bridge','gold','rise'],flash:'#fff3c0',sfx:'lvl'},
   {m:'องครักษ์ดาวจะเฝ้า',cam:'mid:qnt',z:1.15,fx:['bridge','gold']},
   {m:'เพลงกล่อม',cam:'sky',z:.75,fx:['notes','gold']},
   {m:'ตรารุ่งอรุณ',cam:'me',z:1.85,fx:['palm','gold','notes']},
   {m:'ผู้นำแห่งรุ่งอรุณ ขอบคุณ',cam:'mid:qnt',z:1.3,fx:['gold','notes']},
   {m:'— จบภาค 5',cam:'sky',z:.6,fx:['bridge','gold','rise']}]},
 p6o:{nm:'ภาค 6 · สะพานรุ่งอรุณ',sub:'บทเปิด',mp:9,get:()=>{const s=czFirst(czCh('ภาค 6 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 6','สะพานรุ่งอรุณ'],
  shots:[
   {i:0,cam:'sky',z:.62,dz:-.01,fx:['bridge','gold'],title:1,sfx:'gate'},
   {m:'ขบวนผู้อพยพขบวนแรก',cam:'mid:qn',z:1.2,fx:['bridge']},
   {m:'ส่องทะลุทะเลเมฆ',cam:'sky',z:.7,fx:['bridge','clouds']},
   {m:'เห็นเงาบางอย่าง',cam:'sky',z:.75,fx:['bridge','night','shadows'],sfx:'ek_growl'},
   {m:'ไม่อยากให้วันแรก',cam:'npc:qn',z:1.4,fx:['bridge']},
   {m:'สะพานรุ่งอรุณเริ่มที่',cam:'gate:sky',z:.85,fx:['bridge','pillar:gate:#ffe9b0']}]},
 p6e:{nm:'ภาค 6 · หลุมหัวใจว่าง',sub:'บทจบ',mp:33,get:()=>{const s=czLast(czCh('ภาค 6 · บทสุดท้าย'));return s&&s.pre},base:['dark','motes'],
  shots:[
   {i:0,cam:'sky',z:.62,fx:['crowd','dark'],sfx:'ek_growl'},
   {m:'ข้าลงมาเอง',cam:'me',z:1.2,fx:['crowd']},
   {m:'บอกเราเถอะ',cam:'me',z:1.6,fx:['crowd','palm']},
   {m:'ข้าจะยอมรับคำตอบ',cam:'sky',z:.7,fx:['crowd','eyes2']}]},
 p7o:{nm:'ภาค 7 · ผู้เก็บดาวร่วง',sub:'บทเปิด',mp:1,get:()=>{const s=czFirst(czCh('ภาค 7 · บทที่ 1'));return s&&s.pre},base:['motes'],title:['ภาค 7','ผู้เก็บดาวร่วง'],
  shots:[
   {i:0,cam:'sky',z:.6,dz:-.01,fx:['night','stars','fallstars'],title:1,sfx:'met_fall'},
   {m:'ยามเห็นดาวตก',cam:'mid:cmd',z:1.25,fx:['night','fallstars']},
   {m:'แสงหัวใจครึ่งดวง',cam:'sky',z:.7,fx:['night','heart','stars']},
   {m:'เมล็ดดาว',cam:'sky',z:.7,fx:['night','stars','rise']},
   {m:'ทิลวิ่งหอบ',cam:'me',z:1.4,fx:['night','compass'],sfx:'quest'},
   {m:'ชี้หาดาวที่ร่วง',cam:'me',z:1.6,fx:['night','compass','fallstars']},
   {m:'ราชินีที่เจ้าล้ม',cam:'npc:cmd',z:1.35,fx:['night']},
   {m:'ประตูตะวันออก',cam:{dx:340,dy:0},z:.75,fx:['night','fallstars']}]},
 p7e:{nm:'ภาค 7 · เตาหลอมหัวใจ',sub:'บทจบ',mp:33,get:()=>{const s=czLast(czCh('ภาค 7 · บทสุดท้าย'));return s&&s.pre},base:['motes','notes'],
  shots:[
   {i:0,cam:'me',z:1.3,fx:['sepia','notes']},
   {m:'อารัณยาได้บ้านคืน',cam:'sky',z:.7,fx:['gold','notes','rise']},
   {m:'หัวใจดวงนั้นส่อง',cam:'sky',z:.7,fx:['gold','heart','notes']},
   {m:'ร้องจบแล้วไม่ต้องรอใคร',cam:'me',z:1.45,fx:['gold','notes']},
   {m:'ช่างนาฬิกา',cam:'me',z:1.25,fx:['notes']},
   {m:'ม้วนแผนที่ดาว',cam:'sky',z:.65,fx:['night','stars','fallstars']},
   {m:'ผู้เก็บดาวร่วง',cam:'me',z:1.5,fx:['night','stars','compass']},
   {m:'เพลงกล่อมของสามเมือง',cam:'sky',z:.55,dz:-.012,fx:['night','stars','notes','rise']}]}};
/* บรรทัดท้ายของฉากที่อยู่ใน post (ต่อจาก pre) */
const CZPOST={p4e:()=>{const s=czLast(czCh('ภาค 4 · บทสุดท้าย'));return s&&s.post},p6e:()=>{const s=czLast(czCh('ภาค 6 · บทสุดท้าย'));return s&&s.post},p7e:()=>{const s=czLast(czCh('ภาค 7 · บทสุดท้าย'));return s&&s.post}};
let CZMAP=null;
function czFind(lines){if(CZMAP&&CZMAP.n!==STY.length)CZMAP=null;if(!CZMAP){CZMAP=new Map();for(const id in CZDEF){try{const L=CZDEF[id].get();if(L)CZMAP.set(L,id)}catch(e){}}for(const id in CZPOST){try{const L=CZPOST[id]();if(L&&!CZMAP.has(L))CZMAP.set(L,id)}catch(e){}}CZMAP.n=STY.length}return CZMAP.get(lines)||null}
let CZSTY=null;
function czIsStory(lines){if(CZSTY&&CZSTY.n!==STY.length)CZSTY=null;if(!CZSTY){CZSTY=new Set();try{for(const s of STY){if(s.pre)CZSTY.add(s.pre);if(s.post)CZSTY.add(s.post)}for(const k in STEND)CZSTY.add(STEND[k])}catch(e){}CZSTY.n=STY.length}return CZSTY.has(lines)}
/* ---------- กล้อง ---------- */
function czCamPos(spec){const P=[me.x,me.y];try{
  if(!spec||spec==='me')return P;
  if(spec==='sky')return[me.x,me.y-170];
  if(typeof spec==='object'&&!Array.isArray(spec))return[me.x+(spec.dx||0),me.y+(spec.dy||0)];
  if(Array.isArray(spec))return spec;
  if(spec.startsWith('npc:')){const n=czNpc(spec.slice(4));return n?[n.x,n.y-20]:P}
  if(spec.startsWith('mid:')){const n=czNpc(spec.slice(4));if(!n)return P;const d=Math.hypot(n.x-me.x,n.y-me.y);return d<520?[(n.x+me.x)/2,(n.y+me.y)/2-16]:[n.x,n.y-20]}
  if(spec==='gate:sky'){const G=(MAPS[curMap].gates||[]).find(G=>G.sky);return G?[G.x,G.y-40]:P}
}catch(e){}return P}
function czSpkCam(L){const k=L&&L[0];if(k==='me')return{cam:'me',z:1.35};if(k==='nar')return{cam:CZ.cur?[CZ.cur.x,CZ.cur.y]:'me',z:1.0};
  const n=czNpc(k);if(n)return{cam:'mid:'+k,z:1.22};if(k==='god'||k==='hd'||k==='orn')return{cam:'sky',z:.9};return{cam:'me',z:1.15}}
function czGo(sh){const p=czCamPos(sh.cam);const c=CZ.cur||{x:me.x,y:me.y,z:ZM.z||1};CZ.from={x:c.x,y:c.y,z:c.z};CZ.to={x:p[0],y:p[1],z:sh.z||1.1};CZ.t0=czNow();CZ.shot=sh;
  if(sh.sfx)try{sfx(sh.sfx)}catch(e){}if(sh.shake)try{shk=Math.max(shk,sh.shake)}catch(e){}if(sh.flash){CZ.fl=czNow();CZ.flc=sh.flash}
  if(sh.title&&CZ.sc&&CZ.sc.title)CZ.ttl={a:CZ.sc.title[0],b:CZ.sc.title[1],t0:czNow(),d:4.2}}
function czCamTick(){if(!CZ.on||!CZ.to)return;const t=czNow()-CZ.t0,q=czE(t/1.35),F=CZ.from,T=CZ.to,dz=(CZ.shot&&CZ.shot.dz)||0;
  CZ.cur={x:F.x+(T.x-F.x)*q,y:F.y+(T.y-F.y)*q,z:Math.max(.5,Math.min(2.2,F.z+(T.z-F.z)*q+dz*Math.max(0,t-1.35)))};try{if(PH.on&&!CZ.ph){PH.ox=CZ.cur.x-me.x;PH.oy=CZ.cur.y-me.y;PH.z=LOWQ?Math.max(.75,CZ.cur.z):CZ.cur.z}}catch(e){}}
try{rt3Cam=(f=>function(){if(CZ.on&&CZ.cur)return[CZ.cur.x,CZ.cur.y];return f.apply(this,arguments)})(rt3Cam)}catch(e){}
try{camZoomT=(f=>function(){if(CZ.on&&CZ.cur){let z=CZ.cur.z;if(LOWQ)z=Math.max(z,.75);return z}return f.apply(this,arguments)})(camZoomT)}catch(e){}
/* ---------- เริ่ม/บรรทัด/จบ ---------- */
function czCSS(){if($('cscss'))return;const st=document.createElement('style');st.id='cscss';st.textContent=
 'body.csm #app *:not(#stage):not(#c):not(#sdlg):not(#sdlg *):not(#scine):not(#scine *){visibility:hidden!important}'+
 'body.csm #sdlg,body.csm #sdlg *{visibility:visible!important}body.csm #scine.on,body.csm #scine.on *{visibility:visible!important}'+
 'body.csm>*:not(#app):not(#csx):not(#cscss){visibility:hidden!important}'+
 '#csx{position:fixed;top:calc(9vh + 8px);right:10px;z-index:60;padding:6px 12px;border-radius:999px;border:1px solid rgba(255,230,170,.55);background:rgba(10,8,6,.55);color:#ffe9b8;font:600 12px system-ui;letter-spacing:.3px;cursor:pointer}'+
 'body.csm #sdlg{background:linear-gradient(180deg,rgba(10,8,14,.55),rgba(6,4,10,.82))!important;border-color:rgba(232,192,96,.55)!important;box-shadow:0 0 0 1px rgba(0,0,0,.5),0 6px 18px rgba(0,0,0,.6)!important;bottom:calc(9vh + 6px)!important}';
 document.head.appendChild(st)}
function czStart(id,soft){czCSS();CZ.on=1;CZ.id=id||'';CZ.sc=id?CZDEF[id]:null;CZ.soft=soft?1:0;CZ.li=-1;CZ.T0=czNow();CZ.cur={x:me.x,y:me.y,z:ZM.z||1};CZ.to=null;CZ.ttl=null;CZ.fl=0;CZ.P=[];
  try{CZ.ph=PH.on?1:0;if(!PH.on){PH.on=1;PH.tags=1;PH.ox=0;PH.oy=0;PH.z=1}banner=null}catch(e){}document.body.classList.add('csm');const sc=$('scine');if(sc)sc.classList.add('on');
  let b=$('csx');if(!b){b=document.createElement('button');b.id='csx';b.textContent='⏭ ข้ามฉาก';b.onclick=e=>{e.stopPropagation();czSkip()};document.body.appendChild(b)}b.hidden=false;
  if(CZ.sc&&!CZ.sc.title){}try{if(id)czSeen(id)}catch(e){}}
function czSkip(){if(!SD.on){czEnd();return}try{clearInterval(SD.typ);SD.typ=null;if(SD.choice){SD.i=SD.q.length-1;stLine();if(SD.typ)stNext();return}SD.i=SD.q.length;stClose()}catch(e){czEnd()}}
function czEnd(){if(!CZ.on)return;CZ.on=0;CZ.sc=null;CZ.to=null;CZ.cur=null;try{if(!CZ.ph)PH.on=0}catch(e){}document.body.classList.remove('csm');const b=$('csx');if(b)b.hidden=true}
function czLine(){if(!CZ.on)return;const L=SD.q[SD.i];if(!L)return;CZ.li=SD.i;let sh=null;
  if(CZ.sc){for(const s of CZ.sc.shots){if((s.m&&L[1]&&L[1].indexOf(s.m)>=0)||(s.i===SD.i&&s.m===undefined)){sh=s;break}}}
  if(!sh&&CZ.sc&&CZ.shot&&CZ.shot._sc===CZ.id)sh=Object.assign({},CZ.shot,{sfx:0,shake:0,flash:0,title:0,_keep:1});
  if(!sh)sh=czSpkCam(L);sh._sc=CZ.id;
  /* การ์ดตอนจบภาค: บรรทัด «— จบภาค …» */
  if(L[0]==='nar'&&/จบภาค/.test(L[1])&&/—/.test(L[1])){const t=L[1].replace(/^[^—]*—\s*/,'').split('—')[0].trim();const p=t.split('·');CZ.ttl={a:(p[0]||'').trim(),b:(p[1]||'').trim(),t0:czNow(),d:5,end:1};try{sfx('lvl')}catch(e){}}
  if(sh._keep){CZ.shot=sh;return}czGo(sh)}
/* stSay: ระบุฉาก */
try{stSay=(f=>function(lines,done,o){const was=SD.on;let id=null,story=false;try{if(!was){id=czFind(lines);story=!!id||czIsStory(lines)}}catch(e){}
  if(!was&&!(id||story)&&CZ.on)czEnd();
  if(!was&&(id||story)){const r=f.call(this,lines,done,Object.assign({},o||{},{cine:1}));if(SD.on){czStart(id,!id);czLine()}return r}
  if(was&&CZ.on&&!CZ.sc){const nid=czFind(lines);if(nid){CZ.sc=CZDEF[nid];CZ.id=nid;CZ.soft=0;try{czSeen(nid)}catch(e){}}}
  return f.apply(this,arguments)})(stSay)}catch(e){}
try{stLine=(f=>function(){const r=f.apply(this,arguments);try{czLine()}catch(e){}return r})(stLine)}catch(e){}
try{stClose=(f=>function(){const r=f.apply(this,arguments);try{if(!SD.on)czEnd()}catch(e){}return r})(stClose)}catch(e){}
/* สลับเข้าฉากถัดไปที่ต่อคิว (เช่น pre → post ของฉากเดียวกัน) ให้ฉากยังเดินต่อ */
setInterval(()=>{try{if(CZ.on&&!SD.on)czEnd();if(!CZ.on&&SD.on&&SD.cine&&!document.body.classList.contains('csm')){}}catch(e){}},400);
/* ---------- เอฟเฟกต์ทั้งจอ ---------- */
function czW2S(x,y){const z=ZM.z||1;return[(x-cam.x)*z,(y-cam.y)*z]}
function czRnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function czFxPos(tok){if(tok==='me')return czW2S(me.x,me.y-24);if(tok==='gate'){const G=(MAPS[curMap].gates||[]).find(G=>G.sky);return G?czW2S(G.x,G.y-10):czW2S(me.x,me.y)}const n=czNpc(tok);return n?czW2S(n.x,n.y-20):czW2S(me.x,me.y-24)}
const CZFX={
 sepia(t,a){g.fillStyle='rgba(112,72,24,'+(.26*a)+')';g.fillRect(0,0,W,H);g.globalCompositeOperation='saturation';g.fillStyle='rgba(120,120,120,'+(.55*a)+')';g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over'},
 grain(t,a){const n=LOWQ?40:120,f=Math.floor(t*14);for(let i=0;i<n;i++){const r=czRnd(i+f*131);g.fillStyle=r>.5?'rgba(255,240,200,'+(.08*a)+')':'rgba(0,0,0,'+(.12*a)+')';g.fillRect(czRnd(i*3+f)*W,czRnd(i*7+f*3)*H,1.5,1.5)}},
 dark(t,a){const gr=g.createRadialGradient(W/2,H*.48,Math.min(W,H)*.2,W/2,H*.5,Math.max(W,H)*.75);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,'+(.6*a)+')');g.fillStyle=gr;g.fillRect(0,0,W,H)},
 night(t,a){g.fillStyle='rgba(8,12,40,'+(.38*a)+')';g.fillRect(0,0,W,H)},
 gold(t,a){g.globalCompositeOperation='soft-light';g.fillStyle='rgba(255,200,110,'+(.45*a)+')';g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over';const gr=g.createLinearGradient(0,0,0,H*.5);gr.addColorStop(0,'rgba(255,220,150,'+(.18*a)+')');gr.addColorStop(1,'rgba(255,220,150,0)');g.fillStyle=gr;g.fillRect(0,0,W,H*.5)},
 mist(t,a){for(let i=0;i<7;i++){const x=((czRnd(i)*W+t*(8+i*3))%(W+260))-130,y=H*(.35+czRnd(i+9)*.55);const gr=g.createRadialGradient(x,y,10,x,y,140);gr.addColorStop(0,'rgba(120,170,90,'+(.2*a)+')');gr.addColorStop(1,'rgba(120,170,90,0)');g.fillStyle=gr;g.fillRect(x-140,y-140,280,280)}},
 motes(t,a){g.globalCompositeOperation='lighter';const n=LOWQ?10:26;for(let i=0;i<n;i++){const x=(czRnd(i)*W+Math.sin(t*.4+i)*22),y=((czRnd(i+50)*H-t*(10+i%5*4))%H+H)%H,r=1+czRnd(i+3)*1.6;g.fillStyle='rgba(255,236,190,'+(.45*a*(.5+.5*Math.sin(t*2+i)))+')';g.beginPath();g.arc(x,y,r,0,7);g.fill()}g.globalCompositeOperation='source-over'},
 rise(t,a){g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?14:34);i++){const x=czRnd(i+7)*W,y=H-((t*(40+czRnd(i)*60)+czRnd(i+2)*H)%(H+40)),r=1.4+czRnd(i+5)*2;g.fillStyle='rgba(255,220,140,'+(.6*a)+')';g.beginPath();g.arc(x,y,r,0,7);g.fill()}g.globalCompositeOperation='source-over'},
 crack(t,a){czCrack(t,a,.22,1)},crack2(t,a){czCrack(t,a,.2,1.6)},crack2s(t,a){czCrack(8+t,a*.75,.16,1.6)},
 tower(t,a){const x=W*.5,b=H*.5,h=H*.36,w=Math.min(34,W*.08);g.save();g.globalAlpha=a*.7;
   const fog=g.createLinearGradient(0,b-h-60,0,b+30);fog.addColorStop(0,'rgba(60,40,70,0)');fog.addColorStop(1,'rgba(60,40,70,.55)');g.fillStyle=fog;g.fillRect(0,b-h-60,W,h+90);
   g.fillStyle='rgba(24,16,34,.85)';for(let i=0;i<6;i++){const y0=b-i*(h/6),ww=w*(1-i*.09);g.fillRect(x-ww,y0-h/6+2,ww*2,h/6);g.fillRect(x-ww-3,y0-h/6,ww*2+6,3)}
   g.beginPath();g.moveTo(x-w*.5,b-h);g.lineTo(x,b-h-40);g.lineTo(x+w*.5,b-h);g.fill();
   g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){g.fillStyle='rgba(255,200,110,'+(.35*(.5+.5*Math.sin(t*2+i)))+')';g.fillRect(x-2,b-i*(h/6)-h/12,4,5)}
   const gr=g.createRadialGradient(x,b-h-40,2,x,b-h-40,40);gr.addColorStop(0,'rgba(190,140,255,.7)');gr.addColorStop(1,'rgba(190,140,255,0)');g.fillStyle=gr;g.fillRect(x-44,b-h-84,88,88);g.restore()},
 eyes(t,a){czEyes(t,a,'255,214,120')},eyes2(t,a){czEyes(t,a,'210,225,255')},
 chains(t,a){g.strokeStyle='rgba(200,190,170,'+(.55*a)+')';g.lineWidth=3;for(let k=0;k<2;k++){const sx=k?W+10:-10,sy=H*.12,ex=W*.5+(k?40:-40),ey=H*.42;const n=14;for(let i=0;i<n;i++){const q=i/n,x=sx+(ex-sx)*q,y=sy+(ey-sy)*q+Math.sin(q*3.14)*18+Math.sin(t*2+i)*1.5;g.beginPath();g.ellipse(x,y,6,3.4,Math.atan2(ey-sy,ex-sx)+(i%2?1.57:0),0,7);g.stroke()}}},
 breakchains(t,a){if(t<.9)CZFX.chains(t,a*(1-t/.9));g.globalCompositeOperation='lighter';for(let i=0;i<24;i++){const q=Math.min(1,t/1.4),ang=czRnd(i)*6.28,d=q*(80+czRnd(i+3)*180);g.fillStyle='rgba(255,230,170,'+(.7*a*(1-q))+')';g.fillRect(W/2+Math.cos(ang)*d,H*.35+Math.sin(ang)*d,3,3)}g.globalCompositeOperation='source-over'},
 palm(t,a){const [x,y]=czW2S(me.x+6,me.y-14);g.globalCompositeOperation='lighter';const r=18+6*Math.sin(t*5);const gr=g.createRadialGradient(x,y,1,x,y,r*2.2);gr.addColorStop(0,'rgba(255,240,190,'+(.95*a)+')');gr.addColorStop(.35,'rgba(255,200,90,'+(.5*a)+')');gr.addColorStop(1,'rgba(255,180,60,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,r*2.2,0,7);g.fill();
   for(let i=0;i<10;i++){const an=t*1.6+i*.63,rr=14+(i%3)*7;g.fillStyle='rgba(255,230,160,'+(.7*a)+')';g.fillRect(x+Math.cos(an)*rr,y+Math.sin(an)*rr*.6,2,2)}g.globalCompositeOperation='source-over'},
 island(t,a){const x=W*.62,y=H*.17+Math.sin(t*.8)*5,w=Math.min(190,W*.42);g.fillStyle='rgba(30,36,70,'+(.85*a)+')';g.beginPath();g.moveTo(x-w/2,y);g.quadraticCurveTo(x,y-14,x+w/2,y);g.lineTo(x+w*.18,y+w*.32);g.lineTo(x,y+w*.48);g.lineTo(x-w*.22,y+w*.3);g.closePath();g.fill();
   for(let i=0;i<7;i++){const sx=x-w*.36+i*w*.12,sh=14+czRnd(i)*28;g.fillRect(sx,y-sh,w*.06,sh);g.beginPath();g.moveTo(sx-2,y-sh);g.lineTo(sx+w*.03,y-sh-10);g.lineTo(sx+w*.06+2,y-sh);g.fill()}
   g.globalCompositeOperation='lighter';for(let i=0;i<16;i++){g.fillStyle='rgba(255,226,150,'+(.6*a*(.5+.5*Math.sin(t*3+i)))+')';g.fillRect(x-w*.38+czRnd(i)*w*.76,y-4-czRnd(i+4)*30,2,2)}const gr=g.createRadialGradient(x,y+w*.3,2,x,y+w*.3,w*.5);gr.addColorStop(0,'rgba(150,200,255,'+(.5*a)+')');gr.addColorStop(1,'rgba(150,200,255,0)');g.fillStyle=gr;g.fillRect(x-w,y-w*.2,w*2,w);g.globalCompositeOperation='source-over'},
 clouds(t,a){for(let i=0;i<9;i++){const x=((czRnd(i)*W*1.4+t*(6+i%3*4))%(W+300))-150,y=H*(.55+czRnd(i+2)*.4),r=90+czRnd(i+5)*80;const gr=g.createRadialGradient(x,y,10,x,y,r);gr.addColorStop(0,'rgba(220,226,245,'+(.32*a)+')');gr.addColorStop(1,'rgba(220,226,245,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}},
 shadows(t,a){const n=LOWQ?7:13;for(let i=0;i<n;i++){const x=W*(i+.5)/n+Math.sin(t*.7+i)*10,h=H*(.18+czRnd(i)*.3)*Math.min(1,t/2.4+.15);g.fillStyle='rgba(12,6,24,'+(.8*a)+')';g.beginPath();g.moveTo(x-16,H);g.quadraticCurveTo(x-24+Math.sin(t+i)*14,H-h*.6,x+Math.sin(t*1.3+i)*12,H-h);g.quadraticCurveTo(x+22,H-h*.5,x+16,H);g.fill();
   if(i%3===0){g.fillStyle='rgba(200,120,255,'+(.8*a)+')';const ex=x+Math.sin(t*1.3+i)*12,ey=H-h+12;g.fillRect(ex-5,ey,3,2);g.fillRect(ex+2,ey,3,2)}}},
 roots(t,a){czRoots(t,a,1)},rootsdie(t,a){czRoots(9,a*Math.max(0,1-t/1.6),1);g.fillStyle='rgba(160,130,90,'+(.5*a*Math.max(0,1-t/2))+')';for(let i=0;i<40;i++){const q=Math.min(1,t/1.6);g.fillRect(czRnd(i)*W,H-(czRnd(i+1)*H*.4)*(1-q)+q*40,2,2)}},
 heart(t,a){const [x,y0]=czW2S(me.x,me.y-110),y=y0+Math.sin(t*2)*6,s=1+.08*Math.sin(t*4);g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,y,2,x,y,70);gr.addColorStop(0,'rgba(255,215,140,'+(.8*a)+')');gr.addColorStop(1,'rgba(255,160,60,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,70,0,7);g.fill();g.globalCompositeOperation='source-over';
   g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='rgba(255,236,190,'+(.95*a)+')';g.beginPath();g.moveTo(0,14);g.bezierCurveTo(-26,-4,-14,-24,0,-10);g.bezierCurveTo(14,-24,26,-4,0,14);g.fill();g.restore()},
 ghost(t,a){const [x,y]=czW2S(me.x+64,me.y-6);g.globalAlpha=.55*a*(.8+.2*Math.sin(t*3));g.fillStyle='#bfe6ff';g.beginPath();g.ellipse(x,y-34,9,10,0,0,7);g.fill();g.beginPath();g.moveTo(x-14,y-22);g.lineTo(x+14,y-22);g.lineTo(x+10+Math.sin(t*2)*3,y+12);g.lineTo(x-10+Math.sin(t*2+1)*3,y+12);g.closePath();g.fill();g.fillRect(x+12,y-40,2.5,46);g.globalAlpha=1},
 bird(t,a){const q=Math.min(1,t/2.2),x=W*(1-q)*.9+W*.5*q,y=H*.15+(H*.3)*q+Math.sin(t*8)*4,f=Math.sin(t*16);g.fillStyle='rgba(255,214,110,'+a+')';g.beginPath();g.ellipse(x,y,9,5,0,0,7);g.fill();g.beginPath();g.moveTo(x-2,y);g.lineTo(x-14,y-10*f);g.lineTo(x+6,y-2);g.fill();g.beginPath();g.moveTo(x+2,y);g.lineTo(x+14,y-10*f);g.lineTo(x-6,y-2);g.fill()},
 silver(t,a){g.globalCompositeOperation='color';g.fillStyle='rgba(180,195,230,'+(.55*a)+')';g.fillRect(0,0,W,H);g.globalCompositeOperation='lighter';for(let i=0;i<18;i++){const an=t*.8+i*.35,r=60+i*9;const [x,y]=czFxPos('qn');g.strokeStyle='rgba(220,230,255,'+(.25*a)+')';g.lineWidth=1.4;g.beginPath();g.arc(x,y,r,an,an+.9);g.stroke()}g.globalCompositeOperation='source-over'},
 fadeblk(t,a){g.fillStyle='rgba(0,0,0,'+(a*Math.max(0,1-Math.abs(t-.6)/.6))+')';g.fillRect(0,0,W,H)},
 bridge(t,a){g.globalCompositeOperation='lighter';const x0=W*1.05,y0=H*.05,x1=-W*.05,y1=H*.95,k=Math.min(1,t/1.6);const ex=x0+(x1-x0)*k,ey=y0+(y1-y0)*k;for(let w=26;w>0;w-=6){g.strokeStyle='rgba(255,226,150,'+(.09*a*(30-w)/10)+')';g.lineWidth=w;g.beginPath();g.moveTo(x0,y0);g.lineTo(ex,ey);g.stroke()}
   for(let i=0;i<20;i++){const q=((czRnd(i)+t*.12)%1)*k;g.fillStyle='rgba(255,246,210,'+(.8*a)+')';g.fillRect(x0+(x1-x0)*q-1,y0+(y1-y0)*q-1,2.5,2.5)}g.globalCompositeOperation='source-over'},
 fireworks(t,a){g.globalCompositeOperation='lighter';for(let k=0;k<5;k++){const T=(t+k*.7)%3.5,cx=W*(.15+czRnd(k+Math.floor((t+k*.7)/3.5)*5)*.7),cy=H*(.1+czRnd(k+3)*.25),col=['255,200,120','190,220,255','255,150,200','200,255,200','255,240,160'][k];if(T>2.2)continue;const r=T*55;for(let i=0;i<22;i++){const an=i/22*6.28;g.fillStyle='rgba('+col+','+(a*Math.max(0,1-T/2.2))+')';g.fillRect(cx+Math.cos(an)*r,cy+Math.sin(an)*r+T*T*6,2.2,2.2)}}g.globalCompositeOperation='source-over'},
 stars(t,a){g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?30:70);i++){const x=czRnd(i)*W,y=czRnd(i+9)*H*.6;g.fillStyle='rgba(230,236,255,'+(a*(.35+.35*Math.sin(t*2+i*1.7)))+')';g.fillRect(x,y,1.6,1.6)}g.globalCompositeOperation='source-over'},
 fallstars(t,a){g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?4:9);i++){const T=(t*.55+czRnd(i))%1,sx=W*(.2+czRnd(i+2)*.9),sy=-20,ex=sx-W*.5,ey=H*.7,x=sx+(ex-sx)*T,y=sy+(ey-sy)*T;const gr=g.createLinearGradient(x,y,x+60,y-80);gr.addColorStop(0,'rgba(255,250,220,'+a+')');gr.addColorStop(1,'rgba(160,190,255,0)');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+60,y-80);g.stroke();g.fillStyle='rgba(255,255,240,'+a+')';g.beginPath();g.arc(x,y,2.2,0,7);g.fill()}g.globalCompositeOperation='source-over'},
 compass(t,a){const [x,y]=czW2S(me.x+12,me.y-26);g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,y,1,x,y,30);gr.addColorStop(0,'rgba(200,220,255,'+(.8*a)+')');gr.addColorStop(1,'rgba(200,220,255,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,30,0,7);g.fill();g.globalCompositeOperation='source-over';g.strokeStyle='rgba(220,170,90,'+a+')';g.lineWidth=2;g.beginPath();g.arc(x,y,7,0,7);g.stroke();g.save();g.translate(x,y);g.rotate(Math.sin(t*2)*.6+.8);g.fillStyle='rgba(255,240,200,'+a+')';g.beginPath();g.moveTo(0,-6);g.lineTo(2,0);g.lineTo(0,6);g.lineTo(-2,0);g.fill();g.restore()},
 notes(t,a){g.font='16px system-ui';g.textAlign='center';for(let i=0;i<(LOWQ?6:12);i++){const T=(t*.18+czRnd(i))%1,x=W*(.1+czRnd(i+3)*.8)+Math.sin(t+i)*14,y=H*(.85-T*.75);g.fillStyle='rgba(255,236,190,'+(a*Math.sin(T*3.14)*.85)+')';g.fillText(i%2?'♪':'♫',x,y)}},
 crowd(t,a){const n=LOWQ?16:34;for(let i=0;i<n;i++){const row=i%3,x=W*czRnd(i+1)+Math.sin(t*.5+i)*3,y=H*(.5+row*.075),s=.65+row*.22;g.fillStyle='rgba(10,6,18,'+(.85*a)+')';g.beginPath();g.ellipse(x,y-26*s,7*s,8*s,0,0,7);g.fill();g.beginPath();g.moveTo(x-11*s,y);g.lineTo(x-8*s,y-18*s);g.lineTo(x+8*s,y-18*s);g.lineTo(x+11*s,y);g.fill();
   if(czRnd(i+7)>.4){g.fillStyle='rgba(255,210,140,'+(a*(.6+.4*Math.sin(t*2+i)))+')';g.fillRect(x-4*s,y-28*s,2,1.6);g.fillRect(x+2*s,y-28*s,2,1.6)}}}};
CZFX.pillar=(t,a,arg)=>{const [tok,col]=arg;const [x,y]=czFxPos(tok);const c=(col||'#ffe08a');const r=parseInt(c.slice(1,3),16),gg=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16),rgb=r+','+gg+','+b;const k=Math.min(1,t/.8),w=(22+8*Math.sin(t*5))*k;
  g.globalCompositeOperation='lighter';const lg=g.createLinearGradient(x-w,0,x+w,0);lg.addColorStop(0,'rgba('+rgb+',0)');lg.addColorStop(.5,'rgba('+rgb+','+(.55*a)+')');lg.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=lg;g.fillRect(x-w,-10,w*2,y+10);
  g.fillStyle='rgba(255,255,255,'+(.5*a*k)+')';g.fillRect(x-2,-10,4,y+10);for(let i=0;i<14;i++){const yy=y-((t*120+czRnd(i)*y)%Math.max(1,y));g.fillRect(x-w*.6+czRnd(i+2)*w*1.2,yy,2,2)}
  const gr=g.createRadialGradient(x,y,2,x,y,60);gr.addColorStop(0,'rgba('+rgb+','+(.6*a)+')');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.fillRect(x-60,y-60,120,120);g.globalCompositeOperation='source-over'};
function czCrack(t,a,yy,wd){const y0=H*yy,k=Math.min(1,t/1.8);g.save();const pts=[];const n=18;for(let i=0;i<=n;i++){const q=i/n;if(q>k)break;pts.push([W*q,y0+(czRnd(i)*2-1)*H*.06+Math.sin(q*9)*6])}if(pts.length<2){g.restore();return}
  g.globalCompositeOperation='lighter';for(let w=18*wd;w>0;w-=5){g.strokeStyle='rgba(170,90,255,'+(.08*a*(20*wd-w)/6)+')';g.lineWidth=w;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke()}
  g.globalCompositeOperation='source-over';g.strokeStyle='rgba(6,2,12,'+(.95*a)+')';g.lineWidth=3.5*wd;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();
  for(let i=2;i<pts.length;i+=3){const p=pts[i];g.lineWidth=1.4*wd;g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(p[0]+(czRnd(i+40)*2-1)*30,p[1]+20+czRnd(i)*26);g.stroke()}g.restore()}
function czEyes(t,a,rgb){const y=H*.2,dx=Math.min(70,W*.16),o=Math.min(1,t/1.2)*(.75+.25*Math.sin(t*1.7));g.globalCompositeOperation='lighter';for(const s of[-1,1]){const x=W/2+s*dx;const gr=g.createRadialGradient(x,y,1,x,y,46);gr.addColorStop(0,'rgba('+rgb+','+(.85*a*o)+')');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.fillRect(x-50,y-50,100,100);g.fillStyle='rgba(255,255,240,'+(a*o)+')';g.beginPath();g.ellipse(x,y,16,3.2*o+.5,s*.12,0,7);g.fill()}g.globalCompositeOperation='source-over'}
function czRoots(t,a,s){g.strokeStyle='rgba(16,8,12,'+(.92*a)+')';g.lineCap='round';const n=LOWQ?6:11;for(let i=0;i<n;i++){const side=i%3,k=Math.min(1,t/2.6+czRnd(i)*.2);let x=side===0?czRnd(i)*W:side===1?-6:W+6,y=side===0?H+6:H*(.5+czRnd(i+4)*.5);const tx=W*(.2+czRnd(i+8)*.6),ty=H*(.35+czRnd(i+2)*.35);g.lineWidth=7*s;
  g.beginPath();g.moveTo(x,y);const segs=8;for(let j=1;j<=segs*k;j++){const q=j/segs;g.lineTo(x+(tx-x)*q+Math.sin(q*9+i)*16,y+(ty-y)*q+Math.cos(q*7+i)*10);g.lineWidth=Math.max(1.5,7*s*(1-q))}g.stroke()}g.lineCap='butt'}
/* วาดทุกเฟรม: เอฟเฟกต์ (ใต้ขอบมืด) + การ์ด/แฟลช (บนสุด) */
function czScreen(){if(!CZ.on)return;czCamTick();if(!CZ.sc)return;const now=czNow(),T=now-CZ.T0,sh=CZ.shot,t=now-CZ.t0;g.save();
  try{if(CZ.sc.tint){g.fillStyle=CZ.sc.tint;g.fillRect(0,0,W,H)}const L=[...(CZ.sc.base||[]),...((sh&&sh.fx)||[])];const seen=new Set();for(const k of L){if(seen.has(k))continue;seen.add(k);const a=Math.min(1,t/.6);
    if(k.startsWith('pillar:')){const p=k.split(':');CZFX.pillar(t,a,[p[1],p[2]]);continue}const f=CZFX[k];if(f)f(k==='motes'||k==='notes'?T:t,(CZ.sc.base||[]).includes(k)?1:a)}}catch(e){}g.restore()}
function czTop(){if(!CZ.on)return;const now=czNow();g.save();try{
  if(CZ.fl){const q=(now-CZ.fl)/.7;if(q<1){g.fillStyle=CZ.flc||'#fff';g.globalAlpha=(1-q)*.85;g.fillRect(0,0,W,H);g.globalAlpha=1}else CZ.fl=0}
  const Tt=CZ.ttl;if(Tt){const q=now-Tt.t0;if(q>Tt.d)CZ.ttl=null;else{const a=Math.min(1,q/.7,(Tt.d-q)/.8),y=H*(Tt.end?.4:.34);g.globalAlpha=a;g.textAlign='center';
    const gr=g.createLinearGradient(0,y-60,0,y+40);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,'rgba(0,0,0,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,y-70,W,120);
    g.font='600 13px system-ui';g.fillStyle='#e8d0a0';g.fillText(Tt.end?'— '+Tt.a+' —':Tt.a,W/2,y-30);
    g.font='900 '+Math.min(30,W*.075)+'px system-ui';g.lineWidth=5;g.strokeStyle='rgba(20,10,4,.85)';g.strokeText(Tt.b||'',W/2,y+4);const lg=g.createLinearGradient(0,y-24,0,y+6);lg.addColorStop(0,'#fff6d8');lg.addColorStop(1,'#e8b050');g.fillStyle=lg;g.fillText(Tt.b||'',W/2,y+4);
    const lw=Math.min(W*.32,130)*Math.min(1,q/1.1);g.strokeStyle='rgba(232,184,80,.85)';g.lineWidth=1.2;g.beginPath();g.moveTo(W/2-lw-8,y+18);g.lineTo(W/2-8,y+18);g.moveTo(W/2+8,y+18);g.lineTo(W/2+lw+8,y+18);g.stroke();g.fillStyle='#e8b050';g.beginPath();g.moveTo(W/2,y+13);g.lineTo(W/2+5,y+18);g.lineTo(W/2,y+23);g.lineTo(W/2-5,y+18);g.fill();g.globalAlpha=1}}
}catch(e){}g.restore()}
try{gxAtmo=(f=>function(){const r=f.apply(this,arguments);try{czScreen()}catch(e){}return r})(gxAtmo)}catch(e){}
setTimeout(()=>{try{draw=(f=>function(){const r=f.apply(this,arguments);if(CZ.on)try{g.save();g.setTransform(DPR,0,0,DPR,0,0);czTop();g.restore()}catch(e){}return r})(draw)}catch(e){}},2500);

/* ---------- ดูซ้ำ: เมนูเนื้อเรื่อง ---------- */
const CZORD=['p1o','p1e','p2o','p2e','p3o','p3e','p4o','p4e','p5o','p5e','p6o','p6e','p7o','p7e'];
function czSeen(id){try{me.csn=me.csn||{};if(!me.csn[id]){me.csn[id]=1}}catch(e){}}
function czUnlocked(id){try{if(me.csn&&me.csn[id])return true;const L=CZDEF[id].get();if(!L)return false;const i=STY.findIndex(s=>s.pre===L||s.post===L);const q=me.sty||{s:0,a:0};if(id==='p1o')return true;if(i<0)return false;return q.s>i||(q.s===i&&q.a>=1)}catch(e){return false}}
function czReplay(id){const d=CZDEF[id];if(!d)return;let L=d.get();if(!L)return;const post=CZPOST[id]&&CZPOST[id]();ov.hidden=true;CZ.rp=1;
  stSay(L,()=>{CZ.rp=0;if(post&&post.length)setTimeout(()=>stSay(post,null,{cine:1}),60)},{cine:1})}
try{storyUI=(f=>function(){const r=f.apply(this,arguments);try{if(ov.dataset.k!=='story')return r;const pn=ov.querySelector('[data-pn="story"]');if(!pn)return r;
  const h='<div class="card"><div class="cap">🎬 ฉากสำคัญ · ดูซ้ำแบบคัตซีน</div>'+CZORD.map(id=>{const d=CZDEF[id],ok=czUnlocked(id);return'<div class="sr" style="padding:5px 0"><div class="nm"><b style="'+(ok?'':'opacity:.5')+'">'+(ok?'🎬 ':'🔒 ')+d.nm+'</b><small>'+d.sub+'</small></div>'+(ok?'<button class="rb" data-csr="'+id+'">ดู</button>':'')+'</div>'}).join('')+'</div>';
  const cards=pn.querySelectorAll('.card');const anchor=cards[1]||cards[0];if(anchor)anchor.insertAdjacentHTML('afterend',h);else pn.insertAdjacentHTML('beforeend',h);
  pn.querySelectorAll('[data-csr]').forEach(b=>b.onclick=e=>{e.stopPropagation();czReplay(b.dataset.csr)})}catch(e){}return r})(storyUI)}catch(e){}
/* ระหว่างคัตซีน: ซ่อนลูกศรนำทาง/ลูกศรเก็บของในโลก */
['ggDraw','aqDraw','onbArrow'].forEach(n=>{try{const f=window[n];if(typeof f!=='function')return;window[n]=function(){if(CZ.on)return;return f.apply(this,arguments)}}catch(e){}});
