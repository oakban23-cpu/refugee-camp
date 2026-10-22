
/* ===== v486 · คลังสกิลรอบ 3: อัลติทางเลือก ทุกอาชีพ (ปลด Lv 35) =====
   ใช้แทนอัลติได้ทุกขั้น (ปกติ · ตื่นพลังสายแสง/ทมิฬ · จุติ) · ยิ่งขั้นสูง พลังยิ่งแรง (q8UT: ปกติ ×1 · ตื่นพลัง ×1.9 · จุติ ×3.6 ตามผลวัดอัลติเดิมแต่ละขั้น)
   นับเป็นอัลติครบ: สถิติอัลติ · เควสรายวัน · สรุปดาเมจอัลติ · ดาเมจตัวเลขใหญ่ (lv 2)
   ภาพทุกอันส่งผ่าน fx() → เพื่อนเห็น · ดาเมจคิดฝั่งคนร่าย */
const Q8AV={};
Object.assign(Q8D.melee,{2:{id:'xa',n:'ร่างอสูรสงคราม',d:'คำรามแปลงร่างเป็นอสูรสงคราม 8 วิ (ตัวใหญ่ขึ้น) · คำรามแรก วง 130: 200% + มึน · ระหว่างแปลงร่าง ตีเร็วขึ้น 30% รับดาเมจลดลง 25% และทุกการโจมตีปล่อยคลื่นกระแทกรูปพัด (60%) · จบร่างระเบิดวง 110: 150%',cd:30,mc:50,tg:'atk aoe dur melee',
  po:{0:['roar',.8],a:['roar',.8],b:['roar',.8]},R:{a:['qm2a','🦶','เหยียบแผ่นดิน','ระหว่างแปลงร่าง กระทืบพื้นเองทุก 1 วิ วง 110 (45%)'],b:['qm2b','🩸','เลือดอสูร','คลื่นกระแทกดูดเลือด 0.8% ต่อมอนที่โดน (สูงสุด 4% ต่อครั้ง) · จบร่างฟื้นเลือด 15%']}}});
Object.assign(Q8D.archer,{2:{id:'xh',n:'เทพธนูเหินฟ้า',d:'เหินขึ้นฟ้า 2.8 วิ (อมตะ · อยู่กับที่) ยิงศรดิ่งลงใส่มอนรอบตัว (ไกล 360) 14 ดอก ดอกละ 120% สลับเป้าสูงสุด 4 ตัว · ลงพื้นกระแทกวง 90: 200%',cd:28,mc:45,tg:'atk proj dur',
  po:{0:['skyshot',.95],a:['skyshot',.95],b:['skyshot',.95]},R:{a:['qa2a','💥','ศรระเบิด','ศรทุกดอกระเบิดวง 48 (50%) · ดอกละ 100%'],b:['qa2b','🌟','ศรเทวะ','ก่อนลงพื้นยิงศรเทวะยักษ์ใส่เป้า วง 80: 350% + มึน 1.5 วิ']}}});
Object.assign(Q8D.mage,{2:{id:'xd',n:'มังกรอัคคี',d:'เรียกมังกรไฟเลื้อยพุ่งไปข้างหน้า 420 แล้ววนกลับหาตัว เผาทุกตัวที่มังกรผ่าน ขาไป 340% ขากลับ 340% · เป้าอยู่ไกลแค่ไหนก็พุ่งไปทางนั้น',cd:32,mc:70,tg:'atk proj aoe',
  po:{0:['summon',1],a:['summon',1],b:['summon',1]},R:{a:['qg2a','🧊','มังกรน้ำแข็ง','เป็นมังกรน้ำแข็ง ผ่านตัวไหนแช่แข็ง 1.2 วิ (ครั้งละ 260%)'],b:['qg2b','🐉','มังกรคู่','มังกร 2 ตัวเลื้อยไขว้กัน ตัวละ 120% ต่อรอบ']}}});
Object.assign(Q8D.assn,{2:{id:'xm',n:'จันทราประหาร',d:'หายตัว (อมตะ 1 วิ) ประทับจันทร์เสี้ยวบนมอนใกล้สุด 5 ตัว (ไกล 280) แล้วฟันจันทร์เสี้ยวพร้อมกันทุกตัว 450% · มอนที่เหลือเลือดไม่ถึง 25% ถูกประหาร (ยกเว้นบอส)',cd:28,mc:45,tg:'atk aoe',
  po:{0:['mark',.9],a:['mark',.9],b:['mark',.9]},R:{a:['qn2a','🌕','จันทร์เต็มดวง','ประทับได้ 8 ตัว ตัวละ 330%'],b:['qn2b','🌑','เงาจันทร์','ฟันเสร็จวาร์ปไปหลังมอนเลือดมากสุด แล้วล่องหน 3 วิ (ตีถัดไปคริ)']}}});
