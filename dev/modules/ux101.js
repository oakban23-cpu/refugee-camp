
/* ===== v489 · ตัวเสริมภาพ: ปุ่ม 1–4 ทางเลือก (v484 · v485 · ปุ่ม 4 สายทมิฬ v487) — เบากว่าอัลติ เน้นหางประกาย จังหวะกระทบ ฝุ่น/เศษหิน ===== */
/* ---------- ปุ่ม 1–2 ---------- */
/* ฟันเสี้ยวจันทร์: ประกายท้ายคลื่น · รอยไหม้ตามทาง */
P9X.q8wave=C=>{const {f,t,D,x,y}=C,p=t/D,a=f.a,L=f.len||260,d=L*p,cx=x+Math.cos(a)*d,cy=y-8+Math.sin(a)*d,big=f.u==='b',col=big?'255,150,60':'255,190,110';
  if(C.E('c',0)){p9B(x+Math.cos(a)*16,y,10,8,{ty:'sk',c:[col,'255,255,230'],ang:a,spr:1.2,sp:[120,260],up:[10,80],g:200,s:[1.4,2.2],l:[.15,.3]})}
  if(p<.95){const n=C.A('tr',big?110:70);for(let i=0;i<n;i++){const o=p9r(-1,1)*(f.r||30);p9P({ty:Math.random()<.6?'sk':'gl',x:cx-Math.sin(a)*o,y:cy+8+Math.cos(a)*o*.6,z:8+Math.random()*12,vx:-Math.cos(a)*p9r(40,120),vy:-Math.sin(a)*p9r(40,120),vz:p9r(10,60),g:150,c:p9pick([col,'255,240,200']),s:p9r(1.2,2.2),l:p9r(.15,.35)})}
    if(C.R('d',.05))p9P({ty:'sm',x:cx,y:cy+10,z:2,vz:10,c:'150,130,100',s:6,s1:16,l:.5,a:.45})}};
/* ดาบบูมเมอแรง: ประกายรอบดาบหมุน */
P9X.q8boom=C=>{const {f,t,D}=C,tO=f.sx||.36,hv=f.sy||0,tB=Math.max(.1,D-tO-hv),P=q8BoomPos(f.x,f.y,f.a,f.len||220,tO,hv,tB,t,q8Own(f));if(t>D-.05)return;const n=C.A('tr',60);
  for(let i=0;i<n;i++){const a=Math.random()*6.283;p9P({ty:'sk',x:P[0]+Math.cos(a)*14,y:P[1]+Math.sin(a)*7,z:10,vx:-Math.sin(a)*160,vy:Math.cos(a)*80,c:p9pick(['190,225,255','255,255,255']),s:p9r(1,1.8),l:p9r(.12,.24)})}
  if(C.R('dw',.06))p9P({ty:'sm',x:P[0],y:P[1],z:2,vz:8,c:'170,160,140',s:6,s1:14,l:.4,a:.35})};
/* ยิงกระจาย: แสงปากธนู + หางประกายลูกธนู */
P9X.q8fan=C=>{const {f,t,D,x,y}=C,n=parseInt(f.u||'5')||5,ex=/x/.test(f.u||''),sp=f.sx||.87,L=f.len||230,p=t/D,col=ex?'255,150,60':'150,255,120';
  if(C.E('c',0)){p9B(x+Math.cos(f.a)*12,y,12,10,{ty:'sk',c:[col,'255,255,255'],ang:f.a,spr:sp+.4,sp:[120,260],up:[10,60],g:100,s:[1.2,2],l:[.12,.25]});p9Sw(x+Math.cos(f.a)*14,y+2,22,col,240,3)}
  if(p<.92){const k=C.A('tr',n*26);for(let i=0;i<k;i++){const j=Math.random()*n|0,an=f.a+(n>1?(j/(n-1)-.5)*sp:0),st=f.st&&f.st[j],d=L*p;if(st!=null&&d>st+4)continue;p9P({ty:'gl',x:x+Math.cos(an)*d,y:y+Math.sin(an)*d,z:10,vz:p9r(-5,15),c:col,s:p9r(1,1.6),l:p9r(.15,.3)})}}};
