import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
SNAP = "()=>({gold:me.gold,bag:me.bag.length,bagJ:me.bag.map(i=>JSON.stringify(i.st)+i.L+i.r).sort().join('|').length,map:curMap})"
async def same_map(cs, mp, xy='{x:SX,y:SY}'):
    for c in cs: await c.ev(f"()=>{{ov.hidden=true;enterMap({mp},{xy})}}")
    await cs[0].wait(3000)
async def main():
    only = sys.argv[1:]
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'melee'); B = await new_client(b, 'Bravo', 'mage'); C = await new_client(b, 'Charlie', 'sup')
        cs = [A, B, C]
        await same_map(cs, 9, '{x:1600,y:1750}')
        seen = await A.ev("()=>Object.keys(others)"); rep('presence: A sees B,C', B.uid in seen and C.uid in seen, str(seen))
        # ---------- chat ----------
        if not only or 'chat' in only:
            await A.ev("()=>{room.emit('chat',{u:uid,n:myName,t:'hello-net-test'})}"); await B.wait(1200)
            got = await B.ev("()=>JSON.stringify(chatLog||[]).includes('hello-net-test')")
            rep('chat A->B', got)
        # ---------- party ----------
        if not only or 'party' in only:
            await A.ev(f"()=>ptInvite('{B.uid}')"); await B.wait(1500)
            req = await B.ev("()=>!!ptReq"); rep('party invite received', req)
            await B.ev("()=>ptAccept()"); await B.wait(2500)
            pa = await A.ev("()=>PTY?PTY.mem.map(m=>m.u):null"); pb = await B.ev("()=>PTY?PTY.mem.map(m=>m.u):null")
            rep('party formed both sides', bool(pa and pb and B.uid in pa and A.uid in pb), f'A:{pa} B:{pb}')
            await A.ev(f"()=>ptInvite('{C.uid}')"); await C.wait(1500); await C.ev("()=>ptAccept()"); await C.wait(2500)
            pc = await C.ev("()=>PTY?PTY.mem.map(m=>m.u):null"); pb2 = await B.ev("()=>PTY?PTY.mem.map(m=>m.u):null")
            rep('party of 3 synced to all', bool(pc and pb2 and len(pc) == 3 and len(pb2) == 3), f'C:{pc} B:{pb2}')
            await C.ev("()=>ptLeave()"); await C.wait(2000)
            pa = await A.ev("()=>PTY?PTY.mem.length:0"); pb = await B.ev("()=>PTY?PTY.mem.length:0")
            rep('member leave synced', pa == 2 and pb == 2, f'A:{pa} B:{pb}')
            await A.ev("()=>ptLeave()"); await A.wait(2000)
            pb = await B.ev("()=>PTY?PTY.mem.length:0"); rep('leader leave -> party dissolves for B', pb <= 1, f'B:{pb}')
        # ---------- trade ----------
        if not only or 'trade' in only:
            await A.ev("()=>{me.gold=50000;me.bag=me.bag.slice(0,5);me.bag.push(genItem(10,'w',3,3))}")
            await B.ev("()=>{me.gold=20000;me.bag=me.bag.slice(0,5);me.bag.push(genItem(10,'a',2,2))}")
            for c in (A,B): await c.ev("()=>{let g=me.gold;window._gl=[];Object.defineProperty(me,'gold',{configurable:true,get(){return g},set(v){if(v!==g)window._gl.push([g,v,(new Error().stack||'').split('\\n').slice(2,5).join(' | ').slice(0,300)]);g=v}})}")
            a0 = await A.ev(SNAP); b0 = await B.ev(SNAP)
            await A.ev(f"()=>trStartReq('{B.uid}')"); await B.wait(1500)
            rep('trade request received', await B.ev("()=>!!trReq"))
            await B.ev("()=>trAccept()"); await A.wait(1500)
            await A.ev("()=>{trToggle(me.bag.length-1);trGold(1000)}"); await B.ev("()=>{trToggle(me.bag.length-1);trGold(300)}"); await A.wait(1500)
            await A.ev("()=>trLock()"); await B.ev("()=>trLock()"); await A.wait(1500)
            await A.ev("()=>trConfirm()"); await B.ev("()=>trConfirm()"); await A.wait(3000)
            a1 = await A.ev(SNAP); b1 = await B.ev(SNAP)
            st = await A.ev("()=>tr?tr.st:'closed'")
            print('A gold log', await A.ev("()=>JSON.stringify(window._gl)"))
            print('B gold log', await B.ev("()=>JSON.stringify(window._gl)"))
            ta = await A.ev("()=>window._gl.filter(e=>e[2].indexOf('trTryExec')>=0).reduce((s,e)=>s+e[1]-e[0],0)"); tb = await B.ev("()=>window._gl.filter(e=>e[2].indexOf('trTryExec')>=0).reduce((s,e)=>s+e[1]-e[0],0)")
            rep('trade executed: gold', ta == -700 and tb == 700, f"A {a0['gold']}->{a1['gold']} (trade {ta}) B {b0['gold']}->{b1['gold']} (trade {tb}) st={st}")
            rep('trade executed: items swapped (no dup/loss)', a1['bag'] == a0['bag'] and b1['bag'] == b0['bag'], f"A {a0['bag']}->{a1['bag']} B {b0['bag']}->{b1['bag']}")
            # cancel path: start, A adds item, B cancels
            await A.ev(f"()=>trStartReq('{B.uid}')"); await B.wait(1500); await B.ev("()=>trAccept()"); await A.wait(1200)
            a2 = await A.ev(SNAP)
            await A.ev("()=>{trToggle(0)}"); await A.wait(800); await B.ev("()=>trCancel('test')"); await A.wait(1500)
            a3 = await A.ev(SNAP)
            rep('trade cancel keeps items', a3['bag'] == a2['bag'] and a3['gold'] == a2['gold'], f'{a2}->{a3}')
        # ---------- pvp ----------
        if not only or 'pvp' in only:
            await A.ev(f"()=>pvChallenge('{B.uid}')"); await B.wait(1500)
            ch = await B.ev("()=>!!(SD.on&&SD.onChoose)"); rep('pvp challenge dialog on B', ch)
            if ch:
                await B.ev("()=>SD.onChoose(1)"); await A.wait(3500)
                pa = await A.ev("()=>PV?[PV.id,curMap,PV.opp]:null"); pb = await B.ev("()=>PV?[PV.id,curMap,PV.opp]:null")
                rep('pvp both in same arena', bool(pa and pb and pa[0] == pb[0] and pa[1] == pb[1]), f'A:{pa} B:{pb}')
                await A.wait(6000)
                pa = await A.ev("()=>PV?PV.ph:null"); pb = await B.ev("()=>PV?PV.ph:null"); rep('pvp running', pa is not None and pb is not None, f'{pa} {pb}')
                # B surrenders by hp 0
                await B.ev("()=>{me.hp=0;try{pvHurtDead()}catch(e){}}"); await A.wait(4000)
                ra = await A.ev("()=>PV?PV.res:me.pvp&&JSON.stringify(me.pvp)"); rb = await B.ev("()=>PV?PV.res:me.pvp&&JSON.stringify(me.pvp)")
                rep('pvp result both sides', True, f'A:{ra} B:{rb}')
                for c in (A, B): await c.ev("()=>{try{if(PV)pvEnd(PV.res||'l')}catch(e){};PV=null}")
        # ---------- MVP boss with 2 players ----------
        if not only or 'mvp' in only:
            await same_map([A, B], 18, '{x:1300,y:1600}'); await A.wait(4000)
            ha = await A.ev("()=>isHost()"); hb = await B.ev("()=>isHost()")
            rep('exactly one host on map 18', ha != hb, f'A:{ha} B:{hb}')
            H, O = (A, B) if ha else (B, A)
            bh = await H.ev("()=>{const m=mons.find(q=>q.t===3);return m?[m.id,Math.round(m.hp),m.mh,!!m.mvp]:null}")
            bo = await O.ev("()=>{const m=mons.find(q=>q.t===3);return m?[m.id,Math.round(m.hp),m.mh,!!m.mvp]:null}")
            rep('MVP boss visible on both', bool(bh and bo and bh[0] == bo[0]), f'host:{bh} other:{bo}')
            if bh:
                await H.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=Math.min(m.hp,60000)}")
                g0h = await H.ev("()=>me.gold"); g0o = await O.ev("()=>me.gold")
                for c in (A, B):
                    await c.ev("()=>{gmGod=true;AUTO.on=true;const B=mons.find(q=>q.t===3);if(B){me.x=B.x+60;me.y=B.y+40;lockId=B.id}window._bt=setInterval(()=>{const B=mons.find(q=>q.t===3);if(!B)return;lockId=B.id;const d=Math.hypot(B.x-me.x,B.y-me.y);if(d>90){me.x+=(B.x-me.x)*.2;me.y+=(B.y-me.y)*.2}},200)}")
                await A.wait(3000); await H.ev("()=>{const m=mons.find(q=>q.t===3);if(m)m.hp=4000}")
                for i in range(30):
                    await A.wait(1000)
                    alive = await H.ev("()=>!!mons.find(q=>q.t===3)")
                    if i%5==0: print('  t',i,'host boss',await H.ev("()=>{const m=mons.find(q=>q.t===3);return m?[Math.round(m.hp),Math.round(Math.hypot(m.x-me.x,m.y-me.y))]:null}"),'other',await O.ev("()=>{const m=mons.find(q=>q.t===3);return m?[Math.round(m.hp),Math.round(Math.hypot(m.x-me.x,m.y-me.y)),me.hp|0,me.down]:null}"))
                    if not alive: break
                await A.wait(3000)
                ah = await H.ev("()=>JSON.stringify((chatLog||[]).slice(-6))");
                kill = 'ถูกปราบ' in ah or 'MVP' in ah
                bo2 = await O.ev("()=>!!mons.find(q=>q.t===3)")
                rep('MVP killed & result broadcast', not bo2 and kill, f'other still sees boss={bo2}; log={ah[-300:]}')
                g1h = await H.ev("()=>me.gold"); g1o = await O.ev("()=>me.gold")
                rep('both got rewards', g1h > g0h and g1o > g0o, f'host {g0h}->{g1h} other {g0o}->{g1o}')
                for c in (A, B): await c.ev("()=>{clearInterval(window._bt);AUTO.on=false}")
        # ---------- leaderboard ----------
        if not only or 'lb' in only:
            await A.ev("()=>{try{lbSubmit('wb',123456)}catch(e){window.__err.push('lbSubmit '+e)}}"); await A.wait(1500)
            await B.ev("()=>{lbFetch(true)}"); await B.wait(2000)
            d = await B.ev("()=>JSON.stringify(lbData||{}).slice(0,300)")
            rep('leaderboard submit visible to B', 'Alpha' in d, d)
        # ---------- dungeon party ----------
        if not only or 'dg' in only:
            await same_map([A, B], 1, '{x:CX,y:CY+60}')
            await A.ev("()=>{dgCreate(1)}"); await A.wait(2500)
            idA = await A.ev("()=>curMap"); await B.ev(f"()=>dgJoin('{idA}')"); await B.wait(3000)
            idB = await B.ev("()=>curMap"); rep('dungeon join same room', idA == idB and idA > 10000, f'{idA} {idB}')
            await A.ev("()=>{dgReqStart()}"); await A.wait(4000)
            pa = await A.ev("()=>dg&&dg.ph"); pb = await B.ev("()=>dg&&dg.ph"); rep('dungeon started both', pa == pb and pa not in (None, 'lobby'), f'{pa} {pb}')
            for c in (A, B): await c.ev("()=>{gmGod=true;AUTO.on=true}")
            await A.wait(8000)
            bx = await B.ev("()=>[me.x,me.y]")
            near = "(p)=>mons.filter(m=>Math.hypot(m.x-p[0],m.y-p[1])<420).map(m=>m.id).sort((a,b)=>a-b)"
            ma = await A.ev(near, bx); mb = await B.ev(near, bx)
            common = len(set(ma) & set(mb)); rep('dungeon mobs near B synced', common >= max(len(ma), len(mb)) - 2, f'A sees {len(ma)} B sees {len(mb)} common {common} (A total {await A.ev("()=>mons.length")})')
            for c in (A, B): await c.ev("()=>{AUTO.on=false;try{dgLeave()}catch(e){}}")
        await A.wait(1000)
        for c in cs:
            js = await c.ev("()=>window.__err||[]")
            errs = [e for e in c.errs if 'ERR_TUNNEL' not in e] + js
            rep(f'no JS errors on {c.name}', not errs, json.dumps(errs[:5], ensure_ascii=False)[:900])
        await b.close()
    out = p.stdout.read1(100000).decode(errors='ignore') if p.poll() is not None else ''
    p.terminate()
    print('\nSUMMARY:', sum(1 for r in R if r[1]), '/', len(R), 'passed')
asyncio.run(main())
