/* ---------- v390 กล่องจดหมาย ----------
   ส่งข้อความ (ไม่เกิน 200 ตัว) + ของแนบ 1 อย่าง (อุปกรณ์/การ์ด/ของใช้-วัตถุดิบ) + ทอง ถึงชื่อตัวละครไหนก็ได้ แม้อีกฝ่ายออฟไลน์
   เก็บบนเซิร์ฟเวอร์ตามรหัสตัวละครถาวร (mid) · กล่องละ 50 ฉบับ · อยู่ได้ 30 วัน (ของแนบที่ไม่มีคนรับตีกลับผู้ส่ง)
   ค่าส่ง: ข้อความล้วนฟรี · มีของแนบ 50 ทอง + 1% ของทองที่แนบ · แนบของ/รับของต้องล็อกอินบัญชี (กันโกงแบบเดียวกับตลาด)
   ของที่ส่งพักไว้ในเซฟ (me.mlp) จนเซิร์ฟเวอร์ยืนยัน → เน็ตหลุดกลางทาง ของไม่หายและไม่ซ้ำ */
const MLFEE=g=>50+Math.floor(g*.01),MLDAY=60,MLMAX=50;
const MLWHY={acc:'ต้องล็อกอินบัญชีก่อน (บัญชีเดียวกับที่ผูกตัวละครนี้)',own:'ตัวละครนี้ผูกกับบัญชีอื่น ล็อกอินบัญชีเดิมก่อน',ban:'บัญชีนี้ถูกระงับการซื้อขาย/ส่งของ',flag:'บัญชีรอผู้ดูแลตรวจสอบ ส่งทองชั่วคราวไม่ได้',
  gold:'ทองที่บันทึกบนเซิร์ฟเวอร์ไม่พอ',sync:'บันทึกขึ้นเซิร์ฟเวอร์ไม่ทัน ลองอีกครั้ง',name:'ชื่อตัวละครของคุณยังไม่ยืนยันกับเซิร์ฟเวอร์ ลองใหม่อีกสักครู่',who:'ไม่พบตัวละครชื่อนี้ในเซิร์ฟเวอร์',self:'ส่งหาตัวเองไม่ได้',
  full:'กล่องจดหมายของผู้รับเต็มแล้ว (50 ฉบับ)',spam:'ผู้รับยังไม่ได้อ่านจดหมายจากคุณ 10 ฉบับแล้ว รอเขาอ่านก่อน',day:'วันนี้ส่งครบ '+MLDAY+' ฉบับแล้ว',busy:'ส่งถี่เกินไป รอสักครู่',bad:'ของแนบไม่ถูกต้อง',
  empty:'ยังไม่ได้เขียนอะไรเลย',gone:'ของแนบถูกรับไปแล้ว',dup:'จดหมายฉบับนี้ส่งไปแล้ว'};
