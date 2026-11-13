/* ---------- v638 ของแต่งเต็นท์ภาพวาด (TNA) ----------
   ของแต่ง 21 ชิ้น + ตู้เสื้อผ้า แท่นโชว์ แท่นสมุดเยี่ยม ตู้ปลา ชั้นถ้วย = ภาพวาดจาก ChatGPT (hd-tent.webp)
   ผ้าผนัง 4 ธีม + พื้น 4 แบบ (hd-tenttx.webp) ใส่ใน tvBG ตามรูปทรงเดิม แล้วลงรอยพับ/เงามุมห้องทับ
   แสงไฟ เปลวเตา ประกายคริสตัล ยังขยับอยู่ (วาดแสงทับภาพ) · โหลดเฉพาะเมื่อเข้าเต็นท์ · ปิด: TNA.off=1 */
const TNA={off:0,img:null,tx:null,ok:0,txok:0,
  pos:/*POS*/{},
  /* ขนาดในโลก: w กว้าง · b ระยะจากจุดอ้างอิงลงไปถึงฐาน */
  sz:{bed1:[96,24],bed2:[96,24],bed3:[96,24],tab1:[78,18],tab2:[80,18],pla1:[42,13],pla2:[50,13],pla3:[48,13],fir1:[54,12],fir2:[86,13],
      lit1:[34,1],lit2:[33,1],lit3:[36,1],wardrobe:[76,6],book:[30,2],ped:[34,9]},
  fl:{fir1:[.5,.72,16],fir2:[.5,.74,26]},
  lp:{lit1:[[.6,.66]],lit2:[[.6,.36],[.6,.7]],lit3:[[.5,.32]]}};
function tnaLoad(){if(TNA.img||TNA.off)return;const I=new Image();I.decoding='async';I.onload=()=>{TNA.ok=1};I.src='hd-tent.webp';TNA.img=I;
  const J=new Image();J.decoding='async';J.onload=()=>{TNA.txok=1;try{TVC.k='~'}catch(e){}};J.src='hd-tenttx.webp';TNA.tx=J}
function tnaOn(){if(TNA.off)return false;if(!TNA.img)tnaLoad();return TNA.ok===1}
/* วาดภาพ k: กึ่งกลางล่างที่ (x,yb) กว้าง w (หน่วยโลก) · fx=กลับซ้ายขวา · คืน [ซ้าย,บน,กว้าง,สูง] */
function tnaPut(k,x,yb,w,fx){const p=TNA.pos[k];if(!p||!tnaOn())return null;const h=w*p[3]/p[2];
  if(fx){g.save();g.translate(x,0);g.scale(-1,1);g.drawImage(TNA.img,p[0],p[1],p[2],p[3],-w/2,yb-h,w,h);g.restore()}else g.drawImage(TNA.img,p[0],p[1],p[2],p[3],x-w/2,yb-h,w,h);return[x-w/2,yb-h,w,h]}
/* วาดให้พอดีกล่อง (ของติดผนัง) */
function tnaBox(k,cx,cy,bw,bh){const p=TNA.pos[k];if(!p||!tnaOn())return null;const s=Math.min(bw/p[2],bh/p[3]),w=p[2]*s,h=p[3]*s;g.drawImage(TNA.img,p[0],p[1],p[2],p[3],cx-w/2,cy-h/2,w,h);return[cx-w/2,cy-h/2,w,h]}
function tnaStd(k,x,y,sh){const S=TNA.sz[k];if(!S||!TNA.pos[k]||!tnaOn())return null;if(sh)try{gxShadow(x,y+S[1]-1,sh[0],sh[1],.5)}catch(e){}return tnaPut(k,x,y+S[1],S[0])}
/* ---------- เฟอร์นิเจอร์วางพื้น ---------- */
tvBed=(f=>function(b,x,y,t,O){if(b&&tnaStd(b,x,y,[54,11]))return;return f.apply(this,arguments)})(tvBed);
tvTable=(f=>function(b,x,y,t,O){if(b&&tnaStd(b,x,y,[40,8]))return;return f.apply(this,arguments)})(tvTable);
tvPlant=(f=>function(p,x,y,t,O){if(p){const r=tnaStd(p,x,y,[20,5]);if(r){if(p==='pla3'){tvGlow(x,r[1]+r[3]*.35,30,'120,240,220',.22+.08*Math.sin(t*2.2))}return}}return f.apply(this,arguments)})(tvPlant);
tvHearth=(f=>function(k,x,y,t,O){if(!k)return f.apply(this,arguments);const r=tnaStd(k,x,y,[42,9]);if(!r)return f.apply(this,arguments);
  const F=TNA.fl[k],fl=.6+.15*Math.sin(t*5)+.08*Math.sin(t*13),fx=r[0]+r[2]*F[0],fy=r[1]+r[3]*F[1];
  tvGlow(fx,fy,F[2]*3.2,'255,150,60',.32*fl);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.35*fl;g.fillStyle='#ff9a3a';g.beginPath();g.ellipse(fx,fy,F[2]*.55,F[2]*.38,0,0,7);g.fill();g.restore();
  for(let i=0;i<3;i++){const q=(t*.7+i/3)%1;g.fillStyle='rgba(255,'+(170+60*q|0)+',90,'+(.7*(1-q))+')';g.beginPath();g.arc(fx+Math.sin(t*3+i*2)*4,fy-F[2]*.3-q*F[2]*1.6,1.2,0,7);g.fill()}})(tvHearth);
