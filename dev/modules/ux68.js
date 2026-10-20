/* ===== v454 · บ้านกิลด์ รอบ 3 — ป้องกันเมือง: กำแพง/ประตู · ช่องป้อม 4 แบบ · ค่ายทหาร 3 แบบ =====
   - กำแพงเมือง/ประตูเมือง Lv1–10 (เพดาน = ขั้นบ้าน×2) · ใช้ทองจากคลัง + 🪵 ไม้ตั้งแต่ Lv5 · ขยายบ้านขั้นถัดไปต้องอัปทั้งคู่ถึง Lv ขั้นปัจจุบัน×2
   - ช่องป้อม (ขั้น 2–5 = 2/4/6/8 ช่อง) วางป้อม 🏹 ธนู / 🔥 เวทไฟ / ❄️ น้ำแข็ง / 🪨 หินยักษ์ · อัป Lv1–5 (Lv3+ ใช้ไม้) · รื้อเปลี่ยนแบบได้
   - ค่ายทหาร (ขั้น 2–5 = 4/8/12/16 นาย) 🛡️ ทหารหอก / 🏹 นักธนู (ขั้น 2) / ✨ นักบวช (ขั้น 4) · จ้างครั้งเดียวอยู่ถาวร (ตายในศึกต้องจ้างใหม่ · รอบ 4)
   - หัวหน้า/รองเป็นคนสั่ง ใช้เงินในคลังกิลด์ · ทุกการใช้เงินลงประวัติคลัง */
const GHTW={ar:['🏹','ป้อมธนู','ยิงทีละตัว ระยะไกล',l=>'ดาเมจ '+(120*l).toLocaleString()+' · ระยะ 380 · 1 นัด/วิ'],fi:['🔥','ป้อมเวทไฟ','ระเบิดเป็นวง โดนหลายตัว',l=>'ดาเมจวง '+(80*l).toLocaleString()+' · รัศมี 80 · ทุก 1.6 วิ'],
  ic:['❄️','ป้อมน้ำแข็ง','ทำให้มอนช้าลง',l=>'ช้าลง '+(25+5*l)+'% · ดาเมจ '+(30*l)+' · ระยะ 300'],ca:['🪨','ป้อมหินยักษ์','แรงมาก ยิงช้า เหมาะยิงบอส',l=>'ดาเมจ '+(500*l).toLocaleString()+' · ระยะ 520 · ทุก 4 วิ']};
const GHSO={sp:['🛡️','ทหารหอก','ยืนรับหน้าประตู · เลือดหนา',2],ar:['🏹','นักธนู','ยิงจากแนวกำแพง',2],pr:['✨','นักบวช','ฮีลทหารและผู้เล่น',4]};
const GHTS=[[-330,-432],[330,-432],[-300,398],[300,398],[-575,-205],[575,70],[-575,330],[575,210]],GHBR={x:-450,y:262};
const GHSP={sp:[[-58,372],[58,372],[-150,-258],[150,-258],[-60,300],[60,300],[-250,40],[250,40],[-160,394],[160,394],[-250,-150],[250,-150],[-60,200],[60,200],[-330,150],[330,150]],
  ar:[[-214,424],[214,424],[-450,-486],[450,-486],[-600,60],[600,-40],[-276,424],[276,424],[-520,-486],[520,-486],[-600,180],[600,150],[-300,-486],[300,-486],[-600,-60],[600,250]], /* v464: นักธนูยืนบนเชิงเทิน */
  pr:[[-395,266],[-505,266],[-90,92],[90,92],[-450,300],[-340,200],[-130,40],[130,40],[-560,250],[-380,320],[0,160],[-200,250],[200,250],[-80,-200],[80,-200],[0,-160]]};
