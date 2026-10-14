/* ---------- v344 ภาค 6 บทที่ 3 · ซากอารัณยา (แมพ 32 · เมืองกลับหัวใต้ทะเลเมฆ) ---------- */
const ARI=[[1600,400,260,'land'],[1600,1250,380,'plaza'],[760,1500,300,'west'],[2450,1200,300,'east'],[1150,2350,280,'south'],[2120,2660,300,'clock']];
const ARW=[[1600,620,1600,900,62],[1260,1340,1030,1430,62],[1960,1225,2170,1210,62],[860,1770,1040,2100,62]],ARH=[1400,2430,1850,2600,62];
const ARZN={land:['บันไดเมฆ','แสงจากสะพานส่องลงมาถึงตรงนี้เป็นครั้งแรกในสามร้อยปี'],plaza:['จัตุรัสระฆังคว่ำ','ระฆังใหญ่ที่สุดของอารัณยา นอนหงายอยู่กลางลาน'],west:['ย่านบ้านห้อยหัว','บ้านทุกหลังยืนด้วยหลังคา ประตูอยู่บนฟ้า'],
  east:['หอสมุดจมเมฆ','หนังสือยังลอยอยู่กลางอากาศ ตรงที่มันหล่นลงมา'],south:['สวนรากสำริด','รากไม้กับท่อสำริดพันกันจนแยกไม่ออก'],clock:['ลานหอนาฬิกาหยุดเดิน','เข็มนาฬิกาค้างอยู่ที่วินาทีที่เมืองร่วง'],walk:['สะพานโซ่','ไม้ทุกแผ่นถูกต่อขึ้นใหม่… ใครเป็นคนต่อ?']};
const ARSH=[[1440,1110],[790,1390],[2460,1090],[1210,2250],[1600,760]],ARBL=[[640,1580],[2560,1290],[1050,2440]],ARGT={x:2120,y:2540};
const ARLORE=['แท่นแสงจุดขึ้น ภาพเลือนรางปรากฏ: ตลาดของอารัณยาเมื่อสามร้อยปีก่อน ผู้คนห่มผ้าลายเฟืองตะวัน เด็ก ๆ วิ่งเล่นรอบระฆังใหญ่',
 'ภาพในแสง: นักดาราศาสตร์หลวงหนุ่มคนหนึ่งยืนมองหัวใจดาวของเมืองนานเกินไป ทุกคืน… ชื่อของเขาคือ โอเรียน',
 'ภาพในแสง: คืนที่หัวใจดาวหายไป ระฆังทุกใบในเมืองดังพร้อมกันครั้งสุดท้าย แล้วเมืองก็เริ่มเอียง',
 'ภาพในแสง: ผู้คนปีนเชือกขึ้นไปบนเมฆ ไปหาเมืองใหม่ที่ลอยอยู่ข้างบน… แล้วประตูเมืองนั้นก็ปิดใส่หน้าพวกเขา',
 'ภาพในแสง: คนที่ไม่ได้ปีนขึ้นไปจับมือกันรอบระฆังใหญ่ ร้องเพลงกล่อมเพลงเดียวกับที่ยายเอดาร้อง… จนเงากลืนพวกเขาไปทีละคน'];
let ARN={F:null,cl:[],dec:[],gh:[],deb:[]},ARS={lp:{x:1600,y:430},rev:0};
const arRev=()=>!!(me.sty&&((me.sty.p6b|0)===7||(typeof p6Past==='function'&&p6Past('p6bl'))));
function arField(){if(ARN.F)return ARN.F;const G=16,N=200,F=new Float32Array(N*N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const x=i*G+8,y=j*G+8;let v=-1e9;for(const[cx,cy,r]of ARI){const d=r-Math.hypot(x-cx,y-cy);if(d>v)v=d}
    for(const[x0,y0,x1,y1,w]of ARW){const dx=x1-x0,dy=y1-y0,t=Math.max(0,Math.min(1,((x-x0)*dx+(y-y0)*dy)/(dx*dx+dy*dy))),d=w-Math.hypot(x-x0-dx*t,y-y0-dy*t);if(d>v)v=d}F[j*N+i]=v}
  return ARN.F=F}
const arSegD=(x,y,S)=>{const[x0,y0,x1,y1]=S,dx=x1-x0,dy=y1-y0,t=Math.max(0,Math.min(1,((x-x0)*dx+(y-y0)*dy)/(dx*dx+dy*dy)));return Math.hypot(x-x0-dx*t,y-y0-dy*t)};
function arIn(x,y,m){m=m||0;if(x<0||y<0||x>=3200||y>=3200)return false;if(arField()[(y/16|0)*200+(x/16|0)]>m)return true;return arRev()&&arSegD(x,y,ARH)<ARH[4]-m}
function arZone(x,y){for(const[cx,cy,r,z]of ARI)if(Math.hypot(x-cx,y-cy)<r)return z;return'walk'}
function arBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;arField();
  const P=(x,y,r,k,o)=>{if(Math.hypot(x-M.sx,y-M.sy)<M.sr+20||M.gates.some(G=>Math.hypot(x-G.x,y-G.y)<90))return null;const t=Object.assign({x,y,r,k},o||{});trees.push(t);return t},rev=arRev();
  const W=(x,y,h)=>{if(arField()[(Math.max(0,Math.min(3199,y))/16|0)*200+(Math.max(0,Math.min(3199,x))/16|0)]>-6)return;const near=arSegD(x,y,ARH)<ARH[4]+30;if(near&&rev)return;trees.push({x,y,r:22,inv:1,ns:1,hw2:near?1:0})};
  for(const[cx,cy,r]of ARI){const n=Math.round(r*6.283/28);for(let i=0;i<n;i++){const a=i/n*6.283;W(cx+Math.cos(a)*(r+18),cy+Math.sin(a)*(r+18))}}
  for(const[x0,y0,x1,y1,w]of ARW.concat([ARH])){const a=Math.atan2(y1-y0,x1-x0),L=Math.hypot(x1-x0,y1-y0);for(let q=-20;q<L+20;q+=26)for(const s of[-1,1]){const x=x0+Math.cos(a)*q-Math.sin(a)*s*(w+18),y=y0+Math.sin(a)*q+Math.cos(a)*s*(w+18);if(arField()[(y/16|0)*200+(x/16|0)]<=-6&&!(arSegD(x,y,ARH)<ARH[4]-4))trees.push({x,y,r:22,inv:1,ns:1})}}
  /* ของตั้ง */
  P(1600,1240,92,'agbell',{ht:150,hw:120,fw:120});
  for(const[x,y,v]of[[600,1380,0],[900,1650,1],[850,1340,2],[560,1640,3]])P(x,y,46,'ahouse',{ht:150,hw:70,v});
  for(const[x,y]of[[2350,1080],[2580,1110],[2380,1340],[2620,1220]])P(x,y,30,'abook',{ht:120,hw:50,v:(x+y)%3});
  for(const[x,y]of[[1040,2250],[1280,2440],[1230,2200],[1000,2420]])P(x,y,26,'aroot',{ht:110,hw:50,v:(x*y)%4});
  P(2120,2470,50,'aclock',{ht:340,hw:160,fw:140,ns:1});
  ARSH.forEach(([x,y],i)=>trees.push({x,y,r:16,k:'ashr',si:i,ht:90}));ARBL.forEach(([x,y],i)=>trees.push({x,y,r:20,k:'abell',bi:i,ht:120,hw:40}));
  for(const[cx,cy,r,z]of ARI){if(z==='land')continue;const R=gxRng(cx+cy);for(let i=0;i<4;i++){const a=R()*6.283,rr=r*(.55+R()*.35),x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;if(Math.hypot(x-1600,y-1240)<160)continue;P(x,y,12,'alamp',{ht:100,v:i})}}
  for(const[x,y]of[[1450,330],[1750,330],[1430,520],[1770,520]])P(x,y,12,'alamp',{ht:100,v:9});
  /* เมฆ เศษหิน ผีชาวอารัณยา */
  {const R=gxRng(3232);ARN.cl=[];for(let i=0;i<90;i++)ARN.cl.push([R()*3200,R()*3200,60+R()*120,R()]);ARN.deb=[];for(let i=0;i<70;i++){const x=R()*3200,y=200+R()*3000;if(arIn(x,y,-80))continue;ARN.deb.push([x,y,4+R()*16,R()])}
    ARN.gh=[];for(let i=0;i<14;i++){const I=ARI[1+(i%5)];ARN.gh.push({cx:I[0],cy:I[1],r:I[2]*(.4+R()*.45),a:R()*6.28,sp:(.04+R()*.05)*(R()<.5?-1:1),k:i})}}
  ARN.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.k==='ashr'||t.k==='aclock')return;ARN.dec.push({k:'ao',b:[t.x-80,t.y-30,t.x+80,t.y+40],x:t.x,y:t.y,r:t.r,w:t.hw||0})})}
