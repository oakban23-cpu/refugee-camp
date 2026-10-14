import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'W'+str(random.randint(100,999)),'melee',99)
        bad=0
        for k in range(20):
            await A.ev("()=>{gmGod=true;if(curMap!==1){enterMap(1,{x:1500,y:1835})}}");await A.wait(400)
            r=await A.ev("()=>{wbEnter();return [curMap,isWB(),MAPS[curMap].n]}")
            if not r[1]:bad+=1;print('BAD',r)
            await A.wait(300)
        print('entries 20 bad',bad)
        await b.close()
    p.terminate()
asyncio.run(main())
