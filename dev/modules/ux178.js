/* ---------- v604 พื้นรอบของภาพ ChatGPT (GPA) ให้เข้าชุด — 8 แมพ: หอดูดาว 36 · วัง 27 · สะพาน 30 · อารัณยา 32 · หลุมหัวใจ 33 · ที่ราบดาวตก 34 · ปากเหว 43 · สุสานเรือ 39 ----------
   วาดเพิ่มในแผ่นพื้นแคช (ครั้งเดียวต่อแผ่น · ไม่เพิ่มงานต่อเฟรม) · ใช้ตำแหน่งของจริงจาก trees · สีตามโทนของแต่ละแมพ
   ต้นไม้/พุ่ม = ใบไม้ร่วง + หญ้า + รากแผ่ · หิน = เศษหินขอบเข้ม · อุกกาบาต = หลุมไหม้ + รอยแตก + ถ่านแดง · ไฟ/ตะเกียง = วงแสงบนพื้น (เฉพาะแมพมืด: วัง อารัณยา หลุมหัวใจ ดาวตก สุสานเรือ — แมพพื้นสว่างจะจ้าเกิน)
   ค่าย (เต็นท์/ลัง/ถัง/โต๊ะ) = ลานดิน + ฟาง · คริสตัล/ดอกไม้ = เศษคริสตัลเรือง/กลีบ · สิ่งปลูกสร้าง = เงานุ่มใต้ฐาน + หินปูรอบ
   ในวัง (27) ใช้แค่เงานุ่ม + วงแสง (พื้นขัดเงา ไม่ใส่ฟาง/ใบไม้) · ปิด: GPG.off=1 แล้ว PALC.m.clear() */
const GPG={off:0,maps:{36:1,27:1,30:1,32:1,33:1,34:1,43:1,39:1},dark:{27:1,32:1,33:1,34:1,39:1},
  /* โทนสีต่อแมพ: [หิน x3, ขอบ, ใบไม้ x2, ดิน] */
  pal:{36:[['#8e98a8','#a6b0bf','#7a8494'],'#26303e',['#3e6a4a','#557a5a'],'rgba(120,130,150,.35)'],27:[['#c8bfae','#b8ae9a','#d6cdbb'],'#4a3e2e',['#5a7a40','#6a8a48'],'rgba(0,0,0,0)'],
    30:[['#c8b08a','#b89c74','#d6c29c'],'#4a3420',['#6a8a3a','#7a9a44'],'rgba(160,120,70,.35)'],32:[['#bcc0c8','#a8adb8','#cdd0d6'],'#3a3e4a',['#6a8a5a','#7a9a6a'],'rgba(140,140,160,.3)'],
    33:[['#7a6450','#8a7058','#6a5644'],'#2a1a10',['#5a6a3a','#6a7a44'],'rgba(90,60,40,.4)'],34:[['#8a8098','#9a90a8','#766c86'],'#2a2236',['#5a7a4a','#6a8a56'],'rgba(110,90,130,.3)'],
    43:[['#8e8a80','#a09a8e','#7c786e'],'#2e2a22',['#6a8a34','#7a9a3e'],'rgba(130,100,60,.38)'],39:[['#9aa0ac','#aab0bc','#888e9a'],'#2c303a',['#6a7a5a','#7a8a6a'],'rgba(100,90,80,.3)']},
  cat:{tree:'obpine paoak paltree sfgt',bush:'pabush obbush',rock:'obrock parock sgstone u22menh sfdeb obcairn',met:'sfmet u22met',
    light:'oblamp blamp palamp sglamp cand braz bfire',camp:'btent patent sftent bcart pacrate pasack phbarrel phrope obbox sftab bscope sftel obinst',
    cry:'obcry sfcry obprism',flora:'sfflw u22lily',struct:'obdome barch bpyl orr ahouse abook hgear hbellf abell ashr aroot paroot sgmast sgboat obstat dawn globe tel rack mirf pot stump tban bban paflag sfban pagfen'}};
