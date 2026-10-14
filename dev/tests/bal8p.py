import asyncio,json,sys
from playwright.async_api import async_playwright
import os;exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'bal8_parts.py')).read())
U='file:///home/claude/refugee-online/public/index.html'
ST=float(sys.argv[2]) if len(sys.argv)>2 else 15
GU=int(sys.argv[3]) if len(sys.argv)>3 else 15
P57=['stCa','stP5','p5mem','stEs','stMk','stAr','stCk','stP6','stS1','stS2','stS3','stS4','stS5','stP7']
CHK=[(27,110),(30,114),(34,124),(36,132)]
TIT=r"""([full,P57])=>{me.ach={};Object.keys(TTB).forEach(id=>{if(full||!P57.includes(id))me.ach[id]=1});TTBC.k='';recalc();me.hp=me.mh;me.mp=me.mm;
  return {mh:me.mh,pd:Math.round(pd()),dm:+M('dm').toFixed(2),hpM:+M('hp').toFixed(2),cr:+crC().toFixed(2),cd:+crD().toFixed(2),red:+M('red').toFixed(3),ls:+M('ls').toFixed(3)}}"""
EQ2=r"""([sid,L,R,GU])=>{let s=4242;const R0=Math.random;Math.random=()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648};
  try{['w','a','c','h','b'].forEach(sl=>{const it=genItem(L,sl,R,R);it.ss=sid||undefined;it.lk=1;it.u=GU;me.eq[sl]=it})}finally{Math.random=R0}recalc();me.hp=me.mh;return 1}"""
TIT2=r"""([ts,P57,P5T])=>{me.ach={};Object.keys(TTB).forEach(id=>{const p57=P57.includes(id);if(ts==='all'||!p57||(ts==='p5'&&P5T.includes(id)))me.ach[id]=1});TTBC.k='';recalc();me.hp=me.mh;me.mp=me.mm;
  return {mh:me.mh,pd:Math.round(pd()),dm:+M('dm').toFixed(2),cr:+crC().toFixed(2),cd:+crD().toFixed(2),red:+Math.min(.6,M('red')).toFixed(2),sets:setCount(6)}}"""
GO=r"""([mp])=>{enterMap(mp,{x:MAPS[mp].sx||1600,y:(MAPS[mp].sy||300)+200});ov.hidden=true;return curMap}"""
SPAWN=r"""([n,att,L])=>{const keep=m=>m.bt||m.__a;mons.length=0;const cx=me.x,cy=me.y-60;
  for(let i=0;i<n;i++){const a=i/n*6.283,d=n>1?55:0,x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.7,t=att?[0,0,1,1,2,2][i%6]:4;
    const m={id:++mid,x,y,tx:x,ty:y,t,L:att?L:62,p:att?1:0,hx:x,hy:y,hp:1e12,mh:1e12,tg:null,tt:0,ac:0,w:null,lg:0};if(att){m.__a=1;m.shb=1;m.szb=1;m.elb=1}else{m.bt=1;m.sp0=1}mons.push(m)}
  const C=CL[me.cls],rg=C.melee?28:Math.min(140,C.rg*.6);me.x=cx;me.y=cy+rg+(n>1?55*.7:0);me.inv.hp=0;
  if(window._pin)clearInterval(window._pin);
  window._pin=setInterval(()=>{for(let i=mons.length-1;i>=0;i--)if(!keep(mons[i]))mons.splice(i,1);if(!mons.length)return;AUTO.on=true;AUTO.sel={0:1,1:1,2:1,3:1,4:1};
    mons.forEach(m=>{if(m.sp0){m.x=m.hx;m.y=m.hy;m.tx=m.hx;m.ty=m.hy}if(m.hp<1e11){m.hp=1e12}});
    let b=null,bd=1e9;mons.forEach(m=>{const d=Math.hypot(m.x-me.x,m.y-me.y);if(d<bd){bd=d;b=m}});
    if(b&&bd>rg+12){const a=Math.atan2(me.y-b.y,me.x-b.x);me.x=b.x+Math.cos(a)*rg;me.y=b.y+Math.sin(a)*rg}
    if(me.mp<me.mm*.3&&(me.inv.mp|0)>0)try{usePot('mp')}catch(e){}
    try{if(SD.on)stClose()}catch(e){}SKL=null;SKA=null;
    if(me.down>0){window.DEATHS++;me.down=0;me.hp=me.mh}},200);
  window.DMG=0;window.T0=performance.now();
  if(!window._dmw2){window._dmw2=1;const o=dmgMon;dmgMon=function(i,d){if(mons.some(m=>m.id===i&&m.bt))DMG+=d;return o(i,d)}}
  if(!window._hw){window._hw=1;const oh=hurt;hurt=function(d){const h0=me.hp;const r=oh(d);if(me.hp<h0)TAKEN+=h0-me.hp;return r}}
  window.TAKEN=0;window.DEATHS=0;gmGod=!att;return 1}"""
async def runcls(b,cls):
    pg=await (await b.new_context(viewport={'width':412,'height':860})).new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)[:200]))
    await pg.goto(U);await pg.wait_for_timeout(1500)
    await pg.evaluate(SETUP,[cls,1,99,22,5,GU]);await pg.wait_for_timeout(400)
    out=[]
    P5T=['stCa','stP5','p5mem']
    PROF=[('A',20,4,10,0,'pre'),('B',22,5,15,0,'p5'),('C',22,5,20,6,'all')]
    for pn,GL_,GR_,GU_,SID,tset in PROF:
        await pg.evaluate(EQ2,[SID,GL_,GR_,GU_])
        for mp,L in CHK:
            full=tset
            await pg.evaluate(GO,[mp]);await pg.wait_for_timeout(1800)
            info=await pg.evaluate(TIT2,[tset,P57,P5T])
            res={'cls':cls,'prof':pn,'map':mp,'L':L,**info}
            for key,n,att in [('st',1,0),('surv',6,1)]:
                await pg.evaluate("()=>{for(let k=0;k<5;k++)me.sk[k]=0;me.hp=me.mh;me.mp=me.mm}")
                await pg.evaluate(SPAWN,[n,att,L]);await pg.wait_for_timeout(int(ST*1000))
                r=await pg.evaluate("()=>{const s=(performance.now()-T0)/1000;return [DMG/s,TAKEN/s,DEATHS,mons.filter(m=>m.__a).map(m=>m.dmx||1)[0]||1]}")
                if att: res['dtps']=round(r[1]);res['deaths']=r[2];res['dmx']=r[3]
                else: res['dps']=round(r[0])
            res['mobHP']=await pg.evaluate("([mp,L])=>{const T=TIER[mp];return Math.round([0,1,2].map(t=>mhp(t,L)).reduce((a,b)=>a+b,0)/3*T[0])}",[mp,L])
            res['ttk']=round(res['mobHP']/max(1,res['dps']),2);res['ttd']=round(res['mh']/max(1,res['dtps']),1)
            out.append(res);print(json.dumps(res,ensure_ascii=False),flush=True)
    if errs:print(cls,'ERR',errs[:3])
    return out
async def main():
    which=sys.argv[1].split(',') if len(sys.argv)>1 else ['melee','archer','mage','assn','sup']
    async with async_playwright() as p:
        b=await p.chromium.launch()
        R=await asyncio.gather(*[runcls(b,c) for c in which])
        json.dump(R,open('bal8_prof.json','w'),ensure_ascii=False)
        await b.close()
asyncio.run(main())
