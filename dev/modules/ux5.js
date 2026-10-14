/* ---------- v371 หน้าตั้งค่า ----------
   รวมของที่เคยกระจาย (ปุ่มกราฟิกแบบกดวน · ภาพ HD · วัดความลื่น · ปุ่มเปิด/ปิดเสียงสองปุ่ม) ไว้หน้าเดียว + เพิ่ม:
   ความดังเพลง/เอฟเฟกต์แยกกัน (ต่อผ่านช่องเสียงของตัวเอง) · ขนาดตัวอักษร (เมนู/บทพูด/แชท/กล่องเควส) · สั่นจอ · สั่นเครื่อง · ตัวเลขดาเมจ
   ค่าทั้งหมดจำในเครื่อง (localStorage) */
const CFGV=(()=>{const d={vm:.8,vs:.9,fs:1,shk:1,vib:1};try{const o=JSON.parse(localStorage.getItem('refugee_set')||'{}');for(const k in d)if(typeof o[k]==='number')d[k]=o[k]}catch(e){}return d})();
function cfgSave(){try{localStorage.setItem('refugee_set',JSON.stringify(CFGV))}catch(e){}}
/* ช่องเสียงแยก: เอฟเฟกต์ / เพลง+เสียงบรรยากาศ */
const CFGA={a:null,s:null,m:null};
function cfgBus(a){if(!a)return null;if(CFGA.a!==a){CFGA.a=a;try{CFGA.s=a.createGain();CFGA.s.gain.value=CFGV.vs;CFGA.s.connect(a.destination);CFGA.m=a.createGain();CFGA.m.gain.value=CFGV.vm;CFGA.m.connect(a.destination)}catch(e){CFGA.s=CFGA.m=null}}return CFGA}
function sfxDest(a){const B=cfgBus(a);return B&&B.s||a.destination}
function musDest(a){const B=cfgBus(a);return B&&B.m||a.destination}
function cfgVol(k,v){CFGV[k]=Math.max(0,Math.min(1,v));cfgSave();const B=CFGA,n=k==='vs'?B.s:B.m;if(n&&B.a)try{n.gain.setTargetAtTime(CFGV[k],B.a.currentTime,.05)}catch(e){n.gain.value=CFGV[k]}}
/* ขนาดตัวอักษร: ขยายส่วน UI ที่เป็นตัวหนังสือ (ไม่แตะแคนวาส/ปุ่มควบคุม) */
const CFGFS=[[.9,'<small>ก</small> เล็ก'],[1,'ก ปกติ'],[1.12,'<big>ก</big> ใหญ่'],[1.25,'<big><b>ก</b></big> ใหญ่สุด']];
function cfgFsApply(){const z=CFGV.fs;let st=document.getElementById('setfs');if(!st){st=document.createElement('style');st.id='setfs';document.head.appendChild(st)}
  st.textContent=z===1?'':'#ov>.pn,#sdlg .sdb,#clog,#stq,#cbar{zoom:'+z+'}#clog{width:calc(58% / '+z+')!important}#stq{max-width:calc(178px * '+Math.min(1,1.06/z).toFixed(3)+')!important}'}
