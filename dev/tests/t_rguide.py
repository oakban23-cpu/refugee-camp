"""v403 คู่มือรูน: ผู้เล่นใหม่ Lv 10 ทำครบ 5 ขั้นผ่านการ์ด (ออโต้เดินไปไอริส · สร้าง · ใส่ · ใช้ 3 ครั้ง · ลิงก์รูนเสริม)"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
SHOT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/fx/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Rookie','archer',9)
        await A.ev("()=>{ov.hidden=true;enterMap(1,{x:CX,y:CY+200})}");await A.wait(2500)
        rep('Lv 9: ยังไม่มีการ์ด', await A.ev("()=>{const e=$('rnq');return !e||e.hidden}"))
        await A.ev("()=>{gmSetLv(10)}");await A.wait(1500)
        st=await A.ev("()=>{const e=$('rnq');return {vis:!!e&&!e.hidden,tx:e&&e.innerText,step:rgStep(),sh:rnSt().sh|0}}")
        rep('Lv 10: การ์ดคู่มือรูนขึ้น ขั้น 0', st['vis'] and st['step']==0, json.dumps(st,ensure_ascii=False))
        await A.pg.screenshot(path=SHOT+'rguide_card.png')
        sh0=st['sh']
        await A.ev("()=>{$('rnq').click()}")
        for i in range(40):
            await A.wait(500)
            o=await A.ev("()=>({open:!ov.hidden&&ov.dataset.k==='rune',aq:!!AQ,step:rgStep(),d:Math.round(Math.hypot(me.x-MAPS[1].npc5.x,me.y-MAPS[1].npc5.y))})")
            if o['step']>=1: break
        await A.wait(600)
        o=await A.ev("()=>({open:!ov.hidden&&ov.dataset.k==='rune',aq:!!AQ,step:rgStep(),sh:rnSt().sh|0,note:(ov.querySelector('.note')||{}).innerText})")
        rep('แตะการ์ด → เดินไปไอริสเอง เปิดหน้าช่างรูน · ขั้น 1 สำเร็จ ได้ผงรูน 30', o['open'] and o['step']==1 and o['sh']-sh0==30 and not o['aq'], json.dumps(o,ensure_ascii=False)+f' after {i*0.5:.1f}s')
        await A.pg.screenshot(path=SHOT+'rguide_ui.png')
        await A.ev("()=>{const b=ov.querySelector('[data-rnc]:not([disabled])');b&&b.click()}");await A.wait(1600)
        o=await A.ev("()=>({step:rgStep(),u:Object.keys(rnSt().u),note:(ov.querySelector('.note')||{}).innerText})")
        rep('กดสร้าง → ขั้น 2 สำเร็จ', o['step']==2, json.dumps(o,ensure_ascii=False))
        await A.ev("()=>{const b=ov.querySelector('[data-rne]');b&&b.click()}");await A.wait(1600)
        o=await A.ev("()=>({step:rgStep(),e:JSON.stringify(rnSt().e)})")
        rep('กดใส่ → ขั้น 3 สำเร็จ', o['step']==3, json.dumps(o,ensure_ascii=False))
        await A.ev("()=>{ov.hidden=true;enterMap(2,{x:MAPS[2].nests[0][0]-120,y:MAPS[2].nests[0][1]+40})}");await A.wait(3000)
        for i in range(3):
            await A.ev("()=>{const k=[0,1,3,4,5].find(k=>rnOf(k));me.mp=me.mm;me.sk[k]=0;const m=mons.find(q=>q.t<3&&q.hp>0);if(m)lockId=m.id;useSkill(k)}");await A.wait(1300)
        o=await A.ev("()=>({step:rgStep(),gc:rgSt().gc,vis:!$('rnq').hidden})")
        rep('ใช้สกิลที่ใส่รูน 3 ครั้ง → ขั้น 4 · การ์ดซ่อนรอ Lv 20', o['step']==4 and not o['vis'], json.dumps(o))
        await A.ev("()=>{gmSetLv(20)}");await A.wait(2500)
        o=await A.ev("()=>({vis:!$('rnq').hidden,sock:sgSockN(),own:Object.keys(sgSt().i)})")
        rep('Lv 20: การ์ดขั้นสุดท้ายขึ้น + มีรูนเสริมฟรี', o['vis'] and o['sock']>=1 and len(o['own'])>=1, json.dumps(o))
        await A.ev("()=>{ov.hidden=true;enterMap(1,{x:CX,y:CY+200})}");await A.wait(2500)
        await A.ev("()=>{$('rnq').click()}")
        for i in range(40):
            await A.wait(500)
            if await A.ev("()=>!ov.hidden&&ov.dataset.k==='rune'"): break
        o=await A.ev("()=>({tab:SGTAB,txt:(ov.innerText||'').slice(0,40)})")
        rep('แตะการ์ด → เปิดแท็บรูนเสริมที่ไอริส', o['tab']=='sup', json.dumps(o,ensure_ascii=False))
        await A.ev("()=>{const X=sgSt(),id=Object.keys(X.i).find(id=>sgOk(id,0))||Object.keys(X.i)[0];X.l[0]=[id];runeUI()}");await A.wait(1800)
        o=await A.ev("()=>({step:rgStep(),vis:!$('rnq').hidden,sg:Object.values(sgSt().i).reduce((a,b)=>a+b,0)})")
        rep('ลิงก์รูนเสริม → จบคู่มือ การ์ดหาย + ได้รูนเสริมเพิ่ม', o['step']==5 and not o['vis'] and o['sg']>=4, json.dumps(o))
        o=await A.ev("()=>{const c=sgClean(JSON.parse(JSON.stringify(sgSt())));return {gd:c.gd,gc:c.gc}}")
        rep('เซฟ: sgClean เก็บความคืบหน้า', o['gd']==5, json.dumps(o))
        # ตัวเก่าที่มีรูนแล้ว
        B=await new_client(b,'Vet','mage',40)
        o=await B.ev("()=>{const S=rnSt();S.u[RUNES.mage[0].a[0]]=1;S.e[0]='a';delete sgSt().gd;return {step:rgStep()}}")
        rep('ตัวเก่าที่มีรูนแล้ว: ข้ามไปขั้นรูนเสริม', o['step']==4, json.dumps(o))
        errs=[x for x in A.errs+B.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
