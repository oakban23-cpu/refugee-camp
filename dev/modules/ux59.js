
/* ===== v445 · ท่าสายประชิดหนักมือ · ลดความรกตอนสู้ ===== */
/* ---------- ① ท่าประชิดหนักมือ (นักดาบ · มือสังหาร) ----------
   - ตีธรรมดา: รอยฟันเสี้ยวใหญ่ขึ้น (44 จาก 31) วางกึ่งกลางระหว่างเรากับเป้า · ฟันสลับซ้าย-ขวา
   - ตีครั้งที่ 3 ติดกัน (ห่างกันไม่เกิน 0.9 วิ) = ฟันปิดท้าย: รอยฟัน 58 หนากว่า + วงกระแทก + ฝุ่น + หยุดภาพ 42ms + จอสั่นเบา
   - จุดที่โดน: แสงวาบ · ประกายรูปดาว 4 แฉก · สะเก็ดพุ่งไปตามทิศที่ฟัน (คริ = สะเก็ดเยอะขึ้น + วงทอง)
   - มอนสะท้านถอยตามทิศที่โดน 150ms (แค่ภาพ ไม่แตะตำแหน่งจริง)
   - สกิลประชิด (ดาเมจแบบ 'melee'/'assn' เช่น วังวนดาบ พุ่งฟัน) ได้จุดโดนแบบเดียวกันทุกตัว + หยุดภาพ 48ms ครั้งเดียวต่อการร่าย */
const U59={n:0,lt:0,imN:0,imT:0,hsT:0,off:0};
const U59C={melee:['255,110,55','255,220,190'],assn:['185,110,255','235,215,255']};
function u59Melee(){return me&&(me.cls==='melee'||me.cls==='assn')}
function u59Dust(x,y,s){try{burst(x,y+4,['#cdb894','#9c8a6c','#efe2c0'],LOWQ?3:8,130*(s||1),.45,{g:40})}catch(e){}}
function u59Imp(m,a,pw,cr){if(!m)return;const now=performance.now();if(now-U59.imT>150){U59.imT=now;U59.imN=0}if(++U59.imN>10)return;
  let rr=12;try{rr=(MT[m.t].r||12)*(typeof szOf==='function'?szOf(m)||1:1)}catch(e){}const big=m.t>=3,c=(U59C[me.cls]||U59C.melee)[0];
  fxs.push({k:'u59i',x:m.x-Math.cos(a)*rr*.35,y:m.y-rr*.75,r:20,t:.32,d:.32,a,pw:(big?1.25:1)*(pw||1),cr:cr?1:0,c,s:Math.random()*99});
  m.__u59k={a,t0:now,pw:(big?.4:1)*(pw||1)}}
function u59Atk(t,cr){if(U59.off){fxs.push({x:me.x, y:me.y-4,r:25,k:'swipe',t:.2,d:.2,a:me.face,len:me.cls==='assn'?2:1,s:0});return}const now=performance.now();U59.n=(now-U59.lt<900)?U59.n+1:0;U59.lt=now;const fin=U59.n%3===2,as=me.cls==='assn';
  const a=t?Math.atan2(t.y-me.y,t.x-me.x):me.face,dd=t?Math.min(30,Math.hypot(t.x-me.x,t.y-me.y)*.45):18;
  fxs.push({k:'u59s',x:me.x+Math.cos(a)*dd,y:me.y-10+Math.sin(a)*dd*.8,r:fin?58:44,t:fin?.3:.22,d:fin?.3:.22,a,dir:U59.n%2?-1:1,fin:fin?1:0,as:as?1:0,s:Math.random()*99});
  if(t)u59Imp(t,a,(fin?1.45:1)*(cr?1.25:1),cr);
  if(fin){hitStop(cr?60:42);shk=Math.max(shk,.1);if(t)u59Dust(t.x,t.y,1)}}
FXB.u59s=(f,p,x,y,r)=>{const C=f.as?U59C.assn:U59C.melee,e=1-Math.pow(1-p,3),a=p<.12?1:1-Math.pow((p-.12)/.88,1.5),dir=f.dir||1,sw=f.fin?2.7:2.1,ah=f.a+dir*(-sw/2+e*sw),R=r*(.9+.12*e),L=f.fin?2.1:1.6;
  g.save();VX.lite();g.translate(x,y);g.scale(1,.8);
  VX.cr(0,0,R,ah,L,R*.42,C[0],.62*a,dir);VX.cr(0,0,R*.99,ah,L*.8,R*.2,C[1],.55*a,dir);VX.cr(0,0,R*.985,ah,L*.5,R*.07,'255,255,255',.95*a,dir);
  glowAt(Math.cos(ah)*R*.85,Math.sin(ah)*R*.85,f.fin?26:18,C[0],.5*a);
  if(f.fin&&p>.3){const q=(p-.3)/.7;VX.ring(0,0,R*(.75+q*.6),6*(1-q)+1,C[0],(1-q)*.55)}
  g.restore()};
