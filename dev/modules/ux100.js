
/* ===== v489 · ตัวเสริมภาพ: อัลติทางเลือก สายแสง (v486) + สายทมิฬ (v487) + กระทืบพื้น q8shk ===== */
const p9Own=f=>q8Own(f)||{x:f.x,y:f.y};
/* กระทืบพื้น (ร่างอสูรรูน A · นักธนูลงพื้น) */
P9X.q8shk=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,4,8,{ty:'sm',c:'130,110,85',rad:r*.3,sp:[r*.6,r*1.4],up:[5,20],dr:1.8,s:[10,14],s1:26,l:[.6,1]});
  p9B(x,y,0,5,{ty:'ch',c:['120,100,80','90,75,60'],rad:r*.3,sp:[30,100],up:[120,240],g:700,bo:.3,s:[2,3.4],l:[.8,1.2],vr:8});p9Dec(x,y,r*.55,'crack',2200);p9Shk(f,x,y,.16)};
/* ================= อัลติสายแสง ================= */
/* ร่างอสูรสงคราม: คำรามแรก (คลื่น+หินแตก+เสาไฟ) · ไฟลุกท่วมตัวตลอดร่าง · ขอบจอแดง */
P9X.q8av=C=>{const {f,t,now}=C,D=f.d||8,o=p9Own(f),B=f.u==='b',c1=B?'220,30,50':'255,110,40',c2=B?'255,90,110':'255,190,90';
  if(C.E('c',0)){for(let i=0;i<3;i++)p9Sw(o.x,o.y+4,90+i*55,c1,560,7-i*2,i*.1);p9Dec(o.x,o.y,70,'crack',3200);p9Dec(o.x,o.y,60,'fire',2600);p9Beam(o.x,o.y,46,320,c1,.7,{sk:1});
    p9B(o.x,o.y,0,16,{ty:'ch',c:['110,90,70','80,64,50','140,110,80'],rad:30,sp:[80,220],up:[160,340],g:760,bo:.3,s:[2.6,4.6],l:[1.1,1.6],vr:10});p9B(o.x,o.y,10,24,{ty:'sk',c:[c1,c2,'255,240,200'],sp:[120,320],up:[40,220],g:400,s:[1.6,2.6],l:[.3,.6]});
    p9B(o.x,o.y,4,12,{ty:'sm',c:'70,40,30',rad:30,sp:[60,160],up:[5,30],dr:1.6,s:[12,16],s1:34,l:[.8,1.2]});p9Shk(f,o.x,o.y,.42);
    if(f.by===uid){p9Scr('vg',B?'110,0,10':'120,30,0',.34,D,{in:.25,id:'av'});p9Scr('fl',c2,.14,.3)}}
  if(t<D-.2){g.save();g.globalCompositeOperation='lighter';g.translate(o.x,o.y+4);g.scale(1,.45);glowAt(0,0,70+8*Math.sin(now*7),c1,.4);g.restore();const n=C.A('fl',70);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=p9r(6,30);p9P({ty:'fl',x:o.x+Math.cos(a)*d,y:o.y+Math.sin(a)*d*.5,z:p9r(0,46),vz:p9r(60,130),vx:p9r(-10,10),c:p9pick([c1,c2,'255,150,50']),s:p9r(5,9),l:p9r(.3,.6)})}
    const e=C.A('em',16);for(let i=0;i<e;i++)p9P({ty:'gl',x:o.x+p9r(-24,24),y:o.y,z:p9r(10,50),vz:p9r(40,90),vx:p9r(-30,30),c:c2,s:p9r(1,1.8),l:p9r(.6,1.1),fk:1});
    if(C.R('pl',1,.6))p9Sw(o.x,o.y+4,56,c1,420,3);if(B){const b=C.A('bl',6);for(let i=0;i<b;i++)p9P({ty:'bl',x:o.x+p9r(-16,16),y:o.y,z:p9r(30,50),vz:p9r(20,60),g:400,c:'150,0,16',s:p9r(1.2,2),l:p9r(.6,1)})}}};
