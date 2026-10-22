
/* ===== v490 · ตัวเสริมภาพสกิลประจำอาชีพเดิม (ขั้นปกติ · ตื่นพลังแสง/ทมิฬ) — ใช้เครื่องยนต์ P9 เดียวกับคลังสกิล =====
   ปุ่มเบา (ประกาย/ฝุ่น/จังหวะกระทบ) · อัลติหนัก (แสงลำ วงคลื่น หิน รอยพื้น ขอบจอ จอสั่น) · ชนิดที่ใช้บ่อยมาก (impshot curse) ไม่แตะ */
const p9Mi=f=>f.by===uid,p9Nr=(f,x,y)=>f.by===uid||p9Near(x,y,400);
/* ---------- นักดาบ ---------- */
/* วังวนดาบ: ประกายวิ่งตามวงดาบ · ฝุ่นรอบตัว */
P9X.whirl=C=>{const {f,t,D,x,y,r}=C,p=t/D,rot=p*10+(f.s||0);
  if(C.E('c',0)){p9B(x,y,2,8,{ty:'sm',c:'150,125,100',rad:r*.5,sp:[r*.6,r*1.2],up:[5,20],dr:2,s:[8,11],s1:20,l:[.4,.7],a:.5});p9Sw(x,y+4,r*.9,'255,120,80',360,4);if(f.by===uid)try{shk=Math.max(shk,.1)}catch(e){}}
  if(p<.85){const n=C.A('t',110);for(let i=0;i<n;i++){const b=rot+Math.floor(Math.random()*3)*2.094+Math.random()*1.4,R=r*.78;p9P({ty:Math.random()<.75?'sk':'gl',x:x+Math.cos(b)*R,y:y+Math.sin(b)*R,z:p9r(4,16),vx:-Math.sin(b)*p9r(180,320),vy:Math.cos(b)*p9r(180,320),vz:p9r(0,50),dr:3,c:p9pick(['255,140,90','255,220,190','255,90,60']),s:p9r(1.2,2.2),l:p9r(.12,.25)})}}};
/* พุ่งฟัน: ฝุ่นจุดเริ่ม · ภาพติดตาเป็นประกาย · รอยฟันปลายทาง */
P9X.dash=C=>{const {f,x,y}=C;if(!C.E('c',0))return;const L=f.len||120,a=f.a||0,ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L;
  p9B(x,y,2,6,{ty:'sm',c:'150,125,100',sp:[30,80],up:[5,20],dr:1.8,s:[8,11],s1:20,l:[.4,.7],a:.5});
  p9Along(x,y,ex,ey,8,(px,py,u)=>p9B(px,py,10,3,{ty:'sk',c:['255,120,80','255,230,200'],ang:a+3.14,spr:.8,sp:[60,180],up:[10,60],g:200,s:[1.2,2],l:[.15,.3],dl:u*.1}));
  p9B(ex,ey,10,10,{ty:'sk',c:['255,150,100','255,255,240'],ang:a,spr:1.6,sp:[100,240],up:[20,120],g:300,s:[1.2,2.2],l:[.2,.4],dl:.08});p9B(ex,ey,0,3,{ty:'ch',c:['110,95,80','85,72,60'],ang:a,spr:1.5,sp:[40,120],up:[80,180],g:700,bo:.3,s:[2,3],l:[.7,1],vr:8,dl:.08});
  p9Mark({ty:'slash',x:ex,y:ey,an:a,r:30,w:12,c:'255,160,120',c0:'40,10,4',l:.9,fo:.5})};
/* โทสะอสูร: เปลวไฟพุ่งรอบตัว ถ่านลอย ขอบจอแดงสั้น ๆ */
P9X.rage=C=>{const {f,x,y,r}=C;if(!C.E('c',0))return;for(let i=0;i<16;i++){const a=i/16*6.283;p9P({ty:'fl',x:x+Math.cos(a)*r*.7,y:y+10+Math.sin(a)*r*.3,z:0,vz:p9r(60,130),vx:Math.cos(a)*30,vy:Math.sin(a)*15,c:p9pick(['255,120,40','255,170,60','255,80,30']),s:p9r(5,8),l:p9r(.35,.6),dl:Math.random()*.15})}
  p9B(x,y,10,14,{ty:'gl',c:'255,150,60',rad:r*.6,sp:[10,40],up:[60,140],g:-20,s:[1.4,2.4],l:[.6,1.1],fk:1});p9Sw(x,y+8,r*1.2,'255,110,50',420,5);p9Dec(x,y,r*.7,'fire',1800);
  if(f.by===uid){p9Scr('vg','130,20,0',.24,.9,{in:.05,id:'rage'});try{shk=Math.max(shk,.14)}catch(e){}}};
/* คำราม (คำรามโลหิต · ป้อมปราการ): คลื่นเสียงยกฝุ่น หินดีด */
P9X.roar=C=>{const {f,x,y,r}=C;if(!C.E('c',0))return;p9Sw(x,y+4,r*.8,'255,110,60',460,6);p9Sw(x,y+4,r*1.2,'255,110,60',600,3,.08);
  p9B(x,y,2,10,{ty:'sm',c:'150,125,100',rad:r*.3,sp:[r*.8,r*1.6],up:[5,20],dr:2,s:[9,12],s1:24,l:[.5,.8],a:.5});p9B(x,y,0,5,{ty:'ch',c:['110,95,80','85,72,60'],rad:r*.3,sp:[60,160],up:[100,220],g:700,bo:.3,s:[2,3.2],l:[.8,1.1],vr:8});p9Shk(f,x,y,.2)};
