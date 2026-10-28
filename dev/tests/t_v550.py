"""v550 ภาค 10 บทที่ 4 · ราชินีกัดแผ่นดิน: เฒ่าแก่นไม้ → ปล่องราก (แมพ 44 → 45) · แมพ 45 ฐานแผ่นดิน (ตาข่ายราก · ความว่าง · หินร่วง)
   ธรณิน (แยก e4) · ผูกเชือกคำมั่น 5 ปม (ติดมอน = หยุด) · ล่า 40 · ดัน «รังกัดแผ่นดิน» (ไข่ · กัดเท้า · ขัด · วงยันเท้า · กรด · ลอกคราบ) · จบบท · ฉายา · เล่นซ้ำ"""
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
SH='../v550/'
CLEAN="()=>{try{localStorage.setItem('refugee_wn',WNV)}catch(e){};const p=document.getElementById('wnp');if(p)p.remove();PALG.card=null;PALG.title=null;banner=null;document.querySelectorAll('.tipc,#tipc').forEach(e=>e.remove())}"
TALK44="(n)=>{const N=n===1?MAPS[44].npc:MAPS[44].npc2;npcSel=n;me.x=N.x;me.y=N.y+40;PBS.lx=me.x;PBS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}"
TALK45="(n)=>{const N=n===1?MAPS[45].npc:MAPS[45].npc2;npcSel=n;me.x=N.x;me.y=N.y+40;PZS.lx=me.x;PZS.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}"
GOD5="const mh0=me.mh;me.mh=5e6;me.hp=me.mh;gmGod=false;"
UNGOD="gmGod=true;me.mh=mh0;me.hp=me.mh;"
async def shot(C,name,x,y,extra=''):
    await C.pg.set_viewport_size({'width':1280,'height':720})
    await C.ev(f"()=>{{me.x={x};me.y={y};try{{PZS.lx=me.x;PZS.ly=me.y}}catch(e){{}}{extra}}}");await C.wait(1300);await C.ev(CLEAN)
    await C.pg.screenshot(path=SH+name+'.jpg',quality=80);await C.pg.set_viewport_size({'width':390,'height':844})
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ta'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Tb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.pa4s)")
        info=await A.ev("()=>[STY.findIndex(x=>x.pa3c),STY.length,STCH[STY[STY.findIndex(x=>x.pa4s)].c],STY.findIndex(x=>x.pa4t),STY[STY.findIndex(x=>x.pa4t)].n,STY.findIndex(x=>x.pa4d),STY[STY.findIndex(x=>x.pa4d)].g,STY.findIndex(x=>x.pa4c)]")
        rep('ภาค 10 บทที่ 4 ต่อจากบทที่ 3 (7 ขั้น · ผูกเชือก 5 ปม · ขั้นดัน pnq)',i0==info[0]+1 and info[1]>=i0+7 and info[3]==i0+3 and info[4]==5 and info[5]==i0+5 and info[6]=='pnq' and info[7]==i0+6 and 'บทที่ 4' in info[2],[i0,info])
        sv=await A.ev("()=>{const o=cleanChar({lv:99,sty:{s:5,n:0,a:0,pa4t:21,pa3p:255,zz9:4}});return o&&o.sty}")
        rep('เซฟ: คีย์ pa4t ไม่หายตอนโหลด',sv.get('pa4t')==21 and sv.get('pa3p')==255 and 'zz9' not in sv,sv)
        for C,e4 in ((A,1),(B,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:{e4},p6h:2,e6:1,e7:1,p7m:1,p8g:1,e8:1,q9:1,e9:1,pacr:31,parr:31,pa2j:31,pa3p:255}};me.wv=[1,5,9,23,25,26,32,35,38,39,40,41,42,43,44,2,3];ov.hidden=true;enterMap(44,{{x:PBKED.x+40,y:PBKED.y+60}})}}")
        await A.wait(2800);await A.ev(CLEAN);await B.ev(CLEAN)
        g0=await A.ev("()=>MAPS[44].gates.filter(G=>G.to===45).map(G=>[gHid(G),wpGateOk(G),pbIn(G.x,G.y,0),pbSafe(G.x,G.y)])")
        ka=await A.ev(TALK44,1);kb=await B.ev(TALK44,1)
        await adv(A);await adv(B)
        g1=await A.ev("()=>MAPS[44].gates.filter(G=>G.to===45).map(G=>[gHid(G),wpGateOk(G)])")
        rep('เฒ่าแก่นไม้: เสียงกัดมาจากฐานแผ่นดิน · ปล่องรากเก่า · เอาปลายเชือกคำมั่นลงไปผูก → ขั้นลงฐานแผ่นดิน',ka[0]=='ked' and 'ปล่องรากเก่า' in ka[1] and 'เชือกคำมั่น' in ka[1] and await A.ev("()=>stCur().g==='map'&&stCur().m===45"),[ka[0],ka[1][-120:]])
        rep('ปล่องรากในห้องโถงราก (แมพ 44) ซ่อนก่อนคุย · เปิดหลังคุย',g0==[[True,False,True,True]] and g1==[[False,True]],[g0,g1])
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{const G=MAPS[44].gates.find(G=>G.to===45);me.x=G.x+80;me.y=G.y+70;PBS.lx=me.x;PBS.ly=me.y;mons=[]}");await A.wait(1200);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_shaft.jpg',quality=80);await A.pg.set_viewport_size({'width':390,'height':844})
        for C in (A,B):
            await C.ev("()=>{const G=MAPS[44].gates.find(G=>G.to===45);me.x=G.x;me.y=G.y;PBS.lx=me.x;PBS.ly=me.y;useGate()}")
        await A.wait(3000);await adv(A);await adv(B);await A.ev(CLEAN);await B.ev(CLEAN)
        m=await A.ev("()=>[curMap,stCur().pa4k?1:0,MAPS[45].n,WMN[45]&&WMN[45][2],WMLV[45],MAPS[45].mth,pzSafe(me.x,me.y),pzZone(me.x,me.y),MAPS[45].npc2.x>0,CASTM(45)]")
        await A.wait(1500)
        HC=A
        for C in (A,B):
            if await C.ev("()=>isHost()"):HC=C
        lv=await HC.ev("()=>{const L=mons.filter(m=>m.t<3);return [L.length,Math.min(...L.map(m=>m.L)),Math.max(...L.map(m=>m.L)),L.every(m=>pzIn(m.hx,m.hy,0)&&!pzSafe(m.hx,m.hy)),[...new Set(L.map(m=>m.t))].sort()]}")
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.wait(600);await A.ev(CLEAN);await A.pg.screenshot(path=SH+'t_arrive.jpg',quality=80);await A.pg.set_viewport_size({'width':390,'height':844})
        rep('ลงปล่องราก → แมพ 45 ฐานแผ่นดิน (ลานปล่องรากปลอดภัย) · ขั้นคุยธรณิน · มอนธีม 47 Lv 164+ เกิดบนตาข่ายเท่านั้น · ธุลีตามลงมา',m[0]==45 and m[1]==1 and m[2]=='ฐานแผ่นดิน' and m[3]==m[2] and m[4]==[164,168] and m[5]==47 and m[6] and m[7]=='lift' and m[8] and m[9] and lv[0]>=6 and 164<=lv[1] and lv[2]<=169 and lv[3],[m,lv])
        geo=await A.ev("""()=>({nests:MAPS[45].nests.every(([x,y])=>pzIn(x,y,40)&&!pzSafe(x,y)),jn:PZJ.every(([x,y])=>pzIn(x,y,40)&&!pzSafe(x,y)),void:[pzIn(300,300,0),pzIn(1600,700,0),pzIn(1200,2000,0),pzIn(2000,2000,0)],aq:[aqWalkable(300,300),aqWalkable(1600,2400)],
          spine:[2760,2600,2450,2300,2100,1950,1800,1650,1500,1350,1200].every(y=>pzIn(1600,y,10)),bridges:PZB.every(b=>pzK(b[0],b[1],0)>=0&&pzK(b[2],b[3],0)>=0),gate:pzIn(PZGATE.x,PZGATE.y,0)&&pzSafe(PZGATE.x,PZGATE.y),thr:pzSafe(PZNPC.x,PZNPC.y+30)&&pzIn(PZNPC.x,PZNPC.y+40,0),zones:[pzZone(1600,1880),pzZone(1600,2300),pzZone(1600,1250)]})""")
        rep('รูปทรงตาข่าย: ความว่างเดินไม่ได้ (ออโต้เควสไม่ตัดผ่าน) · ทางหลักจากลานปล่องรากถึงลานเท้าธรณินต่อกัน · สะพานทุกเส้นต่อปม · รัง/ปมผูกเชือกอยู่บนตาข่าย',geo['nests'] and geo['jn'] and not any(geo['void']) and geo['aq']==[False,True] and geo['spine'] and geo['bridges'] and geo['gate'] and geo['thr'] and geo['zones']==['knot','bridge','feet'],geo)
        w=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=1600;me.y=2300;PZS.lx=me.x;PZS.ly=me.y;await w(300);const a=[Math.round(me.x),Math.round(me.y)];me.x=1200;me.y=2000;await w(300);return {a,b:[Math.round(me.x),Math.round(me.y)],pull:!!PZS.pull}}""")
        rep('ตกความว่างไม่ได้ (ดึงกลับจุดล่าสุด + วงม่วง)',w['a']==w['b'] and w['pull'],w)
        rk=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));"+GOD5+"mons=[];me.x=930;me.y=2300;PZS.lx=me.x;PZS.ly=me.y;PZS.warn=[];PZS.mt=0;await w(250);const n=PZS.warn.length;const W=PZS.warn[0];if(W){me.x=W.x;me.y=W.y;PZS.lx=me.x;PZS.ly=me.y}await w(1500);const hit=me.hp<me.mh&&dn.some(d=>d.v&&String(d.v).indexOf('หินร่วง')>=0);"+UNGOD+"me.x=1600;me.y=2700;PZS.lx=me.x;PZS.ly=me.y;PZS.mt=99;return [n,hit,pzSafe(1600,2700)]}")
        rep('หินร่วงจากฐานแผ่นดิน: วงเตือน 1.3 วิ แล้วกระแทก (ยืนในวงโดน 8%) · ลานปลอดภัยไม่มีหินร่วง',rk[0]>=1 and rk[1] and rk[2],rk)
        mon=await HC.ev("""()=>{const keep=mons;mons=[];const mk=(t,x,y)=>{const m={id:++mid,x,y,tx:x,ty:y,t,L:165,p:1,hx:x,hy:y,hp:999,mh:999,tg:null,tt:0,ac:0,w:null,lg:0};mons.push(m);return m};const a=mk(0,930,2300),j=mk(1,930,2300);terMons();a.x=1200;a.y=2000;j.x=1200;j.y=2000;terMons();const r=[Math.round(a.x),Math.round(a.y),Math.round(j.x),Math.round(j.y)];mons=keep;return r}""")
        rep('มอนเดินออกนอกตาข่ายไม่ได้ · แมงกะพรุนความว่างลอยข้ามความว่างได้',mon==[930,2300,1200,2000],mon)
        ta=await A.ev(TALK45,1);tb=await B.ev(TALK45,1)
        await adv(A);await adv(B)
        rep('ธรณิน: แบกมาตั้งแต่แผ่นดินร้าว · แม่ไม้คือเพื่อนคนแรกที่มาช่วยแบก · แยกตาม e4 (หัวใจคืนเทพ / ผนึกใต้แกนพิภพ) → ขั้นผูกเชือก',
            ta[0]=='thr' and 'แม่ไม้' in ta[1] and 'หัวใจดวงหนึ่งกลับคืนสู่เทพ' in ta[1] and 'ผนึกที่ปิดลง' not in ta[1] and 'ผนึกที่ปิดลง' in tb[1] and 'หัวใจดวงหนึ่งกลับคืนสู่เทพ' not in tb[1] and await A.ev("()=>!!stCur().pa4t"),[ta[0],ta[1][-150:],tb[1][-100:]])
        await B.ev("()=>{ov.hidden=true;enterMap(44,{x:PBKED.x+40,y:PBKED.y+60})}")
        await until_a(A);await A.ev(CLEAN);await A.wait(1500)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{me.x=1520;me.y=1330;PZS.lx=me.x;PZS.ly=me.y;mons=[]}");await A.wait(1200);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_thr.jpg',quality=82);await A.pg.set_viewport_size({'width':390,'height':844})
        host=await A.ev("()=>isHost()")
        aq0=await A.ev("()=>pzAqT(stCur())")
        blk=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const[jx,jy]=PZJ[0];mons=[];const m={id:++mid,x:jx+70,y:jy+40,tx:jx+70,ty:jy+40,t:0,L:165,p:1,hx:jx+70,hy:jy+40,hp:1e9,mh:1e9,tg:null,tt:0,ac:0,w:null,lg:0};mons.push(m);
          me.x=jx;me.y=jy+10;PZS.lx=me.x;PZS.ly=me.y;await w(1600);const a=[(me.sty.pa4t|0)&1,PZS.blk,Math.round(PZS.jt*10)/10];
          for(let k=0;k<36;k++){mons=mons.filter(q=>Math.hypot(q.x-jx,q.y-jy)>420);await w(100)}return [a,(me.sty.pa4t|0)&1,me.sty.n,PALG.card&&PALG.card.h,PALG.card&&PALG.card.t]}""")
        rep('ผูกเชือก: ยืนในวงที่ปมราก 3 วิ · มีมอนใน 160 = ผูกไม่ได้ (ต้องไล่ก่อน) · การ์ด «เชือกของ…» n/5 · ออโต้เควสพาไปปมที่ใกล้สุด',host and aq0 and aq0.get('act')=='reach' and aq0.get('mp')==45 and 'ผูกเชือก' in aq0.get('lb','') and blk[0][0]==0 and blk[0][1]==1 and blk[1]==1 and blk[2]==1 and '1/5' in (blk[3] or '') and 'อารัณยา' in (blk[3] or ''),[host,aq0,blk])
        got=[]
        for i in (2,4,1,3):
            r=await A.ev(f"""async()=>{{const w=ms=>new Promise(r=>setTimeout(r,ms));const[jx,jy]=PZJ[{i}];me.x=jx;me.y=jy+10;PZS.lx=me.x;PZS.ly=me.y;for(let k=0;k<34;k++){{mons=mons.filter(q=>Math.hypot(q.x-jx,q.y-jy)>420);await w(100)}}return [me.sty.pa4t|0,me.sty.n,PALG.card&&PALG.card.h]}}""")
            got.append(r)
            if i==2:
                await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{me.x=PZJ[2][0]+150;me.y=PZJ[2][1]+170;PZS.lx=me.x;PZS.ly=me.y}");await A.wait(900);await A.ev(CLEAN)
                await A.pg.screenshot(path=SH+'t_rope.jpg',quality=80);await A.pg.set_viewport_size({'width':390,'height':844})
        await adv(A)
        s4=await A.ev("()=>[me.sty.s,stCur().g,stCur().m]")
        rep('ผูกเชือกครบ 5 ปม (ลำดับไหนก็ได้ · ชื่อเมืองบนการ์ด) → เชือกตึงขึ้นไป · ขั้นล่า 40 ที่ฐานแผ่นดิน',got[-1][0]==31 and got[-1][1]==5 and all('/5' in (g[2] or '') for g in got) and 'คาร์น' in (got[3][2] or '') and s4==[i0+4,'kill',45],[got,s4])
        dr=await A.ev("""()=>{const c=document.createElement('canvas');c.width=900;c.height=1200;const x=c.getContext('2d'),g0=g;let ok=1;try{g=x;x.translate(-1100,-200);for(const t of trees)if(t.k&&t.k.startsWith('pz'))PALK[t.k](t,1.7);thrDraw(1600,1085,2,{tired:1});thrDraw(1600,1085,2,{tired:0})}catch(e){ok=String(e)}finally{g=g0}
          return [ok,trees.filter(t=>t.k==='pzjn').length,trees.filter(t=>t.k==='pzthr').length,trees.filter(t=>t.k==='pzrock').length,trees.filter(t=>t.k==='pzcry').length,pzTiedN()]}""")
        rep('วาดธรณิน (เหนื่อย/ผ่อนแรง) · เชือกคำมั่น 5 เส้น · หินร่วง · ผลึกความว่าง ไม่มี error',dr[0]==1 and dr[1]==5 and dr[2]==1 and dr[3]>=6 and dr[4]>=8 and dr[5]==5,dr)
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A);await A.wait(900);await adv(A)
        s5=await A.ev("()=>[me.sty.s,stCur().g,stCur().k,stTxt()]")
        rep('ล่า 40 → ขั้นดันรังกัดแผ่นดิน (คุยธุลี)',s5[0]==i0+5 and s5[1]=='pnq' and s5[2]=='thu45',s5)
        await until_a(A);await A.ev(TALK45,2);await adv(A,6)
        for i in range(20):
            if await A.ev("()=>PNQI()"):break
            await A.ev("()=>{if(SD.on&&SD.choice&&SD.onChoose){SD.onChoose(1)}}");await A.wait(300)
        lob=await A.ev("()=>[PNQI(),curMap>=43000&&curMap<44000,MAPS[curMap].n,dg.ph,dgStatusText(),MAPS[curMap].boss.n,MAPS[curMap].th]")
        await A.ev("()=>dgStart()");await adv(A,8);await A.wait(1500)
        run=await A.ev("()=>[dg.ph,PNQ.st,PNQ.f,dgStatusText(),!!trees.find(t=>t.k==='pnqfoot'),trees.filter(t=>t.k==='pnqtun').length,!!trees.find(t=>t.k==='pnqthu')]")
        rep('เข้าดัน «รังกัดแผ่นดิน» (ห้อง 43xxx) · ล็อบบี้ → เริ่ม: ธรณิน 100% · เท้าหินยักษ์ · อุโมงค์ 4',lob[0] and lob[1] and lob[2]=='รังกัดแผ่นดิน' and lob[3]=='lobby' and lob[5]=='ราชินีกัดแผ่นดิน' and lob[6]==47 and run[0]=='run' and run[2]==100 and 'ธรณิน 100%' in run[3] and run[4] and run[5]==4 and run[6],[lob,run])
        wv=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));PNQ.nt=0;await w(3200);const M=mons.filter(m=>m.pnq&&m.hp>0);return [PNQ.st,PNQ.wv,PNQ.eggs.length,M.length,PNDU.length>0&&PNDU.every(e=>Math.hypot(e.x-CX,e.y-CY)>DR-80),PNQ.eggs.every(e=>!pnqFootIn(e.x,e.y,60)&&Math.hypot(e.x-CX,e.y-CY)<DR)]}""")
        rep('คลื่นที่ 1: ไข่เต้นทั่วรัง + ฝูงมุดออกจากอุโมงค์ที่ขอบรัง',wv[0]=='wave' and wv[1]==1 and wv[2]>=3 and wv[3]>=3 and wv[4] and wv[5],wv)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{me.x=CX+120;me.y=CY+60}");await A.wait(1500);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_pnq.jpg',quality=82);await A.pg.set_viewport_size({'width':390,'height':844})
        eg=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));PNQ.st='brk';PNQ.nt=999;PNQ.q=0;mons=[];PNQ.eggs=[];pnqEgg(CX+200,CY+120);pnqEgg(CX-220,CY+60);await w(200);const e0=PNQ.eggs[0],e1=PNQ.eggs[1];
          me.x=e0.x;me.y=e0.y;await w(1200);const crushed=!PNQ.eggs.some(e=>e.i===e0.i)&&PNHB.some(h=>h.k==='cr');mons=[];me.x=CX+380;me.y=CY+260;e1.t=.25;await w(800);
          const S=mons.filter(m=>m.pnq&&m.hp>0&&Math.hypot(m.x-e1.x,m.y-e1.y)<120);return [crushed,!PNQ.eggs.length,S.length,S.every(m=>m.t===0)]}""")
        rep('ไข่: ยืนทับ 0.8 วิ = เหยียบแตก · ปล่อยไว้จนครบเวลา = ฟักเป็นปลวกศิลา 2 ตัว',eg[0] and eg[1] and eg[2]==2 and eg[3],eg)
        ft=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons=[];PNQ.f=100;me.x=CX+400;me.y=CY+300;const mk=(x,y)=>{const m={id:++mid,x,y,tx:x,ty:y,t:0,L:164,p:0,hx:x,hy:y,hp:1e9,mh:1e9,tg:null,tt:0,ac:0,w:null,lg:0,pnq:1};mons.push(m);return m};
          const sd=mk(CX+40,CY-160);sd.gk=40;await w(2600);const bite=PNQ.f;mons=[];const c=mk(PNF.x+10,PNF.y+5);await w(250);const out=Math.hypot((c.x-PNF.x)/PNF.rx,(c.y-PNF.y)/PNF.ry);mons=[];
          PNQ.f=50;me.x=PNBR[0][0];me.y=PNBR[0][1];await w(2100);const reg=PNQ.f;const br=PNQ.br.slice();PNQ.f=100;return [Math.round(bite*10)/10,Math.round(out*100)/100,Math.round(reg*10)/10,br]}""")
        rep('ฝูงวิ่งไปกัดเท้าธรณิน (แถบลด) · เดินทะลุเท้าไม่ได้ · ยืนในวงยันเท้าตอนสงบ = ธรณินฟื้นช้า ๆ',ft[0]<100 and ft[1]>=.99 and ft[2]>50.8 and ft[3]==[1,0],ft)
        bs=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons=[];PNQ.eggs=[];PNQ.wv=2;PNQ.st='wave';PNQ.q=0;me.x=CX+300;me.y=CY+200;await w(800);const Bm=mons.find(m=>m.t===3&&m.hp>0);return [dg.ph,PNQ.st,!!Bm,MAPS[curMap].boss.n,dgStatusText(),Bm&&Math.round(Math.hypot(Bm.x-PNNE.x,Bm.y-PNNE.y))]}""")
        rep('ผ่าน 2 คลื่น → ราชินีกัดแผ่นดินคลานขึ้นจากรัง (ช่วงบอส)',bs[0]=='boss' and bs[1]=='boss' and bs[2] and '👑' in bs[4] and bs[5]<80,bs)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{const Bm=mons.find(m=>m.t===3);me.x=Bm.x+140;me.y=Bm.y+150}");await A.wait(1400);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_boss.jpg',quality=82);await A.pg.set_viewport_size({'width':390,'height':844})
        gn=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3&&m.hp>0);Bm.w1=999;Bm.w2=999;Bm.w3=999;Bm.stun=0;mons=mons.filter(m=>m.t===3);PNQ.f=100;PNQ.eggs=[];me.x=PNBR[0][0];me.y=PNBR[0][1];
          pnqGnaw(Bm);await w(1300);const a=[PNQ.gs,Math.round(Math.hypot(Bm.x-PNGN.x,Bm.y-PNGN.y)),PNQ.br.slice(),PNQ.gk>0];const f0=PNQ.f;await w(2000);const rate=(f0-PNQ.f)/2;
          Bm.hp-=PNQ.gk+10;await w(400);const b=[PNQ.gn,PNQ.gs,Bm.stun>0,PNQ.rk.length>0,PNRK.length>0,PNHB.some(h=>h.k==='int')];return {a,rate:Math.round(rate*100)/100,b}}""")
        rep('ราชินีพุ่งไปกัดเท้าธรณิน · ยืนในวงยันเท้า = กัดเบาลง (×0.75 ต่อวง) · ตีถึงเกณฑ์ = ขัด + มึน + หินร่วงทั้งรัง',gn['a'][0]=='gnaw' and gn['a'][1]<6 and gn['a'][2]==[1,0] and gn['a'][3] and 1.5<=gn['rate']<=1.95 and gn['b'][0]==0 and gn['b'][1]=='' and gn['b'][2] and gn['b'][3] and gn['b'][4] and gn['b'][5],gn)
        await A.pg.set_viewport_size({'width':1280,'height':720})
        ge=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3&&m.hp>0);Bm.stun=0;Bm.w1=999;Bm.w2=999;Bm.w3=999;PNQ.rk=[];await w(300);mons=mons.filter(m=>m.t===3);me.x=CX+190;me.y=CY-30;const f0=PNQ.f;pnqGnaw(Bm);await w(2600);return f0}""")
        await A.ev(CLEAN);await A.pg.screenshot(path=SH+'t_gnaw.jpg',quality=82)
        ge2=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await w(5200);const Bm=mons.find(m=>m.t===3&&m.hp>0);return [PNQ.gn,PNQ.gs,PNQ.f,PNQ.rk.length>0||PNRK.length>0,Bm&&Bm.tf<=0]}""")
        await A.pg.set_viewport_size({'width':390,'height':844})
        drop=ge-ge2[2]
        rep('ไม่มีใครขัด/ยันเท้า = ราชินีกัดครบ 6 วิ (ธรณิน −13.8%) แล้วหินร่วง',ge2[0]==0 and ge2[1]=='' and 12.5<=drop<=15 and ge2[3] and ge2[4],[ge,ge2,drop])
        ac=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));"+GOD5+"const Bm=mons.find(m=>m.t===3&&m.hp>0);Bm.stun=0;Bm.ac2=null;Bm.w2=999;Bm.w3=999;PNQ.gn=0;PNQ.rk=[];mons=mons.filter(m=>m.t===3);me.x=Bm.x+150;me.y=Bm.y+40;Bm.w1=0;await w(300);const warn=PNAC.filter(e=>!e.s).length;await w(1300);const hit=me.hp<me.mh;"+UNGOD+"Bm.w1=999;return [warn,hit,PNAC.some(e=>e.s)]}")
        rep('กรวยกรด: เตือนเป็นกรวยสีเขียว 1.1 วิ แล้วพ่น ยืนในกรวยโดน',ac[0]>=1 and ac[1] and ac[2],ac)
        el=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3&&m.hp>0);PNQ.eggs=[];Bm.stun=0;Bm.w3=0;await w(400);const n=PNQ.eggs.length;Bm.w3=999;Bm.hp=Bm.mh*.45;await w(500);const r=[n,PNQ.mo,mons.filter(m=>m.pnq&&m.t===0&&m.hp>0).length];PNQ.eggs=[];return r}")
        rep('ราชินีวางไข่ 3 ฟองขึ้นไป · เลือดต่ำกว่า 50% = ลอกคราบ (เร็วขึ้น) + ลูกฝูง',el[0]>=3 and el[1]==1 and el[2]>=2,el)
        for i in range(30):
            if await A.ev("()=>dg.ph==='win'||dgRew"):break
            await A.ev("()=>{mons.forEach(m=>{if(m.t!==3)m.hp=0});mons=mons.filter(m=>m.t===3);PNQ.eggs=[];const Bm=mons.find(m=>m.t===3&&m.hp>0);if(Bm){Bm.inv=0;Bm.tf=0;PNQ.gn=0;Bm.hp=1;me.x=Bm.x;me.y=Bm.y+80;try{dmgMon(Bm,1e6)}catch(e){Bm.hp=0}}}");await A.wait(400)
        wn=await A.ev("()=>[dg.ph,banner&&banner.s,me.sty.n]")
        for i in range(40):
            if await A.ev("()=>curMap===45"):break
            await A.wait(500)
        await adv(A)
        s6=await A.ev("()=>[curMap,me.sty.s,stCur()&&stCur().k]")
        rep('ชนะราชินีกัดแผ่นดิน → รางวัลเนื้อเรื่อง → กลับฐานแผ่นดิน → ขั้นคุยธรณิน',wn[0]=='win' and wn[2]==1 and s6==[45,i0+6,'thr'],[wn,s6])
        await until_a(A)
        qe=await A.ev(TALK45,1)
        await adv(A);await A.wait(600);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stR4,NPC3[45].s[0]]")
        rep('ธรณิน: ได้ยินความเงียบ · «ปล่อยให้ร่วงเถิด…» · ค่ายทรุดอีกหนึ่งคืบ → จบบทที่ 4 · ฉายา «ผู้ลงไปถึงก้นแผ่นดิน»',qe[0]=='thr' and 'ปล่อยให้ร่วงเถิด' in qe[1] and 'หนึ่งคืบ' in qe[1] and en[0]==i0+7 and ((en[0]==en[1] and 'ราชินีกัดแผ่นดิน' in en[2]) or en[1]>i0+7) and en[3] and 'ปล่อยให้ร่วง' in en[4],[qe[1][-120:],en])
        rp=await A.ev("()=>{const N=MAPS[45].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();return [SD.choice?SD.choice.map(c=>c[0]).join('|'):'',SD.q.map(l=>l[1]).join('|'),!!STY[me.sty.s]]}")
        await A.ev("()=>{try{stClose()}catch(e){}}")
        rep('หลังจบบท: คุยธุลี = เล่นซ้ำรังกัดแผ่นดิน (หรือเริ่มบทที่ 5 ถ้ามีบทต่อไปแล้ว)',('รังกัดแผ่นดิน' in rp[0]) or (rp[2] and 'ลงมาเดี๋ยวนี้' in rp[1]),[rp[0],rp[1][:80],rp[2]])
        cz=await A.ev("()=>[CZDEF.pa4m&&CZDEF.pa4m.get()===STY.find(x=>x.pa4m).post,CZDEF.pa4k&&CZDEF.pa4k.get()===STY.find(x=>x.pa4k).pre,CZDEF.pa4c&&CZDEF.pa4c.get()===STY.find(x=>x.pa4c).pre,CZORD.includes('pa4c')]")
        rep('ฉากภาพยนตร์ 3 ฉาก (มาถึงฐานแผ่นดิน · คุยธรณิน · ปล่อยให้ร่วงเถิด) ผูกกับเนื้อเรื่อง',all(cz),cz)
        await shot(A,'t_feet',1600,1300);await shot(A,'t_web',1640,1980);await shot(A,'t_k1',1000,2330)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        errs=await A.ev("()=>[NPV.err||'',MV9.err||'',window.__err]")
        rep('ไม่มี error ในหน้าเกม',not E and not errs[0] and not errs[2],[E[:4],errs])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
