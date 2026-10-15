/* ---------- v389 เก็บวัตถุดิบ: ขุดแร่ · เก็บสมุนไพร · หลอมแร่ · ปรุงยา ----------
   แมพสนามทุกแมพมีสายแร่ 5 จุด + สมุนไพร 5 จุด (ตำแหน่งตายตัวต่อแมพ · เก็บแล้วงอกใหม่เฉพาะเครื่องเรา)
   ระดับวัตถุดิบตามแมพ: ต้น (ql≤7) · กลาง (≤14) · ปลาย · ความชำนาญแยก ขุดแร่/สมุนไพร Lv 1–10
   ปลดระดับกลางที่ Lv 3 ระดับปลายที่ Lv 6 (ต่ำกว่านั้นยังเก็บได้ แต่ได้วัตถุดิบระดับที่ปลดแล้ว)
   ใช้: หลอมเป็นหินตีบวก/หินกันแตก · ปรุงยาฟื้น + ยาบัฟ 30 นาที (ใช้ได้ทีละขวด แยกจากอาหาร) */
const GTI={o1:['🪨','แร่เหล็ก','สายแร่สีสนิม พบในแมพช่วงต้น'],o2:['🔷','แร่มิธริล','แร่ฟ้าเรืองแสง พบในแมพช่วงกลาง (ขุดแร่ Lv 3)'],o3:['☄️','แร่ดาวตก','แร่ทองประกายดาว พบในแมพช่วงปลาย (ขุดแร่ Lv 6)'],gm:['💎','อัญมณีดิบ','หายาก · ได้บางครั้งตอนขุดแร่'],
  h1:['🌿','สมุนไพรเขียว','ใบสมุนไพรพื้นฐาน พบในแมพช่วงต้น'],h2:['🌸','ดอกจันทร์เงิน','ดอกไม้เรืองแสงจาง ๆ พบในแมพช่วงกลาง (สมุนไพร Lv 3)'],h3:['🪷','บัวแสงดาว','บัวประกายดาว พบในแมพช่วงปลาย (สมุนไพร Lv 6)'],rt:['🍄','เห็ดวิญญาณ','หายาก · ได้บางครั้งตอนเก็บสมุนไพร']};
const GTK=['o1','o2','o3','gm','h1','h2','h3','rt'],GTMX=9999,GTLV=10,GTRS={o:180,h:120};
/* สูตร: [ไอคอน, ชื่อ, คำอธิบาย, วัตถุดิบ, ทอง, ต้องการ {o:เลเวลขุดแร่,h:เลเวลสมุนไพร}, ผลลัพธ์] */
const GTSM={
 s1:['⚒️','หินตีบวกขั้นแรก','ใช้ตีบวก +6 ถึง +10',{o1:8},300,{},{inv:'s1',n:1}],
 ps:['🛡️','หินกันแตก','ตีบวกพลาดอุปกรณ์ไม่แตก',{o1:6,gm:1},1500,{},{inv:'ps',n:1}],
 s2:['⚒️','หินตีบวกขั้นสอง','ใช้ตีบวก +11 ถึง +20',{o2:6,gm:2},3000,{o:3},{inv:'s2',n:1}],
 s3:['⚒️','หินตีบวกขั้นสูง','ใช้ตีบวก +21 ถึง +30 (ชุดเซ็ตสีชมพู)',{o3:10,gm:5},30000,{o:6},{inv:'s3',n:1}],
 rgg:['💠','บดอัญมณีเป็นผงรูน','อัญมณีดิบ 1 ก้อน → ผงรูน 6',{gm:1},100,{},{rn:6}],
 rgr:['💠','บดเห็ดวิญญาณเป็นผงรูน','เห็ดวิญญาณ 1 ดอก → ผงรูน 6',{rt:1},100,{},{rn:6}]};
