/* ===== v453 · บ้านกิลด์ รอบ 2 — ฟาร์ม · สวนผลไม้ · โกดัง · ครัวกิลด์ · แจกเสบียง · ร้านกิลด์ =====
   - แปลงผัก (ขั้น 1–5 = 2/4/6/8/10 แปลง): ใครในกิลด์ก็ปลูกได้ · โตตามเวลาจริง · รดน้ำแปลงละ 3 ครั้ง (คนละครั้ง) ครั้งละเร็วขึ้น 10% · เก็บเกี่ยว → โกดัง + แต้มกิลด์ 1
   - สวนผลไม้ (ขั้น 3/4/5 = 2/4/6 ต้น): ต้นโอ๊ก → ไม้ ทุก 48 ชม. · ต้นแอปเปิล → แอปเปิล ทุก 24 ชม. · สะสมได้ 2 รอบ
   - ครัวกิลด์: หัวหน้า/รองใช้ของในโกดังทำอาหาร → บัฟทั้งกิลด์ 1 ชม. (ทีละอย่าง ทำใหม่ = แทนของเดิม)
   - แจกเสบียง: หัวหน้า/รองส่งของในโกดังให้สมาชิก → สมาชิกกดรับ ได้ทองตามมูลค่า
   - ร้านกิลด์: ใช้แต้มกิลด์ (จากการบริจาค/เก็บเกี่ยว) แลกของ · โควตารายสัปดาห์ · เซิร์ฟเวอร์หักแต้ม */
const GHC={wheat:['🌾','ข้าวสาลี',4,6,'#e8c25a'],carrot:['🥕','แครอท',6,5,'#ff8a30'],pumpkin:['🎃','ฟักทอง',12,4,'#ff9a20'],herb:['🌿','สมุนไพรเรืองแสง',24,3,'#7ff0ff']};
const GHI={wheat:['🌾','ข้าวสาลี',2000],carrot:['🥕','แครอท',3000],pumpkin:['🎃','ฟักทอง',6000],herb:['🌿','สมุนไพรเรืองแสง',12000],apple:['🍎','แอปเปิล',2500],wood:['🪵','ไม้',4000]};
const GHRC={bread:['🍞','ขนมปังโฮลวีต',{wheat:8},{xp:.05},1],stew:['🥘','สตูแครอท',{carrot:6,wheat:2},{hp:.05},1],soup:['🍵','ซุปสมุนไพรเรืองแสง',{herb:3,carrot:3},{dm:.03},1],
  pie:['🥧','พายฟักทองแอปเปิล',{pumpkin:3,wheat:4,apple:3},{gd:.05},3],feast:['🍗','งานเลี้ยงกิลด์',{wheat:10,carrot:6,pumpkin:3,herb:2,apple:6},{xp:.03,hp:.03,gd:.03,dm:.02},4]};
const GHBN={xp:'EXP',hp:'เลือดสูงสุด',gd:'ทองที่เก็บได้',dm:'ดาเมจ'};
const GHSH={s3:['💎','หินตีบวกขั้นสูง ×5',5,5,()=>{me.inv.s3=Math.min(999,(me.inv.s3|0)+5)}],ps:['🛡️','หินกันแตก ×2',6,5,()=>{me.inv.ps=Math.min(999,(me.inv.ps|0)+2)}],
  rn:['💠','ผงรูน ×50',15,5,()=>{rnShard(50,'ร้านกิลด์')}],th:['✂️','ด้ายแฟชั่น ×3',15,3,()=>{wdrThread(3,'ร้านกิลด์')}],rl:['👑','หีบอุปกรณ์ Relic',40,2,()=>{giveGear(4)}],
  d7:['🟡','สีย้อมทองคำ',30,2,()=>{dyAdd('d7',1)}],d8:['🌈','สีย้อมรุ้งดาวตก',80,1,()=>{dyAdd('d8',1)}]};
