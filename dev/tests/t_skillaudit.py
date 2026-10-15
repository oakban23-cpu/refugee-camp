import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP0=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0]
SETUP=SETUP0.replace("setInterval(()=>{me.hp=me.mh;me.mp=me.mm;me.down=0;dn.length=0},30);","")
assert SETUP!=SETUP0
CLS=sys.argv[1].split(',');WAIT=int(sys.argv[2]) if len(sys.argv)>2 else 6500
STATES={'base':('me.cls2=0;me.br=0;me.rb=0',[('2','')]),
 'A2':('me.cls2=1;me.br=1;me.rb=0',[(k,e) for k in '01342' for e in ['','a','b']]),
 'B2':('me.cls2=1;me.br=2;me.rb=0',[(k,e) for k in '42' for e in ['','a','b']]),
 'A3':('me.cls2=1;me.br=1;me.rb=1',[(k,e) for k in '52' for e in ['','a','b']]),
 'B3':('me.cls2=1;me.br=2;me.rb=1',[(k,e) for k in '52' for e in ['','a','b']])}
PREP="""()=>{try{terMons=function(){};terGet=function(){return null}}catch(e){}
 window.__H=[];window.__F=[];if(!window.__hk){window.__hk=1;const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv)__H.push([performance.now()|0,+d,m.id,ck||'',lv,cr?1:0]);return _a.apply(this,arguments)};
  const _f=fx;fx=function(o){try{__F.push([performance.now()|0,o.k,o.r|0,+(o.dur||0),o.v!=null?+o.v:null])}catch(e){}return _f.apply(this,arguments)};
  setInterval(()=>{if(!window.__BX)return;let i=0;for(const m of mons){if(m.t>=3){m.x=-9999;m.y=-9999;continue}if(i>=10){m.x=-9999;m.y=-9999;continue}const P=[[70,-18],[90,18],[120,-12],[150,16],[180,-16],[210,12],[240,-10],[280,14],[-70,0],[0,90]][i];if(!m.__p){m.__p=1;m.x=__BX+P[0];m.y=__BY+P[1]}m.tx=m.x;m.ty=m.y;m.mh=9e9;if(m.hp<1e9)m.hp=9e9;m.sp=0;i++}},25)}
 return 1}"""
