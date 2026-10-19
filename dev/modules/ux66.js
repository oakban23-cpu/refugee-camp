/* ===== v452 · บ้านกิลด์ รอบ 1 — ประตูในค่าย · บ้านกิลด์ 5 ขั้น (ค่ายทหาร → ปราสาท) · คลังบริจาค =====
   - ประตูบ้านกิลด์ในค่ายผู้อพยพ (ฝั่งตะวันออกเฉียงใต้) → แมพแยกต่อกิลด์ (id 5000+id กิลด์ · สมาชิกกิลด์เดียวกันเจอกัน)
   - หน้าตาบ้านเปลี่ยนตามขั้น: 1 ค่ายทหาร · 2 ค่ายป้อมไม้ · 3 ป้อมหิน · 4 ป้อมปราการ · 5 ปราสาท (สี/ตราตามกิลด์)
   - คลังกิลด์: บริจาคทองเข้าอย่างเดียว (เบิกไม่ได้) · Lv20+ · เพดาน 2,000,000/คน/วัน · ทุก 10,000 ทอง = แต้มกิลด์ 1 แต้ม · ประวัติ + อันดับ
   - หัวหน้า/รองหัวหน้ากดขยายบ้าน: ขั้น 2 = 20M + กิลด์ Lv2 · ขั้น 3 = 80M + Lv4 · ขั้น 4 = 250M + Lv6 · ขั้น 5 = 800M + Lv8
   - เซิร์ฟเวอร์เป็นคนนับคลัง (op hqd/hqu) · ทองฝั่งเรา: หักก่อนส่ง (กันกดซ้ำ) แล้วคืนถ้าเซิร์ฟเวอร์ปฏิเสธ/ไม่ตอบ */
const GHG={x:1935,y:1885};
const GHT=[null,{n:'ค่ายทหาร',ic:'⛺',d:'รั้วไม้ เต็นท์บัญชาการ กองไฟ ธงกิลด์'},{n:'ค่ายป้อมไม้',ic:'🪵',d:'กำแพงซุงปลายแหลม หอสังเกตการณ์ โรงไม้ยาว'},{n:'ป้อมหิน',ic:'🧱',d:'กำแพงหิน หอมุม ห้องโถงหิน น้ำพุกลางลาน'},{n:'ป้อมปราการ',ic:'🛡️',d:'กำแพงสูง หอกลม ประตูซี่เหล็ก หอคอยกลาง'},{n:'ปราสาท',ic:'🏰',d:'ปราการหินขาว หอยอดแหลม ธงใหญ่ หน้าต่างกระจกสี'}];
const GHFREQ=[0,0,20e6,80e6,250e6,800e6],GHLREQ=[0,1,2,4,6,8],GHPLOT=[0,2,4,6,8,10];
const GHN={x:-430,y:-84,n:'ออสวิน ผู้ดูแลคลัง'},GHBD={x:392,y:196};
const GHSAY=['ทุกเหรียญที่บริจาค จะกลายเป็นหินทุกก้อนของกำแพงเรา','คลังนี้เข้าได้อย่างเดียว ไม่มีใครแอบเบิกออกได้หรอก','หัวหน้ากับรองเป็นคนสั่งขยายบ้าน ข้าแค่นับเงิน','วันนี้บริจาคได้คนละไม่เกินสองล้านนะ','สักวันที่นี่จะเป็นปราสาท!'];
const GHS={near:'',pend:null,C:null,ck:'',amt:100000,rk:'wk',cf:0,fw:0,fwT:0,tip:0};
const ghId=G=>5000+((G&&G.id|0)%5000);
const ghHere=()=>{try{return!!(MAPS[curMap]&&MAPS[curMap].ghq)}catch(e){return false}};
const ghT=()=>{try{const H=GDS.g&&GDS.g.hq;return Math.max(1,Math.min(5,H?H.t|0:1))}catch(e){return 1}};
const ghF=n=>{n=+n||0;return n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(n>=1e8?0:1)+'M':n>=1e3?Math.round(n/1e3)+'K':String(Math.round(n))};
function ghMap(id,G){return MAPS[id]={n:'บ้านกิลด์'+(G?' ['+G.tag+']':''),sx:1600,sy:1600,sr:760,seed:4521,bg:'#2f4a26',tile:'#365530',safe:'#365530',ring:'rgba(0,0,0,0)',t1:'#16301a',t2:'#24452a',d1:'#3a5a30',d2:'#7aa860',nests:[],hub:1,ghq:1,gid:G?G.id:0,
  gates:[],qk:1,ql:1,npc:{x:-9999,y:-9999,n:'',L:1},boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:1,rm:0,g:0,dm:1,tn:1,sm:0,col:'#6a4a98',bar:'#6a4a9a',ln:'#c8a8ff',rec:'',pos:''}}}
/* ---------- เข้า/ออก ---------- */
function ghEnter(){if(!me.cls||!run||me.down>0)return;const G=GDS.g;
  if(!gdOnl()){banner={s:'🏰 บ้านกิลด์ใช้ได้เมื่อเล่นออนไลน์บนเซิร์ฟเวอร์เท่านั้น',t:3.5};return}
  if(!G){banner={s:'🏰 ต้องมีกิลด์ก่อน · ตั้งหรือเข้ากิลด์ได้ที่ เมนู › 🏰 กิลด์',t:4};try{gdEmit('q')}catch(e){}return}
  let rd=0;try{rd=(typeof RDE!=='undefined'&&RDE.on)||(typeof SKE!=='undefined'&&SKE.on)}catch(e){}if(rd){banner={s:'🏰 ลงจากหลังสัตว์/ลงจากคอก่อน',t:3};return}
  const id=ghId(G);for(const k in MAPS){if(MAPS[k]&&MAPS[k].ghq&&+k!==id&&+k!==curMap)delete MAPS[k]}ghMap(id,G);
  try{AQ&&aqStop()}catch(e){}ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:1600,y:1600+372});const t=ghT();
  banner={s:G.e+' บ้านกิลด์ '+G.nm+' ['+G.tag+'] · ขั้น '+t+' '+GHT[t].n,t:4};
  if(!GHS.tip){GHS.tip=1;setTimeout(()=>{try{if(ghHere())sysMsg('🏰 บ้านกิลด์: คุยกับ '+GHN.n+' (ซ้ายมือ) เพื่อบริจาคเข้าคลัง · หัวหน้า/รองกดขยายบ้านได้เมื่อคลังพอ')}catch(e){}},1500)}
  try{gdEmit('q')}catch(e){}}
function ghExit(){if(!ghHere())return;try{sfx('gate')}catch(e){}enterMap(1,{x:GHG.x,y:GHG.y+58})}
/* ---------- กันชน ---------- */
const GHR=[[-185,-470,185,-292],[-528,-238,-332,-146],[-572,138,-330,236],[385,34,555,100],[385,274,555,340]];
const GHTP=[[-540,40],[-460,40],[-540,112],[-460,112],[-380,40],[-380,112]],GHST={x:470,y:128},GHKI={x:470,y:362};
function ghCols(){const t=ghT(),L=[[0,22,t>=3?74:44],[-112,-246,10],[112,-246,10],[GHBD.x,GHBD.y-4,22],[-470,300,13],[-410,316,13]];const nt=[0,0,0,2,4,6][t];for(let i=0;i<nt;i++)L.push([GHTP[i][0],GHTP[i][1]-4,13]);return L}
function ghCollide(){if(!ghHere())return;const x0=1600-600+22,x1=1600+600-22,y0=1600-470+26,y1=1600+430-22;
  me.x=Math.max(x0,Math.min(x1,me.x));me.y=Math.max(y0,Math.min(y1,me.y));
  for(const R of GHR){const a=1600+R[0]-12,b=1600+R[1]-10,c=1600+R[2]+12,d=1600+R[3]+10;if(me.x>a&&me.x<c&&me.y>b&&me.y<d){const L=[me.x-a,c-me.x,me.y-b,d-me.y],m=Math.min(...L);if(m===L[0])me.x=a;else if(m===L[1])me.x=c;else if(m===L[2])me.y=b;else me.y=d}}
  for(const C of ghCols()){if(!C[2])continue;const cx=1600+C[0],cy=1600+C[1],dx=me.x-cx,dy=me.y-cy,dd=Math.hypot(dx,dy)||.01,r=C[2]+10;if(dd<r){me.x=cx+dx/dd*r;me.y=cy+dy/dd*r}}}