tvLamp=(f=>function(L,x,y,t,i,O){if(!L)return f.apply(this,arguments);const S=TNA.sz[L];if(!S||!tnaOn())return f.apply(this,arguments);try{gxShadow(x,y+3,12,3.5,.45)}catch(e){}
  const fx=i===1&&L!=='lit3',r=tnaPut(L,x,y+S[1],S[0],fx);if(!r)return f.apply(this,arguments);const c=L==='lit3'?'140,220,255':L==='lit2'?'255,110,90':'255,200,110';
  (TNA.lp[L]||[]).forEach(([u,v],k)=>{const px=r[0]+r[2]*(fx?1-u:u),py=r[1]+r[3]*v;tvGlow(px,py,22,c,.35+.08*Math.sin(t*3+i*2+k))})})(tvLamp);
tvWardrobe=(f=>function(x,y,t,mine){if(!tnaOn()||!TNA.pos.wardrobe)return f.apply(this,arguments);const near=mine&&Math.hypot(me.x-x,me.y-(y+10))<95;
  try{gxShadow(x,y+5,40,8,.5)}catch(e){}const r=tnaPut('wardrobe',x,y+6,76);if(near&&r){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.16+.06*Math.sin(t*3);g.strokeStyle='#ffe6a0';g.lineWidth=2;g.beginPath();g.roundRect(r[0]-2,r[1]-2,r[2]+4,r[3]+4,8);g.stroke();g.restore()}})(tvWardrobe);
/* ---------- พรม: ภาพมุมบน → บีบเป็นวงรีเดิม 266×114 ---------- */
tvRug=(f=>function(r,x,y,t){if(!r||!tnaOn()||!TNA.pos[r])return f.apply(this,arguments);const p=TNA.pos[r];g.save();g.globalAlpha=.97;g.drawImage(TNA.img,p[0],p[1],p[2],p[3],x-133,y-57,266,114);
  if(r==='rug3'){g.globalCompositeOperation='lighter';g.globalAlpha=.06+.04*Math.sin(t*1.4);g.fillStyle='#ffd27a';g.beginPath();g.ellipse(x,y,90,38,0,0,7);g.fill()}g.restore()})(tvRug);
/* ---------- ไฟเพดาน: ภาพ + เชือก/โซ่จากหลังคา ---------- */
tvCeil=(f=>function(c,t,O){if(!c||!tnaOn()||!TNA.pos[c])return f.apply(this,arguments);const x=CX,sw=Math.sin(t*.8)*1.2,w=c==='cei1'?88:80,yb=c==='cei1'?CY-74:CY-66,p=TNA.pos[c],h=w*p[3]/p[2];
  g.strokeStyle=c==='cei1'?'#6a4a2a':'#a8863a';g.lineWidth=c==='cei1'?1.6:1.4;g.beginPath();g.moveTo(x,CY-352);g.lineTo(x+sw,yb-h+2);g.stroke();
  g.save();g.translate(x+sw,yb-h);g.rotate(sw*.004);g.drawImage(TNA.img,p[0],p[1],p[2],p[3],-w/2,0,w,h);g.restore();
  const cy=yb-h*(c==='cei1'?.33:.42);tvGlow(x+sw,cy,c==='cei1'?70:80,c==='cei1'?'255,210,130':'255,226,160',.3+.05*Math.sin(t*2.3));
  if(c==='cei2'){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const a=(t*.9+i*1.3)%6.28,q=.5+.5*Math.sin(t*3+i*2);g.globalAlpha=.55*q;g.fillStyle='#ffffff';g.beginPath();g.arc(x+sw+Math.cos(a)*w*.32,cy+h*.18+Math.sin(a)*4,1.1,0,7);g.fill()}g.restore()}})(tvCeil);
