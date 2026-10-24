/* ===== v517 ตัวละครเนื้อเรื่องที่โผล่ในดัน/ฉาก: ยายเมฆา (ภาค 8 ท่าเรือเมฆ · phMekD) · ทิลนั่งบนเกวียน (ดันคุ้มกันขบวน · escCaravan) ===== */
/* ---------- ยายเมฆา ผู้เล่าเรื่องแห่งนาวาเมฆ: นั่งบนลังไม้ ผมขาวเปียยาวพาดไหล่ ขนนกฟ้าที่ผม ผ้าคลุมไหล่ลายเมฆ ดีดพิณเมฆบนตัก ร้องเพลงกล่อม ---------- */
function mekV(x,y,T){const{O,LG,P,E,R,glow}=NPK,t=T,br=Math.sin(t*1.2)*.35,pl=Math.sin(t*5);NPK.sh(x+2,y+16,15);g.save();g.translate(x,y);g.scale(1.3,1.3);g.lineJoin='round';g.lineCap='round';
  const hy=-12+br*.4;
  /* เปียผมขาวยาวด้านหลัง */
  for(let i=0;i<6;i++){const by=hy+2+i*2.5,bx=-5.6-i*.5+Math.sin(t*1.2+i*.5)*.2;E(bx,by,1.8-i*.1,1.5,LG(0,by-1.5,0,by+1.5,['#ffffff','#c8c4d0']),O,.45)}E(-8.8,hy+16.8,1,1.1,'#8aa8e0',O,.35);
  /* ลังไม้ */
  R(-8,3.4,13,12,1.2,LG(0,3,0,15,['#b88a54','#7a5430']),O);g.strokeStyle='rgba(60,36,18,.6)';g.lineWidth=.5;g.beginPath();g.moveTo(-8,9.4);g.lineTo(5,9.4);g.moveTo(-1.5,3.6);g.lineTo(-1.5,15.2);g.stroke();
  g.fillStyle='rgba(255,240,210,.35)';g.fillRect(-7.4,4,11.8,.8);
  /* ขาที่ห้อย + รองเท้า */
  for(let k=1;k>=0;k--){const kx=7+k*.6,ky=6+k*1.2;g.strokeStyle=O;g.lineWidth=3.4;g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+.6,ky+8);g.stroke();g.strokeStyle='#4a3a5e';g.lineWidth=2.4;g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+.6,ky+8);g.stroke();E(kx+1.6,ky+8.8,2.4,1.4,LG(0,ky+7.4,0,ky+10.2,['#7a5a3a','#3a2414']),O,.5)}
  /* กระโปรงคลุมตัก */
  P([-6,-1,4.6,-1,10.4,4.4,10,9,-6.6,8.4],LG(0,-1,0,9,['#6a5ab0','#463a84']),O,.8);g.strokeStyle='#e8d8ff';g.lineWidth=.45;g.beginPath();g.moveTo(-6.4,7.4);g.lineTo(9.8,8);g.stroke();
  /* ลำตัว + ผ้าคลุมไหล่ลายเมฆ */
  P([-5.4,-10+br*.3,4.8,-10+br*.3,5.6,.4,-5.8,.4],LG(0,-10,0,0,['#8a7ac8','#5a4a98']),O,.8);
  {const sy=-10.4+br*.3;P([-6.4,sy,6,sy,6.8,sy+4.4,.2,sy+8.6,-7,sy+4.4],LG(0,sy,0,sy+8.6,['#c8dcff','#8aa8e0']),O,.7);g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=.45;for(const[cx,cy]of[[-3.6,sy+3],[2.4,sy+3.4],[-.6,sy+6]]){g.beginPath();g.arc(cx,cy,1,Math.PI,0);g.arc(cx+1.7,cy,.8,Math.PI,0);g.stroke()}
    g.strokeStyle='#e8d8ff';g.lineWidth=.4;for(let i=0;i<6;i++){const q=i/5,xx=-6.6+q*6.6,yy=sy+4.6+q*4;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx-.2,yy+1.4);g.stroke()}}
  /* พิณเมฆบนตัก + มือดีด */
  {const hx=4.4,hyy=3.4;g.save();g.translate(hx,hyy);g.scale(.82,.82);g.translate(-hx,-hyy);P([hx-3.4,hyy+3,hx-4.2,hyy-5,hx-2.4,hyy-7.4,hx-1.6,hyy-4.4,hx+2.4,hyy-4.4,hx+3.2,hyy-7.4,hx+5,hyy-5,hx+4.2,hyy+3],LG(0,hyy-7,0,hyy+3,['#ffe9a0','#c8902a']),O,.5);
    g.strokeStyle='rgba(255,255,240,'+(.6+.3*pl)+')';g.lineWidth=.3;for(let k=0;k<4;k++){const sx=hx-1.8+k*1.4;g.beginPath();g.moveTo(sx,hyy-4.2);g.lineTo(sx+Math.sin(t*20+k)*.2*(pl>0?1:0),hyy+2.6);g.stroke()}
    E(hx+.4,hyy+3.2,4.4,1.3,LG(0,hyy+2,0,hyy+4.4,['#ffffff','#c8d8f0']),O,.4);g.restore();
    NP3.arm(-5,-8+br*.3,-6.4,-2,hx-3,hyy-.6,'#6a5aa8','#f0d4bc');NP3.arm(4.8,-8+br*.3,8.4,-3,hx+2+pl*.4,hyy-1.4,'#6a5aa8','#f0d4bc')}
  /* หน้า: ยิ้มตาปิด ร้องเพลง */
  NP3.face(hy,['#f6dcc6','#e4b89c','#b88a72'],{noEye:1,mouth:false});
  g.strokeStyle='rgba(60,30,20,.85)';g.lineWidth=.55;for(const ex of[2.6,5.2]){g.beginPath();g.arc(ex,hy-.2,.9,.2,Math.PI-.2);g.stroke()}
  const sing=(t%5)<3;g.strokeStyle='rgba(120,50,40,.75)';g.lineWidth=.45;if(sing){g.beginPath();g.ellipse(3.8,hy+2.6,.7,.9,0,0,7);g.stroke()}else{g.beginPath();g.arc(3.8,hy+2,1.1,.3,Math.PI-.3);g.stroke()}
  g.strokeStyle='rgba(120,60,40,.45)';g.lineWidth=.35;g.beginPath();g.moveTo(1,hy+1.2);g.lineTo(1.4,hy+2.2);g.moveTo(6.6,hy+1.2);g.lineTo(6.2,hy+2.2);g.stroke();g.fillStyle='rgba(255,140,140,.3)';g.beginPath();g.arc(6,hy+1.8,.9,0,7);g.fill();
  /* ผมขาว + เปียยาวพาดไหล่ + ขนนกฟ้า */
  g.beginPath();g.moveTo(-5.4,hy+3);g.quadraticCurveTo(-6.6,hy-6.6,.6,hy-6.8);g.quadraticCurveTo(6.6,hy-6.6,6.4,hy-2.4);g.quadraticCurveTo(3.6,hy-4.6,.6,hy-4);g.quadraticCurveTo(-3,hy-3.4,-3.4,hy+3);g.closePath();g.fillStyle=LG(0,hy-7,0,hy+3,['#ffffff','#e4e0ea','#b4aec0']);g.fill();g.strokeStyle=O;g.lineWidth=.7;g.stroke();
  g.save();g.translate(-4.4,hy-5.6);g.rotate(-.7+Math.sin(t*1.5)*.06);if(!LOWQ)glow(0,-3,5,'170,210,255',.35);P([0,1,-1.3,-2.6,-.4,-7,1.2,-3,.6,1],LG(0,-7,0,1,['#e8f4ff','#7aa8e8','#3a6ab8']),O,.4);g.strokeStyle='rgba(30,60,120,.6)';g.lineWidth=.3;g.beginPath();g.moveTo(.2,.6);g.lineTo(-.2,-6);g.stroke();g.restore();
  /* โน้ตเพลง */
  if(!LOWQ&&sing)for(let k=0;k<2;k++){const q=((t*.45)+k*.5)%1;g.globalAlpha=Math.sin(q*Math.PI)*.9;g.fillStyle=k?'#cfe0ff':'#e8d8ff';g.font='bold 5.5px system-ui';g.textAlign='center';g.fillText(k?'♫':'♪',9+q*5+k*3,hy-4-q*12);g.globalAlpha=1}
  g.restore()}
