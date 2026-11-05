S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v599/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
u=open(S+'ux170.js').read();R(u,u+open(S+'ux171.js').read()+open(S+'ux172.js').read()+open(S+'ux173.js').read())
R("const WNV='v598';","const WNV='v599';")
R("const WNL=[\n","const WNL=[\n  ['⛏️','เหมืองดาวคาร์นโฉมใหม่','เต็นท์คนงาน สำนักงานบรอม ปากอุโมงค์ ปั้นจั่น หอลิฟต์ รถแร่ กองแร่ดาว เสาตะเกียง กองไฟ หินถล่ม และผาหินแดงเป็นภาพวาดชุดใหม่ · พื้นมีระเบียงไม้ เศษคริสตัลเรือง หินร่วงรอบผา ขอบหลุมดาวเป็นก้อนหิน (เปิดภาพ HD)'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
