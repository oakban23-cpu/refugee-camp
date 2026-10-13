import asyncio,random,sys
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in [int(x) for x in (sys.argv[1].split(',') if len(sys.argv)>1 else '1,3,6,11'.split(','))]:
            await A.ev(f"()=>{{gmGod=true;enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(800)
            # pick plateau; place outside opposite a stair-less angle and push in with keys
            r=await A.ev(f"""()=>new Promise(res=>{{const P=TERD[{mp}][0];const st=P[4]||[];let a=0,best=-1;for(let d=0;d<360;d+=15){{const m=Math.min(...st.map(s=>Math.min(Math.abs(s-d),360-Math.abs(s-d))));if(m>best){{best=m;a=d}}}}
              const rr=a*Math.PI/180;me.x=P[0]+Math.cos(rr)*(P[2]+90);me.y=P[1]+Math.sin(rr)*(P[2]+90);
              joy={{dx:-Math.cos(rr)*40,dy:-Math.sin(rr)*40}};const k='joy';
              setTimeout(()=>{{joy=null;const d=Math.hypot(me.x-P[0],me.y-P[1]);res([a,k,Math.round(d),P[2],terLv(me.x,me.y)])}},2500)}})""")
            print(mp,r)
        print(A.errs[1:4]);await b.close()
    p.terminate()
asyncio.run(main())