const GH2={got:new Set(),bk:'',gv:{},gt:''};
const ghTm=ms=>{ms=Math.max(0,ms|0);const s=Math.ceil(ms/1000),h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h?h+' ชม. '+m+' น.':m?m+' น. '+(s%60)+' วิ':(s%60)+' วิ'};
const ghBufTx=b=>Object.keys(b).map(k=>GHBN[k]+' +'+Math.round(b[k]*100)+'%').join(' · ');
const ghEl=()=>Date.now()-(GHS.rx||Date.now());
/* ---------- บัฟครัวกิลด์ ---------- */
function ghBuf(){try{const B=GDS.g&&GDS.g.hq&&GDS.g.hq.buff;if(!B||!GHRC[B.k])return null;const left=B.r-ghEl();return left>0?{k:B.k,left,n:B.n}:null}catch(e){return null}}
fdM=(f=>function(k){let v=f.apply(this,arguments);try{const B=ghBuf();if(B)v+=GHRC[B.k][3][k]||0}catch(e){}return v})(fdM);
buffList=(f=>function(){const L=f.apply(this,arguments);try{const B=ghBuf();if(B&&me.cls&&run&&me.down<=0){const R=GHRC[B.k];L.push({k:'ghb',ic:R[0],n:'ครัวกิลด์: '+R[1],d:ghBufTx(R[3])+' · ทั้งกิลด์ · โดย '+esc(B.n||''),t:B.left/1000,mx:3600,col:'#ffb060'})}}catch(e){}return L})(buffList);
setInterval(()=>{try{const B=ghBuf(),k=B?B.k:'';if(k!==GH2.bk){GH2.bk=k;if(me.cls)recalc()}}catch(e){}},1000);
/* ---------- วาดสด: พืช · ต้นไม้ · ครัว ---------- */
function ghPlot(i){return{x:i%2?458:342,y:-252+(i>>1)*50}}
function ghDraw2(t,col,now){const H=GDS.g&&GDS.g.hq;if(!H)return;const X=1600,Y=1600,el=ghEl(),O='#1a120a';
  (H.farm||[]).forEach((F,i)=>{const P=ghPlot(i),x=X+P.x,y=Y+P.y;if(!inView(x+48,y+20,80))return;if(!F)return;const C=GHC[F.c];if(!C)return;
    const tot=F.d*(1-.1*F.w),left=Math.max(0,F.r-el),p=Math.max(0,Math.min(1,1-left/Math.max(1,tot))),ripe=left<=0;
    if(F.w){g.fillStyle='rgba(30,20,40,'+(.12+.05*F.w)+')';g.fillRect(x+2,y+2,92,36)}
    for(let k=0;k<6;k++){const px=x+12+k*15,py=y+18+(k%2)*14,sw=Math.sin(now*2+k+i)*1.2;
      if(F.c==='wheat'){const h=4+16*p,c2=p>.75?'#e8c25a':'#7cc04a';g.strokeStyle=c2;g.lineWidth=1.4;for(let s=-1;s<=1;s++){g.beginPath();g.moveTo(px+s*2.5,py);g.quadraticCurveTo(px+s*3+sw,py-h*.6,px+s*3.5+sw,py-h);g.stroke()}if(p>.6){g.fillStyle=p>.75?'#f2d36a':'#a8d870';for(let s=-1;s<=1;s++){g.beginPath();g.ellipse(px+s*3.5+sw,py-h-2,1.6,3.2,s*.3,0,7);g.fill()}}}
      else if(F.c==='carrot'){const s=3+7*p;g.fillStyle='#4aa83a';for(let a=-1;a<=1;a++){g.beginPath();g.ellipse(px+a*s*.45+sw*.5,py-s*.7,1.6+p,s*.7,a*.5,0,7);g.fill()}if(p>.7){g.fillStyle='#ff8a30';g.beginPath();g.moveTo(px-3,py-1);g.lineTo(px+3,py-1);g.lineTo(px,py+3);g.closePath();g.fill()}}
      else if(F.c==='pumpkin'){if(k%2)continue;g.fillStyle='#3e8a30';g.beginPath();g.ellipse(px+5,py-2,5+3*p,2.6+p,.3,0,7);g.fill();const r=1.5+6*p;g.fillStyle=p>.8?'#ff9a20':'#9ac040';g.beginPath();g.ellipse(px,py-r*.6,r*1.15,r*.85,0,0,7);g.fill();g.strokeStyle='rgba(120,60,10,.6)';g.lineWidth=.7;g.beginPath();g.moveTo(px,py-r*1.4);g.lineTo(px,py+r*.2);g.stroke();g.fillStyle='#5a3a1a';g.fillRect(px-.8,py-r*1.5-2,1.6,3)}
      else{const s=2+6*p;g.fillStyle=p>.8?'#5ad0c0':'#4aa860';g.beginPath();g.ellipse(px-2,py-s*.6,1.6,s*.6,-.5,0,7);g.ellipse(px+2,py-s*.6,1.6,s*.6,.5,0,7);g.ellipse(px,py-s*.8,1.6,s*.8,0,0,7);g.fill();
        if(p>.5){g.globalCompositeOperation='lighter';glowAt(px,py-s,6+6*p,'120,240,255',(.25+.25*Math.sin(now*3+k))*p);g.globalCompositeOperation='source-over'}}}
    if(F.w){g.font='9px system-ui';g.textAlign='left';g.fillText('💧'.repeat(Math.min(3,F.w)),x+2,y+10)}
    if(ripe){const b=Math.sin(now*4+i)*3;g.globalCompositeOperation='lighter';glowAt(x+48,y+16,40,'255,230,120',.28+.1*Math.sin(now*5+i));g.globalCompositeOperation='source-over';g.font='bold 13px system-ui';g.textAlign='center';g.fillText('✨'+C[0],x+48,y-6+b)}
    else{g.fillStyle='rgba(0,0,0,.5)';g.fillRect(x+18,y-7,60,4);g.fillStyle=C[4];g.fillRect(x+18,y-7,60*p,4)}});
  /* ต้นไม้ */
  (H.trees||[]).forEach((T,i)=>{const P=GHTP[i];if(!P)return;const x=X+P[0],y=Y+P[1];if(!inView(x,y-30,90))return;const sw=Math.sin(now*1.3+i)*1.5,n=Math.min(2,T.n|0)+((T.r-el<=0)?1:0);
    g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x+3,y+2,24,7,0,0,7);g.fill();g.fillStyle='#6a4628';g.fillRect(x-4,y-26,8,28);g.strokeStyle=O;g.lineWidth=.8;g.strokeRect(x-4,y-26,8,28);
    const oak=T.k==='oak',c1=oak?'#3e7a34':'#4a9a3a',c2=oak?'#2e5e28':'#367a2c';[[0,-46,26],[-15,-34,17],[15,-34,17],[0,-60,15]].forEach(([a,b,r])=>{g.fillStyle=c2;g.beginPath();g.arc(x+a+sw,y+b+2,r,0,7);g.fill()});
    [[0,-48,24],[-14,-36,15],[14,-36,15],[2,-62,13]].forEach(([a,b,r])=>{g.fillStyle=c1;g.beginPath();g.arc(x+a+sw,y+b,r,0,7);g.fill()});
    if(!oak){const k2=n?7+n*3:4;for(let q=0;q<k2;q++){const a=q*2.4,r=8+(q*7)%14;g.fillStyle=n?'#e0302a':'#9acd50';g.beginPath();g.arc(x+sw+Math.cos(a)*r,y-44+Math.sin(a)*r*.8,n?2.6:1.8,0,7);g.fill()}}
    else if(n){for(let q=0;q<n*2;q++){g.fillStyle='#8a5a30';g.fillRect(x+10+q*5,y-2-(q%2)*4,10,4);g.strokeStyle=O;g.lineWidth=.5;g.strokeRect(x+10+q*5,y-2-(q%2)*4,10,4)}}
    if(n){g.font='bold 12px system-ui';g.textAlign='center';g.fillText((oak?'🪵':'🍎')+'×'+n,x,y-80+Math.sin(now*3+i)*2)}});
  /* ครัว: หม้อ + ไฟ + ควัน (แรงขึ้นเมื่อมีบัฟ) */
  {const x=X+470+(t===1?0:-60),y=Y+340+(t===1?-8:12),B=ghBuf();if(inView(x,y,120)){{g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+3,16,5,0,0,7);g.fill();g.globalCompositeOperation='lighter';glowAt(x,y-4,30,'255,140,50',.45+.15*Math.sin(now*9));g.globalCompositeOperation='source-over';
      for(let q=0;q<3;q++){const f=Math.sin(now*11+q)*2;g.fillStyle=['#ff6a20','#ffa040','#ffe070'][q];g.beginPath();g.moveTo(x-8+q*3,y);g.quadraticCurveTo(x+f,y-12+q*2,x+8-q*3,y);g.fill()}
      g.fillStyle='#2a2a30';g.beginPath();g.ellipse(x,y-10,12,9,0,0,Math.PI);g.fill();g.fillStyle='#3a3a42';g.beginPath();g.ellipse(x,y-10,12,3.5,0,0,7);g.fill();g.fillStyle=B?'#e0a050':'#7a6a50';g.beginPath();g.ellipse(x,y-10,10,2.6,0,0,7);g.fill()}
    const sx=t===1?x:X+470+53,sy=t===1?y-14:Y+340-(t===2?118:122);for(let q=0;q<(B?7:3);q++){const k=(now*(B?.6:.35)+q/(B?7:3))%1;g.fillStyle='rgba(235,235,240,'+((B?.4:.25)*(1-k))+')';g.beginPath();g.arc(sx+Math.sin(now+q*2)*6,sy-k*60,4+k*10,0,7);g.fill()}
    if(B){const R=GHRC[B.k];g.font='bold 11px system-ui';g.textAlign='center';const s=R[0]+' '+R[1]+' · '+ghTm(B.left),tw=g.measureText(s).width+14;g.fillStyle='rgba(60,30,10,.82)';g.beginPath();g.roundRect(X+470-tw/2,Y+340-140,tw,17,8);g.fill();g.fillStyle='#ffe0b0';g.fillText(s,X+470,Y+340-127)}}}}
