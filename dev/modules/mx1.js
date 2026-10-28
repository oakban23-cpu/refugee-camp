
/* ---------- v554 แผนที่โฉมใหม่ — เครื่องยนต์กลาง (ใช้ร่วมทุกแมพที่มีธีมใน MXC)
   · พื้น: ลายพื้นฐานของธีม + วัสดุ 3–4 ชนิดเป็นหย่อมธรรมชาติตามสนามความสูง/สนามวัสดุ/ความหนาแน่นป่า + ลายเดิมของระบบมิติฉาก
     + เงานูนต่ำ (แสงจากบนซ้าย) + เงาโคน/เงาพุ่มของต้นไม้ + ของเล็กเดิม (decor) วาดใหม่ตำแหน่งเดิม + พุ่มเล็กรอบโคน → อบลงชังก์ (แคช)
   · ต้นไม้/หิน/ผลึกวาดใหม่เป็นสไปรต์มีแสงเงา (ตัวแปร 6 แบบ) · รังมอนวาดใหม่ · เงาเมฆลอยผ่าน · แสงแดดอุ่น/เงาเย็นบนจอ
   · ไม่ย้ายตำแหน่งของใด ๆ · ทุกอย่างที่นิ่งอยู่ในแคช จึงแทบไม่กินเครื่องต่อเฟรม ---------- */
const MX={v:'554',on:1,tile:{},cg:new Map(),tc:null,tx:null,dsp:{},tsp:{},bt:0,nb:0,sig:'',lc:{x:0,y:0},jobs:new Map(),done:new Map(),pv:new Map(),vsp:new Map(),cap:24,r:2,L:(()=>{const L=[-.38,-.72,.58],l=Math.hypot(...L);return L.map(v=>v/l)})()};
const mxI=Math.imul;
function mxH(i,j,s){let h=(mxI(i,374761393)+mxI(j,668265263)+mxI(s,1442695041))|0;h=mxI(h^(h>>>13),1274126177);h^=h>>>16;return(h>>>0)/4294967296}
function mxN(x,y,s){const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy),a=mxH(i,j,s),b=mxH(i+1,j,s),c=mxH(i,j+1,s),d=mxH(i+1,j+1,s);return a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy}
function mxF(x,y,s,o){let v=0,a=1,n=0,f=1;for(let k=0;k<o;k++){v+=a*mxN(x*f,y*f,s+k*101);n+=a;a*=.5;f*=2.03}return v/n}
const mxSS=(a,b,v)=>{const t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t)};
const mxRgb=(c,a)=>'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+(a===undefined?1:a)+')';
const mxMix=(a,b,k)=>[a[0]+(b[0]-a[0])*k|0,a[1]+(b[1]-a[1])*k|0,a[2]+(b[2]-a[2])*k|0];
const MXW=[255,255,255],MXK=[0,0,0];
const MXC={},MXT={},MXU={},MXDC={},MXTR={},MXNS={},MXB={};

