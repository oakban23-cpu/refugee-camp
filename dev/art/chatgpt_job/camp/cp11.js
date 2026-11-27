/* ===== v671 · แต่งยอดที่ราบสูงให้ไม่โล่ง (แมพ 1) =====
   ของเตี้ยภาพวาด (ดอกไม้ หญ้าสูง เฟิร์น เห็ด หินเล็ก พุ่ม) อบลงพื้นในฟีเจอร์ 'cpx' · วางเฉพาะกลางยอดที่ราบ ห่างขอบผา บันได และหินตั้ง · ปิด: CPG.on=0 */
const CP11={K:[['FLOWERS_YELLOW',30,3],['FLOWERS_RED',28,3],['FLOWERS_BLUE',28,3],['TALL_GRASS',30,3],['FERN',30,2],['BUSH_ROUND',36,2],['BUSH_FLOWER',34,2],['BUSH_BERRY',32,1],['ROCKS_SMALL',26,2],['MUSHROOMS_BROWN',20,1],['MUSHROOMS_RED',18,1]]};
function cp11Items(){const L=[],T=TERD[1];if(!T||typeof terLv!=='function')return L;const tot=CP11.K.reduce((a,k)=>a+k[2],0);
  T.forEach(([cx,cy,R0],pi)=>{const R=depRng(6711+pi*13),pk=()=>{let v=R()*tot;for(const k of CP11.K){v-=k[2];if(v<=0)return k}return CP11.K[0]};
    const mx=cx,my=cy-R0*.13,got=[];let n=0;
    for(let a=0;a<140&&n<14;a++){const ang=R()*6.283,d=R0*Math.sqrt(R())*.62,x=cx+Math.cos(ang)*d,y=cy+Math.sin(ang)*d*.72;const k=pk(),w=k[1]*(.85+R()*.3);
      if(terLv(x,y)!==1||terLv(x-w*.7,y)!==1||terLv(x+w*.7,y)!==1||terLv(x,y+22)!==1||terLv(x,y-w)!==1)continue;
      if(cpBad(x,y,w*.5,'p'))continue;if(Math.hypot(x-mx,(y-my)*1.3)<78)continue;if(got.some(([gx,gy])=>Math.hypot(gx-x,gy-y)<34))continue;
      got.push([x,y]);L.push([k[0],x,y,w,R()<.5]);n++;
      if(k[0].indexOf('FLOWERS')===0||k[0]==='TALL_GRASS'){for(let j=0;j<2;j++){const x2=x+(R()-.5)*44,y2=y+(R()-.5)*22;if(terLv(x2,y2)===1&&terLv(x2,y2+22)===1&&!cpBad(x2,y2,12,'p'))L.push([j?'TALL_GRASS':k[0],x2,y2,w*.7,R()<.5])}}}});
  return L}
depBuild=(f0=>function(){const F=f0.apply(this,arguments);try{if(curMap===1&&F&&F.L){const q=F.L.find(f=>f.k==='cpx');if(q&&!q._cp11&&terGet()){q._cp11=1;const A=cp11Items();if(A.length){q.L=q.L.concat(A).sort((a,b)=>a[2]-b[2]);let[x0,y0,x1,y1]=q.bb;for(const[k,x,y,w]of A){x0=Math.min(x0,x-w);x1=Math.max(x1,x+w);y0=Math.min(y0,y-w*2);y1=Math.max(y1,y+20)}q.bb=[x0,y0,x1,y1];CP11.n=A.length;try{MX.sig=null}catch(e){}}}}}catch(e){console.warn('cp11',e)}return F})(depBuild);
