import asyncio,os,json,time,urllib.request
os.environ['ADMIN_KEY']='k123'
from h import *
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            A=await new_client(b,'AAA');B=await new_client(b,'BBB')
            for i in range(4):
                await A.wait(1000)
                print(i,await B.ev("()=>[Object.keys(others),curMap,room&&room.url]"),await A.ev("()=>[uid,curMap,me.cls,!!room]"))
            await A.ev("()=>{document.getElementById('cin').value='hi there';sendChat()}");await A.wait(800)
            print('B log',await B.ev("()=>chatLog.slice(-3).map(l=>[l.n,l.t])"))
    finally:
        p.terminate();print(p.stdout.read().decode()[-800:])
asyncio.run(main())
