/* ===== v519 ไอคอนอาวุธวาดใหม่ — 5 สายอาชีพ × 3 ทรง (ตรงกับทรงที่ถือในเกม wStyle) × 7 ระดับ + ชุดเซ็ต + ขอบเรืองตีบวก
   นักรบ: ดาบ / ขวาน / ดาบโค้ง · ธนู: ธนูยาว / ธนูโค้งกลับ / หน้าไม้ · เวท: คทาลูกแก้ว / คทาผลึก / คทาจันทร์เสี้ยว
   ซัพ: คทาดอกบัวศักดิ์สิทธิ์ / คทากางเขน / คทาตะเกียง · นักฆ่า: มีดคู่ / กรงเล็บ / มีดโค้งคู่
   ใช้ท่อเดียวกับ v518 (itEquipURL: ออร่า · ลายชุดเซ็ต · ขอบเรือง +7/+10/+15 · แคช dataURL) · error → ไอคอนอาวุธเดิม (weaponIcon) ===== */
const WPI={on:1,err:''};
function wpStyle(it){if(!it)return 0;if(it.ss)return it.ss===5?1:it.ss===4?2:0;try{return(wStyle(it)|0)%3}catch(e){return 0}}
function wpM(T,P){return T===0&&!P.set?{m:'#8e8a82',l:'#e4ded2',d:'#4a463e',t:'#9a7a50',g:'#9ab4c8',cl:'#6a4428'}:P}
function wpWood(T,P){return T<=1&&!P.set?['#b8804e','#7a5230','#4a2c16']:T>=6&&!P.set?['#8a64c8','#4a2c7e','#1e1238']:[itMix(P.d,'#ffffff',.3),P.d,itMix(P.d,'#000000',.45)]}
function wpTrim(T,P){const t=T>=4||P.set?P.t:wpM(T,P).l;return[itMix(t,'#ffffff',.35),t,itMix(t,'#000000',.45)]}
function wpRot(x,cx,cy,a,f){x.save();x.translate(cx,cy);x.rotate(a);try{f()}finally{x.restore()}}
function wpThick(x,P2,c,w,hl){itK(x,P2,ITO,w+2.6);itK(x,P2,c,w);if(hl)itK(x,P2,hl,Math.max(.7,w*.32))}
/* ใบมีดตรง (แกนตั้ง ปลายชี้ขึ้น): y0 = โคนใบ · L = ยาว · W = ครึ่งกว้าง */
function wpBlade(x,T,P,y0,L,W,o){o=o||{};const M=wpM(T,P),tip=y0-L,sh=o.tipH||10,pts=[[-W,y0]];
  if(T===5&&!P.set&&!o.noSer)for(let i=0;i<3;i++){const yy=y0-5-i*((L-sh-6)/3);pts.push([-W,yy],[-W-2.8,yy-3.4],[-W*1.02,yy-5.4])}
  pts.push([-W*1.06,tip+sh],[0,tip],[W*1.06,tip+sh],[W,y0]);
  itFill(x,pts,M.m,0);x.save();itPath(x,pts);x.clip();
  x.fillStyle=M.d;x.globalAlpha=.55;x.fillRect(0,tip-2,W*2+6,L+6);x.globalAlpha=1;
  const gr=x.createLinearGradient(-W-3,0,0,0);gr.addColorStop(0,M.l);gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.globalAlpha=.9;x.fillRect(-W-4,tip-2,W+4,L+6);x.globalAlpha=1;
  if(T>=6&&!P.set){for(const[a,b,r]of[[-1.6,y0-7,1],[1.8,y0-13,.8],[-1,y0-20,1.2],[1.4,y0-26,.7],[-.4,y0-32,.9]])if(b>tip+3){x.fillStyle='#ffffff';x.beginPath();x.arc(a,b,r,0,7);x.fill()}itStar(x,.2,y0-L*.5,3,'#ffe6f8')}
  x.restore();itPath(x,pts);x.lineWidth=1.6;x.strokeStyle=ITO;x.stroke();
  if(T>=1||P.set){itK(x,[[0,y0-2],[0,tip+sh]],itMix(M.d,'#000000',.25),1.2);itK(x,[[-1,y0-2],[-1,tip+sh]],'rgba(255,255,255,.55)',.6)}
  itK(x,[[-W+1.1,y0-3],[-W*1.06+1.3,tip+sh]],'rgba(255,255,255,.85)',.8);
  if(T===3&&!P.set)for(let i=0;i<3;i++){const yy=y0-6-i*6.5;itGlow(x,0,yy,4.2,P.g,.85);itK(x,[[0,yy+1.9],[0,yy-1.9]],'#f8ecff',.9);itK(x,[[0,yy-.4],[1.5,yy-1.8]],'#f8ecff',.8)}
  if(T===4&&!P.set){itK(x,[[-W+1.2,y0-1.6],['q',0,y0-6,W-1.2,y0-1.6]],P.t,1);itK(x,[[-W+1.6,y0-4.6],['q',0,y0-9,W-1.6,y0-4.6]],P.t,.7)}
  if(T===5&&!P.set)for(const[a,b]of[[W+2,y0-9],[W+2.8,y0-17],[W+1.4,y0-25]]){itGlow(x,a,b,3.2,'#ff7a2a',.9);x.fillStyle='#ffd080';x.beginPath();x.arc(a,b,.8,0,7);x.fill()}
  if(P.set){itGlow(x,0,y0-L*.45,5,P.g,.55);itK(x,[[0,y0-4],[0,y0-L*.6]],itMix(P.g,'#ffffff',.5),.9)}}
