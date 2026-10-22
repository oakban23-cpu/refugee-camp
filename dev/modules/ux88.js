
/* ===== v484 · คลังสกิล: ปุ่มสกิล 1–2 ของทุกอาชีพมีสกิลทางเลือกให้เลือกใช้ =====
   ปลดสกิลทางเลือกช่อง 1 ที่ Lv 8 · ช่อง 2 ที่ Lv 16 (จุติแล้วปลดครบ) · เลือกได้ที่ เมนู → ตัวละคร → สกิล → 📚 คลังสกิล (หรือที่ช่างรูนไอริส)
   สลับได้ทุกที่ · สลับแล้วช่องนั้นติดคูลดาวน์ของสกิลใหม่ (กันสลับมาใช้ซ้ำ)
   สกิลทางเลือกแต่ละอันมีรูนหลัก A/B ของตัวเอง (สร้าง/อัปเกรดที่ช่างรูนตอนเลือกใช้สกิลนั้นอยู่) · ใส่รูนเสริมลิงก์ได้ตามแท็กของสกิลใหม่
   วิธีต่อเข้าระบบเดิม: สลับข้อมูลของช่องนั้น (ชื่อ คูลดาวน์ MP คำอธิบาย ไอคอน แท็ก รูน ท่า เสียง) แบบเดียวกับที่สกิล 4 สลับตามสาย (applyBr)
   แล้วให้ useSkill0 ของช่อง 1–2 เรียกกลไกของสกิลใหม่ (ห่อก่อนระบบรูนเสริม → ลิงก์/ร่ายซ้ำ/ทอเท็มใช้กับสกิลใหม่ได้)
   ภาพทุกอันส่งผ่าน fx() → เพื่อนเห็น · ดาเมจคิดฝั่งคนร่ายผ่าน addHit เดิม (ใช้ได้กับลานประลองด้วย) */
const Q8LV={0:8,1:16,3:25,4:50,2:35},Q8K=[0,1,3,4,2],Q8Z=[],Q8P=[],Q8HW={},Q8RU4={};let Q8A={sig:''},Q8O=null,Q8DK=null,Q8LK=-1;
/* v485: ปุ่ม 3 ปลดที่ Lv 25 · ปุ่ม 4 ปลดเมื่อตื่นพลัง (อาชีพขั้น 2) */
function sp8(){if(!me.sp8||typeof me.sp8!=='object')me.sp8={e:{},r:{},n:{}};const P=me.sp8;P.e=P.e||{};P.r=P.r||{};P.n=P.n||{};return P}
function q8Clean(o){if(!o||typeof o!=='object')return null;const r={e:{},r:{},n:{}};Q8K.forEach(k=>{if(o.e&&+o.e[k]===1)r.e[k]=1;if(o.n&&o.n[k])r.n[k]=1;
    if(o.r&&typeof o.r==='object'){[k+'o',k+'x'].forEach(q=>{if(o.r[q]==='a'||o.r[q]==='b')r.r[q]=o.r[q]});if(o.r['t'+k])r.r['t'+k]=1}});return r}
