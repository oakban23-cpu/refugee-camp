
/* ===== v489 · เอฟเฟกต์อลังการ: ชั้นภาพเสริมของสกิลในคลังสกิล =====
   P9.p อนุภาคมีความสูง (z) มีเงา เด้งพื้นได้ · P9.d รอยบนพื้น · P9.o แสงจ้า/ขอบจอ/หรี่พื้น · P9.b แสงลำ
   P9X[ชนิดเอฟเฟกต์] = ตัวเสริม เรียกหลังภาพเดิมทุกเฟรม · P9U = วาดใต้ภาพเดิม · เหตุการณ์ตามเวลา C.E('ชื่อ',วิ) · ซ้ำ C.R('ชื่อ',ทุกกี่วิ,เริ่ม,จบ)
   ทุกเครื่องวาดเอง (ไม่ส่งเน็ตเพิ่ม) · ปิดเมื่อปิด "เอฟเฟกต์สกิลแบบเต็ม" หรือโหมดประหยัด · โหมดลดภาพอัตโนมัติ = ครึ่งเดียว */
const P9={p:[],d:[],o:[],b:[],z:[],max:560,lt:0,map:-1,spr:{},n:0};
function p9Q(){try{if(CFGV.vfx===0||LOWQ)return 0;return LITEQ?.5:1}catch(e){return 1}}
const p9r=(a,b)=>a+Math.random()*(b-a),p9pick=a=>a[Math.random()*a.length|0];
function p9P(o){const q=p9Q();if(!q||P9.p.length>=P9.max*q)return null;o.z=o.z||0;o.vx=o.vx||0;o.vy=o.vy||0;o.vz=o.vz||0;o.l=o.l||1;o.t=o.l;o.s=o.s||3;o.g=o.g===undefined?0:o.g;o.dr=o.dr||0;o.rot=o.rot||0;o.vr=o.vr||0;o.dl=o.dl||0;o.sd=Math.random()*999;P9.p.push(o);return o}
/* พ่นเป็นกลุ่ม: n ตัว · sp=[ต่ำ,สูง] ความเร็วแนวพื้น · up=[ต่ำ,สูง] ความเร็วขึ้น · ang/spr = ทิศ/กว้าง (ไม่ใส่ = รอบตัว) · rad = รัศมีเกิด · c = สีหรือชุดสี */
function p9B(x,y,z,n,o){const q=p9Q();if(!q)return;n=Math.max(1,Math.round(n*q));for(let i=0;i<n;i++){const a=o.ang===undefined?Math.random()*6.283:o.ang+(Math.random()-.5)*(o.spr||.6),v=p9r(o.sp?o.sp[0]:20,o.sp?o.sp[1]:120),rr=(o.rad||0)*Math.sqrt(Math.random()),ra=Math.random()*6.283;
  if(!p9P({x:x+Math.cos(ra)*rr,y:y+Math.sin(ra)*rr*(o.fl||.55),z:(z||0)+(o.zr?Math.random()*o.zr:0),vx:Math.cos(a)*v,vy:Math.sin(a)*v*(o.fl||.55),vz:o.up?p9r(o.up[0],o.up[1]):0,ty:o.ty||'gl',c:Array.isArray(o.c)?p9pick(o.c):(o.c||'255,255,255'),c2:o.c2,s:p9r(o.s?o.s[0]:2,o.s?o.s[1]:4),s1:o.s1,l:p9r(o.l?o.l[0]:.4,o.l?o.l[1]:.9),g:o.g===undefined?0:o.g,dr:o.dr||0,vr:o.vr?p9r(-o.vr,o.vr):0,rot:Math.random()*6.283,bo:o.bo,dl:o.dl?Math.random()*o.dl:0,fk:o.fk,sh:o.sh}))break}}
