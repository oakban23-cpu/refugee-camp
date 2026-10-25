/* ===== v521 ตัวละครผู้เล่น ช่วง 2: หน้าตา · ผม · ฮู้ด · ร่างพื้นฐาน
   ตาใหม่ (ขนตาบน ม่านตาไล่สี ประกาย 2 จุด) ใช้ทั้งตาปกติและตามสีหน้า (chEyes) · ปาก + แก้มชมพูนุ่ม · หูด้านหลัง (นักรบ) · เงาหน้า/คอ
   ผมนักรบมีชั้นเงา+เส้นผม · ผมนักเวทมีหน้าม้า+ปอยข้าง · ฮู้ด (ธนู/นักฆ่า/ซัพ/พ่อค้า) มีซับในเข้มรอบหน้า ขอบฮู้ด ตะเข็บ หน้าม้าเป็นปอย
   ข้อมือแขนหลัง · รองเท้าพื้นฐานตอนไม่ใส่รองเท้า · ทุกจุด error → แบบเดิม (PCV.on=0 ปิด) ===== */
const PCV={on:1,err:'',n:0};
function pcErr(e){PCV.err=String(e&&e.stack||e).slice(0,300)}
const PCHOOD={archer:1,assn:1,sup:1,merchant:1},PCHG={};
function pcP(P){g.beginPath();g.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++){const p=P[i];if(p[0]==='q')g.quadraticCurveTo(p[1],p[2],p[3],p[4]);else g.lineTo(p[0],p[1])}g.closePath()}
function pcF(P,c,y0,y1,st){pcP(P);g.fillStyle=chSh(c,y0,y1);g.fill();if(st){g.lineWidth=st;g.strokeStyle=O0;g.stroke()}}
function pcL(P,c,w){if(LOWQ&&w<=.8)return;g.beginPath();g.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++){const p=P[i];if(p[0]==='q')g.quadraticCurveTo(p[1],p[2],p[3],p[4]);else g.lineTo(p[0],p[1])}g.strokeStyle=c;g.lineWidth=w;g.stroke()}
/* ---------- ฮู้ด (หลังหัว) ---------- */
function pcHood(cls,hy,P){try{if(!PCV.on||!PCHOOD[cls])return false;const sup=cls==='sup',pt=cls==='archer'||cls==='assn';
  const back=[[-9.6,hy+7],['q',-11.4,hy-2,-7.2,hy-8.6],pt?['q',-6,hy-12.6,-1.4,hy-11.2]:['q',-4.6,hy-11.6,1,hy-11.2],['q',8.4,hy-10.6,10.2,hy-3.6],['q',11,hy+3,7.6,hy+8.4],['q',0,hy+10,-9.6,hy+7]];
  pcF(back,P.cape,hy-11,hy+9,1.1);
  /* ซับในเข้มรอบหน้า (หัววาดทับ → เห็นเป็นขอบลึก) */g.beginPath();g.ellipse(.9,hy+.4,8.7,8.5,0,0,7);g.fillStyle=P.capeD;g.fill();
  if(!LOWQ){g.beginPath();g.ellipse(.9,hy+.4,8.7,8.5,0,0,7);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=.8;g.stroke()}
  pcL([[-8.8,hy-1],['q',-8.4,hy-7.6,-3,hy-10.2]],'rgba(255,255,255,.22)',.9);
  return true}catch(e){pcErr(e);return false}}
