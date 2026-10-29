# v567 ลื่นขึ้นบนมือถือรุ่นกลาง: แก้ simHost / propsHost / drawDesGround ในต้นฉบับ + แทรก ux146 + เซิร์ฟเวอร์ brotli ระดับ 11
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v567/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:90],s.count(a));s=s.replace(a,b)
# ① ทหารยามธนู: หาเป้าทุก 0.25 วิ
R("q.ac-=dt;if(q.ar){let b=null,bd=q.rg||360;mons.forEach(m=>{if(m.p&&!m.fw&&Math.hypot(m.x-FORT.x,m.y-FORT.y)>FORT.R+120)return;if(m.t>=3)return;const d=Math.hypot(m.x-q.x,m.y-q.y);if(d<bd){bd=d;b=m}});",
  "q.ac-=dt;if(q.ar){let b=null,bd=q.rg||360;q.rt=(q.rt||0)-dt;/* v567 หาเป้าใหม่ทุก 0.25 วิ (เดิมทุกเฟรม) */if(q.rt>0){const c=q.tb;if(c&&c.hp>0){const d=Math.hypot(c.x-q.x,c.y-q.y);if(d<bd){bd=d;b=c}}}else{q.rt=.25;mons.forEach(m=>{if(m.p&&!m.fw&&Math.hypot(m.x-FORT.x,m.y-FORT.y)>FORT.R+120)return;if(m.t>=3)return;const d=Math.hypot(m.x-q.x,m.y-q.y);if(d<bd){bd=d;b=m}});q.tb=b}")
# ② ทหารยามประชิด
R("    let b=null,bd=260;\n    mons.forEach(m=>{if(m.p&&!q.zn)return;if(q.zn&&(m.t>=3||m.pv||m.dum||Math.hypot(m.x-q.px,m.y-q.py)>300))return;const d=Math.hypot(m.x-q.x,m.y-q.y);if(d<bd){bd=d;b=m}});",
  "    let b=null,bd=260;q.rt=(q.rt||0)-dt;\n    if(q.rt>0){const c=q.tb;if(c&&c.hp>0){const d=Math.hypot(c.x-q.x,c.y-q.y);if(d<bd){bd=d;b=c}}}else{q.rt=.25;\n    mons.forEach(m=>{if(m.p&&!q.zn)return;if(q.zn&&(m.t>=3||m.pv||m.dum||Math.hypot(m.x-q.px,m.y-q.py)>300))return;const d=Math.hypot(m.x-q.x,m.y-q.y);if(d<bd){bd=d;b=m}});q.tb=b}")
# ③ มอนฝูงไกลผู้เล่นทุกคน: ข้ามการเดินเตร่
R("  dmgQ={};if(isTw()&&isHost())tbHost(dt,pl);\n  mons.forEach(m=>{\n    if(m.pv)return;",
  "  dmgQ={};if(isTw()&&isHost())tbHost(dt,pl);\n  /* v567 มอนฝูงที่ไกลผู้เล่นทุกคน (> 1,100 px รวมคนที่อยู่ในเขตปลอดภัย/ล้ม/ซ่อนตัว) ไม่มีใครเห็น → ไม่ต้องคิดการเดินเตร่ทุกเฟรม */\n  const LODP=[{x:me.x,y:me.y},...((room&&room.allPlayers)?room.allPlayers.map(([u,x,y])=>({x,y})):Object.values(others).map(o=>({x:o.x,y:o.y})))],LODR=1100*1100,lodFar=m=>{for(const p of LODP){const dx=p.x-m.x,dy=p.y-m.y;if(dx*dx+dy*dy<LODR)return false}return true};\n  mons.forEach(m=>{\n    if(m.pv)return;")
R("    if(m.tgb){tgbAI(m,dt,pl);return}\n","    if(m.tgb){tgbAI(m,dt,pl);return}\n    if(!DGM&&m.p&&m.t<3&&!(m.tt>0)&&!m.nm&&!m.el&&!m.wu&&!(m.hp<m.mh)&&lodFar(m))return;\n")
# ④ กับดักหนาม
R("function propsHost(dt,pl){if(!PRP||PRP.m!==curMap)return;const n=performance.now();\n  PRP.s.forEach((t,i)=>{if(t.cd>n)return;",
  "function propsHost(dt,pl){if(!PRP||PRP.m!==curMap)return;const n=performance.now();\n  /* v567 ตรวจมอนเหยียบหนามทุก 0.1 วิ (เดิมทุกเฟรม × มอนทั้งแมพ) */const spk=n-(PRP.sT||0)>=100;if(spk)PRP.sT=n;\n  if(spk)PRP.s.forEach((t,i)=>{if(t.cd>n)return;")
