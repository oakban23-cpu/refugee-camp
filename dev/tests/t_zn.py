import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        r=await A.ev("""()=>{const out={};for(const[m,f,T]of[[28,gardZone,GARZN],[29,thrZone,THRZN],[30,brgZone,BRGZN],[31,mktZone,MKTZN],[32,arZone,ARZN],[33,hpZone,HPZN],[27,palZone,PALZN]]){const s=new Set();for(let x=0;x<3200;x+=100)for(let y=0;y<3200;y+=100){const z=f(x,y);if(z)s.add(z)}out[m]=[...s].filter(z=>!T[z])}return out}""")
        print(r)
        await b.close()
    p.terminate()
asyncio.run(main())
