
/* ===== v472 · บอสประจำแมพ 28 สวนลอยแห่งราชินี / 29 ห้องบัลลังก์ดาว แยกตัวไม่ซ้ำกัน =====
   เดิม: ทั้งสองแมพคัดลอกบอส «ผู้สำเร็จราชการเวล» จากพระราชวัง (ตั้ง mvpOnly → ไม่เคยเกิดจริงในสนาม เห็นได้แค่ปุ่ม GM / แกลเลอรี)
   ใหม่: แต่ละแมพมีบอสของตัวเอง เกิดจริงในสนามตามรอบเหมือนบอสแมพอื่น วางในโซนที่เรื่องเล่ารองรับ
   28 โรซาลีน · พฤกษาหนามเงิน — กลางเขาวงกตกุหลาบ (กุหลาบของราชินีที่ถูกแสงเงินกลืน · แกนดาวเต้นตามหัวใจใต้บัลลังก์)
   29 ราชาหุ่นเชิดองค์สุดท้าย — สุสานราชาหุ่นเชิด (กษัตริย์หลังโอเรียนเป็นแค่หุ่น · สายแสงดาวโยงขึ้นไม้บังคับเหนือหัว)
   + กันเควส «ล้มบอส» ในแมพที่บอสไม่มีวันเกิด (แปลงเป็นเควสมอนตัวแข็ง)
   + ศึกบ้านกิลด์ยังอิงค่าพลังเวลเท่าเดิม (ghrBossDef เคยหยิบสำเนาเวลจากแมพ 28/29) */
const RB28={x:860,y:1160,n:'โรซาลีน · พฤกษาหนามเงิน',hp:1600000,xp:110000,L:22,rm:4,lg:.9,g:30000,dm:30,tn:9,sm:3,sL:104,col:'#ffc0d8',bar:'#c84a8a',ln:'#ffe0ec',rec:'Lv 99 (ปาร์ตี้)',pos:'กลางเขาวงกตกุหลาบทางตะวันตก',rb:28};
const RB29={x:800,y:1540,n:'ราชาหุ่นเชิดองค์สุดท้าย',hp:1900000,xp:125000,L:22,rm:4,lg:.9,g:36000,dm:34,tn:9,sm:3,sL:108,col:'#d8c8ff',bar:'#4a3a9a',ln:'#ffe8b0',rec:'Lv 99 (ปาร์ตี้)',pos:'ในสุสานราชาหุ่นเชิดทางตะวันตก',rb:29};
let RBVEL=null;
setTimeout(()=>{try{
  for(const [k,D] of [[28,RB28],[29,RB29]]){const M=MAPS[k];if(!M)continue;if(!RBVEL&&M.boss&&M.boss.n==='ผู้สำเร็จราชการเวล')RBVEL=Object.assign({},M.boss);
    M.boss=Object.assign({},D);M.mvpOnly=0;M.bth=k}
}catch(e){console.warn('rb2829',e)}},0);
const RB2N={};
/* ---------- กันเควสล้มบอสที่ทำไม่ได้ ---------- */
function rbCanBoss(m){const M=MAPS[m];if(!M||!M.boss)return false;const B=M.boss;if(!(B.hp>1)||!(B.x>0))return false;if(M.mvpOnly)return !!(typeof MVDEF==='object'&&MVDEF[m]);return true}
genQuest=(f=>function(m){const q=f.apply(this,arguments);try{if(q&&q.t==='boss'&&!rbCanBoss(m)){const K=MAPS[m].qk||1,n=3+(Math.random()*3|0);return{id:q.id,t:'elite',mp:m,n,h:0,x:0,y:0,g:Math.round(n*24*K),xp:Math.round(n*22*K),gr:1}}}catch(e){}return q})(genQuest);
function rbFixQs(){try{if(!me||!Array.isArray(me.qs))return;me.qs.forEach(q=>{if(q&&q.t==='boss'&&q.h<q.n&&MAPS[q.mp]&&!rbCanBoss(q.mp)){q.t='elite';q.n=3;q.h=0}});
  for(const k in boards){const b=boards[k];if(Array.isArray(b))b.forEach(q=>{if(q&&q.t==='boss'&&!rbCanBoss(q.mp)){q.t='elite';q.n=3}})}}catch(e){}}
