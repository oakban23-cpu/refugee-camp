"""วัดความหน่วงตำแหน่งเพื่อน: A เดินวงกลม (ความเร็วเดินจริง) · B (เครือข่ายจำลอง) บันทึกตำแหน่ง A ที่เห็นบนจอ
   lag = ช่วงเวลาที่ตำแหน่งที่ B เห็นตามหลังตำแหน่งจริงของ A  · env MAP (1) NET (good,4g,3g)"""
import asyncio, sys, random, os, json, math
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
NETS = {'good': (30, 20e6, 20e6), '4g': (120, 1.5e6/8*8, 750e3), '3g': (300, 400e3, 150e3)}
async def run(b, net, mp, SEC=12):
    A = await (await b.new_context(viewport={'width': 400, 'height': 800})).new_page()
    B = await (await b.new_context(viewport={'width': 400, 'height': 800})).new_page()
    for P, nm in ((A, 'La'), (B, 'Lb')):
        await P.goto(URL); await P.wait_for_timeout(2500)
        await P.evaluate(SETUP, ['melee', nm + str(random.randint(100, 999)), 60]); await P.wait_for_timeout(800)
        await P.evaluate(f"()=>{{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;enterMap({mp},{{x:CX+300,y:CY+300}})}}")
        await P.wait_for_timeout(1500)
    cdp = await B.context.new_cdp_session(B)
    lat, dn, up = NETS[net]
    await cdp.send('Network.enable'); await cdp.send('Network.emulateNetworkConditions', {'offline': False, 'latency': lat, 'downloadThroughput': dn/8, 'uploadThroughput': up/8})
    au = await A.evaluate("()=>uid")
    await B.wait_for_timeout(3000)
    host = await B.evaluate("()=>({bHost:typeof isHost==='function'?isHost():null,mons:mons.length})")
    # A เดินวงกลม (ความเร็ว ~ 180/วิ)
    await A.evaluate("""(S)=>{window.__L=[];const t0=performance.now(),cx=me.x-150,cy=me.y;window.__mv=setInterval(()=>{const t=(performance.now()-t0)/1000;me.x=cx+Math.cos(t*1.2)*150;me.y=cy+Math.sin(t*1.2)*150;__L.push([Date.now(),me.x,me.y]);if(t>S)clearInterval(__mv)},33)}""", SEC)
    await B.evaluate("""([u,S])=>{window.__R=[];const t0=performance.now();const f=()=>{const o=others[u];if(o)__R.push([Date.now(),o.x,o.y]);if(performance.now()-t0<S*1000)requestAnimationFrame(f)};requestAnimationFrame(f)}""", [au, SEC])
    await A.wait_for_timeout(SEC * 1000 + 800)
    L = await A.evaluate("()=>__L"); Rr = await B.evaluate("()=>__R")
    # lag: สำหรับทุกจุดที่ B เห็น หาเวลาของ A ที่ตำแหน่งใกล้สุด (ภายใน 4 วิก่อนหน้า)
    lags = []; err = []
    for t, x, y in Rr[len(Rr)//5:]:
        best = None
        for ta, xa, ya in L:
            if ta > t or ta < t - 4000: continue
            d = math.hypot(xa - x, ya - y)
            if best is None or d < best[0]: best = (d, t - ta)
        if best and best[0] < 25: lags.append(best[1])
        # ระยะห่างจากตำแหน่งจริงตอนนั้น
        cur = min(L, key=lambda q: abs(q[0] - t)); err.append(math.hypot(cur[1] - x, cur[2] - y))
    lags.sort(); err.sort()
    q = lambda a, p: round(a[min(len(a)-1, int(len(a)*p))]) if a else None
    r = {'net': net, 'map': mp, 'n': len(lags), 'lag50': q(lags, .5), 'lag90': q(lags, .9), 'dist50': q(err, .5), 'dist90': q(err, .9), **host}
    await A.context.close(); await B.context.close()
    return r
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            for net in os.environ.get('NET', 'good,4g,3g').split(','):
                for mp in [int(x) for x in os.environ.get('MAP', '1').split(',')]:
                    print(json.dumps(await run(b, net, mp)), flush=True)
    finally:
        p.terminate()
asyncio.run(main())
