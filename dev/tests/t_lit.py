import asyncio,random,sys
from h import *
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw)},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10,mons.length,MLB.n])},1500)})"""
MP=[int(x) for x in sys.argv[1].split(',')]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog{display:none!important}';document.head.appendChild(s)}")
        for mp in MP:
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;GQ='high';enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1200)
            await A.ev("()=>{const n=MAPS[curMap].nests[2]||MAPS[curMap].nests[0];if(n){me.x=n[0];me.y=n[1]+120}if(typeof PALG!=='undefined')PALG.title=null}");await A.wait(2500)
            pf=await A.ev(M)
            await A.pg.screenshot(path=f'../p6/lit_{mp}.png');print(mp,pf,await A.ev("()=>[GX.ambK,gxRimCol()]"))
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