/* ธงล่าเหยื่อ: ปักลงพื้นมีหินกระเด็น · ละอองพลังลอยในเขต */
P9X.q8flag=C=>{const {f,t,x,y,r}=C,D=f.d||7,v=f.u||'',col=v==='a'?'120,170,255':v==='b'?'110,230,200':'150,240,140',al=Math.min(1,(D-t)/.4);
  if(C.E('d',.22)){p9B(x,y,0,8,{ty:'ch',c:['120,100,80','90,75,60'],sp:[40,120],up:[100,220],g:700,bo:.3,s:[2,3.2],l:[.8,1.2],vr:8});p9B(x,y,2,6,{ty:'sm',c:'150,130,100',sp:[30,80],up:[5,20],dr:1.6,s:[8,11],s1:22,l:[.5,.8],a:.5});p9Sw(x,y+4,r*.6,col,480,5);p9Sw(x,y+4,r,col,620,3,.08);p9Dec(x,y,30,'crack',2400);
    if(f.by===uid)try{shk=Math.max(shk,.12)}catch(e){}}
  if(t>.3&&al>0){const n=C.A('mt',14*al);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:v==='a'?'ln':'gl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.45,z:2,vz:p9r(20,50),c:col,s:v==='a'?p9r(3,5):p9r(1.2,2),l:p9r(.5,.9)})}}};
/* หอกน้ำแข็ง: ไอเย็น + เศษผลึกตามทาง → แตกที่ปลาย */
P9X.q8lance=C=>{const {f,t,D,x,y}=C,p=t/D,T=.85,a=f.a,L=f.len||340,d=L*Math.min(1,p/T),cx=x+Math.cos(a)*d,cy=y+Math.sin(a)*d;
  if(p<T){const n=C.A('tr',70);for(let i=0;i<n;i++)p9P({ty:Math.random()<.35?'sh':'gl',x:cx+p9r(-6,6),y:cy+p9r(-4,4),z:p9r(6,14),vx:p9r(-30,30)-Math.cos(a)*40,vy:p9r(-20,20)-Math.sin(a)*40,vz:p9r(-10,30),g:120,c:p9pick(['200,240,255','150,215,255']),s:p9r(1.4,2.6),l:p9r(.25,.5),vr:p9r(-8,8)});
    if(C.R('m',.05))p9P({ty:'sm',x:cx,y:cy,z:8,vz:6,c:'210,235,250',s:6,s1:16,l:.6,a:.45})}
  if(C.E('end',T*D)){p9B(cx,cy,10,14,{ty:'sh',c:['220,245,255','150,215,255','255,255,255'],sp:[60,180],up:[60,200],g:500,s:[2.4,4],l:[.4,.8],vr:12});p9Sw(cx,cy+2,40,'170,225,255',380,4);p9Dec(cx,cy,30,'frost',2400)}};
/* วาร์ปพริบตา: จุดเดิมยุบ (ประกายดูดเข้า) · จุดใหม่วงเวทแสง */
P9X.q8blink=C=>{const {f,x,y}=C;if(!C.E('c',0))return;const ox=f.sx,oy=f.sy;for(let i=0;i<14;i++){const a=Math.random()*6.283,d=p9r(30,50);p9P({ty:'st',x:ox+Math.cos(a)*d,y:oy+Math.sin(a)*d*.5,z:p9r(10,40),vx:-Math.cos(a)*d*3,vy:-Math.sin(a)*d*1.5,dr:1,c:'200,230,255',s:p9r(1.4,2.4),l:p9r(.25,.4)})}
  p9Along(ox,oy,x,y,8,(px,py,u)=>p9P({ty:'sk',x:px,y:py,z:16,vx:(x-ox)*.8,vy:(y-oy)*.8,c:'200,230,255',s:1.6,l:.18,dl:u*.06}));
  p9B(x,y,16,14,{ty:'st',c:'200,230,255',sp:[60,150],up:[20,100],g:60,dr:1.2,s:[1.6,2.6],l:[.4,.7]});p9Sw(x,y+4,50,'170,215,255',420,4);p9Mark({ty:'sig',x,y:y+4,r:42,c:'170,215,255',l:.9,fo:.5,sp:2,n:6,st:2});p9Beam(x,y,14,160,'190,225,255',.3)};
/* ดาวกระจาย: หางประกายม่วงของดาวแต่ละดวง */
P9X.q8shur=C=>{const {f,t,D,x,y}=C,u=f.u||'3',gi=u==='g',ret=/r/.test(u),n=gi?1:(parseInt(u)||3),sp=f.sx||.44,L=f.len||260,own=q8Own(f),tO=ret?D*.5:D;if(t>D-.02)return;
  const k=C.A('tr',n*(gi?90:30));for(let j=0;j<k;j++){const i=Math.random()*n|0,an=f.a+(n>1?(i/(n-1)-.5)*sp:0),st=f.st&&f.st[i];let px,py;
    if(t<=tO||!ret){const q=Math.min(1,t/tO);if(st!=null&&!ret&&L*q>st+6)continue;const dd=st!=null?Math.min(L*q,st):L*q;px=x+Math.cos(an)*dd;py=y+Math.sin(an)*dd}else{const q=q8ei((t-tO)/(D-tO)),dd=st!=null?Math.min(L,st):L,ex=x+Math.cos(an)*dd,ey=y+Math.sin(an)*dd,ox=own?own.x:x,oy=own?own.y:y;px=ex+(ox-ex)*q;py=ey+(oy-ey)*q}
    p9P({ty:'sk',x:px,y:py,z:10,vx:p9r(-60,60),vy:p9r(-40,40),vz:p9r(-20,30),c:p9pick(['200,150,255','255,255,255']),s:p9r(1,gi?2.4:1.6),l:p9r(.1,.22)})}};
/* ตะขอเงา: ประกายตอนเกี่ยวโดน */
P9X.q8hook=C=>{const {f,D}=C;if(f.u==='m'||!C.E('hit',.3*D))return;const hx=f.sx,hy=f.sy;p9B(hx,hy,14,10,{ty:'sk',c:['200,150,255','255,255,255'],sp:[80,200],up:[20,120],g:300,s:[1.2,2],l:[.15,.3]});p9Sw(hx,hy+4,26,'190,130,255',300,3);if(f.by===uid)try{shk=Math.max(shk,.08)}catch(e){}};
/* โล่แสง: ประกายวิบวับรอบโดม · ละอองทองลอยขึ้น */
P9X.q8bar=C=>{const {f,x,y,r}=C;if(!C.E('c',0))return;const o=q8Own(f)||{x,y},col=f.u==='b'?'255,170,90':f.u==='a'?'190,255,200':'255,225,130';p9Sw(o.x,o.y+4,r*.8,col,560,5);
  for(let i=0;i<20;i++){const a=Math.random()*6.283,d=r*p9r(.4,.95);p9P({ty:'st',x:o.x+Math.cos(a)*d,y:o.y+Math.sin(a)*d*.45,z:p9r(10,70),vz:p9r(10,30),c:col,s:p9r(1.4,2.4),l:p9r(.6,1.1),dl:Math.random()*.3})}
  p9B(o.x,o.y,4,16,{ty:'gl',c:col,rad:r*.6,sp:[0,20],up:[40,100],g:-10,s:[1.4,2.4],l:[.7,1.2]});p9Beam(o.x,o.y,30,200,col,.5,{a:.6})};
/* ค้อนพิพากษา: ลำแสงตามค้อนตก → กระแทก: หิน ประกาย วงทอง */
P9X.q8ham=C=>{const {f,t,x,y,r}=C,S=f.u==='b'?1.35:f.u==='s'?.75:1,ti=.34;
  if(C.E('c',0))p9Beam(x,y,16*S,420,'255,226,140',ti+.05,{a:.6});
  if(C.E('imp',ti)){p9B(x,y,0,Math.round(12*S),{ty:'ch',c:['200,170,100','150,120,70','230,210,150'],rad:10,sp:[60,200*S],up:[140,300],g:760,bo:.3,s:[2.4,4],l:[1,1.5],vr:10});p9B(x,y,10,Math.round(16*S),{ty:'sk',c:['255,225,140','255,255,230'],sp:[100,260*S],up:[40,240],g:400,s:[1.4,2.4],l:[.25,.5]});
    p9B(x,y,2,8,{ty:'sm',c:'170,150,110',rad:16,sp:[60,140],up:[5,20],dr:1.6,s:[10,14],s1:28,l:[.6,1],a:.5});p9Sw(x,y+4,r*1.1,'255,215,120',520,7);p9Sw(x,y+4,r*1.6,'255,215,120',680,3,.08);p9Dec(x,y,r*.7,'holy',2600);p9Dec(x,y,r*.6,'crack',2600);
    p9Beam(x,y,24*S,360,'255,226,140',.45,{sk:1});p9Shk(f,x,y,.3*S);if(f.by===uid)p9Scr('fl','255,236,180',.1,.25)}};
/* ---------- ปุ่ม 3–4 ---------- */
/* กระโดดทุบพสุธา: ฝุ่นตอนกระโดด · หางประกายตามโค้ง · ลงกระแทกหนัก */
P9X.q8leap=C=>{const {f,t,x,y,r}=C,T=.38,sx=f.sx,sy=f.sy,R=f.u==='b'?r*.55:r;
  if(C.E('c',0))p9B(sx,sy,2,8,{ty:'sm',c:'150,130,100',sp:[40,100],up:[5,20],dr:1.6,s:[8,11],s1:20,l:[.5,.8],a:.55});
  if(t<T){const q=t/T,e=q8io(q),px=sx+(x-sx)*e,py=sy+(y-sy)*e,n=C.A('tr',80);for(let i=0;i<n;i++)p9P({ty:'sk',x:px+p9r(-6,6),y:py,z:Math.sin(e*Math.PI)*58+p9r(0,20),vz:p9r(-30,30),vx:p9r(-30,30),c:p9pick(['255,190,110','255,240,200']),s:p9r(1.2,2),l:p9r(.12,.25)})}
  if(C.E('land',T)){p9B(x,y,0,16,{ty:'ch',c:['130,105,80','95,78,60','160,130,95'],rad:R*.3,sp:[80,220],up:[160,340],g:780,bo:.3,s:[2.6,4.6],l:[1.1,1.6],vr:10});p9B(x,y,2,12,{ty:'sm',c:'150,125,95',rad:R*.3,sp:[R*.8,R*1.6],up:[5,25],dr:1.8,s:[12,16],s1:32,l:[.7,1.1],a:.6});
    p9B(x,y,8,16,{ty:'sk',c:['255,170,80','255,240,200'],sp:[120,300],up:[60,240],g:400,s:[1.4,2.4],l:[.25,.5]});p9Sw(x,y+4,R*1.2,'255,170,90',520,7);p9Shk(f,x,y,.38);if(f.by===uid)p9Scr('fl','255,200,140',.08,.2)}};
/* ดาบเทพตกฟ้า: ลมฟ้าตามดาบ → ปักพื้นสะเทือน · ทุกจังหวะประกายไต่ใบดาบ */
P9X.q8gsw=C=>{const {f,t,x,y,r}=C,D=f.d||3.5,u=f.u||'',S=u==='s'?.62:1,ti=.5,gc=u==='b'?'255,150,60':'150,200,255';
  if(t<ti){const ty=y+10-(1-q8ei(t/ti))*320,n=C.A('tr',60);for(let i=0;i<n;i++)p9P({ty:'sk',x:x+p9r(-12,12)*S,y:y,z:y-ty+p9r(60,160)*S,vz:p9r(200,400),c:p9pick([gc,'255,255,255']),s:p9r(1,1.8),l:p9r(.1,.2)})}
  if(C.E('imp',ti)){p9B(x,y,0,Math.round(20*S),{ty:'ch',c:['120,110,100','90,82,74','150,140,128'],rad:12,sp:[80,240],up:[160,360],g:780,bo:.3,s:[2.6,4.6],l:[1.1,1.7],vr:10});p9B(x,y,2,Math.round(14*S),{ty:'sm',c:'150,140,125',rad:14,sp:[r*.8,r*1.7],up:[5,25],dr:1.8,s:[12,16],s1:34,l:[.8,1.2],a:.6});
    p9B(x,y,10,20,{ty:'sk',c:[gc,'255,255,255'],sp:[140,320],up:[60,260],g:400,s:[1.4,2.4],l:[.25,.5]});for(let i=0;i<3;i++)p9Sw(x,y+4,r*(.8+i*.45),gc,600,8-i*2,i*.08);p9Beam(x,y,28*S,440,gc,.6,{sk:1});
    p9Shk(f,x,y,.45*S);if(f.by===uid||p9Near(x,y,380))p9Scr('fl',u==='b'?'255,190,120':'210,230,255',.14,.3)}
  if(u!=='s'&&t>1&&t<D-.3&&C.R('pu',.5,1)){p9B(x,y,10,8,{ty:'gl',c:gc,rad:6,sp:[0,10],up:[80,160],g:-20,s:[1.4,2.4],l:[.5,.8]});p9P({ty:'ring',x,y:y+4,c:gc,s:10,s1:70,l:.45})}
  if(C.E('out',D-.35))p9B(x,y,40,16,{ty:'st',c:gc,rad:10,sp:[10,40],up:[30,90],g:-20,s:[1.4,2.4],l:[.6,1]})};
/* ศรสังหาร: เส้นทางเรืองแสง · ประกายเกลียวรอบหัวศร · ปะทะปลายทาง */
P9X.q8snipe=C=>{const {f,t,D,x,y}=C,T=Math.max(.05,D-.3),a=f.a,L=f.len||380,d=L*Math.min(1,t/T),hx=x+Math.cos(a)*d,hy=y+Math.sin(a)*d,boom=f.u==='a',col=boom?'255,160,80':'140,230,255';
  if(C.E('c',0)){p9Mark({ty:'line',x,y:y+2,x2:x+Math.cos(a)*L,y2:y+2+Math.sin(a)*L,c:col,c0:'10,20,30',w:6,l:.9,fo:.6});p9B(x+Math.cos(a)*14,y,12,10,{ty:'sk',c:[col,'255,255,255'],ang:a,spr:.8,sp:[120,260],up:[10,60],g:100,s:[1.2,2],l:[.12,.25]});if(f.by===uid)try{shk=Math.max(shk,.1)}catch(e){}}
  if(t<T){const n=C.A('tr',120);for(let i=0;i<n;i++){const ph=t*40+i,o=Math.sin(ph)*8;p9P({ty:'sk',x:hx-Math.sin(a)*o,y:hy+Math.cos(a)*o,z:12+Math.cos(ph)*6,vx:-Math.cos(a)*60,vy:-Math.sin(a)*60,c:p9pick([col,'255,255,255']),s:p9r(1,1.6),l:p9r(.12,.25)})}}
  if(C.E('end',T)){p9B(hx,hy,12,12,{ty:'sk',c:[col,'255,255,255'],sp:[80,220],up:[20,140],g:300,s:[1.2,2],l:[.2,.4]});p9Sw(hx,hy+4,boom?50:30,col,360,4)}};
/* เหยี่ยว: ขนนกร่วง · โฉบจิกมีประกาย */
P9X.q8hawk=C=>{const {f,t}=C,D=f.d||8,o=q8Own(f);if(!o||t>D-.3)return;const s=C.A('st',6*(parseInt(f.u)||1));for(let i=0;i<s;i++)p9P({ty:'st',x:o.x+p9r(-50,50),y:o.y+p9r(-10,10),z:p9r(70,110),vz:p9r(-10,10),c:'255,235,190',s:p9r(1,1.8),l:p9r(.4,.7)});const n=C.A('ft',5*(parseInt(f.u)||1));for(let i=0;i<n;i++)p9P({ty:'lf',x:o.x+p9r(-40,40),y:o.y+p9r(-10,10),z:p9r(70,100),vx:p9r(-15,15),vz:-p9r(5,15),g:12,dr:.8,c:p9pick(['150,110,70','240,230,210']),s:p9r(2.6,3.6),l:p9r(1,1.6),vr:p9r(-3,3)})};
P9X.q8dive=C=>{const {f,D,x,y}=C;if(!C.E('hit',.44*D))return;p9B(x,y,14,8,{ty:'sk',c:['255,230,180','255,255,255'],sp:[80,200],up:[20,140],g:300,s:[1.2,2],l:[.15,.3]});p9B(x,y,16,4,{ty:'lf',c:['150,110,70','240,230,210'],sp:[30,90],up:[60,140],g:60,dr:1,s:[2.6,3.6],l:[.8,1.3],vr:4});p9Sw(x,y+4,24,'255,220,160',300,3)};
/* ลูกแก้วพลังเวท: ประกายม่วง + สายฟ้าเล็กรอบลูกแก้ว */
P9X.q8orb=C=>{const {f,t,D,x,y}=C,p=t/D;let ox,oy;if(f.u==='o'){const o=q8Own(f)||{x,y},an=t*3.2;ox=o.x+Math.cos(an)*75;oy=o.y+Math.sin(an)*45}else{ox=x+Math.cos(f.a)*(f.len||330)*p;oy=y+Math.sin(f.a)*(f.len||330)*p}if(p>.97)return;
  const n=C.A('tr',40);for(let i=0;i<n;i++)p9P({ty:Math.random()<.3?'ln':'gl',x:ox+p9r(-10,10),y:oy+p9r(-5,5),z:p9r(14,30),vz:p9r(-10,20),vx:p9r(-20,20),c:p9pick(['200,150,255','240,220,255']),s:Math.random()<.3?p9r(4,6):p9r(1.2,2),l:p9r(.2,.45)})};
/* พายุหิมะ: เกล็ดหิมะตกจากฟ้า · ไอเย็นเรี่ยพื้น · ผลึกแตกตอนจบ */
P9X.q8bliz=C=>{const {f,t,x,y,r}=C,D=f.d||4;let cx=x,cy=y;if(f.u==='f'){const o=q8Own(f);if(o){cx=o.x;cy=o.y}}const al=Math.min(1,t/.35,(D-t)/.4);
  if(C.E('c',0))p9Dec(cx,cy,r*.8,'frost',D*1000+600);
  if(al>0){const n=C.A('sn',40*al);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'st',x:cx+Math.cos(a)*d,y:cy+Math.sin(a)*d*.45,z:p9r(80,160),vz:-p9r(60,110),vx:p9r(20,60),c:'220,240,255',s:p9r(1,1.8),l:p9r(1,1.6)})}
    const m=C.A('fm',8*al);for(let i=0;i<m;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'sm',x:cx+Math.cos(a)*d,y:cy+Math.sin(a)*d*.45,z:2,vx:p9r(10,30),vz:p9r(2,8),c:'225,240,255',s:p9r(10,14),s1:26,l:p9r(.8,1.2),a:.35})}}
  if(f.u==='b'&&C.E('end',D-.4))p9B(cx,cy,10,24,{ty:'sh',c:['220,245,255','150,215,255'],rad:r*.6,sp:[40,160],up:[80,220],g:500,s:[2.6,4.4],l:[.5,.9],vr:12})};
