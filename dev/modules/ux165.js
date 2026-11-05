/* ---------- v594 พื้นย่านวงแหวนล่างให้เข้ากับชุดภาพ HD (MKA) ----------
   วาดในแผ่นพื้นที่แคชไว้ (ครั้งเดียวต่อแผ่น · ไม่เพิ่มงานต่อเฟรม) · ใช้ตำแหน่งของจริงจากรายการของบนแมพ
   · บ้าน: แผ่นหินหน้าประตู + กระถางดินเผาดอกไม้ + รอยเดินสึก · แผงตลาด: เสื่อสาน + ผลไม้/ขนมปังหล่น + ฟาง
   · ซากบ้าน/กองหิน: เศษหินขาว + กระเบื้องดินเผาแตก + หญ้าแซม · หอคอย: วงหินปูรอบฐาน · ลังไม้: ฟาง + เมล็ดข้าวหก
   · เงาใต้บ้าน/ซากบ้านแบนลง (เดิมเป็นวงรีใหญ่ยื่นออกมาใต้ฐาน) · ปิด: MKD2.off=1 */
const MKD2={off:0};
function mkdOn(){try{return !MKD2.off&&curMap===31&&!MKA.off&&HDI.on&&!lqHD()}catch(e){return false}}
function mkdPeb(c,x,y,s,r,col){c.fillStyle='rgba(40,30,20,.3)';c.beginPath();c.ellipse(x+.6,y+1,s*1.2,s*.7,0,0,7);c.fill();c.fillStyle=col||['#e8e0cc','#d6ccb4','#f2ecdc','#c8bea6'][(r()*4)|0];c.beginPath();c.ellipse(x,y,s*1.2,s*.7,r()*.6,0,7);c.fill();c.strokeStyle='rgba(90,76,56,.55)';c.lineWidth=.7;c.stroke()}
function mkdTile(c,x,y,s,r){c.save();c.translate(x,y);c.rotate(r()*3.14);c.fillStyle='rgba(40,20,10,.3)';c.fillRect(-s+1,-s*.45+1,s*2,s*.9);c.fillStyle=['#b4553a','#9c4630','#c4683e'][(r()*3)|0];c.beginPath();c.moveTo(-s,-s*.45);c.lineTo(s*.8,-s*.45);c.lineTo(s,s*.2);c.lineTo(s*.3,s*.45);c.lineTo(-s,s*.45);c.closePath();c.fill();c.strokeStyle='rgba(70,30,16,.6)';c.lineWidth=.7;c.stroke();c.restore()}
function mkdTuft(c,x,y,s,r){c.save();c.lineCap='round';for(let i=0;i<6;i++){const a=-1.57+(r()-.5)*1.6,L=(5+r()*6)*s;c.strokeStyle=r()<.5?'#6a8a40':'#557434';c.lineWidth=1.3;c.beginPath();c.moveTo(x+(r()-.5)*5,y);c.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);c.stroke()}c.restore()}
function mkdPot(c,x,y,s,col){c.fillStyle='rgba(30,20,10,.3)';c.beginPath();c.ellipse(x+1,y+1.5,7*s,3*s,0,0,7);c.fill();c.fillStyle='#b05a36';c.beginPath();c.moveTo(x-6*s,y-9*s);c.lineTo(x+6*s,y-9*s);c.lineTo(x+4.5*s,y);c.lineTo(x-4.5*s,y);c.closePath();c.fill();c.fillStyle='#c8724a';c.fillRect(x-7*s,y-11*s,14*s,3*s);
  c.fillStyle='#4f7a34';c.beginPath();c.arc(x-3*s,y-13*s,4*s,0,7);c.arc(x+3*s,y-13.5*s,4*s,0,7);c.arc(x,y-16*s,4*s,0,7);c.fill();c.fillStyle=col;for(const[dx,dy]of[[-3,-15],[3,-16],[0,-18.5],[4,-12.5]]){c.beginPath();c.arc(x+dx*s,y+dy*s,1.7*s,0,7);c.fill()}}
