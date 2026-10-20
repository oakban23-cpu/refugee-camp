/* ===== v466 · ประตูวาร์ปในค่ายภาพวาดใหม่ (hd-gate.webp) =====
   - ประตูแสงดาว (ค่าย → นครลอยฟ้า): แท่นหินจันทร์วงรูน เสาคริสตัลดาว ซุ้มดาว · ลำแสง/วงแสงยังวาดสดเหมือนเดิม (ปรับวงให้เข้ามุมแท่น)
   - ประตูบ้านกิลด์ในค่าย: ซุ้มหินชนวน+ไม้ หลังคาทองแดง โล่ดาบไขว้ โคม 2 ข้าง · ธงขาว 3 ผืนย้อมสีกิลด์ · แสงเรืองในช่องประตู */
const CGD={src:"hd-gate.webp",f:{"star":[0,0,380,383],"guild":[382,0,340,310],"guild_m":[724,0,170,155]}},CGI={img:null,ok:0},CGTC={};
function cgOk(){try{if(!HDI.on||LOWQ)return false;if(!CGI.img){const im=new Image();im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{CGI.ok=1})};im.onerror=()=>{CGI.ok=-1};im.src=CGD.src;CGI.img=im}return CGI.ok===1}catch(e){return false}}
function cgStar(x,y){const q=CGD.f.star,w=164,h=w*q[3]/q[2];g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(x+4,y+4+h*.3,w*.46,h*.16,0,0,7);g.fill();g.drawImage(CGI.img,q[0],q[1],q[2],q[3],x-w*.497,y+4-h*.58,w,h)}
function cgGuildSpr(col){if(CGTC[col])return CGTC[col];const q=CGD.f.guild,m=CGD.f.guild_m,cv=document.createElement('canvas');cv.width=q[2];cv.height=q[3];const c=cv.getContext('2d');c.drawImage(CGI.img,q[0],q[1],q[2],q[3],0,0,q[2],q[3]);
  if(m){const t=document.createElement('canvas');t.width=q[2];t.height=q[3];const x2=t.getContext('2d');x2.drawImage(CGI.img,m[0],m[1],m[2],m[3],0,0,q[2],q[3]);x2.globalCompositeOperation='source-in';x2.fillStyle=ghShade(col,.25);x2.fillRect(0,0,q[2],q[3]);c.globalCompositeOperation='multiply';c.drawImage(t,0,0);c.globalCompositeOperation='destination-in';c.drawImage(CGI.img,q[0],q[1],q[2],q[3],0,0,q[2],q[3]);c.globalCompositeOperation='source-over'}
  return CGTC[col]=cv}
function cgGuild(x,y,col,now){const q=CGD.f.guild,w=146,h=w*q[3]/q[2],top=y+8-h*.82;
  g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x+3,y+12,w*.46,13,0,0,7);g.fill();
  const gr=g.createLinearGradient(0,top+h*.33,0,y+8);gr.addColorStop(0,'rgba(255,230,160,.25)');gr.addColorStop(1,'rgba(255,210,120,.75)');g.fillStyle=gr;g.beginPath();g.moveTo(x-30,y+8);g.lineTo(x-30,top+h*.47);g.quadraticCurveTo(x,top+h*.26,x+30,top+h*.47);g.lineTo(x+30,y+8);g.closePath();g.fill();
  g.save();g.globalCompositeOperation='lighter';glowAt(x,y-26,46,'255,210,120',.32+.12*Math.sin(now*2.5));for(let k=0;k<6;k++){const qq=(now*.4+k/6)%1;g.fillStyle='rgba(255,236,170,'+(.6*(1-qq))+')';g.beginPath();g.arc(x-24+((k*37)%48),y+2-qq*60,1.8,0,7);g.fill()}g.restore();
  g.drawImage(cgGuildSpr(col),x-w/2,top,w,h);
  g.save();g.globalCompositeOperation='lighter';[[-.455,.47],[.455,.47]].forEach(([fx,fy],i)=>glowAt(x+w*fx,top+h*fy,20,'255,190,90',.4+.12*Math.sin(now*6+i*2)));g.restore()}