const GH3={cf:''};
const ghCostTx=C=>C?'💰 '+ghF(C.g)+(C.w?' + 🪵 '+C.w:''):'';
const ghCanPay=(H,C)=>!!C&&(H.f|0)>=C.g&&((H.st&&H.st.wood)|0)>=(C.w|0);
/* ---------- หน้าต่าง: แท็บป้อม ---------- */
function ghDefBody(G,H,t,col){let h='';const r1=G.r>=1,cap=t*2,N=[0,0,2,4,6,8][t];
  h+='<div class="card hint" style="font-size:12px;text-align:left">🛡️ เตรียมป้องกันเมืองไว้ก่อน · <b>ศึกมอนบุกจะเปิดในรอบถัดไป</b> · ใช้ทองจากคลังกิลด์ (มี '+(H.f|0).toLocaleString()+') + 🪵 ไม้ในโกดัง (มี '+((H.st&&H.st.wood)|0)+')'+(r1?'':' · หัวหน้า/รองเป็นคนสั่ง')+'</div>';
  [['wall','🧱','กำแพงเมือง',H.wl|0,H.cw,n=>'ทนทาน '+(2000*n).toLocaleString()],['gate','🚪','ประตูเมือง',H.gl|0,H.cg,n=>'ทนทาน '+(3000*n).toLocaleString()+(n>=5?' · สะท้อนดาเมจ '+(2*(n-4))+'%':' · Lv5 ขึ้นไปสะท้อนดาเมจ')]].forEach(([k,ic,nm,lv,C,tx])=>{
    const max=lv>=10,lock=lv>=cap;
    h+='<div class="card" style="text-align:left"><div style="display:flex;align-items:center;gap:8px"><span style="font-size:28px">'+ic+'</span><div style="flex:1;min-width:0"><b>'+nm+' Lv '+lv+'/10</b><small style="display:block;opacity:.8">'+tx(lv)+' · บ้านขั้น '+t+' อัปได้ถึง Lv '+cap+'</small></div></div>'+gdBar(lv,10,'#c8a870')+
      (max?'<b style="color:#9fe89f">สูงสุดแล้ว</b>':lock?'<small style="opacity:.7">ขยายบ้านขั้นถัดไปเพื่ออัปต่อ</small>':r1?'<button class="pri" data-gh2="du:'+k+':'+lv+'" style="margin-top:4px"'+(ghCanPay(H,C)?'':' disabled')+'>⬆️ อัปเป็น Lv '+(lv+1)+' · '+ghCostTx(C)+'</button>':'<small style="opacity:.7">อัปครั้งถัดไป: '+ghCostTx(C)+'</small>')+'</div>'});
  h+='<div class="card" style="text-align:left"><div class="cap">🏹 ช่องป้อม '+N+'/8</div>';
  for(let i=0;i<8;i++){const T=(H.tw||[])[i];
    if(i>=N){h+='<div class="qr" style="opacity:.5"><div class="ico">🔒</div><div class="nm"><b>ช่อง '+(i+1)+'</b><small>เปิดเมื่อบ้านขั้น '+(2+(i>>1))+'</small></div></div>';continue}
    if(!T){h+='<div class="qr"><div class="ico">⬜</div><div class="nm"><b>ช่อง '+(i+1)+' · ว่าง</b>'+(r1?'<div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:3px">'+Object.keys(GHTW).map(k=>{const C=H.ctb&&H.ctb[k];return'<button data-gh2="tb:'+i+':'+k+'" style="font-size:11.5px;padding:3px 6px"'+(ghCanPay(H,C)?'':' disabled')+'>'+GHTW[k][0]+' '+GHTW[k][1]+' <small>'+ghCostTx(C)+'</small></button>'}).join('')+'</div>':'<small>ยังไม่มีป้อม</small>')+'</div></div>';continue}
    const W=GHTW[T.k]||GHTW.ar,cf=GH3.cf==='tx:'+i;
    h+='<div class="qr"><div class="ico">'+W[0]+'</div><div class="nm"><b>ช่อง '+(i+1)+' · '+W[1]+' Lv '+T.lv+' '+'★'.repeat(T.lv)+'</b><small>'+W[2]+' · '+W[3](T.lv)+'</small>'+
      (r1?'<div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:3px">'+(T.lv<5?'<button class="pri" data-gh2="tu:'+i+':'+T.lv+'" style="font-size:11.5px;padding:3px 8px"'+(ghCanPay(H,T.cu)?'':' disabled')+'>⬆️ Lv '+(T.lv+1)+' · '+ghCostTx(T.cu)+'</button>':'<small style="color:#9fe89f">สูงสุดแล้ว</small>')+
      '<button data-gh2="tx:'+i+'" style="font-size:11px;padding:3px 6px">'+(cf?'⚠️ ยืนยันรื้อ (ไม่คืนเงิน)':'รื้อ')+'</button></div>':'')+'</div></div>'}
  h+='</div>';
  const S=H.sol||{},tot=(S.sp|0)+(S.ar|0)+(S.pr|0),sc=H.scap|0;
  h+='<div class="card" style="text-align:left"><div class="cap">⚔️ ค่ายทหาร '+tot+'/'+sc+' นาย</div>'+(sc?'':'<small style="opacity:.75">เปิดเมื่อบ้านขั้น 2</small>');
  Object.keys(GHSO).forEach(k=>{const O=GHSO[k],C=H.cs&&H.cs[k],lk=t<O[3],n=S[k]|0,cf=GH3.cf==='sd:'+k;
    h+='<div class="qr"'+(lk?' style="opacity:.55"':'')+'><div class="ico">'+O[0]+'</div><div class="nm"><b>'+O[1]+' ×'+n+'</b><small>'+O[2]+' · ค่าจ้าง '+(C?ghF(C.g):'-')+' ทอง (ครั้งเดียว อยู่ถาวร)'+(lk?' · ต้องบ้านขั้น '+O[3]:'')+'</small>'+
      (r1&&!lk?'<div style="display:flex;gap:3px;margin-top:3px"><button class="pri" data-gh2="sh:'+k+'" style="font-size:11.5px;padding:3px 8px"'+(tot<sc&&C&&(H.f|0)>=C.g?'':' disabled')+'>➕ จ้าง</button>'+(n?'<button data-gh2="sd:'+k+'" style="font-size:11px;padding:3px 6px">'+(cf?'⚠️ ยืนยันปลด':'ปลด 1 นาย')+'</button>':'')+'</div>':'')+'</div></div>'});
  h+='<small style="opacity:.7">ทหารที่ตายในศึกต้องจ้างใหม่ (ศึกเปิดรอบถัดไป)</small></div>';
  return h}
