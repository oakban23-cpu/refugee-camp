/* ---------- v599 เหมืองดาวคาร์น (แมพ 35): ของเป็นภาพ HD (ChatGPT · ชุดเดียวกับค่าย/ท่าเรือ/ตลาด/นครรากลึก) ----------
   แผ่นภาพ hd-mine.webp · เต็นท์คนงาน 2 แบบ · สำนักงานบรอม (ยังมีป้ายชื่อ) · ปากอุโมงค์ · ปั้นจั่น · หอลิฟต์ · รถแร่ · กองแร่ดาว · เสาตะเกียง · กองไฟ · หินถล่ม · ผาหินแดง
   ห่อ PALK.ktent/koff/ktun/kcrn/klift/kcart/kore/kpole/kfire/krub/kmesa · ตำแหน่ง/ชนเหมือนเดิม · แสง (ไฟ ตะเกียง คริสตัล อุโมงค์) ยังวาดด้วยโค้ด
   หินถล่ม: ยังมี 🆘 ตอนคนงานติด และคนงานยืนข้างกองหินหลังช่วยแล้ว เหมือนเดิม · ใช้เมื่อเปิด HD และไม่ใช่โหมดประหยัด · ปิด: KMA.off=1 */
const KMA={src:'hd-mine.webp',off:0,img:null,ok:0,c:{},f:{"t0":[0,0,260,216],"t1":[262,0,267,214],"of":[531,0,247,200],"tn":[780,0,278,232],"cr":[0,234,248,228],"lf":[250,234,218,242],"ct":[470,234,236,196],"or":[708,234,259,191],"lp":[0,478,132,236],"fi":[134,478,223,232],"rb":[359,478,271,213],"me":[632,478,224,246]},
  /* ชนิด → [ภาพ, กว้างในเกม (0 = ผาหิน ใช้รัศมีจริง ×2.1), กลับด้าน] ตาม v */
  m:{ktent:[['t0',112,0],['t1',120,0],['t0',108,1]],koff:[['of',172,0]],ktun:[['tn',244,0]],kcrn:[['cr',206,0],['cr',206,1]],klift:[['lf',184,0]],kcart:[['ct',80,0],['ct',80,1],['ct',78,0]],
     kore:[['or',88,0],['or',84,1],['or',92,0]],kpole:[['lp',58,0]],kfire:[['fi',82,0]],krub:[['rb',104,0],['rb',98,1],['rb',108,0],['rb',100,1]],kmesa:[['me',0,0],['me',0,1]]}};
function kmaW(k,t,q){return q[1]||((KMESA[t.v]||[0,0,120])[2]*2.1)}
function kmaLoad(){if(KMA.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{KMA.ok=1})};im.onerror=()=>{KMA.ok=-1};im.src=KMA.src;KMA.img=im}
function kmaOn(){if(KMA.off||curMap!==35)return false;try{if(!HDI.on||lqHD())return false}catch(e){return false}if(!KMA.img)kmaLoad();return KMA.ok===1}
function kmaSpr(k,w){w=Math.round(w);const key=k+':'+w;let s=KMA.c[key];if(s)return s;const f=KMA.f[k],h=w*f[3]/f[2],S=w>260?1.5:2,c=document.createElement('canvas');c.width=Math.ceil(w*S);c.height=Math.ceil(h*S);
  const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(KMA.img,f[0],f[1],f[2],f[3],0,0,c.width,c.height);return KMA.c[key]={c,w,h}}
function kmaDraw(k,t,T){const L=KMA.m[k],q=L[(t.v|0)%L.length],s=kmaSpr(q[0],kmaW(k,t,q)),x=t.x,y=t.y+(k==='ktun'?34:k==='kmesa'?s.h*.06:4);
  if(k==='kmesa')PALSH(x+10,y+4,s.w*.5,s.w*.16,.5);else if(k==='ktun'||k==='koff')PALSH(x,y,s.w*.44,14,.45);else if(k==='kpole')PALSH(x-s.w*.2,y,10,4,.35);else PALSH(x,y,s.w*.4,9,.4);
  if(q[2]){g.translate(x,y);g.scale(-1,1);g.drawImage(s.c,-s.w/2,-s.h,s.w,s.h);g.scale(-1,1);g.translate(-x,-y)}else g.drawImage(s.c,x-s.w/2,y-s.h,s.w,s.h);
  const fx=q[2]?-1:1,op=g.globalCompositeOperation;g.globalCompositeOperation='lighter';
  if(k==='kfire'){const f=.75+.25*Math.sin(T*9)+.1*Math.sin(T*23);glowAt(x,y-s.h*.2,50*f,'255,150,60',.5);glowAt(x,y-s.h*.2,110,'255,140,60',.12*f)}
  else if(k==='kpole'){const f=.85+.15*Math.sin(T*6+x);glowAt(x+fx*s.w*.32,y-s.h*.62,30*f,'255,190,100',.45);glowAt(x+fx*s.w*.32,y-s.h*.62,70,'255,180,90',.1)}
  else if(k==='koff')glowAt(x-s.w*.16,y-s.h*.42,26,'255,190,90',.3+.06*Math.sin(T*4));
  else if(k==='kore'||k==='kcart'){const p=.7+.3*Math.sin(T*2+x);glowAt(x+(k==='kore'?0:fx*s.w*.1),y-s.h*(k==='kore'?.55:.78),s.w*.42,'120,200,255',.22*p)}
  else if(k==='ktun'){const a=.5+.5*Math.sin(T*1.7+(t.v|0)*2);glowAt(x,y-s.h*.32,44,'100,180,255',.16+.14*a)}
  g.globalCompositeOperation=op;
  if(k==='koff'){g.fillStyle='#d8b878';g.strokeStyle='#3a2414';g.lineWidth=1.4;g.beginPath();g.roundRect(x-44,y-s.h-6,88,17,3);g.fill();g.stroke();g.fillStyle='#3a2414';g.font='bold 10px system-ui';g.textAlign='center';g.fillText('สำนักงานบรอม',x,y-s.h+6)}
  if(k==='krub'){const st=stCur(),q2=me.sty,save=q2&&((q2.p7rs|0)>>t.v&1||p6Past('p7rs'));
    if(save)campFolk(x+s.w*.5,y+6,{c:'#7a6a50',hair:'#3a2414',f:-1,k:t.v*5,s:1,arm:Math.sin(T*3+t.v)*.5-.5},T);
    else if(st&&st.p7rs&&q2&&q2.a===1){const b=Math.sin(T*3+t.v)*3;g.font='16px system-ui';g.textAlign='center';g.fillText('🆘',x,y-s.h-8+b)}}}
setTimeout(()=>{try{for(const k in KMA.m){const o=PALK[k];if(typeof o!=='function')continue;PALK[k]=function(t,T){if(kmaOn()){if(!t._km){t._km=1;t._ns0=t.ns;t.ns=1}try{return kmaDraw(k,t,T)}catch(e){}}else if(t._km){t._km=0;t.ns=t._ns0}return o.call(this,t,T)}}}catch(e){console.warn('kma',e)}},1700);
