/* ---------- v648 เส้นขอบรอบตัวละครและมอน (OL) ----------
   ตัวละคร/NPC: วาดตัวลงแคนวาสแยก (ใช้ซ้ำทุกตัว) → วาดเงาร่างสีเข้มรอบตัว 8 ทิศ → วาดตัวทับ · แสงที่ตัวละครเปล่ง (glowAt) เก็บไว้แล้ววาดตามบนจอจริง ไม่ปนเป็นขอบ
   ตัวเรา: ขอบสีครีมอุ่น หาตัวเองเจอทันที · มอน/บอส: ขอบเข้มอมแดง ทำจากเลเยอร์มอนที่มีอยู่แล้ว (gxLayer) ทีเดียวทั้งฝูง
   ปิดเองเมื่อเครื่องหน่วง (FQ.avg > OL.fq) / โหมดประหยัด · ตั้งค่า → 🖥️ คุณภาพภาพ → ✏️ เส้นขอบตัวละคร */
const OL={on:1,fq:27,w:1.8,col:'rgba(14,9,22,.92)',me:'rgba(255,234,186,.96)',mon:'rgba(38,8,16,.9)',max:14,cnt:0,n:0,nm:0,err:'',O:null,S:null,SM:null,
  LX0:-38,LX1:38,LY0:-78,LY1:28};
try{if(localStorage.getItem('refugee_ol')==='0')OL.on=0}catch(e){}
function olSkip(){if(!OL.on||LOWQ)return true;try{if(typeof FQ!=='undefined'&&FQ.avg>OL.fq)return true}catch(e){}return false}
function olCv(k,w,h){let c=OL[k];if(!c){c=OL[k]=document.createElement('canvas');c.width=c.height=8;c.x=c.getContext('2d')}if(c.width<w||c.height<h){c.width=Math.max(c.width,Math.ceil(w));c.height=Math.max(c.height,Math.ceil(h))}return c}
const OLD=[[1,0],[-1,0],[0,1],[0,-1]];
function olStamp(src,w,h,X,Y,col){/* ทำเงาร่างจาก src (0,0,w,h) แล้ววาดรอบตำแหน่ง X,Y บนจอ */const S=olCv('S',w,h),x=S.x;x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='copy';x.drawImage(src,0,0,w,h,0,0,w,h);
  /* ตัดส่วนจาง (เงาพื้น แสงฟุ้ง) ออก: alpha^4 */x.globalCompositeOperation='destination-in';x.drawImage(S,0,0,w,h,0,0,w,h);x.drawImage(S,0,0,w,h,0,0,w,h);
  x.globalCompositeOperation='source-in';x.fillStyle=col;x.fillRect(0,0,w,h);x.globalCompositeOperation='source-over';const d=OL.w*DPR;for(const [dx,dy] of OLD)g.drawImage(S,0,0,w,h,X+dx*d,Y+dy*d,w,h)}
drawChar=(f=>function(x,y,cls,fx,ph,h,t,bd){let isMe=false;try{isMe=cls===me.cls&&Math.abs(x-me.x)<60&&Math.abs(y-me.y)<60&&h===myLk('h')&&bd===myLk('b')}catch(e){}
  if(olSkip()||!g||(g.canvas!==cv&&!isMe)||(OL.cnt>=OL.max&&!isMe)||g.globalAlpha<.5)return f.apply(this,arguments);
  const M=g.getTransform(),s=Math.hypot(M.a,M.b);if(s<.05||s>12||M.d<0||M.a<0)return f.apply(this,arguments);OL.cnt++;
  /* เก็บตำแหน่งเท้าให้เงาไฟ (v643) ก่อนสลับแคนวาส */
  try{if(HD2.on&&HD2.sh&&HDL.C.length<80){const p=hdlPt(x,y+15);if(p){const z=(ZM&&ZM.z>0?ZM.z:1)*DPR,w=hdlW(p[0],p[1]);HDL.C.push([w[0],w[1],p[2]/z])}}}catch(e){}
  const pad=Math.ceil(OL.w*DPR*2+2),bw=Math.ceil((OL.LX1-OL.LX0)*s)+pad*2,bh=Math.ceil((OL.LY1-OL.LY0)*s)+pad*2;if(bw>1400||bh>1600)return f.apply(this,arguments);
  const px=M.a*x+M.c*y+M.e,py=M.b*x+M.d*y+M.f,ox=-OL.LX0*s+pad,oy=-OL.LY0*s+pad,O=olCv('O',bw,bh),o=O.x;
  o.setTransform(1,0,0,1,0,0);o.globalAlpha=1;o.globalCompositeOperation='source-over';o.filter='none';o.shadowBlur=0;o.clearRect(0,0,bw,bh);
  o.setTransform(M.a,M.b,M.c,M.d,M.e-(px-ox),M.f-(py-oy));
  const G0=g,gl=window.glowAt,rec=[];window.glowAt=glowAt=function(){const T=g.getTransform();rec.push([arguments,T,g.globalAlpha])};
  let r;try{g=o;r=f.apply(this,arguments)}catch(e){OL.err=String(e)}finally{g=G0;window.glowAt=glowAt=gl}
  const X=px-ox,Y=py-oy,mine=isMe;if(mine)OL.mn=(OL.mn||0)+1;
  g.save();g.setTransform(1,0,0,1,0,0);try{olStamp(O,bw,bh,X,Y,mine?OL.me:OL.col);g.drawImage(O,0,0,bw,bh,X,Y,bw,bh)}catch(e){OL.err=String(e)}g.restore();OL.n++;
  for(const [a,T,ga] of rec){g.save();g.setTransform(T.a,T.b,T.c,T.d,T.e+X,T.f+Y);g.globalAlpha=ga;try{gl.apply(null,a)}catch(e){}g.restore()}
  return r})(drawChar);