/* กริชเงาไล่ล่า: ปล่อยกริชมีควันเงา */
P9X.q8dag=C=>{const {f,x,y}=C;if(!C.E('c',0))return;p9B(x,y,14,10,{ty:'sk',c:['200,150,255','255,255,255'],sp:[60,180],up:[20,100],g:200,s:[1.2,2],l:[.15,.3]});p9B(x,y,10,4,{ty:'sm',c:'80,40,120',sp:[20,60],up:[10,30],dr:1.4,s:[7,10],s1:18,l:[.4,.7],a:.45})};
/* เคียวเงาพิฆาต: ประกายตามปลายใบเคียว · ตัดอากาศเป็นวง */
P9X.q8scy=C=>{const {f,t,r}=C,o=q8Own(f)||{x:C.x,y:C.y},n=parseInt(f.u)||2,gap=.33,R=r;
  for(let i=0;i<n;i++){const s0=.02+gap*i,q=(t-s0)/.2;if(q<0||q>1)continue;const dir=i%2?-1:1,a0=fxR(f,i,1)*6.283,th=a0+dir*6.283*q8io(Math.min(1,q)),bx=o.x+Math.cos(th)*R,by=o.y+Math.sin(th)*R*.55,k=C.A('t'+i,140);
    for(let j=0;j<k;j++)p9P({ty:Math.random()<.7?'sk':'gl',x:bx+p9r(-8,8),y:by,z:6+p9r(0,10),vx:-Math.sin(th)*dir*p9r(80,200),vy:Math.cos(th)*dir*p9r(40,100),c:p9pick(['190,130,255','230,210,255','120,60,200']),s:p9r(1.2,2.2),l:p9r(.15,.35)});
    if(C.E('sw'+i,s0)){p9Sw(o.x,o.y+4,R*.9,'170,110,255',380,4);if(f.by===uid)try{shk=Math.max(shk,.12)}catch(e){}}}};
