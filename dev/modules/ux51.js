/* ---------- v432 งานภาพรอบ 3 ----------
   ① แผงเควสไม่บังจอ: ตอนเดิน/สู้ย่อเหลือหัวข้อบรรทัดเดียวโปร่งแสง (หยุดนิ่ง 1.8 วิแล้วขยายให้อ่าน) · ใกล้บอส/ในลานบอสซ่อนเอง · ว่างแล้วกลับมาเต็ม
   ② ลำแสงของดรอป: ชั้นลึกลับ(ม่วง)ขึ้นไปมีลำแสงตามสี + ประกาย · ได้ของ Relic+/ตำนาน/ชุดเซ็ต → การ์ดโชว์ของกลางจอ
   ③ ฉากเปิดตัวบอส: เข้าใกล้บอสครั้งแรก (ต่อแมพ ต่อการเข้าเล่น) → แถบดำบนล่าง กล้องเลื่อนไปที่บอส ชื่อบอสกระแทกจอ แล้วกลับ (ระหว่างนั้นไม่โดนตี)
   ④ ค่ายมีชีวิต: ชาวค่ายเดินตามถนน/ลานกองไฟ คนยืนผิงไฟ เด็กวิ่งไล่กัน ไก่จิกพื้น หมาเดินตามผู้เล่น · คำพูดลอยเป็นระยะ
   ⑤ ฉากตาย/ฟื้น: จอค่อย ๆ เป็นขาวดำ + ป้าย «ล้มลงแล้ว…» · ฟื้นแล้วมีแสงสีทองนำกลับมา
   ⑥ แผนที่เล็ก: ไอคอนบอส (เต้นตอนยังมีชีวิต) · ประตูวาร์ป · จุดเก็บวัตถุดิบ · สายแร่ยักษ์ · เพื่อนปาร์ตี้ */
