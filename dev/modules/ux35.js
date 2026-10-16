/* ---------- v410 ชุดแฟชั่น (ตู้เสื้อผ้า) ----------
   ใส่ชุดทับหน้าตาได้ ค่าพลังยังมาจากอุปกรณ์จริงทั้งหมด · เพื่อนในห้องเห็นชุดและออร่า
   ชุด = หน้าตา 4 ช่อง (อาวุธ เกราะ หมวก รองเท้า) + ออร่าเฉพาะชุด
   ได้จาก: บอสประจำภูมิภาค (มีการันตี) · บอส MVP · แลกด้วย ✂️ ด้ายแฟชั่นจากกิจกรรม · รางวัลฤดูกาลขั้นโกลด์/แพลทินัม
   เซฟใน me.wdr = {o:{id:1}, on:'id', rw:โชว์อาวุธจริง, th:ด้าย, k:{id:นับบอส}} */
const WDR=[
 {id:'ref',n:'ชุดผู้อพยพ',e:'🧥',w:21,a:1,h:21,b:1,fa:0,s:'st',d:'ชุดเริ่มต้น · ได้ทันทีที่เปิดตู้เสื้อผ้า'},
 {id:'bon',n:'ชุดอัศวินกระดูก',e:'💀',w:32,a:12,h:52,b:12,fa:1,s:'bs',m:[2],d:'บอสหุบเขากระดูก'},
 {id:'fir',n:'ชุดอัคคีนรก',e:'🔥',w:35,a:15,h:15,b:15,fa:2,s:'bs',m:[3],d:'บอสดินแดนเพลิงนรก'},
 {id:'ice',n:'ชุดเทพน้ำแข็ง',e:'❄️',w:53,a:13,h:33,b:13,fa:3,s:'bs',m:[4],d:'บอสวิหารน้ำแข็งนิรันดร์'},
 {id:'twr',n:'ชุดผู้เฝ้าหอคอย',e:'✨',w:17,a:17,h:17,b:17,fa:6,s:'bs',m:[5],d:'บอสลานหอคอยวิญญาณ'},
 {id:'sea',n:'ชุดบาดาลลึก',e:'🫧',w:16,a:16,h:16,b:16,fa:4,s:'bs',m:[6],d:'บอสซากนครจมบาดาล'},
 {id:'gld',n:'ชุดคนขุดทอง',e:'💰',w:41,a:2,h:42,b:11,fa:13,s:'bs',m:[7],d:'บอสเหมืองทองร้าง'},
 {id:'phr',n:'ชุดฟาโรห์อมตะ',e:'🏺',w:35,a:15,h:55,b:15,fa:5,s:'mv',m:[8],d:'บอส MVP ฟาโรห์อมตะ (ทะเลทรายสุสานฟาโรห์)'},
 {id:'sky',n:'ชุดนครลอยฟ้า',e:'☁️',w:33,a:13,h:53,b:13,fa:20,s:'bs',m:[9],d:'บอสนครลอยฟ้าอัสตรา'},
 {id:'azl',n:'ชุดเทวทูตร่วง',e:'🪶',w:19,a:18,h:39,b:18,fa:11,s:'mv',m:[10],d:'บอส MVP อาซาเอล (ทุ่งรอยแยกนภา)'},
 {id:'rft',n:'ชุดหลังรอยแยก',e:'🌙',w:54,a:14,h:34,b:14,fa:15,s:'bs',m:[11],d:'บอสดินแดนหลังรอยแยก'},
 {id:'stm',n:'ชุดวิหารพายุ',e:'⚡',w:214,a:214,h:214,b:214,fa:7,s:'bs',m:'W',d:'บอสดินแดนลมตะวันตก (ภาค 4)'},
 {id:'tmp',n:'ชุดพญาวิหคพายุ',e:'🌪️',w:214,a:13,h:214,b:13,fa:12,s:'mv',m:'W',d:'บอส MVP เทมเปสต์ (ดินแดนลมตะวันตก)'},
 {id:'shd',n:'ชุดราชินีเงา',e:'🌑',w:114,a:114,h:114,b:114,fa:8,s:'bs',m:'S',d:'บอสแผ่นดินเงาใต้เมฆ'},
 {id:'rot',n:'ชุดรากพิภพ',e:'🌿',w:314,a:314,h:314,b:314,fa:9,s:'bs',m:'R',d:'บอสดินแดนรากพิภพ'},
 {id:'dwn',n:'ชุดเทวทูตรุ่งอรุณ',e:'😇',w:18,a:18,h:18,b:18,fa:10,s:'bs',m:'C',d:'บอสนครฟ้าและสะพานรุ่งอรุณ (ภาค 5–7)'},
 {id:'skr',n:'ชุดซากุระบาน',e:'🌸',w:9,a:9,h:29,b:9,fa:14,s:'ev',c:8,d:'แลกด้วยด้ายแฟชั่น'},
 {id:'smr',n:'ชุดคลื่นฤดูร้อน',e:'🌊',w:23,a:7,h:7,b:7,fa:16,s:'ev',c:8,d:'แลกด้วยด้ายแฟชั่น'},
 {id:'snw',n:'ชุดเทศกาลหิมะ',e:'☃️',w:12,a:18,h:32,b:12,fa:17,s:'ev',c:10,d:'แลกด้วยด้ายแฟชั่น'},
 {id:'hrt',n:'ชุดหัวใจหวาน',e:'💗',w:49,a:9,h:9,b:19,fa:21,s:'ev',c:12,d:'แลกด้วยด้ายแฟชั่น'},
 {id:'ssg',n:'ชุดแชมป์ฤดูกาล',e:'🏆',w:15,a:18,h:15,b:18,fa:18,s:'ss',d:'รางวัลฤดูกาลขั้นโกลด์'},
 {id:'ssp',n:'ชุดราชันย์ฤดูกาล',e:'👑',w:19,a:19,h:39,b:19,fa:19,s:'ss',d:'รางวัลฤดูกาลขั้นแพลทินัม'}];
