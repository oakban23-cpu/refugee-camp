import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw)},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10,mons.length])},2500)})"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        await A.ev("()=>{gmGod=true;escEnter()}");await A.wait(3000)
        print('in',await A.ev("()=>[curMap,trees.length,trees.filter(t=>t.k).length,escIn(me.x,me.y)]"))
        await A.pg.screenshot(path='../p6/x_lobby.png')
        await A.ev("()=>{dgStart()}")
        for i in range(14):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.ev("()=>{me.x=CX+60;me.y=ESC.y+30}");await A.wait(2500);await A.pg.screenshot(path='../p6/x_run.png')
        for k in range(40):
            st=await A.ev("()=>{me.x=CX+60;me.y=ESC.y+30;return [ESC.cp,ESC.wv]}")
            if st[0]>=1 and st[1]:break
            await A.wait(500)
        await A.ev("()=>{me.x=CX+150;me.y=CY+200}");await A.wait(1200);await A.pg.screenshot(path='../p6/x_wave.png')
        print('wave perf',await A.ev(M))
        for k in range(60):
            st=await A.ev("()=>{mons.forEach(m=>{if(m.t!==3)m.hp=0});me.x=CX+60;me.y=ESC.y+30;return dg.ph}")
            if st=='boss':break
            await A.wait(700)
        await A.ev("()=>{me.x=CX+90;me.y=ESC.y+60}");await A.wait(4000);await A.ev("()=>{const m=mons.find(q=>q.t===3);if(m)m.e2=0}");await A.wait(1300);await A.pg.screenshot(path='../p6/x_boss.png')
        print('boss perf',await A.ev(M))
        await A.pg.set_viewport_size({'width':1100,'height':800});await A.ev("()=>{me.x=CX;me.y=CY}");await A.wait(1500);await A.pg.screenshot(path='../p6/x_desk.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:6])
        await b.close()
    p.terminate()
asyncio.run(main())
