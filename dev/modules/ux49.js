/* ---------- v431 ยกระดับภาพ: ป้ายชื่อแมพ · สิ่งมีชีวิตในแมพ · น้ำ/รอยเท้า · สภาพอากาศ ----------
   ① ป้ายชื่อแมพ + จอค่อย ๆ สว่างตอนเปลี่ยนแมพ (DOM ไม่บังการกด)
   ② สิ่งมีชีวิตตามสภาพแวดล้อม (DEPM[curMap]): ผีเสื้อ · หิ่งห้อย (กลางคืน) · นกบินผ่าน+เงา · กา (บินหนีเมื่อเข้าใกล้) · ใบไม้/กลีบดอกปลิว · ฝุ่นทรายหมุน · ประกายน้ำแข็ง · สปอร์/ดวงไฟลอย · ถ่านไฟลอย
   ③ น้ำ: เงาสะท้อนตัวละครในบ่อ (FSW) · วงกระเพื่อมตอนเดินริมน้ำ/ฝนตก · รอยเท้าบนหิมะ/ทราย ค่อย ๆ จางหาย
   ④ สภาพอากาศเป็นช่วง ๆ (ทุกเครื่องในแมพเห็นตรงกัน: สุ่มจาก แมพ + ช่วงเวลา 7 นาที)
      ฝน · พายุฝนฟ้าแลบ · พายุหิมะ · พายุทราย/ฝุ่น · หมอก · เถ้าถ่าน · ฝนดาวตก · สายลมกลีบดอก
   ประหยัดเครื่อง: จำนวนลดลงครึ่งเมื่อ LOWQ · ปิดสภาพอากาศ/สิ่งมีชีวิตในดันเจี้ยน หอคอย ลานประลอง เต็นท์ */
const VZ={last:-1,crit:[],ft:[],rip:[],fpL:{},wx:null,wxT:0,thn:0,fl:0,toast:'',t0:performance.now()};
const vzLow=()=>{try{return!!LOWQ}catch(e){return false}};
const vzIn=()=>{try{return!isDg()&&!isTw()&&!isArena()&&!(MAPS[curMap]&&MAPS[curMap].tent)}catch(e){return false}};
const vzBio=()=>{try{return DEPM[curMap]||''}catch(e){return''}};
const vzNight=()=>{try{return isNight()}catch(e){return false}};
function vzH(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}h^=h>>>16;h=Math.imul(h,0x85ebca6b);h^=h>>>13;h=Math.imul(h,0xc2b2ae35);h^=h>>>16;return(h>>>0)/4294967296}
/* ---------- ① ป้ายชื่อแมพ ---------- */
function vzCSS(){if($('vzcss'))return;const s=document.createElement('style');s.id='vzcss';s.textContent=
 '#vzf{position:fixed;inset:0;z-index:60;background:#000;pointer-events:none;opacity:0}#vzf.on{animation:vzF .55s ease-out forwards}@keyframes vzF{from{opacity:.9}to{opacity:0}}'+
 '#vzc{position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:61;pointer-events:none;text-align:center;white-space:nowrap;opacity:0}#vzc.on{animation:vzC 3s ease-out forwards}'+
 '#vzc .k{font:700 12px system-ui;letter-spacing:.32em;color:#f3d08a;text-shadow:0 2px 6px #000}#vzc .n{font:800 30px "Cinzel",Georgia,system-ui;color:#fff6e0;letter-spacing:.06em;text-shadow:0 0 18px rgba(255,190,90,.55),0 3px 8px #000;margin-top:2px}'+
 '#vzc .ln{height:2px;width:240px;margin:6px auto 0;background:linear-gradient(90deg,transparent,#ffcf6a,transparent);transform-origin:center;animation:vzL 3s ease-out forwards}#vzc .s{font:600 12px system-ui;color:#e8dcc8;margin-top:6px;text-shadow:0 2px 5px #000;opacity:.9}'+
 '@keyframes vzC{0%{opacity:0;transform:translate(-50%,10px) scale(.96)}12%{opacity:1;transform:translate(-50%,0) scale(1)}78%{opacity:1}100%{opacity:0;transform:translate(-50%,-6px)}}@keyframes vzL{0%{transform:scaleX(0)}30%{transform:scaleX(1)}}'+
 '#vzt{position:fixed;left:50%;top:64px;transform:translateX(-50%);z-index:41;pointer-events:none;padding:5px 14px;border-radius:16px;background:rgba(12,14,22,.78);border:1px solid rgba(200,220,255,.35);color:#eaf2ff;font:600 12.5px system-ui;opacity:0}#vzt.on{animation:vzT 3.4s ease-out forwards}@keyframes vzT{0%{opacity:0}12%{opacity:1}80%{opacity:1}100%{opacity:0}}';document.head.appendChild(s)}
