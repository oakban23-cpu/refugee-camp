/* ---------- v416 ขี่คอต่อตัว (เฉพาะในปาร์ตี้) ----------
   แตะ 🧗 ที่ชื่อเพื่อนในแถบปาร์ตี้ด้านขวา → ปีนขึ้นขี่คอ (ถ้าเพื่อนมีคนขี่อยู่แล้ว จะปีนขึ้นไปบนสุดของหอ)
   ฐาน (ล่างสุด) = เดิน/บังคับทิศ และ **รับดาเมจทั้งหมด** แทนคนข้างบน · v417 ฐานเป็นโล่ล้วน โจมตี/ใช้สกิล/หลบไม่ได้ · คนขี่คอ = ไม่โดนดาเมจ โจมตี/ใช้สกิลได้ตามปกติ
   สูงสุด 3 คนบนฐาน (รวม 4) · ลง: ปุ่ม «🧗 ลงจากคอ» / ดันจอยค้าง · ฐานกด «ให้ทุกคนลง» ได้
   หลุดอัตโนมัติ: ฐานล้ม ไปแมพอื่น ออกจากปาร์ตี้ หรือขี่สัตว์ · คนขี่ล้ม
   presence ช่องใหม่ sk = uid ฐาน + 'x' + ลำดับเวลาที่ปีน (ใช้เรียงชั้น) · ดาเมจของคนขี่ส่งไปฐานผ่าน fx skd */
let CHSIT=0,SKPOSE=null;
/* ขาตอนนั่งคร่อมคอ (พิกัดตัวละคร หันขวา): ต้นขายื่นไปข้างหน้า หน้าแข้งห้อยลง · ขาหลังห้อยด้านหลังคนข้างล่าง */
function chSitLegs(P){const O='#140e0c';g.lineWidth=1;g.strokeStyle=O;
  g.fillStyle=chSh(P.leg,3,16);g.beginPath();g.roundRect(-10,5,4.2,10,1.6);g.fill();g.stroke();
  g.fillStyle=chSh(P.leg,3,8);g.beginPath();g.roundRect(-5,3,13,4.6,1.8);g.fill();g.stroke()}
/* หน้าแข้ง+รองเท้าขาหน้าของคนขี่ (วาดทับหน้าอกคนข้างล่าง) */
function skShin(rx,ry,d,cls,c2){const P=(c2===2&&CHR3[cls])?CHR3[cls]:(c2&&CHR2[cls])?CHR2[cls]:(CHR[cls]||CHR.melee),O='#140e0c';g.save();g.translate(rx,ry);g.scale(d,1);g.lineWidth=1;g.strokeStyle=O;
  g.fillStyle=chSh(P.leg,7,18);g.beginPath();g.roundRect(12.2,8,4.2,10,1.8);g.fill();g.stroke();
  g.fillStyle=chSh(P.leg,5,9);g.beginPath();g.ellipse(13.6,8.4,2.7,2.2,0,0,7);g.fill();g.stroke();
  g.fillStyle='#4a3424';g.beginPath();g.roundRect(11.6,16.4,6.6,3.8,1.5);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.2)';g.fillRect(12.5,17,4,1);g.restore()}
