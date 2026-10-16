/* ---------- v414 ซ้อนท้ายสัตว์ขี่ ----------
   เพื่อนยืนใกล้คนที่ขี่สัตว์อยู่ → ปุ่ม «🐎 ขอซ้อนท้าย» → เจ้าของกดรับ (เพื่อนในปาร์ตี้รับให้อัตโนมัติ)
   ซ้อนท้ายแล้ว: เจ้าของสัตว์คุมทิศทาง · คนซ้อนเดินเองไม่ได้ แต่ยังโจมตี/ใช้สกิลได้ · ซ้อนได้ 1 คน
   ลงเอง: ปุ่ม «🐎 ลงจากหลัง» หรือดันจอยค้าง · เจ้าของกด «ให้ลง» ได้ · เพื่อนในรายชื่อเพื่อน/ปาร์ตี้ขึ้นได้ทันที · ลงอัตโนมัติเมื่อเจ้าของลงจากสัตว์ ออกจากแมพ หรือคนใดคนหนึ่งล้ม
   ทุกเครื่องเห็นคนซ้อนนั่งอยู่หลังเจ้าของ (presence ช่อง rp = uid ของเจ้าของสัตว์) */
function rideRp(){return RDE.on?RDE.o:''}
const RDE={on:0,o:'',on0:0,req:'',reqT:0,lost:0},RDP={u:'',n:'',t:0},PGQ={};let PGNT=0;
function rdOwnerOf(u){if(u===uid)return RDE.on?RDE.o:'';const o=others[u];return o&&o.rp?o.rp:''}
function rdPassOf(ou){if(ou!==uid&&RDE.on&&RDE.o===ou)return uid;for(const k in others){const o=others[k];if(o&&o.rp===ou)return k}return''}
function rdRiding(ou){if(ou===uid)return!!me.riding;const o=others[ou];return!!(o&&o.mt>0&&o.hp>0&&!o.sl)}
function rdPos(ou){if(ou===uid)return{x:me.x,y:me.y,d:Math.cos(me.face)<0?-1:1};const o=others[ou];return o?{x:o.x,y:o.y,d:(o.fx||1)<0?-1:1}:null}
function rdName(u){if(u===uid)return me.nm||'คุณ';const o=others[u];return o?o.n:'เพื่อน'}
function rdSend(k,to){try{fx({k,to,n:me.nm||myName||''})}catch(e){}}
function rdStart(ou){RDE.on=1;RDE.o=ou;RDE.req='';RDE.lost=0;try{sfx('gate')}catch(e){}banner={s:'🐎 ซ้อนท้าย '+rdName(ou)+' แล้ว · เจ้าของสัตว์เป็นคนบังคับ (ยังโจมตี/ใช้สกิลได้)',t:4};
  try{burst(me.x,me.y,['#d8d0c0','#ffffff'],14,80,.5,{g:-20})}catch(e){}}
function rdStop(msg){if(!RDE.on)return;const p=rdPos(RDE.o);RDE.on=0;RDE.o='';if(p){me.x=p.x-p.d*26;me.y=p.y+8}if(msg)banner={s:msg,t:3};try{sfx('click')}catch(e){}}
/* ปุ่มลอย (สไตล์เดียวกับปุ่มเต็นท์) */
function rdBtn(){let b=$('rdb');if(!b){const t=$('tnb');if(!t||!t.parentNode)return null;b=document.createElement('button');b.id='rdb';b.hidden=true;t.parentNode.insertBefore(b,t.nextSibling);
    let css='';try{for(const sh of document.styleSheets){let R;try{R=sh.cssRules}catch(e){continue}for(const r of R){if(r.selectorText==='#tnb')css+=r.cssText.split('#tnb').join('#rdb')}}}catch(e){}
    css+='#rdb{left:auto!important;right:10px!important;bottom:262px!important;transform:none!important;padding:7px 11px!important;font-size:12.5px!important;max-width:48%;overflow:hidden;text-overflow:ellipsis;border-radius:18px;background:linear-gradient(#6a4a2a,#3a2614)!important;border-color:#e8c890!important}@media (max-height:780px){#rdb{bottom:236px!important}}@media (max-height:700px){#rdb{bottom:212px!important}}#rdb.ask{background:linear-gradient(#3a7a3a,#1e4a1e)!important;border-color:#a8f0a8!important;animation:rdp 1s infinite}@keyframes rdp{50%{box-shadow:0 0 22px rgba(160,255,160,.9)}}';
    const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    b.addEventListener('click',e=>{e.stopPropagation();rdClick()})}return b}
