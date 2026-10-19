"""v453 บ้านกิลด์ รอบ 2: ฟาร์ม · สวนผลไม้ · โกดัง · ครัวกิลด์ · แจกเสบียง · ร้านกิลด์"""
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
        await A.ev("()=>{gdEmit('mk',{nm:'ฟาร์มทดสอบ',tag:'FM',e:3,col:3})}");await A.wait(1300)
        await A.ev("()=>{gdEmit('inv',{to:'Bee'})}");await A.wait(1100)
        await B.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1300)
        for c in C: await c.ev("()=>{ghEnter()}")
        await A.wait(2000)
        hq=await A.ev("()=>{const H=GDS.g.hq;return{farm:H.farm,trees:H.trees,st:H.st,buff:H.buff,gift:H.gift,buy:H.buy}}")
        rep('ข้อมูลฟาร์มจากเซิร์ฟเวอร์: ขั้น 1 = 2 แปลงว่าง · ยังไม่มีต้นไม้ · โกดังว่าง',hq['farm']==[None,None] and hq['trees']==[] and hq['st']=={} and hq['buff'] is None,json.dumps(hq))
        # ---- ปุ่มฟาร์ม ----
        f1=await A.ev("()=>{me.x=CX+450;me.y=CY-120;return new Promise(r=>setTimeout(()=>{const b=$('tnb');r([b.hidden,b.textContent])},400))}")
        rep('เดินเข้าแปลงผัก → ปุ่ม «ฟาร์มกิลด์»',not f1[0] and 'ฟาร์มกิลด์' in f1[1],json.dumps(f1,ensure_ascii=False))
        await A.ev("()=>{$('tnb').click()}");await A.wait(500)
        u=await A.ev("()=>({k:ov.dataset.k,tab:GHS.tab,plant:ov.querySelectorAll('[data-gh2^=\"p:0:\"]').length,lock:(ov.innerHTML.match(/🔒/g)||[]).length,tabs:ov.querySelectorAll('[data-ght]').length})")
        rep('หน้าฟาร์ม: ปุ่มปลูก 4 พืช · แปลงล็อก 8 · แท็บ 4',u['k']=='gh' and u['tab']=='farm' and u['plant']==4 and u['lock']==8 and u['tabs']==4,json.dumps(u))
        await A.ev("()=>{ov.querySelector('[data-gh2=\"p:0:wheat\"]').click()}");await A.wait(900)
        await B.ev("()=>{gdEmit('hfp',{p:1,c:'pumpkin'})}");await A.wait(900)
        fm=await A.ev("()=>GDS.g.hq.farm.map(f=>f&&[f.c,f.w,f.by,Math.round(f.d/100)])")
        rep('ปลูกข้าวสาลี (หน้าจอ) + ฟักทอง (เพื่อน) · เวลาโต 4/12 ชม. (โหมดทดสอบ ÷2000)',fm==[['wheat',0,'Ann',72],['pumpkin',0,'Bee',216]],json.dumps(fm,ensure_ascii=False))
        await A.ev("()=>{window.__x=[];gdEmit('hfh',{p:1})}");await A.wait(600)
        rep('ยังไม่สุก เก็บเกี่ยวไม่ได้',any('ยังไม่สุก' in s for s in await A.ev("()=>window.__x")))
        await A.ev("()=>{window.__x=[];gdEmit('hfp',{p:0,c:'herb'})}");await A.wait(700)
        await A.ev("()=>{gdEmit('hfp',{p:2,c:'herb'})}");await A.wait(700)
        await A.ev("()=>{gdEmit('hfp',{p:1,c:'gold'})}");await A.wait(700)
        e=await A.ev("()=>window.__x")
        rep('ปลูกซ้ำ/แปลงล็อก/เมล็ดปลอม ไม่ได้',len(e)==3 and 'ปลูกอยู่แล้ว' in e[0] and 'ยังไม่เปิด' in e[1] and 'ไม่มีเมล็ด' in e[2],json.dumps(e,ensure_ascii=False))
        # ---- รดน้ำ ----
        await A.ev("()=>{window.__x=[];GHS.tab='farm';ghUI();ov.querySelector('[data-gh2=\"w:1\"]').click()}");await A.wait(800)
        await A.ev("()=>{gdEmit('hfw',{p:1})}");await A.wait(700)
        await B.ev("()=>{gdEmit('hfw',{p:1})}");await A.wait(800)
        w=await A.ev("()=>{const f=GDS.g.hq.farm[1];return[f.w,f.mw,window.__x,ov.querySelector('[data-gh2=\"w:1\"]').disabled,f.r<f.d*.8]}")
        rep('รดน้ำ: คนละครั้ง (ซ้ำไม่ได้) · 2 คนรดแล้ว 💧2 → เหลือเวลาไม่ถึง 80% · ปุ่มรดของเรากดไม่ได้',w[0]==2 and w[1]==1 and any('รดแปลงนี้ไปแล้ว' in s for s in w[2]) and w[3] and w[4],json.dumps(w,ensure_ascii=False))
        dr=await A.ev("()=>new Promise(r=>setTimeout(()=>r({ck:GHS.ck,err:window.__err.length}),300))")
        rep('วาดพืชในแปลงได้ (ไม่มี error)',dr['err']==0,json.dumps(dr))
        await A.wait(3500)
        await A.ev(GQ);await A.wait(700)
        rp=await A.ev("()=>{GHS.tab='farm';ghUI();return [!!ov.querySelector('[data-gh2=\"h:0\"]'),ov.innerHTML.includes('สุกแล้ว')]}")
        rep('ข้าวสาลีสุก → ปุ่มเก็บเกี่ยวขึ้น',rp==[True,True],json.dumps(rp))
        pt0=await A.ev("()=>GDS.g.hq.pt")
        await A.ev("()=>{ov.querySelector('[data-gh2=\"h:0\"]').click()}");await A.wait(900)
        hv=await A.ev("(pt0)=>({st:GDS.g.hq.st,f0:GDS.g.hq.farm[0],pt:GDS.g.hq.pt-pt0,fl:GDS.g.hq.fl.slice(-1)[0],ui:ov.innerHTML.includes('เก็บเกี่ยว')})",pt0)
        rep('เก็บเกี่ยว → ข้าวสาลี ×6 เข้าโกดัง · แปลงว่าง · แต้มกิลด์ +1 · บันทึก',hv['st']=={'wheat':6} and hv['f0'] is None and hv['pt']==1 and hv['fl']['k']=='h',json.dumps(hv,ensure_ascii=False))
        # ---- ครัว ----
        await B.ev("()=>{window.__x=[];gdEmit('hck',{r:'bread'})}");await A.wait(700)
        rep('สมาชิกธรรมดาสั่งครัวไม่ได้',any('เฉพาะหัวหน้า' in s for s in await B.ev("()=>window.__x")))
        k1=await A.ev("()=>{GHS.tab='food';ghUI();const b=ov.querySelector('[data-gh2=\"c:bread\"]');return [!!b,b&&b.disabled,!!ov.querySelector('[data-gh2=\"c:feast\"]')]}")
        await A.ev("()=>{window.__x=[];gdEmit('hck',{r:'bread'})}");await A.wait(700)
        rep('ข้าวสาลี 6/8 → ทำขนมปังไม่ได้ (ปุ่มกดไม่ได้ + เซิร์ฟเวอร์ปฏิเสธ)',k1[0] and k1[1] and any('ไม่พอ' in s for s in await A.ev("()=>window.__x")),json.dumps(k1))
        await A.ev("()=>{gdEmit('hfp',{p:0,c:'wheat'})}");await A.wait(8200)
        await A.ev("()=>{gdEmit('hfh',{p:0})}");await A.wait(900)
        x0=await A.ev("()=>fdM('xp')");x0b=await B.ev("()=>fdM('xp')")
        await A.ev("()=>{GHS.tab='food';ghUI();ov.querySelector('[data-gh2=\"c:bread\"]').click()}");await A.wait(200)
        c1=await A.ev("()=>ov.innerHTML.includes('ยืนยัน')")
        await B.ev("()=>{window.__bh=[];window.__sm=[]}")
        await A.ev("()=>{ov.querySelector('[data-gh2=\"c:bread\"]').click()}");await A.wait(1500)
        bf=await A.ev("(x0)=>({b:GDS.g.hq.buff&&GDS.g.hq.buff.k,r:GDS.g.hq.buff&&Math.round(GDS.g.hq.buff.r/60000),st:GDS.g.hq.st,dx:+(fdM('xp')-x0).toFixed(3),bl:buffList().some(o=>o.k==='ghb')})",x0)
        bb=await B.ev("(x0)=>({dx:+(fdM('xp')-x0).toFixed(3),bh:window.__bh.join('|'),sm:window.__sm.join('|')})",x0b)
        rep('ทำขนมปัง (ยืนยัน 2 ครั้ง) → บัฟ 60 นาที · หักข้าวสาลี 8 · EXP +5% · มีในแถบบัฟ',c1 and bf['b']=='bread' and bf['r']==60 and bf['st']=={'wheat':4} and bf['dx']==0.05 and bf['bl'],json.dumps(bf,ensure_ascii=False))
        rep('สมาชิกทุกคนได้บัฟ + แจ้งเตือน',bb['dx']==0.05 and 'ขนมปังโฮลวีต' in bb['bh'] and 'ขนมปังโฮลวีต' in bb['sm'],json.dumps(bb,ensure_ascii=False)[:300])
        # ---- แจกเสบียง ----
        bid=await A.ev("()=>GDS.g.mem.find(m=>m[1]==='Bee')[0]")
        await A.ev("(bid)=>{GHS.tab='food';ghUI();$('ghgt').value=bid;$('ghgt').onchange();const i=ov.querySelector('[data-ghgi=\"wheat\"]');i.value=4;i.oninput();ov.querySelector('[data-gh2=\"v\"]').click()}",bid)
        await A.wait(1200)
        gv=await B.ev("()=>({gift:GDS.g.hq.gift,bh:window.__bh.join('|')})")
        sa=await A.ev("()=>GDS.g.hq.st")
        rep('หัวหน้าแจกข้าวสาลี 4 ให้ Bee → โกดังลด · Bee ได้แจ้งเตือน + มีเสบียงรอรับ (มูลค่า 8,000)',sa=={'wheat':0} and gv['gift'] and gv['gift']['g']==8000 and 'แจกเสบียง' in gv['bh'],json.dumps([sa,gv],ensure_ascii=False))
        g0=await B.ev("()=>me.gold")
        await B.ev("()=>{GHS.tab='food';ghUI();ov.querySelector('[data-gh2=\"g\"]').click()}");await A.wait(1000)
        await B.ev("()=>{window.__x=[];gdEmit('hqg')}");await A.wait(800)
        gc=await B.ev("(g0)=>[me.gold-g0,GDS.g.hq.gift,window.__x]",g0)
        rep('Bee กดรับ → ทอง +8,000 · รับซ้ำไม่ได้',gc[0]==8000 and gc[1] is None and any('ไม่มีเสบียง' in s for s in gc[2]),json.dumps(gc,ensure_ascii=False))
        await B.ev("()=>{window.__x=[];gdEmit('hgv',{t:GDS.g.mem[0][0],it:{wheat:1}})}");await A.wait(700)
        rep('สมาชิกธรรมดาแจกเสบียงไม่ได้',any('เฉพาะหัวหน้า' in s for s in await B.ev("()=>window.__x")))
        # ---- ร้านกิลด์ ----
        await A.ev("()=>{GHS.tab='bank';GHS.amt=100000;ghUI();ov.querySelector('[data-gha=\"don\"]').click()}");await A.wait(1300)
        pt=await A.ev("()=>GDS.g.hq.pt")
        s0=await A.ev("()=>me.inv.s3|0")
        await A.ev("()=>{GHS.tab='shop';ghUI();ov.querySelector('[data-gh2=\"b:s3\"]').click()}");await A.wait(1000)
        sh=await A.ev("(s0)=>({s3:(me.inv.s3|0)-s0,pt:GDS.g.hq.pt,buy:GDS.g.hq.buy,rl:ov.querySelector('[data-gh2=\"b:rl\"]').disabled})",s0)
        rep('แต้ม 12 (เก็บเกี่ยว 2 + บริจาค 10) → แลกหินขั้นสูง ×5 (5 แต้ม) · หีบ Relic (40) กดไม่ได้',pt==12 and sh['s3']==5 and sh['pt']==7 and sh['buy']=={'s3':1} and sh['rl'],json.dumps([pt,sh]))
        await A.ev("()=>{window.__x=[];gdEmit('hqb',{i:'rl'})}");await A.wait(700)
        rep('ส่งตรงแลกของแพงเกินแต้ม → เซิร์ฟเวอร์ปฏิเสธ',any('แต้มกิลด์ไม่พอ' in s for s in await A.ev("()=>window.__x")))
        # ---- รีสตาร์ตด้วยบ้านขั้น 4 (แก้ไฟล์ข้อมูล) ----
        p.terminate();p.wait()
        fp=os.path.join(DD,'guild.json');J=json.load(open(fp))
        G=list(J['g'].values())[0];G['lvl']=6;H=G['hq'];H['t']=4;now=int(time.time()*1000);H['tr']=[now-200000]*4;H['st']={'wheat':30,'carrot':20,'pumpkin':10,'herb':10,'apple':6,'wood':0}
        mid=[m for m in G['mem'] if G['mem'][m]['n']=='Ann'][0];H['dn'][mid]['bp']=200
        json.dump(J,open(fp,'w'));p=restart()
        await A.wait(4000)
        for c in C: await c.ev(GQ)
        await A.wait(1200)
        t4=await A.ev("()=>({t:GDS.g.hq.t,n:GDS.g.hq.farm.length,tr:GDS.g.hq.trees.map(t=>[t.k,t.n]),buff:GDS.g.hq.buff&&GDS.g.hq.buff.k})")
        rep('ขั้น 4: แปลง 8 · ต้นไม้ 4 (โอ๊ก/แอปเปิลสลับ · มีผลค้าง 2 รอบ) · บัฟยังอยู่หลังรีสตาร์ต',t4['t']==4 and t4['n']==8 and t4['tr']==[['oak',2],['apple',2],['oak',2],['apple',2]] and t4['buff']=='bread',json.dumps(t4))
        tb=await A.ev("()=>{ov.hidden=true;me.x=CX+GHTP[1][0];me.y=CY+GHTP[1][1]+30;return new Promise(r=>setTimeout(()=>{const b=$('tnb');r([b.hidden,b.textContent])},400))}")
        rep('ยืนใต้ต้นไม้ → ปุ่ม «สวนผลไม้»',not tb[0] and 'สวนผลไม้' in tb[1],json.dumps(tb,ensure_ascii=False))
        await A.ev("()=>{$('tnb').click()}");await A.wait(500)
        await A.ev("()=>{ov.querySelector('[data-gh2=\"t:1\"]').click()}");await A.wait(900)
        await A.ev("()=>{gdEmit('htc',{p:0})}");await A.wait(900)
        await A.ev("()=>{window.__x=[];gdEmit('htc',{p:1})}");await A.wait(700)
        tc=await A.ev("()=>({st:GDS.g.hq.st,tr:GDS.g.hq.trees.map(t=>t.n),x:window.__x})")
        rep('เก็บแอปเปิล ×12 + ไม้ ×8 (2 รอบ) → โกดัง · เก็บซ้ำทันทีไม่ได้',tc['st']['apple']==18 and tc['st']['wood']==8 and tc['tr'][:2]==[0,0] and any('ยังไม่มีผล' in s for s in tc['x']),json.dumps(tc,ensure_ascii=False))
        # งานเลี้ยงแทนบัฟเดิม
        mh0=await A.ev("()=>{GDS.g.hq.buff=null;recalc();return me.mh}")
        await A.ev("()=>{GHS.tab='food';ghUI();ov.querySelector('[data-gh2=\"c:feast\"]').click()}");await A.wait(200)
        c2=await A.ev("()=>ov.querySelector('[data-gh2=\"c:feast\"]').textContent")
        await A.ev("()=>{ov.querySelector('[data-gh2=\"c:feast\"]').click()}");await A.wait(2600)
        fs=await A.ev("(mh0)=>({b:GDS.g.hq.buff.k,mh:+(me.mh/mh0).toFixed(3),xp:+fdM('xp').toFixed(3),gd:+fdM('gd').toFixed(3),dm:+fdM('dm').toFixed(3)})",mh0)
        rep('บ้านขั้น 4 ทำ «งานเลี้ยงกิลด์» ได้ · แทนบัฟเดิม · เลือด +3% (คำนวณใหม่เอง) · EXP/ทอง +3% · ดาเมจ +2%',fs['b']=='feast' and 1.025<=fs['mh']<=1.035 and fs['xp']>=0.03 and fs['gd']>=0.03 and fs['dm']>=0.02,json.dumps([c2,fs],ensure_ascii=False))
        # โควตาร้าน
        await A.ev("()=>{gdEmit('hqb',{i:'d8'})}");await A.wait(900)
        await A.ev("()=>{window.__x=[];gdEmit('hqb',{i:'d8'})}");await A.wait(900)
        qd=await A.ev("()=>({buy:GDS.g.hq.buy,x:window.__x,d8:dyCnt('d8')})")
        rep('แลกสีย้อมรุ้ง (80 แต้ม) ได้ · ครั้งที่ 2 ติดโควตาสัปดาห์',qd['buy'].get('d8')==1 and qd['d8']>=1 and any('โควตา' in s for s in qd['x']),json.dumps(qd,ensure_ascii=False))
        # ภาพบ้านทุกขั้น
        sz=await A.ev("()=>{const r=[];for(let t=1;t<=5;t++)r.push(ghBuild(t,'#58c06a','🛡️').cv.width);return r}")
        rep('วาดบ้าน (มีโกดัง/ครัว/สวน) ครบ 5 ขั้น',all(w>1000 for w in sz),str(sz))
        kb=await A.ev("()=>{ov.hidden=true;me.x=CX+GHKI.x;me.y=CY+GHKI.y;tentCollide();return new Promise(r=>setTimeout(()=>{const b=$('tnb');r([b.hidden,b.textContent,Math.round(me.y-CY)])},400))}")
        sb=await A.ev("()=>{me.x=CX+GHST.x;me.y=CY+GHST.y;return new Promise(r=>setTimeout(()=>{const b=$('tnb');r([b.hidden,b.textContent])},400))}")
        rep('ปุ่ม «ครัวกิลด์» / «โกดังกิลด์» หน้าอาคาร',not kb[0] and 'ครัวกิลด์' in kb[1] and not sb[0] and 'โกดังกิลด์' in sb[1],json.dumps([kb,sb],ensure_ascii=False))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