const GTBR={
 php:['❤️','ยาฟื้นเลือด ×20','ยาแดงพื้นฐาน',{h1:3},50,{},{inv:'hp',n:20}],
 pmp:['💧','ยาฟื้นมานา ×20','ยาฟ้าพื้นฐาน',{h1:2,h2:1},80,{h:3},{inv:'mp',n:20}],
 xdm:['🔴','ยาโทสะ','ดาเมจ +8% · 30 นาที',{h2:4,rt:1},2000,{h:3},{ex:'xdm'}],
 xhp:['🟢','ยาศิลาหัวใจ','เลือดสูงสุด +10% · 30 นาที',{h2:4,o1:2},2000,{h:3},{ex:'xhp'}],
 xsp:['🟡','ยาลมกรด','ความเร็วโจมตี +8% · ความเร็วเดิน +8% · 30 นาที',{h3:3,rt:1},5000,{h:6},{ex:'xsp'}],
 xxp:['🔵','ยาปราชญ์','EXP +20% · 30 นาที',{h3:3,h2:3},5000,{h:6},{ex:'xxp'}],
 xlk:['🟣','ยาโชคลาภ','ทองที่ได้ +20% · โอกาสคริ +5% · 30 นาที',{h3:4,gm:2},8000,{h:8},{ex:'xlk'}]};
const GTEX={xdm:{dm:.08},xhp:{hp:.1},xsp:{as:.08,sp:.08},xxp:{xp:.2},xlk:{gd:.2,cr:.05}};
let GTN={m:-1,L:[]},GTC=null,GTTAB='lv';const GTD={};
function gtSt(){if(!me.gth||typeof me.gth!=='object')me.gth={m:{},ox:0,hx:0};const G=me.gth;if(!G.m||typeof G.m!=='object')G.m={};G.ox=G.ox|0;G.hx=G.hx|0;if(G.eb&&(!G.eb.id||!GTEX[G.eb.id]||!(G.eb.t>0)))G.eb=null;return G}
const gtNeed=L=>15*L*L;
function gtLv(x){let L=1;while(L<GTLV&&x>=gtNeed(L)){x-=gtNeed(L);L++}return L}
function gtLvP(x){let L=1;while(L<GTLV&&x>=gtNeed(L)){x-=gtNeed(L);L++}return L>=GTLV?1:x/gtNeed(L)}
const gtLvO=()=>gtLv(gtSt().ox),gtLvH=()=>gtLv(gtSt().hx);
function gtHas(k){return gtSt().m[k]|0}
function gtAdd(k,n){const G=gtSt();G.m[k]=Math.max(0,Math.min(GTMX,(G.m[k]|0)+n))}
function gtOkMap(){try{return!!(FIELDM[curMap]&&curMap!==1&&!isDg()&&MAPS[curMap]&&!MAPS[curMap].hub&&!MAPS[curMap].tent&&!MAPS[curMap].pvp)}catch(e){return false}}
function gtTier(){const q=(MAPS[curMap]&&MAPS[curMap].ql)|0;return q<=7?1:q<=14?2:3}
/* ---- วางจุดเก็บ (ตายตัวต่อแมพ) ---- */
function gtBuild(){GTN={m:curMap,L:[]};if(!gtOkMap())return;const M=MAPS[curMap],r=rng(hseed('gather'+curMap)),T=gtTier();
  const okAt=(x,y)=>{if(x<160||y<160||x>WW-160||y>WH-160)return false;if(Math.hypot(x-SX,y-SY)<(SR||200)+140)return false;if((M.gates||[]).some(G=>Math.hypot(x-G.x,y-G.y)<200))return false;
    if(M.boss&&M.boss.x>0&&Math.hypot(x-M.boss.x,y-M.boss.y)<420)return false;if(trees.some(t=>t.r>0&&Math.hypot(t.x-x,t.y-y)<t.r+30))return false;
    try{if(FSWM===curMap&&FSW.some(w=>((x-w.x)/(w.rx+50))**2+((y-w.y)/(w.ry+40))**2<1))return false}catch(e){}
    try{const L=terGet()?terLv(x,y):0;if(L<0||L===2)return false;if(typeof AQL!=='undefined'){const a=AQL;AQL=L;const ok=aqWalkable(x,y)&&aqWalkable(x+18,y)&&aqWalkable(x-18,y)&&aqWalkable(x,y+14);AQL=a;if(!ok)return false}}catch(e){}
    try{if(curMap===19&&Math.hypot(x-FORT.x,y-FORT.y)<FORT.R+60)return false}catch(e){}
    if(GTN.L.some(n=>Math.hypot(n.x-x,n.y-y)<260))return false;try{if(typeof aqPath==='function'&&!aqPath(SX,SY+40,x,y+12))return false}catch(e){}return true};
  ['o','h'].forEach(kind=>{let k=0;for(let i=0;i<600&&k<5;i++){const x=200+r()*(WW-400),y=200+r()*(WH-400);if(!okAt(x,y))continue;GTN.L.push({id:curMap+kind+k,k:kind,x:Math.round(x),y:Math.round(y),t:T,v:(r()*3)|0,ph:r()*6});k++}})}
