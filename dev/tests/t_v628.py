import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','Tc'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;AUTO.on=false;ov.hidden=true;twCreate(1)}");await pg.wait_for_timeout(2500)
            rep('ของเล็ก 40 ชิ้นอยู่ใน atlas',await pg.evaluate("()=>{for(let t=1;t<=10;t++)for(let c=9;c<=12;c++){const F=TWAR.f['p'+t+'_'+c];if(!F||F[2]<60)return 'p'+t+'_'+c}return true}")==True)
            bad=await pg.evaluate("""()=>{const out=[];for(let f=1;f<=100;f++){TWAR.cl=null;const L=twaClutL(f),st=TWST();if(L.length<12||L.length>16)out.push(f+':n'+L.length);
              for(const[x,y]of L){if(Math.hypot(x-CX,(y-CY)/.98)>DR-95)out.push(f+':edge');if(Math.hypot(x-CX,y-(CY-60))<150)out.push(f+':mid');if(Math.abs(x-st.x)<120&&y>st.y-170&&y<st.y+80)out.push(f+':stair');if(Math.abs(x-CX)<130&&y>CY+DR-150)out.push(f+':arrive')}}return out}""")
            rep('ทุกชั้น 1–100 วาง 12–16 ชิ้น ไม่ทับขอบ/กลางลาน/บันได/จุดมาถึง',bad==[],bad[:10])
            rep('ตำแหน่งคงที่ต่อชั้น · ต่างกันระหว่างชั้น',await pg.evaluate("()=>{TWAR.cl=null;const a=JSON.stringify(twaClutL(37));TWAR.cl=null;const b=JSON.stringify(twaClutL(37));TWAR.cl=null;const c=JSON.stringify(twaClutL(38));return a===b&&a!==c}"))
            seen={}
            for f in [3,23,43,63,93]:
                await pg.evaluate(f"()=>{{ov.hidden=true;dg.ph='lobby';TWCL=null;twBegin({f});me.x=CX-180;me.y=CY+40;banner=null}}");await pg.wait_for_timeout(1800)
                seen[f]=await pg.evaluate("""()=>new Promise(res=>{const o=twaPutT,got=new Set();twaPutT=function(k){if(/^p\\d+_(9|1[0-2])$/.test(k))got.add(k);return o.apply(this,arguments)};setTimeout(()=>{twaPutT=o;res([...got])},600)})""")
            ok=all(len(v)>0 and all(k.startswith('p%d_'%((f-1)//10+1)) for k in v) for f,v in seen.items())
            rep('ในเกมวาดของเล็กด้วยคีย์ธีมของชั้นนั้น',ok,seen)
            n=await pg.evaluate("""()=>new Promise(res=>{TWAR.clOff=1;const o=twaPutT;let n=0;twaPutT=function(k){if(/^p\\d+_(9|1[0-2])$/.test(k))n++;return o.apply(this,arguments)};setTimeout(()=>{twaPutT=o;TWAR.clOff=0;res(n)},500)})""")
            rep('TWAR.clOff=1 ปิดของเล็กได้',n==0,n)
            rep('v629 ของเล็กมีเงาสัมผัสพื้นและปรับโทน (ลานลอยฟ้าเข้มกว่าธีมปกติ)',await pg.evaluate("()=>{const s1=twaSprT('p1_9',40,.12),s7=twaSprT('p7_9',40,.33),b=twaSpr('p7_9',40);const px=(c)=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let r=0,n=0;for(let i=0;i<d.length;i+=4)if(d[i+3]>200){r+=d[i]+d[i+1]+d[i+2];n++}return r/n};return !!s1&&px(s7.c)<px(b.c)*0.8&&/PALSH\(x\+w\*\.06/.test(twaClut.toString())}"))
            rep('ไม่มี error หน้าเว็บ',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