/* คลื่นกระแทกรูปพัด: ฝุ่น + ประกาย + หินกระเด็นตามขอบคลื่น */
P9X.q8cone=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;const a=f.a,col=f.u==='b'?'230,40,60':'255,130,50';for(let i=0;i<7;i++){const an=a+(i/6-.5)*1.8,px=x+Math.cos(an)*r*.55,py=y+Math.sin(an)*r*.55*.6;
    p9P({ty:'sm',x:px,y:py,z:2,vx:Math.cos(an)*p9r(60,120),vy:Math.sin(an)*p9r(30,70),vz:p9r(5,20),dr:2,c:'130,105,80',s:p9r(8,11),s1:22,l:p9r(.5,.8),a:.7});p9P({ty:'sk',x:px,y:py,z:8,vx:Math.cos(an)*p9r(150,260),vy:Math.sin(an)*p9r(80,150),vz:p9r(40,140),g:400,c:p9pick([col,'255,230,190']),s:p9r(1.4,2.2),l:p9r(.2,.4)})}
  p9B(x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.35,0,3,{ty:'ch',c:['110,90,70','80,64,50'],ang:a,spr:1.4,sp:[60,160],up:[100,220],g:700,bo:.3,s:[2,3.2],l:[.7,1.1],vr:8});if(f.by===uid)try{shk=Math.max(shk,.1)}catch(e){}};
/* เทพธนูเหินฟ้า: เสาแสงขึ้นฟ้า · ลมพัดฝุ่น · ขนนกโปรย */
P9X.q8sky=C=>{const {f,t}=C,D=f.d||2.8,o=p9Own(f),col=f.u==='b'?'255,215,110':f.u==='a'?'255,160,80':'170,230,255';
  if(C.E('c',0)){p9Beam(o.x,o.y,40,380,col,D,{a:.55});p9Sw(o.x,o.y+4,70,col,520,5);p9Sw(o.x,o.y+4,120,col,640,3,.1);p9B(o.x,o.y,2,14,{ty:'sm',c:'215,225,230',rad:20,sp:[90,180],up:[5,20],dr:2,s:[10,14],s1:28,l:[.6,1],a:.55});
    p9B(o.x,o.y,10,20,{ty:'lf',c:['250,250,255','230,240,255','255,250,230'],rad:20,sp:[30,120],up:[120,260],g:60,dr:1.2,s:[3.5,5],l:[1.4,2.2],vr:4});if(f.by===uid)p9Scr('vg','60,110,160',.2,D,{in:.3,id:'sky'})}
  if(t<D-.2){const n=C.A('lf',8);for(let i=0;i<n;i++)p9P({ty:'lf',x:o.x+p9r(-30,30),y:o.y+p9r(-6,6),z:p9r(70,110),vx:p9r(-20,20),vz:-p9r(5,20),g:14,dr:.8,c:p9pick(['250,250,255','255,245,215']),s:p9r(3,4.5),l:p9r(1.2,1.8),vr:p9r(-3,3)});
    const s=C.A('st',14);for(let i=0;i<s;i++)p9P({ty:'st',x:o.x+p9r(-40,40),y:o.y+p9r(-10,10),z:p9r(20,120),vz:p9r(-10,20),c:col,s:p9r(1.2,2.2),l:p9r(.4,.8)})}};
