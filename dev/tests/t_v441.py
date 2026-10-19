"""v441 ปุ่มตีบวกเก่าในหน้าอุปกรณ์"""
import asyncio,sys,json
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}"
MK="()=>{const it=genItem(60,'w',5,5);it.u=12;me.bag.unshift(it);me.gold=1e9;me.inv.s2=0;return 0}"
BTN="""()=>{gearUI();const b=[...ov.querySelectorAll('button')].filter(x=>/ตีบวก|เตาหลอม/.test(x.textContent));return b.map(x=>[x.textContent.trim(),x.disabled,x.dataset.up||''])}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',99)
        await A.ev(CLR);await A.ev("()=>{enterMap(2,{x:1600,y:1600})}");await A.wait(2500);await A.ev(CLR)
        await A.ev(MK)
        out=await A.ev("""()=>{gearUI();const c=ov.querySelector('[data-bag="0"],[data-bi="0"],[data-gi="0"]');let det='';for(const sel of ['[data-gs]','.cell']){}return ov.innerHTML.includes('data-up=')}""")
        u0=await A.ev("()=>me.bag[0].u")
        dir1=await A.ev("()=>{const s0=me.inv.s2,g0=me.gold,u=me.bag[0].u;upgradeItem('bag:0');return[me.bag[0].u-u,me.gold-g0,ov.dataset.k,!!banner&&banner.s]}")
        rep('นอกค่าย: เรียก upgradeItem ตรง ๆ ไม่ตีบวก ไม่เสียทอง',dir1[0]==0 and dir1[1]==0,str(dir1))
        h=await A.ev("()=>upBtn(me.bag[0],'bag:0')")
        rep('นอกค่าย: ปุ่มในหน้าอุปกรณ์กดไม่ได้ (บอกให้ไปช่างในค่าย)','disabled' in h and 'data-up' not in h,h[:120])
        await A.ev("()=>{enterMap(1,{x:CX,y:CY+100})}");await A.wait(2500);await A.ev(CLR)
        h=await A.ev("()=>upBtn(me.bag[0],'bag:0')")
        rep('ในค่าย: ปุ่มกลายเป็นทางลัด «ไปเตาหลอม»','data-up="bag:0"' in h and 'เตาหลอม' in h and 'disabled' not in h,h[:140])
        r=await A.ev("""()=>{const g0=me.gold,u=me.bag[0].u;const d=document.createElement('div');d.innerHTML=upBtn(me.bag[0],'bag:0');const bt=d.firstChild;ov.appendChild(bt);bt.click();return[me.bag[0].u-u,me.gold-g0,ov.dataset.k,smSel,!ov.hidden,!!ov.querySelector('[data-smu]')]}""")
        rep('ในค่าย: กดแล้วเปิดเตาหลอมพร้อมเลือกไอเทมนั้น · ไม่มีการตีบวกด้วยกติกาเก่า',r==[0,0,'smith','bag:0',True,True],str(r))
        e=await A.ev("()=>{me.eq.w=me.bag[0];const h=upBtn(me.eq.w,'eq:w');upgradeItem('eq:w');return[h.includes('data-up=\"eq:w\"'),smSel,ov.dataset.k]}")
        rep('ไอเทมที่สวมอยู่ก็พาไปเตาหลอมถูกชิ้น',e==[True,'eq:w','smith'],str(e))
        Es=[x for x in A.errs if 'Failed to load resource' not in x];rep('ไม่มี error',not Es,str(Es[:3]))
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
