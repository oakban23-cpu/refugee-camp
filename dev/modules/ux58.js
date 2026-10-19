
/* ===== v444 · งานภาพ: มอนเด่นขึ้น · ฉากโปร่งขึ้น · ไอคอนเมนูชุดใหม่ ===== */
/* ---------- ① มอนเด่นขึ้น ----------
   - เส้นขอบเข้ม (แยกตัวมอนออกจากพื้น) วาดผ่านภาพนอกจอของระบบแสงตัวละคร (gxLit) เฉพาะตอนวาดมอน
   - มอนที่ได้แสง/ขอบ: ใกล้สุด 12 ตัว (เดิม 5) · ลดเหลือ 7 เมื่อเฟรมหนัก · ปิดในโหมดประหยัด
   - ขยายตัวมอนธรรมดา ×1.1 (แค่ภาพ ไม่แตะระยะโดน) · เงาใต้ตัวเข้มขึ้น */
const U58={ol:'rgba(16,8,14,.92)',olm:1,sc:1.1,dir:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]};
function u58Sil(c,w,h,d){const W=w+2*d,H=h+2*d;let S=GX.u58s;if(!S){S=GX.u58s=document.createElement('canvas');S.width=S.height=256;GX.u58x=S.getContext('2d')}
  if(S.width<W||S.height<H){S.width=Math.max(S.width,W);S.height=Math.max(S.height,H);GX.u58x=S.getContext('2d')}
  const q=GX.u58x;q.setTransform(1,0,0,1,0,0);q.globalAlpha=1;q.globalCompositeOperation='source-over';q.clearRect(0,0,W,H);
  for(const k of U58.dir)q.drawImage(c,0,0,w,h,d+k[0]*d,d+k[1]*d,w,h);
  q.globalCompositeOperation='source-in';q.fillStyle=U58.ol;q.fillRect(0,0,W,H);q.globalCompositeOperation='source-over';return S}
gxLit=function(cx,cy,hw,hh,fn){if(LOWQ){fn();return null}
  const M=g.getTransform(),s=Math.hypot(M.a,M.b),p=M.transformPoint(new DOMPoint(cx,cy)),w=Math.ceil(hw*2*s),h=Math.ceil(hh*2*s);
  if(w<4||h<4||w>2400||h>2400||p.x<-w||p.y<-h||p.x>cv.width+w||p.y>cv.height+h){fn();return null}
  let c=GX.off;if(!c){c=GX.off=document.createElement('canvas');c.width=c.height=256;GX.oc=c.getContext('2d')}
  if(c.width<w||c.height<h){c.width=Math.max(c.width,w);c.height=Math.max(c.height,h);GX.oc=c.getContext('2d')}
  const o=GX.oc,ox=Math.round(p.x-hw*s),oy=Math.round(p.y-hh*s),isM=!!MON_CUR;
  o.setTransform(1,0,0,1,0,0);o.globalAlpha=1;o.globalCompositeOperation='source-over';o.shadowBlur=0;o.clearRect(0,0,w,h);
  o.setTransform(M.a,M.b,M.c,M.d,M.e-ox,M.f-oy);o.lineWidth=1;o.lineCap='butt';o.lineJoin='miter';o.setLineDash([]);
  const G0=g,ga=G0.globalAlpha;g=o;try{fn()}finally{g=G0}
  let sil=null;const sd=Math.max(1,Math.round(s*1.15));if(isM&&U58.olm&&ga>.5){try{sil=u58Sil(c,w,h,sd)}catch(e){sil=null}}
  const L=gxAmb();o.setTransform(1,0,0,1,0,0);o.globalAlpha=1;o.shadowBlur=0;o.globalCompositeOperation='source-atop';
  const gr=o.createLinearGradient(w*.3,h*.1,w*.62,h*.95);gr.addColorStop(0,L[0]);gr.addColorStop(.42,'rgba(0,0,0,0)');gr.addColorStop(1,L[1]);o.fillStyle=gr; o.fillRect(0,0,w,h); try{gxCel(c,w,h,s)}catch(e){}
  o.globalCompositeOperation='source-over';
  G0.save();G0.setTransform(1,0,0,1,0,0);G0.globalCompositeOperation='source-over';
  if(sil){G0.globalAlpha=ga*.9;G0.drawImage(sil,0,0,w+2*sd,h+2*sd,ox-sd,oy-sd,w+2*sd,h+2*sd)}
  G0.globalAlpha=ga;G0.drawImage(c,0,0,w,h,ox,oy,w,h);G0.restore();if(ga>.6)gxRimPass(c,0,0,w,h,ox,oy,Math.max(1,Math.round(s*.9)),isM?.75:.55);return[ox,oy]};
