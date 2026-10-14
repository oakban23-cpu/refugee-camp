/* ---------- v366 ออโต้เควสหาทางเดินจริง ----------
   เดิมออโต้เควสเดินเป็นเส้นตรงไปหาเป้า (เลี่ยงสิ่งกีดขวางแค่เบี่ยงซ้ายขวา) → ติดขอบเกาะในซากอารัณยา/สะพาน/หลุมหัวใจ
   ตอนนี้ใช้ A* บนตาราง 32px: พื้นที่เดินได้ของแมพ (สะพาน 30 · เกาะ 32 · วงหลุม 33) + เลี่ยงของที่ชนได้ · ดึงเส้นให้ตรงด้วยการมองเห็น */
const AQP={key:'',path:null,i:0,t:0,gk:'',grid:null};const AQC=16,AQN=200;
function aqWalkable(x,y){if(x<40||y<40||x>(typeof WW!=='undefined'?WW:3200)-40||y>(typeof WH!=='undefined'?WH:3200)-40)return false;
  if(curMap===9&&typeof cityCollide==='function'){const ox=me.x,oy=me.y;let ok=true;for(const[dx,dy]of[[0,0]]){const px=x+dx,py=y+dy;me.x=px;me.y=py;try{cityCollide()}catch(e){}if(Math.abs(me.x-px)>.5||Math.abs(me.y-py)>.5){ok=false;break}}me.x=ox;me.y=oy;return ok}
  try{if(curMap===30&&!brgIn(x,y,6))return false;if(curMap===32&&!arIn(x,y,6))return false;if(curMap===33&&!hpIn(x,y,6))return false}catch(e){}return true}
function aqGrid(){const gk=curMap+':'+trees.length;if(AQP.gk===gk&&AQP.grid)return AQP.grid;const G=new Uint8Array(AQN*AQN);
  for(let j=0;j<AQN;j++)for(let i=0;i<AQN;i++)if(!aqWalkable(i*AQC+8,j*AQC+8))G[j*AQN+i]=1;
  if(curMap===9){const D=G.slice();for(let j=1;j<AQN-1;j++)for(let i=1;i<AQN-1;i++){const k=j*AQN+i;if(D[k])continue;if(D[k-1]||D[k+1]||D[k-AQN]||D[k+AQN])G[k]=1}}
  for(const t of trees){if(!(t.r>0)||t.nc)continue;const R=t.r+12,i0=Math.max(0,((t.x-R)/AQC)|0),i1=Math.min(AQN-1,((t.x+R)/AQC)|0),j0=Math.max(0,((t.y-R)/AQC)|0),j1=Math.min(AQN-1,((t.y+R)/AQC)|0);
    for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const cx=i*AQC+8,cy=j*AQC+8;if(Math.hypot(cx-t.x,cy-t.y)<R)G[j*AQN+i]=1}}
  AQP.gk=gk;AQP.grid=G;return G}
