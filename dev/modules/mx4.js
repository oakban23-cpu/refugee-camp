/* ===================== v555 · แผนที่โฉมใหม่ ช่วงที่ 2: หมู่เกาะตะวันตก (แมพ 12–18) =====================
   ลวดลายพื้นเดิมของแต่ละแมพ (อิฐหินฟ้า · ทางหินในสวน · แผ่นทองเหลืองหมุดย้ำ · หญ้าริมทะเลสาบ · หินชนวน · หินทรายลมพัด · หินอ่อนวิหาร) วาดละเอียดขึ้น
   ของ "ต้นไม้" เดิมแต่ละแมพ (เสาหินลมกัดเซาะ · ไม้ประดับ/รูปปั้น · เสานาฬิกา/เฟือง · หลิว/กก · ผลึกสายฟ้า · สนลู่ลม/แท่งหิน · เสาวิหารหัก) → สไปรต์มีมิติ ตัวแปร v เดิมทุกตัว */
const mxMP=k=>{try{return gxHex(MAPS[curMap][k])}catch(e){return[90,90,90]}};
const mxWV=t=>Math.abs(Math.round(t.x*7+t.y*3))%4;/* ตัวแปรเดียวกับ westTree เดิม */

/* ---------- ของประดับพื้นทั่วไปตามสีแมพ (d1/d2) · ตำแหน่ง/ชนิดเดิม ---------- */
MXDC.gen={
 0:o=>{const d1=mxMP('d1');return[mxTuftSpr('gd0'+curMap,[mxMix(d1,MXK,.4),mxMix(d1,MXW,.08),mxMix(d1,MXW,.32)],8,6,curMap*7+1),.7+o.k*.55]},
 1:o=>{const c=mxMP('d2');return[mxDSpr('gd1'+curMap,12,11,(x,w,h)=>{x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.ellipse(6.8,9,4.6,1.6,0,0,7);x.fill();const gr=x.createRadialGradient(4.6,3.6,.4,6,5.6,5);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.45)));gr.addColorStop(.6,mxRgb(c));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.35)));
   x.fillStyle=gr;x.beginPath();x.arc(6,5.6,4.4,0,7);x.fill();x.strokeStyle=mxRgb(mxMix(c,MXK,.55),.6);x.lineWidth=.5;x.stroke();x.fillStyle='#231d26';x.beginPath();x.ellipse(4.3,5.6,.9,1.1,0,0,7);x.ellipse(7.5,5.6,.9,1.1,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.ellipse(4.4,3.3,1.4,.6,-.3,0,7);x.fill()}),.85+o.k*.25]},
 3:o=>{const c=mxMP('d2');return[mxDSpr('gd3'+curMap,13,8,(x,w,h)=>{for(const[px,py,r]of[[5,4,2.6],[9.4,5.4,1.7]]){x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(px+.7,py+1.1,r,r*.55,0,0,7);x.fill();const gr=x.createLinearGradient(px-r,py-r,px+r,py+r);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.35),.85));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.3),.85));x.fillStyle=gr;x.beginPath();x.ellipse(px,py,r,r*.7,0,0,7);x.fill()}}),.75+o.k*.5]},
 4:o=>{const c=mxMP('d1');return[mxDSpr('gd4'+curMap,20,7,(x,w,h)=>{x.lineCap='round';x.strokeStyle=mxRgb(mxMix(c,MXK,.45),.85);x.lineWidth=1.5;x.beginPath();x.moveTo(1,3.5);x.lineTo(7,4.6);x.lineTo(12,2.6);x.lineTo(19,4);x.moveTo(7,4.6);x.lineTo(8,6.2);x.stroke();x.strokeStyle=mxRgb(mxMix(c,MXW,.45),.35);x.lineWidth=.5;x.beginPath();x.moveTo(1,4.4);x.lineTo(7,5.5);x.lineTo(12,3.5);x.stroke()}),.8+o.k*.4]}};
MXU.gen=[()=>{const d1=mxMP('d1');return mxTuftSpr('gu0'+curMap,[mxMix(d1,MXK,.45),mxMix(d1,MXW,.05),mxMix(d1,MXW,.3)],10,6,curMap*13+5)},()=>{const t=mxMP('tile');return mxStoneSpr('gu1'+curMap,mxMix(t,MXW,.12),6,4.4,{sharp:1})},
  ()=>{const d1=mxMP('d1');return mxTuftSpr('gu2'+curMap,[mxMix(d1,MXK,.5),mxMix(d1,MXK,.1),mxMix(d1,MXW,.18)],7,4,curMap*17+9)}];

/* ---------- สไปรต์ร่วม ---------- */
/* เสาหินชั้น (ลมกัดเซาะ/หินทราย): แถบชั้นหินกว้างแคบสลับ · ขอบชั้นรับแสง · ซีกขวาเงา · ฝุ่น/หิมะตามหิ้ง */
function mxStrataSpr(key,r,v,P){return mxSprite(key+r+'|'+v,r*2,r*3.4,r,r*3.4-r*.18,(x,w,h)=>{const R=gxRng(r*53+v*311+(P.sd||1)),cx=w/2,by=h-r*.18,H=r*(P.h||2.4)*(.92+R()*.16),n=P.n||5;
  x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.ellipse(cx+r*.18,by,r*.85,r*.2,0,0,7);x.fill();
  const L=[];let yy=by;for(let i=0;i<n;i++){const hh=H/n*(.75+R()*.5),wb=r*(P.w||.7)*(i===0?1.08:.72+R()*.42)*(1-i*.06),wt=wb*(.82+R()*.28);L.push([yy,yy-hh,wb,wt,(R()-.5)*r*.12]);yy-=hh}
  for(let i=0;i<L.length;i++){const[y0,y1,wb,wt,ox]=L[i],c=mxMix(P.c[i%2],P.c[2]||P.c[0],R()*.3);
    const gr=x.createLinearGradient(cx-wb+ox,0,cx+wb+ox,0);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.22)));gr.addColorStop(.45,mxRgb(c));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.42)));x.fillStyle=gr;
    x.beginPath();x.moveTo(cx-wb+ox,y0+.5);x.quadraticCurveTo(cx-wb*1.06+ox,(y0+y1)/2,cx-wt+ox,y1);x.lineTo(cx+wt+ox,y1);x.quadraticCurveTo(cx+wb*1.04+ox,(y0+y1)/2,cx+wb+ox,y0+.5);x.closePath();x.fill();
    x.strokeStyle=mxRgb(mxMix(c,MXK,.55),.55);x.lineWidth=.8;x.beginPath();x.moveTo(cx-wb+ox,y0);x.lineTo(cx+wb+ox,y0);x.stroke();
    x.fillStyle=mxRgb(mxMix(c,MXW,.35),.55);x.fillRect(cx-wt+ox+1,y1,wt*1.3,1.2);
    for(let k=0;k<3;k++){x.strokeStyle='rgba(0,0,0,.22)';x.lineWidth=.6;const px=cx+ox+(R()-.3)*wb;x.beginPath();x.moveTo(px,y1+2);x.lineTo(px+(R()-.5)*2,y0-2);x.stroke()}
    if(P.ledge){x.fillStyle=P.ledge;x.beginPath();x.ellipse(cx-wt*.25+ox,y1+.6,wt*.8,1.8,0,0,7);x.fill()}}
  const top=L[L.length-1];if(P.cap){x.fillStyle=P.cap;x.beginPath();x.ellipse(cx+top[4]-top[3]*.1,top[1]+1,top[3]*1.05,r*.16,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.ellipse(cx+top[4]-top[3]*.35,top[1],top[3]*.45,r*.06,0,0,7);x.fill()}
  for(let i=0;i<5;i++){const a=R()*3.14,d=r*(.75+R()*.35);mxRockMini(x,cx+Math.cos(a)*d*(R()<.5?-1:1),by-1+R()*2,1.5+R()*2,P.c[0])}
  if(P.lich){x.fillStyle=P.lich;for(let i=0;i<10;i++){x.beginPath();x.ellipse(cx+(R()-.6)*r*.9,by-R()*H*.8,1+R()*1.4,.7,0,0,7);x.fill()}}})}