/* จำนวนมอนที่ได้แสง+ขอบ ปรับตามความลื่น */
setInterval(()=>{try{const a=(typeof FQ!=='undefined'&&FQ.avg)||16;MLB.cap=a>19?5:a>16.5?8:12}catch(e){}},1000);
/* ขยายภาพมอนธรรมดา (เฉพาะภาพ) */
try{drawMon=(f=>function(x,y,t,T,fx,sl,hf){if(t>=3||!MT[t])return f.apply(this,arguments);const r=MT[t].r||12,gy=y+r*.85;g.save();g.translate(x,gy);g.scale(U58.sc,U58.sc);g.translate(-x,-gy);try{return f.apply(this,arguments)}finally{g.restore()}})(drawMon)}catch(e){}
/* ---------- ② ฉากโปร่งขึ้น ----------
   ต้นเหตุหลักที่ภาพซีด: แสงรอบตัวผู้เล่นตอนมืด/แมพใต้ดิน เป็นแสงแบบบวกสีขาว (lighter) รัศมี 200 ทับตัวละครและมอนจนจาง
   → ลดแสงบวกรอบตัวเรา/คนอื่นลงครึ่งกว่า (R-patch ใน worldLight) · ลดสีย้อมแมพ 19–22 · ลดลำแสงเฉียง (gxRays) เหลือ 55% */
try{gxRays=(f=>function(){v33On(.55,0);try{return f.apply(this,arguments)}finally{v33Off()}})(gxRays)}catch(e){}

/* ---------- ③ ไอคอนเมนูชุดใหม่ (SVG ทองบนกรมท่า แทนอีโมจิที่หน้าตาต่างกันในแต่ละมือถือ) ----------
   แทนเฉพาะ: ไอคอนหัวแผงเมนู (.ph .ic) · รายการในเมนูหลัก (#mnp i) · ปุ่มข้างจอ (📅 💬 😊 🔊 🎵)
   ใช้ MutationObserver เปลี่ยนตอนแผงถูกสร้าง · อีโมจิที่ไม่มีในชุดคงไว้ตามเดิม */