ghBody2=(f=>function(TB,G,H,t,col){if(TB==='def')return ghDefBody(G,H,t,col);return f.apply(this,arguments)})(ghBody2);
ghAct2=(f=>function(a){const p=a.split(':'),op=p[0];
  if(op==='du'){gdEmit('hwu',{w:p[1],lv:+p[2]});return}
  if(op==='tb'){gdEmit('htb',{s:+p[1],k:p[2]});return}
  if(op==='tu'){gdEmit('htu',{s:+p[1],lv:+p[2]});return}
  if(op==='tx'||op==='sd'){const k=op+':'+p[1];if(GH3.cf!==k){GH3.cf=k;ghUI();return}GH3.cf='';if(op==='tx')gdEmit('htx',{s:+p[1]});else gdEmit('hsd',{k:p[1]});return}
  if(op==='sh'){gdEmit('hsh',{k:p[1]});return}
  return f.apply(this,arguments)})(ghAct2);
/* ---------- วาดป้อม + ทหาร ---------- */
function ghTower(x,y,k,lv,t,now,i){const O='#1a120a',st=t>=3;g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(x,y+3,22,7,0,0,7);g.fill();
  let bh=26+lv*3;const GQT=GHS.hd&&typeof GQI!=='undefined'&&GQI.ok===1&&GQI.img,HDT=GQT||(st&&GHS.hd&&typeof FHI!=='undefined'&&FHI.ok===1);if(GQT){const K=t<=2?'tw1':t===3?'tw3':'tw4',q=GQD.f[K],w=(t===3?44:t<=2?42:38)+lv*3,h=w*q[3]/q[2];g.drawImage(GQI.img,q[0],q[1],q[2],q[3],x-w/2,y-h,w,h);bh=h-(t===3?4:t<=2?8:2)}else if(HDT){const q=FHD.f.tower,w=44+lv*3,h=w*q[3]/q[2];g.drawImage(FHI.img,q[0],q[1],q[2],q[3],x-w/2,y-h,w,h);bh=h-14}else if(st){g.fillStyle=t===5?'#d8cfb8':'#8c8676';g.fillRect(x-16,y-bh,32,bh);g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=1;for(let yy=y-bh+8;yy<y;yy+=8){g.beginPath();g.moveTo(x-16,yy);g.lineTo(x+16,yy);g.stroke()}g.strokeStyle=O;g.strokeRect(x-16,y-bh,32,bh);g.fillStyle=t===5?'#ece4d0':'#a8a292';g.fillRect(x-19,y-bh-6,38,7);g.strokeRect(x-19,y-bh-6,38,7)}
  else{g.fillStyle='#5a3a1e';[[-13],[9]].forEach(([a])=>g.fillRect(x+a,y-bh,4,bh));g.strokeStyle='#4a3018';g.lineWidth=2;g.beginPath();g.moveTo(x-12,y-4);g.lineTo(x+12,y-bh+4);g.moveTo(x+12,y-4);g.lineTo(x-12,y-bh+4);g.stroke();g.fillStyle='#8a6038';g.fillRect(x-19,y-bh-6,38,7);g.strokeStyle=O;g.lineWidth=.8;g.strokeRect(x-19,y-bh-6,38,7)}
  const ty=HDT?y-bh:y-bh-6;
  if(k==='ar'){g.strokeStyle='#5a3a1e';g.lineWidth=2.4;g.beginPath();g.arc(x,ty-8,13,Math.PI*1.15,Math.PI*1.85);g.stroke();g.strokeStyle='#e8e0cc';g.lineWidth=.8;g.beginPath();g.moveTo(x-11,ty-14);g.lineTo(x+11,ty-14);g.stroke();g.fillStyle='#7a5232';g.fillRect(x-1.5,ty-24,3,22);g.fillStyle='#d8dde0';g.beginPath();g.moveTo(x,ty-30);g.lineTo(x-3,ty-23);g.lineTo(x+3,ty-23);g.closePath();g.fill();
    g.fillStyle='#c84a3a';g.beginPath();g.moveTo(x+14,ty-4);g.lineTo(x+14,ty-26);g.lineTo(x+26+Math.sin(now*3+i)*2,ty-22);g.lineTo(x+14,ty-18);g.fill()}
  else if(k==='fi'){g.fillStyle='#3a3a42';g.beginPath();g.moveTo(x-12,ty);g.lineTo(x+12,ty);g.lineTo(x+8,ty-10);g.lineTo(x-8,ty-10);g.closePath();g.fill();g.strokeStyle=O;g.stroke();g.globalCompositeOperation='lighter';glowAt(x,ty-18,34+lv*3,'255,120,40',.5+.15*Math.sin(now*8+i));g.globalCompositeOperation='source-over';
    for(let q=0;q<3;q++){const f=Math.sin(now*10+q*2+i)*2;g.fillStyle=['#ff5a20','#ffa040','#ffe070'][q];g.beginPath();g.moveTo(x-9+q*3,ty-10);g.quadraticCurveTo(x+f,ty-30-lv*2+q*5,x+9-q*3,ty-10);g.fill()}}
  else if(k==='ic'){const b=Math.sin(now*2+i)*3;g.globalCompositeOperation='lighter';glowAt(x,ty-20+b,30+lv*3,'140,220,255',.45);g.globalCompositeOperation='source-over';g.fillStyle='#bfe8ff';g.beginPath();g.moveTo(x,ty-38+b);g.lineTo(x+9,ty-20+b);g.lineTo(x,ty-6+b);g.lineTo(x-9,ty-20+b);g.closePath();g.fill();g.strokeStyle='#4a8ab8';g.lineWidth=1;g.stroke();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.moveTo(x,ty-36+b);g.lineTo(x+3,ty-20+b);g.lineTo(x,ty-12+b);g.closePath();g.fill();
    for(let q=0;q<4;q++){const a=now*1.5+q*1.57;g.fillStyle='rgba(220,245,255,.8)';g.fillRect(x+Math.cos(a)*16-1,ty-20+b+Math.sin(a)*6-1,2,2)}}
  else{const sw=Math.sin(now*1.2+i)*.25;g.fillStyle='#5a3a1e';g.fillRect(x-14,ty-6,28,6);g.strokeStyle=O;g.lineWidth=.8;g.strokeRect(x-14,ty-6,28,6);g.fillStyle='#3a2a1a';g.beginPath();g.arc(x-10,ty,4,0,7);g.arc(x+10,ty,4,0,7);g.fill();
    g.save();g.translate(x,ty-8);g.rotate(-.9+sw);g.fillStyle='#7a5232';g.fillRect(-2,-26,4,28);g.fillStyle='#8a8478';g.beginPath();g.arc(0,-28,6,0,7);g.fill();g.strokeStyle=O;g.stroke();g.restore()}
  g.font='bold 8px system-ui';g.textAlign='center';g.fillStyle='#ffd84a';g.fillText('★'.repeat(lv),x,y+12)}
