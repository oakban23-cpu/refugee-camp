"""ไล่ทุกแมพ: เข้าแมพ · เดินรอบ ๆ · ตีมอนใกล้ ๆ · กลางวัน/กลางคืน · HD เปิด · จับ pageerror + console.error + ค้าง (fps) + ภาพ"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
OUT = []
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            ctx = await b.new_context(viewport={'width': 430, 'height': 900}, device_scale_factor=1.5)
            pg = await ctx.new_page(); errs = []
            pg.on('pageerror', lambda e: errs.append('PE ' + str(e)[:260]))
            pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and 'ERR_TUNNEL' not in m.text and errs.append('CE ' + m.text[:260]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['melee', 'Sw' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            ids = await pg.evaluate("()=>Object.keys(MAPS).map(Number).filter(k=>MAPS[k]&&!MAPS[k].dg&&!MAPS[k].tent).sort((a,b)=>a-b)")
            print('maps', ids, flush=True)
            import os
            for mid in [i for i in ids if i >= int(os.environ.get("SW_FROM","0"))]:
                for hr in (12, 22):
                    n0 = len(errs)
                    try:
                        r = await pg.evaluate("""async([m,hr])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));ov.hidden=true;banner=null;window.DNH=hr;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;
                          try{enterMap(m,{x:CX,y:CY})}catch(e){return {err:'enter '+e.message}}await w(1800);
                          const M=MAPS[curMap];const pts=[[M.sx,M.sy]];(M.gates||[]).slice(0,3).forEach(G=>pts.push([G.x,G.y+40]));if(M.boss)pts.push([M.boss.x,M.boss.y+120]);
                          let fr=0,t0=performance.now(),worst=0,lt=performance.now();const tick=()=>{const n=performance.now();worst=Math.max(worst,n-lt);lt=n;fr++;if(run)requestAnimationFrame(tick)};requestAnimationFrame(tick);
                          for(const [x,y] of pts){if(x==null)continue;me.x=x;me.y=y;await w(500);const m2=mons.filter(q=>q.hp>0).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];if(m2&&Math.hypot(m2.x-me.x,m2.y-me.y)<400){me.x=m2.x+30;me.y=m2.y;try{if(typeof attack==='function')attack()}catch(e){}await w(400)}}
                          return {cur:curMap,n:M.n,fr,ms:+((performance.now()-t0)/Math.max(1,fr)).toFixed(1),worst:Math.round(worst),mons:mons.length,run}}""", [mid, hr])
                    except Exception as e:
                        r = {'err': 'eval ' + str(e)[:200]}
                    if hr == 12: await pg.screenshot(path=f'np/sweep/m{mid}.jpg', type='jpeg', quality=55)
                    new = errs[n0:]
                    OUT.append({'m': mid, 'hr': hr, 'r': r, 'errs': new[:5]})
                    print(mid, hr, r, new[:3], flush=True)
            json.dump(OUT, open('sweep.json', 'w'), ensure_ascii=False, indent=0)
    finally:
        p.terminate()
asyncio.run(main())
