/* ---------- v646 การ์ดมอนสเตอร์ภาพวาด (HDC) ----------
   ภาพจาก ChatGPT: hd-card-<id>.webp = ภาพวาด+กรอบ (ทองเหลือง=ทะเลทราย · เงินม่วง=ภาคฟ้า · ทองมงกุฎ=MVP) 384×512 ป้ายชื่อว่าง · hd-cardb.webp = หลังการ์ด
   cardImg(id) → ประกอบภาพ + เขียนชื่อไทยบนป้ายชื่อ (แคชใน _cImg) · ภาพยังไม่โหลด/โหลดไม่ได้ = การ์ดแบบเดิม
   การ์ด MVP ในหน้าสมุดการ์ดเปล่งประกายเป็นจังหวะ · การ์ดที่ตกบนพื้นพลิกเห็นหน้าการ์ดจริง/หลังการ์ด */
const HDC={im:{},b:null,n:0,err:'',py:.872,pw:.8,mv:new Set(),t:0};
(function(){try{const st=document.createElement('style');st.textContent='img.cmvp{animation:cmvp 2.8s ease-in-out infinite}@keyframes cmvp{0%,100%{filter:drop-shadow(0 0 3px rgba(255,210,90,.55)) brightness(1)}50%{filter:drop-shadow(0 0 10px rgba(255,220,120,.95)) brightness(1.18) saturate(1.1)}}';document.head.appendChild(st);
  const done=()=>{clearTimeout(HDC.t);HDC.t=setTimeout(()=>{try{if(!ov.hidden&&ov.dataset.k==='card')cardUI()}catch(e){}},120)};
  for(const id of CIDS){const im=new Image();im.onload=()=>{HDC.im[id]=im;HDC.n++;try{delete _cImg[id]}catch(e){}done()};im.onerror=()=>{HDC.err='load '+id};im.src='hd-card-'+id+'.webp'}
  const b=new Image();b.onload=()=>{HDC.b=b};b.src='hd-cardb.webp';
}catch(e){HDC.err=String(e)}})();
cardImg=(f=>function(id){const I=HDC.im[id],C=CARDS[id];if(!I||!C)return f(id);if(_cImg[id])return _cImg[id];
  const W2=288,H2=384,c=document.createElement('canvas');c.width=W2;c.height=H2;const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(I,0,0,W2,H2);
  const nm=C.n.replace('การ์ด',''),cy=H2*HDC.py,mw=W2*HDC.pw;let fs=30;x.font='bold '+fs+'px system-ui';while(x.measureText(nm).width>mw&&fs>15){fs--;x.font='bold '+fs+'px system-ui'}
  x.textAlign='center';x.textBaseline='middle';x.lineJoin='round';x.lineWidth=5;x.strokeStyle='rgba(10,6,2,.92)';x.strokeText(nm,W2/2,cy);
  const gr=x.createLinearGradient(0,cy-fs/2,0,cy+fs/2);if(C.mvp){gr.addColorStop(0,'#fff6c8');gr.addColorStop(1,'#ffc94a')}else{gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#e8dcc0')}x.fillStyle=gr;x.fillText(nm,W2/2,cy);
  let u='';try{u=c.toDataURL('image/webp',.9)}catch(e){}if(!u||u.indexOf('data:image/webp')!==0)u=c.toDataURL();if(C.mvp)HDC.mv.add(u);return(_cImg[id]=u)})(cardImg);
cardUI=(f=>function(){const r=f.apply(this,arguments);try{if(HDC.mv.size)ov.querySelectorAll('img').forEach(im=>{if(HDC.mv.has(im.getAttribute('src')))im.classList.add('cmvp')})}catch(e){}return r})(cardUI);
drawCardDrop=(f=>function(d,y,now){const C=CARDS[d.v]||{},I=HDC.im[d.v],B=HDC.b;if(!I||!B)return f.apply(this,arguments);const gold=!!C.mvp,fl=Math.cos(now*2.4+d.x);
  g.save();g.globalCompositeOperation='lighter';glowAt(d.x,y,gold?28:20,gold?'255,210,90':'255,220,160',.55+.2*Math.sin(now*5));g.restore();
  g.save();g.translate(d.x,y-3);g.scale(Math.max(.12,Math.abs(fl)),1);g.shadowColor='rgba(0,0,0,.45)';g.shadowBlur=3;g.shadowOffsetY=1.5;g.drawImage(fl>0?B:I,-8,-11,16,21.3);g.restore();
  if(Math.sin(now*3+d.y)>.6){g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,240,180,.9)';g.fillRect(d.x+6,y-13,1.4,5);g.fillRect(d.x+4.3,y-11.3,5,1.4);g.restore()}})(drawCardDrop);
