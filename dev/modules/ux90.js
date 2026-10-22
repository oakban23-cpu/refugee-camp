
/* ===== v485 · คลังสกิลรอบ 2: ปุ่มสกิล 3 (ปลด Lv 25) และปุ่มสกิล 4 (ปลดเมื่อตื่นพลัง) มีสกิลทางเลือก ทุกอาชีพ =====
   ปุ่ม 4 ทางเลือกใช้แทนสกิล 4 ได้ทั้งสายแสงและสายทมิฬ · กลไกต่อเข้าคลังสกิล v484 (ux88) ทั้งหมด
   ของใหม่ในกลไก: Q8S = งานที่ทำต่อเนื่องทุกเฟรม (กระโดด · ลูกแก้ว · ลำแสง · เหยี่ยว · พายุ · ดวงแก้ว) · Q8B = ลำแสง/ดวงแก้วของทุกคน (ฮีลคนที่อยู่ในแนว/ใกล้)
   ภาพทุกอันส่งผ่าน fx() → เพื่อนเห็น · ดาเมจคิดฝั่งคนร่าย */
const Q8S=[],Q8B=[];
const q8io=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
Object.assign(Q8D.melee,{
 3:{id:'mj',n:'กระโดดทุบพสุธา',d:'กระโดดลงใส่เป้า (ไกล 240 · ไม่มีเป้า = ข้างหน้า) กระแทกวง 90: 300% + มึน 0.8 วิ · อมตะระหว่างลอยตัว · แลกบัฟโทสะกับการเข้าตีกลุ่ม',cd:10,mc:30,tg:'atk aoe move melee',
    po:{0:['cleave',.9],a:['cleave',.9],b:['cleave',.9]},R:{a:['qm3a','💥','แผ่นดินแยก','ลงแล้วแผ่นดินสั่นต่ออีก 3 ระลอก (ทุก 0.35 วิ วง 110 ระลอกละ 55%)'],b:['qm3b','🧲','กระแทกดึง','ลงแล้วดึงมอนในวง 200 มากองที่จุดลง กระแทกทั้งวง 220% + มึน']}},
 4:{id:'mg',n:'ดาบเทพตกฟ้า',d:'ดาบยักษ์ตกใส่เป้า (หรือข้างหน้า) หลัง 0.5 วิ วง 95: 420% + มึน 1.2 วิ · ดาบปักค้าง 3 วิ ปล่อยพลังรอบตัวทุก 0.5 วิ (30%)',cd:15,mc:40,tg:'atk aoe',
    po:{0:['rage',.75],a:['rage',.75],b:['rage',.75]},R:{a:['qm4a','⚔️','สามดาบ','ดาบ 3 เล่มตกเป็นสามเหลี่ยมรอบเป้า เล่มละ 220% มึน 0.8 วิ (ไม่ปักค้าง)'],b:['qm4b','💣','ดาบระเบิด','ดาบปักค้างแล้วระเบิดตอนครบ 3 วิ วง 120: 260% (ระหว่างปักแรงลงเหลือ 25%)']}}});
Object.assign(Q8D.archer,{
 3:{id:'ad',n:'ศรสังหาร',d:'ง้าง 0.3 วิ แล้วยิงศรทะลวงแนวยาว 380 ทะลุทุกตัว 400% · แลกการตรึงกับดาเมจระเบิด',cd:10,mc:30,tg:'atk proj',
    po:{0:['snipe',.62],a:['snipe',.62],b:['rapid',.5]},R:{a:['qa3a','💥','ศรระเบิด','ศรระเบิดที่เป้า วง 85: 220% · ศร 300%'],b:['qa3b','🔱','สามศร','ไม่ต้องง้าง ยิง 3 ดอกเป็นรูปพัดแคบ ดอกละ 170%']}},
 4:{id:'ah',n:'เหยี่ยวล่าเหยื่อ',d:'เรียกเหยี่ยวบินวนเหนือหัว 8 วิ โฉบลงจิกมอนที่ใกล้ที่สุดทุก 0.8 วิ (90%) · ช่วยตีขณะเราเดินยิง',cd:16,mc:35,tg:'atk dur',
    po:{0:['skyshot',.6],a:['skyshot',.6],b:['skyshot',.6]},R:{a:['qa4a','🦅','เหยี่ยวคู่','เรียก 2 ตัว ผลัดกันโฉบ ตัวละ 60%'],b:['qa4b','⚡','เหยี่ยวอสนี','ทุกครั้งที่โฉบ สายฟ้ากระโดดต่อ 2 ตัว (45%)']}}});
