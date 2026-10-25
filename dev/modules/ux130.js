/* ===== v522 ตัวละครผู้เล่น ช่วง 3: หมวกวาดใหม่ — 7 ระดับ × 3 ทรง (คงแนวคิดเดิมทุกแบบ) + Ancient/Cosmic แบบเฉพาะ + ชุดเซ็ต 1–3
   ไล่เฉด/แสงเงา ขอบ หมุด อัญมณี ขนนก ปีก เขา ฯลฯ · ชุดเงา/พายุ/ราก ใช้หมวกเฉพาะชุดเดิม
   Ancient (r5): รหัสหมวก = หลัก 6 + (ทรง+1)×20 (+10 เรือง) — ชุดเซ็ตไม่ใช้หลักทรง จึงไม่ชน · ตัวถอดรหัสเดิมเห็นเป็นหมวกเซ็ต 1 (ช่วงอัปเดตเท่านั้น)
   แทน drawHelmCode ทางชื่อ · ไอคอนหมวกในกระเป๋าใช้ภาพเดียวกัน · error → แบบเดิม (HM.on=0 ปิด) ===== */
const HM={on:1,err:'',n:0};
function hmAnc(c){c=c|0;if(c<=0||c>=100)return null;const d=c%10,k=Math.floor(c/20);return d===6&&k>=1?{s:k-1,gw:(c%20)>=10}:null}
function hmDec(c){c=c|0;if(!c||lkX(c))return null;const A=hmAnc(c);if(A)return{T:5,s:A.s,set:0,gw:A.gw};const d=c%10,s=Math.floor(c/20)%3,gw=(c%20)>=10;
  if(d>=6&&d<=8)return{T:6,s:0,set:d-5,gw};if(d===9)return{T:6,s,set:0,gw};if(d<1)return null;return{T:d-1,s,set:0,gw}}
function hF(P,c,y0,y1,lw){pcP(P);g.fillStyle=chSh(c,y0,y1);g.fill();if(lw!==0){g.lineWidth=lw||1;g.strokeStyle=O0;g.stroke()}}
const hL=pcL;
function hDome(hy,c,o){o=o||{};const rx=o.rx||8.7,ry=o.ry||7.8,cy=o.cy!=null?o.cy:hy-1.4,y1=o.y1!=null?o.y1:hy+.9;
  const path=()=>{g.beginPath();g.ellipse(.8,cy,rx,ry,0,Math.PI,0);g.lineTo(.8+rx+.6,y1);g.quadraticCurveTo(.8,y1+.9,.8-rx-.6,y1);g.closePath()};
  path();g.fillStyle=chSh(c,cy-ry,y1);g.fill();
  if(!LOWQ){path();g.fillStyle=alHG();g.fill();g.fillStyle='rgba(255,255,255,.3)';g.beginPath();g.ellipse(-2,cy-ry*.45,rx*.38,ry*.28,-.35,0,7);g.fill()}
  path();g.lineWidth=1.1;g.strokeStyle=O0;g.stroke()}
