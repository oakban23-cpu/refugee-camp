/* v553 บอทเล่นดันเจี้ยน (ทดสอบสมดุล) · ติดตั้งครั้งเดียวต่อหน้า · ทำงานทุกสเต็ปของเกม (ห่อ updateMe)
   นโยบายเหมือนผู้เล่นทั่วไปที่ตั้งใจเล่น: ออโต้สกิลเปิด · หลบวงเตือนหลังเห็น 0.35 วิ · กลิ้งหลบตอนหนีไม่ทัน · กินยาเมื่อเลือด < 50%
   · ฟื้นตรงนี้หลังล้ม 1.2 วิ · ทำภารกิจของดัน (วงยก/ราก/ไข่/เท้า) ตามลำดับความสำคัญ */
(()=>{if(window.BOT)return;
const BOT=window.BOT={imp:[],on:false,cfg:{react:.35,dodge:.7,potHp:.5,potMp:.3,revive:1,revD:1.2,block:0,kite:1,circle:-1,rank:0,np:1},
  t:0,st:null,Z:[],seen:new WeakMap(),err:'',log:[]};
const now=()=>performance.now()/1000;
BOT.reset=function(){BOT.t=0;BOT.Z=[];BOT.N={};BOT.st={t:0,deaths:0,revives:0,pots:0,mpots:0,taken:0,hurtN:0,minHp:1,big:0,dodges:0,hitBy:{},zones:{},end:null,samp:[],bossT0:null,bossDmg:0,
  wsI:0,wsF:0,gnI:0,gnF:0,eggC:0,eggH:0,brk:0,wtIn:0,wtOut:0,burB:0,burN:0,down0:0,lastDown:0,hp0:me.hp,inv0:me.inv.hp,minv0:me.inv.mp}};
/* ---------- รับวงเตือนจาก fx (ใช้ได้ทั้งโฮสต์และสมาชิก) ---------- */
const add=(z)=>{z.t0=now();z.e=z.t0+z.d;z.ign=Math.random()<(BOT.cfg.miss||0);BOT.Z.push(z);if(BOT.Z.length>80)BOT.Z.splice(0,BOT.Z.length-80)};
const oh=handleFx;window.handleFx=handleFx=function(o){try{if(BOT.on&&o&&o.k)botFx(o)}catch(e){BOT.err='fx:'+e}return oh.apply(this,arguments)};
/* v560: ต้องไปยืนในที่ปลอดภัย (กรด/ดำลงเมฆ/วงเพลง/ขีดทอง/บ่อแสง) · ใช้เวลาตอบสนอง/มองไม่เห็นเหมือนวงเตือน */
BOT.N={};
function setNeed(key,ok,pts,dur){const t=now(),q=BOT.N[key];if(q&&q.e>t){q.e=t+Math.max(.1,dur);q.ok=ok;q.pts=pts;return}BOT.N[key]={key,ok,pts,t0:t,e:t+Math.max(.1,dur),ign:Math.random()<(BOT.cfg.miss||0)}}
const wbSafePts=()=>{const P=[];try{for(const r of WBRB)if(r<WBXM+20)P.push([r,Math.max(CY-wbHH(r)+30,Math.min(CY+wbHH(r)-30,me.y))]);for(const p of WBPL)P.push(p)}catch(e){}return P};
const shipPts=()=>{const P=[];try{for(let k=0;k<6;k++)for(const r of[360,450,540])P.push([CX+Math.cos(WSSH[k])*r,CY+Math.sin(WSSH[k])*r])}catch(e){}return P};
function botFx(o){const k=o.k;
  if(k==='tele')add({k:'c',x:+o.x,y:+o.y,r:+o.r,ky:1,d:+o.dur||1.3,n:'tele'});
  else if(k==='ptdl')(o.l||[]).forEach(l=>add({k:'s',l,w:46,d:+o.dur||1.5,n:'fissure'}));
  else if(k==='pnqa')add({k:'cone',x:+o.x,y:+o.y,a:+o.a,r:+o.r,w:+o.w,d:+o.dur||1.1,n:'acid'});
  else if(k==='pnqr')(o.p||[]).forEach((p,i)=>add({k:'c',x:+p[0],y:+p[1],r:58,ky:2,d:(+o.d||1.5)+i*.06,n:'rock'}));
  else if(k==='ptdb'){const P=o.p||[],e=P[P.length-1];if(e)add({k:'c',x:+e[0],y:+e[1],r:120,ky:1,d:+o.d||3.4,n:'erupt',soft:1,i:o.i})}
  else if(k==='pfnw'){if((o.u||[]).includes(uid))add({k:'wt',d:+o.d||2,n:'weight'})}
  else if(k==='wvnd')(o.a||[]).forEach(a=>add({k:'ray',a:+a,d:+o.d||1.2,n:'needle'}));
  else if(k==='wvrp')(o.p||[]).forEach(p=>add({k:'c',x:+p[0],y:+p[1],r:70,ky:1.3,d:+o.d||1.4,n:'bind'}));
  else if(k==='wvsp')(o.s||[]).forEach(i=>add({k:'spoke',i:+i,d:+o.d||1.4,n:'spoke'}));
  else if(k==='wvmp')(o.p||[]).forEach(p=>add({k:'c',x:+p[0],y:+p[1],r:72,ky:1.4,d:+o.d||1.3,n:'meteor'}));
  /* v560 ภาค 8–9 */
  else if(k==='gdc')(o.p||[]).forEach(p=>add({k:'c',x:+p[0],y:+p[1],r:72,ky:1.6,d:+o.d||1.5,n:'cannon'}));
  else if(k==='gdb')add({k:'hp',s:+o.s,y:CY,m:24,d:+o.d||1.7,n:'boom'});
  else if(k==='gda'){if(o.u===uid)add({k:'s',l:[+o.x0,+o.y0,+o.x1,+o.y1],w:54,d:+o.d||1,n:'anchor'})}
  else if(k==='gdbr')(o.y||[]).forEach((y,i)=>add({k:'lane',y:+y,w:30,d:4.1+i*.65,n:'barrel'}));
  else if(k==='wbt')(o.a||[]).forEach(a=>add({k:'rayp',x:+o.x,y:+o.y,a:+a,L:640,w:44,d:+o.d||1.4,n:'tentacle'}));
  else if(k==='wbd')add({k:'c',x:+o.x,y:+o.y,r:150,ky:1.3,d:+o.d||4.2,n:'drain'});
  else if(k==='wbq')add({k:'fn',f:'wbOuter',d:+o.d||1.6,n:'squeeze'});
  else if(k==='wbv'){if(+o.ac>=1)setNeed('acid',(x,y)=>!(wblIn(x,y,0)&&!wbSafe(x,y)),wbSafePts,+o.ac===1?+o.at+4.5:+o.at)}
  else if(k==='wsb')add({k:'rayp',x:+o.x,y:+o.y,a:+o.a,L:720,w:46,d:+o.d||1.4,n:'beam'});
  else if(k==='wsf'){if(o.k2==='tl')add({k:'fn',f:'wsTail',d:+o.d||1.8,n:'tail'});else add({k:'c',x:+o.x,y:+o.y,r:+o.r||190,ky:1.2,d:+o.d||1.5,n:'fin'})}
  else if(k==='wsl')(o.p||[]).forEach(p=>add({k:'c',x:+p[0],y:+p[1],r:72,ky:1.4,d:+o.d||1.3,n:'bolt'}));
  else if(k==='wsv'){if(+o.dv>=1)setNeed('dive',(x,y)=>wskShip(x,y)>=0,shipPts,+o.dv===1?+o.dt+6:+o.dt);
    if(+o.sw>=1&&o.c&&o.c.length){const P=o.c.map(p=>[+p[0],+p[1]]);setNeed('song',(x,y)=>P.some(([cx,cy])=>Math.hypot(x-cx,y-cy)<80),P,+o.sw===1?+o.st+4:+o.st)}}
  else if(k==='ctg')(o.p||[]).forEach(p=>add({k:'c',x:+p[0],y:+p[1],r:70,ky:1.4,d:+o.d||1.3,n:'gear'}));
  else if(k==='ctv'){if(+o.ts>=1&&o.lit&&o.lit.length){const P=o.lit.map(i=>CTMK[i]);setNeed('stop',(x,y)=>P.some(([px,py])=>Math.hypot(x-px,y-py)<58),P,+o.ts===1?+o.tt+3.5:+o.tt)}}
  else if(k==='cwsp')(o.s||[]).forEach(i=>add({k:'cws',i:+i,d:+o.d||1.4,n:'spoke9'}));
  else if(k==='cwfp'){const P=(o.p||[]).map(p=>[+p[0],+p[1]]);setNeed('fear',(x,y)=>P.some(([px,py])=>Math.hypot(x-px,(y-py)*1.3)<76),P,+o.d||2.6)}
  else if(k==='pfnws'&&BOT.st){if(o.s==='int')BOT.st.wsI++;if(o.s==='done')BOT.st.wsF++}
  else if(k==='pnqg'&&BOT.st){if(o.s==='int')BOT.st.gnI++;if(o.s==='end')BOT.st.gnF++}
  else if(k==='pnqcr'&&BOT.st)BOT.st.eggC++;else if(k==='pnqht'&&BOT.st)BOT.st.eggH++;
  else if(k==='ptde'&&BOT.st){BOT.st.burN++;if(o.b)BOT.st.burB++}
  else if(k==='u60b'&&BOT.st)BOT.st.brk++;
  const IM={bhit:'boss',bnova:'nova',ptde:'erupt',ptdls:'fissure',pnqas:'acid',pfnwl:'weight',bslam:'tele',vortex:'tele',tent:'tele',wvnx:'needle',wvrx:'bind',wvsx:'spoke',wvmx:'meteor',gdcx:'cannon',gdbx:'boom',gdax:'anchor',wbtx:'tentacle',wbqx:'squeeze',wsbx:'beam',wslx:'bolt',ctgx:'gear',cwsx:'spoke9',cwfx:'fear'};
  if(IM[k]){BOT.imp.push({n:IM[k],t:now(),x:+o.x,y:+o.y,r:+o.r||0});if(BOT.imp.length>40)BOT.imp.shift()}
}
const segD=(px,py,l)=>{const dx=l[2]-l[0],dy=l[3]-l[1],t=Math.max(0,Math.min(1,((px-l[0])*dx+(py-l[1])*dy)/(dx*dx+dy*dy||1)));return Math.hypot(px-l[0]-dx*t,py-l[1]-dy*t)};
const onRay=(x,y,a,w)=>{const dx=Math.cos(a),dy=Math.sin(a),px=x-CX,py=y-CY,t=px*dx+py*dy;return t>40&&t<(typeof WVRR!=='undefined'?WVRR:560)+30&&Math.abs(px*dy-py*dx)<w};
function inZ(x,y,z,pad){pad=pad||0;
  if(z.k==='c')return Math.hypot(x-z.x,(y-z.y)*(z.ky||1))<z.r+pad;
  if(z.k==='s')return segD(x,y,z.l)<z.w+pad;
  if(z.k==='cone'){const dx=x-z.x,dy=y-z.y,d=Math.hypot(dx,dy);if(d>z.r+pad)return false;const da=Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-z.a),Math.cos(Math.atan2(dy,dx)-z.a)));return da<z.w+Math.atan2(pad,Math.max(1,d))};
  if(z.k==='ray')return onRay(x,y,z.a,40+pad);
  if(z.k==='spoke')return onRay(x,y,z.i*Math.PI/4,40+pad)&&Math.hypot(x-CX,y-CY)>70;
  if(z.k==='hp')return (y-z.y)*z.s>-z.m-pad;
  if(z.k==='lane')return Math.abs(y-z.y)<z.w+pad;
  if(z.k==='rayp'){const dx=Math.cos(z.a),dy=Math.sin(z.a),px=x-z.x,py=y-z.y,t=px*dx+py*dy;return t>-pad&&t<z.L+pad&&Math.abs(px*dy-py*dx)<z.w+pad}
  if(z.k==='fn'){try{if(z.f==='wbOuter')return wbOuter(x,y)||(pad>0&&(wbOuter(x,y+Math.sign(y-CY)*pad)));if(z.f==='wsTail')return y>CY+110-pad&&wskIn(x,y,0)}catch(e){}return false}
  if(z.k==='cws'){const a=CWSP[z.i],dx=Math.cos(a),dy=Math.sin(a),px=x-CX,py=y-CY,t=px*dx+py*dy;return t>70-pad&&t<CWR+20+pad&&Math.abs(px*dy-py*dx)<46+pad}
  return false}
