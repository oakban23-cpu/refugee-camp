/* ---------- v498 ภาค 8 บทที่ 2 · ราคาของการเปิดประตู ----------
   ที่ค่าย: สภาค่ายถกเรื่องรับกองเรือ (แยกบทพูด p7m · e7)
   ผาท่าเรือเมฆ (38): กองเรือมาเทียบท่า 4 ลำ + ลอยรอ · คลังเสบียง (ส่งสมุนไพร/แร่/ปลาจากระบบเก็บวัตถุดิบ) · ซ่อมเรือ (ตอกหมุดตามจังหวะ)
   ดันเจี้ยนป้องกันท่าเรือ (ห้อง 72000–72999 · DT[25] · v502 ย้ายจาก 86xxx ที่ชนลานบอสโลก): ปกป้องเครื่องดาว 3 เครื่อง · 3 คลื่น · บอสคราเคนเมฆ (หนวดฟาดสะพาน · รัดเครื่องดาว · เรียกฉลาม)
   ทางเลือก p8g: 1 เปิดท่าให้ทุกลำรวมเรือดำ · 2 รับเฉพาะเรือที่วางอาวุธ (ตัวกรองบทพูด L[8])
   ปลดล็อก ⛵ เรือเหาะ: วาปแผนที่โลกระหว่าง ค่าย · นครอัสตรา · ซากอารัณยา · ผาท่าเรือเมฆ ไม่ต้องรอคูลดาวน์ */
const PHDEP={x:1880,y:1330};
const PHBERTH=[{x:2700,y:1075,r:[2700,1224],nm:'ลมใต้',f:-1},{x:2770,y:1478,r:[2770,1666],nm:'เกล็ดเมฆ',f:1},{x:2770,y:1925,r:[2770,1734],nm:'ดาวเหนือ',f:-1},{x:2660,y:2335,r:[2660,2178],nm:'นาวาลัยน้อย',f:1}];
const PHSHIPLORE=['«ลมใต้» พาเด็กสามสิบคนฝ่าพายุมาได้ครึ่งทาง ก่อนเสากระโดงจะหัก… ตอนนี้เสาใหม่ทำจากไม้ของค่าย',
 '«เกล็ดเมฆ» ใบลมเย็บจากเสื้อของชาวเรือทุกคน ปะทับกันจนเป็นลายนับร้อยสี วันนี้มีผ้าของชาวค่ายเพิ่มเข้าไปอีกผืน',
 '«ดาวเหนือ» เรือที่เก่าที่สุดในกองเรือ ไม้กระดูกงูทำจากต้นไม้ต้นสุดท้ายบนเกาะนาวาลัย',
 '«นาวาลัยน้อย» เรือของยายเมฆา ทุกคืนจะมีเสียงเพลงกล่อมดังมาจากห้องท้ายเรือ… ท่อนที่สี่ที่ไม่มีใครบนแผ่นดินเคยได้ยิน'];
const P8SUP=[['h','🌿','สมุนไพร',['h1','h2','h3','rt'],10],['o','🪨','แร่',['o1','o2','o3'],10],['f','🐟','ปลา',null,5]];
const gP8k=()=>p6Past('p8k'),gP8rp=()=>p6Past('p8rp'),gP8g=()=>p6Past('p8g')?((me.sty&&me.sty.p8g)|0):0;
const P8RP={on:-1,h:0,pos:0,dir:1,sp:.85,zc:.5,zw:.22,shk:0,last:0};
/* ---------- คลังเสบียง ---------- */
function p8Have(row){if(row[3]){let n=0;row[3].forEach(k=>n+=gtHas(k));return n}const S=fsSt();let n=0;for(const id in S.c)n+=S.c[id]|0;return n}
function p8Take(row){let need=row[4];if(row[3]){for(const k of row[3]){const h=gtHas(k),t=Math.min(h,need);if(t>0){gtAdd(k,-t);need-=t}if(need<=0)break}}
  else{const S=fsSt();const ids=Object.keys(S.c).filter(id=>S.c[id]>0).sort((a,b)=>((FISH[a]&&FISH[a].r)|0)-((FISH[b]&&FISH[b].r)|0));for(const id of ids){const t=Math.min(S.c[id],need);S.c[id]-=t;need-=t;if(need<=0)break}}return need<=0}
function p8SupUI(){const P=p8Pn('p8sp');const st=stCur(),q=me.sty;if(!st||!st.p8sp||!q||q.a!==1){P.hidden=true;return}
  P.hidden=false;const bits=q.p8sp|0;let h='<div class="p8t">📦 คลังเสบียงกองเรือ</div>';
  P8SUP.forEach((row,i)=>{const done=bits>>i&1,have=p8Have(row),ok=have>=row[4];h+='<div class="p8r'+(done?' dn':'')+'"><span>'+row[1]+' '+row[2]+' <b>'+(done?row[4]:Math.min(have,row[4]))+'/'+row[4]+'</b></span>'+(done?'<i>✅ ส่งแล้ว</i>':'<button data-p8s="'+i+'"'+(ok?'':' disabled')+'>ส่ง</button>')+'</div>'});
  h+='<div class="p8h">สายแร่/สมุนไพรอยู่ทั่วผานี้ · ปลาตกได้ที่ปลายสะพานกลาง</div>';if(P.innerHTML!==h)P.innerHTML=h}
function p8SupGive(i){const st=stCur(),q=me.sty;if(!st||!st.p8sp||!q||q.a!==1)return;const row=P8SUP[i];if(!row||((q.p8sp|0)>>i&1))return;if(p8Have(row)<row[4]){try{sfx('err')}catch(e){}return}
  if(!p8Take(row))return;q.p8sp=(q.p8sp|0)|(1<<i);let n=0;for(let k=0;k<3;k++)if(q.p8sp>>k&1)n++;q.n=n;try{sfx('coin')}catch(e){}
  try{burst(PHDEP.x,PHDEP.y-30,['#ffe0a0','#ffffff','#bff0c8'],26,130,1,{glow:1,g:-50})}catch(e){}try{dn.push({x:PHDEP.x,y:PHDEP.y-70,v:row[1]+' ส่ง'+row[2]+'ให้กองเรือแล้ว '+n+'/3',t:1.8,col:'#ffe0a0'})}catch(e){}try{stHud();writeSave()}catch(e){}p8SupUI()}
/* ---------- ซ่อมเรือ: ตอกหมุดตามจังหวะ ---------- */
function p8Pn(id){let P=$(id);if(P)return P;P=document.createElement('div');P.id=id;P.className='p8pn';P.hidden=true;const par=($('fsp')&&$('fsp').parentElement)||document.body;par.appendChild(P);
  P.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();if(b.dataset.p8s!==undefined)p8SupGive(+b.dataset.p8s);if(b.dataset.p8h!==undefined)p8Hit()});return P}
function p8RpNew(){P8RP.zw=Math.max(.12,.24-P8RP.h*.04);P8RP.zc=P8RP.zw/2+Math.random()*(1-P8RP.zw)}
function p8RpUI(){const P=p8Pn('p8rp');if(P8RP.on<0){if(!P.hidden)P.hidden=true;return}const B=PHBERTH[P8RP.on];
  if(P.hidden||P.dataset.i!==String(P8RP.on)){P.dataset.i=P8RP.on;P.innerHTML='<div class="p8t">🔨 ซ่อมเรือ «'+B.nm+'»</div><div class="p8bar"><i class="z"></i><i class="n"></i></div><div class="p8hh"></div><button data-p8h="1" class="p8go">🔨 ตอก!</button><div class="p8h">กดตอนเข็มอยู่ในแถบเขียว (หรือกด Space / F) · ตอกให้ครบ 3 หมุด</div>';P.hidden=false}
  const z=P.querySelector('.z'),n=P.querySelector('.n'),hh=P.querySelector('.p8hh');z.style.left=((P8RP.zc-P8RP.zw/2)*100).toFixed(1)+'%';z.style.width=(P8RP.zw*100).toFixed(1)+'%';n.style.left=(P8RP.pos*100).toFixed(1)+'%';
  const t='●'.repeat(P8RP.h)+'○'.repeat(Math.max(0,3-P8RP.h));if(hh.textContent!==t)hh.textContent=t;P.classList.toggle('shk',performance.now()-P8RP.shk<260)}
function p8Hit(){if(P8RP.on<0)return;const now=performance.now();if(now-P8RP.last<160)return;P8RP.last=now;const q=me.sty,B=PHBERTH[P8RP.on];
  if(Math.abs(P8RP.pos-P8RP.zc)<=P8RP.zw/2){P8RP.h++;P8RP.sp=Math.min(1.8,P8RP.sp+.22);try{sfx('click')}catch(e){}try{spark(B.r[0],B.r[1]-30,'#ffe0a0',10,120,.4)}catch(e){}
    if(P8RP.h>=3){const i=P8RP.on;q.p8rp=(q.p8rp|0)|(1<<i);let n=0;for(let k=0;k<4;k++)if(q.p8rp>>k&1)n++;q.n=n;PALG.card={h:'⛵ ซ่อมเรือแล้ว '+n+'/4',t:PHSHIPLORE[i],s:now,d:9};try{sfx('quest')}catch(e){}
      try{burst(B.x,B.y-60,['#ffe0a0','#ffffff','#c8f0ff'],40,180,1.2,{glow:1,g:-40})}catch(e){}P8RP.on=-1;P8RP.h=0;try{stHud();writeSave()}catch(e){}}else p8RpNew()}
  else{P8RP.h=Math.max(0,P8RP.h-1);P8RP.shk=now;try{sfx('err')}catch(e){}try{dn.push({x:me.x,y:me.y-60,v:'💥 หมุดเด้ง!',t:.9,col:'#ffb0a0'})}catch(e){}}p8RpUI()}