Object.assign(Q8D.mage,{
 3:{id:'go',n:'ลูกแก้วพลังเวท',d:'ปล่อยลูกแก้วลอยช้า ๆ ไปข้างหน้า 2.2 วิ ทุกตัวที่อยู่ใกล้ลูกแก้วโดน 55% ทุก 0.3 วิ · ยิ่งมอนเกาะกลุ่มตามทางยิ่งแรง',cd:9,mc:35,tg:'atk proj dur',
    po:{0:['orb',.62],a:['orb',.62],b:['channel',.6]},R:{a:['qg3a','💫','แตกกระจาย','ปลายทางระเบิด วง 100: 180%'],b:['qg3b','🪐','วงโคจร','ลูกแก้ววนรอบตัวเรา 5 วิ ตีมอนที่เข้าใกล้ 45% ทุก 0.3 วิ']}},
 4:{id:'gz',n:'พายุหิมะ',d:'เรียกพายุหิมะที่เป้า (หรือข้างหน้า) วง 140 นาน 4 วิ ตี 55% ทุก 0.5 วิ ธาตุน้ำแข็ง และทำให้มอนช้าลง · แลกการดูดกลุ่มกับการคุมพื้นที่นาน',cd:15,mc:45,tg:'atk aoe dur',
    po:{0:['channel',.8],a:['channel',.8],b:['channel',.8]},R:{a:['qg4a','🌨️','พายุเดิน','พายุเดินตามตัวเรา (วง 115 · 45% · ไม่ทำให้ช้า)'],b:['qg4b','🧊','แช่แข็งท้าย','ครบ 4 วิ แช่แข็งทุกตัวในวง 1.5 วิ + ระเบิด 200% (ระหว่างพายุ 35%)']}}});
Object.assign(Q8D.assn,{
 3:{id:'nd',n:'กริชเงาไล่ล่า',d:'ซัดกริชเงา 5 เล่มโค้งไล่ไปหามอนรอบตัว (ไกล 300) เล่มละ 110% · ไม่พลาดเป้า · แลกตราประทับกับดาเมจกระจาย',cd:8,mc:25,tg:'atk proj',
    po:{0:['flurry',.55],a:['flurry',.6],b:['flurry',.55]},R:{a:['qn3a','🗡️','พันกริช','8 เล่ม เล่มละ 75%'],b:['qn3b','☠️','กริชพิษ','เล่มละ 90% + พิษ 3 วิ']}},
 4:{id:'ns',n:'เคียวเงาพิฆาต',d:'เหวี่ยงเคียวเงายักษ์รอบตัว 2 รอบ (วง 140) รอบละ 200% · มอนที่เลือดเหลือไม่ถึง 15% ตายทันที (ยกเว้นบอส)',cd:14,mc:35,tg:'atk aoe melee',
    po:{0:['spin2',.62],a:['spin2',.62],b:['spin2',.62]},R:{a:['qn4a','🌀','สามรอบ','เหวี่ยง 3 รอบ รอบละ 150%'],b:['qn4b','🩸','เคียวดูดวิญญาณ','รอบละ 180% · ทุกตัวที่ตายด้วยเคียว ฟื้นเลือด 6% และ MP 8']}}});
