import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
SHOT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/astra2/'
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;LOWQ=false;FQ.avg=10;try{HD2.fq=999}catch(e){}}"
WAIT="async()=>{for(let i=0;i<120&&(AST.ok!==1||AST.re||!CG.ast||!CW.ast);i++)await new Promise(r=>setTimeout(r,150));return[AST.ok,AST.err,!!CG.ast,!!CW.ast,!!(CSPR&&CSPR.ast)]}"
async def boot(b,errs,block=None,vw=1280,vh=720):
    pg=await (await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=1)).new_page()
    pg.on('pageerror',lambda e:errs.append(str(e)[:200]));pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='warning' and m.text.startswith('ast') else None)
    if block:await pg.route('**/'+block,lambda rt:rt.abort())
    await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','As'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(3000);await pg.evaluate(CL)
    return pg
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await boot(b,errs)
            r=await pg.evaluate("()=>[AST.ld,curMap]")
            await pg.evaluate("()=>{enterMap(9,{x:1600,y:1600})}");await pg.wait_for_timeout(1500);await pg.evaluate(CL)
            r=await pg.evaluate(WAIT)
            rep('เข้าเมือง: โหลดภาพครบ สร้างพื้น/กำแพง/รายการวัตถุแบบภาพวาด',r==[1,'',True,True,True],r)
            # นับการ drawImage จาก atlas ใหม่ในหนึ่งเฟรม ที่หลายจุด
            CNT="""async([x,y])=>{me.x=x;me.y=y;me.down=0;me.hp=me.mh;await new Promise(r=>setTimeout(r,500));const c={};const o=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im){const s=im&&im.src||'';const k=(s.match(/hd-[a-z0-9-]+/)||[''])[0];if(k)c[k]=(c[k]||0)+1;return o.apply(this,arguments)};await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));CanvasRenderingContext2D.prototype.drawImage=o;return c}"""
            c1=await pg.evaluate(CNT,[1600,1900])
            rep('ถนนใต้: วาดบ้าน/หอ/ประตู/เสาไฟ/ธง/สวน จาก atlas ใหม่',c1.get('hd-ast1',0)>=8 and c1.get('hd-ast2',0)>=1,c1)
            c2=await pg.evaluate(CNT,[850,1600])
            rep('ขอบตะวันตก: ฟ้าลายภาพวาด(pattern) + เกาะประตูตะวันตก + หน้าผา/เกาะลอย',c2.get('hd-ast2',0)>=1,c2)
            c3=await pg.evaluate(CNT,[1600,2240])
            rep('ประตูใต้: มีหน้าผาใต้เกาะภาพวาด',c3.get('hd-astu',0)>=1,c3)
            r=await pg.evaluate("""()=>{const L=CSPR.length,houses=Object.keys(AST.HV).length;let ok=0;const o=astHouse;let n=0;window.astHouse=astHouse=function(){n++;return o.apply(this,arguments)};CSPR.forEach(s=>{try{s.d(performance.now()/1000)}catch(e){}});window.astHouse=astHouse=o;return[n,houses,CSPR.filter(s=>s.big===1).length]}""")
            rep('บ้านทั้ง 7 หลังใช้ภาพวาด (ทุกหลังมีแบบ)',r[0]==r[1]==7,r)
            # ชนกำแพงอาคารเดิมยังเหมือนเดิม
            r=await pg.evaluate("()=>{me.x=1215;me.y=1300;cityCollide();const a=[me.x,me.y];me.x=1600;me.y=1600+40;cityCollide();return[a,[me.x,me.y]]}")
            rep('การชนอาคาร/น้ำพุยังทำงาน (ถูกดันออก)',r[0]!=[1215,1300] and ((r[1][0]-1600)**2+(r[1][1]-1600)**2)**.5>=66.5,r)
            # ปิด HD → กลับแบบเดิม (สร้างพื้นใหม่เบื้องหลัง)
            r=await pg.evaluate("async()=>{HDI.on=false;for(let i=0;i<120&&(CG.ast||AST.re||CW.ast);i++)await new Promise(r=>setTimeout(r,150));return[!!CG.ast,!!CW.ast,!!(CSPR&&CSPR.ast),!!CG.c]}")
            rep('ปิดภาพ HD → พื้น/กำแพง/วัตถุกลับเป็นแบบเดิม',r==[False,False,False,True],r)
            await pg.screenshot(path=SHOT+'hd_off.jpg',type='jpeg',quality=70)
            r=await pg.evaluate("async()=>{HDI.on=true;for(let i=0;i<120&&(!CG.ast||AST.re||!CW.ast);i++)await new Promise(r=>setTimeout(r,150));return[!!CG.ast,!!CW.ast]}")
            rep('เปิด HD กลับ → ภาพวาดกลับมา',r==[True,True],r)
            # แมพอื่นไม่โดน: ค่าย (cBld2/cWallTower ใช้ร่วม)
            r=await pg.evaluate("async()=>{enterMap(1,{x:1600,y:1700});await new Promise(r=>setTimeout(r,2500));let n=0;const o=astHouse,o2=astTower;window.astHouse=astHouse=()=>{n++};window.astTower=astTower=()=>{n++};await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));window.astHouse=astHouse=o;window.astTower=astTower=o2;return[curMap,n]}")
            rep('แมพอื่น (ค่าย) ไม่ใช้ภาพอัสตรา',r==[1,0],r)
            # ภาพโหลดไม่ได้ → แบบเดิม
            pg2=await boot(b,errs,block='hd-ast1.webp')
            await pg2.evaluate("()=>{enterMap(9,{x:1600,y:1900})}");await pg2.wait_for_timeout(4000);await pg2.evaluate(CL)
            r=await pg2.evaluate("()=>[AST.ok,AST.err,!!CG.ast,!!CW.ast,!!CG.c,!!CW.c]")
            rep('โหลดภาพไม่ได้ → เมืองแบบเดิมทั้งหมด',r==[-1,'hd-ast1.webp',False,False,True,True],r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
