
/* ---------- v564 โหมดฝันร้าย (เนื้อหาหลังจบเรื่อง) ----------
   · ดันเนื้อเรื่อง 19 ดัน (ภาค 5–10) ที่ผ่านเนื้อเรื่องแล้ว เล่นซ้ำแบบ «ฝันร้าย» ได้ 10 ระดับ · เล่นเดี่ยว
   · ทุกดันทนเท่าดันสุดท้าย «ฐานฟ้า» ตั้งแต่ระดับ 1 (เลือดศัตรูตามอัตราส่วนกับ DT[34] · ดาเมจเพิ่ม 60% ของส่วนต่าง เพราะดันเก่ามีท่าที่หลบไม่ได้มากกว่า) แล้วเพิ่มทีละระดับ: ศัตรูทน +25% · ตีแรง +8%
   · คำสาปประจำสัปดาห์ 2 อย่าง (ทุกคนเหมือนกัน · รีเซ็ตวันจันทร์) มีผลทุกดัน
   · ผ่านระดับไหนปลดระดับถัดไปของดันนั้น · รางวัลครั้งแรกต่อดันต่อระดับ (ทอง · เศษดาว · หินขั้นสูง) · ผ่านซ้ำได้ทองเล็กน้อย
   · คะแนนสัปดาห์ = รวมระดับสูงสุดที่ผ่านของทุกดันในสัปดาห์นี้ → กระดานอันดับเซิร์ฟเวอร์ (ตาราง nYYMMDD) + คะแนนฤดูกาล +3/ระดับที่เพิ่ม
   · v566 ปาร์ตี้ 2–4 คน: หัวหน้าเลือกระดับ/กดเริ่ม · ข้อมูลฝันร้ายส่งไปกับคำชวน (dinv id:-1) + ส่งซ้ำทุก 3 วิในดัน · บันทึกทีมแยก (pb/pw/pf) · กระดานทีม qYYMMDD · คนนอกปาร์ตี้เข้าห้อง = ไม่นับ
   · ฉายาใหม่ 4 อัน · เซฟ me.ngm = {b:{ดัน:ระดับสูงสุด}, w:{k:สัปดาห์, b:{ดัน:ระดับ}}, f:{'ดัน:ระดับ':1}, n:จำนวนครั้งที่ผ่าน} */
const NMD=[['rte',16,'🌋'],['cas',17,'🌹'],['orn',18,'✨'],['esc',19,'🌉'],['clk',20,'⌛'],['vsp',21,'🔔'],['mdf',22,'⛏️'],['qsh',23,'🥚'],['hfg',24,'🔥'],['hdf',25,'⚓'],
  ['gdl',26,'🏴'],['wbl',27,'🐋'],['wsk',28,'🌪️'],['ctw',29,'🕰️'],['cwn',30,'🕸️'],['wvr',31,'🧵'],['ptd',32,'🌳'],['pnq',33,'🪲'],['pfn',34,'🌍']];
const NMCU={brute:['💢 โหดร้าย','โดนตีแรงขึ้น ×1.25'],tank:['🛡️ หนังเหล็ก','ศัตรูทนขึ้น ×1.3'],rush:['⏱️ เวลาบีบ','เวลาเหลือ 75%'],
  frenzy:['🔥 บอสคลั่ง','บอสเลือดต่ำกว่าครึ่ง โดนตีแรง ×1.3'],heal:['🩸 แผลลึก','ยาฟื้นเลือดได้ครึ่งเดียว'],shade:['🌑 เงาตามติด','ทุก 9 วิ วงเงาใต้เท้า 1.4 วิแล้วระเบิด']};