/* ---------- พื้นที่เดินได้ / สิ่งกีดขวาง ---------- */
const arenaR=()=>{const M=MAPS[curMap]||{};return M.wvr?(typeof WVRR!=='undefined'?WVRR:560)-30:M.ctw?(typeof CTR!=='undefined'?CTR:560)-30:M.cwn?(typeof CWR!=='undefined'?CWR:540)-30:M.wsk?(typeof WSAR!=='undefined'?WSAR:620)-40:DR-24};
function okPos(x,y){try{if(typeof GDLI==='function'&&GDLI())return gdlIn(x,y,30);if(typeof WBLI==='function'&&WBLI())return wblIn(x,y,30)}catch(e){}if(Math.hypot(x-CX,y-CY)>arenaR())return false;
  if(typeof PTDI==='function'&&PTDI()&&Math.hypot(x-CX,y-CY)<(typeof PTTR!=='undefined'?PTTR:126)+22)return false;
  if(typeof PNQI==='function'&&PNQI()&&pnqFootIn(x,y,26))return false;return true}
function steer(tx,ty){
  if(typeof PTDI==='function'&&PTDI()){try{const w=ptSteer(me.x,me.y,tx,ty);return w}catch(e){}}
  if(typeof PNQI==='function'&&PNQI()){/* อ้อมเท้าธรณิน (วงรีทางเหนือ) */const steps=12;for(let i=1;i<=steps;i++){const u=i/steps,x=me.x+(tx-me.x)*u,y=me.y+(ty-me.y)*u;if(pnqFootIn(x,y,30)){const s=me.x<PNF.x?-1:1;return[PNF.x+s*(PNF.rx+70),PNF.y+PNF.ry+40]}}}
  return[tx,ty]}
