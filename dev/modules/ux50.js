/* ---------- v431 ยกระดับภาพ (ต่อ): ฉากเลเวลอัป · ฉากเปลี่ยนอาชีพ · หน้าเปิดเกมมีชีวิต ----------
   ⑤ เลเวลอัป: ลำแสงจากฟ้า + วงเวทหมุนใต้เท้า + ป้าย «LEVEL UP» และค่าพลังที่เพิ่มเด้งทีละบรรทัด (หลายเลเวลติดกันรวมเป็นป้ายเดียว)
      เปลี่ยนอาชีพ/สายอาชีพ: ฉากใหญ่กว่า ชื่ออาชีพใหม่ + วงเวทสองชั้น
   ⑥ หน้าเปิดเกม: เลเยอร์เคลื่อนไหวทับภาพปก (กองไฟวูบวาบ ประกายไฟ ตะเกียงกะพริบ ดาวระยิบ ดาวตก ประตูมิติหมุน กวางวิญญาณเรือง คทาเรืองแสง หิ่งห้อย คมดาบวาบ)
      ตำแหน่งคำนวณตามภาพปก (background-size:cover) และขยับตามการซูมช้า ๆ ของภาพ · ถ้าไม่มีภาพปก (เช่นบน claude.ai) เหลือแค่ดาว/หิ่งห้อย */
const VZL={t0:0,x:0,y:0,k:'',job:0,c2:-1,br:-1};
function vzLCSS(){if($('vzlcss'))return;const s=document.createElement('style');s.id='vzlcss';s.textContent=
 '#vzl{position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:62;pointer-events:none;text-align:center;white-space:nowrap}#vzl[hidden]{display:none}'+
 '#vzl .t{font:900 34px "Cinzel",Georgia,system-ui;letter-spacing:.12em;background:linear-gradient(180deg,#fff8d8,#ffd35a 55%,#e08a1a);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 10px rgba(255,190,60,.8)) drop-shadow(0 3px 4px rgba(0,0,0,.9));animation:vzlT 2.8s cubic-bezier(.2,.9,.3,1.2) forwards}'+
 '#vzl.job .t{font-size:26px;letter-spacing:.04em;background:linear-gradient(180deg,#ffffff,#c9e6ff 45%,#7aa8ff);-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 0 12px rgba(120,170,255,.9)) drop-shadow(0 3px 4px #000)}'+
 '#vzl .lv{font:800 18px system-ui;color:#fff3c8;text-shadow:0 2px 6px #000;margin-top:2px;animation:vzlF 2.8s ease-out .15s both}#vzl .st{display:flex;gap:10px;justify-content:center;margin-top:6px}'+
 '#vzl .st b{font:700 13px system-ui;color:#e8ffe0;text-shadow:0 2px 5px #000;padding:2px 9px;border-radius:10px;background:rgba(20,40,20,.55);border:1px solid rgba(160,255,140,.45);opacity:0;animation:vzlS 2.6s ease-out forwards}'+
 '@keyframes vzlT{0%{opacity:0;transform:scale(2.2)}14%{opacity:1;transform:scale(.94)}22%{transform:scale(1)}82%{opacity:1}100%{opacity:0;transform:translateY(-10px)}}@keyframes vzlF{0%{opacity:0}15%{opacity:1}82%{opacity:1}100%{opacity:0}}@keyframes vzlS{0%{opacity:0;transform:translateY(10px)}15%{opacity:1;transform:none}80%{opacity:1}100%{opacity:0}}';document.head.appendChild(s)}
function vzLvShow(title,sub,stats,job){vzLCSS();let e=$('vzl');if(!e){e=document.createElement('div');e.id='vzl';document.body.appendChild(e)}e.className=job?'job':'';
  e.innerHTML='<div class="t">'+title+'</div><div class="lv">'+sub+'</div><div class="st">'+stats.map((s,i)=>'<b style="animation-delay:'+(.35+i*.18)+'s">'+s+'</b>').join('')+'</div>';e.hidden=false;
  const c=e.cloneNode(true);e.replaceWith(c);clearTimeout(vzLvShow.t);vzLvShow.t=setTimeout(()=>{const q=$('vzl');if(q)q.hidden=true},3200)}
function vzLvCine(L0,L1,dh,dm){const now=performance.now();if(VZL.k==='lv'&&now-VZL.t0<2500&&VZL.L0)L0=VZL.L0;VZL.t0=now;VZL.k='lv';VZL.L0=L0;VZL.job=0;
  const st=[];if(dh>0)st.push('❤️ HP +'+dh.toLocaleString());if(dm>0)st.push('💧 MP +'+dm.toLocaleString());try{if(L1>=ULV&&L0<ULV)st.push('⚡ ปลดอัลติเมต')}catch(e){}
  vzLvShow('LEVEL UP','Lv '+L0+' → <span style="color:#ffd35a;font-size:22px">'+L1+'</span>',st,0)}
