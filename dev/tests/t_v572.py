"""v572 ภาพเก็บมอนร่วม (เฉพาะตอนเครื่องตามไม่ทัน)
   ① เครื่องไม่ช้า: ไม่ทำงาน (ไม่สร้างภาพร่วม)
   ② จำลองเครื่องช้า (FQ.avg=40) ตอนสู้ 3 แมพ: คำสั่งวาดทุกแคนวาสต่อเฟรมลดลงชัดเทียบกับปิด (ปิด = วาดเวกเตอร์สดทุกตัว) · ใช้ภาพซ้ำ (hit+ข้างเคียง) ≥ 80% · ภาพไม่ว่าง · หน่วยความจำไม่เกินเพดาน
   ③ หน่วง: เปิดเมื่อ > 30 ms · ยังเปิดที่ 25 · ปิดเมื่อ < 22 · ④ ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:1200], flush=True)
BOTJS = open(__file__.rsplit('/', 1)[0] + '/b10bot.js', encoding='utf-8').read()
MEAS = """async(sb)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));SBK.on=sb;SBK.c.clear();SBK.used=0;for(const k in SBK.stat)SBK.stat[k]=0;
  let run2=1;const hold=()=>{if(!run2)return;FQ.avg=40;requestAnimationFrame(hold)};requestAnimationFrame(hold);await w(4000);
  const C=CanvasRenderingContext2D.prototype,ks=['fill','stroke','drawImage','fillRect','fillText','strokeRect'],O={};let n=0,nm=0;const MAIN=cv.getContext('2d');
  ks.forEach(k=>{O[k]=C[k];C[k]=function(){n++;if(this===MAIN)nm++;return O[k].apply(this,arguments)}});for(const k in SBK.stat)SBK.stat[k]=0;
  let fr=0;const t0=performance.now();await new Promise(r=>{const f=()=>{fr++;if(performance.now()-t0<2500)requestAnimationFrame(f);else r()};requestAnimationFrame(f)});
  ks.forEach(k=>C[k]=O[k]);run2=0;const st={...SBK.stat},tot=st.hit+st.near+st.make+st.miss;let ne=0;for(const e of SBK.c.values()){const d=e.c.getContext('2d').getImageData(0,0,e.c.width,e.c.height).data;for(let i=3;i<d.length;i+=16)if(d[i]>20){ne++;break}}
  return {sb,map:curMap,mons:mons.filter(m=>m.t<3&&Math.abs(m.x-me.x)<W&&Math.abs(m.y-me.y)<H).length,drawsAll:Math.round(n/fr),drawsMain:Math.round(nm/fr),st,reuse:tot?+((st.hit+st.near)/tot).toFixed(2):null,entries:SBK.c.size,nonEmpty:ne,usedPx:SBK.used,cap:SBK.px}}"""
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 393, 'height': 864}, device_scale_factor=2, has_touch=True, is_mobile=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP, ['mage', 'Sb' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
        await pg.evaluate(BOTJS)
        await pg.evaluate("()=>{gmGod=true;AUTO.on=false;ov.hidden=true;enterMap(2,{x:MAPS[2].sx||1600,y:MAPS[2].sy||1600})}"); await pg.wait_for_timeout(4000)
        n0 = await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));FQ.avg=16;SBK.act=0;let run2=1;const hold=()=>{if(!run2)return;FQ.avg=16;requestAnimationFrame(hold)};requestAnimationFrame(hold);await w(400);SBK.act=0;for(const k in SBK.stat)SBK.stat[k]=0;await w(1500);const a=sbkActive();run2=0;return {act:a,st:{...SBK.stat}}}")
        rep('เครื่องไม่ช้า: ภาพเก็บร่วมไม่ทำงาน', not n0['act'] and n0['st']['make'] == 0 and n0['st']['hit'] == 0, n0)
        res = []
        for mp in (17, 21, 2):
            await pg.evaluate(f"()=>{{const m={mp};enterMap(m,{{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600}})}}"); await pg.wait_for_timeout(4000)
            await pg.evaluate("()=>{ov.hidden=true;const B=mons.filter(m=>m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];if(B){me.x=B.x+60;me.y=B.y}BOT.reset();BOT.on=true}"); await pg.wait_for_timeout(2500)
            off = await pg.evaluate(MEAS, 0); on = await pg.evaluate(MEAS, 1)
            res.append([mp, off, on])
        ok = all((on['mons'] < 20 or on['drawsAll'] < off['drawsAll'] * .85) and on['reuse'] is not None and on['reuse'] >= .8 and on['nonEmpty'] == on['entries'] and on['usedPx'] <= on['cap'] for _, off, on in res)
        rep('เครื่องช้า ตอนสู้ 3 แมพ: แมพที่มอนบนจอ ≥ 20 ตัว คำสั่งวาดรวมลดลง ≥ 15% · ใช้ภาพซ้ำ ≥ 80% · ภาพไม่ว่าง · ไม่เกินเพดานหน่วยความจำ',
            ok, [[mp, {'off': off['drawsAll'], 'on': on['drawsAll'], 'mainOff': off['drawsMain'], 'mainOn': on['drawsMain'], 'mons': on['mons'], 'reuse': on['reuse'], 'st': on['st'], 'ent': on['entries'], 'MB': round(on['usedPx'] * 4 / 1e6, 1)}] for mp, off, on in res])
        h = await pg.evaluate("()=>{SBK.act=0;const o=[];for(const v of[40,25,18,25])o.push((FQ.avg=v,sbkActive()));return o}")
        rep('หน่วง: 40 → เปิด · 25 → ยังเปิด · 18 → ปิด · 25 → ยังปิด', h == [True, True, False, False], h)
        await pg.screenshot(path='np/v572_fight.jpg', type='jpeg', quality=70)
        rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