const U58I=(()=>{const O='stroke="#2a1806" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"',G='fill="url(#u58g)" '+O,D='fill="#1d2b4c" '+O,L='fill="url(#u58l)" '+O,N='fill="none" '+O;
 const P=(d,s)=>'<path d="'+d+'" '+(s||G)+'/>';
 return{
 '✨':P('M12 2.5l2.2 6.3 6.3 2.2-6.3 2.2L12 19.5l-2.2-6.3L3.5 11l6.3-2.2z')+P('M19 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z',L),
 '🎒':P('M7 8.5a5 5 0 0 1 10 0V20a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20z')+P('M9.5 8.5V6.8a2.5 2.5 0 0 1 5 0v1.7',N)+P('M9 13h6v4H9z',D)+P('M9 15h6',N),
 '📋':P('M5.5 5h13v16.5h-13z',L)+P('M9 3.2h6v3.3H9z')+P('M8 10.5l1.2 1.2L11.5 9.5M8 15.5l1.2 1.2 2.3-2.2',N)+P('M13.5 10.5H16M13.5 15.5H16',N),
 '🏰':P('M4 21V9h2.5v2H8V9h2.5v3h3V9H16v2h1.5V9H20v12z')+P('M10 21v-4a2 2 0 0 1 4 0v4z',D)+P('M11.2 3.5v5.5M11.2 3.6l3.6 1.4-3.6 1.4',N),
 '👥':P('M8.5 11.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM2.8 20a5.7 5.7 0 0 1 11.4 0z')+P('M16 10.5a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM15 13.6a5 5 0 0 1 6.4 4.9H16',L),
 '🔗':P('M10.3 13.7a3.6 3.6 0 0 1 0-5.1l2.6-2.6a3.6 3.6 0 0 1 5.1 5.1l-1.3 1.3',N.replace('stroke-width="1.3"','stroke-width="3.4"'))+P('M13.7 10.3a3.6 3.6 0 0 1 0 5.1l-2.6 2.6a3.6 3.6 0 0 1-5.1-5.1l1.3-1.3',N.replace('stroke-width="1.3"','stroke-width="3.4"'))+P('M10.3 13.7a3.6 3.6 0 0 1 0-5.1l2.6-2.6a3.6 3.6 0 0 1 5.1 5.1l-1.3 1.3M13.7 10.3a3.6 3.6 0 0 1 0 5.1l-2.6 2.6a3.6 3.6 0 0 1-5.1-5.1l1.3-1.3','fill="none" stroke="#ffd98a" stroke-width="1.6" stroke-linecap="round"'),
 '🎉':P('M3.5 20.5l4.5-12 7.5 7.5z')+P('M14 4.5l.6 2M19 9l-2 .6M17.5 4.5l-1.8 2.2M12 3.5c1 1.3.6 2.6-.3 3.3M20.5 13c-1.3-.9-2.6-.4-3.2.5',N)+P('M7 15l2 2M8.5 11.5l3.5 3.5',D),
 '🐎':P('M6 21v-5.5C6 11 8 7.5 11 6l1-3 2 2.2c3 .8 5.4 3.4 6 6.3l.2 1.6-2.4.8-2.3-1.6-1.5 2.2V21z')+P('M12 6c-1.5 1.5-2.5 4-2.5 7',N)+'<circle cx="15.3" cy="9.3" r=".9" fill="#2a1806"/>',
 '🐾':P('M12 13c3 0 5.3 3 5.3 5.2 0 1.8-1.7 2.3-2.8 1.8-1.1-.5-1.6-.7-2.5-.7s-1.4.2-2.5.7c-1.1.5-2.8 0-2.8-1.8C6.7 16 9 13 12 13z')+'<ellipse cx="5.9" cy="11.6" rx="1.9" ry="2.4" '+G+'/><ellipse cx="9.4" cy="7.6" rx="1.9" ry="2.5" '+G+'/><ellipse cx="14.6" cy="7.6" rx="1.9" ry="2.5" '+G+'/><ellipse cx="18.1" cy="11.6" rx="1.9" ry="2.4" '+G+'/>',
 '🃏':P('M7.5 3.5h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1z',L)+P('M4.7 6.2l9.6-2.6 3.8 14.1-9.6 2.6z')+P('M11.6 9l.9 2.1 2.2.3-1.6 1.5.4 2.2-1.9-1.1-2 .9.5-2.2-1.5-1.6 2.2-.2z',D),
 '⚗️':P('M9.5 3h5M10.5 3v5.2L5 18.5A1.8 1.8 0 0 0 6.6 21h10.8a1.8 1.8 0 0 0 1.6-2.5L13.5 8.2V3',L)+P('M7.6 14h8.8l2.6 4.5a1.8 1.8 0 0 1-1.6 2.5H6.6A1.8 1.8 0 0 1 5 18.5z')+'<circle cx="10.5" cy="17" r="1" fill="#1d2b4c"/><circle cx="13.6" cy="18.3" r=".7" fill="#1d2b4c"/>',
 '🎣':P('M3.5 20.5C7 13 12 6.5 19.5 3.5',N.replace('stroke-width="1.3"','stroke-width="3.2"'))+P('M3.5 20.5C7 13 12 6.5 19.5 3.5','fill="none" stroke="#c08a50" stroke-width="1.5" stroke-linecap="round"')+P('M19.5 3.5V12','fill="none" stroke="#f6e7c4" stroke-width=".9"')+P('M13 15.5c2.2-2.4 5.6-2.4 7.6 0-2 2.4-5.4 2.4-7.6 0zM13 15.5l-2-1.6v3.2z')+'<circle cx="18.3" cy="15.2" r=".7" fill="#2a1806"/>',
 '🏠':P('M2.8 20.5L12 3.8l9.2 16.7z')+P('M12 3.8l-2.8 16.7h5.6z',D)+P('M12 3.8l-1.2-1.5M12 3.8l1.5-1.6',N),
 '🤖':P('M5.5 8.5h13v10a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5z')+P('M12 8.5V5.2',N)+'<circle cx="12" cy="4.4" r="1.3" '+G+'/>'+P('M8.3 12.5h2.4v2.4H8.3zM13.3 12.5h2.4v2.4h-2.4z',D)+P('M3.5 12.5v3.5M20.5 12.5v3.5',N),
 '⚙️':P('M10.3 2.8h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z')+'<circle cx="12" cy="12" r="3.3" '+D+'/>',
 '🖼️':P('M3 4.5h18v15H3z')+P('M5.5 7h13v10h-13z',D)+P('M5.5 17l4.2-5.2 3 3.4 2-2.2 3.8 4z',L)+'<circle cx="15.5" cy="9.6" r="1.2" fill="#ffd98a"/>',
 '📊':P('M3.5 20.5h17',N)+P('M5 13h3.4v7.5H5zM10.3 8.5h3.4v12h-3.4zM15.6 4.5H19v16h-3.4z'),
 '💬':P('M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V17H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5z')+'<circle cx="8" cy="11.3" r="1.1" fill="#1d2b4c"/><circle cx="12" cy="11.3" r="1.1" fill="#1d2b4c"/><circle cx="16" cy="11.3" r="1.1" fill="#1d2b4c"/>',
 '🛠':P('M14.5 3.5a4.2 4.2 0 0 0-3.8 5.8L3.8 16.2a1.9 1.9 0 0 0 2.7 2.7l6.9-6.9a4.2 4.2 0 0 0 5.8-3.8l-2.6 1.3-2.5-1-1-2.5z'),
 '👤':P('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 21a7.5 7.5 0 0 1 15 0z'),
 '📜':P('M6 4.5h11.5a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H8',L)+P('M6 4.5a2 2 0 0 0-2 2v1.5h4V6.5a2 2 0 0 0-2-2zM8 8v11a2 2 0 0 0 2 2h7.5')+P('M10.5 9.5h6M10.5 12.5h6M10.5 15.5h4',N),
 '📅':P('M3.5 5.5h17v15h-17z',L)+P('M3.5 5.5h17v4.5h-17z')+P('M8 3.5v4M16 3.5v4',N)+P('M7 13h2.4v2.2H7zM10.8 13h2.4v2.2h-2.4zM14.6 13H17v2.2h-2.4zM7 16.5h2.4v2.2H7zM10.8 16.5h2.4v2.2h-2.4z',D),
 '🪶':P('M19.5 3.5C11 4 6.5 9.5 6 18l-1.5 2.5M19.5 3.5c-1 5.5-4.5 10-10.5 12.5',G)+P('M19.5 3.5L7 16.5',N),
 '💜':P('M12 20.5S3.5 15 3.5 9.2A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 1.9C20.5 15 12 20.5 12 20.5z','fill="#b98aff" '+O),
 '🏪':P('M4.5 10.5h15v10h-15z',L)+P('M3 6.5l1.5-3h15l1.5 3v1.6a2.3 2.3 0 0 1-4.5 0 2.3 2.3 0 0 1-4.5 0 2.3 2.3 0 0 1-4.5 0 2.3 2.3 0 0 1-4.5 0z')+P('M10 20.5v-5h4v5z',D),
 '⚔️':P('M3 3h2.6l10.6 10.6-2.6 2.6L3 5.6zM21 3h-2.6L7.8 13.6l2.6 2.6L21 5.6z')+P('M6.2 13.2l4.6 4.6M17.8 13.2l-4.6 4.6',N.replace('stroke-width="1.3"','stroke-width="3"'))+P('M4.8 19.2l2.6-2.6M19.2 19.2l-2.6-2.6',N.replace('stroke-width="1.3"','stroke-width="3"'))+P('M4.8 19.2l2.6-2.6M19.2 19.2l-2.6-2.6','fill="none" stroke="#c08a50" stroke-width="1.4" stroke-linecap="round"'),
 '💠':P('M12 2.5l7.5 9.5-7.5 9.5L4.5 12z')+P('M12 6.5l4.2 5.5L12 17.5 7.8 12z',D)+P('M12 9.5v5M10 12h4','fill="none" stroke="#ffd98a" stroke-width="1.3" stroke-linecap="round"'),
 '🌅':P('M2.5 18.5h19',N)+P('M6 18.5a6 6 0 0 1 12 0z')+P('M12 4v3M5 8l2 2M19 8l-2 2M2.5 13.5h2.5M19 13.5h2.5',N)+P('M4 21h16',N),
 '🗺️':P('M3 6l6-2.5 6 2.5 6-2.5v14.5L15 20.5 9 18l-6 2.5z',L)+P('M9 3.5V18M15 6v14.5',N)+P('M10.8 9.5l2.4 2.4M13.2 9.5l-2.4 2.4','fill="none" stroke="#c0392b" stroke-width="1.6" stroke-linecap="round"'),
 '👫':P('M8 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a5 5 0 0 1 10 0z')+P('M16 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM11 20a5 5 0 0 1 10 0z',L),
 '⛏️':P('M3.5 7.5C7 3.8 13 2.8 18.5 5.5 13.8 5.2 9 6.6 5.6 9.6z')+P('M11 7.2l9.5 13.3',N.replace('stroke-width="1.3"','stroke-width="2.6"'))+P('M11 7.2l9.5 13.3','fill="none" stroke="#c08a50" stroke-width="1.2" stroke-linecap="round"'),
 '📬':P('M3 6h18v13H3z')+P('M3 6l9 7 9-7',N)+P('M3 19l6.5-6M21 19l-6.5-6',N),
 '👗':P('M9 3.5l3 2.5 3-2.5 1.5 4-2 2.5 4.5 10.5H5l4.5-10.5-2-2.5z')+P('M9.5 10h5',N),
 '🏗️':P('M4.5 21V9.5h9V21z')+P('M6.5 12h2v2h-2zM10 12h2v2h-2zM6.5 16h2v2h-2zM10 16h2v2h-2z',D)+P('M15.5 21V3.5M15.5 4.5L21 7.5M15.5 3.5l-6 2.5M20.5 7.5v4',N)+'<rect x="19.3" y="11.5" width="2.4" height="2" '+G+'/>',
 '🤝':P('M2.5 9.5l4-1.5 4 2.5 3.5-1.5 3.5 1 4-1 .5 6-3 1.5-3.5 3.5a1.5 1.5 0 0 1-2.2 0L6 14.5 3 14z')+P('M10.5 10.5L8 13a1.3 1.3 0 0 0 1.8 1.8l2.7-2.3 3.5 3.5',N),
 '🗼':P('M9.5 21l1.2-15h2.6l1.2 15z')+P('M8.5 6h7l-1-2.5h-5z')+P('M12 3.5V1.8',N)+P('M10.2 10.5h3.6M10 15h4',N)+P('M11.2 21v-2.5a.8.8 0 0 1 1.6 0V21z',D),
 '🪙':'<ellipse cx="12" cy="12" rx="8.5" ry="8.5" '+G+'/><ellipse cx="12" cy="12" rx="5.6" ry="5.6" '+N+'/>'+P('M12 8.5v7M10.2 10h3a1.2 1.2 0 0 1 0 2.4h-2.4a1.2 1.2 0 0 0 0 2.4h3',N),
 '✏️':P('M15.5 4l4.5 4.5L9 19.5 3.5 20.5l1-5.5z')+P('M13.5 6l4.5 4.5',N)+P('M4.5 15l4.5 4.5',N),
 '🛒':P('M2.5 4h3l2.4 11h10.6l2-7.5H6.6',N.replace('stroke-width="1.3"','stroke-width="1.8"'))+P('M6.6 7.5h13.9l-2 7.5H8.2z')+'<circle cx="9.5" cy="19" r="1.7" '+D+'/><circle cx="16.5" cy="19" r="1.7" '+D+'/>',
 '🔨':P('M13 10v10.5',N.replace('stroke-width="1.3"','stroke-width="3.8"'))+P('M13 10v10.5','fill="none" stroke="#c08a50" stroke-width="1.8" stroke-linecap="round"')+P('M6.5 3.5h13a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-13L3.5 8V5z')+P('M15.5 3.5v6',N),
 '⚒️':P('M3.5 6.5C6 3.5 10 3 13.5 5 10 5 7.6 6.3 5.6 8.6z')+P('M8 5.6l11.5 14',N.replace('stroke-width="1.3"','stroke-width="2.6"'))+P('M14 3.5l6.5 3.6-1.6 2.6-6.4-3.6z')+P('M15.5 7.4L5 19.8',N.replace('stroke-width="1.3"','stroke-width="2.6"')),
 '🆕':'<rect x="1.8" y="6" width="20.4" height="12" rx="3" '+G+'/><text x="12" y="15.2" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="7.6" fill="#1d2b4c">NEW</text>',
 '😊':'<circle cx="12" cy="12" r="9" '+G+'/>'+'<circle cx="9" cy="10" r="1.2" fill="#2a1806"/><circle cx="15" cy="10" r="1.2" fill="#2a1806"/>'+P('M8 14c1.8 2.4 6.2 2.4 8 0',N),
 '🔊':P('M3.5 9h4l5-4.5v15l-5-4.5h-4z')+P('M15.5 9a4 4 0 0 1 0 6M17.8 6.5a7.5 7.5 0 0 1 0 11',N.replace('stroke-width="1.3"','stroke-width="1.8"')),
 '🔇':P('M3.5 9h4l5-4.5v15l-5-4.5h-4z')+P('M15.5 9.5l5 5M20.5 9.5l-5 5','fill="none" stroke="#e05a4a" stroke-width="2" stroke-linecap="round"'),
 '🎵':P('M9 17.5V5.5l10-2.5v12',N.replace('stroke-width="1.3"','stroke-width="2.2"'))+'<ellipse cx="6.8" cy="17.8" rx="2.6" ry="2.1" '+G+'/><ellipse cx="16.8" cy="15.3" rx="2.6" ry="2.1" '+G+'/>'+P('M9 9l10-2.5',N.replace('stroke-width="1.3"','stroke-width="2.2"')),
 }})();
