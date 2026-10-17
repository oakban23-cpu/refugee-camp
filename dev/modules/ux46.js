/* ---------- v428 เก็บวัตถุดิบ รอบ 2 ----------
   ① สายแร่ยักษ์ / ดอกไม้ทอง: โผล่สุ่มในแมพสนาม ทุกคนในแมพเห็นพร้อมกัน ช่วยกันขุด · แตกแล้วทุกคนที่ช่วยได้ของหายากแน่นอน
      (โฮสต์ของแมพเป็นคนเกิด/นับเลือด · fx ggs สถานะ / ggh ขุด 1 ครั้ง / ggd แตก / ggx หมดเวลา)
   ② เครื่องมือ: จอบ (ขุดแร่) · เคียว (สมุนไพร) อัปเกรด 5 ขั้นด้วยวัตถุดิบ → เร็วขึ้น · ได้ 2 ชิ้นบ่อยขึ้น · ช่องจังหวะกว้างขึ้น · ขุดยักษ์แรงขึ้น
   ③ มินิเกมจังหวะ: ระหว่างเก็บมีเข็มวิ่ง แตะตอนเข็มอยู่ในช่องทอง = «เป๊ะ!» ได้ของเพิ่ม 1 + ลุ้นของหายาก + XP ×1.5 และเก็บเสร็จทันที (ไม่แตะก็เก็บได้ตามปกติ)
   ④ ความชำนาญเกิน Lv 10: ดาว ★1–★10 (โบนัสได้ 2 ชิ้น +1%/ดาว · ของหายาก +0.3%/ดาว) · ฉายาใหม่ 4 แบบ · สมุดสะสมวัตถุดิบ + รางวัลขั้นสะสม */
const GWK=['o1','o2','o3','gm','h1','h2','h3','rt'];
const GWTN={o:['จอบไม้เก่า','จอบเหล็ก','จอบเหล็กกล้า','จอบมิธริล','จอบดาวตก','จอบตำนาน'],h:['เคียวสนิม','เคียวเหล็ก','เคียวเงิน','เคียวจันทร์เงิน','เคียวแสงดาว','เคียวตำนาน']};
const GWTC=['#a8a8b0','#c8c8d0','#e0e4ec','#7ac8ff','#ffd76a','#ff9ae8'];
/* ค่าอัปเกรด: [วัตถุดิบ {k:n}, ทอง, ความชำนาญที่ต้องมี] · ขุดแร่ใช้สาย o/gm · สมุนไพรใช้สาย h/rt */
const GWUP={o:[[{o1:10},2000,1],[{o1:20,gm:1},8000,3],[{o2:15,gm:2},30000,5],[{o2:20,o3:10,gm:4},120000,7],[{o3:25,gm:8},500000,10]],
            h:[[{h1:10},2000,1],[{h1:20,rt:1},8000,3],[{h2:15,rt:2},30000,5],[{h2:20,h3:10,rt:4},120000,7],[{h3:25,rt:8},500000,10]]};
