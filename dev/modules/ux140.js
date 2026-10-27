/* ===== v538 หน้าสร้างตัวละคร «ค่ำคืนรอบกองไฟ» =====
   โหมดสร้างตัวละครใหม่ (csMode==='new'): เวทีเปลี่ยนเป็นลานค่ายกลางคืน · ตัวละครทุกอาชีพนั่งผิงไฟล้อมกองไฟ (หันเข้าหาไฟ)
   กดเลือก (ปุ่มอาชีพ หรือแตะตัวละครบนเวทีตรง ๆ) → ลำแสงส่องลงมาจากฟ้า · ตัวที่เลือกลุกขึ้นยืน หันออกมาหาผู้เล่น แล้วแสดงท่าวนไป
   (ท่าเปิดตัว → ยืนรอ → ฟัน/ยิง → ท่าสกิล → ยืนรอแบบที่สอง) · ตัวที่เคยถูกเลือกนั่งกลับลงที่เดิม
   ฉาก: ฟ้าดาว ดวงจันทร์ ต้นสนเงา เต็นท์ค่ายไกล ๆ · กองไฟมีเปลวสามชั้น ประกายไฟลอย แสงอุ่นกะพริบ · ขอนไม้ให้นั่ง · ชื่ออาชีพใต้ตัว
   v539: หน้าเลือกตัวละครที่มีอยู่ (csMode==='') ใช้ฉากเดียวกัน — ตัวละครของผู้เล่นทุกตัวนั่งรอบกองไฟ ใส่ชุด/อาวุธจริง ร่างอาชีพจริง
   ตัวที่เลือกลุกขึ้นยืนในลำแสง (ของ +7 ขึ้นไปมีวงแสงทองที่เท้า) · ขอนว่างมีเงาโปร่ง «＋» แตะ = สร้างตัวละคร · เกิน 6 ตัวนั่งหน้ากองไฟเพิ่ม
   โหมดช่องว่างใช้เวทีเดิม · CFV.on=0 → กลับเป็นเวทีเดิมทั้งหมด */
const CFV={on:1,sel:null,t0:0,prev:null,pt0:0,pos:[],err:''};
(function(){const css=`
.cs3 .cs-stage.csfire canvas{height:clamp(300px,52svh,560px);cursor:pointer;touch-action:manipulation}
.cs3 .cs-stage.csfire{border-color:rgba(255,170,90,.32);box-shadow:0 20px 50px rgba(0,0,0,.65),0 0 40px rgba(255,140,60,.12),inset 0 1px 0 rgba(255,236,205,.12)}
.cs3 .cs-stage.csfire.cssel .cs-tap{left:auto;right:14px;text-align:right;bottom:14px}
.cs3 .cs-stage.csfire .cs-tap{position:absolute;left:0;right:0;bottom:10px;text-align:center;font-size:11.5px;color:rgba(255,226,190,.75);pointer-events:none;text-shadow:0 1px 3px #000;letter-spacing:.02em}
@media (orientation:landscape) and (min-width:600px){.cs3 .cs-stage.csfire canvas{height:100%!important}}
@media (max-width:599px){.cs3 .cs-stage.csfire.cssel .cs-tap{display:none}}
`;const s=document.createElement('style');s.id='cfcss';s.textContent=css;document.head.appendChild(s)})();
const cfE=x=>1-(1-x)*(1-x),cfIO=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const CFSEQ={melee:[2,4,0,3],archer:[2,0,4,5],mage:[2,0,4,5],assn:[2,0,4,1],sup:[2,1,0,3]};
function cfClasses(){const b=[...document.querySelectorAll('.csw [data-cp]')].map(e=>e.dataset.cp);return b.length?b:Object.keys(CL).filter(k=>k!=='guard').slice(0,5)}
/* วาดตัวละครหนึ่งตัวลงแคนวาส (พิกัดเท้า) · sit 0..1 = นั่งผิงไฟ */
function cfChar(xc,X,Y,S,E,fx,sit,cast,ak,t){const g0=g,cha0=CHA,che0=CHE,chs0=CHS,sd0=SITD,cs0=CHSIT,dc0=DC3,cls=E.cls;
  try{g=xc;xc.save();xc.translate(X,Y);xc.scale(S,S);xc.translate(0,-15);const L=E.L||csLook(null);DC3=E.rb||0;
    if(sit>0.02){SITD={s:sit,w:1,rb:!!S7ROBE[cls],key:'cf'+cls};CHSIT=1;cast={ty:'sitw',p:.5,d:1,idle:1,sit:1,s:sit};ak=0}
    CHA={mv:0,fx,cast,it:0};CHE=cast&&!cast.idle?{k:'cast',lx:0,ly:0}:ak>0?{k:'fever',lx:0,ly:0}:null;CHS={h:0,c:0};
    drawChar(0,0,cls,fx,0,L.h,t,L.b,L.w,L.a,E.c2||0,ak||0)}
  catch(e){if(!CFV.err)CFV.err=String(e&&e.message||e).slice(0,120)}
  finally{try{xc.restore()}catch(e){}g=g0;CHA=cha0;CHE=che0;CHS=chs0;SITD=sd0;CHSIT=cs0;DC3=dc0}}
