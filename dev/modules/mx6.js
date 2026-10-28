/* ===================== v557 · แผนที่โฉมใหม่ ช่วงที่ 4: แมพตระกูลวังอัสตรา (27–45) =====================
   แมพชุดนี้วาดพื้นเฉพาะตัวทุกแมพ (palPaint) → ไม่แทนที่ลวดลาย แต่ "เติมรายละเอียด" ทับลงชิ้นพื้นที่วาดเสร็จแล้ว:
   ① ดูสีพื้นทีละจุด (ย่อ 96×96) แยกเป็น หญ้า / หิน-ปูน / ดิน-ทราย-ไม้ → ทาลายละเอียดสีกลาง (ใบหญ้า · เกรนหิน · เม็ดดิน) แบบ overlay
      = เพิ่มความคมของพื้นผิวโดยสีและลวดลายเดิมไม่เปลี่ยน
   ② แมพกลางแจ้ง: แสงตามความสูงต่ำของพื้น + ร่มเงาใต้ต้นไม้ + เงาเมฆลอย + โทนอุ่น/เย็น
   ทำแบบแบ่งงานข้ามเฟรม แล้วค่อยจางเข้า · ปิดในดันเจี้ยน/อารีน่า (ใช้พื้นตระกูลเดียวกันแต่เป็นฉากต่อสู้) */

/* ---------- ลายละเอียดสีกลาง (ค่ากลาง 128 = ไม่เปลี่ยนสี) ---------- */
Object.assign(MXT,{
 nG:B=>{B.fill([128,128,128]);B.carpet(2200,[[92,92,92],[108,108,108],[118,118,118]],2.2,4.4,{per:9,cr:7,w:1.05,hv:.3});
   B.carpet(3000,[[78,78,78],[100,100,100],[124,124,124],[150,150,150],[176,176,176]],3,6.6,{per:10,cr:7,w:.9,tip:[206,206,206]});B.grain(900,.05,.06)},
 nS:B=>{B.fill([128,128,128]);B.blob(30,[146,146,146],[110,110,110],8,26,.25,.4);B.grain(5200,.1,.12);
   B.speck(140,[[96,96,96],[104,104,104]],.4,1,.8);B.speck(60,[[170,170,170]],.3,.7,.7);B.gcrack(10,'rgba(80,80,80,.55)',.55,18,0,'rgba(184,184,184,.5)')},
 nD:B=>{B.fill([128,128,128]);B.blob(30,[144,144,144],[112,112,112],8,26,.25,.4);B.grain(5600,.1,.12);
   B.speck(220,[[100,100,100],[108,108,108],[160,160,160]],.35,.9,.85);B.peb(26,[110,110,110],[160,160,160],.5,1.1,.3)},
 nW:B=>{B.fill([128,128,128]);B.stroke((x,R,W8,S)=>{for(let i=0;i<70;i++){const y=R()*S,a=(R()-.5)*.02,L=40+R()*120,x0=R()*S;W8(x0,y,L,(X,Y)=>{x.strokeStyle=R()<.5?'rgba(96,96,96,.55)':'rgba(164,164,164,.5)';x.lineWidth=.5+R()*.5;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+L*.5,Y+(R()-.5)*1.4,X+L,Y+a*L);x.stroke()})}});B.grain(2000,.06,.08)}});

/* ---------- ค่าตั้งรายแมพ: d = น้ำหนักลาย (g หญ้า · s หิน · d ดิน/ทราย · w ไม้) · out = กลางแจ้ง (แสงเงา/เมฆ) · ck = ของที่ให้ร่มเงา ---------- */
const MXPD={g:0,s:.26,d:.28,w:.18};
Object.assign(MXP,{
 27:{d:{s:.3,w:.3,d:.2}},
 28:{d:{g:0,s:.26,d:.26},out:1,amp:90,sc:620,kl:.32,ks:.22,cs:.24,ao:.4,cla:.1,gw:1,ck:{sft:1,btree:1,gcol:0}},
 29:{d:{s:.22}},
 30:{d:{s:.3,d:.3,w:.3},out:1,amp:60,sc:600,kl:.26,ks:.18,cs:.2,ao:.3,cla:.08,gw:.9,gwc:'255,226,190',gcc:'60,40,90'},
 31:{d:{s:.34,d:.3,g:.42,w:.26},out:1,amp:70,sc:600,kl:.26,ks:.2,cs:.2,ao:.3,cla:.1,gw:.9},
 32:{d:{s:.3,g:.32,d:.26}},
 33:{d:{s:.28,d:.24}},
 34:{d:{g:.4,s:.3,d:.26}},
 35:{d:{d:.4,s:.32},out:1,amp:120,sc:640,kl:.32,ks:.26,cs:.22,ao:.35,cla:.1,gw:1,gwc:'255,224,180',gcc:'70,40,90'},
 36:{d:{s:.32,d:.22,g:.3},out:1,amp:110,sc:620,kl:.28,ks:.22,cs:.22,ao:.35,cla:.09,gw:.85,gwc:'255,250,236',gcc:'60,80,140',ck:{obpine:1}},
 38:{d:{g:0,s:.26,d:.3,w:.22},out:1,amp:120,sc:640,kl:.34,ks:.24,cs:.26,ao:.4,cla:.12,gw:1.2,ck:{phtree:1}},
 39:{d:{s:.32,d:.3,w:.28},out:1,amp:90,sc:620,kl:.26,ks:.22,cs:.22,ao:.35,cla:.1,gw:.8,gwc:'240,236,255',gcc:'40,50,100'},
 40:{d:{s:.24}},
 41:{d:{s:.28,w:.22}},
 42:{d:{s:.24}},
 43:{d:{g:0,d:.3,s:.26,w:.2},out:1,amp:120,sc:640,kl:.34,ks:.24,cs:.26,ao:.4,cla:.12,gw:1.1,ck:{paoak:1,paltree:1}},
 44:{d:{s:.28,d:.28,w:.24}},
 45:{d:{s:.28,d:.26}}});
