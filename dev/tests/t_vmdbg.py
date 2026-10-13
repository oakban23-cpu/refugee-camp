import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Vd'+str(random.randint(1000,9999)), 'melee', 60)
        await A.wait(800)
        print(await A.ev("""()=>{const out=[];try{vmBuild()}catch(e){out.push('build '+e.message)}out.push(VM.k,VM.P.length,VM.D.length);try{vmGround()}catch(e){out.push('g '+e.message+' '+e.stack.slice(0,300))}try{vmAir(0);vmAir(1)}catch(e){out.push('a '+e.message)}return out}"""))
        await b.close()
    p.terminate()
asyncio.run(main())