const WDRM={};WDR.forEach(o=>WDRM[o.id]=o);
const WDR_BS=.06,WDR_BP=15,WDR_MV=.2,WDR_MVO=.08,WDR_MP=8;
const WDRSN={st:'เริ่มต้น',bs:'บอส',mv:'บอส MVP',ev:'กิจกรรม',ss:'ฤดูกาล'};
function wdrClean(c){if(!c||typeof c!=='object')return undefined;const o={o:{},on:'',rw:c.rw?1:0,th:Math.max(0,Math.min(9999,Math.floor(+c.th||0))),k:{}};
  if(c.o&&typeof c.o==='object')Object.keys(c.o).forEach(k=>{if(WDRM[k]&&c.o[k])o.o[k]=1});
  if(c.k&&typeof c.k==='object')Object.keys(c.k).forEach(k=>{if(WDRM[k]){const v=Math.floor(+c.k[k]||0);if(v>0)o.k[k]=Math.min(999,v)}});
  if(typeof c.on==='string'&&o.o[c.on])o.on=c.on;return o}
function wdrSt(){if(!me.wdr||typeof me.wdr!=='object')me.wdr={o:{},on:'',rw:0,th:0,k:{}};const W=me.wdr;W.o=W.o||{};W.k=W.k||{};return W}
const wdrOwn=id=>!!(me.wdr&&me.wdr.o&&me.wdr.o[id]);
function wdrCur(){const W=me.wdr;return W&&W.on&&W.o&&W.o[W.on]?WDRM[W.on]:null}
function myLk(sl){const O=wdrCur();if(O&&!(sl==='w'&&me.wdr.rw))return O[sl]|0;return lkc(me.eq&&me.eq[sl])}
function wdrFa(){const O=wdrCur();return O?O.fa|0:0}
function wdrRegion(){const c=curMap;try{if(isDg()||isTw())return null}catch(e){}
  for(const o of WDR){if(!o.m)continue;if(Array.isArray(o.m)?o.m.indexOf(c)>=0:(o.m==='W'&&WESTM(c))||(o.m==='S'&&SHADEM(c))||(o.m==='R'&&ROOTM(c))||(o.m==='C'&&CASTM(c))){if(o.s==='bs'||(o.s==='mv'&&Array.isArray(o.m)))return o}}return null}
function wdrMvp(){const c=curMap;for(const o of WDR){if(o.s!=='mv')continue;if(Array.isArray(o.m)?o.m.indexOf(c)>=0:o.m==='W'&&WESTM(c))return o}return null}
function wdrGive(id,src){const W=wdrSt(),O=WDRM[id];if(!O)return false;if(W.o[id])return false;W.o[id]=1;
  try{sfx('lvl')}catch(e){}try{burst(me.x,me.y-24,['#ffb0e0','#ffffff','#c8a0ff','#ffe08a'],34,150,1,{glow:1,g:-40})}catch(e){}
  banner={s:'👗 ได้ชุดแฟชั่นใหม่! '+O.e+' «'+O.n+'»'+(src?' · '+src:''),t:6};try{sysMsg('👗 ได้ชุดแฟชั่น '+O.e+' '+O.n+' (เปิดดูที่ 🎒 อุปกรณ์ › 👗 ตู้เสื้อผ้า)')}catch(e){}
  try{writeSave()}catch(e){}return true}
