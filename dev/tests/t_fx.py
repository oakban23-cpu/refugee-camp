import asyncio, sys, random, json, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image, ImageDraw, ImageFont
OUT=sys.argv[1] if len(sys.argv)>1 else 'before'
FD='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/fx/'
# name, cls, fx object (x/y offsets relative to player as dx,dy), phases
E=[('whirl','melee',{'k':'whirl','r':85}),
   ('dash','melee',{'k':'dash','r':30,'a':0,'len':120}),
   ('quake','melee',{'k':'quake','r':60,'a':0,'len':230}),
   ('swipe','melee',{'k':'swipe','r':25,'a':0,'len':1}),
   ('arrows','archer',{'k':'arrows','r':90,'dx':110}),
   ('leap','archer',{'k':'leap','r':30}),
   ('beam','archer',{'k':'beam','r':40,'a':0,'len':380}),
   ('fire','mage',{'k':'fire','r':95,'dx':110}),
   ('frost','mage',{'k':'frost','r':150,'dur':3}),
   ('rune','mage',{'k':'rune','r':170,'dx':110}),
   ('heal','sup',{'k':'heal','r':170}),
   ('atk','sup',{'k':'atk','r':190}),
   ('holy','sup',{'k':'holy','r':230}),
   ('shadow','assn',{'k':'shadow','r':40}),
   ('fog','assn',{'k':'fog','r':100,'dur':5}),
]
E2=[('rage','melee',{'k':'rage','r':60}),('roar','melee',{'k':'roar','r':150}),('taunt','melee',{'k':'taunt','r':150,'dur':4}),('bloodline','melee',{'k':'bloodline','r':40,'a':0,'len':260}),
   ('bash','melee',{'k':'bash','r':150,'a':0,'len':2}),('fort','melee',{'k':'fort','r':150,'dur':6}),
   ('pin','archer',{'k':'pin','r':110,'dx':110,'dur':2,'sxr':0,'syr':-6}),('mtrap','archer',{'k':'mtrap','r':100,'dx':110}),('mtrapx','archer',{'k':'mtrapx','r':100,'dx':110,'dur':2.5}),('moon','archer',{'k':'moon','r':50}),
   ('torn','archer',{'k':'torn','r':70,'a':0,'dur':3,'dx':30}),('storm','archer',{'k':'storm','r':210,'dur':5,'uu':1}),
   ('chain','mage',{'k':'chain','r':40,'ptsr':[[0,-12],[80,-30],[130,20],[100,80],[40,110]]}),('rift','mage',{'k':'rift','r':120,'dx':110,'dur':3}),('riftx','mage',{'k':'riftx','r':120,'dx':110}),('tstop','mage',{'k':'tstop','r':180,'dx':80,'dur':2.4}),
   ('smite','sup',{'k':'smite','r':75,'dx':100}),('sanct','sup',{'k':'sanct','r':130,'dur':6,'v':10}),('dawn','sup',{'k':'dawn','r':260}),
   ('mark','assn',{'k':'mark','r':30,'dx':90}),('markx','assn',{'k':'markx','r':85,'dx':90}),('eclipse','assn',{'k':'eclipse','r':90,'dx':90})]
E3=[('bash','melee',{'k':'bash','r':150,'a':0,'len':6}),('fort','melee',{'k':'fort','r':150,'dur':6}),('fortw','melee',{'k':'fortw','r':75}),
   ('torn','archer',{'k':'torn','r':70,'a':0,'dur':3,'dx':30}),('storm','archer',{'k':'storm','r':210,'dur':5,'uu':1}),('zap','archer',{'k':'zap','r':34,'dx':90}),
   ('curse','sup',{'k':'curse','r':20,'n':3,'dx':90}),('seal','sup',{'k':'seal','r':110,'dur':6,'dx':90}),('soulx','sup',{'k':'soulx','r':70,'dx':90}),('bell','sup',{'k':'bell','r':170,'dur':6}),
   ('bdash','assn',{'k':'bdash','r':30,'dx':120,'sxr':-60,'syr':0}),('bstrm','assn',{'k':'bstrm','r':50,'dur':3,'dx':120,'sxr':-60,'syr':0}),('bstorm','assn',{'k':'bstorm','r':80,'uu':1}),
   ('impshot','mage',{'k':'impshot','r':24,'dx':120,'sxr':-30,'syr':-30}),('golem','mage',{'k':'golem','r':100,'dur':8,'dx':80}),('hellgate','mage',{'k':'hellgate','r':140,'dur':6,'dx':80,'dy':60})]
if os.environ.get('SET')=='2':E=E2
E4=[('rinv','sup',{'k':'rinv','r':230,'v':2}),('rcr','assn',{'k':'rcr','r':190,'v':10}),('ras','assn',{'k':'ras','r':190}),('rnfire','mage',{'k':'rnfire','r':44,'dx':80,'dur':3}),
   ('rncomet','mage',{'k':'rncomet','r':40,'a':.96,'len':240,'dx':-120,'dy':-170}),('rnarrow','archer',{'k':'rnarrow','r':1,'sxr':120,'syr':-20})]
