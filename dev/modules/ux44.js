/* ---------- v425 กิลด์ (หน้าเกม) ----------
   เมนู › 🏰 กิลด์ · ตั้งกิลด์ (Lv20 · 30,000 ทอง) ชื่อ + ตราย่อ 2–4 ตัว + สัญลักษณ์ + สี · สมาชิกสูงสุด 30
   ตำแหน่ง: 👑 หัวหน้า · ⭐ รองหัวหน้า (เชิญ/เตะสมาชิก/แก้ประกาศ) · สมาชิก
   ตราใต้เท้าตัวละคร (เซิร์ฟเวอร์รับรอง กันปลอม) · แชตกิลด์ (เก็บ 40 ข้อความล่าสุด) · แจ้งเตือนเพื่อนกิลด์ออนไลน์
   ภารกิจกิลด์รายสัปดาห์: ช่วยกันล่ามอน/ล้มบอส/เก็บวัตถุดิบ → ครบ = กิลด์เลเวลอัป (สูงสุด 10) + สมาชิกที่ช่วยรับรางวัลได้คนละครั้ง
   โบนัสกิลด์: EXP +1% ต่อเลเวลกิลด์ · ใช้ได้เฉพาะเล่นออนไลน์บนเซิร์ฟเวอร์ */
const GDEM=['⚔️','🛡️','🏹','🔮','🐉','🦅','🐺','🌙','☀️','🔥','❄️','🌸'],GDCOL=['#e8b54a','#e25b4f','#4f9de0','#58c06a','#b07ae8','#ff8ad0','#4fd0c8','#d8d8e0'],GDCOST=30000,GDLV0=20;
const GDS={g:null,inv:[],tab:'ov',mk:{e:0,col:0},bd:0,rd:0,q:0,acc:{k:0,b:0,g:0},last:null,wkT:0};
const gdOnl=()=>{try{return mlOn()&&!!(room&&room.ok)}catch(e){return false}};
function gdEmit(op,o){if(!gdOnl()||!me.cls)return false;try{emitM('gdo',Object.assign({op,mid:mkMid()},o||{}))}catch(e){return false}return true}
const gdRN=r=>r>=2?'👑 หัวหน้า':r===1?'⭐ รองหัวหน้า':'สมาชิก';
const gdCol=i=>GDCOL[(i|0)%GDCOL.length];
function gdXpB(){return GDS.g?.01*(GDS.g.lvl|0):0}
/* ---- รับข้อความ ---- */
function gdR(d){if(!d)return;GDS.g=d.g||null;GDS.inv=Array.isArray(d.inv)?d.inv:[];gdBadge();if(ov.dataset.k==='gd'&&!ov.hidden)gdUI()}
function gdN(d){if(!d||!d.t)return;const G=GDS.g,tg=G?'🏰['+G.tag+'] ':'🏰 ';
  switch(d.t){
    case'err':gdMsg('⚠️ '+d.s);break;
    case'mk':me.gold=Math.max(0,me.gold-GDCOST);try{writeSave()}catch(e){}gdMsg('🏰 ตั้งกิลด์ «'+d.nm+'» แล้ว! เชิญเพื่อนจากหน้าสมาชิก หรือแตะตัวผู้เล่นในแมพ');try{sfx('lvl')}catch(e){}try{burst(me.x,me.y-20,['#ffe08a','#ffffff'],30,140,.8,{glow:1,g:-30})}catch(e){}break;
    case'inv':GDS.inv=GDS.inv.filter(q=>q.id!==d.id).concat([{id:d.id,nm:d.nm,tag:d.tag,e:d.e,col:d.col,from:d.from}]);gdBadge();banner={s:'🏰 '+d.from+' ชวนเข้ากิลด์ '+d.e+' «'+d.nm+'» · เปิดเมนู › กิลด์ เพื่อตอบรับ',t:5};try{sysMsg('🏰 '+d.from+' ชวนคุณเข้ากิลด์ «'+d.nm+'» [เมนู › 🏰 กิลด์]')}catch(e){}try{sfx('quest')}catch(e){}break;
    case'sent':gdMsg('🏰 ส่งคำเชิญถึง '+d.n+' แล้ว');break;
    case'joined':gdMsg('🏰 เข้ากิลด์ «'+d.nm+'» แล้ว!');try{sfx('lvl')}catch(e){}break;
    case'join':try{sysMsg(tg+d.n+' เข้ากิลด์แล้ว 🎉')}catch(e){}break;
    case'leave':try{sysMsg(tg+d.n+' ออกจากกิลด์')}catch(e){}break;
    case'left':gdMsg('🏰 ออกจากกิลด์ «'+d.nm+'» แล้ว');break;
    case'kick':try{sysMsg(tg+d.n+' ถูกเชิญออกจากกิลด์')}catch(e){}break;
    case'kicked':gdMsg('🏰 คุณถูกเชิญออกจากกิลด์ «'+d.nm+'»');break;
    case'dis':gdMsg('🏰 กิลด์ «'+d.nm+'» ถูกยุบแล้ว');break;
    case'rk':try{sysMsg(tg+d.n+' เป็น'+(d.r?'รองหัวหน้า ⭐':'สมาชิก'))}catch(e){}break;
    case'ld':try{sysMsg(tg+d.n+' เป็นหัวหน้ากิลด์คนใหม่ 👑')}catch(e){}break;
    case'on':try{sysMsg(tg+'🟢 '+d.n+' ออนไลน์แล้ว')}catch(e){}break;
    case'ch':{if(G){G.log=(G.log||[]).concat([{n:d.n,t:d.s,at:d.at}]).slice(-40)}try{chatLog.push({sys:1,t:tg+d.n+': '+d.s,at:Date.now()});renderLog()}catch(e){}if(!(ov.dataset.k==='gd'&&!ov.hidden&&GDS.tab==='ch'))GDS.rd++;gdBadge();if(ov.dataset.k==='gd'&&!ov.hidden&&GDS.tab==='ch')gdUI();break}
    case'wkdone':gdMsg(tg+'ภารกิจกิลด์สัปดาห์นี้ครบแล้ว! '+(d.up?'กิลด์เลเวลอัปเป็น Lv '+d.lvl+' · ':'')+'รับรางวัลได้ที่เมนู › กิลด์');try{sfx('lvl')}catch(e){}break;
    case'gbs':case'gbh':case'gbk':case'gbc':try{gbN(d)}catch(e){}break;
    case'wkc':{const lv=d.lvl|0,gold=3000*Math.max(1,lv),dye=Math.random()<.3?'d8':'d7';me.gold+=gold;try{dyAdd(dye,1)}catch(e){}try{wdrThread(3,'รางวัลกิลด์')}catch(e){}try{writeSave()}catch(e){}
      gdMsg('🎁 รับรางวัลกิลด์: +'+gold.toLocaleString()+' ทอง · '+(dye==='d8'?'🌈 สีย้อมรุ้งดาวตก':'🟡 สีย้อมทองคำ')+' · ✂️ ด้าย 3');try{sfx('coin')}catch(e){}break}}}
