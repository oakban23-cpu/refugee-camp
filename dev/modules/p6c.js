/* ---------- v342 ภาค 6 บทที่ 2 · ตลาดสองฟ้า (แมพ 31 · ย่านวงแหวนล่าง) ---------- */
const MKC={x:1600,y:1750},MKR=1250,MKGATE=[1480,190,1720,560];
const mktD=(x,y)=>Math.hypot(x-MKC.x,y-MKC.y);
function mktIn(x,y,m){m=m||0;if(mktD(x,y)<MKR-m)return true;return x>MKGATE[0]+m&&x<MKGATE[2]-m&&y>MKGATE[1]+m&&y<MKGATE[3]}
const p6I=k=>STY.findIndex(x=>x[k]),p6Past=k=>{const i=p6I(k);return i>=0&&!!me.sty&&(me.sty.s|0)>i},p6From=k=>{const i=p6I(k);return i>=0&&!!me.sty&&(me.sty.s|0)>=i},p6At=k=>{const i=p6I(k);return i>=0&&!!me.sty&&(me.sty.s|0)===i};
const gP6c1=()=>p6Past('p6c1'),gP6c2=()=>p6Past('p6c2');
const MKTZN={gate:['ประตูวงแหวนล่าง','ประตูที่ปิดมาสามร้อยปี วันนี้แขวนโคมต้อนรับ'],plaza:['ลานน้ำพุสองฟ้า','ที่ที่คนบนฟ้ากับคนจากแผ่นดินยืนขายของข้างกัน'],north:['ถนนประตูวงแหวน','เสียงเรียกลูกค้าสองสำเนียงดังแข่งกัน'],east:['ซอยผ้าทอ','ผ้าทุกผืนเล่าเรื่องของคนทอ'],
  west:['ซอยเครื่องเทศ','กลิ่นของแผ่นดินลอยขึ้นมาถึงฟ้า'],south:['ลานช่างฝีมือ','ค้อน เข็ม และเตาเผา ไม่หยุดเลยตั้งแต่ประตูเปิด'],ruin:['ซอยร้างวงแหวนล่าง','สามร้อยปีที่ไม่มีใครเดินผ่าน… จนกระทั่งเงามาถึง']};
function mktZone(x,y){if(y<620&&Math.abs(x-1600)<150)return'gate';const d=mktD(x,y);if(d<380)return'plaza';if(d>910)return'ruin';const a=Math.atan2(y-MKC.y,x-MKC.x);return a>-2.36&&a<-.79?'north':a>=-.79&&a<.79?'east':a>=.79&&a<2.36?'south':'west'}
const MKCLUE=[
 {x:1530,y:1150,t:'แผงผ้าใบไหม้เกรียม… ใต้เถ้ามีรอยรองเท้าหนังพื้นแข็ง ส้นตอกตะปูเงิน — ไม่มีผู้อพยพคนไหนใส่รองเท้าแบบนี้'},
 {x:2270,y:1690,t:'ผ้าใบถูกฟันขาดเป็นแนวเฉียงเรียบร้อย แบบทหารที่ฝึกมา ขอบผ้ามีคราบน้ำยาขัดเงินกลิ่นฉุน ที่ใช้ขัดเกราะทหารสภาเท่านั้น'},
 {x:960,y:1830,t:'เครื่องเทศหกเกลื่อน ปนกับเถ้าดำที่เย็นเฉียบ… ไม่ใช่เถ้าจากไฟ กลิ่นเหมือนเงาที่ไต่สะพานเป๊ะ'},
 {x:1690,y:2420,t:'เข็มกลัดรูปหอคอยเงินตกอยู่ใต้โต๊ะช่าง — ตรากองรักษาการณ์ของสภาเก่า ที่ถูกยุบไปตั้งแต่โอเรียนล่ม'},
 {x:1930,y:1520,t:'แปลก… แผงรอบข้างพังหมด แต่ผ้าทอลายเฟืองตะวันของยายเอดาไม่มีใครแตะเลย ราวกับคนร้ายกลัวลายนี้'}];
const MKLAN=[[1388,1538],[1812,1538],[1812,1962],[1388,1962],[1600,1110],[2240,1750],[1600,2390],[960,1750]];
const MKF={on:0,t:0,lit:[0,0,0,0,0,0,0,0],wis:[],nx:0};
let MKT={dec:[],cl:[],st:[],ns:[]};
function mktBuild(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=1;
  const P=(x,y,r,k,o)=>{if(Math.hypot(x-M.sx,y-M.sy)<M.sr+20||M.gates.some(G=>Math.hypot(x-G.x,y-G.y)<90))return null;const t=Object.assign({x,y,r,k},o||{});trees.push(t);return t},I=(x,y)=>{if(!mktIn(x,y,-6))trees.push({x,y,r:22,inv:1,ns:1})},R=gxRng(3131);
  for(let i=0;i<300;i++){const a=i/300*6.283;I(MKC.x+Math.cos(a)*(MKR+18),MKC.y+Math.sin(a)*(MKR+18))}for(let y=180;y<=560;y+=28){I(MKGATE[0]-18,y);I(MKGATE[2]+18,y)}for(let x=MKGATE[0];x<=MKGATE[2];x+=28)I(x,MKGATE[1]-18);
  const offAve=a=>{const q=((a%(Math.PI/2))+Math.PI/2)%(Math.PI/2);return Math.min(q,Math.PI/2-q)>.36};
  /* บ้านหินขาวของอัสตรา */
  for(let i=0;i<16;i++){const a=i/16*6.283+.2;if(!offAve(a))continue;P(MKC.x+Math.cos(a)*505,MKC.y+Math.sin(a)*505,52,'mhouse',{ht:150,hw:80,fw:80,v:i%5})}
  for(let i=0;i<22;i++){const a=i/22*6.283+.1;if(!offAve(a)||(a>4.3&&a<5.1))continue;P(MKC.x+Math.cos(a)*820,MKC.y+Math.sin(a)*820,54,'mhouse',{ht:150,hw:80,fw:80,v:(i+2)%5})}
  /* ซากบ้านในซอยร้าง */
  for(let i=0;i<26;i++){const a=i/26*6.283+.05,r=1070+(i%3)*40;if(!offAve(a)||(a>4.4&&a<5.0))continue;P(MKC.x+Math.cos(a)*r,MKC.y+Math.sin(a)*r,i%3===1?26:46,i%3===1?'mrub':'mruin',{ht:110,hw:60,v:i%4})}
  for(let i=0;i<12;i++){const a=i/12*6.283+Math.PI/12;if(Math.abs(a-4.71)<.4)continue;trees.push({x:MKC.x+Math.cos(a)*(MKR+40),y:MKC.y+Math.sin(a)*(MKR+40),r:0,k:'mtow',ht:150,hw:50,ns:1,nc:1,v:i})}
  /* แผงตลาด (เพิ่มตามระดับค่าย) */
  const S=[];for(const[dx,dy]of[[0,-1],[1,0],[0,1],[-1,0]])for(let r=430;r<=880;r+=125)for(const s of[-1,1])S.push([MKC.x+dx*r-dy*s*108,MKC.y+dy*r+dx*s*108]);for(let i=0;i<8;i++){const a=i*Math.PI/4+Math.PI/8;S.push([MKC.x+Math.cos(a)*345,MKC.y+Math.sin(a)*345])}
  let lv=0;try{lv=cmpTot()|0}catch(e){}const ns=Math.min(S.length,12+Math.round(lv*1.2));S.map((p,i)=>[p,i]).sort((a,b)=>mktD(a[0][0],a[0][1])-mktD(b[0][0],b[0][1])).slice(0,ns).forEach(([[x,y],i])=>P(x,y,24,'mstall',{ht:70,hw:30,v:(i*5)%6,si:i}));
  P(1880,1640,30,'meda',{ht:90,hw:40});trees.push({x:1360,y:1660,r:0,k:'mhed',ht:60,ns:1,nc:1});
  MKLAN.forEach(([x,y],i)=>trees.push({x,y,r:10,k:'mlant',li:i,ht:110}));
  P(MKC.x,MKC.y,62,'mfount',{ht:90,hw:40,ns:1});P(1600,2070,40,'mstage',{ht:110,hw:120,fw:120});
  trees.push({x:1600,y:250,r:0,k:'mgate',ht:230,hw:160,ns:1,nc:1});
  for(let i=0;i<14;i++){const a=R()*6.283,r=420+R()*440;const x=MKC.x+Math.cos(a)*r,y=MKC.y+Math.sin(a)*r;if(!offAve(a))continue;P(x,y,14,'bcrate',{ht:40,v:i%2})}
  {MKT.cl=[];for(let i=0;i<120;i++)MKT.cl.push([R()*3200,R()*3200,60+R()*110,R()]);MKT.ns=(M.nests||[]).map(([x,y],i)=>({x,y}))}
  MKT.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.k==='mtow'||t.k==='mgate'||t.k==='mhed')return;MKT.dec.push({k:'ao',b:[t.x-80,t.y-30,t.x+80,t.y+40],x:t.x,y:t.y,r:t.r,w:t.hw||0})})}
function mktPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sk=c.createLinearGradient(0,0,0,3200);sk.addColorStop(0,'#7aa8e0');sk.addColorStop(.6,'#c8d8f0');sk.addColorStop(1,'#f4dcc0');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  for(const cl of MKT.cl){const r=cl[2]*1.6;if(cl[0]+r<ox||cl[0]-r>X1||cl[1]+r<oy||cl[1]-r>Y1)continue;brgCloud(c,cl)}
  const disk=(cc,dx,dy,gr)=>{cc.beginPath();cc.arc(MKC.x+(dx||0),MKC.y+(dy||0),MKR+(gr||0),0,6.2832);cc.rect(MKGATE[0]-40+(dx||0),MKGATE[1]-60+(dy||0),MKGATE[2]-MKGATE[0]+80,MKGATE[3]-MKGATE[1]+60)};
  c.fillStyle='rgba(60,50,80,.18)';disk(c,40,90,40);c.fill();c.fillStyle='#7a6e5c';disk(c,0,24,60);c.fill();c.fillStyle='#9a8e7a';disk(c,0,0,64);c.fill();
  c.save();disk(c,0,0,0);c.clip();c.fillStyle='#c9bea8';c.fillRect(ox,oy,S,S);
  palGrid(ox,oy,X1,Y1,28,18,1,(x,y,i,j)=>{const h=palH(i,j,31),v=176+h*30|0;c.fillStyle='rgb('+v+','+(v-8)+','+(v-26)+')';c.beginPath();c.roundRect(x+1.5,y+1.5,25,15,4);c.fill()});
  /* ถนนใหญ่ 4 สาย + ถนนวงแหวน */
  c.fillStyle='rgba(236,228,210,.85)';c.fillRect(1520,0,160,MKC.y);c.fillRect(1520,MKC.y,160,1600);c.fillRect(0,MKC.y-80,MKC.x,160);c.fillRect(MKC.x,MKC.y-80,1600,160);
  c.strokeStyle='rgba(236,228,210,.85)';c.lineWidth=140;c.beginPath();c.arc(MKC.x,MKC.y,640,0,7);c.stroke();
  c.strokeStyle='rgba(150,136,110,.45)';c.lineWidth=1.2;for(let y=Math.floor(oy/40)*40;y<Y1;y+=40){c.beginPath();c.moveTo(1520,y);c.lineTo(1680,y);c.stroke()}for(let x=Math.floor(ox/40)*40;x<X1;x+=40){c.beginPath();c.moveTo(x,MKC.y-80);c.lineTo(x,MKC.y+80);c.stroke()}
  for(let i=0;i<120;i++){const a=i/120*6.283;c.beginPath();c.moveTo(MKC.x+Math.cos(a)*570,MKC.y+Math.sin(a)*570);c.lineTo(MKC.x+Math.cos(a)*710,MKC.y+Math.sin(a)*710);c.stroke()}
  c.strokeStyle='rgba(120,104,80,.5)';c.lineWidth=2.4;for(const rr of[570,710]){c.beginPath();c.arc(MKC.x,MKC.y,rr,0,7);c.stroke()}c.beginPath();for(const x of[1520,1680]){c.moveTo(x,0);c.lineTo(x,3200)}for(const y of[MKC.y-80,MKC.y+80]){c.moveTo(0,y);c.lineTo(3200,y)}c.stroke();
  /* ลานน้ำพุ: โมเสกดาวอัสตรา */
  {const x=MKC.x,y=MKC.y;c.fillStyle='#e8dcc0';c.beginPath();c.arc(x,y,380,0,7);c.fill();for(let k=0;k<6;k++){c.strokeStyle=k%2?'rgba(42,74,154,.35)':'rgba(200,150,60,.5)';c.lineWidth=k%2?6:3;c.beginPath();c.arc(x,y,370-k*48,0,7);c.stroke()}
    c.fillStyle='rgba(42,74,154,.28)';PST(c,x,y,300,120,8,Math.PI/8);c.fill();c.fillStyle='rgba(216,170,70,.45)';PST(c,x,y,240,90,8,0);c.fill();
    c.strokeStyle='rgba(120,100,70,.25)';c.lineWidth=1;for(let i=0;i<48;i++){const a=i/48*6.283;c.beginPath();c.moveTo(x+Math.cos(a)*110,y+Math.sin(a)*110);c.lineTo(x+Math.cos(a)*370,y+Math.sin(a)*370);c.stroke()}}
  /* ซอยร้างรอบนอก */
  {const gr=c.createRadialGradient(MKC.x,MKC.y,860,MKC.x,MKC.y,MKR);gr.addColorStop(0,'rgba(50,40,30,0)');gr.addColorStop(.25,'rgba(50,40,30,.32)');gr.addColorStop(1,'rgba(40,30,40,.5)');c.fillStyle=gr;c.fillRect(ox,oy,S,S);
    const Rr=gxRng(Math.floor(ox/S)*31+Math.floor(oy/S)*7+5);for(let i=0;i<14;i++){const x=ox+Rr()*S,y=oy+Rr()*S,d=mktD(x,y);if(d<920||d>MKR-10)continue;if(Rr()<.5){c.fillStyle='rgba(70,100,50,'+(.2+Rr()*.2)+')';c.beginPath();c.ellipse(x,y,20+Rr()*30,10+Rr()*16,Rr()*3,0,7);c.fill()}else{c.strokeStyle='rgba(40,30,24,.5)';c.lineWidth=1.4;c.beginPath();c.moveTo(x,y);let px=x,py=y;for(let k=0;k<5;k++){px+=(Rr()-.5)*40;py+=(Rr()-.5)*40;c.lineTo(px,py)}c.stroke()}}}
  for(const d of MKT.dec){const b=d.b;if(b[0]<X1&&b[2]>ox&&b[1]<Y1&&b[3]>oy){c.save();try{PALD.ao(c,d,ox,oy,X1,Y1)}catch(e){}c.restore()}}
  c.restore();
  /* กำแพงเมืองเก่า (มีช่วงพังให้เห็นฟ้า) */
  const wall=(a0,a1)=>{c.beginPath();c.arc(MKC.x,MKC.y,MKR+32,a0,a1);c.strokeStyle='#6a6050';c.lineWidth=56;c.stroke();c.strokeStyle='#a89c86';c.lineWidth=44;c.stroke();c.strokeStyle='rgba(60,50,40,.45)';c.lineWidth=2;c.beginPath();c.arc(MKC.x,MKC.y,MKR+12,a0,a1);c.stroke();
    const n=Math.round((a1-a0)*(MKR+54)/24);c.fillStyle='#b8ac94';for(let i=0;i<n;i+=2){const a=a0+(i+.5)/n*(a1-a0);c.save();c.translate(MKC.x+Math.cos(a)*(MKR+52),MKC.y+Math.sin(a)*(MKR+52));c.rotate(a);c.fillRect(-6,-10,12,20);c.restore()}};
  wall(-1.46,.95);wall(1.3,1.85);wall(2.25,4.62);
  c.fillStyle='#9a8e7a';for(const[a0,a1]of[[.95,1.3],[1.85,2.25]]){for(let i=0;i<8;i++){const a=a0+(a1-a0)*(i+.5)/8,rr=MKR+20+((i*37)%30);c.beginPath();c.ellipse(MKC.x+Math.cos(a)*rr,MKC.y+Math.sin(a)*rr,14+(i%3)*6,9,a,0,7);c.fill()}}
  c.fillStyle='#d8ccb0';c.fillRect(MKGATE[0],MKGATE[1]-20,MKGATE[2]-MKGATE[0],MKGATE[3]-MKGATE[1]+20)}