/* วงคลื่นพื้น (ใช้ระบบ GX เดิม) · รอยพื้น (GX.dec: fire/crack/frost/holy/void) · แท่งแสง · แสงวาบ */
function p9Sw(x,y,r,c,l,w,dl){if(!p9Q())return;GX.sw.push({x,y,r,c,s:performance.now()+(dl||0)*1000,l:l||480,w:w||5});if(GX.sw.length>40)GX.sw.splice(0,GX.sw.length-40)}
function p9Dec(x,y,r,t,l,dl){if(!p9Q())return;if(GX.dec.length>=30)GX.dec.shift();GX.dec.push({x,y,r,t,v:(Math.random()*3)|0,s:performance.now()+(dl||0)*1000,l:l||2800})}
function p9Fl(x,y,r,c,l,dl){if(!p9Q()||GX.fl.length>=16)return;GX.fl.push({x,y,r,c:'rgb('+c+')',s:performance.now()+(dl||0)*1000,l:l||300})}
/* แสงลำ: x,y ฐาน · w กว้าง · h สูง · c สี · l อายุ(วิ) · dl หน่วง · sk = ลำจากฟ้า (เส้นขอบชัด) */
function p9Beam(x,y,w,h,c,l,o){if(!p9Q())return;o=o||{};if(P9.b.length>24)P9.b.shift();P9.b.push({x,y,w,h,c,l,t:l+(o.dl||0),dl:o.dl||0,a:o.a||1,sk:o.sk?1:0,cr:o.cr})}
/* สายฟ้าชั่วคราว: กะพริบเปลี่ยนรูปทุก 0.05 วิ */
function p9Z(x1,y1,x2,y2,c,w,l,br,dl){if(!p9Q())return;if(P9.z.length>16)P9.z.shift();P9.z.push({x1,y1,x2,y2,c,w,l,t:l+(dl||0),dl:dl||0,br:br||0,sd:Math.random()*1e4|0})}
/* จอ: fl = แสงจ้าเต็มจอ · vg = ขอบจอสี · dim = หรี่พื้น (วาดใต้ตัวละคร) · ม = อายุ(วิ) */
function p9Scr(ty,c,a,l,o){if(!p9Q())return;o=o||{};const k=ty+(o.id||'');for(let i=P9.o.length-1;i>=0;i--)if(P9.o[i].k===k&&o.id){P9.o.splice(i,1)}P9.o.push({k,ty,c,a,l,t:l,in:o.in||0,x:o.x,y:o.y,r:o.r});if(P9.o.length>10)P9.o.shift()}
/* สั่นจอ: คนร่ายเต็มแรง · คนใกล้ครึ่งเดียว */
function p9Shk(f,x,y,v){try{if(f.by===uid)shk=Math.max(shk,v);else if(Math.hypot(me.x-x,me.y-y)<380)shk=Math.max(shk,v*.5)}catch(e){}}
function p9Mine(f){return f.by===uid}
/* กรอบจอในพิกัดโลก (รองรับกล้องซูม) */
function p9View(){let z=1;try{if(ZM&&ZM.on&&ZM.z>0)z=ZM.z}catch(e){}return[cam.x-80,cam.y-80,W/z+160,H/z+160]}
function p9Near(x,y,d){return Math.hypot(me.x-x,me.y-y)<(d||420)}
/* ---------- ภาพแคช ---------- */
function p9Smoke(c){const k='sm'+c;if(P9.spr[k])return P9.spr[k];const s=document.createElement('canvas');s.width=s.height=64;const x=s.getContext('2d'),R=gxRng(c.length*31+7);
  for(let i=0;i<7;i++){const a=R()*6.283,d=R()*12,rr=12+R()*12,gr=x.createRadialGradient(32+Math.cos(a)*d,32+Math.sin(a)*d,0,32+Math.cos(a)*d,32+Math.sin(a)*d,rr);gr.addColorStop(0,'rgba('+c+',.42)');gr.addColorStop(1,'rgba('+c+',0)');x.fillStyle=gr;x.fillRect(0,0,64,64)}return P9.spr[k]=s}