/* ---------- หน้าต่าง ---------- */
function ghBody2(TB,G,H,t,col){let h='';const el=ghEl(),N=[0,2,4,6,8,10][t],ST=H.st||{};
  if(TB==='farm'){
    h+='<div class="card" style="text-align:left"><div class="cap">🌱 แปลงผัก '+N+'/10 แปลง</div><small style="display:block;opacity:.75;margin-bottom:4px">ใครในกิลด์ก็ปลูกได้ · 💧 รดน้ำ = โตเร็วขึ้น 10% (แปลงละ 3 ครั้ง · คนละครั้ง) · เก็บเกี่ยวเข้าโกดังกิลด์ + แต้มกิลด์ 1</small>';
    for(let i=0;i<10;i++){const F=(H.farm||[])[i];if(i>=N){h+='<div class="qr" style="opacity:.5"><div class="ico">🔒</div><div class="nm"><b>แปลง '+(i+1)+'</b><small>ขยายบ้านเป็นขั้น '+[0,1,1,2,2,3,3,4,4,5,5][i+1]+' เพื่อเปิด</small></div></div>';continue}
      if(!F){h+='<div class="qr"><div class="ico">🟫</div><div class="nm"><b>แปลง '+(i+1)+' · ว่าง</b><div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:3px">'+Object.keys(GHC).map(c=>'<button data-gh2="p:'+i+':'+c+'" style="font-size:11.5px;padding:3px 6px">'+GHC[c][0]+' '+GHC[c][1]+' <small>'+GHC[c][2]+' ชม. · ×'+GHC[c][3]+'</small></button>').join('')+'</div></div></div>';continue}
      const C=GHC[F.c],tot=F.d*(1-.1*F.w),left=Math.max(0,F.r-el),p=1-left/Math.max(1,tot);
      if(left<=0)h+='<div class="qr"><div class="ico">✨'+C[0]+'</div><div class="nm"><b>แปลง '+(i+1)+' · '+C[1]+' สุกแล้ว!</b><small>ได้ '+C[1]+' ×'+C[3]+' · ปลูกโดย '+esc(F.by)+'</small></div><button class="pri" data-gh2="h:'+i+'">เก็บเกี่ยว</button></div>';
      else h+='<div class="qr"><div class="ico">'+C[0]+'</div><div class="nm"><b>แปลง '+(i+1)+' · '+C[1]+'</b><small>เหลือ '+ghTm(left)+' · 💧 '+F.w+'/3 · ปลูกโดย '+esc(F.by)+'</small>'+gdBar(p,1,C[4])+'</div><button data-gh2="w:'+i+'"'+(F.mw||F.w>=3?' disabled':'')+'>💧 รดน้ำ</button></div>'}
    h+='</div>';
    h+='<div class="card" style="text-align:left"><div class="cap">🌳 สวนผลไม้</div>';
    if(t<3)h+='<small style="opacity:.75">เปิดเมื่อบ้านกิลด์ขั้น 3 (ป้อมหิน): ต้นโอ๊กให้ 🪵 ไม้ ทุก 48 ชม. · ต้นแอปเปิลให้ 🍎 ทุก 24 ชม. · ขั้น 3/4/5 = 2/4/6 ต้น</small>';
    else(H.trees||[]).forEach((T,i)=>{const oak=T.k==='oak',n=Math.min(2,(T.n|0)+(T.r-el<=0?1:0)),y=oak?4:6;h+='<div class="qr"><div class="ico">'+(oak?'🌳':'🍎')+'</div><div class="nm"><b>'+(oak?'ต้นโอ๊ก':'ต้นแอปเปิล')+' '+(i+1)+'</b><small>'+(n?'มีให้เก็บ '+(oak?'🪵 ไม้':'🍎 แอปเปิล')+' ×'+n*y:'รอบถัดไปอีก '+ghTm(T.r-el))+' · สะสมได้ 2 รอบ</small></div><button class="pri" data-gh2="t:'+i+'"'+(n?'':' disabled')+'>เก็บ</button></div>'});
    h+='</div>'}
  else if(TB==='food'){const B=ghBuf(),r1=G.r>=1;
    if(H.gift){const P=H.gift;h+='<div class="card" style="text-align:left;border-color:#ffd84a88"><div class="cap">📦 เสบียงจากกิลด์ รอคุณรับ</div><div style="font-size:13px">'+Object.keys(P.it||{}).map(k=>GHI[k]?GHI[k][0]+' '+GHI[k][1]+' ×'+P.it[k]:'').join(' · ')+'</div><small style="opacity:.75">แลกเป็นทองให้ทันที '+(P.g|0).toLocaleString()+' ทอง</small><button class="pri" data-gh2="g" style="margin-top:4px">💰 รับเสบียง</button></div>'}
    h+='<div class="card" style="text-align:left"><div class="cap">🍲 บัฟครัวกิลด์ (ทั้งกิลด์ · 1 ชม.)</div>'+(B?'<div style="font-size:13px"><b style="color:#ffb060">'+GHRC[B.k][0]+' '+GHRC[B.k][1]+'</b> · '+ghBufTx(GHRC[B.k][3])+'<br><small style="opacity:.75">เหลือ '+ghTm(B.left)+' · โดย '+esc(B.n||'')+'</small></div>':'<small style="opacity:.7">ตอนนี้ยังไม่มีบัฟ · หัวหน้า/รองเลือกสูตรด้านล่าง</small>')+'</div>';
    h+='<div class="card" style="text-align:left"><div class="cap">📦 โกดังกิลด์</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">'+Object.keys(GHI).map(k=>'<div style="padding:5px;border-radius:8px;background:rgba(255,255,255,.05);font-size:12px;text-align:center"><span style="font-size:18px">'+GHI[k][0]+'</span><br>'+GHI[k][1]+'<br><b>'+(ST[k]|0)+'</b></div>').join('')+'</div></div>';
    h+='<div class="card" style="text-align:left"><div class="cap">👩‍🍳 สูตรครัวกิลด์'+(r1?'':' · หัวหน้า/รองเป็นคนสั่ง')+'</div>';
    Object.keys(GHRC).forEach(k=>{const R=GHRC[k],okT=t>=R[4],ok=okT&&Object.keys(R[2]).every(q=>(ST[q]|0)>=R[2][q]);
      h+='<div class="qr"'+(okT?'':' style="opacity:.55"')+'><div class="ico">'+R[0]+'</div><div class="nm"><b>'+R[1]+'</b><small style="color:#ffd9a0">'+ghBufTx(R[3])+'</small><small>'+Object.keys(R[2]).map(q=>'<span style="color:'+((ST[q]|0)>=R[2][q]?'#9fe89f':'#ff9a8a')+'">'+GHI[q][0]+' '+(ST[q]|0)+'/'+R[2][q]+'</span>').join(' ')+(okT?'':' · ต้องบ้านขั้น '+R[4])+'</small></div>'+
        (r1?'<button class="pri" data-gh2="c:'+k+'"'+(ok?'':' disabled')+'>'+(GH2.ck===k?(B?'⚠️ แทนบัฟเดิม?':'⚠️ ยืนยัน'):'ทำ')+'</button>':'')+'</div>'});
    h+='</div>';
    if(r1){const M=(G.mem||[]).map(m=>[m[0],m[1]]);h+='<div class="card" style="text-align:left"><div class="cap">🎁 แจกเสบียงให้สมาชิก (ได้เป็นทองตามมูลค่า)</div><select id="ghgt" style="width:100%">'+M.map(([id,n])=>'<option value="'+esc(id)+'"'+(GH2.gt===id?' selected':'')+'>'+esc(n)+'</option>').join('')+'</select>'+
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:4px">'+Object.keys(GHI).map(k=>'<label style="font-size:11.5px">'+GHI[k][0]+' <small>('+(ST[k]|0)+')</small><input data-ghgi="'+k+'" type="number" min="0" max="'+(ST[k]|0)+'" value="'+(GH2.gv[k]||0)+'" style="width:100%"></label>').join('')+'</div>'+
      '<small style="display:block;opacity:.7;margin-top:3px">มูลค่า: '+Object.keys(GHI).map(k=>GHI[k][0]+' '+GHI[k][2].toLocaleString()).join(' · ')+' ทอง</small><button data-gh2="v" style="margin-top:4px">📦 แจก</button></div>'}
    const fl=(H.fl||[]).slice().reverse().slice(0,10);if(fl.length)h+='<div class="card" style="text-align:left"><div class="cap">📜 ความเคลื่อนไหวฟาร์ม/ครัว</div>'+fl.map(e=>'<div style="font-size:11.5px;padding:2px 0">'+(e.k==='h'?'🌾 <b>'+esc(e.n)+'</b> เก็บเกี่ยว '+(GHI[e.c]?GHI[e.c][0]+' '+GHI[e.c][1]:'')+' ×'+e.a:e.k==='t'?'🌳 <b>'+esc(e.n)+'</b> เก็บ '+(GHI[e.c]?GHI[e.c][0]+' '+GHI[e.c][1]:'')+' ×'+e.a:e.k==='c'?'🍲 <b>'+esc(e.n)+'</b> ทำ '+(GHRC[e.c]?GHRC[e.c][0]+' '+GHRC[e.c][1]:''):'🎁 <b>'+esc(e.n)+'</b> แจกเสบียง '+e.a+' ชิ้นให้ '+esc(e.to||''))+' <small style="opacity:.5">'+new Date(e.at).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})+'</small></div>').join('')+'</div>'}
  else{const pt=H.pt|0,BY=H.buy||{};h+='<div class="card" style="text-align:left"><div class="cap">🛒 ร้านกิลด์ · แต้มของคุณ <b style="color:#ffd84a">'+pt.toLocaleString()+'</b></div><small style="display:block;opacity:.75;margin-bottom:4px">ได้แต้มจากบริจาค (ทุก 10,000 ทอง = 1) และเก็บเกี่ยวฟาร์ม (ครั้งละ 1) · โควตารีเซ็ตทุกวันจันทร์</small>'+
    Object.keys(GHSH).map(k=>{const S=GHSH[k],b=BY[k]|0,ok=pt>=S[2]&&b<S[3];return'<div class="qr"><div class="ico">'+S[0]+'</div><div class="nm"><b>'+S[1]+'</b><small>'+S[2]+' แต้ม · สัปดาห์นี้ '+b+'/'+S[3]+'</small></div><button class="pri" data-gh2="b:'+k+'"'+(ok&&!GH2.pb?'':' disabled')+'>แลก</button></div>'}).join('')+'</div>'}
  return h}