const NMMAX=10,NMSEL={};
let NFC=null,NMPEND=null;
const nmWk=()=>{const d=new Date(),k=(d.getDay()+6)%7,m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-k);return'n'+String(m.getFullYear()%100).padStart(2,'0')+String(m.getMonth()+1).padStart(2,'0')+String(m.getDate()).padStart(2,'0')};
function nmCurses(){const R=rng(hseed('nm'+nmWk())),ks=Object.keys(NMCU),m=[];while(m.length<2){const k=ks[Math.floor(R()*ks.length)];if(!m.includes(k))m.push(k)}return m}
function nmEnsure(){if(!me.cls)return;if(!me.ngm||typeof me.ngm!=='object')me.ngm={b:{},w:{k:'',b:{}},f:{},n:0};const N=me.ngm;if(!N.b||typeof N.b!=='object')N.b={};if(!N.f||typeof N.f!=='object')N.f={};
  if(!N.w||typeof N.w!=='object'||N.w.k!==nmWk())N.w={k:nmWk(),b:{}};if(!N.w.b||typeof N.w.b!=='object')N.w.b={};
  if(!N.pb||typeof N.pb!=='object')N.pb={};if(!N.pf||typeof N.pf!=='object')N.pf={};if(!N.pw||typeof N.pw!=='object'||N.pw.k!==nmWk())N.pw={k:nmWk(),b:{}};if(!N.pw.b||typeof N.pw.b!=='object')N.pw.b={}}
function nmClean(o){if(!o||typeof o!=='object')return null;const b={},wb={},f={};const ok=k=>NMD.some(e=>e[0]===k);
  for(const k in o.b||{})if(ok(k))b[k]=Math.max(0,Math.min(NMMAX,o.b[k]|0));for(const k in(o.w&&o.w.b)||{})if(ok(k))wb[k]=Math.max(0,Math.min(NMMAX,o.w.b[k]|0));
  for(const k in o.f||{}){const[a,l]=k.split(':');if(ok(a)&&+l>=1&&+l<=NMMAX)f[k]=1}
  const pb={},pwb={},pf={};for(const k in o.pb||{})if(ok(k))pb[k]=Math.max(0,Math.min(NMMAX,o.pb[k]|0));for(const k in(o.pw&&o.pw.b)||{})if(ok(k))pwb[k]=Math.max(0,Math.min(NMMAX,o.pw.b[k]|0));for(const k in o.pf||{}){const[a,l]=k.split(':');if(ok(a)&&+l>=1&&+l<=NMMAX)pf[k]=1}
  return{b,w:{k:String((o.w&&o.w.k)||'').slice(0,8),b:wb},f,n:Math.max(0,Math.min(1e6,o.n|0)),pb,pw:{k:String((o.pw&&o.pw.k)||'').slice(0,8),b:pwb},pf}}
function nmOpen(e){try{const i=STY.findIndex(s=>s.g===e[0]);return i>=0&&!!me.sty&&me.sty.s>i}catch(_){return false}}
const nmScore=()=>{nmEnsure();let s=0;for(const k in me.ngm.w.b)s+=me.ngm.w.b[k]|0;return s};
const nmScoreP=()=>{nmEnsure();let s=0;for(const k in me.ngm.pw.b)s+=me.ngm.pw.b[k]|0;return s};
const nmQk=()=>'q'+nmWk().slice(1);
const nmPty=()=>{try{return typeof PTY!=='undefined'&&PTY&&PTY.mem&&PTY.mem.length>1?PTY:null}catch(e){return null}};
const nmCap=(k,p)=>{nmEnsure();const N=me.ngm;return Math.min(NMMAX,Math.max(N.b[k]|0,p?N.pb[k]|0:0)+1)};
const nmBestAny=()=>{try{nmEnsure();return Math.max(0,...Object.values(me.ngm.b).map(v=>v|0))}catch(e){return 0}};
const nmDone=()=>{try{nmEnsure();return Object.values(me.ngm.b).filter(v=>(v|0)>=1).length}catch(e){return 0}};
const nfOn=()=>{try{return!!(NFC&&isDg()&&MAPS[curMap]&&MAPS[curMap].dg===NFC.dt)}catch(e){return false}};
const nmHas=k=>nfOn()&&NFC.mods.includes(k);
function nmArm(k,L,pt){const e=NMD.find(x=>x[0]===k);if(!e)return null;L=Math.max(1,Math.min(NMMAX,L|0));const mods=nmCurses(),D=DT[e[1]],F=DT[34];
  const hpf=Math.max(1,F.hp/D.hp)*(1+.25*(L-1))*(mods.includes('tank')?1.3:1),dmf=(1+Math.max(0,F.dm/D.dm-1)*.6)*(1+.08*(L-1))*(mods.includes('brute')?1.25:1);
  NFC={key:k,dt:e[1],L,mods,hpf,dmf,done:0,rush:0,void:0,st:6,pt:pt||null,cr:1,bc:0};try{WKC=null}catch(_){}return NFC}
