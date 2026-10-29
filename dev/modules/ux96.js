
/* ===== v488 · คลังสกิลรอบ 5: สกิลที่ 6 (สกิลคลาส 3) มีสกิลทางเลือก แยกตามสายจุติ ทุกอาชีพ =====
   ปลดพร้อมสกิลคลาส 3 (จุติแล้ว Lv 70) · สายจุติแสง/ทมิฬได้สกิลทางเลือกคนละแบบ (ตั้งข้อมูลให้ทั้งสองสายพร้อมกัน → เปลี่ยนสายแล้วใช้ได้ทันที)
   สายแสง: รอยแยกโลหิต · ธนูกลุ่มดาว · หยุดกาลเวลา · ม่านราตรี · อรุณฟื้นคืน
   สายทมิฬ: กำแพงสวรรค์ถล่ม · ศรเรียกอสนี · สุนัขนรก · กรงดาบ · ดูดวิญญาณ */
let Q8TS=null;const Q8HB={};
Object.assign(Q8D.melee,{5:{id:'zm',n:'รอยแยกโลหิต',d:'พุ่งไปข้างหน้า 200 ทิ้งรอยแยกโลหิตตามทาง · 0.6 วิ ต่อมารอยแยกปะทุ 320% แล้วหนามเลือดแทงขึ้นอีก 4 ครั้ง (ทุก 0.5 วิ 45%)',cd:15,mc:40,tg:'atk aoe move melee',
  po:{0:['lunge',.5],a:['cleave',.8],b:['lunge',.5]},R:{a:['qm5a','🔱','สามรอยแยก','ไม่พุ่งตัว · ฟันรอยแยก 3 แนวเป็นรูปพัด แนวละ 220% (ไม่มีหนามต่อ)'],b:['qm5b','🩸','โลหิตดูด','รอยแยกปะทุแล้วฟื้นเลือด 1.5% ต่อมอนที่โดน (สูงสุด 9%)']}}});
Object.assign(Q8D.archer,{5:{id:'zc',n:'ธนูกลุ่มดาว',d:'ผูกมอนรอบตัว (320) สูงสุด 6 ตัวเป็นกลุ่มดาว · 0.8 วิ ต่อมาดาวทุกดวงระเบิด 220% และเส้นดาวที่เชื่อมกันบาดมอนที่อยู่บนเส้น 100%',cd:12,mc:35,tg:'atk aoe',
  po:{0:['skyshot',.7],a:['skyshot',.7],b:['skyshot',.7]},R:{a:['qa5a','✨','ดาวคู่','ดาวระเบิดซ้ำอีกครั้งหลัง 0.5 วิ (60%)'],b:['qa5b','💫','ดาวสลาย','ดาวระเบิดกระเซ็นวง 60 (50%)']}}});
Object.assign(Q8D.mage,{5:{id:'zt',n:'หยุดกาลเวลา',d:'หยุดเวลามอนในวง 160 ที่เป้า 3 วิ (แช่แข็ง) · ดาเมจที่เราตีใส่มอนที่ถูกหยุดสะสมไว้ จบแล้วระเบิด 200% + ปล่อยดาเมจที่สะสม 50%',cd:18,mc:50,tg:'atk aoe dur',
  po:{0:['channel',.8],a:['channel',.8],b:['channel',.8]},R:{a:['qg5a','⏩','นาฬิกาเร่ง','หยุดแค่ 2 วิ แต่ปล่อยดาเมจที่สะสม 80%'],b:['qg5b','⏪','ย้อนเวลา','จบแล้วฟื้นเลือด 15% และสกิลอื่นคูลดาวน์ลด 2 วิ']}}});
Object.assign(Q8D.assn,{5:{id:'zv',n:'ม่านราตรี',d:'กางม่านราตรีวง 170 รอบตัว 5 วิ · อยู่ในม่านแล้วล่องหนตลอด (ตีปกติคริทุกครั้ง) · มอนในม่านโดนเงาบาด 35% ทุก 1 วิ',cd:18,mc:40,tg:'aoe dur buff',
  po:{0:['seal',.7],a:['seal',.7],b:['seal',.7]},R:{a:['qn5a','🌑','คืนมืดสนิท','ม่านกว้างขึ้นเป็น 230'],b:['qn5b','🕸️','เงากลืน','มอนในม่านช้าลง และเงาบาดแรงขึ้นเป็น 60%']}}});
