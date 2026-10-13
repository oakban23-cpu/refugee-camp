import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Fp'+str(random.randint(1000,9999)), 'mage', 60)
        await A.wait(1000)
        r=await A.ev("""()=>{const K=[['rage',60],['roar',150],['taunt',150],['bloodline',40,0,260],['mtrapx',100],['rift',120],['riftx',120],['tstop',180],['smite',75],['sanct',130],['dawn',260],['markx',85],['eclipse',90],['pin',110],['chain',40],['whirl',85],['dash',30,0,120],['quake',60,0,230],['swipe',25,0,1],['arrows',90],['leap',30],['beam',40,0,380],['fire',95],['frost',150],['rune',170],['heal',170],['atk',190],['holy',230],['shadow',40,0,1]];const out={};
          for(const lq of [false,true]){LOWQ=lq;for(const [k,r,a,len] of K){const f={k,x:me.x,y:me.y,r,a:a||0,len:len||0,s:123,t:0,d:FXD[k]||.5};let t0=performance.now();const N=60;for(let i=0;i<N;i++){f.t=f.d*(1-(i+.5)/N);g.save();drawFx(f);g.restore()}out[k+(lq?'_L':'')]=+((performance.now()-t0)/N).toFixed(3)}}LOWQ=false;
          const z={x:me.x,y:me.y,r:100,t:3};let t0=performance.now();for(let i=0;i<60;i++)vxFog(z,1,i/30);out.fog=+((performance.now()-t0)/60).toFixed(3);return out}""")
        print(r)
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