const GWBASE=4275,GWSMX=10,gwSNeed=s=>1200+300*s;
const gwTl=k=>{const G=gtSt();return((G.tl&&G.tl[k])|0)};
const gwSpd=k=>1-.06*gwTl(k);
const gwHead=k=>GWTC[gwTl(k)]||GWTC[0];
function gwSpdPct(k,L){return Math.round((1-Math.max(.8,Math.max(1.3,2.4*(1-.05*(L-1)))*gwSpd(k))/2.4)*100)}
function gwStarOf(x){x-=GWBASE;let s=0;if(x<0)return{s:0,p:0,n:gwSNeed(1)};while(s<GWSMX&&x>=gwSNeed(s+1)){x-=gwSNeed(s+1);s++}return{s,p:s>=GWSMX?1:x/gwSNeed(s+1),n:gwSNeed(s+1),x}}
const gwStar=k=>{const G=gtSt();return gwStarOf(k==='o'?G.ox:G.hx).s};
const gwDbl=k=>.04*gwTl(k)+.01*gwStar(k);
const gwRare=k=>.003*gwStar(k);
function gwStarTx(k){const s=gwStar(k);return s?' <b style="color:#ffd84a">★'+s+'</b>':' <small>MAX</small>'}
function gwStarBar(k,c){const G=gtSt(),S=gwStarOf(k==='o'?G.ox:G.hx);return'<div class="bar"><i style="width:'+Math.round(S.p*100)+'%;background:'+c+'"></i></div><small style="opacity:.8;display:block">'+(S.s>=GWSMX?'★10 สูงสุดแล้ว':'ดาวถัดไป ★'+(S.s+1)+' · '+Math.floor(S.x||0)+'/'+S.n+' XP')+' · ดาวละ: ได้ 2 ชิ้น +1% · ของหายาก +0.3%</small>'}
function gwStarUp(k,S0){const s=gwStar(k);try{me.stt[k==='o'?'gso':'gsh']=Math.max(me.stt[k==='o'?'gso':'gsh']|0,s)}catch(e){}if(s>S0){banner={s:(k==='o'?'⛏️ ความชำนาญขุดแร่':'🌿 ความชำนาญสมุนไพร')+' ★'+s+'!'+(s===5?' · ได้ฉายา '+(k==='o'?'«นักขุดตำนาน»':'«หมอยาพเนจร»'):''),t:4};try{sfx('up')}catch(e){}}}
/* ---- สมุดสะสม ---- */
const GWMS=[25,100,500,2000],GWMR=[5,25,100,300];
const gwRareK=k=>k==='gm'||k==='rt';
const gwTierOf=k=>gwRareK(k)?3:+k[1];
function gwGain(k,n){const G=gtSt();G.c=G.c||{};G.c[k]=Math.min(1e7,(G.c[k]|0)+n)}
function gwRw(k,i){const T=gwTierOf(k),rk=k[0]==='o'||k==='gm'?'gm':'rt';
  if(gwRareK(k))return[{g:5000},{rn:20},{th:5,g:20000},{dy:'d8',g:100000}][i];
  return[{g:2000*T},{m:rk,n:1+T},{th:3,xp:200},{m:rk,n:10,g:50000*T}][i]}
function gwRwTx(r){const L=[];if(r.g)L.push('💰'+r.g.toLocaleString());if(r.m)L.push(GTI[r.m][0]+'×'+r.n);if(r.rn)L.push('💠 ผงรูน '+r.rn);if(r.th)L.push('✂️ ด้าย '+r.th);if(r.xp)L.push('XP ความชำนาญ +'+r.xp);if(r.dy)L.push('🌈 สีย้อมรุ้ง');return L.join(' · ')}
function gwClaim(k){const G=gtSt();G.cb=G.cb||{};const i=G.cb[k]|0,M=gwRareK(k)?GWMR:GWMS;if(!GWK.includes(k)||i>=4)return'';if(((G.c&&G.c[k])|0)<M[i])return'ยังสะสมไม่ถึง';
  const r=gwRw(k,i);G.cb[k]=i+1;if(r.g)me.gold+=r.g;if(r.m)gtAdd(r.m,r.n);if(r.rn)try{rnShard(r.rn,'book')}catch(e){}if(r.th)try{wdrThread(r.th,'สมุดสะสม')}catch(e){}
  if(r.xp){if(k[0]==='o')G.ox+=r.xp;else G.hx+=r.xp}if(r.dy)try{dyAdd(r.dy,1)}catch(e){}try{sfx('lg_get')}catch(e){}try{burst(me.x,me.y-20,['#ffd84a','#ffffff','#ffb0f0'],22,120,.7,{glow:1,g:-30})}catch(e){}try{writeSave()}catch(e){}
  return'📖 รับรางวัลสะสม '+GTI[k][0]+' '+GTI[k][1]+' ขั้น '+(i+1)+': '+gwRwTx(r)}
