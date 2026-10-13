/* ---------- v359 ภาค 7 บทที่ 3 · กระจกของโอเรียน (แมพ 36 · ยอดหอดูดาวโอเรียน) ---------- */
const OBDOME={x:1600,y:600},OBS={x:1600,y:860},OBL={x:1600,y:1300};
const OBM=[[2500,860],[2500,1500],[1900,2100],[900,2100],[900,1300]];
const OBOK=[2,3,4,6,0],OBR0=[5,0,1,3,6],OBPL=58,OBPR=48,OBH=50;
const OBPATH=[[[1600,3000],[1600,2620],[1560,2250],[1600,1650],[1600,1300],[1600,860],[1600,700]]];
const OBFOOT=[[[1600,1300],[2050,1060],[2500,920]],[[1600,1300],[2080,1420],[2500,1560]],[[1600,1650],[1760,1900],[1900,2160]],[[1600,1650],[1250,1880],[900,2160]],[[1600,1300],[1250,1330],[900,1360]]];
const OBLORE=['«ปีที่หนึ่ง — ดาวเหนืออัสตราสว่างน้อยลงหนึ่งส่วนพัน ไม่มีใครเห็นนอกจากข้า และข้าก็ไม่ได้บอกใคร»',
 '«ปีที่เก้า — กระจกบานที่สองเย็บรอยร้าวได้หนึ่งคืน รุ่งเช้ามันก็แตกอีก แสงอย่างเดียวไม่พอ»',
 '«ปีที่ยี่สิบสาม — ข้าไปขอนาฬิกาจากช่างแห่งอารัณยา พวกเขาปฏิเสธ… เวลาของเมืองหนึ่ง ให้อีกเมืองไม่ได้»',
 '«ปีที่สามสิบเอ็ด — ข้าร้องเพลงกล่อมคนเดียวบนยอดเขาทั้งคืน ดาวไม่ได้ยิน เสียงเดียวมันเบาเกินไป»',
 '«ปีที่สี่สิบ — ถ้าข้าเย็บดาวไม่สำเร็จ ข้าต้องเลือกว่าเมืองไหนจะได้มีแสงต่อ… ขอให้ข้าไม่ต้องเลือก»'];
const OBZN={dock:['ท่าเรือฟ้าหลวง','เรือฟ้าลำสุดท้ายของท่านโอเรียนยังผูกอยู่ที่นี่'],plaza:['ลานเครื่องเย็บดาว','วงแหวนทองเหลืองที่รอแสงมาสามร้อยปี'],dome:['หอดูดาวโอเรียน','กล้องดูดาวที่ใหญ่ที่สุดเท่าที่เคยมีมา'],snow:['ยอดเขาเหนือเมฆ','หิมะที่นี่ไม่เคยละลายมาสามร้อยปี'],rim:['ขอบผาเหนือทะเลเมฆ','ทะเลเมฆทอดยาวสุดสายตา']};
let OBN={gl:[],dr:[],cl:[]},OBP={on:-1,t:0,pr:0},OBCC={t:0,c:null};
const obZone=(x,y)=>y>2620&&Math.abs(x-1600)<520?'dock':Math.hypot(x-OBL.x,y-OBL.y)<360?'plaza':Math.hypot(x-OBDOME.x,y-OBDOME.y)<430?'dome':(x<330||x>2870||y<380||y>2900)?'rim':'snow';
const obSegD=(x,y,P)=>{let d=1e9;for(const L of P)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d};
/* ---------- ปริศนากระจกห้าบาน ---------- */
function obRot(){const q=me.sty,v=q?q.p7mr|0:0;if(!(v&32768))return OBR0.slice();return OBM.map((_,i)=>(v>>(i*3))&7)}
function obSetRot(R){const q=me.sty;if(!q)return;let v=32768;R.forEach((d,i)=>v|=(d&7)<<(i*3));q.p7mr=v;OBCC.c=null}
function obCast(fx,fy,d,skip){const ux=Math.cos(d*Math.PI/4),uy=Math.sin(d*Math.PI/4);let best=null,bd=1e9;
  const test=(x,y,k,i)=>{const dx=x-fx,dy=y-fy,al=dx*ux+dy*uy;if(al<=20)return;if(Math.abs(dx*uy-dy*ux)>46)return;if(al<bd){bd=al;best={k,i,x,y}}};
  OBM.forEach(([x,y],i)=>{if(!skip.has(i))test(x,y,'m',i)});test(OBL.x,OBL.y,'L',-1);
  return best||{k:'x',i:-1,x:fx+ux*1700,y:fy+uy*1700}}
function obChain(){const R=p6Past('p7mr')?OBOK.slice():obRot(),segs=[],lit=[],seen=new Set();let fx=OBS.x,fy=OBS.y,d=0,hitL=false;
  for(let s=0;s<7;s++){const h=obCast(fx,fy,d,seen);segs.push([fx,fy,h.x,h.y,h.k]);if(h.k==='m'){lit.push(h.i);seen.add(h.i);fx=h.x;fy=h.y;d=R[h.i];continue}if(h.k==='L')hitL=true;break}
  let n=0;for(let i=0;i<lit.length;i++){if(lit[i]!==i)break;n=i+1}
  return{segs,lit,hitL,R,links:Math.max(0,n-1)+(n===5&&hitL?1:0)}}
function obC(){const n=performance.now();if(OBCC.c&&n-OBCC.t<40)return OBCC.c;OBCC.t=n;return OBCC.c=obChain()}
function obAqT(st){if(!st.p7mr||!me.sty)return null;const C=obChain();if(C.links>=5)return null;const[mx,my]=OBM[C.links];return{mp:36,act:'reach',x:mx,y:my+OBPL,lb:'ไปหมุนกระจกบานที่ '+(C.links+1)}}
function obTick(dt,now,x,y,mv){if(me.down<=0){me.x=Math.max(130,Math.min(3070,me.x));me.y=Math.max(200,Math.min(3060,me.y))}
  {const N=MAPS[36].npc2,on=p6Past('p7ob');N.x=on?1760:-9999;N.y=on?1390:-9999}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p7mr){OBP.on=-1;OBP.pr=0;return}
  const C=obChain();if(q.n!==C.links){q.n=C.links;try{stHud()}catch(e){}}
  let on=-1;OBM.forEach(([mx,my],i)=>{if(Math.hypot(x-mx,y-my-OBPL)<OBPR)on=i});
  if(on<0){OBP.on=-1;OBP.t=0;OBP.pr=0;return}
  if(OBP.on!==on){OBP.on=on;OBP.t=0;OBP.pr=0}
  OBP.t+=dt;if(on!==C.links||C.links>=5){OBP.pr=0;return}
  if(OBP.t<.6)return;OBP.pr+=dt;if(OBP.pr<1)return;OBP.pr=0;
  const R=obRot();R[on]=(R[on]+1)%8;obSetRot(R);try{sfx('click')}catch(e){}
  const C2=obChain();if(C2.links>C.links){q.n=C2.links;const k=C2.links-1;if(!((q.p7ml|0)>>k&1)){q.p7ml=(q.p7ml|0)|(1<<k);PALG.card={h:'🪞 บันทึกของโอเรียน '+C2.links+'/5',t:OBLORE[k],s:now,d:9};try{sdGive(2,'แสงผ่านกระจก')}catch(e){}}
    try{sfx('quest')}catch(e){}const nx=k<4?OBM[k+1]:[OBL.x,OBL.y];try{burst(nx[0],nx[1]-OBH,['#c8f0ff','#ffffff','#ffe8a0'],40,180,1,{glow:1,g:-40})}catch(e){}try{stHud()}catch(e){}OBP.t=-.8}
  try{writeSave()}catch(e){}}
