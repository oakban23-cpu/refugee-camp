/* ---------- v580 ธรรมชาติรอบนอกค่าย (แมพ 1): ต้นไม้ที่เคยวาดด้วยเวกเตอร์ → ภาพวาด HD (เจนด้วย ComfyUI Z-Image-Turbo) ----------
   แผ่นภาพ hd-nat.webp · ต้นไม้ 5 แบบ (โอ๊ก 2 · สน · เบิร์ช · ซากุระ) ~70% + ของประดับ 7 แบบ (หินมอส · หินใหญ่ · พุ่มเบอร์รี่ · ขอนไม้ล้ม · เสาซากปรักหักพัง · เห็ดเรืองแสง · ตอไม้) ~30%
   · ตำแหน่ง/ชนสิ่งกีดขวางเหมือนเดิมทุกจุด (เปลี่ยนแค่ภาพ) · ต้นไม้โยกตามลม · ยังจางเมื่อเดินลอด
   · เตรียมภาพย่อไว้ตามขนาด (ไม่ย่อภาพใหญ่ทุกเฟรม) · ใช้เฉพาะตอนเปิด HD และไม่ใช่โหมดประหยัด · ปิด: NAT.off=1 */
const NAT={src:'hd-nat.webp',off:0,img:null,ok:0,c:{},
  f:{"tree_oak_a":[0,0,314,300],"tree_pine":[316,0,187,300],"tree_oak_b":[505,0,286,290],"tree_birch":[793,0,225,290],"tree_blossom":[0,302,231,260],"ruin_pillar":[233,302,181,200],"glow_mush":[416,302,139,180],"rock_moss":[557,302,195,170],"rock_big":[754,302,190,170],"bush_berry":[0,564,171,150],"stump_mush":[173,564,223,150],"fallen_log":[398,564,167,130]},
  /* [ชื่อ, น้ำหนักสุ่ม, กว้าง(×r), ฐานล่าง(×r), โยก] */
  v:[['tree_oak_a',20,3.9,.72,1],['tree_oak_b',18,3.7,.72,1],['tree_pine',14,2.7,.74,1],['tree_birch',12,3.0,.72,1],['tree_blossom',6,3.3,.8,1],
     ['rock_moss',6,2.7,.85,0],['rock_big',6,2.5,.85,0],['bush_berry',7,2.3,.8,0],['fallen_log',4,2.8,.75,0],['ruin_pillar',3,2.2,.85,0],['glow_mush',2,2.1,.85,0],['stump_mush',2,2.6,.85,0]]};
NAT.tot=NAT.v.reduce((a,q)=>a+q[1],0);
function natLoad(){if(NAT.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{NAT.ok=1})};im.onerror=()=>{NAT.ok=-1};im.src=NAT.src;NAT.img=im}
function natOn(){if(NAT.off||curMap!==1)return false;try{if(!HDI.on||lqHD())return false}catch(e){return false}if(!NAT.img)natLoad();return NAT.ok===1}
function natPick(t){if(t._nv!==undefined)return NAT.v[t._nv];let h=Math.abs(((t.x*73856093)^(t.y*19349663))|0)%NAT.tot,i=0;for(;i<NAT.v.length-1;i++){h-=NAT.v[i][1];if(h<0)break}
  t._nv=i;const q=NAT.v[i];t.hw=Math.max(0,q[2]*t.r/2-36);return q}
/* ภาพย่อตามขนาด (ความละเอียด 2 เท่า) */
function natSpr(k,w){const key=k+':'+Math.round(w);let s=NAT.c[key];if(s)return s;const f=NAT.f[k],h=w*f[3]/f[2],S=2,c=document.createElement('canvas');
  c.width=Math.ceil(w*S);c.height=Math.ceil(h*S);const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(NAT.img,f[0],f[1],f[2],f[3],0,0,c.width,c.height);return NAT.c[key]={c,w,h}}
function natDraw(t,r,sw){const q=natPick(t),s=natSpr(q[0],q[2]*Math.round(r)),fl=(t.x|0)%2===0;g.save();g.translate(t.x,t.y+r*q[3]);
  if(q[4])g.transform(1,0,sw*.03,1,0,0);if(fl)g.scale(-1,1);g.drawImage(s.c,-s.w/2,-s.h,s.w,s.h);
  if(q[0]==='glow_mush'){const p=.55+.25*Math.sin(performance.now()/700+t.x);g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(0,-s.h*.55,1,0,-s.h*.55,s.w*.7);gr.addColorStop(0,'rgba(90,255,220,'+(.22*p)+')');gr.addColorStop(1,'rgba(90,255,220,0)');g.fillStyle=gr;g.beginPath();g.arc(0,-s.h*.55,s.w*.7,0,7);g.fill()}
  g.restore();return true}
setTimeout(()=>{try{const _m=mxTree;window.mxTree=mxTree=function(t,r,sw,now,MP){if(!t.k&&!t.pp&&!t.inv&&natOn())return natDraw(t,r,sw);return _m.apply(this,arguments)}}catch(e){console.warn('nat',e)}},1600);