function gwBookHTML(){const G=gtSt(),C=G.c||{},B=G.cb||{};let all=0,done=0;
  let h='<div class="card" style="padding:6px 8px"><div class="cap">📖 สมุดสะสมวัตถุดิบ</div><div style="font-size:11px;opacity:.8;margin-bottom:4px">นับทุกชิ้นที่เก็บได้เอง (ขุด/เก็บ/สายแร่ยักษ์) · ถึงขั้นแล้วกดรับรางวัล</div>';
  h+=GWK.map(k=>{const n=C[k]|0,i=B[k]|0,M=gwRareK(k)?GWMR:GWMS,nx=M[Math.min(3,i)],can=i<4&&n>=nx,found=n>0;all+=4;done+=i;
    return'<div class="gtrc"><span class="ic" style="'+(found?'':'filter:grayscale(1) brightness(.4)')+'">'+GTI[k][0]+'</span><div class="tx"><b>'+(found?GTI[k][1]:'❓ ยังไม่เคยพบ')+'</b> <small style="opacity:.75">สะสม '+n.toLocaleString()+'</small>'+
      '<div style="display:flex;gap:3px;margin:3px 0">'+M.map((m,j)=>'<i style="font-style:normal;font-size:10px;padding:1px 6px;border-radius:7px;'+(j<i?'background:#5a8a3a;color:#efffe0':n>=m?'background:#e7b75a;color:#20180c':'background:rgba(255,255,255,.08);opacity:.7')+'">'+(j<i?'✓ ':'')+m+'</i>').join('')+'</div>'+
      (i<4?'<small style="opacity:.8">ขั้น '+(i+1)+': '+gwRwTx(gwRw(k,i))+'</small>':'<small style="color:#9fe89f">สะสมครบทุกขั้นแล้ว</small>')+(found?'':'<small style="display:block;opacity:.65">'+GTI[k][2]+'</small>')+'</div>'+
      (i<4?'<button class="pri" data-gwc="'+k+'"'+(can?'':' disabled')+'>รับ</button>':'')+'</div>'}).join('');
  return h+'<div style="text-align:right;font-size:11px;opacity:.75;margin-top:4px">ความคืบหน้าสมุด '+done+'/'+all+' ขั้น</div></div>'}
/* ---- เครื่องมือ ---- */
function gwNeedTx(need,gold,lv,k){let h='';for(const q in need){const ok=gtHas(q)>=need[q];h+='<i class="'+(ok?'':'no')+'">'+GTI[q][0]+' '+gtHas(q)+'/'+need[q]+'</i>'}
  h+='<i class="'+(me.gold>=gold?'':'no')+'">💰'+gold.toLocaleString()+'</i>';const L=k==='o'?gtLvO():gtLvH();h+='<i class="'+(L>=lv?'':'no')+'">'+(k==='o'?'⛏️':'🌿')+' Lv '+lv+'</i>';return h}
function gwCanUp(k){const l=gwTl(k);if(l>=5)return false;const[need,gold,lv]=GWUP[k][l];for(const q in need)if(gtHas(q)<need[q])return false;return me.gold>=gold&&(k==='o'?gtLvO():gtLvH())>=lv}
function gwUpTool(k){if(k!=='o'&&k!=='h')return'';if(!gwCanUp(k))return'วัตถุดิบ ทอง หรือความชำนาญยังไม่พอ';const G=gtSt(),l=gwTl(k),[need,gold]=GWUP[k][l];for(const q in need)gtAdd(q,-need[q]);me.gold-=gold;G.tl=G.tl||{o:0,h:0};G.tl[k]=l+1;
  try{sfx('up')}catch(e){}try{burst(me.x,me.y-20,[GWTC[l+1],'#ffffff','#ffd06a'],26,130,.7,{glow:1,g:-30})}catch(e){}try{writeSave()}catch(e){}return'🛠️ อัปเกรดเป็น '+GWTN[k][l+1]+' แล้ว!'}
function gwToolHTML(){let h='';['o','h'].forEach(k=>{const l=gwTl(k),nm=GWTN[k][l],ef=L=>'เก็บเร็วขึ้น '+Math.round(6*L)+'% · ได้ 2 ชิ้น +'+4*L+'% · ช่องจังหวะกว้างขึ้น'+(L>=3?' · ขุดยักษ์แรง +'+(L>=5?2:1):'');
    h+='<div class="card" style="text-align:left"><div class="gtpr"><span class="ic" style="font-size:30px">'+(k==='o'?'⛏️':'🌾')+'</span><div style="flex:1"><b style="color:'+GWTC[l]+'">'+nm+'</b> <small>ขั้น '+l+'/5</small><br><small style="opacity:.8">'+(l?ef(l):'เครื่องมือพื้นฐาน ยังไม่มีโบนัส')+'</small></div></div>';
    if(l<5){const[need,gold,lv]=GWUP[k][l];h+='<div class="gtrc" style="border:0"><div class="tx">ถัดไป: <b style="color:'+GWTC[l+1]+'">'+GWTN[k][l+1]+'</b><br><small style="opacity:.8">'+ef(l+1)+'</small><div class="need">'+gwNeedTx(need,gold,lv,k)+'</div></div><button class="pri" data-gwu="'+k+'"'+(gwCanUp(k)?'':' disabled')+'>อัปเกรด</button></div>'}
    else h+='<small style="color:#9fe89f">✨ เครื่องมือขั้นสูงสุดแล้ว</small>';h+='</div>'});
  return h+'<div class="card hint" style="font-size:11.5px;text-align:left">🎯 ระหว่างขุด/เก็บ แตะปุ่มตอนเข็มอยู่ใน<b>ช่องทอง</b> = «เป๊ะ!» ได้ของเพิ่ม 1 · ลุ้นของหายาก · XP ×1.5 และเก็บเสร็จทันที</div>'}