/* ศรดิ่งจากฟ้า: หางประกาย · กระแทกพื้น */
P9X.q8sar=C=>{const {f,t,D,x,y}=C,T=.47*D,big=f.u==='b',col=big?'255,220,120':f.u==='a'?'255,150,70':'170,230,255';
  if(t<T){const q=q8ei(t/T),px=f.sx+(x-f.sx)*q,py=f.sy+(y-10-f.sy)*q,n=C.A('tr',big?160:90);for(let i=0;i<n;i++)p9P({ty:'sk',x:px,y:py+20,z:20,vx:p9r(-30,30),vy:p9r(-30,30),vz:p9r(-30,30),c:p9pick([col,'255,255,255']),s:p9r(1,1.8),l:p9r(.12,.25)})}
  if(C.E('hit',T)){p9B(x,y,6,big?16:6,{ty:'sk',c:[col,'255,255,255'],sp:[60,big?260:160],up:[40,big?260:150],g:400,s:[1.2,2.2],l:[.2,.45]});p9Sw(x,y+4,big?60:22,col,big?520:300,big?6:3);
    if(big){p9Beam(x,y,26,360,col,.5,{sk:1});p9Dec(x,y,50,'holy',2600);p9B(x,y,0,10,{ty:'ch',c:['200,170,100','150,120,70'],sp:[60,180],up:[140,280],g:700,bo:.3,s:[2.4,4],l:[.9,1.4],vr:9});if(f.by===uid)p9Scr('fl','255,235,170',.14,.3)}
    else p9P({ty:'sm',x,y,z:2,vz:12,c:'200,200,190',s:8,s1:18,l:.5,a:.5})}};
/* มังกรอัคคี: ไฟ/ควัน/ถ่านตามหัวมังกร · รอยไหม้บนทาง · วงเวทตอนเรียก (u='i' น้ำแข็ง) */
P9X.q8drg=C=>{const {f,t,x,y}=C,D=f.d||2.35,T1=f.sx||1.1,T2=f.sy||1,own=p9Own(f),ice=f.u==='i',c1=ice?'150,215,255':'255,120,40',c2=ice?'230,248,255':'255,200,90';
  if(C.E('c',0)){p9Mark({ty:'sig',x,y:y+4,r:70,c:ice?'150,215,255':'255,120,40',l:1.6,fo:.8,sp:1.4,n:7,st:3});p9Beam(x,y,30,260,c1,.6);p9Sw(x,y+4,80,c1,520,6);if(f.by===uid)p9Scr('vg',ice?'20,60,120':'120,40,0',.26,D,{in:.2,id:'drg'});p9Shk(f,x,y,.25)}
  if(t>D-.25)return;(f.u==='2'?[1,-1]:[1]).forEach(ph=>{const P=q8DragP(x,y,f.a,f.len||420,Math.min(t,T1+T2),T1,T2,own,ph),hx=P[0],hy=P[1];
    {g.save();g.globalCompositeOperation='lighter';for(let j=2;j<18;j+=3){const tt=Math.max(0,t-j*.045),Q=q8DragP(x,y,f.a,f.len||420,Math.min(tt,T1+T2),T1,T2,own,ph);glowAt(Q[0],Q[1]-22,30-j,c1,.32);if(Math.random()<.5*p9Q())p9P({ty:ice?'gl':'fl',x:Q[0]+p9r(-6,6),y:Q[1],z:p9r(16,28),vz:p9r(20,60),c:p9pick([c1,c2]),s:p9r(3,5),l:p9r(.25,.45)})}g.restore()}
    const n=C.A('h'+ph,ice?50:70);for(let i=0;i<n;i++){if(ice)p9P({ty:Math.random()<.4?'sh':'gl',x:hx+p9r(-10,10),y:hy+p9r(-6,6),z:p9r(14,30),vx:p9r(-40,40),vy:p9r(-20,20),vz:p9r(-20,40),g:120,c:p9pick([c1,c2]),s:p9r(1.6,3),l:p9r(.4,.8),vr:p9r(-8,8)});
      else p9P({ty:'fl',x:hx+p9r(-12,12),y:hy+p9r(-6,6),z:p9r(10,26),vz:p9r(30,80),vx:p9r(-30,30),c:p9pick([c1,c2,'255,90,30']),s:p9r(4,7),l:p9r(.3,.55)})}
    const s=C.A('s'+ph,12);for(let i=0;i<s;i++)p9P({ty:'sm',x:hx,y:hy,z:p9r(16,30),vz:p9r(20,40),vx:p9r(-15,15),c:ice?'200,230,250':'50,40,36',s:p9r(8,11),s1:22,l:p9r(.6,1),a:ice?.45:.6});
    if(C.R('m'+ph,.07))p9Mark({ty:'glow',x:hx,y:hy+2,r:30,c:ice?'150,215,255':'255,100,30',l:1.8,a:.8})})};
