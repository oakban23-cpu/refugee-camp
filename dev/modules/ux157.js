/* ---------- v584 บรรยากาศค่าย (แมพ 1): ใบไม้ปลิว · ควันกองไฟ/ไอหม้อครัว · หิ่งห้อยในป่ายามค่ำ ----------
   ลมเดียวกันพัดทั้งใบไม้และควัน (ลมกระโชกเป็นช่วง ๆ) · กลางวันใบไม้มาก กลางคืนน้อยลง · ซากุระมีกลีบชมพูร่วงรอบต้น
   หิ่งห้อยเกาะตามต้นไม้ใกล้จอ บินวน กะพริบ (เฉพาะค่ำ) · โหมดประหยัด: จำนวนน้อยลง · ปิด: AMB.off=1 */
const AMB={off:0,lv:[],ff:[],spr:{},t0:0,wind:20};
function ambN(){return LOWQ?{lv:7,ff:10,sm:4}:{lv:20,ff:30,sm:7}}
function ambDark(){try{const D=campDay(),h=window.DNH!==undefined?window.DNH:D.h;if(h>=19.5||h<5)return 1;if(h>=18)return(h-18)/1.5;if(h<6.5)return(6.5-h)/1.5;return 0}catch(e){return 0}}
/* สไปรต์ใบไม้/กลีบ/ควัน (เตรียมครั้งเดียว) */
function ambLeafSpr(c){if(AMB.spr[c])return AMB.spr[c];const S=3,cv=document.createElement('canvas');cv.width=cv.height=12*S;const x=cv.getContext('2d');x.scale(S,S);x.translate(6,6);
  if(c==='p'){x.fillStyle='#ffc4d8';x.beginPath();x.ellipse(0,0,3,2.1,0,0,7);x.fill();x.fillStyle='#ff9ec0';x.beginPath();x.ellipse(1,0,1.3,1,0,0,7);x.fill()}
  else{x.fillStyle=c;x.strokeStyle='rgba(30,20,10,.55)';x.lineWidth=.5;x.beginPath();x.moveTo(-4.5,0);x.quadraticCurveTo(0,-3.2,4.5,0);x.quadraticCurveTo(0,3.2,-4.5,0);x.fill();x.stroke();x.strokeStyle='rgba(30,20,10,.4)';x.beginPath();x.moveTo(-4,0);x.lineTo(4,0);x.stroke()}
  return AMB.spr[c]=cv}