let MLD=null,MLE='',MLTAB='in',MLN=0,MLW={to:'',tx:'',k:'',v:'',n:1,g:0,pick:'st',sig:''},MLX={q:0,poll:0,busy:0,claim:0,mid:'',at:0,del:0};
function mlOn(){return!!(room&&room.url)}
function mlPend(){if(!Array.isArray(me.mlp))me.mlp=[];return me.mlp}
function ovK(){return!ov.hidden&&ov.dataset.k==='mail'}
function mlQ(force){if(!mlOn()||!me.cls)return;const now=Date.now();if(!force&&now-MLX.q<1500)return;MLX.q=now;MLX.poll=now;try{emitM('mlq',{mid:mkMid(),acc:mkA(),tk:mlPend().map(p=>p.t)})}catch(e){}}
function mlBadge(){try{mnSet('mlb',MLN)}catch(e){}}
function mlAgo(t){const s=Math.max(0,(Date.now()-t)/1000);return s<60?'เมื่อสักครู่':s<3600?Math.round(s/60)+' นาทีที่แล้ว':s<86400?Math.round(s/3600)+' ชม.ที่แล้ว':Math.round(s/86400)+' วันที่แล้ว'}
function mlLeft(t){const d=Math.ceil((t+30*864e5-Date.now())/864e5);return d<=3?'<span style="color:#ff9a7a">เหลือ '+Math.max(0,d)+' วัน</span>':''}
function mlAttName(a,g){const L=[];if(a)L.push('📦 '+mkName(a.k,a.d));if(g>0)L.push('💰 <b>'+(g|0).toLocaleString()+'</b> ทอง');return L.join(' · ')}
function mlRefund(p,q){if(p.k)mkGive(p.k,p.d,1);const back=(p.g|0)+(p.fee|0);if(back)me.gold=Math.min(GMAX,me.gold+back);if(!q||p.k||back)sysMsg('↩️ ส่งจดหมายถึง '+p.to+' ไม่สำเร็จ'+(p.k||back?' · คืนของแนบ/ทองให้แล้ว':''))}
/* ---- รับจากเซิร์ฟเวอร์ ---- */
function mlR(D){if(!D)return;if(D.err){MLE=D.err;MLD=null;if(ovK())mlUI();return}MLE='';MLD=D;
  const P=mlPend();if(D.tk&&P.length){const keep=P.filter(p=>{const v=D.tk[p.t];if(v===1)return false;if(v===0){mlRefund(p,1);return false}return true});if(keep.length!==P.length){me.mlp=keep;try{writeSave()}catch(e){}}}
  MLN=(D.L||[]).filter(x=>!x.rd).length;mlBadge();if(ovK())mlUI()}
function mlA(D){const P=mlPend(),i=P.findIndex(p=>p.t===D.t);if(i<0)return;const p=P.splice(i,1)[0];
  if(D.ok){sysMsg('📮 ส่งจดหมายถึง '+(D.tn||p.to)+' แล้ว');try{sfx('item')}catch(e){}if(ovK())mlUI('✅ ส่งจดหมายถึง <b>'+esc(D.tn||p.to)+'</b> แล้ว')}
  else{mlRefund(p,1);if(ovK())mlUI('⚠️ '+(MLWHY[D.why]||'ส่งไม่สำเร็จ')+(p.k||p.g?' · คืนของแนบ/ทองแล้ว':''))}
  try{writeSave()}catch(e){}}
function mlNew(D){MLN=D.n|0;mlBadge();const s=D.rt?'📬 จดหมายตีกลับจาก '+D.fn+' (ไม่มีใครรับของใน 30 วัน)':'📬 จดหมายใหม่จาก '+D.fn+(D.a?' 🎁 มีของแนบ':'');sysMsg(s+' · เปิดที่ปุ่ม 📬 จดหมาย');
  banner={s:'📬 มีจดหมายใหม่!',t:3};try{sfx('quest')}catch(e){}if(ovK()&&MLTAB==='in')mlQ(1)}
function mlG(D){MLX.claim=0;const x=MLD&&MLD.L.find(q=>q.id===(D.id|0));
  if(!D.ok){if(D.why==='gone'&&x){x.a=null;x.g=0}if(ovK())mlUI('⚠️ '+(MLWHY[D.why]||'รับของไม่ได้'));return}
  const L=[];if(D.a){mkGive(D.a.k,D.a.d,1);L.push(mkName(D.a.k,D.a.d))}if(D.g>0){me.gold=Math.min(GMAX,me.gold+(D.g|0));L.push('💰 '+(D.g|0).toLocaleString()+' ทอง')}
  if(x){x.a=null;x.g=0;x.rd=1}try{sfx('coin')}catch(e){}try{writeSave()}catch(e){}sysMsg('🎁 รับของจากจดหมายแล้ว');if(ovK())mlUI('🎁 ได้รับ '+L.join(' · '))}
