
/* ===== v489 · ตัวเสริมภาพ: ระเบิดกลาง q8pop + สกิลที่ 6 ทางเลือก (สายแสง/ทมิฬ) ===== */
function p9Along(x0,y0,x1,y1,n,fn){for(let i=0;i<n;i++){const u=(i+.5)/n;fn(x0+(x1-x0)*u,y0+(y1-y0)*u,u,i)}}
function p9Gear(x,y,R,n,rot,c,a,sq){if(a<=0)return;g.save();g.translate(x,y);g.scale(1,sq||1);g.rotate(rot);g.strokeStyle='rgba('+c+','+a+')';g.lineWidth=2;g.beginPath();
  for(let i=0;i<n;i++){const a0=i*6.2832/n,a1=a0+6.2832/n*.25,a2=a0+6.2832/n*.5,a3=a0+6.2832/n*.75;g.lineTo(Math.cos(a0)*R,Math.sin(a0)*R);g.lineTo(Math.cos(a1)*R*1.16,Math.sin(a1)*R*1.16);g.lineTo(Math.cos(a2)*R*1.16,Math.sin(a2)*R*1.16);g.lineTo(Math.cos(a3)*R,Math.sin(a3)*R)}
  g.closePath();g.stroke();g.lineWidth=1.2;g.beginPath();g.arc(0,0,R*.45,0,6.2832);g.stroke();for(let i=0;i<4;i++){const an=i*1.5708;g.beginPath();g.moveTo(Math.cos(an)*R*.45,Math.sin(an)*R*.45);g.lineTo(Math.cos(an)*R*.85,Math.sin(an)*R*.85);g.stroke()}g.restore()}
function p9Ghost(x,y,s,a,c,an){if(a<=0)return;g.save();g.translate(x,y);g.rotate(an);g.globalAlpha*=a;glowAt(0,0,s*2.2,c,.5);g.fillStyle='rgba('+c+',.7)';g.beginPath();g.arc(s*.4,0,s*.75,-1.5708,1.5708,true);g.quadraticCurveTo(-s*.8,s*.6,-s*2,Math.sin(performance.now()/90)*s*.3);g.quadraticCurveTo(-s*.8,-s*.6,s*.4,-s*.75);g.fill();
  g.fillStyle='rgba(20,0,30,.85)';g.beginPath();g.arc(s*.55,-s*.25,s*.14,0,6.2832);g.arc(s*.55,s*.25,s*.14,0,6.2832);g.fill();g.restore()}
/* ---------- ระเบิดกลาง (ใช้หลายสกิล) ---------- */
P9X.q8pop=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;const u=f.u,col=u==='i'?'170,230,255':u==='h'?'255,215,110':u==='v'?'180,120,255':'255,140,50',big=r>=78,hu=r>=110;
  p9Fl(x,y-8,r*1.15,col,big?380:260);p9Sw(x,y,r*1.05,col,big?520:400,big?7:5);if(big)p9Sw(x,y,r*1.55,col,660,3,.08);
  p9B(x,y,8,big?24:12,{ty:'sk',c:[col,'255,255,255'],sp:[r*1.5,r*3.4],up:[60,240],g:460,s:[1.6,2.8],l:[.3,.6]});
  p9B(x,y,10,big?16:8,{ty:'gl',c:col,sp:[20,r*1.3],up:[30,130],g:-20,dr:1.6,s:[2,4],l:[.5,1.1]});
  if(u==='i')p9B(x,y,6,big?16:8,{ty:'sh',c:['200,240,255','150,210,255'],sp:[r*.8,r*2.2],up:[80,240],g:520,s:[3,5],l:[.5,.9],vr:10});
  else if(u==='v')p9B(x,y,4,big?12:6,{ty:'sm',c:'40,10,70',sp:[r*.5,r*1.2],up:[10,40],dr:1.4,s:[r*.18,r*.26],s1:r*.6,l:[.7,1.1]});
  else p9B(x,y,0,big?10:5,{ty:'ch',c:u==='h'?['200,170,90','150,120,60','230,210,150']:['90,80,70','120,105,90','70,60,52'],sp:[r*.8,r*2],up:[140,280],g:700,bo:.35,s:[2.4,4.4],l:[1,1.6],vr:9});
  if(big&&u!=='i'&&u!=='v')p9B(x,y,4,8,{ty:'sm',c:u==='h'?'120,100,70':'70,60,55',sp:[r*.4,r*1],up:[5,25],dr:1.3,s:[r*.18,r*.26],s1:r*.6,l:[.8,1.3]});
  p9Dec(x,y,r*.8,u==='i'?'frost':u==='h'?'holy':u==='v'?'void':'fire',2600);
  if(big)p9Shk(f,x,y,hu?.32:.2);
  if(u==='h'&&big)p9Beam(x,y,r*.32,340,'255,230,150',.5,{sk:1});
  if(u==='v'&&big)p9Beam(x,y,r*.28,260,'190,120,255',.45);
  if(hu&&(f.by===uid||p9Near(x,y,360)))p9Scr('fl',col,.12,.28)};