window.addEventListener('keydown',e=>{if(P8RP.on<0||!ov.hidden||SD.on)return;if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.code==='Space'||e.key==='f'||e.key==='F'){e.preventDefault();e.stopPropagation();p8Hit()}},true);
function p8Tick(dt,now,x,y){const st=stCur(),q=me.sty,act=st&&q&&q.a===1&&me.down<=0&&!SD.on;
  /* คลังเสบียง */{const P=$('p8sp');const near=act&&st.p8sp&&Math.hypot(x-PHDEP.x,y-PHDEP.y)<110;if(near)p8SupUI();else if(P&&!P.hidden)P.hidden=true}
  /* ซ่อมเรือ */let on=-1;if(act&&st.p8rp)PHBERTH.forEach((B,i)=>{if(((q.p8rp|0)>>i&1))return;if(Math.hypot(x-B.r[0],y-B.r[1])<60)on=i});
  if(on!==P8RP.on){P8RP.on=on;P8RP.h=0;P8RP.sp=.85;P8RP.pos=0;P8RP.dir=1;if(on>=0)p8RpNew()}
  if(P8RP.on>=0){P8RP.pos+=P8RP.dir*P8RP.sp*dt;if(P8RP.pos>1){P8RP.pos=1;P8RP.dir=-1}if(P8RP.pos<0){P8RP.pos=0;P8RP.dir=1}}p8RpUI()}
function p8AqT(st){if(!me.sty)return null;if(st.p8sp)return{mp:38,act:'reach',x:PHDEP.x,y:PHDEP.y+60,lb:'ส่งเสบียงที่คลังเสบียงท่าเรือ'};
  if(st.p8rp){let b=null,bd=1e9;PHBERTH.forEach((B,i)=>{if((me.sty.p8rp|0)>>i&1)return;const d=curMap===38?Math.hypot(me.x-B.r[0],me.y-B.r[1]):i;if(d<bd){bd=d;b=B}});return b?{mp:38,act:'reach',x:b.r[0],y:b.r[1],lb:'ไปซ่อมเรือ «'+b.nm+'»'}:null}return null}
(()=>{const st=document.createElement('style');st.textContent='.p8pn{position:absolute;left:50%;bottom:226px;transform:translateX(-50%);z-index:3;width:min(300px,84%);background:rgba(16,22,34,.94);border:1px solid rgba(255,214,140,.6);border-radius:14px;padding:8px 10px 10px;color:#f4ecdc;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.5);font-size:12px}'+
 '.p8pn .p8t{font-weight:700;color:#ffd890;margin-bottom:6px;font-size:13px}.p8pn .p8r{display:flex;justify-content:space-between;align-items:center;padding:4px 2px;border-top:1px solid rgba(255,255,255,.08)}.p8pn .p8r.dn{opacity:.7}.p8pn .p8r b{color:#fff}.p8pn .p8r i{font-style:normal;color:#9fe0a8}'+
 '.p8pn button{background:linear-gradient(#f0c068,#c8902c);color:#2a1a08;border:0;border-radius:9px;padding:4px 14px;font-weight:700;font-size:12px}.p8pn button:disabled{opacity:.4}.p8pn .p8h{margin-top:6px;font-size:10.5px;opacity:.72;line-height:1.4}'+
 '.p8pn .p8bar{position:relative;height:16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden;margin:2px 0 6px}.p8pn .p8bar .z{position:absolute;top:0;bottom:0;background:rgba(110,220,120,.55);border-radius:6px}.p8pn .p8bar .n{position:absolute;top:-2px;bottom:-2px;width:4px;margin-left:-2px;background:#fff;box-shadow:0 0 6px #fff;border-radius:2px}'+
 '.p8pn .p8hh{letter-spacing:4px;color:#ffd890;font-size:14px;margin-bottom:4px}.p8pn .p8go{font-size:15px;padding:7px 26px}.p8pn.shk{animation:p8shk .25s}@keyframes p8shk{0%,100%{transform:translateX(-50%)}25%{transform:translateX(calc(-50% - 6px))}75%{transform:translateX(calc(-50% + 6px))}}';document.head.appendChild(st)})();
/* ---------- ฉากท่าเรือหลังกองเรือมาถึง ---------- */
function phShipD(x,y,T,o){const bob=Math.sin(T*1.1+x*.01)*3,yy=y+bob,f=o.f||1,dmg=o.dmg,dark=o.dark;g.save();
  g.fillStyle='rgba(110,130,165,.24)';g.beginPath();g.ellipse(x,y+30,96,16,0,0,7);g.fill();g.translate(x,yy);g.scale(f,1);
  /* ลูกโป่ง */const bc=dark?'#3a3a46':'#e2d6b8';g.fillStyle=bc;g.beginPath();g.ellipse(0,-112,84,36,0,0,7);g.fill();g.strokeStyle=dark?'#18181e':'#7a6a4a';g.lineWidth=1.6;g.stroke();
  g.strokeStyle=dark?'rgba(0,0,0,.4)':'rgba(120,100,70,.45)';g.lineWidth=1.1;for(const k of[-50,-22,6,34,60]){g.beginPath();g.moveTo(k,-146);g.quadraticCurveTo(k*1.15,-112,k,-78);g.stroke()}
  if(dmg){g.fillStyle='#b8a888';g.fillRect(-40,-130,22,16);g.fillRect(18,-104,26,14);g.fillStyle='#2a2420';g.beginPath();g.moveTo(30,-140);g.lineTo(52,-128);g.lineTo(40,-118);g.closePath();g.fill()}
  /* เชือก */g.strokeStyle=dark?'#202028':'#8a7a5a';g.lineWidth=1.2;for(const k of[-60,-20,20,60]){g.beginPath();g.moveTo(k,-82);g.lineTo(k*.8,-30);g.stroke()}
  /* ตัวเรือ */const hg=g.createLinearGradient(0,-36,0,8);hg.addColorStop(0,dark?'#2a2a32':'#9a6c44');hg.addColorStop(1,dark?'#121218':'#5a3c24');g.fillStyle=hg;
  g.beginPath();g.moveTo(-98,-34);g.quadraticCurveTo(-80,6,0,8);g.quadraticCurveTo(80,6,104,-34);g.closePath();g.fill();g.strokeStyle=dark?'#08080c':'#2e1e10';g.lineWidth=2;g.stroke();
  g.fillStyle=dark?'#4a4a56':'#d8b050';g.fillRect(-98,-38,202,5);g.strokeStyle=dark?'#1a1a22':'#5a3e26';g.lineWidth=2;for(let k=-90;k<100;k+=16){g.beginPath();g.moveTo(k,-38);g.lineTo(k,-48);g.stroke()}g.beginPath();g.moveTo(-96,-48);g.lineTo(102,-48);g.stroke();
  for(const px of[-50,0,50]){g.fillStyle=dark?'#08080c':'#2a1a10';g.beginPath();g.arc(px,-16,6,0,7);g.fill();g.strokeStyle=dark?'#5a5a66':'#c8963a';g.lineWidth=1.6;g.stroke()}
  g.fillStyle=dark?'#4a4a56':'#c8963a';g.beginPath();g.moveTo(104,-34);g.lineTo(130,-50);g.lineTo(106,-42);g.closePath();g.fill();
  /* เสาธง */g.strokeStyle=dark?'#18181e':'#4a3020';g.lineWidth=4;g.beginPath();g.moveTo(-20,-48);g.lineTo(-20,-150);g.stroke();
  if(!dmg){const w=Math.sin(T*3+x)*2;g.fillStyle=dark?'#101014':'#3a7ad0';g.beginPath();g.moveTo(-20,-150);g.lineTo(6+w,-144);g.lineTo(2+w,-136);g.lineTo(6+w,-128);g.lineTo(-20,-132);g.closePath();g.fill();if(!dark){g.fillStyle='#ffe8a0';PST(g,-8+w*.5,-140,3.5,1.4,4,0);g.fill()}}
  if(o.nm){g.scale(f,1);g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle=dark?'#a0a0b0':'#f0dca8';g.fillText('«'+o.nm+'»',0,-20)}
  g.restore();
  if(!dark&&!dmg){g.save();g.globalCompositeOperation='lighter';for(const k of[-70,70])glowAt(x+k*f,yy-44,9,'255,210,140',.4+.2*Math.sin(T*2+k));g.restore()}
  if(dmg&&!LOWQ){for(let k=0;k<4;k++){const p=(T*.25+k/4+x*.001)%1;g.fillStyle='rgba(70,64,60,'+(.28*(1-p))+')';g.beginPath();g.arc(x+20*f+p*30,yy-60-p*120,8+p*18,0,7);g.fill()}}}