const VZ3={cmb:0,lastFight:0,bi:{},bx:null,dead:0,show:[],showing:0,vil:null,say:0};
function vz3CSS(){if($('vz3css'))return;const s=document.createElement('style');s.id='vz3css';s.textContent=
 /* ① */
 '#topb.vzmin #stq:not(.min)>*:not(b):not(i),#topb.vzmin #rnq>*:not(b):not(i),#topb.vzmin #rbq>*:not(b):not(i){display:none!important}'+
 '#topb.vzmin #stq,#topb.vzmin #rnq,#topb.vzmin #rbq{opacity:.72;max-width:150px!important;padding:3px 8px!important;transition:opacity .3s}'+
 '#topb.vzmin #stq b,#topb.vzmin #rnq b,#topb.vzmin #rbq b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0!important}'+
 '#topb.vzhide #stq,#topb.vzhide #rnq,#topb.vzhide #rbq{display:none!important}'+
 /* ② */
 '#vzs{position:fixed;left:50%;top:30%;transform:translate(-50%,-50%);z-index:63;pointer-events:none;text-align:center;opacity:0}#vzs.on{animation:vzsI 3.6s ease-out forwards}'+
 '#vzs .cd{position:relative;width:200px;padding:16px 14px 12px;border-radius:16px;background:radial-gradient(ellipse at 50% 30%,rgba(60,40,80,.96),rgba(14,10,22,.97));border:2px solid var(--vc);box-shadow:0 0 30px var(--vc),inset 0 0 20px rgba(255,255,255,.06);overflow:hidden}'+
 '#vzs .cd::before{content:"";position:absolute;inset:-50%;background:conic-gradient(from 0deg,transparent,var(--vc),transparent 30%,transparent 50%,var(--vc),transparent 80%);opacity:.25;animation:vzsR 3s linear infinite}'+
 '#vzs .ic{position:relative;font-size:46px;line-height:56px;height:56px;filter:drop-shadow(0 0 10px var(--vc))}#vzs .ic svg{width:50px;height:50px}'+
 '#vzs .rk{position:relative;font:800 11px system-ui;letter-spacing:.2em;color:var(--vc);margin-top:6px;text-shadow:0 0 8px rgba(0,0,0,.8)}#vzs .nm{position:relative;font:800 16px system-ui;color:#fff;margin-top:3px;text-shadow:0 2px 6px #000;white-space:normal}#vzs .ds{position:relative;font:12px system-ui;color:#e8dcc8;margin-top:5px;white-space:normal;line-height:1.35}'+
 '@keyframes vzsI{0%{opacity:0;transform:translate(-50%,-50%) scale(.5) rotateY(90deg)}14%{opacity:1;transform:translate(-50%,-50%) scale(1.05) rotateY(0)}20%{transform:translate(-50%,-50%) scale(1)}85%{opacity:1}100%{opacity:0;transform:translate(-50%,-62%) scale(.9)}}@keyframes vzsR{to{transform:rotate(360deg)}}'+
 /* ③ */
 '#vzbx{position:fixed;inset:0;z-index:58;pointer-events:none;overflow:hidden}#vzbx[hidden]{display:none}#vzbx i{position:absolute;left:0;right:0;height:12%;background:#000;transition:transform .5s ease}#vzbx .t{top:0;transform:translateY(-101%)}#vzbx .b{bottom:0;transform:translateY(101%)}#vzbx.on .t,#vzbx.on .b{transform:none}'+
 '#vzbx .nm{position:absolute;left:0;right:0;bottom:16%;text-align:center;opacity:0}#vzbx.nmon .nm{animation:vzbN 2.2s ease-out forwards}'+
 '#vzbx .nm small{display:block;font:700 12px system-ui;letter-spacing:.3em;color:#ff9a8a;text-shadow:0 2px 6px #000}#vzbx .nm b{display:block;font:900 30px "Cinzel",Georgia,system-ui;color:#fff3e0;letter-spacing:.04em;text-shadow:0 0 16px rgba(255,80,60,.8),0 3px 8px #000}#vzbx .nm em{display:block;font:italic 12px system-ui;color:#e8d8c0;margin-top:4px;text-shadow:0 2px 6px #000}'+
 '@keyframes vzbN{0%{opacity:0;transform:scale(1.8);letter-spacing:.4em}12%{opacity:1;transform:scale(1)}85%{opacity:1}100%{opacity:0}}'+
 /* ⑤ */
 '#c.vzdead{filter:grayscale(.9) brightness(.8) contrast(1.05);transition:filter 1.2s ease}#c{transition:filter .8s ease}'+
 '#vzd{position:fixed;left:50%;top:50%;transform:translateX(-50%);z-index:57;pointer-events:none;text-align:center;opacity:0;font:800 26px "Cinzel",Georgia,system-ui;color:#e8d8d8;text-shadow:0 0 14px rgba(160,20,20,.8),0 3px 8px #000;letter-spacing:.06em;white-space:nowrap}#vzd.on{animation:vzdI 1.6s ease-out forwards}#vzd small{display:block;font:600 12px system-ui;color:#cfc0c0;letter-spacing:.1em;margin-top:4px}'+
 '@keyframes vzdI{0%{opacity:0;transform:translate(-50%,8px)}40%{opacity:1;transform:translate(-50%,0)}100%{opacity:1}}';document.head.appendChild(s)}
/* ---------- ① แผงเควส ---------- */
function vz3Fight(){const now=performance.now();let near=0,boss=0;try{for(const m of mons){if(m.hp<=0||m.pv||m.dum)continue;const d=Math.hypot(m.x-me.x,m.y-me.y);if(m.t===3&&d<620)boss=1;if(m.t<3&&d<260)near=1}}catch(e){}
  try{if(isWB()||(isDg()&&dg&&dg.ph==='boss'))boss=1}catch(e){}try{if(me.down>0)near=1}catch(e){}try{const P=VZ3.pp||(VZ3.pp={x:me.x,y:me.y});if(Math.hypot(me.x-P.x,me.y-P.y)>3)near=1;P.x=me.x;P.y=me.y}catch(e){}if(near||boss)VZ3.lastFight=now;return{boss,fight:now-VZ3.lastFight<1800}}
