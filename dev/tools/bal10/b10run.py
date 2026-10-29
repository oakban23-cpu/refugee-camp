"""v553 เล่นดันจริงด้วยบอท (วัดความยาก)
   python3 b10run.py DG CLS[,CLS..] PROF [K=3] [VAR=1] [LIMIT=1500]
   DG = ptd | pnq | pfn | wvr | gdl | wbl | wsk | ctw | cwn (v560) · หลายอาชีพ = ปาร์ตี้ (คนแรกเป็นหัวหน้า/โฮสต์)
   VAR: pfn 1=พันธมิตรแบบ 1 ทั้งหมด · 2=แบบ 2 ทั้งหมด · wvr 1=q9=1 e8=2 (ยาก) · 2=q9=2 e8=1 (ง่าย)
   env: BOTCFG='{"dodge":.7,...}' ปรับนโยบายบอท"""
import asyncio, sys, json, time, os, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from b10lib import *
DG = sys.argv[1]; CLS = sys.argv[2].split(','); PR = sys.argv[3]
K = float(sys.argv[4]) if len(sys.argv) > 4 else 3
VAR = int(sys.argv[5]) if len(sys.argv) > 5 else 1
LIMIT = float(sys.argv[6]) if len(sys.argv) > 6 else 1500
BOTJS = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'b10bot.js'), encoding='utf-8').read()
CFG = json.loads(os.environ.get('BOTCFG', '{}'))
# v562: ดันอื่นใช้ชื่อตามแบบ XEnter / XStart / XI (เช่น clk → clkEnter clkStart CLKI)
ENTER = DG + 'Enter'
START = DG + 'Start'
INQ = {'echo': 'ECHO', 'eye': 'EYE', 'queen': 'QUEEN'}.get(DG, DG.upper() + 'I')
def story():
    v = VAR
    if DG == 'pfn':
        return {'e': v, 'e4': v, 'e6': v, 'e7': v, 'p7m': v, 'p8g': v, 'e8': v, 'e9': v, 'q9': 1, 'e10': 0}
    if DG in ('wvr', 'cwn'):
        return {'q9': 1 if v == 1 else 2, 'e8': 2 if v == 1 else 1, 'e': 1, 'e4': 1, 'e6': 1, 'e7': 1, 'p7m': 1, 'p8g': 1}
    return {'e': 1, 'e4': 1, 'e6': 1, 'e7': 1, 'p7m': 1, 'p8g': 1, 'e8': 1, 'e9': 1}
