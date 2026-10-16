/* ---------- v403 คู่มือรูนสำหรับผู้เล่นใหม่ ----------
   ระบบรูนมีหลายชั้น (รูนหลัก · รูนตามสาย · รูนเสริมลิงก์สกิล) แต่ไม่มีอะไรพาผู้เล่นไปลองเลย
   การ์ด «🔮 คู่มือรูน» ใต้การ์ดเควส (แบบเดียวกับภารกิจจุติ) พาทำ 5 ขั้น · แตะการ์ด = ออโต้เดินไปหาช่างรูนไอริสในค่าย
   1 คุยกับไอริส (ได้ผงรูน 30 = พอสร้างรูนแรก) · 2 สร้างรูนหลัก · 3 ใส่รูนให้สกิล · 4 ใช้สกิลที่ใส่รูน 3 ครั้ง · 5 (Lv 20) ลิงก์รูนเสริม
   เริ่มที่ Lv 10 · ความคืบหน้าเก็บใน rn.x.gd / rn.x.gc (เซฟติดตัวละคร) · ตัวเก่าที่ใช้รูนเป็นแล้วข้ามขั้นที่ทำแล้วโดยไม่รับของซ้ำ */
const RGLV=10,RGN=5;
const RGS=[
 {t:'คุยกับช่างรูนไอริสในค่าย',d:'ไอริสจะมอบผงรูน 💠30 พอสร้างรูนแรก',rw:{sh:30}},
 {t:'สร้างรูนหลักอันแรก',d:'ที่ช่างรูน เลือกรูนของสกิลไหนก็ได้ แล้วกด «สร้าง»',rw:{sh:10,g:1500}},
 {t:'ใส่รูนให้สกิล',d:'กด «ใส่» ที่รูนที่สร้าง (ใส่/ถอดได้เฉพาะในค่าย)',rw:{g:2000}},
 {t:'ใช้สกิลที่ใส่รูน 3 ครั้ง',d:'รูนเปลี่ยนวิธีทำงานของสกิล — ลองดูว่าต่างจากเดิมยังไง',rw:{sh:20}},
 {t:'ลิงก์รูนเสริมกับสกิล',d:'แท็บ «🔗 รูนเสริม · ลิงก์» ที่ช่างรูน · ได้รูนเสริมฟรี 3 อันตอน Lv 20',rw:{sh:40,sg:1}}];
let RGOPEN=0;
function rgSt(){const X=sgSt();if(X.gd==null){const S=rnSt(),hasU=Object.keys(S.u||{}).some(k=>S.u[k]),hasL=Object.keys(X.l||{}).some(k=>(X.l[k]||[]).length);X.gd=hasL?RGN:hasU?4:0;X.gc=0}return X}
function rgStep(){if(!me.cls)return RGN;return Math.max(0,Math.min(RGN,rgSt().gd|0))}
function rgShow(){if(!me.cls||!run||me.lv<RGLV)return false;try{if(isDg()||isArena())return false}catch(e){}const s=rgStep();if(s>=RGN)return false;if(s===4&&sgSockN()<1)return false;return true}
function rgDone(s){const X=rgSt();if((X.gd|0)!==s)return;const R=RGS[s].rw,S=rnSt(),P=[];
  if(R.sh){S.sh=Math.min(99999,(S.sh|0)+R.sh);P.push('💠'+R.sh)}if(R.g){me.gold=(me.gold|0)+R.g;P.push('🪙'+R.g.toLocaleString())}if(R.sg){try{sgGive(null,'คู่มือรูน')}catch(e){}P.push('รูนเสริม 1 อัน')}
  X.gd=s+1;X.gc=0;try{sfx('quest')}catch(e){}try{burst(me.x,me.y-24,['#c8a0ff','#ffffff','#8fd0ff'],20,120,.7,{glow:1,g:-30})}catch(e){}
  banner={s:(X.gd>=RGN?'🔮 จบคู่มือรูนแล้ว! ':'🔮 คู่มือรูน '+X.gd+'/'+RGN+' สำเร็จ · ')+'ได้ '+P.join(' · '),t:5};try{sysMsg('🔮 คู่มือรูน: '+RGS[s].t+' ✔ · ได้ '+P.join(' · '))}catch(e){}
  if(X.gd===4&&sgSockN()<1)try{sysMsg('🔮 ขั้นสุดท้าย (ลิงก์รูนเสริม) จะเปิดตอน Lv '+SGLV[0])}catch(e){}rgHud()}