function gtNodes(){if(GTN.m!==curMap)try{gtBuild()}catch(e){GTN={m:curMap,L:[]}}return GTN.L}
const gtReady=n=>!(GTD[n.id]>Date.now());
function gtNear(){if(!me.cls||!run||me.down>0||!ov.hidden||SD.on)return null;let b=null,bd=48;for(const n of gtNodes()){if(!gtReady(n))continue;const d=Math.hypot(n.x-me.x,n.y-(me.y-6));if(d<bd){bd=d;b=n}}return b}
function gtTierFor(n){const L=n.k==='o'?gtLvO():gtLvH(),cap=L>=6?3:L>=3?2:1;return Math.min(n.t,cap)}
const gtMat=(n,t)=>(n.k==='o'?'o':'h')+t;
/* ---- เก็บ ---- */
function gtStart(){const n=gtNear();if(!n||GTC)return;try{if(FS&&FS.open)fsClose()}catch(e){}const L=n.k==='o'?gtLvO():gtLvH(),dur=Math.max(1.3,2.4*(1-.05*(L-1)));
  GTC={n,t:0,d:dur,x0:me.x,y0:me.y,sp:0};me.face=Math.atan2(n.y-me.y,n.x-me.x);try{sfx(n.k==='o'?'hit':'item')}catch(e){}}
function gtStop(msg){if(!GTC)return;GTC=null;if(msg)dn.push({x:me.x,y:me.y-46,v:msg,t:1.2,col:'#ffd0a0'})}
function gtTick(dt){const b=$('gthb');{const n=GTC?null:gtNear();if(b){if(b.hidden!==!n)b.hidden=!n;if(n){const t=gtTierFor(n),k=gtMat(n,t),tx=(n.k==='o'?'⛏️ ขุด ':'🌿 เก็บ ')+GTI[k][1]+(t<n.t?' (ความชำนาญยังไม่ถึง)':'');if(b.textContent!==tx)b.textContent=tx}}}
  const G=gtSt();if(G.eb&&G.eb.t>0){G.eb.t-=dt;if(G.eb.t<=0){G.eb=null;try{recalc()}catch(e){}banner={s:'🧪 ฤทธิ์ยาบัฟหมดแล้ว — ปรุงใหม่ได้ที่เมนู ⛏️ งานฝีมือ',t:4}}}
  if(!GTC)return;const C=GTC;if(me.down>0||!ov.hidden||SD.on){gtStop('ยกเลิกการเก็บ');return}if(Math.hypot(me.x-C.x0,me.y-C.y0)>8){gtStop('ขยับตัว — ยกเลิกการเก็บ');return}
  C.t+=dt;C.sp-=dt;if(C.sp<=0){C.sp=C.n.k==='o'?.42:.5;const cx=C.n.x,cy=C.n.y-10;try{if(C.n.k==='o'){spark(cx,cy,'#ffe0a0',6,110,.35);spark(cx,cy,'#c8c0b0',4,70,.4);sfx('hit')}else{for(let i=0;i<5;i++)parts.push({x:cx+(Math.random()-.5)*20,y:cy,vx:(Math.random()-.5)*60,vy:-40-Math.random()*50,t:.7,l:.7,c:Math.random()<.5?'#7ad87a':'#c8f0a0',r:1.8})}}catch(e){}}
  if(C.t<C.d)return;GTC=null;gtDone(C.n)}
