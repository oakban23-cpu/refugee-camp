/* ---------- v658 ภาพเนื้อเรื่องมีชีวิต (LCG) ----------
   ภาพ CG 29 ฉากในคัตซีน + แกลเลอรี วาดบน canvas แทนภาพนิ่ง:
   กล้องลอยช้า ๆ (หายใจ) · 2.5 มิติแบบเฉือนแถบ (ฉากล่าง=ใกล้ เลื่อนมากกว่าฉากบน) · แสงไฟวูบ/เต้นตามจุดที่มาร์กไว้ต่อภาพ
   ลำแสง · หมอกเลื่อน · อนุภาคประจำฉาก (ประกายไฟ ฝุ่นทอง หิ่งห้อย โคมลอย ดาวตก พลุ กลีบดอก ใบไม้ ฟ้าแลบ ประภาคาร ฯลฯ)
   พิกัดทุกอย่างเป็นสัดส่วนของภาพ (0–1) จึงเลื่อนไปพร้อมภาพ · โหมดประหยัด (LOWQ) ลดอนุภาค/ไม่เฉือนแถบ/30fps
   ผู้ใช้ตั้ง "ลดการเคลื่อนไหว" ในเครื่อง → ไม่ขยับกล้อง เหลือแค่แสง · ปิดทั้งหมด: LCG.on=0 */
