/* ---------- v597 จัดของที่ภาพซ้อนกันแบบไม่เป็นธรรมชาติ (ย่านวงแหวนล่าง 31 · นครรากลึก 44 · ฐานแผ่นดิน 45) ----------
   ตอนสร้างแมพ: คำนวณกรอบภาพจริงของแต่ละชิ้น (ขนาดภาพ HD) → ถ้าสองชิ้นยืนแถวเดียวกัน (ฐานห่างกัน <40) แล้วภาพทับกัน หรือทับกันเกิน 35%
   · ของประดับเล็ก (เห็ดจิ๋ว) → เอาออก · ของย้ายได้ (เห็ดยักษ์ หินงอก โคม ลังไม้ กองหิน) → เลื่อนไปจุดว่างใกล้ ๆ ที่ยังอยู่บนพื้นที่วางของได้ (ไม่ทับทาง/ประตู/รัง)
   · ชาวบ้านยืนจมในบ้าน → ขยับออกมายืนหน้าบ้าน · แผงตลาดทับรถเข็นเอด้า → เลื่อนแผงออก
   ใช้กับทั้งภาพ HD และภาพเดิม (ตำแหน่งเดียวกัน) · รายงานล่าสุด: OVF.log · ปิด: OVF.off=1 (มีผลตอนเข้าแมพครั้งถัดไป) */
const OVF={off:0,log:[],
  mv:{pbmush:1,pbstag:1,pblamp:1,bcrate:1,mrub:1},rm:{pbshroom:1},fix:{mstall:1}};
function ovfBox(t,mp){const A=mp===31?MKA:RTA,m=A.m[t.k];let w,h,y=t.y;
  if(m){const q=m[(t.v|0)%m.length],sc=(t.k==='pbmush'||t.k==='pbstag')?(t.sc||1):1,f=A.f[q[0]];w=q[1]*sc;h=w*f[3]/f[2];if(t.k==='pbwell')y+=PBW.r*.62}
  else if(t.k==='meda'){w=104;h=120}else if(t.k==='mhed'){w=110;h=110}else if(t.k==='mstage'){w=(t.hw||120)*2+16;h=110}else if(t.k==='mfount'||t.k==='mlant'||t.k==='mgate')return null;else if(t.k==='pbshroom'){w=26*(t.sc||1);h=28*(t.sc||1)}else if(t.k==='pbfolk'){w=34;h=50}else if(t.k==='bcrate'){w=40;h=36}
  else if(t.k.startsWith('pb')||t.k.startsWith('m')){w=(t.r||30)*2;h=(t.r||30)*2.4}else return null;
  return {t,x:t.x,y,w,h}}
function ovfHit(a,b){const ox=Math.min(a.x+a.w/2,b.x+b.w/2)-Math.max(a.x-a.w/2,b.x-b.w/2);if(ox<=0)return 0;const oy=Math.min(a.y,b.y)-Math.max(a.y-a.h,b.y-b.h);if(oy<=0)return 0;
  const ar=ox*oy/Math.min(a.w*a.h,b.w*b.h),dy=Math.abs(a.y-b.y);if(a.t.k==='pbmush'&&b.t.k==='pbmush'&&ox>Math.min(a.w,b.w)*.2&&oy>Math.min(a.h,b.h)*.3&&dy<170)return Math.max(ar,.36);return (dy<40&&ox>Math.min(a.w,b.w)*.15)||(ar>.35&&dy<120)?ar:0}
function ovfOk(mp,M,x,y){try{if(mp===44)return pbIn(x,y,70)&&pbSegD(x,y)>46&&(M.gates||[]).every(G=>Math.hypot(x-G.x,y-G.y)>130)&&(M.nests||[]).every(([a,b])=>Math.hypot(x-a,y-b)>120)&&Math.hypot(x-M.sx,y-M.sy)>(M.sr||0)+80;
  if(mp===45)return pzK(x,y,44)>=0&&!pzSafe(x,y)&&pzOnB(x,y,-28)<0&&(M.nests||[]).every(([a,b])=>Math.hypot(x-a,y-b)>90)&&PZJ.every(([a,b])=>Math.hypot(x-a,y-b)>100);
  if(mp===31){const d=mktD(x,y);return d>420&&d<MKR-70&&Math.abs(x-1600)>110&&Math.abs(y-MKC.y)>110&&Math.abs(d-640)>90}}catch(e){}return false}
