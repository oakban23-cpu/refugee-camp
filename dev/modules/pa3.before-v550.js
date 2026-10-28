
/* ---------- v549 ภาค 10 บทที่ 3 «คำมั่นของทุกเมือง» ----------
   ไม่มีแมพใหม่: ขึ้นไปขอคำมั่นจาก 8 แห่ง (คุย NPC ที่มีป้าย 🤝 · ออโต้เควสพาไปทีละเมือง) · ธุลีถือโคมเห็ดเดินตามไปทุกเมือง
   คำมั่นแยกตามทางเลือกเก่า: e6 อัสตรา · e7 อารัณยา · p7m คาร์น · p8g กองเรือ · e8 วาฬดาว · e9 ห้วงดาว · e หอคอย · e4 รากพิภพ
   หลังนำคำมั่นลงไป (pa3k): นครรากลึกมีของจากทุกเมือง · ปากเหวมีเรือเหาะลอยหย่อนเชือก คนจากทุกเมือง และธงแปดผืน */
const PAQ8=[['qn',[9],'อัสตรา','👑'],['eda3',[32],'อารัณยา','🧶'],['brom',[35],'เหมืองคาร์น','⛏️'],['sara',[38],'กองเรือนาวาเมฆ','⚓'],['navin',[38],'วาฬดาว','🐋'],['cel42',[42],'ห้วงดาว','🔭'],['tw',[5],'หอคอยร้อยชั้น','🕯️'],['kn',[23,25,26],'รากพิภพ','⚔️']];
const PCWHO=['ราชินีเอลิรา','ยายเอดา','บรอม','กัปตันซารา','นาวิน','เซเลสต์','ผู้เฝ้าหอคอย','อัลดริค'];
const pqF=k=>(me.sty&&me.sty[k])|0,pc2=k=>pqF(k)===2;
const pcGot=i=>p6Past('pa3p')||!!(me.sty&&((me.sty.pa3p|0)>>i&1));
const gPC=()=>p6Past('pa3k');
function pcCard(i){return[pc2('e6')?'องครักษ์ดาวทุกคนลงไปถือหอกค้ำรากที่อ่อนที่สุด':'ช่างแก้วดาวทำโคมให้ทุกบ้านในนครรากลึก',
  pc2('e7')?'ผ้าทอลายเฟืองตะวันห่มต้นค้ำทุกต้น':'เชือกลายเฟืองตะวันผูกรากที่ร้าวทุกเส้น',
  pc2('p7m')?'คนขุดของสหกรณ์คาร์นขุดรางยางทองใหม่ทุกเส้น':'รางเหมืองและรถเข็นทุกคันของคาร์น (บรอมให้ยืมฟรี ครั้งเดียวในชีวิต)',
  'เรือเหาะทุกลำหย่อนเชือกลงเหว · '+(pc2('p8g')?'ลูกเรือเรือดำวางดาบแล้วหยิบพลั่ว':'เรือดำเปิดท้องเรือรับคนรากลึก'),
  pc2('e8')?'โซ่ดาวของโอเรียนรัดรอยร้าวของแผ่นดิน':'เพลงวาฬดาวในคืนเพ็ญปลุกรากให้โต',
  pc2('e9')?'ด้ายดาวจากสะพานดาวผูกฟ้ากับแผ่นดินไว้ด้วยกัน':'กระจกของโอเรียนส่องแสงดาวลงนครรากลึกทุกคืน',
  pc2('e')?'ถอนหมุดฐานหอคอยทั้งร้อย ให้หอคอยหยุดตอกแผ่นดิน':'คลายหมุดฐานหอคอยทีละชั้น ให้แผ่นดินได้หายใจ',
  pc2('e4')?'เปิดรอยผนึกหนึ่งนิ้ว ให้ยางทองไหลลงรางเก่าอีกครั้ง':'เมล็ดหัวใจเมล็ดสุดท้ายที่เทพฝากไว้'][i]}