/* ลำแสงศักดิ์สิทธิ์: ละอองแสงพุ่งตามลำ · แสงกระทบปลาย */
P9X.q8beam=C=>{const {f,t,r}=C,D=f.d||2.2,o=q8Own(f)||{x:C.x,y:C.y},al=Math.min(1,t/.12,(D-t)/.2),col=f.u==='b'?'160,255,170':'255,220,120';if(!f.la||al<=0)return;
  [f.sx,f.sy].forEach((id,i)=>{if(!id)return;const a=f.la[i],sx=o.x+Math.cos(a)*10,sy=o.y+Math.sin(a)*10,ex=o.x+Math.cos(a)*r,ey=o.y+Math.sin(a)*r,n=C.A('b'+i,50*al);
    for(let j=0;j<n;j++){const u=Math.random();p9P({ty:Math.random()<.5?'st':'gl',x:sx+(ex-sx)*u,y:sy+(ey-sy)*u,z:12+p9r(-6,6),vx:Math.cos(a)*p9r(100,200),vy:Math.sin(a)*p9r(100,200),vz:p9r(-10,20),c:col,s:p9r(1.2,2),l:p9r(.2,.4)})}
    if(C.R('h'+i,.25))p9P({ty:'ring',x:o.x+Math.cos(a)*r*.6,y:o.y+Math.sin(a)*r*.6+4,c:col,s:6,s1:30,l:.35})})};