const VZBN={grass:'🌿',bone:'💀',lava:'🔥',snow:'❄️',stone:'🗼',sunk:'🌊',mine:'⛏️',sand:'🏜️',city:'🏙️',rift:'🌌',void:'🌑',wind:'🌬️',garden:'🌸',clock:'🕰️',meteor:'☄️',bolt:'⚡',gale:'🌪️',tempest:'⛈️',mush:'🍄',bog:'🌫️',ruin:'🏚️',throne:'👑',roots:'🌳',glake:'💧',knight:'⚔️',core:'🌋',palace:'🏰',qgarden:'🌺',stars:'✨',dawn:'🌅',ring:'🏘️',aranya:'🌲',pit:'🕳️',starfall:'🌠',karn:'💎',summit:'🔭'};
function vzKind(id){const M=MAPS[id];if(!M)return'';try{if(M.tent)return'⛺ เต็นท์';if(id===1)return'🏕️ ฐานที่มั่น';if(M.hub)return'🏙️ เมือง';if(M.wb)return M.gbh?'🏰 ห้องโถงกิลด์':'🐉 ลานบอส';if(M.pvp||isArena())return'⚔️ ลานประลอง';if(id>=1000)return'🗝️ ดันเจี้ยน'}catch(e){}return(VZBN[DEPM[id]]||'🗺️')+' แมพสนาม'}
function vzCard(id){const M=MAPS[id];if(!M||!me.cls)return;vzCSS();let f=$('vzf');if(!f){f=document.createElement('div');f.id='vzf';document.body.appendChild(f)}f.classList.remove('on');void f.offsetWidth;f.classList.add('on');
  let c=$('vzc');if(!c){c=document.createElement('div');c.id='vzc';document.body.appendChild(c)}const W0=vzWxOf(id);
  c.innerHTML='<div class="k">'+vzKind(id)+'</div><div class="n">'+String(M.n||'').replace(/[<>&]/g,'')+'</div><div class="ln"></div>'+(W0?'<div class="s">'+W0.ic+' ตอนนี้: '+W0.n+'</div>':'');c.classList.remove('on');void c.offsetWidth;c.classList.add('on')}
function vzToast(s){vzCSS();let t=$('vzt');if(!t){t=document.createElement('div');t.id='vzt';document.body.appendChild(t)}t.textContent=s;t.classList.remove('on');void t.offsetWidth;t.classList.add('on')}
/* ---------- ④ สภาพอากาศ ---------- */
const VZWX={rain:['🌧️','ฝนตก'],storm:['⛈️','พายุฝนฟ้าคะนอง'],snow:['🌨️','พายุหิมะ'],sand:['🌪️','พายุทราย'],dust:['🍂','ลมหอบฝุ่น'],fog:['🌫️','หมอกลง'],ash:['🌋','เถ้าถ่านโปรย'],star:['🌠','ฝนดาวตก'],petal:['🌸','สายลมกลีบดอก']};
const VZBW={grass:'rain',garden:'rain',qgarden:'petal',sunk:'rain',glake:'rain',meteor:'star',wind:'rain',clock:'rain',palace:'rain',ring:'rain',tempest:'storm',bolt:'storm',snow:'snow',summit:'snow',sand:'sand',gale:'dust',aranya:'fog',bone:'fog',ruin:'fog',knight:'fog',bog:'fog',mush:'fog',roots:'fog',lava:'ash',core:'ash',stars:'star',starfall:'star',rift:'star',void:'star',throne:'star',pit:'fog',dawn:'petal'};
const VZSL=420000;
function vzWxOf(id,now){now=now||Date.now();let b='';try{b=DEPM[id]||''}catch(e){}const k=VZBW[b];if(!k)return null;try{const M=MAPS[id];if(!M||M.tent||M.hub||id>=1000||id===1)return null}catch(e){}
  const sl=Math.floor(now/VZSL),r=vzH('wx'+id+':'+sl);if(r>.3)return null;const p=(now%VZSL)/VZSL,amp=Math.min(1,p/.08,(1-p)/.08);let kk=k;if(k==='rain'&&b==='grass'&&vzH('st'+id+':'+sl)<.35)kk='storm';
  return{k:kk,a:Math.max(0,amp)*(.65+.35*vzH('a'+id+':'+sl)),ic:VZWX[kk][0],n:VZWX[kk][1],sl}}