const nmRewG=(L,first)=>Math.round(DT[34].gold*(first?.5+.25*L:.1+.05*L));
function nmWhy(e,L){if(!nmOpen(e))return'ผ่านเนื้อเรื่องดันนี้ก่อน';nmEnsure();const P=nmPty();if(P&&P.lead!==uid)return'ในปาร์ตี้ หัวหน้าเป็นคนเลือกระดับและกดเริ่ม';if(P&&P.mem.length>4)return'ปาร์ตี้ฝันร้ายได้สูงสุด 4 คน';
  if(L>nmCap(e[0],!!P))return(P?'ทีมต้องผ่าน':'ผ่าน')+'ระดับ '+(L-1)+' ก่อน';if(!run||me.down>0||SD.on)return'ตอนนี้เริ่มไม่ได้';if(isDg())return'ออกจากดันเจี้ยนก่อน';
  return''}
function nmGo(k,L){const e=NMD.find(x=>x[0]===k),why=e?nmWhy(e,L):'ไม่พบดันเจี้ยน';if(why){nmUI('🌙 '+why);return}const fn=window[k+'Enter'];if(typeof fn!=='function'){nmUI('เปิดดันเจี้ยนไม่ได้');return}
  const P=nmPty();nmArm(k,L,P?{mem:P.mem.map(m=>m.u),lead:uid}:null);if(P)nmBc();ov.hidden=true;fn();setTimeout(()=>{if(!nfOn()){NFC=null;return}banner={s:'🌙 ฝันร้าย'+(P?'ทีม':'')+' ระดับ '+L+' · '+NFC.mods.map(m=>NMCU[m][0]).join(' · '),t:6};sysMsg('🌙 ฝันร้าย'+(P?'ทีม ('+P.mem.length+' คน)':'')+'ระดับ '+L+' «'+DT[NFC.dt].n+'» · คำสาป: '+NFC.mods.map(m=>NMCU[m][0]+' ('+NMCU[m][1]+')').join(' · ')+(P?' · คนนอกปาร์ตี้เข้าห้อง = ไม่นับ':' · เล่นเดี่ยว (มีคนอื่นเข้าห้อง = ไม่นับ)'))},900)}
/* ปาร์ตี้: ส่งข้อมูลฝันร้ายให้สมาชิก (ผ่าน dinv id:-1 → ตัวรับคำชวนเดิมไม่สนใจ) */
function nmBc(){try{if(!NFC||!NFC.pt||NFC.pt.lead!==uid||!room||!room.url)return;emitM('dinv',{id:-1,n:myName,nm:{k:NFC.key,L:NFC.L,mem:NFC.pt.mem,lead:uid}})}catch(e){}}
function nmJoinArm(q){const e=NMD.find(x=>x[0]===q.k);if(!e)return;nmArm(q.k,q.L,{mem:q.mem,lead:q.lead});nmEnsure();NFC.cr=nmOpen(e)&&q.L<=nmCap(q.k,true)?1:0;
  setTimeout(()=>{if(!nfOn())return;banner={s:'🌙 ฝันร้ายทีม ระดับ '+q.L+' · '+NFC.mods.map(m=>NMCU[m][0]).join(' · '),t:6};sysMsg('🌙 เข้าร่วมฝันร้ายทีมระดับ '+q.L+' «'+DT[NFC.dt].n+'»'+(NFC.cr?'':' · ⚠️ ระดับนี้สูงกว่าที่คุณปลด (หรือยังไม่ผ่านเนื้อเรื่องดันนี้) — ช่วยเพื่อนได้ แต่ไม่บันทึกและไม่ได้รางวัลฝันร้าย'))},700)}
