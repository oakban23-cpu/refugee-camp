import asyncio,random,sys
from h import *
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw)},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10])},1200)})"""
IDS=[int(x) for x in sys.argv[1].split(',')] if len(sys.argv)>1 else [11001,31001,50001,60001,70001,73001,74001,75001,76001,79001,80001,81001,82001,87001,88001,89001,90001]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for i in IDS:
            r=await A.ev(f"()=>{{gmGod=true;LOWQ=false;try{{const M=dgMap({i});if(!M)return 'none';enterMap({i},{{x:M.sx,y:M.sy}});return [M.n,M.dg,!!M.pvp,dgTheme(),isDg(),isArena()]}}catch(e){{return 'ERR '+e}}}}")
            await A.wait(2200)
            pf=await A.ev(M)
            await A.pg.screenshot(path=f'../p6/dg_{i}.png');print(i,r,pf)
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