function mxCastOn(){if(!MX.on||!MXP[curMap]||!CASTM(curMap))return false;try{if(isDg()||isTw()||isArena())return false}catch(e){return false}return true}
function mxCastOut(){return mxCastOn()&&!!MXP[curMap].out}
/* ของที่ให้ร่มเงา (ต้นไม้ในแมพนั้น) */
function mxCastTrs(){const C=MXP[curMap];if(!C||!C.ck)return[];if(MX.ctk===curMap&&MX.ctn===trees.length)return MX.ctr;MX.ctk=curMap;MX.ctn=trees.length;return MX.ctr=trees.filter(t=>t.k&&C.ck[t.k]).map(t=>({x:t.x,y:t.y,r:(t.r||18)*(t.sc||1)*1.1}))}

/* ---------- แยกวัสดุจากสีพื้น ---------- */
function mxCastClass(base,J){const n=96,cv=mxCv('pcs',n,n),x=cv.getContext('2d',{willReadFrequently:true});x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='copy';x.imageSmoothingEnabled=true;x.drawImage(base,0,0,base.width,base.height,0,0,n,n);x.globalCompositeOperation='source-over';
  const D=x.getImageData(0,0,n,n).data,M={g:new Uint8ClampedArray(n*n),s:new Uint8ClampedArray(n*n),d:new Uint8ClampedArray(n*n),w:new Uint8ClampedArray(n*n)},cnt={g:0,s:0,d:0,w:0};
  for(let o=0;o<n*n;o++){const p=o*4,r=D[p],g2=D[p+1],b=D[p+2],a=D[p+3];if(a<200)continue;const mx=Math.max(r,g2,b),mn=Math.min(r,g2,b),l=(mx+mn)/510,c=mx-mn,sat=mx?c/mx:0;let h=0;
    if(c>0){if(mx===r)h=((g2-b)/c)%6;else if(mx===g2)h=(b-r)/c+2;else h=(r-g2)/c+4;h*=60;if(h<0)h+=360}
    const lw=mxSS(.07,.14,l)*(1-mxSS(.8,.92,l));if(lw<=0)continue;
    /* หญ้า: เขียว-เขียวเหลือง-เขียวอมฟ้า */const gv=sat>.12?mxSS(.12,.24,sat)*mxSS(62,80,h)*(1-mxSS(165,185,h))*lw:0;
    /* ดิน/ทราย: ส้ม-เหลือง-น้ำตาล ไม่จัดเกิน */const dv=sat>.1?mxSS(.1,.2,sat)*(1-mxSS(.62,.74,sat))*mxSS(14,24,h)*(1-mxSS(56,66,h))*lw:0;
    /* หิน/ปูน: สีหม่น */const sv=(1-mxSS(.12,.26,sat))*lw;
    const m=Math.max(gv,dv,sv);if(m<=0.02)continue;
    if(gv===m){M.g[o]=gv*255;cnt.g++}else if(dv===m){/* ไม้ = สีน้ำตาลเข้มอิ่ม · ดิน = อ่อนกว่า */if(l<.36&&sat>.32&&J.C.d.w){M.w[o]=dv*255;cnt.w++}else{M.d[o]=dv*255;cnt.d++}}else{M.s[o]=sv*255;cnt.s++}}
  J.M=M;J.cnt=cnt;J.n=n}
/* ทาลายวัสดุหนึ่งชนิดลงชังก์ (overlay) */
function mxCastLayer(J,k){const W=J.C.d[k]||0,cn=J.cnt[k]||0;if(W<=0||cn<J.n*J.n*.01)return;const pat=mxTileOf({g:'nG',s:'nS',d:'nD',w:'nW'}[k]);if(!pat)return;
  const n=J.n,mc=mxCv('pcm',n,n),mx=mc.getContext('2d'),id=mx.createImageData(n,n),D=id.data,A=J.M[k];for(let o=0;o<n*n;o++)D[o*4+3]=A[o];mx.putImageData(id,0,0);
  const px=J.E.width,S=PALC.S,r=J.r,tx=mxTmp(px,px);tx.save();tx.setTransform(1,0,0,1,0,0);tx.globalCompositeOperation='source-over';tx.globalAlpha=1;tx.clearRect(0,0,px,px);tx.setTransform(r,0,0,r,-J.cx*S*r,-J.cy*S*r);tx.fillStyle=pat;tx.fillRect(J.cx*S,J.cy*S,S,S);
  tx.setTransform(1,0,0,1,0,0);tx.globalCompositeOperation='destination-in';tx.imageSmoothingEnabled=true;tx.drawImage(mc,0,0,n,n,0,0,px,px);tx.restore();
  const e=J.ex;e.save();e.setTransform(1,0,0,1,0,0);e.globalCompositeOperation='overlay';e.globalAlpha=W;e.drawImage(MX.tc,0,0,px,px,0,0,px,px);e.restore()}
