
/* ===== v477 · มอนดัง (ติดคุณสมบัติสุ่ม) + กระดานค่าหัวในค่าย =====
   ① มอนดัง = หัวหน้ามอน (6 แบบเดิมของ ekAI) ที่ติดคุณสมบัติใหม่เพิ่มอีก 1–3 อย่างจาก 9 แบบ + มีชื่อเฉพาะ
      - โผล่สุ่มเฉพาะแมพสนาม (ไม่รวมค่าย · ดันเจี้ยน · เมือง) ~0.6% ของมอนฝูงที่เกิดใหม่ · ทีละ 1 ตัวต่อแมพ · เว้น 150 วิหลังโผล่
      - เลือด 2.5 เท่าของหัวหน้ามอน (เทียบมอนแบบปกติ ไม่ขึ้นกับชนิดตัว) · ตีแรงขึ้น 15% · ตัวใหญ่ขึ้น · ป้ายชื่อทอง + ไอคอนคุณสมบัติ
      - คุณสมบัติ: โฮสต์จำลองทั้งหมด (nmAI ต่อตัว · nmTick ไฟ/ระเบิด) ส่งภาพผ่าน fx
        🔥 รอยเพลิง · ⚡ วาร์ปจู่โจม · 💚 ออร่าฟื้นฟู · 🪞 กระจกสะท้อน · ❄️ ระเบิดเหมันต์ (เดินช้า) · 🧬 แยกร่าง · 💨 ปราดเปรียว · 🌀 วังวนดูด · 💣 ทุ่นระเบิด
      - ซิงก์: world ส่งรหัสมอนดังต่อท้าย (e[10]) = คุณสมบัติ 9 บิต · เลขชื่อ 6 บิต · ดาวค่าหัว 2 บิต · บิตกระจกกำลังทำงาน
      - ล้มแล้ว (ทุกคนที่อยู่ใกล้): ทอง/EXP ×2.25 ของหัวหน้ามอน (เป้าค่าหัว ×3 · R-patch ELK) · อุปกรณ์ Mystic ขึ้นไป (ลุ้น Relic/Ancient/ตำนาน) · ผงรูน · เหรียญค่าหัว 1
   ② กระดานค่าหัว: กระดานประกาศกลางค่าย · เมนู › ผจญภัย › ค่าหัว · เปิดที่ Lv 15
      - ใบประกาศ 3 ใบต่อวัน (★ ★★ ★★★) จากแมพที่ไปถึงได้และเหมาะกับเลเวล — คนที่ความคืบหน้าเท่ากันได้ชุดเดียวกัน
      - เป้าหมาย = มอนดังที่กำหนดตายตัวจาก (วัน · แมพ · ดาว) ซ่อนตัวที่รังของมัน (NMLR: จุดเกิดฝูงจริงที่เก็บจากเกม)
        วงแดงบนแผนที่เล็กบอกพื้นที่ · เข้าใกล้มีรอยเท้าชี้ทาง · ถึงรัง (170) แล้วขอให้โฮสต์ปล่อยตัวออกมา (fx nmsum)
      - ทุกคนที่ช่วยตีได้ของมอนดัง · คนที่มีใบประกาศนั้นได้ค่าหัวเพิ่ม (เหรียญ 3/5/8 · ทอง · EXP · อุปกรณ์) · ครบทุกใบรับหีบนักล่า
      - ร้านแลกเหรียญค่าหัว · บันทึกล่า · ฉายาใหม่ 3 อัน
   เซฟ me.bty = {c เหรียญ, d วันของใบประกาศ, cl รับแล้ววันนี้, ch หีบวันนี้, nk ล้มมอนดังรวม, bk ค่าหัวรวม, log, w/wb จำนวนซื้อต่อสัปดาห์, i เคยแนะนำ} */
const NMA=[
 ['fir','🔥','รอยเพลิง','#ff7a3a','ทิ้งเปลวไฟตามทางที่เดิน — อย่ายืนในไฟ'],
 ['blk','⚡','วาร์ปจู่โจม','#b98aff','วาร์ปมาโผล่ตรงตัวผู้เล่น — เห็นวงม่วงใต้เท้าให้รีบออก'],
 ['hea','💚','ออร่าฟื้นฟู','#6aff9a','ฟื้นเลือดมอนรอบตัว — ล่อมันออกมาตีให้ห่างฝูง'],
 ['ref','🪞','กระจกสะท้อน','#dfeaff','ยกกระจกเป็นพัก ๆ — ช่วงนั้นตีเข้าน้อยและโดนสะท้อน รอให้กระจกหายก่อน'],
 ['frz','❄️','ระเบิดเหมันต์','#8ae0ff','ระเบิดน้ำแข็งรอบตัว — โดนแล้วเดินช้า ออกจากวงฟ้าให้ทัน'],
 ['spl','🧬','แยกร่าง','#ef8aff','ล้มแล้วแตกเป็นร่างแยก 3 ตัว'],
 ['swf','💨','ปราดเปรียว','#b8ffe8','ทั้งเดินและตีเร็วกว่าปกติมาก'],
 ['vor','🌀','วังวนดูด','#9aa8ff','ดูดเข้าหาตัวแล้วระเบิดกลางวง — เดินสวนออกหรือกดหลบ'],
 ['bom','💣','ทุ่นระเบิด','#ffc04a','ปาระเบิดลงรอบตัวผู้เล่น — ออกจากวงส้มก่อนตูม']];
const NMPF=['ราชันย์','ทรราช','อสูร','เพชฌฆาต','จอมโจร','ปีศาจ','เขี้ยว','กรงเล็บ','เงา','ผู้กลืน','มหาภัย','จ้าว','นักล่า','ขุนพล','ภูต','ยักษ์'];
const NMSF=['อัคคี','พริบตา','ชีวา','กระจกเงา','เหมันต์','พันร่าง','วายุ','วังวน','ดินระเบิด'];
/* รังของเป้าหมายค่าหัว: จุดเกิดฝูงจริง (spawnPack) ห่างจุดเกิด ≥500 ประตู ≥260 บอส ≥420 รังมอน ≥110 · กระจายด้วย farthest-point */
const NMLR={2:[[2932,129],[278,3103],[147,371],[2326,2953],[1643,1324]],3:[[3003,117],[202,2839],[3088,2820],[233,145],[1717,1790]],4:[[3033,230],[239,3091],[162,196],[2735,2514],[1389,1600]],6:[[157,2923],[2911,154],[92,285],[2682,2751],[1599,1378]],7:[[2862,295],[722,3075],[111,284],[2529,2298],[1277,1331]],8:[[179,305],[3043,2372],[582,2722],[2727,299],[1566,1368]],10:[[3064,517],[409,2827],[394,371],[2794,2832],[1672,1075]],11:[[2998,163],[452,3041],[363,223],[3061,2794],[1813,1539]],12:[[162,302],[2599,2897],[163,2717],[2550,395],[1462,1681]],13:[[154,172],[3059,2770],[519,3059],[2418,201],[1394,1594]],14:[[271,2995],[3076,162],[3028,3059],[451,385],[1742,1696]],15:[[375,3070],[3047,311],[313,303],[2904,2864],[1663,1169]],16:[[134,513],[2840,2871],[2754,292],[371,3026],[1488,1630]],17:[[209,431],[2968,2889],[369,2970],[2971,414],[1672,1796]],18:[[181,190],[2850,2713],[343,2643],[2517,232],[1308,1272]],19:[[2916,2973],[174,237],[3037,137],[251,2654],[2146,1568]],20:[[3040,3030],[241,158],[168,2809],[2690,280],[1608,2013]],21:[[245,2997],[3060,277],[3033,2926],[467,491],[1793,1554]],22:[[172,2918],[2918,495],[448,339],[2650,2933],[944,1720]],23:[[360,2942],[3016,325],[410,626],[2697,2525],[1609,1415]],24:[[355,3042],[2615,135],[144,580],[2648,2652],[1362,1695]],25:[[401,3051],[2953,446],[607,296],[2628,2726],[1326,1797]],26:[[2613,2960],[510,259],[195,2768],[2894,190],[1624,1364]],27:[[280,340],[2697,2930],[210,2659],[2657,743],[1669,1853]],28:[[1596,487],[639,2563],[2681,2283],[1496,1856],[2379,1116]],29:[[1470,524],[1575,2364],[2627,1514],[1273,1472],[1993,1792]],30:[[2508,326],[554,2743],[565,489],[2340,2883],[2953,1652]],31:[[1620,2890],[2142,729],[620,1558],[2610,2079],[1100,757]],32:[[1494,2763],[2415,999],[676,1334],[1572,1294],[1250,2193]],33:[[944,2674],[2551,953],[731,950],[2307,2591],[1958,1691]],34:[[324,2966],[2994,605],[423,304],[2764,2969],[1611,1646]],35:[[243,2995],[2626,381],[2732,2977],[274,651],[1735,1570]],36:[[201,337],[2963,2292],[743,2528],[2335,361],[1158,1201]]};
const NMR=60,NMCD=150,NMREF=1<<17,BTYLV=15;
const NMG={cd:20,bk:{},seen:new Set(),ann:new Set(),F:[],B:[],rfT:0,sumT:0,lm:-1,ent:0,enter:0};
const nmSt=c=>(c>>15)&3,nmSd=c=>(c>>9)&63;
function nmAfl(c){const L=[];for(let i=0;i<NMA.length;i++)if((c>>i)&1)L.push(i);return L}
function nmName(c){const a=nmAfl(c);return NMPF[nmSd(c)&15]+(a.length?NMSF[a[0]]:'')}
function nmHpK(c,t){const st=nmSt(c);return(st?[0,3,4.5,6][st]:2.5)/((MT[t]&&MT[t].hp)||1)}
function nmDmK(c){return[1.15,1.15,1.25,1.35][nmSt(c)]}
function nmOn(m,i){return!!(m&&m.nm&&((m.nm>>i)&1))}
function nmRefOn(m){if(!m||!m.nm||!nmOn(m,3))return false;return isHost()?!!m.nmRf:!!(m.nmr||(m.nmrT||0)>performance.now())}
function nmCode(m){return(m.nm&0x1ffff)|(m.nmRf?NMREF:0)}
function nmOK(mp){mp=mp==null?curMap:mp;const M=MAPS[mp];try{if(mp===curMap&&isDg())return false}catch(e){}return!!(M&&mp!==1&&mp<10000&&WMLV[mp]&&!M.hub&&!M.dg&&!M.pvp&&NMLR[mp])}
function nmRng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function nmPick(r,n){const L=NMA.map((_,i)=>i),o=[];while(o.length<n&&L.length)o.push(L.splice(Math.floor(r()*L.length),1)[0]);return o}
const NMDIR=['ตะวันออก','ตะวันออกเฉียงใต้','ใต้','ตะวันตกเฉียงใต้','ตะวันตก','ตะวันตกเฉียงเหนือ','เหนือ','ตะวันออกเฉียงเหนือ'];
function nmDirOf(dx,dy){return NMDIR[Math.round(((Math.atan2(dy,dx)*180/Math.PI+360)%360)/45)%8]}
function nmDir(x,y){const dx=x-1600,dy=y-1600;if(Math.hypot(dx,dy)<480)return'แถวใจกลางแมพ';return'ทาง'+nmDirOf(dx,dy)+'ของแมพ'}
function nmRel(x,y){const dx=x-me.x,dy=y-me.y;return'ทาง'+nmDirOf(dx,dy)+'ของคุณ ห่าง ~'+(Math.round(Math.hypot(dx,dy)/50)*50).toLocaleString()}
function nmTipOf(c){const a=nmAfl(c);return a.length?NMA[a[0]][1]+' '+NMA[a[0]][4]:''}

