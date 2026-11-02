# v570 ลดงานต่อเฟรม (จากผล 🔬 บนเครื่องจริง: glowAt 16% ของเวลา · ภาพเต็มจอหลายชั้น)
#  ① glowAt: ในแคนวาสหลักใช้สเกลต่อเฟรม (GLW) แทน getTransform()+setTransform 2 ครั้งต่อการเรียก · วาดภาพแสงตรงในพิกัดโลก · แคชแยกสี→ขนาด (ไม่ต่อสตริงคีย์)
#  ② ไม่เทสีพื้นหลังเต็มจอเมื่อพื้นแมพ (mx) ปูครบทุกชิ้นในเฟรมก่อน · ชิ้นที่ยังไม่เสร็จ/กำลังจาง เทพื้นหลังเฉพาะช่องนั้น
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v570/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:90],s.count(a));s=s.replace(a,b)
R("function glowAt(x,y,r,c,a){if(r<=0||a<=0)return;const ga=g.globalAlpha;g.globalAlpha=ga*Math.min(1,a);const M=g.getTransform(),D=2*r*M.a;",
  "/* v570 GLW: แคนวาสหลัก + สเกลของเฟรม (ตั้งใน draw) → ไม่ต้องอ่าน/ตั้งเมทริกซ์ทุกครั้ง */const GLW={g:null,s:1,on:1,m:new Map()};\n"
  "function glowAt(x,y,r,c,a){if(r<=0||a<=0)return;const ga=g.globalAlpha;g.globalAlpha=ga*Math.min(1,a);\n"
  "  if(GLW.on&&g===GLW.g){const D=2*r*GLW.s;if(D<10||D>900){g.drawImage(glowSpr(c),x-r,y-r,r*2,r*2);g.globalAlpha=ga;return}const q=D<64?4:D<256?8:16,sz=Math.round(D/q)*q;let mc=GLW.m.get(c);if(!mc){mc=new Map();GLW.m.set(c,mc)}let sp=mc.get(sz);\n"
  "    if(!sp){const key=c+'|'+sz;sp=GSZ.m.get(key);if(!sp){if(GSZ.px>25e5){GSZ.m.clear();GSZ.px=0;GLW.m.clear();mc=new Map();GLW.m.set(c,mc)}sp=document.createElement('canvas');sp.width=sp.height=sz;const x2=sp.getContext('2d'),h=sz/2,gr=x2.createRadialGradient(h,h,0,h,h,h);gr.addColorStop(0,'rgba('+c+',1)');gr.addColorStop(1,'rgba('+c+',0)');x2.fillStyle=gr;x2.fillRect(0,0,sz,sz);GSZ.m.set(key,sp);GSZ.px+=sz*sz}mc.set(sz,sp)}\n"
  "    g.drawImage(sp,x-r,y-r,r*2,r*2);g.globalAlpha=ga;return}\n"
  "  const M=g.getTransform(),D=2*r*M.a;")
R("function draw(){\n  g.setTransform(DPR,0,0,DPR,0,0);const MP=MAPS[curMap];zmPre();",
  "function draw(){\n  g.setTransform(DPR,0,0,DPR,0,0);const MP=MAPS[curMap];zmPre();GLW.g=g;GLW.s=DPR*(ZM.on&&ZM.z>0?ZM.z:1);MX.skipBg=MX.cov===curMap&&!flash&&!shk&&!(ZM.on&&ZM.z<1);")
R("if(!(curMap===9&&!flash&&!shk&&cityCovers())){g.fillStyle=flash>0?'#3a1a24':MP.bg;g.fillRect(0,0,SW0,ZM.on?ZM.h0:H)}",
  "if(!(curMap===9&&!flash&&!shk&&cityCovers())&&!MX.skipBg){g.fillStyle=flash>0?'#3a1a24':MP.bg;g.fillRect(0,0,SW0,ZM.on?ZM.h0:H)}")
# mxGround: นับว่าปูครบไหม + เทพื้นหลังเฉพาะช่องที่ยังไม่ครบเมื่อข้ามการเท
R("  g.save();g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=true;\n  for(let cy=Math.max(0,y0);cy<=y1;cy++)for(let cx=Math.max(0,x0);cx<=x1;cx++){if(cx*CS>=WW||cy*CS>=WH)continue;if(cb&&",
  "  g.save();g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=true;let allOk=!cb&&!shk&&cam.x>=0&&cam.y>=0&&cam.x+W<=WW&&cam.y+H<=WH;const sk=!cb&&MX.skipBg,bgF=()=>{if(sk){g.fillStyle=MP.bg}};\n  for(let cy=Math.max(0,y0);cy<=y1;cy++)for(let cx=Math.max(0,x0);cx<=x1;cx++){if(cx*CS>=WW||cy*CS>=WH)continue;if(cb&&")
R("if(a<1){mxPrevDraw(cx,cy,X,Y,DX,s,ex,ey,DY);g.globalAlpha=a;g.drawImage(c,X,Y,DX,DY);g.globalAlpha=1}else{g.drawImage(c,X,Y,DX,DY);if(td)MX.done.delete(k)}}\n    else{mxJob(cx,cy,r,1);mxPrevDraw(cx,cy,X,Y,DX,s,ex,ey,DY)}}\n  g.restore();",
  "if(a<1){allOk=false;if(sk){g.fillStyle=MP.bg;g.fillRect(X,Y,DX,DY)}mxPrevDraw(cx,cy,X,Y,DX,s,ex,ey,DY);g.globalAlpha=a;g.drawImage(c,X,Y,DX,DY);g.globalAlpha=1}else{g.drawImage(c,X,Y,DX,DY);if(td)MX.done.delete(k)}}\n    else{allOk=false;if(sk){g.fillStyle=MP.bg;g.fillRect(X,Y,DX,DY)}mxJob(cx,cy,r,1);mxPrevDraw(cx,cy,X,Y,DX,s,ex,ey,DY)}}\n  if(!cb)MX.cov=allOk?curMap:0;g.restore();")
R("const WNV='v569';","const WNV='v570';")
R("const WNL=[\n","const WNL=[\n  ['⚡','ลื่นขึ้นอีก (จากผลวัดบนมือถือจริง)','แสงเรืองทั้งเกมวาดเร็วขึ้น (เดิมใช้เวลาราว 1 ใน 6 ของเครื่อง) · ไม่เทสีพื้นหลังเต็มจอซ้ำเมื่อพื้นแมพปูครบแล้ว · ภาพเหมือนเดิม · ขอบคุณผลวัด 🔬 ที่ส่งมา'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
