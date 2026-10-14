import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;window.DNH=12;setInterval(()=>{FQ.avg=0;LOWQ=false},50);me.sty={s:STY.findIndex(x=>x.p7tb),n:0,a:1,e6:2};ov.hidden=true;enterMap(33,{x:2300,y:1760})}");await A.wait(2500)
        w=await A.ev("()=>{me.x=2300;me.y=1760;mons=[];PALG.card=null;let d=HFBA[1]-hfHand()-0.25;d=((d%6.2832)+6.2832)%6.2832;return d/6.2832*HFP*1000}")
        await A.wait(int(w));await A.ev("()=>{mons=[];PALG.card=null}");await A.pg.screenshot(path='../p6/v_hand2.png')
        await A.wait(700);print(await A.ev("()=>[me.sty.p7tb,stTxt()]"))
        await b.close()
    p.terminate()
asyncio.run(main())