/* ---------- โฮสต์: เลือกมอนดัง (หลังระบบหัวหน้ามอนเดิมตัดสินแล้ว) ---------- */
function nmElig(m){try{return!!(m&&m.p&&m.t<3&&!m.pv&&!m.wb&&!m.tgb&&!m.mn&&!m.mir&&!m.dum&&!m.bt&&!m.nest&&!m.fv&&!m.nm&&!shOf(m))}catch(e){return false}}
function nmMake(m,c){if(!m.el){m.el=1+((Math.imul(m.id^0x2f1b,0x9e3779b1)>>>0)%6);m.hp*=EKHP;m.mh*=EKHP;m.dmx=(m.dmx||1)*1.5}
  const k=nmHpK(c,m.t);m.hp*=k;m.mh*=k;m.dmx=(m.dmx||1)*nmDmK(c);m.nm=c;m.nmb=1;m.elb=1;m.nmT={g:1.4+Math.random()}}
shTick=(f=>function(){const r=f.apply(this,arguments);try{if(isHost()&&run&&me.cls){const ok=nmOK();let alive=ok&&mons.some(m=>m.nm&&m.hp>0&&!nmSt(m.nm));
  for(const m of mons){if(m.nmb||!m.elb)continue;m.nmb=1;if(!ok||alive||NMG.cd>0||!nmElig(m))continue;
    if((Math.imul(m.id^0x51ed27,0x2c1b3c6d)>>>0)%10000>=NMR)continue;
    const R=nmRng(m.id*7919+(Date.now()%100000)),af=nmPick(R,R()<.6?1:2);let c=0;af.forEach(i=>c|=1<<i);c|=Math.floor(R()*64)<<9;nmMake(m,c);alive=true;NMG.cd=NMCD;
    fx({k:'nmap',x:Math.round(m.x),y:Math.round(m.y),c,L:m.L|0,mid:m.id})}}}catch(e){}return r})(shTick);

/* ---------- โฮสต์: เป้าหมายค่าหัวออกจากรัง ---------- */
function nmSummon(st){if(!isHost()||!nmOK())return;const S=btySpec(btyDay(),curMap,st);
  if(mons.some(m=>m.nm&&m.hp>0&&nmSt(m.nm)===st))return;if(performance.now()-(NMG.bk[st]||-1e9)<25000)return;
  const hp=mhp(S.t,S.L),m={id:++mid,x:S.x,y:S.y,tx:S.x,ty:S.y,t:S.t,L:S.L,p:1,hx:S.x,hy:S.y,hp,mh:hp,tg:null,tt:0,ac:1.2,w:null,lg:0,el:S.el,nmb:1,elb:1};
  m.hp*=EKHP;m.mh*=EKHP;m.dmx=1.5;nmMake(m,S.c);m.root=1.1;mons.push(m);fx({k:'nmbs',x:S.x,y:S.y,r:90,c:S.c,L:S.L})}

/* ---------- โฮสต์: คุณสมบัติต่อตัว (เรียกก่อน ekAI · คืน true = กำลังชาร์จท่า ไม่ต้องเดิน) ---------- */
function nmAI(m,dt,pl){const X=v=>Math.round(v),T=m.nmT||(m.nmT={g:1.4});T.g-=dt;
  if(nmOn(m,6)){m.nsp=1.5;m.ac-=dt*.7}else m.nsp=1;
  const near=d=>pl.some(p=>Math.hypot(p.x-m.x,p.y-m.y)<d);
  if(nmOn(m,0)){T.fe=(T.fe||0)-dt;T.fi=(T.fi==null?2:T.fi)-dt;if(T.fx==null){T.fx=m.x;T.fy=m.y}
    const fire=(x,y)=>{NMG.F.push({x,y,r:30,t:3.2,w:.5,d:ekDm(m,.55),h:{}});if(NMG.F.length>48)NMG.F.shift();fx({k:'nmft',x:X(x),y:X(y),r:30,dur:3.2})};
    if(T.fe<=0&&Math.hypot(m.x-T.fx,m.y-T.fy)>30&&near(700)){T.fe=.42;T.fx=m.x;T.fy=m.y;fire(m.x,m.y+6)}
    /* ยืนสู้อยู่กับที่: จุดไฟใต้เท้าผู้เล่นที่ใกล้ที่สุดทุก ~2.4 วิ (ไฟติดหลัง 0.5 วิ ให้เดินหลบทัน) */
    if(T.fi<=0){T.fi=2.4;let q=null,bd=200;pl.forEach(o=>{const d=Math.hypot(o.x-m.x,o.y-m.y);if(d<bd){bd=d;q=o}});if(q)fire(q.x,q.y+4)}}
  if(nmOn(m,3)){T.rf=(T.rf==null?5+Math.random()*2:T.rf)-dt;
    if(m.nmRf){if(T.rf<=0){m.nmRf=0;T.rf=7+Math.random()*2}}
    else if(T.rw){T.rw-=dt;if(T.rw<=0){T.rw=0;m.nmRf=1;T.rf=2.6;fx({k:'nmro',x:X(m.x),y:X(m.y),mid:m.id,dur:2.6})}}
    else if(T.rf<=0&&near(420)){T.rw=.6;fx({k:'nmrw',x:X(m.x),y:X(m.y),mid:m.id})}}
  if(nmOn(m,2)){T.hl=(T.hl==null?1.6:T.hl)-dt;if(T.hl<=0){T.hl=1.6;let n=0;
    for(const q of mons){if(q===m||q.hp<=0||q.t>=3||q.pv||q.dum||q.hp>=q.mh)continue;if(Math.hypot(q.x-m.x,q.y-m.y)<220){q.hp=Math.min(q.mh,q.hp+q.mh*.05);n++}}
    if(m.hp<m.mh){m.hp=Math.min(m.mh,m.hp+m.mh*.012);n++}if(n&&near(700))fx({k:'nmhl',x:X(m.x),y:X(m.y),r:220})}}
  const cd=T.cd||(T.cd={});[1,4,7,8].forEach(k=>{if(nmOn(m,k))cd[k]=(cd[k]==null?2+Math.random()*3:cd[k])-dt});
  if(T.w){const W=T.w;W.t-=dt;m.root=Math.max(m.root||0,.12);if(W.t>0)return true;T.w=null;return nmFire(m,W,pl)}
  if(T.g>0||m.root>0||m.ekw||m.ekd||m.u62w)return false;
  const P=(a,b)=>{let r=null,bd=b;pl.forEach(p=>{const d=Math.hypot(p.x-m.x,p.y-m.y);if(d>=a&&d<bd){bd=d;r=p}});return r};
  const go=(k,v)=>{cd[k]=v;T.g=1.6;m.akN=((m.akN|0)+1)%100;m.akT=performance.now()};
  if(nmOn(m,8)&&cd[8]<=0){const p=P(0,380);if(p){const pts=[];const q=pl.filter(o=>Math.hypot(o.x-m.x,o.y-m.y)<380);for(let i=0;i<3;i++){const o=q[i%q.length],a=i*2.094+Math.random(),rr=i<q.length?Math.random()*20:46+Math.random()*24;pts.push([X(o.x+Math.cos(a)*rr),X(o.y+Math.sin(a)*rr)])}
      NMG.B.push({pts,t:1.4,r:58,d:ekDm(m,2.1)});fx({k:'nmmw',x:X(m.x),y:X(m.y-20),pts,r:58});go(8,6.5+Math.random()*2);return false}cd[8]=.6}
  if(nmOn(m,1)&&cd[1]<=0){const p=P(140,430);if(p){T.w={k:1,t:.8,x:p.x,y:p.y};fx({k:'nmbw',x:X(p.x),y:X(p.y),r:72});go(1,6.5+Math.random()*2);return true}cd[1]=.6}
  if(nmOn(m,4)&&cd[4]<=0){const p=P(0,190);if(p){T.w={k:4,t:1,x:m.x,y:m.y};fx({k:'nmfw',x:X(m.x),y:X(m.y),r:170});go(4,7.5+Math.random()*2);return true}cd[4]=.6}
  if(nmOn(m,7)&&cd[7]<=0){const p=P(0,300);if(p&&pl.some(o=>{const d=Math.hypot(o.x-m.x,o.y-m.y);return d>95&&d<300})){T.w={k:7,t:.9,x:m.x,y:m.y};fx({k:'nmpw',x:X(m.x),y:X(m.y),r:300});go(7,9+Math.random()*2);return true}cd[7]=.6}
  return false}
function nmFire(m,W,pl){const X=v=>Math.round(v),Q=(p,v)=>{dmgQ[p.u]=(dmgQ[p.u]||0)+v};
  if(W.k===1){const sx=m.x,sy=m.y;m.x=Math.max(30,Math.min(WW-30,W.x));m.y=Math.max(30,Math.min(WH-30,W.y));m.tx=m.x;m.ty=m.y;
    pl.forEach(p=>{if(Math.hypot(p.x-W.x,p.y-W.y)<75)Q(p,ekDm(m,2.6))});fx({k:'nmbx',x:X(W.x),y:X(W.y),sx:X(sx),sy:X(sy),r:75});m.root=.5;return true}
  if(W.k===4){pl.forEach(p=>{if(Math.hypot(p.x-W.x,p.y-W.y)<170)Q(p,ekDm(m,1.8))});fx({k:'nmfx',x:X(W.x),y:X(W.y),r:170});m.root=.4;return true}
  if(W.k===7){m.nmT.w={k:71,t:1.3,x:W.x,y:W.y};fx({k:'nmpx',x:X(W.x),y:X(W.y),r:300,dur:1.3});return true}
  if(W.k===71){pl.forEach(p=>{if(Math.hypot(p.x-W.x,p.y-W.y)<95)Q(p,ekDm(m,2.4))});fx({k:'nmpb',x:X(W.x),y:X(W.y),r:95});m.root=.5;return true}
  return false}
