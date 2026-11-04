S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v590/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux160.js').read();R(u,u+open(S+'ux161.js').read())
R("const WNV='v589';","const WNV='v590';")
R("const WNL=[\n","const WNL=[\n  ['⚓','ผาท่าเรือเมฆโฉมใหม่','ประภาคาร · สำนักงานท่าเรือ · เต็นท์พยาบาล · คลังเสบียง · ปั้นจั่น · อนุสรณ์สมอเรือ · ซากเรือเหาะ · กองลังไม้ วาดใหม่เป็นภาพ HD ชุดเดียวกับค่าย · ต้องเปิดภาพ HD และไม่ใช่โหมดประหยัด'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