/* ฟันแยกปฐพี: หินพุ่งตามรอยแยกที่วิ่งออกไป → ครบแนวแล้วลำแสง/รอยแตก/จอสั่น */
P9X.quake=C=>{const {f,t,D,x,y}=C,ca=Math.cos(f.a||0),sa=Math.sin(f.a||0),Lf=f.len||200,te=D*.25;
  if(t<te+.02&&C.R('er',.05)){const L=Lf*Math.min(1,t/te),px=x+ca*L,py=y+sa*L;p9B(px,py,0,3,{ty:'ch',c:['110,85,65','80,60,45','150,110,80'],sp:[20,90],up:[150,320],g:780,bo:.3,s:[2.4,4.2],l:[1,1.5],vr:10});
    p9B(px,py,6,4,{ty:'sk',c:['255,130,60','255,230,180'],sp:[20,90],up:[120,300],g:500,s:[1.4,2.2],l:[.3,.5]});p9P({ty:'sm',x:px,y:py,z:4,vz:20,c:'120,95,75',s:10,s1:24,l:.8,a:.55})}
  if(C.E('full',te)){[.25,.6,.95].forEach((u,i)=>{const px=x+ca*Lf*u,py=y+sa*Lf*u;p9Sw(px,py+4,60,'255,120,50',480,6,i*.05);p9Dec(px,py,42,'crack',3200);p9Beam(px,py,18,200,'255,120,50',.4,{dl:i*.05})});p9Shk(f,x+ca*Lf/2,y+sa*Lf/2,.42);if(f.by===uid)p9Scr('vg','120,30,0',.26,1,{in:.05,id:'quake'})}};
/* ปฐพีโลหิต: เลือดพุ่ง ลำแสงแดงตามแนว */
P9X.bloodline=C=>{const {f,t,D,x,y}=C,ca=Math.cos(f.a||0),sa=Math.sin(f.a||0),L=f.len||260,ex=x+ca*L,ey=y+sa*L;
  if(C.E('c',0)){p9Along(x,y,ex,ey,5,(px,py,u,i)=>{p9Beam(px,py,16,180,'255,50,40',.5,{dl:u*.15});p9B(px,py,6,4,{ty:'bl',c:'150,0,14',sp:[30,100],up:[120,260],g:640,s:[1.4,2.4],l:[1,1.6],dl:u*.15})});if(f.by===uid)p9Scr('vg','110,0,6',.32,D,{in:.1,id:'bld'})}
  if(t<D*.85){const n=C.A('e',50);for(let i=0;i<n;i++){const u=Math.random();p9P({ty:Math.random()<.5?'gl':'sk',x:x+ca*L*u+p9r(-12,12),y:y+sa*L*u+p9r(-8,8),z:2,vz:p9r(60,140),c:p9pick(['255,60,40','255,150,110']),s:p9r(1.2,2.2),l:p9r(.4,.8),fk:1})}}};
/* ทุบโล่สะท้าน: หินกระเด็นเป็นรูปพัด ประกายทอง รอยแตก */
P9X.bash=C=>{const {f,x,y,r}=C;if(!C.E('c',0))return;const a=f.a||0,cx=x+Math.cos(a)*r*.5,cy=y+Math.sin(a)*r*.5;
  p9B(x,y,0,12,{ty:'ch',c:['120,110,100','90,82,74','150,135,110'],ang:a,spr:1.8,sp:[80,240],up:[120,280],g:760,bo:.3,s:[2.4,4],l:[.9,1.4],vr:10});p9B(x,y,10,16,{ty:'sk',c:['255,225,140','255,255,230'],ang:a,spr:1.9,sp:[140,300],up:[30,160],g:300,s:[1.4,2.2],l:[.2,.4]});
  p9B(cx,cy,2,8,{ty:'sm',c:'150,135,110',ang:a,spr:1.6,sp:[60,160],up:[5,20],dr:1.8,s:[9,12],s1:24,l:[.5,.8],a:.55});p9Dec(cx,cy,48,'crack',2800);p9Sw(x,y+4,r*.7,'255,215,120',420,6);p9Shk(f,x,y,.32)};
/* ป้อมปราการนิรันดร์: เสาแสงฟ้ารอบวง · วงเวทป้อม · ละอองฟ้าลอย */
P9X.fort=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){for(let i=0;i<6;i++){const a=i*1.047;p9Beam(x+Math.cos(a)*r*.9,y+Math.sin(a)*r*.45,14,260,'150,200,255',.8,{dl:i*.05})}p9Mark({ty:'sig',x,y,r:r*.95,c:'150,200,255',l:D,fo:.6,sp:.3,n:6,st:2});p9Sw(x,y,r,'150,200,255',600,7);p9Shk(f,x,y,.3);if(f.by===uid)p9Scr('vg','30,60,120',.22,D,{in:.3,id:'fort'})}
  if(t<D-.3){const n=C.A('m',20);for(let i=0;i<n;i++){const a=Math.random()*6.283;p9P({ty:'gl',x:x+Math.cos(a)*r*p9r(.8,.95),y:y+Math.sin(a)*r*.45*p9r(.8,.95),z:2,vz:p9r(30,70),c:p9pick(['160,210,255','220,240,255']),s:p9r(1.2,2),l:p9r(.6,1)})}}};
/* ระเบิดธาตุ (รูน) · ไฟใต้เท้า (รูน) · ดาวหางไฟ (รูน) */
P9X.elbx=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;const big=r>=110;p9B(x,y,0,big?10:6,{ty:'ch',c:['110,90,70','80,64,50'],rad:10,sp:[60,r*1.6],up:[140,300],g:760,bo:.3,s:[2.4,4],l:[.9,1.4],vr:10});p9B(x,y,8,big?16:10,{ty:'sk',c:['255,170,80','255,240,200'],sp:[100,r*2.6],up:[60,240],g:400,s:[1.4,2.4],l:[.25,.5]});
  p9B(x,y,10,8,{ty:'fl',c:['255,120,40','255,180,70'],rad:r*.3,sp:[10,50],up:[40,110],s:[5,8],l:[.3,.55]});p9B(x,y,4,6,{ty:'sm',c:'70,55,45',rad:r*.2,sp:[r*.4,r*.9],up:[10,30],dr:1.4,s:[10,14],s1:28,l:[.7,1.1],a:.6});p9Dec(x,y,r*.6,'fire',2400);p9Shk(f,x,y,big?.26:.16)};
