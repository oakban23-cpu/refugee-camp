import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v518 ไอคอนไอเทมวาดใหม่: เกราะ/เครื่องประดับ/รองเท้า × 7 ระดับ × 3 สายอาชีพ · ชุดเซ็ต 6 แบบ · ขอบเรืองตีบวก · วัตถุดิบ 31 ชนิด
PX="""async(u)=>{const im=new Image();im.src=u;await im.decode();const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,96,96).data;let n=0,s=0;for(let i=3;i<d.length;i+=4){if(d[i]>128)n++;s+=d[i]}return [n,s]}"""
async def main():
    p=start_server();ok=0;bad=0
    def rep(n,c,d=''):
        nonlocal ok,bad
        if c: ok+=1
        else: bad+=1
        print(('✅' if c else '❌'),n,('' if c else d)[:900],flush=True)
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ic'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        await A.ev("()=>{ov.hidden=false;gearUI();ov.hidden=true}");await A.wait(300)
        r=await A.ev("""()=>[typeof itIcoH,String(cellH).indexOf('itIcoH(it,slot)')>=0,String(introRaw.toString().indexOf('itIcoURL')>=0||String(window.introRaw).indexOf('itIcoURL')>=0),
          String(vz3Next).indexOf('itIcoImg(')>=0,Object.keys(MATI).length,GOODS.filter(o=>MATI[o.k]).length,GOODS.filter(o=>MATI[o.k]&&o.itw).length]""")
        src=await A.ev("()=>{const s=[...document.scripts].map(e=>e.textContent).join('');return [s.indexOf('itIcoURL(it,s,k)')>=0,s.indexOf('itEmptyH(s,k)')>=0,(s.match(/itSetIco\\(/g)||[]).length]}")
        rep('ติดตั้ง: cellH → itIcoH · การ์ดเลือกตัวละคร · ป้ายของดรอป · ปุ่มตีชุดเซ็ต 5 จุด · ห่อไอคอนของใช้ (GOODS) ครบ · ผงรูน/รูนเสริม/ถังปลา/อาหาร/ผลึกจุติ แทนในช่องตอนแสดง',
            r[0]=='function' and r[1] and r[3] and r[4]==31 and r[5]>=26 and r[6]==r[5] and src[0] and src[1] and src[2]>=6,json.dumps([r,src]))
        # ทุกระดับ × ทุกสาย ต่างกันและไม่ว่าง
        r=await A.ev("""async()=>{const PX="""+PX+""";const out={dup:[],thin:[],n:0};const seen={};
          for(const[sl,fams]of[['a',['h','l','r']],['c',['h']],['b',['h']]])for(const fam of fams)for(let t=0;t<7;t++){const u=itEquipURL(sl,t,fam,0,0,0);out.n++;if(seen[u])out.dup.push([sl,fam,t,seen[u]]);seen[u]=[sl,fam,t];const[n]=await PX(u);if(n<(sl==='c'?600:1400))out.thin.push([sl,fam,t,n])}return out}""")
        rep('เกราะ 3 แบบ (หนัก/เบา/ชุดคลุม) · เครื่องประดับ · รองเท้า × 7 ระดับ: ภาพไม่ซ้ำกันและไม่โหว่ (35 แบบ)',r['n']==35 and not r['dup'] and not r['thin'],json.dumps(r))
        # สายอาชีพ → แบบเกราะ
        r=await A.ev("""()=>{const it=genItem(60,'a',4,4);const c0=me.cls,o={};for(const k of['melee','archer','assn','mage','sup']){me.cls=k;o[k]=itIcoH(it,'a')}me.cls=c0;return [o.melee!==o.archer,o.archer===o.assn,o.mage===o.sup,o.mage!==o.melee,o.mage!==o.archer,o.melee.indexOf('<img')===0]}""")
        rep('เกราะตามสายอาชีพ: นักรบ=เกราะหนัก · ธนู/นักฆ่า=เกราะเบา · เวท/ซัพ=ชุดคลุม',all(r),json.dumps(r))
        # ชุดเซ็ต + ตีบวก
        r=await A.ev("""async()=>{const PX="""+PX+""";const o={set:[],up:[]};const base=itEquipURL('a',6,'h',0,0,0);const S=new Set([base]);
          for(let s=1;s<=6;s++){const u=itEquipURL('a',6,'h',s,0,0);o.set.push(!S.has(u));S.add(u)}
          for(const sl of['a','c','b']){const b0=itEquipURL(sl,4,'h',0,0,0),[n0,s0]=await PX(b0);let prev=s0;for(let L=1;L<=3;L++){const u=itEquipURL(sl,4,'h',0,L,0),[n,s]=await PX(u);o.up.push([sl,L,u!==b0,s>s0*1.04])}}
          const it=genItem(60,'b',3,3);it.u=7;const a7=itIcoURL(it,'b');it.u=6;const a6=itIcoURL(it,'b');it.u=10;const a10=itIcoURL(it,'b');it.u=15;const a15=itIcoURL(it,'b');
          o.lv=[a7!==a6,a10!==a7,a15!==a10,itUpLv(6),itUpLv(7),itUpLv(10),itUpLv(15)];return o}""")
        rep('ชุดเซ็ต 6 แบบลายไม่ซ้ำ · ขอบเรืองตีบวก +7 / +10 / +15 (เรืองขึ้นตามขั้น)',all(r['set']) and all(x[2] and x[3] for x in r['up']) and r['lv'][:3]==[True,True,True] and r['lv'][3:]==[0,1,2,3],json.dumps(r))
        # ช่องอุปกรณ์/กระเป๋า
        r=await A.ev("""()=>{me.bag=[];const mk=(sl,r,ss,u)=>{const it=genItem(60,sl,r,r);if(ss)it.ss=ss;if(u)it.u=u;return it};for(const sl of['a','c','b','w','h'])me.bag.push(mk(sl,3));me.bag.push(mk('a',6,2,8));
          me.eq.b=null;ov.hidden=false;gearUI();const cells=[...ov.querySelectorAll('.cell')];const bag=cells.filter(c=>/data-gp="bag/.test(c.outerHTML)||(c.dataset.gp||'').startsWith('bag'));
          const imgs=bag.map(c=>!!c.querySelector('img'));const emo=bag.filter(c=>/[🥾💍]/u.test(c.textContent)).length;
          const eqB=cells.find(c=>(c.dataset.gp||'')==='eq:b'||/data-gp="eq:b"/.test(c.outerHTML));
          const h=itIcoH(null,'b'),hw=itIcoH(me.bag[3],'w'),hh=itIcoH(me.bag[4],'h');
          return {n:bag.length,imgs:imgs.filter(Boolean).length,emo,eqB:eqB?eqB.innerHTML.slice(0,80):'',empty:h.indexOf('opacity:.6')>0,w:hw.indexOf('<img')===0,h:hh.indexOf(helmIcon(me.bag[4]))>0,err:ITI.err}}""")
        rep('หน้าอุปกรณ์: ทุกชิ้นในกระเป๋าเป็นภาพวาด ไม่มีอีโมจิ 🥾💍 · ช่องว่างเป็นเงาจาง · หมวกใช้ภาพเดิม',r['n']==6 and r['imgs']==6 and r['emo']==0 and r['empty'] and r['w'] and r['h'] and '<img' in r['eqB'] and not r['err'],json.dumps(r,ensure_ascii=False))
        # วัตถุดิบ
        r=await A.ev("""async()=>{for(const o of GOODS)try{gdSet(o.k,o.k==='twc'?1234:5)}catch(e){}ov.hidden=false;gearUI();await new Promise(r=>setTimeout(r,60));const c=[...ov.querySelectorAll('.cell[data-gd]')];
          const known=c.filter(e=>MATI[e.dataset.gd]);const miss=known.filter(e=>!e.querySelector('img[data-iti]')).map(e=>e.dataset.gd);
          const cnt=known.filter(e=>{const s=[...e.querySelectorAll('span')].find(x=>x.style.position==='absolute');return s&&/\\d/.test(s.textContent)}).length;
          const emo=known.filter(e=>/[🛡️🪙🐚💠🪶⚡🍯🕸️🌑🪨🔷☄️💎🌿🌸🪷🍄🔴🔵🟢⚫⚪🟡🌈🎯🔗🪣🍱🌅]/u.test(e.textContent)).map(e=>e.dataset.gd);
          const keep=['hp','mp','s1','s2','s3'].map(k=>{const e=c.find(x=>x.dataset.gd===k);return e&&!e.querySelector('img[data-iti]')});
          const tr=GDM.o1.ic();return {all:c.length,known:known.length,miss,cnt,emo,keep,tr:tr.indexOf('data-iti')>0}}""")
        rep('ของใช้ & วัตถุดิบ 31 ชนิดเป็นภาพวาด (ตัวเลขจำนวนยังอยู่) · ยา/หินตีบวกคงแบบเดิม · หน้าแลกเปลี่ยนได้ภาพเดียวกัน',r['known']==31 and not r['miss'] and r['cnt']==31 and not r['emo'] and all(r['keep']) and r['tr'],json.dumps(r,ensure_ascii=False))
        # ป้ายของดรอป + การ์ดเลือกตัวละคร + ปุ่มตีชุดเซ็ต
        r=await A.ev("""async()=>{ov.hidden=true;const it=genItem(60,'c',5,5);it.ss=5;VZ3.show=[];VZ3.showing=0;vz3Show(it);await new Promise(r=>setTimeout(r,120));const t=document.querySelector('#vzs .ic');const toast=!!(t&&t.querySelector('img'));
          const k=Object.keys(saves.chars)[0],sv=saves.chars[k];sv.eq=sv.eq||{};sv.eq.a=genItem(60,'a',4,4);sv.eq.c=genItem(60,'c',2,2);sv.eq.b=null;saves.last=k;ov.hidden=false;intro();await new Promise(r=>setTimeout(r,200));
          const eq=[...ov.querySelectorAll('.cs-eq > div')];const csI=eq.filter(d=>d.querySelector('img')).length;const e0=eq.filter(d=>d.classList.contains('e0')&&d.querySelector('img')).length;
          const sb=itSetIco(4,'b'),sw=itSetIco(4,'w');ov.hidden=true;return {toast,csN:eq.length,csI,e0,sb:sb.indexOf('<img')===0,sw:sw.indexOf('<img')===0}}""")
        rep('ป้ายของดรอปใช้ภาพวาด · การ์ดเลือกตัวละครโชว์เกราะ/ประดับ/ช่องว่าง · ปุ่มตีชุดเซ็ตมีไอคอนสีชุด',r['toast'] and r['csI']>=3 and r['e0']>=1 and r['sb'] and r['sw'],json.dumps(r,ensure_ascii=False))
        # error → อีโมจิเดิม
        r=await A.ev("""()=>{const o={};const c0=ITI.c;ITI.c={};const sv=window.itArmorHeavy;window.itArmorHeavy=function(){throw new Error('x')};ITI.err='';const it=genItem(60,'a',3,3);me.cls='melee';
          o.a=itIcoH(it,'a')===SI.a;o.err=!!ITI.err;window.itArmorHeavy=sv;
          const sm=window.itMatURL;window.itMatURL=function(){throw new Error('y')};o.m=GDM.sc.ic()==='🐚';window.itMatURL=sm;
          ITI.on=0;o.off=itIcoH(it,'c')===SI.c&&GDM.fe.ic()==='🪶'&&itSetIco(3,'a')===SI.a;ITI.on=1;ITI.c=c0;ITI.err='';o.back=itIcoH(it,'a').indexOf('<img')===0;return o}""")
        rep('error / ปิดระบบ → กลับไปใช้อีโมจิเดิม แล้วกลับมาวาดได้',all(r.values()),json.dumps(r))
        # แคช + ความเร็ว
        r=await A.ev("""()=>{const c0=ITI.c;ITI.c={};const t0=performance.now();let n=0;for(const sl of['a','c','b'])for(let t=0;t<7;t++){itEquipURL(sl,t,'h',0,0,0);n++}for(const k in MATI){itMatURL(k);n++}const t1=performance.now();
          for(let i=0;i<5;i++)for(const sl of['a','c','b'])for(let t=0;t<7;t++)itEquipURL(sl,t,'h',0,0,0);const t2=performance.now();ITI.c=c0;return {n,first:t1-t0,per:(t1-t0)/n,cached:(t2-t1)/105}}""")
        rep('แคช: สร้างครั้งแรกเฉลี่ย < 25 ms/ภาพ · เรียกซ้ำจากแคช < 0.05 ms',r['per']<25 and r['cached']<.05,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
