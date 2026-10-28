/* ---------- v537 ภาค 9 บทที่ 3 «ทุ่งตาข่ายดาว» (แมพ 42) ----------
   แมพ 42 Lv 152–156: ตาข่ายเส้นเงินยักษ์ขึงกลางอวกาศ · ซี่ใย 8 เส้นจากใจกลาง + วงใย 3 วง · เดินได้เฉพาะบนเส้นด้าย/หมุดยึด/ใจกลาง (ห้วงว่างเดินไม่ได้ → ดึงกลับ)
   ด้ายกระตุก: ทุก ~10 วิ ซี่ใยหนึ่งเส้นเรืองเตือน 1.4 วิ แล้วแรงกระตุกวิ่งจากใจกลางออกไปปลายเส้น ใครยืนบนเส้นนั้นโดน 7% + กระเด็น
   ดาวติดตาข่าย 6 ดวงห้อยบนวงใยเหมือนหยดน้ำค้าง: ยืนข้างดาว 2.5 วิ เพื่อตัดใย (โดนด้ายกระตุกระหว่างตัด = เริ่มใหม่)
   ใจกลาง: ดักแด้ใหญ่ที่ขังครึ่งหนึ่งของลูมิน่า → ทางเลือก q9: 1 ตัดด้ายหลักทีเดียว (ปลดดาวทั้งหมดทันที ตาข่ายสั่น แมงมุมตื่น → ต้านฝูง 5 ระลอก)
     2 แก้ปมทีละปม (ตาข่ายไม่ตื่น แต่ต้องแก้ปม 5 ปมตอนใยนิ่ง · ใยสั่นตอนแก้ = เสียความคืบหน้า)
   มอนธีม 44 (mth 44): แมงมุมทอแสง · ฝูงดาวเคราะห์น้อย · ผีเสื้อราตรีดาว */
const WB9C={x:1600,y:1550},WB9R=[380,700,1000],WB9E=1250,WB9TW=34,WB9L=3;
const WB9A=[0,1,2,3,4,5,6,7].map(k=>k*Math.PI/4);
const wb9P=(R,k)=>[WB9C.x+Math.cos(WB9A[(k+8)%8])*R,WB9C.y+Math.sin(WB9A[(k+8)%8])*R];
const WB9SEG=[];WB9A.forEach((a,k)=>{const[x,y]=wb9P(WB9E,k);WB9SEG.push([WB9C.x,WB9C.y,x,y,WB9TW,'s',k])});
WB9R.forEach((R,ri)=>{for(let k=0;k<8;k++){const[x0,y0]=wb9P(R,k),[x1,y1]=wb9P(R,k+1);WB9SEG.push([x0,y0,x1,y1,WB9TW,'r',ri*8+k])}});
const WB9PL=[{x:WB9C.x,y:WB9C.y,rd:165,k:'hub'}].concat(WB9A.map((a,k)=>{const[x,y]=wb9P(WB9E,k);return{x,y,rd:k===WB9L?175:95,k:k===WB9L?'land':'pin',i:k}}));
const WB9LD=WB9PL[1+WB9L];
/* ดาว 6 ดวง (วงใย ri · ช่อง k) */const WB9ST=[[0,1],[1,4],[1,6],[2,0],[2,2],[2,5]].map(([ri,k])=>{const[x0,y0]=wb9P(WB9R[ri],k),[x1,y1]=wb9P(WB9R[ri],k+1);return[(x0+x1)/2,(y0+y1)/2]});
const WB9SN=[['⭐ ดาว «ซิริอุส» · หลุดจากใยแล้ว','ดาวที่สว่างที่สุดลอยขึ้นช้า ๆ เสียงของมันใสเหมือนกระดิ่ง… «ข้าเห็นเด็กคนหนึ่งในค่ายผู้อพยพชี้นิ้วหาข้าทุกคืน คืนที่ข้าหายไป เขาร้องไห้»'],
 ['⭐ ดาว «อาร์คทูรุส» · หลุดจากใยแล้ว','ดาวสีส้มอุ่นกระพริบสามครั้ง… «ชาวเรือเมฆใช้ข้านำทางมาร้อยปี พอข้าถูกจับ เรือสามลำหลงเข้าพายุ»'],
 ['⭐ ดาว «คาเพลลา» · หลุดจากใยแล้ว','ดาวคู่สองดวงจับมือกันลอยขึ้น… «คนสวมมงกุฎบอกว่าจะปกป้องเรา แต่เขาไม่เคยถามว่าเราอยากถูกปกป้องไหม»'],
 ['⭐ ดาว «ไรเจล» · หลุดจากใยแล้ว','ดาวสีฟ้าขาวสั่นระริก… «ผู้ทอร้องเพลงกล่อมทุกครั้งที่ถักเราลงมา เพลงเดียวกับที่ราชาร้องให้ลูกสาวฟัง»'],
 ['⭐ ดาว «แอนทาเรส» · หลุดจากใยแล้ว','ดาวแดงใหญ่คำรามเบา ๆ… «ระวังใจกลางตาข่ายไว้ ด้ายทุกเส้นวิ่งไปหามัน ใครแตะใจกลาง ผู้ทอจะรู้»'],
 ['⭐ ดาว «อัลเดบารัน» · หลุดจากใยแล้ว','ดาวดวงสุดท้ายลอยขึ้นพร้อมเสียงหัวเราะ… «ในดักแด้ใหญ่ตรงกลางมีแสงที่คุ้นเคย… เหมือนเด็กที่นำทางเจ้ามา»']];
const WB9K=[0,2,3,5,6].map(k=>wb9P(WB9R[0],k));/* ปม 5 ปม (ทางเลือก 2) */
const WB9ZN={hub:['ใจกลางตาข่าย','ด้ายทุกเส้นวิ่งมารวมกันที่นี่… ดักแด้ใหญ่ห้อยนิ่งอยู่กลางแสงเงิน'],land:['หมุดยึดขอบตาข่าย','หินอุกกาบาตที่ตาข่ายผูกยึดไว้ ประตูเฟืองจากวงแหวนมาส่งที่นี่'],
  pin:['หมุดยึด','หินลอยที่ถูกด้ายเงินมัดไว้แน่น'],th:['เส้นด้ายดาว','เส้นใยเงินกว้างพอให้เดิน… มันสั่นเบา ๆ ทุกครั้งที่ก้าว']};
