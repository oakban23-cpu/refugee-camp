import asyncio,random,sys
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;me.sty={s:STY.findIndex(x=>x.p7d),n:0,a:0,e:1,e6:1};ov.hidden=true;window.DNH=12;setInterval(()=>{FQ.avg=0;LOWQ=false},50);mdfEnter()}");await A.wait(2500)
        await A.ev("()=>{dgStart()}");await skip(A);await A.wait(800)
        await A.ev("()=>{MDF.wv=3;MDF.st='wave';MDF.q=0;me.x=CX+60;me.y=CY+160}");await A.wait(2500)
        print(await A.ev("()=>[dg.ph,MDF.st,mons.map(m=>m.t+':'+(m.mdf|0))]"))
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.4;m.inv=0;m.x=CX+150;m.y=CY-150;window._c=[];const _s=mdfSpawn;window.mdfSpawn=mdfSpawn=function(n,b){window._c.push(n);return _s(n,b)}}")
        for i in range(6):
            await A.wait(1000);print(i,await A.ev("()=>{const m=mons.find(q=>q.t===3);return [m&&m.w3,m&&m.stun,m&&m.inv,mons.length,mons.filter(q=>q.mdf).length,JSON.stringify(window._c)]}"))
        await A.ev("()=>{me.x=CX+200;me.y=CY+200}");await A.wait(500)
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.w1=0}");await A.wait(4000)
        print('hp after rain (outside)',await A.ev("()=>[me.hp,me.mh]"))
        await A.pg.screenshot(path='../p6/k_mdf_dbg.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
