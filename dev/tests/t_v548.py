"""v548 ภาค 10 บทที่ 2 · นครรากลึก: ธุลี (แยก e9) · ทางลงตะกร้าเถาวัลย์บนยอดไม้ (แมพ 43) · แมพ 44 นครรากลึก (ถ้ำ · ต้นค้ำ 5 ต้น · บ่อยางทอง)
   เฒ่าแก่นไม้ (แยก e/e4) · แบกไหยางทอง 5 ต้น (ไหแตกตอนล้ม) · ล่า 40 · ดัน «ศึกป้องกันต้นค้ำ» (รากแก้ว 3 · คลื่น · บอสมุดดิน/รอยแยก/เรียกลูกฝูง) · จบบท · ฉายา · เล่นซ้ำ"""
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
SH='../v548/'
CLEAN="()=>{try{localStorage.setItem('refugee_wn',WNV)}catch(e){};const p=document.getElementById('wnp');if(p)p.remove();PALG.card=null;PALG.title=null;banner=null;document.querySelectorAll('.tipc,#tipc').forEach(e=>e.remove())}"
TALK44="(n)=>{const N=n===1?MAPS[44].npc:MAPS[44].npc2;npcSel=n;me.x=N.x;me.y=N.y+40;PBS.lx=me.x;PBS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}"
GOD5="const mh0=me.mh;me.mh=5e6;me.hp=me.mh;gmGod=false;"
UNGOD="gmGod=true;me.mh=mh0;me.hp=me.mh;"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ka'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Kb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.pa2s)")
        info=await A.ev("()=>[STY.findIndex(x=>x.pac1),STY.length,STCH[STY[STY.findIndex(x=>x.pa2s)].c],STY.findIndex(x=>x.pa2c),STY.findIndex(x=>x.pa2d),STY[STY.findIndex(x=>x.pa2d)].g]")
        rep('ภาค 10 บทที่ 2 ต่อจากบทที่ 1 (7 ขั้น · ขั้นดัน ptd)',i0==info[0]+1 and info[1]>=i0+7 and info[3]==i0+6 and info[4]==i0+5 and info[5]=='ptd' and 'บทที่ 2' in info[2],[i0,info])
        sv=await A.ev("()=>{const o=cleanChar({lv:99,sty:{s:5,n:0,a:0,pa2j:21,pacr:31,zz9:4}});return o&&o.sty}")
        rep('เซฟ: คีย์ pa2j ไม่หายตอนโหลด',sv.get('pa2j')==21 and sv.get('pacr')==31 and 'zz9' not in sv,sv)
        for C,e,e4,e9 in ((A,1,2,1),(B,2,1,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:{e},e4:{e4},p6h:2,e6:1,e7:1,p7m:2,p8g:1,e8:1,q9:1,e9:{e9},pacr:31,parr:31,paro:1234}};me.wv=[1,9,32,36,38,39,40,41,42,43,2,3];ov.hidden=true;enterMap(43,{{x:PATHU.x+40,y:PATHU.y+40}})}}")
        await A.wait(2800);await A.ev(CLEAN);await B.ev(CLEAN)
        g0=await A.ev("()=>MAPS[43].gates.filter(G=>G.to===44).map(G=>[gHid(G),wpGateOk(G),paIn(G.x,G.y,0),paK(G.x,G.y,0)])")
        TALK43="()=>{const N=MAPS[43].npc;npcSel=1;me.x=N.x;me.y=N.y+40;PAS.lx=me.x;PAS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|'),N.x]}"
        qa=await A.ev(TALK43);qb=await B.ev(TALK43)
        await adv(A);await adv(B)
        g1=await A.ev("()=>MAPS[43].gates.filter(G=>G.to===44).map(G=>[gHid(G),wpGateOk(G)])")
        rep('คุยธุลีที่ขอบเหว: แยกตาม e9 (นับดาว / ทางเดินแสงเงิน) · เฒ่าแก่นไม้มีเรื่องเล่า',qa[0]=='thu' and 'สามร้อยกว่าจุด' in qa[1] and 'แสงเงิน' not in qa[1] and 'แสงเงิน' in qb[1] and 'สามร้อยกว่าจุด' not in qb[1] and 'เฒ่าแก่นไม้' in qa[1] and qa[2]>0,[qa[0],qa[1][-120:],qb[1][-80:]])
        rep('ทางลงตะกร้าเถาวัลย์บนยอดไม้ฝั่งตะวันตก (แมพ 43) ซ่อนก่อนคุย · เปิดหลังคุย',g0==[[True,False,True,0]] and g1==[[False,True]],[g0,g1])
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{const G=MAPS[43].gates.find(G=>G.to===44);me.x=G.x+70;me.y=G.y+30;PAS.lx=me.x;PAS.ly=me.y;mons=[]}");await A.wait(1200);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_basket.jpg',quality=80);await A.pg.set_viewport_size({'width':390,'height':844})
        for C in (A,B):
            await C.ev("()=>{const G=MAPS[43].gates.find(G=>G.to===44);me.x=G.x;me.y=G.y;PAS.lx=me.x;PAS.ly=me.y;useGate()}")
        await A.wait(3000);await adv(A);await adv(B);await A.ev(CLEAN)
        m=await A.ev("()=>[curMap,stCur().pa2k?1:0,MAPS[44].n,WMN[44]&&WMN[44][2],WMLV[44],MAPS[44].mth,pbSafe(me.x,me.y),pbZone(me.x,me.y),MAPS[44].npc2.x>0]")
        HC=A
        for C in (A,B):
            if await C.ev("()=>isHost()"):HC=C
        lv=await HC.ev("()=>{const L=mons.filter(m=>m.t<3);return [L.length,Math.min(...L.map(m=>m.L)),Math.max(...L.map(m=>m.L)),L.every(m=>pbIn(m.hx,m.hy,0)&&!pbSafe(m.hx,m.hy)),[...new Set(L.map(m=>m.t))].sort()]}")
        await A.pg.screenshot(path=SH+'t_arrive.jpg',quality=78)
        rep('ลงตะกร้า → แมพ 44 นครรากลึก (ลานลิฟต์ปลอดภัย) · ขั้นคุยเฒ่าแก่นไม้ · มอนธีม 46 Lv 160–164 ไม่เกิดในใจกลางนคร · ธุลีย้ายลงมาอยู่ในนคร',m[0]==44 and m[1]==1 and m[2]=='นครรากลึก' and m[3]==m[2] and m[4]==[160,164] and m[5]==46 and m[6] and m[7]=='lift' and m[8] and lv[0]>10 and 160<=lv[1] and lv[2]<=165 and lv[3],[m,lv])
        geo=await A.ev("""()=>({trunk:PBT.map(([x,y,r])=>pbIn(x,y+r+30,0)),wall:[pbIn(200,200,0),pbIn(3100,1600,0),pbIn(1600,3100,0),pbIn(330,1640,0)],mouth:PBM.map(([x,y])=>pbIn(x,y+40,0)&&!PBT.some(([tx,ty,tr])=>Math.hypot(x-tx,y+40-ty)<tr*.84+14)),
          paths:PBPATH.every(L=>L.every(([x,y])=>pbIn(x,y,30))),nests:MAPS[44].nests.every(([x,y])=>pbIn(x,y,40)&&!pbSafe(x,y)),hall:pbSafe(PBKED.x,PBKED.y)&&pbSafe(PBW.x,PBW.y)&&pbZone(PBW.x,PBW.y+40)==='well',aq:[aqWalkable(200,200),aqWalkable(1600,1600)],gate:pbIn(1600,230,0)&&pbIn(1600,440,0)})""")
        rep('รูปทรงถ้ำ: ผนังหินเดินไม่ได้ (ออโต้เควสไม่ตัดผ่าน) · ปากรากทั้ง 5 ยืนได้ · ทางเดิน/รังมอนอยู่ในถ้ำ · ห้องโถงราก+บ่อยางทองปลอดภัย',all(geo['trunk']) and not any(geo['wall']) and all(geo['mouth']) and geo['paths'] and geo['nests'] and geo['hall'] and geo['aq']==[False,True] and geo['gate'],geo)
        w=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=1600;me.y=600;PBS.lx=me.x;PBS.ly=me.y;await w(300);const a=[Math.round(me.x),Math.round(me.y)];me.x=250;me.y=1640;await w(300);return {a,b:[Math.round(me.x),Math.round(me.y)]}}""")
        rep('เดินทะลุผนังถ้ำไม่ได้ (ดึงกลับจุดล่าสุด)',w['a']==w['b'],w)
        await A.ev("()=>{me.x=PBHALL.x+60;me.y=PBHALL.y+150;PBS.lx=me.x;PBS.ly=me.y;mons=[]}");await A.pg.set_viewport_size({'width':1280,'height':720});await A.wait(1200);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_city.jpg',quality=82);await A.pg.set_viewport_size({'width':390,'height':844})
        ka=await A.ev(TALK44,1);kb=await B.ev(TALK44,1)
        await adv(A);await adv(B)
        rep('เฒ่าแก่นไม้: บรรพบุรุษคือคนงานขุดฐานหอคอย · แยกตาม e (ผนึกยังกด/เทพจากไป) และ e4 (ผนึกหัวใจ/รวมหัวใจ) · ธรณินผู้แบกคนแรก → ขั้นแบกไห',
            ka[0]=='ked' and 'คนงานเหมือง' in ka[1] and 'ผนึกนั้นยังกดอยู่' in ka[1] and 'จากไป' not in ka[1] and 'ปิดทางยางทองไปครึ่งหนึ่ง' in ka[1] and 'รวมหัวใจคืน' not in ka[1] and 'จากไป' in kb[1] and 'รวมหัวใจคืน' in kb[1] and 'ธรณิน' in ka[1] and await A.ev("()=>!!stCur().pa2j"),[ka[0],ka[1][-160:],kb[1][-120:]])
        await until_a(A);await A.ev(CLEAN)
        aq0=await A.ev("()=>{const r=arAqT(stCur());return r}")
        br=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons=[];me.x=PBW.x+80;me.y=PBW.y+24;PBS.lx=me.x;PBS.ly=me.y;await w(1400);const c1=PBS.carry,aq=arAqT(stCur());me.down=1;await w(300);const c2=PBS.carry;me.down=0;me.hp=me.mh;await w(200);return [c1,c2,aq&&aq.lb]}""")
        rep('แบกไห: ยืนที่บ่อ 1 วิรับไห · ออโต้เควสพาไปปากรากที่ใกล้สุด · ล้มระหว่างแบก = ไหแตก',aq0 and 'บ่อ' in aq0.get('lb','') and br[0]==1 and br[1]==0 and 'ปากราก' in (br[2] or ''),[aq0,br])
        order=[2,0,4,1,3];got=[]
        for i in order:
            r=await A.ev(f"""async()=>{{const w=ms=>new Promise(r=>setTimeout(r,ms));mons=[];me.x=PBW.x+80;me.y=PBW.y+24;PBS.lx=me.x;PBS.ly=me.y;await w(1350);const c=PBS.carry;const[mx,my]=PBM[{i}];me.x=mx;me.y=my+40;PBS.lx=me.x;PBS.ly=me.y;await w(1350);return [c,me.sty.pa2j|0,me.sty.n,PALG.card&&PALG.card.h,PBS.carry]}}""")
            got.append(r)
        await A.ev("()=>{PALG.card=null;me.x=PBW.x+120;me.y=PBW.y+60;PBS.lx=me.x;PBS.ly=me.y}");await A.pg.set_viewport_size({'width':1280,'height':720});await A.wait(900);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_sap.jpg',quality=80);await A.pg.set_viewport_size({'width':390,'height':844})
        await adv(A)
        s4=await A.ev("()=>[me.sty.s,stCur().g,PBN.lamps.length,PBN.mush.length]")
        rep('รดยางทองครบ 5 ต้น (การ์ดชื่อต้นค้ำ+เสียงคนรากลึก · ตามลำดับไหนก็ได้) → ขั้นล่า',got[-1][1]==31 and got[-1][2]==5 and all(g[0]==1 and g[4]==0 for g in got) and all('/5' in (g[3] or '') for g in got) and 'ผู้เหนื่อย' in (got[2][3] or '') and s4[0]==i0+4 and s4[1]=='kill',[got,s4])
        mon=await A.ev("""()=>{mons=[];const mk=(t,x,y)=>{const m={id:++mid,x,y,tx:x,ty:y,t,L:161,p:1,hx:x,hy:y,hp:999,mh:999,tg:null,tt:0,ac:0,w:null,lg:0};mons.push(m);return m};const a=mk(1,500,1640);terMons();a.x=250;a.y=1640;terMons();const r=[Math.round(a.x),Math.round(a.y)];mons=[];return r}""")
        rep('มอน (รวมผีเสื้อ) ออกนอกถ้ำไม่ได้',mon==[500,1640],mon)
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A);await A.wait(900);await adv(A)
        s5=await A.ev("()=>[me.sty.s,stCur().g,stCur().k,stTxt()]")
        rep('ล่า 40 → ขั้นดันป้องกันต้นค้ำ (คุยเฒ่าแก่นไม้)',s5[0]==i0+5 and s5[1]=='ptd' and s5[2]=='ked',s5)
        await until_a(A);await A.ev(TALK44,1);await adv(A,6)
        for i in range(20):
            if await A.ev("()=>PTDI()"):break
            await A.ev("()=>{if(SD.on&&SD.choice&&SD.onChoose){SD.onChoose(1)}}");await A.wait(300)
        lob=await A.ev("()=>[PTDI(),curMap>=41000&&curMap<42000,MAPS[curMap].n,dg.ph,dgStatusText(),MAPS[curMap].boss.n,MAPS[curMap].th]")
        await A.ev("()=>dgStart()");await adv(A,8);await A.wait(1500)
        run=await A.ev("()=>[dg.ph,PTW.st,PTW.e.slice(),dgStatusText(),trees.filter(t=>t.k==='ptdroot').length,trees.filter(t=>t.k==='ptdtun').length,!!trees.find(t=>t.k==='ptdtrunk')]")
        rep('เข้าดัน «ศึกป้องกันต้นค้ำ» (ห้อง 41xxx) · ล็อบบี้ → เริ่ม: รากแก้ว 3 เส้น 100% · อุโมงค์ 4 · ลำต้นแม่ไม้กลางลาน',lob[0] and lob[1] and lob[2]=='ศึกป้องกันต้นค้ำ' and lob[3]=='lobby' and lob[5]=='ตัวกัดรากยักษ์' and lob[6]==46 and run[0]=='run' and run[2]==[100,100,100] and 'ราก 100/100/100' in run[3] and run[4]==3 and run[5]==4 and run[6],[lob,run])
        wv=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));PTW.nt=0;await w(3200);const M=mons.filter(m=>m.ptd&&m.hp>0);return [PTW.st,PTW.wv,M.length,PTTL.length>0&&PTTL.every(e=>Math.hypot(e.x-CX,e.y-CY)>DR-70),[...new Set(M.map(m=>m.t))].sort()]}""")
        rep('คลื่นที่ 1: ฝูงกัดแผ่นดินมุดออกจากอุโมงค์ที่ขอบลาน',wv[0]=='wave' and wv[1]==1 and wv[2]>=3 and wv[3],wv)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{me.x=CX+60;me.y=CY+330}");await A.wait(1500);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_ptd.jpg',quality=82);await A.pg.set_viewport_size({'width':390,'height':844})
        rt=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));PTW.st='brk';PTW.nt=999;mons=[];PTW.e=[100,100,100];const[ex,ey]=ptdE()[2];me.x=CX-380;me.y=CY-200;
          const m={id:++mid,x:ex+60,y:ey+40,tx:ex,ty:ey,t:0,L:160,p:0,hx:ex,hy:ey,hp:1e9,mh:1e9,tg:null,tt:0,ac:0,w:null,lg:0,ptd:1};mons.push(m);await w(2600);const bite=PTW.e[2];
          mons=[];PTW.e[0]=50;const[ax,ay]=ptdE()[0];me.x=ax+40;me.y=ay+30;await w(2200);const rep=PTW.e[0];
          const c={id:++mid,x:CX+5,y:CY+5,tx:CX,ty:CY,t:0,L:160,p:0,hx:CX,hy:CY,hp:1e9,mh:1e9,tg:null,tt:0,ac:0,w:null,lg:0,ptd:1};mons.push(c);await w(250);const out=Math.round(Math.hypot(c.x-CX,c.y-CY));
          mons=[];PTW.e=[0,0,100];const s={id:++mid,x:CX,y:CY-330,tx:CX,ty:CY-330,t:0,L:160,p:0,hx:CX,hy:CY-330,hp:1e9,mh:1e9,tg:null,tt:0,ac:0,w:null,lg:0,ptd:1};mons.push(s);me.x=CX-420;me.y=CY+100;let mn=1e9;for(let k=0;k<160;k++){await w(100);mn=Math.min(mn,Math.hypot(s.x-CX,s.y-CY));if(Math.hypot(s.x-ptdE()[2][0],s.y-ptdE()[2][1])<80)break}
          const reach=Math.round(Math.hypot(s.x-ptdE()[2][0],s.y-ptdE()[2][1]));mons=[];PTW.e=[100,100,100];return [Math.round(bite*10)/10,Math.round(rep*10)/10,out,Math.round(mn),reach]}""")
        rep('มอนวิ่งไปกัดรากแก้ว (เลือดลด) · ยืนในวงทองตอนไม่มีศัตรู = ซ่อม · มอนเดินทะลุลำต้นไม่ได้ (อ้อมไปหารากฝั่งตรงข้าม)',rt[0]<100 and rt[1]>50.8 and rt[2]>=125 and rt[3]>=118 and rt[4]<120,rt)
        bs=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons=[];PTW.wv=3;PTW.st='wave';PTW.q=0;await w(800);const Bm=mons.find(m=>m.t===3&&m.hp>0);return [dg.ph,PTW.st,!!Bm,Bm&&MAPS[curMap].boss.n,dgStatusText()]}""")
        rep('ผ่าน 3 คลื่น → ตัวกัดรากยักษ์มุดขึ้นมา (ช่วงบอส)',bs[0]=='boss' and bs[1]=='boss' and bs[2] and '🪲' in bs[4],bs)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{const Bm=mons.find(m=>m.t===3);me.x=Bm.x-120;me.y=Bm.y+160}");await A.wait(1400);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_boss.jpg',quality=82)
        bu=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3&&m.hp>0);Bm.w1=999;Bm.w2=999;Bm.w3=999;Bm.stun=0;mons=mons.filter(m=>m.t===3);PTW.e=[100,100,100];const[dx,dy]=ptDest(2);me.x=dx+30;me.y=dy+20;
          ptdBurrow(Bm,2);await w(900);const mid1=[PTW.bur>0,Bm.inv,Math.round(Bm.x),Math.round(Bm.y)];await w(1700);const near=Math.round(Math.hypot(Bm.x-dx,Bm.y-dy));await w(1200);const after=[PTW.e[2],Bm.inv,Bm.stun>0,PTW.bur,PTEB.length];
          Bm.stun=0;Bm.w1=999;Bm.w2=999;me.x=CX-380;me.y=CY+260;ptdBurrow(Bm,0);await w(3700);const r0=PTW.e[0];Bm.w1=999;Bm.w2=999;return {mid1,near,after,r0}}""")
        await A.pg.screenshot(path=SH+'t_burrow.jpg',quality=80)
        rep('บอสมุดดิน: กลายเป็นเนินดินเคลื่อนไปหารากแก้ว · ยืนขวางในวงเตือน = รากเสีย 3.5% + บอสมึน · ไม่มีคนขวาง = รากเสีย 7%',
            bu['mid1'][0] and bu['near']<12 and 96.4<=bu['after'][0]<=97.4 and bu['after'][1]==0 and bu['after'][2] and bu['after'][3]==0 and bu['after'][4]>=1 and bu['r0']==93,bu)
        ql=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));"+GOD5+"const Bm=mons.find(m=>m.t===3&&m.hp>0);Bm.stun=0;Bm.ql=null;Bm.w2=999;me.x=CX+300;me.y=CY+120;Bm.x=CX-300;Bm.y=CY-200;Bm.w1=0;await w(300);const warn=PTLN.length;await w(1700);const hit=me.hp<me.mh;const r=[warn,hit];"+UNGOD+"Bm.w1=999;return r}")
        rep('รอยแยก: เตือนเป็นแนวสีอำพัน 1.5 วิ แล้วแตก ยืนในแนวโดน',ql[0]>=1 and ql[1],ql)
        sm=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3&&m.hp>0);mons=mons.filter(m=>m.t===3);Bm.hp=Bm.mh*.45;Bm.w3=0;Bm.w1=999;Bm.w2=999;await w(500);return mons.filter(m=>m.ptd&&m.t===0&&m.hp>0).length}")
        rep('เลือดบอสต่ำกว่า 50%: เรียกลูกฝูงจากอุโมงค์',sm>=2,sm)
        for i in range(30):
            if await A.ev("()=>dg.ph==='win'||dgRew"):break
            await A.ev("()=>{mons.forEach(m=>{if(m.t!==3)m.hp=0});mons=mons.filter(m=>m.t===3);const Bm=mons.find(m=>m.t===3&&m.hp>0);if(Bm){Bm.inv=0;Bm.tf=0;PTW.bur=0;Bm.hp=1;me.x=Bm.x;me.y=Bm.y+80;try{dmgMon(Bm,1e6)}catch(e){Bm.hp=0}}}");await A.wait(400)
        wn=await A.ev("()=>[dg.ph,banner&&banner.s,me.sty.n]")
        for i in range(40):
            if await A.ev("()=>curMap===44"):break
            await A.wait(500)
        await adv(A)
        s6=await A.ev("()=>[curMap,me.sty.s,stCur()&&stCur().k]")
        rep('ชนะตัวกัดรากยักษ์ → รางวัลเนื้อเรื่อง → กลับนครรากลึก → ขั้นคุยเฒ่าแก่นไม้',wn[0]=='win' and wn[2]==1 and s6==[44,i0+6,'ked'],[wn,s6])
        await until_a(A)
        qe=await A.ev(TALK44,1)
        await adv(A);await A.wait(600);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stR2]")
        rep('เฒ่าแก่นไม้: รอยกัดที่ใหญ่กว่าสามเท่าใกล้ธรณิน · ขอให้ขึ้นไปถามทุกเมือง → จบบทที่ 2 · ฉายา «ผู้แบกยางทอง»',qe[0]=='ked' and 'ธรณิน' in qe[1] and 'ทุกเมือง' in qe[1] and en[0]==i0+7 and ((en[0]==en[1] and 'นครรากลึก' in en[2]) or en[1]>i0+7) and en[3],[qe[1][-120:],en])
        rp=await A.ev("()=>{const N=MAPS[44].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.choice?SD.choice.map(c=>c[0]).join('|'):''}")
        await A.ev("()=>{try{stClose()}catch(e){}}")
        rep('เล่นซ้ำศึกป้องกันต้นค้ำผ่านเฒ่าแก่นไม้หลังจบบท','ศึกป้องกันต้นค้ำ' in rp,rp)
        dr=await A.ev("()=>{const c=document.createElement('canvas');c.width=400;c.height=300;const x=c.getContext('2d'),g0=g;let ok=1;try{g=x;kedV(100,200,1,1);for(let v=0;v<6;v++)pbFolkV(200+v*20,200,1,1,v);PALK.pbhut({x:300,y:250,v:1},1);PALK.pbmush({x:350,y:280,v:2,sc:1},1)}catch(e){ok=String(e)}finally{g=g0}return [ok,typeof NPC3[44].d.npv]}")
        rep('วาดเฒ่าแก่นไม้ (NPC แบบใหม่) · ชาวรากลึก 6 แบบ · บ้านโดมราก · เห็ดยักษ์ ไม่มี error',dr[0]==1,dr)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        errs=await A.ev("()=>[NPV.err||'',MV9.err||'',window.__err]")
        rep('ไม่มี error ในหน้าเกม',not E and not errs[0] and not errs[2],[E[:4],errs])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
