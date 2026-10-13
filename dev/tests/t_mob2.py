import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from t_mob import nc
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await nc(b,'M'+str(random.randint(1000,9999)),'mage',97,320,568)
        await A.ev("()=>{me.cls2=1;me.brU={1:1};me.br=1;applyBr()}");await A.wait(1000)
        print(await A.ev("()=>['stq','rbq','tg','topb','sk'].map(i=>{const r=$(i).getBoundingClientRect();return i+':'+[r.left,r.top,r.right,r.bottom].map(Math.round)})"))
        await A.pg.screenshot(path='../fx/mob_se1_pre.png')
        await b.close()
    p.terminate()
asyncio.run(main())