/* ---------- ชั้นพื้นที่ขยับได้ ---------- */
function mktGroundFx(){const T=performance.now()/1000,Q=LOWQ,fest=p6Past('p6fs'),sab=p6From('p6sab')&&!p6From('p6fs');let lv=0;try{lv=cmpTot()|0}catch(e){}g.save();
  for(let i=0;i<(Q?3:7);i++){const cx=((i*733+T*(10+i%3*4))%3800+3800)%3800-300,cy=(i*977+120)%3200,r=90+(i%4)*30;if(!palVis(cx,cy,r*2)||mktD(cx,cy)<MKR+r)continue;g.globalAlpha=.3;try{g.drawImage(plxCloud(),cx-r*1.5,cy-r*.75,r*3,r*1.5)}catch(e){}g.globalAlpha=1}
  /* ชาวตลาดเดินไปมา (ยิ่งพัฒนาค่าย ยิ่งคึกคัก) */
  {const C=['#7a4a3a','#3a5a7a','#6a6a3a','#7a3a6a','#4a6a4a','#8a6a3a','#e0d8c8','#5a7ab0'],H=['#3a2414','#d8b060','#1a1a1a','#8a4a2a','#c8c8c8'],n=Math.min(Q?10:30,(sab?4:8)+lv);
    for(let i=0;i<n;i++){let x,y,f;if(i%3===0){const a=T*(.025+(i%4)*.006)*(i%2?1:-1)+i*1.7,r=620+((i*13)%60);x=MKC.x+Math.cos(a)*r;y=MKC.y+Math.sin(a)*r;f=Math.cos(a+(i%2?1.57:-1.57))>0?1:-1}
      else{const av=i%4,q=((T*(14+i%5*3)+i*170)%920)/460,u=q<1?q:2-q,r=420+u*440,lat=((i*29)%70)-35;const D=[[0,-1],[1,0],[0,1],[-1,0]][av];x=MKC.x+D[0]*r-D[1]*lat;y=MKC.y+D[1]*r+D[0]*lat;f=(q<1?1:-1)*(D[0]||1)}
      if(!palVis(x,y,30))continue;campFolk(x,y,{c:C[i%8],hair:H[i%5],hat:i%6===0?'#8a5a2a':null,f,k:i,run:1,s:1.1},T)}}
  if(fest){for(let i=0;i<(Q?6:10);i++){const a=T*.4+i*.628,r=190+Math.sin(T*2+i)*16,x=MKC.x+Math.cos(a)*r,y=MKC.y+Math.sin(a)*r*.8;if(!palVis(x,y,30))continue;campFolk(x,y-Math.abs(Math.sin(T*6+i))*4,{c:['#c83a3a','#3a5a9a','#d8a040','#7a3a8a','#3a8a5a'][i%5],hair:'#3a2414',f:Math.sin(a)>0?-1:1,k:i,run:1,s:1.1,arm:Math.sin(T*8+i)*1.2},T)}}
  /* ควันจากแผงที่ถูกเผา */
  if(sab)for(const t of trees){if(t.k!=='mstall'||t.si%3)continue;if(!palVis(t.x,t.y,80))continue;for(let k=0;k<3;k++){const q=(T*.3+k/3+t.si*.1)%1;g.fillStyle='rgba(70,64,60,'+(.35*(1-q))+')';g.beginPath();g.arc(t.x+Math.sin(T+k+t.si)*8,t.y-50-q*80,8+q*16,0,7);g.fill()}}
  /* ภาพชอล์กของทิล */
  if(gP6c2()&&palVis(MKC.x,MKC.y,400)){const x=MKC.x,y=MKC.y+230;g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=2;g.beginPath();g.ellipse(x,y,110,34,0,0,7);g.stroke();
    for(const[dx,w,h]of[[-70,14,60],[-40,20,90],[-8,26,120],[26,18,80],[56,14,56],[84,10,40]]){g.beginPath();g.moveTo(x+dx-w/2,y-10);g.lineTo(x+dx-w/2,y-10+h);g.lineTo(x+dx,y-10+h+w*1.3);g.lineTo(x+dx+w/2,y-10+h);g.lineTo(x+dx+w/2,y-10);g.stroke()}
    g.beginPath();g.moveTo(x-12,y+150);g.quadraticCurveTo(x-16,y+170,x-24,y+178);g.lineTo(x+24,y+178);g.quadraticCurveTo(x+16,y+170,x+12,y+150);g.closePath();g.stroke();g.font='12px serif';g.fillStyle='rgba(255,255,255,.7)';g.textAlign='center';g.fillText('ᛟ ᚨᚱᚢᚾ ᛃᚨ ᛟ',x,y-50)}
  g.globalCompositeOperation='lighter';
  /* รังเงาในซอยร้าง */
  (MAPS[curMap].nests||[]).forEach(([x,y],i)=>{if(!palVis(x,y,90))return;const pu=.5+.5*Math.sin(T*1.6+i);glowAt(x,y,56,'150,70,200',.14+.14*pu);g.globalCompositeOperation='source-over';g.fillStyle='rgba(16,6,24,.8)';g.beginPath();g.ellipse(x,y,22,12,0,0,7);g.fill();g.strokeStyle='rgba(16,6,24,.8)';g.lineCap='round';g.lineWidth=4;for(let k=0;k<5;k++){const a=k*1.26+i,L=34+12*Math.sin(T*1.4+k);g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a+.6)*L*.6,y+Math.sin(a+.6)*L*.4,x+Math.cos(a)*L,y+Math.sin(a)*L*.7);g.stroke()}g.globalCompositeOperation='lighter';glowAt(x-5,y-2,3,'255,170,80',.9);glowAt(x+5,y-2,3,'255,170,80',.9)});
  /* ร่องรอยที่ต้องสืบ */
  if(p6At('p6sab')&&me.sty&&me.sty.a===1)MKCLUE.forEach((L,i)=>{if((me.sty.p6cl|0)>>i&1||!palVis(L.x,L.y,60))return;const pu=.6+.4*Math.sin(T*3+i);glowAt(L.x,L.y,30,'255,210,120',.45*pu);g.globalCompositeOperation='source-over';g.font='18px system-ui';g.textAlign='center';g.fillText('🔍',L.x,L.y-18+Math.sin(T*2+i)*4);g.strokeStyle='rgba(255,210,120,'+(.5+.3*pu)+')';g.lineWidth=1.6;g.setLineDash([6,4]);g.lineDashOffset=-T*12;g.beginPath();g.ellipse(L.x,L.y,26,10,0,0,7);g.stroke();g.setLineDash([]);g.globalCompositeOperation='lighter'});
  g.restore()}
