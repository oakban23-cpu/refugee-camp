
/* ===== v447 · แรงค์สไตล์ D→S (ให้รางวัลคนเล่นเอง) =====
   แต้มสไตล์ขึ้นจาก: ตีโดน · สกิลที่กดเอง (สลับสกิลไม่ซ้ำ 2 ครั้งล่าสุด ได้เพิ่ม) · คอมโบสกิล · อัลติ · ฆ่า · หลบสมบูรณ์
   ลดเมื่อ: โดนตีแรง (≥ 4% เลือด → หาย 30% อย่างน้อย 60) · ไม่ได้สู้ 2.5 วิ (ลด 45/วิ) · ระหว่างสู้ลดช้า ๆ 5/วิ
   ตอนเปิดออโต้ล่า: แต้มที่ไม่ได้มาจากการกดเอง (ตี/ฆ่า/สกิลที่ออโต้ร่าย) ได้แค่ 25% · หลบสมบูรณ์และสกิลที่กดเองได้เต็ม
   รางวัล: ทอง/EXP จากมอน C +5% · B +10% · A +20% · S +35% · ขึ้น A/S เติมเกจคลั่ง
   ปิดในลานประลอง/ด่าน trial (sgOff) */
const U61R=[{l:'D',n:'เริ่มติดลม',p:0,c:'#a8b2c4',b:0},{l:'C',n:'เข้าท่า',p:80,c:'#6fd18a',b:.05},{l:'B',n:'เฉียบคม',p:200,c:'#5ab4ff',b:.1},{l:'A',n:'ดุเดือด',p:360,c:'#c58aff',b:.2},{l:'S',n:'สุดยอด!',p:560,c:'#ffcf4a',b:.35}];
const U61={p:0,r:0,act:0,hitT:0,hitN:0,last:[],pop:null,lost:null,best:0,on:1,MAX:760};
function u61Off(){try{return!U61.on||!me.cls||sgOff()||isArena()}catch(e){return!U61.on}}
function u61Man(){return performance.now()-(me.manT||0)<700}
function u61RankOf(p){let r=0;for(let i=0;i<U61R.length;i++)if(p>=U61R[i].p)r=i;return r}
function u61Add(v,man){if(u61Off()||me.down>0)return;const now=performance.now();if(!man&&typeof AUTO!=='undefined'&&AUTO.on)v*=.25;if(U61.r>=3)v*=.6;else if(U61.r>=2)v*=.8;U61.p=Math.min(U61.MAX,U61.p+v);U61.act=now;u61Upd()}
function u61Upd(){const r=u61RankOf(U61.p);if(r!==U61.r){const up=r>U61.r;U61.r=r;if(up){U61.pop={t0:performance.now(),r};if(r>U61.best)U61.best=r;
  try{sfx(r>=4?'combo2':'combo')}catch(e){}if(r>=3){try{fvAdd(r===4?15:8)}catch(e){}}if(r===4){shk=Math.max(shk,.12);try{burst(me.x,me.y-20,['#ffe9a0','#ffcf4a','#fff'],LOWQ?8:18,180,.6,{glow:1,g:-40})}catch(e){}}}}}
/* ตีโดน (ทุกการโจมตีของเรา) · สกิลที่โดน */
addHit=(f=>function(m,d,cr,lv,ck){const r=f.apply(this,arguments);try{if(m&&!m.pv&&!m.dum){const now=performance.now();if(now-U61.hitT>1000){U61.hitT=now;U61.hitN=0}if(++U61.hitN<=10)u61Add(lv?1.6:1.2,false);if(cr)u61Add(1.5,false)}}catch(e){}return r})(addHit);
/* ใช้สกิล */
useSkill=(f=>function(k){const b=me.sk[k]||0,man=u61Man();const r=f.apply(this,arguments);try{if((me.sk[k]||0)>b){let v=k===2?24:14;if(!U61.last.includes(k))v+=10;U61.last.unshift(k);U61.last.length=Math.min(U61.last.length,2);u61Add(v,man)}}catch(e){}return r})(useSkill);
/* คอมโบสกิล (ระบบเดิม cmbPost) */
try{cmbPost=(f=>function(k,ok,ck){const r=f.apply(this,arguments);try{if(ok&&ck)u61Add(ck===2?22:14,u61Man())}catch(e){}return r})(cmbPost)}catch(e){}
/* ฆ่า */
qKill=(f=>function(x,y,t,bs){const r=f.apply(this,arguments);try{if(me.cls&&me.down<=0&&Math.hypot(me.x-x,me.y-y)<380)u61Add(bs||t===3?60:t===4?0:5,false)}catch(e){}return r})(qKill);
/* หลบสมบูรณ์ */
perfectDodge=(f=>function(){const was=me.dgP;const r=f.apply(this,arguments);try{if(!was&&me.dgP)u61Add(45,true)}catch(e){}return r})(perfectDodge);
/* โดนตี */
hurt=(f=>function(d){const h0=me.hp;const r=f.apply(this,arguments);try{const lost=h0-me.hp;if(lost>0&&lost>=me.mh*.04&&U61.p>0&&!u61Off()){const cut=Math.max(60,U61.p*.3);U61.p=Math.max(0,U61.p-cut);U61.lost={t0:performance.now()};u61Upd()}}catch(e){}return r})(hurt);
/* ลดตามเวลา */
setInterval(()=>{try{if(U61.p<=0)return;if(u61Off()||!run){U61.p=0;U61.r=0;return}const idle=performance.now()-U61.act;U61.p=Math.max(0,U61.p-(idle>2500?45:4)*.1);u61Upd()}catch(e){}},100);
/* รางวัลทอง/EXP */
fdM=(f=>function(k){let v=f.apply(this,arguments);try{if((k==='gd'||k==='xp')&&U61.r>0&&!u61Off())v+=U61R[U61.r].b}catch(e){}return v})(fdM);
/* HUD: ป้ายแรงค์ด้านซ้าย ใต้แผงเควส (#topb) — คำนวณตำแหน่งใหม่ทุก 0.5 วิ */
let U61Y=236,U61YT=0;function u61Y(){const n=performance.now();if(n-U61YT>500){U61YT=n;try{const tb=$('topb'),cv=$('c')||document.querySelector('canvas'),cb=cv.getBoundingClientRect(),k=cb.height/H;let y=Math.min(H*.42,236);
  if(tb&&!tb.hidden){const b=tb.getBoundingClientRect();if(b.height>0)y=(b.bottom-cb.top)/k+8}U61Y=Math.round(Math.max(60,Math.min(H*.56,y)))}catch(e){}}return U61Y}