/* ---- มินิเกมจังหวะ ---- */
function gwMg(n,dur){return{z:.38+Math.random()*.42,w:.15+.015*gwTl(n.k),sp:2.2/dur,ph:Math.random()*.6,r:0,done:0}}
const gwTri=u=>{u=((u%2)+2)%2;return u<1?u:2-u};
function gwNeedle(C){return gwTri(C.t*C.mg.sp+C.mg.ph)}
const GW={blk:0};
function gwTap(){const C=GTC;if(!C||!C.mg||C.mg.done)return;const M=C.mg,p=gwNeedle(C),d=Math.abs(p-M.z),r=d<=M.w/2?2:d<=M.w?1:0;M.done=1;M.r=r;M.p=p;GW.blk=performance.now()+450;
  const x=C.n.x,y=C.n.y-(C.n.gg?110:64);
  if(r===2){dn.push({x,y:y-14,v:'✨ เป๊ะ!',t:1.1,col:'#ffe27a'});try{skStat('gpf')}catch(e){}try{burst(x,y,['#ffe27a','#ffffff'],16,120,.5,{glow:1,g:-20})}catch(e){}try{sfx('lg_get')}catch(e){}C.t=Math.max(C.t,C.d)}
  else if(r===1){dn.push({x,y:y-14,v:'👍 ดี',t:.9,col:'#c8f0a0'});try{sfx('item')}catch(e){}}
  else{dn.push({x,y:y-14,v:'พลาด',t:.8,col:'#c8b8a8'})}}
function gwDrawMg(){const C=GTC;if(!C||!C.mg)return;const M=C.mg,x=C.n.x,y=C.n.y-(C.n.gg?(C.n.k==='o'?100:112):64),w=70,h=9,x0=x-w/2;g.save();
  g.fillStyle='rgba(10,8,14,.78)';g.strokeStyle='rgba(255,230,180,.55)';g.lineWidth=1;g.beginPath();g.roundRect?g.roundRect(x0-3,y-h/2-3,w+6,h+6,6):g.rect(x0-3,y-h/2-3,w+6,h+6);g.fill();g.stroke();
  g.fillStyle='rgba(255,215,106,.35)';g.fillRect(x0+(M.z-M.w)*w,y-h/2,M.w*2*w,h);g.fillStyle='#ffd76a';g.fillRect(x0+(M.z-M.w/2)*w,y-h/2,M.w*w,h);
  const p=M.done?M.p:gwNeedle(C);g.fillStyle=M.done?(M.r===2?'#fff6a0':M.r===1?'#c8f0a0':'#ff9a8a'):'#ffffff';g.fillRect(x0+p*w-1.5,y-h/2-3,3,h+6);
  g.fillStyle='rgba(0,0,0,.4)';g.fillRect(x0,y+h/2+4,w,3);g.fillStyle=C.n.k==='o'?'#ffd06a':'#8af08a';g.fillRect(x0,y+h/2+4,w*Math.min(1,C.t/C.d),3);g.restore()}
/* ---- สายแร่ยักษ์ / ดอกไม้ทอง ---- */
let GG=null;const GGR={},GGL={nx:0,b:0,sd:0},GGFX=[];
const ggOn=()=>!!(GG&&GG.m===curMap&&GG.hp>0);
let GGN=null;function ggNode(){if(!ggOn())return null;if(!GGN||GGN.id!==GG.id)GGN={gg:1,id:GG.id,k:GG.k,x:GG.x,y:GG.y,t:GG.t};return GGN}
const ggName=k=>k==='o'?'สายแร่ยักษ์':'ดอกไม้ทอง';
function ggPow(){const l=gwTl(GG?GG.k:'o');return 1+(l>=3?1:0)+(l>=5?1:0)}
function ggBc(){if(!GG)return;GGL.b=performance.now();fx({k:'ggs',id:GG.id,gk:GG.k,gx:GG.x,gy:GG.y,t:GG.t,hp:GG.hp,mx:GG.mx,rm:Math.max(0,Math.round((GG.end-Date.now())/1000)),c:Object.entries(GG.c).slice(0,30)})}
function ggAnnounce(){if(!GG)return;banner={s:(GG.k==='o'?'💎 สายแร่ยักษ์':'🌼 ดอกไม้ทอง')+' โผล่ในแมพนี้! ตามลูกศรทองไปช่วยกัน'+(GG.k==='o'?'ขุด':'เก็บ')+' · แตกแล้วได้ของหายากแน่นอน',t:6};try{sfx('lvl')}catch(e){}}
function ggSpawn(force){if(!gtOkMap()||ggOn())return false;const L=gtNodes();if(!L.length)return false;const n=L[(Math.random()*L.length)|0],k=Math.random()<.5?'o':'h',a=Math.random()*6.28,
  pl=Math.max(1,(typeof plCount==='function'?plCount():1)|0),mx=Math.min(40,10+4*(pl-1));
  GG={id:'gg'+curMap+'_'+Date.now().toString(36),m:curMap,k,x:Math.round(n.x+Math.cos(a)*70),y:Math.round(n.y+Math.sin(a)*50),t:gtTier(),hp:mx,mx,end:Date.now()+180000,c:{},last:{}};
  ggAnnounce();ggBc();return true}
