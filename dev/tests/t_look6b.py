import asyncio,base64
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'L6','melee',99)
        url=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=1000;cv.height=300;const x=cv.getContext('2d');x.fillStyle='#3a3020';x.fillRect(0,0,1000,300);const g0=g;
          try{g=x;const cls=['melee','archer','assn','mage','sup'];cls.forEach((c,i)=>{g.save();g.translate(100+i*200,170);g.scale(4,4);g.lineJoin='round';g.lineCap='round';
            rootAura(0,0);drawChar(0,0,c,1,0,314,performance.now()/1000,314,314,314,0,0);g.restore()});
            // compare: set5 and set4
          }finally{g=g0}return cv.toDataURL()}""")
        open('l6_off.png','wb').write(base64.b64decode(url.split(',')[1]))
        print(A.errs[:3])
    finally: p.terminate()
asyncio.run(main())
