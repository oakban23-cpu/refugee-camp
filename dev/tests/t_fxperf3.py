import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Fp'+str(random.randint(1000,9999)), 'mage', 60)
        await A.wait(1000)
        r=await A.ev("""()=>{const K=[['bash',150,0,4],['fort',150],['fortw',75],['torn',70],['storm',210],['zap',34],['wind',30],['curse',20],['seal',110],['soulx',70],['bell',170],['bdash',30],['bstrm',50],['bstorm',80],['impshot',24],['golem',100],['hellgate',140],['rinv',230],['rcr',190],['ras',190],['rnfire',44],['rncomet',40,.9,240],['rnarrow',1],['whirl',85],['dawn',260]];const out={};
          for(const lq of [false,true]){LOWQ=lq;for(const [k,r,a,len] of K){const f={k,x:me.x,y:me.y,r,a:a||0,len:len||0,s:123,t:0,d:FXD[k]||({fort:6,torn:3,storm:5,seal:6,bell:6,bstrm:3,golem:8,hellgate:6})[k]||.5,sx:me.x-60,sy:me.y,u:uid,pts:[[me.x,me.y],[me.x+80,me.y-20]]};let t0=performance.now();const N=60;for(let i=0;i<N;i++){f.t=f.d*(1-(i+.5)/N);g.save();drawFx(f);g.restore()}out[k+(lq?'_L':'')]=+((performance.now()-t0)/N).toFixed(3)}}LOWQ=false;
          const z={x:me.x,y:me.y,r:100,t:3};let t0=performance.now();for(let i=0;i<60;i++)vxFog(z,1,i/30);out.fog=+((performance.now()-t0)/60).toFixed(3);return out}""")
        print(r)
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
