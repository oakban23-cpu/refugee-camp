/* ===== v518 ไอคอนไอเทมวาดใหม่ — เกราะ (3 แบบตามสายอาชีพ) · เครื่องประดับ · รองเท้า ตามระดับ 7 ขั้น + ชุดเซ็ต · วัตถุดิบ/ของใช้ 31 ชนิด
   วาดลงแคนวาส 96px ครั้งเดียวแล้วเก็บเป็น dataURL (แคชตามคีย์) · cellH / การ์ดแชร์ตัวละคร / ป้ายของดรอป เรียก itIcoH/itIcoImg
   วัตถุดิบ: MutationObserver บน #ov แทนอีโมจิใน .cell[data-gd] ที่รู้จัก · error → ใช้อีโมจิเดิม ===== */
const ITI={on:1,err:'',n:0,c:{}};
const ITO='#1a1420';
/* ระดับ: 0 Basic หนัง · 1 Refined เหล็ก · 2 Elite เงินกล้า · 3 Mystic ม่วงเวท · 4 Relic ทอง · 5 Ancient แดงชาด · 6 Cosmic ห้วงดาว */
const ITP=[
  {m:'#9a6a3e',l:'#d09a62',d:'#5a3a1e',t:'#6a4428',g:null,cl:'#7a5434'},
  {m:'#9aa2ae',l:'#dfe4ea',d:'#565e6a',t:'#7a5230',g:'#3ad06a',cl:'#2f9a4a'},
  {m:'#9cb6dc',l:'#f2f7ff',d:'#3e5688',t:'#2f64b8',g:'#3a8cff',cl:'#2a6fd0'},
  {m:'#7a5ab8',l:'#cdb0f4',d:'#352458',t:'#e2c66a',g:'#c070ff',cl:'#5a2a9a'},
  {m:'#dca83a',l:'#fff2a8',d:'#86560e',t:'#fff6d8',g:'#ff6a3a',cl:'#c84a14'},
  {m:'#8e1e2a',l:'#e2585c',d:'#3a0a12',t:'#e8b444',g:'#ff3b4a',cl:'#2a0a10'},
  {m:'#4a2c7e',l:'#ff9ad8',d:'#1e1238',t:'#ffd2f0',g:'#ff7ad9',cl:'#c03a9a'}];
