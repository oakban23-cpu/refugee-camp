/* ---------- v375 ของให้ทำหลังจบเนื้อเรื่อง: ท้าทายประจำสัปดาห์ · ภารกิจรายสัปดาห์ · ฤดูกาลจัดอันดับ ----------
   อยู่ในหน้า 📅 กิจกรรม แท็บ "สัปดาห์" และ "ฤดูกาล"
   · ท้าทายประจำสัปดาห์: ทุกสัปดาห์ (เริ่มวันจันทร์) สุ่มดันเจี้ยนเนื้อเรื่อง 2 ระดับ (กลาง/สูง) + เงื่อนไขพิเศษ 2 อย่าง ทุกคนได้ชุดเดียวกัน
     ผ่านครั้งแรกของสัปดาห์ได้รางวัล ×1.5 ของดันเจี้ยน (+25%/เงื่อนไข) + เศษดาว + คะแนนฤดูกาล · ผ่านซ้ำได้คะแนนฤดูกาลเพิ่ม (สูงสุด 5 ครั้ง/ระดับ)
     ต้องปลดล็อกดันเจี้ยนนั้นจากเนื้อเรื่องก่อน (ใช้ธงเดียวกับการลงซ้ำผ่าน NPC) จะได้ไม่ข้ามเนื้อเรื่อง
   · ภารกิจรายสัปดาห์ 5 อย่าง + หีบรางวัลเมื่อรับครบ
   · ฤดูกาล = เดือนปฏิทิน · สะสมคะแนนจากสองอย่างบน · ขั้น บรอนซ์/ซิลเวอร์/โกลด์/แพลทินัม มีรางวัล · กระดานอันดับบนเซิร์ฟเวอร์ (ตาราง sYYMM)
     ฉายาถาวร: ถึงบรอนซ์/โกลด์/แพลทินัม · ติด 3 อันดับแรกตอนจบฤดูกาล · พิชิตท้าทายครบ 10 ครั้ง */
const WKP={mid:[['siege','stB',10,'siegeEnter','🏰'],['eye','stE',12,'eyeEnter','👁️'],['queen','stF',13,'queenEnter','🕳️'],['nyx','stG',14,'nyxEnter','🕸️'],['root','stH',15,'rootEnter','🌳'],['rte','stJ',16,'rteEnter','🌋']],
  hi:[['cas','stCa',17,'casEnter','🌹'],['orn','stOr',18,'ornEnter','✨'],['esc','stEs',19,'escEnter','🌉'],['clk','stCk',20,'clkEnter','⌛'],['vsp','stVs',21,'vspEnter','🔔'],['mdf','stS2',22,'mdfEnter','⛏️'],['qsh','stS4',23,'qshEnter','🥚'],['hfg','stS5',24,'hfgEnter','🔥']]};
