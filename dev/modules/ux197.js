/* ---------- v613 ปาร์ตี้/กิลด์ ชวนเข้าทีมง่ายขึ้น (PVF) ----------
   · หน้าปาร์ตี้มีการ์ด «ชวนเข้าทีม»: เพื่อนที่ออนไลน์ + สมาชิกกิลด์ที่ออนไลน์ เรียงคนที่อยู่แมพเดียวกันก่อน
     แต่ละคนมี 🟢 สถานะ · คลาส Lv · อยู่แมพไหน · ปุ่ม 👥 ชวน (ข้ามแมพได้ถ้าเป็นเพื่อน) · 🌀 วาปไปหา (เพื่อน)
   · หน้ากิลด์ › สมาชิก: คนที่ออนไลน์มีปุ่ม 👥 ชวนปาร์ตี้ ในแถวเลย ไม่ต้องแตะเปิดเมนูก่อน
   · อัปเดตเองทุกครั้งที่รายชื่อปาร์ตี้รีเฟรช · ปิด: PVF.off=1 */
const PVF={off:0};
function pvfCSS(){if(document.getElementById('pvfcss'))return;const s=document.createElement('style');s.id='pvfcss';s.textContent=
'#ov .pvfr{display:flex;align-items:center;gap:8px;padding:7px 4px;border-bottom:1px solid rgba(231,183,90,.15)}#ov .pvfr:last-child{border-bottom:0}'+
'#ov .pvfr .nm{flex:1;min-width:0}#ov .pvfr .nm b{display:block;font-size:13.5px}#ov .pvfr .nm small{font-size:11.5px;opacity:.75}#ov .pvfr .tg{font-size:10.5px;padding:1px 6px;border-radius:999px;background:rgba(255,236,205,.1);margin-left:4px;font-weight:400}'+
'#ov .pvfr button{min-height:38px;padding:0 10px;border-radius:10px;font-size:12.5px;white-space:nowrap}#ov .pvfr .here{color:#6fe0a0}'+
'#ov .pvfe{font-size:12.5px;opacity:.75;line-height:1.6;padding:4px 2px}#ov [data-gds] .pvgi{margin-left:auto;min-height:32px;padding:0 9px;border-radius:9px;font-size:11.5px;white-space:nowrap}';
document.head.appendChild(s)}
function pvfList(){const R=new Map();
  try{friSt().L.forEach(f=>{if(!friOn(f.n))return;const s=FRIS[f.n]||{};R.set(f.n,{n:f.n,c:s.c||f.c,lv:s.lv||f.lv,mp:s.mp|0,fr:1,u:friUid(f.n)})})}catch(e){}
  try{const G=GDS.g;if(G)G.mem.forEach(m=>{const[mid,n,c,lv,r,on,mp]=m;if(!on||mid===G.me||n===myName)return;const o=R.get(n);if(o){o.gd=1;return}R.set(n,{n,c,lv,mp:mp|0,gd:1,u:friUid(n)})})}catch(e){}
  return[...R.values()].filter(o=>o.n!==myName).sort((a,b)=>((b.mp===curMap)-(a.mp===curMap))||((b.lv|0)-(a.lv|0)))}
