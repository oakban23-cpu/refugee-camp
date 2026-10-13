import asyncio
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch();pg=await b.new_page();E=[]
        pg.on('pageerror',lambda e:E.append((e.stack or str(e))[:600]))
        await pg.goto(URL);await pg.wait_for_timeout(2500);print(E[:5])
        await b.close()
    p.terminate()
asyncio.run(main())