function gdMsg(s){banner={s,t:3.5};if(ov.dataset.k==='gd'&&!ov.hidden)gdUI(s)}
/* ---- ปุ่มเมนู + ตัวเลขแดง ---- */
function gdBtn(){let b=$('gdb');if(b)return b;const ref=$('frb')||$('pb');if(!ref||!ref.parentNode)return null;b=document.createElement('button');b.id='gdb';b.innerHTML='<i>🏰</i><span>กิลด์</span><b class="bd"></b>';ref.parentNode.insertBefore(b,ref.nextSibling);
  b.onclick=()=>{if(me.cls&&run){GDS.rd=GDS.tab==='ch'?0:GDS.rd;gdUI();gdEmit('q')}};return b}
function gdBadge(){const b=gdBtn();if(!b)return;const n=(GDS.inv.length|0)+(GDS.rd|0)+(GDS.g&&GDS.g.wk&&GDS.g.wk.done&&!GDS.g.wk.cl?1:0)+gbBadgeN(),e=b.querySelector('.bd');if(e)e.textContent=n?String(n):''}
/* ---- หน้าต่างกิลด์ ---- */
function gdBar(v,m,col){const p=Math.min(1,v/Math.max(1,m));return'<div style="height:7px;border-radius:4px;background:rgba(0,0,0,.4);overflow:hidden"><i style="display:block;height:100%;width:'+(p*100).toFixed(1)+'%;background:'+col+'"></i></div>'}
function gdUI(msg){if(!me.cls)return;ov.dataset.k='gd';ov.hidden=false;const G=GDS.g;
  let h=hdr('🏰','กิลด์',G?G.e+' '+esc(G.nm)+' ['+esc(G.tag)+'] · Lv '+G.lvl+' · '+G.mem.length+'/'+G.max+' คน':'รวมกลุ่มเพื่อนเล่นด้วยกัน · ภารกิจกิลด์รายสัปดาห์ · EXP โบนัส')+(msg?'<div class="note">'+msg+'</div>':'');
  if(!gdOnl()){h+='<div class="card hint">🏰 กิลด์ใช้ได้เมื่อเล่นออนไลน์บนเซิร์ฟเวอร์เท่านั้น</div>';ov.innerHTML='<div class="pn" data-pn="gd">'+h+'</div>';return}
  if(!G){/* ยังไม่มีกิลด์ */
    if(GDS.inv.length)h+='<div class="card"><div class="cap">📨 คำเชิญเข้ากิลด์</div>'+GDS.inv.map(q=>'<div class="qr"><div class="ico" style="color:'+gdCol(q.col)+'">'+q.e+'</div><div class="nm"><b>'+esc(q.nm)+' ['+esc(q.tag)+']</b><small>'+(q.from?'จาก '+esc(q.from):'')+(q.n?' · '+q.n+' คน':'')+'</small></div><button class="pri" data-gda="acc:'+q.id+'">เข้า</button><button data-gda="dec:'+q.id+'">ไม่</button></div>').join('')+'</div>';
    const ok=me.lv>=GDLV0,M=GDS.mk;
    h+='<div class="card"><div class="cap">🏗️ ตั้งกิลด์ใหม่ · ต้อง Lv '+GDLV0+'+ · ค่าตั้ง '+GDCOST.toLocaleString()+' ทอง</div>'+
      '<div style="display:flex;gap:6px"><input id="gdnm" maxlength="16" placeholder="ชื่อกิลด์ (2–16 ตัว)" style="flex:1;min-width:0" value="'+esc(M.nm||'')+'"><input id="gdtg" maxlength="4" placeholder="ตราย่อ" style="width:74px" value="'+esc(M.tag||'')+'"></div>'+
      '<div style="font-size:12px;opacity:.8">สัญลักษณ์</div><div style="display:flex;flex-wrap:wrap;gap:4px">'+GDEM.map((e,i)=>'<button data-gde="'+i+'" style="font-size:18px;padding:4px 7px'+(M.e===i?';outline:2px solid var(--u-gold)':'')+'">'+e+'</button>').join('')+'</div>'+
      '<div style="font-size:12px;opacity:.8">สีกิลด์</div><div style="display:flex;flex-wrap:wrap;gap:6px">'+GDCOL.map((c,i)=>'<button data-gdc="'+i+'" style="width:30px;height:30px;padding:0;border-radius:50%;background:'+c+(M.col===i?';outline:3px solid #fff':'')+'"></button>').join('')+'</div>'+
      '<div style="display:flex;align-items:center;gap:8px;margin-top:4px"><span style="font-size:20px;color:'+gdCol(M.col)+'">'+GDEM[M.e]+'</span><b style="color:'+gdCol(M.col)+'">['+esc((M.tag||'TAG').toUpperCase())+']</b><small style="opacity:.7">ตัวอย่างตราใต้ตัวละคร</small></div>'+
      '<button class="pri" data-gda="mk"'+(ok&&me.gold>=GDCOST?'':' disabled')+'>🏰 ตั้งกิลด์ ('+GDCOST.toLocaleString()+' ทอง)</button>'+(ok?'':'<small style="opacity:.75">ต้องเลเวล '+GDLV0+' ขึ้นไป</small>')+'</div>'+
      '<div class="card hint">หรือให้หัวหน้า/รองหัวหน้ากิลด์แตะตัวคุณในแมพ › «🏰 ชวนเข้ากิลด์»</div>';
    ov.innerHTML='<div class="pn" data-pn="gd">'+h+'</div>';return}
  const T=GDS.tab;h+='<div class="tabs" style="flex-wrap:wrap;gap:4px">'+[['ov','📜 ภาพรวม'],['gb','🐉 บอส'+(gbBadgeN()?' ('+gbBadgeN()+')':'')],['mem','👥 สมาชิก'],['ch','💬 แชต'+(GDS.rd?' ('+GDS.rd+')':'')]].map(([k,l])=>'<button class="tab'+(T===k?' on':'')+'" style="flex:1 1 auto;min-width:0;padding:6px 8px;font-size:12.5px" data-gdt="'+k+'">'+l+'</button>').join('')+'</div>';
  if(T==='ov'){const W=G.wk,g=W.goal,col=gdCol(G.col);
    h+='<div class="card" style="border-color:'+col+'88"><div style="display:flex;align-items:center;gap:10px"><span style="font-size:34px;color:'+col+'">'+G.e+'</span><div><b style="font-size:17px;color:'+col+'">'+esc(G.nm)+' ['+esc(G.tag)+']</b><small style="display:block;opacity:.8">กิลด์ Lv '+G.lvl+'/10 · โบนัส EXP +'+G.lvl+'% · ตำแหน่งคุณ: '+gdRN(G.r)+'</small></div></div>'+
      '<div style="font-size:13px;padding:6px 8px;border-radius:8px;background:rgba(255,255,255,.05)">📢 '+(G.nt?esc(G.nt):'<span style="opacity:.6">ยังไม่มีประกาศ</span>')+'</div>'+
      (G.r>=1?'<div style="display:flex;gap:6px"><input id="gdnt" maxlength="80" placeholder="แก้ประกาศกิลด์" style="flex:1;min-width:0"><button data-gda="nt">บันทึก</button></div>':'')+'</div>';
    h+='<div class="card"><div class="cap">🗓️ ภารกิจกิลด์สัปดาห์นี้ (ช่วยกันทั้งกิลด์ · รีเซ็ตทุกวันจันทร์)</div>'+
      [['⚔️ ล่ามอนสเตอร์','k','#e25b4f'],['👑 ล้มบอส','b','#e8b54a'],['⛏️ เก็บวัตถุดิบ','g','#58c06a']].map(([n,k,c])=>'<div style="font-size:12.5px;display:flex;justify-content:space-between"><span>'+n+'</span><b>'+Math.min(W.p[k],g[k]).toLocaleString()+' / '+g[k].toLocaleString()+'</b></div>'+gdBar(W.p[k],g[k],c)).join('')+
      '<small style="opacity:.8">แต้มช่วยของคุณ: <b>'+W.ct+'</b> (ต้อง ≥30 ถึงรับรางวัลได้)</small>'+
      (W.done?(W.cl?'<b style="color:#9fe89f">✓ รับรางวัลสัปดาห์นี้แล้ว</b>':'<button class="pri" data-gda="wkc">🎁 รับรางวัลประจำสัปดาห์ ('+(3000*Math.max(1,G.lvl)).toLocaleString()+' ทอง + สีย้อมหายาก)</button>'):'<small style="opacity:.7">ครบทั้ง 3 ข้อ = กิลด์เลเวลอัป + ทุกคนที่ช่วยรับรางวัลได้</small>')+'</div>';
    h+='<div class="card">'+(G.r>=2?'<div class="cap">⚙️ หัวหน้ากิลด์</div><div style="display:flex;flex-wrap:wrap;gap:4px">'+GDEM.map((e,i)=>'<button data-gdse="'+i+'" style="font-size:16px;padding:3px 6px'+(G.e===e?';outline:2px solid var(--u-gold)':'')+'">'+e+'</button>').join('')+'</div><div style="display:flex;flex-wrap:wrap;gap:6px">'+GDCOL.map((c,i)=>'<button data-gdsc="'+i+'" style="width:26px;height:26px;padding:0;border-radius:50%;background:'+c+(G.col===i?';outline:3px solid #fff':'')+'"></button>').join('')+'</div>':'')+
      '<div style="display:flex;gap:6px;justify-content:flex-end">'+(G.r>=2?'<button data-gda="dis" style="font-size:12px">'+(GDS.cf==='dis'?'⚠️ ยืนยันยุบกิลด์':'ยุบกิลด์')+'</button>':'')+'<button data-gda="lv" style="font-size:12px">'+(GDS.cf==='lv'?'⚠️ ยืนยันออก':'ออกจากกิลด์')+'</button></div></div>'}
  else if(T==='gb')h+=gbHTML(G);
  else if(T==='mem'){const L=G.mem.slice().sort((a,b)=>(b[5]-a[5])||(b[4]-a[4])||(b[3]-a[3]));
    if(G.r>=1)h+='<div class="card"><div class="cap">➕ เชิญเข้ากิลด์ (ผู้เล่นต้องออนไลน์)</div><div style="display:flex;gap:6px"><input id="gdiv" maxlength="24" placeholder="ชื่อตัวละคร" style="flex:1;min-width:0"><button class="pri" data-gda="inv">เชิญ</button></div></div>';
    h+='<div class="card">'+L.map(m=>{const[mid,n,c,lv,r,on,mp,aw]=m,me2=mid===G.me,sel=GDS.sel===mid;
      let act='';if(sel&&!me2){if(G.r>r)act+='<button data-gda="kick:'+mid+'" style="font-size:11px">'+(GDS.cf==='kick:'+mid?'⚠️ ยืนยันเตะ':'เตะออก')+'</button>';if(G.r>=2){act+='<button data-gda="rk:'+mid+':'+(r===1?0:1)+'" style="font-size:11px">'+(r===1?'ลดเป็นสมาชิก':'ตั้งเป็นรอง ⭐')+'</button><button data-gda="ld:'+mid+'" style="font-size:11px">'+(GDS.cf==='ld:'+mid?'⚠️ ยืนยันมอบ':'มอบหัวหน้า 👑')+'</button>'}try{if(on)act+='<button data-gdw="'+esc(n)+'" style="font-size:11px">🌀 วาปไปหา</button>'}catch(e){}}
      return'<div data-gds="'+mid+'" style="cursor:pointer;padding:6px 4px;border-bottom:1px solid var(--u-line)"><div style="display:flex;align-items:center;gap:8px"><span>'+(on?(aw?'🟡':'🟢'):'⚫')+'</span><div style="flex:1;min-width:0"><b style="font-size:13px">'+esc(n)+(me2?' (คุณ)':'')+'</b><small style="display:block;opacity:.75">'+gdRN(r)+' · '+(CL[c]?CL[c].n:c)+' Lv '+lv+(on&&mp!=null&&MAPS[mp]?' · '+MAPS[mp].n:'')+'</small></div></div>'+(act?'<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">'+act+'</div>':'')+'</div>'}).join('')+'</div>'}
  else{GDS.rd=0;gdBadge();const L=(G.log||[]).slice(-30);
    h+='<div class="card" id="gdlog" style="max-height:300px;overflow:auto;font-size:13px">'+(L.length?L.map(q=>'<div><b style="color:'+gdCol(G.col)+'">'+esc(q.n)+'</b>: '+esc(q.t)+' <small style="opacity:.5">'+new Date(q.at).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})+'</small></div>').join(''):'<small style="opacity:.6">ยังไม่มีข้อความ</small>')+'</div>'+
      '<div style="display:flex;gap:6px"><input id="gdch" maxlength="80" placeholder="พิมพ์ถึงเพื่อนกิลด์" style="flex:1;min-width:0"><button class="pri" data-gda="ch">ส่ง</button></div>'}
  ov.innerHTML='<div class="pn" data-pn="gd">'+h+'</div>';
  const lg=$('gdlog');if(lg)lg.scrollTop=lg.scrollHeight;const ci=$('gdch');if(ci)ci.onkeydown=e=>{if(e.key==='Enter')gdAct('ch')}}