/* ท่าของตัวที่ถูกเลือก: ลุก (0.5 วิ) → ท่าเปิดตัว → วนท่า */
function cfPose(cls,te){if(te<.5)return{sit:1-cfIO(te/.5),cast:null,ak:0};const q0=te-.5,seq=CFSEQ[cls]||[2,0,4,5],sk=i=>{const e=SKP[cls]&&SKP[cls][seq[i%seq.length]];return e||null};
  if(q0<1.5){const e=sk(0);if(e){const D=Math.max(.9,e[1]*1.7);if(q0<D)return{sit:0,cast:{ty:e[0],p:q0/D,d:D,big:true,k:2},ak:0}}return{sit:0,cast:null,ak:0}}
  const P=7.2,q=(q0-1.5)%P,lp=Math.floor((q0-1.5)/P);
  if(q<1.9)return{sit:0,cast:IDLT[cls]?{ty:IDLT[cls][0],p:q/1.9,d:1.9,idle:1}:null,ak:0};
  if(q<3.0)return{sit:0,cast:null,ak:Math.min(.999,(q-1.9)/1.1)};
  if(q<4.9){const e=sk(1+lp%3);if(e){const D=Math.max(.9,e[1]*1.7),r=q-3.0;if(r<D)return{sit:0,cast:{ty:e[0],p:r/D,d:D,big:true,k:2},ak:0}}return{sit:0,cast:null,ak:0}}
  return{sit:0,cast:IDLT[cls]?{ty:IDLT[cls][1],p:(q-4.9)/2.3,d:2.3,idle:1}:null,ak:0}}
/* รายชื่อบนเวที: โหมดสร้าง = ทุกอาชีพ · โหมดเลือก = ตัวละครของผู้เล่น + ขอนว่าง */
function cfEnts(){if(csMode==='new')return{ents:cfClasses().map(c=>({id:'n:'+c,cls:c,lbl:CL[c].n})),sel:'n:'+csPick};
  const keys=[...document.querySelectorAll('.csw [data-cs]')].map(b=>b.dataset.cs),ents=[];
  for(const q of keys){const sv=saves.chars[q];if(!sv)continue;const c=scls(q);let c2=0,rb=0;try{c2=csC2(c,sv);rb=CSRB|0}catch(e){}ents.push({id:'s:'+q,key:q,cls:c,L:csLook(sv),c2,rb,lbl:(sv.nm||CL[c].n),lv:sv.lv})}
  if(document.querySelector('.csw .cs-emp')&&ents.length<8)ents.push({id:'emp',emp:1,cls:'melee',lbl:'สร้างตัวละคร'});
  return{ents,sel:'s:'+csSel}}