function mxRockMini(x,X,Y,s,c){x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.ellipse(X+s*.3,Y+s*.4,s*1.1,s*.5,0,0,7);x.fill();const gr=x.createLinearGradient(X-s,Y-s,X+s,Y+s);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.25)));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.35)));x.fillStyle=gr;x.beginPath();x.ellipse(X,Y,s,s*.68,0,0,7);x.fill()}
/* แท่งหินทรงเดิม (ฐานกว้าง ยอดเอียงแหลม · หน้าขวาเงา) + ชั้นหิน ขอบหิ้ง ฝุ่น/หิมะ · ใช้กับแมพ 12 และ 17 */
function mxFangSpr(key,r,v,P){return mxSprite(key+r+'|'+v,r*2.2,r*3.1,r*1.1,r*3.1-r*.3,(x,w,h)=>{const R=gxRng(r*37+v*13+(P.sd||3)),bx=w/2,by=h-r*.3,W=r*P.w,Hh=r*P.h*(.94+R()*.12),c1=P.c1,c2=P.c2,O='#1a1612';
  x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.ellipse(bx+r*.2,by,W*1.15,r*.22,0,0,7);x.fill();
  const A=[[bx-W,by],[bx-W*.7,by-Hh*.7],[bx-W*.2,by-Hh],[bx+W*.5,by-Hh*.85],[bx+W,by]],pth=Q=>{x.beginPath();Q.forEach(([u,q],i)=>i?x.lineTo(u,q):x.moveTo(u,q));x.closePath()};
  let gr=x.createLinearGradient(bx-W,by-Hh,bx+W*.4,by);gr.addColorStop(0,mxRgb(mxMix(c1,MXW,.22)));gr.addColorStop(.6,mxRgb(c1));gr.addColorStop(1,mxRgb(mxMix(c1,MXK,.18)));x.fillStyle=gr;pth(A);x.fill();
  const Bf=[[bx-W*.2,by-Hh],[bx+W*.5,by-Hh*.85],[bx+W,by],[bx+W*.15,by]];gr=x.createLinearGradient(bx,0,bx+W,0);gr.addColorStop(0,mxRgb(c2));gr.addColorStop(1,mxRgb(mxMix(c2,MXK,.3)));x.fillStyle=gr;pth(Bf);x.fill();
  x.save();pth(A);x.clip();const n=5+(R()*3|0);for(let i=1;i<n;i++){const yy=by-Hh*i/n+(R()-.5)*3,tl=(R()-.5)*.08;x.strokeStyle='rgba(0,0,0,.22)';x.lineWidth=1.1;x.beginPath();x.moveTo(bx-W*1.1,yy+1.2);x.lineTo(bx+W*1.1,yy+1.2+tl*W*2);x.stroke();x.strokeStyle=mxRgb(mxMix(c1,MXW,.45),.35);x.lineWidth=.8;x.beginPath();x.moveTo(bx-W*1.1,yy);x.lineTo(bx+W*1.1,yy+tl*W*2);x.stroke();
    if(P.ledge&&R()<.75){x.fillStyle=P.ledge;x.beginPath();x.ellipse(bx-W*(.1+R()*.4),yy-.6,W*(.18+R()*.22),1.3,tl,0,7);x.fill()}}
  for(let i=0;i<7;i++){x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(bx+(R()-.5)*W*1.4,by-R()*Hh*.9,1.2+R()*1.6,.8+R(),0,0,7);x.fill()}x.restore();
  x.strokeStyle=O;x.lineWidth=1;pth(A);x.stroke();x.strokeStyle='rgba(255,255,255,.3)';x.lineWidth=1.2;x.beginPath();x.moveTo(bx-W+1.5,by-2);x.lineTo(bx-W*.7+1.2,by-Hh*.7);x.lineTo(bx-W*.2+.6,by-Hh+1.5);x.stroke();
  if(P.cap){x.fillStyle=P.cap;x.beginPath();x.moveTo(bx-W*.75,by-Hh*.66);x.lineTo(bx-W*.2,by-Hh-1);x.lineTo(bx+W*.5,by-Hh*.85-1);x.lineTo(bx+W*.42,by-Hh*.78);x.quadraticCurveTo(bx,by-Hh*.86,bx-W*.32,by-Hh*.72);x.quadraticCurveTo(bx-W*.55,by-Hh*.6,bx-W*.75,by-Hh*.66);x.fill()}
  if(P.lich){x.fillStyle=P.lich;for(let i=0;i<8;i++){x.beginPath();x.ellipse(bx-W*.6+R()*W*.8,by-R()*Hh*.6,1+R()*1.3,.7,0,0,7);x.fill()}}
  for(let i=0;i<5;i++){const a=R();mxRockMini(x,bx+(a<.5?-1:1)*W*(.85+R()*.4),by-1+R()*2,1.4+R()*2,c1)}})}
/* ลวดลายร่วม: เมฆปุย (ไล่เฉด) ใช้กับเสาหินฟ้า */
function mxPuffSpr(){return mxSprite('puff',60,26,30,13,(x,w,h)=>{for(const[px,py,rx,ry,a]of[[16,15,13,7,.8],[30,12,15,9,.9],[44,15,12,7,.8],[30,17,20,6,.6]]){const gr=x.createRadialGradient(px-rx*.3,py-ry*.5,1,px,py,rx);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(.7,'rgba(236,244,252,'+a*.85+')');gr.addColorStop(1,'rgba(210,226,240,0)');x.fillStyle=gr;x.beginPath();x.ellipse(px,py,rx,ry,0,0,7);x.fill()}})}

/* ===================== 12 · สะพานลมตะวันตก (อิฐหินฟ้า 48 + หมอกเมฆ) ===================== */
MXC[12]={k:'w12',amp:100,sc:620,lit:[255,255,250],shd:[34,48,80],kl:.28,ks:.26,ao:.4,ff:.04,cs:.16,cla:.13,clv:16,gw:.85,gwc:'255,250,236',gcc:'50,70,120',base:'w120',ug:'gen',tree:'w12',tby:.5,uby:.5,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'w122',c:f=>mxSS(.63,.7,(1-f.h)*.6+f.q*.4),e:-2},
  {t:'w123',c:f=>mxSS(.64,.7,f.w*.5+f.h*.5),e:0}]};
MXDC.w12=MXDC.gen;
Object.assign(MXT,{
 w120:B=>{B.fill([96,106,122]);B.bricks(48,[148,160,176],[120,132,150],{jw:1.2,bev:.16,var:12,chip:.1,crk:.18,rad:2.4});B.blob(34,[236,244,252],[100,112,130],14,46,.1,.2);
   B.stroke((x,R,W8,S)=>{for(let i=0;i<10;i++){const px=R()*S,py=R()*S,rx=26+R()*16,ry=7+R()*5;W8(px,py,rx+4,(X,Y)=>{const gr=x.createRadialGradient(X,Y,0,X,Y,rx);gr.addColorStop(0,'rgba(255,255,255,.2)');gr.addColorStop(1,'rgba(255,255,255,0)');x.save();x.translate(X,Y);x.scale(1,ry/rx);x.translate(-X,-Y);x.fillStyle=gr;x.beginPath();x.arc(X,Y,rx,0,7);x.fill();x.restore()})}});
   B.gcrack(9,'rgba(40,50,70,.42)',.8,30,0,'rgba(240,248,255,.2)');B.sparks(120,['rgba(255,255,255,.55)','rgba(220,236,255,.4)'],.6,.9);B.grain(1200,.04,.05)},
 w121:B=>{B.fill([222,232,242]);B.blob(30,[250,252,255],[180,196,214],12,36,.22,.36);B.drifts(18,12,30,{sh:'rgba(80,100,140,.16)',hi:'rgba(255,255,255,.7)'});B.sparks(220,['rgba(255,255,255,.9)','rgba(200,226,255,.6)'],.6,1)},
 w122:B=>{B.fill([84,96,112]);B.bricks(48,[136,148,164],[108,120,138],{jw:1.3,bev:.15,var:14,chip:.3,crk:.5,rad:2});B.blob(30,[120,150,110],[90,120,96],4,12,.25,.4);B.speck(70,[[150,176,130],[120,150,110]],.5,1.3,.7);B.grain(1200,.04,.06)},
 w123:B=>{B.clumps(70,[[90,104,96],[120,136,122],[170,186,176],[226,236,240]],3,6,{k:5,cr:2.8,tip:[250,252,255]});B.sparks(60,['rgba(255,255,255,.8)'],.6,.9)}});
MXNS.w12={rim:[96,108,128],sp:[220,230,240],gl:'200,230,255'};
MXTR.w12=(t,r,sw,now)=>{const v=mxWV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2;
  mxBlit(mxFangSpr('w12f',rr,v,{c1:[154,164,178],c2:[110,120,136],w:.7,h:2.4,ledge:'rgba(250,252,255,.8)',cap:'rgba(248,251,255,.92)',lich:'rgba(150,180,140,.55)',sd:12}),x,y+r*.5,r/rr,0);
  if(v<2){const w=Math.sin(T*3+x)*3;g.strokeStyle='#5a4a3a';g.lineWidth=1.4;g.beginPath();g.moveTo(x,y-r*1.85);g.lineTo(x,y-r*2.6);g.stroke();g.fillStyle=v?'#4a8ad0':'#e8f0f8';g.beginPath();g.moveTo(x,y-r*2.6);g.quadraticCurveTo(x+10,y-r*2.6+w,x+20,y-r*2.5+w);g.lineTo(x,y-r*2.3);g.closePath();g.fill();g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.moveTo(x,y-r*2.45);g.quadraticCurveTo(x+10,y-r*2.45+w,x+19,y-r*2.48+w);g.lineTo(x,y-r*2.3);g.closePath();g.fill()}
  const cy=y-r*.2+Math.sin(T+x)*1.5,P=mxPuffSpr(),q=r/60;g.drawImage(P.c,x-r*.6-30*q*1.05,cy-13*q*1.05,60*q*1.05,26*q*1.05);g.drawImage(P.c,x+r*.5-30*q*.92,cy+2-13*q*.92,60*q*.92,26*q*.92)};

/* ===================== 13 · สวนลอยฟ้าร้าง (หญ้าเขียว + ทางหินเก่า + กลีบชมพู) ===================== */
MXC[13]={k:'w13',amp:120,sc:620,lit:[255,248,226],shd:[14,34,22],kl:.34,ks:.24,ao:.5,ff:.1,cs:.26,dap:.16,cla:.12,gw:1.2,base:'w130',ug:'w13',tree:'w13',tby:.6,uby:.62,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'w131',c:f=>mxSS(.6,.7,f.m*.45+(1-f.h)*.35+f.d*.35),e:-8},
  {t:'w132',c:f=>mxSS(.62,.7,f.w)*(1-mxSS(.3,.6,f.d))*mxSS(.36,.48,f.h),e:0}]};
MXDC.w13=MXDC.gen;
Object.assign(MXT,{
 w130:B=>{B.fill([50,86,46]);B.blob(40,[74,120,62],[36,66,34],16,46,.22,.36);
   B.carpet(2000,[[30,56,28],[38,70,34],[48,84,40]],2.4,4.6,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(3000,[[34,64,30],[48,88,40],[64,108,50],[86,132,62],[112,158,76],[140,184,94]],3.4,7.4,{per:10,cr:7,w:.95,tip:[206,238,150]});
   B.stroke((x,R,W8,S)=>{for(let i=0;i<12;i++){const px=R()*S,py=R()*S,w=16+R()*8,h=9+R()*5,ro=(R()-.5)*.4,c=[176+R()*24|0,170+R()*20|0,152+R()*20|0];W8(px,py,w,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(ro);x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.roundRect(-w/2+1,-h/2+1.6,w,h,3.2);x.fill();
     const gr=x.createLinearGradient(-w/2,-h/2,w/3,h/2);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.22)));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.22)));x.fillStyle=gr;x.beginPath();x.roundRect(-w/2,-h/2,w,h,3.2);x.fill();x.strokeStyle='rgba(60,90,40,.6)';x.lineWidth=1;x.stroke();
     x.fillStyle='rgba(84,130,58,.75)';x.beginPath();x.ellipse(-w*.3,h*.32,w*.22,h*.16,0,0,7);x.ellipse(w*.36,-h*.3,w*.14,h*.12,0,0,7);x.fill();x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=.5;x.beginPath();x.moveTo(-w*.1,-h*.4);x.lineTo(w*.05,0);x.lineTo(-w*.05,h*.35);x.stroke();x.restore()})}});
   B.petals(70,['rgba(255,170,210,.85)','rgba(255,245,250,.8)','rgba(255,200,226,.8)']);B.flower(10,[['rgba(255,196,224,1)','#fff0f6'],['rgba(250,248,240,1)','#ffd860']],1,3,7)},
 w131:B=>{B.fill([30,56,32]);B.blob(36,[42,74,40],[20,42,26],12,40,.26,.4);B.carpet(1900,[[16,34,20],[22,46,26],[30,58,32]],2.6,5,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(2800,[[20,42,24],[32,62,34],[46,82,42],[62,104,54],[86,130,70]],4,9,{per:10,cr:7,w:.95,tip:[156,200,124]});B.fern(14,[44,90,46],[58,108,56],7,12);B.petals(20,['rgba(255,170,210,.7)'])},
 w132:B=>{B.flower(46,[['rgba(255,190,220,1)','#fff0f6'],['rgba(250,248,240,1)','#ffd860'],['rgba(255,150,196,1)','#ffe0ee'],['rgba(220,190,255,1)','#fff6d0']],3,6,10);B.petals(40,['rgba(255,170,210,.85)','rgba(255,245,250,.8)'])},
 w133:B=>{B.fill([60,76,52]);B.bricks(32,[150,148,132],[120,120,108],{jw:1.4,bev:.15,var:14,chip:.25,crk:.3,rad:2.2});B.blob(40,[80,130,60],[54,100,46],4,12,.35,.55);B.clumps(40,[[40,80,34],[64,110,50],[100,150,70]],2,4,{k:4,cr:2,w:.8});B.petals(16,['rgba(255,170,210,.75)'])}});