function phMekD(x,y,T){campFolk(x,y,{c:'#7a6aa8',sh:'#e8d8ff',hair:'#f4f0ec',f:1,s:1.05,k:9,sit:1,arm:Math.sin(T*1.2)*.2-.4},T);if(!LOWQ){g.save();g.font='9px system-ui';g.textAlign='center';const p=(T*.4)%1;g.globalAlpha=Math.sin(p*3.14)*.8;g.fillStyle='#e8d8ff';g.fillText('♪',x+10+p*8,y-24-p*16);g.restore()}
  g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,14,24,.85)';g.strokeText('ยายเมฆา',x,y-34);g.fillStyle='#e8d8ff';g.fillText('ยายเมฆา',x,y-34)}
Object.assign(PALK,{
 phship(t,T){if(!gP8k())return;const i=t.v,B=PHBERTH[i],q=me.sty,fix=gP8rp()||(q&&((q.p8rp|0)>>i&1));phShipD(B.x,B.y,T,{f:B.f,dmg:!fix,nm:B.nm})},
 phbk(t,T){const e=gP8g();if(e!==1)return;phShipD(t.x,t.y,T,{f:-1,dark:1,nm:'เรือดำ'})},
 phdep(t,T){const x=t.x,y=t.y;PALSH(x+4,y+6,52,12,.4);g.fillStyle='#6a4a2c';g.fillRect(x-48,y-16,96,18);g.strokeStyle='#3a2414';g.lineWidth=1.4;g.strokeRect(x-48,y-16,96,18);
  for(const[dx,dy,w,h,c]of[[-38,-40,30,24,'#8a6440'],[-4,-44,34,28,'#946c46'],[30,-36,24,20,'#7a5636'],[-20,-62,26,20,'#8a6440'],[12,-64,22,18,'#a07a50']]){g.fillStyle=c;g.fillRect(x+dx-w/2,y+dy,w,h);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(x+dx-w/2,y+dy,w,h);g.beginPath();g.moveTo(x+dx-w/2,y+dy);g.lineTo(x+dx+w/2,y+dy+h);g.stroke()}
  g.strokeStyle='#4a3020';g.lineWidth=3;g.beginPath();g.moveTo(x-52,y-14);g.lineTo(x-52,y-96);g.moveTo(x+52,y-14);g.lineTo(x+52,y-96);g.stroke();
  g.fillStyle='#c8b892';g.beginPath();g.moveTo(x-62,y-90);g.quadraticCurveTo(x,y-112,x+62,y-90);g.lineTo(x+62,y-82);g.quadraticCurveTo(x,y-102,x-62,y-82);g.closePath();g.fill();g.strokeStyle='#6a5a3a';g.lineWidth=1;g.stroke();
  g.fillStyle='#e8dcc0';g.fillRect(x-32,y-128,64,16);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(x-32,y-128,64,16);g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#3a2414';g.fillText('📦 คลังเสบียง',x,y-116);
  const st=stCur(),q=me.sty;if(st&&st.p8sp&&q&&q.a===1){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-40,60,'255,220,140',.18+.08*Math.sin(T*3));g.restore();g.strokeStyle='rgba(255,214,140,'+(.5+.3*Math.sin(T*3))+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+40,70,24,0,0,7);g.stroke()}
  if(p6Past('p8sp'))phMekD(x+70,y+10,T)},
 phring(t,T){const st=stCur(),q=me.sty;if(!st||!st.p8rp||!q||q.a!==1||((q.p8rp|0)>>t.v&1))return;const B=PHBERTH[t.v],x=B.r[0],y=B.r[1],pu=.6+.4*Math.sin(T*3+t.v);
  g.strokeStyle='rgba(255,214,140,'+(.45+.35*pu)+')';g.lineWidth=2.4;g.setLineDash([8,6]);g.beginPath();g.ellipse(x,y,44,16,0,0,7);g.stroke();g.setLineDash([]);
  g.font='16px system-ui';g.textAlign='center';g.fillText('🔨',x,y-24-pu*4)}});
/* ทับ: เรือเล็ก (skiff) หายไปเมื่อกองเรือมาเทียบ · กองเรือที่ลอยรอเห็นได้ตั้งแต่กองเรือมาถึง */
{const _sk=PALK.phskiff;PALK.phskiff=function(t,T){if(gP8k())return;return _sk(t,T)}}
{const _b=phBuild;window.phBuild=phBuild=function(M){_b(M);PHBERTH.forEach((B,i)=>{trees.push({x:B.x,y:B.y,r:0,k:'phship',v:i,ht:160,ns:1,nc:1});trees.push({x:B.r[0],y:B.r[1]-1,r:0,k:'phring',v:i,ht:30,ns:1,nc:1})});
  trees.push({x:PHDEP.x,y:PHDEP.y,r:34,k:'phdep',ht:130,hw:64,fw:60});trees.push({x:2850,y:880,r:0,k:'phbk',ht:160,ns:1,nc:1});
  P8RP.on=-1;try{const a=$('p8rp'),b=$('p8sp');if(a)a.hidden=true;if(b)b.hidden=true}catch(e){}}}
{const _t=phTick;window.phTick=phTick=function(dt,now,x,y,mv){_t(dt,now,x,y,mv);try{p8Tick(dt,now,me.x,me.y)}catch(e){}}}
/* ซ่อนแผงเมื่อออกจากแมพ */setInterval(()=>{try{if(curMap!==38){if(P8RP.on>=0){P8RP.on=-1;p8RpUI()}const b=$('p8sp');if(b&&!b.hidden)b.hidden=true}}catch(e){}},500);
/* กองเรือที่ลอยรอ: ตั้งแต่กองเรือมาถึง (เดิมเห็นหลังจุดประภาคาร) · เรือดำลอยมืดถ้าเลือกข้อ 2 */
{const _g=phGroundFx;window.phGroundFx=phGroundFx=function(){_g();try{if(gP8g()===2&&palVis(3060,760,200)){const T=performance.now()/1000;phShipD(3060,760,T,{f:-1,dark:1})}}catch(e){}}}
/* ---------- ดันเจี้ยนป้องกันท่าเรือ (ห้อง 72000–72999) ---------- */
setTimeout(()=>{DT[25]={n:'ศึกป้องกันท่าเรือเมฆ',lv:1,L:136,bL:22,hp:7800000,xp:850000,g:115000,dm:66,tn:10,sm:2,rm:4,lg:1,tm:900,gold:780000,exp:6800000}},0);
const HDFI=()=>!!(MAPS[curMap]&&MAPS[curMap].hdf),hdfBack=()=>({x:2050,y:1820});
const HDEA=[-1.5708,.5236,2.618],hdE=()=>HDEA.map(a=>[CX+Math.cos(a)*230,CY+Math.sin(a)*230]);
const HDLA=[-2.45,-.7,.95,2.2],hdL=()=>HDLA.map(a=>[CX+Math.cos(a)*(DR-24),CY+Math.sin(a)*(DR-24)]);
let HDF={e:[100,100,100],wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:[0,0,0],g:-1},HDLN=[],HDTL=[];
const hdfReset=()=>{HDF={e:[100,100,100],wv:0,st:'wait',nt:5,q:0,qt:0,bt:0,hit:[0,0,0],g:-1};HDLN=[];HDTL=[]};
const HDF_IN=[['nar','ลานไม้หน้าท่าเรือ เครื่องดาวสามเครื่องถูกยกลงจากเรือมาวางเรียงกัน แกนดาวในโดมแก้วเต้นช้า ๆ เหมือนคนหลับ'],
  ['sara','ฟังให้ดี! ฝูงสัตว์เมฆจะปีนขึ้นมาจากบันไดเชือกรอบลาน มันตามแสงเครื่องดาว — อย่าให้มันถึงเครื่อง!'],
  ['navin','(นาวินแนบหูกับเข็มทิศเสียง) …มีอะไรตัวใหญ่มากอยู่ใต้ลาน มันกำลังฟังเสียงเครื่องดาวเหมือนกัน'],
  ['nar','💡 มอนจะวิ่งไปกัดเครื่องดาวที่ใกล้สุด → สกัดไว้ก่อน · ยืนในวงทองรอบเครื่องตอนไม่มีศัตรูใกล้ = ซ่อม · ผ่าน 3 คลื่นแล้วคราเคนเมฆจะขึ้นมา · หนวดฟาด (แถบแดง) → หลบออกจากแถบ · หนวดรัดเครื่องดาว → ตีหนวดให้ขาดก่อนเครื่องพัง · เครื่องพังหมดทั้ง 3 = แพ้']];