Object.assign(Q8D.sup,{5:{id:'zr',n:'อรุณฟื้นคืน',d:'แสงอรุณระเบิดรอบตัว วง 240: ชุบเพื่อนที่ล้ม (เลือด 40%) · คนที่ยืนอยู่ฟื้นเลือด 20% · ทั้งทีมได้พรดาเมจ +20% นาน 6 วิ · มอนในวง 200 โดน 200% ธาตุแสง',cd:24,mc:55,tg:'buff aoe party',
  po:{0:['bless',1],a:['bless',1],b:['bless',1]},R:{a:['qu5a','🔆','อรุณแรงกล้า','พรดาเมจ +30% แต่อยู่ 4 วิ'],b:['qu5b','🌿','อรุณยาวนาน','ฟื้นเลือดต่อเนื่อง 3%/วิ นาน 6 วิ แทนฟื้นทันที']}}});
Object.assign(Q8DB.melee,{5:{id:'zw',n:'กำแพงสวรรค์ถล่ม',d:'เสกกำแพงทองยาว 200 ขึ้นตรงหน้า แล้วล้มทับไปข้างหน้า กระแทกทุกตัวใต้กำแพง 380% + มึน 1.5 วิ',cd:16,mc:45,tg:'atk aoe melee',
  po:{0:['rage',.8],a:['rage',.8],b:['rage',.8]},R:{a:['rm5a','🧱','สองกำแพง','กำแพงหน้าและหลังล้มเข้าหาเรา ด้านละ 260%'],b:['rm5b','🏯','กำแพงค้าง','กำแพงไม่ล้ม ตั้งค้าง 4 วิ มอนที่ชิดกำแพงโดน 60% ทุก 0.5 วิ และถูกดันออก']}}});
Object.assign(Q8DB.archer,{5:{id:'zl',n:'ศรเรียกอสนี',d:'ยิงศรอสนีปักเป้า 4 วิ ฟ้าผ่าเป้าทุก 0.5 วิ (110%) และกระโดดไปอีกตัว (45%) · เป้าตายแล้วศรย้ายไปตัวใกล้สุด',cd:13,mc:35,tg:'atk proj dur',
  po:{0:['snipe',.6],a:['rapid',.55],b:['snipe',.6]},R:{a:['ra5a','🏹','สามศร','ปักศร 3 ตัว ฟ้าผ่าตัวละ 60% (ไม่กระโดด)'],b:['ra5b','⛈️','อสนีระเบิด','ครบเวลาฟ้าผ่ายักษ์ที่เป้า วง 120: 350%']}}});
Object.assign(Q8DB.mage,{5:{id:'zh',n:'สุนัขนรก',d:'ปล่อยสุนัขนรก 2 ตัว 8 วิ วิ่งไล่กัดมอนใกล้สุด ทุก 0.7 วิ 75% + ไฟลวก',cd:16,mc:45,tg:'atk dur',
  po:{0:['summon',.8],a:['summon',.8],b:['summon',.8]},R:{a:['rg5a','🐕','สามหัว','สุนัข 3 ตัว ตัวละ 55%'],b:['rg5b','💥','สุนัขระเบิด','หมดเวลาสุนัขระเบิดวง 80 ตัวละ 120%']}}});
Object.assign(Q8DB.assn,{5:{id:'zb',n:'กรงดาบ',d:'ดาบ 12 เล่มปักเป็นกรงวง 140 รอบเป้า 4 วิ ดาบในกรงฟันเข้าด้านในทุก 0.5 วิ (40%) · จบแล้วดาบพุ่งรวมกลางกรง 160%',cd:16,mc:40,tg:'atk aoe dur',
  po:{0:['flurry',.7],a:['flurry',.7],b:['flurry',.7]},R:{a:['rn5a','⭕','กรงแคบ','กรงวง 100 แต่ฟัน 55%'],b:['rn5b','🗡️','ดาบพุ่ง','จบแล้วดาบพุ่งไล่มอนรอบ ๆ 8 เล่ม เล่มละ 120% (แทนรวมกลาง)']}}});
Object.assign(Q8DB.sup,{5:{id:'zs',n:'ดูดวิญญาณ',d:'ล่ามวิญญาณมอนรอบตัว (260) 3 ตัว 4 วิ ดูด 60% ทุก 0.5 วิ · เพื่อนรอบตัวเรา (250) ฟื้นเลือด 0.5% ต่อสายต่อครั้ง',cd:15,mc:40,tg:'atk dur',
  po:{0:['pray2',.8],a:['pray2',.8],b:['pray2',.8]},R:{a:['ru5a','🔗','ดูดหนัก','ล่าม 2 ตัว ดูด 90%'],b:['ru5b','👻','ปลดปล่อยวิญญาณ','จบแล้ววิญญาณระเบิดที่ตัวที่ถูกล่าม วง 90: 150%']}}});
