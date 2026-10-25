/* ===== v523 ตัวละครผู้เล่น ช่วง 4: รองเท้าวาดใหม่ 7 ระดับ + ชุดเซ็ต · อาวุธในมือ Ancient สีแดงชาด
   รองเท้า: ข้อสูงคลุมแข้ง หัวรองเท้า พื้น ขอบปาก สนับแข้ง · Basic เชือกผูก · Elite+ อัญมณี · Mystic อักขระเรือง · Relic+ ปีกข้อเท้า · Ancient หนามส้น · Cosmic ดาว
   ชุดเซ็ต: ราชันห้วงลึก (เกล็ด) · ผู้พิทักษ์ (แผ่นเกราะ) · รุ่งอรุณ (ปีกขาว) · พายุ (ปีกขนนก+ประกายไฟฟ้า) · เงา (ควันม่วง) · ราก (เปลือกไม้+ใบ)
   รหัสรองเท้า Ancient = +40 (เหมือนชุดเกราะ) · ถอดด้วย alDec · boots2 ห่อทางชื่อ (สีย้อม dyWrap ห่อชั้นนอก → ยังย้อมได้)
   อาวุธ Ancient: รหัส = หลัก 6 + (ทรง+1)×20 (เหมือนหมวก) → วาดด้วยทรง/เอฟเฟกต์ Relic แต่สลับชุดสีเป็นแดงชาด-ทอง · error → แบบเดิม ===== */
const BTV={on:1,err:'',n:0};
function btBoot(bx,l,T,P,gw,front,set,t){const base=T===0&&!set,c=base?'#7a5030':P.m,tr=T>=4||set?P.t:(base?'#c8a070':P.l),top=8.6-l,w=5.2,toe=front?2:1.2,y1=15-l;
  if(LOWQ){g.beginPath();g.moveTo(bx,top);g.lineTo(bx+w,top);g.lineTo(bx+w,11.6-l);g.lineTo(bx+w+toe,13-l);g.lineTo(bx+w+toe,y1);g.lineTo(bx-.3,y1);g.closePath();g.fillStyle=c;g.fill();g.lineWidth=.95;g.strokeStyle=O0;g.stroke();g.fillStyle=base?'#c8a070':tr;g.fillRect(bx-.4,top-.6,w+.8,1.8);if(T>=4||set)g.fillRect(bx-2.6,top+.6,2.4,1.2);return}
  const B=[[bx,top],[bx+w,top],[bx+w-.1,11.4-l],['q',bx+w+toe+.8,11.6-l,bx+w+toe,13.8-l],[bx+w+toe,y1],[bx-.3,y1],[bx-.4,12.6-l]];
  /* ปีกข้อเท้า / หนาม (หลังขา) */
  if(T>=4||set===3||set===4){const wc=set===4?'#e8f4ff':set===3?'#ffffff':tr,fl=Math.sin(t*3+bx)*.5;for(let i=2;i>=0;i--){const L=5.6-i*1.1;g.beginPath();g.moveTo(bx+.8,top+1.8+i*1.1);g.quadraticCurveTo(bx-L*.35,top-3+i*.8+fl,bx-L,top-2.4+i*1.5+fl);g.quadraticCurveTo(bx-L*.65,top+2.6+i*1.1,bx+.6,top+4+i*1.1);g.closePath();g.fillStyle=chSh(i?chAdj(wc.length===7?wc:'#ffffff',-.1*i):wc,top-2,top+5);g.fill();g.lineWidth=.55;g.strokeStyle=set===4?'#3a6ab8':O0;g.stroke()}}
  if(T===5&&!set)for(let k=0;k<2;k++)alSpike(bx+.2,top+1.4+k*2.4,-2.2,-.8,.7,P.t);
  if(gw&&!LOWQ){g.shadowColor=set?P.g:(P.g||'#ffe8a0');g.shadowBlur=6}
  pcP(B);g.fillStyle=chSh(c,top,y1);g.fill();g.shadowBlur=0;
  g.lineWidth=.95;g.strokeStyle=O0;g.stroke();if(!LOWQ){g.lineWidth=1;g.strokeStyle='rgba(255,255,255,.28)';g.beginPath();g.moveTo(bx+.6,top+1.2);g.lineTo(bx+.4,12.6-l);g.stroke()}
  /* พื้นรองเท้า */g.fillStyle=base?'#3a2414':chAdj(P.d,-.3);g.fillRect(bx-.25,y1-1.1,w+toe+.2,1.1);
  /* ขอบปาก */g.beginPath();g.roundRect(bx-.5,top-.7,w+1,2,.8);g.fillStyle=chSh(base?'#c8a070':tr,top-.7,top+1.3);g.fill();g.lineWidth=.7;g.strokeStyle=O0;g.stroke();
  if(base){g.strokeStyle='#e8d0a0';g.lineWidth=.45;for(let k=0;k<2;k++){const yy=top+2.2+k*1.6;g.beginPath();g.moveTo(bx+1.6,yy);g.lineTo(bx+3.6,yy+1);g.moveTo(bx+3.6,yy);g.lineTo(bx+1.6,yy+1);g.stroke()}return}
  /* สนับแข้ง + หัวรองเท้า */
  if(set===6){g.strokeStyle='#2a1808';g.lineWidth=.6;for(const xx of[bx+1.2,bx+3])pcL([[xx,top+1.4],['q',xx+.6,top+3.4,xx-.2,11.6-l]],'#2a1808',.6);g.fillStyle='#7ac850';g.beginPath();g.ellipse(bx+w,top+.6,1.4,.7,-.5,0,7);g.fill();return}
  const sp=[[bx+1,top+1.5],[bx+w-.5,top+1.5],[bx+w-.7,11.2-l],['q',bx+w*.5,12-l,bx+1.1,11.2-l]];pcP(sp);g.fillStyle=set===5?'#2a1a40':chAdj(c,.28);g.fill();g.lineWidth=.55;g.strokeStyle=O0;g.stroke();
  g.beginPath();g.ellipse(bx+w+toe-.8,y1-1.9,1.5,1,0,0,7);g.fillStyle=set===5?'#2a1a40':chAdj(c,.28);g.fill();
  if(set===1&&!LOWQ){g.strokeStyle='rgba(10,70,70,.55)';g.lineWidth=.45;for(let r=0;r<2;r++)for(let i=0;i<2;i++){g.beginPath();g.arc(bx+1.9+i*1.6+(r%2)*.8,top+2.6+r*1.5,.75,0,Math.PI);g.stroke()}}
  if(T>=2||set){const gc=set===5?'#c070ff':P.g;if(gc)alGem(bx+w*.5+.1,top+3,.9,gc,0)}
  if(T===3&&!set&&!LOWQ){g.strokeStyle='rgba(230,190,255,.85)';g.lineWidth=.45;g.beginPath();g.moveTo(bx+2,top+4.6);g.lineTo(bx+2.8,top+5.6);g.lineTo(bx+2,top+6.4);g.stroke()}
  if(T>=6&&!set)alStar(bx+w*.5,top+5.4,1,'#ffffff');
  if(set===4&&Math.sin(t*9+bx*3)>.75){g.strokeStyle='rgba(200,240,255,.95)';g.lineWidth=.7;g.beginPath();g.moveTo(bx+2,top+1);g.lineTo(bx+3.4,top-.4);g.lineTo(bx+2.6,top-.6);g.lineTo(bx+4,top-2.2);g.stroke()}
  if(set===5&&!LOWQ){g.strokeStyle='rgba(190,120,255,.75)';g.lineWidth=.8;g.beginPath();g.moveTo(bx,y1-1);g.quadraticCurveTo(bx-3,y1-2+Math.sin(t*5+bx)*.8,bx-6,y1-.5+Math.sin(t*4+bx));g.stroke()}}
