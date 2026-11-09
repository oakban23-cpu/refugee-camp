/* ---------- v614 หอคอยวิญญาณ 100 ชั้นโฉมใหม่ ส่วนที่ไม่ต้องรอภาพ (TWV) ----------
   · 10 ธีม ธีมละ 10 ชั้น (เดิมวนแค่ 5 แบบและยืมสีแมพ) แต่ละธีมมีชื่อ ไอคอน และชุดสีพื้น/วงแหวนของตัวเอง · มอนยังวนตามเดิม
   · ขึ้นชั้นใหม่มีการ์ดชื่อชั้นกลางจอ: ชั้น 37 · โรงหลอมลาวา · ประเภทชั้น · คำสาป (ชั้นบอสเป็นสีแดงทอง)
   · ใต้ป้ายสถานะบนจอมีแถบความคืบหน้า 10 ช่วงสีตามธีม + ตำแหน่งชั้นปัจจุบัน + ชั้นสูงสุดที่เคยไป
   · หน้าเข้าหอคอย: หอคอยแนวตั้ง 10 ช่วง (บนสุด = ชั้น 91–100) บอกผ่าน/กำลังปีน/ยังล็อก ปุ่มเริ่มปีนอยู่ในช่วงที่ปลดเซฟแล้ว
   · ภาพวาดจาก ChatGPT (พื้นลาน/ของประดับ/ภาพหอคอย) จะเสียบเพิ่มทีหลังโดยใช้ TWV.T เดียวกัน · ปิด: TWV.off=1 */
const TWV={off:0,cardT:0,
  /* [ชื่อ, ไอคอน, สีเด่น, ชุดสีพื้น] */
  T:[['ประตูหินโบราณ','🏛️','#a898d8',{bg:'#202329',tile:'#2a2e35',safe:'#333841',ring:'#8a7ab8',d1:'#3a3f49',d2:'#7a68b0'}],
     ['ห้องสมุดวิญญาณ','📚','#6ab4f0',{bg:'#22180f',tile:'#2d2117',safe:'#382a1d',ring:'#5a9ad8',d1:'#3d2c20',d2:'#6ab0e8'}],
     ['โถงคริสตัลน้ำแข็ง','❄️','#b8ecff',{bg:'#1a2838',tile:'#22364a',safe:'#2c445e',ring:'#a8e0ff',d1:'#34506c',d2:'#c8f0ff'}],
     ['โรงหลอมลาวา','🔥','#ff8a3c',{bg:'#19110e',tile:'#231712',safe:'#2d1d17',ring:'#ff7a30',d1:'#3a2018',d2:'#ff9a40'}],
     ['ถ้ำเห็ดเรืองแสง','🍄','#5ae8c8',{bg:'#12221d',tile:'#182c26',safe:'#1f3830',ring:'#4ae0c0',d1:'#24443a',d2:'#b07ae0'}],
     ['ห้องกลไกนาฬิกา','⚙️','#f0b850',{bg:'#281e12',tile:'#322618',safe:'#3e301f',ring:'#e0a840',d1:'#4a3a22',d2:'#d08a40'}],
     ['ลานลอยฟ้า','☁️','#fff0c0',{bg:'#364055',tile:'#44506a',safe:'#52607e',ring:'#f0e0b0',d1:'#6a7894',d2:'#fff0c8'}],
     ['สุสานกระดูกมังกร','🦴','#8af09a',{bg:'#141814',tile:'#1c211c',safe:'#242a24',ring:'#7ae08a',d1:'#2e352e',d2:'#d8d0b0'}],
     ['หอดูดาว','🔭','#ffd870',{bg:'#0f1329',tile:'#151b38',safe:'#1b2346',ring:'#e8c860',d1:'#222c58',d2:'#8ab0ff'}],
     ['บัลลังก์ห้วงความว่าง','🌌','#ff8ad0',{bg:'#110b1a',tile:'#191126',safe:'#211732',ring:'#ff80c8',d1:'#2a1c40',d2:'#e0b060'}]],
  FT:{clear:['⚔️','ล้างมอน'],survive:['⏳','เอาตัวรอด'],hunt:['👑','ล่าหัวหน้า'],rest:['🔥','ชั้นพัก'],boss:['💀','ชั้นบอส']}};