/* ดวงแก้วเทวา: หางประกายของดวงแก้ว */
P9X.q8orbs=C=>{const {f,t}=C,D=f.d||8,o=q8Own(f)||{x:C.x,y:C.y},col=f.u==='a'?'255,150,200':f.u==='b'?'255,170,90':'255,225,130';if(t>D-.3)return;const n=C.A('tr',30);
  for(let i=0;i<n;i++){const oi=Math.random()*3|0,an=t*2.4+oi*2.0944;p9P({ty:Math.random()<.5?'st':'gl',x:o.x+Math.cos(an)*34,y:o.y+Math.sin(an)*14,z:18+p9r(-3,3),vz:p9r(-10,20),vx:p9r(-15,15),c:col,s:p9r(1,1.8),l:p9r(.3,.6)})}};
P9X.q8ray=C=>{const {f,x,y}=C;if(!C.E('b',0))return;p9B(x,y,12,4,{ty:'st',c:f.u==='h'?'170,255,190':'255,230,150',sp:[30,90],up:[20,80],g:60,s:[1.2,2],l:[.3,.5]})};
P9X.q8hl=C=>{const {x,y}=C;if(!C.E('b',0))return;p9B(x,y,4,8,{ty:'gl',c:['150,255,170','220,255,220'],rad:10,sp:[0,20],up:[40,90],g:-10,s:[1.2,2],l:[.5,.8]})};
/* ---------- ปุ่ม 4 สายทมิฬ ---------- */
/* ปราการสะท้อนแค้น: ประกายเหล็กเสียดสี · วงพื้นเรือง · กระแทกโล่ */
P9X.q8grd=C=>{const {f,t}=C,D=f.d||2.5,o=q8Own(f)||{x:C.x,y:C.y},al=Math.min(1,t/.15,(D-t)/.2);
  if(C.E('c',0)){p9Sw(o.x,o.y+4,60,'200,215,240',420,5);p9B(o.x,o.y,2,6,{ty:'sm',c:'150,140,130',sp:[40,90],up:[5,20],dr:1.6,s:[8,11],s1:20,l:[.5,.8],a:.5})}
  if(al>0){g.save();g.globalCompositeOperation='lighter';g.translate(o.x,o.y+5);g.scale(1,.45);glowAt(0,0,60,'190,205,235',.3*al);g.restore();const n=C.A('sp',22*al);for(let i=0;i<n;i++){const an=Math.random()*6.283;p9P({ty:'sk',x:o.x+Math.cos(an)*34,y:o.y+Math.sin(an)*14,z:p9r(4,20),vx:-Math.sin(an)*120,vy:Math.cos(an)*50,vz:p9r(20,80),g:300,c:p9pick(['255,220,170','255,255,255']),s:p9r(1,1.6),l:p9r(.15,.3)})}}};
