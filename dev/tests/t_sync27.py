"""v401: เพื่อนในห้องเห็นเอฟเฟกต์รูนใหม่ถูกต้อง (ไม่ซ้อน 2 ชั้น · พายุนิ่งอยู่กับที่ · วงฟื้นฟูฮีลเพื่อนตามค่ารูน)"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CASES={'melee':[('B2',4,'a'),('B2',4,'b'),('A3',5,''),('A3',5,'a'),('A3',5,'b'),('B3',5,'a'),('B3',5,'b')],
       'archer':[('B2',4,'a'),('B2',4,'b'),('A3',5,'a'),('A3',5,'b'),('B3',5,'a'),('B3',5,'b')],
       'sup':[('A3',5,''),('A3',5,'a'),('A3',5,'b'),('B3',5,'a'),('B3',5,'b')],
       'assn':[('A3',5,'a'),('A3',5,'b'),('B3',5,'a'),('B3',5,'b')],
       'mage':[('A3',5,'a'),('A3',5,'b'),('B3',5,'a'),('B3',5,'b')]}
BR={'B2':'me.cls2=1;me.br=2;me.rb=0','A3':'me.cls2=1;me.br=1;me.rb=1','B3':'me.cls2=1;me.br=2;me.rb=1'}
KS="['s6sw','s6gd','s6rg','s6ln','s6bw','s6ob','s6im','s6st','s6cl','s6ch','s6ar','torn','r27sum','r27x','r27rf','r27cd','r27hl','r27ln','roar','golem','shadow','bash','stun','taunt','bdash','bstrm','seal','soulx','heal']"
async def main():
    only=sys.argv[1:] or list(CASES)
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        B=await new_client(b,'Obs','melee',99)
        for cls in only:
            A=await new_client(b,'Cast'+cls[:3],cls,99)
            for c in (A,B): await c.ev("()=>{ov.hidden=true;const N=MAPS[2].nests[0];enterMap(2,{x:N[0]-120,y:N[1]+40})}")
            await A.wait(3500)
            await A.ev("()=>{AUTO.on=false;AUTO.sel={0:0,1:0,2:0,3:0,4:0,5:0};setInterval(()=>{me.mp=me.mm},200)}")
            await B.ev("()=>{AUTO.on=false;AUTO.sel={0:0,1:0,2:0,3:0,4:0,5:0}}")
            for c in (A,B): await c.ev("()=>{clearInterval(window.__imI);window.__imI=setInterval(()=>mons.forEach(m=>{if(m.t<3){m.mh=Math.max(m.mh,9e8);m.hp=m.mh}}),100)}")
            for _ in range(16):
                if A.uid in await B.ev("()=>Object.keys(others)"): break
                await A.wait(500)
            for st,k,e in CASES[cls]:
                await A.ev("()=>{%s;applyBr();try{applyS6()}catch(e){}}"%BR[st])
                pos=await A.ev("()=>{const m=mons.filter(q=>q.t<3&&q.hp>0).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];if(!m)return null;me.x=m.x-90;me.y=m.y;me.face=0;lockId=m.id;return [me.x,me.y]}")
                if not pos: rep(f'{cls} {st}{k}{e}: monster near',False);continue
                await B.ev("(p)=>{me.x=p[0]-20;me.y=p[1]+30;fxs.length=0;fields.length=0;S6RG.length=0;me.hp=Math.round(me.mh*.4)}",pos)
                await A.wait(1500)
                await B.ev("()=>{fxs.length=0;fields.length=0;S6RG.length=0;me.hp=Math.round(me.mh*.4);window.__hp0=me.hp;window.__mx={}}")
                await B.ev("(KS)=>{clearInterval(window.__mI);window.__mI=setInterval(()=>{const c={};fxs.forEach(f=>{if(KS.indexOf(f.k)>=0)c[f.k]=(c[f.k]||0)+1});for(const q in c)__mx[q]=Math.max(__mx[q]||0,c[q])},60)}",eval(KS))
                a=await A.ev(f"()=>{{const S=rnSt(),R=RUNES[me.cls][{k}];['a','b'].forEach(q=>S.u[R[q][0]]=1);S.e[{k}]='{e}';me.sk[{k}]=0;useSkill({k});return {{cd:+(+me.sk[{k}]).toFixed(1),fx:fxs.map(f=>f.k).join(',')}}}}")
                await A.wait(1200)
                ob=await B.ev("()=>({mx:__mx,torn:fields.filter(f=>f.k==='torn').map(f=>[Math.round(f.x),Math.round(f.y),f.sp]),rg:S6RG.map(r=>[r.t.toFixed(1),r.r,r.hp,r.nr]),big:fxs.filter(f=>f.k==='s6im'&&f.big).length})")
                tag=f'{cls} {st} slot{k} rune {e or "-"}'
                # ไม่ซ้อน: ไม่มีชนิดที่ควรมี 1 อันแต่เห็น 2
                dup={q:v for q,v in ob['mx'].items() if q in('s6sw','s6bw','s6ob','s6rg','r27rf','r27cd','r27hl','r27ln','r27sum') and v>1}
                rep(tag+': เพื่อนเห็นเอฟเฟกต์', bool(ob['mx']) and a['cd']>0, json.dumps(ob['mx'])+' A:'+json.dumps(a))
                if dup: rep(tag+': ไม่ซ้อน 2 ชั้น', False, json.dumps(dup))
                if cls=='archer' and st=='B2' and e=='b':
                    t1=ob['torn'];await B.wait(1500);t2=await B.ev("()=>fields.filter(f=>f.k==='torn').map(f=>[Math.round(f.x),Math.round(f.y),f.sp])")
                    rep(tag+': พายุนิ่งอยู่กับที่ฝั่งเพื่อน', bool(t1) and bool(t2) and abs(t1[0][0]-t2[0][0])<10, f'{t1} -> {t2}')
                if cls=='sup' and st=='A3':
                    await B.wait(2500);hp=await B.ev("()=>({d:+((me.hp-__hp0)/me.mh*100).toFixed(1),rg:S6RG.map(r=>[r.r,r.hp,r.nr]),dr:me.s6rT>0})")
                    exp={'':(.02,0),'a':(.04,1),'b':(.01,0)}[e]
                    okv=bool(hp['rg']) and abs(hp['rg'][0][1]-exp[0])<1e-6 and hp['rg'][0][2]==exp[1]
                    rep(tag+f': เพื่อนได้ฮีล {exp[0]*100:.0f}%/วิ ลดดาเมจ={"ไม่" if exp[1] else "ใช่"}', okv and hp['d']>0 and hp['dr']==(not exp[1]), json.dumps(hp))
                await A.wait(3500 if (cls in('sup','assn','melee') and st!='B2') else 1500)
            errs=A.errs+B.errs;rep(f'{cls}: ไม่มี error ทั้งสองเครื่อง', not [x for x in errs if 'favicon' not in x and 'ERR_' not in x], str(errs[:3]))
            A.errs.clear();B.errs.clear();await A.ctx.close()
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally:
        p.terminate()
asyncio.run(main())