/* ---- ส่ง ---- */
function mlGrab(){const a=$('mlto'),b=$('mltx'),c=$('mlg'),d=$('mlnq');if(a)MLW.to=a.value;if(b)MLW.tx=b.value;if(c)MLW.g=Math.max(0,Math.floor(+c.value||0));if(d)MLW.n=Math.max(1,Math.floor(+d.value||1))}
function mlAtt(){const k=MLW.k,v=MLW.v;if(k==='it'){const it=me.bag[+v];if(!it||it.lk||JSON.stringify(it)!==MLW.sig)return null;return{k,d:it}}
  if(k==='cd'){if(!((me.cards&&me.cards[v])|0))return null;return{k,d:v}}
  if(k==='st'){if(!GDM[v])return null;const n=Math.min(999,MLW.n|0,gdGet(v));if(n<1)return null;return{k,d:{k:v,n}}}return null}
function mlTake(){const a=mlAtt();if(!a)return null;
  if(a.k==='it'){const i=+MLW.v;const d=JSON.parse(JSON.stringify(me.bag[i]));me.bag.splice(i,1);return{k:'it',d}}
  if(a.k==='cd'){const x=a.d;me.cards[x]--;if(!me.cards[x]){delete me.cards[x];if(me.cslot)me.cslot=me.cslot.map(c=>c===x?'':c);if(me.cmv===x)me.cmv=''}try{cardRecalc();recalc()}catch(e){}return{k:'cd',d:x}}
  gdSet(a.d.k,gdGet(a.d.k)-a.d.n);return{k:'st',d:{k:a.d.k,n:a.d.n}}}
async function mlSend(){if(MLX.busy||!me.cls)return;mlGrab();const to=String(MLW.to||'').replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,12),tx=String(MLW.tx||'').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g,'').trim().slice(0,200);
  if(!mlOn())return mlUI('ต้องเล่นออนไลน์ถึงจะส่งจดหมายได้');if(!to)return mlUI('ใส่ชื่อผู้รับก่อน');if(to===myName)return mlUI(MLWHY.self);
  const att=MLW.k?mlAtt():null;if(MLW.k&&!att){MLW.k='';MLW.v='';return mlUI('ของแนบเปลี่ยนไปแล้ว เลือกใหม่อีกครั้ง')}
  const g=Math.max(0,Math.min(1e9,MLW.g|0));if(!tx&&!att&&!g)return mlUI(MLWHY.empty);
  const fee=att||g?MLFEE(g):0;if(me.gold<g+fee)return mlUI('ทองไม่พอ (ต้องใช้ '+(g+fee).toLocaleString()+' ทอง รวมค่าส่ง)');
  if((att||g)&&mkNeedAcc())return mlUI('📦 การแนบของ/ทองต้องล็อกอินบัญชีก่อน (กันโกง)');
  if(mlPend().length>=6)return mlUI('มีจดหมายรอเซิร์ฟเวอร์ยืนยันอยู่หลายฉบับ รอสักครู่');
  MLX.busy=1;
  if(g>0){mlUI('⏳ กำลังตรวจสอบทองกับเซิร์ฟเวอร์...');let ok=false;try{ok=await accSync()}catch(e){}if(!ok){MLX.busy=0;return mlUI(MLWHY.sync)}}
  let k,d;if(att){const r=mlTake();if(!r){MLX.busy=0;return mlUI('ของแนบเปลี่ยนไปแล้ว เลือกใหม่อีกครั้ง')}k=r.k;d=r.d}
  if(me.gold<g+fee){if(k)mkGive(k,d,1);MLX.busy=0;return mlUI('ทองไม่พอ')}
  me.gold-=g+fee;const t=(Math.random().toString(36).slice(2,8)+Math.random().toString(36).slice(2,6)).slice(0,10);
  mlPend().push({t,to,k,d,g,fee,at:Date.now()});try{writeSave()}catch(e){}
  try{emitM('mls',{t,to,tx,k,d,g,mid:mkMid(),acc:mkA()})}catch(e){}
  MLX.busy=0;MLW.tx='';MLW.k='';MLW.v='';MLW.sig='';MLW.g=0;MLW.n=1;['mltx','mlg','mlnq'].forEach(i=>{const e=$(i);if(e)e.value=''});try{sfx('coin')}catch(e){}mlUI('⏳ กำลังส่งจดหมายถึง <b>'+esc(to)+'</b>...')}
