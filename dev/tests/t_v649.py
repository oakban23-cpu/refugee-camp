import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
SHOT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/csv/'
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            ctx=await b.new_context(viewport={'width':412,'height':860},device_scale_factor=2,is_mobile=True,has_touch=True)
            pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>document.getElementById('ttl').click()");await pg.wait_for_timeout(2500)
            r=await pg.evaluate("async()=>{const a=CSA.dr,h=CSA.hr;await new Promise(r=>setTimeout(r,500));return[CSA.ok,CSA.err,csMode,CSA.dr-a,CSA.hr-h,CFV.pos.length]}")
            rep('โหมดสร้างตัวละคร: ฉากภาพวาด + ฮีโร่ภาพวาดครบ 5 ตัวทุกเฟรม',r[0]==1 and r[1]=='' and r[2]=='new' and r[3]>3 and r[4]>=r[3]*5-5 and r[5]==5,r)
            r=await pg.evaluate("()=>{const ims=[...document.querySelectorAll('.csw [data-cp] img')];return[ims.length,ims.filter(i=>i.getAttribute('src')===CSA.cp[i.closest('[data-cp]').dataset.cp]&&i.naturalWidth>100).length]}")
            rep('การ์ดอาชีพด้านล่างเป็นภาพฮีโร่ครบทุกใบ',r[0]==5 and r[1]==5,r)
            # แตะฮีโร่บนเวที → เลือกอาชีพนั้น
            r=await pg.evaluate("""async()=>{const cv=document.getElementById('csv'),rc=cv.getBoundingClientRect(),P=CFV.pos.find(q=>q.E.cls==='sup');if(!P)return['nopos'];
              cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:rc.left+P.x,clientY:rc.top+P.y,bubbles:true}));await new Promise(r=>setTimeout(r,500));return[csPick,CFV.sel]}""")
            rep('แตะตัวฮีโร่บนเวที (กลางลำตัว) → เลือกอาชีพนั้น',r==['sup','n:sup'],r)
            await pg.screenshot(path=SHOT+'t_port.jpg',type='jpeg',quality=80)
            # สร้างตัวละคร → ฮีโร่เดินเข้าหากล้อง (ภาพวาด)
            await pg.fill('#csni','ทดสอบฮีโร่') if await pg.query_selector('#csni') else None
            r=await pg.evaluate("""async()=>{const b=[...document.querySelectorAll('.csw button')].find(e=>/สร้างตัวละคร/.test(e.textContent)&&!e.closest('[data-cp]'));if(!b)return['nobtn'];const f0=csaHeroAt;let n=0;csaHeroAt=function(){n++;return f0.apply(this,arguments)};b.click();await new Promise(r=>setTimeout(r,900));csaHeroAt=f0;return[n>0]}""")
            rep('กดสร้างตัวละคร → ฮีโร่ภาพวาดเดินเข้าหากล้อง',r==[True],r)
            await pg.wait_for_timeout(3000)
            # กลับมาหน้าเลือกเซฟ: ฉากภาพวาด + ตัวละครร่างจริง (ไม่ใช่ภาพวาดอาชีพ)
            pg2=await ctx.new_page();pg2.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg2.goto(URL);await pg2.wait_for_timeout(3500);await pg2.evaluate("()=>document.getElementById('ttl').click()");await pg2.wait_for_timeout(2500)
            r=await pg2.evaluate("async()=>{const a=CSA.dr,h=CSA.hr;await new Promise(r=>setTimeout(r,500));return[csMode,Object.keys(saves.chars||{}).length,CSA.dr-a,CSA.hr-h]}")
            rep('โหมดอื่นนอกจากสร้างตัวละคร (เลือกเซฟ/รอโหลด): ใช้ฉากภาพวาด แต่ไม่ใช้ฮีโร่ภาพวาดแทนตัวละครจริง',r[0]!='new' and r[2]>3 and r[3]==0,r)
            await pg2.screenshot(path=SHOT+'t_saves.jpg',type='jpeg',quality=80)
            pg3=await (await b.new_context(viewport={'width':915,'height':412})).new_page()
            await pg3.route('**/hd-csh-mage.webp',lambda rt:rt.abort());await pg3.goto(URL);await pg3.wait_for_timeout(3500)
            await pg3.evaluate("()=>document.getElementById('ttl').click()");await pg3.wait_for_timeout(2000)
            r=await pg3.evaluate("async()=>{const a=CSA.dr;await new Promise(r=>setTimeout(r,400));return[CSA.ok,CSA.dr-a,csMode]}")
            rep('โหลดภาพไม่ครบ → ใช้หน้าเลือกอาชีพแบบเดิม',r[0]==0 and r[1]==0,r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
