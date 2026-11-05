/* ---------- v594 ย่านวงแหวนล่าง (แมพ 31): บ้าน/ซากบ้าน/กองหิน/หอคอย/แผงตลาด/ลังไม้ เป็นภาพ HD (ChatGPT · ชุดเดียวกับค่าย/ท่าเรือ) ----------
   แผ่นภาพ hd-market.webp · ห่อ PALK.mhouse/mruin/mrub/mtow/mstall/bcrate เฉพาะแมพ 31 · ตำแหน่ง/ชนเหมือนเดิม · ปิดเงาต้นไม้ทั่วไปที่ลอยใต้ฐาน (ภาพใหม่มีเงาชิดฐานเอง)
   แผงที่ถูกเผา (เนื้อเรื่องก่อวินาศ) ยังใช้ภาพเดิม · ใช้เมื่อเปิด HD และไม่ใช่โหมดประหยัด · ปิด: MKA.off=1 */
const MKA={src:'hd-market.webp',off:0,img:null,ok:0,c:{},f:{"h0":[0,0,204,227],"h1":[206,0,214,217],"h2":[422,0,214,234],"h3":[638,0,214,234],"r0":[854,0,230,202],"r1":[0,236,234,169],"rb":[236,236,240,104],"tw":[478,236,109,242],"s0":[589,236,230,201],"s1":[821,236,224,198],"s2":[0,480,234,198],"cr":[236,480,240,155]},
  /* ตามชนิด → [ภาพ, กว้างในเกม, กลับซ้ายขวา] ตาม v */
  m:{mhouse:[['h0',166,0],['h3',150,0],['h1',140,0],['h2',170,0],['h1',134,1]],mruin:[['r0',132,0],['r1',150,0],['r0',156,1],['r1',168,1]],mrub:[['rb',86,0]],mtow:[['tw',72,0]],
     mstall:[['s0',76,0],['s2',76,0],['s1',76,0],['s0',76,1],['s2',76,1],['s1',76,1]],bcrate:[['cr',48,0],['cr',44,1]]}};
function mkaLoad(){if(MKA.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{MKA.ok=1})};im.onerror=()=>{MKA.ok=-1};im.src=MKA.src;MKA.img=im}
function mkaOn(){if(MKA.off||curMap!==31)return false;try{if(!HDI.on||lqHD())return false}catch(e){return false}if(!MKA.img)mkaLoad();return MKA.ok===1}
function mkaSpr(k,w){const key=k+':'+w;let s=MKA.c[key];if(s)return s;const f=MKA.f[k],h=w*f[3]/f[2],S=2,c=document.createElement('canvas');c.width=Math.ceil(w*S);c.height=Math.ceil(h*S);
  const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(MKA.img,f[0],f[1],f[2],f[3],0,0,c.width,c.height);return MKA.c[key]={c,w,h}}
function mkaDraw(k,t,T){const L=MKA.m[k],q=L[(t.v|0)%L.length],s=mkaSpr(q[0],q[1]),x=t.x,y=t.y+(k==='mtow'?6:4);
  if(k==='mhouse'||k==='mruin')PALSH(x,y,s.w*.5,12,.32);else if(k==='mtow')PALSH(x,y,s.w*.6,11,.35);else PALSH(x,y,s.w*.45,7,.3);
  if(q[2]){g.translate(x,y);g.scale(-1,1);g.drawImage(s.c,-s.w/2,-s.h,s.w,s.h);g.scale(-1,1);g.translate(-x,-y)}else g.drawImage(s.c,x-s.w/2,y-s.h,s.w,s.h);
  if(k==='mstall'&&(t.v|0)===5){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-30,20,'255,190,110',.35);g.restore()}}
setTimeout(()=>{try{for(const k in MKA.m){const o=PALK[k];if(typeof o!=='function')continue;PALK[k]=function(t,T){if(mkaOn()){if(!t._mk){t._mk=1;t._ns0=t.ns;t.ns=1}
      if(k==='mstall'&&p6From('p6sab')&&!p6From('p6fs')&&(t.si%3===0))return o.call(this,t,T);try{return mkaDraw(k,t,T)}catch(e){}}else if(t._mk){t._mk=0;t.ns=t._ns0}return o.call(this,t,T)}}}catch(e){console.warn('mka',e)}},1700);