async function mlClaim(id){const x=MLD&&MLD.L.find(q=>q.id===id);if(!x||(!x.a&&!(x.g>0))||MLX.claim)return;
  if(mkNeedAcc())return mlUI('🎁 การรับของ/ทองจากจดหมายต้องล็อกอินบัญชีก่อน');
  if(x.a&&x.a.k==='it'&&me.bag.length>=MAXBAG)return mlUI('กระเป๋าเต็ม เคลียร์ช่องก่อนรับอุปกรณ์');
  if(x.a&&x.a.k==='st'&&GDM[x.a.d.k]&&gdGet(x.a.d.k)+(x.a.d.n|0)>GDM[x.a.d.k].max)return mlUI(GDM[x.a.d.k].n+' เต็มแล้ว ใช้ก่อนค่อยรับ');
  MLX.claim=1;if(x.g>0){mlUI('⏳ กำลังตรวจสอบกับเซิร์ฟเวอร์...');let ok=false;try{ok=await accSync()}catch(e){}if(!ok){MLX.claim=0;return mlUI(MLWHY.sync)}}
  try{emitM('mlc',{id,mid:mkMid(),acc:mkA()})}catch(e){}setTimeout(()=>{MLX.claim=0},8000)}
function mlDel(ids){if(!ids.length)return;try{emitM('mlm',{op:'del',ids,mid:mkMid(),acc:mkA()})}catch(e){}if(MLD)MLD.L=MLD.L.filter(x=>!ids.includes(x.id)||x.a||x.g>0)}
function mlRead(){if(!MLD)return;const ids=MLD.L.filter(x=>!x.rd).map(x=>x.id);if(!ids.length)return;try{emitM('mlm',{op:'rd',ids,mid:mkMid(),acc:mkA()})}catch(e){}}
function mlTo(n){MLW.to=String(n||'');MLTAB='w';mlUI()}
/* ---- หน้าต่าง ---- */
function mlCSS(){if($('mlcss'))return;try{friCSS()}catch(e){}const s=document.createElement('style');s.id='mlcss';s.textContent=
 '.mlr{padding:9px 8px;border-bottom:1px solid rgba(255,255,255,.08);text-align:left}.mlr:last-child{border-bottom:0}.mlr.nw{background:rgba(255,216,74,.07);border-left:3px solid #ffd84a}'+
 '.mlh{display:flex;align-items:center;gap:8px}.mlh .frav{width:28px;height:28px;flex:0 0 28px;font-size:13px}.mlh b{font-size:13.5px}.mlh small{margin-left:auto;font-size:10.5px;opacity:.7;text-align:right}'+
 '.mltx{margin:5px 0 2px 36px;font-size:13px;line-height:1.45;white-space:pre-wrap;word-break:break-word;color:#f3ead8}.mlat{margin:5px 0 2px 36px;padding:6px 8px;border-radius:9px;background:rgba(255,200,90,.1);border:1px dashed rgba(255,200,90,.45);font-size:12.5px}'+
 '.mlbt{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 0 36px}.mlbt button{font-size:11.5px!important;padding:5px 10px!important;border-radius:9px!important}'+
 '.mlf input,.mlf textarea{width:100%;box-sizing:border-box;padding:8px 10px;border-radius:9px;border:1px solid #6a5030;background:#1e1814;color:#f0e6d2;font-size:14px;font-family:inherit}.mlf textarea{resize:vertical;min-height:64px}'+
 '.mlch{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}.mlch button{font-size:11.5px!important;padding:4px 9px!important;border-radius:14px!important}.mlpk{max-height:220px;overflow:auto;margin-top:6px}.mlpk .sr.on{background:rgba(120,200,255,.13);border-radius:8px}'+
 '#mlb .bd:empty{display:none}';document.head.appendChild(s)}