const twvI=f=>Math.floor((Math.max(1,f)-1)/10)%10,twvT=f=>TWV.T[twvI(f)];
function twvCSS(){if(document.getElementById('twvcss'))return;const s=document.createElement('style');s.id='twvcss';s.textContent=
'#twcard{position:fixed;left:0;right:0;top:44%;transform:translateY(-50%);z-index:40;pointer-events:none;text-align:center;font-family:inherit;color:#fff3dc;opacity:0;transition:opacity .45s ease,transform .45s ease;padding:14px 0 16px;background:linear-gradient(90deg,transparent,rgba(8,6,14,.72) 25%,rgba(8,6,14,.72) 75%,transparent);display:flex;flex-direction:column;align-items:center}'+
'#twcard.on{opacity:1;transform:translateY(-50%)}#twcard.off{opacity:0;transform:translateY(-62%)}'+
'#twcard .k1{font-size:12px;letter-spacing:4px;opacity:.75;text-shadow:0 2px 6px #000}#twcard .k2{font-size:46px;font-weight:800;line-height:1.05;text-shadow:0 3px 0 rgba(0,0,0,.55),0 0 24px var(--c)}'+
'#twcard .k3{display:flex;align-items:center;gap:8px;margin-top:4px;font-size:17px;font-weight:700;color:var(--c);text-shadow:0 2px 6px #000}#twcard .k3:before,#twcard .k3:after{content:"";width:44px;height:2px;background:linear-gradient(90deg,transparent,var(--c))}#twcard .k3:after{transform:scaleX(-1)}'+
'#twcard .k4{margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;justify-content:center}#twcard .k4 span{padding:3px 10px;border-radius:999px;background:rgba(10,8,16,.72);border:1px solid rgba(255,255,255,.18);font-size:12.5px}#twcard .k4 .cu{border-color:rgba(255,110,90,.6);color:#ffb0a0}'+
'#twcard.boss .k2{color:#ffd27a;text-shadow:0 3px 0 rgba(0,0,0,.55),0 0 28px #ff5a3a}'+
'@media (max-height:480px){#twcard{top:52%;padding:8px 0 10px}#twcard .k2{font-size:34px}}'+
'#ov .twvw{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:10px;align-items:start}#ov .twvw .card{margin:0 0 8px!important}'+
'#ov .twvt{display:flex;flex-direction:column;gap:3px;padding:10px;border-radius:16px;background:linear-gradient(180deg,#0b0a18,#151022 40%,#1a1410);border:1px solid rgba(231,183,90,.35);position:relative}'+
'#ov .twvt:before{content:"";position:absolute;left:50%;top:-10px;transform:translateX(-50%);border:10px solid transparent;border-bottom-color:rgba(231,183,90,.5)}'+
'#ov .twvb{--c:#888;display:flex;align-items:center;gap:8px;min-height:42px;padding:4px 8px;border-radius:10px;background:linear-gradient(90deg,color-mix(in srgb,var(--c) 22%,#120e16),#120e16 70%);border-left:4px solid var(--c);text-align:left;position:relative}'+
'#ov .twvb .ic{font-size:20px;width:26px;text-align:center}#ov .twvb .nm{flex:1;min-width:0;line-height:1.25}#ov .twvb .nm b{font-size:13px;display:block;color:#fff0d8}#ov .twvb .nm small{font-size:11px;opacity:.75}'+
'#ov .twvb.lk{filter:grayscale(.85);opacity:.55}#ov .twvb.done .nm b:after{content:" ✅";font-size:11px}#ov .twvb.cur{box-shadow:0 0 0 2px var(--c),0 0 14px color-mix(in srgb,var(--c) 50%,transparent)}'+
'#ov .twvb .pg{position:absolute;left:4px;bottom:2px;height:3px;border-radius:2px;background:var(--c);opacity:.8}'+
'#ov .twvb button{min-height:36px;padding:0 10px;border-radius:9px;font-size:12px;white-space:nowrap}#ov .twvb .me{font-size:11px;font-weight:800;color:#24170a;background:var(--c);padding:2px 7px;border-radius:999px;white-space:nowrap}'+
'#ov .twvg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-bottom:8px}#ov .twvg div{padding:8px 6px;border-radius:12px;background:rgba(0,0,0,.28);border:1px solid rgba(231,183,90,.25);text-align:center;font-size:11.5px;line-height:1.3}#ov .twvg b{display:block;font-size:19px;color:#ffd27a}'+
'#ov details.twvh{margin:0 0 8px;border-radius:12px;border:1px dashed rgba(255,216,140,.3)}#ov details.twvh>summary{cursor:pointer;padding:9px 12px;font-size:13px;list-style:none}#ov details.twvh>div{padding:0 12px 10px;font-size:12.5px;line-height:1.6;opacity:.9}'+
'@media (max-aspect-ratio:1/1){#ov .twvw{grid-template-columns:minmax(0,1fr)}}';
document.head.appendChild(s)}
/* การ์ดชื่อชั้น */
function twvCard(f){if(TWV.off||!me.cls||!isTw())return;twvCSS();const T=twvT(f),t=dg.tw||{},ft=TWV.FT[t.ft]||['🗼',''],af=(t.af||[]);let el=$('twcard');if(!el){el=document.createElement('div');el.id='twcard';document.body.appendChild(el)}
  el.className=t.ft==='boss'?'boss':'';el.style.setProperty('--c',T[2]);
  el.innerHTML='<div class="k1">หอคอยวิญญาณ</div><div class="k2">ชั้น '+f+'</div><div class="k3">'+T[1]+' '+T[0]+'</div><div class="k4"><span>'+ft[0]+' '+ft[1]+'</span>'+af.map(i=>'<span class="cu">'+TWA[i][0]+' '+TWA[i][1]+'</span>').join('')+'</div>';
  clearTimeout(TWV.cardT);clearTimeout(TWV.cardT2);void el.offsetWidth;el.classList.add('on');TWV.cardT=setTimeout(()=>{el.classList.remove('on');el.classList.add('off')},2600);TWV.cardT2=setTimeout(()=>{el.className=''},3200)}
