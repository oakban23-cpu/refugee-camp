import asyncio,json
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'M','melee',99)
        r=await A.ev("""()=>{const o=[];for(let i=1;i<=26;i++){const M=MAPS[i];if(!M)continue;const into=[];for(let j=1;j<=26;j++){const N=MAPS[j];if(!N||j===i)continue;N.gates.forEach(G=>{if(G.to===i&&!G.wb)into.push([j,G.req])})}
          const ml=SHADEM(i)?[SL0[i],SL0[i]+SLD[i]]:ROOTM(i)?[RL0[i],RL0[i]+RLD[i]]:WESTM(i)?[WL0[i],WL0[i]+WLD[i]]:null;
          o.push({i,n:M.n,into,boss:M.boss&&M.boss.x>0?M.boss.n:'',ml,hub:!!M.hub})}return o}""")
        for x in r: print(json.dumps(x,ensure_ascii=False))
    finally: p.terminate()
asyncio.run(main())