MXU.w13=[()=>mxTuftSpr('w13u0',[[26,54,26],[50,92,42],[86,132,62]],11,7,131),()=>mxDSpr('w13u1',16,12,(x,w,h)=>{const R=gxRng(133);for(let i=0;i<5;i++){const px=3+R()*10,py=4+R()*6;x.strokeStyle='#3e7a32';x.lineWidth=.7;x.beginPath();x.moveTo(px,py+3);x.lineTo(px,py);x.stroke();x.fillStyle=i%2?'#ffb4d8':'#fff4fa';for(let p=0;p<5;p++){const a=p*1.257;x.beginPath();x.arc(px+Math.cos(a)*1.1,py+Math.sin(a)*.9,.85,0,7);x.fill()}x.fillStyle='#ffd860';x.beginPath();x.arc(px,py,.5,0,7);x.fill()}}),
  ()=>mxStoneSpr('w13u2',[170,166,150],7,5,{top:[96,150,66],ta:.7})];
MXNS.w13={rim:[86,70,46],sp:[255,208,232],gl:'255,120,160',bone:[236,228,214]};
function mxStatueSpr(r,v){return mxSprite('stat'+r+'|'+v,r*1.8,r*2.6,r*.9,r*2.6-r*.2,(x,w,h)=>{const cx=w/2,by=h-r*.2,R=gxRng(r*17+v*5+1);
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(cx+r*.12,by-r*.02,r*.6,r*.17,0,0,7);x.fill();
  const pl=(x0,y0,ww,hh)=>{const gr=x.createLinearGradient(x0,0,x0+ww,0);gr.addColorStop(0,'#e0d8c6');gr.addColorStop(.4,'#c8c0ae');gr.addColorStop(1,'#8e8676');x.fillStyle=gr;x.fillRect(x0,y0,ww,hh);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(x0,y0,ww,1.2);x.strokeStyle='rgba(40,36,30,.6)';x.lineWidth=.8;x.strokeRect(x0,y0,ww,hh)};
  pl(cx-r*.42,by-r*.62,r*.84,r*.62);pl(cx-r*.36,by-r*.74,r*.72,r*.14);
  const gr=x.createLinearGradient(cx-r*.4,0,cx+r*.4,0);gr.addColorStop(0,'#eee6d6');gr.addColorStop(.45,'#d2cab8');gr.addColorStop(1,'#8e8676');x.fillStyle=gr;
  x.beginPath();x.moveTo(cx-r*.34,by-r*.74);x.quadraticCurveTo(cx-r*.42,by-r*1.3,cx-r*.2,by-r*1.62);x.lineTo(cx+r*.22,by-r*1.62);x.quadraticCurveTo(cx+r*.4,by-r*1.3,cx+r*.32,by-r*.74);x.closePath();x.fill();x.strokeStyle='rgba(40,36,30,.55)';x.lineWidth=.8;x.stroke();
  x.strokeStyle='rgba(90,84,72,.5)';x.lineWidth=.6;for(let i=0;i<4;i++){x.beginPath();x.moveTo(cx-r*.22+i*r*.13,by-r*1.5);x.quadraticCurveTo(cx-r*.26+i*r*.14,by-r*1.1,cx-r*.24+i*r*.15,by-r*.76);x.stroke()}
  const hg=x.createRadialGradient(cx-r*.08,by-r*1.86,r*.04,cx,by-r*1.8,r*.26);hg.addColorStop(0,'#f6f0e2');hg.addColorStop(1,'#a8a090');x.fillStyle=hg;x.beginPath();x.arc(cx+r*.02,by-r*1.8,r*.22,0,7);x.fill();x.strokeStyle='rgba(40,36,30,.55)';x.stroke();
  x.fillStyle='#c8c0ae';x.beginPath();x.moveTo(cx+r*.22,by-r*1.5);x.lineTo(cx+r*.46,by-r*1.32);x.lineTo(cx+r*.4,by-r*1.24);x.lineTo(cx+r*.2,by-r*1.36);x.closePath();x.fill();x.stroke();
  x.strokeStyle='rgba(30,26,20,.55)';x.lineWidth=.7;x.beginPath();x.moveTo(cx-r*.1,by-r*1.58);x.lineTo(cx+r*.02,by-r*1.3);x.lineTo(cx-r*.06,by-r*1.0);x.stroke();
  x.fillStyle='#4a8a3a';for(let i=0;i<9;i++){x.beginPath();x.arc(cx-r*.42+i*r*.1+(R()-.5)*2,by-r*(.08+(i%3)*.3+R()*.12),r*(.08+R()*.06),0,7);x.fill()}x.fillStyle='#6aa850';for(let i=0;i<6;i++){x.beginPath();x.arc(cx-r*.38+i*r*.14,by-r*(.2+(i%2)*.3),r*.06,0,7);x.fill()}
  x.strokeStyle='#3e7a32';x.lineWidth=1.1;x.beginPath();x.moveTo(cx-r*.4,by-r*.1);x.bezierCurveTo(cx-r*.5,by-r*.6,cx-r*.25,by-r*.9,cx-r*.34,by-r*1.3);x.stroke();x.fillStyle='#5a9a44';for(let i=0;i<5;i++){x.beginPath();x.ellipse(cx-r*(.42-i*.02),by-r*(.3+i*.22),r*.07,r*.04,.6,0,7);x.fill()}})}
function mxGardenTreeSpr(r,v){const o=mxOakSpr('garden',r,v);return mxSprite('gtr'+r+'|'+v,o.w,o.h,o.ax,o.ay,(x,w,h)=>{x.drawImage(o.c,0,0,w,h);if(v>=2)return;const R=gxRng(r*7+v*13+5),cx=w/2,cy=h-r*.3-r*1.62;
  for(let i=0;i<34;i++){const a=R()*6.283,d=Math.sqrt(R()),px=cx+Math.cos(a)*d*r*.95,py=cy+Math.sin(a)*d*r*.82-r*.1,c=R()<.55?[255,154,200]:[255,240,246],lit=(Math.cos(a)*-.6+Math.sin(a)*-.8)*d;
    x.fillStyle='rgba(60,20,40,.25)';x.beginPath();x.arc(px+.5,py+.7,2.2,0,7);x.fill();x.fillStyle=mxRgb(lit>0?mxMix(c,MXW,.25):c);for(let p=0;p<5;p++){const aa=p*1.257+i;x.beginPath();x.arc(px+Math.cos(aa)*1.15,py+Math.sin(aa)*1,1.05,0,7);x.fill()}x.fillStyle='#ffe07a';x.beginPath();x.arc(px,py,.55,0,7);x.fill()}})}
MXTP.garden=[{o:[16,38,18],d:[34,76,32],m:[58,116,48],l:[96,162,66],hl:[176,224,112]},{o:[18,40,20],d:[36,78,36],m:[62,118,54],l:[104,164,74],hl:[184,226,124]},{o:[14,34,20],d:[30,70,34],m:[52,108,52],l:[90,154,70],hl:[168,218,118]}];
MXTR.w13=(t,r,sw)=>{const v=mxWV(t),rr=Math.round(r/2)*2;if(v===3){mxBlit(mxStatueSpr(rr,v),t.x,t.y+r*.5,r/rr,0);return}mxBlit(mxGardenTreeSpr(rr,v),t.x,t.y+r*.7,r/rr,sw*.025)};

/* ===================== 14 · หอนาฬิกาเมฆ (แผ่นทองเหลืองหมุดย้ำ 64) ===================== */
MXC[14]={k:'w14',amp:80,sc:600,lit:[255,224,170],shd:[28,16,6],kl:.26,ks:.3,ao:.5,ff:.06,cs:.2,cla:0,gw:.9,gwc:'255,214,150',gcc:'30,20,50',base:'w140',ug:'gen',tree:'w14',tby:.4,uby:.42,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'w141',c:f=>mxSS(.6,.68,f.m*.6+(1-f.h)*.4),e:-4},
  {t:'w142',c:f=>mxSS(.63,.7,f.h*.6+f.q*.4),e:3},
  {t:'w143',c:f=>mxSS(.64,.7,f.w*.6+f.m*.4),e:0}]};
MXDC.w14=MXDC.gen;
MXB.rivets=B=>(cell,c,o)=>{const {x,S,W8}=B;o=o||{};const n=Math.round(S/cell),cw=S/n,rows=n,ch=S/rows;for(let j=0;j<rows;j++){const off=(j%2)*cw/2;for(let i=0;i<n;i++){const X=i*cw+off,Y=j*ch;for(const[ox,oy]of[[5.5,5.5],[cw-5.5,5.5],[5.5,ch-5.5],[cw-5.5,ch-5.5]]){const px=((X+ox)%S+S)%S,py=Y+oy;
  W8(px,py,4,(PX,PY)=>{x.fillStyle='rgba(0,0,0,.4)';x.beginPath();x.arc(PX+.5,PY+.7,1.9,0,7);x.fill();const gr=x.createRadialGradient(PX-.6,PY-.7,.2,PX,PY,1.9);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.6)));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.35)));x.fillStyle=gr;x.beginPath();x.arc(PX,PY,1.8,0,7);x.fill()})}}}};
