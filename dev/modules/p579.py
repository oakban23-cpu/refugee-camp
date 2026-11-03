S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v579/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
assert 'c2On' not in s
# ร้านรูน: ข้ามโครงร้าน (เสา ผ้าคลุม ลัง แท่นหิน หนังสือ) แล้ววาดภาพแทน
R("  /* เสาและผ้าคลุมซุ้ม */","  if(c2On()){gxShadow(x+16,y+12,56,10,.4);c2Spr('rune_stall',x+14,y+14,110)}else{/* เสาและผ้าคลุมซุ้ม */")
R("  /* ผลึกรูนกลางลอยหมุน + ลำแสง */","  }/* ผลึกรูนกลางลอยหมุน + ลำแสง */")
# ครัวป้าบัว: ข้ามซุ้ม/ปลา/โต๊ะ/เตา แล้ววาดภาพ + ราวตากปลา + ป้ายชื่อร้าน
R("  /* ซุ้มครัว: เสา + ผ้าใบลายทาง */","  if(c2On()){c2Spr('fish_rack',x+84,y+12,40);const hh=c2Spr('cook_stall',x+16,y+16,108);c2Tag('ครัวริมบึง',x+17,y+16-hh-3,9)}else{/* ซุ้มครัว: เสา + ผ้าใบลายทาง */")
R("  /* ป้าบัว */","  }/* ป้าบัว */")
# แท่นบูชาจุติ: ฐาน 3 ชั้น + เสาหิน → ภาพ (วงแสงหมุน/ลูกแสง/ประกาย/ป้ายคงเดิม)
a="  g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x+4,y+8,46,15,0,0,7);g.fill();\n  for(const[r,h,c]of[[44,8,'#7a6a58'],[36,6,'#9a8a74'],[27,5,'#b8a88e']])"
R(a,"  const c2r=c2On();if(c2r){gxShadow(x+4,y+10,52,15,.4);c2Spr('rebirth_altar',x,y+16,104)}else{g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x+4,y+8,46,15,0,0,7);g.fill()}\n  if(!c2r)for(const[r,h,c]of[[44,8,'#7a6a58'],[36,6,'#9a8a74'],[27,5,'#b8a88e']])")
R("  g.fillStyle='#6a5a48';g.beginPath();g.moveTo(x-9,y-12);g.lineTo(x-6,y-64);","  if(!c2r){g.fillStyle='#6a5a48';g.beginPath();g.moveTo(x-9,y-12);g.lineTo(x-6,y-64);")
R("g.lineTo(x,y-74);g.lineTo(x,y-12);g.closePath();g.fill();\n","g.lineTo(x,y-74);g.lineTo(x,y-12);g.closePath();g.fill()}\n")
# ป้ายบอกทาง (แคชพื้นค่าย)
R("  /* ป้ายบอกทาง */\n  {const x=58,y=255.2;","  /* ป้ายบอกทาง */\n  if(HDc&&c2On())c2Signpost(58,255.2);else{const x=58,y=255.2;")
# ซุ้มประตูค่าย เหนือ/ใต้ → ภาพ (ซุ้มด้านข้างคงเดิม)
R("ARCH.a[k]+=((under?.35:1)-ARCH.a[k])*.18;g.save();g.globalAlpha=ARCH.a[k];const HT=70;","ARCH.a[k]+=((under?.35:1)-ARCH.a[k])*.18;if(Math.abs(p[0][0]-p[1][0])>=20&&c2On()){c2Gate(p[0][0],p[0][1],p[1][0],p[1][1],ARCH.a[k]);continue}g.save();g.globalAlpha=ARCH.a[k];const HT=70;")
u=open(S+'ux152.js').read();R(u,u+open(S+'ux153.js').read())
R("const WNV='v578';","const WNV='v579';")
R("const WNL=[\n","const WNL=[\n  ['🏕️','ค่ายผู้อพยพโฉมใหม่','อาคารในค่ายที่เคยเป็นภาพเรียบ ๆ วาดใหม่เป็นภาพสไตล์เดียวกับเต็นท์และเตาตีเหล็ก — ร้านรูนไอริส · คอกม้า (+กองฟาง) · แท่นบูชาจุติ · ครัวริมบึงป้าบัว (+ราวตากปลา) · หุ่นไล่กาลานฝึก · ป้ายบอกทาง · ซุ้มประตูค่าย · ต้องเปิดภาพ HD และไม่ใช่โหมดประหยัด'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
