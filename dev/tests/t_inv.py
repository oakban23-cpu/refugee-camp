import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
import h
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        an='Inv'+str(random.randint(100,999))
        A = await new_client(b, an, 'mage', 40)
        await A.ev("()=>{ov.hidden=true;enterMap(2,{x:1500,y:1500})}")
        h.URL0=h.URL
        ctx = await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True)
        pg = await ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
        await pg.goto(URL+'?inv='+an); await pg.wait_for_timeout(2000)
        print('A name',await A.ev('()=>[myName,uid]'));print('IVP', await pg.evaluate("()=>[IVP,location.search]"))
        bn='New'+str(random.randint(100,999))
        await pg.evaluate(SETUP,['melee',bn,1]);await pg.evaluate("()=>{window.__em=[];const o=room.emit.bind(room);room.emit=(k,d)=>{if(k==='pty')__em.push(JSON.stringify(d).slice(0,160));return o(k,d)}}");await A.ev("()=>{window.__pm=[];const o=ptMsg;window.ptMsg=function(d){__pm.push(JSON.stringify(d).slice(0,160));return o.apply(this,arguments)}}"); await pg.wait_for_timeout(1500)
        await pg.evaluate("u=>room.emit('pty',{mp:curMap,d:{op:'zz',to:u,from:uid,n:myName}})",A.uid);await pg.wait_for_timeout(800);print('A recv direct',await A.ev('()=>__pm'))
        print('B room',await pg.evaluate('()=>[room&&room.url,room&&room.count,!!room,uid]'))
        for i in range(6):
            await pg.evaluate('()=>{IVT=0}')
            await pg.wait_for_timeout(3000)
            st=await pg.evaluate("()=>[PTY?PTY.mem.map(m=>m.n):null,IVP,me.gold,me.inv.hp,me.ivb|0,banner&&banner.s]")
            print('B',st)
            if st[0] and len(st[0])>1: break
        print('B emits',await pg.evaluate('()=>__em'));print('A recv',await A.ev('()=>__pm'));print('A', await A.ev("()=>[PTY?PTY.mem.map(m=>m.n):null,me.ivr,me.ivb|0,me.gold,chatLog.slice(-3).map(c=>c.t)]"))
        await A.ev("()=>inviteUI()");await A.wait(400);await A.pg.screenshot(path='inv_ui.png')
        print('errs A',[e for e in A.errs if 'TUNNEL' not in e][:3],'B',errs[:3])
        await b.close()
    p.terminate()
    out=p.stdout.read().decode(errors='ignore');print('SRVOUT',len(out),[l for l in out.splitlines() if 'LNK' in l or 'PTYIN' in l][:8],out[:300])
asyncio.run(main())