function vzJobCine(){const now=performance.now();VZL.t0=now;VZL.k='job';VZL.job=1;let nm='';try{nm=(me.br===2&&CL2B[me.cls]?CL2B[me.cls].n:(CL2[me.cls]&&CL2[me.cls].n))||CL[me.cls].n}catch(e){}
  vzLvShow('✦ เปลี่ยนอาชีพสำเร็จ ✦','<span style="font-size:22px;color:#cfe6ff">'+String(nm).replace(/[<>&]/g,'')+'</span>',['⚔️ สกิลชุดใหม่','✨ พลังพื้นฐานเพิ่มขึ้น'],1);try{sfx('lvl')}catch(e){}}
/* วาดในโลก: วงเวทใต้เท้า (ชั้นพื้น) + ลำแสงจากฟ้า (ชั้นบน) */
function vzLvGround(){if(!VZL.k||!me.cls)return;const e=(performance.now()-VZL.t0)/1000,D=VZL.job?3:2.2;if(e>D)return;const a=Math.min(1,e/.25,(D-e)/.6),x=me.x,y=me.y+12,t=performance.now()/1000,C=VZL.job?'140,190,255':'255,210,90',CS=VZL.job?'#bcd8ff':'#ffe08a';
  g.save();g.translate(x,y);g.scale(1,.36);g.globalCompositeOperation='lighter';const R=(VZL.job?62:48)*Math.min(1,e/.35+.3);
  for(const [rr,dir,w] of VZL.job?[[R,1,2.4],[R*.72,-1,1.6],[R*1.25,-1,1.2]]:[[R,1,2.2],[R*.7,-1,1.4]]){g.save();g.rotate(t*dir*1.4);g.strokeStyle='rgba('+C+','+(.85*a)+')';g.lineWidth=w*2.4;g.beginPath();g.arc(0,0,rr,0,7);g.stroke();
    g.lineWidth=w*1.4;g.beginPath();for(let i=0;i<6;i++){const q=i*Math.PI/3;g.moveTo(Math.cos(q)*rr,Math.sin(q)*rr);g.lineTo(Math.cos(q+Math.PI*2/3)*rr,Math.sin(q+Math.PI*2/3)*rr)}g.stroke();
    g.fillStyle=CS;for(let i=0;i<12;i++){const q=i*Math.PI/6;g.globalAlpha=a;g.fillRect(Math.cos(q)*(rr+7)-2,Math.sin(q)*(rr+7)-2,4,4)}g.globalAlpha=1;g.restore()}
  const gr=g.createRadialGradient(0,0,0,0,0,R*1.3);gr.addColorStop(0,'rgba('+C+','+(.45*a)+')');gr.addColorStop(1,'rgba('+C+',0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,R*1.3,0,7);g.fill();g.restore()}
function vzLvTop(){if(!VZL.k||!me.cls)return;const e=(performance.now()-VZL.t0)/1000,D=VZL.job?3:2.2;if(e>D)return;const x=me.x,y=me.y,t=performance.now()/1000,C=VZL.job?'150,200,255':'255,220,120',a=Math.min(1,e/.15)*Math.max(0,1-Math.max(0,e-.5)/(D-.5));
  g.save();g.globalCompositeOperation='lighter';const w=(VZL.job?64:46)*(1-Math.max(0,e-.6)/D*.6);const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'rgba('+C+',0)');gr.addColorStop(.5,'rgba('+C+','+(.55*a)+')');gr.addColorStop(1,'rgba('+C+',0)');g.fillStyle=gr;g.fillRect(x-w,y-H,w*2,H+10);
  const g2=g.createLinearGradient(x-w*.25,0,x+w*.25,0);g2.addColorStop(0,'rgba(255,255,255,0)');g2.addColorStop(.5,'rgba(255,255,255,'+(.8*a)+')');g2.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=g2;g.fillRect(x-w*.25,y-H,w*.5,H+10);
  for(let i=0;i<(VZL.job?22:14);i++){const q=((t*.9+i/14)%1),px=x+Math.sin(i*2.3+t*2)*w*.8,py=y+6-q*180;g.fillStyle='rgba('+C+','+(a*(1-q))+')';g.beginPath();g.arc(px,py,1.8,0,7);g.fill()}
  if(e<.35){glowAt(x,y-10,90,C,(1-e/.35)*.9)}g.restore()}
/* ---------- ⑥ หน้าเปิดเกม ---------- */
const VZT={on:0,img:0,cv:null,st:[],ff:[],ss:null,gl:0};
function vzTitle(){const T=$('ttl');if(!T||VZT.on)return;const F=T.querySelector('.fr'),BG=T.querySelector('.bg');if(!F)return;VZT.on=1;
  const cv=document.createElement('canvas');cv.id='vztc';cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:transparent!important;border:0;box-shadow:none';const sh=T.querySelector('.sh');if(sh&&sh.nextSibling)F.insertBefore(cv,sh.nextSibling);else F.appendChild(cv);VZT.cv=cv;
  const im=new Image();im.onload=()=>{VZT.img=1};im.src='cover.jpg';
  for(let i=0;i<46;i++)VZT.st.push({x:.28+Math.random()*.5,y:.01+Math.random()*.17,p:Math.random()*6,s:.5+Math.random()*1.2});
  for(let i=0;i<18;i++)VZT.ff.push({x:Math.random(),y:.72+Math.random()*.26,p:Math.random()*6,v:.2+Math.random()*.4});
  const ctx=cv.getContext('2d');let last=performance.now();
  const LAN=[[.285,.375],[.405,.382],[.472,.372],[.6,.362],[.668,.37],[.823,.349],[.905,.358],[.14,.44],[.045,.49],[.94,.425]];
  function frame(){const T2=$('ttl');if(!T2||!T2.isConnected||T2.style.opacity==='0'||T2.hidden){VZT.on=0;return}
    const now=performance.now(),t=now/1000,dt=Math.min(.05,(now-last)/1000);last=now;const w=F.clientWidth,h=F.clientHeight,dpr=Math.min(2,window.devicePixelRatio||1);
    if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr)}
    try{if(BG){const tf=getComputedStyle(BG).transform;cv.style.transform=tf==='none'?'':tf;cv.style.transformOrigin='50% 60%'}}catch(e){}
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    /* แปลงตำแหน่งในภาพปก (0–1) → จุดบนจอ ตาม background-size:cover · center */
    const sc=Math.max(w/720,h/1280),iw=720*sc,ih=1280*sc,ox=(w-iw)/2,oy=(h-ih)/2,P=(fx,fy)=>[ox+fx*iw,oy+fy*ih],S=v=>v*sc;
    const glow=(x,y,r,c,a)=>{const gr=ctx.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+c+','+a+')');gr.addColorStop(1,'rgba('+c+',0)');ctx.fillStyle=gr;ctx.fillRect(x-r,y-r,r*2,r*2)};
    ctx.globalCompositeOperation='lighter';
    /* ดาวระยิบ */
    for(const s of VZT.st){const [x,y]=VZT.img?P(s.x,s.y):[s.x*w,s.y*h*.9],tw=Math.max(0,Math.sin(t*s.s*2+s.p));if(tw<.15)continue;ctx.fillStyle='rgba(255,250,235,'+(.75*tw)+')';ctx.fillRect(x-.7,y-.7,1.4,1.4);if(tw>.85){ctx.fillRect(x-3*tw,y-.3,6*tw,.6);ctx.fillRect(x-.3,y-3*tw,.6,6*tw)}}
    /* ดาวตก */
    if(!VZT.ss&&Math.random()<dt/5)VZT.ss={x:.35+Math.random()*.4,y:.02+Math.random()*.08,t:0};if(VZT.ss){const q=VZT.ss;q.t+=dt/1.1;if(q.t>1)VZT.ss=null;else{const [x0,y0]=VZT.img?P(q.x,q.y):[q.x*w,q.y*h],x=x0-q.t*S(220),y=y0+q.t*S(110),a=Math.sin(q.t*Math.PI);
      const gr=ctx.createLinearGradient(x,y,x+S(70),y-S(35));gr.addColorStop(0,'rgba(255,255,240,'+a+')');gr.addColorStop(1,'rgba(255,220,160,0)');ctx.strokeStyle=gr;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+S(70),y-S(35));ctx.stroke()}}
    if(VZT.img){
      /* ประตูมิติ */
      {const [x,y]=P(.9,.045);glow(x,y,S(70),'170,90,255',.28+.12*Math.sin(t*1.3));ctx.save();ctx.translate(x,y);ctx.scale(1,.35);ctx.rotate(t*.8);ctx.strokeStyle='rgba(220,170,255,.45)';ctx.lineWidth=S(3);for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(0,0,S(28+k*14),k,k+2.2);ctx.stroke()}ctx.restore()}
      /* กองไฟกลางค่าย + ประกายไฟ */
      {const [x,y]=P(.528,.462),fl=.75+.25*Math.sin(t*9)*Math.sin(t*5.3);glow(x,y,S(90)*fl,'255,150,50',.38*fl);glow(x,y-S(10),S(26),'255,230,150',.5*fl);
        for(let i=0;i<10;i++){const q=(t*.55+i/10)%1,px=x+Math.sin(i*2.7+t*1.5)*S(14)*(1+q),py=y-S(8)-q*S(110);ctx.fillStyle='rgba(255,'+(200-q*120|0)+',80,'+(1-q)+')';ctx.fillRect(px,py,S(2.4),S(2.4))}}
      /* ตะเกียง */
      LAN.forEach(([fx,fy],i)=>{const [x,y]=P(fx,fy),f=.7+.3*Math.sin(t*(3+i%3)+i*1.7);glow(x,y,S(16)*f,'255,190,90',.45*f)});
      /* คทาเรืองแสง */
      {const [x,y]=P(.432,.534),pu=.7+.3*Math.sin(t*2.4);glow(x,y,S(60)*pu,'255,230,140',.45*pu);ctx.save();ctx.translate(x,y);ctx.rotate(t*.4);ctx.strokeStyle='rgba(255,240,180,'+(.35*pu)+')';ctx.lineWidth=S(1.5);for(let k=0;k<8;k++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.moveTo(S(16),0);ctx.lineTo(S(34+8*Math.sin(t*3+k)),0);ctx.stroke()}ctx.restore()}
      /* กวางวิญญาณ */
      {const [x,y]=P(.885,.57),pu=.6+.4*Math.sin(t*1.6);glow(x,y,S(110),'120,190,255',.18*pu);for(let i=0;i<7;i++){const q=(t*.35+i/7)%1,[px,py]=P(.83+((i*.137)%.12),.52+((i*.29)%.16));ctx.fillStyle='rgba(170,220,255,'+(.8*Math.sin(q*Math.PI))+')';ctx.beginPath();ctx.arc(px,py-q*S(40),S(1.6),0,7);ctx.fill()}}
      /* คมดาบวาบ */
      {const per=4.5,k=(t%per)/per;if(k<.22){const q=k/.22,[x0,y0]=P(.03,.845),[x1,y1]=P(.3,.775),x=x0+(x1-x0)*q,y=y0+(y1-y0)*q;glow(x,y,S(22),'255,255,255',.75*Math.sin(q*Math.PI))}}
    }
    /* หิ่งห้อย */
    for(const f of VZT.ff){f.x+=Math.sin(t*f.v+f.p)*dt*.01;const x=f.x*w,y=f.y*h+Math.sin(t*f.v*1.7+f.p)*8,b=(Math.sin(t*2.2+f.p*3)+1)/2;glow(x,y,7,'200,255,130',.55*b);ctx.fillStyle='rgba(240,255,200,'+b+')';ctx.fillRect(x-.8,y-.8,1.6,1.6)}
    ctx.globalCompositeOperation='source-over';requestAnimationFrame(frame)}
  requestAnimationFrame(frame)}
