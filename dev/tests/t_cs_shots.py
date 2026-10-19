import asyncio,sys,json
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
OUT='/home/claude/promo3/cs'
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;window.DNH=12}"
POS={1:"MAPS[1].npc4?{x:MAPS[1].npc4.x+70,y:MAPS[1].npc4.y+40}:{x:CX,y:CY}",9:"MAPS[9].qn?{x:MAPS[9].qn.x,y:MAPS[9].qn.y+90}:{x:1600,y:1600}",29:"MAPS[29].npc?{x:MAPS[29].npc.x,y:MAPS[29].npc.y+90}:{x:1600,y:2600}",26:"{x:1600,y:1400}",33:"MAPS[33].npc?{x:MAPS[33].npc.x+40,y:MAPS[33].npc.y+80}:{x:1600,y:900}"}
async def main():
    ids=sys.argv[1:] or ['p1o','p1e','p2o','p2e','p3o','p3e','p4o','p4e','p5o','p5e','p6o','p6e','p7o','p7e']
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'ราชันย์','melee',99)
        await A.ev(CLR)
        for id in ids:
            mp=await A.ev("(id)=>CZDEF[id].mp",id)
            if mp: await A.ev("(mp)=>{const P="+"({1:()=>("+POS[1]+"),9:()=>("+POS[9]+"),29:()=>("+POS[29]+"),26:()=>("+POS[26]+"),33:()=>("+POS[33]+")})[mp]();enterMap(mp,P);mons.forEach(m=>{if(m.t<3)m.x+=6000})}",mp)
            await A.wait(2200);await A.ev(CLR)
            await A.ev("(id)=>{czReplay(id)}",id);await A.wait(300)
            n=0
            while n<16:
                st=await A.ev("()=>[SD.on,CZ.on,CZ.id,SD.i,SD.q.length,(SD.q[SD.i]||[])[0]]")
                if not st[0]: break
                await A.wait(1700)
                await A.pg.screenshot(path=f'{OUT}/{id}_{n:02d}.png');n+=1
                await A.ev("()=>{if(SD.typ)stNext();if(SD.choice&&SD.i===SD.q.length-1){stClose();return}stNext()}")
                await A.wait(200)
            post=await A.ev("()=>[SD.on,CZ.on,CZ.id]")
            if post[0]:
                await A.ev(CLR)
            print(id,'lines',n,'after',post,flush=True)
        Es=[e for e in A.errs if 'Failed to load resource' not in e];print('ERRS',Es[:5])
    finally: p.terminate()
asyncio.run(main())