Object.assign(Q8D.sup,{
 3:{id:'ub',n:'ลำแสงศักดิ์สิทธิ์',d:'ยิงลำแสงต่อเนื่อง 2.2 วิ ใส่เป้า (ยาว 280 · เดินไปด้วยได้) ทุกตัวในแนวโดน 45% ทุก 0.25 วิ · เพื่อนที่อยู่ในแนวลำแสงฟื้นเลือด 1.2% ทุกครั้ง',cd:10,mc:35,tg:'atk dur',
    po:{0:['point',.9],a:['point',.9],b:['point',.9]},R:{a:['qu3a','✨','ลำแสงคู่','แยกเป็น 2 ลำไปหา 2 เป้า ลำละ 30%'],b:['qu3b','💚','ลำแสงเยียวยา','ฮีลเพื่อนในแนว 3 เท่า (3.6%) · ดาเมจ 25%']}},
 4:{id:'uo',n:'ดวงแก้วเทวา',d:'ดวงแก้ว 3 ดวงลอยวนรอบตัว 8 วิ ยิงแสงใส่มอนรอบ ๆ (ไกล 220) ดวงละครั้งทุก 0.7 วิ (55%) · เพื่อนที่อยู่ใกล้เรา (90) ฟื้นเลือด 1%/วิ',cd:16,mc:40,tg:'atk dur buff',
    po:{0:['bless',.75],a:['bless',.75],b:['bless',.75]},R:{a:['qu4a','💖','ดวงแก้วเยียวยา','ยิงแสงฮีลเพื่อนที่เลือดน้อยสุดแทน (ไกล 300 · ครั้งละ 2% ของเลือดคนรับ)'],b:['qu4b','💥','ดวงแก้วระเบิด','แสง 45% · ครบเวลาดวงแก้วระเบิดรอบตัว วง 90 ดวงละ 100%']}}});
/* ---------- ตัวช่วยรอบ 2 ---------- */
function q8Near(x,y,r,f){return mons.filter(m=>m.hp>0&&!m.pv&&(!f||f(m))&&Math.hypot(m.x-x,m.y-y)<r+q8R(m)).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y))}
function q8Area(x,y,r,mul,ck,lv,k,P){let n=0;mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-x,m.y-y)<r+q8R(m)){n++;q8Hit(m,pd()*mul*P,ck,lv,k)}});return n}
function q8Pt(rg,ahead){const t=pickTarget(rg);if(t){me.face=Math.atan2(t.y-me.y,t.x-me.x);return{t,x:t.x,y:t.y}}return{t:null,x:cl(me.x+Math.cos(me.face)*ahead,12,WW-12),y:cl(me.y+Math.sin(me.face)*ahead,12,WH-12)}}
function q8Snipe(k,a,mul,L,boom,P){const x0=me.x,y0=me.y,T=L/1500,X=Math.round(x0+Math.cos(a)*L),Y=Math.round(y0+Math.sin(a)*L);
  fx({k:'q8snipe',x:Math.round(x0),y:Math.round(y0),a:Math.round(a*1000)/1000,len:Math.round(L),r:12,dur:T+.3});
  q8Shot({x0,y0,a,L,T,w:18,n:0,on:m=>q8Hit(m,pd()*mul,'archer',1,k),end:boom?()=>{fx({k:'q8pop',x:X,y:Y,r:85});q8Area(X,Y,85,2.2,'archer',1,k,P);try{if(Math.hypot(me.x-X,me.y-Y)<420)shk=Math.max(shk,.14)}catch(e){}}:null})}
