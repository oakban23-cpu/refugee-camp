/* ---------- v565 ร้านฝันร้าย ----------
   · สกุลเงิน 🌙 เศษฝันร้าย (me.ngm.c): ผ่านฝันร้ายระดับ L ได้ L เศษ · ผ่านครั้งแรก (ดันนั้น ระดับนั้น) ได้ 3L
   · ย้อนหลังสำหรับคนที่ผ่านไปแล้วใน v564: 3L ต่อทุก «ดัน:ระดับ» ที่เคยผ่าน (ครั้งเดียว · me.ngm.rt)
   · รางวัลอันดับสัปดาห์ (สัปดาห์ก่อน · รับครั้งเดียว · me.ngm.r): 🥇 80 · 🥈 60 · 🥉 40 · อันดับ 4–10: 20
   · ร้าน: ชุดฝันร้าย (ตู้เสื้อผ้า + ออร่าหมอกฝันร้าย) · บากุจอมกินฝัน (สัตว์เลี้ยง) · อาชาฝันร้าย (พาหนะ) · สีย้อมหายาก · หินขั้นสูง · ด้าย · เศษดาว
   · ข้อมูลพาหนะ/สัตว์เลี้ยงใหม่ถูก push เข้า MOUNTS/PETS ตรงจุดประกาศ (ก่อน MT_N/PT_N) — ดู ux145a */
const NMMT=10,NMPT=15,NMRK=[80,60,40],NMRK10=20;
const nmWkOf=ts=>{const d=new Date(ts),k=(d.getDay()+6)%7,m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-k);return'n'+String(m.getFullYear()%100).padStart(2,'0')+String(m.getMonth()+1).padStart(2,'0')+String(m.getDate()).padStart(2,'0')};
const nmShards=()=>{try{nmEnsure();return me.ngm.c|0}catch(e){return 0}};
function nmShardAdd(n,src){if(!(n>0))return;nmEnsure();me.ngm.c=Math.min(99999,(me.ngm.c|0)+n);try{sysMsg('🌙 ได้เศษฝันร้าย +'+n+(src?' ('+src+')':'')+' · มี '+me.ngm.c)}catch(e){}}
const NMSH=[
  {id:'set',ic:'👗',n:'ชุดฝันร้าย',d:'ชุดแฟชั่นครบ 4 ชิ้น + ออร่า «หมอกฝันร้าย» · ใส่ที่ 🎒 อุปกรณ์ › 👗 ตู้เสื้อผ้า',p:250,own:()=>{try{return!!wdrSt().o.ngm}catch(e){return false}},buy:()=>wdrGive('ngm','ร้านฝันร้าย')},
  {id:'pet',ic:'🐾',n:'บากุจอมกินฝัน',d:'สัตว์เลี้ยง · ดาเมจ +4% · คริ +2% · HP +4% (แรงขึ้นตามเลเวลความผูกพัน)',p:400,own:()=>(me.pets||[]).includes(NMPT),buy:()=>petGive(NMPT)},
  {id:'mt',ic:'🐎',n:'อาชาฝันร้าย',d:'พาหนะ · ความเร็ว +72% · ขณะขี่ลดดาเมจที่ได้รับ 3%',p:600,own:()=>(me.mts||[]).includes(NMMT),buy:()=>{me.mts=me.mts||[];if(!me.mts.includes(NMMT))me.mts.push(NMMT);me.mt=NMMT;banner={s:'🐎 ได้พาหนะ «อาชาฝันร้าย» แล้ว! กดปุ่ม 🐎 เพื่อขี่',t:5}}},
  {id:'d5',ic:'⚫',n:'สีย้อมดำราตรี',d:'สีย้อมพิเศษ 1 ขวด',p:25,rep:1,buy:()=>dyAdd('d5',1)},
  {id:'d7',ic:'🟡',n:'สีย้อมทองคำ',d:'สีย้อมหายาก 1 ขวด',p:60,rep:1,buy:()=>dyAdd('d7',1)},
  {id:'d8',ic:'🌈',n:'สีย้อมรุ้งดาวตก',d:'สีย้อมหายาก 1 ขวด (สีเปลี่ยนวนไปเรื่อย ๆ)',p:120,rep:1,buy:()=>dyAdd('d8',1)},
  {id:'s3',ic:'💎',n:'หินขั้นสูง ×5',d:'ใช้ตีบวกอุปกรณ์',p:20,rep:1,buy:()=>{me.inv.s3=Math.min(999,(me.inv.s3|0)+5)}},
  {id:'th',ic:'✂️',n:'ด้ายแฟชั่น ×2',d:'ใช้แลกชุดแฟชั่นกิจกรรม',p:20,rep:1,buy:()=>wdrThread(2,'ร้านฝันร้าย')},
  {id:'sd',ic:'🌠',n:'เศษดาว ×10',d:'ใช้แลกออร่าเศษดาว',p:15,rep:1,buy:()=>sdGive(10,'ร้านฝันร้าย')}];
