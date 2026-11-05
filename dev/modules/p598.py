S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v598/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux169.js').read();R(u,u+open(S+'ux170.js').read())
R("const WNV='v597';","const WNV='v598';")
R("const WNL=[\n","const WNL=[\n  ['🙂','บทพูดของเราใช้หน้าตัวละครเรา','ตอนที่ตัวละครเราเป็นคนพูดในเนื้อเรื่อง วงกลมผู้พูดเป็นหน้าตัวละครเราเอง (ตามอาชีพ ชุด ทรงผม อาวุธที่ใส่อยู่) และมีภาพตัวละครเราเต็มตัวข้างกล่องบทพูดเหมือน NPC'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