function arShape(c,dx,dy,gr){c.beginPath();for(const[cx,cy,r]of ARI){const R=r+(gr||0);c.moveTo(cx+R+dx,cy+dy);for(let i=1;i<=40;i++){const a=i/40*6.2832,w=1+.05*Math.sin(a*5+cx*.01)+.03*Math.sin(a*11+cy*.02);c.lineTo(cx+Math.cos(a)*R*w+dx,cy+Math.sin(a)*R*w+dy)}c.closePath()}}
function arSpires(c,ox,oy,X1,Y1){for(const[cx,cy,r,z]of ARI){const R=gxRng(cx*7+cy);const n=z==='land'?4:7;for(let i=0;i<n;i++){const u=(i+.5)/n*2-1,x=cx+u*r*.85,top=cy+Math.sqrt(1-u*u)*r*.95+20,L=(z==='land'?140:200)+R()*260,w=24+R()*40;if(x+w<ox||x-w>X1||top>Y1||top+L<oy)continue;
    const gr=c.createLinearGradient(0,top,0,top+L);gr.addColorStop(0,'rgba(58,44,78,.95)');gr.addColorStop(.7,'rgba(40,30,62,.55)');gr.addColorStop(1,'rgba(30,22,52,0)');c.fillStyle=gr;
    c.beginPath();c.moveTo(x-w/2,top);c.lineTo(x+w/2,top);c.lineTo(x+w/2,top+L*.62);c.lineTo(x+w*.18,top+L*.66);c.lineTo(x,top+L);c.lineTo(x-w*.18,top+L*.66);c.lineTo(x-w/2,top+L*.62);c.closePath();c.fill();
    c.fillStyle='rgba(60,46,82,.9)';c.fillRect(x-w/2-6,top+L*.3,w+12,7);c.fillRect(x-w/2-4,top+L*.58,w+8,6);
    for(let k=0;k<4;k++){if(R()<.35)continue;const wy=top+20+k*L*.13;c.fillStyle='rgba(255,170,80,'+(.35+R()*.4)+')';c.fillRect(x-4,wy,8,12)}
    c.strokeStyle='rgba(120,90,50,.7)';c.lineWidth=1.2;c.beginPath();c.moveTo(x,top+L);c.lineTo(x,top+L+18);c.stroke();c.fillStyle='rgba(176,122,58,.8)';c.beginPath();c.moveTo(x-6,top+L+18);c.lineTo(x+6,top+L+18);c.lineTo(x+4,top+L+28);c.lineTo(x-4,top+L+28);c.closePath();c.fill()}}}
function arPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sk=c.createLinearGradient(0,0,0,3200);sk.addColorStop(0,'#c89ab8');sk.addColorStop(.08,'#6a4a7a');sk.addColorStop(.35,'#2e2246');sk.addColorStop(1,'#0a0818');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  if(oy<420){for(let i=0;i<26;i++){const x=(i*137)%3300-50,y=40+((i*53)%160),r=110+(i%5)*30;const g2=c.createRadialGradient(x,y,10,x,y,r);g2.addColorStop(0,'rgba(255,220,235,.6)');g2.addColorStop(1,'rgba(255,220,235,0)');c.fillStyle=g2;c.fillRect(x-r,y-r,r*2,r*2)}}
  for(const cl of ARN.cl){const r=cl[2]*1.6;if(cl[0]+r<ox||cl[0]-r>X1||cl[1]+r<oy||cl[1]-r>Y1)continue;const[x,y,rr,v]=cl,a=.06+.1*(1-y/3200);const g2=c.createRadialGradient(x,y,4,x,y,rr*1.4);g2.addColorStop(0,'rgba(190,150,220,'+a+')');g2.addColorStop(1,'rgba(190,150,220,0)');c.fillStyle=g2;c.fillRect(x-rr*1.4,y-rr*1.4,rr*2.8,rr*2.8)}
  for(const[x,y,r,v]of ARN.deb){if(x<ox-30||x>X1+30||y<oy-30||y>Y1+30)continue;c.fillStyle='rgba(70,56,90,.8)';c.beginPath();c.moveTo(x-r,y);c.lineTo(x-r*.4,y-r*.6);c.lineTo(x+r*.8,y-r*.3);c.lineTo(x+r,y+r*.2);c.lineTo(x,y+r*.9);c.closePath();c.fill()}
  arSpires(c,ox,oy,X1,Y1);
  /* สะพานโซ่ (ใต้ท้อง) */
  const plank=(S2,hidden)=>{const[x0,y0,x1,y1,w]=S2,a=Math.atan2(y1-y0,x1-x0),L=Math.hypot(x1-x0,y1-y0),nx=-Math.sin(a),ny=Math.cos(a);if(Math.max(x0,x1)+w<ox||Math.min(x0,x1)-w>X1||Math.max(y0,y1)+w<oy||Math.min(y0,y1)-w>Y1)return;
    c.fillStyle='rgba(20,14,30,.55)';c.beginPath();c.moveTo(x0+nx*w+14,y0+ny*w+40);c.lineTo(x1+nx*w+14,y1+ny*w+40);c.lineTo(x1-nx*w+14,y1-ny*w+40);c.lineTo(x0-nx*w+14,y0-ny*w+40);c.closePath();c.fill();
    for(let q=0;q<L;q+=18){const px=x0+Math.cos(a)*q,py=y0+Math.sin(a)*q,v=palH(q|0,x0|0,32);c.fillStyle='rgb('+(96+v*30|0)+','+(70+v*20|0)+','+(48+v*14|0)+')';c.beginPath();c.moveTo(px+nx*(w-8),py+ny*(w-8));c.lineTo(px-nx*(w-8),py-ny*(w-8));c.lineTo(px-nx*(w-8)+Math.cos(a)*14,py-ny*(w-8)+Math.sin(a)*14);c.lineTo(px+nx*(w-8)+Math.cos(a)*14,py+ny*(w-8)+Math.sin(a)*14);c.closePath();c.fill();c.strokeStyle='rgba(30,18,10,.6)';c.lineWidth=1;c.stroke()}
    for(const s of[-1,1]){c.strokeStyle='#8a6a3a';c.lineWidth=3;c.beginPath();c.moveTo(x0+nx*s*w,y0+ny*s*w);c.lineTo(x1+nx*s*w,y1+ny*s*w);c.stroke();c.strokeStyle='rgba(200,150,80,.6)';c.lineWidth=1;c.stroke();for(let q=0;q<=L;q+=90){c.fillStyle='#5a4028';c.fillRect(x0+Math.cos(a)*q+nx*s*w-4,y0+Math.sin(a)*q+ny*s*w-4,8,8)}}};
  for(const S2 of ARW)plank(S2);
  /* ตัวเกาะ: ความหนา + ผิวหิน */
  c.fillStyle='#120c1c';arShape(c,10,62);c.fill();c.fillStyle='#241a30';arShape(c,4,38);c.fill();c.fillStyle='#3a2c46';arShape(c,0,18);c.fill();
  c.strokeStyle='rgba(120,80,40,.6)';c.lineWidth=2;for(const[cx,cy,r]of ARI){for(let i=0;i<8;i++){const a=Math.PI*.1+i*Math.PI*.1,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r+16;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+6,y+30,x-4,y+50+(i%3)*14);c.stroke()}}
  c.fillStyle='#4e4460';arShape(c,0,0);c.fill();
  c.save();arShape(c,0,0);c.clip();palGrid(ox,oy,X1,Y1,34,26,1,(x,y,i,j)=>{const h=palH(i,j,32),v=70+h*26|0;c.fillStyle='rgb('+v+','+(v-10)+','+(v+18)+')';c.beginPath();c.roundRect(x+1.5,y+1.5,31,23,3);c.fill();if(h>.86){c.fillStyle='rgba(200,150,70,.35)';c.beginPath();c.arc(x+17,y+13,5,0,7);c.fill()}});
  {const Rr=gxRng(Math.floor(ox/S)*13+Math.floor(oy/S)*29+3);for(let i=0;i<10;i++){const x=ox+Rr()*S,y=oy+Rr()*S;if(Rr()<.5){c.fillStyle='rgba(150,120,50,'+(.15+Rr()*.15)+')';c.beginPath();c.ellipse(x,y,18+Rr()*26,9+Rr()*12,Rr()*3,0,7);c.fill()}else{c.strokeStyle='rgba(20,14,26,.55)';c.lineWidth=1.4;c.beginPath();c.moveTo(x,y);let px=x,py=y;for(let k=0;k<5;k++){px+=(Rr()-.5)*36;py+=(Rr()-.5)*36;c.lineTo(px,py)}c.stroke()}}}
  /* ท่อสำริดเก่าบนผิว */
  c.strokeStyle='rgba(150,100,50,.5)';c.lineWidth=5;for(const[cx,cy,r]of ARI){c.beginPath();c.arc(cx,cy,r*.82,.3,1.4);c.stroke();c.beginPath();c.arc(cx,cy,r*.7,3.4,4.3);c.stroke()}
  /* วงอักขระกลางจัตุรัส */
  {const x=1600,y=1250;for(const[rr,w,a]of[[350,3,.5],[330,1,.4],[250,1.4,.35],[160,1,.3]]){c.strokeStyle='rgba(200,140,60,'+a+')';c.lineWidth=w;c.beginPath();c.arc(x,y,rr,0,7);c.stroke()}c.font='16px serif';c.fillStyle='rgba(200,140,60,.4)';c.textAlign='center';for(let i=0;i<24;i++){const a=i/24*6.283;c.save();c.translate(x+Math.cos(a)*292,y+Math.sin(a)*292);c.rotate(a+1.57);c.fillText('ᚨᚱᚢᚾᛃᚨᛟᛞ'[i%8],0,5);c.restore()}}
  /* ลานบันไดเมฆ */
  {const x=1600,y=400;c.strokeStyle='rgba(255,220,170,.35)';c.lineWidth=2;c.beginPath();c.arc(x,y,200,0,7);c.stroke();c.fillStyle='rgba(255,220,170,.2)';PST(c,x,y,120,50,8,0);c.fill()}
  for(const d of ARN.dec){const b=d.b;if(b[0]<X1&&b[2]>ox&&b[1]<Y1&&b[3]>oy){c.save();try{PALD.ao(c,d,ox,oy,X1,Y1)}catch(e){}c.restore()}}
  c.restore();
  c.strokeStyle='rgba(200,150,80,.35)';c.lineWidth=2;arShape(c,0,0);c.stroke()}
/* ---------- ชั้นพื้นที่ขยับได้ ---------- */
function arGroundFx(){const T=performance.now()/1000,Q=LOWQ,now=performance.now();g.save();
  /* บันไดแสงจากสะพานลงมา */
  if(palVis(1600,200,260)){g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,0,0,420);gr.addColorStop(0,'rgba(255,230,190,.55)');gr.addColorStop(1,'rgba(255,230,190,0)');g.fillStyle=gr;g.beginPath();g.moveTo(1520,0);g.lineTo(1680,0);g.lineTo(1760,420);g.lineTo(1440,420);g.closePath();g.fill();g.globalCompositeOperation='source-over';
    for(let i=0;i<9;i++){const y=40+i*30,w=150-i*6;g.fillStyle='rgba(255,240,205,'+(.85-i*.05)+')';g.beginPath();g.moveTo(1600-w/2,y);g.lineTo(1600+w/2,y);g.lineTo(1600+w/2-4,y+10);g.lineTo(1600-w/2+4,y+10);g.closePath();g.fill()}}
  /* สะพานลับ (ปรากฏหลังตีระฆังครบ) */
  if(arRev()){const[x0,y0,x1,y1,w]=ARH,a=Math.atan2(y1-y0,x1-x0),L=Math.hypot(x1-x0,y1-y0),nx=-Math.sin(a),ny=Math.cos(a),k=Math.min(1,(now-(ARS.rev||0))/2500);
    for(let q=0;q<L*k;q+=18){const px=x0+Math.cos(a)*q,py=y0+Math.sin(a)*q;if(!palVis(px,py,80))continue;g.fillStyle='rgba(255,214,150,.9)';g.beginPath();g.moveTo(px+nx*(w-8),py+ny*(w-8));g.lineTo(px-nx*(w-8),py-ny*(w-8));g.lineTo(px-nx*(w-8)+Math.cos(a)*14,py-ny*(w-8)+Math.sin(a)*14);g.lineTo(px+nx*(w-8)+Math.cos(a)*14,py+ny*(w-8)+Math.sin(a)*14);g.closePath();g.fill();g.strokeStyle='rgba(160,100,40,.6)';g.lineWidth=1;g.stroke()}
    g.globalCompositeOperation='lighter';for(let q=0;q<L*k;q+=60){const px=x0+Math.cos(a)*q,py=y0+Math.sin(a)*q;if(palVis(px,py,80))glowAt(px,py,40,'255,200,120',.18+.08*Math.sin(T*3+q))}g.globalCompositeOperation='source-over'}
  /* ผีชาวอารัณยาเดินวน (ไม่ทำร้ายใคร) */
  {const tru=p6Past('p6c3');for(const h of ARN.gh){const a=h.a+T*h.sp,x=h.cx+Math.cos(a)*h.r,y=h.cy+Math.sin(a)*h.r*.8;if(!palVis(x,y,40))continue;const al=.25+.15*Math.sin(T*.8+h.k);g.globalAlpha=tru?al+.2:al;campFolk(x,y,{c:tru?'#c8a070':'#6a5a8a',sh:tru?'#e0b050':null,hair:tru?'#5a3a20':'#2a2040',f:Math.sin(a)*h.sp>0?-1:1,k:h.k,run:1,s:1.1},T);g.globalAlpha=1}}
  g.globalCompositeOperation='lighter';
  if(!Q)for(let i=0;i<24;i++){const q=(T*.06+i/24)%1,x=(i*331)%3200+Math.sin(T*.3+i)*30,y=3000-q*2900;if(!palVis(x,y,20))continue;glowAt(x,y,2.6,'255,170,90',.7*Math.sin(q*3.14))}
  (MAPS[curMap].nests||[]).forEach(([x,y],i)=>{if(!palVis(x,y,90))return;glowAt(x,y,56,'150,70,200',.16+.12*Math.sin(T*1.6+i));g.globalCompositeOperation='source-over';g.fillStyle='rgba(12,4,20,.85)';g.beginPath();g.ellipse(x,y,22,12,0,0,7);g.fill();g.globalCompositeOperation='lighter';glowAt(x-5,y-2,3,'255,170,80',.9);glowAt(x+5,y-2,3,'255,170,80',.9)});
  /* ป้ายจุดหมาย */
  const st=stCur();if(st&&me.sty&&me.sty.a===1){g.globalCompositeOperation='source-over';const mark=(x,y,ic)=>{if(!palVis(x,y,60))return;g.font='18px system-ui';g.textAlign='center';g.fillText(ic,x,y-40+Math.sin(T*2.4)*4)};
    if(st.p6sh)ARSH.forEach(([x,y],i)=>{if(!((me.sty.p6s|0)>>i&1))mark(x,y,'✨')});if(st.p6bl)ARBL.forEach(([x,y],i)=>{if(!((me.sty.p6b|0)>>i&1))mark(x,y-60,'🔔')});if(st.p6gt)mark(ARGT.x,ARGT.y,'⌛')}
  g.restore()}