function gdAct(a){const G=GDS.g;const p=a.split(':'),op=p[0];
  if(op==='mk'){const nm=($('gdnm')||{}).value||'',tag=(($('gdtg')||{}).value||'').toUpperCase();GDS.mk.nm=nm;GDS.mk.tag=tag;if(me.lv<GDLV0)return gdUI('ต้องเลเวล '+GDLV0+' ขึ้นไป');if(me.gold<GDCOST)return gdUI('ทองไม่พอ (ต้อง '+GDCOST.toLocaleString()+')');gdEmit('mk',{nm,tag,e:GDS.mk.e,col:GDS.mk.col});return}
  if(op==='acc'||op==='dec'){gdEmit(op,{id:+p[1]});GDS.inv=GDS.inv.filter(q=>q.id!==+p[1]);gdBadge();return}
  if(!G)return;
  if(op==='inv'){const n=(($('gdiv')||{}).value||'').trim();if(!n)return;gdEmit('inv',{to:n});return}
  if(op==='ch'){const i=$('gdch'),t=(i&&i.value||'').trim();if(!t)return;gdEmit('ch',{s:t});i.value='';return}
  if(op==='nt'){gdEmit('set',{nt:(($('gdnt')||{}).value||'')});return}
  if(op==='wkc'){gdEmit('wkc');return}
  if(op==='gbs'){if(!gbCanGo())return;gdEmit('gbs');return}
  if(op==='gbc'){gdEmit('gbc',{s:+p[1]});return}
  /* ต้องกดยืนยันสองครั้ง */
  if(op==='lv'||op==='dis'||op==='kick'||op==='ld'){if(GDS.cf!==a){GDS.cf=a;gdUI();return}GDS.cf='';if(op==='lv'||op==='dis')gdEmit(op);else gdEmit(op,{t:p[1]});return}
  if(op==='rk'){gdEmit('rk',{t:p[1],r:+p[2]});return}}