FXB.u59i=(f,p,x,y)=>{const c=f.c||U59C.melee[0],a=1-p,e=1-Math.pow(1-p,2.5),pw=f.pw||1;g.save();VX.lite();
  if(p<.35){const q=p/.35;glowAt(x,y,(14+16*q)*pw,'255,250,240',(1-q)*.8)}
  glowAt(x,y,26*pw*(.6+.6*e),c,.42*a);
  const sl=(13+20*e)*pw*(p<.5?1:Math.max(0,1-(p-.5)*1.6)),sw=2.8*pw*a;
  if(sl>1){g.fillStyle='rgba(255,255,248,'+a+')';for(let i=0;i<2;i++){const b=f.a+i*1.5708+.35,Lb=i?sl*.6:sl,cb=Math.cos(b),sb=Math.sin(b);
    g.beginPath();g.moveTo(x+cb*Lb,y+sb*Lb);g.lineTo(x-sb*sw,y+cb*sw);g.lineTo(x-cb*Lb,y-sb*Lb);g.lineTo(x+sb*sw,y-cb*sw);g.closePath();g.fill()}}
  g.lineCap='round';const n=f.cr?9:6;for(let i=0;i<n;i++){const b=f.a+(fxR(f,i,1)-.5)*1.6,d0=6+e*(28+fxR(f,i,2)*34)*pw,ln=(7+fxR(f,i,3)*8)*a,dy=e*e*10;
    VX.ln(x+Math.cos(b)*d0,y+Math.sin(b)*d0+dy,x+Math.cos(b)*(d0+ln),y+Math.sin(b)*(d0+ln)+dy,1.7*pw,i%2?c:'255,240,200',a)}
  if(f.cr&&p<.6){const q=p/.6;VX.ring(x,y,10+q*34*pw,3*(1-q)+.8,'255,235,170',(1-q)*.8)}
  g.restore()};
setTimeout(()=>{try{FXTOP.u59s=1;FXTOP.u59i=1}catch(e){}},0);
/* มอนสะท้านถอย (แค่ภาพ) */
try{drawMon=(f=>function(x,y){const m=MON_CUR,k=m&&m.__u59k;if(k){const e=(performance.now()-k.t0)/150;if(e<1){const o=(1-e)*(1-e)*5*k.pw;g.save();g.translate(Math.cos(k.a)*o,Math.sin(k.a)*o*.6);try{return f.apply(this,arguments)}finally{g.restore()}}m.__u59k=null}return f.apply(this,arguments)})(drawMon)}catch(e){}
/* สกิลประชิด: จุดโดนทุกตัว + หยุดภาพครั้งเดียวต่อการร่าย */
try{addHit=(f=>function(m,d,cr,lv,ck){const r=f.apply(this,arguments);try{if(!U59.off&&lv&&(ck==='melee'||ck==='assn')&&m&&u59Melee()){const a=Math.atan2(m.y-me.y,m.x-me.x);u59Imp(m,a,1.2,cr);
  const now=performance.now();if(now-U59.hsT>350){U59.hsT=now;hitStop(48);shk=Math.max(shk,.14);u59Dust(m.x,m.y,1)}}}catch(e){}return r})(addHit)}catch(e){}
/* ---------- ② ลดความรกตอนสู้ ----------
   - แสงขาวจ้าที่จุดศูนย์กลางอยู่บนตัวเรา (แฟลชระเบิด/วงเวทรอบตัว) ลดเหลือ 45% → ไม่กลบตัวละครตอนร่าย (สีอื่นไม่แตะ)
   - แถบของที่ได้ทางขวา: อุปกรณ์ที่เก็บได้ติด ๆ กันรวมเป็นแถวเดียว «🎒 ได้อุปกรณ์ N ชิ้น» · แสดงพร้อมกันสูงสุด 4 แถว (เดิม 6) */
try{glowAt=(f=>function(x,y,r,c,a){if(r>30&&a>.05&&!U59.off&&typeof c==='string'){try{if(me.cls){const dx=x-me.x,dy=y-(me.y-18);if(dx*dx+dy*dy<3600){const q=c.split(',');if(+q[0]>=200&&+q[1]>=200&&+q[2]>=200)a*=.45}}}catch(e){}}return f.call(this,x,y,r,c,a)})(glowAt)}catch(e){}
const U59IT=/^ได้ .+ Lv\d+/;
try{lfPush=(f=>function(d){try{const v=d&&d.v;if(!U59.off&&typeof v==='string'&&U59IT.test(v)){const col=typeof d.c==='string'?d.c:(d.col||'#fff2d8');
  let e=LFD.find(q=>q.grp&&q.col===col&&q.t>.4);if(e){e.gn++;e.txt='🎒 ได้อุปกรณ์ '+e.gn+' ชิ้น';e.t=2.8;e.pop=.25;return}
  e=LFD.find(q=>!q.grp&&q.txt&&U59IT.test(q.txt)&&q.col===col&&q.t>.4);if(e){e.grp=1;e.gn=(e.n||1)+1;e.n=0;e.txt='🎒 ได้อุปกรณ์ '+e.gn+' ชิ้น';e.t=2.8;e.pop=.25;return}}}catch(e){}
  return f.apply(this,arguments)})(lfPush)}catch(e){}
