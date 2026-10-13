import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Aq'+str(random.randint(1000,9999)), 'mage', 22)
        await A.ev("()=>{me.sty={s:3,n:0,a:1,e:0};gmGod=true;me.x=1600;me.y=1640;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};window._sd=setInterval(()=>{if(SD.on){try{stNext()}catch(e){}}},700)}")
        await A.wait(1500)
        await A.pg.click('#stq'); await A.wait(500)
        print('start',await A.ev("()=>[!!AQ,AQ&&AQ.msg,banner&&banner.s]"))
        for i in range(120):
            await A.wait(3000)
            r=await A.ev("()=>[Math.round(performance.now()/1000),curMap,me.sty.s,me.sty.a,me.sty.n,AQ?AQ.msg:'-',HB.on?1:0,Math.round(me.x),Math.round(me.y),me.lv,banner?banner.s:'']")
            print(r,flush=True)
            if i==20: await A.pg.screenshot(path='aq2_1.png')
            if r[2]>=8 or r[5]=='-': break
        await A.pg.screenshot(path='aq2_3.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