function hBand(c,y0,h){h=h||2.6;hF([[-8.3,y0+.3],['q',.8,y0-.7,9.9,y0+.3],[9.9,y0+h],['q',.8,y0+h-.7,-8.3,y0+h]],c,y0,y0+h,.9);hL([[-7.8,y0+.75],['q',.8,y0-.15,9.4,y0+.75]],'rgba(255,255,255,.45)',.5)}
function hRiv(L,c){if(LOWQ)return;for(const[a,b]of L){g.beginPath();g.arc(a,b,.55,0,7);g.fillStyle=c||'#eef2f6';g.fill();g.lineWidth=.4;g.strokeStyle=O0;g.stroke()}}
function hHalo(hy,c,t,h){const cy=hy-(h||15)+Math.sin(t*2)*.7;g.strokeStyle=c;if(!LOWQ){g.globalAlpha=.3;g.lineWidth=4;g.beginPath();g.ellipse(.8,cy,7,2.1,0,0,7);g.stroke();g.globalAlpha=1}g.lineWidth=1.7;g.beginPath();g.ellipse(.8,cy,7,2.1,0,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=.6;g.beginPath();g.ellipse(.8,cy-.3,6.3,1.6,0,Math.PI*1.1,Math.PI*1.9);g.stroke()}
function hPlume(x0,y0,c,t,len){const sw=Math.sin(t*3)*1.1;for(let k=0;k<(LOWQ?2:4);k++){const L=len-k*1.7,yy=y0+k*1.3,cc=k%2?chAdj(c,-.18):c;hF([[x0,yy],['q',x0-L*.35,yy-L*.8+sw,x0-L,yy-L*.38+sw*1.4],['q',x0-L*.5,yy-L*.18,x0+1.4,yy+2.2]],cc,yy-L*.8,yy+2.2,k?0.6:1)}hL([[x0-1,y0],['q',x0-len*.3,y0-len*.62+sw,x0-len*.85,y0-len*.36+sw*1.3]],'rgba(255,255,255,.5)',.6)}
function hWing(sd,x,y,c,t,k){k=k||1;const fl=Math.sin(t*3)*.6;for(let i=LOWQ?0:2;i>=0;i--){const L=(8.4-i*2)*k;hF([[x,y+i*1.3],['q',x+sd*L*.55,y-L*.95-i+fl,x+sd*L,y-L*.9-i*.7+fl],['q',x+sd*L*.75,y-L*.3+i*.4,x+sd*1.4,y+2.4+i]],i?chAdj(c,-.06*i):c,y-L-1,y+3,.7)}hL([[x+sd*1.4,y],['q',x+sd*4*k,y-5.4*k+fl,x+sd*7.4*k,y-7*k+fl]],'rgba(255,255,255,.7)',.5)}
function hHorn(sd,x,y,c,len,tip){const P=[[x,y],['q',x+sd*len*.95,y-len*.05,x+sd*len*.78,y-len],['q',x+sd*len*.5,y-len*.42,x-sd*1.8,y-2.6]];hF(P,c,y-len,y,.9);
  if(tip){const gr=g.createLinearGradient(x,y,x+sd*len*.78,y-len);gr.addColorStop(0,c);gr.addColorStop(.55,c);gr.addColorStop(1,tip);pcP(P);g.fillStyle=gr;g.fill();g.lineWidth=.9;g.strokeStyle=O0;g.stroke()}
  for(let i=1;i<4;i++){const q=i/4.4;hL([[x+sd*len*.5*q*1.6-sd*.6,y-len*q*.55],[x+sd*len*.5*q*1.6+sd*1.6,y-len*q*.55-1.2]],'rgba(0,0,0,.3)',.5)}}
function hCrown(y0,c,tipC,o){o=o||{};const H=o.h||1,P=[[-7.4,y0+1],[-8.1,y0-6*H],[-4.6,y0-3.4*H],[-2.2,y0-9*H],[.8,y0-4.4*H],[3.8,y0-9*H],[6.2,y0-3.4*H],[9.7,y0-6*H],[9,y0+1]];
  hF(P,c,y0-9*H,y0+1,1);if(!LOWQ){pcP(P);g.fillStyle=alHG();g.fill()}
  hF([[-7.6,y0-1.4],[9.2,y0-1.4],[9.2,y0+1.2],[-7.6,y0+1.2]],chAdj(c.length===7?c:'#c8961e',-.15),y0-1.4,y0+1.2,.8);
  if(tipC)for(const[a,b]of[[-8.1,y0-6*H],[-2.2,y0-9*H],[3.8,y0-9*H],[9.7,y0-6*H]]){g.beginPath();g.arc(a,b,.9,0,7);g.fillStyle=tipC;g.fill();g.lineWidth=.5;g.strokeStyle=O0;g.stroke()}}
function hStars(hy,t,n,r,c){if(LOWQ)n=Math.min(n,1);for(let i=0;i<n;i++){const a=t*1.8+i*6.283/n,sx=.8+Math.cos(a)*(r||11),sy=hy-8+Math.sin(a)*3.4;alStar(sx,sy,1.5,c||'rgba(225,240,255,.95)')}}
function hEmber(hy,t,n){if(LOWQ)return;for(let i=0;i<n;i++){const q=(t*.7+i/n)%1,a=i*2.4;g.fillStyle='rgba(255,'+(120+q*100|0)+',40,'+(.85*(1-q))+')';g.beginPath();g.arc(.8+Math.cos(a)*8,hy-6-q*10,1.1*(1-q)+.4,0,7);g.fill()}}
/* ---------- ระดับ 0 Basic ---------- */
function hm0(hy,s,t){
  if(s===1){/* ผ้าโพกหัวแดง */const w=Math.sin(t*4);hF([[-7.6,hy-4],[-12.4,hy-6.4+w],[-12.6,hy-2.2+w],[-9.6,hy-3]],'#a8322a',hy-6.4,hy-2,.8);hF([[-7.6,hy-3],[-11,hy+1.6+w*.6],[-9.2,hy+2.6+w*.6],[-7,hy-1.6]],'#8a2820',hy-3,hy+2.6,.8);
    const P=[[-7.8,hy-5.4],['q',.8,hy-7.8,9.6,hy-5.6],[9.8,hy-2.4],['q',.8,hy-4.4,-7.6,hy-2.2]];hF(P,'#c8402e',hy-7,hy-2.2,1);
    g.fillStyle='rgba(255,240,220,.85)';for(const[a,b]of[[-4,hy-4.4],[0,hy-5.4],[4,hy-5.2],[7.6,hy-4.4],[-1.8,hy-3.4],[2.2,hy-3.8]]){g.beginPath();g.arc(a,b,.42,0,7);g.fill()}
    hL([[-6.8,hy-3.4],['q',.8,hy-5.2,8.8,hy-3.6]],'rgba(0,0,0,.25)',.5);g.beginPath();g.ellipse(-8.2,hy-3.8,1.7,1.4,0,0,7);g.fillStyle=chSh('#b23a2e',hy-5.2,hy-2.4);g.fill();g.lineWidth=.8;g.strokeStyle=O0;g.stroke();return}
  if(s===2){/* หมวกฟาง */const st='#d8b06a';g.beginPath();g.ellipse(.8,hy-3.8,11.8,2.8,0,0,7);g.fillStyle=chSh(st,hy-6.6,hy-1);g.fill();g.lineWidth=1;g.strokeStyle=O0;g.stroke();
    hL([[-10,hy-4.6],['q',.8,hy-6.2,11.4,hy-4.4]],'rgba(255,250,220,.55)',.6);hDome(hy,st,{rx:6.4,ry:5.8,cy:hy-4.4,y1:hy-3.8});
    if(!LOWQ){g.strokeStyle='rgba(120,80,30,.45)';g.lineWidth=.45;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(.8+i*2.4,hy-9.6+Math.abs(i)*.9);g.lineTo(.8+i*2.8,hy-5.4);g.stroke()}}
    hF([[-5.4,hy-6],[7,hy-6],[7.2,hy-4.2],[-5.6,hy-4.2]],'#7a4a2a',hy-6,hy-4.2,.7);return}
  /* หมวกหนัง */hDome(hy,'#8a5a34');g.save();g.setLineDash([.9,.8]);hL([[.8,hy-9],['q',-2.6,hy-6,-4.8,hy-.4]],'rgba(240,210,160,.65)',.5);hL([[.8,hy-9],['q',4.6,hy-6,6.4,hy-.4]],'rgba(240,210,160,.65)',.5);g.restore();
  hF([[-7.8,hy-.6],[-5.6,hy-.6],[-5.8,hy+4.4],['q',-7,hy+5.4,-8.2,hy+3.6]],'#7a5030',hy-.6,hy+5,.8);hBand('#5e3e22',hy-1.7,2.4);g.beginPath();g.arc(.8,hy-9.2,1,0,7);g.fillStyle='#6a4428';g.fill();g.lineWidth=.6;g.strokeStyle=O0;g.stroke()}
