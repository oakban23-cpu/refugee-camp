
/* ===== v448 · หัวหน้ามอน 2 แบบใหม่ที่ต้องหลบ (ต่อยอดระบบหัวหน้ามอน ekAI เดิม) =====
   เดิมมี 4 แบบ: 🐗 พุ่งชน · 🔮 อัญเชิญ · 🛡️ โล่เหล็ก · 💥 ระเบิด — โผล่ 1.5% ของมอนในสนาม
   ใหม่: 🔨 ทุบพื้น (วงแดงเต็มใน 1 วิ แล้วทุบ — ออกจากวงให้ทัน) · 🏹 ยิงกระจาย (เส้นแดง 5 เส้นเป็นพัด 0.8 วิ แล้วยิงจริง ลูกบินได้ หลบเข้าช่องว่าง)
   โผล่ 2.5% (R-patch EKR 15→25 · ชนิด %4→%6) · ดาเมจแรงพอให้นับ «หลบสมบูรณ์» (≥ 3.5% เลือด) → สวนกลับ + แต้มสไตล์
   โฮสต์จำลอง (ekAI) · ส่งภาพผ่าน fx u62s/u62sx/u62v/u62vx */
const U62={R:130,VL:360,VN:5,VS:.3,VSPD:950};
setTimeout(()=>{try{EKN.push('ทุบพื้น','ยิงกระจาย');EKC.push('#ff7a2a','#ff4a8a');EKIC.push('🔨','🏹');EKH.push('มันจะทุบพื้น — ออกจากวงแดงให้ทัน!','ยิงกระจายเป็นพัด — หลบเข้าช่องว่างระหว่างเส้นแดง!');
  FXD.u62s=1;FXD.u62sx=.6;FXD.u62v=.8;FXD.u62vx=.45}catch(e){}},0);
function u62Seg(px,py,x,y,a,L){const dx=Math.cos(a),dy=Math.sin(a),t=Math.max(0,Math.min(L,(px-x)*dx+(py-y)*dy));return Math.hypot(px-(x+dx*t),py-(y+dy*t))}
ekAI=(f=>function(m,dt,pl){if(m.el!==5&&m.el!==6)return f.apply(this,arguments);const X=v=>Math.round(v);m.ekc=(m.ekc==null?2+Math.random()*2:m.ekc)-dt;
  /* ลูกธนูที่บินอยู่ */
  if(m.u62q&&m.u62q.length){for(const s of m.u62q){s.d+=U62.VSPD*dt;const hx=s.x+Math.cos(s.a)*Math.min(s.d,U62.VL),hy=s.y+Math.sin(s.a)*Math.min(s.d,U62.VL);
      pl.forEach(p=>{if(!s.h[p.u]&&Math.hypot(p.x-hx,p.y-hy)<22){s.h[p.u]=1;dmgQ[p.u]=(dmgQ[p.u]||0)+s.dm}})}m.u62q=m.u62q.filter(s=>s.d<U62.VL+40)}
  if(m.u62w){const W=m.u62w;W.t-=dt;m.root=Math.max(m.root||0,.15);if(W.t>0)return true;m.u62w=null;
    if(W.k==='s'){pl.forEach(p=>{if(Math.hypot(p.x-W.x,p.y-W.y)<U62.R)dmgQ[p.u]=(dmgQ[p.u]||0)+ekDm(m,3.2)});fx({k:'u62sx',x:X(W.x),y:X(W.y),r:U62.R});m.ekc=4.5+Math.random()*1.5;m.root=Math.max(m.root||0,.6)}
    else{m.u62q=m.u62q||[];for(let i=0;i<U62.VN;i++){const a=W.a+(i-(U62.VN-1)/2)*U62.VS;m.u62q.push({x:W.x,y:W.y,a,d:0,h:{},dm:ekDm(m,2.2)})}fx({k:'u62vx',x:X(W.x),y:X(W.y),a:Math.round(W.a*100)/100,len:U62.VL});m.ekc=4.2+Math.random()*1.6}
    return true}
  if(m.ekc<=0&&!(m.root>0)){
    if(m.el===5){const p=ekNear(m,pl,0,170);if(p){m.u62w={k:'s',t:1,x:m.x,y:m.y};m.akN=((m.akN|0)+1)%100;m.akT=performance.now();fx({k:'u62s',x:X(m.x),y:X(m.y),r:U62.R});return true}m.ekc=.5}
    else{const p=ekNear(m,pl,90,360);if(p){const a=Math.atan2(p.y-m.y,p.x-m.x);m.u62w={k:'v',t:.8,x:m.x,y:m.y,a};m.fx=Math.cos(a)<0?-1:1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();fx({k:'u62v',x:X(m.x),y:X(m.y),a:Math.round(a*100)/100,len:U62.VL});return true}m.ekc=.5}}
  return false})(ekAI);
