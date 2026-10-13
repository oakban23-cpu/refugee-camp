import asyncio,random
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
M="()=>{const s=mons;mons=[];const t0=performance.now();for(let i=0;i<30;i++){draw()}mons=s;return +((performance.now()-t0)/30).toFixed(2)}"
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i1},n:0,a:0,e:1,e6:1}};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1500)
        print('base',[await A.ev(M) for _ in range(2)])
        await A.ev("()=>{window._dg=dgdScreen;window.dgdScreen=dgdScreen=function(){}}");await A.wait(500);print('no dgd',[await A.ev(M) for _ in range(2)])
        await A.ev("()=>{dgdScreen=window._dg;MAPS[curMap].th=30}");await A.wait(500);print('th30',[await A.ev(M) for _ in range(2)])
        await A.ev("()=>{MAPS[curMap].th=11;MAPS[curMap].bth=30}");await A.wait(500);print('bth30',[await A.ev(M) for _ in range(2)])
        await A.ev("()=>{MAPS[curMap].bth=14;window._qd=qshDraw;window.qshDraw=qshDraw=function(){}}");await A.wait(500);print('no qshDraw',[await A.ev(M) for _ in range(2)])
        await A.ev("()=>{qshDraw=window._qd;window._ps=plxScreen;}");
        print('t',await A.ev("()=>{const o={};const T=(k,f)=>{const t0=performance.now();for(let i=0;i<20;i++){g.save();try{f()}catch(e){}g.restore()}o[k]=+((performance.now()-t0)/20).toFixed(2)};T('plx',()=>plxScreen());T('drawNyx',()=>drawNyxFx());T('gxGround',()=>gxGround(MAPS[curMap]));T('worldLight',()=>{try{worldLight()}catch(e){}});return JSON.stringify(o)}"))
        await b.close()
    p.terminate()
asyncio.run(main())
