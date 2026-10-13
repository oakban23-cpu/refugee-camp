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
        i0=await A.ev("()=>STY.findIndex(x=>x.p7ls)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:1,e:1,e6:1,p7m:1}};const s=document.createElement('style');s.textContent='#topb,#clog,#stq{{display:none!important}}';document.head.appendChild(s);setInterval(()=>{{FQ.avg=0;LOWQ=false;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>420)}},50);enterMap(10,{{x:QSA[1][0]-80,y:QSA[1][1]+200}})}}");await A.wait(2500)
        await A.pg.screenshot(path='../p6/q_f1.png')
        for k in range(12):
            await A.ev("()=>{me.x=QSA[1][0];me.y=QSA[1][1]+30}");await A.wait(200)
        await A.wait(900);await A.pg.screenshot(path='../p6/q_f2.png')
        await A.ev("()=>{window.DNH=22;me.x=QSA[2][0]-60;me.y=QSA[2][1]+160}");await A.wait(1800);await A.pg.screenshot(path='../p6/q_f3.png')
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{window.DNH=12;me.sty.s={i1};me.sty.a=0;qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1200)
        await A.ev("()=>{const B=qshBoss();B.x=CX;B.y=CY-150;QS.nt=0}");await A.wait(600)
        await A.ev("()=>{const o=QS.o[0];if(o){me.x=o.x;me.y=o.y+6}}");await A.wait(500)
        await A.ev("()=>{me.x=CX+100;me.y=CY+60}");await A.wait(900);await A.pg.screenshot(path='../p6/q_f4.png')
        im=[Image.open(f'../p6/q_f{k}.png').crop((0,74,390,810)).resize((260,490)) for k in (1,2,3,4)]
        W=Image.new('RGB',(1040,490));[W.paste(x,(i*260,0)) for i,x in enumerate(im)];W.save('../p6/q_fgrid.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
