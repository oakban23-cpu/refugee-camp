"""v467 ภารกิจกิลด์รายวัน"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
DQ="()=>{const Q=GDS.g&&GDS.g.hq&&GDS.g.hq.dq;return Q?JSON.parse(JSON.stringify(Q)):null}"
ERRH="()=>{window.__x=[];window.__bn=[];const o=gdN;gdN=function(d){if(d&&d.t==='err')window.__x.push(d.s);if(d&&d.t)window.__bn.push(d.t);return o.apply(this,arguments)}}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,lv) for n,c,lv in [('Ann','melee',60),('Bee','mage',60)]]
        A,B=C
        for c in C:
            await c.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.gold=3000000}")
            await c.ev(ERRH)
        await A.wait(1500)
        await A.ev("()=>{gdEmit('mk',{nm:'ภารกิจ',tag:'DQ',e:3,col:2})}");await A.wait(1300)
        await A.ev("()=>{gdEmit('inv',{to:'Bee'})}");await A.wait(1100)
        await B.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1300)
        for c in C: await c.ev("()=>gdEmit('q')")
        await A.wait(1200)
        q=await A.ev(DQ)
        rep('เริ่มวัน: ภารกิจ 4 อย่างเป็น 0 · หลอดกิลด์ 0/6 (2 คน → ขั้นต่ำ 6)',q and q['p']=={'v':0,'f':0,'d':0,'k':0} and q['n']==0 and q['goal']==6 and q['full']==0,json.dumps(q))
        await A.ev("()=>{ghEnter()}");await A.wait(2600)
        q=await A.ev(DQ);bn=await A.ev("()=>window.__bn.includes('hdq')")
        rep('เข้าบ้านกิลด์ → 🏠 แวะบ้านกิลด์ สำเร็จ (แจ้งเตือน)',q['p']['v']==1 and bn,json.dumps(q['p']))
        await A.ev("()=>{gdEmit('hqd',{a:1000,n:'t1'})}");await A.wait(900)
        await A.ev("()=>{gdEmit('hfp',{p:0,c:'wheat'})}");await A.wait(900)
        await A.ev("()=>{gdEmit('hfp',{p:1,c:'carrot'})}");await A.wait(900)
        await A.ev("()=>{gdEmit('wk',{a:{k:40}})}");await A.wait(1000)
        q=await A.ev(DQ)
        rep('บริจาค → 💰 1/1 · ปลูก 2 แปลง → 🌱 2/2 · ล่ามอน 40 → ⚔️ 40/60',q['p']=={'v':1,'f':2,'d':1,'k':40},json.dumps(q['p']))
        await A.ev("()=>{gdEmit('wk',{a:{k:40}})}");await A.wait(1000)
        q=await A.ev(DQ)
        rep('ล่าต่อ → ⚔️ เต็มที่ 60/60 (ไม่เกิน)',q['p']['k']==60,json.dumps(q['p']))
        await A.ev("()=>{window.__x=[];gdEmit('hdc',{k:'all'})}");await A.wait(800)
        rep('ยังรับไม่ครบ 4 → รับโบนัสครบภารกิจไม่ได้',any('ครบทั้ง 4' in s for s in await A.ev("()=>window.__x")))
        g0=await A.ev("()=>me.gold")
        for k in ['v','f','d','k']:
            await A.ev(f"()=>{{gdEmit('hdc',{{k:'{k}'}})}}");await A.wait(900)
        g1=await A.ev("()=>me.gold");q=await A.ev(DQ)
        rep('รับรางวัล 4 ภารกิจ → ทอง +60,000 (15,000×ขั้น 1 ×4) · หลอดกิลด์ 4/6',g1-g0==60000 and q['n']==4 and sorted(q['c'])==['d','f','k','v'],json.dumps([g1-g0,q['n'],q['c']]))
        await A.ev("()=>{window.__x=[];gdEmit('hdc',{k:'v'})}");await A.wait(800)
        rep('รับซ้ำไม่ได้',any('ไปแล้ว' in s for s in await A.ev("()=>window.__x")))
        await A.ev("()=>{gdEmit('hdc',{k:'all'})}");await A.wait(900)
        g2=await A.ev("()=>me.gold");pt=await A.ev("()=>GDS.g.hq.pt")
        rep('โบนัสครบ 4 → ทอง +50,000 · แต้มกิลด์ (2×4+5=13 + บริจาค/เก็บเดิม)',g2-g1==50000 and pt>=13,json.dumps([g2-g1,pt]))
        await A.ev("()=>{window.__x=[];gdEmit('hdc',{k:'bar'})}");await A.wait(800)
        rep('หลอดยังไม่เต็ม → รับหีบกิลด์ไม่ได้',any('ยังไม่เต็ม' in s for s in await A.ev("()=>window.__x")))
        # B ทำ 2 ภารกิจ → ครบหลอด
        f0=await A.ev("()=>GDS.g.hq.f")
        await B.ev("()=>{ghEnter()}");await B.wait(2600)
        await B.ev("()=>{gdEmit('hfh',{p:0})}");await B.wait(900)
        await B.ev("()=>{gdEmit('hfp',{p:0,c:'herb'})}");await B.wait(900)
        await B.ev("()=>{gdEmit('hdc',{k:'v'})}");await B.wait(900)
        await B.ev("()=>{gdEmit('hdc',{k:'f'})}");await B.wait(1400)
        qa=await A.ev(DQ);qb=await B.ev(DQ);f1=await A.ev("()=>GDS.g.hq.f");wd=await A.ev("()=>GDS.g.hq.st.wood|0")
        sa=await A.ev("()=>window.__bn.includes('hdqf')")
        rep('สมาชิกอีกคนทำ 2 ภารกิจ (แวะบ้าน · เก็บผัก+ปลูก) → หลอด 6/6 ครบ · คลัง +200,000 · ไม้ +2 · ทุกคนได้แจ้งเตือน',qa['full']==1 and qa['n']==6 and qb['full']==1 and f1-f0==200000 and wd>=2 and sa,json.dumps([qa['n'],qa['full'],f1-f0,wd,sa]))
        bf=await A.ev("()=>({xp:fdM('xp'),gd:fdM('gd'),b:buffList().some(x=>x.k==='gdq'),u:Math.round((GDQ.until-Date.now())/60000)})")
        rep('บัฟทั้งกิลด์ EXP/ทอง +5% ถึงเที่ยงคืน (ไอคอนบัฟ)',bf['xp']>=.05 and bf['gd']>=.05 and bf['b'] and 0<bf['u']<=1440,json.dumps(bf))
        ga=await A.ev("()=>me.gold");await A.ev("()=>{gdEmit('hdc',{k:'bar'})}");await A.wait(900);gb=await A.ev("()=>me.gold")
        await B.ev("()=>{gdEmit('hdc',{k:'bar'})}");await B.wait(900)
        await A.ev("()=>{window.__x=[];gdEmit('hdc',{k:'bar'})}");await A.wait(800)
        rep('รับหีบกิลด์ +40,000 · รับซ้ำไม่ได้ · อีกคนรับได้',gb-ga==40000 and any('ไปแล้ว' in s for s in await A.ev("()=>window.__x")) and (await B.ev(DQ))['bc']==1,json.dumps([gb-ga]))
        u=await A.ev("()=>{me.x=1600+GHBD.x;me.y=1600+GHBD.y+30;tentTick&&0;GHS.near='board';ghUI.call(null);GHS.tab='quest';ghUI();return{tabs:ov.querySelectorAll('[data-ght]').length,rows:ov.querySelectorAll('.qr').length,tab:GHS.tab,txt:ov.innerHTML.includes('หลอดภารกิจของกิลด์')}}")
        rep('หน้าต่างบ้านกิลด์มีแท็บ 📋 ภารกิจ (6 แท็บ) · แสดงหลอดกิลด์ + 4 ภารกิจ + โบนัส',u['tabs']==6 and u['rows']>=5 and u['txt'],json.dumps(u))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
