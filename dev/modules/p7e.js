/* ---------- v361 ภาค 7 บทสุดท้าย · เตาหลอมหัวใจ (หลุมหัวใจว่าง · ดันเจี้ยนเตาหลอม · ฉากจบ e7) ---------- */
const HFB=[[1600,1000],[2300,1700],[1600,2400],[900,1700]],HFBA=[-1.5708,0,1.5708,3.1416],HFP=16,HFBN=['ระฆังเที่ยงคืน','ระฆังรุ่งสาง','ระฆังเที่ยงวัน','ระฆังสนธยา'];
const HFBL=['ระฆังเที่ยงคืน — คืนที่หัวใจถูกพรากไป เวสเปอร์หยุดเข็มนาฬิกาไว้ที่ระฆังใบนี้ «ถ้าคืนนี้ไม่มีวันจบ ก็ไม่มีใครต้องตื่นมาพบว่าเมืองร่วงแล้ว»',
 'ระฆังรุ่งสาง — ทุกเช้าเขาเดินรอบขั้นบันได นับเงาที่ยังรอ หนึ่ง สอง สาม… สามร้อยปีไม่เคยนับผิดสักคน',
 'ระฆังเที่ยงวัน — บนผนังหอนาฬิกามีลายมือเก่า «ถ้าเวลาเดิน เราจะลืม ถ้าเวลาหยุด เราจะรอได้ตลอดไป» ใต้นั้นมีลายมือใหม่ «…แต่คนที่รอตลอดไป ไม่เคยได้กลับบ้าน»',
 'ระฆังสนธยา — เข็มเงากวาดเร็วขึ้น ราวกับเวลาที่ค้างไว้สามร้อยปีไหลกลับมาพร้อมกัน ที่ขอบหลุม เฟืองหัวใจนาฬิกาในมือเวสเปอร์เริ่มเรืองแสง'];
const HFSI=[2,10,17,25,33];
const hfSh=i=>{const k=HFSI[i],r=360+((k*7)%6)*150,a=k/40*6.283+(k%3)*.05;return[HPC.x+Math.cos(a)*r,HPC.y+Math.sin(a)*r]};
const HFSL=['«หลับเถิดลูก ระฆังยังนับเวลาให้…»','«…เงาของเราจะนั่งรอบนบันได»','«ถ้าฟ้าลืมชื่อเรา แผ่นดินจะจำไว้…»','«…ดาวดวงหนึ่งจะลงมาหาเรา ในคืนที่หนาวที่สุด»','«และเมื่อมันลงมา… เราจะร้องพร้อมกันอีกครั้ง»'];
let HFL={on:-1,ch:0};
const gP7h=()=>p6Past('p7c4'),hfE7=()=>(me.sty&&me.sty.e7)|0;
const hfHand=()=>-1.5708+((performance.now()/1000)%HFP)/HFP*6.2832;
const hfDA=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
function hfTxt(tx,x,y,c,f){g.font=f||'bold 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(16,8,24,.88)';g.strokeText(tx,x,y);g.fillStyle=c||'#ffe8b0';g.fillText(tx,x,y)}
/* ---------- หลุมหัวใจ: ระฆังเวลา + เงาฮัมเพลง ---------- */
function hfTick(dt,now,x,y){if(!gP7h())return;{const V=MAPS[33].npc2;if(V){V.x=1600;V.y=HPC.y-HPS-60}}
  const st=stCur(),q=me.sty;if(!st||!q||q.a!==1||me.down>0||isDg()){HFL.on=-1;HFL.ch=0;return}
  if(st.p7tb){const ha=hfHand();HFB.forEach(([bx,by],i)=>{if((q.p7tb|0)>>i&1||Math.hypot(x-bx,y-by)>74||hfDA(ha,HFBA[i])>.34)return;
    q.p7tb=(q.p7tb|0)|(1<<i);let n=0;for(let k=0;k<4;k++)if(q.p7tb>>k&1)n++;q.n=n;PALG.card={h:'🔔 '+HFBN[i]+' · '+n+'/4',t:HFBL[i],s:now,d:9};
    try{sfx('quest')}catch(e){}try{burst(bx,by-70,['#ffe0a0','#ffffff','#d8b0ff'],40,180,1,{glow:1,g:-50})}catch(e){}try{shk=.3}catch(e){}try{sdGive(2,'ระฆังเวลา')}catch(e){}try{stHud();writeSave()}catch(e){}})}
  if(st.p7ss){let on=-1;HFSI.forEach((_,i)=>{if((q.p7ss|0)>>i&1)return;const[sx,sy]=hfSh(i);if(Math.hypot(x-sx,y-sy)<64)on=i});
    if(on<0){HFL.on=-1;HFL.ch=0;return}if(HFL.on!==on){HFL.on=on;HFL.ch=0}HFL.ch+=dt;if(HFL.ch<1.4)return;HFL.on=-1;HFL.ch=0;
    q.p7ss=(q.p7ss|0)|(1<<on);let n=0;for(let k=0;k<5;k++)if(q.p7ss>>k&1)n++;q.n=n;const[sx,sy]=hfSh(on);PALG.card={h:'🎵 เพลงกล่อมของอารัณยา · ท่อน '+n+'/5',t:HFSL[on],s:now,d:8};
    try{sfx('quest')}catch(e){}try{burst(sx,sy-30,['#ffe8b0','#ffffff','#c8b0ff'],30,140,1,{glow:1,g:-60})}catch(e){}try{sdGive(2,'ท่อนเพลงของเงา')}catch(e){}try{stHud();writeSave()}catch(e){}}}
function hfAqT(st){const q=me.sty;if(!q)return null;let b=null,bd=1e9;
  if(st.p7tb){const ha=hfHand();HFB.forEach(([x,y],i)=>{if((q.p7tb|0)>>i&1)return;let d=HFBA[i]-ha;d=((d%6.2832)+6.2832)%6.2832;const k=curMap===33?Math.hypot(me.x-x,me.y-y)+d*60:i;if(k<bd){bd=k;b={x,y:y+30}}});return b?{mp:33,act:'reach',x:b.x,y:b.y,lb:'ไปยืนรอที่ระฆังเวลา'}:null}
  if(st.p7ss){HFSI.forEach((_,i)=>{if((q.p7ss|0)>>i&1)return;const[x,y]=hfSh(i),k=curMap===33?Math.hypot(me.x-x,me.y-y):i;if(k<bd){bd=k;b={x,y:y+24}}});return b?{mp:33,act:'reach',x:b.x,y:b.y,lb:'ไปฟังเงาฮัมเพลง'}:null}return null}
function hfGround(){if(!gP7h()||isDg())return;const T=performance.now()/1000,st=stCur(),q=me.sty,act=!!(st&&q&&q.a===1);g.save();
  /* เตาหลอม/หัวใจในหลุม */
  if(p6Past('p7t')&&palVis(HPC.x,HPC.y,420)){const e7=hfE7();if(!p6Past('p7e7'))hfForge(HPC.x,HPC.y+50,1.4,T,{S:p6Past('p7fd')?1:p6Past('p7qs')?.7:p6Past('p7ss')?.4:.1,fl:p6Past('p7fd')?1:.45,hrt:p6Past('p7fd')?1:0});
    else if(e7===1)hfForge(HPC.x,HPC.y+50,1.4,T,{S:1,fl:.8,hrt:0});else hfForge(HPC.x,HPC.y+50,1.4,T,{S:.5,fl:.12,hrt:0})}
  /* เข็มเงาของนาฬิกา */
  if(act&&st.p7tb){const a=hfHand(),L=1270;g.save();g.translate(HPC.x,HPC.y);g.rotate(a);
    g.fillStyle='rgba(10,3,18,.62)';g.beginPath();g.moveTo(HPS-10,-34);g.lineTo(L-90,-20);g.lineTo(L,0);g.lineTo(L-90,20);g.lineTo(HPS-10,34);g.closePath();g.fill();
    g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,210,140,.95)';g.lineWidth=4;g.stroke();g.strokeStyle='rgba(255,220,150,.3)';g.lineWidth=14;g.beginPath();g.moveTo(HPS,0);g.lineTo(L-20,0);g.stroke();glowAt(L-30,0,46,'255,220,150',.5);for(let k=0;k<(LOWQ?4:9);k++){const u=(T*.6+k/9)%1;glowAt(HPS+u*(L-HPS),0,12,'255,220,150',.55*Math.sin(u*3.14))}g.restore();
    HFB.forEach(([bx,by],i)=>{if(!palVis(bx,by,180))return;const done=(q.p7tb|0)>>i&1,inw=hfDA(a,HFBA[i])<.34;let d=HFBA[i]-a;d=((d%6.2832)+6.2832)%6.2832;const wt=d/6.2832*HFP;
      g.strokeStyle=done?'rgba(255,220,150,.45)':inw?'rgba(255,245,190,.95)':'rgba(216,160,80,.65)';g.lineWidth=inw&&!done?4:2;g.setLineDash(done?[]:[10,8]);g.lineDashOffset=-T*20;g.beginPath();g.ellipse(bx,by+8,74,40,0,0,7);g.stroke();g.setLineDash([]);
      if(inw&&!done){g.save();g.globalCompositeOperation='lighter';glowAt(bx,by+8,80,'255,220,150',.22);g.restore()}
      if(!done)hfTxt(inw?'🔔 ตอนนี้! เข้าวง':'⏳ เข็มเงามาใน '+wt.toFixed(1)+' วิ',bx,by+66,inw?'#fff4c0':'#ffe0a0');else hfTxt('✓ '+HFBN[i],bx,by+66,'#c8ffc0')})}
  /* เงาที่ยังฮัมเพลง */
  if(act&&st.p7ss){HFSI.forEach((_,i)=>{if((q.p7ss|0)>>i&1)return;const[sx,sy]=hfSh(i);if(!palVis(sx,sy,140))return;g.save();g.globalCompositeOperation='lighter';glowAt(sx,sy-20,46,'255,220,170',.25+.08*Math.sin(T*3+i));g.restore();
      g.strokeStyle='rgba(255,220,170,.6)';g.lineWidth=2;g.setLineDash([8,7]);g.lineDashOffset=-T*16;g.beginPath();g.ellipse(sx,sy+6,64,34,0,0,7);g.stroke();g.setLineDash([]);
      for(let k=0;k<3;k++){const u=(T*.45+k/3+i*.2)%1;g.font=(14+k*2)+'px serif';g.textAlign='center';g.fillStyle='rgba(255,236,190,'+(Math.sin(u*3.14))+')';g.fillText(k%2?'♫':'♪',sx-14+k*14+Math.sin(T*2+k)*6,sy-40-u*60)}});
    if(HFL.on>=0&&me.cls){const k=Math.min(1,HFL.ch/1.4);g.strokeStyle='rgba(16,8,24,.6)';g.lineWidth=5;g.beginPath();g.arc(me.x,me.y-78,11,0,7);g.stroke();g.strokeStyle='#ffe0a8';g.lineWidth=3;g.beginPath();g.arc(me.x,me.y-78,11,-1.57,-1.57+6.283*k);g.stroke();hfTxt('🎵 กำลังฟังเพลง',me.x,me.y-96)}}
  g.restore()}
/* ---------- ภาพเตาหลอม + หัวใจดวงใหม่ ---------- */
function hfHeart(x,y,s,T,al){al=al==null?1:al;const pu=1+.06*Math.sin(T*3.2);g.save();g.translate(x,y);g.scale(s*pu,s*pu);g.globalAlpha*=al;
  g.globalCompositeOperation='lighter';glowAt(0,0,74,'255,190,170',.32);glowAt(0,0,36,'255,240,220',.45);g.globalCompositeOperation='source-over';
  const P=()=>{g.beginPath();g.moveTo(0,28);g.bezierCurveTo(-36,4,-40,-22,-19,-29);g.bezierCurveTo(-8,-32,-2,-25,0,-17);g.bezierCurveTo(2,-25,8,-32,19,-29);g.bezierCurveTo(40,-22,36,4,0,28);g.closePath()};
  const gr=g.createRadialGradient(-6,-10,2,0,0,38);gr.addColorStop(0,'#ffffff');gr.addColorStop(.35,'#ffe6a8');gr.addColorStop(.7,'#f0a0c8');gr.addColorStop(1,'#7a6ad8');g.fillStyle=gr;P();g.fill();g.strokeStyle='#fff0c0';g.lineWidth=1.8;g.stroke();
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1;g.beginPath();g.moveTo(0,-17);g.lineTo(0,26);g.moveTo(-19,-29);g.lineTo(-8,4);g.lineTo(0,26);g.moveTo(19,-29);g.lineTo(8,4);g.lineTo(0,26);g.moveTo(-31,-8);g.lineTo(-8,4);g.lineTo(8,4);g.lineTo(31,-8);g.stroke();
  g.fillStyle='#ffffff';PST(g,0,-3,10,3.4,4,T*.8);g.fill();
  g.globalCompositeOperation='lighter';[['170,220,255',0],['255,200,120',2.094],['220,160,255',4.189]].forEach(([c,o])=>{const a=T*1.4+o,px=Math.cos(a)*46,py=Math.sin(a)*16-4;glowAt(px,py,6,c,.95);glowAt(px,py,15,c,.3)});
  g.restore()}