function gtDone(n){const G=gtSt(),o=n.k==='o',L=o?gtLvO():gtLvH(),t=gtTierFor(n),k=gtMat(n,t);let q=1;if(Math.random()<.25+.05*L)q++;if(L>=8&&Math.random()<.5)q++;
  gtAdd(k,q);let rare='';const rk=o?'gm':'rt';if(Math.random()<.04+.006*L+(n.t>=3?.02:0)){gtAdd(rk,1);rare=rk}
  const xp=8*t+(n.t>t?6:0)+(rare?10:0),L0=L;if(o)G.ox+=xp;else G.hx+=xp;const L1=o?gtLvO():gtLvH();
  GTD[n.id]=Date.now()+(o?GTRS.o:GTRS.h)*1000;me.stt.gth=(me.stt.gth|0)+1;
  dn.push({x:me.x,y:me.y-52,v:GTI[k][0]+' +'+q+' '+GTI[k][1],t:1.4,col:o?'#ffd8a0':'#a8f0a0'});if(rare)dn.push({x:me.x,y:me.y-74,v:'✨ '+GTI[rare][0]+' '+GTI[rare][1]+'!',t:1.6,col:'#ffb0f0'});
  try{burst(n.x,n.y-12,o?['#ffe0a0','#c8c0b0','#ffffff']:['#7ad87a','#c8f0a0','#ffffff'],14,110,.6,{g:-20})}catch(e){}try{sfx(rare?'lg_get':'item')}catch(e){}
  if(L1>L0){banner={s:(o?'⛏️ ความชำนาญขุดแร่':'🌿 ความชำนาญสมุนไพร')+' Lv '+L1+'!'+(L1===3||L1===6?' · ปลดวัตถุดิบระดับใหม่':''),t:4};try{sfx('up')}catch(e){}}
  try{dqProg('gth',1)}catch(e){}}
/* ---- วาดจุดเก็บบนพื้น ---- */
function gtDraw(){if(!me.cls)return;const now=Date.now(),t=performance.now()/1000;
  for(const n of gtNodes()){if(!inView(n.x,n.y,60))continue;const ok=gtReady(n),x=0,y=0;g.save();g.translate(n.x,n.y);g.scale(1.3,1.3);
    if(n.k==='o'){const C=[['#9a6a48','#c88a5a','#e8b080'],['#3a7ac8','#6ab8ff','#c8ecff'],['#c8a040','#ffd76a','#fff4c0']][n.t-1];
      g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+3,26,8,0,0,7);g.fill();
      const R=[[-14,0,16,13],[6,-2,15,15],[-3,-9,13,14]];R.forEach(([dx,dy,w,h],i)=>{g.fillStyle=ok?['#5a5048','#6a6058','#4a4440'][i]:'#3a3632';g.strokeStyle='#1a1612';g.lineWidth=1.1;g.beginPath();g.moveTo(x+dx-w*.5,y+dy+3);g.lineTo(x+dx-w*.4,y+dy-h*.6);g.lineTo(x+dx+w*.1,y+dy-h);g.lineTo(x+dx+w*.5,y+dy-h*.5);g.lineTo(x+dx+w*.5,y+dy+3);g.closePath();g.fill();g.stroke()});
      if(ok){for(let i=0;i<5;i++){const a=n.ph+i*1.3,cx=x+Math.cos(a)*11,cy=y-6+Math.sin(a*1.7)*5;g.fillStyle=C[i%2];g.beginPath();g.moveTo(cx,cy-4);g.lineTo(cx+2.6,cy);g.lineTo(cx,cy+3);g.lineTo(cx-2.6,cy);g.closePath();g.fill()}
        const tw=(Math.sin(t*3+n.ph)+1)/2;glowAt(x,y-6,22,h2r(C[1]),.12+.12*tw);if(tw>.85){g.fillStyle='#fff';g.globalAlpha=(tw-.85)*6;g.beginPath();g.arc(x+Math.cos(n.ph)*9,y-10,1.6,0,7);g.fill()}}}
    else{const C=[['#3a8a3a','#6ad06a','#c8f0a0'],['#8a7ac8','#e8e0ff','#ffffff'],['#d87ab0','#ffc8e8','#fff0a0']][n.t-1];
      g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x,y+2,20,6,0,0,7);g.fill();
      if(ok){const sw=Math.sin(t*1.6+n.ph)*2;for(let i=0;i<7;i++){const a=-Math.PI/2+(i-3)*.42,L=14+(i%2)*5;g.strokeStyle=i%2?'#2a6a2a':'#3a8a3a';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a)*L*.5+sw*.5,y+Math.sin(a)*L*.5,x+Math.cos(a)*L+sw,y+Math.sin(a)*L);g.stroke()}
        for(let i=0;i<3;i++){const fx=x+(i-1)*8+sw,fy=y-15-(i%2)*4;g.fillStyle=C[1];for(let p=0;p<5;p++){const a=p*1.2566+t*.3;g.beginPath();g.ellipse(fx+Math.cos(a)*2.6,fy+Math.sin(a)*2.6,2.4,1.5,a,0,7);g.fill()}g.fillStyle=C[2];g.beginPath();g.arc(fx,fy,1.4,0,7);g.fill()}
        if(n.t>1)glowAt(x,y-12,20,h2r(C[1]),.14+.08*Math.sin(t*2+n.ph))}
      else{g.strokeStyle='#4a5a3a';g.lineWidth=2;for(let i=0;i<4;i++){g.beginPath();g.moveTo(x+(i-1.5)*5,y);g.lineTo(x+(i-1.5)*5,y-4);g.stroke()}}}
    if(ok&&!(GTC&&GTC.n===n)){const bo=Math.sin(t*2.4+n.ph)*2.5;g.globalAlpha=.75+.25*Math.sin(t*3+n.ph);g.fillStyle='rgba(20,14,8,.6)';g.beginPath();g.arc(x,y-36+bo,8,0,7);g.fill();g.font='10px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(n.k==='o'?'⛏️':'🌿',x,y-36+bo);g.globalAlpha=1}
    if(GTC&&GTC.n===n){const p=Math.min(1,GTC.t/GTC.d);g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=5;g.beginPath();g.arc(x,y-34,11,0,7);g.stroke();g.strokeStyle=n.k==='o'?'#ffd06a':'#8af08a';g.lineWidth=3.4;g.beginPath();g.arc(x,y-34,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}
    g.restore()}}