const WKM={tank:['🛡️ มอนอึด','ศัตรูทนขึ้น ×1.5'],brute:['💢 มอนดุ','โดนตีแรงขึ้น ×1.4'],rush:['⏱️ เร่งเวลา','เวลาเหลือ 75%'],glass:['🗡️ ดาบสองคม','ตีแรง ×1.3 แต่โดนตีแรง ×1.3'],frenzy:['🔥 บอสคลั่ง','บอสเลือดต่ำกว่าครึ่ง โดนตีแรง ×1.35']};
const WKMS=[['kill','🗡️','ล่ามอนสเตอร์',1500],['elite','💪','ล้มมอนหัวหน้า',150],['boss','👑','ล้มบอส',20],['dg','🏰','ผ่านดันเจี้ยน',10],['wkc','⚔️','พิชิตท้าทายประจำสัปดาห์',2]];
const SSTR=[[150,'🥉 บรอนซ์',20000,10],[400,'🥈 ซิลเวอร์',60000,20],[800,'🥇 โกลด์',150000,40],[1200,'💎 แพลทินัม',300000,80]];
let WKC=null,ssSendT=0;
const wkKey=()=>{const d=new Date(),k=(d.getDay()+6)%7;return dayKey(new Date(d.getFullYear(),d.getMonth(),d.getDate()-k))};
const wkLeft=()=>{const d=new Date(),k=(d.getDay()+6)%7;return new Date(d.getFullYear(),d.getMonth(),d.getDate()-k+7)-d};
const ssKey=()=>{const d=new Date();return's'+String(d.getFullYear()%100).padStart(2,'0')+String(d.getMonth()+1).padStart(2,'0')};
const ssName=k=>{const m=+k.slice(3),y=2000+(+k.slice(1,3));return['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][m-1]+' '+(y)};
const ssLeft=()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth()+1,1)-d};
const wkFmt=ms=>{const h=Math.floor(ms/36e5);return h>=24?Math.floor(h/24)+' วัน '+(h%24)+' ชม.':h+' ชม. '+Math.floor(ms%36e5/6e4)+' นาที'};
function wkPick(tier){const R=rng(hseed('wkc'+wkKey()+tier)),P=WKP[tier],e=P[Math.floor(R()*P.length)],ks=Object.keys(WKM),m=[];while(m.length<2){const k=ks[Math.floor(R()*ks.length)];if(!m.includes(k))m.push(k)}return{e,mods:m}}
const wkOpen=e=>!!(me.ach&&(me.ach[e[1]]||(e[0]==='rte'&&me.ach.stK)));
function wkEnsure(){if(!me.cls)return;const k=wkKey();if(me.wkly&&me.wkly.w===k&&Array.isArray(me.wkly.m))return;const L=me.lv|0;
  me.wkly={w:k,m:WKMS.map(([t,,,n])=>({t,n,h:0,cl:0,g:Math.round(1500+L*500),xp:Math.round(need(Math.min(Math.max(1,L),LMAX-1))*.6)})),c:{mid:0,hi:0},f:{mid:0,hi:0},b:0}}
function wkProg(t,v){if(!me.cls)return;wkEnsure();for(const q of me.wkly.m){if(q.t===t&&q.h<q.n){q.h=Math.min(q.n,q.h+v);if(q.h>=q.n){try{sfx('quest')}catch(e){}dn.push({x:me.x,y:me.y-70,v:'✔ ภารกิจรายสัปดาห์สำเร็จ!',t:1.8,col:'#9affc0'})}}}}
function ssEnsure(){if(!me.cls)return;const k=ssKey();if(!me.sson||typeof me.sson!=='object')me.sson={k,p:0,tg:[],best:0,top:0};if(me.sson.k!==k){me.sson.prev={k:me.sson.k,p:me.sson.p|0};me.sson.k=k;me.sson.p=0;me.sson.tg=[]}if(!Array.isArray(me.sson.tg))me.sson.tg=[]}
function ssAdd(n,why){if(!me.cls||n<=0)return;ssEnsure();me.sson.p=(me.sson.p|0)+n;me.sson.best=Math.max(me.sson.best|0,me.sson.p);try{fx({k:'msg',s:'🏆 +'+n+' คะแนนฤดูกาล'+(why?' · '+why:'')+' (รวม '+me.sson.p+')'})}catch(e){}ssSend()}
function ssSend(){if(typeof gmUsed!=='undefined'&&gmUsed)return;if(!room||!room.url||!me.sson||!(me.sson.p>0))return;const now=Date.now();if(now-ssSendT<3000){clearTimeout(ssSend.t);ssSend.t=setTimeout(ssSend,3200);return}ssSendT=now;
  try{emitM('lbs',{k:me.sson.k,t:me.sson.p,n:myName,cls:me.cls,lv:me.lv,pc:1})}catch(e){}}
/* ท้าทาย */
const wkcOn=()=>{try{return!!(WKC&&isDg()&&MAPS[curMap]&&MAPS[curMap].dg===WKC.dt)}catch(e){return false}};
const wkcHas=k=>wkcOn()&&WKC.mods.includes(k);
function wkWhy(tier){const{e}=wkPick(tier);if(!wkOpen(e))return'ยังไม่ปลดล็อก · เล่นเนื้อเรื่องจนผ่าน «'+DT[e[2]].n+'» ก่อน';if(!run||me.down>0)return'ตอนนี้เริ่มไม่ได้';if(isDg())return'ออกจากดันเจี้ยนก่อน';if(SD.on)return'ตอนนี้เริ่มไม่ได้';return''}
function wkGo(tier){const why=wkWhy(tier);if(why){eventUI('⚔️ '+why);return}const{e,mods}=wkPick(tier),fn=window[e[3]];if(typeof fn!=='function'){eventUI('เปิดดันเจี้ยนไม่ได้');return}
  WKC={tier,dt:e[2],mods,done:0,rush:0};ov.hidden=true;fn();setTimeout(()=>{if(!wkcOn()){WKC=null;return}banner={s:'⚔️ ท้าทายประจำสัปดาห์ · '+mods.map(k=>WKM[k][0]).join(' · '),t:6};sysMsg('⚔️ เงื่อนไขสัปดาห์นี้: '+mods.map(k=>WKM[k][0]+' ('+WKM[k][1]+')').join(' · '))},900)}