const LCG={on:1,st:{fr:0,ms:0,err:''},C:{
  gold:'255,196,96',fire:'255,138,48',blue:'120,190,255',purple:'190,120,255',white:'235,240,255',green:'170,255,150',pink:'255,190,225',warm:'255,214,150'},
 /* g:[x,y,r,สี,แบบ f=ไฟวูบ p=เต้นช้า t=กะพริบ s=นิ่ง] · p:[ชนิด,จำนวน,[x0,y0,x1,y1],สี] · ray:[x,y,ยาว,สี] · col:[x,กว้าง,สี] · fog:[y,สูง,สี,ทึบ]
    fx: lt=[ฟ้าแลบ x0,y0,x1,y1,สี] · sh=สั่น · bm=[ประภาคาร x,y] · par=ความลึก 2.5D · sky=ขอบฟ้า (เหนือเส้นนี้ไกลสุด) */
 S:{
  1:{par:.55,sky:.35,g:[[.5,.62,.2,'gold','p'],[.5,.1,.22,'blue','p']],ray:[[.5,-.06,1.1,'warm']],p:[['mot',45,[0,.25,1,1],'gold'],['spk',22,[.3,.45,.7,.95],'gold']]},
  2:{par:.6,sky:.3,g:[[.52,.27,.06,'fire','f'],[.42,.235,.04,'fire','f'],[.625,.215,.04,'fire','f'],[.565,.5,.05,'gold','p'],[.93,.04,.05,'white','s']],
     p:[['emb',16,[.49,.2,.56,.31]],['ffl',20,[0,.5,1,.97]]],fog:[[.6,.2,'green',.16]]},
  3:{par:.45,sky:.6,g:[[.33,.25,.07,'gold','p'],[.67,.25,.07,'gold','p'],[.5,.47,.06,'gold','p']],ray:[[.5,.46,.9,'gold']],
     p:[['mot',55,[0,0,1,1],'gold'],['tw',22,[0,0,1,.3],'white']],fog:[[.86,.2,'white',.13]]},
  4:{par:.55,sky:.35,g:[[.5,.24,.13,'warm','p'],[.5,.86,.13,'blue','p'],[.56,.3,.04,'blue','t']],col:[[.5,.05,'blue']],
     p:[['spk',42,[.42,.5,.58,.97],'blue'],['mot',22,[0,.3,1,.9],'white']]},
  5:{par:.5,sky:.3,g:[[.5,.2,.22,'gold','p'],[.5,.75,.15,'gold','p']],col:[[.5,.07,'gold']],ray:[[.5,-.06,1.1,'warm']],
     p:[['spk',50,[.2,.2,.8,.92],'gold'],['mot',30,[0,0,1,1],'gold']]},
  6:{par:.6,sky:.3,g:[[.59,.66,.08,'fire','f'],[.86,.13,.06,'warm','p'],[.48,.34,.03,'fire','f'],[.62,.33,.03,'fire','f'],[.55,.42,.025,'fire','f']],
     p:[['emb',26,[.55,.56,.64,.7]],['ffl',10,[0,.72,1,1]]],lt:[.33,.0,.82,.18,'purple']},
  7:{par:.55,sky:.32,g:[[.03,.35,.045,'blue','f'],[.45,.22,.06,'blue','p'],[.95,.55,.03,'warm','f'],[.73,.5,.03,'gold','t']],
     p:[['fwk',3,[.12,.0,.48,.2]],['lan',14,[.2,.08,.95,.45]],['mot',18,[0,0,1,1],'gold']]},
  8:{par:.55,sky:.3,g:[[.62,.3,.07,'gold','p'],[.56,.43,.04,'gold','t'],[.74,.42,.03,'blue','p']],
     p:[['wsp',14,[0,0,1,.55],'purple'],['mot',20,[0,.2,1,1],'gold']],fog:[[.86,.2,'white',.2]]},
  9:{par:.5,sky:.35,g:[[.5,.05,.2,'gold','p'],[.03,.78,.035,'blue','f'],[.97,.78,.035,'blue','f'],[.5,.75,.1,'gold','p']],ray:[[.5,-.06,1.15,'warm']],
     p:[['mot',42,[0,0,1,1],'gold']],fog:[[.56,.2,'white',.17],[.86,.16,'white',.2]]},
  10:{par:.6,sky:.3,g:[[.18,.06,.05,'white','s'],[.06,.25,.04,'fire','f'],[.18,.2,.04,'fire','f'],[.8,.4,.08,'gold','p']],
     p:[['wsp',16,[.3,0,1,.6],'purple'],['emb',12,[.03,.18,.2,.3]],['spk',12,[.75,.35,.85,.46],'gold']]},
  11:{par:.55,sky:.25,g:[[.53,.33,.1,'fire','p'],[.07,.3,.11,'blue','p'],[.47,.45,.04,'gold','p'],[.6,.8,.12,'fire','f']],
     p:[['emb',44,[.2,.6,1,1]],['spk',16,[0,.1,.16,.6],'blue']]},
  12:{par:.5,sky:.2,g:[[.73,.3,.11,'white','p'],[.52,.47,.04,'gold','p'],[.6,.04,.05,'white','t'],[.82,.04,.05,'white','t']],
     p:[['spk',32,[.6,.1,.92,.62],'white'],['tw',16,[.4,0,1,.15],'white']]},
  13:{par:.55,sky:.4,g:[[.92,.58,.13,'warm','p'],[.4,.53,.045,'gold','p'],[.25,.3,.05,'gold','t'],[.65,.62,.06,'gold','p']],
     p:[['tw',40,[.25,.35,.95,.85],'gold'],['tw',20,[0,0,1,.25],'white'],['mot',15,[0,0,1,1],'gold']]},
  14:{par:.6,sky:.3,g:[[.27,.12,.13,'warm','p'],[.6,.25,.04,'fire','f'],[.85,.32,.04,'fire','f'],[.49,.35,.04,'gold','p'],[.45,.9,.04,'fire','f']],ray:[[.27,.1,.8,'warm']],
     p:[['mot',30,[0,0,1,1],'gold'],['tw',12,[.5,.5,1,.92],'gold']],fog:[[.88,.18,'white',.15]]},
  15:{par:.55,sky:.3,g:[[.12,.3,.08,'gold','p'],[.43,.03,.11,'warm','p']],p:[['ffl',26,[0,.6,1,1]],['mot',20,[0,0,1,1],'gold']]},
  16:{par:.6,sky:.28,g:[[.6,.25,.05,'gold','p'],[.47,.6,.04,'gold','p'],[.08,.2,.03,'fire','f'],[.15,.48,.03,'fire','f'],[.85,.4,.03,'fire','f']],
     p:[['sst',6,[.25,0,1,.3]],['mot',22,[0,.3,1,1],'gold'],['tw',14,[0,0,1,.25],'white']]},
  17:{par:.5,sky:.2,g:[[.39,.72,.06,'fire','f'],[.02,.7,.045,'fire','f'],[.4,.12,.16,'gold','p'],[.7,.85,.04,'fire','f']],
     p:[['mot',42,[0,0,1,1],'gold'],['emb',10,[.35,.6,.45,.74]]]},
  18:{par:.6,sky:.4,g:[[.8,.32,.11,'fire','f'],[.1,.12,.035,'warm','p'],[.07,.6,.03,'fire','f'],[.91,.55,.03,'fire','f']],bm:[.1,.12],
     p:[['lan',26,[0,0,1,1]],['emb',22,[.7,.2,.96,.42]]]},
  19:{par:.55,sky:.45,g:[[.72,.25,.045,'blue','p'],[.25,.27,.09,'warm','p'],[.43,.45,.05,'gold','p']],
     p:[['tw',26,[.1,0,1,.4],'white'],['mot',20,[0,0,1,1],'gold']],fog:[[.76,.26,'white',.22]]},
  20:{par:.6,sky:.3,g:[[.57,.12,.05,'fire','f'],[.92,.08,.07,'white','s'],[.05,.85,.045,'fire','f'],[.85,.95,.04,'fire','f'],[.35,.7,.03,'fire','f']],
     p:[['lan',18,[0,0,1,.6]],['tw',15,[0,0,1,.3],'white']]},
  21:{par:.55,sky:.35,g:[[.37,.38,.03,'blue','p'],[.97,.6,.045,'fire','f'],[.73,.4,.07,'gold','p'],[.82,.45,.03,'gold','p'],[.06,.72,.05,'gold','p']],
     p:[['tw',42,[0,0,1,.4],'white'],['mot',20,[0,.3,1,1],'gold']]},
  22:{par:.45,sky:.5,g:[[.95,.8,.07,'gold','p'],[.82,.88,.04,'gold','p'],[.07,.2,.045,'gold','p'],[.73,.38,.07,'purple','p'],[.3,.35,.07,'white','p']],
     p:[['tw',55,[0,0,1,1],'white'],['spk',15,[.6,.2,.9,.6],'purple']]},
  23:{par:.55,sky:.35,g:[[.02,.5,.045,'fire','f'],[.47,.27,.03,'blue','p'],[.25,.92,.05,'white','p'],[.35,.75,.04,'gold','t']],
     p:[['tw',42,[0,0,1,.45],'white'],['mot',15,[0,.4,1,1],'gold']]},
  24:{par:.6,sky:.25,sh:1,g:[[.6,.05,.11,'warm','p'],[.55,.6,.16,'fire','p']],p:[['dst',42,[.3,.3,1,.92]],['emb',16,[.4,.5,.9,.8]]]},
  25:{par:.55,sky:.3,g:[[.53,.07,.03,'gold','p'],[.585,.07,.03,'gold','p'],[.22,.43,.05,'fire','f'],[.36,.55,.045,'gold','p']],
     p:[['mot',52,[0,0,1,1],'gold'],['spk',12,[.1,.6,.9,1],'gold']]},
  26:{par:.6,sky:.25,g:[[.1,.43,.045,'fire','f'],[.37,.83,.045,'fire','f'],[.9,.1,.09,'warm','p'],[.65,.62,.045,'gold','p']],
     p:[['lea',22,[0,0,1,.5],'gold'],['mot',20,[0,0,1,1],'gold']]},
  27:{par:.55,sky:.35,g:[[.45,.1,.025,'gold','p'],[.51,.1,.025,'gold','p'],[.36,.5,.045,'gold','p']],
     p:[['pet',32,[0,0,1,.5],'pink'],['mot',25,[0,0,1,1],'gold'],['ffl',10,[0,.7,1,1]]]},
  28:{par:.5,sky:.3,g:[[.4,.05,.22,'gold','p'],[.68,.35,.03,'gold','p'],[.36,.5,.055,'gold','p']],ray:[[.4,-.06,1.1,'gold']],
     p:[['lea',32,[0,0,1,.6],'gold'],['mot',42,[0,0,1,1],'gold']]},
  29:{par:.6,sky:.3,g:[[.45,.78,.09,'fire','f'],[.3,.88,.045,'fire','f'],[.28,.55,.03,'fire','f']],
     p:[['emb',36,[.4,.7,.5,.85]],['lea',20,[.3,0,1,.4],'gold'],['mot',15,[0,0,1,1],'gold']]}
 }};