function go(tx,ty,stop){const[wx,wy]=steer(tx,ty),dx=wx-me.x,dy=wy-me.y,d=Math.hypot(dx,dy);if(Math.hypot(tx-me.x,ty-me.y)<=stop||d<2){joy=null;return true}
  joy={ox:JB.x,oy:JB.y,dx:dx/d*40,dy:dy/d*40,t0:performance.now(),mv:1};return false}
/* ---------- หาจุดหนี ---------- */
function escapeFrom(Zs,pref,extra){const pad=16,cand=[];for(let a=0;a<16;a++)for(const r of[30,55,85,120,165,220,290]){const x=me.x+Math.cos(a/16*6.283)*r,y=me.y+Math.sin(a/16*6.283)*r;if(!okPos(x,y))continue;cand.push([x,y,r])}
  if(extra)for(const[x,y]of extra){if(okPos(x,y))cand.push([x,y,Math.hypot(x-me.x,y-me.y)])}
  let best=null,bs=1e9;for(const[x,y,r]of cand){let bad=0;for(const z of Zs)if(inZ(x,y,z,pad))bad++;const sc=bad*1e4+r+(pref?Math.hypot(x-pref[0],y-pref[1])*.35:0);if(sc<bs){bs=sc;best=[x,y]}}return best}
