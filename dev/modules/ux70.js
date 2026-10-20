/* ===== v456 · บ้านกิลด์ HD — ยกระดับภาพทั้งบ้าน =====
   - ใช้สไปรต์ภาพวาด HD ชุดเดียวกับค่าย/นคร/ป้อมเมฆ (hd-camp · hd-fort · hd-city · hd-city2) วาดลงแคชตามขั้นบ้าน
   - พื้นมีพื้นผิว (ดินอัดเป็นด่าง ๆ · หญ้าริมกำแพง · ทางเดินสึก · ร่องล้อ · หินปูถนนมีแสงเงา · แผ่นหินอ่อน · พรมขอบทอง) + เงาใต้กำแพง
   - กำแพงวาดใหม่: รั้วไม้มีแสงเงา · ซุงทรงกระบอกปลายตัด · ก้อนหินขนาดไม่เท่ากันมีไฮไลต์/มอส · ใบเสมามีมิติ · ธงแขวนสีกิลด์ (ขั้น 3+)
   - หอมุม/ประตูเป็นหอหินภาพวาด · ขั้น 5 ประตูดาว · อาคาร: เต็นท์บัญชาการ → บ้านหลังคาม่วง → โถงหลังคาน้ำเงิน+หอคู่ → พระราชวัง
   - ใช้เมื่อเปิดภาพ HD และไม่ใช่โหมดประหยัด · ไม่งั้นใช้ภาพเวกเตอร์เดิม */
try{GHTP.forEach(p=>{if(p[1]===112)p[1]=100})}catch(e){}
const ghHDok=()=>{try{return HDI.on&&!LOWQ&&HDI.ok===1&&HDI.ok2===1&&FHI.ok===1&&CHI.ok===1}catch(e){return false}};
/* v457 · ตึกหลักบ้านกิลด์ภาพวาดใหม่ (hd-guild) ขั้น 1–5 · ธงขาวย้อมเป็นสีกิลด์ (มาสก์ _m คูณสี) */
const GQD={src:"hd-guild.webp",f:{"h4":[0,0,600,744],"h5":[602,0,920,728],"gt3":[0,746,600,582],"gt1":[602,746,600,524],"gt5":[1204,746,640,504],"h2":[0,1330,520,481],"h3":[522,1330,720,458],"h4_m":[1244,1330,300,372],"h1":[0,1813,580,371],"h5_m":[582,1813,460,364],"ki1":[1044,1813,350,358],"tr1":[1396,1813,380,349],"ki3":[0,2186,390,345],"ba1":[392,2186,420,327],"st1":[814,2186,380,326],"st3":[1196,2186,370,305],"tw4":[1568,2186,190,267],"tr3":[0,2533,400,258],"gt5_m":[402,2533,320,252],"h2_m":[724,2533,260,240],"tw1":[986,2533,200,230],"h3_m":[1188,2533,360,229],"tw3":[1550,2533,210,226],"h1_m":[0,2793,290,185],"ba3":[292,2793,500,185],"ba1_m":[794,2793,210,163],"ba3_m":[1006,2793,250,92]}};const GQFP={"h4":[[0.018,0.995],[0.054,0.997],[0.089,0.997],[0.125,0.999],[0.161,0.999],[0.196,0.997],[0.232,0.997],[0.268,0.991],[0.304,0.993],[0.339,0.995],[0.375,0.995],[0.411,0.987],[0.446,0.983],[0.482,0.983],[0.518,0.983],[0.554,0.983],[0.589,0.987],[0.625,0.995],[0.661,0.995],[0.696,0.995],[0.732,0.991],[0.768,0.997],[0.804,0.997],[0.839,0.999],[0.875,0.999],[0.911,0.997],[0.946,0.997],[0.982,0.995]],"h5":[[0.018,0.97],[0.054,0.971],[0.089,0.971],[0.125,0.966],[0.161,0.963],[0.196,0.975],[0.232,0.975],[0.268,0.974],[0.304,0.996],[0.339,0.997],[0.375,0.993],[0.411,0.99],[0.446,0.99],[0.482,0.99],[0.518,0.99],[0.554,0.99],[0.589,0.99],[0.625,0.993],[0.661,0.997],[0.696,0.996],[0.732,0.974],[0.768,0.975],[0.804,0.975],[0.839,0.964],[0.875,0.966],[0.911,0.971],[0.946,0.971],[0.982,0.97]],"gt3":[[0.018,0.995],[0.054,0.998],[0.089,0.991],[0.125,0.991],[0.161,0.998],[0.196,0.993],[0.232,0.986],[0.268,0.978],[0.304,0.978],[0.339,0.962],[0.661,0.96],[0.696,0.978],[0.732,0.978],[0.768,0.986],[0.804,0.99],[0.839,0.998],[0.875,0.991],[0.911,0.991],[0.946,0.998],[0.982,0.995]],"gt1":[[0.018,0.977],[0.054,0.985],[0.089,0.987],[0.125,0.99],[0.161,0.996],[0.196,0.998],[0.232,0.996],[0.268,0.998],[0.304,0.989],[0.696,0.987],[0.732,0.998],[0.768,0.996],[0.804,0.998],[0.839,0.996],[0.875,0.99],[0.911,0.989],[0.946,0.985],[0.982,0.977]],"gt5":[[0.018,0.986],[0.054,0.992],[0.089,0.996],[0.125,0.986],[0.161,0.986],[0.196,0.996],[0.232,0.996],[0.268,0.986],[0.304,0.996],[0.339,0.99],[0.661,0.99],[0.696,0.996],[0.732,0.986],[0.768,0.996],[0.804,0.996],[0.839,0.986],[0.875,0.986],[0.911,0.996],[0.946,0.992],[0.982,0.986]],"h2":[[0.089,0.988],[0.125,0.988],[0.161,0.985],[0.196,0.988],[0.232,0.988],[0.268,0.985],[0.304,0.99],[0.339,0.994],[0.375,0.994],[0.411,0.994],[0.446,0.994],[0.482,0.994],[0.518,0.998],[0.554,0.996],[0.589,0.996],[0.625,0.994],[0.661,0.994],[0.696,0.992],[0.732,0.985],[0.768,0.988],[0.804,0.988],[0.839,0.985],[0.875,0.988],[0.911,0.988]],"h3":[[0.018,0.991],[0.054,0.991],[0.089,0.993],[0.125,0.993],[0.161,0.993],[0.196,0.989],[0.232,0.985],[0.268,0.985],[0.304,0.993],[0.339,0.996],[0.375,0.998],[0.411,0.991],[0.446,0.987],[0.482,0.985],[0.518,0.985],[0.554,0.985],[0.589,0.991],[0.625,0.998],[0.661,0.996],[0.696,0.993],[0.732,0.985],[0.768,0.985],[0.804,0.989],[0.839,0.993],[0.875,0.993],[0.911,0.993],[0.946,0.991],[0.982,0.991]],"h1":[[0.018,0.992],[0.054,0.995],[0.089,0.995],[0.125,0.989],[0.161,0.989],[0.196,0.989],[0.232,0.989],[0.268,0.989],[0.304,0.989],[0.339,0.997],[0.375,0.997],[0.411,0.995],[0.446,0.989],[0.482,0.989],[0.518,0.989],[0.554,0.989],[0.589,0.989],[0.625,0.997],[0.661,0.997],[0.696,0.989],[0.732,0.989],[0.768,0.989],[0.804,0.989],[0.839,0.989],[0.875,0.989],[0.911,0.995],[0.946,0.995],[0.982,0.992]],"ki1":[[0.232,0.872],[0.268,0.911],[0.304,0.919],[0.339,0.913],[0.375,0.927],[0.411,0.941],[0.446,0.941],[0.482,0.992],[0.518,0.994],[0.554,0.989],[0.589,0.941],[0.625,0.93],[0.661,0.922],[0.696,0.894],[0.732,0.905],[0.768,0.95],[0.804,0.941],[0.839,0.98],[0.875,0.98],[0.911,0.947],[0.946,0.908]],"tr1":[[0.018,0.883],[0.054,0.994],[0.089,0.997],[0.125,0.994],[0.161,0.96],[0.196,0.957],[0.232,0.948],[0.268,0.948],[0.304,0.946],[0.339,0.946],[0.375,0.948],[0.411,0.951],[0.446,0.951],[0.482,0.951],[0.518,0.948],[0.554,0.946],[0.589,0.946],[0.625,0.943],[0.661,0.946],[0.696,0.946],[0.732,0.946],[0.768,0.946],[0.804,0.948],[0.839,0.954],[0.875,0.986],[0.911,0.986],[0.946,0.986],[0.982,0.931]],"ki3":[[0.018,0.722],[0.054,0.986],[0.089,0.988],[0.125,0.988],[0.161,0.988],[0.196,0.986],[0.232,0.986],[0.268,0.986],[0.304,0.977],[0.339,0.98],[0.375,0.98],[0.411,0.98],[0.446,0.98],[0.482,0.986],[0.518,0.983],[0.554,0.991],[0.589,0.994],[0.625,0.997],[0.661,0.997],[0.696,0.988],[0.732,0.988],[0.768,0.986],[0.804,0.988],[0.839,0.991],[0.875,0.994],[0.911,0.997],[0.946,0.991]],"ba1":[[0.018,0.89],[0.054,0.859],[0.089,0.878],[0.125,0.881],[0.161,0.878],[0.196,0.881],[0.232,0.905],[0.268,0.994],[0.304,0.997],[0.339,0.969],[0.375,0.948],[0.411,0.948],[0.446,0.948],[0.482,0.948],[0.518,0.948],[0.554,0.948],[0.589,0.948],[0.625,0.948],[0.661,0.948],[0.696,0.982],[0.732,0.997],[0.768,0.991],[0.804,0.881],[0.839,0.878],[0.875,0.881],[0.911,0.878],[0.946,0.859],[0.982,0.89]],"st1":[[0.054,0.997],[0.089,0.997],[0.125,0.997],[0.161,0.985],[0.196,0.982],[0.232,0.979],[0.268,0.975],[0.304,0.985],[0.339,0.985],[0.375,0.982],[0.411,0.972],[0.446,0.972],[0.482,0.972],[0.518,0.972],[0.554,0.972],[0.589,0.972],[0.625,0.982],[0.661,0.985],[0.696,0.985],[0.732,0.975],[0.768,0.979],[0.804,0.979],[0.839,0.985],[0.875,0.997],[0.911,0.997],[0.946,0.994]],"st3":[[0.054,0.944],[0.089,0.948],[0.125,0.951],[0.161,0.951],[0.196,0.954],[0.232,0.954],[0.268,0.954],[0.304,0.961],[0.339,0.964],[0.375,0.97],[0.411,0.977],[0.446,0.977],[0.482,0.98],[0.518,0.984],[0.554,0.987],[0.589,0.993],[0.625,0.997],[0.661,0.99],[0.696,0.98],[0.732,0.974],[0.768,0.964],[0.804,0.957],[0.839,0.951],[0.875,0.944],[0.911,0.941]],"tw4":[[0.054,0.959],[0.089,0.966],[0.125,0.974],[0.161,0.981],[0.196,0.985],[0.232,0.985],[0.268,0.989],[0.304,0.993],[0.339,0.993],[0.375,0.996],[0.411,0.993],[0.446,0.996],[0.482,0.996],[0.518,0.996],[0.554,0.996],[0.589,0.993],[0.625,0.996],[0.661,0.993],[0.696,0.993],[0.732,0.989],[0.768,0.985],[0.804,0.985],[0.839,0.981],[0.875,0.978],[0.911,0.97],[0.946,0.963],[0.982,0.948]],"tr3":[[0.018,0.864],[0.054,0.88],[0.089,0.884],[0.125,0.903],[0.161,0.919],[0.196,0.953],[0.232,0.973],[0.268,0.988],[0.304,0.992],[0.339,0.992],[0.375,0.988],[0.411,0.984],[0.446,0.981],[0.482,0.965],[0.518,0.965],[0.554,0.961],[0.589,0.95],[0.625,0.95],[0.661,0.946],[0.696,0.938],[0.732,0.942],[0.768,0.942],[0.804,0.942],[0.839,0.942],[0.875,0.946],[0.911,0.946],[0.946,0.926],[0.982,0.922]],"tw1":[[0.018,0.987],[0.054,0.996],[0.089,0.996],[0.125,0.991],[0.161,0.983],[0.196,0.983],[0.232,0.987],[0.268,0.983],[0.304,0.991],[0.339,0.996],[0.375,0.996],[0.411,0.991],[0.446,0.996],[0.482,0.996],[0.518,0.996],[0.554,0.996],[0.589,0.991],[0.625,0.991],[0.661,0.996],[0.696,0.996],[0.732,0.983],[0.768,0.987],[0.804,0.983],[0.839,0.983],[0.875,0.991],[0.911,0.996],[0.946,0.996],[0.982,0.987]],"tw3":[[0.018,0.969],[0.054,0.987],[0.089,0.987],[0.125,0.987],[0.161,0.987],[0.196,0.987],[0.232,0.987],[0.268,0.987],[0.304,0.987],[0.339,0.996],[0.375,0.991],[0.411,0.982],[0.446,0.982],[0.482,0.982],[0.518,0.982],[0.554,0.982],[0.589,0.982],[0.625,0.991],[0.661,0.996],[0.696,0.987],[0.732,0.987],[0.768,0.987],[0.804,0.987],[0.839,0.987],[0.875,0.987],[0.911,0.987],[0.946,0.987],[0.982,0.978]],"ba3":[[0.018,0.881],[0.054,0.892],[0.089,0.908],[0.125,0.919],[0.161,0.935],[0.196,0.935],[0.232,0.935],[0.268,0.935],[0.304,0.935],[0.339,0.935],[0.375,0.93],[0.411,0.968],[0.446,0.995],[0.482,0.957],[0.518,0.984],[0.554,0.93],[0.589,0.914],[0.625,0.908],[0.661,0.924],[0.696,0.924],[0.732,0.957],[0.768,0.968],[0.804,0.957],[0.839,0.908],[0.875,0.908],[0.911,0.908],[0.946,0.908],[0.982,0.908]]};const GQI={img:null,ok:0};
function gqLoad(){if(GQI.img)return;const im=new Image();im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{GQI.ok=1})};im.onerror=()=>{GQI.ok=-1};im.src=GQD.src;GQI.img=im}
function ghHDload(){try{if(!HDI.on||LOWQ)return;hdLoad();hdbLoad();fhdLoad();chdLoad();gqLoad()}catch(e){}}
/* v462 · ทางเดินบนกำแพง (ขั้น 2+) — ตำแหน่งบนกำแพงอนุมานจากพิกัด: แถบทางเดินอยู่นอกเขตพื้นที่เดินได้ปกติ จึงรู้ได้ทุกเครื่องว่าใครอยู่บนกำแพง */
const ghWH=t=>[0,26,50,70,80,86][t]||50;
const ghWL=t=>t===2?{n:51,s:61,e:55}:{n:ghWH(t)+11,s:ghWH(t)+21,e:ghWH(t)+15}; /* +15 = เท้าตัวละครอยู่ต่ำกว่าพิกัด ~15px */
const ghHWd=t=>[0,0,140,196,160,245][t]||200;
function ghWReg(lx,ly,t){if(!(t>=2))return null;const L=ghWL(t),ax=Math.abs(lx);
  if(ly>=-498&&ly<=-474&&ax<=612&&ax>=ghHWd(t))return{k:'n',l:L.n};
  if(ax>=586&&ax<=614&&ly>=-498&&ly<=436)return{k:'e',l:L.e};
  if(ly>=412&&ly<=436&&ax>=170&&ax<=612)return{k:'s',l:L.s};
  if(ax>=368&&ax<=408&&ly>=-474&&ly<=-392)return{k:'st',l:Math.max(0,(-392-ly)/82*L.n)};
  return null}