function vzWxTick(){if(!me.cls||!run)return;const W0=vzIn()?vzWxOf(curMap):null;const key=W0?curMap+':'+W0.sl+':'+W0.k:'';
  if(key&&key!==VZ.toast&&W0.a>.05){VZ.toast=key;if(performance.now()-VZ.t0>4000&&W0.k!=='rain'&&W0.k!=='snow')vzToast(W0.ic+' '+W0.n)}VZ.wx=W0}
/* วาดสภาพอากาศ (พิกัดจอ) */
const VZP=[];for(let i=0;i<220;i++)VZP.push([Math.random(),Math.random(),Math.random(),Math.random()]);
function vzWxDraw(){const X=VZ.wx;if(!X||X.a<=.01||!vzIn())return;const t=performance.now()/1000,A=X.a,n=Math.round((vzLow()?.45:1)*A*({rain:150,storm:200,snow:180,sand:150,dust:70,fog:0,ash:80,star:0,petal:46}[X.k]||0)),cx=cam.x,cy=cam.y;
  g.save();g.setTransform(DPR,0,0,DPR,0,0);
  if(X.k==='rain'||X.k==='storm'){g.fillStyle='rgba(30,44,70,'+(.16*A+(X.k==='storm'?.08*A:0))+')';g.fillRect(0,0,W,H);g.strokeStyle='rgba(190,215,255,'+(.42*A)+')';g.lineWidth=1.2;g.beginPath();
    for(let i=0;i<n;i++){const P=VZP[i],sp=900+P[2]*500,x=((P[0]*W*1.3+t*sp*.22-cx*.15)%(W*1.3)+W*1.3)%(W*1.3)-W*.15,y=((P[1]*H+t*sp-cy*.15)%H+H)%H;g.moveTo(x,y);g.lineTo(x-4,y-16-P[3]*8)}g.stroke();
    g.fillStyle='rgba(210,230,255,'+(.35*A)+')';for(let i=0;i<n*.25;i++){const P=VZP[(i*7)%220],k=(t*2.2+P[3])%1;if(k>.25)continue;g.beginPath();g.ellipse(P[1]*W,P[0]*H,2+k*14,1+k*4,0,0,7);g.globalAlpha=1-k*4;g.fill()}g.globalAlpha=1;
    if(X.k==='storm'){if(t>VZ.thn){VZ.thn=t+6+Math.random()*12;VZ.fl=1;VZ.flx=Math.random()*W}if(VZ.fl>0){const f=VZ.fl;g.fillStyle='rgba(225,235,255,'+(.5*f*A)+')';g.fillRect(0,0,W,H);
      if(f>.7){g.strokeStyle='rgba(255,255,255,'+f+')';g.lineWidth=2.4;g.beginPath();let x=VZ.flx,y=0;g.moveTo(x,y);while(y<H*.45){x+=(Math.random()-.5)*40;y+=18+Math.random()*20;g.lineTo(x,y)}g.stroke()}VZ.fl-=.045}}}
  else if(X.k==='snow'){g.fillStyle='rgba(225,235,250,'+(.18*A)+')';g.fillRect(0,0,W,H);g.fillStyle='rgba(255,255,255,'+(.8*A)+')';
    for(let i=0;i<n;i++){const P=VZP[i],sp=120+P[2]*160,x=((P[0]*W*1.4+t*sp*1.1+Math.sin(t*1.5+i)*14-cx*.3)%(W*1.4)+W*1.4)%(W*1.4)-W*.2,y=((P[1]*H+t*sp-cy*.3)%H+H)%H,r=1+P[3]*2.2;g.beginPath();g.arc(x,y,r,0,7);g.fill()}}
  else if(X.k==='sand'||X.k==='dust'){const sd=X.k==='sand';g.fillStyle=sd?'rgba(196,140,70,'+(.26*A)+')':'rgba(160,140,110,'+(.14*A)+')';g.fillRect(0,0,W,H);g.strokeStyle=sd?'rgba(240,200,140,'+(.4*A)+')':'rgba(220,200,170,'+(.35*A)+')';g.lineWidth=1.4;g.beginPath();
    for(let i=0;i<n;i++){const P=VZP[i],sp=500+P[2]*400,x=((P[0]*W*1.5+t*sp-cx*.4)%(W*1.5)+W*1.5)%(W*1.5)-W*.25,y=((P[1]*H+Math.sin(t*2+i)*10-cy*.2)%H+H)%H;g.moveTo(x,y);g.lineTo(x-24-P[3]*30,y+3)}g.stroke();
    if(!sd){for(let i=0;i<n*.3;i++){const P=VZP[i],x=((P[0]*W*1.5+t*300-cx*.4)%(W*1.5)+W*1.5)%(W*1.5)-W*.25,y=((P[1]*H+Math.sin(t*3+i)*30)%H+H)%H;g.save();g.translate(x,y);g.rotate(t*4+i);g.fillStyle='rgba(180,120,50,'+(.7*A)+')';g.fillRect(-3,-1.5,6,3);g.restore()}}}
  else if(X.k==='fog'){for(let i=0;i<(vzLow()?4:7);i++){const P=VZP[i],x=((P[0]*W*1.6+t*(12+P[2]*14)-cx*.5)%(W*1.6)+W*1.6)%(W*1.6)-W*.3,y=((P[1]*H-cy*.5)%H+H)%H,r=140+P[3]*120;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(220,225,235,'+(.32*A)+')');gr.addColorStop(1,'rgba(220,225,235,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}
    g.fillStyle='rgba(200,206,220,'+(.12*A)+')';g.fillRect(0,0,W,H)}
  else if(X.k==='ash'){g.fillStyle='rgba(60,20,10,'+(.14*A)+')';g.fillRect(0,0,W,H);for(let i=0;i<n;i++){const P=VZP[i],x=((P[0]*W+Math.sin(t*.8+i)*20+t*14-cx*.2)%W+W)%W,y=((P[1]*H+t*(30+P[2]*30)-cy*.2)%H+H)%H;g.fillStyle=i%5?'rgba(150,140,135,'+(.75*A)+')':'rgba(255,140,60,'+(.85*A)+')';g.fillRect(x,y,2+P[3]*2,2+P[3]*2)}}
  else if(X.k==='star'){g.fillStyle='rgba(20,10,50,'+(.12*A)+')';g.fillRect(0,0,W,H);g.save();g.globalCompositeOperation='lighter';for(let i=0;i<(vzLow()?3:6);i++){const P=VZP[i],per=2.4+P[2]*2.6,k=((t+P[3]*per)%per)/per;if(k>.35)continue;const q=k/.35,x0=P[0]*W*1.2,y0=P[1]*H*.5,x=x0-q*260,y=y0+q*170;
      const gr=g.createLinearGradient(x,y,x+90,y-58);gr.addColorStop(0,'rgba(255,250,220,'+(A*(1-q))+')');gr.addColorStop(1,'rgba(255,200,120,0)');g.strokeStyle=gr;g.lineWidth=2.6;g.beginPath();g.moveTo(x,y);g.lineTo(x+90,y-58);g.stroke();g.fillStyle='rgba(255,255,240,'+(A*(1-q))+')';g.beginPath();g.arc(x,y,2.4,0,7);g.fill()}g.restore()}
  else if(X.k==='petal'){for(let i=0;i<n;i++){const P=VZP[i],x=((P[0]*W*1.3+t*(40+P[2]*40)+Math.sin(t+i)*30-cx*.3)%(W*1.3)+W*1.3)%(W*1.3)-W*.15,y=((P[1]*H+t*(26+P[3]*24)-cy*.3)%H+H)%H;g.save();g.translate(x,y);g.rotate(t*1.5+i);g.scale(1,Math.abs(Math.sin(t*2+i))*.7+.3);g.fillStyle=i%3?'rgba(255,190,215,'+(.85*A)+')':'rgba(255,240,245,'+(.85*A)+')';g.beginPath();g.ellipse(0,0,4,2.4,0,0,7);g.fill();g.restore()}}
  g.restore()}
/* ---------- ② สิ่งมีชีวิตในแมพ ---------- */
const VZCR={grass:['bf','bf','bird','ff'],garden:['bf','petal','bird','ff'],qgarden:['bf','petal','ff'],bone:['crow','crow','dust'],ruin:['crow','wisp'],knight:['crow','wisp'],aranya:['leaf','crow','ff'],lava:['ember','ember'],core:['ember','ember'],
  snow:['spark','spark'],summit:['spark','bird'],sand:['devil','dust'],gale:['leaf','leaf','dust'],wind:['leaf','bird'],tempest:['leaf','wisp'],bolt:['wisp','spark'],sunk:['bubble','wisp'],glake:['bubble','wisp','ff'],meteor:['wisp','ff','bird'],
  mush:['spore','spore','ff'],bog:['spore','ff'],roots:['spore','dust'],rift:['wisp','wisp'],void:['wisp'],throne:['wisp'],stars:['wisp','spark'],starfall:['wisp','spark'],pit:['wisp'],palace:['bird','petal'],clock:['bird','leaf'],ring:['bird','bf'],dawn:['petal','bird','bf'],mine:['dust'],karn:['dust','spark'],city:['bird']};
function vzSpawn(k){const x=cam.x-60+Math.random()*(W+120),y=cam.y-40+Math.random()*(H+80),c={k,x,y,t:0,l:8+Math.random()*10,ph:Math.random()*6.28,vx:0,vy:0,s:.8+Math.random()*.5,fl:0};
  if(k==='bird'){const d=Math.random()<.5?-1:1;c.x=d>0?cam.x-80:cam.x+W+80;c.y=cam.y+30+Math.random()*H*.6;c.vx=d*(120+Math.random()*60);c.vy=-10+Math.random()*20;c.l=(W+200)/Math.abs(c.vx)}
  if(k==='ember'||k==='spore'||k==='bubble'||k==='wisp'){c.vy=-(10+Math.random()*24);c.y=cam.y+H*.4+Math.random()*H*.7}
  if(k==='leaf'||k==='petal'){c.vx=30+Math.random()*40;c.vy=18+Math.random()*16;c.y=cam.y-30+Math.random()*H*.5}
  if(k==='devil'){c.l=7;c.vx=(Math.random()-.5)*50;c.vy=(Math.random()-.5)*30}
  if(k==='crow'){c.l=60;c.y=cam.y+60+Math.random()*(H-80)}
  return c}
function vzCrTick(dt){if(!me.cls||!run||!vzIn()){VZ.crit.length=0;return}const L=VZCR[vzBio()];if(!L){VZ.crit.length=0;return}const nt=vzNight();
  const want=Math.round((vzLow()?5:11)),pool=L.filter(k=>k==='ff'?nt:(k==='bf'?!nt:true));if(!pool.length)return;
  if(VZ.crit.length<want&&Math.random()<.08)VZ.crit.push(vzSpawn(pool[(Math.random()*pool.length)|0]));
  for(let i=VZ.crit.length-1;i>=0;i--){const c=VZ.crit[i];c.t+=dt;const d=Math.hypot(c.x-me.x,c.y-(me.y-10));
    if((c.k==='bf'||c.k==='crow')&&!c.fl&&d<(c.k==='crow'?90:55)){c.fl=1;const a=Math.atan2(c.y-me.y,c.x-me.x);c.vx=Math.cos(a)*(c.k==='crow'?190:110);c.vy=-(c.k==='crow'?150:90);c.l=c.t+2.2}
    if(c.k==='bf'&&!c.fl){c.vx=Math.cos(c.t*.7+c.ph)*26;c.vy=Math.sin(c.t*1.3+c.ph)*16}
    if(c.k==='ff'){c.vx=Math.cos(c.t*.5+c.ph)*12;c.vy=Math.sin(c.t*.8+c.ph)*9}
    if(c.k==='leaf'||c.k==='petal'){c.vx+=Math.sin(c.t*2+c.ph)*20*dt}
    c.x+=c.vx*dt;c.y+=c.vy*dt;if(c.t>c.l||c.x<cam.x-260||c.x>cam.x+W+260||c.y<cam.y-260||c.y>cam.y+H+260)VZ.crit.splice(i,1)}}
/* วาด: ชั้นพื้น (เงานก ประกายน้ำแข็ง ฝุ่นหมุน กาที่ยืนอยู่) และชั้นบน (ของที่บิน/ลอย) */
function vzCrDraw(top){if(!VZ.crit.length)return;const t=performance.now()/1000;g.save();
  for(const c of VZ.crit){const fa=Math.min(1,c.t/.6,(c.l-c.t)/.8);if(fa<=0)continue;const x=c.x,y=c.y;
    if(!top){if(c.k==='bird'){g.fillStyle='rgba(0,0,0,'+(.18*fa)+')';g.beginPath();g.ellipse(x+20,y+120,9,3,0,0,7);g.fill()}
      else if(c.k==='spark'){const tw=Math.max(0,Math.sin(t*3+c.ph*5));if(tw>.2){g.globalCompositeOperation='lighter';g.fillStyle='rgba(220,240,255,'+(tw*fa)+')';g.beginPath();g.moveTo(x,y-4*tw);g.lineTo(x+1.2,y);g.lineTo(x,y+4*tw);g.lineTo(x-1.2,y);g.closePath();g.fill();g.fillRect(x-4*tw,y-.6,8*tw,1.2);g.globalCompositeOperation='source-over'}}
      else if(c.k==='devil'){for(let k=0;k<7;k++){const h=k*8,r=4+k*2.6,a=t*6+k;g.strokeStyle='rgba(200,160,100,'+(.35*fa*(1-k/8))+')';g.lineWidth=2;g.beginPath();g.ellipse(x+Math.sin(t*3+k)*3,y-h,r,r*.35,0,a,a+4);g.stroke()}}
      else if(c.k==='crow'&&!c.fl){g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x,y+2,6,2,0,0,7);g.fill();g.fillStyle='#15131a';g.beginPath();g.ellipse(x,y-4,6,4.4,0,0,7);g.fill();g.beginPath();g.arc(x+4,y-8,3,0,7);g.fill();g.fillStyle='#e0a030';g.fillRect(x+6,y-8.5,3,1.4);
        const pk=Math.sin(t*2+c.ph)>.85?2:0;g.strokeStyle='#15131a';g.lineWidth=1.2;g.beginPath();g.moveTo(x-1,y);g.lineTo(x-1,y+2);g.moveTo(x+1,y);g.lineTo(x+1,y+2);g.stroke();if(pk)g.fillRect(x+4,y-6+pk,1,1)}
      else if(c.k==='dust'){g.fillStyle='rgba(220,200,160,'+(.3*fa)+')';g.beginPath();g.arc(x,y,1.2+Math.sin(t+c.ph),0,7);g.fill()}
      continue}
    if(c.k==='bf'){const fl=Math.abs(Math.sin(t*14+c.ph));g.save();g.translate(x,y-18);g.scale(1.4,1.4);const col=['#ffd860','#ff9ad0','#9ad8ff','#ffffff'][(c.ph*10|0)%4];g.fillStyle=col;g.strokeStyle='rgba(40,20,10,.6)';g.lineWidth=.6;
      for(const s of[-1,1]){g.beginPath();g.ellipse(s*3*fl,-1,3.4*fl+.5,2.6,s*.4,0,7);g.fill();g.stroke();g.beginPath();g.ellipse(s*2.2*fl,2,2.2*fl+.4,1.8,-s*.4,0,7);g.fill()}g.fillStyle='#2a1a10';g.fillRect(-.5,-2.5,1,5);g.restore()}
    else if(c.k==='ff'){const b=(Math.sin(t*3+c.ph*3)+1)/2;g.globalCompositeOperation='lighter';glowAt(x,y-20,10,'200,255,120',.55*b*fa);g.fillStyle='rgba(240,255,190,'+(b*fa)+')';g.beginPath();g.arc(x,y-20,1.4,0,7);g.fill();g.globalCompositeOperation='source-over'}
    else if(c.k==='bird'||(c.k==='crow'&&c.fl)){const fl=Math.sin(t*(c.k==='crow'?16:10)+c.ph),d=c.vx<0?-1:1,yy=c.k==='bird'?y-60:y-8;g.strokeStyle=c.k==='crow'?'#15131a':'#2a2630';g.lineWidth=c.k==='crow'?2.2:1.8;g.lineCap='round';g.beginPath();g.moveTo(x-9,yy-fl*5);g.quadraticCurveTo(x-4,yy-2,x,yy);g.quadraticCurveTo(x+4,yy-2,x+9,yy-fl*5);g.stroke();g.fillStyle=g.strokeStyle;g.beginPath();g.ellipse(x+d,yy+.5,2.6,1.6,0,0,7);g.fill()}
    else if(c.k==='leaf'||c.k==='petal'){g.save();g.translate(x,y);g.rotate(t*2.5+c.ph);g.scale(1,Math.abs(Math.sin(t*3+c.ph))*.7+.3);g.fillStyle=c.k==='petal'?'rgba(255,190,215,'+fa+')':['rgba(200,150,60,','rgba(150,170,70,','rgba(190,90,50,'][(c.ph*10|0)%3]+fa+')';g.beginPath();g.ellipse(0,0,c.k==='petal'?3.4:4.6,c.k==='petal'?2:2.4,0,0,7);g.fill();g.restore()}
    else{const C={ember:'255,150,60',spore:'170,255,200',bubble:'170,220,255',wisp:'200,180,255'}[c.k];if(!C)continue;g.globalCompositeOperation='lighter';const pu=.6+.4*Math.sin(t*4+c.ph);glowAt(x+Math.sin(t+c.ph)*6,y,c.k==='wisp'?12:7,C,.5*fa*pu);
      if(c.k==='bubble'){g.globalCompositeOperation='source-over';g.strokeStyle='rgba(220,240,255,'+(.7*fa)+')';g.lineWidth=1;g.beginPath();g.arc(x+Math.sin(t+c.ph)*6,y,2.5*c.s,0,7);g.stroke()}else{g.fillStyle='rgba('+C+','+fa+')';g.beginPath();g.arc(x+Math.sin(t+c.ph)*6,y,1.3,0,7);g.fill()}g.globalCompositeOperation='source-over'}}
  g.restore()}
