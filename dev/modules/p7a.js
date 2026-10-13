/* ---------- v356 ภาค 7 บทที่ 1 · เข็มทิศดาว (แมพ 34 · ที่ราบดาวตก) ---------- */
const SFG={x:1500,y:1560,r:320};
const SFCR=[[900,900,230],[2300,820,190],[700,2120,220],[2380,2280,250],[1250,2720,190],[2780,2860,170],[SFG.x,SFG.y,SFG.r]];
const SFMET=[[1060,1190,46],[2130,1030,40],[920,2380,52],[2560,2580,44],[1720,1930,38]];
const SFCAMP={x:2600,y:1450};
const SFSH=[[1010,1050],[2180,700],[560,2290],[2470,2420],[1390,2840]];
const SFPATH=[[[1600,300],[1560,620],[1680,980],[1880,1250],[2250,1390],[2500,1440]],[[1680,980],[1420,1150],[1150,1320],[980,1700],[1100,2150],[1300,2500]],[[1880,1250],[2050,1700],[2250,2000]]];
const SFLORE=['เศษดาวชิ้นแรกยังอุ่น… พอจับไว้ มันฉายภาพค่ายผู้อพยพในคืนแรกของเจ้า — กองไฟเล็ก ๆ ที่ไม่ยอมดับกลางหมอก',
 'ชิ้นที่สองส่งเสียงเป็นทำนอง… เพลงกล่อมเดียวกับที่ยายเอดาร้อง แต่ร้องด้วยเสียงที่ไม่มีใครเคยได้ยิน',
 'ชิ้นที่สามเย็นเฉียบ มันจำความมืดในท้องของราชินีผู้กลืนดาวได้ — และจำแสงที่ผ่าความมืดนั้นออกมา แสงของเจ้าเอง',
 'ชิ้นที่สี่มีอักษรอารัณยาสลักอยู่ในเนื้อแก้ว: «เราไม่ได้ร่วง เราถูกปล่อย»',
 'ชิ้นสุดท้ายเต้นเป็นจังหวะ… จังหวะเดียวกับหัวใจดาวบนอัสตรา ราวกับเรียกหากัน — และมีอีกคนหนึ่งเดินตามจังหวะนี้มาเหมือนกัน'];
const SFZN={edge:['ขอบที่ราบดาวตก','ทุกคืน ดาวตกลงมาที่นี่ไม่เคยขาด'],field:['ทุ่งหญ้าแก้ว','ลมพัดหญ้าแก้วกระทบกันดังเหมือนกระดิ่ง'],great:['หลุมดาวใหญ่','ดาวดวงแรกที่หลุดจากท้องราชินี ตกลงตรงนี้'],camp:['ค่ายธงเงิน','หอดูดาวหลวงแห่งอัสตรามาตั้งค่ายที่นี่']};
let SFN={bl:[],gl:[],fall:[],ft:0},SFS={lp:{x:1600,y:420}};
const sfZone=(x,y)=>y<520?'edge':Math.hypot(x-SFG.x,y-SFG.y)<SFG.r+60?'great':Math.hypot(x-SFCAMP.x,y-SFCAMP.y)<380?'camp':'field';
const sfSegD=(x,y)=>{let d=1e9;for(const L of SFPATH)for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d};
const gP7sc=()=>p6From('p7sc'),gP7cl=()=>p6From('p7cl');
function sfBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=0;const R=gxRng(3434);
  const ok=(x,y,m)=>Math.hypot(x-M.sx,y-M.sy)>M.sr+60+m&&M.gates.every(G=>Math.hypot(x-G.x,y-G.y)>120+m)&&SFCR.every(([cx,cy,r])=>Math.hypot(x-cx,y-cy)>r*.92+m)&&SFMET.every(([mx,my,r])=>Math.hypot(x-mx,y-my)>r+50+m)
    &&Math.hypot(x-SFCAMP.x,y-SFCAMP.y)>330+m&&M.nests.every(([nx,ny])=>Math.hypot(x-nx,y-ny)>130+m)&&SFSH.every(([sx,sy])=>Math.hypot(x-sx,y-sy)>130+m)&&sfSegD(x,y)>70+m;
  SFMET.forEach(([x,y,r],i)=>trees.push({x,y,r:r*.8,k:'sfmet',v:i,ht:130,hw:r+20,fw:r}));
  for(let i=0,n=0;i<400&&n<34;i++){const x=180+R()*2840,y=620+R()*2440;if(!ok(x,y,0))continue;trees.push({x,y,r:16,k:'sfgt',v:(R()*3)|0,sc:.85+R()*.4,ht:150,hw:40});n++}
  SFCR.forEach(([cx,cy,r],ci)=>{for(let k=0;k<5;k++){const a=R()*6.283,x=cx+Math.cos(a)*(r+24),y=cy+Math.sin(a)*(r+24)*.9;if(Math.hypot(x-M.sx,y-M.sy)<M.sr+80||sfSegD(x,y)<50)continue;trees.push({x,y,r:9,k:'sfcry',v:(ci+k)%3,ht:60})}});
  const C=SFCAMP;[[C.x-150,C.y-90,0],[C.x+130,C.y-120,1],[C.x+150,C.y+110,2]].forEach(([x,y,v])=>trees.push({x,y,r:34,k:'sftent',v,ht:110,hw:60,fw:56}));
  trees.push({x:C.x-40,y:C.y-150,r:18,k:'sftel',ht:150,hw:50});trees.push({x:C.x+20,y:C.y+60,r:16,k:'sftab',ht:40});
  for(const[x,y]of[[C.x-260,C.y+40],[C.x+250,C.y-10],[C.x-60,C.y+210]])trees.push({x,y,r:8,k:'sfban',ht:120});
  trees.push({x:C.x+60,y:C.y,r:0,k:'cel',ht:90,ns:1,nc:1});
  SFN.bl=[];for(let i=0;i<70;i++)SFN.bl.push([R()*3200,R()*3200,140+R()*260,R()]);
  SFN.gl=[];for(let i=0;i<260;i++){const x=R()*3200,y=500+R()*2650;if(SFCR.some(([cx,cy,r])=>Math.hypot(x-cx,y-cy)<r*.8))continue;SFN.gl.push([x,y,R()*6,(R()*3)|0])}
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.k==='cel')return;PAL.dec.push({k:'ao',b:[t.x-80,t.y-30,t.x+80,t.y+40],x:t.x,y:t.y,r:t.r,w:t.hw||0})})}
function sfPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S;
  const bg=c.createRadialGradient(SFG.x,SFG.y,200,SFG.x,SFG.y,2600);bg.addColorStop(0,'#2a3c64');bg.addColorStop(.55,'#223254');bg.addColorStop(1,'#18233f');c.fillStyle=bg;c.fillRect(ox,oy,S,S);
  for(const[x,y,r,v]of SFN.bl){if(x+r<ox||x-r>X1||y+r<oy||y-r>Y1)continue;const g2=c.createRadialGradient(x,y,4,x,y,r);g2.addColorStop(0,v<.5?'rgba(60,140,160,.16)':'rgba(110,80,170,.14)');g2.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}
  /* ทางเดินดินประกาย */
  for(const L of SFPATH){for(const[w,col]of[[78,'rgba(10,14,30,.35)'],[62,'#2c3658'],[44,'#384470'],[16,'rgba(150,170,230,.18)']]){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();L.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}}
  /* พื้นดินด่าง ๆ */
  palGrid(ox,oy,X1,Y1,46,38,1,(x,y,i,j)=>{const h=palH(i,j,345);if(h<.6)return;c.fillStyle=h>.85?'rgba(70,90,140,.16)':'rgba(8,12,28,.18)';c.beginPath();c.ellipse(x+palH(j,i,346)*40,y+palH(i,j,347)*30,10+h*16,5+h*7,0,0,7);c.fill()});
  /* กอหญ้าแก้ว: ใบแผ่ออกจากโคนเดียวกัน */
  palGrid(ox,oy,X1,Y1,34,28,1,(x,y,i,j)=>{const h=palH(i,j,341);if(h<.52)return;const px=x+palH(i,j,342)*30,py=y+palH(j,i,343)*24;if(sfSegD(px,py)<36)return;if(SFCR.some(([cx,cy,r])=>Math.hypot(px-cx,py-cy)<r*1.04))return;
    const n=4+((palH(i,j,344)*4)|0),hh=7+palH(i,j,348)*7,big=h>.86;c.fillStyle='rgba(6,10,24,.35)';c.beginPath();c.ellipse(px,py+1,6+n,2.4,0,0,7);c.fill();
    for(let k=0;k<n;k++){const u=n>1?k/(n-1)-.5:0,a=-Math.PI/2+u*1.3+(palH(i+k,j,349)-.5)*.25,l=hh*(1-Math.abs(u)*.45)*(big?1.35:1),ex=px+Math.cos(a)*l,ey=py+Math.sin(a)*l;
      c.strokeStyle=k%2?'rgba(60,120,150,.75)':'rgba(80,150,175,.7)';c.lineWidth=1.6;c.beginPath();c.moveTo(px+u*3,py);c.quadraticCurveTo(px+u*3+Math.cos(a)*l*.5,py+Math.sin(a)*l*.6,ex,ey);c.stroke()}
    c.fillStyle='rgba(200,245,255,.75)';const a2=-Math.PI/2+(palH(i,j,351)-.5)*.6;c.fillRect(px+Math.cos(a2)*hh-.7,py+Math.sin(a2)*hh-.7,1.4,1.4);
    if(big){c.fillStyle=palH(i,j,352)>.5?'rgba(170,230,255,.8)':'rgba(200,180,255,.8)';const fx=px+4,fy=py-hh-2;c.beginPath();c.moveTo(fx,fy-4);c.lineTo(fx+2.6,fy);c.lineTo(fx,fy+2);c.lineTo(fx-2.6,fy);c.closePath();c.fill()}});