function gdClick(e){if(ov.dataset.k!=='gd')return;const b=e.target.closest&&e.target.closest('[data-gda],[data-gdt],[data-gde],[data-gdc],[data-gds],[data-gdse],[data-gdsc],[data-gdw]');if(!b)return;e.stopPropagation();try{sfx('click')}catch(_){}
  if(b.dataset.gdt){GDS.tab=b.dataset.gdt;GDS.cf='';gdUI();return}
  if(b.dataset.gde!=null){GDS.mk.nm=($('gdnm')||{}).value||GDS.mk.nm;GDS.mk.tag=($('gdtg')||{}).value||GDS.mk.tag;GDS.mk.e=+b.dataset.gde;gdUI();return}
  if(b.dataset.gdc!=null){GDS.mk.nm=($('gdnm')||{}).value||GDS.mk.nm;GDS.mk.tag=($('gdtg')||{}).value||GDS.mk.tag;GDS.mk.col=+b.dataset.gdc;gdUI();return}
  if(b.dataset.gdse!=null){gdEmit('set',{e:+b.dataset.gdse});return}
  if(b.dataset.gdsc!=null){gdEmit('set',{col:+b.dataset.gdsc});return}
  if(b.dataset.gdw){const n=b.dataset.gdw;try{const f=(typeof friWarp==='function')?friWarp:null;if(f){ov.hidden=true;f(n)}}catch(_){}return}
  if(b.dataset.gds&&!e.target.closest('button')){GDS.sel=GDS.sel===b.dataset.gds?'':b.dataset.gds;GDS.cf='';gdUI();return}
  if(b.dataset.gda)gdAct(b.dataset.gda)}