function cfDraw(cv){const dpr=Math.min(2.5,window.devicePixelRatio||1),W=cv.clientWidth||360,H=cv.clientHeight||300;
  if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}
  const x=cv.getContext('2d'),t=performance.now()/1000,now=performance.now(),EN=cfEnts(),ks=EN.ents,k=EN.sel;
  if(k!==CFV.sel){if(CFV.sel&&CFV.sel!==k){CFV.prev=CFV.sel;CFV.pt0=now}CFV.sel=k;CFV.t0=now}
  let S;const PT=H>W*1.05,cx=W/2,fy=H*(PT?.72:.72),rx=Math.min(W*(PT?.38:.4),H*.8),ry=rx*(PT?.58:.4),_S=S=Math.min(H*(PT?.0054:.0046),rx*(PT?.019:.0165),3.4),fl=.85+.15*Math.sin(t*9)*Math.sin(t*5.3+1);
  x.setTransform(dpr,0,0,dpr,0,0);
  /* ฟ้ากลางคืน */let gr=x.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#070a1c');gr.addColorStop(.55,'#141228');gr.addColorStop(1,'#1a0e0a');x.fillStyle=gr;x.fillRect(0,0,W,H);
  for(let i=0;i<70;i++){const sx=(i*137.5)%W,sy=(i*53.7)%(H*.5),tw=.4+.6*Math.abs(Math.sin(t*(.6+i%5*.2)+i));x.fillStyle='rgba(230,235,255,'+(.25+.5*tw)*(1-sy/(H*.55))+')';x.fillRect(sx,sy,i%7?1.2:1.8,i%7?1.2:1.8)}
  /* ดวงจันทร์ */{const mx=W*.82,my=H*.13,mr=Math.max(14,H*.045);x.save();x.globalCompositeOperation='lighter';gr=x.createRadialGradient(mx,my,mr*.5,mx,my,mr*4);gr.addColorStop(0,'rgba(200,215,255,.22)');gr.addColorStop(1,'rgba(200,215,255,0)');x.fillStyle=gr;x.fillRect(mx-mr*4,my-mr*4,mr*8,mr*8);x.restore();x.fillStyle='#e8ecff';x.beginPath();x.arc(mx,my,mr,0,7);x.fill();x.fillStyle='rgba(150,160,200,.35)';x.beginPath();x.arc(mx-mr*.3,my-mr*.2,mr*.22,0,7);x.arc(mx+mr*.25,my+mr*.3,mr*.15,0,7);x.fill()}
  /* ภูเขาไกล + เต็นท์ค่าย */x.fillStyle='#10102a';x.beginPath();x.moveTo(0,H*.46);for(let i=0;i<=10;i++)x.lineTo(W*i/10,H*(.4+((i*37)%7)*.012));x.lineTo(W,H*.6);x.lineTo(0,H*.6);x.closePath();x.fill();
  for(const[tx,ts]of[[.12,1],[.27,.8],[.7,.85],[.9,1.05]]){const X=W*tx,Y=H*.5,s=H*.05*ts;x.fillStyle='#1c1418';x.beginPath();x.moveTo(X-s*1.4,Y);x.lineTo(X,Y-s*1.3);x.lineTo(X+s*1.4,Y);x.closePath();x.fill();x.fillStyle='rgba(255,170,80,'+(.35+.15*Math.sin(t*3+tx*20))+')';x.beginPath();x.moveTo(X-s*.25,Y);x.lineTo(X,Y-s*.55);x.lineTo(X+s*.25,Y);x.closePath();x.fill()}
  /* ต้นสนเงา */const pine=(px,py,h)=>{x.fillStyle='#080810';x.beginPath();x.moveTo(px,py-h);for(let k2=0;k2<4;k2++){const yy=py-h+h*(k2+1)*.24,w=h*(.14+k2*.07);x.lineTo(px+w,yy);x.lineTo(px+w*.45,yy)}x.lineTo(px+h*.06,py);x.lineTo(px-h*.06,py);for(let k2=3;k2>=0;k2--){const yy=py-h+h*(k2+1)*.24,w=h*(.14+k2*.07);x.lineTo(px-w*.45,yy);x.lineTo(px-w,yy)}x.closePath();x.fill()};
  for(const[px,ph]of[[.03,.5],[.11,.38],[.2,.3],[.84,.32],[.93,.44],[1.0,.52]])pine(W*px,H*.62,H*ph);
  /* พื้นดิน + แสงไฟส่อง */gr=x.createLinearGradient(0,H*.55,0,H);gr.addColorStop(0,'#1a1214');gr.addColorStop(1,'#0c0808');x.fillStyle=gr;x.fillRect(0,H*.56,W,H*.44);
  x.save();x.globalCompositeOperation='lighter';gr=x.createRadialGradient(cx,fy,10,cx,fy,rx*1.5);gr.addColorStop(0,'rgba(255,140,60,'+(.42*fl)+')');gr.addColorStop(.5,'rgba(255,110,40,'+(.12*fl)+')');gr.addColorStop(1,'rgba(255,100,40,0)');x.fillStyle=gr;x.beginPath();x.ellipse(cx,fy,rx*1.5,rx*.6,0,0,7);x.fill();x.restore();
  x.fillStyle='rgba(60,36,24,.55)';x.beginPath();x.ellipse(cx,fy+4,rx*.42,ry*.42,0,0,7);x.fill();
  /* ตำแหน่งนั่งล้อมกองไฟ: ครึ่งหลังสูงสุด 6 ที่ · เกินนั้นนั่งหน้ากองไฟซ้าย/ขวา */const n=ks.length,nb=Math.min(6,n),A=[],P=[];if(n>6)S*=PT?.8:.88;
  for(let i=0;i<nb;i++)A.push(nb<=1?270:186+i*(168/(nb-1)));[122,58,90].slice(0,n-nb).forEach(a=>A.push(a));
  ks.forEach((E,i)=>{const a=A[i]*Math.PI/180,X=cx+Math.cos(a)*rx*(A[i]<180?1.25:1),Y=fy+Math.sin(a)*ry*(A[i]<180?.95:1),dep=.86+.14*Math.min(1.3,(Y-(fy-ry))/(ry*2||1));P.push({c:E.id,E,X,Y,dep})});
  /* ขอนไม้ */for(const p of P){const lw=26*S*p.dep,lh=6*S*p.dep;x.fillStyle='#2a1a10';x.beginPath();x.ellipse(p.X,p.Y+lh*.6,lw,lh,0,0,7);x.fill();gr=x.createLinearGradient(0,p.Y-lh,0,p.Y+lh);gr.addColorStop(0,'#7a5232');gr.addColorStop(1,'#3a2414');x.fillStyle=gr;x.beginPath();x.roundRect(p.X-lw,p.Y-lh*.9,lw*2,lh*1.6,lh*.8);x.fill();x.fillStyle='#a07a52';x.beginPath();x.ellipse(p.X+lw,p.Y-lh*.1,lh*.5,lh*.78,0,0,7);x.fill()}
  /* ลำแสงส่องลงมาที่ตัวที่เลือก */const SP=P.find(p=>p.c===k),te=(now-CFV.t0)/1000;
  if(SP){const op=Math.min(1,te/.35),col=h2r((SP&&CL[SP.E.cls]&&CL[SP.E.cls].c)||'#ffd890');x.save();x.globalCompositeOperation='lighter';const top=-10,bw=10*S,fw=34*S*SP.dep;
    gr=x.createLinearGradient(0,top,0,SP.Y);gr.addColorStop(0,'rgba(255,250,230,0)');gr.addColorStop(.25,'rgba(255,245,215,'+(.16*op)+')');gr.addColorStop(1,'rgba(255,235,190,'+(.3*op)+')');x.fillStyle=gr;x.beginPath();x.moveTo(SP.X-bw,top);x.lineTo(SP.X+bw,top);x.lineTo(SP.X+fw,SP.Y+4);x.lineTo(SP.X-fw,SP.Y+4);x.closePath();x.fill();
    gr=x.createLinearGradient(0,top,0,SP.Y);gr.addColorStop(0,'rgba('+col+',0)');gr.addColorStop(1,'rgba('+col+','+(.22*op)+')');x.fillStyle=gr;x.beginPath();x.moveTo(SP.X-bw*.4,top);x.lineTo(SP.X+bw*.4,top);x.lineTo(SP.X+fw*.5,SP.Y);x.lineTo(SP.X-fw*.5,SP.Y);x.closePath();x.fill();
    gr=x.createRadialGradient(SP.X,SP.Y,2,SP.X,SP.Y,fw*1.2);gr.addColorStop(0,'rgba(255,240,200,'+(.45*op)+')');gr.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=gr;x.beginPath();x.ellipse(SP.X,SP.Y+2,fw*1.2,fw*.36,0,0,7);x.fill();
    for(let i=0;i<14;i++){const q=(t*.18+i/14)%1,mx=SP.X+Math.sin(i*2.1+t*.5)*fw*.6*q,my=top+(SP.Y-top)*(1-q);x.fillStyle='rgba(255,250,225,'+(.7*Math.sin(q*Math.PI)*op)+')';x.fillRect(mx,my,1.6,1.6)}
    if(te<.6){const k2=te/.6;x.strokeStyle='rgba(255,240,200,'+(1-k2)+')';x.lineWidth=2.5;x.beginPath();x.ellipse(SP.X,SP.Y+2,fw*(.4+k2*1.4),fw*(.12+k2*.42),0,0,7);x.stroke()}
    x.restore()}
  /* ตัวละคร (เรียงตามความลึก) */CFV.pos=[];const fire=()=>cfFire(x,cx,fy,S,t,fl);let fd=0;
  P.slice().sort((a,b)=>a.Y-b.Y).forEach(p=>{if(!fd&&p.Y>fy){fire();fd=1}const isS=p.c===k,isP=p.c===CFV.prev,toF=cx-p.X>=0?1:-1;let sit=1,cast=null,ak=0,fx=toF,sc=S*p.dep;
    if(p.E.emp){cfEmpty(x,p,S,t);CFV.pos.push({c:p.c,E:p.E,x:p.X,y:p.Y-16*sc,r:Math.max(26,22*sc)});return}
    if(isS){const r=cfPose(p.E.cls,te);sit=r.sit;cast=r.cast;ak=r.ak;fx=te<.35?toF:(p.X>cx+rx*.5?-1:1);sc*=1+.12*Math.min(1,te/.5)}
    else if(isP){const pe=(now-CFV.pt0)/1000;sit=pe<.5?cfIO(pe/.5):1}
    if(isS&&p.E.L&&p.E.L.wu>=7&&sit<.5){x.save();x.globalCompositeOperation='lighter';const hc=p.E.L.wu>=10?'255,214,120':'255,190,90',rr=24*sc/S,gg=x.createRadialGradient(p.X,p.Y,2,p.X,p.Y,rr*S);gg.addColorStop(0,'rgba('+hc+','+(.35+.1*Math.sin(t*3))+')');gg.addColorStop(1,'rgba('+hc+',0)');x.fillStyle=gg;x.beginPath();x.ellipse(p.X,p.Y,rr*S,rr*S*.32,0,0,7);x.fill();x.strokeStyle='rgba('+hc+',.7)';x.lineWidth=1.5;x.setLineDash([6,5]);x.lineDashOffset=-t*20;x.beginPath();x.ellipse(p.X,p.Y,rr*S*.7,rr*S*.22,0,0,7);x.stroke();x.setLineDash([]);x.restore()}
    cfChar(x,p.X,p.Y-(sit>0?2*S*p.dep*sit:0),sc,p.E,fx,sit,cast,ak,t);
    /* ชื่อใต้ตัว */const C=CL[p.E.cls];if(C){const LB=p.E.lbl+(p.E.lv?' · Lv'+p.E.lv:'');x.save();x.font=(isS?'bold ':'')+Math.round(Math.max(10,(isS?12.5:10.5)*Math.min(1.3,S/2.4)))+'px system-ui';x.textAlign='center';x.textBaseline='top';const ty=p.Y+7*S*p.dep;const tw=x.measureText(LB).width/2,lx=Math.max(tw+4,Math.min(W-tw-4,p.X));x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.75)';x.strokeText(LB,lx,ty);x.fillStyle=isS?'#ffe2a0':'rgba(240,226,206,.72)';x.fillText(LB,lx,ty);x.restore()}
    CFV.pos.push({c:p.c,E:p.E,x:p.X,y:p.Y-16*sc,r:Math.max(26,22*sc)})});
  if(!fd)fire();
  /* ประกายไฟลอย */x.save();x.globalCompositeOperation='lighter';for(let i=0;i<30;i++){const sp=.12+(i%5)*.04,q=(t*sp+i*.137)%1,px=cx+Math.sin(t*1.3+i*1.7)*(10+q*40)*S/2.5,py=fy-12*S-q*H*.55,a=Math.sin(q*Math.PI)*(1-q*.4);x.fillStyle='rgba(255,'+(150+(i%4)*25)+',70,'+(.85*a)+')';x.beginPath();x.arc(px,py,.7+(i%3)*.5,0,7);x.fill()}x.restore();
  /* แสงอุ่นทับฉาก + ขอบมืด */x.save();x.globalCompositeOperation='lighter';gr=x.createRadialGradient(cx,fy-20*S,10,cx,fy-20*S,rx*1.3);gr.addColorStop(0,'rgba(255,150,70,'+(.1*fl)+')');gr.addColorStop(1,'rgba(255,150,70,0)');x.fillStyle=gr;x.fillRect(0,0,W,H);x.restore();
  gr=x.createRadialGradient(cx,H*.6,H*.3,cx,H*.6,Math.max(W,H)*.85);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.6)');x.fillStyle=gr;x.fillRect(0,0,W,H);
  gr=x.createLinearGradient(0,0,0,90);gr.addColorStop(0,'rgba(6,6,14,.7)');gr.addColorStop(1,'rgba(6,6,14,0)');x.fillStyle=gr;x.fillRect(0,0,W,90)}
