import asyncio,sys,json,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        W_=int(os.environ.get('VW','390'));H_=int(os.environ.get('VH','844'));mob=os.environ.get('MOB','1')=='1'
        ctx=await b.new_context(viewport={'width':W_,'height':H_},is_mobile=mob,has_touch=mob,device_scale_factor=1)
        pg=await ctx.new_page()
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        await pg.evaluate(SETUP,['melee','ทดสอบ',70]);await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}")
        await pg.wait_for_timeout(1500)
        r=await pg.evaluate("""()=>{const out=[];const vis=e=>{for(let x=e;x&&x!==document.body;x=x.parentElement){const cs=getComputedStyle(x);if(cs.display==='none'||cs.visibility==='hidden'||x.hidden)return false}return true};
          for(const c of document.querySelectorAll('[id]')){const cs=getComputedStyle(c);if(cs.position!=='absolute'&&cs.position!=='fixed')continue;const r=c.getBoundingClientRect();if(r.width<4||r.height<4||!vis(c))continue;
            out.push([c.id,(c.parentElement&&c.parentElement.id)||'',cs.position,Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height),(c.textContent||'').trim().slice(0,18)])}return out}""")
        for x in r: print(x)
        await pg.screenshot(path=os.environ.get('OUT','dom2.png'))
    finally: p.terminate()
asyncio.run(main())
