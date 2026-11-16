/* ---------- v645 ลุค HD-2D ขั้นต่อ: แสงไฟส่องตัวละคร · ลำแสงส่องลงมา · ความแรงตามแมพ ----------
   ① แสงไฟส่องตัว (HD2.rim): ตัวละคร/มอนที่อยู่ใกล้คบเพลิง กองไฟ โคม → ด้านที่หันเข้าหาไฟสว่างเป็นสีของไฟนั้น (วาดหลังตัวละคร ก่อนเลนส์ HD-2D)
   ② ลำแสงส่องลงมา (HD2.ray): แมพกลางแจ้ง/ป่า/วิหาร/ใต้ดินบางแมพ มีลำแสงเอียงจากบนจอ ส่ายช้า ๆ เลื่อนตามกล้องครึ่งหนึ่ง (ดูอยู่ระหว่างกล้องกับพื้น)
      สี/ความแรงตามแมพ (HD3.RAY) · กลางแจ้งตอนกลางคืนเป็นแสงจันทร์สีฟ้าจาง · ใต้ดินคงที่
   ③ ความแรงลุคตามแมพ: แสงฟุ้งแรงขึ้นในแมพมืด/ตอนกลางคืน (ไฟ เวท ลาวาเด่นขึ้น) */
const HD3={n:0,rn:0,err:'',sp:null,
  RAY:{1:[.45,'255,226,170'],2:[.35,'255,220,170'],3:[.3,'255,150,90'],4:[.8,'190,225,255'],8:[.35,'255,232,180'],10:[.5,'230,214,255'],12:[.6,'255,236,190'],13:[.9,'255,236,180'],14:[.6,'255,236,190'],15:[.6,'215,228,255'],16:[.85,'200,232,255'],17:[.5,'230,240,255'],18:[.9,'255,236,190'],
    19:[.7,'140,255,220'],20:[.5,'205,165,255'],23:[.6,'170,230,255'],24:[.7,'120,240,230'],25:[.7,'190,210,255'],27:[.8,'255,226,160'],28:[.85,'255,236,190'],30:[.9,'255,212,150'],32:[.9,'255,230,170'],44:[.8,'255,212,150'],45:[.5,'255,190,130']},
  UG:{19:1,20:1,23:1,24:1,25:1,27:1,44:1,45:1},
  BL:{3:1.3,19:1.4,24:1.4,26:1.35,22:1.25,33:1.2}};
HD2.rim=1;HD2.ray=1;HD2.blA0=HD2.blA;
function hd3Spr(){if(HD3.sp)return HD3.sp;const c=document.createElement('canvas');c.width=64;c.height=256;const x=c.getContext('2d'),d=x.createImageData(64,256);
  for(let y=0;y<256;y++){const v=y/255,fy=Math.min(1,v/.12)*Math.pow(1-v,1.6);for(let i=0;i<64;i++){const u=(i-31.5)/32,fx=Math.exp(-u*u*4.5),k=(y*64+i)*4;d.data[k]=d.data[k+1]=d.data[k+2]=255;d.data[k+3]=Math.round(255*fx*fy)}}
  x.putImageData(d,0,0);return HD3.sp=c}
