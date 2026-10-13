import asyncio,sys,os,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Alpha');B=await new_client(b,'Bravo')
        for mp,x,y in [(1,1600,1750),(9,1600,1700),(9,1600,1950)]:
            for c,dx in ((A,0),(B,60)):await c.ev(f"()=>{{enterMap({mp},{{x:{x+dx},y:{y}}});ov.hidden=true;banner=null}}")
            await A.wait(2500)
            pos=await A.ev("""()=>{const u=Object.keys(others)[0];const o=others[u];const r=cv.getBoundingClientRect();return [r.left+(o.x-cam.x)*r.width/W, r.top+(o.y-8-cam.y)*r.height/H]}""")
            el=await A.pg.evaluate("([x,y])=>{const e=document.elementFromPoint(x,y);return e?(e.id||e.tagName)+'.'+e.className:''}",pos)
            await A.pg.mouse.click(pos[0],pos[1]);await A.wait(400)
            st=await A.ev("()=>[!!plPop,$('plpop').hidden]")
            await A.ev("()=>{const b=$('plpop').querySelector('[data-pp=\"trade\"]');if(b&&!$('plpop').hidden)b.click()}");await A.wait(1500)
            bq=await B.ev("()=>{const q=$('trq');const r=q.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {req:!!trReq,vis:!q.hidden,top:(e&&(e.id||e.className))||'',ovh:ov.hidden,ovk:ov.dataset.k}}")
            await B.pg.screenshot(path=f'trq_{mp}_{y}.png')
            print(mp,y,'elAtTap',el,'pop',st,'A tr',await A.ev("()=>tr&&tr.st"),'B',bq)
            await A.ev("()=>{if(tr)trClose('x')}");await B.ev("()=>{trReq=null}");await A.wait(3500)
        await b.close()
    p.terminate()
asyncio.run(main())