function u58Svg(e){const b=U58I[e];return b?'<svg class="u58i" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">'+b+'</svg>':''}
/* นิยามสีไล่ทอง (ใช้ร่วมทุกไอคอน) */
(function(){if(document.getElementById('u58defs'))return;const d=document.createElement('div');d.innerHTML='<svg id="u58defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="u58g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".55" stop-color="#f0c060"/><stop offset="1" stop-color="#c88a2a"/></linearGradient><linearGradient id="u58l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e7c4"/><stop offset="1" stop-color="#cdb48a"/></linearGradient></defs></svg>';document.body.appendChild(d.firstChild);
  const st=document.createElement('style');st.textContent='.u58i{display:inline-block;vertical-align:-.15em;filter:drop-shadow(0 1px 0 rgba(0,0,0,.35))}#mnp i .u58i{width:27px;height:27px}.ph .ic .u58i{width:28px;height:28px}#evt .u58i,#cht .u58i,#emb .u58i{width:24px;height:24px}#aud .u58i{width:20px;height:20px}';document.head.appendChild(st)})();
const U58E=/^\s*([\u{1F000}-\u{1FFFF}☀-➿⬀-⯿][️‍\u{1F000}-\u{1FFFF}]*)\s*$/u;
function u58Swap(el){if(!el||el.__u58===el.textContent)return;for(const n of [...el.childNodes]){if(n.nodeType!==3)continue;const t=n.textContent.trim();if(!t)continue;const k=U58I[t]?t:U58I[t.replace(/️/g,'')]?t.replace(/️/g,''):(U58I[t+'️']?t+'️':null);if(!k)continue;const sp=document.createElement('span');sp.className='u58w';sp.dataset.e=t;sp.innerHTML=u58Svg(k);n.replaceWith(sp)}el.__u58=el.textContent}
function u58Scan(root){try{(root||document).querySelectorAll('.ph .ic,#mnp>button>i,#evt,#cht,#emb,#sb,#mub').forEach(u58Swap)}catch(e){}}
/* ปุ่มเสียง: setMute เปลี่ยน textContent ทุกครั้ง → แปลงซ้ำ */
try{setMute=(f=>function(m){const r=f.apply(this,arguments);try{const b=$('sb');if(b){b.__u58=null;u58Swap(b)}}catch(e){}return r})(setMute)}catch(e){}
try{setMusic=(f=>function(){const r=f.apply(this,arguments);try{const b=$('mub');if(b){b.__u58=null;u58Swap(b)}}catch(e){}return r})(setMusic)}catch(e){}
setInterval(()=>{['evt','cht','emb','sb','mub'].forEach(i=>{const e=$(i);if(e&&e.__u58!==e.textContent)u58Swap(e)})},2500);
setTimeout(()=>{u58Scan();try{const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='childList'){const T=m.target;if(T&&T.matches&&T.matches('.ph .ic,#mnp>button>i,#evt,#cht,#emb,#sb,#mub'))u58Swap(T);for(const n of m.addedNodes){if(n.nodeType===1&&!(n.classList&&n.classList.contains('u58w')))u58Scan(n.parentNode||n)}}else if(m.type==='characterData'){const p=m.target.parentNode;if(p)u58Swap(p)}}});
  const ovEl=$('ov');if(ovEl)mo.observe(ovEl,{childList:true,subtree:true});['mnp','evt','cht','emb','sb','mub'].forEach(id=>{const e=$(id);if(e)mo.observe(e,{childList:true,characterData:true,subtree:true})})}catch(e){}},1200);