/* เสียง/จอสั่น */
handleFx=(f=>function(o){const r=f.apply(this,arguments);try{if(o&&me.cls){const d=Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0));
  if(o.k==='u62s'||o.k==='u62v'){if(d<520)try{sfxNear('ek_growl',+o.x,+o.y,480)}catch(e){}}
  else if(o.k==='u62sx'){if(d<420)shk=Math.max(shk,.3);try{sfxNear('ek_boom',+o.x,+o.y,480)}catch(e){}try{GX.dec.push({x:+o.x,y:+o.y+4,r:U62.R*.85,t:'crack',v:2,s:performance.now(),l:2400})}catch(e){}try{burst(+o.x,+o.y+4,['#cdb894','#9c8a6c','#ff9a5a'],LOWQ?8:22,240,.7,{g:50,glow:1})}catch(e){}}
  else if(o.k==='u62vx'){try{sfxNear('ek_dash',+o.x,+o.y,480)}catch(e){}}}}catch(e){}return r})(handleFx);
/* ภาพเตือน: วงทุบพื้น */
FXB.u62s=(f,p,x,y,r,now)=>{const pu=.5+.5*Math.sin(now*18),R=r||U62.R;g.save();
  g.fillStyle='rgba(255,40,20,'+(.12+.06*pu)+')';g.beginPath();g.arc(x,y,R,0,7);g.fill();
  const rr=R*Math.min(1,p);const gr=g.createRadialGradient(x,y,0,x,y,Math.max(1,rr));gr.addColorStop(0,'rgba(255,90,40,.15)');gr.addColorStop(1,'rgba(255,120,60,'+(.35+.2*p)+')');g.fillStyle=gr;g.beginPath();g.arc(x,y,Math.max(1,rr),0,7);g.fill();
  g.strokeStyle='rgba(255,90,60,'+(.6+.4*pu)+')';g.lineWidth=2.5;g.setLineDash([12,7]);g.lineDashOffset=-now*50;g.beginPath();g.arc(x,y,R,0,7);g.stroke();g.setLineDash([]);
  if(p>.7){g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,220,180,'+((p-.7)/.3)+')';g.lineWidth=3;g.beginPath();g.arc(x,y,R,0,7);g.stroke()}
  g.restore();try{elTxt('⚠',x,y-46-4*pu,.9,'#ffb090')}catch(e){}};
FXB.u62sx=(f,p,x,y,r)=>{const R=r||U62.R,a=1-p,e=1-Math.pow(1-p,3);g.save();g.globalCompositeOperation='lighter';
  glowAt(x,y,R*1.1,'255,120,60',.5*a);g.strokeStyle='rgba(255,200,150,'+a+')';g.lineWidth=8*a+1;g.beginPath();g.arc(x,y,R*(.5+.7*e),0,7);g.stroke();
  g.strokeStyle='rgba(255,110,60,'+(.7*a)+')';g.lineWidth=3;g.beginPath();g.arc(x,y,R*(.3+.9*e),0,7);g.stroke();g.restore()};
/* ภาพเตือน: พัดยิงกระจาย */
FXB.u62v=(f,p,x,y,r,now)=>{const L=f.len||U62.VL,pu=.5+.5*Math.sin(now*18);g.save();g.translate(x,y);
  for(let i=0;i<U62.VN;i++){const a=(f.a||0)+(i-(U62.VN-1)/2)*U62.VS;g.save();g.rotate(a);
    g.fillStyle='rgba(255,40,90,'+(.14+.06*pu)+')';g.beginPath();g.roundRect(0,-9,L,18,9);g.fill();
    g.fillStyle='rgba(255,90,140,'+(.3+.2*p)+')';g.beginPath();g.roundRect(0,-9,Math.max(2,L*Math.min(1,p)),18,9);g.fill();
    g.strokeStyle='rgba(255,110,160,'+(.55+.4*pu)+')';g.lineWidth=1.6;g.setLineDash([9,6]);g.lineDashOffset=-now*60;g.beginPath();g.roundRect(0,-9,L,18,9);g.stroke();g.setLineDash([]);g.restore()}
  g.restore();try{elTxt('⚠',x,y-46-4*pu,.9,'#ffb0d0')}catch(e){}};
FXB.u62vx=(f,p,x,y)=>{const L=f.len||U62.VL,d=Math.min(L,U62.VSPD*p*(FXD.u62vx||.45)),a0=1-Math.max(0,(p-.8)/.2);g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
  for(let i=0;i<U62.VN;i++){const a=(f.a||0)+(i-(U62.VN-1)/2)*U62.VS,ca=Math.cos(a),sa=Math.sin(a),hx=x+ca*d,hy=y+sa*d,tl=Math.max(0,d-70);
    const lg=g.createLinearGradient(x+ca*tl,y+sa*tl,hx,hy);lg.addColorStop(0,'rgba(255,60,120,0)');lg.addColorStop(1,'rgba(255,150,190,'+(.9*a0)+')');g.strokeStyle=lg;g.lineWidth=5;g.beginPath();g.moveTo(x+ca*tl,y+sa*tl);g.lineTo(hx,hy);g.stroke();
    glowAt(hx,hy,14,'255,120,170',.7*a0);g.fillStyle='rgba(255,240,250,'+a0+')';g.beginPath();g.arc(hx,hy,3,0,7);g.fill()}
  g.restore()};
