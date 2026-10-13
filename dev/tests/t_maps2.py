import asyncio, sys, random, os, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
OUT=sys.argv[1]; IDS=[int(x) for x in sys.argv[2].split(',')] if len(sys.argv)>2 else None
MD='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/maps/'
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':1280,'height':800})
        pg = await ctx.new_page(); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2000)
        await pg.evaluate(SETUP, ['melee','Mp'+str(random.randint(1000,9999)), 90]); await pg.wait_for_timeout(1500)
        await pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        ids = IDS or await pg.evaluate("()=>Object.keys(MAPS).map(Number).filter(k=>k<100&&!MAPS[k].dg&&!MAPS[k].trial).sort((a,b)=>a-b)")
        info={}
        for mp in ids:
            pts=await pg.evaluate(f"""()=>{{gmGod=true;window.DNH=13;enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}});const M=MAPS[{mp}];const P=[[M.sx,M.sy+80]];if(M.boss&&M.boss.x>0)P.push([M.boss.x-120,M.boss.y+120]);P.push([WW*.25,WH*.3]);P.push([WW*.72,WH*.7]);return [P,M.n]}}""")
            info[mp]=pts[1]
            for i,(x,y) in enumerate(pts[0]):
                await pg.evaluate(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>m.t===3);banner=null;dn=[]}}")
                await pg.wait_for_timeout(900)
                errs.extend(await pg.evaluate('()=>(window.__err||[]).splice(0)'))
                await pg.screenshot(path=MD+f'{OUT}_{mp}_{i}.png')
        json.dump(info,open(MD+f'{OUT}_names.json','w'),ensure_ascii=False)
        print(ids, errs[:3])
        await b.close()
    p.terminate()
asyncio.run(main())