/* แถบความคืบหน้าใต้ป้ายสถานะ */
function twvBar(cx,y){const t=dg.tw||{},f=t.f||twStartF||1,base=Math.floor((f-1)/100)*100,w=Math.min(240,W-170),x0=cx-w/2,h=6,sw=w/10,best=me.twBest||0;g.save();
  g.fillStyle='rgba(10,8,18,.75)';g.beginPath();g.roundRect(x0-6,y-4,w+12,h+8,7);g.fill();
  for(let i=0;i<10;i++){const T=TWV.T[(i+Math.floor(base/10))%10],fx=x0+i*sw+1,s0=base+i*10+1,fill=Math.max(0,Math.min(1,(f-s0+1)/10));g.globalAlpha=.32;g.fillStyle=T[2];g.fillRect(fx,y,sw-2,h);if(fill>0){g.globalAlpha=1;g.fillRect(fx,y,(sw-2)*fill,h)}}
  g.globalAlpha=1;if(best>base&&best<=base+100){const bx=x0+(best-base)/100*w;g.fillStyle='#fff';g.fillRect(bx-.75,y-3,1.5,h+6)}
  const px=x0+(f-base-.5)/100*w;g.fillStyle='#ffe2a6';g.beginPath();g.moveTo(px,y+h+1);g.lineTo(px-4,y+h+6);g.lineTo(px+4,y+h+6);g.closePath();g.fill();
  g.font='bold 9px system-ui';g.textAlign='left';g.fillStyle='rgba(255,240,210,.85)';g.fillText((base+1)+'',x0-4-g.measureText((base+1)+'').width-4,y+h);g.textAlign='right';g.fillText((base+100)+'',x0+w+4+g.measureText((base+100)+'').width+4,y+h);g.restore()}
