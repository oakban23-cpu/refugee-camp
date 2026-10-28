"""v549 ภาค 10 บทที่ 3 · คำมั่นของทุกเมือง: ธุลีเดินตาม · เรนน์ (แยก e7) · ขอคำมั่น 8 แห่ง (แยก e6/e7/p7m/p8g/e8/e9/e/e4) · ป้าย 🤝 · ออโต้เควส
   · เฒ่าแก่นไม้ · ของจากทุกเมืองในนครรากลึก/ปากเหว · ล่า 40 ที่ปากเหว · ธุลี → จบบท · ฉายา"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
async def adv(A,n=24):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(80)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(80)
        if not on:break
async def until_a(A):
    for i in range(30):
        if await A.ev("()=>me.sty.a===1&&!SD.on"):break
        await adv(A,3)
SH='../v549/'
CLEAN="()=>{try{localStorage.setItem('refugee_wn',WNV)}catch(e){};const p=document.getElementById('wnp');if(p)p.remove();PALG.card=null;PALG.title=null;banner=null;document.querySelectorAll('.tipc,#tipc').forEach(e=>e.remove())}"
MP=[9,32,35,38,38,42,5,26]
async def goto(C,mp):
    await C.ev(f"()=>{{ov.hidden=true;const M=MAPS[{mp}];enterMap({mp},{{x:M.sx||1600,y:M.sy||1600}})}}");await C.wait(2700)
    await C.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};try{czEnd()}catch(e){}}")
async def pledge(C,i):
    if await C.ev("()=>curMap")!=MP[i]: await goto(C,MP[i])
    r=await C.ev(f"""()=>{{const i={i},p=pcNpcPos(i);if(!p)return ['nopos',curMap,0,''];const k=PAQ8[i][0];
       if(curMap===9){{const ix=CITY.npcs.findIndex(n=>n.k===k);npcSel='c'+ix}}else npcSel=(k==='kn'?1:STNPC[k][1]==='npc2'?2:1);
       me.x=p.x;me.y=p.y+40;mons=[];const kk=stTalkKey();const ok=stNpcClick();return [kk,ok,SD.q.map(l=>l[1]).join('|'),curMap]}}""")
    await adv(C)
    s=await C.ev(f"()=>[(me.sty.pa3p|0)>>{i}&1,me.sty.n,PALG.card&&PALG.card.h,PALG.card&&PALG.card.t]")
    return r,s
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ma'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Mb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.pa3s)")
        info=await A.ev("()=>[STY.findIndex(x=>x.pa2c),STY.length,STCH[STY[STY.findIndex(x=>x.pa3s)].c],STY.findIndex(x=>x.pa3p),STY[STY.findIndex(x=>x.pa3p)].n]")
        rep('ภาค 10 บทที่ 3 ต่อจากบทที่ 2 (6 ขั้น · ขอคำมั่น 8 แห่ง)',i0==info[0]+1 and info[1]==i0+6 and info[3]==i0+2 and info[4]==8 and 'บทที่ 3' in info[2],[i0,info])
        sv=await A.ev("()=>{const o=cleanChar({lv:99,sty:{s:5,n:0,a:0,pa3p:77,zz9:4}});return o&&o.sty}")
        rep('เซฟ: คีย์ pa3p ไม่หายตอนโหลด',sv.get('pa3p')==77 and 'zz9' not in sv,sv)
        FA="e:1,e4:2,e6:1,e7:1,p7m:1,p8g:1,e8:1,e9:1";FB="e:2,e4:1,e6:2,e7:2,p7m:2,p8g:2,e8:2,e9:2"
        for C,F in ((A,FA),(B,FB)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,{F},p6h:2,q9:1,pacr:31,parr:31,pa2j:31}};me.wv=[1,5,9,23,25,26,32,35,38,39,40,41,42,43,44,2,3];ov.hidden=true;enterMap(44,{{x:PBTHU.x+50,y:PBTHU.y+40}})}}")
        await A.wait(2800);await A.ev(CLEAN);await B.ev(CLEAN)
        T44="()=>{const N=MAPS[44].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;PBS.lx=me.x;PBS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}"
        ta=await A.ev(T44);await B.ev(T44);await adv(A);await adv(B)
        f0=await A.ev("()=>[stCur().k,pcFollowOn()]")
        for C in (A,B):
            await C.ev("()=>{ov.hidden=true;enterMap(1,{x:MAPS[1].npc4.x+60,y:MAPS[1].npc4.y+70})}")
        await A.wait(2800);await A.ev(CLEAN)
        f1=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await w(600);const a=[pcFollowOn(),Math.round(Math.hypot(PCFW.x-me.x,PCFW.y-me.y)),PCFW.m===curMap];me.x+=200;await w(1800);a.push(Math.round(Math.hypot(PCFW.x-me.x,PCFW.y-me.y)));return a}")
        rep('คุยธุลี → ธุลีขอขึ้นไปด้วย · เดินตามผู้เล่นบนแมพอื่น (ไม่ซ้อนกับ NPC ธุลีในแมพ 43/44) และตามทันเมื่อเดินไกล',ta[0]=='thu44' and 'แปดดวง' in ta[1] and f0==['cmd',False] and f1[0] and f1[1]<90 and f1[2] and f1[3]<90,[ta[0],f0,f1])
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev(CLEAN);await A.wait(500);await A.pg.screenshot(path=SH+'t_follow.jpg',quality=80);await A.pg.set_viewport_size({'width':390,'height':844})
        TC="()=>{const N=MAPS[1].npc4;npcSel=4;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}"
        ca=await A.ev(TC);cb=await B.ev(TC);await adv(A);await adv(B)
        rep('เรนน์: ค่ายเป็นเมืองแรกที่ให้คำมั่น · แยกตาม e7 (ค่ายผู้อพยพ / นครลี้ภัย) → ขั้นขอคำมั่น',ca[0]=='cmd' and 'เมืองแรก' in ca[1] and 'เคยไม่มีบ้าน' in ca[1] and 'นครลี้ภัย' not in ca[1] and 'นครลี้ภัย' in cb[1] and 'เคยไม่มีบ้าน' not in cb[1] and await A.ev("()=>!!stCur().pa3p"),[ca[1][-120:],cb[1][-100:]])
        await until_a(A);await until_a(B)
        aq0=await A.ev("()=>pcAqT(stCur())")
        order=[6,0,2,3,4,1,5,7];res={'A':[],'B':[]}
        for nm,C in (('A',A),('B',B)):
            for i in order:
                if nm=='A' and i==3:
                    await goto(A,38);await A.pg.set_viewport_size({'width':1280,'height':720})
                    await A.ev("()=>{const p=pcNpcPos(3);me.x=p.x+90;me.y=p.y+120;mons=[]}");await A.wait(1200);await A.ev(CLEAN);await A.pg.screenshot(path=SH+'t_marker.jpg',quality=80)
                    await A.pg.set_viewport_size({'width':390,'height':844})
                r,s=await pledge(C,i);res[nm].append([i,r[0],r[1],s[0],s[1],(s[2] or '')[:30],(s[3] or '')[:140],r[2][-60:] if r[2] else ''])
        for nm in ('A','B'):
            for x in res[nm]:print(nm,x)
        okA=all(x[3]==1 for x in res['A']) and '8/8' in res['A'][-1][5] and all(x[2] for x in res['A']);okB=all(x[3]==1 for x in res['B']) and '8/8' in res['B'][-1][5]
        rep('ขอคำมั่นครบ 8 แห่ง (คุย NPC บนแมพของเมืองนั้น · การ์ด «คำมั่นของ…» นับ n/8) ทั้งสองเครื่อง',okA and okB,[[x[:6] for x in res['A']],[x[:5] for x in res['B']]])
        cardA={x[0]:x[6] for x in res['A']};cardB={x[0]:x[6] for x in res['B']}
        exp=[('โคมให้ทุกบ้าน','องครักษ์ดาว'),('เชือกลายเฟืองตะวัน','ผ้าทอลายเฟืองตะวัน'),('รถเข็น','สหกรณ์คาร์น'),('เปิดท้องเรือ','หยิบพลั่ว'),('เพลงวาฬ','โซ่ดาว'),('กระจกของโอเรียน','ด้ายดาว'),('คลายหมุด','ถอนหมุด'),('เปิดรอยผนึก','เมล็ดหัวใจ')]
        bad=[i for i,(a,bb) in enumerate(exp) if a not in cardA.get(i,'') or bb not in cardB.get(i,'')]
        rep('คำมั่นแต่ละเมืองแยกตามทางเลือกเก่า (e6 · e7 · p7m · p8g · e8 · e9 · e · e4)',not bad,[bad,cardA,cardB])
        rep('ออโต้เควสพาไปคุย NPC ที่ยังไม่ได้คำมั่น',aq0 and aq0.get('act')=='talk' and aq0.get('k')=='qn' and aq0.get('mp')==9,aq0)
        again=await A.ev("()=>{const p=pcNpcPos(7);if(!p)return 'nopos';npcSel=1;me.x=p.x;me.y=p.y+40;stNpcClick();const t=SD.on?SD.q.map(l=>l[1]).join('|'):'';try{stClose()}catch(e){}return t}")
        s3=await A.ev("()=>[me.sty.s,stCur()&&stCur().k]")
        rep('ครบแปดคำมั่น → ขั้นนำคำมั่นลงไปบอกเฒ่าแก่นไม้ · คุยซ้ำไม่ได้คำมั่นซ้ำ',s3==[i0+3,'ked'] and 'อัศวินร้อยดวงสาบาน' not in again,[s3,again[:80]])
        for C in (A,B):
            await C.ev("()=>{ov.hidden=true;enterMap(44,{x:PBKED.x+40,y:PBKED.y+60})}")
        await A.wait(2800);await A.ev(CLEAN)
        TK="()=>{const N=MAPS[44].npc;npcSel=1;me.x=N.x;me.y=N.y+40;PBS.lx=me.x;PBS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}"
        ka=await A.ev(TK);await B.ev(TK);await adv(A);await adv(B)
        tok=await A.ev("""()=>{const K=['pcrope','pctrunk','pcguard','pckarn','pcwhale','pcstar','pcseed'];const have=K.map(k=>trees.some(t=>t.k===k));const c=document.createElement('canvas');c.width=600;c.height=600;const x=c.getContext('2d'),g0=g;let ok=1;
          try{g=x;x.translate(-1300,-1300);for(const t of trees)if(K.includes(t.k))PALK[t.k](t,1.3)}catch(e){ok=String(e)}finally{g=g0}return [have,ok,gPC(),stCur().g,stCur().m]}""")
        tokB=await B.ev("""()=>{const K=['pcrope','pctrunk','pcguard','pckarn','pcwhale','pcstar','pcseed'];const c=document.createElement('canvas');c.width=600;c.height=600;const x=c.getContext('2d'),g0=g;let ok=1;try{g=x;for(const t of trees)if(K.includes(t.k))PALK[t.k](t,1.3)}catch(e){ok=String(e)}finally{g=g0}return [ok,gPC()]}""")
        rep('เฒ่าแก่นไม้รับคำมั่น → นครรากลึกมีของจากทุกเมือง (วาดได้ทั้งสองชุดทางเลือก) → ขั้นปกป้องปากเหว',ka[0]=='ked' and 'ไม่เคยมีใครลงมาบอก' in ka[1] and all(tok[0]) and tok[1]==1 and tok[2] and tok[3]=='kill' and tok[4]==43 and tokB==[1,True],[ka[1][-80:],tok,tokB])
        await A.pg.set_viewport_size({'width':1280,'height':720})
        for nm,(x,y) in {'t_city_a':(1600,1700),'t_rope_a':(1600,760),'t_trunk_a':(1620,1460),'t_well_a':(1700,1880)}.items():
            await A.ev(f"()=>{{mons=[];me.x={x};me.y={y};PBS.lx=me.x;PBS.ly=me.y}}");await A.wait(1100);await A.ev(CLEAN);await A.pg.screenshot(path=SH+nm+'.jpg',quality=80)
        await B.pg.set_viewport_size({'width':1280,'height':720})
        for nm,(x,y) in {'t_city_b':(1600,1700),'t_t4_b':(2300,2380),'t_karn_b':(1840,1880)}.items():
            await B.ev(f"()=>{{mons=[];me.x={x};me.y={y};PBS.lx=me.x;PBS.ly=me.y}}");await B.wait(1100);await B.ev(CLEAN);await B.pg.screenshot(path=SH+nm+'.jpg',quality=80)
        await A.pg.set_viewport_size({'width':390,'height':844})
        await A.ev("()=>{ov.hidden=true;enterMap(43,{x:1600,y:420})}");await A.wait(2800);await A.ev(CLEAN)
        await A.pg.set_viewport_size({'width':1280,'height':720})
        for nm,(x,y) in {'t_ref':(1600,560),'t_ship':(1240,1700)}.items():
            await A.ev(f"()=>{{mons=[];me.x={x};me.y={y};PAS.lx=me.x;PAS.ly=me.y}}");await A.wait(1200);await A.ev(CLEAN);await A.pg.screenshot(path=SH+nm+'.jpg',quality=80)
        await A.pg.set_viewport_size({'width':390,'height':844})
        h43=await A.ev("()=>[trees.filter(t=>t.k==='pcship').length,trees.filter(t=>t.k==='pchelp').length,trees.filter(t=>t.k==='pcflag').length]")
        await until_a(A)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A);await A.wait(900);await adv(A)
        s5=await A.ev("()=>[me.sty.s,stCur().k]")
        rep('ปากเหวมีเรือเหาะ 2 ลำ คนจาก 6 เมือง ธง 8 ผืน · ล่า 40 → ขั้นคุยธุลี',h43==[2,6,8] and s5==[i0+5,'thu'],[h43,s5])
        await until_a(A)
        qt=await A.ev("()=>{const N=MAPS[43].npc;npcSel=1;me.x=N.x;me.y=N.y+40;PAS.lx=me.x;PAS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A);await A.wait(600);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stR3]")
        rep('ธุลี: สิ่งที่สวยที่สุดคือคนข้างบนที่ก้มลงมามอง · ได้ยินธรณิน → จบบทที่ 3 · ฉายา «ผู้ถามทุกเมือง»',qt[0]=='thu' and 'ก้มลงมามอง' in qt[1] and 'ธรณิน' in qt[1] and en[0]==i0+6 and en[0]==en[1] and 'คำมั่นของทุกเมือง' in en[2] and en[3],[qt[1][-100:],en])
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        errs=await A.ev("()=>[NPV.err||'',MV9.err||'',window.__err]")
        rep('ไม่มี error ในหน้าเกม',not E and not errs[0] and not errs[2],[E[:4],errs])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
