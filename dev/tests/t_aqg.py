import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Aqg'+str(random.randint(1000,9999)), 'melee', 12)
        for sx,sy,tx,ty in [(1606,1945,2100,2000),(1606,1930,2300,1700),(1612,1960,2000,1300),(1700,1800,1700,2300),(1600,2100,1600,1600),(1600,2000,1600,1100),(1100,1650,2100,1600),(2200,2000,1500,1500),(1606,1880,1650,2300),(1560,1700,1600,2400),(1600,1900,1300,2300),(1900,1600,2400,1650),(1600,1300,1600,900),(1300,1600,900,1600)]:
            r=await A.ev(f"""()=>{{gmGod=true;me.x={sx};me.y={sy};AQ={{src:'t',det:0,ev:0,sx:me.x,sy:me.y}};const C=CL[me.cls];const out=[];
              for(let i=0;i<400;i++){{const d=aqWalk({tx},{ty},1/30,C);try{{lmCollide()}}catch(e){{}};try{{campCollide()}}catch(e){{}};if(i%40==0)out.push([Math.round(me.x),Math.round(me.y),Math.round(d)])}}AQ=null;return out}}""")
            print((sx,sy,'->',tx,ty),r)
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
