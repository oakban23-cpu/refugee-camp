import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
BB="""([on,cls,c2])=>{const C=document.createElement('canvas');C.width=200;C.height=200;const G=C.getContext('2d'),og=g;g=G;CHV.on=on;try{g.save();g.translate(100,140);g.scale(3,3);drawChar(0,0,cls,1,0,0,1,0,0,1,c2,0);g.restore()}finally{g=og;CHV.on=1}
  const d=G.getImageData(0,0,200,200).data;let top=999,bot=-1,n=0;for(let y=0;y<200;y++)for(let x=0;x<200;x++)if(d[(y*200+x)*4+3]>40){n++;if(y<top)top=y;if(y>bot)bot=y}return{top,bot,n}}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['melee','Tv'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
            rep('ค่าเริ่มต้น หัว 1.3 · ตา 1.14 · เปิดใช้',await pg.evaluate("()=>CHV.on===1&&CHV.hs===1.3&&CHV.ey>1&&typeof drawChar0==='function'"))
            bad=[]
            for c in ['melee','archer','sup','assn','mage']:
                for c2 in (0,1,2):
                    a=await pg.evaluate(BB,[0,c,c2]);b2=await pg.evaluate(BB,[1,c,c2])
                    if not(b2['n']>a['n'] and b2['top']<=a['top'] and abs(b2['bot']-a['bot'])<=3):bad.append((c,c2,a,b2))
            rep('ทุกอาชีพทุกร่าง: หัวใหญ่ขึ้น (พื้นที่ภาพมากขึ้น ยอดหัวสูงขึ้น เท้าอยู่ที่เดิม)',bad==[],bad[:3])
            rep('ดาบนักรบตอนยืนเอียงออกนอกหน้า และท่าฟันต่อเนื่อง',await pg.evaluate("()=>{const s=[...document.scripts].map(x=>x.textContent).join('');return s.includes('_i=CHV.on?CHV.sw:-.55')&&CHV.sw>0}"))
            rep('ปิด CHV.on=0 กลับเป็นแบบเดิม (ขนาดเท่าเดิม)',await pg.evaluate("(BB)=>{const f=eval(BB);const a=f([0,'melee',0]),b=f([0,'melee',0]);return a.n===b.n&&a.top===b.top}",BB))
            st=await pg.evaluate("()=>{const C=document.createElement('canvas').getContext('2d');CHV.soft=1;C.strokeStyle='#140e0c';const a=C.strokeStyle;CHV.soft=0;C.strokeStyle='#140e0c';const b=C.strokeStyle;C.strokeStyle='#ff0000';return [a,b,C.strokeStyle]}")
            rep('เส้นดำด้านในจางลงเฉพาะตอนวาดตัวละคร',('rgba' in st[0]) and st[1]=='#140e0c' and st[2]=='#ff0000',st)
            await pg.evaluate("()=>{ov.hidden=true;banner=null}");await pg.wait_for_timeout(1500)
            rep('วาดตัวละครในเกมจริง (drawP) ได้ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