/* ชุดแฟชั่น: หน้าตาจากชุดเงา/หลังรอยแยก + ออร่าใหม่ 22 */
try{const O={id:'ngm',n:'ชุดฝันร้าย',e:'🌙',w:54,a:114,h:34,b:114,fa:22,s:'nm',d:'แลกด้วยเศษฝันร้าย (ร้านในหน้าโหมดฝันร้าย)'};if(!WDRM.ngm){WDR.push(O);WDRM.ngm=O}FAN[22]='หมอกฝันร้าย';WDRSN.nm='ร้านฝันร้าย'}catch(e){console.warn('nm wdr',e)}
function nmShopBuy(id){const it=NMSH.find(x=>x.id===id);if(!it||!me.cls)return;nmEnsure();if(!it.rep&&it.own())return nmShopUI('มีแล้ว');
  if((me.ngm.c|0)<it.p)return nmShopUI('เศษฝันร้ายไม่พอ (มี '+(me.ngm.c|0)+' · ต้องใช้ '+it.p+')');
  me.ngm.c-=it.p;try{it.buy()}catch(e){me.ngm.c+=it.p;console.warn('nm buy',e);return nmShopUI('แลกไม่สำเร็จ')}
  try{sfx('lvl')}catch(e){}try{burst(me.x,me.y-24,['#c9a8ff','#ffffff','#7a4ad8'],26,130,.9,{glow:1,g:-40})}catch(e){}try{writeSave()}catch(e){}nmShopUI('แลก '+it.ic+' '+it.n+' แล้ว · เหลือ 🌙 '+me.ngm.c)}
function nmShopUI(msg){if(!me.cls)return;nmEnsure();ov.dataset.k='nms';ov.hidden=false;const c=me.ngm.c|0;
  let h=hdr('🛒','ร้านฝันร้าย','🌙 เศษฝันร้าย '+c);if(msg)h+='<div class="note">'+msg+'</div>';
  h+='<div class="card hint">ได้เศษฝันร้ายจากการผ่านโหมดฝันร้าย: ระดับ L ได้ L เศษ · ผ่านครั้งแรก (ดันนั้น ระดับนั้น) ได้ 3 เท่า · อันดับสัปดาห์ที่แล้ว: 🥇 '+NMRK[0]+' · 🥈 '+NMRK[1]+' · 🥉 '+NMRK[2]+' · อันดับ 4–10: '+NMRK10+'</div>';
  h+='<div class="card">'+NMSH.map(it=>{const own=!it.rep&&it.own(),can=c>=it.p;
    const ico=it.id==='mt'?'<img src="'+mountIcon(NMMT)+'" style="width:52px;height:52px">':it.id==='pet'?'<img src="'+petIcon(NMPT)+'" style="width:52px;height:52px">':it.ic;
    return'<div class="sr nmsr"><div class="ico" style="width:52px;height:52px;font-size:26px">'+ico+'</div><div class="nm"><b>'+it.n+(own?' ✅':'')+'</b><small>'+it.d+'</small></div>'
      +(own?'<button disabled>มีแล้ว</button>':'<button class="pri" data-nmbuy="'+it.id+'"'+(can?'':' disabled')+'>🌙 '+it.p+'</button>')+'</div>'}).join('<hr>')+'</div>';
  h+='<div class="card"><button data-nmback="1" style="width:100%">‹ กลับหน้าโหมดฝันร้าย</button></div>';
  ov.innerHTML='<div class="pn" data-pn="nms">'+h+'</div>'}
/* รางวัลอันดับสัปดาห์ก่อน (อ่านจากกระดานเซิร์ฟเวอร์ที่เก็บไว้ 3 สัปดาห์) */
function nmWeekClaim(){try{if(!me.cls||!room||!room.url||typeof lbData==='undefined'||!lbData)return;nmEnsure();const pk=nmWkOf(Date.now()-7*864e5),N=me.ngm;if(N.r[pk])return;const rows=lbData[pk];if(!Array.isArray(rows))return;
  N.r[pk]=1;const ks=Object.keys(N.r).sort();while(ks.length>4)delete N.r[ks.shift()];
  const i=rows.findIndex(r=>r[0]===myName&&r[1]===me.cls);if(i<0||i>=10){try{writeSave()}catch(e){}return}const n=i<3?NMRK[i]:NMRK10;
  nmShardAdd(n,'อันดับ '+(i+1)+' ฝันร้ายสัปดาห์ที่แล้ว');banner={s:'🌙 รางวัลอันดับ '+(i+1)+' ฝันร้ายสัปดาห์ที่แล้ว · เศษฝันร้าย +'+n,t:6};try{sfx('lvl')}catch(e){}try{writeSave()}catch(e){}}catch(e){}}