/* บทพูดตอนขอคำมั่น (เลือกตามทางเลือกเก่า · ถ้ายังไม่เคยเลือก ใช้แบบที่ 1) */
function pcLines(i){const v=(k,a,b)=>pc2(k)?b:a;switch(i){
 case 0:return[['qn','(ราชินีเอลิราฟังเรื่องนครรากลึกจนจบ แล้วนิ่งไปนาน) …สามร้อยปีที่อัสตราลอยอยู่บนฟ้า ไม่เคยมีใครในวังถามเลยว่าอะไรแบกแผ่นดินไว้ข้างล่าง'],
  ['thu','(ธุลีแอบอยู่หลังท่าน มองมงกุฎดาวตาไม่กะพริบ) …ท่านเป็นราชินีจริง ๆ เหรอ? มงกุฎของท่านสว่างกว่าโคมของข้าอีก'],
  ['qn',v('e6','(ราชินีย่อตัวลงจนสายตาเสมอกับเด็กหญิง) แสงหัวใจที่เราแบ่งให้อารัณยาสอนข้าว่า แสงที่แบ่งออกไปไม่เคยหายไปไหน… ช่างแก้วดาวของอัสตราจะลงไปทำโคมให้ทุกบ้านในนครรากลึก',
    '(ราชินีย่อตัวลงจนสายตาเสมอกับเด็กหญิง) ผู้ถือตราเคยสาบานว่าจะสร้างหัวใจดวงใหม่ และทำได้จริง… คราวนี้ให้อัสตราสาบานบ้าง องครักษ์ดาวทุกคนจะลงไปถือหอกค้ำรากที่อ่อนที่สุด')],
  ['qn','ฝากบอกเฒ่าแก่นไม้ด้วยว่า ราชินีแห่งอัสตราขอโทษ… ที่บรรพบุรุษของข้าลืมพวกเขาไว้ใต้ฐานหอคอย']];
 case 1:return[['eda','(ยายเอดาวางกระสวยทอผ้าลง) คนงานเหมืองที่ขุดฐานหอคอย… ตอนยายยังเด็ก ยายเคยได้ยินเพลงกล่อมท่อนหนึ่งที่ไม่มีใครรู้ว่ามาจากไหน'],
  ['eda','«ใต้รากมีบ้าน ใต้บ้านมีราก · หลับเถิดลูก แผ่นดินยังมีคนแบก»… ยายเพิ่งรู้วันนี้เองว่ามันเป็นเพลงของใคร'],
  ['thu','ข้าร้องเพลงนั้นได้! แม่ร้องให้ข้าฟังทุกคืน… (ธุลีร้องเบา ๆ ยายเอดาร้องตามจนจบท่อน)'],
  ['eda',v('e7','อารัณยาลอยคืนฟ้าได้เพราะมีหัวใจ แต่หอคอยที่ตอกลงไปก็เป็นความผิดของอารัณยาเอง… ชาวอารัณยาทุกคนจะลงไปถักเชือกลายเฟืองตะวัน ผูกรากที่ร้าวทุกเส้น',
    'หัวใจดวงใหม่อยู่ที่นครลี้ภัยแล้ว ยายเลยมีเวลาเหลือทั้งปี… ยายจะทอผ้าลายเฟืองตะวันห่มต้นค้ำทุกต้น ให้มันรู้ว่าอารัณยาไม่ลืมแล้ว')]];
 case 2:return pc2('p7m')?[['brom','(บรอมยิ้มกว้าง) สหกรณ์ประชุมกันเมื่อคืน ทุกมือยกขึ้นพร้อมกันก่อนข้าพูดจบอีก'],
  ['brom','คนขุดของเราขุดเป็นอย่างเดียว… งั้นก็ให้ขุดสิ่งที่ควรขุด รางยางทองใหม่ทุกเส้น สหกรณ์คาร์นจะขุดให้เอง'],['thu','(ธุลีจ้องหมวกเหล็กของคนงาน) คนข้างบนก็ขุดดินเหมือนพวกเราเลย…']]
  :[['brom','(บรอมเคาะเหรียญบนโต๊ะ) ยางทองเหรอ… ข้าค้าขายมาทั้งชีวิต ไม่เคยเจอของที่มีค่ากว่าแผ่นดินใต้เท้าตัวเองเลย'],
  ['brom','รางเหมืองกับรถเข็นทุกคันของคาร์น ข้าให้ยืมฟรี — ครั้งเดียวในชีวิตที่บรอมให้ของฟรี เอาไปเล่าให้ลูกหลานฟังด้วยนะ'],['thu','(ธุลีกระซิบ) เขาพูดคำว่าฟรีเหมือนมันเจ็บคอ…']];
 case 3:return[['sara','กองเรือนาวาเมฆรู้ดีว่าการไม่มีแผ่นดินเป็นยังไง… เราจะไม่ปล่อยให้ใครเสียแผ่นดินอีก'],
  ['sara','เรือเหาะทุกลำจะหย่อนเชือกลงเหว ส่งยาง ส่งคน ส่งของ ขึ้นลงได้ทั้งวันทั้งคืน'],
  ['grif',v('p8g','(กริฟพิงเสากระโดง) เด็กสี่สิบคนของข้าโตเป็นลูกเรือกันหมดแล้ว… ท่าเรือเคยเปิดให้เรือดำ คราวนี้เรือดำจะเปิดท้องเรือให้คนรากลึกบ้าง',
    '(กริฟพิงเสากระโดง) ท่าเรือเคยให้ข้าวางอาวุธก่อนขึ้นฝั่ง… คราวนี้ข้าจะวางดาบอีกครั้ง แล้วหยิบพลั่วแทน ลูกเรือเรือดำจะลงไปขุดเป็นลำแรก')]];
 case 4:return[['navin','(นาวินแนบหูกับเข็มทิศเสียง) เดี๋ยวนะ… เข็มทิศชี้ลงพื้น! มันไม่เคยชี้ลงพื้นมาก่อนเลย'],
  ['navin',v('e8','ยายวาฬได้ยินแล้ว! คืนเพ็ญหน้ามันจะร้องเพลงลงมาที่ปากเหว… ยายเมฆาบอกว่าเพลงวาฬทำให้รากโตเร็วขึ้น',
    'วาฬใต้ทะเลเมฆยังร้องอยู่ใต้โซ่ทุกคืน… ยามป้อมผนึกบอกว่าจะเอาโซ่ดาวของโอเรียนเส้นที่เหลือ ลงไปรัดรอยร้าวของแผ่นดินแทน')],
  ['navin','แล้วข้ากับทิลจะลงไปด้วย! ข้าอยากรู้ว่าเสียงใต้แผ่นดินฟังเป็นยังไง']];
 case 5:return[['cel','(เซเลสต์ลดกล้องดูดาวลง) ข้ามองฟ้ามาทั้งชีวิต… ไม่เคยคิดจะก้มมองใต้เท้าตัวเองเลยสักครั้ง'],
  ['cel',v('e9','ดาวทุกดวงกลับขึ้นฟ้าแล้ว ฟ้าสว่างที่สุดตั้งแต่มีอัสตรา… ข้าจะตั้งกระจกของโอเรียนที่ปากเหว สะท้อนแสงดาวลงไปให้นครรากลึกได้เห็นดาวทุกคืน',
    'สะพานดาวทอเสร็จแล้ว ลูมิน่าเฝ้าอยู่ปลายสะพาน… นางบอกว่าด้ายดาวเส้นที่เหลือทอเป็นรากได้ ข้าจะเอามันลงไปผูกฟ้ากับแผ่นดินไว้ด้วยกัน')],
  ['thu','ดาว… ที่ข้านับไม่หมดน่ะเหรอ? (ธุลีเงยหน้ามองห้วงดาวจนเกือบหงายหลัง)']];
 case 6:return[['tw','(เปลวเทียนของผู้เฝ้าหอคอยสั่นไหว) หอคอยร้อยชั้นนี้ข้าเฝ้ามาสามร้อยปี… ข้าไม่เคยรู้เลยว่าฐานของมันตอกทับใครไว้'],
  ['tw',v('e','ผนึกยังต้องอยู่ แต่หอคอยไม่จำเป็นต้องกดแรงขนาดนี้… ข้าจะคลายหมุดฐานชั้นล่างสุดทีละชั้น ให้แผ่นดินได้หายใจ',
    'เทพใต้ผนึกจากไปแล้ว หอคอยนี้ไม่มีอะไรให้กดอีก… ข้าจะถอนหมุดฐานทั้งร้อยตัว ให้หอคอยหยุดเป็นตะปูที่ตอกแผ่นดินเสียที')],
  ['tw','วิญญาณอัศวินร้อยดวงที่เฝ้าหอคอยมาตลอด… พวกเขาคงอยากลงไปช่วยแบกด้วยเหมือนกัน']];
 case 7:return[['kn','(อัลดริคปักดาบลงดิน) ข้าเฝ้ารากพิภพมาสามร้อยปี ได้ยินเสียงต้นค้ำร้องอยู่ทุกคืน… ข้านึกว่าเป็นแค่เสียงแผ่นดินบ่น'],
  ['kn',v('e4','หัวใจกลับไปอยู่กับเทพแล้ว… ก่อนจากไป เทพฝากเมล็ดหัวใจเมล็ดสุดท้ายไว้กับข้า «ยางที่เคยไหลจากข้า จะไหลจากเมล็ดของพวกเขาเอง» ข้าจะพามันลงไปปลูก',
    'หัวใจยังหลับอยู่ใต้แกนพิภพในผนึกของเจ้า… ข้าจะเปิดรอยผนึกเพียงนิ้วเดียว ให้ยางทองไหลลงรางเก่าได้อีกครั้ง โดยไม่ปลุกมัน')],
  ['kn','อัศวินร้อยดวงสาบานว่าจะปกป้องผนึก ไม่มีใครเคยสั่งให้เราปกป้องคนข้างล่าง… คราวนี้ข้าสั่งตัวเอง']]}return[]}