cfgFsApply();
/* สั่นเครื่อง */
try{if(navigator.vibrate){const _vb=navigator.vibrate.bind(navigator);navigator.vibrate=function(p){return CFGV.vib?_vb(p):false}}}catch(e){}
/* หน้าตั้งค่า */
function cfgUI(msg){if(!me.cls)return;ov.dataset.k='set';ov.hidden=false;const seg=(key,opts,cur)=>'<div class="setseg">'+opts.map(([v,l])=>'<button class="cfgb'+(String(v)===String(cur)?' on':'')+'" data-setk="'+key+'" data-setv="'+v+'">'+l+'</button>').join('')+'</div>';
  const sl=(k,ic,lb,off)=>'<div class="setrow"><span class="setl">'+ic+' '+lb+'</span><input type="range" min="0" max="100" step="5" value="'+Math.round(CFGV[k]*100)+'" data-setr="'+k+'"'+(off?' class="off"':'')+'><b class="setp" data-setp="'+k+'">'+Math.round(CFGV[k]*100)+'%</b></div>';
  const tg=(k,ic,lb,sub,on)=>'<div class="setrow"><span class="setl">'+ic+' '+lb+(sub?'<small>'+sub+'</small>':'')+'</span><button class="cfgb cfgt'+(on?' on':'')+'" data-sett="'+k+'">'+(on?'เปิด':'ปิด')+'</button></div>';
  let h=hdr('⚙️','ตั้งค่า','ค่าทั้งหมดจำไว้ในเครื่องนี้');if(msg)h+='<div class="note">'+msg+'</div>';
  const lowNow=GQ==='auto'&&LOWQ;
  h+='<div class="card"><div class="cap">🖥️ คุณภาพภาพ</div>'+seg('gq',[['auto','อัตโนมัติ'],['high','สูง'],['low','ประหยัด']],GQ)+'<div class="seth">'+({auto:'ปรับเองตามความลื่น'+(lowNow?' · <b>ตอนนี้ใช้โหมดประหยัดอยู่</b> เพราะเครื่องกระตุก':' · ตอนนี้ภาพเต็ม'),high:'คมชัดที่สุด · ใช้แรงเครื่องมากสุด (ไม่ลดเองแม้กระตุก)',low:'ลื่นที่สุด · ลดแสงเงาและความละเอียดลง ประหยัดแบต'}[GQ])+'</div>'
    +'<hr>'+tg('hd','🖼️','ภาพเมืองหลวง HD','ภาพวาดละเอียดในนครอัสตรา (โหลดเพิ่มครั้งแรก)',!!(typeof HDI!=='undefined'&&HDI.on))+'</div>';
  h+='<div class="card"><div class="cap">🔊 เสียง</div>'+sl('vm','🎵','เพลงประกอบ',!musOn)+sl('vs','💥','เสียงเอฟเฟกต์',muted)
    +'<div class="seth">ลากไปซ้ายสุดเพื่อปิด · ปุ่ม 🔊 🎵 มุมจอยังกดปิด/เปิดด่วนได้เหมือนเดิม</div></div>';
  h+='<div class="card"><div class="cap">🔤 ขนาดตัวอักษร</div>'+seg('fs',CFGFS.map(([v,l])=>[v,l]),CFGV.fs)+'<div class="seth">มีผลกับหน้าเมนู บทพูด แชท และกล่องเควส</div></div>';
  h+='<div class="card"><div class="cap">📳 การสั่น</div>'+tg('shk','💢','สั่นจอ','ตอนโดนตีแรง/ใช้สกิลใหญ่',CFGV.shk>0)+'<hr>'+tg('vib','📱','สั่นเครื่อง','ตอนกดสกิล/หลบ/ปลากินเหยื่อ',!!CFGV.vib)+'</div>';
  h+='<div class="bt"><button data-setperf="1">📊 วัดความลื่น</button><button data-setrst="1">↺ คืนค่าเริ่มต้น</button></div>';
  ov.innerHTML='<div class="pn" data-pn="set">'+h+'</div>'}
{const st=document.createElement('style');st.textContent='.setseg{display:flex;gap:5px;margin:4px 0 6px}#ov .pn button.cfgb:not(.on){background:rgba(255,255,255,.05)!important;color:#cbbd9c!important;box-shadow:none!important}.cfgb{flex:1 1 0;min-width:0;padding:8px 1px;border-radius:10px;font-size:12px;letter-spacing:-.2px;overflow:hidden;text-overflow:clip;line-height:1.2;white-space:nowrap;background:rgba(255,255,255,.05);border:1px solid rgba(231,183,90,.35);color:#cbbd9c;box-shadow:none}#ov .pn button.cfgb.on{background:linear-gradient(180deg,#ffe29a,#c99a40)!important;color:#24170a!important;border-color:#ffe29a!important;font-weight:700;box-shadow:0 0 10px rgba(231,183,90,.4)!important;opacity:1!important}#ov .pn button.cfgb.on *{color:#24170a!important}.cfgb small{font-size:10px}.cfgb big{font-size:14px}.cfgt{flex:0 0 auto;width:66px;position:relative;padding-left:22px}.cfgt::before{content:"";position:absolute;left:8px;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;background:#6a5a40}.cfgt.on::before{background:#3a8a2a;box-shadow:0 0 6px #7aff6a}.seth{font-size:11px;opacity:.8;line-height:1.4}.setrow{display:flex;align-items:center;gap:8px;padding:5px 0}.setl{flex:1 1 auto;min-width:0;font-size:13px}.setl small{display:block;font-size:10.5px;opacity:.7}.setrow input[type=range]{flex:1 1 120px;min-width:90px;accent-color:#e7b75a}.setrow input.off{opacity:.45}.setp{width:40px;text-align:right;font-size:12px;color:#ffd88a}';document.head.appendChild(st)}
setTimeout(()=>{
ov.addEventListener('click',e=>{if(ov.dataset.k!=='set')return;const b=e.target.closest('button');if(!b)return;
  if(b.dataset.setk){const k=b.dataset.setk,v=b.dataset.setv;if(k==='gq'){setGQ(v);try{gqLabel()}catch(_){}}else if(k==='fs'){CFGV.fs=+v;cfgSave();cfgFsApply()}try{sfx('click')}catch(_){}cfgUI();return}
  if(b.dataset.sett){const k=b.dataset.sett;if(k==='hd'){try{$('hdb').onclick()}catch(_){}}else if(k==='shk'){CFGV.shk=CFGV.shk>0?0:1;cfgSave()}else if(k==='vib'){CFGV.vib=CFGV.vib?0:1;cfgSave();if(CFGV.vib)try{navigator.vibrate(20)}catch(_){}}try{sfx('click')}catch(_){}cfgUI();return}
  if(b.dataset.setperf){try{perfUI()}catch(_){}return}
  if(b.dataset.setrst){CFGV.vm=.8;CFGV.vs=.9;CFGV.fs=1;CFGV.shk=1;CFGV.vib=1;cfgSave();cfgVol('vm',.8);cfgVol('vs',.9);cfgFsApply();setGQ('auto');try{gqLabel()}catch(_){}if(muted)setMute(false);if(!musOn)setMusic(true);cfgUI('↺ คืนค่าเริ่มต้นแล้ว');return}});
ov.addEventListener('input',e=>{if(ov.dataset.k!=='set')return;const r=e.target.closest('[data-setr]');if(!r)return;const k=r.dataset.setr,v=(+r.value)/100;cfgVol(k,v);
  /* ลากขึ้นจากศูนย์ = เปิดเสียงที่เคยปิดไว้ด้วย · ลากลงศูนย์ = ปิด */if(k==='vs'){if(v>0&&muted)setMute(false);if(v===0&&!muted)setMute(true)}else{if(v>0&&!musOn)setMusic(true);if(v===0&&musOn)setMusic(false)}
  r.classList.toggle('off',v===0);const p=ov.querySelector('[data-setp="'+k+'"]');if(p)p.textContent=Math.round(v*100)+'%';if(k==='vs'&&v>0){clearTimeout(r._t);r._t=setTimeout(()=>{try{sfx('click')}catch(_){}},120)}});
/* เมนู: ปุ่ม "กราฟิก" กลายเป็น "ตั้งค่า" · ซ่อนปุ่ม HD/วัดความลื่น (ย้ายเข้าไปในหน้าตั้งค่าแล้ว) */
try{$('gqb').onclick=()=>{if(me.cls&&run)cfgUI()};window.gqLabel=gqLabel=function(){mnSet('gqb',null,'ตั้งค่า')};gqLabel();$('hdb').style.setProperty('display','none','important');$('pfb').style.setProperty('display','none','important');
  const _hl=hdLabel;window.hdLabel=hdLabel=function(){try{_hl()}catch(_){}}}catch(e){console.warn('cfgUI menu',e)}
},0);
