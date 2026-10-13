import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
UIS = ['gearUI','treeUI','storyUI','shopUI','msmUI','smithUI','petUI','mountUI','cardUI','eventUI','questUI','partyUI','setUI','rareUI','autoUI','awkUI','darkUI','dungeonUI','mktUI','pvpUI','rxUI','tradeUI','twShopUI','blUI','chSwUI']
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha'); B = await new_client(b, 'Bravo')
        print('online', A.online, B.online)
        res = []
        for maps in [1, 9]:
            await A.ev(f"()=>{{enterMap({maps},{{x:SX,y:SY}})}}"); await A.wait(1500)
            for ui in UIS:
                ok = await A.ev(f"()=>typeof {ui}==='function'")
                if not ok: continue
                await A.ev("()=>{window.__mut=0;ov.hidden=false}")
                try: await A.ev(f"()=>{{{ui}()}}")
                except Exception as e: res.append((maps, ui, 'THROW', str(e)[:150])); continue
                await A.wait(400); await A.ev("()=>{window.__mut=0}"); await A.wait(2500)
                m = await A.ev("()=>window.__mut")
                tabs = await A.ev("()=>[...ov.querySelectorAll('[data-tab]')].map(b=>b.dataset.tab)")
                worst = m; wt = ''
                for t in tabs:
                    try:
                        await A.ev("(t)=>{const b=ov.querySelector('[data-tab=\"'+t+'\"]');if(b)b.click()}", t)
                    except Exception as e: res.append((maps, ui, 'TAB-THROW ' + t, str(e)[:150])); continue
                    await A.wait(400); await A.ev("()=>{window.__mut=0}"); await A.wait(2000)
                    mt = await A.ev("()=>window.__mut")
                    if mt > worst: worst, wt = mt, t
                res.append((maps, ui, worst, wt))
                await A.ev("()=>{ov.hidden=true}")
        for r in res:
            flag = ' <<< LOOP?' if isinstance(r[2], int) and r[2] > 20 else (' <<< ' if not isinstance(r[2], int) else '')
            if flag or '-v' in sys.argv: print(r, flag)
        print('A errors:', A.errs[:8]); print('B errors:', B.errs[:4])
        await b.close()
    p.terminate()
asyncio.run(main())
