"""t_perf.py · วัดประสิทธิภาพ REFUGEE แบบทำซ้ำได้ (สถานการณ์ S1–S7 + soak S8)
ใช้: HSRV=<build> python3 t_perf.py <out.json> [profiles=P1,P2,P3] [modes=full,low] [scen=S1,...] [soak=1]
ตัวชี้วัดต่อจุด: frame time p50/p95/p99/max · jank>16.7/>33 ms ต่อนาที · sd · upd/ui/draw (PF) · CPU busy (CDP TaskDuration/วินาที)
              · Script/Layout/Style ms/วินาที · JS heap · DOM nodes · listeners · canvas live (จำนวน/MB) · long tasks"""
import asyncio, sys, json, os, time, statistics as stt
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *

OUT = sys.argv[1] if len(sys.argv) > 1 else 'perf.json'
ARG = dict(a.split('=', 1) for a in sys.argv[2:] if '=' in a)
PROFS = ARG.get('profiles', 'P2,P1,P3').split(',')
MODES = ARG.get('modes', 'full,low').split(',')
SCEN = ARG.get('scen', 'S1,S2,S3,S4,S5,S6,S7').split(',')
SOAK = ARG.get('soak', '0') == '1'
FLAGS = json.loads(ARG.get('flags', '{}'))
SETTLE, WIN = float(ARG.get('settle', '2.5')), float(ARG.get('win', '5'))
PROF = {'P1': dict(w=412, h=915, d=2, m=True, thr=4), 'P2': dict(w=915, h=412, d=2, m=True, thr=4), 'P3': dict(w=1280, h=720, d=1, m=False, thr=1)}

INIT = r"""
(()=>{const P=window.__P={cvs:[],lt:[],iv:new Map(),ivN:0,toN:0,img:{},imgN:0,ws:{o:0,ob:0,i:0,ib:0},fr:null};
 const ce=Document.prototype.createElement;Document.prototype.createElement=function(t){const e=ce.apply(this,arguments);try{if(String(t).toLowerCase()==='canvas'){P.cvs.push(new WeakRef(e))}}catch(_){}return e};
 const si=window.setInterval,ci=window.clearInterval,st=window.setTimeout;
 window.setInterval=function(f,ms){const id=si.apply(this,arguments);let s='';try{s=(new Error().stack||'').split('\n')[2]||''}catch(_){}P.iv.set(id,[ms,s.trim().slice(0,90)]);P.ivN++;return id};
 window.clearInterval=function(id){P.iv.delete(id);return ci.apply(this,arguments)};
 window.setTimeout=function(){P.toN++;return st.apply(this,arguments)};
 const d=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');Object.defineProperty(HTMLImageElement.prototype,'src',{set(v){try{const k=String(v).split('?')[0].split('/').pop().slice(0,60);P.img[k]=(P.img[k]||0)+1;P.imgN++}catch(_){}d.set.call(this,v)},get(){return d.get.call(this)},configurable:true});
 const WS=window.WebSocket;if(WS){window.WebSocket=function(u,p){const s=p?new WS(u,p):new WS(u);s.addEventListener('message',e=>{P.ws.i++;try{P.ws.ib+=typeof e.data==='string'?e.data.length:(e.data.byteLength||e.data.size||0)}catch(_){}});const sd=s.send;s.send=function(x){P.ws.o++;try{P.ws.ob+=typeof x==='string'?x.length:(x.byteLength||0)}catch(_){}return sd.apply(this,arguments)};return s};window.WebSocket.prototype=WS.prototype;Object.assign(window.WebSocket,{OPEN:1,CLOSED:3,CONNECTING:0,CLOSING:2})}
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())P.lt.push([Math.round(e.startTime),Math.round(e.duration)])}).observe({type:'longtask',buffered:true})}catch(_){}
})();
"""

# เก็บเฟรม (ตรึงระบบปรับคุณภาพอัตโนมัติไว้ทุกเฟรม เพื่อไม่ให้ผลเพี้ยน)
MEAS = r"""async([win,mode])=>{const P=window.__P,fr=[],pf=[];let last=0,go=true;
  const pin=()=>{try{FQ.avg=10;FQ.bad=0}catch(e){}try{HD2.fq=999}catch(e){}try{BXM.fq=999}catch(e){}try{OL.fq=999}catch(e){}try{BX3.fq=999}catch(e){}try{if(mode==='low'){if(!LOWQ){LOWQ=true;applyQ()}}else if(LOWQ){LOWQ=false;applyQ()}}catch(e){}};
  const lt0=P.lt.length;await new Promise(res=>{const t0=performance.now();const f=t=>{pin();if(last)fr.push(t-last);last=t;try{pf.push([PF.upd||0,PF.ui||0,PF.draw||0])}catch(e){}if(t-t0<win*1000)requestAnimationFrame(f);else res()};requestAnimationFrame(f)});
  return {fr,pf,lt:P.lt.slice(lt0)}}"""