/* ===== แปรงวาดลายพื้นไร้รอยต่อ (กระเบื้อง 256 หน่วย · ความละเอียด 2x) — สไตล์การ์ตูนคมชัด ===== */
function mxTile(key,fn){if(MX.tile[key])return MX.tile[key];const S=256,c=document.createElement('canvas');c.width=c.height=S*2;const x=c.getContext('2d');x.scale(2,2);x.lineCap='round';x.lineJoin='round';
  let sd=7;for(const ch of key)sd=(sd*31+ch.charCodeAt(0))>>>0;const R=gxRng(sd);
  const W8=(px,py,m,f)=>{for(const ox of[-S,0,S])for(const oy of[-S,0,S]){const X=px+ox,Y=py+oy;if(X<-m||X>S+m||Y<-m||Y>S+m)continue;f(X,Y)}};
  const blade=(bx,Y,L,w,ln,col)=>{x.fillStyle=col;x.beginPath();x.moveTo(bx-w,Y);x.quadraticCurveTo(bx-w*.25+ln*.45,Y-L*.55,bx+ln,Y-L);x.quadraticCurveTo(bx+w*.35+ln*.45,Y-L*.5,bx+w,Y);x.closePath();x.fill()};
  const B={S,x,R,W8,blade,
    fill(c){x.fillStyle=mxRgb(c);x.fillRect(0,0,S,S)},
    blob(n,c1,c2,r0,r1,a0,a1,sq){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,r=r0+R()*(r1-r0),c=R()<.5?c1:c2,a=a0+R()*(a1-a0),sy=sq||(.55+R()*.4);
      W8(px,py,r,(X,Y)=>{x.save();x.translate(X,Y);x.scale(1,sy);const gr=x.createRadialGradient(0,0,0,0,0,r);gr.addColorStop(0,mxRgb(c,a));gr.addColorStop(1,mxRgb(c,0));x.fillStyle=gr;x.fillRect(-r,-r,r*2,r*2);x.restore()})}},
    tuft(n,pal,h0,h1,o){o=o||{};const per=o.per||[1,3],cr=o.cr||6,k0=o.k0||3,k1=o.k1||6,sp=o.sp||1.25,sh=o.sh===undefined?.2:o.sh,wd=o.w||1;
      for(let i=0;i<n;i++){const cx=R()*S,cy=R()*S,m=per[0]+(R()*(per[1]-per[0]+1)|0);for(let q=0;q<m;q++){const px=cx+(R()-.5)*cr*2,py=cy+(R()-.5)*cr*1.2,k=k0+(R()*(k1-k0+1)|0),h=h0+R()*(h1-h0),gl=(R()-.5)*2.5,dk=R()<.25;
        const bl=[];for(let b=0;b<k;b++){const f=k>1?b/(k-1):.5;bl.push([px+(f-.5)*k*.9,h*(.62+R()*.45),(f-.5)*sp*h*.55+gl+(R()-.5)*1.2,wd*(.75+R()*.5),f])}
        W8(px,py,h+6,(X,Y)=>{const dx=X-px;if(sh>0){x.fillStyle='rgba(0,0,0,'+sh+')';x.beginPath();x.ellipse(X+.8,Y+.35,k*.55+1.4,1.3,0,0,7);x.fill()}
          for(const[bx,L,ln,w,f]of bl){const c=dk?pal[0]:f<.34?pal[2]:f<.67?pal[1]:mxMix(pal[1],pal[0],.55);blade(bx+dx,Y,L,w,ln,mxRgb(c))}
          if(pal[3]&&!dk){const b=bl[0];x.strokeStyle=mxRgb(pal[3],.55);x.lineWidth=.45;x.beginPath();x.moveTo(b[0]+dx-b[3]*.3+b[2]*.25,Y-b[1]*.3);x.quadraticCurveTo(b[0]+dx-b[3]*.2+b[2]*.45,Y-b[1]*.55,b[0]+dx+b[2],Y-b[1]);x.stroke()}})}}},
    /* พรมหญ้าแน่น: ใบหญ้าเป็นกอ เรียงหลังไปหน้า (ซ้อนกันมีมิติ) สีไล่ตามกอ + ปลายใบรับแสง */
    carpet(n,pal,h0,h1,o){o=o||{};const nc=o.nc||Math.max(8,Math.round(n/(o.per||12))),C=[];for(let i=0;i<nc;i++)C.push([R()*S,R()*S,(R()-.5)*(o.hv===undefined?.5:o.hv),.8+R()*.45]);const L=[],cr=o.cr||6,ln0=o.ln||2.6,wd=o.w||.85,tip=o.tip;
      for(let i=0;i<n;i++){const c=C[(R()*nc)|0],a=R()*6.283,d=Math.sqrt(R())*cr,px=c[0]+Math.cos(a)*d,py=c[1]+Math.sin(a)*d*.62;L.push([((px%S)+S)%S,((py%S)+S)%S,c[2],(h0+R()*(h1-h0))*c[3],(R()-.5)*ln0+Math.cos(a)*d/cr*ln0*.6,wd*(.7+R()*.6),R()])}
      L.sort((a,b)=>a[1]-b[1]);const np=pal.length-1;
      for(const[px,py,hv,h,ln,w,rr]of L){let t=Math.max(0,Math.min(np-.001,(rr*.8+(hv+.5)*.35-.1)*np));if(ln<-1)t=Math.min(np-.001,t+.35);const i0=t|0,c=mxMix(pal[i0],pal[i0+1],t-i0),cs=mxRgb(c);
        W8(px,py,h+3,(X,Y)=>{blade(X,Y,h,w,ln,cs);if(tip&&rr>.72){x.strokeStyle=mxRgb(tip,.5);x.lineWidth=.4;x.beginPath();x.moveTo(X-w*.3+ln*.45,Y-h*.5);x.quadraticCurveTo(X-w*.15+ln*.7,Y-h*.78,X+ln,Y-h);x.stroke()}})}},
    fuzz(n,cs,h0,h1,a){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,h=h0+R()*(h1-h0),c=cs[(R()*cs.length)|0],ln=(R()-.5)*2.4;W8(px,py,h+2,(X,Y)=>{blade(X,Y,h,.55,ln,mxRgb(c,a||.8))})}},
    peb(n,c1,c2,r0,r1,sh,sq0){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,r=r0+R()*(r1-r0),c=mxMix(c1,c2,R()),ro=(R()-.5)*1.2,sq=(sq0||.55)+R()*.25;
      W8(px,py,r+3,(X,Y)=>{x.fillStyle='rgba(0,0,0,'+(sh===undefined?.28:sh)+')';x.beginPath();x.ellipse(X+r*.3,Y+r*.42,r*1.02,r*sq*1.05,ro,0,7);x.fill();
        const gr=x.createLinearGradient(X-r*.6,Y-r*.7,X+r*.5,Y+r*.6);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.3)));gr.addColorStop(.5,mxRgb(c));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.38)));x.fillStyle=gr;x.beginPath();x.ellipse(X,Y,r,r*sq,ro,0,7);x.fill();
        x.fillStyle='rgba(255,255,255,.22)';x.beginPath();x.ellipse(X-r*.32,Y-r*sq*.38,r*.38,r*sq*.3,ro,0,7);x.fill()})}},
    shard(n,c1,c2,r0,r1,sh){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,r=r0+R()*(r1-r0),c=mxMix(c1,c2,R()),k=5+(R()*3|0),P=[];for(let q=0;q<k;q++){const a=q/k*6.283+R()*.5,rr=r*(.65+R()*.45);P.push([Math.cos(a)*rr,Math.sin(a)*rr*.7])}
      W8(px,py,r+3,(X,Y)=>{x.fillStyle='rgba(0,0,0,'+(sh===undefined?.3:sh)+')';x.beginPath();P.forEach(([u,v],q)=>q?x.lineTo(X+u+r*.25,Y+v+r*.35):x.moveTo(X+u+r*.25,Y+v+r*.35));x.fill();
        x.fillStyle=mxRgb(c);x.beginPath();P.forEach(([u,v],q)=>q?x.lineTo(X+u,Y+v):x.moveTo(X+u,Y+v));x.closePath();x.fill();
        x.fillStyle=mxRgb(mxMix(c,MXW,.28));x.beginPath();x.moveTo(X+P[0][0]*.2,Y+P[0][1]*.2);for(let q=Math.floor(k*.4);q<Math.floor(k*.4)+3;q++){const p=P[q%k];x.lineTo(X+p[0],Y+p[1])}x.closePath();x.fill();
        x.strokeStyle=mxRgb(mxMix(c,MXK,.5),.6);x.lineWidth=.4;x.beginPath();P.forEach(([u,v],q)=>q?x.lineTo(X+u,Y+v):x.moveTo(X+u,Y+v));x.closePath();x.stroke()})}},
    crack(n,col,w,len,hl){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,P=[[px,py]];let a=R()*6.283,cx=px,cy=py;const L=len*(.5+R());for(let k=0;k<6;k++){a+=(R()-.5)*1.1;cx+=Math.cos(a)*L/6;cy+=Math.sin(a)*L/6;P.push([cx,cy])}
      const br=R()<.55?[2+(R()*3|0),a+(R()<.5?1:-1)*(.6+R()*.6),L*.32]:null;
      W8(px,py,len+12,(X,Y)=>{const dx=X-px,dy=Y-py;const pth=()=>{x.beginPath();P.forEach((p,j)=>j?x.lineTo(p[0]+dx,p[1]+dy):x.moveTo(p[0]+dx,p[1]+dy));if(br){const b=P[br[0]];x.moveTo(b[0]+dx,b[1]+dy);x.lineTo(b[0]+dx+Math.cos(br[1])*br[2],b[1]+dy+Math.sin(br[1])*br[2])}};
        if(hl){x.strokeStyle=hl;x.lineWidth=w*.8;x.save();x.translate(.6,.7);pth();x.stroke();x.restore()}x.strokeStyle=col;x.lineWidth=w;pth();x.stroke()})}},
    /* ลายแตกเป็นแผ่น (ดินแห้ง/ลาวาเย็น) */
    cells(cell,col,w,hl,jit){const n=Math.round(S/cell),P=[];for(let j=0;j<n;j++)for(let i=0;i<n;i++)P.push([(i+.5+(R()-.5)*(jit||.8))*cell,(j+.5+(R()-.5)*(jit||.8))*cell]);
      const get=(i,j)=>{const ii=((i%n)+n)%n,jj=((j%n)+n)%n,p=P[jj*n+ii];return[p[0]+(i<0?-S:i>=n?S:0),p[1]+(j<0?-S:j>=n?S:0)]};
      for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=get(i,j);for(const[di,dj]of[[1,0],[0,1],[1,1],[1,-1]]){const b=get(i+di,j+dj),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);if(L>cell*1.55)continue;
        const nx=-dy/L,ny=dx/L,h=cell*.36*(.7+R()*.5),bend=(R()-.5)*cell*.14;W8(mx,my,cell,(X,Y)=>{if(hl){x.strokeStyle=hl;x.lineWidth=w*.7;x.beginPath();x.moveTo(X-nx*h+.6,Y-ny*h+.7);x.quadraticCurveTo(X+bend+.6,Y+bend*.5+.7,X+nx*h+.6,Y+ny*h+.7);x.stroke()}
          x.strokeStyle=col;x.lineWidth=w;x.beginPath();x.moveTo(X-nx*h,Y-ny*h);x.quadraticCurveTo(X+bend,Y+bend*.5,X+nx*h,Y+ny*h);x.stroke()})}}},
    grain(n,la,da){for(let i=0;i<n;i++){x.fillStyle=R()<.5?'rgba(255,255,255,'+(la*(.4+R()*.6))+')':'rgba(0,0,0,'+(da*(.4+R()*.6))+')';x.fillRect(R()*S,R()*S,.45+R()*.7,.45+R()*.7)}},
    speck(n,cs,r0,r1,a0){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,r=r0+R()*(r1-r0),c=cs[(R()*cs.length)|0];W8(px,py,r+1,(X,Y)=>{x.fillStyle=mxRgb(c,a0===undefined?1:a0);x.beginPath();x.arc(X,Y,r,0,7);x.fill()})}},
    ripple(n,cl,cd,len,amp,ang){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,L=len*(.6+R()*.8),a=(ang===undefined?-.18:ang)+(R()-.5)*.25;
      W8(px,py,L,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.lineWidth=1.1;x.strokeStyle=cd;x.beginPath();for(let k=-L;k<=L;k+=4)x.lineTo(k,Math.sin(k*.09+i)*amp+1.1);x.stroke();x.strokeStyle=cl;x.beginPath();for(let k=-L;k<=L;k+=4)x.lineTo(k,Math.sin(k*.09+i)*amp);x.stroke();x.restore()})}},
    leaf(n,cs,s0,s1){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,s=s0+R()*(s1-s0),a=R()*6.283,c=cs[(R()*cs.length)|0];W8(px,py,s+2,(X,Y)=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(.5,.6,s,s*.45,0,0,7);x.fill();
      x.fillStyle=mxRgb(c);x.beginPath();x.moveTo(-s,0);x.quadraticCurveTo(0,-s*.6,s,0);x.quadraticCurveTo(0,s*.6,-s,0);x.fill();x.strokeStyle='rgba(0,0,0,.22)';x.lineWidth=.3;x.beginPath();x.moveTo(-s,0);x.lineTo(s*.9,0);x.stroke();x.restore()})}},
    flower(n,sets,k0,k1,sp){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,f=sets[(R()*sets.length)|0],k=k0+(R()*(k1-k0+1)|0),s=sp||9;W8(px,py,s+4,(X,Y)=>{
      for(let q=0;q<k;q++){const fx=X+(R()-.5)*s,fy=Y+(R()-.5)*s*.6;x.fillStyle='rgba(40,84,32,.95)';x.beginPath();x.ellipse(fx-1.2,fy+1.6,1.5,.55,-.5,0,7);x.ellipse(fx+1.2,fy+1.8,1.4,.5,.5,0,7);x.fill()}
      for(let q=0;q<k;q++){const fx=X+(R()-.5)*s,fy=Y+(R()-.5)*s*.6,fr=.75+R()*.45;x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.arc(fx+.5,fy+.7,fr*1.7,0,7);x.fill();x.fillStyle=f[0];for(let p=0;p<5;p++){const a=p*1.2566+q;x.beginPath();x.arc(fx+Math.cos(a)*fr*1.1,fy+Math.sin(a)*fr*.95,fr*.95,0,7);x.fill()}x.fillStyle=f[1];x.beginPath();x.arc(fx,fy,fr*.55,0,7);x.fill()}})}},
    clover(n,c1,c2){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,k=3+(R()*5|0);W8(px,py,10,(X,Y)=>{for(let q=0;q<k;q++){const cx=X+(R()-.5)*9,cy=Y+(R()-.5)*5,s=1+R()*.5;for(let l=0;l<3;l++){const a=l*2.094-1.57+(R()-.5)*.3;x.fillStyle=mxRgb(l===0?c2:c1);x.beginPath();x.arc(cx+Math.cos(a)*s,cy+Math.sin(a)*s*.8,s,0,7);x.fill()}}})}},
    fern(n,c1,c2,L0,L1){for(let i=0;i<n;i++){const px=R()*S,py=R()*S,fr=3+(R()*3|0);W8(px,py,L1+4,(X,Y)=>{for(let f=0;f<fr;f++){const a=-1.57+(f-(fr-1)/2)*.55+(R()-.5)*.2,L=L0+R()*(L1-L0);x.strokeStyle=mxRgb(mxMix(c1,MXK,.3));x.lineWidth=.6;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*L,Y+Math.sin(a)*L*.8);x.stroke();
      for(let k=1;k<7;k++){const t=k/7,qx=X+Math.cos(a)*L*t,qy=Y+Math.sin(a)*L*.8*t,s=(1-t)*2.1+.5,c=k%2?c1:c2;x.fillStyle=mxRgb(c);x.beginPath();x.ellipse(qx+Math.cos(a-1.57)*s*.9,qy+Math.sin(a-1.57)*s*.9,s,s*.42,a-1.0,0,7);x.ellipse(qx+Math.cos(a+1.57)*s*.9,qy+Math.sin(a+1.57)*s*.9,s,s*.42,a+1.0,0,7);x.fill()}}})}},
    /* แผ่นหินปูลานไม่เป็นตาราง: ไล่แสง + ร่องเข้ม + ขอบนูน (คำนวณพิกเซล) */
    slabs(cell,cA,cB,jw,bev,jc){const n=Math.round(S/cell),cw=S/n,P=[];for(let j=0;j<n;j++)for(let i=0;i<n;i++)P.push([(i+.2+R()*.6)*cw,(j+.2+R()*.6)*cw]);
      const cols=P.map(()=>mxMix(cA,cB,R())),sh=P.map(()=>(R()-.5)*14),id=x.getImageData(0,0,S*2,S*2),D=id.data,J=jc||[0,0,0];
      for(let py=0;py<S*2;py++){const Y=(py+.5)/2,cj=Math.floor(Y/cw);for(let px=0;px<S*2;px++){const X=(px+.5)/2,ci=Math.floor(X/cw);let b=1e9,b2=1e9,bi=0,bx=0,by=0;
        for(let dj=-2;dj<=2;dj++)for(let di=-2;di<=2;di++){const ii=((ci+di)%n+n)%n,jj=((cj+dj)%n+n)%n,k=jj*n+ii,ox=Math.floor((ci+di)/n)*S,oy=Math.floor((cj+dj)/n)*S,dx=X-P[k][0]-ox,dy=Y-P[k][1]-oy,d=dx*dx+dy*dy;if(d<b){b2=b;b=d;bi=k;bx=dx;by=dy}else if(d<b2)b2=d}
        const e=(Math.sqrt(b2)-Math.sqrt(b))*.5,o=(py*S*2+px)*4,c=cols[bi];let l=sh[bi],r0=c[0],g0=c[1],b0=c[2];
        if(e<jw){const t=e/jw;const k=.55*(1-t*t);r0=r0*(1-k)+J[0]*k;g0=g0*(1-k)+J[1]*k;b0=b0*(1-k)+J[2]*k}else if(e<jw+bev){const t=(e-jw)/bev,dirL=(-bx*.6-by*.8)/(Math.hypot(bx,by)||1);l+=(1-t)*(dirL>0?14:-10)*Math.abs(dirL)}
        D[o]=Math.max(0,Math.min(255,r0+l));D[o+1]=Math.max(0,Math.min(255,g0+l));D[o+2]=Math.max(0,Math.min(255,b0+l));D[o+3]=255}}
      x.putImageData(id,0,0)},
    stroke(fn){fn(x,R,W8,S)}};
  for(const k in MXB)B[k]=MXB[k](B);fn(B);const p=x.createPattern(c,'repeat');try{p.setTransform(new DOMMatrix().scale(.5))}catch(e){}return MX.tile[key]={p,c}}