function mlRow(x){const C=CL[x.fc]||{c:'#8a6a3a',n:''},has=x.a||x.g>0;
  let h='<div class="mlr'+(x.rd?'':' nw')+'"><div class="mlh"><div class="frav" style="background:'+(x.rt?'#6a5a7a':C.c)+'">'+(x.rt?'↩':esc(String(x.fn||'?').slice(0,1)))+'</div><div style="min-width:0">'+
    (x.rt?'<b>↩️ ตีกลับ</b> <small style="display:inline;margin:0;opacity:.8">ส่งถึง '+esc(x.fn)+' แต่ไม่มีใครรับใน 30 วัน</small>':'<b>'+esc(x.fn)+'</b>'+(C.n?' <small style="display:inline;margin:0;opacity:.7">'+esc(C.n)+'</small>':''))+'</div><small>'+mlAgo(x.at)+(has?'<br>'+mlLeft(x.at):'')+'</small></div>';
  if(x.t)h+='<div class="mltx">'+esc(x.t)+'</div>';
  if(has)h+='<div class="mlat">🎁 ของแนบ: '+mlAttName(x.a,x.g)+'</div>';
  h+='<div class="mlbt">'+(has?'<button class="pri" data-mlc="'+x.id+'"'+(MLX.claim?' disabled':'')+'>🎁 รับของ</button>':'')+(x.rt?'':'<button data-mlre="'+esc(x.fn)+'">↩️ ตอบกลับ</button>')+(has?'':'<button data-mld="'+x.id+'">🗑️ ลบ</button>')+'</div></div>';
  return h}