const GHLP=t=>t<=1?[[-70,300],[70,300],[-70,-200],[70,-200]]:[[-70,360],[70,360],[-70,190],[70,190],[-70,-200],[70,-200],[-330,-60],[330,-60]];
const GHDEC=t=>{const L=[];if(t>=3)L.push([-175,120,16],[175,120,16]);const nw=GQI.ok===1;if(t>=4&&!nw)L.push([-232,150,24],[232,150,24]);if(t>=5&&!nw)L.push([-150,322,20],[150,322,20]);return L};
function ghBuildHD(t,col,em){const S=1.2,X0=-690,Y0=-800,WD=1380,HT=1310;
  const cv=document.createElement('canvas');cv.width=Math.round(WD*S);cv.height=Math.round(HT*S);const c=cv.getContext('2d');c.scale(S,S);c.translate(-X0,-Y0);try{c.imageSmoothingQuality='high'}catch(e){}
  let sd=7771+t*53;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647,RR=(a,b)=>a+rn()*(b-a);
  const O='#1a120a',cD=ghShade(col,-.45),cL=ghShade(col,.35);
  const P=(p,f,s,lw)=>{c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)c.lineTo(p[i],p[i+1]);c.closePath();if(f){c.fillStyle=f;c.fill()}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.stroke()}};
  const Rc=(x,y,w,h,f,s,lw)=>{if(f){c.fillStyle=f;c.fillRect(x,y,w,h)}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.strokeRect(x,y,w,h)}};
  const E=(x,y,rx,ry,f,s,lw)=>{c.beginPath();c.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,7);if(f){c.fillStyle=f;c.fill()}if(s){c.lineWidth=lw||1;c.strokeStyle=s;c.stroke()}};
  const blob=(x,y,r,rgb,a)=>{const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+rgb+','+a+')');gr.addColorStop(1,'rgba('+rgb+',0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)};
  const soft=(x,y,rx,ry,a)=>{c.save();c.translate(x,y);c.scale(1,ry/rx);const gr=c.createRadialGradient(0,0,rx*.2,0,0,rx);gr.addColorStop(0,'rgba(10,6,16,'+(a||.38)+')');gr.addColorStop(1,'rgba(10,6,16,0)');c.fillStyle=gr;c.beginPath();c.arc(0,0,rx,0,7);c.fill();c.restore()};
  const AT={a:[HDI.img,AHD.f],b:[HDI.img2,AHB.f],f:[FHI.img,FHD.f],c:[CHI.img,CHD.f]};
  const spr=(at,id,x,by,w,fl)=>{const A=AT[at],q=A[1][id];if(!q)return 0;const h=w*q[3]/q[2];if(fl){c.save();c.translate(x,by);c.scale(-1,1);c.drawImage(A[0],q[0],q[1],q[2],q[3],-w/2,-h,w,h);c.restore()}else c.drawImage(A[0],q[0],q[1],q[2],q[3],x-w/2,by-h,w,h);return h};
  GHS.gq=0;GHS.ks=null;const GQs=GQI.ok===1&&!!GQI.img;
  /* ฉากพื้นแนบอาคาร: เงาทอด (ซิลูเอตเอียง) + เงาสัมผัสตามขอบล่างจริง + หญ้า/ก้อนหินทับขอบล่าง */
  const gqTuft=(x,y,s2,st)=>{const G=st?['#4f6b34','#5f7d3c','#3f5a2a','#6e8c46']:['#5d8c36','#6fa042','#4a7a2c','#86b452'];c.lineCap='round';
      for(let k=0;k<5;k++){const bx=x+(k-2)*1.7*s2;c.strokeStyle='#1e2414';c.lineWidth=2.4*s2;const tx=x+(k-2)*2.8*s2+RR(-1,1)*s2,ty=y-RR(5,10)*s2;c.beginPath();c.moveTo(bx,y);c.quadraticCurveTo(bx+RR(-1.5,1.5)*s2,y-4*s2,tx,ty);c.stroke();c.strokeStyle=G[k%4];c.lineWidth=1.2*s2;c.beginPath();c.moveTo(bx,y);c.quadraticCurveTo(bx+RR(-1.5,1.5)*s2,y-4*s2,tx,ty);c.stroke()}};
  const gqPeb=(x,y,r,st)=>{const b=st?ghShade('#6c737b',RR(-.15,.15)):ghShade('#8a7656',RR(-.15,.15));c.fillStyle=b;c.strokeStyle='#22201c';c.lineWidth=1;c.beginPath();c.ellipse(x,y,r,r*.62,0,0,7);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.ellipse(x-r*.3,y-r*.25,r*.42,r*.2,0,0,7);c.fill()};
  const GQ=(i,x,by,w)=>{const K=typeof i==='number'?'h'+i:i,q=GQD.f[K],m=GQD.f[K+'_m'],F=GQFP[K]||[];if(!q)return;GHS.gq=1;add(by,()=>{const h=w*q[3]/q[2],x0=x-w/2,y0=by-h,st=t>=3;
    /* เงาทอดไปขวาบน */
    try{const tc=document.createElement('canvas');tc.width=Math.max(6,Math.ceil(w*.09));tc.height=Math.max(6,Math.ceil(h*.09));const x2=tc.getContext('2d');x2.drawImage(GQI.img,q[0],q[1],q[2],q[3],0,0,tc.width,tc.height);x2.globalCompositeOperation='source-in';x2.fillStyle='#0c0a10';x2.fillRect(0,0,tc.width,tc.height);
      c.save();c.imageSmoothingEnabled=true;c.globalAlpha=.24;c.translate(x0,by);c.transform(1,0,-.62,.36,0,0);c.drawImage(tc,-w*.03,-h*1.02,w*1.06,h*1.04);c.globalAlpha=.14;c.drawImage(tc,-w*.08,-h*1.06,w*1.16,h*1.1);c.restore()}catch(e){}
    soft(x+w*.03,by-4,w*.52,w*.1,.3);
    /* ลานดินเหยียบ/ฐานหินใต้อาคาร */
    if(!st){c.save();for(let k=0;k<F.length;k+=2){const px=x0+F[k][0]*w,py=y0+F[k][1]*h;c.globalAlpha=.16;E(px,py+2,w*.07,w*.03,'#3e2c18')}c.restore()}
    /* เงาสัมผัสตามขอบล่าง */
    c.save();F.forEach(([fx,fy])=>{const px=x0+fx*w,py=y0+fy*h,r=Math.max(5,w*.045);const gr=c.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,'rgba(8,6,10,.5)');gr.addColorStop(1,'rgba(8,6,10,0)');c.fillStyle=gr;c.beginPath();c.ellipse(px,py,r,r*.45,0,0,7);c.fill()});c.restore();
    c.drawImage(GQI.img,q[0],q[1],q[2],q[3],x0,y0,w,h);
    if(m){try{const tc=document.createElement('canvas');tc.width=Math.ceil(w*S);tc.height=Math.ceil(h*S);const x2=tc.getContext('2d');x2.drawImage(GQI.img,m[0],m[1],m[2],m[3],0,0,tc.width,tc.height);x2.globalCompositeOperation='source-in';x2.fillStyle=ghShade(col,.25);x2.fillRect(0,0,tc.width,tc.height);c.save();c.globalCompositeOperation='multiply';c.drawImage(tc,x0,y0,w,h);c.restore()}catch(e){}}
    /* หญ้า/หินเล็กทับขอบล่าง ให้ดูฝังพื้น */
    const ed=F.filter(p=>p[1]>.9);if(ed.length){const n=Math.max(3,Math.round(w/34));for(let k=0;k<n;k++){const p=ed[Math.floor(rn()*ed.length)],px=x0+p[0]*w+RR(-6,6),py=y0+p[1]*h+RR(0,3);if(rn()<.62)gqTuft(px,py,RR(.75,1.15),st);else gqPeb(px,py,RR(2.4,4.2),st)}
      const L2=ed[0],R2=ed[ed.length-1];[[x0+L2[0]*w-RR(4,10),y0+L2[1]*h+1],[x0+R2[0]*w+RR(4,10),y0+R2[1]*h+1]].forEach(([px,py])=>{gqTuft(px,py,RR(.9,1.2),st);gqPeb(px+RR(-5,5),py+2,RR(2.2,3.4),st)})}})};
  const L=[],add=(by,fn)=>L.push([by,fn]),SP=(at,id,x,by,w,o)=>{o=o||{};add(by,()=>{if(o.sh!==0)soft(x+w*.04,by-3,w*(o.sh||.46),w*.12,o.sa);if(o.flt){try{c.filter=o.flt}catch(e){}}spr(at,id,x,by,w,o.fl);if(o.flt){try{c.filter='none'}catch(e){}}})};
  const stone=t>=3,WH=GQs?[0,26,50,70,80,86][t]:[0,26,50,46,62,68][t],WF=GQs?(t===5?'#737a82':t===4?'#6c7279':'#7a7c7c'):t===5?'#cfc6b0':t===4?'#8a857c':'#918a79',WT=GQs?(t===5?'#959ca4':t===4?'#8b9198':'#979996'):t===5?'#ebe3ce':t===4?'#a8a399':'#aea795';
  /* ================= พื้น ================= */
  if(t<=2){Rc(-600,-470,1200,900,t===1?'#7b6747':'#76613f');
    for(let i=0;i<110;i++)blob(RR(-600,600),RR(-470,430),RR(40,150),rn()<.5?'255,236,190':'40,26,12',RR(.04,.09));
    for(let i=0;i<70;i++)blob(RR(-600,600),RR(-470,430),RR(20,60),'70,110,40',RR(.05,.12));
    const path=(pts,w,col2,a)=>{c.save();c.globalAlpha=a;c.strokeStyle=col2;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.stroke();c.restore()};
    const PS=[[0,-300,0,440],[0,-78,-430,-78],[0,-88,420,-88]];
    PS.forEach(p=>path(p,116,'#5e4b30',.25));c.save();c.globalAlpha=.3;E(0,22,140,106,'#5e4b30');c.restore();
    PS.forEach(p=>path(p,98,'#a58c63',.95));E(0,22,130,98,'#a58c63');PS.forEach(p=>path(p,46,'#bba179',.45));
    for(let i=0;i<900;i++){const x=RR(-600,600),y=RR(-470,430);c.globalAlpha=RR(.18,.5);const r=RR(.8,2.6);E(x,y,r,r*.7,rn()<.5?'#4a3a24':'#c6ad80');if(rn()<.3){c.fillStyle='rgba(255,240,210,.5)';c.fillRect(x-r*.4,y-r*.5,r*.5,r*.3)}}c.globalAlpha=1;
    c.strokeStyle='rgba(70,52,30,.32)';c.lineWidth=3;[-20,20].forEach(dx=>{c.beginPath();for(let y=-290;y<=440;y+=10){const x=dx+Math.sin(y*.03)*2;y===-290?c.moveTo(x,y):c.lineTo(x,y)}c.stroke()});
    if(t===2){c.save();Rc(-41,-292,6,722,'#5a3c22');Rc(35,-292,6,722,'#5a3c22');for(let y=-290;y<428;y+=14){const gr=c.createLinearGradient(0,y,0,y+12);gr.addColorStop(0,'#9b7148');gr.addColorStop(1,'#73502f');c.fillStyle=gr;c.fillRect(-35,y,70,12);c.fillStyle='rgba(255,226,170,.28)';c.fillRect(-35,y,70,1.4);c.fillStyle='rgba(30,16,6,.55)';c.fillRect(-35,y+11,70,1.6);
      c.strokeStyle='rgba(60,36,16,.35)';c.lineWidth=.7;for(let k=0;k<3;k++){const gy=y+3+k*3;c.beginPath();c.moveTo(-33+RR(0,8),gy);c.lineTo(33-RR(0,8),gy+RR(-.6,.6));c.stroke()}c.fillStyle='#3a3a3a';[[-30,y+6],[30,y+6]].forEach(([a,b])=>{c.beginPath();c.arc(a,b,1.1,0,7);c.fill()})}c.restore()}
    /* หญ้าริมกำแพง */
    const tuft=(x,y,s)=>{const G=['#5d8c36','#6fa042','#4a7a2c','#86b452'];for(let k=0;k<5;k++){c.strokeStyle=G[(k+((x*7)|0))%4];c.lineWidth=1.3*s;c.beginPath();c.moveTo(x+k*1.6*s-3*s,y);c.quadraticCurveTo(x+k*1.6*s-3*s+RR(-2,2)*s,y-5*s,x+(k-2)*2.6*s,y-RR(6,11)*s);c.stroke()}if(rn()<.18){c.fillStyle=rn()<.5?'#fff3a8':'#ffffff';c.beginPath();c.arc(x+RR(-4,4),y-RR(5,9)*s,1.4*s,0,7);c.fill()}};
    for(let i=0;i<520;i++){const e=rn();let x,y;if(e<.3){x=RR(-598,-540);y=RR(-460,425)}else if(e<.6){x=RR(540,598);y=RR(-460,425)}else if(e<.8){x=RR(-598,598);y=RR(-462,-420)}else{x=RR(-598,598);y=RR(395,428)}if(Math.abs(x)<60&&y>380)continue;tuft(x,y,RR(.8,1.3))}
    for(let i=0;i<70;i++){const x=RR(-560,560),y=RR(-420,400);if(Math.abs(x)<70||Math.hypot(x,(y-22)*1.3)<160)continue;tuft(x,y,RR(.7,1))}}
  else{const ST=(x,y,w,h,base,vr,rr)=>{const k=(rn()-.5)*vr;const gr=c.createLinearGradient(x,y,x+w*.4,y+h);gr.addColorStop(0,ghShade(base,Math.min(.9,k+.15)));gr.addColorStop(1,ghShade(base,Math.max(-.9,k-.2)));
      c.fillStyle=gr;c.beginPath();c.roundRect(x+1,y+1,w-2,h-2,rr||3.5);c.fill();c.strokeStyle='rgba(30,26,20,.35)';c.lineWidth=.8;c.stroke()};
    const cob=(x0,y0,x1,y1,w,h,base,vr,rr)=>{for(let y=y0,r=0;y<y1;y+=h,r++)for(let x=x0-(r%2?w/2:0);x<x1;x+=w){const xa=Math.max(x0,x),xb=Math.min(x1,x+w);if(xb-xa<4)continue;const ww=xb-xa,hh=Math.min(h,y1-y);ST(xa+RR(-.6,.6),y,ww,hh,base,vr,rr)}};
    /* หินปูพื้นทรงไม่เท่ากัน (มุมร่วมแบบสุ่ม) + ร่องดิน + มอส */
    const FLAG=(x0,y0,x1,y1,cs,base,mo,gr2)=>{const ch=cs*.7,nx=Math.ceil((x1-x0)/cs)+1,ny=Math.ceil((y1-y0)/ch)+1,V=[];
      for(let j=0;j<=ny;j++){V[j]=[];for(let i=0;i<=nx;i++){const ex=(i===0)?0:RR(-.3,.3)*cs,ey=(j===0)?0:RR(-.28,.28)*ch;V[j][i]=[x0+i*cs+ex+(j%2?cs*.18:0),y0+j*ch+ey]}}
      c.save();c.beginPath();c.rect(x0,y0,x1-x0,y1-y0);c.clip();c.fillStyle=gr2||'#2c2822';c.fillRect(x0,y0,x1-x0,y1-y0);
      for(let j=0;j<ny;j++)for(let i=-1;i<nx;i++){const A=V[j][Math.max(0,i)],B=V[j][i+1],C=V[j+1][i+1],D=V[j+1][Math.max(0,i)];if(i<0){A[0]=x0-cs;D[0]=x0-cs}
        const P=[A,B,C,D].map(v=>v.slice());const cx=(P[0][0]+P[1][0]+P[2][0]+P[3][0])/4,cy=(P[0][1]+P[1][1]+P[2][1]+P[3][1])/4;
        P.forEach(v=>{const dx=cx-v[0],dy=cy-v[1],d=Math.hypot(dx,dy)||1;v[0]+=dx/d*1.5;v[1]+=dy/d*1.5});
        const k=RR(-.06,.06);c.fillStyle=ghShade(base,k);c.beginPath();c.moveTo(P[0][0],P[0][1]);for(let q=1;q<4;q++)c.lineTo(P[q][0],P[q][1]);c.closePath();c.fill();
        c.strokeStyle='rgba(20,18,16,.42)';c.lineWidth=.8;c.stroke();
        c.strokeStyle=ghShade(base,k+.12);c.lineWidth=1.1;c.beginPath();c.moveTo(P[3][0]+1,P[3][1]-1);c.lineTo(P[0][0]+1,P[0][1]+1.5);c.lineTo(P[1][0]-1,P[1][1]+1.5);c.stroke();
        c.strokeStyle=ghShade(base,k-.16);c.beginPath();c.moveTo(P[1][0]-1,P[1][1]+1);c.lineTo(P[2][0]-1,P[2][1]-1.2);c.lineTo(P[3][0]+1,P[3][1]-1.2);c.stroke();
        if(rn()<.06){c.strokeStyle='rgba(24,22,20,.4)';c.lineWidth=.8;c.beginPath();let px=cx+RR(-6,6),py=cy+RR(-4,4);c.moveTo(px,py);for(let q=0;q<3;q++){px+=RR(-7,7);py+=RR(-4,4);c.lineTo(px,py)}c.stroke()}
        if(rn()<mo){const v=P[Math.floor(rn()*4)];c.fillStyle=rn()<.5?'#4a6630':'#5a7a38';for(let q=0;q<6;q++){c.beginPath();c.arc(v[0]+RR(-4,4),v[1]+RR(-3,3),RR(1,2.4),0,7);c.fill()}}}
      c.restore()};
    if(GQs){const gnd=t===3?'#5e5446':t===4?'#3e4146':'#43474d';Rc(-600,-470,1200,900,gnd);
      if(t===3){for(let i=0;i<120;i++)blob(RR(-600,600),RR(-470,430),RR(40,140),rn()<.5?'230,210,170':'20,16,10',RR(.04,.08));for(let i=0;i<70;i++)blob(RR(-600,600),RR(-470,430),RR(20,50),'70,100,40',RR(.07,.13));
        for(let i=0;i<1300;i++){const x=RR(-600,600),y=RR(-470,430);c.globalAlpha=RR(.25,.55);E(x,y,RR(.8,2.2),RR(.6,1.6),rn()<.5?'#3a3226':'#8c7c62')}c.globalAlpha=1;
        for(let i=0;i<46;i++){const x=RR(-560,560),y=RR(-420,400);if(Math.abs(x)<70)continue;gqPeb(x,y,RR(2.2,4.6),true)}
        c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-58,-302,116,736);c.fillRect(-436,-116,436,76);c.fillRect(56,-124,370,72);
        FLAG(-54,-300,54,432,19,'#7a7870',.14);FLAG(-432,-112,-54,-44,18,'#7a7870',.12);FLAG(54,-120,422,-56,18,'#7a7870',.12)}
      else{FLAG(-600,-470,600,430,t===5?26:22,t===5?'#77736a':'#6c6860',.08);
        const ag=c.createLinearGradient(-70,0,70,0);ag.addColorStop(0,'rgba(0,0,0,0)');ag.addColorStop(.5,'rgba(0,0,0,.12)');ag.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=ag;c.fillRect(-70,-300,140,730);
        if(t===5){c.fillStyle='rgba(0,0,0,.3)';c.fillRect(-48,-298,96,734);const gr=c.createLinearGradient(-44,0,44,0);gr.addColorStop(0,cD);gr.addColorStop(.18,col);gr.addColorStop(.5,cL);gr.addColorStop(.82,col);gr.addColorStop(1,cD);c.fillStyle=gr;c.fillRect(-44,-300,88,736);
          c.save();c.globalAlpha=.12;for(let y=-298;y<436;y+=3){c.fillStyle=(y/3|0)%2?'#000':'#fff';c.fillRect(-38,y,76,1)}c.restore();c.fillStyle='rgba(0,0,0,.18)';c.fillRect(-38,-300,6,736);c.fillRect(32,-300,6,736);c.fillStyle='#8a5e26';c.fillRect(-44,-300,7,736);c.fillRect(37,-300,7,736);c.fillStyle='#c89a4c';c.fillRect(-43,-300,2,736);c.fillRect(38,-300,2,736);c.strokeStyle='#26222a';c.lineWidth=1.5;c.strokeRect(-44,-300,88,736);c.beginPath();c.moveTo(-37,-300);c.lineTo(-37,436);c.moveTo(37,-300);c.lineTo(37,436);c.stroke();
          for(let y=-270;y<420;y+=56){c.fillStyle='#b8873c';c.beginPath();c.moveTo(0,y-14);c.lineTo(12,y);c.lineTo(0,y+14);c.lineTo(-12,y);c.closePath();c.fill();c.fillStyle=cD;c.beginPath();c.moveTo(0,y-8);c.lineTo(7,y);c.lineTo(0,y+8);c.lineTo(-7,y);c.closePath();c.fill()}}}
      for(let i=0;i<220;i++){const e=rn();let x,y;if(e<.3){x=RR(-596,-560);y=RR(-460,425)}else if(e<.6){x=RR(560,596);y=RR(-460,425)}else{x=RR(-596,596);y=RR(-464,-440)}gqTuft(x,y,RR(.7,1.1),true)}}
    else if(t===3){Rc(-600,-470,1200,900,'#827a68');for(let i=0;i<120;i++)blob(RR(-600,600),RR(-470,430),RR(40,140),rn()<.5?'255,246,220':'30,26,18',RR(.04,.08));for(let i=0;i<60;i++)blob(RR(-600,600),RR(-470,430),RR(20,50),'80,110,50',RR(.06,.12));
      for(let i=0;i<1400;i++){const x=RR(-600,600),y=RR(-470,430);c.globalAlpha=RR(.2,.5);E(x,y,RR(.8,2.2),RR(.6,1.6),rn()<.5?'#5a5446':'#b8b09c')}c.globalAlpha=1;
      c.fillStyle='rgba(0,0,0,.14)';c.fillRect(-56,-300,112,732);c.fillRect(-434,-114,434,72);c.fillRect(56,-122,368,68);
      cob(-52,-300,52,432,21,13,'#a49e90',.24);cob(-430,-110,-52,-46,21,13,'#a49e90',.24);cob(52,-118,420,-58,21,13,'#a49e90',.24)}
    else if(t===4){Rc(-600,-470,1200,900,'#5f5b54');cob(-600,-470,600,430,25,16,'#88837a',.22,4);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-62,-300,124,730);cob(-58,-300,58,430,29,18,'#a7a196',.18,5);for(let i=0;i<90;i++)blob(RR(-600,600),RR(-470,430),RR(30,110),rn()<.6?'255,250,235':'20,18,14',RR(.04,.07))}
    else{Rc(-600,-470,1200,900,'#b8ad92');for(let y=-470,r=0;y<430;y+=44,r++)for(let x=-600-(r%2?32:0);x<600;x+=64){const xa=Math.max(-600,x),xb=Math.min(600,x+64);const base=ghShade('#dcd2b8',(rn()-.5)*.1);const gr=c.createLinearGradient(xa,y,xb,y+44);gr.addColorStop(0,ghShade('#e8dfc8',(rn()-.5)*.06));gr.addColorStop(1,ghShade('#cbbf9f',(rn()-.5)*.06));c.fillStyle=gr;c.fillRect(xa+1,y+1,xb-xa-2,42);
        c.strokeStyle='rgba(150,130,100,.22)';c.lineWidth=.8;for(let v=0;v<2;v++){c.beginPath();let px=xa+RR(4,xb-xa-4),py=y+RR(4,40);c.moveTo(px,py);for(let s=0;s<4;s++){px+=RR(-10,10);py+=RR(-6,6);c.lineTo(px,py)}c.stroke()}
        c.fillStyle='rgba(255,255,255,.35)';c.fillRect(xa+1,y+1,xb-xa-2,1.2);c.fillStyle='rgba(90,76,52,.35)';c.fillRect(xa+1,y+42,xb-xa-2,1.2)}
      /* พรมสีกิลด์ */
      c.fillStyle='rgba(0,0,0,.18)';c.fillRect(-48,-298,96,734);const gr=c.createLinearGradient(-44,0,44,0);gr.addColorStop(0,cD);gr.addColorStop(.18,col);gr.addColorStop(.5,cL);gr.addColorStop(.82,col);gr.addColorStop(1,cD);c.fillStyle=gr;c.fillRect(-44,-300,88,736);
      c.fillStyle='#e8c060';c.fillRect(-44,-300,5,736);c.fillRect(39,-300,5,736);c.fillStyle='rgba(255,240,180,.6)';c.fillRect(-42,-300,1.5,736);c.fillRect(41,-300,1.5,736);
      for(let y=-270;y<420;y+=56){c.fillStyle='#e8c060';c.beginPath();c.moveTo(0,y-14);c.lineTo(12,y);c.lineTo(0,y+14);c.lineTo(-12,y);c.closePath();c.fill();c.fillStyle=cD;c.beginPath();c.moveTo(0,y-8);c.lineTo(7,y);c.lineTo(0,y+8);c.lineTo(-7,y);c.closePath();c.fill()}}
    /* ลานกลาง: วงโมเสก */
    E(0,22,138,104,'rgba(0,0,0,.18)');E(0,22,132,100,GQs?'#555b62':t===5?'#bdb296':'#8f8a7e');for(let i=0;i<36;i++){const a=i/36*6.283,a2=(i+1)/36*6.283;c.fillStyle=i%2?col:cL;c.beginPath();c.moveTo(Math.cos(a)*112,22+Math.sin(a)*84);c.lineTo(Math.cos(a)*130,22+Math.sin(a)*98);c.lineTo(Math.cos(a2)*130,22+Math.sin(a2)*98);c.lineTo(Math.cos(a2)*112,22+Math.sin(a2)*84);c.closePath();c.fill()}
    E(0,22,130,98,null,'rgba(255,240,200,.35)',1.2);E(0,22,112,84,GQs?'#6c737b':t===5?'#e6ddc6':'#a6a194');if(GQs){c.save();c.beginPath();c.ellipse(0,22,112,84,0,0,7);c.clip();FLAG(-112,-62,112,106,16,'#7e7a70',.06,'#34302a');c.restore()}E(0,22,112,84,null,'rgba(40,30,20,.35)',1)}
  /* เงาใต้กำแพง (AO) */
  {const gN=c.createLinearGradient(0,-470,0,-430);gN.addColorStop(0,'rgba(15,10,6,.42)');gN.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gN;c.fillRect(-600,-470,1200,40);
    const gW=c.createLinearGradient(-600,0,-570,0);gW.addColorStop(0,'rgba(15,10,6,.32)');gW.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gW;c.fillRect(-600,-470,30,900);
    const gE=c.createLinearGradient(600,0,570,0);gE.addColorStop(0,'rgba(15,10,6,.32)');gE.addColorStop(1,'rgba(15,10,6,0)');c.fillStyle=gE;c.fillRect(570,-470,30,900)}
  /* ถนนนอกประตู */
  {const gr=c.createLinearGradient(0,430,0,510);gr.addColorStop(0,stone?'rgba(150,144,128,1)':'rgba(165,140,99,1)');gr.addColorStop(1,'rgba(150,130,90,0)');c.fillStyle=gr;c.fillRect(-50,430,100,80)}
  /* ================= แปลงผัก (กรอบไม้ + ดินร่อง) ================= */
  {const n=GHPLOT[t];for(let i=0;i<n;i++){const x=i%2?458:342,y=-252+(i>>1)*50;soft(x+50,y+42,58,8,.3);
      const gf=c.createLinearGradient(0,y-3,0,y+43);gf.addColorStop(0,'#9a7248');gf.addColorStop(1,'#6a4828');c.fillStyle=gf;c.beginPath();c.roundRect(x-4,y-3,104,46,4);c.fill();c.strokeStyle=O;c.lineWidth=.8;c.stroke();
      const gs=c.createLinearGradient(0,y,0,y+40);gs.addColorStop(0,'#4e3520');gs.addColorStop(1,'#3a2614');c.fillStyle=gs;c.fillRect(x,y,96,40);
      for(let k=0;k<4;k++){const gy=y+4+k*9;const g2=c.createLinearGradient(0,gy,0,gy+7);g2.addColorStop(0,'#7a5634');g2.addColorStop(1,'#5a3c22');c.fillStyle=g2;c.beginPath();c.roundRect(x+3,gy,90,6.5,3);c.fill();c.fillStyle='rgba(255,220,170,.18)';c.fillRect(x+5,gy+.5,86,1.2)}
      c.fillStyle='rgba(255,236,190,.35)';c.fillRect(x-3,y-2,102,1.5)}
    for(let x=326;x<=570;x+=24){soft(x+1,-260,5,2,.3);const gp=c.createLinearGradient(x-2.5,0,x+2.5,0);gp.addColorStop(0,'#5a3a1e');gp.addColorStop(.4,'#9a7046');gp.addColorStop(1,'#4a2e16');c.fillStyle=gp;c.fillRect(x-2.5,-276,5,16);P([x-2.5,-276,x,-280,x+2.5,-276],'#b88a58')}
    const gr2=c.createLinearGradient(0,-271,0,-266);gr2.addColorStop(0,'#a87a4a');gr2.addColorStop(1,'#6a4626');c.fillStyle=gr2;c.fillRect(326,-271,244,3.5);c.fillRect(326,-265,244,2.5)}
  /* ================= กำแพง ================= */
  const logV=(x,y0,y1,w,base)=>{const gr=c.createLinearGradient(x,0,x+w,0);gr.addColorStop(0,ghShade(base,-.38));gr.addColorStop(.3,ghShade(base,.18));gr.addColorStop(.55,base);gr.addColorStop(1,ghShade(base,-.45));c.fillStyle=gr;c.fillRect(x,y0,w,y1-y0)};
  const hWall=(xa,xb,y)=>{
    if(t===1){soft((xa+xb)/2,y+2,(xb-xa)/2+4,5,.25);
      [y-18,y-9].forEach(ry=>{const gr=c.createLinearGradient(0,ry,0,ry+4);gr.addColorStop(0,'#b0844f');gr.addColorStop(1,'#6a4626');c.fillStyle=gr;c.fillRect(xa,ry,xb-xa,4)});
      for(let x=xa;x<=xb;x+=26){logV(x-3.5,y-WH,y,7,'#7a5232');P([x-3.5,y-WH,x,y-WH-5,x+3.5,y-WH],'#a07448');c.fillStyle='#c8a070';c.beginPath();c.ellipse(x,y-WH-.5,3.2,1.3,0,0,7);c.fill();c.strokeStyle='#d8c090';c.lineWidth=1;c.beginPath();c.moveTo(x-4,y-15);c.lineTo(x+4,y-12);c.stroke()}return}
    soft((xa+xb)/2,y+4,(xb-xa)/2+8,10,.32);
    const plk=()=>{if(!GQs)return;const yt=y-WH-14,OL='#1e140c';if(y<0)for(let x=xa+20;x<xb;x+=64){logV(x-3,yt+20,y-2,6,'#5a3a1e')}c.fillStyle='#3a2414';c.fillRect(xa,yt,xb-xa,24);for(let r=0;r<3;r++){let x=xa;while(x<xb){const w=RR(30,60),x1=Math.min(xb,x+w);const k=RR(-.08,.08);c.fillStyle=ghShade('#8a6038',k);c.fillRect(x+.6,yt+r*8+.6,x1-x-1.2,6.8);c.fillStyle=ghShade('#8a6038',k+.2);c.fillRect(x+.6,yt+r*8+.6,x1-x-1.2,1.2);c.fillStyle='#2a1a0c';c.fillRect(x1-1,yt+r*8+2,1,4);x=x1}}c.strokeStyle=OL;c.lineWidth=1.4;c.strokeRect(xa,yt,xb-xa,24)};
    if(t===2&&y>0)plk();
    if(t===2){for(let x=xa;x<xb;x+=12){const hh=WH+RR(-3,4);logV(x,y-hh+5,y,12,rn()<.5?'#7a5232':'#6c4829');c.fillStyle='#b58a5a';P([x,y-hh+5,x+6,y-hh-6,x+12,y-hh+5],null);c.fill();c.fillStyle='rgba(255,220,170,.35)';P([x+2,y-hh+4,x+6,y-hh-4,x+6,y-hh+5],null);c.fill();
        c.strokeStyle='rgba(30,16,6,.35)';c.lineWidth=.7;for(let k=0;k<2;k++){const bx=x+RR(2,10);c.beginPath();c.moveTo(bx,y-hh+10);c.lineTo(bx+RR(-1,1),y-hh+RR(20,40));c.stroke()}}
      [y-WH*.38,y-WH*.78].forEach(ry=>{const gr=c.createLinearGradient(0,ry,0,ry+5);gr.addColorStop(0,'#5a4a3a');gr.addColorStop(.5,'#9a8a74');gr.addColorStop(1,'#3a2e22');c.fillStyle=gr;c.fillRect(xa,ry,xb-xa,5);for(let x=xa+6;x<xb;x+=24){c.fillStyle='#c8b896';c.beginPath();c.arc(x,ry+2.5,1.2,0,7);c.fill()}});if(y<0)plk();return}
    if(GQs){const y0=y-WH,OL='#24242a';c.fillStyle='#2b2b30';c.fillRect(xa,y0,xb-xa,WH);
      for(let yy=y0,r=0;yy<y;yy+=15,r++){let x=xa-(r%2?RR(8,20):0);while(x<xb){const w=RR(24,44),x0=Math.max(xa,x)+1,x1=Math.min(xb,x+w)-1,hh=Math.min(15,y-yy)-2;if(x1-x0>4&&hh>3){const k=RR(-.08,.08);c.fillStyle=ghShade(WF,k);c.beginPath();c.roundRect(x0,yy+1,x1-x0,hh,2.5);c.fill();
          c.fillStyle=ghShade(WF,k+.2);c.fillRect(x0+2,yy+2,x1-x0-4,1.4);c.fillStyle=ghShade(WF,k-.28);c.fillRect(x0+2,yy+hh-.6,x1-x0-4,1.4);
          if(yy>y-34&&rn()<.3){c.fillStyle=rn()<.5?'#4a6630':'#5a7a38';for(let q=0;q<4;q++){c.beginPath();c.arc(x0+RR(2,x1-x0-2),yy+hh-RR(0,3),RR(1.2,2.6),0,7);c.fill()}}}x+=w}}
      {const gr=c.createLinearGradient(0,y0,0,y);gr.addColorStop(0,'rgba(255,255,255,.04)');gr.addColorStop(1,'rgba(8,8,12,.32)');c.fillStyle=gr;c.fillRect(xa,y0,xb-xa,WH)}
      /* ทางเดินบนกำแพง */
      c.fillStyle='#2b2722';c.fillRect(xa,y0-24,xb-xa,24);
      {let x=xa;while(x<xb){const w=RR(18,30),x1=Math.min(xb,x+w),k=RR(-.07,.07);c.fillStyle=ghShade('#78726a',k);c.fillRect(x+1,y0-23,x1-x-2,22);c.fillStyle=ghShade('#78726a',k+.15);c.fillRect(x+1,y0-23,x1-x-2,1.4);if(rn()<.12){c.fillStyle=rn()<.5?'#4a6630':'#5a7a38';c.beginPath();c.arc(x+RR(3,w-3),y0-RR(3,20),RR(1.2,2.4),0,7);c.fill()}x=x1}}
      if(y<0){const gs=c.createLinearGradient(0,y0-24,0,y0-11);gs.addColorStop(0,'rgba(0,0,0,.42)');gs.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gs;c.fillRect(xa,y0-24,xb-xa,13)}
      c.strokeStyle=OL;c.lineWidth=1.5;c.strokeRect(xa,y0-24,xb-xa,24);
      const mer=(yt,h)=>{for(let x=xa+5;x<xb-12;x+=24){c.fillStyle=ghShade(WT,RR(-.06,.04));c.beginPath();c.roundRect(x,yt,14,h,2);c.fill();c.fillStyle=ghShade(WT,.2);c.fillRect(x+1.5,yt+1,11,1.6);c.strokeStyle=OL;c.lineWidth=1.3;c.stroke()}};
      if(y<0){c.fillStyle=ghShade(WT,-.14);c.fillRect(xa,y0-31,xb-xa,8);c.strokeStyle=OL;c.lineWidth=1.4;c.strokeRect(xa,y0-31,xb-xa,8);mer(y0-45,15);c.fillStyle=ghShade(WT,.16);c.fillRect(xa,y0-3,xb-xa,3)}
      else{c.fillStyle=ghShade(WT,-.12);c.fillRect(xa,y0-27,xb-xa,4);c.fillStyle=ghShade(WT,-.04);c.fillRect(xa,y0-7,xb-xa,8);c.strokeStyle=OL;c.lineWidth=1.4;c.strokeRect(xa,y0-7,xb-xa,8);mer(y0-19,13)}
      c.strokeStyle=OL;c.lineWidth=1.6;c.beginPath();c.moveTo(xa,y);c.lineTo(xb,y);c.stroke();
      for(let x=xa+70;x<xb-50;x+=170){const bx=x,by=y0+2,bw=26,bh=WH-18;c.fillStyle='#3a2a18';c.fillRect(bx-bw/2-4,by-3,bw+8,4);const gb=c.createLinearGradient(bx-bw/2,0,bx+bw/2,0);gb.addColorStop(0,cD);gb.addColorStop(.45,cL);gb.addColorStop(1,cD);c.fillStyle=gb;
        c.beginPath();c.moveTo(bx-bw/2,by);c.lineTo(bx+bw/2,by);c.lineTo(bx+bw/2,by+bh);c.lineTo(bx,by+bh-8);c.lineTo(bx-bw/2,by+bh);c.closePath();c.fill();c.strokeStyle=OL;c.lineWidth=1.5;c.stroke();c.strokeStyle='#b8873c';c.lineWidth=1;c.beginPath();c.moveTo(bx-bw/2+3,by+3);c.lineTo(bx-bw/2+3,by+bh-4);c.moveTo(bx+bw/2-3,by+3);c.lineTo(bx+bw/2-3,by+bh-4);c.stroke();
        c.font='bold 14px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,bx,by+bh*.42);c.textBaseline='alphabetic'}
      return}
    /* หิน */
    for(let yy=y-WH,r=0;yy<y;yy+=12,r++){let x=xa-(r%2?RR(4,14):0);while(x<xb){const w=RR(16,30),x0=Math.max(xa,x),x1=Math.min(xb,x+w);if(x1-x0>2){const b=ghShade(WF,(rn()-.5)*.18),hh=Math.min(12,y-yy);c.fillStyle=b;c.fillRect(x0,yy,x1-x0,hh);c.fillStyle='rgba(255,255,255,.2)';c.fillRect(x0,yy,x1-x0,1.3);c.fillRect(x0,yy,1.2,hh);c.fillStyle='rgba(20,16,10,.38)';c.fillRect(x0,yy+hh-1.3,x1-x0,1.3);c.fillRect(x1-1.2,yy,1.2,hh);
        if(yy>y-26&&rn()<.25){c.fillStyle='rgba(80,120,50,.35)';c.beginPath();c.ellipse(x0+(x1-x0)/2,yy+hh-2,(x1-x0)/2,3,0,0,7);c.fill()}if(rn()<.06){c.strokeStyle='rgba(20,16,10,.4)';c.lineWidth=.7;c.beginPath();c.moveTo(x0+3,yy+2);c.lineTo(x0+7,yy+6);c.lineTo(x0+5,yy+10);c.stroke()}}x+=w}}
    {const gr=c.createLinearGradient(0,y-WH,0,y);gr.addColorStop(0,'rgba(255,250,235,.10)');gr.addColorStop(1,'rgba(10,8,4,.28)');c.fillStyle=gr;c.fillRect(xa,y-WH,xb-xa,WH)}
    Rc(xa,y-WH-10,xb-xa,10,WT);c.fillStyle='rgba(0,0,0,.18)';c.fillRect(xa,y-WH-2,xb-xa,2);c.fillStyle='rgba(255,255,255,.3)';c.fillRect(xa,y-WH-10,xb-xa,1.4);
    if(t===5){c.fillStyle='#e8c060';c.fillRect(xa,y-WH-1,xb-xa,2.2)}
    for(let x=xa+4;x<xb-10;x+=22){Rc(x,y-WH-19,12,9,ghShade(WT,-.06));Rc(x,y-WH-21,12,3,ghShade(WT,.12));c.fillStyle='rgba(0,0,0,.25)';c.fillRect(x+11,y-WH-19,1.2,9);c.fillStyle='rgba(255,255,255,.28)';c.fillRect(x,y-WH-21,12,1)}
    if(t>=3){for(let x=xa+70;x<xb-50;x+=170){const bx=x,by=y-WH+3,bw=26,bh=WH-14;c.fillStyle='#5a4a3a';c.fillRect(bx-bw/2-3,by-2,bw+6,3);const gb=c.createLinearGradient(bx-bw/2,0,bx+bw/2,0);gb.addColorStop(0,cD);gb.addColorStop(.4,cL);gb.addColorStop(1,cD);c.fillStyle=gb;
        c.beginPath();c.moveTo(bx-bw/2,by);c.lineTo(bx+bw/2,by);c.lineTo(bx+bw/2,by+bh);c.lineTo(bx,by+bh-8);c.lineTo(bx-bw/2,by+bh);c.closePath();c.fill();c.strokeStyle='#e8c060';c.lineWidth=1.4;c.stroke();c.font='bold 14px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,bx,by+bh*.42);c.textBaseline='alphabetic'}}};
  const vWall=(x,ya,yb)=>{if(t===1){for(let y=ya;y<=yb;y+=26){soft(x,y+1,6,2,.25);logV(x-3.5,y-WH,y,7,'#7a5232');c.fillStyle='#c8a070';c.beginPath();c.ellipse(x,y-WH,3.2,1.3,0,0,7);c.fill()}logV(x-2,ya-18,yb-18,4,'#9a6e42');return}
    const tw=t===2?14:22;c.fillStyle='rgba(10,6,4,.22)';c.fillRect(x+(x<0?tw/2:-tw/2-14),ya,14,yb-ya);
    if(t===2){logV(x-tw/2,ya-WH,yb-WH,tw,'#6a4628');for(let y=ya-WH;y<yb-WH;y+=12){const gr=c.createRadialGradient(x-1,y+5,1,x,y+6,6.5);gr.addColorStop(0,'#d2a874');gr.addColorStop(.6,'#a87c4c');gr.addColorStop(1,'#5a3a1e');c.fillStyle=gr;c.beginPath();c.ellipse(x,y+6,tw/2-.5,5.6,0,0,7);c.fill();c.strokeStyle='rgba(90,60,30,.5)';c.lineWidth=.6;c.beginPath();c.ellipse(x,y+6,3,2.4,0,0,7);c.stroke()}logV(x-tw/2,yb-WH,yb,tw,'#6a4628');if(GQs){const y1=ya-68,y2=yb-34;c.fillStyle='#3a2414';c.fillRect(x-15,y1,30,y2-y1);for(let y=y1+1;y<y2-1;y+=8){const k=RR(-.08,.08);c.fillStyle=ghShade('#8a6038',k);c.fillRect(x-14,y,28,6.6);c.fillStyle=ghShade('#8a6038',k+.2);c.fillRect(x-14,y,28,1.1)}c.strokeStyle='#1e140c';c.lineWidth=1.4;c.strokeRect(x-15,y1,30,y2-y1)}return}
    if(GQs){const OL='#24242a',tw2=32,ot=x<0?-1:1,y1=ya-WH-28,y2=yb-WH+6;c.fillStyle='rgba(10,8,8,.26)';c.fillRect(x+(x<0?tw2/2:-tw2/2-16),ya,16,yb-ya);c.fillStyle='#2b2b30';c.fillRect(x-tw2/2,y1,tw2,y2-y1);
      c.fillStyle='#2b2722';c.fillRect(x-tw2/2,y1,tw2,y2-y1);for(let y=y1+1;y<y2-2;y+=RR(16,26)){const k=RR(-.07,.07),hh=Math.min(y2-1-y,24);c.fillStyle=ghShade('#78726a',k);c.fillRect(x-tw2/2+1,y,tw2-2,hh-2);c.fillStyle=ghShade('#78726a',k+.15);c.fillRect(x-tw2/2+1,y,tw2-2,1.3)}
      {const gs=c.createLinearGradient(ot<0?x-tw2/2:x+tw2/2,0,ot<0?x-tw2/2+10:x+tw2/2-10,0);gs.addColorStop(0,'rgba(0,0,0,.38)');gs.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gs;c.fillRect(ot<0?x-tw2/2:x+tw2/2-10,y1,10,y2-y1)}
      c.strokeStyle=OL;c.lineWidth=1.5;c.strokeRect(x-tw2/2,y1,tw2,y2-y1);
      const mx=ot<0?x-tw2/2-3:x+tw2/2-6;c.fillStyle=ghShade(WT,-.14);c.fillRect(ot<0?x-tw2/2-4:x+tw2/2-3,y1,7,y2-y1);c.strokeRect(ot<0?x-tw2/2-4:x+tw2/2-3,y1,7,y2-y1);
      for(let y=y1+4;y<y2-14;y+=24){c.fillStyle=ghShade(WT,.05);c.beginPath();c.roundRect(mx,y,9,13,1.5);c.fill();c.strokeStyle=OL;c.lineWidth=1.1;c.stroke()}return}
    const gr=c.createLinearGradient(x-tw/2,0,x+tw/2,0);gr.addColorStop(0,ghShade(WT,-.15));gr.addColorStop(.5,WT);gr.addColorStop(1,ghShade(WT,-.2));c.fillStyle=gr;c.fillRect(x-tw/2,ya-WH-10,tw,yb-ya);
    for(let y=ya-WH;y<yb-WH-10;y+=14){c.fillStyle='rgba(40,34,26,.25)';c.fillRect(x-tw/2,y,tw,1)}
    for(let y=ya-WH;y<yb-WH-16;y+=22){[x-tw/2-1,x+tw/2-6].forEach(mx=>{Rc(mx,y,7,11,ghShade(WT,.05));c.fillStyle='rgba(0,0,0,.25)';c.fillRect(mx,y+10,7,1.2)})}
    for(let yy=yb-WH-10,r=0;yy<yb;yy+=12,r++){Rc(x-tw/2,yy,tw,Math.min(12,yb-yy),ghShade(WF,(rn()-.5)*.15));c.fillStyle='rgba(0,0,0,.3)';c.fillRect(x-tw/2,yy+11,tw,1)}};
  /* หอไม้ (ขั้น 2) */
  const towerWood=(x,y,w,h)=>add(y,()=>{soft(x,y+3,w*.7,9,.35);[[-1,0],[1,0],[-1,1],[1,1]].forEach(([a,b])=>logV(x+a*w*.38-3.5,y-h+(b?16:0),y-(b?0:6),7,'#6a4628'));c.strokeStyle='#4a3018';c.lineWidth=2.4;c.beginPath();c.moveTo(x-w*.38,y-12);c.lineTo(x+w*.38,y-h*.55);c.moveTo(x+w*.38,y-12);c.lineTo(x-w*.38,y-h*.55);c.stroke();
    const gp=c.createLinearGradient(0,y-h-8,0,y-h+4);gp.addColorStop(0,'#b08250');gp.addColorStop(1,'#6a4626');c.fillStyle=gp;c.fillRect(x-w/2-2,y-h-8,w+4,12);for(let k=0;k<w;k+=7){logV(x-w/2+k,y-h-24,y-h-8,6,'#7a5232');P([x-w/2+k,y-h-24,x-w/2+k+3,y-h-28,x-w/2+k+6,y-h-24],'#a87c4c')}
    const gr=c.createLinearGradient(x-w/2,0,x+w/2,0);gr.addColorStop(0,'#7a5a2e');gr.addColorStop(.5,'#c8a060');gr.addColorStop(1,'#6a4a22');c.fillStyle=gr;P([x-w/2-8,y-h-24,x,y-h-58,x+w/2+8,y-h-24],null);c.fill();c.strokeStyle='rgba(60,40,16,.55)';c.lineWidth=.9;for(let k=1;k<7;k++){c.beginPath();c.moveTo(x-w/2-8+k*(w+16)/7,y-h-24);c.lineTo(x,y-h-58);c.stroke()}
    c.fillStyle='rgba(255,200,120,.65)';c.fillRect(x-4,y-h-20,8,8)});
  /* กำแพงเหนือ + ข้าง (วาดก่อนของทุกชิ้น) */
  hWall(-600,600,-470);vWall(-600,-470,430);vWall(600,-470,430);
  /* บันไดขึ้นกำแพง (ชิดกำแพงเหนือ 2 ฝั่ง) */
  if(GQs&&t>=2){const Ln=ghWL(t).n-15,N=9,OL=t===2?'#1e140c':'#24242a';[-1,1].forEach(sg=>{const x0=sg<0?-408:368,x1=x0+40;add(-392,()=>{soft((x0+x1)/2,-392,30,7,.35);
      const sy=ly=>ly-Math.max(0,(-392-ly)/82*Ln);const top=sy(-474);
      c.fillStyle=t===2?'#3a2414':'#34343a';c.fillRect(x0-4,top,x1-x0+8,-392-top);
      for(let k=N-1;k>=0;k--){const la=-392-k*82/N,lb=-392-(k+1)*82/N,ya2=sy(la),yb2=sy(lb),rz=Ln/N;const tr=t===2?ghShade('#8a6038',(k%2?.06:-.04)):ghShade(WT,(k%2?.04:-.04)),rs=t===2?'#5a3a1e':ghShade(WF,-.18);
        c.fillStyle=rs;c.fillRect(x0,ya2-rz,x1-x0,rz);c.fillStyle=tr;c.fillRect(x0,yb2,x1-x0,ya2-rz-yb2);c.fillStyle='rgba(255,255,255,.18)';c.fillRect(x0,yb2,x1-x0,1.2);c.strokeStyle=OL;c.lineWidth=1.1;c.strokeRect(x0,yb2,x1-x0,ya2-yb2)}
      [x0-4,x1].forEach(rx=>{c.fillStyle=t===2?'#6a4628':ghShade(WT,-.1);c.fillRect(rx,top-6,4,-392-top+6);c.strokeStyle=OL;c.lineWidth=1.2;c.strokeRect(rx,top-6,4,-392-top+6)})})})}
  /* ================= หอคอย/ประตู ================= */
  const TW=(x,by,w)=>GQs?GQ(t===3?'tw3':'tw4',x,by+4,t===3?w*.98:w*.86):SP('f','tower',x,by,w,{sh:.55});
  if(t>=3){const w=t>=4?100:90;TW(-600,-440,w);TW(600,-440,w);TW(-600,456,w);TW(600,456,w);if(t>=4){TW(-600,20,w*.9);TW(600,20,w*.9)}}
  else if(t===2){if(GQs){GQ('tw1',-560,-424,66);GQ('tw1',560,-424,66)}else{towerWood(-560,-430,46,72);towerWood(560,-430,46,72)}}
  /* ประตูใต้ */
  if(GQs){if(t<=2)GQ('gt1',0,446,t===1?286:300);else if(t<=4)GQ('gt3',0,450,t===3?286:300);else GQ('gt5',0,454,332)}
  else{
  if(t===1){add(431,()=>{[-80,80].forEach(px=>{soft(px,433,9,3,.3);logV(px-5,350,432,10,'#7a5232');c.fillStyle='#c8a070';c.beginPath();c.ellipse(px,350,5,2,0,0,7);c.fill()});logV(-90,344,358,180,'#8a6038');const gs=c.createLinearGradient(0,358,0,378);gs.addColorStop(0,'#d8b880');gs.addColorStop(1,'#a8844e');c.fillStyle=gs;c.beginPath();c.roundRect(-52,360,104,20,3);c.fill();c.strokeStyle=O;c.lineWidth=.8;c.stroke();c.strokeStyle='#5a3a1e';c.lineWidth=1;c.beginPath();c.moveTo(-40,358);c.lineTo(-40,346);c.moveTo(40,358);c.lineTo(40,346);c.stroke();
    c.font='bold 13px system-ui';c.textAlign='center';c.fillStyle='#3a2410';c.fillText('บ้านกิลด์',0,375)});SP('c','lantern_post',-104,440,34);SP('c','lantern_post',104,440,34,{fl:1})}
  else if(t===2){towerWood(-96,432,44,84);towerWood(96,432,44,84);add(433,()=>{logV(-76,346,358,152,'#7a5232');const gb=c.createLinearGradient(-14,0,14,0);gb.addColorStop(0,cD);gb.addColorStop(.5,cL);gb.addColorStop(1,cD);c.fillStyle=gb;P([-14,358,14,358,14,392,0,384,-14,392],null);c.fill();c.strokeStyle='#e8c060';c.lineWidth=1.2;c.stroke();c.font='bold 13px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,0,372);c.textBaseline='alphabetic'})}
  else if(t<=4){const w=t>=4?94:86;TW(-110,452,w);TW(110,452,w);add(436,()=>{const y=430-WH;Rc(-74,y-22,148,24,WF);for(let x=-74;x<74;x+=24){c.fillStyle='rgba(255,255,255,.18)';c.fillRect(x,y-22,23,1.2);c.fillStyle='rgba(0,0,0,.3)';c.fillRect(x+23,y-22,1,24)}
      c.beginPath();c.moveTo(-68,y+4);c.quadraticCurveTo(0,y-26,68,y+4);c.lineWidth=5;c.strokeStyle=ghShade(WF,-.35);c.stroke();Rc(-78,y-30,156,8,WT);for(let x=-76;x<72;x+=18)Rc(x,y-38,11,8,WT);
      if(t>=4){c.strokeStyle='#4a4a52';c.lineWidth=2.2;for(let x=-60;x<=60;x+=12){c.beginPath();c.moveTo(x,y-8);c.lineTo(x,y+12);c.stroke()}}
      const gb=c.createLinearGradient(-16,0,16,0);gb.addColorStop(0,cD);gb.addColorStop(.5,cL);gb.addColorStop(1,cD);c.fillStyle=gb;P([-16,y-20,16,y-20,16,y+16,0,y+8,-16,y+16],null);c.fill();c.strokeStyle='#e8c060';c.lineWidth=1.3;c.stroke();c.font='bold 13px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(em,0,y-3);c.textBaseline='alphabetic'})}
  else SP('f','sgate',0,458,268,{sh:.5});
  }
  /* ================= อาคารหลัก ================= */
  if(GQI.ok===1&&GQI.img){if(t===1){GQ(1,0,-292,290);SP('c','family_tent',-238,-316,118);SP('c','family_tent',238,-316,118,{fl:1});SP('c','lantern_post',-168,-262,32);SP('c','lantern_post',168,-262,32,{fl:1})}
    else if(t===2){GQ(2,0,-290,262);SP('c','barrels',-170,-288,42);SP('c','crates',172,-290,46);SP('c','firewood',-205,-300,56)}
    else if(t===3)GQ(3,0,-290,372);else if(t===4)GQ(4,0,-288,300);else GQ(5,0,-286,470)}
  else if(t===1){SP('c','command_tent',0,-296,260);SP('c','family_tent',-205,-312,128);SP('c','family_tent',205,-312,128,{fl:1});SP('c','crates',-122,-292,52);SP('c','barrels',128,-288,44);SP('c','lantern_post',-150,-262,32);SP('c','lantern_post',150,-262,32,{fl:1})}
  else if(t===2){SP('f','inn',0,-294,300);TW(-205,-292,64);TW(205,-292,64);SP('c','barrels',-140,-288,42);SP('c','crates',146,-290,46)}
  else if(t===3){SP('f','barracks',0,-294,372);TW(-232,-290,82);TW(232,-290,82);SP('a','star_banner',-150,-286,22);SP('a','star_banner',150,-286,22)}
  else if(t===4){SP('b','palace',0,-292,336,{sh:.5});TW(-215,-288,88);TW(215,-288,88)}
  else{SP('b','palace',0,-290,446,{sh:.5});SP('a','star_banner',-250,-292,30);SP('a','star_banner',250,-292,30);SP('f','tower',-292,-300,80);SP('f','tower',292,-300,80)}
  /* ================= คลัง / โกดัง / ครัว / ค่ายทหาร / กระดาน ================= */
  if(GQI.ok===1&&GQI.img){const lo=t<=2;
    if(lo){GQ('tr1',-430,-146,190);SP('c','crates',-316,-148,50)}else GQ('tr3',-430,-144,200);
    if(lo){GQ('st1',470,100,190);SP('c','grain_sacks',360,104,42)}else{GQ('st3',470,100,185);SP(t>=4?'a':'c','barrels',368,104,t>=4?46:40);SP(t>=4?'a':'c','crates',572,104,t>=4?52:44)}
    if(lo){GQ('ki1',470,340,175);SP('c','firewood',552,352,58);SP('c','barrels',388,350,38);GHS.ks=[467,262]}else{GQ('ki3',470,340,195);SP(t>=4?'a':'c','barrels',576,348,t>=4?44:38);GHS.ks=[515,172]}
    if(lo)GQ('ba1',-450,240,210);else GQ('ba3',-450,238,250)}
  else{
  if(t===1){SP('c','supply_cart',-450,-150,150);SP('c','crates',-360,-150,52)}
  else if(t===2){SP('c','supply_cart',-470,-150,140);SP('c','crates',-370,-152,58);SP('c','barrels',-332,-146,40)}
  else SP('b','rare_shop',-430,-148,t>=5?206:192,{sh:.5});
  if(t<=2){SP('c','supply_shelter',470,100,176);SP('c','grain_sacks',372,104,42)}else{SP('f','inn',470,100,178);SP(t>=4?'a':'c',t>=4?'barrels':'barrels',378,104,t>=4?46:40);SP(t>=4?'a':'c','crates',560,104,t>=4?52:44)}
  if(t===1){SP('c','cooking_pot',470,330,62);SP('c','log_bench',400,300,62);SP('c','log_bench',540,300,62,{fl:1});SP('c','firewood',545,346,64);SP('c','barrels',394,346,38)}
  else if(t===2){SP('f','mkt_t',486,340,160)}
  else{SP('f','inn',476,340,184,{flt:'hue-rotate(150deg) saturate(1.15)'});SP(t>=4?'a':'c','barrels',560,346,t>=4?44:38)}
  if(t>=2){SP('c','cooking_pot',402,354,58);SP('c','firewood',372,372,46)}
  if(t<=2){SP('f','tent_t',-512,240,124);SP('f','tent_p',-390,240,124,{fl:1})}else if(t===3)SP('f','store',-450,244,196);else SP('f','barracks',-450,246,214);
  }
  SP('c','training_dummy',-470,300,38);SP('c','training_dummy',-410,316,38);if(t>=2)SP('f','targets',-548,360,104);
  add(302,()=>{soft(-340,302,22,5,.3);for(let k=0;k<4;k++){logV(-354+k*9,262,300,2.6,'#c8ccd0')}logV(-362,296,300,46,'#6a4628');logV(-362,268,272,46,'#6a4628')});
  SP(t>=3&&!GQs?'a':'c','noticeboard',GHBD.x,GHBD.y,t>=3&&!GQs?86:76);
  /* ลานกลาง */
  if(GQs){if(t<=2){add(64,()=>{soft(0,50,58,16,.35);const st=[];for(let i=0;i<12;i++){const a=i/12*6.283;st.push([Math.cos(a)*36,48+Math.sin(a)*19,a])}
        st.filter(q=>Math.sin(q[2])<0).forEach(([x,y])=>gqPeb(x,y,7,true));c.fillStyle='#2a1e14';c.beginPath();c.ellipse(0,48,30,15,0,0,7);c.fill();c.fillStyle='rgba(255,120,40,.35)';c.beginPath();c.ellipse(0,48,22,10,0,0,7);c.fill();
        [[-20,52,18,40,-.5],[-16,40,20,36,.45],[2,56,0,36,0]].forEach(([ax,ay,bx,by2])=>{c.lineCap='round';c.strokeStyle='#1e140c';c.lineWidth=9;c.beginPath();c.moveTo(ax,ay);c.lineTo(bx,by2);c.stroke();c.strokeStyle='#6a4426';c.lineWidth=6.5;c.stroke();c.strokeStyle='#8e623a';c.lineWidth=2;c.beginPath();c.moveTo(ax,ay-1.5);c.lineTo(bx,by2-1.5);c.stroke()});
        st.filter(q=>Math.sin(q[2])>=0).forEach(([x,y])=>gqPeb(x,y,7.5,true))});SP('c','log_bench',-92,82,64);SP('c','log_bench',92,82,64,{fl:1});SP('c','log_bench',0,-12,64)}
      else add(t===3?110:120,()=>{const cy=t===3?62:66,rx=t===3?84:100,ry=t===3?42:50;soft(0,cy+ry*.6,rx+14,ry*.5,.4);
        const ring=(rx2,ry2,n,hh,front)=>{for(let i=0;i<n;i++){const a0=i/n*6.283,a1=(i+1)/n*6.283,am=(a0+a1)/2;if((Math.sin(am)>0)!==front)continue;const p=[[Math.cos(a0)*rx2,cy+Math.sin(a0)*ry2],[Math.cos(a1)*rx2,cy+Math.sin(a1)*ry2]];const k=RR(-.08,.08);
          c.fillStyle=ghShade('#5f666e',k+(front?-.12:.05));c.beginPath();c.moveTo(p[0][0],p[0][1]);c.lineTo(p[1][0],p[1][1]);c.lineTo(p[1][0],p[1][1]-hh);c.lineTo(p[0][0],p[0][1]-hh);c.closePath();c.fill();c.strokeStyle='#24242a';c.lineWidth=1.2;c.stroke();
          c.fillStyle=ghShade('#79818a',k);c.beginPath();c.moveTo(p[0][0],p[0][1]-hh);c.lineTo(p[1][0],p[1][1]-hh);c.lineTo(p[1][0]*.88,cy+(p[1][1]-cy)*.86-hh);c.lineTo(p[0][0]*.88,cy+(p[0][1]-cy)*.86-hh);c.closePath();c.fill();c.stroke()}};
        ring(rx,ry,22,16,false);
        const wg=c.createRadialGradient(-rx*.2,cy-24,4,0,cy-16,rx);wg.addColorStop(0,'#5fb4c4');wg.addColorStop(.6,'#2f7486');wg.addColorStop(1,'#1c4552');c.fillStyle=wg;c.beginPath();c.ellipse(0,cy-16,rx*.86,ry*.84,0,0,7);c.fill();
        c.strokeStyle='rgba(220,250,255,.45)';c.lineWidth=1.2;for(let k=0;k<5;k++){c.beginPath();c.ellipse(RR(-rx*.4,rx*.4),cy-16+RR(-ry*.35,ry*.35),RR(8,18),RR(2,4),0,0,Math.PI);c.stroke()}
        if(t>=4){const ph=t===5?92:78;c.fillStyle='#26262a';c.beginPath();c.ellipse(0,cy-14,17,8,0,0,7);c.fill();const pg=c.createLinearGradient(-11,0,11,0);pg.addColorStop(0,'#4f565e');pg.addColorStop(.45,'#8a929a');pg.addColorStop(1,'#454b52');c.fillStyle=pg;c.fillRect(-11,cy-16-ph,22,ph);c.strokeStyle='#24242a';c.lineWidth=1.4;c.strokeRect(-11,cy-16-ph,22,ph);
          c.fillStyle='#8a5e26';c.fillRect(-13,cy-16-ph*.55,26,6);c.strokeRect(-13,cy-16-ph*.55,26,6);
          const by2=cy-16-ph;c.fillStyle='#8a5e26';c.beginPath();c.ellipse(0,by2,34,12,0,0,7);c.fill();c.stroke();c.fillStyle='#3a8a9a';c.beginPath();c.ellipse(0,by2-2,27,8,0,0,7);c.fill();c.fillStyle='#c89a4c';c.beginPath();c.ellipse(0,by2+3,34,4,0,0,Math.PI);c.fill();
          c.strokeStyle='rgba(180,230,245,.75)';c.lineWidth=2;[[-28,1],[28,-1],[-14,.6],[14,-.6]].forEach(([dx,sg])=>{c.beginPath();c.moveTo(dx,by2+6);c.quadraticCurveTo(dx*1.25,by2+20,dx*1.4,cy-18);c.stroke()});
          if(t===5){c.fillStyle='#8a5e26';c.beginPath();c.moveTo(-6,by2-6);c.lineTo(0,by2-26);c.lineTo(6,by2-6);c.closePath();c.fill();c.stroke()}}
        else{c.fillStyle='#24242a';c.beginPath();c.ellipse(0,cy-20,14,6,0,0,7);c.fill();c.fillStyle='#6c737b';c.beginPath();c.ellipse(0,cy-22,12,5,0,0,7);c.fill();c.strokeStyle='rgba(200,240,250,.8)';c.lineWidth=2;c.beginPath();c.moveTo(0,cy-24);c.quadraticCurveTo(-2,cy-40,0,cy-46);c.stroke()}
        ring(rx,ry,22,16,true);c.strokeStyle='#8a5e26';c.lineWidth=2.4;c.beginPath();c.ellipse(0,cy-16,rx*.94,ry*.92,0,0,Math.PI);c.stroke()})}
  else if(t<=2)SP('f','campfire',0,62,124,{sh:0});else if(t===3)SP('f','pool',0,134,246,{sh:0});else SP('a','crystal_fountain',0,128,232,{sh:.5});
  /* โคมทางเดิน */
  GHLP(t).forEach(([x,y],i)=>{if(t<=2||GQs)SP('c','lantern_post',x,y+2,34,{fl:x>0,sh:.3});else SP('a','lantern',x,y+2,24,{sh:.3})});
  /* ของตกแต่ง */
  const dec=[[-300,-100,'barrels',44],[-262,-92,'grain_sacks',42],[300,336,'crates',54],[556,252,'chopping_stump',30]];
  dec.forEach(([x,y,id,w])=>{if(t>=4&&!GQs&&(id==='barrels'||id==='crates'))SP('a',id,x,y,w*1.2);else if(id==='chopping_stump'&&t>=3)return;else SP('c',id,x,y,w)});
  if(t>=3){if(GQs){SP('c','log_bench',-175,124,62);SP('c','log_bench',175,124,62,{fl:1})}else{SP('a','bench',-175,124,64);SP('a','bench',175,124,64,{fl:1})}}
  if(t>=4&&!GQs){SP('a',t>=5?'pink_tree':'evergreen_tree',-232,160,t>=5?84:70);SP('a',t>=5?'pink_tree':'evergreen_tree',232,160,t>=5?84:70,{fl:1})}
  if(t>=5&&!GQs){SP('a','gryphon_statue',-150,330,58);SP('a','gryphon_statue',150,330,58,{fl:1});SP('a','star_banner',-150,26,24);SP('a','star_banner',150,26,24)}
  if(t===2)SP('c','well',300,336,64);
  /* มุมต่าง ๆ ให้มีชีวิต */
  if(t<=2){SP('c','firewood',-520,-392,64);SP('c','chopping_stump',-470,-386,30);SP('c','barrels',520,-392,44);SP('c','crates',474,-394,48);SP('c','grain_sacks',-546,-300,40);SP('c','crates',-300,404,46);SP('c','barrels',-262,408,38);
    SP('c','log_bench',-150,262,58);SP('c','log_bench',150,262,58,{fl:1});SP('c','grain_sacks',300,400,40);SP('c','lantern_post',-560,-330,32,{sh:.3});SP('c','lantern_post',560,-330,32,{fl:1,sh:.3})}
  else if(GQs){SP('c','barrels',-520,-394,46);SP('c','crates',-470,-396,50);SP('c','crates',520,-394,50);SP('c','barrels',-300,404,42);SP('c','firewood',-546,-300,56);SP('c','lantern_post',-560,180,32,{sh:.3});SP('c','lantern_post',560,180,32,{fl:1,sh:.3});SP('c','log_bench',-150,262,58);SP('c','log_bench',150,262,58,{fl:1})}
  else{const D=t>=4?'a':'c';SP(D,'barrels',-520,-394,t>=4?50:44);SP(D,'crates',-470,-396,t>=4?56:48);SP(D,'crates',520,-394,t>=4?56:48);SP(D,'barrels',-300,404,t>=4?48:40);SP('a','star_banner',-560,-330,22);SP('a','star_banner',560,-330,22);SP('a','lantern',-560,180,22,{sh:.3});SP('a','lantern',560,180,22,{sh:.3});
    if(t>=4){SP('a','bench',-150,262,60);SP('a','bench',150,262,60,{fl:1})}}
  /* สวนผลไม้ (พื้นใต้ต้น) */
  if(t<3){[[-540,76],[-460,76]].forEach(([a,b])=>add(b,()=>{soft(a,b+2,22,6,.3);const gr=c.createRadialGradient(a-3,b-1,1,a,b,12);gr.addColorStop(0,'#c8a070');gr.addColorStop(1,'#6a4626');c.fillStyle=gr;c.beginPath();c.ellipse(a,b,12,6,0,0,7);c.fill()}))}else{const nt=[0,0,0,2,4,6][t];for(let i=0;i<nt;i++){const[a,b]=GHTP[i];E(a,b+2,28,10,'rgba(70,50,26,.35)')}}
  /* ===== วาดของตามลำดับความลึก: ก่อนกำแพงใต้ → กำแพงใต้ → หลังกำแพง ===== */
  L.sort((a,b)=>a[0]-b[0]);L.filter(q=>q[0]<430).forEach(q=>q[1]());
  hWall(-600,-74,430);hWall(74,600,430);
  L.filter(q=>q[0]>=430).forEach(q=>q[1]());
  return{cv,S,X0,Y0,WD,HT}}
/* ---------- ต่อเข้าระบบเดิม ---------- */
ghBuild=(f=>function(t,col,em){GHS.hd=0;try{if(ghHDok()){const r=ghBuildHD(t,col,em);GHS.hd=1;try{const w=[0,140,150,186,170,226][t];GHR[0][0]=-Math.max(185,w);GHR[0][2]=Math.max(185,w)}catch(e){}return r}}catch(e){console.warn('ghHD',e)}try{GHR[0][0]=-185;GHR[0][2]=185}catch(e){}return f.apply(this,arguments)})(ghBuild);
ghCols=(f=>function(){const L=f.apply(this,arguments);try{if(GHS.hd){const t=ghT();if(L[0])L[0][2]=t>=4?100:t===3?104:52;GHDEC(t).forEach(d=>L.push(d))}}catch(e){}return L})(ghCols);
/* วาดสด: แสงโคม/กองไฟ/น้ำพุแบบ HD */
function ghLiveHD(t,now){if(!GHS.hd)return;const X=1600,Y=1600;g.save();g.globalCompositeOperation='lighter';
  GHLP(t).forEach(([x,y],i)=>{const lp=t<=2||GHS.gq,hx=X+x+(lp?(x>0?-8:8):0),hy=Y+y+(lp?-40:-62);if(!inView(hx,hy,60))return;glowAt(hx,hy,34,'255,180,90',.42+.1*Math.sin(now*7+i))});
  if(t<=2){glowAt(X,Y+40,72,'255,140,60',.5+.15*Math.sin(now*9));for(let k=0;k<6;k++){const q=(now*1.3+k/6)%1;g.fillStyle='rgba(255,'+(160+k*12)+',60,'+(.8*(1-q))+')';g.beginPath();g.arc(X+Math.sin(now*3+k*2)*10,Y+30-q*50,2*(1-q)+.6,0,7);g.fill()}}
  else{const fy=GHS.gq?(t===3?46:t===4?-28:-42):(t===3?30:-10),fr=GHS.gq?(t===3?30:36):60;for(let k=0;k<12;k++){const q=(now*.8+k/12)%1,a=k/12*6.283;g.fillStyle='rgba(200,240,255,'+(.7*(1-q))+')';g.beginPath();g.arc(X+Math.cos(a)*q*fr,Y+fy-q*(GHS.gq?-30:20)+Math.sin(a)*q*fr*.36,1.8,0,7);g.fill()}glowAt(X,Y+(GHS.gq?fy:(t===3?30:-20)),GHS.gq?50:70,'140,220,255',GHS.gq?.16:.25)}
  if(t>=3){[[-430,-160],[470,90]].forEach(([x,y],i)=>glowAt(X+x,Y+y-40,40,'255,200,120',.18+.06*Math.sin(now*2+i)))}
  g.restore();if(inView(X+GHBD.x,Y+GHBD.y-90,80)){g.font='bold 10px system-ui';g.textAlign='center';g.fillStyle='#ffe0a0';g.fillText('📜 กระดานกิลด์',X+GHBD.x,Y+GHBD.y-(t>=3?92:90))}}
ghDraw2=(f=>function(t,col,now){try{ghLiveHD(t,now)}catch(e){}return f.apply(this,arguments)})(ghDraw2);
/* โหลดภาพเมื่อเข้าบ้าน */
ghEnter=(f=>function(){ghHDload();return f.apply(this,arguments)})(ghEnter);
setInterval(()=>{try{if(ghHere()&&!ghHDok())ghHDload()}catch(e){}},2000);

/* ภาพตึกกิลด์โหลดเสร็จทีหลัง → สร้างแคชใหม่ */
setInterval(()=>{try{if(ghHere()&&GHS.hd&&GQI.ok===1&&!GHS.gq)GHS.C=null}catch(e){}},700);