E5=[('s6sw','melee',{'k':'s6sw','r':60,'uu':1}),('s6gd','melee',{'k':'s6gd','r':150,'uu':1}),('s6ar','archer',{'k':'s6ar','r':1,'dx':130,'dy':-20,'sxr':0,'syr':-18,'a':1}),
   ('s6ch','archer',{'k':'s6ch','r':1,'ptsr':[[0,-18],[90,-40],[140,10],[110,80],[40,100],[-30,70]]}),('s6rg','sup',{'k':'s6rg','r':140,'uu':1}),('s6ln','sup',{'k':'s6ln','r':60,'dx':80,'lnk':1}),
   ('s6cl','assn',{'k':'s6cl','r':180,'a':0}),('s6bw','assn',{'k':'s6bw','r':70,'len':7,'uu':1}),('s6ob','mage',{'k':'s6ob','r':46,'uu':1}),('s6im','mage',{'k':'s6im','r':1,'dx':120,'dy':20,'sxr':0,'syr':-20,'a':1}),('s6st','melee',{'k':'s6st','r':1,'dx':90,'sxr':20,'syr':-30})]
E6=[('eltg','melee',{'k':'eltg','r':40,'a':0,'len':200,'dx':-60}),('eldash','melee',{'k':'eldash','r':30,'a':0,'dx':-60}),('elsb','melee',{'k':'elsb','r':40,'dx':60}),('elsu','melee',{'k':'elsu','r':34,'dx':60}),
   ('elsm','melee',{'k':'elsm','r':60,'dx':60}),('elbt','melee',{'k':'elbt','r':110,'dx':40}),('elbx','melee',{'k':'elbx','r':110,'dx':40}),('fevm','melee',{'k':'fevm','r':58,'dx':40}),('fevx','melee',{'k':'fevx','r':58,'dx':40}),('lgbolt','melee',{'k':'lgbolt','r':30,'dx':60}),
   ('r3ln','melee',{'k':'r3ln','r':40,'a':0,'len':260,'dx':-100}),('r3ds','melee',{'k':'r3ds','r':40,'a':0,'len':200,'dx':-100}),('r3sp','melee',{'k':'r3sp','r':120,'dx':40}),('r3tp','melee',{'k':'r3tp','r':60,'dx':40})]
if os.environ.get('SET')=='3':E=E3
if os.environ.get('SET')=='6':E=E6
if os.environ.get('SET')=='5':E=E5
if os.environ.get('SET')=='4':E=E4
if len(sys.argv)>2: E=[e for e in E if e[0] in sys.argv[2].split(',')]
PH=[float(v) for v in os.environ.get('PH','.12,.3,.55,.8').split(',')]
_c=[int(v) for v in os.environ.get('CLIP','30,287,300,300').split(',')];CLP={'x':_c[0],'y':_c[1],'width':_c[2],'height':_c[3]}
CLOCK="""()=>{if(window.__ck)return;const o=window.requestAnimationFrame.bind(window);window.__ck={t:performance.now(),run:0};const ck=window.__ck;
 performance.now=()=>ck.t;window.requestAnimationFrame=cb=>o(()=>{cb(ck.t)});
 (function tk(){if(ck.run>0){ck.t+=16.667;ck.run--}o(tk)})()}"""
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Fx'+str(random.randint(1000,9999)), 'mage', 60)
        await A.ev("()=>{gmGod=true;me.x=1600;me.y=2300;LOWQ=false}")
        await A.wait(1500)
        await A.ev(CLOCK);await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        rows=[]
        for name,cls,o in E:
            await A.ev("()=>{window.__km=1}")
            await A.ev("(c)=>{me.cls=c;me.x=1450;me.y=2420;me.face=0;fxs=[];parts=[];banner=null;zones=[];fields=[];me.clone=null;dn=[];mons=(c==='sup'&&window.__km)?mons:[];bolts=[];window.DNH="+os.environ.get('DNH','12')+";try{GX.fl.length=0}catch(e){}}",cls)
            await A.ev("()=>{__ck.run=6}");await A.wait(250)
            dur=await A.ev("(o)=>{o=Object.assign({},o);o.x=me.x+(o.dx||0);o.y=me.y+(o.dy||0);if(o.ptsr){o.pts=o.ptsr.map(q=>[Math.round(me.x+q[0]),Math.round(me.y+q[1])]);delete o.ptsr}if(o.sxr!==undefined){o.sx=Math.round(me.x+o.sxr);o.sy=Math.round(me.y+o.syr);delete o.sxr;delete o.syr}if(o.uu){o.u=uid;delete o.uu}if(o.lnk){o.pts=mons.filter(m=>m.hp>0).sort((a,b)=>Math.hypot(a.x-o.x,a.y-o.y)-Math.hypot(b.x-o.x,b.y-o.y)).slice(0,4).map(m=>[m.id,0]);delete o.lnk}delete o.dx;delete o.dy;o.by=uid;handleFx(o);const f=fxs[fxs.length-1];return f?f.d:.5}",o)
            row=[];done=0
            for ph in PH:
                n=max(1,round((ph*dur*60)-done));done+=n
                await A.ev(f"()=>{{__ck.run={n}}}")
                for _ in range(40):
                    await A.wait(50)
                    if await A.ev("()=>__ck.run")==0: break
                await A.ev('()=>{banner=null}');await A.wait(80)
                fn=FD+f'{OUT}_{name}_{int(ph*100)}.png'
                await A.pg.screenshot(path=fn,clip=CLP)
                row.append(fn)
            rows.append((name,row))
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
    W=300;S=Image.new('RGB',(W*len(PH)+90,W*len(rows)),'#111');d=ImageDraw.Draw(S)
    for i,(nm,row) in enumerate(rows):
        d.text((6,i*W+W//2),nm,fill='white')
        for j,fn in enumerate(row):S.paste(Image.open(fn).resize((W,W)),(90+j*W,i*W))
    S.save(FD+f'sheet_{OUT}.jpg',quality=85);print('ok')
asyncio.run(main())
