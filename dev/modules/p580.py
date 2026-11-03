S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v580/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
assert 'natOn' not in s
u=open(S+'ux153.js').read();R(u,u+open(S+'ux154.js').read())
R("const WNV='v579';","const WNV='v580';")
R("const WNL=[\n","const WNL=[\n  ['🌳','ป่ารอบค่ายโฉมใหม่','ต้นไม้รอบนอกค่ายผู้อพยพวาดใหม่เป็นภาพสไตล์เดียวกับในค่าย — ต้นโอ๊ก · สน · เบิร์ช · ซากุระ สลับกับหินมอส · ขอนไม้ล้ม · พุ่มเบอร์รี่ · เสาซากโบราณ · เห็ดเรืองแสง · ตอไม้ (ตำแหน่งเดิม เดินชนเหมือนเดิม) · ต้องเปิดภาพ HD และไม่ใช่โหมดประหยัด'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
