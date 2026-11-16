/* ---------- v641 ลุค HD-2D (HD2): เลนส์กล้องทับภาพโลก ----------
   ทำหลังวาดโลกเสร็จ (หลัง zmPost) ก่อน HUD บนแคนวาส → แถบบอส/ป้ายดันไม่เบลอ
   1) tilt-shift: ขอบบน/ล่างของจอเบลอไล่ระดับ (ย่อภาพ 1/4 → 1/8 แล้วขยายกลับ) ตรงกลางคมชัด = ฉากเหมือนโมเดลจิ๋ว
   2) แสงฟุ้ง (bloom): ส่วนสว่างของภาพ (ไฟ โคม เวท) ฟุ้งนุ่ม ๆ
   3) โทนสีแบบภาพยนตร์: บนอุ่น ล่างเย็นเล็กน้อย + ขอบจอมืดลง
   4) ฝุ่นละอองลอยในอากาศ เลื่อนเร็วกว่าพื้นนิดหนึ่ง (ดูเหมือนอยู่ใกล้กล้อง)
   ปิดเองเมื่อเครื่องหน่วง (FQ.avg > HD2.fq) / โหมดประหยัด · ช่วงทดลอง: ปิดเป็นค่าเริ่มต้น เปิดได้ที่ ตั้งค่า → 🖥️ คุณภาพภาพ → 🎥 ลุค HD-2D (จำในเครื่อง) */
const HD2={on:0,fq:27,ts:1,bl:1,gr:1,du:1,top:.28,bot:.19,blA:.24,c:{},n:0,ms:0,err:''};
try{const v=localStorage.getItem('refugee_hd2');if(v==='1')HD2.on=1}catch(e){}
function hd2Cv(k,w,h){let c=HD2.c[k];if(!c){c=HD2.c[k]=document.createElement('canvas');c.x=c.getContext('2d')}if(c.width!==w||c.height!==h){c.width=w;c.height=h}return c}
function hd2Skip(){if(!HD2.on||LOWQ)return true;try{if(typeof FQ!=='undefined'&&FQ.avg>HD2.fq)return true}catch(e){}try{if(PH&&PH.on&&PH.raw)return true}catch(e){}return false}
function hd2Pass(){if(hd2Skip())return;const t0=performance.now();const C=g.canvas,W=C.width,H=C.height;if(W<50||H<50)return;
  g.save();g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.filter='none';g.shadowBlur=0;
  try{
    const w4=Math.max(8,W>>2),h4=Math.max(8,H>>2),w8=Math.max(4,W>>3),h8=Math.max(4,H>>3);
    const A=hd2Cv('a',w4,h4),B=hd2Cv('b',w8,h8);A.x.globalCompositeOperation='copy';A.x.imageSmoothingQuality='low';A.x.drawImage(C,0,0,W,H,0,0,w4,h4);
    B.x.globalCompositeOperation='copy';B.x.drawImage(A,0,0,w4,h4,0,0,w8,h8);
    /* 2) แสงฟุ้ง: ดึงเฉพาะส่วนสว่างจากภาพ 1/8 แล้ววางทับแบบ screen */
    if(HD2.bl){const Q=hd2Cv('q',w8,h8);Q.x.globalCompositeOperation='copy';Q.x.filter='brightness(.55) contrast(3.2) saturate(1.3)';Q.x.drawImage(B,0,0);Q.x.filter='none';
      g.globalCompositeOperation='screen';g.globalAlpha=HD2.blA;g.imageSmoothingEnabled=true;g.drawImage(Q,0,0,w8,h8,0,0,W,H);g.globalAlpha=1}
    /* 1) tilt-shift: ภาพเบลอ (1/8 ขยายกลับเป็น 1/4) ตัดด้วยแถบไล่ระดับบน/ล่าง แล้ววางทับ */
    if(HD2.ts){const M=hd2Cv('m',w4,h4),x=M.x;x.globalCompositeOperation='copy';x.imageSmoothingEnabled=true;x.drawImage(B,0,0,w8,h8,0,0,w4,h4);
      x.globalCompositeOperation='destination-in';const gr=x.createLinearGradient(0,0,0,h4),a=HD2.top,b=HD2.bot;
      gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(a*.45,'rgba(0,0,0,.85)');gr.addColorStop(a,'rgba(0,0,0,0)');gr.addColorStop(1-b,'rgba(0,0,0,0)');gr.addColorStop(1-b*.45,'rgba(0,0,0,.8)');gr.addColorStop(1,'rgba(0,0,0,1)');
      x.fillStyle=gr;x.fillRect(0,0,w4,h4);g.globalCompositeOperation='source-over';g.drawImage(M,0,0,w4,h4,0,0,W,H)}
    /* 3) โทนสี + ขอบจอ */
    if(HD2.gr){g.globalCompositeOperation='soft-light';const gc=g.createLinearGradient(0,0,0,H);gc.addColorStop(0,'rgba(255,196,120,.32)');gc.addColorStop(.55,'rgba(255,230,200,.06)');gc.addColorStop(1,'rgba(70,90,170,.28)');g.fillStyle=gc;g.fillRect(0,0,W,H);
      g.globalCompositeOperation='source-over';const r=Math.hypot(W,H)*.5,vg=g.createRadialGradient(W/2,H*.48,r*.42,W/2,H*.48,r*1.02);vg.addColorStop(0,'rgba(8,4,12,0)');vg.addColorStop(1,'rgba(8,4,12,.42)');g.fillStyle=vg;g.fillRect(0,0,W,H)}
    /* 4) ฝุ่นละออง */
    if(HD2.du)hd2Dust(W,H);
  }catch(e){HD2.err=String(e)}
  g.restore();HD2.n++;HD2.ms=HD2.ms*.95+(performance.now()-t0)*.05}
