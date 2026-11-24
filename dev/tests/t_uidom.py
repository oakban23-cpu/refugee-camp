import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;try{TIPS.t=1e15}catch(e){}}"
DUMP="""(sel)=>{const r=document.querySelector(sel);if(!r)return 'none';const out=[];const walk=(e,d)=>{if(d>5||out.length>140)return;const cs=getComputedStyle(e);if(cs.display==='none')return;const b=e.getBoundingClientRect();
 out.push('  '.repeat(d)+e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\\s+/).join('.'):'')+' '+Math.round(b.width)+'x'+Math.round(b.height)+' bg='+cs.backgroundColor+' bd='+cs.borderTopWidth+' '+cs.borderTopColor+' r='+cs.borderTopLeftRadius+(e.children.length?'':' «'+(e.textContent||'').trim().slice(0,18)+'»'));for(const c of e.children)walk(c,d+1)};walk(r,0);return out.join('\\n')}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['melee','Udm',60]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
            await pg.evaluate("()=>{ov.hidden=false;shopUI()}");await pg.wait_for_timeout(800)
            print('=== SHOP');print(await pg.evaluate(DUMP,'#ov'))
            await pg.evaluate("()=>{ov.hidden=true}");await pg.wait_for_timeout(500)
            print('=== HUD ids');print(await pg.evaluate("""()=>[...document.querySelectorAll('#app > *, #hud *')].filter(e=>{const b=e.getBoundingClientRect();return b.width>20&&b.height>8&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'}).slice(0,90).map(e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\\s+/).join('.'):'')+' '+Math.round(e.getBoundingClientRect().x)+','+Math.round(e.getBoundingClientRect().y)+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)).join('\\n')"""))
    finally:p.terminate()
asyncio.run(main())
