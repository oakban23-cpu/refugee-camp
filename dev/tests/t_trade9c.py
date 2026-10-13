import asyncio,sys,os,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from h import *
async def click_el(c,sel):
    r=await c.ev(f"()=>{{const e=document.querySelector('{sel}');if(!e||e.offsetParent===null)return null;const b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2,(document.elementFromPoint(b.left+b.width/2,b.top+b.height/2)||{{}}).id||'']}}")
    if not r:return 'notvisible'
    await c.pg.mouse.click(r[0],r[1]);return r[2]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Alpha');B=await new_client(b,'Bravo')
        for mp,x,y in [(1,1600,1750),(9,1600,1700),(9,2050,1800),(9,1450,1450),(9,1600,2150)]:
            for c,dx in ((A,0),(B,50)):await c.ev(f"()=>{{enterMap({mp},{{x:{x+dx},y:{y}}});ov.hidden=true;banner=null}}")
            await A.wait(2500)
            pos=await A.ev("""()=>{const u=Object.keys(others)[0];const o=others[u];const r=cv.getBoundingClientRect();return [r.left+(o.x-cam.x)*r.width/W, r.top+(o.y-20-cam.y)*r.height/H]}""")
            await A.pg.mouse.click(pos[0],pos[1]);await A.wait(400)
            t1=await click_el(A,'#plpop [data-pp=trade]');await A.wait(1500)
            t2=await click_el(B,'#trqa');await B.wait(1500)
            res=await A.ev("()=>tr&&tr.st"),await B.ev("()=>tr&&tr.st"),await B.ev("()=>[ov.hidden,ov.dataset.k]")
            print(mp,x,y,'popTrade:',t1,'acceptBtn:',t2,'states',res)
            if res[1]!='open': await B.pg.screenshot(path=f'trfail_{mp}_{x}.png')
            await A.ev("()=>{if(tr)trCancel('x')}");await B.ev("()=>{if(tr)trCancel('x');trReq=null;ov.hidden=true}");await A.wait(3500)
        await b.close()
    p.terminate()
asyncio.run(main())
