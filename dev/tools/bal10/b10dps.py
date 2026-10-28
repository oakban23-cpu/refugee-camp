"""DPS จริงต่อบอส (หุ่น t:3 เลือด 1e12 มึนตลอด · ในห้องดันฐานฟ้า) · 5 อาชีพ × โปรไฟล์
   python3 b10dps.py [profiles=L,M,H] [secs=20] [K=3] [classes]"""
import asyncio, sys, json, time
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from b10lib import *
PR = (sys.argv[1] if len(sys.argv) > 1 else 'L,M,H').split(',')
SEC = float(sys.argv[2]) if len(sys.argv) > 2 else 20
K = float(sys.argv[3]) if len(sys.argv) > 3 else 3
CLS = (sys.argv[4] if len(sys.argv) > 4 else 'melee,archer,mage,assn,sup').split(',')
DUM = r"""([sec])=>{const id=44000+(Math.random()*900|0);dgMap(id);enterMap(id,{x:CX,y:CY+170});ov.hidden=true;return id}"""
GO = r"""([sec])=>new Promise(res=>{mons.length=0;const x=CX,y=CY-60,m={id:++mid,x,y,tx:x,ty:y,t:3,L:168,p:1,hx:x,hy:y,hp:1e12,mh:1e12,tg:null,tt:0,ac:0,w:null,lg:0,a1:99,a2:99,tl:[],enr:0,stun:1e9,s1:1,s2:1,bt:1};mons.push(m);
  const C=CL[me.cls],rg=C.melee?26:Math.min(170,(C.rg+M('rg'))*.7);me.x=x;me.y=y+rg;me.hp=me.mh;me.mp=me.mm;for(let k=0;k<6;k++)me.sk[k]=0;me.down=0;
  AUTO.on=true;AUTO.sel={0:1,1:1,2:1,3:1,4:1,5:1};lockId=m.id;gmGod=true;joy=null;
  let D=0,N=0,CR=0,SK={};const od=dmgMon;window.dmgMon=dmgMon=function(i,d){if(i===m.id){D+=d}return od.apply(this,arguments)};
  const oa=addHit;window.addHit=addHit=function(mm,d,cr,lv,ck){if(mm===m){N++;if(cr)CR++;const k=(ck||'basic')+(lv?'/'+lv:'');SK[k]=(SK[k]||0)+1}return oa.apply(this,arguments)};
  const t0=performance.now();const iv=setInterval(()=>{try{m.stun=1e9;m.hp=1e12;m.x=x;m.y=y;m.tx=x;m.ty=y;mons.forEach(q=>{if(q!==m)q.hp=0});mons=mons.filter(q=>q===m||q.hp>0);
      const d=Math.hypot(me.x-x,me.y-y);if(d>rg+14){me.x=x;me.y=y+rg}if(me.mp<me.mm*.3&&me.inv.mp>0)try{usePot('mp')}catch(e){}if(SD.on)try{stClose()}catch(e){}lockId=m.id;
      const el=(performance.now()-t0)/1000;if(el>=sec){clearInterval(iv);window.dmgMon=dmgMon=od;window.addHit=addHit=oa;mons.length=0;res({dps:Math.round(D/el),hits:N,crit:N?Math.round(CR/N*100):0,sk:SK,el:Math.round(el*10)/10})}}catch(e){res({err:String(e)})}},50)})"""
async def run_cls(b, c, out):
    A = await new_client(b, 'Bd' + c[:3], c, 99)
    await A.ev(TSCALE_JS, [K])
    for pn in PR:
        st = await A.ev(PROF_JS, [prof(pn, c)])
        await A.ev(DUM, [SEC]); await A.wait(int(1500 / K) + 300)
        await A.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        r = await A.ev(GO, [SEC])
        row = dict(cls=c, prof=pn, mh=st['mh'], pd=st['pd'], cd=st['cd'], fd=st['fd'], **r)
        out.append(row); print(json.dumps(row, ensure_ascii=False), flush=True)
    await A.ctx.close()
async def main():
    p = start_server(); out = []
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            for c in CLS:
                await run_cls(b, c, out)
    finally:
        p.terminate()
    json.dump(out, open(f'b10dps_{"".join(PR)}.json', 'w'), ensure_ascii=False)
if __name__=="__main__": asyncio.run(main())
