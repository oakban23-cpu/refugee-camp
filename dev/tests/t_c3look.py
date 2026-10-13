import asyncio, sys, random, base64
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'C3'+str(random.randint(1000,9999)), 'melee', 60)
        await A.wait(800)
        url=await A.ev("""()=>{const cv=document.createElement('canvas');const S=3.2,CW=120,CH=170;cv.width=CW*10;cv.height=CH*2*1;const x=cv.getContext('2d');x.fillStyle='#3a5a2a';x.fillRect(0,0,cv.width,cv.height);const g0=g;let i=0;
          for(const c of ['melee','archer','sup','assn','mage'])for(const b of [1,2]){for(const row of [0,1]){g=x;x.save();x.translate(i*CW+CW/2,row*CH+140);x.scale(S*.75,S*.75);const o=DC3;DC3=row?b:0;try{drawChar(0,-14,c,1,0,0,performance.now()/1000+i,0,0,0,b,0)}catch(e){console.log(e)}DC3=o;x.restore();g=g0}i++}
          return cv.toDataURL()}""")
        open('../fx/c3_lineup.png','wb').write(base64.b64decode(url.split(',')[1]))
        await A.ev("()=>{me.rb=1;me.cls2=1;me.brU={1:1,2:1};me.br=1;applyBr();me.x=1450;me.y=2420}")
        await A.wait(800)
        await A.pg.screenshot(path='../fx/c3_ingame.png',clip={'x':95,'y':330,'width':200,'height':200})
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
