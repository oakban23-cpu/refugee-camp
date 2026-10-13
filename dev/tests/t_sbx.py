import asyncio, sys, random, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image, ImageDraw
OUT=sys.argv[1]
FD='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/fx/'
CLOCK="""()=>{if(window.__ck)return;const o=window.requestAnimationFrame.bind(window);window.__ck={t:performance.now(),run:0};const ck=window.__ck;
 performance.now=()=>ck.t;window.requestAnimationFrame=cb=>o(()=>{cb(ck.t)});(function tk(){if(ck.run>0){ck.t+=16.667;ck.run--}o(tk)})()}"""
P0="me.x=CX;me.y=CY+90;bossCd=1e9;fillT=1e9;sp=1e9;mons=mons.filter(m=>m.wb);fxs=[];teles=[];parts=[];banner=null;dn=[];"
S=[
 ('eye',"enterMap(13,{x:CX,y:CY});MAPS[curMap].eye=1;"+P0+"EYEG={t:2.8,d:2.8,pts:[[CX-150,CY+60],[CX+160,CY-40]],bx:CX,by:CY-60};",[60,140,170],"EYEG&&(EYEG.t-=0)"),
 ('eyeflash',"enterMap(13,{x:CX,y:CY});MAPS[curMap].eye=1;"+P0+"EYEG={t:-.01,d:2.8,pts:[[CX-150,CY+60],[CX+160,CY-40]],bx:CX,by:CY-60,flash:1};",[3,10,22],""),
 ('qsil',"enterMap(13,{x:CX,y:CY});MAPS[curMap].queen=1;"+P0+"handleFx({k:'qsil',x:CX,y:CY-40,dur:2.8,by:uid});",[30,90,150],""),
 ('pull',"enterMap(13,{x:CX,y:CY});"+P0+"handleFx({k:'pull',x:CX+40,y:CY-20,r:460,dur:1.8,by:uid});",[15,50,90],""),
 ('vortex',"enterMap(6,{x:CX,y:CY});"+P0+"handleFx({k:'vortex',x:CX+60,y:CY+60,r:120,by:uid});",[8,20,40],""),
 ('tent',"enterMap(6,{x:CX,y:CY});"+P0+"handleFx({k:'tent',x:CX+50,y:CY+80,r:52,by:uid});",[8,22,40],""),
 ('dmark',"enterMap(6,{x:CX,y:CY});"+P0+"handleFx({k:'dmark',x:me.x,y:me.y,r:120,u:uid,dur:4,by:uid});",[30,120,200],""),
 ('nlane',"enterMap(22,{x:CX,y:CY});"+P0+"handleFx({k:'nlane',x:CX,y:CY,A:[0.3,1.4,2.6],dur:1.6,by:uid});",[30,80,100],""),
 ('nspin',"enterMap(22,{x:CX,y:CY});"+P0+"handleFx({k:'nspin',x:CX,y:CY,a0:0,dir:1,dur:5,L:400,by:uid});",[30,90,150],""),
 ('nweb',"enterMap(22,{x:CX,y:CY});"+P0+"handleFx({k:'nweb',x:me.x+40,y:me.y,r:72,dur:2,s:1,by:uid});",[30,90,118],""),
 ('tbolt',"enterMap(18,{x:CX,y:CY});"+P0+"handleFx({k:'tbolt',x:me.x+50,y:me.y,r:120,by:uid});",[3,10,25],""),
 ('tgust',"enterMap(18,{x:CX,y:CY});"+P0+"handleFx({k:'tgust',x:me.x+60,y:me.y-40,r:280,by:uid});",[5,15,35],""),
 ('ttor',"enterMap(18,{x:CX,y:CY});"+P0+"handleFx({k:'ttor',x:me.x-150,y:me.y,x2:me.x+250,y2:me.y,dur:5,by:uid});",[30,90,150],""),
 ('teye',"enterMap(18,{x:CX,y:CY});"+P0+"handleFx({k:'teye',x:me.x,y:me.y,R:120,ph:0,sp:.4,dur:6,by:uid});",[30,90,150],""),
('wbmet',"dgMap(80001);enterMap(80001,{x:CX,y:CY+200});"+P0+"me.y=CY+200;WBF.length=0;for(let i=0;i<3;i++)WBF.push({k:'met',x:me.x-80+i*80,y:me.y-30+i*20,r:56,t:.25+i*.15,d:1.3,ph:0});",[10,25,50],""),
 ('wbfis',"dgMap(80001);enterMap(80001,{x:CX,y:CY+200});"+P0+"me.y=CY+200;WBF.length=0;WBF.push({k:'fis',s:0,x1:me.x-160,y1:me.y-40,x2:me.x+200,y2:me.y-40,w:58,t:.3,d:1.05,ph:0});",[10,25,45],""),
 ('wbcone',"dgMap(80001);enterMap(80001,{x:CX,y:CY+200});"+P0+"me.y=CY+200;WBF.length=0;WBF.push({k:'cone',x:me.x-120,y:me.y-60,a:.4,h:.4,L:400,t:.3,d:1.5,ph:0,tk:0});",[10,30,60],""),
]
async def step(A,n):
    await A.ev(f"()=>{{__ck.run={n}}}")
    for _ in range(80):
        await A.wait(40)
        if await A.ev("()=>__ck.run")==0: break
    await A.ev('()=>{banner=null;dn=[]}');await A.wait(80)
async def main():
    sel=sys.argv[2].split(',') if len(sys.argv)>2 else None
    p = start_server();rows=[]
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Sx'+str(random.randint(1000,9999)), 'melee', 90)
        await A.ev("()=>{gmGod=true;LOWQ=false;window.DNH=13}");await A.wait(800)
        await A.ev(CLOCK);await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        for nm,setup,frames,_ in S:
            if sel and nm not in sel: continue
            await A.ev("()=>{"+setup.split(P0)[0]+"}");await A.ev("()=>{__ck.run=20}");await A.wait(700)
            try: await A.ev("()=>{"+setup+"}")
            except Exception as e: print(nm,'ERR',str(e)[:200]);continue
            row=[];done=0
            for fr in frames:
                await step(A,max(1,fr-done));done=fr
                fn=FD+f'{OUT}_{nm}_{fr}.png';await A.pg.screenshot(path=fn,clip={'x':0,'y':180,'width':390,'height':520});row.append(fn)
            rows.append((nm,row))
        print([e for e in A.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
    W,H=234,312;Sh=Image.new('RGB',(W*3+80,H*len(rows)),'#111');d=ImageDraw.Draw(Sh)
    for i,(nm,row) in enumerate(rows):
        d.text((6,i*H+H//2),nm,fill='white')
        for j,fn in enumerate(row):Sh.paste(Image.open(fn).resize((W,H)),(80+j*W,i*H))
    Sh.save(FD+f'ssheet_{OUT}.jpg',quality=85);print('ok',len(rows))
asyncio.run(main())
