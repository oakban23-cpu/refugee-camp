"""v431 ยกระดับภาพ: ป้ายชื่อแมพ · สิ่งมีชีวิต · น้ำ/รอยเท้า · สภาพอากาศ · เลเวลอัป · หน้าเปิดเกม"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':390,'height':844});pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        tt=await pg.evaluate("()=>({cv:!!$('vztc'),img:VZT.img,on:VZT.on})")
        rep('หน้าเปิดเกมมีเลเยอร์เคลื่อนไหวทับภาพปก',tt['cv'] and tt['img']==1 and tt['on']==1,json.dumps(tt))
        await ctx.close()
        A=await new_client(b,'Aa','mage',60);B=await new_client(b,'Bb','melee',60)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;gmGod=true;AUTO.on=false}")
        await A.ev("()=>enterMap(13,{x:1600,y:1600})");await A.wait(500)
        cd=await A.ev("()=>{const c=$('vzc');return c?[c.classList.contains('on'),c.innerText]:null}")
        rep('เข้าแมพ → ป้ายชื่อแมพขึ้น (+จอค่อย ๆ สว่าง)',cd and cd[0] and 'สวนลอยฟ้าร้าง' in cd[1] and (await A.ev("()=>!!($('vzf')&&$('vzf').classList.contains('on'))")),json.dumps(cd,ensure_ascii=False))
        # สภาพอากาศตรงกันทุกเครื่อง (สุ่มจากแมพ+ช่วงเวลา)
        same=[]
        for mp in [2,4,8,13,18,34,3]:
            t0=1792000000000
            wa=await A.ev("([m,t])=>{const out=[];for(let i=0;i<40;i++){const w=vzWxOf(m,t+i*420000);out.push(w?w.k:'')}return out.join(',')}",[mp,t0])
            wb=await B.ev("([m,t])=>{const out=[];for(let i=0;i<40;i++){const w=vzWxOf(m,t+i*420000);out.push(w?w.k:'')}return out.join(',')}",[mp,t0])
            same.append((mp,wa==wb,sum(1 for x in wa.split(',') if x)))
        rep('สภาพอากาศตรงกันทุกเครื่อง และมีบ้างไม่มีบ้าง (ราว 30%)',all(s[1] for s in same) and all(4<=s[2]<=22 for s in same),json.dumps(same))
        kinds=await A.ev("()=>[2,4,8,13,18,34,3,1].map(m=>{for(let i=0;i<200;i++){const w=vzWxOf(m,1792000000000+i*420000);if(w)return m+':'+w.k}return m+':-'})")
        rep('ชนิดอากาศตามสภาพแวดล้อม (ค่ายไม่มีอากาศแปรปรวน)',kinds==['2:fog','4:snow','8:sand','13:rain','18:storm','34:star','3:ash','1:-'],json.dumps(kinds))
        wx=await A.ev("()=>{vzWxOf=()=>({k:'rain',a:1,ic:'',n:'',sl:1});vzWxTick();return wxNow()}")
        rep('ฝนตามตารางใหม่ต่อกับระบบฝนเดิม (wxNow)',wx==1,str(wx))
        # สิ่งมีชีวิต + รอยเท้า
        await A.wait(3000)
        cr=await A.ev("()=>({n:VZ.crit.length,k:[...new Set(VZ.crit.map(c=>c.k))]})")
        rep('สิ่งมีชีวิตในแมพเกิดตามสภาพแวดล้อม',cr['n']>0 and all(k in ['bf','petal','bird','ff'] for k in cr['k']),json.dumps(cr))
        ft=await A.ev("()=>new Promise(r=>{vzWxOf=()=>null;enterMap(4,{x:1600,y:1600});setTimeout(()=>{const x0=me.x;let k=0;const iv=setInterval(()=>{me.x=x0+(k++)*6;if(k>40){clearInterval(iv);r(VZ.ft.length)}},50)},600)})")
        rep('เดินบนหิมะทิ้งรอยเท้า',ft>=5,str(ft))
        ft2=await A.ev("()=>new Promise(r=>{enterMap(13,{x:1600,y:1600});setTimeout(()=>{const x0=me.x;let k=0;const iv=setInterval(()=>{me.x=x0+(k++)*6;if(k>30){clearInterval(iv);r(VZ.ft.length)}},50)},600)})")
        rep('แมพหญ้าไม่มีรอยเท้า',ft2==0,str(ft2))
        # เลเวลอัป / เปลี่ยนอาชีพ
        lv=await A.ev("()=>{const l=me.lv;me.xp=need(me.lv)-1;gainXP(me.x,me.y,50);const e=$('vzl');return [l,me.lv,e&&!e.hidden?e.innerText:'',VZL.k]}")
        rep('เลเวลอัป → ป้าย LEVEL UP + ค่าพลังที่เพิ่ม + ลำแสง/วงเวท',lv[1]==lv[0]+1 and 'LEVEL UP' in lv[2] and 'HP +' in lv[2] and lv[3]=='lv',json.dumps(lv,ensure_ascii=False))
        jb=await A.ev("()=>new Promise(r=>{me.cls2=0;setTimeout(()=>{me.cls2=1;me.br=1;setTimeout(()=>{const e=$('vzl');r([e&&!e.hidden?e.innerText:'',VZL.k])},800)},700)})")
        rep('เปลี่ยนอาชีพ → ฉากเปลี่ยนอาชีพ',jb[1]=='job' and 'เปลี่ยนอาชีพ' in jb[0],json.dumps(jb,ensure_ascii=False))
        Es=[e for c in (A,B) for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