/* รอยไหม้ของดาวตก (ทิศที่ดาวพุ่งลงมา) */
  for(const[cx,cy,r]of SFCR){const ang=-2.3+(cx%7)*.06,L=r*3.2,ex=cx+Math.cos(ang)*L,ey=cy+Math.sin(ang)*L;if(Math.max(cx,ex)+r<ox||Math.min(cx,ex)-r>X1||Math.max(cy,ey)+r<oy||Math.min(cy,ey)-r>Y1)continue;
    const gr=c.createLinearGradient(cx,cy,ex,ey);gr.addColorStop(0,'rgba(8,10,22,.55)');gr.addColorStop(1,'rgba(8,10,22,0)');c.fillStyle=gr;c.beginPath();c.moveTo(cx+Math.sin(ang)*r*.7,cy-Math.cos(ang)*r*.7);c.lineTo(ex,ey);c.lineTo(cx-Math.sin(ang)*r*.7,cy+Math.cos(ang)*r*.7);c.closePath();c.fill()}
  /* หลุมอุกกาบาต */
  for(const[cx,cy,r]of SFCR){if(cx+r*1.6<ox||cx-r*1.6>X1||cy+r*1.6<oy||cy-r*1.6>Y1)continue;
    c.strokeStyle='rgba(10,12,26,.45)';c.lineWidth=2.4;for(let k=0;k<16;k++){const a=k/16*6.283+cx*.01,l=r*(1.25+palH(k,cx|0,380)*.5);c.beginPath();c.moveTo(cx+Math.cos(a)*r*1.02,cy+Math.sin(a)*r*.92);c.lineTo(cx+Math.cos(a)*l,cy+Math.sin(a)*l*.9);c.stroke()}
    c.fillStyle='rgba(8,10,20,.5)';c.beginPath();c.ellipse(cx+6,cy+14,r*1.08,r*.98,0,0,7);c.fill();
    c.fillStyle='#4a5a8a';c.beginPath();c.ellipse(cx,cy,r*1.06,r*.96,0,0,7);c.fill();
    const fl=c.createRadialGradient(cx,cy+r*.15,0,cx,cy,r);fl.addColorStop(0,'#1a2a50');fl.addColorStop(.7,'#121a36');fl.addColorStop(1,'#26305a');c.fillStyle=fl;c.beginPath();c.ellipse(cx,cy,r*.94,r*.84,0,0,7);c.fill();
    c.strokeStyle='rgba(170,200,255,.35)';c.lineWidth=3;c.beginPath();c.ellipse(cx,cy,r*1.0,r*.9,0,Math.PI*1.05,Math.PI*1.95);c.stroke();
    const cg=c.createRadialGradient(cx,cy,0,cx,cy,r*.5);cg.addColorStop(0,'rgba(120,220,255,.42)');cg.addColorStop(1,'rgba(120,220,255,0)');c.fillStyle=cg;c.beginPath();c.arc(cx,cy,r*.5,0,7);c.fill();
    for(let k=0;k<10;k++){const a=palH(k,cy|0,390)*6.283,d=r*(.15+palH(cx|0,k,391)*.5),px=cx+Math.cos(a)*d,py=cy+Math.sin(a)*d*.85,s=4+palH(k,k,392)*7;c.fillStyle=k%3?'#7ad8ff':'#d8f4ff';c.beginPath();c.moveTo(px,py-s*1.5);c.lineTo(px+s*.45,py);c.lineTo(px,py+s*.35);c.lineTo(px-s*.45,py);c.closePath();c.fill()}}
  /* ลานค่ายธงเงิน: พรมแผนที่ดาว */
  {const C=SFCAMP;if(C.x+260>ox&&C.x-260<X1&&C.y+220>oy&&C.y-220<Y1){c.fillStyle='rgba(6,8,18,.4)';c.beginPath();c.ellipse(C.x+6,C.y+10,250,170,0,0,7);c.fill();c.fillStyle='#1c2650';c.beginPath();c.ellipse(C.x,C.y,240,160,0,0,7);c.fill();
    c.strokeStyle='#b8c8e8';c.lineWidth=3;c.beginPath();c.ellipse(C.x,C.y,230,152,0,0,7);c.stroke();c.lineWidth=1;c.strokeStyle='rgba(184,200,232,.5)';c.beginPath();c.ellipse(C.x,C.y,160,106,0,0,7);c.stroke();
    const st=[[-120,-40],[-60,-80],[10,-50],[70,-90],[130,-20],[60,40],[-40,60],[-110,30]];c.strokeStyle='rgba(220,230,255,.4)';c.beginPath();st.forEach(([x,y],i)=>i?c.lineTo(C.x+x,C.y+y):c.moveTo(C.x+x,C.y+y));c.stroke();
    for(const[x,y]of st){c.fillStyle='#e8f0ff';PST(c,C.x+x,C.y+y,5,2,4,0);c.fill()}}}}