/* ---------- สร้างฉาก ---------- */
function obBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=0;const R=gxRng(3636);OBCC.c=null;
  const ok=(x,y,m)=>Math.hypot(x-M.sx,y-M.sy)>M.sr+60+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>120+m)&&Math.hypot(x-OBDOME.x,y-OBDOME.y)>330+m&&Math.hypot(x-OBL.x,y-OBL.y)>380+m&&Math.hypot(x-OBS.x,y-OBS.y)>130+m
    &&OBM.every(([mx,my])=>Math.hypot(x-mx,y-my-30)>150+m)&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>110+m)&&obSegD(x,y,OBPATH)>80+m&&obSegD(x,y,OBFOOT)>55+m&&!(y>2600&&Math.abs(x-1600)<440)&&Math.hypot(x-1330,y-1040)>110+m&&Math.hypot(x-2350,y-2450)>220+m;
  for(let dx=-150;dx<=150;dx+=50){trees.push({x:OBDOME.x+dx,y:OBDOME.y-12,r:44,inv:1,ns:1});trees.push({x:OBDOME.x+dx,y:OBDOME.y-90,r:44,inv:1,ns:1})}
  trees.push({x:OBDOME.x,y:OBDOME.y+4,r:0,k:'obdome',ht:360,hw:220,fw:200,ns:1});
  trees.push({x:OBS.x,y:OBS.y,r:20,k:'obprism',ht:100,hw:40});
  trees.push({x:OBL.x,y:OBL.y,r:56,k:'obloom',ht:150,hw:90});
  OBM.forEach(([x,y],i)=>trees.push({x,y,r:22,k:'obmir',v:i,ht:110,hw:50}));
  trees.push({x:1330,y:1040,r:26,k:'obstat',ht:150,hw:60});
  trees.push({x:1850,y:2950,r:0,k:'obskiff',ht:200,ns:1,nc:1});
  for(let i=0,n=0;i<900&&n<48;i++){const x=180+R()*2840,y=380+R()*2420;if(!ok(x,y,0))continue;trees.push({x,y,r:16,k:'obpine',v:(R()*3)|0,sc:.8+R()*.55,ht:150,hw:46});n++}
  for(let i=0,n=0;i<600&&n<20;i++){const x=180+R()*2840,y=380+R()*2500;if(!ok(x,y,-20))continue;trees.push({x,y,r:20,k:'obrock',v:(R()*3)|0,sc:.8+R()*.5,ht:60,hw:40});n++}
  for(let i=0,n=0;i<500&&n<16;i++){const x=180+R()*2840,y=380+R()*2500;if(!ok(x,y,-30))continue;trees.push({x,y,r:10,k:'obcry',v:(R()*3)|0,ht:50});n++}
  for(const L of OBPATH)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=130;d<dl;d+=280){const t=d/dl,px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t;for(const s of[-1,1]){const x=px+s*62,y=py;if(Math.hypot(x-OBL.x,y-OBL.y)<340||Math.hypot(x-OBDOME.x,y-OBDOME.y)<300||y>2620||Math.hypot(x-OBS.x,y-OBS.y)<90)continue;trees.push({x,y,r:6,k:'oblamp',ht:100})}}}
  trees.push({x:1760,y:1390,r:0,k:'cel6',ht:90,ns:1,nc:1});
  OBN.gl=[];for(let i=0;i<240;i++)OBN.gl.push([150+R()*2900,250+R()*2780,R()*6]);
  OBN.dr=[];for(let i=0;i<80;i++)OBN.dr.push([R()*3200,R()*3200,120+R()*260,R()]);
  OBN.cl=[];for(let k=-60;k<3300;k+=95){OBN.cl.push([k+R()*50,60+R()*70,70+R()*60]);OBN.cl.push([k+R()*50,3140+R()*60,70+R()*60]);OBN.cl.push([50+R()*50,k+R()*50,70+R()*60]);OBN.cl.push([3150+R()*50,k+R()*50,70+R()*60])}
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.k==='cel6'||t.k==='obskiff'||t.k==='oblamp')return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-40,t.y-30,t.x+w+40,t.y+40],x:t.x,y:t.y,r:t.r||40,w})})}
function obPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x0,y0,x1,y1)=>x1>ox&&x0<X1&&y1>oy&&y0<Y1;
  const bg=c.createRadialGradient(1600,1500,200,1600,1500,2400);bg.addColorStop(0,'#e3ebf4');bg.addColorStop(.6,'#d4deea');bg.addColorStop(1,'#c2cedd');c.fillStyle=bg;c.fillRect(ox,oy,S,S);
  for(const[x,y,r,v]of OBN.dr){if(!inB(x-r,y-r,x+r,y+r))continue;const g2=c.createRadialGradient(x,y,4,x,y,r);g2.addColorStop(0,v<.5?'rgba(255,255,255,.4)':'rgba(140,160,200,.16)');g2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}
  /* ลอนหิมะจากลม */
  c.lineCap='round';palGrid(ox,oy,X1,Y1,96,78,1,(x,y,i,j)=>{const h=palH(i,j,661);if(h<.64)return;const px=x+palH(j,i,662)*60,py=y+palH(i,j,663)*50,L=30+h*60;if(obSegD(px,py,OBPATH)<50||Math.hypot(px-OBL.x,py-OBL.y)<320)return;
    c.strokeStyle='rgba(140,162,200,.3)';c.lineWidth=2.2;c.beginPath();c.moveTo(px-L*.5,py+4);c.quadraticCurveTo(px,py-6,px+L*.5,py+2);c.stroke();
    c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=1.6;c.beginPath();c.moveTo(px-L*.45,py+1);c.quadraticCurveTo(px,py-9,px+L*.45,py-1);c.stroke()});
  /* หินโผล่พ้นหิมะ */
  palGrid(ox,oy,X1,Y1,52,44,1,(x,y,i,j)=>{const h=palH(i,j,671);if(h<.88)return;const px=x+palH(j,i,672)*44,py=y+palH(i,j,673)*36;if(obSegD(px,py,OBPATH)<40)return;const s=3+h*5;
    c.fillStyle='rgba(60,72,96,.25)';c.beginPath();c.ellipse(px+1,py+2,s+1,s*.5,0,0,7);c.fill();c.fillStyle='#7c889c';c.beginPath();c.ellipse(px,py,s,s*.55,0,0,7);c.fill();c.fillStyle='#f4f8fc';c.beginPath();c.ellipse(px-1,py-s*.25,s*.8,s*.28,0,0,7);c.fill()});
  /* ทางเดินย่ำหิมะ */
  for(const L of OBFOOT)for(const[w,col]of[[34,'rgba(130,150,190,.2)'],[20,'rgba(160,180,212,.32)']]){c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
  /* ทางหลักปูศิลา */
  for(const L of OBPATH){for(const[w,col]of[[72,'rgba(80,95,125,.22)'],[58,'#8e9ab0'],[46,'#a8b3c6']]){c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
    for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dl=Math.hypot(b[0]-a[0],b[1]-a[1]),ux=(b[0]-a[0])/dl,uy=(b[1]-a[1])/dl,nx=-uy,ny=ux;if(!inB(Math.min(a[0],b[0])-40,Math.min(a[1],b[1])-40,Math.max(a[0],b[0])+40,Math.max(a[1],b[1])+40))continue;
      for(let d=0;d<dl;d+=26){const px=a[0]+ux*d,py=a[1]+uy*d,k=Math.round(d/26);c.strokeStyle='rgba(60,70,92,.35)';c.lineWidth=1.2;c.beginPath();c.moveTo(px-nx*22,py-ny*22);c.lineTo(px+nx*22,py+ny*22);c.stroke();const o=(k%2?-1:1)*8;c.beginPath();c.moveTo(px+nx*o,py+ny*o);c.lineTo(px+nx*o+ux*26,py+ny*o+uy*26);c.stroke();
        if(palH(k,i,681)>.55){c.fillStyle='rgba(244,248,252,.85)';c.beginPath();c.ellipse(px+nx*(palH(i,k,682)-.5)*36,py+ny*(palH(i,k,682)-.5)*36,6+palH(k,k,683)*8,3+palH(k,i,684)*3,Math.atan2(uy,ux),0,7);c.fill()}}}}
  /* ท่อแสงทองเหลืองจากหอสู่แท่นปริซึม */
  if(inB(1580,640,1620,870)){c.strokeStyle='#6a4c1c';c.lineWidth=10;c.beginPath();c.moveTo(1600,650);c.lineTo(1600,850);c.stroke();c.strokeStyle='#d8a850';c.lineWidth=6;c.stroke();c.strokeStyle='rgba(255,240,200,.7)';c.lineWidth=1.5;c.beginPath();c.moveTo(1598,650);c.lineTo(1598,850);c.stroke();for(let y=670;y<850;y+=36){c.fillStyle='#8a6a2a';c.fillRect(1592,y,16,5)}}
  /* ลานแผนที่ดาวรอบเครื่องเย็บดาว */
  {const P=OBL,R=300;if(inB(P.x-R-20,P.y-R,P.x+R+20,P.y+R)){c.fillStyle='rgba(40,50,80,.25)';c.beginPath();c.ellipse(P.x+6,P.y+12,R+10,R*.9+10,0,0,7);c.fill();c.fillStyle='#56627a';c.beginPath();c.ellipse(P.x,P.y,R,R*.9,0,0,7);c.fill();
    const ig=c.createRadialGradient(P.x,P.y,30,P.x,P.y,R);ig.addColorStop(0,'#6c7a96');ig.addColorStop(1,'#4e5a72');c.fillStyle=ig;c.beginPath();c.ellipse(P.x,P.y,R-12,R*.9-12,0,0,7);c.fill();
    for(const[rr,w,a]of[[R-16,4,.85],[R-58,1.4,.6],[150,2.6,.75],[96,1.4,.6]]){c.strokeStyle='rgba(216,168,80,'+a+')';c.lineWidth=w;c.beginPath();c.ellipse(P.x,P.y,rr,rr*.9,0,0,7);c.stroke()}
    c.strokeStyle='rgba(216,168,80,.3)';c.lineWidth=1;for(let i=0;i<24;i++){const a=i/24*6.283;c.beginPath();c.moveTo(P.x+Math.cos(a)*150,P.y+Math.sin(a)*135);c.lineTo(P.x+Math.cos(a)*(R-58),P.y+Math.sin(a)*(R-58)*.9);c.stroke()}
    const CS=[[[-200,-90],[-160,-130],[-110,-110],[-120,-60]],[[120,-150],[170,-120],[200,-160],[230,-100]],[[160,90],[210,70],[220,130]],[[-210,80],[-170,130],[-120,110],[-90,150]]];c.strokeStyle='rgba(220,230,255,.45)';c.lineWidth=1.2;
    for(const cs of CS){c.beginPath();cs.forEach(([dx,dy],i)=>i?c.lineTo(P.x+dx,P.y+dy*.9):c.moveTo(P.x+dx,P.y+dy*.9));c.stroke();for(const[dx,dy]of cs){c.fillStyle='#eef4ff';PST(c,P.x+dx,P.y+dy*.9,4.5,1.8,4,0);c.fill()}}
    c.fillStyle='rgba(244,248,252,.9)';for(let i=0;i<14;i++){const a=palH(i,7,691)*6.283,rr=R-6-palH(i,9,692)*20;c.beginPath();c.ellipse(P.x+Math.cos(a)*rr,P.y+Math.sin(a)*rr*.9,26+palH(i,3,693)*30,9+palH(i,5,694)*7,a+1.57,0,7);c.fill()}}}
  /* ลานหน้าหอดูดาว */
  if(inB(1260,560,1940,820)){c.fillStyle='rgba(60,70,95,.2)';c.beginPath();c.ellipse(1604,712,300,104,0,0,7);c.fill();c.fillStyle='#98a4b8';c.beginPath();c.ellipse(1600,706,292,96,0,0,7);c.fill();c.strokeStyle='rgba(60,70,92,.3)';c.lineWidth=1.2;for(let k=1;k<4;k++){c.beginPath();c.ellipse(1600,706,292*k/4,96*k/4,0,0,7);c.stroke()}
    c.fillStyle='rgba(244,248,252,.85)';for(let i=0;i<9;i++){const a=palH(i,2,695)*3.14,x=1600+Math.cos(a)*270,y=706+Math.sin(a)*86;c.beginPath();c.ellipse(x,y,30,9,0,0,7);c.fill()}}
  /* แผ่นศิลาหน้ากระจก */
  OBM.forEach(([mx,my],i)=>{const px=mx,py=my+OBPL;if(!inB(px-60,py-50,px+60,py+50))return;c.fillStyle='rgba(50,60,90,.25)';c.beginPath();c.ellipse(px+3,py+5,OBPR+3,(OBPR+3)*.55,0,0,7);c.fill();c.fillStyle='#8692a8';c.beginPath();c.ellipse(px,py,OBPR,OBPR*.55,0,0,7);c.fill();
    c.strokeStyle='rgba(200,225,255,.7)';c.lineWidth=2;c.beginPath();c.ellipse(px,py,OBPR-8,(OBPR-8)*.55,0,0,7);c.stroke();c.lineWidth=1.2;c.beginPath();c.ellipse(px,py,OBPR-18,(OBPR-18)*.55,0,0,7);c.stroke();
    c.strokeStyle='rgba(220,235,255,.85)';c.lineWidth=2;c.beginPath();c.ellipse(px,py,14,8,0,Math.PI*1.1,Math.PI*2.6);c.stroke();c.fillStyle='rgba(220,235,255,.85)';c.beginPath();c.moveTo(px+14,py-1);c.lineTo(px+19,py-7);c.lineTo(px+9,py-6);c.closePath();c.fill()});
  /* ท่าเรือฟ้า */
  if(inB(1380,2800,1820,3010)){const x0=1420,y0=2830,w=360,h=160;c.fillStyle='rgba(40,40,60,.25)';c.fillRect(x0+6,y0+10,w,h);c.fillStyle='#7a5a3c';c.fillRect(x0,y0,w,h);c.strokeStyle='rgba(40,26,14,.55)';c.lineWidth=1.4;for(let x=x0+24;x<x0+w;x+=24){c.beginPath();c.moveTo(x,y0);c.lineTo(x,y0+h);c.stroke()}
    c.strokeStyle='rgba(200,160,110,.35)';c.lineWidth=1;for(let x=x0+12;x<x0+w;x+=24){c.beginPath();c.moveTo(x,y0+4);c.lineTo(x,y0+h-4);c.stroke()}c.fillStyle='#4a3420';for(const[px,py]of[[x0,y0],[x0+w,y0],[x0,y0+h],[x0+w,y0+h],[x0+w/2,y0+h]]){c.beginPath();c.arc(px,py,7,0,7);c.fill()}
    c.fillStyle='rgba(244,248,252,.85)';for(let i=0;i<8;i++){c.beginPath();c.ellipse(x0+palH(i,1,696)*w,y0+(i%2?4:h-4),24,6,0,0,7);c.fill()}}
  /* บ่อน้ำแข็ง */
  {const x=2350,y=2450;if(inB(x-190,y-130,x+190,y+130)){c.fillStyle='rgba(60,80,110,.25)';c.beginPath();c.ellipse(x+4,y+8,176,114,0,0,7);c.fill();const ig=c.createLinearGradient(x-170,y-110,x+170,y+110);ig.addColorStop(0,'#cfeaf6');ig.addColorStop(.5,'#a6d2e8');ig.addColorStop(1,'#c4e2f2');c.fillStyle=ig;c.beginPath();c.ellipse(x,y,170,108,0,0,7);c.fill();
    c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=1.4;c.beginPath();c.moveTo(x-90,y-30);c.lineTo(x-30,y-6);c.lineTo(x-40,y+40);c.moveTo(x-30,y-6);c.lineTo(x+40,y-20);c.lineTo(x+110,y+10);c.moveTo(x+40,y-20);c.lineTo(x+60,y+50);c.stroke();
    c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=6;c.beginPath();c.moveTo(x-110,y-60);c.lineTo(x-60,y-80);c.moveTo(x+30,y+60);c.lineTo(x+90,y+40);c.stroke();c.strokeStyle='#f4f8fc';c.lineWidth=8;c.beginPath();c.ellipse(x,y,172,110,0,0,7);c.stroke()}}
  /* ขอบผา + ทะเลเมฆ */
  {const B=[130,190,3070,3070];if(ox<B[0]+90||oy<B[1]+90||X1>B[2]-90||Y1>B[3]-90){
    const cg=c.createLinearGradient(0,0,0,3200);cg.addColorStop(0,'#eef0fa');cg.addColorStop(1,'#e2e4f4');c.fillStyle=cg;
    c.fillRect(ox,oy,Math.max(0,B[0]-ox),S);c.fillRect(Math.max(ox,B[2]),oy,Math.max(0,X1-B[2]),S);c.fillRect(ox,oy,S,Math.max(0,B[1]-oy));c.fillRect(ox,Math.max(oy,B[3]),S,Math.max(0,Y1-B[3]));
    for(const[x,y,r]of OBN.cl){if(!inB(x-r,y-r,x+r,y+r))continue;const g2=c.createRadialGradient(x-r*.2,y-r*.3,4,x,y,r);g2.addColorStop(0,'rgba(255,255,255,.95)');g2.addColorStop(.7,'rgba(236,236,250,.8)');g2.addColorStop(1,'rgba(226,228,246,0)');c.fillStyle=g2;c.beginPath();c.arc(x,y,r,0,7);c.fill()}
    const edge=(x0,y0,x1,y1,nx,ny)=>{const dl=Math.hypot(x1-x0,y1-y0),ux=(x1-x0)/dl,uy=(y1-y0)/dl;for(let d=0;d<dl;d+=36){const px=x0+ux*d,py=y0+uy*d;if(!inB(px-60,py-60,px+60,py+60))continue;const h=palH(Math.round(d/36),Math.round(px+py),701),dep=18+h*26;
      c.fillStyle='#6e7a90';c.beginPath();c.moveTo(px,py);c.lineTo(px+ux*38,py+uy*38);c.lineTo(px+ux*30+nx*dep,py+uy*30+ny*dep);c.lineTo(px+ux*8+nx*(dep*.8),py+uy*8+ny*(dep*.8));c.closePath();c.fill();
      c.fillStyle='#f4f8fc';c.beginPath();c.moveTo(px-ux*2,py-uy*2);c.lineTo(px+ux*40,py+uy*40);c.lineTo(px+ux*30+nx*6,py+uy*30+ny*6);c.lineTo(px+ux*8+nx*5,py+uy*8+ny*5);c.closePath();c.fill();
      if(h>.6){c.fillStyle='rgba(220,240,255,.9)';c.beginPath();c.moveTo(px+ux*14+nx*dep*.7,py+uy*14+ny*dep*.7);c.lineTo(px+ux*18+nx*(dep+12),py+uy*18+ny*(dep+12));c.lineTo(px+ux*22+nx*dep*.7,py+uy*22+ny*dep*.7);c.fill()}}};
    edge(B[0],B[1],B[2],B[1],0,-1);edge(B[0],B[3],B[2],B[3],0,1);edge(B[0],B[1],B[0],B[3],-1,0);edge(B[2],B[1],B[2],B[3],1,0)}}}