/* ---------- สไปรต์ที่วาดครั้งเดียว ---------- */
const LCGS={glow:{},dot:{},fog:null,ray:null};
function lcgGlow(c){let s=LCGS.glow[c];if(s)return s;s=document.createElement('canvas');s.width=s.height=128;const x=s.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);
  g.addColorStop(0,'rgba('+c+',1)');g.addColorStop(.25,'rgba('+c+',.55)');g.addColorStop(.6,'rgba('+c+',.14)');g.addColorStop(1,'rgba('+c+',0)');x.fillStyle=g;x.fillRect(0,0,128,128);return LCGS.glow[c]=s}
function lcgDot(c){let s=LCGS.dot[c];if(s)return s;s=document.createElement('canvas');s.width=s.height=32;const x=s.getContext('2d'),g=x.createRadialGradient(16,16,0,16,16,16);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.18,'rgba('+c+',1)');g.addColorStop(.5,'rgba('+c+',.35)');g.addColorStop(1,'rgba('+c+',0)');x.fillStyle=g;x.fillRect(0,0,32,32);return LCGS.dot[c]=s}
function lcgFog(){if(LCGS.fog)return LCGS.fog;const s=document.createElement('canvas');s.width=512;s.height=128;const x=s.getContext('2d');let r=7;const rn=()=>(r=(r*16807)%2147483647)/2147483647;
  for(let i=0;i<70;i++){const cx=rn()*512,cy=40+rn()*48,rr=18+rn()*40;for(const dx of[-512,0,512]){const g=x.createRadialGradient(cx+dx,cy,0,cx+dx,cy,rr);g.addColorStop(0,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(cx+dx-rr,cy-rr,rr*2,rr*2)}}
  return LCGS.fog=s}
function lcgRay(){if(LCGS.ray)return LCGS.ray;const s=document.createElement('canvas');s.width=s.height=512;const x=s.getContext('2d');x.translate(256,0);let r=3;const rn=()=>(r=(r*16807)%2147483647)/2147483647;
  for(let i=0;i<11;i++){const a=(i/10-.5)*1.3+(rn()-.5)*.08,w=.025+rn()*.05,g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');
    x.fillStyle=g;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(a-w)*600,Math.cos(a-w)*600);x.lineTo(Math.sin(a+w)*600,Math.cos(a+w)*600);x.closePath();x.fill()}
  return LCGS.ray=s}
