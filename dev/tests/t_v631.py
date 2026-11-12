import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
L=json.load(open('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/boss/all_labels.json'))
RUN="""([L,tag])=>{const og=g,oc=curMap,res=[];
 L.forEach((l,i)=>{let fn;const m=l.match(/^map(\\d+) /);
   if(m){const k=+m[1];fn=()=>{curMap=k;drawBoss(300,420,1.3,Object.assign({hp:1,mh:1},MAPS[k].boss),0,0,0)}}
   else if(l.startsWith('tower')){const f=+l.slice(5);fn=()=>drawTowerBoss(300,420,1.3,f,.5,.5,1)}
   else if(l==='worldboss'){fn=()=>drawWorldBoss({x:300,y:420,hp:1,mh:1,t:3,id:1},1.3,0)}
   else if(l==='guildboss'){fn=()=>{const o=GBS.go,M=MAPS[curMap],ow=M.wb;GBS.go={s:3};M.wb=1;try{drawWorldBoss({x:300,y:420,hp:1,mh:1,t:3,id:1},1.3,0)}finally{GBS.go=o;M.wb=ow}}}
   else{const n=l==='__hunger'?'ทูตแห่งความหิว · ผู้กลืนดาว':l;fn=()=>drawBoss(300,420,1.3,{n,hp:1,mh:1},.6,.4,1)}
   const C=document.createElement('canvas');C.width=600;C.height=600;g=C.getContext('2d');const c0=BSA.cnt;let err='';try{fn()}catch(e){err=String(e)}res.push([l,BSA.cnt-c0,err])});
 g=og;curMap=oc;return res}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['melee','Tb'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(3000)
            rep('ติดตั้งตัวห่อบอสครบ (หลัง 2.6 วิ)',await pg.evaluate("()=>BSA.ok===1&&!BSA.err&&Object.keys(BSA.d).length===49"))
            miss=await pg.evaluate("async()=>{const bad=[];for(const id of Object.keys(BSA.d)){const r=await fetch('hd-bs'+String(id).padStart(2,'0')+'.webp');if(!r.ok)bad.push(id)}return bad}")
            rep('ไฟล์ภาพบอส 49 ไฟล์เสิร์ฟได้',miss==[],miss)
            await pg.evaluate(RUN,[L,'warm']);await pg.wait_for_timeout(4500)
            r=await pg.evaluate(RUN,[L,'run'])
            bad=[x for x in r if x[1]!=1 or x[2]]
            rep('บอสทั้ง 49 ตัว (แมพ/ชื่อ/หอคอย/บอสโลก/บอสกิลด์) วาดจากภาพวาด รวมโดนตี/คลั่ง/ร่าย',bad==[],bad[:6])
            rep('ร่างเปลือกราชินีใช้ภาพราชินีแบบจาง',await pg.evaluate("()=>{const og=g;g=document.createElement('canvas').getContext('2d');const c=BSA.cnt;drawBoss(100,100,1,{n:'ราชินีที่เหลือแต่เปลือก'},0,0,0);g=og;return BSA.cnt===c+1}"))
            rep('ผู้กลืนรากร่างที่ 3 ยังใช้แบบเดิม',await pg.evaluate("()=>{const og=g;g=document.createElement('canvas').getContext('2d');const o=RTPK.p3;RTPK.p3=1;const c=BSA.cnt;try{drawBoss(100,100,1,{n:'ผู้กลืนราก'},0,0,0)}catch(e){}RTPK.p3=o;g=og;return BSA.cnt===c}"))
            rep('BSA.off=1 กลับเป็นบอสแบบเดิม',await pg.evaluate("()=>{const og=g;g=document.createElement('canvas').getContext('2d');BSA.off=1;const c=BSA.cnt;drawBoss(100,100,1,{n:'ราชากระดูกโบราณ'},0,0,0);BSA.off=0;g=og;return BSA.cnt===c}"))
            rep('บอสที่ไม่มีภาพ (ชื่ออื่น) ใช้แบบเดิม',await pg.evaluate("()=>{const og=g;g=document.createElement('canvas').getContext('2d');const c=BSA.cnt;drawBoss(100,100,1,{n:'บอสทดสอบ'},0,0,0);g=og;return BSA.cnt===c}"))
            # in game: tower boss floor
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;AUTO.on=false;ov.hidden=true;twCreate(1)}");await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{ov.hidden=true;dg.ph='lobby';TWCL=null;twBegin(10);banner=null}");await pg.wait_for_timeout(1500);await pg.evaluate("()=>{me.blPick=null;try{$('blpk').hidden=true}catch(e){}}");await pg.wait_for_timeout(6000);print('mons',await pg.evaluate("()=>mons.map(m=>m.t).join(',')+' ph '+dg.ph"))
            st=await pg.evaluate("()=>new Promise(res=>{const b=mons.find(m=>m.t===3);if(b){me.x=b.x-120;me.y=b.y+20}const c0=BSA.cnt;let fr=0;const f=()=>{fr++;if(fr<30)requestAnimationFrame(f);else res([!!b,BSA.cnt-c0,fr])};requestAnimationFrame(f)})")
            rep('ในเกม: บอสหอคอยชั้น 10 วาดเป็นภาพวาด ~1 ครั้งต่อเฟรม',st[0] and 20<=st[1]<=40,st)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