/* ชั้นหมอก: มองเห็นเฉพาะรอบตัว + แท่นแสงที่จุดแล้ว */
let ARFC=null;
function arScreen(T,z,Hs){if(!me.cls)return;const w=Math.ceil(SW0/2),h=Math.ceil(Hs/2);if(!ARFC){ARFC=document.createElement('canvas')}if(ARFC.width!==w||ARFC.height!==h){ARFC.width=w;ARFC.height=h}const c=ARFC.getContext('2d'),done=p6Past('p6c3');
  c.globalCompositeOperation='source-over';c.clearRect(0,0,w,h);c.fillStyle=done?'rgba(10,6,22,.6)':'rgba(10,6,22,.84)';c.fillRect(0,0,w,h);c.globalCompositeOperation='destination-out';
  const L=(x,y,r,a)=>{const sx=(x-cam.x)*z/2,sy=(y-cam.y)*z/2,R=r*z/2;if(sx<-R||sx>w+R||sy<-R||sy>h+R)return;const gr=c.createRadialGradient(sx,sy,R*.15,sx,sy,R);gr.addColorStop(0,'rgba(0,0,0,'+a+')');gr.addColorStop(.6,'rgba(0,0,0,'+(a*.7)+')');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(sx-R,sy-R,R*2,R*2)};
  L(me.x,me.y-20,300+Math.sin(T*3)*6,1);L(1600,300,420,1);L(1600,1225,300+Math.sin(T*1.4)*12,.72);
  ARSH.forEach(([x,y],i)=>{if(me.sty&&(me.sty.p6s|0)>>i&1)L(x,y,460,.95)});ARBL.forEach(([x,y],i)=>{if(me.sty&&(me.sty.p6b|0)>>i&1)L(x,y,240,.8)});
  {const N=MAPS[32].npc;if(N&&N.x>0)L(N.x,N.y-20,260,.95)}if(arRev())for(let q=0;q<=1;q+=.25)L(ARH[0]+(ARH[2]-ARH[0])*q,ARH[1]+(ARH[3]-ARH[1])*q,170,.7);
  Object.values(others).forEach(o=>{if(o&&o.hp>0)L(o.x,o.y-20,220,.9)});
  c.globalCompositeOperation='source-over';g.save();g.imageSmoothingEnabled=true;g.drawImage(ARFC,0,0,w,h,0,0,SW0,Hs);
  const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.35,SW0/2,Hs/2,Math.max(SW0,Hs)*.75);vg.addColorStop(0,'rgba(40,10,60,0)');vg.addColorStop(1,'rgba(40,10,60,.3)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);g.restore()}
function arTick(dt,now,x,y,mv){
  if(arIn(x,y,-4)){ARS.lp.x=x;ARS.lp.y=y}else if(!arIn(x,y,-34)&&me.down<=0){me.x=ARS.lp.x;me.y=ARS.lp.y}
  {const N=MAPS[32].npc,atG=p6From('p6gt');N.x=atG?2010:1760;N.y=atG?2560:1150}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1)return;
  if(st.p6sh)ARSH.forEach(([sx,sy],i)=>{if((q.p6s|0)>>i&1||Math.hypot(x-sx,y-sy)>60)return;q.p6s=(q.p6s|0)|(1<<i);let n=0;for(let k=0;k<5;k++)if(q.p6s>>k&1)n++;q.n=n;PALG.card={h:'✨ แท่นแสงเก่า '+n+'/'+ARSH.length,t:ARLORE[i],s:now,d:9};try{sfx('lg_get')}catch(e){}try{burst(sx,sy-40,['#ffd090','#ffffff','#ff9a50'],30,120,.9,{glow:1,g:-50})}catch(e){}try{stHud();writeSave()}catch(e){}});
  if(st.p6bl)ARBL.forEach(([bx,by],i)=>{if((q.p6b|0)>>i&1||Math.hypot(x-bx,y-by)>70)return;q.p6b=(q.p6b|0)|(1<<i);let n=0;for(let k=0;k<3;k++)if(q.p6b>>k&1)n++;q.n=n;ARS.bt=ARS.bt||[];ARS.bt[i]=now;try{sfx('boss')}catch(e){}dn.push({x:bx,y:by-140,v:'🔔 ระฆังใบที่ '+n+'/3 ดังกังวาน',t:2});
    if(n>=3){ARS.rev=now;trees.splice(0,trees.length,...trees.filter(t=>!t.hw2));banner={s:'🔔 ระฆังทั้งสามดังพร้อมกัน… สะพานแสงเส้นใหม่ก่อตัวขึ้นทางใต้!',t:5}}try{stHud();writeSave()}catch(e){}});
  if(st.p6gt&&Math.hypot(x-ARGT.x,y-ARGT.y)<130&&!q.n){q.n=1;try{stHud()}catch(e){}}}
function arAqT(st){if(st.p6sh&&me.sty){let b=null,bd=1e9;ARSH.forEach(([x,y],i)=>{if((me.sty.p6s|0)>>i&1)return;const d=curMap===32?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x,y:y+20}}});return b?{mp:32,act:'reach',x:b.x,y:b.y,lb:'ไปจุดแท่นแสง'}:null}
  if(st.p6bl&&me.sty){let b=null,bd=1e9;ARBL.forEach(([x,y],i)=>{if((me.sty.p6b|0)>>i&1)return;const d=curMap===32?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b={x,y:y+40}}});return b?{mp:32,act:'reach',x:b.x,y:b.y,lb:'ไปตีระฆัง'}:null}
  if(st.p6gt)return{mp:32,act:'reach',x:ARGT.x,y:ARGT.y+40,lb:'ไปประตูหอนาฬิกา'};return null}