function obGroundFx(){const T=performance.now()/1000,Q=LOWQ,C=obC();g.save();g.globalCompositeOperation='lighter';
  for(const[x,y,ph]of OBN.gl){if(!palVis(x,y,8))continue;const q=Math.sin(T*2.2+ph);if(q<.75)continue;glowAt(x,y,2.6,'255,255,255',(q-.75)*3.2)}
  const st=stCur(),q=me.sty,act=!!(st&&st.p7mr&&q&&q.a===1);
  OBM.forEach(([mx,my],i)=>{const px=mx,py=my+OBPL;if(!palVis(px,py,60))return;const lit=C.lit.includes(i);glowAt(px,py,OBPR*.9,lit?'150,210,255':'120,140,180',lit?.16:.05);
    if(act&&i===C.links&&C.links<5){const pu=.5+.5*Math.sin(T*4);glowAt(px,py,OBPR+6,'170,230,255',.22+.25*pu)}});
  {const sol=C.links>=5;if(palVis(OBL.x,OBL.y,300))glowAt(OBL.x,OBL.y,sol?260:120,'150,210,255',sol?.2+.05*Math.sin(T*2):.05)}
  for(const t of trees){if(t.k!=='oblamp'||!palVis(t.x,t.y-80,40))continue;glowAt(t.x,t.y-86,20,'255,200,130',.5+.1*Math.sin(T*5+t.x));glowAt(t.x,t.y,36,'255,190,120',.1)}
  if(palVis(1600,700,120)){const f=.7+.3*Math.sin(T*9)*Math.sin(T*5.3);glowAt(1600,640,60,'255,190,110',.25*f)}
  g.restore()}
function obScreen(T,z,Hs){const Q=LOWQ,cx=cam.x*z,cy=cam.y*z,wrap=(v,s)=>((v%s)+s)%s;g.save();
  let dk=0;try{dk=dnState().dk||0}catch(e){}const au=.05+.14*Math.min(1,dk/.4);
  g.globalCompositeOperation='lighter';for(let b=0;b<(Q?1:3);b++){const col=['120,255,200','140,190,255','200,150,255'][b],base=Hs*(.06+b*.07),pts=[];
    for(let xx=-32;xx<=SW0+32;xx+=16){const ph=T*.22+b*1.7+(xx+cx*.15)*.006;pts.push([xx,base+Math.sin(ph)*24+Math.sin(ph*2.3)*9-wrap(cy*.08,30),62+30*Math.sin(ph*1.7+b)])}
    g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(const p of pts)g.lineTo(p[0],p[1]);for(let i=pts.length-1;i>=0;i--)g.lineTo(pts[i][0],pts[i][1]+pts[i][2]);g.closePath();
    const gr=g.createLinearGradient(0,base-36,0,base+124);gr.addColorStop(0,'rgba('+col+',0)');gr.addColorStop(.3,'rgba('+col+','+au+')');gr.addColorStop(.65,'rgba('+col+','+(au*.4)+')');gr.addColorStop(1,'rgba('+col+',0)');g.fillStyle=gr;g.fill();
    if(!Q){g.strokeStyle='rgba('+col+','+(au*.7)+')';g.lineWidth=2;for(let i=0;i<pts.length;i+=2){const p=pts[i],q=.5+.5*Math.sin(T*1.3+i*.7+b);if(q<.45)continue;g.globalAlpha=q;g.beginPath();g.moveTo(p[0],p[1]+5);g.lineTo(p[0],p[1]+p[2]*.8);g.stroke()}g.globalAlpha=1}}
  g.globalCompositeOperation='source-over';g.fillStyle='#ffffff';const n=Q?22:56;for(let i=0;i<n;i++){const sp=28+(i%5)*12,x=wrap(i*97.3-cx*.5+Math.sin(T*.7+i)*18+T*16,SW0+20)-10,y=wrap(i*61.7-cy*.5+T*sp,Hs+20)-10,s=1+(i%3)*.7;g.globalAlpha=.45+.4*((i*37)%10)/10;g.beginPath();g.arc(x,y,s,0,7);g.fill()}g.globalAlpha=1;
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.38,SW0/2,Hs/2,Math.max(SW0,Hs)*.78);vg.addColorStop(0,'rgba(30,50,90,0)');vg.addColorStop(1,'rgba(30,50,90,.2)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);g.restore()}
/* ลำแสง + ภาพสะท้อนของโอเรียน (วาดทับตัวละคร) */
function obDraw(){if(curMap!==36||isDg())return;const T=performance.now()/1000,Q=LOWQ,C=obC();g.save();g.lineCap='round';
  const bl=(ax,ay,bx,by,end,w,al,col)=>{if(end)g.strokeStyle='rgba('+col+','+al+')';else{const q=g.createLinearGradient(ax,ay,bx,by);q.addColorStop(0,'rgba('+col+','+al+')');q.addColorStop(.75,'rgba('+col+','+(al*.25)+')');q.addColorStop(1,'rgba('+col+',0)');g.strokeStyle=q}g.lineWidth=w;g.beginPath();g.moveTo(ax,ay);g.lineTo(bx,by);g.stroke()};
  /* ลำแสงชั้นสี (มองเห็นบนหิมะกลางวัน) */
  C.segs.forEach(([x1,y1,x2,y2,k])=>{const end=k!=='x',fl=.85+.15*Math.sin(T*7+x1*.01);bl(x1,y1-OBH,x2,y2-OBH,end,14,.16,'50,120,220');bl(x1,y1-OBH,x2,y2-OBH,end,5,.8*fl,'80,175,255');bl(x1,y1-OBH,x2,y2-OBH,end,2,1,'255,255,255')});
  g.globalCompositeOperation='lighter';
  C.segs.forEach(([x1,y1,x2,y2,k],si)=>{const ax=x1,ay=y1-OBH,bx=x2,by=y2-OBH,end=k!=='x';bl(ax,ay,bx,by,end,20,.1,'150,210,255');
    if(!Q){const len=Math.hypot(bx-ax,by-ay),n=Math.min(8,Math.ceil(len/180));for(let i=0;i<n;i++){const u=(T*.55+i/n+si*.13)%1;if(!end&&u>.7)continue;glowAt(ax+(bx-ax)*u,ay+(by-ay)*u,4,'230,250,255',.8)}}});
  C.lit.forEach(i=>{const[mx,my]=OBM[i];if(palVis(mx,my-OBH,60))glowAt(mx,my-OBH,28,'190,235,255',.42+.1*Math.sin(T*3+i))});
  if(palVis(OBS.x,OBS.y-OBH,60))glowAt(OBS.x,OBS.y-OBH,24,'200,240,255',.6);
  if(C.hitL&&palVis(OBL.x,OBL.y-70,100))glowAt(OBL.x,OBL.y-70,C.links>=5?72:30,'200,240,255',C.links>=5?.45:.22);
  obEcho(T);g.restore();
  if(OBP.on>=0){const[mx,my]=OBM[OBP.on],px=mx,py=my+OBPL,C2=obC(),act=OBP.on===C2.links&&C2.links<5;g.save();g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(16,22,40,.85)';
    if(act){const k=OBP.t<.6?0:Math.min(1,OBP.pr);g.strokeStyle='rgba(16,22,40,.6)';g.lineWidth=5;g.beginPath();g.arc(px,py-OBH-34,11,0,7);g.stroke();g.strokeStyle='#bff0ff';g.lineWidth=3;g.beginPath();g.arc(px,py-OBH-34,11,-1.57,-1.57+6.283*k);g.stroke();
      g.lineWidth=3;g.strokeStyle='rgba(16,22,40,.85)';g.strokeText('⟳ กำลังหมุนกระจก',px,py+34);g.fillStyle='#d8f4ff';g.fillText('⟳ กำลังหมุนกระจก',px,py+34)}
    else{const lb=C2.links>OBP.on||C2.links>=5?'✓ บานนี้ส่งแสงต่อแล้ว':'ยังไม่มีแสงมาถึงบานนี้';g.strokeText(lb,px,py+34);g.fillStyle='#e8eef8';g.fillText(lb,px,py+34)}g.restore()}}
/* กลางคืน: ลำแสงเรืองทับม่านกลางคืน (วาดหลังชั้นมืด) */
function obNight(){if(curMap!==36||isDg())return;let dk=0;try{dk=dnState().dk||0}catch(e){}if(dk<.05)return;const k=Math.min(1,dk/.42),C=obC(),T=performance.now()/1000;g.save();if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);g.globalCompositeOperation='lighter';g.lineCap='round';
  C.segs.forEach(([x1,y1,x2,y2,kk])=>{const end=kk!=='x';for(const[w,al,col]of[[16,.08,'120,190,255'],[5,.32,'190,235,255'],[1.6,.55,'255,255,255']]){if(end)g.strokeStyle='rgba('+col+','+(al*k)+')';else{const q=g.createLinearGradient(x1,y1-OBH,x2,y2-OBH);q.addColorStop(0,'rgba('+col+','+(al*k)+')');q.addColorStop(1,'rgba('+col+',0)');g.strokeStyle=q}g.lineWidth=w;g.beginPath();g.moveTo(x1,y1-OBH);g.lineTo(x2,y2-OBH);g.stroke()}});
  C.lit.forEach(i=>{const[mx,my]=OBM[i];glowAt(mx,my-OBH,24,'190,235,255',.35*k)});glowAt(OBS.x,OBS.y-OBH,22,'200,240,255',.4*k);if(C.links>=5)glowAt(OBL.x,OBL.y-80,60,'200,240,255',(.3+.08*Math.sin(T*3))*k);g.globalCompositeOperation='source-over';g.globalAlpha=.75*k;try{obEcho(T)}catch(e){}g.globalAlpha=1;g.restore()}