/* ---------- เป้าหมาย / จุดยืน ---------- */
const C=()=>CL[me.cls],rgOf=()=>(C().rg+M('rg')),melee=()=>!!C().melee;
const boss=()=>mons.find(m=>m.t===3&&m.hp>0&&!m.pv);
const near=(f,x,y)=>{let b=null,bd=1e9;mons.forEach(m=>{if(m.hp<=0||!f(m))return;const d=Math.hypot(m.x-(x??me.x),m.y-(y??me.y));if(d<bd){bd=d;b=m}});return b};
function standFor(t){/* จุดยืนตีเป้า: ใกล้ฝั่งตัวเอง */if(!t)return null;const R=melee()?26:Math.min(rgOf()*.72,200),a=Math.atan2(me.y-t.y,me.x-t.x);let x=t.x+Math.cos(a)*R,y=t.y+Math.sin(a)*R;
  if(!okPos(x,y)){for(let k=1;k<12;k++){const b=a+(k%2?1:-1)*Math.ceil(k/2)*.45,x2=t.x+Math.cos(b)*R,y2=t.y+Math.sin(b)*R;if(okPos(x2,y2)){x=x2;y=y2;break}}}return{x,y,r:melee()?10:Math.max(14,R*.3),tgt:t}}
function objGeneric(){const B=boss();const cr=near(m=>m.t===4);if(B&&B.inv&&cr)return standFor(cr);
  if(B&&WVRI()&&WVR.ank){const a=near(m=>m.ank);if(a)return standFor(a)}
  const ad=near(m=>m.t!==3&&m.t!==4&&!m.pv);if(ad&&Math.hypot(ad.x-me.x,ad.y-me.y)<(melee()?90:rgOf()*.6)&&!(B&&Math.hypot(B.x-me.x,B.y-me.y)<rgOf()))return standFor(ad);
  if(B)return standFor(B);const m=near(()=>true);return m?standFor(m):null}