/* ================= สายแสง ================= */
/* รอยแยกโลหิต: พุ่ง → รอยแยกเรืองแดง → ปะทุพร้อมเศษหิน/เลือด → หนามซ้ำ */
P9X.q8rift=C=>{const {f,t,x,y}=C,A=f.u==='a',te=A?.45:.6,sx=f.sx,sy=f.sy,an=Math.atan2(y-sy,x-sx);
  if(C.E('c',0)){p9Mark({ty:'line',x:sx,y:sy+4,x2:x,y2:y+4,c:'255,60,50',c0:'40,0,4',w:9,l:(f.d||2.8)+1.2,fo:1});
    if(!A){p9Along(sx,sy,x,y,9,(px,py,u)=>p9B(px,py,12,3,{ty:'sk',c:['255,70,60','255,190,170'],ang:an+3.1416,spr:.7,sp:[60,200],up:[10,60],g:300,s:[1.4,2.4],l:[.2,.4],dl:u*.18}));p9B(sx,sy,10,10,{ty:'sm',c:'90,10,14',sp:[20,60],up:[5,20],dr:1.5,s:[10,14],s1:26,l:[.5,.8]})}}
  if(t<te){const n=C.A('em',60);for(let i=0;i<n;i++){const u=Math.random(),px=sx+(x-sx)*u,py=sy+(y-sy)*u;p9P({ty:'gl',x:px+p9r(-6,6),y:py+4,z:2,vz:p9r(20,70),c:p9pick(['255,60,40','255,120,60']),s:p9r(1.4,2.6),l:p9r(.4,.8),fk:1})}}
  if(C.E('er',te)){const big=!A;p9Along(sx,sy,x,y,big?7:4,(px,py,u,i)=>{p9B(px,py,0,big?4:2,{ty:'ch',c:['80,16,16','120,30,24','60,12,10'],sp:[30,110],up:[160,340],g:760,bo:.3,s:[2.6,4.6],l:[1.1,1.7],vr:10});
      p9B(px,py,6,big?5:3,{ty:'sk',c:['255,80,60','255,220,200'],sp:[20,120],up:[160,380],g:600,s:[1.6,2.6],l:[.35,.65]});p9B(px,py,6,big?3:2,{ty:'bl',c:'150,0,14',sp:[30,110],up:[120,260],g:640,s:[1.2,2.2],l:[1,1.6]});
      if(i%2===0){p9Sw(px,py+4,big?48:36,'255,60,50',420,5,u*.05);p9Dec(px,py+4,big?34:26,'crack',2600)}if(big&&i%3===1)p9B(px,py,4,3,{ty:'sm',c:'70,8,12',sp:[10,40],up:[10,30],dr:1.4,s:[12,16],s1:34,l:[.7,1.1]})});
    if(big)p9Along(sx,sy,x,y,3,(px,py)=>p9Beam(px,py+4,16,170,'255,70,60',.38));else p9Beam(x,y+4,14,120,'255,70,60',.34);p9Fl((sx+x)/2,(sy+y)/2,120,'255,60,50',320);p9Shk(f,(sx+x)/2,(sy+y)/2,big?.36:.24);
    if(f.by===uid){p9Scr('vg','110,0,6',.38,1.1,{in:.05,id:'rift'});p9Scr('fl','255,70,50',.1,.25)}
    if(f.u==='b'){const o=q8Own(f)||{x,y};p9Along(sx,sy,x,y,6,(px,py)=>p9P({ty:'gl',x:px,y:py,z:14,vx:(o.x-px)*1.4,vy:(o.y-py)*1.4,vz:50,g:60,c:'255,110,130',s:3,l:.75,dl:.15}))}}
  if(!A)for(let j=1;j<=4;j++)if(C.E('sp'+j,te+j*.5))p9Along(sx,sy,x,y,5,(px,py)=>{p9B(px,py,8,2,{ty:'bl',c:'160,0,16',sp:[10,60],up:[90,200],g:620,s:[1.4,2.2],l:[.9,1.4]});p9B(px,py,8,2,{ty:'sk',c:'255,90,80',sp:[10,60],up:[120,260],g:500,s:[1.2,2],l:[.25,.45]})})};
/* ธนูกลุ่มดาว: ฟ้ามืด → ดาวตกลงมาที่ดาวแต่ละดวง → ระเบิดเป็นแสงดาว */
P9X.q8cst=C=>{const {f,t,now}=C,L=q8Lp(f).map(q=>[q[0],q[1]-26]),D=f.d||1.15;if(!L.length)return;
  if(C.E('c',0)&&(f.by===uid||p9Near(L[0][0],L[0][1],420))){p9Scr('dim','6,10,36',.34,D+.25,{in:.2,id:'cst'});p9Scr('vg','20,30,90',.3,D+.25,{in:.2,id:'cstv'})}
  {const n=C.A('tw',L.length*7);for(let i=0;i<n;i++){const q=p9pick(L);p9P({ty:'st',x:q[0]+p9r(-22,22),y:q[1]+26+p9r(-8,8),z:26+p9r(-14,24),vz:p9r(4,20),c:'190,215,255',s:p9r(1.2,2.4),l:p9r(.4,.8)})}}
  {const n=C.A('ln',L.length>1?36:0);for(let i=0;i<n;i++){const j=Math.random()*(L.length-1)|0,u=Math.random(),A=L[j],B=L[j+1];p9P({ty:'gl',x:A[0]+(B[0]-A[0])*u,y:A[1]+(B[1]-A[1])*u+60,z:60,vz:p9r(-6,10),c:'200,225,255',s:p9r(1,1.8),l:p9r(.3,.6)})}}
  const met=(t0)=>{if(t<t0-.32||t>t0)return;const q=(t-(t0-.32))/.32;g.save();g.globalCompositeOperation='lighter';L.forEach((P,i)=>{const sx=P[0]+90-i*12,sy=P[1]-340,hx=sx+(P[0]-sx)*q*q,hy=sy+(P[1]-sy)*q*q,tx=sx+(P[0]-sx)*Math.max(0,q*q-.25),ty=sy+(P[1]-sy)*Math.max(0,q*q-.25);
      const gr=g.createLinearGradient(tx,ty,hx,hy);gr.addColorStop(0,'rgba(190,215,255,0)');gr.addColorStop(1,'rgba(235,245,255,.95)');g.strokeStyle=gr;g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(tx,ty);g.lineTo(hx,hy);g.stroke();glowAt(hx,hy,18,'200,225,255',.9);q8Spark4(hx,hy,7,'rgba(255,255,255,1)',1)});g.restore()};
  met(.8);if(f.u==='a')met(1.3);
  const boom=(sc)=>{const B=f.u==='b';L.forEach((P,i)=>{const gx=P[0],gy=P[1]+26;p9Fl(gx,gy-20,B?90:60,'200,225,255',300);p9Sw(gx,gy,(B?70:40)*sc,'190,215,255',460,5,i*.02);
      p9B(gx,gy,26,Math.round(12*sc),{ty:'sk',c:['220,235,255','255,255,255','160,200,255'],sp:[90,260],up:[40,200],g:300,s:[1.4,2.4],l:[.3,.6]});p9B(gx,gy,26,Math.round(8*sc),{ty:'st',c:'200,225,255',sp:[30,120],up:[20,120],g:60,dr:1.5,s:[1.6,2.8],l:[.6,1.1]});
      p9Beam(gx,gy,12*sc,280,'200,225,255',.42,{sk:1});p9Mark({ty:'glow',x:gx,y:gy,r:(B?60:38)*sc,c:'170,205,255',l:1.2,a:.6})});
    for(let i=0;i+1<L.length;i++){const A=L[i],B=L[i+1];p9Along(A[0],A[1],B[0],B[1],5,(px,py)=>p9P({ty:'st',x:px,y:py+60,z:60,vx:p9r(-20,20),vy:p9r(-10,10),vz:p9r(-20,30),g:40,c:'220,235,255',s:p9r(1.4,2.4),l:p9r(.5,.9)}))}
    p9Shk(f,L[0][0],L[0][1],.22*sc+.04);if(f.by===uid)p9Scr('fl','200,225,255',.12*sc,.25)};
  if(C.E('b1',.8))boom(1);if(f.u==='a'&&C.E('b2',1.3))boom(.6)};
