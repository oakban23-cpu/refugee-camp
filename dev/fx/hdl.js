/* ---------- v643 แสงส่องเป็นทิศ (HDL): เงาตัวละครทอดยาวออกจากคบเพลิง/กองไฟ/โคม + เงาแดดตามเวลา ----------
   เก็บตำแหน่งแสง (ทุก glowAt) และตำแหน่งตัวละคร (ทุก drawChar) ของเฟรมก่อน แปลงเป็นพิกัดโลกจาก transform จริง
   แล้ววาดเงาบนพื้น (ก่อนวาดของ/ตัวละคร ผ่าน plxGround) → เงาอยู่ใต้ตัวละครเสมอ ไม่ทับตัว
   ใกล้ไฟ: เงายาวขึ้นเมื่อห่างไฟ เข้มขึ้นเมื่อใกล้ หลายดวง = หลายเงา (สูงสุด 2) · กลางวันกลางแจ้ง: เงาแดดเอียงตามชั่วโมง
   เป็นส่วนหนึ่งของลุค HD-2D (ปิดตามกัน · เครื่องหน่วง/ประหยัด = ปิด) · สวิตช์ HD2.sh */
const HDL={L:[],Lp:[],C:[],Cp:[],sp:null,n:0,err:''};HD2.sh=1;
function hdlOn(){return HD2.sh&&!hd2Skip()}
function hdlW(px,py){/* พิกเซลบนแคนวาสหลัก → พิกัดโลก */const z=(ZM&&ZM.z>0?ZM.z:1)*DPR;return[px/z+cam.x,py/z+cam.y]}
function hdlPt(x,y){try{const c=g.canvas;if(!c||!cv)return null;let k=1;if(c!==cv){if(!c.width||Math.abs(c.width/c.height-cv.width/cv.height)>.02)return null;k=cv.width/c.width}
  const M=g.getTransform(),px=(M.a*x+M.c*y+M.e)*k,py=(M.b*x+M.d*y+M.f)*k;return[px,py,Math.hypot(M.a,M.b)*k]}catch(e){return null}}
setTimeout(()=>{try{const og=glowAt;window.glowAt=glowAt=function(x,y,r,c,a){if(HDL.L.length<60&&r>=14&&a>=.1&&HD2.on&&HD2.sh){const p=hdlPt(x,y);if(p){const z=(ZM&&ZM.z>0?ZM.z:1)*DPR,R=r*p[2]/z;if(R>=24&&R<=420){const w=hdlW(p[0],p[1]);HDL.L.push([w[0],w[1],R,Math.min(1,a*g.globalAlpha)])}}}return og.apply(this,arguments)}}catch(e){HDL.err=String(e)}},3200);
drawChar=(f=>function(x,y){if(HD2.on&&HD2.sh&&HDL.C.length<80&&g&&cv&&(g.canvas===cv||(GX&&g===GX.lc))){const p=hdlPt(x,y+15);if(p){const z=(ZM&&ZM.z>0?ZM.z:1)*DPR,w=hdlW(p[0],p[1]);HDL.C.push([w[0],w[1],p[2]/z])}}return f.apply(this,arguments)})(drawChar);
function hdlSpr(){if(HDL.sp)return HDL.sp;const c=document.createElement('canvas');c.width=128;c.height=40;const x=c.getContext('2d');x.filter='blur(3px)';const gr=x.createLinearGradient(8,0,120,0);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(.5,'rgba(0,0,0,.78)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.beginPath();x.moveTo(10,20);x.bezierCurveTo(10,9,40,8,70,10);x.bezierCurveTo(100,12,118,16,120,20);x.bezierCurveTo(118,24,100,28,70,30);x.bezierCurveTo(40,32,10,31,10,20);x.fill();return HDL.sp=c}
function hdlCast(fx,fy,ang,L,w,a){g.save();g.translate(fx,fy);g.rotate(ang);g.globalAlpha=Math.min(.72,a);g.drawImage(hdlSpr(),-w*.35,-w/2,L+w*.35,w);g.restore()}
function hdlPass(){if(!hdlOn())return;let dg=0,dk=0,h=12;try{dg=isDg()||isTw()||isArena()}catch(e){}try{dk=dnState().dk}catch(e){}try{h=dnHour()}catch(e){}
  const Ls=HDL.Lp.slice().sort((a,b)=>b[2]*b[3]-a[2]*a[3]).slice(0,18),E=[];
  for(const c of HDL.Cp)E.push([c[0],c[1],Math.max(.6,Math.min(1.6,c[2])),40]);
  try{for(const m of mons){if(m.t===3||m.wb||m.pv||m.dum||m.hp<=0)continue;const r=(MT[m.t]&&MT[m.t].r)||12;if(m.x<cam.x-60||m.x>cam.x+W+60||m.y<cam.y-60||m.y>cam.y+H+80)continue;E.push([m.x,m.y+r*.85,Math.max(.7,Math.min(2.2,r/12)),r*2.6])}}catch(e){}
  if(!E.length)return;
  const sunA=(!dg&&(typeof CLDG!=='function'||CLDG(curMap))&&h>=6.5&&h<=18.5)?Math.max(0,.38*(1-dk*2.5)):0,sx=Math.max(-1.1,Math.min(1.1,(h-12)/5.5));
  const dayK=sunA>0?.4+dk:1;g.save();g.globalCompositeOperation='source-over';
  for(const [x,y,sc,ht] of E){let lit=0;const near=[];
    for(const l of Ls){const dx=x-l[0],dy=y-l[1],d=Math.hypot(dx,dy),reach=l[2]*2.4+40;if(d<14||d>reach)continue;const I=Math.min(1,l[3]*2.4)*Math.pow(1-d/reach,1.1)*dayK;if(I<.05)continue;near.push([Math.atan2(dy,dx),d/reach,I])}
    near.sort((a,b)=>b[2]-a[2]);
    for(const [ang,q,I] of near.slice(0,2)){const L=(ht*.55+ht*1.25*q)*sc;hdlCast(x,y,ang,L,19*sc,.7*I+.2);lit+=I;HDL.n++}
    if(sunA>0&&lit<.5){const L=(ht*.35+ht*.45*Math.abs(sx))*sc;hdlCast(x,y,Math.atan2(-.42,sx||.001),L,16*sc,sunA*(1-lit*1.6));HDL.n++}}
  g.restore()}
setTimeout(()=>{try{plxGround=(f=>function(){const r=f.apply(this,arguments);try{hdlPass()}catch(e){HDL.err=String(e)}return r})(plxGround);window.plxGround=plxGround}catch(e){HDL.err=String(e)}},3600);
zmPost=(f=>function(){HDL.Lp=HDL.L;HDL.L=[];HDL.Cp=HDL.C;HDL.C=[];return f.apply(this,arguments)})(zmPost);
