/* ---------- v612 แมพ 19 (ป้อมใต้เมฆ) ลื่นขึ้น ----------
   วัดบนมือถือรุ่นกลางจำลอง: แสงต้นเห็ดดาวกลางป้อม (fhdBeacon) กินเวลาวาดมากที่สุดในแมพ (~15% ของเฟรม)
   · วงแสงใหญ่ 150 ซ้อนกับแสงกลางคืนของป้อมที่จุดเดียวกันอยู่แล้ว → ตัดออก เพิ่มความสว่างวงกลางแทน (หน้าตาใกล้เดิม)
   · ประกายลอยรอบต้น 16 → 8 จุด วาดเป็นจุดเล็ก (ไม่ใช้แสงฟุ้งทีละจุด) · เครื่องช้า/โหมดลื่นไม่วาดประกาย */
const F19={off:0};
setTimeout(()=>{try{const o=fhdBeacon;window.fhdBeacon=fhdBeacon=function(t){if(F19.off)return o.apply(this,arguments);
  const pu=.75+.25*Math.sin(t*1.6);g.save();g.globalCompositeOperation='lighter';glowAt(0,-100,92,'90,255,220',.26*pu);glowAt(0,-110,56,'200,255,245',.3*pu);g.restore();
  fSpr('star_mush',0,34,176);
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(0,-196+Math.sin(t*1.3)*3,30,'160,255,250',.5*pu);
    let lq=false;try{lq=lqHD()}catch(e){}
    if(!lq){for(let i=0;i<8;i++){const j=i*2,a=t*(.35+(j%4)*.08)+j*1.7,rr=50+(j%5)*22,px=Math.cos(a)*rr,py=-70+Math.sin(a)*rr*.35-((t*14+j*13)%60);g.fillStyle=i%3?'rgba(150,255,235,.55)':'rgba(215,180,255,.55)';g.fillRect(px-2,py-2,4,4);g.fillStyle='rgba(255,255,255,.8)';g.fillRect(px-.8,py-.8,1.6,1.6)}}
    g.restore()}}}catch(e){console.warn('f19',e)}},2300);
