/* ===== v669 · วางของที่เหลือจากชุดค่าย (แมพ 1) =====
   - บ่อใหญ่ใหม่ปลายลำธาร (905,2430) ตกปลาได้ เดินลงน้ำไม่ได้ · ท่าตกปลาที่บ่อริมบึง · หินเหยียบข้ามลำธาร · สะพานหินตรงถนนฝั่งตะวันตกข้ามลำธาร
   - กำแพงหินเตี้ยขอบทุ่งดอกไม้บางแห่ง · ป้ายทาง + เสาโคมริมทางเดินทั้ง 4 ทิศ · จุดพักนักเดินทาง (กองไฟ ที่นอน กระสอบ คบเพลิง) · ม้านั่งซุง/ลังผักข้างบ่อริมบึง
   - ของทั้งหมดอบลงพื้น (ไม่กันเดิน) ยกเว้นบ่อใหญ่ · ต้นไม้ที่ทับบ่อ/จุดพักถูกเอาออก · ปิด: CPG.on=0 (บ่อใหญ่ยังอยู่เป็นบ่อเวกเตอร์) */
const CP9={pond:{x:905,y:2430,rx:122,ry:148,b:'w',ph:.6,big:1},camp:[760,1770],fish:[[1250,2345],[1396,2346]]};
function cp9Prune(){if(curMap!==1)return;const P=CP9.pond;let n=0;
    for(let i=trees.length-1;i>=0;i--){const t=trees[i];if(((t.x-P.x)/(P.rx+60))**2+((t.y-P.y)/(P.ry+60))**2<1||Math.hypot(t.x-CP9.camp[0],t.y-CP9.camp[1])<95||CP9.fish.some(([x,y])=>Math.hypot(t.x-x,t.y-y)<50)){trees.splice(i,1);n++}}
    for(let i=decor.length-1;i>=0;i--){const d=decor[i];if(((d.x-P.x)/(P.rx+30))**2+((d.y-P.y)/(P.ry+30))**2<1){decor.splice(i,1);n++}}CP9.tl=trees.length;CP9.dl=decor.length;return n}