function nmRecv(m){try{m=U(m);if(m.sameTab||!m.data||!m.data.nm)return;const q=m.data.nm;if(typeof q!=='object'||!NMD.some(e=>e[0]===q.k)||!Array.isArray(q.mem)||!q.mem.includes(uid)||typeof q.lead!=='string'||q.lead===uid)return;
  q.L=Math.max(1,Math.min(NMMAX,q.L|0));q.mem=q.mem.filter(u=>typeof u==='string').slice(0,4);if(NFC&&nfOn())return;const e=NMD.find(x=>x[0]===q.k);
  if(isDg()&&MAPS[curMap]&&MAPS[curMap].dg===e[1])nmJoinArm(q);else NMPEND=Object.assign({until:Date.now()+120000},q)}catch(e){}}
{const RS=new WeakSet();setInterval(()=>{try{if(!room||!room.on||RS.has(room))return;RS.add(room);room.on('dinv',nmRecv)}catch(e){}},1000)}
function nfSend(){try{if(typeof gmUsed!=='undefined'&&gmUsed)return;if(!room||!room.url)return;const s=nmScore();if(s>0)emitM('lbs',{k:nmWk(),t:s,n:myName,cls:me.cls,lv:me.lv,pc:1})}catch(e){}}
function nmClear(){const k=NFC.key,L=NFC.L,D=DT[NFC.dt];nmEnsure();const N=me.ngm,fk=k+':'+L;
  if(NFC.pt){if(!NFC.cr){banner={s:'🌙 ทีมผ่านฝันร้ายระดับ '+L+' แล้ว · ระดับนี้สูงกว่าที่คุณปลด จึงไม่บันทึก',t:6};return{L,cr:0,p:1}}
    const first=!N.pf[fk];N.n=(N.n|0)+1;if(L>(N.pb[k]|0))N.pb[k]=L;const wb=N.pw.b[k]|0;if(L>wb){N.pw.b[k]=L;try{ssAdd(2*(L-wb),'ฝันร้ายทีม')}catch(_){}}
    const g=nmRewG(L,first);me.gold+=g;if(first)N.pf[fk]=1;const tx='+'+g.toLocaleString()+' ทอง';
    banner={s:'🌙 ทีมผ่านฝันร้ายระดับ '+L+' «'+D.n+'»! '+tx,t:6};sysMsg('🌙 ทีมผ่านฝันร้ายระดับ '+L+' «'+D.n+'» · '+tx+' · คะแนนทีมสัปดาห์ '+nmScoreP());try{sfx('lvl')}catch(_){}nfSendP();try{writeSave()}catch(_){}return{L,first,cr:1,p:1}}
  const first=!N.f[fk];N.n=(N.n|0)+1;
  if(L>(N.b[k]|0))N.b[k]=L;const wb=N.w.b[k]|0;if(L>wb){N.w.b[k]=L;try{ssAdd(3*(L-wb),'ฝันร้าย')}catch(_){}}
  const g=nmRewG(L,first);me.gold+=g;let tx='+'+g.toLocaleString()+' ทอง';
  if(first){N.f[fk]=1;const sd=4+2*L;try{sdGive(sd,'ฝันร้าย')}catch(_){}me.inv.s3=Math.min(999,(me.inv.s3|0)+L);tx+=' · 🌠 '+sd+' · หินขั้นสูง ×'+L}
  banner={s:'🌙 ผ่านฝันร้ายระดับ '+L+' «'+D.n+'»! '+tx,t:6};sysMsg('🌙 ผ่านฝันร้ายระดับ '+L+' «'+D.n+'» · '+tx+(L<NMMAX&&L>=(N.b[k]|0)?' · ปลดระดับ '+(L+1)+' แล้ว':'')+' · คะแนนสัปดาห์ '+nmScore());
  try{sfx('lvl')}catch(_){}nfSend();try{writeSave()}catch(_){}return{L,first,cr:1}}
