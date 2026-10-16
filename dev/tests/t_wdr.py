"""v410 ชุดแฟชั่น: เพื่อนเห็นชุด/ออร่า · เซฟ · การันตีบอส · แลกด้าย · ฤดูกาล"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Fash','melee',60);B=await new_client(b,'Obs','mage',60)
        errs=[]
        for c in (A,B):
            await c.ev("()=>{ov.hidden=true;const N=MAPS[2].nests[0];enterMap(2,{x:N[0]-120,y:N[1]+40})}")
        await A.wait(3500)
        for _ in range(16):
            if A.uid in await B.ev("()=>Object.keys(others)"): break
            await A.wait(500)
        real=await A.ev("()=>({w:lkc(me.eq.w),a:lkc(me.eq.a),h:lkc(me.eq.h),b:lkc(me.eq.b)})")
        await A.ev("()=>{const W=wdrSt();W.o.skr=1;W.on='skr';W.rw=0}")
        await A.wait(1500)
        o=await B.ev("(u)=>{const o=others[u];return o?{wp:o.wp,ar:o.ar,hd:o.hd,bt:o.bt,fa:o.fa}:null}",A.uid)
        rep('เพื่อนเห็นชุดซากุระ + ออร่า',o and o['wp']==9 and o['ar']==9 and o['hd']==29 and o['bt']==9 and o['fa']==14,json.dumps(o))
        st=await A.ev("()=>{const L=myLook();return{w:L.w,fa:L.fa,stat:M('dm')}}")
        await A.ev("()=>{wdrSt().rw=1}");await A.wait(1300)
        o2=await B.ev("(u)=>{const o=others[u];return o?{wp:o.wp,ar:o.ar}:null}",A.uid)
        rep('โชว์อาวุธจริงขณะใส่ชุด',o2 and o2['wp']==real['w'] and o2['ar']==9,json.dumps(o2)+' real '+json.dumps(real))
        await A.ev("()=>{wdrSt().on=''}");await A.wait(1300)
        o3=await B.ev("(u)=>{const o=others[u];return o?{wp:o.wp,ar:o.ar,hd:o.hd,bt:o.bt,fa:o.fa}:null}",A.uid)
        rep('ถอดชุด = กลับเป็นอุปกรณ์จริง',o3 and o3['wp']==real['w'] and o3['ar']==real['a'] and o3['fa']==0,json.dumps(o3))
        d=await A.ev("()=>{const s0=M('dm');const W=wdrSt();W.on='skr';const s1=M('dm');W.on='';return [s0,s1]}")
        rep('ค่าพลังไม่เปลี่ยนตามชุด',d[0]==d[1],str(d))
        sv=await A.ev("()=>{const W=wdrSt();W.on='skr';W.th=5;W.k.bon=3;const c=cleanChar(JSON.parse(JSON.stringify(snap())));const bad=cleanChar(JSON.parse(JSON.stringify(Object.assign(snap(),{wdr:{o:{xxx:1,skr:1},on:'xxx',th:-5,k:{zzz:4}}}))));return{c:c.wdr,bad:bad.wdr}}")
        rep('เซฟ/โหลดชุดครบ',sv['c'] and sv['c']['on']=='skr' and sv['c']['o'].get('skr')==1 and sv['c']['th']==5 and sv['c']['k'].get('bon')==3,json.dumps(sv['c']))
        rep('เซฟกรองค่าแปลก',sv['bad']['on']=='' and 'xxx' not in sv['bad']['o'] and sv['bad']['th']==0 and not sv['bad']['k'],json.dumps(sv['bad']))
        pity=await A.ev("()=>{const W=wdrSt();delete W.o.bon;W.k={};const _r=Math.random;Math.random=()=>.99;for(let i=0;i<15;i++)wdrBoss(me.x,me.y,false);Math.random=_r;return new Promise(r=>setTimeout(()=>r({own:!!W.o.bon,k:W.k.bon|0}),1500))}")
        rep('บอสหุบเขากระดูก การันตีครบ 15 ตัว',pity['own'],json.dumps(pity))
        buy=await A.ev("()=>{const W=wdrSt();delete W.o.hrt;W.th=12;wardrobeUI();const b=document.querySelector('[data-wdb=\"hrt\"]');if(!b)return 'nobtn';b.click();return{own:!!W.o.hrt,th:W.th}}")
        rep('แลกชุดด้วยด้าย 12',isinstance(buy,dict) and buy['own'] and buy['th']==0,json.dumps(buy))
        wr=await A.ev("()=>{const b=document.querySelector('[data-wdo=\"hrt\"]');if(!b)return 'nobtn';b.click();return{on:me.wdr.on,lk:myLook().fa}}")
        rep('กดสวมจากตู้',isinstance(wr,dict) and wr['on']=='hrt' and wr['lk']==21,json.dumps(wr))
        ss=await A.ev("()=>{const W=wdrSt();delete W.o.ssg;const t0=W.th|0;wdrSeason(2);const a=!!W.o.ssg;wdrSeason(2);return{a,th:(W.th|0)-t0}}")
        rep('ฤดูกาลโกลด์ได้ชุด ครั้งต่อไปได้ด้าย 3',ss['a'] and ss['th']==3,json.dumps(ss))
        n=await A.ev("()=>document.querySelectorAll('[data-wdp]').length")
        rep('ตู้เสื้อผ้าแสดงครบทุกชุด',n==await A.ev("()=>WDR.length"),str(n))
        E=[e for c in (A,B) for e in c.errs if 'pageerror' in e or not e.startswith('console')];rep('ไม่มี error',not E,str(E[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
