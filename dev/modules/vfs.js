/* ---------- v660 เอฟเฟกต์สกิลภาพวาด (VFS) · 48 ชิ้นจาก ChatGPT วาดบนพื้นดำ → ซ้อนแบบเรืองแสง ('lighter' พื้นดำหายเอง) แล้วใช้โค้ดหมุน ขยาย จาง ----------
   แผ่นรวม hd-vfx1..4.webp · VFS.R[ชื่อ]=[แผ่น,x,y,w,h]
   vfsD(ชื่อ,x,y,กว้าง,{rot,a,sq,ax,ay,h,fx}) = วาดทันที (ใช้ในตัวเสริมที่วาดทุกเฟรม)
   vfs(ชื่อ,x,y,{w,w1,l,dl,a,rot,vr,sq,gr,z,vx,vy,vz,fi,fo,ay,ax,h,h1,fol,ox,oy,fk,ez}) = ปล่อยภาพมีอายุ · gr=1 วาดชั้นพื้น (ใต้ตัวละคร)
   เคารพตั้งค่า "เอฟเฟกต์" (CFGV.vfx=0 / โหมดลื่น ปิด · โหมดเบา ลดจำนวนครึ่ง) · ปิดทั้งหมด: VFS.on=0 */
const VFS={on:1,R:__R__,im:[],s:[],max:72,lt:[0,0],n:0};
function vfsI(i){let I=VFS.im[i];if(!I){I=VFS.im[i]=new Image();try{I.decoding='async'}catch(e){}I.src='hd-vfx'+(i+1)+'.webp'}return I.complete&&I.naturalWidth?I:null}
function vfsOn(){try{return VFS.on&&p9Q()>0}catch(e){return 0}}
function vfsD(n,x,y,w,o){const q=VFS.R[n];if(!q||!(w>1))return;const I=vfsI(q[0]);if(!I)return;o=o||{};const a=o.a==null?1:o.a;if(!(a>.004))return;
  const h=o.h||w*q[4]/q[3];g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,a);g.translate(x,y);if(o.sq)g.scale(1,o.sq);if(o.rot)g.rotate(o.rot);if(o.fx)g.scale(-1,1);
  const dx=-w*(o.ax==null?.5:o.ax),dy=-h*(o.ay==null?.5:o.ay);g.drawImage(I,q[1],q[2],q[3],q[4],dx,dy,w,h);if(a>1){g.globalAlpha=Math.min(1,a-1);g.drawImage(I,q[1],q[2],q[3],q[4],dx,dy,w,h)}g.restore();VFS.n++}
function vfs(n,x,y,o){if(!vfsOn()||!VFS.R[n]||!isFinite(x)||!isFinite(y))return null;o=o||{};const w=o.w||80,s={n,x,y,z:o.z||0,w,w1:o.w1==null?w:o.w1,h:o.h,h1:o.h1,l:o.l||.5,e:0,dl:o.dl||0,a:o.a==null?1:o.a,rot:o.rot||0,vr:o.vr||0,sq:o.sq||0,ax:o.ax,ay:o.ay,
    gr:o.gr?1:0,fi:o.fi==null?.06:o.fi,fo:o.fo==null?.5:o.fo,vx:o.vx||0,vy:o.vy||0,vz:o.vz||0,fk:o.fk||0,ez:o.ez||0,fol:o.fol,ox:o.ox||0,oy:o.oy||0,fx:o.fx||0};
  vfsI(VFS.R[n][0]);const cap=VFS.max*(p9Q()<1?.5:1);while(VFS.s.length>=cap)VFS.s.shift();VFS.s.push(s);return s}