function mkdStraw(c,x,y,n,w,r){c.save();c.lineCap='round';for(let i=0;i<n;i++){const px=x+(r()-.5)*w,py=y+(r()-.5)*w*.35,a=r()*3.14,L=4+r()*6;c.strokeStyle=r()<.5?'#e2c470':'#c9a24c';c.lineWidth=1.1;c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.cos(a)*L,py+Math.sin(a)*L*.5);c.stroke()}c.restore()}
function mkdPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,inB=(x,y,m)=>x+m>ox&&x-m<X1&&y+m>oy&&y-m<Y1,T={};for(const t of trees){if(!t.k||t.inv)continue;(T[t.k]=T[t.k]||[]).push(t)}
  /* บ้าน: รอยเดินสึก + แผ่นหินหน้าประตู + กระถางดอกไม้ */
  for(const t of T.mhouse||[]){if(!inB(t.x,t.y,120))continue;const r=gxRng((t.x*7+t.y*3)|0),L=MKA.m.mhouse[(t.v|0)%5],fl=L[2]?-1:1,dx=L[0]==='h2'||L[0]==='h0'?0:fl*-4;
    const gr=c.createRadialGradient(t.x+dx,t.y+14,2,t.x+dx,t.y+14,40);gr.addColorStop(0,'rgba(120,100,70,.32)');gr.addColorStop(1,'rgba(120,100,70,0)');c.fillStyle=gr;c.beginPath();c.ellipse(t.x+dx,t.y+16,40,16,0,0,7);c.fill();
    c.fillStyle='rgba(50,40,30,.3)';c.beginPath();c.roundRect(t.x+dx-17,t.y+3,34,11,3);c.fill();c.fillStyle='#ddd3bc';c.beginPath();c.roundRect(t.x+dx-18,t.y+1,34,10,3);c.fill();c.strokeStyle='rgba(110,92,66,.7)';c.lineWidth=.9;c.stroke();
    c.beginPath();c.moveTo(t.x+dx-1,t.y+1);c.lineTo(t.x+dx-1,t.y+11);c.stroke();
    const pc=['#e85a7a','#f0c040','#e86a3a','#c070d0'][(r()*4)|0],hw=L[1]*.36;if(r()<.85)mkdPot(c,t.x-hw,t.y+10,.9,pc);if(r()<.7)mkdPot(c,t.x+hw,t.y+12,.8,['#e85a7a','#f0c040','#ffffff'][(r()*3)|0]);
    for(let i=0;i<3;i++)mkdPeb(c,t.x+(r()-.5)*L[1],t.y+16+r()*14,1.4+r()*1.4,r)}
  /* แผงตลาด: เสื่อสาน + ของหล่น + ฟาง */
  for(const t of T.mstall||[]){if(!inB(t.x,t.y,80))continue;const r=gxRng((t.x*5+t.y*11)|0),v=t.v|0,cx=t.x,cy=t.y+16;
    c.save();c.translate(cx,cy);c.fillStyle='rgba(40,30,20,.25)';c.beginPath();c.roundRect(-33,-8,68,20,4);c.fill();c.fillStyle='#c8aa70';c.beginPath();c.roundRect(-34,-10,68,19,4);c.fill();
    c.strokeStyle='rgba(120,90,46,.55)';c.lineWidth=1;for(let k=-30;k<32;k+=6){c.beginPath();c.moveTo(k,-9);c.lineTo(k+3,8);c.stroke()}c.strokeStyle=['#b8382e','#2f4f8e','#c89a2a','#b8382e','#2f4f8e','#c89a2a'][v];c.lineWidth=2;c.beginPath();c.roundRect(-31,-7,62,13,3);c.stroke();c.restore();
    const G=[['#d0402e','#ee9a2a'],['#5a7ab0','#c84a3a','#e8e0d0'],['#d8a04a','#b87a3a'],['#d0402e','#ee9a2a'],['#5a7ab0','#c84a3a'],['#d8a04a','#b87a3a']][v];
    for(let i=0;i<4;i++){const px=cx+(r()-.5)*90,py=cy+12+r()*14;c.fillStyle='rgba(30,20,10,.3)';c.beginPath();c.ellipse(px+.8,py+1.6,3.6,1.8,0,0,7);c.fill();c.fillStyle=G[(r()*G.length)|0];c.beginPath();c.arc(px,py,3,0,7);c.fill();c.fillStyle='rgba(255,255,255,.4)';c.beginPath();c.arc(px-1,py-1,1,0,7);c.fill()}
    mkdStraw(c,cx+(r()-.5)*30,cy+20,12,70,r)}
  /* ซากบ้าน/กองหิน: เศษหิน + กระเบื้องแตก + หญ้าแซม */
  for(const t of(T.mruin||[]).concat(T.mrub||[])){if(!inB(t.x,t.y,130))continue;const r=gxRng((t.x*13+t.y)|0),W=t.k==='mrub'?60:100;
    const gr=c.createRadialGradient(t.x,t.y+8,4,t.x,t.y+8,W);gr.addColorStop(0,'rgba(70,90,50,.28)');gr.addColorStop(1,'rgba(70,90,50,0)');c.fillStyle=gr;c.beginPath();c.ellipse(t.x,t.y+10,W,W*.36,0,0,7);c.fill();
    for(let i=0;i<(t.k==='mrub'?10:16);i++){const a=r()*6.283,d=W*(.45+r()*.6);mkdPeb(c,t.x+Math.cos(a)*d,t.y+10+Math.sin(a)*d*.36,1.6+r()*2.6,r)}
    for(let i=0;i<5;i++){const a=r()*6.283,d=W*(.4+r()*.6);mkdTile(c,t.x+Math.cos(a)*d,t.y+10+Math.sin(a)*d*.36,3+r()*2,r)}
    for(let i=0;i<5;i++){const a=r()*6.283,d=W*(.5+r()*.5);mkdTuft(c,t.x+Math.cos(a)*d,t.y+12+Math.sin(a)*d*.36,.9+r()*.5,r)}}
  /* หอคอย: วงหินปูรอบฐาน */
  for(const t of T.mtow||[]){if(!inB(t.x,t.y,80))continue;const r=gxRng((t.x+t.y*7)|0),cx=t.x,cy=t.y+6,seg=18;
    for(const[r0,r1]of[[30,42],[42,52]])for(let q=0;q<seg;q++){const a0=q/seg*6.283,a1=(q+1)/seg*6.283-.05;c.beginPath();c.ellipse(cx,cy,r1,r1*.4,0,a0,a1);c.ellipse(cx,cy,r0,r0*.4,0,a1,a0,true);c.closePath();c.fillStyle=['#e2d8c2','#d2c8b0','#ece4d0','#c6bca4'][q%4];c.fill();c.strokeStyle='rgba(100,84,60,.6)';c.lineWidth=.7;c.stroke()}
    for(let i=0;i<3;i++)mkdTuft(c,cx+(r()-.5)*100,cy+8+r()*10,.8,r)}
  /* ลังไม้: ฟาง + เมล็ดข้าว */
  for(const t of T.bcrate||[]){if(!inB(t.x,t.y,50))continue;const r=gxRng((t.x*3+t.y*5)|0);mkdStraw(c,t.x+6,t.y+8,14,44,r);for(let i=0;i<14;i++){c.fillStyle='rgba(236,212,150,.9)';c.beginPath();c.arc(t.x+16+(r()-.5)*22,t.y+8+(r()-.5)*8,1,0,7);c.fill()}}}
setTimeout(()=>{try{
  const _p=mktPaint;window.mktPaint=mktPaint=function(c,ox,oy,S){const r=_p.apply(this,arguments);if(mkdOn())try{mkdPaint(c,ox,oy,S)}catch(e){console.warn('mkg',e)}return r};
  const _b=mktBuild;window.mktBuild=mktBuild=function(M){const r=_b.apply(this,arguments);try{for(const d of MKT.dec)if(d.r>=40)d.r=24}catch(e){}return r};
}catch(e){console.warn('mkg',e)}},1700);
