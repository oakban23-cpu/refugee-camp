import asyncio,sys
sys.path.insert(0,'.')
from h import *
from PIL import Image
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch(); A=await new_client(b,'Art','archer',160)
        await A.ev("()=>{wdrGive('ngm','t');const W=wdrSt();['h','w','a','b','f'].forEach(k=>W.s[k]='ngm');me.pets=[15];me.pet=15;me.mts=[10];me.mt=10;ov.hidden=true;enterMap(1,{x:CX+260,y:CY+260})}")
        await A.wait(2500)
        pos=await A.ev("()=>{banner=null;document.querySelectorAll('#hud,#stq,.toast,#sysl,#msgs').forEach(e=>e.style.visibility='hidden');return [me.x-cam.x,me.y-cam.y,W,H,innerWidth]}")
        print(pos)
        sx=pos[4]/pos[2];x=pos[0]*sx;y=pos[1]*sx
        for i,(nm,js) in enumerate([('stand',"()=>{}"),('ride',"()=>{mountToggle()}")]):
            await A.ev(js);await A.wait(1500);await A.ev("()=>{banner=null}")
            await A.pg.screenshot(path=f'np/a5_{nm}.png',clip={'x':max(0,x-90),'y':max(0,y-110),'width':180,'height':170})
        ims=[Image.open(f'np/a5_{n}.png').resize((360,340)) for n in ['stand','ride']]
        S=Image.new('RGB',(730,340));S.paste(ims[0],(0,0));S.paste(ims[1],(370,0));S.save('np/art_char.png')
        print('errs',[e for e in A.errs if 'ERR_' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
