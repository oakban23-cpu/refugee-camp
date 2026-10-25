import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v519 ไอคอนอาวุธวาดใหม่: 5 สาย × 3 ทรง (ตรงกับทรงที่ถือในเกม) × 7 ระดับ · ชุดเซ็ต · ขอบเรืองตีบวก
PX="""async(u)=>{const im=new Image();im.src=u;await im.decode();const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,96,96).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i]>128)n++;return n}"""
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
        A=await new_client(b,'Wp'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("""()=>{const it=genItem(60,'w',3,3);const u=itIcoURL(it,'w');return [typeof itWeapon,typeof wpStyle,!!u&&u.indexOf('data:image/png')===0,u!==weaponIcon(it),itIcoH(it,'w').indexOf(u)>0]}""")
        rep('ติดตั้ง: ช่องอาวุธใช้ไอคอนวาดใหม่ (ไม่ใช่ภาพย่อจากอาวุธในมือแบบเดิม)',r[0]=='function' and r[1]=='function' and all(r[2:]),json.dumps(r))
        r=await A.ev("""async()=>{const PX="""+PX+""";const o={dup:[],thin:[],n:0,min:1e9};const seen={};for(const cls of['melee','archer','mage','sup','assn'])for(let s=0;s<3;s++)for(let t=0;t<7;t++){const u=itEquipURL('w',t,cls+':'+s,0,0,0);o.n++;if(seen[u])o.dup.push([cls,s,t,seen[u]]);seen[u]=[cls,s,t];const n=await PX(u);o.min=Math.min(o.min,n);if(n<900)o.thin.push([cls,s,t,n])}return o}""")
        rep('5 สาย × 3 ทรง × 7 ระดับ = 105 แบบ ไม่ซ้ำกัน ไม่โหว่',r['n']==105 and not r['dup'] and not r['thin'],json.dumps(r))
        r=await A.ev("""()=>{const bad=[];let n=0;const sty=c=>wpLkStyle(c);
          for(let i=0;i<120;i++){const it=genItem(10+i%60,'w',i%7,i%7);if(i%9===0)it.u=8;n++;const a=wpStyle(it),bb=sty(lkc(it));if(a!==bb)bad.push([i,a,bb])}
          for(let s=1;s<=6;s++){const it=genItem(60,'w',6,6);it.ss=s;n++;const a=wpStyle(it),bb=sty(lkc(it));if(a!==bb)bad.push(['set'+s,a,bb])}
          const cnt=[0,0,0];for(let i=0;i<120;i++)cnt[wpStyle(genItem(30,'w',2,2))]++;return {n,bad,cnt}}""")
        rep('ทรงไอคอนตรงกับทรงอาวุธที่ตัวละครถือในเกม (126 ชิ้นสุ่ม + ชุดเซ็ต 6) · สุ่มได้ครบ 3 ทรง',not r['bad'] and all(c>10 for c in r['cnt']),json.dumps(r))
        r=await A.ev("""()=>{const it=genItem(60,'w',4,4);const c0=me.cls,o={};for(const k of['melee','archer','mage','sup','assn']){me.cls=k;o[k]=itIcoURL(it,'w')}me.cls=c0;return new Set(Object.values(o)).size}""")
        rep('ชิ้นเดียวกันแต่ละสายอาชีพได้อาวุธคนละแบบ (ดาบ/ธนู/คทา/คทาซัพ/มีด)',r==5,json.dumps(r))
        r=await A.ev("""async()=>{const PX="""+PX+""";const o={set:[],up:[]};for(const cls of['melee','mage','assn']){const S=new Set([itEquipURL('w',6,cls+':0',0,0,0)]);for(let s=1;s<=6;s++){const u=itEquipURL('w',6,cls+':'+(s===5?1:s===4?2:0),s,0,0);o.set.push(!S.has(u));S.add(u)}
          const b0=itEquipURL('w',4,cls+':0',0,0,0),n0=await PX(b0);for(let L=1;L<=3;L++){const u=itEquipURL('w',4,cls+':0',0,L,0);o.up.push([cls,L,u!==b0,(await PX(u))>n0])}}return o}""")
        rep('อาวุธชุดเซ็ต 6 ลาย · ขอบเรืองตีบวก +7/+10/+15',all(r['set']) and all(x[2] and x[3] for x in r['up']),json.dumps(r))
        r=await A.ev("""async()=>{me.bag=[];const mk=(r,ss,u)=>{const it=genItem(60,'w',r,r);if(ss)it.ss=ss;if(u)it.u=u;return it};for(let r=0;r<7;r++)me.bag.push(mk(r));me.bag.push(mk(6,3,0),mk(4,0,10));
          const eq0=me.eq.w;me.eq.w=mk(5,0,7);ov.hidden=false;gearUI();await new Promise(r=>setTimeout(r,60));const cells=[...ov.querySelectorAll('.cell')];
          const bag=cells.filter(c=>(c.dataset.gp||'').startsWith('bag'));const ok=bag.filter(c=>{const i=+c.dataset.gp.split(':')[1],im=c.querySelector('img');return im&&im.getAttribute('src')===itIcoURL(me.bag[i],'w')}).length;
          const eqc=cells.find(c=>c.dataset.gp==='eq:w');const eqOk=!!(eqc&&eqc.querySelector('img')&&eqc.querySelector('img').getAttribute('src')===itIcoURL(me.eq.w,'w'));
          me.eq.w=null;gearUI();await new Promise(r=>setTimeout(r,60));const e2=[...ov.querySelectorAll('.cell')].find(c=>c.dataset.gp==='eq:w');const ghost=!!(e2&&e2.querySelector('img')&&!/⚔/.test(e2.textContent));
          me.eq.w=eq0;gearUI();ov.hidden=true;return {n:bag.length,ok,eqOk,ghost,err:ITI.err}}""")
        rep('หน้าอุปกรณ์: อาวุธทุกชิ้นในกระเป๋า + ช่องที่ใส่ เป็นภาพวาดใหม่ · ไม่ได้ใส่อาวุธ → เงาจาง (ไม่ใช่ ⚔️)',r['n']==9 and r['ok']==9 and r['eqOk'] and r['ghost'] and not r['err'],json.dumps(r,ensure_ascii=False))
        r=await A.ev("""async()=>{const it=genItem(60,'w',5,5);VZ3.show=[];VZ3.showing=0;vz3Show(it);await new Promise(r=>setTimeout(r,120));const t=document.querySelector('#vzs .ic img');const toast=!!t&&t.getAttribute('src')===itIcoURL(it,'w');
          const k=Object.keys(saves.chars)[0],sv=saves.chars[k];sv.eq=sv.eq||{};const w=genItem(60,'w',4,4);sv.eq.w=w;saves.last=k;ov.hidden=false;intro();await new Promise(r=>setTimeout(r,200));
          const imgs=[...ov.querySelectorAll('.cs-eq img')].map(e=>e.getAttribute('src'));const cs=imgs.includes(itIcoURL(w,'w',scls(k)));const noEmo=![...ov.querySelectorAll('.cs-eq > div')].some(d=>/⚔/.test(d.textContent));
          const sb=itSetIco(5,'w');ov.hidden=true;return {toast,cs,noEmo,sb:sb.indexOf('<img')===0}}""")
        rep('ป้ายของดรอป · การ์ดเลือกตัวละคร (อาวุธตามสายของตัวนั้น ไม่ใช่ ⚔️) · ปุ่มตีอาวุธชุดเซ็ต',all(r.values()),json.dumps(r))
        r=await A.ev("""()=>{const o={};const c0=ITI.c;ITI.c={};const it=genItem(60,'w',3,3);me.cls='melee';const old=weaponIcon(it);
          const s0=window.wpSword,s1=window.wpAxe,s2=window.wpSaber;window.wpSword=window.wpAxe=window.wpSaber=function(){throw new Error('x')};ITI.err='';
          o.thr=itIcoH(it,'w').indexOf(old)>0;o.err=!!ITI.err;window.wpSword=s0;window.wpAxe=s1;window.wpSaber=s2;
          WPI.on=0;o.off=itIcoH(it,'w').indexOf(old)>0&&itIcoImg(it,'w',40).indexOf(old)>0;WPI.on=1;ITI.c=c0;ITI.err='';o.back=itIcoH(it,'w').indexOf(itIcoURL(it,'w'))>0;return o}""")
        rep('error / ปิด (WPI.on=0) → กลับไปใช้ไอคอนอาวุธเดิม แล้วกลับมาวาดได้',all(r.values()),json.dumps(r))
        r=await A.ev("""()=>{const c0=ITI.c;ITI.c={};const t0=performance.now();let n=0;for(const cls of['melee','archer','mage','sup','assn'])for(let s=0;s<3;s++)for(const t of[0,3,6]){itEquipURL('w',t,cls+':'+s,0,0,0);n++}const t1=performance.now();ITI.c=c0;return {n,per:(t1-t0)/n}}""")
        rep('สร้างไอคอนอาวุธครั้งแรกเฉลี่ย < 25 ms/ภาพ (แคชหลังจากนั้น)',r['per']<25,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