/* ---------- ระดับ 1 Refined (เหล็ก) ---------- */
function hm1(hy,s,t,P){
  if(s===1){/* หมวกกระทะ */hDome(hy,P.m,{rx:7.2,ry:6.6,cy:hy-3.8,y1:hy-3.4});g.beginPath();g.ellipse(.8,hy-3.6,12.6,2.6,0,0,7);g.fillStyle=chSh(P.m,hy-6.2,hy-1);g.fill();g.lineWidth=1;g.strokeStyle=O0;g.stroke();
    hL([[-10.6,hy-4.4],['q',.8,hy-6.2,12.2,hy-4.2]],'rgba(255,255,255,.6)',.6);hRiv([[-8.4,hy-3],[-3,hy-1.9],[2.8,hy-1.8],[8.4,hy-2.6]]);hL([[-5.6,hy-5.2],['q',.8,hy-6.8,7.4,hy-5.2]],P.d,.6);return}
  if(s===2){/* หมวกมีหน้ากาก */hF([[-8.6,hy+1.6],[-9.8,hy+3.6],[-7,hy+3]],P.d,hy+1,hy+3.6,.8);hDome(hy,P.m,{rx:8.8,ry:8.6,cy:hy-1.2,y1:hy+1.6});
    const V=[[1.2,hy-5],[10.6,hy-5.4],['q',11.8,hy-1,10.8,hy+3.2],[1.6,hy+3.4]];hF(V,P.d,hy-5.4,hy+3.4,1);g.fillStyle='rgba(255,255,255,.3)';g.fillRect(1.8,hy-4.6,8.2,.8);
    g.fillStyle='#120e14';g.fillRect(2.6,hy-2.6,7.8,1.5);for(let i=0;i<3;i++){g.beginPath();g.arc(4.2+i*2.2,hy+1,.42,0,7);g.fill()}hRiv([[1.8,hy-1.8],[-5,hy-1],[-1.6,hy-1.6]]);return}
  /* หมวกเหล็กครอบจมูก */hDome(hy,P.m);hBand(P.d,hy-2,2.6);hRiv([[-6.4,hy-.7],[-2.4,hy-1.1],[1.8,hy-1.1],[8.4,hy-.8]]);
  hF([[4.6,hy-2.2],[6.4,hy-2.2],[6.2,hy+3.6],['q',5.4,hy+4.4,4.8,hy+3.6]],P.m,hy-2.2,hy+4.4,.8);hL([[.8,hy-9.2],['q',-3.4,hy-8.4,-6.4,hy-3]],'rgba(0,0,0,.3)',.6)}