function ambPuff(){if(AMB.spr.puff)return AMB.spr.puff;const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d'),gr=x.createRadialGradient(32,32,2,32,32,31);
  gr.addColorStop(0,'rgba(170,166,164,1)');gr.addColorStop(.5,'rgba(150,146,144,.6)');gr.addColorStop(1,'rgba(140,136,134,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);return AMB.spr.puff=cv}
const AMBC=['#6aa03c','#8ab440','#c8b040','#d88a30','#a8642c','#7a9a34'];
function ambWind(t){return 18+12*Math.sin(t*.13)+10*Math.max(0,Math.sin(t*.41))**4}
function ambLeafNew(edge){const t=performance.now()/1000,w=AMB.wind,vx=cam.x,vy=cam.y;let x,y;if(edge){if(Math.random()<.6){x=vx-20;y=vy+Math.random()*H}else{x=vx+Math.random()*W;y=vy-20}}else{x=vx+Math.random()*W;y=vy+Math.random()*H}
  /* ใกล้ต้นซากุระ → กลีบชมพู */
  let c=AMBC[(Math.random()*AMBC.length)|0];
  return {x,y,c,vy:6+Math.random()*10,ph:Math.random()*6,sw:8+Math.random()*14,rs:(Math.random()-.5)*4,r:Math.random()*6,s:.8+Math.random()*.6,k:.7+Math.random()*.6}}
function ambBlossom(){try{if(typeof NAT==='undefined'||!natOn())return[];return trees.filter(q=>q._nv!==undefined&&NAT.v[q._nv][0]==='tree_blossom'&&q.x>cam.x-60&&q.x<cam.x+W+60&&q.y>cam.y-40&&q.y<cam.y+H+80)}catch(e){return[]}}
/* ใบไม้ + กลีบซากุระ + ควัน (วาดก่อนชั้นมืด) */
function ambUnder(t,dt){const N=ambN(),dk=ambDark(),w=AMB.wind=ambWind(t),vx=cam.x,vy=cam.y;
  /* ควันกองไฟกลางค่าย + ไอหม้อครัว */
  const P=ambPuff(),src=[[CX,CY-14,1,.6,46]];try{const C=MAPS[1].npc6;if(C)src.push([C.x+22,C.y-34,.55,.4,30])}catch(e){}
  for(const[sx,sy,sc,al,rise]of src){if(sx<vx-150||sx>vx+W+150||sy<vy-40||sy>vy+H+200)continue;for(let i=0;i<N.sm;i++){const q=(t*.12*(1+sc*.2)+i/N.sm)%1,life=q*7,
      x=sx+w*life*.9*sc+Math.sin(t*.9+i*2.1)*6*q,y=sy-rise*life*sc*.62-q*q*20,r=(6+q*30)*sc,a=al*(q<.12?q/.12:1)*Math.pow(1-q,.7)*(1-dk*.35);g.globalAlpha=a;g.drawImage(P,x-r,y-r,r*2,r*2)}}
  g.globalAlpha=1;
  /* ใบไม้ปลิว */
  const want=Math.round(N.lv*(1-dk*.6));while(AMB.lv.length<want)AMB.lv.push(ambLeafNew(AMB.lv.length>0&&AMB.t0>0));if(AMB.lv.length>want)AMB.lv.length=want;
  for(let i=0;i<AMB.lv.length;i++){const L=AMB.lv[i];L.ph+=dt*2.2;L.x+=(w*L.k+Math.sin(L.ph)*L.sw)*dt;L.y+=(L.vy+Math.cos(L.ph*1.3)*6)*dt;L.r+=L.rs*dt*(1+w/40);
    if(L.x>vx+W+30||L.y>vy+H+30||L.x<vx-60||L.y<vy-60){AMB.lv[i]=ambLeafNew(true);continue}
    const S=ambLeafSpr(L.c),fl=Math.cos(L.ph*1.6);g.save();g.translate(L.x,L.y);g.rotate(L.r);g.scale(L.s,L.s*Math.max(.25,Math.abs(fl)));g.globalAlpha=.95;g.drawImage(S,-9,-9,18,18);g.restore()}
  /* กลีบซากุระร่วงรอบต้น */
  const B=ambBlossom();if(B.length){const S=ambLeafSpr('p');for(const tr of B.slice(0,4))for(let i=0;i<(LOWQ?2:5);i++){const q=(t*.18+i/5+tr.x*.013)%1,x=tr.x+(i-2)*tr.r*.6+w*q*1.6+Math.sin(t*1.7+i)*5,y=tr.y-tr.r*2.6+q*tr.r*3.2;
      g.save();g.globalAlpha=(1-q)*.95;g.translate(x,y);g.rotate(t*2+i);g.drawImage(S,-4,-4,8,8);g.restore()}}
  g.globalAlpha=1;AMB.t0=t}
/* หิ่งห้อยในป่า (วาดหลังชั้นมืด · แสงบวก) */
function ambFirefly(t,dt){const dk=ambDark();if(dk<=.05){AMB.ff.length=0;return}const N=ambN(),vx=cam.x,vy=cam.y;
  if(!AMB.ff.length||AMB.ffk!==((vx/300|0)+':'+(vy/300|0))){AMB.ffk=(vx/300|0)+':'+(vy/300|0);
    const T=trees.filter(q=>!q.inv&&q.x>vx-40&&q.x<vx+W+40&&q.y>vy-40&&q.y<vy+H+40&&Math.hypot(q.x-CX,q.y-CY)>CAMP.R-20);
    while(AMB.ff.length<N.ff){const tr=T.length?T[(Math.random()*T.length)|0]:{x:vx+Math.random()*W,y:vy+Math.random()*H,r:18};AMB.ff.push({hx:tr.x+(Math.random()-.5)*tr.r*3,hy:tr.y-tr.r*(.3+Math.random()*1.8),ph:Math.random()*9,sp:.4+Math.random()*.6,rr:10+Math.random()*26})}
    for(const f of AMB.ff)if(f.hx<vx-80||f.hx>vx+W+80||f.hy<vy-80||f.hy>vy+H+80){const tr=T.length?T[(Math.random()*T.length)|0]:{x:vx+Math.random()*W,y:vy+Math.random()*H,r:18};f.hx=tr.x+(Math.random()-.5)*tr.r*3;f.hy=tr.y-tr.r*(.3+Math.random()*1.8)}}
  g.save();g.globalCompositeOperation='lighter';const k=Math.min(1,dk)*1;
  for(const f of AMB.ff){const a=t*f.sp+f.ph,x=f.hx+Math.cos(a)*f.rr+Math.sin(a*2.3)*6,y=f.hy+Math.sin(a*1.3)*f.rr*.6,bl=Math.max(0,Math.sin(t*2.2+f.ph*3)),pu=bl*bl;if(pu<.03)continue;
    glowAt(x,y,9+5*pu,'190,255,120',.55*pu*k);g.fillStyle='rgba(240,255,200,'+(.95*pu*k)+')';g.fillRect(x-.8,y-.8,1.6,1.6)}
  g.restore()}
setTimeout(()=>{try{const _c=campLight;window.campLight=campLight=function(){const t=performance.now()/1000,dt=Math.min(.05,AMB.t0?t-AMB.t0:0);let ok=!AMB.off&&curMap===1;
    if(ok)try{g.save();ambUnder(t,dt);g.restore()}catch(e){console.warn('amb',e)}const r=_c.apply(this,arguments);if(ok)try{ambFirefly(t,dt)}catch(e){}return r}}catch(e){console.warn('amb',e)}},1600);
