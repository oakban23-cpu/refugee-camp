import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Pa'+str(random.randint(1000,9999)), 'melee', 40)
        B = await new_client(b, 'Pb'+str(random.randint(1000,9999)), 'mage', 40)
        print('PT_N',await A.ev("()=>[PT_N,PETS.length]"))
        await A.ev("()=>{gmGod=true;me.pets=[1,2,3,4,5,6,7,8,9,10,11,12];me.pet=12;PT=null;const S=fsSt();S.c={};const ids=Object.keys(FISH);for(let i=0;i<6;i++)S.c[ids[i*6]]=5;me.x=1600;me.y=2300}")
        await B.ev("()=>{gmGod=true;me.x=1640;me.y=2300}")
        await A.wait(2500)
        print('B sees pet:',await B.ev("()=>Object.values(others).map(o=>[o.n,o.pt])"))
        # level via kills
        r=await A.ev("()=>{const l0=vpLv(12);const hp0=petV('dm');for(let i=0;i<20;i++)vpKill(3,1);return [l0,vpLv(12),hp0,petV('dm'),vpX()[12]]}")
        print('levelup',r)
        await A.ev("()=>{petUI()}");await A.wait(600)
        await A.pg.screenshot(path='pet_ui.png')
        fid=await A.ev("()=>{const b=document.querySelector('[data-ptf]');return b&&b.dataset.ptf}")
        x0=await A.ev("()=>vpX()[12]")
        await A.pg.click(f'[data-ptf="{fid}"]');await A.wait(400)
        print('feed',fid,x0,await A.ev("()=>[vpX()[12],document.querySelector('.note')&&document.querySelector('.note').innerText]"))
        await A.ev("()=>{ov.hidden=true}")
        # draw each pet in the field for screenshot
        await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        shots=[]
        for pid in [7,8,9,10,11,12]:
            await A.ev(f"()=>{{me.pet={pid};PT=null;mons=[];me.x=1600;me.y=2300}}");await A.wait(700)
            await A.pg.screenshot(path=f'pet_f{pid}.png',clip={'x':95,'y':330,'width':200,'height':200})
        # tent
        await A.ev("()=>{me.pet=6;tentHome()}");await A.wait(2500)
        print('tent',await A.ev("()=>[curMap,MAPS[curMap].tent&&MAPS[curMap].tent.p]"))
        await A.pg.screenshot(path='pet_tent.png')
        # save roundtrip
        print('snap ptx',await A.ev("()=>JSON.stringify(snap().ptx)"))
        print(A.errs[:3],B.errs[:3])
        await b.close()
    p.terminate()
asyncio.run(main())