/* ท่าทางตอนเก็บ: ขุด = เหวี่ยงจอบ · เก็บ = ก้มตัว (วาดทับตัวเรา) */
function gtPose(){if(!GTC)return;const t=GTC.t,n=GTC.n,dir=n.x<me.x?-1:1,x=me.x+dir*12,y=me.y-22;g.save();
  if(n.k==='o'){const a=-1.2+Math.abs(Math.sin(t*Math.PI/.42))*1.6;g.translate(x,y);g.scale(dir,1);g.rotate(a);g.strokeStyle='#6a4a2a';g.lineWidth=2.6;g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(0,-18);g.stroke();
    g.fillStyle='#c8c8d0';g.strokeStyle='#2a2a30';g.lineWidth=1;g.beginPath();g.moveTo(-9,-16);g.quadraticCurveTo(0,-23,10,-15);g.lineTo(9,-13);g.quadraticCurveTo(0,-19,-8,-14);g.closePath();g.fill();g.stroke()}
  else{const b=Math.sin(t*6)*2;g.fillStyle='#7ad87a';g.beginPath();g.ellipse(x+dir*2,y+10+b,4,2.4,0,0,7);g.fill()}
  g.restore()}
/* ---- ยาบัฟ: ใส่ผ่าน fdM เดียวกับอาหาร (ใช้ได้พร้อมอาหาร แต่ยาบัฟทีละขวด) ---- */
function gtEx(k){const G=me.gth;if(!G||!G.eb||!(G.eb.t>0))return 0;const E=GTEX[G.eb.id];return E&&E[k]||0}
/* ---- หน้าจองานฝีมือ ---- */
function gtCSS(){if($('gtcss'))return;const s=document.createElement('style');s.id='gtcss';s.textContent=
 '#gthb{position:absolute;left:50%;bottom:196px;transform:translateX(-50%);z-index:2;background:linear-gradient(#5a4a2a,#2e2414);border-color:#e8c060;color:#fff4d8;padding:10px 16px;font-size:14px;box-shadow:0 0 14px rgba(232,192,96,.45);white-space:nowrap}'+
 '.gtpr{display:flex;align-items:center;gap:9px;text-align:left;margin:6px 0}.gtpr .ic{font-size:26px;width:34px;text-align:center}.gtpr .bar{height:8px;border-radius:5px;background:rgba(255,255,255,.12);overflow:hidden;margin-top:4px}.gtpr .bar i{display:block;height:100%}'+
 '.gtgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px}.gtgrid div{position:relative;border-radius:10px;background:rgba(255,255,255,.06);padding:7px 2px 5px;text-align:center;font-size:22px}.gtgrid small{display:block;font-size:10px;opacity:.85;line-height:1.2;margin-top:2px}.gtgrid b{position:absolute;right:5px;top:3px;font-size:11px;color:#ffd84a}'+
 '.gtrc{display:flex;align-items:center;gap:8px;text-align:left;padding:8px 6px;border-bottom:1px solid rgba(255,255,255,.07)}.gtrc:last-child{border-bottom:0}.gtrc .ic{font-size:24px;width:30px;text-align:center}.gtrc .tx{flex:1;font-size:11.5px;line-height:1.35}.gtrc .tx b{font-size:13px}.gtrc .need i{font-style:normal;margin-right:6px;white-space:nowrap}.gtrc .need i.no{color:#ff8a7a}.gtrc button{font-size:12px!important;padding:6px 10px!important}';document.head.appendChild(s)}
