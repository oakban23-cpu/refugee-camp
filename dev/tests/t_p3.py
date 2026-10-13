import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'melee'); B = await new_client(b, 'Bravo', 'mage')
        errs=[]
        for c in (A,B):
            c.pg.on("pageerror",lambda e:errs.append(str(e)[:200]))
            await c.ev("()=>{gmSetLv(99);gmGod=true;const i=STY.findIndex(x=>x.g==='boss'&&x.m===22);me.sty.s=i;me.sty.a=1;me.sty.n=0;ov.hidden=true;enterMap(22,{x:1600,y:2150})}")
        await A.wait(4000)
        print('mvr', await A.ev("()=>JSON.stringify((MVT||{})[22]||null)"))
        print('host', await A.ev("()=>isHost()"), await B.ev("()=>isHost()"))
        H = A if await A.ev("()=>isHost()") else B
        await H.ev("()=>{try{mvSpawn()}catch(e){console.log(e)}}"); await A.wait(3000)
        for c in (A,B): print('boss', await c.ev("()=>mons.filter(m=>m.t===3).map(m=>[m.mvp,Math.round(m.mh)])"))
        await H.ev("()=>{const b=mons.find(m=>m.t===3);if(b){b.hp=1;}}")
        for c in (A,B): await c.ev("()=>{const b=mons.find(m=>m.t===3);if(b){addHit(b,1e6,0,0,me.cls)}}")
        await A.wait(6000)
        for c in (A,B):
            for i in range(30): await c.ev("()=>{if(SD.on){try{stClose()}catch(e){}}}")
            await c.wait(500)
            print('after', await c.ev("()=>[me.sty.s,STY[me.sty.s]&&STY[me.sty.s].tx,mons.filter(m=>m.t===3).length]"))
        print('mvr2', await A.ev("()=>JSON.stringify((MVT||{})[22]||null)"))
        print(errs[:5])
        await b.close()
    p.kill()
asyncio.run(main())