MXB.cogs=B=>(n,r0,r1,col,o)=>{const {x,R,W8}=B;o=o||{};for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,rr=r0+R()*(r1-r0),k=o.k||10;W8(px,py,rr+8,(X,Y)=>{x.strokeStyle=col;x.lineWidth=o.w||1.4;x.beginPath();for(let q=0;q<k*2;q++){const a=q/(k*2)*6.283,qq=q%2?rr:rr+4.5;x.lineTo(X+Math.cos(a)*qq,Y+Math.sin(a)*qq)}x.closePath();x.stroke();x.beginPath();x.arc(X,Y,rr*.35,0,7);x.stroke();
  if(o.hl){x.strokeStyle=o.hl;x.lineWidth=.6;x.beginPath();x.arc(X-.6,Y-.6,rr*.92,3.4,5.2);x.stroke()}})}};
Object.assign(MXT,{
 w140:B=>{B.fill([44,32,18]);B.bricks(64,[120,96,62],[100,78,50],{jw:1.6,bev:.2,var:14,chip:.04,crk:.1,rad:1.6});B.rivets(64,[176,140,86]);
   B.blob(26,[210,160,90],[60,40,20],14,40,.08,.18);B.cogs(6,12,22,'rgba(56,38,16,.4)',{hl:'rgba(255,220,160,.16)'});B.blob(12,[20,16,12],[30,24,16],8,22,.22,.36);
   B.stroke((x,R,W8,S)=>{for(let i=0;i<40;i++){const px=R()*S,py=R()*S,L=4+R()*10,a=R()*3.14;W8(px,py,L,(X,Y)=>{x.strokeStyle='rgba(255,230,180,.12)';x.lineWidth=.5;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*L,Y+Math.sin(a)*L);x.stroke()})}});B.grain(1400,.04,.07)},
 w141:B=>{B.fill([34,24,14]);B.bricks(64,[92,72,46],[74,56,36],{jw:1.6,bev:.16,var:16,chip:.06,crk:.2,rad:1.6});B.rivets(64,[150,118,72]);B.blob(30,[16,12,8],[26,20,14],10,26,.34,.5);B.ponds(6,6,14,'rgba(14,10,6,.5)','rgba(200,170,255,.18)');B.grain(1400,.04,.08)},
 w142:B=>{B.fill([60,44,22]);B.bricks(64,[168,134,80],[144,112,64],{jw:1.5,bev:.24,var:12,chip:.02,crk:.06,rad:1.6});B.rivets(64,[220,186,120]);B.blob(20,[255,220,150],[180,140,80],12,36,.1,.2);B.grain(1200,.05,.06)},
 w143:B=>{B.cogs(10,4,8,'rgba(70,50,22,.7)',{k:8,w:1.2,hl:'rgba(255,226,170,.35)'});B.stroke((x,R,W8,S)=>{for(let i=0;i<24;i++){const px=R()*S,py=R()*S;W8(px,py,4,(X,Y)=>{x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.arc(X+.5,Y+.6,1.6,0,7);x.fill();x.fillStyle='#b8925a';x.beginPath();x.arc(X,Y,1.5,0,7);x.fill();x.strokeStyle='rgba(50,34,14,.8)';x.lineWidth=.5;x.beginPath();x.moveTo(X-1,Y);x.lineTo(X+1,Y);x.stroke()})}})}});
MXNS.w14={rim:[80,62,40],sp:[224,190,120],gl:'255,200,110'};
function mxClockPostSpr(r,v){return mxSprite('ckp'+r+'|'+v,r*1.4,r*3.1,r*.7,r*3.1-r*.7,(x,w,h)=>{const cx=w/2,by=h-r*.7,R=gxRng(r*31+v*7);
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(cx+r*.15,by+r*.1,r*.6,r*.16,0,0,7);x.fill();
  const body=x.createLinearGradient(cx-r*.38,0,cx+r*.38,0);body.addColorStop(0,'#a07e50');body.addColorStop(.32,'#7a5e3a');body.addColorStop(1,'#3e2c18');x.fillStyle=body;x.fillRect(cx-r*.38,by-r*2,r*.76,r*2.4);
  x.strokeStyle='rgba(30,20,10,.5)';x.lineWidth=.6;for(let k=1;k<4;k++){x.beginPath();x.moveTo(cx-r*.38+k*r*.19,by-r*1.95);x.lineTo(cx-r*.38+k*r*.19,by+r*.35);x.stroke()}
  x.fillStyle='rgba(255,230,180,.18)';x.fillRect(cx-r*.34,by-r*1.95,r*.08,r*2.3);x.strokeStyle='#1a1612';x.lineWidth=1;x.strokeRect(cx-r*.38,by-r*2,r*.76,r*2.4);
  const band=(yy,hh)=>{const gr=x.createLinearGradient(0,yy,0,yy+hh);gr.addColorStop(0,'#f0cc80');gr.addColorStop(.5,'#c89a4a');gr.addColorStop(1,'#7a5a26');x.fillStyle=gr;x.fillRect(cx-r*.5,yy,r,hh);x.strokeStyle='#2a1a0a';x.lineWidth=.8;x.strokeRect(cx-r*.5,yy,r,hh);
    x.fillStyle='#3a2810';for(let k=0;k<4;k++){x.beginPath();x.arc(cx-r*.38+k*r*.25,yy+hh/2,.9,0,7);x.fill()}};
  band(by-r*2.1,r*.22);band(by+r*.3,r*.18);band(by-r*.75,r*.1);
  if(v<2){const fy=by-r*1.45,fr=r*.32;x.fillStyle='#2a1a0a';x.beginPath();x.arc(cx,fy,fr+1.6,0,7);x.fill();const fg=x.createRadialGradient(cx-fr*.3,fy-fr*.3,1,cx,fy,fr);fg.addColorStop(0,'#fffaf0');fg.addColorStop(1,'#d8ccb0');x.fillStyle=fg;x.beginPath();x.arc(cx,fy,fr,0,7);x.fill();
    x.strokeStyle='#3a2a12';x.lineWidth=.7;for(let k=0;k<12;k++){const a=k/12*6.283;x.beginPath();x.moveTo(cx+Math.cos(a)*fr*.78,fy+Math.sin(a)*fr*.78);x.lineTo(cx+Math.cos(a)*fr*(k%3?.9:.68),fy+Math.sin(a)*fr*(k%3?.9:.68));x.stroke()}
    x.strokeStyle='#c89a4a';x.lineWidth=1.2;x.beginPath();x.arc(cx,fy,fr+.8,0,7);x.stroke();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.ellipse(cx-fr*.35,fy-fr*.4,fr*.42,fr*.18,-.5,0,7);x.fill()}
  else{x.fillStyle='#2a1a0a';x.beginPath();x.arc(cx,by-r*1.2,r*.12,0,7);x.fill()}})}
function mxGearSpr(r){return mxSprite('gear'+r,r*1.3,r*1.3,r*.65,r*.65,(x,w,h)=>{const c=w/2,R1=r*.56,R0=r*.42,n=16;x.save();x.translate(c,c);x.beginPath();for(let i=0;i<n;i++){const a0=i/n*6.283,a1=(i+.5)/n*6.283;x.lineTo(Math.cos(a0-.08)*R0,Math.sin(a0-.08)*R0);x.lineTo(Math.cos(a0+.04)*R1,Math.sin(a0+.04)*R1);x.lineTo(Math.cos(a1-.04)*R1,Math.sin(a1-.04)*R1);x.lineTo(Math.cos(a1+.08)*R0,Math.sin(a1+.08)*R0)}x.closePath();
  const gr=x.createLinearGradient(-R1,-R1,R1,R1);gr.addColorStop(0,'#f0cc80');gr.addColorStop(.5,'#b8904a');gr.addColorStop(1,'#6a4a1e');x.fillStyle=gr;x.fill();x.strokeStyle='#1a1612';x.lineWidth=1;x.stroke();
  for(let i=0;i<5;i++){const a=i/5*6.283;x.fillStyle='rgba(40,26,10,.75)';x.beginPath();x.arc(Math.cos(a)*R0*.58,Math.sin(a)*R0*.58,R0*.16,0,7);x.fill()}
  x.strokeStyle='rgba(255,240,200,.45)';x.lineWidth=.8;x.beginPath();x.arc(0,0,R0*.84,3.5,5.4);x.stroke();x.fillStyle='#5a4228';x.beginPath();x.arc(0,0,r*.16,0,7);x.fill();x.fillStyle='#e0c080';x.beginPath();x.arc(-r*.04,-r*.04,r*.06,0,7);x.fill();x.restore()})}
MXTR.w14=(t,r,sw,now)=>{const v=mxWV(t),x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2,k=r/rr;mxBlit(mxClockPostSpr(rr,v),x,y,k,0);
  if(v<2){g.strokeStyle='#2a1a0a';g.lineCap='round';g.lineWidth=1.6;g.beginPath();g.moveTo(x,y-r*1.45);g.lineTo(x+Math.cos(T)*r*.24,y-r*1.45+Math.sin(T)*r*.24);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(x,y-r*1.45);g.lineTo(x+Math.cos(T/12)*r*.16,y-r*1.45+Math.sin(T/12)*r*.16);g.stroke();g.fillStyle='#c89a4a';g.beginPath();g.arc(x,y-r*1.45,1.4,0,7);g.fill();g.lineCap='butt'}
  else{const G=mxGearSpr(rr);g.save();g.translate(x,y-r*1.2);g.rotate(T*(v===2?.8:-.8));g.drawImage(G.c,-G.ax*k,-G.ay*k,G.w*k,G.h*k);g.restore()}
  const s=Math.sin(T*1.3+x);if(s>.6){const q=(s-.6)/.4,yy=y-r*2.3-((T*20+x)%20);const gr=g.createRadialGradient(x+r*.2,yy,0,x+r*.2,yy,6);gr.addColorStop(0,'rgba(240,240,248,'+(.45*q)+')');gr.addColorStop(1,'rgba(240,240,248,0)');g.fillStyle=gr;g.beginPath();g.arc(x+r*.2,yy,6,0,7);g.fill()}};

/* ===================== 15 · ทะเลสาบดาวตก (หญ้าเขียวอมฟ้า + ทรายขาว + ประกายดาว) ===================== */
MXC[15]={k:'w15',amp:110,sc:620,lit:[236,255,250],shd:[8,30,40],kl:.3,ks:.26,ao:.5,ff:.08,cs:.24,dap:.14,cla:.1,gw:1,gwc:'236,255,246',gcc:'20,40,90',base:'w150',ug:'w15',tree:'w15',tby:.6,uby:.6,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'w152',c:f=>mxSS(.6,.7,f.d*.4+(1-f.h)*.35+f.m*.25),e:-6},
  {t:'w153',c:f=>mxSS(.64,.71,f.w),e:0}]};