def stats(fr, pf, wall):
    if not fr:
        return {}
    s = sorted(fr)
    q = lambda p: round(s[min(len(s) - 1, int(len(s) * p))], 1)
    mins = wall / 60
    col = lambda i: round(stt.median([x[i] for x in pf]), 2) if pf else None
    return dict(n=len(fr), fps=round(1000 / stt.mean(fr), 1), p50=q(.5), p95=q(.95), p99=q(.99), max=round(s[-1], 1), sd=round(stt.pstdev(fr), 2),
                j17=round(sum(1 for x in fr if x > 16.7) / mins, 1), j33=round(sum(1 for x in fr if x > 33.4) / mins, 1),
                upd=col(0), ui=col(1), draw=col(2))

async def cdp_metrics(cdp):
    m = await cdp.send('Performance.getMetrics')
    return {x['name']: x['value'] for x in m['metrics']}

async def measure(pg, cdp, label, mode, res, extra=None):
    await pg.wait_for_timeout(int(SETTLE * 1000))
    m0 = await cdp_metrics(cdp)
    t0 = time.time()
    r = await pg.evaluate(MEAS, [WIN, mode])
    wall = time.time() - t0
    m1 = await cdp_metrics(cdp)
    d = lambda k: round((m1.get(k, 0) - m0.get(k, 0)) / wall * 1000, 1)
    o = stats(r['fr'], r['pf'], wall)
    o.update(cpu_ms_s=d('TaskDuration'), script_ms_s=d('ScriptDuration'), layout_ms_s=d('LayoutDuration'), style_ms_s=d('RecalcStyleDuration'),
             heapMB=round(m1.get('JSHeapUsedSize', 0) / 1048576, 1), nodes=int(m1.get('Nodes', 0)), listeners=int(m1.get('JSEventListeners', 0)),
             longtasks=len(r['lt']), lt_max=max([x[1] for x in r['lt']], default=0))
    if extra:
        o.update(extra)
    res[label] = o
    print(label, json.dumps(o, ensure_ascii=False), flush=True)

CENSUS = r"""()=>{const P=window.__P;let n=0,px=0,big=[];for(const w of P.cvs){const c=w.deref();if(!c)continue;n++;const a=c.width*c.height;px+=a;if(a>=1e6)big.push([c.width,c.height,c.isConnected?'dom':'off'])}
  const iv=[...P.iv.values()];const ivg={};iv.forEach(([ms,s])=>{const k=ms+'|'+s;ivg[k]=(ivg[k]||0)+1});
  const dup=Object.entries(P.img).filter(([k,v])=>v>1).sort((a,b)=>b[1]-a[1]).slice(0,25);
  return {canvas_live:n,canvas_MB:Math.round(px*4/1048576),canvas_big:big.slice(0,30),intervals_live:iv.length,intervals_created:P.ivN,timeouts_created:P.toN,interval_sites:Object.entries(ivg).sort((a,b)=>b[1]-a[1]).slice(0,40),img_src_sets:P.imgN,img_unique:Object.keys(P.img).length,img_dup:dup,ws:P.ws}}"""

async def gc(cdp):
    try:
        await cdp.send('HeapProfiler.collectGarbage')
    except Exception:
        pass

CL = "()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;try{ov.hidden=true}catch(e){};document.querySelectorAll('.tip,.tipbox,#tipb,.ntf').forEach(e=>e.remove());if(!window.__hpk)window.__hpk=setInterval(()=>{try{me.down=0;me.hp=me.mh}catch(e){}},200)}"
GO = "async([m,x,y])=>{if(curMap!==m)enterMap(m,{x:x||MAPS[m].sx||1600,y:y||MAPS[m].sy||1600});else{me.x=x||me.x;me.y=y||me.y}await new Promise(r=>setTimeout(r,2500));me.x=x||me.x;me.y=y||me.y}"

