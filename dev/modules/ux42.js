/* ---------- v423 มอนฉลาดขึ้นเมื่อเจอปาร์ตี้ (โฮสต์คิด) ----------
   มอนธรรมดา (ไม่ใช่บอส/มอนพิเศษ) มีนิสัยตาม id:
     🗡️ นักฉวย (1/3) : ไล่ตีตัวยืนหลัง (นักเวท/นักบวช/นักธนู) ก่อน · อ้อมนักรบที่ขวางทาง
     🩸 นักล่า (1/3) : รุมคนที่เลือดต่ำกว่า 40%
     🪨 ดุดัน (1/3) : ตีคนที่ใกล้สุดเหมือนเดิม (แต่ก็ซ้ำเติมคนเลือดน้อยเล็กน้อย)
   ทำงานเฉพาะตอนมีผู้เล่น ≥2 คนในระยะ 260 ของมอนตัวนั้น (เล่นคนเดียว = เหมือนเดิมทุกอย่าง)
   ไม่ทับการยั่วยุ (taunt) · เป้าเดิมได้แต้มต่อ กันเปลี่ยนเป้าไปมา · คิดใหม่ทุก ~0.7 วิ
   ผู้เล่นจะเห็น «❗» เหนือหัวมอนที่เปลี่ยนเป้ามาหาตัวเอง (โฮสต์ส่ง fx mai ไปบอก) */
const MAI_R=260,MAI_AG=210,MAIBK={mage:1,sup:1,archer:1};
const maiKind=m=>((m.id|0)%3);/* 0 ดุดัน 1 นักฉวย 2 นักล่า */
function maiInfo(u){if(u===uid)return{c:me.cls,h:me.mh?me.hp/me.mh:1};const o=others[u];return o?{c:o.cls,h:o.mh?o.hp/o.mh:1}:{c:'',h:1}}
function maiOk(m){return m&&m.hp>0&&!m.pv&&m.t!==3&&m.t!==4&&!m.wb&&!m.mir&&!m.tgb&&!m.esc&&!m.mdf&&!m.hfg&&!m.dum&&!m.el}
function maiThink(m,pl,dt){m.mai=(m.mai||0)-dt;if(m.mai>0)return;m.mai=.6+Math.random()*.25;
  if(m.tt>1.25)return;/* โดนยั่วยุอยู่ (ของเราตั้งแค่ 1.2) */
  const C=pl.filter(p=>Math.hypot(p.x-m.x,p.y-m.y)<MAI_R);if(C.length<2){if(m.mtg){m.mtg=0;if(m.tt<=1.25){m.tg=null;m.tt=0}}return}
  if(m.p&&Math.hypot(m.x-m.hx,m.y-m.hy)>420)return;
  const K=maiKind(m);let best=null,bs=1e9;
  C.forEach(p=>{const d=Math.hypot(p.x-m.x,p.y-m.y);if(d>MAI_AG&&p.u!==m.tg)return;const I=maiInfo(p.u);let s=d;
    if(K===1){if(MAIBK[I.c])s-=95;if(I.c==='melee')s+=55}
    else if(K===2){if(I.h<.4)s-=150*(1-I.h/.4)+70;else s+=(I.h-.4)*40}
    else{if(I.h<.25)s-=40}
    if(p.u===m.tg)s-=25;if(s<bs){bs=s;best=p}});
  if(!best)return;const near=C.reduce((a,p)=>Math.hypot(p.x-m.x,p.y-m.y)<Math.hypot(a.x-m.x,a.y-m.y)?p:a,C[0]);
  const chg=best.u!==m.tg;m.tg=best.u;m.tt=1.2;m.mtg=1;
  /* แจ้งเป้าใหม่เมื่อไม่ใช่คนที่ใกล้สุด (= มอนเลือกเอง) */
  if(chg&&best!==near&&K){m.mtw=(m.mtw||0);const n=performance.now();if(n-m.mtw>2500){m.mtw=n;try{fx({k:'mai',m:m.id,to:best.u,c:K})}catch(e){}}}}
/* อ้อมคนขวาง: นักฉวยที่วิ่งไปหาเป้าด้านหลัง ถ้ามีผู้เล่นอื่นขวางเส้นทาง → เบี่ยงออกด้านข้าง */
function maiFlank(m,pl,dt,x0,y0){if(maiKind(m)!==1||!m.mtg||!m.tg)return;const T=pl.find(p=>p.u===m.tg);if(!T)return;const dx=T.x-m.x,dy=T.y-m.y,L=Math.hypot(dx,dy)||1;if(L<40)return;
  for(const p of pl){if(p.u===T.u)continue;const qx=p.x-m.x,qy=p.y-m.y,tt=(qx*dx+qy*dy)/(L*L);if(tt<=0||tt>=1)continue;const px=qx-dx*tt,py=qy-dy*tt,off=Math.hypot(px,py);
    if(off<34){const side=(px*dy-py*dx)>0?-1:1,nx=-dy/L*side,ny=dx/L*side,sp=Math.hypot(m.x-x0,m.y-y0)/Math.max(dt,.001)||40*MT[m.t].sp;m.x+=nx*sp*.7*dt;m.y+=ny*sp*.7*dt;m.flk=performance.now();return}}}
const MAIW={};
function maiFx(o){if(!o||o.to!==uid||!me.cls)return;MAIW[o.m]={t:performance.now(),c:o.c|0}}
function maiDraw(){const now=performance.now();for(const id in MAIW){const W=MAIW[id];const e=(now-W.t)/1000;if(e>1.6){delete MAIW[id];continue}const m=mons.find(q=>String(q.id)===String(id));if(!m||m.hp<=0)continue;
    let r=14;try{r=mR(m)}catch(_){}g.save();g.globalAlpha=Math.min(1,e*5)*(e>1.2?(1.6-e)/.4:1);g.font='bold 15px system-ui';g.textAlign='center';const y=m.y-r*2-14-Math.abs(Math.sin(e*8))*3;
    g.fillStyle=W.c===2?'#ff5a5a':'#ffd84a';g.strokeStyle='rgba(40,0,0,.8)';g.lineWidth=3;g.strokeText('❗',m.x,y);g.fillText('❗',m.x,y);g.restore()}}
setTimeout(()=>{
  try{const _sh=simHost;simHost=function(dt){let pl=null;
      try{if(me.cls&&!isArena()){pl=[{u:uid,x:me.x,y:me.y,d:me.down>0||me.stealth>0||me.rsp>0},...((room&&room.allPlayers)?room.allPlayers.map(([u,x,y,d])=>({u,x,y,d:!!d})):Object.entries(others).map(([u,o])=>({u,x:o.x,y:o.y,d:o.hp<=0||o.sl>0})))].filter(p=>!p.d&&Math.hypot(p.x-SX,p.y-SY)>SR);
        if(pl.length>=2)mons.forEach(m=>{if(maiOk(m))try{maiThink(m,pl,dt);m.__x=m.x;m.__y=m.y}catch(e){}});else pl=null}}catch(e){pl=null}
      const r=_sh.apply(this,arguments);
      if(pl)try{mons.forEach(m=>{if(m.__x!==undefined){maiFlank(m,pl,dt,m.__x,m.__y);delete m.__x;delete m.__y}})}catch(e){}
      return r}}catch(e){}
  try{const _h=handleFx;handleFx=function(o){if(o&&o.k==='mai'){try{maiFx(o)}catch(e){}return}return _h.apply(this,arguments)}}catch(e){}
  try{const _mp=drawMProj;drawMProj=function(){try{maiDraw()}catch(e){}return _mp.apply(this,arguments)}}catch(e){}
},880);