/* ---------- ของตั้งในซากอารัณยา ---------- */
Object.assign(PALK,{
 agbell(t,T){const x=t.x,y=t.y,done=p6Past('p6c3');PALSH(x,y+20,130,30,.45);g.fillStyle='#2a1a10';g.beginPath();g.ellipse(x,y+10,124,40,0,0,7);g.fill();
  const bg=g.createLinearGradient(x-120,0,x+120,0);bg.addColorStop(0,'#4a2c14');bg.addColorStop(.4,'#b07a3a');bg.addColorStop(.6,'#c88e48');bg.addColorStop(1,'#3a2210');g.fillStyle=bg;g.beginPath();g.moveTo(x-120,y-20);g.quadraticCurveTo(x-110,y+30,x-60,y+44);g.lineTo(x+60,y+44);g.quadraticCurveTo(x+110,y+30,x+120,y-20);g.closePath();g.fill();
  g.fillStyle='#1a0e08';g.beginPath();g.ellipse(x,y-22,118,38,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y-22,100,done?'255,210,140':'255,150,70',.35+.15*Math.sin(T*1.4));g.restore();
  g.strokeStyle='#d8a050';g.lineWidth=4;g.beginPath();g.ellipse(x,y-22,118,38,0,0,7);g.stroke();g.strokeStyle='rgba(255,180,90,.7)';g.lineWidth=1.6;g.beginPath();g.moveTo(x+30,y-4);g.lineTo(x+46,y+18);g.lineTo(x+38,y+38);g.stroke();
  g.strokeStyle='#e8b060';g.lineWidth=1.6;g.beginPath();g.arc(x-60,y+16,12,0,7);g.stroke();for(let i=0;i<8;i++){const a=i*.785;g.beginPath();g.moveTo(x-60+Math.cos(a)*12,y+16+Math.sin(a)*12);g.lineTo(x-60+Math.cos(a)*17,y+16+Math.sin(a)*17);g.stroke()}
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const q=(T*.25+i/6)%1;glowAt(x-60+i*24,y-30-q*90,3,'255,190,110',.8*Math.sin(q*3.14))}g.restore()}},
 ahouse(t,T){const x=t.x,y=t.y,v=t.v|0,w=[110,96,124,104][v],h=[70,62,80,66][v];PALSH(x,y+4,w*.5,10,.4);
  g.fillStyle='#3a3a5a';g.beginPath();g.moveTo(x-w/2-8,y-36);g.lineTo(x,y);g.lineTo(x+w/2+8,y-36);g.closePath();g.fill();g.strokeStyle='rgba(20,20,30,.5)';for(let k=1;k<4;k++){g.beginPath();g.moveTo(x-w/2-8+k*w/8,y-36+k*9);g.lineTo(x+w/2+8-k*w/8,y-36+k*9);g.stroke()}
  const wg=g.createLinearGradient(x-w/2,0,x+w/2,0);wg.addColorStop(0,'#6a6070');wg.addColorStop(.5,'#9a90a0');wg.addColorStop(1,'#5a5060');g.fillStyle=wg;g.fillRect(x-w/2,y-36-h,w,h);g.strokeStyle='#2a2430';g.lineWidth=1.4;g.strokeRect(x-w/2,y-36-h,w,h);
  g.fillStyle='#2a1a10';g.beginPath();g.moveTo(x-11,y-36-h);g.lineTo(x-11,y-36-h+28);g.arc(x,y-36-h+28,11,Math.PI,0,true);g.lineTo(x+11,y-36-h);g.closePath();g.fill();
  for(const s of[-1,1]){g.fillStyle='#2a3a5a';g.fillRect(x+s*w*.28-8,y-36-h+30,16,20);g.fillStyle='rgba(255,170,80,'+(.3+.2*Math.sin(T*.6+x+s))+')';g.fillRect(x+s*w*.28-6,y-36-h+33,12,14)}
  g.fillStyle='#5a5060';g.fillRect(x+w*.22,y-36-h-24,12,24);g.strokeStyle='rgba(60,90,40,.7)';g.lineWidth=2;for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-w/2+10+i*w/3,y-36-h);g.quadraticCurveTo(x-w/2+16+i*w/3,y-36-h-20,x-w/2+8+i*w/3,y-36-h-34);g.stroke()}},
 abook(t,T){const x=t.x,y=t.y,v=t.v|0;PALSH(x,y+3,30,8);g.fillStyle='#4a3020';g.fillRect(x-28,y-70,56,70);g.strokeStyle='#2a1a10';g.lineWidth=1.4;g.strokeRect(x-28,y-70,56,70);for(let r=0;r<3;r++)for(let i=0;i<6;i++){g.fillStyle=['#8a3a3a','#3a5a8a','#6a5a2a','#3a6a4a'][(i+r+v)%4];g.fillRect(x-25+i*8.5,y-66+r*22,7,18-(i%3)*2)}
  for(let i=0;i<4;i++){const a=T*.5+i*1.57+v,bx=x+Math.cos(a)*40,by=y-90+Math.sin(a*1.3)*16;g.save();g.translate(bx,by);g.rotate(Math.sin(T+i)*.4);g.fillStyle='#e8dcc0';g.fillRect(-9,-6,18,12);g.fillStyle=['#8a3a3a','#3a5a8a','#6a5a2a','#3a6a4a'][i];g.fillRect(-10,-7,3,14);g.restore();g.save();g.globalCompositeOperation='lighter';glowAt(bx,by,14,'255,200,130',.25);g.restore()}},
 aroot(t,T){const x=t.x,y=t.y,v=t.v|0;PALSH(x,y+3,30,8);g.strokeStyle='#4a3020';g.lineCap='round';for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5,L=50+((i*17+v*7)%30);g.lineWidth=7-i%3;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a+.6)*L*.6,y+Math.sin(a+.6)*L*.4,x+Math.cos(a)*L,y+Math.sin(a)*L);g.stroke()}
  g.strokeStyle='#b07a3a';g.lineWidth=5;g.beginPath();g.moveTo(x-30,y-6);g.quadraticCurveTo(x,y-60,x+34,y-14);g.stroke();g.strokeStyle='rgba(255,210,140,.5)';g.lineWidth=1.4;g.stroke();g.fillStyle='#8a5a2a';g.beginPath();g.arc(x+34,y-14,6,0,7);g.fill();
  if(v%2){g.fillStyle='#e8b8d8';for(let i=0;i<4;i++){g.beginPath();g.arc(x-20+i*12,y-40-Math.sin(i*2)*10,3,0,7);g.fill()}}},
 aclock(t,T){const x=t.x,y=t.y,rev=arRev(),done=p6Past('p6c3');PALSH(x,y+8,150,24,.5);const tg=g.createLinearGradient(x-110,0,x+110,0);tg.addColorStop(0,'#3a3048');tg.addColorStop(.5,'#6a5a78');tg.addColorStop(1,'#2a2236');g.fillStyle=tg;g.fillRect(x-110,y-300,220,300);g.strokeStyle='#1a1424';g.lineWidth=2;g.strokeRect(x-110,y-300,220,300);
  g.fillStyle='#2a2236';g.beginPath();g.moveTo(x-130,y-300);g.lineTo(x,y-380);g.lineTo(x+130,y-300);g.closePath();g.fill();
  {const cx=x,cy=y-220;g.fillStyle='#e8dcc0';g.beginPath();g.arc(cx,cy,62,0,7);g.fill();g.strokeStyle='#b07a3a';g.lineWidth=6;g.stroke();g.fillStyle='#3a2a1a';for(let i=0;i<12;i++){const a=i/12*6.283;g.beginPath();g.arc(cx+Math.cos(a)*50,cy+Math.sin(a)*50,3,0,7);g.fill()}
    const ha=done?T*.05:-.6,ma=done?T*.6:2.2;g.strokeStyle='#2a1a10';g.lineWidth=4;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(ha)*28,cy+Math.sin(ha)*28);g.stroke();g.lineWidth=2.4;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(ma)*44,cy+Math.sin(ma)*44);g.stroke();g.fillStyle='#b07a3a';g.beginPath();g.arc(cx,cy,5,0,7);g.fill();
    g.strokeStyle='rgba(30,20,10,.6)';g.lineWidth=1.4;g.beginPath();g.moveTo(cx+20,cy-50);g.lineTo(cx+8,cy-10);g.lineTo(cx+26,cy+30);g.stroke()}
  {const dx=x,dy=y;g.fillStyle='#1a1018';g.beginPath();g.moveTo(dx-46,dy);g.lineTo(dx-46,dy-90);g.arc(dx,dy-90,46,Math.PI,0);g.lineTo(dx+46,dy);g.closePath();g.fill();g.strokeStyle='#b07a3a';g.lineWidth=4;g.stroke();
    g.save();g.globalCompositeOperation='lighter';glowAt(dx,dy-70,60,rev?'255,190,110':'150,90,200',.3+.15*Math.sin(T*2));g.restore();g.strokeStyle=rev?'#ffd090':'#8a6a3a';g.lineWidth=2;g.beginPath();g.arc(dx,dy-70,22,0,7);g.stroke();for(let i=0;i<8;i++){const a=i*.785+(done?T*.3:0);g.beginPath();g.moveTo(dx+Math.cos(a)*22,dy-70+Math.sin(a)*22);g.lineTo(dx+Math.cos(a)*32,dy-70+Math.sin(a)*32);g.stroke()}}
  for(const s of[-1,1]){g.fillStyle='#4a3a58';g.fillRect(x+s*130-16,y-160,32,160);g.fillStyle='#b07a3a';g.beginPath();g.moveTo(x+s*130-12,y-160);g.lineTo(x+s*130+12,y-160);g.lineTo(x+s*130+8,y-140);g.lineTo(x+s*130-8,y-140);g.closePath();g.fill()}},
 ashr(t,T){const x=t.x,y=t.y,lit=me.sty&&(me.sty.p6s|0)>>t.si&1;PALSH(x,y+2,22,6);g.fillStyle='#5a4a3a';g.fillRect(x-16,y-14,32,14);g.fillStyle='#7a6448';g.fillRect(x-12,y-44,24,30);g.fillStyle='#b07a3a';g.fillRect(x-18,y-48,36,6);
  g.strokeStyle=lit?'#ffd090':'#6a5030';g.lineWidth=1.8;g.beginPath();g.arc(x,y-30,8,0,7);g.stroke();for(let i=0;i<8;i++){const a=i*.785+(lit?T*.4:0);g.beginPath();g.moveTo(x+Math.cos(a)*8,y-30+Math.sin(a)*8);g.lineTo(x+Math.cos(a)*11,y-30+Math.sin(a)*11);g.stroke()}
  const cy=y-66+Math.sin(T*2+t.si)*3;g.fillStyle=lit?'#fff0c8':'#5a4a6a';g.beginPath();g.moveTo(x,cy-14);g.lineTo(x+8,cy);g.lineTo(x,cy+14);g.lineTo(x-8,cy);g.closePath();g.fill();
  if(lit){g.save();g.globalCompositeOperation='lighter';glowAt(x,cy,60,'255,190,110',.45+.1*Math.sin(T*3));glowAt(x,cy,12,'255,250,230',.9);g.restore()}},
 abell(t,T){const x=t.x,y=t.y,rung=me.sty&&(me.sty.p6b|0)>>t.bi&1,bt=ARS.bt&&ARS.bt[t.bi],sw=bt?Math.sin((performance.now()-bt)/120)*Math.max(0,1-(performance.now()-bt)/3000)*.5:Math.sin(T*.7+t.bi)*.04;PALSH(x,y+3,40,9);
  g.fillStyle='#4a3020';g.fillRect(x-40,y-112,7,112);g.fillRect(x+33,y-112,7,112);g.fillRect(x-46,y-120,92,9);
  g.save();g.translate(x,y-112);g.rotate(sw);const bg=g.createLinearGradient(-26,0,26,0);bg.addColorStop(0,'#5a3418');bg.addColorStop(.45,rung?'#e0a858':'#a07038');bg.addColorStop(1,'#4a2a12');g.fillStyle=bg;g.beginPath();g.moveTo(-8,0);g.quadraticCurveTo(-12,10,-14,26);g.quadraticCurveTo(-18,46,-28,56);g.lineTo(28,56);g.quadraticCurveTo(18,46,14,26);g.quadraticCurveTo(12,10,8,0);g.closePath();g.fill();g.strokeStyle='#2a1408';g.lineWidth=1.4;g.stroke();
  g.fillStyle='#3a2010';g.beginPath();g.arc(0,58,5,0,7);g.fill();g.restore();
  if(rung){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-80,46,'255,200,120',.35);const q=(T*.6)%1;g.strokeStyle='rgba(255,200,120,'+(.5*(1-q))+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y-70,30+q*80,10+q*26,0,0,7);g.stroke();g.restore()}
  else if(stCur()&&stCur().p6bl&&me.cls&&Math.hypot(me.x-x,me.y-y)<240){g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,10,20,.85)';g.strokeText('เดินเข้าไปตีระฆัง',x,y-130);g.fillStyle='#ffd8a0';g.fillText('เดินเข้าไปตีระฆัง',x,y-130)}},
 alamp(t,T){const x=t.x,y=t.y,lit=t.v===9||p6Past('p6c3')||(t.v%2===0);PALSH(x,y+2,8,3);g.strokeStyle='#3a2a1a';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-80);g.quadraticCurveTo(x,y-92,x+14,y-90);g.stroke();
  const lx=x+16,ly=y-80+Math.sin(T*1.4+x)*1.5;g.fillStyle='#8a5a28';g.fillRect(lx-6,ly-8,12,14);g.fillStyle=lit?'#ffd890':'#4a3a4a';g.fillRect(lx-4,ly-6,8,10);if(lit){g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly,30,'255,180,90',.45+.1*Math.sin(T*4+x));g.restore()}}});
