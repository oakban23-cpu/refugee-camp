"""v624 ไอคอนไอเทมภาพวาด: 176 คีย์ · อาวุธทุกอาชีพ/แบบ/ระดับ · เกราะ/หมวก/ประดับ/รองเท้า · ชุดเซ็ต · วัตถุดิบ · ตีบวกยังเรือง · ช่องว่างแบบเดิม · หน้ากระเป๋าแสดงจริง · ปิดได้"""
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
            await pg.goto(URL); await pg.wait_for_timeout(3800)
            a=await pg.evaluate("()=>[ITIC.ok,ITIC.err,!!ITIC.im,ITIC.ix.size]")
            rep('โหลด hd-itic.webp · 176 คีย์',a==[176,'',True,176],a)
            a=await pg.evaluate("""()=>{const bad=[];const isP=u=>typeof u==='string'&&u.startsWith('data:image/webp')&&Object.values(ITIC.c).includes(u);
              for(const c of ['melee','archer','mage','sup','assn'])for(const st of [0,1,2])for(let T=0;T<7;T++)if(!isP(itEquipURL('w',T,c+':'+st,0,0,0)))bad.push('w'+c+st+T);
              for(const f of ['h','l','r'])for(let T=0;T<7;T++)if(!isP(itEquipURL('a',T,f,0,0,0)))bad.push('a'+f+T);
              for(const f of ['h0','h1','h2'])for(let T=0;T<7;T++)if(!isP(itEquipURL('h',T,f,0,0,0)))bad.push('h'+f+T);
              for(const sl of ['c','b'])for(let T=0;T<7;T++)if(!isP(itEquipURL(sl,T,'h',0,0,0)))bad.push(sl+T);
              for(let s=1;s<=6;s++)for(const sl of ['w','a','c','h','b'])if(!isP(itEquipURL(sl,6,sl==='w'?'mage:1':'r',s,0,0)))bad.push('s'+s+sl);
              for(const k of Object.keys(MATI))if(!isP(itMatURL(k)))bad.push('m'+k);return bad}""")
            rep('ทุกช่อง × ทุกระดับ × ทุกอาชีพ/แบบ + ชุดเซ็ต + วัตถุดิบทุกชนิด ได้ภาพวาด',a==[],a[:10])
            a=await pg.evaluate("()=>{const u1=itEquipURL('w',0,'melee:0',0,0,0),u2=itEquipURL('w',1,'melee:0',0,0,0),u3=itEquipURL('w',2,'melee:0',0,0,0),u6=itEquipURL('w',5,'melee:0',0,0,0),u7=itEquipURL('w',6,'melee:0',0,0,0);return [u1===u2,u2!==u3,u6===u7,u1!==u7]}")
            rep('ลุคตามระดับ: Basic=Refined · Elite ต่างกัน · Ancient=Cosmic',a==[True,True,True,True],a)
            a=await pg.evaluate("()=>{const g=itEquipURL('w',3,'melee:0',0,0,1),b0=itEquipURL('w',3,'melee:0',0,0,0),u=itEquipURL('w',3,'melee:0',0,3,0);return [!Object.values(ITIC.c).includes(g),b0!==u,Object.values(ITIC.c).includes(u)]}")
            rep('ช่องว่างใช้รูปเดิม · ตีบวก +15 ได้ภาพที่มีขอบเรือง (ไม่ใช่ภาพเดียวกับ +0)',a==[True,True,True],a)
            await pg.evaluate(SETUP, ['mage','It'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1200)
            await pg.evaluate("()=>{AUTO.on=false;gmGod=true;for(let r=0;r<7;r++)me.bag.push(genItem(60,['w','a','h','c','b'][r%5],r,r));me.inv=me.inv||{};try{me.mat.sc=(me.mat.sc|0)+5}catch(e){}ov.hidden=false;gearUI()}"); await pg.wait_for_timeout(900)
            a=await pg.evaluate("()=>{const I=[...ov.querySelectorAll('img')].filter(i=>i.src.startsWith('data:image/webp'));const P=new Set(Object.values(ITIC.c));return [ov.dataset.k,I.filter(i=>P.has(i.src)).length,I.filter(i=>P.has(i.src)&&i.complete&&i.naturalWidth>0).length]}")
            rep('หน้าอุปกรณ์/กระเป๋า: แสดงไอคอนภาพวาดจริง',a[1]>=5 and a[2]==a[1],a)
            await pg.screenshot(path='../v624_bag.png')
            a=await pg.evaluate("()=>{ITIC.off=1;const u=itEquipURL('w',3,'melee:0',0,0,0);ITIC.off=0;return !Object.values(ITIC.c).includes(u)}")
            rep('ปิด ITIC.off=1 → รูปเดิม',a,a)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