function obEcho(T){let a=0;if(p6Past('p7or'))a=.55;else if(p6From('p7or'))a=.9;else if(p6Past('p7mr'))a=.25;if(!a||!palVis(OBL.x,OBL.y-130,130))return;a*=.78+.22*Math.sin(T*13)*Math.sin(T*7.3);const x=OBL.x,y=OBL.y-104+Math.sin(T*1.2)*3;
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-26,80,'150,200,255',.3*a);g.restore();
  g.save();g.translate(x,y);g.scale(1.3,1.3);g.globalCompositeOperation='source-over';const body=(f,s)=>{g.beginPath();g.moveTo(-11,-52);g.lineTo(11,-52);g.lineTo(24,30);g.quadraticCurveTo(0,36,-24,30);g.closePath();if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=1.3;g.stroke()}};
  body('rgba(60,120,215,'+(.42*a)+')','rgba(225,242,255,'+(.85*a)+')');
  g.fillStyle='rgba(120,175,240,'+(.38*a)+')';g.beginPath();g.moveTo(-12,-50);g.lineTo(-30,26);g.lineTo(-22,30);g.lineTo(-6,-40);g.closePath();g.fill();g.beginPath();g.moveTo(12,-50);g.lineTo(30,26);g.lineTo(22,30);g.lineTo(6,-40);g.closePath();g.fill();
  g.fillStyle='rgba(150,200,250,'+(.55*a)+')';g.beginPath();g.arc(0,-62,8.5,0,7);g.fill();g.strokeStyle='rgba(225,242,255,'+(.85*a)+')';g.lineWidth=1.2;g.stroke();
  g.fillStyle='rgba(225,240,255,'+(.6*a)+')';g.beginPath();g.moveTo(-6,-58);g.quadraticCurveTo(0,-38,6,-58);g.closePath();g.fill();
  g.fillStyle='rgba(255,226,140,'+(.9*a)+')';g.beginPath();g.moveTo(-9,-67);g.lineTo(-7,-78);g.lineTo(-3,-71);g.lineTo(0,-81);g.lineTo(3,-71);g.lineTo(7,-78);g.lineTo(9,-67);g.closePath();g.fill();
  g.strokeStyle='rgba(200,170,90,'+(.85*a)+')';g.lineWidth=3.4;g.lineCap='round';g.beginPath();g.moveTo(10,-30);g.lineTo(34,-62);g.stroke();g.strokeStyle='rgba(150,200,250,'+(.7*a)+')';g.lineWidth=3;g.beginPath();g.moveTo(-10,-32);g.lineTo(-20,-12);g.stroke();
  g.fillStyle='rgba(20,40,90,'+(.18*a)+')';for(let k=-86;k<36;k+=4)g.fillRect(-30,k,60,1.2);
  g.globalCompositeOperation='lighter';g.fillStyle='rgba(200,230,255,'+(.12*a)+')';for(let k=-84;k<36;k+=4)g.fillRect(-30,k+2,60,1);g.restore()}
/* ---------- ภาพมอนยอดเขา ---------- */
function drawMonOB(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){const glow=(x,y,rr,c,a)=>{if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.restore()};
  if(t===0){/* จิ้งจอกหิมะดาว (ขนเงินอมฟ้า ปลายหางเป็นดาว) */glow(0,-r*.4,r*1.1,'150,210,255',.05);const tw=sw*r*.14;
    Pg([-r*.55,-r*.42+bob,-r*1.05,-r*.95+bob+tw,-r*1.5,-r*.78+bob+tw,-r*1.32,-r*.36+bob+tw*.5,-r*.62,-r*.18+bob],F('#7a8eae'),1);
    Pg([-r*1.05,-r*.95+bob+tw,-r*1.5,-r*.78+bob+tw,-r*1.3,-r*.6+bob+tw,-r*1.12,-r*.78+bob+tw],F('#eef6ff'),0);
    if(!W){g.fillStyle='#ffffff';PST(g,-r*1.42,-r*.8+bob+tw,r*.14,r*.055,4,T*2);g.fill()}glow(-r*1.42,-r*.8+bob+tw,r*.32,'170,230,255',.6);
    Ln([-r*.38,-r*.14,-r*.44,r*.78-la],F('#4e5f7e'),r*.16);Ln([-r*.14,-r*.14,-r*.16,r*.8-ra],F('#62749a'),r*.16);Ln([r*.24,-r*.14,r*.28,r*.8-la],F('#4e5f7e'),r*.16);Ln([r*.46,-r*.14,r*.52,r*.78-ra],F('#62749a'),r*.16);
    E(0,-r*.38+bob,r*.7,r*.32,F('#7e92b2'),1);E(r*.05,-r*.5+bob,r*.5,r*.14,F('#64789a'),0);E(-r*.06,-r*.27+bob,r*.5,r*.14,F('#dbe4ef'),0);
    if(!W){g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=1.6;for(let i=0;i<3;i++){g.beginPath();g.moveTo(-r*.32+i*r*.22,-r*.64+bob);g.lineTo(-r*.24+i*r*.22,-r*.52+bob);g.stroke()}}
    E(r*.7,-r*.6+bob,r*.3,r*.24,F('#8296b6'),1);Pg([r*.88,-r*.66+bob,r*1.2,-r*.56+bob,r*.9,-r*.46+bob],F('#e6eef7'),1);E(r*1.18,-r*.56+bob,r*.055,r*.045,F('#1a2234'),0);
    Pg([r*.56,-r*.76+bob,r*.6,-r*1.08+bob,r*.74,-r*.8+bob],F('#5e7294'),1);Pg([r*.76,-r*.8+bob,r*.86,-r*1.1+bob,r*.92,-r*.78+bob],F('#5e7294'),1);
    if(!W){g.fillStyle='#f0d0dc';g.beginPath();g.moveTo(r*.6,-r*.8+bob);g.lineTo(r*.62,-r*1.0+bob);g.lineTo(r*.7,-r*.82+bob);g.fill();g.fillStyle='rgba(30,44,70,.55)';g.beginPath();g.ellipse(r*.82,-r*.64+bob,r*.1,r*.06,-.2,0,7);g.fill()}
    glow(r*.82,-r*.64+bob,r*.2,'120,220,255',.5);eye(r*.83,-r*.64+bob,r*.06,r*.045,'#8af0ff');return true}
  if(t===1){/* นกฮูกดาวน้ำแข็ง */const hv=Math.sin(T*3)*r*.12,fl=Math.sin(T*11);glow(0,-r*.6+hv,r*1.2,'170,215,255',.06);
    for(const s of[-1,1]){g.save();g.translate(s*r*.32,-r*.62+hv);g.rotate(s*(.35+fl*.45));g.fillStyle=W?'#fff':'#71839f';g.beginPath();g.moveTo(0,-r*.1);g.quadraticCurveTo(s*r*.66,-r*.44,s*r*1.05,-r*.05);g.lineTo(s*r*.88,r*.07);g.lineTo(s*r*.68,r*.02);g.lineTo(s*r*.52,r*.13);g.lineTo(s*r*.32,r*.08);g.quadraticCurveTo(s*r*.1,r*.12,0,r*.1);g.closePath();g.fill();
      if(!W){g.strokeStyle='#2a3448';g.lineWidth=1.2;g.stroke();g.strokeStyle='rgba(220,232,248,.7)';g.lineWidth=1;for(let k=1;k<4;k++){g.beginPath();g.moveTo(s*r*.12*k,0);g.lineTo(s*r*(.22+.24*k),r*.06);g.stroke()}}g.restore()}
    E(0,-r*.55+hv,r*.42,r*.5,F('#8597b2'),1);E(0,-r*.44+hv,r*.27,r*.33,F('#d4dde9'),0);
    if(!W){g.strokeStyle='#4e5e7a';g.lineWidth=1.3;for(let k=0;k<3;k++)for(let j=-1;j<=1;j++){const cx=j*r*.12,cy=-r*.56+k*r*.12+hv;g.beginPath();g.moveTo(cx-r*.04,cy);g.lineTo(cx,cy+r*.04);g.lineTo(cx+r*.04,cy);g.stroke()}}
    E(0,-r*.84+hv,r*.36,r*.27,F('#c6d1df'),1);
    Pg([-r*.26,-r*1.0+hv,-r*.36,-r*1.26+hv,-r*.12,-r*1.04+hv],F('#5e7090'),1);Pg([r*.26,-r*1.0+hv,r*.36,-r*1.26+hv,r*.12,-r*1.04+hv],F('#5e7090'),1);
    E(-r*.14,-r*.86+hv,r*.13,r*.13,F('#ffc84a'),1);E(r*.14,-r*.86+hv,r*.13,r*.13,F('#ffc84a'),1);eye(-r*.14,-r*.86+hv,r*.055,r*.075,'#141420');eye(r*.14,-r*.86+hv,r*.055,r*.075,'#141420');
    Pg([-r*.05,-r*.78+hv,0,-r*.66+hv,r*.05,-r*.78+hv],F('#c89a3a'),0);
    if(!W)for(const s of[-1,1]){g.fillStyle='#bfe8ff';g.beginPath();g.moveTo(s*r*.2,-r*1.08+hv);g.lineTo(s*r*.24,-r*1.22+hv);g.lineTo(s*r*.28,-r*1.08+hv);g.fill()}
    Ln([-r*.1,-r*.08+hv,-r*.12,r*.04+hv],F('#5a4a2a'),r*.06);Ln([r*.1,-r*.08+hv,r*.12,r*.04+hv],F('#5a4a2a'),r*.06);
    if(!W)for(let i=0;i<3;i++){const q=(T*1.4+i/3)%1;g.fillStyle='rgba(200,235,255,'+(.8*(1-q))+')';g.fillRect(-r*.3+Math.sin(i*2.1)*r*.4,r*.1+q*r*.7,2.4,2.4)}return true}
  /* อัศวินกระจก */glow(0,-r*.75,r*1.5,'170,215,255',.05);
  Ln([-r*.28,r*.02,-r*.34,r*.85-la],F('#55617a'),r*.26);Ln([r*.28,r*.02,r*.34,r*.85-ra],F('#55617a'),r*.26);
  E(-r*.34,r*.84-la,r*.16,r*.07,F('#3a4458'),0);E(r*.34,r*.84-ra,r*.16,r*.07,F('#3a4458'),0);
  Pg([-r*.6,-r*1.12+bob,r*.6,-r*1.12+bob,r*.48,-r*.05,-r*.48,-r*.05],F('#6a7890'),1);
  if(!W){const pn=[[-r*.5,-r*1.06,-r*.06,-r*1.06,-r*.08,-r*.6,-r*.44,-r*.6],[r*.06,-r*1.06,r*.5,-r*1.06,r*.44,-r*.6,r*.08,-r*.6],[-r*.42,-r*.54,-r*.06,-r*.54,-r*.08,-r*.12,-r*.38,-r*.12],[r*.06,-r*.54,r*.42,-r*.54,r*.38,-r*.12,r*.08,-r*.12]];
    pn.forEach((p,i)=>{const yb=i<2?bob:bob*.5,q=g.createLinearGradient(p[0],p[1]+yb,p[4],p[5]+yb);q.addColorStop(0,'#e4f0ff');q.addColorStop(.5,'#7a92b6');q.addColorStop(1,'#c4d6ec');g.fillStyle=q;g.beginPath();g.moveTo(p[0],p[1]+yb);g.lineTo(p[2],p[3]+yb);g.lineTo(p[4],p[5]+yb);g.lineTo(p[6],p[7]+yb);g.closePath();g.fill();g.strokeStyle='#2a3448';g.lineWidth=1;g.stroke();
      const s=(T*.5+i*.27)%1,lx=p[0]+(p[2]-p[0])*s;g.strokeStyle='rgba(255,255,255,'+(.8*Math.sin(s*3.14))+')';g.lineWidth=2;g.beginPath();g.moveTo(lx,p[1]+yb);g.lineTo(lx-r*.1,p[5]+yb);g.stroke()})}
  {const cg=.6+.4*Math.sin(T*3);glow(0,-r*.62+bob,r*.42,'150,220,255',.5*cg);E(0,-r*.62+bob,r*.12,r*.12,F('#dff6ff'),1)}
  for(const s of[-1,1])E(s*r*.62,-r*1.06+bob,r*.2,r*.14,F('#5e6a82'),1);
  Pg([-r*.26,-r*1.12+bob,-r*.3,-r*1.5+bob,0,-r*1.68+bob,r*.3,-r*1.5+bob,r*.26,-r*1.12+bob],F('#8492aa'),1);
  if(!W){g.fillStyle='#0a1020';g.fillRect(-r*.2,-r*1.42+bob,r*.4,r*.07)}glow(0,-r*1.39+bob,r*.24,'140,230,255',.6);if(!W){g.fillStyle='#bff4ff';g.fillRect(-r*.16,-r*1.41+bob,r*.32,r*.04)}
  Pg([-r*.04,-r*1.66+bob,0,-r*1.86+bob,r*.04,-r*1.66+bob],F('#c8d6e8'),1);
  {const sx=-r*.88,sy=-r*.6+bob+la*.3;E(sx,sy,r*.3,r*.46,F('#b8903e'),1);E(sx,sy,r*.25,r*.4,F('#cfdff2'),0);if(!W){const s=(T*.6)%1;g.strokeStyle='rgba(255,255,255,'+(.85*Math.sin(s*3.14))+')';g.lineWidth=2.4;g.beginPath();g.moveTo(sx-r*.18+s*r*.3,sy-r*.3);g.lineTo(sx-r*.26+s*r*.3,sy+r*.2);g.stroke()}}
  {const ax=r*.82,ay=-r*.8+bob+ra*.4;Ln([r*.6,-r*1.0+bob,ax,ay+r*.2],F('#5e6a82'),r*.2);Ln([ax,ay+r*.6,ax+r*.1,ay-r*1.0],F('#c8d4e4'),r*.07);Pg([ax+r*.04,ay-r*1.0,ax+r*.12,ay-r*1.3,ax+r*.18,ay-r*.98],F('#eef6ff'),1);glow(ax+r*.12,ay-r*1.15,r*.18,'200,240,255',.5)}
  return true}
