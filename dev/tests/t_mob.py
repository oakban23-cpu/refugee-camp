import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
import h as H
VPS=[(320,568,'se1'),(375,667,'se2'),(360,640,'and'),(412,915,'big'),(768,1024,'tab')]
async def nc(b,name,cls,lv,w,hh):
    ctx = await b.new_context(viewport={'width': w, 'height': hh}, has_touch=True, is_mobile=True)
    pg = await ctx.new_page(); c = Client(ctx, pg, name)
    pg.on('pageerror', lambda e: c.errs.append((e.stack or str(e))[:400]))
    await pg.goto(H.URL); await pg.wait_for_timeout(2000)
    info = await pg.evaluate(H.SETUP, [cls, name, lv]); await pg.wait_for_timeout(2000)
    c.uid = info['uid']; return c
OVL="""()=>{const ids=['s0','s1','s2','s3','s4','s5','tg','pm','ph','dgx','atb','ahb','mtb','stq','rbq','bfb'];const R={};ids.forEach(i=>{const e=$(i);if(!e||e.hidden||e.offsetParent===null)return;const r=e.getBoundingClientRect();if(r.width<2)return;R[i]=[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]});
 const out=[],W=innerWidth,Hh=innerHeight;const k=Object.keys(R);for(let a=0;a<k.length;a++){const A=R[k[a]];if(A[0]<-1||A[1]<-1||A[2]>W+1||A[3]>Hh+1)out.push('offscreen:'+k[a]);for(let b=a+1;b<k.length;b++){const B=R[k[b]];const ox=Math.min(A[2],B[2])-Math.max(A[0],B[0]),oy=Math.min(A[3],B[3])-Math.max(A[1],B[1]);if(ox>4&&oy>4)out.push(k[a]+'x'+k[b]+':'+ox+'x'+oy)}}return out}"""
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for w,hh,tag in VPS:
            for st in ['rb90','pre']:
                A = await nc(b,'M'+str(random.randint(1000,9999)),'mage',90 if st=='rb90' else 97,w,hh)
                if st=='rb90':await A.ev("()=>{me.rb=1;me.rbC2={br:1,brU:{1:1,2:1}};me.cls2=1;me.brU={1:1,2:1};me.br=1;applyBr();AUTO.on=0;$('atb').hidden=false;$('ahb').hidden=false}")
                else:await A.ev("()=>{me.cls2=1;me.brU={1:1};me.br=1;applyBr();$('atb').hidden=false;$('ahb').hidden=false}")
                await A.wait(1200)
                if st=='rb90':await A.ev("()=>u3Toast({nm:'ทดสอบชื่อยาวมากๆๆ',n:'สิ้นสุดกาลอวกาศ',c3:'จ้าวแห่งกาลอวกาศ'})")
                await A.wait(400)
                o=await A.ev(OVL)
                print(tag,st,o,flush=True)
                await A.pg.screenshot(path=f'../fx/mob_{tag}_{st}.png')
                if A.errs:print(A.errs[:2])
                await A.ctx.close()
        await b.close()
    p.terminate()
if __name__=="__main__":asyncio.run(main())
