/* ---------- v400 ภาพเฉพาะของรูนคลาส 3 ----------
   รูนที่เดิมใช้ภาพเหมือนสกิลปกติจนดูไม่ออกว่าใส่รูนอยู่ หรือภาพอ่อนเกินไป
   r27sum ดาบ 6 เล่มตั้งขบวนรอบตัวก่อนพุ่ง (ดาบรวมศูนย์) · r27x รอยกากบาทตอนเล่มสุดท้ายปัก
   r27rf ออร่าหนามโลหิตตลอดเวลาสะท้อน (สะท้อนคลั่ง) · r27cd วงนับถอยหลังก่อนโล่ระเบิด (โล่ระเบิด)
   r27hl ละอองฟื้นฟูสีเขียวในวง (วงฟื้นฟู) · r27ln หอกเงาแทงทะลวงเป็นเส้นยาว (แทงทะลวง)
   อิมป์ยักษ์ วาดตัวอิมป์ใหญ่ขึ้น 2.2 เท่า */
FXB.r27sum=(f,p,x,y,r,now)=>{const o=s6Own(f.u),sx=o?o.x:f.sx,sy=o?o.y:f.sy;g.save();VX.lite();
  const fa=Math.min(1,p*10)*(1-p);glowAt(sx,sy-24,54,S6C.blood,.45*fa);
  g.save();g.translate(sx,sy);g.scale(1,.45);VX.ring(0,0,30+26*p,4*(1-p)+1,S6C.blood,.8*fa);VX.ring(0,0,22+20*p,1.5,'255,200,190',.6*fa);g.restore();
  g.globalCompositeOperation='source-over';
  for(let i=0;i<6;i++){const tl=(.25+i*.07)/.7;if(p>=tl)continue;const a=i*1.047,px=sx+Math.cos(a)*58,py=sy-34+Math.sin(a)*18,v=Math.min(1,p*9-i*.25);if(v<=0)continue;
    const bob=Math.sin(now*10+i)*1.5;s6Sword(px,py+bob-(1-v)*10,Math.atan2(y-py,x-px),44,v,S6C.blood);VX.lite();glowAt(px,py,14,S6C.blood,.35*v);g.globalCompositeOperation='source-over'}
  g.restore()};
FXB.r27x=(f,p,x,y,r,now)=>{const a=1-p,R=(r||44)*(1+.35*p),gr=Math.min(1,p*7),cy=y-12;g.save();VX.lite();
  glowAt(x,cy,R*1.7,S6C.blood,.6*a);glowAt(x,cy,R*.55,'255,235,225',.9*a*a);
  g.save();g.translate(x,y);g.scale(1,.45);VX.ring(0,0,R*(.6+.9*p),6*a+1,'255,70,70',.8*a);g.restore();
  for(const s of[-1,1]){g.save();g.translate(x,cy);g.rotate(s*.8);const L=R*1.35*gr,w=(6*a+1.5);
    g.fillStyle='rgba(255,70,80,'+(.9*a)+')';g.beginPath();g.moveTo(-L,0);g.quadraticCurveTo(0,-w,L,0);g.quadraticCurveTo(0,w,-L,0);g.fill();
    g.fillStyle='rgba(255,245,240,'+a+')';g.beginPath();g.moveTo(-L*.85,0);g.quadraticCurveTo(0,-1.4,L*.85,0);g.quadraticCurveTo(0,1.4,-L*.85,0);g.fill();g.restore()}
  for(let i=0;i<10;i++){const an=fxR(f,i,1)*6.283,d=R*(.3+1.1*p)*fxR(f,i,2);glowAt(x+Math.cos(an)*d,cy+Math.sin(an)*d*.6,3,'255,150,140',a)}
  g.restore()};
FXB.r27rf=(f,p,x,y,r,now)=>{const o=s6Own(f.u);if(o){x=o.x;y=o.y}const D=7,el=p*D,a=Math.min(1,el*5,(D-el)*2);if(a<=.01)return;g.save();VX.lite();
  const pu=.75+.25*Math.sin(now*9);glowAt(x,y-18,48*pu,'255,40,40',.42*a);
  g.save();g.translate(x,y);g.scale(1,.45);VX.ring(0,0,36,3,'255,50,50',.75*a);VX.ring(0,0,44+4*Math.sin(now*6),1.5,'255,150,120',.45*a);g.restore();
  g.globalCompositeOperation='source-over';
  for(let i=0;i<12;i++){const an=i*.5236+now*.9,cx=x+Math.cos(an)*40,cy=y+Math.sin(an)*18,h=(14+8*Math.max(0,Math.sin(now*7+i*1.7)))*a,s=Math.sin(an)>0?1:.55;
    g.fillStyle='rgba(140,8,20,'+(.9*a*s)+')';g.beginPath();g.moveTo(cx-4,cy);g.lineTo(cx+Math.cos(an)*4,cy-h);g.lineTo(cx+4,cy);g.closePath();g.fill();
    g.fillStyle='rgba(255,130,120,'+(.75*a*s)+')';g.beginPath();g.moveTo(cx-1,cy-1);g.lineTo(cx+Math.cos(an)*3,cy-h);g.lineTo(cx+1,cy-1);g.closePath();g.fill()}
  VX.lite();for(let i=0;i<4;i++){const ph=(now*.9+i*.25)%1;glowAt(x+Math.sin(i*2.1+now)*18,y-10-ph*40,4,'255,60,60',.6*a*Math.sin(ph*Math.PI))}
  g.restore()};
