/* ---------- v598 บทพูดของตัวเรา ('me') ใช้หน้าตาตัวละครของผู้เล่นเอง ----------
   วงกลมรูปผู้พูด = หน้าเดียวกับรูปมุมซ้ายบน (ตามอาชีพ/ชุด/ทรงผม/อาวุธที่ใส่อยู่) แทนไอคอน ✋
   ภาพครึ่งตัวข้างกล่องบทพูด (แบบเดียวกับ NPC) = วาดตัวละครเราเต็มตัว · สร้างใหม่เฉพาะเมื่อเปลี่ยนชุด · ปิด: MEP.off=1 */
const MEP={off:0,k:'',face:'',bust:''};
function mepKey(){const sv={eq:me.eq,cls2:me.cls2,br:me.br},L=csLook(sv);return [me.cls+csC2(me.cls,sv)+L.w+'.'+L.a+'.'+L.h+'.'+L.b,sv,L]}
function mepMake(){if(!me.cls)return false;const[k,sv,L]=mepKey();if(k===MEP.k&&MEP.face)return true;MEP.k=k;
  const CW=260,CH=360,cv=document.createElement('canvas');cv.width=CW;cv.height=CH;const g0=g;
  try{g=cv.getContext('2d');g.setTransform(4.4,0,0,4.4,CW/2,CH*.8);drawChar(0,0,me.cls,1,0,L.h,1.2,L.b,L.w,L.a,csC2(me.cls,sv))}catch(e){}finally{g=g0}
  /* ภาพครึ่งตัว: ครอปพื้นที่ว่างออก */
  try{const x=cv.getContext('2d'),d=x.getImageData(0,0,CW,CH).data;let x0=CW,y0=CH,x1=0,y1=0;for(let y=0;y<CH;y+=2)for(let i=0;i<CW;i+=2)if(d[(y*CW+i)*4+3]>20){if(i<x0)x0=i;if(i>x1)x1=i;if(y<y0)y0=y;if(y>y1)y1=y}
    if(x1>x0){const w=x1-x0+12,h=y1-y0+8,o=document.createElement('canvas');o.width=w;o.height=h;o.getContext('2d').drawImage(cv,x0-6,y0-4,w,h,0,0,w,h);MEP.bust=o.toDataURL()}}catch(e){MEP.bust=''}
  /* หน้า: ใช้รูปเดียวกับมุมซ้ายบน (วาดใหม่ถ้ายังไม่มี) */
  try{const im=document.querySelector('#hpor img');if(!im||!im.src||im.src.length<100){UIS.pk='';uisPortrait()}const im2=document.querySelector('#hpor img');MEP.face=im2&&im2.src&&im2.src.length>100?im2.src:''}catch(e){MEP.face=''}
  if(!MEP.face){const sz=92,o=document.createElement('canvas');o.width=o.height=128;const ox=o.getContext('2d'),hy=CH*.8-4.4*19.7;ox.drawImage(cv,CW/2-sz*.85,hy-sz*.8,sz*1.7,sz*1.7,0,0,128,128);MEP.face=o.toDataURL()}
  return true}
function mepShow(){const d=$('sdlg');if(!d)return;const p=d.querySelector('.sdp');if(!mepMake())return;
  p.classList.add('npcp');p.textContent='';const i=document.createElement('img');i.alt='';i.src=MEP.face;p.appendChild(i);
  try{const c=CL[me.cls].c;p.style.borderColor=c;p.style.boxShadow='0 0 12px '+c+'66'}catch(e){}
  let b=document.getElementById('sdbust');if(!b){b=document.createElement('img');b.id='sdbust';b.alt='';d.appendChild(b)}
  if(MEP.bust){if(b.dataset.k!=='me:'+MEP.k){b.classList.remove('on');b.dataset.k='me:'+MEP.k;b.src=MEP.bust;void b.offsetWidth}b.classList.add('on');b.classList.add('mep')}}
{const st=document.createElement('style');st.textContent='#sdbust.mep{height:min(24vh,220px);image-rendering:auto}@media (orientation:portrait){#sdbust.mep{height:min(19vh,180px)}}';document.head.appendChild(st)}
setTimeout(()=>{try{const _l=stLine;window.stLine=stLine=function(){const r=_l.apply(this,arguments);try{const b=document.getElementById('sdbust');if(b)b.classList.remove('mep');
      if(!MEP.off&&SD.on){const L=SD.q[SD.i];if(L&&L[0]==='me')mepShow()}}catch(e){console.warn('mep',e)}return r}}catch(e){console.warn('mep',e)}},2100);
