import asyncio
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Aa','mage',95);B=await new_client(b,'Bb','sup',95)
        for c in (A,B):await c.ev("()=>{enterMap(2,{x:1600,y:1600});ov.hidden=true;gmGod=true}")
        await A.wait(2500)
        await A.ev("()=>{const X=sgSt();X.i={totem:1,chain:1,trap:1};X.l={'0':['totem'],'3':['chain'],'4':['trap']};me.x=1600;me.y=1600;me.sk=[0,0,0,0,0,0];me.mp=me.mm;useSkill(0);useSkill(4)}")
        await A.wait(1500)
        r=await B.ev("()=>({sgv:SGV.map(v=>v.k+'@'+v.x+','+v.y),others:Object.keys(others).length})")
        print('B sees',r)
        print('errs',A.errs[:3],B.errs[:3])
        await b.close()
    p.terminate()
asyncio.run(main())
