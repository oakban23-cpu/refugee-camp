/* ---------- v429 บอสกิลด์ประจำสัปดาห์ (🐉 อสูรกิลด์) ----------
   - สมาชิกท้าได้วันละ 3 ครั้ง ครั้งละ 60 วิ ในลานแบบบอสโลก (ใช้ระบบบอสโลกเดิม แต่ไม่นับอันดับ/สถิติบอสโลก)
   - เลือดบอสเก็บบนเซิร์ฟเวอร์ (ต่อกิลด์ ต่อสัปดาห์) · ขั้นละเลือด ×1.6 · ดาเมจเกินทะลุไปขั้นถัดไป · สูงสุด 20 ขั้น
   - ล้มแต่ละขั้น = ทุกคนที่ท้าอย่างน้อย 1 ครั้งในสัปดาห์รับรางวัลขั้นนั้นได้ · อันดับดาเมจในกิลด์ */
const GBS={go:null,res:null,mp0:null,t0:0};
const GBN='อสูรกิลด์';
function gbRw(s){const r={g:30000*s};if(s%3===0)r.rn=30;if(s===5||s===15)r.dy='d7';if(s===10||s===20){r.dy='d8';r.th=5}return r}
function gbRwTx(r){const L=['💰'+r.g.toLocaleString()];if(r.rn)L.push('💠 ผงรูน '+r.rn);if(r.dy)L.push(r.dy==='d8'?'🌈 สีย้อมรุ้ง':'🟡 สีย้อมทอง');if(r.th)L.push('✂️ ด้าย '+r.th);return L.join(' · ')}
function gbFmt(n){n=+n||0;return n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(2)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':String(Math.round(n))}
function gbBadgeN(){try{const B=GDS.g&&GDS.g.gb;if(!B)return 0;let n=0;if(B.my&&B.my.n>0)for(let s=1;s<B.s&&s<=B.smx;s++)if(!(B.cl||[]).includes(s))n++;if(B.left>0&&B.s<=B.smx&&!(B.my&&B.my.n))n++;return n}catch(e){return 0}}
function gbCanGo(){if(!me.cls||me.down>0)return false;if(me.lv<20){gdMsg('⚠️ ต้องเลเวล 20 ขึ้นไป');return false}try{if(isDg()&&!isWB()){gdMsg('⚠️ ออกจากดันเจี้ยนก่อน');return false}}catch(e){}if(GBS.go&&isWB()){gdMsg('⚠️ กำลังท้าอสูรกิลด์อยู่');return false}return true}
function gbHTML(G){const B=G.gb;if(!B)return'<div class="card hint">กำลังโหลดข้อมูลบอสกิลด์…</div>';const col=gdCol(G.col),all=B.s>B.smx;
  let h='<div class="card" style="border-color:'+col+'88;text-align:left"><div style="display:flex;align-items:center;gap:10px"><span style="font-size:38px">🐉</span><div style="flex:1;min-width:0"><b style="font-size:16px;color:'+col+'">'+GBN+(all?' · ล้มครบ '+B.smx+' ขั้นแล้ว!':' ขั้น '+B.s+'/'+B.smx)+'</b>'+
    '<small style="display:block;opacity:.8">ช่วยกันทั้งกิลด์ · รีเซ็ตวันจันทร์ · ขั้นต่อไปเลือดเพิ่ม ×1.6</small></div></div>';
  if(!all)h+='<div style="font-size:12px;display:flex;justify-content:space-between;margin-top:4px"><span>❤️ เลือดขั้นนี้</span><b>'+gbFmt(B.hp)+' / '+gbFmt(B.mx)+'</b></div>'+gdBar(B.hp,B.mx,'#e25b4f');
  h+='<div style="display:flex;align-items:center;gap:8px;margin-top:8px"><div style="flex:1;font-size:12px">ท้าได้อีกวันนี้ <b>'+B.left+'/3</b> ครั้ง<br><small style="opacity:.75">ดาเมจของคุณสัปดาห์นี้ '+gbFmt(B.my.d)+' ('+B.my.n+' ครั้ง · สูงสุด '+gbFmt(B.my.b)+')</small></div>'+
    '<button class="pri" data-gda="gbs"'+(B.left>0&&!all?'':' disabled')+' style="white-space:nowrap">⚔️ ท้าอสูร</button></div>'+
    '<small style="display:block;opacity:.7;margin-top:4px">เข้าลานเดี่ยว 60 วิ ตีให้ได้ดาเมจมากที่สุด · หลบท่าบอสเหมือนบอสโลก · ดาเมจทั้งหมดหักเลือดอสูรของกิลด์</small></div>';
  /* รางวัลแต่ละขั้น */
  const cl=B.cl||[],did=B.my&&B.my.n>0;let rw='';for(let s=1;s<=B.smx;s++){const r=gbRw(s),dead=s<B.s,got=cl.includes(s);if(!dead&&s>B.s+2)break;
    rw+='<div class="qr" style="'+(dead?'':'opacity:.55')+'"><div class="ico">'+(got?'✅':dead?'🎁':'🔒')+'</div><div class="nm"><b>ขั้น '+s+'</b><small>'+gbRwTx(r)+'</small></div>'+(dead&&!got?'<button class="pri" data-gda="gbc:'+s+'"'+(did?'':' disabled')+'>รับ</button>':'')+'</div>'}
  h+='<div class="card"><div class="cap">🎁 รางวัลขั้นที่ล้มได้'+(did?'':' · ต้องท้าอย่างน้อย 1 ครั้งก่อนจึงรับได้')+'</div>'+rw+'<small style="opacity:.7">รับได้ก่อนรีเซ็ตวันจันทร์ · ขั้น 5/10/15/20 มีสีย้อมหายาก</small></div>';
  /* อันดับ */
  h+='<div class="card"><div class="cap">🏆 อันดับดาเมจในกิลด์ (สัปดาห์นี้)</div>'+(B.rk&&B.rk.length?B.rk.map((r,i)=>'<div style="display:flex;gap:8px;font-size:12.5px;padding:3px 2px;'+(r[3]?'color:'+col+';font-weight:700':'')+'"><span style="width:22px">'+(i<3?['🥇','🥈','🥉'][i]:(i+1)+'.')+'</span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(r[0])+'</span><b>'+gbFmt(r[1])+'</b><small style="opacity:.6;width:36px;text-align:right">'+r[2]+' ครั้ง</small></div>').join(''):'<small style="opacity:.6">ยังไม่มีใครท้า เป็นคนแรกเลย!</small>')+'</div>';
  if(B.last&&B.last.k)h+='<div class="card hint" style="font-size:11.5px">📜 สัปดาห์ก่อน: ล้มได้ '+B.last.s+' ขั้น'+(B.last.top&&B.last.top.length?' · ดาเมจสูงสุด '+B.last.top.map(t=>esc(t[0])+' '+gbFmt(t[1])).join(', '):'')+'</div>';
  return h}
/* ---- เข้าลาน ---- */
function gbEnter(tk,s){const id=82000+(Math.random()*999|0);if(!dgMap(id))return false;const M=MAPS[id];GBS.go={tk,s,id,done:0,sent:0,gm:!!gmUsed};GBS.mp0={n:M.boss.n,ring:M.ring,name:M.n};
  try{const G=GDS.g;M.boss.n='🐉 '+GBN+' ขั้น '+s;M.n='ห้องโถงกิลด์'+(G?' ['+G.tag+']':'');gbTheme(M)}catch(e){}
  ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX,y:CY+380});WB.res=null;banner={s:'🐉 '+GBN+' ขั้น '+s+' · เริ่มใน 3 วินาที · ตีให้ได้ดาเมจมากที่สุดใน 60 วิ!',t:5};
  setTimeout(()=>{try{if(GBS.go&&isWB()&&dg&&dg.ph!=='boss')wbStart()}catch(e){}},1200);return true}
function gbRestoreMap(){const G=GBS.go,M=G&&MAPS[G.id];if(M&&GBS.mp0){M.boss.n=GBS.mp0.n;M.ring=GBS.mp0.ring;M.n=GBS.mp0.name}GBS.mp0=null}
function gbSubmit(d){const G=GBS.go;if(!G||G.sent)return;G.sent=1;G.done=1;const dm=G.gm||gmUsed?0:Math.max(0,Math.round(d||0));GBS.res={d:dm,s:G.s};gdEmit('gbh',{tk:G.tk,d:dm})}
function gbN(d){
  if(d.t==='gbs'){if(!d.tk)return;if(!gbEnter(d.tk,d.s|0))gdMsg('⚠️ เข้าลานไม่ได้');return}
  if(d.t==='gbh'){const k=Array.isArray(d.kills)?d.kills:[];banner={s:'🐉 ส่งดาเมจ '+gbFmt(d.d)+' เข้าอสูรกิลด์แล้ว'+(k.length?' · ล้มขั้น '+k.join(', ')+'! 🎉 รับรางวัลที่เมนู › กิลด์':''),t:6};
    try{sysMsg('🐉 อสูรกิลด์: คุณทำดาเมจ '+gbFmt(d.d)+(k.length?' · ล้มขั้น '+k.join(', '):''))}catch(e){}if(k.length){try{sfx('lvl')}catch(e){}try{burst(me.x,me.y-20,['#ffd84a','#ffffff','#e25b4f'],36,160,1,{glow:1,g:-40})}catch(e){}}return}
  if(d.t==='gbk'){const G=GDS.g;try{sysMsg('🏰'+(G?'['+G.tag+'] ':' ')+'🐉 '+d.n+' ล้มอสูรกิลด์ขั้น '+d.s+'! รับรางวัลได้ที่เมนู › กิลด์')}catch(e){}banner={s:'🐉 '+d.n+' ล้มอสูรกิลด์ขั้น '+d.s+'! รับรางวัลได้ที่เมนู › กิลด์',t:5};try{sfx('quest')}catch(e){}return}
  if(d.t==='gbc'){const s=d.s|0;if(s<1||s>20)return;const k='gbc_'+(d.k||'')+'_'+s;me.gbcl=me.gbcl||{};if(me.gbcl[k])return;me.gbcl[k]=1;
    const r=gbRw(s);me.gold+=r.g;if(r.rn)try{rnShard(r.rn,'guildboss')}catch(e){}if(r.dy)try{dyAdd(r.dy,1)}catch(e){}if(r.th)try{wdrThread(r.th,'อสูรกิลด์')}catch(e){}
    try{me.stt.gbs=Math.max(me.stt.gbs|0,s)}catch(e){}try{writeSave()}catch(e){}try{sfx('coin')}catch(e){}gdMsg('🎁 รางวัลอสูรกิลด์ขั้น '+s+': '+gbRwTx(r))}}
setTimeout(()=>{try{
  /* จบรอบในลาน: ไม่นับสถิติ/อันดับบอสโลก แล้วส่งดาเมจเข้ากิลด์ */
  const _f=wbFinish;wbFinish=function(dead){const G=GBS.go;if(!G||G.done||!isWB()||dg.ph!=='boss')return _f.apply(this,arguments);const d=Math.round(WB.dmg||0),gm0=gmUsed;gmUsed=true;let r;try{r=_f.apply(this,arguments)}finally{gmUsed=gm0}
    gbSubmit(d);banner={s:'🐉 '+GBN+': ดาเมจรวม '+gbFmt(d)+' · ออกทางประตูเพื่อกลับค่าย',t:6};return r};
  /* ในลานกิลด์ห้ามเริ่มรอบใหม่ (1 ครั้งท้า = 1 รอบ) */
  const _s=wbStart;wbStart=function(){const G=GBS.go;if(G&&G.done&&isWB()){banner={s:'🐉 รอบท้านี้จบแล้ว · ท้าใหม่ได้จากเมนู › กิลด์ › 🐉 บอส',t:4};return}return _s.apply(this,arguments)};
  /* ออกจากลานกลางคัน → ส่งดาเมจเท่าที่ทำได้ */
  setInterval(()=>{try{const G=GBS.go;if(!G)return;if(!isWB()||curMap!==G.id){if(!G.sent)gbSubmit(WB.dmg);gbRestoreMap();GBS.go=null}}catch(e){}},500);
  addEventListener('pagehide',()=>{try{const G=GBS.go;if(G&&!G.sent&&isWB())gbSubmit(WB.dmg)}catch(e){}});
}catch(e){console.warn('gb init',e)}},1300);
