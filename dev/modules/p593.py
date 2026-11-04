S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v593/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
i=s.index("  /* ลานดินอัด */{const gr=g.createRadialGradient(x,y+12,10,x,y+12,140)")
j=s.index("  /* เต็นท์ข้าง 2 หลัง */",i)
blk=s[i:j]
assert blk.count('\n')==3,blk.count('\n')
s=s[:i]+s[j:]
fn="/* v593 ลานดินลานเต็นท์ส่วนตัว: แยกมาวาดก่อนคน/NPC ในค่าย (เดิมวาดพร้อมเต็นท์ทีหลัง → ทับทหาร/คนที่ยืนบนลาน) */\nfunction tgGround(){if(curMap!==1||!inView(TNE.x,TNE.y,220))return;const x=TNE.x,y=TNE.y;g.save();\n"+blk+"  g.restore()}\n"
R("/* ---------- v383 ลานเต็นท์ในค่ายโฉมใหม่ ----------",fn+"/* ---------- v383 ลานเต็นท์ในค่ายโฉมใหม่ ----------")
R("  drawGate();drawWBGuards();drawHerald();","  try{tgGround()}catch(e){}drawGate();drawWBGuards();drawHerald();")
R("const WNV='v592';","const WNV='v593';")
R("const WNL=[\n","const WNL=[\n  ['⛺','แก้ลานเต็นท์ส่วนตัวทับทหาร','ลานดินของลานเต็นท์ส่วนตัวในค่ายวาดก่อนตัวละครแล้ว — ทหาร/NPC/ผู้เล่นที่ยืนบนลานไม่ถูกพื้นทับจนจางอีก'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
