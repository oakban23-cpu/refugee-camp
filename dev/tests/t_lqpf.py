import asyncio,random,sys
from h import *
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw)},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10])},2000)})"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for lq in ['true','false']:
            await A.ev("()=>{clearInterval(window.__iv);window.__iv=setInterval(()=>{LOWQ="+lq+";FQ.avg=0},40)}")
            for mp in [1,19,26,32]:
                await A.ev(f"()=>{{gmGod=true;enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy+300}})}}");await A.wait(1500)
                print('LOWQ',lq,mp,await A.ev(M))
        await b.close()
    p.terminate()
asyncio.run(main())
