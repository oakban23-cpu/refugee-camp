/* ---------- v352 แสงตัวละคร/มอนตามสภาพแวดล้อม · พื้นนครและภาค 5–6 ---------- */
/* 6.1) แสงแวดล้อม + แสงขอบรายธีม (ทุกแมพ/ดันเจี้ยน): [แสงตกจากบน, เงาด้านล่าง, สีแสงขอบ] */
const AMB2={grass:['rgba(255,244,200,.2)','rgba(10,26,8,.42)','255,240,190'],bone:['rgba(240,228,210,.16)','rgba(30,20,14,.44)','245,230,205'],stone:['rgba(225,215,255,.16)','rgba(16,10,34,.44)','220,205,255'],void:['rgba(205,165,255,.16)','rgba(20,6,44,.48)','205,160,255'],
  wind:['rgba(240,248,255,.22)','rgba(30,40,70,.36)','235,245,255'],garden:['rgba(255,240,245,.2)','rgba(14,30,12,.4)','255,225,235'],clock:['rgba(255,214,150,.2)','rgba(36,20,6,.44)','255,210,140'],meteor:['rgba(160,250,245,.16)','rgba(4,26,30,.46)','150,250,240'],
  bolt:['rgba(170,215,255,.18)','rgba(6,12,40,.48)','170,215,255'],gale:['rgba(255,236,190,.2)','rgba(44,30,12,.4)','255,230,180'],tempest:['rgba(200,190,255,.16)','rgba(14,10,36,.5)','200,190,255'],
  mush:['rgba(130,255,230,.17)','rgba(0,24,26,.5)','120,255,230'],bog:['rgba(220,170,255,.16)','rgba(22,8,36,.5)','220,170,255'],ruin:['rgba(220,220,245,.15)','rgba(14,14,26,.48)','220,220,250'],throne:['rgba(210,140,255,.16)','rgba(20,4,36,.52)','210,140,255'],
  roots:['rgba(255,196,110,.17)','rgba(30,16,4,.5)','255,196,110'],glake:['rgba(120,230,255,.18)','rgba(0,16,32,.52)','120,230,255'],knight:['rgba(185,215,255,.16)','rgba(8,12,24,.5)','185,215,255'],core:['rgba(255,140,70,.18)','rgba(46,6,0,.5)','255,140,70'],
  city:['rgba(255,244,215,.2)','rgba(20,20,40,.36)','255,240,210'],palace:['rgba(255,220,150,.2)','rgba(40,14,10,.42)','255,215,140'],qgarden:['rgba(255,252,230,.22)','rgba(16,34,14,.36)','255,248,225'],stars:['rgba(200,175,255,.17)','rgba(14,6,36,.5)','205,180,255'],
  dawn:['rgba(255,226,170,.24)','rgba(50,30,20,.32)','255,224,165'],ring:['rgba(255,220,170,.18)','rgba(30,22,16,.42)','255,215,160'],aranya:['rgba(190,170,255,.16)','rgba(16,10,32,.48)','195,175,255'],pit:['rgba(200,150,255,.15)','rgba(16,6,30,.54)','200,150,255']};
