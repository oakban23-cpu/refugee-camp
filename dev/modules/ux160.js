/* ---------- v589 เพื่อนเดินตรงตำแหน่งจริงขึ้น (ลดความหน่วงที่เห็นบนจอ) ----------
   เดิม: ส่งตำแหน่งทุก 0.2 วิ · เซิร์ฟเวอร์ส่งต่อทุก 0.2 วิ · จอเราไล่ตามแบบ 30%/เฟรม → เพื่อนบนจอตามหลังของจริง ~0.3 วิ (+ เน็ตจริง)
   ใหม่: ส่งทุก 0.1 วิตอนเดิน (ยืนนิ่ง 0.3 วิ) · เซิร์ฟเวอร์ส่งต่อทุก 0.1 วิ · คำนวณความเร็วเพื่อนจากข้อมูลที่ได้แล้ว "เดาล่วงหน้า" สั้น ๆ
   (ไม่เกิน 0.2 วิ · ระยะเดาไม่เกิน 60) · ไล่ตามแบบนุ่มตามเวลา (ไม่ขึ้นกับเฟรมเรต) · ห่างเกิน 250 = วาร์ป/เทเลพอร์ต → ย้ายทันที · ปิด: NETP.off=1 */
const NETP={off:0,lead:.05,cap:.15,maxd:60,tau:.07};
const PRS={k:0,x:0,y:0};
function netVel(o,prev){const now=performance.now();for(const k in o){const n=o[k],p=prev[k];n._t=now;n.vx=0;n.vy=0;if(!p||p.tx===undefined||!p._t)continue;
    const dt=(now-p._t)/1000,dx=n.tx-p.tx,dy=n.ty-p.ty;if(Math.hypot(dx,dy)>250){n.x=n.tx;n.y=n.ty;continue}
    if(dt>.03&&dt<1){const vx=dx/dt,vy=dy/dt;n.vx=(p.vx||0)*.35+vx*.65;n.vy=(p.vy||0)*.35+vy*.65;if(!dx&&!dy){n.vx=0;n.vy=0}}
    n.wk=p.wk;n.fx=p.fx;n.dt=p.dt}}
function netMove(o,dt){if(NETP.off||o._t===undefined){const dx=(o.tx-o.x)*.3,dy=(o.ty-o.y)*.3;o.x+=dx;o.y+=dy;walkTick(o,dx,dy);return}
  const age=Math.min(NETP.cap,(performance.now()-o._t)/1000)+NETP.lead;let px=o.vx*age,py=o.vy*age;const d=Math.hypot(px,py);if(d>NETP.maxd){px*=NETP.maxd/d;py*=NETP.maxd/d}
  const tx=o.tx+px,ty=o.ty+py,k=1-Math.exp(-Math.max(0,dt)/NETP.tau),dx=(tx-o.x)*k,dy=(ty-o.y)*k;o.x+=dx;o.y+=dy;walkTick(o,dx,dy)}