function hfForge(x,y,s,T,o){const S=o.S||0,fl=o.fl==null?1:o.fl,h=o.hrt||0;g.save();g.translate(x+(o.hit?Math.sin(T*90)*2:0),y);g.scale(s,s);
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,6,64,16,0,0,7);g.fill();
  g.lineCap='round';g.strokeStyle='#3a2410';g.lineWidth=7;g.beginPath();g.moveTo(-42,2);g.lineTo(-30,-44);g.moveTo(42,2);g.lineTo(30,-44);g.moveTo(0,8);g.lineTo(0,-40);g.stroke();g.strokeStyle='#b07a3a';g.lineWidth=2;g.stroke();
  const bg=g.createLinearGradient(-58,0,58,0);bg.addColorStop(0,'#4a2a10');bg.addColorStop(.4,'#c08a48');bg.addColorStop(.6,'#a06a30');bg.addColorStop(1,'#3a2008');g.fillStyle=bg;
  g.beginPath();g.moveTo(-60,-80);g.quadraticCurveTo(-58,-36,0,-30);g.quadraticCurveTo(58,-36,60,-80);g.closePath();g.fill();g.strokeStyle='#2a1406';g.lineWidth=1.6;g.stroke();
  g.strokeStyle='#e0b060';g.lineWidth=2;g.beginPath();g.moveTo(-54,-62);g.quadraticCurveTo(0,-46,54,-62);g.stroke();
  g.fillStyle='#1a0c06';g.beginPath();g.ellipse(0,-80,60,14,0,0,7);g.fill();
  {g.save();g.beginPath();g.ellipse(0,-80,55,11,0,0,7);g.clip();const mg=g.createRadialGradient(0,-80,4,0,-80,58);mg.addColorStop(0,'rgba(255,250,220,'+(.35+.6*fl)+')');mg.addColorStop(.5,'rgba(255,160,80,'+(.25+.6*fl)+')');mg.addColorStop(1,'rgba(90,30,16,.9)');g.fillStyle=mg;g.fillRect(-62,-94,124,30);g.restore()}
  g.strokeStyle='#e8b868';g.lineWidth=2.4;g.beginPath();g.ellipse(0,-80,60,14,0,0,7);g.stroke();
  [[-34,-58,'170,220,255'],[0,-50,'255,200,120'],[34,-58,'220,160,255']].forEach(([sx,sy,c],i)=>{const on=i<2?1:S;g.fillStyle='#2a1406';g.beginPath();g.arc(sx,sy,8.5,0,7);g.fill();g.strokeStyle='#e0b060';g.lineWidth=1.4;g.stroke();
    if(on>0){g.save();g.globalCompositeOperation='lighter';glowAt(sx,sy,15,c,.35+.55*on);g.restore()}g.fillStyle='rgba('+c+','+(.35+.65*on)+')';g.strokeStyle='rgba('+c+','+(.35+.65*on)+')';
    if(i===0){PST(g,sx,sy,6,2.4,4,0);g.fill()}else if(i===1){g.lineWidth=1.6;g.beginPath();g.arc(sx,sy,4,0,7);g.stroke();for(let k=0;k<6;k++){const a=k*1.047+T*.8;g.beginPath();g.moveTo(sx+Math.cos(a)*4,sy+Math.sin(a)*4);g.lineTo(sx+Math.cos(a)*6.5,sy+Math.sin(a)*6.5);g.stroke()}}
    else{g.beginPath();g.ellipse(sx-1.5,sy+3,3,2.2,-.4,0,7);g.fill();g.lineWidth=1.4;g.beginPath();g.moveTo(sx+1.2,sy+2.6);g.lineTo(sx+1.2,sy-5);g.lineTo(sx+4.5,sy-3.4);g.stroke()}});
  g.globalCompositeOperation='lighter';const n=LOWQ?4:7;
  for(let k=0;k<n;k++){const ph=T*3+k*1.7,hg=(42+20*Math.sin(ph))*(.3+.7*fl),bx=-40+k*(80/(n-1)),sw=Math.sin(T*2.4+k)*6,fg=g.createLinearGradient(0,-80,0,-80-hg);fg.addColorStop(0,'rgba(255,200,110,'+(.5*fl+.15)+')');fg.addColorStop(1,'rgba(255,110,60,0)');g.fillStyle=fg;
    g.beginPath();g.moveTo(bx-9,-80);g.quadraticCurveTo(bx-6+sw,-80-hg*.6,bx+sw*1.4,-80-hg);g.quadraticCurveTo(bx+6+sw,-80-hg*.6,bx+9,-80);g.closePath();g.fill()}
  glowAt(0,-92,72,'255,170,90',.2+.3*fl);g.globalCompositeOperation='source-over';
  if(h>0)hfHeart(0,-150-6*Math.sin(T*1.6),.55+.5*h,T,Math.min(1,.2+h));
  g.restore()}
/* ---------- ฉากจบ: นครลี้ภัย (e7=2) · อารัณยาลอยคืนฟ้า (e7=1) ---------- */
const HFBUB=['เมื่อคืนฝันว่าได้กลับบ้าน… ตื่นมาก็อยู่บ้านจริง ๆ','หัวใจดวงนั้นอุ่นกว่าเตาผิงอีกนะ','ยายเอดาสอนเพลงกล่อมทั้งเพลงให้เด็ก ๆ แล้ว','ค่ายเราลอยได้จริง ๆ เหรอเนี่ย','นครลี้ภัย… ฟังดูเหมือนบ้านดีนะ','กลางคืนไม่ต้องจุดตะเกียงแล้ว','ใครจะมาอยู่ก็มาได้เลย ประตูไม่มีกลอน'];
let HFBB={t:0,b:[]};
function hfName(){try{const e7=hfE7();if(!e7||!p6Past('p7e7'))return;if(e7===2&&MAPS[1].n!=='นครลี้ภัย')MAPS[1].n='นครลี้ภัย';if(e7===1&&MAPS[32].n!=='อารัณยา · นครที่ลอยคืนฟ้า')MAPS[32].n='อารัณยา · นครที่ลอยคืนฟ้า'}catch(e){}}
setInterval(hfName,1000);
function hfEndWorld(){if(isDg())return;const e7=hfE7();if(!e7||!p6Past('p7e7'))return;const T=performance.now()/1000;
  hfName();
  if(curMap===1&&e7===2){g.save();g.globalCompositeOperation='lighter';if(palVis(1600,1600,420)){glowAt(1600,1600,330,'255,210,160',.14+.04*Math.sin(T*1.4));
      for(let i=0;i<(LOWQ?10:22);i++){const u=(T*.12+i/22)%1,a=i*2.39,r=120+((i*83)%260);glowAt(1600+Math.cos(a)*r,1600+Math.sin(a)*r*.7-u*260,2.6,i%3?'255,220,160':'200,190,255',.8*Math.sin(u*3.14))}}
    for(let i=0;i<14;i++){const a=i/14*6.283+T*.05,r=430+(i%3)*40,x=1600+Math.cos(a)*r,y=1600+Math.sin(a)*r*.82-60-Math.sin(T*.8+i)*8;if(!palVis(x,y,40))continue;glowAt(x,y,16,'255,190,110',.45);glowAt(x,y,5,'255,240,200',.9)}
    g.globalCompositeOperation='source-over';for(let i=0;i<14;i++){const a=i/14*6.283+T*.05,r=430+(i%3)*40,x=1600+Math.cos(a)*r,y=1600+Math.sin(a)*r*.82-60-Math.sin(T*.8+i)*8;if(!palVis(x,y,40))continue;g.fillStyle='#d8582a';g.beginPath();g.roundRect(x-5,y-7,10,13,3);g.fill();g.fillStyle='#ffd890';g.fillRect(x-3,y-4,6,7);g.strokeStyle='#5a2a10';g.lineWidth=1;g.strokeRect(x-5,y-7,10,13)}g.restore()}
  if(curMap===32&&e7===1){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?14:32);i++){const u=(T*.08+i/32)%1,x=cam.x+((i*137)%Math.max(1,W)),y=cam.y+H+20-u*(H+80);glowAt(x+Math.sin(T+i)*20,y,9,'255,200,120',.25*Math.sin(u*3.14));glowAt(x+Math.sin(T+i)*20,y,3,'255,235,180',.9*Math.sin(u*3.14))}g.restore()}}
