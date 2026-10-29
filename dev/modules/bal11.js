
/* v562 กันพุ่งทะลุกำแพง (ทั้งเกม): dash() (พุ่งฟัน · ถอยกระโดด ฯลฯ) และสกิลกระโดด/แหวกมิติที่เลื่อนตัวเป็นเส้นตรง
   เดิมย้ายตัวทีเดียวโดยไม่เช็กชน → ข้ามแนวต้นไม้/กำแพงล่องหน/ขอบพื้นที่ แล้วตัวกันชนดันออกอีกฝั่ง = ติดนอกพื้นที่
   (ลอยฟ้านอกกำแพงนคร · มุมแมพหลังแนวต้นไม้ · นอกเรือ/นอกลานดัน) → ไล่ตามเส้นทางทีละ 6 หน่วย หยุดก่อนชน/ก่อนออกนอกพื้นที่เดินได้ */
function mvRay(sx,sy,ex,ey){try{const L=Math.hypot(ex-sx,ey-sy);if(!(L>=1))return[ex,ey];
  const x0=Math.min(sx,ex),x1=Math.max(sx,ex),y0=Math.min(sy,ey),y1=Math.max(sy,ey);
  /* ต้นไม้/ของชนได้ตามแนว (ไม่นับอันที่ยืนซ้อนอยู่แล้วตอนเริ่ม) */
  const T=trees.filter(t=>t.r>0&&!t.nc&&t.x+t.r+12>x0&&t.x-t.r-12<x1&&t.y+t.r+12>y0&&t.y-t.r-12<y1&&Math.hypot(sx-t.x,sy-t.y)>=t.r+8);
  let wk=false;try{wk=aqWalkable(sx,sy)}catch(e){}
  const n=Math.ceil(L/6);let px=sx,py=sy;
  for(let k=1;k<=n;k++){const x=sx+(ex-sx)*k/n,y=sy+(ey-sy)*k/n;if(x<12||y<12||x>WW-12||y>WH-12)break;
    let hit=false;for(const t of T)if(Math.hypot(x-t.x,y-t.y)<t.r+8){hit=true;break}if(hit)break;
    if(wk){let ok=true;try{ok=aqWalkable(x,y)}catch(e){}if(!ok)break}
    px=x;py=y}
  return[px,py]}catch(e){return[ex,ey]}}
{const _d=dash;dash=function(a,len,d){try{if(me.down<=0&&len>0){const[px,py]=mvRay(me.x,me.y,me.x+Math.cos(a)*len,me.y+Math.sin(a)*len);len=Math.hypot(px-me.x,py-me.y)}}catch(e){}return _d.call(this,a,len,d)}}
