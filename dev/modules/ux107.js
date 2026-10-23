
/* ===== v494 · ติดตั้งบน iPhone/iPad: เตือนผูกบัญชีก่อน =====
   iOS: แอปที่เพิ่มไว้บนหน้าจอโฮมแยกที่เก็บข้อมูลจาก Safari → ตัวละครที่ «บันทึกในเบราว์เซอร์นี้» ไม่ตามไป
   ① การ์ดติดตั้งของ iPhone (การ์ดชวน · ปุ่มในตั้งค่า · การ์ดจากปุ่มเต็มจอ): ยังไม่ผูกบัญชี → กล่องเตือน + ปุ่ม «🔐 ไปผูกบัญชีก่อน»
      ปุ่ม = บันทึกแล้วกลับหน้าเลือกตัวละคร (ทางเดียวกับ «เปลี่ยนตัวละคร») · เลื่อนไปกล่องผูกบัญชีแล้วไฮไลต์ · ในดันเจี้ยน/ตอนล้ม = บอกให้ออกก่อน
   ② เปิดจากไอคอนหน้าจอโฮมบน iOS แล้วยังไม่ล็อกอิน → กล่องบัญชีหน้าเลือกตัวละครบอกให้ล็อกอินบัญชีเดิม
   Android/คอม ใช้ที่เก็บเดียวกับเบราว์เซอร์ ไม่ต้องเตือน */
function pwaNeedAcc(){try{return !!me.cls&&srvAcc()&&!ACC&&saveMode!=='wait'}catch(e){return false}}
const PWAW='<div class="pwaw"><b>⚠️ ผูกบัญชีก่อนติดตั้ง</b><span>ตอนนี้ตัวละครเก็บแค่ใน Safari · แอปบนหน้าจอโฮมของ iPhone/iPad แยกที่เก็บข้อมูล เปิดแล้วจะไม่เห็นตัวละครนี้</span><span>ผูกบัญชี (ชื่อ + PIN) ก่อน แล้วล็อกอินบัญชีเดิมในแอป ตัวละครจะตามไปครบ</span></div>';
function pwaWCSS(){if($('pwawcss'))return;const s=document.createElement('style');s.id='pwawcss';s.textContent=
  '.pwaw{margin:7px 0 2px;padding:8px 10px;border-radius:10px;border:1px solid #d08a3a;background:rgba(120,60,20,.38);display:flex;flex-direction:column;gap:3px;font-size:12.5px;line-height:1.45;text-align:left}.pwaw b{color:#ffcf8a;font-size:13.5px}'+
  '#fsios .pwab,.pwac .pwab{background:linear-gradient(180deg,#ffe29a,#c99a40)!important;color:#24170a!important;border-color:#ffe29a!important;font-weight:800}'+
  '.pwaw2{margin:5px 0;padding:6px 9px;border-radius:8px;background:rgba(60,90,160,.3);border:1px solid #6a8ad8;font-size:12.5px;color:#dfe8ff}'+
  '#accbox.pwahl{box-shadow:0 0 0 3px #ffd77a,0 0 20px rgba(255,200,100,.65)!important;animation:pwahl 1.1s ease-in-out 4}@keyframes pwahl{50%{box-shadow:0 0 0 5px #ffe9a8,0 0 30px rgba(255,210,120,.9)}}';document.head.appendChild(s)}
function pwaAccBtn(){const b=document.createElement('button');b.type='button';b.className='pwab';b.textContent='🔐 ไปผูกบัญชีก่อน';b.onclick=e=>{e.stopPropagation();pwaAccGo()};return b}
/* ไปหน้าเลือกตัวละคร (บันทึกก่อน) แล้วชี้กล่องผูกบัญชี */
function pwaAccGo(){for(const id of['pwac','fsios']){const e=$(id);if(e)e.remove()}try{PWA.card=0}catch(e){}
  let bad='';try{bad=chSwBad()}catch(e){}if(bad){try{ov.hidden=false;chSwUI('🔐 ผูกบัญชีที่หน้าเลือกตัวละคร · '+bad)}catch(e){}return}
  try{accMsg='📱 ผูกบัญชีแล้วค่อยเพิ่มเกมไปยังหน้าจอโฮม · ในแอปให้ล็อกอินชื่อบัญชีกับ PIN เดียวกัน'}catch(e){}
  Promise.resolve(chSwGo()).then(()=>{pwaWCSS();let n=0;const f=()=>{const b=$('accbox');if(b){try{b.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}b.classList.add('pwahl');setTimeout(()=>{try{b.classList.remove('pwahl')}catch(e){}},5200)}else if(++n<20)setTimeout(f,150)};setTimeout(f,120)}).catch(()=>{})}
/* ① การ์ดติดตั้งของ iPhone */
try{pwaCard=(f=>function(kind){const c=f.apply(this,arguments);try{if(c&&kind==='ios'&&pwaNeedAcc()){pwaWCSS();const bt=c.querySelector('.bt');bt.insertAdjacentHTML('beforebegin',PWAW);bt.prepend(pwaAccBtn())}}catch(e){}return c})(pwaCard)}catch(e){}
try{fsHelp=(f=>function(){const r=f.apply(this,arguments);try{const c=$('fsios');if(c&&pwaNeedAcc()&&!c.querySelector('.pwaw')){pwaWCSS();const ok=c.querySelector('button');ok.insertAdjacentHTML('beforebegin',PWAW);const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;justify-content:center;margin-top:8px';ok.style.marginTop='0';ok.parentNode.insertBefore(row,ok);row.appendChild(pwaAccBtn());row.appendChild(ok)}}catch(e){}return r})(fsHelp)}catch(e){}
try{pwaSync=(f=>function(){const r=f.apply(this,arguments);try{const row=document.querySelector('#ov [data-pwarow]');if(row&&!PWA.ev&&!PWA.ok&&pwaIOS()&&pwaNeedAcc()){const s=row.querySelector('small');if(s)s.textContent='iPhone/iPad: ผูกบัญชีก่อน แล้วแชร์ ⬆️ → เพิ่มไปยังหน้าจอโฮม'}}catch(e){}return r})(pwaSync)}catch(e){}
/* ② เปิดจากหน้าจอโฮมบน iOS ยังไม่ล็อกอิน */
try{accBox=(f=>function(){let h=f.apply(this,arguments);try{if(h&&!ACC&&pwaStand()&&pwaIOS()){pwaWCSS();h=h.replace('<b>🔐 ผูกบัญชี / ล็อกอิน (กันตัวละครหาย)</b>','<b>🔐 ผูกบัญชี / ล็อกอิน (กันตัวละครหาย)</b><p class="pwaw2">📱 เปิดจากหน้าจอโฮม: ข้อมูลแยกจาก Safari · ถ้าเคยผูกบัญชีไว้ ล็อกอินชื่อบัญชีกับ PIN เดิมที่นี่ ตัวละครจะกลับมา</p>')}}catch(e){}return h})(accBox)}catch(e){}
