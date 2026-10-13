import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'N'+str(random.randint(1000,9999)), 'mage', 85)
        await A.ev("()=>{gmGod=true;me.sty={s:110,n:0,a:1,e:1,e4:1,p5m:0};ov.hidden=true;enterMap(28,{x:1600,y:2860})}");await A.wait(2500)
        for _ in range(4):
            print(await A.ev("()=>{const L=[];let err=null;try{p5Mini((x,y,c,r)=>L.push([x,y,c]))}catch(e){err=String(e)}return [L.length,err,curMap,CASTM(curMap),isDg(),GARLORE.length]}"));await A.wait(150)
        await b.close()
    p.terminate()
asyncio.run(main())