/* แสงเงา (กลางแจ้ง): เนินรับแดด + ร่มไม้ */
function mxCastLight(J){const C=J.C;GX.CS=GX.CS||384;const keep=MX.trs;MX.trs=mxCastTrs();let F;try{F=mxField(J.cx,J.cy)}finally{MX.trs=keep}
  const n=F.n,N=n*n,mc=mxCv('mk',n,n),mx=mc.getContext('2d'),id=mx.createImageData(n,n),D=id.data,lcv=mxCv('mkl',n,n),lx=lcv.getContext('2d'),idl=lx.createImageData(n,n),DL=idl.data,A=C.amp||100,L=MX.L,kl=(C.kl||.3)*255,ks=(C.ks||.22)*255,lc=C.lit||[255,250,226],sc=C.shd||[18,26,40],cs=C.cs||.22,ao=C.ao||.35,isp=1/(2*F.SP);
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){const o=j*n+i,gx=(i>0&&i<n-1)?(F.h[o+1]-F.h[o-1])*A*isp:0,gy=(j>0&&j<n-1)?(F.h[o+n]-F.h[o-n])*A*isp:0,nl=Math.sqrt(gx*gx+gy*gy+1),dt=(-gx*L[0]-gy*L[1]+L[2])/nl-L[2];
    const v=dt*2.4-F.a[o]*ao-F.s[o]*cs,p=o*4;if(v>=0){DL[p]=lc[0];DL[p+1]=lc[1];DL[p+2]=lc[2];DL[p+3]=Math.min(255,v*kl*1.7)}else{D[p]=sc[0];D[p+1]=sc[1];D[p+2]=sc[2];D[p+3]=Math.min(255,-v*ks)}}
  mx.putImageData(id,0,0);lx.putImageData(idl,0,0);const e=J.ex,S=PALC.S,r=J.r;e.save();e.setTransform(r,0,0,r,-J.cx*S*r,-J.cy*S*r);e.imageSmoothingEnabled=true;e.drawImage(mc,0,0,n,n,F.x0-F.SP/2,F.y0-F.SP/2,n*F.SP,n*F.SP);
  e.globalCompositeOperation='soft-light';e.drawImage(lcv,0,0,n,n,F.x0-F.SP/2,F.y0-F.SP/2,n*F.SP,n*F.SP);e.restore()}
/* งานเติมรายละเอียดหนึ่งชังก์ (ทำทีละขั้น) */
function mxCastStep(J){if(J.st===0){const E=document.createElement('canvas');E.width=J.b.width;E.height=J.b.height;const e=E.getContext('2d');e.drawImage(J.b,0,0);J.E=E;J.ex=e;J.st=1;return false}
  if(J.st===1){mxCastClass(J.b,J);J.st=2;J.ks=['g','s','d','w'];return false}
  if(J.st===2){const k=J.ks.shift();if(k)mxCastLayer(J,k);if(!J.ks.length)J.st=3;return false}
  if(J.st===3){if(J.C.out&&!LOWQ)mxCastLight(J);J.st=4;return true}return true}
function mxCastRun(budget){const t0=performance.now();while(performance.now()-t0<budget){let best=null;for(const J of MX.pj.values()){if(!best||J.vis>best.vis)best=J}if(!best)break;let done=false;const ts=performance.now();
    try{done=mxCastStep(best)}catch(e){console.warn('mxCast',e);MX.pj.delete(best.k);continue}MX.bt+=performance.now()-ts;
    if(done){MX.pj.delete(best.k);if(PALC.m.get(best.k)===best.b){PALC.m.set(best.k,best.E);MX.pb.set(best.k,{b:best.b,t:performance.now()})}MX.nb++;best.ex=null;best.M=null}}}
/* วาดพื้นตระกูลวัง (แทน palGround เดิม: ลำดับ/งบสร้างชิ้นเหมือนเดิม + เติมรายละเอียดภายหลัง + จางเข้า) */
function mxPalGround(_pg){const on=mxCastOn();if(!on){if(MX.pj&&MX.pj.size)MX.pj.clear();return _pg()}
  if(!MX.pj){MX.pj=new Map();MX.pb=new Map()}
  const S=PALC.S,M=g.getTransform(),s=M.a,r=Math.min(2,Math.ceil(s*2-.001)/2),ex=M.e,ey=M.f,now=performance.now(),C=MXP[curMap],CC={...C,d:{...MXPD,...(C.d||{})}};
  if(PALC.r!==r||PALC.mp!==curMap){PALC.m.clear();PALC.r=r;PALC.mp=curMap;MX.pj.clear();MX.pb.clear()}const warm=PALC.warm;let bud=warm?99:(LOWQ?1:2);PALC.warm=0;
  const x0=Math.floor((cam.x-24)/S),x1=Math.floor((cam.x+W+24)/S),y0=Math.floor((cam.y-24)/S),y1=Math.floor((cam.y+H+24)/S);for(const J of MX.pj.values())J.vis=0;
  g.save();g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=true;
  for(let cy=Math.max(0,y0);cy<=y1;cy++)for(let cx=Math.max(0,x0);cx<=x1;cx++){if(cx*S>=WW||cy*S>=WH)continue;const key=cx+','+cy,X=Math.round(ex+cx*S*s),Y=Math.round(ey+cy*S*s),X2=Math.round(ex+(cx+1)*S*s),Y2=Math.round(ey+(cy+1)*S*s);let c=PALC.m.get(key);
    if(!c){if(bud<=0){g.fillStyle='#3a3446';g.fillRect(X,Y,X2-X,Y2-Y);continue}bud--;try{c=palChunk(cx,cy,r)}catch(e){console.warn('palChunk',e);continue}PALC.m.set(key,c);if(PALC.m.size>(LOWQ?16:26)){const k0=PALC.m.keys().next().value;PALC.m.delete(k0);MX.pj.delete(k0);MX.pb.delete(k0)}
      MX.pj.set(key,{k:key,b:c,cx,cy,r,C:CC,st:0,vis:1})}
    else{PALC.m.delete(key);PALC.m.set(key,c);const J=MX.pj.get(key);if(J)J.vis=1}
    const fb=MX.pb.get(key);if(fb){const a=Math.min(1,(now-fb.t)/260);if(a<1){g.drawImage(fb.b,X,Y,X2-X+.5,Y2-Y+.5);g.globalAlpha=a;g.drawImage(c,X,Y,X2-X+.5,Y2-Y+.5);g.globalAlpha=1;continue}MX.pb.delete(key)}
    g.drawImage(c,X,Y,X2-X+.5,Y2-Y+.5)}
  g.restore();
  for(const J of MX.pj.values())if(!J.vis&&(J.cx<x0-2||J.cx>x1+2||J.cy<y0-2||J.cy>y1+2))MX.pj.delete(J.k);
  const lq=LOWQ||(typeof LITEQ!=='undefined'&&LITEQ);mxCastRun(warm?40:(lq?5:8));return true}
