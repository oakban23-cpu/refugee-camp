import asyncio,random,json
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;enterMap(9,{x:1600,y:1400})}");await A.wait(2500)
        r=await A.ev("()=>JSON.stringify({gates:MAPS[9].gates.map(g=>[g.x,g.y,g.to,g.nm,!!g.alias,Object.keys(g).filter(k=>!['x','y','to','req','nm','arr'].includes(k))]),n10:MAPS[10].n,n11:MAPS[11].n,qn:CITY.npcs.filter(n=>n.k).map(n=>[n.k,n.x,n.y]),R:CITY.R,keys:Object.keys(CITY)})")
        print(r)
        for (x,y) in [(1360,1214),(1840,1214),(1300,1100),(1100,1200)]:
            await A.ev(f"()=>{{me.x={x};me.y={y}}}");await A.wait(1200)
            print((x,y),'->',await A.ev("()=>[Math.round(me.x),Math.round(me.y)]"))
            await A.pg.screenshot(path=f'../p6/m9_{x}_{y}.png')
        await b.close()
    p.terminate()
asyncio.run(main())