let WB9S={lx:0,ly:0,tg:5,sp:-1,ph:0,t:0,hit:0,lp:-1,lt:0,kp:[0,0,0,0,0],ki:-1,kh:0},WB9D=[];
function wb9Pl(x,y,m){for(let i=0;i<WB9PL.length;i++){const P=WB9PL[i];if(Math.hypot(x-P.x,y-P.y)<P.rd-(m||0))return i}return -1}
function wb9Th(x,y,m){const w=WB9TW-Math.min(m||0,22);for(let i=0;i<WB9SEG.length;i++){const s=WB9SEG[i],[,d]=q9SegT(x,y,s);if(d<w)return i}return -1}
function wb9In(x,y,m){m=m||0;if(x<80||y<80||x>3120||y>3120)return false;return wb9Pl(x,y,m)>=0||wb9Th(x,y,m)>=0}
function wb9Safe(x,y){return Math.hypot(x-WB9LD.x,y-WB9LD.y)<WB9LD.rd+30}
const wb9Zone=(x,y)=>{const p=wb9Pl(x,y,0);if(p===0)return'hub';if(p>0)return WB9PL[p].k;return'th'};
const gP9s3=()=>p6Past('p9s3');
const wb9Q9=()=>(me.sty&&me.sty.q9)|0;
const wb9Free=()=>wb9Q9()===1||p6Past('p9c3');/* ดาวทั้งตาข่ายหลุดแล้ว */
/* ---------- ฉาก (แคชแผ่น) ---------- */
function wb9Rope(c,s,glow){const[x0,y0,x1,y1]=s;c.lineCap='round';
  if(glow){c.strokeStyle='rgba(170,190,255,.08)';c.lineWidth=110;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()}
  c.strokeStyle='rgba(10,10,30,.55)';c.lineWidth=60;c.beginPath();c.moveTo(x0,y0+12);c.lineTo(x1,y1+12);c.stroke();
  c.strokeStyle='#4a5080';c.lineWidth=56;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();
  c.strokeStyle='#9aa6d8';c.lineWidth=46;c.stroke();c.strokeStyle='#cdd6f6';c.lineWidth=30;c.stroke();
  c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=3;c.setLineDash([16,12]);for(const o of[-12,0,12]){const L=Math.hypot(x1-x0,y1-y0)||1,nx=-(y1-y0)/L*o,ny=(x1-x0)/L*o;c.lineDashOffset=o*2;c.beginPath();c.moveTo(x0+nx,y0+ny);c.lineTo(x1+nx,y1+ny);c.stroke()}c.setLineDash([])}
function wb9Paint(c,ox,oy,S){q9Space(c,ox,oy,S);const X1=ox+S,Y1=oy+S;
  /* แสงเงินจางทั้งตาข่าย */{const gr=c.createRadialGradient(WB9C.x,WB9C.y,100,WB9C.x,WB9C.y,1500);gr.addColorStop(0,'rgba(190,200,255,.2)');gr.addColorStop(.5,'rgba(150,160,240,.07)');gr.addColorStop(1,'rgba(150,160,240,0)');c.fillStyle=gr;c.fillRect(ox,oy,S,S)}
  /* ใยเส้นเล็กประดับ (เดินไม่ได้) */c.strokeStyle='rgba(200,210,255,.18)';c.lineWidth=2;for(let k=0;k<8;k++)for(const R of[230,540,850,1130]){const[x0,y0]=wb9P(R,k),[x1,y1]=wb9P(R,k+1);if(Math.max(x0,x1)<ox-20||Math.min(x0,x1)>X1+20||Math.max(y0,y1)<oy-20||Math.min(y0,y1)>Y1+20)continue;c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo((x0+x1)/2*.98+WB9C.x*.02,(y0+y1)/2*.98+WB9C.y*.02+18,x1,y1);c.stroke()}
  const vis=s=>!(Math.max(s[0],s[2])+90<ox||Math.min(s[0],s[2])-90>X1||Math.max(s[1],s[3])+90<oy||Math.min(s[1],s[3])-90>Y1);
  for(const s of WB9SEG)if(vis(s))wb9Rope(c,s,1);
  /* ปมที่จุดตัด */for(const R of WB9R)for(let k=0;k<8;k++){const[x,y]=wb9P(R,k);if(x<ox-60||x>X1+60||y<oy-60||y>Y1+60)continue;c.fillStyle='#4a5080';c.beginPath();c.arc(x,y,34,0,7);c.fill();c.fillStyle='#dfe6ff';c.beginPath();c.arc(x,y,26,0,7);c.fill();c.strokeStyle='rgba(120,130,190,.8)';c.lineWidth=2;for(let q=0;q<3;q++){c.beginPath();c.arc(x,y,8+q*6,q,q+4);c.stroke()}}
  /* หมุดยึด: หินอุกกาบาตพันด้ายเงิน */WB9PL.forEach((P,i)=>{if(i===0||P.x+P.rd+60<ox||P.x-P.rd-60>X1||P.y+P.rd+80<oy||P.y-P.rd-60>Y1)return;const R=gxRng(9700+i),N=22,pts=[];for(let k=0;k<N;k++){const a=k/N*6.283,r=P.rd*(.92+R()*.14);pts.push([P.x+Math.cos(a)*r,P.y+Math.sin(a)*r*.86])}
    c.fillStyle='rgba(0,0,0,.4)';c.beginPath();c.ellipse(P.x+10,P.y+44,P.rd,P.rd*.6,0,0,7);c.fill();c.fillStyle='#241e38';c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y+30):c.moveTo(x,y+30));c.closePath();c.fill();
    const gr=c.createRadialGradient(P.x-P.rd*.3,P.y-P.rd*.35,10,P.x,P.y,P.rd);gr.addColorStop(0,'#8a80a8');gr.addColorStop(.6,'#5a5078');gr.addColorStop(1,'#342c4a');c.fillStyle=gr;c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();
    c.fillStyle='rgba(30,24,50,.35)';for(let k=0;k<5;k++){c.beginPath();c.ellipse(P.x+(R()-.5)*P.rd*1.2,P.y+(R()-.5)*P.rd*.9,8+R()*14,5+R()*8,0,0,7);c.fill()}
    c.strokeStyle='rgba(220,228,255,.8)';c.lineWidth=5;for(const o of[-.25,.15]){c.beginPath();c.ellipse(P.x,P.y+P.rd*o,P.rd*.98,P.rd*.22,0,.1,3.04);c.stroke()}
    if(P.k==='land'){c.strokeStyle='rgba(255,240,200,.5)';c.lineWidth=3;c.beginPath();c.ellipse(P.x,P.y,P.rd-20,(P.rd-20)*.86,0,0,7);c.stroke()}});
  /* ใจกลาง: แผ่นใยทอแน่น */{const P=WB9PL[0];if(!(P.x+P.rd<ox||P.x-P.rd>X1||P.y+P.rd<oy||P.y-P.rd>Y1)){c.fillStyle='rgba(20,20,50,.6)';c.beginPath();c.arc(P.x,P.y+14,P.rd+6,0,7);c.fill();const gr=c.createRadialGradient(P.x,P.y,10,P.x,P.y,P.rd);gr.addColorStop(0,'#c8d0f0');gr.addColorStop(.6,'#8a94c8');gr.addColorStop(1,'#545e94');c.fillStyle=gr;c.beginPath();c.arc(P.x,P.y,P.rd,0,7);c.fill();
    c.strokeStyle='rgba(80,90,150,.5)';c.lineWidth=2;for(let k=0;k<24;k++){const a=k/24*6.283;c.beginPath();c.moveTo(P.x,P.y);c.lineTo(P.x+Math.cos(a)*P.rd,P.y+Math.sin(a)*P.rd);c.stroke()}for(let r=20;r<P.rd;r+=18){c.beginPath();c.arc(P.x,P.y,r,0,7);c.stroke()}}}}