function vz3HudTick(){const T=$('topb');if(!T||!me.cls)return;const F=vz3Fight();T.classList.toggle('vzhide',!!F.boss);T.classList.toggle('vzmin',!F.boss&&F.fight)}
/* ---------- ② ลำแสงดรอป + การ์ดโชว์ของ ---------- */
const VZRC=['#d8d8e0','#3ad06a','#3a8cff','#b060ff','#ffb020','#ff3b4a','#ff7ad9'];
function vz3Beams(){const t=performance.now()/1000;try{for(const d of drops){if(d.k!=='e'||d.lg||(d.rm|0)<3||d.t<=0)continue;const y=d.y-4;if(!inView(d.x,y-80,60))continue;const rc=h2r(VZRC[Math.min(6,d.rm|0)]),hh=70+(d.rm|0)*18,pu=.5+.2*Math.sin(t*4+d.x);
  g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,y-hh,0,y+4);gr.addColorStop(0,'rgba('+rc+',0)');gr.addColorStop(1,'rgba('+rc+','+pu+')');g.fillStyle=gr;g.fillRect(d.x-5,y-hh,10,hh+4);g.fillStyle='rgba(255,255,255,'+(pu*.6)+')';g.fillRect(d.x-1.2,y-hh*.8,2.4,hh*.8+4);
  for(let i=0;i<4;i++){const q=(t*.8+i/4+d.x*.01)%1;g.fillStyle='rgba('+rc+','+(1-q)+')';g.beginPath();g.arc(d.x+Math.sin(i*2+t*3)*6,y-q*hh*.9,1.6,0,7);g.fill()}g.restore()}}catch(e){}}
function vz3Show(it){VZ3.show.push(it);if(!VZ3.showing)vz3Next()}
function vz3Next(){const it=VZ3.show.shift();if(!it){VZ3.showing=0;return}VZ3.showing=1;vz3CSS();let e=$('vzs');if(!e){e=document.createElement('div');e.id='vzs';document.body.appendChild(e)}
  let col=RCL[it.r]||'#ffd84a',rk=(RN[it.r]||'').split('·')[0].trim(),ds='';try{if(it.lg&&LGD[it.lg]){col=LGD[it.lg].c||'#ffd84a';rk='★ ตำนาน · '+rk;ds=LGD[it.lg].i+' '+LGD[it.lg].d}else if(it.ss&&SETS[it.ss]){col='#ff7ad9';rk='ชุดเซ็ต · '+rk;ds=SETS[it.ss].n||''}}catch(_){}
  let ic='🎁';try{ic=SI[it.sl]||ic;const h=itIcoImg(it,it.sl,50);if(h)ic=h}catch(_){}let nm='';try{nm=itemName(it)}catch(_){}
  e.style.setProperty('--vc',col);e.innerHTML='<div class="cd"><div class="ic">'+ic+'</div><div class="rk">'+rk+'</div><div class="nm">'+String(nm).replace(/</g,'&lt;')+'</div>'+(ds?'<div class="ds">'+String(ds).replace(/</g,'&lt;')+'</div>':'')+'</div>';
  e.classList.remove('on');void e.offsetWidth;e.classList.add('on');setTimeout(vz3Next,3700)}
/* ---------- ③ เปิดตัวบอส ---------- */
function vz3BossCheck(){if(!me.cls||!run||me.down>0||VZ3.bx||!ov.hidden)return;try{if(SD.on||(typeof RT3!=='undefined'&&RT3&&RTEI())||isWB()||isTw()||isArena())return}catch(e){}
  for(const m of mons){if(m.t!==3||m.hp<=0||m.pv||m.dum||m.wb||m.mir)continue;const d=Math.hypot(m.x-me.x,m.y-me.y);if(d>440)continue;const key=curMap+':'+(m.mvp?'mvp':'b')+':'+((MAPS[curMap]&&MAPS[curMap].boss&&MAPS[curMap].boss.n)||m.t);if(VZ3.bi[key])continue;VZ3.bi[key]=1;vz3BossIntro(m);break}}
