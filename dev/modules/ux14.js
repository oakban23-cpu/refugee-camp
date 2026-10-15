/* ---------- v385: ออโต้เควสเดินฉลาดขึ้น ----------
   เดิมตารางหาทางรู้จักแค่ต้นไม้/ของประดับ → เส้นทางตัดผ่านที่ราบสูง/หน้าผา (ระบบภูมิประเทศ) และปากหลุมอเวจี (แมพ 11)
   ตัวละครจึงไปติดขอบผาแล้วเดินกลับไปกลับมา  ตอนนี้: ตารางแยกตามระดับพื้น (ล่าง/บนที่ราบ)
   ตัวบันไดไม่นับเป็นทางผ่าน (กันเดินลัดเข้าบันไดแล้วโดนดึงกลับไปมา) · เป้าคนละระดับ/คนละที่ราบ → วางทางไปบันไดที่ใกล้สุด แล้วเดินผ่านบันไดจนสุดอีกฝั่งก่อน · ขึ้น-ลงบันไดแล้ววางทางใหม่ทันที */
let AQL=0,AQOB=[],AQEL=[];const AQGC={m:-1,c:{}},AQLV={lv:-9,k:''};
/* สิ่งกีดขวางอื่นที่ชนได้จริงแต่ตารางเดิมไม่รู้จัก: เสา/กำแพงป้อม (แมพ 19) · แลนด์มาร์ก · จุดพักประจำแมพ · บ่อปลา */
function aqObs(){const O=[],E=[];try{if(curMap===11){buildVoid();VDF.forEach(f=>{if(f.k==='maw'||f.k==='husk')O.push([f.x,f.y,f.r+11])})}}catch(e){}try{if(curMap===19){const F=FORT;F.cols.forEach(([x,y,r])=>O.push([F.x+x,F.y+y,r+6]))}}catch(e){}
  try{if(LMS[curMap])lmList(curMap).forEach(q=>{const r=LMT[q.t].r*1.35;if(r)O.push([q.x,q.y,r+6])})}catch(e){}
  try{const P=OUTP[curMap];if(P)P.cols.forEach(([x,y,r])=>O.push([SX+x,SY+y,r+6]))}catch(e){}
  try{if(FSWM===curMap)FSW.forEach(w=>E.push([w.x,w.y,w.rx+12,w.ry+10]))}catch(e){}AQOB=O;AQEL=E}
function aqFort(x,y){if(curMap!==19)return false;try{const F=FORT,dx=x-F.x,dy=y-F.y,d=Math.hypot(dx,dy);if(Math.abs(d-F.R)>=23)return false;const a=Math.atan2(dy,dx);
  return !F.GA.some(g0=>Math.abs(Math.atan2(Math.sin(a-g0),Math.cos(a-g0)))*F.R<F.GAP*F.R-22)}catch(e){return false}}