/* ---------- ③ น้ำ + รอยเท้า ---------- */
function vzPonds(){try{return FSWM===curMap?FSW:[]}catch(e){return[]}}
const vzInPond=(P,x,y,k)=>((x-P.x)/(P.rx*k))**2+((y-P.y)/(P.ry*k))**2<1;
function vzActors(){const L=[{u:uid,x:me.x,y:me.y,me:1}];try{for(const u in others){const o=others[u];if(o&&Math.hypot(o.x-me.x,o.y-me.y)<520)L.push({u,x:o.x,y:o.y,o})}}catch(e){}return L.slice(0,10)}
function vzWaterTick(dt){if(!me.cls||!run)return;const b=vzBio(),fp=(b==='snow'||b==='sand'||b==='summit')&&vzIn(),P=vzPonds(),now=performance.now()/1000;
  for(const A of vzActors()){const L=VZ.fpL[A.u]||(VZ.fpL[A.u]={x:A.x,y:A.y,s:1});const d=Math.hypot(A.x-L.x,A.y-L.y);if(d>200){L.x=A.x;L.y=A.y;continue}
    if(d>(fp?17:26)){const a=Math.atan2(A.y-L.y,A.x-L.x);L.s=-L.s;L.x=A.x;L.y=A.y;
      if(fp&&VZ.ft.length<(vzLow()?80:180))VZ.ft.push({x:A.x+Math.cos(a+Math.PI/2)*3*L.s,y:A.y+12+Math.sin(a+Math.PI/2)*3*L.s,a,t:now,b});
      for(const W0 of P)if(vzInPond(W0,A.x,A.y+12,1.12)&&!vzInPond(W0,A.x,A.y+12,.82)){VZ.rip.push({x:A.x,y:A.y+12,t:now,r:1});break}}}
  if(VZ.wx&&(VZ.wx.k==='rain'||VZ.wx.k==='storm'))for(const W0 of P)if(inView(W0.x,W0.y,W0.rx)&&Math.random()<VZ.wx.a*.5){const a=Math.random()*6.28,r=Math.sqrt(Math.random())*.85;VZ.rip.push({x:W0.x+Math.cos(a)*W0.rx*r,y:W0.y+Math.sin(a)*W0.ry*r,t:now,r:.5})}
  while(VZ.ft.length&&now-VZ.ft[0].t>7)VZ.ft.shift();while(VZ.rip.length&&now-VZ.rip[0].t>1.4)VZ.rip.shift();if(VZ.rip.length>80)VZ.rip.splice(0,VZ.rip.length-80)}