function ggHostTick(){if(!me.cls||!run)return;const now=Date.now();if(GG&&GG.m!==curMap)GG=null;
  if(!isHost())return;if(GG){if(GG.hp>0&&now>GG.end){fx({k:'ggx',id:GG.id});return}if(GG.hp>0&&performance.now()-GGL.b>3000)ggBc();return}
  if(!gtOkMap())return;if(!GGL.nx){GGL.nx=now+60000+Math.random()*60000;return}if(now<GGL.nx)return;GGL.nx=now+20000;if(Math.random()<.07)ggSpawn()}
function ggFx(o){const now=Date.now();/* สถานะ/แตก/หมดเวลา ต้องมาจากโฮสต์ของแมพเท่านั้น */if((o.k==='ggs'||o.k==='ggd'||o.k==='ggx')&&o.by!==hostId())return;
  if(o.k==='ggs'){if(typeof o.id!=='string'||typeof o.gx!=='number')return;const isNew=!GG||GG.id!==o.id;if(isNew&&GGR[o.id])return;
    const c={};(Array.isArray(o.c)?o.c:[]).forEach(e=>{if(Array.isArray(e)&&typeof e[0]==='string')c[e[0]]=Math.max(0,Math.min(999,e[1]|0))});
    if(isNew){GG={id:o.id,m:curMap,k:o.gk==='h'?'h':'o',x:o.gx,y:o.gy,t:Math.max(1,Math.min(3,o.t|0)),hp:o.hp|0,mx:Math.max(1,o.mx|0),end:now+Math.max(0,o.rm|0)*1000,c,last:{}};
      ggAnnounce()}
    else if(!isHost()){GG.hp=Math.min(GG.hp,o.hp|0);GG.mx=Math.max(1,o.mx|0);GG.end=now+Math.max(0,o.rm|0)*1000;Object.assign(GG.c,c)}return}
  if(o.k==='ggh'){if(!GG||o.id!==GG.id||GG.hp<=0)return;const by=typeof o.by==='string'?o.by:'';if(!by)return;
    if(isHost()){const t=performance.now();if(t-(GG.last[by]||0)<550)return;GG.last[by]=t;GG.hp=Math.max(0,GG.hp-Math.max(1,Math.min(4,o.n|0)));GG.c[by]=(GG.c[by]|0)+1;
      if(GG.hp<=0){fx({k:'ggd',id:GG.id,c:Object.entries(GG.c).slice(0,30)})}else if(t-GGL.b>400)ggBc()}
    else if(by!==uid){GG.hp=Math.max(1,GG.hp-Math.max(1,Math.min(4,o.n|0)))}
    try{if(by!==uid&&inView(GG.x,GG.y,80))spark(GG.x+(Math.random()-.5)*30,GG.y-20,GG.k==='o'?'#ffe0a0':'#fff0a0',5,90,.35)}catch(e){}return}
  if(o.k==='ggd'||o.k==='ggx'){if(!GG||o.id!==GG.id||GGR[o.id])return;GGR[o.id]=1;const G0=GG;GG=null;GGN=null;if(GTC&&GTC.n&&GTC.n.gg)GTC=null;GGL.nx=now+180000;
    GGFX.push({x:G0.x,y:G0.y,k:G0.k,t:0,d:o.k==='ggd'});
    if(o.k==='ggx'){banner={s:(G0.k==='o'?'💎 สายแร่ยักษ์จมหายลงดิน':'🌼 ดอกไม้ทองร่วงโรย')+'ไปแล้ว — ครั้งหน้ารีบช่วยกันนะ',t:4};return}
    try{burst(G0.x,G0.y-30,G0.k==='o'?['#ffe0a0','#ffffff','#7ac8ff','#ffd76a']:['#fff0a0','#ffffff','#ffb0e0','#ffd76a'],46,220,1.1,{glow:1,g:-10})}catch(e){}try{sfx('boom')}catch(e){}
    let mine=0;(Array.isArray(o.c)?o.c:[]).forEach(e=>{if(Array.isArray(e)&&e[0]===uid)mine=Math.max(0,Math.min(999,e[1]|0))});if(mine>0)ggReward(G0,mine);
    else banner={s:(G0.k==='o'?'💥 สายแร่ยักษ์':'💥 ดอกไม้ทอง')+'แตกแล้ว! (คุณไม่ได้ช่วย จึงไม่ได้รางวัล)',t:4}}}