function hfEndScreen(){if(isDg()||!me.cls)return;const e7=hfE7();if(!e7||!p6Past('p7e7'))return;const T=performance.now()/1000;let hx=0,hy=0,hs=0;
  if(curMap===1&&e7===2){hx=1600;hy=1290;hs=1.25}else if(curMap===33&&e7===1){hx=HPC.x;hy=HPC.y-150;hs=1.6}
  if(hs&&palVis(hx,hy,500)){g.save();g.setTransform(DPR,0,0,DPR,0,0);if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);const by=hy+(curMap===1?310:200);
    g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,hy,0,by);gr.addColorStop(0,'rgba(255,220,170,.32)');gr.addColorStop(1,'rgba(255,220,170,0)');g.fillStyle=gr;const w=26+8*Math.sin(T*2);g.beginPath();g.moveTo(hx-w*.5,hy);g.lineTo(hx+w*.5,hy);g.lineTo(hx+w*1.6,by);g.lineTo(hx-w*1.6,by);g.closePath();g.fill();
    const up=g.createLinearGradient(0,hy,0,hy-900);up.addColorStop(0,'rgba(200,190,255,.18)');up.addColorStop(1,'rgba(200,190,255,0)');g.fillStyle=up;g.fillRect(hx-14,hy-900,28,900);g.globalCompositeOperation='source-over';
    hfHeart(hx,hy+Math.sin(T*1.3)*6,hs,T,1);
    if(curMap===1){if(performance.now()>HFBB.t){HFBB.t=performance.now()+5000+Math.random()*3000;const P=[MAPS[1].npc,MAPS[1].npc2,MAPS[1].npc3,MAPS[1].npc5,MAPS[1].npc6].filter(Boolean);const N=P[Math.random()*P.length|0];if(N){let L=HFBUB.slice();if((me.sty&&me.sty.p7m)===2)L.push('สหกรณ์คาร์นสร้างบ้านหลังที่สิบเสร็จแล้ว!');else L.push('ร้านของบรอมเปิดแล้ว ราคาไม่ลดเหมือนเดิม');HFBB.b.push({x:N.x,y:N.y-70,s:L[Math.random()*L.length|0],t0:performance.now()});if(HFBB.b.length>2)HFBB.b.shift()}}
      HFBB.b=HFBB.b.filter(b=>performance.now()-b.t0<4500);for(const b of HFBB.b){const a=Math.min(1,(performance.now()-b.t0)/300,(4500-(performance.now()-b.t0))/400);g.globalAlpha=a;g.font='11px system-ui';const tw=Math.min(220,g.measureText(b.s).width)+16;g.fillStyle='rgba(255,250,236,.94)';g.beginPath();g.roundRect(b.x-tw/2,b.y-20,tw,22,8);g.fill();g.strokeStyle='rgba(120,80,40,.6)';g.lineWidth=1;g.stroke();g.beginPath();g.moveTo(b.x-5,b.y+2);g.lineTo(b.x,b.y+8);g.lineTo(b.x+5,b.y+2);g.fill();g.fillStyle='#4a3020';g.textAlign='center';g.fillText(b.s,b.x,b.y-5,220);g.globalAlpha=1}}
    g.restore()}
  if(curMap===32&&e7===1){g.save();g.setTransform(DPR,0,0,DPR,0,0);g.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const x=((T*6+i*170)%(SW0+300))-150,a=.09+.03*Math.sin(T*.6+i),gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(255,225,170,'+a+')');gr.addColorStop(1,'rgba(255,225,170,0)');g.fillStyle=gr;g.beginPath();g.moveTo(x,0);g.lineTo(x+80,0);g.lineTo(x+190,H);g.lineTo(x+110,H);g.closePath();g.fill()}g.restore()}}
/* ---------- ดันเจี้ยนเตาหลอมหัวใจ (ห้อง 85000–85999) ---------- */
setTimeout(()=>{DT[24]={n:'เตาหลอมหัวใจ',lv:1,L:134,bL:22,hp:7200000,xp:800000,g:110000,dm:64,tn:10,sm:2,rm:4,lg:1,tm:900,gold:720000,exp:6400000}},0);
const HFGI=()=>!!(MAPS[curMap]&&MAPS[curMap].hfg),hfgBack=()=>({x:1600,y:HPC.y-HPS-150});
const HFST=[-2.618,-.524,1.571].map(a=>[Math.round(CX+Math.cos(a)*300),Math.round(CY+Math.sin(a)*300)]),HFSR=66,HFSC=['170,235,140','150,200,255','255,190,110'],HFSN=['ค่ายผู้อพยพ','อัสตรา','อารัณยา'];
const hfInSt=(x,y)=>HFST.some(([sx,sy])=>Math.hypot(x-sx,y-sy)<HFSR);
let HF={hp:100,S:0,st:'wait',nt:3,bt:0,hit:0,sg:[0,0,0],ch:0,cc:0,ms:0},HFX={tt:null,tr:null,inh:null,cb:null,tl:[]},HFLT=0;
function hfgReset(){HF={hp:100,S:0,st:'wait',nt:3,bt:0,hit:0,sg:[0,0,0],ch:0,cc:0,ms:0};HFX={tt:null,tr:null,inh:null,cb:null,tl:[]}}
function hfgMap(id){if(MAPS[id])return MAPS[id];const D=DT[24];hfgReset();
  return MAPS[id]={n:'เปลหัวใจ · เตาหลอม',dg:24,hfg:1,th:37,bth:37,sx:CX,sy:CY+440,sr:0,seed:381,bg:'#0c0814',tile:'#3e2e2c',safe:'#4e3a34',ring:'#e8b868',t1:'#0a0612',t2:'#1a1028',d1:'#2a2034',d2:'#ffd8a0',nests:[],
    gates:[{x:CX-170,y:CY+420,to:33,req:1,ars:1,nm:'หลุมหัวใจว่าง',arr:hfgBack()}],qk:1,ql:22,npc:{x:-9999,y:-9999,n:'',L:1},
    boss:{x:CX,y:CY-330,n:'ความหิวของดาว',hp:D.hp,xp:D.xp,L:D.bL,rm:D.rm,lg:D.lg,g:D.g,dm:D.dm,tn:D.tn,sm:D.sm,sL:134,col:'#e0a0ff',bar:'#3a1a5a',ln:'#ffd8f0',rec:'เล่นเดี่ยวได้ · ปาร์ตี้แนะนำ',pos:'ก้นเปลหัวใจ',dg:1}}}
const HFG_IN=[['nar','เปลสำริดกลางหลุมกลายเป็นเตาหลอม ขวดแสงดาวของเซเลสต์และเฟืองหัวใจนาฬิกาของเวสเปอร์วางอยู่ในช่องของมัน… เหลือช่องสุดท้ายที่ยังว่าง'],
  ['eda','ร้องเถอะลูก ทุกคน… ไม่ต้องร้องให้เพราะ ร้องให้พร้อมกันก็พอ'],
  ['ves','ระวัง! มันได้กลิ่นไฟแล้ว… ความหิวที่ราชินีทิ้งไว้ในดาวทุกดวงที่นางกลืน มันจะคลานออกมากัดเปลวไฟ'],
  ['nar','💡 ยืนในวงหินเพลง (3 วง) = ร้องเพลง เติมแถบเพลงกล่อม · เงาหิวจะวิ่งไปกัดเตาหลอม (ไฟลด + เพลงสะดุด) → ออกไปสกัด · เพลงครบ 100% ความหิวของดาวจะขึ้นมา · สายกลืนไฟ (เส้นดำพุ่งเข้าเตา) → ไปยืนขวางเส้น · ดาวดับ (วงใต้เท้า) → หลบ · สูดกลืนฟ้า → เข้าไปยืนในหินเพลง · ยืนร้องในหินเพลงครบตามจำนวนคน (คนเดียวยืน 1 วง) ต่อเนื่อง 6 วิ → เพลงประสานทำให้มันชะงัก']];
function hfgEnter(){if(!me.cls||me.down>0||isDg())return;const id=85000+(Math.random()*999|0);if(!dgMap(id))return;
  if(typeof PTY!=='undefined'&&PTY){const t='🔥 จุดเตาหลอมหัวใจ รหัส '+id+' มาร้องเพลงกล่อมด้วยกัน!';emitM('dinv',{id,n:myName});addChat(myName,t,uid);if(room)room.emit('chat',{u:uid,n:myName,t})}
  hfgReset();ov.hidden=true;try{sfx('gate')}catch(e){}enterMap(id,{x:CX+60,y:CY+380});setTimeout(()=>{if(HFGI()&&dg.ph==='lobby')banner={s:'🔥 เตาหลอมหัวใจ · พร้อมเมื่อไหร่กด "เริ่ม" (เล่นคนเดียวได้)',t:5}},700)}
function hfgStart(){if(!HFGI()||dg.ph!=='lobby')return;const D=DT[24];stSay(HFG_IN,()=>{if(!HFGI()||dg.ph!=='lobby')return;dg={ph:'run',w:0,tl:D.tm*DGTX,nx:0};SR=0;mons=[];teles=[];bossCd=1e9;hfgReset();HF.st='run';
  fx({k:'msg',s:'🔥 เตาหลอมลุกโชน! ยืนในหินเพลงเพื่อร้องเพลงกล่อม'});try{sfx('quest')}catch(e){}},{cine:1})}
function hfgSpawn(n){const D=DT[24],np=Math.max(1,plCount()),pts=[];for(let i=0;i<n;i++){const a=Math.random()*6.283,x=CX+Math.cos(a)*(DR-40),y=CY+Math.sin(a)*(DR-40);
    const t=Math.random()<.1+HF.S/700?2:(Math.random()<.4?1:0),L=D.L,hp=mhp(t,L)*(1+.25*(np-1));mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,hfg:1});if(pts.length<10)pts.push([Math.round(x),Math.round(y)])}
  if(pts.length)fx({k:'hftl',x:CX,y:CY,p:pts})}
function hfgSim(dt){if(dg.ph!=='run'&&dg.ph!=='boss')return;dg.tl-=dt;if(dg.tl<=0){dgEnd(0,'หมดเวลา');return}
  const all=[me.down>0,...Object.values(others).map(o=>o.hp<=0)];if(all.every(x=>x)){dg.wt=(dg.wt||0)+dt;if(dg.wt>2.5){dgEnd(0,'ทั้งทีมล้มหมด');return}}else dg.wt=0;
  if(HF.hp<=0){dgEnd(0,'เปลวไฟในเตาหลอมดับลง');return}
  const pl=escPl(),np=Math.max(1,plCount());HF.sg=HFST.map(([x,y])=>pl.some(p=>Math.hypot(p.x-x,p.y-y)<HFSR)?1:0);const ns=HF.sg[0]+HF.sg[1]+HF.sg[2];
  const bite=mons.some(m=>m.hfg&&m.hp>0&&Math.hypot(m.x-CX,m.y-CY)<100);
  if(dg.ph==='run'){HF.S=Math.min(100,HF.S+ns*(np===1?2.6:1.9)*(bite?.5:1)*dt);
    HF.nt-=dt;if(HF.nt<=0){const alive=mons.filter(m=>m.hfg&&m.hp>0).length,cap=5+2*np;HF.nt=Math.max(2.2,3.6-HF.S/60);if(alive<cap)hfgSpawn(Math.min(cap-alive,1+Math.floor(np/2)+(HF.S>50?1:0)))}
    if(HF.S>=34&&HF.ms<1){HF.ms=1;fx({k:'msg',s:'🎶 ท่อนของค่ายผู้อพยพดังขึ้น… «วันหนึ่งประตูจะเปิด แล้วเราจะกลับบ้าน»'})}
    if(HF.S>=67&&HF.ms<2){HF.ms=2;fx({k:'msg',s:'🎶 คณะนักร้องอัสตราประสานเข้ามา… «ฟ้ากว้างเกินกว่าจะอยู่คนเดียว»'})}
    if(HF.S>=100){dg.ph='boss';HF.st='boss';bossCd=1e9;spawnBoss();dg.tl+=DGBOSS;fx({k:'hftl',x:CX,y:CY,p:[[CX,CY-330]],big:1});fx({k:'msg',s:'🌑 เพลงจบท่อน… และความหิวของดาวก็ลุกขึ้นจากก้นเปล!'});try{sfx('boss')}catch(e){}}}
  else{if(ns)HF.hp=Math.min(100,HF.hp+.5*ns*dt);const need=Math.min(3,np);if(ns>=need)HF.ch=Math.min(6,HF.ch+dt);else HF.ch=Math.max(0,HF.ch-1.5*dt);HF.cc=Math.max(0,HF.cc-dt);
    if(HF.ch>=6&&HF.cc<=0){const B=mons.find(q=>q.t===3&&q.hp>0);if(B){B.stun=Math.max(B.stun||0,4);if(!B.inv)B.hp=Math.max(1,B.hp-B.mh*.03);fx({k:'hfc',x:CX,y:CY,bx:Math.round(B.x),by:Math.round(B.y)});fx({k:'msg',s:'🎶 เพลงกล่อมสามเมืองดังพร้อมกัน! ความหิวชะงัก'});try{sfx('boss')}catch(e){}}HF.ch=0;HF.cc=20}}
  HF.bt-=dt;if(HF.bt<=0){HF.bt=.3;fx({k:'hfv',x:CX,y:CY,hp:Math.round(HF.hp*10)/10,S:Math.round(HF.S*10)/10,st:HF.st,sg:HF.sg.join(''),ch:+HF.ch.toFixed(1),cc:Math.round(HF.cc)})}}
function hfgMon(m,dt,pl,spd){if(!HFGI()||(dg.ph!=='run'&&dg.ph!=='boss'))return false;for(const p of pl)if(Math.hypot(p.x-m.x,p.y-m.y)<140)return false;
  const d=Math.hypot(CX-m.x,CY-m.y);if(d>80){moveTo(m,CX,CY,spd*1.05*dt);return true}
  if(m.ac<=0){m.ac=1;m.akN=((m.akN|0)+1)%100;m.akT=performance.now();HF.hp=Math.max(0,HF.hp-(m.t===2?1.5:m.t===0?1.2:.9));HF.hit=performance.now()}return true}
function hfgAI(m,dt,pl,enr,dm){if(m.t!==3)return;const f=m.hp/m.mh,x=Math.round(m.x),y=Math.round(m.y),now=performance.now();
  if(m.ht){m.ht.t-=dt;if(m.ht.t<=0){const blk=pl.filter(p=>segD(p.x,p.y,m.x,m.y-50,CX,CY-40)<50);
      if(blk.length){blk.forEach(p=>{dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(42*dm/blk.length)});fx({k:'hftr',x:CX,y:CY,ok:1});fx({k:'msg',s:'🛡️ ขวางสายกลืนไฟไว้ได้! เปลวไฟปลอดภัย'})}
      else{HF.hp=Math.max(0,HF.hp-16);m.hp=Math.min(m.mh,m.hp+m.mh*.02);HF.hit=now;fx({k:'hftr',x:CX,y:CY,ok:0});fx({k:'msg',s:'🔥 ความหิวกลืนเปลวไฟไปคำใหญ่! (เตาหลอม −16%)'})}m.ht=null}}
  if(m.hi){m.hi.t-=dt;if(m.hi.t<=0){pl.forEach(p=>{if(Math.hypot(p.x-m.x,p.y-m.y)<230&&!hfInSt(p.x,p.y))dmgQ[p.u]=(dmgQ[p.u]||0)+Math.round(90*dm)});
      if(!pl.some(p=>hfInSt(p.x,p.y))){HF.hp=Math.max(0,HF.hp-10);HF.hit=now;fx({k:'msg',s:'🌑 ไม่มีใครร้องเพลงต้านไว้… เปลวไฟหรี่ลง (−10%)'})}fx({k:'bslam',x,y,r:230});m.hi=null}}
  if(m.stun>0||m.inv)return;
  m.h1=(m.h1===undefined?6:m.h1)-dt;if(m.h1<=0&&!m.ht){m.h1=enr?11:14;m.ht={t:2.8};fx({k:'hft',x:CX,y:CY,dur:2.8});fx({k:'msg',s:'🖤 ความหิวยื่นสายกลืนไฟเข้าหาเตาหลอม! ไปยืนขวางเส้น'})}
  m.h2=(m.h2===undefined?3:m.h2)-dt;if(m.h2<=0&&pl.length){m.h2=enr?5.5:7;pl.forEach(p=>{const px=Math.round(p.x),py=Math.round(p.y);m.tl.push({x:px,y:py,r:85,t:1.4,k:'star'});fx({k:'tele',x:px,y:py,r:85,dur:1.4})});fx({k:'msg',s:'🌑 ดาวดับร่วงลงมา! ขยับออกจากวง'})}
  if(f<.65){m.h3=(m.h3===undefined?2:m.h3)-dt;if(m.h3<=0){m.h3=enr?13:17;hfgSpawn(2+Math.min(2,pl.length-1));fx({k:'msg',s:'👁️ เงาหิวคลานออกมาจากขอบเปล! อย่าให้มันถึงเตา'})}}
  if(f<.35&&!m.hi){m.h4=(m.h4===undefined?3:m.h4)-dt;if(m.h4<=0){m.h4=enr?16:20;m.hi={t:3.2};fx({k:'hfi',x:CX,y:CY,dur:3.2});fx({k:'msg',s:'🌑 ความหิวสูดกลืนฟ้า! เข้าไปยืนในหินเพลง'});try{sfx('boss')}catch(e){}}}}
