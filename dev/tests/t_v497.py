"""v497 ดูดเลือด: ลิมิตเลือดที่ดูดได้ต่อวินาทีโตตามค่าดูดเลือด (4% + ดูดเลือด×0.1 สูงสุด 10%/วิ · นับส่วนที่เกิน 30%) · ตีจริงฟื้นตามลิมิต · หน้าสเตตัสแสดง"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
SHOT='../v497/'
HEAL="""async([ls,nom])=>{me.tr={};me.eq={w:{sl:'w',L:22,r:6,n:'t',st:ls?{ls:ls,dm:1}:{dm:1},u:ls>.3?20:0}};LSBC.t=-1e9;recalc();mons=[];
  const m={id:++mid,x:me.x+30,y:me.y,tx:me.x+30,ty:me.y,t:0,L:1,p:1,hx:me.x+30,hy:me.y,hp:1e13,mh:1e13,tg:null,tt:0,ac:0,w:null,lg:0};if(!nom)mons.push(m);
  await new Promise(r=>setTimeout(r,800));let v=me.lsB||0,healed=0;const D=Object.getOwnPropertyDescriptor(me,'lsB');Object.defineProperty(me,'lsB',{configurable:true,get(){return v},set(n){if(n<v)healed+=v-n;v=n}});
  me.inv.hp=0;me.hp=1;v=0;const t0=performance.now();await new Promise(r=>setTimeout(r,2500));const dt=(performance.now()-t0)/1000;delete me.lsB;me.lsB=v;mons=mons.filter(q=>q!==m);
  return {lu:lsUncapped(),cap:lsCapV(),mh:me.mh,healed,dt,perSec:healed/dt/me.mh,dps:pd()}}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ls'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;window.DNH=12;try{$('tipc').remove()}catch(e){};gmGod=true;me.ab={str:200};me.ach={};TTBC.k='';me.eq={};me.cslot=['',''];me.cmv='';cardRecalc();recalc()}")
        f=await A.ev("""()=>{const out=[];for(const ls of [0,.2,.43]){me.eq=ls?{w:{sl:'w',L:22,r:6,n:'t',st:{ls},u:0}}:{};LSBC.t=-1e9;const lu=lsUncapped(),c=lsCapV();out.push([+lu.toFixed(3),+c.toFixed(4),+Math.min(.1,.04+lu*.1).toFixed(4)])}
          me.eq={w:{sl:'w',L:22,r:6,n:'t',st:{ls:.43},u:30}};LSBC.t=-1e9;out.push([+lsUncapped().toFixed(3),+lsCapV().toFixed(4),.1,+M('ls').toFixed(3)]);me.eq={};LSBC.t=-1e9;return out}""")
        ok=all(abs(r[1]-r[2])<1e-6 for r in f) and f[0][1]>=0.04 and f[-1][1]==0.1 and f[-1][3]==0.3 and f[-1][0]>0.3
        rep('ลิมิตฟื้นต่อวินาที = 4% + ดูดเลือด×0.1 สูงสุด 10% · ดูดเลือดเกิน 30% ยังนับ (แต่ % ต่อฮิตยังตัด 30%)',ok,f)
        await A.ev("()=>{enterMap(2,{x:1600,y:1600})}");await A.wait(2500)
        await A.ev("()=>{mons=[];me.x=1600;me.y=900}");await A.wait(300)
        lo=await A.ev(HEAL,[0.2,0]);hi=await A.ev(HEAL,[0.43,0])
        rep('ตีจริง: เลือดที่ดูดได้ต่อวินาทีไม่เกินลิมิตใหม่ · ดูดเลือดสูงฟื้นได้เกิน 4%/วิ (ลิมิตเดิม)',lo['perSec']<=lo['cap']*1.08 and hi['perSec']<=hi['cap']*1.08 and hi['perSec']>0.06 and hi['cap']==0.1,{'lo':[round(lo['perSec'],4),round(lo['cap'],4)],'hi':[round(hi['perSec'],4),hi['cap']],'dps':hi['dps']})
        await A.ev("()=>{me.eq={w:{sl:'w',L:22,r:6,n:'t',st:{ls:.43},u:30}};LSBC.t=-1e9;recalc();charTab='ab';ov.dataset.k='char';treeUI();ov.hidden=false}");await A.wait(700)
        ui=await A.ev("()=>({chip:[...ov.querySelectorAll('.sk2top .ch')].map(c=>c.textContent).filter(t=>/ฟื้นจากดูดเลือด/.test(t)),note:[...ov.querySelectorAll('.capn div')].map(d=>d.textContent).filter(t=>/ดูดเลือด/.test(t))})")
        await A.pg.screenshot(path=SHOT+'stat_ls.jpg',quality=80)
        rep('หน้าสเตตัส: 💗 ฟื้นจากดูดเลือด 10%/วิ 🔒 + บรรทัดบอกว่าดูดเลือดที่เกินยังเพิ่มลิมิต',ui['chip'] and '10%' in ui['chip'][0] and ui['note'] and 'เพิ่มลิมิตฟื้นต่อวินาที' in ui['note'][0],ui)
        await A.ev("()=>{me.eq={};LSBC.t=-1e9;recalc();treeUI()}");await A.wait(300)
        ui2=await A.ev("()=>[...ov.querySelectorAll('.sk2top .ch')].map(c=>c.textContent).filter(t=>/ฟื้นจากดูดเลือด/.test(t))")
        rep('ไม่มีดูดเลือดจากของ → ลิมิตไม่ต่ำกว่าเดิม (≥ 4%/วิ)',ui2 and float(ui2[0].split('ฟื้นจากดูดเลือด')[1].split('%')[0])>=4,ui2)
        await A.ev("()=>{ov.hidden=true}")
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