MXDC.w15=MXDC.gen;
Object.assign(MXT,{
 w150:B=>{B.fill([48,90,88]);B.blob(40,[80,146,132],[30,66,66],12,46,.2,.34);B.blob(10,[210,206,170],[180,176,140],10,24,.16,.26);
   B.carpet(1900,[[26,58,58],[34,70,68],[42,82,78]],2.4,4.4,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(2900,[[30,66,64],[42,88,82],[58,110,98],[80,138,118],[108,166,140],[140,196,166]],3.2,7,{per:10,cr:7,w:.95,tip:[200,250,226]});
   B.sparks(60,['rgba(255,248,200,.85)','rgba(220,255,250,.7)'],1,1.6);B.flower(8,[['rgba(230,250,255,1)','#fff8c0'],['rgba(170,220,255,1)','#ffffff']],1,3,7)},
 w151:B=>{B.fill([204,198,164]);B.blob(30,[226,220,186],[176,170,136],12,36,.2,.32);B.ripple(14,'rgba(255,255,240,.3)','rgba(110,100,70,.2)',22,1.1,-.2);B.shells(8);B.peb(30,[170,164,136],[220,214,186],.6,1.6,.26);B.sparks(80,['rgba(255,255,240,.8)'],.6,1);B.grain(1400,.05,.05)},
 w152:B=>{B.fill([24,52,54]);B.blob(30,[36,70,70],[16,40,42],12,36,.26,.4);B.carpet(1800,[[14,36,38],[20,46,48],[28,58,58]],2.6,5,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(2600,[[18,44,46],[28,64,62],[42,86,80],[60,112,100],[86,142,124]],4,9,{per:10,cr:7,w:.95,tip:[150,220,196]});B.clumps(14,[[60,90,50],[90,124,70],[130,160,96]],8,13,{k:5,cr:2.4,w:1.1,ln:1})},
 w153:B=>{B.sparks(150,['rgba(255,250,210,.9)','rgba(210,255,250,.8)','rgba(190,220,255,.7)'],.7,1.4);B.stroke((x,R,W8,S)=>{for(let i=0;i<16;i++){const px=R()*S,py=R()*S;W8(px,py,8,(X,Y)=>{const gr=x.createRadialGradient(X,Y,0,X,Y,6);gr.addColorStop(0,'rgba(220,255,250,.5)');gr.addColorStop(1,'rgba(220,255,250,0)');x.fillStyle=gr;x.fillRect(X-6,Y-6,12,12);x.fillStyle='#fffbe0';x.beginPath();x.arc(X,Y,.9,0,7);x.fill()})}})}});
MXU.w15=[()=>mxTuftSpr('w15u0',[[22,56,52],[46,96,86],[90,148,126]],12,7,151),()=>mxDSpr('w15u1',14,16,(x,w,h)=>{x.lineCap='round';for(let i=0;i<4;i++){const bx=4+i*2.2,hh=10+i%2*3;x.strokeStyle=i%2?'#5a8a4a':'#7aa860';x.lineWidth=1.1;x.beginPath();x.moveTo(bx,h-1);x.quadraticCurveTo(bx+1,h-hh*.5,bx+1.6,h-hh);x.stroke();if(i%2===0){x.fillStyle='#7a4e28';x.beginPath();x.ellipse(bx+1.6,h-hh,1.1,2.6,0,0,7);x.fill()}}}),
  ()=>mxStoneSpr('w15u2',[150,170,160],6,4.4,{top:[90,150,120],ta:.6})];
MXNS.w15={rim:[70,96,90],sp:[224,255,248],gl:'140,255,230'};
MXTP.willow=[{o:[10,32,30],d:[22,62,56],m:[40,96,82],l:[74,138,112],hl:[150,206,170]},{o:[12,34,28],d:[26,66,54],m:[46,102,80],l:[84,146,108],hl:[164,214,160]},{o:[10,30,32],d:[20,58,60],m:[36,90,88],l:[68,130,118],hl:[140,200,180]}];
function mxWillowSpr(r,v){const o=mxOakSpr('willow',r,v);return mxSprite('wil'+r+'|'+v,o.w,o.h+r*.4,o.ax,o.ay,(x,w,h)=>{x.drawImage(o.c,0,0,o.w,o.h);const R=gxRng(r*11+v*29+3),cx=w/2,cy=o.h-r*.3-r*1.62,P=MXTP.willow[v%3];x.lineCap='round';
  for(let i=0;i<26;i++){const a=Math.PI*(.05+R()*.9),sx=cx+Math.cos(a)*r*1.0*(R()<.5?-1:1),sy=cy+Math.sin(a)*r*.2-r*.1+R()*r*.4,L=r*(.8+R()*.7),cl=R()<.4?P.l:P.m;
    x.strokeStyle=mxRgb(mxMix(cl,MXK,.2),.9);x.lineWidth=1.1;x.beginPath();x.moveTo(sx,sy);x.quadraticCurveTo(sx+(R()-.5)*4,sy+L*.5,sx+(R()-.5)*6,sy+L);x.stroke();
    for(let k=1;k<6;k++){const t=k/6,px=sx+(R()-.5)*3*t,py=sy+L*t;x.fillStyle=mxRgb(k%2?cl:P.hl,.85);x.beginPath();x.ellipse(px+1,py,1.5,.7,1,0,7);x.ellipse(px-1,py+.6,1.5,.7,-1,0,7);x.fill()}}})}
MXTR.w15=(t,r,sw,now)=>{const v=mxWV(t),x=t.x,y=t.y,T=now/1000;
  if(v===3){g.lineCap='round';for(let i=0;i<7;i++){const a=-.5+i*.17,h=r*(1.2+((i*7)%3)*.25),s2=Math.sin(T*1.5+i+x)*2;g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2.4;g.beginPath();g.moveTo(x+a*r+1,y+r*.4+1);g.quadraticCurveTo(x+a*r+s2+1,y-h*.5,x+a*r*1.4+s2*1.5+1,y-h);g.stroke();
      g.strokeStyle=i%2?'#4e8040':'#7aa860';g.lineWidth=2;g.beginPath();g.moveTo(x+a*r,y+r*.4);g.quadraticCurveTo(x+a*r+s2,y-h*.5,x+a*r*1.4+s2*1.5,y-h);g.stroke();g.strokeStyle='rgba(200,240,170,.5)';g.lineWidth=.6;g.beginPath();g.moveTo(x+a*r-.5,y+r*.3);g.quadraticCurveTo(x+a*r+s2-.5,y-h*.5,x+a*r*1.4+s2*1.5-.5,y-h);g.stroke();
      if(i%3===0){const hx=x+a*r*1.4+s2*1.5,hy=y-h;const gr=g.createLinearGradient(hx-2,0,hx+2,0);gr.addColorStop(0,'#a87040');gr.addColorStop(1,'#5a3418');g.fillStyle=gr;g.beginPath();g.ellipse(hx,hy,2.2,5.2,0,0,7);g.fill()}}g.lineCap='butt';
    if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x+r*.4,y,12,'255,240,170',.4+.2*Math.sin(T*2+x));g.restore()}return}
  const rr=Math.round(r*1.05/2)*2;mxBlit(mxWillowSpr(rr,v),x,y+r*.74,r*1.05/rr,sw*.02)};

/* ===================== 16 · ป่าผลึกสายฟ้า (หินชนวนมืด 44 + รอยร้าวเรืองฟ้า) ===================== */
MXC[16]={k:'w16',amp:90,sc:600,lit:[200,232,255],shd:[4,8,22],kl:.24,ks:.34,ao:.5,ff:.06,cs:.2,cla:.07,clv:20,gw:.6,gwc:'200,230,255',gcc:'10,10,50',base:'w160',ug:'w16',tree:'w16',tby:.45,uby:.48,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'w161',c:f=>mxSS(.62,.7,(1-f.h)*.6+f.m*.4),e:-5},
  {t:'w162',c:f=>mxSS(.64,.7,f.h*.6+f.q*.4),e:3},
  {t:'w163',c:f=>mxSS(.62,.7,f.w*.6+f.m*.4),e:0}]};
MXDC.w16=MXDC.gen;
Object.assign(MXT,{
 w160:B=>{B.fill([20,26,38]);B.bricks(44,[52,64,86],[42,52,72],{jw:1.1,bev:.12,var:10,chip:.08,crk:.2,rad:2});B.blob(36,[60,84,124],[10,14,24],12,42,.12,.26);
   B.gcrack(14,'rgba(150,214,255,.6)',1,36,'rgba(120,200,255,.12)');B.shards(30,4,10,'rgba(120,190,240,.8)','rgba(4,8,20,.5)');B.rings(12,4,10,'rgba(170,220,255,.16)');B.sparks(80,['rgba(200,236,255,.5)'],.6,1);B.grain(1200,.03,.07)},
 w161:B=>{B.fill([16,22,34]);B.bricks(44,[44,56,78],[36,46,66],{jw:1.1,bev:.1,var:10,chip:.08,crk:.15,rad:2});B.ponds(12,8,20,'rgba(30,50,80,.55)','rgba(170,220,255,.24)');B.rings(18,4,12,'rgba(190,230,255,.22)');B.grain(1000,.03,.07)},
 w162:B=>{B.fill([18,22,32]);B.bricks(44,[48,56,74],[36,42,58],{jw:1.4,bev:.1,var:14,chip:.3,crk:.6,rad:1.6});B.gcrack(20,'rgba(170,226,255,.7)',1,30,'rgba(120,200,255,.16)');B.peb(30,[50,60,80],[86,100,124],.7,2,.32);B.grain(1000,.03,.07)},
 w163:B=>{B.clumps(40,[[30,70,80],[50,110,120],[90,170,180],[170,236,240]],2.5,5.5,{k:4,cr:2.4,w:.8,tip:[210,250,255]});B.sparks(50,['rgba(200,240,255,.7)'],.6,1)}});
