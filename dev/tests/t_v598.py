"""v598 บทพูด 'me' ใช้หน้าตัวละครเรา: วงกลมเป็นรูป · ภาพเต็มตัวขึ้น · บรรทัด NPC/บรรยายกลับเป็นแบบเดิม · เปลี่ยนอาชีพ → รูปเปลี่ยน · ไม่มี error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
ST = "()=>{const d=$('sdlg'),p=d.querySelector('.sdp'),i=p.querySelector('img'),b=document.getElementById('sdbust');return {nm:d.querySelector('.sdn').textContent,img:!!(i&&i.src.startsWith('data:')),npcp:p.classList.contains('npcp'),bust:!!(b&&b.classList.contains('on')),mep:!!(b&&b.classList.contains('mep')),txt:p.textContent}}"
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['melee', 'Me' + str(random.randint(100, 999)), 30]); await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{AUTO.on=false;ov.hidden=true;stSay([['nar','ลมพัดผ่านค่าย'],['me','ข้าจะไปเอง ไม่ต้องห่วง'],['nar','เขาออกเดินทาง']])}"); await pg.wait_for_timeout(700)
            a = await pg.evaluate(ST); rep('บรรทัดบรรยาย = แบบเดิม', not a['img'] and not a['mep'], a)
            await pg.evaluate("()=>stNext()"); await pg.evaluate("()=>stNext()"); await pg.wait_for_timeout(700)
            m = await pg.evaluate(ST); rep('บรรทัดตัวเรา = หน้าตัวละครเรา + ภาพเต็มตัว', m['img'] and m['npcp'] and m['bust'] and m['mep'], m)
            await pg.screenshot(path='np/v598_me.jpg', type='jpeg', quality=85)
            await pg.evaluate("()=>stNext()"); await pg.evaluate("()=>stNext()"); await pg.wait_for_timeout(700)
            n = await pg.evaluate(ST); rep('บรรทัดถัดไป (บรรยาย) กลับเป็นแบบเดิม', not n['img'] and not n['bust'], n)
            await pg.evaluate("()=>{stNext();stNext();stClose()}")
            k1 = await pg.evaluate("()=>{mepMake();return MEP.k}")
            await pg.evaluate("()=>{me.cls='mage';UIS.pk=''}"); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>stSay([['me','ลองชุดใหม่']])"); await pg.wait_for_timeout(700)
            k2 = await pg.evaluate("()=>MEP.k"); m2 = await pg.evaluate(ST)
            rep('เปลี่ยนอาชีพ → รูปเปลี่ยนตาม', k1 != k2 and m2['img'], [k1, k2])
            await pg.screenshot(path='np/v598_me2.jpg', type='jpeg', quality=85)
            await pg.evaluate("()=>{stNext();stNext();stClose()}")
            o = await pg.evaluate("()=>{MEP.off=1;stSay([['me','ปิดแล้ว']]);const r=$('sdlg').querySelector('.sdp img');stNext();stNext();stClose();MEP.off=0;return !r}")
            rep('ปิด MEP → ไอคอนเดิม', o, o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