/* หยุดกาลเวลา: พื้นในวงหมดสี · เฟือง · เม็ดทรายหยุดนิ่ง → แตกเป็นเศษแก้ว */
P9U.q8clk=C=>{const {f,t,x,y,r}=C,D=f.d||3,al=Math.min(1,t/.2,(D-t)/.2),R=r*q8eo(Math.min(1,t/.3));if(al<=0)return;g.save();g.translate(x,y+4);g.scale(1,.45);g.globalCompositeOperation='saturation';g.globalAlpha=.8*al;const gr=g.createRadialGradient(0,0,0,0,0,R);gr.addColorStop(0,'rgba(128,128,128,1)');gr.addColorStop(.8,'rgba(128,128,128,.9)');gr.addColorStop(1,'rgba(128,128,128,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,6.2832);g.fill();
  g.globalCompositeOperation='source-over';const g2=g.createRadialGradient(0,0,R*.3,0,0,R);g2.addColorStop(0,'rgba(120,150,210,0)');g2.addColorStop(1,'rgba(60,80,140,.32)');g.globalAlpha=al;g.fillStyle=g2;g.fill();g.restore()};
P9X.q8clk=C=>{const {f,t,x,y,r,now}=C,D=f.d||3,al=Math.min(1,t/.25,(D-t)/.2),R=r*q8eo(Math.min(1,t/.3));
  if(C.E('c',0)){for(let i=0;i<3;i++)p9Sw(x,y+4,r*(.5+i*.35),'200,225,255',520,5-i,i*.12);p9Fl(x,y,r*.8,'210,230,255',300);
    for(let i=0;i<34;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'gl',x:x+Math.cos(a)*d,y:y+4+Math.sin(a)*d*.45,z:p9r(14,90),c:p9pick(['255,225,150','220,235,255']),s:p9r(1,2),l:D-.05})}
    if(f.by===uid||p9Near(x,y,420))p9Scr('vg','40,60,110',.32,D,{in:.25,id:'clk'})}
  g.save();g.globalCompositeOperation='lighter';const sp=t<D-.4?.15:2.4;
  g.lineWidth=2.6;p9Gear(x-R*.8,y-R*.18-34,36,12,now*sp,'200,225,255',.75*al);p9Gear(x+R*.74,y-R*.26-40,46,14,-now*sp*.8,'200,225,255',.7*al);p9Gear(x+R*.2,y-R*.42-74,26,9,now*sp*1.3,'255,230,170',.7*al);
  g.font='bold 15px serif';g.textAlign='center';g.fillStyle='rgba(225,238,255,'+(.85*al)+')';[['XII',-1.5708],['III',0],['VI',1.5708],['IX',3.1416]].forEach(([s2,an])=>g.fillText(s2,x+Math.cos(an)*R*.78,y+4+Math.sin(an)*R*.78*.45+5));
  {const sw=Math.sin(now*(t<D-.4?.6:4))*.5,px=x,py=y-R*.45-30;g.strokeStyle='rgba(255,236,190,'+(.6*al)+')';g.lineWidth=2;g.beginPath();g.moveTo(px,py-46);g.lineTo(px+Math.sin(sw)*46,py-46+Math.cos(sw)*46);g.stroke();glowAt(px+Math.sin(sw)*46,py-46+Math.cos(sw)*46,10,'255,230,170',.8*al)}
  g.restore();
  if(C.E('end',D-.03)){p9B(x,y,30,40,{ty:'sh',c:['220,240,255','170,215,255','255,255,255'],rad:r*.6,sp:[r*.6,r*2],up:[80,260],g:520,s:[3,6],l:[.6,1.1],vr:12});p9B(x,y,20,20,{ty:'st',c:'220,235,255',rad:r*.5,sp:[40,200],up:[40,160],g:100,dr:1,s:[1.6,3],l:[.6,1]});
    p9B(x,y,16,18,{ty:'sk',c:['255,230,170','220,235,255'],rad:r*.5,sp:[r,r*2.6],up:[20,140],g:300,s:[1.4,2.4],l:[.3,.6]});p9Sw(x,y+4,r*1.1,'210,235,255',560,8);p9Sw(x,y+4,r*1.5,'210,235,255',700,3,.1);p9Fl(x,y-10,r*1.2,'220,240,255',420);
    p9Shk(f,x,y,.36);if(f.by===uid||p9Near(x,y,360))p9Scr('fl','220,235,255',.16,.3);
    if(f.u==='b'){const o=q8Own(f);if(o)p9B(o.x,o.y,20,16,{ty:'gl',c:['170,255,190','255,240,170'],rad:20,sp:[10,40],up:[40,100],g:-30,dr:1.2,s:[2,3.4],l:[.8,1.3]})}}};
