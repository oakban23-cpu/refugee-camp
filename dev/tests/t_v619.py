"""v619 ไอคอนสกิลภาพวาด: 60 ไอคอนจับคู่ครบ · ทุกอาชีพ/ช่อง/ร่างไม้ตายได้ภาพวาด · ปุ่มในจอเป็นภาพเต็มวง · ปิดได้ · ไม่ error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):
    R.append(ok);print(('PASS ' if ok else 'FAIL ')+n,d,flush=True)
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(3500)
            a=await pg.evaluate("()=>[SKIC.ok,SKIC.err,new Set([...SKIC.map.values()]).size,[...SKIC.map.values()].every(v=>/^data:image\\/(webp|png)/.test(v))]")
            rep('โหลด hd-skic.webp แล้วจับคู่ไอคอนเดิม → ภาพวาด ครบ 60 ไม่ซ้ำ',a[0]==60 and a[1]=='' and a[2]==60 and a[3],a)
            a=await pg.evaluate("""()=>{const C=['melee','archer','sup','assn','mage'];const bad=[];
              for(const c of C){const T=[SKI[c][0],SKI[c][1],SKI[c][2],SKI[c][3],SKI[c][4],SKI6[c][0],SKI6[c][1],SKI2[c],SKI2B[c],SKI4B[c],SKI3U[c][0],SKI3U[c][1]];T.forEach((u,i)=>{if(!SKIC.map.has(u))bad.push(c+(i+1))})}return bad}""")
            rep('ทุกอาชีพ ทุกช่อง 1–12 (สกิลหลัก สกิล6 ไม้ตายขั้น2/สายแยก สกิล4สายแยก ไม้ตายตื่นรู้) มีภาพวาด',a==[],a)
            for cls in ('melee','assn'):
                await pg.evaluate(SETUP, [cls,'Ik'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1200)
                await pg.evaluate("()=>{AUTO.on=false;gmGod=true;ov.hidden=true;enterMap(2,{x:1600,y:1600})}"); await pg.wait_for_timeout(2500)
                a=await pg.evaluate("()=>[...document.querySelectorAll('#sk button')].filter(b=>!b.hidden&&b.querySelector('img.ski')).map(b=>[b.id,!!b.querySelector('img.skp'),(()=>{const i=b.querySelector('img.ski'),r=i.getBoundingClientRect(),q=b.getBoundingClientRect();return Math.round(r.width/q.width*100)})()])")
                rep(f'{cls}: ปุ่มสกิลในจอทุกปุ่มใช้ภาพวาดเต็มวง (กว้าง ≥ 75% ของปุ่มรวมขอบ)',len(a)>=3 and all(x[1] and x[2]>=75 for x in a),a)
                # ร่างไม้ตายต่าง ๆ
                v=await pg.evaluate("""()=>{const c=me.cls,src=k=>{const m=/src="([^"]+)"/.exec(skImg(c,k,30));return m?m[1]:''},isP=k=>/^data:image\\/(webp|png)/.test(src(k));const r={};
                  me.cls2=0;r.base=isP(2);me.cls2='a';r.c2=isP(2);const ob=me.br;try{me.br=1;r.br=isP(2)&&isP(4)}catch(e){r.br='x'}me.br=ob;
                  const orb=me.rb,olv=me.lv;me.rb=1;me.lv=99;try{r.u3=isP(2)}catch(e){r.u3='x'}me.rb=orb;me.lv=olv;applyS6&&applyS6();r.s6=isP(5);return r}""")
                rep(f'{cls}: ไม้ตายทุกร่าง (ขั้น 1/2/สายแยก/ตื่นรู้) และสกิล 6 เป็นภาพวาด',all(x is True for x in v.values()),v)
            await pg.evaluate("()=>{skwOpen('link',0)}"); await pg.wait_for_timeout(800)
            a=await pg.evaluate("()=>{const L=[...ov.querySelectorAll('img.ski')];return [L.length,L.filter(i=>i.classList.contains('skp')).length,L.filter(i=>i.complete&&i.naturalWidth>0).length]}")
            rep('หน้าต่างสกิล: ไอคอนเป็นภาพวาดและโหลดขึ้นจริง',a[0]>=6 and a[1]==a[0] and a[2]==a[0],a)
            a=await pg.evaluate("()=>{SKIC.on=0;const h=skImg(me.cls,0,30);SKIC.on=1;return [h.includes('svg+xml'),!h.includes('skp')]}")
            rep('ปิด SKIC.on=0 → กลับ SVG เดิม',a==[True,True],a)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
