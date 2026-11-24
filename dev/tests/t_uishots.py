import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/uipack/screens/'
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;try{TIPS.t=1e15;const c=document.getElementById('tipc');if(c)c.hidden=true}catch(e){}}"
UIS=['gearUI','sklUI','shopUI','questUI','storyUI','petUI','mountUI','smithUI','wardrobeUI','wmUI','cfgUI','mktUI']
async def run(b,vw,vh,tag):
    pg=await (await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
    await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['melee','Uix',60]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
    await pg.evaluate("()=>{ov.hidden=true}");await pg.wait_for_timeout(800)
    await pg.screenshot(path=O+f'{tag}_hud.jpg',type='jpeg',quality=82)
    for u in UIS:
        try:
            await pg.evaluate("u=>{ov.hidden=false;window[u]()}",u);await pg.wait_for_timeout(900)
            await pg.screenshot(path=O+f'{tag}_{u}.jpg',type='jpeg',quality=82)
        except Exception as e:print('skip',u,str(e)[:80])
    await pg.evaluate("()=>{ov.hidden=true}")
    try:
        await pg.evaluate("()=>{stSay([['npc_old','เด็กหนุ่มเอ๋ย ฟื้นแล้วรึ ลุกไหวไหม ค่ายของเราอยู่ทางเหนือ เดินตามแสงไฟไปเถิด']])}");await pg.wait_for_timeout(1500)
        await pg.screenshot(path=O+f'{tag}_dialog.jpg',type='jpeg',quality=82)
    except Exception as e:print('dlg',str(e)[:100])
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            await run(b,915,412,'land');await run(b,390,844,'port')
    finally:p.terminate()
asyncio.run(main())