function ggReward(G0,mine){const G=gtSt(),o=G0.k==='o',L=o?gtLvO():gtLvH(),cap=L>=6?3:L>=3?2:1,t=Math.min(G0.t,cap),k=(o?'o':'h')+t,rk=o?'gm':'rt',n=Math.min(12,4+mine),r=Math.min(4,1+Math.floor(mine/4)),S0=gwStar(G0.k);
  gtAdd(k,n);gwGain(k,n);gtAdd(rk,r);gwGain(rk,r);if(o)G.ox+=50*G0.t;else G.hx+=50*G0.t;try{skStat('ggb')}catch(e){}me.stt.gth=(me.stt.gth|0)+1;gwStarUp(G0.k,S0);
  banner={s:'💥 '+ggName(G0.k)+'แตกแล้ว! ได้ '+GTI[k][0]+'×'+n+' '+GTI[rk][0]+'×'+r+' (ช่วย '+mine+' ครั้ง)',t:5};dn.push({x:me.x,y:me.y-70,v:'✨ '+GTI[rk][0]+'×'+r+' '+GTI[rk][1],t:1.8,col:'#ffb0f0'});try{sfx('lg_get')}catch(e){}try{writeSave()}catch(e){}}
function ggHitDone(n,C){if(!ggOn()||n.id!==GG.id)return;const pf=C&&C.mg?C.mg.r|0:0,pw=ggPow()+(pf===2?1:0),G=gtSt(),o=n.k==='o',t=gtTierFor(n),k=gtMat(n,t);
  gtAdd(k,1);gwGain(k,1);const S0=gwStar(n.k);if(o)G.ox+=6*t;else G.hx+=6*t;gwStarUp(n.k,S0);dn.push({x:me.x,y:me.y-52,v:GTI[k][0]+' +1 · 💥'+pw,t:1,col:o?'#ffd8a0':'#a8f0a0'});
  if(!isHost())GG.hp=Math.max(1,GG.hp-pw);fx({k:'ggh',id:n.id,n:pw});
  try{burst(n.x,n.y-26,o?['#ffe0a0','#ffffff','#7ac8ff']:['#fff0a0','#ffffff','#ffb0e0'],10,120,.5,{g:-20})}catch(e){}
  /* ขุดต่ออัตโนมัติจนกว่าจะขยับตัว */
  setTimeout(()=>{try{if(!GTC&&ggOn()&&gtNear()===ggNode())gtStart()}catch(e){}},220)}
