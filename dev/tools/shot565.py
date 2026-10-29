import asyncio,sys
sys.path.insert(0,'.')
from h import *
from PIL import Image
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch(); A=await new_client(b,'Nmx','archer',99)
        await A.ev("()=>{ov.hidden=true;me.sty.s=STY.length;me.ngm={b:{rte:3,gdl:2,pfn:1},w:{k:nmWk(),b:{rte:2}},f:{'rte:1':1,'rte:2':1,'rte:3':1,'gdl:1':1,'gdl:2':1,'pfn:1':1},n:9,c:640,r:{},rt:1};nmEnsure();nmUI()}");await A.wait(900)
        await A.pg.screenshot(path='np/s5_nm.jpg',type='jpeg',quality=80)
        await A.ev("()=>{ov.querySelector('[data-nmshop]').click()}");await A.wait(900)
        await A.pg.screenshot(path='np/s5_shop.jpg',type='jpeg',quality=80)
        await A.ev("()=>{ov.scrollTop=ov.scrollHeight;const p=ov.querySelector('.pn');if(p)p.scrollTop=p.scrollHeight}");await A.wait(400)
        await A.pg.screenshot(path='np/s5_shop2.jpg',type='jpeg',quality=80)
        await A.ev("()=>{nmShopBuy('pet');nmShopBuy('set');ov.hidden=true;const W=wdrSt();['h','w','a','b','f'].forEach(k=>W.s[k]='ngm');me.pet=15;banner=null;enterMap(1,{x:CX+260,y:CY+260})}");await A.wait(2500)
        await A.ev("()=>{banner=null}");await A.wait(300)
        await A.pg.screenshot(path='np/s5_game.jpg',type='jpeg',quality=80)
        ims=[Image.open('np/'+n) for n in ['s5_nm.jpg','s5_shop.jpg','s5_shop2.jpg','s5_game.jpg']]
        h=max(i.height for i in ims);S=Image.new('RGB',(sum(i.width for i in ims)+30,h),(20,16,24));x=0
        for i in ims:S.paste(i,(x,0));x+=i.width+10
        S.save('np/v565_sheet.jpg',quality=82)
        print('errs',[e for e in A.errs if 'ERR_' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