function nfSendP(){try{if(typeof gmUsed!=='undefined'&&gmUsed)return;if(!room||!room.url)return;const s=nmScoreP();if(s>0)emitM('lbs',{k:nmQk(),t:s,n:myName,cls:me.cls,lv:me.lv,pc:NFC&&NFC.pt?NFC.pt.mem.length:2})}catch(e){}}
/* หน้าโหมดฝันร้าย */
function nmUI(msg){if(!me.cls)return;nmEnsure();ov.dataset.k='nm';ov.hidden=false;const N=me.ngm,cu=nmCurses(),sc=nmScore(),P=nmPty(),PL=P&&P.lead===uid;
  let h=hdr('🌙','โหมดฝันร้าย','ดันเนื้อเรื่องแบบยากสุด · เดี่ยวหรือปาร์ตี้ 2–4 คน · คำสาปเปลี่ยนทุกวันจันทร์');if(msg)h+='<div class="note">'+msg+'</div>';
  if(P)h+='<div class="card nmpty" style="border-color:rgba(120,200,255,.55)"><b>👥 ฝันร้ายทีม · ปาร์ตี้ '+P.mem.length+' คน</b><small style="display:block;opacity:.85;margin-top:3px">'+(PL?'คุณเป็นหัวหน้า: เลือกระดับแล้วกดเริ่ม · เพื่อนได้คำชวนเข้าดันพร้อมระดับและคำสาปเดียวกัน':'หัวหน้าปาร์ตี้เป็นคนเลือกระดับและกดเริ่ม · กด «เข้าร่วม» ที่คำชวนที่เด้งขึ้น')+' · ศัตรูทนขึ้นตามจำนวนคน (เหมือนดันปาร์ตี้ปกติ) · บันทึกระดับ/อันดับทีมแยกจากเดี่ยว · ได้ทอง + เศษฝันร้าย (หินขั้นสูง/เศษดาวเฉพาะเดี่ยว) · ระดับที่สูงกว่าที่ตัวเองปลด ช่วยเพื่อนได้แต่ไม่บันทึก</small></div>';
  h+='<div class="card"><div class="cap">คำสาปสัปดาห์นี้ (มีผลทุกดัน) · หมดใน '+wkFmt(wkLeft())+'</div><div class="wkmods">'+cu.map(k=>'<span>'+NMCU[k][0]+'<small>'+NMCU[k][1]+'</small></span>').join('')+'</div>'
    +'<small style="display:block;margin-top:6px;opacity:.85">ระดับ 1: ศัตรูทุกดันทนเท่าดันสุดท้าย «ฐานฟ้า» และตีแรงขึ้นตามส่วน · ขึ้นระดับละขั้น: ศัตรูทน +25% · ตีแรง +8% · ผ่านระดับไหนปลดระดับถัดไปของดันนั้น (สูงสุด 10)</small></div>';
  h+='<div class="card"><div class="sr"><div class="ico">🏆</div><div class="nm"><b>คะแนนสัปดาห์นี้ '+sc+' · ทีม '+nmScoreP()+'</b><small>รวมระดับสูงสุดที่ผ่านของทุกดันในสัปดาห์นี้ (เดี่ยว/ทีมแยกกัน) · ระดับที่เพิ่มได้คะแนนฤดูกาล +3 (ทีม +2) · ผ่านแล้วทั้งหมด '+(N.n|0)+' ครั้ง</small></div></div></div>';
  for(const e of NMD){const[k,id,ic]=e,D=DT[id],op=nmOpen(e),best=N.b[k]|0,wb=N.w.b[k]|0,pb=N.pb[k]|0,mx=nmCap(k,!!P);let sel=NMSEL[k]||mx;sel=Math.max(1,Math.min(mx,sel));NMSEL[k]=sel;const first=!(P?N.pf:N.f)[k+':'+sel];
    h+='<div class="card nmr'+(op?'':' lk')+'"><div class="sr"><div class="ico">'+(op?ic:'🔒')+'</div><div class="nm"><b>'+D.n+'</b><small>'+(op?'ดีที่สุด ระดับ '+best+(best>=NMMAX?' (สูงสุด)':'')+' · สัปดาห์นี้ '+wb+(pb||P?' · ทีม '+pb:''):'ผ่านเนื้อเรื่องดันนี้ก่อน')+'</small>'
      +'</div></div>'+(op?'<div class="nmb"><small class="nmrw">ระดับ '+sel+': '+(P?'ทีม ':'')+(first?'ครั้งแรก '+(nmRewG(sel,1)/1e6).toFixed(2)+' ล้านทอง'+(P?'':' · 🌠 '+(4+2*sel)+' · หินขั้นสูง ×'+sel):'ผ่านซ้ำ '+(nmRewG(sel,0)/1e6).toFixed(2)+' ล้านทอง')+'</small>'
      +'<div class="nmsel"><button data-nmd="'+k+'" data-v="-1"'+(sel<=1?' disabled':'')+'>−</button><b>'+sel+'</b><button data-nmd="'+k+'" data-v="1"'+(sel>=mx?' disabled':'')+'>+</button></div><button class="pri nmgo" data-nmgo="'+k+'"'+(P&&!PL?' disabled':'')+'>▶ เริ่ม</button></div>':'')+'</div>'}
  const rows=(typeof lbData!=='undefined'&&lbData&&lbData[nmWk()])||null;h+='<div class="card"><div class="cap">🏆 อันดับฝันร้ายสัปดาห์นี้</div>';
  if(!room||!room.url)h+='<small>กระดานอันดับใช้ได้ตอนเล่นออนไลน์</small>';else if(!rows||!rows.length)h+='<small>ยังไม่มีใครทำคะแนนสัปดาห์นี้ · เป็นคนแรกเลย!</small>';
  else h+=rows.slice(0,20).map((r,i)=>{const mine=r[0]===myName&&r[1]===me.cls;return'<div class="lbr'+(mine?' me':'')+'"><span class="rk">'+(['🥇','🥈','🥉'][i]||(i+1))+'</span><div class="nm2"><b>'+String(r[0]).replace(/[<>&]/g,'')+'</b><small>'+(CL[r[1]]?CL[r[1]].n:r[1])+' · Lv '+r[2]+'</small></div><b class="tm">'+(+r[3])+'</b></div>'}).join('');
  h+='</div>';const rq=(typeof lbData!=='undefined'&&lbData&&lbData[nmQk()])||null;if(room&&room.url&&(P||(rq&&rq.length))){h+='<div class="card"><div class="cap">👥 อันดับฝันร้ายทีมสัปดาห์นี้</div>'+(!rq||!rq.length?'<small>ยังไม่มีทีมไหนทำคะแนน · เป็นทีมแรกเลย!</small>':rq.slice(0,10).map((r,i)=>{const mine=r[0]===myName&&r[1]===me.cls;return'<div class="lbr'+(mine?' me':'')+'"><span class="rk">'+(['🥇','🥈','🥉'][i]||(i+1))+'</span><div class="nm2"><b>'+String(r[0]).replace(/[<>&]/g,'')+'</b><small>'+(CL[r[1]]?CL[r[1]].n:r[1])+' · Lv '+r[2]+' · ทีม '+(r[4]|0)+' คน</small></div><b class="tm">'+(+r[3])+'</b></div>'}).join(''))+'</div>'}
  h+='<div class="card hint">ฉายา (เดี่ยว): ผู้ฝ่าฝันร้าย (ระดับ 3) · เจ้าแห่งฝันร้าย (ระดับ 7) · ราชันฝันร้าย (ระดับ 10) · ผู้ไม่หลับใหล (ผ่านครบ 19 ดัน) · เดี่ยว: มีคนอื่นเข้าห้อง = ไม่นับ · ทีม: คนนอกปาร์ตี้เข้าห้อง = ไม่นับ</div>';
  ov.innerHTML='<div class="pn" data-pn="nm">'+h+'</div>';try{lbFetch()}catch(_){}}
{const st=document.createElement('style');st.textContent='.nmr .sr{align-items:center}.nmr.lk{opacity:.6}.nmb{display:flex;align-items:center;gap:6px;margin-top:6px}.nmr .nmrw{flex:1 1 auto;min-width:0;color:#c9a8ff;font-size:10.5px;line-height:1.3}.nmsel{display:flex;align-items:center;gap:4px}.nmsel button{min-width:30px;padding:4px 0}.nmsel b{min-width:20px;text-align:center;font-size:15px}.nmgo{min-width:44px;white-space:nowrap;padding:7px 10px!important;flex:0 0 auto}.nmsel{flex:0 0 auto}'
  +'#nmbadge{position:absolute;right:10px;top:calc(env(safe-area-inset-top,0px) + 158px);text-align:right;z-index:6;pointer-events:none;padding:3px 10px;border-radius:999px;background:rgba(40,16,70,.82);border:1px solid rgba(190,140,255,.7);color:#e9dcff;font:700 11.5px system-ui;white-space:nowrap;box-shadow:0 0 12px rgba(150,90,255,.45)}#nmbadge[hidden]{display:none}';document.head.appendChild(st)}