/* ชั้นบน: ธงราว + โคมแขวนข้ามถนน + เงาดับโคม */
function mktTop(){if(curMap!==31||isDg())return;const T=performance.now()/1000,fest=p6Past('p6fs');g.save();
  const str=(x0,y0,x1,y1,sag,k)=>{if(!palVis((x0+x1)/2,(y0+y1)/2,Math.abs(x1-x0)/2+Math.abs(y1-y0)/2+60))return;const mx=(x0+x1)/2,my=(y0+y1)/2-60+sag;g.strokeStyle='rgba(60,40,24,.7)';g.lineWidth=1.2;g.beginPath();g.moveTo(x0,y0-60);g.quadraticCurveTo(mx,my,x1,y1-60);g.stroke();
    const n=9;for(let i=1;i<n;i++){const u=i/n,px=(1-u)*(1-u)*x0+2*u*(1-u)*mx+u*u*x1,py=(1-u)*(1-u)*(y0-60)+2*u*(1-u)*my+u*u*(y1-60);if(i%2&&fest){g.fillStyle='#c84a2a';g.beginPath();g.ellipse(px,py+7,5,7,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(px,py+7,14,'255,190,110',.5+.15*Math.sin(T*3+i+k));g.restore()}
      else{g.fillStyle=['#c83a3a','#3a5a9a','#e0b050','#3a8a5a','#7a3a8a'][(i+k)%5];g.beginPath();g.moveTo(px-5,py);g.lineTo(px+5,py);g.lineTo(px+Math.sin(T*2+i)*1.5,py+11);g.closePath();g.fill()}}};
  for(let r=460;r<=900;r+=150){str(1505,MKC.y-r,1695,MKC.y-r,20,r);str(1505,MKC.y+r,1695,MKC.y+r,20,r+1);str(MKC.x+r,MKC.y-95,MKC.x+r,MKC.y+95,8,r+2);str(MKC.x-r,MKC.y-95,MKC.x-r,MKC.y+95,8,r+3)}
  if(fest)for(let i=0;i<8;i++){const a=i/8*6.283+T*.05;str(MKC.x+Math.cos(a)*120,MKC.y+Math.sin(a)*120,MKC.x+Math.cos(a)*380,MKC.y+Math.sin(a)*380,30,i+9)}
  if(fest&&!LOWQ){g.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const q=(T*.04+i/10)%1,x=MKC.x+Math.sin(i*2.3)*300+Math.sin(T*.5+i)*20,y=MKC.y+200-q*900;if(!palVis(x,y,30))continue;glowAt(x,y,16,'255,170,90',.6*Math.sin(q*3.14));g.globalCompositeOperation='source-over';g.fillStyle='rgba(230,120,60,'+(.9*Math.sin(q*3.14))+')';g.beginPath();g.ellipse(x,y,5,7,0,0,7);g.fill();g.globalCompositeOperation='lighter'}}
  /* เงาที่บินมาดับโคม */
  g.globalCompositeOperation='source-over';for(const w of MKF.wis){if(!palVis(w.x,w.y,60))continue;for(let k=0;k<6;k++){g.fillStyle='rgba(20,8,30,'+(.5-k*.07)+')';g.beginPath();g.arc(w.x-w.vx*k*.05,w.y-w.vy*k*.05-k*2,12-k*1.4,0,7);g.fill()}g.save();g.globalCompositeOperation='lighter';glowAt(w.x-4,w.y-3,3,'255,150,80',1);glowAt(w.x+4,w.y-3,3,'255,150,80',1);glowAt(w.x,w.y,30,'150,60,210',.3);g.restore();
    g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(20,8,30,.8)';g.strokeText('เดินชนเพื่อไล่!',w.x,w.y-22);g.fillStyle='#f0c8ff';g.fillText('เดินชนเพื่อไล่!',w.x,w.y-22)}
  g.restore()}
function mktTick(dt,now,x,y,mv){const st=stCur(),q=me.sty;
  {const H=MAPS[31].npc2,show=p6From('p6hd')&&!(q&&q.p6h===1);H.x=show?1360:-9999;H.y=show?1660:-9999}
  if(!st||!q||q.a!==1)return;
  if(st.p6sab){MKCLUE.forEach((L,i)=>{if((q.p6cl|0)>>i&1||Math.hypot(x-L.x,y-L.y)>52)return;q.p6cl=(q.p6cl|0)|(1<<i);let n=0;for(let k=0;k<5;k++)if(q.p6cl>>k&1)n++;q.n=n;PALG.card={h:'🔍 ร่องรอย '+n+'/'+MKCLUE.length,t:L.t,s:now,d:8};try{sfx('lg_get')}catch(e){}try{burst(L.x,L.y-10,['#ffe0a0','#ffffff'],18,80,.7,{glow:1,g:-30})}catch(e){}try{stHud()}catch(e){}try{writeSave()}catch(e){}})}
  if(st.p6fs){if((q.n|0)>=8&&!MKF.on)return;if(!MKF.on){MKF.on=1;MKF.t=150;MKF.lit=MKLAN.map(()=>0);MKF.wis=[];MKF.nx=10;q.n=0;banner={s:'🏮 จุดโคมเทศกาลให้ครบ 8 ดวงภายใน 150 วิ · ระวังเงาที่บินมาดับโคม!',t:5}}
    MKF.t-=dt;MKLAN.forEach(([lx,ly],i)=>{if(MKF.lit[i]||Math.hypot(x-lx,y-ly)>56)return;MKF.lit[i]=1;try{sfx('click')}catch(e){}try{burst(lx,ly-80,['#ffd090','#ffffff','#ff9050'],20,90,.7,{glow:1,g:-40})}catch(e){}});
    MKF.nx-=dt;if(MKF.nx<=0){MKF.nx=Math.max(5,9-MKF.lit.filter(v=>v).length*.4);const L=MKF.lit.map((v,i)=>v?i:-1).filter(i=>i>=0);if(L.length>=2){const ti=L[Math.random()*L.length|0],a=Math.random()*6.283;MKF.wis.push({x:MKC.x+Math.cos(a)*1000,y:MKC.y+Math.sin(a)*1000,ti,vx:0,vy:0});dn.push({x:MKLAN[ti][0],y:MKLAN[ti][1]-120,v:'🌑 เงากำลังบินมาดับโคม!',t:1.6})}}
    MKF.wis=MKF.wis.filter(w=>{const[tx,ty]=MKLAN[w.ti],ty2=ty-80,dx=tx-w.x,dy=ty2-w.y,d=Math.hypot(dx,dy);w.vx=dx/d*110;w.vy=dy/d*110;w.x+=w.vx*dt;w.y+=w.vy*dt;
      if(Math.hypot(x-w.x,y-(w.y+40))<60){try{sfx('ek_shatter')}catch(e){}try{burst(w.x,w.y,['#c8a0ff','#ffffff'],16,90,.6,{glow:1})}catch(e){}return false}
      if(d<14){if(MKF.lit[w.ti]){MKF.lit[w.ti]=0;dn.push({x:tx,y:ty-110,v:'💨 โคมดับ!',t:1.4})}return false}return true});
    q.n=MKF.lit.filter(v=>v).length;
    if(q.n>=8){MKF.on=0;MKF.wis=[]}else if(MKF.t<=0){MKF.t=150;MKF.lit=MKLAN.map(()=>0);MKF.wis=[];banner={s:'⏱ หมดเวลา… ลมพัดโคมดับหมด เริ่มจุดใหม่อีกครั้ง',t:4}}}
  else if(MKF.on){MKF.on=0;MKF.wis=[]}}
function mktAqT(st){if(st.p6sab&&me.sty){let b=null,bd=1e9;MKCLUE.forEach((L,i)=>{if((me.sty.p6cl|0)>>i&1)return;const d=curMap===31?Math.hypot(me.x-L.x,me.y-L.y):i;if(d<bd){bd=d;b=L}});return b?{mp:31,act:'reach',x:b.x,y:b.y,lb:'ไปตามร่องรอย'}:null}
  if(st.p6fs){let b=null,bd=1e9;if(curMap===31)for(const w of MKF.wis){const d=Math.hypot(me.x-w.x,me.y-w.y-40);if(d<bd){bd=d;b={x:w.x,y:w.y+40}}}if(!b)MKLAN.forEach(([lx,ly],i)=>{if(MKF.lit[i])return;const d=curMap===31?Math.hypot(me.x-lx,me.y-ly):i;if(d<bd){bd=d;b={x:lx,y:ly+10}}});return b?{mp:31,act:'reach',x:b.x,y:b.y,lb:'ไปจุดโคม'}:null}return null}
/* ---------- ของตั้งในตลาด ---------- */
Object.assign(PALK,{
 mhouse(t,T){const x=t.x,y=t.y,v=t.v|0,w=[150,130,160,140,120][v],h=[78,70,86,74,66][v],rf=['#3a5a8a','#4a4a6a','#8a4a3a','#3a6a7a','#5a4a3a'][v];PALSH(x,y+4,w*.55,12,.3);
  const wg=g.createLinearGradient(x-w/2,0,x+w/2,0);wg.addColorStop(0,'#d8d0bc');wg.addColorStop(.5,'#f2ecdc');wg.addColorStop(1,'#cbc2ac');g.fillStyle=wg;g.fillRect(x-w/2,y-h,w,h);g.strokeStyle='#8a7a60';g.lineWidth=1.4;g.strokeRect(x-w/2,y-h,w,h);
  g.fillStyle='#b8ac94';g.fillRect(x-w/2,y-8,w,8);g.strokeStyle='rgba(110,90,60,.6)';g.lineWidth=3;g.beginPath();g.moveTo(x-w/2,y-h+18);g.lineTo(x+w/2,y-h+18);g.stroke();
  const nw=w>140?3:2;for(let i=0;i<nw;i++){const wx=x-w/2+(i+.5)*w/nw-(i===Math.floor(nw/2)&&nw===3?0:0);if(nw===3&&i===1){g.fillStyle='#4a3020';g.beginPath();g.moveTo(wx-11,y);g.lineTo(wx-11,y-30);g.arc(wx,y-30,11,Math.PI,0);g.lineTo(wx+11,y);g.closePath();g.fill();continue}
    g.fillStyle='#3a4a6a';g.fillRect(wx-9,y-h+28,18,22);g.fillStyle='rgba(255,210,140,'+(.55+.2*Math.sin(T*.7+x))+')';g.fillRect(wx-7,y-h+30,14,18);g.strokeStyle='#6a5a40';g.lineWidth=1.2;g.strokeRect(wx-9,y-h+28,18,22);g.beginPath();g.moveTo(wx,y-h+28);g.lineTo(wx,y-h+50);g.stroke();g.fillStyle='#8a6a40';g.fillRect(wx-11,y-h+50,22,3)}
  if(nw===2){g.fillStyle='#4a3020';g.fillRect(x-10,y-32,20,32)}
  g.fillStyle=rf;g.beginPath();g.moveTo(x-w/2-10,y-h+2);g.lineTo(x-w/2+16,y-h-48);g.lineTo(x+w/2-16,y-h-48);g.lineTo(x+w/2+10,y-h+2);g.closePath();g.fill();g.strokeStyle='rgba(20,20,30,.4)';g.lineWidth=1;for(let k=1;k<5;k++){const yy=y-h+2-k*10;g.beginPath();g.moveTo(x-w/2-10+k*5.2,yy);g.lineTo(x+w/2+10-k*5.2,yy);g.stroke()}
  g.fillStyle='rgba(255,255,255,.12)';g.beginPath();g.moveTo(x-w/2+16,y-h-48);g.lineTo(x,y-h-48);g.lineTo(x-w*.1,y-h+2);g.lineTo(x-w/2-10,y-h+2);g.closePath();g.fill();
  g.fillStyle='#8a7a68';g.fillRect(x+w*.22,y-h-62,14,22);if(!LOWQ){const q=(T*.25+x*.001)%1;g.fillStyle='rgba(220,220,220,'+(.3*(1-q))+')';g.beginPath();g.arc(x+w*.22+7+Math.sin(T+x)*4,y-h-70-q*40,6+q*8,0,7);g.fill()}
  if(v%2===0){g.fillStyle='#4a7a3a';for(let i=0;i<4;i++){g.beginPath();g.arc(x-w/2+12+i*8,y-h+54+Math.sin(i)*3,5,0,7);g.fill()}g.fillStyle='#e85a6a';g.beginPath();g.arc(x-w/2+16,y-h+52,2.4,0,7);g.arc(x-w/2+30,y-h+55,2.4,0,7);g.fill()}},
 mruin(t,T){const x=t.x,y=t.y,v=t.v|0,w=120+v*12,h=52+v*6;PALSH(x,y+4,w*.5,10,.35);g.fillStyle='#a49a86';g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x-w/2,y-h);g.lineTo(x-w/2+20,y-h+8);g.lineTo(x-w/2+36,y-h-14);g.lineTo(x-4,y-h+12);g.lineTo(x+18,y-h-6);g.lineTo(x+w/2-14,y-h+20);g.lineTo(x+w/2,y-h+10);g.lineTo(x+w/2,y);g.closePath();g.fill();g.strokeStyle='#5a5040';g.lineWidth=1.4;g.stroke();
  g.fillStyle='#2a2420';g.fillRect(x-w/2+18,y-h+24,16,20);g.fillRect(x+w/2-34,y-h+30,14,18);g.beginPath();g.moveTo(x-8,y);g.lineTo(x-8,y-26);g.lineTo(x+8,y-30);g.lineTo(x+10,y);g.closePath();g.fill();
  g.strokeStyle='rgba(60,90,40,.8)';g.lineWidth=2;for(let i=0;i<4;i++){g.beginPath();g.moveTo(x-w/2+10+i*w/4,y-h+6);g.quadraticCurveTo(x-w/2+14+i*w/4,y-h+30,x-w/2+8+i*w/4,y-h+50);g.stroke()}
  g.fillStyle='#8a806c';for(let i=0;i<5;i++){g.beginPath();g.ellipse(x-w/2+10+i*w/5,y+4+(i%2)*4,10,6,0,0,7);g.fill()}
  if(!LOWQ){g.strokeStyle='rgba(230,230,230,.35)';g.lineWidth=.8;g.beginPath();for(let k=0;k<4;k++){g.moveTo(x+w/2-34,y-h+30);g.lineTo(x+w/2-34+Math.cos(k*.8)*14,y-h+30+Math.sin(k*.8)*14)}g.stroke()}},
 mrub(t,T){const x=t.x,y=t.y;PALSH(x,y+3,30,8);for(let i=0;i<7;i++){g.fillStyle=i%2?'#9a8e78':'#b4a890';g.beginPath();g.ellipse(x-22+(i*13)%46,y-((i*7)%18),12-(i%3)*2,8,i,0,7);g.fill();g.strokeStyle='#5a5040';g.lineWidth=1;g.stroke()}g.fillStyle='#6a5a40';g.fillRect(x-30,y-22,40,5)},
 mtow(t,T){const x=t.x,y=t.y;PALSH(x,y+6,40,12,.35);const tg=g.createLinearGradient(x-30,0,x+30,0);tg.addColorStop(0,'#8a8070');tg.addColorStop(.5,'#c8bca4');tg.addColorStop(1,'#7a7060');g.fillStyle=tg;g.fillRect(x-30,y-110,60,110);g.strokeStyle='#4a4234';g.lineWidth=1.4;g.strokeRect(x-30,y-110,60,110);
  g.fillStyle='#a89c86';for(let i=0;i<4;i++)g.fillRect(x-34+i*18,y-124,12,16);g.fillStyle='#2a2420';g.fillRect(x-5,y-80,10,18);g.fillStyle='#2a4a9a';g.fillRect(x-1,y-150,2,28);g.beginPath();g.moveTo(x+1,y-150);g.lineTo(x+20+Math.sin(T*2+t.v)*3,y-144);g.lineTo(x+1,y-138);g.closePath();g.fill()},
 mstall(t,T){const x=t.x,y=t.y,v=t.v|0,burnt=p6From('p6sab')&&!p6From('p6fs')&&(t.si%3===0),C=[['#c83a3a','#f4e8d0'],['#3a5a9a','#f4e8d0'],['#d8a040','#fff4dc'],['#3a8a5a','#f4e8d0'],['#7a3a8a','#f4e8d0'],['#d86a2a','#fff0e0']][v];PALSH(x,y+3,28,7);
  g.fillStyle='#6a4a2a';g.fillRect(x-24,y-20,48,20);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(x-24,y-20,48,20);g.fillStyle='#4a3020';g.fillRect(x-27,y-56,3,56);g.fillRect(x+24,y-56,3,56);
  if(burnt){g.fillStyle='#2a2420';g.beginPath();g.moveTo(x-30,y-56);g.lineTo(x-10,y-60);g.lineTo(x-4,y-48);g.lineTo(x+14,y-58);g.lineTo(x+30,y-52);g.lineTo(x+22,y-44);g.lineTo(x-24,y-46);g.closePath();g.fill();g.fillStyle='#4a4038';for(let i=0;i<5;i++){g.beginPath();g.ellipse(x-30+i*14,y+6+(i%2)*4,6,3,0,0,7);g.fill()}return}
  for(let i=0;i<6;i++){g.fillStyle=i%2?C[0][1]:C[0][0];g.beginPath();g.moveTo(x-30+i*10,y-56);g.lineTo(x-20+i*10,y-56);g.lineTo(x-20+i*10,y-46+Math.sin(T*2+i+x)*.8);g.quadraticCurveTo(x-25+i*10,y-41,x-30+i*10,y-46);g.closePath();g.fill()}g.fillStyle=C[0][0];g.fillRect(x-31,y-60,62,5);
  const G=[['#d84a3a','#e8a040','#7ab040'],['#e8c860','#c89040','#a06030'],['#5a7ab0','#c8a8e0','#e8e0d0'],['#8a6a4a','#b08a5a','#d8c8a8'],['#c8b8e8','#e8d0a0','#a0c8e8'],['#ffd090','#ff9a50','#e8e0c0']][v];
  for(let i=0;i<5;i++){g.fillStyle=G[i%3];g.beginPath();if(v===2||v===4)g.fillRect(x-20+i*8,y-30,6,10);else g.arc(x-16+i*8,y-24,4.5,0,7);g.fill()}
  if(v===5){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-30,20,'255,190,110',.35);g.restore()}},
 meda(t,T){const x=t.x,y=t.y;PALSH(x,y+3,46,9);g.fillStyle='#5a3a20';g.fillRect(x-40,y-90,4,90);g.fillRect(x+36,y-90,4,90);g.fillRect(x-44,y-94,88,6);
  for(let i=0;i<3;i++){const cx=x-26+i*26,sw=Math.sin(T*1.4+i)*2;g.fillStyle=['#8a2a2a','#2a3a6a','#6a4a1a'][i];g.beginPath();g.moveTo(cx-11,y-88);g.lineTo(cx+11,y-88);g.lineTo(cx+11+sw,y-34);g.lineTo(cx-11+sw,y-34);g.closePath();g.fill();
    g.strokeStyle='#e0b050';g.lineWidth=1.2;const gy=y-62;g.beginPath();g.arc(cx+sw*.5,gy,6,0,7);g.stroke();for(let k=0;k<8;k++){const a=k*.785;g.beginPath();g.moveTo(cx+sw*.5+Math.cos(a)*6,gy+Math.sin(a)*6);g.lineTo(cx+sw*.5+Math.cos(a)*9,gy+Math.sin(a)*9);g.stroke()}g.fillStyle='#e0b050';g.fillRect(cx-11+sw,y-38,22,2)}
  g.fillStyle='#6a4a2a';g.fillRect(x-40,y-24,80,24);g.strokeStyle='#3a2414';g.lineWidth=1.2;g.strokeRect(x-40,y-24,80,24);for(let i=0;i<4;i++){g.fillStyle=['#c84a3a','#e0b050','#3a5a9a','#5a8a4a'][i];g.fillRect(x-34+i*18,y-32,14,8)}
  g.font='bold 9px system-ui';g.textAlign='center';g.fillStyle='#fff0d0';g.fillText('ผ้าทอยายเอดา',x,y-98)},
 mhed(t,T){const N=MAPS[31].npc2;if(!N||N.x<0)return;const f=me.x<N.x?-1:1;campFolk(N.x,N.y,{c:'#22305a',sh:'#d8b050',hair:'#d8d8d8',hat:'#141826',f,s:1.25,k:7,arm:-.2},T);g.strokeStyle='#2a1a10';g.lineWidth=2;g.beginPath();g.moveTo(N.x-f*8,N.y-2);g.lineTo(N.x-f*11,N.y+14);g.stroke();g.fillStyle='#e0b050';g.beginPath();g.arc(N.x-f*8,N.y-3,2,0,7);g.fill();
  g.font='11px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText(N.n,N.x,N.y-36)},
 mlant(t,T){const x=t.x,y=t.y,i=t.li,act=MKF.on,lit=act?MKF.lit[i]:p6Past('p6fs'),pu=.75+.25*Math.sin(T*3+i);PALSH(x,y+2,10,3);g.fillStyle='#3a3028';g.fillRect(x-2.5,y-96,5,96);g.fillRect(x-8,y-4,16,5);g.beginPath();g.moveTo(x,y-96);g.quadraticCurveTo(x+14,y-104,x+18,y-92);g.lineWidth=2.5;g.strokeStyle='#3a3028';g.stroke();
  const lx=x+18,ly=y-80+Math.sin(T*1.5+i)*1.2;g.fillStyle=lit?'#e85a3a':'#6a4a40';g.beginPath();g.ellipse(lx,ly,9,12,0,0,7);g.fill();g.strokeStyle='#3a2014';g.lineWidth=1;g.stroke();g.fillStyle='#2a1a10';g.fillRect(lx-4,ly-14,8,3);g.fillRect(lx-3,ly+11,6,3);
  if(lit){g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly,36,'255,170,90',.45*pu);glowAt(lx,ly,10,'255,230,180',.8);g.restore()}else if(act){g.font='bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,16,10,.85)';g.strokeText('🏮 จุดโคม',lx,ly-20);g.fillStyle='#ffd8a0';g.fillText('🏮 จุดโคม',lx,ly-20)}},
 mfount(t,T){const x=t.x,y=t.y;PALSH(x,y+10,80,22,.3);g.fillStyle='#a89c86';g.beginPath();g.ellipse(x,y,72,30,0,0,7);g.fill();g.fillStyle='#6a9ac8';g.beginPath();g.ellipse(x,y-4,62,24,0,0,7);g.fill();
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1.2;for(let k=0;k<3;k++){const q=(T*.5+k/3)%1;g.beginPath();g.ellipse(x,y-4,10+q*50,4+q*19,0,0,7);g.stroke()}
  g.fillStyle='#d8ccb0';g.fillRect(x-8,y-60,16,56);g.fillStyle='#e0b050';PST(g,x,y-72,16,6,8,T*.2);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(x,y-72,26,'255,220,150',.4);g.restore();
  g.strokeStyle='rgba(200,230,255,.85)';g.lineWidth=2;for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*6,y-52);g.quadraticCurveTo(x+s*30,y-66,x+s*40,y-10);g.stroke()}},
 mstage(t,T){const x=t.x,y=t.y,fest=p6Past('p6fs');PALSH(x,y+6,110,14,.35);g.fillStyle='#6a4a2a';g.fillRect(x-110,y-26,220,26);g.strokeStyle='#3a2414';g.lineWidth=1.4;g.strokeRect(x-110,y-26,220,26);for(let i=1;i<8;i++){g.beginPath();g.moveTo(x-110+i*27.5,y-26);g.lineTo(x-110+i*27.5,y);g.stroke()}
  g.fillStyle='#5a3a20';g.fillRect(x-112,y-110,6,84);g.fillRect(x+106,y-110,6,84);g.fillStyle='#8a2a3a';g.fillRect(x-116,y-116,232,12);for(const s of[-1,1]){g.beginPath();g.moveTo(x+s*106,y-104);g.quadraticCurveTo(x+s*80,y-70,x+s*100,y-30);g.lineTo(x+s*106,y-30);g.closePath();g.fill()}
  for(let i=0;i<10;i++){g.fillStyle=['#e0b050','#3a5a9a','#c83a3a'][i%3];g.beginPath();g.moveTo(x-104+i*21,y-104);g.lineTo(x-94+i*21,y-104);g.lineTo(x-99+i*21,y-94);g.closePath();g.fill()}
  if(fest)for(let i=0;i<3;i++)campFolk(x-50+i*50,y-30,{c:['#c83a3a','#3a5a9a','#d8a040'][i],hair:'#3a2414',f:1,k:i,s:1.1,arm:Math.sin(T*6+i)*.8,run:0},T)},
 mgate(t,T){const x=t.x,y=t.y;for(const s of[-1,1]){const tx=x+s*120,tg=g.createLinearGradient(tx-34,0,tx+34,0);tg.addColorStop(0,'#8a8070');tg.addColorStop(.5,'#d0c4ac');tg.addColorStop(1,'#7a7060');g.fillStyle=tg;g.fillRect(tx-34,y-170,68,170);g.strokeStyle='#4a4234';g.lineWidth=1.4;g.strokeRect(tx-34,y-170,68,170);g.fillStyle='#a89c86';for(let i=0;i<4;i++)g.fillRect(tx-38+i*20,y-184,14,16);g.fillStyle='#3a4a6a';g.fillRect(tx-6,y-130,12,20);
    g.fillStyle='#2a4a9a';g.fillRect(tx-14,y-100,28,50);g.fillStyle='#e0b050';PST(g,tx,y-76,8,3.2,5,0);g.fill()}
  g.fillStyle='#b8ac94';g.fillRect(x-86,y-160,172,30);g.strokeStyle='#4a4234';g.strokeRect(x-86,y-160,172,30);g.fillStyle='#3a3028';for(let i=0;i<9;i++)g.fillRect(x-80+i*20,y-130,3,18);
  g.font='bold 12px serif';g.textAlign='center';g.fillStyle='#4a3a20';g.fillText('วงแหวนล่าง',x,y-140);
  for(const s of[-1,1]){const lx=x+s*80,ly=y-118;g.fillStyle='#e85a3a';g.beginPath();g.ellipse(lx,ly,7,9,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly,24,'255,170,90',.5+.1*Math.sin(T*3+s));g.restore()}}});