function itHex(c){c=c.replace('#','');return[parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]}
function itMix(a,b,k){const A=itHex(a),B=itHex(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('')}
function itSetPal(id){const c=(typeof SETS!=='undefined'&&SETS[id]&&SETS[id].c)||'#ff7ad9';return{m:c,l:itMix(c,'#ffffff',.55),d:itMix(c,'#000000',.6),t:'#ffe08a',g:itMix(c,'#ffffff',.25),cl:itMix(c,'#000000',.35),set:id}}
/* ---------- ตัวช่วยวาด (ในพื้นที่ 64 หน่วย) ---------- */
function itPath(x,P){x.beginPath();x.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++){const p=P[i];if(p[0]==='q')x.quadraticCurveTo(p[1],p[2],p[3],p[4]);else if(p[0]==='c')x.bezierCurveTo(p[1],p[2],p[3],p[4],p[5],p[6]);else x.lineTo(p[0],p[1])}x.closePath()}
function itFill(x,P,c,lw,bb){itPath(x,P);if(Array.isArray(c)){const b=bb||[0,8,0,56],gr=x.createLinearGradient(b[0],b[1],b[2],b[3]);c.forEach((cc,i)=>gr.addColorStop(i/(c.length-1),cc));x.fillStyle=gr}else x.fillStyle=c;x.fill();if(lw!==0){x.lineWidth=lw||1.6;x.strokeStyle=ITO;x.stroke()}}
function itE(x,cx,cy,rx,ry,c,lw){x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);if(Array.isArray(c)){const gr=x.createRadialGradient(cx-rx*.35,cy-ry*.4,.5,cx,cy,Math.max(rx,ry));c.forEach((cc,i)=>gr.addColorStop(i/(c.length-1),cc));x.fillStyle=gr}else x.fillStyle=c;x.fill();if(lw!==0){x.lineWidth=lw||1.4;x.strokeStyle=ITO;x.stroke()}}
function itK(x,P,c,w){x.beginPath();x.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++){const p=P[i];if(p[0]==='q')x.quadraticCurveTo(p[1],p[2],p[3],p[4]);else x.lineTo(p[0],p[1])}x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';x.stroke()}
function itGlow(x,cx,cy,r,c,a){const[R,G,B]=itHex(c),gr=x.createRadialGradient(cx,cy,0,cx,cy,r);gr.addColorStop(0,'rgba('+R+','+G+','+B+','+a+')');gr.addColorStop(1,'rgba('+R+','+G+','+B+',0)');x.fillStyle=gr;x.beginPath();x.arc(cx,cy,r,0,7);x.fill()}
function itStar(x,cx,cy,r,c){x.fillStyle=c;x.beginPath();for(let k=0;k<8;k++){const rr=k%2?r*.32:r,a=k*.785-1.571;x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.closePath();x.fill()}
function itGem(x,cx,cy,r,c,glow){if(!c)return;if(glow)itGlow(x,cx,cy,r*2.6,c,.55);itFill(x,[[cx,cy-r],[cx+r*.86,cy-r*.2],[cx+r*.5,cy+r],[cx-r*.5,cy+r],[cx-r*.86,cy-r*.2]],[itMix(c,'#ffffff',.6),c,itMix(c,'#000000',.45)],1.1,[0,cy-r,0,cy+r]);x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.moveTo(cx-r*.3,cy-r*.55);x.lineTo(cx+r*.1,cy-r*.65);x.lineTo(cx-r*.15,cy-r*.1);x.closePath();x.fill()}
function itRivets(x,L,c){for(const[a,b]of L){x.fillStyle=c||'#e8ecf0';x.beginPath();x.arc(a,b,1.1,0,7);x.fill();x.strokeStyle=ITO;x.lineWidth=.6;x.stroke()}}
function itSparkle(x,T,n){const S=[[10,12],[54,14],[52,50],[12,48],[32,6],[58,32]];for(let i=0;i<(n||4);i++){const[a,b]=S[i];itGlow(x,a,b,5,T>=6?'#ff9ad8':'#fff2a8',.7);itStar(x,a,b,3.2,'#ffffff')}}
function itFinish(x,T,P,up){up=up|0;if(T>=6)for(const[a,b]of[[14,20],[48,40],[22,50],[44,16]]){x.fillStyle='rgba(255,230,250,.9)';x.beginPath();x.arc(a,b,.8,0,7);x.fill()}if(up)itSparkle(x,T,up>=3?6:up>=2?5:3)}
/* ---------- เกราะ ---------- */
function itArmorHeavy(x,T,P){const{m,l,d,t,g}=P;
  if(T===0&&!P.set){/* เสื้อหนังเก่า */itFill(x,[[18,12],[25,9],['q',32,15,39,9],[46,12],[52,20],[48,26],[46,24],[46,52],['q',32,56,18,52],[18,24],[16,26],[12,20]],[l,m,d]);
    itK(x,[[32,15],[32,52]],d,1.2);for(let k=0;k<4;k++){itK(x,[[29.5,20+k*7],[34.5,23+k*7]],'#e8d0a0',.9);itK(x,[[34.5,20+k*7],[29.5,23+k*7]],'#e8d0a0',.9)}
    itFill(x,[[18,40],[46,40],[46,45],[18,45]],'#5a3a1e',1.2);itFill(x,[[30,39.5],[34,39.5],[34,45.5],[30,45.5]],'#c8a050',.8);
    x.setLineDash([1.6,1.4]);itK(x,[[20,24],['q',19,38,21,50]],'rgba(255,230,190,.55)',.7);itK(x,[[44,24],['q',45,38,43,50]],'rgba(255,230,190,.55)',.7);x.setLineDash([]);
    itFill(x,[[38,28],[44,27],[44,33],[38,34]],'#7a5434',.9);return}
  /* แผงอก + ท้อง */
  itFill(x,[[19,14],[26,11],['q',32,17,38,11],[45,14],[47,30],['q',47,42,42,46],[22,46],['q',17,42,17,30]],[l,m,d]);
  itK(x,[[32,17],[32,45]],d,1.4);itK(x,[[23,16],['q',22,28,24,40]],'rgba(255,255,255,.55)',1.6);
  for(let k=0;k<2;k++)itK(x,[[20,32+k*6],['q',32,35+k*6,44,32+k*6]],d,1);
  /* กระโปรงเกราะ 3 แผ่น */
  for(let k=0;k<3;k++){const y0=44+k*4.2;itFill(x,[[20+k*.6,y0],[44-k*.6,y0],[43-k*.6,y0+5],['q',32,y0+7,21+k*.6,y0+5]],[l,m,d],1.1,[0,y0,0,y0+7])}
  /* ผ้าห้อยหน้า สีตามระดับ */itFill(x,[[28,43],[36,43],[36,57],[32,60],[28,57]],[itMix(P.cl,'#ffffff',.25),P.cl,itMix(P.cl,'#000000',.35)],1.2,[0,43,0,60]);itK(x,[[28.8,45],[35.2,45]],T>=4||P.set?t:'rgba(255,255,255,.5)',1)
  /* บ่าเกราะ */
  for(const s of[-1,1]){const cx=32+s*17;itFill(x,[[cx-s*8,13],['q',cx+s*2,6,cx+s*11,13],['q',cx+s*13,22,cx+s*8,27],['q',cx,26,cx-s*6,22]],[l,m,d],1.5,[0,6,0,27]);itK(x,[[cx-s*4,13],['q',cx+s*5,10,cx+s*9,16]],'rgba(255,255,255,.6)',1.2);
    if(T>=5||P.set===2)for(let k=0;k<3;k++){const bx=cx+s*(2+k*3.4),by=10+k*1.4;itFill(x,[[bx-1.6,by+2],[bx+s*1.2,by-5],[bx+1.6,by+2]],[t,itMix(t,'#000000',.4)],.9)}}
  itRivets(x,[[22,18],[42,18],[22,40],[42,40]],T>=4?t:'#e8ecf0');
  if(T>=4){itK(x,[[20,15],['q',32,20,44,15]],t,1.4);itK(x,[[22,44.5],[42,44.5]],t,1.2)}
  if(T>=2||P.set)itGem(x,32,28,T>=4?4.6:3.8,P.set?P.g:g,T>=3||!!P.set);
  if(T>=3){x.globalAlpha=.75;itK(x,[[26,24],['q',29,30,26,36]],t,.8);itK(x,[[38,24],['q',35,30,38,36]],t,.8);x.globalAlpha=1}}
function itArmorLight(x,T,P){const{m,l,d,t,g}=P,base=T===0&&!P.set;
  /* ฮู้ด/ปกสูง */
  itFill(x,[[21,10],['q',32,4,43,10],[45,18],['q',32,22,19,18]],[itMix(m,'#000000',.25),d],1.4,[0,4,0,22]);
  itFill(x,[[19,15],[27,12],['q',32,18,37,12],[45,15],[50,22],[47,28],[46,26],[47,50],['q',32,55,17,50],[18,26],[17,28],[14,22]],base?[l,m,d]:[l,m,d]);
  /* สายคาดไขว้ + หัวเข็มขัด */
  itK(x,[[22,15],[42,44]],base?'#4a2e18':d,3.4);itK(x,[[22,15],[42,44]],base?'#8a5a32':P.cl,2);if(!base)itK(x,[[22,15],[42,44]],'rgba(255,255,255,.35)',.6);
  itFill(x,[[18,40],[46,40],[46,45],[18,45]],base?'#4a2e18':itMix(d,'#000000',.2),1.1);itFill(x,[[29.5,39.6],[34.5,39.6],[34.5,45.4],[29.5,45.4]],T>=4?t:'#c8a050',.8);
  /* ซองมีดเล็ก/กระเป๋า */
  itFill(x,[[38,45],[44,45],[43,52],[39,52]],base?'#6a4428':d,.9);
  for(let k=0;k<3;k++)itK(x,[[20,22+k*5.4],['q',24,23+k*5.4,26,22+k*5.4]],'rgba(255,255,255,.35)',.8);
  if(!base){itRivets(x,[[21,30],[21,36],[43,30],[43,36]],T>=4?t:'#d8dce4');for(let r=0;r<3;r++)for(let c2=0;c2<3;c2++)itE(x,24+c2*3.6+(r%2)*1.8,25+r*4,1.2,1.2,itMix(m,'#ffffff',.25),.4)}
  if(T>=2||P.set)itGem(x,32,9.6,3.2,P.set?P.g:g,T>=3||!!P.set);
  if(T>=4)itK(x,[[19,15.4],['q',32,21,45,15.4]],t,1.2)}
function itArmorRobe(x,T,P){const{m,l,d,t,g}=P,base=T===0&&!P.set;
  /* แขนเสื้อกว้าง */
  for(const s of[-1,1]){const cx=32+s*17;itFill(x,[[cx-s*4,13],['q',cx+s*10,14,cx+s*14,34],[cx+s*7,40],['q',cx+s*2,28,cx-s*2,24]],[l,m,d],1.4,[0,13,0,40]);itK(x,[[cx+s*8,37],[cx+s*13.4,32.6]],base?'#d8c8a0':t,1.4)}
  /* ตัวเสื้อคลุมยาว */
  itFill(x,[[22,12],[27,10],['q',32,16,37,10],[42,12],[45,30],[49,56],['q',32,60,15,56],[19,30]],[l,m,d]);
  /* แถบกลาง + คอปก */
  itFill(x,[[29,16],[35,16],[37,57.6],[27,57.6]],base?['#e8dcc0','#bfae88']:[itMix(l,'#ffffff',.4),l],1);
  itFill(x,[[24,11],[32,22],[40,11],[37,10],[32,17],[27,10]],base?'#d8c8a0':t,1.1);
  if(!base){x.strokeStyle=t;x.lineWidth=1.1;x.beginPath();x.moveTo(17,55);x.quadraticCurveTo(32,59.5,47,55);x.stroke();for(let k=0;k<5;k++){const xx=22+k*5;itStar(x,xx,52.6+Math.abs(k-2)*.4,1.5,itMix(t,'#ffffff',.3))}}
  /* ผ้าคาดเอว */
  itFill(x,[[20,32],[44,32],[44.6,37],[19.4,37]],base?'#6a4428':[itMix(P.cl,'#ffffff',.2),P.cl],1.1,[0,32,0,37]);itFill(x,[[30,31.4],[34,31.4],[34,37.6],[30,37.6]],T>=4?t:'#c8a050',.8);
  itK(x,[[33,37],['q',35,43,33,48]],base?'#6a4428':P.cl,2.4);
  if(T>=2||P.set)itGem(x,32,24,3.4,P.set?P.g:g,T>=3||!!P.set);
  itK(x,[[23,16],['q',21,30,20,50]],'rgba(255,255,255,.4)',1.4)}
/* ---------- เครื่องประดับ ---------- */
function itAcc(x,T,P){const{m,l,d,t,g}=P;
  if(P.set){/* แหวนเซ็ต: ห่วงทอง + อัญมณีสีชุด */itGlow(x,32,30,22,P.m,.35);x.lineWidth=7;x.strokeStyle=ITO;x.beginPath();x.ellipse(32,38,14,12,0,0,7);x.stroke();x.lineWidth=4.6;const gr=x.createLinearGradient(18,26,46,50);gr.addColorStop(0,'#fff2a8');gr.addColorStop(.5,'#d8a838');gr.addColorStop(1,'#8a5a10');x.strokeStyle=gr;x.stroke();
    itFill(x,[[24,26],[40,26],[36,20],[28,20]],['#fff2a8','#b07a1e'],1.1);itGem(x,32,18,7,P.m,true);if(P.set===1)for(const s of[-1,1])itE(x,32+s*9,21,2.4,2.4,['#ffffff','#d8e8f0','#9ab0c0'],.8);return}
  if(T===0){/* แหวนทองเหลือง */x.lineWidth=7;x.strokeStyle=ITO;x.beginPath();x.ellipse(32,36,14,12,0,0,7);x.stroke();x.lineWidth=4.8;const gr=x.createLinearGradient(18,24,46,48);gr.addColorStop(0,'#f0d080');gr.addColorStop(.5,'#b88a3a');gr.addColorStop(1,'#6a4a18');x.strokeStyle=gr;x.stroke();itFill(x,[[27,22],[37,22],[35,26],[29,26]],['#e8c870','#8a6a2a'],1);itK(x,[[22,30],['q',24,26,28,25]],'rgba(255,255,255,.7)',1.4);return}
  if(T===1){/* สร้อยเงิน + จี้หยด */itK(x,[[12,8],['q',32,46,52,8]],ITO,4.2);itK(x,[[12,8],['q',32,46,52,8]],'#dfe4ea',2.4);for(let k=0;k<11;k++){const q=k/10,xx=12+40*q,yy=8+(1-Math.pow(2*q-1,2))*18.5;itE(x,xx,yy,1.5,1.5,'#ffffff',.5)}
    itGlow(x,32,42,14,'#3ad06a',.35);itFill(x,[[32,25],['q',44,40,32,56],['q',20,40,32,25]],['#ffffff','#a8b0bc','#5a626e'],1.5);itK(x,[[28,34],['q',26,40,28,46]],'rgba(255,255,255,.8)',1.4);itGem(x,32,43,5,g,true);return}
  if(T===2){/* เครื่องรางอักขระ */itK(x,[[16,8],['q',32,30,48,8]],ITO,2.6);itK(x,[[16,8],['q',32,30,48,8]],'#8a6a3a',1.2);itE(x,32,38,13,13,[l,m,d],1.6);itE(x,32,38,9,9,itMix(d,'#000000',.2),1);
    x.strokeStyle='#9ad8ff';x.lineWidth=1;for(let k=0;k<6;k++){const a=k*1.047;x.beginPath();x.moveTo(32+Math.cos(a)*10.6,38+Math.sin(a)*10.6);x.lineTo(32+Math.cos(a)*12,38+Math.sin(a)*12);x.stroke()}itGem(x,32,38,5,g,true);return}
  if(T===3){/* ยันต์เวท: ผลึกในกรอบปีก */itGlow(x,32,34,24,g,.35);for(const s of[-1,1])itFill(x,[[32+s*5,30],[32+s*22,20],[32+s*19,28],[32+s*24,30],[32+s*18,36],[32+s*21,40],[32+s*6,40]],[l,m,d],1.2);
    itFill(x,[[32,14],[40,32],[32,52],[24,32]],[itMix(g,'#ffffff',.5),g,itMix(g,'#000000',.5)],1.4);x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.moveTo(30,22);x.lineTo(34,24);x.lineTo(31,34);x.closePath();x.fill();itK(x,[[32,8],[32,14]],'#e2c66a',1.6);itE(x,32,7,2.4,2.4,'#e2c66a',.8);return}
  if(T===4){/* เหรียญตะวัน */itGlow(x,32,32,26,'#ffd060',.45);for(let k=0;k<12;k++){const a=k*.5236;itFill(x,[[32+Math.cos(a-.12)*14,32+Math.sin(a-.12)*14],[32+Math.cos(a)*24,32+Math.sin(a)*24],[32+Math.cos(a+.12)*14,32+Math.sin(a+.12)*14]],k%2?['#ffe680','#c88a1a']:['#fff4c0','#e0a828'],.8,[0,8,0,56])}
    itE(x,32,32,14,14,['#fff6c8','#e8b440','#9a6a10'],1.6);itE(x,32,32,9.6,9.6,'#c88a1a',.8);itGem(x,32,32,5.4,g,true);return}
  if(T===5){/* เครื่องรางตาแดงชาด */itGlow(x,32,34,24,'#ff3b4a',.4);itFill(x,[[32,10],[48,22],[50,40],[32,56],[14,40],[16,22]],['#4a1a20','#2a0a10'],1.6);itK(x,[[32,13],[46,23.6],[47.6,39],[32,53],[16.4,39],[18,23.6],[32,13]],'#e8b444',1.4);
    itE(x,32,33,11,6.4,'#f8e8d8',1.2);itE(x,32,33,5.4,5.4,['#ffb0a0','#ff3b4a','#6a0a14'],1);itE(x,32,33,2.2,4.2,'#1a0408',0);x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(30,31,1.3,0,7);x.fill();
    for(const s of[-1,1])itFill(x,[[32+s*10,12],[32+s*14,4],[32+s*15,14]],['#e8b444','#8a5a10'],.9);return}
  /* T6 จี้ดาวห้วงจักรวาล */itGlow(x,32,32,28,'#ff7ad9',.45);x.save();x.translate(32,34);x.rotate(-.35);x.scale(1,.38);x.strokeStyle='rgba(255,200,240,.9)';x.lineWidth=2.4;x.beginPath();x.arc(0,0,22,0,7);x.stroke();x.restore();
  itK(x,[[20,6],['q',32,20,44,6]],'#ffd2f0',1.4);x.fillStyle='#ffd2f0';x.beginPath();for(let k=0;k<10;k++){const rr=k%2?7:17,a=k*.628-1.571;x.lineTo(32+Math.cos(a)*rr,34+Math.sin(a)*rr)}x.closePath();const gr=x.createRadialGradient(28,28,1,32,34,18);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,'#ff9ad8');gr.addColorStop(1,'#7a2ab0');x.fillStyle=gr;x.fill();x.strokeStyle=ITO;x.lineWidth=1.5;x.stroke();
  for(const[a,b,r]of[[12,16,2],[52,20,2.4],[50,50,1.8],[14,50,2]])itStar(x,a,b,r*1.6,'#ffffff')}
