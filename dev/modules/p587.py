S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v587b/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
R("  /* ดอกไม้ป่า + พุ่มไม้ */\n","  try{campG2()}catch(e){console.warn('campG2',e)}\n  /* ดอกไม้ป่า + พุ่มไม้ */\n")
R("const onPath=(x,y)=>Math.abs(x)<PW+10||","const onPath=(x,y)=>campG2Hit(x,y)||Math.abs(x)<PW+10||")
u=open(S+'ux158.js').read();R(u,u+open(S+'ux159.js').read())
R("const WNV='v586';","const WNV='v587';")
R("const WNL=[\n","const WNL=[\n  ['🛤️','พื้นค่ายมีมิติ','ลานดินใต้ร้านและอาคาร (ร้านรูน · คอกม้า · ช่างตีบวก · พ่อค้ายา · อนุสาวรีย์ · แท่นไซลัส · บ้านกิลด์ · ประตูวาร์ป) · ทางเดินดินแยกจากถนนหินเข้าหน้าร้านทุกร้าน · กรวด หญ้าแซม และดอกไม้ริมทาง'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
