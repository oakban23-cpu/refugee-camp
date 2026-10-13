import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();ctx=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);pg=await ctx.new_page()
        await pg.goto(URL);await pg.wait_for_timeout(3000);await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.remove()}")
        el=await pg.query_selector('#accbox');await el.scroll_into_view_if_needed();await pg.screenshot(path='accui1.png')
        await pg.fill('#acn','abc');await pg.fill('#acp','1234');await pg.click('#acr');await pg.wait_for_timeout(1500)
        el=await pg.query_selector('#accbox');await el.scroll_into_view_if_needed();await pg.screenshot(path='accui2.png')
    finally: p.terminate()
asyncio.run(main())
