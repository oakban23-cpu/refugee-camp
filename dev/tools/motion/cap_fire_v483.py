import asyncio,sys,os,random
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
FI="(k)=>{const A=ANS[k];if(A){A.it=40;A.mv=0}const I=CHIDL[k];if(I)I.ak=0;const S=SI7[k];if(S){S.hit=0;S.ca=0}return !!A}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':1280,'height':720})
        pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:300]))
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        await pg.evaluate(SETUP,[os.environ.get('CLS','melee'),'Fire'+str(random.randint(10,99)),70]);await pg.wait_for_timeout(2000)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await pg.evaluate("()=>{enterMap(1,{x:CX+66,y:CY+20})}");await pg.wait_for_timeout(3500)
        await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;try{if(CZ.on)czSkip()}catch(e){};me.x=CX+66;me.y=CY+20;me.face=0;window.__pin=setInterval(()=>{me.x=CX+66;me.y=CY+20},40)}")
        await pg.wait_for_timeout(800)
        await pg.evaluate(FI,await pg.evaluate("()=>uid"));await pg.wait_for_timeout(1200)
        await pg.screenshot(path='g_fire.png')
        # เลือดน้อย
        await pg.evaluate("()=>{clearInterval(window.__pin);enterMap(13,{x:1600,y:1600})}");await pg.wait_for_timeout(3000)
        await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;setInterval(()=>{mons=mons.filter(m=>m.t>=3)},50);gmGod=false;me.hp=Math.round(me.mh*.18)}");await pg.wait_for_timeout(1500)
        await pg.screenshot(path='g_low.png')
        await pg.evaluate("()=>{me.hp=me.mh*.8}");await pg.wait_for_timeout(450);await pg.screenshot(path='g_relief.png')
        await pg.evaluate("()=>{me.hp=me.mh;gmGod=true;CH7.t=0;cheerGo('lv')}");await pg.wait_for_timeout(330);await pg.screenshot(path='g_cheer.png')
        print('errs',E[:3])
    finally: p.terminate()
asyncio.run(main())
