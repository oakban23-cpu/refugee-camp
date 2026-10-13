import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'M'+str(random.randint(1000,9999)), 'melee', 99)
        await A.ev("()=>{ov.hidden=true;enterMap(18,{x:1300,y:1600})}");await A.wait(5000)
        print(await A.ev("()=>[curMap,isHost(),typeof mvSrv==='function'&&mvSrv(),!!mvBoss(),mons.filter(m=>m.t===3).length,MAPS[18].mvpOnly,bossCd,room&&room.connected]"))
        import urllib.request,json
        try:print(urllib.request.urlopen(URL+'admin/stats',timeout=2).read()[:300])
        except Exception as e:print('st',e)
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    out=p.stdout.read1(5000) if hasattr(p.stdout,'read1') else b''
    p.terminate();print(out[-1500:].decode(errors='ignore'))
asyncio.run(main())