/* ---------- เนื้อเรื่องภาค 6 บทที่ 3 ---------- */
Object.assign(SPK,{eda3:SPK.eda,ves:['เสียงจากหอนาฬิกา','🔔','#d8b0ff']});STNPC.eda3=[32,'npc'];
STCH.push('ภาค 6 · บทที่ 3 · ซากอารัณยา');
{const C8=STCH.length-1;STY.push(
 {c:C8,g:'talk',k:'til',tx:'ไปหาทิลที่บันไดใต้ลานพักกลางเมฆ (สะพานรุ่งอรุณ)',
  pre:[['til','ท่านผู้นำ! ยายกับข้าเก็บของเสร็จแล้ว ยายบอกว่าถ้าข้าจะลงไป ยายก็ต้องไปด้วย'],
   ['eda','ยายแก่แล้วลูก แต่ยายรอเพลงท่อนนั้นมาทั้งชีวิต ถ้าข้างล่างนั่นคือบ้านของมัน ยายก็อยากเห็นกับตา'],
   ['hed','ข้าก็ไปด้วย… ถ้าตระกูลข้ามาจากที่นั่นจริง ข้าต้องรู้ให้ได้ว่าปู่ทวดลบอะไรทิ้งไป',0,0,2],
   ['til','บันไดแสงมันทอดลงไปในเมฆ ลึกมากเลย… แต่ข้าไม่กลัวหรอก ข้าเคยเดินในฝันมาแล้ว'],
   ['eda','(ยายเอดาจุดโคมทองเหลืองเก่า ๆ ใบหนึ่ง) โคมของยายทวด ได้ยินว่าใช้นำทางในหมอกได้ ไปกันเถอะ']],rw:{g:60000}},
 {c:C8,g:'map',m:32,tx:'ลงบันไดใต้เมฆสู่ซากอารัณยา',
  post:[['nar','บันไดแสงทอดผ่านทะเลเมฆหนาทึบลงไปเรื่อย ๆ จนแสงอาทิตย์ข้างบนกลายเป็นเพียงจุดเล็ก ๆ'],
   ['nar','แล้วเมฆก็แหวกออก… เบื้องล่างคือเมืองทั้งเมืองที่ลอยค้างอยู่กลางความมืด กลับหัว หอคอยนับร้อยห้อยปลายแหลมลงสู่ห้วงลึก ระฆังสำริดแขวนอยู่ทุกหนแห่ง'],
   ['eda','(ยายเอดาเอามือปิดปาก) …ลายบนกำแพงพวกนั้น มันคือลายผ้าของยาย ทุกเส้นเลย'],
   ['til','หมอกหนามากเลย… มองไม่เห็นอะไรเกินโคมของยายเลย']]},
 {c:C8,g:'clue',m:32,n:5,p6sh:1,tx:'จุดแท่นแสงเก่าของอารัณยา',
  pre:[['eda','ดูนั่น แท่นหินมีลายเฟืองตะวันอยู่ทั่วเมือง ยายว่ามันคือที่จุดไฟของเมืองนี้ ถ้าจุดได้ หมอกน่าจะจางลง'],
   ['me','(แท่นแสงเก่ามี 5 แท่น — กระจายอยู่ตามเกาะต่าง ๆ)']],
  post:[['nar','แท่นแสงแท่นสุดท้ายสว่างขึ้น ภาพความทรงจำทั้งห้าต่อกันเป็นเรื่องเดียว…'],
   ['me','(นักดาราศาสตร์หลวงของอารัณยาชื่อโอเรียน… เขาขโมยหัวใจดาวของเมืองนี้ขึ้นไปสร้างอัสตรา)'],
   ['til','ผู้คนที่ปีนขึ้นไปแล้วโดนปิดประตูใส่… นั่นคือบรรพบุรุษของค่ายเราใช่ไหม ท่านผู้นำ']],rw:{g:60000}},
 {c:C8,g:'talk',k:'eda3',tx:'ไปหายายเอดาที่จัตุรัสระฆังคว่ำ',
  pre:[['eda','ลูก… ยายเพิ่งเข้าใจ ลายผ้าที่มือมันทอเอง มันไม่ใช่ลาย มันคือตัวอักษร ยายอ่านมันออก'],
   ['eda','บนขอบระฆังใหญ่เขียนว่า «เมื่อหัวใจกลับมา ระฆังจะดังอีกครั้ง และผู้ที่รอจะได้หลับ»'],
   ['eda','เงาพวกนั้น… มันคือคนอารัณยาที่ไม่ได้ปีนขึ้นไป พวกเขาไม่ได้ตาย เมืองที่ไม่มีหัวใจไม่ยอมให้ใครได้ตายสนิท'],
   ['til','(ทิลมองออกไปในหมอก) พวกเขากำลังมา… เยอะมากเลย ไม่ได้มาเพื่อทำร้าย แต่พวกเขาสับสน ได้กลิ่นแสงจากข้างบนแล้วคลั่ง'],
   ['eda','ช่วยพวกเขาสงบลงทีเถอะลูก ยายจะร้องเพลงกล่อมให้พวกเขาฟัง']],rw:{g:40000}},
 {c:C8,g:'kill',m:32,n:45,tx:'ทำให้เงาของชาวอารัณยาสงบลง',
  post:[['nar','เสียงเพลงกล่อมของยายเอดาลอยไปทั่วจัตุรัส เงาที่เหลือหยุดนิ่ง… แล้วค่อย ๆ นั่งลงรอบระฆังใหญ่ เหมือนเด็กที่รอฟังนิทาน'],
   ['hed','(เฮเดรียนคุกเข่าข้างเงาตัวหนึ่ง ที่สวมเกราะลายเดียวกับตราตระกูลเขา) …องครักษ์หลวงของอารัณยา ปู่ทวดข้าคือหนึ่งในคนที่หนีขึ้นไป แล้วทิ้งเพื่อนไว้ที่นี่',0,0,2],
   ['til','ระฆังสามใบที่อยู่บนเกาะรอบ ๆ … ข้าฝันว่าถ้าตีมันพร้อมกัน ทางไปหอนาฬิกาจะเปิด']]},
 {c:C8,g:'clue',m:32,n:3,p6bl:1,tx:'ตีระฆังนำทางทั้ง 3 ใบ (ย่านบ้านห้อยหัว · หอสมุด · สวนรากสำริด)',
  post:[['nar','ระฆังทั้งสามใบดังประสานกันเป็นเสียงเดียว แผ่นแสงสีอำพันค่อย ๆ ก่อตัวขึ้นกลางอากาศ ต่อเป็นสะพานจากสวนรากสำริดไปยังเกาะทางใต้สุด'],
   ['nar','บนเกาะนั้นมีหอนาฬิกาสูงตระหง่าน เข็มนาฬิกาค้างนิ่ง…']],rw:{g:50000}},
 {c:C8,g:'clue',m:32,n:1,p6gt:1,tx:'ข้ามสะพานลับไปยังประตูหอนาฬิกา'},
 {c:C8,g:'talk',k:'eda3',p6c3:1,cine:1,tx:'ไปหายายเอดาหน้าประตูหอนาฬิกา',
  pre:[['nar','ประตูหอนาฬิกาถูกผนึกด้วยเฟืองตะวันสำริดขนาดใหญ่ บนหน้าปัดเหนือประตู เข็มนาฬิกาค้างอยู่ที่เวลาเดียวมาสามร้อยปี'],
   ['eda','เวลานี้… คือเวลาที่เพลงกล่อมบอกให้เด็ก ๆ หลับ'],
   ['nar','ทันใดนั้น ระฆังทุกใบในอารัณยาสั่นพร้อมกันโดยไม่มีใครแตะ เสียงทุ้มต่ำดังออกมาจากหลังประตูหอนาฬิกา'],
   ['ves','…ผู้ถือตราแห่งรุ่งอรุณ ตราที่เจ้าสวมอยู่ เคยเป็นของคนที่สัญญาว่าจะกลับมารับพวกเรา'],
   ['ves','สามร้อยปีที่ข้าเฝ้าหอนี้ รอให้หัวใจกลับมา เจ้ามาเพื่อคืนสิ่งที่ถูกขโมย… หรือมาเพื่อขโมยซ้ำ?'],
   ['hed','(เฮเดรียนก้าวออกมา) ข้าชื่อเฮเดรียน หลานของผู้ที่หนีไป… ถ้ามีหนี้ ตระกูลข้าจะรับผิดชอบ',0,0,2],
   ['ves','…สายเลือดองครักษ์ ในที่สุดก็มีคนหนึ่งที่กล้ากลับมา',0,0,2],
   ['ves','หัวใจทั้งดวงส่องลงมาถึงที่นี่แล้ว ข้ารู้สึกได้… แสงที่ควรเป็นของเรา ส่องผ่านไปเฉย ๆ',0,1],
   ['ves','อัสตราลอยต่ำลงมาจนข้าได้ยินหัวใจเต้น… ใกล้แค่เอื้อม แต่ยังไม่ใช่ของเรา',0,2],
   ['ves','ข้าชื่อเวสเปอร์ ผู้พิทักษ์คนสุดท้ายของอารัณยา… ถ้าเจ้าอยากรู้ว่าเมืองนี้ต้องจ่ายราคาเท่าไหร่ ก็ขึ้นมาบนหอนาฬิกา'],
   ['nar','เฟืองตะวันบนประตูหมุนไปหนึ่งช่อง… และเข็มนาฬิกาที่ค้างมาสามร้อยปี ขยับไปหนึ่งวินาที'],
   ['til','(ทิลจับมือยายแน่น) …ยาย ข้าว่าเขาไม่ได้โกรธนะ เขาแค่เหนื่อยมาก ๆ'],
   ['nar','⌛ — จบภาค 6 บทที่ 3 · ซากอารัณยา — บทต่อไป: หอนาฬิกาหยุดเดิน (เร็ว ๆ นี้)']],rw:{g:220000,s3:12}})}