const mxTileOf=k=>{const f=MXT[k];if(!f)return null;return mxTile('mx'+MX.v+k,f).p};

/* ===== รายการต้นไม้/ของที่อบลงพื้น (คำนวณใหม่เมื่อรายการเปลี่ยน → ล้างแคชชังก์ของแมพนี้) ===== */
/* เปลี่ยนแมพ → ทิ้งแคชของแมพอื่น (กระเบื้อง/สไปรต์ต้นไม้/ของประดับ) ไม่ให้หน่วยความจำบวม */
function mxPrune(){if(MX.tm===curMap)return;MX.tm=curMap;const C=MXC[curMap],keep=new Set();if(C){keep.add('mx'+MX.v+C.base);(C.mats||[]).forEach(M=>keep.add('mx'+MX.v+M.t))}
  for(const k of Object.keys(MX.tile))if(!keep.has(k))delete MX.tile[k];MX.tsp={};MX.pv.clear();const pre=curMap+'|';for(const k of[...MX.vsp.keys()])if(k.indexOf(pre)!==0)MX.vsp.delete(k)}
function mxTrees(){try{mxPrune()}catch(e){}const T=trees,n=T.length;let s=n*7+decor.length;for(let i=0;i<n;i+=7)s=(s*31+(T[i].x|0)+(T[i].y|0)*3)|0;const sig=curMap+':'+s;
  if(sig!==MX.sig){MX.sig=sig;MX.trs=T.filter(t=>!t.k&&!t.pp&&!t.inv);MX.cg.clear();MX.jobs.clear();MX.done.clear();try{for(const k of[...GX.ch.keys()])if(k.indexOf('mx'+MX.v+'|')===0)GX.ch.delete(k)}catch(e){}}return MX.trs}

/* ===== สนามต่อชังก์: ตารางหยาบ 12 หน่วย (ความสูง/วัสดุ/ทุ่ง/ละเอียด) ขยายเป็นตาราง 6 หน่วย + ป่า/เงาโคน/เงาพุ่มคิดที่ 6 หน่วย ===== */
const MXSP=6;
function mxField(cx,cy){const key=curMap+'|'+cx+'|'+cy;let F=MX.cg.get(key);if(F)return F;const C=MXC[curMap],CS=GX.CS,SP=MXSP,n=Math.round(CS/SP)+3,x0=cx*CS-SP,y0=cy*CS-SP,N=n*n,sd=curMap*977+13,sc=C.sc||640;
  const SQ=SP*2,nq=Math.ceil(n/2)+1,NQ=nq*nq,Hq=new Float32Array(NQ),Mq=new Float32Array(NQ),Wq=new Float32Array(NQ),Qq=new Float32Array(NQ);
  for(let j=0;j<nq;j++)for(let i=0;i<nq;i++){const X=x0+i*SQ,Y=y0+j*SQ,o=j*nq+i,wx=X+240*(mxF(X/900,Y/900,sd+1,2)-.5),wy=Y+240*(mxF(X/900+7.3,Y/900-3.1,sd+2,2)-.5);
    Hq[o]=mxF(wx/sc,wy/sc,sd+3,4);Mq[o]=mxF(wx/300,wy/300,sd+4,3);Wq[o]=mxF(wx/180+3.3,wy/180-1.7,sd+6,3);Qq[o]=mxF(X/70,Y/70,sd+5,2)}
  const h=new Float32Array(N),m=new Float32Array(N),q=new Float32Array(N),z=new Float32Array(N),w=new Float32Array(N),d=new Float32Array(N),a=new Float32Array(N),s=new Float32Array(N);
  for(let j=0;j<n;j++){const jj=j>>1,ty=(j&1)*.5;for(let i=0;i<n;i++){const ii=i>>1,tx=(i&1)*.5,o=j*n+i,q0=jj*nq+ii,q1=q0+1,q2=q0+nq,q3=q2+1,
      w0=(1-tx)*(1-ty),w1=tx*(1-ty),w2=(1-tx)*ty,w3=tx*ty;h[o]=Hq[q0]*w0+Hq[q1]*w1+Hq[q2]*w2+Hq[q3]*w3;m[o]=Mq[q0]*w0+Mq[q1]*w1+Mq[q2]*w2+Mq[q3]*w3;w[o]=Wq[q0]*w0+Wq[q1]*w1+Wq[q2]*w2+Wq[q3]*w3;q[o]=Qq[q0]*w0+Qq[q1]*w1+Qq[q2]*w2+Qq[q3]*w3;
      z[o]=mxN((x0+i*SP)/22,(y0+j*SP)/22,sd+7)}}
  const T=MX.trs||[],RR=170,tk=C.tsh||1;for(const t of T){if(t.x<x0-RR||t.x>x0+n*SP+RR||t.y<y0-RR||t.y>y0+n*SP+RR)continue;const r=t.r||18,bx=t.x,by=t.y+r*(C.tby||.66),s1=r*1.9+26,s2=r*.5+4,sx=r*1.05*tk+6,sy=r*.48*tk+4,cx2=bx+r*.32*tk,cy2=by+r*.18,
      i0=Math.max(0,Math.floor((bx-RR-x0)/SP)),i1=Math.min(n-1,Math.ceil((bx+RR-x0)/SP)),j0=Math.max(0,Math.floor((by-RR-y0)/SP)),j1=Math.min(n-1,Math.ceil((by+RR-y0)/SP)),i2=1/(2*s1*s1),i3=1/(2*s2*s2);
    for(let j=j0;j<=j1;j++){const Y=y0+j*SP,dy=(Y-by)*1.5,ay=(Y-by)*1.8,ey=(Y-cy2)/sy,dy2=dy*dy,ay2=ay*ay,ey2=ey*ey;for(let i=i0;i<=i1;i++){const X=x0+i*SP,o=j*n+i,dx=X-bx;d[o]+=Math.exp(-(dx*dx+dy2)*i2);a[o]+=Math.exp(-(dx*dx+ay2)*i3);const ex=(X-cx2)/sx;const v=Math.exp(-(ex*ex+ey2)*.9);if(v>s[o])s[o]=v}}}
  for(let o=0;o<N;o++){d[o]=Math.min(1,d[o]*.8);a[o]=Math.min(1,a[o])}
  F={n,x0,y0,SP,h,m,q,z,w,d,a,s};MX.cg.set(key,F);while(MX.cg.size>48)MX.cg.delete(MX.cg.keys().next().value);return F}

