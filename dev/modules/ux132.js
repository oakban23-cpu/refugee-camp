/* ===== v524 ตัวละครผู้เล่น ช่วง 5: ร่างตื่นรู้ (ขั้น 2 · สายทมิฬ) + อาชีพขั้น 3 — เสริมรายละเอียด คงแนวคิดเดิมทุกแบบ
   ผ้าคลุมหลัง (เดิมเป็นรูปหลายเหลี่ยมสีเดียว) → เงาพับผ้า แสงขอบ ซับในชาย เงาใต้ปก · ปีกค้างคาว (นักรบ/ซัพ ขั้น 3) → กระดูกปีก เยื่อปีก กรงเล็บ
   ปีกขนนก (c3Wing) → ไล่สี ขอบ แกนขน · เขา (นักรบตื่นรู้ · เวทสายทมิฬ · เวทขั้น 3) → ไล่สีมีปล้อง ปลายเรือง
   หมวกอัศวินสายทมิฬ (นักรบ) → แบบ v522 · มงกุฎนักรบขั้น 3 · ปีกหัวนักรบขั้น 3 · มงกุฎมืดซัพขั้น 3 → ไล่เฉด/ขอบ/อัญมณี
   ห่อทางชื่อ (awkBack · awkBack3 · c3Back · c3Wing · awkHead · awkHead3 · c3Head) · error → แบบเดิม (AWV.on=0 ปิด) ===== */
