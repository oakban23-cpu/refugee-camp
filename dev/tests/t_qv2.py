import asyncio,random
from h import *
from PIL import Image
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:0,e:1,e6:1,p7m:1}};const s=document.createElement('style');s.textContent='#topb,#clog,#stq{{display:none!important}}';document.head.appendChild(s);setInterval(()=>{{FQ.avg=0;LOWQ=false;const B=qshBoss&&qshBoss();if(B){{B.x=CX;B.y=CY-60;B.tx=B.x;B.ty=B.y}}}},30);qshEnter()}}");await A.wait(2500)
        await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1500)
        await A.ev("()=>{me.x=CX;me.y=CY+160;QS.nt=99}");await A.wait(1500);await A.pg.screenshot(path='../p6/q_a.png')
        await A.ev("()=>{qshBoss().stun=30}");await A.wait(1200);await A.pg.screenshot(path='../p6/q_b.png')
        await A.ev("()=>{qshBoss().stun=0;window._gq=gxQueenShell;window.gxQueenShell=gxQueenShell=function(...a){gxBoss14(...a)}}");await A.wait(1200);await A.pg.screenshot(path='../p6/q_c.png')
        print(await A.ev("()=>{const B=qshBoss();return [MLB&&MLB.has?MLB.has(B):'?',typeof monLit]}"))
        im=[Image.open(f'../p6/q_{k}.png').crop((0,74,390,500)).resize((300,328)) for k in 'abc']
        W=Image.new('RGB',(900,328));[W.paste(x,(i*300,0)) for i,x in enumerate(im)];W.save('../p6/q_abc.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
