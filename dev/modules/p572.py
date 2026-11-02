# v572 ภาพเก็บมอนร่วมเฉพาะตอนเครื่องตามไม่ทัน (ux148) + ตาเรืองในตัวช่วย eye ของ drawMonT ไม่ใช้เงาเบลอ
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v572/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:90],s.count(a));s=s.replace(a,b)
u=open(S+'ux147.js').read();R(u,u+open(S+'ux148.js').read())
R("const eye=(ex,ey,w,h,c)=>{g.shadowColor=c;g.shadowBlur=W?0:7;g.fillStyle=W?'#fff':c;",
  "const eye=(ex,ey,w,h,c)=>{if(!W){if(EYEBLUR){g.shadowColor=c;g.shadowBlur=7}else glowAt(ex,ey,Math.max(w,h)+6.3,rgbOf(c),.85)}g.fillStyle=W?'#fff':c;")
R("const WNV='v571';","const WNV='v572';")
R("const WNL=[\n","const WNL=[\n  ['⚡','ลื่นขึ้นตอนสู้ฝูงมอน (เครื่องที่ตามไม่ทัน)','เมื่อเกมเห็นว่าเครื่องตามไม่ทัน มอนชนิดเดียวกันท่าเดียวกันจะใช้ภาพที่วาดไว้ร่วมกัน แทนการวาดใหม่ทีละตัวทุกเฟรม (ท่าทางวนเป็นรอบ อาจลื่นน้อยลงนิดหน่อย) · เครื่องแรงยังวาดสดเหมือนเดิม · ตาเรืองแสงของมอนแบบเก่าก็ไม่ใช้เงาเบลอแล้ว'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
