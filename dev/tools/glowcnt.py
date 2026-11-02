import asyncio,sys,json
sys.path.insert(0,'.')
from h import *
MAPNAME=sys.argv[1] if len(sys.argv)>1 else 'ทะเลสาบใต้ดินเรืองแสง'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':393,'height':864},device_scale_factor=2,has_touch=True,is_mobile=True)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['mage','Gc1',99]);await pg.wait_for_timeout(2000)
        mid=await pg.evaluate(f"()=>{{for(const k in MAPS)if(MAPS[k].n==={json.dumps(MAPNAME)})return +k;return null}}")
        print('map',mid)
        await pg.evaluate(f"()=>{{gmGod=true;AUTO.on=false;ov.hidden=true;enterMap({mid},{{x:MAPS[{mid}].sx||1600,y:MAPS[{mid}].sy||1600}})}}");await pg.wait_for_timeout(4000)
        await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const o=glowAt;let n=0,area=0,off=0,tiny=0,low=0;const by={};
          window.glowAt=glowAt=function(x,y,r,c,a){n++;const M=g.getTransform(),D=2*r*M.a,sx=M.a*x+M.e,sy=M.d*y+M.f;area+=D*D;if(sx+D/2<0||sy+D/2<0||sx-D/2>cv.width||sy-D/2>cv.height)off++;if(D<14)tiny++;if(a<.05)low++;
            const st=(new Error().stack||'').split('\\n')[2]||'';const k=(st.match(/at ([\\w$.<>]+)/)||[,'?'])[1];by[k]=by[k]||[0,0];by[k][0]++;by[k][1]+=D*D;return o.apply(this,arguments)};
          await w(2000);n=0;area=0;off=0;tiny=0;low=0;for(const k in by)delete by[k];const f0=FQ.n+0;let fr=0;const cnt=t=>{fr++;if(fr<60)requestAnimationFrame(cnt)};requestAnimationFrame(cnt);await w(3000);
          window.glowAt=glowAt=o;const F=Math.max(1,fr);return {frames:fr,perFrame:Math.round(n/F),areaScreens:+(area/F/(cv.width*cv.height)).toFixed(2),offPct:Math.round(off/n*100),tinyPct:Math.round(tiny/n*100),lowPct:Math.round(low/n*100),
            cv:[cv.width,cv.height],top:Object.entries(by).sort((a,b)=>b[1][1]-a[1][1]).slice(0,12).map(([k,v])=>[k,Math.round(v[0]/F),+(v[1]/F/(cv.width*cv.height)).toFixed(2)])}}""")
        print(json.dumps(r,ensure_ascii=False))
    finally: p.terminate()
asyncio.run(main())