function wdrThread(n,src){if(!me.cls||!(n>0))return;const W=wdrSt();W.th=Math.min(9999,(W.th|0)+n);try{sysMsg('✂️ ได้ด้ายแฟชั่น +'+n+(src?' ('+src+')':'')+' · มี '+W.th)}catch(e){}}
/* บอสตาย (เรียกทุกเครื่องผ่าน bossLoot) */
function wdrBoss(x,y,mv){if(!me.cls||me.down>0||Math.hypot(me.x-x,me.y-y)>650)return;const W=wdrSt();
  const O=mv?(wdrMvp()||wdrRegion()):wdrRegion();
  if(O&&!W.o[O.id]){const isMv=O.s==='mv',P=isMv?WDR_MP:WDR_BP;W.k[O.id]=(W.k[O.id]|0)+1;const ch=isMv?(mv?WDR_MV:WDR_MVO):WDR_BS;
    if(Math.random()<ch||W.k[O.id]>=P){setTimeout(()=>wdrGive(O.id,mv?'บอส MVP':'ดรอปจากบอส'),1200);delete W.k[O.id]}}
  if(mv)wdrThread(1,'บอส MVP');else if(Math.random()<.04)wdrThread(1,'บอส')}
function wdrSeason(i){if(i===2){if(!wdrGive('ssg','รางวัลฤดูกาลขั้นโกลด์'))wdrThread(3,'ฤดูกาลขั้นโกลด์')}else if(i===3){if(!wdrGive('ssp','รางวัลฤดูกาลขั้นแพลทินัม'))wdrThread(4,'ฤดูกาลขั้นแพลทินัม')}else wdrThread(i+1,'รางวัลฤดูกาล')}
/* ===== ออร่าชุด (วาดหลังตัว ph=0 / หน้าตัว ph=1) ===== */
const FAN={1:'วิญญาณ',2:'ถ่านไฟ',3:'หิมะ',4:'ฟองน้ำ',5:'ทรายทอง',6:'ดวงดาว',7:'สายฟ้า',8:'เงา',9:'ใบไม้',10:'รัศมี',11:'ขนนก',12:'ลมหมุน',13:'ประกายทอง',14:'กลีบซากุระ',15:'จันทร์เสี้ยว',16:'ระลอกคลื่น',17:'เกล็ดหิมะ',18:'วงแชมป์',19:'มงกุฎ',20:'ปุยเมฆ',21:'หัวใจ'};
function fa4(x,y,r,c,a){g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*.28,y-r*.28);g.lineTo(x+r,y);g.lineTo(x+r*.28,y+r*.28);g.lineTo(x,y+r);g.lineTo(x-r*.28,y+r*.28);g.lineTo(x-r,y);g.lineTo(x-r*.28,y-r*.28);g.closePath();g.fill()}
function wdrAura(id,x,y,t,ph,full){if(!id)return;const n=LOWQ&&!full?.5:1,fy=y+15,N=k=>Math.max(2,Math.round(k*n)),fr=(i,k)=>{const s=Math.sin(i*127.1+k*311.7)*43758.5;return s-Math.floor(s)};
  g.save();
  if(id===1){g.globalCompositeOperation='lighter';for(let i=0;i<N(6);i++){if((i%2)!==ph)continue;const q=(t*.35+i/6)%1,a=Math.sin(q*Math.PI);const px=x+Math.sin(i*2.1+t*1.3)*13,py=fy-4-q*40;glowAt(px,py,6,'170,210,255',.55*a);g.fillStyle='rgba(235,245,255,'+(.8*a)+')';g.beginPath();g.arc(px,py,1.3,0,7);g.fill()}}
  else if(id===2){g.globalCompositeOperation='lighter';if(!ph)glowAt(x,fy-2,20,'255,110,40',.22);for(let i=0;i<N(8);i++){if((i%2)!==ph)continue;const q=(t*.6+i/8)%1,a=Math.sin(q*Math.PI);const px=x+(fr(i,1)-.5)*28+Math.sin(t*3+i)*2,py=fy-q*42;g.fillStyle='rgba(255,'+(140+(i*30)%100)+',60,'+(.9*a)+')';g.fillRect(px-.8,py-.8,1.6,1.6);glowAt(px,py,4,'255,120,40',.4*a)}}
  else if(id===3||id===17){const c=id===3?'235,245,255':'200,235,255';if(!ph&&id===17){g.globalCompositeOperation='lighter';glowAt(x,fy,22,'150,210,255',.22)}g.globalCompositeOperation='source-over';
    for(let i=0;i<N(9);i++){if((i%2)!==ph)continue;const q=(t*.22+i/9)%1,px=x+(fr(i,2)-.5)*40+Math.sin(t*1.5+i)*3,py=fy-46+q*52,a=Math.min(1,q*4,(1-q)*4)*.9;if(id===3){g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.arc(px,py,1.2,0,7);g.fill()}else{g.globalCompositeOperation='lighter';fa4(px,py,2.4,c,a)}}}
  else if(id===4){g.strokeStyle='rgba(170,225,255,.8)';for(let i=0;i<N(7);i++){if((i%2)!==ph)continue;const q=(t*.4+i/7)%1,a=Math.sin(q*Math.PI);const px=x+(fr(i,3)-.5)*30+Math.sin(t*2+i)*2,py=fy-2-q*44,r=1.2+fr(i,4)*2;g.globalAlpha=a;g.lineWidth=.7;g.beginPath();g.arc(px,py,r,0,7);g.stroke();g.fillStyle='rgba(255,255,255,.8)';g.fillRect(px-r*.5,py-r*.5,.8,.8)}}
  else if(id===5||id===13){const c=id===5?'240,200,110':'255,215,90';g.globalCompositeOperation='lighter';if(!ph)glowAt(x,fy,22,c,.2);for(let i=0;i<N(10);i++){if((i%2)!==ph)continue;const a0=t*(id===5?1.6:.9)+i*.628,rr=14+fr(i,5)*6,px=x+Math.cos(a0)*rr,py=fy-3-Math.abs(Math.sin(a0*.5+i))*(id===5?8:26)+Math.sin(a0)*4;const front=Math.sin(a0)>0;if((front?1:0)!==ph)continue;
      if(id===13&&i%3===0)fa4(px,py,2.2,'255,240,170',.85);else{g.fillStyle='rgba('+c+',.8)';g.fillRect(px-.8,py-.8,1.6,1.6)}}}
  else if(id===6){g.globalCompositeOperation='lighter';for(let i=0;i<N(5);i++){const a0=t*1.1+i*1.2566,px=x+Math.cos(a0)*17,py=y-6+Math.sin(a0)*5,front=Math.sin(a0)>0;if((front?1:0)!==ph)continue;fa4(px,py,2.6+Math.sin(t*4+i)*.6,'255,250,220',.9);glowAt(px,py,6,'200,190,255',.4)}}
  else if(id===7){if(ph){g.globalCompositeOperation='lighter';const k=Math.floor(t*9);for(let i=0;i<N(3);i++){if(fr(k,i)<.45)continue;const a0=fr(k,i+3)*6.283,px=x+Math.cos(a0)*16,py=y-4+Math.sin(a0)*14;g.strokeStyle='rgba(170,220,255,.9)';g.lineWidth=1;g.beginPath();g.moveTo(px,py);g.lineTo(px+3,py+4);g.lineTo(px-1,py+6);g.lineTo(px+2,py+10);g.stroke();glowAt(px+1,py+5,6,'120,200,255',.5)}}else{g.globalCompositeOperation='lighter';glowAt(x,fy,20,'110,180,255',.18+.08*Math.sin(t*8))}}
  else if(id===8){if(!ph){for(let i=0;i<N(7);i++){const q=(t*.3+i/7)%1,a=Math.sin(q*Math.PI);const px=x+(fr(i,6)-.5)*30,py=fy-q*18,r=4+q*6;g.fillStyle='rgba(30,10,50,'+(.32*a)+')';g.beginPath();g.arc(px,py,r,0,7);g.fill()}}else{g.globalCompositeOperation='lighter';for(let i=0;i<N(3);i++){const q=(t*.5+i/3)%1;glowAt(x+Math.sin(i*2+t)*10,fy-q*30,3,'190,120,255',.6*Math.sin(q*Math.PI))}}}
  else if(id===9||id===14||id===11){const c=id===9?['120,200,90','170,230,110']:id===14?['255,170,210','255,205,230']:['250,250,255','230,235,255'];
    for(let i=0;i<N(7);i++){if((i%2)!==ph)continue;const q=(t*(id===11?.16:.22)+i/7)%1,px=x+(fr(i,7)-.5)*44+Math.sin(t*1.7+i)*5+(id===14?q*10:0),py=fy-48+q*54,a=Math.min(1,q*5,(1-q)*5),rot=t*2+i;
      g.save();g.translate(px,py);g.rotate(rot);g.globalAlpha=a*.9;g.fillStyle='rgb('+c[i%2]+')';g.beginPath();if(id===11){g.ellipse(0,0,1.1,3.4,0,0,7)}else g.ellipse(0,0,2.4,1.3,0,0,7);g.fill();g.restore()}}
  else if(id===10){if(!ph){g.globalCompositeOperation='lighter';glowAt(x,fy,20,'255,220,130',.2)}else{g.globalCompositeOperation='lighter';const hy=y-31+Math.sin(t*2)*.8;g.strokeStyle='rgba(255,226,140,.9)';g.lineWidth=1.3;g.beginPath();g.ellipse(x+1,hy,7,2.2,0,0,7);g.stroke();glowAt(x+1,hy,9,'255,220,120',.35);
      for(let i=0;i<N(4);i++){const q=(t*.5+i/4)%1;fa4(x+Math.sin(i*1.9+t)*12,fy-6-q*34,1.6,'255,240,190',.8*Math.sin(q*Math.PI))}}}
  else if(id===12||id===20){const c=id===12?'170,240,255':'255,255,255';if(id===20&&!ph){for(let i=0;i<N(4);i++){const a0=t*.5+i*1.57,px=x+Math.cos(a0)*16,py=fy+1+Math.sin(a0)*3;g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.arc(px,py,4.5,0,7);g.arc(px+4,py+1,3.5,0,7);g.fill()}}
    if(id===12){g.globalCompositeOperation='lighter';for(let i=0;i<N(3);i++){const a0=t*3+i*2.09,h=fy-8-i*10;g.strokeStyle='rgba('+c+',.5)';g.lineWidth=1.1;g.beginPath();g.ellipse(x,h,15-i*2,4,0,ph?a0:a0+Math.PI,(ph?a0:a0+Math.PI)+1.6);g.stroke()}}
    else if(ph){g.globalCompositeOperation='lighter';for(let i=0;i<N(3);i++){const q=(t*.4+i/3)%1;fa4(x+Math.sin(i*2.4+t)*14,fy-4-q*30,1.6,'230,245,255',.7*Math.sin(q*Math.PI))}}}
  else if(id===15){if(!ph){g.globalCompositeOperation='lighter';const mx=x-10,my=y-30+Math.sin(t*1.2)*1.5;glowAt(mx,my,12,'190,200,255',.35);g.fillStyle='rgba(235,240,255,.95)';g.beginPath();g.arc(mx,my,5,0,7);g.fill();g.globalCompositeOperation='destination-out';g.beginPath();g.arc(mx+2.4,my-1.2,4.4,0,7);g.fill()}
    else{g.globalCompositeOperation='lighter';for(let i=0;i<N(4);i++){const q=(t*.3+i/4)%1;g.fillStyle='rgba(220,225,255,'+(.8*Math.sin(q*Math.PI))+')';g.fillRect(x+Math.sin(i*2.7+t*.7)*14,fy-4-q*36,1.4,1.4)}}}
  else if(id===16){if(!ph){for(let i=0;i<2;i++){const q=(t*.6+i/2)%1;g.strokeStyle='rgba(140,210,255,'+(.6*(1-q))+')';g.lineWidth=1.2;g.beginPath();g.ellipse(x,fy,8+q*18,3+q*6,0,0,7);g.stroke()}}else{for(let i=0;i<N(3);i++){const q=(t*.7+i/3)%1;g.fillStyle='rgba(200,240,255,'+(.8*(1-q))+')';g.beginPath();g.arc(x+(fr(i,9)-.5)*20,fy-2-Math.sin(q*Math.PI)*10,1.1,0,7);g.fill()}}}
  else if(id===18){if(!ph){g.globalCompositeOperation='lighter';glowAt(x,fy,22,'255,210,90',.22);g.strokeStyle='rgba(255,215,100,.75)';g.lineWidth=1.2;g.setLineDash([4,3]);g.lineDashOffset=-t*12;g.beginPath();g.ellipse(x,fy,16,5.5,0,0,7);g.stroke();g.setLineDash([])}
    for(let i=0;i<3;i++){const a0=t*1.4+i*2.094,front=Math.sin(a0)>0;if((front?1:0)!==ph)continue;const px=x+Math.cos(a0)*16,py=fy+Math.sin(a0)*5.5-3;g.globalCompositeOperation='lighter';fa4(px,py,2.8,i===0?'255,120,90':i===1?'120,220,255':'160,255,140',.95)}}
  else if(id===19){if(ph){const cy=y-33+Math.sin(t*2)*1;g.fillStyle='#ffd24a';g.strokeStyle='#7a4a10';g.lineWidth=.6;g.beginPath();g.moveTo(x-5,cy+2);g.lineTo(x-5,cy-2);g.lineTo(x-2.5,cy);g.lineTo(x,cy-3.5);g.lineTo(x+2.5,cy);g.lineTo(x+5,cy-2);g.lineTo(x+5,cy+2);g.closePath();g.fill();g.stroke();
      g.globalCompositeOperation='lighter';glowAt(x,cy,9,'255,210,120',.4);for(let i=0;i<N(4);i++){const q=(t*.45+i/4)%1;fa4(x+Math.sin(i*2.2+t)*15,fy-4-q*36,1.8,i%2?'210,160,255':'255,230,150',.85*Math.sin(q*Math.PI))}}
    else{g.globalCompositeOperation='lighter';glowAt(x,fy,22,'190,130,255',.22)}}
  else if(id===21){for(let i=0;i<N(5);i++){if((i%2)!==ph)continue;const q=(t*.35+i/5)%1,a=Math.sin(q*Math.PI),px=x+(fr(i,11)-.5)*32+Math.sin(t*2+i)*3,py=fy-4-q*40,s=1.6+fr(i,12);g.fillStyle='rgba(255,'+(110+(i*40)%80)+',170,'+(.9*a)+')';g.beginPath();g.moveTo(px,py+s);g.bezierCurveTo(px-s*2,py-s*.4,px-s,py-s*1.8,px,py-s*.6);g.bezierCurveTo(px+s,py-s*1.8,px+s*2,py-s*.4,px,py+s);g.fill()}}
  g.restore()}