/* ฐานฟ้า: ยืนในวงยกของตัวเอง · ไล่เศษความล้าที่จะทับวง · ช่วงกระซิบรุมตีบอส */
function objPfn(){const B=boss();if(!B)return objGeneric();const cr=near(m=>m.t===4);if(B.inv&&cr)return standFor(cr);
  const inC=(x,y,i)=>Math.hypot(x-PFC[i][0],(y-PFC[i][1])*1.3)<PFCR;
  let mine=BOT.cfg.circle;if(mine<0){const pr=[1,2,0],free=pr.filter(i=>!PFN.man[i]);const rk=BOT.cfg.rank|0;mine=free.length?free[rk%free.length]:pr[rk%3]}
  const [cx,cy]=PFC[mine];
  if(PFN.ws>0){/* กระซิบ: เข้าไปตีบอส */const s=standFor(B);if(Math.hypot(B.x-me.x,B.y-me.y)<=(melee()?40:rgOf()*.9))return{x:me.x,y:me.y,r:999,tgt:B};return s}
  const fr=mons.filter(m=>m.pfn&&m.hp>0);let tf=null,td=1e9;for(const f of fr){let dmin=1e9,ci=-1;PFC.forEach(([x,y],i)=>{const d=Math.hypot(f.x-x,f.y-y);if(d<dmin){dmin=d;ci=i}});
    const sit=dmin<PFCR+30,thr=sit||dmin<190;if(!thr)continue;const sc=(sit?0:500)+Math.hypot(f.x-me.x,f.y-me.y);if(sc<td){td=sc;tf=f}}
  if(tf&&!(Math.hypot(tf.x-cx,tf.y-cy)<PFCR+40&&inC(me.x,me.y,mine)))return standFor(tf);
  const wt=BOT.Z.some(z=>z.k==='wt'&&z.e>now());
  /* อยู่ในวงตัวเอง · ตีอะไรก็ได้ที่อยู่ในระยะ (บอสเดินมาหาเอง) */
  const tg=(Math.hypot(B.x-cx,B.y-cy)<rgOf()+60)?B:(near(m=>m.pfn&&m.hp>0,cx,cy)||B);
  const R=PFCR*.45;return{x:cx,y:cy,r:wt?R*.6:R,tgt:tg,hold:1}}
/* ต้นค้ำ: สกัดฝูงก่อนถึงราก · ซ่อมรากตอนว่าง · ขวางมุดดินเมื่อรากใกล้ขาด */
function objPtd(){const B=boss(),E=ptdE();const cr=near(m=>m.t===4);if(B&&B.inv&&cr)return standFor(cr);
  const mobs=mons.filter(m=>m.ptd&&m.hp>0&&m.t!==3);
  if(BOT.cfg.block&&PTW.bur>0&&PTW.bi>=0&&PTW.e[PTW.bi]<45){const e=PTW.bp&&PTW.bp[PTW.bp.length-1];if(e)return{x:e[0],y:e[1],r:60,tgt:B,blk:1}}
  if(mobs.length){let t=null,ts=1e9;for(const m of mobs){let dr=1e9;E.forEach(([ex,ey],i)=>{if(PTW.e[i]>0)dr=Math.min(dr,Math.hypot(m.x-ex,m.y-ey))});const sc=dr+Math.hypot(m.x-me.x,m.y-me.y)*.5;if(sc<ts){ts=sc;t=m}}
    if(!B||Math.hypot(t.x-me.x,t.y-me.y)<400||ts<260)return standFor(t)}
  if(!B){/* ช่วงพัก: ซ่อมรากที่เสียมากสุด */let wi=-1,wv=101;PTW.e.forEach((v,i)=>{if(v>0&&v<wv){wv=v;wi=i}});if(wi>=0&&wv<99){const[ex,ey]=E[wi];return{x:ex,y:ey,r:70}}return null}
  return objGeneric()}