SNAPME="()=>{const o={};for(const k in me){const v=me[k];if(typeof v==='number'||typeof v==='boolean')o[k]=+v;else if(v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length<12&&['clone','clone2','mark','rnSpin','dg','pull','cast'].includes(k))o[k]=JSON.stringify(v).slice(0,120)}return o}"
SNAPM="()=>mons.filter(m=>m.x>-9000&&m.t<3).map(m=>{const o={id:m.id,x:Math.round(m.x-__BX),y:Math.round(m.y-__BY)};for(const k of ['root','sl','stun','stn','frz','pull','taunt','tg','fear','kb','sil','vul','curse','burn','poison','psn','bleed']){if(m[k]!=null&&m[k]!==0&&m[k]!==false)o[k]=typeof m[k]==='number'?+m[k].toFixed(2):String(m[k]).slice(0,20)}const V=typeof RXV!=='undefined'&&RXV[m.id];if(V)o.rxv=Object.keys(V).join(',');if(typeof CURSE!=='undefined'&&CURSE[m.id])o.curse=CURSE[m.id].n;if(typeof RVUL!=='undefined'&&RVUL[m.id]>performance.now())o.vul=1;return o})"
async def one(pg,state,k,e):
    k=int(k)
    await pg.evaluate("""(a)=>{const [k,e]=a;fxs.length=0;try{fields.length=0}catch(x){}try{zones.length=0}catch(x){}try{RZ=[]}catch(x){}try{pend.length=0}catch(x){}
      me.rnSpin=null;me.mark=null;me.clone=null;me.clone2=null;me.rage=0;me.stealth=0;me.bst=0;me.inv3=0;me.shv=0;me.shield=0;
      me.x=1500;me.y=1500;me.face=0;window.__BX=1500;window.__BY=1500;mons.forEach(m=>{m.__p=0});me.hp=Math.round(me.mh*.5);me.mp=me.mm;for(let i=0;i<6;i++)me.sk[i]=0;
      const S=rnSt();for(const kk in RUNES[me.cls]){const R=RUNES[me.cls][kk];['a','b'].forEach(q=>{if(R[q])S.u[R[q][0]]=1})}for(let i=0;i<6;i++)S.e[i]='';S.e[k]=e;try{sgSt().l={}}catch(x){}
      AUTO.on=false;lockId=null}""",[k,e])
    await pg.wait_for_timeout(250)
    await pg.evaluate("()=>{const f=mons.filter(m=>m.x>me.x+20&&m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];lockId=f?f.id:null}")
    pre=await pg.evaluate(SNAPME)
    r0=await pg.evaluate(f"""()=>{{__H=[];__F=[];const P=1+M('s{k}p')+skPow({k}),pdv=pd(),mp0=me.mp,hp0=me.hp,x0=me.x,y0=me.y;window.__t0=performance.now();useSkill({k});
       return {{P:+P.toFixed(3),pd:+pdv.toFixed(1),mp:Math.round(mp0-me.mp),cd:+(me.sk[{k}]||0).toFixed(2),dx:Math.round(me.x-x0),dy:Math.round(me.y-y0),name:skName({k}),cdBase:CL[me.cls].cds[{k}],mcBase:CL[me.cls].mc[{k}],rnPow:rnPow({k}),cast:me.cast?me.cast.ty:''}}}}""")
    await pg.wait_for_timeout(180)
    me1=await pg.evaluate(SNAPME);m1=await pg.evaluate(SNAPM)
    await pg.wait_for_timeout(1200)
    me2=await pg.evaluate(SNAPME);m2=await pg.evaluate(SNAPM)
    await pg.wait_for_timeout(WAIT-1380)
    fin=await pg.evaluate("()=>({H:__H.map(h=>[h[0]-(__t0|0),...h.slice(1)]),F:__F.map(f=>[f[0]-(__t0|0),...f.slice(1)]),hp:Math.round(me.hp),mh:me.mh,fields:(typeof fields!=='undefined'?fields.map(f=>f.k+':'+(+f.t).toFixed(1)):[])})")
    dme=lambda a,b:{kk:[a.get(kk),b[kk]] for kk in b if a.get(kk)!=b[kk] and kk not in ('x','y','mp','hp','atkT','cbT','face','sk','t','manT','vx','vy','lastHit','rx','ry','anim','combo','cmb','ak','atkN','fx','walk','ph','mv','dgCd','hpR','regT','pdg','idle','lgAs')}
    return dict(state=state,k=k,e=e,**r0,me150=dme(pre,me1),me1400=dme(pre,me2),mon150=m1,mon1400=m2,**fin)
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch();res=[]
        for c in CLS:
            pg=await (await b.new_context(viewport={'width':400,'height':800})).new_page();errs=[]
            pg.on('pageerror',lambda er:errs.append(str(er)[:200]))
            await pg.goto('file:///mnt/user-data/outputs/refugee-online/public/index.html');await pg.wait_for_timeout(2300)
            await pg.evaluate(SETUP,[c,2]);await pg.wait_for_timeout(600);await pg.evaluate(PREP)
            for st,(js,casts) in STATES.items():
                await pg.evaluate("()=>{"+js+";try{applyBr();applyS6()}catch(e){}}")
                for k,e in casts:
                    try:r=await one(pg,st,k,e)
                    except Exception as ex:r={'state':st,'k':k,'e':e,'err':str(ex)[:200]}
                    r['cls']=c;r['errs']=errs[:];errs.clear();res.append(r)
                    print(c,st,k,e,r.get('name'),'hits',len(r.get('H',[])),flush=True)
            await pg.context.close()
        json.dump(res,open('meas_'+'_'.join(CLS)+'.json','w'),ensure_ascii=False)
asyncio.run(main())
