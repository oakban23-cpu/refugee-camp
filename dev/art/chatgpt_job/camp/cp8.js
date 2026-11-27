/* ===== v668 · รั้วไม้รอบค่ายภาพวาด (cp_07/cp_08) =====
   - ช่วงรั้วละ 1 เสา (~44 หน่วย) เรียงตามวงรั้วค่าย · ช่วงที่วิ่งแนวนอน (หน้า/หลังวง) ใช้รั้วด้านข้าง เฉือนตามแนวโค้ง เสายังตั้งตรง
   - ช่วงที่วิ่งแนวตั้ง (ซ้าย/ขวาวง) ใช้รั้วมองจากบน ยกขึ้นตามความสูงรั้ว · เว้นช่องประตู 4 ทิศเหมือนเดิม · เสาประตูเดิมคงไว้ */
function cpFence(R,gap){const M=CPG.M,I=CPG.I.a,N=Math.round(2*Math.PI*R/44),L=[];
  for(let i=0;i<N;i++){const a1=i/N*6.2832,a2=(i+1)/N*6.2832,am=(a1+a2)/2,rel=Math.abs(((am+.7854)%1.5708)-.7854);if(rel<gap+.015)continue;
    let xa=Math.cos(a1)*R,ya=Math.sin(a1)*R,xb=Math.cos(a2)*R,yb=Math.sin(a2)*R;const hor=Math.abs(yb-ya)<Math.abs(xb-xa);
    if(hor&&xa>xb){[xa,xb]=[xb,xa];[ya,yb]=[yb,ya]}if(!hor&&ya>yb){[xa,xb]=[xb,xa];[ya,yb]=[yb,ya]}L.push([(ya+yb)/2,hor,xa,ya,xb,yb])}
  L.sort((a,b)=>a[0]-b[0]);
  for(const[my,hor,xa,ya,xb,yb]of L){g.save();
    if(hor){const r=M.FENCE_RAIL_H,h=30,dx=xb-xa;cpShd(g,(xa+xb)/2+2,my+2,dx*.6,3.2,.32);g.translate(xa,ya+3);g.transform(1,(yb-ya)/dx,0,1,0,0);g.drawImage(I,r[0]+.5,r[1],r[2]-1,r[3],-.3,-h,dx+.6,h)}
    else{const r=M.FENCE_RAIL_V,w=13,dy=yb-ya;cpShd(g,(xa+xb)/2+2,my+3,6,dy*.55,.28);g.translate(xa,ya-13);g.transform(1,0,(xb-xa)/dy,1,0,0);g.drawImage(I,r[0],r[1]+.5,r[2],r[3]-1,-w/2,-.3,w,dy+.6)}
    g.restore()}}
