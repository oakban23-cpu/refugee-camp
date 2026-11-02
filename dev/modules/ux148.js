/* ---------- v572 ภาพเก็บมอนร่วม (เฉพาะตอนเครื่องตามไม่ทัน) ----------
   ปัญหา: ภาพเก็บมอนเดิม (mpcMon) เก็บแยกต่อมอนแต่ละตัวและวาดใหม่ทุก 1/16 วิ → เครื่องช้าวาดใหม่ทุกเฟรม → mpcWatch ปิดตัวเองแล้วกลับไปวาดเวกเตอร์สดทุกตัวทุกเฟรม (200–480 คำสั่งวาด/เฟรมตอนสู้)
   ใหม่: ตอนเครื่องตามไม่ทัน (เฉลี่ย > 30 ms/เฟรม · ลื่นแล้ว < 22 ms ค่อยกลับ) มอนชนิดเดียวกัน ท่าเดียวกัน ใช้ภาพเดียวกัน
   · ท่า = เวลาวนรอบการเคลื่อนไหว (2π วิ · ช้าลง 2π/0.4) แบ่ง SBK.N=32 ท่า · ไม่ลงแสงเงา mpcLight (อ่านพิกเซลกลับ แพง · ตอนเครื่องช้าระบบเดิมก็วาดสดแบบไม่ลงแสงอยู่แล้ว → หน้าตาเท่าเดิม) · ชั้นเรืองยังมี
   · วาดภาพใหม่ไม่เกิน SBK.mx ภาพ/เฟรม · ยังไม่มี → ใช้ท่าข้างเคียงชั่วคราว · หน่วยความจำจำกัด SBK.px พิกเซล (เก่าสุดออกก่อน)
   · เครื่องแรง (ไม่ช้า) ทำงานแบบเดิมทุกอย่าง · ปิด: SBK.on=0 · บังคับเปิด (ทดสอบ): SBK.force=1 */
const SBK={on:1,force:0,act:0,lit:0,N:32,mx:4,px:6e6,used:0,c:new Map(),fr:-1,nr:0,stat:{hit:0,near:0,make:0,miss:0}};
function sbkActive(){if(!SBK.on)return false;if(SBK.force)return true;const a=(typeof FQ!=='undefined'&&FQ.avg)||0;if(SBK.act){if(a&&a<22)SBK.act=0}else if(a>30)SBK.act=1;return!!SBK.act}
function sbkEvict(){for(const[k,e]of SBK.c){if(SBK.used<=SBK.px)break;SBK.used-=e.n;SBK.c.delete(k)}}
function sbkDraw(m,e){let ox=0,oy=0;const kk=m.__u59k;if(kk){const t=(performance.now()-kk.t0)/150;if(t<1){const o=(1-t)*(1-t)*5*kk.pw;ox=Math.cos(kk.a)*o;oy=Math.sin(kk.a)*o*.6}else m.__u59k=null}
  for(const s of e.sh||[])gxShadow(m.x+ox+s[0],m.y+oy+s[1],s[2],s[3],s[4]);
  g.drawImage(e.c,0,0,e.c.width,e.c.height,m.x+ox+e.b.x,m.y+oy+e.b.y,e.b.w,e.b.h);
  if(e.gc){const op=g.globalCompositeOperation;g.globalCompositeOperation='lighter';g.drawImage(e.gc,0,0,e.gc.width,e.gc.height,m.x+ox+e.b.x,m.y+oy+e.b.y,e.b.w,e.b.h);g.globalCompositeOperation=op}return true}
function sbkMake(m,ck,fx,sl,hf,b,q){const w=Math.max(2,Math.ceil(b.w*q)),h=Math.max(2,Math.ceil(b.h*q)),B=[-b.x*q,-b.y*q,q];
  const prep=x=>{x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';x.shadowBlur=0;x.clearRect(0,0,w,h);x.setTransform(q,0,0,q,B[0],B[1]);x.lineCap='butt';x.lineJoin='miter';x.setLineDash([])};
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');try{mpcHook(x)}catch(e){}prep(x);const sh=mpcRender(x,m,ck,fx,sl,hf,B,1);if(SBK.lit&&!(hf>.3))try{mpcLight(c,x,w,h,q)}catch(e){}
  let gc=null;if(b.hg!==0){const c2=document.createElement('canvas');c2.width=w;c2.height=h;const x2=c2.getContext('2d');try{mpcHook(x2)}catch(e){}prep(x2);MPC.gl=0;mpcRender(x2,m,ck,fx,sl,hf,B,2);if(MPC.gl){gc=c2;b.hg=1}else if(b.hg!==1){b.gn=(b.gn|0)+1;if(b.gn>=30)b.hg=0}MPC.gl=0}
  return{c,gc,sh,b,n:w*h*(gc?2:1)}}
setTimeout(()=>{try{const _mm=mpcMon;window.mpcMon=mpcMon=function(m,ck,fx,sl,hf,direct){
    if(!m||m.t>=3||!MT[m.t]||!sbkActive())return _mm.apply(this,arguments);
    try{const sp=sl>0?.4:1,P=2*Math.PI/sp,N=SBK.N,u=((ck%P)+P)%P,i=Math.min(N-1,Math.floor(u/P*N)),b=mpcBB(m),W=hf>.3,hb=hf>0?Math.round(hf*3):0;
      const fr=typeof FL!=='undefined'&&FL.pt?FL.pt:Math.floor(performance.now()/16);if(fr!==SBK.fr){SBK.fr=fr;SBK.nr=0}
      const M=g.getTransform(),sc=Math.hypot(M.a,M.b);if(!(sc>0))return _mm.apply(this,arguments);const q=Math.max(1,Math.min(2,Math.round(sc*2)/2)),base=curMap+'|'+bTheme()+'|'+m.t+'|'+mpcVar(m)+'|'+(fx<0?1:0)+'|'+(W?1:0)+'|'+hb+'|'+sp+'|'+q+'|',key=base+i;
      let e=SBK.c.get(key);if(e){SBK.c.delete(key);SBK.c.set(key,e);SBK.stat.hit++;return sbkDraw(m,e)}
      if(SBK.nr<SBK.mx){SBK.nr++;e=sbkMake(m,(i+.5)*P/N,fx,sl,hf,b,q);SBK.c.set(key,e);SBK.used+=e.n;sbkEvict();SBK.stat.make++;return sbkDraw(m,e)}
      for(let d=1;d<=6;d++)for(const j of[(i-d+N)%N,(i+d)%N]){const e2=SBK.c.get(base+j);if(e2){SBK.stat.near++;return sbkDraw(m,e2)}}
      SBK.stat.miss++}catch(err){}
    return _mm.apply(this,arguments)}}catch(e){console.warn('sbk',e)}},1200);
/* เปลี่ยนแมพ → ล้างภาพเก็บร่วม (ภาพผูกกับธีมแมพ) */
setInterval(()=>{try{if(SBK.mp!==curMap){SBK.mp=curMap;SBK.c.clear();SBK.used=0}}catch(e){}},1000);
