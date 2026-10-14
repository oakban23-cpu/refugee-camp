/* ---------- v383 ยกระดับภาพ 4 แมพที่ยังโล่ง ----------
   11 ดินแดนหลังรอยแยก (void) · 20 บึงหมอกม่วง (bog) · 22 ห้วงบัลลังก์เงา (throne) · 26 แกนพิภพ (core)
   ปัญหาเดิม: สีเดียวทั้งจอ (ม่วง/ส้ม) ค่าความสว่างต่างกันน้อย หมอกหนาจนแบน ไม่มีจุดสังเกต
   แก้: ลดหมอก · ลายพื้นชั้นใหม่ที่ตัดแสง-เงาชัด (อบลงชิ้นพื้น ไม่กินเฟรม) · ของประกอบฉากชิ้นใหญ่เป็นจุดสังเกตเฉพาะแต่ละแมพ
   void = หินลอยแตกเป็นแผ่น + รอยแยกเห็นดาว + เสาหินรูนฟ้า/ซุ้มประตูพัง/ผลึกฟ้าชมพู (แยกจาก throne ที่โทนม่วง-ทอง)
   throne = พื้นหินอ่อนดำขลิบทอง + วงเวท + เสาหัก/รูปปั้นอัศวินคุกเข่า/กระถางไฟม่วง/ธงขาด
   bog = ทางเดินไม้ + แอ่งโคลน + ต้นไม้ตายมอสย้อย/เสาตะเกียงวิญญาณ/เห็ดเรืองแสง
   core = แผ่นหินบะซอลต์หกเหลี่ยมรอยต่อเรือง + รอยแตกลาวา + เสาบะซอลต์/โพรงผลึก/ปล่องแมกมา/เศษหินออบซิเดียน */
Object.assign(DEPS.void,{fa:.13});Object.assign(DEPS.bog,{fa:.11});Object.assign(DEPS.throne,{fa:.13});Object.assign(DEPS.core,{fa:.15});
const U13M={11:'void',20:'bog',22:'throne',26:'core'};
function u13Ok(F,x,y,m){const M=MAPS[curMap];if(x<230||x>2970||y<230||y>2970||depAvoid(x,y,m+40))return false;if(Math.hypot(x-M.boss.x,y-M.boss.y)<300+m)return false;
  if((M.nests||[]).some(([nx,ny])=>Math.hypot(x-nx,y-ny)<150+m))return false;if(M.npc&&Math.hypot(x-M.npc.x,y-M.npc.y)<140+m)return false;
  for(const f of F.L){if(f.u13)continue;if(f.pts){if(p7gSeg(x,y,[f.pts])<(f.w||60)*.5+36+m)return false}else if(f.r&&Math.hypot(x-f.x,y-f.y)<f.r+24+m)return false}return true}