setInterval(rbFixQs,4000);
/* ---------- ศึกบ้านกิลด์: คงค่าพลังเวลแบบเดิม ---------- */
try{ghrBossDef=(f=>function(){if(!RBVEL)return f.apply(this,arguments);const a=MAPS[28]&&MAPS[28].boss,b=MAPS[29]&&MAPS[29].boss;
  try{if(MAPS[28])MAPS[28].boss=RBVEL;if(MAPS[29])MAPS[29].boss=RBVEL;return f.apply(this,arguments)}finally{if(MAPS[28])MAPS[28].boss=a;if(MAPS[29])MAPS[29].boss=b}})(ghrBossDef)}catch(e){}

/* ---------- 28 · โรซาลีน พฤกษาหนามเงิน ----------
   กองเถาวัลย์มืดหยั่งรากลงพื้น · หนามเงินเป็นมงกุฎด้านหลัง · ก้านใหญ่ชูดอกกุหลาบยักษ์เป็นหัว
   กลางดอกเป็นแกนดาวสีเงิน มีตาเดียว เต้นตามจังหวะหัวใจ (palHB) · แขนเถาหนาม 2 ข้าง ปลายเป็นดอกตูม
   เลือดต่ำกว่าครึ่ง: กลีบซีด ลายเงินลามเต็มดอก กลีบร่วงหนักขึ้น */