function wkClear(){const tier=WKC.tier,D=DT[WKC.dt],mult=1+.25*WKC.mods.length;wkEnsure();ssEnsure();me.sson.wc=(me.sson.wc|0)+1;me.wkly.c[tier]=(me.wkly.c[tier]|0)+1;wkProg('wkc',1);
  if(!me.wkly.f[tier]){me.wkly.f[tier]=1;const gd=Math.round(D.gold*1.5*mult),xp=Math.round(D.exp*1.5*mult);me.gold+=gd;try{gainXP(me.x,me.y,xp)}catch(e){}try{sdGive(tier==='hi'?12:6,'ท้าทายประจำสัปดาห์')}catch(e){}
    ssAdd(60+15*WKC.mods.length,'พิชิตท้าทายครั้งแรกของสัปดาห์');banner={s:'⚔️ พิชิตท้าทายประจำสัปดาห์! +'+gd.toLocaleString()+' ทอง · +'+xp.toLocaleString()+' EXP',t:6};try{sfx('lvl')}catch(e){}}
  else if(me.wkly.c[tier]<=6)ssAdd(10,'พิชิตท้าทายซ้ำ ('+(me.wkly.c[tier]-1)+'/5)');else banner={s:'⚔️ พิชิตท้าทายอีกครั้ง (ครบโควตาคะแนนสัปดาห์นี้แล้ว)',t:4};try{writeSave()}catch(e){}}
/* หน้า: แท็บ "สัปดาห์" */
function wkHtml(){wkEnsure();ssEnsure();const q=me.wkly;let h='<div class="note">🗓️ รอบนี้หมดใน '+wkFmt(wkLeft())+' · รีเซ็ตทุกวันจันทร์</div>';
  h+='<div class="cap" style="margin:4px 2px">⚔️ ท้าทายประจำสัปดาห์</div>';
  for(const tier of['mid','hi']){const{e,mods}=wkPick(tier),D=DT[e[2]],op=wkOpen(e),why=wkWhy(tier),first=!q.f[tier],mult=1+.25*mods.length,c=q.c[tier]|0;
    h+='<div class="card wkc'+(op?'':' lk')+'"><div class="sr"><div class="ico" style="font-size:24px">'+(op?e[4]:'🔒')+'</div><div class="nm"><b>'+(tier==='hi'?'ขั้นสูง · ':'ขั้นกลาง · ')+D.n+'</b><small>มอน Lv '+D.L+'+ · '+(first?'รางวัลครั้งแรก ×'+(1.5*mult).toFixed(2).replace(/0$/,'')+' + 🌠 '+(tier==='hi'?12:6)+' + 🏆 '+(60+15*mods.length):'ผ่านแล้ว '+c+' ครั้ง · ผ่านซ้ำ +🏆 10 ('+Math.max(0,Math.min(5,c-1))+'/5)')+'</small></div></div>'
      +'<div class="wkmods">'+mods.map(k=>'<span title="'+WKM[k][1]+'">'+WKM[k][0]+'<small>'+WKM[k][1]+'</small></span>').join('')+'</div>'
      +'<div class="bt" style="margin-top:6px"><button class="pri" data-wkgo="'+tier+'"'+(why?' disabled':'')+'>'+(why?(op?why:'🔒 '+why):(first?'⚔️ เริ่มท้าทาย':'⚔️ ท้าทายอีกครั้ง'))+'</button></div></div>'}
  h+='<div class="cap" style="margin:8px 2px 4px">📋 ภารกิจรายสัปดาห์</div>';
  h+=q.m.map((m,i)=>{const M=WKMS.find(x=>x[0]===m.t)||['','📌',m.t],pc=Math.round(m.h/m.n*100);return'<div class="card"><div class="sr"><div class="ico">'+M[1]+'</div><div class="nm"><b>'+M[2]+' '+m.n.toLocaleString()+(m.t==='wkc'||m.t==='dg'?' ครั้ง':' ตัว')+'</b><small>'+m.g.toLocaleString()+' ทอง · '+m.xp.toLocaleString()+' EXP · 🏆 20</small><div class="xpb" style="margin-top:4px"><i style="width:'+pc+'%"></i></div><small>'+m.h.toLocaleString()+' / '+m.n.toLocaleString()+'</small></div>'
    +(m.cl?'<button disabled>รับแล้ว ✓</button>':'<button class="pri" data-wkm="'+i+'"'+(m.h>=m.n?'':' disabled')+'>รับ</button>')+'</div></div>'}).join('');
  const nd=q.m.filter(m=>m.cl).length,L=me.lv|0;
  h+='<div class="card"><div class="sr"><div class="ico">🎁</div><div class="nm"><b>หีบรายสัปดาห์</b><small>รับรางวัลครบ 5 ภารกิจ ('+nd+'/5) · '+(5000+L*1000).toLocaleString()+' ทอง · 🌠 15 · 🏆 50</small></div>'+(q.b?'<button disabled>เปิดแล้ว ✓</button>':'<button class="pri" data-wkb="1"'+(nd>=5?'':' disabled')+'>เปิด</button>')+'</div></div>';
  return h}
