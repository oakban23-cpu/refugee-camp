import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Vp'+str(random.randint(1000,9999)), 'melee', 60)
        await A.wait(800);out={}
        for mp in [1,3,6,8,13,19,24,25]:
            r=await A.ev(f"""()=>{{enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}});vmBuild();let best=null,bc=0;for(const o of VM.P){{const c=VM.P.filter(q=>Math.abs(q.x-o.x)<180&&Math.abs(q.y-o.y)<360).length;if(c>bc){{bc=c;best=o}}if(bc>60)break}}me.x=best.x;me.y=best.y;cam.x=me.x-W/2;cam.y=me.y-H/2;
              const R=[];for(const lq of[false,true]){{LOWQ=lq;let t0=performance.now();for(let i=0;i<60;i++){{g.save();vmGround();g.restore()}}const a=(performance.now()-t0)/60;t0=performance.now();for(let i=0;i<60;i++){{g.save();vmAir(0);vmAir(1);g.restore()}}R.push([+a.toFixed(3),+((performance.now()-t0)/60).toFixed(3)])}}LOWQ=false;return [bc,R]}}""")
            out[mp]=r
        print(out)
        await b.close()
    p.terminate()
asyncio.run(main())