/* ---------- เนื้อเรื่องภาค 6 บทที่ 2 ---------- */
Object.assign(SPK,{eda:['ยายเอดา · ช่างทอผ้าจากค่าย','🧶','#e8b0a0'],hed:['ลอร์ดเฮเดรียน · สภาเก่าแห่งอัสตรา','🎩','#a8b8e8']});STNPC.eda=[31,'npc'];STNPC.hed=[31,'npc2'];
STCH.push('ภาค 6 · บทที่ 2 · ตลาดสองฟ้า');
{const C7=STCH.length-1;STY.push(
 {c:C7,g:'talk',k:'qn',tx:'เข้าเฝ้าราชินีเอลิราในนครลอยฟ้า',
  pre:[['qn','ขบวนผู้อพยพทยอยขึ้นมาทุกวัน… ข้าตัดสินใจยกย่านวงแหวนล่างทางใต้ของนครให้พวกเขา ย่านนั้นถูกปิดร้างมาตั้งแต่สมัยโอเรียน'],
   ['qn','วันนี้เป็นวันตลาดแรก ผู้อพยพจะเปิดแผงขายของ ชาวเมืองบางคนก็อยากรู้ว่าคนจากแผ่นดินขายอะไร'],
   ['cas','แต่ไม่ใช่ทุกคนที่ยินดีพ่ะย่ะค่ะ ลอร์ดเฮเดรียนแห่งสภาเก่าคัดค้านในที่ประชุมทุกครั้ง เขาว่าคนจากแผ่นดินจะพาความวุ่นวายขึ้นมาด้วย'],
   ['qn','ข้าอยากให้เจ้าไปดูวันตลาดแรกด้วยตาตัวเอง… ทิลบอกว่ายายของเขามีแผงอยู่ที่นั่น'],
   ['me','(ประตูย่านวงแหวนล่างอยู่ทางตะวันตกเฉียงใต้ของนคร)']],rw:{g:80000}},
 {c:C7,g:'map',m:31,tx:'ไปย่านวงแหวนล่าง (ประตูโคมแดง ทางตะวันตกเฉียงใต้ของนคร)',
  post:[['nar','ประตูหินเก่าแขวนโคมแดงเรียงราย ข้างในคือถนนหินขาวของอัสตราที่ร้างมาสามร้อยปี… วันนี้เต็มไปด้วยแผงผ้าใบหลากสี เสียงเรียกลูกค้า และกลิ่นเครื่องเทศจากแผ่นดิน'],
   ['til','ท่านผู้นำ! ทางนี้ ๆ! ยายข้ามีแผงอยู่ข้างน้ำพุ ผ้าของยายสวยที่สุดในตลาดเลย!']]},
 {c:C7,g:'talk',k:'eda',tx:'ไปหายายเอดาที่แผงผ้าทอข้างน้ำพุ',
  pre:[['eda','อ้อ นี่หรือผู้นำแห่งรุ่งอรุณที่ทิลพูดถึงไม่หยุดปาก… มานั่งก่อนสิ ยายชงชาให้'],
   ['eda','ผ้าพวกนี้หรือ? ยายทอมาตั้งแต่สาว ลายนี้ลายเดียว ลายเฟืองตะวัน มือมันทอของมันเอง ยายไม่รู้หรอกว่าจำมาจากไหน แม่ของยายก็ทอลายนี้ ยายของยายก็เหมือนกัน'],
   ['til','แล้วยายก็ร้องเพลงกล่อมทุกคืน แต่มีท่อนหนึ่งที่ยายร้องไม่จบสักที!'],
   ['eda','ท่อนนั้นมันหายไปตั้งแต่รุ่นยายทวดแล้วลูก… "หลับเถิดลูก แสงของเราอยู่บนฟ้า…" แล้วก็จำไม่ได้อีก'],
   ['me','(ลายเฟืองตะวันบนผ้า… เหมือนตราบนเศษสำริดที่เจอบนสะพาน)']],
  post:[['nar','วันตลาดแรกผ่านไปอย่างคึกคัก ชาวเมืองหลายคนซื้อผ้าทอกลับบ้าน บางคนยังมองแผงผู้อพยพด้วยสายตาระแวง'],
   ['nar','…แต่เช้าวันรุ่งขึ้น เสียงร้องไห้ดังไปทั่วย่านวงแหวนล่าง']],rw:{g:40000}},
 {c:C7,g:'clue',m:31,n:5,p6sab:1,tx:'สืบหาร่องรอยคนพังตลาด',
  pre:[['eda','(ยายเอดายืนนิ่งท่ามกลางแผงที่ถูกพัง) แผงถูกพังไปครึ่งตลาด ผ้าถูกเผา… คนในเมืองพูดกันว่าพวกเราทำกันเอง แย่งที่ขายของกัน'],
   ['til','ไม่จริง! ไม่มีใครในค่ายทำแบบนี้!'],
   ['me','(ต้องหาหลักฐาน — ร่องรอยน่าจะยังอยู่ตามแผงที่ถูกพัง)']],
  post:[['me','(รองเท้าตอกตะปูเงิน · น้ำยาขัดเกราะ · เข็มกลัดหอคอยเงิน… ทั้งหมดชี้ไปที่กองรักษาการณ์ของสภาเก่า — คนของลอร์ดเฮเดรียน)'],
   ['me','(แต่เถ้าดำที่เย็นเฉียบนั่น… ไม่ใช่ฝีมือคน)'],
   ['til','ท่านผู้นำ… เมื่อคืนข้าเห็นเงาวิ่งเข้าไปในซอยร้างรอบนอก ตัวมันใหญ่กว่าบนสะพานอีก']],rw:{g:50000}},
 {c:C7,g:'kill',m:31,n:40,tx:'กวาดเงาในซอยร้างวงแหวนล่าง',
  pre:[['eda','ซอยร้างพวกนั้นไม่มีใครเข้าไปมาสามร้อยปีแล้ว ระวังตัวด้วยนะ']],
  post:[['nar','ลึกเข้าไปในซอยร้าง ทหารสภาเก่าสองคนถูกเงาไล่ต้อนจนมุมอยู่ในซากบ้าน หน้าซีดเป็นไก่ต้ม'],
   ['nar','«ท่านลอร์ดสั่งให้พวกเราพังแผงให้ดูเหมือนผู้อพยพทะเลาะกันเอง… แต่เงาพวกนั้นไม่ได้มากับเรา! มันตามกลิ่นผ้าทอมา มันพึมพำว่ากลับบ้าน ๆ…»'],
   ['me','(ลอร์ดเฮเดรียนกำลังมาที่ลานน้ำพุ — ไปเผชิญหน้ากับเขา)']]},
 {c:C7,g:'talk',k:'hed',p6hd:1,tx:'เผชิญหน้าลอร์ดเฮเดรียนที่ลานน้ำพุ',
  pre:[['hed','ผู้นำแห่งรุ่งอรุณ… ข้ารู้ว่าเจ้ามาทำไม และข้าจะไม่ปฏิเสธ คนของข้าทำจริง ตามคำสั่งของข้า'],
   ['hed','เจ้าคิดว่าข้าเกลียดคนพวกนี้หรือ? ไม่ ข้ากลัว อัสตราลอยอยู่ได้มาสามร้อยปีเพราะประตูปิด แล้วดูสิ ประตูเปิดได้ไม่ถึงเดือน เงาก็ตามขึ้นมาถึงกลางเมืองแล้ว'],
   ['hed','ข้าแค่อยากให้ราชินีเห็นว่าการเปิดประตูมีราคา… ข้าไม่ได้คิดว่ามันจะมีราคาจริง ๆ'],
   ['eda','(ยายเอดาเดินเข้ามา ถือผ้าทอลายเฟืองตะวันผืนหนึ่ง) ท่านลอร์ด ผ้าผืนนี้ยายทอให้ท่าน ใครจะเกลียดเรา ยายก็จะทอให้']]},
 {c:C7,g:'fest',m:31,n:8,p6fs:1,tx:'จุดโคมเทศกาลสองฟ้าให้ครบ 8 ดวง',
  pre:[['eda','คืนนี้ตลาดจะจัดเทศกาลสองฟ้า ให้คนบนฟ้ากับคนจากแผ่นดินกินข้าวโต๊ะเดียวกัน ยายจะร้องเพลงกล่อมด้วย'],
   ['hed','ข้าส่งคนมาช่วยแขวนโคมแล้ว… ถือว่าเป็นคำขอโทษ',0,0,2],
   ['til','แต่ต้องจุดโคมใหญ่ 8 ดวงรอบตลาดให้ทันก่อนพระจันทร์ขึ้นนะ! แล้วเงาชอบมาดับโคม ท่านผู้นำต้องไล่มันด้วย!']],
  post:[['nar','โคมดวงสุดท้ายสว่างขึ้น ทั้งย่านวงแหวนล่างเรืองแสงสีส้มอุ่น เสียงพิณและกลองดังขึ้นจากเวที'],
   ['nar','ชาวเมืองอัสตราที่ยืนดูอยู่ห่าง ๆ เริ่มขยับเข้ามาใกล้… แล้วมีเด็กคนหนึ่งจากฝั่งเมืองวิ่งไปจับมือเด็กจากค่ายเข้าวงเต้นรำ']],rw:{g:60000,s3:5}},
 {c:C7,g:'talk',k:'eda',p6c2:1,cine:1,tx:'ร่วมเทศกาลสองฟ้ากับยายเอดา',
  pre:[['eda','ดูสิ… ยายไม่เคยคิดว่าจะได้เห็นวันแบบนี้ก่อนตาย'],
   ['hed','(ลอร์ดเฮเดรียนยืนข้างแผงผ้า สวมผ้าคลุมลายเฟืองตะวันที่ยายเอดาทอให้ อย่างเก้อ ๆ)',0,0,2],
   ['nar','กลางเสียงดนตรี ทิลลุกขึ้นยืนนิ่ง ดวงตาเหม่อลอย แล้วเดินออกไปกลางลานน้ำพุ… ราวกับเดินละเมอ'],
   ['til','ᛟ ᚨᚱᚢᚾ ᛃᚨ… ᚺᛖᛗ ᛞᚨᛚ… (ทิลพูดเป็นภาษาที่ไม่มีใครในเมืองเข้าใจ)'],
   ['nar','ยายเอดาลุกขึ้นช้า ๆ ริมฝีปากสั่น แล้วร้องเพลงกล่อมต่อจากทิล… เป็นท่อนที่หายไปตั้งแต่รุ่นยายทวด'],
   ['eda','«…หลับเถิดลูก แสงของเราอยู่บนฟ้า / วันหนึ่งประตูจะเปิด แล้วเราจะกลับบ้าน…»'],
   ['nar','ทิลคุกเข่าลง หยิบชอล์กขึ้นมาวาดบนพื้นลาน เส้นแล้วเส้นเล่า เป็นภาพเมืองที่หอคอยทุกต้นชี้ลงหาแผ่นดิน และระฆังใบใหญ่อยู่ใจกลาง'],
   ['hed','(เฮเดรียนหน้าซีด) ลายนั้น… ตัวอักษรนั้น… มันคือตราประจำตระกูลข้า ที่ปู่ทวดสั่งให้ลบออกจากทุกอย่าง… ตระกูลข้าก็มาจากที่นั่นหรือ',0,0,2],
   ['cas','(คาสเซียนเพิ่งมาถึง ก้มมองภาพชอล์ก) เมืองกลับหัวใต้เมฆ… อารัณยา',0,0,1],
   ['nar','แล้วเสียงระฆังก็ดังขึ้น ไม่ใช่จากใต้สะพาน แต่ดังขึ้นพร้อมกันทั่วทั้งเมือง ทุกโคมในตลาดสั่นไหว'],
   ['nar','ไกลออกไปบนสะพานรุ่งอรุณ แผ่นแสงใต้ลานพักกลางเมฆแยกออกช้า ๆ กลายเป็นบันไดทอดลงไปในทะเลเมฆ'],
   ['til','(ทิลตื่นขึ้น มองภาพที่ตัวเองวาด) …ข้าว่า มันกำลังเรียกพวกเราลงไป'],
   ['nar','🏮 — จบภาค 6 บทที่ 2 · ตลาดสองฟ้า — บทต่อไป: ใต้สะพาน · ซากอารัณยา (เร็ว ๆ นี้)']],rw:{g:200000,s3:10}})}