/* จันทราประหาร: ฟ้ามืด + จันทร์ยักษ์ลอยขึ้น → ฟันแล้วแสงวาบ */
P9X.q8moon=C=>{const {f,t,now}=C,D=f.d||1.3,o=p9Own(f),al=Math.min(1,t/.2,(D-t)/.2);
  if(C.E('c',0)){if(f.by===uid||p9Near(o.x,o.y,420))p9Scr('dim','12,4,30',.4,D+.2,{in:.25,id:'moon'});p9B(o.x,o.y,10,12,{ty:'sm',c:'70,34,110',a:.45,rad:20,sp:[40,120],up:[10,40],dr:1.6,s:[10,14],s1:28,l:[.6,1]})}
  if(al>0){const mx=o.x+130,my=o.y-170-q8eo(Math.min(1,t/.6))*30,R=34;g.save();g.globalCompositeOperation='lighter';glowAt(mx,my,R*4,'200,180,255',.5*al);p9Rays(mx,my,R*3.4,'220,210,255',.3*al,10,now*.2,18,1);
    g.fillStyle='rgba(245,240,255,'+(.95*al)+')';g.beginPath();g.arc(mx,my,R,0,6.2832);g.arc(mx+R*.42,my-R*.28,R*.86,0,6.2832,true);g.fill('evenodd');g.restore()}
  if(C.E('cut',.98)){if(f.by===uid||p9Near(o.x,o.y,420))p9Scr('fl','230,220,255',.22,.35);p9Shk(f,o.x,o.y,.3)}};
P9X.q8mcut=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,14,8,{ty:'sh',c:['220,200,255','250,245,255'],sp:[80,200],up:[60,200],g:400,s:[2.6,4],l:[.4,.7],vr:12});p9B(x,y,14,6,{ty:'st',c:'220,200,255',sp:[30,120],up:[20,100],g:60,dr:1.2,s:[1.6,2.6],l:[.5,.9]});
  p9Sw(x,y+4,r*.9,'190,150,255',420,5);p9Mark({ty:'slash',x,y:y-2,an:f.a||0,r:r*.9,w:16,c:'220,200,255',c0:'20,6,40',l:1.2,fo:.6});p9Beam(x,y,12,220,'210,190,255',.35)};
/* โซ่ตรวนสวรรค์: แสงลงจากฟ้าตามโซ่ · ล่ามแล้ววงเวททอง · โซ่ขาดเป็นเศษทอง */
P9X.q8chn=C=>{const {f,t}=C,D=f.d||3.4,L=q8Lp(f),o=p9Own(f);
  if(C.E('c',0)){L.forEach(([mx,my],i)=>p9Beam(mx,my,14,300,'255,220,120',.55,{dl:i*.03}));if(f.by===uid)p9Scr('vg','150,110,20',.22,D,{in:.3,id:'chn'})}
  if(C.E('lk',.35)){L.forEach(([mx,my])=>{p9Sw(mx,my+4,34,'255,215,120',420,5);p9B(mx,my,20,8,{ty:'sk',c:['255,225,140','255,255,230'],sp:[80,200],up:[40,180],g:300,s:[1.4,2.2],l:[.25,.45]});p9Mark({ty:'sig',x:mx,y:my+4,r:26,c:'255,214,120',l:D-.3,fo:.4,sp:1.2,n:5,st:2})});p9Shk(f,o.x,o.y,.22)}
  if(t>.4&&t<D-.4){const n=C.A('mt',L.length*5);for(let i=0;i<n;i++){const q=p9pick(L);p9P({ty:'gl',x:q[0]+p9r(-10,10),y:q[1],z:p9r(30,200),vz:p9r(-40,-10),c:'255,225,140',s:p9r(1,1.8),l:p9r(.5,.9)})}}
  if(C.E('br',D-.35))L.forEach(([mx,my])=>p9B(mx,my,60,10,{ty:'sh',c:['255,215,110','255,240,180','200,150,40'],rad:20,sp:[60,180],up:[40,160],g:500,s:[2,3.4],l:[.6,1],vr:12}))};