/* ป้ายระหว่างเล่น + คำสาปเงา + ห้ามปาร์ตี้ */
setInterval(()=>{try{let b=document.getElementById('nmbadge');const on=nfOn()&&!NFC.void;if(!b){if(!on)return;b=document.createElement('div');b.id='nmbadge';(document.getElementById('stage')||document.body).appendChild(b)}
  if(b.hidden===on)b.hidden=!on;if(!on)return;const t='🌙 ฝันร้าย'+(NFC.pt?'ทีม ':' ')+NFC.L+' '+NFC.mods.map(m=>NMCU[m][0].split(' ')[0]).join('');if(b.textContent!==t){b.textContent=t;b.title=NFC.mods.map(m=>NMCU[m].join(' ')).join(' · ')}
  if(!NFC.void&&(NFC.pt?Object.keys(others).some(u=>!NFC.pt.mem.includes(u)):plCount()>1)){NFC.void=1;b.hidden=true;banner={s:NFC.pt?'🌙 มีคนนอกปาร์ตี้เข้าห้อง · รอบนี้ไม่นับฝันร้าย (เล่นแบบปกติ)':'🌙 มีผู้เล่นอื่นในห้อง · ฝันร้ายเดี่ยวไม่นับ (รอบนี้เล่นแบบปกติ · เล่นเป็นทีมให้ตั้งปาร์ตี้ก่อน)',t:5};return}
  if(NFC.pt&&NFC.pt.lead===uid&&(NFC.bc=(NFC.bc|0)+1)%30===1)nmBc();
  if(NFC.mods.includes('shade')&&(dg.ph==='run'||dg.ph==='boss')&&me.down<=0&&!SD.on&&me.cls){NFC.st-=.1;if(NFC.st<=0){NFC.st=9;const x=Math.round(me.x),y=Math.round(me.y);
    try{fx({k:'tele',x,y,r:80,dur:1.4})}catch(_){}setTimeout(()=>{try{if(nfOn()&&!NFC.void&&me.down<=0&&Math.hypot(me.x-x,me.y-y)<89){hurt(Math.round(DT[34].dm*3*30));dn.push({x:me.x,y:me.y-60,v:'🌑 เงาระเบิด',t:1,col:'#c9a8ff'})}}catch(_){}},1400)}}}catch(e){}},100);
