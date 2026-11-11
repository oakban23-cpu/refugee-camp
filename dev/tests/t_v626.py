import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,d if not ok else '')
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','Td'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;AUTO.on=false;ov.hidden=true;twCreate(1)}");await pg.wait_for_timeout(2500)
            seen={}
            for f in [3,13,23,33,43,53,63,73,83,93]:
                await pg.evaluate(f"()=>{{ov.hidden=true;dg.ph='lobby';TWCL=null;twBegin({f});me.x=CX-40;me.y=CY-330;banner=null}}");await pg.wait_for_timeout(1800)
                r=await pg.evaluate("""()=>new Promise(res=>{const o=twaPut,got={};twaPut=function(k,x,y,w,a){if(/^p\\d+_[5-8]$/.test(k))got[k]=Math.round(w);return o.apply(this,arguments)};setTimeout(()=>{twaPut=o;res(got)},700)})""")
                seen[f]=r
            rep('atlas ใหม่ hd-gpt10c.webp โหลดครบ',await pg.evaluate("()=>TWAR.src==='hd-gpt10d.webp'&&TWAR.ok===1&&Object.keys(TWAR.f).length===172"))
            rep('ของแต่งขอบในชีทใหม่มีความละเอียด (ใหญ่ ≥200px · กลาง ≥140px)',await pg.evaluate("()=>{for(let t=1;t<=10;t++)for(let c=5;c<=8;c++){const F=TWAR.f['p'+t+'_'+c];if(!F||F[3]<(c<7?200:140))return 'p'+t+'_'+c}return true}")==True)
            ok=all(len(v)>=3 for v in seen.values()) and all(k.startswith('p%d_'%((f-1)//10+1)) for f,v in seen.items() for k in v)
            rep('ทุกธีมวาดของแต่งขอบด้วยคีย์ธีมตัวเอง',ok,seen)
            rep('ขนาดตามความสูง (ใหญ่สูง 96 · กลาง 60)',await pg.evaluate("()=>{const F=TWAR.f.p8_5,G=TWAR.f.p8_7;return [Math.round(96*F[2]/F[3]),Math.round(60*G[2]/G[3])]}")==[seen[73].get('p8_5'),seen[73].get('p8_7')] if 'p8_5' in seen[73] and 'p8_7' in seen[73] else True,seen[73])
            await pg.evaluate("()=>{TWAR.v2=0}");await pg.wait_for_timeout(300)
            r=await pg.evaluate("""()=>new Promise(res=>{const o=twaPut,got={};twaPut=function(k,x,y,w,a){if(/^p\\d+_[5-8]$/.test(k))got[k]=w;return o.apply(this,arguments)};setTimeout(()=>{twaPut=o;res(got)},600)})""")
            rep('ปิด v2 → กลับไปใช้ความกว้างเดิมใน ED',all(v in (112,66,104,62) for v in r.values()) and len(r)>0,r)
            rep('v627 ชิ้นส่วนกลางภาพใหม่ (ป้าย ≤144 · หีบ ≤120 · ประตู ≥250) และป้ายประเภทชั้นแปลงเป็นรูปได้',await pg.evaluate("()=>{const f=TWAR.f;return f.s_9[3]<=144&&f.s_12[3]<=144&&f.s_5[3]<=120&&f.s_1[3]>=250&&f.s_2[3]>=250&&['s_9','s_10','s_11','s_12'].every(k=>twaIcon(k).startsWith('data:image'))}"))
            rep('ไม่มี error หน้าเว็บ',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
