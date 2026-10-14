import asyncio,random,json
from h import *
O='../vis/'
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'K'+str(random.randint(100,999)),'melee',130)
        ev=A.ev
        print('online',A.online)
        await ev("()=>{me.sty={s:STY.length,n:0,a:0,e:1,e4:2,p6h:2,e6:1,p7m:1,e7:1,p6b:7};me.ach=Object.assign(me.ach||{},{stB:1,stE:1,stF:1,stG:1,stH:1,stJ:1,stCa:1,stOr:1,stEs:1,stCk:1,stVs:1,stS2:1,stS4:1,stS5:1})}")
        await ev("()=>{evTab='wk';ov.hidden=false;eventUI()}");await A.wait(500);await A.pg.screenshot(path=O+'wk_tab.png')
        print('pick',await ev("()=>JSON.stringify(['mid','hi'].map(t=>{const p=wkPick(t);return [p.e[0],DT[p.e[2]].n,p.mods]}))"))
        # ความคืบหน้าภารกิจผ่าน dqProg
        await ev("()=>{for(let i=0;i<1500;i++)dqProg('kill',1);dqProg('boss',3)}")
        print('prog',await ev("()=>JSON.stringify(me.wkly.m.map(m=>[m.t,m.h,m.n]))"))
        # รับภารกิจ
        await ev("()=>{evTab='wk';eventUI()}");await A.wait(200)
        await ev("()=>ov.querySelector('[data-wkm=\"0\"]').click()");await A.wait(300)
        print('claim',await ev("()=>JSON.stringify({cl:me.wkly.m[0].cl,ss:me.sson})"))
        # เริ่มท้าทายขั้นสูง
        await ev("()=>ov.querySelector('[data-wkgo=\"hi\"]').click()");await A.wait(2000)
        st=await ev("()=>JSON.stringify({on:wkcOn(),WKC,map:curMap,dg:MAPS[curMap]&&MAPS[curMap].dg,ph:dg.ph,tl:dg.tl})");print('enter',st)
        # เงื่อนไข: ทดสอบ hurt/addHit
        print('mods',await ev("""()=>{const r={};const hp0=me.hp;gmGod=false;me.inv3=0;const h0=me.hp;hurt(100);r.hurt=h0-me.hp;me.hp=me.mh;
            const m={id:-5,x:me.x,y:me.y,hp:1e9,mh:1e9,t:1,L:130};mons.push(m);addHit(m,1000,0,0,'melee');r.monhp=1e9-m.hp;mons=mons.filter(q=>q!==m);return JSON.stringify(r)}"""))
        await A.pg.screenshot(path=O+'wk_in.png')
        # จำลองผ่านด่าน
        r=await ev("()=>{const g0=me.gold,p0=me.sson.p;try{dgReward()}catch(e){return 'ERR '+e.message}return JSON.stringify({gold:me.gold-g0,ss:me.sson.p-p0,f:me.wkly.f,c:me.wkly.c,wc:me.sson.wc,wkc:me.wkly.m.find(m=>m.t==='wkc').h,dgm:me.wkly.m.find(m=>m.t==='dg').h})}")
        print('clear',r)
        await ev("()=>{try{dgLeave()}catch(e){}}");await A.wait(1500);print('after leave',await ev("()=>JSON.stringify([WKC,curMap])"))
        # ฤดูกาล: เพิ่มคะแนนถึงบรอนซ์ + รับรางวัลขั้น + ส่งอันดับ
        await ev("()=>{ssAdd(100,'ทดสอบ');ssSendT=0;ssSend()}");await A.wait(2500)
        await ev("()=>{lbAt=0;lbFetch(true)}");await A.wait(2500)
        await ev("()=>{evTab='ss';ov.hidden=false;eventUI()}");await A.wait(800);await A.pg.screenshot(path=O+'ss_tab.png')
        print('lb',await ev("()=>JSON.stringify(lbData&&lbData[me.sson.k])"))
        await ev("()=>{const b=ov.querySelector('[data-sst=\"0\"]');if(b)b.click()}");await A.wait(300)
        print('tier',await ev("()=>JSON.stringify({tg:me.sson.tg,best:me.sson.best,ach:{ssB:me.ach.ssB}})"))
        await ev("()=>{try{achCheck()}catch(e){}}");print('achB',await ev("()=>me.ach.ssB"))
        # เซฟ/โหลด
        print('save',await ev("async()=>{lastJ='';await writeSave();const cc=cleanChar(JSON.parse(JSON.stringify(snap())));const a=JSON.stringify([cc.wkly&&cc.wkly.m.length,cc.sson]);me.wkly=null;me.sson=null;applySave(cc);return a+' | '+JSON.stringify([me.wkly&&me.wkly.m[0],me.sson&&me.sson.p])}"))
        # แท็บเดิมยังมีแท็บใหม่
        await ev("()=>{evTab='dq';eventUI()}");await A.wait(300);print('tabs',await ev("()=>[...ov.querySelectorAll('.tabs .tab')].map(t=>t.innerText).join('|')"))
        print('ERR',[e for e in A.errs if 'TUNNEL' not in e][:6])
        # ตัวละครยังไม่ปลดล็อก
        B=await new_client(b,'L'+str(random.randint(100,999)),'archer',40)
        await B.ev("()=>{evTab='wk';ov.hidden=false;eventUI()}");await B.wait(400);await B.pg.screenshot(path=O+'wk_locked.png')
        print('locked',await B.ev("()=>wkWhy('hi')"))
        await b.close()
    p.terminate()
asyncio.run(main())