/* ---------- กลไกสกิลทางเลือกรอบ 2 ---------- */
Object.assign(Q8F,{
 mj(k,P,cost,r){const t=pickTarget(240);let ex,ey;if(t){const a=Math.atan2(t.y-me.y,t.x-me.x),d=Math.max(0,Math.hypot(t.x-me.x,t.y-me.y)-18);ex=me.x+Math.cos(a)*d;ey=me.y+Math.sin(a)*d;me.face=a}
   else{ex=me.x+Math.cos(me.face)*140;ey=me.y+Math.sin(me.face)*140}ex=cl(ex,12,WW-12);ey=cl(ey,12,WH-12);q8Use(k,cost);
   const sx=me.x,sy=me.y,T=.38,R=r==='b'?200:90,X=Math.round(ex),Y=Math.round(ey);fx({k:'q8leap',x:X,y:Y,sx:Math.round(sx),sy:Math.round(sy),r:R,dur:T+.6,u:r||''});me.inv3=Math.max(me.inv3||0,T+.05);
   Q8S.push({t:0,f(dt){this.t+=dt;const q=Math.min(1,this.t/T),e=q8io(q);if(me.down>0)return true;me.x=sx+(ex-sx)*e;me.y=sy+(ey-sy)*e;if(q<1)return false;
     if(r==='b')q8Near(X,Y,200).forEach(m=>q8Pull(m,X,Y,18));fx({k:'stun',x:X,y:Y,r:R,full:1,dur:.8});q8Area(X,Y,R,r==='b'?2.2:3,'melee',1,k,P);try{shk=Math.max(shk,.25)}catch(e){}
     if(r==='a')for(let i=1;i<=3;i++)pend.push({t:.35*i,f:()=>{fx({k:'q8shk',x:X,y:Y,r:110});q8Area(X,Y,110,.55,'melee',3,k,P)}});return true}});return true},
 mg(k,P,cost,r){const p=q8Pt(260,120),X=Math.round(p.x),Y=Math.round(p.y);q8Use(k,cost);
   const drop=(x,y,R,mul,st,u,dur,dl)=>{const go=()=>{fx({k:'q8gsw',x,y,r:R,u,dur});pend.push({t:.5,f:()=>{if(st)fx({k:'stun',x,y,r:R,full:1,dur:st});q8Area(x,y,R,mul,'melee',1,k,P);try{if(Math.hypot(me.x-x,me.y-y)<420)shk=Math.max(shk,.22)}catch(e){}}})};if(dl>0)pend.push({t:dl,f:go});else go()};
   if(r==='a'){for(let i=0;i<3;i++){const an=-1.5708+i*2.0944;drop(Math.round(X+Math.cos(an)*60),Math.round(Y+Math.sin(an)*44),70,2.2,.8,'s',1.1,i*.12)}return true}
   drop(X,Y,95,4.2,1.2,r==='b'?'b':'',3.5,0);const pm=r==='b'?.25:.3;for(let i=0;i<6;i++)pend.push({t:1+i*.5,f:()=>q8Area(X,Y,75,pm,'melee',3,k,P)});
   if(r==='b')pend.push({t:3.5,f:()=>{fx({k:'q8pop',x:X,y:Y,r:120,u:'h'});q8Area(X,Y,120,2.6,'melee',1,k,P);try{if(Math.hypot(me.x-X,me.y-Y)<420)shk=Math.max(shk,.3)}catch(e){}}});return true},
 ad(k,P,cost,r){const {t,a}=q8Aim(380);q8Use(k,cost);if(r==='b'){[-.12,0,.12].forEach(da=>q8Snipe(k,a+da,1.7*P,360,0,P));return true}
   fx({k:'q8chg',r:30,dur:.3,a:Math.round(a*1000)/1000});
   pend.push({t:.3,f:()=>{if(me.down>0)return;const tt=t&&t.hp>0?t:null,a2=tt?Math.atan2(tt.y-me.y,tt.x-me.x):a;let L=380;
     if(r==='a'&&tt)L=Math.min(380,Math.hypot(tt.x-me.x,tt.y-me.y)+8);me.face=a2;q8Snipe(k,a2,(r==='a'?3:4)*P,L,r==='a'?1:0,P)}});return true},
 ah(k,P,cost,r){q8Use(k,cost);const n=r==='a'?2:1,D=8,mul=r==='a'?.6:.9;fx({k:'q8hawk',r:30,dur:D,u:n+(r==='b'?'b':'')});
   for(let h=0;h<n;h++)Q8S.push({t:0,tk:.5+h*.4,h,f(dt){this.t+=dt;this.tk-=dt;if(me.down>0)return true;
     if(this.tk<=0){const T=q8Near(me.x,me.y,280)[0];if(!T){this.tk=.3}else{this.tk=.8;const an=performance.now()/1000*2.2+this.h*Math.PI,hx=me.x+Math.cos(an)*42,hy=me.y-46+Math.sin(an)*16;
         fx({k:'q8dive',x:Math.round(T.x),y:Math.round(T.y),sx:Math.round(hx),sy:Math.round(hy),r:20,u:String(this.h)});const m=T;
         pend.push({t:.22,f:()=>{if(!(m.hp>0))return;q8Hit(m,pd()*mul*P,'archer',1,k);if(r==='b'){let cur=m;const hit=new Set([m]);for(let j=0;j<2;j++){const nb=q8Near(cur.x,cur.y,150,o=>!hit.has(o))[0];if(!nb)break;hit.add(nb);
             fx({k:'chain',r:30,pts:[[Math.round(cur.x),Math.round(cur.y-8)],[Math.round(nb.x),Math.round(nb.y-8)]]});q8Hit(nb,pd()*.45*P,'bolt',3,k);cur=nb}}}})}}
     return this.t>=D}});return true},
 go(k,P,cost,r){const {a}=q8Aim(320);q8Use(k,cost);
   if(r==='b'){fx({k:'q8orb',r:50,dur:5,u:'o'});Q8S.push({t:0,tk:0,f(dt){this.t+=dt;this.tk-=dt;const an=this.t*3.2,ox=me.x+Math.cos(an)*75,oy=me.y+Math.sin(an)*45;
       if(this.tk<=0){this.tk=.3;mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-ox,m.y-oy)<50+q8R(m))q8Hit(m,pd()*.45*P,'mage',3,k)})}return this.t>=5||me.down>0}});return true}
   const x0=me.x,y0=me.y,sp=150,D=2.2;fx({k:'q8orb',x:Math.round(x0),y:Math.round(y0),a:Math.round(a*1000)/1000,len:sp*D,r:55,dur:D,u:''});
   Q8S.push({t:0,tk:0,f(dt){this.t+=dt;this.tk-=dt;const q=Math.min(1,this.t/D),ox=x0+Math.cos(a)*sp*D*q,oy=y0+Math.sin(a)*sp*D*q;
     if(this.tk<=0){this.tk=.3;mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-ox,m.y-oy)<55+q8R(m))q8Hit(m,pd()*.55*P,'mage',3,k)})}
     if(q>=1){if(r==='a'){const X=Math.round(ox),Y=Math.round(oy);fx({k:'q8pop',x:X,y:Y,r:100,u:'v'});q8Area(X,Y,100,1.8,'mage',1,k,P)}return true}return false}});return true},
 gz(k,P,cost,r){const fol=r==='a',p=fol?{x:me.x,y:me.y}:q8Pt(300,120),X=Math.round(p.x),Y=Math.round(p.y),D=4,R=fol?115:140,mul=fol?.45:r==='b'?.35:.55;q8Use(k,cost);
   fx({k:'q8bliz',x:X,y:Y,r:R,dur:D,u:fol?'f':r==='b'?'b':''});if(!fol)fx({k:'frost',x:X,y:Y,r:R,dur:D});
   Q8S.push({t:0,tk:.25,f(dt){this.t+=dt;this.tk-=dt;const cx=fol?me.x:X,cy=fol?me.y:Y;if(this.tk<=0){this.tk=.5;q8Area(cx,cy,R,mul,'frost',3,k,P)}
     if(this.t>=D){if(r==='b'){q8Near(cx,cy,R).forEach(m=>{try{rxCC(m,'f',0,1.5)}catch(e){}});fx({k:'q8pop',x:Math.round(cx),y:Math.round(cy),r:R,u:'i'});q8Area(cx,cy,R,2,'frost',1,k,P)}return true}return false}});return true},
 nd(k,P,cost,r){const T=q8Near(me.x,me.y,300);if(!T.length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return false}q8Use(k,cost);
   const n=r==='a'?8:5,mul=r==='a'?.75:r==='b'?.9:1.1,D=.45,pts=[];me.face=Math.atan2(T[0].y-me.y,T[0].x-me.x);
   for(let i=0;i<n;i++){const m=T[i%T.length];pts.push([m.id,Math.round(((n>1?i/(n-1):.5)-.5)*240)]);pend.push({t:D,f:()=>{if(m.hp>0){q8Hit(m,pd()*mul*P,'assn',1,k);if(r==='b')q8Psn(m,P*1.25,k)}}})}
   fx({k:'q8dag',r:10,dur:D,pts});return true},
 ns(k,P,cost,r){q8Use(k,cost);const n=r==='a'?3:2,mul=r==='a'?1.5:r==='b'?1.8:2,R=140,gap=.33;fx({k:'q8scy',r:R,dur:.3+gap*n,u:String(n)});
   for(let i=0;i<n;i++)pend.push({t:.12+gap*i,f:()=>{if(me.down>0)return;mons.forEach(m=>{if(!(m.hp>0)||Math.hypot(m.x-me.x,m.y-me.y)>R+q8R(m))return;let d=pd()*mul*P;
     const ex=m.t<3&&!m.pv&&!m.dum&&!m.mvp&&!m.wb&&m.mh>0&&(m.hp-d)/m.mh<.15;if(ex){d=Math.max(d,m.hp*1.6+10);dn.push({x:m.x,y:m.y-40,v:'☠️ ประหาร',t:.9,col:'#d49aff'})}const h0=m.hp;q8Hit(m,d,'assn',1,k);
     if(r==='b'&&h0>0&&h0-d<=0){me.hp=Math.min(me.mh,me.hp+me.mh*.06);me.mp=Math.min(me.mm,me.mp+8)}})}});return true},
 ub(k,P,cost,r){const t=pickTarget(300);if(!t){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return false}q8Use(k,cost);me.face=Math.atan2(t.y-me.y,t.x-me.x);
   const D=2.2,L=280,t2=r==='a'?q8Near(me.x,me.y,300,m=>m!==t)[0]||null:null,mul=r==='a'?.3:r==='b'?.25:.45;
   fx({k:'q8beam',r:L,dur:D,sx:t.id,sy:t2?t2.id:0,u:r||''});
   Q8S.push({t:0,tk:0,f(dt){this.t+=dt;this.tk-=dt;if(me.down>0)return true;if(this.tk<=0){this.tk=.25;for(const tg of[t,t2]){if(!tg)continue;const a=tg.hp>0?Math.atan2(tg.y-me.y,tg.x-me.x):me.face,ex=me.x+Math.cos(a)*L,ey=me.y+Math.sin(a)*L;
       if(tg===t&&tg.hp>0)me.face=a;mons.forEach(m=>{if(m.hp>0&&q8SegD(m.x,m.y,me.x,me.y,ex,ey)[0]<20+q8R(m))q8Hit(m,pd()*mul*P,'holy',3,k)})}}return this.t>=D}});return true},
 uo(k,P,cost,r){q8Use(k,cost);const D=8;fx({k:'q8orbs',r:34,dur:D,u:r||''});
   Q8S.push({t:0,tk:.35,i:0,f(dt){this.t+=dt;this.tk-=dt;if(me.down>0)return true;const op=oi=>{const an=this.t*2.4+oi*2.0944;return[me.x+Math.cos(an)*34,me.y-18+Math.sin(an)*14]};
     if(this.tk<=0){this.tk=.7/3;const oi=this.i++%3,[ox,oy]=op(oi);
       if(r==='a'){let best=null,bf=.999;if(me.hp/me.mh<bf){bf=me.hp/me.mh;best={u:uid,x:me.x,y:me.y}}
         for(const u in others){const o=others[u];if(!o||!(o.hp>0)||!o.mh||Math.hypot(o.x-me.x,o.y-me.y)>300)continue;const f=o.hp/o.mh;if(f<bf){bf=f;best={u,x:o.x,y:o.y}}}
         if(best){fx({k:'q8ray',x:Math.round(best.x),y:Math.round(best.y),sx:Math.round(ox),sy:Math.round(oy),r:6,u:'h'});fx({k:'q8hl',x:Math.round(best.x),y:Math.round(best.y),r:1,u:best.u,pc:Math.round(.02*P*1000)/1000})}}
       else{const T=q8Near(me.x,me.y,220);if(T.length){const m=T[Math.random()*T.length|0];fx({k:'q8ray',x:Math.round(m.x),y:Math.round(m.y),sx:Math.round(ox),sy:Math.round(oy),r:6});q8Hit(m,pd()*(r==='b'?.45:.55)*P,'holy',3,k)}}}
     if(this.t>=D){if(r==='b')for(let oi=0;oi<3;oi++){const [ox,oy]=op(oi),X=Math.round(ox),Y=Math.round(oy+18);fx({k:'q8pop',x:X,y:Y,r:90,u:'h'});q8Area(X,Y,90,1,'holy',1,k,P)}return true}return false}});return true}});
