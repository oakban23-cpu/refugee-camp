S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v584/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux156.js').read();R(u,u+open(S+'ux157.js').read())
R("const WNV='v583';","const WNV='v584';")
R("const WNL=[\n","const WNL=[\n  ['🍃','บรรยากาศค่าย','ใบไม้ปลิวตามลม (กลางวันมาก กลางคืนน้อยลง) · กลีบซากุระร่วงรอบต้น · ควันลอยจากกองไฟกลางค่ายและไอจากหม้อครัวป้าบัว พัดตามลมเดียวกัน · ยามค่ำมีหิ่งห้อยบินวนกะพริบตามต้นไม้รอบค่าย'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
