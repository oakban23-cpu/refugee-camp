S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v583/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
assert 'ck3On' not in s
R("if(Math.abs(p[0][0]-p[1][0])>=20&&C2.gate","if(Math.abs(p[0][0]-p[1][0])<20&&ck3On()&&ck3Side(p,ARCH.a[k],k))continue;if(Math.abs(p[0][0]-p[1][0])>=20&&C2.gate")
R("chSpr(id,x,by,w,fl)}}","if(!(id==='noticeboard'&&ck3On()&&ck3Board(x,by)))chSpr(id,x,by,w,fl)}}")
R("  [0,1,2].forEach(i=>{const s=WBS[i],r=rows[i],x=s.x,y=s.y,h=s.h,M=s.m;","  const PD=ck3On()?ck3Podium():null;\n  [0,1,2].forEach(i=>{const s=WBS[i],r=rows[i],x=s.x,y=s.y,h=PD?y-7.5-PD.tops[i]:s.h,M=s.m;")
R("    g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,y+2,19,5,0,0,7);g.fill();","    if(!PD){g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,y+2,19,5,0,0,7);g.fill()}")
R("    slab(34,y+1,5,'#5a5650','#7a766e');slab(28,y-4,h,'#6e6a62','#8e8a80');slab(31,y-4-h,3.5,'#5a5650','#9a968c');","    if(!PD){slab(34,y+1,5,'#5a5650','#7a766e');slab(28,y-4,h,'#6e6a62','#8e8a80');slab(31,y-4-h,3.5,'#5a5650','#9a968c')}")
R("    const py=y-4-h/2;g.fillStyle=M[2];","    const py=y-4-h/2;if(!PD){g.fillStyle=M[2];")
R("g.fillText(String(i+1),x,py+.3);g.textBaseline='alphabetic';","g.fillText(String(i+1),x,py+.3);g.textBaseline='alphabetic'}")
R("  /* วงอักขระบนพื้น */","  if(ck3On())ck3Altar(ax,ay,boost,t);else{/* วงอักขระบนพื้น */")
R("    g.restore()}\n  g.restore();\n  /* ตัวช่าง */","    g.restore()}\n  }g.restore();\n  /* ตัวช่าง */")
u=open(S+'ux155.js').read();R(u,u+open(S+'ux156.js').read())
R("const WNV='v582';","const WNV='v583';")
R("const WNL=[\n","const WNL=[\n  ['🏕️','ค่ายโฉมใหม่ ชุดที่ 2','ซุ้มประตูค่ายฝั่งตะวันออก/ตะวันตก · กระดานค่าหัว · แท่นอันดับอนุสาวรีย์วีรชนบอสโลก (ทอง/เงิน/ทองแดง) · แท่นเวทของไซลัส ช่างโอนบวก — วาดใหม่สไตล์เดียวกับซุ้มประตูเหนือ/ใต้ · ต้องเปิดภาพ HD และไม่ใช่โหมดประหยัด'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