/* ===== ชังก์: สร้างเป็นขั้น ๆ ข้ามหลายเฟรม (งานละไม่เกินงบเวลา) — ระหว่างรอใช้ภาพพื้นฐาน แล้วค่อยจางเข้า ===== */
function mxTmp(w,h){let c=MX.tc;if(!c){c=MX.tc=document.createElement('canvas');MX.tx=c.getContext('2d')}if(c.width<w||c.height<h){c.width=Math.max(c.width,w);c.height=Math.max(c.height,h);MX.tx=c.getContext('2d')}return MX.tx}
function mxCv(k,w,h){if(!MX[k]||MX[k].width!==w||MX[k].height!==h){const c=document.createElement('canvas');c.width=w;c.height=h;MX[k]=c}return MX[k]}
function mxSharp(F,cv,X0,Y0,CS,sd,nz){const SP2=2,n2=Math.round(CS/SP2)+2,o2=new Float32Array(n2*n2),n=F.n,A=nz===undefined?.34:nz;
  for(let j=0;j<n2;j++){const Y=Y0-SP2+j*SP2,fy=(Y-F.y0)/F.SP,jj=Math.min(n-2,Math.max(0,Math.floor(fy))),ty=fy-jj;
    for(let i=0;i<n2;i++){const X=X0-SP2+i*SP2,fx=(X-F.x0)/F.SP,ii=Math.min(n-2,Math.max(0,Math.floor(fx))),tx=fx-ii,o=jj*n+ii;
      const v=(cv[o]*(1-tx)+cv[o+1]*tx)*(1-ty)+(cv[o+n]*(1-tx)+cv[o+n+1]*tx)*ty;o2[j*n2+i]=v<.05?0:v>.95?1:mxSS(.42,.58,v+(mxN(X/7,Y/7,sd)-.5)*A)}}
  return{n:n2,SP:SP2,x0:X0-SP2,y0:Y0-SP2,v:o2}}
const mxKey=(cx,cy,r)=>'mx'+MX.v+'|'+curMap+'|'+cx+'|'+cy+'|'+r;
/* ภาพพื้นฐานชั่วคราว (เร็ว): ลายพื้นของธีม */
/* ภาพพื้นฐานระหว่างรอชังก์: เติมลายกระเบื้องตรงจอ (ไม่สร้างแคนวาสต่อชังก์ → ประหยัดหน่วยความจำ) */
function mxPrevDraw(cx,cy,X,Y,D,s,ex,ey){const C=MXC[curMap],CS=GX.CS,p=mxTileOf(C.base);g.save();g.beginPath();g.rect(X,Y,D,D);g.clip();g.setTransform(s,0,0,s,ex,ey);g.fillStyle=p||'#444';g.fillRect(cx*CS-1,cy*CS-1,CS+2,CS+2);g.restore()}
function mxPrev(cx,cy,r){const k=cx+'|'+cy+'|'+r+'|'+curMap;let c=MX.pv.get(k);if(c)return c;const C=MXC[curMap],CS=GX.CS,px=Math.ceil(CS*r);c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d');x.setTransform(r,0,0,r,-cx*CS*r,-cy*CS*r);
  x.fillStyle=mxTileOf(C.base)||'#444';x.fillRect(cx*CS,cy*CS,CS,CS);MX.pv.set(k,c);while(MX.pv.size>2)MX.pv.delete(MX.pv.keys().next().value);return c}
