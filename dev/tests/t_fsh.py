import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'mage'); B = await new_client(b, 'Bravo', 'melee')
        for c in (A,B): await c.ev("()=>{ov.hidden=true;enterMap(1,{x:1600,y:1600});}")
        await A.wait(2500)
        await A.ev("()=>{me.x=1330;me.y=2195}");await B.ev("()=>{me.x=1430;me.y=2195}");await A.wait(1500)
        await A.ev("()=>{fsOpen()}");await A.wait(1000)
        print('B sees rod', await B.ev("()=>{const u=Object.values(others).find(o=>o.n&&o.n.indexOf('Alpha')>=0);return u?[u.u,!!FSHR[u.u],FSHR[u.u]&&FSHR[u.u].on]:null}"))
        await A.ev("()=>{FS.t=0}");await A.wait(150);await A.ev("()=>{FS.f='w3';fsReelStart()}")
        await A.ev("async()=>{for(let i=0;i<10&&FS.ph==='reel';i++){FS.pos=FS.zc;fsAct();await new Promise(r=>setTimeout(r,40))}}");await A.wait(400)
        print('B after catch', await B.ev("()=>{const u=Object.values(others).find(o=>o.n&&o.n.indexOf('Alpha')>=0);const R=u&&FSHR[u.u];return R?[R.on,!!R.leap,chatLog.slice(-2).map(x=>x.t||x.m||JSON.stringify(x)).join(' | ')]:null}"))
        await B.pg.screenshot(path='fsh_B.png')
        print('A save fs', await A.ev("()=>JSON.stringify(me.fs.c)"))
        for c in (A,B):print(c.name,[e for e in c.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