setTimeout(()=>{try{const _pl=palGround;window.palGround=palGround=function(){return mxPalGround(_pl)}}catch(e){}},0);

/* ===================== ของธรรมชาติในแมพตระกูลวัง: วาดใหม่ให้มีมิติ (รูปทรง/ตำแหน่ง/สีเดิม) ===================== */
const mxHx=c=>{try{return gxHex(c)}catch(e){return[90,120,70]}};
const mxPal=(b,lift)=>{lift=lift||0;return{o:mxMix(b,MXK,.55),d:mxMix(b,MXK,.28),m:b,l:mxMix(b,MXW,.2+lift),hl:mxMix(b,[255,250,205],.48+lift)}};
/* ก้อนใบไม้: ขอบหยักเป็นพุ่มใบ · ไล่แสงบนซ้าย · ใบเล็กรับแสง/เงา · ขอบสว่าง */
function mxLeaf(x,X,Y,R,P,sd,o){o=o||{};const ry=R*(o.sq||.94),k=o.k||11,Rg=gxRng(((X*7)|0)^((Y*13)|0)^(sd*977));
  const pth=(dx,dy,rr)=>{x.beginPath();for(let i=0;i<=k;i++){const a=i/k*6.283,q=rr*(.9+.1*Math.sin(i*2.3+sd));const X1=X+dx+Math.cos(a)*q,Y1=Y+dy+Math.sin(a)*q*(ry/R);if(!i)x.moveTo(X1,Y1);else{const am=(i-.5)/k*6.283,qm=rr*1.08;x.quadraticCurveTo(X+dx+Math.cos(am)*qm,Y+dy+Math.sin(am)*qm*(ry/R),X1,Y1)}}x.closePath()};
  if(!o.noBack){x.fillStyle=mxRgb(P.o,.9);pth(R*.06,R*.1,R+1.2);x.fill()}
  const gr=x.createRadialGradient(X-R*.38,Y-ry*.46,R*.08,X+R*.08,Y+ry*.12,R*1.12);gr.addColorStop(0,mxRgb(P.hl));gr.addColorStop(.3,mxRgb(P.l));gr.addColorStop(.62,mxRgb(P.m));gr.addColorStop(1,mxRgb(P.d));x.fillStyle=gr;pth(0,0,R);x.fill();
  const n=Math.round(R*R/24)+4;for(let i=0;i<n;i++){const a=Rg()*6.283,d=Math.sqrt(Rg())*R*.86,lx=X+Math.cos(a)*d,ly=Y+Math.sin(a)*d*(ry/R),lit=(Math.cos(a)*-.55+Math.sin(a)*-.8)*d/R;
    x.fillStyle=lit>.15?mxRgb(P.hl,.16+.26*lit):lit<-.25?mxRgb(P.o,.2):mxRgb(P.d,.12);x.beginPath();x.ellipse(lx,ly,1.3+Rg()*1.1,.75+Rg()*.5,Rg()*3,0,7);x.fill()}
  x.strokeStyle=mxRgb(P.hl,.38);x.lineWidth=1.1;x.beginPath();x.ellipse(X,Y,R*.9,ry*.9,0,3.6,4.9);x.stroke()}
/* ลำต้นทรงเดิม (เส้นโค้ง) ใส่เปลือก */
function mxTrunkQ(x,P0,P1,P2,w,c){const C=mxHx(c);x.lineCap='round';x.strokeStyle=mxRgb(mxMix(C,MXK,.35));x.lineWidth=w+1.4;x.beginPath();x.moveTo(P0[0],P0[1]);x.quadraticCurveTo(P1[0],P1[1],P2[0],P2[1]);x.stroke();
  x.strokeStyle=mxRgb(C);x.lineWidth=w;x.stroke();x.strokeStyle=mxRgb(mxMix(C,[255,220,170],.32),.55);x.lineWidth=w*.28;x.beginPath();x.moveTo(P0[0]-w*.22,P0[1]);x.quadraticCurveTo(P1[0]-w*.22,P1[1],P2[0]-w*.18,P2[1]);x.stroke();
  x.strokeStyle=mxRgb(mxMix(C,MXK,.45),.5);x.lineWidth=.7;for(let i=0;i<3;i++){const f=.25+i*.25;x.beginPath();x.moveTo(P0[0]+w*.2,P0[1]-(P0[1]-P2[1])*f);x.lineTo(P0[0]+w*.15,P0[1]-(P0[1]-P2[1])*(f+.1));x.stroke()}}
const MXCS={};/* แคชสไปรต์ของประดับตระกูลวัง: key → {c,ax,ay,w,h} */
function mxPS(key,w,h,ax,ay,fn){return mxSprite('cs'+curMap+key,w,h,ax,ay,fn)}