/* หน้า: แท็บ "ฤดูกาล" */
function ssHtml(){ssEnsure();const S=me.sson,p=S.p|0,nx=SSTR.find(t=>p<t[0]),k=S.k;let h='<div class="card ssh"><small>ฤดูกาล '+ssName(k)+' · เหลือ '+wkFmt(ssLeft())+'</small><b>'+p.toLocaleString()+'</b><small>คะแนนฤดูกาล'+(nx?' · อีก '+(nx[0]-p)+' ถึง '+nx[1]:' · ถึงขั้นสูงสุดแล้ว!')+'</small>'
  +'<div class="sstrk">'+SSTR.map(([v,n],i)=>{const got=p>=v,cl=S.tg.includes(i);return'<div class="sst'+(got?' on':'')+'"><i style="width:'+Math.min(100,Math.round(p/v*100))+'%"></i><b>'+n+'</b><small>'+v+'</small>'+(got&&!cl?'<button class="pri" data-sst="'+i+'">รับ</button>':cl?'<em>✓</em>':'')+'</div>'}).join('')+'</div></div>';
  h+='<div class="card hint">ได้คะแนนจาก: ภารกิจรายสัปดาห์ 🏆 20/อัน · หีบรายสัปดาห์ 🏆 50 · พิชิตท้าทายครั้งแรก 🏆 60 (+15/เงื่อนไข) · ผ่านท้าทายซ้ำ 🏆 10 (5 ครั้ง/ระดับ/สัปดาห์)<br>รางวัลขั้น: '+SSTR.map(([v,n,g,sd])=>n+' '+(g/1000)+'K ทอง + 🌠 '+sd).join(' · ')+'<br>ฉายาถาวร: ถึงบรอนซ์ · ถึงโกลด์ · ถึงแพลทินัม · จบฤดูกาลใน 3 อันดับแรก</div>';
  const rows=(typeof lbData!=='undefined'&&lbData&&lbData[k])||null;h+='<div class="card"><div class="cap">🏆 อันดับฤดูกาล '+ssName(k)+'</div>';
  if(!room||!room.url)h+='<small>กระดานอันดับใช้ได้ตอนเล่นออนไลน์</small>';else if(!rows||!rows.length)h+='<small>ยังไม่มีใครทำคะแนน · เป็นคนแรกเลย!</small>';
  else h+=rows.slice(0,30).map((r,i)=>{const mine=r[0]===myName&&r[1]===me.cls;return'<div class="lbr'+(mine?' me':'')+'"><span class="rk">'+(['🥇','🥈','🥉'][i]||(i+1))+'</span><div class="nm2"><b>'+String(r[0]).replace(/[<>&]/g,'')+'</b><small>'+(CL[r[1]]?CL[r[1]].n:r[1])+' · Lv '+r[2]+'</small></div><b class="tm">'+(+r[3]).toLocaleString()+'</b></div>'}).join('');
  h+='</div>';if(S.prev&&S.prev.p)h+='<div class="card"><small>ฤดูกาลก่อน ('+ssName(S.prev.k)+'): '+S.prev.p.toLocaleString()+' คะแนน'+(S.top?' · 🏅 ติด 3 อันดับแรก':'')+'</small></div>';return h}
