import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
SETS=[{'thm':'','bed':'bed1','rug':'rug1','lit':'lit1','pla':'pla1','wal':'wal1','tab':'tab1','cei':'cei1','fir':'fir1'},
      {'thm':'thm1','bed':'bed2','rug':'rug2','lit':'lit2','pla':'pla2','wal':'wal2','tab':'tab2','cei':'cei2','fir':'fir2'},
      {'thm':'thm2','bed':'bed3','rug':'rug3','lit':'lit3','pla':'pla3','wal':'wal3','tab':'tab1','cei':'cei1','fir':'fir1'},
      {'thm':'thm3','bed':'bed3','rug':'rug3','lit':'lit3','pla':'pla3','wal':'wal3','tab':'tab2','cei':'cei2','fir':'fir2'}]
SPY="""()=>{if(window.__spy)return;window.__spy={keys:new Set(),tx:0,n:0};const P=CanvasRenderingContext2D.prototype,o=P.drawImage;P.drawImage=function(I,...a){try{if(TNA.img&&I===TNA.img&&a.length>=8){for(const k in TNA.pos){const p=TNA.pos[k];if(p[0]===a[0]&&p[1]===a[1]){__spy.keys.add(k);break}}__spy.n++}if(TNA.tx&&I===TNA.tx)__spy.tx++}catch(e){}return o.call(this,I,...a)}}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();ctx=await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True);pg=await ctx.new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','T8'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(3000)
            r=await pg.evaluate("""async()=>{const a=await fetch('hd-tent.webp',{method:'HEAD'}),b=await fetch('hd-tenttx.webp',{method:'HEAD'});return[Object.keys(TNA.pos).length,a.ok,b.ok,TNA.img===null]}""")
            rep('ติดตั้ง: 26 ชิ้น + ไฟล์ภาพ 2 ไฟล์ · ยังไม่โหลดภาพก่อนเข้าเต็นท์',r==[26,True,True,True],r)
            await pg.evaluate(SPY)
            allk=set()
            for i,d in enumerate(SETS):
                await pg.evaluate("(d)=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;const S=tSt();for(const k in TDECO)S.own[k]=1;S.d={};for(const k in d)if(d[k])S.d[k]=d[k];tentHome()}",d)
                await pg.wait_for_timeout(3000)
                await pg.evaluate("()=>{ov.hidden=true;me.x=CX+120;me.y=CY-120;MAPS[curMap].tent.f=[[Object.keys(FISH)[0],42],0,[Object.keys(FISH)[3],88],0,[Object.keys(FISH)[6],31],[Object.keys(FISH)[2],60]];__spy.keys=new Set();__spy.tx=0;TVC.k='~'}")
                await pg.wait_for_timeout(1500)
                r=await pg.evaluate("()=>[TNA.ok,TNA.txok,[...__spy.keys],__spy.tx]")
                ks=set(r[2]);allk|=ks
                need={d['bed'],d['rug'],d['lit'],d['pla'],d['wal'],d['tab'],d['cei'],d['fir'],'wardrobe','ped','fish','shelf','book'}
                rep(f"ธีม {i} ({d['thm'] or 'ผ้าใบเดิม'}): ของแต่งทุกช่องเป็นภาพวาด + ผ้า/พื้นเป็นภาพ",r[0]==1 and r[1]==1 and need<=ks and r[3]>=3,[sorted(need-ks),r[3]])
            rep('ใช้ภาพครบทั้ง 26 ชิ้นเมื่อไล่ครบทุกธีม/ทุกระดับ',len(allk)==26,sorted(set(['bed1','bed2','bed3','tab1','tab2','pla1','pla2','pla3','fir1','fir2','lit1','lit2','lit3','rug1','rug2','rug3','cei1','cei2','wal1','wal2','wal3','wardrobe','ped','fish','shelf','book'])-allk))
            r=await pg.evaluate("""async()=>{let n=0,z=0;const o=tnaFishDraw;tnaFishDraw=function(q){if(q)n++;else z++;return o.apply(this,arguments)};await new Promise(r=>setTimeout(r,300));tnaFishDraw=o;return[n>0,z>0,n/(n+z)]}""")
            rep('ตู้ปลา: ปลา 4 ตัวขึ้นในช่องกระจกของภาพ (ช่องว่าง 2 ช่อง)',r[0] and r[1] and abs(r[2]-4/6)<.05,r)
            r=await pg.evaluate("""async()=>{TNA.off=1;TVC.k='~';__spy.n=0;__spy.tx=0;await new Promise(r=>setTimeout(r,500));const a=[__spy.n,__spy.tx];TNA.off=0;TVC.k='~';await new Promise(r=>setTimeout(r,400));return[a,__spy.n>0]}""")
            rep('TNA.off=1 → กลับเป็นภาพเวกเตอร์เดิมทั้งหมด (ไม่ใช้ภาพเลย) · เปิดคืนได้',r[0]==[0,0] and r[1],r)
            r=await pg.evaluate("""async()=>{const t0=performance.now();let f=0;await new Promise(res=>{const L=()=>{f++;if(performance.now()-t0<2000)requestAnimationFrame(L);else res()};requestAnimationFrame(L)});return f/2}""")
            rep('ในเต็นท์ยังเล่นได้ลื่น (headless ≥ 20 fps)',r>=20,r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