/* แมพพื้นสว่าง: ลดแสงเรือง (โหมด lighter บนพื้นสีอ่อนจะขาวจ้า) */
GPA.dim={30:.35,36:.45,43:.6};
/* ของที่วาดเพิ่มทับภาพใหม่ (ภาพเวกเตอร์เดิมวาดรวมไว้ในชิ้นเดียวกัน) — กองไฟสะพาน: ผู้ลี้ภัย 3 คนนั่งล้อมวงเหมือนเดิม */
GPA.post={bfire(t,T,x,y){for(const[dx,dy,c,f]of[[-34,6,'#7a4a3a',1],[34,6,'#3a5a7a',-1],[0,-18,'#6a6a3a',1]])campFolk(t.x+dx,t.y+dy,{c,hair:'#3a2414',f,k:dx,sit:1,s:1.1},T)}};
GPG.k={};for(const c in GPG.cat)for(const k of GPG.cat[c].split(' '))GPG.k[k]=c;
GPG.lc={oblamp:'255,200,120',blamp:'255,230,160',palamp:'255,190,100',sglamp:'120,210,255',cand:'255,200,120',braz:'120,170,255',bfire:'255,150,60'};
function gpgOn(){try{return !GPG.off&&!GPA.off&&GPG.maps[curMap]&&HDI.on&&!lqHD()}catch(e){return false}}
function gpgPeb(c,x,y,s,r,P){c.fillStyle='rgba(10,8,6,.4)';c.beginPath();c.ellipse(x+.8,y+1.5,s*1.2,s*.7,0,0,7);c.fill();c.fillStyle=P[0][(r()*3)|0];c.beginPath();c.ellipse(x,y,s*1.2,s*.7,(r()-.5)*.6,0,7);c.fill();c.strokeStyle=P[1];c.lineWidth=.9;c.stroke();
  c.fillStyle='rgba(255,255,255,.18)';c.beginPath();c.ellipse(x-s*.3,y-s*.25,s*.5,s*.22,0,0,7);c.fill()}
