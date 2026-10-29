import asyncio,sys,base64
sys.path.insert(0,'.')
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch(); A=await new_client(b,'Art','archer',160)
        await A.ev("()=>{ov.hidden=true}");await A.wait(1500)
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=720;cv.height=300;const c=cv.getContext('2d');c.fillStyle='#2a2630';c.fillRect(0,0,720,300);
          const g0=g;g=c;const t=1.7;try{
          g.save();g.translate(90,150);g.scale(3,3);drawMount(6,0,0,1,0,t);g.restore();
          g.save();g.translate(290,150);g.scale(3,3);drawMount(10,0,0,1,0,t);g.restore();
          g.save();g.translate(290,280);g.scale(2.4,2.4);drawMount(10,0,0,1,1.3,t);g.restore();
          for(let k=0;k<3;k++){g.save();g.translate(480+k*80,150);g.scale(4,4);drawPet(15,0,0,1,t+k*.8,k===2,1,0);g.restore()}
          }finally{g=g0}
          const ic=[mountIcon(10),petIcon(15)];return [cv.toDataURL('image/png'),ic]}""")
        open('np/art_a.png','wb').write(base64.b64decode(r[0].split(',')[1]))
        await A.ev("()=>{wdrGive('ngm','t');const W=wdrSt();['h','w','a','b','f'].forEach(k=>W.s[k]='ngm');me.pets=[15];me.pet=15;me.mts=[10];me.mt=10;ov.hidden=true}")
        await A.wait(1500)
        await A.pg.screenshot(path='np/art_b.jpg',type='jpeg',quality=85,clip={'x':95,'y':300,'width':200,'height':240})
        await A.ev("()=>{mountToggle()}");await A.wait(1200)
        await A.pg.screenshot(path='np/art_c.jpg',type='jpeg',quality=85,clip={'x':95,'y':300,'width':200,'height':240})
        print('errs',[e for e in A.errs if 'ERR_' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