/* ---------- ภาพนิ่ง (แคช) ---------- */
function ghShade(h,k){h=h.replace('#','');let r=parseInt(h.slice(0,2),16),g2=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);const f=v=>Math.max(0,Math.min(255,Math.round(k>=0?v+(255-v)*k:v*(1+k))));return'rgb('+f(r)+','+f(g2)+','+f(b)+')'}
function ghBuild(t,col,em){const S=(typeof LOWQ!=='undefined'&&LOWQ)?.85:1.2,X0=-690,Y0=-800,WD=1380,HT=1310;
  const cv=document.createElement('canvas');cv.width=Math.round(WD*S);cv.height=Math.round(HT*S);const c=cv.getContext('2d');c.scale(S,S);c.translate(-X0,-Y0);
  let sd=9137+t*71;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;const O='#1a120a',cD=ghShade(col,-.45),cL=ghShade(col,.35);
  const P=(p,f,s,lw)=>{c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)c.lineTo(p[i],p[i+1]);c.closePath();if(f){c.fillStyle=f;c.fill()}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.stroke()}};
  const Rc=(x,y,w,h,f,s,lw)=>{if(f){c.fillStyle=f;c.fillRect(x,y,w,h)}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.strokeRect(x,y,w,h)}};
  const E=(x,y,rx,ry,f,s,lw)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);if(f){c.fillStyle=f;c.fill()}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.stroke()}};
  const sh=(x,y,rx,ry,a)=>E(x,y,rx,ry,'rgba(0,0,0,'+(a||.3)+')');
  const stone=t>=3,WH=[0,26,50,46,62,68][t],WF=t===5?'#cdc4ae':t===4?'#86817a':'#8c8676',WT=t===5?'#e8e0cb':t===4?'#a29d94':'#a8a292',WK=t===5?'#a19782':t===4?'#5f5b55':'#625d52';
  /* --- พื้นในกำแพง --- */
  const GB=[0,'#7a6646','#786445','#77705f','#6d6a62','#c9bea0'][t];Rc(-600,-470,1200,900,GB);
  if(t<=3){for(let i=0;i<1100;i++){const x=-600+rn()*1200,y=-470+rn()*900;c.globalAlpha=.16+rn()*.2;E(x,y,1.5+rn()*5,1+rn()*2.5,rn()<.5?'#3e3020':'#b0966a')}c.globalAlpha=1;
    for(let i=0;i<260;i++){const e=rn(),x=e<.25?-600+rn()*60:e<.5?540+rn()*60:-600+rn()*1200,y=e<.5?-470+rn()*900:(rn()<.5?-470+rn()*40:400+rn()*30);c.strokeStyle=rn()<.5?'#5f8a3a':'#4a7430';c.lineWidth=1.2;for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(x,y);c.lineTo(x+k*3,y-5-rn()*4);c.stroke()}}}
  const cob=(x0,y0,x1,y1,w,h,base,vr)=>{for(let y=y0,r=0;y<y1;y+=h,r++)for(let x=x0-(r%2?w/2:0);x<x1;x+=w){const xa=Math.max(x0,x),xb=Math.min(x1,x+w);if(xb-xa<3)continue;const k=(rn()-.5)*vr;c.fillStyle=ghShade(base,k);c.beginPath();c.roundRect(xa+1,y+1,xb-xa-2,Math.min(h,y1-y)-2,3);c.fill()}};
  /* ทางเดิน */
  if(t<=2){const pc='#a38b62';Rc(-48,-300,96,730,pc);Rc(-430,-112,430,70,pc);Rc(0,-120,420,62,pc);E(0,22,128,96,pc);
    for(let i=0;i<500;i++){const x=-48+rn()*96,y=-300+rn()*730;c.globalAlpha=.25;E(x,y,1.5+rn()*3,1+rn()*1.5,rn()<.5?'#7a6440':'#c4ac80')}c.globalAlpha=1;
    if(t===2){for(let y=-290;y<425;y+=13){c.fillStyle=y%26?'#8a6038':'#7c5432';c.fillRect(-34,y,68,11);c.strokeStyle='rgba(40,24,10,.6)';c.lineWidth=.8;c.strokeRect(-34,y,68,11)}}}
  else if(t===3){c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-52,-300,104,730);cob(-50,-300,50,430,20,13,'#9a958a',.22);cob(-430,-110,-50,-46,20,13,'#9a958a',.22);cob(50,-118,420,-58,20,13,'#9a958a',.22)}
  else if(t===4){cob(-600,-470,600,430,24,15,'#7d7972',.18);cob(-56,-300,56,430,22,14,'#9b968c',.18)}
  else{for(let y=-470;y<430;y+=44)for(let x=-600;x<600;x+=64){const o=(y/44|0)%2?32:0;c.fillStyle=ghShade('#d8cfb4',(rn()-.5)*.12);c.fillRect(x+o-32+1,y+1,62,42)}
    c.strokeStyle='rgba(120,100,70,.35)';c.lineWidth=1;for(let y=-470;y<430;y+=44){c.beginPath();c.moveTo(-600,y);c.lineTo(600,y);c.stroke()}
    Rc(-44,-300,88,730,cD);Rc(-36,-300,72,730,col);Rc(-44,-300,4,730,'#e8c060');Rc(40,-300,4,730,'#e8c060');for(let y=-280;y<420;y+=60){c.fillStyle=cL;c.beginPath();c.moveTo(0,y-12);c.lineTo(10,y);c.lineTo(0,y+12);c.lineTo(-10,y);c.closePath();c.fill()}}
  /* ลานกลาง */
  if(t>=3){E(0,22,132,100,t===5?'#b8ad90':'#8f8a7e');E(0,22,124,93,null,cD,10);E(0,22,112,84,t===5?'#e2d9c0':'#a39e92');
    for(let i=0;i<24;i++){const a=i/24*6.283;c.save();c.translate(Math.cos(a)*118,22+Math.sin(a)*88);c.rotate(a);c.fillStyle=i%2?col:cL;c.fillRect(-6,-3,12,6);c.restore()}}
  /* --- กำแพง --- */
  const hWall=(xa,xb,y)=>{if(t===1){Rc(xa,y-17,xb-xa,3,'#8a6038',O,.5);Rc(xa,y-8,xb-xa,3,'#8a6038',O,.5);for(let x=xa;x<=xb;x+=28){sh(x+2,y+1,5,2,.25);Rc(x-3,y-WH,6,WH,'#6a4628',O,.6);P([x-3,y-WH,x,y-WH-4,x+3,y-WH],'#7d5330',O,.5)}return}
    sh((xa+xb)/2,y+3,(xb-xa)/2+6,7,.22);
    if(t===2){for(let x=xa;x<xb;x+=11){const f=(x/11|0)%2?'#7a5232':'#6a4628';P([x,y,x,y-WH+6,x+5.5,y-WH-5,x+11,y-WH+6,x+11,y],f,O,.6)}Rc(xa,y-WH*.4,xb-xa,5,'#4a3018',O,.5);Rc(xa,y-WH*.78,xb-xa,4,'#4a3018',O,.5);return}
    Rc(xa,y-WH,xb-xa,WH,WF);c.strokeStyle='rgba(0,0,0,.22)';c.lineWidth=1;for(let yy=y-WH+11,r=0;yy<y;yy+=11,r++){c.beginPath();c.moveTo(xa,yy);c.lineTo(xb,yy);c.stroke();for(let x=xa+(r%2?11:0);x<xb;x+=22){c.beginPath();c.moveTo(x,yy-11);c.lineTo(x,yy);c.stroke()}}
    const gr=c.createLinearGradient(0,y-WH,0,y);gr.addColorStop(0,'rgba(255,255,255,.08)');gr.addColorStop(1,'rgba(0,0,0,.25)');c.fillStyle=gr;c.fillRect(xa,y-WH,xb-xa,WH);
    Rc(xa,y-WH-9,xb-xa,9,WT,O,.6);for(let x=xa+3;x<xb-10;x+=21){Rc(x,y-WH-17,11,8,WT,O,.6);Rc(x,y-WH-11,11,2,'rgba(0,0,0,.18)')}c.strokeStyle=O;c.lineWidth=.8;c.strokeRect(xa,y-WH,xb-xa,WH);
    if(t===5){for(let x=xa+60;x<xb-40;x+=150){P([x-12,y-WH+2,x+12,y-WH+2,x+12,y-14,x,y-8,x-12,y-14],col,O,.7);Rc(x-12,y-WH+2,24,4,'#e8c060');c.fillStyle=cL;c.beginPath();c.arc(x,y-WH*.55,5,0,7);c.fill()}}};
  const vWall=(x,ya,yb)=>{if(t===1){for(let y=ya;y<=yb;y+=28){sh(x+1,y+1,5,2,.25);Rc(x-3,y-WH,6,WH,'#6a4628',O,.6)}Rc(x-1.5,ya-17,3,yb-ya,'#8a6038');Rc(x-1.5,ya-8,3,yb-ya,'#8a6038');return}
    const tw=t===2?14:20;c.fillStyle='rgba(0,0,0,.2)';c.fillRect(x+(x<0?tw/2:-tw/2-10),ya,10,yb-ya);
    if(t===2){Rc(x-tw/2,ya-WH,tw,yb-ya,'#6a4628');for(let y=ya-WH;y<yb-WH;y+=11){E(x,y+5.5,tw/2-.5,5,(y/11|0)%2?'#9a7048':'#8a6240',O,.5);E(x,y+5.5,3,2,'#6a4a2a')}P([x-tw/2,yb-WH,x+tw/2,yb-WH,x+tw/2,yb,x-tw/2,yb],'#6a4628',O,.6);return}
    Rc(x-tw/2,ya-WH-9,tw,yb-ya,WT,O,.6);c.fillStyle='rgba(0,0,0,.14)';c.fillRect(x-tw/2,ya-WH-9,4,yb-ya);
    for(let y=ya-WH;y<yb-WH-14;y+=21){Rc(x-tw/2-1,y,6,10,WT,O,.5);Rc(x+tw/2-5,y,6,10,WT,O,.5)}Rc(x-tw/2,yb-WH-9,tw,WH+9,WF,O,.7)};
  const tower=(x,y,w,h,roof)=>{sh(x,y+3,w*.62,8,.3);if(t===2){[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>Rc(x+a*w*.38-3,y-h+(b>0?14:0),6,h-(b>0?14:0),'#5a3a1e',O,.6));c.strokeStyle='#4a3018';c.lineWidth=2;c.beginPath();c.moveTo(x-w*.38,y-10);c.lineTo(x+w*.38,y-h*.55);c.moveTo(x+w*.38,y-10);c.lineTo(x-w*.38,y-h*.55);c.stroke();
      Rc(x-w/2,y-h-6,w,10,'#8a6038',O,.7);for(let k=0;k<w;k+=8)Rc(x-w/2+k,y-h-20,6,14,'#7a5232',O,.5);P([x-w/2-6,y-h-20,x,y-h-50,x+w/2+6,y-h-20],'#9a7a44',O,.8);c.strokeStyle='rgba(60,40,20,.5)';for(let k=1;k<5;k++){c.beginPath();c.moveTo(x-w/2-6+k*(w+12)/5,y-h-20);c.lineTo(x,y-h-50);c.stroke()}return}
    Rc(x-w/2,y-h,w,h,WF);c.strokeStyle='rgba(0,0,0,.22)';c.lineWidth=1;for(let yy=y-h+11,r=0;yy<y;yy+=11,r++){c.beginPath();c.moveTo(x-w/2,yy);c.lineTo(x+w/2,yy);c.stroke()}
    const gr=c.createLinearGradient(x-w/2,0,x+w/2,0);gr.addColorStop(0,'rgba(0,0,0,.28)');gr.addColorStop(.35,'rgba(255,255,255,.06)');gr.addColorStop(1,'rgba(0,0,0,.18)');c.fillStyle=gr;c.fillRect(x-w/2,y-h,w,h);c.strokeStyle=O;c.lineWidth=.9;c.strokeRect(x-w/2,y-h,w,h);
    Rc(x-3,y-h*.62,6,16,'#1a1410');Rc(x-3,y-h*.32,6,14,'#1a1410');Rc(x-w/2-4,y-h-10,w+8,10,WT,O,.7);
    if(roof){P([x-w/2-7,y-h-10,x,y-h-10-w*1.25,x+w/2+7,y-h-10],col,O,1);P([x,y-h-10-w*1.25,x+w/2+7,y-h-10,x+w*.18,y-h-10],cD);c.strokeStyle='#e8c060';c.lineWidth=2;c.beginPath();c.moveTo(x-w/2-7,y-h-10);c.lineTo(x+w/2+7,y-h-10);c.stroke();Rc(x-1,y-h-22-w*1.25,2,14,'#e8c060')}
    else for(let k=x-w/2-4;k<x+w/2;k+=14)Rc(k,y-h-18,9,8,WT,O,.6)};
  /* กำแพงเหนือ */
  hWall(-600,600,-470);
  if(t>=3){tower(-600,-462,t>=4?66:54,WH+(t>=4?40:26),t===5);tower(600,-462,t>=4?66:54,WH+(t>=4?40:26),t===5)}
  else if(t===2){tower(-560,-430,46,70);tower(560,-430,46,70)}
  /* ฟาร์ม (ยังเปิดใช้ไม่ได้ · รอบหน้า) */
  {const n=GHPLOT[t];Rc(330,-262,236,n>8?262:n>6?212:n>4?162:n>2?112:62,'rgba(60,40,20,.25)');
    for(let i=0;i<n;i++){const x=i%2?458:342,y=-252+(i>>1)*50;Rc(x,y,96,40,'#5a3e24',O,.6);for(let k=0;k<4;k++)Rc(x+4,y+5+k*9,88,5,'#6e4c2c')}
    for(let x=326;x<=570;x+=24){Rc(x-2,-272,4,12,'#7a5232',O,.4)}Rc(326,-268,244,2,'#8a6038')}
  /* กำแพงข้าง */
  vWall(-600,-470,430);vWall(600,-470,430);
  if(t>=4){tower(-600,-10,62,WH+30,t===5);tower(600,-10,62,WH+30,t===5)}
  /* --- อาคารหลัก --- */
  const win=(x,y,w,h)=>{Rc(x,y,w,h,'#2a1c10',O,.6);Rc(x+2,y+2,w-4,h-4,'#ffcf6a');Rc(x+w/2-.6,y,1.2,h,'#3a2a1a');Rc(x,y+h/2-.6,w,1.2,'#3a2a1a')};
  const banner=(x,y,w,h)=>{P([x-w/2,y,x+w/2,y,x+w/2,y+h,x,y+h-w*.4,x-w/2,y+h],col,O,.8);Rc(x-w/2,y,w,4,'#e8c060');c.font='bold '+Math.round(w*.62)+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,x,y+h*.42);c.textBaseline='alphabetic'};
  if(t===1){/* เต็นท์บัญชาการ + เต็นท์เล็ก */
    const tent=(x,y,w,h,c1,c2,str)=>{sh(x,y+2,w*.6,10,.3);P([x-w/2,y,x,y-h,x+w/2,y],c1,O,1);P([x,y-h,x+w/2,y,x+w*.18,y],c2);if(str){for(let k=-2;k<=2;k++){c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(x,y-h);c.lineTo(x+k*w*.2,y);c.stroke()}}
      P([x-w*.12,y,x,y-h*.48,x+w*.12,y],'#2a1a10',O,.7);c.strokeStyle='#5a3a1a';c.lineWidth=2;c.beginPath();c.moveTo(x,y-h);c.lineTo(x,y-h-14);c.stroke();c.strokeStyle='rgba(60,40,20,.6)';c.lineWidth=.8;c.beginPath();c.moveTo(x-w/2,y);c.lineTo(x-w/2-14,y+6);c.moveTo(x+w/2,y);c.lineTo(x+w/2+14,y+6);c.stroke()};
    tent(-210,-320,110,78,'#8a7a5a','#6a5a40');tent(210,-320,110,78,'#7a8a5a','#5a6a40');tent(0,-300,250,150,'#c8b48a','#a8946a',1);
    [[-120,-300],[130,-296],[-300,-330],[300,-322]].forEach(([x,y])=>{sh(x,y+2,12,4);Rc(x-11,y-18,22,18,'#8a6038',O,.7);c.strokeStyle='#5a3a1a';c.beginPath();c.moveTo(x-11,y-9);c.lineTo(x+11,y-9);c.stroke()})}
  else if(t===2){/* โรงไม้ยาว + หอสังเกตการณ์ */
    sh(0,-296,190,14,.3);Rc(-160,-390,320,90,'#7a5232');for(let y=-388;y<-300;y+=9){Rc(-160,y,320,8,(y/9|0)%2?'#865a36':'#7a5232');c.fillStyle='#5a3a1e';c.beginPath();c.arc(-160,y+4,4,0,7);c.arc(160,y+4,4,0,7);c.fill()}c.strokeStyle=O;c.lineWidth=.9;c.strokeRect(-160,-390,320,90);
    P([-182,-388,0,-478,182,-388],'#a8884a',O,1);c.strokeStyle='rgba(90,64,30,.55)';c.lineWidth=1;for(let k=1;k<14;k++){c.beginPath();c.moveTo(-182+k*26,-388);c.lineTo(0,-478);c.stroke()}P([-182,-388,182,-388,170,-380,-170,-380],'#7a5a2a');
    Rc(-26,-362,52,62,'#3a2414',O,.8);Rc(-22,-358,21,58,'#5a3a1e');Rc(1,-358,21,58,'#5a3a1e');win(-120,-362,26,22);win(94,-362,26,22);banner(0,-448,30,46);
    tower(232,-300,54,96)}
  else if(t===3){/* ห้องโถงหิน */
    sh(0,-296,200,14,.32);Rc(-165,-405,330,105,WF);c.strokeStyle='rgba(0,0,0,.2)';for(let y=-394,r=0;y<-300;y+=11,r++){c.beginPath();c.moveTo(-165,y);c.lineTo(165,y);c.stroke();for(let x=-165+(r%2?11:0);x<165;x+=22){c.beginPath();c.moveTo(x,y-11);c.lineTo(x,y);c.stroke()}}c.strokeStyle=O;c.strokeRect(-165,-405,330,105);
    P([-186,-404,-146,-472,146,-472,186,-404],'#4a5262',O,1);c.strokeStyle='rgba(20,24,32,.5)';for(let y=-462;y<-404;y+=9){c.beginPath();c.moveTo(-186+(y+472)*.6-8,y);c.lineTo(186-(y+472)*.6+8,y);c.stroke()}Rc(90,-500,22,40,'#6e685c',O,.8);
    P([-30,-300,-30,-352,0,-374,30,-352,30,-300],'#3a2414',O,.9);Rc(-26,-350,52,50,'#5a3a1e');c.strokeStyle='#2a2a2a';c.lineWidth=2;c.beginPath();c.moveTo(-26,-336);c.lineTo(26,-336);c.moveTo(-26,-316);c.lineTo(26,-316);c.stroke();
    win(-126,-378,24,30);win(-76,-378,24,30);win(52,-378,24,30);win(102,-378,24,30);banner(-56,-402,24,40);banner(56,-402,24,40)}
  else{/* ป้อมกลาง (4) / ปราสาท (5) */
    const K=t===5,tw=K?160:180,th=K?300:220;
    const block=(x,y,w,h)=>{Rc(x-w/2,y-h,w,h,WF);c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=1;for(let yy=y-h+12,r=0;yy<y;yy+=12,r++){c.beginPath();c.moveTo(x-w/2,yy);c.lineTo(x+w/2,yy);c.stroke();for(let xx=x-w/2+(r%2?12:0);xx<x+w/2;xx+=24){c.beginPath();c.moveTo(xx,yy-12);c.lineTo(xx,yy);c.stroke()}}
      const gr=c.createLinearGradient(0,y-h,0,y);gr.addColorStop(0,'rgba(255,255,255,.07)');gr.addColorStop(1,'rgba(0,0,0,.22)');c.fillStyle=gr;c.fillRect(x-w/2,y-h,w,h);c.strokeStyle=O;c.lineWidth=.9;c.strokeRect(x-w/2,y-h,w,h);Rc(x-w/2-4,y-h-10,w+8,10,WT,O,.7);for(let k=x-w/2-4;k<x+w/2;k+=16)Rc(k,y-h-18,10,8,WT,O,.6)};
    sh(0,-294,210,16,.34);block(-130,-300,K?100:96,K?150:120);block(130,-300,K?100:96,K?150:120);block(0,-300,tw,th);
    if(K){tower(-178,-300,62,230,1);tower(178,-300,62,230,1);P([-tw/2-8,-300-th-10,0,-300-th-150,tw/2+8,-300-th-10],col,O,1.2);P([0,-300-th-150,tw/2+8,-300-th-10,30,-300-th-10],cD);
      c.strokeStyle='#e8c060';c.lineWidth=3;c.beginPath();c.moveTo(-tw/2-8,-300-th-10);c.lineTo(tw/2+8,-300-th-10);c.stroke();Rc(-1.5,-300-th-176,3,28,'#e8c060');
      E(0,-300-th+70,30,30,'#2a1c10',O,1);const sg=c.createRadialGradient(0,-300-th+70,4,0,-300-th+70,28);sg.addColorStop(0,'#fff6c8');sg.addColorStop(.5,cL);sg.addColorStop(1,col);E(0,-300-th+70,26,26,sg);
      for(let k=0;k<8;k++){const a=k/8*6.283;c.strokeStyle='#3a2a1a';c.lineWidth=1.6;c.beginPath();c.moveTo(0,-300-th+70);c.lineTo(Math.cos(a)*26,-300-th+70+Math.sin(a)*26);c.stroke()}}
    for(let k=-1;k<=1;k+=2){win(k*40-9,-300-th+30,18,26);win(k*130-9,-300-(K?150:120)+30,18,24)}win(-9,-300-th+(K?120:40),18,26);
    banner(-56,-300-th+(K?110:60),28,70);banner(56,-300-th+(K?110:60),28,70);
    P([-40,-300,-40,-372,0,-398,40,-372,40,-300],'#2a1c10',O,1);Rc(-36,-372,72,72,'#1a120c');c.strokeStyle='#5a5a62';c.lineWidth=2.4;for(let x=-30;x<=30;x+=10){c.beginPath();c.moveTo(x,-394+Math.abs(x)*.4);c.lineTo(x,-360);c.stroke()}c.beginPath();c.moveTo(-36,-380);c.lineTo(36,-380);c.moveTo(-36,-366);c.lineTo(36,-366);c.stroke();
    if(K){c.strokeStyle='#e8c060';c.lineWidth=2;c.beginPath();c.moveTo(-40,-372);c.lineTo(0,-398);c.lineTo(40,-372);c.stroke()}}
  /* --- คลังกิลด์ --- */
  {const x=-430,y=-150;sh(x,y+3,108,12,.3);
    if(t===1){Rc(x-80,y-46,110,40,'#7a5232',O,.8);[[x-70,y+4],[x+20,y+4]].forEach(([a,b])=>{E(a,b-6,14,14,'#4a3018',O,.8);E(a,b-6,5,5,'#8a6038')});P([x-90,y-46,x-60,y-84,x+40,y-84,x+40,y-46],'#c8b48a',O,.9);for(let k=0;k<4;k++){c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(x-80+k*30,y-84);c.lineTo(x-90+k*34,y-46);c.stroke()}
      [[x+56,y-2],[x+82,y-8],[x+68,y-26]].forEach(([a,b])=>{Rc(a-14,b-18,28,18,'#9a6a30',O,.8);Rc(a-14,b-12,28,3,'#e8c060');Rc(a-3,b-14,6,6,'#e8c060',O,.4)})}
    else if(t===2){Rc(x-90,y-80,180,80,'#7a5232');for(let yy=y-78;yy<y;yy+=9)Rc(x-90,yy,180,8,(yy/9|0)%2?'#865a36':'#7a5232');c.strokeStyle=O;c.strokeRect(x-90,y-80,180,80);P([x-104,y-78,x,y-130,x+104,y-78],'#8a6a3a',O,1);Rc(x-24,y-56,48,56,'#4a2c18',O,.8);Rc(x-24,y-40,48,4,'#3a3a3a');Rc(x-24,y-18,48,4,'#3a3a3a');E(x,y-28,6,7,'#e8c060',O,.6);c.font='bold 18px system-ui';c.textAlign='center';c.fillText('💰',x,y-90)}
    else{const K=t===5,f=K?'#e6dcc4':WF;Rc(x-92,y-88,184,88,f);c.strokeStyle='rgba(0,0,0,.2)';for(let yy=y-77,r=0;yy<y;yy+=11,r++){c.beginPath();c.moveTo(x-92,yy);c.lineTo(x+92,yy);c.stroke()}c.strokeStyle=O;c.strokeRect(x-92,y-88,184,88);
      P([x-100,y-86,x-80,y-116,x+80,y-116,x+100,y-86],K?col:'#4a5262',O,1);if(K){c.strokeStyle='#e8c060';c.lineWidth=2;c.beginPath();c.moveTo(x-100,y-86);c.lineTo(x+100,y-86);c.stroke()}
      P([x-28,y,x-28,y-50,x,y-66,x+28,y-50,x+28,y],'#3a3a40',O,1);for(let k=-20;k<=20;k+=10)Rc(x+k-1,y-60+Math.abs(k)*.3,2,58,'#6a6a72');E(x,y-30,9,9,'#e8c060',O,.8);c.font='bold 11px system-ui';c.textAlign='center';c.fillStyle='#2a1a08';c.fillText('$',x,y-26);
      Rc(x+44,y-34,30,22,'#9a6a30',O,.8);Rc(x+44,y-27,30,3,'#e8c060')}}
  /* --- ค่ายทหาร (รอบหน้า) --- */
  {const x=-450,y=236;sh(x,y+3,124,12,.3);
    if(t<=1){[[-60,0],[60,0]].forEach(([a,b])=>{P([x+a-46,y+b,x+a,y+b-62,x+a+46,y+b],'#8a8a6a',O,.9);P([x+a,y+b-62,x+a+46,y+b,x+a+14,y+b],'#6a6a4a');P([x+a-9,y+b,x+a,y+b-26,x+a+9,y+b],'#2a1a10')})}
    else if(t===2){Rc(x-110,y-62,220,62,'#7a5232');for(let yy=y-60;yy<y;yy+=9)Rc(x-110,yy,220,8,(yy/9|0)%2?'#865a36':'#7a5232');c.strokeStyle=O;c.strokeRect(x-110,y-62,220,62);P([x-124,y-60,x,y-104,x+124,y-60],'#a8884a',O,1);Rc(x-14,y-40,28,40,'#3a2414',O,.7)}
    else{Rc(x-114,y-70,228,70,WF);c.strokeStyle='rgba(0,0,0,.2)';for(let yy=y-59;yy<y;yy+=11){c.beginPath();c.moveTo(x-114,yy);c.lineTo(x+114,yy);c.stroke()}c.strokeStyle=O;c.strokeRect(x-114,y-70,228,70);P([x-122,y-68,x-100,y-98,x+100,y-98,x+122,y-68],t===5?col:'#4a5262',O,1);Rc(x-16,y-46,32,46,'#3a2414',O,.8);win(x-80,y-52,20,18);win(x+60,y-52,20,18)}
    [[-470,300],[-410,316]].forEach(([a,b])=>{sh(a,b+2,10,4);Rc(a-2,b-30,4,30,'#6a4628',O,.5);E(a,b-34,9,10,'#c8a870',O,.7);Rc(a-12,b-26,24,4,'#c8a870',O,.5);E(a,b-35,4,4,'#c84a3a')});
    Rc(-360,272,40,30,'#6a4628',O,.7);for(let k=0;k<4;k++){c.strokeStyle='#bfc4c8';c.lineWidth=2;c.beginPath();c.moveTo(-354+k*9,300);c.lineTo(-354+k*9,262);c.stroke()}}
  /* --- กระดานกิลด์ · ลังของ · บ่อน้ำ --- */
  {const x=GHBD.x,y=GHBD.y;sh(x,y+2,30,6,.3);Rc(x-24,y-40,4,40,'#5a3a1e',O,.5);Rc(x+20,y-40,4,40,'#5a3a1e',O,.5);Rc(x-30,y-62,60,36,'#8a6038',O,.9);Rc(x-26,y-58,52,28,'#d8c8a0');P([x-34,y-62,x,y-74,x+34,y-62],'#6a4628',O,.8)}
  [[-300,-110],[-288,-90],[300,330],[560,250]].forEach(([x,y],i)=>{sh(x,y+2,12,4);if(i%3===2){E(x,y-10,10,12,'#7a5232',O,.7);Rc(x-10,y-14,20,2,'#3a2a1a');Rc(x-10,y-6,20,2,'#3a2a1a')}else{Rc(x-12,y-20,24,20,'#9a6a3a',O,.7);c.strokeStyle='#5a3a1a';c.beginPath();c.moveTo(x-12,y-20);c.lineTo(x+12,y);c.stroke()}});
  /* โกดังกิลด์ */
  {const x=470,y=100;sh(x,y+3,96,11,.3);
    if(t===1){[-80,80].forEach(a=>Rc(x+a-3,y-62,6,62,'#5a3a1e',O,.6));P([x-94,y-60,x,y-92,x+94,y-60],'#a8946a',O,1);c.strokeStyle='rgba(90,64,30,.5)';for(let k=1;k<8;k++){c.beginPath();c.moveTo(x-94+k*23.5,y-60);c.lineTo(x,y-92);c.stroke()}
      [[x-56,y-2],[x-30,y-4],[x+40,y-2],[x+64,y-6]].forEach(([a,b],i)=>{if(i%2){E(a,b-10,11,12,'#c8b080',O,.7);Rc(a-4,b-24,8,4,'#8a6a40')}else{Rc(a-12,b-18,24,18,'#9a6a3a',O,.7)}})}
    else if(t===2){Rc(x-86,y-66,172,66,'#7a5232');for(let yy=y-64;yy<y;yy+=9)Rc(x-86,yy,172,8,(yy/9|0)%2?'#865a36':'#7a5232');c.strokeStyle=O;c.strokeRect(x-86,y-66,172,66);P([x-98,y-64,x,y-112,x+98,y-64],'#8a3a2a',O,1);c.strokeStyle='rgba(40,10,5,.4)';for(let k=1;k<10;k++){c.beginPath();c.moveTo(x-98+k*19.6,y-64);c.lineTo(x,y-112);c.stroke()}
      Rc(x-30,y-50,60,50,'#5a3a1e',O,.8);c.strokeStyle='#e8d8b0';c.lineWidth=2;c.beginPath();c.moveTo(x-30,y-50);c.lineTo(x+30,y);c.moveTo(x+30,y-50);c.lineTo(x-30,y);c.stroke()}
    else{const K=t===5;Rc(x-88,y-72,176,72,K?'#e6dcc4':WF);c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=1;for(let yy=y-61;yy<y;yy+=11){c.beginPath();c.moveTo(x-88,yy);c.lineTo(x+88,yy);c.stroke()}c.strokeStyle=O;c.strokeRect(x-88,y-72,176,72);
      P([x-96,y-70,x-74,y-100,x+74,y-100,x+96,y-70],K?col:'#5a4a3a',O,1);Rc(x-30,y-52,60,52,'#5a3a1e',O,.9);Rc(x-1,y-52,2,52,'#3a2414');Rc(x-30,y-36,60,3,'#3a3a3a');Rc(x-30,y-16,60,3,'#3a3a3a');win(x-74,y-54,18,16);win(x+56,y-54,18,16)}
    c.font='bold 16px system-ui';c.textAlign='center';c.textBaseline='alphabetic';c.fillText('📦',x,y-(t===1?96:t===2?118:106))}
  /* ครัวกิลด์ */
  {const x=470,y=340;sh(x,y+3,96,11,.3);
    if(t===1){[-78,78].forEach(a=>Rc(x+a-3,y-64,6,64,'#5a3a1e',O,.6));P([x-92,y-62,x-70,y-90,x+70,y-90,x+92,y-62],'#c8b48a',O,1);for(let k=0;k<5;k++){c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(x-70+k*35,y-90);c.lineTo(x-92+k*46,y-62);c.stroke()}
      Rc(x+30,y-30,44,30,'#7a5232',O,.7);Rc(x-74,y-26,36,26,'#7a5232',O,.7)}
    else if(t===2){Rc(x-84,y-64,168,64,'#7a5232');for(let yy=y-62;yy<y;yy+=9)Rc(x-84,yy,168,8,(yy/9|0)%2?'#865a36':'#7a5232');c.strokeStyle=O;c.strokeRect(x-84,y-64,168,64);P([x-96,y-62,x,y-104,x+96,y-62],'#a8884a',O,1);Rc(x+44,y-118,18,40,'#7c766a',O,.8);win(x-62,y-48,22,18);Rc(x-14,y-44,28,44,'#3a2414',O,.7)}
    else{const K=t===5;Rc(x-86,y-70,172,70,K?'#e6dcc4':WF);c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=1;for(let yy=y-59;yy<y;yy+=11){c.beginPath();c.moveTo(x-86,yy);c.lineTo(x+86,yy);c.stroke()}c.strokeStyle=O;c.strokeRect(x-86,y-70,172,70);
      P([x-94,y-68,x-72,y-98,x+72,y-98,x+94,y-68],K?col:'#4a5262',O,1);Rc(x+46,y-122,18,40,K?'#d8cfb8':'#6e685c',O,.8);win(x-66,y-52,22,20);P([x-16,y,x-16,y-40,x,y-50,x+16,y-40,x+16,y],'#3a2414',O,.8)}
    c.font='bold 16px system-ui';c.textAlign='center';c.textBaseline='alphabetic';c.fillText('🍲',x,y-(t===1?96:t===2?110:106))}
  /* สวนผลไม้ (ขั้น 3+) */
  if(t<3){[[-540,76],[-460,76]].forEach(([a,b])=>{E(a,b,24,9,'#5a3e24',O,.5);Rc(a-1,b-16,2,14,'#7a5232')})}else{const nt=[0,0,0,2,4,6][t];for(let i=0;i<nt;i++){const[a,b]=GHTP[i];E(a,b+2,26,9,'rgba(60,40,20,.35)')}}
  /* --- กำแพงใต้ + ประตู --- */
  hWall(-600,-74,430);hWall(74,600,430);
  if(t===1){Rc(-80,430-80,8,80,'#6a4628',O,.7);Rc(72,430-80,8,80,'#6a4628',O,.7);Rc(-88,430-84,176,9,'#8a6038',O,.8);c.font='bold 13px system-ui';c.textAlign='center';Rc(-50,430-74,100,18,'#c8a870',O,.6);c.fillStyle='#3a2410';c.fillText('บ้านกิลด์',0,430-61)}
  else if(t===2){tower(-96,430,44,82);tower(96,430,44,82);Rc(-74,430-74,148,12,'#7a5232',O,.8)}
  else{const T4=t>=4,w=T4?64:48,h=WH+(T4?44:28);tower(-74-w/2+6,430,w,h,t===5);tower(74+w/2-6,430,w,h,t===5);
    Rc(-74,430-WH-20,148,22,WF,O,.8);for(let k=-74;k<70;k+=16)Rc(k,430-WH-28,10,8,WT,O,.6);c.beginPath();c.moveTo(-70,430-WH+2);c.quadraticCurveTo(0,430-WH-24,70,430-WH+2);c.lineWidth=4;c.strokeStyle=WK;c.stroke();
    if(T4){c.strokeStyle='#4a4a52';c.lineWidth=2;for(let x=-60;x<=60;x+=12){c.beginPath();c.moveTo(x,430-WH-4);c.lineTo(x,430-WH+10);c.stroke()}}}
  /* มุมใต้ */
  if(t>=3){tower(-600,438,t>=4?66:54,WH+(t>=4?40:26),t===5);tower(600,438,t>=4?66:54,WH+(t>=4?40:26),t===5)}
  return{cv,S,X0,Y0,WD,HT}}