/* ติด 3 อันดับแรกของฤดูกาลที่จบแล้ว → ฉายา */
function ssTopCheck(){try{if(!me.cls||!me.sson||me.sson.top||typeof lbData==='undefined'||!lbData)return;const cur=ssKey();for(const k in lbData){if(!/^s\d{4}$/.test(k)||k>=cur)continue;const i=(lbData[k]||[]).findIndex(r=>r[0]===myName&&r[1]===me.cls);if(i>=0&&i<3){me.sson.top=1;sysMsg('🏅 คุณจบฤดูกาล '+ssName(k)+' ในอันดับที่ '+(i+1)+'! ได้รับฉายา «ผู้นำฤดูกาล»');try{writeSave()}catch(e){}return}}}catch(e){}}
{const st=document.createElement('style');st.textContent='.wkmods{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.wkmods span{flex:1 1 40%;font-size:11.5px;font-weight:700;padding:5px 7px;border-radius:8px;background:rgba(200,60,40,.14);border:1px solid rgba(220,90,60,.45)}.wkmods small{display:block;font-weight:400;font-size:10.5px;opacity:.8}.wkc.lk{opacity:.75}'
 +'.ssh{text-align:center}.ssh>b{display:block;font-size:30px;line-height:1.1;margin:2px 0}.sstrk{display:flex;gap:5px;margin-top:8px}.sst{flex:1 1 0;position:relative;border-radius:8px;padding:5px 2px 6px;background:rgba(0,0,0,.08);border:1px solid rgba(160,120,60,.35);overflow:hidden;min-width:0}.sst i{position:absolute;left:0;bottom:0;height:4px;background:#e7b75a}.sst b{display:block;font-size:11px;white-space:nowrap}.sst small{display:block;font-size:10px;opacity:.75}.sst.on{border-color:#e7b75a;background:rgba(231,183,90,.18)}.sst button{margin-top:3px;padding:3px 8px;font-size:11px}.sst em{font-style:normal;color:#3f9a3a;font-weight:900}';document.head.appendChild(st)}
