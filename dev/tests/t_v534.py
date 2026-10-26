"""v534 จอ PC ใหญ่: ทุกหน้าต่างไม่ล้น · ตอนล้มป้ายอยู่เหนือแถบ/ชื่อ ขนาดตามจอ"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
UIS=['gearUI','treeUI','storyUI','shopUI','msmUI','smithUI','petUI','mountUI','cardUI','eventUI','questUI','partyUI','setUI','rareUI','autoUI','awkUI','darkUI','dungeonUI','mktUI','pvpUI','rxUI','twShopUI','blUI','chSwUI','sklUI','runeUI','wardrobeUI','fishUI','friUI','gdUI','mlUI','wmUI','tentUI','cfgUI','tfUI','tmUI','gtUI','ghUI','rbUI','rdUI','sgUI','pebUI','btyUI','perfUI','cmpUI']
SCAN="""()=>{const vw=innerWidth,vh=innerHeight,out=[];
 const vis=e=>{const cs=getComputedStyle(e);return cs.display!=='none'&&cs.visibility!=='hidden'&&+cs.opacity>0};
 for(const e of document.querySelectorAll('body *')){if(e.closest('canvas,svg,script,style,#cv,#hpor'))continue;if(!vis(e))continue;const r=e.getBoundingClientRect();if(r.width<30||r.height<30)continue;
  let p=e.parentElement,bad='';while(p&&p!==document.body){const cs=getComputedStyle(p);const ov=cs.overflowY;const pr=p.getBoundingClientRect();
    if(/(auto|scroll)/.test(ov)){if(pr.bottom>vh+3||pr.top<-3)bad='scroller-offscreen '+(p.id||p.className);break}
    if(/(hidden|clip)/.test(ov)&&p.id!=='app'&&p.id!=='stage'&&!p.closest('#cv')){if(r.bottom>pr.bottom+20||r.top<pr.top-20)bad='clipped-by '+(p.id?'#'+p.id:String(p.className).slice(0,30));break}
    p=p.parentElement}
  if(!bad&&!p&&(r.bottom>vh+3||r.top<-3||r.right>vw+3))bad='offscreen';
  if(bad)out.push((e.id?'#'+e.id:'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\\s+/).slice(0,2).join('.'):'')+'<'+e.tagName.toLowerCase()+'> '+[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)].join(',')+' '+bad)}
 return [...new Set(out)].slice(0,10)}"""
async def main():
    p=start_server();ok=0;bad=0
    def rep(n,c,d=''):
        nonlocal ok,bad
        if c: ok+=1
        else: bad+=1
        print(('✅' if c else '❌'),n,('' if c else d)[:900],flush=True)
    IGN=('scroller-offscreen tabs','sk2b')
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Bg'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false}");await A.wait(600)
        for vw,vh in [(1920,1080),(2560,1440)]:
            await A.pg.set_viewport_size({'width':vw,'height':vh});await A.wait(500);await A.ev('()=>dispatchEvent(new Event("resize"))');await A.wait(1200)
            badp={}
            for ui in UIS:
                if not await A.ev(f"()=>typeof {ui}==='function'"):continue
                try:await A.ev(f"()=>{{ov.hidden=false;{ui}()}}")
                except Exception as e:continue
                await A.wait(350)
                r=[x for x in await A.ev(SCAN) if not any(k in x for k in IGN)]
                if r:badp[ui]=r[:2]
                await A.ev("()=>{ov.hidden=true}")
            rep(f'{vw}×{vh}: ทุกหน้าต่างไม่ล้นจอ/ไม่โดนตัด (หน้าเกมขยาย uz>1)',not badp,json.dumps(badp,ensure_ascii=False))
            await A.ev("()=>{gmGod=false;me.hp=0;try{die()}catch(e){me.down=5}}");await A.wait(1200)
            d=await A.ev("()=>{const e=document.getElementById('vzd'),r=e.getBoundingClientRect(),cs=getComputedStyle(e),k=(+getComputedStyle(document.documentElement).getPropertyValue('--vk')||1)*(+getComputedStyle(document.documentElement).getPropertyValue('--vuz')||1);return {bot:Math.round(r.bottom),band:Math.round(innerHeight/2-24*k),fs:parseFloat(cs.fontSize),cx:Math.round((r.left+r.right)/2),vw:innerWidth}}")
            rep(f'{vw}×{vh}: ตอนล้ม ป้าย «ล้มลงแล้ว» อยู่เหนือแถบ+ชื่อ · ตัวใหญ่ตามจอ · กึ่งกลาง',d['bot']<d['band']-30 and d['fs']>=30 and abs(d['cx']-d['vw']/2)<4,d)
            await A.ev("()=>{me.down=0;me.hp=me.mh;gmGod=true}");await A.wait(1500)
        er=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error',not er,er[:3])
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
