S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v594/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux163.js').read();R(u,u+open(S+'ux164.js').read()+open(S+'ux165.js').read())
R("const WNV='v593';","const WNV='v594';")
R("const WNL=[\n","const WNL=[\n  ['🏘️','ย่านวงแหวนล่างโฉมใหม่','บ้านหินขาว ซากบ้าน กองหิน หอคอยธงดาว แผงตลาด และกองลังไม้ในย่านวงแหวนล่างเป็นภาพวาดชุดใหม่ · พื้นมีแผ่นหินหน้าประตู กระถางดอกไม้ เสื่อหน้าแผง เศษหินกระเบื้องรอบซากบ้าน (เปิดภาพ HD)'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