function hfgFx(o){if(!o)return false;const n=performance.now();
  if(o.k==='hfv'){if(!isHost()||!HFGI()){const h=+o.hp;if(h<HF.hp-.05)HF.hit=n;HF.hp=h;HF.S=+o.S;HF.st=o.st;HF.sg=String(o.sg||'000').split('').map(Number);HF.ch=+o.ch||0;HF.cc=+o.cc||0}return true}
  if(o.k==='hftl'){(o.p||[]).forEach(p=>HFX.tl.push({x:+p[0],y:+p[1],t0:n,big:o.big?1:0}));if(HFX.tl.length>30)HFX.tl.splice(0,HFX.tl.length-30);return true}
  if(o.k==='hft'){HFX.tt={t0:n,d:(+o.dur||2.8)*1000};return true}
  if(o.k==='hftr'){HFX.tr={t0:n,ok:o.ok?1:0};HFX.tt=null;return true}
  if(o.k==='hfi'){HFX.inh={t0:n,d:(+o.dur||3.2)*1000};return true}
  if(o.k==='hfc'){HFX.cb={t0:n,x:+o.bx,y:+o.by};return true}return false}
function hfgLocal(dt){if(!HFGI()||dg.ph!=='boss'||me.down>0||!me.cls)return;const B=mons.find(q=>q.t===3&&q.hp>0);if(!B)return;
  if(HFX.inh&&performance.now()-HFX.inh.t0<HFX.inh.d&&!hfInSt(me.x,me.y)){const dx=B.x-me.x,dy=B.y-me.y,d=Math.hypot(dx,dy)||1;if(d>50){me.x+=dx/d*140*dt;me.y+=dy/d*140*dt}}
  const cd=Math.hypot(me.x-CX,me.y-CY);if(cd>DR-14){me.x=CX+(me.x-CX)/cd*(DR-14);me.y=CY+(me.y-CY)/cd*(DR-14)}}
/* ฉากเปลหัวใจ */
function hfgBuild(M){PALC.warm=1;PAL={dec:[],wins:[],chand:[],veins:[],desks:[],fis:[],mirs:[]};for(let i=0;i<64;i++){const a=i/64*6.283;trees.push({x:CX+Math.cos(a)*(DR+30),y:CY+Math.sin(a)*(DR+30),r:22,inv:1,ns:1})}
  for(let i=0;i<10;i++){const a=i/10*6.283+.3;if(Math.sin(a)>.75)continue;trees.push({x:CX+Math.cos(a)*(DR+120),y:CY+Math.sin(a)*(DR+100),r:0,k:i%3===0?'hgear':'hbellf',v:i%3,ht:120,ns:1,nc:1})}
  HFST.forEach(([x,y],i)=>{const a=Math.atan2(y-CY,x-CX);trees.push({x:CX+Math.cos(a)*(DR+80),y:CY+Math.sin(a)*(DR+70)+10,r:0,k:'hcho',v:i,ht:70,ns:1,nc:1})});
  trees.push({x:CX,y:CY,r:48,k:'hforge',ht:240,hw:90})}
function hfgPaint(c,ox,oy,S){const X1=ox+S,Y1=oy+S,sk=c.createRadialGradient(CX,CY,300,CX,CY,1800);sk.addColorStop(0,'#2a1a38');sk.addColorStop(1,'#05030a');c.fillStyle=sk;c.fillRect(ox,oy,S,S);
  for(let r=DR+560;r>DR+40;r-=90){c.strokeStyle='rgba(120,96,140,'+(.08+(DR+560-r)/2800)+')';c.lineWidth=40;c.beginPath();c.arc(CX,CY,r,0,7);c.stroke()}
  c.fillStyle='rgba(255,230,250,.6)';for(let i=0;i<120;i++){const x=CX+(palH(i,1,901)-.5)*2600,y=CY+(palH(i,2,902)-.5)*2600;if(Math.hypot(x-CX,y-CY)<DR+620||x<ox||x>X1||y<oy||y>Y1)continue;c.fillRect(x,y,1.4,1.4)}
  c.fillStyle='#120c1a';c.beginPath();c.arc(CX+6,CY+36,DR+30,0,7);c.fill();
  const fl=c.createRadialGradient(CX,CY,60,CX,CY,DR+20);fl.addColorStop(0,'#5e4636');fl.addColorStop(.55,'#40302c');fl.addColorStop(1,'#281c22');c.fillStyle=fl;c.beginPath();c.arc(CX,CY,DR+20,0,7);c.fill();
  c.save();c.beginPath();c.arc(CX,CY,DR+20,0,7);c.clip();
  for(const[rr,w,a]of[[DR+8,12,.85],[DR-40,2,.5],[DR-110,1.2,.35],[200,3,.6],[120,1.6,.5]]){c.strokeStyle='rgba(232,184,104,'+a+')';c.lineWidth=w;c.beginPath();c.arc(CX,CY,rr,0,7);c.stroke()}
  c.strokeStyle='rgba(232,184,104,.18)';c.lineWidth=1.4;for(let i=0;i<48;i++){const a=i/48*6.283;c.beginPath();c.moveTo(CX+Math.cos(a)*200,CY+Math.sin(a)*200);c.lineTo(CX+Math.cos(a)*(DR-40),CY+Math.sin(a)*(DR-40));c.stroke()}
  c.font='22px serif';c.fillStyle='rgba(232,184,104,.38)';c.textAlign='center';for(let i=0;i<36;i++){const a=i/36*6.283;c.save();c.translate(CX+Math.cos(a)*(DR-75),CY+Math.sin(a)*(DR-75));c.rotate(a+1.57);c.fillText('ᚨᚱᚢᚾᛃᚨᛟᛞ'[i%8],0,7);c.restore()}
  HFST.forEach(([x,y],i)=>{const C=HFSC[i];c.strokeStyle='rgba('+C+',.32)';c.lineWidth=12;c.beginPath();c.moveTo(x,y);c.lineTo(CX+(x-CX)*.3,CY+(y-CY)*.3);c.stroke();
    c.fillStyle='rgba(20,12,18,.6)';c.beginPath();c.ellipse(x,y+4,HFSR+6,(HFSR+6)*.58,0,0,7);c.fill();c.fillStyle='rgba('+C+',.16)';c.beginPath();c.ellipse(x,y,HFSR,HFSR*.58,0,0,7);c.fill();
    c.strokeStyle='rgba('+C+',.85)';c.lineWidth=3;c.stroke();c.strokeStyle='rgba('+C+',.45)';c.lineWidth=1.2;c.beginPath();c.ellipse(x,y,HFSR-12,(HFSR-12)*.58,0,0,7);c.stroke();
    c.strokeStyle='rgba(255,240,210,.85)';c.fillStyle='rgba(255,240,210,.85)';c.lineWidth=2;
    if(i===0){c.beginPath();c.moveTo(x-16,y+8);c.lineTo(x,y-12);c.lineTo(x+16,y+8);c.closePath();c.stroke();c.beginPath();c.moveTo(x,y-12);c.lineTo(x,y+8);c.stroke()}
    else if(i===1){PST(c,x,y-2,13,4.5,4,0);c.fill()}
    else{c.beginPath();c.moveTo(x-5,y-12);c.quadraticCurveTo(x-7,y,x-13,y+7);c.lineTo(x+13,y+7);c.quadraticCurveTo(x+7,y,x+5,y-12);c.closePath();c.stroke();c.beginPath();c.arc(x,y+10,2.4,0,7);c.fill()}});
  {const x=CX,y=CY;c.fillStyle='rgba(10,6,14,.55)';c.beginPath();c.ellipse(x,y+8,150,84,0,0,7);c.fill();c.strokeStyle='#7a5228';c.lineWidth=14;for(let k=0;k<8;k++){const a0=k/8*6.283+.08;c.beginPath();c.ellipse(x,y+8,150,84,0,a0,a0+.6);c.stroke()}c.strokeStyle='#d8a050';c.lineWidth=2;c.beginPath();c.ellipse(x,y+8,158,90,0,0,7);c.stroke()}
  c.restore();
  c.strokeStyle='#7a5228';c.lineWidth=22;c.beginPath();c.arc(CX,CY,DR+18,0,7);c.stroke();c.fillStyle='#e8c070';for(let i=0;i<40;i++){const a=i/40*6.283;c.beginPath();c.arc(CX+Math.cos(a)*(DR+18),CY+Math.sin(a)*(DR+18),3.4,0,7);c.fill()}}
Object.assign(PALK,{
 hforge(t,T){const b=dg.ph==='boss'||dg.ph==='win';hfForge(t.x,t.y,1.25,T,{S:b?1:HF.S/100,fl:Math.max(.08,HF.hp/100),hrt:b?1:HF.S/100,hit:performance.now()-HF.hit<220})},
 hcho(t,T){const i=t.v|0,C=[['#6a7a40','#d8c090','#4a3020'],['#4a6aa0','#e8eef8','#2a2a40'],['#8a5a2c','#f0d8a8','#3a2010']][i],a=Math.atan2(t.y-CY,t.x-CX);
  for(let k=0;k<7;k++){const o=(k-3)*.075,r=DR+70+(k%2)*34,x=CX+Math.cos(a+o)*r,y=CY+Math.sin(a+o)*(r-10)+10;campFolk(x,y,{c:C[0],sh:C[1],hair:C[2],f:x<CX?1:-1,k:k+i*7,s:1},T);
    g.save();g.globalCompositeOperation='lighter';glowAt(x+(x<CX?7:-7),y-12,9,'255,210,140',.55+.2*Math.sin(T*5+k));g.restore()}
  if(HFGI()&&(HF.st==='run'||HF.st==='boss')&&!LOWQ){const x=CX+Math.cos(a)*(DR+90),y=CY+Math.sin(a)*(DR+80);g.font='15px serif';g.textAlign='center';for(let k=0;k<2;k++){const u=(T*.4+k*.5+i*.3)%1;g.fillStyle='rgba(255,236,190,'+(.8*Math.sin(u*3.14))+')';g.fillText(k?'♫':'♪',x-20+k*40,y-40-u*60)}}}});