/* ---------- NPC หุ่นทองเหลือง ---------- */
function orrD(x,y,f,t){const b=Math.sin(t*2)*1.2,O='#3a2410',sw=Math.sin(t*3)*.25;g.save();g.translate(x,y);g.scale(f,1);PALSH(0,2,15,4,.35);
  g.save();g.translate(12,-14+b);g.rotate(.35+sw);g.strokeStyle='#6a4a2a';g.lineWidth=2.2;g.beginPath();g.moveTo(0,-14);g.lineTo(0,16);g.stroke();g.fillStyle='#b89858';g.beginPath();g.moveTo(-5,14);g.lineTo(5,14);g.lineTo(7,22);g.lineTo(-7,22);g.closePath();g.fill();g.restore();
  g.fillStyle='#7a5a28';g.fillRect(-7,-10,4,10);g.fillRect(3,-10,4,10);g.fillStyle='#4a3418';g.fillRect(-9,-2,7,3);g.fillRect(2,-2,7,3);
  const tg=g.createLinearGradient(-12,0,12,0);tg.addColorStop(0,'#8a5a20');tg.addColorStop(.45,'#ecc878');tg.addColorStop(1,'#7a4a18');g.fillStyle=tg;g.beginPath();g.roundRect(-11,-31+b,22,22,6);g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
  g.fillStyle='#f2e6c0';g.beginPath();g.arc(0,-20+b,4.6,0,7);g.fill();g.strokeStyle='#6a4a20';g.stroke();g.strokeStyle='#c03a2a';g.lineWidth=1.2;const na=t*1.7;g.beginPath();g.moveTo(0,-20+b);g.lineTo(Math.cos(na)*3.6,-20+b+Math.sin(na)*3.6);g.stroke();
  g.fillStyle='#5a3a14';for(const[rx,ry]of[[-8,-28],[8,-28],[-8,-12],[8,-12]]){g.beginPath();g.arc(rx,ry+b,1,0,7);g.fill()}
  g.strokeStyle='#a87a3a';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(-10,-26+b);g.lineTo(-14,-14+b);g.moveTo(10,-26+b);g.lineTo(12,-16+b);g.stroke();
  g.fillStyle=tg;g.beginPath();g.arc(0,-38+b,9,Math.PI,0);g.lineTo(9,-32+b);g.lineTo(-9,-32+b);g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
  g.fillStyle='#1e2a44';g.beginPath();g.arc(2.5,-37+b,4.4,0,7);g.fill();g.strokeStyle='#d8b060';g.lineWidth=1.4;g.stroke();
  g.strokeStyle='#6a4a20';g.lineWidth=1.2;g.beginPath();g.moveTo(-3,-46+b);g.lineTo(-5,-53+b);g.stroke();
  g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(-1,-46+b,7,2.6,0,0,7);g.fill();g.restore();
  g.save();g.globalCompositeOperation='lighter';glowAt(x+f*2.5,y-37+b,8,'140,220,255',.55+.2*Math.sin(t*4));glowAt(x-f*5,y-53+b,4,'255,200,120',.7);g.restore()}
