/* ===== v670 · จัดธรรมชาติแมพ 1 ให้สมจริง =====
   - ลำธาร: เดิมไหลทะลุที่ราบสูง (400,800) แล้วตกหน้าผาแบบไม่มีน้ำตก → เปลี่ยนต้นลำธารให้อ้อมขอบเหนือ/ตะวันออกของที่ราบ แล้วไหลลงมาบรรจบทางเดิม
   - ต้นไม้/หิน/พุ่ม (NAT) และของประดับ (VM: หิน ตอ ขอน พุ่ม เห็ด ดอกไม้): เอาออกถ้าอยู่ในลำธาร/ริมตลิ่ง · ขวางทางเดิน · ขวางบันได · ชิดหน้าผา/ขอบที่ราบ · ทับรังมอน
   - ของประดับ VM แมพ 1 ใช้ภาพวาดชุดค่ายแทนหินเทาเรียบ (หิน ตอไม้ ขอนไม้ พุ่ม เห็ด ดอกไม้ หญ้าสูง)
   - ทุ่งดอกไม้ใช้ภาพวาด (เดิมถูกตัววาดแผนที่ v554 แย่งวาดก่อน) */
function cpSegD(P,x,y){let d=1e9;for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i],dx=b[0]-a[0],dy=b[1]-a[1],l2=dx*dx+dy*dy||1,t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/l2));d=Math.min(d,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return d}
function cpSpline(C,n){const out=[];for(let i=0;i<C.length-1;i++){const p0=C[Math.max(0,i-1)],p1=C[i],p2=C[i+1],p3=C[Math.min(C.length-1,i+2)];for(let k=0;k<n;k++){const t=k/n,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);out.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}out.push(C[C.length-1].slice());return out}
/* ต้นลำธารใหม่อ้อมที่ราบสูง */
depBuild=(f0=>function(){const F=f0.apply(this,arguments);try{if(curMap===1&&F&&F.L&&!F._cp10){F._cp10=1;const s=F.L.find(f=>f.k==='stream');if(s){const P=s.pts,i=P.findIndex(([x,y])=>x>=740&&y>=1060);
      if(i>0){const head=cpSpline([[0,600],[130,585],[270,570],[410,566],[540,580],[642,632],[700,722],[712,830],[705,940],[728,1028],P[i]],9);s.pts=head.concat(P.slice(i+1));s.bb=depBB(s.pts,s.w+40);
        const q=F.L.find(f=>f.k==='cpx');if(q){const L=q.L.filter(e=>e[0]!=='STEPPING_STONES');const j=s.pts.length*.86|0,[x,y]=s.pts[j];L.push(['STEPPING_STONES',x,y+16,48,0]);q.L=L.sort((a,b)=>a[2]-b[2])}}}}}catch(e){console.warn('cp10 stream',e)}return F})(depBuild);
/* เกณฑ์ "วางผิดธรรมชาติ" */
function cpBad(x,y,r,kind){try{const F=depBuild();for(const f of F.L){if(f.k==='stream'&&cpSegD(f.pts,x,y)<f.w/2+(kind==='t'?r+10:r+8))return 1;if(f.k==='trail'&&cpSegD(f.pts,x,y)<f.w/2+(kind==='t'?r*.6+4:2))return 1}
    const T=terGet();if(T){for(const P of T)for(const s of P.st){const q=s.r,m=(kind==='t'?r+40:22);if(x>q[0]-m&&x<q[2]+m&&y>q[1]-m&&y<q[3]+m+(kind==='t'?30:0))return 1}
      const L0=terLv(x,y);if(L0===-1||L0===2)return 1;if(kind==='t'){if(L0===0&&(terLv(x,y-14)===-1||terLv(x,y-34)===-1))return 1;if(L0===1&&(terLv(x-r-24,y)!==1||terLv(x+r+24,y)!==1||terLv(x,y+r+34)!==1||terLv(x,y-r-14)!==1))return 1}}
    for(const[nx,ny]of(MAPS[1].nests||[]))if(Math.hypot(nx-x,ny-y)<(kind==='t'?92:64))return 1}catch(e){}return 0}