function ghAfter2(TB){ov.querySelectorAll('[data-ghgi]').forEach(i=>i.oninput=()=>{GH2.gv[i.dataset.ghgi]=Math.max(0,Math.floor(+i.value||0))});const s=$('ghgt');if(s){GH2.gt=s.value;s.onchange=()=>{GH2.gt=s.value}}}
function ghAct2(a){const p=a.split(':'),op=p[0],G=GDS.g,H=G&&G.hq;if(!H)return;
  if(op==='p'){gdEmit('hfp',{p:+p[1],c:p[2]});return}
  if(op==='w'){gdEmit('hfw',{p:+p[1]});return}
  if(op==='h'){gdEmit('hfh',{p:+p[1]});return}
  if(op==='t'){gdEmit('htc',{p:+p[1]});return}
  if(op==='g'){gdEmit('hqg');return}
  if(op==='b'){if(GH2.pb)return;GH2.pb=p[1];gdEmit('hqb',{i:p[1]});setTimeout(()=>{GH2.pb=null},4000);ghUI();return}
  if(op==='c'){const k=p[1];if(GH2.ck!==k){GH2.ck=k;ghUI();return}GH2.ck='';gdEmit('hck',{r:k});ghUI('⏳ กำลังทำอาหาร…');return}
  if(op==='v'){const s=$('ghgt'),t=s?s.value:'';const it={};let n=0;for(const k in GHI){const v=GH2.gv[k]|0;if(v>0){it[k]=v;n+=v}}if(!t||!n)return ghUI('⚠️ เลือกสมาชิกและจำนวนของก่อน');gdEmit('hgv',{t,it});GH2.gv={};return}}