/* การ์ดมือจับ */
function wpGuard(x,T,P,y,w){const tr=wpTrim(T,P);
  if(T===0&&!P.set){itFill(x,[[-w,y],[w,y],[w,y+3.4],[-w,y+3.4]],['#b08458','#5a3a1e'],1.4,[0,y,0,y+3.4]);itRivets(x,[[-w+1.6,y+1.7],[w-1.6,y+1.7]],'#c8c0b0');return}
  if(T>=4||P.set)for(const s of[-1,1])for(let k=0;k<3;k++){const L=w+5.5-k*2.6;itFill(x,[[s*2,y+1],['q',s*L*.7,y-4-k*2.2,s*L,y-6.5-k*3],['q',s*L*.8,y-k*1.4,s*3,y+3]],[itMix(tr[1],'#ffffff',.55),tr[1],tr[2]],1.1,[0,y-9-k*3,0,y+3])}
  const up=T>=3||P.set?2.8:T>=2?1.3:0;
  itFill(x,[[-w,y-up],['q',-w*.5,y+.2,0,y],['q',w*.5,y+.2,w,y-up],[w+1.6,y-up+.6],[w+.8,y+3.4],['q',0,y+4.8,-w-.8,y+3.4],[-w-1.6,y-up+.6]],tr,1.4,[0,y-up,0,y+4.8]);
  for(const s of[-1,1])itE(x,s*(w+.7),y-up+1.4,1.7,1.7,tr,1);
  if(T>=2||P.set)itGem(x,0,y+1.9,2.7,P.g,T>=3||!!P.set)}
function wpGrip(x,T,P,y0,y1,w){const c=T===0&&!P.set?'#6a4428':P.cl;itFill(x,[[-w,y0],[w,y0],[w,y1],[-w,y1]],[itMix(c,'#ffffff',.3),c,itMix(c,'#000000',.4)],1.3,[-w,0,w,0]);
  for(let yy=y0+2.2;yy<y1-.4;yy+=2.6)itK(x,[[-w,yy],[w,yy-1.6]],itMix(c,'#000000',.5),.8)}
function wpPommel(x,T,P,y,r){itE(x,0,y,r,r,wpTrim(T,P),1.3);if(T>=3||P.set)itE(x,0,y,r*.45,r*.45,[itMix(P.g,'#ffffff',.5),P.g],0)}
function wpShaft(x,T,P,y0,y1,w){const wd=wpWood(T,P);itFill(x,[[-w,y0],[w,y0],[w*.85,y1],[-w*.85,y1]],wd,1.4,[-w,0,w,0]);
  if(T===0&&!P.set)for(const q of[.2,.55,.8]){const yy=y0+(y1-y0)*q;itE(x,w*.2,yy,w*.55,1.1,'rgba(40,20,8,.55)',0)}
  itK(x,[[-w*.45,y0-1],[-w*.4,y1+1]],'rgba(255,255,255,.35)',.8);
  if(T>=1||P.set){const tr=wpTrim(T,P);itFill(x,[[-w-.6,y0-3],[w+.6,y0-3],[w+.4,y0],[-w-.4,y0]],tr,1,[0,y0-3,0,y0])}}
function wpBand(x,T,P,y,w){itFill(x,[[-w-.8,y-1.6],[w+.8,y-1.6],[w+.8,y+1.6],[-w-.8,y+1.6]],wpTrim(T,P),1,[0,y-1.6,0,y+1.6])}
function wpOrb(x,cx,cy,r,c){itGlow(x,cx,cy,r*2.7,c,.6);itE(x,cx,cy,r,r,[itMix(c,'#ffffff',.75),c,itMix(c,'#000000',.45)],1.5);x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.ellipse(cx-r*.35,cy-r*.4,r*.3,r*.19,-.6,0,7);x.fill()}
function wpOrbC(T,P,cls){return P.set?P.g:T===0?'#9ab4c8':T===1?(cls==='sup'?'#ffd860':'#5ad0ff'):P.g}
function wpWings(x,T,P,cx,cy,s,k){const tr=wpTrim(T,P);for(let i=0;i<3;i++){const L=(9-i*2.2)*(k||1);itFill(x,[[cx,cy],['q',cx+s*L*.6,cy-L*.7-i,cx+s*L,cy-L*.45-i*1.6],['q',cx+s*L*.7,cy-i*.6,cx+s*1.5,cy+2]],[itMix(tr[1],'#ffffff',.6),tr[1],tr[2]],1,[0,cy-L,0,cy+2])}}
/* ---------- นักรบ ---------- */
function wpSword(x,T,P){const L=[36,38,39,40,41,42,42][T],W=[4,4.2,4.5,4.8,5.3,5.5,5.3][T],gw=[8,9,9.5,10,10,10.5,10.5][T];
  wpRot(x,32,33,Math.PI/4,()=>{const y0=8;wpGrip(x,T,P,y0+3,y0+15,2.1);wpPommel(x,T,P,y0+18.2,3.2);wpBlade(x,T,P,y0,L,W);wpGuard(x,T,P,y0,gw)})}