/* ---------- หัว: เงา + หู ---------- */
function pcNeck(hy){if(!PCV.on||LOWQ)return;try{g.beginPath();g.ellipse(1.2,hy+7.6,4.6,1.7,0,0,7);g.fillStyle='rgba(0,0,0,.24)';g.fill()}catch(e){pcErr(e)}}
function pcHead(cls,hy,P,HH){if(!PCV.on)return;try{
  if(!LOWQ){const k=Math.round(hy*10);let G=PCHG[k];if(!G){G=g.createRadialGradient(3.2,hy-3.4,.5,1.4,hy+.6,9.4);G.addColorStop(0,'rgba(255,255,255,.2)');G.addColorStop(.35,'rgba(255,255,255,0)');G.addColorStop(.72,'rgba(150,70,50,0)');G.addColorStop(1,'rgba(150,70,50,.26)');PCHG[k]=G}g.beginPath();g.ellipse(.8,hy,7.6,7.4,0,0,7);g.fillStyle=G;g.fill()}
  if(!PCHOOD[cls]&&cls!=='mage'){g.beginPath();g.ellipse(-5.6,hy+1.6,1.7,2.3,-.15,0,7);g.fillStyle=chSh(P.skin,hy-.7,hy+3.9);g.fill();g.lineWidth=.9;g.strokeStyle=O0;g.stroke();pcL([[-5.2,hy+.4],['q',-6.2,hy+1.6,-5.2,hy+2.8]],'rgba(150,70,50,.55)',.55)}
  }catch(e){pcErr(e)}}
/* ---------- ผม ---------- */
function pcHairT(cls,hy,hs,t,P){if(!PCV.on)return false;try{
  if(cls==='melee'){const sp=[[-8.5,hy+1],[-8.2,hy-7],[-4,hy-11+hs*.3],[1,hy-10],[4.5,hy-13.5+hs*.5],[6.5,hy-9],[10,hy-8+hs*.4],[9,hy-2],[6,hy-4.5],[4,hy-2.5],[1,hy-5],[-2,hy-4],[-5,hy-1]];
      pcF([[-9,hy+.4],[-9.6,hy-5],[-6,hy-10],[2,hy-11.6],[8.6,hy-8.4],[9.6,hy-4],[2,hy-6],[-5,hy-3]],chAdj(P.hair,-.35),hy-12,hy+1,0);
      pcF(sp,P.hair,hy-13.5,hy+1,1.1);
      pcF([[-8.5,hy-2],[-12-hs,hy+1],[-8,hy+3]],P.hair,hy-2,hy+3,1);
      /* ปอยข้างหน้าหู */pcF([[-7.2,hy-2],[-5.2,hy-2.4],[-5.6,hy+3.6],[-7,hy+1.6]],P.hair,hy-2.4,hy+3.6,.8);
      if(!LOWQ){pcL([[-5,hy-6],['q',-1,hy-8.6,2.6,hy-9.6]],chAdj(P.hair,-.4),.6);pcL([[-1.6,hy-4.8],['q',2,hy-7,5.4,hy-6.6]],chAdj(P.hair,-.4),.6);pcL([[2.6,hy-5.4],['q',5.6,hy-6.6,8.4,hy-5]],chAdj(P.hair,-.4),.5)}
      pcL([[-4,hy-8],['q',0,hy-10,3.5,hy-11.5]],'rgba(255,255,255,.5)',1);pcL([[-6,hy-5],[-3,hy-7]],'rgba(255,255,255,.4)',.8);pcL([[5.2,hy-9.2],[6.6,hy-10.4]],'rgba(255,255,255,.35)',.6);
      return true}
  if(cls==='mage'){/* หน้าม้าเป็นปอย + ปอยข้างยาว */
      const fr=[[-7.8,hy-1.6],[-6.6,hy-7],[6.4,hy-7.2],[9.6,hy-2],[8,hy-1.4],[7,hy-3.6],[5.6,hy-1.6],[4.6,hy-4],[3,hy-2.4],[1.8,hy-4.4],[0,hy-2.6],[-1.4,hy-4.4],[-3.6,hy-2.8],[-5.2,hy-3.8]];
      pcF(fr,P.hair,hy-7.2,hy-1.4,.9);
      for(const sd of[-1,1]){const bx=sd>0?8.6:-6.6,pt=[[bx-1.7,hy-3],['q',bx+sd*1.6+hs,hy+3,bx+hs*1.4,hy+9.6],['q',bx+sd*.4+hs*.6,hy+4,bx+1.7,hy-3]];pcF(pt,P.hair,hy-3,hy+9.6,.8);pcL([[bx-.3,hy-1.6],['q',bx+sd*1+hs*.6,hy+3,bx+hs*1.1,hy+7.6]],'rgba(255,255,255,.4)',.55)}
      if(!LOWQ)for(const xx of[-4.6,-.4,3.8,6.8])pcL([[xx,hy-6.6],[xx+.6,hy-3.6]],chAdj(P.hair,-.25),.5);
      return true}
  if(PCHOOD[cls]){/* ขอบฮู้ดด้านหน้า + หน้าม้า */
      const fr=[[-4.4,hy-6.6],[6.4,hy-6.8],[7.4,hy-2.2],[5.8,hy-4.2],[4.8,hy-1.8],[3.4,hy-4.4],[2,hy-2],[.6,hy-4.4],[-.8,hy-2.2],[-2.2,hy-4.6],[-3.6,hy-2.8]];
      pcF(fr,P.hair,hy-6.8,hy-1.8,.8);if(!LOWQ){pcL([[-1.4,hy-6],[-.6,hy-3.4]],chAdj(P.hair,-.35),.5);pcL([[2.4,hy-6],[3,hy-3.2]],chAdj(P.hair,-.35),.5);pcL([[-2.6,hy-6.1],['q',1,hy-6.9,5,hy-6.2]],'rgba(255,255,255,.4)',.6)}
      if(cls!=='assn')pcF([[7,hy-4],[8.6,hy-3.6],[8.4,hy+2.6],[7.4,hy+1]],P.hair,hy-4,hy+2.6,.7);
      const brim=[[-8.2,hy-1.2],['q',-8.4,hy-8.4,-1,hy-9.8],['q',6.6,hy-10.2,9.4,hy-4.2],[9.6,hy-2.2],['q',6.4,hy-6.8,1,hy-7],['q',-4.8,hy-6.8,-6.2,hy-.8]];
      pcF(brim,P.cape,hy-10,hy-1,1);pcL([[-7.4,hy-1.6],['q',-7.2,hy-7.6,-1,hy-8.9],['q',5.8,hy-9.2,8.8,hy-4]],'rgba(255,255,255,.3)',.6);
      if(!LOWQ)pcL([[-1.2,hy-9.6],['q',-3.4,hy-11,-5.4,hy-10]],'rgba(0,0,0,.3)',.6);
      return true}
  return false}catch(e){pcErr(e);return false}}