function lcgTint(cv,c){/* สไปรต์ขาว → ย้อมสี (เก็บแคชตามสี) */const k=cv===LCGS.fog?'f':'r';cv['_'+k+c]=cv['_'+k+c]||(()=>{const s=document.createElement('canvas');s.width=cv.width;s.height=cv.height;const x=s.getContext('2d');
  x.drawImage(cv,0,0);x.globalCompositeOperation='source-in';x.fillStyle='rgb('+c+')';x.fillRect(0,0,s.width,s.height);return s})();return cv['_'+k+c]}
/* ---------- ตัววาด: หนึ่งตัวต่อ canvas ---------- */
function lcgMake(cv,mode){/* mode: 'scene'=เต็มจอแบบ cover/แนวตั้ง contain · 'view'=เต็ม canvas (แกลเลอรี) */
  const R={cv,x:cv.getContext('2d'),mode,n:0,img:null,t0:0,P:[],raf:0,last:0,fx:{},alive:false};
  const rnd=(a,b)=>a+Math.random()*(b-a);
  R.set=function(n,img){R.n=n;R.img=img;R.t0=performance.now();R.P=[];R.fx={fw:[],ss:[],lt:{t:2+Math.random()*3,a:0},sh:{t:3,a:0}};const S=LCG.S[n]||{};
    const lo=typeof LOWQ!=='undefined'&&LOWQ;for(const q of S.p||[]){const k=Math.max(2,Math.round(q[1]*(lo?.45:1)));if(q[0]==='fwk'||q[0]==='sst'){R.fx[q[0]]={n:q[1],r:q[2]};continue}for(let i=0;i<k;i++)R.P.push(lcgSpawn(q,true))}
    R.alive=true;if(!R.raf)R.raf=requestAnimationFrame(R.loop)};
  R.stop=function(){R.alive=false;if(R.raf)cancelAnimationFrame(R.raf);R.raf=0};
  R.loop=function(now){R.raf=0;if(!R.alive)return;const lo=typeof LOWQ!=='undefined'&&LOWQ;
    if(lo&&now-R.last<31){R.raf=requestAnimationFrame(R.loop);return}const dt=Math.min(.05,(now-(R.last||now))/1000);R.last=now;
    try{const t0=performance.now();lcgDraw(R,(now-R.t0)/1000,dt);LCG.st.fr++;LCG.st.ms=LCG.st.ms*.95+(performance.now()-t0)*.05}catch(e){LCG.st.err=String(e).slice(0,160)}
    R.raf=requestAnimationFrame(R.loop)};
  return R}