function wpAxe(x,T,P){const M=wpM(T,P),H=[16,17,18,19,20,21,21][T],Wd=[13,14,14.5,15,16,16.5,16.5][T],top=-26;
  wpRot(x,32,31,Math.PI/4,()=>{wpShaft(x,T,P,33,top-2,2.3);wpGrip(x,T,P,18,29,2.7);
    const head=s=>{const p=[[s*2,top],[s*Wd*.5,top-2.6],['q',s*(Wd+3),top+H*.45,s*Wd*.95,top+H+2],[s*Wd*.5,top+H-2.4],[s*2,top+H-4]];
      if(T===5&&!P.set){p.splice(2,0,[s*Wd*.8,top-2],[s*Wd*.9,top-5.4],[s*Wd*1.02,top+.4])}
      itFill(x,p,s>0?[M.l,M.m,M.d]:[M.m,M.d,itMix(M.d,'#000000',.3)],1.6,[0,top,s*Wd,top]);
      itK(x,[[s*Wd*.62,top-.8],['q',s*(Wd+1.4),top+H*.45,s*Wd*.88,top+H]],'rgba(255,255,255,.85)',1.1);
      if(T===3&&!P.set){itGlow(x,s*Wd*.55,top+H*.45,5,P.g,.8);itK(x,[[s*Wd*.55,top+H*.45-2.4],[s*Wd*.55,top+H*.45+2.4]],'#f8ecff',1)}
      if(T===4&&!P.set||P.set)itK(x,[[s*4,top+1.4],['q',s*Wd*.6,top+H*.45,s*4,top+H-5]],P.set?P.g:P.t,1.1);
      if(T>=6&&!P.set){itStar(x,s*Wd*.55,top+H*.45,3,'#ffe6f8');x.fillStyle='#fff';for(const[a,b]of[[.35,.2],[.75,.7],[.4,.8]]){x.beginPath();x.arc(s*Wd*a,top+H*b,.8,0,7);x.fill()}}};
    head(1);if(T>=3||P.set)head(-1);
    if(T>=2||P.set)itFill(x,[[-2,top-1],[0,top-8-(T>=4?3:0)],[2,top-1]],[M.l,M.m],1.2,[0,top-11,0,top]);
    itFill(x,[[-3.2,top-1.4],[3.2,top-1.4],[3.4,top+H-2],[-3.4,top+H-2]],wpTrim(T,P),1.3,[-3.4,0,3.4,0]);
    if(T>=2||P.set)itGem(x,0,top+H*.42,2.6,P.g,T>=3||!!P.set);itRivets(x,[[0,top+2],[0,top+H-5]],T>=4?P.t:'#e8ecf0');
    if(T===5&&!P.set)for(const[a,b]of[[8,top-6],[-10,top+H+3],[14,top+4]]){itGlow(x,a,b,3,'#ff7a2a',.85)}})}
function wpSaber(x,T,P){const M=wpM(T,P),L=[36,37,38,39,40,41,41][T],W=[3.8,4,4.2,4.4,4.8,5,4.8][T],gw=[7,7.5,8,8.5,8.5,9,9][T];
  wpRot(x,30,34,Math.PI/4,()=>{const y0=8,tip=y0-L,tx=10;
    wpGrip(x,T,P,y0+3,y0+14,2);wpPommel(x,T,P,y0+16.6,2.9);
    const tr=wpTrim(T,P);wpThick(x,[[gw-1,y0+2],['q',gw+4,y0+11,2.4,y0+16]],tr[1],1.8,tr[0]);
    const pts=[[-W,y0],['q',-W-1.5,y0-L*.62,tx,tip],['q',W+3,y0-L*.5,W,y0]];
    if(T===5&&!P.set)pts.splice(2,0,[W+3.6,y0-L*.52],[W+6.4,y0-L*.6],[W+3.6,y0-L*.56]);
    itFill(x,pts,M.m,0);x.save();itPath(x,pts);x.clip();x.fillStyle=M.d;x.globalAlpha=.5;x.beginPath();x.moveTo(.5,y0);x.quadraticCurveTo(0,y0-L*.6,tx,tip);x.lineTo(30,tip);x.lineTo(30,y0+2);x.closePath();x.fill();x.globalAlpha=1;
      if(T>=6&&!P.set){for(const[a,b,r]of[[-1.4,y0-8,1],[1.4,y0-16,.8],[1,y0-24,1.1],[4.6,y0-31,.8]]){x.fillStyle='#fff';x.beginPath();x.arc(a,b,r,0,7);x.fill()}itStar(x,1.4,y0-L*.48,2.8,'#ffe6f8')}x.restore();
    itPath(x,pts);x.lineWidth=1.6;x.strokeStyle=ITO;x.stroke();
    itK(x,[[-W+1.2,y0-3],['q',-W,y0-L*.6,tx-1.2,tip+2.6]],'rgba(255,255,255,.85)',.9);
    if(T>=1||P.set)itK(x,[[.2,y0-3],['q',0,y0-L*.55,tx-3.4,tip+8]],itMix(M.d,'#000000',.25),1.1);
    if(T===3&&!P.set)for(let i=0;i<3;i++){const yy=y0-7-i*7,xx=i*1.1;itGlow(x,xx,yy,4,P.g,.85);itK(x,[[xx,yy+1.8],[xx,yy-1.8]],'#f8ecff',.9)}
    if(T===5&&!P.set)for(const[a,b]of[[W+5,y0-12],[W+8,y0-22]])itGlow(x,a,b,3.2,'#ff7a2a',.9);
    if(P.set)itGlow(x,1,y0-L*.45,5,P.g,.55);
    wpGuard(x,T,P,y0,gw)})}
