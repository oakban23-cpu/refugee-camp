/* ---------- v644 หน้าเริ่มเกมโฉมใหม่ (TT3): โลโก้วาด + ภาพปกแยก 3 ชั้น ขยับเหลื่อมกันแบบ HD-2D ----------
   ภาพจาก ChatGPT: hd-ttl-ls/lc/lh (แนวนอน 1536×1024: ฟ้า/ค่าย/ฮีโร่) · hd-ttl-ps/pc/ph (แนวตั้ง 1024×1536) · hd-ttl-logo
   วาดลงแคนวาส #tt3c (ใต้เงาไล่สี .sh ตัวหนังสือ/ปุ่มเหมือนเดิม): ฟ้าขยับน้อย ค่ายขยับกลาง ฮีโร่ขยับมาก + ลอยช้า ๆ ตามเวลา/นิ้ว/การเอียงเครื่อง
   ฮีโร่หายใจ · กองไฟวูบวาบ + ประกายไฟลอย · คทานักบวชกับกวางวิญญาณเรืองแสงเป็นจังหวะ · โลโก้ทองมีแสงวิ่งผ่าน
   โหลดภาพไม่ครบ = ใช้หน้าปกเดิม (ภาพเดียว + เอฟเฟกต์เดิม) */
const TT3={ok:0,err:'',n:0,I:{},tx:0,ty:0,px:0,py:0,cv:null,f:0,
  L:{fire:[.507,.638],staff:[.684,.487],deer:[.944,.6],hx:.78,ay:.55},P:{fire:[.512,.6],staff:[.396,.553],deer:[.88,.62],hx:.5,ay:.62}};