P9X.q8gsl=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,0,12,{ty:'ch',c:['120,110,100','90,82,74'],rad:r*.3,sp:[80,200],up:[140,300],g:760,bo:.3,s:[2.4,4],l:[1,1.4],vr:10});p9B(x,y,8,14,{ty:'sk',c:['255,170,110','255,240,220'],sp:[100,260],up:[40,220],g:400,s:[1.4,2.2],l:[.25,.45]});
  p9B(x,y,2,8,{ty:'sm',c:'150,140,125',rad:r*.3,sp:[r*.7,r*1.4],up:[5,20],dr:1.8,s:[10,14],s1:28,l:[.6,1],a:.55});p9Sw(x,y+4,r*1.1,'255,160,100',520,6);p9Dec(x,y,r*.7,'crack',2600);p9Shk(f,x,y,.32)};
/* ศรลมกรดสะท้อน: หางลมตามศร · ประกายตอนเด้ง */
P9X.q8wnd=C=>{const {f,t}=C,L=q8Lp(f),st=.12;if(!L.length)return;const P=[[C.x,C.y]].concat(L),i=Math.min(P.length-2,Math.floor(t/st)),q=Math.min(1,(t-i*st)/st),col=f.u==='b'?'150,255,210':'170,255,170';
  if(t<st*(P.length-1)){const a=P[i],b=P[i+1],hx=a[0]+(b[0]-a[0])*q,hy=a[1]+(b[1]-a[1])*q,n=C.A('tr',90);for(let j=0;j<n;j++)p9P({ty:'sk',x:hx+p9r(-4,4),y:hy,z:12+p9r(-4,4),vx:p9r(-40,40),vy:p9r(-30,30),c:p9pick([col,'255,255,255']),s:p9r(1,1.6),l:p9r(.12,.24)})}
  for(let j=1;j<P.length;j++)if(C.E('b'+j,j*st)){p9B(P[j][0],P[j][1],12,8,{ty:'sk',c:[col,'255,255,255'],sp:[60,180],up:[20,120],g:300,s:[1.2,2],l:[.15,.3]});p9B(P[j][0],P[j][1],10,2,{ty:'lf',c:['220,255,200','190,245,160'],sp:[40,100],up:[40,100],g:100,dr:1,s:[2.6,3.4],l:[.6,1],vr:6})}};