/* ---------- รองเท้า (คู่ หันขวา) ---------- */
function itBoot(x,ox,oy,T,P,back){const{m,l,d,t,g}=P,base=T===0&&!P.set,sc=back?.92:1;x.save();x.translate(ox,oy);x.scale(sc,sc);
  const sh=back?[itMix(m,'#000000',.25),itMix(d,'#000000',.2)]:[l,m,d];
  /* แข้ง */itFill(x,[[-7,-26],[7,-26],[8,-4],[-8,-4]],sh,1.5,[0,-26,0,-4]);
  /* เท้า */itFill(x,[[-8,-6],[8,-6],['q',18,-5,21,2],[21,6],[-9,6],[-9,0]],sh,1.5,[0,-6,0,6]);
  itFill(x,[[-9,4],[21,4],[21,7.4],[-9,7.4]],base?'#3a2414':itMix(d,'#000000',.35),1.1);
  /* ปากรองเท้า */itFill(x,[[-8.6,-29],[8.6,-29],[8,-24],[-8,-24]],base?'#c8a070':T>=4?[t,itMix(t,'#000000',.35)]:[itMix(P.cl,'#ffffff',.3),P.cl],1.2,[0,-29,0,-24]);
  if(base){for(let k=0;k<3;k++)itK(x,[[-4,-20+k*5],[4,-17+k*5]],'#e8d0a0',.9);itFill(x,[[-2,-10],[5,-10],[5,-7],[-2,-7]],'#7a5434',.7)}
  else{/* สนับแข้ง/แผ่นเกราะ */itFill(x,[[-5,-23],[5,-23],[6,-9],['q',0,-6,-6,-9]],[itMix(l,'#ffffff',.3),l,m],1,[0,-23,0,-6]);itK(x,[[0,-22],[0,-8]],d,.9);
    itFill(x,[[9,-4],['q',17,-3,20,2],[14,1],[9,0]],[itMix(l,'#ffffff',.3),m],1,[0,-4,0,2]);itRivets(x,[[-4,-14],[4,-14]],T>=4?t:'#e8ecf0');
    if(T>=3||P.set)itGem(x,0,-16,2.6,P.set?P.g:g,!back);
    if(T>=4){/* ปีกข้อเท้า */for(let k=0;k<3;k++)itFill(x,[[-8,-20+k*3],[-17-k*2.4,-26+k*1.4],[-14-k*1.8,-18+k*3.2]],[t,itMix(t,'#000000',.3)],.8)}
    if(T>=5||P.set===5)for(let k=0;k<2;k++)itFill(x,[[6,-20+k*7],[11,-22+k*7],[7.6,-16.6+k*7]],[t,itMix(t,'#000000',.4)],.7)}
  x.restore()}