function q8Unl(k){if(!me.cls)return false;if((me.rb|0)>0)return true;if(k===4)return !!me.cls2;return (me.lv|0)>=(Q8LV[k]||99)}
function q8LkTx(k){return k===4?'ปลดเมื่อตื่นพลัง (อาชีพขั้น 2)':'ปลดที่ Lv '+Q8LV[k]}
/* v486: ชื่อปุ่มสำหรับข้อความ (ปุ่ม 3 = k3 · ปุ่ม 4 = k4 · อัลติ = k2) */
function q8KN(k,sh){return k===2?(sh?'อัลติ':'ปุ่มอัลติ'):(sh?'ปุ่ม ':'ปุ่มสกิล ')+(k===3?3:k===4?4:k+1)}
function q8UT(){try{if(typeof u3Open==='function'&&u3Open())return 3.6}catch(e){}return me.cls2?1.9:1}
function q8On(k){return !!(me.cls&&Q8D[me.cls]&&me.sp8&&me.sp8.e&&+me.sp8.e[k]===1&&q8Unl(k))}
/* ---------- นิยามสกิลทางเลือก ---------- */
const Q8D={
 melee:{0:{id:'mw',n:'ฟันเสี้ยวจันทร์',d:'ฟันคลื่นพลังรูปเสี้ยวพุ่งไปข้างหน้าไกล 260 ทะลุทุกตัวในแนว (220%) · ตีจากระยะไกลได้ แลกกับวงรอบตัว',cd:6,mc:25,tg:'atk proj melee',
          po:{0:['lunge',.46],a:['flurry',.55],b:['cleave',.75]},R:{a:['qm0a','🌙','สามเสี้ยว','ฟันคลื่น 3 ลูกเป็นรูปพัด ลูกละ 100% (มอนที่อยู่ใกล้โดนได้หลายลูก)'],b:['qm0b','🌊','คลื่นยักษ์','คลื่นกว้างเกือบ 2 เท่า วิ่งช้าลง ระยะ 200 แรง 260%']}},
        1:{id:'mb',n:'ขว้างดาบบูมเมอแรง',d:'ขว้างดาบหมุนออกไป 230 แล้ววนกลับมาหาตัว โดนทั้งขาไปและขากลับ (ครั้งละ 150%) · แลกการพุ่งตัวกับการกวาดกลุ่มจากระยะกลาง',cd:6,mc:20,tg:'atk proj melee',
          po:{0:['toss',.56],a:['toss',.56],b:['toss',.56]},R:{a:['qm1a','🌀','ใบมีดวน','ดาบลอยหมุนค้างที่ปลายทาง 1 วิ ฟันมอนรอบ ๆ ทุก 0.25 วิ (45%) · ขาไป/กลับ 130%'],b:['qm1b','🧲','ดึงกลับ','ขากลับลากมอนที่โดนติดมาหาตัวเรา (ยกเว้นบอส) · ครั้งละ 140%']}}},
 archer:{0:{id:'af',n:'ยิงกระจาย',d:'ยิงธนู 5 ดอกเป็นรูปพัด ดอกละ 140% · ยิ่งใกล้เป้ายิ่งโดนหลายดอก เหมาะยิงเป้าเดียว (ห่าธนูเหมาะกับกลุ่ม)',cd:5,mc:25,tg:'atk proj',
          po:{0:['rapid',.5],a:['volley',.55],b:['rapid',.5]},R:{a:['qa0a','🪭','พัดกว้าง','7 ดอก กางกว้างขึ้น ดอกละ 100% · กวาดได้หลายตัว'],b:['qa0b','💥','หัวระเบิด','ลูกธนูระเบิดตอนโดน กระเซ็นใส่มอนรอบ ๆ 60% · ดอกละ 100%']}},
         1:{id:'ag',n:'ธงล่าเหยื่อ',d:'ปักธงที่เป้า (ไม่มีเป้า = ข้างหน้า) แรงกระแทก 120% · เขตรอบธง 7 วิ มอนในเขตโดนดาเมจจากทุกคนในทีม +20%',cd:14,mc:30,tg:'atk aoe dur',
          po:{0:['plant',.6],a:['plant',.6],b:['plant',.6]},R:{a:['qa1a','⚡','ธงอัสนี','ธงเรียกฟ้าผ่ามอนในเขตทุก 1 วิ (70% ธาตุสายฟ้า)'],b:['qa1b','🍃','ธงลมกรด','เพื่อนที่ยืนอยู่ในเขตได้ความเร็วโจมตี +30%']}}},
 mage:{0:{id:'gl',n:'หอกน้ำแข็ง',d:'ยิงหอกน้ำแข็งทะลุทุกตัวในแนวยาว 340 (260% ธาตุน้ำแข็ง) · ตัวสุดท้ายที่โดนถูกแช่แข็ง 1.2 วิ (บอสช้าลง)',cd:6,mc:35,tg:'atk proj',
          po:{0:['point',.5],a:['point',.55],b:['cast',.6]},R:{a:['qg0a','🔱','หอกคู่','ยิง 2 แท่งเป็นรูปตัว V แท่งละ 170% · ตัวที่โดนทั้งสองแท่งรับเต็ม'],b:['qg0b','❄️','ระเบิดเยือกแข็ง','หอกระเบิดที่เป้า วง 85 (200% + ช้าลง 2.5 วิ) · หอก 200%']}},
       1:{id:'gb',n:'วาร์ปพริบตา',d:'วาร์ปไป 170 ตามทิศที่เดิน (ไม่ได้เดิน = หนีจากมอนที่ใกล้สุด) ระเบิดเวททั้งจุดเดิมและจุดใหม่ (150%) · อมตะชั่วครู่ตอนวาร์ป',cd:7,mc:30,tg:'atk aoe move',
          po:{0:['raise',.4],a:['raise',.4],b:['raise',.4]},R:{a:['qg1a','✨','วาร์ปสองจังหวะ','วาร์ปได้อีกครั้งภายใน 1.5 วิ (ระเบิดครั้งละ 110%)'],b:['qg1b','🧊','ทิ้งน้ำแข็ง','จุดเดิมระเบิดแรงขึ้น 200% และทิ้งไอเย็นให้มอนช้าลง 3 วิ (จุดใหม่ไม่ระเบิด)']}}},
 assn:{0:{id:'nf',n:'ดาวกระจาย',d:'ปาดาวกระจาย 3 ดอกเป็นรูปพัด ดอกละ 115% + พิษ 3 วิ (รวม 60%) · ตีจากระยะไกลได้ แลกการวาร์ปกับล่องหน',cd:5,mc:22,tg:'atk proj',
          po:{0:['toss',.5],a:['toss',.5],b:['toss',.6]},R:{a:['qn0a','🔁','ดาวคืนมือ','ดาวบินกลับมาหาเรา โดนซ้ำขากลับ 75%'],b:['qn0b','✴️','ดาวมรณะ','ปาดาวยักษ์ดอกเดียว ทะลุทุกตัวในแนว 260% + พิษ']}},
       1:{id:'nh',n:'ตะขอเงา',d:'เหวี่ยงตะขอโซ่ไปข้างหน้า 250 เกี่ยวมอนตัวแรก ลากมาหาตัว + มึน 0.8 วิ (250%) · บอสไม่ถูกลาก',cd:8,mc:25,tg:'atk proj',
          po:{0:['toss',.56],a:['toss',.56],b:['lunge',.5]},R:{a:['qn1a','⛓️','โซ่กวาด','เกี่ยวได้ 3 ตัวในแนว ลากมาทั้งหมด ตัวละ 160%'],b:['qn1b','🪝','พุ่งตามโซ่','ดึงตัวเราไปหามอนแทน แทง 300% แล้วล่องหน 1.5 วิ (ตีครั้งถัดไปคริ)']}}},
 sup:{0:{id:'sb',n:'โล่แสง',d:'ให้โล่ตัวเองและเพื่อนรอบตัว (วง 170) ดูดซับ 14% ของเลือดสูงสุดของคนรับ +40 นาน 6 วิ (เล่นคนเดียว ×1.4) · กันก่อนโดนแทนฮีลทีหลัง',cd:10,mc:30,tg:'buff aoe party',
          po:{0:['bless',.75],a:['bless',.75],b:['bless',.75]},R:{a:['qu0a','🌵','โล่หนาม','โล่ 11% แต่ระหว่างมีโล่ โดนตีแล้วสะท้อนแสงใส่มอนรอบตัว (100%)'],b:['qu0b','🌿','โล่ฟื้นฟู','โล่ 10% และระหว่างมีโล่ ฟื้นเลือด 2.5% ต่อวิ']}},
      1:{id:'sh',n:'ค้อนพิพากษา',d:'ค้อนแสงตกใส่เป้า (ไม่มีเป้า = ข้างหน้า) วง 80: 300% ธาตุแสง + มึน 1 วิ · สายตีของนักสวด แลกกับบัฟทีม',cd:9,mc:30,tg:'atk aoe',
          po:{0:['smite',.7],a:['smite',.7],b:['smite',.8]},R:{a:['qu1a','🔨','สามค้อน','ค้อน 3 อันตกใส่มอน 3 ตัวต่อกัน อันละ 150% มึน 0.6 วิ'],b:['qu1b','⛪','ค้อนศักดิ์สิทธิ์','ค้อนใหญ่ วง 120: 260% แล้วทิ้งเขตศักดิ์สิทธิ์ 3 วิ (เพื่อนฟื้นเลือด เผามอน)']}}}};
/* ---------- ตัวช่วย ---------- */
function q8R(m){try{return mR(m)}catch(e){return 14}}
function q8Use(k,cost){me.sk[k]=cdOf(k);me.mp-=cost;try{dqProg('skill',1)}catch(e){}try{skSfx(k)}catch(e){}}
function q8Aim(rg){const t=pickTarget(rg);let a=me.face;if(t){a=Math.atan2(t.y-me.y,t.x-me.x);me.face=a}return{t,a}}
/* ดาเมจของสกิลทางเลือก: ผูกกับช่อง k ให้รูนเสริมที่ลิงก์ไว้ติดผลถูกช่อง (แม้ดาเมจมาทีหลัง) */
function q8Hit(m,d,ck,lv,k){if(!m||!(d>0))return;const p=SGX;let s=0;if(!p&&k!=null&&k>=0){SGX={k,pow:1,src:'q8'};s=1}try{addHit(m,d,0,lv||1,ck)}catch(e){}finally{if(s)SGX=p}}
function q8Fx(o){fx(o);for(let i=fxs.length-1;i>=0&&i>=fxs.length-6;i--){const f=fxs[i];if(f.k===o.k&&f.by===uid)return f}return{}}
function q8SegD(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy;let u=l2?((px-ax)*dx+(py-ay)*dy)/l2:0;u=Math.max(0,Math.min(1,u));return[Math.hypot(ax+dx*u-px,ay+dy*u-py),u]}
/* ลากมอนไปหาจุด (x,y) เหลือระยะ gap · ใช้คำสั่งดึงเดิม (โฮสต์ขยับ 65% ของทาง → ตั้งจุดเลยไปให้ถึงพอดี) */
function q8Pull(m,x,y,gap){if(!m||m.t>=3||m.pv||m.dum)return;const a=Math.atan2(m.y-y,m.x-x),dx=x+Math.cos(a)*gap,dy=y+Math.sin(a)*gap,px=cl(m.x+(dx-m.x)/.65,8,WW-8),py=cl(m.y+(dy-m.y)/.65,8,WH-8);
  try{rxCC(m,'p',Math.round(px/4)*5000+Math.round(py/4),0)}catch(e){}}
