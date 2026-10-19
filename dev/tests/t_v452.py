"""v452 บ้านกิลด์ รอบ 1: ประตูในค่าย · แมพบ้านกิลด์ 5 ขั้น · คลังบริจาค · ขยายบ้าน"""
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
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,lv) for n,c,lv in [('Ann','melee',60),('Bee','mage',60),('Cid','archer',15)]]
        A,B,Cc=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.gold=3000000;me.x=CX+200+i*40;me.y=CY+380;window.__bh=[];window.__sm=[];setInterval(()=>{if(banner&&banner.s&&window.__bh[window.__bh.length-1]!==banner.s)window.__bh.push(banner.s)},50);const o=sysMsg;sysMsg=function(t){window.__sm.push(t);return o.apply(this,arguments)}}",i)
        await A.wait(2000)
        await A.ev("()=>{gdEmit('mk',{nm:'บ้านทดสอบ',tag:'HQ',e:1,col:2})}");await A.wait(1300)
        for n,c in (('Bee',B),('Cid',Cc)):
            await A.ev("(n)=>{gdEmit('inv',{to:n})}",n);await A.wait(1100)
            await c.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1300)
        for c in C: await c.ev(GQ)
        await A.wait(1000)
        hq=await A.ev("()=>GDS.g&&GDS.g.hq")
        rep('ข้อมูลบ้านกิลด์จากเซิร์ฟเวอร์: ขั้น 1 · คลัง 0 · เพดาน 2M · ขั้นถัดไป (โหมดทดสอบ ×0.001)',hq and hq['t']==1 and hq['f']==0 and hq['cap']==2000000 and hq['left']==2000000 and hq['nx']=={'f':20000,'l':2},json.dumps(hq))
        # ---- เมนูกิลด์มีการ์ดบ้านกิลด์ ----
        ui=await A.ev("()=>{GDS.tab='ov';gdUI();return{card:ov.innerHTML.includes('บ้านกิลด์ ขั้น 1'),btn:!!ov.querySelector('[data-gha=\"open\"]')}}")
        rep('เมนูกิลด์ › ภาพรวม มีการ์ดบ้านกิลด์ + ปุ่มคลัง',all(ui.values()),json.dumps(ui))
        await A.ev("()=>{ov.querySelector('[data-gha=\"open\"]').click()}");await A.wait(500)
        rep('กดปุ่มคลังจากเมนูกิลด์ → เปิดหน้าคลัง',await A.ev("()=>ov.dataset.k==='gh'&&!ov.hidden&&ov.innerHTML.includes('บริจาคเข้าคลังกิลด์')"))
        await A.ev("()=>{ov.hidden=true}")
        # ---- ประตูในค่าย ----
        g1=await A.ev("()=>{me.x=GHG.x;me.y=GHG.y+40;return new Promise(r=>setTimeout(()=>{const b=$('tnb');r([b.hidden,b.textContent,b.dataset.f])},400))}")
        rep('ยืนหน้าประตูบ้านกิลด์ในค่าย → ปุ่ม «เข้าบ้านกิลด์ [HQ]»',not g1[0] and 'เข้าบ้านกิลด์ [HQ]' in g1[1],json.dumps(g1,ensure_ascii=False))
        col=await A.ev("()=>{me.x=GHG.x-52;me.y=GHG.y-4;campCollide();return Math.hypot(me.x-(GHG.x-52),me.y-(GHG.y-4))}")
        rep('เสาประตูในค่ายชนได้',col>=14,str(col))
        await A.ev("()=>{me.x=GHG.x;me.y=GHG.y+40}");await A.wait(300)
        await A.ev("()=>{$('tnb').click()}");await A.wait(1500)
        inn=await A.ev("()=>({mp:curMap,gh:ghHere(),n:MAPS[curMap].n,id:GDS.g.id,hub:MAPS[curMap].hub,x:me.x-CX,y:me.y-CY,mons:mons.length})")
        rep('เข้าบ้านกิลด์ → แมพ 5000+id กิลด์ · ชื่อแมพมีตรา · ไม่มีมอน',inn['gh'] and inn['mp']==5000+inn['id'] and '[HQ]' in inn['n'] and inn['mons']==0,json.dumps(inn,ensure_ascii=False))
        await B.ev("()=>{ghEnter()}");await A.wait(2500)
        seen=await A.ev("()=>Object.values(others).map(o=>o.n)")
        rep('สมาชิกกิลด์เดียวกันเข้ามาเจอกันในบ้าน','Bee' in seen,json.dumps(seen,ensure_ascii=False))
        out=await Cc.ev("()=>{me.lv=15;ghEnter();return curMap}")
        rep('Cid (สมาชิกเลเวลต่ำ) ก็เข้าบ้านได้',out>=5000)
        await Cc.ev("()=>{ghExit()}")
        # ---- กันชน ----
        cc=await A.ev("()=>{const r=[];me.x=CX;me.y=CY-380;tentCollide();r.push(me.y-CY);me.x=CX+900;me.y=CY+900;tentCollide();r.push([me.x-CX,me.y-CY]);me.x=CX-430;me.y=CY-190;tentCollide();r.push([me.x-CX,me.y-CY]);me.x=CX;me.y=CY+30;tentCollide();r.push(Math.round(Math.hypot(me.x-CX,me.y-CY-22)));return r}")
        rep('กันชน: อาคารหลัก · ขอบกำแพง · คลัง · กองไฟกลางลาน',cc[0]>=-292 and cc[1]==[578,408] and (cc[2][1]>=-146 or cc[2][1]<=-238 or cc[2][0]<=-528 or cc[2][0]>=-332) and cc[3]>=54,json.dumps(cc))
        # ---- ภาพ: แคชตามขั้น ----
        im=await A.ev("()=>new Promise(r=>setTimeout(()=>r({ck:GHS.ck,w:GHS.C&&GHS.C.cv.width}),400))")
        rep('วาดภาพบ้าน (แคชขั้น 1 สีกิลด์)',im['ck'].startswith('1|') and im['w']>1000,json.dumps(im))
        # ---- คุยกับผู้ดูแลคลัง ----
        t1=await A.ev("()=>{me.x=CX+GHN.x;me.y=CY+GHN.y+30;return new Promise(r=>setTimeout(()=>{const b=$('tnb');r([b.hidden,b.textContent])},400))}")
        rep('ยืนหน้าผู้ดูแลคลัง → ปุ่ม «คลังกิลด์ · บริจาค»',not t1[0] and 'คลังกิลด์' in t1[1],json.dumps(t1,ensure_ascii=False))
        await A.ev("()=>{$('tnb').click()}");await A.wait(800)
        u=await A.ev("()=>({k:ov.dataset.k,h:ov.innerHTML.includes('บริจาควันนี้'),up:!!ov.querySelector('[data-gha=\"up\"]'),don:!!ov.querySelector('[data-gha=\"don\"]')})")
        rep('หน้าคลัง: บริจาค + ปุ่มขยายบ้าน (หัวหน้า)',u['k']=='gh' and u['h'] and u['up'] and u['don'],json.dumps(u))
        # ---- บริจาคผ่านหน้าจอ ----
        g0=await A.ev("()=>me.gold")
        await A.ev("()=>{ov.querySelector('[data-ghm=\"100000\"]').click()}");await A.wait(200)
        await A.ev("()=>{ov.querySelector('[data-gha=\"don\"]').click()}")
        mid=await A.ev("(g0)=>[g0-me.gold,!!GHS.pend]",g0)
        await A.wait(1500)
        d1=await A.ev("(g0)=>({dg:g0-me.gold,pend:!!GHS.pend,f:GDS.g.hq.f,today:GDS.g.hq.today,pt:GDS.g.hq.pt,log:GDS.g.hq.log.length,wk:GDS.g.hq.wk,ui:ov.innerHTML.includes('บริจาค 100,000 ทองแล้ว'),ghd:me.stt.ghd})",g0)
        rep('บริจาค 100,000: หักทองทันที (กันกดซ้ำ) → เซิร์ฟเวอร์ยืนยัน',mid[0]==100000 and d1['dg']==100000 and not d1['pend'] and d1['ui'],json.dumps([mid,d1],ensure_ascii=False))
        rep('คลัง 100,000 · วันนี้ 100,000 · แต้มกิลด์ 10 · ประวัติ 1 · อันดับสัปดาห์',d1['f']==100000 and d1['today']==100000 and d1['pt']==10 and d1['log']==1 and d1['wk'][0][:2]==['Ann',100000] and d1['ghd']==100000,json.dumps(d1,ensure_ascii=False))
        sb=await B.ev("()=>({sm:window.__sm.join('|'),f:GDS.g.hq.f})")
        rep('สมาชิกคนอื่นเห็นข้อความบริจาค + คลังอัปเดต','Ann บริจาค 100,000' in sb['sm'] and sb['f']==100000,json.dumps(sb,ensure_ascii=False)[-200:])
        # ---- เกินเพดาน (ฝั่งหน้าจอ) ----
        g0=await A.ev("()=>me.gold")
        cap=await A.ev("()=>{const i=$('ghamt');i.value=1950000;ov.querySelector('[data-gha=\"don\"]').click();return [ov.innerHTML.includes('เกินเพดาน'),!!GHS.pend]}")
        rep('บริจาคเกินเพดานวันนี้ → หน้าจอไม่ให้ส่ง',cap==[True,False] and await A.ev("()=>me.gold")==g0,json.dumps(cap))
        # ---- โกงฝั่งเครื่อง: แก้ left แล้วส่ง → เซิร์ฟเวอร์ปฏิเสธ คืนทอง ----
        mid2=await A.ev("(g0)=>{GDS.g.hq.left=9e9;ghUI();const i=$('ghamt');i.value=1950000;ov.querySelector('[data-gha=\"don\"]').click();return g0-me.gold}",g0)
        await A.wait(1500)
        ch=await A.ev("(g0)=>({dg:g0-me.gold,pend:!!GHS.pend,f:GDS.g.hq.f,ui:ov.innerHTML.includes('คืนทองแล้ว')})",g0)
        rep('แก้ตัวเลขฝั่งเครื่องแล้วส่งเกินเพดาน → เซิร์ฟเวอร์ปฏิเสธ · คืนทองครบ',mid2==1950000 and ch['dg']==0 and not ch['pend'] and ch['f']==100000 and ch['ui'],json.dumps([mid2,ch],ensure_ascii=False))
        # ---- ส่งตรง: ต่ำกว่าขั้นต่ำ / เลเวลไม่ถึง ----
        await A.ev("()=>{window.__x=[];const o=gdN;window.__gdn=o;gdN=function(d){if(d&&d.t==='hqe')window.__x.push(d.s);return o.apply(this,arguments)};gdEmit('hqd',{a:500,n:'t1'})}");await A.wait(900)
        await Cc.ev("()=>{window.__x=[];const o=gdN;gdN=function(d){if(d&&d.t==='hqe')window.__x.push(d.s);return o.apply(this,arguments)};gdEmit('hqd',{a:5000,n:'t2'})}");await A.wait(900)
        e1=await A.ev("()=>window.__x");e2=await Cc.ev("()=>window.__x")
        rep('เซิร์ฟเวอร์ปฏิเสธ: ต่ำกว่า 1,000 · เลเวลต่ำกว่า 20',any('ขั้นต่ำ' in s for s in e1) and any('เลเวล 20' in s for s in e2),json.dumps([e1,e2],ensure_ascii=False))
        # ---- B บริจาค 1,900,000 (เต็มเพดาน) แล้วเกินอีก 1,000 ไม่ได้ ----
        await B.ev("()=>{GHS.amt=1900000;ghUI();ov.querySelector('[data-gha=\"don\"]').click()}");await A.wait(1500)
        await B.ev("()=>{GHS.amt=100000;ghUI();ov.querySelector('[data-gha=\"don\"]').click()}");await A.wait(1500)
        bb=await B.ev("()=>({today:GDS.g.hq.today,left:GDS.g.hq.left,f:GDS.g.hq.f,pt:GDS.g.hq.pt})")
        await B.ev("()=>{window.__x=[];const o=gdN;gdN=function(d){if(d&&d.t==='hqe')window.__x.push(d.s);return o.apply(this,arguments)};gdEmit('hqd',{a:1000,n:'t3'})}");await A.wait(900)
        e3=await B.ev("()=>window.__x")
        rep('เพดานต่อวันต่อคน 2,000,000 (คนละเพดาน) · เกินอีกไม่ได้',bb['today']==2000000 and bb['left']==0 and bb['f']==2100000 and bb['pt']==200 and any('เพดาน' in s for s in e3),json.dumps([bb,e3],ensure_ascii=False))
        # ---- ขยายบ้าน ----
        await B.ev("()=>{window.__bh=[];gdEmit('hqu',{t:1})}");await A.wait(900)
        nb=await B.ev("()=>window.__bh.join('|')+ov.innerHTML")
        rep('สมาชิกธรรมดากดขยายบ้านไม่ได้','เฉพาะหัวหน้า' in nb,nb[:200])
        u0=await A.ev("()=>{GHS.cf=0;ghUI();return ov.querySelector('[data-gha=\"up\"]').disabled}")
        rep('กิลด์ยัง Lv1 → ปุ่มขยายบ้านกดไม่ได้ (ต้อง Lv2)',u0)
        await A.ev("()=>{window.__bh=[];gdEmit('hqu',{t:1})}");await A.wait(900)
        rep('ส่งตรงก็ไม่ผ่าน (ต้องกิลด์ Lv 2)','กิลด์ Lv 2' in await A.ev("()=>ov.innerHTML+window.__bh.join('|')"))
        await A.ev("()=>{gdEmit('wk',{a:{k:3,b:1,g:1}})}");await A.wait(1500)
        await A.ev(GQ);await A.wait(800)
        lv=await A.ev("()=>GDS.g.lvl")
        await A.ev("()=>{GHS.cf=0;ghUI();ov.querySelector('[data-gha=\"up\"]').click()}");await A.wait(300)
        c1=await A.ev("()=>[GDS.g.hq.t,ov.innerHTML.includes('ยืนยันใช้')]")
        await B.ev("()=>{window.__bh=[];window.__sm=[]}")
        await A.ev("()=>{ov.querySelector('[data-gha=\"up\"]').click()}");await A.wait(1500)
        up=await A.ev("()=>({t:GDS.g.hq.t,f:GDS.g.hq.f,nx:GDS.g.hq.nx,log:GDS.g.hq.log.slice(-1)[0],fw:GHS.fw>Date.now()})")
        await A.wait(300)
        ck=await A.ev("()=>GHS.ck")
        rep('กิลด์ Lv2 → หัวหน้ากดขยาย (ยืนยัน 2 ครั้ง) → ขั้น 2 · หักคลัง 20,000',lv==2 and c1==[1,True] and up['t']==2 and up['f']==2080000 and up['nx']=={'f':80000,'l':4} and up['log']['k']=='u',json.dumps([lv,c1,up],ensure_ascii=False))
        rep('ในบ้าน: พลุฉลอง + ภาพเปลี่ยนเป็นขั้น 2',up['fw'] and ck.startswith('2|'),ck)
        nb=await B.ev("()=>window.__bh.join('|')+' # '+window.__sm.join('|')")
        rep('สมาชิกทุกคนได้แจ้งเตือนขยายบ้าน','ขยายบ้านกิลด์เป็นขั้น 2' in nb,nb[-200:])
        rep('ประวัติในคลังบอกใครขยาย ใช้เท่าไร',await A.ev("()=>{GHS.rk='log';ghUI();return ov.innerHTML.includes('ขยายบ้านเป็นขั้น 2')&&ov.innerHTML.includes('20,000')}"))
        await A.ev("()=>{window.__bh=[];gdEmit('hqu',{t:1})}");await A.wait(900)
        rep('ส่งคำสั่งขยายซ้ำ (ขั้นเก่า) ไม่หักเงินซ้ำ',await A.ev("()=>GDS.g.hq.t===2&&GDS.g.hq.f===2080000"))
        # ---- ภาพทุกขั้น (ตรวจว่าวาดได้ ไม่ error) ----
        sz=await A.ev("()=>{const r=[];for(let t=1;t<=5;t++){const c=ghBuild(t,'#58c06a','🛡️');r.push(c.cv.width)}return r}")
        rep('วาดภาพบ้านได้ครบ 5 ขั้น',len(sz)==5 and all(w>1000 for w in sz),str(sz))
        # ---- ทางออก ----
        ex=await A.ev("()=>{ov.hidden=true;me.x=CX;me.y=CY+410;return new Promise(r=>setTimeout(()=>{const b=$('tnb');r([b.hidden,b.textContent])},400))}")
        await A.ev("()=>{$('tnb').click()}");await A.wait(1200)
        ex2=await A.ev("()=>[curMap,Math.round(me.x-GHG.x),Math.round(me.y-GHG.y)]")
        rep('ยืนหน้าประตูใต้ → «กลับค่ายผู้อพยพ» → กลับมาหน้าประตูบ้านกิลด์',not ex[0] and 'กลับค่าย' in ex[1] and ex2[0]==1 and abs(ex2[1])<5,json.dumps([ex,ex2],ensure_ascii=False))
        # ---- ออกจากกิลด์ระหว่างอยู่ในบ้าน ----
        await B.ev("()=>{gdEmit('lv')}");await A.wait(1500)
        kb=await B.ev("()=>[curMap,!!GDS.g]")
        rep('ออกจากกิลด์ขณะอยู่ในบ้าน → ถูกส่งกลับค่าย',kb==[1,False],json.dumps(kb))
        nb2=await B.ev("()=>{ov.hidden=true;me.x=GHG.x;me.y=GHG.y+40;return new Promise(r=>setTimeout(()=>{const b=$('tnb');b.click();setTimeout(()=>r([curMap,banner&&banner.s||'']),400)},400))}")
        rep('ไม่มีกิลด์ → เข้าบ้านกิลด์ไม่ได้ (บอกให้ตั้ง/เข้ากิลด์)',nb2[0]==1 and 'ต้องมีกิลด์' in nb2[1],json.dumps(nb2,ensure_ascii=False))
        # ---- อันดับตลอดกาลยังมีคนที่ออก ----
        await A.ev(GQ);await A.wait(800)
        tp=await A.ev("()=>GDS.g.hq.top.map(r=>[r[0],r[1],r[3]])")
        rep('อันดับผู้บริจาคตลอดกาล (คนที่ออกไปแล้วยังอยู่ในประวัติ)',tp==[['Bee',2000000,0],['Ann',100000,1]],json.dumps(tp,ensure_ascii=False))
        # ---- เดินไวในค่าย ----
        ds=await A.ev("()=>u64Dest().some(d=>d.n==='ประตูบ้านกิลด์')")
        rep('เดินไวในค่ายมีประตูบ้านกิลด์',ds)
        # ---- รีสตาร์ต ----
        p.terminate();p.wait();p=restart()
        await A.wait(4000)
        await A.ev(GQ);await A.wait(1200)
        ps=await A.ev("()=>GDS.g&&GDS.g.hq&&[GDS.g.hq.t,GDS.g.hq.f,GDS.g.hq.log.length]")
        rep('รีสตาร์ตเซิร์ฟเวอร์ ข้อมูลบ้านกิลด์ยังอยู่',ps==[2,2080000,4],json.dumps(ps))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