/* ---------- ธนู ---------- */
function wpArrow(x,T,P,y0,y1){const M=wpM(T,P),fc=T===0&&!P.set?'#ece4d4':itMix(P.cl,'#ffffff',.25);
  itK(x,[[0,y0],[0,y1+5]],ITO,3);itK(x,[[0,y0],[0,y1+5]],T<=1&&!P.set?'#c8945c':itMix(P.d,'#ffffff',.35),1.4);
  for(const s of[-1,1])itFill(x,[[0,y0-1],[s*3.4,y0+1.6],[s*3.4,y0-5],[0,y0-8]],[itMix(fc,'#ffffff',.4),fc],1,[0,y0-8,0,y0+2]);
  if(T>=3||P.set)itGlow(x,0,y1+3,5,P.g,.7);itFill(x,[[-3,y1+6],[0,y1],[3,y1+6],[0,y1+4.6]],[M.l,M.m,M.d],1.2,[-3,0,3,0])}
function wpBowTips(x,T,P,tips){const tr=wpTrim(T,P);for(const[a,b,s]of tips){if(T>=4||P.set)wpWings(x,T,P,a,b,s,.7);else if(T>=1)itE(x,a,b,1.9,1.9,tr,1);if(T>=6&&!P.set)itStar(x,a,b-1,3,'#fff0fa');if(T===5&&!P.set)itGlow(x,a,b,4,'#ff6a3a',.8)}}
function wpBow(x,T,P,rec){const wd=T<=1&&!P.set?wpWood(T,P):[P.l,P.m,P.d],th=[2.6,2.8,3,3.2,3.6,3.8,3.8][T];
  wpRot(x,32,32,Math.PI/4,()=>{const tl=rec?[-27,8]:[-27,12],trr=rec?[27,8]:[27,12];
    const path=rec?[[-27,8],['q',-31,14,-24,13],['q',-20,-12,0,-12],['q',20,-12,24,13],['q',31,14,27,8]]:[[-27,12],['q',-25,-12,0,-12],['q',25,-12,27,12]];
    itK(x,[tl,[0,21],trr],'rgba(30,24,20,.9)',1.6);itK(x,[tl,[0,21],trr],T>=6&&!P.set?'#ffd2f0':'#f2ead8',.8);
    wpArrow(x,T,P,21,-33);
    wpThick(x,path,wd[1],th,wd[0]);
    if(T>=3&&!P.set){x.save();x.setLineDash([2,3]);itK(x,rec?[[-20,4],['q',-14,-9,-5,-11]]:[[-21,4],['q',-17,-9,-5,-11]],itMix(P.g,'#ffffff',.4),.9);itK(x,rec?[[20,4],['q',14,-9,5,-11]]:[[21,4],['q',17,-9,5,-11]],itMix(P.g,'#ffffff',.4),.9);x.restore()}
    const c=T===0&&!P.set?'#6a4428':P.cl;itFill(x,[[-3.4,-15.4],[3.4,-15.4],[3.4,-8.6],[-3.4,-8.6]],[itMix(c,'#ffffff',.3),c,itMix(c,'#000000',.35)],1.2,[0,-15.4,0,-8.6]);
    if(T>=2||P.set)itGem(x,0,-16.6,2.5,P.g,T>=3||!!P.set);
    wpBowTips(x,T,P,[[tl[0],tl[1],-1],[trr[0],trr[1],1]])})}
