import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=22;me.sty={s:STY.findIndex(x=>x.p7rs),n:0,a:1,e:1,e6:1};setInterval(()=>{FQ.avg=0;LOWQ=false},50);enterMap(35,{x:1600,y:430})}");await A.wait(3000)
        for (x,y) in [(1650,600),(1650,1700),(820,850),(520,1450),(2000,1400)]:
            await A.ev(f"()=>{{me.x={x};me.y={y};mons=[]}}");await A.wait(1500)
            r=[]
            for k in range(3):
                r.append(await A.ev("()=>{const t0=performance.now();mons=[];for(let i=0;i<30;i++){draw()}return +((performance.now()-t0)/30).toFixed(2)}"));await A.wait(400)
            r.append(await A.ev("()=>{const o={};const T=(k,f)=>{const t0=performance.now();for(let i=0;i<30;i++)f();o[k]=+((performance.now()-t0)/30).toFixed(2)};g.save();T('gfx',()=>kmGroundFx());T('scr',()=>kmScreen(0,1,H));g.restore();return JSON.stringify(o)}"))
            print((x,y),r,'mons',await A.ev("()=>mons.length"))
        await A.ev("()=>{mdfEnter()}");await A.wait(2500);await A.ev("()=>{dgStart()}")
        for i in range(14):
            await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.wait(9000)
        print('inst',await A.ev("()=>{const t0=performance.now();mons=[];for(let i=0;i<30;i++){draw()}return +((performance.now()-t0)/30).toFixed(2)}"),'ms',await A.ev("()=>mons.length"))
        await A.pg.screenshot(path='../p6/k_inst_night.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