/* ม่านราตรี: ควันเงาระเบิดออก · ฟ้ามืด · เงาลอย · ขนนกดำ */
P9X.q8veil=C=>{const {f,t,x,y,r,now}=C,D=f.d||5,al=Math.min(1,t/.3,(D-t)/.4);
  if(C.E('c',0)){p9B(x,y,6,22,{ty:'sm',c:'60,26,100',sp:[r*.9,r*1.8],up:[0,20],dr:2.2,s:[16,22],s1:44,l:[.8,1.3],a:.5});p9B(x,y,30,16,{ty:'lf',c:['20,10,30','40,20,60'],sp:[40,140],up:[80,200],g:120,dr:1.2,s:[4,6],l:[1.4,2.2],vr:4});
    p9Sw(x,y+2,r,'150,90,255',560,6);p9Sw(x,y+2,r*.6,'150,90,255',480,4,.1);if(f.by===uid)p9Scr('dim','8,2,22',.3,D,{in:.4,id:'veil'});else if(p9Near(x,y,400))p9Scr('dim','8,2,22',.16,D,{in:.4,id:'veil'})}
  {const n=C.A('wp',18*al);for(let i=0;i<n;i++){const a=Math.random()*6.283;p9P({ty:'sm',x:x+Math.cos(a)*r*p9r(.85,1),y:y+Math.sin(a)*r*.55*p9r(.85,1),z:2,vz:p9r(8,24),vx:-Math.sin(a)*14,vy:Math.cos(a)*8,c:'30,10,54',s:p9r(9,13),s1:24,l:p9r(.9,1.4),a:.6})}}
  {const n=C.A('mt',22*al);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'gl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.55,z:2,vz:p9r(14,40),c:p9pick(['170,110,255','120,70,220']),s:p9r(1.2,2.2),l:p9r(.7,1.3)})}}
  if(t>.4&&t<D-.3&&C.R('tk',1,.95)){for(let i=0;i<3;i++){const a=Math.random()*6.283,d=r*.7*Math.sqrt(Math.random()),px=x+Math.cos(a)*d,py=y+Math.sin(a)*d*.55;p9Mark({ty:'slash',x:px,y:py,an:p9r(-.6,.6),r:p9r(26,40),w:14,c:'200,150,255',c0:'10,2,20',l:.6,fo:.4});
      p9B(px,py,14,6,{ty:'sk',c:['190,140,255','255,255,255'],sp:[60,180],up:[20,80],g:200,s:[1.2,2],l:[.2,.35]})}}
  {g.save();g.globalCompositeOperation='lighter';const mx=x+r*.45,my=y-r*.32;p9Rays(mx,my,r*.9,'200,180,255',.22*al,7,1.2+Math.sin(now*.4)*.15,16,1);glowAt(mx,my,36,'210,190,255',.45*al);g.restore()}
  if(C.E('end',D-.45)){p9B(x,y,10,22,{ty:'lf',c:['20,10,30','50,25,80'],rad:r*.6,sp:[10,60],up:[60,160],g:60,dr:1.4,s:[4,6],l:[1.4,2.2],vr:4});p9B(x,y,4,16,{ty:'sm',c:'30,10,54',rad:r*.7,sp:[10,40],up:[20,50],dr:1,s:[12,16],s1:30,l:[.8,1.3]})}};
/* อรุณฟื้นคืน: ลำแสงจากฟ้า · แสงพุ่ง · ขนนกทอง · วงเวท */
P9U.q8dawn=C=>{const {f,t,x,y,r,now}=C,k=1-t/(f.d||1);g.save();g.globalCompositeOperation='lighter';p9Rays(x,y-24,r*1.25,'255,225,150',.5*k,18,now*.35,30,.62);g.restore()};
P9X.q8dawn=C=>{const {f,x,y,r}=C;if(!C.E('c',0))return;const nr=f.by===uid||p9Near(x,y,420);
  p9Beam(x,y,56,480,'255,214,120',1.3,{a:.8});p9Beam(x,y,120,420,'255,190,100',.9,{a:.4});for(let i=0;i<3;i++)p9Sw(x,y+4,r*(.45+i*.4),'255,226,150',600,7-i*2,i*.12);
  p9Mark({ty:'sig',x,y:y+4,r:r*.82,c:'255,214,120',l:2.6,fo:1,sp:.4,n:8,st:3});p9Dec(x,y,r*.6,'holy',2400);
  for(let i=0;i<34;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'lf',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.6,z:p9r(100,240),vx:p9r(-12,12),vz:-p9r(10,30),g:16,dr:.6,c:p9pick(['255,236,170','255,214,120','255,250,225']),s:p9r(3.5,5.5),l:p9r(2.2,3.4),vr:p9r(-3,3),dl:p9r(0,.4)})}
  p9B(x,y,4,30,{ty:'gl',c:['255,230,150','255,250,220'],rad:r*.8,sp:[0,20],up:[40,120],g:-10,s:[1.6,3],l:[1,1.8]});p9B(x,y,30,16,{ty:'st',c:'255,236,170',rad:40,sp:[60,200],up:[40,160],g:60,dr:1.2,s:[1.6,3],l:[.7,1.2]});
  if(nr){p9Scr('fl','255,240,200',.26,.5);p9Scr('vg','255,190,90',.24,1.5,{in:.1,id:'dawn'})}p9Shk(f,x,y,.18)};
