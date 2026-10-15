import asyncio,os,json,urllib.request
os.environ['ADMIN_KEY']='k123'
from h import *
async def reg(c,name):
    await c.ev("()=>{ov.hidden=false;mktUI()}");await c.wait(300)
    await c.pg.fill('#acn',name);await c.pg.fill('#acp','1234');await c.pg.click('#acr');await c.wait(2000)
    return await c.ev("()=>ACC&&ACC.a")
async def note(c): return await c.ev("()=>(document.querySelector('.note')||{}).textContent||''")
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Aa','mage',60);B=await new_client(b,'Bb','sup',50)
        for c in (A,B): await c.ev("()=>{const e=document.getElementById('procv');if(e)e.remove();window.PRO_ON=0}")
        await A.ev("()=>{me.gold=200000;gtAdd('o1',50);gtAdd('h2',20);writeSave()}");await B.ev("()=>{me.gold=100000;writeSave()}")
        print('reg',await reg(A,'mail_a'),await reg(B,'mail_b'))
        print('mids',await A.ev("()=>me.mkid"),await B.ev("()=>me.mkid"))
        # ---- market: gathering mats
        print('MKG has o1',await A.ev("()=>MKG.includes('o1')&&!!GDM.o1&&gdGet('o1')"))
        await A.ev("()=>{mkTab='sell';mktUI();document.getElementById('mkpr').value='500';mkAct('s','st:o1:10')}");await A.wait(1500)
        print('A after list',await A.ev("()=>gtHas('o1')"),await note(A))
        await B.ev("()=>{mkTab='buy';mkFetch()}");await B.wait(1000)
        L=await B.ev("()=>MKD&&MKD.L.map(x=>[x.id,x.k,x.d,x.p])");print('listings',L)
        sell=await A.ev("()=>{mkTab='sell';mktUI();return ov.innerText.includes('แร่เหล็ก')}");print('sell list shows ore',sell)
        await B.ev(f"()=>mkAct('b','{L[0][0]}')");await B.wait(4000)
        print('B ore after buy',await B.ev("()=>gtHas('o1')"),await note(B))
        # ---- text mail while online
        await A.ev("()=>{mlTo('Bb');document.getElementById('mltx').value='สวัสดี B 👋';mlSend()}");await A.wait(1500)
        print('A note',await note(A));print('B unread',await B.ev("()=>MLN"),await B.ev("()=>chatLog.slice(-1).map(l=>l.t)"))
        await B.ev("()=>{MLTAB='in';mlUI();mlQ(1)}");await B.wait(1200)
        print('B inbox',await B.ev("()=>MLD&&MLD.L.map(x=>[x.fn,x.t,x.rd])"),'badge',await B.ev("()=>MLN"))
        # ---- B goes offline; A sends item+gold+goods
        bslot=await B.ev("()=>me.slot");await B.ev("()=>writeSave()");await B.wait(1500);await B.ctx.close();await A.wait(1500)
        g0=await A.ev("()=>me.gold")
        await A.ev("()=>{ov.hidden=true;MLW={to:'Bb',tx:'ของฝาก',k:'',v:'',n:1,g:0,pick:'st',sig:''};MLTAB='w';mlUI();MLW.k='st';MLW.v='h2';MLW.n=5;mlUI();document.getElementById('mlg').value='10000';mlSend()}");await A.wait(5000)
        print('A gold',g0,'->',await A.ev("()=>me.gold"),'h2',await A.ev("()=>gtHas('h2')"),await note(A),'pend',await A.ev("()=>me.mlp.length"))
        # item mail
        await A.ev("()=>{const it=genItem(30,'w',3,3);me.bag.push(it);ov.hidden=true;MLW={to:'Bb',tx:'ดาบ',k:'it',v:String(me.bag.length-1),n:1,g:0,pick:'it',sig:JSON.stringify(it)};MLTAB='w';mlUI();mlSend()}");await A.wait(2500)
        print('A fields after send',await A.ev("()=>[ (document.getElementById('mltx')||{}).value,(document.getElementById('mlg')||{}).value,MLW.tx,MLW.g]"));print('A item sent',await note(A),'bag',await A.ev("()=>me.bag.length"))
        # errors: unknown name, self
        await A.ev("()=>{ov.hidden=true;MLW.to='Nobody';MLW.tx='hi';mlUI();mlSend()}");await A.wait(1600);print('unknown',await note(A))
        await A.ev("()=>{ov.hidden=true;MLW.to='Aa';MLW.tx='hi';mlUI();mlSend()}");await A.wait(400);print('self',await note(A))
        # gold cheat: more gold than saved
        await A.ev("()=>{me.gold+=5000000;ov.hidden=true;MLW={to:'Bb',tx:'',k:'',v:'',n:1,g:4000000,pick:'st',sig:''};mlUI();mlSend()}");await A.wait(6000);print('cheat gold send',await note(A),await A.ev("()=>me.gold"))
        await A.wait(12000);mj=json.load(open(DD+'/mail.json'));print('mail.json boxes',{k:[(x['fn'],x['t'],x['a'],x['g']) for x in v] for k,v in mj['b'].items()})
        # ---- B returns: new context, login account, load char
        ctx=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True);pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
        await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate("()=>{document.getElementById('ttl')&&document.getElementById('ttl').remove();localStorage.setItem('refugee_tut','1')}")
        await pg.fill('#acn','mail_b');await pg.fill('#acp','1234');await pg.click('#acl');await pg.wait_for_timeout(2500)
        await pg.evaluate("(s)=>{pick(scls(s),s);window.PRO_ON=0;ov.hidden=true}",bslot);await pg.wait_for_timeout(9000)
        print('B2 unread',await pg.evaluate("()=>[MLN,me.nm,me.mkid,(document.querySelector('#mlb .bd')||{}).textContent]"))
        await pg.evaluate("()=>{MLTAB='in';mlUI();mlQ(1)}");await pg.wait_for_timeout(1500)
        await pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/ml_inbox.png')
        Lm=await pg.evaluate("()=>MLD.L.map(x=>[x.id,x.fn,x.t,!!x.a,x.g])");print('B2 inbox',Lm)
        gb=await pg.evaluate("()=>[me.gold,gtHas('h2'),me.bag.length]")
        for m in Lm:
            if m[3] or m[4]: await pg.evaluate(f"()=>mlClaim({m[0]})");await pg.wait_for_timeout(4500);print(' claim',m[0],await pg.evaluate("()=>(document.querySelector('.note')||{}).textContent"))
        print('B2 gold/h2/bag',gb,'->',await pg.evaluate("()=>[me.gold,gtHas('h2'),me.bag.length]"))
        # double claim
        await pg.evaluate(f"()=>{{MLX.claim=0;emitM('mlc',{{id:{Lm[-1][0]},mid:mkMid(),acc:mkA()}})}}");await pg.wait_for_timeout(1500);print('dbl claim',await pg.evaluate("()=>(document.querySelector('.note')||{}).textContent"))
        # reply + delete read
        await pg.evaluate("()=>{mlTo('Aa');document.getElementById('mltx').value='ขอบใจ!';mlSend()}");await pg.wait_for_timeout(1500);print('A unread',await A.ev("()=>MLN"))
        await pg.evaluate("()=>{MLTAB='in';mlUI();MLX.del=1;}");await pg.wait_for_timeout(300)
        await pg.evaluate("()=>{document.querySelector('[data-mlda]').click()}");await pg.wait_for_timeout(1200);await pg.evaluate("()=>mlQ(1)");await pg.wait_for_timeout(1200)
        print('B2 inbox after del',await pg.evaluate("()=>MLD.L.length"))
        # compose screenshot
        await A.ev("()=>{ov.hidden=true;MLW={to:'Bb',tx:'ทดสอบ',k:'st',v:'o1',n:5,g:2000,pick:'st',sig:''};MLTAB='w';mlUI()}");await A.wait(400)
        await A.pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/ml_compose.png')
        # friend row button
        print('save rt',await A.ev("()=>{me.mlp=[{t:'abc123',to:'Bb',k:'st',d:{k:'o1',n:3},g:5,fee:55,at:1}];const s=JSON.parse(JSON.stringify(snap()));const c=cleanSaves({v:1,chars:{x:Object.assign(s,{cls:me.cls})}}).chars.x;me.mlp=[];return JSON.stringify(c.mlp)}"))
        print('admin ml',json.load(urllib.request.urlopen(urllib.request.Request(URL+'admin/api',headers={'x-admin-key':'k123'})))['ml'])
        print('errs',[e for e in A.errs+errs if 'TUNNEL' not in e][:5])
    finally:
        p.terminate();out=p.stdout.read().decode();print(out[-600:])
asyncio.run(main())
