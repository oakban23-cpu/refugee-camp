"""v567 ลื่นขึ้นบนมือถือรุ่นกลาง (ภาพ/พฤติกรรมเหมือนเดิม)
   ① มอนฝูงไกลผู้เล่นทุกคนไม่ขยับ · มอนใกล้ยังเดินเตร่ · มอนไกลที่บาดเจ็บยังฟื้นเลือด · ผู้เล่นอื่นที่อยู่ใกล้ (แม้อยู่ในเขตปลอดภัย) ทำให้มอนแถวนั้นขยับ
   ② ทหารยามค่ายยังตีมอนที่เข้ามาใกล้ · ③ กับดักหนามยังทำดาเมจ/ตรึงมอนที่เหยียบ
   ④ พีระมิด/สฟิงซ์ใช้ภาพเก็บ: ภาพในจอใกล้เคียงแบบวาดสด · ลอนทรายวาดชุดเดียว · ⑤ ไม่มี error"""
import asyncio, sys, random, json, io
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image, ImageChops, ImageStat
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Lo' + str(random.randint(100, 999)), 'archer', 99)
        await A.ev("()=>{window.DNH=12;AUTO.on=false;ov.hidden=true;gmGod=true}")
        # ① LOD บนแมพสนาม 2
        await A.ev("()=>{enterMap(2,{x:600,y:600})}"); await A.wait(3500)
        r = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=600;me.y=600;
          const P=mons.filter(m=>m.p&&m.t<3&&!m.nm&&!m.el);const far=P.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>1400),near=P.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)<700);
          const f0=far.map(m=>[m.x,m.y]),n0=near.map(m=>[m.x,m.y]);const wd=far[0];if(wd){wd.mh=1e6;wd.hp=5e5;wd.rg=1}const h0=wd?wd.hp:0;
          await w(4000);const fm=far.filter((m,i)=>Math.hypot(m.x-f0[i][0],m.y-f0[i][1])>1).length-(wd?1:0),nm=near.filter((m,i)=>Math.hypot(m.x-n0[i][0],m.y-n0[i][1])>1).length;
          return {far:far.length,near:near.length,farMoved:fm,nearMoved:nm,regen:wd?Math.round(wd.hp-h0):-1}}""")
        rep('มอนฝูงไกลผู้เล่นทุกคนหยุดคิดการเดินเตร่ · มอนใกล้ยังเดินเตร่ · มอนไกลที่บาดเจ็บยังฟื้นเลือด', r['far'] >= 5 and r['farMoved'] <= max(1, r['far'] // 50) and r['near'] >= 3 and r['nearMoved'] >= 1 and r['regen'] > 0, r)
        o = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const P=mons.filter(m=>m.p&&m.t<3&&!m.nm&&!m.el&&Math.hypot(m.x-me.x,m.y-me.y)>1400);const m=P[0];if(!m)return null;
          const u='lodfake';others[u]={u,n:'x',cls:'mage',lv:99,x:m.x+60,y:m.y+40,hp:0,mh:100,sl:0};const x0=m.x,y0=m.y;
          let mv=0;for(let i=0;i<8&&!mv;i++){await w(500);if(Math.hypot(m.x-x0,m.y-y0)>1)mv=1}delete others[u];return {mv,allp:!!(room&&room.allPlayers)}}""")
        rep('ผู้เล่นอื่นอยู่ใกล้มอนไกล (แม้ล้มอยู่) → มอนแถวนั้นกลับมาขยับ', o and (o['mv'] == 1 or o['allp']), o)
        # ③ กับดักหนาม
        s = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));if(!PRP||!PRP.s.length)return null;const t=PRP.s[0];t.cd=0;const m=mons.find(q=>q.t<3&&!q.pv&&!q.fly);if(!m)return null;
          m.x=t.x+5;m.y=t.y+3;m.mh=1e6;m.hp=1e6;m.tt=0;const h0=m.hp;await w(400);return {d:Math.round(h0-m.hp),root:m.root>0,cd:t.cd>performance.now()}}""")
        rep('กับดักหนามยังทำดาเมจและตรึงมอนที่เหยียบ (ตรวจทุก 0.1 วิ)', s and s['d'] > 0 and s['root'] and s['cd'], s)
        # ② ทหารยามค่าย
        await A.ev("()=>{enterMap(1,{x:CX,y:CY+60})}"); await A.wait(3000)
        gq = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const q=guards.find(q=>!q.ar&&q.dead<=0)||guards[0];if(!q)return null;mons=mons.filter(m=>m.t>=3);
          spawnPack&&0;const m={id:++mid,x:q.x+90,y:q.y,tx:q.x+90,ty:q.y,t:0,L:5,p:0,hx:q.x+90,hy:q.y,hp:5e4,mh:5e4,tg:null,tt:0,ac:9,w:null,lg:0};mons.push(m);await w(3500);return {d:Math.round(5e4-m.hp),n:guards.length}}""")
        rep('ทหารยามค่ายยังเข้าตีมอนที่มาใกล้ (หาเป้าทุก 0.25 วิ)', gq and gq['d'] > 0, gq)
        # ④ พีระมิด: ภาพเก็บ vs วาดสด
        await A.ev("()=>{enterMap(8,{x:CX,y:CY})}"); await A.wait(3000)
        await A.ev("()=>{const B=MAPS[8].boss;me.x=B.x+40;me.y=B.y-120;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>900);AUTO.on=false;window.__frz=1}")
        await A.wait(1500)
        shots = []
        for off in (1, 0):
            await A.ev(f"()=>{{window.NGS_OFF={off};ov.hidden=true;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>900);fxs.length=0;banner=null}}"); await A.wait(700)
            shots.append(Image.open(io.BytesIO(await A.pg.screenshot(clip={'x': 20, 'y': 120, 'width': 350, 'height': 380}))).convert('RGB'))
        diff = ImageChops.difference(shots[0], shots[1]); st = ImageStat.Stat(diff); mean = sum(st.mean) / 3
        big = sum(1 for px in diff.getdata() if max(px) > 60) / (350 * 380)
        k = await A.ev("()=>[...NGS.keys()]")
        Image.fromarray if False else None
        sheet = Image.new('RGB', (710, 380)); sheet.paste(shots[0], (0, 0)); sheet.paste(shots[1], (360, 0)); sheet.save('np/v567_pyr.jpg', quality=85)
        rep('พีระมิด/สฟิงซ์จากภาพเก็บใกล้เคียงวาดสด (ต่างเฉลี่ยต่อพิกเซลต่ำ · จุดต่างแรงน้อยมาก)', mean < 6 and big < .03 and any(x.startswith('pyr') for x in k), {'mean': round(mean, 2), 'bigFrac': round(big, 4), 'keys': k})
        E = [e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
