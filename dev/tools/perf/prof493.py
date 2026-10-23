"""v493 วัดความลื่นแบบ Samsung A55: จอ 384×832 x2.81 · โหมดประหยัด · CPU ช้าลง THR เท่า
ฉาก: ค่าย (ยืน/เดิน) · ทุ่งตีมอนออโต้ · นครอัสตรา · มีผู้เล่นอื่น 2 คน
วัด: เวลาเฟรม (เฉลี่ย/p90/p99/สูงสุด/เฟรมเกิน 50ms) · long task · โปรไฟล์ CPU (self time) · heap"""
import asyncio, sys, json, collections, os, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
THR=float(os.environ.get('THR','3'));GQ=os.environ.get('GQ','low');SEC=float(os.environ.get('SEC','8'));ONLY=os.environ.get('ONLY','')
TOP=int(os.environ.get('TOP','28'));OUT=os.environ.get('OUT','')
FR="""(ms)=>new Promise(r=>{const T=[];let l=performance.now();const t0=l;const LT=[];let po=null;try{po=new PerformanceObserver(L=>{for(const e of L.getEntries())LT.push(Math.round(e.duration))});po.observe({type:'longtask'})}catch(e){}
  function f(n){T.push(n-l);l=n;if(n-t0<ms)requestAnimationFrame(f);else{try{po&&po.disconnect()}catch(e){}T.shift();const S=[...T].sort((a,b)=>a-b),q=p=>+S[Math.min(S.length-1,Math.floor(S.length*p))].toFixed(1);
    r({n:T.length,fps:+(1000/(T.reduce((a,b)=>a+b,0)/T.length)).toFixed(1),avg:+(T.reduce((a,b)=>a+b,0)/T.length).toFixed(1),p50:q(.5),p90:q(.9),p99:q(.99),max:+S[S.length-1].toFixed(0),j50:T.filter(x=>x>50).length,j100:T.filter(x=>x>100).length,
      lt:LT.length,ltms:LT.reduce((a,b)=>a+b,0),ltmax:Math.max(0,...LT),heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):0,draw:+(PF.draw||0).toFixed(1),dpr:DPR,cv:cv.width+'x'+cv.height,low:LOWQ,mons:mons.filter(m=>m.hp>0).length,oth:Object.keys(others).length,map:curMap})}}
  requestAnimationFrame(f)})"""
async def nc(b,name,cls,a55):
    if a55: ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
    else: ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=1,has_touch=True,is_mobile=True)
    pg=await ctx.new_page();c=Client(ctx,pg,name)
    pg.on('pageerror', lambda e: c.errs.append((e.stack or str(e))[:300]))
    if a55: await pg.add_init_script("try{localStorage.setItem('refugee_gq','%s')}catch(e){}"%GQ)
    await pg.goto(URL);await pg.wait_for_timeout(2500);info=await pg.evaluate(SETUP,[cls,name,60]);await pg.wait_for_timeout(1500);c.uid=info['uid'];return c
def trace_sum(TR,tag):
    # เธรดหลักของหน้า (CrRendererMain ที่มีงานมากสุด)
    names={(e['pid'],e['tid']):e['args']['name'] for e in TR if e.get('ph')=='M' and e.get('name')=='thread_name'}
    cand=collections.Counter((e['pid'],e['tid']) for e in TR if e.get('ph')=='X' and names.get((e['pid'],e['tid']))=='CrRendererMain')
    if not cand: print('no main thread');return
    key=cand.most_common(1)[0][0]
    ev=sorted([e for e in TR if (e['pid'],e['tid'])==key and e.get('ph')=='X' and 'dur' in e],key=lambda e:(e['ts'],-e['dur']))
    ex=collections.Counter();st=[]
    for e in ev:
        while st and st[-1]['ts']+st[-1]['dur']<=e['ts']: st.pop()
        if st: ex[st[-1]['name']]-=e['dur']
        ex[e['name']]+=e['dur'];st.append(e)
    span=(ev[-1]['ts']+ev[-1]['dur']-ev[0]['ts']) if ev else 1
    print('  main-thread exclusive (ms per sec):')
    for k,v in ex.most_common(18):
        if v<=0: continue
        print(f'   {v/1000/(span/1e6):7.1f} ms/s  {k}')
def prof_top(prof,n):
    nodes={x['id']:x for x in prof['nodes']};selfT=collections.Counter()
    for s,d in zip(prof['samples'],prof['timeDeltas']):
        cf=nodes[s]['callFrame'];k=(cf['functionName'] or '(anon)')+':'+str(cf['lineNumber']+1)+':'+str(cf['columnNumber']+1)
        selfT[k]+=d
    tot=sum(selfT.values());return tot,selfT.most_common(n)
