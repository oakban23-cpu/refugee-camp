"""v597 ภาพซ้อนทับไม่เป็นธรรมชาติ: แมพ 31/44/45 ไม่เหลือคู่ที่ซ้อน + มีการจัดจริง"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
JS = r"""(mp)=>{const B=[];for(const t of trees){if(!t.k||t.inv)continue;const b=ovfBox(t,mp);if(b)B.push(b)}const O=[];
 for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const h=ovfHit(B[i],B[j]);if(h)O.push([B[i].t.k,B[i].x|0,B[i].y|0,B[j].t.k,B[j].x|0,B[j].y|0,+h.toFixed(2)])}return O}"""
R = []
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Ov' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            for mp, pos in [(31, "{x:MKC.x,y:MKC.y+300}"), (44, "{x:1600,y:1700}"), (45, "{x:1600,y:1600}")]:
                await pg.evaluate(f"()=>{{window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap({mp},{pos})}}"); await pg.wait_for_timeout(4000)
                r = await pg.evaluate(JS, mp)
                n = await pg.evaluate("()=>OVF.log.length"); ok = (len(r) == 0 and n > 0); R.append(ok); print(('PASS ' if ok else 'FAIL ') + f'แมพ {mp}: ไม่มีภาพซ้อน (จัดไป {n} ชิ้น)', r[:3], flush=True)
    finally:
        p.terminate()
asyncio.run(main())
print('SUMMARY', sum(R), '/', len(R))
