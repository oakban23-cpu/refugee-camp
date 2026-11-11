"""v625 ไอคอนตกปลา/อาหาร/คัน/ยา/หินตีบวก: 64 คีย์ · หน้าตกปลาทุกแท็บ · ผลที่ตกได้ · งานฝีมือ · ของใช้หินตีบวก · วาดบนฉาก · ปิดได้"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):
    R.append(ok);print(('PASS ' if ok else 'FAIL ')+n,d,flush=True)
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(3800)
            a=await pg.evaluate("()=>[FSIC.ok,FSIC.err,Object.keys(FISH).every(id=>!!fsicURL('f|'+id)),Object.keys(FOOD).every(k=>!!fsicURL('d|'+k)),[0,1,2,3,4].every(i=>!!fsicURL('r|r'+i)),['xdm','xhp','xsp','xxp','xlk'].every(k=>!!fsicURL('x|'+k)),['s1','s2','s3'].every(k=>!!fsicURL('s|'+k)),new Set(FSIC.keys.map(k=>fsicURL(k))).size]")
            rep('โหลดครบ: ปลา 40 · อาหาร 11 · คัน 5 · ยา 5 · หิน 3 (64 ภาพไม่ซ้ำ)',a==[64,'',True,True,True,True,True,64],a)
            await pg.evaluate(SETUP, ['archer','Fs'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1200)
            await pg.evaluate("()=>{AUTO.on=false;gmGod=true;const S=fsSt();Object.keys(FISH).slice(0,12).forEach(id=>{S.c[id]=3;S.n[id]=2;S.b[id]=300});S.f=S.f||{};S.f.grill=2;S.f.feast=1;S.r=1;me.inv=me.inv||{};me.inv.s1=3;me.inv.s2=2;me.inv.s3=1}")
            out={}
            for tab in ('bag','food','book','rod'):
                await pg.evaluate(f"()=>{{ov.hidden=false;fishUI('{tab}')}}"); await pg.wait_for_timeout(500)
                out[tab]=await pg.evaluate("()=>{const I=[...ov.querySelectorAll('img.fsim')];return [I.length,I.filter(i=>i.complete&&i.naturalWidth>0).length]}")
                if tab=='book': await pg.screenshot(path='../v625_book.png')
            rep('หน้าตกปลา: ถังปลา/อาหาร/สมุดปลา/คันเบ็ด เป็นภาพวาด',out['bag'][0]>=12 and out['food'][0]>=11 and out['book'][0]>=12 and out['rod'][0]>=2 and all(v[0]==v[1] for v in out.values()),out)
            a=await pg.evaluate("()=>{FS.res={id:'w4',ic:FISH.w4.ic,n:FISH.w4.n,col:FRC[4],r:4,sz:50,txt:''};try{fishUI('bag')}catch(e){}const h=ov.innerHTML;return [h.includes('fsim')]}")
            rep('ผลที่ตกได้ใช้ภาพปลา (ช่องผลรับ id)',a==[True],a)
            a=await pg.evaluate("async()=>{ov.hidden=false;GTTAB='br';gtUI();await new Promise(r=>setTimeout(r,300));const n1=ov.querySelectorAll('.gtrc .ic img.fsim').length;GTTAB='sm';gtUI();await new Promise(r=>setTimeout(r,300));const n2=ov.querySelectorAll('.gtrc .ic img.fsim').length,t=ov.querySelectorAll('.gtrc').length;return [n1,n2,t]}")
            rep('งานฝีมือ: สูตรยา/หลอม แสดงภาพ (ยาพิเศษ 5 · ยาเลือด/มานา · หินตีบวก 3 · หินกันแตก · ผงรูน)',a[0]>=5 and a[1]>=5 and a[1]==a[2],a)
            a=await pg.evaluate("()=>{const u=itMatURL('s2');return [!!u&&u===fsicURL('s|s2'),!!MATI.s1]}")
            rep('หินตีบวกในช่องของใช้ (itMatURL s1–s3) ใช้ภาพวาด',a==[True,True],a)
            a=await pg.evaluate("()=>{let n=0;const o=g.drawImage;g.drawImage=function(){n++;return o.apply(this,arguments)};try{fsicDraw('lava4',100,100,30);fsicDraw('nope',0,0,10)}finally{g.drawImage=o}return [n,!!FSIC.w['f|lava4'],FSIC.w['f|nope']]}")
            rep('วาดปลาบนฉาก (กระโดด/ตู้โชว์): ภาพขอบนุ่ม · คีย์ไม่รู้จัก → ไม่วาด (ใช้อีโมจิเดิม)',a==[1,True,None],a)
            a=await pg.evaluate("()=>{FSIC.off=1;const h=fsicH('f|w0','X');FSIC.off=0;return h}")
            rep('ปิด FSIC.off=1 → อีโมจิเดิม',a=='X',a)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
