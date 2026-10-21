import asyncio,sys,json,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
VPS=[('ph',788,288,1),('pm',844,390,1),('pc',1440,900,0),('pp',390,844,1)]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h,mob in VPS:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(mob),device_scale_factor=2 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'ctx/{nm}_title.png')
            r=await pg.evaluate("()=>{const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]};return {go:q('#ttl .go'),lg:q('#ttl .lg'),bg:q('#ttl .bg'),ver:q('#ttl .ver'),vw:innerWidth,vh:innerHeight}}")
            print(nm,'title',json.dumps(r))
            await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.click()}");await pg.wait_for_timeout(1500)
            r=await pg.evaluate("()=>{const q=s=>{const e=ov.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]};return {L:!!ov.querySelector('.vwcsL'),stage:q('.cs-stage'),cv:q('.cs-stage canvas'),cls:q('.cs-cls'),name:q('.cs-namebox'),go:q('.cs-go'),vh:innerHeight}}")
            print(nm,'create',json.dumps(r))
            await pg.screenshot(path=f'ctx/{nm}_create.png')
            await pg.evaluate("()=>{const b=ov.querySelectorAll('.cs-cls button')[2];if(b)b.click()}");await pg.wait_for_timeout(800)
            r=await pg.evaluate("()=>({L:!!ov.querySelector('.vwcsL'),on:(ov.querySelector('.cs-cls button.on')||{}).textContent})")
            print(nm,'after class click',r)
            await pg.screenshot(path=f'ctx/{nm}_create2.png')
            print(nm,'errs',E[:3])
            await ctx.close()
        # หมุนจอระหว่างหน้าสร้างตัวละคร
        ctx=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.click()}");await pg.wait_for_timeout(1200)
        a=await pg.evaluate("()=>!!ov.querySelector('.vwcsL')")
        await pg.set_viewport_size({'width':844,'height':390});await pg.wait_for_timeout(1000)
        b2=await pg.evaluate("()=>!!ov.querySelector('.vwcsL')")
        await pg.screenshot(path='ctx/rot_create_l.png')
        await pg.set_viewport_size({'width':390,'height':844});await pg.wait_for_timeout(1000)
        c=await pg.evaluate("()=>[!!ov.querySelector('.vwcsL'),[...ov.querySelector('.csw').children].map(e=>e.className).join('|')]")
        await pg.screenshot(path='ctx/rot_create_p.png')
        print('rotate',a,b2,c)
    finally: p.terminate()
asyncio.run(main())
