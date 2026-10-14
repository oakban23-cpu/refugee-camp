/* ---------- v381 เต็นท์ส่วนตัวโฉมใหม่ ----------
   วาดภายในเต็นท์ใหม่ทั้งหมด: ผ้าใบมีรอยจีบ + ระบายขอบหยัก + พู่ · พื้นไม้รายแผ่นมีลายไม้ · เงามุมห้อง · แสงอุ่นจากโคม/เตาผิง · ฝุ่นลอยในแสง
   เฟอร์นิเจอร์วาดใหม่แบบมีมิติ (เตียงหัวเตียง/ผ้าห่ม/เสามุ้ง · พรมลาย+พู่ · โต๊ะมีความหนา · กระถาง · แท่นหิน · แท่นวางสมุดเยี่ยม)
   ของแต่งหมวดใหม่ (สวยอย่างเดียว ไม่เพิ่มความสบาย = ไม่กระทบสมดุลบัฟ):
     thm ผ้าใบเต็นท์ (ลายทางแดง · ผ้าไหมราตรี · ผ้าทองราชวัง) · cei ไฟเพดาน (สายระย้า · โคมคริสตัล) · fir เตา (เตาถ่าน · เตาผิงหิน)
   ช่องที่ยังว่างในเต็นท์ตัวเองแสดงกรอบจาง ๆ บอกว่าวางอะไรได้ตรงไหน
   พื้นหลัง (ผนัง/พื้น/เสา) วาดลงแคนวาสแคชตามธีม → แต่ละเฟรมแค่แปะรูป */
/* TSLOT/TDECO ประกาศหลังโมดูลนี้ → เติมหลังสคริปต์โหลดเสร็จ (กัน TDZ) */
function tvInit(){if(TSLOT.thm)return;Object.assign(TSLOT,{thm:'ผ้าใบเต็นท์',cei:'ไฟเพดาน',fir:'เตาผิง'});
Object.assign(TDECO,{thm1:['thm','🎪','ผ้าใบลายทางแดง',20000,0],thm2:['thm','🌌','ผ้าไหมราตรี',120000,0],thm3:['thm','🏵️','ผ้าทองราชวัง',450000,0],
  cei1:['cei','💡','ไฟสายระย้า',15000,0],cei2:['cei','🕯️','โคมระย้าคริสตัล',200000,0],
  fir1:['fir','🔥','เตาถ่านเหล็ก',12000,0],fir2:['fir','🧱','เตาผิงหิน',160000,0]})}
setTimeout(tvInit,0);
const TVTH={
  '':{r:['#4a3420','#9a7a50','#c8a470'],fold:'90,60,30',tr:'#8c2a1e',tr2:'#d8a040',sd:['#5a3e24','#7a5a38'],fl:[92,62,36]},
  thm1:{r:['#5a3a2a','#e8d8b8','#f4e6c8'],st:'#b8382a',fold:'120,40,30',tr:'#b8382a',tr2:'#ffd27a',sd:['#7a2a20','#a83a2a'],fl:[96,64,38]},
  thm2:{r:['#0e1430','#22306a','#34488e'],star:1,fold:'10,14,40',tr:'#1a2250',tr2:'#e8c060',sd:['#141c44','#22306a'],fl:[70,52,40]},
  thm3:{r:['#3a0810','#7a1424','#9a2030'],dam:1,fold:'40,4,10',tr:'#5a0a18',tr2:'#ffd76a',sd:['#4a0a16','#6a1222'],fl:[84,48,28],inlay:1}};