/* ---------- ตัวช่วย ---------- */
function q8InSeg(m,x0,y0,x1,y1,w){return q8SegD(m.x,m.y,x0,y0,x1,y1)[0]<w+q8R(m)}
function q8LineHit(x0,y0,x1,y1,w,mul,ck,lv,k,P){let n=0;mons.forEach(m=>{if(m.hp>0&&q8InSeg(m,x0,y0,x1,y1,w)){n++;q8Hit(m,pd()*mul*P,ck,lv,k)}});return n}
function q8WallF(m,cx,cy,a){const dx=m.x-cx,dy=m.y-cy;return[dx*Math.cos(a)+dy*Math.sin(a),-dx*Math.sin(a)+dy*Math.cos(a)]}
Object.assign(Q8F,{
 zm(k,P,cost,r){const {a}=q8Aim(240);q8Use(k,cost);const x0=me.x,y0=me.y;
   if(r==='a'){[-.42,0,.42].forEach(da=>{const aa=a+da,X1=Math.round(x0+Math.cos(aa)*200),Y1=Math.round(y0+Math.sin(aa)*200);fx({k:'q8rift',x:X1,y:Y1,sx:Math.round(x0),sy:Math.round(y0),r:44,dur:1,u:'a'});pend.push({t:.45,f:()=>q8LineHit(x0,y0,X1,Y1,44,2.2,'melee',1,k,P)})});return true}
   const L=200,[ex,ey]=(typeof mvRay==='function'?mvRay:(a1,b1,c1,d1)=>[c1,d1])(x0,y0,cl(x0+Math.cos(a)*L,12,WW-12),cl(y0+Math.sin(a)*L,12,WH-12)),X=Math.round(ex),Y=Math.round(ey),X0=Math.round(x0),Y0=Math.round(y0);fx({k:'q8rift',x:X,y:Y,sx:X0,sy:Y0,r:44,dur:2.8,u:r||''});me.inv3=Math.max(me.inv3||0,.25);
   Q8S.push({t:0,f(dt){this.t+=dt;const q=Math.min(1,this.t/.18);if(me.down>0)return true;me.x=x0+(ex-x0)*q;me.y=y0+(ey-y0)*q;return q>=1}});
   pend.push({t:.6,f:()=>{const n=q8LineHit(X0,Y0,X,Y,44,3.2,'melee',1,k,P);try{if(Math.hypot(me.x-X,me.y-Y)<500)shk=Math.max(shk,.22)}catch(e){}if(r==='b'&&n&&me.down<=0)me.hp=Math.min(me.mh,me.hp+me.mh*Math.min(.09,.015*n))}});
   for(let i=1;i<=4;i++)pend.push({t:.6+i*.5,f:()=>q8LineHit(X0,Y0,X,Y,40,.45,'melee',3,k,P)});return true},
 zc(k,P,cost,r){const T=q8Near(me.x,me.y,320).slice(0,6);if(!T.length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return false}q8Use(k,cost);
   const ord=[T[0]],left=T.slice(1);while(left.length){const c=ord[ord.length-1];left.sort((p,q)=>Math.hypot(p.x-c.x,p.y-c.y)-Math.hypot(q.x-c.x,q.y-c.y));ord.push(left.shift())}
   fx({k:'q8cst',r:30,dur:r==='a'?1.6:1.15,pts:ord.map(m=>[m.id,0]),u:r||''});
   const burst=(mul)=>{const P2=ord.filter(m=>m.hp>0).map(m=>[m.x,m.y]);ord.forEach(m=>{if(!(m.hp>0))return;q8Hit(m,pd()*mul*P,'archer',1,k);if(r==='b'){const X=m.x,Y=m.y;mons.forEach(o=>{if(o!==m&&o.hp>0&&Math.hypot(o.x-X,o.y-Y)<60+q8R(o))q8Hit(o,pd()*.5*P,'archer',3,k)})}});
     if(mul>1)for(let i=0;i+1<P2.length;i++){const A=P2[i],B=P2[i+1];mons.forEach(o=>{if(o.hp>0&&ord.indexOf(o)<0&&q8InSeg(o,A[0],A[1],B[0],B[1],18))q8Hit(o,pd()*P,'archer',3,k)})}};
   pend.push({t:.8,f:()=>burst(2.2)});if(r==='a')pend.push({t:1.3,f:()=>burst(.6)});return true},
 zt(k,P,cost,r){const p=q8Pt(320,120),X=Math.round(p.x),Y=Math.round(p.y),D=r==='a'?2:3,R=160,T=q8Near(X,Y,R);q8Use(k,cost);fx({k:'q8clk',x:X,y:Y,r:R,dur:D,u:r||''});
   T.forEach(m=>{try{rxCC(m,'f',0,D)}catch(e){}});Q8TS={ids:new Set(T.map(m=>m.id)),acc:{},end:performance.now()+D*1000};const rate=r==='a'?.8:.5;
   pend.push({t:D,f:()=>{const S=Q8TS;Q8TS=null;fx({k:'q8pop',x:X,y:Y,r:R,u:'i'});mons.forEach(m=>{if(!(m.hp>0))return;const inn=Math.hypot(m.x-X,m.y-Y)<R+q8R(m),ac=S&&S.acc[m.id]||0;if(!inn&&!ac)return;q8Hit(m,(inn?pd()*2*P:0)+ac*rate,'mage',1,k)});
     try{if(Math.hypot(me.x-X,me.y-Y)<500)shk=Math.max(shk,.25)}catch(e){}if(r==='b'&&me.down<=0){me.hp=Math.min(me.mh,me.hp+me.mh*.15);for(const q of[0,1,3,4])me.sk[q]=Math.max(0,(me.sk[q]||0)-2)}}});return true},
 zv(k,P,cost,r){q8Use(k,cost);const X=me.x,Y=me.y,R=r==='a'?230:170,D=5,mul=r==='b'?.6:.35;fx({k:'q8veil',x:Math.round(X),y:Math.round(Y),r:R,dur:D,u:r||''});if(r==='b')fx({k:'frost',x:Math.round(X),y:Math.round(Y),r:R,dur:D});
   Q8S.push({t:0,tk:1,f(dt){this.t+=dt;this.tk-=dt;if(me.down<=0&&Math.hypot(me.x-X,me.y-Y)<R)me.stealth=Math.max(me.stealth||0,.35);
     if(this.tk<=0){this.tk=1;q8Area(X,Y,R,mul,'assn',3,k,P)}return this.t>=D}});return true},
 zr(k,P,cost,r){q8Use(k,cost);const R=240;fx({k:'q8dawn',r:R,u:r||'',v:r==='a'?30:20,dur:r==='a'?4:6});q8Area(me.x,me.y,200,2,'holy',1,k,P);try{shk=Math.max(shk,.15)}catch(e){}return true},
 zw(k,P,cost,r){const {a}=q8Aim(220);q8Use(k,cost);const go=(aa,mul,face)=>{const cx=me.x+Math.cos(aa)*50,cy=me.y+Math.sin(aa)*50,CX=Math.round(cx),CY=Math.round(cy),AA=Math.round(aa*1000)/1000;
     if(r==='b'){fx({k:'q8wall',x:CX,y:CY,a:AA,r:100,dur:4.4,u:'b'});Q8S.push({t:0,tk:.5,f(dt){this.t+=dt;this.tk-=dt;if(this.tk<=0&&this.t>.4){this.tk=.5;mons.forEach(m=>{if(!(m.hp>0))return;const [fw,sd]=q8WallF(m,cx,cy,aa);if(Math.abs(sd)<100&&Math.abs(fw)<34+q8R(m)){q8Hit(m,pd()*.6*P,'melee',3,k);q8Pull(m,cx+Math.cos(aa)*(fw>=0?70:-70)+(-Math.sin(aa))*sd,cy+Math.sin(aa)*(fw>=0?70:-70)+Math.cos(aa)*sd,0)}})}return this.t>=4.4}});return}
     fx({k:'q8wall',x:CX,y:CY,a:AA,r:100,dur:1.3,u:face?'f':''});
     pend.push({t:.75,f:()=>{mons.forEach(m=>{if(!(m.hp>0))return;const [fw,sd]=q8WallF(m,cx,cy,aa);if(Math.abs(sd)<100+q8R(m)&&fw>-20&&fw<140+q8R(m)){q8Hit(m,pd()*mul*P,'melee',1,k);if(m.t<3)fx({k:'stun',x:Math.round(m.x),y:Math.round(m.y),r:8,full:1,dur:1.5})}});try{shk=Math.max(shk,.3)}catch(e){}}})};
   if(r==='a'){go(a,2.6,0);go(a+Math.PI,2.6,0)}else go(a,3.8,0);return true},
 zl(k,P,cost,r){const n=r==='a'?3:1,T=q8Near(me.x,me.y,340).slice(0,n);if(!T.length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return false}q8Use(k,cost);me.face=Math.atan2(T[0].y-me.y,T[0].x-me.x);
   const mul=r==='a'?.6:1.1;T.forEach((m0,i)=>{fx({k:'q8tar',r:10,dur:4.2,pts:[[m0.id,0]],sx:Math.round(me.x),sy:Math.round(me.y-12)});let cur=m0;
     Q8S.push({t:0,tk:.45,f(dt){this.t+=dt;this.tk-=dt;if(!(cur&&cur.hp>0)){const nx=q8Near(cur?cur.x:me.x,cur?cur.y:me.y,200)[0];if(!nx)return this.t>=4;cur=nx;fx({k:'q8tar',r:10,dur:Math.max(.3,4.2-this.t),pts:[[nx.id,0]],sx:Math.round(me.x),sy:Math.round(me.y-12)})}
       if(this.tk<=0){this.tk=.5;const X=Math.round(cur.x),Y=Math.round(cur.y);fx({k:'zap',x:X,y:Y,r:34});q8Hit(cur,pd()*mul*P,'bolt',3,k);
         if(r!=='a'){const o=q8Near(cur.x,cur.y,140,q=>q!==cur)[0];if(o){fx({k:'chain',r:30,pts:[[X,Y-8],[Math.round(o.x),Math.round(o.y-8)]]});q8Hit(o,pd()*.45*P,'bolt',3,k)}}}
       if(this.t>=4){if(r==='b'&&cur&&cur.hp>0){const X=Math.round(cur.x),Y=Math.round(cur.y);fx({k:'q8pop',x:X,y:Y,r:120,u:'h'});fx({k:'zap',x:X,y:Y,r:70});q8Area(X,Y,120,3.5,'bolt',1,k,P);try{shk=Math.max(shk,.28)}catch(e){}}return true}return false}})});return true},
 zh(k,P,cost,r){q8Use(k,cost);const n=r==='a'?3:2,mul=r==='a'?.55:.75,D=8,H=[];for(let i=0;i<n;i++){const an=me.face+(i-(n-1)/2)*.9;H.push({x:me.x+Math.cos(an)*30,y:me.y+Math.sin(an)*30,cd:.3+i*.15})}
   fx({k:'q8hnd',r:20,dur:D,u:n+(r==='b'?'b':'')});
   Q8S.push({t:0,f(dt){this.t+=dt;if(me.down>0)return true;H.forEach((h,i)=>{h.cd-=dt;const m=q8Near(h.x,h.y,420)[0];if(!m){const dx=me.x-h.x,dy=me.y-h.y,d=Math.hypot(dx,dy);if(d>40){h.x+=dx/d*280*dt;h.y+=dy/d*280*dt}return}
       const dx=m.x-h.x,dy=m.y-h.y,d=Math.hypot(dx,dy);if(d>24+q8R(m)*.5){h.x+=dx/d*Math.min(d,300*dt);h.y+=dy/d*Math.min(d,300*dt)}else if(h.cd<=0){h.cd=.7;fx({k:'q8hbt',x:Math.round(m.x),y:Math.round(m.y),sx:Math.round(h.x),sy:Math.round(h.y),r:16,u:String(i)});q8Hit(m,pd()*mul*P,'mage',3,k);
         for(let j=1;j<=2;j++)pend.push({t:.5*j,f:()=>{if(m.hp>0)q8Hit(m,pd()*.15*P,'mage',3,k)}})}});
     if(this.t>=D){if(r==='b')H.forEach(h=>{const X=Math.round(h.x),Y=Math.round(h.y);fx({k:'q8pop',x:X,y:Y,r:80});q8Area(X,Y,80,1.2,'mage',1,k,P)});return true}return false}});return true},
 zb(k,P,cost,r){const p=q8Pt(300,120),X=Math.round(p.x),Y=Math.round(p.y),R=r==='a'?100:140,mul=r==='a'?.55:.4,D=4;q8Use(k,cost);fx({k:'q8cage',x:X,y:Y,r:R,dur:D+.45,u:r||''});
   for(let i=1;i<=8;i++)pend.push({t:.25+i*.5-.25,f:()=>{q8Area(X,Y,R,mul,'assn',3,k,P);fx({k:'q8rp',x:X,y:Y,r:R})}});
   pend.push({t:D,f:()=>{if(r==='b'){const T=q8Near(X,Y,320);if(T.length){const pts=[];for(let i=0;i<8;i++){const m=T[i%T.length];pts.push([m.id,Math.round((i/7-.5)*240)]);pend.push({t:.45,f:()=>{if(m.hp>0)q8Hit(m,pd()*1.2*P,'assn',1,k)}})}fx({k:'q8dag',x:X,y:Y,r:10,dur:.45,pts})}}
     else{pend.push({t:.3,f:()=>{fx({k:'q8pop',x:X,y:Y,r:R*.8,u:'v'});q8Area(X,Y,R,1.6,'assn',1,k,P);try{if(Math.hypot(me.x-X,me.y-Y)<500)shk=Math.max(shk,.25)}catch(e){}}})}}});return true},
 zs(k,P,cost,r){const n=r==='a'?2:3,T=q8Near(me.x,me.y,260).slice(0,n);if(!T.length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีศัตรูรอบตัว',t:.8});return false}q8Use(k,cost);const mul=r==='a'?.9:.6,D=4;
   fx({k:'q8sph',r:10,dur:D+.2,pts:T.map(m=>[m.id,0]),u:r||''});
   Q8S.push({t:0,tk:.5,f(dt){this.t+=dt;this.tk-=dt;if(me.down>0)return true;if(this.tk<=0){this.tk=.5;let c=0;T.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-me.x,m.y-me.y)<420){c++;q8Hit(m,pd()*mul*P,'curse',3,k)}});if(c)fx({k:'q8hlr',r:250,pc:Math.round(.005*c*1000)/1000})}
     if(this.t>=D){if(r==='b')T.forEach(m=>{if(!(m.hp>0))return;const X=Math.round(m.x),Y=Math.round(m.y);fx({k:'q8pop',x:X,y:Y,r:90,u:'v'});q8Area(X,Y,90,1.5,'curse',1,k,P)});return true}return false}});return true}});