function arPitStair(G){const t=performance.now()/1000,x=G.x,y=G.y,st=stCur(),want=!!(st&&me.sty&&me.sty.a===1&&st.g==='map'&&st.m===33)||!!(st&&st.g==='map'&&st.m===33);g.save();
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x+4,y+40,84,18,0,0,7);g.fill();
  g.fillStyle='#5a4c68';g.beginPath();g.roundRect(x-74,y-54,148,96,10);g.fill();g.strokeStyle='#2a2034';g.lineWidth=2;g.stroke();
  g.strokeStyle='rgba(216,160,80,.75)';g.lineWidth=2.4;g.beginPath();g.roundRect(x-68,y-48,136,84,8);g.stroke();
  {const gr=g.createLinearGradient(0,y+30,0,y-42);gr.addColorStop(0,'#2a2036');gr.addColorStop(1,'#050208');g.fillStyle=gr;g.beginPath();g.roundRect(x-58,y-40,116,70,5);g.fill()}
  for(let i=0;i<6;i++){const yy=y+24-i*11,w=54-i*5,a=1-i*.14;g.fillStyle='rgba(120,104,140,'+a+')';g.fillRect(x-w,yy-4,w*2,5);g.fillStyle='rgba(30,20,40,'+a+')';g.fillRect(x-w,yy+1,w*2,3)}
  g.strokeStyle='#b07a3a';g.lineWidth=2.4;g.beginPath();g.moveTo(x-56,y+28);g.lineTo(x-30,y-38);g.moveTo(x+56,y+28);g.lineTo(x+30,y-38);g.stroke();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-20,60,'190,140,255',.28+.1*Math.sin(t*2));for(let i=0;i<5;i++){const q=(t*.4+i/5)%1;glowAt(x-30+i*15,y-30-q*60,2.6,'220,190,255',Math.sin(q*3.14))}g.restore();
  for(const s of[-1,1]){const lx=x+s*86,ly=y+10;g.strokeStyle='#3a2a1a';g.lineWidth=4;g.beginPath();g.moveTo(lx,ly);g.lineTo(lx,ly-70);g.stroke();g.fillStyle='#d8a050';g.beginPath();g.roundRect(lx-7,ly-84,14,16,3);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly-76,26,'255,200,120',.55+.1*Math.sin(t*3+s));g.restore()}
  g.font='bold 12px system-ui';g.textAlign='center';g.lineWidth=3.5;g.strokeStyle='rgba(20,10,30,.9)';const lb='🕳️ บันไดลง'+(G.nm||'หลุมหัวใจว่าง');g.strokeText(lb,x,y-66);g.fillStyle='#ffe8b0';g.fillText(lb,x,y-66);
  if(want){const b=Math.sin(t*5)*6;g.font='22px system-ui';g.fillText('⬇️',x,y-88+b)}
  g.restore()}