function q8Psn(m,P,k){for(let i=1;i<=3;i++)pend.push({t:.9*i,f:()=>{if(m&&m.hp>0)q8Hit(m,pd()*.2*P,'poison',3,k)}})}
function q8InZ(m){for(const z of Q8Z)if(Math.hypot(m.x-z.x,m.y-z.y)<z.r+q8R(m))return true;return false}
/* ---------- กระสุนของเรา (คิดดาเมจตามเวลา ตรงกับภาพ) ---------- */
function q8Shot(o){o.t=0;o.hit=new Set();o.lx=o.x0;o.ly=o.y0;Q8P.push(o);return o}
function q8Step(o,dt){const t=o.t;let x,y,ph=0,fin=false;
  if(o.boom){const B=o.boom,D=B.tO+B.hv+B.tB,P=q8BoomPos(o.x0,o.y0,o.a,o.L,B.tO,B.hv,B.tB,Math.min(t,D),me);x=P[0];y=P[1];ph=P[2];fin=t>=D}
  else if(o.ret){const tO=o.T,D=o.T*2,ex=o.hx!=null?o.hx:o.x0+Math.cos(o.a)*o.L,ey=o.hy!=null?o.hy:o.y0+Math.sin(o.a)*o.L;
    if(t<tO){if(o.hx!=null){x=o.hx;y=o.hy}else{const q=t/tO;x=o.x0+Math.cos(o.a)*o.L*q;y=o.y0+Math.sin(o.a)*o.L*q}}
    else{ph=2;const q=q8ei(Math.min(1,(t-tO)/(D-tO)));x=ex+(me.x-ex)*q;y=ey+(me.y-ey)*q;fin=t>=D}}
  else{const q=Math.min(1,t/o.T);x=o.x0+Math.cos(o.a)*o.L*q;y=o.y0+Math.sin(o.a)*o.L*q;fin=q>=1}
  const lx=o.lx,ly=o.ly;o.lx=x;o.ly=y;
  if(ph===1&&o.hov){o.hk=(o.hk==null?0:o.hk)-dt;if(o.hk<=0){o.hk=o.hov.iv;for(const m of mons)if(m.hp>0&&Math.hypot(m.x-x,m.y-y)<o.hov.r+q8R(m))try{o.hov.f(m)}catch(e){}}}
  else if(!(o.ret&&o.hx!=null&&ph===0)){const set=ph===2?(o.hit2||(o.hit2=new Set())):o.hit,H=[];
    for(const m of mons){if(!(m.hp>0)||set.has(m))continue;const r=q8SegD(m.x,m.y,lx,ly,x,y);if(r[0]<o.w+q8R(m))H.push([r[1],m])}
    H.sort((p,q)=>p[0]-q[0]);
    for(const [u,m] of H){set.add(m);const hx=lx+(x-lx)*u,hy=ly+(y-ly)*u;try{o.on(m,ph,Math.hypot(hx-o.x0,hy-o.y0))}catch(e){}
      if(ph!==2&&o.n>0&&set.size>=o.n){if(o.ret){o.hx=hx;o.hy=hy}else fin=true;break}}}
  if(fin&&o.end)try{o.end()}catch(e){}
  return fin}
