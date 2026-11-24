import asyncio, sys, os, io
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image,ImageDraw,ImageFont
OUT=sys.argv[1];KS=sys.argv[2].split(',');FR=[float(x) for x in (sys.argv[3] if len(sys.argv)>3 else '.12,.3,.55,.85').split(',')]
F=ImageFont.truetype('/usr/share/fonts/opentype/tlwg/Loma-Bold.otf',22)
CW,CH=340,250
SL=float(os.environ.get('SLOW','3'))
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Cap',60]);await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};setGQ('high');LITEQ=false;banner=null;try{TIPS.t=1e15}catch(e){};document.querySelectorAll('#ov,#tipc,#stq').forEach(e=>e.style.visibility='hidden')}")
            await pg.wait_for_timeout(1200)
            for k in KS:
                rows=[]
                for on in (0,1):
                    D=await pg.evaluate("(k)=>(FXD[k]||{u3hv:2.6,u3bh:2.6,u3sw:1.8,u3st:3,u3dk:3.4,u3nm:2.2,u3yl:3,u3bd:3.4,u3ft:3}[k]||1)",k)
                    await pg.evaluate("(on)=>{VFS.on=on;VFS.s.length=0;P9.p.length=0;P9.d.length=0;P9.b.length=0;fxs.length=0;try{GX.sw.length=0;GX.dec.length=0}catch(e){}}",on)
                    await pg.evaluate("([k,SLOW])=>handleFx({k,by:uid,u:uid,x:me.x+(['beam','torn','dash','quake','rncomet','q8lance','q8snipe'].includes(k)?-140:0),y:me.y+10,r:['holy','u3hv','sanct','u3sw','u3bh','u3st','u3dk','fort'].includes(k)?110:85,a:0,len:300,s:1,d:SLOW*(FXD[k]||1),pts:[[me.x,me.y],[me.x+70,me.y-10],[me.x+140,me.y+20]],sx:me.x-120,sy:me.y})",[k,SL])
                    import time;t0=time.time();row=[]
                    for fr in FR:
                        dt=fr*D*SL-(time.time()-t0)
                        if dt>0:await pg.wait_for_timeout(int(dt*1000))
                        s=Image.open(io.BytesIO(await pg.screenshot()));W,H=s.size;c=s.crop((W//2-CW,H//2-CH-40,W//2+CW,H//2+CH-40)).resize((CW,CH))
                        row.append(c)
                    rows.append(row)
                im=Image.new('RGB',(len(FR)*CW+10*len(FR),2*CH+60),(18,14,22));d=ImageDraw.Draw(im)
                for j,row in enumerate(rows):
                    for i,c in enumerate(row):im.paste(c,(i*(CW+10),40+j*(CH+10)))
                d.text((8,6),f'{k}  บน=เดิม ล่าง=ภาพวาด  (D={D}s เฟรม {FR})',font=F,fill=(255,220,150))
                im.save(f'{OUT}/cmp_{k}.jpg',quality=82)
    finally:p.terminate()
asyncio.run(main())
