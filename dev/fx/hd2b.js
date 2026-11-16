/* ---------- v642 ลุค HD-2D เป็นค่าเริ่มต้น + ฉากเอียงลึก (HD2.pv) ----------
   ฉากเอียง: วาดภาพโลกใหม่เป็นแถบแนวนอน แถวล่างใหญ่ขึ้น/แถวบนเล็กลง (กว้างและสูงพร้อมกัน) = พื้นเอียงไกลออกไปหาขอบฟ้า
   แถวกลางจอ (ตัวเรา) ขนาดเท่าเดิมพอดี · ช่องว่างบนสุด/มุมบนเติมด้วยภาพเบลอของเฟรมเดิม (อยู่ในโซน tilt-shift อยู่แล้ว)
   สูตร: s(t)=1+k(2t-1), y'=t+k(t-.5)² (t=ตำแหน่งแนวตั้ง 0..1) · แตะจอแปลงกลับด้วยสูตรผกผัน (tapTarget)
   + หมอกไกล: ขอบบนจางฟ้าอ่อน ๆ (ไกลกล้อง) */
try{const v=localStorage.getItem('refugee_hd2');HD2.on=v==='0'?0:1}catch(e){HD2.on=1}
HD2.pv=1;HD2.k=.15;HD2.N=48;HD2.pvA=0;HD2.hz=1;
try{if(localStorage.getItem('refugee_hd2pv')==='0')HD2.pv=0}catch(e){}
/* จอ (0..1) → ตำแหน่งในภาพเดิม (0..1) */
function hd2Inv(nx,ny){const k=HD2.k;let u=ny-.5;u=Math.abs(k)<1e-4?u:(-1+Math.sqrt(Math.max(0,1+4*k*u)))/(2*k);const t=u+.5,s=1+k*(2*t-1);return[.5+(nx-.5)/s,t]}
/* ภาพเดิม → จอ */
function hd2Fwd(tx,ty){const k=HD2.k,s=1+k*(2*ty-1);return[.5+(tx-.5)*s,ty+k*(ty-.5)*(ty-.5)]}
function hd2Warp(C,W,H){const P=hd2Cv('p',W,H);P.x.globalCompositeOperation='copy';P.x.drawImage(C,0,0);
  const w8=Math.max(4,W>>3),h8=Math.max(4,H>>3),w4=Math.max(8,W>>2),h4=Math.max(8,H>>2),A=hd2Cv('a',w4,h4),B=hd2Cv('b',w8,h8);
  A.x.globalCompositeOperation='copy';A.x.drawImage(P,0,0,W,H,0,0,w4,h4);B.x.globalCompositeOperation='copy';B.x.drawImage(A,0,0,w4,h4,0,0,w8,h8);
  g.globalCompositeOperation='copy';g.imageSmoothingEnabled=true;g.drawImage(B,0,0,w8,h8,0,0,W,H);g.globalCompositeOperation='source-over';
  const N=HD2.N,k=HD2.k;
  for(let i=0;i<N;i++){const t0=i/N,t1=(i+1)/N,tm=(t0+t1)/2,s=1+k*(2*tm-1),y0=(t0+k*(t0-.5)*(t0-.5))*H,y1=(t1+k*(t1-.5)*(t1-.5))*H,dw=W*s;
    g.drawImage(P,0,t0*H,W,(t1-t0)*H+(i<N-1?1:0),(W-dw)/2,y0,dw,y1-y0+(i<N-1?1.2:0))}}