/* หน้าเข้าหอคอย */
function twvEnter(msg){const P=ov.querySelector('.pn[data-pn="tw"]');if(!P)return;twvCSS();const cp=me.twCp||1,best=me.twBest||0,top=Math.max(100,Math.ceil((best+1)/100)*100),base=top-100;
  let tw='<div class="twvt">';for(let i=9;i>=0;i--){const s=base+i*10+1,e=s+9,T=TWV.T[(i+base/10)%10],done=best>=e,lk=best<s-1&&cp<s,cur=!done&&!lk,can=s<=cp&&(s-1)%10===0,pg=Math.max(0,Math.min(1,(best-s+1)/10));
    tw+='<div class="twvb'+(done?' done':'')+(lk?' lk':'')+(cur?' cur':'')+'" style="--c:'+T[2]+'"><span class="ic">'+(lk?'🔒':T[1])+'</span><div class="nm"><b>'+T[0]+'</b><small>ชั้น '+s+'–'+e+' · บอสชั้น '+e+(cur&&best>=s?' · ถึงแล้ว '+best:'')+'</small></div>'+(cur&&best>=s-1?'<span class="me">📍 คุณ</span>':'')+(can?'<button class="pri" data-twc="'+s+'">▶ ชั้น '+s+'</button>':'')+(pg>0&&pg<1?'<i class="pg" style="width:calc('+Math.round(pg*100)+'% - 8px)"></i>':'')+'</div>'}
  tw+='</div>';
  let r='<div class="twvg"><div>🏔️ สูงสุด<b>'+best+'</b></div><div>🚩 จุดเซฟ<b>'+cp+'</b></div><div>🪙 เหรียญ<b>'+(me.twc||0)+'</b></div></div>';
  r+='<div class="card"><div class="cap">เริ่มปีน</div><div style="display:flex;flex-direction:column;gap:6px"><button class="pri" data-twc="'+cp+'" style="min-height:48px;font-size:15px">▶ เริ่มที่จุดเซฟ · ชั้น '+cp+' · '+twvT(cp)[0]+'</button>'+(cp>1?'<button data-twc="1" style="min-height:40px">เริ่มใหม่ตั้งแต่ชั้น 1</button>':'')+'</div><small style="display:block;margin-top:6px;opacity:.8">หรือแตะ ▶ ในหอคอยเพื่อเลือกช่วง · ปลดจุดเซฟใหม่ทุก 10 ชั้น · รหัสห้องจะประกาศในแชทให้เพื่อน</small></div>';
  r+='<div class="card"><div class="cap">เข้าร่วมห้องเพื่อน</div><div class="nrow" style="margin:0"><input id="twcode" maxlength="5" inputmode="numeric" placeholder="รหัส 5 หลัก เช่น 50345" autocomplete="off"><button id="twjoin" class="pri" style="padding:8px 14px">เข้าร่วม</button></div></div>';
  r+='<details class="twvh"><summary>📖 กติกาหอคอย ▾</summary><div>'+Object.values(TWV.FT).map(x=>x[0]+' '+x[1]).join(' · ')+'<br>เอาตัวรอด 45 วิ · ทุก 5 ชั้นเป็นชั้นพัก (ฟื้นเต็ม + เหรียญ) · ทุก 10 ชั้นเป็นชั้นบอส<br>ตั้งแต่ชั้น 21 มีคำสาปสุ่ม ยิ่งสูงยิ่งซ้อน: '+TWA.map(a=>a[0]+' '+a[1]).join(' · ')+'<br>ผ่านชั้นได้เหรียญหอคอย ไปแลกของที่ผู้เฝ้าหอคอย · ครบ 100 ชั้นได้ของ Relic แล้วปีนต่อได้ไม่จำกัด</div></details>';
  r+='<div class="bt"><button data-twvshop="1">🪙 ผู้เฝ้าหอคอย · แลกเหรียญ</button></div>';
  const ph=P.querySelector(':scope>.ph'),note=P.querySelector(':scope>.note');[...P.children].forEach(c=>{if(c!==ph&&c!==note)c.remove()});P.insertAdjacentHTML('beforeend','<div class="twvw">'+tw+'<div>'+r+'</div></div>')}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-twvshop]');if(!b||!me.cls)return;e.stopPropagation();try{sfx('click')}catch(x){}twShopUI()},true)}
setTimeout(()=>{try{
  const ap=twApplyTheme;window.twApplyTheme=twApplyTheme=function(f){const r=ap.apply(this,arguments);try{if(!TWV.off&&isTw()){const M=MAPS[curMap],T=twvT(f);Object.assign(M,T[3]);M.n='หอคอยวิญญาณ · ชั้น '+f+' · '+T[0]}}catch(e){}return r};
  const bg=twBegin;window.twBegin=twBegin=function(f){const r=bg.apply(this,arguments);try{if(!TWV.off){const d=TWCL?Math.max(0,1900-(performance.now()-TWCL.t0))+150:250;setTimeout(()=>{try{if(isTw()&&dg.tw&&dg.tw.f===f)twvCard(f)}catch(e){}},d)}}catch(e){}return r};
  const eu=twEnterUI;window.twEnterUI=twEnterUI=function(){const r=eu.apply(this,arguments);try{if(!TWV.off)twvEnter()}catch(e){console.warn('twv',e)}return r};
}catch(e){console.warn('twv',e)}},2400);