/* ---------- ติดตั้ง ---------- */
setTimeout(()=>{try{
  const _gx=gainXP;gainXP=function(){const L0=me.lv,h0=me.mh,m0=me.mm;const r=_gx.apply(this,arguments);try{if(me.cls&&me.lv>L0){VZL.x=me.x;VZL.y=me.y;vzLvCine(L0,me.lv,Math.round(me.mh-h0),Math.round(me.mm-m0))}}catch(e){}return r};
  const _fd=fshDraw;fshDraw=function(){_fd.apply(this,arguments);try{vzLvGround()}catch(e){}};
  const _dr=drawRx;drawRx=function(){const r=_dr.apply(this,arguments);try{vzLvTop()}catch(e){}return r};
  setInterval(()=>{try{if(!me.cls){VZL.c2=-1;return}const c2=me.cls2|0,br=me.br|0;if(VZL.c2>=0&&(c2>VZL.c2||(c2&&br!==VZL.br&&VZL.br>=0&&br>0)))vzJobCine();VZL.c2=c2;VZL.br=br}catch(e){}},500);
}catch(e){console.warn('vzl init',e)}},1600);
try{if(document.readyState==='loading')addEventListener('DOMContentLoaded',()=>setTimeout(vzTitle,50));else setTimeout(vzTitle,50)}catch(e){}
