/* ===== v480 · ผ้าม่านพระราชวัง (ธีม palace ของ d4Screen) วาดใหม่ =====
   เดิม (d4Valance): แถบระบายสีน้ำเงินคาดที่ y=74 ยาวเต็มจอ + ม่านข้างแผ่นเรียบ 34×300 → จอกว้างตัดผ่านปุ่มเมนู/แผนที่เล็ก ดูเป็นแถบแปะ
   ใหม่: กรอบเวทีห้องท้องพระโรง ชิดขอบบนจอ
     - ราวทองบนสุด (หัวราวกลมสองข้าง) · ระบายโค้ง (swag) กว้าง ~118 หน่วย ลึก ~24 หน่วย นับจำนวนตามความกว้างจอให้ลงตัวพอดี
       ผ้ากำมะหยี่น้ำเงินไล่เฉด + รอยพับโค้ง 3 ชั้น · ขอบล่างเดินทองสองเส้น + พู่ระบายทองห้อย · รอยต่อระหว่างโค้ง = ดอกกุหลาบทอง + พู่ห้อยยาว
     - ม่านข้างซ้าย/ขวา: บนกว้าง → ถูกรวบด้วยเชือกทอง (ที่ ~42% ความสูงจอ) → บานออกถึงพื้น · รอยพับแนวตั้งรวบเข้าหาจุดผูก · ขอบในเดินทอง · พู่ใหญ่ห้อยจากเชือก
     - ขนาดเป็นหน่วยเกม เท่ากันทุกจอ (แนวตั้ง/แนวนอน/PC) · ภาพนิ่งแคชเป็นแคนวาส (แถบบน 1 ภาพ + ม่านข้าง 1 ภาพ กลับด้านใช้อีกฝั่ง) วาดซ้ำทุกเฟรมถูก
     - พู่ห้อยแกว่งเบา ๆ วาดสดทับ (ประหยัดกราฟิก = ไม่แกว่ง) */
const DRP={k:'',top:null,side:null,th:0,sw:0,n:0,ty:0};
const DRC={dk:'#0a0e30',bl:'#1c2a78',md:'#2b3c9e',hi:'#4a63cc',g1:'#a8761e',g2:'#e2b450',g3:'#ffe9a0'};
function drpGoldGrad(c,x0,y0,x1,y1){const gr=c.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,DRC.g1);gr.addColorStop(.45,DRC.g3);gr.addColorStop(.6,DRC.g2);gr.addColorStop(1,DRC.g1);return gr}
/* พู่ทอง: หัวกลม + คอ + พวงเส้นห้อย (จุดแขวนที่ 0,0 ห้อยลง L) */
function drpTassel(c,x,y,L,s){s=s||1;c.save();c.translate(x,y);c.strokeStyle=DRC.g2;c.lineWidth=1.4*s;c.beginPath();c.moveTo(0,0);c.lineTo(0,L*.32);c.stroke();
  c.fillStyle=drpGoldGrad(c,-4*s,0,4*s,0);c.beginPath();c.ellipse(0,L*.36,3.6*s,4.4*s,0,0,7);c.fill();c.fillRect(-2.2*s,L*.42,4.4*s,2.4*s);
  const top=L*.48,bw=5.5*s;c.beginPath();c.moveTo(-2.4*s,top);c.quadraticCurveTo(-bw,L*.72,-bw*.92,L);c.lineTo(bw*.92,L);c.quadraticCurveTo(bw,L*.72,2.4*s,top);c.closePath();c.fillStyle=drpGoldGrad(c,-bw,0,bw,0);c.fill();
  c.strokeStyle='rgba(110,70,10,.55)';c.lineWidth=.7*s;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*.7*s,top+2*s);c.lineTo(i*1.45*s,L-1);c.stroke()}
  c.fillStyle=DRC.g3;c.globalAlpha=.6;c.fillRect(-1*s,top+1*s,1.2*s,(L-top)*.7);c.restore()}
/* ดอกกุหลาบทองที่รอยต่อระบาย */
function drpRosette(c,x,y,r){const gr=c.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);gr.addColorStop(0,DRC.g3);gr.addColorStop(.55,DRC.g2);gr.addColorStop(1,DRC.g1);c.fillStyle=gr;c.beginPath();
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2,rr=i%2?r*.78:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill();c.strokeStyle='rgba(90,55,8,.6)';c.lineWidth=.8;c.stroke();
  c.fillStyle='#fff6cf';c.beginPath();c.arc(x-r*.15,y-r*.15,r*.28,0,7);c.fill()}