function mxJob(cx,cy,r,vis){const k=mxKey(cx,cy,r);let J=MX.jobs.get(k);if(J){if(vis)J.vis=1;return J}J={k,cx,cy,r,vis:vis?1:0,st:0};MX.jobs.set(k,J);return J}
/* หนึ่งขั้นของงาน — คืน true เมื่อเสร็จทั้งชังก์ */
function mxStep(J){const C=MXC[curMap],CS=GX.CS,r=J.r,px=Math.ceil(CS*r),X0=J.cx*CS,Y0=J.cy*CS,LQ=LOWQ||(typeof LITEQ!=='undefined'&&LITEQ);
  if(J.st===0){const c=document.createElement('canvas');c.width=c.height=px;const x=c.getContext('2d');x.setTransform(r,0,0,r,-X0*r,-Y0*r);x.imageSmoothingEnabled=true;x.fillStyle=mxTileOf(C.base)||'#444';x.fillRect(X0,Y0,CS,CS);
    J.c=c;J.x=x;J.F=mxField(J.cx,J.cy);J.cov=[];J.mi=0;J.st=1;return false}
  const x=J.x,F=J.F,n=F.n,N=n*n;
  if(J.st===1){const mats=C.mats;if(J.mi>=mats.length){J.st=2;return false}const M=mats[J.mi++],pat=mxTileOf(M.t);if(!pat)return false;const cv=new Float32Array(N),f={};let any=0;
    let bi0=n,bi1=-1,bj0=n,bj1=-1;for(let o=0;o<N;o++){f.h=F.h[o];f.m=F.m[o];f.q=F.q[o];f.z=F.z[o];f.w=F.w[o];f.d=F.d[o];f.a=F.a[o];const v=M.c(f);const vv=v<0?0:v>1?1:v;cv[o]=vv;if(vv>.004){any=1;const i=o%n,j=(o/n)|0;if(i<bi0)bi0=i;if(i>bi1)bi1=i;if(j<bj0)bj0=j;if(j>bj1)bj1=j}}
    J.cov.push([M,cv]);if(!any)return false;const tx=mxTmp(px,px);
    /* ทำเฉพาะกรอบที่มีวัสดุ (เร็วขึ้นมากเมื่อวัสดุเป็นหย่อมเล็ก) */
    const wx0=Math.max(X0,F.x0+(bi0-1.5)*F.SP),wx1=Math.min(X0+CS,F.x0+(bi1+1.5)*F.SP),wy0=Math.max(Y0,F.y0+(bj0-1.5)*F.SP),wy1=Math.min(Y0+CS,F.y0+(bj1+1.5)*F.SP);if(wx1<=wx0||wy1<=wy0)return false;
    const qx0=Math.max(0,Math.floor((wx0-X0)*r)),qy0=Math.max(0,Math.floor((wy0-Y0)*r)),qx1=Math.min(px,Math.ceil((wx1-X0)*r)),qy1=Math.min(px,Math.ceil((wy1-Y0)*r)),qw=qx1-qx0,qh=qy1-qy0;
    let G=null,mc;if(M.hi&&!LQ){G=mxSharp(F,cv,X0,Y0,CS,curMap*31+J.cov.length,M.nz);mc=mxCv('mkh',G.n,G.n);const mx=mc.getContext('2d'),id=mx.createImageData(G.n,G.n),D=id.data;for(let o=0;o<G.v.length;o++)D[o*4+3]=G.v[o]*255|0;mx.putImageData(id,0,0)}
    else{mc=mxCv('mk',n,n);const mx=mc.getContext('2d'),id=mx.createImageData(n,n),D=id.data;for(let o=0;o<N;o++)D[o*4+3]=(M.hi?mxSS(.35,.65,cv[o]):cv[o])*255|0;mx.putImageData(id,0,0)}
    tx.save();tx.setTransform(1,0,0,1,0,0);tx.globalCompositeOperation='source-over';tx.globalAlpha=1;tx.beginPath();tx.rect(qx0,qy0,qw,qh);tx.clip();tx.clearRect(qx0,qy0,qw,qh);tx.setTransform(r,0,0,r,-X0*r,-Y0*r);tx.fillStyle=pat;tx.fillRect(wx0,wy0,wx1-wx0,wy1-wy0);
    tx.globalCompositeOperation='destination-in';tx.imageSmoothingEnabled=true;const g2=G||{n,SP:F.SP,x0:F.x0,y0:F.y0};tx.drawImage(mc,0,0,g2.n,g2.n,g2.x0-g2.SP/2,g2.y0-g2.SP/2,g2.n*g2.SP,g2.n*g2.SP);tx.restore();
    x.save();x.setTransform(1,0,0,1,0,0);x.globalAlpha=M.a||1;x.drawImage(MX.tc,qx0,qy0,qw,qh,qx0,qy0,qw,qh);x.restore();
    if(G&&M.rim){const n2=G.n,V=G.v,rc=mxCv('mkr',n2,n2),rx=rc.getContext('2d'),id=rx.createImageData(n2,n2),D=id.data,c1=M.rim[0],c2=M.rim[1],ka=M.rk||[150,70];
      for(let j=2;j<n2-2;j++)for(let i=2;i<n2-2;i++){const o=j*n2+i,v=V[o];if(v<.02)continue;const u=V[o-n2*2-1],dd=V[o+n2*2+1],dk=v-u,lt=v-dd,p=o*4;if(dk<=0&&lt<=0)continue;
        if(dk>=lt){D[p]=c1[0];D[p+1]=c1[1];D[p+2]=c1[2];D[p+3]=dk*ka[0]}else{D[p]=c2[0];D[p+1]=c2[1];D[p+2]=c2[2];D[p+3]=lt*ka[1]}}
      rx.putImageData(id,0,0);x.drawImage(rc,0,0,n2,n2,G.x0-G.SP/2,G.y0-G.SP/2,n2*G.SP,n2*G.SP)}
    if(G&&M.fr&&!LQ)try{mxFringe(x,G,M.fr,curMap*7+J.cov.length,M.frd)}catch(e){}return false}
  if(J.st===2){try{if(typeof depOn==='function'&&depOn())depPaintChunk(J.c,J.cx,J.cy,r)}catch(e){}J.st=3;return false}
  if(J.st===3){const mc=mxCv('mk',n,n),mx=mc.getContext('2d'),id=mx.createImageData(n,n),D=id.data,lcv=mxCv('mkl',n,n),lx=lcv.getContext('2d'),idl=lx.createImageData(n,n),DL=idl.data,sl=C.sl===undefined?1:C.sl,A=C.amp||130,hh=new Float32Array(N);for(let o=0;o<N;o++){let e=F.h[o]*A;for(const[M,cv]of J.cov)if(M.e)e+=M.e*cv[o];hh[o]=e}
    const L=MX.L,kl=(C.kl||.2)*255,ks=(C.ks||.3)*255,lc=C.lit,sc=C.shd,ao=C.ao||.5,ff=C.ff||.12,cs=C.cs||.26,dp=C.dap||0,isp=1/(2*F.SP);
    for(let j=0;j<n;j++)for(let i=0;i<n;i++){const o=j*n+i,gx=(i>0&&i<n-1)?(hh[o+1]-hh[o-1])*isp:0,gy=(j>0&&j<n-1)?(hh[o+n]-hh[o-n])*isp:0;
      const nl=Math.sqrt(gx*gx+gy*gy+1),dt=(-gx*L[0]-gy*L[1]+L[2])/nl-L[2];let v=dt*2.4-F.a[o]*ao-F.d[o]*ff-F.s[o]*cs;if(dp)v+=dp*F.d[o]*mxSS(.62,.76,F.z[o])*(1-F.s[o]);const p=o*4;
      if(v>=0){if(sl){DL[p]=lc[0];DL[p+1]=lc[1];DL[p+2]=lc[2];DL[p+3]=Math.min(255,v*kl*1.7)}else{D[p]=lc[0];D[p+1]=lc[1];D[p+2]=lc[2];D[p+3]=Math.min(255,v*kl)}}else{D[p]=sc[0];D[p+1]=sc[1];D[p+2]=sc[2];D[p+3]=Math.min(255,-v*ks)}}
    mx.putImageData(id,0,0);x.drawImage(mc,0,0,n,n,F.x0-F.SP/2,F.y0-F.SP/2,n*F.SP,n*F.SP);
    /* แสงฝั่งรับแดด: ผสมแบบ soft-light → สว่างขึ้นแต่สียังอิ่ม (ไม่เป็นหมอกขาว) */
    if(sl){lx.putImageData(idl,0,0);x.save();x.globalCompositeOperation='soft-light';x.drawImage(lcv,0,0,n,n,F.x0-F.SP/2,F.y0-F.SP/2,n*F.SP,n*F.SP);x.restore()}J.st=4;return false}
  if(J.st===4){try{if(C.dk)mxDecor(x,X0,Y0,CS,C)}catch(e){}try{if(!LQ||C.ugLQ)mxUnder(x,X0,Y0,CS)}catch(e){}J.st=5;return false}
  if(J.st===5){try{if(C.vm!==0)mxBakeVM(x,X0,Y0,CS,r,C)}catch(e){console.warn('mxVM',e)}try{if(C.post)C.post(x,X0,Y0,CS,F)}catch(e){}J.st=6;return true}
  return true}
function mxFinish(J){GX.ch.set(J.k,J.c);while(GX.ch.size>(MX.cap||24))GX.ch.delete(GX.ch.keys().next().value);MX.done.set(J.k,performance.now());if(MX.done.size>64)MX.done.delete(MX.done.keys().next().value);MX.jobs.delete(J.k);MX.nb++;J.x=null;J.F=null;J.cov=null}
/* ทำงานตามงบเวลา: ชังก์ที่เห็นบนจอก่อน แล้วค่อยวงรอบนอก */
function mxRun(budget){const t0=performance.now();let any=1;while(any&&performance.now()-t0<budget){any=0;let best=null;for(const J of MX.jobs.values()){if(!best||J.vis>best.vis||(J.vis===best.vis&&J.st>best.st))best=J}
    if(!best)break;any=1;const ts=performance.now();let done=false;try{done=mxStep(best)}catch(e){console.warn('mxStep',e);done=true;best.c=best.c||mxPrev(best.cx,best.cy,best.r)}MX.bt+=performance.now()-ts;if(done)mxFinish(best)}}
/* วาดพื้น (แทน gxGround เมื่อเปิดธีมใหม่): ชังก์เสร็จแล้ว → วาด · ยังไม่เสร็จ → ภาพพื้นฐาน + จางเข้าเมื่อเสร็จ */
function mxGround(MP){const th=gxTheme();if(!th)return false;mxTrees();try{if(VMK[curMap]&&VM.k!==curMap)vmBuild()}catch(e){}
  GX.CS=384;const CS=GX.CS,M=g.getTransform(),s=M.a,r=Math.min(2,Math.ceil(s*2-.001)/2),ex=Math.round(M.e),ey=Math.round(M.f),dw=CS*s,now=performance.now();MX.r=r;
  const x0=Math.floor((cam.x-24)/CS),x1=Math.floor((cam.x+W+24)/CS),y0=Math.floor((cam.y-24)/CS),y1=Math.floor((cam.y+H+24)/CS);
  const first=now-(MX.ft||0)>4;if(first){MX.ft=now;for(const J of MX.jobs.values())J.vis=0}
  g.save();g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=true;
  for(let cy=Math.max(0,y0);cy<=y1;cy++)for(let cx=Math.max(0,x0);cx<=x1;cx++){if(cx*CS>=WW||cy*CS>=WH)continue;const k=mxKey(cx,cy,r),X=ex+Math.round(cx*dw),Y=ey+Math.round(cy*dw),D=Math.round(dw);let c=GX.ch.get(k);
    if(c){GX.ch.delete(k);GX.ch.set(k,c);const td=MX.done.get(k),a=td?Math.min(1,(now-td)/280):1;if(a<1){mxPrevDraw(cx,cy,X,Y,D,s,ex,ey);g.globalAlpha=a;g.drawImage(c,X,Y,D,D);g.globalAlpha=1}else{g.drawImage(c,X,Y,D,D);if(td)MX.done.delete(k)}}
    else{mxJob(cx,cy,r,1);mxPrevDraw(cx,cy,X,Y,D,s,ex,ey)}}
  g.restore();
  if(first){/* วงนอกตามทิศเดิน (สร้างล่วงหน้า) */const vx=cam.x-MX.lc.x,vy=cam.y-MX.lc.y;MX.lc.x=cam.x;MX.lc.y=cam.y;const dx=vx>.3?1:vx<-.3?-1:0,dy=vy>.3?1:vy<-.3?-1:0;
    if(dx||dy){for(let cy=y0-1;cy<=y1+1;cy++){const cx=dx>0?x1+1:dx<0?x0-1:null;if(cx!==null&&cx>=0&&cy>=0&&cx*CS<WW&&cy*CS<WH&&!GX.ch.has(mxKey(cx,cy,r)))mxJob(cx,cy,r,0)}for(let cx=x0-1;cx<=x1+1;cx++){const cy=dy>0?y1+1:dy<0?y0-1:null;if(cy!==null&&cx>=0&&cy>=0&&cx*CS<WW&&cy*CS<WH&&!GX.ch.has(mxKey(cx,cy,r)))mxJob(cx,cy,r,0)}}
    for(const J of MX.jobs.values())if(!J.vis&&(J.r!==r||J.cx<x0-2||J.cx>x1+2||J.cy<y0-2||J.cy>y1+2))MX.jobs.delete(J.k);
    const lq=LOWQ||(typeof LITEQ!=='undefined'&&LITEQ),vis=[...MX.jobs.values()].some(J=>J.vis);mxRun(vis?(MX.jt0===undefined?(MX.jt0=now,40):now-MX.jt0<1500?(lq?14:22):(lq?6:9)):(lq?4:6));if(!vis)MX.jt0=undefined}
  return true}
