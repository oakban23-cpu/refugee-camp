
/* v563 ผู้เล่นใหม่ 20 นาทีแรก */
/* ① ออโต้เควสค้าง «รอรับเควสใหม่» ตั้งแต่เริ่ม: เนื้อเรื่องรอบทสอน 2 ขั้นแรก (เดิน + ล่ามอนตัวแรก) แต่ออโต้เควสรอที่ปลอดภัยเฉย ๆ
      → ระหว่างบทสอนขั้น 1–2 ในค่าย ออโต้เควสพาออกไปล่ามอนนอกค่ายแทน (เดิน + ฆ่าตัวแรก = บทสอนผ่าน แล้วเนื้อเรื่องเริ่มเอง) */
{const _t=aqTarget;aqTarget=function(){const T=_t.apply(this,arguments);try{if(T&&T.act==='calm'&&typeof tutI!=='undefined'&&tutI>=0&&tutI<2&&curMap===1&&!isDg())return{mp:1,act:'hunt',lb:'บทสอน: ออกไปล่ามอนตัวแรกนอกค่าย'}}catch(e){}return T}}
/* ② หน้าสร้างตัวละครบนจอแนวตั้ง: ช่องชื่ออยู่ใต้แถบปุ่ม «สร้างตัวละคร» ที่ลอยติดล่าง → กดสร้างโดยไม่ใส่ชื่อ ข้อความเตือนถูกบังมองไม่เห็น
      → กดสร้างแล้วไม่มีชื่อ / แตะช่องชื่อ = เลื่อนช่องชื่อขึ้นมากลางจอ */
(()=>{try{const st=document.createElement('style');st.textContent='.cs-namebox{scroll-margin-bottom:110px;scroll-margin-top:20px}';document.head.appendChild(st);
  const show=()=>{const nb=document.querySelector('.cs-namebox');if(nb)try{nb.scrollIntoView({block:'center'})}catch(e){}};
  ov.addEventListener('click',e=>{const t=e.target&&e.target.closest&&e.target.closest('[data-c]');if(!t||!t.dataset.new)return;setTimeout(()=>{try{if(!cleanName(csName))show()}catch(e){}},30)});
  ov.addEventListener('focusin',e=>{if(e.target&&e.target.id==='csni')setTimeout(show,250)})}catch(e){}})();
/* ③ ฉากคัตซีน: เดิมต้องแตะ «กล่องบทพูด» เท่านั้นถึงไปต่อ · แตะกลางฉาก (ที่คนส่วนใหญ่แตะ) ไม่เกิดอะไร → ระหว่างคัตซีนแตะตรงไหนก็ไปต่อ (ยกเว้นปุ่ม/ตัวเลือก) */
(()=>{try{let dn=null;document.addEventListener('pointerdown',e=>{dn=[e.clientX,e.clientY,performance.now()]},true);
  document.addEventListener('pointerup',e=>{try{if(!(typeof CZ!=='undefined'&&CZ&&CZ.on&&SD&&SD.on)||SD.choice)return;const t=e.target;if(t&&t.closest&&(t.closest('button,a,input,#sdlg')))return;if(!dn||Math.hypot(e.clientX-dn[0],e.clientY-dn[1])>14||performance.now()-dn[2]>600)return;stNext()}catch(_){}},true)}catch(e){}})();
/* ④ หน้าเข้าหอคอยวิญญาณ: ปุ่มเริ่มปีน («ชั้น 1 · ป่ามืด») เป็นปุ่มแท็บโปร่ง ดูเหมือนป้ายชื่อ ปุ่มเด่นเดียวคือ «เข้าร่วม» (ใส่รหัสห้องเพื่อน)
      → ผู้เล่นใหม่ที่เควสสั่งให้ปีนหอคอยไม่รู้จะกดอะไร → ปุ่มเริ่มปีนเป็นปุ่มหลักสีทอง ขึ้นต้น «▶ เริ่มปีน» */
{const _u=twEnterUI;twEnterUI=function(){const r=_u.apply(this,arguments);try{const L=[...ov.querySelectorAll('button[data-twc]')];L.forEach((b,i)=>{b.classList.remove('tab','sm');b.classList.add('pri');b.style.width='100%';b.style.minHeight='44px';b.style.marginTop=i?'6px':'0';if(!/▶/.test(b.textContent))b.textContent='▶ เริ่มปีน · '+b.textContent.trim()})}catch(e){}return r}}
/* ⑤ แตะกล่องเควสตอนอยู่ในดันเจี้ยน/หอคอย: เดิมขึ้นแค่ «ออโต้เควสใช้ในดันเจี้ยนไม่ได้» → ผู้เล่นใหม่ที่ทำตามกล่องเควสยืนนิ่งในห้องรอ
      → ห้องรอ (ปุ่ม «▶ เริ่ม…» ขึ้นอยู่) = กดเริ่มให้ · หอคอยเคลียร์ชั้นแล้ว = ขึ้นชั้นต่อ · กำลังสู้ = เปิดล่าอัตโนมัติ (ตีมอนใกล้ตัวเอง) */
{const _a=aqStart;aqStart=function(src,id){try{if(isDg()&&me.cls&&run&&me.down<=0){const b=$('dgb'),vis=b&&!b.hidden;
    if(vis&&(dg.ph==='lobby'||(isTw()&&dg.ph==='clear'))){b.click();return}
    if((dg.ph==='run'||dg.ph==='boss')){if(!HB.on){aqHB(true);banner={s:'🤖 เปิดล่าอัตโนมัติในดันเจี้ยนแล้ว · แตะปุ่ม 🤖 ล่า เพื่อปิด',t:3}}else banner={s:'🤖 ล่าอัตโนมัติเปิดอยู่ · ออโต้เควสเดินทางให้หลังออกจากดันเจี้ยน',t:3};return}}}catch(e){}return _a.apply(this,arguments)}}