MXU.w16=[()=>mxStoneSpr('w16u0',[70,84,108],6,4.4,{sharp:1}),()=>mxDSpr('w16u1',10,12,(x,w,h)=>{x.fillStyle='rgba(4,8,20,.4)';x.beginPath();x.ellipse(5.6,10.6,3.6,1,0,0,7);x.fill();x.fillStyle='#8ad0ff';x.beginPath();x.moveTo(3,10.4);x.lineTo(4.6,2);x.lineTo(6.4,10.4);x.closePath();x.fill();x.fillStyle='#3a6ab0';x.beginPath();x.moveTo(4.6,2);x.lineTo(6.4,10.4);x.lineTo(5,10.4);x.closePath();x.fill()}),
  ()=>mxTuftSpr('w16u2',[[24,40,52],[40,64,80],[70,100,120]],9,5,161)];
MXNS.w16={rim:[40,52,74],sp:[180,226,255],gl:'140,210,255'};
function mxSpireSpr(r,v){return mxSprite('spr'+r+'|'+v,r*2.2,r*3.2,r*1.1,r*3.2-r*.6,(x,w,h)=>{const cx=w/2,by=h-r*.6,R=gxRng(r*41+v*3);
  x.fillStyle='rgba(2,6,16,.4)';x.beginPath();x.ellipse(cx+r*.12,by-r*.05,r*.95,r*.26,0,0,7);x.fill();const rk=x.createLinearGradient(cx-r*.9,0,cx+r*.9,0);rk.addColorStop(0,'#46546e');rk.addColorStop(.5,'#2a3448');rk.addColorStop(1,'#151b28');x.fillStyle=rk;x.beginPath();x.ellipse(cx,by-r*.1,r*.9,r*.34,0,0,7);x.fill();x.fillStyle='rgba(200,230,255,.12)';x.beginPath();x.ellipse(cx-r*.3,by-r*.24,r*.4,r*.1,0,0,7);x.fill();
  const sp=(bx,bb,ww,hh,c1,c2)=>{const tx=bx+(R()-.5)*ww*.3,ty=bb-hh;x.fillStyle=c1;x.beginPath();x.moveTo(bx-ww,bb);x.lineTo(tx,ty);x.lineTo(bx+ww*.15,bb+1);x.closePath();x.fill();x.fillStyle=c2;x.beginPath();x.moveTo(tx,ty);x.lineTo(bx+ww,bb);x.lineTo(bx+ww*.15,bb+1);x.closePath();x.fill();
    x.strokeStyle='#0a1a2a';x.lineWidth=1;x.beginPath();x.moveTo(bx-ww,bb);x.lineTo(tx,ty);x.lineTo(bx+ww,bb);x.stroke();x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=.8;x.beginPath();x.moveTo(tx,ty+2);x.lineTo(bx-ww*.45,bb-hh*.15);x.stroke();
    x.fillStyle='rgba(230,248,255,.35)';x.beginPath();x.moveTo(tx-.5,ty+3);x.lineTo(bx-ww*.55,bb-1);x.lineTo(bx-ww*.25,bb-1);x.closePath();x.fill()};
  sp(cx-r*.4,by-r*.1,r*.3,r*1.6,'#5aa0e0','#3462a8');sp(cx+r*.35,by-r*.05,r*.26,r*1.2,'#7ac0f0','#4478b8');sp(cx,by,r*.38,r*2.3,'#8ad0ff','#3e80c8');
  for(let i=0;i<4;i++){const a=R()*3.14;sp(cx+Math.cos(a)*r*.7*(R()<.5?-1:1),by-r*.02,r*.08,r*(.25+R()*.2),'#9ad8ff','#4a88c8')}})}
MXTR.w16=(t,r,sw,now)=>{const x=t.x,y=t.y,T=now/1000,rr=Math.round(r/2)*2;mxBlit(mxSpireSpr(rr,mxWV(t)),x,y+r*.5,r/rr,0);
  const fl=Math.sin(T*7+x*.3);if(fl>.7){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(220,245,255,.9)';g.lineWidth=1.4;g.beginPath();g.moveTo(x-r*.4,y-r*1.1);g.lineTo(x-r*.1,y-r*1.4);g.lineTo(x+r*.1,y-r*1.2);g.lineTo(x+r*.35,y-r*.7);g.stroke();g.restore()}
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-r*1.2,r*1.4,'140,210,255',.16+.08*Math.sin(T*2+x));g.restore()}};

/* ===================== 17 · หุบเหวลมหวน (หินทรายลมพัด + หญ้าแห้งลู่ลม) ===================== */
MXC[17]={k:'w17',amp:150,sc:660,lit:[255,240,212],shd:[56,36,22],kl:.34,ks:.28,ao:.45,ff:.06,cs:.22,cla:.12,clv:22,gw:1.1,gwc:'255,226,176',gcc:'80,56,96',base:'w170',ug:'w17',tree:'w17',tby:.5,uby:.5,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'w171',c:f=>mxSS(.62,.7,f.h*.65+f.q*.35)*.7,e:6},
  {t:'w172',c:f=>mxSS(.66,.72,f.w*.6+f.q*.4)*(1-mxSS(.55,.7,f.h)),e:0},
  {t:'w173',c:f=>mxSS(.64,.7,f.m*.6+(1-f.h)*.4),e:-3}]};
MXDC.w17=MXDC.gen;
Object.assign(MXT,{
 w170:B=>{B.fill([122,106,82]);B.blob(46,[200,180,140],[90,76,56],14,48,.12,.26);B.gcrack(10,'rgba(40,30,20,.62)',1.6,46,0,'rgba(255,240,210,.18)');
   B.carpet(700,[[118,108,70],[146,134,86],[176,166,112],[204,194,140]],3,6,{per:8,cr:6,w:.85,ln:3.2,hv:.3});
   B.stroke((x,R,W8,S)=>{for(let i=0;i<20;i++){const px=R()*S,py=R()*S;W8(px,py,30,(X,Y)=>{x.strokeStyle='rgba(255,250,235,.12)';x.lineWidth=2;x.beginPath();x.moveTo(X-24,Y);x.quadraticCurveTo(X,Y-4,X+24,Y);x.stroke();x.strokeStyle='rgba(80,60,40,.1)';x.lineWidth=1.4;x.beginPath();x.moveTo(X-22,Y+2);x.quadraticCurveTo(X,Y-2,X+22,Y+2);x.stroke()})}});
   B.peb(40,[130,116,92],[184,170,140],.7,2.2,.3);B.grain(1800,.05,.06)},
 w171:B=>{B.fill([150,128,96]);B.blob(30,[176,152,116],[118,98,72],12,36,.2,.32);B.waves(12,1.5,3,{lt:'rgba(255,240,210,.22)',dk:'rgba(90,64,40,.2)',wd:2,wl:1.2});B.gcrack(16,'rgba(70,50,30,.5)',.9,30,0,'rgba(255,236,200,.18)');B.grain(1600,.05,.06)},
 w172:B=>{B.clumps(140,[[112,100,62],[146,134,84],[180,170,114],[214,204,150]],4,8,{k:6,cr:3.2,w:.9,ln:4.2,tip:[246,236,196]})},
 w173:B=>{B.peb(220,[110,98,80],[176,162,136],.6,2.2,.34);B.shard(60,[120,106,86],[172,158,132],.9,2.4,.3)}});
MXU.w17=[()=>mxTuftSpr('w17u0',[[110,98,60],[150,138,88],[196,186,132]],11,6,171),()=>mxStoneSpr('w17u1',[150,134,108],7,5,{sharp:1}),()=>mxStoneSpr('w17u2',[126,112,90],5,3.6,{sharp:1})];
MXNS.w17={rim:[110,94,70],sp:[255,240,200],gl:'255,170,90',bone:[236,228,208]};
function mxWindPineSpr(r,v){return mxSprite('wpn'+r+'|'+v,r*3,r*2.8,r*1.2,r*2.8-r*.5,(x,w,h)=>{const R=gxRng(r*13+v*7),bx=r*1.2,by=h-r*.5,lean=6+(v%2)*2;
  x.fillStyle='rgba(30,20,10,.3)';x.beginPath();x.ellipse(bx+r*.5,by-r*.05,r*1.05,r*.22,0,0,7);x.fill();
  const tg=x.createLinearGradient(bx-r*.15,0,bx+r*.15,0);tg.addColorStop(0,'#7a5638');tg.addColorStop(1,'#3a2416');x.strokeStyle=tg;x.lineCap='round';x.lineWidth=r*.24;x.beginPath();x.moveTo(bx,by-r*.1);x.quadraticCurveTo(bx+lean*.4,by-r*1.1,bx+lean,by-r*2.1);x.stroke();
  x.strokeStyle='#3a2416';x.lineWidth=r*.08;x.beginPath();x.moveTo(bx+lean*.3,by-r*.9);x.lineTo(bx+lean*.3+r*.5,by-r*1.05);x.stroke();
  for(let i=0;i<4;i++){const yy=by-r*(.5+i*.4),ww=r*(1.15-i*.2),cx=bx+lean*(.3+i*.2),c1=i%2?[46,74,44]:[60,88,52];
    x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.moveTo(cx-ww*.4+1,yy+1.5);x.lineTo(cx+ww*1.1+1,yy-r*.08+1.5);x.lineTo(cx+ww*.2+1,yy-r*.42+1.5);x.closePath();x.fill();
    const gr=x.createLinearGradient(cx-ww*.4,yy-r*.4,cx+ww,yy);gr.addColorStop(0,mxRgb(mxMix(c1,[200,230,140],.35)));gr.addColorStop(.5,mxRgb(c1));gr.addColorStop(1,mxRgb(mxMix(c1,MXK,.35)));x.fillStyle=gr;
    x.beginPath();x.moveTo(cx-ww*.4,yy);x.lineTo(cx+ww*1.1,yy-r*.08);x.lineTo(cx+ww*.2,yy-r*.42);x.closePath();x.fill();x.strokeStyle='#1a1612';x.lineWidth=.8;x.stroke();
    x.strokeStyle='rgba(20,40,20,.5)';x.lineWidth=.6;for(let k=0;k<5;k++){const t=(k+1)/6;x.beginPath();x.moveTo(cx-ww*.4+(ww*1.5)*t,yy-r*.08*t);x.lineTo(cx-ww*.1+(ww*.3)*t+ww*.2*t,yy-r*.36+r*.1*t);x.stroke()}}})}
MXTR.w17=(t,r,sw,now)=>{const v=mxWV(t),rr=Math.round(r/2)*2;if(v>=2){mxBlit(mxFangSpr('w17f',rr,v,{c1:[178,162,130],c2:[133,117,88],w:.62,h:2.2,ledge:'rgba(232,214,176,.55)',sd:17}),t.x,t.y+r*.5,r/rr,0);return}
  mxBlit(mxWindPineSpr(rr,v),t.x,t.y+r*.5,r/rr,Math.sin(now/1000*1.6+t.x)*.03)};