/* ชังก์นี้เสร็จแล้วหรือยัง (ใช้ตัดสินว่าของประดับถูกอบลงพื้นแล้ว) */
function mxDoneAt(x,y){const CS=GX.CS||384;return GX.ch.has(mxKey(Math.floor(x/CS),Math.floor(y/CS),MX.r||2))}

/* ===== สไปรต์ (ความละเอียด 2x) ===== */
function mxDSpr(k,w,h,fn){const K=MX.v+k;if(MX.dsp[K])return MX.dsp[K];const c=document.createElement('canvas');c.width=Math.ceil(w*2);c.height=Math.ceil(h*2);const x=c.getContext('2d');x.scale(2,2);x.lineCap='round';x.lineJoin='round';fn(x,w,h);return MX.dsp[K]={c,w,h}}
function mxTuftSpr(k,pal,h,n,sd){return mxDSpr(k,h*1.6+6,h+4,(x,w,hh)=>{const R=gxRng(sd);x.fillStyle='rgba(0,0,0,.22)';x.beginPath();x.ellipse(w/2+1,hh-2.2,w*.36,1.6,0,0,7);x.fill();
  for(let b=0;b<n;b++){const f=b/(n-1),bx=w/2+(f-.5)*n*1.1,L=h*(.6+R()*.4),ln=(f-.5)*h*.7+(R()-.5)*1.5,ww=.9+R()*.4,c=f<.34?pal[2]:f<.67?pal[1]:pal[0];x.fillStyle=mxRgb(c);x.beginPath();x.moveTo(bx-ww,hh-2);x.quadraticCurveTo(bx-ww*.25+ln*.45,hh-2-L*.55,bx+ln,hh-2-L);x.quadraticCurveTo(bx+ww*.35+ln*.45,hh-2-L*.5,bx+ww,hh-2);x.closePath();x.fill()}})}
function mxStoneSpr(k,c,w,h,o){o=o||{};return mxDSpr(k,w+4,h+4,(x,W,H)=>{const R=gxRng(k.length*97+(c[0]|0)),cx=W/2,cy=H/2+.5,P=[];const n=o.sharp?6:12;for(let i=0;i<n;i++){const a=i/n*6.283,rr=(o.sharp?.78+R()*.3:.92+R()*.12);P.push([cx+Math.cos(a)*w/2*rr,cy+Math.sin(a)*h/2*rr])}
  x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(cx+w*.12,cy+h*.28,w*.5,h*.36,0,0,7);x.fill();
  const gr=x.createLinearGradient(cx-w/2,cy-h/2,cx+w*.35,cy+h/2);gr.addColorStop(0,mxRgb(mxMix(c,MXW,.32)));gr.addColorStop(.5,mxRgb(c));gr.addColorStop(1,mxRgb(mxMix(c,MXK,.42)));x.fillStyle=gr;x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill();
  x.strokeStyle=mxRgb(mxMix(c,MXK,.55),.7);x.lineWidth=.5;x.stroke();if(o.top){x.fillStyle=mxRgb(o.top,o.ta||.85);x.beginPath();x.ellipse(cx-w*.06,cy-h*.2,w*.34,h*.2,0,0,7);x.fill()}
  x.fillStyle='rgba(255,255,255,.25)';x.beginPath();x.ellipse(cx-w*.18,cy-h*.2,w*.18,h*.1,-.3,0,7);x.fill()})}

/* ===== ของประดับเล็กเดิม (decor) อบลงพื้นด้วยภาพใหม่ ตำแหน่งเดิม ===== */
function mxDecor(x,X0,Y0,CS,C){const D=MXDC[C.k];if(!D)return;const m=16;for(const d of decor){if(d.x<X0-m||d.x>X0+CS+m||d.y<Y0-m||d.y>Y0+CS+m)continue;if(curMap===1&&Math.hypot(d.x-CX,d.y-CY)<CAMP.R+12)continue;const f=D[d.t];if(!f)continue;const q=f(d);if(!q)continue;const[s,sc]=q;x.drawImage(s.c,d.x-s.w*sc/2,d.y-s.h*sc*.8,s.w*sc,s.h*sc)}}
function mxUnder(x,X0,Y0,CS){const C=MXC[curMap],U=MXU[C.ug];if(!U)return;const T=MX.trs||[],m=60,K=C.ugk||[2,4];
  for(const t of T){if(t.x<X0-m||t.x>X0+CS+m||t.y<Y0-m||t.y>Y0+CS+m)continue;const r=t.r||18,R=gxRng(((t.x*73)|0)^((t.y*151)|0)),k=K[0]+(R()*(K[1]-K[0]+1)|0),by=t.y+r*(C.uby||.7);
    for(let i=0;i<k;i++){const a=(R()-.5)*3+(R()<.5?0:3.14),dd=r*(.5+R()*.55),X=t.x+Math.cos(a)*dd,Y=by+Math.abs(Math.sin(a))*dd*.25+R()*r*.18,s=U[(R()*U.length)|0](),sc=.85+R()*.35;x.drawImage(s.c,X-s.w*sc/2,Y-s.h*sc*.9,s.w*sc,s.h*sc)}}}
function mxFringe(x,G,kind,sd,den){const U=MXU[kind];if(!U)return;const R=gxRng(sd*131+(G.x0|0)*7+(G.y0|0)*13),n=G.n,v=G.v,dn=den||1;
  for(let j=2;j<n-2;j+=2)for(let i=2;i<n-2;i+=2){const o=j*n+i,c=v[o];if(c<.2||c>.8)continue;const up=v[o-n*2]<c;if(R()>(up?.7:.3)*dn)continue;const X=G.x0+i*G.SP+(R()-.5)*2,Y=G.y0+j*G.SP+(R()-.5)*2,s=U[(R()*Math.min(2,U.length))|0](),sc=.55+R()*.35;x.drawImage(s.c,X-s.w*sc/2,Y-s.h*sc*.85,s.w*sc,s.h*sc)}}
/* ทุ่งดอกไม้ของระบบมิติฉาก: จากจุดสีกระจาย → ดอกเป็นกระจุกมีใบ (สีชุดเดิม ตำแหน่ง/ขนาดเดิม) */
function mxMeadow(c,f){const cols=[['#f4e46a','#fff8c8'],['#ec78a6','#ffe0ea'],['#fbfbf4','#ffe27a'],['#a4c0ff','#eef2ff'],['#ff9e58','#ffe6c8']][f.v%5],R=depRng((f.x|0)*7+(f.y|0)*13+3);
  const gr=c.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);gr.addColorStop(0,'rgba(150,206,96,.2)');gr.addColorStop(1,'rgba(150,206,96,0)');c.fillStyle=gr;c.beginPath();c.ellipse(f.x,f.y,f.r,f.r*.7,0,0,7);c.fill();
  const nc=Math.round(f.r/7);for(let i=0;i<nc;i++){const a=R()*6.283,d=Math.pow(R(),.7)*f.r*.92,X=f.x+Math.cos(a)*d,Y=f.y+Math.sin(a)*d*.7,k=2+(R()*4|0);
    for(let q=0;q<k;q++){const fx=X+(R()-.5)*9,fy=Y+(R()-.5)*5;c.fillStyle='rgba(44,90,34,.95)';c.beginPath();c.ellipse(fx-1.3,fy+1.7,1.6,.6,-.5,0,7);c.ellipse(fx+1.3,fy+1.9,1.5,.55,.5,0,7);c.fill()}
    for(let q=0;q<k;q++){const fx=X+(R()-.5)*9,fy=Y+(R()-.5)*5,fr=.8+R()*.45,cc=R()<.78?cols[0]:cols[1];c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.arc(fx+.6,fy+.8,fr*1.8,0,7);c.fill();c.fillStyle=cc;for(let p=0;p<5;p++){const b=p*1.2566+q;c.beginPath();c.arc(fx+Math.cos(b)*fr*1.15,fy+Math.sin(b)*fr,fr,0,7);c.fill()}c.fillStyle=cc===cols[0]?cols[1]:cols[0];c.beginPath();c.arc(fx,fy,fr*.55,0,7);c.fill()}}}