P9X.rnfire=C=>{const {t,D,x,y,r}=C;if(t>D*.85)return;const n=C.A('e',10);for(let i=0;i<n;i++)p9P({ty:'gl',x:x+p9r(-r,r)*.7,y:y+p9r(-r,r)*.3,z:2,vz:p9r(30,70),c:'255,150,60',s:p9r(1,1.8),l:p9r(.4,.8),fk:1})};
P9X.rncomet=C=>{const {f,t,D,x,y}=C,L=f.len||200,a=f.a||0,p=t/D,d=L*Math.min(1,p*1.15),cx=x+Math.cos(a)*d,cy=y+Math.sin(a)*d;
  if(p<.85){const n=C.A('t',80);for(let i=0;i<n;i++)p9P({ty:Math.random()<.6?'fl':'sk',x:cx+p9r(-6,6),y:cy,z:10+p9r(-4,4),vx:-Math.cos(a)*p9r(40,100),vy:-Math.sin(a)*p9r(40,100),vz:p9r(10,50),c:p9pick(['255,140,60','255,220,150']),s:p9r(2,4),l:p9r(.15,.3)})}
  if(C.E('end',D*.85)){p9B(cx,cy,8,10,{ty:'sk',c:['255,170,80','255,240,200'],sp:[80,200],up:[40,180],g:400,s:[1.4,2.2],l:[.2,.4]});p9Sw(cx,cy+4,40,'255,140,60',380,4);p9Dec(cx,cy,30,'fire',2000)}};
/* ---------- นักธนู ---------- */
/* ห่าธนู: ลูกธนูปักพื้นมีฝุ่น/ประกายทีละดอก */
P9X.arrows=C=>{const {f,t,D,x,y,r}=C;for(let i=0;i<20;i++){const at=(fxR(f,i,3)*.4+.2)*D;if(!C.E('a'+i,at))continue;const ang=fxR(f,i,1)*6.283,dd=Math.sqrt(fxR(f,i,2))*r*.9,lx=x+Math.cos(ang)*dd,ly=y+Math.sin(ang)*dd;
    p9B(lx,ly,4,3,{ty:'sk',c:['190,255,170','255,255,230'],sp:[40,110],up:[40,120],g:400,s:[1,1.6],l:[.15,.3]});p9P({ty:'sm',x:lx,y:ly,z:2,vz:12,c:'160,140,110',s:5,s1:13,l:.45,a:.45});if(i%4===0)p9P({ty:'ring',x:lx,y:ly+2,c:'190,255,170',s:4,s1:18,l:.3})}};
/* ถอยกระโดด: ฝุ่น ใบไม้ปลิว */
P9X.leap=C=>{const {x,y}=C;if(!C.E('c',0))return;p9B(x,y,2,6,{ty:'sm',c:'160,140,110',sp:[30,80],up:[5,20],dr:1.8,s:[7,10],s1:18,l:[.4,.7],a:.5});p9B(x,y,10,6,{ty:'lf',c:['150,220,120','200,240,160'],sp:[40,110],up:[60,140],g:90,dr:1,s:[2.6,3.6],l:[.7,1.1],vr:6});p9Sw(x,y+4,34,'170,240,150',320,3)};
/* ธนูตรึงเงา: ปักแล้วกระจาย · ละอองเขียวในวง */
P9X.pin=C=>{const {f,t,D,x,y,r}=C;if(C.E('hit',.18)){p9B(x,y,10,12,{ty:'sk',c:['200,255,140','255,255,230'],sp:[80,220],up:[30,150],g:300,s:[1.2,2],l:[.2,.4]});p9Sw(x,y+8,36,'190,255,110',380,4);p9Mark({ty:'sig',x,y:y+8,r:26,c:'190,255,110',l:Math.max(.5,D-.3),fo:.4,sp:1.2,n:5,st:2})}
  if(t>.2&&t<D*.85){const n=C.A('m',10);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'gl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,z:2,vz:p9r(20,50),c:'190,255,130',s:p9r(1,1.6),l:p9r(.5,.8)})}}};
/* กับดักจันทรา: จันทร์ตก → แสงลำเย็น เศษผลึก วงคลื่น */
P9X.mtrapx=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9Beam(x,y,26,340,'200,220,255',.7,{sk:1});p9B(x,y,10,16,{ty:'sh',c:['220,235,255','170,200,255','255,255,255'],rad:r*.3,sp:[60,200],up:[60,220],g:500,s:[2.4,4],l:[.5,.9],vr:12});p9Sw(x,y,r,'200,220,255',520,6);p9Sw(x,y,r*1.4,'200,220,255',640,3,.08);p9Dec(x,y,r*.8,'frost',D*1000+500);p9Shk(f,x,y,.22)}
  if(t<D*.85){const n=C.A('s',20);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'st',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.5,z:p9r(60,140),vz:-p9r(40,90),c:'220,235,255',s:p9r(1,1.8),l:p9r(.8,1.3)})}}};