/* รังกัดแผ่นดิน: เหยียบไข่ · สกัดฝูง · กัดเท้า = รุมตี · ว่าง = ยืนวงยันเท้า */
function objPnq(){const B=boss();const cr=near(m=>m.t===4);if(B&&B.inv&&cr)return standFor(cr);
  if(B&&PNQ.gn>0&&PNQ.gs)return standFor(B);
  const sp=C().sp*(1+M('sp'));let eg=null,es=1e9;for(const e of PNQ.eggs){const d=Math.hypot(e.x-me.x,e.y-me.y),tt=d/Math.max(60,sp)+.9;if(tt>e.t+.2&&d>60)continue;const sc=d+e.t*25;if(sc<es){es=sc;eg=e}}
  const mobs=mons.filter(m=>m.pnq&&m.hp>0&&m.t!==3);
  const thr=mobs.filter(m=>pnqFootIn(m.x,m.y,170));
  if(eg&&(!thr.length||eg.t<4))return{x:eg.x,y:eg.y,r:14,egg:1};
  if(thr.length){let t=null,td=1e9;thr.forEach(m=>{const d=Math.hypot(m.x-me.x,m.y-me.y);if(d<td){td=d;t=m}});return standFor(t)}
  if(mobs.length&&!B){const t=near(m=>m.pnq&&m.hp>0&&m.t!==3);return standFor(t)}
  if(!B){/* ช่วงพัก: ยืนวงยันเท้า */const i=me.x<CX?0:1;return{x:PNBR[i][0],y:PNBR[i][1],r:30}}
  return objGeneric()}
function objP89(){const B=boss();
  if(typeof CTWI==='function'&&CTWI()&&CT.hg){const h=near(m=>m.hg&&m.hp>0);if(h)return standFor(h)}
  if(typeof CWNI==='function'&&CWNI()&&CWN.mr){const h=near(m=>m.mr&&m.hp>0);if(h)return standFor(h)}
  if(typeof WBLI==='function'&&WBLI()&&dg.ph==='run'){const m=near(q=>q.hp>0&&q.t!==3);if(m)return standFor(m);if(!WBQ.mb)return{x:WBCX-120,y:CY,r:40}}
  return objGeneric()}