/* บันไดที่ใช้ได้จริง: หัวบันไดต้องอยู่บนที่ราบ ตีนบันไดต้องอยู่พื้นล่าง (เจอบันไดเสียในแมพ 6 และ 10 ที่หัวบันไดหลุดขอบที่ราบ) */
function aqStOk(q){if(q._ok===undefined){const a=terLv(q.top[0],q.top[1]),b=terLv(q.bot[0],q.bot[1]);q._ok=(a===1||a===2)&&(b===0||b===2)}return q._ok}
function aqStList(P){const L=P.st.filter(aqStOk);return L.length?L:P.st}
function aqTer(){try{return terGet()}catch(e){return null}}
function aqLvAt(x,y){if(!aqTer())return 0;const L=terLv(x,y);return L<0?0:L}
setTimeout(()=>{try{
  const _wk=aqWalkable;window.aqWalkable=aqWalkable=function(x,y){if(!_wk(x,y))return false;
    for(const o of AQOB)if(Math.abs(x-o[0])<o[2]&&Math.abs(y-o[1])<o[2]&&Math.hypot(x-o[0],y-o[1])<o[2])return false;
    for(const e of AQEL){const u=(x-e[0])/e[2],v=(y-e[1])/e[3];if(u*u+v*v<1)return false}
    if(aqFort(x,y))return false;
    if(aqTer()){const L=terLv(x,y);if(L!==AQL)return false}
    return true};
  const _gr=aqGrid;window.aqGrid=aqGrid=function(){const L=aqTer()?AQL:0,k=curMap+':'+trees.length+':'+L+':'+(typeof FSWM!=='undefined'&&FSWM===curMap?FSW.length:'x');
    if(AQGC.m!==curMap){AQGC.m=curMap;AQGC.c={}}const c=AQGC.c[k];if(c)return c;aqObs();AQP.gk=null;const G=_gr();AQGC.c[k]=G;return G};
  const _pa=aqPath,pa=(sx,sy,tx,ty,L)=>{AQL=L;return _pa(sx,sy,tx,ty)};
  /* วางทางข้ามระดับ: A/B = ระดับต้นทาง/ปลายทาง (0 ล่าง · 1 บนที่ราบ) */
  const plan=(sx,sy,A,tx,ty,B,dp)=>{const Ps=A===1?terPlat(sx,sy):null,Pt=B===1?terPlat(tx,ty):null;
    if(A===B&&(A===0||Ps===Pt))return pa(sx,sy,tx,ty,A);if(dp>2)return null;
    const Pq=A===1?Ps:Pt;if(!Pq||!Pq.st||!Pq.st.length)return null;let best=null,bd=1e9;
    for(const q of aqStList(Pq)){const e0=A===1?q.top:q.bot,e1=A===1?q.bot:q.top,d=Math.hypot(e0[0]-sx,e0[1]-sy)+Math.hypot(tx-e1[0],ty-e1[1]);if(d<bd){bd=d;best=[e0,e1]}}
    const P1=pa(sx,sy,best[0][0],best[0][1],A);if(!P1)return null;const R=plan(best[1][0],best[1][1],1-A,tx,ty,B,dp+1);return P1.concat([best[1]],R||[[tx,ty]])};
  window.aqPath=aqPath=function(sx,sy,tx,ty){if(!aqTer()){AQL=0;return _pa(sx,sy,tx,ty)}
    let a=terLv(sx,sy),b=terLv(tx,ty);const B=b===1?1:0;let P=null;
    try{if(a===2){/* ยืนบนบันได: ออกปลายที่ถูกฝั่งก่อน */const q=terStairAt(sx,sy),Pq=terGet().find(T=>T.st.includes(q)),up=B===1&&terPlat(tx,ty)===Pq,e=up?q.top:q.bot;
        const R=plan(e[0],e[1],up?1:0,tx,ty,B,1);P=[e].concat(R||[[tx,ty]])}
      else P=plan(sx,sy,a===1?1:0,tx,ty,B,0)}catch(e){P=null}
    if(P&&P.length)return P;AQL=a===1?1:0;return _pa(sx,sy,tx,ty)};
}catch(e){console.warn('aq14',e)}},60);
/* ออโต้ล่า/เดินข้ามระดับของเดิม (terWay) เลือกบันไดเสียได้ → กรองแบบเดียวกัน */
setTimeout(()=>{try{const _tw=terWay;window.terWay=terWay=function(tx,ty){const T=aqTer();if(!T)return null;const a=terLv(me.x,me.y),b=terLv(tx,ty);
  if(a===b||b===2||b<0||a<0||a===2)return _tw(tx,ty);const P=a===1?terPlat(me.x,me.y):terPlat(tx,ty);if(!P||!P.st.length)return null;let best=null,bd=1e9;
  for(const s of aqStList(P)){const e=a===1?s.top:s.bot,d=Math.hypot(e[0]-me.x,e[1]-me.y)+Math.hypot(tx-e[0],ty-e[1]);if(d<bd){bd=d;best=s}}
  const e=a===1?best.top:best.bot;return Math.hypot(e[0]-me.x,e[1]-me.y)<16?(a===1?best.bot:best.top):e}}catch(e){console.warn('aq14t',e)}},60);
/* ขึ้น/ลงบันไดเสร็จ → ล้างเส้นทางเก่าให้วางใหม่ตามระดับใหม่ (ห่อหลังตัวห่อเดิมที่ติดตั้งตอน 80ms) */
setTimeout(()=>{try{const _aw=aqWalk;window.aqWalk=aqWalk=function(tx,ty,dt,C){
  if(curMap!==1&&aqTer()){const L=terLv(me.x,me.y);if(L===0||L===1){if(AQLV.k===curMap+''&&AQLV.lv!==L)AQP.key=null;AQLV.lv=L;AQLV.k=curMap+''}}
  return _aw(tx,ty,dt,C)}}catch(e){console.warn('aq14w',e)}},200);
/* ต้นไม้/ของประดับที่งอกทับหัว-ตีนบันได → ทางขึ้นลงตัน (เจอในแมพ 15) · ล้างออกตอนเข้าแมพ (ผลเหมือนกันทุกเครื่อง) */
function aqStairClear(){const T=aqTer();if(!T)return 0;let n=0;
  for(let i=trees.length-1;i>=0;i--){const t=trees[i];if(!(t.r>0)||t.nc)continue;let hit=false;
    for(const P of T){for(const q of P.st){const r=q.r;if(t.x>r[0]-t.r-14&&t.x<r[2]+t.r+14&&t.y>r[1]-t.r-14&&t.y<r[3]+t.r+14){hit=true;break}
      if(Math.hypot(t.x-q.top[0],t.y-q.top[1])<t.r+34||Math.hypot(t.x-q.bot[0],t.y-q.bot[1])<t.r+34){hit=true;break}}if(hit)break}
    if(hit){trees.splice(i,1);n++}}return n}
{const o=enterMap;enterMap=function(){const r=o.apply(this,arguments);try{if(!isDg())aqStairClear()}catch(e){}return r}}