function rdNear(){if(!me.cls||me.riding||RDE.on||me.down>0)return null;let best=null,bd=64;for(const k in others){const o=others[k];if(!o||!(o.mt>0)||o.hp<=0||o.rp)continue;if(rdPassOf(k))continue;const d=Math.hypot(o.x-me.x,o.y-me.y);if(d<bd){bd=d;best=k}}return best}
let RDF='';const rdSn=n=>{n=String(n||'');return n.length>10?n.slice(0,9)+'…':n};
function rdUI(){const b=rdBtn();if(!b)return;let tx='',f='',ask=0;const now=performance.now();
  if(me.cls&&run&&ov.hidden&&!SD.on){
    if(RDE.on){tx='🐎 ลงจากหลัง';f='off'}
    else if(RDP.u&&now<RDP.t&&me.riding&&!rdPassOf(uid)){tx='✅ รับ '+rdSn(RDP.n)+' ซ้อน';f='acc';ask=1}
    else if(RDE.req&&now<RDE.reqT){tx='⏳ รอ '+rdName(RDE.req)+' ตอบรับ…';f='wait'}
    else if(me.riding&&rdPassOf(uid)){const pu=rdPassOf(uid);tx='🐎 ให้ '+rdSn(rdName(pu))+' ลง';f='kick:'+pu}
    else{const k=rdNear();if(k){tx='🐎 ขอซ้อน '+rdSn(rdName(k));f='req:'+k}}}
  if(b.hidden!==!tx)b.hidden=!tx;if(tx&&b.textContent!==tx)b.textContent=tx;b.classList.toggle('ask',!!ask);b.disabled=f==='wait';RDF=f}
function rdClick(){const f=RDF;if(!f)return;
  if(f==='off'){const o=RDE.o;rdStop('🐎 ลงจากหลัง '+rdName(o)+' แล้ว');return}
  if(f==='acc'){const u=RDP.u;RDP.u='';if(rdPassOf(uid)){rdSend('rdn',u);return}rdSend('rda',u);banner={s:'🐎 '+rdName(u)+' ขึ้นซ้อนท้ายแล้ว · คุณเป็นคนบังคับ',t:3};return}
  if(f.indexOf('kick:')===0){rdSend('rdx',f.slice(5));try{sfx('click')}catch(e){}return}
  if(f.indexOf('req:')===0){const k=f.slice(4);RDE.req=k;RDE.reqT=performance.now()+8000;rdSend('rdq',k);try{sfx('click')}catch(e){}}}
/* รับข้อความผ่าน fx (ส่งทั้งแมพ · กรองด้วย to) */
function rdFx(o){if(!o||o.to!==uid||!me.cls)return;const fromN=typeof o.n==='string'?o.n.slice(0,24):'';
  if(o.k==='rdq'){if(!me.riding||rdPassOf(uid)){rdSend('rdn',o.by);return}let pty=false;try{pty=typeof inPty==='function'&&inPty(o.by)}catch(e){}
    if(!pty)try{pty=friSt().L.some(f=>f&&f.n===fromN)}catch(e){}
    if(pty){rdSend('rda',o.by);banner={s:'🐎 '+fromN+' (เพื่อน) ขึ้นซ้อนท้ายแล้ว',t:3};return}
    RDP.u=o.by;RDP.n=fromN||rdName(o.by);RDP.t=performance.now()+8000;banner={s:'🐎 '+RDP.n+' ขอซ้อนท้าย — กดปุ่ม ✅ เพื่อรับ',t:4};try{sfx('quest')}catch(e){}}
  else if(o.k==='rda'){if(RDE.req===o.by&&!me.riding&&me.down<=0)rdStart(o.by)}
  else if(o.k==='rdx'){if(RDE.on&&RDE.o===o.by)rdStop('🐎 '+(fromN||rdName(o.by))+' ให้ลงจากหลังแล้ว')}
  else if(o.k==='rdn'){if(RDE.req===o.by){RDE.req='';banner={s:'🐎 ซ้อนท้ายไม่ได้ (เจ้าของไม่ได้ขี่อยู่หรือมีคนซ้อนแล้ว)',t:3}}}}