function mlCompose(){const W=MLW,fr=(me.frd&&me.frd.L||[]).slice().sort((a,b)=>(b.ls||0)-(a.ls||0)).slice(0,16),g=W.g|0,att=W.k?mlAtt():null,fee=att||g?MLFEE(g):0;
  let h='<div class="card mlf" style="text-align:left"><div class="cap">✉️ ถึง</div><input id="mlto" maxlength="12" placeholder="ชื่อตัวละครผู้รับ" autocomplete="off" value="'+esc(W.to)+'">';
  if(fr.length)h+='<div class="mlch">'+fr.map(f=>'<button data-mlf="'+esc(f.n)+'"'+(f.n===W.to?' class="pri"':'')+'>'+(typeof friOn==='function'&&friOn(f.n)?'🟢 ':'')+esc(f.n)+'</button>').join('')+'</div>';
  else h+='<small style="opacity:.7;display:block;margin-top:4px">พิมพ์ชื่อตัวละครได้เลย · เพื่อนในรายชื่อจะขึ้นเป็นปุ่มให้กดเลือก</small>';
  h+='<div class="cap" style="margin-top:10px">💬 ข้อความ <small style="display:inline;opacity:.6">(ไม่เกิน 200 ตัว)</small></div><textarea id="mltx" maxlength="200" placeholder="เขียนถึงเพื่อน...">'+esc(W.tx)+'</textarea></div>';
  h+='<div class="card mlf" style="text-align:left"><div class="cap">📎 ของแนบ <small style="display:inline;opacity:.6">(ไม่ใส่ก็ได้)</small></div>';
  h+='<div style="display:flex;align-items:center;gap:8px"><span style="white-space:nowrap">💰 ทอง</span><input id="mlg" type="number" min="0" max="1000000000" value="'+(g||'')+'" placeholder="0" style="flex:1"></div>';
  h+='<div class="note" style="margin:8px 0 4px;text-align:left">'+(att?'แนบ: '+mkName(att.k,att.d)+' <button data-mlx="1" style="font-size:11px;padding:2px 8px;margin-left:6px">✖ เอาออก</button>':'ยังไม่ได้เลือกของแนบ (เลือกได้ 1 อย่าง)')+'</div>';
  h+='<div class="tabs" style="flex-wrap:wrap">'+[['st','🧺 ของใช้/วัตถุดิบ'],['it','⚔️ อุปกรณ์'],['cd','🃏 การ์ด']].map(([k,l])=>'<button class="tab sm'+(W.pick===k?' on':'')+'" data-mlp="'+k+'">'+l+'</button>').join('')+'</div><div class="mlpk">';
  if(W.pick==='it'){const L=me.bag.map((it,i)=>[it,i]).filter(([it])=>!it.lk);h+=L.length?L.map(([it,i])=>'<div class="sr'+(W.k==='it'&&+W.v===i?' on':'')+'"><div class="nm">'+itemCard(it)+'</div><button data-mli="'+i+'">'+(W.k==='it'&&+W.v===i?'✔':'เลือก')+'</button></div>').join('<hr>'):'<small style="opacity:.7">ไม่มีอุปกรณ์ในกระเป๋า (ของที่ล็อกไว้ส่งไม่ได้)</small>'}
  else if(W.pick==='cd'){const L=CIDS.filter(id=>(me.cards&&me.cards[id])|0);h+=L.length?L.map(id=>'<div class="sr'+(W.k==='cd'&&W.v===id?' on':'')+'"><div class="nm"><b>🃏 '+CARDS[id].n+'</b><small>มี '+me.cards[id]+' ใบ · ส่ง 1 ใบ</small></div><button data-mlcd="'+id+'">'+(W.k==='cd'&&W.v===id?'✔':'เลือก')+'</button></div>').join('<hr>'):'<small style="opacity:.7">ยังไม่มีการ์ด</small>'}
  else{const L=MKG.filter(k=>GDM[k]&&gdGet(k)>0);h+=L.length?L.map(k=>{const n=gdGet(k),on=W.k==='st'&&W.v===k;return'<div class="sr'+(on?' on':'')+'"><div class="nm"><b>'+GDM[k].n+'</b><small>มี '+n.toLocaleString()+'</small></div>'+
      (on?'<input id="mlnq" type="number" min="1" max="'+Math.min(999,n)+'" value="'+Math.min(W.n|0||1,Math.min(999,n))+'" style="width:72px;padding:6px;border-radius:8px;border:1px solid #6a5030;background:#1e1814;color:#f0e6d2">':'<button data-mlst="'+k+'">เลือก</button>')+'</div>'}).join('<hr>'):'<small style="opacity:.7">ไม่มีของใช้/วัตถุดิบ</small>'}
  h+='</div></div>';
  h+='<div class="card"><div id="mlfee" style="font-size:12.5px;margin-bottom:8px">'+mlFeeTx(att,g)+'</div><button class="pri" data-mlsend="1" style="width:100%;padding:11px;font-size:15px"'+(MLX.busy?' disabled':'')+'>📮 ส่งจดหมาย</button>'+
    '<small style="display:block;opacity:.7;margin-top:8px;text-align:left">ส่งถึงชื่อตัวละครไหนก็ได้ แม้อีกฝ่ายออฟไลน์ · ข้อความล้วนส่งฟรี · มีของแนบคิดค่าส่ง 50 ทอง + 1% ของทองที่แนบ · การแนบของและการรับของต้องล็อกอินบัญชี · ไม่มีใครรับใน 30 วัน ของจะตีกลับมาหาคุณ'+(MLD?' · วันนี้ส่งไปแล้ว '+(MLD.sent|0)+'/'+MLDAY:'')+'</small></div>';
  return h}
