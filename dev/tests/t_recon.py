import asyncio, sys, json, time, subprocess, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
import h
from h import *
def rep(n, ok, info=''): print(('PASS ' if ok else 'FAIL ') + n, info, flush=True)
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'melee'); B = await new_client(b, 'Bravo', 'mage')
        for c in (A, B): await c.ev("()=>{ov.hidden=true;enterMap(18,{x:1300,y:1600})}")
        await A.wait(5000)
        ha = await A.ev("()=>isHost()"); H, O = (A, B) if ha else (B, A)
        boss = await O.ev("()=>{const m=mons.find(q=>q.t===3);return m?[m.id,Math.round(m.hp)]:null}")
        rep('boss present before host leaves', bool(boss), str(boss))
        # host migration: host leaves map
        await O.ev("()=>{window._bl=[];window._bi=setInterval(()=>{const m=mons.find(q=>q.t===3);window._bl.push(m?[isHost(),Math.round(m.x),Math.round(m.y),Math.round(m.hp),m.hx,m.mvp,mons.length]:['none',isHost(),mons.length])},250)}")
        await H.ev("()=>{enterMap(9,{x:1600,y:1750})}"); await O.wait(7000)
        print('  probe', await O.ev("()=>JSON.stringify(window._bl.slice(0,24))"))
        ho = await O.ev("()=>isHost()"); b2 = await O.ev("()=>{const m=mons.find(q=>q.t===3);return m?[m.id,Math.round(m.hp)]:null}")
        rep('other becomes host after host leaves', ho, '')
        rep('boss survives host migration', bool(b2), f'{boss} -> {b2}')
        # server restart
        await H.ev("()=>{enterMap(18,{x:1300,y:1600})}"); await O.wait(3000)
        p.send_signal(15); p.wait(timeout=10)
        await A.wait(3000)
        st = await A.ev("()=>({on:!!(room&&room.url),ws:room&&room.ws?room.ws.readyState:-1})")
        print('  after server stop A:', st)
        env = dict(os.environ, PORT=str(h.PORT), DATA_DIR=h.DD)
        p = subprocess.Popen(['node', 'server.js'], cwd=h.SRV, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        ok = False
        for i in range(30):
            await A.wait(1000)
            sa = await A.ev("()=>Object.keys(others)"); sb = await B.ev("()=>Object.keys(others)")
            if B.uid in sa and A.uid in sb: ok = True; break
        rep('clients reconnect & see each other after server restart', ok, f'after {i+1}s')
        hs = [await A.ev("()=>isHost()"), await B.ev("()=>isHost()")]
        rep('exactly one host after restart', hs[0] != hs[1], str(hs))
        for c in (A, B):
            e = [x for x in c.errs if 'ERR_TUNNEL' not in x and 'ERR_CONNECTION_REFUSED' not in x and 'WebSocket' not in x] + await c.ev("()=>window.__err||[]")
            rep('no errors ' + c.name, not e, json.dumps(e[:4], ensure_ascii=False)[:600])
        await b.close()
    p.terminate()
asyncio.run(main())