function ambTheme(){let d=0;try{d=isDg()||isTw()||isArena()}catch(e){}if(d){try{const k=dgTheme();return k==null?null:DGTH[k]}catch(e){return null}}return DEPM[curMap]||null}
{const _a=gxAmb;gxAmb=function(){const th=ambTheme(),A=th&&AMB2[th];if(!A)return _a();let nt=false;try{nt=isNight()&&!isDg()}catch(e){}const k='d2'+th+(nt?'n':'d');if(GX.ambK===k)return GX.amb;GX.ambK=k;
  const L=[A[0],A[1]];if(nt){L[0]='rgba(170,195,255,.13)';L[1]=A[1].replace(/,[\d.]+\)$/,',.54)')}return GX.amb=L}}
{const _r=gxRimCol;gxRimCol=function(){const th=ambTheme(),A=th&&AMB2[th];if(!A)return _r();let nt=false;try{nt=isNight()&&!isDg()}catch(e){}return nt?'170,200,255':A[2]}}
/* 6.2) มอนสเตอร์ได้แสงแวดล้อม + แสงขอบแบบเดียวกับผู้เล่น (จำกัดจำนวนต่อเฟรมให้ลื่นบนมือถือ · บอสได้เสมอ) */
const MLB={n:0,cap:5,S:new Set(),f:0};
function monLit(m,fn){if(LOWQ||(typeof FQ!=='undefined'&&FQ.avg>20)){fn();return}const boss=m.t===3;if(!boss&&!MLB.S.has(m)){fn();return}
  let R=12;try{R=mR(m)}catch(e){R=(MT[m.t]&&MT[m.t].r)||12}const hw=R*(boss?2.6:1.9)+14,hh=R*(boss?2.6:2.1)+18,G=g,Mm=g.getTransform();let first=true;
  try{gxLit(m.x,m.y-R*.7,hw,hh,()=>{if(first){first=false;const M0=g.getTransform();MLSH={g:G,dx:Mm.e-M0.e,dy:Mm.f-M0.f,ga:G.globalAlpha}}fn()})}finally{MLSH=null}}
/* เงาใต้มอนวาดลงพื้นจริง (นอกก้อนที่ลงแสง) → ไม่ถูกย้อมสี/ไม่มีขอบเรือง */
let MLSH=null;
{const _s=gxShadow;gxShadow=function(x,y,rx,ry,a){if(MLSH&&g!==MLSH.g){const T=g.getTransform(),o=g;g=MLSH.g;g.save();g.setTransform(T.a,T.b,T.c,T.d,T.e+MLSH.dx,T.f+MLSH.dy);g.globalAlpha=MLSH.ga;g.globalCompositeOperation='source-over';try{_s(x,y,rx,ry,a)}finally{g.restore();g=o}return}return _s(x,y,rx,ry,a)}}
{const _ps=plxScreen;window.plxScreen=plxScreen=function(){_ps();if(++MLB.f%6)return;MLB.S.clear();if(LOWQ||!me.cls)return;const L=[];for(const m of mons){if(m.t===3||m.hp<=0)continue;const d=Math.abs(m.x-me.x)+Math.abs(m.y-me.y);if(d<520)L.push([d,m])}L.sort((a,b)=>a[0]-b[0]);for(let i=0;i<Math.min(MLB.cap,L.length);i++)MLB.S.add(L[i][1])}}
/* 6.3) พื้นนครอัสตรา + ภาค 5–6: เงาเมฆลอยผ่าน (ที่โล่งฟ้า) · ลำแสงจากหน้าต่างตกบนพื้น (ในอาคาร) · ฝุ่นในลำแสง */
function d6Ground(){if(LOWQ||!me.cls)return;let d=0;try{d=isDg()||isTw()||isArena()}catch(e){}if(d)return;const M=curMap;let h=12;try{h=dnHour()}catch(e){}const day=h>=6.5&&h<=18.5,t=performance.now()/1000;
  if((M===9||M===28||M===30)&&day){const B=plxBlob(),sp=M===30?18:12,a=M===9?.11:.15;g.save();for(let i=0;i<9;i++){const sx=((i*743+t*sp)%3800+3800)%3800-300,sy=((i*1291)%3400)-100+Math.sin(t*.05+i)*60,s=1.6+(i%3)*.7;
    if(sx+260*s<cam.x||sx-260*s>cam.x+W||sy+130*s<cam.y||sy-130*s>cam.y+H)continue;g.globalAlpha=a;g.drawImage(B,sx-128*s,sy-64*s,256*s,128*s)}g.restore()}
  if(M===27||M===29||M===31||M===32||M===33){const col=M===27?'255,226,160':M===29?'200,170,255':M===31?'255,214,150':M===32?'190,170,255':'190,140,255',al=M===31?(day?.1:.05):M===33?.07:.11;g.save();g.globalCompositeOperation='lighter';
    const S=420,x0=Math.floor((cam.x-200)/S),x1=Math.floor((cam.x+W+200)/S),y0=Math.floor((cam.y-200)/S),y1=Math.floor((cam.y+H+200)/S);
    for(let gx=x0;gx<=x1;gx++)for(let gy=y0;gy<=y1;gy++){const R=depRng(gx*7919+gy*104729+M*31);if(R()<.45)continue;const x=gx*S+R()*S,y=gy*S+R()*S,w=60+R()*50,L=170+R()*120,f=.75+.25*Math.sin(t*.4+gx*1.3+gy*.7);
      const gr=g.createLinearGradient(x,y-L,x+L*.45,y);gr.addColorStop(0,'rgba('+col+',0)');gr.addColorStop(.7,'rgba('+col+','+(al*f)+')');gr.addColorStop(1,'rgba('+col+','+(al*f*.6)+')');g.fillStyle=gr;
      g.beginPath();g.moveTo(x-w*.5,y-L);g.lineTo(x+w*.5,y-L);g.lineTo(x+L*.45+w*.6,y);g.lineTo(x+L*.45-w*.6,y);g.closePath();g.fill();g.fillStyle='rgba('+col+','+(al*1.4*f)+')';g.beginPath();g.ellipse(x+L*.45,y,w*.75,w*.3,0,0,7);g.fill();
      for(let k=0;k<4;k++){const q=(t*.07+k/4+R())%1;glowAt(x+L*.45*q+Math.sin(t+k)*8,y-L*(1-q),1.6,col,.5*Math.sin(q*3.14))}}g.restore()}}
{const _pg=plxGround;window.plxGround=plxGround=function(){_pg();try{d6Ground()}catch(e){}}}