/* ================= สายทมิฬ ================= */
/* กำแพงสวรรค์: ฝุ่นแตกตามฐาน · แสงวาบผิวกำแพง · รูนทอง → ล้มทับ: ฝุ่นม้วน เศษหิน ลำแสง */
function p9WallG(f,x,y,r,t){const a=f.a,stay=f.u==='b',ux=Math.cos(a),uy=Math.sin(a)*.55;let sx=-Math.sin(a)+.5*Math.cos(a),sy=Math.cos(a)*.55;const sl=Math.hypot(sx,sy/.55)||1;sx/=sl;sy/=sl;
  const H=72,rise=q8eo(Math.min(1,t/.4)),th=stay?0:q8ei(q8c(t,.4,.75))*1.5708,hh=H*rise*Math.cos(th),fw=H*rise*Math.sin(th)*1.5;
  const B1=[x+sx*r,y+sy*r],B2=[x-sx*r,y-sy*r];return {ux,uy,sx,sy,B1,B2,T1:[B1[0]+ux*fw,B1[1]+uy*fw-hh],T2:[B2[0]+ux*fw,B2[1]+uy*fw-hh],rise,th}}
P9X.q8wall=C=>{const {f,t,x,y,r,now}=C,D=f.d||1.3,stay=f.u==='b',W=p9WallG(f,x,y,r,t),al=stay?Math.min(1,(D-t)/.4):Math.min(1,(D-t)/.35);
  if(C.E('c',0)){p9Mark({ty:'line',x:W.B1[0],y:W.B1[1]+2,x2:W.B2[0],y2:W.B2[1]+2,c:'255,220,130',c0:'40,26,6',w:10,l:stay?D:1.6,fo:.5});
    p9Along(W.B1[0],W.B1[1],W.B2[0],W.B2[1],8,(px,py)=>{p9B(px,py,0,2,{ty:'ch',c:['150,120,70','110,90,55','200,170,100'],sp:[20,70],up:[120,240],g:700,bo:.3,s:[2,3.6],l:[.9,1.4],vr:8});p9B(px,py,4,1,{ty:'sm',c:'120,100,70',sp:[10,40],up:[10,30],dr:1.4,s:[10,14],s1:26,l:[.6,1]})})}
  if(t<.45){const n=C.A('rs',90);for(let i=0;i<n;i++){const u=Math.random();p9P({ty:'sk',x:W.B1[0]+(W.B2[0]-W.B1[0])*u,y:W.B1[1]+(W.B2[1]-W.B1[1])*u,z:2,vz:p9r(120,260),vx:p9r(-20,20),g:300,c:p9pick(['255,225,140','255,250,220']),s:p9r(1.2,2),l:p9r(.25,.45)})}}
  /* ผิวกำแพง (แมปพิกัด u,v บนหน้ากำแพง): กรอบทอง · วงเวทกลาง · อักษรรูน · แถบแสงวิ่ง */
  if(W.rise>.15&&al>0){const o=W.B2,ax=W.B1[0]-o[0],ay=W.B1[1]-o[1],bx=W.T2[0]-o[0],by=W.T2[1]-o[1],M=(u,v)=>[o[0]+ax*u+bx*v,o[1]+ay*u+by*v],k=al*Math.min(1,(W.rise-.15)/.4),pu=.7+.3*Math.sin(now*5);
    const poly=(P,cl)=>{g.beginPath();P.forEach((q,i)=>{const m=M(q[0],q[1]);i?g.lineTo(m[0],m[1]):g.moveTo(m[0],m[1])});if(cl)g.closePath()};
    g.save();poly([[0,0],[1,0],[1,1],[0,1]],1);g.clip();g.globalCompositeOperation='lighter';g.lineJoin='round';g.lineCap='round';
    g.strokeStyle='rgba(255,236,170,'+(.75*k)+')';g.lineWidth=2.2;poly([[.03,.07],[.97,.07],[.97,.93],[.03,.93]],1);g.stroke();g.lineWidth=1.1;poly([[.06,.15],[.94,.15],[.94,.85],[.06,.85]],1);g.stroke();
    const c0=M(.5,.5);glowAt(c0[0],c0[1],34,'255,215,110',.55*k*pu);const ring=(ru,rv,n,ph)=>{const P=[];for(let i=0;i<=n;i++){const an=ph+i*6.2832/n;P.push([.5+Math.cos(an)*ru,.5+Math.sin(an)*rv])}return P};
    g.strokeStyle='rgba(255,246,200,'+(.9*k*pu)+')';g.lineWidth=2;poly(ring(.13,.34,28,0));g.stroke();g.lineWidth=1.3;poly(ring(.1,.26,28,0));g.stroke();
    g.lineWidth=1.4;poly(ring(.1,.26,5,now*.6).map((q,i,A)=>A[(i*2)%5]));g.stroke();
    [.18,.3,.7,.82].forEach((u,i)=>{const v0=.32,v1=.68;g.strokeStyle='rgba(255,236,170,'+(.8*k*(.6+.4*Math.sin(now*4+i)))+')';g.lineWidth=1.6;poly([[u,v0],[u,v1]]);g.stroke();poly(i%2?[[u-.03,.42],[u+.03,.5],[u-.03,.58]]:[[u-.03,.4],[u+.03,.4],[u-.03,.6],[u+.03,.6]]);g.stroke();const m=M(u,.5);glowAt(m[0],m[1],12,'255,220,120',.4*k)});
    const sw=((t*.9)%1.2)-.1,B0=M(sw-.07,0),B1=M(sw+.07,0),B2=M(sw+.07+.3,1),B3=M(sw-.07+.3,1),gr=g.createLinearGradient(B0[0],B0[1],B1[0],B1[1]);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,252,230,'+(.5*k)+')');gr.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=gr;g.beginPath();g.moveTo(B0[0],B0[1]);g.lineTo(B1[0],B1[1]);g.lineTo(B2[0],B2[1]);g.lineTo(B3[0],B3[1]);g.closePath();g.fill();g.restore();
    if(W.rise>.9&&W.th<.2){const n=C.A('mt',10);for(let i=0;i<n;i++){const m=M(Math.random(),Math.random());p9P({ty:'gl',x:m[0],y:m[1]+20,z:20,vz:p9r(20,50),c:'255,225,140',s:p9r(1,1.8),l:p9r(.5,.9)})}}}
  if(!stay&&C.E('imp',.75)){const cx=x+W.ux*70,cy=y+W.uy*70+W.uy*10;p9Shk(f,cx,cy,.5);if(f.by===uid||p9Near(cx,cy,380))p9Scr('fl','255,230,170',.16,.3);
    for(let i=0;i<26;i++){const u=p9r(-1,1),fw=p9r(10,120),px=x+W.sx*r*u+W.ux*fw,py=y+W.sy*r*u+W.uy*fw;if(i%2)p9P({ty:'sm',x:px,y:py,z:4,vx:W.ux*p9r(30,90)+p9r(-20,20),vy:W.uy*p9r(30,90)+p9r(-10,10),vz:p9r(10,30),dr:1.5,c:p9pick(['150,125,85','120,100,70']),s:p9r(14,20),s1:p9r(36,48),l:p9r(.9,1.5),a:.8});
      else p9P({ty:'ch',x:px,y:py,z:6,vx:W.ux*p9r(40,160)+p9r(-50,50),vy:W.uy*p9r(40,160)+p9r(-30,30),vz:p9r(140,360),g:800,bo:.3,c:p9pick(['210,175,95','160,130,75','240,215,150']),s:p9r(2.6,5),l:p9r(1.1,1.7),vr:p9r(-10,10)})}
    p9B(x+W.ux*70,y+W.uy*70,4,20,{ty:'sk',c:['255,230,150','255,255,230'],rad:r*.6,sp:[60,220],up:[80,280],g:500,s:[1.4,2.4],l:[.3,.55]});
    p9Sw(cx,cy,150,'255,215,130',560,8);p9Sw(cx,cy,210,'255,215,130',700,3,.1);[-.6,0,.6].forEach(u=>p9Dec(x+W.sx*r*u+W.ux*70,y+W.sy*r*u+W.uy*70,40,'crack',3000));
    for(let i=0;i<5;i++){const u=(i/4-.5)*1.6;p9Beam(x+W.sx*r*u+W.ux*80,y+W.sy*r*u+W.uy*80,14,200,'255,226,140',.5,{dl:i*.04})}}
  if(stay&&t>.4&&t<D-.3&&C.R('pl',.5,.4)){const cx=(W.B1[0]+W.B2[0])/2,cy=(W.B1[1]+W.B2[1])/2;p9Sw(cx,cy+2,r*.9,'255,215,130',360,3);p9Along(W.B1[0],W.B1[1],W.B2[0],W.B2[1],6,(px,py)=>p9B(px,py,4,1,{ty:'sk',c:'255,230,150',sp:[20,60],up:[80,180],g:300,s:[1.2,2],l:[.25,.4]}))}};