Object.assign(Q8D.sup,{2:{id:'xc',n:'โซ่ตรวนสวรรค์',d:'โซ่ทองจากฟ้าล่ามมอนรอบตัวสูงสุด 6 ตัว (ไกล 260) มึน 3 วิ + 250% ธาตุแสง · มอนที่ถูกล่ามรับดาเมจจากทุกคน +25% นาน 5 วิ',cd:30,mc:50,tg:'atk aoe dur',
  po:{0:['pray2',.9],a:['pray2',.9],b:['pray2',.9]},R:{a:['qu2a','💗','โซ่ดูดชีวิต','ทุก 1 วิ เพื่อนรอบตัว (300) ฟื้นเลือด 1.5% ต่อมอนที่ถูกล่าม (สูงสุด 6%/วิ)'],b:['qu2b','💥','โซ่ระเบิด','โซ่ขาดตอนจบ ระเบิดรอบมอนแต่ละตัว (วง 40) 80%']}}});
/* เริ่มอัลติ: คูลดาวน์ · MP · เสียงตามขั้น · สถิติ · เควส · สรุปดาเมจ */
function q8UltGo(k,cost,dur){q8Use(k,cost);try{me.stt.ult++}catch(e){}try{dqProg('ult',1)}catch(e){}try{ultSum.v=0;ultSum.sv=0;ultSum.n=0;ultSum.t=0;ultWin=performance.now()+dur*1000}catch(e){}}
/* เส้นทางมังกร: ขาไปเลื้อยตามมุม a · ขากลับโค้งกลับหาเจ้าของ (ph = ฝั่งเลื้อย ±1) */
function q8DragP(x0,y0,a,L,t,T1,T2,own,ph){const ca=Math.cos(a),sa=Math.sin(a);
  if(t<T1){const q=t/T1,w=Math.sin(q*Math.PI*3)*34*ph*Math.min(1,q*4);return[x0+ca*L*q-sa*w,y0+sa*L*q+ca*w,0]}
  const ex=x0+ca*L,ey=y0+sa*L,q=Math.min(1,(t-T1)/T2),ox=own?own.x:x0,oy=own?own.y:y0,dx=ox-ex,dy=oy-ey,dl=Math.hypot(dx,dy)||1,b=Math.sin(q*Math.PI)*70*ph;
  return[ex+dx*q-dy/dl*b,ey+dy*q+dx/dl*b,1]}