function rgCheck(){if(!me.cls||me.lv<RGLV)return;const s=rgStep();if(s>=RGN)return;const S=rnSt(),X=rgSt();
  if(s===1&&Object.keys(S.u).some(k=>S.u[k]))rgDone(1);
  else if(s===2&&[0,1,2,3,4,5].some(k=>{try{return!!rnOf(k)}catch(e){return false}}))rgDone(2);
  else if(s===3&&(X.gc|0)>=3)rgDone(3);
  else if(s===4&&SGK.some(k=>sgLinks(k).length))rgDone(4)}
function rgHud(){let e=$('rnq');if(!e){const p=$('rbq');if(!p||!p.parentNode)return;e=document.createElement('div');e.id='rnq';e.hidden=true;p.parentNode.insertBefore(e,p.nextSibling);rgCSS()}
  if(!rgShow()){if(!e.hidden)e.hidden=true;return}const s=rgStep(),X=rgSt(),st=RGS[s],on=typeof AQ!=='undefined'&&AQ&&AQ.src==='rn',walk=s!==3;
  let mn=false;try{mn=localStorage.getItem('refugee_rnqmin')==='1'}catch(_){mn=!!window._rnqMin}
  const pr=s===3?' ('+Math.min(3,X.gc|0)+'/3)':'',h=mn?'<b class="rm">🔮 <em>'+(on?'🧭 ':'')+'รูน '+s+'/'+RGN+'</em></b>':
    '<i class="rqx" data-rqx="1" aria-label="ย่อ"><svg viewBox="0 0 10 10" width="10" height="10"><path d="M6.7 1.7 3.5 5l3.2 3.3" fill="none" stroke="#1a0e2a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i><b>🔮 คู่มือรูน <small class="rp">· '+s+'/'+RGN+'</small></b><small class="rs">🔮 '+s+'/'+RGN+'</small><span><b>'+st.t+pr+'</b><br>'+st.d+'</span>'+
    (walk?(on?'<u class="on">🧭 '+(AQ.msg||'ไปหาไอริส')+' · แตะเพื่อหยุด</u>':'<u>🧭 แตะเพื่อเดินไปหาช่างรูนไอริส</u>'):'');
  if(e.dataset.h!==h){e.dataset.h=h;e.innerHTML=h}e.classList.toggle('min',mn);e.classList.toggle('al',s===0);if(e.hidden)e.hidden=false;
  if(!e.dataset.w){e.dataset.w=1;e.addEventListener('click',ev=>{ev.stopPropagation();if(ev.target.closest('[data-rqx]')||e.classList.contains('min')){const v=e.classList.contains('min')?'0':'1';try{localStorage.setItem('refugee_rnqmin',v)}catch(_){}window._rnqMin=v==='1';try{sfx('click')}catch(_){}e.dataset.h='';rgHud();return}
    const s=rgStep();if(s===3){banner={s:'🔮 ใช้สกิลที่ใส่รูนอีก '+Math.max(0,3-(rgSt().gc|0))+' ครั้ง (ใช้ที่ไหนก็ได้)',t:3};return}
    if(curMap===1){const N=MAPS[1].npc5;if(N&&Math.hypot(me.x-N.x,me.y-N.y)<90){if(s===4)SGTAB='sup';runeUI();return}}
    if(AQ&&AQ.src==='rn')aqStop('🧭 หยุดออโต้เควส');else aqStart('rn')})}}