/* ---- ตราใต้เท้า ---- */
function gdTagOf(lk){if(!lk)return null;if(lk.u===uid){const G=GDS.g;return G?{e:G.e,t:G.tag,c:G.col}:null}const s=lk.gt;if(typeof s!=='string'||!s)return null;const p=s.split('|');if(p.length<3)return null;return{e:p[0],t:p[1].slice(0,4),c:+p[2]|0}}
function gdDrawTag(x,y,T){g.save();g.font='bold 9px system-ui';g.textAlign='center';const s=T.e+' '+T.t,w=g.measureText(s).width+8;g.globalAlpha=.85;g.fillStyle='rgba(10,8,14,.55)';g.beginPath();g.roundRect(x-w/2,y+19,w,12,6);g.fill();
  g.globalAlpha=1;g.fillStyle=gdCol(T.c);g.fillText(s,x,y+28.5);g.restore()}
/* ---- นับแต้มช่วยภารกิจกิลด์ ---- */
function gdTrack(){if(!me.cls||!GDS.g)return;const S=me.stt||{},bs=S.b?Object.values(S.b).reduce((a,b)=>a+(+b||0),0):0,gx=((me.gth&&me.gth.ox)|0)+((me.gth&&me.gth.hx)|0);
  const L=GDS.last;if(!L||L.cls!==me.cls||L.n!==me.nm){GDS.last={k:S.k|0,b:bs,gx,cls:me.cls,n:me.nm};return}
  if((S.k|0)>L.k)GDS.acc.k+=(S.k|0)-L.k;if(bs>L.b)GDS.acc.b+=bs-L.b;if(gx>L.gx)GDS.acc.g+=1;L.k=S.k|0;L.b=bs;L.gx=gx;
  const now=performance.now(),A=GDS.acc;if(now-GDS.wkT>16000&&(A.k||A.b||A.g)){GDS.wkT=now;const a={k:Math.min(150,A.k),b:Math.min(4,A.b),g:Math.min(25,A.g)};A.k-=a.k;A.b-=a.b;A.g-=a.g;gdEmit('wk',{a});setTimeout(()=>gdEmit('q'),1200)}}