function lcgSpawn(q,init){const[k,,b,col]=q,c=LCG.C[col]||col,rx=b[0]+Math.random()*(b[2]-b[0]),ry=b[1]+Math.random()*(b[3]-b[1]),r=Math.random;
  const o={k,b,c:c||'255,220,150',x:rx,y:ry,ph:r()*6.28,life:0,max:2+r()*4,s:1};
  if(k==='emb'){o.c=o.c==='255,220,150'?LCG.C.fire:o.c;o.vx=(r()-.5)*.01;o.vy=-(.03+r()*.05);o.s=.6+r()*.8;o.max=1.5+r()*2.5}
  else if(k==='spk'){o.vx=(r()-.5)*.012;o.vy=-(.02+r()*.06);o.s=.5+r()*.9;o.max=1.5+r()*3}
  else if(k==='mot'){o.vx=(r()-.5)*.008;o.vy=(r()-.6)*.008;o.s=.35+r()*.7;o.max=4+r()*6}
  else if(k==='ffl'){o.c=LCG.C.green;o.vx=(r()-.5)*.02;o.vy=(r()-.5)*.012;o.s=.6+r()*.6;o.max=4+r()*5}
  else if(k==='tw'){o.vx=o.vy=0;o.s=.4+r()*.9;o.max=1+r()*2.5}
  else if(k==='lan'){o.c=LCG.C.warm;o.vx=(r()-.5)*.004;o.vy=-(.006+r()*.01);o.s=.7+r()*1.2;o.max=12+r()*10}
  else if(k==='wsp'){o.vx=.006+r()*.01;o.vy=-(.002+r()*.006);o.s=2+r()*3;o.max=5+r()*5}
  else if(k==='dst'){o.c='210,170,120';o.vx=(r()-.5)*.006;o.vy=.02+r()*.04;o.s=.4+r()*.8;o.max=3+r()*3}
  else if(k==='pet'||k==='lea'){o.vx=.01+r()*.02;o.vy=.025+r()*.03;o.s=.8+r()*.8;o.max=6+r()*6;o.rot=r()*6.28;o.vr=(r()-.5)*3}
  if(init)o.life=r()*o.max;return o}
