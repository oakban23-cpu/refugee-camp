import asyncio,random,sys
from h import *
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw)},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10])},1500)})"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in [9,27,29,30,31,32]:
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;ov.hidden=true;try{{dnHour=()=>12}}catch(e){{}};enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}});}}");await A.wait(1200)
            await A.ev(f"()=>{{me.y=MAPS[{mp}].sy+({mp}===31?500:-500)*({mp}===9?0.6:1);me.x=MAPS[{mp}].sx+60;if(typeof PALG!=='undefined')PALG.title=null}}");await A.wait(1800)
            pf=await A.ev(M)
            await A.pg.screenshot(path=f'../p6/d4_{mp}.png');print(mp,pf)
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
