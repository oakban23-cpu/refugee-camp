/* ===== v514 ผู้กลืนราก วาดใหม่ — หัวใจแกนพิภพกลายพันธุ์ห่อเปลือกบะซอลต์ ปากแนวตั้งฟันลาวา ตาบนก้านราก กำหัวใจครึ่งดวงไว้ในมือราก
   ครอบ gxDevourer (ตัวที่ drawBossAnim เรียกตอนรัน ภายใต้สเกล ×3) → ยกเลิกสเกลแล้ววาดเป็นพิกเซลจริง · เฟส 3 (gxAvatar) คงเดิม
   RTPK.c = รอยร้าวก่อนลอกเปลือก · RTPK.k = ลอกเปลือก → ร่างแกนหลอมเหลว · error → วาดแบบเดิม ===== */
const DVV={on:1,err:''};
function dvRock(W,x,y,s,rot,c){g.save();g.translate(x,y);g.rotate(rot);vS(W,[[-s,-s*.5],[-s*.4,-s*1.1],[s*.5,-s],[s,-s*.2],[s*.7,s*.8],[-s*.5,s*.9]],c||'rgb(58,42,32)',1,1.6);if(!W)vK(W,[[-s*.9,-s*.5],[-s*.4,-s],[s*.4,-s*.9]],'rgba(255,255,255,.18)',1.8);g.restore()}
/* หนวด/แขนเรียวตามเส้นโค้งกำลังสอง (กันขาดตรงข้อแบบ vLimb) */
function dvTent(W,x0,y0,cx,cy,x1,y1,w0,w1,c){const N=7,L=[],R=[];for(let i=0;i<=N;i++){const t=i/N,u=1-t,x=u*u*x0+2*u*t*cx+t*t*x1,y=u*u*y0+2*u*t*cy+t*t*y1,dx=2*u*(cx-x0)+2*t*(x1-cx),dy=2*u*(cy-y0)+2*t*(y1-cy),d=Math.hypot(dx,dy)||1,w=(w0+(w1-w0)*t)/2;L.push([x-dy/d*w,y+dx/d*w]);R.unshift([x+dy/d*w,y-dx/d*w])}
  const dx=x1-cx,dy=y1-cy,d=Math.hypot(dx,dy)||1;vS(W,[...L,['q',x1+dx/d*w1*.8,y1+dy/d*w1*.8,R[0][0],R[0][1]],...R.slice(1)],c,1,2)}