/* ===================== 18 · ซากวิหารพายุ (หินอ่อนม่วง 56 + ลายทองฝัง + แอ่งน้ำฝน) ===================== */
MXC[18]={k:'w18',amp:80,sc:600,lit:[236,226,255],shd:[10,6,26],kl:.26,ks:.32,ao:.5,ff:.06,cs:.2,cla:.08,clv:20,gw:.7,gwc:'236,220,255',gcc:'20,10,60',base:'w180',ug:'w18',tree:'w18',tby:.4,uby:.42,dk:{0:1,1:1,3:1,4:1},mats:[
  {t:'w181',c:f=>mxSS(.64,.7,f.h*.6+f.q*.4),e:2},
  {t:'w182',c:f=>mxSS(.62,.7,(1-f.h)*.6+f.m*.4),e:-4},
  {t:'w183',c:f=>mxSS(.63,.7,f.w*.6+f.m*.4),e:0}]};
MXDC.w18=MXDC.gen;
MXB.veins=B=>(n,col)=>{const {x,R,W8}=B;for(let i=0;i<n;i++){const px=R()*B.S,py=R()*B.S,P=[[0,0]];let a=R()*6.28;for(let k=0;k<8;k++){a+=(R()-.5)*.9;const l=4+R()*6;P.push([P[k][0]+Math.cos(a)*l,P[k][1]+Math.sin(a)*l])}W8(px,py,60,(X,Y)=>{x.strokeStyle=col;x.lineWidth=.6;x.beginPath();P.forEach(([u,v],j)=>j?x.lineTo(X+u,Y+v):x.moveTo(X+u,Y+v));x.stroke()})}};
Object.assign(MXT,{
 w180:B=>{B.fill([30,24,46]);B.bricks(56,[78,70,104],[64,58,88],{jw:1.3,bev:.15,var:12,chip:.1,crk:.2,rad:2});B.veins(26,'rgba(210,196,240,.18)');B.blob(28,[150,140,200],[30,24,50],12,40,.1,.2);
   B.stroke((x,R,W8,S)=>{const n=Math.round(S/56),cw=S/n;x.strokeStyle='rgba(232,192,100,.28)';x.lineWidth=1;for(let i=0;i<8;i++){const gx=Math.floor(R()*n)*cw,gy=Math.floor(R()*n)*cw;W8(gx,gy,cw+4,(X,Y)=>{x.beginPath();x.moveTo(X+2,Y+1.6);x.lineTo(X+cw*.86,Y+1.6);x.moveTo(X+1.6,Y+2);x.lineTo(X+1.6,Y+cw*.86);x.stroke()})}});
   B.ponds(8,10,22,'rgba(70,80,130,.3)','rgba(220,220,255,.16)');B.gcrack(8,'rgba(14,10,30,.5)',.9,30);B.grain(1200,.03,.07)},
 w181:B=>{B.fill([24,18,38]);B.bricks(56,[72,64,96],[56,50,78],{jw:1.6,bev:.12,var:16,chip:.4,crk:.7,rad:1.6});B.peb(60,[70,62,94],[120,110,150],.8,2.6,.34);B.shard(30,[66,58,88],[110,100,140],1,2.8,.3);B.grain(1200,.04,.07)},
 w182:B=>{B.ponds(14,10,24,'rgba(60,70,120,.42)','rgba(220,220,255,.22)');B.rings(16,4,12,'rgba(220,220,255,.18)')},
 w183:B=>{B.blob(30,[60,90,70],[40,70,60],4,12,.3,.5);B.clumps(50,[[34,58,48],[52,84,64],[80,116,90]],2,4.5,{k:4,cr:2.4,w:.8});B.speck(50,[[90,130,100]],.5,1.2,.6)}});
MXU.w18=[()=>mxStoneSpr('w18u0',[120,110,150],7,5,{sharp:1}),()=>mxStoneSpr('w18u1',[100,92,128],5,3.6,{sharp:1}),()=>mxTuftSpr('w18u2',[[30,48,40],[50,80,62],[84,120,94]],8,5,181)];
MXNS.w18={rim:[70,64,96],sp:[232,220,255],gl:'200,150,255'};
function mxTemplePillarSpr(r,v){return mxSprite('tpl'+r+'|'+v,r*3.2,r*3.4,r*1.1,r*3.4-r*.6,(x,w,h)=>{const cx=r*1.1,by=h-r*.6,R=gxRng(r*23+v*11),H=r*(v===0?2.6:v===1?1.6:v===2?2.2:1.1);
  x.fillStyle='rgba(6,4,16,.32)';x.beginPath();x.ellipse(cx+r*.2,by+r*.4,r*.75,r*.2,0,0,7);x.fill();
  const body=x.createLinearGradient(cx-r*.38,0,cx+r*.38,0);body.addColorStop(0,'#c0b8de');body.addColorStop(.3,'#a49cc4');body.addColorStop(.75,'#7a729c');body.addColorStop(1,'#4e4870');x.fillStyle=body;x.fillRect(cx-r*.38,by-H,r*.76,H+r*.4);
  x.strokeStyle='rgba(40,30,70,.42)';x.lineWidth=1.2;for(let k=1;k<4;k++){x.beginPath();x.moveTo(cx-r*.38+k*r*.19,by-H+1);x.lineTo(cx-r*.38+k*r*.19,by+r*.38);x.stroke()}x.strokeStyle='rgba(255,255,255,.22)';x.lineWidth=.6;for(let k=1;k<4;k++){x.beginPath();x.moveTo(cx-r*.38+k*r*.19-1.2,by-H+1);x.lineTo(cx-r*.38+k*r*.19-1.2,by+r*.38);x.stroke()}
  x.strokeStyle='#0e0a14';x.lineWidth=1;x.strokeRect(cx-r*.38,by-H,r*.76,H+r*.4);
  const slab=(yy,ww,hh)=>{const gr=x.createLinearGradient(0,yy,0,yy+hh);gr.addColorStop(0,'#ece6fa');gr.addColorStop(1,'#a49cc4');x.fillStyle=gr;x.fillRect(cx-ww/2,yy,ww,hh);x.strokeStyle='#0e0a14';x.lineWidth=.9;x.strokeRect(cx-ww/2,yy,ww,hh)};
  slab(by+r*.3,r*1.04,r*.22);
  if(v===0){slab(by-H-r*.2,r*1.04,r*.22);const gb=x.createLinearGradient(0,by-H-r*.02,0,by-H+r*.05);gb.addColorStop(0,'#fff0b0');gb.addColorStop(1,'#c8902a');x.fillStyle=gb;x.fillRect(cx-r*.52,by-H-r*.02,r*1.04,r*.07)}
  else{x.fillStyle='#6a6288';x.beginPath();x.moveTo(cx-r*.38,by-H);x.lineTo(cx-r*.1,by-H-r*.3);x.lineTo(cx+r*.1,by-H-r*.08);x.lineTo(cx+r*.38,by-H-r*.22);x.lineTo(cx+r*.38,by-H);x.closePath();x.fill();x.strokeStyle='#0e0a14';x.stroke();
    x.fillStyle='rgba(220,212,250,.4)';x.beginPath();x.moveTo(cx-r*.38,by-H);x.lineTo(cx-r*.1,by-H-r*.3);x.lineTo(cx-r*.05,by-H-r*.1);x.closePath();x.fill();for(let i=0;i<4;i++)mxRockMini(x,cx+r*(.5+R()*.4)*(R()<.5?-1:1),by+r*.42+R()*3,1.6+R()*1.6,[150,140,190])}
  if(v===1){x.save();x.translate(cx+r*1.1,by+r*.35);x.rotate(.15);const gr=x.createLinearGradient(0,-r*.3,0,r*.3);gr.addColorStop(0,'#a49cc4');gr.addColorStop(1,'#5a5280');x.fillStyle=gr;x.fillRect(-r*.8,-r*.3,r*1.6,r*.6);x.strokeStyle='rgba(40,30,70,.42)';x.lineWidth=1;for(let k=1;k<3;k++){x.beginPath();x.moveTo(-r*.8,-r*.3+k*r*.2);x.lineTo(r*.8,-r*.3+k*r*.2);x.stroke()}
    x.fillStyle='#c0b8de';x.beginPath();x.ellipse(r*.8,0,r*.1,r*.3,0,0,7);x.fill();x.strokeStyle='#0e0a14';x.strokeRect(-r*.8,-r*.3,r*1.6,r*.6);x.restore()}
  x.strokeStyle='rgba(20,14,40,.55)';x.lineWidth=.8;x.beginPath();x.moveTo(cx-r*.1,by-H*.8);x.lineTo(cx+r*.05,by-H*.55);x.lineTo(cx-r*.02,by-H*.3);x.stroke();
  x.fillStyle='rgba(70,110,80,.75)';for(let i=0;i<7;i++){x.beginPath();x.ellipse(cx-r*.36+R()*r*.3,by+r*.3-R()*H*.5,r*.07,r*.05,0,0,7);x.fill()}})}
MXTR.w18=(t,r)=>{const v=mxWV(t),rr=Math.round(r/2)*2;mxBlit(mxTemplePillarSpr(rr,v),t.x,t.y,r/rr,0)};