/* ศรเรียกอสนี: ศรลากประกาย · เมฆพายุเหนือเป้า · ฟ้าผ่าจากเมฆทุก 0.5 วิ */
P9X.q8tar=C=>{const {f,t,now}=C,L=q8Lp(f);if(!L.length)return;const D=f.d||4.2,[mx,my]=L[0],al=Math.min(1,t/.3,(D-t)/.3);
  if(t<.2){const q=t/.2,px=f.sx+(mx-f.sx)*q,py=f.sy+(my-14-f.sy)*q,n=C.A('tr',220);for(let i=0;i<n;i++)p9P({ty:'sk',x:px,y:py+20,z:20,vx:p9r(-40,40),vy:p9r(-40,40),vz:p9r(-20,40),c:p9pick(['150,200,255','230,245,255']),s:p9r(1,1.8),l:p9r(.15,.3)})}
  if(C.E('hit',.2)){p9B(mx,my,16,10,{ty:'sk',c:['170,215,255','255,255,255'],sp:[80,220],up:[20,140],g:300,s:[1.2,2],l:[.2,.4]});p9Sw(mx,my,30,'150,200,255',360,4)}
  if(t>.15&&al>0){const cy=my-150,cx=mx+10;g.save();g.globalAlpha*=al;const sp=p9Smoke('34,38,64'),sp2=p9Smoke('110,118,160');for(let i=0;i<7;i++){const ox=(i-3)*19+Math.sin(now*.8+i)*4,oy=Math.cos(i*1.7)*7+4,ss=30+(i%3)*9;g.drawImage(sp,cx+ox-ss,cy+oy-ss*.6,ss*2,ss*1.2);g.drawImage(sp,cx+ox-ss,cy+oy-ss*.6,ss*2,ss*1.2)}
    for(let i=0;i<5;i++){const ox=(i-2)*20+Math.sin(now*.6+i*2)*4,ss=24+(i%2)*8;g.drawImage(sp2,cx+ox-ss,cy-14-ss*.5,ss*2,ss)}
    g.globalCompositeOperation='lighter';if(Math.sin(now*17)>.55)glowAt(cx+Math.sin(now*9)*30,cy,40,'150,190,255',.4);g.restore()}
  if(t>.2){const n=C.A('cr',14);for(let i=0;i<n;i++)p9P({ty:'ln',x:mx+p9r(-8,8),y:my,z:p9r(8,26),c:'200,230,255',s:p9r(4,7),l:p9r(.12,.25)})}
  if(t>.4&&t<D-.1&&C.R('st',.5,.45)){const cx=mx+10+p9r(-24,24),cy=my-150;p9Z(cx,cy,mx,my-16,'150,200,255',2.4,.18,2);p9Fl(mx,my-10,46,'170,210,255',220);p9B(mx,my,14,8,{ty:'sk',c:['190,225,255','255,255,255'],sp:[80,200],up:[40,160],g:300,s:[1.2,2],l:[.2,.4]});
    p9Sw(mx,my,34,'150,200,255',300,3);p9Mark({ty:'glow',x:mx,y:my,r:30,c:'120,170,255',l:.5,a:.5});if(f.by===uid)try{shk=Math.max(shk,.06)}catch(e){}}};
