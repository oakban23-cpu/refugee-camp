/* ---------- v596 พื้น/ผนังถ้ำนครรากลึกให้เข้ากับชุดภาพ HD (RTA) ----------
   วาดเพิ่มในแผ่นพื้นที่แคชไว้ (ครั้งเดียวต่อแผ่น · ไม่เพิ่มงานต่อเฟรม)
   · พื้นถ้ำโทนอุ่นขึ้น · ทางเดินในนคร: สะพานไม้กระดานเส้นขอบเข้ม · นอกนคร: ทางดินอัดขอบกรวด
   · ลานห้องโถงราก: วงไม้รากมีเส้นแบ่ง + ฝังอำพัน · ขอบถ้ำ: ก้อนหินขอบเข้มมีมอส
   · ใต้ของ: บ้าน = พรมมอส/รากแผ่/เห็ดเล็กเรือง · แผง = เสื่อสาน · เห็ดยักษ์ = วงสปอร์เรือง · บ่อน้ำ = ลานหินปูรอบบ่อ · หินงอก = เศษหิน
   ปิด: RTG.off=1 แล้ว PALC.m.clear() */
const RTG={off:0};
function rtgOn(){try{return !RTG.off&&curMap===44&&!RTA.off&&HDI.on&&!lqHD()}catch(e){return false}}
function rtgPeb(c,x,y,s,r,dark){const col=dark?['#4e3e2e','#5c4a36','#463626'][(r()*3)|0]:['#8a7660','#7a6650','#968268','#6e5c48'][(r()*4)|0];c.fillStyle='rgba(10,6,2,.45)';c.beginPath();c.ellipse(x+.8,y+1.4,s*1.2,s*.7,0,0,7);c.fill();
  c.fillStyle=col;c.beginPath();c.ellipse(x,y,s*1.2,s*.7,0,0,7);c.fill();c.strokeStyle='#1e140a';c.lineWidth=.9;c.stroke();c.fillStyle='rgba(255,230,190,.16)';c.beginPath();c.ellipse(x-s*.3,y-s*.25,s*.55,s*.25,0,0,7);c.fill()}
function rtgShroom(c,x,y,s,col){for(let k=0;k<3;k++){const dx=(k-1)*6*s,h=(6+k%2*4)*s;c.fillStyle='#e8e0d0';c.fillRect(x+dx-1,y-h,2,h);c.fillStyle='rgba('+col+',.95)';c.beginPath();c.ellipse(x+dx,y-h,4.4*s,2.4*s,0,Math.PI,0);c.fill();c.strokeStyle='rgba(20,14,8,.7)';c.lineWidth=.7;c.stroke()}
  const gr=c.createRadialGradient(x,y-6*s,0,x,y-6*s,16*s);gr.addColorStop(0,'rgba('+col+',.28)');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.fillRect(x-16*s,y-22*s,32*s,32*s)}
function rtgRoot(c,x0,y0,x1,y1,w,r){const mx=(x0+x1)/2+(r()-.5)*24,my=(y0+y1)/2+(r()-.5)*14;c.lineCap='round';for(const[lw,col]of[[w+2.4,'#1e140a'],[w,'#6e4c30'],[w*.35,'rgba(220,170,110,.45)']]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(mx,my-(lw===w*.35?w*.2:0),x1,y1);c.stroke()}}
function rtgMoss(c,x,y,rx,ry,r){for(let i=0;i<7;i++){const px=x+(r()-.5)*rx*1.6,py=y+(r()-.5)*ry*1.4,s=rx*(.18+r()*.2);c.fillStyle=i%2?'rgba(86,130,52,.8)':'rgba(70,110,42,.8)';c.beginPath();c.ellipse(px,py,s,s*.5,0,0,7);c.fill()}
  c.fillStyle='rgba(200,240,140,.7)';for(let i=0;i<5;i++)c.fillRect(x+(r()-.5)*rx*1.4,y+(r()-.5)*ry,1.6,1.6)}
function rtgPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x,y,m)=>x+m>ox&&x-m<X1&&y+m>oy&&y-m<Y1,T={};for(const t of trees){if(!t.k||t.inv)continue;(T[t.k]=T[t.k]||[]).push(t)}
  const N=260,P=[];for(let i=0;i<N;i++){const a=i/N*6.2832;P.push(pbEP(a,(palH(i,7,4711)-.5)*18))}
  const path=()=>{c.beginPath();P.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.moveTo(PBAL.x+PBAL.rx,PBAL.y);c.ellipse(PBAL.x,PBAL.y,PBAL.rx,PBAL.ry,0,0,6.2832)};
  c.save();path();c.clip('nonzero');
  /* พื้นโทนอุ่น */c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(190,130,70,.55)';c.fillRect(ox,oy,S,S);c.restore();
  /* ทางเดิน */for(const L of PBPATH){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[x,y]of L){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y)}if(!inB((x0+x1)/2,(y0+y1)/2,Math.max(x1-x0,y1-y0)/2+60))continue;
    for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]),ux=(b[0]-a[0])/dl,uy=(b[1]-a[1])/dl,nx=-uy,ny=ux,ang=Math.atan2(ny,nx),r=gxRng(((a[0]*7+a[1]*13)|0)+i);
      for(let d=6;d<dl;d+=13){const px=a[0]+ux*d,py=a[1]+uy*d;if(!inB(px,py,30))continue;
        if(pbSafe(px,py)){c.save();c.translate(px,py);c.rotate(ang);const j=(r()-.5)*3,ln=30+r()*4;c.fillStyle='rgba(10,6,2,.5)';c.fillRect(-ln/2+1,-4.2,ln,10);c.fillStyle=r()<.5?'#7a5634':'#6c4a2c';c.fillRect(-ln/2+j,-5.2,ln,10);c.strokeStyle='#1e140a';c.lineWidth=1;c.strokeRect(-ln/2+j,-5.2,ln,10);
          c.fillStyle='rgba(240,200,140,.18)';c.fillRect(-ln/2+j+1,-4.4,ln-2,2.4);c.fillStyle='#2a1a0e';c.fillRect(-ln/2+j+3,-1,1.6,1.6);c.fillRect(ln/2+j-4.6,-1,1.6,1.6);c.restore()}
        else if(r()<.55){for(const sd of[-1,1])rtgPeb(c,px+nx*sd*(17+r()*4),py+ny*sd*(17+r()*4),1.8+r()*2.2,r,1)}}}}
  /* ลานห้องโถงราก */if(inB(PBHALL.x,PBHALL.y,260)){c.save();c.translate(PBHALL.x,PBHALL.y);c.scale(1,.62);c.strokeStyle='#1e140a';c.lineWidth=2.6;for(const rr of[70,140,222]){c.beginPath();c.arc(0,0,rr,0,7);c.stroke()}
    c.lineWidth=1.4;c.strokeStyle='rgba(20,12,6,.7)';for(let k=0;k<24;k++){const a=k/24*6.2832;c.beginPath();c.moveTo(Math.cos(a)*(k%2?140:70),Math.sin(a)*(k%2?140:70));c.lineTo(Math.cos(a)*222,Math.sin(a)*222);c.stroke()}
    c.strokeStyle='rgba(240,200,140,.22)';c.lineWidth=1.2;for(const rr of[73,143,225]){c.beginPath();c.arc(0,0,rr,3.5,5.9);c.stroke()}
    for(let k=0;k<12;k++){const a=k/12*6.2832+.13;const x=Math.cos(a)*181,y=Math.sin(a)*181;const gr=c.createRadialGradient(x,y,0,x,y,14);gr.addColorStop(0,'rgba(255,200,90,.6)');gr.addColorStop(1,'rgba(255,200,90,0)');c.fillStyle=gr;c.fillRect(x-14,y-14,28,28);c.fillStyle='#f0b040';c.beginPath();c.moveTo(x,y-5);c.lineTo(x+3.4,y);c.lineTo(x,y+5);c.lineTo(x-3.4,y);c.closePath();c.fill();c.strokeStyle='#3a2208';c.lineWidth=1;c.stroke()}c.restore()}
  /* บ้านราก: พรมมอส + รากแผ่ + เห็ดเล็ก */for(const t of T.pbhut||[]){if(!inB(t.x,t.y,140))continue;const r=gxRng((t.x*7+t.y*3)|0),w=RTA.m.pbhut[(t.v|0)%3][1];
    for(let i=0;i<7;i++){const a=Math.PI*(.05+r()*.9),L=w*(.45+r()*.3);rtgRoot(c,t.x+Math.cos(a)*w*.3,t.y+2,t.x+Math.cos(a)*L,t.y+6+Math.sin(a)*L*.25,2.4+r()*2.4,r)}
    rtgMoss(c,t.x-w*.4,t.y+12,26,9,r);rtgMoss(c,t.x+w*.38,t.y+10,22,8,r);if(r()<.8)rtgShroom(c,t.x+(r()<.5?-1:1)*w*.46,t.y+14,.9,['120,255,220','190,140,255','255,190,110'][(r()*3)|0])}
  /* แผงตลาด: เสื่อสาน */for(const t of T.pbstall||[]){if(!inB(t.x,t.y,80))continue;c.save();c.translate(t.x,t.y+16);c.fillStyle='rgba(10,6,2,.4)';c.beginPath();c.roundRect(-39,-9,80,20,4);c.fill();c.fillStyle='#8a6a40';c.beginPath();c.roundRect(-40,-10,80,19,4);c.fill();
    c.strokeStyle='rgba(50,30,14,.6)';c.lineWidth=1;for(let k=-36;k<38;k+=6){c.beginPath();c.moveTo(k,-9);c.lineTo(k+3,8);c.stroke()}c.strokeStyle=(t.v|0)?'#9a3a22':'#c8b080';c.lineWidth=2;c.beginPath();c.roundRect(-37,-7,74,13,3);c.stroke();c.strokeStyle='#1e140a';c.lineWidth=1;c.beginPath();c.roundRect(-40,-10,80,19,4);c.stroke();c.restore()}
  /* เห็ดยักษ์: วงสปอร์เรือง + เห็ดเล็ก */for(const t of T.pbmush||[]){if(!inB(t.x,t.y,90))continue;const r=gxRng((t.x*5+t.y*11)|0),s=t.sc||1,col=['120,255,220','190,140,255','255,190,110'][(t.v|0)%3];
    const gr=c.createRadialGradient(t.x,t.y+6,4,t.x,t.y+6,60*s);gr.addColorStop(0,'rgba('+col+',.16)');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.beginPath();c.ellipse(t.x,t.y+6,60*s,24*s,0,0,7);c.fill();
    for(let i=0;i<10;i++){const a=r()*6.283,d=(30+r()*30)*s;c.fillStyle='rgba('+col+',.85)';c.beginPath();c.arc(t.x+Math.cos(a)*d,t.y+6+Math.sin(a)*d*.4,1.1,0,7);c.fill()}
    if(r()<.6)rtgShroom(c,t.x+(r()<.5?-1:1)*40*s,t.y+10,.8,col)}
  /* หินงอก: เศษหิน */for(const t of T.pbstag||[]){if(!inB(t.x,t.y,60))continue;const r=gxRng((t.x*3+t.y*5)|0),s=t.sc||1;for(let i=0;i<6;i++){const a=r()*6.283,d=(20+r()*18)*s;rtgPeb(c,t.x+Math.cos(a)*d,t.y+6+Math.sin(a)*d*.4,1.6+r()*2.4,r)}}
  /* บ่อน้ำ: ลานหินปูรอบบ่อ */if(inB(PBW.x,PBW.y,180)){const r=gxRng(9601),cx=PBW.x,cy=PBW.y+PBW.r*.5,seg=26;
    for(const[r0,r1]of[[96,116],[116,134]])for(let q=0;q<seg;q++){const a0=q/seg*6.283,a1=(q+1)/seg*6.283-.04;c.beginPath();c.ellipse(cx,cy,r1,r1*.42,0,a0,a1);c.ellipse(cx,cy,r0,r0*.42,0,a1,a0,true);c.closePath();c.fillStyle=['#8a8478','#7a7468','#969082','#6e685c'][(r()*4)|0];c.fill();c.strokeStyle='#1e140a';c.lineWidth=.9;c.stroke()}
    rtgMoss(c,cx-110,cy+10,30,9,r);rtgMoss(c,cx+104,cy-4,26,8,r)}
  c.restore();
  /* ขอบถ้ำ: ก้อนหินขอบเข้ม + มอส */{const r=gxRng(9602);for(let i=0;i<260;i++){const a=r()*6.2832,d=-6+r()*30,[x,y]=pbEP(a,d),s=5+r()*13;if(!inB(x,y,s+4))continue;rtgPeb(c,x,y,s,r,r()<.55);if(r()<.18){c.fillStyle='rgba(86,130,52,.85)';c.beginPath();c.ellipse(x-s*.2,y-s*.45,s*.7,s*.28,0,0,7);c.fill()}}}}
setTimeout(()=>{try{const _p=pbPaint;window.pbPaint=pbPaint=function(c,ox,oy,S){const r=_p.apply(this,arguments);if(rtgOn())try{rtgPaint(c,ox,oy,S)}catch(e){console.warn('rtg',e)}return r}}catch(e){console.warn('rtg',e)}},1800);