setTimeout(()=>{
  /* แท็บใหม่ในหน้ากิจกรรม */
  try{const _ev=eventUI;window.eventUI=eventUI=function(msg){if(evTab!=='wk'&&evTab!=='ss')return _ev(msg);if(!me.cls)return;ov.dataset.k='ev';ensureDaily();loginCheck();
    const dot=b=>b?'<i class="dt"></i>':'';let h=hdr('📅','กิจกรรม',evTab==='wk'?'ท้าทายและภารกิจรีเซ็ตทุกวันจันทร์':'ฤดูกาลละ 1 เดือน')+tabsH([['dq','รายวัน'+dot(me.dq.q.some(q=>q.h>=q.n&&!q.cl)||dqChestReady())],['wk','สัปดาห์'+dot(wkDot())],['ss','ฤดูกาล'+dot(ssDot())],['li','ล็อกอิน'+dot(loginReady())],['ac','ฉายา'],['lb','อันดับ'],['mv','👑MVP']],evTab,'ev');
    if(msg)h+='<div class="note">'+msg+'</div>';h+=evTab==='wk'?wkHtml():ssHtml();ov.innerHTML='<div class="pn" data-pn="ev">'+h+'</div>';if(evTab==='ss')try{lbFetch()}catch(e){}}}catch(e){console.warn('wk ev',e)}
  ov.addEventListener('click',e=>{if(ov.dataset.k!=='ev'||!me.cls)return;const b=e.target.closest('button');if(!b)return;
    if(b.dataset.wkgo){wkGo(b.dataset.wkgo);return}
    if(b.dataset.wkm!=null){wkEnsure();const m=me.wkly.m[+b.dataset.wkm];if(!m||m.cl||m.h<m.n)return;m.cl=1;me.gold+=m.g;try{gainXP(me.x,me.y,m.xp)}catch(_){}try{sfx('coin')}catch(_){}ssAdd(20,'ภารกิจรายสัปดาห์');eventUI('รับรางวัล '+m.g.toLocaleString()+' ทอง · '+m.xp.toLocaleString()+' EXP · 🏆 20');try{writeSave()}catch(_){}return}
    if(b.dataset.wkb){wkEnsure();if(me.wkly.b||me.wkly.m.some(m=>!m.cl))return;me.wkly.b=1;const g=5000+(me.lv|0)*1000;me.gold+=g;try{sdGive(15,'หีบรายสัปดาห์')}catch(_){}ssAdd(50,'หีบรายสัปดาห์');try{sfx('lvl')}catch(_){}eventUI('🎁 เปิดหีบรายสัปดาห์ · '+g.toLocaleString()+' ทอง · 🌠 15 · 🏆 50');try{writeSave()}catch(_){}return}
    if(b.dataset.sst!=null){ssEnsure();const i=+b.dataset.sst,T=SSTR[i];if(!T||me.sson.p<T[0]||me.sson.tg.includes(i))return;me.sson.tg.push(i);me.gold+=T[2];try{sdGive(T[3],'รางวัลขั้น'+T[1])}catch(_){}try{sfx('lvl')}catch(_){}eventUI('🏆 รับรางวัลขั้น '+T[1]+' · '+T[2].toLocaleString()+' ทอง · 🌠 '+T[3]);try{writeSave()}catch(_){}return}},true);
  /* นับความคืบหน้า: ใช้เหตุการณ์เดียวกับเควสรายวัน (ดันเจี้ยนนับจากตอนรับรางวัลแทน) */
  try{const _dp=dqProg;window.dqProg=dqProg=function(t,v){_dp(t,v);if(t==='kill'||t==='elite'||t==='boss')try{wkProg(t,v)}catch(e){}}}catch(e){}
  /* เงื่อนไขพิเศษ */
  try{const _ah=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(m&&!m.pv&&wkcOn()){if(WKC.mods.includes('tank'))d/=1.5;if(WKC.mods.includes('glass'))d*=1.3}return _ah(m,d,cr,lv,ck)}}catch(e){}
  try{const _hu=hurt;window.hurt=hurt=function(d){if(d>0&&wkcOn()){const M=WKC.mods;if(M.includes('brute'))d*=1.4;if(M.includes('glass'))d*=1.3;if(M.includes('frenzy')){const B=mons.find(q=>q.t===3);if(B&&B.hp<B.mh*.5)d*=1.35}}return _hu(d)}}catch(e){}
  try{const _wt=wpTick;window.wpTick=wpTick=function(dt){_wt(dt);try{if(wkcOn()&&WKC.mods.includes('rush')&&!WKC.rush&&dg.ph!=='lobby'&&dg.tl>0){dg.tl*=.75;WKC.rush=1}}catch(e){}}}catch(e){}
  /* ออกจากห้องท้าทาย = จบสถานะท้าทาย */
  try{const _em=enterMap;window.enterMap=enterMap=function(id,arr){const r=_em(id,arr);try{if(WKC&&!wkcOn()&&!(id>=10000&&MAPS[id]&&MAPS[id].dg===WKC.dt))WKC=null}catch(e){}return r}}catch(e){}
},60);
/* รับรางวัลดันเจี้ยน: ห่อหลังสุด (ตัวห่อของแต่ละดันเจี้ยนใช้ setTimeout สั้นกว่า) */
setTimeout(()=>{try{const _dr=dgReward;window.dgReward=dgReward=function(){const on=wkcOn();const r=_dr.apply(this,arguments);try{wkProg('dg',1);if(on&&!WKC.done){WKC.done=1;wkClear()}}catch(e){console.warn('wkClear',e)}return r}}catch(e){console.warn('wk reward',e)}},600);
const wkDot=()=>{try{wkEnsure();return me.wkly.m.some(m=>m.h>=m.n&&!m.cl)||(!me.wkly.b&&me.wkly.m.every(m=>m.cl))}catch(e){return false}};
const ssDot=()=>{try{ssEnsure();return SSTR.some(([v],i)=>me.sson.p>=v&&!me.sson.tg.includes(i))}catch(e){return false}};
setInterval(()=>{try{if(me.cls){wkEnsure();ssEnsure();ssTopCheck()}}catch(e){}},5000);