function vzGroundDraw(){const now=performance.now()/1000;g.save();
  for(const f of VZ.ft){if(!inView(f.x,f.y,20))continue;const a=1-(now-f.t)/7;g.fillStyle=f.b==='sand'?'rgba(95,62,28,'+(.55*a)+')':'rgba(70,95,140,'+(.6*a)+')';g.save();g.translate(f.x,f.y);g.rotate(f.a);g.beginPath();g.ellipse(1,0,5,2.6,0,0,7);g.fill();g.beginPath();g.ellipse(-5,0,2.4,2,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,'+(.35*a)+')';g.beginPath();g.ellipse(1.5,1.6,4,.8,0,0,7);g.fill();g.restore()}
  for(const r of VZ.rip){const k=(now-r.t)/1.4;if(k<0||k>1||!inView(r.x,r.y,40))continue;g.strokeStyle='rgba(220,240,255,'+(.55*(1-k))+')';g.lineWidth=1.3;g.beginPath();g.ellipse(r.x,r.y,(4+k*22)*r.r,(1.6+k*8)*r.r,0,0,7);g.stroke();if(k<.5&&r.r>.8){g.beginPath();g.ellipse(r.x,r.y,(2+k*10),(1+k*4),0,0,7);g.stroke()}}
  /* เงาสะท้อนในบ่อ */
  const P=vzPonds();if(P.length&&!vzLow()){for(const W0 of P){if(!inView(W0.x,W0.y,W0.rx+40))continue;const A=vzActors().filter(a=>Math.abs(a.x-W0.x)<W0.rx&&a.y+12<W0.y&&a.y+12>W0.y-W0.ry-40).slice(0,4);if(!A.length)continue;
    g.save();g.beginPath();g.ellipse(W0.x,W0.y,W0.rx*.96,W0.ry*.92,0,0,7);g.clip();
    for(const a of A){try{const fy=a.y+13,o=a.o,cls=a.me?me.cls:o&&o.cls;if(!cls)continue;g.save();g.globalAlpha=.3;g.translate(a.x,fy);g.scale(1,-.85);g.translate(-a.x,-fy);
      const wob=Math.sin(now*2+a.x*.05)*1.5;g.translate(wob,0);
      if(a.me){const L=wdrCodes(me.eq);drawChar(a.x,a.y,cls,(me.face!=null&&Math.cos(me.face)<0)?-1:1,0,L.h,now,L.b,L.w,L.a,c2v(),0)}else drawChar(a.x,a.y,cls,1,0,o.hd|0,now,o.bt|0,o.wp|0,o.ar|0,o.c2|0,0);g.restore()}catch(e){}}
    g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,230,255,.12)';g.lineWidth=1;for(let i=0;i<5;i++){const yy=W0.y-W0.ry*.6+i*W0.ry*.3+Math.sin(now+i)*2;g.beginPath();g.moveTo(W0.x-W0.rx,yy);g.lineTo(W0.x+W0.rx,yy);g.stroke()}g.restore()}}
  g.restore()}
/* ---------- ติดตั้ง ---------- */
setTimeout(()=>{try{
  const _em=enterMap;enterMap=function(id){const r=_em.apply(this,arguments);try{if(curMap!==VZ.last){VZ.last=curMap;VZ.crit.length=0;VZ.ft.length=0;VZ.rip.length=0;VZ.fpL={};if(!(MAPS[curMap]&&MAPS[curMap].tent&&VZ.lt&&performance.now()-VZ.lt<20000))vzCard(curMap);if(MAPS[curMap]&&MAPS[curMap].tent)VZ.lt=performance.now()}}catch(e){}return r};
  const _fd=fshDraw;fshDraw=function(){_fd.apply(this,arguments);try{vzGroundDraw()}catch(e){}try{vzCrDraw(false)}catch(e){}};
  const _ft=fshTick;fshTick=function(dt){_ft.apply(this,arguments);try{vzCrTick(Math.min(.1,dt||0))}catch(e){}try{vzWaterTick(dt)}catch(e){}};
  const _dr=drawRx;drawRx=function(){const r=_dr.apply(this,arguments);try{vzCrDraw(true)}catch(e){}return r};
  const _vg=vigDraw;vigDraw=function(){try{vzWxDraw()}catch(e){}return _vg.apply(this,arguments)};
  /* รวมกับระบบฝน/หิมะเดิม: ให้ wxNow() ตามตารางใหม่ (ฝน/พายุ = 1 · พายุหิมะ = 2) */
  wxNow=function(){const X=VZ.wx;if(!X||X.a<.25||!vzIn())return 0;return X.k==='rain'||X.k==='storm'?1:X.k==='snow'?2:0};
  setInterval(()=>{try{vzWxTick()}catch(e){}},1000);
  setTimeout(()=>{try{if(me.cls&&run){VZ.last=curMap;vzCard(curMap)}}catch(e){}},1500);
}catch(e){console.warn('vz init',e)}},1500);