def prof_incl(prof,n):
    nodes={x['id']:x for x in prof['nodes']};par={}
    for x in prof['nodes']:
        for c in x.get('children',[]):par[c]=x['id']
    inc=collections.Counter()
    for s,d in zip(prof['samples'],prof['timeDeltas']):
        seen=set();q=s
        while q is not None:
            cf=nodes[q]['callFrame'];k=(cf['functionName'] or '(anon)')+':'+str(cf['lineNumber']+1)+':'+str(cf['columnNumber']+1)
            if k not in seen:inc[k]+=d;seen.add(k)
            q=par.get(q)
    return inc.most_common(n)
async def measure(M,cdp,tag,res):
    if ONLY and ONLY not in tag: return
    await cdp.send('Emulation.setCPUThrottlingRate',{'rate':THR})
    await cdp.send('Profiler.enable');await cdp.send('Profiler.setSamplingInterval',{'interval':200});await cdp.send('Profiler.start')
    TR=[];done=asyncio.get_event_loop().create_future()
    cdp.on('Tracing.dataCollected',lambda e:TR.extend(e['value']))
    cdp.on('Tracing.tracingComplete',lambda e:(not done.done()) and done.set_result(1))
    await cdp.send('Tracing.start',{'categories':'devtools.timeline,v8,disabled-by-default-v8.gc,blink','options':'record-continuously'})
    fr=await M.ev(FR,int(SEC*1000))
    prof=(await cdp.send('Profiler.stop'))['profile']
    await cdp.send('Tracing.end');await asyncio.wait_for(done,30)
    trace_sum(TR,tag)
    await cdp.send('Emulation.setCPUThrottlingRate',{'rate':1})
    tot,top=prof_top(prof,TOP);inc=prof_incl(prof,TOP)
    print(f'\n===== {tag} · THR {THR} · GQ {GQ}',json.dumps(fr,ensure_ascii=False),flush=True)
    busy=tot-sum(v for k,v in top if k.startswith('(idle)'))
    print('  self (ms per sec of wall · % of busy):')
    for k,v in top:
        if k.startswith('(idle)'):continue
        print(f'   {v/1000/SEC:7.1f} ms/s {100*v/max(1,busy):5.1f}%  {k}')
    print('  inclusive:')
    for k,v in inc[:22]:
        print(f'   {v/1000/SEC:7.1f} ms/s  {k}')
    res[tag]={'fr':fr,'top':[(k,round(v/1000/SEC,1)) for k,v in top],'inc':[(k,round(v/1000/SEC,1)) for k,v in inc]}
async def main():
    p=start_server();res={}
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        M=await nc(b,'A55'+str(random.randint(10,99)),'melee',True)
        b2=await pw.chromium.launch()
        O=[await nc(b2,'Ot'+str(i)+str(random.randint(10,99)),c,False) for i,c in enumerate(['mage','archer'])]
        for c in O: await c.ev("()=>{window.draw=function(){};try{draw=function(){}}catch(e){}}")
        for c in [M]+O: await c.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}")
        await M.ev("(q)=>{if(q==='low'||q==='high'||q==='auto')setGQ(q)}",GQ)
        cdp=await M.ctx.new_cdp_session(M.pg)
        # ค่าย: ยืนกลางค่าย (คนอื่นเดินวนรอบ)
        for i,c in enumerate(O): await c.ev("(i)=>{me.x=1600+80*(i+1);me.y=1640;window.__wk=setInterval(()=>{const t=performance.now()/1000+i;me.x=1600+Math.cos(t*.6)*180;me.y=1650+Math.sin(t*.6)*120},50)}",i)
        await M.ev("()=>{me.x=1600;me.y=1700}");await M.wait(3000)
        await measure(M,cdp,'camp-idle',res)
        # ค่าย: เดิน (กด d/a สลับ)
        async def walk():
            for k in range(int(SEC/1.6)+1):
                key='d' if k%2==0 else 'a'
                await M.pg.keyboard.down(key);await M.wait(1500);await M.pg.keyboard.up(key)
        t=asyncio.create_task(walk());await measure(M,cdp,'camp-walk',res);await t
        # ทุ่ง: ตีมอนออโต้
        for c in [M]+O: await c.ev("()=>{try{clearInterval(window.__wk)}catch(e){};enterMap(13,{x:1100,y:1900})}")
        await M.wait(3500)
        for c in O: await c.ev("()=>{AUTO.on=true}")
        await M.ev("()=>{AUTO.on=true}");await M.wait(4000)
        await measure(M,cdp,'field-auto',res)
        # นครอัสตรา
        await M.ev("()=>{AUTO.on=false;enterMap(9,{x:1600,y:1700})}")
        for c in O: await c.ev("()=>{AUTO.on=false;enterMap(9,{x:1640,y:1720})}")
        await M.wait(4500)
        await measure(M,cdp,'city',res)
        E=[e for c in [M]+O for e in c.errs];print('\nerrs',E[:3])
    finally: p.terminate()
    if OUT: open(OUT,'w').write(json.dumps(res,ensure_ascii=False))
asyncio.run(main())
