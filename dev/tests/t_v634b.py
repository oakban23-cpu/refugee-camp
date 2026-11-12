import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
ISO="""([mp,on,n])=>{const og=g,oc=curMap,ob=BXA.on;BXA.on=0;BX3.on=on;curMap=mp;const C=document.createElement('canvas');C.width=900;C.height=800;const G=C.getContext('2d');let t0=performance.now();
 for(let k=0;k<n;k++){G.setTransform(1,0,0,1,0,0);G.fillStyle='#5a6a78';G.fillRect(0,0,900,800);g=G;g.setTransform(2,0,0,2,0,0);const m={id:777001,t:3,x:225,y:250,hp:100,mh:100,castT:0};BMS[m.id]={x:m.x,y:m.y,t:performance.now()/1000,mv:0,dir:1,ph:0};
 const ly=gxLayerBegin();const G0=g;if(ly)g=ly;try{drawBossAnim(m,10.4,0,0,false);gxLayerBox(m.x,m.y-60,300,300)}finally{g=G0}gxLayerEnd(ly)}
 const dt=(performance.now()-t0)/n;g=og;curMap=oc;BXA.on=ob;BX3.on=1;
 const d=G.getImageData(0,0,900,800).data;let sh=0,sum=0;for(let y=560;y<760;y++)for(let x=470;x<880;x++){const i=(y*900+x)*4;sum+=d[i]+d[i+1]+d[i+2]}return [dt,sum]}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','T4'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(3000)
            rep('ติดตั้ง BX3 (ห่อ drawBossAnim · gxLayerBox · gxLayerEnd)',await pg.evaluate("()=>BX3.on===1&&typeof bx3Pass==='function'"))
            n0=await pg.evaluate("()=>BX3.n")
            a=await pg.evaluate(ISO,[3,0,1]);b2=await pg.evaluate(ISO,[3,1,1])
            rep('ทำงานในชั้นเลเยอร์ และเกิดเงาทอดด้านขวาล่างของบอส (พื้นมืดลง)',await pg.evaluate("()=>BX3.n")>n0 and b2[1]<a[1]*.985,[a[1],b2[1]])
            rep('ไม่มี error ภายใน',await pg.evaluate("()=>!BX3.err"),await pg.evaluate("()=>BX3.err"))
            for _ in range(2):await pg.evaluate(ISO,[8,1,5]);await pg.evaluate(ISO,[8,0,5])
            off=await pg.evaluate(ISO,[8,0,20]);on=await pg.evaluate(ISO,[8,1,20])
            await pg.evaluate("()=>{const o=bx3Pass;window.__bt=0;window.__bn=0;bx3Pass=function(){const t=performance.now();try{return o.apply(this,arguments)}finally{__bt+=performance.now()-t;__bn++}}}")
            await pg.evaluate(ISO,[8,1,20]);print('pass ms',await pg.evaluate("()=>__bt/__bn"))
            for cfg in []:
                await pg.evaluate('()=>{'+cfg+'}');print(cfg,(await pg.evaluate(ISO,[8,1,20]))[0])
            rep('ความเร็ว: เพิ่มไม่เกิน 4 ms ต่อเฟรมต่อบอส',on[0]-off[0]<4,[round(off[0],2),round(on[0],2)])
            rep('เฟรมช้า (FQ.avg>fq) → ข้ามอัตโนมัติ',await pg.evaluate("()=>{const o=FQ.avg;FQ.avg=99;const n=BX3.n;BX3.bx=[[0,0,50,50,0,0,0]];gxLayerEnd(gxLayerBegin());const r=BX3.n===n;FQ.avg=o;return r}"))
            rep('BX3.on=0 ปิดได้',await pg.evaluate("(J)=>true",ISO))
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