/* --- 43 ปากเหว: โอ๊ก · ต้นไม้เอนริมเหว · พุ่ม · หิน --- */
const MXPK={};
MXPK.paoak=(t,T)=>{const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,sb=Math.round(s*10)/10,sw=Math.sin(T*.8+x*.013)*1.4;PALSH(x,y+4,40*s,11*s,.4);
  const S=mxPS('paoak'+v+'_'+sb,124*sb,156*sb,62*sb,146*sb,(c,w,h)=>{const bx=w/2,by=h-10*sb,s2=sb,C=[['#5e8c42','#3e6a2e','#86b05a'],['#6a9448','#466e32','#92ba62'],['#58804a','#3a6034','#80a86a']][v];
    const tg=c.createLinearGradient(bx-7*s2,0,bx+7*s2,0);tg.addColorStop(0,'#7a5a3a');tg.addColorStop(.45,'#4a3420');tg.addColorStop(1,'#2a1c10');c.fillStyle=tg;c.beginPath();c.moveTo(bx-7*s2,by);c.quadraticCurveTo(bx-5*s2,by-40*s2,bx-3*s2,by-70*s2);c.lineTo(bx+3*s2,by-70*s2);c.quadraticCurveTo(bx+5*s2,by-40*s2,bx+7*s2,by);c.closePath();c.fill();
    c.strokeStyle='rgba(20,12,4,.45)';c.lineWidth=.7;for(let i=0;i<3;i++){c.beginPath();c.moveTo(bx-3*s2+i*3*s2,by-2);c.lineTo(bx-2*s2+i*2.4*s2,by-40*s2);c.stroke()}
    const B=[[-26,-78,28,1],[26,-80,28,1],[0,-104,34,1],[-14,-88,26,0],[16,-92,26,0],[0,-110,22,2]];B.forEach(([dx,dy,r,k],i)=>mxLeaf(c,bx+dx*s2,by+dy*s2,r*s2,mxPal(mxHx(C[k]),k===2?.08:0),i+v*7,{noBack:k===2}))});
  mxBlit(S,x,y,s/sb,sw/(110*s))};
MXPK.paltree=(t,T)=>{const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,sb=Math.round(s*10)/10,ln=t.lean||0,sw=Math.sin(T*.9+x*.01)*.02;PALSH(x,y+4,36*s,10*s,.4);
  const S=mxPS('paltree'+v+'_'+sb,120*sb,160*sb,60*sb,150*sb,(c,w,h)=>{const bx=w/2,by=h-10*sb,s2=sb,C=[['#5a8a40','#3e6a2e'],['#6a9a48','#466e32'],['#7a9a50','#56763a']][v];
    c.lineCap='round';for(const d of[-1,1]){c.strokeStyle='#3a2818';c.lineWidth=3.6*s2;c.beginPath();c.moveTo(bx,by-2);c.quadraticCurveTo(bx+d*10*s2,by+4*s2,bx+d*18*s2,by+2*s2);c.stroke();c.strokeStyle='#5a4028';c.lineWidth=2.4*s2;c.stroke()}
    mxTrunkQ(c,[bx,by],[bx+4*s2,by-40*s2],[bx,by-80*s2],9*s2,'#4a3420');
    for(const[dx,dy,r]of[[-22,-84,26],[18,-90,28],[0,-110,30],[-8,-70,22],[24,-66,20]].map((q,i)=>[...q,i]))mxLeaf(c,bx+dx*s2,by+dy*s2,r*s2,mxPal(mxHx(C[0])),dx*3+v);
    c.fillStyle='rgba(230,250,180,.22)';c.beginPath();c.arc(bx-6*s2,by-116*s2,12*s2,0,7);c.fill()});
  g.save();g.translate(x,y);g.rotate(ln+sw);g.drawImage(S.c,-S.ax*s/sb,-S.ay*s/sb,S.w*s/sb,S.h*s/sb);g.restore()};
MXPK.pabush=(t,T)=>{const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,sb=Math.round(s*10)/10;g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y+3,20*s,5*s,0,0,7);g.fill();
  const S=mxPS('pabush'+v+'_'+sb,52*sb,40*sb,26*sb,34*sb,(c,w,h)=>{const bx=w/2,by=h-6*sb,s2=sb;[[-9,-6,10,'#4e7434'],[9,-6,10,'#4e7434'],[0,-12,12,'#5e8a40'],[-3,-15,6,'#7aa452']].forEach(([dx,dy,r,col],i)=>mxLeaf(c,bx+dx*s2,by+dy*s2,r*s2,mxPal(mxHx(col)),i+v*5,{noBack:i===3,k:9}));
    if(v===1){for(const[dx,dy]of[[-6,-12],[5,-16],[8,-6]]){c.fillStyle='rgba(120,90,20,.5)';c.beginPath();c.arc(bx+dx*s2+.4,by+dy*s2+.5,1.8,0,7);c.fill();c.fillStyle='#f2d880';c.beginPath();c.arc(bx+dx*s2,by+dy*s2,1.7,0,7);c.fill();c.fillStyle='#fffbe0';c.beginPath();c.arc(bx+dx*s2-.4,by+dy*s2-.4,.6,0,7);c.fill()}}});
  g.drawImage(S.c,x-S.ax*s/sb,y-S.ay*s/sb,S.w*s/sb,S.h*s/sb)};