FXB.r27cd=(f,p,x,y,r,now)=>{const o=s6Own(f.u);if(o){x=o.x;y=o.y}const D=5,el=p*D,a=Math.min(1,el*4,(D-el)*8+.15),R=r||44,late=el>3.6,pu=.6+.4*Math.sin(now*(late?24:7)),gc=Math.round(215-140*p);g.save();VX.lite();
  g.save();g.translate(x,y);g.scale(1,.45);VX.ring(0,0,R,2,'255,210,140',.3*a);
  g.strokeStyle='rgba(255,'+gc+',60,'+(.95*a*pu)+')';g.lineWidth=6;g.lineCap='round';g.beginPath();g.arc(0,0,R,-Math.PI/2,-Math.PI/2+p*6.283);g.stroke();
  if(!LOWQ){g.strokeStyle='rgba(255,250,220,'+(.8*a)+')';g.lineWidth=2;g.beginPath();g.arc(0,0,R,-Math.PI/2+Math.max(0,p*6.283-.25),-Math.PI/2+p*6.283);g.stroke();}g.restore();
  glowAt(x,y-22,24+22*p,'255,'+gc+',70',(.12+.42*p)*pu*a);
  const n=Math.ceil(D-el);if(n>=1&&n<=3){g.globalCompositeOperation='source-over';const s=1+.35*(1-((D-el)%1));g.save();g.translate(x,y+R*.45+16);g.scale(s,s);g.font='bold 14px sans-serif';g.textAlign='center';g.textBaseline='middle';
    if(!LOWQ){g.lineWidth=3;g.strokeStyle='rgba(70,20,0,'+a+')';g.strokeText(n,0,0)}g.fillStyle='rgba(255,'+gc+',120,'+a+')';g.fillText(n,0,0);g.restore()}
  g.restore()};
FXB.r27hl=(f,p,x,y,r,now)=>{const o=s6Own(f.u);if(o){x=o.x;y=o.y}const D=6,el=p*D,a=Math.min(1,el*4,(D-el)*2),R=r||140;if(a<=.01)return;g.save();VX.lite();
  g.save();g.translate(x,y);g.scale(1,.5);VX.ring(0,0,R*.93,3,'110,255,150',.5*a);VX.ring(0,0,R*.62,1.5,'190,255,200',.32*a);g.restore();
  const n=VX.n(10,22);for(let i=0;i<n;i++){const an=fxR(f,i,1)*6.283,d=R*.9*Math.sqrt(fxR(f,i,2)),ph=(now*.55+fxR(f,i,3))%1,px=x+Math.cos(an)*d,py=y+Math.sin(an)*d*.5-ph*58,aa=a*Math.sin(ph*Math.PI);
    if(!LOWQ)glowAt(px,py,7,'100,255,140',.6*aa);g.fillStyle='rgba(225,255,225,'+(.9*aa)+')';g.fillRect(px-.9,py-3.2,1.8,6.4);g.fillRect(px-3.2,py-.9,6.4,1.8)}
  if(o&&o===me&&me.hp<me.mh)glowAt(x,y-20,30,'120,255,150',.25*a*(.6+.4*Math.sin(now*5)));
  g.restore()};
FXB.r27ln=(f,p,x,y,r,now)=>{const sx=f.sx,sy=f.sy-16,ex=x,ey=y-16,an=Math.atan2(ey-sy,ex-sx),L=Math.hypot(ex-sx,ey-sy),q=Math.min(1,p/.16),a=p<.16?1:Math.max(0,1-(p-.16)/.84),W=r||34,len=L*q;
  g.save();g.translate(sx,sy);g.rotate(an);VX.lite();
  const gr=g.createLinearGradient(0,0,Math.max(1,len),0);gr.addColorStop(0,'rgba(110,40,200,0)');gr.addColorStop(.55,'rgba(170,80,255,'+(.5*a)+')');gr.addColorStop(1,'rgba(255,90,150,'+(.95*a)+')');g.fillStyle=gr;
  const w=W*.5*(p<.16?1:.4+.6*a);g.beginPath();g.moveTo(0,-w*.25);g.lineTo(Math.max(0,len-20),-w);g.lineTo(len+18,0);g.lineTo(Math.max(0,len-20),w);g.lineTo(0,w*.25);g.closePath();g.fill();
  g.fillStyle='rgba(255,240,255,'+(.95*a)+')';g.beginPath();g.moveTo(0,-1.3);g.lineTo(len,-1);g.lineTo(len+12,0);g.lineTo(len,1);g.lineTo(0,1.3);g.closePath();g.fill();
  for(let i=1;i<=4;i++){const t=i/5;if(t>q)break;glowAt(len*t,0,12,'170,90,255',.45*a*(1-t*.4))}
  glowAt(len,0,30,'255,110,190',.75*a);glowAt(len,0,10,'255,240,250',a);
  for(let i=0;i<7;i++){const yy=(fxR(f,i,1)-.5)*W*1.7,x0=fxR(f,i,2)*len*.75;VX.ln(x0,yy,x0+36+44*fxR(f,i,3),yy,1.2,'220,180,255',.55*a)}
  g.restore()};
setTimeout(()=>{
  try{Object.assign(FXD,{r27sum:.7,r27x:.5,r27rf:7,r27cd:5,r27hl:6,r27ln:.7})}catch(e){}
  /* อิมป์ยักษ์: ขยายตัวอิมป์ตอนบิน */
  try{let IS=1;const _si=s6Imp;s6Imp=function(x,y,s,fl,now,a){return _si.call(this,x,y,s*IS,fl,now,a)};const _im=FXB.s6im;if(_im)FXB.s6im=(f,p,x,y,r,now)=>{IS=f.big?2.2:1;try{_im(f,p,x,y,r,now)}finally{IS=1}}}catch(e){}
},0);
