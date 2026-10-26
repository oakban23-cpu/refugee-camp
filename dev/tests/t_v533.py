"""v533 ภาค 8 บทที่ 5 · ตาพายุ (บทจบ): สภา · ล่า 30 · นาวิน · ดันวาฬกลืนฟ้า (เรือวง · ดำลงเมฆ · ครีบ/หาง · กลืนฟ้า วงเพลง · พายุ) · ฉากจบ e8 · ท่าเรือนาวาเมฆ · เรือเหาะจิ๋ว · ฉายาจบภาค"""
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
SH='../v533/'
TALK="(k)=>{const N=k===2?MAPS[curMap].npc2:MAPS[curMap].npc;npcSel=k;me.x=N.x;me.y=N.y+40;const kk=stTalkKey();stNpcClick();return [kk,SD.q.map(l=>l[1]).join('|')]}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Sa'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Sb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p8s5)");n6=await A.ev("()=>STY.findIndex(x=>x.p9s1)-STY.findIndex(x=>x.p8s5)")
        rep('ภาค 8 บทที่ 5 ต่อจากบทที่ 4 (6 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p8c4)")+1 and n6==6,[i0,n6])
        for C,pg in ((A,1),(B,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:{pg}}};me.ach=me.ach||{{}};me.ach.stN4=1;me.wv=[1,9,32,38,39,2,3];ov.hidden=true;enterMap(38,{{x:2000,y:1900}})}}")
        await A.wait(2600)
        qa=await A.ev(TALK,1);qb=await B.ev(TALK,1)
        rep('คุยซารา (ผาท่าเรือ): สภาตาพายุ · กริฟแยกตาม p8g',qa[0]=='sara' and 'ตาพายุ' in qa[1] and 'อยู่บนท่าแล้ว' in qa[1] and 'ไม่ได้ขึ้นท่า' in qb[1] and 'อยู่บนท่าแล้ว' not in qb[1],[qa[0],qa[1][-100:],qb[1][-100:]])
        await adv(A);await adv(B)
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<30;i++)stKill(0,0)}");await adv(A)
        s2=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ล่า 30 → คุยนาวิน',s2[0]==i0+2 and 'นาวิน' in s2[1],s2)
        qn=await A.ev(TALK,2);await adv(A)
        s3=await A.ev("()=>[me.sty.s,stCur().g]")
        rep('นาวิน: เข็มทิศเสียงชี้นิ่ง · ทิลให้เข็มทิศดาว → ขั้นดันเจี้ยน',qn[0]=='navin' and 'เข็มทิศดาว' in qn[1] and s3==[i0+3,'wsk'],[qn[0],s3])
        # ===== ดันเจี้ยน =====
        await A.ev(TALK,1);await adv(A);await A.wait(2600)
        rid=await A.ev("()=>curMap")
        await B.ev(f"()=>{{dgMap({rid});enterMap({rid},{{x:CX,y:CY+460}})}}");await B.wait(3000)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1500)
        g0=await A.ev("()=>[WSKI(),dg.ph,isHost(),MAPS[curMap].boss.n,mons.filter(m=>m.wsp&&m.hp>0).map(m=>m.wsp).sort().join(','),curMap>=47000&&curMap<48000,MAPS[curMap].th,wskShip(CX+Math.cos(WSSH[0])*450,CY+Math.sin(WSSH[0])*450)>=0,wskShip(CX,CY+100)<0,wskShip(CX+Math.cos(0)*450,CY)<0]")
        await A.ev("()=>{me.x=CX+Math.cos(WSSH[1])*430;me.y=CY+Math.sin(WSSH[1])*430}");await A.wait(900);await A.pg.screenshot(path=SH+'t_arena.jpg',quality=78)
        rep('ตาพายุ (ห้อง 47xxx · ธีม 41): หัววาฬ + ครีบซ้าย/ขวา + หาง · เรือ 6 ลำ (แอ่งกลางและช่องระหว่างลำไม่ใช่เรือ)',g0[0] and g0[1]=='boss' and g0[3]=='วาฬกลืนฟ้า' and g0[4]=='fl,fr,tl' and g0[5] and g0[6]==41 and g0[7] and g0[8] and g0[9],g0)
        dv=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons.forEach(m=>{if(m.t!==3)m.stun=99});const Bo=mons.find(m=>m.t===3);Bo.stun=99;gmGod=false;me.hp=me.mh;me.x=CX+Math.cos(WSSH[1])*430;me.y=CY+Math.sin(WSSH[1])*430;WSK.nd=0;await w(300);const d1=WSK.dv;WSK.dt=0;await w(300);const d2=WSK.dv;
          const k0=WSK.hk|0,h0=Bo.hp;try{dmgMon(Bo.id,Math.round(Bo.mh*.05))}catch(e){}await w(1300);const onShip=(WSK.hk|0)-k0,hpL=Bo.hp>=h0-1;me.x=CX;me.y=CY+120;const k1=WSK.hk|0;await w(1300);const inPool=(WSK.hk|0)-k1;gmGod=true;me.hp=me.mh;return {d1,d2,onShip,inPool,hpL}}""")
        bdv=await B.ev("()=>WSK.dv")
        await A.pg.screenshot(path=SH+'t_dive.jpg',quality=78)
        rep('ดำลงเมฆ: เตือน → ดำ (หัวเลือดไม่ลด) · บนเรือไม่โดน · ในแอ่งโดน · อีกเครื่องเห็นด้วย',dv['d1']==1 and dv['d2']==2 and dv['onShip']==0 and dv['inPool']>=2 and dv['hpL'] and bdv==2,[dv,bdv])
        fin=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await w(4800);mons.filter(m=>m.wsp==='fl'||m.wsp==='fr').forEach(m=>{try{dmgMon(m.id,m.hp+10)}catch(e){m.hp=0}});await w(900);const fl=WSK.fl;WSK.nd=0;await w(1200);return {fl,dv:WSK.dv,left:mons.filter(m=>m.wsp&&m.hp>0).map(m=>m.wsp)}}""")
        rep('ตัดครีบทั้งสองข้าง → วาฬดำไม่ได้อีก (หางยังอยู่)',fin['fl']==0 and fin['dv']==0 and fin['left']==['tl'],fin)
        sw=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bo=mons.find(m=>m.t===3);Bo.hp=Bo.mh*.6;await w(500);const s1=WSK.sw,c=WSK.c.length;WSK.stw=0;await w(250);const s2=WSK.sw;
          const a=WSSH.find(q=>!WSK.c.some(([x,y])=>Math.hypot(CX+Math.cos(q)*450-x,CY+Math.sin(q)*450-y)<30));gmGod=true;me.x=CX+Math.cos(a+.2)*500;me.y=CY+Math.sin(a+.2)*500;const d0=Math.hypot(me.x-CX,me.y-CY);await w(800);const d1=Math.hypot(me.x-CX,me.y-CY);
          gmGod=false;const[cx,cy]=WSK.c[0];me.x=cx;me.y=cy;const k0=WSK.hk|0;await w(1100);const inC=(WSK.hk|0)-k0;me.x=CX+Math.cos(a)*500;me.y=CY+Math.sin(a)*500;const k1=WSK.hk|0;await w(1000);const outC=(WSK.hk|0)-k1;gmGod=true;me.hp=me.mh;return {s1,c,s2,inC,outC,pulled:Math.round(d0-d1)}}""")
        bc=await B.ev("()=>WSK.c.length")
        await A.pg.screenshot(path=SH+'t_swallow.jpg',quality=78)
        rep('กลืนฟ้า (66%): วงเพลงทอง 4 วง (ทั้งสองเครื่อง) · ในวงไม่โดน · นอกวงโดน + ถูกดูดเข้ากลาง',sw['s1']==1 and sw['c']==4 and bc==4 and sw['s2']==2 and sw['inC']==0 and sw['outC']>=1 and sw['pulled']>60,[sw,bc])
        at=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await w(3200);const Bo=mons.find(m=>m.t===3);Bo.stun=0;Bo.g1=0;const T=mons.find(m=>m.wsp==='tl');T.stun=0;T.g1=0;Bo.hp=Bo.mh*.45;WSK.lt=0;await w(700);return {b:WSFX.b.length,t:WSFX.t.filter(e=>e.k==='tl').length,l:WSFX.l.length,a40:WSK.a40,adds:mons.filter(m=>m.wsk&&!m.wsp&&m.t!==3&&m.hp>0).length}}""")
        await A.pg.screenshot(path=SH+'t_storm.jpg',quality=78)
        rep('ท่าอื่น: ลำแสงกลืนดาว · หางกวาดครึ่งล่าง · พายุ (<50%) · ฝูงสัตว์เมฆ (75%)',at['b']>=1 and at['t']>=1 and at['l']>=1 and at['adds']>=1,at)
        await A.ev("()=>{me.hp=0;me.down=5}");await B.ev("()=>{me.hp=0;me.down=5}");await A.wait(4500)
        fl=await A.ev("()=>[dg.ph,dg.why||'']");await A.wait(6000)
        fl2=await A.ev("()=>[curMap,me.sty.s,me.sty.n]")
        rep('ทั้งทีมล้ม = แพ้ → กลับผาท่าเรือ · ขั้นไม่ผ่าน',fl[0]=='fail' and fl2[0]==38 and fl2[1]==i0+3 and fl2[2]==0,[fl,fl2])
        await A.ev("()=>{me.down=0;me.hp=me.mh}");await B.ev("()=>{me.down=0;me.hp=me.mh}")
        await A.ev(TALK,1);await adv(A);await A.wait(2500)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1500)
        for k in range(30):
            ph=await A.ev("()=>{const i=mons.findIndex(m=>m.t===3);WSK.dv=0;WSK.sw=0;if(i>=0){mons[i].stun=0;mons[i].hp=Math.min(mons[i].hp,50);try{dmgMon(mons[i].id,mons[i].hp+10)}catch(e){}}return dg.ph}")
            if ph=='win':break
            await A.wait(500)
        wn=await A.ev("()=>[dg.ph,me.sty.n,me.sty.a]")
        await A.wait(11000);await adv(A)
        bk=await A.ev("()=>[curMap,me.sty.s,stTxt()]")
        rep('ชนะ → กลับผาท่าเรือ · ขั้นต่อไปคุยซารา (ตัดสินใจ)',wn[0]=='win' and bk[0]==38 and bk[1]==i0+4 and 'ตัดสินใจ' in bk[2],[wn,bk])
        # ===== ฉากจบ e8 =====
        await B.ev(f"()=>{{me.sty.s={i0+4};me.sty.a=0;me.sty.n=0;ov.hidden=true;enterMap(38,{{x:2000,y:1900}})}}");await B.wait(2600);await adv(B,4)
        res={}
        for C,ch in ((A,1),(B,2)):
            await C.ev(TALK,1);await adv(C)
            for i in range(40):
                if await C.ev("()=>!!(SD.on&&SD.choice)"):break
                await C.wait(150)
            c=await C.ev("()=>SD.choice?SD.choice.map(c=>c[0]).join('|'):''")
            await C.ev(f"()=>{{SD.onChoose({ch})}}");await C.wait(500)
            q=await C.ev("()=>SD.q.map(l=>l[1]).join('|')");await adv(C);await C.wait(900)
            res[ch]=[c,q,await C.ev("()=>[me.sty.e8,me.sty.s,stTxt(),MAPS[38].n]")]
        rep('ฉากจบ e8: ตัวเลือก ปล่อยคืนห้วงดาว / ผนึก · บทพูดตามทางเลือก · ท่าเรือเปลี่ยนชื่อ «ท่าเรือนาวาเมฆ»','ปล่อยวาฬ' in res[1][0] and 'ผนึก' in res[1][0] and 'ท่ามกลางดวงดาว' in res[1][1] and 'โซ่สีทอง' in res[2][1] and res[1][2][0]==1 and res[2][2][0]==2 and res[1][2][1]==i0+5 and res[1][2][3]=='ท่าเรือนาวาเมฆ',[res[1][0],res[1][1][-80:],res[2][1][-80:],res[1][2],res[2][2]])
        await A.ev("()=>{const N=MAPS[38].npc2;me.x=N.x+80;me.y=N.y+60;mons=[]}");await A.wait(2500);await A.pg.screenshot(path=SH+'t_end1.jpg',quality=78)
        await B.ev("()=>{const N=MAPS[38].npc2;me.x=N.x+80;me.y=N.y+60;mons=[]}");await B.wait(1500);await B.pg.screenshot(path=SH+'t_end2.jpg',quality=78)
        ea=await A.ev(TALK,2);eb=await B.ev(TALK,2)
        await adv(A);await A.wait(900);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stP8,(me.mts||[]).includes(7),MT_N,MOUNTS[7]&&MOUNTS[7].n]")
        rep('บทส่งท้าย: นาวิน «ยายวาฬ» (e8=1) / ป้อมผนึก (e8=2) → จบภาค 8 · ฉายา «ผู้นำทางกองเรือเมฆ» · ได้เรือเหาะจิ๋ว',ea[0]=='navin' and 'ยายวาฬ' in ea[1] and 'ป้อมผนึก' not in ea[1] and 'ป้อมผนึก' in eb[1] and 'ยายวาฬ' not in eb[1] and en[0]==await A.ev("()=>STY.findIndex(x=>x.p9s1)") and 'ภาค 9' in en[2] and en[3] and en[4] and en[5]==7 and en[6]=='เรือเหาะจิ๋ว',[ea[1][-80:],eb[1][-80:],en])
        mt=await A.ev("""async()=>{const ic=mountIcon(7);me.mt=7;me.riding=1;await new Promise(r=>setTimeout(r,800));return {ic:typeof ic==='string'&&ic.length>200,ride:me.riding,sp:mtSp(),err:MTV.err||''}}""")
        await A.pg.screenshot(path=SH+'t_skiff.jpg',quality=78)
        mb=await B.ev("()=>{me.mts=[1];mountUI.st=1;mountUI('',true);const btn=ov.querySelector('button[data-mtb=\"7\"]'),txt=[...ov.querySelectorAll('.sr')].map(r=>r.textContent).find(t=>t.includes('เรือเหาะจิ๋ว'))||'';mountBuy(7);const got=(me.mts||[]).includes(7);ov.hidden=true;return [!!btn,txt.includes('จบภาค 8'),got]}")
        rep('เรือเหาะจิ๋ว: ขี่ได้ (เร็ว +65%) · ไอคอนคอก · ซื้อที่คอกไม่ได้ (ได้จากจบภาค 8 เท่านั้น)',mt['ic'] and mt['ride']==1 and abs(mt['sp']-.65)<.01 and mb==[False,True,False],[mt,mb])
        await A.ev("()=>{me.riding=0}")
        rp=await A.ev("()=>{const N=MAPS[38].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();const c=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';stClose();return c}")
        rep('จบภาคแล้วคุยนาวินเล่นตาพายุซ้ำได้','ตาพายุ' in rp,rp)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