/* ---------- วาดแต่ละเฟรม ---------- */
function ghDraw(){if(!ghHere())return;const G=GDS.g,t=ghT(),col=G?gdCol(G.col):'#e8b54a',em=G?G.e:'🏰',k=t+'|'+col+'|'+em+'|'+((typeof LOWQ!=='undefined'&&LOWQ)?1:0)+'|'+((typeof ghHDok==='function'&&ghHDok())?'hd':'v');
  if(GHS.ck!==k||!GHS.C){GHS.C=ghBuild(t,col,em);GHS.ck=k}const C=GHS.C,ox=1600+C.X0,oy=1600+C.Y0;
  const vx0=Math.max(ox,cam.x-40),vy0=Math.max(oy,cam.y-40),vx1=Math.min(ox+C.WD,cam.x+W+40),vy1=Math.min(oy+C.HT,cam.y+H+40);
  if(vx1>vx0&&vy1>vy0)g.drawImage(C.cv,(vx0-ox)*C.S,(vy0-oy)*C.S,(vx1-vx0)*C.S,(vy1-vy0)*C.S,vx0,vy0,vx1-vx0,vy1-vy0);
  const now=performance.now()/1000,X=1600,Y=1600,O='#1a120a';g.save();
  /* ธงกิลด์ 2 ต้นหน้าอาคาร */
  [[-112,-246],[112,-246]].forEach(([a,b],i)=>{const x=X+a,y=Y+b,hh=t>=4?130:t>=2?110:92;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+2,9,3.5,0,0,7);g.fill();g.fillStyle=t===5?'#e8c060':'#5a3a1e';g.fillRect(x-2,y-hh,4,hh);g.fillStyle='#e8c060';g.beginPath();g.arc(x,y-hh-3,4,0,7);g.fill();
    const fw=t>=4?62:50,fh=t>=4?40:32,dir=i?-1:1;g.beginPath();g.moveTo(x+2*dir,y-hh+2);for(let s=0;s<=10;s++){const u=s/10;g.lineTo(x+2*dir+dir*u*fw,y-hh+2+Math.sin(now*3.2+u*4+i)*4*u)}for(let s=10;s>=0;s--){const u=s/10;g.lineTo(x+2*dir+dir*u*fw,y-hh+2+fh+Math.sin(now*3.2+u*4+i)*4*u)}g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=O;g.lineWidth=.8;g.stroke();
    g.font='bold '+Math.round(fh*.55)+'px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(em,x+dir*fw*.5,y-hh+2+fh*.5+Math.sin(now*3.2+2+i)*2);g.textBaseline='alphabetic'});
  /* กองไฟ (1–2) / น้ำพุ (3–5) */
  if(GHS.hd){}
  else if(t<=2){const x=X,y=Y+22;for(let k=0;k<10;k++){const a=k/10*6.283;g.fillStyle=k%2?'#7c766a':'#8f897c';g.beginPath();g.ellipse(x+Math.cos(a)*26,y+Math.sin(a)*14,6,4,0,0,7);g.fill()}g.fillStyle='#4a3018';g.fillRect(x-16,y-3,32,5);g.fillRect(x-3,y-10,6,16);
    g.globalCompositeOperation='lighter';glowAt(x,y-8,60,'255,150,60',.55+.12*Math.sin(now*9));g.globalCompositeOperation='source-over';
    for(let k=0;k<3;k++){const f=Math.sin(now*12+k*2)*3;g.fillStyle=['#ff6a20','#ffa040','#ffe070'][k];g.beginPath();g.moveTo(x-12+k*4,y);g.quadraticCurveTo(x-6+k*3+f,y-20-k*4,x+f*.5,y-34+k*8);g.quadraticCurveTo(x+6-k*3+f,y-20-k*4,x+12-k*4,y);g.closePath();g.fill()}
    [[-62,30],[62,30],[0,-34]].forEach(([a,b])=>{g.fillStyle='#6a4628';g.fillRect(x+a-18,y+b-4,36,8);g.strokeStyle=O;g.lineWidth=.6;g.strokeRect(x+a-18,y+b-4,36,8)})}
  else{const x=X,y=Y+22,K=t===5,sc=K?'#e6dcc4':'#9a958a';g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+6,74,30,0,0,7);g.fill();g.fillStyle=sc;g.beginPath();g.ellipse(x,y,72,32,0,0,7);g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
    g.fillStyle='#2a6a8a';g.beginPath();g.ellipse(x,y-4,62,25,0,0,7);g.fill();g.globalAlpha=.35;g.strokeStyle='#bfe8ff';for(let k=0;k<3;k++){const r=((now*.5+k/3)%1);g.beginPath();g.ellipse(x,y-4,14+r*46,6+r*18,0,0,7);g.globalAlpha=.4*(1-r);g.stroke()}g.globalAlpha=1;
    g.fillStyle=sc;g.fillRect(x-7,y-40,14,38);g.beginPath();g.ellipse(x,y-40,20,8,0,0,7);g.fill();g.stroke();if(K){g.fillStyle='#e8c060';g.beginPath();g.arc(x,y-58,9,0,7);g.fill();g.font='bold 12px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(em,x,y-58);g.textBaseline='alphabetic'}
    g.globalCompositeOperation='lighter';for(let k=0;k<14;k++){const q=(now*1.4+k/14)%1,a=k/14*6.283,r=q*34;g.fillStyle='rgba(180,230,255,'+(.55*(1-q))+')';g.beginPath();g.arc(x+Math.cos(a)*r,y-44+q*q*40-(1-q)*q*30+Math.sin(a)*r*.35,2,0,7);g.fill()}g.globalCompositeOperation='source-over'}
  /* คบไฟ */
  if(!GHS.hd){const L=t<=1?[[-70,300],[70,300],[-70,-200],[70,-200]]:[[-70,360],[70,360],[-70,190],[70,190],[-70,-200],[70,-200],[-330,-60],[330,-60]];
    L.forEach(([a,b],i)=>{const x=X+a,y=Y+b;if(!inView(x,y,60))return;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+2,6,2.5,0,0,7);g.fill();g.fillStyle=t>=3?'#4a4a52':'#5a3a1e';g.fillRect(x-2,y-34,4,34);g.fillStyle='#3a2a1a';g.fillRect(x-5,y-38,10,5);
      const fl=Math.sin(now*11+i*1.7)*1.6;g.fillStyle='#ffb040';g.beginPath();g.moveTo(x-4,y-38);g.quadraticCurveTo(x+fl,y-54,x+4,y-38);g.fill();g.globalCompositeOperation='lighter';glowAt(x,y-44,34,'255,170,80',.42+.1*Math.sin(now*7+i));g.globalCompositeOperation='source-over'})}
  /* ควันปล่อง (ขั้น 3) */
  if(t===3){for(let k=0;k<5;k++){const q=(now*.25+k/5)%1;g.fillStyle='rgba(200,200,200,'+(.28*(1-q))+')';g.beginPath();g.arc(X+101+Math.sin(q*4+k)*6,Y-504-q*70,6+q*10,0,7);g.fill()}}
  /* ผู้ดูแลคลัง */
  {const x=X+GHN.x,y=Y+GHN.y,fx=me.x<x?-1:1;if(inView(x,y,120)){g.globalCompositeOperation='lighter';glowAt(X-380,Y-130,22,'255,210,90',.35+.15*Math.sin(now*3));g.globalCompositeOperation='source-over';
    g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+13,11,4,0,0,7);g.fill();try{drawChar(x,y,'merchant',fx,0,0,now,0)}catch(e){}
    g.font='11px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText(GHN.n,x,y-36);g.font='bold 10px system-ui';g.fillStyle='#ffd84a';g.fillText('💰 คลังกิลด์',x,y-48);try{npcSay('ghq',x,y,GHSAY,200,62)}catch(e){}}}
  /* กระดานกิลด์: ประกาศ */
  {const x=X+GHBD.x,y=Y+GHBD.y;if(inView(x,y,80)&&!GHS.hd){const nt=(G&&G.nt)||'ยังไม่มีประกาศ';g.font='7px system-ui';g.textAlign='left';g.fillStyle='#3a2410';const w=[...nt];let ln='',yy=y-50;for(let i=0;i<w.length&&yy<y-30;i++){ln+=w[i];if(g.measureText(ln).width>46||i===w.length-1){g.fillText(ln,x-24,yy);ln='';yy+=8}}
    g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText('📜 กระดานกิลด์',x,y-80)}}
  try{ghDraw2(t,col,now)}catch(e){}
  /* ป้ายหน้าประตู + ป้ายฟาร์ม/ค่ายทหาร */
  {const lab=(x,y,s,c2)=>{if(!inView(x,y,120))return;g.font='bold 11px system-ui';g.textAlign='center';const tw=g.measureText(s).width+16;g.fillStyle='rgba(30,20,10,.78)';g.beginPath();g.roundRect(x-tw/2,y-12,tw,17,8);g.fill();g.strokeStyle=c2||'rgba(255,220,150,.5)';g.lineWidth=1;g.stroke();g.fillStyle='#ffe6b0';g.fillText(s,x,y+1)};
    lab(X,Y+262,(G?G.e+' ['+G.tag+'] ':'')+'ขั้น '+t+' · '+GHT[t].n+(G&&G.hq&&G.hq.wl?' · 🧱'+G.hq.wl+' 🚪'+G.hq.gl:''),col);lab(X+448,Y-290,'🌱 ฟาร์มกิลด์');lab(X-450,Y+150,'⚔️ ค่ายทหาร');if(t<3)lab(X-500,Y+50,'🌳 สวนผลไม้ · บ้านขั้น 3');
    if(Math.hypot(me.x-X,me.y-(Y+430))<220)lab(X,Y+452,'🚪 ทางออก → ค่ายผู้อพยพ')}
  g.restore();
  /* พลุฉลองขยายบ้าน */
  if(GHS.fw>Date.now()&&Date.now()-GHS.fwT>260){GHS.fwT=Date.now();try{const a=Math.random()*6.283,r=120+Math.random()*260;burst(me.x+Math.cos(a)*r,me.y-120+Math.sin(a)*r*.5,[col,'#ffd84a','#ffffff'],26,170,1,{glow:1,g:30});if(Math.random()<.5)sfx('coin')}catch(e){}}}
/* ประตูในค่าย */
function ghCampGate(){if(curMap!==1||!inView(GHG.x,GHG.y,160))return;const x=GHG.x,y=GHG.y,now=performance.now()/1000,G=GDS.g,col=G?gdCol(G.col):'#c8a870',O='#1a120a';g.save();
  g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+4,74,12,0,0,7);g.fill();
  /* พื้นหินหน้าประตู */
  g.fillStyle='#8a8478';g.beginPath();g.ellipse(x,y+22,58,16,0,0,7);g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(x+k*22,y+8);g.lineTo(x+k*24,y+36);g.stroke()}
  /* ประตูเรืองแสง */
  const gr=g.createLinearGradient(0,y-80,0,y);gr.addColorStop(0,'rgba(255,230,160,.15)');gr.addColorStop(1,'rgba(255,210,120,.65)');g.fillStyle=gr;g.beginPath();g.moveTo(x-40,y);g.lineTo(x-40,y-62);g.quadraticCurveTo(x,y-96,x+40,y-62);g.lineTo(x+40,y);g.closePath();g.fill();
  g.globalCompositeOperation='lighter';glowAt(x,y-34,52,'255,210,120',.35+.12*Math.sin(now*2.5));for(let k=0;k<6;k++){const q=(now*.4+k/6)%1;g.fillStyle='rgba(255,236,170,'+(.6*(1-q))+')';g.beginPath();g.arc(x-30+((k*37)%60),y-6-q*70,1.8,0,7);g.fill()}g.globalCompositeOperation='source-over';
  /* เสา + ซุ้ม */
  const pil=px=>{g.fillStyle='#8c8676';g.fillRect(px-12,y-90,24,90);g.strokeStyle='rgba(0,0,0,.25)';for(let yy=y-80;yy<y;yy+=10){g.beginPath();g.moveTo(px-12,yy);g.lineTo(px+12,yy);g.stroke()}g.strokeStyle=O;g.lineWidth=.9;g.strokeRect(px-12,y-90,24,90);g.fillStyle='#a8a292';g.fillRect(px-15,y-98,30,9);g.strokeRect(px-15,y-98,30,9)};
  pil(x-52);pil(x+52);g.fillStyle='#9a9484';g.beginPath();g.moveTo(x-64,y-96);g.quadraticCurveTo(x,y-140,x+64,y-96);g.lineTo(x+64,y-84);g.quadraticCurveTo(x,y-124,x-64,y-84);g.closePath();g.fill();g.strokeStyle=O;g.stroke();
  /* ธง */
  const fw=26,fh=44;g.beginPath();g.moveTo(x-fw/2,y-118);g.lineTo(x+fw/2,y-118);for(let s=0;s<=6;s++){const u=s/6;g.lineTo(x+fw/2+Math.sin(now*3+u*3)*1.5,y-118+u*fh)}g.lineTo(x,y-118+fh-8);g.lineTo(x-fw/2,y-118+fh);g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=O;g.lineWidth=.8;g.stroke();
  g.font='bold 15px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(G?G.e:'🏰',x,y-100);g.textBaseline='alphabetic';
  /* ป้าย */
  if(Math.hypot(me.x-x,me.y-y)<300){g.font='bold 11px system-ui';const lb=G?'🏰 บ้านกิลด์ ['+G.tag+'] · ขั้น '+ghT():'🏰 ประตูบ้านกิลด์',tw=g.measureText(lb).width+16;g.fillStyle='rgba(40,24,10,.82)';g.beginPath();g.roundRect(x-tw/2,y-160,tw,17,8);g.fill();g.strokeStyle=col;g.lineWidth=1;g.stroke();g.fillStyle='#ffe6b0';g.fillText(lb,x,y-147)}
  g.restore()}
