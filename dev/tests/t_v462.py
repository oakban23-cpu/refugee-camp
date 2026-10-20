"""v462 เดินบนกำแพงบ้านกิลด์"""
import asyncio, sys, json, os, subprocess, time
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
def restart():
    env = dict(os.environ, PORT=str(PORT), DATA_DIR=DD, MVP_FAST='1', GD_FAST='1')
    q = subprocess.Popen(['node', 'server.js'], cwd=SRV, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for _ in range(60):
        time.sleep(.3)
        try:
            import urllib.request; urllib.request.urlopen(URL + 'health', timeout=1); break
        except Exception: pass
    return q
def edit(fn):
    fp=os.path.join(DD,'guild.json');J=json.load(open(fp));G=list(J['g'].values())[0];fn(G);json.dump(J,open(fp,'w'))
WALK="""([dx,dy,n])=>{for(let i=0;i<n;i++){me.x+=dx;me.y+=dy;ghCollide()}return{x:Math.round(me.x-1600),y:Math.round(me.y-1600),on:GWW.on,r:(ghWReg(me.x-1600,me.y-1600,ghT())||{}).k||null}}"""
OUT='/home/claude/promo3/gh12'
async def main():
    os.makedirs(OUT,exist_ok=True)
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,lv) for n,c,lv in [('Ann','melee',60),('Bee','mage',60)]]
        A,B=C
        for c in C:
            await c.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}")
        await A.wait(1500)
        await A.ev("()=>{gdEmit('mk',{nm:'เชิงเทิน',tag:'WAL',e:5,col:1})}");await A.wait(1300)
        await A.ev("()=>{gdEmit('inv',{to:'Bee'})}");await A.wait(1100)
        await B.ev("()=>{const q=GDS.inv[0];if(q)gdEmit('acc',{id:q.id})}");await A.wait(1300)
        p.terminate();p.wait()
        def t3(G):
            G['lvl']=4;H=G['hq'];H['t']=3;H['wl']=6;H['gl']=6;H['f']=5000000
        edit(t3);p=restart();await A.wait(4000)
        for c in C: await c.ev("()=>{gdEmit('q');setTimeout(()=>{ghEnter();me.x=CX;me.y=CY+300},800)}")
        await A.wait(2500)
        for c in C:
            await c.ev("()=>{LOWQ=false;try{FQ.n=-1e12}catch(e){}HDI.on=true;ghHDload()}")
        for c in C:
            await c.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if((ghHDok()&&GQI.ok===1&&GHS.gq)||Date.now()-t0>15000){clearInterval(iv);r()}},200)})")
        g=await A.ev("()=>{const t=ghT(),f=(x,y)=>{const R=ghWReg(x,y,t);return R?[R.k,Math.round(R.l)]:null};return{t,gq:GHS.gq,n:f(400,-480),nh:f(0,-480),e:f(600,0),s:f(300,424),sg:f(100,424),st:f(388,-430),g:f(0,0)}}")
        rep('ขั้น 3: แถบทางเดินเหนือ/ข้าง/ใต้ + บันได (ช่วงหลังตึกหลักกับช่วงประตูเดินไม่ได้) ยกสูงตามความสูงกำแพง',g['t']==3 and g['n']==['n',81] and g['nh'] is None and g['e']==['e',85] and g['s']==['s',91] and g['sg'] is None and g['st'][0]=='st' and 0<g['st'][1]<81 and g['g'] is None,json.dumps(g))
        r=await A.ev("()=>{me.x=1600+388;me.y=1600-360;GWW.on=0;ghCollide();GWW.lx=me.x-1600;GWW.ly=me.y-1600;return 1}")
        w1=await A.ev(WALK,[0,-4,30])
        rep('เดินขึ้นบันไดจากปลายล่าง → อยู่บนกำแพง (ทางเดินเหนือ)',w1['on']==1 and w1['r']=='n' and w1['y']<=-474,json.dumps(w1))
        w2=await A.ev(WALK,[6,0,60]);w3=await A.ev(WALK,[0,6,160]);w4=await A.ev(WALK,[-6,0,120])
        rep('เดินตามกำแพง: เหนือ → มุม → กำแพงข้าง → กำแพงใต้ · หยุดที่หอประตู (เดินข้ามประตูไม่ได้)',w2['r'] in('n','e') and w2['x']>=586 and w3['r'] in('e','s') and w3['y']>=412 and w4['r']=='s' and 170<=w4['x']<=176 and w4['on']==1,json.dumps([w2,w3,w4]))
        w5=await A.ev(WALK,[0,-8,10])
        rep('บนกำแพงใต้กดขึ้น → ไม่หลุดลงพื้น (ยังอยู่บนทางเดิน)',w5['on']==1 and w5['r']=='s',json.dumps(w5))
        await A.wait(900)
        uidA=await A.ev("()=>uid")
        sb=await B.ev("(u)=>{const o=others[u];if(!o)return null;const R=ghWOn(o);return{y:Math.round(o.y-1600),k:R&&R.k,l:R&&Math.round(R.l)}}",uidA)
        rep('อีกเครื่องเห็นว่าอยู่บนกำแพง (อนุมานจากพิกัด) → วาดยกสูงตรงกัน',sb and sb['k']=='s' and sb['l']==91,json.dumps(sb))
        sd=await B.ev("()=>{me.x=1600+360;me.y=1600-430;GWW.on=0;GWW.lx=360;GWW.ly=-430;const L=[];for(let i=0;i<10;i++){me.x+=4;ghCollide();L.push(Math.round(me.x-1600))}return{x:Math.round(me.x-1600),on:GWW.on}}")
        rep('เดินเข้าข้างบันได (ไม่ใช่ปลายล่าง) → ถูกกันออก ไม่ขึ้นกำแพง',sd['on']==0 and sd['x']<=368,json.dumps(sd))
        dn=await B.ev("()=>{me.x=1600-388;me.y=1600-360;GWW.on=0;ghCollide();GWW.lx=me.x-1600;GWW.ly=me.y-1600;for(let i=0;i<30;i++){me.y-=4;ghCollide()}const up=GWW.on;for(let i=0;i<30;i++){me.y+=4;ghCollide()}return{up,on:GWW.on,y:Math.round(me.y-1600)}}")
        rep('ขึ้นบันไดฝั่งซ้ายแล้วเดินลง → กลับลงพื้นตามปกติ',dn['up']==1 and dn['on']==0 and dn['y']>-392,json.dumps(dn))
        # ภาพ: A บนกำแพงใต้ · B บนกำแพงเหนือ
        await B.ev("()=>{me.x=1600-388;me.y=1600-360;GWW.on=0;ghCollide();GWW.lx=me.x-1600;GWW.ly=me.y-1600;for(let i=0;i<32;i++){me.y-=4;ghCollide()}for(let i=0;i<12;i++){me.x-=6;ghCollide()}}")
        await A.ev("()=>{for(let i=0;i<10;i++){me.x+=6;ghCollide()}}")
        await A.wait(1200)
        await A.pg.screenshot(path=OUT+'/s_wall_south.png')
        await B.wait(300);await B.pg.screenshot(path=OUT+'/s_wall_north.png')
        # ---------- ศึก ----------
        await A.ev("()=>{gmGod=false;me.hp=me.mh}")
        await B.ev("()=>{GWW.on=0;me.x=1600+60;me.y=1600+300;GWW.lx=60;GWW.ly=300}")
        await A.ev("()=>{GHS.tab='def';ghUI();ov.querySelector('[data-gh2=\"rs\"]').click()}");await A.wait(300)
        await A.ev("()=>{ov.querySelector('[data-gh2=\"rs\"]').click()}");await A.wait(1500)
        await A.ev("()=>{ov.hidden=true}")
        on=await A.ev("()=>({on:ghrOn(),w:GWW.on,k:(ghWOn(me)||{}).k,dm:fdM('dm'),bf:buffList().some(b=>b.k==='ghw')})")
        rep('ศึกเปิด + ยืนบนเชิงเทิน → ดาเมจ +25% · ขึ้นไอคอนบัฟ',on['on'] and on['w']==1 and on['k']=='s' and on['dm']>=.25 and on['bf'],json.dumps(on))
        hp0=await A.ev("()=>me.hp")
        for _ in range(16):
            await A.wait(2000)
            if await A.ev("(h)=>me.hp<h",hp0): break
        await A.wait(500)
        hs=await A.ev("()=>isHost()");H0=A if hs else B
        mt=await H0.ev("(u)=>{const o=u===uid?me:others[u];return{tg:mons.filter(m=>m.id>=900000&&m.tg===u).length,n:mons.filter(m=>m.id>=900000).length,wq:GWW.wq.length,nf:GWW.nf|0,host:isHost(),ow:o?[Math.round(o.x-1600),Math.round(o.y-1600),!!ghWOn(o)]:null,near:mons.filter(m=>m.id>=900000).map(m=>[m.t,Math.round(m.x-1600),Math.round(m.y-1600)]).slice(0,8)}}",uidA)
        hp1=await A.ev("()=>({hp:me.hp,mh:me.mh,k:(ghWOn(me)||{}).k})")
        rep('มอนไม่เล็งคนบนเชิงเทิน · แต่โดนธนูจากมอนด้านนอก (เลือดลด)',mt['n']>0 and mt['tg']==0 and hp1['hp']<hp0 and hp1['k']=='s',json.dumps([mt,hp0,hp1]))
        await A.ev("()=>{me.hp=me.mh}")
        ax=await A.ev("()=>Math.round(me.x-1600)")
        await H0.ev("(x)=>{GRD.bx=x;ghrSend()}",ax);await A.wait(1500)
        dr=await A.ev("()=>({on:GWW.on,y:Math.round(me.y-1600),bx:GRD.bx})")
        rep('กำแพงทะลุตรงที่ยืน → ตกลงมาข้างล่าง (ไม่อยู่บนกำแพงแล้ว)',dr['on']==0 and dr['y']<410,json.dumps(dr))
        await A.pg.screenshot(path=OUT+'/s_raid.png')
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
