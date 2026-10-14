import asyncio,random,json
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'melee',99)
        await A.ev("()=>{gmGod=true;me.sty={s:148,n:0,a:1,e:1,e4:2,p6h:2};ov.hidden=true;enterMap(32,{x:1700,y:1600})}");await A.wait(3000)
        r=await A.ev("""()=>{me.x=1700;me.y=1600;const G=aqGrid();let free=0;for(const v of G)if(!v)free++;const P=aqPath(me.x,me.y,2120,2786);
          // flood from start
          const s=aqNearFree(G,(me.x/32)|0,(me.y/32)|0);const seen=new Uint8Array(10000);const q=[s[1]*100+s[0]];seen[q[0]]=1;while(q.length){const k=q.pop(),i=k%100,j=(k/100)|0;for(const[di,dj]of[[1,0],[-1,0],[0,1],[0,-1]]){const ni=i+di,nj=j+dj;if(aqFree(G,ni,nj)&&!seen[nj*100+ni]){seen[nj*100+ni]=1;q.push(nj*100+ni)}}}
          let reach=0;for(const v of seen)if(v)reach++;const e=aqNearFree(G,66,86);
          return JSON.stringify({free,reach,start:s,endCell:e,endReach:e?seen[e[1]*100+e[0]]:null,arInGate:arIn(2120,2786,6),P:P&&P.slice(0,12),rev:arRev(),trees:trees.length})}""")
        print(r)
        # ภาพแผนที่ grid
        img=await A.ev("""()=>{const G=aqGrid();let s='';for(let j=0;j<100;j+=2){for(let i=0;i<100;i++)s+=G[j*100+i]?'#':'.';s+='\\n'}return s}""")
        open('../aqgrid32.txt','w').write(img)
        await b.close()
    p.terminate()
asyncio.run(main())