function ggDraw(){const t=performance.now()/1000;
  for(let i=GGFX.length-1;i>=0;i--){const F=GGFX[i];F.t+=1/60;if(F.t>1.4){GGFX.splice(i,1);continue}if(!inView(F.x,F.y,120))continue;const a=1-F.t/1.4;g.save();g.globalCompositeOperation='lighter';glowAt(F.x,F.y-30,90*(1+F.t),F.k==='o'?'255,220,140':'255,240,160',.6*a);g.restore()}
  if(!ggOn())return;const x=GG.x,y=GG.y,o=GG.k==='o',C=o?[['#9a6a48','#c88a5a','#ffd0a0'],['#3a7ac8','#6ab8ff','#c8ecff'],['#c8a040','#ffd76a','#fff4c0']][GG.t-1]:null,pu=(Math.sin(t*2.4)+1)/2;
  if(inView(x,y,200)){g.save();
    g.globalCompositeOperation='lighter';glowAt(x,y-30,90,o?h2r(C[1]):'255,215,110',.22+.16*pu);
    const bh=260;const gr=g.createLinearGradient(x,y-bh,x,y);gr.addColorStop(0,'rgba(255,230,150,0)');gr.addColorStop(1,'rgba(255,230,150,'+(.16+.1*pu)+')');g.fillStyle=gr;g.fillRect(x-16,y-bh,32,bh);
    g.globalCompositeOperation='source-over';g.save();g.translate(x,y);g.scale(1.6,1.6);g.translate(-x,-y);g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(x,y+4,62,17,0,0,7);g.fill();
    if(o){const R=[[-34,2,34,30,'#5a5048'],[22,4,30,26,'#4a4440'],[-8,-6,40,46,'#6a6058'],[-22,-2,20,22,'#504840'],[30,-2,18,18,'#5a5048']];
      R.forEach(([dx,dy,w,hh,c])=>{g.fillStyle=c;g.strokeStyle='#1a1612';g.lineWidth=1.6;g.beginPath();g.moveTo(x+dx-w*.5,y+dy+4);g.lineTo(x+dx-w*.42,y+dy-hh*.6);g.lineTo(x+dx+w*.08,y+dy-hh);g.lineTo(x+dx+w*.5,y+dy-hh*.45);g.lineTo(x+dx+w*.5,y+dy+4);g.closePath();g.fill();g.stroke()});
      for(let i=0;i<9;i++){const a=i*.7+t*.2,cx=x+Math.cos(a*1.3)*30,cy=y-18+Math.sin(a*1.9)*14,s=4+((i*7)%4);g.fillStyle=C[i%3];g.strokeStyle='rgba(20,14,8,.7)';g.lineWidth=.8;g.beginPath();g.moveTo(cx,cy-s*1.6);g.lineTo(cx+s*.8,cy);g.lineTo(cx,cy+s*.7);g.lineTo(cx-s*.8,cy);g.closePath();g.fill();g.stroke()}
      g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const q=(t*.7+i/4)%1;glowAt(x+Math.sin(i*2.1+t)*28,y-20-q*40,6,h2r(C[2]),.7*(1-q))}g.globalCompositeOperation='source-over'}
    else{const sw=Math.sin(t*1.4)*3;g.strokeStyle='#2a6a2a';g.lineWidth=5;g.lineCap='round';for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*.33,L=34+(i%3)*10;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a)*L*.5+sw*.5,y+Math.sin(a)*L*.5,x+Math.cos(a)*L+sw,y+Math.sin(a)*L);g.stroke()}
      const fx0=x+sw,fy0=y-52;for(let p=0;p<8;p++){const a=p*.785+t*.25;g.fillStyle=p%2?'#ffd76a':'#ffe9a0';g.strokeStyle='#a87a1a';g.lineWidth=1;g.beginPath();g.ellipse(fx0+Math.cos(a)*13,fy0+Math.sin(a)*13,12,6,a,0,7);g.fill();g.stroke()}
      g.fillStyle='#fff6c8';g.beginPath();g.arc(fx0,fy0,8,0,7);g.fill();g.globalCompositeOperation='lighter';glowAt(fx0,fy0,40,'255,220,110',.5+.3*pu);for(let i=0;i<5;i++){const q=(t*.5+i/5)%1;glowAt(fx0+Math.sin(i*2.7+t)*30,fy0+20-q*50,4,'255,240,170',.8*(1-q))}g.globalCompositeOperation='source-over'}
    g.restore();
    /* แถบเลือด + คนช่วย + เวลา */
    const bw=104,by=y-(o?126:140),p=GG.hp/GG.mx,rm=Math.max(0,Math.ceil((GG.end-Date.now())/1000)),nc=Object.keys(GG.c).length;
    g.fillStyle='rgba(10,8,14,.8)';g.fillRect(x-bw/2-2,by-2,bw+4,10);g.fillStyle=o?'#ffd06a':'#ffe27a';g.fillRect(x-bw/2,by,bw*p,6);g.strokeStyle='rgba(255,240,200,.6)';g.lineWidth=1;g.strokeRect(x-bw/2-2,by-2,bw+4,10);
    g.font='bold 11px system-ui';g.textAlign='center';g.textBaseline='bottom';g.lineWidth=3;g.strokeStyle='rgba(0,0,0,.75)';const tx=(o?'💎 ':'🌼 ')+ggName(GG.k)+' · 👥'+nc+' · ⏳'+Math.floor(rm/60)+':'+String(rm%60).padStart(2,'0');g.strokeText(tx,x,by-4);g.fillStyle='#fff4d0';g.fillText(tx,x,by-4);
    if(!(GTC&&GTC.n&&GTC.n.gg)){const bo=Math.sin(t*2.4)*3;g.font='15px system-ui';g.textBaseline='middle';g.fillText(o?'⛏️':'🌿',x,by-30+bo)}
    g.restore()}
  /* ลูกศรทองชี้ทาง */
  const d=Math.hypot(x-me.x,y-me.y);if(d>260&&me.cls&&me.down<=0){const a=Math.atan2(y-me.y,x-me.x),r=74+Math.sin(t*5)*6,ax=me.x+Math.cos(a)*r,ay=me.y-14+Math.sin(a)*r*.75;g.save();g.translate(ax,ay);
    g.globalCompositeOperation='lighter';glowAt(0,0,26,'255,215,110',.6);g.globalCompositeOperation='source-over';g.rotate(a);g.fillStyle='#ffd76a';g.strokeStyle='#3a2408';g.lineWidth=2.4;g.beginPath();g.moveTo(18,0);g.lineTo(-8,-12);g.lineTo(-2,0);g.lineTo(-8,12);g.closePath();g.fill();g.stroke();
    g.rotate(-a);g.font='bold 10px system-ui';g.textAlign='center';g.textBaseline='middle';g.lineWidth=3;g.strokeStyle='rgba(0,0,0,.7)';const s=(o?'💎':'🌼')+Math.round(d/10)+'ม.';g.strokeText(s,0,-20);g.fillStyle='#fff4d0';g.fillText(s,0,-20);g.restore()}}