function gtNeedTxt(R){const[,,,need,gold,lv]=R;let h='';for(const k in need){const have=gtHas(k),ok=have>=need[k];h+='<i class="'+(ok?'':'no')+'">'+GTI[k][0]+' '+have+'/'+need[k]+'</i>'}h+='<i class="'+(me.gold>=gold?'':'no')+'">💰'+gold.toLocaleString()+'</i>';
  if(lv.o)h+='<i class="'+(gtLvO()>=lv.o?'':'no')+'">⛏️ Lv '+lv.o+'</i>';if(lv.h)h+='<i class="'+(gtLvH()>=lv.h?'':'no')+'">🌿 Lv '+lv.h+'</i>';return h}
function gtCan(R){const[,,,need,gold,lv]=R;for(const k in need)if(gtHas(k)<need[k])return false;if(me.gold<gold)return false;if(lv.o&&gtLvO()<lv.o)return false;if(lv.h&&gtLvH()<lv.h)return false;return true}
function gtMake(book,id,times){const R=book[id];if(!R)return'';let n=0;for(let i=0;i<times;i++){if(!gtCan(R))break;const[,,,need,gold,,out]=R;for(const k in need)gtAdd(k,-need[k]);me.gold-=gold;
    if(out.inv){me.inv[out.inv]=Math.min(out.inv==='hp'||out.inv==='mp'?POTMAX:999,(me.inv[out.inv]|0)+out.n)}else if(out.ex){const G=gtSt();G.eb={id:out.ex,t:1800};try{recalc()}catch(e){}}else if(out.rn){try{rnShard(out.rn,'grind')}catch(e){}}n++;if(out.ex)break}
  if(!n)return'วัตถุดิบหรือทองไม่พอ';me.stt.gtc=(me.stt.gtc|0)+n;try{sfx(book===GTSM?'up':'lg_get')}catch(e){}try{burst(me.x,me.y-20,book===GTSM?['#ffd06a','#ffffff','#c8c0b0']:['#8af08a','#ffffff','#c8a0ff'],22,120,.7,{glow:1,g:-30})}catch(e){}
  return(R[6].rn?'💠 บดได้ผงรูน +'+R[6].rn*n+' (รวม '+((rnSt().sh|0).toLocaleString())+')':(book===GTSM?'⚒️ หลอมได้ ':'🧪 ปรุงได้ ')+R[1]+(n>1?' ×'+n:''))+(R[6].ex?' — ดื่มแล้ว ฤทธิ์อยู่ 30 นาที':'')}