/* คนซ้อน: ล็อกตำแหน่งตามเจ้าของทุกเฟรม */
function rdTick(dt){if(!RDE.on)return;const o=others[RDE.o];
  /* คนซ้อนดันจอยค้าง 0.6 วิ = กระโดดลง */try{if(typeof joy!=='undefined'&&joy&&joy.mv&&Math.hypot(joy.dx||0,joy.dy||0)>8){RDE.jt=(RDE.jt||0)+(dt||0);if(RDE.jt>.6){RDE.jt=0;return rdStop('🐎 กระโดดลงจากหลังแล้ว')}}else RDE.jt=0}catch(e){}
  if(!o){RDE.lost+=1;if(RDE.lost>30)rdStop('🐎 '+'เจ้าของสัตว์ขี่ไปที่อื่นแล้ว · ลงจากหลัง');return}RDE.lost=0;
  if(!(o.mt>0))return rdStop('🐎 '+o.n+' ลงจากสัตว์ขี่แล้ว');if(o.hp<=0)return rdStop('🐎 '+o.n+' ล้มแล้ว · ลงจากหลัง');if(me.down>0)return rdStop('');
  me.x=o.x;me.y=o.y;me.face=(o.fx||1)<0?Math.PI:0;me.riding=0}
setTimeout(()=>{
  try{const _u=updateMe;updateMe=function(dt){const r=_u.apply(this,arguments);try{rdTick(dt)}catch(e){}return r}}catch(e){}
  try{const _h=handleFx;handleFx=function(o){if(o&&(o.k==='rdq'||o.k==='rda'||o.k==='rdn'||o.k==='rdx')){try{rdFx(o)}catch(e){}return}return _h.apply(this,arguments)}}catch(e){}
  try{const _mt=mountToggle;mountToggle=function(){if(RDE.on){banner={s:'🐎 กำลังซ้อนท้ายอยู่ · กด «ลงจากหลัง» ก่อน',t:2};return}return _mt.apply(this,arguments)}}catch(e){}
  /* วาด: คนซ้อนนั่งหลังเจ้าของ · วาดก่อนเจ้าของ (อยู่ด้านหลัง) · ป้ายชื่อรวมกับเจ้าของ */
  try{const _p=drawP;drawP=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const u=lk&&lk.u;
      if(u&&!down){const ou=rdOwnerOf(u);if(ou&&rdRiding(ou)){PGQ[ou]={a:Array.prototype.slice.call(arguments),t:performance.now()};return}}
      if(u&&lk.mt>0&&!down){const pu=rdPassOf(u),Q=pu&&PGQ[u];if(Q&&performance.now()-Q.t<400){const a=Q.a.slice(),d=(fx||1)<0?-1:1,t=performance.now()/1000;
          a[0]=x-d*17;a[1]=y-13+Math.sin(t*9)*.4*(ph?1:0);a[9]=0;a[10]=d;a[3]='';PGNT=1;MSHOFF=1;try{_p.apply(this,a)}catch(e){}finally{PGNT=0;MSHOFF=0}
          name=name+' · 🐎 '+rdName(pu)}}
      return _p.call(this,x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk)}}catch(e){}
  setInterval(()=>{try{rdUI()}catch(e){}},150);
},780);
