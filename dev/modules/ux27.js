/* ---------- v399 รูนเฉพาะของสกิลคลาส 3 (ปุ่มสีอรุณ) · 10 สกิล × 2 แบบ ----------
   เดิม: ทุกสกิลคลาส 3 ใช้รูนกลางชุดเดียว (ทวีพลังจุติ / เร่งร่ายจุติ) ปรับแค่ตัวเลข
   ใหม่: RUNES[cls][5] เป็น getter ตามสายคลาส 3 (s6B) · รูนเปลี่ยนวิธีทำงานของสกิล · ค่าคือขั้น I (II/III พลัง +15%/+30%)
   รูนกลางเดิม (q6a/q6b) คืนผงรูนให้ครบตามที่ใช้ไป (สร้าง 30 + อัปขั้น 40/80) แล้วลบออก */
const R27={
 melee:[{a:['p5ma','🌀','พายุยาว','หมุนดาบนาน 3.5 วิ วงบาดกว้างขึ้น 20% แต่ตอนจบดาบพุ่งเหลือ 4 เล่ม'],b:['p5mb','🗡️','ดาบรวมศูนย์','ไม่หมุน — ดาบ 6 เล่มพุ่งแทงเป้าหมายเดียวทันที (เล่มละ 380%)']},
        {a:['p5mc','💢','สะท้อนคลั่ง','สะท้อนดาเมจแรง ×2 นาน 7 วิ แต่เกราะของเราเหลือ 15%'],b:['p5md','💥','โล่ระเบิด','ครบ 5 วิ โล่แตกระเบิดใส่มอนรอบตัว (350%)']}],
 archer:[{a:['p5aa','🎯','ล่าเดี่ยว','ศรดาวทั้ง 5 ดอกพุ่งใส่เป้าหมายเดียว (ดอกละ 210%)'],b:['p5ab','🌠','ฝนดาว','ยิงศรดาว 9 ดอกกระจายหามอนรอบเป้า (ดอกละ 110%)']},
         {a:['p5ac','⚡','โซ่ยาว','กระโดดได้ 10 ตัว แต่แรงลดลงเร็วขึ้น (ตัวละ −12% แทน −10%)'],b:['p5ad','🔒','ช็อตหนัก','กระโดดแค่ 3 ตัว แต่ช็อตชะงัก 2 วิ และแรงขึ้น +40%']}],
 sup:[{a:['p5sa','💚','วงฟื้นฟู','ฟื้นเลือด 4%/วิ (เท่าตัว) แต่ไม่ลดดาเมจที่ได้รับ'],b:['p5sb','🔆','วงแหวนกว้าง','วงกว้างขึ้น 50% อยู่ 9 วิ แต่ฟื้นเลือดเหลือ 1%/วิ']},
      {a:['p5sc','⛓️','โซ่ยาว','ล่ามได้ 8 ตัว อยู่ 7 วิ แต่แบ่งดาเมจ 30%'],b:['p5sd','💀','โซ่มรณะ','ล่ามแค่ 3 ตัว แต่แบ่งดาเมจ 70%']}],
 assn:[{a:['p5na','🌙','พัดกว้าง','ร่างเงา 4 ร่างพุ่งเป็นพัดกว้างขึ้น (ร่างละ 400%)'],b:['p5nb','➖','แทงทะลวง','รวมเป็นแนวเดียว ยาวขึ้น 60% แรง 630% ตรึง 2 วิ']},
       {a:['p5nc','⚔️','ดาบเต็มวง','ได้ดาบ 8 เล่มทันทีไม่ต้องสะสมคอมโบ แต่อยู่ 4 วิ'],b:['p5nd','🌀','วงล้อใหญ่','วงกว้างขึ้น 50% อยู่ 9 วิ แต่บาดช้าลง (ทุก 0.45 วิ)']}],
 mage:[{a:['p5ga','⚡','ลูกแก้วถี่','ยิงสายฟ้าเร็วขึ้นเท่าตัว แต่อยู่ 5 วิ'],b:['p5gb','🔗','ลูกแก้วโซ่','สายฟ้าทุกครั้งกระโดดต่ออีก 2 ตัวรอบเป้า (ตัวละ 30%)']},
       {a:['p5gc','👹','อิมป์ยักษ์','อิมป์ยักษ์ตัวเดียว ระเบิดวงใหญ่เกือบเท่าตัว (360%)'],b:['p5gd','🔥','ฝูงคลั่ง','ปล่อยอิมป์ 9 ตัว (ตัวละ 45%)']}]};