/* แถบบน: ราว + ระบายโค้ง n ช่อง (กว้าง Wd หน่วย · สูงภาพ TH หน่วย) */
function drpTop(c,Wd,n,sw){const rod=7,y0=rod+1,d=24;
  /* เงาใต้ระบายให้ลอยจากฉาก */
  c.save();c.shadowColor='rgba(0,0,0,.55)';c.shadowBlur=10;c.shadowOffsetY=4;c.fillStyle=DRC.dk;c.beginPath();c.moveTo(0,0);c.lineTo(Wd,0);c.lineTo(Wd,y0+4);
  for(let i=n-1;i>=0;i--){const a=i*sw,b=a+sw;c.quadraticCurveTo(a+sw/2,y0+d*2,a,y0+4)}c.closePath();c.fill();c.restore();
  for(let i=0;i<n;i++){const a=i*sw,b=a+sw,m=a+sw/2;
    const gr=c.createLinearGradient(0,y0-2,0,y0+d+6);gr.addColorStop(0,DRC.dk);gr.addColorStop(.35,DRC.bl);gr.addColorStop(.7,DRC.md);gr.addColorStop(1,DRC.bl);
    c.fillStyle=gr;c.beginPath();c.moveTo(a-1,y0-2);c.lineTo(b+1,y0-2);c.lineTo(b+1,y0+4);c.quadraticCurveTo(m,y0+d*2,a-1,y0+4);c.closePath();c.fill();
    /* รอยพับโค้ง: เงา + ไฮไลต์ */
    for(const [f,al,col] of [[.38,.32,'0,0,0'],[.5,.22,'120,150,255'],[.66,.3,'0,0,0'],[.78,.2,'130,160,255']]){c.strokeStyle='rgba('+col+','+al+')';c.lineWidth=col==='0,0,0'?2.2:1.4;c.beginPath();c.moveTo(a+sw*.08,y0+2);c.quadraticCurveTo(m,y0+d*2*f,b-sw*.08,y0+2);c.stroke()}
    /* ขอบทองล่าง 2 เส้น */
    c.strokeStyle=DRC.g1;c.lineWidth=3.6;c.beginPath();c.moveTo(a,y0+4);c.quadraticCurveTo(m,y0+d*2,b,y0+4);c.stroke();
    c.strokeStyle=DRC.g3;c.lineWidth=1.3;c.beginPath();c.moveTo(a,y0+3);c.quadraticCurveTo(m,y0+d*2-1.5,b,y0+3);c.stroke();
    /* พู่ระบาย (ฝอยทอง) ตามแนวโค้ง */
    const N=Math.round(sw/3.2);for(let k=1;k<N;k++){const u=k/N,x=(1-u)*(1-u)*a+2*u*(1-u)*m+u*u*b,y=(1-u)*(1-u)*(y0+4)+2*u*(1-u)*(y0+d*2)+u*u*(y0+4),L=5+(k%2)*1.6;
      c.strokeStyle=k%3?DRC.g2:DRC.g3;c.lineWidth=1;c.beginPath();c.moveTo(x,y+1);c.lineTo(x+.4,y+1+L);c.stroke()}}
  /* ราวทอง + หัวราว */
  c.fillStyle=drpGoldGrad(c,0,0,0,rod);c.fillRect(0,0,Wd,rod);c.fillStyle='rgba(90,55,8,.5)';c.fillRect(0,rod-1.2,Wd,1.2);
  for(let i=0;i<=n;i++)drpRosette(c,i*sw,y0+3,6.2)}
