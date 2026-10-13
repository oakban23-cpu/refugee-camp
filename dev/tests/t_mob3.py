import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from t_mob import nc
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await nc(b,'M'+str(random.randint(1000,9999)),'assn',90,320,568)
        await A.ev("()=>{gmGod=true;me.rb=1;me.rbC2={br:2,brU:{1:1,2:1}};me.cls2=1;me.brU={1:1,2:1};me.br=2;applyBr();me.mp=999;me.sk[2]=0;useSkill(2)}")
        await A.wait(450);await A.pg.screenshot(path='../fx/mob_se1_cine.png')
        await A.wait(3000)
        await A.ev("()=>{charTab='tr';treeUI();ov.hidden=false}");await A.wait(400)
        await A.ev("()=>{const e=[...ov.querySelectorAll('.card')].find(c=>c.innerHTML.includes('สกิลคลาส 3'));if(e)e.scrollIntoView()}");await A.wait(300)
        await A.pg.screenshot(path='../fx/mob_se1_tree.png')
        await b.close()
    p.terminate()
asyncio.run(main())
