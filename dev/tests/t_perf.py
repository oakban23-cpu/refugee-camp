import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
import h as H
MEAS="""(ms)=>new Promise(r=>{const D=[];let l=performance.now();const t0=l;function f(n){D.push(n-l);l=n;if(n-t0<ms)requestAnimationFrame(f);else{D.sort((a,b)=>a-b);const avg=D.reduce((a,b)=>a+b,0)/D.length;r([Math.round(avg*10)/10,Math.round(D[Math.floor(D.length*.95)]),D.length,LOWQ])}}requestAnimationFrame(f)})"""
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for rate in [1,4,6]:
            ctx = await b.new_context(viewport={'width':390,'height':844}, device_scale_factor=2, has_touch=True, is_mobile=True)
            pg = await ctx.new_page(); c = Client(ctx, pg, 'P')
            await pg.goto(H.URL); await pg.wait_for_timeout(2000)
            await pg.evaluate(H.SETUP, ['mage','P'+str(random.randint(1000,9999)),90]); await pg.wait_for_timeout(2000)
            await c.ev("()=>{gmGod=true;me.x=1450;me.y=2420;try{localStorage.setItem('refugee_gq','auto')}catch(e){}}")
            cdp=await ctx.new_cdp_session(pg);await cdp.send('Emulation.setCPUThrottlingRate',{'rate':rate})
            await c.wait(1500)
            idle=await c.ev(MEAS,3000)
            await c.ev("""()=>{const L=['u3sw','u3bh','u3dk','u3tp','u3yl','u3bd'];L.forEach((k,i)=>{const a=i*1.047;handleFx({k,x:Math.round(me.x+Math.cos(a)*120),y:Math.round(me.y+Math.sin(a)*90),r:200,u:uid,by:'zz'+i})});
              ['s6sw','s6rg','s6bw','s6ob'].forEach(k=>handleFx({k,x:me.x,y:me.y,r:k==='s6rg'?140:60,u:uid,len:6,by:'yy'}))}""")
            busy=await c.ev(MEAS,2500)
            print('cpu x'+str(rate),'idle avg/p95/frames/LOWQ',idle,'| 6 ults+4 s6',busy,flush=True)
            await ctx.close()
        await b.close()
    p.terminate()
asyncio.run(main())