function mlFeeTx(att,g){const fee=att||g?MLFEE(g):0;return fee?'ค่าส่ง <b>'+fee.toLocaleString()+'</b> ทอง'+(g?' · หักรวม <b>'+(g+fee).toLocaleString()+'</b> ทอง':'')+(me.gold<g+fee?' <span style="color:#ff8a7a">(ทองไม่พอ)</span>':''):'✉️ ข้อความล้วน — <b>ส่งฟรี</b>'}
function mlUI(msg){if(!me.cls)return;mlCSS();if(ovK()&&MLTAB==='w')mlGrab();ov.dataset.k='mail';ov.hidden=false;
  let h=hdr('📬','กล่องจดหมาย',(MLD?'ยังไม่อ่าน '+MLN+' · ':'')+'เก็บได้ '+MLMAX+' ฉบับ · ไม่มีใครรับใน 30 วันจะหายไป')+(msg?'<div class="note">'+msg+'</div>':'');
  if(!mlOn()){h+='<div class="card hint">📬 กล่องจดหมายใช้ได้เมื่อเล่นออนไลน์บนเซิร์ฟเวอร์เท่านั้น</div>';ov.innerHTML='<div class="pn" data-pn="mail">'+h+'</div>';return}
  h+='<div class="tabs">'+[['in','📥 จดหมายเข้า'+(MLN?' ('+MLN+')':'')],['w','✉️ เขียนจดหมาย']].map(([k,l])=>'<button class="tab'+(MLTAB===k?' on':'')+'" data-mlt="'+k+'">'+l+'</button>').join('')+'</div>';
  if(MLE==='acc'){h+='<div class="card hint">🔐 '+(typeof ACC!=='undefined'&&ACC?MLWHY.own:'ตัวละครนี้ผูกบัญชีไว้แล้ว ล็อกอินบัญชีก่อนเปิดกล่องจดหมาย')+'</div>'+(typeof ACC!=='undefined'&&ACC?'':accBox())}
  else if(MLTAB==='w')h+=mlCompose();
  else if(!MLD){h+='<div class="card"><small>กำลังโหลดกล่องจดหมาย...</small></div>';mlQ()}
  else{const L=MLD.L.slice().reverse();
    h+='<div class="card" style="text-align:left;padding:4px 6px">'+(L.length?L.map(mlRow).join(''):'<div style="opacity:.75;font-size:12.5px;padding:14px 6px;text-align:center">📭 ยังไม่มีจดหมาย<br><small>เพื่อนส่งจดหมายหาคุณได้แม้ตอนคุณออฟไลน์</small></div>')+'</div>';
    const rd=L.filter(x=>x.rd&&!x.a&&!(x.g>0)).length;
    h+='<div class="card" style="display:flex;gap:6px"><button data-mlrf="1" style="flex:1">🔄 รีเฟรช</button><button data-mlda="1" style="flex:1"'+(rd?'':' disabled')+'>'+(MLX.del?'❗ แตะอีกครั้งเพื่อลบ':'🗑️ ลบที่อ่านแล้ว ('+rd+')')+'</button></div>';
    if(L.some(x=>(x.a||x.g>0))&&mkNeedAcc())h+='<div class="card hint" style="font-size:12px">🔐 มีของแนบรออยู่ · ล็อกอินบัญชีก่อนถึงจะกดรับได้</div>'+accBox()}
  ov.innerHTML='<div class="pn" data-pn="mail">'+h+'</div>';
  const Q=(s,f)=>ov.querySelectorAll(s).forEach(b=>b.onclick=()=>f(b.dataset,b));
  Q('[data-mlt]',d=>{if(MLTAB==='w')mlGrab();MLTAB=d.mlt;MLX.del=0;if(MLTAB==='in')mlQ(1);mlUI()});
  Q('[data-mlc]',d=>mlClaim(+d.mlc));Q('[data-mlre]',d=>mlTo(d.mlre));Q('[data-mld]',d=>{mlDel([+d.mld]);mlUI()});
  Q('[data-mlrf]',()=>{mlQ(1);mlUI('🔄 กำลังโหลดใหม่...')});
  Q('[data-mlda]',()=>{if(!MLX.del){MLX.del=1;mlUI();return}MLX.del=0;const ids=MLD?MLD.L.filter(x=>x.rd&&!x.a&&!(x.g>0)).map(x=>x.id):[];mlDel(ids);mlUI('🗑️ ลบจดหมายที่อ่านแล้ว '+ids.length+' ฉบับ')});
  Q('[data-mlf]',d=>{mlGrab();MLW.to=d.mlf;mlUI()});Q('[data-mlp]',d=>{mlGrab();MLW.pick=d.mlp;mlUI()});Q('[data-mlx]',()=>{mlGrab();MLW.k='';MLW.v='';MLW.sig='';mlUI()});
  Q('[data-mli]',d=>{mlGrab();const i=+d.mli,it=me.bag[i];if(!it)return;MLW.k='it';MLW.v=String(i);MLW.sig=JSON.stringify(it);mlUI()});
  Q('[data-mlcd]',d=>{mlGrab();MLW.k='cd';MLW.v=d.mlcd;mlUI()});
  Q('[data-mlst]',d=>{mlGrab();MLW.k='st';MLW.v=d.mlst;MLW.n=Math.min(10,gdGet(d.mlst))||1;mlUI()});
  Q('[data-mlsend]',()=>mlSend());
  const upd=()=>{mlGrab();const e=$('mlfee');if(e)e.innerHTML=mlFeeTx(MLW.k?mlAtt():null,MLW.g|0)};['mlg','mlnq'].forEach(i=>{const e=$(i);if(e)e.oninput=upd});
  if(MLTAB==='in'&&MLD&&MLN){mlRead();MLD.L.forEach(x=>x.rd=1);MLN=0;mlBadge()}}