function pcTalk(i){const q=me.sty;stSay(pcLines(i),()=>{if(!q||(q.pa3p|0)>>i&1)return;q.pa3p=(q.pa3p|0)|(1<<i);let n=0;for(let k=0;k<8;k++)if(q.pa3p>>k&1)n++;q.n=n;
  PALG.card={h:'🤝 คำมั่นของ'+PAQ8[i][2]+' · '+n+'/8',t:PCWHO[i]+': '+pcCard(i),s:performance.now(),d:10};try{sfx('quest')}catch(e){}try{burst(me.x,me.y-30,['#ffe0a0','#ffffff','#c8f0a0'],30,150,1,{glow:1,g:-40})}catch(e){}
  try{sdGive(2,'คำมั่นของ'+PAQ8[i][2])}catch(e){}try{stHud();writeSave()}catch(e){}})}
const pcIdx=k=>PAQ8.findIndex(v=>v[0]===k&&v[1].includes(curMap));
function pcNpcPos(i){const k=PAQ8[i][0];if(!PAQ8[i][1].includes(curMap))return null;if(curMap===9){const N=(typeof CITY!=='undefined'&&CITY.npcs||[]).find(n=>n.k===k);return N?{x:N.x,y:N.y}:null}
  const sl=k==='kn'?'npc':(STNPC[k]&&STNPC[k][1]),N=MAPS[curMap]&&MAPS[curMap][sl];return N&&N.x>0?{x:N.x,y:N.y}:null}
function pcAqT(st){const q=me.sty;if(!q||!st.pa3p)return null;const b=q.pa3p|0;let best=-1;for(let i=0;i<8;i++){if(b>>i&1)continue;if(PAQ8[i][1].includes(curMap)){best=i;break}if(best<0)best=i}
  if(best<0)return null;const k=PAQ8[best][0],mp=k==='kn'?aqNpcMap('kn'):PAQ8[best][1][0];return{mp,act:'talk',k,lb:'ไปขอคำมั่นจาก'+PCWHO[best]+' ('+PAQ8[best][2]+')'}}
/* ---------- ธุลีเดินตาม + ป้าย 🤝 เหนือ NPC ---------- */
let PCFW={x:0,y:0,m:-1,t:0,f:1,mv:0};
function pcFollowOn(){try{return!!(me.cls&&!isDg()&&curMap!==43&&curMap!==44&&p6Past('pa3s')&&!p6Past('pa3p'))}catch(e){return false}}
function pcWorldDraw(){if(isDg()||!me.cls)return;const T=performance.now()/1000;
  if(pcFollowOn()){const now=T,dt=Math.min(.06,now-(PCFW.t||now));PCFW.t=now;const fl=Math.cos(me.face||0)<0?1:-1;if(PCFW.m!==curMap||Math.hypot(PCFW.x-me.x,PCFW.y-me.y)>420){PCFW.m=curMap;PCFW.x=me.x+fl*40;PCFW.y=me.y+10}
    const tx=me.x+fl*38,ty=me.y+12,d=Math.hypot(tx-PCFW.x,ty-PCFW.y),sp=d>90?260:d>24?140:0;if(sp>0){const k=Math.min(1,sp*dt/d);PCFW.x+=(tx-PCFW.x)*k;PCFW.y+=(ty-PCFW.y)*k}PCFW.mv=sp>0?1:0;
    if(Math.abs(me.x-PCFW.x)>6)PCFW.f=me.x<PCFW.x?-1:1;try{NPC3[43].d(PCFW.x,PCFW.y,PCFW.f,T)}catch(e){try{thuD0(PCFW.x,PCFW.y,PCFW.f,T)}catch(e2){}}}
  const st=stCur(),q=me.sty;if(st&&st.pa3p&&q&&q.a===1){for(let i=0;i<8;i++){if((q.pa3p|0)>>i&1)continue;const p=pcNpcPos(i);if(!p)continue;const y=p.y-92+Math.sin(T*3+i)*3;g.save();g.fillStyle='rgba(20,14,28,.82)';g.beginPath();g.roundRect(p.x-15,y-15,30,26,9);g.fill();g.strokeStyle='#ffd88a';g.lineWidth=1.4;g.stroke();
    g.beginPath();g.moveTo(p.x-5,y+11);g.lineTo(p.x,y+17);g.lineTo(p.x+5,y+11);g.closePath();g.fillStyle='rgba(20,14,28,.82)';g.fill();g.font='15px system-ui';g.textAlign='center';g.fillText('🤝',p.x,y+4);g.restore()}}}
/* การ์ดคำมั่นบนแมพที่ไม่ใช่แมพปราสาท (แบบเดียวกับการ์ดความทรงจำ) */
function pcCardScreen(){if(CASTM(curMap)||isDg())return;const Cd=PALG.card;if(!Cd)return;const now=performance.now(),age=(now-Cd.s)/1000,D=Cd.d||7.5;if(age>D){PALG.card=null;return}
  g.save();g.setTransform(DPR,0,0,DPR,0,0);const Hs=H,a=Math.min(1,age/.35,(D-age)/.6),cw=Math.min(SW0-24,330);g.font='12px system-ui';const L=palWrap(Cd.t,cw-28),ch=46+L.length*17,cx=SW0/2-cw/2,cy=Math.min(Hs*.545,Hs*.69-ch);
  g.globalAlpha=a;g.fillStyle='rgba(22,14,30,.9)';g.beginPath();g.roundRect(cx,cy,cw,ch,10);g.fill();g.strokeStyle='rgba(232,184,80,.9)';g.lineWidth=1.4;g.stroke();g.strokeStyle='rgba(232,184,80,.35)';g.beginPath();g.roundRect(cx+4,cy+4,cw-8,ch-8,7);g.stroke();
  g.textAlign='center';g.font='bold 12px system-ui';g.fillStyle='#ffd88a';g.fillText(Cd.h,SW0/2,cy+21);g.font='12px system-ui';g.fillStyle='#f4ecff';L.forEach((l,i)=>g.fillText(l,SW0/2,cy+42+i*17));g.restore()}
/* ---------- คนจากทุกเมือง (NPC แบบใหม่) ---------- */
const PCFK=[{sk:['#f0d0b0','#d0a882','#a07a58'],hair:['#e8e0c8','#b8a888'],body:['#9ab0d8','#5a6e9a'],cape:'#2a4a8a',helm:1},
 {sk:['#e0b48a','#bc8e64','#8a6440'],hair:['#4a3020','#2a1a10'],body:['#8a6a44','#5a4428'],miner:1},
 {sk:['#e8c49a','#c49a70','#946e4c'],hair:['#2a2018','#140e08'],body:['#2a4a7a','#1a2e4e'],scarf:'#e8e8f0',sailor:1},
 {sk:['#f0ccaa','#cca480','#9a7656'],hair:['#c8c0b0','#8a8070'],body:['#8a3a3a','#5a2424'],shawl:'#e0b050',weaver:1},
 {sk:['#e8c098','#c49870','#946e4c'],hair:['#6a4a2a','#3a2814'],body:['#7a8a5a','#4e5a3a'],basket:1},
 {sk:['#e0b890','#bc9068','#8a6440'],hair:['#1a1410','#0a0806'],body:['#3a3446','#22202c'],scarf:'#c83a3a',sailor:1}];
