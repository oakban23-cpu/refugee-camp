import asyncio, sys, io
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'mage'); B = await new_client(b, 'Bravo', 'assn')
        for c in (A,B): await c.ev("()=>{ov.hidden=true;enterMap(2,{x:1500,y:1500});}")
        await A.wait(2500)
        await A.ev("()=>{me.x=1500;me.y=1500;AUTO.on=false;mons.length=0}");await B.ev("()=>{me.x=1580;me.y=1520;AUTO.on=false}")
        for i in range(16):
            s=await B.ev("()=>Object.keys(others)")
            if A.uid in s: break
            await B.wait(500)
        print('B sees A', A.uid in s)
        await A.wait(600)
        shots=[]
        for ty,js in [('blink',"()=>{SD.on=false;me.dgCd=0;joy={ox:0,oy:0,dx:-40,dy:0};const r=dodge();joy=null;return r}"),('skill',"()=>{SD.on=false;me.sk=me.sk.map(()=>0);me.mp=me.mm;castStart(2);return true}")]:
            r=await A.ev(js);await B.wait(160)
            rc=await B.ev(f"()=>{{const c=RCAST['{A.uid}'];return c?[c.ty,c.d,c.big]:null}}")
            print(ty,r,'B RCAST',rc)
            im=Image.open(io.BytesIO(await B.pg.screenshot())).convert('RGB');shots.append(im)
        # B dodge -> A sees shade
        await B.ev("()=>{SD.on=false;me.dgCd=0;joy={ox:0,oy:0,dx:40,dy:0};dodge();joy=null}");await A.wait(150)
        print('A sees B', await A.ev(f"()=>{{const c=RCAST['{B.uid}'];return c?c.ty:null}}"))
        im=Image.open(io.BytesIO(await A.pg.screenshot())).convert('RGB');shots.append(im)
        w,h=shots[0].size;S=Image.new('RGB',(w*3,h))
        for i,x in enumerate(shots):S.paste(x,(i*w,0))
        S.save('../pc.png');print('size',w,h)
        for c in (A,B):print(c.name,'errs',c.errs[:3],await c.ev("()=>window.__err||[]"))
        await b.close()
    p.terminate()
asyncio.run(main())