function sfGroundFx(){const T=performance.now()/1000,Q=LOWQ;g.save();g.globalCompositeOperation='lighter';
  for(const[x,y,ph,v]of SFN.gl){if(!palVis(x,y,10))continue;const q=Math.sin(T*1.7+ph);if(q<.5)continue;glowAt(x,y-4,v===2?6:4,v===1?'200,170,255':'170,240,255',(q-.5)*1.6)}
  for(const[cx,cy,r]of SFCR){if(!palVis(cx,cy,r))continue;glowAt(cx,cy,r*.55,'110,210,255',.1+.06*Math.sin(T*1.3+cx));if(!Q)for(let k=0;k<3;k++){const p=(T*.3+k/3+cx*.001)%1;glowAt(cx+Math.sin(k*2.1+cx)*r*.3,cy-p*120,2.6,'200,245,255',.8*Math.sin(p*3.14))}}
  /* เศษดาว: เรืองให้เห็นเมื่อเข้าใกล้ (ใช้เข็มทิศหาจากไกล) */
  {const st=stCur(),q=me.sty;if(st&&st.p7sc&&q&&q.a===1)SFSH.forEach(([x,y],i)=>{if((q.p7sc|0)>>i&1)return;const d=Math.hypot(me.x-x,me.y-y);if(d>300||!palVis(x,y,40))return;const a=Math.min(1,(300-d)/160);
    glowAt(x,y-10,44,'150,230,255',.35*a+.12*Math.sin(T*5));glowAt(x,y-10,12,'255,255,255',.9*a);for(let k=0;k<4;k++){const an=T*2+k*1.57;glowAt(x+Math.cos(an)*18,y-10+Math.sin(an)*8,2.5,'220,250,255',.8*a)}})}
  /* ดาวตกกระทบพื้นไกล ๆ (โลก) */
  if(T-SFN.ft>(Q?9:5)){SFN.ft=T;const a=Math.random()*6.283,d=260+Math.random()*260;SFN.fall.push({x:me.x+Math.cos(a)*d,y:me.y+Math.sin(a)*d*.7,t0:T})}
  SFN.fall=SFN.fall.filter(f=>T-f.t0<1.6);for(const f of SFN.fall){const k=(T-f.t0);if(k<.45){const u=k/.45,sx=f.x+260*(1-u),sy=f.y-520*(1-u);g.strokeStyle='rgba(220,245,255,'+(.9*u)+')';g.lineWidth=2.4;g.beginPath();g.moveTo(sx+60,sy-120);g.lineTo(sx,sy);g.stroke();glowAt(sx,sy,10,'220,245,255',.9)}
    else{const u=(k-.45)/1.15;glowAt(f.x,f.y,60*(1-u*.5),'150,220,255',.5*(1-u));g.strokeStyle='rgba(200,240,255,'+(.6*(1-u))+')';g.lineWidth=2;g.beginPath();g.ellipse(f.x,f.y,20+u*70,(20+u*70)*.45,0,0,7);g.stroke()}}
  {const C=SFCAMP;if(palVis(C.x,C.y,300))for(const[x,y]of[[C.x-260,C.y+40],[C.x+250,C.y-10],[C.x-60,C.y+210]])glowAt(x,y-104,16,'200,225,255',.45+.15*Math.sin(T*3+x))}
  g.restore()}
function sfScreen(T,z,Hs){g.save();
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.34,SW0/2,Hs/2,Math.max(SW0,Hs)*.75);vg.addColorStop(0,'rgba(10,14,40,0)');vg.addColorStop(1,'rgba(10,14,40,.3)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  g.globalCompositeOperation='lighter';for(let k=0;k<(LOWQ?2:4);k++){const per=2.1+k*.9,q=((T+k*.77)%per)/per;if(q>.3)continue;const s=Math.floor((T+k*.77)/per),R=depRng(s*7+k),x0=R()*SW0*1.2-40,y0=R()*Hs*.3,u=q/.3,len=90+R()*80;
    const gr=g.createLinearGradient(x0+u*200-len,y0+u*110-len*.55,x0+u*200,y0+u*110);gr.addColorStop(0,'rgba(190,230,255,0)');gr.addColorStop(1,'rgba(235,250,255,'+(.85*Math.sin(u*3.14))+')');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(x0+u*200-len,y0+u*110-len*.55);g.lineTo(x0+u*200,y0+u*110);g.stroke()}
  g.globalCompositeOperation='source-over';
  /* เข็มทิศดาว (ระหว่างตามหาเศษดาว) */
  {const st=stCur(),q=me.sty;if(st&&st.p7sc&&q&&q.a===1&&curMap===34&&!SD.on){let b=null,bd=1e9;SFSH.forEach(([x,y],i)=>{if((q.p7sc|0)>>i&1)return;const d=Math.hypot(me.x-x,me.y-y);if(d<bd){bd=d;b=[x,y]}});if(b)sfCompass(T,b,bd)}}
  g.restore()}
