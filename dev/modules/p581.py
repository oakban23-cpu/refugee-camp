S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v581/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
R("&&c2On()){c2Gate(","&&C2.gate&&c2On()){c2Gate(")
R("const C2={src:'hd-camp2.webp',off:0,","const C2={src:'hd-camp2.webp',off:0,gate:0,")
R("const WNV='v580';","const WNV='v581';")
R("const WNL=[\n","const WNL=[\n  ['🏕️','ซุ้มประตูค่ายแบบเดิมกลับมา','ซุ้มประตูค่ายผู้อพยพ (เหนือ/ใต้) กลับไปใช้แบบเดิม — ภาพวาดใหม่ดูเอียงไม่สมดุล · อาคารอื่นในค่ายและป่ารอบค่ายยังเป็นภาพใหม่'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