function lcgDraw(R,t,dt){const cv=R.cv,x=R.x,img=R.img;if(!img||!img.naturalWidth)return;
  const dpr=Math.min(typeof LOWQ!=='undefined'&&LOWQ?1:1.5,window.devicePixelRatio||1),W=Math.max(1,Math.round(cv.clientWidth*dpr)),H=Math.max(1,Math.round(cv.clientHeight*dpr));
  if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H}
  const S=LCG.S[R.n]||{},lo=typeof LOWQ!=='undefined'&&LOWQ,still=LCG.rm,iw=img.naturalWidth,ih=img.naturalHeight;
  /* วางภาพ: cover (แนวนอน) · contain สูงกว่ากลางนิดหน่อย (แนวตั้ง) · เต็ม canvas (แกลเลอรี) */
  let bw,bh,bx,by;const port=R.mode==='scene'&&W/H<1.3;
  if(R.mode==='view'){bw=W;bh=H;bx=0;by=0}else if(port){bw=W;bh=W*ih/iw;bx=0;by=H/2-bh*.62}else{const k=Math.max(W/iw,H/ih);bw=iw*k;bh=ih*k;bx=(W-bw)/2;by=(H-bh)/2}
  /* กล้องหายใจ: ซูมเผื่อขอบ + ลอยช้า (ภาพคู่ลอยกลับทาง) */
  const dir=R.n%2?1:-1,T=still?0:t,z=1.075+.022*Math.sin(T*.23),cx=dir*Math.sin(T*.27)*.018,cy=Math.sin(T*.19+1)*.010;
  let shx=0,shy=0;if(S.sh&&!still){const f=R.fx.sh;f.t-=dt;if(f.t<0){f.t=4+Math.random()*4;f.a=1}f.a=Math.max(0,f.a-dt*1.6);shx=(Math.random()-.5)*f.a*bw*.006;shy=(Math.random()-.5)*f.a*bh*.006}
  const DW=bw*z,DH=bh*z,DX=bx-(DW-bw)/2+cx*bw+shx,DY=by-(DH-bh)/2+cy*bh+shy;
  x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,W,H);x.save();x.beginPath();x.rect(bx,by,bw,bh);x.clip();
  /* 2.5 มิติ: เฉือนเป็นแถบแนวนอน แถบล่างเลื่อนตามกล้องมากกว่า (ใกล้กว่า) */
  const par=(S.par==null?.55:S.par)*(still?0:1),sky=S.sky==null?.3:S.sky;
  const dep=v=>v<sky?0:Math.pow((v-sky)/(1-sky),1.4);const sway=dir*Math.sin(T*.27)*bw*.022*par,lift=Math.sin(T*.19+1)*bh*.008*par;
  if(lo||!par){x.drawImage(img,DX-sway*.3,DY,DW,DH)}else{const N=36;for(let i=0;i<N;i++){const v0=i/N,v1=(i+1)/N,d=dep((v0+v1)/2);
    const sy=v0*ih,sh=(v1-v0)*ih,dy=DY+v0*DH,dh=(v1-v0)*DH+1;x.drawImage(img,0,sy,iw,sh,DX+sway*(d-.35),dy+lift*d,DW,dh)}}
  /* จุดในภาพ → จอ (ตามความลึกของจุดนั้น) */
  const P=(u,v)=>{const d=dep(Math.min(1,Math.max(0,v)));return[DX+u*DW+sway*(d-.35),DY+v*DH+lift*d]};const U=DW/1000;
  x.globalCompositeOperation='lighter';
  /* หมอก */
  for(const f of S.fog||[]){const fs=lcgTint(lcgFog(),LCG.C[f[2]]||f[2]),[,yy]=P(.5,f[0]),hh=f[1]*DH,ww=hh*4,off=((T*.012*DW)%ww+ww)%ww;
    x.globalAlpha=f[3]*(.8+.2*Math.sin(T*.4));for(let xx=DX-ww+off;xx<DX+DW;xx+=ww)x.drawImage(fs,xx,yy-hh/2,ww,hh);
    x.globalAlpha=f[3]*.6;const off2=((-T*.02*DW)%ww+ww)%ww;for(let xx=DX-ww+off2;xx<DX+DW;xx+=ww)x.drawImage(fs,xx,yy-hh*.3,ww,hh*.8)}
  /* ลำแสง */
  for(const r of S.ray||[]){const rs=lcgTint(lcgRay(),LCG.C[r[3]]||r[3]),[px,py]=P(r[0],r[1]),L=r[2]*DH;x.save();x.translate(px,py);x.rotate(Math.sin(T*.13)*.06);
    x.globalAlpha=.32+.14*Math.sin(T*.5)+.06*Math.sin(T*1.7);x.drawImage(rs,-L,0,L*2,L*1.1);x.restore()}
  for(const c of S.col||[]){const[px]=P(c[0],.5),w=c[1]*DW,cc=LCG.C[c[2]]||c[2],g=x.createLinearGradient(px-w,0,px+w,0);const a=.18+.1*Math.sin(T*2.1)+.05*Math.sin(T*7.3);
    g.addColorStop(0,'rgba('+cc+',0)');g.addColorStop(.5,'rgba('+cc+','+a+')');g.addColorStop(1,'rgba('+cc+',0)');x.globalAlpha=1;x.fillStyle=g;x.fillRect(px-w,DY,w*2,DH)}
  /* ประภาคาร */
  if(S.bm){const[px,py]=P(S.bm[0],S.bm[1]),a=T*.9,L=DW*.55;x.save();x.translate(px,py);x.rotate(a);const g=x.createLinearGradient(0,0,L,0);g.addColorStop(0,'rgba(255,240,200,.5)');g.addColorStop(1,'rgba(255,240,200,0)');
    x.fillStyle=g;x.globalAlpha=.55+.45*Math.cos(a);x.beginPath();x.moveTo(0,0);x.lineTo(L,-L*.07);x.lineTo(L,L*.07);x.closePath();x.fill();x.restore()}
  /* แสงตามจุด */
  for(const q of S.g||[]){const[px,py]=P(q[0],q[1]),cc=LCG.C[q[3]]||q[3],ty=q[4];let a;
    if(ty==='f')a=.62+.2*Math.sin(T*9.1+q[0]*40)+.12*Math.sin(T*23.7+q[1]*30)+.08*(Math.random()-.5);else if(ty==='t')a=.35+.45*Math.pow(.5+.5*Math.sin(T*3.3+q[0]*20),3);
    else if(ty==='s')a=.5+.05*Math.sin(T*.7);else a=.5+.22*Math.sin(T*1.25+q[0]*9);
    const rr=q[2]*DW*(ty==='f'?1+.06*Math.sin(T*13+q[1]*50):1+.08*Math.sin(T*1.25+q[0]*9));x.globalAlpha=Math.max(0,Math.min(1,a));x.drawImage(lcgGlow(cc),px-rr,py-rr,rr*2,rr*2)}
  /* ฟ้าแลบ */
  if(S.lt&&!still){const f=R.fx.lt,l=S.lt;f.t-=dt;if(f.t<0){f.t=3.5+Math.random()*4;f.a=1;f.b=Math.random()<.5}f.a=Math.max(0,f.a-dt*3.2);
    const a=f.a*(f.b&&f.a<.6&&f.a>.4?.3:1);if(a>.01){const[x0,y0]=P(l[0],l[1]),[x1,y1]=P(l[2],l[3]),cc=LCG.C[l[4]]||l[4];x.globalAlpha=a*.75;x.drawImage(lcgGlow(cc),x0-(x1-x0)*.2,y0-(y1-y0)*1.5,(x1-x0)*1.4,(y1-y0)*4);x.globalAlpha=a*.16;x.fillStyle='rgb('+cc+')';x.fillRect(bx,by,bw,bh)}}
  /* อนุภาค */
  const ease=o=>{const u=o.life/o.max;return u<.15?u/.15:u>.75?(1-u)/.25:1};
  for(let i=0;i<R.P.length;i++){let o=R.P[i];o.life+=dt;if(o.life>o.max){R.P[i]=o=lcgSpawn([o.k,0,o.b,o.c],false);continue}
    o.x+=o.vx*dt*(o.k==='ffl'||o.k==='wsp'?Math.sin(T*.8+o.ph)*1.2+.3:1);o.y+=o.vy*dt;if(o.k==='emb'||o.k==='spk'||o.k==='lan')o.x+=Math.sin(T*1.6+o.ph)*.0007;
    if(o.k==='pet'||o.k==='lea'){o.x+=Math.sin(T*1.3+o.ph)*.0009;o.rot+=o.vr*dt}
    const[px,py]=P(o.x,o.y),e=ease(o);let a=e,sz=o.s*U;
    if(o.k==='mot')a*=.55+.35*Math.sin(T*2+o.ph);else if(o.k==='tw'){a*=Math.pow(.5+.5*Math.sin(T*4+o.ph),2);sz*=1.2}else if(o.k==='ffl')a*=.4+.6*Math.pow(.5+.5*Math.sin(T*2.2+o.ph),2);
    if(o.k==='wsp'){x.globalAlpha=a*.16;const s=sz*26;x.drawImage(lcgGlow(o.c),px-s,py-s*.6,s*2,s*1.2);continue}
    if(o.k==='lan'){x.globalAlpha=a*.9;const s=sz*6;x.drawImage(lcgGlow(o.c),px-s*2,py-s*2,s*4,s*4);x.globalCompositeOperation='source-over';x.fillStyle='rgba(255,176,80,'+(a*.9)+')';x.fillRect(px-s*.45,py-s*.6,s*.9,s*1.1);x.fillStyle='rgba(255,236,170,'+(a*.9)+')';x.fillRect(px-s*.25,py-s*.1,s*.5,s*.5);x.globalCompositeOperation='lighter';continue}
    if(o.k==='pet'||o.k==='lea'){x.globalCompositeOperation='source-over';x.globalAlpha=a*.85;x.save();x.translate(px,py);x.rotate(o.rot);x.scale(1,.45+.35*Math.sin(o.rot*1.7));
      x.fillStyle=o.k==='pet'?'rgba('+o.c+',1)':'rgba(240,186,70,1)';x.beginPath();x.ellipse(0,0,sz*5,sz*2.6,0,0,6.29);x.fill();x.restore();x.globalCompositeOperation='lighter';continue}
    if(o.k==='dst'){x.globalCompositeOperation='source-over';x.globalAlpha=a*.5;x.fillStyle='rgba('+o.c+',1)';x.fillRect(px,py,sz*2.2,sz*2.2);x.globalCompositeOperation='lighter';continue}
    x.globalAlpha=Math.max(0,Math.min(1,a));const s=sz*(o.k==='emb'||o.k==='spk'?5:6);x.drawImage(lcgDot(o.c),px-s,py-s,s*2,s*2)}
  /* ดาวตก */
  if(R.fx.sst&&!still){const F=R.fx.sst;F.L=F.L||[];if(F.L.length<2&&Math.random()<dt*.9){const b=F.r;F.L.push({x:b[0]+Math.random()*(b[2]-b[0])+.15,y:b[1]+Math.random()*(b[3]-b[1])*.6,l:0})}
    for(const s of F.L){s.l+=dt;s.x-=dt*.55;s.y+=dt*.32;const[px,py]=P(s.x,s.y),a=Math.max(0,1-s.l/1.1),len=DW*.09,g=x.createLinearGradient(px,py,px+len,py-len*.58);
      g.addColorStop(0,'rgba(255,240,210,'+a+')');g.addColorStop(1,'rgba(255,200,140,0)');x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=Math.max(1,U*2.4);x.beginPath();x.moveTo(px,py);x.lineTo(px+len,py-len*.58);x.stroke();x.globalAlpha=a;const s2=U*14;x.drawImage(lcgDot('255,236,190'),px-s2,py-s2,s2*2,s2*2)}
    F.L=F.L.filter(s=>s.l<1.1)}
  /* พลุ */
  if(R.fx.fwk&&!still){const F=R.fx.fwk;F.L=F.L||[];F.cd=(F.cd||0)-dt;if(F.cd<0){F.cd=1.1+Math.random()*1.4;const b=F.r,cx=b[0]+Math.random()*(b[2]-b[0]),cy=b[1]+Math.random()*(b[3]-b[1]),
      cc=['255,200,90','255,120,200','150,200,255','200,140,255','170,255,170'][Math.floor(Math.random()*5)],n=lo?14:28;for(let i=0;i<n;i++){const a=i/n*6.283,v=.05+Math.random()*.025;F.L.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v*1.5,l:0,c:cc})}}
    for(const p of F.L){p.l+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=dt*.03;p.vx*=1-dt*.9;p.vy*=1-dt*.9;const[px,py]=P(p.x,p.y),a=Math.max(0,1-p.l/1.6);x.globalAlpha=a;const s=U*6;x.drawImage(lcgDot(p.c),px-s,py-s,s*2,s*2)}
    F.L=F.L.filter(p=>p.l<1.6)}
  x.restore();x.globalAlpha=1;x.globalCompositeOperation='source-over';
  /* ขอบมืดเบา ๆ ให้ดูเป็นฉากหนัง */
  if(R.mode==='scene'&&!port){const g=x.createRadialGradient(W/2,H*.48,Math.min(W,H)*.35,W/2,H*.5,Math.max(W,H)*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.38)');x.fillStyle=g;x.fillRect(0,0,W,H)}}
/* ---------- ต่อเข้ากับภาพเนื้อเรื่องเดิม (CGX) ---------- */
try{LCG.rm=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){}
function lcgScene(){const d=cgEl();let cv=d.querySelector('canvas.lcg');if(!cv){cv=document.createElement('canvas');cv.className='lcg';d.insertBefore(cv,d.querySelector('.tt'));
    if(!document.getElementById('lcgcss')){const st=document.createElement('style');st.id='lcgcss';st.textContent='#cgov canvas.lcg{position:absolute;left:0;top:0;width:100%;height:100%;display:none;background:transparent!important;border:0!important;box-shadow:none!important;margin:0!important}#cgov.lcgon canvas.lcg{display:block}#cgov.lcgon .fg{opacity:0}#cgview canvas.lcg{position:absolute;pointer-events:none;box-shadow:0 0 30px #000;background:transparent!important;border:0!important;margin:0!important}';document.head.appendChild(st)}}
  if(!LCG.R||LCG.R.cv!==cv)LCG.R=lcgMake(cv,'scene');return LCG.R}
setTimeout(()=>{try{
  const oS=cgShow;window.cgShow=cgShow=function(n){const r=oS.apply(this,arguments);try{const d=CGX.el;if(!LCG.on||!d){if(d)d.classList.remove('lcgon');return r}
    const I=cgLoad(n),R=lcgScene();const go=()=>{if(CGX.cur!==n)return;R.set(n,I);d.classList.add('lcgon')};if(I.complete&&I.naturalWidth)go();else I.addEventListener('load',go,{once:true})}catch(e){LCG.st.err=String(e)}return r};
  const oH=cgHide;window.cgHide=cgHide=function(){const r=oH.apply(this,arguments);try{const R=LCG.R;if(R){const n0=R.n;setTimeout(()=>{if(!CGX.cur&&R.n===n0){R.stop();if(CGX.el)CGX.el.classList.remove('lcgon')}},1000)}}catch(e){}return r};
  /* แกลเลอรี: ภาพเต็มก็ขยับ */
  const oV=cgView;window.cgView=cgView=function(n){const r=oV.apply(this,arguments);try{if(!LCG.on)return r;const v=document.getElementById('cgview'),im=v&&v.querySelector('img');if(!im)return r;
    lcgScene();const cv=document.createElement('canvas');cv.className='lcg';v.appendChild(cv);const R=lcgMake(cv,'view');LCG.V=R;
    const fit=()=>{const b=im.getBoundingClientRect(),p=v.getBoundingClientRect();Object.assign(cv.style,{left:(b.left-p.left)+'px',top:(b.top-p.top)+'px',width:b.width+'px',height:b.height+'px'})};
    const sync=()=>{if(!v.isConnected){R.stop();return}const m=+((im.src.match(/hd-cg(\d+)\.webp/)||[])[1]||0);if(!m)return;const I=cgLoad(m);const go=()=>{fit();R.set(m,I)};if(I.complete&&I.naturalWidth)go();else I.addEventListener('load',go,{once:true})};
    im.addEventListener('load',sync);const mo=new MutationObserver(()=>{if(!v.isConnected){R.stop();mo.disconnect();removeEventListener('resize',fit)}});mo.observe(document.body,{childList:true});addEventListener('resize',fit);sync()}catch(e){LCG.st.err=String(e)}return r};
}catch(e){console.warn('v658',e)}},120);
