"""v429 บอสกิลด์ประจำสัปดาห์"""
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
FIN="(d)=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if(isWB()&&GBS.go&&dg&&dg.ph==='boss'){clearInterval(iv);WB.cd=0;WB.dmg=d;wbFinish();r(true)}else if(Date.now()-t0>8000){clearInterval(iv);r(false)}},100)})"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,lv) for n,c,lv in [('Ann','melee',60),('Bee','mage',60),('Cid','archer',60)]]
        A,B,Cc=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.gold=100000;me.x=CX+300+i*40;me.y=CY+380;window.__bh=[];setInterval(()=>{if(banner&&banner.s&&window.__bh[window.__bh.length-1]!==banner.s)window.__bh.push(banner.s)},50)}",i)
        await A.wait(2000)
        await A.ev("()=>{gdEmit('mk',{nm:'อสูรทดสอบ',tag:'GB',e:4,col:1})}");await A.wait(1300)
        await A.ev("()=>{gdEmit('inv',{to:'Bee'})}");await A.wait(1200)
        await B.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1500)
        for c in (A,B): await c.ev(GQ)
        await A.wait(1000)
        gb=await A.ev("()=>GDS.g&&GDS.g.gb")
        rep('กิลด์ 2 คน มีอสูรกิลด์ขั้น 1 · ท้าได้ 3 ครั้ง',gb and gb['s']==1 and gb['left']==3 and gb['mx']==760,json.dumps(gb))
        ui=await A.ev("()=>{GDS.tab='gb';gdUI();const h=ov.innerHTML;return{tab:h.includes('🐉 บอส'),go:!!document.querySelector('[data-gda=\"gbs\"]'),rw:h.includes('ขั้น 1')&&h.includes('30,000'),first:h.includes('คนแรก')}}")
        rep('แท็บ 🐉 บอส ในเมนูกิลด์ (ปุ่มท้า · รางวัลขั้น · อันดับ)',all(ui.values()),json.dumps(ui))
        # ---- A ท้า ----
        pb0=await A.ev("()=>me.pb&&me.pb.wb||0")
        await A.ev("()=>{document.querySelector('[data-gda=\"gbs\"]').click()}");await A.wait(1500)
        inn=await A.ev("()=>[isWB(),!!GBS.go,MAPS[curMap].boss.n,MAPS[curMap].n]")
        rep('กดท้า → เข้าลานอสูรกิลด์ (ชื่อบอสตามขั้น)',inn[0] and inn[1] and 'ขั้น 1' in inn[2] and 'GB' in inn[3],json.dumps(inn,ensure_ascii=False))
        ok=await A.ev(FIN,2000)
        await A.wait(1500)
        st=await A.ev("()=>({s:GDS.g.gb.s,hp:GDS.g.gb.hp,left:GDS.g.gb.left,my:GDS.g.gb.my,pb:me.pb&&me.pb.wb||0,bh:window.__bh.slice(-4)})")
        rep('จบรอบ → ส่งดาเมจ 2,000 · ทะลุล้มขั้น 1 (760) ไปหักขั้น 2 · เหลือ 2 ครั้ง',ok and st['s']==2 and st['hp']==1312-1240 and st['left']==2 and st['my']['d']==2000,json.dumps(st,ensure_ascii=False))
        rep('ไม่นับสถิติบอสโลกส่วนตัว',st['pb']==pb0,str([pb0,st['pb']]))
        again=await A.ev("()=>{dg.ph='win';wbStart();return [dg.ph,banner&&banner.s||'']}")
        rep('ในลานกิลด์เริ่มรอบใหม่เองไม่ได้ (1 ครั้งท้า = 1 รอบ)',again[0]=='win' and 'จบแล้ว' in again[1],json.dumps(again,ensure_ascii=False))
        bk=await B.ev("()=>window.__bh.join(' | ')")
        rep('สมาชิกคนอื่นได้แจ้งเตือนเมื่อล้มขั้น',('ล้มอสูรกิลด์ขั้น 1' in bk),bk[-160:])
        await A.ev("()=>{enterMap(1,{x:CX+300,y:CY+380})}");await A.wait(1500)
        # ---- B: รับรางวัลก่อนท้าไม่ได้ · ออกกลางคันก็ส่งดาเมจ ----
        await B.ev("()=>{window.__bh=[];gdEmit('gbc',{s:1})}");await A.wait(1000)
        nb=await B.ev("()=>window.__bh.join('|')")
        rep('ยังไม่ได้ท้า รับรางวัลขั้นไม่ได้',('ต้องท้า' in nb),nb)
        await B.ev("()=>{gdEmit('gbs')}");await A.wait(1800)
        await B.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if(isWB()&&dg&&dg.ph==='boss'){clearInterval(iv);WB.dmg=500;enterMap(1,{x:CX+340,y:CY+380});r(1)}else if(Date.now()-t0>8000){clearInterval(iv);r(0)}},100)})")
        await A.wait(2000)
        await B.ev(GQ);await A.wait(800)
        sb=await B.ev("()=>({s:GDS.g.gb.s,my:GDS.g.gb.my,go:!!GBS.go,name:MAPS[Object.keys(MAPS).map(Number).find(k=>k>=82000&&k<83000&&MAPS[k].wb)]?.boss?.n||''})")
        rep('ออกจากลานกลางคัน → ส่งดาเมจเท่าที่ทำได้ (ล้มขั้น 2)',sb['s']==3 and sb['my']['d']==500 and not sb['go'],json.dumps(sb,ensure_ascii=False))
        rep('ออกจากลานแล้วชื่อบอสโลกกลับเป็นปกติ','อสูรกิลด์' not in sb['name'],sb['name'])
        g0=await B.ev("()=>me.gold")
        await B.ev("()=>{gdEmit('gbc',{s:1})}");await A.wait(900)
        await B.ev("()=>{gdEmit('gbc',{s:2})}");await A.wait(900)
        await B.ev("()=>{window.__bh=[];gdEmit('gbc',{s:2})}");await A.wait(900)
        cb=await B.ev("(g0)=>({g:me.gold-g0,cl:GDS.g.gb.cl,bh:window.__bh.join('|'),gbs:me.stt.gbs|0})",g0)
        rep('รับรางวัลขั้น 1+2 (30,000+60,000) · รับซ้ำไม่ได้',90000<=cb['g']<90600 and sorted(cb['cl'])==[1,2] and 'ไปแล้ว' in cb['bh'] and cb['gbs']==2,json.dumps(cb,ensure_ascii=False))
        nc=await B.ev("()=>{window.__bh=[];gdEmit('gbc',{s:3})}");await A.wait(900)
        rep('ขั้นที่ยังไม่ล้ม รับไม่ได้','ยังไม่ถูกล้ม' in await B.ev("()=>window.__bh.join('|')"))
        # ---- โทเคนปลอม / ครบวันละ 3 ----
        await A.ev("()=>{window.__bh=[];gdEmit('gbh',{tk:'deadbeef0000',d:1e9})}");await A.wait(900)
        fk=await A.ev("()=>[window.__bh.join('|'),GDS.g.gb.s]")
        rep('ส่งดาเมจโดยไม่มีรอบท้า (โทเคนปลอม) ไม่ได้','หมดอายุ' in fk[0] and fk[1]==3,json.dumps(fk,ensure_ascii=False))
        for i in range(2):
            await A.ev("()=>{gdEmit('gbs')}");await A.wait(1600)
            await A.ev(FIN,0);await A.wait(900)
            await A.ev("()=>{enterMap(1,{x:CX+300,y:CY+380})}");await A.wait(1200)
        await A.ev("()=>{window.__bh=[];gdEmit('gbs')}");await A.wait(1000)
        lim=await A.ev("()=>[window.__bh.join('|'),GDS.g.gb.left,isWB()]")
        rep('ท้าครบ 3 ครั้งต่อวันแล้ว ท้าไม่ได้อีก','ครบ 3' in lim[0] and lim[1]==0 and not lim[2],json.dumps(lim,ensure_ascii=False))
        rk=await A.ev("()=>GDS.g.gb.rk.map(r=>[r[0],r[1],r[2]])")
        rep('อันดับดาเมจในกิลด์เรียงถูก',rk==[['Ann',2000,3],['Bee',500,1]],json.dumps(rk,ensure_ascii=False))
        out=await Cc.ev("()=>{window.__bh=[];gdEmit('gbs')}");await A.wait(900)
        rep('คนนอกกิลด์ท้าไม่ได้','ยังไม่มีกิลด์' in await Cc.ev("()=>window.__bh.join('|')"))
        # ---- เซิร์ฟเวอร์รีสตาร์ต ข้อมูลยังอยู่ ----
        p.terminate();p.wait();p=restart()
        await A.wait(4000)
        await A.ev(GQ);await A.wait(1200)
        ps=await A.ev("()=>GDS.g&&GDS.g.gb&&[GDS.g.gb.s,GDS.g.gb.left,GDS.g.gb.rk.length]")
        rep('รีสตาร์ตเซิร์ฟเวอร์ ข้อมูลบอสกิลด์ยังอยู่',ps==[3,0,2],json.dumps(ps))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