function wpXbow(x,T,P){const M=wpM(T,P),wd=wpWood(T,P);
  wpRot(x,32,32,Math.PI/4,()=>{/* ด้าม */itFill(x,[[-3,-20],[3,-20],[3.6,14],[6,26],[0,30],[-6,26],[-3.6,14]],wd,1.5,[-6,0,6,0]);itK(x,[[-1.6,-18],[-2,14]],'rgba(255,255,255,.35)',.9);
    itFill(x,[[2.6,6],[7,9],[6,13],[2.6,11]],wpTrim(T,P),1.1,[0,6,0,13]);
    /* แขนคันศร */const pr=[[-26,-6],['q',-16,-22,0,-20],['q',16,-22,26,-6]];
    itK(x,[[-26,-6],[0,3],[26,-6]],'rgba(30,24,20,.9)',1.6);itK(x,[[-26,-6],[0,3],[26,-6]],'#f2ead8',.8);
    wpThick(x,pr,M.m,3.2,M.l);wpBowTips(x,T,P,[[-26,-6,-1],[26,-6,1]]);
    itFill(x,[[-4,-22.6],[4,-22.6],[4.4,-17],[-4.4,-17]],wpTrim(T,P),1.2,[0,-22.6,0,-17]);
    wpArrow(x,T,P,3,-33);
    if(T>=1||P.set){wpBand(x,T,P,-6,3);itRivets(x,[[0,-12],[0,18]],T>=4?P.t:'#e8ecf0')}
    if(T>=2||P.set)itGem(x,0,22,2.6,P.g,T>=3||!!P.set)})}
/* ---------- เวท / ซัพ ---------- */
function wpHead(x,cy,k){x.translate(0,cy);x.scale(k,k);x.translate(0,-cy)}
function wpStaffBase(x,T,P,top){wpShaft(x,T,P,29,top,2.3);const c=T===0&&!P.set?'#6a4428':P.cl;itFill(x,[[-2.6,6],[2.6,6],[2.6,16],[-2.6,16]],[itMix(c,'#ffffff',.3),c,itMix(c,'#000000',.35)],1.2,[-2.6,0,2.6,0]);for(let yy=8;yy<16;yy+=2.4)itK(x,[[-2.6,yy],[2.6,yy-1.4]],itMix(c,'#000000',.5),.7);
  if(T>=4||P.set){itFill(x,[[-2.4,29],[2.4,29],[0,34]],wpTrim(T,P),1.1,[0,29,0,34])}}
function wpOrbStaff(x,T,P,cls){const R=[5.6,6,6.4,6.8,7.2,7.6,7.6][T],oc=wpOrbC(T,P,cls),cy=-25,tr=wpTrim(T,P);
  wpRot(x,27,37,Math.PI/4,()=>{wpStaffBase(x,T,P,-15);wpHead(x,cy,1.28);
    if(T>=4||P.set){x.save();x.translate(0,cy);x.scale(1,.42);x.strokeStyle=ITO;x.lineWidth=3.6;x.beginPath();x.arc(0,0,R+5.5,0,7);x.stroke();x.strokeStyle=tr[1];x.lineWidth=1.8;x.stroke();x.restore()}
    if(T===5&&!P.set)for(const s of[-1,1])wpThick(x,[[s*2,-16],['q',s*13,-20,s*10,-33]],'#2a0a10',2.2,'#e2585c');
    wpOrb(x,0,cy,R,oc);if(T>=6&&!P.set){itStar(x,0,cy,3.2,'#ffffff');for(const[a,b]of[[-R-3,cy-6],[R+4,cy+3],[3,cy-R-5]])itStar(x,a,b,1.8,'#ffe6f8')}
    for(const s of[-1,1])wpThick(x,[[s*1.4,-15],['q',s*(R+4),-17,s*(R*.55),cy-R*.8]],T===0&&!P.set?'#7a5230':tr[1],1.8,T===0&&!P.set?'#b8804e':tr[0]);
    if(T>=4||P.set){x.save();x.translate(0,cy);x.scale(1,.42);x.strokeStyle=ITO;x.lineWidth=3.6;x.beginPath();x.arc(0,0,R+5.5,0,Math.PI);x.stroke();x.strokeStyle=tr[1];x.lineWidth=1.8;x.stroke();x.restore()}
    if(T>=2||P.set)itGem(x,0,-13.4,2.2,P.g,false)})}