/* ---------- กลไกสกิลทางเลือก (k = ช่อง · P = พลังรวม · r = รูนที่ใส่) ---------- */
const Q8F={
 mw(k,P,cost,r){const {a}=q8Aim(320);q8Use(k,cost);const x0=me.x,y0=me.y;
   const W=(da,mul,L,T,w,big)=>{const aa=a+da;fx({k:'q8wave',x:Math.round(x0),y:Math.round(y0),a:Math.round(aa*1000)/1000,len:L,r:w+10,dur:T,u:big?'b':''});
     q8Shot({x0,y0,a:aa,L,T,w,n:0,on:m=>q8Hit(m,pd()*mul*P,'melee',1,k)})};
   if(r==='a')[-.32,0,.32].forEach(da=>W(da,1,230,.4,28));else if(r==='b')W(0,2.6,200,.55,52,1);else W(0,2.2,260,.42,32);return true},
 mb(k,P,cost,r){const {a}=q8Aim(300);q8Use(k,cost);const x0=me.x,y0=me.y,L=r==='a'?200:230,tO=.36,hv=r==='a'?1:0,tB=.36,mul=r==='a'?1.3:r==='b'?1.4:1.5;
   fx({k:'q8boom',x:Math.round(x0),y:Math.round(y0),a:Math.round(a*1000)/1000,len:L,r:16,dur:tO+hv+tB,sx:tO,sy:hv,u:r==='a'?'h':''});
   q8Shot({x0,y0,a,L,T:tO+hv+tB,w:30,n:0,boom:{tO,hv,tB},on:(m,ph)=>{q8Hit(m,pd()*mul*P,'melee',1,k);if(r==='b'&&ph===2)q8Pull(m,me.x,me.y,26)},
     hov:r==='a'?{iv:.25,r:46,f:m=>q8Hit(m,pd()*.45*P,'melee',3,k)}:null});return true},
 af(k,P,cost,r){const {a}=q8Aim(300);q8Use(k,cost);const x0=me.x,y0=me.y,n=r==='a'?7:5,sp=r==='a'?1.4:.87,L=240,T=.27,mul=r?1:1.4,ex=r==='b';
   const F=q8Fx({k:'q8fan',x:Math.round(x0),y:Math.round(y0),a:Math.round(a*1000)/1000,len:L,r:10,dur:T,sx:sp,u:n+(ex?'x':'')});F.st=[];
   for(let i=0;i<n;i++){const an=a+(i/(n-1)-.5)*sp;q8Shot({x0,y0,a:an,L,T,w:12,n:1,on:(m,ph,dd)=>{F.st[i]=dd;q8Hit(m,pd()*mul*P,'archer',1,k);
       if(ex){const X=Math.round(m.x),Y=Math.round(m.y);fx({k:'q8pop',x:X,y:Y,r:40});mons.forEach(o=>{if(o!==m&&o.hp>0&&Math.hypot(o.x-X,o.y-Y)<40+q8R(o))q8Hit(o,pd()*.6*P,'archer',3,k)})}}})}return true},
 ag(k,P,cost,r){const t=pickTarget(300);let x,y;if(t){x=t.x;y=t.y;me.face=Math.atan2(t.y-me.y,t.x-me.x)}else{x=me.x+Math.cos(me.face)*90;y=me.y+Math.sin(me.face)*90}
   q8Use(k,cost);const X=Math.round(cl(x,12,WW-12)),Y=Math.round(cl(y,12,WH-12)),R=120;Q8LK=k;try{fx({k:'q8flag',x:X,y:Y,r:R,dur:7,u:r||'',v:Math.round(pd()*.7*P)})}finally{Q8LK=-1}
   pend.push({t:.22,f:()=>{mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-X,m.y-Y)<R+q8R(m))q8Hit(m,pd()*1.2*P,'archer',1,k)})}});return true},
 gl(k,P,cost,r){const {t,a}=q8Aim(340);q8Use(k,cost);const x0=me.x,y0=me.y,sp=1100;
   const one=(aa,mul,L,frz,end)=>{const T=L/sp;let far=null,fd=-1;fx({k:'q8lance',x:Math.round(x0),y:Math.round(y0),a:Math.round(aa*1000)/1000,len:Math.round(L),r:10,dur:T/.85});
     q8Shot({x0,y0,a:aa,L,T,w:20,n:0,on:(m,ph,dd)=>{q8Hit(m,pd()*mul*P,'frost',1,k);if(dd>fd){fd=dd;far=m}},end:()=>{if(frz&&far&&far.hp>0)try{rxCC(far,'f',0,1.2)}catch(e){}if(end)end()}})};
   if(r==='a'){one(a-.12,1.7,340,1);one(a+.12,1.7,340,1)}
   else if(r==='b'){const L=t?Math.min(340,Math.hypot(t.x-x0,t.y-y0)+6):340,X=Math.round(x0+Math.cos(a)*L),Y=Math.round(y0+Math.sin(a)*L);
     one(a,2,L,0,()=>{fx({k:'q8pop',x:X,y:Y,r:85,u:'i'});fx({k:'frost',x:X,y:Y,r:85,dur:2.5});mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-X,m.y-Y)<85+q8R(m))q8Hit(m,pd()*2*P,'frost',1,k)})})}
   else one(a,2.6,340,1);return true},
 gb(k,P,cost,r){const n=performance.now(),jm=joy&&Math.hypot(joy.dx,joy.dy)>6;
   if(n-(me.manT||0)>700&&!jm&&!nearestMon(110)&&!(me.q8bk>0))return false;/* ออโต้: วาร์ปเฉพาะตอนมอนประชิด */
   let a;if(jm)a=Math.atan2(joy.dy,joy.dx);else{const m=nearestMon(220);a=m?Math.atan2(me.y-m.y,me.x-m.x):me.face}
   if(r==='a'&&me.q8bk>0){me.q8bk=0;me.sk[k]=cdOf(k);try{skSfx(k)}catch(e){}}else{q8Use(k,cost);if(r==='a'){me.q8bk=1.5;me.q8bkK=k;me.sk[k]=.35}}
   const ox=me.x,oy=me.y,L=170,nx=cl(ox+Math.cos(a)*L,12,WW-12),ny=cl(oy+Math.sin(a)*L,12,WH-12),mul=r==='a'?1.1:1.5;
   const bst=(x,y,m2)=>mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-x,m.y-y)<75+q8R(m))q8Hit(m,pd()*m2*P,'mage',1,k)});
   bst(ox,oy,r==='b'?2:mul);if(r==='b')fx({k:'frost',x:Math.round(ox),y:Math.round(oy),r:90,dur:3});
   me.x=nx;me.y=ny;me.face=a;me.inv3=Math.max(me.inv3||0,.25);fx({k:'q8blink',x:Math.round(nx),y:Math.round(ny),sx:Math.round(ox),sy:Math.round(oy),r:62});
   if(r!=='b')bst(nx,ny,mul);return true},
 nf(k,P,cost,r){const {a}=q8Aim(280);q8Use(k,cost);const x0=me.x,y0=me.y;
   if(r==='b'){const L=300,T=.42;fx({k:'q8shur',x:Math.round(x0),y:Math.round(y0),a:Math.round(a*1000)/1000,len:L,r:16,dur:T,u:'g'});
     q8Shot({x0,y0,a,L,T,w:24,n:0,on:m=>{q8Hit(m,pd()*2.6*P,'assn',1,k);q8Psn(m,P,k)}});return true}
   const n=3,sp=.44,L=260,ret=r==='a',T=.34,F=q8Fx({k:'q8shur',x:Math.round(x0),y:Math.round(y0),a:Math.round(a*1000)/1000,len:L,r:10,dur:ret?T*2:T,sx:sp,u:'3'+(ret?'r':'')});F.st=[];
   for(let i=0;i<n;i++){const an=a+(i/(n-1)-.5)*sp;q8Shot({x0,y0,a:an,L,T,w:14,n:1,ret:ret?1:0,on:(m,ph,dd)=>{if(ph!==2){F.st[i]=dd;q8Hit(m,pd()*1.15*P,'assn',1,k);q8Psn(m,P,k)}else q8Hit(m,pd()*.75*P,'assn',1,k)}})}return true},
 nh(k,P,cost,r){const {a}=q8Aim(260);q8Use(k,cost);const x0=me.x,y0=me.y,L=250,ex=x0+Math.cos(a)*L,ey=y0+Math.sin(a)*L,H=[];
   mons.forEach(m=>{if(!(m.hp>0))return;const q=q8SegD(m.x,m.y,x0,y0,ex,ey);if(q[0]<18+q8R(m))H.push([q[1],m])});H.sort((p,q)=>p[0]-q[0]);
   const T=H.slice(0,r==='a'?3:1).map(h=>h[1]),f0=T[0],hx=Math.round(f0?f0.x:ex),hy=Math.round(f0?f0.y:ey),X0=Math.round(x0),Y0=Math.round(y0);
   if(r==='b'&&f0){fx({k:'q8hook',x:X0,y:Y0,sx:hx,sy:hy,u:'s',dur:.5});
     pend.push({t:.16,f:()=>{if(me.down>0||!(f0.hp>0))return;const aa=Math.atan2(f0.y-me.y,f0.x-me.x),dd=Math.max(0,Math.hypot(f0.x-me.x,f0.y-me.y)-24);
       me.x=cl(me.x+Math.cos(aa)*dd,12,WW-12);me.y=cl(me.y+Math.sin(aa)*dd,12,WH-12);me.face=aa;fx({k:'shadow',x:Math.round(f0.x),y:Math.round(f0.y),r:40,len:1});q8Hit(f0,pd()*3*P,'assn',1,k);me.stealth=Math.max(me.stealth||0,1.5)}});return true}
   fx({k:'q8hook',x:X0,y:Y0,sx:hx,sy:hy,u:f0?'p':'m',dur:.55});if(!f0)return true;
   pend.push({t:.17,f:()=>{T.forEach((m,i)=>{if(!(m.hp>0))return;q8Hit(m,pd()*(r==='a'?1.6:2.5)*P,'assn',1,k);
     if(m.t<3&&!m.pv&&!m.dum){fx({k:'stun',x:Math.round(m.x),y:Math.round(m.y),r:6,full:1,dur:.8});q8Pull(m,me.x,me.y,26+i*16)}})}});return true},
 sb(k,P,cost,r){q8Use(k,cost);let solo=1;try{solo=supSolo()?1.4:1}catch(e){}const pc=(r==='a'?.11:r==='b'?.1:.14)*P*solo;
   fx({k:'q8bar',r:170,pc:Math.round(pc*1000)/1000,v:Math.round(40*P),u:r||''});return true},
 sh(k,P,cost,r){const t=pickTarget(280);let x,y;if(t){x=t.x;y=t.y;me.face=Math.atan2(t.y-me.y,t.x-me.x)}else{x=me.x+Math.cos(me.face)*110;y=me.y+Math.sin(me.face)*110}
   q8Use(k,cost);const slam=(X,Y,R,mul,st,u,dl)=>{const go=()=>{fx({k:'q8ham',x:X,y:Y,r:R,u,dur:1});pend.push({t:.34,f:()=>{if(st>0)fx({k:'stun',x:X,y:Y,r:R,full:1,dur:st});
       mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-X,m.y-Y)<R+q8R(m))q8Hit(m,pd()*mul*P,'holy',1,k)});try{if(Math.hypot(me.x-X,me.y-Y)<420)shk=Math.max(shk,.16)}catch(e){}
       if(u==='b')fx({k:'sanct',x:X,y:Y,r:110,dur:3,v:Math.round(pd()*.6*P)})}})};if(dl>0)pend.push({t:dl,f:go});else go()};
   const X=Math.round(cl(x,12,WW-12)),Y=Math.round(cl(y,12,WH-12));
   if(r==='a'){const L=[t].filter(Boolean).concat(mons.filter(m=>m!==t&&m.hp>0&&!m.pv&&Math.hypot(m.x-X,m.y-Y)<220).sort((p,q)=>Math.hypot(p.x-X,p.y-Y)-Math.hypot(q.x-X,q.y-Y)).slice(0,t?2:3));
     if(!L.length)slam(X,Y,60,1.5,.6,'s',0);else L.forEach((m,i)=>slam(Math.round(m.x),Math.round(m.y),60,1.5,.6,'s',i*.16))}
   else if(r==='b')slam(X,Y,120,2.6,1,'b',0);else slam(X,Y,80,3,1,'',0);return true}};
