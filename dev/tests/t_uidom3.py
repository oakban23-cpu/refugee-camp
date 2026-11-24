import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;try{TIPS.t=1e15}catch(e){}}"
Q="""()=>{const L=[];for(const e of document.querySelectorAll('body *')){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)continue;if(e.closest('#ov'))continue;const b=e.getBoundingClientRect();if(b.width<18||b.height<18||b.width>600)continue;
 const p=e.parentElement&&e.parentElement.getBoundingClientRect();if(e.tagName==='IMG'||e.tagName==='I'||e.tagName==='SPAN'||e.tagName==='B')continue;
 L.push((e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\\s+/).join('.'):''))+' @'+Math.round(b.x)+','+Math.round(b.y)+' '+Math.round(b.width)+'x'+Math.round(b.height)+' r='+cs.borderTopLeftRadius+' «'+(e.textContent||'').trim().slice(0,14)+'»')}return L.slice(0,120).join('\\n')}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['melee','Udm',60]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
            await pg.evaluate("()=>{ov.hidden=true;stSay([['npc_old','ทดสอบกล่องบทพูด ยาวพอสมควร']])}");await pg.wait_for_timeout(1500)
            print(await pg.evaluate(Q.replace("if(e.closest('#ov'))continue;","")))
            print('== close',await pg.evaluate("()=>[...document.querySelectorAll('#ov .x,#ov .xb,#ov [class*=close],#ovx')].map(e=>e.tagName+'.'+e.className+'#'+e.id+' '+JSON.stringify(e.getBoundingClientRect())+' par='+e.parentElement.className)"))
    finally:p.terminate()
asyncio.run(main())
