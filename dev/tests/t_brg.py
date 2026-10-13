import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.length-1)")
        await A.ev(f"()=>{{gmGod=true;me.sty={{s:{i0},n:0,a:0,e:1,e4:2}};ov.hidden=true;enterMap(30,{{x:1600,y:2860}})}}");await A.wait(3000)
        print('map',await A.ev("()=>[curMap,trees.length,trees.filter(t=>t.inv).length,mons.length,brgIn(1600,2860),brgIn(1600,1700),brgIn(300,300),MAPS[30].nests.map(n=>brgIn(n[0],n[1],20)).join('')]"))
        shots=[(1600,2860,'a_land'),(1450,2350,'b_low'),(1600,1720,'c_rest'),(900,2130,'d_west'),(2560,1180,'e_east'),(1900,1150,'f_high'),(1600,420,'g_gate')]
        for x,y,f in shots:
            await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>500)}}");await A.wait(1300)
            await A.pg.screenshot(path='../p6/'+f+'.png')
        t=await A.ev("()=>{const t0=performance.now();for(let i=0;i<30;i++){draw()}return (performance.now()-t0)/30}")
        print('frame ms',t)
        print([e for e in A.errs if 'TUNNEL' not in e][:6])
        await b.close()
    p.terminate()
asyncio.run(main())