async def main():
    p = start_server(); res = {'dg': DG, 'cls': CLS, 'prof': PR, 'K': K, 'var': VAR}
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            Cs = []
            for i, c in enumerate(CLS):
                A = await new_client(b, ('Bh' if i == 0 else 'Bm') + str(i) + c[:2] + str(random.randint(10, 99)), c, 99)
                await A.ev("()=>{window.DNH=12;LOWQ=true;try{AUTO.on=false}catch(e){}}")
                st = await A.ev(PROF_JS, [prof(PR, c)])
                sty = story(); sty.update({'s': 0, 'n': 0, 'a': 0})
                await A.ev(f"()=>{{me.gold=1e8;me.sty=Object.assign(me.sty||{{}},{json.dumps(sty)});me.sty.s=STY.length;}}")
                await A.ev(BOTJS)
                A.prof = st; Cs.append(A)
            H = Cs[0]
            if len(Cs) > 1:
                for A in Cs[1:]:
                    await H.ev(f"()=>ptInvite('{A.uid}')"); await A.wait(1200); await A.ev("()=>ptAccept()"); await A.wait(1500)
                res['pty'] = await H.ev("()=>PTY?PTY.mem.length:0")
            if os.environ.get('NM'):
                PTJ = "PTY&&PTY.mem.length>1?{mem:PTY.mem.map(m=>m.u),lead:uid}:null"
                res['nm'] = await H.ev(f"()=>{{const c=nmArm('{DG}',{int(os.environ['NM'])},{PTJ});if(c&&c.pt)nmBc();return c&&[c.L,c.mods,+c.hpf.toFixed(2),+c.dmf.toFixed(2),c.pt?c.pt.mem.length:1]}}")
            await H.ev(f"()=>{{{ENTER}()}}"); await H.wait(2500)
            rid = await H.ev("()=>curMap"); res['room'] = rid
            if os.environ.get('FIX66'):
                k = {'wvr': 31, 'ctw': 29, 'cwn': 30, 'gdl': 26, 'wbl': 27, 'wsk': 28}.get(DG)
                if k:
                    res['fix66'] = await H.ev(f"()=>{{DT[{k}].dm=Math.round(DT[{k}].dm*3*66);return DT[{k}].dm}}")
            for A in Cs[1:]:
                await A.ev(f"()=>{{dgJoin({rid});if(curMap!=={rid})dgEnter({rid})}}"); await A.wait(2500)
            await H.wait(1500)
            if os.environ.get('NM'):
                res['nmm'] = [await A.ev("()=>typeof NFC!=='undefined'&&NFC?[NFC.L,NFC.cr,NFC.void,NFC.pt?NFC.pt.mem.length:1]:null") for A in Cs]
            for A in Cs:
                await A.ev(TSCALE_JS, [K])
            for i, A in enumerate(Cs):
                cfg = dict(CFG); cfg.update({'rank': i, 'np': len(Cs)})
                await A.ev(f"()=>{{BOT.reset();Object.assign(BOT.cfg,{json.dumps(cfg)});BOT.on=true;me.hp=me.mh;me.mp=me.mm}}")
            res['np'] = await H.ev("()=>plCount()")
            await H.ev(f"()=>{{{START}()}}")
            t0 = time.time(); last = 0
            while True:
                await H.wait(4000)
                s = await H.ev(f"()=>[BOT.t,BOT.st.end,dg.ph,{INQ}(),(mons.find(m=>m.t===3&&m.hp>0)||{{}}).hp||0,BOT.err]")
                if s[1] or s[2] in ('win', 'fail') or not s[3] or s[0] > LIMIT:
                    break
                if time.time() - last > 60:
                    last = time.time(); print('  ..', round(s[0]), s[2], round(s[4]), s[5][:200] if s[5] else '', flush=True)
                    if os.environ.get('SHOT'):
                        os.makedirs('b10out/shots', exist_ok=True)
                        for j, A in enumerate(Cs[:2]):
                            await A.pg.screenshot(path=f"b10out/shots/{DG}_{PR}_{CLS[j]}_{int(s[0])}.jpg", type='jpeg', quality=60)
            await H.wait(1500)
            out = []
            for A in Cs:
                r = await A.ev("()=>{const S=BOT.st;return {cls:me.cls,mh:me.mh,host:isHost(),t:Math.round(BOT.t),end:S.end,deaths:S.deaths,revives:S.revives,pots:S.pots,mpots:S.mpots,taken:Math.round(S.taken),hurtN:S.hurtN,big:S.big,minHp:Math.round(S.minHp*100),dodges:S.dodges,hitBy:S.hitBy,wsI:S.wsI,wsF:S.wsF,gnI:S.gnI,gnF:S.gnF,eggC:S.eggC,eggH:S.eggH,burN:S.burN,burB:S.burB,brk:S.brk,bossT0:S.bossT0,bossMh:S.bossMh,err:BOT.err,samp:S.samp.filter((x,i)=>i%8===0)}}")
                r['errs'] = [e for e in A.errs if 'ERR_' not in e][:3]
                out.append(r)
            res['real'] = round(time.time() - t0); res['players'] = out
            res['end'] = out[0]['end']
            if os.environ.get('NM'):
                res['nmr'] = await H.ev("()=>({pb:me.ngm&&me.ngm.pb,b:me.ngm&&me.ngm.b,w:me.ngm&&me.ngm.w,f:me.ngm&&Object.keys(me.ngm.f||{}),gold:me.gold,void:typeof NFC!=='undefined'&&NFC&&NFC.void})")
    finally:
        p.terminate()
    print('RESULT', json.dumps(res, ensure_ascii=False), flush=True)
    os.makedirs('b10out', exist_ok=True)
    tag = f"{DG}_{'-'.join(CLS)}_{PR}_v{VAR}_{int(time.time())}"
    json.dump(res, open(f'b10out/{tag}.json', 'w'), ensure_ascii=False)
asyncio.run(main())
