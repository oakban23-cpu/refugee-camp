/* ===== v527 แมพมืดอ่านง่าย — กลางคืน (และแมพมืดถาวร 19–22) ยกแสงคืนนุ่ม ๆ รอบตัวเรา ผู้เล่นอื่น มอน บอส ประตูวาร์ป
   เดิม: ความมืดทาทับทั้งจอเท่ากัน → มอน/คนอื่นกลืนกับพื้นมืด (แมพ 22 · 35 · 26 · 3 · 11 · 7 ตอนกลางคืนเห็นแต่เงาดำ)
   ใหม่: หลังทาความมืดแบบเดิม วาดดวงแสง color-dodge (หารคืนความมืด = สีและคอนทราสต์ตัวละครกลับมา ไม่ซีดขาวแบบแสงบวก)
   ความแรงคำนวณจากความมืดจริงของแมพ/เวลา · แมพย้อมแสงจันทร์ (multiply: 9 · 35 · 36 · 38) ใช้สีชดเชยรายช่องสี
   ไม่ส่องคนล่องหน/มอนที่ซ่อน · สูงสุด 12 คน 28 มอนในจอ (โหมดประหยัด 6/14) · error → ความมืดแบบเดิม (NLH.on=0 ปิด) ===== */
const NLH={on:1,err:'',n:0,h:0,sp:{},ns:0};
function nlSprite(col){let c=NLH.sp[col];if(c)return c;if(++NLH.ns>40){NLH.sp={};NLH.ns=1}
  c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba('+col+',1)');gr.addColorStop(.4,'rgba('+col+',.82)');gr.addColorStop(.75,'rgba('+col+',.28)');gr.addColorStop(1,'rgba('+col+',0)');x.fillStyle=gr;x.fillRect(0,0,64,64);return NLH.sp[col]=c}
/* สีที่ใช้ dodge: มืดแบบทาทับ (alpha a) → เทา a·0.82 · แบบ multiply สี c → (1−c)·0.8 รายช่อง (ปัดเป็นขั้นให้แคชได้)
   ดวงแสงที่ซ้อนกันใกล้ ๆ (มอนจับกลุ่ม) ข้าม → ไม่ทบจนขาวโพลน · ตัวเราแสงอ่อนกว่า (มีแสงตะเกียงเดิมอยู่แล้ว) */
function nlCol(mode,fill){if(mode==='m'){const m=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(fill);if(!m)return '';return [1,2,3].map(i=>Math.round((255-(+m[i]))*.8/4)*4).join(',')}
  const m=/,\s*([\d.]+)\)\s*$/.exec(fill);if(!m)return '';const a=+m[1];if(!(a>.02))return '';const v=Math.round(Math.min(.55,a*.82)*255/4)*4;return v+','+v+','+v}
function nlLift(mode,fill){if(!NLH.on)return false;let sv=false;
  try{const col=nlCol(mode,fill);if(!col)return false;const sp=nlSprite(col),z=ZM.z||1,vx=cam.x,vy=cam.y,vw=W/z,vh=H/z;g.save();sv=true;g.globalCompositeOperation='color-dodge';let n=0;
    const P=[],L=(wx,wy,r,al)=>{r=Math.min(150,r);if(wx<vx-r||wx>vx+vw+r||wy<vy-r||wy>vy+vh+r)return false;for(const q of P){if(Math.abs(q[0]-wx)<q[2]&&Math.abs(q[1]-wy)<q[2])return false}P.push([wx,wy,r*.55]);g.globalAlpha=al;g.drawImage(sp,wx-r,wy-r,r*2,r*2);n++;return true};
    if(me.cls&&me.hp>0)L(me.x,me.y-14,64,.55);
    let p=0;for(const id in others){const o=others[id];if(!o||!(o.hp>0)||o.sl>0||o.stealth>0)continue;if(L(o.x,o.y-14,54,.7)&&++p>=(LOWQ?6:12))break}
    try{const M0=MAPS[curMap];if(M0&&M0.gates)for(const G0 of M0.gates){if(!gHid(G0))L(G0.x,G0.y-12,72,.6)}}catch(e){}
    let k=0;for(const m of mons){if(!m||!(m.hp>0)||m.hidden||m.dum)continue;let r=18;try{r=mR(m)||18}catch(e){}
      if(L(m.x,m.y-r*.7,Math.max(40,r*2.3),r>40?.78:.72)&&++k>=(LOWQ?14:28))break}
    NLH.n++;NLH.h=n;return true}
  catch(e){NLH.err=String(e&&e.stack||e).slice(0,300);return false}
  finally{if(sv)g.restore()}}