function ovfRun(mp,M){if(OVF.off)return;const log=OVF.log=[],MV=[];let B=[];for(const t of trees){if(!t.k||t.inv)continue;const b=ovfBox(t,mp);if(b)B.push(b)}
  const others=(b)=>B.filter(o=>o!==b&&ovfHit(b,o));
  for(let pass=0;pass<6;pass++){let ch=0;
    for(const b of B.slice()){if(!B.includes(b))continue;const H=others(b);if(!H.length)continue;const k=b.t.k;
      /* หาว่าใครควรขยับ */
      const tgt=OVF.rm[k]||OVF.mv[k]||OVF.fix[k]||k==='pbfolk'?b:null;if(!tgt)continue;
      if(OVF.rm[k]){const i=trees.indexOf(b.t);if(i>=0)trees.splice(i,1);B.splice(B.indexOf(b),1);MV.push([b.t.x,b.t.y]);log.push(['ลบ',k,b.x|0,b.y|0]);ch++;continue}
      if(k==='pbfolk'){const hut=H.find(o=>o.t.k==='pbhut');if(hut&&b.t.y<hut.y+48){MV.push([b.t.x,b.t.y,b.t.x,hut.y+48]);b.t.y=b.y=hut.y+48;log.push(['ชาวบ้านออกหน้าบ้าน',b.x|0,b.y|0]);ch++}continue}
      if(OVF.fix[k]){const ob=H.find(o=>o.t.k==='meda'||o.t.k==='mstage'||o.t.k==='mhed');if(ob){const sx=Math.sign(b.x-ob.x)||1,sy=Math.sign(b.y-ob.y)||1;for(const[dx,dy]of[[sx*30,0],[sx*50,0],[0,sy*40],[sx*40,sy*30],[0,sy*60],[sx*75,0],[sx*60,sy*50]]){const c={t:b.t,x:b.t.x+dx,y:b.y+dy,w:b.w,h:b.h};if(B.some(o=>o!==b&&ovfHit(c,o)))continue;MV.push([b.t.x,b.t.y,b.t.x+dx,b.t.y+dy]);b.t.x+=dx;b.t.y+=dy;b.x=b.t.x;b.y=b.t.y;log.push(['เลื่อน',k,b.x|0,b.y|0]);ch++;break}}continue}
      /* ของย้ายได้: ถ้าชนกับของย้ายได้อีกชิ้นที่เล็กกว่า ให้ชิ้นเล็กขยับแทน */
      if(H.every(o=>OVF.mv[o.t.k]&&o.w*o.h<b.w*b.h))continue;
      const x0=b.t.x,y0=b.t.y,yo=b.y-b.t.y;let done=0;
      for(let r=30;r<=190&&!done;r+=15)for(let i=0;i<14&&!done;i++){const a=i/14*6.2832+r*.07,x=x0+Math.cos(a)*r,y=y0+Math.sin(a)*r*.8;if(!ovfOk(mp,M,x,y))continue;
        const c={t:b.t,x,y:y+yo,w:b.w,h:b.h};if(B.some(o=>o!==b&&ovfHit(c,o)))continue;b.t.x=b.x=x;b.t.y=y;b.y=y+yo;done=1}
      if(done){MV.push([x0,y0,b.t.x,b.t.y]);b.t._nv=undefined;log.push(['ย้าย',k,x0|0,y0|0,'→',b.x|0,b.t.y|0]);ch++}
      else if(k!=='pblamp'&&(k!=='pbmush'||H.some(o=>ovfHit(b,o)>.45))){const i=trees.indexOf(b.t);if(i>=0)trees.splice(i,1);B.splice(B.indexOf(b),1);MV.push([x0,y0]);log.push(['ลบ (ไม่มีที่ว่าง)',k,x0|0,y0|0]);ch++}}
    if(!ch)break}
  try{if(mp===44||mp===45){PBN.lamps=trees.filter(t=>t.k==='pblamp').map(t=>[t.x,t.y]);PBN.mush=trees.filter(t=>t.k==='pbmush').map(t=>[t.x,t.y,t.sc||1,t.v|0])}}catch(e){}
  /* ย้ายเงาพื้น (ao) ตามของ */
  try{const D=mp===31?MKT.dec:PAL.dec;for(const m of MV){const i=D.findIndex(d=>d.k==='ao'&&d.x===m[0]&&d.y===m[1]);if(i<0)continue;if(m.length<4){D.splice(i,1);continue}const d=D[i];d.x=m[2];d.y=m[3];d.b=[m[2]-70,m[3]-30,m[2]+70,m[3]+40]}}catch(e){}}
setTimeout(()=>{try{for(const[fn,mp]of[['pbBuild',44],['pzBuild',45],['mktBuild',31]]){const o=window[fn];if(typeof o!=='function')continue;
    const w=function(M){const r=o.apply(this,arguments);try{ovfRun(mp,M)}catch(e){console.warn('ovf',e)}return r};
    if(fn==='pbBuild')window.pbBuild=pbBuild=w;else if(fn==='pzBuild')window.pzBuild=pzBuild=w;else window.mktBuild=mktBuild=w}}catch(e){console.warn('ovf',e)}},1900);