function gtUI(msg){if(!me.cls)return;gtCSS();ov.dataset.k='gth';const G=gtSt(),lo=gtLvO(),lh=gtLvH();
  let h='<div class="pn" data-pn="gth">'+hdr('⛏️','งานฝีมือ','ขุดแร่ Lv '+lo+' · สมุนไพร Lv '+lh+(G.eb?' · 🧪 '+GTBR[G.eb.id][1]+' เหลือ '+Math.ceil(G.eb.t/60)+' นาที':''))+(msg?'<div class="note">'+msg+'</div>':'');
  h+='<div class="tabs">'+[['lv','📊 ความชำนาญ'],['sm','⚒️ หลอม/บด'],['br','🧪 ปรุงยา']].map(([k,l])=>'<button class="tab'+(GTTAB===k?' on':'')+'" data-gtt="'+k+'">'+l+'</button>').join('')+'</div>';
  if(GTTAB==='lv'){const bar=(x,c)=>'<div class="bar"><i style="width:'+Math.round(gtLvP(x)*100)+'%;background:'+c+'"></i></div>';
    h+='<div class="card"><div class="gtpr"><span class="ic">⛏️</span><div style="flex:1"><b>ขุดแร่ Lv '+lo+'</b>'+(lo>=GTLV?' <small>MAX</small>':'')+bar(G.ox,'#e8b060')+'<small style="opacity:.8">เร็วขึ้น '+(lo-1)*5+'% · ได้ 2 ชิ้น '+(25+5*lo)+'% · อัญมณี '+(4+.6*lo).toFixed(1)+'%'+(lo<3?' · ปลดแร่มิธริลที่ Lv 3':lo<6?' · ปลดแร่ดาวตกที่ Lv 6':'')+'</small></div></div>'+
      '<div class="gtpr"><span class="ic">🌿</span><div style="flex:1"><b>สมุนไพร Lv '+lh+'</b>'+(lh>=GTLV?' <small>MAX</small>':'')+bar(G.hx,'#7ad87a')+'<small style="opacity:.8">เร็วขึ้น '+(lh-1)*5+'% · ได้ 2 ชิ้น '+(25+5*lh)+'% · เห็ดวิญญาณ '+(4+.6*lh).toFixed(1)+'%'+(lh<3?' · ปลดดอกจันทร์เงินที่ Lv 3':lh<6?' · ปลดบัวแสงดาวที่ Lv 6':'')+'</small></div></div></div>';
    h+='<div class="card"><div class="cap">🧺 วัตถุดิบ</div><div class="gtgrid">'+GTK.map(k=>'<div style="'+(gtHas(k)?'':'opacity:.45')+'">'+GTI[k][0]+'<b>'+gtHas(k)+'</b><small>'+GTI[k][1]+'</small></div>').join('')+'</div></div>';
    const T=gtOkMap()?gtTier():0;h+='<div class="card hint" style="font-size:11.5px;text-align:left;line-height:1.55">🗺️ ทุกแมพสนามมีสายแร่ 5 จุดและสมุนไพร 5 จุด เดินเข้าใกล้แล้วกดปุ่ม <b>⛏️ ขุด / 🌿 เก็บ</b> · เก็บแล้วงอกใหม่ใน 2–3 นาที<br>แมพช่วงต้น = 🪨 🌿 · ช่วงกลาง (ตั้งแต่วิหารน้ำแข็ง) = 🔷 🌸 · ช่วงปลาย (ตั้งแต่ทะเลสาบดาวตก) = ☄️ 🪷'+(T?'<br>📍 แมพนี้: '+(T===1?'🪨 แร่เหล็ก · 🌿 สมุนไพรเขียว':T===2?'🔷 แร่มิธริล · 🌸 ดอกจันทร์เงิน':'☄️ แร่ดาวตก · 🪷 บัวแสงดาว')+' (เหลือ '+gtNodes().filter(gtReady).length+'/'+gtNodes().length+' จุด)':'')+'</div>'}
  else{const book=GTTAB==='sm'?GTSM:GTBR;h+='<div class="card" style="padding:4px 8px">'+Object.keys(book).map(id=>{const R=book[id],can=gtCan(R),multi=!R[6].ex;
      return'<div class="gtrc"><span class="ic">'+R[0]+'</span><div class="tx"><b>'+R[1]+'</b><br>'+R[2]+'<div class="need">'+gtNeedTxt(R)+'</div></div><div style="display:flex;flex-direction:column;gap:4px"><button class="pri" data-gtm="'+id+'"'+(can?'':' disabled')+'>'+(GTTAB==='sm'?(R[6].rn?'บด':'หลอม'):R[6].ex?'ปรุง+ดื่ม':'ปรุง')+'</button>'+(multi?'<button data-gtm5="'+id+'"'+(can?'':' disabled')+'>×5</button>':'')+'</div></div>'}).join('')+'</div>';
    if(GTTAB==='br')h+='<div class="card hint" style="font-size:11.5px">🧪 ยาบัฟใช้ได้ทีละขวด (ขวดใหม่แทนขวดเก่า) · ใช้พร้อมอาหารจากปลาได้ · ฤทธิ์ 30 นาที</div>';
    else h+='<div class="card hint" style="font-size:11.5px">⚒️ ของที่หลอมได้เข้ากระเป๋า 🧺 ของใช้ & วัตถุดิบ ทันที</div>'}
  h+='</div>';ov.innerHTML=h;ov.hidden=false;
  ov.querySelectorAll('[data-gtt]').forEach(b=>b.onclick=()=>{GTTAB=b.dataset.gtt;gtUI()});
  ov.querySelectorAll('[data-gtm]').forEach(b=>b.onclick=()=>{const id=b.dataset.gtm;gtUI(gtMake(GTTAB==='sm'?GTSM:GTBR,id,1))});
  ov.querySelectorAll('[data-gtm5]').forEach(b=>b.onclick=()=>{const id=b.dataset.gtm5;gtUI(gtMake(GTTAB==='sm'?GTSM:GTBR,id,5))})}