function wb9Build(M){PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};PALC.warm=0;const R=gxRng(9600);
  trees.push({x:WB9C.x,y:WB9C.y-6,r:30,k:'wb9coc',ht:200,hw:60});
  trees.push({x:WB9C.x,y:190,r:0,k:'q9spire',ht:500,ns:1,nc:1});
  trees.push({x:WB9LD.x-70,y:WB9LD.y+70,r:0,k:'q9gate2',ht:120,ns:1,nc:1});
  WB9PL.forEach((P,i)=>{if(i===0||P.k==='land')return;trees.push({x:P.x+(R()-.5)*40,y:P.y-10,r:0,k:'q9cr',v:i%3,sc:.8+R()*.3,ht:110,ns:1,nc:1})});
  [[WB9LD.x+90,WB9LD.y-70],[WB9LD.x-90,WB9LD.y-40]].forEach(([x,y],i)=>trees.push({x,y,r:0,k:'q9lamp',ht:90,ns:1,nc:1,v:i}));
  const N=typeof celD==='function'?MAPS[42].npc2:null;if(N)trees.push({x:N.x,y:N.y-4,r:0,k:'wb9cel',ht:70,ns:1,nc:1});
  /* หยดดาวน้ำค้างตามเส้นด้าย */WB9D=[];for(const s of WB9SEG){const L=Math.hypot(s[2]-s[0],s[3]-s[1]),n=Math.floor(L/150);for(let k=0;k<n;k++){const u=(k+.5+(R()-.5)*.5)/n,side=R()<.5?-1:1,nx=-(s[3]-s[1])/L,ny=(s[2]-s[0])/L;WB9D.push([s[0]+(s[2]-s[0])*u+nx*side*30,s[1]+(s[3]-s[1])*u+ny*side*30+14,R()*6,R()])}}
  PAL.dec=[];trees.forEach(t=>{if(t.inv||!t.k||t.nc)return;const w=t.hw||40;PAL.dec.push({k:'ao',b:[t.x-w-30,t.y-30,t.x+w+30,t.y+40],x:t.x,y:t.y,r:t.r||30,w})})}
Object.assign(PALK,{
 wb9coc(t,T){const x=t.x,y=t.y,open=p6Past('p9kt'),pu=.6+.4*Math.sin(T*1.5);PALSH(x,y+6,70,18,.45);
  /* ด้ายห้อย */g.strokeStyle='rgba(220,228,255,.8)';g.lineWidth=3;for(const d of[-30,0,30]){g.beginPath();g.moveTo(x+d,y-260);g.quadraticCurveTo(x+d*.6,y-220,x+d*.3,y-180);g.stroke()}
  g.save();g.translate(x,y-110+Math.sin(T*.9)*4);
  if(!open){g.save();g.globalCompositeOperation='lighter';glowAt(0,0,100,'200,215,255',.18*pu);g.restore();
    const gr=g.createRadialGradient(-20,-30,10,0,0,90);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,'#d8def8');gr.addColorStop(1,'#8a94c8');g.fillStyle=gr;g.beginPath();g.ellipse(0,0,58,92,0,0,7);g.fill();
    g.strokeStyle='rgba(120,130,190,.6)';g.lineWidth=2;for(let k=-4;k<=4;k++){g.beginPath();g.ellipse(0,k*16,56-Math.abs(k)*5,10,(k%2)*.2,0,7);g.stroke()}
    /* เงาเด็กดาวข้างใน */g.save();g.globalCompositeOperation='lighter';glowAt(0,-10,50,'255,250,220',.5*pu);g.restore();g.fillStyle='rgba(255,250,230,'+(.35+.25*pu)+')';g.beginPath();g.arc(0,-30,10,0,7);g.fill();g.beginPath();g.moveTo(-8,-18);g.quadraticCurveTo(-14,20,-16,40);g.lineTo(16,40);g.quadraticCurveTo(14,20,8,-18);g.closePath();g.fill()}
  else{g.fillStyle='rgba(200,208,240,.85)';for(const s of[-1,1]){g.beginPath();g.moveTo(s*10,-90);g.quadraticCurveTo(s*70,-40,s*50,60);g.quadraticCurveTo(s*30,90,s*6,70);g.quadraticCurveTo(s*30,0,s*10,-90);g.fill()}
    g.save();g.globalCompositeOperation='lighter';glowAt(0,0,70,'255,240,200',.25*pu);g.restore()}
  g.restore();if(!open)phLbl('ดักแด้ใจกลางตาข่าย',x,y-230,'#e0e8ff')},
 wb9cel(t,T){const N=MAPS[42]&&MAPS[42].npc2;if(!N||N.x<0)return;try{celD(N.x,N.y,T,1)}catch(e){}}});
