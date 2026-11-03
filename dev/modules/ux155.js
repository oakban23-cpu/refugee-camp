/* ---------- v582 ซุ้มประตูค่ายใหม่ (เหนือ/ใต้) — ภาพหน้าตรงสมมาตรจาก ChatGPT · hd-gate.webp (640×408) ----------
   เสาสองต้นตรงกับปลายรั้ว (ระยะเสา = 68.1% ของความกว้างภาพ) · ป้าย «ค่ายผู้อพยพ» เขียนในเกม · โคมไฟเรืองกะพริบ · ยังจางเมื่อเดินลอด
   ใช้เมื่อเปิด HD และไม่ใช่โหมดประหยัด (เหมือนอาคารค่ายอื่น) · ปิด: GATE.off=1 (กลับเป็นซุ้มเวกเตอร์เดิม) */
const GATE={src:'hd-gate.webp',off:0,img:null,ok:0,W:640,H:408,span:.681};
function gateLoad(){if(GATE.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{GATE.ok=1})};im.onerror=()=>{GATE.ok=-1};im.src=GATE.src;GATE.img=im}
function gateOn(){if(GATE.off)return false;try{if(!campHD())return false}catch(e){return false}if(!GATE.img)gateLoad();return GATE.ok===1}
C2.gate=1;
c2Gate=function(x1,y1,x2,y2,a){if(!gateOn())return false;const D=Math.abs(x2-x1),w=D/GATE.span,h=w*GATE.H/GATE.W,cx=(x1+x2)/2,by=Math.max(y1,y2)+3,top=by-h,t=performance.now()/1000;
  g.save();g.globalAlpha=a;gxShadow(cx,by,w*.42,5,.35);g.drawImage(GATE.img,cx-w/2,top,w,h);
  const fs=Math.max(7,w*.068);g.font='bold '+fs.toFixed(1)+'px system-ui';g.textAlign='center';g.textBaseline='middle';const ty=top+h*.248;
  g.fillStyle='rgba(255,226,170,.35)';g.fillText('ค่ายผู้อพยพ',cx,ty+.8);g.fillStyle='#3a2210';g.fillText('ค่ายผู้อพยพ',cx,ty);g.textBaseline='alphabetic';
  if(!LOWQ){g.globalCompositeOperation='lighter';for(const fx of[.242,.761]){const fl=.8+.2*Math.sin(t*9+fx*7);glowAt(cx-w/2+w*fx,top+h*.41,w*.14,'255,190,100',.4*fl*a)}}
  g.restore();return true};
