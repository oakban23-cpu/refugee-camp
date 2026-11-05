S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v595/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux165.js').read();R(u,u+open(S+'ux166.js').read())
R("const WNV='v594';","const WNV='v595';")
R("const WNL=[\n","const WNL=[\n  ['🧱','พื้นและกำแพงย่านวงแหวนล่างเข้าชุดใหม่','ลานหินเป็นก้อนหินปูนวาดมือ ถนนเป็นแผ่นหินใหญ่มีขอบ กำแพงเมืองเก่าเป็นก้อนหินเรียงมีใบเสมาและไม้เลื้อย ขอบเกาะเป็นผาหิน (เปิดภาพ HD)'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
