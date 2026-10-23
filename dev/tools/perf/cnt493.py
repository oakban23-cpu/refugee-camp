import asyncio, sys, json, os, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
FN=os.environ.get('FN','drawChar,drawP0,drawP,drawKnight,campFolk,drawMon,drawMonT,vz3VilDraw,drawOneGate,campBanner,chicken').split(',')
W="""(F)=>{window.__fc={};for(const n of F){try{const f=eval(n);if(typeof f!=='function')continue;const w=function(){const C=window.__fc;if(C.on){const o=C[n]||(C[n]={n:0,by:{}});o.n++;if(o.n%7===1){const L=new Error().stack.split(String.fromCharCode(10)).slice(2,5).map(s=>(/at (?:new )?([^ (]+)/.exec(s)||[])[1]||'?').join(' < ');o.by[L]=(o.by[L]||0)+7}}return f.apply(this,arguments)};eval(n+'=w')}catch(e){}}}"""
RUN="""(ms)=>new Promise(r=>{const C=window.__fc;for(const k in C)if(k!=='on')delete C[k];let n=0;C.on=1;const t0=performance.now();function f(t){n++;if(t-t0<ms)requestAnimationFrame(f);else{C.on=0;const o={};for(const k in C){if(k==='on')continue;o[k]={pf:+(C[k].n/n).toFixed(1),by:Object.entries(C[k].by).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([a,b])=>[a,+(b/n).toFixed(1)])}}r({frames:n,o})}}requestAnimationFrame(f)})"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        await ctx.add_init_script("try{localStorage.setItem('refugee_gq','low')}catch(e){}")
        pg=await ctx.new_page();M=Client(ctx,pg,'M')
        await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','Cn'+str(random.randint(10,99)),60]);await pg.wait_for_timeout(1500)
        await M.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}")
        await M.ev(W,FN);await M.ev("()=>{me.x=1600;me.y=1700}");await M.wait(1500)
        r=await M.ev(RUN,3000);print('camp',r['frames']);[print(' ',k,v['pf'],v['by']) for k,v in r['o'].items()]
        await M.ev("()=>{enterMap(13,{x:1100,y:1900})}");await M.wait(3500);await M.ev("()=>{AUTO.on=true}");await M.wait(3000)
        r=await M.ev(RUN,3000);print('field',r['frames']);[print(' ',k,v['pf'],v['by']) for k,v in r['o'].items()]
        z=await M.ev("()=>({cam:[cam.x,cam.y],W,H,T:g.getTransform().a,zm:typeof ZM!=='undefined'?JSON.stringify(ZM).slice(0,120):''})");print(z)
    finally: p.terminate()
asyncio.run(main())
