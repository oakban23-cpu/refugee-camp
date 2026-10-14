/* ---------- v370 ทางออกดันเจี้ยนภาค 6–7 มีภาพประตูจริง ----------
   ดันเจี้ยนรุ่นใหม่ (หอนาฬิกา · ก้นหลุมหัวใจ · ลิฟต์เหมือง · รังเก่าราชินี · เตาหลอมหัวใจ · สะพานแสง) ใช้ประตูแบบ ars/brg ซึ่งวาดแค่ป้ายชื่อ
   → ในดันเจี้ยนวาดซุ้มทางออกตามธีมห้อง · นอกดันเจี้ยนคงแบบเดิม (แมพเปิดมีภาพบันได/สะพานของตัวเองอยู่แล้ว) */
const P7HX={20:'brass',21:'stone',22:'timber',23:'crystal',24:'forge',19:'light'};
const P7HC={brass:{fr:'#a8782e',fr2:'#e8c060',dk:'#3a2410',in:'255,210,130',lb:'#ffe8b0'},stone:{fr:'#5a4c68',fr2:'#d8a050',dk:'#1a1024',in:'190,140,255',lb:'#e8dcff'},timber:{fr:'#5a3a1e',fr2:'#9a6a3a',dk:'#140a04',in:'255,190,110',lb:'#ffe0b0'},
  crystal:{fr:'#3a2c5a',fr2:'#b8a0ff',dk:'#0c0818',in:'200,160,255',lb:'#e8dcff'},forge:{fr:'#4a3a3a',fr2:'#ff9a4a',dk:'#1a0804',in:'255,150,70',lb:'#ffd8b0'},light:{fr:'#e0c080',fr2:'#fff0c0',dk:'#8a6a3a',in:'255,240,200',lb:'#fff4d8'}};
