import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
T=[]
def ck(n,c,info=''):
    T.append(c);print(('OK  ' if c else 'FAIL ')+n,info if not c else '',flush=True)
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            for vw,vh in [(915,412),(412,915)]:
                pg=await (await b.new_context(viewport={'width':vw,'height':vh},is_mobile=True,has_touch=True)).new_page()
                pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
                await pg.goto(URL);await pg.wait_for_timeout(2500)
                await pg.evaluate("()=>{window.__skw=1}");await pg.evaluate(SETUP,['mage','Sw'+str(random.randint(100,999)),75]);await pg.wait_for_timeout(2600)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};gmGod=true;const S=rnSt();S.sh=1000;const X=sgSt();X.i={};X.l={};X.i.echo=2;X.i.fire=1;X.i.leech=3;X.l[1]=['leech'];X.l[3]=['leech'];enterMap(4,{x:1600,y:1600})}")
                await pg.wait_for_timeout(1500)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
                C=lambda sel:pg.evaluate("(s)=>{const b=document.querySelector(s);if(!b)return 'nobtn:'+s;b.click();return 'ok'}",sel)
                tag=f'[{vw}x{vh}]'
                await pg.evaluate("()=>skwOpen('link',0)");await pg.wait_for_timeout(200)
                ck(tag+' window opens',await pg.evaluate("()=>!!ov.querySelector('.skw')&&!ov.hidden&&curMap===4"))
                ck(tag+' xp card hidden',await pg.evaluate("()=>!ov.querySelector('.pn .xpb')"))
                ck(tag+' no horizontal overflow',await pg.evaluate("()=>{const w=ov.querySelector('.skw');return w.scrollWidth<=w.clientWidth+2}"),await pg.evaluate("()=>{const w=ov.querySelector('.skw');return [w.scrollWidth,w.clientWidth]}"))
                await C('[data-skws="0"]');await pg.wait_for_timeout(100)
                ck(tag+' sheet opens',await pg.evaluate("()=>!!document.querySelector('.skwsh')"))
                await C('[data-skwp="echo"]');await C('[data-skwq="put"]');await pg.wait_for_timeout(100)
                ck(tag+' put echo outside camp',await pg.evaluate("()=>JSON.stringify(sgSt().l[0])==='[\"echo\"]'&&!document.querySelector('.skwsh')"),await pg.evaluate("()=>JSON.stringify(sgSt().l[0])"))
                ck(tag+' mana chip shows link cost',await pg.evaluate("()=>{const m=skwStat(0,sgLinks(0)),b=skwStat(0,[]);return m.mp>b.mp&&ov.querySelector('.skwh').textContent.indexOf(String(m.mp))>=0}"))
                await C('[data-skws="1"]');await C('[data-skwp="leech"]')
                ck(tag+' leech blocked (2 skills) with reason',await pg.evaluate("()=>{const b=document.querySelector('[data-skwq=put]');return b.disabled&&document.querySelector('.skwsh .kwy').textContent.indexOf('ครบ 2')>=0}"))
                await C('[data-skwq="put"]');ck(tag+' blocked put does nothing',await pg.evaluate("()=>sgSt().l[0].length===1"))
                await C('[data-skwp="echo"]');ck(tag+' dup in same skill blocked',await pg.evaluate("()=>document.querySelector('[data-skwq=put]').disabled"))
                await C('[data-skwp="fire"]');await C('[data-skwq="put"]')
                ck(tag+' put fire slot2',await pg.evaluate("()=>JSON.stringify(sgSt().l[0])==='[\"echo\",\"fire\"]'"))
                await C('[data-skws="0"]');await C('[data-skwq="del"]')
                ck(tag+' remove echo',await pg.evaluate("()=>JSON.stringify(sgSt().l[0])==='[\"fire\"]'"))
                await C('[data-skws="0"]');await C('[data-skwc="rare"]');ck(tag+' filter rare',await pg.evaluate("()=>[...document.querySelectorAll('[data-skwp]')].every(b=>SGD[b.dataset.skwp][3]==='rare')"))
                await C('[data-skwp="nova"]');sh0=await pg.evaluate("()=>rnSt().sh");await C('[data-skwq="mk"]')
                ck(tag+' craft rare in sheet',await pg.evaluate("(a)=>sgSt().i.nova===1&&rnSt().sh===a-SGSR",sh0))
                await C('[data-skwx="1"]');await C('[data-skwss="0"]')
                ck(tag+' save set 1',await pg.evaluate("()=>!!sgSt().sv[0]&&sgSt().cur===0"))
                await pg.evaluate("()=>{sgSt().l[0]=[]}");await C('[data-skwsl="0"]')
                ck(tag+' load set 1',await pg.evaluate("()=>JSON.stringify(sgSt().l[0])==='[\"fire\"]'"))
                # main runes
                await C('[data-skwt="rune"]');id=await pg.evaluate("()=>RUNES.mage[0].a[0]")
                await C('[data-skwrc="%s"]'%id);ck(tag+' create main rune',await pg.evaluate("(i)=>rnLv(i)===1",id))
                await C('[data-skwre="0:a"]');ck(tag+' equip main rune outside camp',await pg.evaluate("()=>rnOf(0)==='a'"))
                await C('[data-skwru="%s"]'%id);ck(tag+' upgrade main rune',await pg.evaluate("(i)=>rnLv(i)===2",id))
                await C('[data-skwre="0:"]');ck(tag+' unequip',await pg.evaluate("()=>rnOf(0)===''"))
                # rail select skill
                await C('[data-skwk="1"]');ck(tag+' select skill 2',await pg.evaluate("()=>SKW6.k===1&&ov.querySelector('.skwh').textContent.indexOf(skName(1))>=0"))
                await C('[data-skwk="2"]');await C('[data-skwt="link"]');ck(tag+' ult link message',await pg.evaluate("()=>ov.querySelector('.skwem')&&ov.querySelector('.skwem').textContent.indexOf('1–4')>=0"))
                # tree
                await C('[data-skwt="tree"]');p0=await pg.evaluate("()=>pts()")
                await C('.skwnd [data-n]');ck(tag+' alloc via detail bar',await pg.evaluate("(a)=>pts()===a-1&&!!ov.querySelector('.skw')",p0))
                await C('[data-skwn="i1"]');ck(tag+' select node',await pg.evaluate("()=>SKW6.nd==='i1'&&ov.querySelector('.skwnd').textContent.indexOf('เยือกแรง')>=0"))
                await C('[data-skauto]');await pg.wait_for_timeout(100);pa=await pg.evaluate("()=>[pts(),!!ov.querySelector('.skw')]");ck(tag+' auto alloc keeps new window',pa[0]<p0-1 and pa[1],pa)
                await C('#trreset');await pg.wait_for_timeout(100);ck(tag+' reset keeps new window',await pg.evaluate("()=>pts()>0&&!!ov.querySelector('.skw')"))
                await C('[data-skwt="pool"]');ck(tag+' pool tab',await pg.evaluate("()=>!!ov.querySelector('.skw .q8p')"))
                # old view toggle and back
                await C('[data-skwold]');ck(tag+' old view',await pg.evaluate("()=>!ov.querySelector('.skw')&&!!ov.querySelector('.skwnew')"))
                await C('.skwnew');ck(tag+' back to new',await pg.evaluate("()=>!!ov.querySelector('.skw')"))
                # status tab still works
                await pg.evaluate("()=>{charTab='ab';treeUI()}");ck(tag+' status tab unaffected',await pg.evaluate("()=>!ov.querySelector('.skw')&&!!ov.querySelector('.ab2')"))
                # old iris panel has shortcut
                await pg.evaluate("()=>{SGTAB='';runeUI()}");ck(tag+' iris shortcut',await pg.evaluate("()=>!!ov.querySelector('[data-pn=rune] .skwnew')"))
                await C('[data-sgtab="sup"]');ck(tag+' iris link shortcut',await pg.evaluate("()=>!!ov.querySelector('[data-pn=rune] .skwnew')"))
                # arena blocks edits
                await pg.evaluate("()=>{window.__so=sgOff;sgOff=()=>true;skwOpen('link',0)}");await C('[data-skws="1"]');await C('[data-skwp="echo"]')
                ck(tag+' arena: put disabled',await pg.evaluate("()=>{const b=document.querySelector('[data-skwq=put]');return !!b&&b.disabled}"))
                await pg.evaluate("()=>{sgOff=window.__so}")
                await pg.close()
    finally:p.terminate()
    print('PAGEERR',errs[:5]);print('SUMMARY',sum(T),'/',len(T),'ok')
asyncio.run(main())