async def run_profile(b, prof, mode, results):
    P = PROF[prof]
    ctx = await b.new_context(viewport={'width': P['w'], 'height': P['h']}, device_scale_factor=P['d'], is_mobile=P['m'], has_touch=P['m'])
    await ctx.add_init_script(INIT)
    pg = await ctx.new_page()
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:160]))
    cdp = await ctx.new_cdp_session(pg)
    await cdp.send('Performance.enable')
    if P['thr'] > 1:
        await cdp.send('Emulation.setCPUThrottlingRate', {'rate': P['thr']})
    R = {}
    tag = prof + '/' + mode
    await pg.goto(URL)
    await pg.wait_for_timeout(3500)
    await pg.evaluate("(f)=>{try{if(typeof PERF!=='undefined')Object.assign(PERF,f)}catch(e){}}", FLAGS)
    await pg.evaluate("(m)=>{try{setGQ(m==='low'?'low':'high')}catch(e){}}", mode)
    if 'S1' in SCEN:
        await measure(pg, cdp, tag + '/S1 title', mode, R)
    await pg.evaluate(SETUP, ['mage', 'Pf' + prof + mode[0], 80])
    await pg.wait_for_timeout(3500)
    await pg.evaluate(CL)
    await pg.evaluate("(m)=>{try{setGQ(m==='low'?'low':'high')}catch(e){}}", mode)
    if 'S2' in SCEN:
        await pg.evaluate(GO, [1, 1600, 1700]); await pg.evaluate(CL)
        await measure(pg, cdp, tag + '/S2 camp idle', mode, R)
        await pg.evaluate("()=>{window.__walk=setInterval(()=>{const t=performance.now()/1000;me.x=1600+Math.cos(t*.5)*260;me.y=1650+Math.sin(t*.5)*200},16)}")
        await measure(pg, cdp, tag + '/S2 camp walk', mode, R)
        await pg.evaluate("()=>clearInterval(window.__walk)")
    if 'S3' in SCEN:
        await pg.evaluate(GO, [9, 1600, 1600]); await pg.evaluate(CL)
        await pg.evaluate("async()=>{for(let i=0;i<120&&(typeof AST!=='undefined')&&HDI.on&&(AST.ok===0||AST.re);i++)await new Promise(r=>setTimeout(r,150))}")
        for nm, x, y in [('plaza', 1600, 1600), ('south', 1600, 1950), ('gate', 1600, 2230), ('west', 850, 1600), ('east', 2350, 1600), ('palace', 1600, 1400)]:
            await pg.evaluate("([x,y])=>{me.x=x;me.y=y}", [x, y])
            await measure(pg, cdp, tag + '/S3 astra ' + nm, mode, R)
    if 'S4' in SCEN:
        await pg.evaluate(GO, [2, 0, 0]); await pg.evaluate(CL)
        await pg.evaluate("()=>{const ms=mons.filter(m=>m.t!==3&&m.hp>0);if(ms.length){me.x=ms[0].x-60;me.y=ms[0].y}AUTO.on=true;try{autoBtn()}catch(e){}window.__sk=setInterval(()=>{for(const k of[0,1,3]){try{useSkill(k)}catch(e){}}},700)}")
        await measure(pg, cdp, tag + '/S4 combat auto', mode, R)
        await pg.evaluate("()=>{clearInterval(window.__sk);AUTO.on=false}")
    if 'S5' in SCEN:
        try:
            await pg.evaluate("()=>{AUTO.on=false;ov.hidden=true;twCreate(1)}"); await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{ov.hidden=true;dg.ph='lobby';TWCL=null;twBegin(10);banner=null}"); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{me.blPick=null;try{$('blpk').hidden=true}catch(e){}}"); await pg.wait_for_timeout(5000)
            await pg.evaluate("()=>{const b=mons.find(m=>m.t===3);if(b){me.x=b.x-120;me.y=b.y+20}AUTO.on=true;window.__sk=setInterval(()=>{for(const k of[0,1,3]){try{useSkill(k)}catch(e){}}},700)}")
            hasb = await pg.evaluate("()=>!!mons.find(m=>m.t===3)")
            await measure(pg, cdp, tag + '/S5 tower boss', mode, R, {'boss': hasb})
            await pg.evaluate("()=>{clearInterval(window.__sk);AUTO.on=false;try{dgLeave()}catch(e){}}")
            await pg.wait_for_timeout(1500)
        except Exception as e:
            print('S5 skip', e)
    if 'S6' in SCEN:
        for m in [40, 38, 44]:
            await pg.evaluate(GO, [m, 0, 0]); await pg.evaluate(CL)
            await measure(pg, cdp, tag + '/S6 map%d' % m, mode, R)
    if 'S7' in SCEN:
        await pg.evaluate(GO, [1, 1600, 1700]); await pg.evaluate(CL)
        t = await pg.evaluate("""async()=>{const out={};const one=async(n,open0)=>{const open=()=>{ov.hidden=false;open0()};const ts=[];for(let i=0;i<10;i++){const a=performance.now();try{open()}catch(e){out[n]='ERR '+e;return}await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));ts.push(performance.now()-a);ov.hidden=true;await new Promise(r=>setTimeout(r,80))}ts.sort((a,b)=>a-b);out[n]=[Math.round(ts[5]),Math.round(ts[9])]};
           await one('menu',()=>menuToggle());await one('gear',()=>gearUI());await one('worldmap',()=>wmUI());await one('skills',()=>treeUI());await one('shop',()=>shopUI(0));await one('quest',()=>questUI());return out}""")
        R[tag + '/S7 menus open ms [median,max]'] = t
        print(tag, 'S7', t, flush=True)
        await pg.evaluate("()=>{try{ov.hidden=true}catch(e){}}")
        # ค่าใช้จ่ายตอนเปิดหน้าต่างทึบเต็มจอค้างไว้ (เกมยังวาดอยู่ข้างหลังไหม)
        await pg.evaluate("()=>{try{ov.hidden=false;gearUI()}catch(e){}}")
        await measure(pg, cdp, tag + '/S7 gear window open (idle)', mode, R)
        await pg.evaluate("()=>{try{ov.hidden=true}catch(e){}}")
    await gc(cdp)
    R[tag + '/census'] = await pg.evaluate(CENSUS)
    R[tag + '/errors'] = errs[:10]
    results.update(R)
    await ctx.close()