const P6H={1:[['me','(ตัดสินใจเปิดโปงลอร์ดเฮเดรียนต่อหน้าสภา)'],['nar','สภาลงมติเนรเทศลอร์ดเฮเดรียนออกจากอัสตรา ผู้อพยพได้รับความยุติธรรม แผงที่ถูกพังได้รับการชดเชยจากคลังหลวง'],['cas','ขุนนางคนอื่นเงียบลง… แต่ข้าเห็นสายตาพวกเขาในที่ประชุม ความกลัวไม่ได้หายไป มันแค่ซ่อนตัว'],['eda','ยายไม่ได้อยากให้ใครต้องถูกไล่ไปไหนหรอกลูก… แต่ก็ขอบใจนะ']],
  2:[['me','(ชวนลอร์ดเฮเดรียนเดินดูตลาดด้วยตาตัวเอง)'],['nar','เฮเดรียนเดินผ่านแผงทีละแผงช้า ๆ ช่างตีเหล็กจากค่าย เด็ก ๆ ที่ขายขนม แผงเครื่องเทศที่หอมไปทั้งซอย… จนมาหยุดที่ผ้าทอของยายเอดา'],['hed','(เขาจับผ้าทอนิ่งนาน) ลายนี้… ลายนี้ข้าเคยเห็นในหีบเก่าของตระกูล…'],['hed','…ข้าจะออกเงินซ่อมทุกแผงที่คนของข้าพัง และถ้าตลาดนี้ต้องการผู้อุปถัมภ์ในสภา ก็ให้เป็นข้า']]};