function pcFolkV(x,y,f,t,v){const{O,LG,P,E,R,glow}=NPK,K=PCFK[v%6],br=Math.sin(t*1.6+v)*.4;NPK.sh(x,y+16,10);g.save();g.translate(x,y);g.scale(f*1.1,1.1);g.lineJoin='round';g.lineCap='round';const hy=-15.2+br*.4;
  if(K.cape)P([-6,-10,6,-10,8,9,-8,9],LG(0,-10,0,9,[K.cape,'#16284e']),O,.6);
  NP3.legs(K.body[1],['#5a4028','#2a1e12'],6);NP3.coat([K.body[0],K.body[1],K.body[1]],br);
  if(K.helm){g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=.6;g.beginPath();g.moveTo(-4,-7);g.lineTo(4,-7);g.moveTo(-4,-3);g.lineTo(4,-3);g.stroke();E(0,-5,1.6,1.6,'#ffd86a',O,.3)}
  if(K.weaver){g.fillStyle=K.shawl;P([-6,-9,6,-9,4.6,-3,0,-1,-4.6,-3],K.shawl,O,.5);g.strokeStyle='#8a3a1a';g.lineWidth=.4;for(const s of[-3,0,3]){g.beginPath();g.arc(s,-5.4,1.1,0,7);g.stroke()}}
  if(K.sailor){P([-5,-10,5,-10,3,-6,0,-5,-3,-6],K.scarf,O,.5);P([2,-6.4,4.6,-2,2.6,-1.6],K.scarf,O,.4)}
  R(-6,1.4,12,1.6,.5,'#4a3420',O);
  NP3.arm(-5,-8.4+br*.3,-7,-3,-5.6,1.4,K.body[1],K.sk[0]);
  if(K.basket){P([-10,-2,-4.6,-2,-5.2,3.6,-9.4,3.6],LG(0,-2,0,4,['#b08a4a','#7a5a30']),O,.5);g.fillStyle='#c8a060';for(let k=0;k<3;k++){g.beginPath();g.arc(-8.6+k*1.6,-2.4,1.1,0,7);g.fill()}}
  if(K.miner){g.strokeStyle='#5a3e24';g.lineWidth=1;g.beginPath();g.moveTo(5,2);g.lineTo(9,-16);g.stroke();P([5.6,-17,12.6,-15.4,9,-14],'#9aa2ac',O,.4)}
  if(K.helm){g.strokeStyle='#c8d0e0';g.lineWidth=.9;g.beginPath();g.moveTo(7,14);g.lineTo(8.6,-26);g.stroke();P([7.4,-26,8.6,-31,9.8,-26],'#e8f0ff',O,.4);if(!LOWQ)glow(8.6,-27.6,8,'190,220,255',.5+.2*Math.sin(t*3))}
  if(K.sailor&&!K.helm){g.strokeStyle='#c8a870';g.lineWidth=1.1;g.beginPath();g.ellipse(-8.4,0,3,4,0,0,7);g.stroke()}
  NP3.arm(5,-8.4+br*.3,7,-3,5.8,1.4,K.body[0],K.sk[0]);
  NP3.face(hy,K.sk,{eye:'#2a1406',brow:'#3a2a1a'});
  if(K.helm){P([-5.6,hy-1,-5.2,hy-6,0,hy-8.4,5.2,hy-6,5.6,hy-1,4,hy-2.4,0,hy-3.6,-4,hy-2.4],LG(0,hy-8,0,hy,['#e0e8f8','#8a98b8']),O,.5);P([-1,hy-8.2,0,hy-12,1,hy-8.2],'#ffd86a',O,.3)}
  else if(K.miner){P([-6,hy-1.6,-5,hy-6.8,0,hy-8,5,hy-6.8,6,hy-1.6],LG(0,hy-8,0,hy,['#d8902a','#a0601a']),O,.5);R(-7,hy-2.2,14,1.4,.6,'#a0601a',O);E(0,hy-6,1.6,1.4,'#fff4c0',O,.3);if(!LOWQ)glow(0,hy-6,9,'255,240,170',.5)}
  else{g.beginPath();g.moveTo(-5.6,hy+1.6);g.quadraticCurveTo(-6,hy-6.6,.4,hy-6.6);g.quadraticCurveTo(6.4,hy-6.4,5.8,hy+1);g.quadraticCurveTo(3,hy-3.6,0,hy-3.4);g.quadraticCurveTo(-3,hy-3.4,-3.6,hy+2);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+2,K.hair);g.fill();g.strokeStyle=O;g.lineWidth=.45;g.stroke();
    if(K.sailor)P([-6,hy-3.6,6,hy-3.6,5,hy-6.6,-5,hy-6.6],K.scarf==='#c83a3a'?'#c83a3a':'#2a4a7a',O,.4)}
  g.restore()}
/* ---------- ของจากทุกเมืองในนครรากลึก (แมพ 44 · หลังนำคำมั่นลงไป) ---------- */
const PCROPE44=[[1500,610],[1712,640],[1380,1200],[1830,1215]],PCSTAR44=[[1430,1660],[1790,1700],[1610,2060]];
function pc44Build(){trees.push(...PCROPE44.map(([x,y],i)=>({x,y,r:0,k:'pcrope',v:i,ht:420,ns:1,nc:1})));
  PBT.forEach(([x,y,r],i)=>{trees.push({x,y:y+2,r:0,k:'pctrunk',v:i,ht:420,ns:1,nc:1})});
  for(const[x,y,v]of[[2400,2330,0],[2250,2330,1],[970,2330,2],[820,2330,3]])trees.push({x,y,r:0,k:'pcguard',v,ht:50,ns:1,nc:1});
  trees.push({x:1880,y:1810,r:0,k:'pckarn',ht:60,ns:1,nc:1});trees.push({x:1600,y:1440,r:0,k:'pcwhale',ht:200,ns:1,nc:1});
  PCSTAR44.forEach(([x,y],i)=>trees.push({x,y,r:0,k:'pcstar',v:i,ht:520,ns:1,nc:1}));trees.push({x:1690,y:1736,r:0,k:'pcseed',ht:40,ns:1,nc:1})}
/* ---------- ปากเหว (แมพ 43): เรือเหาะ · คนจากทุกเมือง · ธงแปดผืน · เชือกลงเหว ---------- */
const PCHELP43=[[1452,532,0,1],[1500,575,1,1],[1712,566,2,-1],[1758,520,3,-1],[1560,600,4,1],[1650,604,5,-1]],PCFLAG43=[1388,1448,1508,1568,1632,1692,1752,1812];
function pc43Build(){trees.push({x:1190,y:1600,r:0,k:'pcship',v:0,ht:340,ns:1,nc:1});trees.push({x:2000,y:1925,r:0,k:'pcship',v:1,ht:320,ns:1,nc:1});
  PCHELP43.forEach(([x,y,v,f])=>trees.push({x,y,r:0,k:'pchelp',v,f,ht:44,ns:1,nc:1}));PCFLAG43.forEach((x,i)=>trees.push({x,y:636,r:0,k:'pcflag',v:i,ht:50,ns:1,nc:1}))}
