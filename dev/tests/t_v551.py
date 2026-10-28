"""v551 ภาค 10 บทที่ 5 · แผ่นดินที่แบกฟ้า (บทจบเนื้อเรื่องหลัก)
   คุยธุลี (คนจากทุกเมืองลงมา แยก e6/p8g) → ดันสุดท้าย «ฐานฟ้า» (วงยก · แถบทรุด · เศษความล้า · กระซิบ · น้ำหนัก · พันธมิตร 9 กลุ่มตามคำมั่น · แพ้/ชนะ · ซิงก์ 2 เครื่อง)
   → คุยธรณิน เลือก e10 (A=1 🏡 / B=2 🌳) → บทส่งท้ายกรองตามทางเลือกทุกภาค → รางวัล (สัตว์เลี้ยง · สัตว์ขี่ · ฉายา) → กลับค่ายคุยเรนน์ → จบเนื้อเรื่องหลัก
   · โลกหลังจบ: ฐานแผ่นดิน (ธรณินสงบ/หลับ) · ค่ายเปลี่ยนตามฉากจบ · เล่นซ้ำ · ฉากภาพยนตร์"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
SEEN=set()
async def adv(A,n=24,rec=None):
    for i in range(n):
        q=await A.ev("()=>{stTick();const q=SD.on?SD.q.map(l=>l[1]):[];if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return q}")
        if rec is not None: rec.update(q)
        await A.wait(80)
    for i in range(120):
        r=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();const q=SD.on?SD.q.map(l=>l[1]):[];if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return [SD.on&&!SD.choice,q]}")
        if rec is not None: rec.update(r[1])
        await A.wait(80)
        if not r[0]:break
async def until_a(A):
    for i in range(30):
        if await A.ev("()=>me.sty.a===1&&!SD.on"):break
        await adv(A,3)
SH='../v551/'
CLEAN="()=>{try{localStorage.setItem('refugee_wn',WNV)}catch(e){};const p=document.getElementById('wnp');if(p)p.remove();PALG.card=null;PALG.title=null;banner=null;document.querySelectorAll('.tipc,#tipc').forEach(e=>e.remove())}"
TALK45="(n)=>{const N=n===1?MAPS[45].npc:MAPS[45].npc2;npcSel=n;me.x=N.x;me.y=N.y+40;PZS.lx=me.x;PZS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|'),!!(typeof CZ!=='undefined'&&CZ.on),CZ&&CZ.id]}"
GOD5="const mh0=me.mh;me.mh=5e6;me.hp=me.mh;gmGod=false;"
UNGOD="gmGod=true;me.mh=mh0;me.hp=me.mh;"
FXREC="()=>{window.__pf={};if(!window.__fxw){window.__fxw=1;const of=fx;fx=function(o){try{if(o&&o.k==='pfnfx')__pf[o.t]=(__pf[o.t]||0)+1}catch(e){}return of.apply(this,arguments)}}}"
async def shot(C,name,x,y,extra='',w=1280,h=720,ms=1300):
    await C.pg.set_viewport_size({'width':w,'height':h})
    await C.ev(f"()=>{{me.x={x};me.y={y};try{{if(curMap===45){{PZS.lx=me.x;PZS.ly=me.y}}}}catch(e){{}}{extra}}}");await C.wait(ms);await C.ev(CLEAN)
    await C.pg.screenshot(path=SH+name+'.jpg',quality=80);await C.pg.set_viewport_size({'width':390,'height':844})
async def enter_pfn(C):
    await until_a(C)
    r=await C.ev(TALK45,2);await adv(C,6)
    for i in range(30):
        if await C.ev("()=>PFNI()"):break
        await C.ev("()=>{if(SD.on&&SD.choice&&SD.onChoose){SD.onChoose(1)}else if(SD.on){if(SD.typ){stNext()}stNext()}}");await C.wait(300)
    return r
async def start_boss(C):
    await C.ev("()=>dgStart()")
    for i in range(40):
        if await C.ev("()=>dg.ph==='boss'&&!SD.on"):break
        await C.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await C.wait(150)
    await C.wait(600)
async def main():
    import os;os.makedirs(SH,exist_ok=True)
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ta'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Tb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.pa5s)")
        info=await A.ev("()=>[STY.findIndex(x=>x.pa4c),STY.length,STCH[STY[STY.findIndex(x=>x.pa5s)].c],STY[STY.findIndex(x=>x.pa5s)+1].g,STY[STY.findIndex(x=>x.pa5s)+1].k,!!STY[STY.findIndex(x=>x.pa5s)+2].pa5e,!!STY[STY.findIndex(x=>x.pa5s)+3].pa5h,DT[34]&&DT[34].n,DT[34]&&DT[34].bL]")
        rep('ภาค 10 บทที่ 5 ต่อจากบทที่ 4 (4 ขั้น: ธุลี → ดัน pfn → ธรณินเลือกบ้าน → เรนน์) · เป็นขั้นสุดท้ายของเนื้อเรื่อง',i0==info[0]+1 and info[1]==i0+4 and info[3]=='pfn' and info[4]=='thu45' and info[5] and info[6] and 'บทที่ 5' in info[2] and info[7]=='ฐานฟ้า' and info[8]==22,[i0,info])
        sv=await A.ev("()=>{const o=cleanChar({lv:99,sty:{s:5,n:0,a:0,e10:2,pa4t:31,zz9:4}});return o&&o.sty}")
        rep('เซฟ: คีย์ e10 ไม่หายตอนโหลด',sv.get('e10')==2 and sv.get('pa4t')==31 and 'zz9' not in sv,sv)
        p9=await A.ev("()=>{const a=PETS.findIndex(P=>P&&P.star9),b=PETS.findIndex(P=>P&&P.sap10);return [a,b,PT_N,PETS[a]&&PETS[a].n,PETS[b]&&PETS[b].n,MOUNTS[9]&&MOUNTS[9].n,MT_N,MOUNTS[8]&&MOUNTS[8].n]}")
        rep('สัตว์เลี้ยงใหม่ต่อท้าย (ดาวน้อยของภาค 9 ยังอยู่ที่เดิม · ภาค 9 หาด้วยธง ไม่ใช้ตัวสุดท้าย) · สัตว์ขี่ช่อง 9',p9[0]>0 and p9[1]==p9[0]+1 and p9[2]==p9[1] and p9[3]=='ดาวน้อย' and p9[4]=='ต้นกล้าค้ำแผ่นดิน' and p9[5]=='ด้วงแบกฟ้า' and p9[6]==9 and p9[7]=='ดาวหางเงิน',p9)
        for C,v in ((A,1),(B,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:{v},e4:{v},p6h:{v},e6:{v},e7:{v},p7m:{v},p8g:{v},e8:{v},q9:{v},e9:{v},pacr:31,parr:31,pa2j:31,pa3p:255,pa4t:31}};me.wv=[1,5,9,23,25,26,32,35,38,39,40,41,42,43,44,45,2,3];ov.hidden=true;enterMap(45,{{x:PZTHU.x+40,y:PZTHU.y+60}})}}")
        await A.wait(2800);await A.ev(CLEAN);await B.ev(CLEAN)
        pre=await A.ev("()=>[NPC3[45].s===PZ5T0,pz5RenOn(),PZ5IT.length]")
        ta=await A.ev(TALK45,2);tb=await B.ev(TALK45,2)
        await adv(A);await adv(B)
        rep('คุยธุลี: ส่งสัญญาณขึ้นเชือก → คนจากทุกเมืองไต่ลงมา (แยก e6 โคมแก้วดาว/องครักษ์ดาว · p8g กริฟ/ลูกเรือถือพลั่ว) · เงาผู้แบก · ฉากภาพยนตร์ pa5s → ขั้นดัน pfn',
            ta[0]=='thu45' and 'ช่างแก้วดาว' in ta[1] and 'องครักษ์ดาว' not in ta[1] and 'กริฟยืนบนตะกร้า' in ta[1] and 'วางดาบไต่ลงมา' not in ta[1] and 'องครักษ์ดาว' in tb[1] and 'ช่างแก้วดาว' not in tb[1] and 'วางดาบไต่ลงมา' in tb[1] and 'เงาดำไหลออกมา' in ta[1] and ta[2] and ta[3]=='pa5s' and await A.ev("()=>stCur().g==='pfn'&&!!stCur().pa5d") and pre==[False,False,16],[ta[0],ta[2],ta[3],pre,ta[1][-120:],tb[1][-80:]])
        await A.wait(900)
        w45=await A.ev("""()=>{const c=document.createElement('canvas');c.width=1400;c.height=1600;const x=c.getContext('2d'),g0=g,my=me.y;let ok=1,ren=null;try{g=x;x.translate(-900,-500);me.y=200;for(const t of PZ5IT)PALK[t.k](t,1.3);ren=pa5Ren(1740,1220);me.y=3000;pz5Ground()}catch(e){ok=String(e)}finally{g=g0;me.y=my}
          return [ok,ren,curMap,U53G.ft===CanvasRenderingContext2D.prototype.fillText,NPCSAY.cmd!==PZ5RL,NPC3[45].s===PZ5T0,pz5RenOn(),MAPS[1].npc4.x]}""")
        rep('ฐานแผ่นดินหลังคนลงมา: คน 14 กลุ่มบนตาข่าย + เรนน์ (ยืมตัววาดค่าย คืนค่าแมพ/ป้ายครบ) · ธรณินบ่น «สายไปแล้ว» · วาดไม่ error',w45[0]==1 and w45[1] is True and w45[2]==45 and w45[3] and w45[4] and w45[5] and w45[6] and abs(w45[7]-1559.4)<.01,w45)
        await shot(A,'t_allies',1640,1330,"mons=[]")
        await shot(A,'t_allies2',1050,2330,"mons=[]")
        # ---------- ดันสุดท้าย ฐานฟ้า ----------
        await A.ev(FXREC);await B.ev(FXREC)
        await enter_pfn(A)
        lob=await A.ev("()=>[PFNI(),curMap>=44000&&curMap<45000,MAPS[curMap].n,dg.ph,MAPS[curMap].boss.n,MAPS[curMap].th,!!trees.find(t=>t.k==='pfnthu'),dgStatusText(),curMap]")
        await start_boss(A)
        run=await A.ev("()=>{const Bm=mons.find(m=>m.t===3);return [dg.ph,!!Bm,Math.round(PFN.s),dgStatusText(),Bm&&Math.round(Math.hypot(Bm.x-PFB.x,Bm.y-PFB.y)),PFC.every(([x,y])=>Math.hypot(x-CX,y-CY)+PFCR<DR),BV1['เงาผู้แบก']?1:0]}")
        rep('เข้าดัน «ฐานฟ้า» (ห้อง 44xxx) · ล็อบบี้ → เริ่ม: บอสเงาผู้แบกกลางฝ่ามือ · แถบแผ่นดินทรุด 35% · วงยก 3 วงอยู่ในลาน',lob[0] and lob[1] and lob[2]=='ฐานฟ้า' and lob[3]=='lobby' and lob[4]=='เงาผู้แบก' and lob[5]==47 and lob[6] and run[0]=='boss' and run[1] and 34<=run[2]<=36 and 'ทรุด' in run[3] and run[4]<60 and run[5] and run[6],[lob,run])
        # ซิงก์ 2 เครื่อง: B เข้าห้องเดียวกันชั่วคราว
        rid=lob[8]
        await B.ev(f"()=>{{dgMap({rid});enterMap({rid},{{x:CX+120,y:CY+170}})}}")
        await A.ev("()=>{const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;PFN.at=999}")
        await A.wait(2500);await A.ev("()=>{PFN.at=0}");await A.wait(1500)
        sy=[await A.ev("()=>[isHost(),Math.round(PFN.s*10)/10,PFN.al.slice(),PFN.cs.slice()]"),await B.ev("()=>[isHost(),Math.round(PFN.s*10)/10,PFN.al.slice(),PFN.cs.slice(),PFNI(),dg.ph,!!PFN.card]")]
        rep('ซิงก์ 2 เครื่อง: เครื่องที่ไม่ใช่โฮสต์เห็นแถบทรุด/วงยก/พันธมิตรตรงกับโฮสต์',sy[0][0] and not sy[1][0] and sy[1][4] and abs(sy[0][1]-sy[1][1])<=1.5 and sy[0][2]==sy[1][2]==[0] and sy[1][3]==sy[0][3] and sy[1][6],sy)
        await B.ev("()=>{dgLeave()}");await B.wait(1500)
        bk=await B.ev("()=>[curMap,Math.round(Math.hypot(me.x-PZTHU.x-60,me.y-PZTHU.y-60))]")
        # อัตราทรุด / ยก
        sk=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;PFN.at=999;mons=mons.filter(m=>m.t===3);
          PFN.al=[];PFN.av=[];PFN.man=[0,0,0];PFN.red=0;PFN.str=1;PFN.s=40;me.x=CX;me.y=CY+200;await w(2000);const a=PFN.s,ra=PFN.pr;
          me.x=PFC[0][0];me.y=PFC[0][1];await w(2000);const b=PFN.s,rb=PFN.pr,cs1=PFN.cs.slice();PFN.man[2]=1;await w(2000);const c=PFN.s,rc=PFN.pr,cs2=PFN.cs.slice();
          return {a:Math.round((a-40)*100)/100,ra,b:Math.round((b-a)*100)/100,rb,c:Math.round((c-b)*100)/100,rc,cs1,cs2}}""")
        rep('แถบทรุด: ไม่มีใครยก = ทรุด 0.5%/วิ · ยืนในวงยก 1 วง = ช้าลง · 2 วง (ผู้เล่น + พันธมิตรประจำวง) = แผ่นดินยกขึ้น',0.8<=sk['a']<=1.2 and abs(sk['ra']-.5)<.01 and 0.2<=sk['b']<=0.5 and abs(sk['rb']-.18)<.01 and sk['c']<0 and sk['rc']<0 and sk['cs1']==[1,0,0] and sk['cs2']==[1,0,2],sk)
        fr=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=CX;me.y=CY-60;pfnFrag(1);const f=mons.filter(m=>m.pfn&&m.hp>0).pop();f.x=CX+DR-70;f.y=CY+60;f.hx=f.x;f.hy=f.y;const d0=Math.hypot(f.x-PFC[1][0],f.y-PFC[1][1]);await w(2500);const d1=Math.hypot(f.x-PFC[1][0],f.y-PFC[1][1]);
          f.x=PFC[1][0];f.y=PFC[1][1];PFN.man[1]=1;await w(500);const cs=PFN.cs.slice();me.x=f.x+40;me.y=f.y;await w(400);const st=pfnMon(f,.1,escPl(),40);PFN.man[1]=0;f.hp=0;await w(300);return [Math.round(d0),Math.round(d1),cs,st]}""")
        rep('เศษความล้าคลานไปนั่งทับวงยกที่ใกล้สุด · วงที่ถูกทับยกไม่ได้แม้มีพันธมิตร · ผู้เล่นเข้าใกล้ = หันมาสู้',fr[1]<fr[0]-40 and fr[2][1]==-1 and fr[3] is False,fr)
        wt=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));"+GOD5+"const Bm=mons.find(m=>m.t===3);Bm.stun=99;mons=mons.filter(m=>m.t===3);PFN.man=[0,0,1];me.x=PFC[0][0];me.y=PFC[0][1];await w(300);PFN.s=40;const h0=me.hp;PFN.wt.push({u:uid,x:me.x,y:me.y,t:2});fx({k:'pfnw',u:[uid],d:2});await w(400);const mark=PFWT.some(q=>q.u===uid);await w(2100);const s1=PFN.s,d1=h0-me.hp;me.hp=me.mh;me.x=CX+60;me.y=CY+260;await w(300);const s0=PFN.s,h1=me.hp;PFN.wt.push({u:uid,x:me.x,y:me.y,t:2});await w(2500);const r=[mark,Math.round((s1-40)*10)/10,d1,Math.round((PFN.s-s0)*10)/10,h1-me.hp];Bm.stun=0;"+UNGOD+"return r}")
        rep('น้ำหนักสามร้อยปี: วงเตือนใต้ตัว 2 วิ · อยู่ในวงยก = รับครึ่งและแผ่นดินไม่ทรุด · อยู่นอกวง = โดนเต็มและแผ่นดินทรุด +2.5%',wt[0] and wt[1]<0 and wt[2]>0 and wt[3]>=2.3 and wt[4]>wt[2]*1.6,wt)
        ws=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3);Bm.stun=0;PFN.dis=0;PFN.hs=[];pfnWhisper(Bm);await w(300);const a=[PFN.ws>0,PFN.wk>0,Bm.tf>0];Bm.hp-=PFN.wk+10;await w(400);const b=[PFN.ws,Bm.stun>0,PFN.dis];
          Bm.stun=0;me.x=PFC[0][0];me.y=PFC[0][1];PFN.man=[0,0,1];await w(300);const s0=PFN.s;pfnWhisper(Bm);await w(4500);return {a,b,dis:PFN.dis>0,cs:PFN.cs.slice(),ds:Math.round((PFN.s-s0)*10)/10,txt:dgStatusText()}}""")
        rep('กระซิบ «วางลงเถิด…» 4 วิ: รุมตีถึงเกณฑ์ = ขัด + มึน · ไม่ขัด = วงยกทุกวงดับ 6 วิ + ทรุด 4%',all(ws['a']) and ws['b'][0]==0 and ws['b'][1] and ws['b'][2]==0 and ws['dis'] and ws['cs']==[-2,-2,-2] and ws['ds']>=3,ws)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{const Bm=mons.find(m=>m.t===3);Bm.stun=0;PFN.dis=0;me.x=PFC[0][0]+30;me.y=PFC[0][1]-30;pfnWhisper(Bm)}");await A.wait(1200);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_whisper.jpg',quality=82);await A.pg.set_viewport_size({'width':390,'height':844})
        await A.wait(4000)
        al=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;PFN.dis=0;PFN.ws=0;Bm.tf=0;PFN.al=[];PFN.av=[];PFN.man=[0,0,0];PFN.red=0;PFN.str=1;PFN.ct=4;PFN.cn=6;PFN.wh=5;PFN.bm=5;PFN.tw=10;__pf={};
          me.hp=me.mh*.5;for(let i=0;i<9;i++){PFN.at=0;await w(260)}const hp=me.hp/me.mh;pfnFrag(2);await w(7000);return {al:PFN.al.slice(),av:PFN.av.slice(),man:PFN.man.slice(),red:PFN.red,str:PFN.str,hp:Math.round(hp*100)/100,pf:Object.assign({},__pf),card:PALG&&PFN.card&&PFN.card.i,txt:dgStatusText()}}""")
        rep('พันธมิตร 9 กลุ่ม (A เลือกแบบ 1 ทุกภาค): ค่าย/อารัณยาประจำวง · โคมแก้วดาว · รถเข็นบรอม · ปืนใหญ่เรือดำ · เพลงวาฬ · ลำแสงกระจก · หมุดหอคอย · เมล็ดหัวใจฟื้นเลือดเต็ม',
            al['al']==list(range(9)) and al['av']==[1]*9 and al['man']==[1,0,1] and al['red']==0 and al['str']==1 and al['hp']>=.99 and al['pf'].get('cart',0)>=1 and al['pf'].get('beam',0)>=1 and al['pf'].get('cannon',0)>=1 and al['pf'].get('whale',0)>=1 and '9/9' in al['txt'],al)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{me.x=PFC[2][0]+60;me.y=PFC[2][1]-150;PFN.card={i:5,v:1,t0:performance.now()}}");await A.wait(1300);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_pfn.jpg',quality=82)
        await A.pg.set_viewport_size({'width':390,'height':844});await A.wait(900);await A.ev(CLEAN);await A.pg.screenshot(path=SH+'t_pfn_m.jpg',quality=82)
        ph=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3);PFN.ph=0;PFN.man=[0,0,0];PFN.red=0;me.x=CX;me.y=CY+260;Bm.hp=Bm.mh*.6;await w(500);const p1=PFN.ph;Bm.hp=Bm.mh*.3;await w(600);return [p1,PFN.ph,PFN.pr]}")
        rep('เลือดบอส <66% นิ้วธรณินกระตุก · <33% ความสิ้นหวังหนักสุด (ทรุด 0.8%/วิ)',ph[0]==1 and ph[1]==2 and abs(ph[2]-.8)<.01,ph)
        # ---------- B: พันธมิตรแบบ 2 + แพ้ ----------
        await B.ev(FXREC)
        await enter_pfn(B);await start_boss(B)
        bl=await B.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;mons=mons.filter(m=>m.t===3);PFN.s=60;
          for(let i=0;i<9;i++){PFN.at=0;await w(260);if(i===5)var stun=Bm.stun}const s=PFN.s;pfnFrag(2);const F=mons.filter(m=>m.pfn&&m.hp>0);F.forEach((f,k)=>{f.x=PFC[k][0]+20;f.y=PFC[k][1];f.hx=f.x;f.hy=f.y});const fh=F.map(f=>f.hp);me.x=CX;me.y=CY-380;await w(3600);
          return {al:PFN.al.slice(),av:PFN.av.slice(),man:PFN.man.slice(),red:Math.round(PFN.red*100)/100,str:PFN.str,s:Math.round(s),stun:stun>0,spear:(__pf.spear||0)>0,fh:F.map((f,k)=>f.hp<fh[k]),chain:(__pf.chain||0)}}""")
        rep('พันธมิตร (B เลือกแบบ 2 ทุกภาค): ลูกเรือถือพลั่ว/ยางทองประจำวงตะวันออก · สหกรณ์ −8% · ด้ายดาว −10% วงแรงขึ้น · ถอนหมุด −12% · โซ่ดาวรัดเงา · องครักษ์ดาวแทงเศษความล้าที่วง',
            bl['al']==list(range(9)) and bl['av']==[2]*9 and bl['man']==[1,1,1] and bl['red']==.25 and bl['str']==1.25 and bl['s']<=32 and bl['stun'] and bl['spear'] and all(bl['fh']),bl)
        ls=await B.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));PFN.s=100;await w(600);const a=[dg.ph,dg.why];await w(5600);return [a,curMap,me.sty.n,stCur().g]}")
        rep('แถบทรุดถึง 100% = แพ้ → กลับฐานแผ่นดิน (ยังอยู่ขั้นดัน คุยธุลีขึ้นไปใหม่ได้) · ออกจากห้องกลางทาง = กลับข้างธุลี',ls[0][0]=='fail' and 'ธรณิน' in (ls[0][1] or '') and ls[1]==45 and ls[2]==0 and ls[3]=='pfn' and bk[0]==45 and bk[1]<80,[ls,bk])
        # ---------- ชนะ (A แล้ว B) ----------
        async def win(C):
            for i in range(30):
                if await C.ev("()=>dg.ph==='win'||dgRew"):break
                await C.ev("()=>{mons.forEach(m=>{if(m.t!==3)m.hp=0});mons=mons.filter(m=>m.t===3);const Bm=mons.find(m=>m.t===3&&m.hp>0);if(Bm){Bm.inv=0;Bm.tf=0;PFN.ws=0;Bm.hp=1;me.x=Bm.x;me.y=Bm.y+80;try{dmgMon(Bm,1e6)}catch(e){Bm.hp=0}}}");await C.wait(400)
            wn=await C.ev("()=>[dg.ph,banner&&banner.s,me.sty.n,me.sty.a]")
            for i in range(40):
                if await C.ev("()=>curMap===45"):break
                await C.wait(500)
            await adv(C)
            return wn
        wa=await win(A)
        sa=await A.ev("()=>[curMap,me.sty.s,stCur()&&stCur().k,!!stCur().pa5e,NPC3[45].s===PZ5TC,pz5ThuL()===PZ5UC]")
        rep('ชนะเงาผู้แบก → รางวัลเนื้อเรื่อง → กลับฐานแผ่นดิน (ธรณินลืมตา) → ขั้นคุยธรณิน',wa[0]=='win' and wa[2]==1 and sa[0]==45 and sa[1]==i0+2 and sa[2]=='thr' and sa[3] and sa[4] and sa[5],[wa,sa])
        await enter_pfn(B);await start_boss(B);wb=await win(B)
        await shot(A,'t_calm',1600,1260,"mons=[]")
        # ---------- ฉากจบ e10 ----------
        res={}
        for C,e in ((A,1),(B,2)):
            await until_a(C)
            t=await C.ev(TALK45,1)
            for i in range(80):
                if await C.ev("()=>!!(SD.on&&SD.choice)"):break
                await C.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await C.wait(120)
            ch=await C.ev("()=>[SD.choice?SD.choice.map(c=>c[0]):[],CZ&&CZ.on]")
            await C.ev(f"()=>{{SD.onChoose({e})}}");await C.wait(500)
            czid=await C.ev("()=>CZ&&CZ.id")
            seen=set();await adv(C,40,seen)
            await C.wait(1200);await C.ev("()=>{achCheck()}");await C.wait(300)
            st=await C.ev("()=>{const sid=PETS.findIndex(P=>P&&P.sap10);return [me.sty.s,me.sty.e10,(me.pets||[]).includes(sid),(me.mts||[]).includes(9),!!me.ach.stR5a,!!me.ach.stR5b,NPC3[45].s===(me.sty.e10===2?PZ5TB:PZ5TA),pz5RenOn(),stCur()&&stCur().k,PH.on,!!PZ5IT.find(t=>t.k==='pz5ked')&&gP5d()]}")
            res[e]=(t,ch,czid,seen,st)
        ta,cha,cza,sa,sta=res[1];tb,chb,czb,sb,stb=res[2]
        rep('คุยธรณิน: «การแบกคืออยู่คนเดียว» · เฒ่าแก่นไม้ลงมา · เรนน์ให้เลือก → ทางเลือก 2 แบบ (🏡/🌳) · ฉากภาพยนตร์',ta[0]=='thr' and 'อยู่คนเดียว' in ta[1] and 'เพื่อนเก่า' in ta[1] and ta[3]=='pa5e' and len(cha[0])==2 and '🏡' in cha[0][0] and '🌳' in cha[0][1],[ta[0],ta[3],cha])
        A1=['คลายหมุดฐานทีละชั้น','เทพที่ได้หัวใจคืน','ราชินีเอลิราลงมาเปิดตลาด','อารัณยาที่ลอยคืนฟ้า','บรอมเปิดรถรางสายใหม่','ท้องเรือกลายเป็นโรงเรียน','วาฬดาวร้องเพลง','กระพริบสามครั้งทุกคืน','ธงของแปดเมืองโบกบนรั้ว']
        B2=['หมุดเหล็กร้อยตัวที่ถูกถอน','อัลดริคเปิดรอยผนึก','องครักษ์ดาวผลัดเวร','นครลี้ภัย…','สหกรณ์คาร์นรับคนรากลึก','บ่อของคนที่เลือกใหม่','เข็มเย็บแผ่นดิน','สะพานดาวทอดยาว','เด็กสองเมืองแกว่งชิงช้า']
        ja='|'.join(sa);jb='|'.join(sb)
        rep('ฉากจบ 🏡 (A): ทุกเมืองปลูกต้นค้ำ · คนรากลึกขึ้นไปเห็นฟ้า → บทส่งท้ายเห็นเฉพาะผลของทางเลือกแบบ 1 ครบ 9 เรื่อง',all(k in ja for k in A1) and not any(k in ja for k in B2) and 'เป่ามันดับ' in ja and 'หนึ่งปีต่อมา' in ja and 'คนที่ยังหาบ้านอยู่' in ja,[k for k in A1 if k not in ja]+[k for k in B2 if k in ja])
        rep('ฉากจบ 🌳 (B): ปลูกต้นค้ำต้นใหม่ที่ค่าย · ธรณินได้หลับ → บทส่งท้ายเห็นเฉพาะผลของทางเลือกแบบ 2 ครบ 9 เรื่อง',all(k in jb for k in B2) and not any(k in jb for k in A1) and 'ฝันดีนะ' in jb and 'หนึ่งปีต่อมา' in jb,[k for k in B2 if k not in jb]+[k for k in A1 if k in jb])
        rep('รางวัลจบเรื่อง: สัตว์เลี้ยง «ต้นกล้าค้ำแผ่นดิน» · สัตว์ขี่ «ด้วงแบกฟ้า» · ฉายาตามฉากจบ (A ผู้ไม่ปิดประตู / B ผู้หยั่งรากบ้าน) · ธรณินสงบ/หลับ · เฒ่าแก่นไม้อยู่ข้างธรณิน · เรนน์กลับค่าย → ขั้นคุยเรนน์ · กล้องไม่ค้างโหมดถ่ายรูปหลังฉากต่อกัน',
            sta[0]==i0+3 and sta[1]==1 and sta[2] and sta[3] and sta[4] and not sta[5] and sta[6] and not sta[7] and sta[8]=='cmd' and sta[9]==0 and stb[9]==0 and sta[10] and stb[1]==2 and stb[2] and stb[3] and stb[5] and not stb[4] and stb[6],[sta,stb])
        cz=await A.ev("()=>[CZDEF.pa5s.get()===STY.find(x=>x.pa5s).pre,CZDEF.pa5e.get()===STY.find(x=>x.pa5e).pre,CZDEF.pa5x1.get()===STE10[1],CZDEF.pa5x2.get()===STE10[2],CZDEF.pa5y.get()===STY.find(x=>x.pa5e).post,CZDEF.pa5h.get()===STY.find(x=>x.pa5h).pre,['pa5s','pa5e','pa5x1','pa5x2','pa5y','pa5h'].every(k=>CZORD.includes(k))]")
        rep('ฉากภาพยนตร์ 6 ฉาก ผูกกับเนื้อเรื่อง (ฉากจบแต่ละแบบเล่นตามที่เลือก)',all(cz) and cza=='pa5x1' and czb=='pa5x2',[cz,cza,czb])
        dr=await A.ev("""()=>{const c=document.createElement('canvas');c.width=1400;c.height=1600;const x=c.getContext('2d'),g0=g,e0=me.sty.e10;let ok=1;try{g=x;x.translate(-900,-100);for(const e of[1,2]){me.sty.e10=e;PALK.pzthr({x:1600,y:1085},2.2);pz5Ground()}}catch(er){ok=String(er)}finally{g=g0;me.sty.e10=e0}return ok}""")
        rep('วาดธรณินหลังฉากจบทั้ง 2 แบบ (รากทองค้ำ / หลับใต้รากทอง) ไม่ error',dr==1,dr)
        await shot(A,'t_end1_45',1600,1240,"mons=[]")
        await shot(B,'t_end2_45',1600,1240,"mons=[]")
        await shot(B,'t_end2_45z',1600,1180,"mons=[];ZM.z=.55",1280,720,1800)
        await B.ev("()=>{ZM.z=1}")
        # ---------- กลับค่ายคุยเรนน์ ----------
        for C in (A,B):
            await C.ev("()=>{ov.hidden=true;enterMap(1,{x:1520,y:1500})}")
        await A.wait(2600);await A.ev(CLEAN);await B.ev(CLEAN)
        camp=[await C.ev("()=>{const n={};PA5IT.forEach(t=>n[t.k]=(n[t.k]||0)+1);return [n,trees.filter(t=>t.pp==='pa5').length]}") for C in (A,B)]
        rep('ค่ายหลังฉากจบ: 🏡 ธงแปดเมือง + ซุ้ม «บ้านของทุกคน» + ทางโคม + คนเมืองอื่น · 🌳 ต้นค้ำต้นใหม่ + บ้านโดมราก · ธุลีมาเยี่ยม',camp[0][0]=={'flag':8,'arch':1,'lamp':4,'folk':5,'thu':1} and camp[0][1]==19 and camp[1][0]=={'tree':1,'hut':2,'lamp':4,'folk':3,'thu':1} and camp[1][1]==11,camp)
        dc=await A.ev("""()=>{const out=[];const c=document.createElement('canvas');c.width=900;c.height=900;const x=c.getContext('2d'),g0=g,e0=me.sty.e10,my=me.y,T0=trees.slice();try{g=x;for(const e of[1,2]){me.sty.e10=e;pa5CampBuild();x.setTransform(1,0,0,1,-1000,-2200);for(const t of PA5IT){try{pa5Draw(t,1.5)}catch(er){out.push(t.k+':'+er)}}try{me.y=9000;pa5CampPre()}catch(er){out.push('pre:'+er)}}}finally{g=g0;me.sty.e10=e0;me.y=my;trees.length=0;T0.forEach(t=>trees.push(t));pa5CampBuild();trees.length=0;T0.forEach(t=>trees.push(t))}
          const S=pa5TreeSpr();return [out,S.G.width,S.U.height,S.lamps.length]}""")
        rep('วาดของในค่ายทุกชิ้นทั้งสองชั้น (หน้า/หลังผู้เล่น) ไม่ error · ต้นค้ำใหม่แคช 2 ชั้น',dc[0]==[] and dc[1]>400 and dc[2]>500 and dc[3]==6,dc)
        for nm,(x,y) in {'t_camp1_s':(1560,2200),'t_camp1_arch':(1300,2560),'t_camp1_e':(2010,1720),'t_camp1_c':(1600,1650)}.items():
            await shot(A,nm,x,y,"mons=[]")
        for nm,(x,y) in {'t_camp2_tree':(1500,2560),'t_camp2_far':(1520,2200),'t_camp2_base':(1480,2790)}.items():
            await shot(B,nm,x,y,"mons=[]")
        await shot(B,'t_camp2_m',1480,2620,"mons=[]",390,844)
        qa=await A.ev("()=>{const N=MAPS[1].npc4;npcSel=4;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|'),!!(typeof CZ!=='undefined'&&CZ.on),CZ&&CZ.id]}")
        sh=set();await adv(A,30,sh)
        await A.wait(1200);await A.ev("()=>{achCheck()}");await A.wait(300)
        fin=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stR6,MAXBAG]")
        rep('คุยเรนน์ที่ค่าย: «ยินดีต้อนรับกลับบ้าน» · ขีดชื่อออกจากบัญชีผู้อพยพ · การ์ดจบภาค 10 → จบเนื้อเรื่องหลัก · ฉายา «ผู้กลับถึงบ้าน»',qa[0]=='cmd' and 'ยินดีต้อนรับกลับบ้าน' in qa[1] and qa[3]=='pa5h' and any('จบเนื้อเรื่องหลัก' in s for s in sh) and fin[0]==fin[1] and 'จบเนื้อเรื่องหลัก' in fin[2] and fin[3],[qa[0],qa[3],fin])
        rp=await A.ev("()=>{ov.hidden=true;enterMap(45,{x:PZNPC.x,y:PZNPC.y+60});return 1}")
        await A.wait(2000)
        rp=await A.ev("()=>{const N=MAPS[45].npc;npcSel=1;me.x=N.x;me.y=N.y+40;PZS.lx=me.x;PZS.ly=me.y;stNpcClick();const a=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';try{stClose()}catch(e){};const M=MAPS[45].npc2;npcSel=2;me.x=M.x;me.y=M.y+40;stNpcClick();const b=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';try{stClose()}catch(e){};return [a,b]}")
        rep('หลังจบเรื่อง: คุยธรณิน = เล่นซ้ำฐานฟ้า · คุยธุลี = เล่นซ้ำรังกัดแผ่นดิน','ฐานฟ้า' in rp[0] and 'รังกัดแผ่นดิน' in rp[1],rp)
        pm=await A.ev("""()=>{const c=document.createElement('canvas');c.width=300;c.height=200;const x=c.getContext('2d'),g0=g;let ok=1;const sid=PETS.findIndex(P=>P&&P.sap10),st=PETS.findIndex(P=>P&&P.star9);try{g=x;drawPet(sid,60,100,1,1.2,0,1);drawPet(sid,120,100,-1,1.2,1,1);drawPet(st,180,100,1,1.2,0,1);drawMount(9,240,120,1,0,1.3,1);drawMount(9,240,120,-1,2.1,1.3,1)}catch(e){ok=String(e)}finally{g=g0}
          me.pet=sid;const mh=maxHp();me.pet=0;const mh0=maxHp();return [ok,mh>mh0,MOUNTS[9].red,MOUNTS[9].sp]}""")
        rep('วาดสัตว์เลี้ยง/สัตว์ขี่ใหม่ไม่ error (ดาวน้อยยังวาดแบบเดิม) · ต้นกล้าเพิ่ม HP · ด้วงแบกฟ้าลดดาเมจ 5%',pm[0]==1 and pm[1] and pm[2]==.05 and pm[3]==.72,pm)
        await A.pg.set_viewport_size({'width':1280,'height':720})
        await A.ev("()=>{const sid=PETS.findIndex(P=>P&&P.sap10);me.pet=sid;me.mt=9;me.riding=1;ov.hidden=true;enterMap(1,{x:1600,y:1760})}");await A.wait(2500);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_ride.jpg',quality=82);await A.ev("()=>{me.riding=0}")
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        errs=await A.ev("()=>[NPV.err||'',MV9.err||'',window.__err]")
        errs2=await B.ev("()=>[window.__err]")
        rep('ไม่มี error ในหน้าเกม',not E and not errs[0] and not errs[2] and not errs2[0],[E[:4],errs,errs2])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
