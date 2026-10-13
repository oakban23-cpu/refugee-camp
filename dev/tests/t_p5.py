import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'P5'+str(random.randint(1000,9999)), 'mage', 99)
        await A.ev("()=>{gmGod=true;me.sty={s:100,n:0,a:0,e:1,e4:1}}")
        await A.wait(800)
        print('hud',await A.ev("()=>stTxt()"))
        await A.ev("()=>{ov.hidden=true;enterMap(9,{x:1600,y:1450})}");await A.wait(2500)
        print('gate hidden before',await A.ev("()=>{const G=MAPS[9].gates.find(g=>g.to===27);return [gHid(G),wpGateOk(G)]}"))
        # talk to queen
        r=await A.ev("()=>{const i=CITY.npcs.findIndex(N=>N.k==='qn');const N=CITY.npcs[i];me.x=N.x;me.y=N.y+40;npcSel='x'+i;return stNpcClick()}")
        print('talk queen',r)
        for i in range(40):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(120)
            if not await A.ev("()=>SD.on"):break
        await A.wait(600)
        print('after talk',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),P5QH()]"))
        print('gate',await A.ev("()=>{const G=MAPS[9].gates.find(g=>g.to===27);return [gHid(G),wpGateOk(G),G.x,G.y]}"))
        await A.pg.add_style_tag(content='#sdlg{opacity:.98}')
        await A.ev("()=>{me.x=1840;me.y=1290}");await A.wait(900)
        await A.pg.screenshot(path='../fx/p5_citygate.png')
        await A.ev("()=>{ov.hidden=true;enterMap(27,{x:1600,y:2880})}");await A.wait(2500)
        for i in range(30):
            await A.ev("()=>{mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>400);if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        print('in palace',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length]"))
        await A.pg.screenshot(path='../fx/p5_entry.png')
        # talk liria
        r=await A.ev("()=>{npcSel=1;me.x=MAPS[27].npc.x;me.y=MAPS[27].npc.y+40;return stNpcClick()}")
        for i in range(30):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(120)
            if not await A.ev("()=>SD.on"):break
        await A.wait(800)
        print('after lir',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        # views around palace
        for nm,x,y in [('hall',1600,1800),('mirror',520,1700),('archive',2700,1200),('north',1600,700)]:
            await A.ev(f"()=>{{me.x={x};me.y={y}}}");await A.wait(900)
            await A.pg.screenshot(path=f'../fx/p5_{nm}.png')
        # kill progression
        await A.ev("()=>{for(let i=0;i<60;i++)stKill(0,0)}");await A.wait(300)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.n,stTxt()]"))
        await A.ev("()=>{me.x=1600;me.y=2700;mons=[]}")
        for i in range(40):
            await A.ev("()=>{mons=[];stTick();if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        print('after kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        print([e for e in A.errs if 'TUNNEL' not in e][:6])
        await b.close()
    p.terminate()
asyncio.run(main())
