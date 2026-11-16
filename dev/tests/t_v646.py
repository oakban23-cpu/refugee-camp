import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
SHOT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/cpack/'
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':412,'height':915},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','T46'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(4000)
            r=await pg.evaluate("()=>[HDC.n,CIDS.length,!!HDC.b,HDC.err]")
            rep('โหลดภาพการ์ดวาดครบ 16 ใบ + หลังการ์ด',r[0]==r[1]==16 and r[2] and r[3]=='',r)
            r=await pg.evaluate("""async()=>{const out=[];for(const id of ['mum','shd','aze']){delete _cImg[id];const u=cardImg(id),im=new Image();im.src=u;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
              const d=x.getImageData(0,Math.round(im.height*.84),im.width,Math.round(im.height*.064)).data;let br=0;for(let i=0;i<d.length;i+=4)if(d[i]>215&&d[i+1]>195)br++;
              const corner=x.getImageData(1,1,1,1).data[3];out.push([id,im.width,im.height,u.slice(0,15),br,corner])}return out}""")
            rep('การ์ดใหม่ 288×384 · มีชื่อเขียนบนป้ายชื่อ · มุมนอกกรอบใส',all(o[1]==288 and o[2]==384 and o[4]>150 and o[5]<30 for o in r),r)
            await pg.evaluate("()=>{me.cards={};CIDS.forEach(id=>me.cards[id]=12);me.cslot=['wtu','whp'];me.cmv='phr';cardRecalc();cardUI()}");await pg.wait_for_timeout(800)
            r=await pg.evaluate("()=>{const ims=[...ov.querySelectorAll('img')].filter(i=>/^data:image/.test(i.getAttribute('src')||''));return[ims.length,ims.filter(i=>i.classList.contains('cmvp')).length,ims.filter(i=>i.naturalWidth===288).length]}")
            rep('หน้าสมุดการ์ดใช้การ์ดใหม่ทุกใบ + การ์ด MVP เปล่งประกาย',r[2]>=19 and r[1]>=3,r)
            await pg.screenshot(path=SHOT+'ui_cards.jpg',type='jpeg',quality=85)
            await pg.evaluate("()=>{const e=ov.querySelectorAll('img');if(e[8])e[8].scrollIntoView({block:'center'})}");await pg.wait_for_timeout(300);await pg.screenshot(path=SHOT+'ui_cards2.jpg',type='jpeg',quality=85)
            r=await pg.evaluate("""()=>{const G0=g,c=document.createElement('canvas');c.width=c.height=80;const x=c.getContext('2d');g=x;const res=[];
              try{for(const now of [0.0,1.3]){x.setTransform(2,0,0,2,0,0);x.clearRect(0,0,80,80);drawCardDrop({k:'cd',v:'aze',x:20,y:22},22,now);const d=x.getImageData(0,0,80,80).data;let n=0,bl=0;for(let i=0;i<d.length;i+=4)if(d[i+3]>200){n++;if(d[i+2]>d[i]+20)bl++}res.push([Math.cos(now*2.4+20)>0?'back':'face',n,bl])}}finally{g=G0}return res}""")
            rep('การ์ดตกบนพื้นวาดเป็นภาพการ์ดจริง (พลิกเห็นหน้า/หลัง)',all(o[1]>120 for o in r) and len({o[0] for o in r})==2,r)
            rep('ไม่มี error',errs==[],errs)
            pg2=await (await b.new_context(viewport={'width':915,'height':412})).new_page()
            await pg2.route('**/hd-card-mum.webp',lambda rt:rt.abort());await pg2.goto(URL);await pg2.wait_for_timeout(3000)
            await pg2.evaluate(SETUP,['mage','T46b'+str(random.randint(100,999)),60]);await pg2.wait_for_timeout(2500)
            r=await pg2.evaluate("async()=>{delete _cImg.mum;delete _cImg.sco;const a=new Image();a.src=cardImg('mum');await a.decode();const b=new Image();b.src=cardImg('sco');await b.decode();return[a.width,b.width,HDC.n]}")
            rep('ภาพการ์ดใบไหนโหลดไม่ได้ → ใบนั้นใช้แบบเดิม ใบอื่นใช้แบบใหม่',r[0]==192 and r[1]==288 and r[2]==15,r)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