function vz3BossIntro(m){vz3CSS();let e=$('vzbx');if(!e){e=document.createElement('div');e.id='vzbx';e.innerHTML='<i class="t"></i><i class="b"></i><div class="nm"></div>';document.body.appendChild(e)}
  const B=MAPS[curMap]&&MAPS[curMap].boss,nm=(B&&B.n)||'บอส',k=m.mvp?'👑 บอส MVP':(isDg()?'🗝️ ผู้พิทักษ์ดันเจี้ยน':'☠️ บอสประจำแมพ'),L=(B&&B.L)||m.L||'';
  e.querySelector('.nm').innerHTML='<small>'+k+'</small><b>'+String(nm).replace(/</g,'&lt;')+'</b><em>'+(L?'Lv '+L+' · ':'')+(m.mvp?'รวมพลังกันล้ม แย่งชิงตำแหน่ง MVP!':'เตรียมตัวให้พร้อม!')+'</em>';
  e.hidden=false;e.classList.remove('on','nmon');void e.offsetWidth;e.classList.add('on');VZ3.bx={id:m.id,t0:performance.now(),x0:me.x,y0:me.y};try{me.inv3=Math.max(me.inv3||0,3.6)}catch(_){}try{sfx('boss')}catch(_){}
  setTimeout(()=>{const q=$('vzbx');if(q)q.classList.add('nmon');try{shk=Math.max(shk||0,.25)}catch(_){}},700);
  setTimeout(()=>{const q=$('vzbx');if(q)q.classList.remove('on')},2900);setTimeout(()=>{const q=$('vzbx');if(q){q.hidden=true;q.classList.remove('nmon')}VZ3.bx=null},3500)}
function vz3Cam(){const X=VZ3.bx;if(!X)return null;const m=mons.find(q=>q.id===X.id);if(!m)return null;const e=(performance.now()-X.t0)/1000,ease=v=>v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2;
  let k=e<.8?ease(e/.8):e<2.5?1:e<3.3?1-ease((e-2.5)/.8):0;if(e>=3.3)return null;return[me.x+(m.x-me.x)*k,(me.y-20)+(m.y-60-(me.y-20))*k]}
/* ---------- ④ ค่ายมีชีวิต ---------- */
const VZSAY=['ได้ข่าวว่าบอส MVP โผล่อีกแล้ว','วันนี้อากาศดีจัง','ขอบคุณที่ช่วยปกป้องค่ายนะ','ข้าวต้มที่กองไฟหอมมาก','เด็ก ๆ อย่าวิ่งใกล้กองไฟ!','กิลด์ไหนล้มอสูรกิลด์ได้บ้าง?','สายแร่ยักษ์โผล่ที่หุบเขาเมื่อกี้','ระวังร่างราตรีตอนกลางคืนนะ','ฝนจะตกหรือเปล่าน้า','อยากได้ชุดซากุระบ้างจัง'];
function vz3Graph(){const N=[],R1=118,R2=300;for(let i=0;i<8;i++){const a=i*Math.PI/4;N.push({x:CX+Math.cos(a)*R1,y:CY+Math.sin(a)*R1*.92})}for(let i=0;i<4;i++){const a=i*Math.PI/2;N.push({x:CX+Math.cos(a)*R2,y:CY+Math.sin(a)*R2})}
  const E=N.map((_,i)=>i<8?[(i+1)%8,(i+7)%8].concat(i%2===0?[8+i/2]:[]):[(i-8)*2]);return{N,E}}
function vz3Vil(){if(VZ3.vil)return VZ3.vil;const G=vz3Graph(),cls=['merchant','melee','archer','mage','sup','merchant'],V=[];
  for(let i=0;i<6;i++){const n=(i*3)%8;V.push({k:'w',c:cls[i],x:G.N[n].x,y:G.N[n].y,n,to:G.E[n][0],sp:34+i*4,hd:(i*7)%12,ar:(i*5)%9,sc:1,fx:1,ph:i})}
  for(let i=0;i<3;i++){const a=Math.PI*.6+i*.5;V.push({k:'s',c:['melee','sup','merchant'][i],x:CX+Math.cos(a)*64,y:CY+Math.sin(a)*52,hd:(i*4)%12,ar:(i*3)%9,sc:1,fx:Math.cos(a)>0?-1:1,ph:i})}
  for(let i=0;i<2;i++)V.push({k:'kid',c:['archer','mage'][i],x:CX+90,y:CY,a:i*Math.PI,sc:.68,fx:1,ph:i,hd:0,ar:0});
  for(let i=0;i<3;i++)V.push({k:'hen',x:CX+170+i*24,y:CY-160+i*14,tx:0,ty:0,w:0,ph:i,fx:1});
  V.push({k:'dog',x:CX-140,y:CY+150,tx:0,ty:0,w:0,ph:0,fx:1});VZ3.vil={V,G};return VZ3.vil}