function dvV(T,W,br,sw,up,cf){const P2=RTPK.k,CR=RTPK.c,core=P2>.5,bt=Math.pow(Math.max(0,Math.sin(T*5.2)),6),ga=g.globalAlpha,
    fy=-8+br*2+Math.sin(T*1.2)*5-P2*16,op=.35+.25*Math.sin(T*1.7)+cf*.5+P2*.4,B=fy,BK='rgb(69,40,26)',BK2='rgb(85,51,30)',BKd='rgb(42,23,14)',MG=core?'255,196,110':'255,130,40',
    vein=a=>'rgba('+(core?'255,200,120':'255,120,40')+','+a+')';
  const NR=core?9:6,rk=f=>{for(let i=0;i<NR;i++){const a=T*(.6+P2*.5)+i*6.283/NR,d=Math.sin(a);if(f?d<-.1:d>=-.1)continue;dvRock(W,Math.cos(a)*(196+P2*40),B-130+d*40,12+(i%3)*3,T*1.2+i)}};
  if(CR>0&&P2<1)g.translate(Math.sin(T*70)*CR*5,Math.cos(T*63)*CR*2.4);
  /* บ่อลาวาที่ฐาน */
  bvAdd(W,()=>glowAt(0,20,260,'255,110,30',.3+.08*Math.sin(T*2)+P2*.18));
  bvDE(0,0,36,210,54,'#1e0c06');
  {let gr=DVV.pg;if(!gr){gr=DVV.pg=g.createRadialGradient(0,0,8,0,0,190);gr.addColorStop(0,'#fff0b0');gr.addColorStop(.3,'#ffa030');gr.addColorStop(.75,'#d8460e');gr.addColorStop(1,'#6a1404')}
    g.save();g.translate(0,30);g.scale(1,.235);g.fillStyle=gr;g.beginPath();g.arc(0,0,190,0,7);g.fill();
    if(!LOWQ){g.strokeStyle='rgba(255,236,170,.55)';g.lineWidth=4;for(let i=0;i<3;i++){const r=70+i*40+((T*26)%40);g.globalAlpha=ga*Math.max(0,1-r/190);g.beginPath();g.arc(0,0,r,0,7);g.stroke()}g.globalAlpha=ga}g.restore()}
  for(let i=0;i<7;i++){const a=3.35+i*.45,s=12+((i*7)%4)*3;dvRock(0,Math.cos(a)*198,32+Math.sin(a)*50,s,i*.9,'rgb(51,36,30)')}
  /* หินลอยด้านหลัง */
  rk(0);
  if(P2>0)bvAdd(W,()=>{glowAt(0,B-130,290,'255,80,20',(.2+.08*bt)*P2);glowAt(0,40,220,'255,130,40',.22*P2)});
  /* หนวดรากปลายหลอมเหลว 8 เส้น */
  for(let i=7;i>=0;i--){const s=i%2?1:-1,k=i>>1,a=Math.sin(T*1.5+i*1.1),bx=s*(50+k*12),by=B-160+k*38,ex=s*(184+k*14)+a*18,ey=B-262+k*70+Math.cos(T*1.3+i)*14,mx=(bx+ex)/2+s*10,my=Math.min(by,ey)-60+k*16;
    dvTent(W,bx,by,mx,my,ex,ey,32-k*4,11-k*1.5,k%2?BK:BK2);if(!W&&k<2)vK(W,[[bx,by],['q',mx,my,ex,ey]],vein(.45+.25*Math.sin(T*2.4+i)),2.6);
    bvE(W,ex,ey,10-k,10-k,core?'#ffd27a':'#ff8a3a',1.6);bvAdd(W,()=>glowAt(ex,ey,32,MG,.8))}
  /* รากปักลงลาวา */
  for(let i=-2;i<=2;i++){const ex=i*74+Math.sin(i*2.1)*10;dvTent(W,i*22,B-40,i*54,10,ex,42,34-Math.abs(i)*3,9,i%2?BKd:BK);bvAdd(W,()=>glowAt(ex,40,22,'255,170,70',.6))}
  /* ก้อนหัวใจหลัก (สองพู) */
  const HB=[[0,B-266],['q',-64,B-272,-104,B-234],['q',-146,B-194,-136,B-128],['q',-130,B-54,-66,B-16],['q',-28,B+10,0,B+14],['q',28,B+10,66,B-16],['q',130,B-54,136,B-128],['q',146,B-194,104,B-234],['q',64,B-272,0,B-266]];
  let bc='#5a2414';if(!W){bc=g.createRadialGradient(-34,B-160,10,0,B-110,170);bc.addColorStop(0,'#8a4224');bc.addColorStop(.5,'#5a2414');bc.addColorStop(1,'#220c06')}
  vS(W,HB,bc,1,3);
  if(!W){if(P2>0){const cc=g.createRadialGradient(-30,B-160,10,0,B-110,170);cc.addColorStop(0,'#ffe08a');cc.addColorStop(.35,'#f07a26');cc.addColorStop(.75,'#a8320c');cc.addColorStop(1,'#4a1206');g.save();g.globalAlpha=ga*P2;vD(0,HB,cc);g.restore()}
    /* เส้นเลือดลาวา */g.lineCap='round';g.strokeStyle=vein(.5+.4*(core?bt:(Math.sin(T*2.4)*.5+.5)));g.lineWidth=3.4+P2*2.4;
    g.beginPath();for(let i=0;i<7;i++){const x0=-90+i*30,e=Math.abs(i-3);g.moveTo(x0*.8,B-250+e*e*3);g.bezierCurveTo(x0+26,B-172,x0-30,B-92,x0*.7+6,B-4)}g.stroke();
    bvAdd(W,()=>glowAt(0,B-120,130,MG,.16+P2*.25+bt*.1))}
  /* เปลือกหินบะซอลต์ (เฟส 1) · ร้าว → ลอกปลิว */
  const PL=[[-80,-184,34],[-22,-226,26],[42,-214,30],[94,-170,32],[-106,-118,30],[108,-108,30],[-82,-60,32],[80,-56,32],[-38,-26,26],[36,-24,26],[-60,-140,24],[60,-136,24]];
  if(P2<1){g.save();g.globalAlpha=ga*(1-P2);
    PL.forEach(([px,py,r],i)=>{const cx=px+px*P2*1.6+Math.sin(T*50+i)*CR*1.6,cy=B+py+py*P2*.4-P2*90,pts=[];g.save();g.translate(cx,cy);g.rotate(P2*(i%2?3:-3));
      for(let k=0;k<7;k++){const a=k*.8976+i*.7,rr=r*(.78+((i*13+k*7)%5)*.08);pts.push([Math.cos(a)*rr,Math.sin(a)*rr*.8])}
      vS(W,pts,'#3c322e',1,2.2);if(!W){const n=pts.length;let tp=0;for(let k=1;k<n;k++)if(pts[k][1]<pts[tp][1])tp=k;vK(W,[pts[(tp+n-1)%n],pts[tp],pts[(tp+1)%n]],'rgba(255,255,255,.2)',2.6)}
      if(CR>0&&P2<.05&&!W){vP(pts);g.strokeStyle='rgba(255,226,150,'+(.3+.6*CR)+')';g.lineWidth=1.4+CR*1.6;g.stroke()}
      g.restore()});
    /* รากพันรอบตัว */for(const s of[-1,1]){vK(W,[[s*126,B-176],['q',s*92,B-120,s*116,B-44]],BKd,12);vK(W,[[s*126,B-176],['q',s*92,B-120,s*116,B-44]],BK2,7);vK(W,[[s*100,B-232],['q',s*60,B-214,s*40,B-236]],BK2,8)}
    g.restore()}
  if(CR>0&&P2<1)bvAdd(W,()=>{g.strokeStyle='rgba(255,240,190,'+(.35+.6*CR)+')';g.lineWidth=2+CR*3;for(let i=0;i<10;i++){const an=i*.628+.3,L=CR*150;g.beginPath();g.moveTo(0,B-124);g.lineTo(Math.cos(an)*L*.5+Math.sin(i*3)*10,B-124+Math.sin(an)*L*.45);g.lineTo(Math.cos(an+.2)*L,B-124+Math.sin(an+.2)*L*.85);g.stroke()}glowAt(0,B-124,130,'255,220,150',.15+.55*CR)});
  /* มงกุฎเปลวไฟ (ร่างแกน) ปะทุจากยอดโดม */
  if(P2>0)for(const i of[-3,3,-2,2,-1,1,0]){const x=i*28,y=B-262+Math.pow(x/104,2)*34;vFlame(W,x,y+8,34-Math.abs(i)*2,(70+(3-Math.abs(i))*30)*P2*(1+.15*Math.sin(T*9+i*1.7)),T,i*1.7)}
  /* ตาบนก้านราก 5 ดวง */
  for(let i=0;i<5;i++){const s=i-2,bx=s*30,by=B-212+Math.abs(s)*12,ex=bx+s*18+Math.sin(T*2+i)*7,ey=by-62-(2-Math.abs(s))*16+Math.cos(T*1.7+i)*6,px=ex+Math.sin(T*.9)*2.4;
    dvTent(W,bx,by,bx+s*4,by-40,ex,ey+8,16,8,BK2);bvE(W,ex,ey,14,14,'#f0dcc0',2);
    if(((T*.4+i*.21)%1)<.05)vK(W,[[ex-13,ey],['q',ex,ey+5,ex+13,ey]],'#3a1a0a',3);else{vEye(W,px,ey,7,8.5,core?'#fff0a0':'#ff5a10',0);vD(W,[[px-1.6,ey-6.5],[px+1.6,ey-6.5],[px+1.6,ey+6.5],[px-1.6,ey+6.5]],'#1a0402');bvAdd(W,()=>glowAt(ex,ey,20,core?'255,240,160':'255,90,20',.5))}}
  /* เศษเปลือกปลิว */
  if(P2>0&&P2<1){g.save();g.globalAlpha=ga*(1-P2);for(let i=0;i<12;i++){const an=i*.5236+.2,d=60+P2*330,x=Math.cos(an)*d,y=B-124+Math.sin(an)*d*.7-Math.sin(P2*Math.PI)*90;dvRock(W,x,y,16,P2*8+i,'#3c322e')}g.restore()}
  /* ปากแนวตั้ง ฟันลาวา */
  {const my=B-128,mh=(80+op*24)*(1+P2*.25),mw=(16+op*22)*(1+P2*.6);
    let mc='#1a0402';if(!W){mc=g.createRadialGradient(0,my,2,0,my,mh);mc.addColorStop(0,core?'#fff2c0':'#ff9a3a');mc.addColorStop(.25,core?'#ff9a30':'#c8400e');mc.addColorStop(.6,'#3a0804');mc.addColorStop(1,'#120202')}
    vS(W,[[0,my-mh],['q',mw*2.1,my,0,my+mh],['q',-mw*2.1,my,0,my-mh]],mc,1,2.2);bvAdd(W,()=>glowAt(0,my,72,MG,.45+P2*.3));
    g.beginPath();for(let i=0;i<9;i++){const q=(i+.5)/9,yy=my-mh+q*mh*2,xx=Math.sin(q*Math.PI)*mw*1.02,tl=Math.min(8+Math.sin(q*Math.PI)*13,xx*.7+3);for(const s of[-1,1]){g.moveTo(s*xx,yy-6);g.lineTo(s*xx,yy+6);g.lineTo(s*(xx-tl),yy+1);g.closePath()}}g.fillStyle=W?'#fff':core?'#ffe6b0':'#e8d2b0';g.fill();g.lineWidth=1.2;g.strokeStyle=V1.O;g.stroke();
    for(const s of[-1,1]){const bx=s*(mw*1.3+26),by=my-mh*.62,tx=s*(mw*.35+4),ty=my+mh*.98,cx=s*(mw*2.3+70+op*16),cy=my+mh*.15;
      dvTent(W,bx,by,cx,cy,tx,ty,34,5,core?'#6a3020':'#4a3a32');if(!W)vK(W,[[bx+s*8,by],['q',cx-s*14,cy,tx,ty]],'rgba(255,255,255,.14)',3);
      g.beginPath();for(let k=1;k<5;k++){const t=k/5.2,u=1-t,qx=u*u*bx+2*u*t*cx+t*t*tx,qy=u*u*by+2*u*t*cy+t*t*ty,dx=2*u*(cx-bx)+2*t*(tx-cx),dy=2*u*(cy-by)+2*t*(ty-cy),d=Math.hypot(dx,dy)||1,nx=dy/d*s,ny=-dx/d*s,w=(34+(5-34)*t)/2;
        g.moveTo(qx+nx*w*.9-dx/d*5,qy+ny*w*.9-dy/d*5);g.lineTo(qx+nx*(w+13),qy+ny*(w+13));g.lineTo(qx+nx*w*.9+dx/d*5,qy+ny*w*.9+dy/d*5);g.closePath()}g.fillStyle=W?'#fff':'#e8d6b8';g.fill();g.lineWidth=1.2;g.strokeStyle=V1.O;g.stroke()}
    if(!W)for(let i=0;i<3;i++){const q=(T*.5+i*.33)%1;g.fillStyle='rgba(255,'+(140+i*30)+',50,'+(1-q)+')';g.beginPath();g.ellipse((i-1)*8,my+mh+q*70,4.6-q*2,7-q*2,0,0,7);g.fill()}}
  /* ตาฝังรอบปาก */
  for(let i=0;i<4;i++){const s=i%2?1:-1,k=i>>1,ex=s*(70+k*10),ey=B-188+k*112,bl=((T*.35+i*.17)%1)<.06;
    bvE(W,ex,ey,14,10,core?'#6a1e08':'#2a120a',1.8);if(bl)vK(W,[[ex-11,ey],['q',ex,ey+4,ex+11,ey]],'#1a0804',2.4);else{vEye(W,ex,ey,10.5,7.5,'#f2e2c4',0);vD(W,[[ex-1.8,ey-6.4],[ex+1.8,ey-6.4],[ex+1.8,ey+6.4],[ex-1.8,ey+6.4]],core?'#c84008':'#1a0604');bvAdd(W,()=>glowAt(ex,ey,16,MG,.4))}}
  /* แขนรากกำหัวใจครึ่งดวง (ร่ายสกิล → ยกหัวใจขึ้นป้อนปาก) */
  {const lift=Math.max(0,up)*4.4,hy=B-34-lift,hr=46*(1+bt*.1),hx=hr*.5;
    bvAdd(W,()=>glowAt(0,hy,116,'255,214,120',.5+.3*bt+cf*.3));
    for(const s of[-1,1]){dvTent(W,s*118,B-150,s*206,B-50-lift*.3,s*62,hy+10,40,24,BKd);if(!W){vK(W,[[s*118,B-150],['q',s*206,B-50-lift*.3,s*62,hy+10]],vein(.55),3);vK(W,[[s*126,B-160],['q',s*218,B-60-lift*.3,s*70,hy-2]],'rgba(255,220,180,.16)',3)}}
    let hc='#ffd050';if(!W){hc=g.createRadialGradient(hx-hr*.7,hy-hr*.3,2,hx-hr*.5,hy,hr*1.2);hc.addColorStop(0,'#fff6c8');hc.addColorStop(.4,'#ffc634');hc.addColorStop(1,'#c0640c')}
    const HP=[];for(let i=0;i<=12;i++){const t=Math.PI+i/12*Math.PI,x=16*Math.pow(Math.sin(t),3),y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));HP.push([hx+x*hr/16,hy+y*hr/16-hr*.1])}
    const top=HP[HP.length-1],bot=HP[0];const JG=[[hx+5,top[1]+hr*.18],[hx-6,top[1]+hr*.42],[hx+7,top[1]+hr*.66],[hx-4,top[1]+hr*.9],[hx+6,top[1]+hr*1.12]];
    const HPL=[...HP.slice().reverse(),...JG.slice().reverse()];vS(W,HPL,hc,1,2.4);
    if(!W){vK(W,[top,...JG,bot],'rgba(255,250,210,.95)',2.4);vK(W,[[hx-hr*.9,hy-hr*.55],['q',hx-hr*.75,hy-hr*.95,hx-hr*.35,hy-hr*.8]],'rgba(255,255,255,.85)',4);for(let k=0;k<3;k++)vK(W,[[hx-hr*.2,hy-hr*.4+k*hr*.3],[hx-hr*.7+k*6,hy-hr*.1+k*hr*.3]],'rgba(200,110,20,.5)',1.6)}
    bvAdd(W,()=>{g.strokeStyle='rgba(255,236,160,'+(.5+.4*bt)+')';g.lineWidth=2.4;for(let i=0;i<8;i++){const a=i*.785+T*.6,r0=hr*1.25,r1=hr*(1.6+.25*Math.sin(T*4+i));g.beginPath();g.moveTo(Math.cos(a)*r0,hy+Math.sin(a)*r0*.9);g.lineTo(Math.cos(a)*r1,hy+Math.sin(a)*r1*.9);g.stroke()}});
    for(const s of[-1,1])for(let k=0;k<2;k++)dvTent(W,s*62,hy+10,s*(52-k*6),hy-30+k*30,s*(20-k*3),hy-16+k*30,13,5,BK2)
    if(cf>0)bvAdd(W,()=>{for(let i=0;i<10;i++){const a=i*.628+T*2,r=(1-cf)*30+60;glowAt(Math.cos(a)*r,hy+Math.sin(a)*r*.6,8,'255,220,140',.8*cf)}})}
  /* หินลอยด้านหน้า */
  rk(1);
  /* เถ้าถ่านลอย */
  bvAdd(W,()=>{for(let i=0;i<10;i++){const q=(T*.3+i/10)%1;glowAt(-150+((i*67)%300),40-q*330,6,'255,150,60',.7*Math.sin(q*Math.PI))}})}
{const _dv0=gxDevourer;gxDevourer=function(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){if(DVV.on&&!BV1.off){const r0=MPC.rich,o0=V1.O;MPC.rich=0;V1.O=BV.O;g.save();let ok=0;
  try{g.translate(0,30);g.scale(1/3,1/3);g.translate(0,-30);dvV(T,W,br,sw,up,cf||0);ok=1}catch(e){DVV.err=String(e&&e.stack||e).slice(0,300)}finally{g.restore();MPC.rich=r0;V1.O=o0}if(ok)return}
  return _dv0.apply(this,arguments)}}