function btV(la,ra,c){const D=alDec(c);if(!D)return false;const P=D.set?itSetPal(D.set):ITP[D.T],t=performance.now()/1000;
  btBoot(-5.9-BSX,la,D.T,P,D.gw,0,D.set,t);btBoot(.8+BSX,ra,D.T,P,D.gw,1,D.set,t);BTV.n++;return true}
{const old=boots2;boots2=function(la,ra,r,gw,c){if(BTV.on&&c){g.save();try{if(btV(la,ra,c)){g.restore();return}}catch(e){BTV.err=String(e&&e.stack||e).slice(0,300)}g.restore()}return old.apply(this,arguments)};BTV.old=old}
/* ---------- อาวุธในมือ: Ancient แดงชาด ---------- */
const WPA={on:1,n:0,P:{m:'#d0384a',e:'#ffd6cc',h:'#2a0a10',gd:'#e8b444',gem:'#ff3b4a',gl:'255,70,60'}};
function wpLkStyle(c){c=c|0;const A=hmAnc(c);if(A)return A.s;return lkS(c)?1:lkX(c)===2?2:lkX(c)===3?0:Math.floor(c/20)}
{const old=drawWeapon;drawWeapon=function(cls,c,ay,t,skin,Pg,E,ak){const A=WPA.on&&hmAnc(c);if(!A)return old.apply(this,arguments);
  const c2=5+(A.gw?10:0)+A.s*20,sv=TPAL[5];TPAL[5]=WPA.P;WPA.n++;try{return old.call(this,cls,c2,ay,t,skin,Pg,E,ak)}finally{TPAL[5]=sv}};WPA.old=old}