function vz3VilTick(dt){if(curMap!==1||!me.cls||!run)return;const{V,G}=vz3Vil(),t=performance.now()/1000;
  for(const v of V){if(v.k==='w'){const T=G.N[v.to],dx=T.x-v.x,dy=T.y-v.y,d=Math.hypot(dx,dy);v.mv=1;if(d<4){v.n=v.to;const E=G.E[v.n];v.to=E[(Math.random()*E.length)|0];if(Math.random()<.25)v.wait=1.5+Math.random()*3}
      if(v.wait>0){v.wait-=dt;v.mv=0;continue}const s=Math.min(d,v.sp*dt);v.x+=dx/d*s;v.y+=dy/d*s;if(Math.abs(dx)>1)v.fx=dx<0?-1:1}
    else if(v.k==='kid'){v.a+=dt*1.3;const px=v.x;v.x=CX+Math.cos(v.a)*(100+Math.sin(v.a*2)*8);v.y=CY+Math.sin(v.a)*92;v.fx=v.x<px?-1:1;v.mv=1}
    else if(v.k==='hen'||v.k==='dog'){v.w-=dt;const dd=Math.hypot(me.x-v.x,me.y-v.y);
      if(v.k==='dog'&&dd<260&&dd>46){v.tx=me.x-30*(me.x>v.x?1:-1);v.ty=me.y+10;v.w=.5}
      if(v.w<=0){v.w=2+Math.random()*4;const a=Math.random()*6.28,r=v.k==='hen'?40:120;v.tx=v.x+Math.cos(a)*r;v.ty=v.y+Math.sin(a)*r*.6;const dc=Math.hypot(v.tx-CX,v.ty-CY);if(dc>320||dc<90){v.tx=CX+(v.tx-CX)*200/Math.max(1,dc);v.ty=CY+(v.ty-CY)*200/Math.max(1,dc)}}
      const dx=v.tx-v.x,dy=v.ty-v.y,d=Math.hypot(dx,dy),sp=v.k==='dog'?(dd<260?150:60):26;v.mv=d>3;if(d>3){const s=Math.min(d,sp*dt);v.x+=dx/d*s;v.y+=dy/d*s;if(Math.abs(dx)>1)v.fx=dx<0?-1:1}}}
  if(t>VZ3.say){const _cr=typeof u53Crowd==='function'?u53Crowd(me.x,me.y,280):1;VZ3.say=t+(10+Math.random()*7)*(_cr>=4?2.4:_cr>=2?1.6:1);const _P=typeof u53Pl==='function'?u53Pl():[[me.x,me.y]];const L=V.filter(v=>(v.k==='w'||v.k==='s')&&Math.hypot(v.x-me.x,v.y-me.y)<240&&_P.every(([px,py])=>Math.hypot(v.x-px,v.y-py)>80));if(L.length){const v=L[(Math.random()*L.length)|0];v.sy=VZSAY[(Math.random()*VZSAY.length)|0];v.st=t+3.5}}}
function vz3Char(v,t){const g0={CHA,CHS,CHE};try{CHA={mv:v.mv?1:0,fx:v.fx,cast:null,it:t};CHS={h:0,c:0};CHE=null;g.save();g.translate(v.x,v.y);g.scale(v.sc,v.sc);
    drawChar(0,0,v.c,v.fx,v.mv?t*(v.k==='kid'?12:8)+v.ph:0,v.hd|0,t,0,0,v.ar|0,0,0);g.restore()}catch(e){g.restore()}finally{CHA=g0.CHA;CHS=g0.CHS;CHE=g0.CHE}}