/* ธนูทะลวงสวรรค์ (และศรจันทรา/รูน): ประกายไหลตามลำ · รอยไหม้ · ปลายทางกระแทก */
P9X.beam=C=>{const {f,t,D,x,y}=C,a=f.a||0,L=f.len||380,ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L,p=t/D;
  if(C.E('c',0)){p9Mark({ty:'line',x,y:y+2,x2:ex,y2:ey+2,c:'190,255,170',c0:'20,40,10',w:16,l:1.4,fo:.7});p9Sw(x,y+4,46,'190,255,170',380,5);p9B(x,y,8,14,{ty:'sk',c:['200,255,190','255,255,240'],ang:a+3.14,spr:2,sp:[100,240],up:[20,140],g:200,s:[1.4,2.2],l:[.2,.4]});
    p9B(ex,ey,10,16,{ty:'sk',c:['200,255,190','255,255,240'],sp:[100,260],up:[40,200],g:300,s:[1.4,2.4],l:[.25,.5]});p9Sw(ex,ey+4,70,'190,255,170',480,6);p9Shk(f,x,y,.34);if(f.by===uid){p9Scr('vg','30,90,30',.24,D,{in:.05,id:'beam'});p9Scr('fl','220,255,210',.1,.25)}}
  if(p<.85){const n=C.A('f',120);for(let i=0;i<n;i++){const u=Math.random(),o=p9r(-14,14);p9P({ty:Math.random()<.6?'sk':'st',x:x+Math.cos(a)*L*u-Math.sin(a)*o,y:y+Math.sin(a)*L*u+Math.cos(a)*o,z:6+p9r(-4,8),vx:Math.cos(a)*p9r(200,420),vy:Math.sin(a)*p9r(200,420),c:p9pick(['200,255,190','255,255,235']),s:p9r(1,2),l:p9r(.12,.25)})}}};
/* ศรจันทราแตก: เศษจันทร์เงินแตกกระจาย */
P9X.moon=C=>{const {f,x,y}=C;if(!C.E('b',0))return;p9B(x,y,40,14,{ty:'sh',c:['230,240,255','190,210,255'],sp:[60,180],up:[20,160],g:300,s:[2.4,4],l:[.5,.9],vr:12});p9B(x,y,40,10,{ty:'st',c:'220,235,255',sp:[30,120],up:[10,100],g:40,dr:1.2,s:[1.4,2.6],l:[.6,1]});p9Beam(x,y,16,260,'220,235,255',.45,{sk:1});p9Sw(x,y+4,50,'210,225,255',420,5)};
/* พายุหมุน: ใบไม้/ฝุ่นถูกหอบรอบพายุ เศษเล็กลอยขึ้น */
P9X.torn=C=>{const {f,t,D,x,y,r}=C,el=t,sp=f.len>0?f.len:115,cx=x+Math.cos(f.a||0)*sp*el,cy=y+Math.sin(f.a||0)*sp*el;if(t>D*.9)return;
  const n=C.A('l',40);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*p9r(.3,.9),h=Math.random();p9P({ty:Math.random()<.5?'lf':'sm',x:cx+Math.cos(a)*d,y:cy+Math.sin(a)*d*.4,z:h*90,vx:-Math.sin(a)*220,vy:Math.cos(a)*90,vz:p9r(40,100),dr:1.5,c:Math.random()<.5?p9pick(['200,240,190','170,220,150']):'200,215,200',s:p9r(2.6,4),s1:12,l:p9r(.35,.6),vr:p9r(-8,8),a:.35})}
  if(C.R('d',.12))p9P({ty:'sm',x:cx,y:cy+2,z:2,vz:6,c:'170,160,140',s:12,s1:26,l:.8,a:.45})};
/* พายุอสนี: ฝนตก ฟ้าผ่าจากเมฆเป็นระยะ ฟ้าหรี่ */
P9X.storm=C=>{const {f,t,D,x:x0,y:y0,r}=C,o=f.u===uid?me:others[f.u],x=o?o.x:x0,y=o?o.y:y0;if(C.E('c',0)&&(f.by===uid||p9Near(x,y,400)))p9Scr('dim','10,16,30',.3,D,{in:.4,id:'storm'});if(t>D-.2)return;
  const n=C.A('rn',60);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'sk',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.5,z:p9r(80,130),vz:-p9r(380,460),vx:-40,c:'190,215,255',s:p9r(.8,1.2),l:p9r(.22,.3)})}
  if(C.R('b',.55,.3)){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random()),gx=x+Math.cos(a)*d,gy=y+Math.sin(a)*d*.5;p9Z(gx+p9r(-30,30),y-120,gx,gy,'170,210,255',2,.16,2);p9Mark({ty:'glow',x:gx,y:gy,r:26,c:'150,200,255',l:.6,a:.6});p9B(gx,gy,6,6,{ty:'sk',c:['190,225,255','255,255,255'],sp:[60,160],up:[30,130],g:300,s:[1,1.8],l:[.15,.3]})}};
