"""v580 ป่ารอบค่าย: ต้นไม้แมพ 1 → ภาพ HD (hd-nat.webp)
   ① แผ่นภาพเสิร์ฟได้  ② เปิด HD บนแมพ 1 → ต้นไม้ทุกต้นที่อยู่ในจอวาดจากภาพ (นับ drawImage จากแคช NAT) · มีครบหลายแบบ
   ③ จำนวน/ตำแหน่งต้นไม้ไม่เปลี่ยน (ชนเหมือนเดิม)  ④ ปิด HD / แมพอื่น → ไม่ใช้  ⑤ fps ไม่ตก  ⑥ ภาพก่อน/หลัง · ไม่มี error"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-nat.webp') as r:
            ok = r.status == 200 and r.headers.get('Content-Type') == 'image/webp'
        rep('hd-nat.webp เสิร์ฟได้', ok)
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            ctx = await b.new_context(viewport={'width': 1280, 'height': 720})
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Nt' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(4500)
            # จุดที่มีต้นไม้หนาแน่น
            P = await pg.evaluate("()=>{let best=null,bn=0;for(const t of trees){const n=trees.filter(q=>Math.abs(q.x-t.x)<500&&Math.abs(q.y-t.y)<300).length;if(n>bn){bn=n;best=t}}return {x:best.x,y:best.y+80,n:bn,tot:trees.length,sig:trees.reduce((a,t)=>a+t.x+t.y*3,0)}}")
            st = await pg.evaluate("()=>({ok:NAT.ok,on:natOn()})")
            rep('เปิด HD บนแมพ 1 → แผ่นภาพโหลดสำเร็จ', st['ok'] == 1 and st['on'], st)
            CNT = """async(P)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=P.x;me.y=P.y;await w(800);const cs=new Set(Object.values(NAT.c).map(s=>s.c));
              const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(cs.has(im)||im===NAT.img)n++;return od.apply(this,arguments)};
              let fr=0;const t0=performance.now();await new Promise(r=>{const f=()=>{fr++;if(fr<30)requestAnimationFrame(f);else r()};requestAnimationFrame(f)});C.drawImage=od;
              const vis=trees.filter(t=>t.x>cam.x-40&&t.x<cam.x+W+40&&t.y>cam.y-40&&t.y<cam.y+H+40&&!t.inv&&!t.pp).length;
              return {perFrame:+(n/fr).toFixed(1),vis,kinds:[...new Set(trees.filter(t=>t._nv!==undefined).map(t=>NAT.v[t._nv][0]))],cache:Object.keys(NAT.c).length,ms:+((performance.now()-t0)/fr).toFixed(1)}}"""
            d = await pg.evaluate(CNT, P)
            rep('ต้นไม้ในจอวาดจากภาพใหม่ครบทุกต้น', d['vis'] > 5 and d['perFrame'] >= d['vis'] - 2, d)
            await pg.evaluate("()=>{for(let i=0;i<12;i++){const t=trees[(i*37)%trees.length];me.x=t.x;me.y=t.y+60;cam.x=t.x-W/2;cam.y=t.y-H/2;try{draw()}catch(e){}}}")
            await pg.wait_for_timeout(300)
            # สุ่มดูหลายจุดให้ครบหลายแบบ
            ks = set()
            for i in range(10):
                Q = await pg.evaluate(f"()=>{{const t=trees[({i}*41+7)%trees.length];return {{x:t.x,y:t.y+60}}}}")
                ks |= set((await pg.evaluate(CNT, Q))['kinds'])
            rep('มีหลายแบบ (ต้นไม้ ≥4 แบบ + ของประดับ ≥4 แบบ)', len([k for k in ks if k.startswith('tree')]) >= 4 and len([k for k in ks if not k.startswith('tree')]) >= 4, sorted(ks))
            P2 = await pg.evaluate("()=>({tot:trees.length,sig:trees.reduce((a,t)=>a+t.x+t.y*3,0)})")
            rep('จำนวน/ตำแหน่งต้นไม้เดิม (ชนเหมือนเดิม)', P2['tot'] == P['tot'] and abs(P2['sig'] - P['sig']) < 1e-3, [P2, P['tot']])
            await pg.evaluate("(P)=>{me.x=P.x;me.y=P.y}", P); await pg.wait_for_timeout(900)
            await pg.screenshot(path='np/v580_after.jpg', type='jpeg', quality=80)
            await pg.evaluate("()=>{NAT.off=1}"); await pg.wait_for_timeout(700)
            await pg.screenshot(path='np/v580_before.jpg', type='jpeg', quality=80)
            await pg.evaluate("()=>{NAT.off=0}")
            # ใกล้ค่าย
            await pg.evaluate("()=>{me.x=CX-260;me.y=CY-330}"); await pg.wait_for_timeout(900)
            await pg.screenshot(path='np/v580_camp_edge.jpg', type='jpeg', quality=80)
            o = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));HDI.on=false;await w(100);const a=natOn();HDI.on=true;LOWQ=true;const lq=natOn();LOWQ=false;enterMap(2,{x:CX,y:CY});await w(2500);const m2=natOn();return {hdOff:a,map2:m2}}""")
            rep('ปิด HD / แมพอื่น → ไม่ใช้ภาพใหม่', not o['hdOff'] and not o['map2'], o)
            rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