function sfCompass(T,b,d){hudRects();const cx=(HUD.T[0]+HUD.T[1])/2,cy=46,R=30,s=Math.max(0,Math.min(1,1-d/1500)),per=.22+1.4*(1-s),ph=(T%per)/per;
  g.save();g.fillStyle='rgba(8,10,24,.55)';g.beginPath();g.arc(cx,cy+2,R+6,0,7);g.fill();
  const rg=g.createRadialGradient(cx-8,cy-8,4,cx,cy,R+4);rg.addColorStop(0,'#e8c070');rg.addColorStop(1,'#8a5a24');g.fillStyle=rg;g.beginPath();g.arc(cx,cy,R+4,0,7);g.fill();
  g.fillStyle='#16203e';g.beginPath();g.arc(cx,cy,R-1,0,7);g.fill();
  g.strokeStyle='rgba(200,225,255,.5)';g.lineWidth=1;for(let i=0;i<12;i++){const a=i/12*6.283;g.beginPath();g.moveTo(cx+Math.cos(a)*(R-6),cy+Math.sin(a)*(R-6));g.lineTo(cx+Math.cos(a)*(R-2),cy+Math.sin(a)*(R-2));g.stroke()}
  g.globalCompositeOperation='lighter';g.strokeStyle='rgba(140,220,255,'+(.8*(1-ph))+')';g.lineWidth=2;g.beginPath();g.arc(cx,cy,R*(.3+ph*.75),0,7);g.stroke();glowAt(cx,cy,R*.8,'120,210,255',.2+.4*s*(1-ph));g.globalCompositeOperation='source-over';
  const tr=Math.atan2(b[1]-me.y,b[0]-me.x),wob=(1-s)*(1-s)*1.6*Math.sin(T*3.1)+(1-s)*.6*Math.sin(T*7.3),a=tr+wob;
  g.save();g.translate(cx,cy);g.rotate(a);g.fillStyle='#ff8a6a';g.beginPath();g.moveTo(R-7,0);g.lineTo(-2,-4);g.lineTo(-2,4);g.closePath();g.fill();g.fillStyle='#c8d8ff';g.beginPath();g.moveTo(-R+9,0);g.lineTo(-2,-3.5);g.lineTo(-2,3.5);g.closePath();g.fill();g.restore();
  g.fillStyle='#ffe8b0';g.beginPath();g.arc(cx,cy,3,0,7);g.fill();
  const lb=d<160?'ใกล้มาก!':d<450?'สัญญาณแรง':d<900?'สัญญาณปานกลาง':'สัญญาณอ่อน';g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,10,24,.9)';g.strokeText('🧭 '+lb,cx,cy+R+18);g.fillStyle=d<450?'#bff0ff':'#e8e0d0';g.fillText('🧭 '+lb,cx,cy+R+18);g.restore()}
function sfTick(dt,now,x,y,mv){if(me.down<=0){me.x=Math.max(60,Math.min(3140,me.x));me.y=Math.max(130,Math.min(3140,me.y))}
  {const C=MAPS[34].npc2,on=gP7cl();C.x=on?SFCAMP.x+60:-9999;C.y=on?SFCAMP.y:-9999}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||!st.p7sc)return;
  SFSH.forEach(([sx,sy],i)=>{if((q.p7sc|0)>>i&1||Math.hypot(x-sx,y-sy)>70)return;q.p7sc=(q.p7sc|0)|(1<<i);let n=0;for(let k=0;k<5;k++)if(q.p7sc>>k&1)n++;q.n=n;PALG.card={h:'🌠 เศษดาว '+n+'/5',t:SFLORE[i],s:now,d:9};try{sfx('coin')}catch(e){}try{burst(sx,sy-10,['#c8f0ff','#ffffff','#ffe8a0'],34,170,1,{glow:1,g:-50})}catch(e){}try{stHud();writeSave()}catch(e){}})}
