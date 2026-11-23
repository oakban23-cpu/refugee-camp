import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
INIT=r"""(()=>{const P=window.__CV=[];const ce=Document.prototype.createElement;Document.prototype.createElement=function(t){const e=ce.apply(this,arguments);try{if(String(t).toLowerCase()==='canvas'){let s='';try{const st=(new Error().stack||'').split('\n');s=st.slice(2,4).map(x=>x.trim().replace(/^at /,'').replace(/\(?https?:\/\/[^:]+:\d+\//,'').replace(/\)$/,'')).join(' < ')}catch(_){}P.push([new WeakRef(e),s])}}catch(_){}return e}})();"""
CL = "()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;try{ov.hidden=true}catch(e){}}"
GO = "async([m])=>{enterMap(m,{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600});await new Promise(r=>setTimeout(r,3500))}"
CEN = r"""()=>{const out={};let tot=0;for(const [w,s] of __CV){const c=w.deref();if(!c)continue;const a=c.width*c.height;tot+=a;if(a<200000)continue;const k=s;const o=out[k]||(out[k]={n:0,MB:0,max:''});o.n++;o.MB+=a*4/1048576;if(!o.max||a>o.mx){o.mx=a;o.max=c.width+'x'+c.height}}
  return [Math.round(tot*4/1048576),Object.entries(out).map(([k,v])=>[Math.round(v.MB*10)/10,v.n,v.max,k.slice(0,150)]).sort((a,b)=>b[0]-a[0]).slice(0,25)]}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            ctx=await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)
            await ctx.add_init_script(INIT);pg=await ctx.new_page();cdp=await ctx.new_cdp_session(pg)
            await pg.goto(URL);await pg.wait_for_timeout(3500)
            await pg.evaluate(SETUP,['mage','Cv1',160]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
            for m in [9,44,38,40,2,1]:
                await pg.evaluate(GO,[m]);await pg.evaluate(CL)
            await cdp.send('HeapProfiler.collectGarbage')
            r=await pg.evaluate(CEN)
            print('live canvas MB (after maps 9,44,38,40,2 → camp):',r[0])
            for x in r[1]:print('  ',x)
    finally:p.terminate()
asyncio.run(main())