setTimeout(()=>{
  try{const _ah=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(m&&!m.pv&&nfOn()&&!NFC.void)d/=NFC.hpf;return _ah(m,d,cr,lv,ck)}}catch(e){}
  try{const _hu=hurt;window.hurt=hurt=function(d){if(d>0&&nfOn()&&!NFC.void){d*=NFC.dmf;if(NFC.mods.includes('frenzy')){const B=mons.find(q=>q.t===3);if(B&&B.hp<B.mh*.5)d*=1.3}}return _hu(d)}}catch(e){}
  try{const _wt=wpTick;window.wpTick=wpTick=function(dt){_wt(dt);try{if(nmHas('rush')&&!NFC.void&&!NFC.rush&&dg.ph!=='lobby'&&dg.tl>0){dg.tl*=.75;NFC.rush=1}}catch(e){}}}catch(e){}
  try{const _up=usePot;window.usePot=usePot=function(k){const h0=me.hp;const r=_up.apply(this,arguments);try{if(k==='hp'&&nmHas('heal')&&!NFC.void&&me.hp>h0)me.hp=h0+(me.hp-h0)/2}catch(e){}return r}}catch(e){}
  try{const _em=enterMap;window.enterMap=enterMap=function(id,arr){const r=_em(id,arr);try{if(NFC&&!nfOn()&&!(id>=10000&&MAPS[id]&&MAPS[id].dg===NFC.dt))NFC=null;
    if(NMPEND){const q=NMPEND,e=NMD.find(x=>x[0]===q.k);if(Date.now()>q.until)NMPEND=null;else if(!NFC&&e&&id>=10000&&MAPS[id]&&MAPS[id].dg===e[1]){NMPEND=null;nmJoinArm(q)}}}catch(e){}return r}}catch(e){}
  try{const _wg=wkGo;window.wkGo=wkGo=function(){NFC=null;return _wg.apply(this,arguments)}}catch(e){}
  /* ทางเข้า: แท็บ «สัปดาห์» ในหน้ากิจกรรม */
  try{const _wh=wkHtml;window.wkHtml=wkHtml=function(){let h=_wh.apply(this,arguments);try{nmEnsure();const cu=nmCurses(),any=NMD.some(nmOpen);
      h='<div class="card nmentry" style="border-color:rgba(170,120,255,.6);background:linear-gradient(135deg,rgba(60,24,100,.35),rgba(20,10,40,.15))"><div class="sr"><div class="ico" style="font-size:24px">🌙</div><div class="nm"><b>โหมดฝันร้าย</b><small>'+(any?'คำสาปสัปดาห์นี้: '+cu.map(k=>NMCU[k][0]).join(' · ')+' · คะแนนสัปดาห์ '+nmScore():'ปลดเมื่อผ่านเนื้อเรื่องถึงดัน «ห้องแกนพิภพ»')+'</small></div><button class="pri" data-nmopen="1"'+(any?'':' disabled')+'>'+(any?'เปิด':'🔒')+'</button></div></div>'+h}catch(e){}return h}}catch(e){}
  ov.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');if(!b||!me.cls)return;
    if(b.dataset.nmopen&&ov.dataset.k==='ev'){e.stopPropagation();nmUI();return}
    if(ov.dataset.k!=='nm')return;
    if(b.dataset.nmd){nmEnsure();const k=b.dataset.nmd,mx=Math.min(NMMAX,(me.ngm.b[k]|0)+1);NMSEL[k]=Math.max(1,Math.min(mx,(NMSEL[k]||mx)+(+b.dataset.v)));nmUI();return}
    if(b.dataset.nmgo){const k=b.dataset.nmgo;nmGo(k,NMSEL[k]||1);return}},true);
  /* ฉายา */
  try{Object.assign(TTB,{nm1:{gr:'g',b:{all:.04}},nm2:{gr:'p',b:{dm:.05,hp:.05}},nm3:{gr:'p',b:{dm:.06,hp:.06,cr:.02}},nm4:{gr:'p',b:{dm:.05,hp:.05,red:.02}}});
    ACH.push(['nm1','ผู้ฝ่าฝันร้าย','ผ่านโหมดฝันร้ายระดับ 3 (ดันใดก็ได้)',()=>nmBestAny(),3,1],['nm2','เจ้าแห่งฝันร้าย','ผ่านโหมดฝันร้ายระดับ 7 (ดันใดก็ได้)',()=>nmBestAny(),7,2],
      ['nm3','ราชันฝันร้าย','ผ่านโหมดฝันร้ายระดับ 10 (ดันใดก็ได้)',()=>nmBestAny(),10,2],['nm4','ผู้ไม่หลับใหล','ผ่านโหมดฝันร้ายครบทั้ง 19 ดัน',()=>nmDone(),19,2])}catch(e){console.warn('nm ach',e)}
  /* เซฟ */
  try{snap=(f=>function(){const o=f.apply(this,arguments);try{if(me.ngm)o.ngm=nmClean(me.ngm)}catch(e){}return o})(snap)}catch(e){}
  try{cleanChar=(f=>function(c){const o=f.apply(this,arguments);try{if(o&&c&&c.ngm)o.ngm=nmClean(c.ngm)}catch(e){}return o})(cleanChar)}catch(e){}
  try{applySave=(f=>function(c){const r=f.apply(this,arguments);try{me.ngm=nmClean(c&&c.ngm)||{b:{},w:{k:'',b:{}},f:{},n:0};NFC=null}catch(e){}return r})(applySave)}catch(e){}
},80);
/* รับรางวัลดันเจี้ยน: ห่อหลังตัวท้าทายสัปดาห์ (600) */
setTimeout(()=>{try{const _dr=dgReward;window.dgReward=dgReward=function(){const on=nfOn()&&!NFC.void&&!NFC.done;const r=_dr.apply(this,arguments);try{if(on){NFC.done=1;nmClear()}}catch(e){console.warn('nmClear',e)}return r}}catch(e){console.warn('nm reward',e)}},700);