function itBoots(x,T,P){itBoot(x,26,48,T,P,1);itBoot(x,35.5,56,T,P,0)}
/* ---------- สร้างไอคอนอุปกรณ์ ---------- */
const ITFAM={melee:'h',archer:'l',assn:'l',mage:'r',sup:'r'};
function itTier(it){return Math.max(0,Math.min(6,it?it.r|0:0))}
/* ลวดลายประจำชุดเซ็ต (วาดหลังตัวไอเทม) */
function itSetBack(x,id,P){const c=P.m,lc=P.l;x.save();
  if(id===1){/* ราชันห้วงลึก: คลื่น + ฟองอากาศ + ตรีศูล */x.globalAlpha=.9;for(const s of[-1,1]){itK(x,[[32+s*30,50],['q',32+s*24,40,32+s*18,48],['q',32+s*14,54,32+s*8,50]],itMix(c,'#000000',.2),3.4);itK(x,[[32+s*30,50],['q',32+s*24,40,32+s*18,48],['q',32+s*14,54,32+s*8,50]],lc,1.6)}
    for(const[a,b,r]of[[8,30,2.4],[12,20,1.6],[56,26,2],[52,16,1.4]]){x.strokeStyle=lc;x.lineWidth=1;x.beginPath();x.arc(a,b,r,0,7);x.stroke()}
    itK(x,[[32,2],[32,10]],lc,1.4);for(const s of[-1,0,1])itFill(x,[[32+s*4-1.2,4],[32+s*4,0],[32+s*4+1.2,4]],lc,0)}
  else if(id===2){/* ผู้พิทักษ์ห้วงลึก: โล่ใหญ่ด้านหลัง */itPath(x,[[32,1],[60,8],['q',60,40,32,63],['q',4,40,4,8]]);x.fillStyle=itMix(c,'#000000',.55);x.globalAlpha=.55;x.fill();x.globalAlpha=1;x.lineWidth=2;x.strokeStyle=lc;x.stroke();x.lineWidth=.8;x.strokeStyle=itMix(lc,'#ffffff',.4);itPath(x,[[32,5],[56,11],['q',56,38,32,58],['q',8,38,8,11]]);x.stroke()}
  else if(id===3){/* เทวทูตรุ่งอรุณ: ปีกขาวทอง */for(const s of[-1,1])for(let k=0;k<4;k++){const y0=16+k*7,L=24-k*4;itFill(x,[[32+s*12,y0+4],['q',32+s*(16+L*.6),y0-6-k,32+s*(14+L),y0-2],['q',32+s*(14+L*.7),y0+6,32+s*12,y0+8]],['#ffffff','#ffe8a0','#d8a030'],1,[0,y0-8,0,y0+8])}
    for(let k=0;k<8;k++){const a=-2.6+k*.3;itK(x,[[32+Math.cos(a)*24,30+Math.sin(a)*24],[32+Math.cos(a)*30,30+Math.sin(a)*30]],'rgba(255,230,140,.8)',1.4)}}
  else if(id===4){/* วิหคพายุ: วงลม + สายฟ้า */x.globalAlpha=.95;for(const[r,a0,a1]of[[27,-2.8,-1.2],[29,.2,1.6],[24,2,3]]){x.strokeStyle=lc;x.lineWidth=2;x.beginPath();x.arc(32,32,r,a0,a1);x.stroke();x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=.8;x.stroke()}
    itK(x,[[54,4],[48,14],[53,14],[46,24]],'#fff08a',2.2);itK(x,[[54,4],[48,14],[53,14],[46,24]],'#ffffff',.8);for(const s of[-1,1])itFill(x,[[32+s*18,52],[32+s*30,44],[32+s*26,54]],[lc,c],1)}
  else if(id===5){/* ผู้ทอเงา: ใยแมงมุม + ด้าย */x.strokeStyle=itMix(lc,'#ffffff',.3);x.lineWidth=.9;x.globalAlpha=.85;for(const[cx,cy,sx,sy]of[[2,2,1,1],[62,2,-1,1]]){for(let k=0;k<4;k++){const a=k*.52;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+sx*Math.cos(a)*24,cy+sy*Math.sin(a)*24);x.stroke()}for(const r of[8,14,20]){x.beginPath();for(let k=0;k<4;k++){const a=k*.52;x.lineTo(cx+sx*Math.cos(a)*r,cy+sy*Math.sin(a)*r)}x.stroke()}}
    itK(x,[[4,40],['q',14,52,8,62]],c,1.4);itK(x,[[60,40],['q',50,52,56,62]],c,1.4);itE(x,8,62,1.8,1.8,lc,0)}
  else{/* รากพิภพ: รากไม้ + ใบไม้ */for(const s of[-1,1]){itK(x,[[32+s*8,62],['q',32+s*24,58,32+s*26,40],['q',32+s*28,26,32+s*22,18]],'#5a3a1e',3.6);itK(x,[[32+s*8,62],['q',32+s*24,58,32+s*26,40],['q',32+s*28,26,32+s*22,18]],'#8a6a3a',1.6);
    for(const[k,ang]of[[0,-.6],[1,.4]]){const yy=28+k*16,xx=32+s*(26.6-k*.6);x.save();x.translate(xx,yy);x.rotate(s*(ang+.8));itFill(x,[[0,0],['q',5,-5,0,-11],['q',-5,-5,0,0]],['#b8f070','#4aa83a'],.9,[0,-11,0,0]);x.restore()}}}
  x.restore()}