/* ฟ้าผ่า (zap · ใช้หลายที่ เบามาก) */
P9X.zap=C=>{const {x,y}=C;if(!C.E('b',0))return;p9B(x,y,6,5,{ty:'sk',c:['190,225,255','255,255,255'],sp:[60,160],up:[30,130],g:300,s:[1,1.8],l:[.15,.3]});p9Mark({ty:'glow',x,y,r:22,c:'150,200,255',l:.5,a:.5})};
/* ---------- จอมเวท ---------- */
/* ลูกไฟ/อุกกาบาต: หางไฟตอนตก → ระเบิด: หิน เปลวไฟ ควัน ประกาย */
P9X.fire=C=>{const {f,t,D,x,y,r}=C,T=.18*D,S=Math.min(1.8,Math.max(.6,r/75));
  if(t<T){const q=t/T,n=C.A('t',90);for(let i=0;i<n;i++)p9P({ty:Math.random()<.6?'fl':'gl',x:x+70*(1-q)+p9r(-6,6),y:y,z:180*(1-q)+p9r(-4,8),vx:p9r(10,40),vz:p9r(40,90),c:p9pick(['255,160,60','255,220,140','255,100,40']),s:p9r(3,5),l:p9r(.15,.3)})}
  if(C.E('imp',T)){p9B(x,y,0,Math.round(10*S),{ty:'ch',c:['90,60,45','60,40,30','130,80,50'],rad:10,sp:[60,200*S],up:[160,340],g:780,bo:.3,s:[2.4,4.4],l:[1,1.6],vr:10});p9B(x,y,10,Math.round(14*S),{ty:'fl',c:['255,140,50','255,200,90','255,90,30'],rad:r*.35,sp:[20,80],up:[60,160],s:[5,9],l:[.35,.65]});
    p9B(x,y,8,Math.round(16*S),{ty:'sk',c:['255,190,90','255,250,220'],sp:[120,280*S],up:[60,260],g:400,s:[1.4,2.4],l:[.25,.5]});p9B(x,y,6,Math.round(8*S),{ty:'sm',c:'60,45,38',rad:r*.25,sp:[r*.4,r],up:[20,50],dr:1.3,s:[12,16],s1:34,l:[.9,1.4],a:.65});
    p9B(x,y,4,Math.round(12*S),{ty:'gl',c:'255,150,60',rad:r*.4,sp:[10,40],up:[40,120],g:-10,s:[1.2,2],l:[.8,1.4],fk:1});p9Shk(f,x,y,.16*S);if(S>=1.4&&f.by===uid)p9Scr('fl','255,190,120',.1,.25)}};
/* ผนึกน้ำแข็ง: ผลึกระเบิด ไอเย็น หิมะโปรย */
P9X.frost=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9B(x,y,6,14,{ty:'sh',c:['220,245,255','150,215,255','255,255,255'],rad:r*.3,sp:[60,r*1.6],up:[60,220],g:500,s:[2.4,4],l:[.5,.9],vr:12});p9B(x,y,2,8,{ty:'sm',c:'220,238,250',rad:r*.3,sp:[r*.5,r*1.2],up:[5,20],dr:1.6,s:[10,14],s1:28,l:[.8,1.3],a:.45});p9Sw(x,y+4,r,'170,225,255',480,5)}
  if(t<D*.85){const n=C.A('s',Math.min(26,r/5));for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'st',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,z:p9r(40,110),vz:-p9r(30,70),vx:p9r(10,30),c:'220,240,255',s:p9r(1,1.7),l:p9r(.9,1.4)})}}};
/* โซ่สายฟ้า: ประกาย + แสงพื้นทุกจุดกระโดด */
P9X.chain=C=>{const {f}=C;if(!f.pts||f.pts.length<2||!C.E('b',0))return;f.pts.slice(1).forEach(([px,py],i)=>{p9B(px,py+10,10,6,{ty:'sk',c:['170,215,255','255,255,255'],sp:[60,180],up:[30,140],g:300,s:[1,1.8],l:[.15,.3],dl:i*.02});p9Mark({ty:'glow',x:px,y:py+10,r:24,c:'150,200,255',l:.6,a:.6})})};
/* รอยแยกกาลเวลา: ละอองถูกดูดเข้าใจกลาง · ระเบิดรอยแยก */
P9X.rift=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9Sw(x,y,r,'180,130,255',480,5);p9Mark({ty:'sig',x,y,r:r*.9,c:'170,110,255',l:D,fo:.4,sp:-.8,n:7,st:3})}
  if(t<D*.92){const n=C.A('s',40);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*p9r(.7,1.1);p9P({ty:Math.random()<.7?'gl':'st',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.55,z:p9r(4,30),vx:-Math.cos(a)*d*1.8,vy:-Math.sin(a)*d*1,vz:p9r(-10,10),c:p9pick(['200,150,255','150,90,255','240,220,255']),s:p9r(1.2,2.2),l:p9r(.4,.55)})}}};
P9X.riftx=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,10,18,{ty:'sh',c:['210,170,255','160,110,255','255,255,255'],sp:[r*.8,r*2.2],up:[60,240],g:500,s:[2.6,4.4],l:[.5,.9],vr:12});p9B(x,y,8,14,{ty:'sk',c:['220,190,255','255,255,255'],sp:[120,r*2.6],up:[40,200],g:300,s:[1.4,2.2],l:[.25,.5]});
  p9B(x,y,4,8,{ty:'sm',c:'70,34,110',rad:r*.3,sp:[r*.4,r],up:[10,40],dr:1.4,s:[12,16],s1:30,l:[.8,1.2],a:.45});p9Sw(x,y,r*1.1,'190,140,255',520,7);p9Beam(x,y,r*.25,300,'190,140,255',.45,{sk:1});p9Dec(x,y,r*.7,'void',2600);p9Shk(f,x,y,.3);if(f.by===uid)p9Scr('fl','210,180,255',.1,.25)};