/* ทูตอสูรเพลิง: ถ่านไฟจากอิมป์ · ลูกไฟระเบิดเป็นประกาย */
P9X.q8imp=C=>{const {f,t}=C,D=f.d||10,o=q8Own(f)||{x:C.x,y:C.y},n=parseInt(f.u)||2;if(t>D-.25)return;if(C.E('c',0))for(let i=0;i<n;i++){const P=q8ImpP(o.x,o.y,0,i,n);p9B(P[0],P[1]+46,46,10,{ty:'fl',c:['255,120,40','255,180,70'],sp:[20,60],up:[20,80],s:[4,6],l:[.3,.5]});p9B(P[0],P[1]+46,40,6,{ty:'sm',c:'60,30,20',sp:[20,50],up:[10,30],dr:1.4,s:[7,10],s1:18,l:[.5,.8],a:.45})}
  const k=C.A('em',n*12);for(let j=0;j<k;j++){const P=q8ImpP(o.x,o.y,t,Math.random()*n|0,n);p9P({ty:'gl',x:P[0]+p9r(-4,4),y:P[1]+46,z:46+p9r(-4,4),vz:p9r(-30,10),vx:p9r(-15,15),g:60,c:p9pick(['255,150,50','255,200,90']),s:p9r(1,1.6),l:p9r(.3,.6),fk:1})}};