function p9RaySpr(c){const k='ry'+c;if(P9.spr[k])return P9.spr[k];const s=document.createElement('canvas');s.width=128;s.height=32;const x=s.getContext('2d');let gr=x.createLinearGradient(0,0,128,0);gr.addColorStop(0,'rgba('+c+',1)');gr.addColorStop(.35,'rgba('+c+',.55)');gr.addColorStop(1,'rgba('+c+',0)');x.fillStyle=gr;
  x.beginPath();x.moveTo(0,13);x.lineTo(128,0);x.lineTo(128,32);x.lineTo(0,19);x.closePath();x.fill();x.globalCompositeOperation='destination-in';gr=x.createLinearGradient(0,0,0,32);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,128,32);return P9.spr[k]=s}
function p9BeamSpr(c){const k='bm'+c;if(P9.spr[k])return P9.spr[k];const s=document.createElement('canvas');s.width=64;s.height=256;const x=s.getContext('2d');let gr=x.createLinearGradient(0,0,64,0);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(.3,'rgba('+c+',.55)');gr.addColorStop(.5,'rgba(255,255,255,.95)');gr.addColorStop(.7,'rgba('+c+',.55)');gr.addColorStop(1,'rgba('+c+',0)');x.fillStyle=gr;x.fillRect(0,0,64,256);
  x.globalCompositeOperation='destination-in';gr=x.createLinearGradient(0,0,0,256);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.25,'rgba(0,0,0,.8)');gr.addColorStop(1,'rgba(0,0,0,1)');x.fillStyle=gr;x.fillRect(0,0,64,256);return P9.spr[k]=s}
/* รัศมีแสงพุ่ง (god rays) รอบจุด: n เส้น · L ยาว · rot หมุน */
function p9Rays(x,y,L,c,a,n,rot,w,sq){if(a<=0)return;const sp=p9RaySpr(c),ga=g.globalAlpha;g.globalAlpha=ga*Math.min(1,a);for(let i=0;i<n;i++){const an=rot+i*6.2832/n+Math.sin(i*7.3)*.12,ln=L*(.65+.35*Math.abs(Math.sin(i*3.7+rot*.5))),ww=(w||22)*(.7+.3*Math.sin(i*5.1));
   g.save();g.translate(x,y);g.scale(1,sq||1);g.rotate(an);g.drawImage(sp,0,-ww/2,ln,ww);g.restore()}g.globalAlpha=ga}
/* สายฟ้าหยัก (สุ่มตาม seed) */
function p9Bolt(x1,y1,x2,y2,c,w,seed,al,br){const R=gxRng(seed|0||1),L=Math.hypot(x2-x1,y2-y1)||1,n=Math.max(4,Math.round(L/16)),nx=-(y2-y1)/L,ny=(x2-x1)/L,P=[[x1,y1]];
  for(let i=1;i<n;i++){const u=i/n,o=(R()-.5)*Math.min(30,L*.16)*Math.sin(u*Math.PI)*1.6;P.push([x1+(x2-x1)*u+nx*o,y1+(y2-y1)*u+ny*o])}P.push([x2,y2]);
  const path=(pts)=>{g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]))};g.save();g.globalCompositeOperation='lighter';g.lineJoin='round';g.lineCap='round';
  path(P);g.strokeStyle='rgba('+c+','+(.28*al)+')';g.lineWidth=w*4.5;g.stroke();g.strokeStyle='rgba('+c+','+(.85*al)+')';g.lineWidth=w*1.4;g.stroke();g.strokeStyle='rgba(255,255,255,'+al+')';g.lineWidth=Math.max(.8,w*.5);g.stroke();
  if(br)for(let b=0;b<br;b++){const i=1+(R()*(P.length-2)|0),q=P[i],a=Math.atan2(y2-y1,x2-x1)+(R()-.5)*2.2,bl=L*(.12+R()*.18),B=[q];let px=q[0],py=q[1];for(let k=0;k<3;k++){px+=Math.cos(a+(R()-.5)*.9)*bl/3;py+=Math.sin(a+(R()-.5)*.9)*bl/3;B.push([px,py])}
    path(B);g.strokeStyle='rgba('+c+','+(.7*al)+')';g.lineWidth=w*.8;g.stroke();g.strokeStyle='rgba(255,255,255,'+(.8*al)+')';g.lineWidth=Math.max(.6,w*.3);g.stroke()}
  glowAt(x2,y2,w*7,c,.6*al);g.restore()}