/* ---------- ทุกเครื่อง: อรุณฟื้นคืน (ชุบ/ฮีล/พร) · ตำแหน่งกัดของสุนัข ---------- */
q8Recv=(f=>function(o){f.apply(this,arguments);if(!o||typeof o.k!=='string')return;const n=performance.now();
  if(o.k==='q8dawn'&&me.cls&&Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0))<Math.min(300,+o.r||240)){const D=Math.min(8,+o.dur||6),pct=Math.min(.4,Math.max(0,(+o.v||20)/100));
    if(me.down>0){me.down=0;me.hp=Math.max(me.hp,me.mh*.4);dn.push({x:me.x,y:me.y-50,v:'🌅 ฟื้นคืนชีพ!',t:1.4,col:'#ffe08a'})}else if(o.u==='b'){me.q8rgD=n+6000}else{const v=Math.round(me.mh*.2);me.hp=Math.min(me.mh,me.hp+v);dn.push({x:me.x,y:me.y-50,v:'+'+v,t:1,col:'#ffe08a'})}
    me.q8bl=n+D*1000;me.q8blV=pct;dn.push({x:me.x,y:me.y-64,v:'🔆 พรอรุณ +'+Math.round(pct*100)+'%',t:1.2,col:'#ffe08a'})}
  else if(o.k==='q8hbt'&&typeof o.by==='string')Q8HB[o.by+':'+(o.u||'0')]={x:+o.sx||0,y:+o.sy||0,tx:+o.x||0,ty:+o.y||0,t:n}})(q8Recv);
q8Tick=(f=>function(dt){const r=f.apply(this,arguments);try{if(me.q8rgD>performance.now()&&me.cls&&me.down<=0)me.hp=Math.min(me.mh,me.hp+me.mh*.03*dt)}catch(e){}return r})(q8Tick);
setTimeout(()=>{
  /* พรอรุณ: ดาเมจที่เราตี ×(1+พร) · หยุดกาลเวลา: สะสมดาเมจที่เราตีใส่มอนที่ถูกหยุด */
  try{const _ah=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){const n=performance.now();try{if(me.q8bl>n&&m&&!m.pv&&d>0)d*=1+(me.q8blV||.2)}catch(e){}
      try{const S=Q8TS;if(S&&n<S.end&&m&&S.ids.has(m.id)&&d>0)S.acc[m.id]=(S.acc[m.id]||0)+d}catch(e){}return _ah.call(this,m,d,cr,lv,ck)}}catch(e){}
},1900);