/* ---- ลายพื้น (เพิ่มเข้า depBuild) ---- */
{const o=depBuild;depBuild=function(){const F=o.apply(this,arguments),th=U13M[curMap];if(!th||F.u13===curMap||isDg())return F;F.u13=curMap;const R=depRng(curMap*977+13);
  const add=(f)=>{f.u13=1;f.bb=f.bb||depBB(f.pts||[[f.x,f.y]],(f.r||f.w||80)+60);F.L.push(f);return f};
  const many=(n,m,fn)=>{for(let i=0,k=0;i<n*40&&k<n;i++){const x=260+R()*2680,y=260+R()*2680;if(!u13Ok(F,x,y,m))continue;fn(x,y,k);k++}};
  if(th==='void'){many(46,70,(x,y,k)=>add({k:'u13slab',x,y,r:110+R()*70,s:k}));many(16,100,(x,y,k)=>{const a=R()*6.28,L=180+R()*140,pts=[];for(let i=0;i<=8;i++){const u=i/8;pts.push([x+Math.cos(a)*L*(u-.5)+(R()-.5)*26,y+Math.sin(a)*L*(u-.5)*.7+(R()-.5)*20])}add({k:'u13rift',pts,w:30,s:k})})}
  if(th==='throne'){many(42,90,(x,y,k)=>add({k:'u13marble',x,y,r:130+R()*70,s:k}));many(10,130,(x,y,k)=>add({k:'u13sigil',x,y,r:95+R()*30,s:k}))}
  if(th==='bog'){many(36,60,(x,y,k)=>add({k:'u13mud',x,y,r:80+R()*70,s:k}));many(14,80,(x,y,k)=>{const a=R()*6.28,L=200+R()*160,pts=[];for(let i=0;i<=6;i++){const u=i/6;pts.push([x+Math.cos(a)*L*(u-.5)+Math.sin(u*5+k)*18,y+Math.sin(a)*L*(u-.5)*.75])}add({k:'u13walk',pts,w:34,s:k})})}
  if(th==='core'){many(44,70,(x,y,k)=>add({k:'u13hex',x,y,r:120+R()*60,s:k}));many(28,60,(x,y,k)=>add({k:'u13crack',x,y,r:90+R()*60,s:k}))}
  return F}}
{const o=depPaintF;depPaintF=function(c,f,th){if(!f.u13)return o.apply(this,arguments);const R=depRng((f.x|0)*7+(f.y|0)*13+(f.s|0)*31+(f.pts?f.pts.length*97:0));
  const poly=(pts,fill,st,lw)=>{c.beginPath();pts.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(st){c.strokeStyle=st;c.lineWidth=lw||1;c.stroke()}};
  const blob=(x,y,r,n,sq,j)=>{const P=[];for(let k=0;k<n;k++){const a=k/n*6.283+(R()-.5)*j,rr=r*(.72+R()*.4);P.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr*sq])}return P};
  if(f.k==='u13slab'){/* หินลอยแตกเป็นแผ่น: ขอบมืดลึก + ผิวบนสว่าง + รูนฟ้าบางแผ่น */const n=5+((R()*4)|0);for(let i=0;i<n;i++){const a=R()*6.283,d=R()*f.r*.7,x=f.x+Math.cos(a)*d,y=f.y+Math.sin(a)*d*.62,r=22+R()*30,P=blob(x,y,r,6,.62,.6);
      poly(P.map(([a,b])=>[a+2,b+7]),'rgba(6,2,16,.55)');poly(P,R()<.5?'#4a3c66':'#5a4a7c','rgba(14,8,30,.8)',1.2);poly(P.map(([a,b])=>[x+(a-x)*.82,y+(b-y)*.82-2]),R()<.5?'rgba(150,130,200,.28)':'rgba(120,104,170,.22)');
      if(R()<.45){c.strokeStyle='rgba(120,230,255,.55)';c.lineWidth=1.4;c.beginPath();c.moveTo(x-r*.4,y);c.lineTo(x,y-r*.22);c.lineTo(x+r*.35,y+r*.05);c.stroke();c.fillStyle='rgba(160,240,255,.6)';c.beginPath();c.arc(x,y-r*.22,1.8,0,7);c.fill()}}}
  else if(f.k==='u13rift'){/* รอยแยกเห็นดาว */const P=f.pts,up=[],dn=[];P.forEach(([x,y],i)=>{const w=Math.sin(i/(P.length-1)*Math.PI)*(10+R()*8);up.push([x,y-w]);dn.push([x,y+w*.8])});const poly2=up.concat(dn.reverse());
    poly(poly2.map(([a,b])=>[a,b+4]),'rgba(0,0,0,.35)');poly(poly2,'#07040f');c.save();poly(poly2);c.clip();for(let i=0;i<60;i++){const q=P[(R()*P.length)|0];c.fillStyle='rgba(255,255,255,'+(.35+R()*.6)+')';c.beginPath();c.arc(q[0]+(R()-.5)*30,q[1]+(R()-.5)*18,.6+R()*1.3,0,7);c.fill()}
    const gr=c.createLinearGradient(P[0][0],P[0][1],P[P.length-1][0],P[P.length-1][1]);gr.addColorStop(0,'rgba(90,40,160,.0)');gr.addColorStop(.5,'rgba(120,70,220,.45)');gr.addColorStop(1,'rgba(90,40,160,0)');c.fillStyle=gr;c.fillRect(f.bb[0],f.bb[1],f.bb[2]-f.bb[0],f.bb[3]-f.bb[1]);c.restore();
    c.strokeStyle='rgba(130,235,255,.75)';c.lineWidth=1.6;c.beginPath();up.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.stroke();c.strokeStyle='rgba(255,120,220,.5)';c.lineWidth=1.1;c.beginPath();P.forEach((p,i)=>{const q=poly2[poly2.length-1-i];i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1])});c.stroke()}
  else if(f.k==='u13marble'){/* พื้นหินอ่อนดำขลิบทอง (แผ่นสี่เหลี่ยมหมุนเล็กน้อย) */const S=44,rot=(R()-.5)*.3,cs=Math.cos(rot),sn=Math.sin(rot),n=Math.ceil(f.r/S)+1;
    for(let i=-n;i<=n;i++)for(let j=-n;j<=n;j++){const lx=i*S,ly=j*S*.62,x=f.x+lx*cs-ly*sn,y=f.y+lx*sn+ly*cs,d=Math.hypot((x-f.x),(y-f.y)/.62);if(d>f.r*(.75+R()*.35)||R()<.08)continue;
      const P=[[-S/2,-S*.31],[S/2,-S*.31],[S/2,S*.31],[-S/2,S*.31]].map(([a,b])=>[x+a*cs-b*sn,y+a*sn+b*cs]),dk=(i+j)&1;poly(P,dk?'#231c30':'#30283f','rgba(6,4,12,.9)',1.2);
      c.strokeStyle='rgba(255,210,120,'+(.18+R()*.14)+')';c.lineWidth=.8;poly(P.map(([a,b])=>[x+(a-x)*.8,y+(b-y)*.8]),null,c.strokeStyle,.8);
      if(R()<.35){c.strokeStyle='rgba(180,160,220,.25)';c.lineWidth=.8;c.beginPath();c.moveTo(P[0][0]+(P[1][0]-P[0][0])*R(),P[0][1]+(P[1][1]-P[0][1])*R());c.lineTo(x+(R()-.5)*10,y+(R()-.5)*6);c.lineTo(P[2][0]+(P[3][0]-P[2][0])*R(),P[2][1]+(P[3][1]-P[2][1])*R());c.stroke()}
      if(R()<.12){c.fillStyle='rgba(255,215,120,.5)';c.beginPath();c.arc(x,y,2,0,7);c.fill()}}}
  else if(f.k==='u13sigil'){const x=f.x,y=f.y,r=f.r;c.save();c.translate(x,y);c.scale(1,.62);c.strokeStyle='rgba(255,205,110,.42)';c.lineWidth=2;c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.lineWidth=1;c.beginPath();c.arc(0,0,r*.82,0,7);c.stroke();
    c.strokeStyle='rgba(200,140,255,.4)';c.beginPath();for(let k=0;k<6;k++){const a=k/6*6.283;c.moveTo(Math.cos(a)*r*.82,Math.sin(a)*r*.82);c.lineTo(Math.cos(a+2.094)*r*.82,Math.sin(a+2.094)*r*.82)}c.stroke();
    c.fillStyle='rgba(255,215,130,.5)';c.font='bold 13px system-ui';c.textAlign='center';c.textBaseline='middle';for(let k=0;k<12;k++){const a=k/12*6.283;c.fillText('ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ'[k],Math.cos(a)*r*.91,Math.sin(a)*r*.91)}c.restore()}
  else if(f.k==='u13mud'){const P=blob(f.x,f.y,f.r,9,.6,.4);poly(P,'rgba(26,16,30,.55)');poly(P.map(([a,b])=>[f.x+(a-f.x)*.78,f.y+(b-f.y)*.78]),'rgba(40,26,44,.55)');
    for(let i=0;i<5;i++){const a=R()*6.283,d=R()*f.r*.5,x=f.x+Math.cos(a)*d,y=f.y+Math.sin(a)*d*.6,r=8+R()*14;c.fillStyle='rgba(120,150,170,.28)';c.beginPath();c.ellipse(x,y,r,r*.45,0,0,7);c.fill();c.strokeStyle='rgba(200,220,240,.25)';c.lineWidth=.8;c.beginPath();c.ellipse(x-r*.2,y-r*.1,r*.5,r*.18,0,Math.PI*1.1,Math.PI*1.9);c.stroke()}
    c.strokeStyle='rgba(10,6,14,.35)';c.lineWidth=1;for(let i=0;i<6;i++){const a=R()*6.283,d=f.r*(.3+R()*.5);c.beginPath();c.ellipse(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d*.6,4+R()*4,2,0,0,7);c.stroke()}}
  else if(f.k==='u13walk'){/* ทางเดินไม้ผุบนบึง */const P=f.pts;for(let i=0;i<P.length-1;i++){const[a0,b0]=P[i],[a1,b1]=P[i+1],L=Math.hypot(a1-a0,b1-b0),ux=(a1-a0)/L,uy=(b1-b0)/L,nx=-uy,ny=ux;
      for(let s=0;s<L;s+=11){if(R()<.06)continue;const x=a0+ux*s,y=b0+uy*s,w=f.w*(.42+R()*.1),jit=(R()-.5)*.12;const Q=[[x+nx*w-ux*4,y+ny*w*.8-uy*4],[x+nx*w+ux*4,y+ny*w*.8+uy*4],[x-nx*w+ux*4+jit*20,y-ny*w*.8+uy*4],[x-nx*w-ux*4+jit*20,y-ny*w*.8-uy*4]];
        poly(Q.map(([p,q])=>[p+1,q+3]),'rgba(0,0,0,.3)');poly(Q,['#5a4030','#6a4a34','#4e3828'][(R()*3)|0],'rgba(20,12,6,.8)',.8)}
      [-1,1].forEach(sd=>{c.strokeStyle='rgba(40,26,16,.85)';c.lineWidth=2.4;c.beginPath();c.moveTo(a0+nx*f.w*.36*sd,b0+ny*f.w*.3*sd);c.lineTo(a1+nx*f.w*.36*sd,b1+ny*f.w*.3*sd);c.stroke()})}}
  else if(f.k==='u13hex'){/* แผ่นบะซอลต์หกเหลี่ยม รอยต่อเรือง */const S=26,n=Math.ceil(f.r/S)+1;for(let i=-n;i<=n;i++)for(let j=-n;j<=n;j++){const x=f.x+i*S*1.5,y=f.y+(j*S*1.732+(i&1?S*.866:0))*.62,d=Math.hypot(x-f.x,(y-f.y)/.62);if(d>f.r*(.7+R()*.35))continue;
      const P=[];for(let k=0;k<6;k++){const a=k/6*6.283;P.push([x+Math.cos(a)*S*.96,y+Math.sin(a)*S*.96*.62])}c.fillStyle='rgba(255,120,40,'+(.25+R()*.3)+')';poly(P.map(([a,b])=>[x+(a-x)*1.04,y+(b-y)*1.04]),c.fillStyle);
      const v=R();poly(P,v<.33?'#2a1a16':v<.66?'#34221c':'#3e2a20','rgba(10,4,2,.7)',.8);poly(P.map(([a,b])=>[x+(a-x)*.7,y+(b-y)*.7-1.5]),'rgba(255,190,140,.07)')}}
  else if(f.k==='u13crack'){/* รอยแตกลาวาแตกกิ่ง */const br=(x,y,a,L,w,dep)=>{let px=x,py=y;const pts=[[x,y]];for(let k=0;k<5;k++){a+=(R()-.5)*.8;px+=Math.cos(a)*L/5;py+=Math.sin(a)*L/5*.62;pts.push([px,py])}
      c.strokeStyle='rgba(20,6,2,.85)';c.lineWidth=w+3;c.lineCap='round';c.beginPath();pts.forEach(([a2,b2],i)=>i?c.lineTo(a2,b2):c.moveTo(a2,b2));c.stroke();c.strokeStyle='rgba(255,110,30,.85)';c.lineWidth=w;c.stroke();c.strokeStyle='rgba(255,230,140,.85)';c.lineWidth=Math.max(.6,w*.35);c.stroke();c.lineCap='butt';
      if(dep<2)for(let k=0;k<2;k++){const q=pts[2+((R()*3)|0)];br(q[0],q[1],a+(R()<.5?-1:1)*(.6+R()*.5),L*.55,w*.6,dep+1)}};for(let k=0;k<3;k++)br(f.x,f.y,k*2.1+R(),f.r,3.2,0)}
  }}