MXPK.parock=(t,T)=>{const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,sb=Math.round(s*10)/10;PALSH(x,y+3,26*s,7*s,.35);
  const S=mxPS('parock'+v+'_'+sb,56*sb,40*sb,28*sb,34*sb,(c,w,h)=>{const bx=w/2,by=h-6*sb,s2=sb,base=mxHx(['#7a7468','#6e6a60','#827a6c'][v]),P=[[-24,2],[-18,-18],[2,-26],[22,-14],[24,2]].map(([a,b])=>[bx+a*s2,by+b*s2]);
    const pth=()=>{c.beginPath();P.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.closePath()};let gr=c.createLinearGradient(bx-20*s2,by-26*s2,bx+18*s2,by+2*s2);gr.addColorStop(0,mxRgb(mxMix(base,MXW,.25)));gr.addColorStop(.55,mxRgb(base));gr.addColorStop(1,mxRgb(mxMix(base,MXK,.35)));c.fillStyle=gr;pth();c.fill();
    c.fillStyle=mxRgb(mxMix(base,MXK,.25),.7);c.beginPath();c.moveTo(P[2][0],P[2][1]);c.lineTo(P[3][0],P[3][1]);c.lineTo(P[4][0],P[4][1]);c.lineTo(bx+6*s2,by+2*s2);c.lineTo(bx+4*s2,by-12*s2);c.closePath();c.fill();
    c.fillStyle='rgba(255,255,255,.22)';c.beginPath();c.moveTo(bx-16*s2,by-16*s2);c.lineTo(bx+2*s2,by-24*s2);c.lineTo(bx+4*s2,by-13*s2);c.lineTo(bx-8*s2,by-8*s2);c.closePath();c.fill();
    c.strokeStyle='rgba(30,26,22,.55)';c.lineWidth=.9;pth();c.stroke();c.strokeStyle='rgba(30,26,22,.4)';c.lineWidth=.7;c.beginPath();c.moveTo(bx+2*s2,by-24*s2);c.lineTo(bx+4*s2,by-13*s2);c.lineTo(bx+1*s2,by-4*s2);c.stroke();
    const mg=c.createRadialGradient(bx-6*s2,by-21*s2,1,bx-4*s2,by-20*s2,10*s2);mg.addColorStop(0,'rgba(150,196,90,.95)');mg.addColorStop(1,'rgba(100,150,70,0)');c.fillStyle=mg;c.beginPath();c.ellipse(bx-4*s2,by-20*s2,10*s2,4*s2,-.2,0,7);c.fill();
    c.fillStyle='rgba(200,230,140,.6)';for(let i=0;i<5;i++){c.beginPath();c.arc(bx-10*s2+i*3*s2,by-21*s2+(i%2)*1.4,.8,0,7);c.fill()}});
  g.drawImage(S.c,x-S.ax*s/sb,y-S.ay*s/sb,S.w*s/sb,S.h*s/sb)};
/* --- 38 ผาท่าเรือเมฆ: ต้นไม้ลู่ลม · พุ่ม --- */
MXPK.phtree=(t,T)=>{const x=t.x,y=t.y,s=Math.round((t.sc||1)*10)/10,v=t.v||0,sw=Math.sin(T*1.2+x*.01)*.025;PALSH(x-14*s,y+4,36*s,10*s,.38);
  const S=mxPS('phtree'+v+'_'+s,124*s,156*s,90*s,148*s,(c,w,h)=>{const ox=90*s,oy=148*s,C=[['#3e6a30','#5e8e40','#8ab85a','#b8d878'],['#335e30','#507e40','#78a454','#a8cc70'],['#4e6e30','#728e40','#9ab25a','#c8d488']][v],P=mxPal(mxHx(C[1]));P.l=mxHx(C[2]);P.hl=mxHx(C[3]);
    mxTrunkQ(c,[ox,oy],[ox+6*s,oy-50*s],[ox-22*s,oy-96*s],8*s,'#3a2818');c.strokeStyle='#3a2818';c.lineWidth=3.6*s;c.lineCap='round';c.beginPath();c.moveTo(ox+2*s,oy-50*s);c.lineTo(ox-28*s,oy-62*s);c.stroke();c.beginPath();c.moveTo(ox-8*s,oy-78*s);c.lineTo(ox-40*s,oy-84*s);c.stroke();
    const blobs=[[-30,-96,32],[-4,-104,26],[-52,-84,22],[-28,-110,24],[-6,-116,16],[-48,-98,16],[-22,-122,13],[-40,-110,12],[6,-96,14]];blobs.forEach(([dx,dy,r],i)=>mxLeaf(c,ox+dx*s,oy+dy*s,r*s,P,i+v*9,{sq:.74}))});
  g.save();g.translate(x,y);g.rotate(sw);g.drawImage(S.c,-S.ax,-S.ay,S.w,S.h);g.restore()};
MXPK.phbush=(t,T)=>{const s=Math.round((t.sc||1)*10)/10,v=t.v||0;PALSH(t.x,t.y+2,22*s,5*s,.3);
  const S=mxPS('phbush'+v+'_'+s,56*s,34*s,28*s,30*s,(c,w,h)=>{const ox=28*s,oy=30*s,C=[['#3e6a34','#5e8e44','#8ab860'],['#365e36','#4e7e46','#7aa860'],['#4a6c30','#6c8c3e','#98b65a']][v],P=mxPal(mxHx(C[1]));P.l=mxHx(C[2]);
    [[-11,-8,10],[7,-9,11],[-2,-15,9],[-16,-4,7],[14,-4,7]].forEach(([dx,dy,r],i)=>mxLeaf(c,ox+dx*s,oy+dy*s,r*s,P,i+v*5,{sq:.72,k:9}));
    const fc=v===1?[244,168,196]:v===2?[255,240,176]:[255,255,255];for(const[dx,dy]of[[-8,-13],[4,-17],[10,-8],[-14,-6]]){c.fillStyle='rgba(40,60,30,.35)';c.beginPath();c.arc(ox+dx*s+.4,oy+dy*s+.5,2,0,7);c.fill();c.fillStyle=mxRgb(fc);c.beginPath();c.arc(ox+dx*s,oy+dy*s,1.9,0,7);c.fill();c.fillStyle='rgba(255,236,140,.9)';c.beginPath();c.arc(ox+dx*s,oy+dy*s,.7,0,7);c.fill()}});
  g.drawImage(S.c,t.x-S.ax,t.y-S.ay,S.w,S.h)};