const SKE={b:'',id:'',lost:0,jt:0,jump:null},SKMAX=3,SKQ={},SKH=24,SKJ={};let SKBN=0,SKJBYP=0;
/* v420: คนที่ถูกโยนออกจากหอแล้ว (พ้นช่วงฐานย่อ) — ไม่นับเป็นคนบนหออีก แม้ presence ยังไม่อัปเดต */
function skJumping(u){const J=SKJ[u];return!!(J&&performance.now()-J.t0>=250)}
/* v421 กำลังตีลังกาปีนขึ้นหอ (ยังไม่วาดเป็นคนนั่งบนหอ) */
const SKCL={},SKCD=.58;function skClimbing(u){const C=SKCL[u];return!!(C&&performance.now()-C.t0<SKCD*1000)}
function skFlying(u){return skJumping(u)||skClimbing(u)}
function skP(){return SKE.b?SKE.b+'x'+SKE.id:''}
function skOf(u){if(u===uid)return SKE.b?{b:SKE.b,t:SKE.id}:null;const o=others[u];if(!o||typeof o.sk!=='string'||!o.sk)return null;const k=o.sk;/* v419: ทั้ง uid และเวลา (ฐาน36) มีตัว x ได้ → หาจุดแยกที่ด้านหน้าเป็น uid ที่รู้จัก */let i=-1;for(let j=k.indexOf('x');j>0;j=k.indexOf('x',j+1)){const c=k.slice(0,j);if(c===uid||others[c]){i=j;break}}if(i<0)i=k.lastIndexOf('x');if(i<1)return null;return{b:k.slice(0,i),t:k.slice(i+1)}}
/* ฐานจริง = ไล่ลงไปจนเจอคนที่ไม่ได้ขี่คอใคร (ปีนต่อจากคนบนหอก่อนข้อมูลมาถึงก็ยังถูกฐานเดียวกัน) */
function skRoot(u){let x=u;for(let i=0;i<5;i++){const s=skOf(x);if(!s)return x;x=s.b}return x}
function skRiders(b){const L=[];if(SKE.b&&skRoot(uid)===b)L.push({u:uid,t:SKE.id});for(const k in others){const s=skOf(k);if(s&&skRoot(k)===b)L.push({u:k,t:s.t})}
  return L.sort((a,c)=>parseInt(a.t,36)-parseInt(c.t,36)||(a.u<c.u?-1:1))}
function skPos(u){if(u===uid)return{x:me.x,y:me.y,d:Math.cos(me.face)<0?-1:1,hp:me.hp,mt:me.riding?1:0};const o=others[u];return o?{x:o.x,y:o.y,d:(o.fx||1)<0?-1:1,hp:o.hp,mt:o.mt|0}:null}
function skNm(u){if(u===uid)return me.nm||myName||'คุณ';const o=others[u];if(o)return o.n;try{const m=PTY&&PTY.mem.find(q=>q.u===u);if(m)return m.n}catch(e){}return'เพื่อน'}
function skBase(u){return skRoot(u)}
/* ปีนขึ้น */
/* v422 สถิติหอ (บันทึกใน me.stt: twf หอเต็มตอนเป็นฐาน · tws มอนโดนกระแทกมากสุดใน 1 ครั้ง · twd หลบบอสกวาด · twl ร่วมท่าโยน) */
function skStat(k,v,mx){try{me.stt=me.stt||{};me.stt[k]=mx?Math.max(me.stt[k]|0,v|0):(me.stt[k]|0)+(v||1)}catch(e){}}
function skClimb(u){if(!me.cls||me.down>0)return;if(isArena()){banner={s:'🧗 ลานประลองห้ามขี่คอต่อตัว',t:2.5};return}let ip=false;try{ip=inPty(u)}catch(e){}if(!ip){banner={s:'🧗 ขี่คอได้เฉพาะเพื่อนในปาร์ตี้',t:2.5};return}
  if(SKE.b){banner={s:'🧗 กำลังขี่คออยู่แล้ว · ลงก่อน',t:2};return}
  if(me.riding||(typeof RDE!=='undefined'&&RDE.on)){banner={s:'🧗 ลงจากสัตว์ขี่ก่อน',t:2};return}
  if(skRiders(uid).length){banner={s:'🧗 มีคนขี่คอคุณอยู่ · ให้ลงก่อนถึงจะไปขี่คอคนอื่นได้',t:2.5};return}
  const b=skBase(u),P=skPos(b);if(!P||!others[b]){banner={s:'🧗 '+skNm(u)+' ไม่ได้อยู่แมพเดียวกัน',t:2.5};return}
  if(b===uid)return;if(P.hp<=0){banner={s:'🧗 '+skNm(b)+' ล้มอยู่',t:2};return}if(P.mt){banner={s:'🧗 '+skNm(b)+' ขี่สัตว์อยู่ · ใช้ «ขอซ้อนท้าย» แทน',t:2.5};return}
  if(Math.hypot(P.x-me.x,P.y-me.y)>160){banner={s:'🧗 เข้าไปใกล้ '+skNm(u)+' ก่อน (แตะชื่อเพื่อวาปไปหาได้)',t:2.5};return}
  const n=skRiders(b).length;if(n>=SKMAX){banner={s:'🧗 หอของ '+skNm(b)+' เต็มแล้ว (ฐาน + '+SKMAX+' คน)',t:2.5};return}
  SKE.b=b;SKE.id=Date.now().toString(36);SKE.lost=0;SKE.jt=0;try{sfx('gate')}catch(e){}try{burst(me.x,me.y-10,['#ffe08a','#ffffff'],14,90,.5,{g:-20})}catch(e){}
  banner={s:'🧗 ขี่คอ '+skNm(b)+' ชั้นที่ '+(n+1)+' · '+skNm(b)+' รับดาเมจแทน คุณโจมตีได้เต็มที่',t:4};
  /* v421 ทุกเครื่องเห็นตีลังกาจากจุดที่ยืนขึ้นไปนั่งบนหอ */try{fx({k:'skc',b,sx:Math.round(me.x),sy:Math.round(me.y)})}catch(e){}}
