import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();c=await new_client(b,'PS')
        print(await c.ev("()=>{const o=cleanChar(Object.assign(JSON.parse(JSON.stringify(snap())),{inv:{hp:1,mp:1,ps:750}}));me.inv.ps=997;gdSet('ps',gdGet('ps')+5);const a=me.inv.ps;me.inv.ps=500;gdSet('ps',gdGet('ps')+10);return [o.inv.ps,a,me.inv.ps,GDM.ps.max]}"))
        print(c.errs[:3])
    finally:p.terminate()
asyncio.run(main())