/* ---- ของประกอบฉาก (จุดสังเกต) ---- */
function u13Props(){const th=U13M[curMap];if(!th||isDg())return;const M=MAPS[curMap],F=depBuild(),R=depRng(curMap*4111+7),out=[];
  const put=(n,tries,m,fn)=>{for(let i=0,k=0;i<tries&&k<n;i++){const x=260+R()*2680,y=260+R()*2680;if(!u13Ok(F,x,y,m)||!p7gFree(x,y,40+m)||out.some(t=>Math.hypot(t.x-x,t.y-y)<(t.r||10)+50+m))continue;const t=fn(x,y,k);if(!t)continue;out.push(t);k++}};
  if(th==='void'){put(16,3000,40,(x,y,k)=>({x,y,r:18,k:'u13obel',v:k%3,sc:.9+R()*.3,ht:180,hw:30}));put(8,3000,70,(x,y,k)=>({x,y,r:0,nc:1,k:'u13arch',v:k%2,ht:170,hw:70}));put(28,3000,20,(x,y,k)=>({x,y,r:15,k:'u13vcry',v:k%3,sc:.8+R()*.5,ht:90,hw:28}))}
  if(th==='throne'){put(26,3000,30,(x,y,k)=>({x,y,r:18,k:'u13col',v:k%3,ht:170,hw:26}));put(12,3000,30,(x,y,k)=>({x,y,r:18,k:'u13knt',v:k%2,ht:110,hw:30}));put(22,3000,10,(x,y,k)=>({x,y,r:12,k:'u13braz',ht:70,hw:20}));put(14,3000,10,(x,y,k)=>({x,y,r:8,k:'u13ban',v:k%2,ht:150,hw:26}))}
  if(th==='bog'){put(22,3000,40,(x,y,k)=>({x,y,r:20,k:'u13dtree',v:k%3,sc:.9+R()*.35,ht:200,hw:60}));put(20,3000,10,(x,y,k)=>({x,y,r:8,k:'u13lamp',ht:110,hw:16}));put(36,3000,0,(x,y,k)=>({x,y,r:0,nc:1,k:'u13shr',v:k%3,ht:40}))}
  if(th==='core'){put(22,3000,40,(x,y,k)=>({x,y,r:22,k:'u13basc',v:k%3,sc:.85+R()*.35,ht:170,hw:40}));put(16,3000,20,(x,y,k)=>({x,y,r:16,k:'u13geo',v:k%2,ht:70,hw:32}));put(24,3000,10,(x,y,k)=>({x,y,r:0,nc:1,k:'u13vent',ht:30}));put(28,3000,0,(x,y,k)=>({x,y,r:10,k:'u13obs',v:k%3,ht:50,hw:20}))}
  p7gAdd(out,1)}
{const o=enterMap;enterMap=function(){const r=o.apply(this,arguments);try{u13Props()}catch(e){console.error(e)}return r}}
Object.assign(PALK,{
 u13obel(t,T){const x=t.x,y=t.y,s=t.sc||1,h=150*s,w=18*s;PALSH(x+5,y+4,w*1.8,w*.5,.45);
  const P=[[x-w,y],[x-w*.8,y-h*.86],[x,y-h],[x+w*.8,y-h*.86],[x+w,y]];g.fillStyle='#241c3a';g.beginPath();P.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));g.closePath();g.fill();g.strokeStyle='#0a0614';g.lineWidth=1.2;g.stroke();
  g.fillStyle='#382c58';g.beginPath();g.moveTo(x-w,y);g.lineTo(x-w*.8,y-h*.86);g.lineTo(x,y-h);g.lineTo(x-w*.05,y);g.closePath();g.fill();
  const pu=.55+.45*Math.sin(T*2+x);g.strokeStyle='rgba(120,230,255,'+(.5+.4*pu)+')';g.lineWidth=1.6;for(let k=0;k<4;k++){const yy=y-h*(.18+k*.17);g.beginPath();g.moveTo(x-w*.4,yy);g.lineTo(x,yy-6);g.lineTo(x+w*.35,yy);g.stroke()}glowAt(x,y-h*.5,40*s,'120,230,255',.18+.12*pu);
  for(let k=0;k<3;k++){const a=T*.7+k*2.1+x,fy=y-h-14-Math.sin(T*1.3+k)*6;g.fillStyle=k%2?'#4a3c66':'#5a4a7c';g.beginPath();g.moveTo(x+Math.cos(a)*16-5,fy-k*9);g.lineTo(x+Math.cos(a)*16+4,fy-k*9-4);g.lineTo(x+Math.cos(a)*16+6,fy-k*9+4);g.closePath();g.fill()}},
 u13arch(t,T){const x=t.x,y=t.y,w=60,h=150;[-1,1].forEach(sd=>{const px=x+sd*w;PALSH(px+4,y+3,18,6,.4);g.fillStyle='#2e2446';g.fillRect(px-11,y-h*(sd<0?1:.72),22,h*(sd<0?1:.72));g.fillStyle='#41345e';g.fillRect(px-11,y-h*(sd<0?1:.72),8,h*(sd<0?1:.72));g.strokeStyle='#0a0614';g.lineWidth=1;g.strokeRect(px-11,y-h*(sd<0?1:.72),22,h*(sd<0?1:.72));
    for(let k=1;k<5;k++){g.strokeStyle='rgba(10,6,20,.6)';g.beginPath();g.moveTo(px-11,y-k*h*.18);g.lineTo(px+11,y-k*h*.18);g.stroke()}});
  g.fillStyle='#2e2446';g.beginPath();g.moveTo(x-w-14,y-h);g.quadraticCurveTo(x-w*.2,y-h-40,x+w*.25,y-h-14);g.lineTo(x+w*.15,y-h+6);g.quadraticCurveTo(x-w*.3,y-h-16,x-w+10,y-h+12);g.closePath();g.fill();g.strokeStyle='#0a0614';g.stroke();
  g.save();g.beginPath();g.rect(x-w+11,y-h*.95,w*2-22,h*.95);g.clip();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,y-h,0,y);gr.addColorStop(0,'rgba(90,40,180,.0)');gr.addColorStop(1,'rgba(120,80,230,.18)');g.fillStyle=gr;g.fillRect(x-w,y-h,w*2,h);
  for(let k=0;k<10;k++){const sx=x-w+15+((k*37)%(w*2-30)),sy=y-h*.9+((k*53)%(h*.8));g.fillStyle='rgba(255,255,255,'+(.3+.3*Math.sin(T*2+k))+')';g.beginPath();g.arc(sx,sy,1,0,7);g.fill()}g.restore()},
 u13vcry(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x+3,y+3,22*s,7*s,.4);const C=[['#7ae8ff','#3aa8d8'],['#ff8ae0','#c84aa8'],['#b89aff','#7a5ad8']][t.v];const pu=.6+.4*Math.sin(T*1.8+x*.01);glowAt(x,y-26*s,46*s,C[0]==='#7ae8ff'?'120,230,255':C[0]==='#ff8ae0'?'255,130,220':'180,150,255',.22+.14*pu);
  [[-12,48,-.3],[0,70,0],[11,40,.35],[-4,30,-.1],[6,26,.2]].forEach(([dx,hh,a])=>{const bx=x+dx*s,h=hh*s,w=7*s;g.save();g.translate(bx,y);g.rotate(a);g.fillStyle=C[1];g.beginPath();g.moveTo(-w,0);g.lineTo(-w*.7,-h*.8);g.lineTo(0,-h);g.lineTo(w*.7,-h*.8);g.lineTo(w,0);g.closePath();g.fill();g.fillStyle=C[0];g.beginPath();g.moveTo(-w,0);g.lineTo(-w*.7,-h*.8);g.lineTo(0,-h);g.lineTo(0,0);g.closePath();g.fill();
    g.strokeStyle='rgba(20,10,40,.7)';g.lineWidth=.8;g.beginPath();g.moveTo(-w,0);g.lineTo(-w*.7,-h*.8);g.lineTo(0,-h);g.lineTo(w*.7,-h*.8);g.lineTo(w,0);g.stroke();g.fillStyle='rgba(255,255,255,'+(.4+.4*pu)+')';g.fillRect(-w*.45,-h*.7,1.6,h*.4);g.restore()})},
 u13col(t,T){const x=t.x,y=t.y,h=[150,95,60][t.v],w=17;PALSH(x+5,y+4,w*1.7,w*.5,.45);g.fillStyle='#2a2438';g.fillRect(x-w-5,y-12,w*2+10,12);g.strokeStyle='#08060e';g.lineWidth=1;g.strokeRect(x-w-5,y-12,w*2+10,12);
  const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'#2e2840');gr.addColorStop(.35,'#4e4666');gr.addColorStop(1,'#221c30');g.fillStyle=gr;g.beginPath();g.moveTo(x-w,y-12);g.lineTo(x-w,y-h);for(let k=0;k<=6;k++)g.lineTo(x-w+k*w/3,y-h+(k%2?-7:3)+(k===3?-10:0));g.lineTo(x+w,y-12);g.closePath();g.fill();g.stroke();
  g.strokeStyle='rgba(10,6,20,.45)';for(let k=1;k<4;k++){g.beginPath();g.moveTo(x-w+k*w/2,y-14);g.lineTo(x-w+k*w/2,y-h+6);g.stroke()}g.strokeStyle='rgba(255,210,120,.4)';g.beginPath();g.moveTo(x-w,y-h*.55);g.lineTo(x+w,y-h*.55);g.stroke();
  if(t.v>0){g.fillStyle='#3a3350';[[x+w+16,y+2,14],[x+w+34,y+6,10]].forEach(([a,b,r])=>{g.beginPath();g.ellipse(a,b-r*.5,r,r*.6,0,0,7);g.fill();g.stroke()})}},
 u13knt(t,T){const x=t.x,y=t.y,d=t.v?-1:1;PALSH(x+4,y+4,26,8,.45);g.fillStyle='#2a2438';g.fillRect(x-22,y-10,44,10);g.strokeStyle='#08060e';g.lineWidth=1;g.strokeRect(x-22,y-10,44,10);const S='#4a4462',SD='#2e2a40';
  g.fillStyle=SD;g.beginPath();g.ellipse(x+d*8,y-14,12,6,0,0,7);g.fill();g.fillStyle=S;g.beginPath();g.moveTo(x-12,y-14);g.lineTo(x-10,y-58);g.lineTo(x+10,y-58);g.lineTo(x+12,y-14);g.closePath();g.fill();g.stroke();
  g.fillStyle=S;g.beginPath();g.arc(x,y-66,9,0,7);g.fill();g.stroke();g.fillStyle=SD;g.fillRect(x-7,y-68,14,3);g.strokeStyle='#5a5474';g.lineWidth=3;g.beginPath();g.moveTo(x+d*14,y-66);g.lineTo(x+d*14,y-8);g.stroke();g.lineWidth=1;g.strokeStyle='#08060e';g.strokeRect(x+d*14-5,y-50,10,3);
  g.fillStyle='rgba(180,140,255,'+(.3+.2*Math.sin(T*2+x))+')';g.beginPath();g.arc(x-3,y-67,1.2,0,7);g.arc(x+3,y-67,1.2,0,7);g.fill();g.fillStyle='rgba(60,120,60,.45)';g.beginPath();g.ellipse(x-8,y-30,5,8,0,0,7);g.fill()},
 u13braz(t,T){const x=t.x,y=t.y;PALSH(x+3,y+3,16,5,.45);g.fillStyle='#2a2230';g.fillRect(x-3,y-36,6,36);g.fillRect(x-10,y-4,20,4);g.fillStyle='#4a3a2a';g.beginPath();g.moveTo(x-16,y-38);g.lineTo(x+16,y-38);g.lineTo(x+10,y-28);g.lineTo(x-10,y-28);g.closePath();g.fill();g.strokeStyle='#c8a050';g.lineWidth=1.2;g.stroke();
  const fl=.7+.2*Math.sin(T*7+x)+.1*Math.sin(T*17+x);glowAt(x,y-46,52,'190,110,255',.32*fl);[[0,1],[-5,.7],[5,.75]].forEach(([dx,s],k)=>{const hh=(20+Math.sin(T*9+k*2+x)*5)*s;g.fillStyle='rgba('+(170+k*20)+','+(90+k*30)+',255,.9)';g.beginPath();g.moveTo(x+dx-6*s,y-38);g.quadraticCurveTo(x+dx-4*s,y-38-hh*.6,x+dx,y-38-hh);g.quadraticCurveTo(x+dx+4*s,y-38-hh*.6,x+dx+6*s,y-38);g.closePath();g.fill()});
  g.fillStyle='rgba(255,240,255,.85)';g.beginPath();g.ellipse(x,y-42,2.6,5,0,0,7);g.fill()},
 u13ban(t,T){const x=t.x,y=t.y,h=140;PALSH(x+2,y+2,8,3,.4);g.fillStyle='#2a1e14';g.fillRect(x-2,y-h,4,h);g.fillRect(x-14,y-h,28,3);g.fillStyle='#c8a050';g.beginPath();g.arc(x,y-h-3,3,0,7);g.fill();
  const sw=Math.sin(T*1.4+x)*3,C=t.v?['#5a1428','#3a0c1a']:['#3a1a5a','#24103a'];g.fillStyle=C[0];g.beginPath();g.moveTo(x-12,y-h+3);g.lineTo(x+12,y-h+3);g.lineTo(x+12+sw,y-h+60);g.lineTo(x+6+sw,y-h+52);g.lineTo(x+2+sw,y-h+66);g.lineTo(x-4+sw,y-h+54);g.lineTo(x-12+sw,y-h+62);g.closePath();g.fill();g.strokeStyle='#0a0614';g.lineWidth=.8;g.stroke();
  g.strokeStyle='#d8b060';g.lineWidth=1;g.beginPath();g.moveTo(x-12,y-h+8);g.lineTo(x+12,y-h+8);g.stroke();g.fillStyle='rgba(255,215,120,.7)';g.font='12px system-ui';g.textAlign='center';g.fillText('♛',x+sw*.5,y-h+34)},
 u13dtree(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x+6,y+5,40*s,10*s,.45);g.strokeStyle='#1e1622';g.lineCap='round';
  const br=(x0,y0,a,L,w,d)=>{const x1=x0+Math.cos(a)*L,y1=y0+Math.sin(a)*L;g.lineWidth=w;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2+Math.sin(d+x)*6,(y0+y1)/2,x1,y1);g.stroke();
    if(d<3){br(x1,y1,a-.5-((d*7+t.v)%3)*.1,L*.68,w*.62,d+1);br(x1,y1,a+.45,L*.62,w*.6,d+1)}else{/* มอสย้อย */const sw=Math.sin(T*.9+x1*.02)*3;g.strokeStyle='rgba(110,150,110,.75)';g.lineWidth=1.4;for(let k=0;k<3;k++){g.beginPath();g.moveTo(x1+k*3-3,y1);g.quadraticCurveTo(x1+k*3-3+sw,y1+14,x1+k*3-3+sw*1.4,y1+24+k*6);g.stroke()}g.strokeStyle='#1e1622'}};
  g.fillStyle='#1e1622';g.beginPath();g.moveTo(x-14*s,y);g.quadraticCurveTo(x-6*s,y-40*s,x-4*s,y-90*s);g.lineTo(x+6*s,y-90*s);g.quadraticCurveTo(x+8*s,y-40*s,x+16*s,y);g.closePath();g.fill();
  br(x-1*s,y-88*s,-1.57-.55,46*s,8*s,0);br(x+1*s,y-88*s,-1.57+.5,50*s,8*s,0);br(x,y-60*s,-1.57-1.1,30*s,5*s,1);g.lineCap='butt';
  g.strokeStyle='rgba(120,90,160,.35)';g.lineWidth=1;g.beginPath();g.moveTo(x-3*s,y-10);g.lineTo(x-2*s,y-70*s);g.stroke()},
 u13lamp(t,T){const x=t.x,y=t.y,h=96;PALSH(x+2,y+2,8,3,.4);g.strokeStyle='#2a1e14';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x-4,y-h*.5,x+2,y-h);g.lineTo(x+16,y-h+4);g.stroke();
  const fy=y-h+16+Math.sin(T*2+x)*2,fl=.6+.3*Math.sin(T*3+x);g.strokeStyle='#2a1e14';g.lineWidth=.8;g.beginPath();g.moveTo(x+16,y-h+4);g.lineTo(x+16,fy-8);g.stroke();glowAt(x+16,fy,44,'140,255,200',.3*fl+.1);
  g.fillStyle='rgba(30,40,30,.85)';g.beginPath();g.moveTo(x+10,fy-8);g.lineTo(x+22,fy-8);g.lineTo(x+20,fy+7);g.lineTo(x+12,fy+7);g.closePath();g.fill();g.fillStyle='rgba(170,255,210,'+(.6+.3*fl)+')';g.beginPath();g.arc(x+16,fy,3.6,0,7);g.fill();
  for(let k=0;k<2;k++){const a=T*1.2+k*3+x,px=x+16+Math.cos(a)*22,py=fy-10+Math.sin(a*1.3)*12;g.fillStyle='rgba(170,255,210,'+(.4+.3*Math.sin(T*4+k))+')';g.beginPath();g.arc(px,py,1.6,0,7);g.fill()}},
 u13shr(t,T){const x=t.x,y=t.y,C=[['#c87aff','200,120,255'],['#7ad8ff','120,210,255'],['#ff8ac8','255,140,200']][t.v];const pu=.6+.4*Math.sin(T*1.7+x);glowAt(x,y-12,30,C[1],.2*pu+.08);
  [[-8,14,.8],[0,22,1],[9,12,.7],[4,8,.55]].forEach(([dx,h,s])=>{g.fillStyle='#d8d0e0';g.fillRect(x+dx-1.4*s,y-h,2.8*s,h);g.fillStyle=C[0];g.beginPath();g.ellipse(x+dx,y-h,8*s,5*s,0,Math.PI,7);g.fill();g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.arc(x+dx-2*s,y-h-2*s,1.2*s,0,7);g.fill()})},
 u13basc(t,T){const x=t.x,y=t.y,s=t.sc||1;PALSH(x+6,y+5,40*s,10*s,.5);const cols=[[-18,120,'#3a2620'],[0,160,'#46302a'],[18,100,'#34221c'],[-6,70,'#3e2a22'],[12,56,'#3a2620']];
  cols.forEach(([dx,hh,c])=>{const cx=x+dx*s,h=hh*s,w=10*s;g.fillStyle=c;g.beginPath();g.moveTo(cx-w,y-h+5);g.lineTo(cx-w,y);g.lineTo(cx+w,y);g.lineTo(cx+w,y-h+5);g.lineTo(cx,y-h);g.closePath();g.fill();g.fillStyle='rgba(255,170,120,.12)';g.fillRect(cx-w,y-h+5,w*.6,h-5);
    g.fillStyle='#5a3e32';g.beginPath();g.moveTo(cx-w,y-h+5);g.lineTo(cx,y-h);g.lineTo(cx+w,y-h+5);g.lineTo(cx,y-h+9);g.closePath();g.fill();g.strokeStyle='rgba(10,4,2,.85)';g.lineWidth=1;g.beginPath();g.moveTo(cx-w,y-h+5);g.lineTo(cx-w,y);g.moveTo(cx+w,y);g.lineTo(cx+w,y-h+5);g.lineTo(cx,y-h);g.lineTo(cx-w,y-h+5);g.stroke();
    g.strokeStyle='rgba(255,120,40,'+(.35+.25*Math.sin(T*2+dx))+')';g.lineWidth=1.2;g.beginPath();g.moveTo(cx-w*.3,y-h*.3);g.lineTo(cx+w*.2,y-h*.45);g.stroke()})},
 u13geo(t,T){const x=t.x,y=t.y;PALSH(x+4,y+4,30,9,.45);g.fillStyle='#2e2420';g.beginPath();g.ellipse(x,y-14,30,20,0,0,7);g.fill();g.strokeStyle='#0a0402';g.lineWidth=1.2;g.stroke();g.fillStyle='#140806';g.beginPath();g.ellipse(x,y-16,22,13,0,0,7);g.fill();
  const C=t.v?['#ff7a3a','255,120,60']:['#ffb03a','255,180,80'],pu=.6+.4*Math.sin(T*2+x);glowAt(x,y-18,40,C[1],.3*pu+.1);for(let k=0;k<9;k++){const a=k/9*6.283,px=x+Math.cos(a)*14,py=y-16+Math.sin(a)*8,h=8+((k*5)%7);g.fillStyle=k%2?C[0]:'#ffe0a0';g.beginPath();g.moveTo(px-2.5,py);g.lineTo(px+(x-px)*.3,py-h);g.lineTo(px+2.5,py);g.closePath();g.fill()}},
 u13vent(t,T){const x=t.x,y=t.y,pu=.6+.4*Math.sin(T*2.5+x);g.fillStyle='#1a0e0a';g.beginPath();g.ellipse(x,y,18,8,0,0,7);g.fill();g.fillStyle='rgba(255,'+(110+40*pu|0)+',30,.95)';g.beginPath();g.ellipse(x,y,11,4.5,0,0,7);g.fill();glowAt(x,y-6,46,'255,120,40',.3*pu+.1);
  for(let k=0;k<4;k++){const q=(T*.35+k/4+x*.001)%1;g.fillStyle='rgba(70,50,46,'+(.38*(1-q))+')';g.beginPath();g.arc(x+Math.sin(q*5+k)*8,y-8-q*70,5+q*14,0,7);g.fill()}if(Math.random()<.04)parts.push({x:x+(Math.random()-.5)*8,y:y-4,vx:(Math.random()-.5)*20,vy:-60-Math.random()*40,t:.9,l:.9,c:'#ffb050',r:1.4})},
 u13obs(t,T){const x=t.x,y=t.y;PALSH(x+3,y+3,18,6,.45);[[-8,30,-.25],[4,40,.1],[12,22,.4]].slice(0,2+t.v%2).forEach(([dx,h,a])=>{g.save();g.translate(x+dx,y);g.rotate(a);g.fillStyle='#120c14';g.beginPath();g.moveTo(-7,0);g.lineTo(-2,-h);g.lineTo(6,-h*.7);g.lineTo(7,0);g.closePath();g.fill();
   g.fillStyle='rgba(180,160,220,.35)';g.beginPath();g.moveTo(-5,0);g.lineTo(-2,-h);g.lineTo(0,-h*.6);g.closePath();g.fill();g.strokeStyle='rgba(255,140,60,.4)';g.lineWidth=.8;g.beginPath();g.moveTo(-7,0);g.lineTo(-2,-h);g.lineTo(6,-h*.7);g.stroke();g.restore()})}
});
/* ของ u13 ถูกส่งเข้าตัววาดเฉพาะแมพ (drawRock11 / shadeTree / rootTree) ซึ่งไม่อ่าน t.k → ดักไว้ก่อน */
{const w=fn=>function(t,now){const f=t&&t.k&&t.k.charCodeAt(0)===117&&t.k.indexOf('u13')===0&&PALK[t.k];if(f){f(t,now/1000);return}return fn.apply(this,arguments)};
  drawRock11=w(drawRock11);shadeTree=w(shadeTree);rootTree=w(rootTree)}
