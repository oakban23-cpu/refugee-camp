import asyncio, sys, random, base64, json
sys.path.insert(0, '/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/boss/'
JS="""()=>{const out=[];const og=g,oc=curMap;
 const shot=(label,fn)=>{const C=document.createElement('canvas');C.width=1700;C.height=1400;const G=C.getContext('2d');g=G;let u;try{g.save();g.translate(850,1000);g.scale(2,2);g.translate(-400,-560);fn();g.restore();u=C.toDataURL('image/png')}catch(e){try{g.restore()}catch(_){};u='ERR '+String(e).slice(0,100)}out.push({label,img:u})};
 const named=new Set([...Object.keys(BV1).filter(k=>typeof BV1[k]==='function'),...Object.keys(RB2N),'คราเคนเมฆ','ความหิวของดาว','คาสเซียน · ผู้บัญชาการองครักษ์ดาว','ผู้กลืนราก','ผู้ตีระฆังเงา','ผู้เฝ้าระฆังร่วง','ราชันย์ห้วงลึก · ร่างที่แท้จริง','ราชันรากดำ','ราชาหมาป่าดาว','ราชาโอเรียน · ผู้ครองบัลลังก์ดาว','ราชินีที่เหลือแต่เปลือก','เงามืดของอาซาเอล','เวสเปอร์ · ผู้พิทักษ์แห่งอารัณยา','ทูตแห่งความหิว · ผู้กลืนดาว']);
 for(const k of Object.keys(MAPS)){const M=MAPS[k];if(M&&M.boss&&M.boss.n&&M.boss.n!=='-'&&!named.has(M.boss.n))shot('map'+k+' '+M.boss.n,()=>{curMap=+k;drawBoss(400,560,1.3,Object.assign({hp:1,mh:1},M.boss),0,0,0)})}
 curMap=oc;
 for(const n of named)shot(n,()=>drawBoss(400,560,1.3,{n,hp:1,mh:1},0,0,0));
 for(let f=10;f<=100;f+=10)shot('tower'+f,()=>drawTowerBoss(400,560,1.3,f,0,0,0));
 const m={x:400,y:560,hp:1,mh:1,t:3,id:1,tx:400,ty:560};
 shot('worldboss',()=>drawWorldBoss(m,1.3,0));
 try{const og2=GBS.go;GBS.go=1;const ow=isWB;shot('guildboss',()=>drawGuildBoss(m,1.3,0))}catch(e){}
 g=og;curMap=oc;return out}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=1,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['melee','Bs'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
            r=await pg.evaluate(JS)
            json.dump(r,open(O+'all2.json','w'));print(len(r),errs[:3])
    finally:p.terminate()
asyncio.run(main())