P9X.q8hlr=C=>{const {x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,6,14,{ty:'gl',c:['255,160,210','255,220,235','190,255,200'],rad:r*.6,sp:[0,20],up:[40,110],g:-10,s:[1.4,2.6],l:[.7,1.2]})};
/* ================= อัลติสายทมิฬ ================= */
/* กองทัพวิญญาณเหล็ก: วงอัญเชิญ · เสาแสงที่อัศวินเกิด · ไอวิญญาณลอยจากอัศวิน */
P9X.q8kn=C=>{const {f,t}=C,D=f.d||8,o=p9Own(f),n=parseInt(f.u)||3;
  if(C.E('c',0)){p9Mark({ty:'sig',x:o.x,y:o.y+4,r:90,c:'150,200,255',l:2,fo:.8,sp:.8,n:n+2,st:2});for(let i=0;i<n;i++){const P=q8KnP(o.x,o.y,0,i,n);p9Beam(P[0],P[1],22,300,'170,215,255',.7,{dl:i*.08,sk:1});p9B(P[0],P[1],6,8,{ty:'sm',c:'170,200,230',sp:[30,80],up:[10,40],dr:1.5,s:[10,14],s1:24,l:[.6,1],a:.5,dl:i*.08})}
    p9Sw(o.x,o.y+4,110,'150,200,255',600,6);p9Shk(f,o.x,o.y,.3);if(f.by===uid)p9Scr('vg','40,70,120',.22,D,{in:.3,id:'kn'})}
  if(t<D-.3){const k=C.A('w',n*6);for(let i=0;i<k;i++){const P=q8KnP(o.x,o.y,t,Math.random()*n|0,n);p9P({ty:'gl',x:P[0]+p9r(-10,10),y:P[1],z:p9r(10,40),vz:p9r(30,60),vx:p9r(-10,10),c:p9pick(['170,215,255','220,240,255']),s:p9r(1.2,2),l:p9r(.5,.9)})}}
  if(C.E('end',D-.35))for(let i=0;i<n;i++){const P=q8KnP(o.x,o.y,t,i,n);p9B(P[0],P[1],20,10,{ty:'gl',c:'190,225,255',sp:[10,40],up:[60,140],g:-20,s:[1.4,2.4],l:[.6,1]})}};
P9X.q8kns=C=>{const {f,t,D,x,y}=C;if(!C.E('hit',.4*D))return;p9B(x,y,14,10,{ty:'sk',c:['190,225,255','255,255,255'],sp:[80,220],up:[40,180],g:300,s:[1.4,2.2],l:[.2,.4]});p9Sw(x,y+4,34,'170,215,255',340,4);p9Dec(x,y,24,'crack',1800);
  p9B(x,y,0,3,{ty:'ch',c:['110,110,120','80,80,90'],sp:[30,100],up:[100,200],g:700,bo:.3,s:[2,3],l:[.7,1],vr:8});if(f.by===uid)try{shk=Math.max(shk,.1)}catch(e){}};
