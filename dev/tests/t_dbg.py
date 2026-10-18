import asyncio,sys
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        N=await new_client(b,'Newb','archer',30);await N.ev(CLR);await N.ev("()=>{enterMap(2,{x:1600,y:1600})}")
        B2=await new_client(b,'Buddy','mage',30);await B2.ev(CLR);await B2.ev("()=>{enterMap(2,{x:1900,y:1700})}");await N.wait(3000)
        tp=await N.ev("()=>{const tb=$('topb');const d=document.createElement('div');d.id='u54tq';d.style.cssText='width:60px;height:60px';tb.appendChild(d);const rc=d.getBoundingClientRect(),cv=document.querySelector('canvas').getBoundingClientRect(),z=ZM.z;return[(rc.left+30-cv.left+CAMF.x-SW0/2)/z,(rc.top+60-cv.top+CAMF.y-H/2)/z]}")
        await B2.ev("([x,y])=>{me.x=x;me.y=y}",tp);await N.wait(1500)
        r=await N.ev("()=>{const tb=$('topb'),cv=document.querySelector('canvas'),cr=cv.getBoundingClientRect(),z=ZM.z;const S=[[me.x,me.y]];for(const o of Object.values(others))if(o&&typeof o.x==='number')S.push([o.x,o.y]);const P=S.map(([x,y])=>[cr.left+(x*z-CAMF.x+SW0/2),cr.top+(y*z-CAMF.y+H/2)]);const d=$('u54tq'),rc=d.getBoundingClientRect();return{S,P,rc:[rc.left,rc.top,rc.right,rc.bottom],kids:[...tb.children].map(e=>e.tagName+'#'+e.id+':'+e.className),cls:d.className}}")
        print(tp,r)
    finally: p.terminate()
asyncio.run(main())
