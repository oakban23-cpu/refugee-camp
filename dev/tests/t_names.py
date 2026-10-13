import asyncio,sys,os,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import h
from h import *
async def fresh(b):
    ctx=await b.new_context(viewport={'width':390,'height':844});pg=await ctx.new_page();c=Client(ctx,pg,'x')
    pg.on('pageerror',lambda e:c.errs.append(str(e)[:300]))
    await pg.goto(URL);await pg.wait_for_timeout(2500)
    await pg.evaluate("()=>{document.getElementById('ttl')&&document.getElementById('ttl').remove();localStorage.setItem('refugee_tut','1')}")
    return c
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await fresh(b)
        await A.ev("()=>{csMode='new';intro();nmCreate('assn','Kira')}");await A.wait(1500)
        print('1 A created:',await A.ev("()=>[me.cls,me.nm,me.mkid,NMC.done]"))
        await A.ev("()=>{window.PRO_ON=0;const e=document.getElementById('procv');if(e)e.remove();ov.hidden=true}")
        B=await fresh(b)
        await B.ev("()=>{csMode='new';intro();nmCreate('mage','kira')}");await B.wait(1500)
        print('2 B dup:',await B.ev("()=>[me.cls||'',($('csnm')||{}).textContent]"))
        await B.ev("()=>{nmCreate('mage','Kira2')}");await B.wait(1500)
        print('2 B new:',await B.ev("()=>[me.cls,me.nm,NMC.done]"))
        # C: existing old character named Kira (no reservation)
        C=await new_client(b,'Kira','melee')
        await C.wait(4500)
        print('3 C forced:',await C.ev("()=>[NMC.bad,ov.dataset.k,ov.hidden]"))
        await C.ev("()=>emitM('lbs',{k:'pv',t:99,n:myName,cls:me.cls,lv:me.lv,pc:1})");
        await C.ev("()=>{$('nmfi').value='Kira2';ov.querySelector('[data-nmf]').click()}");await C.wait(1200)
        print('3 C try taken:',await C.ev("()=>[NMC.bad,(ov.querySelector('.note')||{}).textContent]"))
        await C.ev("()=>{$('nmfi').value='Neo';ov.querySelector('[data-nmf]').click()}");await C.wait(1200)
        print('3 C renamed:',await C.ev("()=>[NMC.bad,NMC.done,me.nm,myName,ov.hidden]"))
        # Neo freed? (same mid renamed) -> another can take Neo
        D=await fresh(b);await D.ev("()=>{csMode='new';intro();nmCreate('sup','Neo')}");await D.wait(1500)
        print('5 Neo freed after rename:',await D.ev("()=>[me.cls||'',me.nm]"))
        await A.ev("()=>emitM('lbq',{})");await A.wait(800);print('lb pv',await A.ev("()=>JSON.stringify(lbData.pv||[])"))
        print('names.json', open(os.path.join(h.DD,'names.json')).read() if os.path.exists(os.path.join(h.DD,'names.json')) else 'not yet')
        print('errs',[e for c in (A,B,C,D) for e in c.errs][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