function wpCrystal(x,T,P){const H=[13,14,15,16,17,18,18][T],w=[5,5.4,5.8,6.2,6.6,7,7][T],cy=-29,oc=wpOrbC(T,P,'mage'),tr=wpTrim(T,P);
  wpRot(x,27,38,Math.PI/4,()=>{wpStaffBase(x,T,P,-14);wpHead(x,-24,1.2);
    for(const s of[-1,1])wpThick(x,[[0,-13],['q',s*3,-17,s*6.4,-22.6]],T===0&&!P.set?'#7a5230':tr[1],2,T===0&&!P.set?'#b8804e':tr[0]);
    itGlow(x,0,cy,H*1.2,oc,.6);
    itFill(x,[[0,cy-H*.6],[w,cy-H*.12],[w*.7,cy+H*.4],[0,cy+H*.55],[-w*.7,cy+H*.4],[-w,cy-H*.12]],[itMix(oc,'#ffffff',.7),oc,itMix(oc,'#000000',.5)],1.5,[0,cy-H*.6,0,cy+H*.55]);
    x.fillStyle='rgba(255,255,255,.75)';x.beginPath();x.moveTo(0,cy-H*.6);x.lineTo(-w,cy-H*.12);x.lineTo(-w*.25,cy);x.closePath();x.fill();
    itK(x,[[0,cy-H*.6],[0,cy+H*.55]],'rgba(255,255,255,.45)',.7);itK(x,[[-w,cy-H*.12],[0,cy],[w,cy-H*.12]],'rgba(0,0,0,.25)',.7);
    if(T>=3||P.set)for(const[a,b,r]of[[-w-5,cy+4,2.2],[w+5,cy-3,2],[w+2,cy+H*.6,1.6]])itFill(x,[[a,b-r*1.6],[a+r,b],[a,b+r*1.6],[a-r,b]],[itMix(oc,'#ffffff',.6),oc],.9,[0,b-r*1.6,0,b+r*1.6]);
    if(T>=6&&!P.set)itStar(x,0,cy-2,3.4,'#ffffff');
    if(T>=4||P.set)wpWings(x,T,P,-2.6,-16,-1,.9),wpWings(x,T,P,2.6,-16,1,.9)})}
function wpMoon(x,T,P){const R=[9,9.5,10,10.5,11,11.5,11.5][T],cy=-26,M=wpM(T,P),tr=T>=4||P.set?wpTrim(T,P):[M.l,M.m,M.d],oc=wpOrbC(T,P,'mage');
  wpRot(x,27,37,Math.PI/4,()=>{wpStaffBase(x,T,P,-16);wpHead(x,cy,1.28);
    itGlow(x,0,cy,R*1.9,oc,.45);
    x.save();x.beginPath();x.arc(0,cy,R,0,7);x.arc(R*.5,cy-R*.25,R*.82,0,7,true);x.closePath();const gr=x.createLinearGradient(-R,0,R,0);gr.addColorStop(0,tr[0]);gr.addColorStop(.5,tr[1]);gr.addColorStop(1,tr[2]);x.fillStyle=gr;x.fill('evenodd');x.lineWidth=1.5;x.strokeStyle=ITO;x.stroke();x.restore();
    itK(x,[[-R*.55,cy-R*.65],['q',-R*1.05,cy,-R*.55,cy+R*.65]],'rgba(255,255,255,.75)',1);
    const sc=T>=4?1.25:1;itGlow(x,R*.25,cy-1,6*sc,oc,.8);x.fillStyle=itMix(oc,'#ffffff',.55);x.beginPath();for(let k=0;k<10;k++){const r=k%2?2*sc:4.6*sc,a=k*.628-1.571;x.lineTo(R*.25+Math.cos(a)*r,cy-1+Math.sin(a)*r)}x.closePath();x.fill();x.lineWidth=1;x.strokeStyle=ITO;x.stroke();
    if(T>=3||P.set)for(const[a,b]of[[R+3,cy-7],[R+5,cy+5],[-R-3,cy-9]])itStar(x,a,b,2,'#ffffff');
    if(T>=2||P.set)itGem(x,0,-14.4,2.3,P.g,T>=3||!!P.set);if(T===5&&!P.set)itGlow(x,-R*.6,cy+R*.5,5,'#ff3b4a',.7)})}
function wpLotus(x,T,P){const R=[5.4,5.8,6.2,6.6,7,7.4,7.4][T],oc=wpOrbC(T,P,'sup'),cy=-26,tr=wpTrim(T,P);
  wpRot(x,27,37,Math.PI/4,()=>{wpStaffBase(x,T,P,-15);wpHead(x,cy,1.28);
    if(T>=2||P.set){wpWings(x,T,P,-3,-17,-1,1.1);wpWings(x,T,P,3,-17,1,1.1)}
    if(T>=4||P.set){x.strokeStyle=ITO;x.lineWidth=3.4;x.beginPath();x.arc(0,cy,R+4.4,0,7);x.stroke();x.strokeStyle=tr[1];x.lineWidth=1.6;x.stroke();for(let k=0;k<8;k++){const a=k*.785;itK(x,[[Math.cos(a)*(R+6),cy+Math.sin(a)*(R+6)],[Math.cos(a)*(R+8.6),cy+Math.sin(a)*(R+8.6)]],tr[0],1.2)}}
    wpOrb(x,0,cy,R,oc);
    const pc=T===0&&!P.set?['#e8dcc0','#a8946a']:[itMix(tr[1],'#ffffff',.5),tr[1],tr[2]];
    for(const[a,L]of[[-1.15,8],[1.15,8],[-.6,9.5],[.6,9.5],[0,10]]){x.save();x.translate(0,-15.6);x.rotate(a);itFill(x,[[0,0],['q',3.6,-L*.55,0,-L],['q',-3.6,-L*.55,0,0]],pc,1,[0,-L,0,0]);x.restore()}
    if(T>=6&&!P.set)for(const[a,b]of[[-R-4,cy-4],[R+5,cy-6],[0,cy-R-6]])itStar(x,a,b,2.2,'#fff0fa');if(T===5&&!P.set)itGlow(x,0,cy,R*1.4,'#ff3b4a',.35)})}
