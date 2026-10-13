import asyncio,random,sys
from h import *
from PIL import Image
IDS=[int(x) for x in sys.argv[1].split(',')]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{setInterval(()=>{FQ.avg=0;LOWQ=false},40)}")
        ims=[]
        for i in IDS:
            await A.ev(f"()=>{{gmGod=true;const M=dgMap({i});enterMap({i},{{x:M.sx,y:M.sy}})}}");await A.wait(1500)
            await A.ev("()=>{try{dgStart()}catch(e){}}");await A.wait(4000)
            await A.ev("()=>{try{if(!mons.some(m=>m.t===3))spawnBoss()}catch(e){};const B=mons.find(m=>m.t===3);if(B){me.x=B.x;me.y=B.y+170;lockId=B.id}AUTO.on=true;window._sk=setInterval(()=>{me.mp=me.mm;for(let k=0;k<6;k++)try{useSk(k)}catch(e){}},300)}")
            for k in range(2):
                await A.wait(1700);await A.pg.screenshot(path='../p6/_f.png');ims.append(Image.open('../p6/_f.png').crop((0,74,390,810)).resize((234,442)))
            await A.ev("()=>{clearInterval(window._sk);AUTO.on=false}")
            print(i,await A.ev("()=>[dg.ph,mons.filter(m=>m.t===3).length,mons.length]"))
        W=Image.new('RGB',(234*min(6,len(ims)),442*((len(ims)+5)//6)))
        for k,im in enumerate(ims):W.paste(im,((k%6)*234,(k//6)*442))
        W.save('../p6/fight_grid.png');print('errs',[e for e in A.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