/* ===================== ของชั้นพื้นวาดใหม่เพิ่ม (เฟือง · รูปปั้น · ป้ายหลุมศพ · ดาบปัก · ต้นไม้ตายเล็ก · ราก) — ขนาด/ตำแหน่งเดิม ===================== */
MXVP.gear=o=>{const x=o.x,y=o.y,s=o.s,R=9*s;g.save();g.translate(x,y-R*.4);g.scale(1,.55);g.rotate(o.r*6);g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.arc(1.5,4,R*1.2,0,7);g.fill();
  const pth=(k)=>{g.beginPath();for(let i=0;i<10;i++){const a=i*.628;g.lineTo(Math.cos(a)*R*1.25*k,Math.sin(a)*R*1.25*k);g.lineTo(Math.cos(a+.3)*R*1.25*k,Math.sin(a+.3)*R*1.25*k);g.lineTo(Math.cos(a+.32)*R*k,Math.sin(a+.32)*R*k);g.lineTo(Math.cos(a+.62)*R*k,Math.sin(a+.62)*R*k)}g.closePath()};
  g.fillStyle='#5a4220';g.save();g.translate(0,2.2);pth(1);g.fill();g.restore();const gr=g.createLinearGradient(-R,-R,R,R);gr.addColorStop(0,'#c8a060');gr.addColorStop(1,'#6e5028');g.fillStyle=gr;pth(1);g.fill();g.strokeStyle='rgba(30,20,8,.7)';g.lineWidth=.8;g.stroke();
  const ig=g.createRadialGradient(-R*.25,-R*.25,1,0,0,R*.75);ig.addColorStop(0,'#f0d080');ig.addColorStop(1,'#b08840');g.fillStyle=ig;g.beginPath();g.arc(0,0,R*.75,0,7);g.fill();g.fillStyle='rgba(60,40,16,.55)';for(let i=0;i<5;i++){const a=i*1.257;g.beginPath();g.arc(Math.cos(a)*R*.48,Math.sin(a)*R*.48,R*.12,0,7);g.fill()}
  g.fillStyle='#4a3420';g.beginPath();g.arc(0,0,R*.3,0,7);g.fill();g.fillStyle='rgba(255,240,200,.35)';g.beginPath();g.arc(-R*.08,-R*.08,R*.12,0,7);g.fill();g.restore()};
MXVP.statue=o=>{const x=o.x,y=o.y,s=o.s;const pg=g.createLinearGradient(x-8*s,0,x+8*s,0);pg.addColorStop(0,'#b0acb8');pg.addColorStop(1,'#5e5a68');g.fillStyle=pg;g.fillRect(x-8*s,y-6*s,16*s,6*s);g.fillStyle='rgba(255,255,255,.3)';g.fillRect(x-8*s,y-6*s,16*s,1.1*s);g.strokeStyle='rgba(30,28,40,.6)';g.lineWidth=.7;g.strokeRect(x-8*s,y-6*s,16*s,6*s);
  const bg=g.createLinearGradient(x-5*s,0,x+5*s,0);bg.addColorStop(0,'#d0ccd8');bg.addColorStop(.45,'#a8a4b0');bg.addColorStop(1,'#64606e');g.fillStyle=bg;g.beginPath();g.moveTo(x-5*s,y-6*s);g.quadraticCurveTo(x-5.4*s,y-14*s,x-4*s,y-20*s);g.lineTo(x+4*s,y-20*s);g.quadraticCurveTo(x+5.4*s,y-14*s,x+5*s,y-6*s);g.closePath();g.fill();g.strokeStyle='rgba(30,28,40,.55)';g.stroke();
  g.strokeStyle='rgba(60,56,70,.45)';g.lineWidth=.5;for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-2.6*s+i*2.4*s,y-19*s);g.quadraticCurveTo(x-3*s+i*2.6*s,y-12*s,x-2.8*s+i*2.8*s,y-6.5*s);g.stroke()}
  const hg=g.createRadialGradient(x-1.2*s,y-25*s,.4,x,y-24*s,4*s);hg.addColorStop(0,'#e8e4ee');hg.addColorStop(1,'#8a8696');g.fillStyle=hg;g.beginPath();g.arc(x,y-24*s,4*s,0,7);g.fill();g.strokeStyle='rgba(30,28,40,.55)';g.lineWidth=.7;g.stroke();
  g.strokeStyle='rgba(40,36,50,.7)';g.lineWidth=.8;g.beginPath();g.moveTo(x-2*s,y-22*s);g.lineTo(x+1*s,y-15*s);g.lineTo(x-1*s,y-10*s);g.stroke();g.fillStyle='rgba(90,140,60,.75)';g.beginPath();g.ellipse(x-4*s,y-6*s,4*s,1.6*s,0,0,7);g.fill();g.fillStyle='rgba(120,170,80,.6)';g.beginPath();g.ellipse(x-4.6*s,y-6.6*s,2*s,.7*s,0,0,7);g.fill()};
MXVP.tomb=o=>{const x=o.x,y=o.y,s=o.s,lean=(o.r-.5)*.25;g.save();g.translate(x,y);g.rotate(lean);g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.moveTo(-5*s,1);g.lineTo(-5*s,-13*s);g.arc(1,-13*s,6*s,Math.PI,0);g.lineTo(7*s,1);g.closePath();g.fill();
  const gr=g.createLinearGradient(-6*s,0,6*s,0);gr.addColorStop(0,'#9a9aa4');gr.addColorStop(.4,'#74747e');gr.addColorStop(1,'#46464e');g.fillStyle=gr;g.beginPath();g.moveTo(-6*s,0);g.lineTo(-6*s,-14*s);g.arc(0,-14*s,6*s,Math.PI,0);g.lineTo(6*s,0);g.closePath();g.fill();g.strokeStyle='rgba(20,20,28,.6)';g.lineWidth=.8;g.stroke();
  g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=.8;g.beginPath();g.arc(0,-14*s,5.2*s,Math.PI*1.05,Math.PI*1.45);g.stroke();g.strokeStyle='rgba(30,30,40,.75)';g.lineWidth=1.2;g.beginPath();g.moveTo(0,-17*s);g.lineTo(0,-8*s);g.moveTo(-3*s,-14*s);g.lineTo(3*s,-14*s);g.stroke();g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=.5;g.beginPath();g.moveTo(.6,-17*s);g.lineTo(.6,-8*s);g.stroke();
  g.strokeStyle='rgba(20,20,28,.5)';g.lineWidth=.5;g.beginPath();g.moveTo(3*s,-5*s);g.lineTo(4.4*s,-2*s);g.lineTo(3.6*s,0);g.stroke();g.fillStyle='rgba(80,120,60,.75)';g.beginPath();g.ellipse(-3*s,0,4*s,1.4*s,0,0,7);g.fill();g.fillStyle='rgba(120,160,80,.6)';g.beginPath();g.ellipse(-3.6*s,-.6*s,2*s,.6*s,0,0,7);g.fill();g.restore()};
MXVP.sword=o=>{const x=o.x,y=o.y,s=o.s,lean=(o.r-.5)*.5;g.save();g.translate(x,y);g.rotate(lean);const bl=g.createLinearGradient(-1.6*s,0,1.6*s,0);bl.addColorStop(0,'#eef2f8');bl.addColorStop(.5,'#a8b0bc');bl.addColorStop(1,'#5a606c');g.fillStyle=bl;g.beginPath();g.moveTo(-1.6*s,0);g.lineTo(-1.6*s,-18*s);g.lineTo(1.6*s,-18*s);g.lineTo(1.6*s,0);g.fill();
  g.strokeStyle='rgba(40,44,54,.6)';g.lineWidth=.4;g.beginPath();g.moveTo(0,-1*s);g.lineTo(0,-17*s);g.stroke();g.fillStyle='rgba(120,70,40,.35)';g.fillRect(-1.6*s,-6*s,3.2*s,2*s);
  const gd=g.createLinearGradient(0,-20*s,0,-17.8*s);gd.addColorStop(0,'#c8a060');gd.addColorStop(1,'#5a4020');g.fillStyle=gd;g.fillRect(-6*s,-20*s,12*s,2.2*s);g.fillStyle='#3a2a1a';g.fillRect(-1.2*s,-27*s,2.4*s,7*s);g.strokeStyle='rgba(200,160,90,.5)';g.lineWidth=.5;for(let i=0;i<3;i++){g.beginPath();g.moveTo(-1.2*s,-26*s+i*2.2*s);g.lineTo(1.2*s,-25*s+i*2.2*s);g.stroke()}
  const pm=g.createRadialGradient(-.6*s,-28.6*s,.2,0,-28*s,1.8*s);pm.addColorStop(0,'#fff0b0');pm.addColorStop(1,'#a07828');g.fillStyle=pm;g.beginPath();g.arc(0,-28*s,1.8*s,0,7);g.fill();g.restore()};
MXVP.deadT=o=>{const x=o.x,y=o.y,s=o.s*1.1;g.lineCap='round';const br=(x0,y0,x1,y1,w)=>{g.strokeStyle='#1a1418';g.lineWidth=w+1;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();g.strokeStyle='#3a2e38';g.lineWidth=w;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();g.strokeStyle='rgba(200,180,210,.25)';g.lineWidth=w*.3;g.beginPath();g.moveTo(x0-w*.25,y0);g.lineTo(x1-w*.25,y1);g.stroke()};
  br(x,y,x+1*s,y-22*s,3.4*s);br(x+1*s,y-14*s,x-8*s,y-24*s,1.8*s);br(x+1*s,y-18*s,x+9*s,y-28*s,1.8*s);br(x-4*s,y-19*s,x-6*s,y-30*s,1.2*s);br(x+5*s,y-23*s,x+5.5*s,y-31*s,1*s);g.lineCap='butt'};
MXVP.roots=o=>{const x=o.x,y=o.y,s=o.s;g.lineCap='round';for(let i=0;i<4;i++){const a=o.r*6+i*1.57,l=(14+i*3)*s,P=[x,y,x+Math.cos(a)*l*.3,y-8*s,x+Math.cos(a)*l*.7,y+Math.sin(a)*l*.3-6*s,x+Math.cos(a)*l,y+Math.sin(a)*l*.4];
  g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=(4-i*.6)*s+1;g.beginPath();g.moveTo(P[0]+1,P[1]+1.5);g.bezierCurveTo(P[2]+1,P[3]+1.5,P[4]+1,P[5]+1.5,P[6]+1,P[7]+1.5);g.stroke();
  g.strokeStyle='#4a321e';g.lineWidth=(4-i*.6)*s;g.beginPath();g.moveTo(P[0],P[1]);g.bezierCurveTo(P[2],P[3],P[4],P[5],P[6],P[7]);g.stroke();g.strokeStyle='rgba(200,150,100,.35)';g.lineWidth=(1.2-i*.15)*s;g.beginPath();g.moveTo(P[0]-.6,P[1]-1);g.bezierCurveTo(P[2]-.6,P[3]-1,P[4]-.6,P[5]-1,P[6]-.6,P[7]-1);g.stroke()}
  const kg=g.createRadialGradient(x-2*s,y-5*s,.5,x,y-3*s,6*s);kg.addColorStop(0,'#6a4a2c');kg.addColorStop(1,'#2a1a0e');g.fillStyle=kg;g.beginPath();g.ellipse(x,y-3*s,6*s,5*s,0,0,7);g.fill();g.strokeStyle='rgba(20,10,4,.5)';g.lineWidth=.6;g.beginPath();g.arc(x,y-3*s,3*s,0,7);g.stroke();g.lineCap='butt'};
