"""v413 ชุดแฟชั่นแยกชิ้น: เพื่อนเห็นชิ้นที่ผสม · เซฟ/แปลงเซฟเก่า · การันตีบอส · แลกด้าย · ใส่ทั้งชุด · ใส่ทีละชิ้น"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
FULL="{h:'skr',w:'skr',a:'skr',b:'skr',f:'skr'}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Fash','melee',60);B=await new_client(b,'Obs','mage',60)
        for c in (A,B):
            await c.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};const N=MAPS[2].nests[0];enterMap(2,{x:N[0]-120,y:N[1]+40})}")
        await A.wait(3500)
        for _ in range(16):
            if A.uid in await B.ev("()=>Object.keys(others)"): break
            await A.wait(500)
        real=await A.ev("()=>({w:lkc(me.eq.w),a:lkc(me.eq.a),h:lkc(me.eq.h),b:lkc(me.eq.b)})")
        await A.ev("()=>{const W=wdrSt();W.o.skr=1;W.o.ref=1;W.s=%s}"%FULL);await A.wait(1500)
        o=await B.ev("(u)=>{const o=others[u];return o?{wp:o.wp,ar:o.ar,hd:o.hd,bt:o.bt,fa:o.fa}:null}",A.uid)
        rep('เพื่อนเห็นชุดซากุระครบชุด + ออร่า',o and o['wp']==9 and o['ar']==9 and o['hd']==29 and o['bt']==9 and o['fa']==14,json.dumps(o))
        await A.ev("()=>{delete wdrSt().s.w}");await A.wait(1300)
        o2=await B.ev("(u)=>{const o=others[u];return o?{wp:o.wp,ar:o.ar}:null}",A.uid)
        rep('ช่องอาวุธใช้ของจริง ที่เหลือเป็นแฟชั่น',o2 and o2['wp']==real['w'] and o2['ar']==9,json.dumps(o2))
        await A.ev("()=>{wdrSt().s={}}");await A.wait(1300)
        o3=await B.ev("(u)=>{const o=others[u];return o?{wp:o.wp,ar:o.ar,hd:o.hd,bt:o.bt,fa:o.fa}:null}",A.uid)
        rep('ถอดทั้งหมด = อุปกรณ์จริง',o3 and o3['wp']==real['w'] and o3['ar']==real['a'] and o3['fa']==0,json.dumps(o3))
        d=await A.ev("()=>{const s0=M('dm');const W=wdrSt();W.s=%s;const s1=M('dm');W.s={};return [s0,s1]}"%FULL)
        rep('ค่าพลังไม่เปลี่ยนตามชุด',d[0]==d[1],str(d))
        sv=await A.ev("""()=>{const W=wdrSt();W.s={h:'skr',w:'ref',a:'skr'};W.th=5;W.k.bon=3;const c=cleanChar(JSON.parse(JSON.stringify(snap())));
          const old=cleanChar(JSON.parse(JSON.stringify(Object.assign(snap(),{wdr:{o:{skr:1},on:'skr',rw:1,th:2}}))));
          const bad=cleanChar(JSON.parse(JSON.stringify(Object.assign(snap(),{wdr:{o:{xxx:1,ref:1},s:{h:'xxx',f:'ref',w:'skr'},th:-5,k:{zzz:4}}}))));return{c:c.wdr,old:old.wdr,bad:bad.wdr}}""")
        c=sv['c'];rep('เซฟ/โหลดชิ้นผสมครบ',c['s']=={'h':'skr','w':'ref','a':'skr'} and c['th']==5 and c['k'].get('bon')==3,json.dumps(c))
        rep('แปลงเซฟเก่า (ทั้งชุด + โชว์อาวุธจริง)',sv['old']['s']=={'h':'skr','a':'skr','b':'skr','f':'skr'},json.dumps(sv['old']))
        rep('เซฟกรองค่าแปลก',sv['bad']['s']=={} and 'xxx' not in sv['bad']['o'] and sv['bad']['th']==0 and not sv['bad']['k'],json.dumps(sv['bad']))
        pity=await A.ev("()=>{const W=wdrSt();delete W.o.bon;W.k={};const _r=Math.random;Math.random=()=>.99;for(let i=0;i<15;i++)wdrBoss(me.x,me.y,false);Math.random=_r;return new Promise(r=>setTimeout(()=>r({own:!!W.o.bon}),1500))}")
        rep('บอสหุบเขากระดูก การันตีครบ 15 ตัว',pity['own'],json.dumps(pity))
        buy=await A.ev("()=>{const W=wdrSt();delete W.o.hrt;W.th=12;GPV.wt='set';wardrobeUI();const b=document.querySelector('[data-wdb=\"hrt\"]');if(!b)return 'nobtn';b.click();return{own:!!W.o.hrt,th:W.th}}")
        rep('แลกชุดด้วยด้าย 12',isinstance(buy,dict) and buy['own'] and buy['th']==0,json.dumps(buy))
        wr=await A.ev("()=>{const b=document.querySelector('[data-wdo=\"hrt\"]');if(!b)return 'nobtn';b.click();return{s:me.wdr.s,fa:myLook().fa}}")
        rep('ใส่ทั้งชุดจากแท็บทั้งชุด',isinstance(wr,dict) and all(wr['s'].get(k)=='hrt' for k in 'hwabf') and wr['fa']==21,json.dumps(wr))
        mix=await A.ev("""()=>{const W=wdrSt();W.o.ice=1;GPV.wt='h';wardrobeUI();let b=document.querySelector('[data-wds="h:skr"]');if(!b)return 'noh';b.click();
          GPV.wt='f';wardrobeUI();const nf=document.querySelectorAll('[data-wdq^="f:"]').length;b=document.querySelector('[data-wds="f:ice"]');if(!b)return 'nof';b.click();
          GPV.wt='a';wardrobeUI();b=document.querySelector('[data-wds="a:"]');if(!b)return 'noa';b.click();const L=myLook();return{s:W.s,h:L.h,w:L.w,a:L.a,fa:L.fa,nf,nfa:WDR.filter(o=>(o.fa|0)>0).length,realA:lkc(me.eq.a)}}""")
        rep('ใส่ทีละชิ้นจากคนละชุด (หมวกซากุระ · อาวุธหัวใจ · ออร่าหิมะ · เสื้อของจริง)',isinstance(mix,dict) and mix['h']==29 and mix['w']==49 and mix['fa']==3 and mix['a']==mix['realA'] and mix['nf']==mix['nfa'],json.dumps(mix))
        await A.wait(1300)
        o4=await B.ev("(u)=>{const o=others[u];return o?{wp:o.wp,hd:o.hd,fa:o.fa}:null}",A.uid)
        rep('เพื่อนเห็นชิ้นที่ผสม',o4 and o4['wp']==49 and o4['hd']==29 and o4['fa']==3,json.dumps(o4))
        ss=await A.ev("()=>{const W=wdrSt();delete W.o.ssg;const t0=W.th|0;wdrSeason(2);const a=!!W.o.ssg;wdrSeason(2);return{a,th:(W.th|0)-t0}}")
        rep('ฤดูกาลโกลด์ได้ชุด ครั้งต่อไปได้ด้าย 3',ss['a'] and ss['th']==3,json.dumps(ss))
        n=await A.ev("()=>{GPV.wt='set';wardrobeUI();return document.querySelectorAll('[data-wdp]').length}")
        rep('แท็บทั้งชุดแสดงครบทุกชุด',n==await A.ev("()=>WDR.length"),str(n))
        E=[e for c in (A,B) for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not E,str(E[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