function gxRose(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,low=hf<.5,hb=palHB(T),O='#120c0a';
  const thorn=(x,y,a,L)=>{const c=Math.cos(a),s=Math.sin(a),px=-s*L*.35,py=c*L*.35;g.beginPath();g.moveTo(x+px,y+py);g.lineTo(x+c*L,y+s*L);g.lineTo(x-px,y-py);g.closePath();g.fillStyle=F('#e4e8f4');g.fill()};
  const vine=(p,w,col)=>{g.beginPath();g.moveTo(p[0],p[1]);g.bezierCurveTo(p[2],p[3],p[4],p[5],p[6],p[7]);g.strokeStyle=O;g.lineWidth=w+2.4;g.stroke();g.strokeStyle=F(col);g.lineWidth=w;g.stroke()};
  const bz=(p,t)=>{const u=1-t;return[u*u*u*p[0]+3*u*u*t*p[2]+3*u*t*t*p[4]+t*t*t*p[6],u*u*u*p[1]+3*u*u*t*p[3]+3*u*t*t*p[5]+t*t*t*p[7]]};
  /* รากแผ่บนพื้น */
  for(let i=0;i<7;i++){const a=Math.PI*(i/6),dx=Math.cos(a)*(56+(i%2)*16),p=[0,24,dx*.4,30,dx*.8,22+(i%3)*4,dx,30+(i%2)*3];vine(p,3.2,'#24402a');if(!W&&i%2===0){const q=bz(p,.7);thorn(q[0],q[1],-Math.PI/2,5)}}
  /* มงกุฎหนามเงินด้านหลัง */
  for(let i=0;i<5;i++){const s=i/4*2-1,bx=s*26,tx=s*56+Math.sin(T*1.2+i)*2,ty=-92-Math.cos(s*1.3)*18;Pg([bx-4.5,-18,tx,ty,bx+4.5,-18],F(low?'#6a7088':'#7a84a4'),1);
    if(!W){g.strokeStyle=low?'#c8ccd8':'#e8ecf8';g.lineWidth=1.2;g.beginPath();g.moveTo(bx-1,-20);g.lineTo(tx,ty);g.stroke();
      for(const t of[.35,.65]){const qx=bx+(tx-bx)*t,qy=-18+(ty+18)*t;thorn(qx,qy,Math.atan2(ty+18,tx-bx)+(i%2?1.4:-1.4),5)}
      g.save();g.globalCompositeOperation='lighter';glowOrb(tx,ty+3,5+hb*7,'225,230,255',.3+.5*hb);g.restore()}}
  /* กองเถาวัลย์ (ลำตัว) */
  E(0,12,48,22,F('#1a3220'),1);E(-14,4,26,16,F('#24442a'),0);E(16,6,24,15,F('#22402a'),0);
  for(let i=0;i<5;i++){const s=i/4*2-1,p=[s*44,22,s*30,-10,s*-8,-6,s*-22,18];vine(p,4,i%2?'#2e5a34':'#346a3a');if(!W)for(const t of[.3,.6]){const q=bz(p,t);thorn(q[0],q[1],-Math.PI/2+s*.6,5.5)}}
  /* แขนเถาหนาม + ดอกตูม */
  for(const s of[-1,1]){const lift=up*(s>0?1:.6),wv=Math.sin(T*2.2+s)*8,ex=s*(74+Math.sin(T*1.7+s)*4),ey=-38+wv-lift*1.6;
    const p=[s*22,-6,s*46,-6-lift,s*60,-58+wv*.5-lift,ex,ey];vine(p,7.5,'#2e5a34');vine(p,3,'#4a8a4a');
    if(!W)for(const t of[.25,.5,.75]){const q=bz(p,t);thorn(q[0],q[1],-Math.PI/2-s*.4,6);thorn(q[0],q[1],Math.PI/2+s*.2,4.5)}
    Pg([ex-5*s,ey+6,ex,ey-14,ex+5*s,ey+6],F('#3a7a3a'),1);E(ex,ey-4,6,8,F(low?'#b88aa0':'#d84a7e'),1);if(!W){E(ex-1.5*s,ey-7,2.4,3,'#ff9ac0',0)}}
  /* ก้านชูดอก + ใบ */
  const hx=Math.sin(T*1.1)*3,hy=-64+br-up*.3;
  vine([0,8,-10,-14,10,-36,hx,hy+16],10,'#2e5a34');if(!W){thorn(-4,-16,Math.PI,6);thorn(5,-30,0,6)}
  for(const s of[-1,1]){g.save();g.translate(s*8,-22);g.rotate(s*(.9+Math.sin(T*1.6+s)*.12));E(s*12,0,13,5.5,F('#3a7a3a'),1);Ln([0,0,s*22,0],F('#2a5a2a'),1);g.restore()}
  /* ดอกกุหลาบยักษ์ (หัว) */
  g.save();g.translate(hx,hy);g.scale(1.3,1.3);g.translate(-hx,-hy);
  {const op=1+cf*.28+.05*hb,c1=low?'#9a5a78':'#b83a6a',c2=low?'#c08aa2':'#e0608e',c3=low?'#e8c0d0':'#ff9cc0';
    if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(hx,hy,40*op,'255,170,210',.18+.1*hb);g.restore()}
    for(let i=0;i<9;i++){const a=i/9*Math.PI*2+T*.15;E(hx+Math.cos(a)*19*op,hy+Math.sin(a)*14*op,13,8.5,F(c1),1,a)}
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2-T*.2+.4;E(hx+Math.cos(a)*12*op,hy+Math.sin(a)*9*op,9.5,6.5,F(c2),1,a)}
    for(let i=0;i<5;i++){const a=i/5*Math.PI*2+T*.3;E(hx+Math.cos(a)*6*op,hy+Math.sin(a)*4.5*op,6,4.5,F(c3),0,a)}
    /* ลายเงินลามบนกลีบ */
    if(!W){g.strokeStyle='rgba(235,240,255,'+(low?.85:.5)+')';g.lineWidth=1.1;const nV=low?9:5;for(let i=0;i<nV;i++){const a=i/nV*Math.PI*2+.3,r1=7,r2=(low?28:20)*op;g.beginPath();g.moveTo(hx+Math.cos(a)*r1,hy+Math.sin(a)*r1*.75);g.quadraticCurveTo(hx+Math.cos(a+.25)*r2*.6,hy+Math.sin(a+.25)*r2*.5,hx+Math.cos(a)*r2,hy+Math.sin(a)*r2*.72);g.stroke()}}
    /* แกนดาวเงิน + ตาเดียว */
    if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(hx,hy,12+hb*9+cf*10,'230,236,255',.55+.4*hb);g.restore()}
    g.fillStyle=W?'#fff':'#f4f6ff';PST(g,hx,hy,7+hb*2,3,4,T*.4);g.fill();
    if(!W){const bl=Math.sin(T*.7)>.96?.2:1;E(hx,hy,2.2,4.6*bl,'#3a0a2a',0);E(hx+.8,hy-1.6*bl,.8,.8,'#fff',0)}}
  g.restore();
  /* กลีบร่วง */
  if(!W){for(let i=0;i<(low?9:5);i++){const q=(T*.32+i/7)%1,px=hx+Math.sin(i*2.3+T*.8)*(26+i*5),py=hy+q*96;g.globalAlpha=1-q;E(px,py,3.2,1.8,i%2?'#ff9cc0':'#e8ecff',0,T*2+i);g.globalAlpha=1}}}