/* ภาพของเอฟเฟกต์เหล่านี้ยืด/หดตามเวลาที่รูนตั้ง (dur) */
const R27D={bstrm:1,seal:1,s6sw:1,s6bw:1,s6ob:1,s6rg:1,s6ln:1,s6gd:1,torn:1};
function r27Fx(k,o){try{fxs=fxs.filter(f=>!(f.k===k&&(f.u===uid||!f.u)))}catch(e){}fx(Object.assign({k,u:uid},o))}
/* v401 ร่ายสกิลเดิมแต่แก้ค่าเอฟเฟกต์ก่อนส่ง (เพื่อนในห้องจะได้เห็นอันเดียว ไม่ซ้อน 2 ชั้น) */
function r27With(k,patch,fn){const _f=fx;fx=function(o){if(o&&o.k===k)Object.assign(o,typeof patch==='function'?patch(o):patch);return _f.apply(this,arguments)};try{return fn()}finally{fx=_f}}
function r27Pre(cost,needT,rg){if(!s6Open()){dn.push({x:me.x,y:me.y-40,v:'ปลดที่ Lv '+RBL5+' (คลาส 3)',t:.9});return null}let t=null;
  if(needT){t=pickTarget(rg||320)||s6Near(me.x,me.y,rg||320,1)[0];if(!t){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return null}me.face=Math.atan2(t.y-me.y,t.x-me.x)}
  me.sk[5]=cdOf(5);me.mp-=cost;dqProg('skill',1);try{s6Snd()}catch(e){}return t||{x:me.x+Math.cos(me.face)*120,y:me.y+Math.sin(me.face)*120,id:-1}}