const PCFLAGC=[['#2a4a8a','#ffd86a','👑'],['#8a3a3a','#e0b050','⚙'],['#8a6a44','#ffcc80','⛏'],['#2a4a7a','#e8e8f0','⚓'],['#1a3a5a','#9ae0ff','🐋'],['#2a2a5a','#d8d8ff','✦'],['#4a3a6a','#c8a8ff','🕯'],['#3a5a3a','#c8e8a0','⚔']];
Object.assign(PALK,{
 pcrope(t,T){if(!gPC())return;const x=t.x,y=t.y,sw=Math.sin(T*.9+t.v*1.7)*4,by=y-40+Math.sin(T*1.3+t.v)*6;g.save();{const rg=g.createLinearGradient(0,y-430,0,y-260);rg.addColorStop(0,'rgba(196,164,112,0)');rg.addColorStop(1,'rgba(196,164,112,.85)');g.strokeStyle=rg}g.lineWidth=1.6;for(const s of[-7,7]){g.beginPath();g.moveTo(x+s*.4,y-430);g.quadraticCurveTo(x+s+sw*.5,y-220,x+s+sw,by-24);g.stroke()}
  g.fillStyle='#8a6a44';g.beginPath();g.moveTo(x-16+sw,by-26);g.lineTo(x+16+sw,by-26);g.lineTo(x+12+sw,by);g.lineTo(x-12+sw,by);g.closePath();g.fill();g.strokeStyle='#3a2616';g.lineWidth=1.2;g.stroke();g.strokeStyle='rgba(200,170,120,.7)';g.lineWidth=.9;for(let k=0;k<3;k++){g.beginPath();g.moveTo(x-14+sw,by-21+k*7);g.lineTo(x+14+sw,by-21+k*7);g.stroke()}
  const it=t.v%4;if(it===0){g.fillStyle='#c8945a';g.beginPath();g.ellipse(x-4+sw,by-30,5,6,0,0,7);g.fill();g.fillStyle='rgba(255,210,100,.9)';g.beginPath();g.ellipse(x-4+sw,by-35,2.4,.8,0,0,7);g.fill()}else if(it===1){g.fillStyle='#a8b8d8';g.fillRect(x-6+sw,by-34,12,8);g.strokeStyle='#4a5a7a';g.strokeRect(x-6+sw,by-34,12,8)}else if(it===2){g.fillStyle='#e0d8c0';g.beginPath();g.ellipse(x+sw,by-31,8,5,0,0,7);g.fill()}else{g.fillStyle='#9ae0ff';g.beginPath();g.arc(x+sw,by-32,4,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x+sw,by-32,12,'150,220,255',.4);g.restore()}
  g.restore()},
 pctrunk(t,T){if(!gPC())return;const i=t.v,[x,y,r]=PBT[i],S=PBTC[i];if(!S)return;const a0=g.globalAlpha,bh=me.cls&&Math.abs(me.x-x)<r*1.15&&me.y<y-10&&me.y>y-S.H*.7;g.save();g.globalAlpha=Math.min(a0,bh?.42:1);
  /* อารัณยา: e7=1 เชือกลายเฟืองตะวัน / e7=2 ผ้าทอห่ม */const hw=r*1.05;if(pc2('e7')){const cy=y-70,pts=8;g.fillStyle='#8a3a3a';g.beginPath();g.moveTo(x-hw,cy-16);g.quadraticCurveTo(x,cy-4,x+hw,cy-16);g.lineTo(x+hw*.96,cy+22);g.quadraticCurveTo(x,cy+36,x-hw*.96,cy+22);g.closePath();g.fill();g.strokeStyle='#e0b050';g.lineWidth=1.6;g.stroke();
    for(let k=0;k<pts;k++){const u=(k+.5)/pts,px=x-hw*.9+u*hw*1.8,py=cy+8+Math.sin(u*Math.PI)*12;g.strokeStyle='#e0b050';g.lineWidth=1.2;g.beginPath();g.arc(px,py,5,0,7);g.stroke();for(let q=0;q<6;q++){const a=q/6*6.2832;g.beginPath();g.moveTo(px+Math.cos(a)*5,py+Math.sin(a)*5);g.lineTo(px+Math.cos(a)*8,py+Math.sin(a)*8);g.stroke()}}
    for(let k=0;k<6;k++){const px=x-hw*.85+k*hw*.34;g.strokeStyle='#e0b050';g.beginPath();g.moveTo(px,cy+26+Math.sin(k)*3);g.lineTo(px+Math.sin(T*2+k)*2,cy+38);g.stroke()}}
  else{for(const cy of[y-46,y-58]){g.strokeStyle='#c8a050';g.lineWidth=3.4;g.beginPath();g.moveTo(x-hw,cy-8);g.quadraticCurveTo(x,cy+10,x+hw,cy-8);g.stroke();g.strokeStyle='#8a3a1a';g.lineWidth=1;g.setLineDash([3,4]);g.stroke();g.setLineDash([])}
    for(let k=0;k<3;k++){const px=x-hw*.5+k*hw*.5,py=y-50+4;g.strokeStyle='#e0b050';g.lineWidth=1.3;g.beginPath();g.arc(px,py,6,0,7);g.stroke();for(let q=0;q<8;q++){const a=q/8*6.2832+T*.2;g.beginPath();g.moveTo(px+Math.cos(a)*6,py+Math.sin(a)*6);g.lineTo(px+Math.cos(a)*9,py+Math.sin(a)*9);g.stroke()}}}
  /* อัสตรา e6=1: โคมแก้วดาวแขวนบนลำต้น */if(!pc2('e6')){const n=i===0?6:3;for(let k=0;k<n;k++){const lx=x+((k*37+i*13)%100/100-.5)*r*1.3,ly=y-110-k*(i===0?80:110)-(k*29%30),fk=.7+.3*Math.sin(T*2.4+k+i);g.strokeStyle='rgba(220,230,255,.6)';g.lineWidth=.8;g.beginPath();g.moveTo(lx,ly-22);g.lineTo(lx,ly-10);g.stroke();
    g.fillStyle='rgba(200,225,255,.9)';g.beginPath();g.moveTo(lx-5,ly-10);g.lineTo(lx+5,ly-10);g.lineTo(lx+6,ly+2);g.lineTo(lx,ly+7);g.lineTo(lx-6,ly+2);g.closePath();g.fill();g.strokeStyle='#5a6e9a';g.lineWidth=1;g.stroke();g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly-1,22*fk,'170,210,255',.5);g.restore()}}
  /* วาฬดาว e8=2: โซ่ดาวรัดรอยร้าวที่โคนแม่ไม้ */if(i===0&&pc2('e8')){const cy=y-22;for(let k=0;k<14;k++){const u=k/13,px=x-r*1.15+u*r*2.3,py=cy+Math.sin(u*Math.PI)*16;g.strokeStyle='#d8b050';g.lineWidth=2.4;g.beginPath();g.ellipse(px,py,6,3.6,k%2?.6:-.6,0,7);g.stroke()}g.save();g.globalCompositeOperation='lighter';glowAt(x,cy+8,90,'255,220,120',.12+.05*Math.sin(T*2));g.restore()}
  g.restore()},
 pcguard(t,T){if(!gPC()||!pc2('e6'))return;const f=t.v%2?-1:1;try{(PCFW2[0]||(PCFW2[0]=typeof npvW==='function'?npvW((x,y,ff,tt)=>pcFolkV(x,y,ff,tt,0),null):(x,y,ff,tt)=>pcFolkV(x,y,ff,tt,0)))(t.x,t.y,f,T+t.v)}catch(e){}},
 pckarn(t,T){if(!gPC())return;const x=t.x,y=t.y;if(!pc2('p7m')){/* รางเหมือง + รถเข็นสองคัน */g.strokeStyle='#5a4a3a';g.lineWidth=3;for(const s of[-7,7]){g.beginPath();g.moveTo(x-120,y+s);g.lineTo(x+90,y+s-30);g.stroke()}g.strokeStyle='#3a2a1a';g.lineWidth=4;for(let k=0;k<9;k++){const u=k/8,px=x-112+u*196,py=y-u*28;g.beginPath();g.moveTo(px-2,py-10);g.lineTo(px+2,py+10);g.stroke()}
    for(const[cx,cy,fill]of[[x-60,y-6,'#ffb840'],[x+30,y-18,'#8a6a44']]){PALSH(cx,cy+12,26,7,.4);g.fillStyle='#6a5a4a';g.beginPath();g.moveTo(cx-22,cy-18);g.lineTo(cx+22,cy-18);g.lineTo(cx+17,cy+4);g.lineTo(cx-17,cy+4);g.closePath();g.fill();g.strokeStyle='#2a2018';g.lineWidth=1.4;g.stroke();
      g.fillStyle='#3a3028';for(const s of[-11,11]){g.beginPath();g.arc(cx+s,cy+6,5,0,7);g.fill()}g.fillStyle='#8a8a8a';for(const s of[-11,11]){g.beginPath();g.arc(cx+s,cy+6,1.6,0,7);g.fill()}
      if(fill==='#ffb840'){for(let k=0;k<4;k++){g.fillStyle='#c8945a';g.beginPath();g.ellipse(cx-12+k*8,cy-21,4,5,0,0,7);g.fill()}g.fillStyle='rgba(255,210,100,.85)';g.beginPath();g.ellipse(cx,cy-25,14,2,0,0,7);g.fill()}else{g.fillStyle='#8a7a5a';g.beginPath();g.ellipse(cx,cy-20,16,5,0,0,7);g.fill()}}
    g.font='bold 9px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.8)';g.strokeText('⛏ ยืมฟรี · บรอม',x-20,y+34);g.fillStyle='#ffd8a0';g.fillText('⛏ ยืมฟรี · บรอม',x-20,y+34)}
  else{/* คนขุดสหกรณ์ขุดรางใหม่ */g.fillStyle='rgba(30,18,10,.6)';g.beginPath();g.moveTo(x-110,y+6);g.quadraticCurveTo(x-20,y-10,x+70,y-30);g.lineTo(x+74,y-20);g.quadraticCurveTo(x-20,y+2,x-108,y+18);g.closePath();g.fill();g.fillStyle='#6a5236';for(let k=0;k<8;k++){g.beginPath();g.ellipse(x-100+k*24,y+16-k*5,8,4,0,0,7);g.fill()}
    for(const[dx,dy,f,ph]of[[-70,-6,1,0],[0,-20,-1,1.6],[48,-28,1,3]]){const sw=Math.sin(T*5+ph);try{(PCFW2[1]||(PCFW2[1]=typeof npvW==='function'?npvW((xx,yy,ff,tt)=>pcFolkV(xx,yy,ff,tt,1),null):(xx,yy,ff,tt)=>pcFolkV(xx,yy,ff,tt,1)))(x+dx,y+dy,f,T+ph)}catch(e){}if(sw>.7){g.fillStyle='rgba(120,90,60,.8)';for(let q=0;q<3;q++){g.beginPath();g.arc(x+dx+f*14+q*3,y+dy-6-q*4,2,0,7);g.fill()}}}}},
 pcwhale(t,T){if(!gPC()||pc2('e8'))return;const x=t.x+Math.sin(T*.4)*60,y=t.y-170+Math.sin(T*.9)*8;g.save();g.globalCompositeOperation='lighter';glowAt(x,y,70,'150,210,255',.28);g.restore();
  g.save();g.translate(x,y);g.scale(Math.cos(T*.4)>0?1:-1,1);g.fillStyle='rgba(170,215,255,.85)';g.beginPath();g.moveTo(-40,0);g.quadraticCurveTo(-30,-22,6,-20);g.quadraticCurveTo(36,-16,44,-2);g.quadraticCurveTo(30,14,0,14);g.quadraticCurveTo(-28,12,-40,0);g.closePath();g.fill();g.strokeStyle='rgba(40,70,120,.8)';g.lineWidth=1.2;g.stroke();
  g.beginPath();g.moveTo(-38,0);g.lineTo(-54,-12+Math.sin(T*2)*3);g.lineTo(-52,8+Math.sin(T*2)*3);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.9)';for(const[dx,dy]of[[-10,-8],[4,-12],[16,-6],[-20,2],[8,4]]){g.beginPath();g.arc(dx,dy,1.4,0,7);g.fill()}g.fillStyle='#1a2a4a';g.beginPath();g.arc(30,-4,1.8,0,7);g.fill();
  g.strokeStyle='rgba(220,230,255,.6)';g.lineWidth=.8;g.beginPath();g.moveTo(0,-20);g.lineTo(0,-60);g.stroke();g.restore()},
 pcstar(t,T){if(!gPC())return;const x=t.x,y=t.y;g.save();if(!pc2('e9')){g.globalCompositeOperation='lighter';const sx=x-120,a=.13+.05*Math.sin(T*.8+t.v);const gr=g.createLinearGradient(sx,y-520,x,y);gr.addColorStop(0,'rgba(200,220,255,0)');gr.addColorStop(.5,'rgba(200,220,255,'+a+')');gr.addColorStop(1,'rgba(220,235,255,'+(a*1.4)+')');g.fillStyle=gr;
   g.beginPath();g.moveTo(sx-26,y-520);g.lineTo(sx+26,y-520);g.lineTo(x+46,y);g.lineTo(x-46,y);g.closePath();g.fill();g.save();g.translate(x,y);g.scale(1,.32);{const rg=g.createRadialGradient(0,0,0,0,0,64);rg.addColorStop(0,'rgba(220,235,255,'+(a*1.7)+')');rg.addColorStop(1,'rgba(220,235,255,0)');g.fillStyle=rg;g.fillRect(-64,-64,128,128)}g.restore();for(let k=0;k<6;k++){const p=(T*.25+k/6)%1;glowAt(sx+(x-sx)*p+Math.sin(k*2+T)*10,y-520+520*p,3,'255,255,255',.7*Math.sin(p*Math.PI))}}
  else{{const tg=g.createLinearGradient(0,y-480,0,y-300);tg.addColorStop(0,'rgba(220,225,255,0)');tg.addColorStop(1,'rgba(220,225,255,.55)');g.strokeStyle=tg}for(let k=0;k<3;k++){const tx=x+(k-1)*34,sw=Math.sin(T*.8+k+t.v)*5;g.lineWidth=1;g.beginPath();g.moveTo(tx,y-480);g.quadraticCurveTo(tx+sw,y-240,tx+sw*1.4,y-40-k*14);g.stroke();
    for(let q=2;q<6;q++){const u=q/6,bx=tx+sw*1.4*u,by=y-480+(440-k*14)*u;g.fillStyle='rgba(240,240,255,.85)';g.beginPath();g.arc(bx,by,1.6,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(bx,by,7,'220,220,255',.35+.25*Math.sin(T*3+q+k));g.restore()}}}
  g.restore()},
 pcseed(t,T){if(!gPC())return;const x=t.x,y=t.y,pu=.6+.4*Math.sin(T*2);if(!pc2('e4')){PALSH(x,y+3,20,6,.4);g.fillStyle='#5a4028';g.beginPath();g.ellipse(x,y,18,7,0,0,7);g.fill();g.strokeStyle='#4a8a3a';g.lineWidth=2;g.beginPath();g.moveTo(x,y-2);g.quadraticCurveTo(x+2,y-16,x-1,y-28);g.stroke();
   g.fillStyle='#7ac860';for(const s of[-1,1]){g.beginPath();g.ellipse(x+s*6,y-22,6,2.6,s*.5,0,7);g.fill()}g.fillStyle='#ffd86a';g.beginPath();g.arc(x-1,y-30,3.4,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x-1,y-28,26*pu,'255,210,100',.45);glowAt(x,y-4,40,'255,200,90',.12);g.restore()}
  else{const wx=PBW.x,wy=PBW.y;g.save();g.globalCompositeOperation='lighter';glowAt(wx,wy-6,PBW.r*2.2,'255,200,90',.16+.08*pu);for(let k=0;k<5;k++){const p=(T*.5+k/5)%1;glowAt(wx+Math.sin(k*2.3)*30,wy-6-p*60,6,'255,220,140',.6*(1-p))}g.restore()}},
 pcship(t,T){if(!gPC())return;const x=t.x,y=t.y,el=t.v?150:175,bob=Math.sin(T*.9+t.v)*5;g.save();g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(x,y+6,70,16,0,0,7);g.fill();g.strokeStyle='rgba(196,164,112,.85)';g.lineWidth=1.6;for(const s of[-22,0,24]){g.beginPath();g.moveTo(x+s,y-el+bob+8);g.quadraticCurveTo(x+s+Math.sin(T+s)*4,y-el*.5,x+s*.6,y-4);g.stroke()}g.restore();
  try{phShipD(x,y-el,T,{f:t.v?-1:1,nm:t.v?'เรือดำ':'นาวาเมฆ',dark:t.v===1&&!pc2('p8g')})}catch(e){}},
 pchelp(t,T){if(!gPC())return;try{(PCFW2[t.v]||(PCFW2[t.v]=typeof npvW==='function'?npvW((x,y,ff,tt)=>pcFolkV(x,y,ff,tt,t.v),null):(x,y,ff,tt)=>pcFolkV(x,y,ff,tt,t.v)))(t.x,t.y,t.f||1,T+t.v)}catch(e){}},
 pcflag(t,T){if(!gPC())return;const[c1,c2,ic]=PCFLAGC[t.v],x=t.x,y=t.y,sw=Math.sin(T*1.8+t.v)*2;g.save();g.strokeStyle='#3a2414';g.lineWidth=2.4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-46);g.stroke();
  g.fillStyle=c1;g.beginPath();g.moveTo(x,y-44);g.lineTo(x+22+sw,y-40);g.lineTo(x+20+sw*1.2,y-28);g.lineTo(x+22+sw,y-16);g.lineTo(x,y-20);g.closePath();g.fill();g.strokeStyle=c2;g.lineWidth=1.2;g.stroke();g.font='9px system-ui';g.textAlign='center';g.fillStyle=c2;g.fillText(ic,x+10+sw*.6,y-26);g.restore()}});