/* ===== ตู้เสื้อผ้า (อยู่ในห้องดูตัวละคร หน้า 🎒 อุปกรณ์) ===== */
function wdrProg(O){const W=me.wdr||{},k=(W.k&&W.k[O.id])|0;if(O.s==='bs')return' · การันตี '+k+'/'+WDR_BP;if(O.s==='mv')return' · การันตี '+k+'/'+WDR_MP;return''}
function wdrHTML(){if(!me.cls)return'';const W=wdrSt();if(!W.o.ref)W.o.ref=1;const on=wdrCur(),own=WDR.filter(o=>W.o[o.id]).length;
  /* หน้าอุปกรณ์: บอกแค่ชุดที่สวม + ทางไปเต็นท์ · เปลี่ยนชุดได้ที่ตู้เสื้อผ้าในเต็นท์ (v411) */
  if(ov.dataset.k!=='wdr')return'<div style="margin:8px 0 2px;padding:7px 9px;border-radius:10px;background:rgba(255,190,230,.07);border:1px dashed rgba(255,190,230,.35);font-size:12px;display:flex;align-items:center;gap:8px;justify-content:space-between">'+
    '<span>👗 <b>'+(on?on.e+' '+on.n:'ไม่ได้สวมชุดแฟชั่น')+'</b> · สะสม '+own+'/'+WDR.length+'<br><small style="opacity:.75">เปลี่ยนชุดได้ที่ตู้เสื้อผ้าในเต็นท์ของคุณ</small></span>'+
    (tentMine()?'':'<button data-wdgo="1" style="font-size:11px;padding:4px 9px;white-space:nowrap">🏠 ไปเต็นท์</button>')+'</div>';
  let h=on?'<div style="display:flex;justify-content:center;margin:8px 0 4px"><button class="tab sm" data-wdx="1" style="font-size:12px;padding:5px 12px">ถอดชุด '+on.e+' (โชว์อุปกรณ์จริง)</button></div>':'';
  h+='<div style="margin:4px 0 6px;padding:8px;border-radius:10px;background:rgba(255,190,230,.07);border:1px solid rgba(255,190,230,.3);font-size:12px">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap"><b>👗 ชุดที่สวม: '+(on?on.e+' '+on.n:'ไม่สวม (โชว์อุปกรณ์จริง)')+'</b><span>✂️ ด้ายแฟชั่น <b>'+(W.th|0)+'</b></span></div>'+
    '<label style="display:flex;align-items:center;gap:6px;margin-top:6px"><button class="tab sm" data-wdr="1" style="font-size:11px;padding:3px 8px">'+(W.rw?'☑️':'⬜')+' โชว์อาวุธจริงขณะใส่ชุด</button><small style="opacity:.75">ค่าพลังมาจากอุปกรณ์จริงเสมอ</small></label></div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">'+WDR.map(O=>{const ow=!!W.o[O.id],cur=on&&on.id===O.id,pv=GPV.pf===O.id;
    const st=ow?(cur?'<b style="color:#9fe89f">✓ สวมอยู่</b>':'<button class="pri" data-wdo="'+O.id+'" style="font-size:11px;padding:3px 10px">สวม</button>'):O.s==='ev'?'<button data-wdb="'+O.id+'" style="font-size:11px;padding:3px 8px"'+((W.th|0)>=O.c?'':' disabled')+'>แลก ✂️'+O.c+'</button>':'<small style="opacity:.7">🔒</small>';
    return'<div data-wdp="'+O.id+'" style="cursor:pointer;padding:7px;border-radius:10px;background:'+(pv?'rgba(255,210,240,.16)':'rgba(255,255,255,.04)')+';border:1px solid '+(cur?'#9fe89f':pv?'#ffb0e0':ow?'rgba(255,216,140,.45)':'rgba(255,255,255,.12)')+';'+(ow?'':'opacity:.82;')+'font-size:11px">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:4px"><b style="font-size:12px">'+O.e+' '+O.n+'</b></div>'+
      '<small style="display:block;opacity:.75;margin:2px 0 4px">'+WDRSN[O.s]+' · '+O.d+(ow?'':wdrProg(O))+(O.fa?' · ออร่า'+FAN[O.fa]:'')+'</small>'+
      '<div style="display:flex;justify-content:space-between;align-items:center">'+st+'<small style="opacity:.6">'+(pv?'👀 กำลังดู':'แตะเพื่อดู')+'</small></div></div>'}).join('')+'</div>';
  return h}
