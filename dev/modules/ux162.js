/* ---------- v591 พื้นผาท่าเรือเมฆให้เข้ากับชุดภาพ HD (v590) ----------
   วาดในแผ่นพื้นที่แคชไว้ (ครั้งเดียวต่อแผ่น · ไม่เพิ่มงานต่อเฟรม) · ใช้ตำแหน่งของจริงจากรายการของบนแมพ
   · บนลานไม้: คราบไม้เข้ม/รอยสึกใต้อาคาร · ฟางกับกระสอบหกหน้าคลังเสบียง · ขดเชือกข้างปั้นจั่น/สมอ · รอยน้ำมันหน้าลังไม้ · ตะปู/เศษไม้
   · บนหญ้า: ลานหินปูรอบฐานประภาคาร + กรวด · รอยไถลของซากเรือ (ร่องดินยาว) + เศษไม้ + หญ้าไหม้ + หิน
   ใช้เมื่อเปิดภาพ HD ชุดท่าเรือ (HBA) · ปิด: HBG.off=1 แล้ว PHV/แคชพื้นสร้างใหม่ตอนเข้าแมพ */
const HBG={off:0};
function hbgSpots(){const o={};try{for(const t of trees){if(t.k&&!o[t.k])o[t.k]=[];if(t.k&&String(t.k).startsWith('ph'))o[t.k].push(t)}}catch(e){}return o}
function hbgOn(){try{return !HBG.off&&curMap===38&&!HBA.off&&HDI.on&&!lqHD()}catch(e){return false}}
function hbgBlob(c,x,y,rx,ry,col,a,r){const N=18;c.save();c.globalAlpha=a;c.fillStyle=col;c.beginPath();for(let i=0;i<=N;i++){const t=i/N*6.283,k=.82+r()*.3;const px=x+Math.cos(t)*rx*k,py=y+Math.sin(t)*ry*k;i?c.lineTo(px,py):c.moveTo(px,py)}c.closePath();c.fill();c.restore()}
function hbgRope(c,x,y,s){c.save();c.lineCap='round';for(let i=0;i<4;i++){const r=(9-i*1.8)*s;c.strokeStyle=i%2?'#a88a5a':'#8a6e44';c.lineWidth=3.2*s;c.beginPath();c.ellipse(x,y,r,r*.55,0,0,6.283);c.stroke()}c.strokeStyle='rgba(40,26,14,.5)';c.lineWidth=.8*s;c.beginPath();c.ellipse(x,y,9*s,5*s,0,0,6.283);c.stroke();
  c.strokeStyle='#a88a5a';c.lineWidth=3*s;c.beginPath();c.moveTo(x+9*s,y);c.quadraticCurveTo(x+16*s,y+4*s,x+22*s,y+2*s);c.stroke();c.restore()}