/* ---------- พื้น: หยดดาว · ดาวติดใย · ปม · ด้ายกระตุก ---------- */
function wb9GroundFx(){const T=performance.now()/1000,Q=LOWQ,st=stCur(),q=me.sty;g.save();
  /* ด้ายกระตุก */if(WB9S.sp>=0&&WB9S.ph){const s=WB9SEG[WB9S.sp],L=Math.hypot(s[2]-s[0],s[3]-s[1]),a=Math.atan2(s[3]-s[1],s[2]-s[0]);g.save();g.translate(s[0],s[1]);g.rotate(a);g.globalCompositeOperation='lighter';
    if(WB9S.ph===1){const k=1-WB9S.t/1.4,pu=.5+.5*Math.sin(T*18);g.fillStyle='rgba(255,120,140,'+(.12+.22*k*pu)+')';g.fillRect(160,-46,L-160,92);g.strokeStyle='rgba(255,200,210,'+(.4+.5*k)+')';g.lineWidth=3;g.setLineDash([18,12]);g.lineDashOffset=-T*60;g.beginPath();g.moveTo(160,-46);g.lineTo(L,-46);g.moveTo(160,46);g.lineTo(L,46);g.stroke();g.setLineDash([])}
    else{const f=160+WB9S.t/.8*(L-160);const gr=g.createLinearGradient(f-200,0,f+40,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.85,'rgba(255,240,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(f-200,-40,240,80);glowAt(f,0,70,'255,220,240',.7);
      g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.beginPath();for(let x=160;x<f;x+=12)g.lineTo(x,Math.sin(x*.08-T*40)*10*(1-(f-x)/L));g.stroke()}g.restore()}
  /* หยดดาวน้ำค้าง (หลุดหมดถ้าเลือกตัดด้ายหลัก / จบบท) */if(!wb9Free()){g.globalCompositeOperation='lighter';const step=Q?3:1;for(let i=0;i<WB9D.length;i+=step){const[x,y,ph,s]=WB9D[i];if(!palVis(x,y,20))continue;const k=.55+.45*Math.sin(T*(1+s)+ph);glowAt(x,y,10+6*k,'210,225,255',.35*k);g.fillStyle='rgba(255,255,255,'+(.6+.4*k)+')';g.fillRect(x-1.5,y-1.5,3,3)}g.globalCompositeOperation='source-over'}
  /* ดาวติดใย (ขั้นปลดดาว) */const actS=st&&st.p9st&&q&&q.a===1;if(actS)WB9ST.forEach(([x,y],i)=>{if((q.p9st|0)>>i&1||!palVis(x,y,80))return;const pu=.5+.5*Math.sin(T*(2+i*.3)),fl=Math.sin(T*1.4+i)*3;
    g.save();g.translate(x,y);g.scale(1.6,1.6);g.translate(-x,-y);
    g.strokeStyle='rgba(230,235,255,.8)';g.lineWidth=2;g.beginPath();g.moveTo(x-14,y);g.lineTo(x-6,y+30+fl);g.moveTo(x+14,y);g.lineTo(x+6,y+30+fl);g.stroke();
    g.save();g.globalCompositeOperation='lighter';glowAt(x,y+44+fl,46,'255,240,200',.4*pu+.15);g.restore();g.fillStyle='rgba(235,238,255,.9)';g.beginPath();g.ellipse(x,y+44+fl,18,24,0,0,7);g.fill();g.strokeStyle='rgba(140,150,200,.7)';g.lineWidth=1.4;for(let k=-2;k<=2;k++){g.beginPath();g.ellipse(x,y+44+fl+k*8,17-Math.abs(k)*3,4,0,0,7);g.stroke()}
    g.fillStyle='rgba(255,250,210,'+(.7+.3*pu)+')';g.beginPath();for(let k=0;k<5;k++){const a=k/5*6.283-1.57+T*.3;g.lineTo(x+Math.cos(a)*9,y+44+fl+Math.sin(a)*9);g.lineTo(x+Math.cos(a+.63)*3.6,y+44+fl+Math.sin(a+.63)*3.6)}g.closePath();g.fill();
    g.restore();
    g.strokeStyle='rgba(220,230,255,'+(.35+.4*pu)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+20,66,28,0,0,7);g.stroke();
    if(WB9S.lp===i){const p=Math.min(1,WB9S.lt/2.5);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-34,12,0,7);g.stroke();g.strokeStyle='#e8f0ff';g.lineWidth=3.4;g.beginPath();g.arc(x,y-34,12,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}});
  /* ปม (ทางเลือก 2) */const actK=st&&st.p9kt&&q&&q.a===1&&q.q9===2;if(actK){const calm=wb9Calm();WB9K.forEach(([x,y],i)=>{if((q.p9kk|0)>>i&1||!palVis(x,y,70))return;
    g.fillStyle=calm?'rgba(160,230,190,.2)':'rgba(255,150,160,.22)';g.beginPath();g.ellipse(x,y,56,30,0,0,7);g.fill();g.strokeStyle=calm?'rgba(180,255,210,.85)':'rgba(255,170,180,.9)';g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=-T*30;g.beginPath();g.ellipse(x,y,56,30,0,0,7);g.stroke();g.setLineDash([]);
    g.save();g.translate(x,y-30);g.rotate(calm?0:Math.sin(T*30)*.15);g.strokeStyle='#ffffff';g.lineWidth=4;for(let k=0;k<3;k++){g.beginPath();g.ellipse(0,0,14,8,k*1.05,0,7);g.stroke()}g.restore();
    if(WB9S.ki===i){const p=Math.min(1,WB9S.kp[i]/2);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=5;g.beginPath();g.arc(x,y-66,11,0,7);g.stroke();g.strokeStyle='#b8ffd0';g.lineWidth=3.4;g.beginPath();g.arc(x,y-66,11,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke()}
    g.font='bold 12px system-ui';g.textAlign='center';g.fillStyle=calm?'#c8ffd8':'#ffc8d0';g.fillText(calm?'ใยนิ่ง แก้ได้':'ใยสั่น!',x,y+48)})}
  g.restore()}
const wb9Calm=()=>((performance.now()/1000)%4)<2.6;
function wb9Screen(T,z,Hs){g.save();const vg=g.createRadialGradient(SW0/2,Hs/2,Math.min(SW0,Hs)*.32,SW0/2,Hs/2,Math.max(SW0,Hs)*.8);vg.addColorStop(0,'rgba(20,20,50,0)');vg.addColorStop(1,'rgba(14,14,40,.4)');g.fillStyle=vg;g.fillRect(0,0,SW0,Hs);
  g.globalCompositeOperation='lighter';const n=LOWQ?10:26;for(let i=0;i<n;i++){const R=depRng(i*31+5),x=((R()*SW0+T*(4+R()*6))%(SW0+20))-10,y=((R()*Hs+T*(3+R()*4))%(Hs+20))-10,tw=.4+.6*Math.abs(Math.sin(T*(1+R())+i));g.fillStyle='rgba(225,232,255,'+(.35*tw)+')';g.fillRect(x,y,1.5,1.5)}g.globalCompositeOperation='source-over';
  if(WB9S.ph===1&&WB9S.sp>=0&&!SD.on){const s=WB9SEG[WB9S.sp],[,d]=q9SegT(me.x,me.y,s);if(d<60&&Math.hypot(me.x-WB9C.x,me.y-WB9C.y)>150){const t='🕸️ ด้ายเส้นนี้กำลังกระตุก! ออกจากเส้น';g.font='bold 13px system-ui';g.textAlign='center';const w=g.measureText(t).width+22,cx=SW0/2,cy=Hs*.22;g.fillStyle='rgba(60,14,30,.82)';g.beginPath();g.roundRect(cx-w/2,cy-14,w,26,13);g.fill();g.fillStyle='#ffd8e0';g.fillText(t,cx,cy+4)}}
  g.restore()}
/* ---------- ติ๊ก ---------- */
function wb9Hit(){if(me.down>0||gmGod||me.inv3>0)return;const d=Math.round(me.mh*.07);me.hp=Math.max(1,me.hp-d);WB9S.hk=(WB9S.hk|0)+1;WB9S.lt=0;try{shk=Math.max(shk,.3)}catch(e){}try{sfx('hit')}catch(e){}try{dn.push({x:me.x,y:me.y-60,v:'🕸️ ด้ายกระตุก!',t:1.2,col:'#ffd0e0'})}catch(e){}}
function wb9Tick(dt,now,x,y,mv){
  if(wb9In(x,y,-4)){WB9S.lx=x;WB9S.ly=y}else if(!wb9In(x,y,-30)&&me.down<=0&&WB9S.lx){me.x=WB9S.lx;me.y=WB9S.ly;x=me.x;y=me.y}
  const st=stCur(),q=me.sty,fast=st&&st.p9kt&&q&&q.a===1&&q.q9===1;
  /* ด้ายกระตุก */if(WB9S.ph===0){if(!SD.on){WB9S.tg-=dt;if(WB9S.tg<=0){const a=Math.atan2(y-WB9C.y,x-WB9C.x),kk=((Math.round(a/(Math.PI/4))%8)+8)%8;WB9S.sp=Math.random()<.65?kk:(Math.random()*8)|0;WB9S.ph=1;WB9S.t=1.4;WB9S.hit=0}}}
  else if(WB9S.ph===1){WB9S.t-=dt;if(WB9S.t<=0){WB9S.ph=2;WB9S.t=0;try{sfx('zap')}catch(e){}}}
  else{WB9S.t+=dt;const s=WB9SEG[WB9S.sp],L=Math.hypot(s[2]-s[0],s[3]-s[1]),f=160+WB9S.t/.8*(L-160),[tt,d]=q9SegT(x,y,s),r=tt*L;if(!WB9S.hit&&d<46&&r>150&&Math.abs(f-r)<130){WB9S.hit=1;wb9Hit();const nx=-(s[3]-s[1])/L,ny=(s[2]-s[0])/L,sd=((x-s[0])*nx+(y-s[1])*ny)>=0?1:-1;me.x+=nx*sd*36;me.y+=ny*sd*36}
    if(WB9S.t>=.8){WB9S.ph=0;WB9S.sp=-1;WB9S.tg=(fast?4.5:9)+Math.random()*3}}
  if(!st||!q||q.a!==1){WB9S.lp=-1;WB9S.ki=-1;return}
  /* ปลดดาว */if(st.p9st){let near=-1;for(let i=0;i<6;i++){if((q.p9st|0)>>i&1)continue;const[sx,sy]=WB9ST[i];if(Math.hypot(x-sx,(y-sy)*1.3)<66)near=i}if(near!==WB9S.lp){WB9S.lp=near;WB9S.lt=0}
    if(near>=0&&me.down<=0){WB9S.lt+=dt;if(WB9S.lt>=2.5){q.p9st=(q.p9st|0)|(1<<near);let n=0;for(let k=0;k<6;k++)if(q.p9st>>k&1)n++;q.n=n;WB9S.lp=-1;WB9S.lt=0;PALG.card={h:WB9SN[near][0]+' · '+n+'/6',t:WB9SN[near][1],s:now,d:10};try{sfx('quest')}catch(e){}
        const[sx,sy]=WB9ST[near];try{burst(sx,sy+30,['#ffffff','#fff0c0','#c8d8ff'],44,200,1.2,{glow:1,g:-120})}catch(e){}try{stHud();writeSave()}catch(e){}}}}
  /* แก้ปม (ทางเลือก 2) */if(st.p9kt&&q.q9===2){let near=-1;for(let i=0;i<5;i++){if((q.p9kk|0)>>i&1)continue;const[kx,ky]=WB9K[i];if(Math.hypot(x-kx,(y-ky)*1.4)<60)near=i}WB9S.ki=near;if(near<0||me.down>0)return;
    if(wb9Calm()){WB9S.kp[near]+=dt;if(WB9S.kp[near]>=2){q.p9kk=(q.p9kk|0)|(1<<near);let n=0;for(let k=0;k<5;k++)if(q.p9kk>>k&1)n++;q.n=n;WB9S.kp[near]=0;try{sfx('quest')}catch(e){}const[kx,ky]=WB9K[near];try{burst(kx,ky-30,['#ffffff','#d8e4ff','#fff0c0'],30,160,1,{glow:1,g:-60})}catch(e){}
        try{dn.push({x:kx,y:ky-70,v:'🪢 แก้ปมแล้ว '+n+'/5',t:1.4,col:'#d8ffe4'})}catch(e){}try{stHud();writeSave()}catch(e){}}}
    else{WB9S.kh=(WB9S.kh||0)-dt;if(WB9S.kh<=0){WB9S.kh=.7;WB9S.kp[near]*=.5;if(!gmGod){const d=Math.round(me.mh*.05);me.hp=Math.max(1,me.hp-d);WB9S.kk=(WB9S.kk|0)+1}try{dn.push({x:me.x,y:me.y-60,v:'🕸️ ใยสั่น!',t:1,col:'#ffd0d8'})}catch(e){}}}}}
function wb9AqT(st){const q=me.sty;if(!q)return null;
  if(st.p9st){let b=null,bd=1e9;for(let i=0;i<6;i++){if((q.p9st|0)>>i&1)continue;const[x,y]=WB9ST[i],d=curMap===42?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b=i}}if(b==null)return null;const[x,y]=WB9ST[b];return{mp:42,act:'reach',x,y,lb:'ปลดดาวที่ติดใย ('+((q.p9st|0).toString(2).split('1').length-1)+'/6) · ยืนข้างดาว'}}
  if(st.p9kt){if(q.q9===1)return{mp:42,act:'hunt',lb:'ต้านฝูงที่ตื่นจากตาข่ายสั่น'};let b=null,bd=1e9;for(let i=0;i<5;i++){if((q.p9kk|0)>>i&1)continue;const[x,y]=WB9K[i],d=curMap===42?Math.hypot(me.x-x,me.y-y):i;if(d<bd){bd=d;b=i}}if(b==null)return null;const[x,y]=WB9K[b];return{mp:42,act:'reach',x,y,lb:'แก้ปมตอนใยนิ่ง ('+((q.p9kk|0).toString(2).split('1').length-1)+'/5)'}}
  return null}