function r27Cast(P,cost,r,_s6){const c=me.cls,b=s6B(),K=c+b+r;P*=rnPow(5);
  /* ---- นักรบ ---- */
  if(K==='melee0a'){r27With('s6sw',{r:72,dur:4.55},()=>_s6(P,cost));if(S6.sw){S6.sw.t=3.5;S6.sw.n=4;S6.sw.r=89}return}
  if(K==='melee0b'){const t=r27Pre(cost,1,320);if(!t)return;fx({k:'r27sum',u:uid,x:s6R(t.x),y:s6R(t.y-10),sx:s6R(me.x),sy:s6R(me.y)});pend.push({t:.83,f:()=>{if(t.hp>0){fx({k:'r27x',x:s6R(t.x),y:s6R(t.y),r:44});shk=Math.max(shk,.25)}}});for(let i=0;i<6;i++){const a=i*1.047;pend.push({t:.25+i*.07,f:()=>{if(!(t.hp>0))return;fx({k:'s6st',x:s6R(t.x),y:s6R(t.y-10),sx:s6R(me.x+Math.cos(a)*58),sy:s6R(me.y-34+Math.sin(a)*18)});pend.push({t:.16,f:()=>{if(t.hp>0)addHit(t,pd()*3.8*P,0,1,'melee')}})}})}shk=Math.max(shk,.2);return}
  if(K==='melee1a'){_s6(P,cost);fx({k:'r27rf',u:uid});me.s6gT=7;me.s6gM=2;me.shv=Math.round(me.mh*.15);return}
  if(K==='melee1b'){_s6(P,cost);fx({k:'r27cd',u:uid,r:44});pend.push({t:5,f:()=>{if(!me.cls)return;const x=me.x,y=me.y;fx({k:'elbx',x:s6R(x),y:s6R(y),r:160});fx({k:'roar',r:160});shk=Math.max(shk,.35);mons.forEach(m=>{if(m.hp>0&&Math.hypot(m.x-x,m.y-y)<160+bigR(m)*.5)addHit(m,pd()*3.5*P,0,1,'holy')})}});return}
  /* ---- นักธนู ---- */
  if(c==='archer'&&!b){const t=r27Pre(cost,1,360);if(!t)return;const n=r==='a'?5:9,mul=r==='a'?2.1:1.1,T=r==='a'?[t]:s6Near(t.x,t.y,260,9);if(!T.includes(t))T.unshift(t);
    for(let i=0;i<n;i++){const m=T[i%T.length],ia=i;pend.push({t:i*.06,f:()=>{if(m.hp<=0)return;fx({k:'s6ar',x:s6R(m.x),y:s6R(m.y-10),sx:s6R(me.x),sy:s6R(me.y-18),a:(ia%5)-2});pend.push({t:.44,f:()=>{if(m.hp>0)addHit(m,pd()*mul*P,0,1,'archer')}})}})}return}
  if(c==='archer'){const t=r27Pre(cost,1,360);if(!t)return;const n=r==='a'?10:3,dec=r==='a'?.88:.9,mul=r==='a'?1:1.4,sd=r==='a'?.6:2;const L=[t],seen=new Set([t.id]);let cur=t;
    for(let i=1;i<n;i++){let nb=null,bd=200;mons.forEach(m=>{if(m.hp<=0||seen.has(m.id))return;const d=Math.hypot(m.x-cur.x,m.y-cur.y);if(d<bd){bd=d;nb=m}});if(!nb)break;L.push(nb);seen.add(nb.id);cur=nb}
    fx({k:'s6ch',pts:[[s6R(me.x),s6R(me.y-18)]].concat(L.slice(0,11).map(m=>[s6R(m.x),s6R(m.y-12)]))});L.forEach((m,i)=>{addHit(m,pd()*2.5*mul*P*Math.pow(dec,i),0,1,'bolt');fx({k:'stun',x:s6R(m.x),y:s6R(m.y),r:14,full:1,dur:sd})});shk=Math.max(shk,.15);return}
  /* ---- ซัพพอร์ต ---- */
  if(c==='sup'&&!b){if(!r27Pre(cost,0))return;const R=r==='a'?140:210,D=r==='a'?6:9;fx({k:'s6rg',u:uid,r:R,dur:D,hp:r==='a'?.04:.01,nr:r==='a'?1:0});if(r==='a')fx({k:'r27hl',u:uid,r:R});
    for(let i=1;i<=D;i++)pend.push({t:i,f:()=>mons.forEach(m=>{if(m.hp>0&&dist(m,me)<R+bigR(m)*.5)addHit(m,pd()*.3*P,0,1,'holy')})});return}
  if(c==='sup'){const t=r27Pre(cost,1,320);if(!t)return;const n=r==='a'?8:3,T=s6Near(t.x,t.y,r==='a'?300:240,n);if(!T.includes(t)){T.unshift(t);T.length=Math.min(n,T.length)}
    S6.ln={t:r==='a'?7:5,ids:new Set(T.map(m=>m.id)),P,sh:r==='a'?.3:.7};T.forEach(m=>addHit(m,pd()*1.6*P,0,1,'holy'));fx({k:'s6ln',x:s6R(t.x),y:s6R(t.y),r:60,dur:r==='a'?7:5,pts:T.map(m=>[m.id,0])});return}
  /* ---- นักฆ่า ---- */
  if(c==='assn'&&!b){if(!s6Near(me.x,me.y,300,1).length&&!pickTarget(300)){dn.push({x:me.x,y:me.y-40,v:'ไม่มีศัตรูรอบตัว',t:.8});return}const t0=pickTarget(300);if(t0)me.face=Math.atan2(t0.y-me.y,t0.x-me.x);if(!r27Pre(cost,0))return;
    const a0=me.face,ox=me.x,oy=me.y,hit=new Set(),AN=r==='a'?[-.93,-.31,.31,.93]:[0],Ln=r==='a'?190:304,W=r==='a'?36:30,mul=r==='a'?4:6.3,sd=r==='a'?1.5:2;
    if(r==='a'){fx({k:'s6cl',a:Math.round((a0-.31)*100)/100,r:180});fx({k:'s6cl',a:Math.round((a0+.31)*100)/100,r:180})}
    else{fx({k:'r27ln',x:s6R(ox+Math.cos(a0)*Ln),y:s6R(oy+Math.sin(a0)*Ln),sx:s6R(ox),sy:s6R(oy),r:34});fx({k:'shadow',x:s6R(ox+Math.cos(a0)*Ln),y:s6R(oy+Math.sin(a0)*Ln),r:50,len:1})}
    AN.forEach(da=>{const a=a0+da;mons.forEach(m=>{if(m.hp<=0||hit.has(m.id))return;const dx=m.x-ox,dy=m.y-oy,l=dx*Math.cos(a)+dy*Math.sin(a),w=Math.abs(-dx*Math.sin(a)+dy*Math.cos(a));if(l>-10&&l<Ln&&w<W+bigR(m)*.5){hit.add(m.id);pend.push({t:.12+l/Ln*.3,f:()=>{if(m.hp>0){addHit(m,pd()*mul*P,0,1,'assn');fx({k:'stun',x:s6R(m.x),y:s6R(m.y),r:14,full:1,dur:sd})}}})}})});me.stealth=Math.max(me.stealth,1);return}
  if(K==='assn1a'){r27With('s6bw',{r:70,len:8,dur:4},()=>_s6(P,cost));if(S6.bw){S6.bw.n=8;S6.bw.t=4}return}
  if(K==='assn1b'){r27With('s6bw',{r:105,dur:9},()=>_s6(P,cost));if(S6.bw){S6.bw.t=9;S6.bw.r=138;S6.bw.iv=.45}return}
  /* ---- เวท ---- */
  if(K==='mage0a'){r27With('s6ob',{dur:5},()=>_s6(P,cost));if(S6.ob){S6.ob.t=5;S6.ob.iv=.28}return}
  if(K==='mage0b'){_s6(P,cost);if(S6.ob)S6.ob.ch=1;return}
  if(c==='mage'){const t=r27Pre(cost,1,320);if(!t)return;const n=r==='a'?1:9,R=r==='a'?130:70,mul=r==='a'?3.6:.45,T=s6Near(t.x,t.y,150,n);
    for(let i=0;i<n;i++){const m=T[i%T.length]||t,ang=i*6.283/n,big=r==='a',tx=s6R(m.x+(T.length<i+1||big?Math.cos(ang)*(big?0:40):0)),ty=s6R(m.y+(T.length<i+1&&!big?Math.sin(ang)*24:0)),ia=i;
      pend.push({t:i*.05,f:()=>{fx({k:'s6im',x:tx,y:ty,sx:s6R(me.x+((ia%5)-2)*12),sy:s6R(me.y-20),a:(ia%5)-2,big:big?1:0});pend.push({t:.6,f:()=>{if(big){fx({k:'elbx',x:tx,y:ty,r:R});fx({k:'fire',x:tx,y:ty,r:R})}mons.forEach(q=>{if(q.hp>0&&Math.hypot(q.x-tx,q.y-ty)<R+bigR(q)*.5)addHit(q,pd()*mul*P,0,1,'mage')});if(Math.hypot(me.x-tx,me.y-ty)<420)shk=Math.max(shk,big?.35:.12)}})}})}return}
  _s6(P,cost)}