async def soak(b, results):
    P = PROF['P3']
    ctx = await b.new_context(viewport={'width': P['w'], 'height': P['h']}, device_scale_factor=1)
    await ctx.add_init_script(INIT)
    pg = await ctx.new_page()
    cdp = await ctx.new_cdp_session(pg)
    await cdp.send('Performance.enable')
    await pg.goto(URL); await pg.wait_for_timeout(3000)
    await pg.evaluate(SETUP, ['melee', 'Soak1', 160]); await pg.wait_for_timeout(3500); await pg.evaluate(CL)
    await pg.evaluate("()=>{try{setGQ('high')}catch(e){}}")
    rows = []
    maps = [1, 9, 2, 38, 40, 44]
    for i in range(31):
        if i % 5 == 0:
            await gc(cdp)
            m = await cdp_metrics(cdp)
            c = await pg.evaluate("()=>{const P=window.__P;let n=0,px=0;for(const w of P.cvs){const c=w.deref();if(c){n++;px+=c.width*c.height}}return[n,Math.round(px*4/1048576),P.iv.size,P.imgN]}")
            row = dict(warps=i, heapMB=round(m['JSHeapUsedSize'] / 1048576, 1), nodes=int(m['Nodes']), listeners=int(m['JSEventListeners']), canvas=c[0], canvasMB=c[1], intervals=c[2], img_src=c[3])
            rows.append(row); print('soak', row, flush=True)
        if i == 30:
            break
        mp = maps[i % len(maps)]
        await pg.evaluate(GO, [mp, 0, 0]); await pg.evaluate(CL)
        await pg.wait_for_timeout(1500)
    idle = []
    await pg.evaluate(GO, [9, 1600, 1700])
    for k in range(int(ARG.get('idlemin', '5'))):
        await pg.wait_for_timeout(60000)
        await gc(cdp)
        m = await cdp_metrics(cdp)
        c = await pg.evaluate("()=>{const P=window.__P;let n=0,px=0;for(const w of P.cvs){const c=w.deref();if(c){n++;px+=c.width*c.height}}return[n,Math.round(px*4/1048576)]}")
        r = dict(min=k + 1, heapMB=round(m['JSHeapUsedSize'] / 1048576, 1), nodes=int(m['Nodes']), canvas=c[0], canvasMB=c[1])
        idle.append(r); print('idle', r, flush=True)
    results['S8 soak warps'] = rows
    results['S8 soak idle'] = idle
    await ctx.close()

async def main():
    p = start_server()
    res = {'meta': dict(time=time.strftime('%Y-%m-%d %H:%M'), settle=SETTLE, win=WIN, profiles=PROFS, modes=MODES, note='headless Chromium, software raster (no GPU); CPU throttling via CDP for P1/P2')}
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            for prof in PROFS:
                for mode in MODES:
                    try:
                        await run_profile(b, prof, mode, res)
                    except Exception as e:
                        print('ERR', prof, mode, e, flush=True)
                        res[prof + '/' + mode + '/fatal'] = str(e)[:300]
                    json.dump(res, open(OUT, 'w'), ensure_ascii=False, indent=1)
            if SOAK:
                await soak(b, res)
    finally:
        p.terminate()
        json.dump(res, open(OUT, 'w'), ensure_ascii=False, indent=1)
asyncio.run(main())