function itUpLv(u){u=u|0;return u>=15?3:u>=10?2:u>=7?1:0}
const ITUPC=[null,'#ffe27a','#ffb030','#ff4a6a'];
function itEquipURL(sl,T,fam,setId,up,ghost){up=up|0;const key=[sl,T,fam,setId|0,up,ghost?1:0].join('|');if(ITI.c[key])return ITI.c[key];
  const mk=()=>{const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');x.scale(1.5,1.5);x.lineJoin='round';x.lineCap='round';return[c,x]};
  const[cv,x]=mk();const P=setId?itSetPal(setId):ITP[T];
  if(!ghost&&(T>=3||setId))itGlow(x,32,32,30,setId?P.m:ITP[T].g||'#ffffff',T>=5||setId?.42:.3);
  if(setId&&!ghost)itSetBack(x,setId,P);
  const[cv2,y]=up&&!ghost?mk():[cv,x];
  if(sl==='a'){(fam==='l'?itArmorLight:fam==='r'?itArmorRobe:itArmorHeavy)(y,T,P)}else if(sl==='c')itAcc(y,T,P);else if(sl==='w')itWeapon(y,T,P,fam);else if(sl==='h')itHelmIco(y,T,P,fam,setId);else itBoots(y,T,P);
  if(cv2!==cv){/* ขอบเรืองตีบวก +7 / +10 / +15 */const gc=ITUPC[up];x.save();x.setTransform(1,0,0,1,0,0);x.shadowColor=gc;x.shadowOffsetX=400;
    x.shadowBlur=up>=2?18:13;x.drawImage(cv2,-400,0);x.shadowBlur=5;x.drawImage(cv2,-400,0);if(up>=2){x.shadowBlur=26;x.drawImage(cv2,-400,0)}x.shadowColor='rgba(0,0,0,0)';x.shadowOffsetX=0;x.drawImage(cv2,0,0);x.restore()}
  if(!ghost)itFinish(x,setId?6:T,P,up);
  if(ghost){x.globalCompositeOperation='source-atop';x.fillStyle='rgba(160,150,140,.75)';x.fillRect(0,0,64,64)}
  ITI.n++;return ITI.c[key]=cv.toDataURL()}
function itIcoURL(it,sl,cls){sl=sl||(it&&it.sl);cls=cls||(typeof me!=='undefined'&&me&&me.cls);
  if(sl==='w'){if(!WPI.on||!CL[cls])return null;if(!it)return itEquipURL('w',0,cls+':0',0,0,1);return itEquipURL('w',itTier(it),cls+':'+wpStyle(it),it.ss|0,itUpLv(it.u),0)}
  if(sl==='h'){if(!HM.on)return null;if(!it)return itEquipURL('h',0,'h0',0,0,1);const st=it.ss?0:((hStyle(it)|0)%3);return itEquipURL('h',itTier(it),'h'+st,it.ss|0,itUpLv(it.u),0)}
  if(sl!=='a'&&sl!=='c'&&sl!=='b')return null;const fam=ITFAM[cls]||'h';if(!it)return itEquipURL(sl,0,fam,0,0,1);return itEquipURL(sl,itTier(it),fam,it.ss|0,itUpLv(it.u),0)}
/* HTML ไอคอนในช่องกระเป๋า/ช่องสวม (แทนนิพจน์เดิมใน cellH) */
function itIcoH(it,slot){const sl=slot||(it&&it.sl);
  if(ITI.on)try{const u=itIcoURL(it,sl);if(u)return'<img src="'+u+'" alt="" style="width:38px;height:38px;display:block;margin:auto;pointer-events:none'+(it?'':';opacity:.6')+'">'}catch(e){ITI.err=String(e&&e.stack||e).slice(0,300)}
  if(it&&it.sl==='w'&&CL[me.cls])return'<img src="'+weaponIcon(it)+'" alt="" style="width:36px;height:36px;display:block;margin:auto;pointer-events:none">';
  if(it&&it.sl==='h')return'<img src="'+helmIcon(it)+'" alt="" style="width:34px;height:34px;display:block;margin:auto;pointer-events:none">';
  return SI[slot||it.sl]}
/* ปุ่มสร้างชุดเซ็ต: ไอคอนสีชุด (เกราะ/เครื่องประดับ/รองเท้า) */
function itSetIco(id,sl){try{if(ITI.on&&sl==='h'&&HM.on){id=+id||1;return'<img src="'+itEquipURL('h',6,'h0',id,0,0)+'" alt="" style="width:26px;height:26px;vertical-align:middle;pointer-events:none">'}if(ITI.on&&sl==='w'&&WPI.on&&CL[me.cls]){id=+id||1;return'<img src="'+itEquipURL('w',6,me.cls+':'+(id===5?1:id===4?2:0),id,0,0)+'" alt="" style="width:26px;height:26px;vertical-align:middle;pointer-events:none">'}if(ITI.on&&(sl==='a'||sl==='c'||sl==='b')){const fam=ITFAM[typeof me!=='undefined'&&me&&me.cls]||'h';return'<img src="'+itEquipURL(sl,6,fam,+id||1,0,0)+'" alt="" style="width:26px;height:26px;vertical-align:middle;pointer-events:none">'}}catch(e){ITI.err=String(e&&e.stack||e).slice(0,300)}return SI[sl]}
/* ช่องว่างในการ์ดเลือกตัวละคร */
function itEmptyH(sl,cls){try{if(ITI.on){const u=itIcoURL(null,sl,cls);if(u)return'<img src="'+u+'" alt="">'}}catch(e){}return SI[sl]||''}
function itIcoImg(it,sl,px){sl=sl||(it&&it.sl);try{if(!it)return'';const u=ITI.on?(()=>{try{return itIcoURL(it,sl)}catch(e){ITI.err=String(e&&e.stack||e).slice(0,300);return null}})():null;if(u)return'<img src="'+u+'" alt=""'+(px?' style="width:'+px+'px;height:'+px+'px;vertical-align:middle"':'')+'>';
  if(sl==='w'&&CL[me.cls])return'<img src="'+weaponIcon(it)+'" alt=""'+(px?' style="width:'+px+'px;height:'+px+'px;vertical-align:middle"':'')+'>';if(sl==='h')return'<img src="'+helmIcon(it)+'" alt=""'+(px?' style="width:'+px+'px;height:'+px+'px;vertical-align:middle"':'')+'>';return''}catch(e){ITI.err=String(e&&e.stack||e).slice(0,300);return''}}

/* ---------- วัตถุดิบ / ของใช้ ---------- */
function itBottle(x,c,c2,rain){/* ขวดสีย้อมจุกไม้ */itFill(x,[[27,12],[37,12],[37,22],['q',50,28,48,44],['q',46,56,32,56],['q',18,56,16,44],['q',14,28,27,22]],['rgba(255,255,255,.9)','rgba(220,232,245,.75)'],1.6,[0,12,0,56]);
  x.save();itPath(x,[[17,34],['q',32,30,47,34],['q',48,54,32,54.6],['q',16,54,17,34]]);x.clip();if(rain){const cs=['#ff4a4a','#ffa030','#ffe040','#4ad06a','#3a8cff','#a050e0'];cs.forEach((cc,i)=>{x.fillStyle=cc;x.fillRect(14+i*6,28,6.2,30)})}else{const gr=x.createLinearGradient(0,30,0,56);gr.addColorStop(0,itMix(c,'#ffffff',.25));gr.addColorStop(1,c2||itMix(c,'#000000',.35));x.fillStyle=gr;x.fillRect(12,28,40,30)}x.restore();
  itPath(x,[[27,12],[37,12],[37,22],['q',50,28,48,44],['q',46,56,32,56],['q',18,56,16,44],['q',14,28,27,22]]);x.lineWidth=1.6;x.strokeStyle=ITO;x.stroke();
  itFill(x,[[26,6],[38,6],[37,13],[27,13]],['#c89a64','#7a5430'],1.2);itK(x,[[21,36],['q',20,44,23,50]],'rgba(255,255,255,.75)',2)}
function itCoin(x,c1,c2,mark){itE(x,32,33,20,20,[itMix(c1,'#ffffff',.45),c1,c2],1.8);itE(x,32,33,15,15,0,0);x.lineWidth=1.2;x.strokeStyle=itMix(c2,'#000000',.2);x.beginPath();x.arc(32,33,15,0,7);x.stroke();mark(x);itK(x,[[18,26],['q',22,17,30,14.6]],'rgba(255,255,255,.75)',1.8)}
function itFeather(x,c1,c2,c3){itFill(x,[[14,54],['q',18,30,40,12],['q',52,6,50,14],['q',46,34,20,52]],[c1,c2,c3],1.5,[50,8,14,54]);itK(x,[[14,56],['q',28,34,48,12]],itMix(c3,'#000000',.3),1.3);for(let k=0;k<6;k++){const q=k/6,xx=18+q*28,yy=50-q*36;itK(x,[[xx,yy],[xx+6-q*2,yy+1+q]],'rgba(255,255,255,.45)',.8);itK(x,[[xx,yy],[xx-1,yy-6+q*2]],'rgba(0,0,0,.18)',.8)}}
const MATI={
  ps:x=>{itGlow(x,32,32,26,'#9ad8ff',.45);itFill(x,[[32,6],[52,13],[50,34],['q',46,50,32,58],['q',18,50,14,34],[12,13]],['#d8dce4','#8e98a8','#4e5664'],1.8);itFill(x,[[32,12],[46,17],[44,33],['q',41,45,32,51],['q',23,45,20,33],[18,17]],['#6a7a92','#3e4a5e'],1);
    x.strokeStyle='#bfe8ff';x.lineWidth=2.4;x.beginPath();x.moveTo(32,18);x.lineTo(32,44);x.moveTo(23,28);x.lineTo(41,28);x.stroke();itGlow(x,32,28,10,'#bfe8ff',.6);itK(x,[[17,15],['q',16,30,20,40]],'rgba(255,255,255,.6)',1.6)},
  twc:x=>itCoin(x,'#c8d8f0','#4a6290',x=>{itFill(x,[[28,44],[28,26],[26,26],[26,22],[29,22],[29,24],[31,24],[31,20],[33,20],[33,24],[35,24],[35,22],[38,22],[38,26],[36,26],[36,44]],['#ffffff','#9ab4e0'],1);itFill(x,[[30.6,44],[30.6,38],['q',32,35.6,33.4,38],[33.4,44]],'#2a3a64',0);itE(x,32,30,1.4,1.4,'#ffe080',0)}),
  sc:x=>{itGlow(x,32,32,26,'#3ad8c8',.35);for(let r=0;r<3;r++)for(let c=0;c<3-(r===2?1:0);c++){const cx=20+c*12+(r%2)*6,cy=18+r*12;itFill(x,[[cx-7,cy-2],['q',cx,cy-10,cx+7,cy-2],['q',cx+7,cy+8,cx,cy+11],['q',cx-7,cy+8,cx-7,cy-2]],['#c8fff4','#3ab8b0','#1a5a68'],1.2,[0,cy-8,0,cy+11]);itK(x,[[cx-4,cy-1],['q',cx,cy-6,cx+4,cy-1]],'rgba(255,255,255,.7)',1)}},
  hr:x=>{itGlow(x,32,32,28,'#3a7aff',.5);for(const s of[-1,1])itK(x,[[32+s*8,46],['q',32+s*20,52,32+s*24,58]],'#1a3a7a',2.4);itFill(x,[[32,52],['q',10,38,14,22],['q',20,10,32,20],['q',44,10,50,22],['q',54,38,32,52]],['#9ad8ff','#2a5ad8','#0e1a5a'],1.8,[0,10,0,52]);
    itGlow(x,28,28,9,'#ffffff',.55);itK(x,[[20,22],['q',22,16,27,17]],'rgba(255,255,255,.8)',1.6);for(const[a,b]of[[38,30],[30,38],[40,40]]){x.fillStyle='#bfe8ff';x.beginPath();x.arc(a,b,1,0,7);x.fill()}},
  fe:x=>{itGlow(x,34,28,24,'#ffc860',.4);itFeather(x,'#fff2b0','#ffb040','#d8602a')},
  sf:x=>{itGlow(x,34,28,24,'#7ac8ff',.4);itFeather(x,'#ffffff','#9ad0ff','#3a6ab8');itK(x,[[40,22],[33,32],[38,33],[30,44]],'#fff08a',2.4);itK(x,[[40,22],[33,32],[38,33],[30,44]],'#ffffff',1)},
  rs:x=>{itK(x,[[14,16],['q',26,10,40,14],['q',48,16,52,10]],ITO,4.4);itK(x,[[14,16],['q',26,10,40,14],['q',48,16,52,10]],'#8a5a30',2.6);itK(x,[[30,12],[28,6]],'#8a5a30',2);itGlow(x,32,40,20,'#ffb030',.45);
    itFill(x,[[32,18],['q',46,36,44,46],['q',40,58,32,58],['q',24,58,20,46],['q',18,36,32,18]],['#fff0a0','#f0a020','#a85a08'],1.6,[0,18,0,58]);itE(x,27,42,3,5,'rgba(255,255,255,.65)',0);itE(x,36,48,1.6,1.6,'rgba(120,60,10,.5)',0)},
  nt:x=>{itGlow(x,32,32,24,'#b070ff',.35);itFill(x,[[18,14],[46,14],[44,20],[20,20]],['#8a6440','#5a3a20'],1.4);itFill(x,[[18,44],[46,44],[44,50],[20,50]],['#8a6440','#5a3a20'],1.4);itFill(x,[[21,20],[43,20],[43,44],[21,44]],['#5a2a8a','#2a1048'],1.3,[0,20,0,44]);
    for(let k=0;k<6;k++)itK(x,[[21,23+k*3.8],[43,22+k*3.8]],'rgba(210,170,255,.75)',1);itK(x,[[43,30],['q',52,36,48,46],['q',44,54,52,58]],'#c890ff',1.4)},
  ec:x=>{itGlow(x,32,32,26,'#8a50e0',.45);itFill(x,[[38,8],['q',12,14,14,36],['q',18,56,40,56],['q',26,46,26,32],['q',26,18,38,8]],['#5a4a6a','#1a1222','#000000'],1.8,[0,8,0,56]);itK(x,[[38,8],['q',26,18,26,32],['q',26,46,40,56]],'#c890ff',1.6);
    for(const[a,b]of[[44,20],[48,34],[42,46]])itStar(x,a,b,2.6,'#e8d0ff')},
  o1:x=>{itFill(x,[[12,40],[18,22],[32,14],[48,20],[54,38],[44,52],[22,54]],['#9a8c80','#6a5e54','#3e3630'],1.8);itK(x,[[18,24],[30,18],[42,22]],'rgba(255,255,255,.35)',1.4);
    for(const[a,b,r]of[[26,34,4],[38,30,3.2],[34,44,3.6],[20,44,2.4]])itE(x,a,b,r,r*.8,['#e8946a','#b0502a','#6a2a12'],.8)},
  o2:x=>{itFill(x,[[12,46],[18,32],[34,30],[52,36],[54,50],[38,56],[18,54]],['#7a7a8a','#4a4a5a'],1.6);itGlow(x,32,28,22,'#5ab8ff',.5);for(const[cx,h,w,a]of[[24,22,6,-.25],[34,30,7,0],[44,20,5.6,.3]]){x.save();x.translate(cx,44);x.rotate(a);itFill(x,[[-w,0],[-w,-h+6],[0,-h],[w,-h+6],[w,0]],['#e8f8ff','#5ab8ff','#1a5aa8'],1.3,[0,-h,0,0]);itK(x,[[-w*.4,-2],[-w*.4,-h+7]],'rgba(255,255,255,.7)',1.2);x.restore()}},
  o3:x=>{itGlow(x,32,34,26,'#ffc040',.45);for(let k=0;k<3;k++)itK(x,[[8+k*4,8+k*2],[22+k*3,24+k*2]],'rgba(255,200,120,'+(.6-k*.15)+')',3-k*.6);itFill(x,[[16,38],[22,24],[36,18],[50,26],[52,42],[42,54],[24,54]],['#8a6a50','#4a3428','#1e140e'],1.8);
    for(const[a,b,r]of[[30,32,3],[40,40,2.4],[26,44,2],[42,28,1.8]]){itGlow(x,a,b,r*2.4,'#ffd060',.8);itE(x,a,b,r,r,'#fff0a0',0)}itStar(x,46,18,4,'#ffffff')},
  gm:x=>{itGlow(x,32,34,26,'#ff8ad0',.3);itFill(x,[[10,50],[54,50],[50,56],[14,56]],['#6a5e54','#3e3630'],1.3);
    for(const[cx,h,w,c]of[[22,20,6,'#ff5a7a'],[42,22,6.4,'#5ab8ff'],[32,30,7.4,'#5ae08a']])itFill(x,[[cx-w,50],[cx-w,50-h+6],[cx,50-h],[cx+w,50-h+6],[cx+w,50]],[itMix(c,'#ffffff',.6),c,itMix(c,'#000000',.45)],1.3,[0,50-h,0,50]);
    for(const[a,b]of[[30,26],[20,34],[40,34]]){x.fillStyle='rgba(255,255,255,.85)';x.fillRect(a,b,1.6,4)}},
  h1:x=>{itK(x,[[32,58],['q',30,40,32,24]],'#3a7a2a',2.6);for(const[a,s,L]of[[-.9,-1,18],[-.4,-1,20],[.4,1,20],[.9,1,18],[0,1,22]]){x.save();x.translate(32,a===0?24:40-Math.abs(a)*10);x.rotate(a);itFill(x,[[0,0],['q',6,-L*.5,0,-L],['q',-6,-L*.5,0,0]],['#a8f070','#4ab03a','#1e6a1e'],1.2,[0,-L,0,0]);itK(x,[[0,-1],[0,-L+3]],'rgba(255,255,255,.45)',.8);x.restore()}},
  h2:x=>{itGlow(x,32,28,24,'#d8e8ff',.55);itK(x,[[32,58],['q',34,44,32,32]],'#4a8a5a',2.4);for(let k=0;k<6;k++){x.save();x.translate(32,28);x.rotate(k*1.047+.2);itFill(x,[[0,0],['q',7,-7,0,-16],['q',-7,-7,0,0]],['#ffffff','#d8e4ff','#9ab0d8'],1.1,[0,-16,0,0]);x.restore()}itE(x,32,28,4,4,['#fff8c0','#e8c050'],1)},
  h3:x=>{itGlow(x,32,32,26,'#ffb0e0',.5);itFill(x,[[8,46],['q',32,40,56,46],['q',32,56,8,46]],['#5ab07a','#2a6a4a'],1.3);for(const[a,L,c]of[[-1.1,16,'#f8b8e0'],[1.1,16,'#f8b8e0'],[-.55,20,'#ffd0ec'],[.55,20,'#ffd0ec'],[0,22,'#ffffff']]){x.save();x.translate(32,44);x.rotate(a);itFill(x,[[0,0],['q',7,-L*.5,0,-L],['q',-7,-L*.5,0,0]],[c,'#e070b0'],1.1,[0,-L,0,0]);x.restore()}
    itStar(x,32,22,4.2,'#fffbe0');for(const[a,b]of[[16,20],[48,22]])itStar(x,a,b,2.4,'#ffffff')},
  rt:x=>{itGlow(x,32,30,26,'#5ae8d0',.5);itFill(x,[[26,56],[25,36],[39,36],[38,56]],['#f0ecdc','#b8b4a0'],1.4);itFill(x,[[8,36],['q',10,12,32,10],['q',54,12,56,36],['q',32,42,8,36]],['#9afff0','#2ab8a8','#0e5a60'],1.8,[0,10,0,40]);
    for(const[a,b,r]of[[22,22,3],[38,18,2.4],[44,28,2.6],[30,30,2]])itE(x,a,b,r,r*.8,'rgba(230,255,250,.9)',0);itE(x,30,34,2,1.4,'#0e3a40',0);itE(x,36,34,2,1.4,'#0e3a40',0)},
  d1:x=>itBottle(x,'#e02a2a'),d2:x=>itBottle(x,'#2a6ad8'),d3:x=>itBottle(x,'#1ea85a'),d4:x=>itBottle(x,'#ff8ac0'),d5:x=>itBottle(x,'#2a2434','#0a080e'),d6:x=>itBottle(x,'#f4f0ea','#c8c0b8'),d7:x=>{itGlow(x,32,40,22,'#ffd040',.4);itBottle(x,'#ffc828','#b07a08')},d8:x=>{itGlow(x,32,40,24,'#ff9ad8',.4);itBottle(x,'#ffffff',null,1)},
  bty:x=>itCoin(x,'#e0a060','#7a4018',x=>{x.strokeStyle='#5a2a0a';x.lineWidth=1.8;x.beginPath();x.arc(32,33,9,0,7);x.stroke();x.beginPath();x.arc(32,33,4.4,0,7);x.stroke();x.beginPath();x.moveTo(32,20);x.lineTo(32,46);x.moveTo(19,33);x.lineTo(45,33);x.stroke();itE(x,32,33,2,2,'#c82a1a',0)}),
  rnsh:x=>{itGlow(x,32,40,26,'#6ad0ff',.5);itFill(x,[[8,52],['q',18,34,32,30],['q',46,34,56,52],['q',32,58,8,52]],['#d8f4ff','#6ab8f0','#2a5aa8'],1.6,[0,30,0,56]);for(let k=0;k<10;k++){const a=k*2.4,r=4+(k%4)*4;x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(32+Math.cos(a)*r*1.6,46+Math.sin(a)*r*.4,.9,0,7);x.fill()}
    x.strokeStyle='#ffffff';x.lineWidth=1.8;x.beginPath();x.moveTo(32,8);x.lineTo(32,24);x.moveTo(32,12);x.lineTo(38,16);x.moveTo(32,16);x.lineTo(26,20);x.stroke();itGlow(x,32,16,8,'#bfe8ff',.6)},
  rnsg:x=>{itGlow(x,32,32,26,'#ffb060',.35);for(const[cx,cy,a]of[[22,24,-.3],[42,40,.3]]){x.save();x.translate(cx,cy);x.rotate(a);itFill(x,[[-9,-12],[9,-12],[11,10],[-11,10]],['#b8b0a8','#7a7068','#4a4440'],1.5,[0,-12,0,10]);x.strokeStyle='#ffd080';x.lineWidth=1.6;x.beginPath();x.moveTo(0,-7);x.lineTo(0,6);x.moveTo(0,-2);x.lineTo(5,-6);x.stroke();x.restore()}
    x.lineWidth=3;x.strokeStyle=ITO;x.beginPath();x.ellipse(32,32,5,3.4,.8,0,7);x.stroke();x.lineWidth=1.6;x.strokeStyle='#ffd080';x.stroke()},
  xgfs:x=>{itFill(x,[[14,24],[50,24],[46,56],[18,56]],['#c89a64','#8a5a30','#5a3a1e'],1.6);for(const yy of[32,48])itK(x,[[15.4,yy],[48.6,yy]],'#5a5a62',2.4);itE(x,32,24,18,4.4,['#7ac8e8','#2a6a8a'],1.4);
    x.save();x.translate(38,18);x.rotate(.5);itFill(x,[[-4,6],[0,-6],[4,6]],['#ffb070','#e0602a'],1.1);itFill(x,[[-5,-6],[0,-2],[5,-6],[0,-10]],['#ffc080','#e0702a'],1);x.restore();itK(x,[[14,24],['q',32,4,50,24]],'#4a4a52',1.6)},
  xgfd:x=>{itE(x,32,44,24,9,['#ffffff','#d8d4cc'],1.6);itE(x,32,42,17,6,'#f0e8d8',.8);itFill(x,[[18,40],['q',26,30,40,32],[48,36],['q',44,42,30,44]],['#ffb070','#e0702a','#a84a18'],1.3,[0,30,0,44]);itK(x,[[24,38],[40,36]],'rgba(255,240,200,.8)',1);
    itE(x,44,40,3.6,2.4,['#a8e070','#4a9a2a'],.8);for(let k=0;k<3;k++)itK(x,[[24+k*8,26],['q',20+k*8,20,26+k*8,14],['q',30+k*8,10,26+k*8,6]],'rgba(255,255,255,.65)',1.6)},
  xgrb:x=>{itGlow(x,32,36,28,'#ffa040',.55);itFill(x,[[6,48],[58,48],[58,56],[6,56]],['#5a4a8a','#2a2048'],0);for(let k=0;k<7;k++){const a=Math.PI+k*.5236;itK(x,[[32+Math.cos(a)*14,46+Math.sin(a)*14],[32+Math.cos(a)*24,46+Math.sin(a)*24]],'rgba(255,220,140,.85)',1.6)}
    itFill(x,[[32,8],[44,30],[38,48],[26,48],[20,30]],['#fff6d0','#ffb040','#d0601a'],1.6,[0,8,0,48]);itK(x,[[28,16],[25,30]],'rgba(255,255,255,.8)',1.8);itK(x,[[32,8],[32,48]],'rgba(160,60,10,.4)',1)}};
function itMatURL(k){const f=MATI[k];if(!f)return null;const key='m|'+k;if(ITI.c[key])return ITI.c[key];const cv=document.createElement('canvas');cv.width=cv.height=96;const x=cv.getContext('2d');x.scale(1.5,1.5);x.lineJoin='round';x.lineCap='round';f(x);ITI.n++;return ITI.c[key]=cv.toDataURL()}
/* วัตถุดิบ: ห่อ GOODS[].ic (ใช้ทั้งช่องของใช้และหน้าต่างแลกเปลี่ยน) · GOODS ประกาศหลังโมดูล → ห่อตอนหน่วงเวลา + ทุกครั้งที่ #ov เปลี่ยน */
function itGdImg(k){const u=itMatURL(k);return u?'<img data-iti="1" src="'+u+'" alt="" style="width:32px;height:32px;display:block;margin:auto;pointer-events:none">':''}
function itGdPatch(){if(!ITI.on)return 0;let L;try{L=GOODS}catch(e){return 0}let n=0;for(const o of L){if(!o||o.itw||!MATI[o.k]||typeof o.ic!=='function')continue;const old=o.ic;o.ic=function(){if(ITI.on)try{const h=itGdImg(o.k);if(h)return h}catch(e){ITI.err=String(e&&e.stack||e).slice(0,300)}return old.apply(this,arguments)};o.ic.old=old;o.itw=1;n++}return n}
/* สำรอง: ช่องที่วาดไว้ก่อนห่อ → แทนอีโมจิในที่ โดยเก็บตัวเลขจำนวน (span absolute) ไว้ */
function itGdFix(root){if(!ITI.on||!root)return;root.querySelectorAll('.cell[data-gd]').forEach(c=>{if(c.querySelector('img[data-iti]'))return;const k=c.dataset.gd,u=MATI[k]&&itMatURL(k);if(!u)return;
  const keep=[...c.children].filter(e=>e.tagName==='SPAN'&&e.style&&e.style.position==='absolute');[...c.childNodes].forEach(n=>{if(!keep.includes(n))n.remove()});const im=document.createElement('img');im.dataset.iti='1';im.src=u;im.alt='';im.style.cssText='width:32px;height:32px;display:block;margin:auto;pointer-events:none';c.insertBefore(im,c.firstChild)})}
{const go=()=>{try{itGdPatch()}catch(e){}const o=document.getElementById('ov');if(!o){setTimeout(go,300);return}let q=0;const mo=new MutationObserver(()=>{if(q)return;q=1;Promise.resolve().then(()=>{q=0;try{itGdPatch();itGdFix(o)}catch(e){ITI.err=String(e&&e.stack||e).slice(0,300)}})});mo.observe(o,{childList:true,subtree:true});ITI.mo=mo};setTimeout(go,0)}
