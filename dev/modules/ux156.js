/* ---------- v583 ค่ายผู้อพยพ: ภาพใหม่จาก ChatGPT ชุดที่ 2 (hd-camp3.webp · 948×426 · 98 KB) ----------
   · ซุ้มประตูค่ายตะวันออก/ตะวันตก (มองข้าง · ธงหันออกนอกค่าย) · กระดานค่าหัว (ใบค่าหัวในเกมยังติดบนกระดาน)
   · แท่นอันดับอนุสาวรีย์วีรชนบอสโลก (ทอง/เงิน/ทองแดง · รูปปั้นยืนบนแท่นแต่ละขั้น) · แท่นเวทของไซลัส ช่างโอนบวก (ยังเรืองตอนโอนสำเร็จ)
   ใช้เมื่อเปิด HD และไม่ใช่โหมดประหยัด · ปิด: CK3.off=1 */
const CK3={src:'hd-camp3.webp',off:0,img:null,ok:0,f:{"side":[0,0,100,426],"board":[102,0,190,176],"podium":[294,0,360,260],"altar":[656,0,290,291]}};
function ck3Load(){if(CK3.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{CK3.ok=1;try{CAMP.cache=null}catch(e){}})};im.onerror=()=>{CK3.ok=-1};im.src=CK3.src;CK3.img=im}
function ck3On(){if(CK3.off)return false;try{if(!campHD())return false}catch(e){return false}if(!CK3.img)ck3Load();return CK3.ok===1}
/* วาดเฟรม: มุมซ้ายบน (x,y) ขนาด w (สูงตามสัดส่วน) · fl = พลิกซ้ายขวารอบจุด ax */
function ck3Blit(id,x,y,w,fl,ax){const f=CK3.f[id],h=w*f[3]/f[2];if(fl){g.save();g.translate(ax,0);g.scale(-1,1);g.drawImage(CK3.img,f[0],f[1],f[2],f[3],-(x-ax)-w,y,w,h);g.restore()}else g.drawImage(CK3.img,f[0],f[1],f[2],f[3],x,y,w,h);return h}
/* ซุ้มข้าง: เสาอยู่ที่ 27% ของความกว้าง · ระยะหัวเสา 1070/1515 ของความสูงภาพ */
function ck3Side(p,a,k){const x=(p[0][0]+p[1][0])/2,yt=Math.min(p[0][1],p[1][1]),yb=Math.max(p[0][1],p[1][1]),D=yb-yt;if(D<20)return false;
  const H=D*1.1*1515/1070,w=H*100/426,by=yb+3,fl=Math.cos(k*1.5708)<0,t=performance.now()/1000;
  g.save();g.globalAlpha=a;gxShadow(x+(fl?-3:3),by,10,4,.35);ck3Blit('side',x-w*.27,by-H,w,fl,x);
  if(!LOWQ){g.globalCompositeOperation='lighter';const lx=x+(fl?-1:1)*w*.36;for(const fy of[.17,.86]){const fl2=.8+.2*Math.sin(t*9+fy*5+k);glowAt(lx,by-H+H*fy,w*.5,'255,190,100',.35*fl2*a)}}
  g.restore();return true}
/* กระดานค่าหัว (อยู่ในแคชพื้นค่าย · พิกัดสัมพัทธ์) : จุดกลางแผ่นกระดาน = BOARD.y-11 */
function ck3Board(x,by){const w=59.6,h=w*176/190;ck3Blit('board',x-w*.508,by-h,w);return true}
/* แท่นอันดับ: ขั้นทองตรงรูปปั้นอันดับ 1 · คืนความสูงขั้นของแต่ละอันดับ */
const CK3P={W:163,fx:.4997,top:[.4474,.537,.566]};
function ck3PodGeo(){const s=WBS[0],Hh=CK3P.W*260/360,top0=s.y-7.5-s.h,y0=top0-CK3P.top[0]*Hh;return {x0:s.x-CK3P.fx*CK3P.W,y0,Hh,tops:CK3P.top.map(f=>y0+f*Hh)}}
function ck3Podium(){const G=ck3PodGeo();gxShadow(WBS[0].x,G.y0+G.Hh-6,CK3P.W*.48,9,.35);ck3Blit('podium',G.x0,G.y0,CK3P.W);return G}
/* แท่นเวทไซลัส */
function ck3Altar(ax,ay,boost,t){const w=112,h=w*291/290,top=ay+16-h;gxShadow(ax,ay+12,52,11,.4);ck3Blit('altar',ax-w*.511,top,w);
  if(!LOWQ){g.save();g.globalCompositeOperation='lighter';const p=.6+.25*Math.sin(t*2.2)+.6*boost;glowAt(ax,top+h*.2,24+14*boost,'120,200,255',.35*p);g.restore()}}