/* ใช้สไตล์เดียวกับการ์ดภารกิจจุติ (#rbq) แต่โทนม่วง */
function rgCSS(){if($('rgcss'))return;let css='';try{for(const sh of document.styleSheets){let R;try{R=sh.cssRules}catch(e){continue}const walk=(L,wrap)=>{for(const r of L){if(r.cssRules&&r.media){walk(r.cssRules,'@media '+r.media.mediaText);continue}if(r.selectorText&&r.selectorText.indexOf('#rbq')>=0){const t=r.cssText.split('#rbq').join('#rnq');css+=wrap?wrap+'{'+t+'}':t}}};walk(R,'')}}catch(e){}
  css+='#rnq{background:linear-gradient(135deg,rgba(40,18,70,.86),rgba(16,10,30,.86))!important;border-color:#b48cff!important;box-shadow:0 0 10px rgba(180,140,255,.35)!important;color:#efe4ff!important}#rnq b{color:#d8c0ff!important}#rnq span b{color:#fff!important}#rnq u{color:#d8c8ff!important}#rnq.al{border-color:#e0d0ff!important;box-shadow:0 0 14px rgba(200,170,255,.75)!important}';
  const st=document.createElement('style');st.id='rgcss';st.textContent=css;document.head.appendChild(st)}
setTimeout(()=>{
  /* ออโต้เควส src 'rn' → เดินไปไอริส (ใช้ act 'talk' เดิม: เดินถึงแล้วกดปุ่มคุย = เปิดหน้าช่างรูน) */
  try{const _np=aqNpcPos;aqNpcPos=function(k){if(k==='iris'){const N=curMap===1&&MAPS[1].npc5;return N&&N.x>0?{x:N.x,y:N.y}:null}return _np.apply(this,arguments)}}catch(e){}
  try{const _at=aqTarget;aqTarget=function(){if(AQ&&AQ.src==='rn'){const s=rgStep();if(s>=RGN||s===3)return{none:1,msg:'🔮 ขั้นนี้ทำที่ไหนก็ได้'};return{mp:1,act:'talk',k:'iris',lb:'ไปหาช่างรูนไอริส'}}return _at.apply(this,arguments)}}catch(e){}
  try{const _ak=aqKey;aqKey=function(){if(AQ&&AQ.src==='rn')return'rn'+rgStep()+(curMap===1?1:0);return _ak.apply(this,arguments)}}catch(e){}
  try{const _ru=runeUI;runeUI=function(msg){const s=rgStep(),open=!!me.cls&&me.lv>=RGLV&&s<RGN;if(open&&curMap===1&&s===0){RGOPEN=1}
      if(AQ&&AQ.src==='rn'){const a=AQ;aqStop();if(s===4)SGTAB='sup'}
      if(!msg&&open&&curMap===1&&s>=1&&s<=2)msg='🔮 คู่มือรูน: '+(s===1?'กด «สร้าง» ที่รูนของสกิลไหนก็ได้ (ใช้ 💠'+RNC+')':'กด «ใส่» ที่รูนที่สร้างไว้');
      const r=_ru.call(this,msg);if(RGOPEN){RGOPEN=0;setTimeout(()=>{try{rgDone(0);runeUI('🔮 ไอริส: "ผงรูน 30 นี่ของเจ้า ลองสร้างรูนแรกดูสิ"')}catch(e){}},250)}return r}}catch(e){}
  try{const _us=useSkill;useSkill=function(k){const s0=me.sk&&me.sk[k]||0;const r=_us.apply(this,arguments);try{if(rgStep()===3&&me.sk&&(me.sk[k]||0)>s0&&rnOf(k)){const X=rgSt();X.gc=(X.gc|0)+1;rgHud()}}catch(e){}return r}}catch(e){}
  setInterval(()=>{try{rgCheck();rgHud()}catch(e){}},1000);
},400);
