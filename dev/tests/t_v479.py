"""v479 เล่นได้ทั้งแนวตั้ง/แนวนอน · มือถือ แท็บเล็ต PC (ux83.js + server รัศมีตามจอ)"""
import asyncio, sys, json, math, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
ST="""()=>{const r=cv.getBoundingClientRect(),a=$('app'),rt=$('rot');return {on:VW.on,sh:VW.sh,uz:VW.uz,W,SW0,H:ZM.on?ZM.h0:H,DPR,cw:cv.width,ch:cv.height,
  r:[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)],tf:a.style.transform,aw:a.style.width,cvw:cv.style.width,
  rot:rt?getComputedStyle(rt).display:'none',body:document.body.className,vr:vwVR(),iw:innerWidth,ih:innerHeight}}"""
# กล่องของปุ่ม/แผงหลักที่ต้องไม่ทับกัน (พิกัดจอจริง)
BOX="""()=>{const o={};const add=(k,e)=>{if(!e||e.hidden)return;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return;const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return;o[k]=[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]};
  for(const id of['hud','mn','evt','cht','emb','stq','bfb','aud','rnq','rbq','fvg','u64b','tmh','ptyhud','rdb'])add(id,$(id));
  const sk=$('sk');if(sk){let L=1e9,T=1e9,Rr=-1e9,B=-1e9;for(const b of sk.querySelectorAll('button')){if(b.hidden||getComputedStyle(b).display==='none')continue;const r=b.getBoundingClientRect();if(r.width<4)continue;L=Math.min(L,r.left);T=Math.min(T,r.top);Rr=Math.max(Rr,r.right);B=Math.max(B,r.bottom)}if(Rr>L)o.sk=[Math.round(L),Math.round(T),Math.round(Rr),Math.round(B)]}
  const c=cv.getBoundingClientRect(),k=c.width/W,jx=c.left+JB.x*k,jy=c.top+JB.y*k,jr=46*k;o.joy=[Math.round(jx-jr),Math.round(jy-jr),Math.round(jx+jr),Math.round(jy+jr)];
  const R=40,mx=c.left+(W-R-8)*k,my=c.top+(R+20)*k,mr=(R+6)*k;o.mini=[Math.round(mx-mr),Math.round(my-mr-6*k),Math.round(mx+mr),Math.round(my+mr)];
  try{if(U61.p>0){const sx=(VW.on&&VW.sh)?vwStyX():14,sy=u61Y(),kk=c.width/SW0;o.sty=[Math.round(c.left+sx*kk),Math.round(c.top+sy*kk),Math.round(c.left+(sx+62)*kk),Math.round(c.top+(sy+58)*kk)]}}catch(e){}
  return {o,vw:innerWidth,vh:innerHeight,W,H,k:VW.k}}"""
def overlaps(b):
    o=b['o'];bad=[];ks=list(o)
    for i in range(len(ks)):
        for j in range(i+1,len(ks)):
            a,c=o[ks[i]],o[ks[j]]
            if ks[i]=='hud' and ks[j] in('mn',):continue
            ix=min(a[2],c[2])-max(a[0],c[0]);iy=min(a[3],c[3])-max(a[1],c[1])
            if ix>3 and iy>3: bad.append((ks[i],ks[j],round(ix),round(iy)))
    out=[k for k,v in o.items() if v[0]<-2 or v[1]<-2 or v[2]>b['vw']+2 or v[3]>b['vh']+2]
    return bad,out