/* นักล่าลมกรด: ใบไม้/ลมหมุนรอบตัว · ใบมีดลมทิ้งประกาย · ไซโคลนปิดฉากหอบใบไม้ขึ้นฟ้า */
P9X.q8gale=C=>{const {f,t,now}=C,D=f.d||5,o=p9Own(f);
  if(C.E('c',0)){p9Sw(o.x,o.y+4,70,'150,255,170',480,5);p9Sw(o.x,o.y+4,120,'150,255,170',600,3,.1);p9B(o.x,o.y,2,12,{ty:'sm',c:'210,230,210',rad:20,sp:[90,180],up:[5,20],dr:2,s:[10,14],s1:26,l:[.6,1],a:.5});if(f.by===uid)p9Scr('vg','30,90,40',.18,D,{in:.3,id:'gale'})}
  {const al=Math.min(1,t/.3,(D-t)/.3);if(al>0){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let i=0;i<5;i++){const h=i*14,R=34+i*7,ro=now*(7-i*.6)+i*1.3;g.strokeStyle='rgba(210,255,220,'+(.45*al*(1-i*.12))+')';g.lineWidth=2.6-i*.3;
      g.beginPath();g.ellipse(o.x,o.y+2-h,R,R*.32,0,ro,ro+2.4);g.stroke();g.strokeStyle='rgba(255,255,255,'+(.35*al)+')';g.lineWidth=1;g.beginPath();g.ellipse(o.x,o.y+2-h,R,R*.32,0,ro+3.2,ro+4.4);g.stroke()}g.restore()}}
  if(t<D-.2){const n=C.A('lf',22);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=p9r(30,56);p9P({ty:'lf',x:o.x+Math.cos(a)*d,y:o.y+Math.sin(a)*d*.5,z:p9r(4,40),vx:-Math.sin(a)*180,vy:Math.cos(a)*90,vz:p9r(20,60),dr:1.2,c:p9pick(['220,255,200','190,245,160','255,255,235']),s:p9r(3,4.4),l:p9r(.5,.8),vr:p9r(-8,8)})}
    const s=C.A('sk',26);for(let i=0;i<s;i++){const a=Math.random()*6.283,d=p9r(26,50);p9P({ty:'sk',x:o.x+Math.cos(a)*d,y:o.y+Math.sin(a)*d*.5,z:p9r(4,36),vx:-Math.sin(a)*240,vy:Math.cos(a)*120,c:p9pick(['200,255,210','255,255,255']),s:p9r(1,1.6),l:p9r(.15,.3)})}}};
P9X.q8wbl=C=>{const {f,t,D,x,y}=C;if(!C.E('hit',.5*D))return;p9B(x,y,12,5,{ty:'sk',c:['190,255,200','255,255,255'],sp:[60,180],up:[20,120],g:300,s:[1.2,2],l:[.15,.3]});p9B(x,y,10,2,{ty:'lf',c:['120,200,90','170,230,120'],sp:[40,100],up:[40,120],g:120,dr:1,s:[2.4,3.4],l:[.6,1],vr:6})};
P9X.q8cyc=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;for(let i=0;i<34;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'lf',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.5,z:p9r(0,20),vx:-Math.sin(a)*200,vy:Math.cos(a)*100,vz:p9r(120,260),g:60,dr:.8,c:p9pick(['120,200,90','90,170,70','170,230,120']),s:p9r(2.6,4),l:p9r(1,1.6),vr:p9r(-8,8)})}
  p9B(x,y,4,14,{ty:'sm',c:'200,215,190',rad:r*.5,sp:[r*.6,r*1.3],up:[10,40],dr:1.6,s:[12,16],s1:32,l:[.7,1.1],a:.55});p9Sw(x,y+4,r*1.05,'160,255,180',560,7);p9Sw(x,y+4,r*1.45,'160,255,180',700,3,.1);p9Beam(x,y,r*.3,320,'170,255,190',.6);p9Shk(f,x,y,.35);if(f.by===uid)p9Scr('fl','200,255,210',.12,.28)};