function hfgDraw(){if(!HFGI())return;const T=performance.now()/1000,now=performance.now(),B=mons.find(q=>q.t===3&&q.hp>0);
  if(HFLT){const dt=Math.min(.1,(now-HFLT)/1000);try{hfgLocal(dt)}catch(e){}}HFLT=now;g.save();
  HFST.forEach(([x,y],i)=>{const on=HF.sg&&HF.sg[i]===1,c=HFSC[i];g.globalCompositeOperation='lighter';glowAt(x,y,HFSR*1.3,c,on?.3+.08*Math.sin(T*4):.08);
    if(on&&!LOWQ)for(let k=0;k<4;k++){const u=(T*.5+k/4+i*.13)%1;glowAt(x+Math.sin(k*2.1+T)*30,y-20-u*90,3,c,Math.sin(u*3.14))}g.globalCompositeOperation='source-over';
    if(on){g.font='15px serif';g.textAlign='center';for(let k=0;k<2;k++){const u=(T*.4+k*.5+i*.2)%1;g.fillStyle='rgba('+c+','+Math.sin(u*3.14)+')';g.fillText(k?'♫':'♪',x-16+k*30+Math.sin(T*2+k)*6,y-30-u*70)}}
    if(HF.st==='boss'&&HF.ch>0){g.strokeStyle='rgba(255,240,200,.9)';g.lineWidth=3;g.beginPath();g.ellipse(x,y,HFSR+8,(HFSR+8)*.58,0,-1.57,-1.57+6.283*Math.min(1,HF.ch/6));g.stroke()}
    hfTxt('🎵 หินเพลง · '+HFSN[i],x,y+HFSR*.58+18,'rgb('+c+')')});
  HFX.tl=HFX.tl.filter(e=>now-e.t0<1200);for(const e of HFX.tl){const k=(now-e.t0)/1200;g.save();g.globalCompositeOperation='lighter';glowAt(e.x,e.y,60*(e.big?2.2:1),'200,120,255',.4*(1-k));g.restore();g.strokeStyle='rgba(230,190,255,'+(.7*(1-k))+')';g.lineWidth=2;g.beginPath();g.ellipse(e.x,e.y,(20+k*50)*(e.big?2:1),(10+k*22)*(e.big?2:1),0,0,7);g.stroke()}
  /* สายกลืนไฟ */
  if(HFX.tt&&B){const u=(now-HFX.tt.t0)/HFX.tt.d;if(u>1.15)HFX.tt=null;else{const ax=B.x,ay=B.y-50,bx=CX,by=CY-40,L=Math.hypot(bx-ax,by-ay)||1,nx=-(by-ay)/L,ny=(bx-ax)/L;
    g.lineCap='round';g.strokeStyle='rgba(255,70,110,'+(.1+.12*Math.min(1,u))+')';g.lineWidth=100;g.beginPath();g.moveTo(ax,ay);g.lineTo(bx,by);g.stroke();
    g.strokeStyle='rgba(255,120,150,.7)';g.lineWidth=2;g.setLineDash([12,9]);g.lineDashOffset=-T*40;for(const s of[-50,50]){g.beginPath();g.moveTo(ax+nx*s,ay+ny*s);g.lineTo(bx+nx*s,by+ny*s);g.stroke()}g.setLineDash([]);
    const reach=Math.min(1,u*1.1);g.beginPath();for(let k=0;k<=24;k++){const q=k/24*reach,w=Math.sin(q*14-T*10)*10*(1-q*.5);const px=ax+(bx-ax)*q+nx*w,py=ay+(by-ay)*q+ny*w;k?g.lineTo(px,py):g.moveTo(px,py)}
    g.strokeStyle='#08020e';g.lineWidth=12;g.stroke();g.strokeStyle='rgba(200,120,255,.9)';g.lineWidth=3;g.stroke();
    g.save();g.globalCompositeOperation='lighter';for(let k=0;k<5;k++){const q=((T*1.6+k/5)%1)*reach;glowAt(ax+(bx-ax)*q,ay+(by-ay)*q,10,'230,150,255',.6)}g.restore();
    if(u<1)hfTxt('🛡️ ยืนขวางสายกลืนไฟ! '+Math.max(0,(1-u)*HFX.tt.d/1000).toFixed(1),(ax+bx)/2,(ay+by)/2-20,'#ffd0e8','bold 13px system-ui')}}
  if(HFX.tr){const u=(now-HFX.tr.t0)/800;if(u>1)HFX.tr=null;else{g.save();g.globalCompositeOperation='lighter';if(HFX.tr.ok){glowAt(CX,CY-60,140*u+30,'255,240,190',.6*(1-u))}else{glowAt(CX,CY-60,160*u+40,'200,60,255',.7*(1-u))}g.restore()}}
  /* สูดกลืนฟ้า */
  if(HFX.inh&&B){const u=(now-HFX.inh.t0)/HFX.inh.d;if(u>=1)HFX.inh=null;else{g.strokeStyle='rgba(255,90,170,'+(.5+.4*Math.sin(T*12))+')';g.lineWidth=3;g.setLineDash([14,8]);g.lineDashOffset=-T*60;g.beginPath();g.ellipse(B.x,B.y,230,230*.62,0,0,7);g.stroke();g.setLineDash([]);
    g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?10:22);i++){const an=i/22*6.283+T,q=(T*1.4+i*.17)%1,r0=520*(1-q)+40;g.strokeStyle='rgba(230,190,255,'+(.6*q)+')';g.lineWidth=1.6;g.beginPath();g.moveTo(B.x+Math.cos(an)*r0,B.y+Math.sin(an)*r0*.62);g.lineTo(B.x+Math.cos(an)*(r0-40),B.y+Math.sin(an)*(r0-40)*.62);g.stroke()}
    HFST.forEach(([x,y])=>glowAt(x,y,HFSR*1.2,'255,240,200',.25+.15*Math.sin(T*8)));g.globalCompositeOperation='source-over';
    hfTxt((hfInSt(me.x,me.y)?'🎵 เพลงคุ้มกันอยู่! ':'🌑 เข้าหินเพลง! ')+Math.max(0,(1-u)*HFX.inh.d/1000).toFixed(1),me.x,me.y-74,'#ffd0f0','bold 14px system-ui')}}
  if(HFX.cb){const u=(now-HFX.cb.t0)/1200;if(u>1)HFX.cb=null;else{g.save();g.globalCompositeOperation='lighter';HFST.forEach(([x,y],i)=>{const px=x+(HFX.cb.x-x)*Math.min(1,u*1.6),py=y+(HFX.cb.y-60-y)*Math.min(1,u*1.6);glowAt(px,py,18,HFSC[i],.9*(1-u));glowAt(px,py,40,HFSC[i],.3*(1-u))});glowAt(HFX.cb.x,HFX.cb.y-60,120*u,'255,240,200',.5*(1-u));g.restore()}}
  /* แถบเปลวไฟ + เพลง */
  {const bw=130,by=CY-262,k=Math.max(0,HF.hp)/100;g.fillStyle='rgba(20,12,8,.8)';g.beginPath();g.roundRect(CX-bw/2-3,by-3,bw+6,12,5);g.fill();g.fillStyle=k>.5?'#ffb04a':k>.25?'#e07a30':'#e04a3a';g.beginPath();g.roundRect(CX-bw/2,by,bw*k,6,3);g.fill();
    hfTxt((HF.st==='boss'?'🌑 ':'🔥 ')+'เปลวไฟเตาหลอม '+Math.ceil(HF.hp)+'%',CX,by-6);
    if(HF.st!=='boss'){const s=HF.S/100;g.fillStyle='rgba(20,12,8,.8)';g.beginPath();g.roundRect(CX-bw/2-3,by+13,bw+6,10,5);g.fill();const sg=g.createLinearGradient(CX-bw/2,0,CX+bw/2,0);sg.addColorStop(0,'rgb('+HFSC[0]+')');sg.addColorStop(.5,'rgb('+HFSC[1]+')');sg.addColorStop(1,'rgb('+HFSC[2]+')');g.fillStyle=sg;g.beginPath();g.roundRect(CX-bw/2,by+15,bw*s,5,2.5);g.fill();hfTxt('🎶 เพลงกล่อม '+Math.floor(HF.S)+'%',CX,by+36,'#fff0c8')}
    else if(HF.cc>0)hfTxt('🎶 เพลงประสานพร้อมอีก '+Math.ceil(HF.cc)+' วิ',CX,by+26,'#e8dcff','9px system-ui')}
  g.restore()}
function hfgScreen(){if(!HFGI())return;const T=performance.now()/1000,inh=HFX.inh&&performance.now()-HFX.inh.t0<HFX.inh.d;g.save();g.setTransform(DPR,0,0,DPR,0,0);const c=inh?'255,60,150':HF.st==='boss'?'70,20,100':'90,40,20',gr=g.createRadialGradient(SW0/2,H/2,Math.min(SW0,H)*.32,SW0/2,H/2,Math.max(SW0,H)*.75);gr.addColorStop(0,'rgba('+c+',0)');gr.addColorStop(1,'rgba('+c+','+(inh?.28+.08*Math.sin(T*10):.24)+')');g.fillStyle=gr;g.fillRect(0,0,SW0,H);g.restore()}
/* ภาพบอส: ความหิวของดาว (ร่างมืดหนาม · ปากหลุมดำล้อมฟันดาว · ตาหกดวง · มงกุฎดาวดับ) */
function gxStarHunger(T,W,F,E,Pg,Ln,eye,glowOrb,br,sw,up,cf){const B=mons.find(q=>q.t===3),hf=B?B.hp/B.mh:1,fy=br-6+Math.sin(T*1.3)*4,cy=-86+fy;g.save();g.translate(0,30);g.scale(1.35,1.35);g.translate(0,-30);
  for(let i=0;i<6;i++){const bx=-36+i*14.4,ph=T*2+i*1.3;Ln([bx,cy+30,bx+Math.sin(ph)*10,cy+62,bx+Math.sin(ph+1)*14,cy+94],F(i%2?'#160a26':'#0e0618'),9-Math.abs(i-2.5)*1.2)}
  if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,cy,100,hf<.5?'255,120,200':'170,110,255',.22);g.restore()}
  {const P=[];for(let i=0;i<22;i++){const a=i/22*6.283,R=(i%2?50:66)+Math.sin(T*3+i*1.7)*4;P.push(Math.cos(a)*R,cy+Math.sin(a)*R*.92)}Pg(P,F('#1a0e2c'),1);if(!W){g.strokeStyle=hf<.5?'rgba(255,150,220,.8)':'rgba(200,150,255,.75)';g.lineWidth=2.2;g.stroke()}}
  E(0,cy,48,46,F('#0a0614'),0);
  if(!W){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<(LOWQ?10:22);i++){const u=(T*.5+i/22)%1,a=i*2.4+T*1.6,rr=66*(1-u)+10;glowOrb(Math.cos(a)*rr,cy+Math.sin(a)*rr*.7,1.8+2*(1-u),i%3?'255,190,240':'200,170,255',.9*u)}g.restore()}
  E(0,cy+4,24,30,F('#000000'),0);
  for(let i=0;i<14;i++){const a=i/14*6.283+T*.4,ox=Math.cos(a)*25,oy=cy+4+Math.sin(a)*31,ix=Math.cos(a)*15,iy=cy+4+Math.sin(a)*19,pa=a+1.5708;Pg([ox+Math.cos(pa)*4,oy+Math.sin(pa)*4,ix,iy,ox-Math.cos(pa)*4,oy-Math.sin(pa)*4],F('#ece4ff'),0)}
  if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(0,cy+4,18+cf*20,'255,110,190',.35+cf*.5);g.restore()}
  [[-30,cy-26],[30,cy-26],[-41,cy-4],[41,cy-4],[-17,cy-38],[17,cy-38]].forEach(([ex,ey],i)=>{if(Math.sin(T*2.3+i*1.9)>-.9)eye(ex,ey,4.4,3,hf<.5?'#ffb0e0':'#ffe080')});
  for(let i=0;i<5;i++){const a=-2.6+i*.3,px=Math.cos(a)*60,py=cy+Math.sin(a)*60-6;g.fillStyle=F('#3a2a50');PST(g,px,py,7,2.8,4,T*.3+i);g.fill();if(!W){g.save();g.globalCompositeOperation='lighter';glowOrb(px,py,9,'200,170,255',.28);g.restore()}}
  if(!W&&hf<.5){g.strokeStyle='rgba(255,220,150,.9)';g.lineWidth=1.6;g.beginPath();g.moveTo(-34,cy-20);g.lineTo(-22,cy-6);g.lineTo(-30,cy+14);g.moveTo(32,cy-30);g.lineTo(22,cy-12);g.lineTo(30,cy+6);g.moveTo(-6,cy-44);g.lineTo(2,cy-34);g.stroke();g.save();g.globalCompositeOperation='lighter';glowOrb(-26,cy-4,14,'255,210,140',.4);glowOrb(26,cy-14,14,'255,210,140',.4);g.restore()}
  g.restore()}