function cp10Prune(){if(curMap!==1)return 0;let n=0;for(let i=trees.length-1;i>=0;i--){const t=trees[i];if(t.inv||(t.pp&&!t.small))continue;if(cpBad(t.x,t.y,t.r,'t')){trees.splice(i,1);n++}}
  return n}
CP9.sig='';setInterval(()=>{try{if(curMap!==1)return;const sg=trees.length+'|'+(VM.k===1?VM.P.length:-1)+'|'+DEPF.m;if(sg===CP9.sig)return;const n=cp10Prune();CP9.sig=trees.length+'|'+(VM.k===1?VM.P.length:-1)+'|'+DEPF.m;if(n)MX.sig=null}catch(e){}},400);
/* ของประดับ VM → ภาพวาด */
const CPVM={rock:o=>o.r<.5?['ROCKS_SMALL',30]:['ROCK_MED',30],mrock:o=>['ROCK_BIG',40],stump:o=>['TREE_STUMP',30],log:o=>['LOG',44],bush:o=>['BUSH_ROUND',36],fbush:o=>[o.r<.5?'BUSH_FLOWER':'BUSH_BERRY',36],mush:o=>[o.r<.5?'MUSHROOMS_RED':'MUSHROOMS_BROWN',17]};
mxVMSpr=(f0=>function(o,C){if(curMap===1&&cpOk()&&CPVM[o.k]){const[k,bw]=CPVM[o.k](o),r=CPG.M[k];if(r){const sc=(o.s||1.5)/1.5,w=Math.round(bw*sc),key='cpvm|'+k+'|'+w+'|'+(o.f||1);let s=MX.vsp.get(key);if(s)return s;const h=w*r[3]/r[2],S=2,c=document.createElement('canvas');c.width=Math.ceil(w*S);c.height=Math.ceil(h*S);const x=c.getContext('2d');if((o.f||1)<0){x.translate(c.width,0);x.scale(-1,1)}x.drawImage(CPG.I.a,r[0],r[1],r[2],r[3],0,0,c.width,c.height);
      s={c,w,h,ax:w/2,ay:h*.94,sB:sc*1.4};MX.vsp.set(key,s);return s}}return f0.apply(this,arguments)})(mxVMSpr);
try{for(const[kk,pick]of[['flower',o=>[['FLOWERS_RED','FLOWERS_BLUE','FLOWERS_YELLOW'][(o.r*3)|0],18]],['grassT',o=>[o.r<.6?'TALL_GRASS':'FERN',22]]]){const f0=VMP[kk];if(!f0)continue;VMP[kk]=function(o,t){if(curMap===1&&cpOk()){const[k,w]=pick(o),r=CPG.M[k];if(r){const ww=w*(o.s||1.4)/1.4,h=ww*r[3]/r[2],sw=Math.sin((t||0)*1.6+o.x*.05)*.06;g.save();g.translate(o.x,o.y);g.transform(1,0,sw,1,0,0);if(o.f<0)g.scale(-1,1);g.drawImage(CPG.I.a,r[0],r[1],r[2],r[3],-ww/2,-h*.94,ww,h);g.restore();return}}return f0.apply(this,arguments)}}}catch(e){}
/* ทุ่งดอกไม้ภาพวาด (ห่อทับตัววาดแผนที่ที่ห่อ depPaintF ไว้ตอนเริ่ม) */
setTimeout(()=>{try{depPaintF=(f0=>function(c,f,th){if(f&&f.k==='meadow'&&curMap===1&&cpOk()){try{cpMeadow(c,f);return}catch(e){}}return f0.apply(this,arguments)})(depPaintF);window.depPaintF=depPaintF}catch(e){}},60);
/* แอ่งน้ำ (VM) และแท่นหิน (dais) แมพ 1 → ลายน้ำ/ลายแผ่นหินภาพวาด */
try{const f0=VMD.puddle;if(f0)VMD.puddle=function(o,t){if(curMap===1&&cpOk()){const s=o.s,x=o.x,y=o.y;g.save();g.fillStyle=cpPat(g,'mud',.45);g.globalAlpha=.85;g.beginPath();g.ellipse(x,y+1,24*s,10*s,0,0,7);g.fill();g.globalAlpha=1;g.fillStyle=cpPat(g,'water',.35);g.beginPath();g.ellipse(x,y,20*s,8*s,0,0,7);g.fill();
    g.fillStyle='rgba(16,74,104,.3)';g.fill();g.strokeStyle='rgba(30,22,14,.35)';g.lineWidth=1;g.stroke();const ph=((t||0)*.5+o.r)%1;g.strokeStyle='rgba(220,240,255,'+(.5*(1-ph))+')';g.lineWidth=.8;g.beginPath();g.ellipse(x+4*s,y,ph*12*s,ph*4*s,0,0,7);g.stroke();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(x-10*s,y-3*s,6*s,1);g.restore();return}return f0.apply(this,arguments)}}catch(e){}
