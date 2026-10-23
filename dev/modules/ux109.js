/* ---------- v500 มอนมีมิติ: วาดมอนแต่ละตัวลงภาพของตัวเอง (อัปเดตหลายครั้งต่อวินาที) + ลงแสงเต็มชุด ----------
   ทำไม: ระบบแสงเดิม (monLit) ลงแสงได้แค่ 5 ตัวต่อเฟรม และไม่ทำงานในโหมดประหยัด → มอนส่วนใหญ่แบน
   วิธี: วาดมอนแบบเวกเตอร์ (คุณภาพเต็ม) ลงแคนวาสส่วนตัวตามจังหวะท่า (ck) แล้วลงแสง: ไล่แสงทั้งตัว · เงาด้านหลังแสง 2 ชั้น ·
   แสงขอบด้านรับแสง · แสงสะท้อนขอบหลัง · เส้นขอบหนาขึ้น → ทุกเฟรมแค่วาดเงาพื้น + drawImage */
const MPC={on:1,auto:1,rich0:1,ck:{t:0,bad:0},base:[0,0,1],wm:new WeakMap(),bb:{},cap:null,rich:0,tmp:null,tx:null,n:0,nf:0,fr:-1,stat:{r:0,b:0,s:0}};
{const _sh=gxShadow;gxShadow=function(x,y,rx,ry,a){if(MPC.cap){const M=g.getTransform(),B=MPC.base,dx=M.a*x+M.c*y+M.e,dy=M.b*x+M.d*y+M.f;MPC.cap.push([(dx-B[0])/B[2],(dy-B[1])/B[2],rx*Math.hypot(M.a,M.b)/B[2],ry*Math.hypot(M.c,M.d)/B[2],a]);return}return _sh.apply(this,arguments)}}
/* แยกแสงเรือง ('lighter') ออกจากตัวมอน: รอบ 1 วาดเฉพาะตัว (ไม่เอา lighter) · รอบ 2 วาดเฉพาะแสงเรือง → ลงแสงเฉพาะตัว แล้ววาดแสงเรืองแบบบวกแสงบนจอ */
const MPCF=['fill','stroke','fillRect','strokeRect','drawImage','fillText','strokeText'];
function mpcHook(x){if(x.__mpc)return;x.__mpc=1;const P=CanvasRenderingContext2D.prototype;for(const k of MPCF){const f=P[k];x[k]=function(){const ps=MPC.pass;if(ps){const lit=this.globalCompositeOperation==='lighter';if((ps===1&&lit)||(ps===2&&!lit))return;if(ps===2)MPC.gl=1}return f.apply(this,arguments)}}}
function mpcTmp(w,h){let c=MPC.tmp;if(!c){c=MPC.tmp=document.createElement('canvas');c.width=c.height=128;MPC.tx=c.getContext('2d')}
  if(c.width<w||c.height<h){c.width=Math.max(c.width,w);c.height=Math.max(c.height,h);MPC.tx=c.getContext('2d')}return MPC.tx}
/* วาดมอน 1 ท่าลงบริบท x (พิกัดท้องถิ่น: จุดเท้ามอนอยู่ที่ 0,0) */
function mpcRender(x,m,ck,fx,sl,hf,B,pass){MPC.base=B;const G0=g,L0=LOWQ,k0=m.__u59k,MC=MON_CUR,cap=MPC.cap,R0=Math.random;g=x;LOWQ=false;m.__u59k=null;MON_CUR=m;MPC.cap=[];MPC.rich=1;MPC.pass=pass||0;
  /* สุ่มแบบคงที่ต่อท่า: รอบตัว/รอบแสงเรืองได้ผลเหมือนกัน */let sd=(Math.floor(ck*97)*2654435761+(m.id|0)*40503)>>>0;Math.random=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296};let sh=null;
  try{drawMon(0,0,m.t,ck,fx,sl,hf)}catch(e){}finally{sh=MPC.cap;MPC.cap=cap;MPC.rich=0;MPC.pass=0;Math.random=R0;g=G0;LOWQ=L0;m.__u59k=k0;MON_CUR=MC}return sh}