function objective(){try{if((typeof CTWI==='function'&&CTWI())||(typeof CWNI==='function'&&CWNI())||(typeof WBLI==='function'&&WBLI()))return objP89();if(typeof PFNI==='function'&&PFNI())return objPfn();if(typeof PTDI==='function'&&PTDI())return objPtd();if(typeof PNQI==='function'&&PNQI())return objPnq()}catch(e){BOT.err='obj:'+e}return objGeneric()}
/* ---------- สเต็ปบอท ---------- */
function step(dt){const S=BOT.st,cf=BOT.cfg,t=now();BOT.t+=dt;S.t=BOT.t;
  if(dg.ph==='win'||dg.ph==='fail'){joy=null;return}
  if(me.down>0){joy=null;if(!S.lastDown){S.lastDown=t;S.deaths++}if(cf.revive&&t-S.lastDown>cf.revD&&me.gold>=rvCost()){reviveHere();S.revives++;S.lastDown=0}return}else S.lastDown=0;
  S.minHp=Math.min(S.minHp,me.hp/me.mh);
  if(me.pcd<=0){if(me.hp<me.mh*cf.potHp&&me.inv.hp>0){usePot('hp');S.pots++}else if(me.mp<me.mm*cf.potMp&&me.inv.mp>0){usePot('mp');S.mpots++}}
  if(SD.on&&!SD.choice){try{if(SD.typ)stNext();stNext()}catch(e){}}
  AUTO.on=true;AUTO.sel={0:1,1:1,2:1,3:1,4:1,5:1};
  BOT.Z=BOT.Z.filter(z=>z.e>t-.05);for(const k in BOT.N)if(BOT.N[k].e<t-.05)delete BOT.N[k];
  /* วงที่เห็นแล้ว (ผ่านเวลาตอบสนอง) และยังไม่ลง */
  const live=BOT.Z.filter(z=>z.k!=='wt'&&!z.ign&&t-z.t0>=cf.react&&z.e>t&&!(z.soft&&BOT.cur&&BOT.cur.blk));
  const O0=objective();let O=O0;BOT.cur=O;
  if(O&&O.tgt)lockId=O.tgt.id;
  /* v560 เข็มนาฬิกา: คาดเวลาที่เข็มจะกวาดถึงตัว → กลิ้งหลบ (ตามนโยบายกลิ้ง) */
  try{if(typeof CTWI==='function'&&CTWI()&&dg.ph==='boss'){const[ah,am]=ctAng(),[sh,sm]=ctSpd(),r=Math.hypot(me.x-CX,me.y-CY),pa=Math.atan2(me.y-CY,me.x-CX);let tt=9;
      [[ah,sh,CTHL*.82],[am,sm,CTHL]].forEach(([a,w,L])=>{if(r<60||r>L)return;const d=Math.atan2(Math.sin(pa-a),Math.cos(pa-a)),hw=(CTHW+12)/r;let dd=w>0?d:-d;dd-=hw;if(dd<0)dd+=6.283;tt=Math.min(tt,dd/Math.abs(w))});
      if(tt<.2&&(me.dgCd||0)<=0&&!BOT.dgH&&Math.random()<cf.dodge){BOT.dgH=1;try{if(dodge())S.dodges++}catch(e){}}if(tt>.5)BOT.dgH=0}}catch(e){BOT.err='hand:'+e}
  /* v560 ต้องยืนในที่ปลอดภัย */
  {const NQ=Object.values(BOT.N).filter(q=>q.e>t&&!q.ign&&t-q.t0>=cf.react);if(NQ.length){const q=NQ[0];const pts=typeof q.pts==='function'?q.pts():q.pts;
    if(!q.ok(me.x,me.y)){let best=null,bd=1e9;for(const[x,y]of pts){if(!okPos(x,y)&&!q.ok(x,y))continue;const bad=live.some(z=>inZ(x,y,z,12))?600:0,d=Math.hypot(x-me.x,y-me.y)+bad;if(d<bd){bd=d;best=[x,y]}}
      if(best){go(best[0],best[1],6);return}}
    else if(O&&!q.ok(O.x,O.y))O={x:me.x,y:me.y,r:999,tgt:O.tgt,hold:1}}}
  const inside=live.filter(z=>inZ(me.x,me.y,z,10));
  if(inside.length){const soon=inside.reduce((a,z)=>Math.min(a,z.e-t),9);
    const p=escapeFrom(live,O?[O.x,O.y]:null);if(p){go(p[0],p[1],4)}
    if(soon<.22&&(me.dgCd||0)<=0&&!BOT.dgU&&Math.random()<cf.dodge){BOT.dgU=1;try{if(dodge())S.dodges++}catch(e){}}
    if(soon>.3)BOT.dgU=0;return}
  BOT.dgU=0;
  if(!O){joy=null;return}
  /* นักยิง: ถอยห่างเมื่อบอสประชิด */
  const B=boss();if(cf.kite&&!melee()&&B&&!O.hold&&!O.egg&&!(B.stun>0)&&Math.hypot(B.x-me.x,B.y-me.y)<75){const a=Math.atan2(me.y-B.y,me.x-B.x);let x=B.x+Math.cos(a)*rgOf()*.7,y=B.y+Math.sin(a)*rgOf()*.7;
    if(!okPos(x,y)){const p=escapeFrom([{k:'c',x:B.x,y:B.y,r:110,ky:1}],[O.x,O.y]);if(p){x=p[0];y=p[1]}}
    /* ไม่หนีเข้าวงเตือน */if(!live.some(z=>inZ(x,y,z,16))){go(x,y,6);return}}
  /* จุดหมายอยู่ในวงเตือน → รอขอบวง */
  if(live.some(z=>inZ(O.x,O.y,z,12))){const p=escapeFrom(live,[O.x,O.y]);if(p&&Math.hypot(p[0]-me.x,p[1]-me.y)>6){go(p[0],p[1],6);return}joy=null;return}
  go(O.x,O.y,O.r||10)}
