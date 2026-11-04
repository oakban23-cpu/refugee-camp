S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v592/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
assert 'GTS=' not in s
u=open(S+'ux162.js').read();R(u,u+open(S+'ux163.js').read())
R("const WNV='v591';","const WNV='v592';")
R("const WNL=[\n","const WNL=[\n  ['🌟','ประตูวาร์ปในค่ายเล็กลง','ประตูแสงดาว (ไปนครลอยฟ้า) และประตูบ้านกิลด์ย่อเหลือ 78% ให้เข้ากับอาคารอื่นในค่าย · จุดเหยียบวาร์ปเท่าเดิม'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