/* ---------- หน้าต่างคลังกิลด์ ---------- */
function ghUI(msg){if(!me.cls)return;if(msg)GHS.msg={s:msg,t:Date.now()};else if(GHS.msg&&Date.now()-GHS.msg.t<5000)msg=GHS.msg.s;ov.dataset.k='gh';ov.hidden=false;const G=GDS.g,H=G&&G.hq;
  let h=hdr('🏰','บ้านกิลด์',G?G.e+' '+esc(G.nm)+' ['+esc(G.tag)+'] · กิลด์ Lv '+G.lvl:'')+(msg?'<div class="note">'+msg+'</div>':'');
  if(!gdOnl()||!G){h+='<div class="card hint">'+(!gdOnl()?'🏰 ใช้ได้เมื่อเล่นออนไลน์บนเซิร์ฟเวอร์เท่านั้น':'🏰 ต้องมีกิลด์ก่อน · เมนู › 🏰 กิลด์')+'</div>';ov.innerHTML='<div class="pn" data-pn="gh">'+h+'</div>';return}
  if(!H){h+='<div class="card hint">กำลังโหลดข้อมูลคลังกิลด์…</div>';ov.innerHTML='<div class="pn" data-pn="gh">'+h+'</div>';try{gdEmit('q')}catch(e){}return}
  const col=gdCol(G.col),t=Math.max(1,Math.min(5,H.t|0)),nx=H.nx,TB=GHS.tab||'bank';
  h+='<div class="tabs" style="gap:4px">'+[['bank','💰 คลัง'],['farm','🌱 ฟาร์ม'],['food','🍲 ครัว'+(H.gift?' (1)':'')],['def','🛡️ ป้อม'],['shop','🛒 ร้าน']].map(([k,l])=>'<button class="tab'+(TB===k?' on':'')+'" data-ght="'+k+'" style="flex:1;font-size:12px;padding:6px 2px;min-width:0">'+l+'</button>').join('')+'</div>';
  if(TB!=='bank'){try{h+=ghBody2(TB,G,H,t,col)}catch(e){h+='<div class="card hint">โหลดไม่สำเร็จ</div>'}h+='<div class="card tnact">'+(ghHere()?'<button data-gha="out">🚪 กลับค่ายผู้อพยพ</button>':'')+'<button data-gha="gd">🏰 เมนูกิลด์</button></div>';ov.innerHTML='<div class="pn" data-pn="gh">'+h+'</div>';try{ghAfter2(TB)}catch(e){}return}
  /* ขั้นบ้าน */
  h+='<div class="card" style="border-color:'+col+'88;text-align:left"><div style="display:flex;align-items:center;gap:10px"><span style="font-size:40px">'+GHT[t].ic+'</span><div style="flex:1;min-width:0"><b style="font-size:16px;color:'+col+'">ขั้น '+t+'/5 · '+GHT[t].n+'</b><small style="display:block;opacity:.8">'+GHT[t].d+'</small></div></div>'+
    '<div style="font-size:13px;display:flex;justify-content:space-between;margin-top:6px"><span>💰 คลังกิลด์</span><b style="color:#ffd84a">'+(H.f|0).toLocaleString()+' ทอง</b></div>';
  if(nx){const okF=H.f>=nx.f,okL=G.lvl>=nx.l,okW=!nx.w||((H.wl|0)>=nx.w&&(H.gl|0)>=nx.w),can=okF&&okL&&okW&&G.r>=1;
    h+='<div style="font-size:12px;display:flex;justify-content:space-between;margin-top:4px"><span>ขั้นถัดไป: '+GHT[t+1].ic+' '+GHT[t+1].n+'</span><b>'+ghF(Math.min(H.f,nx.f))+' / '+ghF(nx.f)+'</b></div>'+gdBar(H.f,nx.f,okF?'#58c06a':'#e8b54a')+
      '<div style="font-size:12px;margin-top:4px">'+(okF?'✅':'⬜')+' คลัง '+nx.f.toLocaleString()+' ทอง &nbsp; '+(okL?'✅':'⬜')+' กิลด์ Lv '+nx.l+' (ตอนนี้ Lv '+G.lvl+')'+(nx.w?'<br>'+(okW?'✅':'⬜')+' กำแพง/ประตู Lv '+nx.w+' (ตอนนี้ '+(H.wl|0)+'/'+(H.gl|0)+')':'')+'</div>'+
      (G.r>=1?'<button class="pri" data-gha="up" style="margin-top:6px"'+(can?'':' disabled')+'>'+(GHS.cf?'⚠️ ยืนยันใช้ '+nx.f.toLocaleString()+' ทอง ขยายเป็น «'+GHT[t+1].n+'»':'⬆️ ขยายบ้านเป็นขั้น '+(t+1)+' · '+GHT[t+1].n)+'</button>':'<small style="display:block;opacity:.7;margin-top:4px">👑 หัวหน้า/⭐ รองหัวหน้าเป็นคนกดขยายบ้าน · ใช้เงินจากคลังกิลด์</small>')}
  else h+='<b style="display:block;color:#9fe89f;margin-top:6px">🏰 บ้านกิลด์ขั้นสูงสุดแล้ว!</b>';
  h+='</div>';
  /* บริจาค */
  const left=H.left|0,amt=Math.min(GHS.amt,left),okLv=me.lv>=20;
  h+='<div class="card" style="text-align:left"><div class="cap">💰 บริจาคเข้าคลังกิลด์</div>'+
    '<div style="font-size:12px;display:flex;justify-content:space-between"><span>บริจาควันนี้</span><b>'+(H.today|0).toLocaleString()+' / '+(H.cap|0).toLocaleString()+'</b></div>'+gdBar(H.today,H.cap,'#ffd84a')+
    '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">'+[10000,100000,500000,1000000].map(v=>'<button data-ghm="'+v+'" style="flex:1 1 auto;font-size:12px;padding:5px 6px'+(GHS.amt===v?';outline:2px solid #ffd84a':'')+'"'+(v>left?' disabled':'')+'>'+ghF(v)+'</button>').join('')+
    '<button data-ghm="max" style="flex:1 1 auto;font-size:12px;padding:5px 6px">สูงสุด</button></div>'+
    '<div style="display:flex;gap:6px;margin-top:6px;align-items:center"><input id="ghamt" type="number" min="1000" step="1000" value="'+Math.max(0,amt)+'" style="flex:1;min-width:0"><button class="pri" data-gha="don"'+(okLv&&left>=1000&&!GHS.pend?'':' disabled')+'>'+(GHS.pend?'⏳ กำลังส่ง…':'💰 บริจาค')+'</button></div>'+
    '<small style="display:block;opacity:.75;margin-top:4px">มีทอง '+(me.gold|0).toLocaleString()+' · ขั้นต่ำ 1,000 · เพดานคนละ 2,000,000/วัน (รีเซ็ตเที่ยงคืน) · '+(okLv?'':'<b style="color:#ff9a8a">ต้อง Lv 20+</b> · ')+'<b>บริจาคแล้วเบิกคืนไม่ได้</b> · ใช้ได้เฉพาะพัฒนาบ้านกิลด์</small>'+
    '<div style="margin-top:6px;padding:6px 8px;border-radius:8px;background:rgba(255,216,74,.08);font-size:12.5px">🎖️ แต้มกิลด์ของคุณ <b style="color:#ffd84a">'+(H.pt|0).toLocaleString()+'</b> แต้ม · บริจาครวม '+(H.tot|0).toLocaleString()+' ทอง<br><small style="opacity:.75">ทุก 10,000 ทอง = 1 แต้ม · ไว้แลกของในร้านกิลด์ (เปิดรอบถัดไป)</small></div></div>';
  /* อันดับ + ประวัติ */
  const RK=GHS.rk,L=RK==='all'?H.top:H.wk;
  h+='<div class="card" style="text-align:left"><div class="tabs" style="gap:4px">'+[['wk','🏆 สัปดาห์นี้'],['all','👑 ตลอดกาล'],['log','📜 ประวัติ']].map(([k,l])=>'<button class="tab'+(RK===k?' on':'')+'" data-ghr="'+k+'" style="flex:1;font-size:12px;padding:5px 6px">'+l+'</button>').join('')+'</div>';
  if(RK==='log'){const Lg=(H.log||[]).slice().reverse();h+=Lg.length?Lg.map(e=>'<div style="font-size:12px;padding:3px 2px;border-bottom:1px solid var(--u-line)">'+(e.k==='d2'?'🛠️ <b>'+esc(e.n)+'</b> '+esc(e.s||'')+(e.a?' · ใช้ '+(e.a|0).toLocaleString()+' ทอง':'')+(e.wd?' + 🪵 '+e.wd:''):e.k==='u'?'⬆️ <b style="color:'+col+'">'+esc(e.n)+'</b> ขยายบ้านเป็นขั้น '+e.t+' · ใช้ '+(e.a|0).toLocaleString()+' ทอง':'💰 <b>'+esc(e.n)+'</b> บริจาค '+(e.a|0).toLocaleString()+' ทอง')+' <small style="opacity:.5">'+new Date(e.at).toLocaleString('th-TH',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</small></div>').join(''):'<small style="opacity:.6">ยังไม่มีประวัติ</small>'}
  else h+=(L&&L.length)?L.map((r,i)=>'<div style="display:flex;gap:8px;font-size:12.5px;padding:3px 2px;'+(r[2]?'color:'+col+';font-weight:700':'')+'"><span style="width:22px">'+(i<3?['🥇','🥈','🥉'][i]:(i+1)+'.')+'</span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(r[0])+(RK==='all'&&r[3]===0?' <small style="opacity:.5">(ออกแล้ว)</small>':'')+'</span><b>'+ghF(r[1])+'</b></div>').join(''):'<small style="opacity:.6">ยังไม่มีคนบริจาค'+(RK==='wk'?'สัปดาห์นี้':'')+' — เป็นคนแรกเลย!</small>';
  h+='</div>';
  /* ตารางขั้น */
  h+='<div class="card" style="text-align:left"><div class="cap">🗺️ เส้นทางบ้านกิลด์</div>'+[1,2,3,4,5].map(i=>'<div style="display:flex;gap:8px;align-items:center;font-size:12px;padding:3px 0;'+(i>t?'opacity:.55':'')+'"><span style="font-size:18px">'+GHT[i].ic+'</span><div style="flex:1;min-width:0"><b>'+i+'. '+GHT[i].n+'</b>'+(i===t?' <small style="color:'+col+'">← ตอนนี้</small>':'')+'<small style="display:block;opacity:.75">'+(i===1?'ได้ทันทีเมื่อมีกิลด์':ghF(GHFREQ[i])+' ทอง · กิลด์ Lv '+GHLREQ[i]+' · กำแพง/ประตู Lv '+(i-1)*2)+'<br>แปลงฟาร์ม '+GHPLOT[i]+' · ป้อม '+[0,0,2,4,6,8][i]+' · ทหาร '+[0,0,4,8,12,16][i]+(i>=3?' · ต้นไม้ '+[0,0,0,2,4,6][i]:'')+'</small></div><span>'+(i<=t?'✅':'🔒')+'</span></div>').join('')+
    '<small style="opacity:.7">ศึกมอนบุกจะเปิดในรอบถัดไป · ขยายบ้านต้องอัปกำแพง/ประตูให้ถึง Lv ตามขั้นด้วย</small></div>';
  h+='<div class="card tnact">'+(ghHere()?'<button data-gha="out">🚪 กลับค่ายผู้อพยพ</button>':'')+'<button data-gha="gd">🏰 เมนูกิลด์</button></div>';
  ov.innerHTML='<div class="pn" data-pn="gh">'+h+'</div>';
  const ia=$('ghamt');if(ia)ia.oninput=()=>{GHS.amt=Math.max(0,Math.floor(+ia.value||0))}}
function ghDonate(){const G=GDS.g,H=G&&G.hq;if(!G||!H)return;if(GHS.pend)return ghUI('⏳ รอผลการบริจาคครั้งก่อนก่อน');const ia=$('ghamt');const a=Math.floor(+(ia?ia.value:GHS.amt)||0);GHS.amt=a;
  if(me.lv<20)return ghUI('⚠️ ต้องเลเวล 20 ขึ้นไปถึงบริจาคได้');if(!(a>=1000))return ghUI('⚠️ บริจาคขั้นต่ำ 1,000 ทอง');if(a>(H.left|0))return ghUI('⚠️ เกินเพดานวันนี้ (เหลือ '+(H.left|0).toLocaleString()+' ทอง)');if(me.gold<a)return ghUI('⚠️ ทองไม่พอ');
  const n=Date.now().toString(36)+Math.random().toString(36).slice(2,6);me.gold-=a;GHS.pend={n,a,t:Date.now()};try{writeSave()}catch(e){}
  if(!gdEmit('hqd',{a,n})){me.gold+=a;GHS.pend=null;return ghUI('⚠️ ส่งไม่ได้ · ต้องเชื่อมต่อเซิร์ฟเวอร์')}
  setTimeout(()=>{const P=GHS.pend;if(P&&P.n===n){me.gold+=P.a;GHS.pend=null;try{writeSave()}catch(e){}banner={s:'⚠️ เซิร์ฟเวอร์ไม่ตอบ · คืนทอง '+P.a.toLocaleString()+' แล้ว',t:4};if(ov.dataset.k==='gh'&&!ov.hidden)ghUI('⚠️ เซิร์ฟเวอร์ไม่ตอบ · คืนทองแล้ว')}},20000);ghUI('⏳ กำลังบริจาค '+a.toLocaleString()+' ทอง…')}
function ghAct(a){const G=GDS.g;
  if(a==='don')return ghDonate();
  if(a==='out'){ov.hidden=true;ghExit();return}
  if(a==='gd'){GDS.tab='ov';gdUI();gdEmit('q');return}
  if(a==='open'){GHS.tab='bank';GHS.cf=0;ghUI();gdEmit('q');return}
  if(a==='up'){const H=G&&G.hq;if(!H||!H.nx||G.r<1)return;if(!GHS.cf){GHS.cf=1;ghUI();return}GHS.cf=0;gdEmit('hqu',{t:H.t});ghUI('⏳ กำลังขยายบ้าน…');return}}
setTimeout(()=>{try{ov.addEventListener('click',e=>{const k=ov.dataset.k;if(k!=='gh'&&k!=='gd')return;const b=e.target.closest&&e.target.closest('[data-gha],[data-ghm],[data-ghr],[data-ght],[data-gh2]');if(!b)return;e.stopPropagation();try{sfx('click')}catch(_){}
  if(b.dataset.ghm){const H=GDS.g&&GDS.g.hq;GHS.amt=b.dataset.ghm==='max'?Math.min(H?H.left|0:0,Math.floor((me.gold|0)/1000)*1000):+b.dataset.ghm;GHS.cf=0;ghUI();return}
  if(b.dataset.ghr){GHS.rk=b.dataset.ghr;ghUI();return}if(b.dataset.ght){GHS.tab=b.dataset.ght;GHS.cf=0;ghUI();return}if(b.dataset.gh2!=null){try{ghAct2(b.dataset.gh2)}catch(_){}return}ghAct(b.dataset.gha)},true)}catch(e){}},0);
/* ---------- ข้อความจากเซิร์ฟเวอร์ ---------- */
gdN=(f=>function(d){try{if(d&&d.t){const G=GDS.g,tg=G?'🏰['+G.tag+'] ':'🏰 ';
  if(d.t==='hqd'){const P=GHS.pend;if(P&&P.n===d.n){GHS.pend=null;try{me.stt.ghd=(me.stt.ghd||0)+P.a}catch(e){}try{writeSave()}catch(e){}try{sfx('coin')}catch(e){}try{burst(me.x,me.y-24,['#ffd84a','#fff3b0','#ffffff'],22,120,.8,{glow:1,g:-30})}catch(e){}
      try{sysMsg(tg+'💰 คุณบริจาค '+P.a.toLocaleString()+' ทองเข้าคลังกิลด์ · แต้มกิลด์ '+(d.pt|0).toLocaleString())}catch(e){}if(ov.dataset.k==='gh'&&!ov.hidden)ghUI('✅ บริจาค '+P.a.toLocaleString()+' ทองแล้ว · ขอบคุณ!');else banner={s:'💰 บริจาค '+P.a.toLocaleString()+' ทองเข้าคลังกิลด์แล้ว',t:3}}return}
  if(d.t==='hqe'){const P=GHS.pend;if(P&&P.n===d.n){me.gold+=P.a;GHS.pend=null;try{writeSave()}catch(e){}}if(ov.dataset.k==='gh'&&!ov.hidden)ghUI('⚠️ '+esc(d.s||'บริจาคไม่สำเร็จ')+' · คืนทองแล้ว');else banner={s:'⚠️ '+(d.s||'บริจาคไม่สำเร็จ'),t:3.5};return}
  if(d.t==='hqx'){try{sysMsg(tg+'💰 '+d.n+' บริจาค '+(d.a|0).toLocaleString()+' ทองเข้าคลังกิลด์')}catch(e){}return}
  if(d.t==='hqu'){const tt=Math.max(1,Math.min(5,d.tt|0));try{if(G&&G.hq)G.hq.t=tt}catch(e){}banner={s:'🏰 '+d.n+' ขยายบ้านกิลด์เป็นขั้น '+tt+' · '+GHT[tt].n+'! 🎉',t:6};try{sysMsg(tg+'🏰 '+d.n+' ขยายบ้านกิลด์เป็นขั้น '+tt+' · '+GHT[tt].n+' (ใช้ '+(d.a|0).toLocaleString()+' ทองจากคลัง)')}catch(e){}try{sfx('lvl')}catch(e){}
    if(ghHere()){GHS.fw=Date.now()+4500;GHS.ck=''}if(ov.dataset.k==='gh'&&!ov.hidden)ghUI('🎉 ขยายบ้านเป็นขั้น '+tt+' แล้ว!');return}
  if(d.t==='err'&&ov.dataset.k==='gh'&&!ov.hidden){ghUI('⚠️ '+esc(d.s||''));return}}}catch(e){}return f.apply(this,arguments)})(gdN);
gdR=(f=>function(d){const r=f.apply(this,arguments);GHS.rx=Date.now();try{const G=GDS.g;
  if(ghHere()){const M=MAPS[curMap];if(!G||M.gid!==G.id){banner={s:'🏰 คุณไม่ได้อยู่กิลด์นี้แล้ว · กลับค่าย',t:4};enterMap(1,{x:GHG.x,y:GHG.y+58})}else M.n='บ้านกิลด์ ['+G.tag+']'}
  if(ov.dataset.k==='gh'&&!ov.hidden)ghUI()}catch(e){}return r})(gdR);
/* ปุ่มในเมนูกิลด์ › ภาพรวม */
gdUI=(f=>function(){const r=f.apply(this,arguments);try{const G=GDS.g;if(G&&GDS.tab==='ov'&&ov.dataset.k==='gd'){const tb=ov.querySelector('.tabs');if(tb){const H=G.hq,t=H?Math.max(1,Math.min(5,H.t|0)):1;
  tb.insertAdjacentHTML('afterend','<div class="card" style="display:flex;align-items:center;gap:10px;text-align:left"><span style="font-size:30px">'+GHT[t].ic+'</span><div style="flex:1;min-width:0"><b>บ้านกิลด์ ขั้น '+t+' · '+GHT[t].n+'</b><small style="display:block;opacity:.8">💰 คลัง '+(H?(H.f|0).toLocaleString():'-')+' ทอง · ประตูอยู่ในค่ายฝั่งตะวันออกเฉียงใต้</small></div><button class="pri" data-gha="open">💰 คลัง</button></div>')}}}catch(e){}return r})(gdUI);
/* ---------- ปุ่มโต้ตอบ (ใช้ปุ่มเต็นท์เดิม #tnb) ---------- */
tentTick=(f=>function(){const r=f.apply(this,arguments);try{GHS.near='';const b=$('tnb');if(!b||!b.hidden||!me.cls||!run||me.down>0||!ov.hidden||SD.on)return r;let tx='';
  if(curMap===1&&Math.hypot(me.x-GHG.x,me.y-(GHG.y+20))<70){tx=GDS.g?'🏰 เข้าบ้านกิลด์ ['+GDS.g.tag+']':'🏰 บ้านกิลด์ (ต้องมีกิลด์)';GHS.near='in'}
  else if(ghHere()){const X=1600,Y=1600;if(Math.hypot(me.x-(X+GHN.x),me.y-(Y+GHN.y))<80){tx='💰 คลังกิลด์ · บริจาค';GHS.near='bank'}else if(Math.hypot(me.x-(X+GHBD.x),me.y-(Y+GHBD.y+20))<70){tx='📜 กระดานกิลด์';GHS.near='board'}else if(Math.hypot(me.x-(X+GHST.x),me.y-(Y+GHST.y))<70){tx='📦 โกดังกิลด์';GHS.near='store'}else if(Math.hypot(me.x-(X+GHKI.x),me.y-(Y+GHKI.y))<75){tx='🍲 ครัวกิลด์';GHS.near='kitchen'}else if(me.x>X+316&&me.x<X+580&&me.y>Y-284&&me.y<Y+22){tx='🌱 ฟาร์มกิลด์';GHS.near='farm'}else if(GHTP.slice(0,[0,0,0,2,4,6][ghT()]).some(([a,b])=>Math.hypot(me.x-(X+a),me.y-(Y+b+14))<52)){tx='🌳 สวนผลไม้';GHS.near='tree'}else if(me.y>Y+430-70&&Math.abs(me.x-X)<90){tx='🚪 กลับค่ายผู้อพยพ';GHS.near='out'}}
  if(tx){b.hidden=false;if(b.textContent!==tx)b.textContent=tx;b.dataset.f='gh'}}catch(e){}return r})(tentTick);
tentBtn=(f=>function(){const b=$('tnb');if(b&&b.dataset.f==='gh'){const k=GHS.near;try{sfx('click')}catch(e){}if(k==='in')ghEnter();else if(k==='out')ghExit();else if(k==='bank'){GHS.tab='bank';GHS.cf=0;ghUI();gdEmit('q')}else if(k==='board'){GDS.tab='ov';gdUI();gdEmit('q')}else if(k==='farm'||k==='tree'){GHS.tab='farm';GHS.cf=0;ghUI();gdEmit('q')}else if(k==='store'||k==='kitchen'){GHS.tab='food';GHS.cf=0;ghUI();gdEmit('q')}return}return f.apply(this,arguments)})(tentBtn);
/* ---------- ต่อเข้าระบบเดิม ---------- */
drawTent=(f=>function(){const r=f.apply(this,arguments);try{ghDraw()}catch(e){}return r})(drawTent);
drawTentGate=(f=>function(){const r=f.apply(this,arguments);try{ghCampGate()}catch(e){}return r})(drawTentGate);
tentCollide=(f=>function(){const r=f.apply(this,arguments);try{ghCollide()}catch(e){}return r})(tentCollide);
aqStep=(f=>function(){try{if(AQ&&ghHere()&&me.cls&&run){ghExit();return}}catch(e){}return f.apply(this,arguments)})(aqStep);
try{vzKind=(f=>function(id){try{if(MAPS[id]&&MAPS[id].ghq)return'🏰 บ้านกิลด์'}catch(e){}return f.apply(this,arguments)})(vzKind)}catch(e){}
try{friMapN=(f=>function(mp){mp=mp|0;if(mp>=5000&&mp<10000)return'🏰 ในบ้านกิลด์';return f.apply(this,arguments)})(friMapN)}catch(e){}
try{u64Dest=(f=>function(){const L=f.apply(this,arguments);try{L.push({ic:'🏰',n:'ประตูบ้านกิลด์',x:GHG.x,y:GHG.y+40})}catch(e){}return L})(u64Dest)}catch(e){}
setTimeout(()=>{try{CAMP.cols.push([GHG.x-1600-52,GHG.y-1600-4,15],[GHG.x-1600+52,GHG.y-1600-4,15])}catch(e){}},0);