/* ---------- ระดับ 2 Elite (เงินฟ้า) ---------- */
function hm2(hy,s,t,P){
  if(s===1){/* หมวกปีก */hWing(-1,-7.4,hy-3.6,'#f4f8ff',t,1);hDome(hy,P.m);hWing(1,9.2,hy-3.6,'#f4f8ff',t,.9);hBand(P.t,hy-2,2.6);alGem(.8,hy-.7,1.4,P.g,1);return}
  if(s===2){/* หมวกเขาสัตว์ */hHorn(-1,-5.6,hy-4,'#efe2c4',9.6);hHorn(1,7.2,hy-4.2,'#efe2c4',9);hDome(hy,P.m);hBand('#6a5030',hy-2,2.6);
    g.fillStyle='#e8b444';for(let i=-2;i<=2;i++){g.beginPath();g.arc(.8+i*3.6,hy-.6,.75,0,7);g.fill();g.lineWidth=.4;g.strokeStyle=O0;g.stroke()}return}
  /* หมวกขนนกแดง */hPlume(-.6,hy-8,'#e0483e',t,12);hDome(hy,P.m);hBand(P.t,hy-2,2.6);g.beginPath();g.ellipse(.8,hy-9.2,1.6,1.1,0,0,7);g.fillStyle=chSh(P.t,hy-10.3,hy-8.1);g.fill();g.lineWidth=.6;g.strokeStyle=O0;g.stroke();alGem(6.8,hy-.8,1.3,P.g,1)}