function skDrop(msg){if(!SKE.b)return;const P=skPos(skRoot(uid));SKE.b='';SKE.id='';if(P){me.x=P.x+(Math.random()<.5?-1:1)*(18+Math.random()*14);me.y=P.y+10}if(msg)banner={s:msg,t:3};try{sfx('click')}catch(e){}}
/* คนขี่: ล็อกตำแหน่งตามฐาน */
function skTick(dt){if(!SKE.b)return;if(isArena())return skDrop('🧗 ลานประลองห้ามขี่คอ · ลงจากคอแล้ว');const RB=skRoot(uid),o=others[RB];
  if(!o||RB===uid){SKE.lost++;if(SKE.lost>30)skDrop('🧗 '+skNm(SKE.b)+' ไปที่อื่นแล้ว · ลงจากคอ');return}SKE.lost=0;
  let ip=true;try{ip=inPty(RB)}catch(e){}if(!ip)return skDrop('🧗 ไม่ได้อยู่ปาร์ตี้เดียวกันแล้ว · ลงจากคอ');
  if(o.hp<=0)return skDrop('🧗 '+o.n+' ล้ม! หอพังลงมา');if(o.mt>0)return skDrop('🧗 '+o.n+' ขึ้นสัตว์ขี่ · ลงจากคอ');if(me.down>0)return skDrop('');
  try{if(typeof joy!=='undefined'&&joy&&joy.mv&&Math.hypot(joy.dx||0,joy.dy||0)>8){SKE.jt+=dt||0;if(SKE.jt>.6){SKE.jt=0;return skDrop('🧗 กระโดดลงจากคอแล้ว')}}else SKE.jt=0}catch(e){}
  me.x=o.x;me.y=o.y;me.face=(o.fx||1)<0?Math.PI:0;me.riding=0}