/* มอนธีม 37: เงาหิว · ปากดาวลอย · ยักษ์กลืนแสง */
function drawMonHG(t,r,T,E,Pg,Ln,eye,F,W,bob,sw,la,ra){const glow=(x,y,rr,c,a)=>{if(W||LOWQ)return;g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.restore()};
  const teeth=(cx,cy,rx,ry,n)=>{if(W)return;g.fillStyle='#efe6ff';for(let i=0;i<n;i++){const x=cx-rx+(i+.5)/n*rx*2,w=rx/n*.8;g.beginPath();g.moveTo(x-w,cy-ry);g.lineTo(x,cy-ry*.3);g.lineTo(x+w,cy-ry);g.fill();g.beginPath();g.moveTo(x-w,cy+ry);g.lineTo(x,cy+ry*.3);g.lineTo(x+w,cy+ry);g.fill()}};
  if(t===0){glow(0,-r*.45,r*1.05,'170,110,255',.07);
    for(const[lx,ph]of[[-r*.5,0],[-r*.2,2],[r*.15,1],[r*.45,3]]){const k=Math.sin(T*8+ph)*r*.12;Ln([lx,-r*.3+bob,lx+k,r*.1,lx+k*1.4+r*.08,r*.16],F('#120a1e'),r*.13)}
    {const P=[];for(let i=0;i<14;i++){const a=Math.PI+i/13*Math.PI,R=r*(.62+(i%2)*.16)+Math.sin(T*5+i)*r*.03;P.push(Math.cos(a)*R*1.1,-r*.32+bob+Math.sin(a)*R*.8)}Pg(P,F('#22123a'),1)}
    E(0,-r*.36+bob,r*.6,r*.34,F('#2c1848'),0);E(r*.44,-r*.34+bob,r*.24,r*.17,F('#000000'),0);teeth(r*.44,-r*.34+bob,r*.22,r*.15,4);glow(r*.44,-r*.34+bob,r*.2,'255,110,190',.35);
    eye(r*.05,-r*.62+bob,r*.07,r*.05,'#ffd060');eye(r*.25,-r*.66+bob,r*.06,r*.045,'#ffd060');eye(-r*.15,-r*.6+bob,r*.05,r*.04,'#ffd060');
    if(!W){g.fillStyle='#a88ae8';for(let i=0;i<3;i++){PST(g,-r*.35+i*r*.22,-r*.8+bob,r*.08,r*.032,4,T+i);g.fill()}}return true}
  if(t===1){const hv=Math.sin(T*3)*r*.12,cy=-r*.8+hv;glow(0,cy,r*1.1,'255,120,200',.08);
    for(const s of[-1,1]){const f=Math.sin(T*9)*.4;g.save();g.translate(s*r*.4,cy);g.rotate(s*(.2+f));g.fillStyle=W?'#fff':'rgba(52,28,86,.9)';g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(s*r*.5,-r*.5,s*r*.95,-r*.2);g.quadraticCurveTo(s*r*.6,-r*.05,s*r*.8,r*.15);g.quadraticCurveTo(s*r*.4,r*.1,0,r*.12);g.closePath();g.fill();g.restore()}
    E(0,cy,r*.5,r*.5,F('#22123a'),1);E(0,cy+r*.05,r*.3,r*.3,F('#000000'),0);
    if(!W){g.fillStyle='#efe6ff';for(let i=0;i<10;i++){const a=i/10*6.283+T,ox=Math.cos(a)*r*.3,oy=cy+r*.05+Math.sin(a)*r*.3,ix=Math.cos(a)*r*.17,iy=cy+r*.05+Math.sin(a)*r*.17,pa=a+1.57;g.beginPath();g.moveTo(ox+Math.cos(pa)*r*.05,oy+Math.sin(pa)*r*.05);g.lineTo(ix,iy);g.lineTo(ox-Math.cos(pa)*r*.05,oy-Math.sin(pa)*r*.05);g.fill()}}
    glow(0,cy+r*.05,r*.25,'255,110,190',.45);eye(0,cy-r*.36,r*.09,r*.06,'#ffe080');
    Ln([-r*.15,cy+r*.45,-r*.2,cy+r*.8],F('#1a0e2a'),r*.08);Ln([r*.15,cy+r*.45,r*.22,cy+r*.75],F('#1a0e2a'),r*.08);return true}
  glow(0,-r*.8,r*1.2,'170,110,255',.07);
  Ln([-r*.28,-r*.5,-r*.34,r*.75-la],F('#1a0e2a'),r*.22);Ln([r*.28,-r*.5,r*.34,r*.75-ra],F('#22123a'),r*.22);
  Pg([-r*.62,-r*.45+bob,-r*.7,-r*1.15+bob,-r*.3,-r*1.45+bob,r*.3,-r*1.45+bob,r*.7,-r*1.15+bob,r*.62,-r*.45+bob,0,-r*.3+bob],F('#22123a'),1);
  Ln([-r*.66,-r*1.1+bob,-r*.95,-r*.6+bob+sw*r*.1,-r*.9,-r*.15+bob],F('#1c0e30'),r*.2);Ln([r*.66,-r*1.1+bob,r*.95,-r*.6+bob-sw*r*.1,r*.9,-r*.15+bob],F('#1c0e30'),r*.2);
  E(0,-r*.9+bob,r*.24,r*.28,F('#000000'),0);glow(0,-r*.9+bob,r*.34,'255,110,190',.38);
  if(!W){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<8;i++){const u=(T*.8+i/8)%1,a=i*2.1+T*2,rr=r*.5*(1-u);g.fillStyle='rgba(255,220,250,'+(.9*u)+')';g.beginPath();g.arc(Math.cos(a)*rr,-r*.9+bob+Math.sin(a)*rr,1.6,0,7);g.fill()}g.restore()}
  E(0,-r*1.6+bob,r*.24,r*.2,F('#2c1848'),1);eye(-r*.08,-r*1.62+bob,r*.05,r*.035,'#ffd060');eye(r*.08,-r*1.62+bob,r*.05,r*.035,'#ffd060');
  for(let i=0;i<3;i++)Pg([-r*.21+i*r*.16,-r*1.74+bob,-r*.16+i*r*.16,-r*1.98+bob,-r*.11+i*r*.16,-r*1.74+bob],F('#4a3a64'),0);
  if(!W){g.strokeStyle='rgba(255,210,140,.85)';g.lineWidth=1.4;g.beginPath();g.moveTo(-r*.45,-r*1.2+bob);g.lineTo(-r*.32,-r*1.02+bob);g.lineTo(-r*.42,-r*.8+bob);g.moveTo(r*.4,-r*1.25+bob);g.lineTo(r*.3,-r*1.05+bob);g.stroke()}
  return true}
function hfgReward(){if(dgRew)return;dgRew=1;const D=DT[24],st=stCur(),sto=st&&st.g==='hfg',gd=sto?D.gold:75000;HFX={tt:null,tr:null,inh:null,cb:null,tl:[]};
  me.gold=Math.min(GMAX,me.gold+gd);me.inv.s3=Math.min(999,(me.inv.s3|0)+(sto?25:8));gainXP(me.x,me.y,sto?D.exp:Math.round(D.exp*.6));try{rsGive(sto?34:10+(Math.random()*6|0),'เตาหลอมหัวใจ')}catch(e){}try{ecGive(sto?34:10+(Math.random()*5|0),'เตาหลอมหัวใจ')}catch(e){}me.stt.dg++;
  drops.push({x:me.x+22,y:me.y+12,k:'e',L:22,rm:4,t:60});drops.push({x:me.x-22,y:me.y+12,k:'e',L:22,rm:4,t:60});if(sto||Math.random()<.5)drops.push({x:me.x,y:me.y+30,k:'e',L:22,rm:4,lg:1,t:60});
  sdGive(sto?20:7,'เตาหลอมหัวใจ');me.ach=me.ach||{};if(sto){me.sty.n=1;me.sty.a=1}else me.hfT=Date.now();
  banner={s:'🔥 หัวใจดวงใหม่เต้นขึ้นในเตาหลอม! +'+gd.toLocaleString()+' ทอง · หินขั้นสูง ×'+(sto?25:8)+' · เปลวไฟเหลือ '+Math.ceil(HF.hp)+'%',t:8};sfx('lvl');burst(me.x,me.y-10,['#ffe0a0','#ffffff','#f0a0c8','#a8c8ff'],160,320,1.8,{glow:1,g:-60});
  setTimeout(()=>{if(HFGI())enterMap(33,hfgBack())},10000)}
function instRepeatHfg(){const l=Math.max(0,(me.hfT||0)+30*60000-Date.now());if(l>0){stSay([['ves','เตาหลอมยังต้องพักไฟอีก '+Math.ceil(l/60000)+' นาที… เพลงก็ต้องพักเสียงบ้าง']]);return true}
  stSay([['ves','ความหิวของดาวไม่มีวันหายไปจริง ๆ ตราบใดที่ยังมีดาวร่วง… ถ้าอยากร้องเพลงกล่อมสู้กับมันอีกรอบ ข้าจะจุดเตาให้ (เศษดาว · หินขั้นสูง · ของ Lv 22)']],()=>{},{choice:[['🔥 จุดเตาหลอมหัวใจอีกครั้ง',1],['ไว้ก่อน',0]]});SD.onChoose=e=>{stClose();if(e===1)setTimeout(hfgEnter,250)};return true}
/* ---------- ออร่าเศษดาวแบบที่ 5: ประกายเตาหลอม ---------- */
function hfAura(x,y){const T=performance.now()/1000,C=['170,220,255','255,200,120','220,160,255'],P=[];g.save();for(let i=0;i<3;i++){const a=T*1.5+i*2.094;P.push([x+Math.cos(a)*24,y-18+Math.sin(a)*9,Math.sin(a)>0,i])}
  g.globalCompositeOperation='lighter';for(const[px,py,fr,i]of P){g.globalAlpha=fr?1:.5;glowAt(px,py-4,15,C[i],.5)}
  g.globalCompositeOperation='source-over';for(const[px,py,fr,i]of P){g.globalAlpha=fr?1:.55;const fl=Math.sin(T*9+i*2)*1.5;g.fillStyle='rgb('+C[i]+')';g.beginPath();g.moveTo(px,py-12-fl);g.quadraticCurveTo(px+6,py-3,px,py+3);g.quadraticCurveTo(px-6,py-3,px,py-12-fl);g.fill();g.strokeStyle='rgba(80,40,20,.7)';g.lineWidth=1;g.stroke();g.fillStyle='#fff8e8';g.beginPath();g.ellipse(px,py-1.5,1.8,3,0,0,7);g.fill()}
  g.globalAlpha=1;if(!LOWQ){g.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const u=(T*.7+i/5)%1;glowAt(x+Math.sin(i*2.3+T)*16,y-10-u*50,2.2,C[i%3],.8*Math.sin(u*3.14))}}g.restore()}