/* ---------- ของประกอบฉาก ---------- */
Object.assign(PALK,{
 obdome(t,T){const x=t.x,y=t.y;PALSH(x+12,y+14,240,62,.45);
  const dg=g.createLinearGradient(x-190,0,x+190,0);dg.addColorStop(0,'#646e84');dg.addColorStop(.42,'#b2bac9');dg.addColorStop(1,'#56607a');g.fillStyle=dg;g.beginPath();g.moveTo(x-185,y-180);g.lineTo(x-185,y);g.ellipse(x,y,185,52,0,Math.PI,0,true);g.lineTo(x+185,y-180);g.closePath();g.fill();
  g.strokeStyle='rgba(40,48,66,.35)';g.lineWidth=1.2;for(let k=1;k<6;k++){g.beginPath();g.ellipse(x,y-180+k*30,185,52,0,Math.PI*.02,Math.PI*.98);g.stroke()}
  for(let k=0;k<6;k++)for(let j=0;j<7;j++){const th=(j+(k%2)*.5+.25)/7.5*Math.PI,px=x+185*Math.cos(th),py=y-180+k*30+52*Math.sin(th);g.beginPath();g.moveTo(px,py);g.lineTo(px,py+30);g.stroke()}
  g.fillStyle='#262c3e';g.beginPath();g.moveTo(x-30,y+52);g.lineTo(x-30,y-20);g.quadraticCurveTo(x,y-62,x+30,y-20);g.lineTo(x+30,y+52);g.closePath();g.fill();g.strokeStyle='#c8a050';g.lineWidth=3;g.stroke();
  g.fillStyle='#ffd890';g.globalAlpha=.55;g.fillRect(x-22,y+10,44,40);g.globalAlpha=1;
  for(const s of[-1,1]){const wx=x+s*110,wy=y-40;g.fillStyle='#202638';g.beginPath();g.moveTo(wx-10,wy+46);g.lineTo(wx-10,wy);g.quadraticCurveTo(wx,wy-16,wx+10,wy);g.lineTo(wx+10,wy+46);g.closePath();g.fill();g.fillStyle='rgba(150,210,255,.55)';g.fillRect(wx-6,wy+4,12,36)}
  g.fillStyle='#f2f6fb';g.beginPath();g.ellipse(x,y-180,190,54,0,Math.PI*.05,Math.PI*.95);g.lineTo(x-180,y-168);g.ellipse(x,y-168,180,50,0,Math.PI*.95,Math.PI*.05,true);g.closePath();g.fill();
  const cg=g.createLinearGradient(x-200,0,x+200,0);cg.addColorStop(0,'#3a6a62');cg.addColorStop(.42,'#7cb6a8');cg.addColorStop(1,'#2c5650');g.fillStyle=cg;g.beginPath();g.ellipse(x,y-180,195,175,0,Math.PI,0);g.ellipse(x,y-180,195,54,0,0,Math.PI);g.closePath();g.fill();
  g.strokeStyle='rgba(216,168,80,.75)';g.lineWidth=2;for(const th of[-1.2,-.8,-.4,0,.4,.8,1.2]){const bx=x+195*Math.sin(th),by=y-180+54*Math.cos(th);g.beginPath();g.moveTo(bx,by);g.quadraticCurveTo(x+195*Math.sin(th)*.92,y-330,x,y-355);g.stroke()}
  g.fillStyle='#141a2c';g.beginPath();g.moveTo(x+40,y-140);g.quadraticCurveTo(x+52,y-260,x+18,y-352);g.lineTo(x-14,y-350);g.quadraticCurveTo(x+14,y-260,x+6,y-138);g.closePath();g.fill();
  {const tx0=x+30,ty0=y-262,tx1=x+180,ty1=y-430;g.save();g.lineCap='butt';g.strokeStyle='#4a3010';g.lineWidth=44;g.beginPath();g.moveTo(tx0,ty0);g.lineTo(tx1,ty1);g.stroke();const tg=g.createLinearGradient(tx0-20,ty0,tx0+20,ty0);tg.addColorStop(0,'#8a6024');tg.addColorStop(.5,'#f0c870');tg.addColorStop(1,'#7a5018');g.strokeStyle=tg;g.lineWidth=38;g.stroke();
    g.strokeStyle='#5a3a10';g.lineWidth=46;for(const u of[.15,.45,.75]){const px=tx0+(tx1-tx0)*u,py=ty0+(ty1-ty0)*u;g.beginPath();g.moveTo(px,py);g.lineTo(px+(tx1-tx0)*.025,py+(ty1-ty0)*.025);g.stroke()}g.restore();
    g.fillStyle='#d8eeff';g.beginPath();g.ellipse(tx1+4,ty1-4,22,12,-.85,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(tx1+4,ty1-4,40,'170,220,255',.4+.12*Math.sin(T*2));g.restore()}
  g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x-30,y-338,80,20,-.15,0,7);g.fill();g.beginPath();g.ellipse(x-120,y-260,40,10,-.6,0,7);g.fill();g.beginPath();g.ellipse(x+120,y-262,36,9,.6,0,7);g.fill();
  g.fillStyle='rgba(220,240,255,.9)';for(let i=0;i<14;i++){const px=x-170+i*26,py=y-170+Math.sin(i)*3;g.beginPath();g.moveTo(px,py);g.lineTo(px+3,py+10+(i%3)*5);g.lineTo(px+6,py);g.fill()}},
 obprism(t,T){const x=t.x,y=t.y;PALSH(x+3,y+4,22,7,.4);g.fillStyle='#7a8698';g.fillRect(x-12,y-44,24,44);g.fillStyle='#a4b0c2';g.beginPath();g.ellipse(x,y-44,14,5,0,0,7);g.fill();g.fillStyle='#f2f6fb';g.beginPath();g.ellipse(x,y-46,12,3.4,0,0,7);g.fill();
  g.fillStyle='#d8f2ff';g.beginPath();g.moveTo(x,y-80);g.lineTo(x+11,y-56);g.lineTo(x,y-46);g.lineTo(x-11,y-56);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.8)';g.beginPath();g.moveTo(x,y-80);g.lineTo(x+4,y-56);g.lineTo(x,y-48);g.closePath();g.fill();g.strokeStyle='#c8a050';g.lineWidth=1.6;g.beginPath();g.moveTo(x-11,y-56);g.lineTo(x+11,y-56);g.stroke()},
 obloom(t,T){const x=t.x,y=t.y,C=obC(),sol=C.links>=5,sp=sol?1.3:.12;PALSH(x+4,y+6,64,16,.45);
  g.fillStyle='#6a768e';g.beginPath();g.ellipse(x,y,62,22,0,0,7);g.fill();g.fillStyle='#8a96ac';g.beginPath();g.ellipse(x,y-8,54,18,0,0,7);g.fill();g.strokeStyle='#c8a050';g.lineWidth=2;g.beginPath();g.ellipse(x,y-8,46,15,0,0,7);g.stroke();
  g.strokeStyle='#8a6024';g.lineWidth=5;g.beginPath();g.moveTo(x,y-10);g.lineTo(x,y-56);g.stroke();
  const cy=y-80;for(let k=0;k<3;k++){const ph=T*sp*(k+1)*(k%2?-1:1)+k*1.3,R=44-k*9;g.strokeStyle=k===1?'#e8c070':'#c89a48';g.lineWidth=3-k*.5;g.beginPath();g.ellipse(x,cy,Math.max(2,R*Math.abs(Math.cos(ph))),R,k*.55,0,7);g.stroke()}
  g.strokeStyle='#d8a850';g.lineWidth=2;g.beginPath();g.ellipse(x,cy,46,14,0,0,7);g.stroke();
  g.fillStyle=sol?'#ffffff':'#cfeaff';g.beginPath();g.moveTo(x,cy-20);g.lineTo(x+6,cy);g.lineTo(x,cy+16);g.lineTo(x-6,cy);g.closePath();g.fill();
  if(sol){g.save();g.globalCompositeOperation='lighter';glowAt(x,cy,40,'200,240,255',.45+.1*Math.sin(T*3));g.strokeStyle='rgba(230,248,255,.6)';g.lineWidth=1.2;g.beginPath();g.moveTo(x,cy-20);g.lineTo(x+Math.sin(T*2)*4,cy-150);g.stroke();g.restore()}},
 obmir(t,T){const x=t.x,y=t.y,i=t.v,C=obC(),lit=C.lit.includes(i),d=C.R[i],a=d*Math.PI/4,dx=Math.cos(a),dy=Math.sin(a),done=C.links>i;PALSH(x+3,y+5,26,8,.4);
  g.fillStyle='#6e7a8e';g.beginPath();g.moveTo(x-16,y-26);g.lineTo(x-16,y);g.ellipse(x,y,16,6,0,Math.PI,0,true);g.lineTo(x+16,y-26);g.closePath();g.fill();g.fillStyle='#a4b0c2';g.beginPath();g.ellipse(x,y-26,16,6,0,0,7);g.fill();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x-2,y-27,12,3.6,0,0,7);g.fill();
  g.strokeStyle='#c8a050';g.lineWidth=2.4;g.beginPath();g.moveTo(x,y-28);g.lineTo(x+dx*20,y-28+dy*8);g.stroke();g.fillStyle='#e8c070';g.beginPath();g.moveTo(x+dx*24,y-28+dy*9.6);g.lineTo(x+dx*16-dy*5,y-28+dy*6.4+dx*2);g.lineTo(x+dx*16+dy*5,y-28+dy*6.4-dx*2);g.closePath();g.fill();
  const w=4+13*Math.abs(dy),back=dy<-.3;g.strokeStyle='#8a6024';g.lineWidth=2.6;g.beginPath();g.moveTo(x-w-2,y-OBH);g.lineTo(x-w-2,y-30);g.moveTo(x+w+2,y-OBH);g.lineTo(x+w+2,y-30);g.stroke();
  g.fillStyle='#c8a050';g.beginPath();g.ellipse(x,y-OBH,w+3,20,0,0,7);g.fill();
  if(back){g.fillStyle='#8a6a34';g.beginPath();g.ellipse(x,y-OBH,w,17,0,0,7);g.fill();g.strokeStyle='#5a4018';g.lineWidth=1;g.beginPath();g.moveTo(x-w*.6,y-OBH);g.lineTo(x+w*.6,y-OBH);g.moveTo(x,y-OBH-12);g.lineTo(x,y-OBH+12);g.stroke()}
  else{const mg=g.createLinearGradient(x-w,y-OBH-17,x+w,y-OBH+17);mg.addColorStop(0,lit?'#ffffff':'#e8f2ff');mg.addColorStop(.5,lit?'#bfeaff':'#8ea6c4');mg.addColorStop(1,lit?'#f4fbff':'#cfdcec');g.fillStyle=mg;g.beginPath();g.ellipse(x,y-OBH,w,17,0,0,7);g.fill();
    g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=1.4;const s=(T*.4+i*.3)%1;g.beginPath();g.moveTo(x-w*.6+s*w*.8,y-OBH-12);g.lineTo(x-w*.9+s*w*.8,y-OBH+10);g.stroke()}
  g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x,y-OBH-19,w+2,3,0,Math.PI,0);g.fill();
  if(done){g.fillStyle='#ffe8a0';PST(g,x,y-OBH-30+Math.sin(T*2+i)*2,5,2,4,T);g.fill()}},
 obstat(t,T){const x=t.x,y=t.y;PALSH(x+5,y+6,36,11,.4);g.fillStyle='#6e7a8e';g.fillRect(x-26,y-30,52,30);g.fillStyle='#8e9ab0';g.fillRect(x-30,y-36,60,8);g.fillStyle='#f4f8fc';g.fillRect(x-30,y-38,60,4);
  g.fillStyle='#a8b2c2';g.beginPath();g.moveTo(x-16,y-36);g.lineTo(x-12,y-96);g.lineTo(x+4,y-104);g.lineTo(x+10,y-92);g.lineTo(x+16,y-36);g.closePath();g.fill();g.strokeStyle='rgba(60,70,92,.45)';g.lineWidth=1.2;g.beginPath();g.moveTo(x-6,y-90);g.lineTo(x-4,y-40);g.moveTo(x+6,y-88);g.lineTo(x+8,y-40);g.stroke();
  g.strokeStyle='#5a6478';g.lineWidth=1.6;g.beginPath();g.moveTo(x-12,y-96);g.lineTo(x-6,y-90);g.lineTo(x+2,y-100);g.lineTo(x+10,y-92);g.stroke();g.fillStyle='#f4f8fc';g.beginPath();g.moveTo(x-13,y-97);g.lineTo(x+4,y-105);g.lineTo(x+11,y-93);g.lineTo(x+2,y-99);g.closePath();g.fill();
  g.fillStyle='#a8b2c2';g.beginPath();g.ellipse(x+46,y+2,13,12,.4,0,7);g.fill();g.fillStyle='#8e9ab0';g.beginPath();g.moveTo(x+38,y-8);g.lineTo(x+40,y-18);g.lineTo(x+44,y-11);g.lineTo(x+47,y-20);g.lineTo(x+50,y-11);g.lineTo(x+54,y-17);g.lineTo(x+55,y-6);g.closePath();g.fill();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x+44,y-8,10,3,.3,0,7);g.fill();
  g.strokeStyle='#8a6024';g.lineWidth=4;g.beginPath();g.moveTo(x-48,y+4);g.lineTo(x-20,y-6);g.stroke();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x-36,y-2,10,3,-.3,0,7);g.fill()},
 obpine(t,T){const x=t.x,y=t.y,s=t.sc||1,c=['#2a4a52','#22404c','#30525a'][t.v];PALSH(x+6,y+4,26*s,8*s,.4);g.fillStyle='#4a3424';g.fillRect(x-3*s,y-14*s,6*s,14*s);
  for(let k=0;k<4;k++){const w=(30-k*6)*s,yb=y-12*s-k*20*s,h=30*s;g.fillStyle=c;g.beginPath();g.moveTo(x-w,yb);g.lineTo(x,yb-h);g.lineTo(x+w,yb);g.closePath();g.fill();g.fillStyle='rgba(10,24,40,.25)';g.beginPath();g.moveTo(x+w*.15,yb-h*.6);g.lineTo(x,yb-h);g.lineTo(x+w,yb);g.lineTo(x+w*.3,yb);g.closePath();g.fill();
    g.fillStyle='#f2f6fb';g.beginPath();g.moveTo(x-w*.85,yb-2*s);g.quadraticCurveTo(x-w*.4,yb-h*.35,x,yb-h);g.quadraticCurveTo(x+w*.2,yb-h*.5,x+w*.55,yb-5*s);g.quadraticCurveTo(x,yb-h*.25,x-w*.85,yb-2*s);g.fill()}},
 obrock(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x+3,y+4,26*s,7*s,.35);g.fillStyle=['#6a768a','#5e6a7e','#747f92'][t.v];g.beginPath();g.moveTo(x-24*s,y);g.lineTo(x-20*s,y-18*s);g.lineTo(x-4*s,y-28*s);g.lineTo(x+16*s,y-22*s);g.lineTo(x+24*s,y-4*s);g.lineTo(x+18*s,y+4*s);g.closePath();g.fill();
  g.fillStyle='rgba(20,30,50,.25)';g.beginPath();g.moveTo(x+4*s,y-26*s);g.lineTo(x+16*s,y-22*s);g.lineTo(x+24*s,y-4*s);g.lineTo(x+18*s,y+4*s);g.lineTo(x+6*s,y);g.closePath();g.fill();
  g.fillStyle='#f4f8fc';g.beginPath();g.moveTo(x-21*s,y-17*s);g.lineTo(x-4*s,y-29*s);g.lineTo(x+16*s,y-23*s);g.quadraticCurveTo(x,y-16*s,x-21*s,y-17*s);g.fill()},
 obcry(t,T){const x=t.x,y=t.y,c=['#bfeaff','#d8e8ff','#aef2ee'][t.v];PALSH(x,y+2,12,3,.3);for(const[dx,h,w]of[[-6,18,4],[2,26,5],[9,14,3]]){g.fillStyle=c;g.beginPath();g.moveTo(x+dx-w,y);g.lineTo(x+dx,y-h);g.lineTo(x+dx+w,y);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.moveTo(x+dx,y-h);g.lineTo(x+dx+w*.4,y-2);g.lineTo(x+dx,y);g.closePath();g.fill()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x+2,y-14,16,'170,230,255',.18+.08*Math.sin(T*2+x));g.restore()},
 oblamp(t,T){const x=t.x,y=t.y;PALSH(x+2,y+2,7,2.4,.3);g.strokeStyle='#2a3040';g.lineWidth=3.4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-80);g.stroke();g.fillStyle='#2a3040';g.fillRect(x-7,y-96,14,4);g.fillStyle='#ffe2a8';g.fillRect(x-5,y-92,10,12);g.strokeStyle='#2a3040';g.lineWidth=1.4;g.strokeRect(x-5,y-92,10,12);
  g.fillStyle='#2a3040';g.beginPath();g.moveTo(x-8,y-96);g.lineTo(x,y-104);g.lineTo(x+8,y-96);g.closePath();g.fill();g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x,y-100,7,2.4,0,0,7);g.fill()},
 obskiff(t,T){const x=t.x,y=t.y,b=Math.sin(T*1.3)*3;g.save();g.translate(0,b);PALSH(x,y+18-b,46,9,.3);
  g.strokeStyle='rgba(90,70,50,.8)';g.lineWidth=1.2;for(const[a,c]of[[-34,-26],[34,26],[-12,-10],[12,10]]){g.beginPath();g.moveTo(x+a,y-12);g.lineTo(x+c,y-104);g.stroke()}
  const bg=g.createLinearGradient(x-60,0,x+60,0);bg.addColorStop(0,'#2a4a8a');bg.addColorStop(.5,'#5a82c8');bg.addColorStop(1,'#243e78');g.fillStyle=bg;g.beginPath();g.ellipse(x,y-140,64,42,0,0,7);g.fill();
  g.strokeStyle='#e0b050';g.lineWidth=3;for(const k of[-30,0,30]){g.beginPath();g.ellipse(x+k*.0,y-140,Math.max(4,64-Math.abs(k)*1.2),42,0,0,7);g.stroke()}g.fillStyle='#f4f8fc';g.beginPath();g.ellipse(x-6,y-176,30,8,-.1,0,7);g.fill();
  g.fillStyle='#6a4a2c';g.beginPath();g.moveTo(x-50,y-14);g.lineTo(x+50,y-14);g.lineTo(x+40,y+8);g.lineTo(x-40,y+8);g.closePath();g.fill();g.strokeStyle='#3a2414';g.lineWidth=1.2;g.stroke();g.fillStyle='#c8a050';g.fillRect(x-50,y-16,100,4);
  g.strokeStyle='#8a6a40';g.lineWidth=2;const pa=T*6;g.beginPath();g.moveTo(x+50,y-4);g.lineTo(x+50+Math.cos(pa)*12,y-4+Math.sin(pa)*4);g.moveTo(x+50,y-4);g.lineTo(x+50-Math.cos(pa)*12,y-4-Math.sin(pa)*4);g.stroke();g.restore()},
 cel6(t,T){const N=MAPS[36].npc2;if(!N||N.x<0)return;celD(N.x,N.y,T,me.x<N.x?-1:1)}});