function hdfMap(id){if(MAPS[id])return MAPS[id];const D=DT[25];hdfReset();
  return MAPS[id]={n:'ศึกป้องกันท่าเรือเมฆ',dg:25,hdf:1,th:38,bth:38,sx:CX,sy:CY+400,sr:0,seed:381,bg:'#c9d8e8',tile:'#8a6440',safe:'#946c46',ring:'#ffe0a0',t1:'#3a2414',t2:'#5a3c24',d1:'#9ab0c8',d2:'#ffffff',nests:[],
    gates:[{x:CX-170,y:CY+420,to:38,req:1,ars:1,nm:'ผาท่าเรือเมฆ',arr:hdfBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY-420,n:'คราเคนเมฆ',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:136,col:'#c8b8ff',bar:'#5a4a9a',ln:'#efe8ff',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'ทะเลเมฆฝั่งเหนือ',dg:1}}}
function hdfEnter(){if(!me.cls||me.down>0||isDg())return;const id=72000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='⚓ เปิดศึกป้องกันท่าเรือเมฆ รหัส '+id+' มาช่วยกันเฝ้าเครื่องดาวจนรุ่งเช้า!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  hdfReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+60,y:CY+380});setTimeout(()=>{if(HDFI()&&dg.ph==='lobby')banner={s:'⚓ ศึกป้องกันท่าเรือเมฆ · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function hdfStart(){if(!HDFI()||dg.ph!=='lobby')return;const D=DT[25];stSay(HDF_IN,()=>{if(!HDFI()||dg.ph!=='lobby')return;dg={ph:'run',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;hdfReset();HDF.st='brk';HDF.nt=4;
  fx({k:'msg',s:'⚓ ค่ำคืนเริ่มแล้ว! ปกป้องเครื่องดาวทั้งสามจนรุ่งเช้า'});try{sfx('quest')}catch(e){}},{cine:1})}
function hdfAlive(){const r=[];HDF.e.forEach((h,i)=>{if(h>0)r.push(i)});return r}
function hdfSpawn(n,shark){const D=DT[25],np=Math.max(1,plCount()),pts=[];for(let i=0;i<n;i++){const T=hdL()[Math.random()*4|0],x=T[0]+rnd(-30,30),y=T[1]+rnd(-30,30);
    const t=shark?0:(Math.random()<.14+HDF.wv*.06?2:(Math.random()<.45?1:0)),L=D.L+(HDF.wv|0),hp=mhp(t,L)*(1+.25*(np-1));mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,hdf:1});if(pts.length<10)pts.push([Math.round(x),Math.round(y)])}
  if(pts.length)fx({k:'hdtl',p:pts})}
function hdfSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  if(!hdfAlive().length){dgEnd(0,'เครื่องดาวถูกทำลายหมดทั้งสามเครื่อง');return}
  const pl=escPl(),E=hdE();E.forEach(([ex,ey],i)=>{if(HDF.e[i]<=0)return;const thr=mons.some(m=>m.t!==3&&m.hp>0&&Math.hypot(m.x-ex,m.y-ey)<170),guard=pl.some(p=>Math.hypot(p.x-ex,p.y-ey)<110);if(guard&&!thr)HDF.e[i]=Math.min(100,HDF.e[i]+.9*dt)});
  /* หนวดรัดเครื่องดาว */const gr=mons.filter(m=>m.hdg>=0&&m.hp>0);if(gr.length){gr.forEach(m=>{const i=m.hdg;if(HDF.e[i]>0){HDF.e[i]=Math.max(0,HDF.e[i]-3.2*dt);HDF.hit[i]=performance.now()}});HDF.g=gr[0].hdg}else HDF.g=-1;
  if(dg.ph==='run'){const np=Math.max(1,plCount());
    if(HDF.st==='brk'){HDF.nt-=dt;if(HDF.nt<=0){HDF.wv++;dg.w=HDF.wv;HDF.st='wave';HDF.q=Math.round((6+HDF.wv*3)*(.7+.45*np));HDF.qt=0;fx({k:'msg',s:'🦈 คลื่นที่ '+HDF.wv+'/3 · ฝูงสัตว์เมฆปีนขึ้นบันไดเชือก!'});try{sfx('boss')}catch(e){}}}
    else if(HDF.st==='wave'){HDF.qt-=dt;if(HDF.q>0&&HDF.qt<=0){const k=Math.min(3,HDF.q);hdfSpawn(k);HDF.q-=k;HDF.qt=2.4}
      if(HDF.q<=0&&!mons.some(m=>m.hdf&&m.hp>0)){if(HDF.wv>=3){dg.ph='boss';HDF.st='boss';bossCd=1e9;spawnBoss();dg.tl+=DGBOSS;fx({k:'hdtl',p:[[CX,CY-420]],big:1});fx({k:'msg',s:'🐙 ทะเลเมฆแยกออก… คราเคนเมฆโผล่ขึ้นมาทางเหนือ!'});try{sfx('boss')}catch(e){}}
        else{HDF.st='brk';HDF.nt=6;fx({k:'msg',s:'✨ ไล่ฝูงถอยได้แล้ว! พักซ่อมเครื่องดาวได้'})}}}}
  HDF.bt-=dt;if(HDF.bt<=0){HDF.bt=.4;fx({k:'hdfv',e:HDF.e.map(v=>Math.round(v*10)/10),wv:HDF.wv,st:HDF.st,g:HDF.g})}}
function hdfMon(m,dt,pl,spd){if(!HDFI()||(dg.ph!=='run'&&dg.ph!=='boss'))return false;if(m.hdg>=0)return true;for(const p of pl)if(Math.hypot(p.x-m.x,p.y-m.y)<140)return false;
  const E=hdE();let bi=-1,bd=1e9;E.forEach(([ex,ey],i)=>{if(HDF.e[i]<=0)return;const d=Math.hypot(ex-m.x,ey-m.y);if(d<bd){bd=d;bi=i}});if(bi<0)return false;
  if(bd>70){moveTo(m,E[bi][0],E[bi][1],spd*1.1*dt);return true}
  if(m.ac<=0){m.ac=1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();HDF.e[bi]=Math.max(0,HDF.e[bi]-(m.t===2?1.6:m.t===0?1.3:1));HDF.hit[bi]=performance.now()}return true}
