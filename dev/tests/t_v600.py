"""v600 ภาพ ChatGPT ล็อต 1 (แมพ 36/27/30/32): ไฟล์ · ทุกชิ้นใช้ภาพใหม่บนแมพของมัน · ชิ้นปริศนา/เนื้อเรื่องยังเป็นแบบเดิม · ไม่ซ้อนกันเพิ่ม · ภาพก่อน/หลัง · ไม่มี error"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
CNT = """async(ks)=>{const out={};for(const k of ks){const L=trees.filter(t=>t.k===k&&!t.inv);if(!L.length){out[k]=-1;continue}const t=L[0];me.x=t.x+30;me.y=t.y+150;ov.hidden=true;banner=null;await new Promise(r=>setTimeout(r,500));
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im&&Object.values(GPA.c).some(s=>s.c===im))n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<6)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;out[k]=+(n/fr).toFixed(1)}return out}"""
OVL = """(mp)=>{const B=[];for(const t of trees){if(!t.k||t.inv)continue;const q=GPA.k[t.k];if(!q||q[0]!==mp)continue;const f=GPA.sets[q[4]].f[t.k];B.push({t,x:t.x,y:t.y+q[2],w:q[1],h:q[1]*f[3]/f[2]})}const O=[];
  for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const h=ovfHit(B[i],B[j]);if(h)O.push([B[i].t.k,B[i].x|0,B[i].y|0,B[j].t.k,B[j].x|0,B[j].y|0,+h.toFixed(2)])}return O}"""
SPOT = {36: ['obdome', 'obpine', 'obinst'], 27: ['orr', 'cand', 'mirf'], 30: ['barch', 'bfire', 'bpyl'], 32: ['ahouse', 'alamp', 'abook']}
SKIP = ['obmir', 'obloom', 'mirb', 'bshd', 'agbell', 'aclock', 'abell']
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-gpt1.webp') as r:
            rep('hd-gpt1.webp เสิร์ฟได้', r.status == 200)
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Gp' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            allk = await pg.evaluate("()=>GPA.k")
            sk = await pg.evaluate("(S)=>S.filter(k=>GPA.k[k])", SKIP); rep('ชิ้นปริศนา/เนื้อเรื่องไม่ถูกแทน', sk == [], sk)
            for mp in [36, 27, 30, 32]:
                await pg.evaluate(f"()=>{{window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;GPA.off=0;enterMap({mp},{{x:MAPS[{mp}].sx||1600,y:MAPS[{mp}].sy||1600}})}}"); await pg.wait_for_timeout(4000)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
                ks = [k for k, v in allk.items() if v[0] == mp]
                c = await pg.evaluate(CNT, ks); bad = {k: v for k, v in c.items() if v != -1 and v < 1}
                rep(f'แมพ {mp}: {len(ks)} ชิ้นใช้ภาพใหม่', not bad, bad or c)
                o = await pg.evaluate(OVL, mp); print('INFO แมพ', mp, 'ภาพชิดกัน (ตำแหน่งเดิม):', len(o), o[:3], flush=True)
                for mode in ['after', 'before']:
                    await pg.evaluate("(v)=>{GPA.off=v}", 1 if mode == 'before' else 0)
                    for i, k in enumerate(SPOT[mp]):
                        await pg.evaluate("(k)=>{const L=trees.filter(t=>t.k===k);const t=L[0];if(t){me.x=t.x+20;me.y=t.y+(k==='obdome'||k==='orr'||k==='barch'?260:130)}ov.hidden=true;banner=null;try{mons.length=0}catch(e){}}", k); await pg.wait_for_timeout(900)
                        await pg.screenshot(path=f'np/v600_{mp}_{i}_{mode}.jpg', type='jpeg', quality=82)
                await pg.evaluate("()=>{GPA.off=0}")
            o = await pg.evaluate("()=>{HDI.on=false;const a=gpaOn('obpine');HDI.on=true;return a}"); rep('ปิด HD → เดิม', o is False, o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
