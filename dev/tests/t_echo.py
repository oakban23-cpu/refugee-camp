import asyncio,random
from h import *
from PIL import Image
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7or)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:0,e:1,e6:1,p7m:1}};const s=document.createElement('style');s.textContent='#topb,#clog,#stq{{display:none!important}}';document.head.appendChild(s);setInterval(()=>{{FQ.avg=0;LOWQ=false;mons=[]}},50);enterMap(36,{{x:1600,y:1400}})}}");await A.wait(3000)
        await A.pg.screenshot(path='../p6/o_echo_d.png')
        await A.ev("()=>{window.DNH=22}");await A.wait(2000);await A.pg.screenshot(path='../p6/o_echo_n.png')
        a=Image.open('../p6/o_echo_d.png').crop((60,60,330,470));c=Image.open('../p6/o_echo_n.png').crop((60,60,330,470))
        W=Image.new('RGB',(540,410));W.paste(a,(0,0));W.paste(c,(270,0));W.save('../p6/o_echo2.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