const PCFW2={};
/* ---------- เนื้อเรื่องภาค 10 บทที่ 3 ---------- */
STCH.push('ภาค 10 · บทที่ 3 · คำมั่นของทุกเมือง');
{const C3=STCH.length-1;STY.push(
 {c:C3,g:'talk',k:'thu44',pa3s:1,tx:'คุยธุลีที่นครรากลึก (ข้างห้องโถงราก)',
  pre:[['thu','ท่านจะขึ้นไปถามทุกเมืองจริง ๆ เหรอ? …ข้าขอไปด้วยได้ไหม ข้าอยากเห็นว่าคนข้างบนหน้าตาเป็นยังไง'],
   ['ked','(เฒ่าแก่นไม้พยักหน้าช้า ๆ จากบัลลังก์ราก) ไปเถิดธุลี… ให้พวกเขาได้เห็นหน้าคนรากลึกสักคน'],
   ['thu','ข้าเตรียมโคมเห็ดไว้แปดดวง! เมืองละดวง เขาจะได้จำได้ว่าเรามาจากไหน'],
   ['thu','💡 ขึ้นไปหาผู้บัญชาการเรนน์ที่ค่ายก่อน · ข้าจะเดินตามท่านไปทุกเมืองเลย']],rw:{g:120000}},
 {c:C3,g:'talk',k:'cmd',pa3r:1,tx:'ขึ้นไปคุยผู้บัญชาการเรนน์ที่ค่าย (ธุลีเดินตาม)',
  pre:[['cmd','(เรนน์มองธุลีอยู่นาน) …ใต้ค่ายนี้มีเมืองทั้งเมือง แล้วข้าเป็นผู้บัญชาการที่นี่มาตั้งแต่วันแรก ไม่เคยรู้เลย'],
   ['cmd','ค่ายผู้อพยพไม่มีอะไรจะให้มาก นอกจากมือ… แต่มือของคนที่เคยไม่มีบ้าน รู้ดีที่สุดว่าบ้านหนักแค่ไหน',0,0,0,0,0,1],
   ['cmd','นครลี้ภัยลอยขึ้นมาได้หนึ่งคืบเพราะหัวใจดวงใหม่… แต่ถ้าแผ่นดินข้างใต้ร่วง ต่อให้ลอยได้ ก็ไม่มีที่ให้กลับลงไป',0,0,0,0,0,2],
   ['cmd','ค่ายของเราจะเป็นเมืองแรกที่ให้คำมั่น: ชาวค่ายทุกคนที่ยังยกของไหว จะลงไปแบกด้วยกัน'],
   ['cmd','ที่เหลือเจ้าต้องไปถามเอง… อัสตรา อารัณยา คาร์น กองเรือ วาฬดาว ห้วงดาว หอคอย และรากพิภพ — ทุกที่ที่เจ้าเคยเปิดประตูให้'],
   ['thu','(ธุลีกระซิบ) ผู้บัญชาการคนนี้เสียงดุ… แต่ตาใจดีนะ']],rw:{g:120000}},
 {c:C3,g:'clue',n:8,pa3p:1,tx:'ขอคำมั่นจากทุกเมือง 8 แห่ง (คุย NPC ที่มีป้าย 🤝 · ออโต้เควสพาไปทีละเมือง)',
  pre:[['thu','ข้าจะถือโคมเดินตามท่านไปทุกที่! เมืองแรกไปที่ไหนดี?'],
   ['nar','💡 อัสตรา (ราชินีเอลิรา) · อารัณยา (ยายเอดา) · เหมืองคาร์น (บรอม) · ท่าเรือนาวาเมฆ (ซารา · นาวิน) · ห้วงดาว (เซเลสต์ ที่ทุ่งตาข่ายดาว) · หอคอยร้อยชั้น (ผู้เฝ้าหอคอย) · รากพิภพ (อัลดริค) — ใช้แผนที่โลกวาปได้']],
  post:[['thu','แปดเมือง… แปดคำมั่น! (ธุลีมองตะกร้าโคมที่ว่างเปล่า) ข้าแจกโคมหมดแล้ว'],['thu','เราต้องรีบลงไปบอกเฒ่าแก่นไม้!']],rw:{g:260000,s3:10}},
 {c:C3,g:'talk',k:'ked',pa3k:1,tx:'นำคำมั่นทั้งแปดลงไปบอกเฒ่าแก่นไม้ (นครรากลึก)',
  pre:[['ked','(เฒ่าแก่นไม้ฟังทีละคำมั่น… มือที่จับไม้เท้าสั่นเบา ๆ)'],
   ['ked','สามร้อยปี… ข้าเคยคิดว่าคนข้างบนลืมเราเพราะไม่สนใจ แต่วันนี้ข้ารู้แล้ว พวกเขาแค่ไม่เคยมีใครลงมาบอก'],
   ['nar','คืนนั้นเชือกจากเรือเหาะเส้นแรกหย่อนลงมาถึงยอดแม่ไม้ ตามด้วยโคม ผ้าทอ รถเข็น และเสียงคนข้างบนที่ตะโกนลงมาในความมืด'],
   ['nar','ต้นค้ำทั้งห้าเรืองขึ้นพร้อมกัน… ไม่ใช่เพราะยางทอง แต่เพราะรากของมันได้ยินเสียงฝีเท้าที่ไม่เคยได้ยินมาก่อน'],
   ['thu','เฒ่าแก่นไม้… ท่านร้องไห้เหรอ?'],['ked','เปล่า… ยางมันกระเด็นเข้าตา']],
  post:[['nar','แล้วทั้งนครก็สั่น… เสียงกัดแทะดังขึ้นจากใต้เท้า ไม่ใช่จากย่านรอบนอก แต่จากข้างล่างนครเอง ลึกกว่าที่ใครเคยลงไป'],
   ['ked','มันได้ยินเสียงฝีเท้าเหมือนกัน… ราชินีของฝูงกัดแผ่นดิน มันรู้แล้วว่ามีคนมาช่วยแบก'],
   ['ked','ปากเหวคือทางเดียวที่คนข้างบนลงมา… ไปปกป้องพวกเขาก่อน!']],rw:{g:150000}},
 {c:C3,g:'kill',m:43,n:40,tx:'ปกป้องคนจากทุกเมืองที่ลงมาช่วยที่ปากเหว (ขับไล่ฝูงกัดแผ่นดิน 40 ตัว)',
  post:[['nar','ตัวสุดท้ายมุดหนีลงเหว… คนจากแปดเมืองยืนเรียงกันที่ขอบเหว ส่งเชือกต่อมือกันลงไปเป็นสายยาวจนถึงยอดแม่ไม้'],
   ['til43','ธุลี! ดูสิ ทุกคนมากันหมดเลย!']],rw:{g:110000}},
 {c:C3,g:'talk',k:'thu',pa3c:1,tx:'คุยธุลีที่ขอบเหว (ปลายสะพานรากด้านเหนือ)',
  pre:[['thu','(ธุลีมองแถวคนที่ส่งเชือกต่อมือกันลงไป) …ข้าเคยคิดว่าฟ้าคือสิ่งที่สวยที่สุด แต่ข้าคิดผิด'],
   ['thu','สิ่งที่สวยที่สุด คือคนข้างบนที่ก้มลงมามองข้างล่าง'],
   ['thu','แต่… ข้าได้ยินเสียงจากฐานแผ่นดิน ธรณินครางเหมือนคนที่แบกมานานเกินไป และมีอะไรตัวใหญ่มาก ๆ กำลังกัดเท้าของเขาอยู่'],
   ['til43','งั้นเราก็ลงไปช่วยเขาด้วยกันสิ!'],
   ['thu','ทางลงฐานแผ่นดินอยู่ใต้นครของข้า… ลึกกว่าที่ใครเคยไป ไม่เคยมีใครกลับขึ้นมาเล่าว่าข้างล่างนั่นมีอะไร'],
   ['me','(คำมั่นของแปดเมืองอยู่ข้างบน… ส่วนคนที่แบกมาสามร้อยปีอยู่ข้างล่างสุด)']],
  post:[['nar','🌳 — จบภาค 10 บทที่ 3 · คำมั่นของทุกเมือง — บทต่อไป: ราชินีกัดแผ่นดิน (เร็ว ๆ นี้)']],rw:{g:200000,s3:12}})}
