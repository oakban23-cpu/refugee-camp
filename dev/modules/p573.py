# v573 วาร์ประหว่างโหลดแมพ (ux149)
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v573/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:90],s.count(a));s=s.replace(a,b)
u=open(S+'ux148.js').read();R(u,u+open(S+'ux149.js').read())
R("const WNV='v572';","const WNV='v573';")
R("const WNL=[\n","const WNL=[\n  ['🌀','วาร์ประหว่างโหลดแมพ','เปลี่ยนแมพแล้วจะมีวงวาร์ป (สีตามแมพปลายทาง) ระหว่างเกมเตรียมพื้นแมพ แล้วเปิดเมื่อพร้อม · ช่วงแรกที่เข้าแมพไม่กระตุกเหมือนก่อน · เครื่องเร็วเห็นแค่แวบเดียว · ระหว่างวาร์ปไม่โดนตี'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