setInterval(nmWeekClaim,20000);
/* ภาพ: ออร่า 22 «หมอกฝันร้าย» (หลังตัว = หมอกม่วงลอยขึ้น · หน้าตัว = ประกายลาเวนเดอร์ + ดวงตาในหมอกกะพริบ) */
function ngAura(x,y,t,ph,full){const n=LOWQ&&!full?.5:1,fy=y+15,N=k=>Math.max(2,Math.round(k*n)),fr=(i,k)=>{const s=Math.sin(i*127.1+k*311.7)*43758.5;return s-Math.floor(s)};g.save();
  if(!ph){const gr=g.createRadialGradient(x,fy-2,2,x,fy-2,26);gr.addColorStop(0,'rgba(70,30,120,.42)');gr.addColorStop(1,'rgba(40,10,70,0)');g.fillStyle=gr;g.beginPath();g.ellipse(x,fy-2,26,9,0,0,7);g.fill();
    for(let i=0;i<N(7);i++){const q=(t*.32+i/7)%1,a=Math.sin(q*Math.PI),px=x+(fr(i,2)-.5)*30+Math.sin(t*1.6+i*1.7)*4,py=fy-4-q*46,r=5+q*9;
      g.fillStyle='rgba('+(46+i*6)+',20,'+(78+i*8)+','+(.32*a)+')';g.beginPath();g.arc(px,py,r,0,7);g.fill()}
    const bl=(t*.23)%1;if(bl<.5){const ex=x+Math.sin(Math.floor(t*.23)*2.3)*16,ey=fy-30-Math.cos(Math.floor(t*.23)*1.7)*6,op=Math.sin(bl/.5*Math.PI),sq=Math.abs(Math.sin(t*7))<.12?.25:1;
      g.save();g.globalCompositeOperation='lighter';for(const s of[-1,1]){glowAt(ex+s*3.2,ey,5,'200,140,255',.5*op);g.fillStyle='rgba(235,210,255,'+(.95*op)+')';g.beginPath();g.ellipse(ex+s*3.2,ey,1.6,1.6*sq,0,0,7);g.fill()}g.restore()}}
  else{g.globalCompositeOperation='lighter';for(let i=0;i<N(6);i++){const q=(t*.5+i/6)%1,a=Math.sin(q*Math.PI),px=x+Math.sin(i*2.4+t*1.1)*15,py=fy-6-q*40;glowAt(px,py,5,'170,110,255',.45*a);g.fillStyle='rgba(230,210,255,'+(.85*a)+')';g.fillRect(px-.8,py-.8,1.6,1.6)}}
  g.restore()}