/* หยุดกาล (รูน/อัลติ): พื้นในวงหมดสี เฟือง เศษแก้วตอนจบ (ใช้ชิ้นส่วนเดียวกับหยุดกาลเวลา) */
P9U.tstop=C=>{const {f,t,D,x,y,r}=C,al=Math.min(1,t/.2,(D-t)/.2);if(al<=0)return;g.save();g.translate(x,y);g.scale(1,.6);g.globalCompositeOperation='saturation';g.globalAlpha=.8*al;const gr=g.createRadialGradient(0,0,0,0,0,r);gr.addColorStop(0,'rgba(128,128,128,1)');gr.addColorStop(.85,'rgba(128,128,128,.9)');gr.addColorStop(1,'rgba(128,128,128,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,r,0,6.2832);g.fill();g.restore()};
P9X.tstop=C=>{const {f,t,D,x,y,r,now}=C,al=Math.min(1,t/.25,(D-t)/.2);if(C.E('c',0)){for(let i=0;i<3;i++)p9Sw(x,y,r*(.5+i*.35),'200,225,255',520,5-i,i*.12);for(let i=0;i<26;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'gl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.6,z:p9r(14,80),c:p9pick(['255,225,150','220,235,255']),s:p9r(1,2),l:D-.05})}}
  g.save();g.globalCompositeOperation='lighter';g.lineWidth=2.4;p9Gear(x-r*.78,y-r*.3-30,32,11,now*.15,'200,225,255',.7*al);p9Gear(x+r*.72,y-r*.34-36,40,13,-now*.12,'200,225,255',.65*al);g.restore();
  if(C.E('end',D-.05)){p9B(x,y,30,30,{ty:'sh',c:['220,240,255','170,215,255','255,255,255'],rad:r*.5,sp:[r*.5,r*1.8],up:[80,240],g:520,s:[3,5.4],l:[.6,1],vr:12});p9Sw(x,y,r*1.1,'210,235,255',560,7);p9Shk(f,x,y,.28)}};
/* วงเวทอุกกาบาต: วงไฟใต้พื้น ลำแสง ถ่านลอย (ลูกอุกกาบาตใช้ตัวเสริม fire) */
P9X.rune=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9Mark({ty:'sig',x,y,r:r*.85,c:'255,120,50',l:D,fo:.5,sp:.6,n:9,st:4});p9Beam(x,y,40,380,'255,120,50',.7);p9Sw(x,y,r,'255,120,50',600,6);if(f.by===uid)p9Scr('vg','120,30,0',.26,D+1.5,{in:.3,id:'rune'})}
  if(t<D*.9){const n=C.A('e',24);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'gl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,z:2,vz:p9r(40,90),c:p9pick(['255,150,60','255,90,40']),s:p9r(1.2,2),l:p9r(.6,1),fk:1})}}};
/* โกเลมลาวา: ปะทุจากพื้นตอนเรียก · ถ่านไฟจากตัว · พื้นลาวาเรือง */
P9U.golem=C=>{const {f,t,D,x,y}=C,al=Math.min(1,t*4,(D-t)*2);if(al<=0)return;g.save();g.globalCompositeOperation='lighter';g.translate(x,y+4);g.scale(1,.42);glowAt(0,0,56+6*Math.sin(t*5),'255,90,20',.45*al);g.restore()};
P9X.golem=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9B(x,y,0,12,{ty:'ch',c:['80,40,24','50,24,14','130,60,30'],rad:16,sp:[60,180],up:[160,320],g:780,bo:.3,s:[2.6,4.4],l:[1,1.5],vr:10});p9B(x,y,6,16,{ty:'fl',c:['255,120,40','255,180,70','255,80,30'],rad:30,sp:[20,70],up:[60,150],s:[5,8],l:[.35,.6]});
    p9B(x,y,4,8,{ty:'sm',c:'60,40,32',rad:20,sp:[40,100],up:[20,50],dr:1.3,s:[12,16],s1:30,l:[.9,1.3],a:.6});p9Sw(x,y+4,r,'255,130,50',520,6);p9Dec(x,y,50,'fire',D*1000);p9Shk(f,x,y,.26)}
  if(t<D-.3){const n=C.A('e',14);for(let i=0;i<n;i++)p9P({ty:'gl',x:x+p9r(-14,14),y:y,z:p9r(10,50),vz:p9r(30,70),vx:p9r(-20,20),c:p9pick(['255,150,50','255,210,90']),s:p9r(1,1.8),l:p9r(.5,.9),fk:1})}};
/* ประตูนรก: ฟ้าหรี่แดง เสาไฟ เปลวไฟรอบปากประตู ควัน */
P9X.hellgate=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9Beam(x,y,56,420,'255,100,30',1,{sk:1});p9Sw(x,y,r,'255,100,30',600,7);p9Sw(x,y,r*1.4,'255,100,30',720,3,.1);p9B(x,y,0,14,{ty:'ch',c:['80,30,20','50,20,14'],rad:20,sp:[60,200],up:[140,320],g:780,bo:.3,s:[2.4,4.4],l:[1,1.5],vr:10});p9Shk(f,x,y,.36);
    if(p9Nr(f,x,y))p9Scr('dim','40,4,0',.32,D,{in:.4,id:'hell'});if(f.by===uid)p9Scr('vg','140,30,0',.28,D,{in:.3,id:'hellv'})}
  if(t<D-.4){const n=C.A('f',40);for(let i=0;i<n;i++){const a=Math.random()*6.283;p9P({ty:'fl',x:x+Math.cos(a)*76,y:y+Math.sin(a)*32,z:0,vz:p9r(50,120),c:p9pick(['255,120,40','255,180,70','255,80,30']),s:p9r(4,7),l:p9r(.3,.55)})}
    const s=C.A('s',8);for(let i=0;i<s;i++)p9P({ty:'sm',x:x+p9r(-40,40),y:y,z:p9r(10,40),vz:p9r(30,60),c:'50,30,24',s:p9r(10,14),s1:28,l:p9r(.9,1.3),a:.5})}};