/* ---------- มอนธีม 44 ---------- */
MV1D[440]=(r,T,W,bob)=>{/* แมงมุมทอแสง: ท้องกลมโปร่งเงินมีกลุ่มดาวในตัว ขาเรียวแปดขาเงิน ตาฟ้าเป็นกระจุก */const b=Math.sin(T*5)*r*.03;
  const KX=[-.6,-.25,.2,.55],FX=[-.92,-.42,.34,.86];for(const s of[-1,1])for(let k=0;k<4;k++){const ph=T*9+k*1.3+(s>0?0:1.6),lift=Math.max(0,Math.sin(ph))*r*.1,o=s*r*.06,P=[[r*(-.12+k*.08)+o,-r*.05+b],[r*KX[k]*1.1+o,-r*.46+b-lift],[r*FX[k]*1.1+o,r*.44-lift*.5]];
    if(W){vK(W,P,'#ffffff',r*.06);continue}g.lineCap='round';g.lineJoin='round';g.strokeStyle='#14162e';g.lineWidth=r*(s>0?.1:.08);g.beginPath();P.forEach(([x,y],q)=>q?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.strokeStyle=s>0?'#dde3ff':'#8890c8';g.lineWidth=r*(s>0?.06:.045);g.stroke();g.fillStyle='#ffffff';g.beginPath();g.arc(P[1][0],P[1][1],r*.03,0,7);g.fill()}
  bvE(W,-r*.28,-r*.02+b,r*.4,r*.32,'rgba(170,185,240,.78)',1,1);
  if(!W){g.save();g.globalCompositeOperation='lighter';glowAt(-r*.28,-r*.02+b,r*.45,'190,205,255',.3);g.restore();g.fillStyle='#ffffff';const P=[[-.42,-.1],[-.3,-.18],[-.18,-.06],[-.3,.08],[-.46,.06]];g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=r*.012;g.beginPath();P.forEach(([dx,dy],i)=>i?g.lineTo(dx*r,dy*r+b):g.moveTo(dx*r,dy*r+b));g.stroke();P.forEach(([dx,dy])=>{g.beginPath();g.arc(dx*r,dy*r+b,r*.025,0,7);g.fill()})}
  bvE(W,r*.16,-r*.06+b,r*.18,r*.15,'#7880b8',1,1);for(const[dx,dy,s]of[[.22,-.12,.04],[.28,-.06,.035],[.2,-.02,.03],[.27,-.15,.028]])vEye(W,r*dx,r*dy+b,r*s,r*s,'#8ae0ff',W?0:5);
  if(!W){g.strokeStyle='rgba(230,235,255,.5)';g.lineWidth=1;g.beginPath();g.moveTo(-r*.6,-r*.02+b);g.quadraticCurveTo(-r*.9,r*.2,-r*1.1,r*.55);g.stroke()}return true};
MV1D[441]=(r,T,W,bob)=>{/* ฝูงดาวเคราะห์น้อย: หินเล็ก 5 ก้อนโคจรรอบแกนเรือง */const b=-r*.2+Math.sin(T*1.5)*r*.06;
  if(!W){g.save();g.globalCompositeOperation='lighter';glowAt(0,b,r*.6,'255,190,120',.6);g.restore()}bvE(W,0,b,r*.17,r*.17,'#ffd890',1,.6);
  const rocks=[];for(let k=0;k<5;k++){const a=T*(1.1+k*.13)+k*1.26,rx=r*(.42+k*.06),ry=r*(.2+k*.03);rocks.push([Math.cos(a)*rx,Math.sin(a)*ry+b,r*(.17+(k%3)*.05),k,Math.sin(a)])}
  rocks.sort((p,q)=>p[4]-q[4]);for(const[x,y,s,k]of rocks){const pts=[];for(let q=0;q<7;q++){const a=q/7*6.283+k,rr=s*(.8+((k*7+q*3)%5)/10);pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr])}vS(W,pts,k%2?'#a89cb8':'#c4b8d0',1,1);if(!W){g.fillStyle='rgba(30,24,40,.45)';g.beginPath();g.arc(x+s*.2,y-s*.1,s*.28,0,7);g.fill();g.fillStyle='rgba(255,220,180,.35)';g.beginPath();g.arc(x-s*.3,y-s*.35,s*.18,0,7);g.fill()}}
  if(!W){g.strokeStyle='rgba(255,210,160,.25)';g.lineWidth=1;g.beginPath();g.ellipse(0,b,r*.6,r*.28,0,0,7);g.stroke()}return true};
