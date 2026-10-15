import asyncio,os,json
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Aa','mage',60);B=await new_client(b,'Bb','sup',50)
        await A.wait(3000)
        # reply lost: server accepted, client never saw mla
        await A.ev("()=>{emitM('mls',{t:'lost1',to:'Bb',tx:'x',mid:mkMid()})}");await A.wait(1200)
        await A.ev("()=>{me.gold=1000;mlPend().push({t:'lost1',to:'Bb',k:'st',d:{k:'hp',n:5},g:0,fee:50,at:Date.now()-20000});mlPend().push({t:'never1',to:'Bb',k:'st',d:{k:'hp',n:7},g:0,fee:50,at:Date.now()-20000});window.__hp=gdGet('hp')}")
        await A.wait(13000)
        print('pending',await A.ev("()=>me.mlp.map(p=>p.t)"),'gold',await A.ev("()=>me.gold"),'hp delta',await A.ev("()=>gdGet('hp')-window.__hp"))
        # late arrival of a dead token is rejected
        await A.ev("()=>{emitM('mls',{t:'never1',to:'Bb',tx:'late',mid:mkMid()})}");await A.wait(1200)
        await B.ev("()=>mlQ(1)");await B.wait(1200);print('B mails',await B.ev("()=>MLD&&MLD.L.map(x=>x.t)"))
        # new char in same session must not inherit gather/friends/pending
        await A.ev("()=>{gtAdd('o1',9);me.frd={L:[{n:'Zz',c:'',lv:1,at:1,ls:1}]};me.rb=1;me.mlp=[{t:'q1',to:'Bb',g:0,fee:0,at:1}];writeSave()}");await A.wait(800)
        await A.ev("()=>{pick('melee','','Cc')}");await A.wait(1500)
        print('new char state',await A.ev("()=>[me.nm,gtHas('o1'),me.frd.L.length,me.rb,me.mlp.length,MLD===null]"))
        print('errs',[e for e in A.errs+B.errs if 'TUNNEL' not in e][:4])
    finally:
        p.terminate()
asyncio.run(main())
