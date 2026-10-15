import asyncio,io
from h import *
from PIL import Image
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Aa','mage',60);B=await new_client(b,'Bb','sup',60)
        await A.ev("()=>{enterMap(1,{x:SX,y:SY});ov.hidden=true}");await B.ev("()=>{enterMap(1,{x:SX,y:SY});ov.hidden=true}");await A.wait(1500)
        await A.ev("()=>{tentHome()}");await A.wait(1200)
        au=await A.ev("()=>uid")
        await B.ev(f"()=>{{tentVisit('{au}')}}");await B.wait(4000)
        print('B map',await B.ev("()=>[curMap,MAPS[curMap]&&MAPS[curMap].n,tentHere()]"),'A map',await A.ev("()=>curMap"))
        await A.ev("()=>{me.x=TBED.x+6;me.y=TBED.y-2;TSL={t:40,x:me.x,y:me.y}}");await A.wait(2500)
        r=await B.ev("()=>{const o=Object.values(others)[0];return o?{zz:o.zz,x:Math.round(o.x),y:Math.round(o.y),za:(TVZS[o.u]||{}).a}:null}")
        print('B sees A',r,'pres',await A.ev("()=>window.lastPres&&window.lastPres.zz"))
        await B.ev("()=>{me.x=TBED.x+70;me.y=TBED.y+30;const c=document.getElementById('c');document.querySelectorAll('body *').forEach(x=>{if(x!==c&&!x.contains(c))x.style.visibility='hidden'})}");await B.wait(600)
        im=Image.open(io.BytesIO(await B.pg.screenshot())).convert('RGB');im.save('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/sr/zz_B.png')
        print('errs',[e for e in A.errs+B.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
