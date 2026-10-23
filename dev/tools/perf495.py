import asyncio, sys, json, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
INST="""()=>{const P=CanvasRenderingContext2D.prototype;window.__cc=0;for(const k of['fill','stroke','fillRect','strokeRect','drawImage','fillText','strokeText','arc','ellipse','lineTo','moveTo','quadraticCurveTo','bezierCurveTo','beginPath','closePath','save','restore','createLinearGradient','createRadialGradient','roundRect','rect','clip']){const f=P[k];P[k]=function(){window.__cc++;return f.apply(this,arguments)}}
 const _l=loop;window.__lt=0;window.__ln=0;loop=function(t){const a=performance.now();const r=_l.apply(this,arguments);window.__lt+=performance.now()-a;window.__ln++;return r}}"""
RUN="""(ms)=>new Promise(r=>{window.__cc=0;window.__lt=0;window.__ln=0;setTimeout(()=>r({calls:Math.round(window.__cc/Math.max(1,window.__ln)),ms:+(window.__lt/Math.max(1,window.__ln)).toFixed(2),n:window.__ln}),ms)})"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        await ctx.add_init_script("try{localStorage.setItem('refugee_gq','low')}catch(e){}")
        pg=await ctx.new_page();M=Client(ctx,pg,'M')
        await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['mage','Pf'+str(random.randint(10,99)),99]);await pg.wait_for_timeout(1500)
        await M.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;window.DNH=12}")
        await M.ev(INST)
        await M.ev("()=>{enterMap(38,{x:1100,y:1600})}");await M.wait(4000)
        for mp,x,y in ((34,1500,1100),(34,900,2000),(36,1600,2000),(38,1100,1600),(38,700,900),(38,1300,2500)):
            await M.ev(f"()=>{{enterMap({mp},{{x:{x},y:{y}}})}}");await M.wait(3500)
            await M.ev(f"()=>{{me.x={x};me.y={y}}}");await M.wait(1500)
            r=await M.ev(RUN,4000);print(mp,x,y,r,await M.ev("()=>[mons.length,mons.filter(m=>m.p).length,mons.filter(m=>palVis(m.x,m.y,60)).length,trees.length]"),flush=True)
    finally: p.terminate()
asyncio.run(main())