function p7hExit(G){const M=MAPS[curMap]||{},k=P7HX[M.dg]||'stone',C=P7HC[k],t=performance.now()/1000,x=G.x,y=G.y,near=me.cls&&Math.hypot(me.x-x,me.y-y)<90;g.save();
  /* เงาพื้น + ลูกศรชี้เข้าประตู */
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x+3,y+28,46,10,0,0,7);g.fill();
  for(let i=0;i<3;i++){const q=(t*.8+i/3)%1,yy=y+64-q*30;g.globalAlpha=Math.sin(q*3.14)*.8;g.strokeStyle='rgb('+C.in+')';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(x-10,yy+6);g.lineTo(x,yy);g.lineTo(x+10,yy+6);g.stroke()}g.globalAlpha=1;
  /* ช่องประตู: มืดลึก + แสงวนข้างใน */
  const dw=24,top=y-36;g.save();g.beginPath();g.moveTo(x-dw,y+26);g.lineTo(x-dw,top);g.arc(x,top,dw,Math.PI,0);g.lineTo(x+dw,y+26);g.closePath();g.clip();
  const gr=g.createLinearGradient(0,top-dw,0,y+26);gr.addColorStop(0,C.dk);gr.addColorStop(1,'rgba('+C.in+',.55)');g.fillStyle=gr;g.fillRect(x-dw-2,top-dw-2,dw*2+4,y+30-top+dw);
  g.globalCompositeOperation='lighter';for(let i=0;i<3;i++){g.strokeStyle='rgba('+C.in+','+(.25+i*.12)+')';g.lineWidth=2.4;g.beginPath();g.ellipse(x,y-8,dw-4-i*5,30-i*7,0,t*(i%2?1.2:-1.2)+i,t*(i%2?1.2:-1.2)+i+4);g.stroke()}
  glowAt(x,y-6,30,C.in,.35+.12*Math.sin(t*2));g.restore();
  /* กรอบตามธีม */
  if(k==='timber'){g.lineCap='square';g.strokeStyle='#2a1808';g.lineWidth=12;g.beginPath();g.moveTo(x-dw-6,y+26);g.lineTo(x-dw-6,top-dw-4);g.lineTo(x+dw+6,top-dw-4);g.lineTo(x+dw+6,y+26);g.stroke();g.strokeStyle=C.fr;g.lineWidth=9;g.stroke();
    g.strokeStyle='rgba(200,150,100,.4)';g.lineWidth=2;g.beginPath();g.moveTo(x-dw-9,y+26);g.lineTo(x-dw-9,top-dw-1);g.stroke();g.fillStyle='#2a2a30';for(const[px,py]of[[x-dw-6,top-dw-4],[x+dw+6,top-dw-4]]){g.fillRect(px-2,py-2,4,4)}
    g.strokeStyle=C.fr;g.lineWidth=5;g.beginPath();g.moveTo(x-dw-6,top+4);g.lineTo(x-dw+8,top-dw-4);g.moveTo(x+dw+6,top+4);g.lineTo(x+dw-8,top-dw-4);g.stroke();
    const sw=Math.sin(t*1.6)*3;g.strokeStyle='#2a1a10';g.lineWidth=1.2;g.beginPath();g.moveTo(x,top-dw-4);g.lineTo(x+sw,top-dw+12);g.stroke();g.fillStyle='#3a2a1a';g.fillRect(x+sw-5,top-dw+12,10,12);g.fillStyle='#ffd27a';g.fillRect(x+sw-3,top-dw+14,6,8);g.globalCompositeOperation='lighter';glowAt(x+sw,top-dw+18,26,'255,190,110',.5);g.globalCompositeOperation='source-over'}
  else{const ow=dw+9;g.lineCap='butt';g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=14;g.beginPath();g.moveTo(x-ow,y+26);g.lineTo(x-ow,top);g.arc(x,top,ow,Math.PI,0);g.lineTo(x+ow,y+26);g.stroke();
    g.strokeStyle=C.fr;g.lineWidth=11;g.stroke();g.strokeStyle=C.fr2;g.lineWidth=1.8;g.beginPath();g.moveTo(x-ow+4,y+26);g.lineTo(x-ow+4,top);g.arc(x,top,ow-4,Math.PI,0);g.lineTo(x+ow-4,y+26);g.stroke();
    if(k==='stone'||k==='forge'){g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=1;for(let i=1;i<7;i++){const a=Math.PI+i*Math.PI/7;g.beginPath();g.moveTo(x+Math.cos(a)*(ow-5),top+Math.sin(a)*(ow-5));g.lineTo(x+Math.cos(a)*(ow+5),top+Math.sin(a)*(ow+5));g.stroke()}for(let yy=top+12;yy<y+22;yy+=13){for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*(ow-5),yy);g.lineTo(x+s*(ow+5),yy);g.stroke()}}}
    if(k==='brass'){g.save();g.translate(x,top-ow+2);g.rotate(t*.4);g.fillStyle=C.fr2;for(let i=0;i<8;i++){g.rotate(Math.PI/4);g.fillRect(-2.5,-13,5,5)}g.beginPath();g.arc(0,0,10,0,7);g.fill();g.fillStyle=C.dk;g.beginPath();g.arc(0,0,4,0,7);g.fill();g.restore()}
    if(k==='crystal'){for(const[a,L]of[[-2.6,18],[-2.1,24],[-1.57,30],[-1.05,24],[-.55,18]]){const bx=x+Math.cos(a)*(ow+2),by=top+Math.sin(a)*(ow+2),tx=x+Math.cos(a)*(ow+L),ty=top+Math.sin(a)*(ow+L);g.fillStyle='#b8a0ff';g.beginPath();g.moveTo(bx-4,by);g.lineTo(tx,ty);g.lineTo(bx+4,by);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.moveTo(bx-1,by);g.lineTo(tx,ty);g.lineTo(bx+3,by);g.closePath();g.fill()}}
    if(k==='forge'){g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const q=(t*.5+i/6)%1,ex=x+(i-2.5)*9+Math.sin(t*2+i)*4;glowAt(ex,top-ow-q*40,2.4,'255,170,80',Math.sin(q*3.14))}g.globalCompositeOperation='source-over'}
    if(k==='light'){g.globalCompositeOperation='lighter';glowAt(x,top-ow,40,'255,240,200',.35);g.globalCompositeOperation='source-over'}
    /* หินฐาน + ตะเกียงสองข้าง */for(const s of[-1,1]){g.fillStyle=C.fr;g.fillRect(x+s*ow-9,y+20,18,9);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=1;g.strokeRect(x+s*ow-9,y+20,18,9);const lx=x+s*(ow+16),ly=y+24;g.strokeStyle='#2a1e14';g.lineWidth=3;g.beginPath();g.moveTo(lx,ly);g.lineTo(lx,ly-46);g.stroke();g.fillStyle=C.fr2;g.beginPath();g.roundRect(lx-5,ly-58,10,13,3);g.fill();g.globalCompositeOperation='lighter';glowAt(lx,ly-52,20,C.in,.5+.1*Math.sin(t*3+s));g.globalCompositeOperation='source-over'}}
  /* ป้าย */
  g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3.5;g.strokeStyle='rgba(16,10,20,.9)';const lb='🚪 ออกสู่'+(G.nm||((MAPS[G.to]||{}).n)||'');const ly=top-dw-(k==='timber'?16:22);g.strokeText(lb,x,ly);g.fillStyle=near?'#ffffff':C.lb;g.fillText(lb,x,ly);g.restore()}
setTimeout(()=>{try{const _og=drawOneGate;window.drawOneGate=drawOneGate=function(G){if(G&&(G.ars||G.brg)&&!G.alias){let dg=false;try{dg=isDg()}catch(e){}if(dg)return p7hExit(G)}return _og(G)}}catch(e){console.warn('p7hExit',e)}},120);
