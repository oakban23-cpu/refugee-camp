import asyncio,os,json,time,urllib.request
os.environ['ADMIN_KEY']='k123'
from h import *
def api(p,b,h=None):
    r=urllib.request.Request(URL+p,data=json.dumps(b).encode(),headers={'Content-Type':'application/json',**(h or {})},method='POST')
    try: return json.load(urllib.request.urlopen(r))
    except urllib.error.HTTPError as e: return {'status':e.code,**json.load(e)}
async def main():
    p=start_server()
    try:
        api('api/acc/register',{'a':'victim','pin':'1234'})
        res=[]
        for i in range(12):
            res.append(api('api/acc/login',{'a':'victim','pin':'%04d'%(i+5000)},{'x-forwarded-for':'10.0.0.%d'%i}));time.sleep(.15)
        print('per-name lock',[r.get('err') for r in res][-3:])
        print('right pin while locked',api('api/acc/login',{'a':'victim','pin':'1234'},{'x-forwarded-for':'9.9.9.9'}))
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            A=await new_client(b,'AAA');B=await new_client(b,'BBB')
            await A.wait(1500)
            print('online',A.online,B.online)
            # gmmode without key
            await A.ev("()=>{document.getElementById('cin').value='/gmmode on';sendChat()}");await A.wait(300)
            print('gm no key',await A.ev("()=>gmOk"))
            await A.ev("()=>{document.getElementById('cin').value='/gmmode on wrong';sendChat()}");await A.wait(800)
            print('gm wrong',await A.ev("()=>[gmOk,chatLog.slice(-1)[0].t]"))
            await A.ev("()=>{document.getElementById('cin').value='/gmmode on k123';sendChat()}");await A.wait(800)
            print('gm right',await A.ev("()=>gmOk"))
            # chat spoof u
            buid=await B.ev("()=>uid")
            await A.ev("(bu)=>room.emit('chat',{u:bu,n:'<b>x</b>',t:'hello'})",buid);await A.wait(600)
            print('B got',await B.ev("()=>{const l=chatLog.slice(-1)[0];return [l.n,l.t,Object.keys(says)]}"),'A uid',await A.ev("()=>uid"))
            # chat flood
            await A.ev("()=>{for(let i=0;i<20;i++)room.emit('chat',{n:'A',t:'spam'+i})}");await A.wait(800)
            print('B spam count',await B.ev("()=>chatLog.filter(l=>/^spam/.test(l.t)).length"))
            print('errs',A.errs[:3],B.errs[:3])
    finally: p.terminate()
asyncio.run(main())