/* กรอบภาพต่อชนิดมอน: วัดจริงครั้งเดียว (3 ท่า หันซ้าย-ขวา) */
function mpcVar(m){return (m.tgb?'g':'')+(m.hdg>=0?'h':'')+(m.vsa?'v':'')}
function mpcBB(m){const k=curMap+'|'+bTheme()+'|'+m.t+'|'+mpcVar(m);let b=MPC.bb[k];if(b)return b;
  const N=640,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for(const[T,f]of[[.4,1],[1.3,-1],[2.9,1],[4.4,-1]]){x.setTransform(1,0,0,1,N/2,N*.62);x.clearRect(-N,-N,N*2,N*2);mpcRender(x,m,T,f,0,0,[N/2,N*.62,1]);
    const d=x.getImageData(0,0,N,N).data;for(let yy=0;yy<N;yy+=2)for(let xx=0;xx<N;xx+=2){if(d[(yy*N+xx)*4+3]>8){const lx=xx-N/2,ly=yy-N*.62;if(lx<x0)x0=lx;if(lx>x1)x1=lx;if(ly<y0)y0=ly;if(ly>y1)y1=ly}}}
  if(x1<x0){x0=-30;x1=30;y0=-60;y1=14}
  const hw=Math.max(Math.abs(x0),Math.abs(x1)),pw=hw*.18+8,ph=(y1-y0)*.16+8;
  b=MPC.bb[k]={x:-hw-pw,y:y0-ph,w:(hw+pw)*2,h:(y1-y0)+ph*2};return b}
/* ลงแสงบนภาพมอน (พิกัดพิกเซลจริง) */
function mpcLight(c,x,w,h,q){const A=gxAmb(),rim=gxRimCol(),t=mpcTmp(w+4,h+4),nt=(()=>{try{return isNight()&&!isDg()}catch(e){return false}})();
  x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.shadowBlur=0;
  /* 1) ไล่แสงทั้งตัว: บนซ้ายสว่าง ล่างขวามืด */x.globalCompositeOperation='source-atop';const gr=x.createLinearGradient(w*.18,h*.05,w*.78,h*.98);gr.addColorStop(0,'rgba(255,248,222,.16)');gr.addColorStop(.5,'rgba(0,0,0,0)');gr.addColorStop(1,A[1].replace(/,([\d.]+)\)$/,(z,a)=>','+(+a*.62).toFixed(2)+')'));x.fillStyle=gr;x.fillRect(0,0,w,h);
  const band=(dx,dy,col,a,op)=>{t.setTransform(1,0,0,1,0,0);t.globalAlpha=1;t.globalCompositeOperation='source-over';t.clearRect(0,0,w+4,h+4);t.drawImage(c,0,0,w,h,0,0,w,h);
    t.globalCompositeOperation='destination-out';t.drawImage(c,0,0,w,h,dx,dy,w,h);t.globalCompositeOperation='source-in';t.fillStyle=col;t.fillRect(0,0,w,h);
    x.globalCompositeOperation=op||'source-atop';x.globalAlpha=a;x.drawImage(t.canvas,0,0,w,h,0,0,w,h);x.globalAlpha=1};
  const k=Math.max(1.5,2.4*q);
  /* 2) เงาด้านหลังแสง */band(-k,-k*.85,nt?'rgb(6,10,40)':'rgb(26,12,44)',.24);
  /* 3) แสงขอบด้านรับแสง */band(Math.max(1,q*.85),Math.max(1,q*.95),'rgb('+rim+')',nt?.32:.42);
  x.globalCompositeOperation='source-over'}
/* วาดมอนจากภาพแคช · คืน true ถ้าวาดแล้ว */
/* เฝ้าความลื่น: ถ้าเฟรมช้ากว่าเป้าต่อเนื่อง → เลิกใช้ภาพแคช (กลับไปวาดตรงแบบมีแสงเงาส่วน) */
function mpcWatch(){const n=performance.now();if(n-MPC.ck.t<3000)return;MPC.ck.t=n;if(typeof FQ==='undefined'||!(FQ.avg>0))return;const thr=Math.max(26,1000/mvTg()*1.22);
  if(FQ.avg>thr){if(++MPC.ck.bad>=2){MPC.auto=0;MPC.offAt=n}}else MPC.ck.bad=0}