Object.assign(Q8F,{
 xa(k,P,cost,r){q8UltGo(k,cost,8.6);const D=8;fx({k:'q8av',r:130,dur:D,u:r||''});fx({k:'stun',r:130,full:1,dur:.6});q8Area(me.x,me.y,130,2,'melee',2,k,P);try{shk=Math.max(shk,.3)}catch(e){}
   me.q8av=performance.now()+D*1000;
   Q8S.push({t:0,tk:1,n0:me.atkN|0,wcd:0,f(dt){this.t+=dt;this.wcd-=dt;if(me.down>0){me.q8av=0;return true}
     me.cd=Math.max(0,(me.cd||0)-dt*.3);
     const n=me.atkN|0;if(n!==this.n0){this.n0=n;if(this.wcd<=0){this.wcd=.3;const a=me.face;fx({k:'q8cone',a:Math.round(a*1000)/1000,r:130,u:r||''});let hc=0;
       mons.forEach(m=>{if(!(m.hp>0))return;const dx=m.x-me.x,dy=m.y-me.y,dd=Math.hypot(dx,dy);if(dd>130+q8R(m))return;const da=Math.abs((((Math.atan2(dy,dx)-a)%6.2832)+9.4248)%6.2832-3.1416);if(da>.95&&dd>34)return;q8Hit(m,pd()*.6*P,'melee',3,k);hc++});
       if(r==='b'&&hc)me.hp=Math.min(me.mh,me.hp+me.mh*Math.min(.04,.008*hc))}}
     if(r==='a'){this.tk-=dt;if(this.tk<=0){this.tk=1;fx({k:'q8shk',r:110});q8Area(me.x,me.y,110,.45,'melee',3,k,P)}}
     if(this.t>=D){me.q8av=0;if(r==='b')me.hp=Math.min(me.mh,me.hp+me.mh*.15);fx({k:'q8pop',r:110});q8Area(me.x,me.y,110,1.5,'melee',2,k,P);try{shk=Math.max(shk,.25)}catch(e){}return true}return false}});return true},
 xh(k,P,cost,r){if(!q8Near(me.x,me.y,360).length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return false}
   q8UltGo(k,cost,3.4);const D=2.8,sx=me.x,sy=me.y,N=14,mul=r==='a'?1:1.2;me.inv3=Math.max(me.inv3||0,D+.1);fx({k:'q8sky',r:60,dur:D,u:r||''});
   Q8S.push({t:0,i:0,big:0,f(dt){this.t+=dt;if(me.down>0)return true;me.x=sx;me.y=sy;
     while(this.i<N&&this.t>=.45+this.i*.17){const T=q8Near(sx,sy,360),m=T.length?T[this.i%Math.min(4,T.length)]:null;this.i++;if(!m)continue;const X=Math.round(m.x),Y=Math.round(m.y);me.face=Math.atan2(m.y-sy,m.x-sx);
       fx({k:'q8sar',x:X,y:Y,sx:Math.round(sx),sy:Math.round(sy-74),r:10,u:r==='a'?'a':''});
       pend.push({t:.14,f:()=>{if(m.hp>0)q8Hit(m,pd()*mul*P,'archer',3,k);if(r==='a'){fx({k:'q8pop',x:X,y:Y,r:48});mons.forEach(o=>{if(o!==m&&o.hp>0&&Math.hypot(o.x-X,o.y-Y)<48+q8R(o))q8Hit(o,pd()*.5*P,'archer',3,k)})}}})}
     if(r==='b'&&!this.big&&this.t>=D-.35){this.big=1;const m=q8Near(sx,sy,360)[0];if(m){const X=Math.round(m.x),Y=Math.round(m.y);fx({k:'q8sar',x:X,y:Y,sx:Math.round(sx),sy:Math.round(sy-74),r:24,u:'b'});
       pend.push({t:.14,f:()=>{fx({k:'q8pop',x:X,y:Y,r:80,u:'h'});fx({k:'stun',x:X,y:Y,r:80,full:1,dur:1.5});q8Area(X,Y,80,3.5,'holy',2,k,P);try{shk=Math.max(shk,.3)}catch(e){}}})}}
     if(this.t>=D){fx({k:'q8shk',x:Math.round(sx),y:Math.round(sy),r:90});q8Area(sx,sy,90,2,'archer',2,k,P);return true}return false}});return true},
 xd(k,P,cost,r){const t=pickTarget(420);let a=me.face;if(t){a=Math.atan2(t.y-me.y,t.x-me.x);me.face=a}q8UltGo(k,cost,2.4);
   const x0=me.x,y0=me.y,L=420,T1=1.1,T2=1,ice=r==='a',two=r==='b',mul=ice?2.6:two?1.2:3.4,PH=two?[1,-1]:[1];
   fx({k:'q8drg',x:Math.round(x0),y:Math.round(y0),a:Math.round(a*1000)/1000,len:L,r:46,dur:T1+T2+.25,sx:T1,sy:T2,u:ice?'i':two?'2':''});
   PH.forEach(ph=>{Q8S.push({t:0,lx:x0,ly:y0,h:[new Set(),new Set()],f(dt){this.t+=dt;const P2=q8DragP(x0,y0,a,L,Math.min(this.t,T1+T2),T1,T2,me,ph),lg=P2[2],H=this.h[lg];
     for(const m of mons){if(!(m.hp>0)||H.has(m))continue;if(q8SegD(m.x,m.y,this.lx,this.ly,P2[0],P2[1])[0]<46+q8R(m)){H.add(m);q8Hit(m,pd()*mul*P,ice?'frost':'mage',2,k);if(ice)try{rxCC(m,'f',0,1.2)}catch(e){}}}
     this.lx=P2[0];this.ly=P2[1];return this.t>=T1+T2}})});return true},
 xm(k,P,cost,r){const n=r==='a'?8:5,T=q8Near(me.x,me.y,280).slice(0,n);if(!T.length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีศัตรูรอบตัว',t:.8});return false}
   q8UltGo(k,cost,1.6);me.stealth=Math.max(me.stealth||0,1.1);me.inv3=Math.max(me.inv3||0,1);me.face=Math.atan2(T[0].y-me.y,T[0].x-me.x);
   fx({k:'q8moon',r:30,dur:1.3,pts:T.map(m=>[m.id,0]),u:r||''});const mul=r==='a'?3.3:4.5;
   pend.push({t:1,f:()=>{if(me.down>0)return;let best=null;T.forEach(m=>{if(!(m.hp>0))return;fx({k:'q8mcut',x:Math.round(m.x),y:Math.round(m.y),r:62,a:Math.round((Math.random()*.8-.4-.6)*1000)/1000});
       let d=pd()*mul*P;const ex=m.t<3&&!m.pv&&!m.dum&&!m.mvp&&!m.wb&&m.mh>0&&(m.hp-d)/m.mh<.25;if(ex){d=Math.max(d,m.hp*1.6+10);dn.push({x:m.x,y:m.y-44,v:'🌙 ประหาร',t:1,col:'#d8c8ff'})}
       q8Hit(m,d,'assn',2,k);if(m.hp>0&&(!best||m.hp>best.hp))best=m});try{shk=Math.max(shk,.32)}catch(e){}
     if(r==='b'&&best){const aa=Math.atan2(best.y-me.y,best.x-me.x);me.x=cl(best.x+Math.cos(aa)*26,12,WW-12);me.y=cl(best.y+Math.sin(aa)*26,12,WH-12);me.face=aa+Math.PI;me.stealth=Math.max(me.stealth||0,3);fx({k:'shadow',x:Math.round(me.x),y:Math.round(me.y),r:40,len:1})}}});return true},
 xc(k,P,cost,r){const T=q8Near(me.x,me.y,260).slice(0,6);if(!T.length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีศัตรูรอบตัว',t:.8});return false}
   q8UltGo(k,cost,3.6);const D=3,pts=T.map(m=>[m.id,0]);fx({k:'q8chn',r:30,dur:D+.4,pts,u:r||''});fx({k:'q8vul',r:1,dur:5.4,pts});
   pend.push({t:.35,f:()=>{T.forEach(m=>{if(!(m.hp>0))return;fx({k:'stun',x:Math.round(m.x),y:Math.round(m.y),r:8,full:1,dur:D});q8Hit(m,pd()*2.5*P,'holy',2,k)});try{shk=Math.max(shk,.2)}catch(e){}}});
   if(r==='a')for(let i=1;i<=3;i++)pend.push({t:.35+i,f:()=>{const c=T.filter(m=>m.hp>0).length;if(c&&me.down<=0)fx({k:'q8hlr',r:300,pc:Math.round(Math.min(.06,.015*c)*1000)/1000})}});
   if(r==='b')pend.push({t:D+.35,f:()=>{T.forEach(m=>{if(!(m.hp>0))return;const X=Math.round(m.x),Y=Math.round(m.y);fx({k:'q8pop',x:X,y:Y,r:45,u:'h'});q8Area(X,Y,40,.8,'holy',2,k,P)});try{shk=Math.max(shk,.25)}catch(e){}}});return true}});
/* ทุกเครื่อง: ร่างอสูร (ตัวใหญ่) · ช่องโหว่ดาเมจของมอนที่ถูกล่าม · ฮีลจากโซ่ดูดชีวิต */
q8Recv=(f=>function(o){f.apply(this,arguments);if(!o||typeof o.k!=='string')return;const n=performance.now();
  if(o.k==='q8av'&&typeof o.by==='string')Q8AV[o.by]=n+Math.min(10,+o.dur||8)*1000;
  else if(o.k==='q8sky'&&typeof o.by==='string')Q8J[o.by]={t0:n,T:Math.min(4,+o.dur||2.8)*1000,k:'h'};
  else if(o.k==='q8vul'&&Array.isArray(o.pts)){const e=n+Math.min(8,+o.dur||5)*1000;o.pts.slice(0,8).forEach(q=>{const id=Array.isArray(q)?+q[0]:0;if(id)try{RVUL[id]=Math.max(RVUL[id]||0,e)}catch(x){}})}
  else if(o.k==='q8hlr'&&me.cls&&me.down<=0&&me.hp>0&&Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0))<Math.min(360,+o.r||300)){const v=Math.round(Math.min(.06,+o.pc||0)*me.mh);if(v>0){me.hp=Math.min(me.mh,me.hp+v);dn.push({x:me.x,y:me.y-46,v:'+'+v,t:.8,col:'#ffb0d0'})}}})(q8Recv);
setTimeout(()=>{
  try{const _hu=hurt;window.hurt=hurt=function(d){if(me.q8av>performance.now()&&d>0)d*=.75;return _hu.apply(this,[d].concat(Array.prototype.slice.call(arguments,1)))}}catch(e){}
},1800);
