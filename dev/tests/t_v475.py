"""v475 เช็คบัคทั้งเกม: สนามเต็มจอทันที · บทนำก่อนเนื้อเรื่อง · ปุ่มประตูแสงดาวมีหน้าเลือกสะพาน · ข้อความเมนู · เซิร์ฟเวอร์เปิดไว"""
import asyncio, sys, json, os, time, subprocess, urllib.request, shutil
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
FIT="()=>{const c=document.getElementById('c');return{H,ch:c.height,dpr:DPR,cssH:Math.round(c.getBoundingClientRect().height),exp:Math.round(H*c.clientWidth/W),JBy:JB.y}}"
ST="""()=>{const pc=document.getElementById('procv');return{pro:window.PRO_ON|0,proCv:pc?getComputedStyle(pc).visibility:null,sd:!!(SD&&SD.on),cz:!!(typeof CZ!=='undefined'&&CZ.on),tutI}}"""
async def main():
    # ---- เซิร์ฟเวอร์เปิดไว (ไม่รอบีบอัด br) ----
    shutil.rmtree(DD, ignore_errors=True); os.makedirs(DD)
    env = dict(os.environ, PORT=str(PORT), DATA_DIR=DD, MVP_FAST='1', GD_FAST='1')
    t0=time.time();p = subprocess.Popen(['node', 'server.js'], cwd=SRV, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    up=None
    for _ in range(600):
        try: urllib.request.urlopen(URL + 'health', timeout=1); up=time.time()-t0; break
        except Exception: time.sleep(.05)
    rep('เซิร์ฟเวอร์ตอบ /health ภายใน 3 วิหลังเริ่ม (ไม่รอบีบอัด br)', up is not None and up<3, '%.2fs'%(up or -1))
    req=urllib.request.Request(URL,headers={'Accept-Encoding':'gzip'});r=urllib.request.urlopen(req,timeout=10)
    rep('หน้าเกมส่ง gzip ได้ทันที', r.headers.get('Content-Encoding')=='gzip', r.headers.get('Content-Encoding'))
    br=None
    for _ in range(100):
        req=urllib.request.Request(URL,headers={'Accept-Encoding':'br, gzip'});r=urllib.request.urlopen(req,timeout=10)
        if r.headers.get('Content-Encoding')=='br': br=len(r.read());break
        time.sleep(.2)
    rep('br พร้อมตามมาภายหลัง (เบื้องหลัง)', br is not None and br>100000, str(br))
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        # ---- สนามเต็มจอทันทีหลังเข้าเกม ----
        for (w,h,d,mob) in [(390,844,2,1),(1920,1080,1,0),(1366,768,1,0)]:
            kw=dict(viewport={'width':w,'height':h},device_scale_factor=d)
            if mob: kw.update(has_touch=True,is_mobile=True)
            ctx=await b.new_context(**kw);pg=await ctx.new_page()
            await pg.goto(URL);await pg.wait_for_timeout(1200)
            await pg.evaluate(SETUP,['melee','จอ',40]);await pg.wait_for_timeout(800)
            f=await pg.evaluate(FIT)
            rep('จอ %dx%d: canvas สูงตาม H ทันที (ไม่ค้างที่ 520) · จอยอยู่ที่ H−84'%(w,h), abs(f['cssH']-f['exp'])<=4 and abs(f['ch']-f['H']*f['dpr'])<=1.5 and f['JBy']==f['H']-84, json.dumps(f))
            await ctx.close()
        # ---- ผู้เล่นใหม่: บทนำก่อน แล้วบทสอน แล้วเนื้อเรื่องค่าย ----
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=1,has_touch=True,is_mobile=True);pg=await ctx.new_page();E=[]
        pg.on('pageerror',lambda e:E.append(str(e)[:200]))
        await pg.goto(URL);await pg.wait_for_timeout(2000)
        await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.click()}");await pg.wait_for_timeout(800)
        await pg.evaluate("()=>{pick('melee','','มือใหม่')}")
        sts=[]
        for _ in range(6):
            await pg.wait_for_timeout(700);sts.append(await pg.evaluate(ST))
        rep('ตัวใหม่: ฉากบทนำแสดงต่อเนื่อง ไม่ถูกคัตซีนค่ายแทรก (4 วิแรก)', all(s['pro']==1 and s['proCv']=='visible' and not s['sd'] and not s['cz'] for s in sts), json.dumps(sts[-1]))
        await pg.mouse.click(341,28);await pg.wait_for_timeout(2200)
        s1=await pg.evaluate(ST)
        rep('ข้ามบทนำ → บทสอนขั้นแรกเริ่ม · ยังไม่เปิดเนื้อเรื่อง', s1['pro']==0 and s1['proCv'] is None and s1['tutI']==0 and not s1['sd'], json.dumps(s1))
        for _ in range(8):
            ti=await pg.evaluate("()=>tutI")
            if ti<0 or ti>=2:break
            await pg.evaluate("(ti)=>{if(ti===0)tutD=999;else me.xp=Math.max(me.xp,1)}",ti);await pg.wait_for_timeout(1000)
        await pg.evaluate("()=>{mons.forEach(m=>{if(Math.hypot(m.x-me.x,m.y-me.y)<400){m.x=-9999;m.y=-9999}})}");await pg.wait_for_timeout(1500)
        s2=await pg.evaluate(ST)
        rep('บทสอน 2 ขั้นแรกจบ → เนื้อเรื่องเปิดค่าย (คัตซีน) ขึ้นตามปกติ', s2['sd'] and s2['cz'] and s2['tutI']==2, json.dumps(s2))
        rep('ไม่มี error (ผู้เล่นใหม่)', not E, json.dumps(E[:3]))
        await ctx.close()
        # ---- ประตูแสงดาว: แตะปุ่มจริง ----
        A=await new_client(b,'Brg','melee',99)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.sty.e=1}")
        async def tap_portal(mp,x,y,stage):
            await A.ev(f"()=>{{const i=STY.findIndex(x=>x.p5z);me.sty.s='{stage}'==='after'?i+1:Math.max(0,i-1);me.sty.a=1;enterMap({mp},{{x:{x},y:{y}}})}}")
            await A.wait(1200);await A.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true}");await A.wait(500)
            await A.pg.locator('#gtb').click();await A.wait(500)
            return await A.ev("()=>({sd:!!SD.on,ch:SD.on&&SD.choice?SD.choice.map(c=>c[0]):null,skl:!!SKL,map:curMap,end:gP5end()})")
        c1=await tap_portal(1,1774,1884,'after')
        rep('จบภาค 5 แล้ว แตะปุ่มประตูแสงดาวในค่าย → หน้าเลือก ลิฟต์ / เดินสะพาน / ไว้ก่อน', c1['sd'] and c1['ch'] and len(c1['ch'])==3 and 'สะพาน' in c1['ch'][1] and not c1['skl'], json.dumps(c1,ensure_ascii=False))
        await A.ev("()=>{SD.onChoose(2)}");await A.wait(1500)
        m30=await A.ev("()=>curMap")
        rep('เลือก «เดินสะพานรุ่งอรุณ» → ไปสะพาน (แมพ 30)', m30==30, str(m30))
        c2=await tap_portal(9,1600,2280,'after')
        rep('ฝั่งเมืองหลวงก็มีหน้าเลือกเหมือนกัน', c2['sd'] and c2['ch'] and len(c2['ch'])==3, json.dumps(c2,ensure_ascii=False))
        await A.ev("()=>{SD.onChoose(1)}");await A.wait(400)
        lift=await A.ev("()=>!!SKL");await A.wait(3500)
        m1=await A.ev("()=>curMap")
        rep('เลือก «ลิฟต์แสงดาว» → ขึ้นลิฟต์แล้วถึงค่าย', lift and m1==1, str([lift,m1]))
        await A.wait(2500)
        c3=await tap_portal(1,1774,1884,'before')
        rep('ยังไม่จบภาค 5 → แตะปุ่มแล้วขึ้นลิฟต์ทันที (ไม่มีหน้าเลือก)', (not c3['sd']) and c3['skl'] and not c3['end'], json.dumps(c3,ensure_ascii=False))
        await A.wait(3500)
        # ---- ข้อความชี้เมนู ----
        tx=await A.ev("()=>{const L=[TUT.map(t=>t[1]).join('|'),String(onbDeathTip),String(zcBanner),String(sgSetsCard)].join('\\n');return{bad:/เมนู\\s*(→|✨)\\s*สกิล/.test(L),tut:TUT[5][1]}}")
        rep('ไม่มีข้อความชี้ «เมนู → สกิล» เหลือแล้ว · บทสอนบอก «เมนู → ตัวละคร»', (not tx['bad']) and 'เมนู → ตัวละคร' in tx['tut'], json.dumps(tx,ensure_ascii=False))
        # ---- พื้นวัง: ของตั้งพื้นไม่ทำให้ตัววาดพื้นโยน error ----
        await A.ev("()=>{enterMap(27,{x:1600,y:2880})}");await A.wait(2500)
        pe=await A.ev("()=>{let n=0;const d0=PALD;try{for(const d of PAL.dec)if(!d0[d.k])n++}catch(e){}let err=null;try{palChunk(4,4,1)}catch(e){err=String(e)}return{noPainter:n,err}}")
        rep('พื้นวัง: สร้างแคชชิ้นพื้นได้ไม่ error (ของตั้งพื้นข้ามไปเงียบ ๆ)', pe['err'] is None, json.dumps(pe))
        rep('ไม่มี error (ประตู/วัง)', not [e for e in A.errs if 'TUNNEL' not in e], json.dumps(A.errs[:3]))
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed' % (sum(1 for x in R if x[1]), len(R)))
asyncio.run(main())
