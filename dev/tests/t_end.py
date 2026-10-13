import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    E6=int(sys.argv[1])
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.p6z)")
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:{E6},p6h:2}};ov.hidden=true;enterMap(33,{{x:1600,y:1300}})}}");await A.wait(2500)
        r=await A.ev("()=>{const N=MAPS[33].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}")
        for i in range(200):
            st=await A.ev("""()=>{try{if(SD.on&&SD.choice&&typeof SD.onChoose==='function'&&!window._ch){window._ch=1;SD.onChoose(%d);return 'chose'}if(SD.on){if(SD.typ)stNext();stNext()}else stTick();return [SD.on,me.sty.s,me.sty.a,me.sty.e6]}catch(e){return 'ERR '+e.stack}}"""%E6)
            if isinstance(st,str):print(i,st[:600])
            await A.wait(120)
        print('end',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.e6,stTxt()]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>me.ach.stP6"))
        await A.ev("()=>{me.x=1600;me.y=1250}");await A.wait(1500);await A.pg.screenshot(path='../p6/h_end%d.png'%E6)
        await A.ev("()=>{enterMap(32,{x:1600,y:1450})}");await A.wait(2500);await A.pg.screenshot(path='../p6/h_ar_end%d.png'%E6)
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