/* ---------- งานต่อเนื่อง + ฮีลจากลำแสง/ดวงแก้วของคนอื่น ---------- */
function q8STick(dt){let cm=null;try{cm=curMap}catch(e){}for(let i=Q8S.length-1;i>=0;i--){const T=Q8S[i];if(T.mp===undefined)T.mp=cm;let f=true;if(T.mp===cm)try{f=T.f(dt)}catch(e){}if(f)Q8S.splice(i,1)}
  const n=performance.now();for(let i=Q8B.length-1;i>=0;i--){const B=Q8B[i];if(n>B.end){Q8B.splice(i,1);continue}if(!me.cls||me.down>0||me.hp<=0)continue;B.tk-=dt;if(B.tk>0)continue;
    const o=B.by===uid?me:others[B.by];if(!o)continue;
    if(B.k==='o'){B.tk=1;if(Math.hypot(o.x-me.x,o.y-me.y)<90)me.hp=Math.min(me.mh,me.hp+me.mh*.01)}
    else{B.tk=.25;if(B.by===uid)continue;for(const id of B.ids){const m=mons.find(q=>q.id===id);const a=m?Math.atan2(m.y-o.y,m.x-o.x):(o.fx<0?Math.PI:0),ex=o.x+Math.cos(a)*B.L,ey=o.y+Math.sin(a)*B.L;
      if(q8SegD(me.x,me.y,o.x,o.y,ex,ey)[0]<30){me.hp=Math.min(me.mh,me.hp+me.mh*B.h);break}}}}}