/* ---------- เนื้อเรื่องภาค 7 บทสุดท้าย ---------- */
STCH.push('ภาค 7 · บทสุดท้าย · เตาหลอมหัวใจ');
const STEND8=[null,
 [['me','(ประคองหัวใจดวงใหม่ลงในเปลสำริดที่ว่างมาสามร้อยปี) …อารัณยารอนานที่สุด มันควรได้กลับบ้านก่อน'],
  ['nar','หัวใจลงไปพอดีกับรอยประทับ ราวกับหลุมนี้ถูกขุดไว้รอมันมาตั้งแต่แรก แผ่นดินทั้งแอ่งสั่นสะเทือน… แล้วเริ่มลอยขึ้น'],
  ['nar','เกาะทั้งหกของอารัณยาลอยพ้นทะเลเมฆเป็นครั้งแรกในสามร้อยปี ระฆังทุกใบดังพร้อมกัน เงาบนขั้นบันไดกลายเป็นคนที่มีใบหน้า มีชื่อ และมีบ้าน'],
  ['nar','ครึ่งหัวใจทองที่อัสตราเคยแบ่งมา ลอยกลับขึ้นไปหาเมืองของมัน อัสตราค่อย ๆ ลอยสูงขึ้นอีกครั้ง… สองเมืองอยู่บนฟ้าเคียงกัน',0,0,0,1],
  ['nar','เมล็ดดาวที่ลอยอยู่ในหลุมมาตลอดหลอมเข้ากับหัวใจดวงใหม่ คำสาบานของผู้ถือตราเป็นจริงแล้วทุกคำ',0,0,0,2],
  ['wk','สหกรณ์คนงานคาร์นจะสร้างบันไดขึ้นอารัณยาใหม่ทั้งหมด ไม่คิดค่าแรง!',0,0,0,0,2],
  ['brom','เมืองที่เพิ่งลอยขึ้นมาต้องการของทุกอย่าง… ข้าว่าข้าเห็นตลาดใหม่แล้วล่ะ',0,0,0,0,1],
  ['ves','(เวสเปอร์วางหอกเข็มนาฬิกาลงข้างเปล แล้วนั่งลงบนขั้นบันไดเหมือนคนธรรมดาคนหนึ่ง) …ข้าขอพักสักครู่นะ ผู้ถือตรา สักครู่เดียว'],
  ['eda','หลับเถิดท่านเวสเปอร์… คราวนี้ยายจะร้องให้ท่านฟังเอง'],
  ['cmd','ค่ายของเรายังเป็นค่ายผู้อพยพเหมือนเดิม… แต่ตอนนี้เรามีเพื่อนบ้านบนฟ้าสองเมือง ไม่เลวเลยนะ']],
 [['me','(ยกหัวใจดวงใหม่ขึ้นเหนือศีรษะ) …หัวใจที่เกิดจากเพลงของทุกคน ควรอยู่ในที่ที่ทุกคนเข้าไปได้'],
  ['ves','(เวสเปอร์นิ่งไปนาน แล้วยิ้มเป็นครั้งแรก) …ค่ายของเจ้าคือที่ที่ลูกหลานของอารัณยาไปอยู่เมื่อเมืองร่วง มันก็เป็นบ้านของพวกเราด้วย'],
  ['nar','ชาวค่ายแบกหัวใจขึ้นบันไดทีละขั้น ส่งต่อมือต่อมือ จากหลุมหัวใจถึงสะพานรุ่งอรุณ จากสะพานถึงค่าย ไม่มีใครถือมันนานเกินหนึ่งก้าว'],
  ['nar','กลางลานค่ายผู้อพยพ หัวใจดวงใหม่ลอยขึ้นเหนือกองไฟกลาง แผ่นดินใต้ค่ายสั่นเบา ๆ… แล้วทั้งค่ายก็ลอยพ้นพื้นขึ้นมาหนึ่งคืบ พอดีกับที่ไม่มีใครต้องตกใจ'],
  ['cmd','(เรนน์มองเต็นท์ผ้าใบที่ลอยอยู่เหนือดินด้วยตาแดงก่ำ) …ค่ายผู้อพยพ ไม่สิ จากวันนี้ไป ที่นี่คือ «นครลี้ภัย» เมืองของทุกคนที่ไม่มีที่ไป'],
  ['wk','สหกรณ์คนงานคาร์นขอเป็นชาวนครลี้ภัยรุ่นแรก! พวกเราจะสร้างบ้านให้เสร็จก่อนฤดูฝน',0,0,0,0,2],
  ['brom','ข้าขอเปิดร้านค้าแห่งแรกของนครลี้ภัย ค่าเช่าที่… เอาเป็นว่าคุยกันทีหลัง',0,0,0,0,1],
  ['qn','สองเมืองที่แบ่งแสงกัน วันนี้กลายเป็นสามเมือง… และเมืองที่สามไม่มีกำแพงเลยสักด้าน',0,0,0,1],
  ['qn','คำสาบานของเจ้าไม่ได้สร้างหัวใจให้อารัณยาเมืองเดียว… มันสร้างให้ทุกคนที่เคยไม่มีบ้าน',0,0,0,2],
  ['ves','อารัณยาจะรอต่ออีกสักพัก… แต่คราวนี้เรารู้ว่าบ้านอยู่ที่ไหน และประตูของมันเปิดอยู่เสมอ'],
  ['eda','(ยายเอดาร้องเพลงกล่อมท่อนสุดท้ายกลางลานค่าย เด็ก ๆ ร้องตามทั้งค่าย) «…และเมื่อมันลงมา เราจะร้องพร้อมกันอีกครั้ง»']]];
{const C5=STCH.length-1;STY.push(
 {c:C5,g:'map',m:33,tx:'ไปหลุมหัวใจว่าง (ซากอารัณยา → บันไดใต้หอนาฬิกา)',
  post:[['nar','บันไดวนใต้หอนาฬิกาพาลงสู่แอ่งหัวใจอีกครั้ง… คราวนี้ระฆังทุกใบในอารัณยาเงียบ เหมือนทั้งเมืองกลั้นหายใจรอ'],
   ['nar','ครึ่งหัวใจทองที่แบ่งมาจากอัสตรายังส่องอยู่ในหลุม แต่แสงของมันซีดลงทุกคืน เหมือนเทียนที่ถูกจุดไว้นานเกินไป',0,0,0,1],
   ['nar','เหนือหลุม เมล็ดดาวดวงเล็กยังลอยอยู่ที่เดิม เต้นช้า ๆ… ช้าลงทุกคืนตั้งแต่วันที่เจ้าสาบาน',0,0,0,2],
   ['cel','(เซเลสต์ชูขวดแสงดาวขึ้นเทียบกับหลุม) แสงดาวพอแล้ว… ทีนี้ต้องขอเวลาจากคนที่เก็บมันไว้มากที่สุดในโลก'],
   ['eda','ท่านเวสเปอร์รออยู่ที่ขอบหลุมแล้วลูก ท่านบอกว่ารู้ว่าเจ้าจะมา']],rw:{g:60000}},
 {c:C5,g:'talk',k:'ves5',p7v:1,tx:'คุยกับเวสเปอร์ที่ขอบหลุม · ขอ «เวลา» สำหรับเตาหลอม',
  pre:[['ves','ผู้ถือตรา… หัวใจดาวต้องการเวลา เจ้ารู้ไหมว่าเวลาที่ข้ามีคืออะไร'],
   ['ves','สามร้อยปีที่ข้าหยุดเข็มนาฬิกาไว้ ทุกวินาทีที่ไม่ได้เดิน ข้าเก็บมันไว้ในเฟืองหัวใจของหอนาฬิกา เวลาที่ค้างอยู่… ไม่เคยถูกใช้'],
   ['ves','ตอนนี้หอนาฬิกาเดินเพื่อนับวันที่สองเมืองอยู่ด้วยกัน แต่เวลาเก่ายังติดค้างอยู่ในเฟือง หนักจนข้าแทบยกไม่ไหว',0,0,0,1],
   ['ves','ข้าปลดกลไกแล้วก็จริง แต่เข็มยังเดินช้ากว่าข้างบนนับร้อยเท่า เพราะเวลาเก่าที่ค้างอยู่ยังถ่วงมันไว้',0,0,0,2],
   ['ves','รอบหลุมนี้มีระฆังเวลาสี่ใบ ฝังฝุ่นอยู่ตั้งแต่วันที่ข้าหยุดเข็ม ข้าขุดมันขึ้นมาแล้ว… ตีมันทีละใบ ตอนที่เข็มเงาของนาฬิกากวาดผ่าน เวลาที่ค้างจะคลายออกมา'],
   ['ves','ไปยืนรอในวงของระฆัง เมื่อเข็มเงามาถึง มันจะดังเอง ข้าจะคอยฟังอยู่ตรงนี้']],rw:{g:50000}},
 {c:C5,g:'clue',m:33,n:4,p7tb:1,tx:'ตีระฆังเวลา 4 ใบรอบหลุม (ยืนรอในวงระฆังจนเข็มเงากวาดผ่าน)',
  pre:[['nar','💡 เข็มเงาของนาฬิกาจะกวาดรอบหลุมทุก 16 วินาที ยืนรอในวงของระฆัง พอเข็มเงาผ่าน ระฆังจะดังเอง (ป้ายใต้ระฆังบอกเวลาที่เข็มจะมาถึง)']],
  post:[['nar','ระฆังใบสุดท้ายดังกังวานไปทั่วแอ่ง… บนหอนาฬิกาไกลขึ้นไป เข็มทุกเข็มกระตุกพร้อมกัน แล้วเริ่มเดินตามเวลาของฟ้าเป็นครั้งแรกในสามร้อยปี'],
   ['ves','(เวสเปอร์หลับตาฟังจนเสียงระฆังเงียบ) …ไม่ได้ยินมันดังพร้อมกันแบบนี้มานานเหลือเกิน']],rw:{g:80000}},
 {c:C5,g:'talk',k:'ves5',p7t:1,tx:'รับ «เวลา» จากเวสเปอร์',
  pre:[['ves','(เวสเปอร์ยื่นเฟืองสำริดขนาดเท่าฝ่ามือให้ มันอุ่นและสั่นเบา ๆ เหมือนหัวใจเต้น) เฟืองหัวใจนาฬิกา… สามร้อยปีของอารัณยาอยู่ในนี้ทั้งหมด'],
   ['ves','ให้หัวใจดวงใหม่ใช้มันเถิด เวลาที่พวกเราเสียไปกับการรอ จะได้กลายเป็นเวลาที่ใครสักคนได้มีชีวิต'],
   ['me','(แบบเตาหลอมหัวใจ: แสงดาว ✓ · เวลา ✓ · เสียงเพลง …)'],
   ['eda','เหลือเพลงแล้วลูก… แต่เพลงกล่อมของเรา ไม่เคยมีใครร้องครบทั้งเพลง'],
   ['eda','ยายรู้แต่ท่อนของค่าย «วันหนึ่งประตูจะเปิด แล้วเราจะกลับบ้าน» ท่อนของอารัณยาอยู่กับเงาบนขั้นบันได พวกเขายังฮัมกันอยู่ทุกคืน'],
   ['eda','ส่วนท่อนของอัสตรา… ยายว่าราชินีน่าจะรู้ เพลงกล่อมของราชวงศ์ ร้องให้เจ้าหญิงฟังตั้งแต่ยังเล็ก'],
   ['cel','ข้าจะตั้งเตาหลอมไว้ในหลุมระหว่างรอ… ไปฟังเพลงให้ครบเถอะ']],rw:{g:60000,s3:5}},
 {c:C5,g:'clue',m:33,n:5,p7ss:1,tx:'ฟังเงาบนขั้นบันไดฮัมเพลงกล่อมของอารัณยา 5 ท่อน (ยืนข้างเงาที่มี ♪)',
  pre:[['nar','💡 เงาที่ยังฮัมเพลงจะมีโน้ต ♪ ลอยอยู่เหนือหัว เข้าไปยืนในวงข้าง ๆ สักครู่เพื่อฟังให้จบท่อน']],
  post:[['nar','เงาตนสุดท้ายฮัมจบท่อน แล้วหันมามองผู้ถือตรา… เป็นครั้งแรกที่เงาบนขั้นบันไดมองใครสักคนที่ไม่ใช่หลุม'],
   ['eda','(ยายเอดาร้องตามเบา ๆ จนครบทั้งห้าท่อน เสียงสั่น) …นี่คือท่อนที่แม่ของยายไม่เคยร้องให้ฟัง เพราะแม่ก็ไม่เคยได้ยิน']],rw:{g:80000}},
 {c:C5,g:'talk',k:'qn',p7qs:1,tx:'ขึ้นไปขอท่อนเพลงกล่อมของอัสตราจากราชินีเอลิรา (นครลอยฟ้า)',
  pre:[['qn','เพลงกล่อมของราชวงศ์? …ข้าไม่ได้ร้องมันตั้งแต่เสด็จแม่สิ้น'],
   ['qn','(ราชินีหลับตา แล้วร้องเบา ๆ) «นอนเถิดดาวน้อยบนบัลลังก์เมฆ ฟ้ากว้างเกินกว่าจะอยู่คนเดียว…»'],
   ['qn','ข้าเพิ่งเข้าใจวันนี้เอง ว่าท่อนนั้นไม่ได้ร้องให้เจ้าหญิง มันร้องให้เมืองที่ลอยอยู่สูงจนลืมว่าข้างล่างมีคนอยู่'],
   ['qn','หัวใจที่แบ่งให้อารัณยาทำให้อัสตราต่ำลง ข้าไม่เคยเสียใจ… ถ้าหัวใจดวงใหม่จะเกิดได้ ข้าจะพาคนของข้าลงไปร้องด้วยตัวเอง',0,0,0,1],
   ['qn','คำสาบานของเจ้าเป็นคำสาบานของอัสตราด้วย ข้าจะพาคณะนักร้องหลวงลงไปที่หลุมหัวใจ ทุกคนที่ร้องได้',0,0,0,2],
   ['qn','ข้าส่งนกพิราบหลวงไปบอกเรนน์ที่ค่ายแล้ว คนของเจ้าจะลงไปถึงก่อนรุ่งสาง… ไปเถอะ ผู้เชื่อมสองฟ้า']],rw:{g:60000}},
 {c:C5,g:'hfg',k:'ves5',p7fd:1,tx:'จุดเตาหลอมหัวใจ ร้องเพลงกล่อมของสามเมือง (เล่นเดี่ยวได้ · ปาร์ตี้ก็ได้)',
  pre:[['nar','รุ่งสาง… ขั้นบันไดแห่งการรอคอยไม่ได้มีแค่เงาอีกต่อไป ชาวค่ายผู้อพยพนั่งเรียงลงมาทางทิศตะวันออก คณะนักร้องหลวงของอัสตรายืนทางทิศตะวันตก'],
   ['cmd','ค่ายผู้อพยพมาครบทุกคนที่เดินไหว ที่เดินไม่ไหว เราก็แบกกันลงมา'],
   ['brom','(บรอมแบกลังเศษดาวมาวางข้างเตา) ค่าส่งของข้าคิดทีหลัง! …ล้อเล่น คราวนี้ไม่คิด',0,0,0,0,1],
   ['brom2','สหกรณ์คนงานคาร์นมาร้องด้วย! พวกเราไม่รู้เนื้อเพลงหรอก แต่ฮัมตามเก่งนะ',0,0,0,0,2],
   ['cel','ขวดแสงดาว เฟืองหัวใจนาฬิกา วางในช่องแล้ว… ช่องสุดท้ายรอเพลงอยู่'],
   ['ves','ข้ารู้สึกได้… บางอย่างใต้หลุมกำลังตื่น ความหิวที่ราชินีทิ้งไว้ในดาวทุกดวงที่นางกลืน มันไม่มีร่าง แต่มันจำกลิ่นไฟได้']],
  post:[['nar','ท่อนสุดท้ายของเพลงกล่อมจบลงพร้อมกันจากสามเมือง… และในเตาหลอม มีบางอย่างเต้นขึ้นหนึ่งครั้ง'],
   ['nar','หัวใจดวงใหม่ลอยขึ้นจากเปลวไฟ ไม่ใหญ่ไปกว่ากำปั้น แต่แสงของมันส่องถึงขั้นบันไดบนสุด เงานับพันลืมตาขึ้นพร้อมกัน']]},
 {c:C5,g:'talk',k:'ves5',p7e7:1,cine:1,tx:'หัวใจดวงใหม่เต้นแล้ว · ตัดสินใจว่ามันจะอยู่ที่ไหน',
  pre:[['ves','หัวใจดวงนี้ไม่ได้เป็นของอารัณยา ไม่ได้เป็นของอัสตรา… มันเกิดจากเพลงของทุกคน'],
   ['cel','ท่านโอเรียนใช้เวลาสี่สิบปีเย็บดาวดวงเดียวไม่สำเร็จ เพราะเขาพยายามทำคนเดียว… ข้าเพิ่งเข้าใจเมื่อกี้เอง'],
   ['qn','ข้าคิดว่าเราทุกคนรู้ว่าคำถามสุดท้ายคืออะไร… และรู้ด้วยว่าใครควรเป็นคนตอบ'],
   ['ves','อารัณยารอมาสามร้อยปี… แต่ค่ายของเจ้าก็รอมาตลอดชีวิตของทุกคนในนั้นเหมือนกัน'],
   ['cmd','ผู้นำ ไม่ว่าเจ้าจะเลือกทางไหน ค่ายผู้อพยพจะไม่เสียใจ เราเรียนรู้มาตลอดว่าบ้านคือที่ที่คนอยู่ด้วยกัน']],
  post:[['nar','🔥 หัวใจดวงใหม่ได้บ้านของมันแล้ว']],rw:{g:300000,s3:15}},
 {c:C5,g:'talk',k:'eda5',p7c5:1,tx:'คุยกับยายเอดา · ร้องเพลงกล่อมให้จบทั้งเพลง',
  pre:[['eda','ยายร้องเพลงนี้มาทั้งชีวิตลูก… ร้องให้คนที่ไม่กลับมา ร้องให้บ้านที่ยายไม่เคยเห็น'],
   ['eda','อารัณยาได้บ้านคืนแล้ว… ท่านเวสเปอร์หลับสนิทตั้งแต่เมื่อคืน ยายไม่เคยเห็นท่านนอนเลยสักครั้ง',0,0,0,0,0,1],
   ['eda','ยายจะย้ายขึ้นไปอยู่นครลี้ภัยกับเด็ก ๆ… ตอนกลางคืน หัวใจดวงนั้นส่องถึงเต็นท์ของยายเลยนะ',0,0,0,0,0,2],
   ['eda','วันนี้เป็นวันแรกที่ยายร้องจบแล้วไม่ต้องรอใคร'],
   ['til','ท่านผู้นำ! ข้าจะเป็นช่างนาฬิกาเหมือนท่านเวสเปอร์ แล้วข้าจะสร้างนาฬิกาที่นับวันที่ทุกคนได้อยู่ด้วยกัน!'],
   ['cel','(เซเลสต์ม้วนแผนที่ดาวเก็บ) ข้าจะกลับไปหอดูดาวของท่านโอเรียน มีดาวอีกมากที่ร่วงอยู่ทั่วแผ่นดิน… และคราวนี้ข้ารู้แล้วว่าจะเย็บมันยังไง'],
   ['cel','ถ้าเห็นดาวตกเมื่อไหร่ ส่งข่าวมาหาข้าด้วยนะ… ผู้เก็บดาวร่วง'],
   ['me','(เสียงเพลงกล่อมของสามเมืองยังก้องอยู่ในอก)']],
  post:[['nar','🌟 — จบภาค 7 · ผู้เก็บดาวร่วง — ขอบคุณที่ร้องเพลงกล่อมจนจบทั้งเพลง']],rw:{g:200000,s3:15,rbs:1}})}
