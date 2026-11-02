"""v574 จุติแล้วเดินเนื้อเรื่องต่อได้
   ① ยังไม่จุติ Lv 1 ที่เควสต้อง Lv 95: ยังล็อกเหมือนเดิม (เควส · ประตู · ทางไปแมพ)
   ② จุติแล้ว Lv 1: เควสไม่ขึ้น «ต้อง Lv» · ประตู Lv ≤ 99 ผ่าน · ไปแมพ 21 ได้ · เงื่อนไขเกิน 99 (ดัน 130) ยังล็อก
   ③ ออโต้เควส (จุติ Lv 1): พาไปเก็บเลเวลในแมพที่เหมาะ + ปุ่ม «ไปทำเควสเลย» → กดแล้วพาไปแมพเควสจริง · แผนที่โลกยังชี้แมพเควสจริง
   ④ เข้าแมพมอนแรง → เตือน · ⑤ จุติแล้วเดินผ่านประตู Lv 95 ได้จริง · ⑥ ไม่มี error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:1200], flush=True)
ST = """(rb)=>{const i=STY.findIndex(s=>s.lv===95&&s.k);me.rb=rb;me.lv=1;me.xp=0;stInit();me.sty.s=i;me.sty.a=0;me.sty.n=0;try{recalc()}catch(e){}
  let gate=null,gm=null;for(const k in MAPS){const M=MAPS[k];if(+k<10000&&M.gates)for(const G of M.gates)if(!G.wb&&G.req>=90&&G.req<=99&&!gate){const l0=me.lv;me.lv=99;const ok=wpGateOk(G);me.lv=l0;if(ok){gate=G;gm=+k}}}
  const t=stTxt();return {i,lv:STY[i].lv,txt:String(t).slice(0,80),need:/ต้อง Lv/.test(t),gate:gate&&gate.req,gateOk:wpGateOk(gate),acc21:wpAccess(21),l130:lvOk(130),l99:lvOk(99),gm,gto:gate&&gate.to}}"""
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 393, 'height': 864}, device_scale_factor=2, has_touch=True, is_mobile=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP, ['mage', 'Rb' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(2000)
        await pg.evaluate("()=>{ov.hidden=true;gmGod=true;enterMap(1,{x:CX,y:CY+80})}"); await pg.wait_for_timeout(1500)
        a = await pg.evaluate(ST, 0)
        rep('ยังไม่จุติ Lv 1: เควส Lv 95 / ประตู / ทางไปแมพ 21 ยังล็อก', a['need'] and not a['gateOk'] and a['acc21'] != '' and not a['l99'], a)
        c = await pg.evaluate(ST, 1)
        rep('จุติแล้ว Lv 1: เควสไม่ล็อก · ประตู Lv ≤ 99 ผ่าน · ไปแมพ 21 ได้ · เงื่อนไข Lv 130 ยังล็อก', not c['need'] and c['gateOk'] and c['acc21'] == '' and not c['l130'], c)
        d = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const ki=STY.findIndex(s=>s.g==='kill'&&s.m&&WMLV[s.m]&&WMLV[s.m][0]>=60);me.sty.s=ki;me.sty.a=1;me.sty.n=0;aqStart('st');await w(1600);const t=aqTarget(),b=document.getElementById('rbqb'),vis=!!b&&!b.hidden,bt=b&&b.textContent;
          const fit=t&&t.mp,fl=WMLV[fit];const wq=wmQuestMap();b&&b.click();await w(200);const t2=aqTarget();const b2=document.getElementById('rbqb');
          const r={ki,km:STY[ki].m,t:t&&{mp:t.mp,lb:t.lb,rbLv:t.rbLv},fitLv:fl,vis,bt,wq,t2:t2&&{mp:t2.mp,act:t2.act,lb:t2.lb},risk:RBQ.risk,bt2:b2&&b2.textContent};b2&&b2.click();await w(100);r.risk2=RBQ.risk;aqStop&&aqStop('');return r}""")
        rep('ออโต้เควสจุติ Lv 1: พาไปเก็บเลเวลในแมพที่เหมาะ · มีปุ่ม «ไปทำเควสเลย» → กดแล้วพาไปแมพเควส · กดอีกครั้งกลับ · แผนที่โลกชี้แมพเควสจริง',
            d['t'] and d['t'].get('rbLv') and d['fitLv'] and d['fitLv'][0] <= 4 and d['vis'] and 'ไปทำเควสเลย' in (d['bt'] or '') and d['t2'] and not d['t2'].get('lb', '').startswith('เก็บเลเวลก่อน') and d['t2'].get('mp') != d['t']['mp'] and d['risk'] == 1 and d['risk2'] == 0 and d['wq'] and d['wq'] != d['t']['mp'], d)
        e = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));RBQ.warned={};banner=null;enterMap(21,{x:MAPS[21].sx||1600,y:MAPS[21].sy||1600});await w(300);return {cur:curMap,b:banner&&banner.s}}""")
        rep('จุติ Lv 1 เข้าแมพ 21 → เตือนมอนแรง', e['cur'] == 21 and e['b'] and 'แรงกว่าคุณ' in e['b'], e)
        f = await pg.evaluate("""async(gm)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));let G=null,from=null;for(const k in MAPS){const M=MAPS[k];if(+k<10000&&M.gates)for(const g of M.gates)if(!g.wb&&g.req>=90&&g.req<=99&&!g.st&&!G&&wpGateOk(g)){G=g;from=+k}}
          if(!G)return {none:1};enterMap(from,{x:G.x,y:G.y+120});await w(2600);me.x=G.x;me.y=G.y;await w(1500);try{const b=$('gtb');if(b&&!b.hidden)b.click()}catch(e){}await w(2500);return {from,to:G.to,req:G.req,cur:curMap}}""", c['gm'])
        rep('จุติ Lv 1 เดินผ่านประตู Lv 90+ ได้จริง', f.get('cur') == f.get('to'), f)
        rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
