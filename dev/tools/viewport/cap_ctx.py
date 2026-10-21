import asyncio,sys,json,os,random
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
exec(open('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v479/cap_short.py').read().split('async def main')[0].split('SFX=')[1].split('\n',1)[1])
VPS=[('ph',788,288,1),('pm',844,390,1),('pc',1440,900,0),('pp',390,844,1)]
OUT='ctx'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h,mob in VPS:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(mob),device_scale_factor=2 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.evaluate(SETUP,['melee','C'+nm+str(random.randint(10,99)),99]);await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
            os.makedirs(OUT,exist_ok=True)
            # ปุ่มเต็นท์ + คุย NPC (ยืนข้าง NPC ในค่าย) — หา NPC ที่ใกล้สุดแล้ววาร์ปไปใกล้ ๆ
            for k,js in [('npc',"()=>{const L=(typeof CAMP!=='undefined'&&CAMP.npcs)||[];let n=null;try{n=Object.values(STNPC||{}).find(v=>v[0]===1)}catch(e){};const b=$('npcb');b.textContent='คุยกับ ทดสอบ';b.style.display='block';const t=$('tnb');t.hidden=false;t.textContent='⛺ เข้าเต็นท์ของฉัน';window.__f=setInterval(()=>{b.style.display='block';t.hidden=false;t.textContent='⛺ เข้าเต็นท์ของฉัน'},30)}"),
                         ('chat',"()=>{clearInterval(window.__f);$('npcb').style.display='none';$('tnb').hidden=true;$('cht').click()}")]:
                await pg.evaluate(js);await pg.wait_for_timeout(700)
                bx=await pg.evaluate(BOX.replace("'ptyhud','rdb']","'ptyhud','rdb','npcb','tnb','cbar','clog']"))
                bad,out=overlaps(bx)
                print(nm,k,'bad',bad,'out',out,json.dumps({x:bx['o'].get(x) for x in ['npcb','tnb','cbar','clog','u64b']}),flush=True)
                await pg.screenshot(path=f'{OUT}/{nm}_{k}.png')
            await pg.evaluate("()=>{try{document.activeElement.blur();$('cht').click()}catch(e){}}")
            await pg.evaluate("()=>{enterMap(13,{x:CX,y:CY})}");await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner={s:'💥 ร่างอสูรคลั่ง! ดาเมจ +35% · ดูดเลือด +15% · 8 วิ',t:9};gmGod=false;me.hp=0}");await pg.wait_for_timeout(2500)
            await pg.screenshot(path=f'{OUT}/{nm}_dead.png')
            print(nm,'errs',E[:3])
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
