# v575 การ์ดเควสกางค้าง (ux151)
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v575/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:90],s.count(a));s=s.replace(a,b)
assert 'HPIN' not in s
u=open(S+'ux150.js').read();R(u,u+open(S+'ux151.js').read())
R("const WNV='v574';","const WNV='v575';")
R("const WNL=[\n","const WNL=[\n  ['📜','การ์ดเควสกางค้างได้','แตะการ์ดเควส/ภารกิจจุติ/คู่มือรูนมุมซ้ายบนที่ย่ออยู่ → กางค้างไว้ ไม่ย่อเองตอนสู้หรือหมดเวลาอีก (จำไว้ครั้งหน้า) · กดปุ่ม ‹ บนการ์ดเพื่อกลับเป็นแบบย่อ · สู้บอสยังซ่อนชั่วคราว'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