function sfAqT(st){if(!st.p7sc||!me.sty)return null;let b=null,bd=1e9;SFSH.forEach(([x,y],i)=>{if((me.sty.p7sc|0)>>i&1)return;const d=curMap===34?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x:x+((i*97)%2?130:-130),y:y-110}}});return b?{mp:34,act:'reach',x:b.x,y:b.y,lb:'ตามสัญญาณเข็มทิศดาว'}:null}
/* ภาพมอนที่ราบดาวตก */
function drawMonSF(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){const glow=(x,y,rr,c,a)=>{if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.restore()};
  const cry=(x,y,w,h,c1,c2)=>{Pg([x-w,y,x-w*.4,y-h*.8,x,y-h,x+w*.4,y-h*.8,x+w,y],F(c1),1);if(!W){g.fillStyle=c2;g.beginPath();g.moveTo(x-w*.4,y-h*.8);g.lineTo(x,y-h);g.lineTo(x+w*.1,y);g.lineTo(x-w*.5,y);g.closePath();g.fill()}};
  if(t===0){/* หมาป่าคลั่งดาว */glow(0,-r*.4,r*1.2,'110,200,255',.12);
    Ln([-r*.45,-r*.15,-r*.55,r*.8-la],F('#1a2240'),r*.2);Ln([-r*.15,-r*.15,-r*.2,r*.82-ra],F('#222c50'),r*.2);Ln([r*.25,-r*.15,r*.3,r*.82-la],F('#1a2240'),r*.2);Ln([r*.5,-r*.15,r*.6,r*.8-ra],F('#222c50'),r*.2);
    Ln([-r*.75,-r*.4+bob,-r*1.15,-r*.75+bob+sw*r*.1],F('#2a3460'),r*.16);cry(-r*1.18,-r*.72+bob+sw*r*.1,r*.1,r*.3,'#7ae0ff','rgba(230,250,255,.6)');
    E(0,-r*.38+bob,r*.78,r*.38,F('#2a3460'),1);E(0,-r*.24+bob,r*.52,r*.18,F('#3a4880'),0);
    for(let i=0;i<4;i++)cry(-r*.45+i*r*.28,-r*.66+bob,r*.11,r*(.32+(i%2)*.16),'#6ad0ff','rgba(230,250,255,.65)');
    E(r*.76,-r*.6+bob,r*.32,r*.25,F('#2a3460'),1);Pg([r*.95,-r*.66+bob,r*1.3,-r*.52+bob,r*1.24,-r*.4+bob,r*.95,-r*.42+bob],F('#222c50'),1);
    Pg([r*.6,-r*.78+bob,r*.66,-r*1.08+bob,r*.78,-r*.82+bob],F('#1a2240'),1);Pg([r*.8,-r*.8+bob,r*.92,-r*1.06+bob,r*.96,-r*.78+bob],F('#1a2240'),1);
    glow(r*.86,-r*.66+bob,r*.3,'140,230,255',.45);eye(r*.84,-r*.66+bob,r*.07,r*.05,'#a8f4ff');eye(r*1.02,-r*.64+bob,r*.06,r*.045,'#a8f4ff');return true}
  if(t===1){/* ภูตเศษดาว */const hv=Math.sin(T*3)*r*.12,fl=Math.sin(T*22)*.8;glow(0,-r*.4+hv,r*1.3,'170,230,255',.2);
    for(const s of[-1,1]){g.save();g.translate(s*r*.18,-r*.5+hv);g.rotate(s*(.3+fl*.35));g.fillStyle=W?'#fff':'rgba(210,240,255,.55)';g.beginPath();g.ellipse(s*r*.42,0,r*.42,r*.16,0,0,7);g.fill();g.restore()}
    cry(0,-r*.05+hv,r*.32,r*.9,'#9ae8ff','rgba(255,255,255,.75)');cry(0,-r*.05+hv,-r*.32,-r*.5,'#5ab8f0','rgba(255,255,255,.4)');
    eye(-r*.1,-r*.52+hv,r*.05,r*.07,'#ffffff');eye(r*.1,-r*.52+hv,r*.05,r*.07,'#ffffff');
    if(!W)for(let i=0;i<4;i++){const q=(T*1.6+i/4)%1;g.fillStyle='rgba(200,240,255,'+(.7*(1-q))+')';g.fillRect(-r*.3+Math.sin(i*2.3)*r*.4,r*.2+q*r*.8,2,2)}return true}
  /* ยักษ์อุกกาบาต */glow(0,-r*.7,r*1.5,'110,190,255',.14);
  Ln([-r*.38,r*.1,-r*.45,r*.85-la],F('#2a2e44'),r*.3);Ln([r*.38,r*.1,r*.45,r*.85-ra],F('#2a2e44'),r*.3);
  Pg([-r*.7,-r*1.05+bob,-r*.2,-r*1.25+bob,r*.45,-r*1.18+bob,r*.78,-r*.7+bob,r*.62,r*.2,r*.1,r*.32,-r*.5,r*.24,-r*.82,-r*.3+bob],F('#3a3e58'),1);
  Pg([-r*.7,-r*1.05+bob,-r*.2,-r*1.25+bob,r*.02,-r*.9+bob,-r*.4,-r*.5+bob,-r*.82,-r*.3+bob],F('#4a5070'),0);
  if(!W){g.strokeStyle='rgba(120,220,255,.85)';g.lineWidth=2;g.beginPath();g.moveTo(-r*.5,-r*.8+bob);g.lineTo(-r*.2,-r*.55+bob);g.lineTo(-r*.3,-r*.2);g.moveTo(r*.4,-r*.9+bob);g.lineTo(r*.2,-r*.6+bob);g.lineTo(r*.42,-r*.25);g.stroke()}
  {const cg=.6+.4*Math.sin(T*3);glow(0,-r*.55+bob,r*.5,'150,230,255',.45*cg);E(0,-r*.55+bob,r*.2,r*.2,F('#bff0ff'),0);if(!W){g.fillStyle='#ffffff';PST(g,0,-r*.55+bob,r*.16,r*.06,4,T)}if(!W)g.fill()}
  for(const s of[-1,1]){const ax=s*r*.82,ay=-r*.75+bob;Ln([s*r*.6,-r*.9+bob,ax+s*r*.2,ay+r*.3+(s<0?la:ra)*.5],F('#3a3e58'),r*.26);E(ax+s*r*.24,ay+r*.42,r*.26,r*.22,F('#2e3248'),1)}
  E(0,-r*1.32+bob,r*.24,r*.18,F('#3a3e58'),1);eye(-r*.09,-r*1.33+bob,r*.06,r*.04,'#9ae8ff');eye(r*.09,-r*1.33+bob,r*.06,r*.04,'#9ae8ff');
  if(!W)for(let i=0;i<3;i++){const a=T*1.4+i*2.09;E(Math.cos(a)*r*1.1,-r*.8+Math.sin(a)*r*.3,r*.1,r*.08,'#4a5070',1)}return true}
/* ของประกอบฉาก */
function sfTil(x,y,f,t){g.fillStyle='#6a4a2a';g.beginPath();g.roundRect(x-f*9-4,y-15,8,11,2);g.fill();campFolk(x,y,{c:'#8a6a3a',sh:'#d84a3a',hair:'#3a2414',f,s:1.15,k:3,arm:Math.sin(t*3)*.6-.4},t);
  const cx=x+f*10,cy=y-16;g.fillStyle='#b07a3a';g.beginPath();g.arc(cx,cy,5,0,7);g.fill();g.strokeStyle='#5a3a14';g.lineWidth=1;g.stroke();g.save();g.globalCompositeOperation='lighter';glowAt(cx,cy,10,'140,220,255',.4+.2*Math.sin(t*4));g.restore()}