/* --- 36 ยอดหอดูดาว: สนหิมะ · หินหิมะ --- */
MXPK.obpine=(t,T)=>{const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,sb=Math.round(s*10)/10;PALSH(x+6,y+4,26*s,8*s,.4);
  const S=mxPS('obpine'+v+'_'+sb,72*sb,120*sb,36*sb,114*sb,(c,w,h)=>{const bx=w/2,by=h-6*sb,s2=sb,base=mxHx(['#2a4a52','#22404c','#30525a'][v]),R=gxRng(v*31+7);
    const tg=c.createLinearGradient(bx-3*s2,0,bx+3*s2,0);tg.addColorStop(0,'#6a4a30');tg.addColorStop(1,'#2e1c10');c.fillStyle=tg;c.fillRect(bx-3*s2,by-14*s2,6*s2,14*s2);
    for(let k=0;k<4;k++){const W2=(30-k*6)*s2,yb=by-12*s2-k*20*s2,hh=30*s2,n=7;
      c.beginPath();c.moveTo(bx,yb-hh);c.lineTo(bx+W2,yb);for(let i=n;i>=0;i--){const px=bx-W2+(i/n)*W2*2;c.lineTo(px,yb+((i%2)?3.2*s2:0))}c.closePath();
      const gr=c.createLinearGradient(bx-W2,yb-hh,bx+W2*.6,yb);gr.addColorStop(0,mxRgb(mxMix(base,[150,200,200],.32)));gr.addColorStop(.5,mxRgb(base));gr.addColorStop(1,mxRgb(mxMix(base,MXK,.4)));c.fillStyle=gr;c.fill();
      c.fillStyle='rgba(8,20,32,.3)';c.beginPath();c.moveTo(bx+W2*.12,yb-hh*.62);c.lineTo(bx,yb-hh);c.lineTo(bx+W2,yb);c.lineTo(bx+W2*.3,yb+1);c.closePath();c.fill();
      c.strokeStyle=mxRgb(mxMix(base,[180,230,230],.35),.45);c.lineWidth=.6;for(let i=0;i<6;i++){const f=(i+1)/7;c.beginPath();c.moveTo(bx-W2*f*.9,yb-hh*(1-f)*.92);c.lineTo(bx-W2*f*.9-2*s2,yb-hh*(1-f)*.92+4*s2);c.stroke()}
      const sg=c.createLinearGradient(0,yb-hh,0,yb);sg.addColorStop(0,'#ffffff');sg.addColorStop(1,'#d8e6f2');c.fillStyle=sg;c.beginPath();c.moveTo(bx-W2*.85,yb-2*s2);c.quadraticCurveTo(bx-W2*.4,yb-hh*.35,bx,yb-hh);c.quadraticCurveTo(bx+W2*.2,yb-hh*.5,bx+W2*.55,yb-5*s2);c.quadraticCurveTo(bx,yb-hh*.25,bx-W2*.85,yb-2*s2);c.fill();
      c.strokeStyle='rgba(120,150,190,.55)';c.lineWidth=.8;c.beginPath();c.moveTo(bx-W2*.85,yb-2*s2);c.quadraticCurveTo(bx,yb-hh*.25,bx+W2*.55,yb-5*s2);c.stroke()}});
  g.drawImage(S.c,x-S.ax*s/sb,y-S.ay*s/sb,S.w*s/sb,S.h*s/sb)};
MXPK.obrock=(t,T)=>{const x=t.x,y=t.y,s=t.sc||1,v=t.v|0,sb=Math.round(s*10)/10;PALSH(x+3,y+4,26*s,7*s,.35);
  const S=mxPS('obrock'+v+'_'+sb,56*sb,44*sb,28*sb,36*sb,(c,w,h)=>{const bx=w/2,by=h-8*sb,s2=sb,base=mxHx(['#6a768a','#5e6a7e','#747f92'][v]),P=[[-24,0],[-20,-18],[-4,-28],[16,-22],[24,-4],[18,4]].map(([a,b])=>[bx+a*s2,by+b*s2]);
    const pth=()=>{c.beginPath();P.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.closePath()};const gr=c.createLinearGradient(bx-20*s2,by-28*s2,bx+20*s2,by+4*s2);gr.addColorStop(0,mxRgb(mxMix(base,MXW,.22)));gr.addColorStop(.55,mxRgb(base));gr.addColorStop(1,mxRgb(mxMix(base,MXK,.35)));c.fillStyle=gr;pth();c.fill();
    c.fillStyle='rgba(20,30,50,.28)';c.beginPath();c.moveTo(bx+4*s2,by-26*s2);c.lineTo(bx+16*s2,by-22*s2);c.lineTo(bx+24*s2,by-4*s2);c.lineTo(bx+18*s2,by+4*s2);c.lineTo(bx+6*s2,by);c.closePath();c.fill();
    c.strokeStyle='rgba(20,26,40,.55)';c.lineWidth=.9;pth();c.stroke();c.strokeStyle='rgba(20,26,40,.42)';c.lineWidth=.7;c.beginPath();c.moveTo(bx-2*s2,by-20*s2);c.lineTo(bx+3*s2,by-10*s2);c.lineTo(bx,by-2*s2);c.stroke();
    c.fillStyle='rgba(110,150,200,.5)';c.beginPath();c.moveTo(bx-21*s2,by-16*s2);c.lineTo(bx-4*s2,by-27.4*s2);c.lineTo(bx+16*s2,by-21.6*s2);c.quadraticCurveTo(bx,by-13.6*s2,bx-21*s2,by-16*s2);c.fill();
    const sg=c.createLinearGradient(0,by-29*s2,0,by-16*s2);sg.addColorStop(0,'#ffffff');sg.addColorStop(1,'#dce8f4');c.fillStyle=sg;c.beginPath();c.moveTo(bx-21*s2,by-17*s2);c.lineTo(bx-4*s2,by-29*s2);c.lineTo(bx+16*s2,by-23*s2);c.quadraticCurveTo(bx,by-16*s2,bx-21*s2,by-17*s2);c.fill()});
  g.drawImage(S.c,x-S.ax*s/sb,y-S.ay*s/sb,S.w*s/sb,S.h*s/sb)};
