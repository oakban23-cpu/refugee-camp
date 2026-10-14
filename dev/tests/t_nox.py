import asyncio,random,json
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'N'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{gmGod=true;me.sty={s:67,n:0,a:0,e:1,e4:2};ov.hidden=true;enterMap(19,{x:1600,y:1600})}");await A.wait(3000)
        r=await A.ev("""()=>{const P=stNpcPos('nox');const tx=P.x,ty=P.y+34;const near=trees.filter(t=>t.r>0&&Math.hypot(t.x-tx,t.y-ty)<120).map(t=>[t.x|0,t.y|0,t.r,t.k||'',t.inv?1:0,t.nc?1:0]);
          const G=aqGrid();return JSON.stringify({P,free:aqFree(G,(tx/16)|0,(ty/16)|0),near,gates:MAPS[19].gates.map(g=>[g.to,g.x,g.y]),npc4:MAPS[19].npc4})}""")
        print(r)
        await A.ev("()=>{const P=stNpcPos('nox');me.x=P.x;me.y=P.y+120}");await A.wait(1000);await A.pg.screenshot(path='../p6/nox.png')
        await b.close()
    p.terminate()
asyncio.run(main())
