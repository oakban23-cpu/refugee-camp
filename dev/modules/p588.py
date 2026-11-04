import re
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v588/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
# swap module bodies: locate each module by its unique first line and the next module's first line
def swap(fn,nextfirst):
    global s
    new=open(S+fn).read();first=new.split('\n',1)[0]
    i=s.index(first);j=s.index(nextfirst,i)
    s=s[:i]+new+s[j:]
swap('ux153.js','/* ---------- v580 ')
swap('ux154.js','/* ---------- v582 ')
swap('ux157.js','/* ---------- v586 ')
R("const WNV='v587';","const WNV='v588';")
R("const WNL=[\n","const WNL=[\n  ['⚡','ค่ายลื่นขึ้น','วัดความลื่นในค่ายแบบจำลองมือถือรุ่นกลางหลังเพิ่มภาพใหม่ — ลดงานวาดต่อเฟรมของต้นไม้ HD · ใบไม้ปลิว · กลีบซากุระ · คอกม้าไม่วาดตอนอยู่นอกจอ'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
