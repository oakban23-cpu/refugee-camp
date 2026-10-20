/* ===== v467 · ภารกิจกิลด์รายวัน =====
   - 4 ภารกิจต่อคนต่อวัน (รีเซ็ตเที่ยงคืนเวลาไทย): 🏠 แวะบ้านกิลด์ · 🌱 ช่วยงานฟาร์ม 2 ครั้ง · 💰 บริจาคเข้าคลัง · ⚔️ ล่ามอน 60 ตัว
   - เซิร์ฟเวอร์นับเองจากการกระทำจริง (รดน้ำ/ปลูก/เก็บ · บริจาค · รายงานล่ามอนเดิม) · รับรางวัลทีละภารกิจ + โบนัสครบ 4
   - ทุกภารกิจที่สมาชิกรับรางวัลเติม «หลอดภารกิจกิลด์» · เต็มแล้ว: คลัง + ไม้ · บัฟ EXP/ทอง +5% ทั้งกิลด์ถึงเที่ยงคืน · คนที่ทำอย่างน้อย 1 ภารกิจรับหีบกิลด์ได้ */
const GDQ={L:[['v','🏠','แวะบ้านกิลด์','เข้าบ้านกิลด์ (ประตูในค่าย)'],['f','🌱','ช่วยงานฟาร์ม','ปลูก · รดน้ำ · เก็บผัก หรือเก็บผลไม้'],['d','💰','บริจาคเข้าคลัง','บริจาคทองเข้าคลังกิลด์ 1 ครั้ง (Lv 20+)'],['k','⚔️','ล่ามอนสเตอร์','ล่ามอนที่ไหนก็ได้']],N:{v:1,f:2,d:1,k:60},until:0,seen:''};
const gdqOf=()=>{try{return GDS.g&&GDS.g.hq&&GDS.g.hq.dq||null}catch(e){return null}};
function gdqCan(){const Q=gdqOf();if(!Q)return 0;let n=GDQ.L.filter(([k])=>(Q.p[k]|0)>=GDQ.N[k]&&!Q.c.includes(k)).length;if(GDQ.L.every(([k])=>Q.c.includes(k))&&!Q.c.includes('all'))n++;if(Q.full&&!Q.bc&&Q.me>0)n++;return n}
function gdqBody(G,H,t,col){const Q=H.dq;if(!Q)return'<div class="card hint">กำลังโหลดภารกิจ…</div>';let h='';const ok=k=>(Q.p[k]|0)>=GDQ.N[k],cl=k=>Q.c.includes(k);
  h+='<div class="card" style="text-align:left;border-color:'+col+'88"><div class="cap">📋 หลอดภารกิจของกิลด์วันนี้</div><div style="font-size:12px;display:flex;justify-content:space-between"><span>ทุกภารกิจที่สมาชิกทำสำเร็จเติมหลอด</span><b>'+Math.min(Q.n,Q.goal)+' / '+Q.goal+'</b></div>'+gdBar(Math.min(Q.n,Q.goal),Q.goal,Q.full?'#58c06a':col)+
    (Q.full?'<div style="font-size:12px;margin-top:5px;color:#9fe89f">✅ ครบหลอดแล้ว! ทั้งกิลด์ได้บัฟ <b>EXP +5% · ทอง +5%</b> ถึงเที่ยงคืน'+(Q.bu>0?' (เหลือ '+ghTm(Q.bu)+')':'')+'</div>'+
      (Q.bc?'<small style="opacity:.75">รับหีบกิลด์วันนี้แล้ว</small>':Q.me>0?'<button class="pri" data-gh2="dc:bar" style="margin-top:5px">🎁 รับหีบกิลด์ ('+(40000*t).toLocaleString()+' ทอง · แต้มกิลด์ +3)</button>':'<small style="opacity:.75">ทำภารกิจอย่างน้อย 1 อย่างเพื่อรับหีบกิลด์</small>')
    :'<small style="display:block;opacity:.75;margin-top:4px">เต็มหลอด: คลัง +'+(200000*t).toLocaleString()+' · 🪵 +'+2*t+' · บัฟ EXP/ทอง +5% ทั้งกิลด์ · หีบกิลด์ให้ทุกคนที่ช่วย</small>')+'</div>';
  h+='<div class="card" style="text-align:left"><div class="cap">🎯 ภารกิจของคุณวันนี้ <small style="opacity:.7">· รีเซ็ตเที่ยงคืน</small></div>';
  GDQ.L.forEach(([k,ic,n,ds])=>{const p=Math.min(GDQ.N[k],Q.p[k]|0),o=ok(k),c=cl(k);
    h+='<div class="qr"><div class="ico">'+(c?'✅':ic)+'</div><div class="nm"><b>'+n+(GDQ.N[k]>1?' '+GDQ.N[k]+(k==='k'?' ตัว':' ครั้ง'):'')+'</b><small>'+ds+' · '+p+'/'+GDQ.N[k]+'</small>'+gdBar(p,GDQ.N[k],o?'#58c06a':'#e8b54a')+'</div>'+
      (c?'<small style="opacity:.7">รับแล้ว</small>':o?'<button class="pri" data-gh2="dc:'+k+'" style="font-size:12px;padding:4px 8px">รับ</button>':'<small style="opacity:.6;white-space:nowrap">'+(15000*t).toLocaleString()+' 💰<br>+2 แต้ม</small>')+'</div>'});
  const all=GDQ.L.every(([k])=>cl(k));
  h+='<div class="qr" style="border-color:#ffd84a66"><div class="ico">'+(Q.c.includes('all')?'✅':'🏆')+'</div><div class="nm"><b>โบนัสทำครบ 4 ภารกิจ</b><small>'+(50000*t).toLocaleString()+' ทอง · แต้มกิลด์ +5</small></div>'+
    (Q.c.includes('all')?'<small style="opacity:.7">รับแล้ว</small>':'<button class="pri" data-gh2="dc:all" style="font-size:12px;padding:4px 8px"'+(all?'':' disabled')+'>รับ</button>')+'</div></div>';
  h+='<div class="card hint" style="text-align:left;font-size:12px">💡 แต้มกิลด์ใช้แลกของในแท็บ 🛒 ร้าน · รางวัลทองตามขั้นบ้านกิลด์ (ขั้น '+t+')</div>';
  return h}