function celD(x,y,T,f){const O='#10142a';g.save();g.translate(x,y);g.scale(f,1);PALSH(0,14,16,5,.4);
  g.fillStyle='#1a2250';g.beginPath();g.moveTo(-9,-22);g.lineTo(9,-22);g.lineTo(15,14);g.quadraticCurveTo(0,18,-15,14);g.closePath();g.fill();g.strokeStyle=O;g.lineWidth=1;g.stroke();
  g.fillStyle='#2e3a7a';g.beginPath();g.moveTo(-5,-20);g.lineTo(5,-20);g.lineTo(7,12);g.lineTo(-7,12);g.closePath();g.fill();
  g.fillStyle='#d8dcf0';for(const[a,b]of[[-10,0],[-8,8],[10,4],[8,-8],[-11,-10],[12,10]]){g.beginPath();g.arc(a,b,.9,0,7);g.fill()}
  g.fillStyle='#c8a050';g.fillRect(-8,-6,16,2);
  g.strokeStyle='#1a2250';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(-8,-16);g.lineTo(-12,-2);g.stroke();g.beginPath();g.moveTo(8,-16);g.lineTo(14,-10);g.stroke();
  g.strokeStyle='#b8862e';g.lineWidth=2.6;g.beginPath();g.moveTo(15,-30);g.lineTo(13,14);g.stroke();g.fillStyle='#d8a840';g.beginPath();g.roundRect(10,-38,10,10,2);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(15,-33,9,'170,220,255',.6);g.restore();
  g.fillStyle='#f0d8c8';g.beginPath();g.arc(0,-27,6.5,0,7);g.fill();g.strokeStyle=O;g.stroke();
  g.fillStyle='#d8dce8';g.beginPath();g.arc(0,-29,7,Math.PI*1.05,Math.PI*1.95);g.lineTo(7,-24);g.quadraticCurveTo(9,-12,5,-4+Math.sin(T*1.6)*1);g.lineTo(3,-6);g.quadraticCurveTo(5,-14,4,-24);g.closePath();g.fill();
  g.fillStyle='#10142a';g.fillRect(-3,-28,1.6,1.6);g.strokeStyle='#e8c070';g.lineWidth=1;g.beginPath();g.arc(2.6,-27.2,2.3,0,7);g.stroke();
  g.restore();g.save();g.globalCompositeOperation='lighter';const a=T*.8;for(let i=0;i<5;i++){const an=a+i*1.2566;glowAt(x+Math.cos(an)*16,y-48+Math.sin(an)*5,2.4,'220,235,255',.8)}g.restore();
  g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(10,10,24,.85)';g.strokeText('เซเลสต์ · นักดาราศาสตร์หลวง',x,y-60);g.fillStyle='#d8e4ff';g.fillText('เซเลสต์ · นักดาราศาสตร์หลวง',x,y-60)}
Object.assign(PALK,{
 sfmet(t,T){const x=t.x,y=t.y,r=SFMET[t.v][2];PALSH(x+4,y+6,r*1.1,r*.35,.5);g.fillStyle='#2a2e44';g.beginPath();g.moveTo(x-r,y);g.lineTo(x-r*.85,y-r*.9);g.lineTo(x-r*.2,y-r*1.4);g.lineTo(x+r*.6,y-r*1.15);g.lineTo(x+r*1.05,y-r*.3);g.lineTo(x+r*.8,y+r*.15);g.closePath();g.fill();
  g.fillStyle='#3e4462';g.beginPath();g.moveTo(x-r*.85,y-r*.9);g.lineTo(x-r*.2,y-r*1.4);g.lineTo(x+r*.1,y-r*.8);g.lineTo(x-r*.5,y-r*.3);g.closePath();g.fill();g.strokeStyle='#10121e';g.lineWidth=1.2;g.beginPath();g.moveTo(x-r,y);g.lineTo(x-r*.85,y-r*.9);g.lineTo(x-r*.2,y-r*1.4);g.lineTo(x+r*.6,y-r*1.15);g.lineTo(x+r*1.05,y-r*.3);g.lineTo(x+r*.8,y+r*.15);g.stroke();
  const q=.6+.4*Math.sin(T*2+t.v);g.strokeStyle='rgba(120,220,255,'+q+')';g.lineWidth=2;g.beginPath();g.moveTo(x-r*.4,y-r*.95);g.lineTo(x-r*.05,y-r*.6);g.lineTo(x-r*.2,y-r*.2);g.moveTo(x+r*.45,y-r*.9);g.lineTo(x+r*.2,y-r*.55);g.lineTo(x+r*.55,y-r*.25);g.stroke();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-r*.6,r*1.1,'110,200,255',.18*q);g.restore()},
 sfgt(t,T){const x=t.x,y=t.y,s=t.sc||1,sw=Math.sin(T*.8+x*.01)*2;PALSH(x+3,y+3,16*s,5,.35);g.strokeStyle='#3a4870';g.lineWidth=5*s;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x-4*s,y-40*s,x+sw*.5,y-70*s);g.stroke();
  g.lineWidth=2.4*s;for(const[dx,dy,l]of[[-1,-50,26],[1,-58,24],[-1,-30,18],[1,-38,20]]){g.beginPath();g.moveTo(x+sw*.3,y+dy*s);g.lineTo(x+dx*l*s+sw,y+(dy-16)*s);g.stroke()}
  const col=['150,230,255','200,170,255','170,255,230'][t.v];for(let i=0;i<9;i++){const a=i/9*6.283,px=x+Math.cos(a)*22*s+sw,py=y-70*s+Math.sin(a)*12*s;g.fillStyle='rgba('+col+',.55)';g.beginPath();g.moveTo(px,py-7*s);g.lineTo(px+3.5*s,py);g.lineTo(px,py+3*s);g.lineTo(px-3.5*s,py);g.closePath();g.fill()}
  g.save();g.globalCompositeOperation='lighter';glowAt(x+sw,y-70*s,32*s,col,.18+.08*Math.sin(T*1.4+x));g.restore()},
 sfcry(t,T){const x=t.x,y=t.y,c=['#7ad8ff','#b8a0ff','#9af0e0'][t.v];PALSH(x,y+2,10,3,.3);for(const[dx,h,w]of[[-5,16,4],[3,22,5],[8,12,3]]){g.fillStyle=c;g.beginPath();g.moveTo(x+dx-w,y);g.lineTo(x+dx,y-h);g.lineTo(x+dx+w,y);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.moveTo(x+dx,y-h);g.lineTo(x+dx+w*.4,y-2);g.lineTo(x+dx,y);g.closePath();g.fill()}},
 sftent(t,T){const x=t.x,y=t.y,c=['#2a3a78','#e8ecf4','#33448a'][t.v];PALSH(x+4,y+6,52,12,.4);g.fillStyle=c;g.beginPath();g.moveTo(x-50,y+4);g.lineTo(x,y-74);g.lineTo(x+50,y+4);g.closePath();g.fill();g.strokeStyle='#10142a';g.lineWidth=1.4;g.stroke();
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.moveTo(x,y-74);g.lineTo(x+50,y+4);g.lineTo(x+8,y+4);g.closePath();g.fill();g.fillStyle='#0c1024';g.beginPath();g.moveTo(x-10,y+4);g.lineTo(x,y-26);g.lineTo(x+10,y+4);g.closePath();g.fill();
  g.strokeStyle='#c8a050';g.lineWidth=1.4;g.beginPath();g.moveTo(x,y-74);g.lineTo(x,y-92);g.stroke();g.fillStyle='#d8e0ff';g.beginPath();g.moveTo(x,y-92);g.lineTo(x+18,y-86+Math.sin(T*3+t.v)*2);g.lineTo(x,y-80);g.closePath();g.fill();g.fillStyle='#c8a050';PST(g,x-18,y-30,5,2,4,0);g.fill()},
 sftel(t,T){const x=t.x,y=t.y;PALSH(x,y+4,26,7,.4);g.strokeStyle='#5a3a14';g.lineWidth=3;for(const dx of[-16,0,16]){g.beginPath();g.moveTo(x,y-40);g.lineTo(x+dx,y+2);g.stroke()}
  g.save();g.translate(x,y-46);g.rotate(-.75);const tg=g.createLinearGradient(0,-8,0,8);tg.addColorStop(0,'#f0c870');tg.addColorStop(1,'#8a5a20');g.fillStyle=tg;g.fillRect(-26,-7,70,14);g.fillRect(40,-9,10,18);g.fillStyle='#3a2410';g.fillRect(-30,-5,6,10);g.strokeStyle='#4a2e10';g.lineWidth=1;g.strokeRect(-26,-7,70,14);
  g.save();g.globalCompositeOperation='lighter';glowAt(50,0,12,'170,220,255',.6+.2*Math.sin(T*2));g.restore();g.restore()},
 sftab(t,T){const x=t.x,y=t.y;PALSH(x,y+3,30,6,.35);g.fillStyle='#4a3218';g.fillRect(x-28,y-18,56,6);g.fillRect(x-24,y-12,4,14);g.fillRect(x+20,y-12,4,14);g.fillStyle='#e8dcc0';g.save();g.translate(x,y-20);g.rotate(-.05);g.fillRect(-22,-6,40,12);g.strokeStyle='rgba(40,60,120,.7)';g.lineWidth=.8;g.beginPath();g.arc(-4,0,5,0,7);g.moveTo(-14,-2);g.lineTo(-4,0);g.lineTo(8,-3);g.lineTo(14,2);g.stroke();g.restore()},
 sfban(t,T){const x=t.x,y=t.y,w=Math.sin(T*2.4+x)*2;PALSH(x,y+2,8,3,.3);g.strokeStyle='#8a8ea8';g.lineWidth=2.4;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-110);g.stroke();g.fillStyle='#c8d0e8';g.beginPath();g.moveTo(x,y-106);g.lineTo(x+26+w,y-100);g.lineTo(x+22+w,y-86);g.lineTo(x+26+w,y-72);g.lineTo(x,y-76);g.closePath();g.fill();g.fillStyle='#2a3a78';PST(g,x+11+w*.5,y-90,5,2,4,0);g.fill();g.fillStyle='#e8f0ff';g.beginPath();g.arc(x,y-112,3,0,7);g.fill()},
 cel(t,T){const N=MAPS[34].npc2;if(!N||N.x<0)return;celD(N.x,N.y,T,me.x<N.x?-1:1)}});
