/* ---------- v596 นครรากลึก (แมพ 44 · บางชิ้นใช้ที่ฐานแผ่นดิน 45): ของเป็นภาพ HD (ChatGPT · ชุดเดียวกับค่าย/ท่าเรือ/ตลาด) ----------
   แผ่นภาพ hd-root.webp · บ้านโดมราก 3 แบบ · บัลลังก์ราก · แผงตลาด 2 แบบ · บ่อน้ำ · โคมเห็ด · เห็ดยักษ์เรืองแสง 3 สี · หินงอก
   ห่อ PALK.pbhut/pbthrone/pbstall/pbwell/pblamp/pbmush/pbstag · ตำแหน่ง/ชนเหมือนเดิม · แสงเรือง/ไฟกะพริบยังวาดด้วยโค้ด
   บ่อน้ำยังมีแสงทองขึ้นตามเนื้อเรื่อง (คำมั่นที่นำลงมา) · ปิดเงาต้นไม้ทั่วไปที่ลอยใต้ฐาน · ใช้เมื่อเปิด HD และไม่ใช่โหมดประหยัด · ปิด: RTA.off=1 */
const RTA={src:'hd-root.webp',off:0,wy:[.19,.44,.4],img:null,ok:0,c:{},f:{"h0":[0,0,248,189],"h1":[250,0,284,195],"h2":[536,0,194,246],"th":[732,0,284,245],"s0":[0,248,268,218],"s1":[270,248,254,217],"wl":[526,248,252,220],"lp":[780,248,134,237],"m0":[0,487,243,223],"m1":[245,487,242,220],"m2":[489,487,245,216],"st":[736,487,219,243]},
  /* ชนิด → [ภาพ, กว้างในเกม (คูณ sc ถ้ามี), กลับด้าน] ตาม v */
  m:{pbhut:[['h0',150,0],['h1',166,0],['h2',104,0]],pbthrone:[['th',150,0]],pbstall:[['s0',96,0],['s1',94,0]],pbwell:[['wl',178,0]],pblamp:[['lp',48,0],['lp',48,1]],
     pbmush:[['m0',112,0],['m1',112,0],['m2',118,0]],pbstag:[['st',62,0],['st',58,1],['st',66,0]]}};
function rtaLoad(){if(RTA.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{RTA.ok=1})};im.onerror=()=>{RTA.ok=-1};im.src=RTA.src;RTA.img=im}
function rtaOn(k){if(RTA.off||(curMap!==44&&curMap!==45))return false;if(curMap===45&&k!=='pblamp'&&k!=='pbmush'&&k!=='pbstag')return false;try{if(!HDI.on||lqHD())return false}catch(e){return false}if(!RTA.img)rtaLoad();return RTA.ok===1}
function rtaSpr(k,w){w=Math.round(w);const key=k+':'+w;let s=RTA.c[key];if(s)return s;const f=RTA.f[k],h=w*f[3]/f[2],S=2,c=document.createElement('canvas');c.width=Math.ceil(w*S);c.height=Math.ceil(h*S);
  const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(RTA.img,f[0],f[1],f[2],f[3],0,0,c.width,c.height);return RTA.c[key]={c,w,h}}
function rtaDraw(k,t,T){const L=RTA.m[k],q=L[(t.v|0)%L.length],sc=(k==='pbmush'||k==='pbstag')?(t.sc||1):1,s=rtaSpr(q[0],q[1]*sc),x=t.x,y=t.y+(k==='pbwell'?PBW.r*.62:k==='pbthrone'?6:4);
  if(k==='pbhut'||k==='pbthrone')PALSH(x,y,s.w*.48,12,.42);else if(k==='pbwell')PALSH(x,y,s.w*.46,13,.45);else if(k==='pblamp')PALSH(x,y,12,4,.35);else PALSH(x,y,s.w*.36,7*sc,.4);
  if(q[2]){g.translate(x,y);g.scale(-1,1);g.drawImage(s.c,-s.w/2,-s.h,s.w,s.h);g.scale(-1,1);g.translate(-x,-y)}else g.drawImage(s.c,x-s.w/2,y-s.h,s.w,s.h);
  if(k==='pbwell'){const full=gPBj(),n=me.sty?((me.sty.pa2j|0).toString(2).split('1').length-1):0,lv=full?1:.25+n*.12,wx=x+s.w*.03,wy=y-s.h*RTA.wy[1],rx=s.w*RTA.wy[0];
    const gr=g.createRadialGradient(wx,wy,2,wx,wy,rx);gr.addColorStop(0,'rgba(255,220,120,'+(.55+.4*lv)+')');gr.addColorStop(1,'rgba(210,130,30,'+(.5+.4*lv)+')');g.fillStyle=gr;g.beginPath();g.ellipse(wx,wy,rx,rx*RTA.wy[2],0,0,7);g.fill()}
  const fx=q[2]?-1:1;g.save();g.globalCompositeOperation='lighter';
  if(k==='pbmush'){const C=['120,255,220','190,140,255','255,190,110'][(t.v|0)%3],pu=.65+.35*Math.sin(T*1.4+x);glowAt(x,y-s.h*.72,s.w*.55,C,.26*pu);glowAt(x,y-4,s.w*.4,C,.07*pu)}
  else if(k==='pblamp'){const f=.75+.25*Math.sin(T*3+t.v);glowAt(x+fx*s.w*.2,y-s.h*.8,28*f,'120,255,220',.42);glowAt(x,y-4,30,'120,255,220',.07)}
  else if(k==='pbhut'){const fk=.8+.2*Math.sin(T*5+(t.v|0));glowAt(x,y-s.h*.25,s.w*.32,'255,180,90',.16*fk)}
  else if(k==='pbthrone')glowAt(x,y-s.h*.6,s.w*.45,'255,190,100',.14+.05*Math.sin(T*1.5));
  else if(k==='pbstall'&&(t.v|0)===1)glowAt(x+s.w*.36,y-s.h*.62,18,'255,190,90',.35);
  else if(k==='pbwell'){const full=gPBj(),n=me.sty?((me.sty.pa2j|0).toString(2).split('1').length-1):0,lv=full?1:.25+n*.12,pu=.6+.4*Math.sin(T*1.8),wx=x+s.w*.03,wy=y-s.h*.44;
    glowAt(wx,wy,s.w*(.18+.14*lv),'255,190,80',(.25+.3*lv)*pu);glowAt(wx,wy-s.h*.1,s.w*.5,'255,190,80',.1+.15*lv*pu)}
  g.restore()}
setTimeout(()=>{try{for(const k in RTA.m){const o=PALK[k];if(typeof o!=='function')continue;PALK[k]=function(t,T){if(rtaOn(k)){if(!t._rt){t._rt=1;t._ns0=t.ns;t.ns=1}try{return rtaDraw(k,t,T)}catch(e){}}else if(t._rt){t._rt=0;t.ns=t._ns0}return o.call(this,t,T)}}}catch(e){console.warn('rta',e)}},1700);