fshBuild=(f0=>function(){const r=f0.apply(this,arguments);try{if(curMap===1){if(!FSW.some(w=>w.big))FSW.push(Object.assign({},CP9.pond));cp9Prune()}}catch(e){}return r})(fshBuild);
setInterval(()=>{try{if(curMap===1&&(trees.length!==CP9.tl||decor.length!==CP9.dl))cp9Prune()}catch(e){}},300);
/* ของที่อบลงชังก์พื้น */
function cp9Items(){const L=[],F=DEPF,R=depRng(9091);
  for(const f of F.L){if(f.k!=='trail')continue;const P=f.pts;for(let i=6;i<P.length-3;i++){const[x,y]=P[i],d=Math.hypot(x-CX,y-CY);if(d<560)continue;const[x2,y2]=P[i+1],l=Math.hypot(x2-x,y2-y)||1,nx=-(y2-y)/l,ny=(x2-x)/l;
      if(i===16){L.push(['SIGNPOST',x+nx*(f.w/2+16),y+ny*(f.w/2+16)+8,30,0])}else if(i%20===10){const s=(i/20|0)%2?1:-1;L.push(['LANTERN_POST',x+nx*s*(f.w/2+12),y+ny*s*(f.w/2+12)+6,22,s<0])}}}
  {const[x,y]=CP9.camp;L.push(['CAMPFIRE_SMALL',x,y+14,44,0],['BEDROLLS',x-46,y+4,34,0],['BEDROLLS',x+40,y+24,30,1],['SACKS',x+44,y-14,26,0],['TORCH_STAND',x-30,y-22,16,0],['WOODPILE',x+6,y-30,34,1])}
  L.push(['BENCH_LOG',CP9.fish[0][0],CP9.fish[0][1],40,0],['CRATES_OPEN',CP9.fish[1][0],CP9.fish[1][1],32,1]);
  {const P=CP9.pond;L.push(['REEDS_B',P.x-P.rx+8,P.y+40,40,0],['REEDS_A',P.x+P.rx-6,P.y-30,36,1],['BANK_ROCKS',P.x+P.rx-24,P.y+P.ry-6,44,0])}
  for(const f of F.L){if(f.k!=='meadow'||f.v%3!==1)continue;L.push(['_WALL',f.x-f.r*.75,f.y+f.r*.72,f.r*1.5,0])}
  try{const s=F.L.find(f=>f.k==='stream');if(s){const i=s.pts.length*.86|0,[x,y]=s.pts[i];L.push(['STEPPING_STONES',x,y+16,48,0])}}catch(e){}
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[k,x,y,w]of L){x0=Math.min(x0,x-w);x1=Math.max(x1,x+w*2);y0=Math.min(y0,y-w*2);y1=Math.max(y1,y+20)}return{L:L.sort((a,b)=>a[2]-b[2]),bb:[x0,y0,x1,y1]}}
depBuild=(f0=>function(){const F=f0.apply(this,arguments);try{if(curMap===1&&F&&F.L&&!F.L.some(f=>f.k==='cpx')){const q=cp9Items();F.L.push({k:'cpx',w:0,L:q.L,bb:q.bb})}}catch(e){console.warn('cp9',e)}return F})(depBuild);
depPaintF=(f0=>function(c,f,th){if(f&&f.k==='cpx'){if(curMap===1&&cpOk()){try{for(const[k,x,by,w,fl]of f.L){if(k==='_WALL'){const r=CPG.M.FENCE_STONE_H,h=17,tl=h*r[2]/r[3];cpShd(c,x+w/2,by+1,w*.52,4,.3);c.save();c.beginPath();c.rect(x,by-h-2,w,h+4);c.clip();for(let u=x;u<x+w;u+=tl-.5)c.drawImage(CPG.I.a,r[0],r[1],r[2],r[3],u,by-h,tl,h);c.restore();continue}
      if(k==='STEPPING_STONES'){cpSpr(c,k,x,by,w,fl);continue}cpShd(c,x+2,by-1,w*.42,Math.max(2.5,w*.1),.3);cpSpr(c,k,x,by,w,fl)}}catch(e){console.warn('cpx',e)}}return}return f0.apply(this,arguments)})(depPaintF);
/* บ่อใหญ่ใช้ภาพบ่อใหญ่ · ท่าตกปลาที่บ่อริมบึง */
cpPond=(f0=>function(w){if(!w.big){f0.apply(this,arguments);try{if(inView(w.x,w.y,w.rx+60)){const x=w.x+34,by=w.y+w.ry+16;cpShd(g,x+2,by-2,18,4,.3);cpSpr(g,'FISHING_DOCK',x,by,42,0)}}catch(e){}return}
  const r=CPG.M.POND_LARGE;if(!r||!inView(w.x,w.y,w.ry+80))return;const save=CPG.M.POND_SMALL;CPG.M.POND_SMALL=r;try{f0.apply(this,arguments)}finally{CPG.M.POND_SMALL=save}})(cpPond);
/* สะพานหินตรงถนนฝั่งตะวันตกข้ามลำธาร (อบลงแคชพื้นค่าย ก่อนรั้ว/เสาประตู) */
campHDStatic=(f0=>function(){f0.apply(this,arguments);try{if(curMap===1&&cpOk()){const F=depBuild(),s=F.L.find(f=>f.k==='stream');if(s){let b=null,bd=1e9;for(const p of s.pts){const d=Math.abs(p[1]-CY);if(d<bd&&p[0]<CX){bd=d;b=p}}
      if(b&&bd<60){const x=b[0]-CX;cpShd(g,x+3,22,48,6,.35);cpSpr(g,'BRIDGE_STONE',x,26,98,0)}}}}catch(e){console.warn('cp9 bridge',e)}})(campHDStatic);
