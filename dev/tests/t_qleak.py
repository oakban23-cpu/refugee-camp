import asyncio,random
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
C="""()=>{const r={};for(const k of Object.getOwnPropertyNames(window)){try{const v=window[k];if(Array.isArray(v)&&v.length>20)r[k]=v.length}catch(e){}}
 for(const k of ['teles','dn','drops','mons','parts','ECL','EHD','VLN','MDTL','fxs','FXL','burstL','pts']){try{const v=eval(k);if(Array.isArray(v))r['L_'+k]=v.length}catch(e){}}
 const B=qshBoss&&qshBoss();if(B){r.btl=(B.tl||[]).length}r.ab=QSFX.ab.length;return JSON.stringify(r)}"""
M="()=>{const t0=performance.now();for(let i=0;i<20;i++){draw()}return +((performance.now()-t0)/20).toFixed(2)}"
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i1},n:0,a:0,e:1,e6:1}};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1500)
        await A.ev("()=>{const B=qshBoss();B.hp=B.mh*.38;me.x=CX;me.y=CY+150}")
        for t in range(6):
            await A.wait(3000)
            print(t*3, await A.ev(M), await A.ev(C))
        await b.close()
    p.terminate()
asyncio.run(main())