function wpCross(x,T,P){const M=wpM(T,P),tr=T>=4||P.set?wpTrim(T,P):[M.l,M.m,M.d],cy=-26,h=[9,9.5,10,10.5,11,11.5,11.5][T];
  wpRot(x,27,37,Math.PI/4,()=>{wpStaffBase(x,T,P,-15);wpHead(x,cy,1.24);
    if(T>=4||P.set){itGlow(x,0,cy,h*2,P.set?P.g:'#ffe08a',.55);x.strokeStyle=ITO;x.lineWidth=3.4;x.beginPath();x.arc(0,cy,h*.95,0,7);x.stroke();x.strokeStyle=tr[0];x.lineWidth=1.6;x.stroke()}
    const w=2.6,p=[[-w,-15],[-w,cy+3],[-h,cy+3],[-h-1.4,cy],[-h,cy-3],[-w,cy-3],[-w,cy-h],[0,cy-h-2.4],[w,cy-h],[w,cy-3],[h,cy-3],[h+1.4,cy],[h,cy+3],[w,cy+3],[w,-15]];
    itFill(x,p,tr,1.5,[-h,0,h,0]);itK(x,[[-1,-16],[-1,cy-h+1]],'rgba(255,255,255,.6)',.7);
    if(T===0&&!P.set){itK(x,[[-h+1,cy+1.8],[h-1,cy+1.8]],'rgba(60,40,20,.5)',.8)}
    itGem(x,0,cy,T>=2||P.set?3.4:2.4,T===0&&!P.set?'#c8b08a':wpOrbC(T,P,'sup'),T>=2||!!P.set);
    if(T>=3||P.set)for(const[a,b]of[[0,cy-h-1],[-h,cy],[h,cy]])itE(x,a,b,1.2,1.2,itMix(P.g,'#ffffff',.4),.6);
    if(T>=6&&!P.set)for(const[a,b]of[[-h-3,cy-7],[h+4,cy-6]])itStar(x,a,b,2.4,'#fff0fa');if(T===5&&!P.set)itGlow(x,0,cy,7,'#ff3b4a',.5)})}
function wpLantern(x,T,P){const M=wpM(T,P),tr=T>=4||P.set?wpTrim(T,P):[M.l,M.m,M.d],oc=wpOrbC(T,P,'sup'),lx=9,ly=-17;
  wpRot(x,25,38,Math.PI/4,()=>{wpStaffBase(x,T,P,-26);wpHead(x,-24,1.3);
    wpThick(x,[[0,-25],['q',0,-33,6,-33],['q',lx+1,-33,lx,-27.4]],T<=1&&!P.set?'#7a5230':tr[1],2.2,T<=1&&!P.set?'#b8804e':tr[0]);
    itK(x,[[lx,-27.4],[lx,ly-6.6]],'#3a3036',1.1);
    itGlow(x,lx,ly,12,oc,.6);
    itFill(x,[[lx-3,ly-6.4],[lx+3,ly-6.4],[lx+5,ly-3.6],[lx-5,ly-3.6]],tr,1.2,[0,ly-6.4,0,ly-3.6]);
    itFill(x,[[lx-4.6,ly-3.6],[lx+4.6,ly-3.6],[lx+4,ly+5],[lx-4,ly+5]],[itMix(oc,'#ffffff',.7),oc,itMix(oc,'#000000',.2)],1.3,[0,ly-3.6,0,ly+5]);
    for(const a of[-2,2])itK(x,[[lx+a,ly-3.4],[lx+a*.85,ly+4.8]],tr[2],1);itE(x,lx,ly+.6,1.6,2.4,'#ffffff',0);
    itFill(x,[[lx-4.6,ly+5],[lx+4.6,ly+5],[lx+3,ly+7.6],[lx-3,ly+7.6]],tr,1.1,[0,ly+5,0,ly+7.6]);
    if(T>=2||P.set)itGem(x,0,-21,2.2,P.g,T>=3||!!P.set);
    if(T>=4||P.set)wpWings(x,T,P,lx+5,ly-2,1,.8);
    if(T>=6&&!P.set)for(const[a,b]of[[lx+8,ly-8],[lx-7,ly+9]])itStar(x,a,b,2.2,'#fff0fa');if(T===5&&!P.set)itGlow(x,lx,ly+9,5,'#ff6a3a',.8)})}
