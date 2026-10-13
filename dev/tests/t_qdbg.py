import asyncio,random
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;me.sty={{s:{i1},n:0,a:0,e:1,e6:1}};qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1200)
        await A.ev("()=>{QS.nt=0}");await A.wait(800)
        print(await A.ev("()=>{try{g.save();qshDraw();g.restore();return 'ok '+JSON.stringify(QSV.o)}catch(e){g.restore();return 'ERR '+e.message+' '+(e.stack||'').slice(0,300)}}"))
        print(await A.ev("()=>{try{g.save();qsFieldScreen();g.restore();return 'ok'}catch(e){g.restore();return 'ERR '+e.message}}"))
        await b.close()
    p.terminate()
asyncio.run(main())
