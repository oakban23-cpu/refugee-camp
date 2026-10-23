"""v493 นับงานต่อเฟรม (โหมดประหยัด จอ A55): คำสั่งวาดแคนวาสแยกชนิด · ข้อความ · DOM ที่เปลี่ยนต่อวินาที (แยก element) · CSS animation ที่วิ่งอยู่ · interval/timeout ที่ทำงาน"""
import asyncio, sys, json, os, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
GQ=os.environ.get('GQ','low')
INST="""()=>{if(window.__ci)return;window.__ci={c:{},on:0,mut:{},mn:0,tm:{},sn:0,by:{},by1:{}};const P=CanvasRenderingContext2D.prototype,C=window.__ci;
  for(const k of Object.getOwnPropertyNames(P)){const d=Object.getOwnPropertyDescriptor(P,k);if(!d||typeof d.value!=='function'||k==='constructor')continue;const f=d.value;
    P[k]=function(){if(C.on&&this===g){C.c[k]=(C.c[k]||0)+1;if(++C.sn%23===0){const L=new Error().stack.split(String.fromCharCode(10));const fr=[];for(let i=2;i<L.length&&fr.length<3;i++){const m=/at (?:new )?([^ (]+)/.exec(L[i]);if(m&&!/^(Object\.|Array\.|eval|<anonymous>)/.test(m[1]))fr.push(m[1])}const key=fr.join(' < ');C.by[key]=(C.by[key]||0)+23;const f1=fr[0]||'?';C.by1[f1]=(C.by1[f1]||0)+23}}else if(C.on)C.c['off:'+k]=(C.c['off:'+k]||0)+1;return f.apply(this,arguments)}}
  window.__ciMut=()=>new MutationObserver(L=>{if(!C.on)return;for(const m of L){C.mn++;let e=m.target.nodeType===1?m.target:m.target.parentElement;let id='';for(let q=e,d=0;q&&d<6;q=q.parentElement,d++){if(q.id){id=q.id;break}}const k=(id||'?')+':'+m.type+(m.attributeName?'.'+m.attributeName:'');C.mut[k]=(C.mut[k]||0)+1}}).observe(document.body,{subtree:true,childList:true,attributes:true,characterData:true});
  const si=window.setInterval,st=window.setTimeout;window.setInterval=function(fn,ms){const k='iv'+ms+':'+String(fn).slice(0,60);const w=function(){const t0=performance.now();try{return fn.apply(this,arguments)}finally{if(C.on){const o=C.tm[k]||(C.tm[k]={n:0,ms:0});o.n++;o.ms+=performance.now()-t0}}};return si.call(window,w,ms)};
}"""
RUN="""(ms)=>new Promise(r=>{const C=window.__ci;C.c={};C.mut={};C.mn=0;C.tm={};C.by={};C.by1={};let n=0;C.on=1;const t0=performance.now();function f(t){n++;if(t-t0<ms)requestAnimationFrame(f);else{C.on=0;
  const per=o=>Object.entries(o).map(([k,v])=>[k,+(v/n).toFixed(1)]).sort((a,b)=>b[1]-a[1]);const tot=Object.entries(C.c).filter(([k])=>!k.startsWith('off:')).reduce((a,[,v])=>a+v,0);
  const an=document.getAnimations().filter(a=>a.playState==='running').map(a=>{const e=a.effect&&a.effect.target;let d='';if(e){d=(e.id?'#'+e.id:e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.split(' ')[0]:''))+(e.offsetParent===null?'(hidden)':'')}return (a.animationName||a.constructor.name)+'@'+d});
  const sec=ms/1000;r({frames:n,fps:+(n/sec).toFixed(1),calls:+(tot/n).toFixed(0),top:per(C.c).slice(0,22),mutPerSec:+(C.mn/sec).toFixed(0),mut:Object.entries(C.mut).map(([k,v])=>[k,+(v/sec).toFixed(1)]).sort((a,b)=>b[1]-a[1]).slice(0,22),anim:an.length,animL:an.slice(0,40),
    by:per(C.by).slice(0,30),by1:per(C.by1).slice(0,30),iv:Object.entries(C.tm).map(([k,o])=>[k,+(o.ms/sec).toFixed(2),+(o.n/sec).toFixed(1)]).sort((a,b)=>b[1]-a[1]).slice(0,14)})}}requestAnimationFrame(f)})"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        await ctx.add_init_script("try{localStorage.setItem('refugee_gq','%s')}catch(e){}"%GQ)
        await ctx.add_init_script('('+INST+')()')
        pg=await ctx.new_page();M=Client(ctx,pg,'M');pg.on('pageerror',lambda e:M.errs.append(str(e)[:200]))
        await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','Ins'+str(random.randint(10,99)),60]);await pg.wait_for_timeout(1500)
        await M.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}")
        await M.ev("()=>window.__ciMut()");await M.wait(2000)
        if os.environ.get('HDLOW'):
            await M.ev("()=>{HD=function(){return HDI.on&&HDI.ok===1&&curMap===9};HDB=function(){return HD()&&HDI.ok2===1};fortHD=function(){return HDI.on&&FHI.ok===1};campHD=function(){return HDI.on&&CHI.ok===1};try{hdLoad()}catch(e){};try{hdbLoad()}catch(e){};try{fhdLoad()}catch(e){};try{chdLoad()}catch(e){}}")
            await M.wait(3000)
        R={}
        await M.ev("()=>{me.x=1600;me.y=1700}");await M.wait(1500);R['camp']=await M.ev(RUN,4000)
        await M.ev("()=>{enterMap(13,{x:1100,y:1900})}");await M.wait(3500);await M.ev("()=>{AUTO.on=true}");await M.wait(3000);R['field']=await M.ev(RUN,4000)
        await M.ev("()=>{AUTO.on=false;enterMap(9,{x:1600,y:1700})}");await M.wait(4000);R['city']=await M.ev(RUN,4000)
        for k,v in R.items():
            print('\n=====',k,'frames',v['frames'],'fps',v['fps'],'canvas calls/frame',v['calls'],'DOM mut/s',v['mutPerSec'],'running CSS anims',v['anim'])
            print('  canvas:',' · '.join(f'{a} {b}' for a,b in v['top']))
            print('  DOM mut/s:',' · '.join(f'{a} {b}' for a,b in v['mut']))
            print('  anims:',' | '.join(v['animL']))
            print('  by caller (calls/frame):');[print('     ',b,a) for a,b in v['by1']]
            print('  by stack:');[print('     ',b,a) for a,b in v['by'][:20]]
            print('  intervals (ms/s, n/s):',' | '.join(f'{a[:70]} {b} {c}' for a,b,c in v['iv']))
        print('errs',M.errs[:3])
    finally: p.terminate()
asyncio.run(main())