/* ---------- เนื้อเรื่องภาค 7 บทที่ 3 ---------- */
Object.assign(SPK,{orr:['ออร์รี · หุ่นเฝ้าหอดูดาว','🤖','#e0c080'],orn7:['ภาพสะท้อนของโอเรียน','🪞','#c8e0ff'],cel6:SPK.cel});STNPC.orr=[36,'npc'];STNPC.cel6=[36,'npc2'];
STCH.push('ภาค 7 · บทที่ 3 · กระจกของโอเรียน');
{const C3=STCH.length-1;STY.push(
 {c:C3,g:'talk',k:'cel5',p7o:1,tx:'คุยกับเซเลสต์ที่ริมหลุมดาวคาร์น · ตามหา «ช่างเย็บดาว»',
  pre:[['cel','ข้าอ่านบันทึกของท่านโอเรียนซ้ำทั้งคืน… คำว่า «ช่างเย็บดาว» ปรากฏสิบเจ็ดครั้ง ทุกครั้งมาคู่กับคำว่า «ยอดเขา»'],
   ['cel','มีที่เดียวที่ตรงกับคำบรรยาย หอดูดาวส่วนตัวของท่านโอเรียน บนยอดเขาเหนือทะเลเมฆ ที่ถูกปิดตายตั้งแต่วันที่ท่านสิ้น'],
   ['cel','แม้แต่นักดาราศาสตร์หลวงอย่างข้าก็ไม่เคยได้ขึ้นไป เรือฟ้าที่จะไปถึงต้องใช้ตราดาวของราชินีเท่านั้น'],
   ['brom','แกนดาวเก็บอยู่ในโกดังข้า ปลอดภัยกว่าคลังหลวงเสียอีก ไปเถอะ ข้าลงทุนไปแล้ว อย่าให้ขาดทุนล่ะ',0,0,0,0,1],
   ['brom2','สหกรณ์จะผลัดกันเฝ้าแกนดาวทั้งคืน ไม่ต้องห่วงทางนี้… ไปหาวิธีรักษามันมาให้ได้นะ',0,0,0,0,2],
   ['cel','ไปขอตราจากราชินีเอลิราในนครลอยฟ้าเถอะ ข้าจะรอที่ท่าเรือฟ้า… ข้าออกมาล่าดาวโดยไม่ทูลลา นางคงไม่อยากเห็นหน้าข้าตอนนี้']],rw:{g:60000}},
 {c:C3,g:'talk',k:'qn',p7q:1,tx:'ขอตราดาวหลวงจากราชินีเอลิราในนครลอยฟ้า',
  pre:[['qn','ผู้เชื่อมสองฟ้า… ข้าได้ข่าวเรื่องดาวที่เหมืองคาร์นแล้ว เซเลสต์ส่งนกมาบอก นางไม่กล้ามาเอง'],
   ['qn','หอดูดาวของท่านโอเรียน… ตอนข้ายังเด็ก ข้าเห็นแสงจากยอดเขานั้นทุกคืน แล้ววันหนึ่งมันก็ดับไปพร้อมกับท่าน'],
   ['qn','หัวใจครึ่งดวงของเราหรี่ลงทุกคืน ถ้ามีหนทางใดอยู่บนยอดเขานั้น ข้าก็ไม่มีสิทธิ์ปิดมันไว้อีกแล้ว',0,0,0,1],
   ['qn','เจ้าสาบานจะสร้างหัวใจดวงใหม่ บางทีสิ่งที่ท่านโอเรียนทิ้งไว้บนนั้นอาจเป็นคำตอบ',0,0,0,2],
   ['qn','(ราชินีปลดจี้รูปดาวแปดแฉกจากคอ ส่งให้) ตราดาวหลวง ท่าเรือฟ้าอยู่ข้างหอคอยมุมตะวันตกเฉียงเหนือของนคร… บอกเซเลสต์ด้วยว่าข้าไม่ได้โกรธนาง'],
   ['me','(ตราดาวในมืออุ่นวาบ ราวกับรู้ทาง)']],rw:{g:50000}},
 {c:C3,g:'map',m:36,tx:'ขึ้นยอดหอดูดาวโอเรียน (ท่าเรือฟ้าหลวง มุมตะวันตกเฉียงเหนือของนคร)',
  post:[['nar','เรือฟ้าลำเล็กแล่นทะลุเมฆขึ้นไปจนอากาศเย็นเฉียบ ยอดเขาหิมะโผล่พ้นทะเลเมฆ เหมือนเกาะสีขาวกลางมหาสมุทร'],
   ['nar','บนยอดสุด โดมทองแดงสีเขียวหม่นของหอดูดาวยังตั้งตระหง่าน กล้องดูดาวยักษ์ชี้ขึ้นฟ้าค้างไว้อย่างนั้นมาสามร้อยปี'],
   ['nar','ที่ท่าเรือมีบางอย่างกำลังกวาดหิมะอยู่… หุ่นทองเหลืองตัวเล็ก ๆ กับไม้กวาดที่สึกจนเหลือแต่ด้าม']]},
 {c:C3,g:'talk',k:'orr',p7ob:1,tx:'คุยกับหุ่นทองเหลืองที่ท่าเรือฟ้า',
  pre:[['orr','(หุ่นหันมา เลนส์ตาหมุนปรับโฟกัสดังกริ๊ก) ท่านโอเรียน! ท่านกลับมาแล้ว! ข้ากวาดหิมะไว้รอทุกวัน…'],
   ['orr','…ไม่ใช่ ท่านไม่ใช่ท่านโอเรียน ขออภัย ความจำของข้าเหลือแต่เฟืองที่สึก ข้าชื่อออร์รี หุ่นเฝ้าหอดูดาว'],
   ['me','(ยื่นตราดาวหลวงให้ดู)'],
   ['orr','ตราดาว! ถ้าอย่างนั้นท่านก็มาเพื่อ «เครื่องเย็บดาว» ท่านโอเรียนสั่งไว้ว่าวันหนึ่งจะมีคนถือตรานี้มา'],
   ['orr','เครื่องเย็บดาวต้องการแสงจากกล้องใหญ่ ส่งผ่านกระจกห้าบานรอบยอดเขา แต่สามร้อยฤดูหนาวผลักกระจกเบี้ยวไปหมดแล้ว'],
   ['cel','(เซเลสต์ลงจากเรือฟ้าลำที่สอง หายใจหอบ) …นี่คือหอดูดาวของท่านโอเรียนจริง ๆ ด้วย ข้าจะรอที่ลานกลาง'],
   ['orr','ยืนบนแผ่นศิลาหน้ากระจกนิ่ง ๆ กระจกจะหมุนตาม เริ่มจากบานที่แสงส่องถึงก่อน แล้วหันมันไปหาบานถัดไปนะท่าน']],rw:{g:50000}},
 {c:C3,g:'clue',m:36,n:5,p7mr:1,tx:'หมุนกระจก 5 บานส่งแสงจากกล้องใหญ่ไปถึงเครื่องเย็บดาว (ยืนบนแผ่นศิลาหน้ากระจกที่มีแสง)',
  pre:[['nar','💡 แสงจากกล้องใหญ่ส่องไปที่กระจกบานแรกเสมอ · ยืนบนแผ่นศิลาหน้ากระจกที่มีแสงเพื่อหมุน (ทีละ 45°) · พอลำแสงชี้ถึงกระจกบานถัดไป บานนั้นจะสว่าง · ต่อครบห้าบานแล้วแสงต้องไปจบที่เครื่องเย็บดาวกลางลาน']],
  post:[['nar','ลำแสงสุดท้ายพุ่งเข้ากลางวงแหวนทองเหลือง เครื่องเย็บดาวสั่นสะเทือนแล้วเริ่มหมุน… ครั้งแรกในรอบสามร้อยปี'],
   ['nar','แต่แสงที่สว่างจ้าบนยอดเขาไม่ได้ปลุกแค่เครื่องจักร เงาในกระจกทุกบานกระเพื่อม แล้วบางสิ่งก็ก้าวออกมา']],rw:{g:80000}},
 {c:C3,g:'kill',m:36,n:30,tx:'ปกป้องเครื่องเย็บดาวจากภูตกระจกและสัตว์หิมะที่ตื่นตามแสง',
  post:[['nar','อัศวินกระจกตัวสุดท้ายแตกเป็นเกล็ดเงิน… กลางวงแหวนทองเหลือง ภาพหนึ่งเริ่มก่อตัวขึ้นจากแสง'],
   ['cel','(เสียงเซเลสต์สั่นมาจากลานกลาง) ผู้เชื่อมสองฟ้า! มาดูนี่เร็ว!']],rw:{g:80000}},
 {c:C3,g:'talk',k:'cel6',p7or:1,cine:1,tx:'ดูภาพที่เครื่องเย็บดาวฉายขึ้นกลางลาน',
  pre:[['nar','แสงจากกระจกทั้งห้ามัดรวมเป็นเส้นเดียว บางเหมือนเส้นด้าย ร้อยผ่านวงแหวนทองเหลืองทีละวง… แล้วภาพของชายคนหนึ่งก็ปรากฏ'],
   ['orn7','ถ้ามีใครเห็นภาพนี้ แปลว่ากระจกทั้งห้าได้แสงอีกครั้ง… และข้าคงไม่อยู่แล้ว'],
   ['orn7','ข้าชื่อโอเรียน ก่อนจะเป็นราชา ข้าเป็นนักดาราศาสตร์ และข้าคือคนแรกที่เห็นว่าดาวเหนืออัสตรากำลังดับ'],
   ['orn7','สี่สิบปีที่ข้าเย็บมันอยู่บนยอดเขานี้ คนทั้งเมืองเรียกข้าว่า «ช่างเย็บดาว» แต่แสงอย่างเดียวเย็บหัวใจดาวไม่ได้'],
   ['orn7','หัวใจดาวต้องมีสามสิ่ง แสงดาว… เวลา กลไกที่ช่างแห่งอารัณยาสร้างได้เพียงผู้เดียว… และเสียง เพลงที่ผู้คนร้องด้วยกันในคืนที่หนาวที่สุด'],
   ['orn7','อารัณยาไม่ยอมยกเวลาของมันให้ข้า และข้าไม่มีใครร้องเพลงด้วย ข้าจึงทำสิ่งที่ข้าจะไม่มีวันยกโทษให้ตัวเอง'],
   ['orn7','ข้าเอาหัวใจของอารัณยามาไว้ที่อัสตรา แล้วปล่อยให้เมืองทั้งเมืองร่วงลงใต้เมฆ'],
   ['cel','(เซเลสต์ทรุดลงกับหิมะ) …ไม่จริง ท่านโอเรียนคือคนที่ช่วยอัสตรา ข้าโตมากับเรื่องนั้น ข้าเลือกเป็นนักดาราศาสตร์ก็เพราะเรื่องนั้น'],
   ['orn7','ใครก็ตามที่ได้ยินข้า… ถ้าเจ้ามีครบทั้งสามสิ่ง จงเย็บดาวที่ข้าเย็บไม่สำเร็จ และอย่าให้เมืองไหนต้องร่วงแทนอีก'],
   ['nar','ภาพของโอเรียนสลายไป เหลือแผนผังเส้นแสงลอยอยู่กลางอากาศ เตาหลอมทรงกลมที่มีช่องรับสามช่อง: ดาว · นาฬิกา · บทเพลง'],
   ['cel','ข้ามาล่าดาวเพื่ออัสตราคนเดียว ไม่สนว่าใครต้องเสียอะไร… ข้ากำลังเดินซ้ำรอยท่านทุกก้าว ส่วนเจ้า เจ้าแบ่งแสงคืนให้อารัณยา สิ่งที่ท่านโอเรียนไม่เคยกล้าทำ',0,0,0,1],
   ['cel','ท่านโอเรียนเคยสาบานแบบเดียวกับเจ้า ว่าจะเย็บดาวให้สำเร็จ… แต่ท่านสาบานอยู่คนเดียว ข้าไม่อยากให้เจ้าลงเอยแบบท่าน',0,0,0,2],
   ['cel','ท่านจ่ายราคาของดาวด้วยเมืองทั้งเมือง… ทองของเจ้ายังถูกกว่ามาก แต่ข้าว่าราคาจริงยังมาไม่ถึง',0,0,0,0,1],
   ['cel','เวลาจากอารัณยา เสียงเพลงจากคนทั้งหลาย… เหมือนคืนที่คนงานคาร์นวางพลั่วลงพร้อมกัน บางทีสิ่งที่ท่านโอเรียนขาด ก็คือคนที่ยอมยืนข้างกัน',0,0,0,0,2],
   ['cel','ผู้เชื่อมสองฟ้า… ข้าขอโทษเรื่องที่เหมืองคาร์น ข้าจะช่วยเจ้าสร้างเตาหลอมนี้ ไม่ใช่เพื่ออัสตรา แต่เพื่อไม่ให้ใครต้องเลือกแบบที่ท่านเลือกอีก']],rw:{g:60000,s3:5}},
 {c:C3,g:'talk',k:'orr',p7c3:1,tx:'กลับไปหาออร์รีที่ท่าเรือฟ้า',
  pre:[['orr','ท่านโอเรียนสั่งข้าไว้ข้อเดียว ถ้าวันที่เครื่องเย็บดาวหมุนอีกครั้งมาถึง ให้มอบสิ่งนี้แก่คนที่หมุนมัน'],
   ['me','(ออร์รีเปิดช่องที่อก ยื่นม้วนแผนผังทองเหลืองบาง ๆ ออกมา: แบบเตาหลอมหัวใจ ฉบับที่ท่านโอเรียนวาดไม่จบ)'],
   ['orr','และอีกเรื่อง… ระหว่างที่แสงผ่านกล้องใหญ่ เลนส์ตาข้าเห็นบางอย่างบนฟ้า ดาวที่ร่วงทั่วแผ่นดิน แสงของมันกำลังถูกดึงไปทางเดียวกัน'],
   ['cel','(เซเลสต์ส่องกล้องใหญ่ตาม แล้วหน้าซีด) ทางตะวันออก… เหนือทุ่งรอยแยกนภา ตรงที่ราชินีผู้กลืนดาวเคยทำรัง'],
   ['cel','นางตายไปแล้วไม่ใช่หรือ… แต่เปลือกของนางยังจำได้ว่าเคยกลืนดาวพวกนี้ทุกดวง และตอนนี้มันกำลังเรียกพวกมันกลับ'],
   ['orr','ข้าจะกวาดหิมะรอต่อไป… คราวนี้ข้ารู้แล้วว่าข้ารอใคร']],
  post:[['nar','🔭 — จบภาค 7 บทที่ 3 · กระจกของโอเรียน — บทต่อไป: เปลือกราชินี (เร็ว ๆ นี้)']],rw:{g:150000,s3:10}})}