/* ---- ลงทะเบียนวัตถุดิบเป็น "ของใช้" (ขายในตลาด/แนบจดหมายได้) · เรียกทันทีหลังสร้าง GDM ---- */
function gtGdReg(){GTK.forEach(k=>{if(!GDM[k]){const I=GTI[k];GDM[k]={k,n:I[0]+' '+I[1],ic:()=>I[0],max:GTMX,d:I[2]+' · ใช้หลอม/บด/ปรุงยาที่เมนู ⛏️ งานฝีมือ'};GOODS.push(GDM[k])}if(!MKG.includes(k))MKG.push(k)})}
/* ---- กรองเซฟ ---- */
function gtClean(x){if(!x||typeof x!=='object')return undefined;const o={m:{},ox:Math.max(0,Math.min(1e7,Math.floor(+x.ox||0))),hx:Math.max(0,Math.min(1e7,Math.floor(+x.hx||0)))};
  if(x.m&&typeof x.m==='object')GTK.forEach(k=>{const v=Math.max(0,Math.min(GTMX,Math.floor(+x.m[k]||0)));if(v)o.m[k]=v});
  if(x.eb&&typeof x.eb==='object'&&GTEX[x.eb.id]&&+x.eb.t>0)o.eb={id:x.eb.id,t:Math.min(1800,+x.eb.t)};return o}
/* ---- ติดตั้ง ---- */
setTimeout(()=>{try{
  gtCSS();if(!$('gthb')){const st=$('stage')||document.body,b=document.createElement('button');b.id='gthb';b.hidden=true;b.onclick=()=>gtStart();st.appendChild(b)}
  const _fd=fshDraw;window.fshDraw=fshDraw=function(){_fd.apply(this,arguments);try{gtDraw()}catch(e){}};
  const _ft=fshTick;window.fshTick=fshTick=function(dt){_ft.apply(this,arguments);try{gtTick(dt)}catch(e){}};
  const _fm=fdM;window.fdM=fdM=function(k){return _fm(k)+gtEx(k)};
  const _dr=drawRx;window.drawRx=drawRx=function(){_dr.apply(this,arguments);try{gtPose()}catch(e){}};
  const _bl=buffList;window.buffList=buffList=function(){const L=_bl.apply(this,arguments);try{const G=me.gth;if(G&&G.eb&&G.eb.t>0&&me.cls&&run){const R=GTBR[G.eb.id];BFX.gtx=1800;L.push({k:'gtx',ic:R[0],n:R[1],d:R[2],t:G.eb.t,mx:1800,col:'#8af08a'})}}catch(e){}return L};
  /* วัตถุดิบอยู่ใน GOODS แล้ว (ช่องในกระเป๋า 🧺 + หน้าแลกเปลี่ยน) */
}catch(e){console.warn('gth init',e)}},330);
setInterval(()=>{try{if(!$('gtm')){const ref=$('fsm');if(ref){const b=document.createElement('button');b.id='gtm';b.innerHTML='<i>⛏️</i><span>งานฝีมือ</span><b class="bd"></b>';ref.parentNode.insertBefore(b,ref.nextSibling);b.onclick=()=>{if(me.cls&&run){GTTAB='lv';gtUI()}}}}}catch(e){}},1000);