function vz3VilDraw(){if(curMap!==1||!VZ3.vil)return;const t=performance.now()/1000,lq=vzLow();const L=VZ3.vil.V.filter(v=>inView(v.x,v.y-20,40)).sort((a,b)=>a.y-b.y);let n=0;
  for(const v of L){if(v.k==='hen'){const pk=!v.mv&&Math.sin(t*6+v.ph)>.6?3:0;g.save();g.translate(v.x,v.y);g.scale(v.fx,1);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,2,6,2,0,0,7);g.fill();g.fillStyle='#f4efe4';g.beginPath();g.ellipse(0,-5,6,4.6,0,0,7);g.fill();g.beginPath();g.arc(4,-9+pk,3,0,7);g.fill();g.fillStyle='#e04a3a';g.fillRect(3.5,-13+pk,2,2.4);g.fillStyle='#f0b030';g.fillRect(6.5,-9+pk,2.4,1.2);g.strokeStyle='#d8a030';g.lineWidth=1;g.beginPath();g.moveTo(-1,-1);g.lineTo(-1,2);g.moveTo(1,-1);g.lineTo(1,2);g.stroke();g.restore();continue}
    if(v.k==='dog'){const wg=Math.sin(t*14)*.5,st=v.mv?Math.sin(t*14)*2:0;g.save();g.translate(v.x,v.y);g.scale(v.fx,1);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,2,11,3,0,0,7);g.fill();g.fillStyle='#b07840';g.fillRect(-8,-4+st*.2,2.4,6);g.fillRect(5,-4-st*.2,2.4,6);g.beginPath();g.ellipse(0,-7,10,5.4,0,0,7);g.fill();
      g.beginPath();g.arc(10,-12,4.6,0,7);g.fill();g.fillStyle='#8a5a2a';g.beginPath();g.ellipse(9,-16,1.8,3,-.3,0,7);g.fill();g.fillStyle='#1a1008';g.beginPath();g.arc(14,-12,1.2,0,7);g.fill();g.beginPath();g.arc(11,-13,.8,0,7);g.fill();
      g.strokeStyle='#b07840';g.lineWidth=2;g.lineCap='round';g.beginPath();g.moveTo(-9,-9);g.lineTo(-14,-14+wg*6);g.stroke();g.restore();continue}
    if(lq&&n>=5)continue;n++;g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(v.x,v.y+14*v.sc,9*v.sc,3*v.sc,0,0,7);g.fill();vz3Char(v,t);
    if(v.sy&&v.st>t){g.save();g.font='10px system-ui';const w=g.measureText(v.sy).width+12,y=v.y-50*v.sc;if(typeof u53Aw==='function')g.globalAlpha*=u53Aw(v.x,y,w,16);g.fillStyle='rgba(255,252,240,.92)';g.strokeStyle='rgba(60,40,20,.5)';g.lineWidth=1;g.beginPath();g.roundRect?g.roundRect(v.x-w/2,y-12,w,16,7):g.rect(v.x-w/2,y-12,w,16);g.fill();g.stroke();g.fillStyle='#3a2a1a';g.textAlign='center';g.fillText(v.sy,v.x,y);g.restore()}}}
/* ---------- ⑤ ตาย/ฟื้น ---------- */
function vz3DeadTick(){const c=$('c'),dn0=VZ3.dead,d=me.cls&&me.down>0;if(d&&!dn0){VZ3.dead=1;vz3CSS();if(c)c.classList.add('vzdead');let e=$('vzd');if(!e){e=document.createElement('div');e.id='vzd';document.body.appendChild(e)}e.innerHTML='💀 ล้มลงแล้ว…<small>พักหายใจสักครู่ แล้วลุกขึ้นสู้ใหม่</small>';e.classList.remove('on');void e.offsetWidth;e.classList.add('on')}
  else if(!d&&dn0){VZ3.dead=0;if(c)c.classList.remove('vzdead');const e=$('vzd');if(e)e.classList.remove('on');if(me.cls){VZL.t0=performance.now();VZL.k='rev';VZL.job=0;try{burst(me.x,me.y-16,['#ffe9a0','#ffffff','#ffd060'],30,140,.8,{glow:1,g:-40})}catch(_){}}}}
