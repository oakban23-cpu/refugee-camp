/* ---------- v639 นอนบนเตียงภาพวาดให้ถูกทิศ ----------
   เตียงภาพวาด (v638) หันหัวเตียงไปด้านหลัง → ตอนนอนพัก ตัวละครไม่หมุนนอนขวางแล้ว
   หัวหนุนหมอน (ตำแหน่งหมอนวัดจากภาพแต่ละเตียง) แล้ววาดส่วนผ้าห่มของภาพเตียงทับตัว = ห่มผ้าจริง
   ผ้าห่มขยับขึ้นลงตามจังหวะหายใจ · ตัว z ลอยจากหมอน · เตียงเวกเตอร์เดิม (TNA.off) ยังนอนแบบเดิม */
TNA.bedp={bed1:[.13,.24],bed2:[.25,.33],bed3:[.53,.62]};
function tnaBedPose(b){if(!b||!TNA.bedp[b]||!TNA.pos[b]||!tnaOn())return null;const p=TNA.pos[b],w=TNA.sz[b][0],h=w*p[3]/p[2],top=TBED.y+TNA.sz[b][1]-h,f=TNA.bedp[b];
  return{hx:TBED.x,hy:top+f[0]*h,bl:top+f[1]*h,top,h,w,f}}
function tnaBlanket(b,P,k,br){if(!P||k<=0)return;const p=TNA.pos[b],sy=Math.round(P.f[1]*p[3]),dh=P.h*(1-P.f[1]);g.save();g.globalAlpha=Math.min(1,k);
  const lift=br*.5;g.drawImage(TNA.img,p[0],p[1]+sy,p[2],p[3]-sy,P.hx-P.w/2,P.bl-lift,P.w,dh+lift);
  /* เงานุ่ม ๆ ใต้คางตรงขอบผ้าห่ม */const gr=g.createLinearGradient(0,P.bl-lift-3,0,P.bl-lift+4);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(30,16,8,.18)');g.fillStyle=gr;g.fillRect(P.hx-P.w*.3,P.bl-lift-3,P.w*.6,7);g.restore()}
/* หลับตาพริ้ม ^‿^ ตอนนอน (ห่อ chEyes: ตาของทุกอาชีพที่ไม่ใช่หน้ากาก) */
let TNASLP=0;
function tnaSleepEyes(hy,O){g.strokeStyle=O||'#140e0c';g.lineWidth=.9;
  for(const ex of[2.5,6.5]){g.beginPath();g.moveTo(ex-1.4,hy-.1);g.quadraticCurveTo(ex,hy+1.4,ex+1.4,hy-.1);g.stroke()}
  g.fillStyle='rgba(240,120,110,.42)';g.fillRect(-.2,hy+2.3,2.6,1.3);g.fillRect(6.6,hy+2.3,2.2,1.3);return true}
chEyes=(f=>function(cls,c2,b2,hy,t,x,O){if(TNASLP)return tnaSleepEyes(hy,O);return f.apply(this,arguments)})(chEyes);
pcEyesSafe=(f=>function(cls,c2,b2,hy,t,x,O){if(TNASLP)return tnaSleepEyes(hy,O);return f.apply(this,arguments)})(pcEyesSafe);
chEyesA=(f=>function(c2,hy,t,O){if(TNASLP)return tnaSleepEyes(hy,O);return f.apply(this,arguments)})(chEyesA);
/* ไม่ถืออาวุธตอนนอน (ติดตั้งหลังตัวห่อ drawWeapon อื่น ๆ) */
setTimeout(()=>{try{drawWeapon=(f=>function(){if(TNASLP)return;return f.apply(this,arguments)})(drawWeapon)}catch(e){}},3000);