function tt3Wide(){const T=$('ttl');try{return !!(T&&T.classList.contains('cw')&&matchMedia('(min-aspect-ratio:23/20)').matches)}catch(e){return false}}
(function(){try{const T=document.getElementById('ttl');if(!T)return;
  const st=document.createElement('style');st.id='tt3css';st.textContent=
   '#tt3c{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none}#ttl.t3 #tt3c{display:block}#ttl.t3 .bg{opacity:0!important}#ttl.t3 #vztc{display:none!important}'+
   '#ttl .lgi{display:none;position:relative;margin:0 auto;width:min(84%,calc(26vh*1.59))}#ttl.t3 .lgi{display:block}#ttl.t3 .lg .t{display:none}'+
   '#ttl .lgi img{display:block;width:100%;height:auto;filter:drop-shadow(0 6px 14px rgba(0,0,0,.75)) drop-shadow(0 0 18px rgba(255,170,60,.25))}'+
   '#ttl .lgi i{position:absolute;inset:0;pointer-events:none;-webkit-mask:url(hd-ttl-logo.webp) center/100% 100% no-repeat;mask:url(hd-ttl-logo.webp) center/100% 100% no-repeat;background:linear-gradient(110deg,transparent 38%,rgba(255,250,225,.75) 50%,transparent 62%);background-size:250% 100%;animation:ttlsh 4.5s ease-in-out infinite 1.2s;mix-blend-mode:screen}'+
   '#ttl.t3 .lg .ln{margin-top:4px}'+
   '@media (min-aspect-ratio:23/20){#ttl.t3.cw .lgi{width:min(34vw,calc(31vh*1.59))}#ttl.t3.cw .lg{top:max(4%,calc(50% - 38vh))}}';
  document.head.appendChild(st);
  const lg=T.querySelector('.lg');if(lg){const d=document.createElement('div');d.className='lgi';d.innerHTML='<img alt="REFUGEE" src="hd-ttl-logo.webp"><i></i>';lg.insertBefore(d,lg.firstChild)}
  const ks=['ls','lc','lh','ps','pc','ph','logo'];let n=0;
  for(const k of ks){const im=new Image();im.onload=()=>{TT3.I[k]=im;if(++n===ks.length)tt3Start()};im.onerror=()=>{TT3.err='load '+k};im.src='hd-ttl-'+k+'.webp'}
  addEventListener('pointermove',e=>{if(!TT3.ok)return;TT3.tx=Math.max(-1,Math.min(1,(e.clientX/innerWidth-.5)*2));TT3.ty=Math.max(-1,Math.min(1,(e.clientY/innerHeight-.5)*2))},{passive:true});
  addEventListener('deviceorientation',e=>{if(!TT3.ok||e.gamma==null)return;TT3.tx=Math.max(-1,Math.min(1,e.gamma/25));TT3.ty=Math.max(-1,Math.min(1,((e.beta||45)-45)/25))},{passive:true});
}catch(e){TT3.err=String(e)}})();
function tt3Start(){const T=$('ttl');if(!T||TT3.ok)return;const F=T.querySelector('.fr'),sh=T.querySelector('.sh');if(!F)return;
  const cv=document.createElement('canvas');cv.id='tt3c';if(sh)F.insertBefore(cv,sh);else F.appendChild(cv);TT3.cv=cv;TT3.ok=1;T.classList.add('t3');
  const ctx=cv.getContext('2d'),E=[];for(let i=0;i<16;i++)E.push({p:Math.random(),s:.35+Math.random()*.4,x:Math.random()*2-1});
  const glow=(x,y,r,c,a)=>{if(r<=0||a<=0)return;const gr=ctx.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+c+','+a+')');gr.addColorStop(1,'rgba('+c+',0)');ctx.fillStyle=gr;ctx.fillRect(x-r,y-r,r*2,r*2)};
  let last=performance.now();
  function frame(){const T2=$('ttl');if(!T2||!T2.isConnected||T2.classList.contains('out')){TT3.ok=0;return}requestAnimationFrame(frame);
    const now=performance.now(),t=now/1000,dt=Math.min(.05,(now-last)/1000);last=now;const w=F.clientWidth,h=F.clientHeight,dpr=Math.min(2,window.devicePixelRatio||1);if(w<10||h<10)return;
    if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr)}
    const wide=tt3Wide(),M=wide?TT3.L:TT3.P,S=TT3.I[wide?'ls':'ps'],C=TT3.I[wide?'lc':'pc'],Hh=TT3.I[wide?'lh':'ph'],IW=S.width,IH=S.height;
    const sc=Math.max(w/IW,h/IH)*1.06,iw=IW*sc,ih=IH*sc,ox=(w-iw)*.5,oy=(h-ih)*M.ay,A=Math.min(w,h)*.022,k=1-Math.exp(-dt*3);
    TT3.px+=(TT3.tx-TT3.px)*k;TT3.py+=(TT3.ty-TT3.py)*k;const dx=Math.sin(t*.23)*.8+TT3.px,dy=Math.sin(t*.17)*.45+TT3.py*.6;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    ctx.drawImage(S,ox-dx*A*.3,oy-dy*A*.2,iw,ih);
    const cx=ox-dx*A*.65,cy=oy-dy*A*.4;ctx.drawImage(C,cx,cy,iw,ih);
    /* กองไฟวูบวาบ + ประกายไฟ */
    {const fl=.72+.28*Math.sin(t*9.3)*Math.sin(t*5.7+1),fx=cx+M.fire[0]*iw,fy=cy+M.fire[1]*ih,u=iw/1536;ctx.globalCompositeOperation='lighter';
      glow(fx,fy,160*u*fl,'255,140,50',.22*fl);glow(fx,fy-8*u,46*u,'255,220,140',.35*fl);
      for(const e of E){e.p+=dt*e.s*.5;if(e.p>1){e.p-=1;e.x=Math.random()*2-1}const q=e.p,x=fx+e.x*22*u*(1+q*1.5)+Math.sin(t*2+e.x*9)*8*u,y=fy-10*u-q*190*u;ctx.fillStyle='rgba(255,'+(210-q*130|0)+',90,'+(.9*(1-q))+')';const r=2.2*u*(1-q*.5)+.6;ctx.fillRect(x-r,y-r,r*2,r*2)}}
    /* ฮีโร่ + หายใจ */
    const hx=ox-dx*A*1.15,hy=oy-dy*A*.7,bs=1+.007*Math.sin(t*1.25),ax=hx+M.hx*iw,ay=hy+ih;
    ctx.globalCompositeOperation='source-over';ctx.save();ctx.translate(ax,ay);ctx.scale(bs,bs);ctx.translate(-ax,-ay);ctx.drawImage(Hh,hx,hy,iw,ih);ctx.restore();
    {ctx.globalCompositeOperation='lighter';const u=iw/1536,pu=.65+.35*Math.sin(t*2.3),sx=ax+(hx+M.staff[0]*iw-ax)*bs,sy=ay+(hy+M.staff[1]*ih-ay)*bs;glow(sx,sy,70*u*pu,'255,225,130',.38*pu);
      const dp=.6+.4*Math.sin(t*1.5+1),qx=ax+(hx+M.deer[0]*iw-ax)*bs,qy=ay+(hy+M.deer[1]*ih-ay)*bs;glow(qx,qy,150*u,'110,190,255',.16*dp)}
    ctx.globalCompositeOperation='source-over';TT3.f++}
  requestAnimationFrame(frame)}