/* ---------- ลงทะเบียน ---------- */
setTimeout(()=>{
  try{const _nc=stNpcClick;window.stNpcClick=stNpcClick=function(){try{const st=stCur(),q=me.sty;if(st&&st.pa3p&&q&&q.a===1&&!SD.on){const i=pcIdx(stTalkKey());if(i>=0&&!((q.pa3p|0)>>i&1)){pcTalk(i);return true}}}catch(e){}return _nc.apply(this,arguments)}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.pa3p)return pcAqT(st);return _q(st)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{pcWorldDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{pcCardScreen()}catch(e){}}}catch(e){}
  try{const _bb=pbBuild;window.pbBuild=pbBuild=function(M){_bb(M);try{pc44Build()}catch(e){}}}catch(e){}
  try{const _pb=paBuild;window.paBuild=paBuild=function(M){_pb(M);try{pc43Build()}catch(e){}}}catch(e){}
  /* บทพูดลอย ๆ หลังนำคำมั่นลงไป */
  const KED3=['ข้าได้ยินเสียงฝีเท้าคนข้างบนทุกคืนแล้ว… สามร้อยปีที่รอ คุ้มทุกวัน','โคมจากอัสตราสว่างกว่ามอสของเราตั้งเยอะ','เชือกจากเรือเหาะแกว่งทั้งคืน เด็ก ๆ ไม่ยอมนอนกัน','ฐานแผ่นดินลึกลงไปอีก… ธรณินยังรออยู่'];
  setInterval(()=>{try{if(NPC3[44]&&gPC()&&NPC3[44].s!==KED3)NPC3[44].s=KED3}catch(e){}},700);
},0);