MV1D[442]=(r,T,W,bob)=>{/* ผีเสื้อราตรีดาว: ปีกใหญ่ไล่เนบิวลาม่วง-ฟ้า มีดวงตาดาวบนปีก ตัวขนฟู หนวดขนนก */const fl=Math.sin(T*6)*.35,b=-r*.3+Math.sin(T*2)*r*.06;
  for(const s of[-1,1]){g.save();g.translate(s*r*.06,b);g.scale(s*(1-Math.abs(fl)*.4),1);
    if(W){vS(W,[[0,-r*.05],[r*.5,-r*.55],[r*.78,-r*.3],[r*.6,0],[r*.55,r*.3],[r*.2,r*.32],[0,r*.08]],'#ffffff',1,1)}
    else{const gr=g.createLinearGradient(0,-r*.5,r*.7,r*.3);gr.addColorStop(0,'#3a2a7a');gr.addColorStop(.5,'#6a4ab8');gr.addColorStop(1,'#3a8ab0');g.fillStyle=gr;g.beginPath();g.moveTo(0,-r*.05);g.quadraticCurveTo(r*.35,-r*.7,r*.78,-r*.3);g.quadraticCurveTo(r*.68,-r*.05,r*.6,0);g.quadraticCurveTo(r*.66,r*.3,r*.2,r*.32);g.quadraticCurveTo(r*.06,r*.2,0,r*.08);g.closePath();g.fill();g.strokeStyle='#1a1440';g.lineWidth=r*.025;g.stroke();
      g.save();g.globalCompositeOperation='lighter';glowAt(r*.42,-r*.26,r*.14,'200,220,255',.6);glowAt(r*.34,r*.16,r*.1,'255,200,240',.5);g.restore();g.fillStyle='#e8f0ff';g.beginPath();g.arc(r*.42,-r*.26,r*.05,0,7);g.fill();g.fillStyle='#ffd8f0';g.beginPath();g.arc(r*.34,r*.16,r*.035,0,7);g.fill();
      for(const[dx,dy,k]of[[.2,-.3,0],[.55,-.12,1],[.3,.05,2],[.6,-.4,3]])wStar(W,r*dx,r*dy,r*.04*(.6+.4*Math.abs(Math.sin(T*2.2+k*1.7))),r*.012,'rgba(255,255,255,.9)',0,4)}
    g.restore()}
  bvE(W,0,b,r*.09,r*.28,'#5a4a7a',1,1);bvE(W,0,b-r*.26,r*.08,r*.07,'#6a5a8a',1,1);for(const s of[-1,1]){vEye(W,s*r*.04,b-r*.28,r*.025,r*.025,'#c8e8ff',W?0:4);vK(W,[[s*r*.03,b-r*.32],['q',s*r*.12,b-r*.5,s*r*.2,b-r*.52]],W?'#ffffff':'#c8b8e8',r*.02)}
  return true};
MV1S[440]=2;MV1S[441]=1.9;MV1S[442]=1.45;
/* ---------- เนื้อเรื่องภาค 9 บทที่ 3 ---------- */
Object.assign(SPK,{lum3:SPK.lum,cel42:SPK.cel9||SPK.cel});STNPC.lum3=[42,'npc'];STNPC.cel42=[42,'npc2'];
const STQ9={1:[['me','(คว้าด้ายหลักที่ผูกดักแด้ไว้ทั้งสองมือ… แล้วตัดมันขาดในทีเดียว)'],['nar','เสียงดีดดังสะท้อนไปทั่วห้วงอวกาศ ตาข่ายทั้งผืนกระเพื่อมเหมือนผิวน้ำ… แล้วดาวนับพันที่ห้อยอยู่ทุกเส้นใยก็หลุดลอยขึ้นพร้อมกัน เหมือนฝนตกย้อนขึ้นฟ้า'],
   ['nar','แต่ไกลออกไปทางเหนือ ยอดหอทอดาวสว่างวาบ… และจากใต้ด้ายทุกเส้น บางอย่างกำลังตื่น'],['lum3','ผู้ทอรู้แล้ว! มันส่งลูกน้องมา… ช่วยข้ากันพวกมันไว้ จนกว่าดักแด้จะเปิดหมด!']],
 2:[['me','(วางมือบนด้ายหลักเบา ๆ… แล้วเริ่มคลายปมแรกอย่างระวังที่สุด)'],['nar','ตาข่ายสะดุ้งเบา ๆ แล้วนิ่งไป… ดาวบนเส้นใยยังห้อยอยู่ แต่เสียงฮัมของมันฟังดูโล่งขึ้น'],
   ['lum3','ช้า ๆ นะ… ปมห้าปมรอบใจกลางผูกดักแด้ไว้ แก้ตอนที่ใยนิ่งเท่านั้น ถ้าใยสั่นตอนเจ้าแก้ ผู้ทอจะรู้สึกได้']]};
