import asyncio,random,sys
from h import *
K={19:'fring',20:'bogpool',21:'cobble',22:'carpet',23:'rootline',24:'glowpool',25:'grave',26:'lavaRiver'}
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{const s=document.getElementById('stq')||document.querySelector('.stq');}")
        for mp,k in K.items():
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;ov.hidden=true;enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1200)
            r=await A.ev(f"()=>{{const F=depBuild();const o=F.L.find(q=>q.k==='{k}');const cnt={{}};F.L.forEach(q=>cnt[q.k]=(cnt[q.k]||0)+1);const P=o?(o.pts?o.pts[(o.pts.length/2)|0]:[o.x,o.y]):null;if(P){{me.x=P[0]+40;me.y=P[1]+170}}return [P,cnt,F.fx.length]}}")
            await A.wait(1600)
            await A.pg.screenshot(path=f'../p6/d3_{mp}.png')
            print(mp,r)
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