/* ---------- แท่นโชว์อุปกรณ์ ---------- */
function tnaPed(x,y){if(!tnaOn()||!TNA.pos.ped)return false;try{gxShadow(x,y+8,18,4.5,.45)}catch(e){}return!!tnaPut('ped',x,y+9,34)}
tvPedEmpty=(f=>function(x,y,t,i,mine){if(!tnaPed(x,y))return f.apply(this,arguments);if(!mine)return;
  g.save();g.globalAlpha=.35+.15*Math.sin(t*2+i);g.font='13px system-ui';g.textAlign='center';g.textBaseline='middle';g.globalAlpha*=.8;g.fillText(['⚔️','🛡️','💍','⛑️'][i],x,y-36+Math.sin(t*1.6+i)*2);g.textBaseline='alphabetic';g.restore()})(tvPedEmpty);
/* ---------- ของติดผนัง ---------- */
function tnaWall(w,x,y,t){const B={wal1:[x,y-6,76,78],wal2:[x,y-6,92,70],wal3:[x,y-8,88,80]}[w];if(!B||!tnaBox(w,B[0],B[1],B[2],B[3]))return false;
  if(w==='wal3')tvGlow(x,y-10,40,'255,210,110',.16+.06*Math.sin(t*2));return true}
/* ---------- ตู้โชว์ปลา: ช่องกระจก 6 ช่องตามภาพ ---------- */
const TNAF={cx:CX-140,cy:CY-279,w:112,c:[-31.4,.2,31.9],r:[-9.7,21.5],win:20};
function tnaFishCase(){return!!tnaBox('fish',TNAF.cx,TNAF.cy,TNAF.w,TNAF.w)}
function tnaFishCell(i){if(!tnaOn()||!TNA.pos.fish)return null;return[TNAF.cx+TNAF.c[i%3],TNAF.cy+TNAF.r[i/3|0]]}
function tnaFishDraw(q,i,x,y,t,mine){const s=TNAF.win;if(q){const F=FISH[q[0]];g.strokeStyle=FRC[F.r];g.lineWidth=1.4;g.strokeRect(x-s/2,y-s/2,s,s);
    if(F.r>=4)tvGlow(x,y,20,h2r(FRC[4]),.35+.15*Math.sin(t*2+i));g.font='14px system-ui';g.textAlign='center';g.textBaseline='middle';const fy=y+Math.sin(t*1.5+i)*1;(fsicDraw(F.id,x,fy,17)||g.fillText(F.ic,x,fy));g.textBaseline='alphabetic';
    g.font='bold 6px system-ui';g.lineWidth=2;g.strokeStyle='rgba(20,12,6,.85)';g.strokeText(Math.round(q[1])+'ซม.',x,y+s/2+6);g.fillStyle='#ffe6b0';g.fillText(Math.round(q[1])+'ซม.',x,y+s/2+6)}
  else if(mine&&i===0){g.font='bold 6.5px system-ui';g.textAlign='center';g.fillStyle='rgba(255,230,180,.6)';g.fillText('🎣 ตกปลา',TNAF.cx,TNAF.cy+TNAF.w*.5)}}
/* ---------- ชั้นถ้วยรางวัล: ไม้แผ่นบน/ล่างตรงกับ CY-282 และ CY-236 ---------- */
function tnaShelf(){if(!tnaOn()||!TNA.pos.shelf)return false;const p=TNA.pos.shelf,k=46/103,w=p[2]*k,h=p[3]*k;g.drawImage(TNA.img,p[0],p[1],p[2],p[3],CX+133-w/2,CY-282-40*k,w,h);return true}
/* ---------- แท่นสมุดเยี่ยม ---------- */
function tnaBook(x,y,T){if(!tnaOn()||!TNA.pos.book)return false;try{gxShadow(x,y+2,14,3.5,.4)}catch(e){}tnaPut('book',x,y+3,30);g.font='bold 7px system-ui';g.textAlign='center';g.fillStyle='#ffe6b0';g.fillText('📖 '+T.v,x,y+12);return true}
/* ---------- ผ้าผนัง/พื้น (tvBG) ---------- */
function tnaTx(th){if(TNA.off||!TNA.txok)return null;const n={'':0,thm1:1,thm2:2,thm3:3}[th||''];if(n===undefined)return null;return{f:n,l:n}}
function tnaTxFill(c,row,n,x,y,w,h,k){const I=TNA.tx;k=k||1;const th=h/k;for(let j=0;j<k;j++){const y0=Math.round(y+j*th),y1=Math.round(y+(j+1)*th);c.drawImage(I,n*320,row*426+(j?2:0),320,424,x,y0,w,y1-y0+(j<k-1?1:0))}}
setInterval(()=>{try{if(!TNA.off&&!TNA.img&&typeof tentHere==='function'&&tentHere())tnaLoad()}catch(e){}},1000);