/* มอน/บอส: ขอบจากเลเยอร์มอนทั้งชั้น ก่อนรวมเลเยอร์ลงจอ */
gxLayerEnd=(f=>function(o){try{if(o&&!olSkip()&&GX.lay&&GX.lb&&GX.lb.length){const c=GX.lay,M=GX.lM,sc=Math.hypot(M.a,M.b),p=Math.ceil(OL.w*DPR*2+2);
  g.save();g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';
  for(const [cx,cy,hw,hh] of GX.lb.slice(0,40)){const q=M.transformPoint(new DOMPoint(cx,cy)),x0=Math.max(0,Math.floor(q.x-hw*sc)-p),y0=Math.max(0,Math.floor(q.y-hh*sc)-p),x1=Math.min(c.width,Math.ceil(q.x+hw*sc)+p),y1=Math.min(c.height,Math.ceil(q.y+hh*sc)+p);
    if(x1<=x0+2||y1<=y0+2)continue;const w=x1-x0,h=y1-y0,T=olCv('SM',w,h),t=T.x;t.setTransform(1,0,0,1,0,0);t.globalCompositeOperation='copy';t.globalAlpha=1;t.drawImage(c,x0,y0,w,h,0,0,w,h);t.globalCompositeOperation='source-over';
    olStamp(T,w,h,x0,y0,OL.mon);OL.nm++}
  g.restore()}}catch(e){OL.err=String(e)}return f.apply(this,arguments)})(gxLayerEnd);
zmPost=(f=>function(){OL.cnt=0;return f.apply(this,arguments)})(zmPost);
/* แถวตั้งค่า */
function olSet(v){OL.on=v?1:0;try{localStorage.setItem('refugee_ol',v?'1':'0')}catch(e){}olSync()}
function olSync(){const b=document.querySelector('[data-olrow] button');if(b){b.textContent=OL.on?'เปิดอยู่':'ปิดอยู่';b.classList.toggle('on',!!OL.on)}}
try{cfgUI=(f=>function(){const r=f.apply(this,arguments);try{const row=ov.querySelector('[data-hd2pop]')||ov.querySelector('[data-hd2pv]')||ov.querySelector('[data-hd2row]');if(row&&!ov.querySelector('[data-olrow]')){const d=document.createElement('div');
    d.innerHTML='<div class="setrow" data-olrow="1"><span class="setl">✏️ เส้นขอบตัวละคร<small>ขอบเข้มรอบตัวละครและมอน ขอบสีครีมรอบตัวเรา · ปิดเองถ้าเครื่องหน่วง</small></span><button class="cfgb" type="button"></button></div>';
    const pr=d.firstChild;row.parentNode.insertBefore(pr,row.nextSibling);pr.querySelector('button').onclick=e=>{e.stopPropagation();olSet(!OL.on);try{sfx('click')}catch(_){}};olSync()}}catch(e){}return r})(cfgUI)}catch(e){}