PTC="""()=>{const r=cv.getBoundingClientRect();const p=pt({clientX:r.left+r.width/2,clientY:r.top+r.height/2}),q=pt({clientX:r.left+r.width*.25,clientY:r.top+r.height*.75});return [Math.round(p.x),Math.round(p.y),Math.round(q.x),Math.round(q.y),W,H]}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        # ================= มือถือ: แนวตั้ง → หมุนเป็นแนวนอน → หมุนกลับ =================
        A=await new_client(b,'Ph'+str(random.randint(100,999)),'melee',60)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(600)
        s=await A.ev(ST)
        rep('มือถือแนวตั้ง: ใช้ผังเดิม (สนามกว้าง 360 · ไม่มีโหมดจอกว้าง)', s['on']==0 and s['W']==360 and s['SW0']==360 and 520<=s['H']<=900 and 'vw' not in s['body'].split() and s['rot']=='none', s)
        await A.pg.set_viewport_size({'width':844,'height':390});await A.wait(900)
        s=await A.ev(ST)
        rep('หมุนเป็นแนวนอนกลางเกม: สลับเป็นจอกว้างทันที · สนามเต็มจอ · ไม่ขึ้นเตือนให้หมุนจอ', s['on']==1 and s['sh']==1 and s['SW0']>=900 and 400<=s['H']<=480 and abs(s['r'][2]-844)<=2 and abs(s['r'][3]-390)<=2 and s['rot']=='none' and s['DPR']<=1.5 and abs(s['cw']-math.floor(s['W']*s['DPR']))<=2, s)
        bx=await A.ev(BOX);bad,out=overlaps(bx)
        rep('มือถือแนวนอน: ปุ่ม/การ์ด/จอยสติ๊กไม่ทับกันและอยู่ในจอ', not bad and not out and 'joy' in bx['o'] and 'sk' in bx['o'], {'bad':bad,'out':out,'keys':list(bx['o'])})
        r=await A.ev(PTC)
        # จอเตี้ยมาก (มือถือ Android แนวนอน มีแถบที่อยู่เว็บ ~788×288): เกจคลั่ง · ปุ่มเดินไวในค่าย · แรงค์สไตล์ · ปาร์ตี้
        await A.pg.set_viewport_size({'width':788,'height':288});await A.wait(900)
        await A.ev("()=>{window.__fv=setInterval(()=>{try{FV.g=Math.max(FV.g,41);fvHud();U61.p=Math.max(U61.p,120);U61.r=Math.max(U61.r,1);U61.act=performance.now()}catch(e){}},100)}");await A.wait(900)
        bx=await A.ev(BOX);bad,out=overlaps(bx)
        rep('จอเตี้ยมาก 788×288 (ในค่าย): เกจคลั่ง/ปุ่มเดินไว/ปุ่มเสียง/แผนที่เล็ก/ปุ่มสกิล/แรงค์สไตล์/การ์ดเควส/จอยไม่ทับกัน', not bad and not out and all(k in bx['o'] for k in ('fvg','u64b','sk','joy','sty','aud')), {'bad':bad,'out':out,'keys':list(bx['o'])})
        await A.ev("""()=>{tmGive(2,'t');const T=tmSt();const o=T.L[T.L.length-1];T.a=o.id;const t=Date.now()+9e8;
          PTY={id:'zz',lead:uid,mem:[{u:uid,n:myName,hp:1,mh:1,mp:o.mp,s:t,cls:me.cls,lv:60},{u:'a1',n:'เพื่อนหนึ่ง',hp:50,mh:100,mp:o.mp,s:t,cls:'mage',lv:60},{u:'a2',n:'เพื่อนสอง',hp:90,mh:100,mp:o.mp,s:t,cls:'archer',lv:60},{u:'a3',n:'เพื่อนสาม',hp:20,mh:100,mp:o.mp,s:t,cls:'melee',lv:60}]};enterMap(o.mp,{x:CX,y:CY})}""")
        await A.wait(2500);await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};for(const m of mons)m.x=-9999}");await A.wait(1000)
        bx=await A.ev(BOX);bad,out=overlaps(bx)
        rep('จอเตี้ยมาก 788×288 (แมพสนาม + ปาร์ตี้ + ติดตามแผนที่สมบัติ): ไม่ทับกัน', not bad and not out and all(k in bx['o'] for k in ('ptyhud','tmh','fvg','sk','joy')), {'bad':bad,'out':out,'keys':list(bx['o'])})
        await A.ev("()=>{PTY=null;clearInterval(window.__fv)}")
        await A.pg.set_viewport_size({'width':844,'height':390});await A.wait(900)
        rep('แตะจอแนวนอน: พิกัดแตะตรงกับสนาม (กลางจอ = กลางสนาม)', abs(r[0]-r[4]/2)<=2 and abs(r[1]-r[5]/2)<=2 and abs(r[2]-r[4]*.25)<=2 and abs(r[3]-r[5]*.75)<=2, r)
        # เมนูเต็มความสูงจอเตี้ย
        await A.ev("()=>{try{menuToggle(true)}catch(e){$('mn').click()}}");await A.wait(500)
        m=await A.ev("()=>{const e=$('mnp'),r=e.getBoundingClientRect();return [!e.hidden,Math.round(r.top),Math.round(r.bottom),Math.round(r.left),Math.round(r.right),innerHeight,innerWidth]}")
        await A.ev("()=>{try{menuToggle(false)}catch(e){$('mnp').hidden=true}}")
        rep('มือถือแนวนอน: เมนูใช้ความสูงเกือบเต็มจอ อยู่กลางจอ', m[0] and m[1]<=12 and m[2]>=m[5]-12 and abs((m[3]+m[4])/2-m[6]/2)<=3 and m[4]-m[3]<=601, m)
        await A.pg.set_viewport_size({'width':390,'height':844});await A.wait(900)
        s=await A.ev(ST)
        rep('หมุนกลับแนวตั้ง: กลับผังเดิม (360 · ล้างสไตล์จอกว้าง)', s['on']==0 and s['W']==360 and s['SW0']==360 and 520<=s['H']<=900 and s['tf']=='' and s['aw']=='' and s['cvw']=='' and 'vws' not in s['body'] and s['r'][2]<=420, s)
        A.errs=[e for e in A.errs]
        await A.ctx.close()
        # ================= PC 1440×900 → Full HD → หน้าต่างแคบ =================
        ctx=await b.new_context(viewport={'width':1440,'height':900});pg=await ctx.new_page();P=Client(ctx,pg,'pc')
        pg.on('pageerror',lambda e:P.errs.append((e.stack or str(e))[:400]))
        await pg.goto(URL);await pg.wait_for_timeout(1800)
        await P.ev(SETUP,['melee','Pc'+str(random.randint(100,999)),60]);await P.wait(1800)
        await P.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await P.wait(600)
        s=await P.ev(ST)
        rep('PC 1440×900: สนามเต็มจอ เห็นโลกไม่เกิน 1040×620 · ภาพคม (ความละเอียดแคนวาสตามสเกล)', s['on']==1 and s['sh']==0 and s['uz']==1 and s['W']<=1040 and s['H']<=660 and abs(s['r'][2]-1440)<=2 and abs(s['r'][3]-900)<=2 and 1.4<=s['DPR']<=1.5 and s['cw']>=1400, s)
        bx=await P.ev(BOX);bad,out=overlaps(bx)
        rep('PC: ปุ่ม/การ์ด/จอยสติ๊กไม่ทับกัน', not bad and not out, {'bad':bad,'out':out})
        await P.wait(1500)
        vr=await P.ev("()=>[window.lastPres&&lastPres.vr,vwVR()]")
        rep('ส่งรัศมีที่จอเห็น (vr) ไปกับ presence', vr[0] and 600<=vr[0]<=800 and vr[0]==vr[1], vr)
        await P.ev("()=>btyUI()");await P.wait(500)
        o=await P.ev("()=>{const r=ov.getBoundingClientRect(),x=$('ovx').getBoundingClientRect(),bd=$('vwbd');return [Math.round(r.left),Math.round(r.right),Math.round(x.left),Math.round(x.right),bd?getComputedStyle(bd).display:'',innerWidth]}")
        rep('PC: หน้าต่าง (ค่าหัว) อยู่กลางจอ กว้าง ≤600 · ปุ่ม ✕ อยู่ในหน้าต่าง · พื้นหลังมืด', o[1]-o[0]<=601 and abs((o[0]+o[1])/2-o[5]/2)<=2 and o[0]<o[2] and o[3]<=o[1] and o[4]=='block', o)
        await pg.mouse.click(120,450);await P.wait(400)
        h=await P.ev("()=>[ov.hidden,Math.round(me.x),Math.round(me.y)]")
        rep('PC: คลิกนอกหน้าต่าง = ปิดหน้าต่าง (ไม่เดินไปที่คลิก)', h[0]==True, h)
        await pg.set_viewport_size({'width':1920,'height':1080});await P.wait(900)
        s=await P.ev(ST)
        hd=await P.ev("()=>{const r=$('hud').getBoundingClientRect(),m=$('mn').getBoundingClientRect();return [Math.round(r.width),Math.round(m.width)]}")
        r=await P.ev(PTC)
        rep('Full HD: ขยายปุ่ม/แผงตามจอ (uz) · สนามเต็มจอ · แตะ/คลิกตรงพิกัด', s['uz']>1.2 and 'scale' in s['tf'] and abs(s['r'][2]-1920)<=2 and abs(s['r'][3]-1080)<=2 and hd[0]>=260 and abs(r[0]-r[4]/2)<=2 and abs(r[1]-r[5]/2)<=2 and abs(r[2]-r[4]*.25)<=2, [s,hd,r])
        bx=await P.ev(BOX);bad,out=overlaps(bx)
        rep('Full HD: ปุ่ม/การ์ดไม่ทับกัน', not bad and not out, {'bad':bad,'out':out})
        await P.ev("()=>btyUI()");await P.wait(500)
        o=await P.ev("()=>{const r=ov.getBoundingClientRect();return [Math.round(r.left),Math.round(r.right),innerWidth]}")
        await P.ev("()=>{$('ovx').click()}")
        rep('Full HD: หน้าต่างกลางจอ (ขยายตาม uz)', abs((o[0]+o[1])/2-o[2]/2)<=3 and 700<=o[1]-o[0]<=820, o)
        # คีย์บอร์ดเด้งตอนพิมพ์แชต (จอเตี้ยลงชั่วคราว): สนามไม่ย่อ
        await pg.set_viewport_size({'width':1440,'height':900});await P.wait(800)
        s0=await P.ev(ST)
        await P.ev("()=>{$('cht').click();const i=document.querySelector('#cbar input');if(i)i.focus();return !!i}");await P.wait(300)
        await pg.set_viewport_size({'width':1440,'height':520});await P.wait(800)
        s1=await P.ev(ST)
        await P.ev("()=>{document.activeElement&&document.activeElement.blur()}");await pg.set_viewport_size({'width':1440,'height':900});await P.wait(800)
        s2=await P.ev(ST)
        rep('พิมพ์แชตแล้วคีย์บอร์ดเด้ง: สนามไม่ย่อ · ปิดคีย์บอร์ดแล้วกลับปกติ', s1['W']==s0['W'] and s1['H']==s0['H'] and s2['W']==s0['W'] and s2['H']==s0['H'], [s0['W'],s0['H'],s1['W'],s1['H'],s2['W'],s2['H']])
        await pg.set_viewport_size({'width':520,'height':860});await P.wait(900)
        s=await P.ev(ST)
        rep('ย่อหน้าต่างให้แคบ (≤560px): กลับผังคอลัมน์เดิม', s['on']==0 and s['W']==360 and s['tf']=='' and s['cvw']=='', s)
        await pg.set_viewport_size({'width':1180,'height':820});await P.wait(900)
        s=await P.ev(ST)
        rep('ขยายกลับเป็นแท็บเล็ตแนวนอน 1180×820: จอกว้างอีกครั้ง', s['on']==1 and abs(s['r'][2]-1180)<=2 and abs(s['r'][3]-820)<=2, s)
        perr=[e for e in P.errs]
        await ctx.close()
        # ================= รัศมีเซิร์ฟเวอร์ตามจอ: โฮสต์ + มือถือแนวตั้ง + จอกว้าง =================
        H_=await new_client(b,'Hs'+str(random.randint(100,999)),'melee',60)
        await H_.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(13,{x:1600,y:1600})}");await H_.wait(2500)
        Pp=await new_client(b,'Pp'+str(random.randint(100,999)),'mage',60)
        ctx2=await b.new_context(viewport={'width':1440,'height':900});pg2=await ctx2.new_page();L=Client(ctx2,pg2,'wide')
        pg2.on('pageerror',lambda e:L.errs.append((e.stack or str(e))[:400]))
        await pg2.goto(URL);await pg2.wait_for_timeout(1800);await L.ev(SETUP,['archer','Wd'+str(random.randint(100,999)),60]);await L.wait(1500)
        for c in (Pp,L): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(13,{x:1600,y:1600})}")
        await L.wait(3000)
        for c in (H_,Pp,L): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;AUTO.on=false;window.__fxk=[];handleFx=(f=>function(o){try{if(o&&o.k)__fxk.push(o.k+'@'+Math.round(o.x||0))}catch(e){}return f.apply(this,arguments)})(handleFx)}")
        hs=[await c.ev("()=>isHost()") for c in (H_,Pp,L)]
        rep('ตั้งโฮสต์: เครื่องแรกเป็นโฮสต์', hs[0] and not hs[1] and not hs[2], hs)
        await H_.ev("""()=>{me.x=1600;me.y=1250;setInterval(()=>{fillT=1e9;sp=1e9;bossCd=1e9;mons=mons.filter(m=>m.__t);for(const m of mons){m.x=m.tx=m.__t[0];m.y=m.ty=m.__t[1];m.hp=m.mh}},50);
          const mk=(dx,dy)=>{const x=1600+dx,y=1600+dy,m={id:++mid,x,y,tx:x,ty:y,t:0,L:20,p:1,hx:x,hy:y,hp:1e7,mh:1e7,tg:null,tt:0,ac:0,w:null,lg:0,__t:[x,y]};mons.push(m);return m.id};
          mons=[];window.__near=mk(300,0);window.__far=mk(620,0);return [__near,__far]}""")
        for c in (Pp,L): await c.ev("()=>{me.x=1600;me.y=1600;setInterval(()=>{me.x=1600;me.y=1600},50)}")
        await L.wait(2500)
        ids=await H_.ev("()=>[__near,__far,mons.length]")
        sp=await Pp.ev(f"()=>[mons.some(m=>m.id==={ids[0]}),mons.some(m=>m.id==={ids[1]})]")
        sl=await L.ev(f"()=>[mons.some(m=>m.id==={ids[0]}),mons.some(m=>m.id==={ids[1]})]")
        rep('มอนห่าง 620: จอกว้างเห็น (รัศมีตามจอ) · มือถือแนวตั้งไม่ได้รับ (480 เท่าเดิม) · ใกล้ 300 เห็นทั้งคู่', sp==[True,False] and sl==[True,True], [ids,sp,sl])
        await H_.ev("()=>{fx({k:'tmgl',x:2220,y:1600})}");await L.wait(800)
        fp=await Pp.ev("()=>__fxk.filter(k=>k.startsWith('tmgl@'))");fl=await L.ev("()=>__fxk.filter(k=>k.startsWith('tmgl@'))")
        rep('เอฟเฟกต์ห่าง 620: จอกว้างได้รับ · แนวตั้งไม่ได้รับ (520 เท่าเดิม)', fl and not fp, [fp,fl])
        await H_.ev("()=>{me.x=2260;me.y=1600;setInterval(()=>{me.x=2260;me.y=1600},50)}");await L.wait(2000)
        for _ in range(16):
            pp=await Pp.ev(f"()=>!!others['{H_.uid}']");pl=await L.ev(f"()=>!!others['{H_.uid}']")
            if pl and not pp: break
            await L.wait(400)
        rep('ผู้เล่นห่าง 660: จอกว้างเห็น · แนวตั้งไม่เห็น (650 เท่าเดิม)', pl and not pp, [pp,pl])
        errs=[]
        F_=lambda L_:[e for e in L_ if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        for c in (H_,Pp,L): errs+=F_(c.errs)
        perr=F_(perr);A.errs=F_(A.errs)
        rep('ไม่มี error ทุกเครื่อง', not errs and not perr and not A.errs, (errs+perr+A.errs)[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
