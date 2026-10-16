"""v420 กราฟิกอัตโนมัติแบบขั้นบันได"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
FEED="""([ms,n])=>{let t=(window.__ft||performance.now());for(let i=0;i<n;i++){t+=ms;fpsTick(t,1)}window.__ft=t;return {LITEQ,LOWQ,DPR,avg:FQ.avg&&+FQ.avg.toFixed(1),cap:MLB.cap}}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=3,has_touch=True,is_mobile=True);pg=await ctx.new_page();A=Client(ctx,pg,'A')
        pg.on('pageerror', lambda e: A.errs.append((e.stack or str(e))[:300]))
        await pg.goto(URL);await pg.wait_for_timeout(2000);await pg.evaluate(SETUP,['melee','A',60]);await pg.wait_for_timeout(1500)
        B=await new_client(b,'B','mage',60)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;setGQ('auto');FQ.n=0;FQ.acc=0;FQ.last=0;window.__fake=1;const _f=fpsTick;fpsTick=function(n,fk){if(window.__fake&&!fk)return;return _f.apply(this,arguments)}}");await B.ev("(u)=>{ov.hidden=true;AUTO.on=false;const o=others[u];if(o){me.x=o.x+30;me.y=o.y}}",await A.ev("()=>uid"))
        await A.wait(1500)
        d0=await A.ev("()=>DPR")
        r1=await A.ev(FEED,[30,181])
        rep('ช้า 30ms 2 ช่วง → ขั้น 1 (ลดเฉพาะคนอื่น) ยังไม่ไปโหมดประหยัด',r1['LITEQ']==1 and not r1['LOWQ'] and r1['DPR']<d0 and r1['cap']==2,json.dumps(r1)+' dpr0 '+str(d0))
        cnt=await A.ev("()=>{let mine=0,oth=0;const _g=gxLit;gxLit=function(){if(!LOWQ){if(LQME)mine++;else oth++}return _g.apply(this,arguments)};for(let i=0;i<3;i++)draw();gxLit=_g;return [mine,oth,Object.keys(others).length]}")
        rep('ขั้น 1: ตัวเรายังลงแสงเต็ม ผู้เล่นคนอื่นวาดแบบประหยัด',cnt[0]>=3 and cnt[2]>=1,json.dumps(cnt))
        r2=await A.ev(FEED,[30,181])
        rep('ยังช้าต่ออีก 2 ช่วง → โหมดประหยัด',r2['LOWQ'],json.dumps(r2))
        await A.ev("()=>{setGQ('auto');window.__ft=0}")
        r3=await A.ev(FEED,[21.5,90*6+1])
        rep('ช้าปานกลาง (21.5ms) ค้างอยู่ขั้น 1 ไม่ตกไปโหมดประหยัด',r3['LITEQ']==1 and not r3['LOWQ'],json.dumps(r3))
        r4=await A.ev("([ms,n])=>{PF.dr=Array(120).fill(3);let t=window.__ft;for(let i=0;i<n;i++){t+=ms;PF.draw=3;fpsTick(t,1)}window.__ft=t;return {LITEQ,LOWQ,DPR,rec:LQ.rec}}",[16.6,90*5+1])
        rep('เครื่องว่าง (วาด 3ms) ~8 วิ → กลับเต็มเอง',r4['LITEQ']==0 and r4['rec']==1 and r4['DPR']==d0,json.dumps(r4))
        await A.ev("()=>{setGQ('high');window.__ft=0}")
        r5=await A.ev(FEED,[30,400])
        rep('ตั้ง «สูง» เอง → ไม่ลดอัตโนมัติ',r5['LITEQ']==0 and not r5['LOWQ'],json.dumps(r5))
        await A.ev("()=>{setGQ('auto')}")
        Es=[e for e in A.errs+B.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