/* ---------- เนื้อเรื่องภาค 7 บทที่ 1 ---------- */
Object.assign(SPK,{til7:SPK.til,cel:['เซเลสต์ · นักดาราศาสตร์หลวงแห่งอัสตรา','🔭','#c8d8ff']});STNPC.til7=[34,'npc'];STNPC.cel=[34,'npc2'];
STCH.push('ภาค 7 · บทที่ 1 · เข็มทิศดาว');
{const C1=STCH.length-1;STY.push(
 {c:C1,g:'talk',k:'cmd',p7s:1,tx:'คุยกับผู้บัญชาการเรนน์ที่ค่ายผู้อพยพ · ดาวตกทุกคืน',
  pre:[['nar','สามคืนหลังเรื่องที่หลุมหัวใจ… ฟ้าเหนือค่ายผู้อพยพสว่างผิดปกติ ดาวตกนับร้อยดวงพาดผ่านทุกคืน และไม่มีดวงไหนมอดก่อนถึงพื้น'],
   ['cmd','มาพอดี ผู้เชื่อมสองฟ้า ยามเห็นดาวตกลงที่ราบฝั่งตะวันออกของค่ายทุกคืน คนในค่ายกลัวกันว่าฟ้าจะแตกอีกรอบ'],
   ['cmd','ราชินีส่งข่าวมาว่าแสงหัวใจครึ่งดวงบนอัสตราลดลงทุกวัน… อารัณยาก็เหมือนกัน แสงครึ่งดวงไม่พอให้สองเมืองลอยอยู่ได้นาน',0,0,0,1],
   ['cmd','เมล็ดดาวที่ลอยขึ้นจากหลุมยังเล็กนิดเดียว เวสเปอร์บอกว่ามันต้องการ "อาหาร" — แสงจากดาวดวงอื่น',0,0,0,2],
   ['til','(ทิลวิ่งหอบเข้ามา ในมือถือของกลม ๆ สีสำริด) ท่านผู้นำ! ท่านเวสเปอร์ฝากนี่มา! เข็มทิศดาว! ทำจากเศษเปลหัวใจที่ก้นหลุม!'],
   ['til','มันชี้หาดาวที่ร่วงได้! ท่านเวสเปอร์บอกว่าดาวพวกนี้ไม่ได้ร่วงเอง… มันคือดาวที่ราชินีผู้กลืนดาวเคยกลืนไว้ ตอนท่านผู้นำล้มนาง ดาวก็หลุดออกมาหมด'],
   ['cmd','…ราชินีที่เจ้าล้มเมื่อหลายปีก่อน งั้นดาวพวกนี้ก็ร่วงลงมาเพราะเจ้า ไปเก็บมันกลับมาเถอะ ก่อนคนอื่นจะไปถึง'],
   ['cmd','ข้าเปิดประตูตะวันออกให้แล้ว ระวังตัวด้วย ยามบอกว่าสัตว์แถวนั้นตาเป็นประกายเหมือนดาวไปหมด']],rw:{g:120000}},
 {c:C1,g:'map',m:34,tx:'ไปที่ราบดาวตก (ประตูตะวันออกของค่ายผู้อพยพ)',
  post:[['nar','เลยประตูตะวันออกไป แผ่นดินกลายเป็นทุ่งหญ้าที่ใบใสเหมือนแก้ว สะท้อนแสงดาวตกที่พาดผ่านฟ้าไม่หยุด'],
   ['nar','หลุมอุกกาบาตนับสิบเรืองแสงจาง ๆ เหมือนแผลที่ยังไม่หาย ลมพัดหญ้าแก้วกระทบกันดังกรุ๊งกริ๊ง'],
   ['til','(ทิลวิ่งตามมา) ข้าตามมาด้วย! ท่านเวสเปอร์ให้ข้าดูแลเข็มทิศ… เอ่อ ให้ข้าช่วยดูน่ะ!'],
   ['me','(เข็มทิศสำริดในมือสั่นเบา ๆ เข็มหมุนวนไม่หยุด)']]},
 {c:C1,g:'clue',m:34,n:5,p7sc:1,tx:'ใช้เข็มทิศดาวตามหาเศษดาว 5 ชิ้น (เข็มยิ่งนิ่ง สัญญาณยิ่งแรง = ใกล้แล้ว)',
  pre:[['til','วิธีใช้ง่ายมาก! เข็มส่ายไปมาแปลว่ายังไกล ถ้าเข็มนิ่งและวงแสงเต้นถี่ แปลว่าใกล้แล้ว'],['til','พอเข้าไปใกล้มาก ๆ เศษดาวจะเรืองให้เห็นเอง!']],
  post:[['nar','เศษดาวทั้งห้าชิ้นลอยวนรอบเข็มทิศ ส่องแสงอุ่นเหมือนกองไฟ…'],['nar','แต่แสงนั้นส่องไปไกล ไกลพอให้สิ่งที่หิวแสงมองเห็น']]},
 {c:C1,g:'kill',m:34,n:40,tx:'ป้องกันเศษดาวจากสัตว์คลั่งดาวที่ตามแสงมา',
  post:[['nar','ฝูงสัตว์ล่าถอยไปในหญ้าแก้ว แต่ไม่ใช่เพราะกลัว… ทั้งฝูงหันหัวไปทางเดียวกัน ทางแสงอีกกลุ่มที่สว่างกว่าทางตะวันออก'],
   ['til','นั่นค่ายใครน่ะ… ธงเงินลายดาว นั่นธงหอดูดาวหลวงของอัสตรานี่!']],rw:{g:90000}},
 {c:C1,g:'talk',k:'cel',p7cl:1,tx:'ไปที่ค่ายธงเงินทางตะวันออกของที่ราบ',
  pre:[['nar','กลางค่ายมีกล้องดูดาวทองเหลืองชี้ขึ้นฟ้า ผู้หญิงผมสีเงินในเสื้อคลุมปักลายกลุ่มดาวกำลังจดอะไรบางอย่างอย่างรวดเร็ว'],
   ['cel','อย่าเข้ามาใกล้กว่านั้น เศษดาวในมือเจ้ากำลังรบกวนการวัดของข้า'],
   ['cel','ข้าคือเซเลสต์ นักดาราศาสตร์หลวงแห่งอัสตรา… เจ้าคงเป็น "ผู้เชื่อมสองฟ้า" ที่ทั้งเมืองพูดถึง'],
   ['cel','เจ้าคือคนที่แบ่งหัวใจดาวของเราไปครึ่งดวง หอดูดาวของข้าวัดได้ว่าแสงบนอัสตราลดลงสามส่วนร้อยทุกคืน',0,0,0,1],
   ['cel','เจ้าคือคนที่สาบานจะสร้างหัวใจดวงใหม่ คำสาบานที่ไม่มีนักดาราศาสตร์คนไหนในประวัติศาสตร์ทำได้ ข้าเลยมาดูให้เห็นกับตา',0,0,0,2],
   ['cel','ดาวที่ร่วงทุกดวงเคยเป็นของฟ้าเหนืออัสตรา ตามบันทึกของท่านโอเรียน ข้าจะเก็บกลับไปให้ครบทุกดวง'],
   ['til','แต่ดาวพวกนี้ไม่ใช่ของใครนะ! มันจำค่ายของเราได้ด้วย!'],
   ['cel','(เซเลสต์มองเศษดาวที่ลอยรอบเข็มทิศอยู่นาน) …มันจำได้จริง ๆ ด้วย'],
   ['cel','เก็บห้าชิ้นนั้นไว้ก่อนก็ได้ ข้าไม่ได้มาแย่งของจากเด็ก แต่ฟังให้ดี ห้าชิ้นนั้นเทียบไม่ได้กับดาวดวงใหญ่ที่ร่วงลงเหมืองคาร์นเมื่อเจ็ดคืนก่อน'],
   ['cel','ใครไปถึงก่อน คนนั้นตัดสินว่าแสงของมันจะส่องให้ใคร… ข้าออกเดินทางพรุ่งนี้เช้า']],
  post:[['me','(เซเลสต์หันกลับไปที่กล้องดูดาว ไม่สนใจใครอีก)'],['til','ท่านผู้นำ… เราต้องไปถึงเหมืองคาร์นก่อนนาง!']],rw:{g:80000,s3:5}},
 {c:C1,g:'talk',k:'til7',p7c1:1,tx:'กลับไปหาทิลที่ขอบที่ราบ',
  pre:[['til','ข้าจะเอาเศษดาวไปให้ท่านเวสเปอร์กับยายเอดาดูก่อน… ยายบอกว่าเพลงกล่อมมีท่อนหนึ่งพูดถึงดาวที่ร่วงด้วย!'],
   ['til','เหมืองคาร์นอยู่ไกลออกไปอีก ต้องผ่านหุบผา… พอพร้อมแล้วไปด้วยกันนะท่านผู้นำ!']],
  post:[['nar','🌠 — จบภาค 7 บทที่ 1 · เข็มทิศดาว — บทต่อไป: ราคาของดาว (เร็ว ๆ นี้)']],rw:{g:150000,s3:8}})}