/* ---------- มือสังหาร ---------- */
/* ก้าวเงา: ควันเงา ประกายม่วง ขนนก */
P9X.shadow=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,10,4,{ty:'sm',c:'70,34,110',sp:[20,60],up:[10,40],dr:1.4,s:[8,11],s1:20,l:[.5,.8],a:.45});p9B(x,y,14,6,{ty:'sk',c:['200,150,255','255,255,255'],sp:[60,160],up:[20,100],g:200,s:[1,1.8],l:[.15,.3]});p9B(x,y,20,2,{ty:'lf',c:['30,16,46','70,40,100'],sp:[30,80],up:[60,120],g:80,dr:1,s:[3,4],l:[.8,1.2],vr:4})};
/* ตราประทับมรณะ: อักษรรูนชมพูลอย · ระเบิดตรา */
P9X.mark=C=>{const {x,y}=C;if(!C.E('b',0))return;p9B(x,y,22,4,{ty:'rn',c:'255,120,220',sp:[5,20],up:[20,50],s:[3,4.5],l:[.6,.9]});p9B(x,y,22,4,{ty:'st',c:'255,170,235',sp:[10,40],up:[10,60],s:[1.2,2],l:[.4,.7]})};
P9X.markx=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,14,14,{ty:'sh',c:['255,170,235','255,90,200','255,255,255'],sp:[60,r*2.2],up:[60,220],g:400,s:[2.4,4],l:[.5,.8],vr:12});p9B(x,y,10,12,{ty:'sk',c:['255,150,230','255,255,255'],sp:[100,240],up:[30,180],g:300,s:[1.4,2.2],l:[.2,.4]});
  p9Sw(x,y+4,r,'255,110,210',480,6);p9Beam(x,y,16,220,'255,130,220',.4);p9Dec(x,y,r*.5,'void',2000);p9Shk(f,x,y,.16)};
/* สุริยคราสพันเงา: ฟ้ามืดลง วงแสงคราสหมุน ประกายไฟ */
P9X.eclipse=C=>{const {f,t,D,x,y,r,now}=C,al=1-t/D;if(C.E('c',0)){if(p9Nr(f,x,y))p9Scr('dim','8,2,14',.42,D+.6,{in:.15,id:'ecl'});if(f.by===uid)p9Scr('vg','120,60,0',.26,D+.6,{in:.15,id:'eclv'});p9B(x,y,40,22,{ty:'sk',c:['255,190,90','255,240,200'],sp:[120,300],up:[20,160],g:200,s:[1.4,2.4],l:[.3,.6]});p9Shk(f,x,y,.3)}
  g.save();g.globalCompositeOperation='lighter';p9Rays(x,y-10,r*1.8,'255,180,80',.5*al,16,now*.6,22,1);glowAt(x,y-10,r*.9,'255,160,60',.3*al);g.restore()};
/* ระบำพันใบมีด: ประกายตามทางใบมีด */
P9X.bdash=C=>{const {f,x,y}=C;if(!C.E('b',0))return;p9B(x,y,12,10,{ty:'sk',c:['255,200,200','255,255,255','255,90,90'],sp:[80,220],up:[20,140],g:300,s:[1.2,2],l:[.15,.3]});p9Mark({ty:'slash',x,y,an:p9r(-.6,.6),r:26,w:12,c:'255,170,170',c0:'40,4,4',l:.6,fo:.3})};
P9X.bstrm=C=>{const {f,t,D}=C,x=C.x,y=C.y;if(t>D*.9||!f.sx)return;const n=C.A('s',50);for(let i=0;i<n;i++){const u=Math.random(),cx=f.sx+(x-f.sx)*u,cy=f.sy+(y-f.sy)*u;p9P({ty:'sk',x:cx+p9r(-10,10),y:cy,z:p9r(4,16),vx:p9r(-160,160),vy:p9r(-80,80),c:p9pick(['255,220,220','255,110,110']),s:p9r(1,1.6),l:p9r(.1,.2)})}};
/* พายุใบมีดราตรี: ประกายใบมีดหมุนรอบตัว ขอบจอแดง */
P9X.bstorm=C=>{const {f,t,D,r}=C,o=f.u===uid?me:others[f.u],x=o?o.x:C.x,y=o?o.y:C.y;if(C.E('c',0)){p9Sw(x,y,r*1.2,'255,80,90',480,6);if(f.by===uid)p9Scr('vg','120,0,10',.26,D,{in:.2,id:'bst'})}if(t>D-.2)return;
  const n=C.A('s',80);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*p9r(.4,.95);p9P({ty:'sk',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.45,z:p9r(4,18),vx:-Math.sin(a)*d*9,vy:Math.cos(a)*d*4,c:p9pick(['255,220,220','255,110,110','255,255,255']),s:p9r(1,1.8),l:p9r(.1,.2)})}};
/* ---------- นักสวด ---------- */
/* แสงเยียวยา (ใช้หลายที่ เบา): ละอองทอง/เขียวลอยขึ้น */
P9X.heal=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;const n=r>80?14:5;p9B(x,y,4,n,{ty:'gl',c:['255,235,150','160,255,160','255,255,220'],rad:Math.min(r,160)*.6,sp:[0,20],up:[40,110],g:-10,s:[1.4,2.4],l:[.7,1.2]});p9B(x,y,10,Math.ceil(n/3),{ty:'st',c:'255,240,180',rad:Math.min(r,160)*.5,sp:[10,40],up:[30,80],s:[1.2,2],l:[.5,.8]})};
P9X.atk=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,4,12,{ty:'gl',c:['255,170,80','255,220,140'],rad:r*.5,sp:[0,20],up:[50,120],g:-10,s:[1.4,2.4],l:[.6,1]});p9Sw(x,y,r*.8,'255,160,70',460,4)};
/* ทัณฑ์แห่งแสง: แสงฟ้าผ่าลง หิน ประกายทอง รอยพื้น */
P9X.smite=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;const S=Math.min(1.8,Math.max(.8,r/75));p9B(x,y,0,Math.round(8*S),{ty:'ch',c:['200,170,100','150,120,70','230,210,150'],rad:8,sp:[60,180*S],up:[140,300],g:760,bo:.3,s:[2.2,3.8],l:[.9,1.4],vr:10});
  p9B(x,y,8,Math.round(14*S),{ty:'sk',c:['255,230,150','255,255,230'],sp:[100,240*S],up:[60,240],g:400,s:[1.4,2.2],l:[.25,.5]});p9Beam(x,y,20*S,380,'255,230,150',.45,{sk:1});p9Sw(x,y+4,r*1.1,'255,220,130',480,6);p9Dec(x,y,r*.6,'crack',2400);p9Shk(f,x,y,.16*S);if(S>1.4&&f.by===uid)p9Scr('fl','255,240,200',.1,.25)};
