import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in [1,12,25]:
            await A.ev(f"()=>{{gmGod=true;enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1200)
            r=await A.ev("""()=>new Promise(res=>{const t=trees.find(t=>t.pp&&!t.small);me.x=t.x;me.y=t.y+70;joy={dx:0,dy:-40,ox:0,oy:0};setTimeout(()=>{joy=null;res([Math.round(me.y-t.y),Math.round(me.x-t.x),terLv(me.x,me.y)])},1800)})""")
            print(mp,r)
        await b.close()
    p.terminate()
asyncio.run(main())