setTimeout(()=>{try{
    MAPS[1].gates.push({x:2650,y:1150,to:34,req:1,p7:1,nm:'ที่ราบดาวตก',arr:{x:1600,y:430}});
    const M7=MAPS[27];MAPS[34]=Object.assign({},M7,{n:'ที่ราบดาวตก',sx:1600,sy:300,sr:110,seed:341,bg:'#1c2a46',tile:'#24365a',safe:'#2c3e66',ring:'#9ad8ff',t1:'#0c1426',t2:'#1a2846',d1:'#2a3a62',d2:'#c8ecff',bth:34,
      gates:[{x:1600,y:150,to:1,req:1,nm:'ค่ายผู้อพยพ',arr:{x:2650,y:1240}}],npc:{x:1720,y:470,n:'ทิล · ผู้ถือเข็มทิศดาว',L:22},npc2:{x:-9999,y:-9999,n:'เซเลสต์ · นักดาราศาสตร์หลวง'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[900,650],[2350,1100],[1150,1350],[1950,1750],[650,1650],[1050,2250],[2050,2500],[2750,2050],[1650,2450],[2900,950]]});
    FIELDM[34]=1;BTR[34]='90,200,255';GLOWC[34]='190,235,255';FXST[34]='cosmic';try{BTC[34]=['#e8f6ff','#4a8ad8','#ffffff'];TIER[34]=[17.5,20,2.6];WRG[34]={1:{rg:230,cd:1.9,spd:300,dm:.8,k:'star',c:'200,235,255'},2:{rg:280,cd:3,spd:240,dm:1.6,k:'starb',c:'150,220,255',big:1}}}catch(e){}}catch(e){console.warn('sf map',e)}
  try{NPC3[34]={d:sfTil,s:['เข็มทิศสั่นทุกครั้งที่ดาวตก!','ข้าไม่กลัวหรอก… แค่ตื่นเต้นนิดหน่อย','หญ้าที่นี่เป็นแก้ว เหยียบเบา ๆ นะท่านผู้นำ','ยายเอดาบอกว่าดาวทุกดวงมีชื่อ'],hy:40}}catch(e){}
  try{Object.assign(DEPM,{34:'starfall'});DEP4.starfall={fog:'120,150,230',fa:.15,bd:.16};AMB2.starfall=['rgba(190,225,255,.18)','rgba(6,10,36,.5)','170,220,255']}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p7sc)return sfAqT(st);return _q(st)}}catch(e){}},0);