ghBody2=(f=>function(TB,G,H,t,col){if(TB==='quest')return gdqBody(G,H,t,col);return f.apply(this,arguments)})(ghBody2);
ghAct2=(f=>function(a){const p=a.split(':');if(p[0]==='dc'){gdEmit('hdc',{k:p[1]});return}return f.apply(this,arguments)})(ghAct2);
gdR=(f=>function(d){const r=f.apply(this,arguments);try{const Q=gdqOf();GDQ.until=Q&&Q.bu>0?Date.now()+Q.bu:0}catch(e){}return r})(gdR);
const GDQN={k:'ล่ามอน',v:'แวะบ้านกิลด์',f:'ช่วยงานฟาร์ม',d:'บริจาคเข้าคลัง'};
gdN=(f=>function(d){try{if(d&&d.t==='hdq'){const G=GDS.g;if(G&&G.hq){G.hq.dq=d.dq}if(d.done){const s='📋 ภารกิจกิลด์สำเร็จ: '+GDQN[d.k]+' · รับรางวัลที่ 📋 กระดานกิลด์ในบ้านกิลด์';try{sysMsg(s)}catch(e){}if(ov.dataset.k==='gh'&&!ov.hidden)ghUI(s);else banner={s,t:3.5}}else if(ov.dataset.k==='gh'&&!ov.hidden&&GHS.tab==='quest')ghUI();return}
  if(d&&d.t==='hdc'){if(!d.id||GH2.got.has(d.id))return;GH2.got.add(d.id);const g0=Math.max(0,Math.min(5e6,d.g|0));me.gold+=g0;try{writeSave()}catch(e){}try{sfx('coin')}catch(e){}const s=(d.k==='bar'?'🎁 รับหีบกิลด์':d.k==='all'?'🏆 โบนัสครบภารกิจ':'📋 รับรางวัลภารกิจ')+' · +'+g0.toLocaleString()+' ทอง · แต้มกิลด์ +'+(d.pt|0);if(ov.dataset.k==='gh'&&!ov.hidden)ghUI(s);else banner={s,t:3.5};return}
  if(d&&d.t==='hdqf'){const G=GDS.g,s='📋 '+(G?'['+G.tag+'] ':'')+'ภารกิจกิลด์ครบหลอด! (ปิดท้ายโดย '+d.n+') · บัฟ EXP/ทอง +5% ทั้งกิลด์ถึงเที่ยงคืน · รับหีบกิลด์ได้';try{sysMsg(s)}catch(e){}banner={s,t:4.5};try{sfx('lvl')}catch(e){}return}}catch(e){}return f.apply(this,arguments)})(gdN);
/* บัฟทั้งกิลด์เมื่อครบหลอด */
const gdqBuf=()=>GDQ.until>Date.now()&&!!GDS.g;
fdM=(f=>function(k){let v=f.apply(this,arguments);try{if((k==='xp'||k==='gd')&&gdqBuf())v+=.05}catch(e){}return v})(fdM);
buffList=(f=>function(){const L=f.apply(this,arguments);try{if(gdqBuf()&&me.cls&&run&&me.down<=0)L.push({k:'gdq',ic:'📋',n:'ขวัญกำลังใจกิลด์',d:'EXP +5% · ทอง +5% · ภารกิจกิลด์ครบหลอด',t:(GDQ.until-Date.now())/1000,mx:86400,col:'#9fe89f'})}catch(e){}return L})(buffList);
/* แวะบ้านกิลด์ → นับภารกิจ + เตือนภารกิจวันนี้ครั้งแรกของวัน */
ghEnter=(f=>function(){const r=f.apply(this,arguments);setTimeout(()=>{try{if(!ghHere())return;const Q=gdqOf();if(!Q||(Q.p.v|0)<1)gdEmit('hdv');const day=new Date(Date.now()+7*3600e3).toISOString().slice(0,10);if(Q&&GDQ.seen!==day){GDQ.seen=day;const n=GDQ.L.filter(([k])=>Q.c.includes(k)).length;if(n<4)banner={s:'📋 ภารกิจกิลด์วันนี้ '+n+'/4 · ดูที่ 📋 กระดานกิลด์',t:4}}}catch(e){}},1500);return r})(ghEnter);
