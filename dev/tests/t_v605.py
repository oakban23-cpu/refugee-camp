"""v605 ภาพซ้อน 6 แมพ GPA: ไม่เหลือคู่ซ้อนไม่ธรรมชาติ · มีการจัดจริง · ตะเกียงไม่ถูกลบ · ภาพก่อน/หลัง · ไม่มี error"""
import asyncio, sys, random, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
OVL = r"""(mp)=>{const B=[];for(const t of trees){if(!t.k||t.inv)continue;const b=ovfBox(t,mp);if(b)B.push(b)}const O=[];for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){if(!GPA.k[B[i].t.k]&&!GPA.k[B[j].t.k])continue;const h=ovfHit(B[i],B[j]);if(h)O.push([B[i].t.k,B[i].x|0,B[i].y|0,B[j].t.k,B[j].x|0,B[j].y|0,+h.toFixed(2)])}return O}"""
SHOT = {43: 'paoak', 36: 'obpine', 32: 'alamp', 39: 'sglamp'}
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Ow' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            for mp in [36, 30, 32, 34, 43, 39]:
                await pg.evaluate(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;HDI.on=true;LOWQ=false;OVF.off=0;enterMap({mp},{{x:MAPS[{mp}].sx||1600,y:MAPS[{mp}].sy||1600}})}}"); await pg.wait_for_timeout(3200)
                o = await pg.evaluate(OVL, mp); lg = await pg.evaluate("()=>OVF.log")
                lamps = await pg.evaluate("()=>trees.filter(t=>/lamp/.test(t.k||'')).length")
                rm = [x for x in lg if x[0].startswith('ลบ')]
                rep(f'แมพ {mp}: ไม่เหลือภาพซ้อน (จัด {len(lg)} · ลบ {len(rm)})', len(o) == 0, [o[:3], rm[:4]])
                rep(f'แมพ {mp}: ไม่ลบตะเกียง', not any('lamp' in str(x[1]) for x in rm), lamps)
                if mp in SHOT:
                    await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
                    # จุดที่ย้ายเยอะสุด
                    pos = await pg.evaluate("(k)=>{const L=OVF.log.filter(x=>x[0]==='ย้าย');const m=L[0];if(m)return [m[2],m[3]];const t=trees.find(t=>t.k===k);return [t.x,t.y]}", SHOT[mp])
                    for mode in ['after', 'before']:
                        if mode == 'before':
                            await pg.evaluate(f"()=>{{OVF.off=1;enterMap({mp},{{x:MAPS[{mp}].sx||1600,y:MAPS[{mp}].sy||1600}})}}"); await pg.wait_for_timeout(3200)
                            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
                        await pg.evaluate("(P)=>{me.x=P[0]+20;me.y=P[1]+120;ov.hidden=true;banner=null;try{mons.length=0}catch(e){}}", pos); await pg.wait_for_timeout(1000)
                        await pg.screenshot(path=f'np/v605_{mp}_{mode}.jpg', type='jpeg', quality=80)
                    await pg.evaluate("()=>{OVF.off=0}")
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