function cpDais(c,f){const x=f.x,y=f.y,r=f.r;c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x+8,y+14,r+8,r*.62+6,0,0,7);c.fill();c.fillStyle=cpPat(c,'plaza',.3);c.beginPath();c.ellipse(x,y+9,r,r*.6,0,0,7);c.fill();c.fillStyle='rgba(40,30,20,.45)';c.fill();
  c.save();c.beginPath();c.ellipse(x,y,r,r*.6,0,0,7);c.clip();c.fillStyle=cpPat(c,'plaza',.3);c.fillRect(x-r,y-r,r*2,r*2);const gr=c.createLinearGradient(x-r,y-r*.6,x+r,y+r*.6);gr.addColorStop(0,'rgba(255,245,220,.16)');gr.addColorStop(1,'rgba(0,0,0,.18)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2);
  c.fillStyle=cpPat(c,'grass',.5);c.beginPath();c.ellipse(x,y,r*.42,r*.25,0,0,7);c.fill();c.restore();
  c.strokeStyle='rgba(30,22,14,.55)';c.lineWidth=1.4;c.beginPath();c.ellipse(x,y,r,r*.6,0,0,7);c.stroke();c.beginPath();c.ellipse(x,y,r*.42,r*.25,0,0,7);c.stroke();c.strokeStyle='rgba(255,255,255,.3)';c.lineWidth=1.2;c.beginPath();c.ellipse(x,y,r-2,r*.6-2,0,Math.PI*1.05,Math.PI*1.95);c.stroke()}
setTimeout(()=>{try{depPaintF=(f0=>function(c,f,th){if(f&&f.k==='dais'&&curMap===1&&cpOk()){try{cpDais(c,f);return}catch(e){}}return f0.apply(this,arguments)})(depPaintF);window.depPaintF=depPaintF}catch(e){}},70);
/* จัดทันทีตอนสร้างต้นไม้/ของประดับของแมพ (ไม่รอรอบตรวจ) — ผลเหมือนกันทุกครั้งที่เข้าแมพ */
function cp10Trees(){if(curMap!==1)return;try{if(TERD[1]&&!trees.some(t=>t.pp))ppBuild()}catch(e){}for(let i=trees.length-1;i>=0;i--){const t=trees[i];if(t.inv||(t.pp&&!t.small))continue;if(cpBad(t.x,t.y,t.r,'t'))trees.splice(i,1)}}
function cp10VM(){if(curMap!==1||VM.k!==1||!VM.P)return;for(let i=VM.P.length-1;i>=0;i--){const o=VM.P[i];if(cpBad(o.x,o.y,10*(o.s||1),'p'))VM.P.splice(i,1)}if(VM.D)for(let i=VM.D.length-1;i>=0;i--){const o=VM.D[i];if(cpBad(o.x,o.y,20*(o.s||1),'p'))VM.D.splice(i,1)}MX.vmK=null}
vmBuild=(f0=>function(){try{if(curMap===1){depBuild();cp10Trees();cp9Prune()}}catch(e){}const r=f0.apply(this,arguments);try{cp10VM()}catch(e){}return r})(vmBuild);
setTimeout(()=>{try{const _b=buildTrees;window.buildTrees=buildTrees=function(){const r=_b.apply(this,arguments);try{cp10Trees()}catch(e){}return r}}catch(e){}},90);
