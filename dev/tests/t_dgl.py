import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        print(await A.ev("()=>DT.map((d,i)=>d?i+':'+d.n:i+':-').join(' | ')"))
        print(await A.ev("()=>{const o=[];for(const fn of ['twMap','trialMap','rteMap','rootMap','nyxMap','queenMap','raidMap','echoMap','eyeMap','siegeMap','wbMap','pvMap']){}return Object.keys(window).filter(k=>/^(is|[a-z]+I)$/.test(k)||/^[A-Z]+I$/.test(k)).slice(0,60).join(',')}"))
        await b.close()
    p.terminate()
asyncio.run(main())
