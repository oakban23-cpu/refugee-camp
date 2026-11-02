# v569 ตัววัดละเอียดบนเครื่องจริง + ความละเอียดปรับเอง: แทรก ux147 หลัง ux146 · แยกเวลา loop · HRS ใน dprFor · เซิร์ฟเวอร์ Document-Policy: js-profiling
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v569/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:90],s.count(a));s=s.replace(a,b)
R("const dprFor=()=>GQ==='high'?DPR0:","let HRS=9;/* v569 เพดานความละเอียดโหมดสูง (ลดเองเมื่อกระตุก) */\nconst dprFor=()=>GQ==='high'?Math.min(DPR0,HRS):")
R("  if(run&&me.cls){\n    advance(t);","  if(run&&me.cls){\n    {const _a0=performance.now();advance(t);const _a1=performance.now();PF.upd=_a1-_a0;PF.uiT=_a1}")
R("const _pf0=performance.now();try{if(drawErr&&g.reset)g.reset();","const _pf0=performance.now();PF.ui=PF.uiT?Math.max(0,_pf0-PF.uiT):0;PF.uiT=0;try{if(drawErr&&g.reset)g.reset();")
u=open(S+'ux146.js').read();R(u,u+open(S+'ux147.js').read())
R("const WNV='v568';","const WNV='v569';")
R("const WNL=[\n","const WNL=[\n  ['🔬','วัดความลื่นแบบละเอียด','เมนู › 📊 วัดความลื่น › «🔬 เริ่มวัดละเอียด 10 วิ» → เล่นต่อในฉากที่กระตุก → คัดลอกผลส่งให้ผู้พัฒนา (บอกได้ว่าส่วนไหนของเกมช้าบนเครื่องคุณ) · ผลแยกเวลาเป็น คำนวณ/ปุ่ม/วาด/อื่น · กราฟิก «สูง» ลดความละเอียดเองชั่วคราวเมื่อกระตุก · «อัตโนมัติ» ปรับเป็นประหยัดได้ทุกเครื่องเมื่อต่ำกว่า 30 FPS นาน ๆ'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s)
v=open(S+'v569/server_pre.js').read()
a="h={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','ETag':P.etag,'Vary':'Accept-Encoding'};"
assert v.count(a)==1
v=v.replace(a,"h={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','ETag':P.etag,'Vary':'Accept-Encoding','Document-Policy':'js-profiling'};/* v569 เปิดให้หน้าเกมวัดละเอียด (JS Self-Profiling) บนเครื่องผู้เล่นได้ */")
open('/home/claude/refugee-online/server.js','w').write(v);print('ok')