/* ---------- ระดับ 3 Mystic (ม่วงเวท) ---------- */
function hm3(hy,s,t,P){
  if(s===1){/* ผ้าคลุมเวท */const C=[[-9,hy+5.6],[-9.2,hy-4],['q',-6.4,hy-12.4,1,hy-12.4],['q',9.4,hy-11.4,10.8,hy-3],[9.8,hy-2.4],['q',5,hy-8.4,-2,hy-6.2],[-4,hy+5.6]];hF(C,P.m,hy-12.4,hy+5.6,1.1);
    hL([[-4,hy+5.2],[-2,hy-6.1],['q',5,hy-8.3,9.8,hy-2.6]],P.t,1.3);hL([[-8.2,hy-3.6],['q',-5.6,hy-11,1,hy-11.4]],'rgba(255,255,255,.3)',.8);
    if(!LOWQ){g.fillStyle='rgba(230,200,255,.55)';for(const[a,b]of[[-6.6,hy-1],[-6.2,hy+2.6],[-4.4,hy-7]]){g.beginPath();g.arc(a,b,.5,0,7);g.fill()}}
    alGem(3.6,hy-7.8,1.6,'#e8a0ff',1);return}
  if(s===2){/* อัศวินมืด */const dk='#3a3448';hF([[-3,hy-8.2],[-1,hy-14.4],[1.4,hy-8.4]],'#5a5070',hy-14.4,hy-8.2,.8);hF([[-7.8,hy-3],[-12.6,hy-8.4],[-8.4,hy+1]],'#5a5070',hy-8.4,hy+1,.8);
    g.beginPath();g.ellipse(.8,hy-.4,8.9,8.5,0,0,7);g.fillStyle=chSh(dk,hy-8.9,hy+8.1);g.fill();g.lineWidth=1.1;g.strokeStyle=O0;g.stroke();
    if(!LOWQ){g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.ellipse(-2.6,hy-5,3.6,2.2,-.4,0,7);g.fill()}
    g.fillStyle='#0c0a10';g.fillRect(1.2,hy-2.6,8.8,2.1);g.fillRect(4.4,hy-2.6,2.2,7.2);g.fillStyle='#e8b8ff';g.fillRect(2,hy-2.2,2.2,1.2);g.fillRect(7,hy-2.2,2.2,1.2);g.shadowBlur=0;
    hRiv([[-5.6,hy+1],[-6.6,hy-3],[-3.2,hy-6.4]],'#8a7aa8');return}
  /* หมวกยอดหนาม */for(let i=0;i<5;i++){const x=-5.6+i*3.4,h=5.6-Math.abs(i-2)*1.3;alSpike(x,hy-7.4+Math.abs(i-2)*.9,0,-h,1.2,P.l)}
  hDome(hy,P.m);hBand(P.d,hy-2,2.6);alGem(5,hy-.7,1.3,'#ffd84a',0);hF([[8.8,hy-1.4],[12.2,hy+3.2],[8.2,hy+2]],'#c070ff',hy-1.4,hy+3.2,.7);g.shadowBlur=0}
/* ---------- ระดับ 4 Relic (ทอง) ---------- */
function hm4(hy,s,t,P){
  if(s===1){/* หมวกขนนกเพลิง */for(let i=4;i>=0;i--){const w=Math.sin(t*5+i)*1.3,bx=-.6-i*1.9,L=9-i*.8;const F=[[bx+2.6,hy-7.6+i*.3],['q',bx-1.6,hy-11-L*.5+w,bx-L*.75,hy-11.6-i*.4+w],['q',bx-1.8,hy-9.4+i*.2,bx+.8,hy-5.6+i*.3]];
      hF(F,i%2?'#e8541e':'#ff7a1e',hy-12-L*.5,hy-5,.6);g.save();g.globalAlpha=.85;hF([[bx+2,hy-7.6+i*.3],['q',bx-.6,hy-10-L*.35+w,bx-L*.5,hy-10.6-i*.4+w],['q',bx-1,hy-8.8+i*.2,bx+.8,hy-6.4+i*.3]],'#ffd860',hy-11,hy-6,0);g.restore()}
    hDome(hy,P.m);hBand('#c2352b',hy-2,2.6);hF([[9.4,hy-1.2],[13,hy+.6],[9.2,hy+1.8]],P.l,hy-1.2,hy+1.8,.7);alGem(.8,hy-.7,1.5,P.g,1);hL([[-6,hy-4.4],['q',.8,hy-7.4,7.6,hy-4.4]],P.t,.6);return}
  if(s===2){/* มงกุฎดาว */const y0=hy-4.8;hL([[-7.6,y0+1.4],['q',.8,y0-2,9.6,y0+1.2]],O0,3.4);hL([[-7.6,y0+1.4],['q',.8,y0-2,9.6,y0+1.2]],'#e8b444',2);hL([[-7.2,y0+.9],['q',.8,y0-2.4,9.2,y0+.7]],'#fff2a8',.6);
    for(const sd of[-1,1])hF([[.8+sd*2.2,y0-1],[.8+sd*6.4,y0-4.6],[.8+sd*5,y0-.4]],'#fff2a8',y0-4.6,y0,.6);
    alStar(.8,y0-2.8,3.2,'#f0f8ff');g.shadowBlur=0;alGem(.8,y0-2.6,1,'#5ad0ff',0);hStars(hy,t,3,11);return}
  /* มงกุฎ + รัศมี */hHalo(hy,'#ffe08a',t,15.5);hCrown(hy-3.4,'#f0c040','#5ad0ff');alGem(.8,hy-5.6,1.5,'#ff5a3a',1);g.fillStyle='#ff5a3a';for(const a of[-5,6.6]){g.beginPath();g.arc(a,hy-3.2,.6,0,7);g.fill()}}