function arStairDraw(G){if(G&&G.to===33&&curMap===32)return arPitStair(G);const t=performance.now()/1000;g.save();g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,10,30,.85)';const lb=G.to===32?'🌫️ '+(G.nm||''):'☁️ '+(G.nm||'');g.strokeText(lb,G.x,G.y-24);g.fillStyle='#e8dcff';g.fillText(lb,G.x,G.y-24);g.restore()}
setTimeout(()=>{try{
    MAPS[30].gates.push({x:1600,y:1935,to:32,req:1,p6d:1,ars:1,nm:'บันไดลงใต้เมฆ',arr:{x:1600,y:430}});
    const M7=MAPS[27];MAPS[32]=Object.assign({},M7,{n:'ซากอารัณยา',sx:1600,sy:430,sr:110,seed:321,bg:'#1a1228',tile:'#4e4460',safe:'#5a5070',ring:'#d8a050',t1:'#120c1c',t2:'#241a30',d1:'#3a2c46',d2:'#d8a050',bth:30,
      gates:[{x:1600,y:250,to:30,req:1,ars:1,nm:'สะพานรุ่งอรุณ',arr:{x:1600,y:1860}}],npc:{x:1760,y:1150,n:'ยายเอดา · กับโคมนำทาง',L:22},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[1350,1100],[1850,1420],[1500,1500],[620,1440],[860,1620],[2350,1300],[2560,1120],[1060,2300],[1260,2400]]});
    FIELDM[32]=1;BTR[32]='150,40,170';GLOWC[32]='255,180,110';FXST[32]='void';try{BTC[32]=['#ffe0b0','#8a5ad0','#ffffff'];TIER[32]=[16,18.5,2.4];WRG[32]={2:{rg:270,cd:3,spd:230,dm:1.5,k:'bell',c:'255,190,120',big:1}}}catch(e){}}catch(e){console.warn('arn map',e)}
  try{NPC3[32]={d:(x,y,f,t)=>{campFolk(x,y,{c:'#8a3a3a',sh:'#e0b050',hair:'#e8e8e8',f,s:1.2,k:4,arm:-.6},t);const lx=x+f*12,ly=y-12+Math.sin(t*2)*1.5;g.fillStyle='#b07a3a';g.fillRect(lx-5,ly-7,10,12);g.fillStyle='#fff0c0';g.fillRect(lx-3,ly-5,6,8);g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly,34,'255,190,110',.55+.1*Math.sin(t*5));g.restore();
      campFolk(x-f*26,y+6,{c:'#8a6a3a',sh:'#d84a3a',hair:'#3a2414',f,s:1.05,k:3,arm:Math.sin(t*3)*.4},t);if(me.sty&&me.sty.p6h===2)campFolk(x+f*30,y-8,{c:'#22305a',sh:'#d8b050',hair:'#d8d8d8',hat:'#141826',f,s:1.2,k:7},t)},s:['ระวังขอบเกาะนะลูก','ลายบนกำแพงนี่… ยายอ่านออกทุกตัวเลย','หลับเถิดลูก แสงของเราอยู่บนฟ้า…'],hy:46}}catch(e){}
  try{const _og=drawOneGate;window.drawOneGate=drawOneGate=function(G){if(G&&G.ars)return arStairDraw(G);return _og(G)}}catch(e){}},0);