const stP6mk=()=>gP6c1();
function mktGateDraw(G){const t=performance.now()/1000;g.save();g.globalCompositeOperation='lighter';glowAt(G.x,G.y,60,'255,160,90',.22+.08*Math.sin(t*2));g.restore();g.save();for(const s of[-1,1]){const lx=G.x+s*36,ly=G.y-30+Math.sin(t*2+s)*1.5;g.fillStyle='#e85a3a';g.beginPath();g.ellipse(lx,ly,6,8,0,0,7);g.fill();g.save();g.globalCompositeOperation='lighter';glowAt(lx,ly,20,'255,170,90',.6);g.restore()}
  const lb='🏮 '+(G.nm||'');g.font='bold 11px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,16,10,.8)';g.strokeText(lb,G.x,G.y-46);g.fillStyle='#ffe0b0';g.fillText(lb,G.x,G.y-46);g.restore()}
function edaTea(){let lv=0;try{lv=cmpTot()|0}catch(e){}const T=[['🍵 ชาสะระแหน่ · เดินเร็ว +20% (5 นาที) · 20,000',1,'sp',20000,0],['🫖 ชาขิงอบอุ่น · รับดาเมจ −20% (5 นาที) · 40,000',2,'red',40000,10],['☕ ชาเครื่องเทศเฟืองตะวัน · ดาเมจ +20% (5 นาที) · 80,000',3,'dm',80000,20]];
  stSay([['eda','มานั่งพักก่อนลูก ชาของยายช่วยให้หายเหนื่อย ยิ่งค่ายของเราเจริญ ยายก็ยิ่งหาเครื่องเทศดี ๆ มาชงได้ (ระดับค่ายตอนนี้ '+lv+'/25)']],()=>{},{choice:T.map(t=>[lv>=t[4]?t[0]:'🔒 '+t[0].split(' · ')[0]+' (ค่ายระดับ '+t[4]+')',t[1]]).concat([['ไว้ก่อน',0]])});
  SD.onChoose=e=>{stClose();const t=T.find(x=>x[1]===e);if(!t)return;if(lv<t[4]){banner={s:'🔒 พัฒนาค่ายผู้อพยพให้ถึงระดับ '+t[4]+' ก่อนนะลูก',t:3};return}if(me.gold<t[3]){banner={s:'ทองไม่พอ',t:2};return}me.gold-=t[3];me.shrB={k:t[2],t:300};banner={s:'🍵 '+t[0].split(' · ')[0]+' — '+SHRB[t[2]][0]+' '+SHRB[t[2]][1]+' 5 นาที',t:4};try{sfx('coin')}catch(_){}}}
