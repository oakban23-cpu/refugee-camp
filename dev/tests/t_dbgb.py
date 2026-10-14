import asyncio,random,sys
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;setInterval(()=>{FQ.avg=0;LOWQ=false},50);me.sty={s:STY.findIndex(x=>x.p7fd),n:0,a:1,e6:1};hfgEnter()}");await A.wait(2500)
        await A.ev("()=>{dg={ph:'boss',w:0,tl:900,nx:0};HF.st='boss';HF.S=100;spawnBoss();const B=mons.find(q=>q.t===3);B.x=CX+230;B.y=CY-230;B.h1=99;B.h2=99;B.h3=99;B.h4=99;me.x=CX+230;me.y=CY-40}")
        await A.wait(1500)
        info=await A.ev("()=>{const B=mons.find(q=>q.t===3);let r={};try{r.mr=mR(B)}catch(e){r.e=e.message}r.S=typeof bossScale==='function'?bossScale():null;return JSON.stringify(r)}")
        print(info)
        await A.wait(10)
        await A.pg.screenshot(path='../p6/dbg_circle.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