function mekLbl(x,y){g.save();g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,14,24,.85)';g.strokeText('ยายเมฆา',x,y-40);g.fillStyle='#e8d8ff';g.fillText('ยายเมฆา',x,y-40);g.restore()}
/* ---------- ทิลนั่งบนหลังคาเกวียน (ดันคุ้มกันขบวน) ---------- */
const escTilOld=(x,y,f,T)=>campFolk(x+2,y+6,{c:'#8a6a3a',sh:'#d84a3a',hair:'#3a2414',f:1,k:9,sit:1,s:1,arm:Math.sin(T*4)*.8-.6},T);let escTilW=null;
function escTil(x,y,T){if(typeof tilV!=='function'||typeof npvW!=='function')return escTilOld(x-2,y-6,1,T);if(!escTilW)escTilW=npvW((xx,yy,ff,tt)=>tilV(xx,yy,ff,tt,0,.98,1),escTilOld,null,[-40,40,-60,30]);escTilW(x-2,y-6,1,T)}
{const iv=setInterval(()=>{if(typeof phMekD==='function'&&typeof npvW==='function'){clearInterval(iv);if(!phMekD.npv){const o=phMekD;const w=npvW((x,y,f,T)=>mekV(x,y,T),(x,y,f,T)=>o(x,y,T),(x,y)=>mekLbl(x,y));phMekD=function(x,y,T){return w(x,y,1,T)};phMekD.npv=1}}},120);setTimeout(()=>clearInterval(iv),20000)}