/* ===== ต้นไม้/หิน: สไปรต์แคชตาม (ชนิด,ขนาด,แบบ) ===== */
function mxSprite(key,w,h,ax,ay,fn){let s=MX.tsp[key];if(s)return s;const S=2,c=document.createElement('canvas');c.width=Math.ceil(w*S);c.height=Math.ceil(h*S);const x=c.getContext('2d');x.scale(S,S);x.lineCap='round';x.lineJoin='round';fn(x,w,h);return MX.tsp[key]={c,w,h,ax,ay}}
function mxBlit(s,X,Y,sc,sk){g.save();g.translate(X,Y);if(sk)g.transform(1,0,sk,1,0,0);g.drawImage(s.c,-s.ax*sc,-s.ay*sc,s.w*sc,s.h*sc);g.restore()}
function mxTree(t,r,sw,now,MP){if(t.k||t.pp||t.inv||!mxOn())return false;const C=MXC[curMap],f=C&&C.tree&&MXTR[C.tree];if(!f)return false;return f(t,r,sw,now,C)!==false}

/* ===== รังมอน: ปากโพรงมีขอบดิน เสี้ยนแหลมตามธีม (ขนาด/ตำแหน่งเดิม) ===== */
function mxNestSpr(){const C=MXC[curMap],N0=MXNS[C.k]||MXNS.def,key='nest'+C.k+'|'+curMap;let d2=null;try{d2=gxHex(MAPS[curMap].d2)}catch(e){}const N=Object.assign({},N0,d2?{sp:d2}:{});return mxSprite(key,150,130,75,72,(x,w,h)=>{const cx=75,cy=72,R=gxRng(curMap*7+3);
  /* เงามืดอมแดงแบบเดิม (เอกลักษณ์รัง) */const g0=x.createRadialGradient(cx,cy,6,cx,cy,60);g0.addColorStop(0,'rgba(28,8,10,.75)');g0.addColorStop(.75,'rgba(24,8,10,.42)');g0.addColorStop(1,'rgba(20,8,10,0)');x.fillStyle=g0;x.beginPath();x.ellipse(cx,cy,60,58,0,0,7);x.fill();
  const g1=x.createRadialGradient(cx,cy,10,cx,cy,64);g1.addColorStop(0,mxRgb(N.rim,0));g1.addColorStop(.55,mxRgb(N.rim,.55));g1.addColorStop(.8,mxRgb(N.rim,.3));g1.addColorStop(1,mxRgb(N.rim,0));x.fillStyle=g1;x.beginPath();x.ellipse(cx,cy,64,48,0,0,7);x.fill();
  for(let i=0;i<26;i++){const a=R()*6.283,d=30+R()*24,s=1.5+R()*3;x.fillStyle=mxRgb(mxMix(N.rim,MXW,.18+R()*.15),.9);x.beginPath();x.ellipse(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.72,s,s*.65,R()*3,0,7);x.fill();x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(cx+Math.cos(a)*d+s*.3,cy+Math.sin(a)*d*.72+s*.5,s*.8,s*.4,0,0,7);x.fill()}
  x.fillStyle=mxRgb(mxMix(N.rim,MXK,.35));x.beginPath();x.ellipse(cx,cy+2,25,18,0,0,7);x.fill();const g2=x.createRadialGradient(cx,cy+4,2,cx,cy+2,22);g2.addColorStop(0,'#030102');g2.addColorStop(.7,'#0c0608');g2.addColorStop(1,mxRgb(mxMix(N.rim,MXK,.55)));x.fillStyle=g2;x.beginPath();x.ellipse(cx,cy+3,21,15,0,0,7);x.fill();
  x.strokeStyle=mxRgb(mxMix(N.rim,MXW,.3),.55);x.lineWidth=1.2;x.beginPath();x.ellipse(cx,cy+1,23,16.5,0,Math.PI*1.08,Math.PI*1.92);x.stroke();
  for(let q=0;q<7;q++){const a=q*.9,sx=cx+Math.cos(a)*44,sy=cy+Math.sin(a)*44*.72,hh=14+R()*6,ww=4.5+R()*1.5,lean=Math.cos(a)*3;
    x.fillStyle='rgba(0,0,0,.32)';x.beginPath();x.ellipse(sx+3,sy+2,ww*1.3,2.2,0,0,7);x.fill();
    const gr=x.createLinearGradient(sx-ww,0,sx+ww,0);gr.addColorStop(0,mxRgb(mxMix(N.sp,MXW,.3)));gr.addColorStop(.5,mxRgb(N.sp));gr.addColorStop(1,mxRgb(mxMix(N.sp,MXK,.45)));x.fillStyle=gr;x.beginPath();x.moveTo(sx-ww,sy+1);x.lineTo(sx+lean,sy-hh);x.lineTo(sx+ww,sy+1);x.closePath();x.fill();
    x.strokeStyle=mxRgb(mxMix(N.sp,MXK,.6),.7);x.lineWidth=.6;x.stroke();x.fillStyle=mxRgb(mxMix(N.rim,MXK,.2));x.beginPath();x.ellipse(sx,sy+1,ww*1.15,2,0,0,7);x.fill()}
  if(N.bone)for(let i=0;i<5;i++){const a=R()*6.283,d=32+R()*14,bx=cx+Math.cos(a)*d,by=cy+Math.sin(a)*d*.7;x.save();x.translate(bx,by);x.rotate(R()*3);x.fillStyle=mxRgb(N.bone);x.fillRect(-4,-.8,8,1.6);x.beginPath();x.arc(-4,0,1.3,0,7);x.arc(4,0,1.3,0,7);x.fill();x.restore()}})}
function mxNest(MP){if(!mxOn()||!MP.nests)return false;const s=mxNestSpr(),t=performance.now(),N=MXNS[MXC[curMap].k]||MXNS.def;
  for(const[nx,ny]of MP.nests){if(nx<cam.x-80||nx>cam.x+W+80||ny<cam.y-80||ny>cam.y+H+80)continue;g.drawImage(s.c,nx-s.ax,ny-s.ay,s.w,s.h);
    /* วงประแดงเดิม (บอกเขตรัง) คงไว้ */g.setLineDash([6,5]);g.strokeStyle='rgba(194,53,43,.42)';g.lineWidth=2;g.beginPath();g.arc(nx,ny,52,0,7);g.stroke();g.setLineDash([]);
    const ek=.5+.5*Math.sin(t/260+nx);g.save();g.globalCompositeOperation='lighter';glowAt(nx,ny+3,17,N.gl||'255,110,50',.35+ek*.3);g.restore()}
  return true}
MXNS.def={rim:[70,56,44],sp:[150,140,124]};

/* ===== เงาเมฆลอยผ่าน (แทนเงาก้อนเดิม) + เอฟเฟกต์โลกรายธีม ===== */
function mxCloudSpr(v){const k='cl'+v;if(MX[k])return MX[k];const W2=256,H2=170,c=document.createElement('canvas');c.width=W2;c.height=H2;const x=c.getContext('2d'),id=x.createImageData(W2,H2),D=id.data;
  for(let j=0;j<H2;j++)for(let i=0;i<W2;i++){const u=(i/W2-.5)*2,w2=(j/H2-.5)*2,e=1-Math.min(1,Math.hypot(u,w2*1.05)),n=mxF(i/46+v*9,j/46,900+v,4),a=mxSS(.32,.62,e*.9+n*.55-.28);D[(j*W2+i)*4+3]=a*255}
  x.putImageData(id,0,0);x.globalCompositeOperation='source-in';x.fillStyle='rgb(14,24,40)';x.fillRect(0,0,W2,H2);return MX[k]=c}
function mxClouds(){const C=MXC[curMap];try{if(C.wfx)C.wfx(performance.now()/1000)}catch(e){}if(LOWQ||(typeof LITEQ!=='undefined'&&LITEQ)||C.cla===0)return;let h=12;try{h=dnHour()}catch(e){}if(h<6.3||h>18.7)return;const k=Math.min(1,(h-6.3)/1.2,(18.7-h)/1.2),a=(C.cla===undefined?.13:C.cla)*k;if(a<=0)return;
  const t=performance.now()/1000,sp=C.clv||9;g.save();
  for(let i=0;i<7;i++){const s=3.4+(i%3)*1.1,cw=256*s,ch=170*s,span=3200+cw,sx=((i*1013+t*sp)%span+span)%span-cw*.5,sy=(i*1597)%3400-200+(t*sp*.35)%3400,yy=((sy%(3400+ch))+3400+ch)%(3400+ch)-ch*.5;
    if(sx+cw*.5<cam.x||sx-cw*.5>cam.x+W||yy+ch*.5<cam.y||yy-ch*.5>cam.y+H)continue;g.globalAlpha=a;g.drawImage(mxCloudSpr(i%3),sx-cw*.5,yy-ch*.5,cw,ch)}g.restore()}

