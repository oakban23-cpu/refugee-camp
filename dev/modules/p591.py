S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v591/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux161.js').read();R(u,u+open(S+'ux162.js').read())
R("const WNV='v590';","const WNV='v591';")
R("const WNL=[\n","const WNL=[\n  ['🪵','พื้นท่าเรือเข้าชุดใหม่','ผาท่าเรือเมฆ: คราบไม้และรอยสึกใต้อาคาร · ฟางหน้าคลังเสบียง · ขดเชือกข้างปั้นจั่นและสมอ · ลานหินปูรอบประภาคาร · รอยไถล เศษไม้ และก้อนหินรอบซากเรือเหาะ'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