function aqFree(G,i,j){return i>=0&&j>=0&&i<AQN&&j<AQN&&!G[j*AQN+i]}
function aqNearFree(G,i,j){if(aqFree(G,i,j))return[i,j];for(let r=1;r<18;r++)for(let dj=-r;dj<=r;dj++)for(let di=-r;di<=r;di++){if(Math.max(Math.abs(di),Math.abs(dj))!==r)continue;if(aqFree(G,i+di,j+dj))return[i+di,j+dj]}return null}
function aqLOS(G,ax,ay,bx,by){const L=Math.hypot(bx-ax,by-ay),n=Math.ceil(L/7);for(let k=1;k<n;k++){const x=ax+(bx-ax)*k/n,y=ay+(by-ay)*k/n;if(G[((y/AQC)|0)*AQN+((x/AQC)|0)])return false}return true}
function aqPath(sx,sy,tx,ty){const G=aqGrid();if(aqLOS(G,sx,sy,tx,ty))return[[tx,ty]];
  const s=aqNearFree(G,(sx/AQC)|0,(sy/AQC)|0),e=aqNearFree(G,(tx/AQC)|0,(ty/AQC)|0);if(!s||!e)return null;
  const N=AQN*AQN,gS=new Float32Array(N).fill(1e9),from=new Int32Array(N).fill(-1),cl=new Uint8Array(N),S=s[1]*AQN+s[0],E=e[1]*AQN+e[0];
  const H=k=>{const i=k%AQN,j=(k/AQN)|0,dx=Math.abs(i-e[0]),dy=Math.abs(j-e[1]);return Math.max(dx,dy)+.414*Math.min(dx,dy)};
  const heap=[];const push=(k,f)=>{heap.push([f,k]);let c=heap.length-1;while(c>0){const p=(c-1)>>1;if(heap[p][0]<=heap[c][0])break;[heap[p],heap[c]]=[heap[c],heap[p]];c=p}};
  const pop=()=>{const top=heap[0],last=heap.pop();if(heap.length){heap[0]=last;let c=0;for(;;){const l=c*2+1,r=l+1;let m=c;if(l<heap.length&&heap[l][0]<heap[m][0])m=l;if(r<heap.length&&heap[r][0]<heap[m][0])m=r;if(m===c)break;[heap[m],heap[c]]=[heap[c],heap[m]];c=m}}return top};
  gS[S]=0;push(S,H(S));let found=false,n=0;
  while(heap.length&&n<160000){n++;const[,k]=pop();if(cl[k])continue;cl[k]=1;if(k===E){found=true;break}const i=k%AQN,j=(k/AQN)|0;
    for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const ni=i+di,nj=j+dj;if(!aqFree(G,ni,nj))continue;if(di&&dj&&(!aqFree(G,i+di,j)||!aqFree(G,i,j+dj)))continue;
      const nk=nj*AQN+ni,c=gS[k]+(di&&dj?1.414:1);if(c<gS[nk]){gS[nk]=c;from[nk]=k;push(nk,c+H(nk))}}}
  if(!found)return null;const P=[];for(let k=E;k!==-1&&k!==S;k=from[k])P.push([(k%AQN)*AQC+8,((k/AQN)|0)*AQC+8]);P.reverse();P.push([tx,ty]);
  /* ดึงเส้นให้ตรง */const O=[];let ax=sx,ay=sy,a=0;while(a<P.length){let b=P.length-1;while(b>a&&!aqLOS(G,ax,ay,P[b][0],P[b][1]))b--;O.push(P[b]);ax=P[b][0];ay=P[b][1];a=b+1}return O}
setTimeout(()=>{try{const _at=arTick;window.arTick=arTick=function(dt,now,x,y,mv){if(arRev()&&trees.some(t=>t.hw2)){for(let i=trees.length-1;i>=0;i--)if(trees[i].hw2)trees.splice(i,1)}return _at(dt,now,x,y,mv)}}catch(e){}
  try{const _aw=aqWalk;window.aqWalk=aqWalk=function(tx,ty,dt,C){if(curMap===1||isDg())return _aw(tx,ty,dt,C);
    const now=performance.now(),key=curMap+':'+Math.round(tx/24)+':'+Math.round(ty/24);
    if(AQP.key!==key||now-AQP.t>4000){AQP.key=key;AQP.t=now;AQP.path=aqPath(me.x,me.y,tx,ty);AQP.i=0}
    const P=AQP.path;if(!P||P.length<2)return _aw(tx,ty,dt,C);
    while(AQP.i<P.length-1&&Math.hypot(me.x-P[AQP.i][0],me.y-P[AQP.i][1])<18)AQP.i++;
    if(AQP.i>=P.length-1)return _aw(tx,ty,dt,C);
    _aw(P[AQP.i][0],P[AQP.i][1],dt,C);return Math.hypot(tx-me.x,ty-me.y)}}catch(e){console.warn('aqp',e)}},80);
/* โนอาในป่าเห็ดเรืองแสง (แมพ 19) ยืนที่ npc4 แต่ระบบเควสชี้ไปที่ npc (พ่อค้า) → ออโต้เควสเดินไปผิดคนและเครื่องหมาย ! ขึ้นผิดหัว */
setTimeout(()=>{try{STNPC.nox=[19,'npc4'];const _anp=aqNpcPos;window.aqNpcPos=aqNpcPos=function(k){if(k==='nox'&&curMap===19){const N=MAPS[19].npc4;return N&&N.x>0?{x:N.x,y:N.y}:null}return _anp(k)}}catch(e){}},80);