function q8Def(c,k){const C=Q8D[c];return C&&C[k]||null}
function q8Cast(k,free){if(!run||me.down>0||me.sk[k]>0)return;if(k===4&&!me.cls2&&!(me.rb>0))return;const D=q8Def(me.cls,k);if(!D||!Q8F[D.id])return;
  let P=1+M('s'+k+'p')+skPow(k);const cost=free?0:mcOf(k);if(me.mp<cost){dn.push({x:me.x,y:me.y-40,v:'MP ไม่พอ',t:.8});return}
  const r=rnOf(k);if(r)P*=rnPow(k);if(k===2)P*=q8UT();try{Q8F[D.id](k,P,cost,r)}catch(e){console.warn('q8',e)}}
/* ห่อก่อนระบบรูนเสริม (ux15 ติดตั้งที่ 300ms) → ลิงก์/ร่ายซ้ำ/ทอเท็มใช้กับสกิลทางเลือกได้ */
try{useSkill0=(f=>function(k,free){if(Q8K.indexOf(k)>=0&&q8On(k))return q8Cast(k,free);return f.apply(this,arguments)})(useSkill0)}catch(e){}
/* ---------- สลับข้อมูลของช่อง (แบบเดียวกับ applyBr ของสกิล 4) ---------- */
/* ปุ่ม 3 ใช้ข้อมูลจาก SK3 · ปุ่ม 4 จาก SK4/SK4B (สายแสง/ทมิฬ) ไอคอน SKI4B เสียง s4/s4b · รูนปุ่ม 4 เป็น getter ตามสาย → ครอบ getter อีกชั้น */
function q8Snap(){if(Q8O)return;Q8O={};for(const c in Q8D){Q8O[c]={};for(const k of Q8K){if(!Q8D[c][k])continue;const sp={};[k,k+'a',k+'b'].concat(k===4?['4B','4Ba','4Bb']:k===2?['2B','2Ba','2Bb']:[]).forEach(q=>{sp[q]=SKP[c]?SKP[c][q]:undefined});
  const O=Q8O[c][k]={s:CL[c].s[k],cd:CL[c].cds[k],mc:CL[c].mc[k],d:k<2?(SK12D[c]||[])[k]:k===3?SK3[c][1]:k===2?ULT[c][1]:SK4[c][1],ic:SKI[c][k],tg:(SGT[c]||{})[k],ru:k===4?null:RUNES[c]&&RUNES[c][k],sp,sf:SKS[c]&&SKS[c][k]};
  if(k===3)O.sk3=SK3[c].slice(0,4);
  if(k===2){const cp=a=>a?a.slice(0,4):null;O.u0=cp(ULT[c]);O.u2=cp(ULT2[c]);O.ub=cp(ULT2B[c]);try{O.u3=ULT3[c]?ULT3[c].map(cp):null}catch(e){O.u3=null}
    try{O.i2=SKI2[c];O.i2b=SKI2B[c];O.i3=SKI3U[c]?SKI3U[c].slice():null}catch(e){}O.su={};['u','u2','ub'].forEach(q=>{O.su[q]=SKS[c]?SKS[c][q]:undefined})}
  if(k===4){O.sk4=SK4[c].slice(0,4);O.sk4b=SK4B[c]?SK4B[c].slice(0,4):null;O.ic4b=SKI4B[c];O.sf4=SKS[c]&&SKS[c].s4;O.sf4b=SKS[c]&&SKS[c].s4b;
    try{const d=Object.getOwnPropertyDescriptor(RUNES[c],4);if(d&&d.get)Object.defineProperty(RUNES[c],4,{configurable:true,enumerable:true,get(){if(Q8RU4[c])return Q8RU4[c];return d.get.call(this)},set(v){if(d.set)d.set.call(this,v)}});
      else{const v0=RUNES[c][4];Object.defineProperty(RUNES[c],4,{configurable:true,enumerable:true,get(){return Q8RU4[c]||v0},set(v){}})}}catch(e){console.warn('q8 ru4',e)}}}}}
function q8AltData(c,k){const D=q8Def(c,k),sp={};sp[k]=D.po[0];sp[k+'a']=D.po.a;sp[k+'b']=D.po.b;if(k===4){sp['4B']=undefined;sp['4Ba']=undefined;sp['4Bb']=undefined}if(k===2){sp['2B']=undefined;sp['2Ba']=undefined;sp['2Bb']=undefined}
  const X={s:D.n,cd:D.cd,mc:D.mc,d:D.d,ic:Q8IMG[D.id],tg:D.tg,ru:{a:D.R.a,b:D.R.b},sp,sf:Q8SFX[D.id]};const A=[D.n,D.d,D.cd,D.mc];
  if(k===3)X.sk3=A;if(k===2){X.u0=A;X.u2=A;X.ub=A;X.u3=[A,A];X.i2=X.ic;X.i2b=X.ic;X.i3=[X.ic,X.ic];X.su={u:X.sf,u2:X.sf,ub:X.sf}}if(k===4){X.sk4=A;X.sk4b=A;X.ic4b=Q8IMG[D.id];X.sf4=Q8SFX[D.id];X.sf4b=Q8SFX[D.id];X.alt=1}return X}