/* วงเวทบนพื้น (วาดแบบแบนตามมุมกล้อง): n แฉก · ตัวอักษรรูนรอบวง */
function p9Sig(x,y,R,c,a,rot,o){if(a<=0||R<2)return;o=o||{};g.save();g.translate(x,y);g.scale(1,o.sq||.45);g.globalCompositeOperation='lighter';g.lineCap='round';
  const st=(w,al)=>{g.strokeStyle='rgba('+c+','+(al*a)+')';g.lineWidth=w};glowAt(0,0,R*1.05,c,.22*a);
  st(3,.9);g.beginPath();g.arc(0,0,R,0,6.2832);g.stroke();st(1.4,.7);g.beginPath();g.arc(0,0,R*.86,0,6.2832);g.stroke();
  const n=o.n||6;st(1.6,.75);g.beginPath();for(let i=0;i<=n;i++){const an=rot+i*(o.st||2)*6.2832/n;i?g.lineTo(Math.cos(an)*R*.86,Math.sin(an)*R*.86):g.moveTo(Math.cos(an)*R*.86,Math.sin(an)*R*.86)}g.stroke();
  if(o.inner!==0){st(1.2,.6);g.beginPath();g.arc(0,0,R*.42,0,6.2832);g.stroke()}
  const m=o.gl||16;st(1.6,.85);for(let i=0;i<m;i++){const an=-rot*.6+i*6.2832/m,cx=Math.cos(an)*R*.93,cy=Math.sin(an)*R*.93;g.save();g.translate(cx,cy);g.rotate(an+1.5708);const v=(i*7)%5;g.beginPath();
    if(v===0){g.moveTo(-3,-3);g.lineTo(3,3);g.moveTo(3,-3);g.lineTo(-3,3)}else if(v===1){g.moveTo(0,-3.5);g.lineTo(0,3.5);g.moveTo(-3,-1);g.lineTo(3,-1)}else if(v===2){g.arc(0,0,2.6,0,6.2832)}else if(v===3){g.moveTo(-3,3);g.lineTo(0,-3.5);g.lineTo(3,3)}else{g.moveTo(-3,0);g.lineTo(3,0);g.moveTo(-1.5,-3);g.lineTo(1.5,3)}g.stroke();g.restore()}
  g.restore()}
