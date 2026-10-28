"""v547 ภาค 10 บทที่ 1 · แผ่นดินทรุด: เรนน์ (แยก e9/e7 + คัตซีน pao) · รอยแยก/ทางลงที่ค่าย · แมพ 43 ปากเหวแผ่นดินทรุด (เหว · ยอดไม้ · สะพานราก · ดินถล่ม)
   ช่วยชาวค่าย 5 · ฟังราก 5 (ภาพสลักตามลำดับ) · ล่า 40 · ธุลี · ฉายา · เซฟคีย์ q9/e10/pa*"""
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
SH='../v547/'
CLEAN="()=>{try{localStorage.setItem('refugee_wn',WNV)}catch(e){};const p=document.getElementById('wnp');if(p)p.remove();PALG.card=null;PALG.title=null;banner=null;document.querySelectorAll('.tipc,#tipc').forEach(e=>e.remove())}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ra'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Rb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.pas1)")
        info=await A.ev("()=>[STY.findIndex(x=>x.p9e9),STY.length,STCH[STY[STY.findIndex(x=>x.pas1)].c],STY.findIndex(x=>x.pac1)]")
        rep('ภาค 10 บทที่ 1 ต่อจากจบภาค 9 (6 ขั้น)',i0==info[0]+1 and info[1]>=i0+6 and info[3]==i0+5 and 'ภาค 10' in info[2],[i0,info])
        sv=await A.ev("()=>{const o=cleanChar({lv:99,sty:{s:5,n:0,a:0,e:1,e4:2,q9:2,e9:1,e10:2,pacr:31,parr:7,paro:1234,p9sf:31,zz9:4}});return o&&o.sty}")
        rep('เซฟ: คีย์ q9 · e10 · pacr/parr/paro ไม่หายตอนโหลด (เดิม q9 หาย)',sv.get('q9')==2 and sv.get('e10')==2 and sv.get('pacr')==31 and sv.get('paro')==1234 and sv.get('p9sf')==31 and 'zz9' not in sv,sv)
        for C,e9,e7 in ((A,1,2),(B,2,1)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:{e7},p7m:2,p8g:1,e8:1,q9:1,e9:{e9}}};me.wv=[1,9,32,36,38,39,40,41,42,2,3];ov.hidden=true;enterMap(1,{{x:1520,y:1500}})}}")
        await A.wait(2600);await A.ev(CLEAN);await B.ev(CLEAN)
        h0=await A.ev("()=>MAPS[1].gates.filter(G=>G.to===43).map(G=>[gHid(G),wpGateOk(G)])")
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev("()=>{me.x=PAGATE.x+40;me.y=PAGATE.y-150;mons=[]}");await A.wait(1500);await A.ev(CLEAN)
        await A.pg.screenshot(path=SH+'t_camp_rift.jpg',quality=80)
        await A.pg.set_viewport_size({'width':390,'height':844})
        qa=await A.ev("()=>{const N=MAPS[1].npc4;npcSel=4;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|'),!!(typeof CZ!=='undefined'&&CZ.on),CZ&&CZ.id]}")
        await A.wait(1600);await A.pg.screenshot(path=SH+'t_cz1.jpg',quality=78)
        for i in range(4):
            await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(900)
        await A.pg.screenshot(path=SH+'t_cz2.jpg',quality=78)
        qb=await B.ev("()=>{const N=MAPS[1].npc4;npcSel=4;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        rep('คุยเรนน์: ค่ายทรุดหนึ่งคืบ · แยกตาม e9 (ดาวกลับคืนฟ้า/สะพานดาว) และ e7 (หัวใจนครลี้ภัย/ระฆังอารัณยา) · คัตซีนเปิดภาค pao',
            qa[0]=='cmd' and 'หนึ่งคืบ' in qa[1] and 'ดาวทุกดวงที่เคยถูกทอไว้' in qa[1] and 'หัวใจดวงใหม่' in qa[1] and 'สะพานดาวที่ทอ' not in qa[1] and 'สะพานดาวที่ทอ' in qb and 'ระฆังของพวกเขา' in qb and 'หัวใจดวงใหม่' not in qb and qa[2] and qa[3]=='pao',[qa[0],qa[2],qa[3],qa[1][-90:],qb[-90:]])
        await adv(A);await adv(B)
        h1=await A.ev("()=>MAPS[1].gates.filter(G=>G.to===43).map(G=>[gHid(G),wpGateOk(G)])")
        rep('ทางลง «ปากเหวแผ่นดินทรุด» ที่ค่ายซ่อนก่อนคุย · เปิดหลังคุย',h0==[[True,False]] and h1==[[False,True]],[h0,h1])
        await A.ev("()=>{me.x=PAGATE.x;me.y=PAGATE.y;useGate()}");await A.wait(3000);await adv(A);await A.ev(CLEAN)
        m=await A.ev("()=>[curMap,stCur().pacr?1:0,paSafe(me.x,me.y),MAPS[43].n,WMN[43]&&WMN[43][2],WMLV[43],MAPS[43].mth,TIER[43]]")
        lv=await A.ev("()=>{const L=mons.filter(m=>m.t<3).map(m=>m.L);return [L.length,Math.min(...L),Math.max(...L),mons.filter(m=>m.t<3).every(m=>paIn(m.hx,m.hy,0)&&!paSafe(m.hx,m.hy)),[...new Set(mons.filter(m=>m.t<3).map(m=>m.t))]]}")
        await A.pg.screenshot(path=SH+'t_arrive.jpg',quality=78)
        rep('ลงทางรอยแยก → แมพ 43 (ค่ายพักริมเหว ปลอดภัย) · ขั้นช่วยชาวค่าย · มอน Lv 156–160 ไม่เกิดในค่ายพัก · แผนที่โลก',m[0]==43 and m[1]==1 and m[2] and m[3]=='ปากเหวแผ่นดินทรุด' and m[4]==m[3] and m[5]==[156,160] and m[6]==45 and lv[0]>10 and 156<=lv[1] and lv[2]<=161 and lv[3],[m,lv])
        geo=await A.ev("""()=>{const mid=b=>[(b[0]+b[2])/2,(b[1]+b[3])/2],vp=b=>{for(let k=1;k<40;k++){const u=k/40,x=b[0]+(b[2]-b[0])*u,y=b[1]+(b[3]-b[1])*u;if(paCd(x,y)<-10&&paK(x,y,0)<0)return[x,y]}return null};return {br:PAB.map(b=>{const q=vp(b);return !!q&&paIn(q[0],q[1],0)}),cr:PAK.map(K=>paIn(K.x,K.y,0)),voidp:[paIn(1600,1300,0),paIn(1450,1950,0),paIn(2200,1650,0)],
          aq:[aqWalkable(1600,1300),aqWalkable(...mid(PAB[2]))],paths:PAPATH.every(L=>L.every(([x,y])=>paCd(x,y)>40)),folk:PAFP.map(([x,y],i)=>i<4?paLand(x,y,20)&&paRim(x,y,270):paK(x,y,30)===0),roots:PARP.map(([x,y])=>paIn(x,y,20)),thu:paLand(PATHU.x,PATHU.y,60),
          gate:paSafe(1600,150)&&paSafe(1600,330)}}""")
        rep('รูปทรง: สะพานรากทั้ง 6 เดินได้กลางเหว · ยอดไม้ 3 ยอดเดินได้ · ห้วงลึกเดินไม่ได้ (ออโต้เควสไม่ตัดผ่าน) · ถนนวงรอบไม่แตะเหว · ชาวค่ายอยู่บนขั้นดินแตก/ยอดไม้',
            all(geo['br']) and all(geo['cr']) and not any(geo['voidp']) and geo['aq']==[False,True] and geo['paths'] and all(geo['folk']) and all(geo['roots']) and geo['thu'] and geo['gate'],geo)
        w=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=1600;me.y=1000;PAS.lx=me.x;PAS.ly=me.y;await w(300);const a=[Math.round(me.x),Math.round(me.y)];me.x=1600;me.y=1330;await w(300);const bk=[Math.round(me.x),Math.round(me.y)];
          const b=PAB[1];me.x=(b[0]+b[2])/2;me.y=(b[1]+b[3])/2;PAS.lx=me.x;PAS.ly=me.y;await w(300);const onB=[Math.round(me.x),Math.round(me.y),paZone(me.x,me.y)];return {a,bk,onB}}""")
        rep('ตกเหวไม่ได้ (ดึงกลับจุดล่าสุด) · ยืนบนสะพานรากได้ (โซน «สะพานราก»)',w['bk']==w['a'] and w['onB'][2]=='root',w)
        mon=await A.ev("""()=>{mons=mons.filter(m=>m.t<3).slice(0,0);const mk=(t,x,y)=>{const m={id:++mid,x,y,tx:x,ty:y,t,L:157,p:1,hx:x,hy:y,hp:999,mh:999,tg:null,tt:0,ac:0,w:null,lg:0};mons.push(m);return m};
          const a=mk(0,1600,1000),b=mk(1,1600,1000);terMons();a.x=1600;a.y=1330;b.x=1600;b.y=1330;terMons();const r=[Math.round(a.y),Math.round(b.y)];mons=[];return r}""")
        rep('ตัวกัดหิน/ยักษ์ดินถล่มเดินลงเหวไม่ได้ · ค้างคาวบินข้ามเหวได้',mon[0]==1000 and mon[1]==1330,mon)
        mt=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));gmGod=false;mons=[];me.hp=me.mh;const[x,y]=paEP(-1.57,120);me.x=x;me.y=y;PAS.lx=x;PAS.ly=y;PAS.warn=[];const k0=PAS.hk|0;PAS.warn.push({x:me.x,y:me.y,t:.5,d:.5,rk:0,s:7});await w(1100);
          const h=(PAS.hk|0)>k0?Math.round(PAS.hd/me.mh*100):-1,hole=PAS.hole.length;me.hp=me.mh;me.x=1600;me.y=400;PAS.lx=me.x;PAS.ly=me.y;PAS.warn=[];PAS.mt=0;await w(1300);const safe=PAS.warn.length;
          const K=PAK[1];me.x=K.x;me.y=K.y;PAS.lx=me.x;PAS.ly=me.y;PAS.mt=0;const _r=Math.random;Math.random=()=>.1;await w(300);Math.random=_r;const rk=PAS.warn.length?PAS.warn[0].rk:-1;PAS.warn=[];gmGod=true;return [h,hole,safe,rk,paZone(K.x,K.y)]}""")
        rep('ดินถล่ม: รอยแตกเตือนแล้วถล่ม ยืนในวงเสียเลือด ~8% + หลุม · ค่ายพักไม่มีดินถล่ม · บนยอดไม้เป็นหินร่วง',7<=mt[0]<=9 and mt[1]>=1 and mt[2]==0 and mt[3]==1 and mt[4]=='crown',mt)
        aq0=await A.ev("()=>{me.sty.pacr=15;const r=arAqT(stCur());me.sty.pacr=0;return r}")
        got=[]
        for i in range(5):
            r=await A.ev(f"async()=>{{const[x,y]=PAFP[{i}];me.x=x;me.y=y+26;PAS.lx=me.x;PAS.ly=me.y;mons=[];await new Promise(r=>setTimeout(r,1900));return [me.sty.pacr|0,me.sty.n,PALG.card&&PALG.card.h]}}")
            got.append(r)
            if i==4:
                await A.ev("()=>{PALG.card=null}");await A.wait(200)
        await A.pg.screenshot(path=SH+'t_rescue.jpg',quality=78)
        await adv(A)
        s3=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ช่วยชาวค่าย 5 คน (ยืน 1.5 วิ · การ์ดเสียงชาวค่ายทีละคน · ออโต้เควสคนบนยอดไม้บอกให้ข้ามสะพานราก) → ขั้นฟังราก',got[-1][0]==31 and all('ปลอดภัย' in (g[2] or '') for g in got) and s3[0]==i0+3 and aq0 and 'สะพานราก' in aq0.get('lb',''),[aq0,got,s3])
        await A.ev(CLEAN)
        order=[3,0,4,1,2];cards=[]
        for i in order:
            r=await A.ev(f"async()=>{{const[x,y]=PARP[{i}];me.x=x;me.y=y+30;PAS.lx=me.x;PAS.ly=me.y;mons=[];await new Promise(r=>setTimeout(r,1400));return [me.sty.parr|0,me.sty.n,PALG.card&&PALG.card.h,PAS.go&&PAS.go[{i}]]}}")
            cards.append(r)
        await A.ev("()=>{PALG.card=null;const[x,y]=PARP[1];me.x=x-60;me.y=y+40;PAS.lx=me.x;PAS.ly=me.y}");await A.wait(900)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev(CLEAN);await A.wait(600)
        await A.pg.screenshot(path=SH+'t_glyph.jpg',quality=80)
        await A.pg.set_viewport_size({'width':390,'height':844})
        paro=await A.ev("()=>{const o=me.sty.paro|0;return [0,1,2,3,4].map(i=>(o>>(i*3))&7)}")
        await adv(A)
        s4=await A.ev("()=>[me.sty.s,stTxt()]")
        nums=['๑','๒','๓','๔','๕']
        rep('ฟังรากเรือง 5 จุด: ภาพสลักขึ้นตามลำดับที่ฟัง (๑→๕ ไม่ว่าฟังรากไหนก่อน) · ลำดับเก็บในเซฟ → ขั้นล่า',cards[-1][0]==31 and all(nums[k] in (cards[k][2] or '') for k in range(5)) and [c[3] for c in cards]==[0,1,2,3,4] and paro==[1,3,4,0,2] and s4[0]==i0+4,[cards,paro,s4])
        await A.ev("()=>{PALG.card=null;PALG.title=null}")
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        th0=await A.ev("()=>MAPS[43].npc.x")
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A);await A.wait(900);await adv(A)
        s5=await A.ev("()=>[me.sty.s,stTxt(),MAPS[43].npc.x,MAPS[43].npc.y]")
        rep('ล่า 40 → ธุลีโผล่ที่ปลายสะพานรากด้านเหนือ (ก่อนหน้านั้นซ่อน)',s5[0]==i0+5 and th0<0 and s5[2]>0,[th0,s5])
        await A.ev("()=>{me.x=PATHU.x+46;me.y=PATHU.y+30;PAS.lx=me.x;PAS.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(1500)
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.ev(CLEAN);await A.ev("()=>{try{ZM.z=1.6}catch(e){}}");await A.wait(900)
        await A.pg.screenshot(path=SH+'t_thu.jpg',quality=82)
        await A.ev("()=>{try{ZM.z=1}catch(e){}}");await A.pg.set_viewport_size({'width':390,'height':844})
        qt=await A.ev("()=>{const N=MAPS[43].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stR1,MAPS[43].npc.x>0,typeof npvW==='function'&&!!NPC3[43].d.npv]")
        rep('ธุลี: คนรากลึก · ต้นค้ำแผ่นดินกำลังจะตาย → จบบทที่ 1 · ฉายา «ผู้ได้ยินเสียงใต้แผ่นดิน» · ธุลียังอยู่ที่ขอบเหว (วาดแบบ NPC ใหม่)',qt[0]=='thu' and 'คนรากลึก' in qt[1] and 'ต้นค้ำแผ่นดิน' in qt[1] and en[0]==i0+6 and ('แผ่นดินทรุด' in en[2] or en[1]>i0+6) and en[3] and en[4] and en[5],[qt[0],qt[1][-100:],en])
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        errs=await A.ev("()=>[NPV.err||'',MV9.err||'',window.__err]")
        rep('ไม่มี error ในหน้าเกม',not E and not errs[0] and not errs[2],[E[:4],errs])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