# ⑤ ลอนทราย: เส้นชุดเดียวต่อรอบ
R("for(let y=y0-60;y<cam.y+H+60;y+=60)for(let x=x0-90;x<cam.x+W+90;x+=90){const h=((x*13+y*7)%97)/97;if(h<.45)continue;const ox=x+h*40,oy=y+h*20;g.beginPath();g.moveTo(ox-26,oy);g.quadraticCurveTo(ox,oy-7,ox+26,oy);g.stroke()}",
  "g.beginPath();for(let y=y0-60;y<cam.y+H+60;y+=60)for(let x=x0-90;x<cam.x+W+90;x+=90){const h=((x*13+y*7)%97)/97;if(h<.45)continue;const ox=x+h*40,oy=y+h*20;g.moveTo(ox-26,oy);g.quadraticCurveTo(ox,oy-7,ox+26,oy)}g.stroke();")
R("for(let y=y0-60;y<cam.y+H+60;y+=60)for(let x=x0-90;x<cam.x+W+90;x+=90){const h=((x*7+y*11)%89)/89;if(h<.5)continue;const ox=x+h*50,oy=y+20+h*16;g.beginPath();g.moveTo(ox-22,oy);g.quadraticCurveTo(ox,oy+5,ox+22,oy);g.stroke()}",
  "g.beginPath();for(let y=y0-60;y<cam.y+H+60;y+=60)for(let x=x0-90;x<cam.x+W+90;x+=90){const h=((x*7+y*11)%89)/89;if(h<.5)continue;const ox=x+h*50,oy=y+20+h*16;g.moveTo(ox-22,oy);g.quadraticCurveTo(ox,oy+5,ox+22,oy)}g.stroke();")
# ⑥ แทรก ux146 หลัง ux145
u145=open(S+'ux145.js').read();R(u145,u145+open(S+'ux146.js').read())
R("const WNV='v566';","const WNV='v567';")
E="  ['⚡','ลื่นขึ้นบนมือถือ','แมพสนามที่มีมอนเยอะ (เช่น ทะเลทรายพีระมิด · ค่าย) คิดงานน้อยลงต่อเฟรม: มอนที่อยู่ไกลทุกคนไม่ต้องคิดการเดินเตร่ · ทหารยามค่ายหาเป้าเป็นช่วง · กับดักหนามตรวจเป็นช่วง · พีระมิด/สฟิงซ์ใช้ภาพที่วาดเก็บไว้ · ไฟล์เกมที่ดาวน์โหลดเล็กลงราว 12% (บีบอัดแน่นขึ้น) · ภาพในเกมเหมือนเดิม'],\n"
R("const WNL=[\n","const WNL=[\n"+E)
open('/home/claude/refugee-online/public/index.html','w').write(s)
v=open(S+'v567/server_pre.js').read()
a="console.log('page '+raw.length+' → gzip '+P.gz.length);\n  zlib.brotliCompress("
assert v.count(a)==1,'srv'
v=v.replace(a,"console.log('page '+raw.length+' → gzip '+P.gz.length);\n  /* v567 ใช้ไฟล์ br ที่บีบไว้ล่วงหน้าตอนบิลด์ (ระดับ 11 · เล็กกว่าระดับ 9 ราว 12% · ไม่ใช้ CPU ตอนเปิดเซิร์ฟเวอร์) ถ้าคลายแล้วตรงกับหน้าเกมทุกไบต์ */\n  try{const pb=fs.readFileSync(page+'.br');if(zlib.brotliDecompressSync(pb).equals(raw)){P.br=pb;console.log('page br (prebuilt) '+pb.length);return PG}}catch(e){}\n  zlib.brotliCompress(")
open('/home/claude/refugee-online/server.js','w').write(v)
print('ok')