/* ① แสงไฟส่องตัวละคร (เฟรมนี้: ตัวละคร/แสงถูกเก็บครบแล้วตอนเข้า zmPost) */
function hd3Rim(){if(!HD2.rim||!HD2.sh||hd2Skip())return;const Ls=HDL.L;if(!Ls.length)return;let dk=0,day=0;try{dk=dnState().dk}catch(e){}try{const h=dnHour(),dg=isDg()||isTw()||isArena();day=(!dg&&(typeof CLDG!=='function'||CLDG(curMap))&&h>=6.5&&h<=18.5)?1:0}catch(e){}
  const dayK=day?.35+dk:1,E=[];for(const c of HDL.C)E.push([c[0],c[1],Math.max(.6,Math.min(1.6,c[2])),18]);
  try{for(const m of mons){if(m.t===3||m.wb||m.pv||m.dum||m.hp<=0)continue;const r=(MT[m.t]&&MT[m.t].r)||12;if(m.x<cam.x-60||m.x>cam.x+W+60||m.y<cam.y-60||m.y>cam.y+H+80)continue;E.push([m.x,m.y+r*.85,Math.max(.7,Math.min(2.2,r/12)),r*.9])}}catch(e){}
  const Lt=Ls.slice().sort((a,b)=>b[2]*b[3]-a[2]*a[3]).slice(0,18),z=(ZM&&ZM.z>0?ZM.z:1)*DPR;
  g.save();g.setTransform(z,0,0,z,-cam.x*z,-cam.y*z);g.globalCompositeOperation='lighter';
  for(const [x,y,sc,tz] of E){const tx=x,ty=y-tz*sc;let k=0;
    for(const l of Lt){const dx=l[0]-tx,dy=l[1]-ty,d=Math.hypot(dx,dy),reach=l[2]*2+30;if(d<10||d>reach)continue;const I=Math.min(1,l[3]*2.4)*Math.pow(1-d/reach,1.2)*dayK;if(I<.06)continue;
      const c=(typeof l[4]==='string'&&/^\d+,\d+,\d+$/.test(l[4]))?l[4]:'255,190,110',ux=dx/d,uy=dy/d,cx=tx+ux*9*sc,cy=ty+uy*7*sc,r=19*sc,gr=g.createRadialGradient(cx,cy,0,cx,cy,r);
      gr.addColorStop(0,'rgba('+c+','+(.5*I).toFixed(3)+')');gr.addColorStop(.55,'rgba('+c+','+(.2*I).toFixed(3)+')');gr.addColorStop(1,'rgba('+c+',0)');g.fillStyle=gr;g.fillRect(cx-r,cy-r,r*2,r*2);HD3.n++;if(++k>=2)break}}
  g.restore()}
/* ② ลำแสง (พิกัดจอ หลังเลนส์ HD-2D) */
function hd3Ray(){if(!HD2.ray||!HD2.on||hd2Skip())return;const R=HD3.RAY[curMap];if(!R)return;let a=R[0],c=R[1];
  if(!HD3.UG[curMap]){let dk=0,h=12;try{dk=dnState().dk}catch(e){}try{h=dnHour()}catch(e){}if(h<6.5||h>18.5||dk>.45){a*=.45;c='170,195,255'}else a*=1-dk*.8}
  if(a<.05)return;const C=g.canvas,W2=C.width,H2=C.height,t=performance.now()/1000,s=DPR*(ZM&&ZM.z>0?ZM.z:1),cx=(typeof cam!=='undefined'?cam.x:0)*s*.45,sp=hd3Spr(),ang=.38;
  g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='screen';g.filter='none';
  const N=5,span=W2+H2*.6;for(let i=0;i<N;i++){const w=(70+((i*53)%60)+30*Math.sin(t*.21+i))*DPR*1.6,base=(i+.5)/N*span+Math.sin(t*.07+i*1.9)*40*DPR,x=((base-cx)%span+span)%span-H2*.3,L=H2*(1.05+.2*Math.sin(i*2.3)),fl=.55+.45*Math.sin(t*(.31+i*.07)+i*2.1);
    g.save();g.translate(x,-H2*.05);g.rotate(-ang);g.globalAlpha=Math.max(0,a*.42*fl);g.drawImage(sp,-w/2,0,w,L);g.globalAlpha=Math.max(0,a*.22*fl);g.drawImage(sp,-w*.18,0,w*.36,L*.9);g.restore()}
  /* ปลายแสงกระทบพื้น: ทินต์สีลำแสงอ่อน ๆ ช่วงบน */
  g.globalCompositeOperation='soft-light';g.globalAlpha=1;const gr=g.createLinearGradient(0,0,W2*.6,H2);gr.addColorStop(0,'rgba('+c+','+(.22*a).toFixed(3)+')');gr.addColorStop(1,'rgba('+c+',0)');g.fillStyle=gr;g.fillRect(0,0,W2,H2);
  /* ย้อมสีลำแสงด้วย multiply ไม่ได้บน screen → ทาสีทับบาง ๆ */
  g.globalCompositeOperation='source-over';g.restore();HD3.rn++}
/* ③ ความแรงตามแมพ */
function hd3Tune(){let dk=0;try{dk=dnState().dk}catch(e){}const m=curMap;HD2.blA=HD2.blA0*(HD3.BL[m]||1)*(1+Math.min(.5,dk*.6))}
hd2Pass=(f=>function(){try{hd3Tune()}catch(e){}const r=f.apply(this,arguments);try{hd3Ray()}catch(e){HD3.err=String(e)}return r})(hd2Pass);
zmPost=(f=>function(){try{hd3Rim()}catch(e){HD3.err=String(e)}return f.apply(this,arguments)})(zmPost);