function q8Set(c,k,X){if(!X||!CL[c])return;CL[c].s[k]=X.s;CL[c].cds[k]=X.cd;CL[c].mc[k]=X.mc;try{if(k<2&&SK12D[c])SK12D[c][k]=X.d}catch(e){}try{SKI[c][k]=X.ic}catch(e){}
  try{if(SGT[c])SGT[c][k]=X.tg}catch(e){}try{if(k!==4&&RUNES[c]&&X.ru)RUNES[c][k]=X.ru}catch(e){}try{if(SKP[c])for(const q in X.sp){if(X.sp[q]===undefined)delete SKP[c][q];else SKP[c][q]=X.sp[q]}}catch(e){}
  try{if(SKS[c]&&k!==4&&k!==2){if(X.sf)SKS[c][k]=X.sf;else delete SKS[c][k]}}catch(e){}
  if(k===2){const put=(T,v)=>{if(T&&v)for(let i=0;i<4;i++)T[i]=v[i]};try{put(ULT[c],X.u0);put(ULT2[c],X.u2);put(ULT2B[c],X.ub);if(ULT3[c]&&X.u3)ULT3[c].forEach((T,i)=>put(T,X.u3[i]))}catch(e){}
    try{if(X.i2)SKI2[c]=X.i2;if(X.i2b&&SKI2B[c])SKI2B[c]=X.i2b;if(X.i3&&SKI3U[c])X.i3.forEach((v,i)=>{SKI3U[c][i]=v})}catch(e){}
    try{if(SKS[c]&&X.su)for(const q in X.su){if(X.su[q])SKS[c][q]=X.su[q];else delete SKS[c][q]}}catch(e){}}
  if(k===3&&X.sk3)try{for(let i=0;i<4;i++)SK3[c][i]=X.sk3[i]}catch(e){}
  if(k===4){try{for(let i=0;i<4;i++)SK4[c][i]=X.sk4[i];if(SK4B[c]&&X.sk4b)for(let i=0;i<4;i++)SK4B[c][i]=X.sk4b[i]}catch(e){}try{if(X.ic4b)SKI4B[c]=X.ic4b}catch(e){}
    try{if(SKS[c]){if(X.sf4)SKS[c].s4=X.sf4;else delete SKS[c].s4;if(X.sf4b)SKS[c].s4b=X.sf4b;else delete SKS[c].s4b}}catch(e){}Q8RU4[c]=X.alt?X.ru:null;
    try{if(c===me.cls)applyBr()}catch(e){}}}
function q8Apply(force){if(!Q8O)return;const sig=run&&me.cls&&Q8D[me.cls]?me.cls+':'+Q8K.map(k=>q8On(k)?1:0).join(''):'-';if(sig===Q8A.sig&&!force)return;Q8A.sig=sig;
  for(const c in Q8O)for(const k of Q8K)if(Q8O[c][k])q8Set(c,k,Q8O[c][k]);
  if(sig!=='-')for(const k of Q8K)if(q8On(k)&&q8Def(me.cls,k))q8Set(me.cls,k,q8AltData(me.cls,k))}
/* เลือกสกิลลงช่อง k (alt=1 สกิลทางเลือก) · จำรูนหลักที่ใส่แยกตามสกิล */
function q8Swap(k,alt){if(!me.cls||!Q8D[me.cls]||!q8Def(me.cls,k))return'';if(alt&&!q8Unl(k))return'🔒 '+q8LkTx(k);const P=sp8(),cur=q8On(k)?1:0;if(cur===(alt?1:0))return'';
  try{if(isArena&&isArena())return'⚔️ สลับสกิลในลานประลองไม่ได้'}catch(e){}
  const S=rnSt();P.r[k+(cur?'x':'o')]=S.e[k]||'';if(alt)P.e[k]=1;else delete P.e[k];const nr=P.r[k+(alt?'x':'o')];if(nr)S.e[k]=nr;else delete S.e[k];
  q8Apply(true);me.sk[k]=Math.max(me.sk[k]||0,cdOf(k));try{sfx('equip')}catch(e){}return'📚 ใช้ «'+(k===2?ultOf()[0]:CL[me.cls].s[k])+'» ที่'+q8KN(k)+' แล้ว (ติดคูลดาวน์ '+Math.round(cdOf(k))+' วิ)'}
/* ---------- เซฟ ---------- */
try{snap=(f=>function(){const o=f.apply(this,arguments);try{if(me.sp8)o.sp8=q8Clean(me.sp8)}catch(e){}return o})(snap)}catch(e){}
try{cleanChar=(f=>function(c){const o=f.apply(this,arguments);try{if(o&&c&&c.sp8)o.sp8=q8Clean(c.sp8)}catch(e){}return o})(cleanChar)}catch(e){}
try{applySave=(f=>function(c){const r=f.apply(this,arguments);try{me.sp8=q8Clean(c&&c.sp8)||{e:{},r:{},n:{}};Q8A.sig='?'}catch(e){}return r})(applySave)}catch(e){}
/* ---------- ทุกเฟรม ---------- */
function q8Tick(dt){const n=performance.now();
  for(let i=Q8P.length-1;i>=0;i--){const o=Q8P[i];o.t+=dt;let f=true;try{f=q8Step(o,dt)}catch(e){}if(f)Q8P.splice(i,1)}
  for(let i=Q8Z.length-1;i>=0;i--){const z=Q8Z[i];z.t-=dt;if(z.t<=0){Q8Z.splice(i,1);continue}
    if(z.u==='b'&&me.cls&&me.down<=0&&Math.hypot(me.x-z.x,me.y-z.y)<z.r)me.rasT=Math.max(me.rasT||0,.6);
    if(z.u==='a'&&z.by===uid){z.tk-=dt;if(z.tk<=0){z.tk=1;const T=mons.filter(m=>m.hp>0&&!m.pv&&Math.hypot(m.x-z.x,m.y-z.y)<z.r+q8R(m));if(T.length){const m=T[Math.random()*T.length|0];fx({k:'zap',x:Math.round(m.x),y:Math.round(m.y),r:34});q8Hit(m,z.v,'bolt',3,z.k)}}}}
  if(me.q8bk>0){me.q8bk-=dt;if(me.q8bk<=0){me.q8bk=0;const k=me.q8bkK|0;me.sk[k]=Math.max(me.sk[k]||0,cdOf(k)-1.5)}}
  if(me.q8rg>n&&me.shv>0&&me.cls&&me.down<=0)me.hp=Math.min(me.mh,me.hp+me.mh*.025*dt)}