function wdrClick(e){const b=e.target.closest&&e.target.closest('[data-wdgo],[data-wdx],[data-wdr],[data-wdo],[data-wdb],[data-wdp]');if(!b||!me.cls)return;e.stopPropagation();const W=wdrSt();let msg='';
  if(b.dataset.wdgo){try{sfx('click')}catch(_){}tentHome();return}
  if(b.dataset.wdx){W.on='';GPV.pf=null;msg='ถอดชุดแฟชั่นแล้ว · โชว์อุปกรณ์จริง'}
  else if(b.dataset.wdr){W.rw=W.rw?0:1}
  else if(b.dataset.wdo){const id=b.dataset.wdo;if(W.o[id]){W.on=id;GPV.pf=null;msg='สวม '+WDRM[id].e+' '+WDRM[id].n+' แล้ว · เพื่อนในห้องเห็นด้วย';try{burst(me.x,me.y-24,['#ffb0e0','#ffffff'],18,110,.6,{glow:1,g:-30})}catch(_){}}}
  else if(b.dataset.wdb){const O=WDRM[b.dataset.wdb];if(O&&O.s==='ev'&&!W.o[O.id]&&(W.th|0)>=O.c){W.th-=O.c;wdrGive(O.id,'แลกด้วยด้าย ✂️'+O.c);GPV.pf=O.id}}
  else if(b.dataset.wdp){const id=b.dataset.wdp;GPV.pf=GPV.pf===id?null:id;GPV.pose='idle';GPV.t0=performance.now()}
  try{sfx('click')}catch(_){}try{gsel=null}catch(_){}try{writeSave()}catch(_){}if(ov.dataset.k==='wdr')wardrobeUI(msg||undefined);else gearUI(msg||undefined)}