/* ขอนว่าง: เงาโปร่งนั่งรอ + ปุ่ม ＋ */
function cfEmpty(x,p,S,t){const s=S*p.dep,X=p.X,Y=p.Y,bob=Math.sin(t*1.6)*2;x.save();x.globalAlpha=.4+.12*Math.sin(t*2);x.setLineDash([4,4]);x.lineDashOffset=-t*8;x.strokeStyle='#e8d8b0';x.lineWidth=1.4;
  x.beginPath();x.ellipse(X,Y-20*s+bob,6.5*s,7*s,0,0,7);x.stroke();x.beginPath();x.moveTo(X-8*s,Y-4*s);x.quadraticCurveTo(X-9*s,Y-13*s+bob,X,Y-13.5*s+bob);x.quadraticCurveTo(X+9*s,Y-13*s+bob,X+8*s,Y-4*s);x.stroke();x.setLineDash([]);
  x.globalAlpha=.85;x.fillStyle='rgba(231,183,90,.22)';x.beginPath();x.arc(X,Y-20*s+bob,6*s,0,7);x.fill();x.fillStyle='#ffe2a0';x.font='600 '+Math.round(9*s)+'px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText('+',X,Y-20*s+bob);x.restore()}
function cfFire(x,cx,fy,S,t,fl){const s=S*1.6;
  /* หินล้อมไฟ + ฟืน */x.fillStyle='#3a3038';for(let i=0;i<9;i++){const a=i/9*6.283,rx2=15*s,ry2=5*s;x.beginPath();x.ellipse(cx+Math.cos(a)*rx2,fy+Math.sin(a)*ry2+1*s,3.2*s,2.2*s,0,0,7);x.fill()}
  x.save();x.translate(cx,fy);for(const[r,c]of[[.5,'#5a3a22'],[-.5,'#6a4428'],[0,'#4a2e1a']]){x.save();x.rotate(r);x.fillStyle=c;x.beginPath();x.roundRect(-13*s,-2.4*s,26*s,4.8*s,2.4*s);x.fill();x.fillStyle='rgba(255,120,40,.6)';x.fillRect(-4*s,-1.2*s,8*s,2.4*s);x.restore()}x.restore();
  x.save();x.globalCompositeOperation='lighter';let gr=x.createRadialGradient(cx,fy-8*s,2,cx,fy-8*s,34*s);gr.addColorStop(0,'rgba(255,200,110,'+(.55*fl)+')');gr.addColorStop(1,'rgba(255,120,40,0)');x.fillStyle=gr;x.fillRect(cx-40*s,fy-50*s,80*s,60*s);
  /* เปลวสามชั้น */const flame=(w,h,col,ph)=>{x.fillStyle=col;x.beginPath();x.moveTo(cx-w*s,fy);for(let i=0;i<=8;i++){const u=i/8,yy=fy-h*s*Math.sin(u*Math.PI)*(.75+.25*Math.sin(t*11+i*1.7+ph)),xx=cx-w*s+u*w*2*s+Math.sin(t*7+u*5+ph)*2*s*(1-Math.abs(u-.5)*2);x.lineTo(xx,yy)}x.lineTo(cx+w*s,fy);x.closePath();x.fill();
    x.beginPath();x.moveTo(cx-w*.5*s,fy-h*.4*s);x.quadraticCurveTo(cx+Math.sin(t*6+ph)*4*s,fy-h*s*1.45-Math.sin(t*9+ph)*3*s,cx+w*.5*s,fy-h*.4*s);x.fill()};
  flame(11,14,'rgba(255,90,30,.75)',0);flame(8,11,'rgba(255,160,50,.8)',1.3);flame(4.6,7.5,'rgba(255,240,170,.9)',2.6);x.restore()}
/* แตะตัวละครบนเวที = เลือกอาชีพนั้น */
function cfTapBind(cv){if(cv.dataset.cf)return;cv.dataset.cf='1';cv.addEventListener('pointerdown',e=>{if(csMode!=='new'&&csMode!=='')return;const r=cv.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;let b=null,bd=1e9;
  for(const p of CFV.pos){const d=Math.hypot(px-p.x,(py-p.y)*.7);if(d<p.r*1.4&&d<bd){bd=d;b=p}}if(!b)return;const E=b.E||{};let btn=null;
  if(E.emp)btn=document.querySelector('.csw .cs-emp');else if(csMode==='new'){if(E.cls!==csPick)btn=document.querySelector('.csw [data-cp="'+E.cls+'"]')}else if(E.key&&E.key!==csSel)btn=document.querySelector('.csw [data-cs="'+E.key+'"]');if(btn)btn.click()})}
{const old=csDraw;csDraw=function(cv){if(CFV.on&&(csMode==='new'||(csMode===''&&saves.chars[csSel]))){try{const st=cv.parentElement;if(st&&!st.classList.contains('csfire')){st.classList.add('csfire');if(csMode==='')st.classList.add('cssel');if(!st.querySelector('.cs-tap')){const d=document.createElement('div');d.className='cs-tap';d.textContent=csMode==='new'?'แตะตัวละครรอบกองไฟเพื่อเลือกอาชีพ':'แตะตัวละครรอบกองไฟเพื่อเลือก';st.appendChild(d)}}cfTapBind(cv);cfDraw(cv);return}catch(e){CFV.err=String(e&&e.stack||e).slice(0,200)}}return old.apply(this,arguments)};CFV.old=old}