/* ภาพ/ผลที่ทุกเครื่องต้องรู้ (ธง · โล่ · ดาบที่ขว้างออกไป) */
function q8Recv(o){if(!o||typeof o.k!=='string'||o.k.slice(0,2)!=='q8')return;const n=performance.now();
  if(o.k==='q8flag'){if(Q8Z.length>=12)Q8Z.shift();Q8Z.push({x:+o.x||0,y:+o.y||0,r:Math.min(200,+o.r||120),t:Math.min(12,+o.dur||7),by:o.by,u:o.u==='a'||o.u==='b'?o.u:'',v:Math.min(1e7,+o.v||0),tk:1,k:o.by===uid?Q8LK:-1})}
  else if(o.k==='q8bar'){if(me.cls&&me.down<=0&&Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0))<Math.min(260,+o.r||170)){const v=Math.round(Math.min(.5,+o.pc||0)*me.mh+Math.min(5000,+o.v||0));
      me.shv=Math.max(me.shv||0,v);me.shield=Math.max(me.shield||0,6);if(o.u==='a')me.q8th=n+6000;if(o.u==='b')me.q8rg=n+6000;dn.push({x:me.x,y:me.y-52,v:'🛡️ +'+v,t:1,col:'#ffe08a'})}}
  else if(o.k==='q8boom'&&typeof o.by==='string')Q8HW[o.by]=n+Math.min(3,+o.dur||1)*1000}
/* ---------- หน้าคลังสกิล ---------- */
(function(){const st=document.createElement('style');st.id='q8css';st.textContent=
 '.q8p{display:flex;flex-direction:column;gap:8px;text-align:left}.q8i{font-size:11.5px;line-height:1.5;opacity:.85;padding:2px 2px 0}'+
 '.q8s{background:rgba(255,255,255,.04);border:1px solid rgba(255,230,180,.14);border-radius:12px;padding:8px}.q8h{font-size:12px;font-weight:bold;color:#ffe0a0;margin:0 2px 6px}'+
 '.q8r{display:grid;grid-template-columns:1fr 1fr;gap:6px}.q8c{display:flex;flex-direction:column;gap:4px;padding:8px;border-radius:10px;background:rgba(20,14,26,.55);border:1.5px solid rgba(255,255,255,.08)}'+
 '.q8c.on{border-color:#ffd66a;background:rgba(255,214,106,.1);box-shadow:0 0 0 1px rgba(255,214,106,.25) inset}.q8c.lk{opacity:.6}'+
 '.q8n{display:flex;align-items:center;gap:7px}.q8n img{width:36px;height:36px;flex:none;background:#2a1a14;border-radius:9px;padding:2px;border:1px solid #6a4a2a}.q8n b{font-size:13px;line-height:1.25}'+
 '.q8c small{font-size:11px;line-height:1.45;opacity:.92}.q8m{font-size:10.5px;opacity:.75}.q8rn{font-size:10.5px;color:#d8c0ff;line-height:1.4}'+
 '.q8c button{margin-top:auto;font-size:12px;padding:6px 8px;border-radius:8px}.q8c .q8ok{margin-top:auto;text-align:center;color:#ffd66a;font-weight:bold;font-size:12px;padding:5px}'+
 '.q8c .q8lk{margin-top:auto;text-align:center;font-size:11.5px;opacity:.85;padding:5px}.q8new{display:inline-block;margin-left:4px;padding:0 5px;border-radius:6px;background:#ff5a5a;color:#fff;font-size:9.5px;vertical-align:1px}'+
 '.sk2tab:has([data-sksub="pool"]){grid-template-columns:repeat(3,minmax(0,1fr))}.sk2tab:has([data-sksub="pool"]) button{font-size:13px;padding-left:4px;padding-right:4px;white-space:nowrap}'+
 '@media (max-width:380px){.q8r{grid-template-columns:1fr}.sk2tab:has([data-sksub="pool"]) button{font-size:12px}}';(document.head||document.documentElement).appendChild(st)})();
function q8Orig(c,k){const O=Q8O&&Q8O[c]&&Q8O[c][k];if(!O)return null;
  if(k===2){let u=O.u0,ic=O.ic;try{if(typeof u3Open==='function'&&u3Open()&&O.u3){const b=s6B();u=O.u3[b]||u;ic=O.i3&&O.i3[b]||ic}else if(me.cls2){if(BR2()&&O.ub){u=O.ub;ic=O.i2b||ic}else if(O.u2){u=O.u2;ic=O.i2||ic}}}catch(e){}return Object.assign({},O,{s:u[0],d:u[1],cd:u[2],mc:u[3],ic})}
  if(k!==4)return O;let b=false;try{b=BR2()}catch(e){}if(!b||!O.sk4b)return Object.assign({},O,{ru:R26A&&R26A[c]||O.ru});
  let ru=null;try{ru=RUNESB[c]||null}catch(e){}return Object.assign({},O,{s:O.sk4b[0],d:O.sk4b[1],cd:O.sk4b[2],mc:O.sk4b[3],ic:O.ic4b||O.ic,ru,tg:O.tg+(c==='assn'?' move':'')})}
function q8Card(k,alt){const c=me.cls,X=alt?q8AltData(c,k):q8Orig(c,k),D=q8Def(c,k);if(!X||!D)return'';const on=(q8On(k)?1:0)===(alt?1:0),lk=alt&&!q8Unl(k);
  const tags=String(X.tg||'').split(' ').filter(Boolean).map(t=>(typeof SGTN!=='undefined'&&SGTN[t])||t).join(' · ');
  const ru=X.ru?['a','b'].map(e=>X.ru[e]?X.ru[e][1]+' '+X.ru[e][2]:'').filter(Boolean).join(' · '):'';
  const isNew=alt&&!lk&&!(me.sp8&&me.sp8.r&&me.sp8.r['t'+k]);
  return'<div class="q8c'+(on?' on':'')+(lk?' lk':'')+'"><div class="q8n"><img src="'+X.ic+'" alt=""><b>'+X.s+(alt?' <span style="font-size:10px;color:#c8a0ff">ทางเลือก</span>':'')+(isNew?'<span class="q8new">ใหม่</span>':'')+'</b></div><small>'+X.d+'</small>'+
    '<div class="q8m">⏱ '+X.cd+' วิ · 💧 '+X.mc+(tags?' · '+tags:'')+'</div>'+(ru?'<div class="q8rn">รูนหลัก: '+ru+'</div>':'')+
    (on?'<div class="q8ok">✓ ใช้อยู่</div>':lk?'<div class="q8lk">🔒 '+q8LkTx(k)+'</div>':'<button class="pri" data-q8="'+k+':'+(alt?1:0)+'">ใช้สกิลนี้</button>')+'</div>'}
function q8PoolH(msg){if(!me.cls||!Q8D[me.cls])return'';let h='<div class="q8p">'+(msg?'<div class="note">'+msg+'</div>':'')+
  '<div class="q8i">📚 ปุ่มสกิล 1–4 และอัลติ เลือกได้ว่าจะใช้สกิลไหน · สลับได้ทุกที่ (ช่องที่สลับติดคูลดาวน์ของสกิลใหม่) · สกิลทางเลือกมีรูนหลัก A/B ของตัวเอง สร้างที่ช่างรูนไอริสตอนเลือกใช้สกิลนั้นอยู่ · แต้มผังสกิลที่เพิ่มพลัง/ลดคูลดาวน์ปุ่มเดียวกันใช้กับสกิลทางเลือกด้วย · ปุ่ม 4 ทางเลือกใช้แทนสกิล 4 ได้ทั้งสายแสงและสายทมิฬ</div>';
  for(const k of Q8K){if(!q8Def(me.cls,k))continue;h+='<div class="q8s"><div class="q8h">'+q8KN(k)+(k===2?' <small style="opacity:.7">(ปุ่มใหญ่)</small>':k===3?' <small style="opacity:.7">(ปุ่มสีฟ้า)</small>':k===4?' <small style="opacity:.7">(ปุ่มสีม่วงทอง)</small>':'')+'</div><div class="q8r">'+q8Card(k,0)+q8Card(k,1)+'</div></div>'}return h+'</div>'}
