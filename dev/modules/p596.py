S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v596/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux166.js').read();R(u,u+open(S+'ux167.js').read()+open(S+'ux168.js').read())
R("const WNV='v595';","const WNV='v596';")
R("const WNL=[\n","const WNL=[\n  ['🍄','นครรากลึกโฉมใหม่','บ้านโดมราก บัลลังก์ราก แผงตลาด บ่อน้ำ โคมเห็ด เห็ดยักษ์เรืองแสง และหินงอกเป็นภาพวาดชุดใหม่ · ทางเดินเป็นสะพานไม้กระดาน ลานโถงฝังอำพัน ขอบถ้ำเป็นก้อนหินมีมอส (เปิดภาพ HD)'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