setTimeout(()=>{
  const st=document.createElement('style');st.textContent='#gdb i{font-style:normal}';document.head.appendChild(st);
  document.addEventListener('click',gdClick,true);
  {let done=false;setInterval(()=>{try{if(!done&&room&&room.on){done=true;room.on('gdr',m=>{if(m.sameTab||!m.data)return;try{gdR(m.data.d)}catch(e){}});room.on('gdn',m=>{if(m.sameTab||!m.data)return;try{gdN(m.data.d)}catch(e){}})}
      gdBtn();if(me.cls&&run&&gdOnl()){const now=performance.now();if(now-GDS.q>15000){GDS.q=now;gdEmit('q')}}gdTrack()}catch(e){}},1000)}
  /* ตราใต้เท้าตัวละคร */
  try{const _d0=drawP0;drawP0=function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx,tt,c2,lk){const r=_d0.apply(this,arguments);try{if(!PGNT&&!down){const T=gdTagOf(lk);if(T)gdDrawTag(x,y,T)}}catch(e){}return r}}catch(e){}
  /* EXP โบนัสกิลด์ */
  try{const _fm=fdM;window.fdM=fdM=function(k){const v=_fm.apply(this,arguments);return k==='xp'?v+gdXpB():v}}catch(e){}
  /* แตะตัวผู้เล่น → ชวนเข้ากิลด์ */
  try{const _pp=plPopShow;plPopShow=function(u){const r=_pp.apply(this,arguments);try{const G=GDS.g,o=others[u],el=$('plpop');if(G&&G.r>=1&&o&&el&&!(o.gt&&o.gt.split('|')[1]===G.tag)){const b=document.createElement('button');b.dataset.gdi=o.n;b.textContent='🏰 ชวนเข้ากิลด์';const x=el.querySelector('.ppx');el.insertBefore(b,x||null)}}catch(e){}return r}}catch(e){}
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-gdi]');if(!b)return;e.stopPropagation();gdEmit('inv',{to:b.dataset.gdi});try{$('plpop').hidden=true}catch(_){}},true);
},890);
