import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
NEW=['god','orn','orn7','wk','bkc','qsh','qnx','rte','b7','eye']
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':720},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','TP'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(3000)
            r=await pg.evaluate("""async(K)=>{const bad=[];for(const k of K)for(const f of['npc-','npcf-']){const x=await fetch(f+k+'.webp',{method:'HEAD'});if(!x.ok)bad.push(f+k)}return bad}""",NEW)
            rep('ไฟล์ภาพครบ 10 ตัว × 2 (ครึ่งตัว + วงกลมหน้า)',r==[],r)
            r=await pg.evaluate("(K)=>K.concat(['lirg','qnt','cel41','b3']).map(k=>[k,npcpKey(k)])",NEW)
            exp=[[k,k] for k in NEW]+[['lirg','lir'],['qnt','qn'],['cel41','cel'],['b3','b3']]
            rep('รหัสคนพูดชี้ภาพถูก (รวมคีย์ย่อย lirg→lir, qnt→qn และของเดิม)',r==exp,r)
            r=await pg.evaluate("""()=>{const src=document.documentElement.outerHTML;const all=new Set();const re=/\\['([a-z][a-z0-9]*)','/g;let m;while((m=re.exec(src)))if(SPK[m[1]])all.add(m[1]);return[...all].filter(k=>k!=='nar'&&k!=='me'&&!npcpKey(k))}""")
            rep('ทุกคนที่มีบทพูดในเกมมีภาพหน้าแล้ว (ยกเว้นผู้บรรยายและตัวเรา)',r==[],r)
            for k in ['god','qnx','eye','lirg','b7']:
                await pg.evaluate("(k)=>{try{let n=0;while(SD.on&&n<80){stNext();n++}stClose()}catch(e){};ov.hidden=true;stSay([[k,'ทดสอบภาพหน้า '+k]])}",k)
                await pg.wait_for_timeout(1600)
                r=await pg.evaluate("""()=>{const b=document.getElementById('sdbust'),p=document.querySelector('#sdlg .sdp img');return{b:b&&b.classList.contains('on')?b.getAttribute('src'):'',bw:b?b.naturalWidth:0,f:p?p.getAttribute('src'):'',fw:p?p.naturalWidth:0}}""")
                want=npk={'lirg':'lir'}.get(k,k)
                if k=='god':await pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/npout/dlg_god.jpg',type='jpeg',quality=85)
                rep(f'บทพูดของ {k}: ภาพครึ่งตัว + วงกลมหน้าขึ้นจริง',r['b']==f'npc-{want}.webp' and r['bw']>100 and r['f']==f'npcf-{want}.webp' and r['fw']==128,r)
            await pg.evaluate("()=>{try{let n=0;while(SD.on&&n<80){stNext();n++}stClose()}catch(e){}}")
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