/* ภาพ: บากุจอมกินฝัน (สัตว์กินฝันร้ายในตำนาน · ลอย) — พิกัดท้องถิ่นของ drawPet: หันขวา เท้าที่ y=0 */
function nmBaku(t,mv,E,Pg,O){const oy=-15+Math.sin(t*2.2)*2.2,lg=Math.sin(t*(mv?12:4))*1.2,tr=Math.sin(t*1.8)*.18;
  g.save();g.globalCompositeOperation='lighter';glowAt(0,oy,16,'150,100,255',.22);g.restore();
  /* หางหมอก */g.strokeStyle='rgba(150,110,230,.55)';g.lineWidth=2.4;g.beginPath();g.moveTo(-8,oy-1);g.quadraticCurveTo(-13,oy-6+Math.sin(t*3)*2,-15,oy-2);g.stroke();
  /* ขา */for(const[lx,k]of[[-5,0],[-1.5,1],[3,2],[6,3]]){const d=Math.sin(t*(mv?12:3)+k*1.6)*(mv?1.3:.5);E(lx+d*.3,oy+5.6+Math.abs(d)*.4,1.7,2.4,k%2?'#4a3488':'#5a40a0',1)}
  /* ตัว */E(-1,oy,9,6.4,'#6a4cb8',1);E(-1,oy+2.2,6.6,3.4,'#9a80e0',0);
  /* ลายดาวบนหลัง */for(const[sx,sy,r]of[[-5,oy-3.2,1.7],[-1,oy-4.6,1.3],[2.6,oy-3.4,1.1]]){g.fillStyle='#fff3b0';g.beginPath();g.moveTo(sx,sy-r);g.lineTo(sx+r*.3,sy-r*.3);g.lineTo(sx+r,sy);g.lineTo(sx+r*.3,sy+r*.3);g.lineTo(sx,sy+r);g.lineTo(sx-r*.3,sy+r*.3);g.lineTo(sx-r,sy);g.lineTo(sx-r*.3,sy-r*.3);g.closePath();g.fill()}
  /* หัว + งวง */g.save();g.translate(7,oy-2.2);g.rotate(tr*.4);E(0,0,5.2,4.6,'#7254c4',1);E(-1.4,-4,1.8,2.6,'#5a40a0',1,-.4);E(-1.4,-3.8,.8,1.5,'#c9a8ff',0,-.4);
  g.strokeStyle=O;g.lineWidth=3.4;g.lineCap='round';g.beginPath();g.moveTo(4,.6);g.quadraticCurveTo(7.6,1.8+tr*3,7.2,5.2+tr*4);g.stroke();g.strokeStyle='#7254c4';g.lineWidth=2.2;g.stroke();
  /* ตาง่วง (กะพริบ) */const bl=Math.abs(Math.sin(t*.9))>.97;g.strokeStyle=O;g.lineWidth=.9;if(bl){g.beginPath();g.moveTo(.4,-1);g.lineTo(2.6,-1);g.stroke()}else{E(1.5,-1.1,1.25,1.25,'#fff',0);E(1.8,-1,.7,.75,'#2a1450',0);g.beginPath();g.arc(1.5,-1.4,1.5,Math.PI*1.1,Math.PI*1.9);g.stroke()}
  E(3.2,1.6,1,.6,'rgba(255,150,200,.6)',0);g.restore();
  /* หมวกนอนจันทร์เสี้ยว */g.save();g.translate(6,oy-7);g.rotate(-.3+tr*.3);Pg([-3,0,4,0,-1,-6.5],'#3a2a78',1);E(-1,-6.6,1.2,1.2,'#fff3b0',0);g.restore();
  /* ฝันร้ายที่โดนกิน: ควันดำเล็ก ๆ ถูกดูดเข้างวงเป็นระยะ */const q=(t*.45)%1;if(q<.6){const p=q/.6;g.fillStyle='rgba(40,20,60,'+(.55*(1-p))+')';g.beginPath();g.arc(20-p*5.6,oy+4.5-p*1.5,2.4*(1-p*.6),0,7);g.fill()}}
/* ภาพ: อาชาฝันร้าย = โครงอาชาเพลิงนรก (6) ย้อมม่วงด้วย filter (เบราว์เซอร์ที่ไม่รองรับ → ทับสีม่วง) + หมอกที่กีบ + ตาเรือง */
function nmHorse(f,x,y,fx,ph,t,sc){const S=sc||1;g.save();if(DYFOK)g.filter='hue-rotate(228deg) saturate(1.35) brightness(.92)';f(6,x,y,fx,ph,t,sc);g.restore();
  g.save();g.translate(x,y);g.scale(fx*S,S);g.globalCompositeOperation='lighter';
  if(!DYFOK){g.globalCompositeOperation='color';g.fillStyle='rgba(120,70,220,.6)';g.beginPath();g.ellipse(0,-2,22,14,0,0,7);g.fill();g.globalCompositeOperation='lighter'}
  for(let i=0;i<5;i++){const q=(t*.7+i/5)%1,a=Math.sin(q*Math.PI);g.fillStyle='rgba(130,80,220,'+(.28*a)+')';g.beginPath();g.arc(-14+i*7+Math.sin(t*2+i)*2,15-q*7,3+q*4,0,7);g.fill()}
  glowAt(24.5,-8,5,'210,150,255',.75);g.fillStyle='#f4e8ff';g.beginPath();g.arc(24.8,-8,1.1,0,7);g.fill();g.restore()}