function ghSolList(H,now){const X=1600,Y=1600,S=H.sol||{},L=[];['sp','ar','pr'].forEach(k=>{const n=Math.min(16,S[k]|0);for(let i=0;i<n;i++){const P=GHSP[k][i];if(!P)continue;const px=X+P[0],py=Y+P[1],pat=k==='sp'&&i>=4,dx=pat?Math.sin(now*.45+i*1.7)*34:0,v=pat?Math.cos(now*.45+i*1.7):0;
    L.push({k,i,x:px+dx,y:py,px,mx:pat?v*6:null,fx:pat?(v<0?-1:1):(k==='ar'?(P[0]<0?1:-1):(P[0]<0?1:-1))})}});return L}
function ghDraw3(t,now){const H=GDS.g&&GDS.g.hq;if(!H)return;const X=1600,Y=1600,N=[0,0,2,4,6,8][t];
  for(let i=0;i<N;i++){const[a,b]=GHTS[i],x=X+a,y=Y+b;if(!inView(x,y-40,90))continue;const T=(H.tw||[])[i];
    if(T)ghTower(x,y,T.k,T.lv,t,now,i);else{g.save();g.strokeStyle='rgba(255,230,170,.55)';g.lineWidth=1.5;g.setLineDash([5,5]);g.lineDashOffset=-now*8;g.beginPath();g.ellipse(x,y,20,9,0,0,7);g.stroke();g.setLineDash([]);g.font='bold 14px system-ui';g.textAlign='center';g.fillStyle='rgba(255,230,170,.7)';g.fillText('+',x,y+5);
      if(Math.hypot(me.x-x,me.y-y)<160){g.font='9px system-ui';g.fillText('ช่องป้อม '+(i+1),x,y-14)}g.restore()}}
  ghSolList(H,now).forEach(o=>{const{k,x,i,px}=o;let y=o.y,WR=null;try{WR=ghWReg(x-1600,y-1600,t);if(WR)y-=WR.l}catch(e){}if(!inView(x,y-20,60))return;g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(x,y+13,9,3.5,0,0,7);g.fill();g.save();g.translate(x,y);
    try{if(k==='sp')drawKnight({x,y,px:o.mx!=null?x-o.mx:x,py:y,gd:o.fx<0?2:0});else if(k==='ar')drawFortArcher({x,y,aimX:x+(o.fx<0?-60:60),shT:o.sh||0});else{g.scale(.85,.85);drawChar(0,0,'sup',o.fx<0?-1:1,0,0,now+i,0)}}catch(e){}g.restore();
    if(o.hp!=null&&o.hp<100){g.fillStyle='#000';g.fillRect(x-10,y-38,20,3);g.fillStyle='#6fd06a';g.fillRect(x-10,y-38,20*o.hp/100,3)}
    if(k==='pr'){g.globalCompositeOperation='lighter';glowAt(x,y-30,14,'255,236,170',.25+.1*Math.sin(now*2+i));g.globalCompositeOperation='source-over'}
    if(WR&&WR.k==='s'){try{ghParPatch(x,t)}catch(e){}}});
}
ghDraw2=(f=>function(t,col,now){const r=f.apply(this,arguments);try{ghDraw3(t,now)}catch(e){}return r})(ghDraw2);
/* กันชนป้อมที่สร้างแล้ว */
ghCols=(f=>function(){const L=f.apply(this,arguments);try{const H=GDS.g&&GDS.g.hq;(H&&H.tw||[]).forEach((T,i)=>{if(T&&GHTS[i])L.push([GHTS[i][0],GHTS[i][1]-4,18])})}catch(e){}return L})(ghCols);
/* ปุ่ม: ค่ายทหาร / ช่องป้อม */
tentTick=(f=>function(){const r=f.apply(this,arguments);try{const b=$('tnb');if(!b||!b.hidden||!ghHere()||!me.cls||!run||me.down>0||!ov.hidden||SD.on)return r;const X=1600,Y=1600,t=ghT();let tx='';
  if(Math.hypot(me.x-(X+GHBR.x),me.y-(Y+GHBR.y))<70){tx='⚔️ ค่ายทหาร';GHS.near='bar'}
  else{const N=[0,0,2,4,6,8][t];for(let i=0;i<N;i++){const[a,c]=GHTS[i];if(Math.hypot(me.x-(X+a),me.y-(Y+c))<58){tx='🏹 ช่องป้อม '+(i+1);GHS.near='tw';break}}}
  if(tx){b.hidden=false;if(b.textContent!==tx)b.textContent=tx;b.dataset.f='gh'}}catch(e){}return r})(tentTick);
tentBtn=(f=>function(){const b=$('tnb');if(b&&b.dataset.f==='gh'&&(GHS.near==='bar'||GHS.near==='tw')){try{sfx('click')}catch(e){}GHS.tab='def';GHS.cf=0;GH3.cf='';ghUI();gdEmit('q');return}return f.apply(this,arguments)})(tentBtn);
/* แจ้งเตือน */
gdN=(f=>function(d){try{if(d&&d.t==='hdf'){const G=GDS.g,tg=G?'🏰['+G.tag+'] ':'🏰 ';try{sysMsg(tg+'🛠️ '+d.n+': '+d.s)}catch(e){}if(ov.dataset.k==='gh'&&!ov.hidden)ghUI('🛠️ '+esc(d.n)+': '+esc(d.s));else banner={s:'🛠️ '+d.n+': '+d.s,t:3.5};try{sfx('up')}catch(e){}return}}catch(e){}return f.apply(this,arguments)})(gdN);
