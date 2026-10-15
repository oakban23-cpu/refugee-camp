/* ---------- v398 รูนหลักช่อง 4 ของสายทมิฬ (นักฆ่า · ซัพพอร์ต · เวท) ----------
   เดิม: รูนช่อง 4 ออกแบบให้สกิลสายแสง พอเป็นสายทมิฬ (v396) รูนช่องนี้ไม่มีผล
   ใหม่ (v399 ครบ 5 อาชีพ): RUNES[cls][4] เปลี่ยนตามสาย (getter) → หน้าช่างรูน/การสร้าง/อัปเกรด/ใส่/ดรอป ใช้ชุดของสายที่เป็นอยู่เองทั้งหมด
   ผลของรูนอยู่ใน rnUse4B (แทนสกิลทั้งท่า เหมือนรูนสายแสง) · ค่าในวงเล็บคือขั้น I (ขั้น II/III พลัง +15%/+30%)
   แถม: แก้ช่องโหว่รูน «สองจังหวะ» ของนักรบ — ถ้าไม่พุ่งครั้งที่ 2 ภายในเวลา เดิมคูลดาวน์เหลือ 0.3 วิ (พุ่งได้ทุก ~1.3 วิ) */
const RUNESB={
 melee:{a:['w4a','🔨','ทุบสนั่น','ทุบโล่รอบตัว 360° (วงกว้างขึ้น) มอนมึน 2 วิ แต่ดาเมจ 75%'],
        b:['w4b','💢','แค้นระเบิด','แค้นแต่ละชั้นแรงขึ้น 30% (แทน 15%) และได้เกราะชั้นละ 3% ของเลือดสูงสุด 5 วิ']},
 archer:{a:['v4a','🌪️','พายุคู่','ปล่อยทอร์นาโด 2 ลูกเป็นรูปตัว V (ลูกละ 65%)'],
         b:['v4b','🌀','พายุนิ่ง','ทอร์นาโดหยุดอยู่กับที่ตรงเป้าหมาย ใหญ่ขึ้น 30% อยู่ 4 วิ ดูดมอนเข้าหาตลอด (แรงต่อครั้ง 50%)']},
 assn:{a:['x4a','🌪️','พายุค้าง','พายุใบมีดค้างนาน 4 วิ และวงกว้างขึ้น 30% (ดาเมจตอนพุ่ง 80%)'],
       b:['x4b','👣','สองจังหวะ','พุ่งได้ 2 ครั้งติดกันภายใน 1.5 วิ (ครั้งละ 85%) แต่ละครั้งทิ้งพายุใบมีด 2 วิ']},
 sup:{a:['y4a','🩸','ตราดูดวิญญาณ','ตรากว้างขึ้น 30% · ทุก 1 วิ แผดเผามอนในตรา (40%) และฮีลเพื่อนในตรา 3% ของเลือดสูงสุด'],
      b:['y4b','💥','ตราระเบิด','ตราอยู่ 3 วิ แล้วระเบิดคำสาปใส่ทุกตัวในตรา (350% · มอนที่ติดคำสาปแรงขึ้นชั้นละ 20%)']},
 mage:{a:['z4a','🗿','โกเลมยักษ์','โกเลมตัวใหญ่ ทุบวงกว้างขึ้น 40% และแรงขึ้น +35% แต่คูลดาวน์นานขึ้น 4 วิ'],
       b:['z4b','👥','โกเลมคู่','เรียกโกเลม 2 ตัวขนาบเป้าหมาย (ตัวละ 75%)']}};
