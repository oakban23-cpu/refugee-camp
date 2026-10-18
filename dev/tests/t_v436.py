"""v436 ค่ายโล่ง · เต็นท์เริ่มต้น · พรหอคอยหลังกดเริ่ม"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',95)
        await A.ev(CLR);await A.ev("()=>{enterMap(1,{x:CX,y:CY+120})}");await A.wait(2500)
        r=await A.ev("()=>{U53.pt=0;const on=u53Aw(me.x,me.y-40,120,16),far=u53Aw(me.x+400,me.y-40,120,16),feet=u53Aw(me.x,me.y+60,120,16);return[+on.toFixed(2),far,feet]}")
        rep('① ป้ายที่ทับตัวผู้เล่นจางลง (≤0.3) · ป้ายที่อยู่ห่างไม่เปลี่ยน',r[0]<=0.3 and r[1]==1 and r[2]==1,str(r))
        r=await A.ev("()=>{const a=Object.getOwnPropertyDescriptor(g,'fillText');u53Hook(1);u53Hook(1);const b=!!Object.getOwnPropertyDescriptor(g,'fillText');u53Hook(0);const c=!!Object.getOwnPropertyDescriptor(g,'fillText');u53Hook(0);const d=!!Object.getOwnPropertyDescriptor(g,'fillText');return[!!a,b,c,d,U53.dep]}")
        rep('① ตัวดักข้อความติดตั้งเฉพาะตอนวาด NPC/ประตู แล้วถอดออกครบ',r==[False,True,True,False,0],str(r))
        r=await A.ev("""()=>{g.save();g.setTransform(1,0,0,1,0,0);g.font='11px system-ui';g.textAlign='center';u53Hook(1);const seen=[];const o=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'globalAlpha');
          const near=u53TA('ประตูลานบอสโลก',me.x-cam.x*0,me.y-40);u53Hook(0);g.restore();return +near.toFixed(2)}""")
        rep('① ตัวดักแปลงพิกัดแล้วคำนวณความจางได้',r<1 and r>=0.2,str(r))
        r=await A.ev("()=>{const a=+u53BA(me.x,me.y-30,'สวัสดีจ้าาา').toFixed(2),b=u53BA(me.x+300,me.y-300,'x');return[a,b]}")
        rep('① ฟองคำพูด NPC จางเมื่อทับผู้เล่น',r[0]<0.5 and r[1]==1,str(r))
        r=await A.ev("""()=>{U53.pt=0;const g0=u53Gap();for(let i=0;i<4;i++)others['zz'+i]={x:me.x+20*i,y:me.y+10,hp:1};U53.pt=0;const g1=u53Gap(),c=u53Crowd(me.x,me.y,260);for(let i=0;i<4;i++)delete others['zz'+i];U53.pt=0;return[g0,g1,c]}""")
        rep('① มีผู้เล่นรวมกัน ≥4 คน ชาวค่าย/NPC เงียบนานขึ้น ×2.6',r[0]==1 and r[1]==2.6 and r[2]==5,str(r))
        await A.wait(1500)
        rep('① วาดกลางค่ายต่อเนื่องไม่มี error',not [e for e in A.errs if 'Failed to load resource' not in e],str(A.errs[:2]))
        # ---- เต็นท์ ----
        r=await A.ev("()=>new Promise(res=>{me.tent={};me.x=TNE.x;me.y=TNE.y+40;tentHome();setTimeout(()=>{const S=tSt();res([tentMine(),Object.keys(S.d).length,Object.keys(S.own).length,tComfort(S.d),tRank(tComfort(S.d)),MAPS[curMap].tent&&Object.keys(MAPS[curMap].tent.d).length,banner&&banner.s])},1500)})")
        rep('② เข้าเต็นท์ครั้งแรกได้ชุดแต่ง 7 ชิ้น วางครบ และเห็นในเต็นท์',r[0] and r[1]==7 and r[2]==7 and r[5]==7 and '🎁' in (r[6] or ''),json.dumps(r,ensure_ascii=False))
        r=await A.ev("()=>new Promise(res=>{tentExit();setTimeout(()=>{const S=tSt();S.d={};tentHome();setTimeout(()=>res([Object.keys(tSt().d).length,Object.keys(tSt().own).length]),900)},900)})")
        rep('② แจกครั้งเดียว: เก็บของออกแล้วเข้าใหม่ไม่ได้ของซ้ำ',r==[0,7],str(r))
        r=await A.ev("()=>new Promise(res=>{tentExit();setTimeout(()=>{me.tent={own:{bed2:1},d:{bed2:'bed2'}};tentHome();setTimeout(()=>res([Object.keys(tSt().d).length,Object.keys(tSt().own).length]),900)},900)})")
        rep('② คนที่เคยซื้อของแต่งแล้วไม่ได้ชุดเริ่มต้น',r==[1,1],str(r))
        await A.ev("()=>{tentExit()}");await A.wait(800)
        # ---- หอคอย ----
        await A.ev("()=>{me.twBl=[];me.blPick=null;me.twCp=91;me.twBest=99;twCreate(91)}");await A.wait(4500)
        r=await A.ev("()=>[isTw(),dg&&dg.ph,!!me.blPick]")
        rep('③ เข้าห้องรอหอคอยแล้วไม่มีหน้าเลือกพรเด้งบัง',r[0] and r[1]=='lobby' and not r[2],str(r))
        await A.ev("()=>{twStart()}");await A.wait(2200)
        r=await A.ev("()=>[dg.ph,me.blPick&&me.blPick.why,me.blPick&&me.blPick.ids.length,!$('blpk').hidden]")
        rep('③ กดเริ่มปีนแล้วจึงขึ้นหน้าเลือกพรเริ่มต้น',r[0]=='run' and r[1]=='พรเริ่มต้นก่อนปีน' and r[2]==3 and r[3],json.dumps(r,ensure_ascii=False))
        await A.ev("()=>{blChoose(0)}");await A.wait(1500)
        r=await A.ev("()=>[(me.twBl||[]).length,!!me.blPick]")
        rep('③ เลือกแล้วได้พร 1 อย่าง และไม่เด้งซ้ำ',r==[1,False],str(r))
        rep('ไม่มี error',not [e for e in A.errs if 'Failed to load resource' not in e],str(A.errs[:3]))
    finally: p.terminate()
    bad=[x for x in R if not x[1]];print('RESULT',len(R)-len(bad),'/',len(R))
asyncio.run(main())
