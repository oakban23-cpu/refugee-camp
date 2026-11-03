S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v577/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:90],s.count(a));s=s.replace(a,b)
R("ks:new Set(['qn','cmd','cel','til','sara','ast','eda','thu','navin','ves','lir','ked'])","ks:new Set(['qn','cmd','cel','til','sara','ast','eda','thu','navin','ves','lir','ked','hnt','kn','grif','nox','cas','lum','brom','mek','hed','orr','gem','leo'])")
R("const WNV='v576';","const WNV='v577';")
R("const WNL=[\n","const WNL=[\n  ['🖼️','ภาพหน้าตัวละครชุดที่ 2','เพิ่มอีก 12 ตัว — ไคล์ · อัลดริค · กัปตันกริฟ · โนอา · คาสเซียน · ลูมิน่า · บรอม · ยายเมฆา · ลอร์ดเฮเดรียน · ออร์รี · เมรา · ลีออน · รวมมีภาพหน้าในบทพูดแล้ว 24 ตัว'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
