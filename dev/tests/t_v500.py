"""v500 มอนมีมิติ: มอนทุกตัววาดลงภาพแคชของตัวเอง (อัปเดตตามท่า) + ลงแสงเต็มชุด (ไล่แสง · เงาด้านหลังแสง · แสงขอบ) · แยกแสงเรือง · เงาพื้นวาดสด ·
   ส่วนรูปไข่/หลายเหลี่ยม/แขนขาได้แสงเงาทรงกลม/ทรงกระบอก · โหมดประหยัดวาดตรงพร้อมแสงเงาส่วน · เฟรมช้าต่อเนื่อง → กลับวิธีเดิมอัตโนมัติ"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
ALL="""()=>{const out={err:[],empty:[],n:0};for(const t of[0,1,2]){const m={id:950000+t,x:0,y:0,t,L:10,p:0,hp:1,mh:1,fx:1};const c=document.createElement('canvas');c.width=360;c.height=360;const x=c.getContext('2d');x.setTransform(2.4,0,0,2.4,180,250);const G0=g;g=x;
   try{const ok=mpcMon(m,1.3+t,1,0,0);const S=MPC.wm.get(m);if(!ok||!S)out.err.push([curMap,t,'noS']);else{const d=S.x.getImageData(0,0,S.c.width,S.c.height).data;let a=0;for(let i=3;i<d.length;i+=16)if(d[i]>40)a++;if(a<30)out.empty.push([curMap,t,a]);out.n++}}catch(e){out.err.push([curMap,t,String(e).slice(0,80)])}finally{g=G0}}return out}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Mv'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{try{setGQ('high')}catch(e){}LOWQ=false;ov.hidden=true;AUTO.on=false;window.DNH=12;gmGod=true;window.__fq=setInterval(()=>{FQ.avg=14},100);try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        maps=await A.ev("()=>Object.keys(MAPS).map(Number).filter(k=>k>=1&&k<100&&!(MAPS[k].hub||MAPS[k].city||MAPS[k].pvp||MAPS[k].dg||MAPS[k].tent||MAPS[k].ghq))")
        tot={'err':[],'empty':[],'n':0}
        for mp in maps:
            await A.ev(f"()=>{{enterMap({mp},{{x:CX,y:CY}})}}");await A.wait(700)
            r=await A.ev(ALL);tot['err']+=r['err'];tot['empty']+=r['empty'];tot['n']+=r['n']
        rep('มอนทุกแมพ (ธรรมดา/ตัวเร็ว/ตัวใหญ่) วาดลงภาพแคชได้ ไม่ error ไม่ว่าง',not tot['err'] and not tot['empty'] and tot['n']==len(maps)*3,{'maps':len(maps),**tot})
        await A.ev("()=>{enterMap(26,{x:CX,y:CY})}");await A.wait(1500)
        gl=await A.ev("""()=>{const m={id:951001,x:0,y:0,t:1,L:10,p:0,hp:1,mh:1,fx:1};const c=document.createElement('canvas');c.width=300;c.height=300;const x=c.getContext('2d');x.setTransform(2.4,0,0,2.4,150,220);const G0=g;g=x;try{mpcMon(m,1.3,1,0,0)}finally{g=G0}const S=MPC.wm.get(m);
          const sum=cv=>{const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;let a=0;for(let i=3;i<d.length;i+=4)a+=d[i];return a};return {hg:S.hg,glow:sum(S.gc),body:sum(S.c)}}""")
        rep('แสงเรือง (lighter) แยกออกจากตัวมอน แล้ววาดแบบบวกแสง (ไม่โดนลงเงา/ขอบ)',gl['hg']==1 and gl['glow']>1000 and gl['body']>1000,gl)
        await A.ev("()=>{enterMap(13,{x:CX,y:CY})}");await A.wait(2000)
        await A.ev("""()=>{const X=CX+300,Y=CY+700;me.x=X;me.y=Y;mons=mons.filter(m=>m.t===3);for(let i=0;i<9;i++){const t=i%3,x=X-120+(i%3)*120,y=Y-200+Math.floor(i/3)*110;mons.push({id:960000+i,x,y,tx:x,ty:y,t,L:10,p:0,hx:x,hy:y,hp:9e9,mh:9e9,tg:null,tt:0,ac:0,w:null,lg:0,fx:i%2?1:-1})}
          if(!window.__shc){window.__shc=1;const o=gxShadow;gxShadow=function(){window.__sh=(window.__sh|0)+1;return o.apply(this,arguments)}}}""")
        await A.wait(1200)
        s1=await A.ev("()=>new Promise(r=>{MPC.stat={r:0,b:0,s:0};window.__sh=0;setTimeout(()=>r({st:MPC.stat,sh:window.__sh,auto:MPC.auto}),1500)})")
        rep('ในเกม (คุณภาพปกติ): มอนวาดจากภาพแคช · ภาพใหม่ถูกจำกัดต่อเฟรม (วาดซ้ำน้อยกว่าที่เอาไปวาง) · เงาพื้นยังวาดทุกเฟรม',s1['st']['b']>50 and s1['st']['r']<s1['st']['b'] and s1['sh']>=s1['st']['b']*.8 and s1['auto']==1,s1)
        await A.ev("()=>{const m=mons.find(q=>q.id===960000);m.hf=1;m.hit=performance.now()}");
        wf=await A.ev("""()=>{const m=mons.find(q=>q.id===960001);const cnt=x=>{const d=x.getImageData(0,0,x.canvas.width,x.canvas.height).data;let w=0,n=0;for(let i=0;i<d.length;i+=4)if(d[i+3]>200){n++;if(d[i]>235&&d[i+1]>235&&d[i+2]>235)w++}return +(w/Math.max(1,n)).toFixed(2)};
          const c=document.createElement('canvas');c.width=300;c.height=300;const x=c.getContext('2d');x.setTransform(2.4,0,0,2.4,150,220);const G0=g;g=x;const M0={x:m.x,y:m.y};m.x=0;m.y=0;try{mpcMon(m,2.2,1,0,.9)}finally{g=G0;m.x=M0.x;m.y=M0.y}const S=MPC.wm.get(m);
          const c2=document.createElement('canvas');c2.width=300;c2.height=300;const x2=c2.getContext('2d');x2.setTransform(2.4,0,0,2.4,150,220);g=x2;MON_CUR=m;try{drawMon(0,0,m.t,2.2,1,0,.9)}finally{g=G0;MON_CUR=null}return [cnt(S.x),cnt(x2)]}""")
        rep('โดนตีกะพริบขาว: ภาพแคชขาวเท่าแบบเดิม (ไม่ลงแสงทับตอนกะพริบ)',wf[0]>=wf[1]-.08 and wf[0]>.2,wf)
        await A.ev("()=>{LOWQ=true}");await A.wait(800)
        s2=await A.ev("()=>new Promise(r=>{MPC.stat={r:0,b:0,s:0};let n=0;const o=mvE;window.mvE=mvE=function(){n++;return o.apply(this,arguments)};setTimeout(()=>{window.mvE=mvE=o;r({st:MPC.stat,mvE:n})},1500)})")
        rep('โหมดประหยัด: ไม่ใช้ภาพแคช แต่ยังได้แสงเงาทรงกลมต่อส่วน',s2['st']['r']==0 and s2['st']['b']==0 and s2['mvE']>50,s2)
        await A.ev("()=>{LOWQ=false;clearInterval(window.__fq);FQ.avg=60;MPC.ck.t=0;MPC.ck.bad=0}")
        await A.wait(400);await A.ev("()=>{FQ.avg=60;MPC.ck.t=0}");await A.wait(400);await A.ev("()=>{FQ.avg=60;MPC.ck.t=0}");await A.wait(400)
        s3=await A.ev("()=>new Promise(r=>{MPC.stat={r:0,b:0,s:0};FQ.avg=60;setTimeout(()=>r({auto:MPC.auto,st:MPC.stat}),800)})")
        await A.ev("()=>{FQ.avg=14;window.__fq=setInterval(()=>{FQ.avg=14},100);enterMap(34,{x:CX,y:CY})}");await A.wait(1200)
        await A.ev("()=>{const X=me.x+60,Y=me.y-60;mons.push({id:961000,x:X,y:Y,tx:X,ty:Y,t:0,L:10,p:0,hx:X,hy:Y,hp:9e9,mh:9e9,tg:null,tt:0,ac:0,w:null,lg:0,stun:99})}");await A.wait(800)
        s4=await A.ev("()=>MPC.auto")
        rep('เฟรมช้าต่อเนื่อง → เลิกใช้ภาพแคช/แสงเงาเพิ่มอัตโนมัติ (กลับวิธีเดิม) · เปลี่ยนแมพแล้วลองใหม่',s3['auto']==0 and s3['st']['b']==0 and s4==1,[s3,s4])
        kill=await A.ev("""async()=>{enterMap(13,{x:CX,y:CY});await new Promise(r=>setTimeout(r,1500));const m=mons.find(q=>q.t<3&&q.hp>0);if(!m)return 'nomon';me.x=m.x;me.y=m.y+60;await new Promise(r=>setTimeout(r,700));
          let dn=0;const o=mpcMon;window.mpcMon=mpcMon=function(a,b,c,d,e,f){if(f)dn++;return o.apply(this,arguments)};m.stun=0;m.inv=0;try{dmgMon(m.id,m.hp+10)}catch(e){window.mpcMon=mpcMon=o;return 'err '+e}
          await new Promise(r=>setTimeout(r,900));window.mpcMon=mpcMon=o;return [m.hp<=0?'dead':'alive',dn]}""")
        rep('มอนตาย (ท่าตาย) วาดผ่านภาพแคชได้ ไม่ error',isinstance(kill,list) and kill[0]=='dead' and kill[1]>0,kill)
        bs=await A.ev("""()=>{const out=[];for(const mp of[2,3,6,10,22,28]){const B=MAPS[mp]&&MAPS[mp].boss;if(!B)continue;out.push(B.n)}return out}""")
        berr=[]
        for mp in (2,3,6,10,22,28):
            await A.ev(f"()=>{{enterMap({mp},{{x:CX,y:CY}})}}");await A.wait(600)
            r=await A.ev("""()=>{const B=MAPS[curMap].boss,m={id:980009,x:me.x,y:me.y,tx:me.x,ty:me.y,t:3,L:B.L||10,p:1,hx:me.x,hy:me.y,hp:999,mh:999,ac:9,tg:null,tt:0,w:null,lg:0,a1:4,a2:9,tl:[],enr:0};mons.push(m);let e='';try{drawBossAnim(m,5,0,0,false);drawBossAnim(m,5,.6,.5,true)}catch(x){e=String(x)}mons.splice(mons.indexOf(m),1);return e}""")
            if r:berr.append([mp,r])
        rep('บอสวาดด้วยตัวช่วยใหม่ (ไล่สี + แสงเงาส่วน) ไม่ error',not berr,{'boss':bs,'err':berr})
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