function mlAfterLogin(){if(ovK()){MLE='';MLD=null;mlQ(1);mlUI('✅ ล็อกอินบัญชีแล้ว')}}
/* ---- กรองเซฟ: จดหมายที่รอเซิร์ฟเวอร์ยืนยัน ---- */
function mlClean(x){if(!Array.isArray(x))return undefined;const o=x.slice(-10).map(p=>{if(!p||typeof p!=='object'||typeof p.t!=='string'||!/^[a-z0-9]{1,12}$/.test(p.t))return null;
    const r={t:p.t,to:String(p.to||'').replace(/[\u0000-\u001f<>]/g,'').slice(0,12),g:Math.max(0,Math.min(1e9,Math.floor(+p.g||0))),fee:Math.max(0,Math.min(2e7,Math.floor(+p.fee||0))),at:Math.max(0,Math.floor(+p.at||0))};
    if(p.k==='it'){const it=cleanItem(p.d);if(!it)return null;r.k='it';r.d=it}else if(p.k==='cd'){if(typeof p.d!=='string'||!/^[a-z]{2,5}$/.test(p.d))return null;r.k='cd';r.d=p.d}
    else if(p.k==='st'){if(!p.d||typeof p.d!=='object'||!GDM[p.d.k])return null;r.k='st';r.d={k:p.d.k,n:Math.max(1,Math.min(999,Math.floor(+p.d.n||1)))}}
    return r}).filter(Boolean);return o.length?o:undefined}
/* ---- ติดตั้ง ---- */
{let done=false;setInterval(()=>{try{
  if(!done&&room&&room.on){done=true;const on=(k,f)=>room.on(k,m=>{if(m.sameTab||!m.data)return;try{f(m.data.d)}catch(e){}});on('mlr',mlR);on('mla',mlA);on('mln',mlNew);on('mlg',mlG)}
  if(!$('mlb')){const ref=$('frb')||$('pb');if(ref){mlCSS();const b=document.createElement('button');b.id='mlb';b.innerHTML='<i>📬</i><span>จดหมาย</span><b class="bd"></b>';ref.parentNode.insertBefore(b,ref.nextSibling);b.onclick=()=>{if(me.cls&&run){MLX.del=0;mlUI();if(MLTAB==='in')mlQ(1)}}}}
  const rok=!!(room&&room.ok),was=MLX.rok;MLX.rok=rok;if(!me.cls||!mlOn()||!rok)return;const now=Date.now(),mid=me.mkid||'';if(!was&&MLX.mid===mid)MLX.at=now+3000;
  if(MLX.mid!==mid){MLX.mid=mid;MLD=null;MLE='';MLN=0;mlBadge();MLX.at=now+4000;return}
  if(MLX.at&&now>=MLX.at){MLX.at=0;mlQ(1);return}
  const P=mlPend();if(P.length&&P.some(p=>now-p.at>12000)&&now-MLX.q>10000){mlQ(1);return}
  if(now-MLX.poll>180000)mlQ()
}catch(e){}},1000)}