const R26A={};
try{Object.keys(RUNESB).forEach(c=>{if(!RUNES[c])return;R26A[c]=RUNES[c][4];Object.defineProperty(RUNES[c],4,{configurable:true,enumerable:true,get(){try{if(me&&me.cls===c&&BR2())return RUNESB[c]}catch(e){}return R26A[c]},set(v){R26A[c]=v}})})}catch(e){}
function rnUse4B(c,P,cost,r){const X=v=>Math.round(v);
  if(c==='melee'){const t=pickTarget(200),a=t?Math.atan2(t.y-me.y,t.x-me.x):me.face;me.face=a;me.sk[4]=cdOf(4);me.mp-=cost;skSfx();dqProg('skill',1);
    const st=me.rg2|0;me.rg2=0;
    if(r==='a'){const mul=1+.15*st;fx({k:'roar',r:170});fx({k:'bash',r:170,a:Math.round(a*100)/100,len:st});fx({k:'stun',r:170,a:0,full:1,dur:2});fx({k:'taunt',r:170,dur:4});shk=Math.max(shk,.35);
      mons.forEach(m=>{if(Math.hypot(m.x-me.x,m.y-me.y)<170+mR(m))addHit(m,pd()*3.2*.75*P*mul,0,1,'melee')})}
    else{const mul=1+.3*st;fx({k:'bash',r:150,a:Math.round(a*100)/100,len:st});fx({k:'stun',r:150,a:Math.round(a*100)/100,dur:1.5});fx({k:'taunt',r:160,dur:4});shk=Math.max(shk,.3);
      mons.forEach(m=>{const dx=m.x-me.x,dy=m.y-me.y,d=Math.hypot(dx,dy);if(d>150+mR(m))return;let da=Math.atan2(dy,dx)-a;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<1.1||d<30)addHit(m,pd()*3.2*P*mul,0,1,'melee')});
      if(st){me.shv=Math.max(me.shv||0,Math.round(me.mh*.03*st));me.shield=Math.max(me.shield||0,5)}}
    if(st)dn.push({x:me.x,y:me.y-56,v:'แค้น ×'+st+' → ดาเมจ +'+Math.round(st*(r==='a'?15:30))+'%'+(r==='b'?' · เกราะ '+st*3+'%':''),t:1.4});return true}
  if(c==='archer'){const t=pickTarget(320);if(!t){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return true}const a=Math.atan2(t.y-me.y,t.x-me.x);me.face=a;me.sk[4]=cdOf(4);me.mp-=cost;skSfx();dqProg('skill',1);
    if(r==='a')[-.35,.35].forEach(da=>{const b=a+da;fx({k:'torn',r:70,a:Math.round(b*100)/100,dur:3,v:X(pd()*.75*.65*P),x:X(me.x+Math.cos(b)*30),y:X(me.y+Math.sin(b)*30)})});
    else fx({k:'torn',r:90,a:Math.round(a*100)/100,dur:4,len:1,v:X(pd()*.75*.5*P),x:X(t.x),y:X(t.y)});
    return true}
  if(c==='assn'){const t=pickTarget(260),a=t?Math.atan2(t.y-me.y,t.x-me.x):me.face,L=180,sx=me.x,sy=me.y;me.face=a;
    if(r==='b'){const n=performance.now();if(me.rnB2>n){me.rnB2=0;me.sk[4]=cdOf(4)}else{me.rnB2=n+1500;me.r26c4=cdOf(4);me.sk[4]=.3;me.mp-=cost;dqProg('skill',1)}}
    else{me.sk[4]=cdOf(4);me.mp-=cost;dqProg('skill',1)}
    sfx('slash');dash(a,L,pd()*2.2*P*(r==='a'?.8:.85));comboHit();
    fx({k:'bdash',x:X(me.x),y:X(me.y),sx:X(sx),sy:X(sy),r:30});fx({k:'bstrm',x:X(me.x),y:X(me.y),sx:X(sx),sy:X(sy),r:r==='a'?65:50,dur:r==='a'?4:2,v:X(pd()*.5*P)});return true}
  if(c==='sup'){const t=pickTarget(300),x=t?t.x:me.x+Math.cos(me.face)*80,y=t?t.y:me.y+Math.sin(me.face)*80;me.sk[4]=cdOf(4);me.mp-=cost;skSfx();dqProg('skill',1);
    if(r==='a'){const R=143;fx({k:'seal',x:X(x),y:X(y),r:R,dur:6,v:X(pd()*2.2*P)});
      for(let i=1;i<=6;i++)setTimeout(()=>{if(!me.cls)return;mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-x,m.y-y)<R+mR(m))addHit(m,pd()*.4*P,0,1,'holy')});fx({k:'heal',x:X(x),y:X(y),r:R,v:0,pc:.03})},i*1000)}
    else{const R=110;fx({k:'seal',x:X(x),y:X(y),r:R,dur:3,v:X(pd()*2.2*P)});
      setTimeout(()=>{if(!me.cls)return;fx({k:'soulx',x:X(x),y:X(y),r:R});fx({k:'elbx',x:X(x),y:X(y),r:R});
        mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-x,m.y-y)<R+mR(m)){let n=0;try{const q=CURSE[m.id];n=q&&q.until>Date.now()?(q.n|0):0}catch(e){}addHit(m,pd()*3.5*P*(1+.2*n),0,1,'holy')}});
        shk=Math.max(shk,.25)},3000)}
    return true}
  if(c==='mage'){const t=pickTarget(300),x=t?t.x:me.x+Math.cos(me.face)*70,y=t?t.y:me.y+Math.sin(me.face)*70;me.mp-=cost;skSfx();dqProg('skill',1);
    if(r==='a'){me.sk[4]=cdOf(4)+4;fx({k:'golem',x:X(x),y:X(y),r:140,dur:8,v:X(pd()*1.3*1.35*P)});shk=Math.max(shk,.3)}
    else{me.sk[4]=cdOf(4);const a=me.face+Math.PI/2;[-1,1].forEach(s=>fx({k:'golem',x:X(x+Math.cos(a)*62*s),y:X(y+Math.sin(a)*40*s),r:100,dur:8,v:X(pd()*1.3*.75*P)}));shk=Math.max(shk,.2)}
    return true}
  return false}
setTimeout(()=>{
  try{const _q=rnUse4post;rnUse4post=function(c,P){try{if(BR2()&&RUNESB[c])return}catch(e){}return _q.apply(this,arguments)}}catch(e){}
  try{const _p=rnUse4pre;rnUse4pre=function(c,P,cost){try{if(BR2()&&RUNESB[c]){const r=rnOf(4);if(!r)return false;return rnUse4B(c,P*rnPow(4),cost,r)}}catch(e){console.warn('r26',e)}return _p.apply(this,arguments)}}catch(e){}
  /* ช่วงรอพุ่งครั้งที่ 2 หมด → คิดคูลดาวน์เต็มนับจากครั้งแรก (นักรบ สองจังหวะ · นักฆ่า สองจังหวะ) */
  try{const _t=rnTick;rnTick=function(dt){const d0=me.rnD2||0;const r=_t.apply(this,arguments);try{if(d0>0&&!((me.rnD2||0)>0)&&(me.sk[1]||0)<cdOf(1)-1.3)me.sk[1]=Math.max(me.sk[1]||0,cdOf(1)-1.3);
      if(me.rnB2&&performance.now()>me.rnB2){me.rnB2=0;me.sk[4]=Math.max(me.sk[4]||0,(me.r26c4||cdOf(4))-1.5)}}catch(e){}return r}}catch(e){}
  /* โกเลมยักษ์วาดใหญ่ขึ้นตามวง */
  try{const _g=FXB.golem;if(_g)FXB.golem=(f,p,x,y,r,now)=>{if(r>120){const s=r/100;g.save();g.translate(x,y);g.scale(s,s);try{_g(f,p,0,0,r/s,now)}finally{g.restore()}}else _g(f,p,x,y,r,now)}}catch(e){}
},0);