/* ---------- รอยพื้นแบบใหม่: sig วงเวทไหม้ · slash รอยฟันยาว · scorch รอยไหม้ทอดยาว ---------- */
function p9Mark(o){if(!p9Q())return;o.t=o.l;if(P9.d.length>=20)P9.d.shift();P9.d.push(o)}
/* ---------- อัปเดต + วาด ---------- */
function p9Map(){try{if(P9.map!==curMap){P9.map=curMap;P9.p.length=0;P9.d.length=0;P9.o.length=0;P9.b.length=0;P9.z.length=0}}catch(e){}}
function p9Upd(){const n=performance.now(),dt=Math.min(.1,Math.max(0,(n-(P9.lt||n))/1000));P9.lt=n;p9Map();return dt}
function p9Ground(){if(!p9Q()){P9.d.length=0;return}const dt=P9.gdt=p9Upd(),now=performance.now()/1000;
  /* หรี่พื้นตอนอัลติ */
  P9.o.forEach(o=>{if(o.ty!=='dim')return;const e=o.l-o.t,a=o.a*Math.min(1,o.in?e/o.in:1,o.t/.35);if(a<=0)return;g.fillStyle='rgba('+o.c+','+a+')';const V=p9View();g.fillRect(V[0],V[1],V[2],V[3])});
  const V=p9View();P9.d=P9.d.filter(d=>{d.t-=dt;if(d.t<=0)return false;const a=Math.min(1,d.t/(d.fo||.6))*Math.min(1,(d.l-d.t)/(d.fi||.08));if(d.x<V[0]-d.r||d.x>V[0]+V[2]+d.r||d.y<V[1]-d.r||d.y>V[1]+V[3]+d.r)return true;
    if(d.ty==='sig')p9Sig(d.x,d.y,d.r,d.c,a*(d.a||1),now*(d.sp||.3)+(d.ro||0),{n:d.n||5,st:d.st||2});
    else if(d.ty==='slash'){g.save();g.translate(d.x,d.y);g.rotate(d.an);g.scale(1,.5);g.globalAlpha=a*.85;g.fillStyle='rgba('+(d.c0||'20,8,6')+',.75)';g.beginPath();g.moveTo(-d.r,0);g.quadraticCurveTo(0,-d.w,d.r,0);g.quadraticCurveTo(0,d.w*.3,-d.r,0);g.fill();
      g.globalCompositeOperation='lighter';g.globalAlpha=a*Math.max(0,a-.3);g.strokeStyle='rgba('+d.c+',.9)';g.lineWidth=1.6;g.beginPath();g.moveTo(-d.r*.9,0);g.quadraticCurveTo(0,-d.w*.7,d.r*.9,0);g.stroke();g.restore();g.globalAlpha=1}
    else if(d.ty==='line'){const ex=d.x2,ey=d.y2;g.save();g.lineCap='round';g.globalAlpha=a;g.strokeStyle='rgba('+(d.c0||'15,6,4')+',.6)';g.lineWidth=d.w;g.beginPath();g.moveTo(d.x,d.y);g.lineTo(ex,ey);g.stroke();
      g.globalCompositeOperation='lighter';g.globalAlpha=a*a;g.strokeStyle='rgba('+d.c+',.8)';g.lineWidth=Math.max(1,d.w*.25);g.stroke();g.restore()}
    else if(d.ty==='glow'){g.save();g.globalCompositeOperation='lighter';g.translate(d.x,d.y);g.scale(1,.45);glowAt(0,0,d.r,d.c,a*(d.a||.5)*(.85+.15*Math.sin(now*6+d.x)));g.restore()}
    return true});
  if(P9.d.length>20)P9.d.splice(0,P9.d.length-20)}
