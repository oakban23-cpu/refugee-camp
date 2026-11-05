S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v597/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux168.js').read();R(u,u+open(S+'ux169.js').read())
R("const WNV='v596';","const WNV='v597';")
R("const WNL=[\n","const WNL=[\n  ['🧹','จัดของที่ซ้อนทับกัน','เห็ดยักษ์ หินงอก โคม ลังไม้ ที่ยืนเบียดหรือทับกันในนครรากลึก ฐานแผ่นดิน และย่านวงแหวนล่าง ถูกเลื่อนไปจุดว่างใกล้ ๆ · เห็ดจิ๋วที่โผล่ทะลุของใหญ่ถูกเก็บออก · ชาวบ้านไม่ยืนจมในบ้านแล้ว'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