const AWV={on:1,err:'',n:0};
function awErr(e){AWV.err=String(e&&e.stack||e).slice(0,300)}
/* ---------- ผ้าคลุม: เสริมเงาบนรูปหลายเหลี่ยมเดิม ---------- */
function awCapeShade(pts,c,fl){let yb=-99;for(let i=1;i<pts.length;i+=2)if(pts[i]>yb)yb=pts[i];const y0=pts[1],hw=Math.abs(pts[0]);
  g.fillStyle='rgba(0,0,0,.28)';g.fillRect(-hw,y0,hw*2,1.5);
  if(!LOWQ){g.lineCap='round';g.strokeStyle='rgba(0,0,0,.32)';g.lineWidth=.9;g.beginPath();g.moveTo(-2.4,y0+2);g.quadraticCurveTo(-3+fl*.15,(y0+yb)/2,-3.6+fl*.3,yb-2.6);g.moveTo(2.6,y0+2);g.quadraticCurveTo(2.4+fl*.1,(y0+yb)/2,2.2+fl*.2,yb-2.8);g.moveTo(.2,y0+4);g.lineTo(fl*.25,yb-3.4);g.stroke();
    g.strokeStyle='rgba(255,255,255,.16)';g.lineWidth=1.5;g.beginPath();g.moveTo(-hw+1.4,y0+1.6);g.quadraticCurveTo(-hw-1+fl*.1,(y0+yb)/2,-hw-1.8+fl*.6,yb-2.4);g.stroke()}
  g.strokeStyle=chAdj(c,.3);g.globalAlpha=.55;g.lineWidth=.7;g.beginPath();g.moveTo(pts[2],pts[3]);for(let i=4;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.lineTo(pts[0],pts[1]);g.stroke();g.globalAlpha=1}
/* ---------- ปีกค้างคาว: กระดูก + เยื่อ ---------- */
function awBatShade(pts,c){const ox=pts[0],oy=pts[1];if(!LOWQ){g.fillStyle='rgba(255,60,60,.12)';g.beginPath();g.moveTo(ox,oy);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.closePath();g.fill()}
  const tips=[];for(let i=2;i<pts.length;i+=2){const d=Math.hypot(pts[i]-ox,pts[i+1]-oy);if(d>11)tips.push([pts[i],pts[i+1]])}
  g.lineCap='round';g.strokeStyle=O0;g.lineWidth=1.5;g.beginPath();for(const[x,y]of tips){g.moveTo(ox,oy);g.quadraticCurveTo((ox+x)/2,(oy+y)/2-1.4,x,y)}g.stroke();
  g.strokeStyle=chAdj(c,.45);g.lineWidth=.7;g.stroke();
  if(tips.length){const[tx,ty]=tips.reduce((a,b)=>b[1]<a[1]?b:a);g.fillStyle='#e8e0d0';g.beginPath();g.moveTo(tx-.6,ty+.4);g.lineTo(tx+1.6,ty-1.8);g.lineTo(tx+.8,ty+.8);g.closePath();g.fill();g.lineWidth=.5;g.strokeStyle=O0;g.stroke()}}
/* ---------- โล่หลัง (นักรบสายทมิฬ) ---------- */
function awShield(pts){g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=.7;g.beginPath();g.moveTo(pts[0]+.8,pts[1]+1.2);g.lineTo(pts[2]-.6,pts[3]+1);g.stroke();if(!LOWQ)hRiv([[-11,-10.6],[-3.4,-12.4],[-12,7],[-2.6,6.4]],'#c8ccd4')}
const AWCAPE={'#070a24':1};
function awPg(Pg,P,fl){return function(pts,c,st){Pg(pts,c,st);if(!AWV.on)return;try{
  if((c===P.capeD||AWCAPE[c])&&pts.length>=8&&pts[1]<=-8.5&&pts[3]===pts[1]&&Math.abs(pts[0]+pts[2])<.01)awCapeShade(pts,c,fl);
  else if((c==='#3a0606'||c==='#1a0826')&&pts.length>=16)awBatShade(pts,c);
  else if(c==='#4a5462')awShield(pts)}catch(e){awErr(e)}}}
/* awkBack3 เรียก AWB3[cls] ตรง ๆ → ห่อที่ awkBack3 ครอบได้หมด */
/* ---------- ปีกขนนก ---------- */
{const old=c3Wing;c3Wing=function(s,t,n,len,col,a,flap,src){if(!AWV.on||a<.8||src||LOWQ)return old.apply(this,arguments);try{g.save();g.scale(s,1);const base='rgb('+col+')';
  for(let i=n-1;i>=0;i--){const an=-.5-i*.28+Math.sin(t*3)*flap,L=len*(1-i*.1);g.save();g.translate(3,-9+i*1.2);g.rotate(an);
    const gr=g.createLinearGradient(0,0,L,0);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(.75,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba(200,190,170,'+a+')');g.fillStyle=gr;
    g.beginPath();g.moveTo(0,-1.6);g.quadraticCurveTo(L*.6,-4,L,0);g.quadraticCurveTo(L*.6,2.4,0,2);g.closePath();g.fill();g.lineWidth=.45;g.strokeStyle='rgba(120,90,40,.55)';g.stroke();
    g.strokeStyle='rgba(150,120,70,.5)';g.lineWidth=.35;g.beginPath();g.moveTo(.6,0);g.quadraticCurveTo(L*.5,-1.3,L*.92,0);g.stroke();g.restore()}g.restore();AWV.n++}catch(e){awErr(e);g.restore();return old.apply(this,arguments)}};c3Wing.old=old}
/* ---------- เขา / หมวก / มงกุฎ ---------- */
function awHorns(bxL,bxR,y,len,c,tip,glow){hHorn(-1,bxL,y,c,len,tip);hHorn(1,bxR,y,c,len*.95,tip);if(glow&&!LOWQ){g.save();g.globalCompositeOperation='lighter';for(const[x,yy]of[[bxL-len*.78,y-len],[bxR+len*.74,y-len*.95]])glowAt(x,yy,2.6,glow,.9);g.restore()}}
{const old=awkHead;awkHead=function(cls,hy,t,hd,P,Pg,E){if(!AWV.on||cls!=='melee')return old.apply(this,arguments);g.save();try{awHorns(-4.4,6,hy-4.4,10.5,'#2a1414','#ff4a2a','255,80,40');g.restore();AWV.n++;return}catch(e){awErr(e);g.restore()}return old.apply(this,arguments)};awkHead.old=old}
{const old=awkHead3;awkHead3=function(cls,hy,t,hd,P,Pg,E){if(!AWV.on||cls!=='melee'||AWH3.melee)return old.apply(this,arguments);g.save();try{
    hPlume(.4,hy-9.6,'#2a4aa8',t,13);hDome(hy,'#5e6a7a',{rx:9,ry:8.4,cy:hy-1.2,y1:hy+2});
    const V=[[-2,hy-3.6],[10.2,hy-3.8],[10.6,hy-.6],[-2,hy-.6]];hF(V,'#14181e',hy-3.8,hy-.6,.6);g.fillStyle='rgba(140,200,255,.95)';g.fillRect(2,hy-2.7,6.4,1.1);
    hBand(P.trim,hy-1.2,1.6);hRiv([[-6.4,hy-5],[-4,hy-7.6]],'#c8ccd4');g.restore();AWV.n++;return}catch(e){awErr(e);g.restore()}return old.apply(this,arguments)};awkHead3.old=old}
AWH3.mage=(f=>function(hy,t,hd,P,Pg,E){if(!AWV.on)return f.apply(this,arguments);g.save();try{awHorns(-4,6,hy-6.2,8.4,'#2a0a08','#ff7a3a','255,120,40');g.restore();
    g.save();if(!LOWQ){g.globalCompositeOperation='lighter';glowAt(2.5,hy-.9,2.4,'255,120,40',.8);glowAt(6.5,hy-.9,2.4,'255,120,40',.8)}g.restore();AWV.n++;return}catch(e){awErr(e);g.restore()}return f.apply(this,arguments)})(AWH3.mage);
{const old=c3Head;c3Head=function(cls,b,hy,t,hd,P){const k=cls+b;if(!AWV.on||!(k==='melee1'||k==='melee2'||k==='sup2'||k==='mage2'))return old.apply(this,arguments);const top=hy-(hd?15:11);g.save();try{
    if(k==='melee1'){hCrown(top+3.4,'#ffcf4a','#ff2a2a',{h:.62});alGem(1,top+1.2,1.3,'#ff2a2a',1)}
    else if(k==='melee2'){hWing(-1,-6.4,top+3.6,'#fffaf0',t,.85);hWing(1,8,top+3.6,'#fffaf0',t,.85);hF([[-6.2,top+1.6],[8.2,top+1.6],[8.2,top+3.4],[-6.2,top+3.4]],'#ffd84a',top+1.6,top+3.4,.7);alGem(1,top+2.5,1,'#5ad0ff',0)}
    else if(k==='sup2'){const C=[[-6.2,top+3.4],[-5.4,top-3.4],[-2.2,top],[1,top-5.6],[4.2,top],[7.4,top-3.4],[8.2,top+3.4]];hF(C,'#2a1238',top-5.6,top+3.4,.9);if(!LOWQ){pcP(C);g.fillStyle=alHG();g.fill()}
      g.strokeStyle='#c080ff';g.lineWidth=.7;g.beginPath();g.moveTo(-6,top+2.4);g.lineTo(8,top+2.4);g.stroke();alGem(1,top-.6,1.3,'#ff78d8',1);if(!LOWQ){g.globalCompositeOperation='lighter';const q=(t*.8)%1;glowAt(1+Math.sin(t*3)*2,top-6-q*8,2.2,'200,140,255',1-q)}}
    else{awHorns(-4.6,6.2,top+4,10.4,'#2a1008','#ff6a2a','255,140,40')}
    g.restore();AWV.n++;return}catch(e){awErr(e);g.restore()}return old.apply(this,arguments)};c3Head.old=old}
/* ห่อผ้าคลุม/ปีกหลัง */
{for(const n of['awkBack','awkBack3','c3Back']){try{const o=eval(n),W=function(){if(!AWV.on)return o.apply(this,arguments);const a=Array.prototype.slice.call(arguments),c3=n==='c3Back',iPg=c3?4:3,iP=c3?3:2,iFl=c3?6:5;a[iPg]=awPg(a[iPg],a[iP]||{},a[iFl]||0);AWV.n++;return o.apply(this,a)};W.old=o;
  if(n==='awkBack')awkBack=W;else if(n==='awkBack3')awkBack3=W;else c3Back=W}catch(e){awErr(e)}}}
