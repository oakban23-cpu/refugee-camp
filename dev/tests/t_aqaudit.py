"""ตรวจทางไปเควส: เดินออโต้เควสจริงทุกขั้นของเนื้อเรื่อง แล้วจดขั้นที่ไปไม่ถึง"""
import asyncio,random,json,sys,os
from h import *
NSEG=int(sys.argv[1]) if len(sys.argv)>1 else 6
TMO=int(sys.argv[2]) if len(sys.argv)>2 else 80
ONLY=[int(x) for x in sys.argv[3].split(',')] if len(sys.argv)>3 else None
OUT='../p6/aq'
os.makedirs(OUT,exist_ok=True)
INIT="""()=>{gmGod=true;window.DNH=12;setInterval(()=>{FQ.avg=0;LOWQ=false;mons=mons.filter(m=>m.t===3&&!isDg());if(SD.on&&!SD.choice&&window.__aqrun){window.__sd=1;stClose()}},150);return STY.length}"""
TGT="""([i])=>{const st=STY[i];me.sty=Object.assign({e:1,e4:2,p6h:2,e6:1,p7m:1},{s:i,n:0,a:(st.g==='talk'?0:1)});try{stInit()}catch(e){}AQ={src:'st',id:'',hb0:false,t:0,ev:0,sx:me.x,sy:me.y,st:0,det:0,gt:0,nt:0,hunt:0,key:'',msg:'',T:null};const T=aqTarget();AQ=null;
  return {g:st.g,k:st.k||'',m:st.m||0,tx:(st.tx||'').slice(0,60),T:T?JSON.parse(JSON.stringify(T)):null}}"""
GO="""([mp])=>{if(isDg())try{dgLeave()}catch(e){}const M=MAPS[mp];enterMap(mp,{x:M.sx||1600,y:(M.sy||1600)});ov.hidden=true;return curMap}"""
START="""([i])=>{const st=STY[i];me.sty=Object.assign({e:1,e4:2,p6h:2,e6:1,p7m:1},{s:i,n:0,a:(st.g==='talk'?0:1)});window.__si=i;window.__sd=0;window.__aqrun=1;window.__maps=[curMap];ov.hidden=true;aqStart('st');return !!AQ}"""
CHK="""([T])=>{if(window.__maps[window.__maps.length-1]!==curMap)window.__maps.push(curMap);const p={map:curMap,x:Math.round(me.x),y:Math.round(me.y),aq:!!AQ,msg:AQ&&AQ.msg||'',sd:window.__sd,dg:isDg(),maps:window.__maps.slice()};
  if(!T)return Object.assign(p,{ok:false});let ok=false;
  if(T.act==='talk'){ok=window.__sd===1||p.dg;if(!ok&&curMap===T.mp){const N=(curMap===9&&typeof CITY!=='undefined')?null:null;}}
  else if(T.act==='arrive'||T.act==='hunt'||T.act==='boss')ok=curMap===T.mp;
  else if(T.act==='reach')ok=curMap===T.mp&&Math.hypot(me.x-T.x,me.y-T.y)<95;
  else if(T.act==='calm')ok=true;else ok=curMap===T.mp;
  if(me.sty&&me.sty.s>window.__si)ok=true;return Object.assign(p,{ok})}"""
async def seg(b,steps,tag,res):
    A=await new_client(b,'Q'+tag+str(random.randint(100,999)),'melee',99)
    await A.ev(INIT)
    first=True
    for i in steps:
        info=await A.ev(TGT,[i]);T=info['T']
        r={'i':i,**info}
        if not T or T.get('none') or T.get('act')=='calm':
            r['skip']=1;res.append(r);print(tag,json.dumps(r,ensure_ascii=False),flush=True);continue
        if first:
            # เริ่มช่วงจากแมพของขั้นก่อนหน้า
            prev=await A.ev(TGT,[max(0,i-1)]);pm=(prev['T'] or {}).get('mp') or 1
            if pm>=10000 or pm<1:pm=1
            await A.ev(GO,[pm]);await A.wait(2500);first=False
        if await A.ev("()=>isDg()"):
            await A.ev("()=>{try{dgLeave()}catch(e){}}");await A.wait(2500)
        await A.ev(START,[i])
        t=0;last=None;still=0;p=None
        while t<TMO:
            await A.wait(1000);t+=1
            p=await A.ev(CHK,[T])
            if p['ok']:break
            pos=(p['map'],p['x']//20,p['y']//20)
            still=still+1 if pos==last else 0;last=pos
            if not p['aq'] and t>3:
                await A.ev("()=>{window.__aqrun=1;aqStart('st')}")
        r.update({'ok':p['ok'],'sec':t,'end':p})
        if not p['ok']:
            await A.pg.screenshot(path=f'{OUT}/fail_{i}.png')
        await A.ev("()=>{window.__aqrun=0;try{aqStop()}catch(e){}try{if(SD.on)stClose()}catch(e){}}")
        if p.get('dg'):
            await A.ev("()=>{try{dgLeave()}catch(e){}}");await A.wait(2500)
        res.append(r);print(tag,json.dumps(r,ensure_ascii=False),flush=True)
    await A.ctx.close()
async def main():
    p=start_server()
    try:
        await _main(p)
    finally:
        p.terminate()
async def _main(p):
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Qx','melee',99);n=await A.ev("()=>STY.length");await A.ctx.close()
        idx=ONLY or list(range(n))
        k=(len(idx)+NSEG-1)//NSEG;segs=[idx[j*k:(j+1)*k] for j in range(NSEG)]
        res=[]
        await asyncio.gather(*[seg(b,s,str(j),res) for j,s in enumerate(segs) if s])
        res.sort(key=lambda r:r['i'])
        json.dump(res,open('../aq_audit.json','w'),ensure_ascii=False,indent=0)
        bad=[r for r in res if not r.get('skip') and not r.get('ok')]
        print('TOTAL',len(res),'checked',len([r for r in res if not r.get('skip')]),'FAIL',len(bad))
        for r in bad:print('FAIL',r['i'],r['g'],r['k'],r['tx'],r['T'],r['end'])
        await b.close()
    p.terminate()
asyncio.run(main())