setTimeout(()=>{try{
    MAPS[9].gates.push({x:1290,y:1080,to:36,req:1,p7o:1,nm:'ท่าเรือฟ้าหลวง',arr:{x:1600,y:2780}});
    const M7=MAPS[27];MAPS[36]=Object.assign({},M7,{fsw:[{x:2350,y:2450,rx:72,ry:44,b:'ice'}],n:'ยอดหอดูดาวโอเรียน',sx:1600,sy:2860,sr:110,seed:361,bg:'#cdd8e6',tile:'#dfe8f2',safe:'#e8eef6',ring:'#9ad8ff',t1:'#5a6a82',t2:'#8a9ab2',d1:'#b8c6d8',d2:'#ffffff',bth:36,
      gates:[{x:1600,y:3010,to:9,req:1,nm:'นครลอยฟ้าอัสตรา',arr:{x:1300,y:1170}}],npc:{x:1730,y:2760,n:'ออร์รี · หุ่นเฝ้าหอดูดาว',L:22},npc2:{x:-9999,y:-9999,n:'เซเลสต์ · นักดาราศาสตร์หลวง'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[700,700],[2650,520],[2250,1150],[1150,1720],[2200,1760],[600,2500],[2750,2450],[1250,2450],[2000,2480],[480,1700],[2900,1900],[1000,560]]});
    FIELDM[36]=1;try{FSB[36]='ice'}catch(e){}BTR[36]='120,200,255';GLOWC[36]='210,240,255';FXST[36]='ice';try{BTC[36]=['#eef6ff','#6a9ad8','#ffffff'];TIER[36]=[19.5,22,2.9];WRG[36]={1:{rg:240,cd:1.9,spd:300,dm:.85,k:'star',c:'210,240,255'},2:{rg:280,cd:3,spd:240,dm:1.7,k:'starb',c:'170,220,255',big:1}}}catch(e){}}catch(e){console.warn('ob map',e)}
  try{NPC3[36]={d:orrD,s:['ข้ากวาดหิมะทุกวัน เผื่อท่านโอเรียนกลับมา','เฟืองข้าเย็นไปหน่อย แต่ยังเดินได้!','กระจกห้าบาน… ท่านโอเรียนขัดมันทุกเช้า','ทะเลเมฆวันนี้สวยนะ ท่านว่าไหม'],hy:44}}catch(e){}
  try{Object.assign(DEPM,{36:'summit'});DEP4.summit={fog:'200,220,245',fa:.12,bd:.14};AMB2.summit=['rgba(220,235,255,.18)','rgba(20,30,60,.42)','210,230,255']}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p7mr)return obAqT(st);return _q(st)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{obDraw()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{obNight()}catch(e){}}}catch(e){}
  try{const _sd=stDone;window.stDone=stDone=function(){const st=stCur();if(st&&st.p7c3)setTimeout(()=>sdGive(10,'ของขวัญจากออร์รี'),400);return _sd()}}catch(e){}},0);
