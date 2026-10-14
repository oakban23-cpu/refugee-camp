import asyncio,random,json
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'melee',99)
        await A.ev("()=>{gmGod=true;me.sty={s:147,n:0,a:1,e:1,e4:2,p6h:2};ov.hidden=true;enterMap(32,{x:2120,y:2660})}");await A.wait(3000)
        r=await A.ev("""()=>{me.x=2120;me.y=2660;const GT=MAPS[32].gates.map(g=>[g.to,g.x,g.y,gHid(g)]);const G=aqGrid();let free=0;for(const v of G)if(!v)free++;const gg=MAPS[32].gates.find(g=>g.to===30)||MAPS[32].gates[0];const P=aqPath(me.x,me.y,gg.x,gg.y+6);
          // flood from start
          const s=aqNearFree(G,(me.x/16)|0,(me.y/16)|0);const seen=new Uint8Array(40000);const q=[s[1]*200+s[0]];seen[q[0]]=1;while(q.length){const k=q.pop(),i=k%100,j=(k/100)|0;for(const[di,dj]of[[1,0],[-1,0],[0,1],[0,-1]]){const ni=i+di,nj=j+dj;if(aqFree(G,ni,nj)&&!seen[nj*200+ni]){seen[nj*200+ni]=1;q.push(nj*200+ni)}}}
          let reach=0;for(const v of seen)if(v)reach++;const e=aqNearFree(G,(gg.x/32)|0,((gg.y+6)/32)|0);
          return JSON.stringify({free,reach,start:s,endCell:e,endReach:e?seen[e[1]*200+e[0]]:null,GT,gate:[gg.x,gg.y],arInGate:arIn(gg.x,gg.y+6,6),hw2:trees.filter(t=>t.hw2).length,P:P&&P.slice(0,12),rev:arRev(),trees:trees.length})}""")
        print(r)
        # ภาพแผนที่ grid
        img=await A.ev("""()=>{const G=aqGrid();let s='';for(let j=0;j<100;j+=2){for(let i=0;i<100;i++)s+=G[j*100+i]?'#':'.';s+='\\n'}return s}""")
        open('../aqgrid32.txt','w').write(img)
        await b.close()
    p.terminate()
asyncio.run(main())