/* โฮสต์: ไฟบนพื้น · ระเบิด (เรียกหลัง ekBoomTick ทุกเฟรม) */
function nmTick(dt,pl){NMG.cd=Math.max(0,NMG.cd-dt);
  if(NMG.F.length){const fh=NMG.fh||(NMG.fh={});for(const u in fh)fh[u]-=dt;for(const f of NMG.F){f.t-=dt;if(f.w>0){f.w-=dt;continue}for(const p of pl){if(!(fh[p.u]>0)&&Math.hypot(p.x-f.x,(p.y-f.y)*1.35)<f.r+8){fh[p.u]=.5;dmgQ[p.u]=(dmgQ[p.u]||0)+f.d}}}NMG.F=NMG.F.filter(f=>f.t>0)}
  if(NMG.B.length){for(const b of NMG.B){b.t-=dt;if(b.t<=0){const hit={};b.pts.forEach(([x,y])=>pl.forEach(p=>{if(!hit[p.u]&&Math.hypot(p.x-x,p.y-y)<b.r){hit[p.u]=1;dmgQ[p.u]=(dmgQ[p.u]||0)+b.d}}));fx({k:'nmmx',x:b.pts[0][0],y:b.pts[0][1],pts:b.pts,r:b.r})}}NMG.B=NMG.B.filter(b=>b.t>0)}}
/* โฮสต์: มอนดังตาย (ก่อนแจกของแบบหัวหน้ามอนเดิม) */
function nmDead(m,pl){if(m.nmD)return;m.nmD=1;const st=nmSt(m.nm),X=v=>Math.round(v);
  if(nmOn(m,5)){for(let i=0;i<3;i++){const a=i*2.094+Math.random()*.6,x=m.x+Math.cos(a)*38,y=m.y+Math.sin(a)*38,hp=mhp(m.t,m.L);
      mons.push({id:++mid,x,y,tx:x,ty:y,t:m.t,L:m.L,p:1,hx:m.hx||m.x,hy:m.hy||m.y,hp,mh:hp,tg:null,tt:3,ac:.8,w:null,lg:0,mn:1,nmb:1})}fx({k:'nmsp',x:X(m.x),y:X(m.y),r:60})}
  if(st)NMG.bk[st]=performance.now();else NMG.cd=NMCD;
  fx({k:'nmk',x:X(m.x),y:X(m.y),c:m.nm&0x1ffff,L:m.L|0,el:m.el|0})}

/* ---------- เครื่องลูก: รับรหัสมอนดังจาก world ---------- */
applyWorld=(f=>function(d){const r=f.apply(this,arguments);try{const by={};mons.forEach(m=>{by[m.id]=m;m.nmb=1});if(d&&Array.isArray(d.m))d.m.forEach(e=>{if(!Array.isArray(e)||e[4]>=3)return;const m=by[e[0]];if(!m)return;
  const c=e.length>10?e[10]|0:0;if(c){m.nm=c&0x1ffff;m.nmr=(c&NMREF)?1:0;m.mh*=nmHpK(m.nm,m.t)}else if(m.nm){m.nm=0;m.nmr=0}})}catch(e){}return r})(applyWorld);

