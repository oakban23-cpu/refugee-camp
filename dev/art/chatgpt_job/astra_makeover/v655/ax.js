/* ---------- v655 อัสตรา: วางชิ้นภาพวาดที่เหลือในเมือง (ป้อมเหลี่ยม · หอสังเกตการณ์ · ซุ้มประตูโค้ง · น้ำพุเล็ก) ----------
   ใช้ atlas hd-ast1 ชุดเดิม (โหลดแล้ว ไม่เพิ่มไฟล์) · แสดงเมื่อเปิดภาพวาด (astOn) · ชนได้เฉพาะตอนแสดง */
const AX={on:0,
  BAST:[1,3,5,7].map(k=>{const a=k*Math.PI/4;return[CX+Math.cos(a)*(CITY.R+8),CY+Math.sin(a)*(CITY.R+8)]}),
  TURR:[-1,1].map(s=>{const a=Math.PI+s*.15;return[CX+Math.cos(a)*(CITY.R+8),CY+Math.sin(a)*(CITY.R+8)]}),
  GATE:[[1600,1955]],
  FOUNT:[[1300,2150],[1785,2032]],
  rects:[],circ:[]};
AX.GATE.forEach(([x,y])=>{AX.rects.push([x-64,y-16,x-27,y+4],[x+27,y-16,x+64,y+4])});
AX.FOUNT.forEach(([x,y])=>AX.circ.push([x,y-6,40]));
/* ชนได้เฉพาะตอนชิ้นภาพวาดแสดงอยู่ (ปิดภาพวาด HD → ไม่มีสิ่งกีดขวางล่องหน) */
function axSync(){const on=astOn()?1:0;if(on===AX.on)return;AX.on=on;
  if(on){AX.rects.forEach(r=>CITY.rects.push(r));AX.circ.forEach(c=>CITY.circ.push(c))}
  else{CITY.rects=CITY.rects.filter(r=>!AX.rects.includes(r));CITY.circ=CITY.circ.filter(c=>!AX.circ.includes(c))}}
function axFount(x,y,t){hdSh(x+3,y+2,44,11,.26);const h=astSpr(1,'fount',x,y+4,96);
  /* ประกายน้ำเล็ก ๆ ให้ไม่นิ่ง */
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const q=(t*1.4+i/4)%1,a=i*1.7+t*.4;g.fillStyle='rgba(200,235,255,'+(.55*(1-q))+')';g.beginPath();g.arc(x+Math.cos(a)*24*q,y-h*.62+q*q*26,1.6,0,7);g.fill()}g.restore()}}
setTimeout(()=>{try{
  const oC=citySprites;window.citySprites=citySprites=function(){const L=oC.apply(this,arguments);if(!astOn())return L;
    const P=(y,x,w,k,d)=>{const f=AST.f1[k];if(!f)return;const h=w*f[3]/f[2];L.push({y,x0:x-w/2,y0:y-h,x1:x+w/2,y1:y+16,d,big:1})};
    AX.BAST.forEach(([x,y])=>P(y,x,104,'bast',()=>{if(!astOn())return;hdSh(x+6,y+7,48,12,.3);astSpr(1,'bast',x,y+16,104)}));
    AX.TURR.forEach(([x,y])=>P(y,x,60,'turr',()=>{if(!astOn())return;hdSh(x+4,y+6,26,8,.28);astSpr(1,'turr',x,y+14,60)}));
    AX.GATE.forEach(([x,y])=>P(y,x,150,'bgate',()=>{if(!astOn())return;hdSh(x+4,y+3,70,10,.26);astSpr(1,'bgate',x,y+6,150)}));
    AX.FOUNT.forEach(([x,y])=>P(y,x,96,'fount',t=>{if(!astOn())return;axFount(x,y,t==null?performance.now()/1000:t)}));
    return L};
  const oD=drawCity;window.drawCity=drawCity=function(){if(curMap===9)try{axSync()}catch(e){}return oD.apply(this,arguments)};
  try{if(curMap===9)CSPR=null}catch(e){}
}catch(e){console.warn("v655",e)}},3500);
