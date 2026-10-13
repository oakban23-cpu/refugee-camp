import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Aq'+str(random.randint(1000,9999)), 'archer', 15)
        await A.ev("()=>{me.sty={s:4,n:0,a:1,e:0};gmGod=true;me.x=1600;me.y=1640;me.qs=[{id:'tq1',t:'kill',mp:1,n:4,h:0,g:100,e:100}];try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await A.wait(1000)
        await A.ev("()=>{questUI();ov.hidden=false}"); await A.wait(500)
        await A.pg.screenshot(path='aq3_board.png')
        await A.pg.click('[data-aq="tq1"]'); await A.wait(800)
        print('start',await A.ev("()=>[AQ&&AQ.src,AQ&&AQ.msg,ov.hidden,banner&&banner.s]"))
        for i in range(40):
            await A.wait(3000)
            r=await A.ev("()=>[Math.round(performance.now()/1000),curMap,AQ?AQ.msg:'-',HB.on?1:0,Math.round(me.x),Math.round(me.y),JSON.stringify(me.qs.map(q=>q.h+'/'+q.n)),ov.hidden?'':ov.dataset.k,banner?banner.s:'']")
            print(r,flush=True)
            if i==3: await A.pg.screenshot(path='aq3_hud.png')
            if r[2]=='-': break
        # story start + cancel by drag
        await A.ev("()=>{ov.hidden=true}"); await A.wait(300)
        await A.pg.click('#stq'); await A.wait(1500)
        print('story',await A.ev("()=>[AQ&&AQ.src,AQ&&AQ.msg,HB.on]"))
        await A.pg.screenshot(path='aq3_story.png')
        bb=await A.pg.evaluate("()=>{const r=cv.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]}")
        await A.pg.mouse.move(bb[0],bb[1]);await A.pg.mouse.down();await A.pg.mouse.move(bb[0]+60,bb[1],steps=5);await A.wait(500);await A.pg.mouse.up()
        await A.wait(300)
        print('after drag',await A.ev("()=>[!!AQ,banner&&banner.s,HB.on]"))
        await A.pg.click('#stq'); await A.wait(600)
        print('toggle on',await A.ev("()=>[!!AQ,AQ&&AQ.msg]"))
        await A.pg.click('#stq'); await A.wait(600)
        print('toggle off',await A.ev("()=>[!!AQ,banner&&banner.s]"))
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
