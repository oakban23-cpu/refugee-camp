import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Bp'+str(random.randint(1000,9999)), 'melee', 60)
        await A.wait(800)
        r=await A.ev("""()=>{const out={};for(const lq of[false,true]){LOWQ=lq;for(const [k,r] of [['bslam',75],['bslam',230],['bhit',34],['bsum',80],['bnova',300]]){const f={k,x:me.x,y:me.y,r,a:0,len:0,s:77,t:0,d:FXD[k]||.5};const t0=performance.now();for(let i=0;i<60;i++){f.t=f.d*(1-(i+.5)/60);g.save();drawFx(f);g.restore()}out[k+r+(lq?'_L':'')]=+((performance.now()-t0)/60).toFixed(3)}
          const z={x:me.x,y:me.y,r:75,t:.5,d:1.3};let t0=performance.now();for(let i=0;i<60;i++){vxTele(z,i/60,i/30,'255,120,50')}out['tele'+(lq?'_L':'')]=+((performance.now()-t0)/60).toFixed(3)}LOWQ=false;return out}""")
        print(r);print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