/* ---------- เหรียญ · ใบประกาศ ---------- */
function btyDay(){const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()}
function btyWeek(){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()}
function btyClean(c){if(!c||typeof c!=='object')return null;const N=(v,mx)=>Math.max(0,Math.min(mx,Math.floor(+v||0)));
  const o={c:N(c.c,1e6),d:N(c.d,99999999),cl:{},ch:c.ch?1:0,nk:N(c.nk,1e7),bk:N(c.bk,1e7),log:[],w:N(c.w,99999999),wb:{},i:c.i?1:0,of:c.of?1:0};
  if(c.cl&&typeof c.cl==='object')Object.keys(c.cl).slice(0,8).forEach(k=>{if(/^\d{8}:\d{1,5}:[1-3]$/.test(k))o.cl[k]=1});
  if(Array.isArray(c.log))o.log=c.log.slice(-12).filter(a=>Array.isArray(a)).map(a=>[String(a[0]||'').replace(/[<>&"]/g,'').slice(0,24),N(a[1],99999),N(a[2],3),N(a[3],4e12)]);
  if(c.wb&&typeof c.wb==='object')Object.keys(c.wb).slice(0,20).forEach(k=>{if(/^[a-z0-9]{1,6}$/.test(k))o.wb[k]=N(c.wb[k],999)});return o}
function btySt(){let B=me.bty;if(!B||typeof B!=='object'||!B.cl)B=me.bty=btyClean(B||{})||{c:0,d:0,cl:{},ch:0,nk:0,bk:0,log:[],w:0,wb:{},i:0,of:0};
  const d=btyDay();if(B.d!==d){B.d=d;B.cl={};B.ch=0}const w=btyWeek();if(B.w!==w){B.w=w;B.wb={}}return B}
try{snap=(f=>function(){const o=f.apply(this,arguments);try{if(me.bty)o.bty=btyClean(me.bty)}catch(e){}return o})(snap)}catch(e){}
try{cleanChar=(f=>function(c){const o=f.apply(this,arguments);try{if(o&&c&&c.bty)o.bty=btyClean(c.bty)}catch(e){}return o})(cleanChar)}catch(e){}
try{applySave=(f=>function(c){const r=f.apply(this,arguments);try{me.bty=btyClean(c&&c.bty)||null;BTYC=null}catch(e){}return r})(applySave)}catch(e){}
function btyCoin(n,why){const B=btySt();B.c=Math.min(1e6,B.c+n);try{dn.push({x:me.x-16,y:me.y-62,v:'+'+n+' 🎯 เหรียญค่าหัว',t:1.4,col:'#ffb070'})}catch(e){}}
function btySpec(day,mp,st){const r=nmRng(hseed('nmb'+day+':'+mp+':'+st)),LR=NMLR[mp]||[[1600,1600]],lair=LR[Math.floor(r()*LR.length)],af=nmPick(r,st),sd=Math.floor(r()*64),el=1+Math.floor(r()*6);
  const oa=r()*6.283,od=40+r()*90;let c=0;af.forEach(i=>c|=1<<i);c|=sd<<9;c|=st<<15;
  return{mp,st,c,el,L:Math.min(150,(WMLV[mp]?WMLV[mp][1]:10)+(st-1)*2),t:st>=2?2:0,x:lair[0],y:lair[1],cx:Math.round(lair[0]+Math.cos(oa)*od),cy:Math.round(lair[1]+Math.sin(oa)*od),R:250,bid:day+':'+mp+':'+st,n:nmName(c)}}
let BTYC=null,BTYTAB='b';const BTYN={near:0};
function btyBoard(){if(!me.cls||me.lv<BTYLV)return[];const now=performance.now();if(BTYC&&BTYC.lv===me.lv&&now-BTYC.t<2500)return BTYC.b;const day=btyDay();let R={1:1};try{R=wmReach()}catch(e){}
  const C=Object.keys(NMLR).map(Number).filter(m=>R[m]&&WMLV[m]&&WMLV[m][0]<=me.lv+3).sort((a,b)=>WMLV[b][1]-WMLV[a][1]||b-a),key=day+'|'+C.join(',');
  if(BTYC&&BTYC.k===key){BTYC.t=now;BTYC.lv=me.lv;return BTYC.b}if(!C.length){BTYC={k:key,b:[],t:now,lv:me.lv};return[]}
  const T=C.slice(0,6),r=nmRng(hseed('btb'+key)),used=[];
  const take=(lo,hi)=>{let P=T.slice(lo,hi).filter(m=>!used.includes(m));if(!P.length)P=T.filter(m=>!used.includes(m));const m=P.length?P[Math.floor(r()*P.length)]:T[0];used.push(m);return m};
  const m3=take(0,2),m2=take(1,4),m1=take(3,6);const b=[btySpec(day,m1,1),btySpec(day,m2,2),btySpec(day,m3,3)];BTYC={k:key,b,t:now,lv:me.lv};return b}
const BTYR=[null,{c:3,g:40,x:.08,rm:3},{c:5,g:70,x:.14,rm:4},{c:8,g:110,x:.22,rm:4}];
function btyClaim(S){const B=btySt();if(B.cl[S.bid])return;B.cl[S.bid]=1;B.bk++;const R=BTYR[S.st];btyCoin(R.c);
  const gd=Math.round(R.g*S.L*Math.max(1,tierRw()));me.gold=Math.min(GMAX,me.gold+gd);try{dn.push({x:me.x+18,y:me.y-80,v:'+'+fmtG(gd)+' ทอง',t:1.4,col:'#ffd84a'})}catch(e){}
  try{gainXP(me.x,me.y,Math.max(1,Math.round(need(me.lv)*R.x)))}catch(e){}
  drops.push({x:me.x+12,y:me.y+12,k:'e',L:iLv(S.L),rm:R.rm,t:120});if(Math.random()<.04*S.st)drops.push({x:me.x-12,y:me.y+14,k:'e',L:iLv(S.L),rm:4,lg:1,t:120});
  banner={s:'🎯 ค่าหัวสำเร็จ! '+'★'.repeat(S.st)+' «'+S.n+'» · +'+R.c+' เหรียญ · +'+fmtG(gd)+' ทอง',t:6};try{sfx('quest')}catch(e){}
  try{sysMsg('🎯 ปิดค่าหัว '+'★'.repeat(S.st)+' «'+S.n+'» ('+MAPS[S.mp].n+') · +'+R.c+' เหรียญค่าหัว'+(btyAllDone()&&!B.ch?' · ครบทุกใบแล้ว! รับหีบนักล่าที่กระดานค่าหัว':''))}catch(e){}
  btyStamp(S.st)}
function btyAllDone(){const L=btyBoard(),B=btySt();return L.length>0&&L.every(S=>B.cl[S.bid])}
function btyStamp(st){try{let e=$('btystp');if(!e){e=document.createElement('div');e.id='btystp';document.body.appendChild(e)}e.innerHTML='<b>ค่าหัวสำเร็จ</b><small>'+'★'.repeat(st)+'</small>';e.classList.remove('on');void e.offsetWidth;e.classList.add('on');setTimeout(()=>{try{e.classList.remove('on')}catch(_){}},2300);btyCSS()}catch(e){}}

/* ---------- เครื่องลูก: fx ของมอนดัง ---------- */
function nmKill(o){const c=o.c|0,st=nmSt(c),x=+o.x||0,y=+o.y||0,L=Math.max(1,o.L|0);
  if(!me.cls||me.down>0||Math.hypot(me.x-x,me.y-y)>560)return;const B=btySt(),nm=nmName(c);B.nk++;
  const q=Math.random(),IL=iLv(L);drops.push({x:x-14,y:y+8,k:'e',L:IL,rm:q<.06?5:q<.36?4:3,t:90});if(Math.random()<.05)drops.push({x:x+16,y:y-6,k:'e',L:IL,rm:4,lg:1,t:120});
  try{rnShard(3+(Math.random()*4|0))}catch(e){}btyCoin(1);B.log.push([nm,curMap,st,Date.now()]);if(B.log.length>12)B.log.shift();
  banner={s:'👑 ปราบมอนดัง «'+nm+'» สำเร็จ! (รวม '+B.nk+' ตัว)',t:4.5};try{sfx('lvl')}catch(e){}
  if(st){const bid=btyDay()+':'+curMap+':'+st,S=btyBoard().find(s=>s.bid===bid);if(S&&!B.cl[bid])btyClaim(S)}
  try{writeSave()}catch(e){}}
handleFx=(f=>function(o){if(o&&typeof o.k==='string'&&o.k.charCodeAt(0)===110&&o.k.charCodeAt(1)===109){try{
  const k=o.k,d=me.cls?Math.hypot(me.x-(+o.x||0),me.y-(+o.y||0)):1e9;
  if(k==='nmsum'){if(isHost()&&(o.mp|0)===curMap)nmSummon(Math.max(1,Math.min(3,o.st|0)));return}
  if(k==='nmap'){const c=o.c|0;if(me.cls&&me.lv>=10&&d>520&&!NMG.ann.has(o.mid)){NMG.ann.add(o.mid);const s='📢 มอนดัง «'+nmName(c)+'» Lv '+(o.L|0)+' ปรากฏตัว'+nmRel(+o.x,+o.y)+'!';banner={s,t:5};try{sysMsg(s)}catch(e){}try{sfx('ek_spawn')}catch(e){}}return}
  if(k==='nmro'){const m=mons.find(q=>q.id===o.mid);if(m)m.nmrT=performance.now()+2600;if(d<520)try{sfx('ek_shield')}catch(e){}return}
  if(k==='nmk')nmKill(o);
  if(k==='nmfx'&&me.cls&&d<(+o.r||170)+6&&!(me.dgI>0)&&me.down<=0){me.nmSlw=performance.now()+2500;dn.push({x:me.x,y:me.y-52,v:'❄️ เดินช้า!',t:1,col:'#9ae0ff'})}
  if(k==='nmpx'&&me.cls&&d<(+o.r||300)&&!(me.dgI>0)&&me.down<=0)me.pull={x:+o.x,y:+o.y,t:1.3};
  if(k==='nmbs'&&me.cls&&d<620){banner={s:'🎯 เป้าหมายค่าหัว «'+nmName(o.c|0)+'» โผล่ออกมาจากรังแล้ว!',t:4.5};shk=Math.max(shk,.3);try{sfx('ek_spawn')}catch(e){}try{GX.dec.push({x:+o.x,y:+o.y+6,r:80,t:'crack',v:3,s:performance.now(),l:5000})}catch(e){}}
  if((k==='nmpb'||k==='nmmx'||k==='nmbx'||k==='nmfx')&&d<420)shk=Math.max(shk,k==='nmfx'?.18:.26);
  if(k==='nmmx'&&Array.isArray(o.pts))try{o.pts.forEach(p=>GX.dec.push({x:+p[0],y:+p[1]+4,r:46,t:'fire',v:1,s:performance.now(),l:2600}))}catch(e){}
  const SM={nmbw:'ek_growl',nmbx:'ek_dash',nmfw:'ek_growl',nmfx:'ek_shatter',nmpw:'ek_summon',nmpb:'ek_boom',nmmw:'ek_tick',nmmx:'ek_boom',nmrw:'ek_tick',nmsp:'ek_summon',nmk:'ek_boom'};if(SM[k])try{sfxNear(SM[k],+o.x,+o.y,480)}catch(e){}
  }catch(e){}}return f.apply(this,arguments)})(handleFx);
/* กระจกสะท้อน: ตีตอนกระจกทำงาน = เข้า 30% และสะท้อนกลับ (สูงสุด 5% เลือดเรา · ทุก 0.25 วิ) */
addHit=(f=>function(m,d,cr,lv,ck){try{if(m&&m.nm&&d>0&&!m.pv&&nmRefOn(m)){const now=performance.now();if(now-NMG.rfT>250&&me.cls&&me.down<=0){NMG.rfT=now;const rd=Math.round(Math.min(me.mh*.05,d*.2));if(rd>0){hurt(rd);dn.push({x:me.x,y:me.y-44,v:'🪞 สะท้อน -'+rd,t:.9,col:'#dfeaff'})}}d*=.3}}catch(e){}return f.call(this,m,d,cr,lv,ck)})(addHit);
/* เดินช้าจากระเบิดเหมันต์ */
tbMoveMul=(f=>function(){const r=f.apply(this,arguments);try{if(me.nmSlw&&me.nmSlw>performance.now())return r*.55}catch(e){}return r})(tbMoveMul);

/* ---------- เครื่องลูก: ต่อเฟรม (ป้ายเตือน · ขอปล่อยเป้าค่าหัว · แนะนำกระดาน) ---------- */
function nmClient(dt){if(!me.cls||!run)return;const now=performance.now();
  if(NMG.lm!==curMap){NMG.lm=curMap;NMG.enter=now;NMG.cd=20;NMG.F=[];NMG.B=[];NMG.bk={};NMG.ent=0}
  for(const m of mons)if(m.nm&&m.hp>0&&!NMG.seen.has(m.id)&&Math.hypot(m.x-me.x,m.y-me.y)<520){NMG.seen.add(m.id);try{EKSEEN.add(m.id)}catch(e){}const st=nmSt(m.nm);
    banner={s:(st?'🎯 ':'👑 ')+'มอนดัง «'+nmName(m.nm)+'» Lv '+m.L+' · '+nmAfl(m.nm).map(i=>NMA[i][1]+NMA[i][2]).join(' · '),t:5};try{sfx('ek_spawn')}catch(e){}
    const mp0=curMap;setTimeout(()=>{try{if(m.hp>0&&curMap===mp0&&mons.includes(m))banner={s:nmTipOf(m.nm),t:4}}catch(e){}},5200)}
  if(NMG.seen.size>200)NMG.seen.clear();if(NMG.ann.size>200)NMG.ann.clear();
  if(me.lv<BTYLV)return;const B=btySt();
  if(!B.i&&curMap===1&&ov.hidden&&!SD.on&&now-NMG.enter>4000){B.i=1;banner={s:'🎯 กระดานค่าหัวเปิดแล้ว! ดูใบประกาศที่กระดานกลางค่าย หรือ เมนู › ค่าหัว',t:6};try{sysMsg('🎯 กระดานค่าหัวเปิดแล้ว · ล่ามอนดังตามใบประกาศ รับเหรียญค่าหัวไปแลกของ')}catch(e){}}
  if(!nmOK())return;
  for(const S of btyBoard()){if(S.mp!==curMap||B.cl[S.bid])continue;
    if(!NMG.ent&&now-NMG.enter>1500){NMG.ent=1;banner={s:'🎯 ค่าหัว '+'★'.repeat(S.st)+' «'+S.n+'» ซ่อนตัวอยู่'+nmDir(S.cx,S.cy)+' · ดูวงแดงบนแผนที่เล็ก',t:6}}
    const d=Math.hypot(me.x-S.x,me.y-S.y);if(d<170&&now-NMG.sumT>3000&&!mons.some(m=>m.nm&&m.hp>0&&nmSt(m.nm)===S.st)){NMG.sumT=now;fx({k:'nmsum',st:S.st,mp:curMap})}}}
fevClient=(f=>function(dt){const r=f.apply(this,arguments);try{nmClient(dt)}catch(e){}return r})(fevClient);

/* ---------- ภาพ: ป้ายชื่อ · ออร่า · พื้น · แผนที่เล็ก ---------- */
drawEkTag=(f=>function(m,br){if(!m||!m.nm)return f.apply(this,arguments);try{nmTag(m,br)}catch(e){}})(drawEkTag);
function nmTag(m,br){const st=nmSt(m.nm),y=m.y-br*1.3-12,w=58,fr=Math.max(0,Math.min(1,m.hp/(m.mh||1)));g.save();
  g.fillStyle='rgba(0,0,0,.88)';g.fillRect(m.x-w/2-1,y-1,w+2,6);const gr=g.createLinearGradient(m.x-w/2,0,m.x+w/2,0);gr.addColorStop(0,st?'#ff5a3a':'#ffc030');gr.addColorStop(1,st?'#ffb060':'#fff0a0');g.fillStyle=gr;g.fillRect(m.x-w/2,y,w*fr,4);
  if(m.el===3){const sp=ekShP(m);g.fillStyle='rgba(0,0,0,.8)';g.fillRect(m.x-w/2-1,y+5,w+2,3);g.fillStyle='#bff0ff';g.fillRect(m.x-w/2,y+5.5,w*sp,2)}
  g.textAlign='center';g.lineJoin='round';g.font='900 11px system-ui';g.lineWidth=3.6;g.strokeStyle='rgba(24,10,0,.92)';const nm=(st?'🎯 ':'👑 ')+'«'+nmName(m.nm)+'»';g.strokeText(nm,m.x,y-17);g.fillStyle=st?'#ffb48a':'#ffe27a';g.fillText(nm,m.x,y-17);
  const ic=(EKIC[m.el]||'')+nmAfl(m.nm).map(i=>NMA[i][1]).join('')+(st?' '+'★'.repeat(st):'')+' Lv'+m.L;g.font='bold 9.5px system-ui';g.lineWidth=3;g.strokeText(ic,m.x,y-5);g.fillStyle='#fff6e0';g.fillText(ic,m.x,y-5);g.restore()}
drawEkAura=(f=>function(m){const r=f.apply(this,arguments);if(m&&m.nm)try{nmAura(m)}catch(e){}return r})(drawEkAura);
function nmAura(m){const t=performance.now()/1000,r=mR(m)*1.3,st=nmSt(m.nm),gy=m.y+r*.85,rc=st?'255,110,70':'255,205,80';g.save();g.globalCompositeOperation='lighter';
  g.strokeStyle='rgba('+rc+',.8)';g.lineWidth=2.4;g.beginPath();g.ellipse(m.x,gy,r*1.9,r*.64,0,0,7);g.stroke();g.lineWidth=1;g.strokeStyle='rgba('+rc+',.45)';g.beginPath();g.ellipse(m.x,gy,r*2.25,r*.76,0,0,7);g.stroke();
  for(let i=0;i<(LOWQ?4:8);i++){const a=t*.9+i*(6.283/(LOWQ?4:8));g.fillStyle='rgba('+rc+',.9)';g.beginPath();g.arc(m.x+Math.cos(a)*r*1.9,gy+Math.sin(a)*r*.64,1.9,0,7);g.fill()}
  glowAt(m.x,m.y-r*.5,r*3,rc,.18+.06*Math.sin(t*3));
  const P=(n,fn)=>{for(let i=0;i<(LOWQ?Math.ceil(n/2):n);i++)fn(i)};
  if(nmOn(m,0))P(6,i=>{const q=(t*.8+i/6+m.id*.17)%1,x=m.x+Math.sin(i*2.1+t*3)*r*.8,y=gy-q*r*2.6;g.fillStyle='rgba(255,'+(140-q*90|0)+',40,'+(.85*(1-q))+')';g.beginPath();g.arc(x,y,2.2*(1-q)+.6,0,7);g.fill()});
  if(nmOn(m,1)&&Math.sin(t*9+m.id)>.55){g.strokeStyle='rgba(190,140,255,.85)';g.lineWidth=1.4;g.beginPath();let x=m.x-r,y=m.y-r*1.4;g.moveTo(x,y);for(let i=0;i<4;i++){x+=r*.5;y+=(i%2?-1:1)*r*.35;g.lineTo(x,y)}g.stroke()}
  if(nmOn(m,4))P(5,i=>{const a=t*1.4+i*1.256,x=m.x+Math.cos(a)*r*1.4,y=m.y-r*.4+Math.sin(a)*r*.7;g.fillStyle='rgba(170,230,255,.75)';g.save();g.translate(x,y);g.rotate(t+i);g.fillRect(-1.6,-1.6,3.2,3.2);g.restore()});
  if(nmOn(m,6))P(4,i=>{const q=(t*2.2+i/4)%1,y=m.y-r*(.2+i*.35),x=m.x-(m.fx||1)*(r*.9+q*r*1.6);g.strokeStyle='rgba(200,255,240,'+(.6*(1-q))+')';g.lineWidth=1.3;g.beginPath();g.moveTo(x,y);g.lineTo(x-(m.fx||1)*r*.9,y);g.stroke()});
  if(nmOn(m,5)){g.strokeStyle='rgba(240,140,255,'+(.35+.25*Math.sin(t*5))+')';g.lineWidth=1.6;g.beginPath();g.arc(m.x-r*.35,m.y-r*.5,r*1.05,0,7);g.stroke();g.beginPath();g.arc(m.x+r*.35,m.y-r*.5,r*1.05,0,7);g.stroke()}
  if(nmOn(m,8))P(3,i=>{const a=t*2+i*2.094,x=m.x+Math.cos(a)*r*1.5,y=m.y-r*.6+Math.sin(a)*r*.5;g.globalCompositeOperation='source-over';g.fillStyle='#2a2a32';g.beginPath();g.arc(x,y,3,0,7);g.fill();g.fillStyle='rgba(255,'+(160+90*Math.sin(t*12+i)|0)+',60,1)';g.beginPath();g.arc(x+2,y-3,1.2,0,7);g.fill();g.globalCompositeOperation='lighter'});
  if(nmRefOn(m)){const k=.55+.25*Math.sin(t*8);g.strokeStyle='rgba(225,238,255,'+k+')';g.lineWidth=2.2;g.beginPath();for(let i=0;i<=6;i++){const a=i*1.0472+t*.8,px=m.x+Math.cos(a)*r*1.6,py=m.y-r*.45+Math.sin(a)*r*1.45;i?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();g.fillStyle='rgba(200,225,255,.12)';g.fill();
    g.fillStyle='rgba(255,255,255,'+k+')';for(let i=0;i<3;i++){const a=t*2+i*2.1;g.fillRect(m.x+Math.cos(a)*r*1.2-1,m.y-r*.5+Math.sin(a)*r-4,2,8)}}
  g.restore()}
gxGroundFx=(f=>function(){const r=f.apply(this,arguments);try{nmGround()}catch(e){}return r})(gxGroundFx);
function nmGround(){if(!me.cls)return;const t=performance.now()/1000,vis=(x,y,R)=>x>cam.x-R&&x<cam.x+W+R&&y>cam.y-R&&y<cam.y+H+R;g.save();
  for(const m of mons){if(!m.nm||m.hp<=0||!vis(m.x,m.y,260))continue;
    if(nmOn(m,2)){g.globalAlpha=.5+.15*Math.sin(t*2);g.strokeStyle='rgba(110,255,150,.55)';g.lineWidth=2;g.setLineDash([10,8]);g.lineDashOffset=-t*18;g.beginPath();g.ellipse(m.x,m.y+8,220,220*.42,0,0,7);g.stroke();g.setLineDash([]);g.fillStyle='rgba(90,255,140,.05)';g.fill();g.globalAlpha=1}
    if(nmOn(m,7)){g.strokeStyle='rgba(150,165,255,.35)';g.lineWidth=1.6;for(let i=0;i<3;i++){g.beginPath();g.ellipse(m.x,m.y+10,30+i*12,(30+i*12)*.4,t*(1.5+i*.4),0,4.2);g.stroke()}}
    if(nmOn(m,4)){g.fillStyle='rgba(180,235,255,.12)';g.beginPath();g.ellipse(m.x,m.y+10,46,18,0,0,7);g.fill()}}
  if(me.nmSlw>performance.now()){const k=(me.nmSlw-performance.now())/2500;g.strokeStyle='rgba(170,230,255,'+(.4+.4*k)+')';g.lineWidth=2;g.beginPath();g.ellipse(me.x,me.y+10,18,7,0,0,7);g.stroke();for(let i=0;i<5;i++){const a=i*1.256+t;g.fillStyle='rgba(210,245,255,.8)';g.fillRect(me.x+Math.cos(a)*16-1,me.y+6+Math.sin(a)*6-1,2.4,2.4)}}
  if(me.lv>=BTYLV&&nmOK()){const B=btySt();for(const S of btyBoard()){if(S.mp!==curMap||B.cl[S.bid])continue;const d=Math.hypot(S.x-me.x,S.y-me.y);
    if(d<340&&d>55&&!mons.some(m=>m.nm&&m.hp>0&&nmSt(m.nm)===S.st)){const ux=(S.x-me.x)/d,uy=(S.y-me.y)/d,a=Math.atan2(uy,ux);
      for(let i=0;i<7;i++){const s=34+i*26;if(s>d-24)break;const sd=i%2?1:-1,px=me.x+ux*s-uy*sd*7,py=me.y+10+uy*s+ux*sd*7,al=(.75-i*.07)*(.55+.45*Math.sin(t*4-i*.8));nmPaw(px,py,a,al)}}}}
  g.restore()}
function nmPaw(x,y,a,al){if(al<=0)return;g.save();g.translate(x,y);g.rotate(a+1.5708);g.scale(1,.55);g.globalAlpha=al;g.fillStyle='rgba(60,32,18,.85)';g.beginPath();g.ellipse(0,2,4.2,3.6,0,0,7);g.fill();[[-4,-4],[0,-6],[4,-4]].forEach(([u,v])=>{g.beginPath();g.arc(u,v,1.7,0,7);g.fill()});g.restore()}
uisMini=(f=>function(MP,WW_,draw){return f.call(this,MP,WW_,function(mx,my,k){draw(mx,my,k);try{nmMini(mx,my,k)}catch(e){}})})(uisMini);
function nmMini(mx,my,k){const t=performance.now()/1000;g.save();
  if(me.cls&&me.lv>=BTYLV&&nmOK()){const B=btySt();for(const S of btyBoard()){if(S.mp!==curMap||B.cl[S.bid])continue;const x=mx+S.cx*k,y=my+S.cy*k,R=Math.max(5,S.R*k);
    g.fillStyle='rgba(255,60,40,'+(.2+.12*Math.sin(t*4))+')';g.beginPath();g.arc(x,y,R,0,7);g.fill();g.strokeStyle='rgba(255,140,110,.95)';g.lineWidth=1;g.setLineDash([2,2]);g.beginPath();g.arc(x,y,R,0,7);g.stroke();g.setLineDash([]);
    g.fillStyle='#fff';g.font='bold 7px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText('🎯',x,y);g.textBaseline='alphabetic'}}
  for(const m of mons)if(m.nm&&m.hp>0){const x=mx+m.x*k,y=my+m.y*k,st=nmSt(m.nm),s=3.2+.6*Math.sin(t*6);g.fillStyle=st?'#ff7a4a':'#ffd23a';g.strokeStyle='#2a1400';g.lineWidth=1;g.beginPath();for(let i=0;i<10;i++){const a=-1.5708+i*.6283,rr=i%2?s*.45:s;i?g.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):g.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}g.closePath();g.fill();g.stroke()}
  g.restore()}

/* ---------- ภาพเอฟเฟกต์ (fx) ---------- */
FXB.nmft=(f,p,x,y,r,now)=>{const R=r||30,wu=p<.156;if(wu){const k=p/.156;g.save();g.fillStyle='rgba(60,20,6,'+(.25+.2*k)+')';g.beginPath();g.ellipse(x,y,R*1.1*k+4,R*.48*k+2,0,0,7);g.fill();g.globalCompositeOperation='lighter';glowAt(x,y-2,R*k+4,'255,120,40',.35*k);g.restore();return}const a=p>.8?(1-p)/.2:1;g.save();g.fillStyle='rgba(40,12,4,'+(.35*a)+')';g.beginPath();g.ellipse(x,y,R*1.15,R*.5,0,0,7);g.fill();g.globalCompositeOperation='lighter';
  glowAt(x,y-4,R*1.5,'255,110,30',.65*a);for(let i=0;i<(LOWQ?4:8);i++){const q=(now*1.6+i/8+f.s)%1,px=x+Math.sin(i*2.4+f.s)*R*.75,py=y-q*R*1.5,s=(1-q)*R*.42+2.4;g.fillStyle='rgba(255,'+(170-q*120|0)+',40,'+(.8*a*(1-q))+')';g.beginPath();g.moveTo(px-s*.6,py);g.quadraticCurveTo(px,py-s*2.2,px+s*.6,py);g.quadraticCurveTo(px,py+s*.5,px-s*.6,py);g.fill()}g.restore()};
FXB.nmbw=(f,p,x,y,r,now)=>{const R=r||72,pu=.5+.5*Math.sin(now*20);g.save();g.fillStyle='rgba(150,80,255,'+(.12+.08*pu)+')';g.beginPath();g.ellipse(x,y,R,R*.5,0,0,7);g.fill();
  g.strokeStyle='rgba(200,150,255,'+(.6+.4*pu)+')';g.lineWidth=2.4;g.setLineDash([9,6]);g.lineDashOffset=-now*60;g.beginPath();g.ellipse(x,y,R,R*.5,0,0,7);g.stroke();g.setLineDash([]);
  g.fillStyle='rgba(200,150,255,'+(.25+.25*p)+')';g.beginPath();g.ellipse(x,y,R*p,R*.5*p,0,0,7);g.fill();g.restore();try{elTxt('⚡',x,y-34-4*pu,.95,'#e0c8ff')}catch(e){}};
FXB.nmbx=(f,p,x,y,r)=>{const a=1-p;g.save();g.globalCompositeOperation='lighter';if(f.sx||f.sy){g.strokeStyle='rgba(190,140,255,'+(.8*a)+')';g.lineWidth=6*a+1;g.beginPath();g.moveTo(f.sx,f.sy-10);g.lineTo(x,y-10);g.stroke()}
  glowAt(x,y-10,(r||75)*1.2,'190,130,255',.7*a);g.strokeStyle='rgba(235,215,255,'+a+')';g.lineWidth=4*a+1;g.beginPath();g.ellipse(x,y,(r||75)*(.4+.8*p),(r||75)*.5*(.4+.8*p),0,0,7);g.stroke();g.restore()};
FXB.nmhl=(f,p,x,y,r)=>{const a=1-p,R=(r||220)*(.25+.75*p);g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(120,255,160,'+(.7*a)+')';g.lineWidth=3*a+1;g.beginPath();g.ellipse(x,y+8,R,R*.42,0,0,7);g.stroke();
  for(let i=0;i<6;i++){const q=(p+i/6)%1;g.fillStyle='rgba(150,255,170,'+(a*.8)+')';g.font='bold 10px system-ui';g.textAlign='center';g.fillText('+',x+Math.cos(i*1.05)*R*.5,y-q*40)}g.restore()};
FXB.nmrw=(f,p,x,y,r,now)=>{g.save();g.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const a=i*1.256+now*3,q=p;g.fillStyle='rgba(235,245,255,'+(.4+.6*q)+')';g.save();g.translate(x+Math.cos(a)*28,y-24+Math.sin(a)*18);g.rotate(.785);g.fillRect(-1.5,-5*q-1,3,10*q+2);g.restore()}g.restore();try{elTxt('🪞',x,y-56,.9*(1-p*.3),'#ffffff')}catch(e){}};
FXB.nmfw=(f,p,x,y,r,now)=>{const R=r||170,pu=.5+.5*Math.sin(now*16);g.save();g.fillStyle='rgba(120,200,255,'+(.1+.05*pu)+')';g.beginPath();g.ellipse(x,y+8,R,R*.45,0,0,7);g.fill();
  g.fillStyle='rgba(150,220,255,'+(.22+.2*p)+')';g.beginPath();g.ellipse(x,y+8,R*p,R*.45*p,0,0,7);g.fill();g.strokeStyle='rgba(190,240,255,'+(.6+.4*pu)+')';g.lineWidth=2.4;g.setLineDash([11,7]);g.lineDashOffset=-now*40;g.beginPath();g.ellipse(x,y+8,R,R*.45,0,0,7);g.stroke();g.setLineDash([]);g.restore();try{elTxt('❄️',x,y-50-4*pu,.95,'#d8f4ff')}catch(e){}};
FXB.nmfx=(f,p,x,y,r)=>{const R=r||170,a=1-p,e=1-Math.pow(1-p,3);g.save();g.globalCompositeOperation='lighter';glowAt(x,y,R,'150,220,255',.45*a);g.strokeStyle='rgba(220,248,255,'+a+')';g.lineWidth=6*a+1;g.beginPath();g.ellipse(x,y+8,R*(.3+.75*e),R*.45*(.3+.75*e),0,0,7);g.stroke();
  for(let i=0;i<(LOWQ?6:12);i++){const an=i*.5236+f.s,d=R*(.2+.8*e);g.fillStyle='rgba(200,240,255,'+a+')';g.save();g.translate(x+Math.cos(an)*d,y+8+Math.sin(an)*d*.45-10*a);g.rotate(an);g.beginPath();g.moveTo(0,-6);g.lineTo(2.4,0);g.lineTo(0,6);g.lineTo(-2.4,0);g.closePath();g.fill();g.restore()}g.restore()};
FXB.nmpw=(f,p,x,y,r,now)=>{const R=r||300;g.save();g.strokeStyle='rgba(150,165,255,'+(.25+.3*p)+')';g.lineWidth=2;g.setLineDash([12,9]);g.lineDashOffset=now*50;g.beginPath();g.ellipse(x,y+8,R,R*.45,0,0,7);g.stroke();g.setLineDash([]);
  g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){g.strokeStyle='rgba(160,170,255,'+(.25+.35*p)+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+8,R*(.25+i*.18)*(1-p*.3),R*.45*(.25+i*.18)*(1-p*.3),-now*(2+i*.5),0,3.6);g.stroke()}g.restore();try{elTxt('🌀',x,y-60,.9,'#d0d8ff')}catch(e){}};
FXB.nmpx=(f,p,x,y,r,now)=>{const R=r||300,a=p>.85?(1-p)/.15:1;g.save();g.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const k=((now*.9+i/5)%1),rr=R*(1-k);g.strokeStyle='rgba(150,160,255,'+(.55*a*k)+')';g.lineWidth=2.5;g.beginPath();g.ellipse(x,y+8,rr,rr*.45,-now*3-i,0,4.5);g.stroke()}
  glowAt(x,y,60,'170,150,255',.5*a);g.strokeStyle='rgba(255,120,120,'+(.5+.4*Math.sin(now*18))*a+')';g.lineWidth=2;g.beginPath();g.ellipse(x,y+8,95,95*.45,0,0,7);g.stroke();g.restore()};
FXB.nmpb=(f,p,x,y,r)=>{const R=r||95,a=1-p,e=1-Math.pow(1-p,3);g.save();g.globalCompositeOperation='lighter';glowAt(x,y,R*1.4,'170,140,255',.7*a);g.strokeStyle='rgba(230,220,255,'+a+')';g.lineWidth=8*a+1;g.beginPath();g.ellipse(x,y+8,R*(.4+.8*e),R*.45*(.4+.8*e),0,0,7);g.stroke();g.restore()};
FXB.nmmw=(f,p,x,y,r,now)=>{const R=r||58,P=f.pts||[];g.save();P.forEach(([px,py],i)=>{const pu=.5+.5*Math.sin(now*(10+p*14)+i);g.fillStyle='rgba(255,150,40,'+(.12+.1*pu)+')';g.beginPath();g.ellipse(px,py,R,R*.48,0,0,7);g.fill();
    g.fillStyle='rgba(255,170,60,'+(.2+.25*p)+')';g.beginPath();g.ellipse(px,py,R*p,R*.48*p,0,0,7);g.fill();g.strokeStyle='rgba(255,200,90,'+(.6+.4*pu)+')';g.lineWidth=2;g.setLineDash([8,6]);g.lineDashOffset=-now*50;g.beginPath();g.ellipse(px,py,R,R*.48,0,0,7);g.stroke();g.setLineDash([]);
    const fl=Math.min(1,p/.45),bx=x+(px-x)*fl,by=y+(py-y)*fl-Math.sin(fl*3.1416)*90;if(fl<1){g.fillStyle='#2a2a32';g.beginPath();g.arc(bx,by,4.5,0,7);g.fill();glowAt(bx+3,by-4,6,'255,180,60',.9)}else{g.fillStyle='#2a2a32';g.beginPath();g.arc(px,py-3,5,0,7);g.fill();glowAt(px+3,py-8,5+3*pu,'255,'+(120+100*pu|0)+',50',.9)}});g.restore()};
FXB.nmmx=(f,p,x,y,r)=>{const R=r||58,a=1-p,e=1-Math.pow(1-p,3);g.save();g.globalCompositeOperation='lighter';(f.pts||[[x,y]]).forEach(([px,py])=>{glowAt(px,py-6,R*1.3,'255,140,50',.75*a);g.strokeStyle='rgba(255,220,150,'+a+')';g.lineWidth=7*a+1;g.beginPath();g.ellipse(px,py,R*(.3+.8*e),R*.48*(.3+.8*e),0,0,7);g.stroke()});g.restore()};
FXB.nmsp=(f,p,x,y,r)=>{const a=1-p;g.save();g.globalCompositeOperation='lighter';glowAt(x,y-10,(r||60)*1.4,'240,130,255',.7*a);for(let i=0;i<3;i++){const an=i*2.094+f.s;g.strokeStyle='rgba(250,180,255,'+a+')';g.lineWidth=3*a+1;g.beginPath();g.moveTo(x,y-10);g.lineTo(x+Math.cos(an)*60*p,y-10+Math.sin(an)*40*p);g.stroke()}g.restore()};
FXB.nmbs=(f,p,x,y,r)=>{const a=1-p,R=(r||90);g.save();g.globalCompositeOperation='lighter';glowAt(x,y-20,R*1.6,'255,90,60',.7*a);g.strokeStyle='rgba(255,160,120,'+a+')';g.lineWidth=7*a+1;g.beginPath();g.ellipse(x,y+6,R*(.3+p),R*.45*(.3+p),0,0,7);g.stroke();
  for(let i=0;i<8;i++){const an=i*.785+f.s;g.strokeStyle='rgba(255,210,170,'+(.8*a)+')';g.lineWidth=2;g.beginPath();g.moveTo(x+Math.cos(an)*R*.3*p,y-10+Math.sin(an)*R*.2*p);g.lineTo(x+Math.cos(an)*R*1.1*p,y-10+Math.sin(an)*R*.7*p);g.stroke()}g.restore();try{elTxt('🎯 ค่าหัว!',x,y-70-20*p,1-p*.6,'#ffb48a')}catch(e){}};
FXB.nmk=(f,p,x,y)=>{const a=p<.1?p/.1:1-p;g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(x,y-220,x,y);gr.addColorStop(0,'rgba(255,220,120,0)');gr.addColorStop(1,'rgba(255,220,120,'+(.55*a)+')');g.fillStyle=gr;g.fillRect(x-16-10*p,y-220,32+20*p,220);
  glowAt(x,y-20,70,'255,210,90',.6*a);g.restore();try{elTxt('👑',x,y-60-50*p,a,'#ffe27a')}catch(e){}};

/* ---------- กระดานค่าหัวกลางค่าย (ใช้กระดานประกาศเดิม CAMP.BOARD) ---------- */
function btyBXY(){return[CX+CAMP.BOARD[0],CY+CAMP.BOARD[1]]}
drawCook=(f=>function(){const r=f.apply(this,arguments);try{btyBoardDraw()}catch(e){}return r})(drawCook);
function btyBoardDraw(){if(curMap!==1||!me.cls||me.lv<BTYLV)return;const [bx,by]=btyBXY();if(Math.abs(bx-cam.x-W/2)>W/2+80||Math.abs(by-cam.y-H/2)>H/2+120)return;const t=performance.now()/1000,B=btySt(),L=btyBoard();
  g.save();L.forEach((S,i)=>{const px=bx-12+i*12,py=by-11+(i===1?-2:0),done=!!B.cl[S.bid];g.save();g.translate(px,py);g.rotate((i-1)*.08);
    g.fillStyle=done?'#d8d0b8':'#f4e2b8';g.strokeStyle='#6a3a18';g.lineWidth=.6;g.fillRect(-4.6,-6,9.2,12);g.strokeRect(-4.6,-6,9.2,12);
    g.fillStyle=done?'#6a9a5a':'#b8281e';g.fillRect(-4.6,-6,9.2,2.6);g.fillStyle='#3a2414';g.beginPath();g.arc(0,.6,2.2,0,7);g.fill();
    g.fillStyle='#c8281e';g.beginPath();g.arc(0,-6.6,1,0,7);g.fill();if(done){g.strokeStyle='#2a8a3a';g.lineWidth=1.2;g.beginPath();g.moveTo(-3,2);g.lineTo(-.6,4.4);g.lineTo(3.6,-1);g.stroke()}g.restore()});
  const left=L.filter(S=>!B.cl[S.bid]).length,chest=btyAllDone()&&!B.ch;if(left||chest){const y=by-44+Math.sin(t*3)*3;g.font='bold 15px system-ui';g.textAlign='center';g.fillText(chest?'🎁':'🎯',bx,y);
    g.font='bold 9px system-ui';g.lineWidth=3;g.strokeStyle='rgba(20,10,4,.9)';const s=chest?'รับหีบนักล่า!':'ค่าหัว '+left+' ใบ';g.strokeText(s,bx,y+11);g.fillStyle='#ffd8a0';g.fillText(s,bx,y+11)}g.restore()}
try{bars=(f=>function(){const r=f.apply(this,arguments);try{BTYN.near=0;if(curMap===1&&me.cls&&me.lv>=BTYLV&&ov.hidden&&!SD.on){const [bx,by]=btyBXY(),d=Math.hypot(me.x-bx,me.y-by-16);
  if(d<58){const M=MAPS[1];let mn=1e9;['npc','npc2','npc3','npc4','npc5','npc6'].forEach(k=>{const N=M[k];if(N)mn=Math.min(mn,Math.hypot(me.x-N.x,me.y-N.y))});try{mn=Math.min(mn,Math.hypot(me.x-TFN.x,me.y-TFN.y))}catch(e){}
    if(d<mn){const b=$('npcb');b.textContent='🎯 ดูกระดานค่าหัว';b.style.display='block';BTYN.near=1}}}}catch(e){}return r})(bars)}catch(e){}
setTimeout(()=>{const b=$('npcb');if(b)b.addEventListener('click',e=>{if(BTYN.near&&curMap===1){e.stopImmediatePropagation();e.preventDefault();BTYTAB='b';btyUI()}},true)},0);
try{u64Dest=(f=>function(){const L=f.apply(this,arguments);try{if(me.lv>=BTYLV){const [bx,by]=btyBXY();L.splice(Math.min(2,L.length),0,{ic:'🎯',n:'กระดานค่าหัว',x:bx,y:by+34})}}catch(e){}return L})(u64Dest)}catch(e){}

/* ---------- ร้านแลกเหรียญค่าหัว ---------- */
const BTYS=[
 {k:'hp',ic:'❤️',n:'ยาฟื้นเลือด ×20',p:2,f:()=>gdSet('hp',gdGet('hp')+20)},
 {k:'rn',ic:'💠',n:'ผงรูน ×40',p:4,f:()=>rnShard(40)},
 {k:'ps',ic:'🛡️',n:'หินกันแตก ×1',p:5,f:()=>gdSet('ps',gdGet('ps')+1)},
 {k:'s1',st:1,n:'หินตีบวกขั้นแรก ×3',p:4,f:()=>gdSet('s1',gdGet('s1')+3)},
 {k:'s2',st:2,n:'หินตีบวกขั้นสอง ×1',p:8,lv:40,f:()=>gdSet('s2',gdGet('s2')+1)},
 {k:'s3',st:3,n:'หินตีบวกขั้นสูง ×1',p:30,lv:90,wk:2,f:()=>gdSet('s3',gdGet('s3')+1)},
 {k:'gb',ic:'🎁',n:'หีบอุปกรณ์นักล่า',d:'อุปกรณ์ Relic ตามเลเวลคุณ · ลุ้น Ancient 8%',p:14,wk:5,f:()=>{drops.push({x:me.x+10,y:me.y+12,k:'e',L:iLv(me.lv),rm:Math.random()<.08?5:4,t:120})}}];
function btyBuy(k){const B=btySt(),I=BTYS.find(o=>o.k===k);if(!I)return btyUI();if(I.lv&&me.lv<I.lv)return btyUI('ต้อง Lv '+I.lv+' ขึ้นไป');if(I.wk&&(B.wb[k]|0)>=I.wk)return btyUI('สัปดาห์นี้แลกครบแล้ว');if(B.c<I.p)return btyUI('เหรียญค่าหัวไม่พอ');
  B.c-=I.p;if(I.wk)B.wb[k]=(B.wb[k]|0)+1;try{I.f()}catch(e){}try{sfx('coin')}catch(e){}try{writeSave()}catch(e){}btyUI('<span style="color:#2a9a4a">✔ แลก '+I.n+' แล้ว</span>')}
function btyChest(){const B=btySt();if(B.ch||!btyAllDone())return btyUI();B.ch=1;btyCoin(5);const gd=Math.round(120*me.lv);me.gold=Math.min(GMAX,me.gold+gd);
  if(me.lv>=60)gdSet('s2',gdGet('s2')+2);else gdSet('s1',gdGet('s1')+3);drops.push({x:me.x+10,y:me.y+12,k:'e',L:iLv(me.lv),rm:Math.random()<.1?5:4,t:120});
  try{burst(me.x,me.y-20,['#ffd84a','#ffffff','#ff8a5a'],LOWQ?12:30,160,.9,{glow:1,g:-40})}catch(e){}try{sfx('lvl')}catch(e){}try{writeSave()}catch(e){}
  btyUI('<span style="color:#2a9a4a">🎁 เปิดหีบนักล่า: +5 เหรียญ · +'+fmtG(gd)+' ทอง · '+(me.lv>=60?'หินตีบวกขั้นสอง ×2':'หินตีบวกขั้นแรก ×3')+' · อุปกรณ์ Relic</span>')}

/* ---------- หน้ากระดานค่าหัว ---------- */
function btyMapName(mp){return(WMN[mp]?WMN[mp][3]+' ':'')+(MAPS[mp]?MAPS[mp].n:'?')}
function btyCard(S,B){const done=!!B.cl[S.bid],R=BTYR[S.st],here=curMap===S.mp,alive=here&&mons.some(m=>m.nm&&m.hp>0&&nmSt(m.nm)===S.st);
  const af=nmAfl(S.c).map(i=>'<span class="bya" style="--c:'+NMA[i][3]+'" title="'+NMA[i][4]+'"><i>'+NMA[i][1]+'</i>'+NMA[i][2]+'</span>').join('');
  return'<div class="byp'+(done?' done':'')+'"><div class="byh"><span class="bys">'+'★'.repeat(S.st)+'<i>'+'★'.repeat(3-S.st)+'</i></span><span class="byw">ค่าหัว</span></div>'+
   '<div class="byb"><canvas class="bymc" width="88" height="88" data-bym="'+S.mp+':'+S.st+'"></canvas><div class="byi"><b>«'+S.n+'»</b><small>'+EKIC[S.el]+' หัวหน้า'+EKN[S.el]+' · Lv '+S.L+'</small><div class="byal">'+af+'</div>'+
   '<small class="byl">📍 '+btyMapName(S.mp)+'<br>🐾 ซ่อนตัว'+nmDir(S.cx,S.cy)+'</small></div></div>'+
   '<div class="byr"><span>🎯 '+R.c+' เหรียญ</span><span>💰 '+fmtG(Math.round(R.g*S.L*Math.max(1,(TIER[S.mp]?TIER[S.mp][2]:1))))+'</span><span>✨ EXP '+Math.round(R.x*100)+'%</span><span>🎁 '+RNE[R.rm]+'</span></div>'+
   (done?'<div class="byok">✅ ล่าสำเร็จแล้ววันนี้</div>':alive?'<div class="byhot">⚔️ เป้าหมายอยู่ในแมพนี้แล้ว — ไปล้มมันเลย!</div>':here?'<div class="byhot">📍 คุณอยู่แมพนี้ · เดินเข้าวงแดงบนแผนที่เล็ก แล้วตามรอยเท้าไปที่รัง</div>':
    '<div class="bt"><button data-bywm="'+S.mp+'">🗺️ เปิดแผนที่โลก</button></div>')+'</div>'}
function btyUI(msg){if(!me.cls)return;ov.dataset.k='bty';ov.hidden=false;const B=btySt();
  let h=hdr('🎯','กระดานค่าหัว','🎯 เหรียญค่าหัว '+B.c.toLocaleString()+' · ใบประกาศใหม่ทุกเที่ยงคืน')+tabsH([['b','ใบประกาศ'],['s','ร้านแลก'],['r','บันทึกล่า']],BTYTAB,'bty');
  if(msg)h+='<div class="note">'+msg+'</div>';
  if(me.lv<BTYLV)h+='<div class="card hint">🔒 กระดานค่าหัวเปิดที่ Lv '+BTYLV+' (อีก '+(BTYLV-me.lv)+' เลเวล) · ระหว่างนี้ล้ม «มอนดัง» ที่โผล่ในแมพก็ได้เหรียญค่าหัวแล้ว</div>';
  else if(BTYTAB==='b'){const L=btyBoard();
    h+=L.length?L.map(S=>btyCard(S,B)).join(''):'<div class="card hint">ยังไม่มีแมพที่เหมาะกับเลเวลคุณ</div>';
    const n=L.filter(S=>B.cl[S.bid]).length,ok=btyAllDone();
    h+='<div class="card"><div class="sr"><div class="ico">🎁</div><div class="nm"><b>หีบนักล่า</b><small>ล่าค่าหัวครบทุกใบวันนี้ ('+n+'/'+L.length+') · +5 เหรียญ · ทอง · หินตีบวก · อุปกรณ์ Relic</small></div>'+(B.ch?'<button disabled>รับแล้ว ✓</button>':'<button class="pri" data-bych="1"'+(ok?'':' disabled')+'>เปิด</button>')+'</div></div>';
    h+='<div class="card hint">มอนดังที่โผล่สุ่มในแมพสนามก็ให้เหรียญค่าหัว 1 เหรียญ · ใครช่วยตีอยู่ใกล้ ๆ ได้ของทุกคน ส่วนค่าหัวได้เฉพาะคนที่มีใบประกาศนั้น</div>'}
  else if(BTYTAB==='s'){h+=BTYS.map(I=>{const lk=I.lv&&me.lv<I.lv,wl=I.wk?(I.wk-(B.wb[I.k]|0)):null,ic=I.st?stoneIc(I.st):I.ic;
      return'<div class="card"><div class="sr"><div class="ico">'+ic+'</div><div class="nm"><b>'+I.n+'</b><small>'+(I.d?I.d+' · ':'')+'🎯 '+I.p+' เหรียญ'+(wl!=null?' · สัปดาห์นี้เหลือ '+wl:'')+(lk?' · ต้อง Lv '+I.lv:'')+'</small></div><button class="pri" data-byb="'+I.k+'"'+(lk||B.c<I.p||wl===0?' disabled':'')+'>แลก</button></div></div>'}).join('')}
  else{const T=[['bhT1',10,()=>B.nk],['bhT2',15,()=>B.bk],['bhT3',100,()=>B.nk]];
    h+='<div class="card"><div class="byst"><div><b>'+B.nk.toLocaleString()+'</b><small>ล้มมอนดัง</small></div><div><b>'+B.bk.toLocaleString()+'</b><small>ปิดค่าหัว</small></div><div><b>'+B.c.toLocaleString()+'</b><small>เหรียญที่มี</small></div></div></div>';
    h+='<div class="card"><div class="cap">🏅 ฉายานักล่า</div>'+T.map(([id,n,fn])=>{const A=typeof ACHM!=='undefined'&&ACHM[id],v=Math.min(n,fn()),got=me.ach&&me.ach[id];return A?'<div class="byt'+(got?' got':'')+'"><b>«'+A[1]+'»</b><small>'+A[2]+'</small><div class="xpb"><i style="width:'+Math.round(v/n*100)+'%"></i></div><small>'+(got?'ปลดแล้ว ✓':v+'/'+n)+'</small></div>':''}).join('')+'</div>';
    h+='<div class="card"><div class="cap">📜 ล่าล่าสุด</div>'+(B.log.length?B.log.slice().reverse().map(a=>'<div class="bylg"><span>'+(a[2]?'🎯 '+'★'.repeat(a[2]):'👑')+' «'+a[0]+'»</span><small>'+(MAPS[a[1]]?MAPS[a[1]].n:'')+' · '+new Date(a[3]).toLocaleDateString('th-TH',{day:'numeric',month:'short'})+'</small></div>').join(''):'<small>ยังไม่เคยล้มมอนดัง</small>')+'</div>';
    h+='<div class="card hint">คุณสมบัติของมอนดัง: '+NMA.map(a=>a[1]+' <b>'+a[2]+'</b> — '+a[4]).join('<br>')+'</div>'}
  ov.innerHTML='<div class="pn btypn" data-pn="bty">'+h+'</div>';btyCSS();
  ov.querySelectorAll('[data-tab^="bty:"]').forEach(b=>b.onclick=e=>{e.stopPropagation();BTYTAB=b.dataset.tab.split(':')[1];btyUI()});
  ov.querySelectorAll('[data-byb]').forEach(b=>b.onclick=()=>btyBuy(b.dataset.byb));
  ov.querySelectorAll('[data-bych]').forEach(b=>b.onclick=()=>btyChest());
  ov.querySelectorAll('[data-bywm]').forEach(b=>b.onclick=()=>{ov.hidden=true;try{wmUI(+b.dataset.bywm)}catch(e){}});
  ov.querySelectorAll('canvas[data-bym]').forEach(c=>{try{const [mp,st]=c.dataset.bym.split(':').map(Number),S=btyBoard().find(s=>s.mp===mp&&s.st===st);if(S)btyMini(c,S)}catch(e){}})}
function btyMini(c,S){const x=c.getContext('2d'),M=MAPS[S.mp],k=c.width/3200;x.fillStyle=M.bg||'#3a4a2a';x.fillRect(0,0,c.width,c.height);
  x.strokeStyle='rgba(255,255,255,.08)';x.lineWidth=1;for(let i=1;i<4;i++){x.beginPath();x.moveTo(i*22,0);x.lineTo(i*22,88);x.moveTo(0,i*22);x.lineTo(88,i*22);x.stroke()}
  (M.gates||[]).forEach(G=>{if(G.to>=10000)return;x.fillStyle='#c8a8ff';x.beginPath();x.arc(G.x*k,G.y*k,2.2,0,7);x.fill()});
  x.fillStyle='#9aff9a';x.beginPath();x.arc(M.sx*k,M.sy*k,2.6,0,7);x.fill();
  {const R=Math.max(10,S.R*k),cx=Math.max(R*.6,Math.min(88-R*.6,S.cx*k)),cy=Math.max(R*.6,Math.min(88-R*.6,S.cy*k));x.strokeStyle='rgba(255,120,90,.55)';x.lineWidth=1;x.beginPath();x.moveTo(cx,0);x.lineTo(cx,88);x.moveTo(0,cy);x.lineTo(88,cy);x.stroke();
    x.fillStyle='rgba(255,60,40,.42)';x.beginPath();x.arc(cx,cy,R,0,7);x.fill();x.strokeStyle='#ffb09a';x.lineWidth=1.5;x.setLineDash([3,2]);x.beginPath();x.arc(cx,cy,R,0,7);x.stroke();x.setLineDash([]);S.__mc=[cx,cy]}
  x.font='11px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText('🎯',S.__mc[0],S.__mc[1]);x.fillStyle='rgba(255,240,210,.8)';x.font='bold 8px system-ui';x.fillText('N',80,8);x.strokeStyle='rgba(60,30,10,.8)';x.lineWidth=2;x.strokeRect(1,1,86,86)}
function btyCSS(){if($('btycss'))return;const st=document.createElement('style');st.id='btycss';st.textContent=
 '.byp{position:relative;margin:8px 0;padding:8px 9px 9px;border-radius:10px;background:linear-gradient(#f8ecd0,#ecd8ac);border:1.5px solid #8a5a2a;box-shadow:inset 0 0 18px rgba(120,70,20,.18),0 2px 4px rgba(0,0,0,.18);color:#3a2410}'+
 '.byp.done{filter:saturate(.55);opacity:.82}.byh{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}.bys{color:#d8901a;font-size:15px;letter-spacing:1px;text-shadow:0 1px 0 #fff6}.bys i{font-style:normal;color:#c8b088}'+
 '.byw{font-weight:900;color:#b8281e;border:2px solid #b8281e;border-radius:5px;padding:0 7px;font-size:12px;transform:rotate(-4deg);background:#fff3}.byb{display:flex;gap:9px;align-items:flex-start}.bymc{flex:0 0 88px;width:88px;height:88px;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,.3)}'+
 '.byi{flex:1;min-width:0}.byi b{display:block;font-size:15px;color:#7a1a10}.byi small{display:block;font-size:11.5px;color:#6a4a28;line-height:1.45}.byal{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}'+
 '.bya{display:inline-flex;align-items:center;gap:2px;font-size:11px;font-weight:700;padding:1px 6px 1px 3px;border-radius:9px;background:#3a2414;color:var(--c)}.bya i{font-style:normal}.byl{margin-top:2px}'+
 '.byr{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}.byr span{font-size:11px;padding:1px 6px;border-radius:7px;background:#fff8;border:1px solid #c8a060}.byok{margin-top:6px;font-weight:800;color:#2a7a3a}.byhot{margin-top:6px;font-size:12px;font-weight:700;color:#a8401a}'+
 '.byp .bt{margin-top:6px}.byst{display:flex;justify-content:space-around;text-align:center}.byst b{display:block;font-size:20px}.byst small{font-size:11px;opacity:.75}'+
 '.byt{padding:5px 0;border-bottom:1px dashed #d8c098}.byt small{display:block;font-size:11px;opacity:.8}.byt.got b{color:#2a8a3a}.bylg{display:flex;justify-content:space-between;gap:6px;padding:3px 0;border-bottom:1px dashed #e0cca8;font-size:12.5px}.bylg small{opacity:.7;white-space:nowrap}'+
 '#btystp{position:fixed;left:50%;top:34%;transform:translate(-50%,-50%) rotate(-12deg) scale(2.2);opacity:0;pointer-events:none;z-index:9999;border:5px solid #d8281e;border-radius:12px;padding:6px 18px;color:#d8281e;text-align:center;font-family:system-ui;background:rgba(255,248,230,.55)}'+
 '#btystp b{display:block;font-size:30px;font-weight:900;letter-spacing:1px}#btystp small{display:block;font-size:18px;color:#e09a1a}#btystp.on{animation:btyst 2.2s ease-out forwards}'+
 '@keyframes btyst{0%{opacity:0;transform:translate(-50%,-50%) rotate(-12deg) scale(2.4)}12%{opacity:1;transform:translate(-50%,-50%) rotate(-12deg) scale(1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) rotate(-12deg) scale(1)}}';document.head.appendChild(st)}

/* ---------- ปุ่มเมนู · ทะเบียนของ/ฉายา/เวลา fx (หลังตัวแปรเดิมพร้อม) ---------- */
function btyBtn(){if($('byb'))return;const ref=$('wmm')||$('dgm')||$('qb');if(!ref||!ref.parentNode)return;const b=document.createElement('button');b.id='byb';b.innerHTML='<i>🎯</i><span>ค่าหัว</span><b class="bd"></b>';ref.parentNode.insertBefore(b,ref.nextSibling);
  b.onclick=()=>{try{$('mnp').hidden=true}catch(e){}BTYTAB='b';btyUI()}}
setTimeout(()=>{try{btyBtn()}catch(e){}
  try{Object.assign(FXD,{nmft:3.2,nmbw:.8,nmbx:.5,nmhl:.9,nmrw:.6,nmfw:1,nmfx:.7,nmpw:.9,nmpx:1.3,nmpb:.6,nmmw:1.4,nmmx:.6,nmsp:.7,nmk:1.6,nmbs:1.2});R27D.nmft=1;R27D.nmpx=1}catch(e){}
  try{if(!GDM.bty){const o={k:'bty',n:'เหรียญค่าหัว',ic:()=>'🎯',max:1e6,d:'ได้จากล้มมอนดังและปิดค่าหัว · แลกของที่กระดานค่าหัวกลางค่าย'};GOODS.push(o);GDM.bty=o}}catch(e){}
},0);
try{gdGet=(f=>function(k){if(k==='bty')return btySt().c;return f.apply(this,arguments)})(gdGet)}catch(e){}
try{gdSet=(f=>function(k,v){if(k==='bty'){btySt().c=Math.max(0,Math.min(1e6,Math.floor(+v||0)));return}return f.apply(this,arguments)})(gdSet)}catch(e){}
window.nmGM=function(af,st,el){/* ทดสอบ: เสกมอนดังข้างตัว (โฮสต์) · af = บิตคุณสมบัติ · st = ดาวค่าหัว */if(!isHost())return null;const L=Math.max(1,(WMLV[curMap]?WMLV[curMap][1]:me.lv)|0),t=st>=2?2:0,x=me.x+120,y=me.y,hp=mhp(t,L);
  const m={id:++mid,x,y,tx:x,ty:y,t,L,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:1,w:null,lg:0,el:el||1,nmb:1,elb:1};m.hp*=EKHP;m.mh*=EKHP;m.dmx=1.5;let c=(af|0)&511;c|=(7<<9);c|=((st|0)&3)<<15;nmMake(m,c);mons.push(m);return m.id};