/* ---------- ระดับ 5 Ancient (แดงชาด + ทอง) ---------- */
function hm5(hy,s,t,P){
  if(s===1){/* หมวกปีศาจเขาคู่ */hHorn(-1,-5,hy-4.6,'#1e0a0e',11,'#e2585c');hDome(hy,P.m);hHorn(1,7,hy-4.8,'#1e0a0e',10,'#e2585c');hBand(P.t,hy-2,2.6);
    const V=[[2,hy-4.6],[10.4,hy-5],['q',11.4,hy-1,10.6,hy+3],[2.4,hy+3.2]];hF(V,P.d,hy-5,hy+3.2,1);g.fillStyle='#ff6a5a';g.fillRect(3.2,hy-2.4,6.8,1.2);g.shadowBlur=0;
    alSpike(.8,hy-8.4,0,-3.4,1.1,P.t);return}
  if(s===2){/* มงกุฎเปลวถ่าน */const y0=hy-4.8;for(const sd of[-1,1]){if(!LOWQ){g.save();g.globalCompositeOperation='lighter'}for(let i=0;i<3;i++){const w=Math.sin(t*5+i+sd)*1;g.fillStyle='rgba(255,'+(80+i*50)+',30,.8)';g.beginPath();g.moveTo(.8+sd*6,y0);g.quadraticCurveTo(.8+sd*(9+i*1.6),y0-5-i*1.6+w,.8+sd*(11+i),y0-8-i+w);g.quadraticCurveTo(.8+sd*(8+i),y0-3,.8+sd*4.6,y0+1);g.fill()}if(!LOWQ)g.restore()}
    hL([[-7.6,y0+1.4],['q',.8,y0-2,9.6,y0+1.2]],O0,3.6);hL([[-7.6,y0+1.4],['q',.8,y0-2,9.6,y0+1.2]],'#a87a1e',2.2);hL([[-7.2,y0+.9],['q',.8,y0-2.4,9.2,y0+.7]],'#ffd27a',.6);
    alGem(.8,y0-1.8,2,P.g,1);hEmber(hy,t,5);return}
  /* มงกุฎเลือด */hEmber(hy,t,3);for(const sd of[-1,1])hHorn(sd,.8+sd*6,hy-4.6,'#2a0a10',4.6,P.l);
  const y0=hy-3.4,C=[[-7.4,y0+1],[-8.4,y0-5],[-6,y0-3],[-4.8,y0-8.4],[-2.4,y0-3.6],[.8,y0-10.6],[4,y0-3.6],[6.4,y0-8.4],[7.6,y0-3],[10,y0-5],[9,y0+1]];hF(C,P.m,y0-10.6,y0+1,1);
  if(!LOWQ){pcP(C);g.fillStyle=alHG();g.fill()}hF([[-7.6,y0-1.4],[9.2,y0-1.4],[9.2,y0+1.2],[-7.6,y0+1.2]],P.t,y0-1.4,y0+1.2,.8);alGem(.8,y0-4.4,1.8,P.g,1)}