P9X.q8imf=C=>{const {f,D,x,y}=C,T=f.u==='k'?.85:.62;if(!C.E('hit',T*D))return;p9B(x,y,10,f.u==='k'?14:6,{ty:'sk',c:['255,160,60','255,240,200'],sp:[60,180],up:[20,140],g:300,s:[1.2,2],l:[.15,.3]});p9B(x,y,6,f.u==='k'?8:3,{ty:'fl',c:['255,120,40','255,180,70'],sp:[10,40],up:[30,70],s:[4,6],l:[.3,.5]});p9Sw(x,y+4,f.u==='k'?50:20,'255,130,50',300,3);if(f.u==='k')p9Dec(x,y,30,'fire',2200)};
/* วงใบมีดระบำ: ประกายตามใบมีดหมุน */
P9X.q8orbt=C=>{const {f,t,r}=C,D=f.d||6,o=q8Own(f)||{x:C.x,y:C.y},R=r*q8eo(Math.min(1,t/.3));if(t>D-.25)return;const n=C.A('tr',50);
  for(let i=0;i<n;i++){const an=t*4.2+(Math.random()*6|0)*1.0472;p9P({ty:'sk',x:o.x+Math.cos(an)*R,y:o.y+Math.sin(an)*R*.55,z:10,vx:-Math.sin(an)*R*4,vy:Math.cos(an)*R*2.2,c:p9pick(['210,170,255','255,255,255']),s:p9r(1,1.6),l:p9r(.08,.18)})}};
/* ตุ๊กตาคำสาป: ควันสาปตอนวาง · ละอองม่วงไต่ตามด้าย */
P9X.q8vdo=C=>{const {f,t,x,y,r}=C,D=f.d||6,L=q8Lp(f),al=Math.min(1,t/.3,(D-t)/.25);
  if(C.E('c',.3)){p9B(x,y,4,8,{ty:'sm',c:'90,40,140',sp:[20,60],up:[10,30],dr:1.4,s:[8,11],s1:20,l:[.6,1],a:.45});p9Sw(x,y+4,r*.9,'150,80,230',520,4);p9Mark({ty:'sig',x,y:y+4,r:r*.55,c:'150,80,230',l:D-.3,fo:.4,sp:.5,n:5,st:2})}
  if(al>0&&L.length){const n=C.A('th',L.length*8*al);for(let i=0;i<n;i++){const q=p9pick(L),u=Math.random(),cx=(x+q[0])/2,cy=Math.min(y,q[1])-40,px=(1-u)*(1-u)*x+2*(1-u)*u*cx+u*u*q[0],py=(1-u)*(1-u)*(y-18)+2*(1-u)*u*cy+u*u*(q[1]-14);p9P({ty:'gl',x:px,y:py+20,z:20,vz:p9r(-5,15),c:p9pick(['170,90,255','230,190,255']),s:p9r(1,1.6),l:p9r(.25,.5)})}}};
setTimeout(()=>{try{p9Wrap()}catch(e){}},0);
