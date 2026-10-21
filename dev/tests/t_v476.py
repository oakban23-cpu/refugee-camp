"""v476 เข้าเมืองหลวงครั้งแรกไม่กระตุก: พื้นเมืองวาดเร็วขึ้น (ภาพเหมือนเดิม) · ทยอยสร้างล่วงหน้าในค่าย/ระหว่างลิฟต์ · วาร์ปออกกลางลิฟต์ไม่ถูกดึงกลับ"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
LT="()=>{window.__lt=[];new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lt.push([Math.round(e.startTime),Math.round(e.duration)])}).observe({entryTypes:['longtask']})}"
PREP="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}"
async def fresh(b):
    ctx=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True);pg=await ctx.new_page();E=[]
    pg.on('pageerror',lambda e:E.append(str(e)[:200]))
    await pg.goto(URL);await pg.wait_for_timeout(1500)
    await pg.evaluate(SETUP,['melee','เมือง',99]);await pg.wait_for_timeout(500)
    await pg.evaluate(PREP);await pg.evaluate(LT)
    return ctx,pg,E
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        # ---- ภาพพื้นเมือง: สร้างแบบทยอย (ช่วงเล็ก + บังคับวาด) กับแบบทันที ได้ภาพเดียวกัน ----
        ctx,pg,E=await fresh(b)
        cmp=await pg.evaluate("""()=>{LOWQ=false;cpwWant=()=>false;const grab=()=>{const c=CG.c,x=c.getContext('2d'),d=x.getImageData(500,500,600,600).data;return d};
          CG.c=null;CGG.it=null;const it=cityGroundGen();let n=0;const t0=performance.now();while(!it.next().done)n++;const tg=performance.now()-t0;const A=grab();
          CG.c=null;const t1=performance.now();cityGroundBuild();const ts=performance.now()-t1;const B=grab();
          let s=0,mx=0;for(let i=0;i<A.length;i++){if((i&3)===3)continue;const d=Math.abs(A[i]-B[i]);s+=d;if(d>mx)mx=d}
          return{steps:n,gen:Math.round(tg),sync:Math.round(ts),mean:+(s/(A.length*.75)).toFixed(3),max:mx,w:CG.c.width,s:CG.s}}""")
        rep('พื้นเมืองแบบทยอยสร้าง (%d ช่วง) กับแบบทันที ได้ภาพเดียวกัน'%cmp['steps'], cmp['steps']>=40 and cmp['mean']<0.5 and cmp['w']>2000, json.dumps(cmp))
        rep('สร้างพื้นเมืองแบบทันที (รวมวาดจริง) เร็วกว่าเดิมมาก (เดิม ~1.4 วิบนเครื่องทดสอบ)', cmp['sync']<900, '%d ms'%cmp['sync'])
        await ctx.close()
        # ---- อยู่ค่ายสักพัก → ทยอยสร้างเสร็จเอง → เข้าเมืองไม่ค้าง ----
        ctx,pg,E=await fresh(b)
        done=None
        for i in range(60):
            await pg.wait_for_timeout(1000)
            if await pg.evaluate("()=>cpwDone()"): done=i+1;break
        st=await pg.evaluate("()=>({cg:!!CG.c,cw:!!CW.c,hd:CPW.hd,n:CPW.n,ms:Math.round(CPW.ms),map:curMap})")
        rep('อยู่ค่าย (เปิดเมืองแล้ว) → ทยอยสร้างพื้น/กำแพงเมืองล่วงหน้าจนเสร็จเอง', done is not None and st['cg'] and st['cw'] and st['map']==1, json.dumps(st)+' ใน %s วิ'%done)
        lt0=await pg.evaluate("()=>window.__lt.filter(x=>x[1]>=250).length")
        rep('ระหว่างทยอยสร้างในค่ายไม่มีช่วงค้างยาว (≥250ms)', lt0==0, str(lt0))
        await pg.evaluate("()=>{window.__lt.length=0;window.__t0=performance.now();enterMap(9,{x:1600,y:1750})}");await pg.wait_for_timeout(2500)
        mx=await pg.evaluate("()=>Math.max(0,...window.__lt.filter(x=>x[0]>=window.__t0-20).map(x=>x[1]))")
        rep('เข้าเมืองหลวงหลังเตรียมไว้แล้ว: ไม่ค้าง (งานช่วงยาวสุด < 300ms · เดิม ~1,500ms)', mx<300, '%d ms'%mx)
        rep('ไม่มี error (ค่าย→เมือง)', not E, json.dumps(E[:3]))
        await ctx.close()
        # ---- นั่งลิฟต์ทันทีหลังเข้าเกม: เริ่มเตรียมระหว่างลิฟต์ ----
        ctx,pg,E=await fresh(b)
        await pg.evaluate("()=>{window.__t0=performance.now();me.x=1774;me.y=1884;skyLift(MAPS[1].gates.find(G=>G.to===9&&G.sky))}")
        for _ in range(40):
            await pg.wait_for_timeout(200)
            if await pg.evaluate("()=>curMap===9"):break
        a=await pg.evaluate("()=>({map:curMap,ska:!!SKA,n:CPW.n})")
        await pg.wait_for_timeout(2500)
        mx=await pg.evaluate("()=>Math.max(0,...window.__lt.filter(x=>x[0]>=window.__t0-20).map(x=>x[1]))")
        rep('ขึ้นลิฟต์ทันทีหลังเข้าเกม → ทยอยสร้างระหว่างลิฟต์ · ถึงเมืองพร้อมแสงลงจอด', a['map']==9 and a['ska'] and a['n']>=10, json.dumps(a))
        rep('ลิฟต์ทันที: ช่วงค้างยาวสุดตอนถึงเมือง < 450ms (เดิม ~1,500ms)', mx<450, '%d ms'%mx)
        await ctx.close()
        # ---- วาร์ปออกกลางทางลิฟต์ ----
        ctx,pg,E=await fresh(b)
        await pg.evaluate("()=>{me.x=1774;me.y=1884;skyLift(MAPS[1].gates.find(G=>G.to===9&&G.sky))}");await pg.wait_for_timeout(700)
        await pg.evaluate("()=>{const M=MAPS[2];enterMap(2,{x:M.sx,y:M.sy})}")
        s1=await pg.evaluate("()=>({map:curMap,skl:!!SKL,ska:!!SKA})")
        await pg.wait_for_timeout(3000)
        s2=await pg.evaluate("()=>({map:curMap,skl:!!SKL,ska:!!SKA})")
        rep('วาร์ปออกระหว่างลิฟต์ → อยู่แมพใหม่ ไม่ถูกดึงไปเมืองทีหลัง · ไม่มีแสงลิฟต์ค้าง', s1['map']==2 and not s1['skl'] and not s1['ska'] and s2['map']==2, json.dumps([s1,s2]))
        await pg.evaluate("()=>{const M=MAPS[1];enterMap(1,{x:1774,y:1884})}");await pg.wait_for_timeout(800)
        await pg.evaluate("()=>{skyLift(MAPS[1].gates.find(G=>G.to===9&&G.sky))}");await pg.wait_for_timeout(300)
        lk=await pg.evaluate("()=>!!SKL")
        await pg.wait_for_timeout(2600)
        s3=await pg.evaluate("()=>({map:curMap})")
        rep('หลังจากนั้นขึ้นลิฟต์ใหม่ได้ปกติ', lk and s3['map']==9, json.dumps([lk,s3]))
        await pg.wait_for_timeout(2500)
        # ลิฟต์ฟ้าแมพอื่น (ซากวิหารพายุ 18 → เมือง) หลังจบภาค 5: ไม่มีหน้าเลือกสะพาน ขึ้นลิฟต์ตามเดิม
        await pg.evaluate("()=>{const i=STY.findIndex(x=>x.p5z);me.sty.s=i+1;me.sty.a=1;const G=MAPS[18].gates.find(G=>G.to===9);enterMap(18,{x:G.x,y:G.y+30})}");await pg.wait_for_timeout(1200)
        await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true}");await pg.wait_for_timeout(500)
        await pg.locator('#gtb').click();await pg.wait_for_timeout(500)
        g18=await pg.evaluate("()=>({sd:!!SD.on,skl:!!SKL,end:gP5end()})")
        await pg.wait_for_timeout(3000)
        m18=await pg.evaluate("()=>curMap")
        rep('ลิฟต์ฟ้าแมพ 18 → เมือง (จบภาค 5 แล้ว): ไม่มีหน้าเลือกสะพาน ขึ้นลิฟต์ถึงเมือง', g18['end'] and not g18['sd'] and g18['skl'] and m18==9, json.dumps([g18,m18]))
        rep('ไม่มี error (ลิฟต์)', not E, json.dumps(E[:3]))
        await ctx.close()
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed' % (sum(1 for x in R if x[1]), len(R)))
asyncio.run(main())
