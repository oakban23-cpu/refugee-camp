import asyncio,random,json
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'melee',99)
        await A.ev("()=>{gmGod=true;me.sty={s:147,n:0,a:1,e:1,e4:2,p6h:2};ov.hidden=true;enterMap(32,{x:2120,y:2660})}");await A.wait(3000)
        r=await A.ev("""()=>JSON.stringify({ar:[740,770,784,800,830].map(y=>[1584,1600,1616,1632].map(x=>arIn(x,y,6)?1:0).join('')),tr:trees.filter(t=>t.r>0&&!t.nc&&Math.abs(t.x-1610)<90&&Math.abs(t.y-780)<90).map(t=>[t.x|0,t.y|0,t.r,t.k||'',t.inv?1:0])})""")
        print(r)
        # ภาพแผนที่ grid
        img=await A.ev("""()=>{const G=aqGrid();let s='';for(let j=0;j<100;j+=2){for(let i=0;i<100;i++)s+=G[j*100+i]?'#':'.';s+='\\n'}return s}""")
        open('../aqgrid32.txt','w').write(img)
        await b.close()
    p.terminate()
asyncio.run(main())
