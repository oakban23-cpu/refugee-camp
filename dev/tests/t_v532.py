"""v532 ภาค 8 บทที่ 4 · ท้องวาฬ: วาฬกลืนนาวิน · ล่า 30 · แผนง้างปาก (ยายเมฆา) · ดันเจี้ยนในท้องวาฬ (กรดขึ้นลง/ซี่โครง · ผนังบีบ · เยื่อกั้น · ผู้เฝ้าไข่มุก) · ไข่มุกดาว · ฉายา"""
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
SH='../v532/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Wa'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Wb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p8s4)");n5=await A.ev("()=>STY.findIndex(x=>x.p8s5)-STY.findIndex(x=>x.p8s4)")
        rep('ภาค 8 บทที่ 4 ต่อจากบทที่ 3 (5 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p8c3)")+1 and n5==5,[i0,n5])
        for C,pg in ((A,1),(B,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:{pg}}};me.ach=me.ach||{{}};me.ach.stN3=1;me.wv=[1,9,32,38,39,2,3];ov.hidden=true;enterMap(39,{{x:620,y:1760}})}}")
        await A.wait(2600)
        nv0=await A.ev("()=>MAPS[39].npc.x>0")
        qa=await A.ev("()=>{const N=MAPS[39].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A)
        await A.wait(900)
        nv1=await A.ev("()=>[MAPS[39].npc.x<0,me.sty.s,stTxt()]")
        await A.ev("()=>{me.x=1500;me.y=1600;SGS.lx=me.x;SGS.ly=me.y;mons=[]}");await A.wait(900);await A.pg.screenshot(path=SH+'t_shadow.jpg',quality=78)
        rep('คุยกริฟ: วาฬโผล่กลืนนาวิน → นาวินหายจากจุดขึ้นฝั่ง · ขั้นล่า',nv0 and qa[0]=='grif' and 'งับ' in qa[1] and nv1[0] and nv1[1]==i0+1,[nv0,qa[0],qa[1][-120:],nv1])
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<30;i++)stKill(0,0)}");await adv(A)
        s2=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ล่า 30 → คุยกริฟ (แผนง้างปากวาฬ)',s2[0]==i0+2 and 'กริฟ' in s2[1],s2)
        qp=await A.ev("()=>{const N=MAPS[39].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        await adv(A)
        s3=await A.ev("()=>[me.sty.s,stCur().g]")
        rep('แผนง้างปาก: ยายเมฆาเตือนเรื่องกรด/ซี่โครง → ขั้นดันเจี้ยน',('ซี่โครง' in qp and 'สมอ' in qp) and s3==[i0+3,'wbl'],[qp[-160:],s3])
        # ===== ดันเจี้ยน =====
        await A.ev("()=>{const N=MAPS[39].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A);await A.wait(2600)
        rid=await A.ev("()=>curMap")
        await B.ev(f"()=>{{dgMap({rid});enterMap({rid},{{x:WBX0+140,y:CY+40}})}}");await B.wait(3000)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1500)
        g0=await A.ev("()=>[WBLI(),dg.ph,isHost(),mons.filter(m=>m.wr&&m.hp>0).length,WBQ.mb,curMap>=46000&&curMap<47000,MAPS[curMap].th]")
        await A.ev("()=>{me.x=CX-470;me.y=CY+20}");await A.wait(800);await A.pg.screenshot(path=SH+'t_belly.jpg',quality=78)
        rep('เข้าท้องวาฬ (ห้อง 46xxx · ธีม 40) · เริ่ม = ช่วงเดิน · ปรสิต 3 รัง · เยื่อกั้นปิด',g0[0] and g0[1]=='run' and g0[3]>=11 and g0[4]==1 and g0[5] and g0[6]==40,g0)
        cl=await A.ev("async()=>{me.x=WBXM+60;me.y=CY;await new Promise(r=>setTimeout(r,300));return Math.round(me.x)}")
        rep('เยื่อกั้นปิด: เดินผ่านเข้าห้องหัวใจไม่ได้',cl<=await A.ev("()=>WBXM-20"),cl)
        # กรด: ยืนในกรด vs บนซี่โครง
        ac=await A.ev("""async()=>{mons.forEach(m=>{m.stun=99;m.x=CX+200;m.y=CY});gmGod=false;const w=ms=>new Promise(r=>setTimeout(r,ms));me.hp=me.mh;me.x=WBRB[1];me.y=CY+30;WBQ.ac=0;WBQ.at=0;WBQ.st=99;await w(300);const a1=WBQ.ac;WBQ.at=0;await w(300);const a2=WBQ.ac;
          const k0=WBQ.hk|0,h0=me.hp;await w(1300);const onRib=(WBQ.hk|0)-k0,pr=[Math.round(me.x),Math.round(me.y)];me.x=CX-470;me.y=CY+20;const k1=WBQ.hk|0,h1=me.hp;await w(1300);const inAcid=(WBQ.hk|0)-k1,lost=h1-me.hp;gmGod=true;return {a1,a2,onRib,pr,inAcid,lost,safe:wbSafe(WBRB[1],CY+30)}}""")
        bac=await B.ev("()=>WBQ.ac")
        await A.pg.screenshot(path=SH+'t_acid.jpg',quality=78)
        rep('กรดขึ้นลง: เตือน → ท่วม · ยืนในกรดเสียเลือด · บนซี่โครงไม่เสีย · อีกเครื่องเห็นกรดท่วมด้วย',ac['a1']==1 and ac['a2']==2 and ac['onRib']==0 and ac['inAcid']>=2 and ac['lost']>0 and ac['safe'] and bac==2,[ac,bac])
        sq=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await w(4800);WBQ.ac=0;WBQ.at=99;gmGod=false;me.hp=me.mh;me.x=CX-470;const yo=CY+wbHH(CX-470)*.8;me.y=yo;WBQ.st=0;await w(400);const s1=WBQ.sq,inW=WBFX.b.length;await w(1700);const lost=me.mh-me.hp;await w(500);gmGod=true;return {s1,inW,lost,dy:Math.round(Math.abs(me.y-CY)-Math.abs(yo-CY))}}""")
        rep('ผนังท้องบีบ: แถบเตือนขอบ → บีบ เสียเลือด + ถูกดันเข้ากลาง',sq['s1']==1 and sq['inW']>=1 and sq['lost']>0 and sq['dy']<0,sq)
        op=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));WBQ.at=99;WBQ.ac=0;WBQ.st=99;mons.push({id:++mid,x:CX,y:CY,tx:CX,ty:CY,t:0,L:140,p:0,hx:CX,hy:CY,hp:1,mh:1,tg:null,tt:0,ac:0,w:null,lg:0,wbl:1,wr:1});await w(400);const c1=WBQ.mb;mons.filter(m=>m.wr).forEach(m=>{try{dmgMon(m.id,m.hp+10)}catch(e){m.hp=0}});await w(900);const c2=WBQ.mb;
          me.x=WBCX-60;me.y=CY+110;await w(1200);const B=mons.find(m=>m.t===3&&m.hp>0);return {c1,c2,ph:dg.ph,bn:B&&MAPS[curMap].boss.n}}""")
        bmb=await B.ev("()=>WBQ.mb")
        rep('ฆ่าปรสิตหมด → เยื่อเปิด (ทั้งสองเครื่อง) → เข้าห้องหัวใจ = ผู้เฝ้าไข่มุกตื่น',op['c1']==1 and op['c2']==0 and bmb==0 and op['ph']=='boss' and op['bn']=='ผู้เฝ้าไข่มุก',[op,bmb])
        mech=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bo=mons.find(m=>m.t===3);Bo.inv=0;Bo.stun=0;Bo.g1=0;Bo.g2=0;WBQ.ac=0;WBQ.at=99;me.x=Bo.x-260;me.y=Bo.y+20;await w(500);const a=[WBFX.t.length,WBFX.d.length];const d0=Math.hypot(me.x-Bo.x,me.y-Bo.y);await w(2600);const d1=Math.hypot(me.x-Bo.x,me.y-Bo.y);return {a,d0:Math.round(d0),d1:Math.round(d1)}}""")
        await A.pg.screenshot(path=SH+'t_boss.jpg',quality=78)
        rep('ผู้เฝ้าไข่มุก: หนวดแสง (แนวเส้น) · ดูดแสงดึงเข้าหา',mech['a'][0]>=1 and mech['a'][1]>=1 and mech['d1']<mech['d0']-60,mech)
        sh=await A.ev("async()=>{const Bo=mons.find(m=>m.t===3);Bo.hp=Bo.mh*.45;await new Promise(r=>setTimeout(r,700));const h=Bo.hp;try{dmgMon(Bo.id,Math.round(Bo.mh*.1))}catch(e){}await new Promise(r=>setTimeout(r,300));return [Bo.shT>0&&Bo.hp>=h-1?1:0,WBQ.ac,mons.filter(m=>m.wbl&&m.t!==3&&m.hp>0).length,Bo.shT,WBQ.sh,Bo.hp/Bo.mh]}")
        await A.pg.screenshot(path=SH+'t_pearl.jpg',quality=78)
        rep('เลือด < 70% ปรสิตระลอก · < 50% หดเข้าไข่มุก (อมตะ) + กรดท่วมทันที',sh[0]==1 and sh[1]>=1 and sh[2]>=3,sh)
        await A.ev("()=>{me.hp=0;me.down=5}");await B.ev("()=>{me.hp=0;me.down=5}");await A.wait(4500)
        fl=await A.ev("()=>[dg.ph,dg.why||'']");await A.wait(6000)
        fl2=await A.ev("()=>[curMap,me.sty.s,me.sty.n]")
        rep('ทั้งทีมล้ม = แพ้ → กลับสุสานเรือ · ขั้นไม่ผ่าน',fl[0]=='fail' and fl2[0]==39 and fl2[1]==i0+3 and fl2[2]==0,[fl,fl2])
        await A.ev("()=>{me.down=0;me.hp=me.mh}");await B.ev("()=>{me.down=0;me.hp=me.mh}")
        # ===== ชนะ =====
        await A.ev("()=>{const N=MAPS[39].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A);await A.wait(2500)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1500)
        await A.ev("()=>{mons.filter(m=>m.wr).forEach(m=>{try{dmgMon(m.id,m.hp+10)}catch(e){m.hp=0}})}");await A.wait(900)
        await A.ev("()=>{me.x=WBCX-60;me.y=CY+110}");await A.wait(1500)
        for k in range(30):
            ph=await A.ev("()=>{const i=mons.findIndex(m=>m.t===3);if(i>=0){mons[i].inv=0;mons[i].shT=0;mons[i].stun=0;mons[i].hp=Math.min(mons[i].hp,50);try{dmgMon(mons[i].id,mons[i].hp+10)}catch(e){}}return dg.ph}")
            if ph=='win':break
            await A.wait(500)
        wn=await A.ev("()=>[dg.ph,me.sty.n,me.sty.a]")
        await A.wait(11000);await adv(A)
        bk=await A.ev("()=>[curMap,me.sty.s,stTxt(),MAPS[39].npc.x>0]")
        rep('ชนะ → กลับสุสานเรือ · นาวินกลับมาที่จุดขึ้นฝั่ง · ขั้นต่อไปคุยนาวิน',wn[0]=='win' and bk[0]==39 and bk[1]==i0+4 and 'นาวิน' in bk[2] and bk[3],[wn,bk])
        await B.ev(f"()=>{{me.sty.s={i0+4};me.sty.a=0;me.sty.n=0;enterMap(39,{{x:640,y:1700}})}}");await B.wait(2600)
        qn=await A.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        qnb=await B.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        await adv(A);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stN4]")
        rep('คุยนาวิน: ไข่มุกดาว · ยายเมฆาร้องท่อนที่สี่ · กริฟแยกตาม p8g → จบบทที่ 4 · ฉายา «ผู้กลับออกมาจากท้องวาฬ»',qn[0]=='navin3' and 'ท่อนที่สี่' in qn[1] and 'ฟังคุ้น' in qn[1] and 'สิบปีเพื่อเรือลำเดียว' in qnb and 'ฟังคุ้น' not in qnb and en[0]==await A.ev("()=>STY.findIndex(x=>x.p8s5)") and 'ซารา' in en[2] and en[3],[qn[0],qn[1][-120:],qnb[-80:],en])
        rp=await A.ev("()=>{const N=MAPS[39].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();const c=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';stClose();return c}")
        rp2=await A.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();const c=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';stClose();return c}")
        rep('จบบทแล้ว: คุยกริฟเล่นในท้องวาฬซ้ำ · คุยนาวินยังเล่นดวลบนเรือดำซ้ำ','ในท้องวาฬ' in rp and 'ดวลบนเรือดำ' in rp2,[rp,rp2])
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
