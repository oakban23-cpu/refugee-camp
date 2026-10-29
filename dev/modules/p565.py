# v565 ร้านฝันร้าย: แทรกเข้าต้นฉบับ index.html โดยตรง (patch340 ใช้ไม่ได้แล้ว เพราะไม่มีไฟล์ฐาน v340)
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
F='/home/claude/refugee-online/public/index.html'
s=open(S+'v565/index_pre.html').read()
def R(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:80],s.count(a));s=s.replace(a,b)
MT="\n/* v565 ร้านฝันร้าย: พาหนะใหม่ (ภาพ = nmHorse ใน ux145) */MOUNTS.push({n:'อาชาฝันร้าย',sp:.72,lv:100,st:1,red:.03,d:'ม้าที่วิ่งออกมาจากฝันร้ายระดับสิบ แผงคอเป็นหมอกม่วง กีบเท้าไม่เคยแตะพื้น ขณะขี่ลดดาเมจที่ได้รับ 3% · แลกที่ร้านฝันร้าย'});"
R("\nconst MT_N=MOUNTS.length-1;",MT+"\nconst MT_N=MOUNTS.length-1;")
PT="\n/* v565 ร้านฝันร้าย: สัตว์เลี้ยงใหม่ (ภาพ = nmBaku ใน ux145) */PETS.push({n:'บากุจอมกินฝัน',b:{dm:.04,cr:.02,hp:.04},src:'แลกที่ร้านฝันร้าย (📅 กิจกรรม › สัปดาห์ › โหมดฝันร้าย)',fly:1,d:'สัตว์กินฝันร้ายจากตำนาน ใส่หมวกนอนลอยตามเจ้าไปทุกที่ ฝันร้ายเรื่องไหนที่เจ้าฝ่ามาได้ มันดูดกินเรียบด้วยงวงเล็ก ๆ'});"
R("\nconst PT_N=PETS.length-1,",PT+"\nconst PT_N=PETS.length-1,")
tail="window.dgReward=dgReward=function(){const on=nfOn()&&!NFC.void&&!NFC.done;"
i=s.find(tail);assert i>0 and s.count(tail)==1
j=s.find('\n',i);s=s[:j+1]+open(S+'ux145.js').read()+s[j+1:]
R("const WNV='v564';","const WNV='v565';")
E="  ['🛒','ร้านฝันร้าย','ผ่านโหมดฝันร้ายได้ 🌙 เศษฝันร้าย (ระดับ L ได้ L เศษ · ผ่านครั้งแรก ×3 · คนที่ผ่านไปแล้วได้ย้อนหลังอัตโนมัติ) · แลกได้ที่ปุ่ม «ร้าน» ในหน้าโหมดฝันร้าย: ชุดฝันร้าย + ออร่าหมอกฝันร้าย · สัตว์เลี้ยงบากุจอมกินฝัน · พาหนะอาชาฝันร้าย · สีย้อมหายาก · หินขั้นสูง · ด้าย · เศษดาว · อันดับ 1–10 ฝันร้ายประจำสัปดาห์ได้เศษเพิ่มตอนขึ้นสัปดาห์ใหม่'],\n"
R("const WNL=[\n","const WNL=[\n"+E)
open(F,'w').write(s)
v=open(S+'v565/server_pre.js').read();a="mt:num(p.mt|0,0,9,0)";assert v.count(a)==1;v=v.replace(a,"mt:num(p.mt|0,0,15,0)");open('/home/claude/refugee-online/server.js','w').write(v)
print('ok',len(s))