/* ===== แสงแดดอุ่นบนซ้าย/เงาเย็นล่างขวา (จอ) ===== */
function mxGrade(){if(!mxOn()||LOWQ||(typeof LITEQ!=='undefined'&&LITEQ))return;const C=MXC[curMap];if(C.gw===0)return;let h=12;try{h=dnHour()}catch(e){}const day=C.ind?1:Math.max(0,Math.min(1,(h-6)/1.5,(18.8-h)/1.5));if(day<=0)return;const wc=C.gwc||'255,236,180',cc=C.gcc||'30,50,90';
  g.save();g.setTransform(DPR,0,0,DPR,0,0);g.globalCompositeOperation='soft-light';const gr=g.createLinearGradient(0,0,SW0*.7,H);gr.addColorStop(0,'rgba('+wc+','+(.34*day*(C.gw||1))+')');gr.addColorStop(.55,'rgba(128,128,128,0)');gr.addColorStop(1,'rgba('+cc+','+(.3*day*(C.gc||1))+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);g.restore()}


/* ===== ของประดับชั้นพื้น (VM) ที่นิ่ง → สไปรต์แคช (ลงแสงบนซ้าย/เงาล่างขวา) อบลงชังก์ + เงาสัมผัสนุ่ม · ของที่ขยับยังวาดรายเฟรมตามเดิม ===== */
const MXVA={charstump:1,gmush:1,gmushP:1,flower:1,grassT:1,reeds:1,lily:1,vent:1,icecl:1,crystalP:1,crystalB:1,crystalV:1,crystalS:1,crystalA:1,runest:1,candle:1,weed:1,ore:1,lantern:1,banner:1,floatR:1,
  puddle:1,lava:1,ice:1,glowP:1,glowB:1,glowV:1,glowS:1,glowA:1,caustic:1,starpool:1,swamp:1};
const MXVB=n=>r=>((Math.min(n-1,r*n|0))+.5)/n;
const MXVR={fbush:MXVB(4),dshrub:MXVB(4),mush:r=>r<.5?.25:.75,bones:MXVB(4),coral:MXVB(3),rubble:MXVB(4),cactus:r=>r<.3?.15:.65,pot:r=>r<.4?.2:.7,pillarB:MXVB(5),gear:MXVB(4),tomb:MXVB(4),sword:MXVB(4),roots:MXVB(4)};
function mxVMSplit(){if(MX.vmK===VM.P&&MX.vmKD===VM.D)return;MX.vmK=VM.P;MX.vmKD=VM.D;MX.vmS=VM.P.filter(o=>!MXVA[o.k]);MX.vmDS=VM.D.filter(o=>!MXVA[o.k])}
function mxShSpr(){if(MX.shs)return MX.shs;const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d'),gr=q.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(.5,'rgba(0,0,0,.55)');gr.addColorStop(1,'rgba(0,0,0,0)');q.fillStyle=gr;q.fillRect(0,0,64,64);return MX.shs=c}
function mxVMSpr(o,C){const sB=Math.max(.5,Math.round((o.s||1)*4)/4),rf=MXVR[o.k],rB=rf?rf(o.r||0):0,f=o.f||1,key=curMap+'|'+o.k+'|'+sB+'|'+rB+'|'+f;let s=MX.vsp.get(key);if(s)return s;
  const fn=(typeof MXVP!=='undefined'&&MXVP[o.k])||VMP[o.k];if(!fn)return null;const bw=Math.ceil(64*sB),bh=Math.ceil(60*sB),S=2,c=document.createElement('canvas');c.width=bw*S;c.height=bh*S;const x=c.getContext('2d'),G0=g;x.setTransform(S,0,0,S,0,0);x.lineWidth=1;
  const fo={k:o.k,x:bw/2,y:bh*.72,s:sB,r:rf?rB:(o.r||.5),r2:.5,f};g=x;try{fn(fo,0)}catch(e){}finally{g=G0}
  const nw=typeof MXVP!=='undefined'&&MXVP[o.k],lt=C.plit||[255,250,230,nw?.12:.2],dk=C.pdrk||[0,4,24,nw?.16:.3];x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='source-atop';const gr=x.createLinearGradient(c.width*.28,0,c.width*.62,c.height*.95);gr.addColorStop(0,'rgba('+lt[0]+','+lt[1]+','+lt[2]+','+lt[3]+')');gr.addColorStop(.45,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba('+dk[0]+','+dk[1]+','+dk[2]+','+dk[3]+')');x.fillStyle=gr;x.fillRect(0,0,c.width,c.height);
  if(C.ptint){x.fillStyle='rgba('+C.ptint+')';x.fillRect(0,0,c.width,c.height)}x.globalCompositeOperation='source-over';s={c,w:bw,h:bh,ax:bw/2,ay:bh*.72,sB};MX.vsp.set(key,s);while(MX.vsp.size>220)MX.vsp.delete(MX.vsp.keys().next().value);return s}
function mxBakeVM(x,X0,Y0,CS,r,C){if(!VMK[curMap])return;if(VM.k!==curMap)vmBuild();mxVMSplit();const m=60,G0=g;
  g=x;try{x.save();for(const o of MX.vmDS){if(o.x<X0-m||o.x>X0+CS+m||o.y<Y0-m||o.y>Y0+CS+m)continue;const f=VMD[o.k];if(f)try{f(o,0)}catch(e){}}x.restore()}finally{g=G0}
  const sh=mxShSpr();for(const o of MX.vmS){if(o.x<X0-m||o.x>X0+CS+m||o.y<Y0-m||o.y>Y0+CS+m)continue;const s=mxVMSpr(o,C);if(!s)continue;const k=s.sB;
    x.globalAlpha=.3;x.drawImage(sh,o.x-14*k+2,o.y-4.5*k+1.5,28*k,9*k);x.globalAlpha=1;x.drawImage(s.c,o.x-s.ax,o.y-s.ay,s.w,s.h)}}

/* ===== เปิดใช้ ===== */
function mxOn(){if(!MX.on||!MXC[curMap])return false;try{if(isDg()||isTw()||isArena())return false}catch(e){return false}return true}
setTimeout(()=>{
  try{const _gg=gxGround;window.gxGround=gxGround=function(MP){const on=mxOn();window.MXDS=on&&MXC[curMap].dk?MXC[curMap].dk:null;if(on){try{return mxGround(MP)}catch(e){console.warn('mxGround',e)}}return _gg.apply(this,arguments)}}catch(e){}
  try{const _dp=depPaintF;window.depPaintF=depPaintF=function(c,f,th){if(f&&mxOn()){const C=MXC[curMap];if(f.k==='meadow'&&C.mr)return mxMeadow(c,f);if(C.dep&&C.dep[f.k])return C.dep[f.k](c,f,th)}return _dp.apply(this,arguments)}}catch(e){}
  try{const _pg=plxGround;window.plxGround=plxGround=function(){if(mxOn())return mxClouds();return _pg.apply(this,arguments)}}catch(e){}
  try{const _ga=gxAtmo;window.gxAtmo=gxAtmo=function(){const r=_ga.apply(this,arguments);try{mxGrade()}catch(e){}return r}}catch(e){}
  try{const _vg=vmGround;window.vmGround=vmGround=function(){if(mxOn()&&MXC[curMap].vm!==0&&VM.k===curMap&&VM.P){const P=VM.P,D=VM.D,y0=cam.y-60,y1=cam.y+H+60,x0=cam.x-50,x1=cam.x+W+50,L=[],LD=[];
      for(const o of P){if(o.y<y0)continue;if(o.y>y1)break;if(o.x<x0||o.x>x1)continue;if(MXVA[o.k]||!mxDoneAt(o.x,o.y))L.push(o)}
      for(const o of D){if(o.x<x0||o.x>x1||o.y<y0||o.y>y1)continue;if(MXVA[o.k]||!mxDoneAt(o.x,o.y))LD.push(o)}
      VM.P=L;VM.D=LD;try{return _vg.apply(this,arguments)}finally{if(VM.P===L)VM.P=P;if(VM.D===LD)VM.D=D}}return _vg.apply(this,arguments)}}catch(e){}
  const ns=()=>{try{const C=MXC[curMap];if(C&&C.tree&&MXTR[C.tree])for(const t of trees)if(!t.k&&!t.pp)t.ns=1}catch(e){}};
  try{const _bt=buildTrees;window.buildTrees=buildTrees=function(){const r=_bt.apply(this,arguments);try{MX.sig='';mxTrees();ns()}catch(e){}return r}}catch(e){}
  try{MX.sig='';mxTrees();ns()}catch(e){}},0);