function mpcMon(m,ck,fx,sl,hf,direct){if(!m||m.t>=3||!MT[m.t])return false;
  if(MPC.mp!==curMap){MPC.mp=curMap;MPC.auto=1;MPC.ck.bad=0;MPC.ck.t=performance.now()}if(!MPC.auto)return false;mpcWatch();
  if(!MPC.on||LOWQ){if(!MPC.rich0)return false;/* วาดตรง + แสงเงาทรงกลม/ทรงกระบอกต่อส่วน */MPC.rich=1;try{if(direct)drawMon(m.x,m.y,m.t,ck,fx,sl,hf);else monLit(m,()=>drawMon(m.x,m.y,m.t,ck,fx,sl,hf))}finally{MPC.rich=0}return true}
  const M=g.getTransform(),sc=Math.hypot(M.a,M.b);if(!(sc>0))return false;
  let S=MPC.wm.get(m);const b=mpcBB(m),W=hf>.3,rate=LOWQ?10:16,step=Math.floor(ck*rate),qm=LOWQ?2:3;
  let q=Math.max(.5,Math.min(qm,Math.round(sc*4)/4));if(S&&Math.abs(S.q-q)/S.q<.3)q=S.q;
  const key=step+'|'+(fx<0?1:0)+'|'+(W?1:0)+'|'+(sl>0?1:0)+'|'+(hf>0?Math.round(hf*3):0)+'|'+mpcVar(m)+'|'+bTheme();
  const fr=typeof FL!=='undefined'&&FL.pt?FL.pt:Math.floor(performance.now()/16);if(fr!==MPC.fr){MPC.fr=fr;MPC.nf=0}
  const need=!S||S.key!==key||S.q!==q||S.b!==b;
  if(need&&(!S||S.b!==b||S.q!==q||MPC.nf<((typeof FQ!=='undefined'&&FQ.avg>22)?2:LOWQ?3:6))){MPC.nf++;MPC.stat.r++;
    const w=Math.max(2,Math.ceil(b.w*q)),h=Math.max(2,Math.ceil(b.h*q));
    if(!S){S={c:document.createElement('canvas'),gc:document.createElement('canvas')};S.x=S.c.getContext('2d');S.gx=S.gc.getContext('2d');MPC.wm.set(m,S)}
    if(S.c.width!==w||S.c.height!==h){S.c.width=w;S.c.height=h;S.x=S.c.getContext('2d');S.gc.width=w;S.gc.height=h;S.gx=S.gc.getContext('2d')}
    mpcHook(S.x);mpcHook(S.gx);const B=[-b.x*q,-b.y*q,q],prep=x=>{x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';x.shadowBlur=0;x.clearRect(0,0,w,h);x.setTransform(q,0,0,q,B[0],B[1]);x.lineCap='butt';x.lineJoin='miter';x.setLineDash([])};
    const x=S.x;prep(x);S.sh=mpcRender(x,m,ck,fx,sl,hf,B,1);if(!W)try{mpcLight(S.c,x,w,h,q)}catch(e){}
    const gk=b;gk.gn=(gk.gn|0)+1;if(gk.hg!==0||gk.gn%40===0){MPC.gl=0;prep(S.gx);mpcRender(S.gx,m,ck,fx,sl,hf,B,2);S.hg=MPC.gl;if(MPC.gl)gk.hg=1;else if(gk.gn>=30&&gk.hg!==1)gk.hg=0;MPC.gl=0}else S.hg=0;S.key=key;S.q=q;S.b=b}
  else MPC.stat.s++;
  if(!S)return false;
  /* วาดจริง: เงาพื้น → ตัวมอน (แรงผลักถอยหลังขยับนอกภาพ ลื่นทุกเฟรม) */
  let ox=0,oy=0;const kk=m.__u59k;if(kk){const e=(performance.now()-kk.t0)/150;if(e<1){const o=(1-e)*(1-e)*5*kk.pw;ox=Math.cos(kk.a)*o;oy=Math.sin(kk.a)*o*.6}else m.__u59k=null}
  for(const s of S.sh||[])gxShadow(m.x+ox+s[0],m.y+oy+s[1],s[2],s[3],s[4]);
  g.drawImage(S.c,0,0,S.c.width,S.c.height,m.x+ox+S.b.x,m.y+oy+S.b.y,S.b.w,S.b.h);
  if(S.hg){const op=g.globalCompositeOperation;g.globalCompositeOperation='lighter';g.drawImage(S.gc,0,0,S.gc.width,S.gc.height,m.x+ox+S.b.x,m.y+oy+S.b.y,S.b.w,S.b.h);g.globalCompositeOperation=op}MPC.stat.b++;return true}
/* ---------- ตอนวาดลงภาพแคช: ส่วนรูปไข่/รูปหลายเหลี่ยม/แขนขา ได้แสงเงาทรงกลม/ทรงกระบอก ---------- */
const MVG=new WeakMap();
function mvG(x){let o=MVG.get(x);if(o)return o;const mk=sx=>{const r=x.createRadialGradient(-.36*sx,-.44,0,-.1*sx,-.12,1.18);r.addColorStop(0,'rgba(255,255,255,.42)');r.addColorStop(.2,'rgba(255,255,255,.16)');r.addColorStop(.48,'rgba(255,255,255,0)');r.addColorStop(.78,'rgba(0,0,0,.09)');r.addColorStop(1,'rgba(18,0,36,.36)');return r};
  o=[mk(1),mk(-1)];MVG.set(x,o);return o}
const mvFlip=()=>{const M=g.getTransform();return (M.a*M.d-M.b*M.c)<0?1:0};
function mvE(cx,cy,rx,ry,rot){if(rx<2.6||ry<2.6)return;const G=mvG(g)[mvFlip()];g.save();g.translate(cx,cy);if(rot)g.rotate(rot);g.scale(rx,ry);g.beginPath();g.arc(0,0,1,0,7);g.fillStyle=G;g.fill();g.restore()}
function mvP(p){let x0=p[0],x1=p[0],y0=p[1],y1=p[1];for(let i=2;i<p.length;i+=2){const a=p[i],b=p[i+1];if(a<x0)x0=a;if(a>x1)x1=a;if(b<y0)y0=b;if(b>y1)y1=b}const w=x1-x0,h=y1-y0;if(w<5||h<5)return;
  const cx=(x0+x1)/2,cy=(y0+y1)/2,sx=w/2,sy=h/2,G=mvG(g)[mvFlip()];g.save();g.translate(cx,cy);g.scale(sx,sy);g.beginPath();g.moveTo((p[0]-cx)/sx,(p[1]-cy)/sy);for(let i=2;i<p.length;i+=2)g.lineTo((p[i]-cx)/sx,(p[i+1]-cy)/sy);g.closePath();g.fillStyle=G;g.fill();g.restore()}
function mvL(p,w){if(!(w>=2.2)||p.length<4)return;const f=mvFlip()?-1:1,lc=g.lineCap;g.lineCap='round';
  const path=(dx,dy)=>{g.beginPath();g.moveTo(p[0]+dx,p[1]+dy);for(let i=2;i<p.length;i+=2)g.lineTo(p[i]+dx,p[i+1]+dy)};
  path(w*.16*f,w*.2);g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=w*.34;g.stroke();path(-w*.18*f,-w*.2);g.strokeStyle='rgba(255,255,255,.22)';g.lineWidth=w*.28;g.stroke();g.lineCap=lc}
/* บอส: เดิมเทสีเรียบ → ไล่สีบน-ล่าง + แสงเงาทรงกลม/ทรงกระบอก (วาดตรงทุกเฟรม · บอสมีทีละตัว) */
const mvTg=()=>{let t=60;try{t=flTarget()||60}catch(e){}return t};
const MVB={on:()=>MPC.rich0&&!(typeof FQ!=='undefined'&&FQ.avg>Math.max(30,1000/mvTg()*1.3))};
const mvW=c=>typeof c!=='string'||c==='#ffffff'||c==='#fff'||c==='#ffe8d8';
function mvSh(p,c){let y0=p[1],y1=p[1];for(let i=3;i<p.length;i+=2){if(p[i]<y0)y0=p[i];if(p[i]>y1)y1=p[i]}return chSh(c,y0,y1)}