const TVC={k:'',c:null};
function tvRng(s){let x=s|0||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return((x>>>0)%100000)/100000}}
function tvBG(th){if(TVC.k===th&&TVC.c)return TVC;const P0=TVTH[th]||TVTH[''],K=2,ox=TRX0-110,oy=CY-400,w=(TRX1-TRX0)+220,h=(TRY1+70)-oy;
  const cv=document.createElement('canvas');cv.width=w*K;cv.height=h*K;const c=cv.getContext('2d');c.scale(K,K);c.translate(-ox,-oy);const R=tvRng(77),O='#1a100a';
  const P=(pts,f,st,lw)=>{c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.closePath();if(f){c.fillStyle=f;c.fill()}if(st){c.lineWidth=lw||1;c.strokeStyle=st;c.stroke()}};
  c.fillStyle='#0a0705';c.fillRect(ox,oy,w,h);
  /* ผนังหลัง (ผ้าใบทรงคางหมู) */
  const BW=[TRX0-60,TRY0,TRX0+40,CY-380,TRX1-40,CY-380,TRX1+60,TRY0];
  {const gr=c.createLinearGradient(0,CY-380,0,TRY0);gr.addColorStop(0,P0.r[0]);gr.addColorStop(.32,P0.r[1]);gr.addColorStop(1,P0.r[2]);P(BW,gr)}
  c.save();P(BW);c.clip();
  const L=(k,y)=>{const a=TRX0+40+(TRX1-TRX0-80)*k,b=TRX0-60+(TRX1-TRX0+120)*k;return a+(b-a)*((y-(CY-380))/(TRY0-(CY-380)))};
  if(P0.st){for(let i=0;i<14;i+=2){const k0=i/14,k1=(i+1)/14;P([L(k0,CY-380),CY-380,L(k1,CY-380),CY-380,L(k1,TRY0),TRY0,L(k0,TRY0),TRY0],P0.st)}}
  if(P0.dam){c.strokeStyle='rgba(255,215,110,.28)';c.lineWidth=1;for(let y=CY-380;y<TRY0+20;y+=26)for(let x=TRX0-80;x<TRX1+80;x+=26){const xx=x+((y/26|0)%2?13:0);c.beginPath();c.moveTo(xx,y-8);c.lineTo(xx+8,y);c.lineTo(xx,y+8);c.lineTo(xx-8,y);c.closePath();c.stroke();c.fillStyle='rgba(255,215,110,.35)';c.beginPath();c.arc(xx,y,1.6,0,7);c.fill()}}
  if(P0.star){for(let i=0;i<70;i++){const x=TRX0-40+R()*(TRX1-TRX0+80),y=CY-372+R()*170,s=.8+R()*1.8;c.fillStyle='rgba(255,226,140,'+(.45+R()*.5)+')';c.beginPath();c.moveTo(x,y-s*2);c.lineTo(x+s*.5,y-s*.5);c.lineTo(x+s*2,y);c.lineTo(x+s*.5,y+s*.5);c.lineTo(x,y+s*2);c.lineTo(x-s*.5,y+s*.5);c.lineTo(x-s*2,y);c.lineTo(x-s*.5,y-s*.5);c.closePath();c.fill()}
    c.fillStyle='rgba(255,236,190,.85)';c.beginPath();c.arc(TRX1-70,CY-330,11,0,7);c.fill();c.fillStyle=P0.r[1];c.beginPath();c.arc(TRX1-64,CY-334,10,0,7);c.fill()}
  /* รอยจีบผ้า: แถบสว่าง/มืดสลับตามแนวเปอร์สเปกทีฟ */
  for(let i=0;i<28;i++){const k0=i/28,k1=(i+1)/28,dark=i%2;c.fillStyle='rgba('+(dark?P0.fold+',.22':'255,240,210,.07')+')';P([L(k0,CY-380),CY-380,L(k1,CY-380),CY-380,L(k1,TRY0),TRY0,L(k0,TRY0),TRY0],c.fillStyle)}
  /* ผ้าห้อยตรงกลางเป็นแอ่ง (เงาโค้ง) */
  {const gr=c.createLinearGradient(0,CY-380,0,TRY0);gr.addColorStop(0,'rgba(0,0,0,.35)');gr.addColorStop(.25,'rgba(0,0,0,0)');gr.addColorStop(.85,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.3)');c.fillStyle=gr;c.fillRect(TRX0-80,CY-380,TRX1-TRX0+160,TRY0-CY+380)}
  c.restore();P(BW,null,O,1.4);
  /* แถบคาดผนัง + ขอบระบายหยัก + พู่ */
  P([TRX0-26,CY-336,TRX1+26,CY-336,TRX1+30,CY-326,TRX0-30,CY-326],P0.tr,O,.8);c.strokeStyle=P0.tr2;c.lineWidth=1;c.setLineDash([4,3]);c.beginPath();c.moveTo(TRX0-24,CY-331);c.lineTo(TRX1+24,CY-331);c.stroke();c.setLineDash([]);
  for(let x=TRX0+48;x<TRX1-40;x+=22){c.fillStyle=P0.tr;c.beginPath();c.arc(x+11,CY-378,11,0,Math.PI);c.fill();c.strokeStyle=O;c.lineWidth=.8;c.stroke();c.fillStyle=P0.tr2;c.beginPath();c.arc(x+11,CY-378,4,0,Math.PI);c.fill();
    c.strokeStyle=P0.tr2;c.lineWidth=1;c.beginPath();c.moveTo(x+22,CY-378);c.lineTo(x+22,CY-366);c.stroke();c.fillStyle=P0.tr2;c.beginPath();c.ellipse(x+22,CY-363,2.2,3.6,0,0,7);c.fill()}
  /* บัวผนังไม้ตรงรอยต่อพื้น */
  P([TRX0-60,TRY0-2,TRX1+60,TRY0-2,TRX1+60,TRY0+9,TRX0-60,TRY0+9],'#3a2412',O,.8);c.fillStyle='rgba(255,220,160,.18)';c.fillRect(TRX0-60,TRY0-2,TRX1-TRX0+120,2);
  /* ผนังข้าง */
  [[TRX0-60,TRY0,TRX0,TRY0,TRX0,TRY1+20,TRX0-90,TRY1+20],[TRX1+60,TRY0,TRX1,TRY0,TRX1,TRY1+20,TRX1+90,TRY1+20]].forEach((Q,si)=>{const gr=c.createLinearGradient(Q[0],0,Q[2],0);gr.addColorStop(0,P0.sd[0]);gr.addColorStop(1,P0.sd[1]);P(Q,gr,O,1);
    c.save();P(Q);c.clip();for(let i=0;i<9;i++){const k=i/9;c.strokeStyle='rgba(0,0,0,'+(i%2?.18:.06)+')';c.lineWidth=5;const xa=Q[0]+(Q[2]-Q[0])*k,xb=Q[6]+(Q[4]-Q[6])*k;c.beginPath();c.moveTo(xa,TRY0);c.lineTo(xb,TRY1+20);c.stroke()}
    if(P0.st){for(let i=0;i<9;i+=2){const k=i/9,k1=(i+1)/9;P([Q[0]+(Q[2]-Q[0])*k,TRY0,Q[0]+(Q[2]-Q[0])*k1,TRY0,Q[6]+(Q[4]-Q[6])*k1,TRY1+20,Q[6]+(Q[4]-Q[6])*k,TRY1+20],'rgba(184,56,42,.75)')}}c.restore()});
  /* พื้นไม้รายแผ่น */
  {const F=P0.fl,rowH=22;c.save();c.beginPath();c.rect(TRX0,TRY0+9,TRX1-TRX0,TRY1-TRY0-9);c.clip();
    for(let y=TRY0+9,row=0;y<TRY1;y+=rowH,row++){let x=TRX0-R()*60;while(x<TRX1){const len=70+R()*70,v=(R()-.5)*26,d=row*1.2;c.fillStyle='rgb('+(F[0]+v+d|0)+','+(F[1]+v*.7+d*.8|0)+','+(F[2]+v*.5+d*.5|0)+')';c.fillRect(x,y,len,rowH);
      c.strokeStyle='rgba(30,16,6,.22)';c.lineWidth=.7;for(let k=0;k<3;k++){const gy=y+4+k*6+R()*3;c.beginPath();c.moveTo(x+2,gy);c.bezierCurveTo(x+len*.3,gy+(R()-.5)*4,x+len*.6,gy+(R()-.5)*4,x+len-2,gy+(R()-.5)*2);c.stroke()}
      if(R()<.25){c.fillStyle='rgba(30,16,6,.35)';c.beginPath();c.ellipse(x+len*(.2+R()*.6),y+rowH*.5,3,1.8,0,0,7);c.fill()}
      c.fillStyle='rgba(255,230,180,.12)';c.fillRect(x,y,len,1.2);c.fillStyle='rgba(20,10,4,.55)';c.fillRect(x+len-1,y,1.2,rowH);c.fillStyle='#2a1a0c';c.beginPath();c.arc(x+5,y+rowH/2,1,0,7);c.arc(x+len-6,y+rowH/2,1,0,7);c.fill();x+=len}
      c.fillStyle='rgba(20,10,4,.6)';c.fillRect(TRX0,y+rowH-1,TRX1-TRX0,1.2)}
    if(P0.inlay){c.strokeStyle='rgba(255,215,110,.55)';c.lineWidth=2;c.strokeRect(TRX0+14,TRY0+22,TRX1-TRX0-28,TRY1-TRY0-34);c.lineWidth=.8;c.strokeRect(TRX0+20,TRY0+28,TRX1-TRX0-40,TRY1-TRY0-46)}
    /* เงามุมห้อง (ambient occlusion) */
    let gr=c.createLinearGradient(0,TRY0,0,TRY0+70);gr.addColorStop(0,'rgba(0,0,0,.55)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(TRX0,TRY0,TRX1-TRX0,70);
    gr=c.createLinearGradient(TRX0,0,TRX0+60,0);gr.addColorStop(0,'rgba(0,0,0,.5)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(TRX0,TRY0,60,TRY1-TRY0);
    gr=c.createLinearGradient(TRX1,0,TRX1-60,0);gr.addColorStop(0,'rgba(0,0,0,.5)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(TRX1-60,TRY0,60,TRY1-TRY0);
    gr=c.createLinearGradient(0,TRY1,0,TRY1-50);gr.addColorStop(0,'rgba(0,0,0,.4)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(TRX0,TRY1-50,TRX1-TRX0,50);c.restore()}
  /* เสาเต็นท์: ไม้ + เชือกพัน + หมวกทองเหลือง */
  [TRX0+4,TRX1-4,CX].forEach(px=>{const y0=CY-376,y1=TRY0+6;const gr=c.createLinearGradient(px-5,0,px+5,0);gr.addColorStop(0,'#2e1a0c');gr.addColorStop(.45,'#6a4426');gr.addColorStop(1,'#2a160a');c.fillStyle=gr;c.fillRect(px-5,y0,10,y1-y0);c.strokeStyle=O;c.lineWidth=1;c.strokeRect(px-5,y0,10,y1-y0);
    for(const ry of [y0+40,y1-34]){c.strokeStyle='#c8a870';c.lineWidth=1.4;for(let k=0;k<5;k++){c.beginPath();c.moveTo(px-5,ry+k*3);c.lineTo(px+5,ry+k*3+2);c.stroke()}}
    c.fillStyle='#c89a40';c.beginPath();c.ellipse(px,y0,7,3,0,0,7);c.fill();c.strokeStyle=O;c.lineWidth=.7;c.stroke();c.fillStyle='#3a2412';c.fillRect(px-7,y1-4,14,6)});
  /* ประตูทางออก + ผ้าแหวกด้านหน้า */
  P([CX-44,TRY1,CX+44,TRY1,CX+56,TRY1+30,CX-56,TRY1+30],'#140a04');
  [[TRX0-90,TRY1+20,CX-44,TRY1,CX-56,TRY1+60,TRX0-90,TRY1+60],[TRX1+90,TRY1+20,CX+44,TRY1,CX+56,TRY1+60,TRX1+90,TRY1+60]].forEach(Q=>{const gr=c.createLinearGradient(0,TRY1,0,TRY1+60);gr.addColorStop(0,P0.sd[1]);gr.addColorStop(1,P0.sd[0]);P(Q,gr,O,1);
    c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=3;for(let i=1;i<6;i++){const k=i/6;c.beginPath();c.moveTo(Q[0]+(Q[2]-Q[0])*k,Q[1]+(Q[3]-Q[1])*k);c.lineTo(Q[6]+(Q[4]-Q[6])*k,TRY1+60);c.stroke()}});
  [CX-50,CX+50].forEach((x,i)=>{c.strokeStyle='#c8a870';c.lineWidth=2.4;c.beginPath();c.moveTo(x-(i?-8:8),TRY1+6);c.quadraticCurveTo(x,TRY1+22,x+(i?6:-6),TRY1+34);c.stroke();c.fillStyle=P0.tr2;c.beginPath();c.arc(x+(i?6:-6),TRY1+36,3,0,7);c.fill()});
  TVC.k=th;TVC.c=cv;TVC.ox=ox;TVC.oy=oy;TVC.w=w;TVC.h=h;return TVC}
/* ---------- แต่ละชิ้น ---------- */
function tvP(pts,f,st,lw){g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.closePath();if(f){g.fillStyle=f;g.fill()}if(st){g.lineWidth=lw||1;g.strokeStyle=st;g.stroke()}}
function tvGlow(x,y,r,c,a){g.globalCompositeOperation='lighter';glowAt(x,y,r,c,a);g.globalCompositeOperation='source-over'}
function tvGhost(x,y,w,h,ic,lb){const t=performance.now()/1000;g.save();g.globalAlpha=.32+.1*Math.sin(t*2.4);g.setLineDash([5,4]);g.strokeStyle='#ffe6b0';g.lineWidth=1.2;g.beginPath();g.roundRect(x-w/2,y-h/2,w,h,8);g.stroke();g.setLineDash([]);
  g.font='14px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(ic,x,y-3);g.font='bold 7px system-ui';g.fillStyle='#ffe6b0';g.fillText(lb,x,y+h/2-7);g.textBaseline='alphabetic';g.restore()}
function tvBed(b,x,y,t,O){gxShadow(x,y+20,62,12,.5);
  if(!b){g.fillStyle='#8a7a52';g.beginPath();g.ellipse(x,y+2,50,18,0,0,7);g.fill();g.strokeStyle='rgba(60,40,20,.5)';g.lineWidth=1;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(x+i*13,y-14);g.lineTo(x+i*13,y+18);g.stroke()}
    tvP([x-40,y-8,x-14,y-8,x-14,y+6,x-40,y+6],'#c8b890',O,.8);g.fillStyle='#a04a30';g.beginPath();g.ellipse(x+22,y+2,20,8,0,0,7);g.fill();g.strokeStyle=O;g.stroke();return}
  const T3=b==='bed3',T2=b==='bed2',fr=T3?'#b8862a':T2?'#7a4a2a':'#9a7a48',frD=T3?'#7a5410':T2?'#4a2a14':'#6a5028',sh=T3?['#9a1830','#6a0c20']:T2?['#3a6aa8','#24487a']:['#c8b078','#9a8450'];
  if(T3){[[x-54,y-22],[x+52,y-22]].forEach(([px,py])=>{g.fillStyle=frD;g.fillRect(px-2,py-62,4,62)})}
  /* ขาเตียง + ด้านข้าง */g.fillStyle=frD;[x-50,x+46].forEach(lx=>g.fillRect(lx,y+14,5,8));tvP([x-52,y+4,x+52,y+4,x+52,y+16,x-52,y+16],fr,O,1);
  /* ฟูก */tvP([x-48,y-18,x+48,y-18,x+48,y+6,x-48,y+6],'#f2ece0',O,.7);g.fillStyle='rgba(0,0,0,.12)';g.fillRect(x-48,y+2,96,4);
  /* หมอน */[[x-36,y-8],[x-36,y+0]].slice(0,T2||T3?2:1).forEach(([px,py],i)=>{g.fillStyle=i?'#e8e0d0':'#ffffff';g.beginPath();g.ellipse(px,py-2,11,6,0,0,7);g.fill();g.strokeStyle='rgba(60,40,20,.45)';g.lineWidth=.6;g.stroke()});
  /* ผ้าห่ม */{const gr=g.createLinearGradient(0,y-18,0,y+8);gr.addColorStop(0,sh[0]);gr.addColorStop(1,sh[1]);tvP([x-20,y-19,x+49,y-19,x+50,y+8,x-22,y+8],gr,O,.8);
    g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=1.2;for(let i=0;i<4;i++){g.beginPath();g.moveTo(x-12+i*16,y-17);g.quadraticCurveTo(x-6+i*16,y-5,x-12+i*16,y+7);g.stroke()}
    if(T2){g.strokeStyle='rgba(255,255,255,.35)';g.setLineDash([2,2]);g.strokeRect(x-14,y-15,26,18);g.strokeRect(x+14,y-15,30,18);g.setLineDash([])}
    if(T3){g.strokeStyle='#ffd76a';g.lineWidth=1.6;g.beginPath();g.moveTo(x-20,y-12);g.lineTo(x+49,y-12);g.moveTo(x-21,y+3);g.lineTo(x+50,y+3);g.stroke();g.fillStyle='#ffd76a';g.font='9px system-ui';g.textAlign='center';g.fillText('⚜',x+15,y-1)}
    g.fillStyle=sh[0];tvP([x-22,y+8,x+50,y+8,x+50,y+13,x-22,y+13],sh[1])}
  /* หัวเตียง */{const hb=T3?'#c89a30':fr;tvP([x-58,y-36,x-46,y-36,x-46,y+16,x-58,y+16],hb,O,1.2);g.fillStyle=hb;g.beginPath();g.arc(x-52,y-36,6,Math.PI,0);g.fill();g.strokeStyle=O;g.stroke();
    if(T3){g.font='12px system-ui';g.textAlign='center';g.fillText('👑',x-52,y-44);tvGlow(x-52,y-46,16,'255,215,110',.35+.1*Math.sin(t*2))}}
  /* ท้ายเตียง */tvP([x+48,y-24,x+56,y-24,x+56,y+16,x+48,y+16],fr,O,1);
  if(T3){[[x-54,y-84],[x+52,y-84]].forEach(([px,py])=>{g.fillStyle='#ffd76a';g.beginPath();g.arc(px,py,3.2,0,7);g.fill()});const sw=Math.sin(t*1.2)*2;g.fillStyle='rgba(160,20,40,.55)';
    g.beginPath();g.moveTo(x-56,y-84);g.quadraticCurveTo(x,y-70+sw,x+54,y-84);g.lineTo(x+54,y-74);g.quadraticCurveTo(x,y-58+sw,x-56,y-74);g.closePath();g.fill();
    [[x-56,1],[x+54,-1]].forEach(([px,d])=>{g.beginPath();g.moveTo(px,y-82);g.quadraticCurveTo(px+d*10+sw,y-50,px+d*4,y-22);g.lineTo(px,y-22);g.closePath();g.fill()});tvGlow(x,y-10,70,'255,200,120',.12)}}
function tvRug(r,x,y,t){g.save();if(!r){g.fillStyle='rgba(150,118,70,.55)';g.beginPath();g.ellipse(x,y,96,40,0,0,7);g.fill();g.strokeStyle='rgba(90,60,30,.5)';g.lineWidth=1;for(let i=1;i<5;i++){g.beginPath();g.ellipse(x,y,96-i*16,40-i*6.7,0,0,7);g.stroke()}g.restore();return}
  const cc=r==='rug3'?['#7a1424','#ffd76a','#b8282a','#3a0810']:r==='rug2'?['#e8dcc8','#9a7a58','#cdb894','#7a5a40']:['#6a3a5a','#d8a040','#8a4a6a','#3a1a30'];
  g.strokeStyle=cc[1];g.lineWidth=1.2;for(let i=-6;i<=6;i++){const a=Math.PI+i*.05;[-1,1].forEach(s=>{const px=x+s*Math.cos(a)*-124,py=y+Math.sin(a)*8;g.beginPath();g.moveTo(px,py);g.lineTo(px+s*9,py+(i%2)*2);g.stroke()})}
  g.fillStyle=cc[0];g.beginPath();g.ellipse(x,y,122,56,0,0,7);g.fill();g.strokeStyle=cc[3];g.lineWidth=2;g.stroke();
  g.strokeStyle=cc[1];g.lineWidth=3;g.beginPath();g.ellipse(x,y,110,48,0,0,7);g.stroke();g.lineWidth=1;g.beginPath();g.ellipse(x,y,100,43,0,0,7);g.stroke();
  for(let i=0;i<16;i++){const a=i/16*6.283,px=x+Math.cos(a)*88,py=y+Math.sin(a)*37;g.fillStyle=i%2?cc[1]:cc[2];g.beginPath();g.moveTo(px,py-5);g.lineTo(px+6,py);g.lineTo(px,py+5);g.lineTo(px-6,py);g.closePath();g.fill()}
  g.fillStyle=cc[2];g.beginPath();g.ellipse(x,y,62,26,0,0,7);g.fill();g.strokeStyle=cc[1];g.lineWidth=1.6;g.stroke();
  g.fillStyle=cc[1];g.beginPath();g.moveTo(x,y-18);g.lineTo(x+30,y);g.lineTo(x,y+18);g.lineTo(x-30,y);g.closePath();g.fill();g.fillStyle=cc[0];g.beginPath();g.ellipse(x,y,12,6,0,0,7);g.fill();
  if(r==='rug3'){tvGlow(x,y,90,'255,210,100',.12+.05*Math.sin(t*2));for(let i=0;i<5;i++){const a=t*.7+i*1.26,px=x+Math.cos(a)*96,py=y+Math.sin(a)*40;g.fillStyle='rgba(255,236,160,'+(.5+.5*Math.sin(t*4+i))+')';g.beginPath();g.arc(px,py,1.4,0,7);g.fill()}}g.restore()}
function tvTable(b,x,y,t,O){gxShadow(x,y+18,40,8,.45);const top=b==='tab2'?'#4a3a5a':'#9a6434',edge=b==='tab2'?'#2e2238':'#6a3e1c';
  g.fillStyle=edge;[[x-30,y],[x+26,y]].forEach(([lx,ly])=>g.fillRect(lx,ly-2,5,20));
  tvP([x-38,y-18,x+38,y-18,x+36,y-6,x-36,y-6],top,O,1);tvP([x-36,y-6,x+36,y-6,x+36,y-1,x-36,y-1],edge,O,.6);g.fillStyle='rgba(255,240,210,.18)';g.fillRect(x-34,y-17,68,2);
  if(b==='tab2'){tvP([x-30,y-15,x-10,y-17,x-8,y-9,x-28,y-7],'#e8dcc0','#5a4a30',.6);g.strokeStyle='rgba(60,40,20,.6)';g.lineWidth=.5;for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-27,y-13+i*2);g.lineTo(x-12,y-14+i*2);g.stroke()}
    [[2,'#6aff9a'],[14,'#c87aff'],[26,'#ff8a5a']].forEach(([dx,c],k)=>{const fx=x+dx,fy=y-22;g.fillStyle='rgba(220,230,240,.35)';g.beginPath();g.arc(fx,fy,6,0,7);g.fill();g.fillStyle=c;g.beginPath();g.arc(fx,fy+1.5,4.6,0,Math.PI);g.fill();g.strokeStyle='rgba(30,20,40,.8)';g.lineWidth=.7;g.beginPath();g.arc(fx,fy,6,0,7);g.stroke();
      g.fillStyle='#d8e0e8';g.fillRect(fx-1.6,fy-12,3.2,6);tvGlow(fx,fy,14,h2r(c),.35+.15*Math.sin(t*3+k));const q=(t*1.3+k*.37)%1;g.fillStyle=c;g.globalAlpha=1-q;g.beginPath();g.arc(fx+Math.sin(q*9+k)*2,fy-14-q*14,1.4+q,0,7);g.fill();g.globalAlpha=1})}
  else{g.fillStyle='#f0e8d8';g.beginPath();g.ellipse(x-4,y-14,26,5,0,0,7);g.fill();g.fillStyle='#8a4a2a';g.beginPath();g.ellipse(x-8,y-22,8,7,0,0,7);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();g.fillRect(x-1,y-24,7,2);g.beginPath();g.ellipse(x-8,y-29,3,1.4,0,0,7);g.fill();
    [[x+12,y-15],[x+22,y-14]].forEach(([cx,cy])=>{g.fillStyle='#f4f0e8';g.beginPath();g.ellipse(cx,cy,4,2.6,0,0,7);g.fill();g.strokeStyle='rgba(60,40,20,.6)';g.stroke();g.fillStyle='#a8743a';g.beginPath();g.ellipse(cx,cy-.4,2.6,1.3,0,0,7);g.fill()});
    for(let i=0;i<3;i++){const q=(t*.45+i/3)%1;g.fillStyle='rgba(245,245,245,'+(.32*(1-q))+')';g.beginPath();g.arc(x-6+Math.sin(q*6+i)*3,y-32-q*20,2+q*4,0,7);g.fill()}}}
function tvPlant(p,x,y,t,O){gxShadow(x,y+14,18,5,.45);
  if(p==='pla3'){for(let i=0;i<5;i++){const hx=x-12+i*6,hh=12+((i*7)%3)*8,cap=['#4ae8c8','#7ad8ff','#c87aff'][i%3];g.fillStyle='#e8f0e0';g.fillRect(hx-1.4,y+4-hh,2.8,hh);tvGlow(hx,y+2-hh,16,h2r(cap),.45+.2*Math.sin(t*2+i));g.fillStyle=cap;g.beginPath();g.ellipse(hx,y+2-hh,6,3.6,0,Math.PI,7);g.fill();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.arc(hx-2,y-hh,1,0,7);g.fill()}
    for(let i=0;i<3;i++){const a=t*.8+i*2.1;g.fillStyle='rgba(140,255,230,'+(.4+.4*Math.sin(t*3+i))+')';g.beginPath();g.arc(x+Math.cos(a)*16,y-26+Math.sin(a*1.3)*8,1.3,0,7);g.fill()}
    g.fillStyle='#3a2a1a';g.beginPath();g.ellipse(x,y+6,16,5,0,0,7);g.fill();return}
  /* กระถางดินเผา */tvP([x-13,y-4,x+13,y-4,x+10,y+13,x-10,y+13],'#b0603a',O,1);tvP([x-15,y-8,x+15,y-8,x+15,y-3,x-15,y-3],'#c8784a',O,.8);g.fillStyle='rgba(255,230,200,.25)';g.fillRect(x-11,y-2,4,12);
  if(p==='pla2'){g.strokeStyle='#5a3a1e';g.lineWidth=3.4;g.lineCap='round';g.beginPath();g.moveTo(x,y-6);g.bezierCurveTo(x-10,y-16,x+8,y-22,x-2,y-32);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(x-3,y-20);g.lineTo(x+10,y-26);g.stroke();g.lineCap='butt';
    [[x-12,y-30,12],[x+11,y-28,10],[x-1,y-40,11],[x+3,y-33,8]].forEach(([a,b2,r],i)=>{g.fillStyle=['#2e6a32','#3a7a3a','#4a8a40','#357236'][i];g.beginPath();g.ellipse(a,b2,r,r*.6,0,0,7);g.fill();g.fillStyle='rgba(200,255,170,.2)';g.beginPath();g.ellipse(a-2,b2-2,r*.5,r*.3,0,0,7);g.fill()})}
  else{for(let i=0;i<9;i++){const a=-1.57+(i-4)*.3,sw=Math.sin(t*1.5+i)*.05,L=14+(i%3)*5;g.strokeStyle=i%2?'#4a9a3a':'#5ab048';g.lineWidth=2.4;g.beginPath();g.moveTo(x,y-6);g.quadraticCurveTo(x+Math.cos(a+sw)*L*.5,y-6+Math.sin(a)*L*.6,x+Math.cos(a+sw)*L,y-6+Math.sin(a)*L);g.stroke()}
    g.fillStyle='#e8f0a0';[[-6,-20],[5,-22],[0,-26]].forEach(([dx,dy])=>{g.beginPath();g.arc(x+dx,y+dy,1.6,0,7);g.fill()})}}
function tvLamp(L,x,y,t,i,O){gxShadow(x,y+3,12,3.5,.45);const fl=.55+.12*Math.sin(t*3+i*2)+.06*Math.sin(t*11+i);
  if(L==='lit3'){g.fillStyle='#4a5a6a';tvP([x-7,y,x+7,y,x+4,y-10,x-4,y-10],'#4a5a6a',O,.8);const fy=y-46+Math.sin(t*1.6+i)*3;tvGlow(x,fy,70,'140,220,255',fl);tvP([x,fy-14,x+8,fy,x,fy+14,x-8,fy],'#bfe8ff','#3a6a8a',1);g.fillStyle='rgba(255,255,255,.75)';tvP([x,fy-14,x+3,fy-2,x,fy+4,x-3,fy-2],'rgba(255,255,255,.65)');
    for(let k=0;k<3;k++){const a=t*1.6+k*2.1+i;g.fillStyle='rgba(190,240,255,.85)';g.beginPath();g.arc(x+Math.cos(a)*14,fy+Math.sin(a)*5,1.4,0,7);g.fill()}return}
  g.fillStyle='#3a2a1a';g.fillRect(x-1.6,y-52,3.2,52);g.fillRect(x-1.6,y-52,14,2.4);g.fillRect(x-6,y-3,12,3);
  if(L==='lit2'){[0,1].forEach(k=>{const lx=x+12,ly=y-40+k*17,sw=Math.sin(t*1.4+k+i)*1.5;g.strokeStyle='#3a2a1a';g.lineWidth=.8;g.beginPath();g.moveTo(lx,ly-12);g.lineTo(lx+sw,ly-6);g.stroke();tvGlow(lx+sw,ly,32,'255,110,90',fl*.8);
      g.fillStyle='#d8402a';g.beginPath();g.ellipse(lx+sw,ly,8,9,0,0,7);g.fill();g.strokeStyle='rgba(60,10,10,.6)';g.lineWidth=.6;for(let s=-1;s<=1;s++){g.beginPath();g.ellipse(lx+sw,ly,8*Math.abs(s)*.6+1,9,0,0,7);g.stroke()}g.fillStyle='#ffd84a';g.fillRect(lx+sw-4,ly-10,8,2);g.fillRect(lx+sw-3,ly+8,6,2)})}
  else{const lx=x+12,ly=y-38;g.strokeStyle='#3a2a1a';g.lineWidth=.8;g.beginPath();g.moveTo(lx,ly-12);g.lineTo(lx,ly-8);g.stroke();tvGlow(lx,ly,48,'255,200,110',fl);tvP([lx-6,ly-8,lx+6,ly-8,lx+7,ly+8,lx-7,ly+8],'rgba(255,230,160,.9)','#5a3a1a',1.2);
    g.fillStyle='#5a3a1a';g.fillRect(lx-7,ly-10,14,2.4);g.fillRect(lx-7,ly+7,14,2.4);g.fillStyle='#ff9a3a';g.beginPath();g.ellipse(lx,ly+2,2.2,3.6+Math.sin(t*9+i)*.6,0,0,7);g.fill()}}
function tvHearth(f,x,y,t,O){if(!f)return;gxShadow(x,y+14,40,8,.5);const fl=.6+.15*Math.sin(t*5)+.08*Math.sin(t*13);
  if(f==='fir2'){tvP([x-36,y-56,x+36,y-56,x+36,y+12,x-36,y+12],'#7a7470',O,1.2);for(let r=0;r<6;r++)for(let cI=0;cI<4;cI++){const bx=x-36+cI*18+(r%2?9:0),by=y-56+r*11.3;g.strokeStyle='rgba(30,26,24,.55)';g.lineWidth=.8;g.strokeRect(Math.max(x-36,bx),by,Math.min(18,x+36-bx),11.3)}
    tvP([x-40,y-62,x+40,y-62,x+40,y-55,x-40,y-55],'#5a3a1e',O,1);g.fillStyle='#120804';g.beginPath();g.moveTo(x-20,y+12);g.lineTo(x-20,y-24);g.quadraticCurveTo(x,y-40,x+20,y-24);g.lineTo(x+20,y+12);g.closePath();g.fill();
    tvP([x-12,y+6,x+12,y+6,x+10,y+10,x-10,y+10],'#4a2a14');[[0,1],[-7,.75],[7,.8]].forEach(([dx,s],k)=>{const hh=(16+Math.sin(t*9+k*2)*4)*s;g.fillStyle='rgba(255,'+(140+k*30)+',40,.95)';g.beginPath();g.moveTo(x+dx-6*s,y+6);g.quadraticCurveTo(x+dx-4*s,y+6-hh*.6,x+dx,y+6-hh);g.quadraticCurveTo(x+dx+4*s,y+6-hh*.6,x+dx+6*s,y+6);g.closePath();g.fill()});
    g.fillStyle='rgba(255,240,160,.9)';g.beginPath();g.ellipse(x,y+2,4,6,0,0,7);g.fill();tvGlow(x,y-6,90,'255,150,60',fl*.8);
    g.fillStyle='#c89a40';g.fillRect(x-30,y-70,6,8);g.fillRect(x+24,y-70,6,8);tvGlow(x-27,y-74,12,'255,200,110',.5);tvGlow(x+27,y-74,12,'255,200,110',.5)}
  else{g.fillStyle='#2a2a30';[[x-16,y],[x+12,y]].forEach(([lx,ly])=>g.fillRect(lx,ly-6,4,18));g.fillStyle='#3a3a44';g.beginPath();g.ellipse(x,y-8,24,9,0,0,7);g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
    g.fillStyle='#1a1010';g.beginPath();g.ellipse(x,y-10,19,6,0,0,7);g.fill();for(let k=0;k<7;k++){const a=k*.9,r=k%2?9:4;g.fillStyle='rgba(255,'+(80+((k*37)%60))+',30,'+(.6+.4*Math.sin(t*4+k))+')';g.beginPath();g.arc(x+Math.cos(a)*r,y-10+Math.sin(a)*r*.35,2.4,0,7);g.fill()}
    for(let k=0;k<2;k++){const hh=10+Math.sin(t*8+k*3)*3;g.fillStyle='rgba(255,170,60,.85)';g.beginPath();g.moveTo(x-6+k*8,y-11);g.quadraticCurveTo(x-4+k*8,y-11-hh*.7,x-2+k*8,y-11-hh);g.quadraticCurveTo(x+k*8,y-11-hh*.5,x+2+k*8,y-11);g.closePath();g.fill()}tvGlow(x,y-12,70,'255,150,60',fl*.7)}
  if(Math.random()<.12)parts.push({x:x+(Math.random()-.5)*14,y:y-(f==='fir2'?20:16),vx:(Math.random()-.5)*14,vy:-40-Math.random()*30,t:.9,l:.9,c:'#ffb050',r:1.3})}
function tvCeil(c,t,O){if(!c)return;
  if(c==='cei1'){const segs=[[TRX0+4,CY-350,CX,CY-350],[CX,CY-350,TRX1-4,CY-350],[TRX0+4,CY-300,CX,CY-318],[CX,CY-318,TRX1-4,CY-300]];const cols=['255,200,110','255,140,120','160,220,255','200,255,160'];let n=0;
    segs.forEach(([x0,y0,x1,y1])=>{g.strokeStyle='#2a1a10';g.lineWidth=1;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2,(y0+y1)/2+26,x1,y1);g.stroke();
      for(let k=1;k<9;k++){const u=k/9,px=(1-u)*(1-u)*x0+2*(1-u)*u*(x0+x1)/2+u*u*x1,py=(1-u)*(1-u)*y0+2*(1-u)*u*((y0+y1)/2+26)+u*u*y1+3,cc=cols[(n++)%4],tw=.55+.45*Math.sin(t*2.2+n*1.7);
        g.globalCompositeOperation='lighter';glowAt(px,py,10,cc,.5*tw);g.globalCompositeOperation='source-over';g.fillStyle='rgba('+cc+','+(.6+.4*tw)+')';g.beginPath();g.ellipse(px,py,2.2,3,0,0,7);g.fill()}})}
  else{const x=CX,y=CY-112,sw=Math.sin(t*.8)*1.5;g.save();g.translate(x,CY-20);g.scale(1,.45);tvGlow(0,0,130,'255,220,150',.3);g.restore();g.strokeStyle='rgba(200,160,80,.7)';g.lineWidth=1.2;g.beginPath();g.moveTo(x,CY-330);g.lineTo(x+sw,y-16);g.stroke();
    g.strokeStyle='#d8b060';g.lineWidth=2.2;g.beginPath();g.ellipse(x+sw,y,40,9,0,0,7);g.stroke();g.lineWidth=1.4;g.beginPath();g.ellipse(x+sw,y-10,24,5,0,0,7);g.stroke();
    for(let k=0;k<8;k++){const a=k/8*6.283,px=x+sw+Math.cos(a)*40,py=y+Math.sin(a)*9;g.strokeStyle='rgba(200,235,255,.8)';g.lineWidth=.8;g.beginPath();g.moveTo(px,py);g.lineTo(px,py+9);g.stroke();g.fillStyle='rgba(220,245,255,.95)';g.beginPath();g.moveTo(px,py+9);g.lineTo(px+2,py+13);g.lineTo(px,py+17);g.lineTo(px-2,py+13);g.closePath();g.fill();
      if(Math.sin(a)<.3){g.fillStyle='#f4ecd8';g.fillRect(px-1.6,py-8,3.2,8);const fl=Math.sin(t*9+k)*.8;g.fillStyle='rgba(255,200,90,.95)';g.beginPath();g.ellipse(px,py-10,1.6,3+fl,0,0,7);g.fill();g.globalCompositeOperation='lighter';glowAt(px,py-10,12,'255,210,120',.6);g.globalCompositeOperation='source-over'}}
    tvGlow(x,y,110,'255,220,150',.2+.04*Math.sin(t*3));for(let k=0;k<5;k++){const a=t*.5+k*1.26;g.fillStyle='rgba('+['255,140,140','140,255,180','140,180,255','255,240,140','220,160,255'][k]+',.4)';g.beginPath();g.ellipse(x+Math.cos(a)*130,CY+10+Math.sin(a)*70,6,2.6,a,0,7);g.fill()}}}
drawTent=function(){tvInit();const M=MAPS[curMap];if(!M||!M.tent)return;const T=M.tent,t=performance.now()/1000,O='#1a100a',d=T.d||{},mine=tentMine();g.save();
  g.fillStyle='#080504';g.fillRect(cam.x-20,cam.y-20,W+40,H+40);
  const B=tvBG(d.thm||'');g.drawImage(B.c,B.ox,B.oy,B.w,B.h);
  /* แสงรวมของห้อง: ยิ่งมีไฟยิ่งอุ่น */
  const lum=(d.lit?1:0)+(d.cei?1:0)+(d.fir?1:0);tvGlow(CX,CY-20,260,'255,190,120',.06+lum*.05);
  /* ป้ายชื่อเต็นท์ */
  {const lb='🏠 เต็นท์ของ '+T.o,sub=tRank(T.c)+' · ความสบาย '+T.c+' · ผู้มาเยือน '+T.v;g.font='bold 12px system-ui';const tw=Math.max(g.measureText(lb).width,(g.font='9px system-ui',g.measureText(sub).width))+30;
    g.strokeStyle='#2a1a10';g.lineWidth=1;g.beginPath();g.moveTo(CX-tw/2+8,CY-386);g.lineTo(CX-tw/2+8,CY-374);g.moveTo(CX+tw/2-8,CY-386);g.lineTo(CX+tw/2-8,CY-374);g.stroke();
    const gr=g.createLinearGradient(0,CY-374,0,CY-342);gr.addColorStop(0,'#8a5a30');gr.addColorStop(1,'#5a3418');g.fillStyle=gr;g.beginPath();g.roundRect(CX-tw/2,CY-374,tw,32,6);g.fill();g.strokeStyle='#d8a85a';g.lineWidth=1.2;g.stroke();
    g.textAlign='center';g.font='bold 12px system-ui';g.fillStyle='#ffe6b0';g.fillText(lb,CX,CY-359);g.font='9px system-ui';g.fillStyle='#f0d8a8';g.fillText(sub,CX,CY-347)}
  /* ของแต่งผนัง */
  {const w=d.wal,x=CX,y=CY-282;
    if(w==='wal1'){g.fillStyle='#4a2e14';g.fillRect(x-30,y-40,60,4);g.fillStyle='#c8a050';g.beginPath();g.arc(x-30,y-38,3,0,7);g.arc(x+30,y-38,3,0,7);g.fill();const sw=Math.sin(t*1.3)*2;
      g.fillStyle='#b8302a';g.beginPath();g.moveTo(x-24,y-36);g.lineTo(x+24,y-36);g.lineTo(x+24+sw,y+14);g.lineTo(x,y+4);g.lineTo(x-24+sw,y+14);g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();g.strokeStyle='#ffd27a';g.lineWidth=1.2;g.strokeRect(x-20,y-32,40,30);g.font='16px system-ui';g.textAlign='center';g.fillText('⛺',x,y-11)}
    else if(w==='wal2'){tvP([x-40,y-34,x+40,y-34,x+40,y+22,x-40,y+22],'#c89a40',O,1.2);tvP([x-35,y-29,x+35,y-29,x+35,y+17,x-35,y+17],'#7a5418');const gr=g.createLinearGradient(0,y-26,0,y+14);gr.addColorStop(0,'#f0b878');gr.addColorStop(.5,'#8ac8f0');gr.addColorStop(1,'#e8f0d8');g.fillStyle=gr;g.fillRect(x-32,y-26,64,40);
      tvP([x-32,y+14,x-14,y-8,x+2,y+6,x+16,y-14,x+32,y+14],'#4a7a4a');tvP([x+16,y-14,x+11,y-7,x+21,y-7],'#ffffff');tvP([x-32,y+14,x-20,y+2,x-6,y+14],'#3a6a3a');g.fillStyle='#ffe08a';g.beginPath();g.arc(x-18,y-16,4,0,7);g.fill();g.fillStyle='rgba(255,255,255,.18)';tvP([x-32,y-26,x-12,y-26,x-32,y-6],'rgba(255,255,255,.16)')}
    else if(w==='wal3'){tvGlow(x,y-4,48,'255,210,110',.35+.1*Math.sin(t*2));g.strokeStyle='#d8dce4';g.lineWidth=3;g.beginPath();g.moveTo(x-36,y+12);g.lineTo(x+36,y-42);g.moveTo(x+36,y+12);g.lineTo(x-36,y-42);g.stroke();g.fillStyle='#c89a40';[[x-36,y+12],[x+36,y+12]].forEach(([a,b2])=>{g.fillRect(a-3,b2-2,6,6)});
      tvP([x-24,y-32,x+24,y-32,x+24,y,x,y+22,x-24,y],'#2a3a7a','#ffd84a',2.4);tvP([x-24,y-32,x,y-32,x,y+22,x-24,y],'rgba(255,255,255,.08)');tvP([x-9,y-20,x+9,y-20,x+9,y-3,x,y+8,x-9,y-3],'#ffd84a');g.font='10px system-ui';g.textAlign='center';g.fillStyle='#2a3a7a';g.fillText('✦',x,y-8)}
    else if(mine)tvGhost(x,y-6,74,56,'🖼️','ของแต่งผนัง')}
  /* แผ่นโชว์ปลา (ซ้าย) */
  tvP([CX-191,CY-330,CX-89,CY-330,CX-89,CY-228,CX-191,CY-228],'rgba(40,24,10,.55)','#6a4424',1.2);
  for(let i=0;i<6;i++){const q=T.f[i],col=i%3,row=i/3|0,x=CX-166+col*38,y=CY-322+row*46;
    if(q){const F=FISH[q[0]];tvP([x-17,y,x+17,y,x+17,y+38,x-17,y+38],'#6a4424',O,1);const gr=g.createLinearGradient(0,y+3,0,y+35);gr.addColorStop(0,'#2a5a7a');gr.addColorStop(1,'#123044');g.fillStyle=gr;g.fillRect(x-14,y+3,28,32);g.strokeStyle=FRC[F.r];g.lineWidth=1.6;g.strokeRect(x-14,y+3,28,32);
      if(F.r>=4)tvGlow(x,y+16,22,h2r(FRC[4]),.35+.15*Math.sin(t*2+i));g.font='16px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(F.ic,x,y+15+Math.sin(t*1.5+i)*1.2);g.textBaseline='alphabetic';
      g.fillStyle='rgba(255,255,255,.22)';tvP([x-14,y+3,x-6,y+3,x-14,y+13],'rgba(255,255,255,.2)');g.font='bold 6.5px system-ui';g.fillStyle='#ffe6b0';g.fillText(Math.round(q[1])+'ซม.',x,y+33)}
    else{tvP([x-17,y,x+17,y,x+17,y+38,x-17,y+38],'rgba(90,60,30,.3)','rgba(255,220,160,.12)',1);if(mine&&i===0){g.font='bold 6.5px system-ui';g.textAlign='center';g.fillStyle='rgba(255,230,180,.55)';g.fillText('🎣 ตกปลา',x+38,y+44)}}}
  /* ชั้นถ้วยรางวัล (ขวา) */
  for(let s=0;s<2;s++){const y=CY-282+s*46;tvP([CX+76,y,CX+190,y,CX+190,y+6,CX+76,y+6],'#6a4424',O,.8);g.fillStyle='rgba(255,230,180,.2)';g.fillRect(CX+76,y,114,1.4);g.fillStyle='#3a2412';[CX+82,CX+182].forEach(bx=>{tvP([bx-2,y+6,bx+4,y+6,bx-2,y+16],'#3a2412')})}
  T.b.slice().sort((a,b)=>b[1]-a[1]).slice(0,12).forEach(([k,n],i)=>{const s=i/6|0,x=CX+88+(i%6)*18,y=CY-282+s*46,cc=n>=50?['#ffe27a','#c89a20']:n>=10?['#e8eef4','#9aa4b0']:['#e0a070','#9a5a2a'];
    tvP([x-6,y-22,x+6,y-22,x+4,y-12,x-4,y-12],cc[0],O,.6);g.fillStyle=cc[1];g.fillRect(x-1.2,y-12,2.4,6);tvP([x-5,y-6,x+5,y-6,x+5,y-1,x-5,y-1],cc[1],O,.5);g.strokeStyle=cc[0];g.lineWidth=1;g.beginPath();g.arc(x-6,y-18,3,1.6,4.7);g.arc(x+6,y-18,3,-1.6,1.6);g.stroke();
    g.fillStyle='rgba(255,255,255,.5)';g.fillRect(x-4,y-21,1.4,7);if(n>=50)tvGlow(x,y-16,10,'255,220,110',.3+.2*Math.sin(t*3+i))});
  if(T.tw>=10){const x=CX+175,y=CY-206;tvP([x-8,y,x+8,y,x+5,y-34,x-5,y-34],'#5a5a8a',O,1);tvP([x-7,y-34,x+7,y-34,x,y-44],'#8a8ac8',O,.8);tvGlow(x,y-40,14,'170,170,255',.4);g.font='bold 7px system-ui';g.fillStyle='#e0e0ff';g.textAlign='center';g.fillText('🗼'+T.tw,x,y+9)}
  /* ไฟประดับมุมหลัง */
  if(d.lit)[TRX0+26,TRX1-26].forEach((x,i)=>{const y=TRY0+14,c=d.lit==='lit3'?'140,220,255':d.lit==='lit2'?'255,110,90':'255,200,110';g.save();g.translate(x,y+26);g.scale(1,.42);tvGlow(0,0,80,c,.32+.05*Math.sin(t*3+i));g.restore();tvLamp(d.lit,x,y,t,i,O)});
  else if(mine)tvGhost(TRX0+30,TRY0-6,40,48,'🏮','ไฟ');
  /* แท่นโชว์อุปกรณ์ */
  for(let i=0;i<4;i++){const q=T.g[i],x=CX-87+i*58,y=TRY0+30;if(!q){tvPedEmpty(x,y,t,i,mine);continue}gxShadow(x,y+9,20,5,.45);tvP([x-15,y-10,x+15,y-10,x+13,y+7,x-13,y+7],'#6a6a76',O,1);g.fillStyle='rgba(255,255,255,.1)';g.fillRect(x-13,y-9,4,15);g.strokeStyle='rgba(30,30,40,.5)';g.lineWidth=.7;g.strokeRect(x-9,y-6,18,9);
    tvP([x-18,y-15,x+18,y-15,x+15,y-10,x-15,y-10],'#8a8a98',O,.8);g.fillStyle='#7a1a2a';g.beginPath();g.ellipse(x,y-16,11,3,0,0,7);g.fill();
    if(q){const c=RC[q[1]]||'#fff',fy=y-34+Math.sin(t*1.8+i)*3;tvGlow(x,fy,28,h2r(c),.55);g.globalCompositeOperation='lighter';g.globalAlpha=.25;g.fillStyle=c;tvP([x-8,y-16,x+8,y-16,x+4,fy,x-4,fy],c);g.globalAlpha=1;
      if(q[2]){for(let k=0;k<4;k++){const a=t*1.5+k*1.57;g.fillStyle='rgba(255,230,140,.8)';g.beginPath();g.arc(x+Math.cos(a)*15,fy+Math.sin(a)*6,1.4,0,7);g.fill()}}g.globalCompositeOperation='source-over';
      g.font='20px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(TSLI[q[0]]||'✦',x,fy);g.textBaseline='alphabetic';if(Math.hypot(me.x-x,me.y-y)<90){g.font='bold 8px system-ui';const tw=g.measureText(q[3]).width+10;g.fillStyle='rgba(10,8,20,.8)';g.beginPath();g.roundRect(x-tw/2,y-66,tw,13,6);g.fill();g.fillStyle=c;g.fillText(q[3],x,y-56)}}}
  /* เตาผิง (ผนังซ้าย) */tvHearth(d.fir,TRX0+44,CY-70,t,O);if(!d.fir&&mine)tvGhost(TRX0+44,CY-84,58,58,'🔥','เตาผิง');
  /* พรม */tvRug(d.rug,CX,CY+30,t);
  /* เตียง */{const x=TBED.x,y=TBED.y;tvBed(d.bed,x,y,t,O);if(TSL&&mine){g.font='bold 14px system-ui';g.textAlign='center';for(let i=0;i<3;i++){const q=(t*.6+i/3)%1;g.globalAlpha=1-q;g.fillStyle='#cfe0ff';g.fillText('z',x+20+q*20,y-30-q*40)}g.globalAlpha=1}}
  /* โต๊ะ */if(d.tab)tvTable(d.tab,CX+128,CY+64,t,O);else if(mine)tvGhost(CX+128,CY+56,72,40,'🍵','โต๊ะ');
  /* ต้นไม้ */if(d.pla)tvPlant(d.pla,TRX1-34,TRY1-36,t,O);else if(mine)tvGhost(TRX1-34,TRY1-44,40,46,'🌿','ต้นไม้');
  /* แท่นวางสมุดเยี่ยม */{const x=CX+76,y=TRY1-22;gxShadow(x,y+2,12,3,.4);g.fillStyle='#4a2e18';g.fillRect(x-2,y-18,4,18);g.fillRect(x-7,y-2,14,3);tvP([x-13,y-26,x+13,y-26,x+11,y-17,x-11,y-17],'#7a5230',O,.8);
    g.fillStyle='#f4ecd4';tvP([x-11,y-26,x,y-24,x,y-18,x-10,y-19],'#f4ecd4');tvP([x,y-24,x+11,y-26,x+10,y-19,x,y-18],'#e8dcc0');g.strokeStyle='rgba(60,40,20,.5)';g.lineWidth=.5;for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-9,y-23+i*1.6);g.lineTo(x-2,y-22+i*1.6);g.stroke()}
    g.strokeStyle='#e8e0f0';g.lineWidth=1;g.beginPath();g.moveTo(x+6,y-22);g.lineTo(x+12,y-34);g.stroke();g.font='bold 7px system-ui';g.textAlign='center';g.fillStyle='#ffe6b0';g.fillText('📖 '+T.v,x,y+9)}
  /* ไฟเพดาน */tvCeil(d.cei,t,O);if(!d.cei&&mine)tvGhost(CX,CY-112,80,34,'💡','ไฟเพดาน');
  /* ฝุ่นลอยในแสง */if(lum>0){for(let i=0;i<22;i++){const sx=TRX0+((i*97)%380),sy=TRY0+((i*61)%360),px=sx+Math.sin(t*.3+i)*18,py=sy-((t*6+i*13)%60);g.fillStyle='rgba(255,236,190,'+(.18+.14*Math.sin(t*1.7+i))+')';g.beginPath();g.arc(px,py,.9+(i%3)*.4,0,7);g.fill()}}
  /* ประตู */tvGlow(CX,TRY1+18,56,'255,220,150',.14);g.font='bold 9px system-ui';g.textAlign='center';g.fillStyle='rgba(255,230,180,.85)';g.fillText('🚪 ทางออก',CX,TRY1+44);
  g.restore()};
/* ---------- v382 ทำอาหารที่เตาในเต็นท์ ----------
   ยืนใกล้เตาในเต็นท์ตัวเอง → ปุ่ม "🔥 ทำอาหารที่เตา" เปิดหน้าทำอาหาร (ไม่ต้องเดินไปหาป้าบัว)
   เตาถ่านเหล็ก: ค่าปรุง −30% · เตาผิงหิน: ค่าปรุง −50% + ลุ้นอร่อยพิเศษได้ 2 จาน 25%
   สูตรเฉพาะเตา: ปลารมควัน (เตาไหนก็ได้) · สตูว์ปลาเตาผิงหิน (เฉพาะเตาผิงหิน) */
Object.assign(FOOD,{smoke:['🐟','ปลารมควันเตาถ่าน',{c:3,u:1},{fl:.25,xp:.06},20,1200,'fir1'],stew:['🥘','สตูว์ปลาเตาผิงหิน',{c:2,u:2,r:1},{hp:.06,dm:.05,xp:.07,gd:.04},30,4000,'fir2']});
const FIRP={fir1:{off:.3,dbl:0},fir2:{off:.5,dbl:.25}};let TVCK=0;
function tvHK(){try{if(!tentMine())return'';const d=MAPS[curMap].tent.d||{};return FIRP[d.fir]?d.fir:''}catch(e){return''}}
function tvNearHearth(){const k=tvHK();return!!k&&Math.hypot(me.x-(TRX0+44),me.y-(CY-60))<100}
function fsHearthOk(k){const F=FOOD[k];if(!F||!F[6])return true;const h=tvNearHearth()?tvHK():'';return F[6]==='fir1'?!!h:h==='fir2'}
function fsFee(k){const F=FOOD[k];if(!F)return 0;const h=tvNearHearth()?tvHK():'';return Math.round(F[5]*(1-(h?FIRP[h].off:0)))}
function fsHearthHdr(near){const h=tvNearHearth()?tvHK():'';if(h){const P=FIRP[h];return'🔥 '+TDECO[h][2]+'ในเต็นท์ · ค่าปรุง −'+Math.round(P.off*100)+'%'+(P.dbl?' · ลุ้นได้ 2 จาน '+Math.round(P.dbl*100)+'%':'')}
  return'👩‍🍳 สูตรอาหารของป้าบัว '+(near?'':'<small style="opacity:.75">(ไปหาป้าบัวที่ครัวริมบึง หน้าประตูใต้ของค่าย หรือใช้เตาผิงในเต็นท์ของคุณ)</small>')}
function fsCookDone(k,F,S){let two=0;const h=tvNearHearth()?tvHK():'';if(h){if(Math.random()<FIRP[h].dbl){S.f[k]=Math.min(99,(S.f[k]|0)+1);two=1}TVCK=performance.now()/1000+2.6;
  try{for(let i=0;i<14;i++)parts.push({x:TRX0+44+(Math.random()-.5)*24,y:CY-80,vx:(Math.random()-.5)*30,vy:-50-Math.random()*40,t:1.1,l:1.1,c:i%2?'#ffd84a':'#ffffff',r:1.8})}catch(e){}
  return'🔥 ปรุง «'+F[0]+' '+F[1]+'» ที่เตาเสร็จแล้ว!'+(two?' ✨ อร่อยพิเศษ ได้ 2 จาน!':'')+' กด "กิน" เพื่อรับบัฟ'}
  return'👩‍🍳 ป้าบัวปรุง «'+F[0]+' '+F[1]+'» เสร็จแล้ว! กด "กิน" เพื่อรับบัฟ'}
{const o=fsNearCook;fsNearCook=function(){return o()||tvNearHearth()}}
/* อุปกรณ์บนเตา + แอนิเมชันตอนปรุง */
function tvCookware(f,x,y,t){const ck=TVCK>t,O='#1a100a';
  if(f==='fir2'){const px=x,py=y-6;g.strokeStyle='#3a3a40';g.lineWidth=1.4;g.beginPath();g.moveTo(px-14,py-26);g.lineTo(px,py-34);g.lineTo(px+14,py-26);g.stroke();
    g.fillStyle='#24242a';g.beginPath();g.ellipse(px,py-10,13,10,0,0,7);g.fill();g.strokeStyle=O;g.lineWidth=.8;g.stroke();g.fillStyle='#3a3a44';g.beginPath();g.ellipse(px,py-18,13,3.4,0,0,7);g.fill();
    g.fillStyle=ck?'#e8b060':'#c89048';g.beginPath();g.ellipse(px,py-18,10.5,2.4,0,0,7);g.fill();for(let i=0;i<(ck?6:3);i++){const q=(t*(ck?1.2:.5)+i/ (ck?6:3))%1;g.fillStyle='rgba(240,240,240,'+(.4*(1-q))+')';g.beginPath();g.arc(px-6+i*3+Math.sin(q*6+i)*3,py-22-q*(ck?40:24),2+q*5,0,7);g.fill()}}
  else{const px=x,py=y-16;g.strokeStyle='#5a5a62';g.lineWidth=1;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(px-16,py+i*2.4);g.lineTo(px+16,py+i*2.4);g.stroke()}
    [[-6,0],[6,1]].forEach(([dx,k])=>{g.strokeStyle='#c8a870';g.lineWidth=1;g.beginPath();g.moveTo(px+dx-12,py+3);g.lineTo(px+dx+10,py-5);g.stroke();g.fillStyle=ck?'#c87838':'#9aa8b8';g.beginPath();g.ellipse(px+dx,py-1,7,3,-.35,0,7);g.fill();g.strokeStyle=O;g.lineWidth=.6;g.stroke();
      g.fillStyle=ck?'#c87838':'#9aa8b8';g.beginPath();g.moveTo(px+dx+6,py-3);g.lineTo(px+dx+10,py-6);g.lineTo(px+dx+9,py);g.closePath();g.fill()});
    for(let i=0;i<(ck?5:2);i++){const q=(t*(ck?1.1:.4)+i/(ck?5:2))%1;g.fillStyle='rgba(200,200,200,'+(.35*(1-q))+')';g.beginPath();g.arc(px-4+i*4,py-8-q*(ck?36:20),2+q*4,0,7);g.fill()}}
  if(ck){const k=TVCK-t;tvGlow(x,y-10,70,'255,170,60',.35*Math.min(1,k));g.font='bold 9px system-ui';g.textAlign='center';g.fillStyle='rgba(255,236,190,'+Math.min(1,k)+')';g.fillText('ฉ่า~ 🍳',x,y-58-(2.6-k)*8)}}
{const o=tvHearth;tvHearth=function(f,x,y,t,O){o(f,x,y,t,O);if(f)tvCookware(f,x,y,t)}}

/* แท่นโชว์ที่ยังว่าง: ฐานหินเตี้ย + วงเรืองจาง ๆ (เต็นท์ตัวเองบอกว่าโชว์อะไรได้) */
function tvPedEmpty(x,y,t,i,mine){gxShadow(x,y+6,16,4,.35);tvP([x-13,y-2,x+13,y-2,x+11,y+6,x-11,y+6],'#4e4e58','rgba(20,20,26,.8)',.8);tvP([x-15,y-6,x+15,y-6,x+13,y-2,x-13,y-2],'#62626e','rgba(20,20,26,.8)',.8);
  g.save();g.globalAlpha=.35+.15*Math.sin(t*2+i);g.strokeStyle='#cfd8ff';g.setLineDash([3,3]);g.lineWidth=1;g.beginPath();g.ellipse(x,y-7,11,3.4,0,0,7);g.stroke();g.setLineDash([]);
  g.font='13px system-ui';g.textAlign='center';g.textBaseline='middle';g.globalAlpha*=.8;g.fillText(['⚔️','🛡️','💍','⛑️'][i],x,y-22+Math.sin(t*1.6+i)*2);g.textBaseline='alphabetic';g.restore();
  if(mine&&i===0&&Math.hypot(me.x-CX,me.y-y)<170){g.font='bold 7.5px system-ui';g.textAlign='left';g.fillStyle='rgba(220,228,255,.75)';g.fillText('อุปกรณ์ระดับหายากขึ้นไปจะโชว์บนแท่นอัตโนมัติ',x-14,y+18)}}
/* ---------- v383 ลานเต็นท์ในค่ายโฉมใหม่ ----------
   ลานดินอัด + หินขอบ · เต็นท์ระฆังหลังกลางใหญ่ (สีตามผ้าใบที่ผู้เล่นซื้อ) · เต็นท์ลายทาง 2 หลัง · ไฟสายระย้า · กองไฟ + ม้านั่งซุง · ลัง/ถัง · ป้ายไม้ */
const TGP={'':['#d8bc88','#a88a58','#8c2a1e'],thm1:['#f0e2c4','#b8382a','#b8382a'],thm2:['#2a3a7a','#18224e','#e8c060'],thm3:['#8a1828','#5a0c18','#ffd76a']};
function tgTent(x,y,s,c1,c2,trim,stripe,t,glow,star){const O='#1a100a';gxShadow(x,y+4,48*s,11*s,.45);
  /* เชือกขึง + หมุด */g.strokeStyle='rgba(230,215,180,.55)';g.lineWidth=.8;[[-1,1],[1,1]].forEach(([d])=>{g.beginPath();g.moveTo(x+d*14*s,y-44*s);g.lineTo(x+d*52*s,y+6);g.stroke();g.fillStyle='#5a3a1a';g.fillRect(x+d*52*s-1.5,y+2,3,6)});
  /* ด้านข้าง (มืด) */tvP([x,y-58*s,x+44*s,y+2,x+30*s,y+6],c2,O,1);
  /* หน้าเต็นท์ */tvP([x-40*s,y+4,x,y-58*s,x+30*s,y+6],c1,O,1.1);
  if(stripe){g.save();tvP([x-40*s,y+4,x,y-58*s,x+30*s,y+6]);g.clip();g.fillStyle=stripe;for(let k=-4;k<4;k+=2){g.beginPath();g.moveTo(x,y-58*s);g.lineTo(x+k*10*s,y+8);g.lineTo(x+(k+1)*10*s,y+8);g.closePath();g.fill()}g.restore();tvP([x-40*s,y+4,x,y-58*s,x+30*s,y+6],null,O,1.1)}
  if(star){for(let k=0;k<7;k++){const px=x-24*s+((k*37)%48)*s,py=y-6-((k*23)%40)*s;if(py<y-58*s+(Math.abs(px-x)/40)*58*s+4)continue;g.fillStyle='rgba(255,226,140,.85)';g.beginPath();g.arc(px,py,1.3*s,0,7);g.fill()}}
  /* ประตูเปิด แสงอุ่นด้านใน */g.fillStyle='#1a0e06';tvP([x-12*s,y+5,x-2*s,y-30*s,x+8*s,y+5],'#1a0e06');tvGlow(x-2*s,y-8,22*s,'255,190,100',glow);g.fillStyle='rgba(255,200,120,'+(.35+glow*.5)+')';tvP([x-8*s,y+5,x-2*s,y-18*s,x+4*s,y+5],g.fillStyle);
  /* ผ้าประตูม้วน */[[-1],[1]].forEach(([d])=>{g.fillStyle=c1;g.beginPath();g.moveTo(x-2*s+d*1*s,y-30*s);g.quadraticCurveTo(x-2*s+d*14*s,y-14*s,x-2*s+d*11*s,y+4);g.lineTo(x-2*s+d*6*s,y+4);g.quadraticCurveTo(x-2*s+d*6*s,y-14*s,x-2*s,y-30*s);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke()});
  /* ขอบระบาย */g.fillStyle=trim;for(let k=0;k<6;k++){const u=(k+.5)/6,px=x-40*s+(70*s)*u,py=y+4+u*2;g.beginPath();g.arc(px,py,3.2*s,0,Math.PI);g.fill()}
  /* เสา + ธง */g.strokeStyle='#4a2e18';g.lineWidth=1.6;g.beginPath();g.moveTo(x,y-58*s);g.lineTo(x,y-70*s);g.stroke();const fl=Math.sin(t*3+x)*2;tvP([x,y-70*s,x+12*s,y-67*s+fl*.4,x,y-63*s],trim,O,.5)}
function tgFire(x,y,t,nf){const O='#1a100a';for(let k=0;k<9;k++){const a=k/9*6.283;g.fillStyle=k%2?'#7a7470':'#8e8882';g.beginPath();g.ellipse(x+Math.cos(a)*13,y+Math.sin(a)*5.5,4,3,0,0,7);g.fill();g.strokeStyle=O;g.lineWidth=.5;g.stroke()}
  g.strokeStyle='#5a3418';g.lineWidth=3.4;g.lineCap='round';g.beginPath();g.moveTo(x-9,y+3);g.lineTo(x+8,y-3);g.moveTo(x-8,y-3);g.lineTo(x+9,y+3);g.stroke();g.lineCap='butt';
  const fl=.65+.15*Math.sin(t*6)+.1*Math.sin(t*15);tvGlow(x,y-8,60+nf*40,'255,150,60',fl*(.5+nf*.5));
  [[0,1],[-4,.7],[4,.75]].forEach(([dx,sc],k)=>{const hh=(15+Math.sin(t*9+k*2)*4)*sc;g.fillStyle='rgba(255,'+(130+k*35)+',40,.95)';g.beginPath();g.moveTo(x+dx-5*sc,y);g.quadraticCurveTo(x+dx-3*sc,y-hh*.6,x+dx,y-hh);g.quadraticCurveTo(x+dx+3*sc,y-hh*.6,x+dx+5*sc,y);g.closePath();g.fill()});
  g.fillStyle='rgba(255,240,170,.95)';g.beginPath();g.ellipse(x,y-3,2.6,4.5,0,0,7);g.fill();if(Math.random()<.15)parts.push({x:x+(Math.random()-.5)*8,y:y-10,vx:(Math.random()-.5)*16,vy:-36-Math.random()*30,t:1,l:1,c:'#ffb050',r:1.2})}
drawTentGate=function(){if(curMap!==1||!inView(TNE.x,TNE.y,220))return;const x=TNE.x,y=TNE.y,t=performance.now()/1000,O='#1a100a';let nf=0;try{nf=isNight()?1:0}catch(e){}g.save();
  /* ลานดินอัด */{const gr=g.createRadialGradient(x,y+12,10,x,y+12,140);gr.addColorStop(0,'rgba(150,118,74,.95)');gr.addColorStop(.75,'rgba(130,100,62,.85)');gr.addColorStop(1,'rgba(120,92,58,0)');g.fillStyle=gr;g.beginPath();g.ellipse(x,y+12,150,66,0,0,7);g.fill();
    for(let k=0;k<22;k++){const a=k/22*6.283,px=x+Math.cos(a)*128,py=y+12+Math.sin(a)*55;g.fillStyle=k%3?'#8a8478':'#a09a8c';g.beginPath();g.ellipse(px,py,5+(k%2)*2,3.4,a,0,7);g.fill();g.strokeStyle='rgba(30,26,20,.5)';g.lineWidth=.6;g.stroke()}
    for(let k=0;k<5;k++){const py=y+72+k*16,px=x+Math.sin(k*1.7)*6;g.fillStyle='#9a9284';g.beginPath();g.ellipse(px,py,11-k,5-k*.4,0,0,7);g.fill();g.strokeStyle='rgba(30,26,20,.45)';g.stroke()}}
  /* เต็นท์ข้าง 2 หลัง */tgTent(x-82,y-6,.82,'#7a5a9a','#553a72','#e8c060','#9a7ab8',t,.2+nf*.4);tgTent(x+84,y-4,.86,'#4a8a68','#2e6448','#ffd27a','#6aa888',t,.2+nf*.4);
  /* ไฟสายระย้า */{const P=[[x-82,y-6-70*.82],[x,y-4-70*1.3],[x+84,y-4-70*.86]];for(let si=0;si<2;si++){const [x0,y0]=P[si],[x1,y1]=P[si+1],my=(y0+y1)/2+22;g.strokeStyle='rgba(40,26,14,.8)';g.lineWidth=.8;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2,my,x1,y1);g.stroke();
    for(let k=1;k<8;k++){const u=k/8,px=(1-u)*(1-u)*x0+2*(1-u)*u*(x0+x1)/2+u*u*x1,py=(1-u)*(1-u)*y0+2*(1-u)*u*my+u*u*y1+3,cc=['255,200,110','255,130,110','150,210,255','190,255,150'][(k+si)%4],tw=.6+.4*Math.sin(t*2.3+k*1.9+si);
      tvGlow(px,py,8+nf*8,cc,(.35+nf*.4)*tw);g.fillStyle='rgba('+cc+','+(.7+.3*tw)+')';g.beginPath();g.ellipse(px,py,1.8,2.4,0,0,7);g.fill()}}}
  /* เต็นท์หลังกลาง = เต็นท์ของผู้เล่น (สีตามผ้าใบ) */{let th='';try{th=(me.tent&&me.tent.d&&me.tent.d.thm)||''}catch(e){}const P=TGP[th]||TGP[''];tgTent(x,y-2,1.3,P[0],P[1],P[2],th==='thm1'?'#b8382a':null,t,.3+nf*.5,th==='thm2');
    if(th==='thm3'){g.strokeStyle='#ffd76a';g.lineWidth=1.4;g.beginPath();g.moveTo(x-52,y+3);g.lineTo(x,y-2-58*1.3);g.lineTo(x+39,y+5);g.stroke()}}
  /* กองไฟ + ม้านั่งซุง */tgFire(x+46,y+40,t,nf);[[x+20,y+50,-.25],[x+74,y+52,.3]].forEach(([bx,by,r])=>{g.save();g.translate(bx,by);g.rotate(r);g.fillStyle='#6a4426';g.beginPath();g.roundRect(-13,-3.5,26,7,3.5);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();g.fillStyle='#a07848';g.beginPath();g.ellipse(13,0,2.4,3.5,0,0,7);g.fill();g.restore()});
  /* ลัง + ถัง (ซ้าย) */{const bx=x-128,by=y+26;gxShadow(bx,by+8,24,6,.4);tvP([bx-14,by-12,bx+4,by-12,bx+4,by+6,bx-14,by+6],'#9a6a38',O,.9);g.strokeStyle='rgba(60,36,14,.8)';g.lineWidth=1;g.beginPath();g.moveTo(bx-14,by-12);g.lineTo(bx+4,by+6);g.moveTo(bx+4,by-12);g.lineTo(bx-14,by+6);g.stroke();
    g.fillStyle='#7a4a24';g.beginPath();g.ellipse(bx+14,by-1,8,10,0,0,7);g.fill();g.strokeStyle=O;g.stroke();g.strokeStyle='#4a4a52';g.lineWidth=1.4;[-5,4].forEach(dy=>{g.beginPath();g.ellipse(bx+14,by+dy,8,1.6,0,0,7);g.stroke()})}
  /* ป้ายไม้ + โคม (ขวา) */{const px=x+132,py=y-12;gxShadow(px,py+28,10,3,.35);g.fillStyle='#5a3a1a';g.fillRect(px-2,py-30,4,58);tvP([px-26,py-28,px+24,py-28,px+28,py-20,px+24,py-12,px-26,py-12],'#8a6a40',O,.9);g.font='bold 8px system-ui';g.textAlign='center';g.fillStyle='#fff2c0';g.fillText('🏠 เต็นท์',px,py-17);
    g.fillRect(px+2,py-40,10,2);const ly=py-34;tvGlow(px+11,ly,26+nf*16,'255,200,110',.5+nf*.3+.08*Math.sin(t*3));tvP([px+7,ly-5,px+15,ly-5,px+16,ly+5,px+6,ly+5],'rgba(255,226,160,.92)','#4a2e18',1)}
  if(Math.hypot(me.x-x,me.y-y)<260){g.font='bold 11px system-ui';g.textAlign='center';const lb='🏠 ลานเต็นท์ส่วนตัว',tw=g.measureText(lb).width+18;g.fillStyle='rgba(40,24,10,.82)';g.beginPath();g.roundRect(x-tw/2,y-124,tw,18,9);g.fill();g.strokeStyle='rgba(255,210,140,.6)';g.lineWidth=1;g.stroke();g.fillStyle='#ffe6b0';g.fillText(lb,x,y-111)}
  g.restore()};
