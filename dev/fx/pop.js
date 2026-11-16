/* ---------- v647 ตัวละคร/มอนเด่นขึ้น (POP) ----------
   ทำตอนพื้นวาดเสร็จ ก่อนวาดของ/ตัวละคร (ต้น hdlPass ใน plxGround) → กระทบเฉพาะพื้น ตัวละครกับมอนสดเท่าเดิม
   ② พื้นหม่น+มืดลงนิดหน่อย ไล่จากรอบตัวเรา (แทบไม่เปลี่ยน) ไปขอบจอ (หม่นสุด)
   ③ เงาใต้เท้าเข้มขึ้น ทุกตัวละคร/NPC/มอน (วงรีนุ่ม)
   ④ พื้นรอบตัวเราสว่างอุ่นขึ้นเบา ๆ เหมือนสปอตไลต์ → หาตัวเองเจอเร็ว
   ส่วนหนึ่งของลุค HD-2D (ปิดตาม/เครื่องหน่วง/ประหยัด) · แยกปิดได้ที่ ตั้งค่า → 🖥️ คุณภาพภาพ → 🔆 ตัวละครเด่นขึ้น */
const POP={on:1,sat:.42,dk:.22,lt:.3,ao:.55,n:0,err:''};
try{if(localStorage.getItem('refugee_hd2pop')==='0')POP.on=0}catch(e){}
function popGround(){if(!POP.on||hd2Skip())return;const C=g.canvas;if(C!==cv&&!POP.test)return;const W2=C.width,H2=C.height,z=(ZM&&ZM.z>0?ZM.z:1)*DPR;
  let px=W2/2,py=H2/2;try{px=(me.x-cam.x)*z;py=(me.y-cam.y)*z}catch(e){}let dk=0;try{dk=dnState().dk}catch(e){}
  const r0=Math.min(W2,H2)*.16,r1=Math.hypot(W2,H2)*.62,k=1-Math.min(.6,dk*.8);/* แมพ/เวลามืดอยู่แล้ว → หม่นลงน้อย */
  g.save();g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.filter='none';
  let gr=g.createRadialGradient(px,py,r0,px,py,r1);gr.addColorStop(0,'rgba(128,128,128,0)');gr.addColorStop(1,'rgba(128,128,128,'+(POP.sat*k).toFixed(3)+')');
  g.globalCompositeOperation='saturation';g.fillStyle=gr;g.fillRect(0,0,W2,H2);
  gr=g.createRadialGradient(px,py,r0*.8,px,py,r1);gr.addColorStop(0,'rgba(12,10,22,0)');gr.addColorStop(1,'rgba(12,10,22,'+(POP.dk*k).toFixed(3)+')');
  g.globalCompositeOperation='source-over';g.fillStyle=gr;g.fillRect(0,0,W2,H2);
  const rl=Math.min(W2,H2)*.2;gr=g.createRadialGradient(px,py+6*z,0,px,py+6*z,rl);gr.addColorStop(0,'rgba(255,238,205,'+(POP.lt*(dk>.4?1.3:1)).toFixed(3)+')');gr.addColorStop(1,'rgba(255,238,205,0)');
  g.globalCompositeOperation='soft-light';g.fillStyle=gr;g.fillRect(px-rl,py+6*z-rl,rl*2,rl*2);
  g.restore();
  /* ③ เงาใต้เท้า (พิกัดโลก) */
  g.save();g.setTransform(z,0,0,z,-cam.x*z,-cam.y*z);g.globalCompositeOperation='source-over';
  const sp=popSpr(),E=[];for(const c of HDL.Cp)E.push([c[0],c[1],Math.max(.6,Math.min(1.6,c[2]))*13]);
  try{for(const m of mons){if(m.t===3||m.wb||m.pv||m.dum||m.hp<=0)continue;const r=(MT[m.t]&&MT[m.t].r)||12;if(m.x<cam.x-60||m.x>cam.x+W+60||m.y<cam.y-60||m.y>cam.y+H+80)continue;E.push([m.x,m.y+r*.85,Math.max(9,Math.min(34,r*1.15))])}}catch(e){}
  g.globalAlpha=POP.ao;for(const [x,y,rx] of E){g.drawImage(sp,x-rx,y-rx*.36,rx*2,rx*.72);POP.n++}
  g.restore()}
function popSpr(){if(POP.sp)return POP.sp;const c=document.createElement('canvas');c.width=64;c.height=24;const x=c.getContext('2d');x.translate(32,12);x.scale(1,.375);const gr=x.createRadialGradient(0,0,0,0,0,32);gr.addColorStop(0,'rgba(0,0,0,.95)');gr.addColorStop(.55,'rgba(0,0,0,.6)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.beginPath();x.arc(0,0,32,0,7);x.fill();return POP.sp=c}
hdlPass=(f=>function(){try{popGround()}catch(e){POP.err=String(e)}return f.apply(this,arguments)})(hdlPass);
/* แถวตั้งค่า */
function popSet(v){POP.on=v?1:0;try{localStorage.setItem('refugee_hd2pop',v?'1':'0')}catch(e){}hd2Sync()}
hd2Sync=(f=>function(){f();const b=document.querySelector('[data-hd2pop] button');if(b){b.textContent=POP.on?'เปิดอยู่':'ปิดอยู่';b.classList.toggle('on',!!POP.on)}const r=document.querySelector('[data-hd2pop]');if(r)r.style.opacity=HD2.on?'':'.45'})(hd2Sync);
try{cfgUI=(f=>function(){const r=f.apply(this,arguments);try{const row=ov.querySelector('[data-hd2pv]')||ov.querySelector('[data-hd2row]');if(row&&!ov.querySelector('[data-hd2pop]')){const d=document.createElement('div');
    d.innerHTML='<div class="setrow" data-hd2pop="1"><span class="setl">🔆 ตัวละครเด่นขึ้น<small>พื้นหม่นลงนิด เงาใต้เท้าชัด พื้นรอบตัวเราสว่าง (ใช้กับลุค HD-2D)</small></span><button class="cfgb" type="button"></button></div>';
    const pr=d.firstChild;row.parentNode.insertBefore(pr,row.nextSibling);pr.querySelector('button').onclick=e=>{e.stopPropagation();popSet(!POP.on);try{sfx('click')}catch(_){}};hd2Sync()}}catch(e){}return r})(cfgUI)}catch(e){}