function q8Seen(){try{const P=sp8();for(const k of Q8K)if(q8Unl(k)&&q8Def(me.cls,k))P.r['t'+k]=1}catch(e){}}
function q8Open(){try{charTab='tr';skSub='pool';treeUI();ov.hidden=false}catch(e){}}
/* ---------- ติดตั้ง (หลังโมดูลอื่นห่อเสร็จ) ---------- */
setTimeout(()=>{
  try{q8Snap()}catch(e){console.warn('q8 snap',e)}
  try{handleFx=(f=>function(o){const r=f.apply(this,arguments);try{q8Recv(o)}catch(e){}return r})(handleFx)}catch(e){}
  try{const _ah=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){try{if(Q8Z.length&&m&&!m.pv&&d>0&&q8InZ(m))d*=1.2}catch(e){}return _ah.call(this,m,d,cr,lv,ck)}}catch(e){}
  try{sgTags=(f=>function(k){try{if(Q8K.indexOf(k)>=0&&q8On(k)){const D=q8Def(me.cls,k);if(D)return D.tg.split(' ')}}catch(e){}return f.apply(this,arguments)})(sgTags)}catch(e){}
  try{rnTick=(f=>function(dt){const r=f.apply(this,arguments);try{q8Tick(dt)}catch(e){}return r})(rnTick)}catch(e){}
  try{const _hu=hurt;window.hurt=hurt=function(d){const sh=me.shv>0,n=performance.now(),h0=me.hp;const r=_hu.apply(this,arguments);
      try{if(sh&&me.q8th>n&&d>0&&n-(me.q8thT||0)>350&&me.cls&&me.down<=0){me.q8thT=n;let c=0;mons.forEach(m=>{if(m.hp>0&&!m.pv&&c<6&&Math.hypot(m.x-me.x,m.y-me.y)<95+q8R(m)){c++;addHit(m,pd()*1,0,3,'holy')}});if(c)fx({k:'q8pop',r:50,u:'h'})}}catch(e){}return r}}catch(e){}
  try{drawP=(f=>function(x,y,cls,name,hp,mh,down,hd,bt,ph,fx2,tt,c2,lk){const p=Q8DK;Q8DK=lk&&lk.u||null;try{return f.apply(this,arguments)}finally{Q8DK=p}})(drawP)}catch(e){}
  try{drawWeapon=(f=>function(cls,c,ay,t,skin){const k=Q8DK;if(k&&cls==='melee'&&Q8HW[k]>performance.now()){try{const H=R24HX.melee||[7,0];r24Hand(H[0],ay+H[1]+1,skin)}catch(e){}return}return f.apply(this,arguments)})(drawWeapon)}catch(e){}
  /* หน้าสกิล: แท็บที่ 3 «📚 คลังสกิล» */
  try{skTabH=(f=>function(){const tab='<button data-sksub="pool" class="'+(skSub==='pool'?'on':'')+'">📚 คลังสกิล'+(me.cls&&Q8D[me.cls]&&Q8K.some(k=>q8Def(me.cls,k)&&q8Unl(k)&&!(me.sp8&&me.sp8.r&&me.sp8.r['t'+k]))?' <i class="dt"></i>':'')+'</button>';
      const inj=h=>h.replace(/(<div class="sk2tab">[\s\S]*?)(<\/div>)/,'$1'+tab+'$2');
      if(skSub!=='pool')return inj(f.apply(this,arguments));skSub='act';let h='';try{h=f.apply(this,arguments)}finally{skSub='pool'}
      const i=h.indexOf('<div class="sk2al">');if(i>=0)h=h.slice(0,i);h=inj(h).replace('data-sksub="act" class="on"','data-sksub="act" class=""');const out=h+q8PoolH(Q8A.msg);Q8A.msg='';q8Seen();return out})(skTabH)}catch(e){}
  /* ช่างรูน: การ์ดสลับสกิลด้านบน (สร้างรูนของสกิลทางเลือกได้เมื่อเลือกใช้อยู่) */
  try{runeUI=(f=>function(msg){const r=f.apply(this,arguments);try{if(me.cls&&Q8D[me.cls]&&ov&&ov.dataset.k==='rune'){const pn=ov.querySelector('[data-pn="rune"]');if(pn){const d=document.createElement('div');d.className='card';d.style.cssText='text-align:left;padding:9px 10px';
        d.innerHTML='<b style="font-size:13px">📚 คลังสกิล</b> <small style="opacity:.8">รูนด้านล่างเปลี่ยนตามสกิลที่เลือกใช้อยู่ในแต่ละปุ่ม</small>'+Q8K.filter(k=>q8Def(me.cls,k)).map(k=>{const o=q8Orig(me.cls,k),a=q8Def(me.cls,k),on=q8On(k),u=q8Unl(k);
          return'<div style="display:flex;align-items:center;gap:6px;margin-top:6px;font-size:12px"><b style="white-space:nowrap">'+q8KN(k,1)+'</b><button data-q8="'+k+':0" style="flex:1;font-size:11.5px;padding:5px 6px'+(on?'':';border-color:#ffd66a;background:rgba(255,214,106,.18)')+'">'+(on?'':'✓ ')+o.s+'</button><button data-q8="'+k+':1"'+(u?'':' disabled')+' style="flex:1;font-size:11.5px;padding:5px 6px'+(on?';border-color:#ffd66a;background:rgba(255,214,106,.18)':'')+'">'+(on?'✓ ':'')+(u?a.n:'🔒 '+(k===4?'ตื่นพลัง':'Lv '+Q8LV[k]))+'</button></div>'}).join('');
        const ph=pn.querySelector('.ph');if(ph&&ph.nextSibling)pn.insertBefore(d,ph.nextSibling);else pn.prepend(d)}}}catch(e){}return r})(runeUI)}catch(e){}
  document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('[data-q8]');if(!b||!me.cls)return;e.stopPropagation();e.preventDefault();
    const [k,a]=b.dataset.q8.split(':').map(Number),m=q8Swap(k,!!a);try{if(ov.dataset.k==='rune')runeUI(m||undefined);else{Q8A.msg=m;treeUI()}}catch(x){}},true);
  setInterval(()=>{try{q8Apply();if(run&&me.cls&&Q8D[me.cls]){const P=sp8(),L=[];for(const k of Q8K)if(q8Def(me.cls,k)&&q8Unl(k)&&!P.n[k]){P.n[k]=1;L.push(q8Def(me.cls,k).n)}
      if(L.length)banner={s:'📚 ปลดสกิลทางเลือก «'+L.join('» «')+'» · เลือกใช้ที่ เมนู → ตัวละคร → สกิล → 📚 คลังสกิล',t:6}}}catch(e){}},1000);
},1700);