/* --- 28 สวนลอย: ต้นไม้ผลดาว (ผลยังกะพริบ/เก็บได้ตามเดิม) · พุ่มรั้วกุหลาบ --- */
MXPK.sft=(t,T)=>{const x=t.x,y=t.y;PALSH(x,y+3,38,10,.35);
  const S=mxPS('sft',132,140,66,128,(c,w,h)=>{const bx=66,by=128;const tg=c.createLinearGradient(bx-8,0,bx+8,0);tg.addColorStop(0,'#7a5634');tg.addColorStop(.45,'#5a3a22');tg.addColorStop(1,'#2a180c');c.fillStyle=tg;c.beginPath();c.moveTo(bx-9,by);c.quadraticCurveTo(bx-5,by-30,bx-6,by-60);c.lineTo(bx+6,by-60);c.quadraticCurveTo(bx+5,by-30,bx+10,by);c.closePath();c.fill();
    const L=[];for(let i=0;i<9;i++){const a=i*.7;L.push([bx+Math.cos(a)*30,by-86+Math.sin(a)*20,24-(i%3)*3,i])}L.sort((p,q)=>p[1]-q[1]);L.forEach(([cx,cy,r,i])=>mxLeaf(c,cx,cy,r,mxPal(mxHx(['#2e7a5a','#3a8a64','#256a4e'][i%3]),.04),i))});
  mxBlit(S,x,y,1,Math.sin(T*.6+x)*.006);g.fillStyle='rgba(180,240,200,.16)';g.beginPath();g.arc(x-12,y-100,16,0,7);g.fill();
  const fr=GARG.fr[t.si]||0;for(let i=0;i<6;i++){if(i===0&&performance.now()<fr)continue;const a=i*1.05+.3,fx=x+Math.cos(a)*30,fy=y-84+Math.sin(a)*22,pu=.6+.4*Math.sin(T*2+i+x);g.save();g.globalCompositeOperation='lighter';glowAt(fx,fy,12,'255,220,110',.4*pu);g.restore();g.fillStyle='#ffe070';PST(g,fx,fy,5,2.2,5,T*.3+i);g.fill()}};
MXPK.hedge=(t,T)=>{const x=t.x,y=t.y,v=t.v|0;PALSH(x,y+3,26,7);
  const S=mxPS('hedge'+(v%4),56,50,28,44,(c,w,h)=>{const bx=28,by=44,R=gxRng(v*13+3);c.save();c.beginPath();c.roundRect(bx-24,by-40,48,42,7);c.clip();
    const gr=c.createLinearGradient(0,by-40,0,by+2);gr.addColorStop(0,'#5a9a46');gr.addColorStop(.35,'#3e7a32');gr.addColorStop(1,'#1e4a1c');c.fillStyle=gr;c.fillRect(bx-24,by-40,48,42);
    for(let i=0;i<70;i++){const px=bx-24+R()*48,py=by-40+R()*42,lit=1-(py-(by-40))/42;c.fillStyle=lit>.6?'rgba(170,220,120,'+(.25+R()*.3)+')':R()<.5?'rgba(14,40,14,.35)':'rgba(70,130,56,.4)';c.beginPath();c.ellipse(px,py,1.6+R()*1.2,1+R()*.6,R()*3,0,7);c.fill()}
    c.fillStyle='rgba(0,0,0,.22)';c.fillRect(bx-24,by-20,48,1.6);c.restore();c.strokeStyle='rgba(16,40,14,.6)';c.lineWidth=1;c.beginPath();c.roundRect(bx-24,by-40,48,42,7);c.stroke();
    c.strokeStyle='rgba(190,230,140,.45)';c.lineWidth=1;c.beginPath();c.moveTo(bx-20,by-39);c.lineTo(bx+18,by-39);c.stroke();
    const C=['#e83a5a','#ff8aa8','#fff0f4','#d8304a','#ffb0c0'];for(let i=0;i<4;i++){const rx=bx-16+((i*13+v*7)%34),ry=by-30+((i*11)%22);c.fillStyle='rgba(60,10,20,.35)';PST(c,rx+.6,ry+.8,3.6,1.6,5,i);c.fill();c.fillStyle=C[(i+v)%5];PST(c,rx,ry,3.6,1.6,5,i);c.fill();c.fillStyle='rgba(255,240,200,.85)';c.beginPath();c.arc(rx,ry,.7,0,7);c.fill()}});
  g.drawImage(S.c,x-S.ax,y-S.ay,S.w,S.h);if(v%2===0){g.strokeStyle='rgba(200,190,240,.7)';g.lineWidth=1.2;g.beginPath();g.moveTo(x-10,y-38);g.lineTo(x-6,y-48);g.lineTo(x-2,y-40);g.stroke()}};
/* เปิดใช้: เก็บของเดิมไว้ (ปิดระบบ MX.on=0 → กลับไปแบบเดิม) */
setTimeout(()=>{try{for(const k in MXPK){const o=PALK[k];if(typeof o!=='function')continue;PALK[k]=function(t,T){const f=MXPK[k];if(f&&MX.on&&!(typeof isDg==='function'&&isDg()))try{return f(t,T)}catch(e){console.warn('mxPK',k,e)}return o.call(this,t,T)}}}catch(e){console.warn('mxPK',e)}},0);
