"""v481 ไล่เช็กแนวนอนทั้งเกม: หน้าแรก · สร้างตัวละครสองคอลัมน์ · ตอนล้ม · แชต · อีโมต · ปุ่มบริบท · หน้าต่าง"""
import asyncio, sys, json, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
Q="""(sels)=>{const o={};for(const s of sels){const e=document.querySelector(s);if(!e){o[s]=null;continue}const cs=getComputedStyle(e);if(e.hidden||cs.display==='none'||cs.visibility==='hidden'){o[s]=null;continue}const r=e.getBoundingClientRect();o[s]=r.width>2?[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]:null}o.vw=innerWidth;o.vh=innerHeight;return o}"""
def ov_(a,b): return a and b and min(a[2],b[2])-max(a[0],b[0])>2 and min(a[3],b[3])-max(a[1],b[1])>2
def inside(a,vw,vh): return a and a[0]>=-1 and a[1]>=-1 and a[2]<=vw+1 and a[3]<=vh+1
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        # ---- หน้าแรก + สร้างตัวละคร (มือถือแนวนอนจอเตี้ย) ----
        ctx=await b.new_context(viewport={'width':788,'height':288},is_mobile=True,has_touch=True,device_scale_factor=2);pg=await ctx.new_page();E=[]
        pg.on('pageerror',lambda e:E.append(str(e)[:300]))
        await pg.goto(URL);await pg.wait_for_timeout(1800)
        t=await pg.evaluate(Q,['#ttl .go','#ttl .lg','#ttl .bg','#ttl .ver'])
        rep('หน้าแรกแนวนอน (v530 ภาพปกกว้างเต็มจอ): โลโก้/ปุ่มเริ่ม/รุ่น อยู่ซ้าย ไม่ล้นจอ ไม่ทับกัน', t['#ttl .bg'][0]<=1 and t['#ttl .bg'][2]>=t['vw']-1 and inside(t['#ttl .go'],t['vw'],t['vh']) and t['#ttl .go'][2]<t['vw']*.5 and t['#ttl .lg'][2]<=t['vw']*.5+1 and not ov_(t['#ttl .go'],t['#ttl .lg']) and not ov_(t['#ttl .go'],t['#ttl .ver']), t)
        await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.click()}");await pg.wait_for_timeout(1500)
        c=await pg.evaluate(Q,['.cs-roster','.cs-side','.cs-stage','.cs-cls','.cs-namebox','.cs-go'])
        rep('สร้างตัวละครแนวนอน (v528): 3 คอลัมน์ (อาชีพซ้าย · เวทีกลาง · ชื่อ/ปุ่มสร้างขวา) เห็นปุ่มสร้างโดยไม่ต้องเลื่อน', c['.cs-roster'] and c['.cs-side'] and c['.cs-cls'][2]<=c['.cs-stage'][0]+2 and c['.cs-stage'][2]<=c['.cs-side'][0]+2 and c['.cs-go'][3]<=c['vh'] and c['.cs-namebox'][1]<c['.cs-go'][1], c)
        await pg.evaluate("()=>{const b=ov.querySelectorAll('.cs-cls button')[2];b.click()}");await pg.wait_for_timeout(700)
        k=await pg.evaluate("()=>({L:getComputedStyle(ov.querySelector('.cs-main')).display==='grid',on:(ov.querySelector('.cs-cls button.on')||{}).textContent||''})")
        await pg.set_viewport_size({'width':390,'height':844});await pg.wait_for_timeout(1000)
        k2=await pg.evaluate("()=>({L:getComputedStyle(ov.querySelector('.cs-main')).display==='grid',order:(()=>{const r=s=>ov.querySelector(s).getBoundingClientRect().top;return [r('.cs-stage')<r('.cs-roster'),r('.cs-roster')<r('.cs-namebox'),r('.cs-namebox')<r('.cs-go')].join('|')})(),on:(ov.querySelector('.cs-cls button.on')||{}).textContent||''})")
        rep('เลือกอาชีพแล้วยัง 3 คอลัมน์ · หมุนกลับแนวตั้ง → คอลัมน์เดียว (เวที → อาชีพ → ชื่อ → ปุ่ม) อาชีพที่เลือกไม่หาย', k['L'] and not k2['L'] and k2['order']=='true|true|true' and k['on']==k2['on'] and k['on'], [k,k2])
        await pg.set_viewport_size({'width':788,'height':288});await pg.wait_for_timeout(800)
        await pg.evaluate(SETUP,['melee','Lx'+str(random.randint(100,999)),70]);await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await pg.wait_for_timeout(600)
        # ---- แชต ----
        await pg.evaluate("()=>{$('cht').click()}");await pg.wait_for_timeout(600)
        c=await pg.evaluate(Q,['#cbar','#u64b','#aud','#hud','#rnq','#rbq'])
        rep('จอเตี้ย: ช่องพิมพ์แชตแถวบน ไม่ทับการ์ดสถานะ/ปุ่มเดินไว/ปุ่มเสียง · ป้ายเควสย่อหลบให้', c['#cbar'] and not any(ov_(c['#cbar'],c[x]) for x in ['#u64b','#aud','#hud']) and c['#rnq'] is None and c['#rbq'] is None and c['#cbar'][1]<60, c)
        await pg.evaluate("()=>{document.activeElement&&document.activeElement.blur();$('cht').click()}");await pg.wait_for_timeout(400)
        # ---- อีโมต ----
        await pg.evaluate("()=>{$('emb').click()}");await pg.wait_for_timeout(500)
        c=await pg.evaluate(Q,['#emp'])
        rep('จอเตี้ย: แผงอีโมตอยู่ในจอทั้งหมด', inside(c['#emp'],c['vw'],c['vh']), c)
        await pg.evaluate("()=>{const e=$('emp');if(e)e.hidden=true}")
        # ---- ปุ่มบริบทซ้อนจากล่างกลาง ----
        await pg.evaluate("()=>{const b=$('npcb'),t=$('tnb');window.__f=setInterval(()=>{b.textContent='คุยกับ ทดสอบ';b.style.display='block';t.hidden=false;t.textContent='⛺ เข้าเต็นท์ของฉัน';chatLog.push({t:'ทดสอบแชต',at:Date.now(),sys:1});try{renderLog()}catch(e){}},20)}");await pg.wait_for_timeout(900)
        c=await pg.evaluate("(Q)=>{const b=$('npcb'),t=$('tnb');b.style.display='block';t.hidden=false;vwCtx();return (new Function('return '+Q))()(['#npcb','#tnb','#clog','#hud','#mn','#evt','#stq','#u64b','#aud'])}",Q)
        bx=await pg.evaluate("()=>{const c=cv.getBoundingClientRect(),k=c.width/W;let L=1e9,T=1e9,Rr=-1e9,B=-1e9;for(const b of $('sk').querySelectorAll('button')){if(b.hidden||getComputedStyle(b).display==='none')continue;const r=b.getBoundingClientRect();if(r.width<4)continue;L=Math.min(L,r.left);T=Math.min(T,r.top);Rr=Math.max(Rr,r.right);B=Math.max(B,r.bottom)}return {sk:[L,T,Rr,B],joy:[c.left+(JB.x-46)*k,c.top+(JB.y-46)*k,c.left+(JB.x+46)*k,c.top+(JB.y+46)*k]}}")
        await pg.evaluate("()=>{clearInterval(window.__f);$('npcb').style.display='none';$('tnb').hidden=true}")
        L=[c['#npcb'],c['#tnb'],c['#clog'],c['#hud'],c['#mn'],c['#evt'],c['#stq'],c['#u64b'],c['#aud'],bx['sk'],bx['joy']]
        bad=[(i,j) for i in range(3) for j in range(i+1,len(L)) if ov_(L[i],L[j])]
        rep('จอเตี้ย: ปุ่มบริบท (คุย NPC + เต็นท์) เรียงซ้อนจากล่างกลางจอ · แชตเลื่อนขึ้นเหนือปุ่ม · ไม่ทับปุ่มอื่น/จอยสติ๊ก', c['#npcb'] and c['#tnb'] and c['#tnb'][3]<=c['#npcb'][1] and c['#clog'] and c['#clog'][3]<=c['#tnb'][1]+1 and not bad and inside(c['#tnb'],c['vw'],c['vh']), {'bad':bad,'c':c})
        # ---- หน้าต่าง ----
        await pg.evaluate("()=>{tb.click()}");await pg.wait_for_timeout(500)
        c=await pg.evaluate(Q,['#ov','#ovx','#ov>.pn'])
        rep('จอเตี้ย: หน้าต่างกว้าง ≥ 720 (v531 หน้าต่างยาวขยายเต็มจอ) อยู่กลางจอ · ปุ่ม ✕ อยู่ในหน้าต่าง', c['#ov'] and 690<=c['#ov'][2]-c['#ov'][0]<=c['vw'] and abs((c['#ov'][0]+c['#ov'][2])/2-c['vw']/2)<=2 and c['#ovx'][2]<=c['#ov'][2] and c['#ovx'][1]>=0, c)
        await pg.evaluate("()=>{$('ovx').click()}");await pg.wait_for_timeout(300)
        # ---- ตอนล้ม ----
        await pg.evaluate("()=>{enterMap(13,{x:CX,y:CY})}");await pg.wait_for_timeout(2500)
        await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner={s:'💥 ทดสอบประกาศระหว่างล้ม',t:9};gmGod=false;me.hp=0}");await pg.wait_for_timeout(2600)
        d=await pg.evaluate("()=>{const c=cv.getBoundingClientRect(),k=c.height/(ZM.on?ZM.h0:H),h=ZM.on?ZM.h0:H,bar=[c.top+(h/2-24)*k,c.top+(h/2+24)*k],q=s=>{const e=$(s);if(!e||e.hidden)return null;const r=e.getBoundingClientRect();return[Math.round(r.top),Math.round(r.bottom)]};return {down:me.down>0,bar:bar.map(Math.round),vzd:q('vzd'),rv:q('rv'),by:bannerY()}}")
        rep('ตอนล้ม (จอเตี้ย): ป้าย «ล้มลงแล้ว…» อยู่เหนือแถบนับถอยหลัง · ปุ่มฟื้นอยู่ใต้แถบ · ซ่อนประกาศที่เคยทับแถบ', d['down'] and d['vzd'] and d['vzd'][1]<=d['bar'][0]+2 and d['rv'] and d['rv'][0]>=d['bar'][1]-2 and d['by']<0, d)
        await pg.evaluate("()=>{gmGod=true;me.down=0;me.hp=me.mh}")
        errs=[e for e in E if 'ERR_TUNNEL' not in e]
        await ctx.close()
        # ---- PC: ตอนล้มก็ไม่ทับ · หน้าแรก ----
        ctx=await b.new_context(viewport={'width':1440,'height':900});pg=await ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        t=await pg.evaluate(Q,['#ttl .go','#ttl .lg','#ttl .bg'])
        rep('PC หน้าแรก (v530 ภาพปกกว้างเต็มจอ): ปุ่มเริ่ม/โลโก้ฝั่งซ้าย', t['#ttl .bg'][0]<=1 and t['#ttl .bg'][2]>=t['vw']-1 and t['#ttl .go'][2]<t['vw']*.5 and t['#ttl .lg'][2]<=t['vw']*.5+1 and not ov_(t['#ttl .go'],t['#ttl .lg']), t)
        await pg.evaluate(SETUP,['melee','Px'+str(random.randint(100,999)),70]);await pg.wait_for_timeout(1200)
        await pg.evaluate("()=>{ov.hidden=true;gmGod=true;enterMap(13,{x:CX,y:CY})}");await pg.wait_for_timeout(2500)
        await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner={s:'💥 ทดสอบ',t:9};gmGod=false;me.hp=0}");await pg.wait_for_timeout(2600)
        d=await pg.evaluate("()=>{const c=cv.getBoundingClientRect(),h=ZM.on?ZM.h0:H,k=c.height/h,bar=[c.top+(h/2-24)*k,c.top+(h/2+24)*k],q=s=>{const e=$(s);if(!e||e.hidden)return null;const r=e.getBoundingClientRect();return[Math.round(r.top),Math.round(r.bottom)]};return {bar:bar.map(Math.round),vzd:q('vzd'),rv:q('rv'),by:bannerY()}}")
        rep('PC ตอนล้ม: ป้ายเหนือแถบ · ปุ่มฟื้นใต้แถบ · ไม่มีประกาศทับ', d['vzd'] and d['vzd'][1]<=d['bar'][0]+2 and d['rv'][0]>=d['bar'][1]-2 and d['by']<0, d)
        await ctx.close()
        # ---- แนวตั้งไม่เปลี่ยน ----
        ctx=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);pg=await ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        t=await pg.evaluate(Q,['#ttl .go','#ttl .bg'])
        rep('มือถือแนวตั้ง: หน้าแรกเหมือนเดิม (โปสเตอร์เต็มจอ)', t['#ttl .bg'][0]<=1 and t['#ttl .bg'][2]>=389 and inside(t['#ttl .go'],390,844), t)
        await ctx.close()
        rep('ไม่มี error', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