setTimeout(()=>{
  try{Object.keys(R27).forEach(c=>{if(!RUNES[c])return;Object.defineProperty(RUNES[c],5,{configurable:true,enumerable:true,get(){let b=0;try{if(me&&me.cls===c&&me.rb)b=s6B()}catch(e){}return R27[c][b]},set(v){}})})}catch(e){}
  try{const _s6=s6Cast;s6Cast=function(P,cost){me.s6gM=0;const r=rnOf(5);if(!r)return _s6.apply(this,arguments);try{return r27Cast(P,cost,r,_s6)}catch(e){console.warn('r27',e)}}}catch(e){}
  /* คืนผงรูนกลางเดิม (q6a/q6b) */
  setInterval(()=>{try{if(!me.cls||!me.rn)return;const S=rnSt();let ref=0;['q6a','q6b'].forEach(id=>{const lv=S.u[id]|0;if(lv){ref+=RNC+(lv>=2?RNU[1]:0)+(lv>=3?RNU[2]:0);delete S.u[id]}});
    if(ref){S.sh=(S.sh|0)+ref;delete S.e[5];banner={s:'💠 รูนจุติเปลี่ยนเป็นรูนเฉพาะสกิล — คืนผงรูน '+ref+' 💠 ไปสร้างแบบใหม่ได้ที่ช่างรูน',t:7}}}catch(e){}},2000);
},0);