function gpgTuft(c,x,y,s,r,P){c.save();c.lineCap='round';for(let i=0;i<6;i++){const a=-1.57+(r()-.5)*1.6,L=(5+r()*6)*s;c.strokeStyle=P[2][i&1];c.lineWidth=1.3;c.beginPath();c.moveTo(x+(r()-.5)*5,y);c.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);c.stroke()}c.restore()}
function gpgLeaf(c,x,y,r,P){c.save();c.translate(x,y);c.rotate(r()*6.28);c.fillStyle=P[2][(r()*2)|0];c.beginPath();c.ellipse(0,0,3.4,1.6,0,0,7);c.fill();c.strokeStyle='rgba(20,30,10,.5)';c.lineWidth=.6;c.stroke();c.restore()}
function gpgPool(c,x,y,R,col,a){const gr=c.createRadialGradient(x,y,2,x,y,R);gr.addColorStop(0,'rgba('+col+','+a+')');gr.addColorStop(1,'rgba('+col+',0)');c.fillStyle=gr;c.beginPath();c.ellipse(x,y,R,R*.5,0,0,7);c.fill()}
function gpgAO(c,x,y,rx,ry,a){const gr=c.createRadialGradient(x,y,1,x,y,rx);gr.addColorStop(0,'rgba(10,8,6,'+a+')');gr.addColorStop(1,'rgba(10,8,6,0)');c.save();c.translate(x,y);c.scale(1,ry/rx);c.translate(-x,-y);c.fillStyle=gr;c.beginPath();c.arc(x,y,rx,0,7);c.fill();c.restore()}
function gpgPaint(c,ox,oy,S){const mp=curMap,P=GPG.pal[mp],X1=ox+S,Y1=oy+S,inside=mp===27;
  for(const t of trees){const cat=t.k&&GPG.k[t.k],q=cat&&GPA.k[t.k];if(!q||q[0]!==mp||t.inv)continue;const w=(typeof gpaW==='function'?gpaW(t.k,t):q[1]),m=w*.9+30;
    if(t.x+m<ox||t.x-m>X1||t.y+m<oy||t.y-m>Y1)continue;const r=gxRng(((t.x*7+t.y*13)|0)+mp),x=t.x,y=t.y+q[2];
    if(cat==='light'){if(GPG.dark[mp])gpgPool(c,x,y+2,Math.max(40,w*1.6),GPG.lc[t.k]||'255,200,120',.2);continue}
    if(inside){gpgAO(c,x,y+2,w*.55,w*.18,.28);continue}
    if(cat==='tree'||cat==='bush'){const R0=w*(cat==='tree'?.5:.7);gpgAO(c,x,y+3,R0,R0*.32,.22);
      if(cat==='tree')for(let i=0;i<4;i++){const a=Math.PI*(.1+r()*.8),L=w*(.22+r()*.18);c.lineCap='round';for(const[lw,col]of[[4.4,P[1]],[2.6,'#6e4c30']]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(x+Math.cos(a)*w*.06,y);c.quadraticCurveTo(x+Math.cos(a)*L*.6,y+3,x+Math.cos(a)*L,y+Math.sin(a)*L*.25+2);c.stroke()}}
      for(let i=0;i<(cat==='tree'?14:6);i++){const a=r()*6.283,d=R0*(.3+r()*.9);gpgLeaf(c,x+Math.cos(a)*d,y+4+Math.sin(a)*d*.35,r,P)}
      for(let i=0;i<3;i++){const a=r()*6.283,d=R0*(.6+r()*.5);gpgTuft(c,x+Math.cos(a)*d,y+6+Math.sin(a)*d*.35,.9,r,P)}continue}
    if(cat==='rock'){for(let i=0;i<5;i++){const a=r()*6.283,d=w*(.45+r()*.4);gpgPeb(c,x+Math.cos(a)*d,y+3+Math.sin(a)*d*.35,1.5+r()*w*.05,r,P)}if(r()<.6)gpgTuft(c,x+(r()-.5)*w,y+6,.8,r,P);continue}
    if(cat==='met'){const R0=w*.75;const gr=c.createRadialGradient(x,y+2,2,x,y+2,R0);gr.addColorStop(0,'rgba(20,12,8,.55)');gr.addColorStop(.7,'rgba(40,24,14,.3)');gr.addColorStop(1,'rgba(40,24,14,0)');c.fillStyle=gr;c.beginPath();c.ellipse(x,y+2,R0,R0*.4,0,0,7);c.fill();
      c.strokeStyle='rgba(20,10,6,.6)';c.lineWidth=1.2;for(let i=0;i<6;i++){const a=r()*6.283;let px=x+Math.cos(a)*w*.3,py=y+2+Math.sin(a)*w*.12;c.beginPath();c.moveTo(px,py);for(let k=0;k<3;k++){px+=Math.cos(a+(r()-.5))*w*.14;py+=Math.sin(a+(r()-.5))*w*.06;c.lineTo(px,py)}c.stroke()}
      for(let i=0;i<7;i++){const a=r()*6.283,d=R0*(.5+r()*.5);c.fillStyle=t.k==='sfmet'?'rgba(140,220,255,.85)':'rgba(255,140,60,.85)';c.beginPath();c.arc(x+Math.cos(a)*d,y+2+Math.sin(a)*d*.4,1.1+r(),0,7);c.fill()}
      for(let i=0;i<4;i++){const a=r()*6.283,d=R0*(.8+r()*.4);gpgPeb(c,x+Math.cos(a)*d,y+2+Math.sin(a)*d*.4,1.6+r()*2.4,r,P)}continue}
    if(cat==='camp'){if(mp!==39){c.fillStyle=P[3];c.beginPath();c.ellipse(x,y+6,w*.6,w*.2,0,0,7);c.fill()}gpgAO(c,x,y+3,w*.5,w*.14,.25);if(typeof mkdStraw==='function')mkdStraw(c,x+(r()-.5)*w*.3,y+10,Math.round(6+w*.08),w*.8,r);continue}
    if(cat==='cry'||cat==='flora'){const col=cat==='cry'?'150,220,255':(t.k==='u22lily'?'255,235,170':'150,200,255');gpgPool(c,x,y+3,Math.max(24,w*1.1),col,.16);
      for(let i=0;i<(cat==='cry'?5:4);i++){const a=r()*6.283,d=w*(.5+r()*.6);if(cat==='cry'&&typeof kmgShard==='function')kmgShard(c,x+Math.cos(a)*d,y+4+Math.sin(a)*d*.35,1.4+r()*1.4,r);else{c.fillStyle='rgba('+col+',.85)';c.beginPath();c.ellipse(x+Math.cos(a)*d,y+4+Math.sin(a)*d*.35,2.2,1.1,r()*3,0,7);c.fill()}}continue}
    if(cat==='struct'){gpgAO(c,x,y+3,w*.55,w*.16,.3);const n=Math.min(10,Math.round(3+w*.04));for(let i=0;i<n;i++){const a=Math.PI*(.05+r()*.9),d=w*(.48+r()*.25);gpgPeb(c,x+Math.cos(a)*d,y+4+Math.sin(a)*d*.3,1.6+r()*2.6,r,P)}if(r()<.7)gpgTuft(c,x+(r()<.5?-1:1)*w*.45,y+7,.9,r,P)}}}
setTimeout(()=>{try{const _p=palPaint;window.palPaint=palPaint=function(c,ox,oy,S){const r=_p.apply(this,arguments);if(gpgOn())try{gpgPaint(c,ox,oy,S)}catch(e){console.warn('gpg',e)}return r}}catch(e){console.warn('gpg',e)}},1850);
