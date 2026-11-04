/* ---------- v579 ค่ายผู้อพยพ: อาคารที่เคยวาดด้วยเวกเตอร์ → ภาพวาด HD ชุดเดียวกับ hd-camp (เจนด้วย ComfyUI Z-Image-Turbo) ----------
   แผ่นภาพ hd-camp2.webp (135 KB · โหลดพร้อมภาพ HD ค่ายเดิม · ใช้เฉพาะตอนเปิด HD และไม่ใช่โหมดประหยัด)
   · ร้านรูนไอริส (โครงร้าน → ภาพ · วงเวท/ผลึกลอย/ตัวไอริสคงเดิม) · คอกม้า + กองฟาง · แท่นบูชาจุติ (ฐาน+เสา → ภาพ · ลูกแสง/ประกายคงเดิม)
   · ซุ้มครัวป้าบัว + ราวตากปลา · หุ่นไล่กาลานฝึก (ยังโยกตอนโดนตี) · ป้ายบอกทาง · ซุ้มประตูค่ายเหนือ/ใต้ (ยังจางเมื่อเดินลอด)
   ปิด: C2.off=1 */
const C2={src:'hd-camp2.webp',off:0,img:null,ok:0,f:{"camp_gate":[0,0,246,260],"rune_stall":[248,0,216,240],"cook_stall":[466,0,238,240],"rebirth_altar":[706,0,240,229],"stable":[0,262,240,207],"bounty_board":[242,262,168,200],"scarecrow_target":[412,262,113,170],"fish_rack":[527,262,138,150],"signpost":[667,262,80,150],"rank_podium":[749,262,113,150],"transfer_altar":[0,471,200,148],"hay_bales":[202,471,150,108]}};
function c2Load(){if(C2.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{C2.ok=1;try{CAMP.cache=null}catch(e){}})};im.onerror=()=>{C2.ok=-1};im.src=C2.src;C2.img=im}
function c2On(){if(C2.off)return false;try{if(!campHD())return false}catch(e){return false}if(!C2.img)c2Load();return C2.ok===1}
/* วาดสไปรต์: (x,by) = กึ่งกลางล่าง · w = กว้างในโลกเกม · คืนความสูง */
function c2Spr(id,x,by,w,fl){const f=C2.f[id];if(!f)return 0;const h=w*f[3]/f[2];if(fl){g.save();g.translate(x,by);g.scale(-1,1);g.drawImage(C2.img,f[0],f[1],f[2],f[3],-w/2,-h,w,h);g.restore()}else g.drawImage(C2.img,f[0],f[1],f[2],f[3],x-w/2,by-h,w,h);return h}
function c2Tag(s,x,y,sz){g.save();g.font='bold '+(sz||9)+'px system-ui';g.textAlign='center';g.lineWidth=2.6;g.strokeStyle='rgba(30,16,6,.9)';g.strokeText(s,x,y);g.fillStyle='#ffe6a8';g.fillText(s,x,y);g.restore()}
/* ป้ายบอกทาง (ใช้ในแคชพื้นค่าย · พิกัดสัมพัทธ์กับกลางค่าย) */
function c2Signpost(x,y){c2Spr('signpost',x,y+4,26);g.save();g.font='bold 5.5px system-ui';g.textAlign='left';
  [['ป่าพิษ →',-31],['← หอคอย',-23],['ซากนคร ↓',-15]].forEach(([s,dy])=>{const tw=g.measureText(s).width+5;g.fillStyle='rgba(40,24,10,.78)';g.beginPath();g.roundRect(x+12,y+dy-5,tw,7,2);g.fill();g.fillStyle='#ffe6b0';g.fillText(s,x+14.5,y+dy)});g.restore()}
/* หุ่นไล่กาลานฝึก: ภาพ + โยกตามแรงตี */
function c2Scarecrow(x,y,m,t){const n=performance.now(),k=m.dwT?Math.max(0,1-(n-m.dwT)/450):0,rot=Math.sin((n-(m.dwT||0))/38)*k*.2*(m.dwS||.5)+Math.sin(t*1.3+x)*.015;
  gxShadow(x,y+2,17,5,.5);g.save();g.translate(x,y+2);g.rotate(rot);const s=1+k*.06;g.scale(s,s);c2Spr('scarecrow_target',0,2,50);g.restore()}
/* ซุ้มประตูค่าย (เหนือ/ใต้) */
function c2Gate(x1,y1,x2,y2,a){const D=Math.abs(x2-x1),w=D/.6,cx=(x1+x2)/2,by=Math.max(y1,y2)+4;g.save();g.globalAlpha=a;const h=c2Spr('camp_gate',cx,by,w);c2Tag('ค่ายผู้อพยพ',cx,by-h*.81,10);g.restore()}
setTimeout(()=>{
  /* คอกม้า: โครงคอก → ภาพ + กองฟาง · คนดูแลคอก/ชื่อ/บทพูดคงเดิม */
  try{const _s=drawStable;window.drawStable=drawStable=function(){if(!c2On())return _s.apply(this,arguments);
      const x=CX-261,y=CY+101.5,t=performance.now()/1000;if(x+90<cam.x||x-90>cam.x+W||y+60<cam.y||y-140>cam.y+H)return;gxShadow(x+6,y+22,54,10,.4);c2Spr('stable',x+4,y+26,116);c2Spr('hay_bales',x+76,y+28,42);
      const N=MAPS[1].npc2;drawRancher2(N.x,N.y,me.x<N.x?-1:1,t);g.font='11px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText(N.n,N.x,N.y-36);npcSay('ranch',N.x,N.y,NPCSAY.ranch,200,48)}}catch(e){console.warn('c2 stable',e)}
  try{const _d=drawScarecrow;window.drawScarecrow=drawScarecrow=function(x,y,m,t){if(!c2On())return _d.apply(this,arguments);return c2Scarecrow(x,y,m,t)}}catch(e){}
},1600);
