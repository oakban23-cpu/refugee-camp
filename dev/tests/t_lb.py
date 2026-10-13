import asyncio,sys,os,json,shutil
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import h
from h import *
async def main():
    # seed old duplicated data
    shutil.rmtree(h.DD,ignore_errors=True);os.makedirs(h.DD)
    old={'wb':[{'n':'Kira','c':'assn','l':75,'t':38332409,'p':1,'u':'a1'},{'n':'Kira','c':'assn','l':75,'t':38172174,'p':1,'u':'a2'},{'n':'Kira','c':'assn','l':75,'t':28397748,'p':1,'u':'a3'},{'n':'ZMIW','c':'mage','l':73,'t':3250211,'p':1,'u':'b'},{'n':'InwZa007','c':'archer','l':67,'t':1125339,'p':1,'u':'c1'},{'n':'InwZa007','c':'archer','l':66,'t':1001956,'p':1,'u':'c2'}],
         'm1':[{'n':'A','c':'melee','l':5,'t':30,'p':1,'u':'x'},{'n':'A','c':'melee','l':5,'t':20,'p':1,'u':'y'}]}
    json.dump(old,open(os.path.join(h.DD,'leaderboard.json'),'w'))
    import subprocess
    env=dict(os.environ,PORT=str(h.PORT),DATA_DIR=h.DD)
    p=subprocess.Popen(['node','server.js'],cwd=h.SRV,env=env,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
    import time,urllib.request
    for _ in range(60):
        time.sleep(.3)
        try:urllib.request.urlopen(URL+'health',timeout=1);break
        except Exception:pass
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Kira','assn');B=await new_client(b,'Kira','assn')
        # new submissions from different sessions of same character
        for c,t in ((A,40000000),(B,39000000)):
            await c.ev(f"()=>emitM('lbs',{{k:'wb',n:'Kira',cls:'assn',lv:75,t:{t},pc:1}})")
        await A.wait(800)
        await A.ev("()=>emitM('lbq',{})");await A.wait(800)
        print(json.dumps(await A.ev("()=>lbData.wb.map(r=>r[0]+':'+r[3])"),ensure_ascii=False))
        print(json.dumps(await A.ev("()=>lbData.m1"),ensure_ascii=False))
        await b.close()
    p.terminate();out=p.stdout.read().decode();print([l for l in out.splitlines() if 'อันดับ' in l])
asyncio.run(main())