/* หัตถ์ปีศาจ: รอยแยกนรก (ไฟ+ควัน) · บีบเป็นจังหวะ · ทุบลงพื้นแรงมาก */
P9X.q8hand=C=>{const {f,t,x,y,r}=C,D=f.d||2.95,B=f.u==='b',c1=B?'255,60,90':'255,110,40';
  if(C.E('c',0)){p9Mark({ty:'sig',x,y:y+4,r:r*.9,c:B?'255,60,90':'255,90,30',l:D,fo:.4,sp:-.8,n:9,st:4});p9B(x,y,4,14,{ty:'sm',c:'30,6,6',rad:r*.5,sp:[20,60],up:[20,50],dr:1.2,s:[12,16],s1:30,l:[.8,1.3]});
    if(f.by===uid||p9Near(x,y,420))p9Scr('dim',B?'40,0,10':'40,6,0',.32,D,{in:.3,id:'hand'})}
  if(t<D-.5){const n=C.A('fl',30);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*p9r(.2,.85);p9P({ty:'fl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.45,z:0,vz:p9r(30,80),c:p9pick([c1,'255,170,60']),s:p9r(4,7),l:p9r(.3,.55)})}}
  if(C.E('gr',.45)){p9Sw(x,y+4,r*.8,c1,420,6);p9Shk(f,x,y,.2)}
  if(t>.6&&t<2.4&&C.R('sq',.45,.6)){p9B(x,y-40,30,10,{ty:'sk',c:[c1,'255,230,180'],rad:30,sp:[60,160],up:[20,120],g:300,s:[1.4,2.2],l:[.2,.4]});if(f.by===uid)try{shk=Math.max(shk,.12)}catch(e){}}
  if(C.E('sl',2.5)){p9B(x,y,0,26,{ty:'ch',c:['80,30,24','60,20,16','120,50,30'],rad:r*.4,sp:[80,260],up:[160,380],g:800,bo:.3,s:[2.6,5],l:[1.1,1.7],vr:10});p9B(x,y,6,18,{ty:'sm',c:'40,14,10',rad:r*.4,sp:[r*.6,r*1.4],up:[10,40],dr:1.6,s:[14,18],s1:40,l:[.9,1.4]});
    p9B(x,y,4,24,{ty:'fl',c:[c1,'255,180,70','255,90,30'],rad:r*.5,sp:[20,80],up:[60,160],s:[5,8],l:[.4,.7]});for(let i=0;i<3;i++)p9Sw(x,y+4,r*(.7+i*.4),c1,600,8-i*2,i*.08);[[0,0],[-.5,.2],[.5,-.15],[.1,.45]].forEach(([u,v])=>p9Dec(x+u*r,y+v*r*.5,46,'crack',3200));
    for(let i=0;i<4;i++){const a=i*1.5708+.6;p9Beam(x+Math.cos(a)*r*.5,y+Math.sin(a)*r*.25,16,240,c1,.5,{dl:i*.03})}p9Shk(f,x,y,.6);if(f.by===uid||p9Near(x,y,420))p9Scr('fl','255,150,80',.2,.35)}};
/* ระบำเงาสะท้อน: ร่างเงาเกิดจากควันดำ · เงาลอยจากร่าง · ฟันทิ้งประกายม่วง */
P9X.q8cln=C=>{const {f,t,now}=C,D=f.d||6,o=p9Own(f),n=parseInt(f.u)||4;
  if(C.E('c',0)){for(let i=0;i<n;i++){const P=q8ClnP(o.x,o.y,0,i,n);p9B(P[0],P[1],10,6,{ty:'sm',c:'70,30,110',a:.45,sp:[30,90],up:[10,40],dr:1.4,s:[10,14],s1:26,l:[.6,1]});p9Beam(P[0],P[1],14,160,'190,130,255',.45,{dl:i*.05});p9B(P[0],P[1],20,5,{ty:'lf',c:['20,10,30','50,25,80'],sp:[30,90],up:[80,160],g:100,dr:1.2,s:[3.5,5],l:[1,1.6],vr:4})}
    p9Sw(o.x,o.y+4,80,'170,110,255',480,5);if(f.by===uid)p9Scr('vg','40,10,70',.24,D,{in:.3,id:'cln'})}
  {const al=Math.min(1,t/.3,(D-t)/.25);if(al>0){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const P=q8ClnP(o.x,o.y,t,i,n);g.save();g.translate(P[0],P[1]+3);g.scale(1,.42);glowAt(0,0,22,'170,110,255',.55*al);g.restore();glowAt(P[0],P[1]-16,18,'150,90,255',.3*al)}g.restore()}}
  if(t<D-.25){const k=C.A('w',n*5);for(let i=0;i<k;i++){const P=q8ClnP(o.x,o.y,t,Math.random()*n|0,n);p9P({ty:'sm',x:P[0]+p9r(-6,6),y:P[1],z:p9r(10,30),vz:p9r(20,40),c:'80,40,120',s:p9r(5,7),s1:14,l:p9r(.4,.7),a:.4})}}};
P9X.q8cls=C=>{const {f,x,y}=C;if(!C.E('b',0))return;p9B(x,y,14,6,{ty:'sk',c:['200,150,255','255,255,255'],sp:[60,180],up:[20,120],g:300,s:[1.2,2],l:[.15,.3]});p9Mark({ty:'slash',x,y:y-2,an:Math.atan2(y-f.sy,x-f.sx),r:22,w:10,c:'210,170,255',c0:'20,4,40',l:.6,fo:.3})};
/* พิธีสาปแช่ง: พื้นในวงมืดลง · เสาเพลิงม่วงที่ปลายดาว · วิญญาณลอย */
P9U.q8rit=C=>{const {f,t,x,y,r}=C,D=f.d||6,al=Math.min(1,t/.4,(D-t)/.3),R=r*q8eo(Math.min(1,t/.5));if(al<=0)return;g.save();g.translate(x,y+4);g.scale(1,.45);const gr=g.createRadialGradient(0,0,R*.2,0,0,R);gr.addColorStop(0,'rgba(10,0,20,'+(.45*al)+')');gr.addColorStop(1,'rgba(30,0,50,'+(.2*al)+')');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,6.2832);g.fill();g.restore()};
P9X.q8rit=C=>{const {f,t,x,y,r,now}=C,D=f.d||6,B=f.u==='b',c1=B?'255,70,100':'180,90,255',al=Math.min(1,t/.4,(D-t)/.3),R=r*q8eo(Math.min(1,t/.5));
  if(C.E('c',0)){p9Sw(x,y+4,r,c1,600,7);p9Sw(x,y+4,r*1.4,c1,720,3,.1);p9B(x,y,4,16,{ty:'sm',c:B?'50,4,14':'30,6,50',rad:r*.6,sp:[20,60],up:[10,40],dr:1.2,s:[12,16],s1:30,l:[.8,1.3]});if(f.by===uid||p9Near(x,y,420))p9Scr('vg',B?'90,0,20':'50,10,90',.28,D,{in:.4,id:'rit'})}
  if(al>0){g.save();g.globalCompositeOperation='lighter';const sp=B?1.8:1;for(let i=0;i<5;i++){const an=now*.35*sp+i*1.2566-1.5708,px=x+Math.cos(an)*R*.86,py=y+4+Math.sin(an)*R*.86*.45,h=90+20*Math.sin(now*6+i);
      const gr=g.createLinearGradient(0,py-h,0,py);gr.addColorStop(0,'rgba('+c1+',0)');gr.addColorStop(1,'rgba('+c1+','+(.55*al)+')');g.fillStyle=gr;g.beginPath();g.moveTo(px-7,py);g.quadraticCurveTo(px-4,py-h*.5,px+Math.sin(now*5+i)*4,py-h);g.quadraticCurveTo(px+4,py-h*.5,px+7,py);g.closePath();g.fill();glowAt(px,py-6,18,c1,.6*al)}g.restore();
    const n=C.A('w',26*al);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=R*Math.sqrt(Math.random());p9P({ty:Math.random()<.3?'rn':'gl',x:x+Math.cos(a)*d,y:y+4+Math.sin(a)*d*.45,z:2,vz:p9r(20,50),c:p9pick([c1,'230,200,255']),s:p9r(1.4,3),l:p9r(.7,1.2)})}}};
P9X.q8rp=C=>{const {x,y,r}=C;if(!C.E('b',0))return;for(let i=0;i<6;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9B(x+Math.cos(a)*d,y+Math.sin(a)*d*.45,14,2,{ty:'sk',c:['200,140,255','255,255,255'],sp:[30,90],up:[60,160],g:300,s:[1.2,2],l:[.2,.4]})}};
setTimeout(()=>{try{p9Wrap()}catch(e){}},0);