function hdfLine(p){const a=Math.random()*Math.PI,cx=p.x,cy=p.y,ux=Math.cos(a),uy=Math.sin(a),L=DR+60;return[Math.round(cx-ux*L),Math.round(cy-uy*L),Math.round(cx+ux*L),Math.round(cy+uy*L)]}
const hdSegD=(px,py,l)=>{const dx=l[2]-l[0],dy=l[3]-l[1],t=Math.max(0,Math.min(1,((px-l[0])*dx+(py-l[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(px-l[0]-dx*t,py-l[1]-dy*t)};
function hdfAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh;
  if(m.hl){m.hl.t-=dt;if(m.hl.t<=0){const L=m.hl.l;pl.forEach(p=>{if(L.some(l=>hdSegD(p.x,p.y,l)<46))dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(90*dm)});hdE().forEach(([ex,ey],i)=>{if(HDF.e[i]>0&&L.some(l=>hdSegD(ex,ey,l)<60)){HDF.e[i]=Math.max(0,HDF.e[i]-6);HDF.hit[i]=performance.now()}});fx({k:'hdls',l:L});m.hl=null}}
  if(m.stun>0||m.inv)return;
  m.w1=(m.w1===undefined?6:m.w1)-dt;if(m.w1<=0&&!m.hl&&pl.length){m.w1=enr?8:11;const L=[];const n=enr?3:2;for(let i=0;i<n;i++){const p=pl[(Math.random()*pl.length)|0];L.push(hdfLine(i?{x:CX+rnd(-200,200),y:CY+rnd(-200,200)}:p))}m.hl={t:1.6,l:L};fx({k:'hdl',l:L,dur:1.6});fx({k:'msg',s:'🐙 หนวดยักษ์ยกขึ้น! ออกจากแถบแดง'})}
  m.w2=(m.w2===undefined?12:m.w2)-dt;if(m.w2<=0){m.w2=enr?13:17;const A=hdfAlive();if(A.length&&!mons.some(q=>q.hdg>=0&&q.hp>0)){const i=A[(Math.random()*A.length)|0],[ex,ey]=hdE()[i],D=DT[25],np=Math.max(1,pl.length),hp=mhp(2,D.L)*2.6*(1+.25*(np-1));
    mons.push({id:++mid,x:ex+rnd(-20,20),y:ey-40,tx:ex,ty:ey-40,t:2,L:D.L,p:0,hx:ex,hy:ey-40,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,hdf:1,hdg:i});fx({k:'msg',s:'🐙 คราเคนรัดเครื่องดาว! ตีหนวดให้ขาดก่อนเครื่องพัง'});try{sfx('boss')}catch(e){}}}
  if(f<.5){m.w3=(m.w3===undefined?2:m.w3)-dt;if(m.w3<=0){m.w3=enr?14:18;hdfSpawn(2+Math.min(2,pl.length-1),1);fx({k:'msg',s:'🦈 คราเคนเรียกฝูงฉลามเมฆ! อย่าให้ถึงเครื่องดาว'})}}}
function hdfFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='hdl'){HDLN.push({l:o.l||[],t0:n,d:(+o.dur||1.6)*1000,s:0});if(HDLN.length>8)HDLN.splice(0,HDLN.length-8);return true}
  if(o.k==='hdls'){HDLN.push({l:o.l||[],t0:n,d:500,s:1});try{shk=Math.max(shk,.25)}catch(e){}return true}
  if(o.k==='hdtl'){(o.p||[]).forEach(p=>HDTL.push({x:+p[0],y:+p[1],t0:n,big:o.big?1:0}));if(HDTL.length>30)HDTL.splice(0,HDTL.length-30);return true}
  if(o.k==='hdfv'){if(!isHost()||!HDFI()){(o.e||[]).forEach((h,i)=>{h=+h;if(h<HDF.e[i]-.05)HDF.hit[i]=n;HDF.e[i]=h});HDF.wv=o.wv|0;HDF.st=o.st;HDF.g=o.g==null?-1:+o.g}return true}return false}
function hdfBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  hdE().forEach(([x,y],i)=>trees.push({x,y,r:34,k:'hdeng',v:i,ht:120,hw:50}));
  HDEA.forEach((a,i)=>trees.push({x:CX+Math.cos(a)*(DR+150),y:CY+Math.sin(a)*(DR+150)+40,r:0,k:'hdship',v:i,ht:160,ns:1,nc:1}));
  hdL().forEach(([x,y],i)=>trees.push({x:x+Math.cos(HDLA[i])*40,y:y+Math.sin(HDLA[i])*40,r:0,k:'hdlad',v:i,ht:20,ns:1,nc:1}));
  [[-.3,'phcrate'],[1.2,'phbarrel'],[1.9,'phcrate'],[3.6,'phbarrel'],[4.3,'phrope'],[5.6,'phcrate']].forEach(([a,k],i)=>trees.push({x:CX+Math.cos(a)*(DR-60),y:CY+Math.sin(a)*(DR-60),r:14,k,ht:40,v:i%2}))}
function hdfPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sg=c.createLinearGradient(0,oy,0,Y1);sg.addColorStop(0,'#c9d8e8');sg.addColorStop(1,'#e2ecf6');c.fillStyle=sg;c.fillRect(ox,oy,S,S);
  palGrid(ox,oy,X1,Y1,130,96,1,(x,y,i,j)=>{const h=palH(i,j,3851),px=x+palH(j,i,3852)*90,py=y+palH(i,j,3853)*70,r=50+h*90;c.fillStyle='rgba(150,172,200,.22)';c.beginPath();c.ellipse(px+10,py+16,r,r*.42,0,0,7);c.fill();c.fillStyle=h>.5?'rgba(255,255,255,.55)':'rgba(246,250,255,.4)';c.beginPath();c.ellipse(px,py,r*.9,r*.36,0,0,7);c.fill()});
  c.fillStyle='rgba(90,110,140,.3)';c.beginPath();c.ellipse(CX+8,CY+40,DR+34,DR+20,0,0,7);c.fill();
  /* เสาค้ำใต้ลาน */for(let k=0;k<14;k++){const a=k/14*6.283;if(Math.sin(a)<-.2)continue;const x=CX+Math.cos(a)*(DR+10),y=CY+Math.sin(a)*(DR+10);c.fillStyle='#4a3424';c.fillRect(x-6,y,12,70);c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.ellipse(x,y+70,22,7,0,0,7);c.fill()}
  c.save();c.beginPath();c.arc(CX,CY,DR+20,0,7);c.clip();c.fillStyle='#7f5a38';c.fillRect(CX-DR-30,CY-DR-30,DR*2+60,DR*2+60);
  for(let y=CY-DR-30;y<CY+DR+30;y+=16){c.fillStyle=((y/16)|0)%2?'#946c46':'#86603e';c.fillRect(CX-DR-30,y,DR*2+60,15);c.fillStyle='rgba(40,24,12,.35)';c.fillRect(CX-DR-30,y+14,DR*2+60,2);for(let x=CX-DR-30+((y*7)%110);x<CX+DR+30;x+=110+((x*3)%50))c.fillRect(x,y,2,15)}
  /* วงซ่อมรอบเครื่องดาว */c.strokeStyle='rgba(255,214,140,.55)';c.lineWidth=3;c.setLineDash([12,9]);hdE().forEach(([x,y])=>{c.beginPath();c.arc(x,y,110,0,7);c.stroke()});c.setLineDash([]);
  c.restore();
  c.strokeStyle='#4a2e1a';c.lineWidth=18;c.beginPath();c.arc(CX,CY,DR+16,0,7);c.stroke();c.strokeStyle='#c8a870';c.lineWidth=3;c.beginPath();c.arc(CX,CY,DR+6,0,7);c.stroke();
  for(let k=0;k<48;k++){const a=k/48*6.283,x=CX+Math.cos(a)*(DR+16),y=CY+Math.sin(a)*(DR+16);c.fillStyle='#5a3e26';c.beginPath();c.arc(x,y,5,0,7);c.fill()}}
Object.assign(PALK,{
 hdeng(t,T){const i=t.v,x=t.x,y=t.y,h=HDF.e[i],dead=h<=0,hit=performance.now()-HDF.hit[i]<220,sh=hit?Math.sin(T*90)*2:0,gr=HDF.g===i;PALSH(x,y+8,46,12,.45);g.save();g.translate(sh+(gr?Math.sin(T*40)*1.5:0),0);
  g.fillStyle='#5a3e26';g.fillRect(x-40,y-18,80,22);g.strokeStyle='#2a1a0e';g.lineWidth=1.4;g.strokeRect(x-40,y-18,80,22);
  g.fillStyle='#b88a3a';g.fillRect(x-30,y-46,60,30);g.strokeStyle='#5a3a14';g.strokeRect(x-30,y-46,60,30);for(const dx of[-22,22]){g.fillStyle='#d8a848';g.beginPath();g.arc(x+dx,y-30,6,0,7);g.fill();g.strokeStyle='#5a3a14';g.stroke()}
  const k=Math.max(0,h)/100,pu=.6+.4*Math.sin(T*(2+3*(1-k)));g.fillStyle=dead?'rgba(60,60,70,.9)':'rgba(200,230,255,.35)';g.beginPath();g.arc(x,y-66,24,Math.PI,0);g.lineTo(x+24,y-46);g.lineTo(x-24,y-46);g.closePath();g.fill();g.strokeStyle='#8a6a2a';g.lineWidth=2;g.stroke();
  if(!dead){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-60,30+10*k,'150,220,255',(.3+.3*k)*pu);glowAt(x,y-60,8,'255,255,255',.9*pu);g.restore()}
  else if(!LOWQ){for(let q=0;q<3;q++){const p=(T*.3+q/3)%1;g.fillStyle='rgba(60,56,52,'+(.35*(1-p))+')';g.beginPath();g.arc(x+p*10,y-70-p*80,8+p*14,0,7);g.fill()}}
  if(k<.5&&!dead){g.strokeStyle='rgba(30,20,10,.8)';g.lineWidth=1.2;g.beginPath();g.moveTo(x-12,y-62);g.lineTo(x-4,y-54);g.lineTo(x-10,y-48);g.stroke()}
  g.restore();
  const bw=70,by=y-104;g.fillStyle='rgba(20,12,8,.78)';g.beginPath();g.roundRect(x-bw/2-2,by-2,bw+4,9,4);g.fill();g.fillStyle=k>.5?'#7ad04a':k>.25?'#e0b030':'#e04a3a';g.beginPath();g.roundRect(x-bw/2,by,bw*k,5,2.5);g.fill();
  g.font='bold 9px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,12,8,.85)';const lb=(dead?'💥 ':gr?'🐙 ':'⚙️ ')+'เครื่องดาว '+(i+1)+' · '+Math.ceil(Math.max(0,h))+'%';g.strokeText(lb,x,by-5);g.fillStyle=dead?'#ffb0a0':'#ffe8b0';g.fillText(lb,x,by-5)},
 hdship(t,T){const i=t.v;phShipD(t.x,t.y,T,{f:i===2?1:-1,dmg:HDF.e[i]<=0,nm:['ลมใต้','เกล็ดเมฆ','ดาวเหนือ'][i]})},
 hdlad(t,T){const x=t.x,y=t.y;g.strokeStyle='#8a6a3a';g.lineWidth=2.4;for(const s of[-9,9]){g.beginPath();g.moveTo(x+s,y-30);g.lineTo(x+s,y+40);g.stroke()}g.lineWidth=2;for(let k=-24;k<40;k+=12){g.beginPath();g.moveTo(x-9,y+k);g.lineTo(x+9,y+k);g.stroke()}
  if(HDF.st==='wave'||HDF.st==='boss'){g.save();g.globalCompositeOperation='lighter';glowAt(x,y+10,30,'255,120,90',.15+.1*Math.sin(T*4+t.v));g.restore()}}});
