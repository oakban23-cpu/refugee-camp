"""v451 ช่างโอนบวก ไซลัส"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
MK="(sl,r,u)=>{const b=me.eq[sl]?JSON.parse(JSON.stringify(me.eq[sl])):null;if(!b)return null;b.r=r;b.u=u;delete b.ss;b.lg=0;me.bag.push(b);return b}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Tfr','melee',90)
        await A.ev("()=>{ov.hidden=true;enterMap(1,{x:CX,y:CY+60})}");await A.wait(2500)
        await A.ev("()=>{AUTO.on=false;try{aqHB(false)}catch(e){};gmGod=true;me.gold=1e9;me.inv.s1=20;me.inv.s2=20;me.inv.s3=20;me.bag=[];window.MK="+MK+"}")
        n=await A.ev("()=>new Promise(res=>{me.x=TFN.x;me.y=TFN.y+34;setTimeout(()=>{const t=$('npcb').textContent,d=$('npcb').style.display;$('npcb').click();setTimeout(()=>res([t,d,ov.dataset.k,!ov.hidden,CAMP.cols.some(([x,y,r])=>Math.hypot(TFN.x-(CX+x),TFN.y+34-(CY+y))<r)]),200)},450)})")
        rep('NPC ไซลัสอยู่ในค่าย: ยืนหน้าแล้วปุ่มคุยขึ้นชื่อถูก กดแล้วเปิดหน้าโอนบวก · ไม่มีสิ่งกีดขวางทับจุดยืน',n[0]=='คุยกับไซลัส ช่างโอนบวก' and n[1]=='block' and n[2]=='tf' and n[3] and not n[4],json.dumps(n,ensure_ascii=False))
        r=await A.ev("()=>{const S=me.eq.w;S.r=Math.max(4,S.r);delete S.ss;S.u=12;const D=MK('w',4,0);const g0=me.gold,s0=me.inv.s2,cost=tfCost(S,D),pd0=pd();U65.si=S;U65.di=D;U65.cf=0;tfDo();const a=[S.u,D.u];U65.si=S;U65.di=D;U65.cf=0;return {a,cost,dg:g0-me.gold,ds:s0-me.inv.s2}}")
        rep('โอน +12 จากอาวุธที่สวม → อาวุธในกระเป๋า: ปลายทาง +12 ต้นทาง +0 · หักทองตามราคา · หินขั้นสอง 2 ก้อน',r['a']==[0,12] and r['dg']==r['cost']>0 and r['ds']==2,json.dumps(r))
        c=await A.ev("()=>{const D=me.bag[me.bag.length-1];const S2=MK('w',4,0);const g0=me.gold;U65.si=D;U65.di=S2;U65.cf=0;tfUI();const b=document.querySelector('[data-tfgo]');b.click();const one=[D.u,S2.u,me.gold===g0];document.querySelector('[data-tfgo]').click();return {one,two:[D.u,S2.u]}}")
        rep('ต้องกดยืนยัน 2 ครั้ง (ครั้งแรกยังไม่โอน)',c['one']==[12,0,True] and c['two']==[0,12],json.dumps(c))
        e=await A.ev("()=>{const S=MK('w',4,15);const out={};const T=(k,D)=>{const u0=[S.u,D.u],g0=me.gold;U65.si=S;U65.di=D;out[k]=tfCheck(S,D);U65.cf=1;tfDo();out[k+'_ok']=S.u===u0[0]&&D.u===u0[1]&&me.gold===g0};"+
          "T('slot',MK(me.eq.a?'a':'h',4,0));T('grade',MK('w',3,0));T('higher',MK('w',4,16));const gs=me.gold;me.gold=10;T('gold',MK('w',4,0));me.gold=gs;const st=me.inv.s2;me.inv.s2=1;T('stone',MK('w',4,0));me.inv.s2=st;return out}")
        rep('ปฏิเสธเมื่อ: คนละช่อง · เกรดรับไม่ไหว (Mystic ≤ +10) · ปลายทางสูงกว่า · ทองไม่พอ · หินไม่พอ — และไม่มีอะไรเปลี่ยน',
            'ช่องเดียวกัน' in e['slot'] and '+10' in e['grade'] and 'สูงกว่า' in e['higher'] and 'ทองไม่พอ' in e['gold'] and 'ไม่พอ' in e['stone'] and all(e[k+'_ok'] for k in ['slot','grade','higher','gold','stone']),json.dumps(e,ensure_ascii=False))
        p_=await A.ev("()=>{me.eq.w.u=0;try{recalc()}catch(e){};const p0=pd();const S=MK('w',4,10);U65.si=S;U65.di=me.eq.w;U65.cf=1;tfDo();return [p0,pd(),me.eq.w.u]}")
        rep('โอนเข้าชิ้นที่สวมอยู่: พลังโจมตีเพิ่มทันที (คำนวณใหม่)',p_[2]==10 and p_[1]>p_[0],json.dumps(p_))
        sv=await A.ev("()=>{const J=JSON.stringify(snap());return J.includes('\"u\":10')}")
        rep('ระดับที่โอนแล้วถูกบันทึกในเซฟ',sv is True,str(sv))
        q=await A.ev("()=>u64Dest().some(d=>d.n===TFN.n)")
        rep('อยู่ในรายการเดินไวในค่าย',q is True,str(q))
        errs=[x for x in A.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