/* วงอรุณศักดิ์สิทธิ์: วงเวททอง ละอองแสงลอยในวง */
P9X.sanct=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9Mark({ty:'sig',x,y,r:r*.95,c:'255,214,120',l:D,fo:.4,sp:.3,n:8,st:3});p9Sw(x,y,r,'255,220,130',480,5)}if(t>D*.92)return;
  const n=C.A('m',Math.min(24,r/5));for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:Math.random()<.3?'st':'gl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.55,z:2,vz:p9r(30,70),c:p9pick(['255,230,150','255,250,220']),s:p9r(1.2,2),l:p9r(.7,1.1)})}};
/* ปาฏิหาริย์ / อรุณรุ่งนิรันดร์: ลำแสงทองใหญ่ แสงพุ่ง ขนนกโปรย */
function p9HolyBurst(f,x,y,r,col,big){p9Beam(x,y,big?48:40,500,col,1.3,{a:.6});p9Beam(x,y,110,440,col,.9,{a:.2});for(let i=0;i<3;i++)p9Sw(x,y+4,r*(.4+i*.35),col,600,7-i*2,i*.12);p9Mark({ty:'sig',x,y:y+4,r:r*.75,c:col,l:2.6,fo:1,sp:.4,n:8,st:3});
  for(let i=0;i<30;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:'lf',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.6,z:p9r(100,230),vx:p9r(-12,12),vz:-p9r(10,30),g:16,dr:.6,c:p9pick(['255,236,170','255,214,120','255,250,225']),s:p9r(3.5,5.5),l:p9r(2,3.2),vr:p9r(-3,3),dl:p9r(0,.4)})}
  p9B(x,y,4,26,{ty:'gl',c:[col,'255,250,220'],rad:r*.8,sp:[0,20],up:[40,120],g:-10,s:[1.6,3],l:[1,1.8]});if(p9Nr(f,x,y)){p9Scr('fl','255,240,200',.22,.45);p9Scr('vg','255,190,90',.22,1.5,{in:.1,id:'holy'})}p9Shk(f,x,y,.2)}
const p9WithU3=(x,y)=>fxs.some(q=>q.k==='u3hv'&&Math.abs(q.x-x)<40&&Math.abs(q.y-y)<40);
P9U.holy=C=>{const {f,t,D,x,y,r,now}=C,k=1-t/D;if(p9WithU3(x,y))return;g.save();g.globalCompositeOperation='lighter';p9Rays(x,y-24,r*1.2,'255,225,150',.45*k,18,now*.35,30,.62);g.restore()};
P9X.holy=C=>{const {f,x,y,r}=C;if(C.E('c',0)&&!p9WithU3(x,y))p9HolyBurst(f,x,y,r,'255,226,140',1)};
P9U.dawn=P9U.holy;P9X.dawn=C=>{const {f,x,y,r}=C;if(C.E('c',0))p9HolyBurst(f,x,y,r,'255,200,110',1)};
/* ตราประทับวิญญาณ: ดวงวิญญาณม่วงลอย อักษรรูน */
P9X.seal=C=>{const {f,t,D,x,y,r}=C;if(C.E('c',0)){p9Sw(x,y,r,'200,120,255',480,6);p9B(x,y,4,8,{ty:'sm',c:'90,40,140',rad:r*.4,sp:[20,60],up:[10,30],dr:1.4,s:[10,14],s1:26,l:[.7,1.1],a:.45})}if(t>D*.92)return;
  const n=C.A('w',18);for(let i=0;i<n;i++){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random());p9P({ty:Math.random()<.25?'rn':'gl',x:x+Math.cos(a)*d,y:y+Math.sin(a)*d*.5,z:2,vz:p9r(30,60),c:p9pick(['200,120,255','240,200,255']),s:p9r(1.4,3),l:p9r(.7,1.1)})}};
/* ระฆังวิญญาณ (เฉพาะของผู้เล่น วงใหญ่): คลื่นเสียงม่วง ฟ้าหรี่ วิญญาณลอยจากมอนในวง */
P9X.bell=C=>{const {f,t,D,x,y,r}=C;if(r<150||D<4)return;if(C.E('c',0)){p9Sw(x,y,r,'200,130,255',560,7);p9Sw(x,y,r*1.4,'200,130,255',700,3,.1);if(p9Nr(f,x,y))p9Scr('dim','14,4,24',.26,D,{in:.4,id:'bell'})}
  if(t<D-.3&&C.R('dg',.5,.2)){p9Sw(x,y,r*.9,'200,130,255',420,3);mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-x,m.y-y)<r)p9B(m.x,m.y,20,2,{ty:'gl',c:['200,140,255','240,210,255'],sp:[5,20],up:[50,100],s:[1.6,2.6],l:[.6,1]})})}};
P9X.soulx=C=>{const {f,x,y,r}=C;if(!C.E('b',0))return;p9B(x,y,14,12,{ty:'sh',c:['210,150,255','255,200,250'],sp:[60,r*2],up:[60,220],g:400,s:[2.4,4],l:[.5,.8],vr:12});p9B(x,y,10,12,{ty:'sk',c:['220,180,255','255,255,255'],sp:[100,240],up:[30,180],g:300,s:[1.4,2.2],l:[.2,.4]});
  p9B(x,y,4,6,{ty:'sm',c:'90,40,140',rad:r*.3,sp:[r*.4,r],up:[10,40],dr:1.4,s:[10,14],s1:26,l:[.7,1.1],a:.45});p9Shk(f,x,y,.16)};
setTimeout(()=>{try{p9Wrap()}catch(e){}},0);