function hd2Dust(W,H){let D=HD2.dot;if(!D){D=HD2.dot=document.createElement('canvas');D.width=D.height=32;const x=D.getContext('2d'),gr=x.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,240,200,1)');gr.addColorStop(.35,'rgba(255,220,160,.45)');gr.addColorStop(1,'rgba(255,200,140,0)');x.fillStyle=gr;x.fillRect(0,0,32,32)}
  const t=performance.now()/1000,s=DPR*(ZM&&ZM.z>0?ZM.z:1),cx=(typeof cam!=='undefined'?cam.x:0)*s*1.18,cy=(typeof cam!=='undefined'?cam.y:0)*s*1.18;
  let dk=0;try{dk=dnState().dk}catch(e){}
  g.globalCompositeOperation='lighter';
  for(let i=0;i<34;i++){const sp=.35+(i%7)*.09,ph=i*2.399,
    x=((i*197.3*DPR+Math.sin(t*.23*sp+ph)*40*DPR-cx)%W+W)%W,y=((i*131.7*DPR-t*9*sp*DPR-cy)%H+H)%H,
    edge=Math.max(0,1-Math.min(y/(H*.32),(H-y)/(H*.26))),sz=(2.2+(i%4)*1.1+edge*7)*DPR,a=(.16+.12*Math.sin(t*1.3+ph))*(1-edge*.45)*(dk>.3?1.25:1);
    g.globalAlpha=Math.max(0,a);g.drawImage(D,x-sz,y-sz,sz*2,sz*2)}
  g.globalAlpha=1;g.globalCompositeOperation='source-over'}
zmPost=(f=>function(){const r=f.apply(this,arguments);try{hd2Pass()}catch(e){HD2.err=String(e)}return r})(zmPost);
/* แถวในตั้งค่า → 🖥️ คุณภาพภาพ */
function hd2Set(v){HD2.on=v?1:0;try{localStorage.setItem('refugee_hd2',v?'1':'0')}catch(e){}hd2Sync()}
function hd2Sync(){const b=document.querySelector('[data-hd2row] button');if(b){b.textContent=HD2.on?'เปิดอยู่':'ปิดอยู่';b.classList.toggle('on',!!HD2.on)}}
try{cfgUI=(f=>function(){const r=f.apply(this,arguments);try{const cap=[...ov.querySelectorAll('.card .cap')].find(c=>/คุณภาพภาพ/.test(c.textContent));if(cap&&!ov.querySelector('[data-hd2row]')){const d=document.createElement('div');
    d.innerHTML='<hr><div class="setrow" data-hd2row="1"><span class="setl">🎥 ลุค HD-2D (ทดลอง)<small>ขอบจอเบลอแบบโมเดลจิ๋ว · แสงฟุ้ง · โทนสีภาพยนตร์ · ปิดเองถ้าเครื่องหน่วง</small></span><button class="cfgb" type="button"></button></div>';
    cap.parentNode.appendChild(d.querySelector('hr'));const row=d.querySelector('.setrow');cap.parentNode.appendChild(row);row.querySelector('button').onclick=e=>{e.stopPropagation();hd2Set(!HD2.on);try{sfx('click')}catch(_){}};hd2Sync()}}catch(e){}return r})(cfgUI)}catch(e){}