function u61Hud(){if(u61Off()||(typeof PH!=='undefined'&&PH.on)||(typeof SD!=='undefined'&&SD.on))return;const now=performance.now(),P=U61.pop;
  if(U61.p<=0&&!(U61.lost&&now-U61.lost.t0<900))return;const R=U61R[U61.r],nx=U61R[U61.r+1],fr=nx?(U61.p-R.p)/(nx.p-R.p):1;
  const x=14,y=u61Y(),pe=P?(now-P.t0)/1000:9,sc=pe<.18?1+.7*(1-pe/.18):1,idle=now-U61.act>2500;
  g.save();g.setTransform(DPR,0,0,DPR,0,0);g.globalAlpha=idle?.6+.25*Math.sin(now/120):1;
  g.fillStyle='rgba(10,8,18,.72)';g.beginPath();g.roundRect(x,y,62,58,12);g.fill();g.strokeStyle=R.c;g.globalAlpha*=.8;g.lineWidth=1.2;g.stroke();g.globalAlpha=idle?.6+.25*Math.sin(now/120):1;
  g.save();g.translate(x+31,y+24);g.scale(sc,sc);g.rotate(-.08);g.textAlign='center';g.textBaseline='middle';g.font='italic bold 30px system-ui';g.lineWidth=5;g.lineJoin='round';g.strokeStyle='rgba(20,10,30,.95)';g.strokeText(R.l,0,0);
  const gr=g.createLinearGradient(0,-14,0,14);gr.addColorStop(0,'#ffffff');gr.addColorStop(.45,R.c);gr.addColorStop(1,R.c);g.fillStyle=gr;g.fillText(R.l,0,0);g.restore();
  g.font='bold 8px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#efe6ff';g.fillText(R.n,x+31,y+44);
  g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x+8,y+50,46,3);g.fillStyle=R.c;g.fillRect(x+8,y+50,46*Math.max(0,Math.min(1,fr)),3);
  if(R.b>0){g.font='bold 7px system-ui';g.fillStyle='#ffe7a0';g.fillText('ทอง/EXP +'+Math.round(R.b*100)+'%',x+31,y+66)}
  if(U61.lost&&now-U61.lost.t0<900){const a=1-(now-U61.lost.t0)/900;g.globalAlpha=a;g.font='bold 9px system-ui';g.fillStyle='#ff8a7a';g.fillText('💢 เสียจังหวะ',x+31,y-8)}
  g.restore();
  if(P&&pe<1.4&&P.r>=2){const a=pe<.12?pe/.12:pe>1?1-(pe-1)/.4:1,R2=U61R[P.r];g.save();g.setTransform(DPR,0,0,DPR,0,0);g.globalAlpha=a;g.translate(W/2,H*.22);g.scale(pe<.15?1.5-.5*pe/.15:1,pe<.15?1.5-.5*pe/.15:1);
    g.textAlign='center';g.textBaseline='middle';g.font='italic bold 22px system-ui';g.lineWidth=6;g.lineJoin='round';g.strokeStyle='rgba(20,10,30,.9)';const t=R2.l+'  '+R2.n;g.strokeText(t,0,0);g.fillStyle=R2.c;g.fillText(t,0,0);g.restore()}}
{const o=vigDraw;vigDraw=function(){const r=o.apply(this,arguments);try{u61Hud()}catch(e){}return r}}
