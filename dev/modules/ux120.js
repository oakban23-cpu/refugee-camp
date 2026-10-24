/* ---------- v512 บอสใหญ่วาดใหม่ ชุด 2: ความหิวของดาว (ภาค 7 เปลหัวใจ) · คราเคนเมฆ (ภาค 8 ศึกท่าเรือ) ----------
   ความหิวของดาว: ดาวมืดสุริยคราส เปลวโคโรนา ปากฟันวงซ้อนหมุนสวนทาง ตา 6 ดวงรอบขอบ มงกุฎดาวดับ แขนกรงเล็บ ริบบิ้นห้วงดาว
     ท่าตามกลไก: «ยื่นสายกลืนไฟ» (HFX.tt) แขนขวายืดยาว · «สูดกลืนฟ้า» (HFX.inh) เปลวโคโรนาถูกดูดเข้า ปากกว้าง · เลือด <50% รอยร้าวทอง สีชมพู
   คราเคนเมฆ: แมนเทิลยาวมีครีบข้าง เพรียงเกาะ จุดเรืองแนวสัน ตาใหญ่รูม่านตาแนวนอน คิ้วหนา จะงอยปาก หนวด 8 เส้น · เลือด <50% เส้นเรืองชมพู ฟ้าแลบ */
BV1['ความหิวของดาว']=(T,W,br,sw,up,cf)=>{let hf=1;try{const B=mons.find(q=>q.t===3);hf=B?B.hp/B.mh:1}catch(e){}
  const now=performance.now();let tt=0,inh=0;try{if(HFX.tt){const k=(now-HFX.tt.t0)/HFX.tt.d;if(k>=0&&k<1)tt=Math.min(1,k*4,(1-k)*6)}if(HFX.inh){const k=(now-HFX.inh.t0)/HFX.inh.d;if(k>=0&&k<1)inh=Math.min(1,k*4,(1-k)*4)}}catch(e){}
  const enr=hf<.5,fy=br-6+Math.sin(T*1.3)*4,cx=0,cy=-128+fy,R=66,PK=enr?'255,120,200':'190,120,255',RIM=enr?'#ff8ad8':'#c890ff';
  bvShadow(70,16,.3);
  bvAdd(W,()=>{glowAt(cx,cy,R*2.1,PK,.2+inh*.12);glowAt(cx,cy,R*1.1,'40,10,80',.3)});
  /* เปลวโคโรนา */for(let i=0;i<18;i++){const a=i/18*6.283+T*.15,ln=R*(.42+.2*Math.abs(Math.sin(T*2.2+i*1.7)))*(1-inh*.55),w=.13,a2=a-inh*.25;
    const bx=cx+Math.cos(a)*R*.94,by=cy+Math.sin(a)*R*.94,tx=cx+Math.cos(a2)*(R*.94+ln),ty=cy+Math.sin(a2)*(R*.94+ln);
    vD(W,[[cx+Math.cos(a-w)*R*.9,cy+Math.sin(a-w)*R*.9],['q',cx+Math.cos(a-w*.4)*(R+ln*.6),cy+Math.sin(a-w*.4)*(R+ln*.6),tx,ty],['q',cx+Math.cos(a+w*.6)*(R+ln*.5),cy+Math.sin(a+w*.6)*(R+ln*.5),cx+Math.cos(a+w)*R*.9,cy+Math.sin(a+w)*R*.9]],W?'#fff':i%2?'#3a1658':'#541e7a');if(!W&&!LOWQ)vD(W,[[cx+Math.cos(a-w*.5)*R*.95,cy+Math.sin(a-w*.5)*R*.95],['q',cx+Math.cos(a)*(R+ln*.5),cy+Math.sin(a)*(R+ln*.5),cx+Math.cos(a2)*(R*.94+ln*.7),cy+Math.sin(a2)*(R*.94+ln*.7)],['q',cx+Math.cos(a+w*.3)*(R+ln*.4),cy+Math.sin(a+w*.3)*(R+ln*.4),cx+Math.cos(a+w*.5)*R*.95,cy+Math.sin(a+w*.5)*R*.95]],enr?'rgba(255,140,210,.55)':'rgba(200,130,255,.5)');
    bvAdd(W,()=>glowAt(tx,ty,6,PK,.6))}
  /* ริบบิ้นห้วงดาวด้านล่าง */for(let i=0;i<7;i++){const x0=cx-42+i*14,P=[x0,cy+R*.7];for(let k=1;k<=4;k++)P.push(x0+Math.sin(T*1.6+i*.9+k*.7)*(4+k*3)+(x0-cx)*k*.08,cy+R*.7+k*22);
    vLimb(W,P,enr?'rgba(150,50,130,.5)':'rgba(90,40,150,.5)',13-Math.abs(i-3)*1.6,1.4,0);bvAdd(W,()=>glowAt(P[P.length-2],P[P.length-1],4,PK,.7))}
  /* แขนกรงเล็บ */for(const s of[-1,1]){const reach=s>0?tt:0,sx=cx+s*R*.82,sy=cy+R*.2;let ex=sx+s*30,ey=sy+36,hx=sx+s*46,hy=sy+78+Math.sin(T*1.5+s)*4;
    if(cf>0&&!reach){ey-=30*cf;hy-=70*cf;hx+=s*10*cf}
    if(reach){ex=ex*(1-reach)+(sx+60)*reach;ey=ey*(1-reach)+(sy-6)*reach;hx=hx*(1-reach)+(sx+128)*reach;hy=hy*(1-reach)+(sy+6)*reach}
    vLimb(W,[sx,sy,ex,ey,hx,hy],'#1a0e2c',13,8);vK(W,[[sx,sy],[ex,ey],[hx,hy]],W?'#fff':'rgba(200,150,255,.35)',2.4);
    const ha=Math.atan2(hy-ey,hx-ex);for(let k=-1;k<=2;k++){const a=ha+k*.35;vK(W,[[hx,hy],['q',hx+Math.cos(a)*9,hy+Math.sin(a)*9,hx+Math.cos(a+s*.6)*16,hy+Math.sin(a+s*.6)*16]],W?'#fff':'#e8dcff',2.4)}
    if(reach)bvAdd(W,()=>{for(let i=0;i<5;i++){const q=(T*1.4+i/5)%1;glowAt(hx+(sx-hx)*q,hy+(sy-hy)*q,4,'255,150,80',.8*(1-q))}glowAt(hx,hy,18,'255,140,60',.5)})}
  /* ดวงดาวมืด */bvE(W,cx,cy,R,R*.96,'#160a28',1.6);
  if(!W){g.save();g.beginPath();g.ellipse(cx,cy,R,R*.96,0,0,7);g.clip();const gr=g.createRadialGradient(cx-R*.35,cy-R*.4,4,cx,cy,R);gr.addColorStop(0,'rgba(90,50,140,.6)');gr.addColorStop(.6,'rgba(30,14,50,.2)');gr.addColorStop(1,'rgba(0,0,0,.4)');g.fillStyle=gr;g.fillRect(cx-R,cy-R,R*2,R*2);
    g.strokeStyle='rgba(120,80,170,.35)';g.lineWidth=1.4;for(let i=0;i<6;i++){const a=i*1.047+.4;g.beginPath();g.moveTo(cx+Math.cos(a)*R*.66,cy+Math.sin(a)*R*.66);g.quadraticCurveTo(cx+Math.cos(a+.2)*R*.84,cy+Math.sin(a+.2)*R*.84,cx+Math.cos(a+.1)*R,cy+Math.sin(a+.1)*R);g.stroke()}g.restore()}
  vK(W,[[cx-R,cy],['q',cx-R,cy-R*.96,cx,cy-R*.96],['q',cx+R,cy-R*.96,cx+R,cy]],W?'#fff':RIM,2.2);
  /* รอยร้าวทอง (เลือดน้อย) */if(enr){for(const P of[[[-50,-26],[-34,-10],[-44,10],[-30,28]],[[46,-34],[32,-16],[42,4]],[[-8,-56],[2,-44],[-4,-36]]])vK(W,P.map(p=>[cx+p[0],cy+p[1]]),W?'#fff':'rgba(255,220,150,.95)',2);bvAdd(W,()=>{glowAt(cx-38,cy,16,'255,210,140',.45);glowAt(cx+38,cy-16,16,'255,210,140',.45)})}
  /* ปากฟันวงซ้อน */{const k=1+cf*.15+inh*.3,MR=R*.62*k;bvDE(W,cx,cy+4,MR,MR,'#000000');bvAdd(W,()=>glowAt(cx,cy+4,MR*1.05,'255,110,190',.35+cf*.35+inh*.25));
    const ring=(r0,r1,n,rot,c)=>{for(let i=0;i<n;i++){const a=i/n*6.283+rot,pa=a+1.5708,ox=cx+Math.cos(a)*r0,oy=cy+4+Math.sin(a)*r0,w=r0*3.14/n*.8;vD(W,[[ox+Math.cos(pa)*w,oy+Math.sin(pa)*w],[cx+Math.cos(a)*r1,cy+4+Math.sin(a)*r1],[ox-Math.cos(pa)*w,oy-Math.sin(pa)*w]],c)}};
    ring(MR*.98,MR*.66,16,T*.4,'#ece4ff');ring(MR*.62,MR*.36,11,-T*.7,'#d8c8f0');bvDE(W,cx,cy+4,MR*.32,MR*.32,'#05000a');
    bvAdd(W,()=>{const n=LOWQ?8:16+Math.round(inh*10);for(let i=0;i<n;i++){const u=(T*(.5+inh)+i/n)%1,a=i*2.4+T*1.6,rr=(MR*1.8+inh*60)*(1-u)+4;glowAt(cx+Math.cos(a)*rr,cy+4+Math.sin(a)*rr*.8,1.6+2*(1-u),i%3?'255,190,240':'200,170,255',.9*u)}})}
  /* ตา 6 ดวงรอบขอบ */[[-.78,-.42],[.78,-.42],[-.9,.06],[.9,.06],[-.42,-.8],[.42,-.8]].forEach(([ax,ay],i)=>{const ex=cx+ax*R*.92,ey=cy+ay*R*.92,op=Math.sin(T*2.3+i*1.9)>-.85;
    bvDE(W,ex,ey,9.5,6.6,'#0a0612');if(op){vEye(W,ex,ey,7.6,4.8,enr?'#ffb0e0':'#ffe080',7);bvDE(W,ex,ey,1.7,4.2,'#2a0a10')}else vK(W,[[ex-7,ey],[ex+7,ey]],enr?'#ffb0e0':'#ffe080',1.6)});
  /* มงกุฎดาวดับ */for(let i=0;i<5;i++){const a=-2.6+i*.3+Math.sin(T*.6)*.04,px=cx+Math.cos(a)*(R+26),py=cy+Math.sin(a)*(R+26)-6+Math.sin(T*1.4+i)*3;bvAdd(W,()=>glowAt(px,py,12,'200,170,255',.3));wStar(W,px,py,10,4,enr&&i%2?'#c87a3a':'#3a2a50',T*.3+i,4);vK(W,[[px-3,py],[px+3,py]],W?'#fff':'rgba(255,240,220,.5)',.8)}
  /* ฝุ่นดาวดับลอย */if(!LOWQ)bvAdd(W,()=>{for(let i=0;i<6;i++){const q=(T*.3+i/6)%1;glowAt(cx-80+((i*53)%160),cy+R+60-q*180,2,'200,170,255',.6*Math.sin(q*Math.PI))}});
};
/* ===== คราเคนเมฆ ===== */
BV1['คราเคนเมฆ']=(T,W,br,sw,up,cf)=>{let hf=1;try{const B=mons.find(q=>q.t===3);hf=B?B.hp/B.mh:1}catch(e){}
  const enr=hf<.5,fy=br-2;g.save();g.translate(0,30);g.scale(1.3,1.3);g.translate(0,-30);
  bvAdd(W,()=>glowAt(0,-60+fy,110,enr?'210,120,255':'130,170,255',.13+(enr?.08:0)+cf*.15));
  if(!W&&typeof phvCloudPuffs==='function')phvCloudPuffs([[-96,-18,160,0,.7],[90,-20,170,1,.6],[0,-34,200,2,.5]],T,.92,W);
  const TC=enr?['#3e1e5a','#c070c8']:['#2a2a5e','#8a7ac8'];
  /* หนวดหลัง */for(let i=0;i<4;i++){const s=i<2?-1:1,k=i%2,aR=k?-.55-cf*.3:-1.05-cf*.35,cR=k?-2.1:1.6,ph=i*1.7;phvTent(s*(16+k*8),-44+fy,s>0?aR:Math.PI-aR,k?122:142,k?19:21,s*cR,s*.42,ph,T,TC[0],TC[1],W,1)}
  /* ครีบปลายแมนเทิล (ทรงหัวลูกศร) */for(const s of[-1,1]){const fl=Math.sin(T*2.4+s)*5;vS(W,[[s*6,-152+fy],['q',s*40,-160+fy+fl,s*62,-140+fy+fl],['q',s*50,-128+fy+fl*.6,s*54,-116+fy+fl*.4],['q',s*36,-118+fy,s*30,-110+fy]],enr?'#5a2a7a':'#34346e',1,1.2);
    for(let k=0;k<3;k++)vK(W,[[s*(14+k*8),-146+fy],[s*(30+k*10),-136+fy+fl*.5-k*2]],'rgba(170,190,255,.3)',1)}
  /* แมนเทิล */const BD=enr?'#6a3488':'#4a4a96';const body=[[-36,-40+fy],['c',-58,-70+fy,-50,-130+fy,-8,-150+fy],['q',0,-160+fy,8,-150+fy],['c',50,-130+fy,58,-70+fy,36,-40+fy],['q',22,-24+fy,0,-22+fy],['q',-22,-24+fy,-36,-40+fy]];
  const bb=vS(W,body,BD,1,1.6);
  if(!W){g.save();vP(body);g.clip();const gr=g.createRadialGradient(-14,-120+fy,6,0,-80+fy,100);gr.addColorStop(0,enr?'rgba(255,200,240,.55)':'rgba(220,220,255,.5)');gr.addColorStop(.5,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(10,6,30,.45)');g.fillStyle=gr;g.fillRect(-60,-165+fy,120,150);
    let sd=4411;const R=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
    for(let i=0;i<14;i++){const x=-40+R()*80,y=-140+R()*100;g.fillStyle='rgba(20,10,50,'+(.14+R()*.16)+')';g.beginPath();g.ellipse(x,y+fy,4+R()*8,3+R()*6,R()*3,0,7);g.fill()}
    /* เพรียงเกาะ */for(const[x,y]of[[-30,-96],[-24,-104],[28,-120],[34,-112],[-8,-140]]){g.fillStyle='#c8c4c0';g.beginPath();g.ellipse(x,y+fy,4,3,0,0,7);g.fill();g.fillStyle='#5a5660';g.beginPath();g.ellipse(x,y+fy-.6,1.6,1.1,0,0,7);g.fill()}
    /* แผลเป็น */g.strokeStyle='rgba(20,10,40,.55)';g.lineWidth=1.6;g.beginPath();g.moveTo(14,-134+fy);g.lineTo(26,-108+fy);g.moveTo(18,-130+fy);g.lineTo(12,-122+fy);g.stroke();
    if(enr){g.strokeStyle='rgba(255,140,220,.8)';g.lineWidth=1.4;g.beginPath();g.moveTo(-20,-132+fy);g.lineTo(-10,-112+fy);g.lineTo(-18,-94+fy);g.lineTo(-8,-78+fy);g.moveTo(22,-126+fy);g.lineTo(14,-106+fy);g.lineTo(22,-90+fy);g.stroke()}
    g.restore()}
  /* สันกลาง + จุดเรือง */vK(W,[[0,-150+fy],['q',-4,-110+fy,0,-70+fy]],'rgba(20,10,50,.4)',2);
  bvAdd(W,()=>{for(const[x,y,p]of[[-34,-74,0],[-28,-104,1.3],[-14,-128,2.1],[14,-130,.7],[30,-104,2.8],[36,-76,3.6],[0,-146,1.9]]){const a=.35+.35*Math.sin(T*2.4+p);glowAt(x,y+fy,7,enr?'255,120,220':'120,230,255',a);g.fillStyle='rgba(230,255,255,'+(a+.2)+')';g.beginPath();g.arc(x,y+fy,1.5,0,7);g.fill()}});
  /* หนวดหน้า */for(let i=0;i<4;i++){const s=i<2?-1:1,k=i%2,aR=k?.18:.66,cR=k?-2.4:-1.9,ph=i*1.1+(cf>0?cf*4:0);phvTent(s*(6+k*12),-30+fy,s>0?aR:Math.PI-aR,k?122:102,k?19:20,s*cR,s*.36,ph,T,TC[0],TC[1],W,1)}
  /* จะงอยปาก */{const op=cf*.8+(enr?.2:0)+Math.max(0,Math.sin(T*1.2))*.15;vS(W,[[-9,-36+fy],['q',0,-46+fy,9,-36+fy],['q',4,-26+fy-op*4,0,-22+fy-op*6],['q',-4,-26+fy-op*4,-9,-36+fy]],'#1a1020',1,1);
    vS(W,[[-7,-30+fy+op*2],['q',0,-26+fy+op*6,7,-30+fy+op*2],['q',0,-20+fy+op*8,-7,-30+fy+op*2]],'#2a1a2e',1,1);if(op>.3)bvAdd(W,()=>glowAt(0,-30+fy,10,enr?'255,120,200':'160,200,255',.5*op))}
  /* ตาใหญ่ รูม่านตาแนวนอน คิ้วหนา */const bl=(T%4.3)<.14;for(const s of[-1,1]){const ex=s*24,ey=-52+fy;
    bvE(W,ex,ey,15,13,enr?'#7a3a92':'#4a4a9a',1.4);
    if(bl){vK(W,[[ex-10,ey],['q',ex,ey+3,ex+10,ey]],W?'#fff':'#1a1040',2.4);continue}
    vEye(W,ex,ey+1,10,9.4,enr?'#ff6ad0':'#ffd640',0);const pw=cf>0?6:11,ph2=cf>0?1.4:2.6;bvDE(W,ex,ey+1,pw/2,ph2/2,'#0e0616');
    vS(W,[[ex+s*17,ey-15],['q',ex,ey-15,ex-s*13,ey-4],[ex-s*10,ey-1],['q',ex+s*2,ey-8,ex+s*16,ey-8]],enr?'#4a1a5e':'#24245a',1,1);
    if(enr)bvAdd(W,()=>glowAt(ex,ey,20,'255,90,200',.35+.15*Math.sin(T*6)))}
  /* ฟ้าแลบ (เลือดน้อย) */if(enr&&(T*1.3)%1<.3)wBolt(W,-50,-150+fy,-20,-100+fy,4,6,T,2,'#ffe8ff',1.4);
  if(!W&&typeof phvCloudPuffs==='function')phvCloudPuffs([[-62,14,124,3,.8],[58,16,128,4,.9],[0,22,154,1,.7]],T,.95,W);
  if(cf>0)bvAdd(W,()=>glowAt(0,-28+fy,22+cf*24,'220,180,255',.6*cf));
  g.restore()};
Object.assign(BVH,{'ความหิวของดาว':240,'คราเคนเมฆ':208});Object.assign(BVWD,{'ความหิวของดาว':150,'คราเคนเมฆ':200});
