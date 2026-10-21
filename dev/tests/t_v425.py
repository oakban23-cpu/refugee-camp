"""v425 กิลด์ + มีอะไรใหม่ + คำแนะนำครั้งแรก"""
import asyncio, sys, json, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
WNV_='v475'
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
PTYJS=open(__file__.rsplit('/',1)[0]+'/t_stack.py').read().split('PTYJS="""')[1].split('"""')[0]
GQ="()=>{gdEmit('q')}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        names=[('Ann','melee',60),('Bee','mage',60),('Cid','archer',60),('Dan','sup',15)]
        C=[await new_client(b,n,c,lv) for n,c,lv in names]
        A,B,Cc,Dd=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.gold=100000;me.x=CX+300+i*40;me.y=CY+380;setInterval(()=>{if(banner&&banner.s&&banner.s!==window.__bl){window.__bl=banner.s;window.__bn=(window.__bn||'')+'|'+banner.s}},50)}",i)
        await A.wait(2500)
        rep('เมนูมีปุ่ม 🏰 กิลด์ และ 🆕 มีอะไรใหม่',await A.ev("()=>!!$('gdb')&&!!$('wnb')"))
        # ---- ตั้งกิลด์ ----
        await A.ev("()=>{GDS.mk.e=4;GDS.mk.col=2;gdUI();$('gdnm').value='ทดสอบกิลด์';$('gdtg').value='tst';document.querySelector('[data-gda=\"mk\"]').click()}");await A.wait(1500)
        r=await A.ev("()=>[GDS.g&&GDS.g.nm,GDS.g&&GDS.g.tag,GDS.g&&GDS.g.r,me.gold,GDS.g&&GDS.g.e]")
        rep('ตั้งกิลด์ (หักทอง 30,000 · เป็นหัวหน้า)',r[0]=='ทดสอบกิลด์' and r[1]=='TST' and r[2]==2 and 68000<=r[3]<=75000 and r[4]=='🐉',json.dumps(r,ensure_ascii=False))
        await Cc.ev("()=>{gdEmit('mk',{nm:'ทดสอบกิลด์',tag:'ZZZ',e:0,col:0})}");await A.wait(900)
        rep('ชื่อกิลด์ซ้ำตั้งไม่ได้',await Cc.ev("()=>!GDS.g&&(window.__bn||'').includes('มีคนใช้แล้ว')"))
        await Dd.ev("()=>{gdEmit('mk',{nm:'กิลด์เด็ก',tag:'KID',e:0,col:0})}");await A.wait(900)
        rep('เลเวลไม่ถึง 20 ตั้งกิลด์ไม่ได้',await Dd.ev("()=>!GDS.g&&(window.__bn||'').includes('เลเวล')"))
        # ---- เชิญ/เข้า ----
        await A.ev("()=>{GDS.tab='mem';gdUI();$('gdiv').value='Bee';document.querySelector('[data-gda=\"inv\"]').click()}");await A.wait(1200)
        iv=await B.ev("()=>GDS.inv.map(q=>q.nm)")
        rep('เชิญด้วยชื่อ → อีกฝ่ายได้คำเชิญ',iv==['ทดสอบกิลด์'],json.dumps(iv,ensure_ascii=False))
        await B.ev("()=>{gdUI();document.querySelector('[data-gda^=\"acc:\"]').click()}");await A.wait(1500)
        await A.ev(GQ);await A.wait(800)
        mm=await A.ev("()=>GDS.g.mem.map(m=>[m[1],m[4],m[5]])")
        rep('รับคำเชิญ → เป็นสมาชิก (หัวหน้าเห็นในรายชื่อ ออนไลน์)',any(m[0]=='Bee' and m[1]==0 and m[2]==1 for m in mm),json.dumps(mm,ensure_ascii=False))
        await A.wait(1500)
        gt=await Cc.ev("([a,b])=>[others[a]&&others[a].gt,others[b]&&others[b].gt]",[A.uid,B.uid])
        rep('คนนอกกิลด์เห็นตราใต้ชื่อ (เซิร์ฟเวอร์รับรอง)',gt[0]=='🐉|TST|2' and gt[1]=='🐉|TST|2',json.dumps(gt,ensure_ascii=False))
        n=await Cc.ev("()=>{let n=0;const _d=gdDrawTag;gdDrawTag=function(){n++;return _d.apply(this,arguments)};draw();draw();gdDrawTag=_d;return n}")
        rep('วาดตราใต้เท้าตัวละคร',n>=2,str(n))
        # ---- แชต ----
        await B.ev("()=>{GDS.tab='ch';gdUI();$('gdch').value='สวัสดีกิลด์';document.querySelector('[data-gda=\"ch\"]').click()}");await A.wait(1000)
        ch=await A.ev("()=>[(GDS.g.log||[]).slice(-1)[0],chatLog.slice(-3).map(q=>q.t)]")
        rep('แชตกิลด์ถึงสมาชิกทุกคน (ขึ้นแชตด้วย)',ch[0] and ch[0]['t']=='สวัสดีกิลด์' and any('สวัสดีกิลด์' in t for t in ch[1]),json.dumps(ch,ensure_ascii=False))
        cl=await Cc.ev("()=>chatLog.some(q=>String(q.t).includes('สวัสดีกิลด์'))")
        rep('คนนอกกิลด์ไม่เห็นแชตกิลด์',not cl)
        # ---- ตำแหน่ง ----
        await B.ev("()=>{window.__bn='';gdEmit('inv',{to:'Dan'})}");await A.wait(900)
        rep('สมาชิกธรรมดาเชิญไม่ได้',await B.ev("()=>(window.__bn||'').includes('เฉพาะหัวหน้า')"))
        bm=await A.ev("(u)=>GDS.g.mem.find(m=>m[1]==='Bee')[0]",B.uid)
        await A.ev("(t)=>gdAct('rk:'+t+':1')",bm);await A.wait(1000)
        await B.ev("()=>{gdEmit('inv',{to:'Dan'})}");await A.wait(1000)
        await Dd.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1200)
        rd=await B.ev("()=>[GDS.g.r,GDS.g.mem.length]");dg=await Dd.ev("()=>GDS.g&&GDS.g.tag")
        rep('ตั้งรองหัวหน้า → เชิญได้ · คนเลเวล 15 เข้ากิลด์ได้',rd[0]==1 and dg=='TST',json.dumps([rd,dg]))
        am=await A.ev("()=>GDS.g.mem.find(m=>m[1]==='Ann')[0]")
        await B.ev("(t)=>{window.__bn='';gdEmit('kick',{t})}",am);await A.wait(900)
        rep('รองหัวหน้าเตะหัวหน้าไม่ได้',await B.ev("()=>(window.__bn||'').includes('ต่ำกว่า')"))
        dm=await A.ev("()=>GDS.g.mem.find(m=>m[1]==='Dan')[0]")
        await A.ev("(t)=>{gdAct('kick:'+t);gdAct('kick:'+t)}",dm);await A.wait(1200)
        rep('หัวหน้าเตะสมาชิก (กดยืนยัน 2 ครั้ง)',await Dd.ev("()=>!GDS.g"))
        # ---- ปลอมตัว ----
        amid=await A.ev("()=>mkMid()")
        await Cc.ev("(m)=>{window.__bn='';emitM('gdo',{op:'dis',mid:m})}",amid);await A.wait(900)
        still=await A.ev(GQ);await A.wait(800)
        rep('ใช้ mid ของคนอื่นยุบกิลด์ไม่ได้ (ชื่อไม่ตรง)',await A.ev("()=>!!GDS.g")  and await Cc.ev("()=>(window.__bn||'').includes('ไม่ตรง')"))
        # ---- ภารกิจรายสัปดาห์ ----
        for c in C: await c.ev("()=>{GDS.wkT=1e12;GDS.acc={k:0,b:0,g:0}}")
        await A.wait(1000)
        g0=await A.ev("()=>me.gold")
        await A.ev("()=>gdEmit('wk',{a:{k:3,b:1,g:1}})");await A.wait(1200);await A.ev(GQ);await A.wait(800)
        w=await A.ev("()=>[GDS.g.wk.done,GDS.g.lvl]")
        rep('ภารกิจกิลด์ครบ → กิลด์เลเวลอัป',w[0]==1 and w[1]==2,json.dumps(w))
        await A.ev("()=>gdAct('wkc')");await A.wait(1200)
        g1=await A.ev("()=>[me.gold,(me.gth.m.d7|0)+(me.gth.m.d8|0),GDS.g.wk.cl]")
        rep('รับรางวัลสัปดาห์ (ทอง+สีย้อมหายาก) ได้ครั้งเดียว',g1[0]==g0+6000 and g1[1]==1 and g1[2]==1,json.dumps([g0,g1]))
        await A.ev("()=>{window.__bn='';gdAct('wkc')}");await A.wait(900)
        await B.ev("()=>{window.__bn='';gdAct('wkc')}");await A.wait(900)
        bct=await B.ev("()=>GDS.g?GDS.g.wk.ct:0");bb=await B.ev("()=>window.__bn||''")
        rep('รับซ้ำไม่ได้ · คนไม่ได้ช่วยรับไม่ได้',await A.ev("()=>(window.__bn||'').includes('ไปแล้ว')") and (('ต้องช่วย' in bb) if bct==0 else ('รางวัลกิลด์' in bb)),json.dumps([bct,bb],ensure_ascii=False))
        xb=await A.ev("()=>fdM('xp')-(GDS.g?0:0)")
        rep('โบนัส EXP ตามเลเวลกิลด์',await A.ev("()=>gdXpB()")==0.02,str(xb))
        # ---- นับแต้มจากการเล่นจริง ----
        await B.ev("()=>{GDS.wkT=0;me.stt.k=(me.stt.k|0)+5}");await A.wait(2500)
        ct=await B.ev("()=>new Promise(r=>setTimeout(()=>r(GDS.g.wk.ct),1800))")
        rep('ล่ามอนจริง → แต้มช่วยภารกิจขึ้นเอง',ct>=5,str(ct))
        # ---- ออก/ยุบ ----
        await B.ev("()=>{gdAct('lv');gdAct('lv')}");await A.wait(1200)
        rep('ออกจากกิลด์',await B.ev("()=>!GDS.g") and await A.ev("()=>{gdEmit('q');return true}"))
        await A.wait(800)
        await A.ev("()=>{gdAct('dis');gdAct('dis')}");await A.wait(1200)
        rep('หัวหน้ายุบกิลด์',await A.ev("()=>!GDS.g"))
        # ---- มีอะไรใหม่ + คำแนะนำ ----
        ctx=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True);pg=await ctx.new_page();E=Client(ctx,pg,'E')
        await pg.goto(URL);await pg.wait_for_timeout(2000);await pg.evaluate("()=>{window.__keepWN=1;localStorage.removeItem('refugee_wn');localStorage.removeItem('refugee_tips')}")
        await pg.evaluate(SETUP.replace("if(!window.__keepWN)","if(false)"),['melee','Eve',40]);await pg.wait_for_timeout(2500)
        await E.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await E.wait(2500)
        wn=await E.ev("()=>{const p=$('wnp');return [p&&!p.hidden,p&&p.querySelectorAll('.it').length]}")
        await E.ev("()=>{const b=document.querySelector('#wnp [data-wnx]');if(b)b.click()}");await E.wait(1500)
        wn2=await E.ev("()=>[$('wnp').hidden,localStorage.getItem('refugee_wn')]")
        rep('มีอะไรใหม่เด้งครั้งเดียว ปิดแล้วไม่เด้งซ้ำ',wn[0] and wn[1]>=6 and wn2[0] and wn2[1]==WNV_,json.dumps([wn,wn2]))
        await E.ev("([a,e])=>{PTY={id:'p',lead:a,mem:[{u:a,n:'Ann'},{u:e,n:'Eve'}]};TIPS.t=0}",[A.uid,await E.ev("()=>uid")]);await E.wait(2500)
        tp=await E.ev("()=>{const c=$('tipc');return [c&&!c.hidden,c&&c.textContent.includes('🧗'),JSON.parse(localStorage.getItem('refugee_tips')||'[]')]}")
        rep('คำแนะนำครั้งแรก: เข้าปาร์ตี้ → บอกวิธีขี่คอ (แสดงครั้งเดียว)',tp[0] and tp[1] and 'pty' in tp[2],json.dumps(tp,ensure_ascii=False))
        Es=[e for c in C+[E] for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    await asyncio.sleep(1.5)
    try:
        gj=open(DD+'/guild.json').read();rep('บันทึกข้อมูลกิลด์ลงดิสก์ตอนปิดเซิร์ฟเวอร์',gj.startswith('{') and '"n"' in gj,gj[:80])
    except Exception as e: rep('บันทึกข้อมูลกิลด์ลงดิสก์ตอนปิดเซิร์ฟเวอร์',False,str(e))
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