/* ---------- ระดับ 6 Cosmic (ห้วงดาว) ---------- */
function hm6(hy,s,t,P){
  if(s===1){/* หมวกเนบิวลา + หางดาวหาง */const sw=Math.sin(t*3)*1.2;if(!LOWQ){g.save();g.globalCompositeOperation='lighter'}for(let k=0;k<3;k++){g.fillStyle=k===0?'rgba(255,140,220,.75)':k===1?'rgba(170,120,255,.6)':'rgba(255,255,255,.7)';g.beginPath();g.moveTo(-1,hy-7.6+k);g.quadraticCurveTo(-7-k*2,hy-15+sw-k,-15+k*2,hy-10+sw*1.4);g.quadraticCurveTo(-7,hy-8.6+k,-1,hy-5.4);g.fill()}if(!LOWQ)g.restore();
    hDome(hy,P.m);if(!LOWQ){g.save();g.fillStyle='#fff';for(const[a,b,r]of[[-3,hy-6,.6],[2,hy-8,.5],[5,hy-4,.7],[-5.6,hy-2.6,.4],[0,hy-3.4,.45]]){g.beginPath();g.arc(a,b,r,0,7);g.fill()}g.restore()}
    hBand(P.l,hy-2,2.4);alStar(.8,hy-.8,1.8,'#ffffff');return}
  if(s===2){/* มงกุฎกาแล็กซี */const y0=hy-4.8;hL([[-7.6,y0+1.4],['q',.8,y0-2,9.6,y0+1.2]],O0,3.4);hL([[-7.6,y0+1.4],['q',.8,y0-2,9.6,y0+1.2]],'#ffd2f0',2);
    g.save();g.translate(.8,hy-9);g.rotate(-.25);g.strokeStyle='rgba(255,180,240,.85)';g.lineWidth=1;g.beginPath();g.ellipse(0,0,11.5,3.2,0,0,7);g.stroke();g.restore();
    alStar(.8,y0-2.8,3.4,'#fff0fb');g.shadowBlur=0;for(let i=0;i<3;i++){const a=t*1.5+i*2.09,c=Math.cos(.25),sn=Math.sin(-.25),px=Math.cos(a)*11.5,py=Math.sin(a)*3.2;g.beginPath();g.arc(.8+px*c-py*sn,hy-9+px*sn+py*c,1+(i===0?.5:0),0,7);g.fillStyle=['#7ae0ff','#ffd27a','#ff9ad8'][i];g.fill()}return}
  /* มงกุฎผลึกดาว */hHalo(hy,'#ff9ad8',t,16);const y0=hy-3.4;for(const[x,h,w]of[[-6.4,6,1.5],[-3.2,8.4,1.7],[.8,11,2.1],[4.8,8.4,1.7],[8,6,1.5]])hF([[x-w,y0],[x-w*.8,y0-h*.7],[x,y0-h],[x+w*.8,y0-h*.7],[x+w,y0]],'#c890ff',y0-h,y0,.7);
  if(!LOWQ){g.fillStyle='rgba(255,255,255,.55)';for(const[x,h]of[[-3.2,8.4],[.8,11],[4.8,8.4]]){g.beginPath();g.moveTo(x-.3,y0-h+1);g.lineTo(x-1,y0-h*.6);g.lineTo(x-.3,y0-2);g.closePath();g.fill()}}
  hF([[-7.6,y0-1.2],[9.2,y0-1.2],[9.2,y0+1.2],[-7.6,y0+1.2]],'#ffd2f0',y0-1.2,y0+1.2,.8);alStar(.8,y0,1.6,'#ffffff')}