/* ---------- ตา (ทั้งปกติและตามสีหน้า) ---------- */
function pcEye1(ex,hy,ec,bl,lx,ly,glow,O){g.fillStyle='#ffffff';g.beginPath();g.ellipse(ex,hy+.15,1.55,2.1*bl,0,0,7);g.fill();
  if(bl>.5){lx*=.6;ly*=.6;if(glow&&!LOWQ){g.shadowColor=glow;g.shadowBlur=5}
    g.fillStyle=ec;g.beginPath();g.ellipse(ex+.22+lx,hy+.45+ly,1.2,1.62,0,0,7);g.fill();g.shadowBlur=0;
    if(!LOWQ){g.fillStyle=chAdj(ec,-.42);g.beginPath();g.ellipse(ex+.22+lx,hy+.45+ly,1.2,1.62,0,Math.PI,0);g.lineTo(ex+1.42+lx,hy-.15+ly);g.lineTo(ex-.98+lx,hy-.15+ly);g.fill();g.fillStyle=chAdj(ec,.45);g.globalAlpha=.75;g.beginPath();g.ellipse(ex+.3+lx,hy+1.45+ly,.8,.38,0,0,7);g.fill();g.globalAlpha=1}
    g.fillStyle=O;g.beginPath();g.ellipse(ex+.3+lx,hy+.55+ly,.58,.92,0,0,7);g.fill();
    g.fillStyle='#ffffff';g.beginPath();g.ellipse(ex-.3+lx,hy-.55+ly,.48,.55,0,0,7);g.fill();g.beginPath();g.arc(ex+.75+lx,hy+1.25+ly,.24,0,7);g.fill();
    g.strokeStyle=O;g.lineWidth=1.05;g.beginPath();g.moveTo(ex-1.75,hy-.9);g.quadraticCurveTo(ex-.2,hy-2.35,ex+1.7,hy-1.35);g.stroke();
    g.lineWidth=.5;g.beginPath();g.moveTo(ex+1.55,hy-1.4);g.lineTo(ex+2.15,hy-1.9);g.stroke()}
  else{g.strokeStyle=O;g.lineWidth=.9;g.beginPath();g.moveTo(ex-1.5,hy+.3);g.quadraticCurveTo(ex,hy+1.1,ex+1.5,hy+.3);g.stroke()}}