q8Tick=(f=>function(dt){const r=f.apply(this,arguments);try{q8STick(dt)}catch(e){}return r})(q8Tick);
q8Recv=(f=>function(o){f.apply(this,arguments);if(!o||typeof o.k!=='string')return;const n=performance.now();
  if(o.k==='q8beam'&&typeof o.by==='string'){if(Q8B.length>=16)Q8B.shift();Q8B.push({k:'b',by:o.by,end:n+Math.min(4,+o.dur||2.2)*1000,ids:[+o.sx||0,+o.sy||0].filter(Boolean),L:Math.min(400,+o.r||280),h:o.u==='b'?.036:.012,tk:.25})}
  else if(o.k==='q8orbs'&&typeof o.by==='string'){if(Q8B.length>=16)Q8B.shift();Q8B.push({k:'o',by:o.by,end:n+Math.min(10,+o.dur||8)*1000,tk:1})}
  else if(o.k==='q8hl'&&o.u===uid&&me.cls&&me.down<=0&&me.hp>0){const v=Math.round(Math.min(.1,+o.pc||0)*me.mh);if(v>0){me.hp=Math.min(me.mh,me.hp+v);dn.push({x:me.x,y:me.y-46,v:'+'+v,t:.8,col:'#9affb0'})}}})(q8Recv);