/* ---------- ⑥ แผนที่เล็ก ---------- */
function vz3Mini(mx,my,k){const t=performance.now()/1000,P=(x,y)=>[mx+x*k,my+y*k];g.save();
  try{(MAPS[curMap].gates||[]).forEach(G=>{const [x,y]=P(G.x,G.y);g.fillStyle='#c8a0ff';g.beginPath();g.moveTo(x,y-3);g.lineTo(x+2.4,y);g.lineTo(x,y+3);g.lineTo(x-2.4,y);g.closePath();g.fill()})}catch(e){}
  try{if(typeof gtNodes==='function'&&gtOkMap())gtNodes().forEach(n=>{if(!gtReady(n))return;const [x,y]=P(n.x,n.y);g.fillStyle=n.k==='o'?'#e0a060':'#7ae07a';g.fillRect(x-1,y-1,2,2)})}catch(e){}
  try{if(typeof ggOn==='function'&&ggOn()){const [x,y]=P(GG.x,GG.y),pu=2.5+Math.sin(t*5)*1.2;g.fillStyle='#ffd84a';g.beginPath();g.arc(x,y,pu,0,7);g.fill();g.strokeStyle='rgba(255,216,74,.6)';g.lineWidth=1;g.beginPath();g.arc(x,y,pu+2.5,0,7);g.stroke()}}catch(e){}
  try{mons.forEach(m=>{if(m.t!==3||m.hp<=0||m.pv||m.dum)return;const [x,y]=P(m.x,m.y),r=3+Math.abs(Math.sin(t*3))*1.5;g.strokeStyle='rgba(255,70,60,.85)';g.lineWidth=1.2;g.beginPath();g.arc(x,y,r+1.8,0,7);g.stroke();g.fillStyle=m.mvp?'#ffd84a':'#ff4a3a';g.beginPath();g.arc(x,y,2.4,0,7);g.fill()})}catch(e){}
  try{if(PTY&&PTY.mem)PTY.mem.forEach(q=>{const u=Array.isArray(q)?q[0]:q&&q.u;const o=others[u];if(!o)return;const [x,y]=P(o.x,o.y);g.fillStyle='#5ab8ff';g.strokeStyle='#fff';g.lineWidth=.8;g.beginPath();g.arc(x,y,2.4,0,7);g.fill();g.stroke()})}catch(e){}
  g.restore()}
/* ---------- ติดตั้ง ---------- */
setTimeout(()=>{try{vz3CSS();
  setInterval(()=>{try{vz3HudTick()}catch(e){}try{vz3BossCheck()}catch(e){}try{vz3DeadTick()}catch(e){}},250);
  const _pg=pickGear;pickGear=function(d){const n0=me.bag.length;const r=_pg.apply(this,arguments);try{if(me.bag.length>n0){const it=me.bag[me.bag.length-1];if(it&&(it.r>=4||it.lg||it.ss))setTimeout(()=>vz3Show(it),120)}}catch(e){}return r};
  const _fd=fshDraw;fshDraw=function(){_fd.apply(this,arguments);try{vz3Beams()}catch(e){}try{vz3VilDraw()}catch(e){}};
  const _ft=fshTick;fshTick=function(dt){_ft.apply(this,arguments);try{vz3VilTick(Math.min(.1,dt||0))}catch(e){}};
  const _rc=rt3Cam;rt3Cam=function(){const r=_rc.apply(this,arguments);if(r)return r;try{return vz3Cam()}catch(e){return null}};
  const _um=uisMini;uisMini=function(MP,WW,draw){return _um.call(this,MP,WW,function(mx,my,k){draw(mx,my,k);try{vz3Mini(mx,my,k)}catch(e){}})};
}catch(e){console.warn('vz3 init',e)}},1700);