/* สุนัขนรก: ประตูนรกตอนเรียก · ตัวใหญ่ขึ้น ไฟลุกท่วมหลัง · รอยเท้าไฟ */
try{q8Hound=(F=>function(x,y,a,t,i,al){g.save();g.translate(x,y);g.scale(1.35,1.35);F(0,0,a,t,i,al);g.restore();if(p9Q()){g.save();g.globalCompositeOperation='lighter';const fl=Math.cos(a)<0?-1:1;glowAt(x+fl*25,y-17,9+Math.sin(t*20+i)*2,'255,200,80',.75*al);g.restore()}})(q8Hound)}catch(e){}
P9X.q8hnd=C=>{const {f,t}=C,D=f.d||8,o=q8Own(f)||{x:C.x,y:C.y};
  if(C.E('c',0)){p9Mark({ty:'sig',x:o.x,y:o.y+4,r:64,c:'255,90,40',l:1.8,fo:.8,sp:1.2,n:5,st:2});p9Beam(o.x,o.y,34,220,'255,110,40',.7);p9Sw(o.x,o.y+4,70,'255,100,40',520,6);
    p9B(o.x,o.y,6,22,{ty:'fl',c:['255,120,40','255,170,60','255,80,30'],rad:40,sp:[10,50],up:[40,120],g:-20,s:[5,8],l:[.4,.8]});p9B(o.x,o.y,6,10,{ty:'sm',c:'70,24,14',a:.5,rad:40,sp:[10,50],up:[10,40],dr:1.4,s:[12,16],s1:30,l:[.7,1.1]});
    if(f.by===uid)p9Scr('vg','120,20,0',.26,.9,{in:.05,id:'hnd'})}
  if(f.H&&t<D-.2)f.H.forEach((h,i)=>{const n=C.A('f'+i,26);for(let j=0;j<n;j++){const fl=Math.cos(h.a)<0?-1:1;p9P({ty:'fl',x:h.x-fl*p9r(0,14),y:h.y,z:p9r(14,22),vz:p9r(20,60),vx:-Math.cos(h.a)*40,c:p9pick(['255,120,40','255,170,60','255,90,30']),s:p9r(3,5),l:p9r(.25,.45)})}
    const e=C.A('e'+i,10);for(let j=0;j<e;j++)p9P({ty:'gl',x:h.x+p9r(-10,10),y:h.y,z:p9r(10,24),vz:p9r(30,70),vx:p9r(-20,20),c:'255,150,60',s:p9r(1,1.8),l:p9r(.5,.9),fk:1});
    const px=h.__px===undefined?h.x:h.__px,py=h.__py===undefined?h.y:h.__py;if(Math.hypot(h.x-px,h.y-py)>18){h.__px=h.x;h.__py=h.y;p9Mark({ty:'glow',x:h.x,y:h.y+2,r:8,c:'255,110,40',l:.9,a:.7})}});
  if(f.H&&!/b/.test(f.u||'')&&C.E('end',D-.3))f.H.forEach(h=>{p9B(h.x,h.y,10,8,{ty:'sm',c:'30,8,6',sp:[10,40],up:[20,50],dr:1.2,s:[10,14],s1:24,l:[.6,1]});p9B(h.x,h.y,10,10,{ty:'gl',c:'255,140,50',sp:[20,80],up:[40,120],g:60,s:[1.4,2.4],l:[.4,.8],fk:1})})};
P9X.q8hbt=C=>{const {f,x,y}=C;if(!C.E('b',0))return;p9B(x,y,12,8,{ty:'sk',c:['255,150,60','255,230,180'],sp:[60,180],up:[30,120],g:300,s:[1.2,2],l:[.2,.35]});p9B(x,y,10,3,{ty:'fl',c:'255,120,40',sp:[10,30],up:[30,60],s:[4,6],l:[.3,.5]});p9Sw(x,y,24,'255,120,40',280,3);
  p9Mark({ty:'slash',x,y:y-2,an:p9r(-.5,.5),r:20,w:10,c:'255,150,80',c0:'40,6,0',l:.7,fo:.4});if(f.by&&q8Own(f)&&q8Own(f)===me)try{shk=Math.max(shk,.05)}catch(e){}};
