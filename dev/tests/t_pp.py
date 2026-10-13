import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in [3,4,7,25,2,13]:
            await A.ev(f"()=>{{enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1500)
            print(await A.ev("()=>[trees.filter(t=>t.pp).length,JSON.stringify(trees.filter(t=>t.pp&&!t.small).map(t=>[t.x|0,t.y|0])),JSON.stringify(TERD[curMap].map(P=>[P[0],P[1],P[2],terLv(P[0],P[1]-P[2]*.72*.18)]))]"))
            await A.ev("()=>{gmGod=true;const t=trees.find(t=>t.pp&&!t.small);me.x=t.x+60;me.y=t.y+110}");await A.wait(1500)
            print(await A.ev("()=>{const t=trees.find(t=>t.pp&&!t.small);let e=null;try{ppTree(t,performance.now())}catch(x){e=String(x.stack).slice(0,300)}return [e,t._ob,t.x,t.y,cam.x,cam.y]}"))
            await A.pg.screenshot(path=f'../p6/pp_{mp}.png')
            print(await A.ev("()=>{try{ppBuild();return trees.filter(t=>t.pp).length}catch(e){return String(e.stack).slice(0,300)}}"))
        await b.close()
    p.terminate()
asyncio.run(main())
