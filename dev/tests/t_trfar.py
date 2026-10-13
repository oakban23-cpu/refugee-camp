import asyncio,sys,os,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from h import *
SNAP="()=>({gold:me.gold,bag:me.bag.length})"
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Alpha');B=await new_client(b,'Bravo')
        await A.ev("()=>{enterMap(9,{x:1150,y:1300});ov.hidden=true}");await B.ev("()=>{enterMap(9,{x:2050,y:1900});ov.hidden=true}");await A.wait(4000)
        print('A others',await A.ev("()=>Object.keys(others)"),'roster',await A.ev("()=>rosterList().map(x=>x.n)"))
        await A.ev("()=>{partyUI()}");await A.wait(600)
        print('party list has far B:',await A.ev("()=>{const e=document.querySelector('[data-trq]');return e?e.closest('.pm').textContent:null}"))
        await A.ev("()=>{me.gold=50000;me.bag=me.bag.slice(0,5);me.bag.push(genItem(10,'w',3,3))}");await B.ev("()=>{me.gold=20000;me.bag=me.bag.slice(0,5);me.bag.push(genItem(10,'a',2,2))}")
        a0=await A.ev(SNAP);b0=await B.ev(SNAP)
        await A.ev("()=>{document.querySelector('[data-trq]').click()}");await B.wait(1500)
        print('B req',await B.ev("()=>trReq&&trReq.n"),'B trq visible',await B.ev("()=>!$('trq').hidden"))
        await B.ev("()=>trAccept()");await A.wait(1500)
        print('states',await A.ev("()=>tr&&tr.st"),await B.ev("()=>tr&&tr.st"))
        await A.ev("()=>{trToggle(me.bag.length-1);trGold(1000)}");await B.ev("()=>{trToggle(me.bag.length-1);trGold(300)}");await A.wait(1500)
        await A.ev("()=>trLock()");await B.ev("()=>trLock()");await A.wait(1500)
        await A.ev("()=>trConfirm()");await B.ev("()=>trConfirm()");await A.wait(3000)
        a1=await A.ev(SNAP);b1=await B.ev(SNAP)
        print('A',a0,'->',a1,'B',b0,'->',b1,'tr',await A.ev("()=>tr&&tr.st"),await B.ev("()=>tr&&tr.st"))
        print('errs',[e for c in (A,B) for e in c.errs if 'ERR_' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
