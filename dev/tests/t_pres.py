import asyncio
from h import *
async def same_map(cs, mp, xy):
    for c in cs: await c.ev(f"()=>{{ov.hidden=true;enterMap({mp},{xy})}}")
    await cs[0].wait(3000)
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            cs=[await new_client(b,n,c) for n,c in [('Alpha','melee'),('Bravo','mage'),('Charlie','sup')]]
            await same_map(cs,9,'{x:1600,y:1750}')
            for i in range(6):
                print(i,[await c.ev("()=>Object.keys(others).length") for c in cs],[await c.ev("()=>[curMap,Math.round(me.x),Math.round(me.y)]") for c in cs]);await cs[0].wait(1000)
    finally: p.terminate()
asyncio.run(main())
