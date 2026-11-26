"""v666 บ้านกิลด์โฉมใหม่"""
import asyncio, sys, json, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, '' if ok else info, flush=True)
OUT=sys.argv[1] if len(sys.argv)>1 else None
async def main():
    p=start_server()
    try:
      bad=[]
      for f in ['hd-gh.webp','hd-gh-w.webp','hd-gh-t.webp']:
          r=urllib.request.urlopen(URL+f);b=r.read()
          if r.headers['Content-Type']!='image/webp' or len(b)<100000:bad.append((f,len(b)))
      rep('ภาพชุดใหม่ 3 ไฟล์ เสิร์ฟเป็น image/webp',not bad,bad)
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',60)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true}");await A.wait(1500)
        await A.ev("()=>{gdEmit('mk',{nm:'ภาพสวย',tag:'HD',e:2,col:5})}");await A.wait(1300)
        await A.ev("()=>{ghEnter()}");await A.wait(800)
        ok=await A.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if((G6.ok===1&&GHS.g6===1)||Date.now()-t0>20000){clearInterval(iv);r([G6.ok,GHS.g6,GHS.hd,GHS.gq])}},200)})")
        rep('เข้าบ้านกิลด์ → โหลดภาพชุดใหม่ → แคชใช้ภาพใหม่',ok==[1,1,1,1],ok)
        r=await A.ev("()=>{const L=[];for(let t=1;t<=5;t++){const t0=performance.now();const C=ghBuild(t,'#58c06a','🛡️');L.push([C.cv.width,GHS.g6,Math.round(performance.now()-t0),Math.round(GHR[0][2]),G6.L.length,G6.C.length,!!GHS.ks])}return L}")
        rep('สร้างภาพครบ 5 ขั้น (< 2 วิ/ขั้น) · ตึกหลักกว้างขึ้นตามขั้น · มีแสงไฟ/กันชน/ควันครัว',all(x[0]==1656 and x[1]==1 and x[2]<2000 and x[4]>4 and x[5]>8 and x[6] for x in r) and [x[3] for x in r]==[129,142,163,181,206],r)
        # สีธง: ย้อมสีกิลด์
        d=await A.ev("""()=>{const a=g6Spr('BANNER_POLE','#d03030'),b=g6Spr('BANNER_POLE','#3050d0');const m=G6.M.BANNER_POLE;const px=(cv)=>{const x=cv.getContext('2d');const d=x.getImageData(Math.round(cv.width*.6),Math.round(cv.height*.2),1,1).data;return [d[0],d[1],d[2],d[3]]};return [px(a),px(b)]}""")
        rep('ธงขาวย้อมเป็นสีกิลด์ (แดง/น้ำเงิน)',d[0][0]>d[0][2]+60 and d[1][2]>d[1][0]+60 and d[0][3]>200,d)
        # กันชน
        cl=await A.ev("""()=>{GDS.g.hq.t=3;GHS.ck='';return new Promise(res=>setTimeout(()=>{const L=ghCols();const D=GHDEC(3);const hasD=L.some(e=>D.some(d=>d[0]===e[0]&&d[1]===e[1]&&d[2]===e[2]));
          me.x=CX+212;me.y=CY+292;tentCollide();const dm=Math.round(Math.hypot(me.x-CX-205,me.y-CY-288));me.x=CX;me.y=CY+40;tentCollide();const dp=Math.round(Math.hypot(me.x-CX,me.y-CY-22));
          me.x=CX;me.y=CY-300;tentCollide();res([hasD,dm,dp,Math.round(me.y-CY),L[0][2]])},300))}""")
        rep('กันชน: อนุสาวรีย์ · น้ำพุกลางลาน · ตึกหลัก · ไม่มีกันชนของแต่งชุดเดิม',(not cl[0]) and cl[1]>=40 and cl[2]>=90 and cl[3]>-300,cl)
        # จุดใช้งานเดิมยังอยู่
        fn=await A.ev("()=>[ghPlot(0).x,ghPlot(0).y,GHBD.x,GHBD.y,GHN.x,GHN.y,GHST.x,GHKI.x,GHTS.length,ghWL(3).n]")
        rep('จุดใช้งานเดิมคงที่ (แปลงผัก กระดาน ผู้ดูแลคลัง โกดัง ครัว ป้อม ทางเดินกำแพง)',fn==[342,-252,392,196,-430,-84,470,470,8,81],fn)
        # วาดสด + กระดาน
        lv=await A.ev("()=>new Promise(res=>{me.x=CX+GHBD.x;me.y=CY+GHBD.y+40;setTimeout(()=>{let e=null;try{ghLiveHD(3,1.5);ghBoardHD(3,1.5)}catch(x){e=String(x)}res([e,G6.bh>60])},500)})")
        rep('วาดสด (แสงไฟ/น้ำพุ/ป้ายกระดาน) ไม่พัง',lv==[None,True],lv)
        # ขึ้นกำแพงยังได้
        wk=await A.ev("()=>{const R=ghWReg(388,-430,3),N=ghWReg(500,-486,3);return [R&&R.k,N&&N.k]}")
        rep('ทางเดินบนกำแพง/บันไดยังใช้ได้',wk==['st','n'],wk)
        if OUT:
            await A.pg.set_viewport_size({'width':900,'height':640})
            for t in (1,3,5):
                await A.ev("(t)=>{GDS.g.hq.t=t;GHS.ck='';banner=null;me.x=CX+80;me.y=CY+230}",t);await A.wait(1500)
                await A.pg.screenshot(path=f'{OUT}/live_t{t}.jpg',quality=80)
        # ปิด → ภาพเดิม
        fb=await A.ev("()=>{G6.on=0;GHS.C=null;GHS.ck='';return new Promise(r=>setTimeout(()=>{r([GHS.g6,GHS.hd]);G6.on=1;GHS.C=null},900))}")
        rep('G6.on=0 → กลับใช้ภาพบ้านกิลด์ชุดเดิม',fb==[0,1],fb)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