function p9Draw(){const Q=p9Q();if(!Q){P9.p.length=0;P9.o.length=0;P9.b.length=0;P9.z.length=0;return}p9Map();const n=performance.now(),dt=Math.min(.1,Math.max(0,(n-(P9.tdt||n))/1000));P9.tdt=n;const now=n/1000;
  if(!P9.p.length&&!P9.o.length&&!P9.b.length&&!P9.z.length)return;g.save();
  /* แสงลำ */
  P9.b=P9.b.filter(b=>{b.t-=dt;if(b.t<=0)return false;if(b.dl>0){b.dl-=dt;return true}const e=b.l-b.t,k=Math.min(1,e/.12)*Math.min(1,b.t/(b.l*.5)),hh=b.h*Math.min(1,e/.15),ww=b.w*(.6+.4*k);
    g.globalCompositeOperation='lighter';g.globalAlpha=k*b.a;g.drawImage(p9BeamSpr(b.c),b.x-ww,b.y-hh,ww*2,hh);glowAt(b.x,b.y,ww*2.2,b.c,.5*k*b.a);if(b.sk){g.globalAlpha=k*b.a*.9;g.drawImage(p9BeamSpr('255,255,255'),b.x-ww*.25,b.y-hh,ww*.5,hh)}return true});
  g.globalAlpha=1;
  P9.z=P9.z.filter(z=>{z.t-=dt;if(z.t<=0)return false;if(z.dl>0){z.dl-=dt;return true}const k=z.t/z.l;p9Bolt(z.x1,z.y1,z.x2,z.y2,z.c,z.w*(.6+.4*k),z.sd+(now*20|0),Math.min(1,k*1.6),z.br);return true});
  /* อนุภาค: เงา + ฝุ่นควัน (ทับปกติ) ก่อน แล้วค่อยแสง (บวกแสง) */
  const L=[],A=[],V=p9View();P9.p=P9.p.filter(p=>{if(p.dl>0){p.dl-=dt;return true}p.t-=dt;if(p.t<=0)return false;
    if(p.dr){const k=Math.max(0,1-p.dr*dt);p.vx*=k;p.vy*=k;if(p.ty!=='ch')p.vz*=k}p.x+=p.vx*dt;p.y+=p.vy*dt;p.vz-=p.g*dt;p.z+=p.vz*dt;p.rot+=p.vr*dt;
    if(p.z<0){if(p.bo){p.z=0;p.vz=-p.vz*p.bo;p.vx*=.55;p.vy*=.55;p.vr*=.6;if(Math.abs(p.vz)<25){p.vz=0;p.g=0}}else if(p.g>0){p.z=0;p.vz=0;p.vx*=.8;p.vy*=.8}}
    if(p.x<V[0]||p.x>V[0]+V[2]||p.y-p.z<V[1]-40||p.y>V[1]+V[3]+40)return true;(p.ty==='ch'||p.ty==='sm'||p.ty==='lf'||p.ty==='bl'?L:A).push(p);return true});
  g.globalCompositeOperation='source-over';
  for(const p of L){const k=p.t/p.l,a=Math.min(1,k*2.2),sx=p.x,sy=p.y-p.z;
    if(p.ty==='sm'){const ss=p.s+(p.s1||p.s*2.4-p.s)*(1-k);g.globalAlpha=a*(p.a||.75)*Math.min(1,(1-k)*6);g.drawImage(p9Smoke(p.c),sx-ss,sy-ss,ss*2,ss*2);continue}
    if(p.ty==='ch'){g.globalAlpha=a*.35*Math.max(0,1-p.z/160);g.fillStyle='#000';g.beginPath();g.ellipse(p.x,p.y+1,p.s*1.1,p.s*.45,0,0,6.2832);g.fill();g.globalAlpha=a;g.save();g.translate(sx,sy);g.rotate(p.rot);g.fillStyle='rgb('+p.c+')';g.strokeStyle='rgba(0,0,0,.55)';g.lineWidth=1;const s=p.s,v=p.sd%3|0;g.beginPath();
      if(v===0){g.moveTo(-s,-s*.4);g.lineTo(-s*.2,-s);g.lineTo(s,-s*.5);g.lineTo(s*.7,s*.7);g.lineTo(-s*.6,s*.8)}else if(v===1){g.moveTo(-s,0);g.lineTo(-s*.3,-s*.9);g.lineTo(s*.8,-s*.3);g.lineTo(s*.4,s*.8);g.lineTo(-s*.7,s*.6)}else{g.moveTo(-s*.8,-s*.6);g.lineTo(s*.9,-s*.8);g.lineTo(s*.6,s*.5);g.lineTo(-s*.9,s*.4)}g.closePath();g.fill();g.stroke();
      g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.moveTo(-s*.5,-s*.3);g.lineTo(0,-s*.7);g.lineTo(s*.4,-s*.3);g.closePath();g.fill();g.restore();continue}
    if(p.ty==='lf'){g.globalAlpha=a;g.save();g.translate(sx+Math.sin(now*3+p.sd)*4,sy);g.rotate(p.rot);g.scale(1,.45+.55*Math.abs(Math.sin(now*4+p.sd)));g.fillStyle='rgb('+p.c+')';g.beginPath();g.ellipse(0,0,p.s,p.s*.42,0,0,6.2832);g.fill();g.restore();continue}
    if(p.ty==='bl'){g.globalAlpha=a;g.fillStyle='rgb('+p.c+')';g.beginPath();g.arc(sx,sy,p.s*(p.z>0?1:1.3),0,6.2832);g.fill()}}
  g.globalCompositeOperation='lighter';
  for(const p of A){const k=p.t/p.l,a=Math.min(1,k*2.2)*(p.fk?.55+.45*Math.sin(now*30+p.sd):1),sx=p.x,sy=p.y-p.z,c=p.c2&&k<.6?p.c2:p.c;
    if(p.ty==='gl'){const s=p.s*(p.s1?(p.s1/p.s+(1-p.s1/p.s)*k):1);glowAt(sx,sy,s*3.2,c,a*.6);g.globalAlpha=a;g.fillStyle='rgba(255,255,240,.9)';g.beginPath();g.arc(sx,sy,s*.5,0,6.2832);g.fill();continue}
    if(p.ty==='sk'){const vx=p.vx,vy=p.vy-p.vz,sp=Math.hypot(vx,vy)||1,ln=Math.min(42,sp*.06+p.s*2);g.globalAlpha=a;g.strokeStyle='rgb('+c+')';g.lineWidth=p.s*.9;g.lineCap='round';g.beginPath();g.moveTo(sx,sy);g.lineTo(sx-vx/sp*ln,sy-vy/sp*ln);g.stroke();
      g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=Math.max(.6,p.s*.35);g.beginPath();g.moveTo(sx,sy);g.lineTo(sx-vx/sp*ln*.5,sy-vy/sp*ln*.5);g.stroke();continue}
    if(p.ty==='st'){const s=p.s*(.7+.3*Math.sin(now*14+p.sd));glowAt(sx,sy,s*2.4,c,a*.5);q8Spark4(sx,sy,s*1.6,'rgba(255,255,255,1)',a);continue}
    if(p.ty==='sh'){g.globalAlpha=a;g.save();g.translate(sx,sy);g.rotate(p.rot);const s=p.s;g.fillStyle='rgba('+c+',.75)';g.beginPath();g.moveTo(0,-s*1.8);g.lineTo(s*.55,0);g.lineTo(0,s*1.8);g.lineTo(-s*.55,0);g.closePath();g.fill();g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=.8;g.stroke();g.restore();continue}
    if(p.ty==='fl'){const s=p.s*(.5+.5*k),sw=Math.sin(now*12+p.sd)*2;glowAt(sx,sy-s*.4,s*2.2,c,a*.45);g.globalAlpha=a*.9;g.fillStyle='rgb('+c+')';g.beginPath();g.moveTo(sx-s*.6,sy);g.quadraticCurveTo(sx-s*.7,sy-s,sx+sw,sy-s*2.2);g.quadraticCurveTo(sx+s*.7,sy-s,sx+s*.6,sy);g.closePath();g.fill();
      g.fillStyle='rgba(255,250,210,.8)';g.beginPath();g.ellipse(sx,sy-s*.4,s*.25,s*.5,0,0,6.2832);g.fill();continue}
    if(p.ty==='rn'){g.globalAlpha=a;g.strokeStyle='rgb('+c+')';g.lineWidth=1.4;g.lineCap='round';glowAt(sx,sy,p.s*2.2,c,a*.4);const s=p.s,v=p.sd%4|0;g.beginPath();if(v===0){g.moveTo(sx,sy-s);g.lineTo(sx,sy+s);g.moveTo(sx-s*.6,sy-s*.3);g.lineTo(sx+s*.6,sy+s*.2)}else if(v===1){g.moveTo(sx-s*.6,sy+s);g.lineTo(sx,sy-s);g.lineTo(sx+s*.6,sy+s)}
      else if(v===2){g.arc(sx,sy,s*.7,0,6.2832);g.moveTo(sx,sy-s);g.lineTo(sx,sy+s)}else{g.moveTo(sx-s*.6,sy-s);g.lineTo(sx+s*.6,sy+s);g.moveTo(sx+s*.6,sy-s);g.lineTo(sx-s*.6,sy+s)}g.stroke();continue}
    if(p.ty==='ln'){if(Math.sin(now*40+p.sd)<-.2)continue;const R=gxRng((now*30|0)+(p.sd|0));g.globalAlpha=a;g.strokeStyle='rgb('+c+')';g.lineWidth=1.3;g.beginPath();g.moveTo(sx,sy);let px=sx,py=sy;for(let i=0;i<3;i++){px+=(R()-.5)*p.s*2;py+=(R()-.5)*p.s*2;g.lineTo(px,py)}g.stroke();continue}
    if(p.ty==='ring'){const rr=p.s+(p.s1-p.s)*(1-k);g.globalAlpha=a;g.strokeStyle='rgb('+c+')';g.lineWidth=2*k+.6;g.beginPath();g.ellipse(sx,sy,rr,rr*.42,0,0,6.2832);g.stroke()}}
  /* จอ: แสงจ้า · ขอบจอ */
  P9.o=P9.o.filter(o=>{o.t-=dt;if(o.t<=0)return false;if(o.ty==='dim')return true;const e=o.l-o.t;
    if(o.ty==='fl'){const k=Math.min(1,o.in?e/o.in:1)*Math.pow(o.t/o.l,2);g.globalCompositeOperation='lighter';g.globalAlpha=o.a*k;g.fillStyle='rgb('+o.c+')';const V=p9View();g.fillRect(V[0],V[1],V[2],V[3])}
    else if(o.ty==='vg'){const k=o.a*Math.min(1,o.in?e/o.in:1,o.t/.4);g.globalCompositeOperation='source-over';g.globalAlpha=1;const V=p9View(),cx=V[0]+V[2]/2,cy=V[1]+V[3]/2,R=Math.hypot(V[2]-160,V[3]-160)*.62,gr=g.createRadialGradient(cx,cy,R*.45,cx,cy,R);gr.addColorStop(0,'rgba('+o.c+',0)');gr.addColorStop(1,'rgba('+o.c+','+k+')');g.fillStyle=gr;g.fillRect(V[0],V[1],V[2],V[3])}
    return true});
  g.restore();g.globalAlpha=1;g.globalCompositeOperation='source-over'}