/* ---------- ชุดเซ็ต 1–3 ---------- */
function hmSet(hy,id,t,P){
  if(id===1){/* มงกุฎปะการัง (ราชันห้วงลึก) */hBand('#18887e',hy-4,3);for(const[x,h,sd]of[[-6,6,-1],[-2.6,9,1],[.8,12,-1],[4.2,9,1],[7.6,6,-1]]){hL([[x,hy-4],['q',x+sd*1.4,hy-4-h*.5,x,hy-4-h]],O0,2.4);hL([[x,hy-4],['q',x+sd*1.4,hy-4-h*.5,x,hy-4-h]],'#e88a78',1.3);hL([[x+sd*.6,hy-4-h*.5],[x+sd*2.6,hy-4-h*.75]],'#e88a78',.9);g.beginPath();g.arc(x,hy-4-h,.8,0,7);g.fillStyle='#ffc8b8';g.fill()}
    g.beginPath();g.arc(.8,hy-2.5,1.6,0,7);g.fillStyle='#f4fffd';g.fill();g.shadowBlur=0;g.lineWidth=.6;g.strokeStyle=O0;g.stroke();return}
  if(id===2){/* หมวกครีบ (ผู้พิทักษ์ห้วงลึก) */hF([[-4,hy-8],['q',-2,hy-15.4,4.6,hy-15],['q',2.4,hy-12,5.4,hy-8.6]],'#d8e6ff',hy-15.4,hy-8,.9);hDome(hy,P.m);
    g.strokeStyle='rgba(216,230,255,.85)';g.lineWidth=.7;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(.8,hy-8.6);g.lineTo(.8+i*3.6,hy-.4);g.stroke()}hBand('#c8b080',hy-2,2.4);alGem(.8,hy-.8,1.3,'#cfe4ff',1);return}
  /* มงกุฎปีกรุ่งอรุณ */hHalo(hy,'#ffdc8c',t,14.5);hWing(-1,-6.4,hy-3.6,'#ffffff',t,.95);hWing(1,8,hy-3.6,'#ffffff',t,.95);hCrown(hy-3,'#ffd060','#ffffff',{h:.9});alGem(.8,hy-5.6,1.5,'#ff9a3a',1)}
function hmV(hy,c,t){const D=hmDec(c);if(!D)return false;const P=D.set?itSetPal(D.set):ITP[D.T];
  if(D.set)hmSet(hy,D.set,t,P);else[hm0,hm1,hm2,hm3,hm4,hm5,hm6][D.T](hy,D.s,t,P);HM.n++;return true}
{const old=drawHelmCode;drawHelmCode=function(hy,c,t){if(HM.on){g.save();try{if(hmV(hy,c,t)){g.restore();return}}catch(e){HM.err=String(e&&e.stack||e).slice(0,300)}g.restore()}return old.apply(this,arguments)};drawHelmCode.old=old;HM.old=old}
/* ไอคอนหมวกในกระเป๋า (ผ่านท่อ itEquipURL ของ v518: ออร่า · ลายชุดเซ็ต · ขอบเรืองตีบวก) */
function itHelmIco(x,T,P,fam,setId){const s=(+String(fam).slice(1)||0)%3,code=setId?[0,6,7,8,214,114,314][setId]:T===5?6+(s+1)*20:T===6?9+s*20:T+1+s*20;
  const g0=g;g=x;x.save();try{x.translate(30.8,49);x.scale(2.85,2.85);x.beginPath();x.ellipse(.8,0,7.6,7.4,0,0,7);x.fillStyle=chSh('#e9c3a0',-7.4,7.4);x.fill();x.lineWidth=1;x.strokeStyle=O0;x.stroke();
    x.fillStyle=O0;for(const ex of[2.5,6.5]){x.beginPath();x.ellipse(ex,.3,.75,1.25,0,0,7);x.fill()}x.fillStyle='rgba(240,120,110,.35)';x.beginPath();x.ellipse(1.1,3,1.3,.6,0,0,7);x.fill();
    drawHelmCode(0,code,1.2)}finally{x.restore();g=g0}}
/* helmIcon เดิม (การ์ดเลือกตัวละคร ฯลฯ) → ภาพใหม่ */
{const old=helmIcon;helmIcon=function(it){if(HM.on&&ITI.on&&it)try{const u=itIcoURL(it,'h');if(u)return u}catch(e){HM.err=String(e&&e.stack||e).slice(0,300)}return old.apply(this,arguments)};helmIcon.old=old}