/* ชั้น 1 = พื้น (เรียกจาก p9Ground) · ชั้น 0 = บน (เรียกจาก p9Draw) */
function vfsPass(L){if(!VFS.s.length)return;const n=performance.now(),dt=Math.min(.1,Math.max(0,(n-(VFS.lt[L]||n))/1000));VFS.lt[L]=n;if(!vfsOn()){VFS.s.length=0;return}const V=p9View(),now=n/1000;
  VFS.s=VFS.s.filter(s=>{if(s.gr!==L)return true;if(s.dl>0){s.dl-=dt;return true}s.e+=dt;if(s.e>=s.l)return false;
    if(s.fol){try{const o=typeof s.fol==='function'?s.fol():s.fol;if(o&&isFinite(o.x)){s.x=o.x+s.ox;s.y=o.y+s.oy}}catch(e){}}
    s.x+=s.vx*dt;s.y+=s.vy*dt;s.z=Math.max(0,s.z+s.vz*dt);s.rot+=s.vr*dt;const u=s.e/s.l,k=s.ez?u:1-Math.pow(1-u,3),w=s.w+(s.w1-s.w)*k,h=s.h?s.h+((s.h1==null?s.h:s.h1)-s.h)*k:0,R=Math.max(w,h||w);
    if(s.x<V[0]-R||s.x>V[0]+V[2]+R||s.y-s.z<V[1]-R||s.y-s.z>V[1]+V[3]+R)return true;
    let a=s.a*Math.min(1,s.fi>0?s.e/s.fi:1,s.fo>0?(s.l-s.e)/(s.l*s.fo):1);if(s.fk)a*=.7+.3*Math.sin(now*34+s.x);
    vfsD(s.n,s.x,s.y-s.z,w,{rot:s.rot,a,sq:s.sq,ax:s.ax,ay:s.ay,h:h||0,fx:s.fx});return true})}
try{const o=p9Draw;p9Draw=function(){const r=o.apply(this,arguments);try{vfsPass(0)}catch(e){p9Err('vfs',e)}return r}}catch(e){}
try{const o=p9Ground;p9Ground=function(){const r=o.apply(this,arguments);try{vfsPass(1)}catch(e){p9Err('vfsg',e)}return r}}catch(e){}
try{const o=p9Map;p9Map=function(){const m=P9.map;const r=o.apply(this,arguments);if(m!==P9.map)VFS.s.length=0;return r}}catch(e){}
/* ต่อท้ายตัวเสริมเดิม (P9X = ทับภาพเดิม · P9U = ใต้ภาพเดิม) */
VFS.hit={};function vfK(k,fn,u){const T=u?P9U:P9X,o=T[k],h=C=>{if(!vfsOn())return;const a=VFS.n+VFS.s.length;fn(C);if(VFS.n+VFS.s.length!==a)VFS.hit[k]=1};T[k]=o?function(C){o(C);h(C)}:h}
const vfR=(a,b)=>a+Math.random()*(b-a),vfFade=(t,D,i,o)=>Math.max(0,Math.min(1,t/(i||.1),(D-t)/(o||.2)));
const vfOwn=f=>{try{return(typeof s6Own==='function'&&f.u!=null&&s6Own(f.u))||p9Own(f)}catch(e){return{x:f.x,y:f.y}}};
/* ===== นักรบ ===== */
vfK('whirl',C=>{const {f,t,D,x,y,r}=C,al=vfFade(t,D,.08,.18);vfsD('SLASH_SPIN',x,y-14,r*2.15,{sq:.52,rot:-(t*15+(f.s||0)),a:al*.95});vfsD('SLASH_SPIN',x,y-14,r*1.6,{sq:.52,rot:-(t*15+(f.s||0))+2.4,a:al*.45,fx:1})});
vfK('dash',C=>{const {f,x,y}=C;if(!C.E('v',0))return;const L=f.len||120,a=f.a||0,ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L;
  vfs('DASH_TRAIL',(x+ex)/2,(y+ey)/2,{z:18,w:L*1.0,w1:L*1.15,h:Math.min(90,L*.45),h1:Math.min(60,L*.3),rot:a,l:.34,fo:.8,a:.95});vfs('IMPACT_BURST',ex,ey,{z:18,w:46,w1:110,l:.28,rot:vfR(0,6.28),fo:.7})});
vfK('rage',C=>{const {x,y,r}=C;if(!C.E('v',0))return;const w=Math.min(170,r*1.5);vfs('DEMON_FLAME',x,y+8,{gr:1,ay:.94,w:w*.7,w1:w,l:1,fi:.12,fo:.6,a:.95});vfs('SHOCKWAVE_RING',x,y+4,{gr:1,sq:.45,w:30,w1:r*2,l:.45,a:.8})});
vfK('quake',C=>{const {f,t,D,x,y}=C,ca=Math.cos(f.a||0),sa=Math.sin(f.a||0),Lf=f.len||200;if(!C.E('v',D*.25))return;
  [.28,.62,.96].forEach((u,i)=>{const px=x+ca*Lf*u,py=y+sa*Lf*u;vfs('GROUND_CRACKS',px,py,{gr:1,sq:.5,w:90,w1:130,rot:vfR(0,6.28),l:1.7,dl:i*.05,fi:.04,fo:.55});vfs('IMPACT_BURST',px,py,{z:10,w:50,w1:120,l:.3,dl:i*.05,rot:vfR(0,6.28)})});
  vfs('SHOCKWAVE_RING',x+ca*Lf,y+sa*Lf,{gr:1,sq:.45,w:40,w1:230,l:.5,dl:.1})});