function pcMouth(k,hy,O){g.lineCap='round';
  if(k==='hurt'){g.fillStyle='#5a1a1a';g.beginPath();g.ellipse(4.7,hy+4.4,1.05,1.25,0,0,7);g.fill();return}
  if(k==='happy'){g.fillStyle='#7a2a22';g.beginPath();g.moveTo(3.4,hy+3.6);g.quadraticCurveTo(4.7,hy+3.9,6,hy+3.6);g.quadraticCurveTo(5.8,hy+5.6,4.7,hy+5.6);g.quadraticCurveTo(3.6,hy+5.6,3.4,hy+3.6);g.fill();g.fillStyle='#ff9a8a';g.beginPath();g.ellipse(4.8,hy+5,.7,.4,0,0,7);g.fill();return}
  if(k==='fever'){g.strokeStyle=O;g.lineWidth=.8;g.beginPath();g.moveTo(3.4,hy+4.1);g.lineTo(6,hy+3.6);g.stroke();return}
  if(k==='low'){g.strokeStyle='#6a2a20';g.lineWidth=.6;g.beginPath();g.moveTo(3.8,hy+4.6);g.quadraticCurveTo(4.7,hy+3.9,5.6,hy+4.5);g.stroke();return}
  if(k==='cast'){g.fillStyle='#6a2a20';g.beginPath();g.ellipse(4.8,hy+4.2,.55,.65,0,0,7);g.fill();return}
  g.strokeStyle='#6a2a20';g.lineWidth=.6;g.beginPath();g.moveTo(3.9,hy+3.9);g.quadraticCurveTo(4.7,hy+4.7,5.5,hy+3.8);g.stroke()}
