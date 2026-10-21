import asyncio,sys,json,os,random
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
ALLV=[('ph',788,288,1),('pc',1440,900,0),('pm',844,390,1)]
VPS=[v for v in ALLV if v[0] in os.environ.get('VPS','ph,pc').split(',')]
SFX=os.environ.get('SFX','')
OUT=os.environ.get('OUT','shots')
MENU=['tb','gb','cdm','rxm','mtm','ptm','qb','dgm','wmm','byb','tmb','pb','frb','gdb','mlb','ivm','fsm','gtm','gqb','aum','wnb']
CLOSE="()=>{try{if(!ov.hidden)$('ovx').click()}catch(e){};try{ov.hidden=true}catch(e){};try{menuToggle(false)}catch(e){};try{const w=$('wnp');if(w)w.hidden=true}catch(e){};try{const p=$('emp');if(p)p.hidden=true}catch(e){}}"
CLR="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};try{if(CZ.on)czSkip()}catch(e){};ov.hidden=true;try{PALG.title=null;PALG.card=null}catch(e){}}"
MAPS_=[('city',"enterMap(9,{x:CX,y:CY})",3500),('garden',"enterMap(28,{x:1600,y:2860})",3500),('field13',"enterMap(13,{x:CX,y:CY})",3000),('snow4',"enterMap(4,{x:CX,y:CY})",3000),
       ('sunk6',"enterMap(6,{x:CX,y:CY})",3000),('sand8',"enterMap(8,{x:CX,y:CY})",3000),('throne29',"enterMap(29,{x:1600,y:2400})",3500),('guild',"ghEnter()",3500),('tent',"tentHome()",3000),
       ('wboss',"wbEnter()",3500),('cas',"casEnter();setTimeout(()=>{try{dgStart()}catch(e){}},2200)",6000),('tower',"enterMap(1,{x:CX,y:CY});setTimeout(()=>{try{twEnterUI()}catch(e){}},1500)",2800)]
async def shot(pg,nm,k):
    os.makedirs(OUT,exist_ok=True);await pg.screenshot(path=f'{OUT}/{nm}_{k}{SFX}.png')
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h,mob in VPS:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(mob),device_scale_factor=2 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1800)
            await shot(pg,nm,'00title')
            try:
                await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.click()}");await pg.wait_for_timeout(1500);await shot(pg,nm,'01create')
            except Exception as ex: print('create',ex)
            await pg.evaluate(SETUP,['melee','A'+nm+str(random.randint(10,99)),99]);await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;me.gold=3.6e8;try{$('tipc').remove()}catch(e){}}")
            await pg.evaluate(CLR);await pg.wait_for_timeout(800)
            await shot(pg,nm,'02camp')
            await pg.evaluate("()=>{try{menuToggle(true)}catch(e){$('mn').click()}}");await pg.wait_for_timeout(600);await shot(pg,nm,'03menu');await pg.evaluate(CLOSE)
            for i,mid in enumerate(MENU):
                try:
                    await pg.evaluate(f"()=>{{try{{menuToggle(true)}}catch(e){{}};const b=$('{mid}');if(b)b.click()}}");await pg.wait_for_timeout(900)
                    await shot(pg,nm,'m%02d_%s'%(i,mid))
                except Exception as ex: print(nm,mid,'ERR',str(ex)[:120])
                await pg.evaluate(CLOSE);await pg.wait_for_timeout(250)
            for k,js in [('chat',"$('cht').click()"),('emote',"$('emb').click()"),('event',"$('evt').click()")]:
                try:
                    await pg.evaluate("()=>{"+js+"}");await pg.wait_for_timeout(700);await shot(pg,nm,'u_'+k)
                except Exception as ex: print(nm,k,'ERR',str(ex)[:120])
                await pg.evaluate(CLOSE);await pg.evaluate("()=>{try{document.activeElement&&document.activeElement.blur();const c=$('cbar');if(c&&!c.hidden)$('cht').click()}catch(e){}}");await pg.wait_for_timeout(300)
            try:
                await pg.evaluate("()=>{const k=Object.keys(CZDEF)[0];czReplay(k)}");await pg.wait_for_timeout(2600);await shot(pg,nm,'u_story')
                await pg.evaluate("()=>{try{stNext()}catch(e){}}");await pg.wait_for_timeout(1500);await shot(pg,nm,'u_story2')
            except Exception as ex: print(nm,'story ERR',str(ex)[:120])
            await pg.evaluate(CLR);await pg.wait_for_timeout(500)
            for k,js,ms in MAPS_:
                try:
                    await pg.evaluate(CLOSE);await pg.evaluate("()=>{"+js+"}");await pg.wait_for_timeout(ms)
                    await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};try{if(CZ.on)czSkip()}catch(e){};try{PALG.title=null}catch(e){}}");await pg.wait_for_timeout(900)
                    await shot(pg,nm,'map_'+k)
                except Exception as ex: print(nm,k,'ERR',str(ex)[:120])
            # ตาย
            try:
                await pg.evaluate(CLOSE);await pg.evaluate("()=>{enterMap(13,{x:CX,y:CY})}");await pg.wait_for_timeout(2500);await pg.evaluate(CLR)
                await pg.evaluate("()=>{gmGod=false;me.hp=0}");await pg.wait_for_timeout(2500);await shot(pg,nm,'z_dead')
            except Exception as ex: print(nm,'dead ERR',str(ex)[:120])
            print(nm,'errs',E[:4],flush=True)
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
