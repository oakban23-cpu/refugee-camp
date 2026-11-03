# v576 ภาพหน้า NPC ในกล่องบทพูด (ux152)
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v576/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:90],s.count(a));s=s.replace(a,b)
assert 'NPCP' not in s and 'npcp' not in s
u=open(S+'ux151.js').read();R(u,u+open(S+'ux152.js').read())
R("const WNV='v575';","const WNV='v576';")
R("const WNL=[\n","const WNL=[\n  ['🖼️','ภาพหน้าตัวละครในบทพูด','12 ตัวละครหลักมีภาพหน้าในกล่องบทพูดแล้ว — ราชินีเอลิรา · ผู้บัญชาการเรนน์ · เซเลสต์ · ทิล · กัปตันซารา · โหรไซลัส · ยายเอดา · ธุลี · นาวิน · เวสเปอร์ · ลิเรีย · เฒ่าแก่นไม้ · จอกว้างจะเห็นภาพครึ่งตัวยืนเหนือกล่องด้วย'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