function pvfH(){const L=pvfList();let h='<div class="cap">ชวนเข้าทีม · เพื่อนและกิลด์ที่ออนไลน์</div>';
  if(!L.length)return h+'<div class="pvfe">ยังไม่มีเพื่อนหรือสมาชิกกิลด์ออนไลน์<br>เพิ่มเพื่อนได้ที่ เมนู › 👥 เพื่อน · คนที่เป็นเพื่อนชวนเข้าทีมข้ามแมพได้</div>';
  const full=PTY&&PTY.mem&&PTY.mem.length>=PTMAX,lead=!PTY||!PTY.mem||PTY.mem.length<=1||PTY.lead===uid;
  return h+L.slice(0,12).map(o=>{const C=CL[o.c]||{n:o.c||'-'},here=o.mp===curMap,inp=o.u&&inPty(o.u);let b='';
    if(inp)b='<small style="color:#6fe0a0">✅ ในทีมแล้ว</small>';else if(o.u&&!full&&lead)b='<button class="pri" data-pvi="'+esc(o.n)+'">👥 ชวน</button>';
    if(o.fr&&!here)b+='<button data-pvw="'+esc(o.n)+'">🌀 วาป</button>';
    return'<div class="pvfr"><span>🟢</span><div class="nm"><b>'+esc(o.n)+(o.fr?'<span class="tg">เพื่อน</span>':'')+(o.gd?'<span class="tg">กิลด์</span>':'')+'</b><small>'+C.n+' Lv '+(o.lv|0)+' · '+(here?'<span class="here">📍 แมพเดียวกัน</span>':friMapN(o.mp))+(!o.u?(here?' · อยู่ไกล เข้าไปใกล้ ๆ เพื่อชวน':' · ชวนข้ามแมพได้เฉพาะเพื่อน'):'')+'</small></div>'+b+'</div>'}).join('')+(full?'<div class="pvfe">ทีมเต็มแล้ว ('+PTMAX+' คน)</div>':!lead?'<div class="pvfe">เฉพาะหัวหน้าทีมชวนได้</div>':'')}
function pvfPost(){if(PVF.off||ov.dataset.k!=='party')return;const P=ov.querySelector('.pn[data-pn="party"]');if(!P)return;pvfCSS();let c=P.querySelector('#pvfc');
  if(!c){c=document.createElement('div');c.className='card';c.id='pvfc';const pl=$('plist'),pc=pl&&pl.closest('.card');if(pc)pc.before(c);else P.appendChild(c)}c.innerHTML=pvfH()}
function pvgPost(){if(PVF.off||ov.dataset.k!=='gd'||GDS.tab!=='mem')return;const G=GDS.g;if(!G)return;pvfCSS();
  ov.querySelectorAll('[data-gds]').forEach(row=>{const mid=row.dataset.gds,m=G.mem.find(x=>String(x[0])===mid);if(!m||!m[5]||m[0]===G.me||row.querySelector('.pvgi'))return;const n=m[1],u=friUid(n);if(u&&inPty(u))return;
    const top=row.firstElementChild;if(top)top.insertAdjacentHTML('beforeend',u?'<button class="pvgi pri" data-pvi="'+esc(n)+'">👥 ชวนปาร์ตี้</button>':((m[6]|0)===curMap?'<button class="pvgi" data-pvx="2">👥 อยู่ไกล</button>':'<button class="pvgi" data-pvx="1">👥 คนละแมพ</button>'))})}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{if(PVF.off||!me.cls)return;const b=e.target.closest&&e.target.closest('[data-pvi],[data-pvw],[data-pvx]');if(!b)return;e.stopPropagation();e.preventDefault();const k=ov.dataset.k;
  if(b.dataset.pvx==='2'){sysMsg('👥 อยู่แมพเดียวกันแต่ไกล · เดินเข้าไปใกล้ ๆ แล้วชวนได้');return}if(b.dataset.pvx){sysMsg('👥 อยู่คนละแมพ · เพิ่มเป็นเพื่อนก่อนจึงจะชวนข้ามแมพได้ หรือไปแมพเดียวกัน');return}
  if(b.dataset.pvi){friPtInv(b.dataset.pvi);b.disabled=true;b.textContent='✉️ ส่งแล้ว';return}
  if(b.dataset.pvw){friWarp(b.dataset.pvw);return}},true)}
setTimeout(()=>{try{
  const o=partyUI;window.partyUI=partyUI=function(){const r=o.apply(this,arguments);try{pvfPost()}catch(e){console.warn('pvf',e)}return r};
  const pl=partyList;window.partyList=partyList=function(){const r=pl.apply(this,arguments);try{if(ov.dataset.k==='party'&&!ov.hidden){const c=$('pvfc');if(c&&!c.contains(document.activeElement))c.innerHTML=pvfH()}}catch(e){}return r};
  const g=gdUI;window.gdUI=gdUI=function(){const r=g.apply(this,arguments);try{pvgPost()}catch(e){console.warn('pvf',e)}return r};
}catch(e){console.warn('pvf',e)}},2400);