/* ---------- ข้อความจากเซิร์ฟเวอร์ ---------- */
gdN=(f=>function(d){try{if(d&&d.t){const G=GDS.g,tg=G?'🏰['+G.tag+'] ':'🏰 ',op=ov.dataset.k==='gh'&&!ov.hidden,msg=s=>{if(op)ghUI(s);else banner={s,t:3.5}};
  if(d.t==='hfw'){msg('💧 รดน้ำแปลง '+((d.p|0)+1)+' แล้ว · โตเร็วขึ้น 10%');try{sfx('fs_cast')}catch(e){}return}
  if(d.t==='hfh'){const C=GHC[d.c];msg('🌾 เก็บเกี่ยว '+(C?C[0]+' '+C[1]:'')+' ×'+(d.a|0)+' เข้าโกดัง · แต้มกิลด์ +1');try{sfx('coin');burst(me.x,me.y-20,['#ffd84a','#9fe89f','#ffffff'],18,110,.7,{glow:1,g:-30})}catch(e){}try{me.stt.ghh=(me.stt.ghh|0)+1}catch(e){}return}
  if(d.t==='htc'){const I=GHI[d.c];msg('🌳 เก็บ '+(I?I[0]+' '+I[1]:'')+' ×'+(d.a|0)+' เข้าโกดัง');try{sfx('coin')}catch(e){}return}
  if(d.t==='hck'){const R=GHRC[d.r];if(R){banner={s:'🍲 '+d.n+' ทำ «'+R[1]+'» ที่ครัวกิลด์ · ทุกคน '+ghBufTx(R[3])+' 1 ชม.!',t:6};try{sysMsg(tg+'🍲 '+d.n+' ทำ '+R[0]+' '+R[1]+' · บัฟทั้งกิลด์ '+ghBufTx(R[3])+' 1 ชั่วโมง')}catch(e){}try{sfx('fs_eat')}catch(e){}try{burst(me.x,me.y-20,['#ffb060','#ffe08a','#ffffff'],24,120,.8,{glow:1,g:-30})}catch(e){}if(op)ghUI('🍲 ทำ '+R[1]+' แล้ว!')}return}
  if(d.t==='hgv'){try{sysMsg(tg+'🎁 '+d.n+' แจกเสบียงให้คุณ! รับได้ที่ บ้านกิลด์ › 🍲 ครัว (หรือเมนูกิลด์ › คลัง)')}catch(e){}banner={s:'🎁 '+d.n+' แจกเสบียงกิลด์ให้คุณ! ไปรับที่ครัวกิลด์',t:5};try{sfx('quest')}catch(e){}return}
  if(d.t==='hgvok'){msg('🎁 แจกเสบียง '+(d.a|0)+' ชิ้นให้ '+esc(d.to||'')+' แล้ว');return}
  if(d.t==='hqg'){if(!d.id||GH2.got.has(d.id))return;GH2.got.add(d.id);const g0=Math.max(0,Math.min(5e7,d.g|0));me.gold+=g0;try{writeSave()}catch(e){}try{sfx('coin')}catch(e){}msg('💰 รับเสบียงกิลด์ · ได้ '+g0.toLocaleString()+' ทอง');return}
  if(d.t==='hqb'){GH2.pb=null;if(!d.id||GH2.got.has(d.id))return;const S=GHSH[d.i];if(!S)return;GH2.got.add(d.id);try{S[4]()}catch(e){}try{recalc()}catch(e){}try{writeSave()}catch(e){}try{sfx('coin')}catch(e){}msg('🛒 แลก '+S[0]+' '+S[1]+' แล้ว · เหลือแต้ม '+(d.pt|0).toLocaleString());return}
  if(d.t==='err')GH2.pb=null}}catch(e){}return f.apply(this,arguments)})(gdN);
/* รีเฟรชหน้าฟาร์มทุก 1 วิ (เวลานับถอยหลัง) */
setInterval(()=>{try{if(ov.dataset.k==='gh'&&!ov.hidden&&(GHS.tab==='farm'||GHS.tab==='food')&&!(document.activeElement&&/INPUT|SELECT/.test(document.activeElement.tagName)))ghUI()}catch(e){}},1000);
/* คงตำแหน่งเลื่อนเมื่อรีเฟรชแท็บเดิม */
ghUI=(f=>function(){const same=GH2.lt===GHS.tab&&ov.dataset.k==='gh'&&!ov.hidden,a=ov.scrollTop,pn=ov.querySelector('.pn'),b=pn?pn.scrollTop:0;const r=f.apply(this,arguments);GH2.lt=GHS.tab;if(same){try{ov.scrollTop=a;const p2=ov.querySelector('.pn');if(p2)p2.scrollTop=b}catch(e){}}return r})(ghUI);