setTimeout(()=>{try{
  /* จุดเก็บที่ใกล้ที่สุด: สายแร่ยักษ์มาก่อน (ระยะ 80) */
  const _gn=gtNear;gtNear=function(){const r=_gn.apply(this,arguments);try{if(me.cls&&run&&me.down<=0&&ov.hidden&&!SD.on){const N=ggNode();if(N&&Math.hypot(N.x-me.x,N.y-(me.y-6))<80)return N}}catch(e){}return r};
  const _gt=gtTick;gtTick=function(dt){_gt.apply(this,arguments);const b=$('gthb');if(!b)return;
    if(GTC&&GTC.mg){const show=!GTC.mg.done;if(b.hidden!==!show)b.hidden=!show;if(show){const tx='🎯 แตะตอนเข็มเข้าช่องทอง!';if(b.textContent!==tx)b.textContent=tx;b.classList.add('gwtap')}return}
    b.classList.remove('gwtap');if(!b.hidden){const n=gtNear();if(n&&n.gg){const tx=(n.k==='o'?'💎 ขุด':'🌼 เก็บ')+ggName(n.k)+' ('+GG.hp+'/'+GG.mx+')';if(b.textContent!==tx)b.textContent=tx}}};
  const _gd=gtDraw;gtDraw=function(){_gd.apply(this,arguments);try{ggDraw()}catch(e){}try{gwDrawMg()}catch(e){}};
  const _h=handleFx;handleFx=function(o){if(o&&typeof o.k==='string'&&o.k.startsWith('gg')&&(o.k==='ggs'||o.k==='ggh'||o.k==='ggd'||o.k==='ggx')){try{ggFx(o)}catch(e){}return}return _h.apply(this,arguments)};
  /* แตะปุ่มระหว่างเก็บ = ตัดสินจังหวะ (pointerdown ให้แม่นตามที่แตะจริง) */
  document.addEventListener('pointerdown',e=>{if(e.target&&e.target.id==='gthb'&&GTC&&GTC.mg&&!GTC.mg.done){e.preventDefault();e.stopPropagation();gwTap()}},true);
  document.addEventListener('click',e=>{if(e.target&&e.target.id==='gthb'&&(GTC||performance.now()<GW.blk)){e.stopPropagation();e.preventDefault()}},true);
  const st=document.createElement('style');st.textContent='#gthb.gwtap{background:linear-gradient(#8a6a1a,#4a3608)!important;border-color:#ffe27a!important;box-shadow:0 0 18px rgba(255,226,122,.7)!important;animation:gwP .6s ease-in-out infinite alternate}@keyframes gwP{to{transform:translateX(-50%) scale(1.06)}}';document.head.appendChild(st);
  setInterval(()=>{try{ggHostTick()}catch(e){}},1000);
}catch(e){console.warn('gw init',e)}},1200);
