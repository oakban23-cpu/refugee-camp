import asyncio,sys,os,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Alpha');B=await new_client(b,'Bravo')
        for mp,x,y in [(1,1600,1750),(9,1600,1700)]:
            for c,dx in ((A,0),(B,40)):await c.ev(f"()=>{{enterMap({mp},{{x:{x+dx},y:{y}}});ov.hidden=true}}")
            await A.wait(2500)
            r=await A.ev("""()=>{const u=Object.keys(others)[0];if(!u)return'no others';const o=others[u];const p={x:o.x-cam.x,y:o.y-8-cam.y};tapTarget(p);const el=$('plpop');return{u,ox:o.x,oy:o.y,me:[me.x,me.y],pop:!!plPop,hidden:el.hidden,html:el.innerHTML.slice(0,80)}}""")
            print(mp,'tap:',r)
            await A.wait(300)
            r2=await A.ev("()=>{const el=$('plpop');return [!!plPop,el.hidden]}")
            print(mp,'after 300ms',r2)
            await A.ev("()=>{const b=$('plpop').querySelector('[data-pp=\"trade\"]');if(b)b.click()}");await A.wait(1500)
            print(mp,'A tr',await A.ev("()=>tr&&{st:tr.st,with:tr.with}"),'B req',await B.ev("()=>trReq&&trReq.n"),'A ov',await A.ev("()=>[ov.hidden,ov.dataset.k,(ov.querySelector('.note')||{}).textContent]"))
            await A.ev("()=>{if(tr)trClose('x')}");await B.ev("()=>{trReq=null}");await A.wait(500)
        print('errs',A.errs[:3],B.errs[:3])
        await b.close()
    p.terminate()
asyncio.run(main())