/* 6.4) หมอกตามระยะแบบแคช: วาดไล่สีครั้งเดียวต่อธีม/ขนาดจอ แล้ววางทั้งแผ่น (เบากว่าสร้างไล่สีใหม่ทุกเฟรม · ใช้ทุกโหมด) */
const DFOV={};
function depFogOv(col,fa,tf,bd,bs){const w=Math.max(1,Math.round(SW0)),h=Math.max(1,Math.round(H)),k=col+'|'+fa.toFixed(3)+'|'+tf+'|'+bd+'|'+bs+'|'+w+'x'+h;let c=DFOV[k];if(c)return c;
  if(Object.keys(DFOV).length>24)for(const q in DFOV)delete DFOV[q];c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
  const gr=x.createLinearGradient(0,0,0,h*tf);gr.addColorStop(0,'rgba('+col+','+fa+')');gr.addColorStop(1,'rgba('+col+',0)');x.fillStyle=gr;x.fillRect(0,0,w,h*tf);
  const gb=x.createLinearGradient(0,h*bs,0,h);gb.addColorStop(0,'rgba(0,0,0,0)');gb.addColorStop(1,'rgba(0,0,0,'+bd+')');x.fillStyle=gb;x.fillRect(0,h*bs,w,h*(1-bs));return DFOV[k]=c}
/* 6.5) โหมดประหยัด: ตัวละครไม่ได้แสงขอบ → ใส่แสงสะท้อนพื้นสีตามแมพใต้เท้าแทน (ใช้ภาพแสงที่แคชไว้ · ถูกมาก) */
{const _s=gxShadow;gxShadow=function(x,y,rx,ry,a){if(LOWQ&&!MLSH&&rx>=10){try{const ga=g.globalAlpha,co=g.globalCompositeOperation;g.globalCompositeOperation='lighter';glowAt(x,y-2,rx*1.9,gxRimCol(),.16);g.globalCompositeOperation=co;g.globalAlpha=ga}catch(e){}}return _s(x,y,rx,ry,a)}}