RB2N['โรซาลีน · พฤกษาหนามเงิน']=gxRose;

/* ---------- 29 · ราชาหุ่นเชิดองค์สุดท้าย ----------
   หุ่นกระเบื้องเคลือบในฉลองพระองค์สีกรมท่าปักดาวทอง · ข้อต่อลูกกลมสีทอง · ลอยเท้าไม่ติดพื้น
   สายแสงดาวโยงจากศีรษะ/มือ ขึ้นไปไม้บังคับรูปกากบาทเหนือหัว (มือของโอเรียน) · มงกุฎดาวเอียง · คทาดาวมือขวา
   หน้ากากยิ้มนิ่ง แก้มชมพู มีรอยร้าว · เลือดต่ำกว่าครึ่ง: สายมือซ้ายขาด แขนห้อย รอยร้าวกว้าง เศษกระเบื้องหลุด */
function gxPuppet(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,low=hf<.5,O='#120c0a';g.save();g.translate(0,30);g.scale(1.15,1.15);g.translate(0,-30);
  const fy=-10+Math.sin(T*1.25)*4,sa=Math.sin(T*.9)*.05,bx=Math.sin(T*.9)*6,by=-158+Math.sin(T*1.25+.6)*3;
  const ball=(x,y,r)=>{E(x,y,r,r,F('#d8b050'),1);if(!W)E(x-r*.35,y-r*.35,r*.35,r*.35,'#fff4c8',0)};
  const seg=(x1,y1,x2,y2,w)=>{Ln([x1,y1,x2,y2],O,w+2.4);Ln([x1,y1,x2,y2],F('#efe8dc'),w)};
  /* ตำแหน่งข้อต่อ */
  const hd=[0,-92+fy],sh=[[-24,-60+fy],[24,-60+fy]];
  const rH=[40+Math.sin(T*1.6)*3,-40+fy-up*1.4],rE=[34,-46+fy-up*.6];
  const lH=low?[-30,-6+fy+Math.sin(T*2.4)*2]:[-44+Math.sin(T*1.4)*4,-52+fy-up*.8+Math.sin(T*1.9)*5],lE=low?[-29,-30+fy]:[-38,-48+fy-up*.3];
  /* ไม้บังคับ (มือของโอเรียน) */
  {const L=[bx-46,by],R=[bx+46,by],Tp=[bx,by-16],Bt=[bx,by+14];
    if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(bx,by,34+cf*16,'220,200,255',.22+cf*.3);g.restore()}
    Ln([L[0],L[1],R[0],R[1]],O,7);Ln([L[0],L[1],R[0],R[1]],F('#3a2a5a'),5);Ln([Tp[0],Tp[1],Bt[0],Bt[1]],O,7);Ln([Tp[0],Tp[1],Bt[0],Bt[1]],F('#3a2a5a'),5);
    for(const p of[L,R,Tp]){E(p[0],p[1],3.4,3.4,F('#d8b050'),1)}
    if(!W){g.fillStyle='#fff0c0';PST(g,bx,by,6+Math.sin(T*3)*1,2.6,4,T*.5);g.fill()}
    /* สายแสงดาว */
    const str=(a,b,on)=>{if(W){Ln([a[0],a[1],b[0],b[1]],'#fff',1);return}g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(215,200,255,'+(.35+cf*.5)+')';g.lineWidth=3;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();g.strokeStyle='rgba(255,250,235,'+(.75+cf*.25)+')';g.lineWidth=.9;g.stroke();
      const q=(T*.6+a[0]*.01)%1;glowOrb(a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q,3.5,'230,220,255',.9);g.restore()};
    str(Tp,[hd[0],hd[1]-26]);str(R,rH);if(!low)str(L,lH);else{/* สายขาด ห้อยลงมา */const sx=L[0],sy=L[1];if(!W){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(215,200,255,.5)';g.lineWidth=1.2;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(sx-6+Math.sin(T*2)*5,sy+30,sx-2+Math.sin(T*2.6)*8,sy+52);g.stroke();g.restore()}
      if(!W){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(215,200,255,.45)';g.lineWidth=1.1;g.beginPath();g.moveTo(lH[0],lH[1]);g.lineTo(lH[0]+Math.sin(T*2.2)*4,lH[1]-22);g.stroke();g.restore()}}
    str(Bt,[0,-28+fy])}
  g.save();g.translate(0,fy);g.rotate(sa);g.translate(0,-fy);
  /* เท้ากระเบื้องห้อย */
  for(const s of[-1,1]){const fx=s*9+Math.sin(T*1.25+s)*2.4,fyy=24+fy+Math.sin(T*2.5+s)*1.5;seg(s*8,10+fy,fx,fyy-4,5);E(fx+s*2,fyy,6,3.4,F('#2a2050'),1);ball(s*8,10+fy,3.2)}
  /* ผ้าคลุมหลัง */
  {const cs=Math.sin(T*1.1)*4;Pg([-26,-62+fy,26,-62+fy,44+cs,22+fy,22,16+fy,0,22+fy,-22,16+fy,-44-cs,22+fy],F('#2a1a5a'),1);
    if(!W){g.fillStyle='rgba(255,226,150,.85)';for(let i=0;i<12;i++){g.beginPath();g.arc(-34+(i*19)%68,-40+fy+(i*29)%58,1.1,0,7);g.fill()}}}
  /* ฉลองพระองค์ */
  Pg([-20,-62+fy,20,-62+fy,30,14+fy,-30,14+fy],F('#1e2258'),1);Pg([-7,-62+fy,7,-62+fy,10,14+fy,-10,14+fy],F('#d8b050'),0);
  if(!W){g.fillStyle='#1e2258';PST(g,0,-34+fy,6.5,2.8,4,0);g.fill();g.strokeStyle='#d8b050';g.lineWidth=1.2;g.beginPath();g.moveTo(-28,8+fy);g.lineTo(28,8+fy);g.stroke();
    g.fillStyle='rgba(255,226,150,.9)';for(let i=0;i<6;i++){PST(g,-22+i*8.8,1+fy+(i%2)*3,2.2,.9,4,0);g.fill()}}
  Ln([-22,-18+fy,22,-18+fy],F('#d8b050'),3);E(0,-18+fy,4,3.4,F('#a83a5a'),1);
  /* ปกคอขนสัตว์ */
  E(0,-62+fy,26,7,F('#f4f0f8'),1);if(!W){g.fillStyle='#1a1424';for(let i=0;i<5;i++)g.fillRect(-18+i*9,-63+fy+(i%2),1.6,2.4)}
  /* แขน (ไหล่-ศอก-มือ) */
  seg(sh[1][0],sh[1][1],rE[0],rE[1],6);seg(rE[0],rE[1],rH[0],rH[1],5);ball(sh[1][0],sh[1][1],5.2);ball(rE[0],rE[1],4);
  seg(sh[0][0],sh[0][1],lE[0],lE[1],6);seg(lE[0],lE[1],lH[0],lH[1],5);ball(sh[0][0],sh[0][1],5.2);ball(lE[0],lE[1],4);
  E(lH[0],lH[1],4.2,4.6,F('#efe8dc'),1);
  /* คทาดาว (มือขวา) */
  {const tx=rH[0]+4,ty=rH[1]-56;Ln([rH[0]-2,rH[1]+26,tx,ty],O,5);Ln([rH[0]-2,rH[1]+26,tx,ty],F('#d8b050'),3);E(rH[0],rH[1],4.4,4.8,F('#efe8dc'),1);
    if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(tx,ty-6,13+cf*14+Math.sin(T*4)*2,'240,225,255',.75+cf*.25);g.restore()}g.fillStyle=W?'#fff':'#fff6dc';PST(g,tx,ty-6,10+cf*4,4,5,T*.6);g.fill()}
  /* คอ + ศีรษะหน้ากากกระเบื้อง */
  ball(0,-70+fy,4.2);
  {const [x,y]=hd,tilt=Math.sin(T*.8)*.08+(low?.12:0);g.save();g.translate(x,y);g.rotate(tilt);
    E(0,0,14,17,F('#f4eee4'),1);if(!W){E(-4,-6,6,4,'rgba(255,255,255,.55)',0)}
    if(!W){g.fillStyle='rgba(232,140,165,.55)';g.beginPath();g.arc(-7.5,4,3.2,0,7);g.arc(7.5,4,3.2,0,7);g.fill()}
    E(-5.2,-2,3.4,2.4,F('#140c22'),0);E(5.2,-2,3.4,2.4,F('#140c22'),0);eye(-5.2,-2,1.3,1.3,low?'#ff9a7a':'#ffe08a');eye(5.2,-2,1.3,1.3,low?'#ff9a7a':'#ffe08a');
    if(!W){g.strokeStyle='#5a2a3a';g.lineWidth=1.1;g.beginPath();g.moveTo(-5,8);g.quadraticCurveTo(0,11.5,5,8);g.stroke();g.strokeStyle='#1a1424';g.lineWidth=.8;g.beginPath();g.moveTo(-5.6,-6);g.lineTo(-3,-6.6);g.moveTo(3,-6.6);g.lineTo(5.6,-6);g.stroke();
      /* รอยร้าว */g.strokeStyle='#2a1a2a';g.lineWidth=low?1.5:.9;g.beginPath();g.moveTo(3,-16);g.lineTo(1,-9);g.lineTo(4,-4);g.lineTo(2,3);if(low){g.moveTo(1,-9);g.lineTo(-4,-12);g.moveTo(4,-4);g.lineTo(9,-1)}g.stroke();
      if(low){g.fillStyle='#140c1a';g.beginPath();g.moveTo(8,-11);g.lineTo(13,-8);g.lineTo(11,-2);g.lineTo(7,-5);g.closePath();g.fill()}}
    /* มงกุฎดาว (เอียง) */
    g.rotate(-.18);Pg([-12,-14,-14,-26,-8,-20,-4,-30,0,-21,4,-30,8,-20,14,-26,12,-14],F('#d8b050'),1);Ln([-12,-14,12,-14],F('#a87a20'),2);
    if(!W){for(const [px,py] of[[-14,-27],[-4,-31],[4,-31],[14,-27]]){g.fillStyle='#fff4c8';PST(g,px,py,3,1.2,4,T*.7);g.fill()}E(0,-17,2,2,'#7a5ad8',0)}
    g.restore()}
  g.restore();
  /* หมอกม่วงใต้ชายฉลอง */
  if(!W){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const q=(T*.35+i/5)%1;glowOrb(-26+i*13+Math.sin(T+i)*4,22+fy-q*16,12+q*6,'150,110,230',.28*(1-q))}g.restore()}
  /* ประกายฝุ่นดาวรอบตัว */
  if(!W){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const a=T*.5+i*1.047,r=40+Math.sin(T+i)*6;glowOrb(Math.cos(a)*r,-46+fy+Math.sin(a)*r*.45,3,'230,215,255',.7)}g.restore()}
  g.restore()}
