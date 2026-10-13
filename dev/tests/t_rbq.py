import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Q'+str(random.randint(1000,9999)), 'archer', 99)
        await A.ev("()=>{me.cls2=1;me.brU={1:1};me.br=1;applyBr();me.gold=10;me.rbq={sh:0}}")
        await A.wait(800)
        print('hud',await A.ev("()=>[!$('rbq').hidden,$('rbq').innerText]"))
        await A.pg.screenshot(path='rbq_hud.png')
        await A.pg.click('#rbq');await A.wait(1200)
        print('aq1',await A.ev("()=>AQ&&[AQ.src,AQ.T&&AQ.T.mp,AQ.T&&AQ.T.act,AQ.msg,rbMvpMap()]"))
        await A.ev("()=>{aqStop();me.rbq={sh:5}}");await A.wait(300)
        await A.pg.click('#rbq');await A.wait(800)
        print('aq2 (no gold)',await A.ev("()=>[AQ,banner&&banner.s]"))
        await A.ev("()=>{me.gold=2e6;me.x=CX-600;me.y=CY+500}");await A.wait(300)
        await A.pg.click('#rbq')
        for i in range(30):
            await A.wait(1000)
            r=await A.ev("()=>[AQ&&AQ.msg,Math.round(me.x),Math.round(me.y),ov.hidden?'':ov.dataset.k]")
            if r[3]=='rb':break
        print('aq3',r,i)
        await A.pg.screenshot(path='rbq_arrive.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