/* ม่านข้างซ้าย (ขวา = กลับด้าน): กว้างบน TW · รวบที่ ty กว้าง TI · ล่างบานกว้าง BW */
function drpSide(c,Hs,ty){const TW=46,TI=15,BW=40,o=0;
  const shape=()=>{c.beginPath();c.moveTo(0,0);c.lineTo(TW,0);c.bezierCurveTo(TW*.95,ty*.45,TI+6,ty*.85,TI,ty);c.bezierCurveTo(TI+4,ty+(Hs-ty)*.35,BW*.92,Hs*.86,BW,Hs);c.lineTo(0,Hs);c.closePath()};
  c.save();c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=12;c.shadowOffsetX=4;c.fillStyle=DRC.dk;shape();c.fill();c.restore();
  const gr=c.createLinearGradient(0,0,TW,0);gr.addColorStop(0,'#070a24');gr.addColorStop(.25,DRC.md);gr.addColorStop(.45,DRC.bl);gr.addColorStop(.62,DRC.hi);gr.addColorStop(.8,DRC.bl);gr.addColorStop(1,DRC.dk);
  c.save();shape();c.fillStyle=gr;c.fill();c.clip();
  /* รอยพับแนวตั้งรวบเข้าหาจุดผูก */
  for(let k=1;k<6;k++){const u=k/6,xt=TW*u,xi=TI*u,xb=BW*u;c.strokeStyle=k%2?'rgba(0,0,0,.34)':'rgba(140,170,255,.28)';c.lineWidth=k%2?3:1.6;c.beginPath();c.moveTo(xt,0);c.bezierCurveTo(xt*.95,ty*.45,xi+4*u,ty*.85,xi,ty);c.bezierCurveTo(xi+3*u,ty+(Hs-ty)*.35,xb*.92,Hs*.86,xb,Hs);c.stroke()}
  /* เงาใต้เชือก */const sg=c.createLinearGradient(0,ty-26,0,ty+26);sg.addColorStop(0,'rgba(0,0,0,0)');sg.addColorStop(.5,'rgba(0,0,0,.35)');sg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=sg;c.fillRect(0,ty-26,TW+10,52);c.restore();
  /* ขอบในเดินทอง */
  c.strokeStyle=DRC.g1;c.lineWidth=3.4;c.beginPath();c.moveTo(TW,0);c.bezierCurveTo(TW*.95,ty*.45,TI+6,ty*.85,TI,ty);c.bezierCurveTo(TI+4,ty+(Hs-ty)*.35,BW*.92,Hs*.86,BW,Hs);c.stroke();
  c.strokeStyle=DRC.g3;c.lineWidth=1.2;c.beginPath();c.moveTo(TW-1.5,0);c.bezierCurveTo(TW*.95-1.5,ty*.45,TI+4.5,ty*.85,TI-1.5,ty);c.bezierCurveTo(TI+2.5,ty+(Hs-ty)*.35,BW*.92-1.5,Hs*.86,BW-1.5,Hs);c.stroke();
  /* เชือกทองรัดม่าน */
  c.save();c.translate(0,ty);c.fillStyle=drpGoldGrad(c,0,-4,0,4);c.beginPath();c.moveTo(-2,-4);c.quadraticCurveTo(TI*.6,-7,TI+5,-2);c.lineTo(TI+5,3);c.quadraticCurveTo(TI*.6,7,-2,4);c.closePath();c.fill();
  c.strokeStyle='rgba(90,55,8,.6)';c.lineWidth=.8;for(let x=0;x<TI+4;x+=3){c.beginPath();c.moveTo(x,-4);c.lineTo(x+2.4,4);c.stroke()}c.restore()}
function drpBuild(Wd,Hs,dpr){const n=Math.max(3,Math.round(Wd/118)),sw=Wd/n,TH=70,ty=Math.round(Math.min(Hs*.42,330)),SWD=64;
  const mk=(w,h)=>{const e=document.createElement('canvas');e.width=Math.ceil(w*dpr);e.height=Math.ceil(h*dpr);const c=e.getContext('2d');c.scale(dpr,dpr);return[e,c]};
  const [te,tc]=mk(Wd,TH);drpTop(tc,Wd,n,sw);const [se,sc]=mk(SWD,Hs);sc.translate(0,0);drpSide(sc,Hs,ty);
  DRP.top=te;DRP.side=se;DRP.th=TH;DRP.sw=SWD;DRP.n=n;DRP.swg=sw;DRP.ty=ty}
function d4Drape(t,Wd,Hs){const dpr=Math.min(2,DPR),key=Math.round(Wd)+'x'+Math.round(Hs)+'@'+dpr;if(DRP.k!==key){DRP.k=key;drpBuild(Wd,Hs,dpr)}
  g.save();g.drawImage(DRP.side,0,0,DRP.sw,Hs);g.save();g.translate(Wd,0);g.scale(-1,1);g.drawImage(DRP.side,0,0,DRP.sw,Hs);g.restore();
  g.drawImage(DRP.top,0,0,Wd,DRP.th);
  /* พู่ห้อยที่รอยต่อระบาย + พู่ใหญ่ที่เชือกรัดม่าน (แกว่งเบา ๆ) */
  const Q=typeof LOWQ!=='undefined'&&LOWQ;for(let i=1;i<DRP.n;i++){const x=i*DRP.swg,sw=Q?0:Math.sin(t*1.3+i*1.7)*.05;g.save();g.translate(x,14);g.rotate(sw);drpTassel(g,0,0,30,1);g.restore()}
  for(const s of[0,1]){const x=s?Wd-18:18,sw=Q?0:Math.sin(t*1.1+s*2)*.06;g.save();g.translate(x,DRP.ty+3);g.rotate(sw);drpTassel(g,0,0,44,1.35);g.restore()}
  g.restore()}