/* ---------- ตัวห่อ FXB: ส่ง C (ตัวช่วย) ให้ตัวเสริม ---------- */
const P9X={},P9U={};
function p9C(f,p,x,y,r,now,k){const D=f.d||(FXD&&FXD[k])||.5,t=p*D,tn=performance.now(),dt=Math.min(.1,Math.max(0,(tn-(f.__lt||tn))/1000));f.__lt=tn;const ev=f.__e||(f.__e={});
  return {f,t,D,x,y,r,now,dt,mine:f.by===uid,E:(n,at)=>{if(ev[n]||t<at)return false;ev[n]=1;return true},R:(n,per,st,en)=>{if(t<(st||0)||(en!=null&&t>en))return false;const c=Math.floor((t-(st||0))/per);if(ev[n]===undefined||c>ev[n]){ev[n]=c;return true}return false},
    A:(n,rate)=>{const kk='_a'+n;ev[kk]=(ev[kk]||0)+rate*dt*p9Q();const m=Math.floor(ev[kk]);ev[kk]-=m;return m}}}
function p9Err(k,e){P9.en=(P9.en||0)+1;if(!P9.er)P9.er=k+': '+String(e&&e.message||e).slice(0,120)}
function p9Wrap(){Object.keys(Object.assign({},P9X,P9U)).forEach(k=>{const o=FXB[k];if(!o||o.__p9)return;const fn=function(f,p,x,y,r,now){let C=null;
    if(P9U[k]&&p9Q()){try{C=p9C(f,p,x,y,r,now,k);P9U[k](C)}catch(e){p9Err(k,e)}}o(f,p,x,y,r,now);if(P9X[k]&&p9Q()){try{if(!C)C=p9C(f,p,x,y,r,now,k);P9X[k](C)}catch(e){p9Err(k,e)}}};fn.__p9=1;fn.__o=o;FXB[k]=fn})}
try{drawParts=(f=>function(){const r=f.apply(this,arguments);try{p9Draw()}catch(e){}return r})(drawParts)}catch(e){}
try{gxGroundFx=(f=>function(){try{p9Ground()}catch(e){}return f.apply(this,arguments)})(gxGroundFx)}catch(e){}