function hdfDraw(){if(!HDFI())return;const T=performance.now()/1000,now=performance.now();g.save();
  HDTL=HDTL.filter(e=>now-e.t0<1200);for(const e of HDTL){const k=(now-e.t0)/1200;g.save();g.globalCompositeOperation='lighter';glowAt(e.x,e.y,60*(e.big?2.4:1),'255,255,255',.4*(1-k));g.restore();g.strokeStyle='rgba(255,255,255,'+(.7*(1-k))+')';g.lineWidth=2;g.beginPath();g.ellipse(e.x,e.y,(20+k*50)*(e.big?2.2:1),(10+k*22)*(e.big?2.2:1),0,0,7);g.stroke()}
  HDLN=HDLN.filter(e=>now-e.t0<e.d);for(const e of HDLN){const k=(now-e.t0)/e.d;for(const l of e.l){if(!e.s){g.strokeStyle='rgba(230,50,40,'+(.18+.22*k)+')';g.lineWidth=92;g.lineCap='round';g.beginPath();g.moveTo(l[0],l[1]);g.lineTo(l[2],l[3]);g.stroke();g.strokeStyle='rgba(255,120,100,'+(.5+.4*Math.sin(T*14))+')';g.lineWidth=2;g.setLineDash([16,10]);g.stroke();g.setLineDash([])}
      else{g.strokeStyle='rgba(150,130,200,'+(.8*(1-k))+')';g.lineWidth=60*(1-k*.5);g.lineCap='round';g.beginPath();g.moveTo(l[0],l[1]);g.lineTo(l[2],l[3]);g.stroke();g.strokeStyle='rgba(255,255,255,'+(.6*(1-k))+')';g.lineWidth=6;g.stroke()}}}
  /* หนวดรัด: เส้นโยงจากบอสถึงเครื่อง */if(HDF.g>=0){const B=mons.find(q=>q.t===3&&q.hp>0),[ex,ey]=hdE()[HDF.g];if(B){g.strokeStyle='rgba(140,120,200,.85)';g.lineWidth=14;g.lineCap='round';g.beginPath();g.moveTo(B.x,B.y-20);g.quadraticCurveTo((B.x+ex)/2+Math.sin(T*3)*40,(B.y+ey)/2-80,ex,ey-40);g.stroke();g.strokeStyle='rgba(230,220,255,.6)';g.lineWidth=4;g.stroke()}}
  /* วงซ่อม */if(me.cls)hdE().forEach(([ex,ey],i)=>{if(HDF.e[i]<=0||HDF.e[i]>=100)return;if(Math.hypot(me.x-ex,me.y-ey)>110)return;if(mons.some(m=>m.t!==3&&m.hp>0&&Math.hypot(m.x-ex,m.y-ey)<170))return;g.save();g.globalCompositeOperation='lighter';glowAt(ex,ey,110,'140,255,160',.12+.05*Math.sin(T*5));g.restore();g.font='9px system-ui';g.textAlign='center';g.fillStyle='#b8ffb8';g.fillText('✚ กำลังซ่อมเครื่องดาว',ex,ey+28)});
  /* เตือนในแถบแดง */{const inL=HDLN.some(e=>!e.s&&e.l.some(l=>hdSegD(me.x,me.y,l)<46));if(inL){g.font='bold 14px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,10,10,.9)';g.strokeText('🐙 ออกจากแถบแดง!',me.x,me.y-70);g.fillStyle='#ffb0a0';g.fillText('🐙 ออกจากแถบแดง!',me.x,me.y-70)}}
  g.restore()}
function hdfScreen(){if(!HDFI())return;const T=performance.now()/1000;g.save();g.setTransform(DPR,0,0,DPR,0,0);const st=HDF.st==='boss',c=st?'70,50,140':'30,40,70',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.32,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(st?.22+.05*Math.sin(T*2):.28)+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);g.restore()}
function gxKraken(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,fy=br-2;g.save();g.translate(0,30);g.scale(1.3,1.3);g.translate(0,-30);
  if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-40+fy,80,hf<.5?'200,140,255':'170,160,255',.14+(hf<.5?.08:0));g.restore()}
  const tent=(sx,sy,ex,ey,ph,w,c)=>{const n=8;let px=sx,py=sy;for(let j=1;j<=n;j++){const u=j/n,x=sx+(ex-sx)*u+Math.sin(ph+u*5)*14*u,y=sy+(ey-sy)*u+Math.cos(ph+u*4)*8*u;Ln([px,py,x,y],F(c),Math.max(2,w*(1-u*.8)));px=x;py=y}
    if(!W){for(let j=2;j<n;j+=2){const u=j/n,x=sx+(ex-sx)*u+Math.sin(ph+u*5)*14*u,y=sy+(ey-sy)*u+Math.cos(ph+u*4)*8*u;E(x,y+w*(1-u*.8)*.35,w*.18*(1-u*.6),w*.12*(1-u*.6),'#e8d8ff',0)}}};
  /* หนวดหลัง */for(let i=0;i<4;i++){const s=i<2?-1:1,k=i%2,ph=T*1.4+i*1.3;tent(s*16,-24+fy,s*(78+k*20),-70+k*50+fy+Math.sin(T*1.2+i)*10,ph,16,'#6a5aa0')}
  /* เมฆฐาน */if(!W){g.fillStyle='rgba(255,255,255,.9)';for(const[dx,dy,r]of[[-56,6,24],[-24,10,30],[16,10,30],[52,6,24],[0,2,34]]){g.beginPath();g.ellipse(dx,dy,r,r*.46,0,0,7);g.fill()}}
  /* ลำตัว */E(0,-52+fy,36,44,F('#8a7ab8'),1);E(-8,-64+fy,20,22,F('#a090d0'),0);if(!W){g.fillStyle='rgba(230,220,255,.55)';for(const[dx,dy,r]of[[14,-78,5],[22,-60,4],[-18,-40,4],[6,-90,3],[-24,-70,3]]){g.beginPath();g.arc(dx,dy+fy,r,0,7);g.fill()}}
  if(!W&&hf<.5){g.strokeStyle='rgba(255,240,255,.85)';g.lineWidth=1.6;g.beginPath();g.moveTo(-14,-86+fy);g.lineTo(-4,-70+fy);g.lineTo(-12,-58+fy);g.moveTo(16,-82+fy);g.lineTo(10,-66+fy);g.stroke()}
  /* ตา */for(const s of[-1,1]){E(s*16,-34+fy,9,8,F('#f4f0ff'),1);eye(s*16,-34+fy,4.5,6,hf<.5?'#ff6ad8':'#ffe066');if(!W){g.fillStyle='#120a20';g.fillRect(s*16-1,-39+fy,2,10)}}
  /* หนวดหน้า */for(let i=0;i<4;i++){const s=i<2?-1:1,k=i%2,ph=T*1.8+i*.9+(cf>0?cf*4:0);tent(s*(8+k*10),-14+fy,s*(30+k*26),24+k*6,ph,13,'#7a6ab0')}
  if(!W&&cf>0){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-20+fy,20+cf*20,'220,180,255',.6*cf);g.restore()}
  g.restore()}
function hdfReward(){if(dgRew)return;dgRew=1;const D=DT[25],st=stCur(),sto=st&&st.g==='hdf',gd=sto?D.gold:70000;HDLN=[];
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?20:6));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?30:8+(Math.random()*6|0),'ท่าเรือเมฆ')}catch(e){}try{ecGive(sto?30:8+(Math.random()*5|0),'ท่าเรือเมฆ')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.45)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  try{sdGive(sto?15:6,'ท่าเรือเมฆ')}catch(e){}
  if(sto){me.sty.n=1;me.sty.a=1}else me.hdT=Date.now();
  const al=hdfAlive().length;banner={s:'⚓ รุ่งเช้าแล้ว! คราเคนเมฆจมหาย · เครื่องดาวรอด '+al+'/3 · +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?20:6),t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe8b0','#ffffff','#c8b8ff','#a8d0ff'],140,300,1.7,{glow:1,g:-50});
  setTimeout(()=>{if(HDFI())enterMap(38,hdfBack())},10000)}
function instRepeatHdf(){const l=Math.max(0,(me.hdT||0)+30*60000-Date.now());
  stSay([['sara','คราเคนยังวนอยู่ใต้ท่าเรือทุกคืน ฝูงสัตว์เมฆก็ยังตามแสงเครื่องดาวมา… จะช่วยเฝ้าท่าอีกคืนไหม?']],()=>{},{choice:[[l>0?'⚓ เฝ้าท่าเรือ (อีก '+Math.ceil(l/60000)+' นาที)':'⚓ เฝ้าท่าเรือเมฆ (เศษดาว · หินขั้นสูง · ของ Lv 22)',1],['ไว้ก่อน',0]]});
  SD.onChoose=e=>{stClose();if(e===1){if(l>0){fx({k:'msg',s:'⚓ ชาวเรือยังพักเหนื่อยอยู่ · อีก '+Math.ceil(l/60000)+' นาที'});return}setTimeout(hdfEnter,250)}};return true}