vfK('roar',C=>{const {x,y,r}=C;if(!C.E('v',0))return;vfs('SHOCKWAVE_RING',x,y+4,{gr:1,sq:.45,w:r*.4,w1:r*2.4,l:.55});vfs('SHOCKWAVE_RING',x,y+4,{gr:1,sq:.45,w:r*.3,w1:r*2.9,l:.7,dl:.1,a:.6})});
vfK('bash',C=>{const {f,x,y,r}=C;if(!C.E('v',0))return;const a=f.a||0,cx=x+Math.cos(a)*r*.5,cy=y+Math.sin(a)*r*.5;vfs('IMPACT_BURST',cx,cy,{z:18,w:50,w1:120,l:.28,rot:vfR(0,6.28)});vfs('SPARK_BURST',cx,cy,{z:18,w:70,w1:150,l:.42})});
vfK('fort',C=>{const {D,x,y,r}=C;if(!C.E('v',0))return;vfs('SHIELD_DOME',x,y+6,{ay:.82,w:r*1.5,w1:r*1.9,l:D,fi:.2,fo:.2,a:.5});vfs('HOLY_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.6,w1:r*1.9,l:D,vr:.3,fi:.2,fo:.2,a:.6})});
vfK('rnfire',C=>{const {D,x,y,r}=C;if(!C.E('v',0))return;vfs('FIRE_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.6,w1:r*2,l:D*.9,vr:.5,fi:.2,fo:.25,a:.7})});
vfK('elbx',C=>{const {x,y,r}=C;if(!C.E('v',0))return;vfs('FIRE_EXPLOSION',x,y,{z:12,w:r*1.1,w1:r*1.9,l:.55,rot:vfR(0,6.28)})});
vfK('u3sw',C=>{const {x,y,r}=C;if(C.E('vi',.45)){vfs('MEGA_BLAST',x,y,{z:20,w:r*1.1,w1:r*2.6,l:.65});vfs('GROUND_CRACKS',x,y,{gr:1,sq:.5,w:r*1.4,w1:r*1.9,l:2.2,fi:.03,fo:.5})}
  [.8,1.1,1.4].forEach((tt,i)=>{if(C.E('vr'+i,tt)){const R0=[130,210,290][i];vfs('SHOCKWAVE_RING',x,y+4,{gr:1,sq:.45,w:R0*1.3,w1:R0*2.15,l:.5})}})});
vfK('u3ft',C=>{const {x,y,r}=C;if(!C.E('vi',.35))return;vfs('SHIELD_DOME',x,y+6,{ay:.82,w:r*1.4,w1:r*2,l:2.6,fi:.25,fo:.3,a:.5});vfs('HOLY_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*2.1,l:2.8,vr:.35,fi:.2,fo:.3,a:.8});vfs('HALO_RAYS',x,y-30,{w:r*.8,w1:r*2,l:.6})});
vfK('s6sw',C=>{const {f,t,D}=C,o=vfOwn(f);if(t>D-.2)return;vfsD('SLASH_SPIN',o.x,o.y-14,120,{sq:.5,rot:-t*13,a:.75*vfFade(t,D,.15,.6)})});
vfK('s6st',C=>{const {D,x,y}=C;if(C.E('vh',.35*D))vfs('CLAW_MARKS',x,y,{z:16,w:56,w1:78,l:.3,rot:vfR(-.5,.5),fo:.7})});
vfK('s6gd',C=>{const {f,D,x,y,r}=C;if(C.E('v',0))vfs('SHIELD_DOME',x,y+6,{ay:.82,w:r*1.3,w1:r*1.6,l:Math.max(.5,D-.2),fi:.2,fo:.2,a:.45})});
/* ===== นักเวท ===== */
vfK('fire',C=>{const {t,D,x,y,r}=C,T=.18*D,S=Math.min(1.8,Math.max(.6,r/75));if(t<T){const q=t/T;vfsD('METEOR',x+70*(1-q)+20,y-180*(1-q)-14,86*S,{a:Math.min(1,q*3+.3)})}
  if(C.E('vi',T)){vfs('FIRE_EXPLOSION',x,y,{z:12,w:r*1.1,w1:r*2.2,l:.65,rot:vfR(0,6.28)});vfs('GROUND_CRACKS',x,y,{gr:1,sq:.5,w:r*1.2,w1:r*1.5,l:1.4,fi:.03,fo:.6,a:.8})}});
vfK('frost',C=>{const {x,y,r}=C;if(!C.E('v',0))return;vfs('FROST_NOVA',x,y,{gr:1,sq:.45,w:r*.5,w1:r*2.2,l:.8,vr:.6});vfs('ICE_SHATTER',x,y,{z:18,w:r*.7,w1:r*1.45,l:.5,rot:vfR(0,6.28)})});
vfK('chain',C=>{const {f}=C;if(!f.pts||f.pts.length<2||!C.E('v',0))return;f.pts.slice(1).forEach(([px,py],i)=>vfs('LIGHTNING_ORB',px,py+10,{z:16,w:40,w1:78,l:.32,dl:i*.02,rot:vfR(0,6.28)}))});
vfK('rncomet',C=>{const {f,t,D,x,y}=C,L=f.len||200,a=f.a||0,p=t/D,d=L*Math.min(1,p*1.15),cx=x+Math.cos(a)*d,cy=y+Math.sin(a)*d;if(p<.85)vfsD('METEOR',cx,cy-12,74,{rot:a-2.356,a:Math.min(1,p*6)});
  if(C.E('ve',D*.85))vfs('FIRE_EXPLOSION',cx,cy,{z:10,w:40,w1:100,l:.4})});
vfK('golem',C=>{const {x,y,r}=C;if(!C.E('v',0))return;vfs('GROUND_CRACKS',x,y,{gr:1,sq:.5,w:r*1.3,w1:r*1.7,l:1.6,fi:.03,fo:.6});vfs('FIRE_EXPLOSION',x,y,{z:8,w:r*.8,w1:r*1.6,l:.5})});
vfK('hellgate',C=>{const {D,x,y,r}=C;if(!C.E('v',0))return;vfs('FIRE_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*2.2,l:D,vr:.5,fi:.15,fo:.25,a:.85});vfs('FLAME_PILLAR',x,y+6,{ay:.95,w:80,w1:130,l:1.2,fi:.08,fo:.5})});
vfK('rune',C=>{const {D,x,y,r}=C;if(!C.E('v',0))return;vfs('FIRE_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.5,w1:r*1.8,l:D,vr:.7,fi:.2,fo:.25,a:.8})});
vfK('rift',C=>{const {D,x,y,r}=C;if(!C.E('v',0))return;vfs('VOID_VORTEX',x,y,{gr:1,sq:.5,w:r*1.3,w1:r*1.9,l:D,vr:-1.6,fi:.2,fo:.25,a:.85})});
vfK('riftx',C=>{const {x,y,r}=C;if(!C.E('v',0))return;vfs('VOID_VORTEX',x,y,{z:10,w:r*.9,w1:r*2.2,l:.55,vr:-7})});
vfK('tstop',C=>{const {D,x,y,r}=C;if(!C.E('v',0))return;vfs('ARCANE_CIRCLE',x,y,{gr:1,sq:.5,w:r*1.8,w1:r*2.1,l:D,vr:.25,fi:.25,fo:.2,a:.7})});
vfK('u3bh',C=>{const {x,y,r}=C;if(C.E('v',0))vfs('VOID_VORTEX',x,y-50,{w:r*.5,w1:r*1.7,l:2.4,ez:1,vr:-3.2,fi:.3,fo:.12,a:.95});if(C.E('vf',2.3))vfs('MEGA_BLAST',x,y,{z:20,w:r,w1:r*2.7,l:.75})});
vfK('u3dk',C=>{const {x,y,r}=C;if(C.E('v',0)){vfs('ULT_SIGIL',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*2.2,l:3.4,vr:.4,fi:.3,fo:.2,a:.8});vfs('FLAME_PILLAR',x,y+6,{ay:.95,w:100,w1:150,l:1.3,fo:.5})}
  if(C.E('vf',3.1))vfs('FIRE_EXPLOSION',x,y,{z:14,w:r*1.2,w1:r*2.7,l:.8})});
vfK('s6zp',C=>{const {x,y}=C;if(C.E('v',0))vfs('LIGHTNING_BOLT',x,y+10,{ay:.97,w:40,h:130,l:.18,fi:0,fo:.6,fk:1})});
vfK('s6im',C=>{const {D,x,y}=C;if(C.E('vh',.6*D))vfs('FIRE_EXPLOSION',x,y+6,{z:8,w:36,w1:76,l:.32})});
vfK('q8pop',C=>{const {f,x,y,r}=C;if(!C.E('v',0))return;const u=f.u,n=u==='i'?'ICE_SHATTER':u==='h'?'HALO_RAYS':u==='v'?'VOID_VORTEX':'FIRE_EXPLOSION';vfs(n,x,y,{z:12,w:r*.9,w1:r*2,l:.55,rot:vfR(0,6.28),vr:u==='v'?-6:0})});
vfK('q8bliz',C=>{const {f,x,y,r}=C;if(!C.E('v',0))return;const D=f.d||4,fo=f.u==='f'?(()=>q8Own(f)):null;vfs('FROST_NOVA',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*2.1,l:D,vr:.3,fi:.35,fo:.15,a:.65,fol:fo})});
vfK('q8lance',C=>{const {f,t,D,x,y}=C,p=t/D,a=f.a,L=f.len||340,d=L*Math.min(1,p/.85);if(p<.85)vfsD('ICE_SPEAR',x+Math.cos(a)*d,y+Math.sin(a)*d-20,110,{rot:a,a:Math.min(1,p*8)})});
vfK('q8orb',C=>{const {f,t,D,x,y}=C,p=t/D;if(p>.97)return;let ox,oy;if(f.u==='o'){const o=q8Own(f)||{x,y},an=t*3.2;ox=o.x+Math.cos(an)*75;oy=o.y+Math.sin(an)*45}else{ox=x+Math.cos(f.a)*(f.len||330)*p;oy=y+Math.sin(f.a)*(f.len||330)*p}
  vfsD('LIGHTNING_ORB',ox,oy-26,54,{rot:t*4,a:.9})});
/* ===== ผู้สนับสนุน ===== */
vfK('heal',C=>{const {x,y,r}=C;if(!C.E('v',0))return;const w=Math.max(54,Math.min(r,160)*.9);vfs('HEAL_SPARKLES',x,y+4,{ay:.92,w:w*.8,w1:w*1.05,vz:28,l:1,fi:.1,fo:.6,a:.95});if(r>80)vfs('HOLY_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.3,w1:r*1.7,l:1,vr:.6,a:.7})});
vfK('smite',C=>{const {x,y,r}=C;if(!C.E('v',0))return;const S=Math.min(1.8,Math.max(.8,r/75));vfs('LIGHT_SWORD',x,y+4,{ay:.95,w:44*S,z:170,vz:-1000,l:.36,fi:.04,fo:.35});
  vfs('HALO_RAYS',x,y,{z:12,w:r*.6,w1:r*1.7,l:.5,dl:.15});vfs('SHOCKWAVE_RING',x,y+4,{gr:1,sq:.45,w:r*.4,w1:r*2,l:.45,dl:.15})});
const vfHoly=(x,y,r,big)=>{if(typeof p9WithU3==='function'&&p9WithU3(x,y))return;vfs('HOLY_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.5,w1:r*2,l:1,vr:.5,a:.8});vfs('GOD_RAYS',x,y+6,{ay:.95,w:r*(big?1.8:1.4),w1:r*(big?2.1:1.6),l:big?1.2:.9,fi:.12,fo:.6,a:.8});if(big)vfs('HALO_RAYS',x,y-40,{w:r*.6,w1:r*1.8,l:.7})};
vfK('holy',C=>{if(C.E('v',0))vfHoly(C.x,C.y,C.r,0)});
vfK('dawn',C=>{if(C.E('v',0))vfHoly(C.x,C.y,C.r,1)});
vfK('q8dawn',C=>{if(C.E('v',0))vfHoly(C.x,C.y,C.r,1)});
vfK('sanct',C=>{const {D,x,y,r}=C;if(C.E('v',0))vfs('HOLY_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*1.95,l:D,vr:.3,fi:.25,fo:.15,a:.75})});
vfK('seal',C=>{const {D,x,y,r}=C;if(C.E('v',0))vfs('CURSE_SIGIL',x,y,{gr:1,sq:.45,w:r*1.5,w1:r*1.8,l:D,vr:-.3,fi:.25,fo:.15,a:.75})});
vfK('bell',C=>{const {D,x,y,r}=C;if(r>=150&&D>=4&&C.E('v',0))vfs('ARCANE_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*2,l:D,vr:.2,fi:.3,fo:.15,a:.6})});
vfK('curse',C=>{const {x,y}=C;if(C.E('v',0))vfs('CURSE_SIGIL',x,y,{z:62,w:26,w1:42,l:.9,vr:1.5,fi:.1,fo:.5,a:.85})});
vfK('atk',C=>{const {x,y,r}=C;if(C.E('v',0))vfs('HALO_RAYS',x,y,{z:22,w:r*.6,w1:r*1.4,l:.5,a:.75})});
vfK('u3hv',C=>{const {x,y,r}=C;if(!C.E('vi',.5))return;vfs('ANGEL_WINGS',x,y-64,{w:r*1.2,w1:r*1.75,l:2.2,fi:.3,fo:.4,a:.9});vfs('GOD_RAYS',x,y+6,{ay:.95,w:r*1.8,w1:r*2.2,l:2,fi:.2,fo:.5,a:.8});
  vfs('HOLY_CIRCLE',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*2.2,l:2.4,vr:.3,fi:.2,fo:.3,a:.85})});
vfK('u3yl',C=>{const {x,y,r}=C;if(C.E('v',0))vfs('CURSE_SIGIL',x,y,{gr:1,sq:.45,w:r*1.7,w1:r*2.2,l:2.9,vr:.4,fi:.3,fo:.15,a:.8});if(C.E('vf',2.7))vfs('VOID_VORTEX',x,y,{z:16,w:r,w1:r*2.1,l:.6,vr:-6})});
vfK('s6rg',C=>{const {f,D,r}=C;if(C.E('v',0))vfs('HOLY_CIRCLE',0,0,{gr:1,sq:.45,w:r*1.4,w1:r*1.6,l:Math.max(.5,D-.3),vr:.4,fi:.25,fo:.2,a:.6,fol:()=>vfOwn(f)})});
vfK('q8hlr',C=>{const {x,y,r}=C;if(C.E('v',0))vfs('HEAL_SPARKLES',x,y+4,{ay:.92,w:Math.max(50,r*.9),w1:Math.max(60,r*1.05),vz:24,l:1,fo:.6,a:.9})});
vfK('q8hl',C=>{const {x,y}=C;if(C.E('v',0))vfs('HEAL_SPARKLES',x,y+4,{ay:.92,w:40,w1:50,vz:20,l:.8,fo:.6,a:.85})});
vfK('q8rit',C=>{const {f,x,y,r}=C;if(C.E('v',0))vfs('CURSE_SIGIL',x,y,{gr:1,sq:.45,w:r*1.6,w1:r*2,l:f.d||6,vr:.3,fi:.4,fo:.08,a:.65})});
/* ===== นักฆ่า ===== */
vfK('shadow',C=>{const {x,y}=C;if(C.E('v',0))vfs('SHADOW_SLASH',x,y,{z:18,w:62,w1:92,l:.26,rot:vfR(-.7,.7),fx:Math.random()<.5,fo:.7})});
vfK('mark',C=>{const {x,y}=C;if(C.E('v',0))vfs('CURSE_SIGIL',x,y,{z:58,w:24,w1:40,l:.8,vr:2,fo:.5,a:.85})});
vfK('markx',C=>{const {x,y,r}=C;if(C.E('v',0))vfs('CROSS_SLASH',x,y,{z:16,w:r*.9,w1:r*1.5,l:.36,rot:vfR(-.3,.3)})});
vfK('eclipse',C=>{const {D,x,y,r}=C;if(!C.E('v',0))return;vfs('MOON_CRESCENT',x,y-90,{w:110,w1:160,l:D+.3,vr:.15,fi:.25,fo:.3,a:.9});vfs('SHADOW_WISPS',x,y+6,{ay:.85,w:r*1.2,w1:r*1.6,l:D,fi:.3,fo:.3,a:.65})});
vfK('bdash',C=>{const {x,y}=C;if(C.E('v',0))vfs('CLAW_MARKS',x,y,{z:16,w:56,w1:80,l:.3,rot:vfR(-.5,.5),fo:.7})});
vfK('bstrm',C=>{const {f,t,D}=C;if(t>D*.9||!f.sx||!C.R('vs',.11))return;const u=Math.random();vfs('CROSS_SLASH',f.sx+(C.x-f.sx)*u,f.sy+(C.y-f.sy)*u,{z:16,w:36,w1:60,l:.22,rot:vfR(-.4,.4)})});
vfK('u3nm',C=>{const {t,x,y,r}=C;if(C.E('v',0))vfs('SHADOW_WISPS',x,y+6,{ay:.85,w:r*1.3,w1:r*1.8,l:2.1,fi:.3,fo:.3,a:.6});
  if(t>.2&&t<1.95&&C.R('vs',.2,.25)){const a=Math.random()*6.283,d=r*.6*Math.sqrt(Math.random());vfs('SHADOW_SLASH',x+Math.cos(a)*d,y+Math.sin(a)*d*.5,{z:18,w:60,w1:100,l:.3,rot:vfR(-.8,.8),fx:Math.random()<.5,fo:.7})}});
vfK('u3bd',C=>{const {f,r}=C;if(!C.E('vf',3.05))return;const o=vfOwn(f);vfs('CROSS_SLASH',o.x,o.y,{z:20,w:r*.9,w1:r*2.2,l:.55});vfs('IMPACT_BURST',o.x,o.y,{z:20,w:r*.6,w1:r*1.6,l:.4})});
vfK('s6cl',C=>{const {x,y}=C;if(C.E('v',0))vfs('CLAW_MARKS',x,y,{z:16,w:50,w1:72,l:.3,rot:vfR(-.5,.5),fo:.7})});
vfK('s6bw',C=>{const {f,t,D,r}=C,o=vfOwn(f);if(t>D-.2)return;vfsD('SLASH_SPIN',o.x,o.y-12,r*1.25,{sq:.45,rot:t*14,a:.6*vfFade(t,D,.15,.6)})});
vfK('q8cls',C=>{const {f,x,y}=C;if(C.E('v',0))vfs('SHADOW_SLASH',x,y,{z:16,w:52,w1:80,l:.26,rot:Math.atan2(y-(f.sy||y),x-(f.sx||x)),fo:.7})});
vfK('q8dag',C=>{const {x,y}=C;if(C.E('v',0))vfs('SHADOW_SLASH',x,y,{z:16,w:48,w1:72,l:.24,rot:vfR(-.6,.6),fx:Math.random()<.5,fo:.7})});
vfK('q8mcut',C=>{const {x,y}=C;if(C.E('v',0))vfs('MOON_CRESCENT',x,y,{z:22,w:60,w1:96,l:.4,rot:vfR(-.5,.5),fo:.6})});
/* ===== นักธนู ===== */
vfK('arrows',C=>{const {D,x,y,r}=C;if(C.E('v',0))vfs('ARROW_RAIN',x,y+4,{ay:.95,w:r*1.5,w1:r*1.7,z:70,vz:-70/(D*.45||.4),l:D*.55,dl:D*.12,fi:.08,fo:.4,a:.9})});
vfK('leap',C=>{const {x,y}=C;if(C.E('v',0))vfs('LEAF_STORM',x,y,{gr:1,sq:.5,w:50,w1:120,l:.6,vr:4})});
vfK('pin',C=>{const {x,y}=C;if(C.E('vh',.18))vfs('STAR_FLARE',x,y,{z:16,w:40,w1:84,l:.32,rot:vfR(0,.8)})});
vfK('beam',C=>{const {f,t,D,x,y}=C,a=f.a||0,L=f.len||380,p=t/D;if(p>.9)return;const al=Math.min(1,p/.06,(.9-p)/.25),th=(58+8*Math.sin(t*40))*Math.min(1,p/.08);
  vfsD('PIERCE_BEAM',x+Math.cos(a)*L/2,y+Math.sin(a)*L/2-8,L*1.06,{rot:a,h:th,a:al});if(C.E('v',0))vfs('STAR_FLARE',x+Math.cos(a)*L,y+Math.sin(a)*L,{z:8,w:60,w1:150,l:.4})});
vfK('torn',C=>{const {f,t,D,x,y,r}=C,sp=f.len>0?f.len:115,cx=x+Math.cos(f.a||0)*sp*t,cy=y+Math.sin(f.a||0)*sp*t;if(t>D*.9)return;const al=vfFade(t,D*.9,.15,.3),w=r*1.25,ph=t*9;
  vfsD('WIND_TORNADO',cx,cy+6,w*(1+.07*Math.sin(ph)),{ay:.95,a:al*.85,fx:Math.sin(ph*1.3)>0});vfsD('WIND_TORNADO',cx,cy+6,w*.8,{ay:.95,a:al*.35,fx:Math.sin(ph*1.3)<=0})});
vfK('storm',C=>{const {f,t,D,x:x0,y:y0,r}=C,o=f.u===uid?me:(others&&others[f.u]),x=o?o.x:x0,y=o?o.y:y0;if(t>D-.2||!C.R('vb',.7,.45))return;const a=Math.random()*6.283,d=r*Math.sqrt(Math.random()),gx=x+Math.cos(a)*d,gy=y+Math.sin(a)*d*.5;
  vfs('LIGHTNING_BOLT',gx,gy,{ay:.97,w:54,h:170,l:.22,fi:0,fo:.6,fk:1,fx:Math.random()<.5});vfs('LIGHTNING_ORB',gx,gy,{z:6,w:30,w1:70,l:.25})});
vfK('moon',C=>{const {x,y}=C;if(C.E('v',0))vfs('MOON_CRESCENT',x,y-50,{w:70,w1:120,l:.7,vr:.4,fo:.5})});
vfK('zap',C=>{const {x,y}=C;if(C.E('v',0))vfs('STAR_FLARE',x,y,{z:14,w:28,w1:52,l:.18,rot:vfR(0,.8)})});
vfK('s6ar',C=>{const {D,x,y}=C;if(C.E('vh',.82*D))vfs('STAR_FLARE',x,y,{z:12,w:40,w1:96,l:.36})});
vfK('s6ch',C=>{const {f}=C;if(!f.pts||!C.E('v',0))return;f.pts.slice(1).forEach(([px,py],i)=>vfs('LIGHTNING_ORB',px,py+10,{z:14,w:30,w1:60,l:.28,dl:i*.03}))});
vfK('mtrapx',C=>{const {x,y,r}=C;if(!C.E('v',0))return;vfs('ICE_SHATTER',x,y,{z:12,w:r*.8,w1:r*1.6,l:.5,rot:vfR(0,6.28)});vfs('FROST_NOVA',x,y,{gr:1,sq:.45,w:r*.6,w1:r*2,l:.8,vr:.5})});
vfK('u3st',C=>{const {t,x,y,r}=C;if(t>.7&&t<2.45&&C.R('vm',.17,.75)){const a=Math.random()*6.283,d=r*Math.sqrt(Math.random()),gx=x+Math.cos(a)*d,gy=y+Math.sin(a)*d*.5,T=.22;
    vfs('STAR_ARROW',gx-300*T,gy,{z:800*T,vx:300,vz:-800,w:86,rot:1.21,l:T,fi:.03,fo:.15});vfs('STAR_FLARE',gx,gy,{z:6,w:30,w1:80,l:.3,dl:T})}
  if(C.E('vf',2.55)){vfs('STAR_FLARE',x,y,{z:20,w:r,w1:r*2.4,l:.6});vfs('FROST_NOVA',x,y,{gr:1,sq:.45,w:r,w1:r*2.6,l:.9,vr:.4})}});
vfK('q8snipe',C=>{const {f,t,D,x,y}=C,T=Math.max(.05,D-.3),a=f.a,L=f.len||380,d=L*Math.min(1,t/T);if(t<T)vfsD('STAR_ARROW',x+Math.cos(a)*d,y+Math.sin(a)*d-18,120,{rot:a,ax:.8})});
vfK('q8cyc',C=>{const {x,y,r}=C;if(C.E('v',0))vfs('WIND_TORNADO',x,y+6,{ay:.95,w:r*.9,w1:r*1.3,l:.8,fo:.6,a:.85})});
setTimeout(()=>{try{p9Wrap()}catch(e){}},0);
setTimeout(()=>{try{if(vfsOn())for(let i=0;i<4;i++)vfsI(i)}catch(e){}},2500);