function hbgStraw(c,x,y,n,r){c.save();c.lineCap='round';for(let i=0;i<n;i++){const px=x+(r()-.5)*60,py=y+(r()-.5)*22,a=r()*3.14,L=4+r()*6;c.strokeStyle=r()<.5?'#e2c470':'#c9a24c';c.lineWidth=1.1;c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.cos(a)*L,py+Math.sin(a)*L*.5);c.stroke()}c.restore()}
function hbgPlank(c,x,y,a,L,r){c.save();c.translate(x,y);c.rotate(a);c.fillStyle='rgba(30,20,10,.35)';c.fillRect(-L/2+1,-3,L,7);c.fillStyle=r()<.5?'#7a5634':'#8c6640';c.fillRect(-L/2,-4,L,7);c.strokeStyle='rgba(40,24,12,.6)';c.lineWidth=.8;c.strokeRect(-L/2,-4,L,7);c.restore()}
function hbgPeb(c,x,y,s,r){const col=['#a49a88','#8a8272','#b8ae9a','#7e766a'][(r()*4)|0];c.fillStyle='rgba(30,22,14,.35)';c.beginPath();c.ellipse(x+.5,y+.8,s*1.2,s*.75,0,0,7);c.fill();c.fillStyle=col;c.beginPath();c.ellipse(x,y,s*1.2,s*.75,0,0,7);c.fill()}
function hbgPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x,y,m)=>x+m>ox&&x-m<X1&&y+m>oy&&y-m<Y1,T=hbgSpots(),R=s=>{const f=gxRng(s);return f};
  /* ลานไม้: คราบเข้มใต้อาคาร */
  for(const[k,rx,ry,dy]of[['phhouse',110,34,4],['phmed',96,30,2],['phdep',92,30,4],['phcrane',70,26,4],['phanc',46,18,4]])for(const t of T[k]||[]){if(!inB(t.x,t.y,140))continue;const r=R(t.x*7+t.y);hbgBlob(c,t.x,t.y+dy,rx,ry,'#3a2414',.38,r);hbgBlob(c,t.x+rx*.3,t.y+dy+4,rx*.5,ry*.5,'#2a180c',.24,r)}
  /* คลังเสบียง: ฟาง + เมล็ดข้าวหก */
  for(const t of T.phdep||[]){if(!inB(t.x,t.y,120))continue;const r=R(t.x+3);hbgStraw(c,t.x,t.y+26,46,r);for(let i=0;i<30;i++){c.fillStyle='rgba(230,205,140,.85)';c.beginPath();c.arc(t.x+30+(r()-.5)*30,t.y+22+(r()-.5)*10,1.1,0,7);c.fill()}}
  /* ขดเชือกข้างปั้นจั่น/สมอ */
  for(const t of(T.phcrane||[]).concat(T.phanc||[])){if(!inB(t.x,t.y,80))continue;hbgRope(c,t.x+(t.k==='phanc'?40:-48),t.y+(t.k==='phanc'?20:22),1.1)}
  /* ลังไม้: รอยน้ำมัน/น้ำ + ตะปู */
  for(const t of(T.phcrate||[]).concat(T.phbarrel||[])){if(!inB(t.x,t.y,60))continue;const r=R(t.x*3+t.y*5);hbgBlob(c,t.x+8,t.y+6,26,10,'#20140a',.22,r);for(let i=0;i<4;i++){c.fillStyle='#55504a';c.fillRect(t.x+(r()-.5)*50,t.y+10+(r()-.5)*16,2,2)}}
  /* เต็นท์พยาบาล: ผ้าพันแผล/ถังน้ำเล็ก (จุดขาว) */
  for(const t of T.phmed||[]){if(!inB(t.x,t.y,120))continue;const r=R(t.x+11);hbgStraw(c,t.x-60,t.y+30,14,r)}
  /* ประภาคาร: ลานหินปูรอบฐาน + กรวด */
  for(const t of T.phlh||[]){if(!inB(t.x,t.y,160))continue;const r=R(t.x+t.y),cx=t.x,cy=t.y+22;
    hbgBlob(c,cx,cy,130,48,'#5a4c38',.35,r);const ring=(r0,r1,seg)=>{for(let q=0;q<seg;q++){const a0=q/seg*6.283,a1=(q+1)/seg*6.283-.04;c.beginPath();c.ellipse(cx,cy,r1,r1*.38,0,a0,a1);c.ellipse(cx,cy,r0,r0*.38,0,a1,a0,true);c.closePath();c.fillStyle=['#a8a090','#9a9284','#b4ac98','#8e877a'][q%4];c.fill();c.strokeStyle='rgba(44,34,24,.7)';c.lineWidth=.8;c.stroke()}};
    ring(84,104,30);ring(104,122,38);for(let i=0;i<26;i++){const a=r()*6.283,d=124+r()*26;hbgPeb(c,cx+Math.cos(a)*d,cy+Math.sin(a)*d*.38,1.4+r()*1.6,r)}}
  /* ซากเรือ: รอยไถลยาว + หญ้าไหม้ + เศษไม้ + หิน */
  for(const t of T.phwreck||[]){if(!inB(t.x,t.y,460))continue;const r=R(t.x*13),cx=t.x+38,cy=t.y+40;
    hbgBlob(c,cx,cy,330,70,'#2e2a1a',.22,r);
    c.save();c.lineCap='round';for(const[w,col]of[[44,'rgba(70,52,30,.55)'],[30,'rgba(110,84,52,.75)'],[10,'rgba(150,120,80,.4)']]){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(cx-430,cy+30);c.quadraticCurveTo(cx-260,cy+44,cx-120,cy+26);c.stroke()}c.restore();
    for(let i=0;i<10;i++)hbgPlank(c,cx-380+r()*560,cy+20+(r()-.5)*70,(r()-.5)*1.6,14+r()*20,r);
    for(let i=0;i<16;i++)hbgPeb(c,cx-300+r()*560,cy+16+(r()-.5)*80,1.6+r()*3,r)}}
setTimeout(()=>{try{const _pp=phPaint;window.phPaint=phPaint=function(c,ox,oy,S){const r=_pp.apply(this,arguments);if(hbgOn())try{hbgPaint(c,ox,oy,S)}catch(e){console.warn('hbg',e)}return r}}catch(e){console.warn('hbg',e)}},1600);