hd2Pass=function(){if(hd2Skip()){HD2.pvA=0;return}const t0=performance.now(),C=g.canvas,W=C.width,H=C.height;if(W<50||H<50)return;
  g.save();g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.filter='none';g.shadowBlur=0;
  try{
    let pv=0;if(HD2.pv){try{hd2Warp(C,W,H);pv=1}catch(e){HD2.err=String(e)}}HD2.pvA=pv;
    const w4=Math.max(8,W>>2),h4=Math.max(8,H>>2),w8=Math.max(4,W>>3),h8=Math.max(4,H>>3);
    const A=hd2Cv('a',w4,h4),B=hd2Cv('b',w8,h8);A.x.globalCompositeOperation='copy';A.x.drawImage(C,0,0,W,H,0,0,w4,h4);
    B.x.globalCompositeOperation='copy';B.x.drawImage(A,0,0,w4,h4,0,0,w8,h8);
    if(HD2.bl){const Q=hd2Cv('q',w8,h8);Q.x.globalCompositeOperation='copy';Q.x.filter='brightness(.55) contrast(3.2) saturate(1.3)';Q.x.drawImage(B,0,0);Q.x.filter='none';
      g.globalCompositeOperation='screen';g.globalAlpha=HD2.blA;g.imageSmoothingEnabled=true;g.drawImage(Q,0,0,w8,h8,0,0,W,H);g.globalAlpha=1}
    if(HD2.ts){const M=hd2Cv('m',w4,h4),x=M.x;x.globalCompositeOperation='copy';x.imageSmoothingEnabled=true;x.drawImage(B,0,0,w8,h8,0,0,w4,h4);
      x.globalCompositeOperation='destination-in';const gr=x.createLinearGradient(0,0,0,h4),a=HD2.top,b=HD2.bot;
      gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(a*.45,'rgba(0,0,0,.85)');gr.addColorStop(a,'rgba(0,0,0,0)');gr.addColorStop(1-b,'rgba(0,0,0,0)');gr.addColorStop(1-b*.45,'rgba(0,0,0,.8)');gr.addColorStop(1,'rgba(0,0,0,1)');
      x.fillStyle=gr;x.fillRect(0,0,w4,h4);g.globalCompositeOperation='source-over';g.drawImage(M,0,0,w4,h4,0,0,W,H)}
    /* หมอกไกล: ยิ่งไกล (บน) ยิ่งจางฟ้า */
    if(HD2.hz){let dk=0;try{dk=dnState().dk}catch(e){}const c=dk>.5?'90,110,170':'200,215,235',hz=g.createLinearGradient(0,0,0,H*.4);hz.addColorStop(0,'rgba('+c+','+(dk>.5?.16:.2)+')');hz.addColorStop(1,'rgba('+c+',0)');g.globalCompositeOperation='source-over';g.fillStyle=hz;g.fillRect(0,0,W,H*.4)}
    if(HD2.gr){g.globalCompositeOperation='soft-light';const gc=g.createLinearGradient(0,0,0,H);gc.addColorStop(0,'rgba(255,196,120,.32)');gc.addColorStop(.55,'rgba(255,230,200,.06)');gc.addColorStop(1,'rgba(70,90,170,.28)');g.fillStyle=gc;g.fillRect(0,0,W,H);
      g.globalCompositeOperation='source-over';const r=Math.hypot(W,H)*.5,vg=g.createRadialGradient(W/2,H*.48,r*.42,W/2,H*.48,r*1.02);vg.addColorStop(0,'rgba(8,4,12,0)');vg.addColorStop(1,'rgba(8,4,12,.42)');g.fillStyle=vg;g.fillRect(0,0,W,H)}
    if(HD2.du)hd2Dust(W,H);
  }catch(e){HD2.err=String(e)}
  g.restore();HD2.n++;HD2.ms=HD2.ms*.95+(performance.now()-t0)*.05};
/* แตะตัวผู้เล่น/มอนสเตอร์: แปลงตำแหน่งแตะบนจอกลับเป็นตำแหน่งในภาพเดิม */
tapTarget=(f=>function(p){try{if(HD2.pvA&&p&&W>0&&H>0){const q=hd2Inv(p.x/W,p.y/H);p={x:q[0]*W,y:q[1]*H}}}catch(e){}return f.call(this,p)})(tapTarget);
/* แถวตั้งค่า "ฉากเอียงลึก" ใต้แถวลุค HD-2D */
function hd2PvSet(v){HD2.pv=v?1:0;try{localStorage.setItem('refugee_hd2pv',v?'1':'0')}catch(e){}hd2Sync()}
hd2Sync=(f=>function(){f();const b=document.querySelector('[data-hd2pv] button');if(b){b.textContent=HD2.pv?'เปิดอยู่':'ปิดอยู่';b.classList.toggle('on',!!HD2.pv)}const r=document.querySelector('[data-hd2pv]');if(r)r.style.opacity=HD2.on?'':'.45'})(hd2Sync);
try{cfgUI=(f=>function(){const r=f.apply(this,arguments);try{const row=ov.querySelector('[data-hd2row]');if(row&&!ov.querySelector('[data-hd2pv]')){const d=document.createElement('div');
    d.innerHTML='<div class="setrow" data-hd2pv="1"><span class="setl">↗️ ฉากเอียงลึก<small>พื้นด้านบนไกลออกไป ด้านล่างใกล้กล้อง (ใช้กับลุค HD-2D)</small></span><button class="cfgb" type="button"></button></div>';
    const pr=d.firstChild;row.parentNode.insertBefore(pr,row.nextSibling);pr.querySelector('button').onclick=e=>{e.stopPropagation();hd2PvSet(!HD2.pv);try{sfx('click')}catch(_){}};hd2Sync()}}catch(e){}return r})(cfgUI)}catch(e){}