/* ---------- ⛵ เรือเหาะ: วาปแผนที่โลกระหว่างท่าไม่ต้องรอคูลดาวน์ ---------- */
const P8DOCK=[1,9,32,38],p8Ship=id=>{try{return p6Past('p8c2')&&P8DOCK.includes(curMap)&&P8DOCK.includes(id)&&id!==curMap}catch(e){return false}};
/* ---------- เนื้อเรื่องภาค 8 บทที่ 2 ---------- */
Object.assign(SPK,{mek:['ยายเมฆา · ผู้เล่าเรื่องแห่งนาวาเมฆ','🪶','#e8d8ff'],bkc:['ลูกเรือเรือดำ','🏴','#b0b0c0']});
STCH.push('ภาค 8 · บทที่ 2 · ราคาของการเปิดประตู');
const STEND9=[null,
 [['me','(เดินไปที่ปลายสะพาน ยื่นมือให้ลูกเรือเรือดำคนแรก) ท่าเรือนี้เปิดให้ทุกคนที่ไม่มีที่ไป… รวมทั้งคนที่เคยทำผิดด้วย'],
  ['sara','(ซารากัดฟัน แล้วเก็บดาบเข้าฝักช้า ๆ) …ถ้ากริฟทรยศ ข้าจะเป็นคนแรกที่ทวงคืน'],
  ['bkc','(ลูกเรือคนนั้นทรุดลงร้องไห้) …ข้าจะกลับไปบอกกัปตัน ว่าที่นี่มีประตูที่ไม่ล็อก'],
  ['nar','คืนนั้นเรือดำจุดโคมเป็นครั้งแรกในรอบสิบปี แล้วเทียบท่าที่หัวผาเหนือ ห่างจากเรือลำอื่นพอสมควร… แต่ก็เทียบท่า']],
 [['me','(ยืนขวางปลายสะพาน) ท่าเรือนี้เปิดให้ทุกคน… ที่วางดาบลงทะเลเมฆก่อน'],
  ['bkc','(ลูกเรือมองดาบในมืออยู่นาน แล้วโยนมันลงไปในเมฆ) …พวกข้าวางได้ แต่กัปตันกริฟจะไม่มีวันวาง'],
  ['sara','(ซาราพยักหน้าช้า ๆ) ยุติธรรมดี เด็ก ๆ ขึ้นฝั่งได้ ส่วนเรือดำ… ให้มันลอยอยู่ข้างนอกจนกว่ากริฟจะยอม'],
  ['nar','เรือเล็กสามลำเทียบท่า เด็ก ๆ ก้าวลงพื้นไม้เป็นครั้งแรกในชีวิต ไกลออกไป เรือดำยังลอยมืดอยู่ที่ขอบฟ้า ไม่จุดโคมสักดวง']]];
{const C2=STCH.length-1;STY.push(
 {c:C2,g:'talk',k:'cmd',p8k:1,tx:'ประชุมสภาค่าย · จะรับกองเรือนาวาเมฆไหวไหม',
  pre:[['nar','รุ่งเช้า เรือเหาะสิบเอ็ดลำลอยนิ่งอยู่เหนือทะเลเมฆหน้าผาท่าเรือ ใบเรือปะชุนหลายสิบชั้น ผู้คนพันกว่าชีวิตยืนเกาะกราบเรือ มองแผ่นดินเหมือนมองของที่ไม่กล้าแตะ'],
   ['nar','ในโถงกลางของค่าย โต๊ะยาวถูกลากมาต่อกัน สภาค่ายประชุมเป็นครั้งแรกตั้งแต่คืนที่หัวใจดวงใหม่เต้น',0,0,0,0,0,1],
   ['nar','ใต้แสงหัวใจดวงใหม่กลางนครลี้ภัย โต๊ะยาวถูกลากมาต่อกัน สภานครประชุมเป็นครั้งแรกตั้งแต่ค่ายลอยพ้นดิน',0,0,0,0,0,2],
   ['cmd','กัปตันซาราขอที่จอดเรือ น้ำ อาหาร และที่ให้คนแก่กับเด็กได้นอนบนพื้นที่ไม่โคลงเคลง… พันสามร้อยคน'],
   ['brom','พันสามร้อยปาก! เสบียงทั้งค่ายพอเลี้ยงคนเพิ่มได้ไม่ถึงครึ่งเดือน ใครจะจ่าย? ข้าไม่ได้ใจดำนะ ข้าแค่นับเลขเป็น',0,0,0,0,1],
   ['wk','สหกรณ์คนงานคาร์นเคยเป็นคนแปลกหน้าที่ที่นี่รับไว้… แต่พวกเราก็กินข้าวจากยุ้งเดียวกัน และยุ้งนั้นไม่ได้ใหญ่ขึ้นเลย',0,0,0,0,2],
   ['cel','อัสตรายินดีส่งเสบียงช่วย แต่ข้าต้องถามคำถามที่ไม่มีใครอยากถาม… อะไรที่ไล่ล่าพวกเขามาสามร้อยปี และมันจะตามมาถึงที่นี่ไหม'],
   ['sara','(ซารายืนตัวตรงอยู่ปลายโต๊ะ) กองเรือนาวาเมฆไม่ได้มาขอทาน เรือของเรายังซ่อมได้ แขนของเรายังทำงานได้ ให้ที่จอดเรา แล้วเราจะจ่ายด้วยแรง'],
   ['til','(ทิลกระซิบ) ท่านผู้นำ… นาวินบอกข้าว่าบนเรือมีเด็กที่ไม่เคยเห็นต้นไม้จริง ๆ เลยสักต้น'],
   ['cmd','(เรนน์มองหน้าทุกคนรอบโต๊ะ แล้วหันมาทางผู้ถือตรา) ที่นี่เกิดจากคนที่ประตูเมืองอื่นปิดใส่ ข้าจะไม่เป็นคนปิดประตูใส่ใคร'],
   ['cmd','แต่บรอมพูดถูกเรื่องหนึ่ง… ข้าวในยุ้งไม่พอ',0,0,0,0,1],
   ['cmd','แต่สหกรณ์พูดถูกเรื่องหนึ่ง… ข้าวในยุ้งไม่พอ',0,0,0,0,2],
   ['cmd','ผู้นำ ไปที่ท่าเรือ ช่วยกองเรือรวบรวมเสบียง แล้วช่วยพวกเขาซ่อมเรือ เรือที่บินได้คือเรือที่ไม่ต้องพึ่งใคร']],rw:{g:120000}},
 {c:C2,g:'clue',m:38,n:3,p8sp:1,tx:'ส่งเสบียงที่คลังเสบียงท่าเรือ: สมุนไพร 10 · แร่ 10 · ปลา 5 (เก็บได้บนผานี้ · ปลาตกที่ปลายสะพานกลาง)',
  pre:[['navin','คลังเสบียงอยู่ข้างบ้านท่าเรือ! ยายเมฆาบอกว่าต้องการสามอย่าง สมุนไพรไว้ทำยา แร่ไว้ซ่อมโครงเรือ แล้วก็ปลา… คนบนเรือกินปลาเมฆจนเบื่อแล้วก็จริง แต่ไม่มีอะไรจะกินมากกว่านั้น'],
   ['navin','บนผานี้มีสายแร่กับกอสมุนไพรขึ้นอยู่หลายจุด ส่วนปลาตกได้ที่ปลายสะพานกลาง! ถ้ามีติดตัวอยู่แล้วก็เอามาส่งได้เลย']],
  post:[['nar','ลังเสบียงถูกส่งต่อมือต่อมือขึ้นไปบนเรือ ไม่มีใครสั่ง แต่ทั้งชาวค่ายและชาวเรือยืนเรียงกันเป็นแถวยาวจากคลังถึงสะพาน'],
   ['mek','(หญิงชราผมขาวโพลนนั่งอยู่บนลังไม้ ยิ้มจนตาหยี) ยายไม่ได้กินผักสดมาตั้งแต่ยังสาว… ขอบใจนะลูก ขอบใจจริง ๆ']],rw:{g:90000}},
 {c:C2,g:'clue',m:38,n:4,p8rp:1,tx:'ซ่อมเรือ 4 ลำที่เทียบท่า (ยืนในวง 🔨 บนสะพานข้างเรือ แล้วกด 🔨 ตอนเข็มอยู่ในแถบเขียว)',
  pre:[['sara','เรือสี่ลำที่เทียบท่าเสียหนักที่สุด ใบลมขาด โครงร้าว… ช่างของข้าเหลือไม่พอ'],['sara','ยืนในวงซ่อมบนสะพานข้างเรือ ตอกหมุดให้ตรงจังหวะ ตอกพลาดหมุดจะเด้งหลุด']],
  post:[['nar','เรือลำสุดท้ายกางใบลมขึ้น ลมทะเลเมฆพัดใบพองเต็มเป็นครั้งแรกในรอบหลายเดือน ชาวเรือโห่ร้องดังไปถึงค่าย'],
   ['navin','(นาวินชี้ไปที่ขอบฟ้า เข็มทิศเสียงในมือสั่น) …ท่านผู้นำ มีเรืออีกลำ เรือที่ไม่จุดโคมเลยสักดวง']],rw:{g:90000,s3:5}},
 {c:C2,g:'talk',k:'sara',p8bk:1,tx:'คุยกับกัปตันซารา · เรือที่ไม่จุดโคม',
  pre:[['sara','(ซาราส่องกล้องไปที่ขอบฟ้าอยู่นาน) …«เรือดำ» ของกริฟ'],
   ['sara','กริฟเคยเป็นต้นหนที่เก่งที่สุดในกองเรือ จนคืนที่เครื่องดาวของเรือเขาเริ่มดับ เขาขอแกนดาวสำรองจากเรือลำอื่น สภากองเรือปฏิเสธ… เขาเลยขโมยแล้วหนีไป'],
   ['sara','สิบปีมานี้ เรือดำปล้นเรือทุกลำที่ผ่านทาง ไม่เอาทอง ไม่เอาเสบียง เอาแต่แกนดาว'],
   ['navin','ข้าได้ยินเสียงแตรต้อนเมฆจากเรือลำนั้น! เขาไล่ฝูงสัตว์เมฆมาทางนี้! แล้วก็… มีอะไรตัวใหญ่มากตามมาใต้เมฆด้วย'],
   ['sara','คืนนี้เครื่องดาวของเรือที่เพิ่งซ่อมจะถูกยกลงมาบนลานไม้ ผู้ถือตรา… ช่วยเราเฝ้าท่าเรือคืนนี้ได้ไหม']],rw:{g:60000}},
 {c:C2,g:'hdf',k:'sara',p8df:1,tx:'ป้องกันท่าเรือเมฆ: ปกป้องเครื่องดาว 3 เครื่องจนรุ่งเช้า (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['sara','เครื่องดาวสามเครื่องถูกยกลงมาวางบนลานไม้หน้าท่าแล้ว… ถ้ามันถูกปล้นหรือพัง เรือสามลำนั้นจะไม่มีวันบินได้อีก'],['sara','พร้อมเมื่อไหร่บอกข้า เราจะยืนเฝ้าด้วยกันจนเช้า']],
  post:[['nar','คราเคนเมฆจมหายลงไปในทะเลเมฆ ทิ้งไว้แค่รอยกระเพื่อมยาวเหยียด… และบนขอบฟ้า เรือดำค่อย ๆ ถอยห่างออกไป'],
   ['nar','แต่ไม่ได้ถอยไปทั้งหมด เรือเล็กสามลำแยกตัวออกมา ลอยตรงมาที่ท่าเรือ ชูธงขาวผืนเก่าซีด'],
   ['sara','(ซาราดึงดาบออกครึ่งฝัก) …ลูกเรือของกริฟ']]},
 {c:C2,g:'talk',k:'sara',p8g:1,tx:'ตัดสินใจ: ท่าเรือนี้จะเปิดให้ใครบ้าง',
  pre:[['nar','คนบนเรือเล็กผอมโซ หลายคนยังเป็นเด็ก พวกเขาวางดาบไว้ที่หัวเรือ… แต่ยังไม่ได้ทิ้งมันลงทะเลเมฆ'],
   ['bkc','พวกเราไม่ได้มาสู้… เครื่องดาวบนเรือดำเหลือแสงไม่ถึงเดือน กัปตันกริฟส่งพวกเรามาขอที่จอด… เพื่อเด็ก ๆ บนเรือ'],
   ['sara','เขาปล้นเรามาสิบปี! แล้วเมื่อคืนก็เพิ่งต้อนสัตว์เมฆมาใส่ท่าเรือ!'],
   ['bkc','คราเคนตามแสงเครื่องดาวของเรือดำมาสามคืนแล้ว… กัปตันแค่ต้อนฝูงเมฆมาให้มันกินแทนพวกเรา เราไม่รู้ว่ามันจะตามมาถึงที่นี่'],
   ['cmd','(เรนน์มาถึงท่าเรือตั้งแต่เมื่อไหร่ไม่มีใครรู้) …ผู้ถือตรา ประตูของเราเปิดให้คนที่ไม่มีที่ไปเสมอ แต่ท่าเรือนี้เป็นของกองเรือด้วย ท่านตัดสินเถอะ']],
  post:[['nar','⚓ การตัดสินใจครั้งนี้จะถูกจดจำ ทั้งในกองเรือ… และบนเรือดำ']],rw:{g:80000,s3:5}},
 {c:C2,g:'talk',k:'navin',p8c2:1,tx:'คุยกับนาวิน · เรือเหาะพร้อมออกเดินทาง',
  pre:[['navin','ท่านผู้นำ! เรือที่ซ่อมแล้วสี่ลำตกลงจะเป็น «เรือเหาะประจำทาง» ให้เลย! จากท่าเรือนี้ไปค่าย ไปนครอัสตรา ไปอารัณยา ไม่ต้องเดินอีกแล้ว!'],
   ['nar','💡 ปลดล็อก ⛵ เรือเหาะ: เปิดแผนที่โลกแล้ววาประหว่าง ค่ายผู้อพยพ · นครอัสตรา · ซากอารัณยา · ผาท่าเรือเมฆ ได้ไม่ต้องรอคูลดาวน์'],
   ['navin','เรือดำ… จุดโคมแล้ว! ข้าไม่เคยเห็นมันมีแสงเลยสักครั้ง',0,0,0,0,0,0,1],
   ['navin','เรือดำยังลอยมืดอยู่ข้างนอก… ข้าว่าเด็ก ๆ บนนั้นคงหนาวน่าดู',0,0,0,0,0,0,2],
   ['cel','(เซเลสต์เดินลงมาตามทางลาดพร้อมม้วนกระดาษ) ผู้ถือตรา… คืนที่คราเคนโผล่ กล้องใหญ่บนหอดูดาวเห็นอะไรบางอย่าง'],
   ['cel','แสงดาวไหลลงทะเลเมฆเป็นสาย ทางตะวันออกไกลออกไป… ตรงที่ชาวเรือเรียกว่า «สุสานเรือ» ที่ที่เรือร้อยลำจมแล้วไม่เคยมีใครกลับมา'],
   ['navin','(นาวินกอดเข็มทิศเสียงแน่น) …เข็มทิศชี้ไปทางนั้นตั้งแต่เมื่อคืน ข้าไม่เคยเห็นมันชี้ไปไหนแรงขนาดนี้']],
  post:[['nar','⛵ — จบภาค 8 บทที่ 2 · ราคาของการเปิดประตู — บทต่อไป: สุสานเรือ (เร็ว ๆ นี้)']],rw:{g:150000,s3:10}})}