/* ฐาน: เช็กคนขึ้น/ลง เพื่อแจ้ง */
let SKSEEN='',SKB0=0,SKBT=0;
function skBaseNo(){const n=performance.now();if(n-SKBT>1500){SKBT=n;try{dn.push({x:me.x,y:me.y-58,v:'🛡️ เป็นฐานอยู่ — โจมตี/หลบไม่ได้',t:1,col:'#ffe08a'})}catch(e){}}}
function skBaseWatch(){const RR=skRiders(uid).filter(r=>!skJumping(r.u)),R=RR.map(r=>r.u).join(',');if(RR.length>=SKMAX&&(SKSEEN?SKSEEN.split(',').length:0)<SKMAX&&R!==SKSEEN)skStat('twf');const was=SKB0;SKB0=RR.length>0?1:0;if(SKB0&&!was)try{me.cast=null}catch(e){}if(R===SKSEEN)return;const old=SKSEEN?SKSEEN.split(','):[],now=R?R.split(','):[];SKSEEN=R;
  now.filter(u=>old.indexOf(u)<0).forEach(u=>{banner={s:'🧗 '+skNm(u)+' ขึ้นขี่คอคุณ · 🛡️ คุณเป็นฐาน: เดินพาหอ + รับดาเมจแทนทุกคน (โจมตีไม่ได้) ('+now.length+'/'+SKMAX+')',t:4}})}
/* ป้ายชื่อรวมของหอ (ฐาน) */
function skTag(x,yTop,name,hp,mh,n){g.save();g.globalAlpha=1;g.font='bold 11px system-ui';g.textAlign='center';const tx='🛡️ '+name+' · 🧗'+n,w=g.measureText(tx).width;
  g.fillStyle='rgba(12,9,16,.5)';g.beginPath();g.roundRect(x-w/2-7,yTop-12,w+14,15,7);g.fill();g.lineWidth=2.5;g.strokeStyle='rgba(10,6,4,.8)';g.strokeText(tx,x,yTop);g.fillStyle='#ffe6a8';g.fillText(tx,x,yTop);
  g.fillStyle='#000';g.fillRect(x-18,yTop+5,36,4);g.fillStyle=hp/mh<.3?'#ff5a4a':'#6fd06a';g.fillRect(x-18,yTop+5,36*Math.max(0,Math.min(1,hp/(mh||1))),4);g.restore()}
