"""v455 บ้านกิลด์ รอบ 4: ศึกมอนบุก"""
import asyncio, sys, json, os, subprocess, time
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
GQ="()=>{gdEmit('q')}"
def restart():
    env = dict(os.environ, PORT=str(PORT), DATA_DIR=DD, MVP_FAST='1', GD_FAST='1')
    q = subprocess.Popen(['node', 'server.js'], cwd=SRV, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for _ in range(60):
        time.sleep(.3)
        try:
            import urllib.request; urllib.request.urlopen(URL + 'health', timeout=1); break
        except Exception: pass
    return q
ERRH="()=>{window.__x=[];const o=gdN;gdN=function(d){if(d&&d.t==='err')window.__x.push(d.s);return o.apply(this,arguments)}}"
def edit(fn):
    fp=os.path.join(DD,'guild.json');J=json.load(open(fp));G=list(J['g'].values())[0];fn(G);json.dump(J,open(fp,'w'))
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,lv) for n,c,lv in [('Ann','melee',60),('Bee','mage',60)]]
        A,B=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.gold=3000000;window.__bh=[];window.__sm=[];setInterval(()=>{if(banner&&banner.s&&window.__bh[window.__bh.length-1]!==banner.s)window.__bh.push(banner.s)},50);const o=sysMsg;sysMsg=function(t){window.__sm.push(t);return o.apply(this,arguments)}}",i)
            await c.ev(ERRH)
        await A.wait(2000)
        await A.ev("()=>{gdEmit('mk',{nm:'ศึกทดสอบ',tag:'WAR',e:5,col:1})}");await A.wait(1300)
        await A.ev("()=>{gdEmit('inv',{to:'Bee'})}");await A.wait(1100)
        await B.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1300)
        p.terminate();p.wait()
        def t3(G):
            G['lvl']=4;H=G['hq'];H['t']=3;H['wl']=4;H['gl']=4;H['f']=5000000;H['tw']=[None,None,{'k':'ar','lv':3},{'k':'fi','lv':2}];H['sol']={'sp':2,'ar':2,'pr':0}
        edit(t3);p=restart();await A.wait(4000)
        for c in C: await c.ev("()=>{gdEmit('q');setTimeout(()=>{ghEnter();me.x=CX;me.y=CY+300},800)}")
        await A.wait(3000)
        hs=await A.ev("()=>isHost()");H0,N0=(A,B) if hs else (B,A)
        rd=await A.ev("()=>{const H=GDS.g.hq;GHS.tab='def';ghUI();return{t:H.t,rd:H.rd,rdd:H.rdd,rp:H.rp,btn:!!ov.querySelector('[data-gh2=\"rs\"]'),dis:ov.querySelector('[data-gh2=\"rs\"]').disabled,card:ov.innerHTML.includes('ศึกมอนบุก')}}")
        rep('แท็บป้อมมีการ์ดศึกมอนบุก + ปุ่มเปิดศึก (หัวหน้า)',rd['t']==3 and rd['rd'] is None and rd['btn'] and not rd['dis'] and rd['card'],json.dumps(rd))
        await B.ev("()=>{window.__x=[];gdEmit('hrs')}");await A.wait(800)
        rep('สมาชิกธรรมดาเปิดศึกไม่ได้',any('เฉพาะหัวหน้า' in s for s in await B.ev("()=>window.__x")))
        await A.ev("()=>{ov.querySelector('[data-gh2=\"rs\"]').click()}");await A.wait(200)
        cf=await A.ev("()=>ov.innerHTML.includes('ยืนยันเปิดศึก')")
        await A.ev("()=>{ov.querySelector('[data-gh2=\"rs\"]').click()}");await A.wait(1200)
        st=await B.ev("()=>({id:GRD.id,ph:GRD.ph,W:GRD.W,gm:GRD.gm,wm:GRD.wm,fm:GRD.fm,on:ghrOn(),SR,bh:window.__bh.join('|')})")
        rep('เปิดศึก (ยืนยัน 2 ครั้ง) → ทุกคนได้แจ้งเตือน · 7 คลื่น (ขั้น 3) · ประตู 12,000 · กำแพง 8,000 · ธง 13,000 · ปิดเขตปลอดภัย',cf and st['id'] and st['W']==7 and st['gm']==12000 and st['wm']==8000 and st['fm']==13000 and st['on'] and st['SR']==0 and 'เปิดศึกมอนบุก' in st['bh'],json.dumps(st,ensure_ascii=False))
        await A.ev("()=>{ov.hidden=true}")
        await A.wait(4500)
        w1=await H0.ev("()=>({ph:GRD.ph,w:GRD.w,n:mons.filter(m=>m.id>=900000).length,sol:(GRD.sol||[]).length})")
        w2=await N0.ev("()=>({ph:GRD.ph,w:GRD.w,n:mons.filter(m=>m.id>=900000).length,so:(GRD.so||[]).length})")
        rep('นับถอยหลังจบ → โฮสต์ปล่อยคลื่น 1 · อีกเครื่องเห็นมอน + สถานะ (คลื่น/ทหาร)',w1['ph']=='run' and w1['w']==1 and w1['n']>0 and w1['sol']==4 and w2['w']==1 and w2['n']>0 and w2['so']==4,json.dumps([w1,w2]))
        await A.wait(9000)
        g1=await H0.ev("()=>({gate:GRD.gate,wall:GRD.wall,hurt:mons.filter(m=>m.id>=900000&&m.hp<m.mh).length,fx:fxs.filter(f=>/^ght/.test(f.k)).length,near:mons.filter(m=>m.id>=900000&&m.y>1600+440&&m.y<1600+480).length})")
        g2=await N0.ev("()=>({gate:GRD.gate,wall:GRD.wall})")
        rep('มอนเดินมาตีประตู/กำแพง (เลือดลด) · ป้อม/ทหารยิงมอน · อีกเครื่องเห็นเลือดประตูตรงกัน',(g1['gate']<12000 or g1['wall']<8000) and g1['hurt']>0 and abs(g2['gate']-g1['gate'])<=1500,json.dumps([g1,g2]))
        # ผู้เล่นผ่านกำแพง
        cl=await N0.ev("()=>{const r=[];me.x=1600+300;me.y=1600+430;tentCollide();r.push(me.y-1600);me.x=1600;me.y=1600+430;tentCollide();r.push(me.y-1600);me.x=1600;me.y=1600+700;tentCollide();r.push(me.y-1600);me.x=CX;me.y=CY+300;return r}")
        rep('ระหว่างศึก: ผ่านกำแพงไม่ได้ · ผ่านช่องประตูได้ · ออกไปทุ่งด้านใต้ได้',cl[0] in (410,452) and cl[1]==430 and cl[2]==700,json.dumps(cl))
        # เร่งคลื่น
        for k in range(14):
            await H0.ev("()=>{mons.forEach(m=>{if(m.id>=900000){m.hp=0}});GRD.q.length=0}")
            await A.wait(900)
            w=await H0.ev("()=>[GRD.w,GRD.fin]")
            if w[1]: break
        rs=await H0.ev("()=>({fin:GRD.fin,w:GRD.w,boss:mons.some(m=>m.id>=900000&&m.t===3)})")
        await A.wait(2500)
        for c in C: await c.ev(GQ)
        await A.wait(1000)
        e1=await A.ev("()=>({res:GRD.res&&GRD.res.res,rw:GRD.res&&GRD.res.rw,on:ghrOn(),rd:GDS.g.hq.rd,rdd:GDS.g.hq.rdd,rwn:GDS.g.hq.rw,rb:GDS.g.hq.rb,rk:GDS.g.hq.rkl,f:GDS.g.hq.f,wood:GDS.g.hq.st.wood|0,pt:GDS.g.hq.pt,SR,bh:window.__bh.slice(-2).join('|')})")
        rep('เคลียร์ครบ 7 คลื่น (มีบอสคลื่นสุดท้าย) → ชนะ · ศึกจบ · เขตปลอดภัยกลับมา',rs['fin'] and rs['w']==7 and e1['res']=='win' and not e1['on'] and e1['rd'] is None and e1['SR']==760 and 'ชนะศึก' in e1['bh'],json.dumps([rs,{k:e1[k] for k in ('res','on','rd','SR','bh')}],ensure_ascii=False))
        rep('รางวัลชนะ: คลัง +1,500 · ไม้ +9 · แต้มกิลด์ +9 · นับ 1/3 ของสัปดาห์ · ขึ้นอันดับ',e1['rw'] and e1['rw']['fund']==1500 and e1['rw']['wood']==9 and e1['rw']['pt']==9 and e1['wood']==9 and e1['rwn']==1 and e1['rb'] and e1['rb']['win']==1 and e1['rk'] and e1['rk'][0][0]=='WAR',json.dumps({k:e1[k] for k in ('rw','wood','rwn','rb','rk','pt')},ensure_ascii=False))
        await A.ev("()=>{window.__x=[];gdEmit('hrs')}");await A.wait(800)
        rep('วันละครั้ง: เปิดซ้ำไม่ได้',any('วันนี้เปิดศึกไปแล้ว' in s for s in await A.ev("()=>window.__x")))
        # ---- แพ้ + ทหารตาย + ค่าซ่อม ----
        p.terminate();p.wait();edit(lambda G:G['hq'].update({'rdd':'','rp':0}));p=restart();await A.wait(4000)
        for c in C: await c.ev(GQ)
        await A.wait(1200)
        hs=await A.ev("()=>isHost()");H0,N0=(A,B) if hs else (B,A)
        await A.ev("()=>{gdEmit('hrs')}");await A.wait(5000)
        sol0=await A.ev("()=>({...GDS.g.hq.sol})")
        await H0.ev("()=>{if(GRD.sol){GRD.sol[0].hp=0}GRD.gate=Math.round(GRD.gm*.25);GRD.flag=0}");await A.wait(3000)
        for c in C: await c.ev(GQ)
        await A.wait(1000)
        e2=await A.ev("()=>({res:GRD.res&&GRD.res.res,rp:GDS.g.hq.rp,sol:GDS.g.hq.sol,lost:GRD.res&&GRD.res.lost,bh:window.__bh.slice(-2).join('|')})")
        rep('ธงศึกล้ม → แพ้ · ค่าซ่อม (ประตูเสียหาย + ค่าปรับแพ้) · ทหารหอกที่ตายหายจากค่าย',e2['res']=='lose' and e2['rp']>3000 and e2['sol']['sp']==sol0['sp']-1 and e2['lost'].get('sp')==1 and 'แพ้' in e2['bh'],json.dumps([sol0,e2],ensure_ascii=False))
        p.terminate();p.wait();edit(lambda G:G['hq'].update({'rdd':''}));p=restart();await A.wait(4000)
        for c in C: await c.ev(GQ)
        await A.wait(1200)
        await A.ev("()=>{window.__x=[];gdEmit('hrs')}");await A.wait(800)
        e3=await A.ev("()=>window.__x")
        rp=await A.ev("()=>GDS.g.hq.rp")
        await A.ev("()=>{GHS.tab='def';ghUI();ov.querySelector('[data-gh2=\"rr\"]').click()}");await A.wait(1000)
        e4=await A.ev("()=>({rp:GDS.g.hq.rp,log:GDS.g.hq.log.slice(-1)[0]})")
        rep('ค่าซ่อมค้าง → เปิดศึกไม่ได้ · กดซ่อม (หักคลัง) แล้วหาย',any('ซ่อม' in s for s in e3) and rp>0 and e4['rp']==0 and 'ซ่อม' in e4['log']['s'],json.dumps([e3,rp,e4],ensure_ascii=False))
        # ---- ยุติเมื่อไม่มีใครอยู่ ----
        await A.ev("()=>{gdEmit('hrs')}");await A.wait(1000)
        for c in C: await c.ev("()=>{enterMap(1,{x:GHG.x,y:GHG.y+60})}")
        await A.wait(13000)
        for c in C: await c.ev(GQ)
        await A.wait(1000)
        e5=await A.ev("()=>({rd:GDS.g.hq.rd,res:GRD.res&&GRD.res.res,mons:mons.filter(m=>m.id>=900000).length})")
        rep('ทุกคนออกจากบ้านระหว่างศึก → ยุติเอง (ไม่ค้าง)',e5['rd'] is None and e5['res']=='abort' and e5['mons']==0,json.dumps(e5,ensure_ascii=False))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
