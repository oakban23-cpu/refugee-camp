"""v454 บ้านกิลด์ รอบ 3: กำแพง/ประตู · ช่องป้อม · ค่ายทหาร"""
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
    for _ in range(240):
        time.sleep(.3)
        try:
            import urllib.request; urllib.request.urlopen(URL + 'health', timeout=1); break
        except Exception: pass
    return q
ERRH="()=>{window.__x=[];const o=gdN;gdN=function(d){if(d&&d.t==='err')window.__x.push(d.s);return o.apply(this,arguments)}}"
HQ="()=>{const H=GDS.g.hq;return{t:H.t,f:H.f,wl:H.wl,gl:H.gl,tw:H.tw,sol:H.sol,scap:H.scap,cw:H.cw,cg:H.cg,wood:(H.st||{}).wood|0}}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,lv) for n,c,lv in [('Ann','melee',60),('Bee','mage',60)]]
        A,B=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.gold=3000000;me.x=CX+200+i*40;me.y=CY+380;window.__bh=[];window.__sm=[];setInterval(()=>{if(banner&&banner.s&&window.__bh[window.__bh.length-1]!==banner.s)window.__bh.push(banner.s)},50);const o=sysMsg;sysMsg=function(t){window.__sm.push(t);return o.apply(this,arguments)}}",i)
            await c.ev(ERRH)
        await A.wait(2000)
        await A.ev("()=>{gdEmit('mk',{nm:'ป้อมทดสอบ',tag:'DF',e:1,col:4})}");await A.wait(1300)
        await A.ev("()=>{gdEmit('inv',{to:'Bee'})}");await A.wait(1100)
        await B.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1300)
        await A.ev("()=>{gdEmit('hqd',{a:1000000,n:'x1'})}");await A.wait(900)
        for c in C: await c.ev("()=>{ghEnter()}")
        await A.wait(2000)
        h0=await A.ev(HQ)
        rep('เริ่มต้น: กำแพง/ประตู Lv1 · ขั้น 1 ยังไม่มีช่องป้อม/ทหาร · ราคาอัป Lv2 (×0.001)',h0['wl']==1 and h0['gl']==1 and h0['tw']==[] and h0['scap']==0 and h0['cw']=={'g':1600,'w':0} and h0['cg']=={'g':1280,'w':0},json.dumps(h0))
        u=await A.ev("()=>{GHS.tab='def';ghUI();return{w:!!ov.querySelector('[data-gh2=\"du:wall:1\"]'),g:!!ov.querySelector('[data-gh2=\"du:gate:1\"]'),lock:(ov.innerHTML.match(/🔒/g)||[]).length,tab:!!ov.querySelector('[data-ght=\"def\"]')}}")
        ub=await B.ev("()=>{GHS.tab='def';ghUI();return ov.querySelectorAll('[data-gh2]').length}")
        rep('แท็บ 🛡️ ป้อม: หัวหน้ามีปุ่มอัปกำแพง/ประตู · ช่องป้อมล็อก 8 · สมาชิกไม่มีปุ่ม',u['w'] and u['g'] and u['lock']==8 and u['tab'] and ub==0,json.dumps([u,ub]))
        await B.ev("()=>{window.__sm=[]}")
        await A.ev("()=>{ov.querySelector('[data-gh2=\"du:wall:1\"]').click()}");await A.wait(1000)
        h1=await A.ev(HQ);lg=await A.ev("()=>GDS.g.hq.log.slice(-1)[0]");sb=await B.ev("()=>window.__sm.join('|')")
        rep('อัปกำแพงเป็น Lv2 → หักคลัง 1,600 · ลงประวัติ · สมาชิกได้แจ้งเตือน',h1['wl']==2 and h1['f']==1000000-1600 and lg['k']=='d2' and 'กำแพงเมือง Lv 2' in sb,json.dumps([h1['wl'],h1['f'],lg],ensure_ascii=False))
        lk=await A.ev("()=>{GHS.tab='def';ghUI();return [!!ov.querySelector('[data-gh2^=\"du:wall\"]'),ov.innerHTML.includes('ขยายบ้านขั้นถัดไป')]}")
        await A.ev("()=>{window.__x=[];gdEmit('hwu',{w:'wall',lv:2})}");await A.wait(700)
        await A.ev("()=>{gdEmit('hwu',{w:'gate',lv:5})}");await A.wait(700)
        await B.ev("()=>{window.__x=[];gdEmit('hwu',{w:'gate',lv:1})}");await A.wait(700)
        e1=await A.ev("()=>window.__x");e2=await B.ev("()=>window.__x")
        rep('ถึงเพดานขั้นบ้าน (Lv2) อัปต่อไม่ได้ · ส่งระดับเก่า → ปฏิเสธ · สมาชิกสั่งไม่ได้',lk==[False,True] and any('ขยายบ้านก่อน' in s for s in e1) and any('ระดับเปลี่ยน' in s for s in e1) and any('เฉพาะหัวหน้า' in s for s in e2),json.dumps([lk,e1,e2],ensure_ascii=False))
        # ---- ขยายบ้านต้องกำแพง+ประตู Lv2 ----
        await A.ev("()=>{gdEmit('wk',{a:{k:3,b:1,g:1}})}");await A.wait(1500)
        await A.ev(GQ);await A.wait(700)
        bk=await A.ev("()=>{GHS.tab='bank';GHS.cf=0;ghUI();return [ov.innerHTML.includes('⬜ กำแพง/ประตู Lv 2'),ov.querySelector('[data-gha=\"up\"]').disabled]}")
        await A.ev("()=>{window.__x=[];gdEmit('hqu',{t:1})}");await A.wait(800)
        e3=await A.ev("()=>window.__x")
        rep('กิลด์ Lv2 + คลังพอ แต่ประตูยัง Lv1 → ขยายบ้านไม่ได้ (หน้าจอบอก ⬜ + เซิร์ฟเวอร์ปฏิเสธ)',bk==[True,True] and any('กำแพงและประตูถึง Lv 2' in s for s in e3),json.dumps([bk,e3],ensure_ascii=False))
        await A.ev("()=>{gdEmit('hwu',{w:'gate',lv:1})}");await A.wait(900)
        await A.ev("()=>{gdEmit('hqu',{t:1})}");await A.wait(1200)
        h2=await A.ev(HQ)
        rep('อัปประตู Lv2 → ขยายเป็นขั้น 2 ได้ · ช่องป้อม 2 · ทหาร 4 นาย',h2['t']==2 and h2['gl']==2 and len(h2['tw'])==2 and h2['scap']==4,json.dumps(h2))
        # ---- ป้อม ----
        await A.ev("()=>{GHS.tab='def';ghUI();ov.querySelector('[data-gh2=\"tb:0:ar\"]').click()}");await A.wait(900)
        await A.ev("()=>{window.__x=[];gdEmit('htb',{s:0,k:'fi'})}");await A.wait(600)
        await A.ev("()=>{gdEmit('htb',{s:2,k:'fi'})}");await A.wait(600)
        await A.ev("()=>{gdEmit('htb',{s:1,k:'laser'})}");await A.wait(600)
        e4=await A.ev("()=>window.__x");t1=await A.ev("()=>GDS.g.hq.tw")
        rep('สร้างป้อมธนูช่อง 1 · ช่องที่มีป้อม/ยังไม่เปิด/แบบปลอม ไม่ได้',t1[0] and t1[0]['k']=='ar' and t1[0]['lv']==1 and t1[1] is None and len(e4)==3 and 'มีป้อมแล้ว' in e4[0] and 'ยังไม่เปิด' in e4[1] and 'ไม่มีป้อม' in e4[2],json.dumps([t1,e4],ensure_ascii=False))
        await A.ev("()=>{GHS.tab='def';ghUI();ov.querySelector('[data-gh2=\"tu:0:1\"]').click()}");await A.wait(900)
        t2=await A.ev("()=>{GHS.tab='def';ghUI();const b=ov.querySelector('[data-gh2=\"tu:0:2\"]');return [GDS.g.hq.tw[0].lv,GDS.g.hq.tw[0].cu,b&&b.disabled]}")
        await A.ev("()=>{window.__x=[];gdEmit('htu',{s:0,lv:2})}");await A.wait(700)
        e5=await A.ev("()=>window.__x")
        rep('อัปป้อมเป็น Lv2 · Lv3 ต้องใช้ไม้ 4 (ไม่มีไม้ → ปุ่มกดไม่ได้ + เซิร์ฟเวอร์ปฏิเสธ)',t2[0]==2 and t2[1]=={'g':9000,'w':4} and t2[2] and any('ไม้ในโกดังไม่พอ' in s for s in e5),json.dumps([t2,e5],ensure_ascii=False))
        await A.ev("()=>{GHS.tab='def';ghUI();ov.querySelector('[data-gh2=\"tb:1:ic\"]').click()}");await A.wait(900)
        await A.ev("()=>{ov.querySelector('[data-gh2=\"tx:1\"]').click()}");await A.wait(200)
        c1=await A.ev("()=>[ov.innerHTML.includes('ยืนยันรื้อ'),!!GDS.g.hq.tw[1]]")
        await A.ev("()=>{ov.querySelector('[data-gh2=\"tx:1\"]').click()}");await A.wait(900)
        rep('สร้างป้อมน้ำแข็งช่อง 2 → รื้อ (ยืนยัน 2 ครั้ง) → ช่องว่าง',c1==[True,True] and await A.ev("()=>GDS.g.hq.tw[1]===null"),json.dumps(c1))
        # ---- ทหาร ----
        for k in ['sp','sp','ar','ar']:
            await A.ev("(k)=>{GHS.tab='def';ghUI();ov.querySelector('[data-gh2=\"sh:'+k+'\"]').click()}",k);await A.wait(700)
        await A.ev("()=>{window.__x=[];gdEmit('hsh',{k:'sp'})}");await A.wait(600)
        await A.ev("()=>{gdEmit('hsh',{k:'pr'})}");await A.wait(600)
        s1=await A.ev("()=>[GDS.g.hq.sol,window.__x,GHS.tab==='def'&&ov.querySelector('[data-gh2=\"sh:sp\"]').disabled]")
        rep('จ้างทหารหอก 2 + นักธนู 2 (เต็ม 4) · คนที่ 5 ไม่ได้ · นักบวชต้องบ้านขั้น 4',s1[0]=={'sp':2,'ar':2,'pr':0} and any('เต็มแล้ว' in s for s in s1[1]) and any('ขั้น 4' in s for s in s1[1]),json.dumps(s1,ensure_ascii=False))
        await A.ev("()=>{GHS.tab='def';ghUI();ov.querySelector('[data-gh2=\"sd:sp\"]').click()}");await A.wait(200)
        await A.ev("()=>{ov.querySelector('[data-gh2=\"sd:sp\"]').click()}");await A.wait(900)
        rep('ปลดทหารหอก 1 นาย (ยืนยัน 2 ครั้ง)',await A.ev("()=>GDS.g.hq.sol.sp===1"))
        f1=await A.ev("()=>GDS.g.hq.f")
        rep('เงินคลังหักครบทุกรายการ (กำแพง 1,600 + ประตู 1,280 + ขยายบ้าน 20,000 + ป้อม 3,000+6,000+4,000 + ทหาร 900)',f1==1000000-1600-1280-20000-3000-6000-4000-900,str(f1))
        # ---- ภาพ + ปุ่ม ----
        vs=await A.ev("()=>new Promise(r=>{ov.hidden=true;me.x=CX+GHTS[0][0];me.y=CY+GHTS[0][1]+50;setTimeout(()=>{const b=$('tnb');const x1=[b.hidden,b.textContent];me.x=CX+GHBR.x;me.y=CY+GHBR.y+10;setTimeout(()=>{r([x1,[b.hidden,b.textContent],window.__err.length])},400)},400)})")
        rep('ปุ่ม «ช่องป้อม 1» / «ค่ายทหาร» · วาดป้อม+ทหารไม่มี error',not vs[0][0] and 'ช่องป้อม 1' in vs[0][1] and not vs[1][0] and 'ค่ายทหาร' in vs[1][1] and vs[2]==0,json.dumps(vs,ensure_ascii=False))
        await A.ev("()=>{$('tnb').click()}");await A.wait(400)
        rep('กดแล้วเปิดแท็บป้อม',await A.ev("()=>ov.dataset.k==='gh'&&GHS.tab==='def'"))
        cl=await A.ev("()=>{ov.hidden=true;me.x=CX+GHTS[0][0];me.y=CY+GHTS[0][1]-3;tentCollide();return Math.round(Math.hypot(me.x-CX-GHTS[0][0],me.y-CY-GHTS[0][1]+4))}")
        rep('ป้อมที่สร้างแล้วชนได้',cl>=27,str(cl))
        # ---- รีสตาร์ตเป็นขั้น 4 + ไม้ ----
        p.terminate();p.wait()
        fp=os.path.join(DD,'guild.json');J=json.load(open(fp))
        G=list(J['g'].values())[0];G['lvl']=6;H=G['hq'];H['t']=4;H['wl']=6;H['gl']=6;H['st']['wood']=50;H['f']=10000000
        json.dump(J,open(fp,'w'));p=restart()
        await A.wait(4000)
        for c in C: await c.ev(GQ)
        await A.wait(1200)
        h4=await A.ev(HQ)
        rep('ขั้น 4: ช่องป้อม 6 · ทหาร 12 · กำแพง Lv7 ใช้ไม้ 18',len(h4['tw'])==6 and h4['scap']==12 and h4['cw']=={'g':19600,'w':18},json.dumps(h4))
        await A.ev("()=>{gdEmit('hwu',{w:'wall',lv:6})}");await A.wait(800)
        await A.ev("()=>{gdEmit('htu',{s:0,lv:2})}");await A.wait(800)
        await A.ev("()=>{gdEmit('hsh',{k:'pr'})}");await A.wait(800)
        h5=await A.ev(HQ)
        rep('อัปกำแพง Lv7 (ไม้ -18) · ป้อม Lv3 (ไม้ -4) · จ้างนักบวชได้ที่ขั้น 4',h5['wl']==7 and h5['wood']==50-18-4 and h5['tw'][0]['lv']==3 and h5['sol']['pr']==1,json.dumps(h5))
        sz=await A.ev("()=>{const r=[];for(let t=1;t<=5;t++)r.push(ghBuild(t,'#58c06a','🛡️').cv.width);return r}")
        rep('วาดบ้านครบ 5 ขั้น',all(w>1000 for w in sz),str(sz))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