setTimeout(()=>{
  try{const _ne=nmEnsure;window.nmEnsure=nmEnsure=function(){_ne.apply(this,arguments);const N=me.ngm;if(N){N.c=Math.max(0,N.c|0);if(!N.r||typeof N.r!=='object')N.r={}}}}catch(e){}
  try{const _nc=nmClean;window.nmClean=nmClean=function(o){const r=_nc(o);if(r&&o){r.c=Math.max(0,Math.min(99999,o.c|0));r.rt=o.rt?1:0;r.r={};if(o.r&&typeof o.r==='object')Object.keys(o.r).filter(k=>/^n\d{6}$/.test(k)).sort().slice(-4).forEach(k=>r.r[k]=1)}return r}}catch(e){}
  try{const _cl=nmClear;window.nmClear=nmClear=function(){const k=NFC&&NFC.key,L=NFC&&NFC.L;let first=false;try{nmEnsure();first=!!k&&!me.ngm.f[k+':'+L]}catch(e){}const r=_cl.apply(this,arguments);
    try{if(k&&L){const n=first?3*L:L;nmShardAdd(n,first?'ผ่านครั้งแรก ระดับ '+L:'ผ่านระดับ '+L);try{writeSave()}catch(e){}}}catch(e){}return r}}catch(e){}
  try{const _as=applySave;window.applySave=applySave=function(c){const r=_as.apply(this,arguments);try{nmEnsure();const N=me.ngm;if(!N.rt){N.rt=1;let s=0;for(const k in N.f){const L=+k.split(':')[1]|0;if(L>0)s+=3*L}
      if(s>0){N.c=(N.c|0)+s;setTimeout(()=>{try{sysMsg('🌙 เปิดร้านฝันร้ายแล้ว! ได้เศษฝันร้ายย้อนหลัง +'+s+' จากด่านฝันร้ายที่เคยผ่าน · แลกของได้ที่หน้าโหมดฝันร้าย');banner={s:'🌙 ได้เศษฝันร้ายย้อนหลัง +'+s+' · เปิดร้านในหน้าโหมดฝันร้าย',t:6}}catch(e){}},2500)}}}catch(e){}return r}}catch(e){}
  try{const _nu=nmUI;window.nmUI=nmUI=function(){const r=_nu.apply(this,arguments);try{nmWeekClaim();const c=me.ngm.c|0,f=ov.querySelector('.pn .card');
      if(f)f.insertAdjacentHTML('beforebegin','<div class="card nmshop" style="border-color:rgba(170,120,255,.6);background:linear-gradient(135deg,rgba(60,24,100,.35),rgba(20,10,40,.15))"><div class="sr"><div class="ico" style="font-size:24px">🛒</div><div class="nm"><b>🌙 เศษฝันร้าย '+c+'</b><small>แลกชุด · สัตว์เลี้ยง · พาหนะฝันร้าย และของใช้ที่ร้าน · ผ่านระดับ L ได้ L เศษ (ครั้งแรก ×3)</small></div><button class="pri" data-nmshop="1">ร้าน</button></div></div>')}catch(e){}return r}}catch(e){}
  ov.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');if(!b||!me.cls)return;
    if(b.dataset.nmshop&&ov.dataset.k==='nm'){e.stopPropagation();nmShopUI();return}
    if(ov.dataset.k!=='nms')return;
    if(b.dataset.nmbuy){e.stopPropagation();nmShopBuy(b.dataset.nmbuy);return}
    if(b.dataset.nmback){e.stopPropagation();nmUI();return}},true);
  /* ภาพ */
  try{const _wa=wdrAura;window.wdrAura=wdrAura=function(id,x,y,t,ph,full){if(id===22)return ngAura(x,y,t,ph,full);return _wa.apply(this,arguments)}}catch(e){}
  try{const _va=vpArt;window.vpArt=vpArt=function(id,t,mv,E,Pg,O){if(id===NMPT)return nmBaku(t,mv,E,Pg,O);return _va.apply(this,arguments)}}catch(e){}
},80);
setTimeout(()=>{
  try{const _dm=drawMount;window.drawMount=drawMount=function(id,x,y,fx,ph,t,sc){if(id===NMMT)return nmHorse(_dm,x,y,fx,ph,t,sc);return _dm.apply(this,arguments)}}catch(e){}
  try{const _mb=mountBuy;window.mountBuy=mountBuy=function(id){if(id===NMMT)return mountUI('🌙 อาชาฝันร้ายแลกได้ที่ร้านฝันร้าย (📅 กิจกรรม › สัปดาห์ › โหมดฝันร้าย)');return _mb.apply(this,arguments)}}catch(e){}
  try{const _mu=mountUI;window.mountUI=mountUI=function(){const r=_mu.apply(this,arguments);try{ov.querySelectorAll('button[data-mtb="'+NMMT+'"]').forEach(b=>{b.disabled=true;b.removeAttribute('data-mtb');b.textContent='🌙 ร้านฝันร้าย'})}catch(e){}return r}}catch(e){}
},900);