/* ปุ่ม 🧗 ในแถบปาร์ตี้ */
function skBtn(u,far){if(far||!me.cls||isArena())return'';const on=SKE.b&&(SKE.b===u||skRoot(u)===skRoot(uid));return'<span class="skb'+(on?' on':'')+'" data-sk="'+esc(u)+'" title="ขี่คอ">🧗</span>'}
setTimeout(()=>{
  try{const st=document.createElement('style');st.textContent='#ptyhud .pr{position:relative}#ptyhud .skb{position:absolute;right:2px;top:2px;pointer-events:auto;font-size:13px;line-height:1;padding:3px 3px 2px;border-radius:6px;background:rgba(255,224,138,.18);border:1px solid rgba(255,224,138,.55);cursor:pointer}#ptyhud .skb.on{background:rgba(160,255,160,.3);border-color:#a8f0a8}#ptyhud .pr b{padding-right:20px}';document.head.appendChild(st)}catch(e){}
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-sk]');if(!b)return;e.stopPropagation();e.preventDefault();const u=b.dataset.sk;
    if(SKE.b&&(SKE.b===u||skRoot(u)===skRoot(uid))){skDrop('🧗 ลงจากคอแล้ว');return}skClimb(u)},true);
  try{const _u=updateMe;updateMe=function(dt){const r=_u.apply(this,arguments);try{skTick(dt);skBaseWatch()}catch(e){}return r}}catch(e){}
  /* ดาเมจของคนขี่ → ส่งให้ฐานรับแทน */
  try{const _h=hurt;window.hurt=hurt=function(d){const RB=SKE.b?skRoot(uid):'';if(RB&&RB!==uid&&d>0&&others[RB]&&others[RB].hp>0&&me.down<=0){try{fx({k:'skd',to:RB,d:Math.round(d)})}catch(e){}return}return _h.apply(this,arguments)}}catch(e){}
  try{const _f=handleFx;handleFx=function(o){if(o&&(o.k==='skd'||o.k==='skx')){try{if(o.to===uid&&me.cls){if(o.k==='skd'){const s=skOf(o.by);if(s&&skRoot(o.by)===uid&&o.d>0)hurt(Math.min(o.d,me.mh*2))}else if(o.k==='skx'&&SKE.b&&(SKE.b===o.by||skRoot(uid)===o.by))skDrop('🧗 '+skNm(o.by)+' ให้ทุกคนลงจากคอ')}}catch(e){}return}return _f.apply(this,arguments)}}catch(e){}
  /* ฐาน = โล่: ใช้สกิลไม่ได้ (ตีปกติถูกกันใน updateMe) */
  try{const _us=useSkill;useSkill=function(k){if(SKB0){skBaseNo();return}return _us.apply(this,arguments)}}catch(e){}
  try{const _dg=dodge;dodge=function(){if(SKB0){skBaseNo();return false}return _dg.apply(this,arguments)}}catch(e){}
  try{const _mt=mountToggle;mountToggle=function(){if(SKE.b){banner={s:'🧗 กำลังขี่คออยู่ · ลงก่อน',t:2};return}if(!me.riding&&skRiders(uid).length){banner={s:'🧗 มีคนขี่คออยู่ · ให้ลงก่อนขี่สัตว์',t:2};return}return _mt.apply(this,arguments)}}catch(e){}
  /* ปุ่มลอยเดียวกับซ้อนท้าย (#rdb): ลงจากคอ / ให้ทุกคนลง */
  try{const _ru=rdUI;rdUI=function(){_ru.apply(this,arguments);const b=$('rdb');if(!b||RDF)return;let tx='',f='';if(me.cls&&run&&ov.hidden&&!SD.on){if(SKE.b){tx='🧗 ลงจากคอ';f='skoff'}else{const n=skRiders(uid).length;if(n){tx='🧗 ให้ทุกคนลง ('+n+')';f='skall'}}}
      if(b.hidden!==!tx)b.hidden=!tx;if(tx&&b.textContent!==tx)b.textContent=tx;if(tx){b.classList.remove('ask');b.disabled=false}RDF=f}}catch(e){}
  try{const _rc=rdClick;rdClick=function(){if(RDF==='skoff'){skDrop('🧗 ลงจากคอแล้ว');return}if(RDF==='skall'){skRiders(uid).forEach(r=>{try{fx({k:'skx',to:r.u})}catch(e){}});banner={s:'🧗 ให้ทุกคนลงจากคอแล้ว',t:2};return}return _rc.apply(this,arguments)}}catch(e){}
  /* v419 วาดหอให้ดูเป็นธรรมชาติ:
     · คนขี่นั่งคร่อมคอคนข้างล่าง: ตัววาด "หลัง" คนข้างล่าง (หัวคนล่างบังช่วงสะโพก) ขาหลังห้อยด้านหลัง · หน้าแข้งขาหน้าห้อยลงหน้าอกคนล่าง (วาดทับทีหลัง)
     · คนข้างล่าง (ฐาน/ชั้นกลาง) ยกมือจับหน้าแข้งคนข้างบน ย่อเข่ารับน้ำหนัก (ยิ่งแบกหลายคนยิ่งย่อ) · ชั้นกลางที่กำลังตี/ร่ายใช้ท่าตีตามปกติ
     · ทั้งหอโยกเบา ๆ และเอนตามแรงเฉื่อยตอนออกวิ่ง/หยุด (ชั้นสูงเอนมากกว่า) */
  try{const _p=drawP;drawP=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const u=lk&&lk.u;
      if(u&&!down&&!SKJBYP&&!skFlying(u)){const s=skOf(u);if(s){const rb=skRoot(u),P=skPos(rb);if(rb!==u&&P&&P.hp>0&&(rb===uid||others[rb])){(SKQ[rb]=SKQ[rb]||{})[u]={a:Array.prototype.slice.call(arguments),t:performance.now()};return}}}
      const R=u&&!down?skRiders(u).filter(r=>!skFlying(r.u)):[];if(!R.length)return _p.apply(this,arguments);
      const now=performance.now(),Q=SKQ[u]||{},d=(fx||1)<0?-1:1,t=now/1000,bob=ph?Math.abs(Math.sin(ph))*1.6:0;
      let lag=0;try{const S=CHSS[u];if(S&&!(LITEQ&&u!==uid))lag=Math.max(-1.3,Math.min(1.3,S.p-S.u))}catch(e){}
      const L=[];R.forEach(r=>{const q=Q[r.u];if(q&&now-q.t<=1500)L.push(q)});const n=L.length;
      /* ตำแหน่งแต่ละชั้น (0 = ฐาน) */
      const pos=[{x,y}];for(let i=1;i<=n;i++){const sw=Math.sin(t*1.7+i*.8)*.55*i+(ph?Math.sin(ph)*.5*i:0)-d*lag*2.4*i;pos.push({x:x-d*2.2*i+sw,y:y-SKH*i-bob*(1+i*.15)})}
      /* คนขี่: วาดจากบนลงล่าง (ชั้นบนอยู่หลังชั้นล่าง) */
      for(let i=n;i>=1;i--){const a=L[i-1].a.slice();a[0]=pos[i].x;a[1]=pos[i].y;a[9]=0;a[10]=d;const hold=i<n;
        PGNT=1;MSHOFF=1;CHSIT=1;SKPOSE=hold?{ty:'stkB',n:n-i}:{ty:'stkT',n:0};try{_p.apply(this,a)}catch(e){}finally{PGNT=0;MSHOFF=0;CHSIT=0;SKPOSE=null}}
      /* ฐาน: ย่อรับน้ำหนัก + มือจับหน้าแข้งชั้นแรก */
      SKBN=1;PGNT=1;SKPOSE={ty:'stkB',n};try{_p.apply(this,arguments)}finally{PGNT=0;SKBN=0;SKPOSE=null}
      /* หน้าแข้งขาหน้าของทุกชั้น (อยู่หน้าอกคนข้างล่าง) */
      for(let i=1;i<=n;i++){try{skShin(pos[i].x,pos[i].y,d,L[i-1].a[2],L[i-1].a[12])}catch(e){}}
      skTag(x,pos[n].y-44,(name||'').replace(/^🌅/,''),hp,mh,n)}}catch(e){}
  /* ใส่ท่าหอให้ CHA ตอนวาด (เฉพาะตอนไม่ได้ตี/ร่าย) */
  try{const _d0=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const SP=SKPOSE,A=CHA;let set=0;
      if(SP&&A&&!A.cast&&!(lk&&lk.ak>0)){A.cast={ty:SP.ty,p:.5,idle:1,d:1,n:SP.n};set=1}
      try{return _d0.apply(this,arguments)}finally{if(set&&A)A.cast=null}}}catch(e){}
  try{R24T.add('stkB');R24T.add('stkT');R24OFF.stkB=1}catch(e){}
  try{const _ib=idlBody;idlBody=function(C){if(C.ty==='stkB'){const k=Math.min(3,C.n||1),t=performance.now()/1000;g.scale(1+.02*k,1-.035*k-.006*Math.sin(t*3.2));g.rotate(-.02*k+Math.sin(t*1.7)*.012);return}if(C.ty==='stkT'){const t=performance.now()/1000;g.rotate(Math.sin(t*1.7+1)*.03);return}return _ib.apply(this,arguments)}}catch(e){}
  try{const _ia=idlArm;idlArm=function(cls,C){if(C.ty==='stkB')return{dx:1,dy:-6,rot:-.45,ak:null,off:[11,-9],gl:null};if(C.ty==='stkT'){const t=performance.now()/1000;return{dx:0,dy:-1+Math.sin(t*2.2)*.6,rot:-.15,ak:null,off:null,gl:null}}return _ia.apply(this,arguments)}}catch(e){}
},800);