function pcEyes(cls,c2,b2,hy,t,x,O,E){if(cls==='assn')return false;const k=E?E.k:'n',ec=chEye(cls,c2,b2),lx=E?(E.lx||0)*.35:0,ly=E?(E.ly||0)*.3:0;
  const brow=(ex,i)=>{g.strokeStyle=O;g.lineWidth=.75;g.beginPath();
    if(k==='fever'){if(!i){g.moveTo(ex-1.5,hy-3);g.lineTo(ex+1.4,hy-1.8)}else{g.moveTo(ex-1.4,hy-1.8);g.lineTo(ex+1.5,hy-3)}}
    else if(k==='low'){if(!i){g.moveTo(ex-1.5,hy-2.2);g.lineTo(ex+1.4,hy-3.3)}else{g.moveTo(ex-1.4,hy-3.3);g.lineTo(ex+1.5,hy-2.2)}}
    else{g.moveTo(ex-1.5,hy-2.8);g.quadraticCurveTo(ex,hy-3.3,ex+1.4,hy-3)}g.stroke()};
  if(k==='hurt'){g.strokeStyle=O;g.lineWidth=.95;for(const[ex,sd]of[[2.5,1],[6.5,-1]]){g.beginPath();g.moveTo(ex-1.3*sd,hy-1.1);g.lineTo(ex+1.1*sd,hy+.2);g.lineTo(ex-1.3*sd,hy+1.4);g.stroke()}pcMouth(k,hy,O);return true}
  if(k==='happy'){g.strokeStyle=O;g.lineWidth=1;for(const ex of[2.5,6.5]){g.beginPath();g.moveTo(ex-1.5,hy+.8);g.quadraticCurveTo(ex,hy-1.7,ex+1.5,hy+.8);g.stroke()}pcMouth(k,hy,O);return true}
  const glow=k==='fever'?'#ff3a2a':k==='cast'?ec:null,ic=k==='fever'?'#ff5a3a':ec;
  for(let i=0;i<2;i++){const ex=i?6.5:2.5,bl=((t*.31+(x*.013))%4)<.12&&k!=='fever'&&k!=='cast'?.25:1;pcEye1(ex,hy,ic,bl,lx,ly,glow,O);brow(ex,i)}
  if(k==='fever'){g.strokeStyle='rgba(255,60,40,.9)';g.lineWidth=.6;g.beginPath();g.moveTo(-2.5,hy-4.5);g.lineTo(-1.2,hy-3.4);g.moveTo(-2.6,hy-3.3);g.lineTo(-1.3,hy-4.6);g.stroke()}
  if(k==='low'){const q=(t*.8)%1;g.fillStyle='rgba(150,220,255,'+(.9-q*.5)+')';g.beginPath();g.moveTo(9.6,hy-4+q*3);g.quadraticCurveTo(11,hy-1.6+q*3,9.6,hy-1+q*3);g.quadraticCurveTo(8.2,hy-1.6+q*3,9.6,hy-4+q*3);g.fill()}
  pcMouth(k,hy,O);PCV.n++;return true}
function pcEyesSafe(cls,c2,b2,hy,t,x,O,E){if(!PCV.on)return false;g.save();try{const r=pcEyes(cls,c2,b2,hy,t,x,O,E);g.restore();return r}catch(e){g.restore();pcErr(e);return false}}
/* แก้มชมพูนุ่ม (แทนสี่เหลี่ยม) */
function pcCheek(cls,hy){if(!PCV.on)return false;try{g.fillStyle='rgba(240,120,110,'+(LOWQ?.3:.34)+')';g.beginPath();g.ellipse(1.1,hy+3,1.45,.72,0,0,7);g.fill();g.beginPath();g.ellipse(7.5,hy+3,1.15,.68,0,0,7);g.fill();return true}catch(e){pcErr(e);return false}}
{const old=chEyes;chEyes=function(cls,c2,b2,hy,t,x,O){if(PCV.on&&CHE&&pcEyesSafe(cls,c2,b2,hy,t,x,O,CHE))return true;return old.apply(this,arguments)};chEyes.old=old}
/* ---------- แขน / รองเท้าพื้นฐาน ---------- */
function pcCuff(P){if(!PCV.on)return;try{g.fillStyle=chSh(P.trim,5,6.6);g.fillRect(-1.75,5,3.5,1.6);g.lineWidth=.6;g.strokeStyle=O0;g.strokeRect(-1.75,5,3.5,1.6)}catch(e){pcErr(e)}}
function pcShoes(la,ra){if(!PCV.on)return;try{for(const[bx,l,ix]of[[-5.9-BSX,la,0],[.8+BSX,ra,1]]){g.beginPath();g.roundRect(bx,11.6-l,5.2+(ix?1.4:0),3,[1.2,2,1.2,1.2]);g.fillStyle=chSh('#4a3428',11.6-l,14.6-l);g.fill();g.lineWidth=.9;g.strokeStyle=O0;g.stroke();g.fillStyle='rgba(255,255,255,.25)';g.fillRect(bx+.8,12.1-l,2.4,.6)}}catch(e){pcErr(e)}}