setTimeout(()=>{
  try{const _hb=hpBuild;window.hpBuild=hpBuild=function(M){_hb(M);try{for(let i=trees.length-1;i>=0;i--){const t=trees[i];if(!t.inv&&t.k&&HFB.some(([x,y])=>Math.hypot(t.x-x,t.y-y)<120))trees.splice(i,1)}
      HPN.dec=HPN.dec.filter(d=>!HFB.some(([x,y])=>Math.hypot(d.x-x,d.y-y)<120));HFB.forEach(([x,y],i)=>trees.push({x,y:y-4,r:0,k:'htb',v:i,ht:130,ns:1,nc:1}));trees.push({x:1490,y:1400,r:0,k:'hcel7',ht:90,ns:1,nc:1})}catch(e){}}}catch(e){}
  Object.assign(PALK,{htb(t,T){if(!gP7h())return;const x=t.x,y=t.y,q=me.sty,rung=p6Past('p7tb')||(((q&&q.p7tb)|0)>>t.v&1);PALSH(x,y+4,34,9,.4);
      g.lineCap='round';g.strokeStyle='#3a2410';g.lineWidth=7;g.beginPath();g.moveTo(x-24,y);g.lineTo(x-20,y-98);g.moveTo(x+24,y);g.lineTo(x+20,y-98);g.moveTo(x-30,y-98);g.lineTo(x+30,y-98);g.stroke();g.strokeStyle='#b07a3a';g.lineWidth=2;g.stroke();
      g.save();g.translate(x,y-94);g.rotate(rung?Math.sin(T*2+t.v)*.07:0);const bg=g.createLinearGradient(-22,0,22,0);bg.addColorStop(0,'#5a3414');bg.addColorStop(.45,rung?'#f0c878':'#a8743a');bg.addColorStop(1,'#4a2a10');g.fillStyle=bg;
      g.beginPath();g.moveTo(-7,0);g.quadraticCurveTo(-10,14,-14,28);g.quadraticCurveTo(-20,40,-24,46);g.lineTo(24,46);g.quadraticCurveTo(20,40,14,28);g.quadraticCurveTo(10,14,7,0);g.closePath();g.fill();g.strokeStyle='#2a1408';g.lineWidth=1.4;g.stroke();
      g.strokeStyle=rung?'#fff0c0':'#d8a050';g.lineWidth=1.3;g.beginPath();g.moveTo(-17,33);g.quadraticCurveTo(0,38,17,33);g.stroke();g.fillStyle='#3a2410';g.beginPath();g.arc(0,49,4,0,7);g.fill();g.restore();
      if(rung){g.save();g.globalCompositeOperation='lighter';glowAt(x,y-70,42,'255,210,140',.3+.1*Math.sin(T*2+t.v));g.restore()}},
    hcel7(t,T){if(!gP7h()||p6Past('p7c5'))return;celD(t.x,t.y,T,1)}});
  try{const _ht=hpTick;window.hpTick=hpTick=function(dt,now,x,y,mv){const r=_ht(dt,now,x,y,mv);try{hfTick(dt,now,x,y)}catch(e){}return r}}catch(e){}
  try{const _hg=hpGroundFx;window.hpGroundFx=hpGroundFx=function(){const r=_hg();try{hfGround()}catch(e){}return r}}catch(e){}
  try{const _q=arAqT;window.arAqT=arAqT=function(st){if(st.p7tb||st.p7ss)return hfAqT(st);return _q(st)}}catch(e){}
  try{BTR[37]='200,110,255';GLOWC[37]='255,170,230';FXST[37]='void';BTC[37]=['#ffe0f0','#8a5ad0','#ffffff'];WRG[37]={1:{rg:230,cd:1.9,spd:300,dm:.8,k:'star',c:'255,170,230'},2:{rg:280,cd:3,spd:240,dm:1.6,k:'starb',c:'220,150,255',big:1}};DGTH[24]='pit'}catch(e){}
  try{SDIT.push([5,'🔥 ประกายเตาหลอม',70,'เปลวไฟสามสีของเตาหลอมหัวใจลอยวนรอบตัว',()=>p6Past('p7c5')]);const _sa=sdAura;window.sdAura=sdAura=function(x,y,k){if(k===5)return hfAura(x,y);return _sa(x,y,k)}}catch(e){}
  try{const _dm=dgMap;window.dgMap=dgMap=function(id){if(id>=85000&&id<86000)return hfgMap(id);return _dm(id)}}catch(e){}
  try{const _ds=dgStart;window.dgStart=dgStart=function(){if(HFGI())return hfgStart();return _ds()}}catch(e){}
  try{const _sm=dgSim;window.dgSim=dgSim=function(dt){if(HFGI())return hfgSim(dt);return _sm(dt)}}catch(e){}
  try{const _dr=dgReward;window.dgReward=dgReward=function(){if(HFGI()){try{rnShard(3)}catch(e){}try{if(!dg.rbr){dg.rbr=1;rbRoll('บอสดันเจี้ยนเนื้อเรื่อง',.35)}}catch(e){}return hfgReward()}return _dr()}}catch(e){}
  try{const _de=dgEnd;window.dgEnd=dgEnd=function(win,why){const was=dg.ph,E=HFGI();_de(win,why);if(E&&!win&&was!=='fail'&&was!=='win')setTimeout(()=>{if(HFGI()){enterMap(33,hfgBack());sysMsg('🔥 เปลวไฟมอดลง… คุยกับเวสเปอร์เพื่อจุดเตาใหม่')}},4500)}}catch(e){}
  try{const _dt=dgStatusText;window.dgStatusText=dgStatusText=function(){if(HFGI())return dg.ph==='run'?'🔥 เตาหลอม '+Math.ceil(HF.hp)+'% · 🎶 เพลง '+Math.floor(HF.S)+'% · ⏱ '+fmtT(dg.tl):dg.ph==='boss'?'🌑 ความหิวของดาว · เตาหลอม '+Math.ceil(HF.hp)+'% · ⏱ '+fmtT(dg.tl):dg.ph==='win'?'🔥 หัวใจดวงใหม่เต้นแล้ว!':dg.ph==='fail'?'❌ '+(dg.why||'ล้มเหลว'):'🔥 เตาหลอมหัวใจ · กด "เริ่ม" เมื่อพร้อม';return _dt()}}catch(e){}
  try{const _dl=dgLeave;window.dgLeave=dgLeave=function(){if(HFGI()){ov.hidden=true;sfx('gate');enterMap(33,hfgBack());return}return _dl()}}catch(e){}
  try{const _hf=handleFx;window.handleFx=handleFx=function(o){if(hfgFx(o))return;return _hf.apply(this,arguments)}}catch(e){}
  try{const _dn=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){try{hfgDraw()}catch(e){}try{hfEndWorld()}catch(e){}_dn()}}catch(e){}
  try{const _px=plxScreen;window.plxScreen=plxScreen=function(){_px();try{hfgScreen()}catch(e){}try{hfEndScreen()}catch(e){}}}catch(e){}
  try{const _ir=instRepeat;window.instRepeat=instRepeat=function(k){if(k==='hfg')return instRepeatHfg();return _ir(k)}}catch(e){}
  try{const _sd=stDone;window.stDone=stDone=function(){const st=stCur(),q=me.sty;if(st&&st.p7e7&&q&&!q.e7){q.a=2;setTimeout(()=>{stSay([['me','(หัวใจดวงใหม่เต้นอยู่ในมือ… บ้านของมันควรอยู่ที่ไหน?)']],()=>{},{cine:1,choice:[['🏛️ คืนหัวใจให้อารัณยา · ให้เวสเปอร์ได้พัก',1],['🏕️ ปลูกหัวใจที่ค่ายผู้อพยพ · สร้าง «นครลี้ภัย»',2]]});
      SD.onChoose=e=>{q.e7=e;stClose();setTimeout(()=>stSay(STEND8[e],()=>{_sd();setTimeout(()=>{banner={s:e===1?'🏛️ อารัณยาลอยคืนฟ้า · เวสเปอร์ได้พักแล้ว':'🏕️ นครลี้ภัย · หัวใจดวงใหม่เต้นกลางค่าย',t:6};try{stFlash()}catch(_){}},600)},{cine:1}),250)}},200);return}
    if(st&&st.p7c5)setTimeout(()=>sdGive(25,'ของขวัญจากสามเมือง'),400);return _sd()}}catch(e){}},0);