/* ---------- ตัววัด ---------- */
const oHurt=hurt;window.hurt=hurt=function(d){const h0=me.hp,dn0=me.down;const r=oHurt.apply(this,arguments);try{if(BOT.on&&BOT.st){const L=Math.max(0,h0-Math.max(0,me.hp));if(L>0){BOT.st.taken+=L;BOT.st.hurtN++;if(L>me.mh*.3)BOT.st.big++;
    /* ดูว่าโดนอะไร: เอฟเฟกต์ตอนลง (เฟรมเดียวกัน) → วงเตือน → มอนประชิดที่เพิ่งตี → อื่น ๆ */const t=now();let nm='';
    const im=BOT.imp.filter(q=>t-q.t<.2&&(q.n==='nova'||q.n==='weight'||q.n==='fissure'||q.n==='acid'||q.n==='needle'||q.n==='spoke'||!q.x||Math.hypot(q.x-me.x,q.y-me.y)<(q.r||60)+40));
    if(im.length)nm=im[im.length-1].n;
    if(!nm){const Zs=BOT.Z.filter(z=>Math.abs(z.e-t)<.3&&(z.k==='wt'||inZ(me.x,me.y,z,8)));if(Zs.length)nm=Zs[0].n}
    if(!nm){const pn=performance.now(),mb=mons.find(m=>m.hp>0&&m.t!==3&&m.akT&&pn-m.akT<700&&Math.hypot(m.x-me.x,m.y-me.y)<110);if(mb)nm='mob'+mb.t}
    if(!nm){try{const st=new Error().stack;nm=/pfnDmg/.test(st)?'pfn':/wvHit/.test(st)?'wvr':/wblHit/.test(st)?'wbl':/wskHit/.test(st)?'wsk':/ctHit/.test(st)?(CT.ts===2?'stop':'hand'):/cwHit/.test(st)?'cwn':/gdlSim/.test(st)?'barrel':/room|socket|emit/i.test(st)?'net':'other'}catch(e){nm='other'}}const H=BOT.st.hitBy;H[nm]=H[nm]||[0,0];H[nm][0]++;H[nm][1]+=Math.round(L)}}}catch(e){}return r};
const oEnd=dgEnd;window.dgEnd=dgEnd=function(win,why){try{if(BOT.on&&BOT.st&&!BOT.st.end)BOT.st.end={win:win?1:0,why:String(why||''),t:Math.round(BOT.t*10)/10}}catch(e){}return oEnd.apply(this,arguments)};
const oU=updateMe;window.updateMe=updateMe=function(dt){if(BOT.on&&me.cls&&run){try{step(dt)}catch(e){BOT.err='step:'+(e&&e.stack||e).toString().slice(0,300)}}return oU.apply(this,arguments)};
/* สุ่มตัวอย่างทุก 1 วิ (เวลาเกม) */
setInterval(()=>{if(!BOT.on||!BOT.st)return;const B=boss(),S=BOT.st;if(B&&S.bossT0===null){S.bossT0=BOT.t;S.bossMh=B.mh}
  const r=[Math.round(BOT.t*10)/10,B?Math.round(B.hp/B.mh*1000)/10:-1,Math.round(me.hp/me.mh*100),me.down>0?1:0];
  try{if(PFNI())r.push(Math.round(PFN.s*10)/10,PFN.cs.join(''));else if(PTDI())r.push(PTW.e.map(v=>Math.round(v)).join('/'),PTW.wv);else if(PNQI())r.push(Math.round(PNQ.f*10)/10,PNQ.wv,PNQ.eggs.length)}catch(e){}
  S.samp.push(r);if(S.samp.length>2000)S.samp.shift()},250);
})();