RB2N['ราชาหุ่นเชิดองค์สุดท้าย']=gxPuppet;

/* ---------- ต่อเข้า drawBoss (ตัวเลือกตามชื่อบอส · โครงเดียวกับต้นฉบับ: ออร่าคลั่ง/ร่าย/เงา) ---------- */
drawBoss=(f=>function(x,y,T,B,hf,cf,er){const fn=B&&RB2N[B.n];if(!fn)return f.apply(this,arguments);cf=cf||0;BXY[0]=x;BXY[1]=y;
  const O='#120c0a',W=hf>.3,F=c=>W?'#ffffff':c,tc=BTR[MAPS[curMap]&&MAPS[curMap].bth]||BTR[10];
  const E=(cx,cy,rx,ry,c,st,rot)=>{g.beginPath();g.ellipse(cx,cy,Math.max(.1,rx),Math.max(.1,ry),rot||0,0,7);g.fillStyle=c;g.fill();if(st){g.lineWidth=1.4;g.strokeStyle=O;g.stroke()}};
  const Pg=(p,c,st)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath();g.fillStyle=c;g.fill();if(st){g.lineWidth=1.4;g.strokeStyle=O;g.stroke()}};
  const Ln=(p,c,w)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.strokeStyle=c;g.lineWidth=w;g.stroke()};
  const eye=(ex,ey,w,h,c,rot)=>{g.shadowColor=c;g.shadowBlur=W?0:12;E(ex,ey,w,h,W?'#fff':c,0,rot);g.shadowBlur=0};
  const glowOrb=(ox,oy,rad,c,a)=>{const gr=g.createRadialGradient(ox,oy,0,ox,oy,rad);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(.35,'rgba('+c+','+a+')');gr.addColorStop(1,'rgba('+c+',0)');g.fillStyle=gr;g.beginPath();g.arc(ox,oy,rad,0,7);g.fill()};
  const br=Math.sin(T*2)*2.4,sw=Math.sin(T*3),up=cf*14+Math.sin(T*2.3)*2.6;
  g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';
  try{if(er){const fl=.6+.4*Math.sin(T*18);g.save();g.globalCompositeOperation='lighter';glowOrb(0,-20,78,'255,40,20',.22*fl);g.restore()}
    if(cf>0){g.save();g.globalCompositeOperation='lighter';glowOrb(0,-24,90,tc,.4*cf);g.strokeStyle='rgba('+tc+','+(.8*cf)+')';g.lineWidth=2;g.beginPath();g.ellipse(0,30,60-cf*14,18-cf*4,0,0,7);g.stroke();g.restore()}
    g.fillStyle='rgba(0,0,0,.38)';g.beginPath();g.ellipse(0,30,B.rb===28?58:40,B.rb===28?16:12,0,0,7);g.fill();
    fn(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf)}catch(e){}
  g.restore()})(drawBoss);
/* ชิงช้าของราชินีกลางเขาวงกต: ตอนโรซาลีนยังอยู่ เถาหนามกลืนชิงช้าไว้ (ไม่วาดทับดอกกุหลาบ) · เหลือเสาที่ถูกเถารัดโผล่ด้านหลัง */
try{const _sw=PALK.swing;PALK.swing=function(t,T){try{if(curMap===28&&mons.some(m=>m.t===3&&Math.hypot(m.x-t.x,m.y-t.y)<260))return}catch(e){}return _sw.apply(this,arguments)}}catch(e){}