/* กรงดาบ: ดาบตกจากฟ้าเป็นเส้นแสง · วงเวทใต้กรง · ฟันไขว้ทุกจังหวะ · รวมกลางแตกเป็นเศษม่วง */
P9U.q8cage=C=>{const {f,t,x,y,r,now}=C,D=f.d||4.45,al=Math.min(1,t/.3,(D-t)/.15);p9Sig(x,y+4,r*1.04,'170,110,255',.75*al,now*.5,{n:12,st:5,gl:20})};
P9X.q8cage=C=>{const {f,t,x,y,r}=C,D=f.d||4.45;
  if(t<.34){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let i=0;i<12;i++){const an=i*.5236,drop=q8eo(Math.min(1,Math.max(0,(t-i*.02)/.3)));if(drop>=1)continue;const px=x+Math.cos(an)*r,py=y+Math.sin(an)*r*.42,sy=py+6-(1-drop)*160;
      const gr=g.createLinearGradient(px,sy-90,px,sy);gr.addColorStop(0,'rgba(190,140,255,0)');gr.addColorStop(1,'rgba(230,210,255,.9)');g.strokeStyle=gr;g.lineWidth=3;g.beginPath();g.moveTo(px,sy-90);g.lineTo(px,sy-10);g.stroke()}g.restore()}
  if(C.E('land',.32)){for(let i=0;i<12;i++){const an=i*.5236,px=x+Math.cos(an)*r,py=y+Math.sin(an)*r*.42;p9B(px,py,2,3,{ty:'sk',c:['200,160,255','255,255,255'],sp:[40,140],up:[60,180],g:400,s:[1.2,2],l:[.2,.4]});p9B(px,py,0,1,{ty:'ch',c:['90,80,100','60,52,70'],sp:[20,60],up:[100,200],g:700,bo:.3,s:[2,3],l:[.8,1.2],vr:8})}
    p9Sw(x,y+4,r*1.1,'170,110,255',520,6);p9Dec(x,y,r*.7,'void',D*1000);p9Shk(f,x,y,.22);if(f.by===uid)p9Scr('vg','50,10,90',.28,D,{in:.2,id:'cage'})}
  if(t>.3&&t<D-.45&&C.R('sl',.5,.25)){[-.7,.7].forEach(a=>p9Mark({ty:'slash',x,y:y-4,an:a+p9r(-.2,.2),r:r*.75,w:16,c:'220,190,255',c0:'20,4,40',l:.45,fo:.3}));p9B(x,y,16,12,{ty:'sk',c:['200,160,255','255,255,255'],rad:r*.4,sp:[60,200],up:[20,120],g:300,s:[1.2,2],l:[.2,.4]});p9Sw(x,y+4,r*.6,'190,140,255',300,3)}
  if(f.u!=='b'&&C.E('cv',D-.15)){p9B(x,y,20,24,{ty:'sh',c:['200,160,255','240,225,255'],sp:[r*.8,r*2.2],up:[80,260],g:500,s:[3,5],l:[.5,.9],vr:12});p9Fl(x,y-10,r,'200,150,255',360);if(f.by===uid)p9Scr('fl','190,140,255',.14,.28)}};
/* ดูดวิญญาณ: วิญญาณรูปผีไหลตามสาย · วงเวทใต้ตัว · ควันม่วงรั่วจากมอน */
P9U.q8sph=C=>{const {f,t,now}=C,D=f.d||4.2,o=q8Own(f);if(!o)return;const al=Math.min(1,t/.2,(D-t)/.25);p9Sig(o.x,o.y+4,58,'150,255,200',.7*al,now*.8,{n:5,st:2,gl:10})};
P9X.q8sph=C=>{const {f,t,now}=C,D=f.d||4.2,o=q8Own(f)||{x:C.x,y:C.y},L=q8Lp(f),al=Math.min(1,t/.2,(D-t)/.25);
  if(C.E('c',0)){p9Sw(o.x,o.y+4,64,'150,255,200',480,5);p9B(o.x,o.y,20,14,{ty:'gl',c:'170,255,210',rad:20,sp:[20,80],up:[20,80],dr:1.2,s:[2,3],l:[.6,1]});L.forEach(([mx,my])=>{p9Sw(mx,my,30,'170,110,255',360,4);p9B(mx,my,10,6,{ty:'sm',c:'110,60,150',sp:[10,40],up:[20,40],dr:1.2,s:[8,12],s1:22,l:[.6,1]})})}
  g.save();g.globalCompositeOperation='lighter';L.forEach(([mx,my],i)=>{const sx=mx,sy=my-16,ex=o.x,ey=o.y-20;for(let j=0;j<2;j++){const u=(now*.55+j*.5+i*.21)%1,w=Math.sin(u*Math.PI*3+now*8+i)*6*Math.sin(u*Math.PI);
      p9Ghost(sx+(ex-sx)*u,sy+(ey-sy)*u+w,6,al*Math.sin(u*Math.PI),'180,255,215',Math.atan2(ey-sy,ex-sx))}});g.restore();
  {const n=C.A('sm',L.length*5*al);for(let i=0;i<n;i++){const q=p9pick(L);p9P({ty:'sm',x:q[0]+p9r(-8,8),y:q[1],z:p9r(4,20),vz:p9r(20,40),c:'110,60,150',s:p9r(5,8),s1:16,l:p9r(.5,.8),a:.45})}}
  {const n=C.A('sw',20*al);for(let i=0;i<n;i++){const a=Math.random()*6.283;p9P({ty:'gl',x:o.x+Math.cos(a)*40,y:o.y+Math.sin(a)*18,z:p9r(4,30),vx:-Math.sin(a)*70,vy:Math.cos(a)*30,vz:p9r(10,30),dr:1.2,c:'170,255,210',s:p9r(1.2,2),l:p9r(.4,.7)})}}};
setTimeout(()=>{try{p9Wrap()}catch(e){}},0);