STCH.push('ภาค 9 · บทที่ 3 · ทุ่งตาข่ายดาว');
{const C3=STCH.length-1;STY.push(
 {c:C3,g:'talk',k:'lum2',p9s3:1,tx:'คุยกับลูมิน่าที่ลานขึ้นบก (วงแหวนเฟือง) · ทุ่งตาข่ายดาว',
  pre:[['lum2','ทุ่งตาข่ายดาวอยู่ถัดจากท่าตะวันออก… เส้นใยของผู้ทอขึงอยู่ทั่วห้วงฟ้าตรงนั้น ดาวที่ถูกจับห้อยอยู่ทุกเส้นเหมือนหยดน้ำค้าง'],
   ['lum2','ครึ่งหนึ่งของข้าติดอยู่ในดักแด้ใจกลางตาข่าย… ข้ารู้สึกได้ มันเรียกข้าทุกคืน'],
   ['cel41','สมุดของท่านโอเรียนบอกว่าเส้นใยพวกนั้นเหนียวพอให้คนเดินได้… แต่ทุกครั้งที่มีอะไรแตะ ด้ายจะกระตุกส่งสัญญาณไปหาผู้ทอ'],
   ['lum2','ประตูเฟืองที่ท่าตะวันออกเปิดแล้ว ข้าจะบินล่วงหน้าไปรอที่ใจกลาง']],rw:{g:160000}},
 {c:C3,g:'map',m:42,tx:'ผ่านประตูเฟืองท่าตะวันออกไปทุ่งตาข่ายดาว',
  post:[['nar','ใต้เท้าคือเส้นด้ายสีเงินกว้างเท่าสะพาน ขึงจากหินลอยก้อนนี้ไปจนสุดสายตา… ตาข่ายผืนเดียวกว้างกว่านครอัสตราทั้งเมือง'],
   ['nar','ดาวดวงเล็ก ๆ นับไม่ถ้วนห้อยอยู่ตามเส้นใย กระพริบเบา ๆ เหมือนกำลังหายใจ… ไกลออกไปทางเหนือ ยอดหอทอดาวยิงแสงม่วงขึ้นฟ้า'],
   ['cel42','💡 เดินได้เฉพาะบนเส้นด้ายเงิน หินยึด และใจกลาง · เส้นด้ายเรืองแดง = กำลังจะกระตุก ออกจากเส้นนั้น · ดาวดวงใหญ่ที่ห่อใยไว้ ยืนข้าง ๆ 2.5 วิเพื่อตัดใย']]},
 {c:C3,g:'clue',m:42,n:6,p9st:1,tx:'ปลดดาว 6 ดวงที่ติดใย (ยืนข้างดาว 2.5 วิ · โดนด้ายกระตุก = เริ่มใหม่)',
  pre:[['cel42','ดาวดวงใหญ่หกดวงถูกห่อใยไว้แน่นกว่าดวงอื่น… พวกมันคือดาวนำทางของโลกข้างล่าง ปลดพวกมันก่อน']],
  post:[['nar','ดาวดวงที่หกลอยขึ้นสู่ฟ้า… ตาข่ายทั้งผืนสั่นเป็นระลอก แล้วสิ่งที่ซ่อนอยู่ใต้เส้นใยก็คลานออกมา'],['cel42','แมงมุมทอแสง! ผู้ทอส่งพวกมันมาซ่อมใยที่ขาด… ไล่มันไปก่อน!']],rw:{g:120000}},
 {c:C3,g:'kill',m:42,n:40,tx:'ขับไล่แมงมุมทอแสง ฝูงดาวเคราะห์น้อย และผีเสื้อราตรีดาว',
  post:[['nar','ใยที่ขาดไม่มีใครซ่อมแล้ว… จากใจกลางตาข่าย แสงอุ่น ๆ ที่คุ้นตากระพริบเรียก'],['cel42','ลูมิน่ารออยู่ที่ใจกลาง… ไปเถอะ ข้าจะเฝ้าทางกลับไว้']],rw:{g:110000}},
 {c:C3,g:'talk',k:'lum3',p9s4:1,q9ch:1,tx:'ไปหาลูมิน่าที่ใจกลางตาข่าย · ดักแด้',
  pre:[['lum3','(ลูมิน่าแนบมือกับดักแด้ใหญ่ ข้างในมีเงาเด็กหญิงที่เหมือนนางทุกอย่าง) นี่คือข้า… ครึ่งที่ส่องแสงได้'],
   ['lum3','ดักแด้ผูกไว้กับด้ายหลักเส้นเดียว ถ้าตัดมัน ดักแด้จะเปิดทันที… และดาวทุกดวงในตาข่ายจะหลุดพร้อมกัน แต่ผู้ทอจะรู้ตัว'],
   ['lum3','หรือจะค่อย ๆ แก้ปมห้าปมรอบใจกลางทีละปม… ช้ากว่า ดาวดวงอื่นยังต้องรอ แต่ผู้ทอจะยังหลับ'],
   ['lum3','ข้าตัดสินใจเองไม่ได้… เจ้าเลือกให้ข้าที']],rw:{g:90000,s3:5}},
 {c:C3,g:'clue',m:42,n:5,p9kt:1,get tx(){return wb9Q9()===1?'ต้านฝูงที่ตื่นจากตาข่ายสั่น 5 ระลอก (ล่ามอนในทุ่งตาข่าย · 8 ตัว = 1 ระลอก)':'แก้ปม 5 ปมรอบใจกลางตอนใยนิ่ง (ยืนบนปม 2 วิ · ใยสั่นออกก่อน)'},
  pre:[['lum3','ด้ายทุกเส้นกระตุกถี่ขึ้นแล้ว! ระวังเส้นที่เรืองแดง… ถ้าต้านพวกมันได้ห้าระลอก ดักแด้จะเปิดเอง',0,0,0,0,0,0,0,0,1],['lum3','ปมแรกอยู่บนวงใยวงในสุด… ดูจังหวะใยนะ สีเขียวคือใยนิ่ง',0,0,0,0,0,0,0,0,2]],
  post:[['nar','ระลอกสุดท้ายแตกกระเจิงหายไปในห้วงมืด… ดักแด้ใจกลางปริออกเป็นสองซีก แสงอุ่นทะลักออกมาท่วมตาข่ายทั้งผืน',0,0,0,0,0,0,0,0,1],
   ['nar','ปมสุดท้ายคลายออก… ดักแด้เปิดเองช้า ๆ เหมือนดอกไม้บาน ตาข่ายรอบตัวไม่สะดุ้งแม้แต่ครั้งเดียว',0,0,0,0,0,0,0,0,2],
   ['lum3','(เด็กหญิงสองคนจับมือกัน แล้วกลายเป็นคนเดียว ผมของลูมิน่าลุกเป็นเปลวแสงสว่างกว่าเดิมสองเท่า) …ข้ากลับมาครบแล้ว']],rw:{g:130000}},
 {c:C3,g:'talk',k:'cel42',p9c3:1,tx:'กลับไปหาเซเลสต์ที่หมุดยึดขอบตาข่าย',
  pre:[['cel42','ลูมิน่า… เจ้าสว่างจนข้าแทบมองไม่เห็นหน้า'],
   ['cel42','(เซเลสต์มองขึ้นฟ้า) ดาวที่หลุดเมื่อกี้… ข้าเห็นมันกลับไปอยู่ที่เดิมทีละดวง กล้องใหญ่ที่หอดูดาวคงนับได้ครบแล้ว',0,0,0,0,0,0,0,0,1],
   ['lum3','แต่ยอดหอสว่างขึ้นทุกนาที… ผู้ทอตื่นแล้ว มันจะทอใหม่ให้หนากว่าเดิม',0,0,0,0,0,0,0,0,1],
   ['cel42','ดาวในตาข่ายยังห้อยอยู่ แต่ใยรอบใจกลางหลวมแล้ว… ถ้าเราไปถึงใจกลางของผู้ทอก่อนมันรู้ตัว ดาวทุกดวงจะออกมาได้โดยไม่มีใครเจ็บ',0,0,0,0,0,0,0,0,2],
   ['lum3','ผู้ทอยังหลับ… แต่มันฝันถึงเสียงเพลงกล่อมของคนสวมมงกุฎ ข้าได้ยิน',0,0,0,0,0,0,0,0,2],
   ['lum3','ใจกลางของตาข่ายทั้งหมดไม่ได้อยู่ที่นี่… มันอยู่ในยอดหอ ในหัวใจของผู้ทอ ที่ซึ่งความกลัวของท่านโอเรียนยังติดอยู่'],
   ['cel42','งั้นข้าจะไปคุยกับท่านอาจารย์… ไม่ว่าเหลืออยู่แค่ภาพสะท้อนก็ตาม']],
  post:[['nar','🌌 — จบภาค 9 บทที่ 3 · ทุ่งตาข่ายดาว — บทต่อไป: ภาพสะท้อนในตาข่าย (เร็ว ๆ นี้)']],rw:{g:180000,s3:12}})}
