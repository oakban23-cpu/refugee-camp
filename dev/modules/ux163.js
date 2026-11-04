/* ---------- v592 ย่อประตูแสงดาว (→ นครลอยฟ้า) และประตูบ้านกิลด์ ----------
   ผู้ใช้: ดูใหญ่ไป → ย่อเหลือ 78% · ประตูแสงดาวย่อรอบจุดกลางวงวาร์ป (จุดเหยียบวาร์ปเดิม) · ประตูกิลด์ย่อรอบฐานประตู · ปรับได้: GTS.star / GTS.guild */
const GTS={star:.78,guild:.78};
setTimeout(()=>{try{const _s=cgStar;window.cgStar=cgStar=function(x,y){const k=GTS.star;if(k===1)return _s.apply(this,arguments);g.save();g.translate(x,y);g.scale(k,k);g.translate(-x,-y);try{return _s.apply(this,arguments)}finally{g.restore()}}}catch(e){console.warn('gts',e)}
  try{const _g=cgGuild;window.cgGuild=cgGuild=function(x,y,col,now){const k=GTS.guild;if(k===1)return _g.apply(this,arguments);g.save();g.translate(x,y+10);g.scale(k,k);g.translate(-x,-(y+10));try{return _g.apply(this,arguments)}finally{g.restore()}}}catch(e){console.warn('gts',e)}},1600);
