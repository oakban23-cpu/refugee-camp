import asyncio,sys,json
sys.path.insert(0,'.')
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':393,'height':864},device_scale_factor=2,has_touch=True,is_mobile=True)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['mage','Cu2',99]);await pg.wait_for_timeout(1500)
        for mp in sys.argv[1].split(','):
            await pg.evaluate(f"()=>{{gmGod=true;AUTO.on=false;ov.hidden=true;const m={mp};enterMap(m,{{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600}})}}");await pg.wait_for_timeout(4500)
            r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const fns=['drawMon','drawChar','campFolk','drawP0','drawMonAnim','drawNpc','drawCommander','drawRancher2'];const O={},st={};
              const vis=(x,y)=>{const M=g.getTransform(),sx=M.a*x+M.c*y+M.e,sy=M.b*x+M.d*y+M.f,m=140*M.a;return sx>-m&&sx<cv.width+m&&sy>-m&&sy<cv.height+m};
              fns.forEach(n=>{if(typeof window[n]!=='function')return;O[n]=window[n];st[n]=[0,0];window[n]=function(a,b){let x=a,y=b;if(a&&typeof a==='object'){x=a.x;y=a.y}st[n][0]++;if(typeof x==='number'&&typeof y==='number'&&!vis(x,y))st[n][1]++;return O[n].apply(this,arguments)};try{eval(n+'=window[n]')}catch(e){}});
              let fr=0,r2=1;const cnt=()=>{if(!r2)return;fr++;requestAnimationFrame(cnt)};requestAnimationFrame(cnt);await w(2000);r2=0;fns.forEach(n=>{if(O[n]){window[n]=O[n];try{eval(n+'=window[n]')}catch(e){}}});
              return {map:curMap,per:Object.fromEntries(Object.entries(st).map(([k,v])=>[k,[+(v[0]/fr).toFixed(1),+(v[1]/fr).toFixed(1)]]))}}""")
            print(json.dumps(r))
    finally: p.terminate()
asyncio.run(main())