setTimeout(()=>{try{
    MAPS[41].gates.push({x:Q9D[2].x+70,y:Q9D[2].y+70,to:42,req:1,p93:1,nm:'ทุ่งตาข่ายดาว (ประตูเฟือง)',arr:{x:WB9LD.x+30,y:WB9LD.y-50}});
    const Mb=MAPS[41];MAPS[42]=Object.assign({},Mb,{n:'ทุ่งตาข่ายดาว',mth:44,bth:44,sx:WB9LD.x+30,sy:WB9LD.y-50,sr:100,seed:421,bg:'#08081a',tile:'#9aa6d8',safe:'#b8c2e8',ring:'#e0e8ff',t1:'#2a2e50',t2:'#6a74a8',d1:'#2a2e50',d2:'#ffffff',fsw:[],
      gates:[{x:WB9LD.x-70,y:WB9LD.y+70,to:41,req:1,nm:'วงแหวนเฟือง (ประตูเฟือง)',arr:{x:Q9D[2].x+20,y:Q9D[2].y-30}}],npc:{x:WB9C.x+95,y:WB9C.y+60,n:'ลูมิน่า · เด็กดาว',L:22},npc2:{x:WB9LD.x+90,y:WB9LD.y+10,n:'เซเลสต์ · นักดาราศาสตร์หลวง'},
      boss:{x:-9999,y:-9999,n:'-',hp:1,xp:0,L:22,rm:0,g:0,dm:1,tn:1,sm:0,col:'#e0e8ff',bar:'#6a74a8',ln:'#ffffff',rec:'',pos:''},mvpOnly:1,
      nests:[[0,0],[0,4],[0,6],[1,1],[1,3],[1,5],[1,7],[2,1],[2,4],[2,6],[2,7]].map(([ri,k])=>{const[x0,y0]=wb9P(WB9R[ri],k),[x1,y1]=wb9P(WB9R[ri],k+1);return[Math.round((x0+x1)/2),Math.round((y0+y1)/2)]})});
    FIELDM[42]=1;BTR[44]='200,210,255';GLOWC[42]='215,225,255';FXST[44]='cosmic';BTC[44]=['#ffffff','#9aa6d8','#e0e8ff'];TIER[42]=[85,24.8,3.28];WRG[42]={1:{rg:250,cd:2.2,spd:300,dm:.95,k:'seed',c:'255,200,150',big:1},2:{rg:240,cd:2.5,spd:340,dm:1.15,k:'star',c:'200,180,255'}}}catch(e){console.warn('wb9 map',e)}
  try{NPC3[42]={d:(x,y,f,T)=>{lumD(x,y,f,T);if(p6Past('p9kt')){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-30,70,'255,240,200',.35+.15*Math.sin(T*2));g.restore()}},s:['ด้ายพวกนี้ร้องเพลงได้ ถ้าฟังดี ๆ','ข้าเคยเป็นหยดน้ำค้างดวงหนึ่งในตาข่ายนี้','ระวังเส้นที่เรืองแดงนะ','ยอดหอทางเหนือ… มันมองเราอยู่'],hy:44}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p9st||st.p9kt)return wb9AqT(st);return _q(st)}}catch(e){}
  try{const _aw=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(curMap===42&&!wb9In(x,y,10))return false;return _aw(x,y)}}catch(e){}
  try{WMN[42]=[118,1070,'ทุ่งตาข่ายดาว','🕸️'];WMLV[42]=[152,156]}catch(e){}
  try{NMLR[42]=WB9ST.map(([x,y])=>[Math.round(x),Math.round(y)])}catch(e){}
  /* ต้านฝูง (ทางเลือก 1): นับการล่าในทุ่งตาข่าย 8 ตัว = 1 ระลอก */
  try{const _k=stKill;window.stKill=stKill=function(t,bs){const st=stCur(),q=me.sty;if(st&&st.p9kt&&q&&q.a===1&&q.q9===1&&curMap===42&&!bs&&t!==3&&!isDg()){q.kc=(q.kc|0)+1;const n=Math.min(5,Math.floor(q.kc/8));if(n>(q.n|0)){q.n=n;try{dn.push({x:me.x,y:me.y-80,v:'🕸️ ต้านได้ '+n+'/5 ระลอก',t:1.5,col:'#e0e8ff'})}catch(e){}}try{stHud()}catch(e){}return}return _k.apply(this,arguments)}}catch(e){}
  try{const _st=stDone;window.stDone=stDone=function(){const st=stCur(),q=me.sty;
    if(st&&st.q9ch&&q&&!q.q9){q.a=2;setTimeout(()=>{stSay([['me','(ดักแด้สั่นเบา ๆ ใต้มือ… จะปลดลูมิน่าออกมาอย่างไร?)']],()=>{},{cine:1,choice:[['✂️ ตัดด้ายหลักทีเดียว · ดาวทุกดวงหลุดทันที (ผู้ทอตื่น)',1],['🪢 ค่อย ๆ แก้ปมทีละปม · ผู้ทอยังหลับ (ดาวอื่นรอก่อน)',2]]});
      SD.onChoose=e=>{q.q9=e;q.kc=0;q.p9kk=0;stClose();setTimeout(()=>stSay(STQ9[e],()=>{_st();setTimeout(()=>{banner={s:e===1?'✂️ ดาวทั้งตาข่ายหลุดขึ้นฟ้า · ยอดหอทอดาวสว่างวาบ':'🪢 ตาข่ายยังหลับ · แก้ปมห้าปมรอบใจกลาง',t:6};try{stFlash()}catch(_){}},600)},{cine:1}),250)}},200);return}
    if(st&&st.p9c3)setTimeout(()=>{try{sdGive(12,'ลูมิน่าครบดวง')}catch(e){}},400);if(st&&st.p9st)setTimeout(()=>{try{sdGive(6,'ดาวนำทาง')}catch(e){}},400);return _st()}}catch(e){}
},0);