function mktNpc(sel){if(curMap!==31)return false;if(sel===1){if(!p6From('p6sab')||p6Past('p6c2')||!p6At('p6sab')){edaTea();return true}stSay([['eda','หลักฐานยังอยู่ตามแผงที่ถูกพังนะลูก']]);return true}
  if(sel===2){const h=me.sty&&me.sty.p6h;stSay([['hed',h===2?'ข้ายังไม่ชินกับเสียงอึกทึกนี่เท่าไหร่… แต่ข้าเริ่มชอบชาของยายเอดาแล้ว':'…']]);return true}return false}
setTimeout(()=>{try{
    MAPS[9].gates.push({x:1200,y:2045,to:31,req:1,p6m:1,mk:1,nm:'ย่านวงแหวนล่าง',arr:{x:1600,y:600}});
    const M7=MAPS[27];MAPS[31]=Object.assign({},M7,{n:'ย่านวงแหวนล่าง',sx:1600,sy:600,sr:110,seed:311,bg:'#c9bea8',tile:'#c9bea8',safe:'#e2d8c2',ring:'#c84a2a',t1:'#5a5040',t2:'#8a806c',d1:'#a89c86',d2:'#e8dcc0',bth:30,
      gates:[{x:1600,y:320,to:9,req:1,mk:1,nm:'นครลอยฟ้าอัสตรา',arr:{x:1215,y:2005}}],npc:{x:1880,y:1705,n:'ยายเอดา · แผงผ้าทอ',L:22},npc2:{x:-9999,y:-9999,n:'ลอร์ดเฮเดรียน'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e8d0ff',bar:'#7a4ac0',ln:'#fff0c0',rec:'',pos:''},mvpOnly:1,
      nests:[[2530,1300],[2620,1900],[2300,2560],[1900,2850],[1300,2850],[860,2600],[640,2050],[620,1400],[860,900],[2330,950]]});
    FIELDM[31]=1;BTR[31]='150,40,170';GLOWC[31]='255,200,150';FXST[31]='holy';try{BTC[31]=['#fff0d8','#c86a3a','#ffffff'];TIER[31]=[15.5,18,2.35];WRG[31]={2:{rg:270,cd:3,spd:230,dm:1.5,k:'bell',c:'255,190,120',big:1}}}catch(e){}}catch(e){console.warn('mkt map',e)}
  try{NPC3[31]={d:(x,y,f,t)=>{campFolk(x,y,{c:'#8a3a3a',sh:'#e0b050',hair:'#e8e8e8',f,s:1.2,k:4,sit:0,arm:Math.sin(t*1.2)*.3},t);g.fillStyle='#d8c8a8';g.beginPath();g.ellipse(x,y-24,7,3,0,0,7);g.fill()},s:['ชาร้อน ๆ ไหมลูก','ผ้าทอผืนนี้ทอสามวันสามคืนเชียวนะ','หลับเถิดลูก แสงของเราอยู่บนฟ้า…','ทิลไปวิ่งเล่นที่ไหนอีกแล้วนะ'],hy:44}}catch(e){}
  try{const _og=drawOneGate;window.drawOneGate=drawOneGate=function(G){if(G&&G.mk)return mktGateDraw(G);return _og(G)}}catch(e){}
  try{const _sd=starDraw;window.starDraw=starDraw=function(){_sd();try{mktTop()}catch(e){}}}catch(e){}
  try{const _tx=stTxt;window.stTxt=stTxt=function(){let t=_tx();try{if(MKF.on&&curMap===31)t+=' · ⏱ '+Math.max(0,Math.ceil(MKF.t))+' วิ'}catch(e){}return t}}catch(e){}
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur(),q=me.sty;if(st&&st.p6hd&&q&&!q.p6h){q.a=2;setTimeout(()=>{stSay([['me','(จะจัดการกับลอร์ดเฮเดรียนอย่างไรดี?)']],()=>{},{cine:1,choice:[['⚖️ เปิดโปงต่อหน้าสภา',1],['🧵 ชวนเขาเดินดูตลาดด้วยตาตัวเอง',2]]});
      SD.onChoose=e=>{q.p6h=e;stClose();setTimeout(()=>stSay(P6H[e],()=>{_st()},{cine:1}),250)}},200);return}return _st()}}catch(e){}},0);

/* บันไดลงใต้เมฆบนสะพาน (หลังจบบทที่ 2) */
function brgStairs(){const x=1600,y=1935,T=performance.now()/1000;if(!palVis(x,y,160))return;g.save();
  const gr=g.createRadialGradient(x,y,10,x,y,120);gr.addColorStop(0,'#140c2a');gr.addColorStop(.7,'#3a2a5a');gr.addColorStop(1,'rgba(120,90,160,.0)');g.fillStyle=gr;g.beginPath();g.ellipse(x,y,120,52,0,0,7);g.fill();
  for(let i=0;i<7;i++){const k=i/7,w=96*(1-k*.55),yy=y-30+i*11,a=1-k*.8;g.fillStyle='rgba(255,236,190,'+(.85*a)+')';g.beginPath();g.moveTo(x-w/2,yy);g.lineTo(x+w/2,yy);g.lineTo(x+w/2*.92,yy+7);g.lineTo(x-w/2*.92,yy+7);g.closePath();g.fill()}
  g.strokeStyle='rgba(232,184,80,.9)';g.lineWidth=3;g.beginPath();g.ellipse(x,y,120,52,0,Math.PI,0);g.stroke();g.globalCompositeOperation='lighter';glowAt(x,y,130,'180,140,255',.18+.06*Math.sin(T*2));for(let i=0;i<6;i++){const q=(T*.3+i/6)%1;glowAt(x-60+i*24,y+20-q*70,5,'220,210,255',.5*Math.sin(q*3.14))}
  g.restore()}
