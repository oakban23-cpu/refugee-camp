# v566 ฝันร้ายทีม (ปาร์ตี้ 2–4 คน): แทนโมดูล ux144/ux145 ในต้นฉบับ + ตัวรับกระดาน q + หน้ามีอะไรใหม่ + เซิร์ฟเวอร์ (คีย์ qYYMMDD)
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v566/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:80],s.count(a));s=s.replace(a,b)
R(open(S+'v566/ux144_pre.js').read(),open(S+'ux144.js').read())
R(open(S+'v566/ux145_pre.js').read(),open(S+'ux145.js').read())
R(r"filter(k=>/^(s\d{4}|n\d{6})$/.test(k))",r"filter(k=>/^(s\d{4}|[nq]\d{6})$/.test(k))")
R("const WNV='v565';","const WNV='v566';")
E="  ['👥','ฝันร้ายทีม (ปาร์ตี้ 2–4 คน)','ตั้งปาร์ตี้แล้วหัวหน้าเลือกระดับในหน้าโหมดฝันร้าย กดเริ่ม → เพื่อนได้คำชวนเข้าดันพร้อมระดับและคำสาปเดียวกัน · ศัตรูทนขึ้นตามจำนวนคนเหมือนดันปาร์ตี้ปกติ · บันทึกระดับทีมแยกจากเดี่ยว (ปลดระดับทีมได้ถึงระดับที่ตัวเองผ่านเดี่ยวหรือทีม +1) · ได้ทอง + 🌙 เศษฝันร้าย (ครั้งแรก ×3) · กระดานอันดับทีมรายสัปดาห์ · คนนอกปาร์ตี้เข้าห้อง = รอบนั้นไม่นับ'],\n"
R("const WNL=[\n","const WNL=[\n"+E)
open('/home/claude/refugee-online/public/index.html','w').write(s)
v=open(S+'v566/server_pre.js').read()
def V(a,b):
    global v
    assert v.count(a)==1,a[:60];v=v.replace(a,b)
V(r"if(!/^(m[1-4678]|m10|d[1-37]|tw|wb|pv|s\d{4}|n\d{6})$/.test(key))return;const ss=/^s\d{4}$/.test(key),nw=/^n\d{6}$/.test(key)",
  r"if(!/^(m[1-4678]|m10|d[1-37]|tw|wb|pv|s\d{4}|[nq]\d{6})$/.test(key))return;const ss=/^s\d{4}$/.test(key),nw=/^[nq]\d{6}$/.test(key)")
V(r"if(nw){const ks=Object.keys(LB).filter(x=>/^n\d{6}$/.test(x)).sort();while(ks.length>3)delete LB[ks.shift()]}",
  r"if(nw){const pf=key[0],ks=Object.keys(LB).filter(x=>x[0]===pf&&/^[nq]\d{6}$/.test(x)).sort();while(ks.length>3)delete LB[ks.shift()]}")
V(r"/^n\d{6}$/.test(key);",r"/^[nq]\d{6}$/.test(key);")
V(r"(key==='wb'||/^[sn]\d{4,6}$/.test(key))?30:10",r"(key==='wb'||/^[snq]\d{4,6}$/.test(key))?30:10")
open('/home/claude/refugee-online/server.js','w').write(v)
print('ok',len(s))