/* ===== v411 ตู้เสื้อผ้าในเต็นท์ (ผนังขวา ตรงข้ามเตาผิง) ===== */
const WDX=()=>TRX1-58,WDY=()=>CY-58;
function wdrNear(){try{return tentMine()&&Math.hypot(me.x-WDX(),me.y-(WDY()+10))<95}catch(e){return false}}
function wardrobeUI(msg){if(!me.cls)return;ov.dataset.k='wdr';const W=wdrSt();if(!W.o.ref)W.o.ref=1;gsel=null;
  let h=hdr('👗','ตู้เสื้อผ้า','ชุดแฟชั่นเปลี่ยนแค่หน้าตา · ค่าพลังมาจากอุปกรณ์จริงเสมอ')+(msg?'<div class="note">'+msg+'</div>':'');
  h+='<div class="card">'+gpvHTML()+'</div>';
  ov.innerHTML='<div class="pn" data-pn="wdr">'+h+'</div>';ov.hidden=false}
function tvWardrobe(x,y,t,mine){const O='#1a100a',near=mine&&Math.hypot(me.x-x,me.y-(y+10))<95,op=WDOP.v+=((near?1:0)-WDOP.v)*.12;
  gxShadow(x,y+4,34,7,.5);
  /* ตัวตู้ */tvP([x-28,y-96,x+28,y-96,x+28,y,x-28,y],'#6a4226',O,1.2);tvP([x-32,y-104,x+32,y-104,x+30,y-96,x-30,y-96],'#86562e',O,1);
  {const gr=g.createLinearGradient(x-28,0,x+28,0);gr.addColorStop(0,'rgba(0,0,0,.25)');gr.addColorStop(.5,'rgba(255,220,170,.06)');gr.addColorStop(1,'rgba(0,0,0,.3)');g.fillStyle=gr;g.fillRect(x-28,y-96,56,96)}
  g.fillStyle='#4a2e18';g.fillRect(x-28,y-6,56,6);g.fillRect(x-26,y,5,5);g.fillRect(x+21,y,5,5);
  /* ช่องในตู้ + ชุดที่แขวน (เห็นเมื่อประตูเปิด) */
  const ix0=x-25,iw=50,iy0=y-92,ih=80;g.fillStyle='#24140a';g.fillRect(ix0,iy0,iw,ih);
  if(op>.02){g.strokeStyle='#b89060';g.lineWidth=1.2;g.beginPath();g.moveTo(ix0+2,iy0+8);g.lineTo(ix0+iw-2,iy0+8);g.stroke();
    const own=WDR.filter(o=>me.wdr&&me.wdr.o&&me.wdr.o[o.id]).slice(-5),n=Math.max(1,own.length);
    own.forEach((o,i)=>{const cx=ix0+6+(iw-12)*(n===1?.5:i/(n-1)),sw=Math.sin(t*1.6+i)*1.2;const P=TPAL[lkX(o.a)?9+lkX(o.a):lkT(o.a)===9?9:lkB(o.a)]||TPAL[1];
      g.strokeStyle='#d8c8a0';g.lineWidth=.8;g.beginPath();g.moveTo(cx,iy0+8);g.lineTo(cx-4,iy0+13);g.lineTo(cx+4,iy0+13);g.closePath();g.stroke();
      tvP([cx-6+sw*.3,iy0+13,cx+6+sw*.3,iy0+13,cx+7+sw,iy0+40,cx-7+sw,iy0+40],P.m,O,.6);g.fillStyle=P.gd||'#c8a050';g.fillRect(cx-6+sw*.6,iy0+24,12,2);
      if(o.fa){g.save();g.globalCompositeOperation='lighter';glowAt(cx+sw,iy0+28,9,'255,200,240',.25+.15*Math.sin(t*3+i));g.restore()}});
    g.fillStyle='rgba(0,0,0,.35)';g.fillRect(ix0,iy0+44,iw,2);
    /* กระจกบานล่าง */const gr=g.createLinearGradient(0,iy0+48,0,iy0+ih);gr.addColorStop(0,'#9ab8d0');gr.addColorStop(1,'#5a7890');g.fillStyle=gr;g.fillRect(ix0+6,iy0+50,iw-12,ih-54);
    g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.moveTo(ix0+10,iy0+52);g.lineTo(ix0+18,iy0+52);g.lineTo(ix0+10,iy0+66);g.closePath();g.fill()}
  /* บานประตู 2 บาน (เปิดออกเมื่อเดินเข้าใกล้) */
  for(const s of[-1,1]){const hx=x+s*28,w=25*(1-op*.82);const px=hx-s*w;tvP([hx,y-93,px,y-93-op*4,px,y-3+op*4,hx,y-3],op>.5?'#7a4e2a':'#7e5030',O,1);
    if(w>6){g.strokeStyle='rgba(30,16,8,.6)';g.lineWidth=.8;g.strokeRect(Math.min(hx,px)+3,y-86,Math.abs(w)-6,34);g.strokeRect(Math.min(hx,px)+3,y-46,Math.abs(w)-6,36);
      g.fillStyle='#d8a85a';g.beginPath();g.arc(px+s*3.2,y-50,1.6,0,7);g.fill()}}
  /* ป้าย + ประกาย */const own=WDR.filter(o=>me.wdr&&me.wdr.o&&me.wdr.o[o.id]).length;
  if(mine){g.font='bold 8px system-ui';g.textAlign='center';g.fillStyle='rgba(255,230,190,.9)';g.fillText('👗 ตู้เสื้อผ้า '+own+'/'+WDR.length,x,y-110);
    if(!near){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const q=(t*.5+i/3)%1;fa4(x-20+i*20,y-96-q*14,1.6,'255,220,240',.7*Math.sin(q*Math.PI))}g.restore()}}}
const WDOP={v:0};
setTimeout(()=>{
  try{const _t=drawTent;drawTent=function(){const r=_t.apply(this,arguments);try{if(tentHere())tvWardrobe(WDX(),WDY(),performance.now()/1000,tentMine())}catch(e){}return r}}catch(e){}
  /* ผู้เล่นทุกคน: วาดออร่าชุดหลัง/หน้าตัว */
  try{const _d=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const fa=!down&&lk&&lk.fa|0,t=performance.now()/1000;
      if(fa)try{wdrAura(fa,x,y,t,0)}catch(e){}const r=_d.apply(this,arguments);if(fa)try{wdrAura(fa,x,y,t,1)}catch(e){}return r}}catch(e){}
  try{const _bl=bossLoot;bossLoot=function(x,y,mv){const r=_bl.apply(this,arguments);try{wdrBoss(x,y,!!mv)}catch(e){}return r}}catch(e){}
  try{const _cl=claimLogin;claimLogin=function(){let d=0;try{d=loginReady()?loginDay():0}catch(e){}const r=_cl.apply(this,arguments);try{if(d===7)wdrThread(2,'ล็อกอินครบ 7 วัน')}catch(e){}return r}}catch(e){}
  document.addEventListener('click',wdrClick,true);
},760);