setTimeout(()=>{
  try{DGTH[25]='harbor'}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p8sp||st.p8rp)return p8AqT(st);return _q(st)}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=72000&&id<73000)return hdfMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(HDFI())return hdfStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(HDFI())return hdfSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(HDFI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return hdfReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=HDFI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(HDFI()){enterMap(38,hdfBack());sysMsg('⚓ ท่าเรือถอยทัพ… คุยกับกัปตันซาราเพื่อลองใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(HDFI()){const e='⚙️ '+HDF.e.map(v=>Math.ceil(Math.max(0,v))).join('/');return dg.ph==='run'?'⚓ '+e+' · '+(HDF.st==='wave'?'คลื่น '+HDF.wv+'/3':'พักคลื่น')+' · ⏱ '+fmtT(dg.tl):dg.ph==='boss'?'🐙 คราเคนเมฆ · '+e+' · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'⚓ รุ่งเช้าแล้ว! ท่าเรือรอด':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'⚓ ลานไม้หน้าท่า · กด "เริ่ม" เมื่อพร้อม'}return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(HDFI()){ov.hidden=true;sfx('gate');enterMap(38,hdfBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(hdfFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{hdfDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{hdfScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='hdf')return instRepeatHdf();return _ir(k)}}catch(e){}
  /* ⛵ เรือเหาะ */
  try{const _ww=wmWhy;window.wmWhy=wmWhy=function(id){const r=_ww(id);if(r&&/^วาปได้อีกครั้งใน/.test(r)&&p8Ship(id))return'';return r}}catch(e){}
  try{const _wg=wmGo;window.wmGo=wmGo=function(id){const sh=p8Ship(id)&&!WMW;_wg(id);if(sh&&WMW){WMW.ship=1;banner={s:'⛵ ขึ้นเรือเหาะไป '+MAPS[id].n+'… (ขยับตัวเพื่อยกเลิก)',t:WMCH+.3}}}}catch(e){}
  try{const _wu=wmUI;window.wmUI=wmUI=function(sel,msg){_wu(sel,msg);try{if(p6Past('p8c2')&&ov.dataset.k==='wm'){const s=sel||WMSEL;const box=ov.querySelector('.card:last-child')||ov.querySelector('.pn');if(box&&!ov.querySelector('.p8wm')){const d=document.createElement('div');d.className='p8wm';d.style.cssText='margin-top:6px;padding:6px 9px;border-radius:10px;background:rgba(120,190,255,.1);border:1px solid rgba(120,190,255,.35);font-size:11.5px;line-height:1.45';
    d.innerHTML='⛵ <b>เรือเหาะ</b>: ค่ายผู้อพยพ · นครอัสตรา · ซากอารัณยา · ผาท่าเรือเมฆ — วาประหว่างท่าได้ไม่ต้องรอคูลดาวน์'+(P8DOCK.includes(curMap)&&P8DOCK.includes(s)&&s!==curMap?' <b style="color:#9fe0ff">(เส้นทางนี้ใช้เรือเหาะ)</b>':'');box.appendChild(d)}}}catch(e){}}}catch(e){}
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur(),q=me.sty;if(st&&st.p8g&&q&&!q.p8g){q.a=2;setTimeout(()=>{stSay([['me','(ทุกสายตาบนท่าเรือจับจ้องมา… ท่าเรือนี้ควรเปิดให้ใคร?)']],()=>{},{cine:1,choice:[['🚪 เปิดท่าให้ทุกลำ รวมเรือดำ',1],['🛡️ รับเฉพาะเรือที่วางอาวุธลงทะเลเมฆ',2]]});
      SD.onChoose=e=>{q.p8g=e;stClose();setTimeout(()=>stSay(STEND9[e],()=>{_st();setTimeout(()=>{banner={s:e===1?'🚪 ท่าเรือนาวาเมฆเปิดให้ทุกลำ · เรือดำจุดโคมเทียบท่า':'🛡️ ท่าเรือรับเฉพาะเรือที่วางอาวุธ · เรือดำยังลอยรออยู่ข้างนอก',t:6};try{stFlash()}catch(_){}},600)},{cine:1}),250)}},200);return}
    if(st&&st.p8rp)setTimeout(()=>{try{sdGive(5,'ชาวเรือขอบคุณ')}catch(e){}},400);if(st&&st.p8c2)setTimeout(()=>{try{sdGive(10,'ของขวัญจากกองเรือ')}catch(e){}},400);return _st()}}catch(e){}
},0);