/* ---------- นักฆ่า ---------- */
function wpDagger(x,T,P,cx,cy,a,k){const L=[23,24,25,26,27,28,28][T],W=[3.3,3.4,3.6,3.8,4.1,4.3,4.1][T];wpRot(x,cx,cy,a,()=>{x.scale(k||1,k||1);const y0=6;wpGrip(x,T,P,y0+3,y0+11,1.8);wpPommel(x,T,P,y0+13.4,2.4);wpBlade(x,T,P,y0,L,W,{tipH:7});wpGuard(x,T,P,y0,6)})}
function wpTwin(x,T,P){wpDagger(x,T,P,34.8,36,-.62,1.22);wpDagger(x,T,P,29.2,36,.62,1.22)}
function wpKarambit(x,T,P,cx,cy,a,s){const M=wpM(T,P),L=[22,23,24,25,26,27,27][T],W=3.6;wpRot(x,cx,cy,a,()=>{x.scale(s*1.2,1.2);const y0=6,tip=y0-L;
    const tr=wpTrim(T,P);x.lineWidth=3.6;x.strokeStyle=ITO;x.beginPath();x.arc(0,y0+15.6,3,0,7);x.stroke();x.lineWidth=1.8;x.strokeStyle=tr[1];x.stroke();
    wpGrip(x,T,P,y0+2,y0+12,1.8);
    const pts=[[-W,y0],['q',-W-1,y0-L*.6,-W*.2+8,tip],['q',W,y0-L*.62,W,y0]];
    itFill(x,pts,M.m,0);x.save();itPath(x,pts);x.clip();x.fillStyle=M.d;x.globalAlpha=.5;x.fillRect(.6,tip-4,20,L+6);x.globalAlpha=1;if(T>=6&&!P.set)itStar(x,0,y0-L*.45,2.4,'#ffe6f8');x.restore();
    itPath(x,pts);x.lineWidth=1.5;x.strokeStyle=ITO;x.stroke();itK(x,[[-W+1,y0-2.4],['q',-W,y0-L*.6,6.4,tip+1.6]],'rgba(255,255,255,.85)',.85);
    if(T===3&&!P.set)itGlow(x,-.4,y0-L*.45,4,P.g,.9);if(T===5&&!P.set)itGlow(x,-W-2,y0-L*.5,3.4,'#ff7a2a',.9);if(P.set)itGlow(x,0,y0-L*.4,4.4,P.g,.6);
    itFill(x,[[-4,y0-.6],[4,y0-.6],[4,y0+2.4],[-4,y0+2.4]],tr,1.2,[0,y0-.6,0,y0+2.4]);if(T>=2||P.set)itGem(x,0,y0+.9,1.8,P.g,T>=3||!!P.set)})}
function wpKaram2(x,T,P){wpKarambit(x,T,P,38,33,-.42,-1);wpKarambit(x,T,P,26,33,.42,1)}
function wpClaw(x,T,P){const M=wpM(T,P),tr=wpTrim(T,P),L=[26,27,28,29,30,31,31][T];
  wpRot(x,32,33,Math.PI/4,()=>{for(const s of[-1,1])itFill(x,[[s*5.6,6],[s*8.6,6],[s*8.6,27],[s*5.6,27]],tr,1.3,[s*5.6,0,s*8.6,0]);
    const c=T===0&&!P.set?'#6a4428':P.cl;for(const yy of[16,22])itFill(x,[[-5.6,yy-1.6],[5.6,yy-1.6],[5.6,yy+1.6],[-5.6,yy+1.6]],[itMix(c,'#ffffff',.3),c,itMix(c,'#000000',.35)],1.1,[0,yy-1.6,0,yy+1.6]);
    for(const[bx,k]of[[-5.4,.78],[5.4,.78],[0,1]])wpBladeAt(x,bx,T,P,7,L*k,2.3,{tipH:6,noSer:bx!==0});
    itFill(x,[[-9.6,4.4],[9.6,4.4],[8.6,9],[-8.6,9]],tr,1.4,[0,4.4,0,9]);if(T>=2||P.set)itGem(x,0,6.7,2.4,P.g,T>=3||!!P.set);
    if(T>=4||P.set)for(const s of[-1,1])itFill(x,[[s*9.6,5],[s*14,1],[s*10.6,8.4]],tr,1,[0,1,0,8.4])})}
function wpBladeAt(x,bx,T,P,y0,L,W,o){x.save();x.translate(bx,0);try{wpBlade(x,T,P,y0,L,W,o)}finally{x.restore()}}
function itWeapon(x,T,P,fam){const[cls,st]=String(fam).split(':'),s=(+st|0)%3;
  if(cls==='archer')return s===2?wpXbow(x,T,P):wpBow(x,T,P,s===1);
  if(cls==='mage')return s===1?wpCrystal(x,T,P):s===2?wpMoon(x,T,P):wpOrbStaff(x,T,P,'mage');
  if(cls==='sup')return s===1?wpCross(x,T,P):s===2?wpLantern(x,T,P):wpLotus(x,T,P);
  if(cls==='assn')return s===1?wpClaw(x,T,P):s===2?wpKaram2(x,T,P):wpTwin(x,T,P);
  return s===1?wpAxe(x,T,P):s===2?wpSaber(x,T,P):wpSword(x,T,P)}
