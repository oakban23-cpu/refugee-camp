import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for vw,vh in [(390,844),(900,700),(740,360)]:
            ctx = await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2)
            pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
            await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','M'+str(random.randint(1000,9999)),99]);await pg.wait_for_timeout(2000)
            await c.ev("()=>{me.cls2=1;me.rb=0;try{localStorage.removeItem('refugee_rbqmin')}catch(e){}ov.hidden=true;enterMap(8,{x:1600,y:1600})}");await c.wait(2000)
            await pg.screenshot(path=f'../fx/rbq_open_{vw}.png')
            box=await pg.evaluate("()=>{const e=document.querySelector('#rbq .rqx');if(!e)return null;const r=e.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2,getComputedStyle(e).display]}")
            print(vw,'btn',box)
            if box and box[2]!='none':
                await pg.mouse.click(box[0],box[1]);await c.wait(600)
            else:
                await c.ev("()=>{document.getElementById('rbq').click()}");await c.wait(600)
            print(vw,'min',await c.ev("()=>[document.getElementById('rbq').className,document.getElementById('rbq').innerText,typeof AQ!=='undefined'&&!!AQ]"))
            await pg.screenshot(path=f'../fx/rbq_min_{vw}.png')
            await c.ev("()=>{document.getElementById('rbq').click()}");await c.wait(600)
            print(vw,'reopen',await c.ev("()=>[document.getElementById('rbq').className,typeof AQ!=='undefined'&&!!AQ]"))
            await ctx.close()
        await b.close()
    p.terminate()
asyncio.run(main())
