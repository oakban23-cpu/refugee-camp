"""ไล่หาจุดที่สกิลพุ่ง (dash 110) พาออกนอกพื้นที่เล่นแล้วกลับไม่ได้ ทุกแมพ + ดันพิเศษ
   python3 dashprobe.py [maps|all] [dg]   · env HPORT · ผล → dash_out/res.json + ภาพ dash_out/*.jpg
   วิธี: ตาราง aqGrid (ช่อง 16) → แบ่งพื้นที่ต่อกัน (8 ทิศ) → พื้นที่หลัก = ที่จุดเกิด
         ทุกช่องขอบพื้นที่หลัก: ยืน → พุ่งออกทางขอบ → อัปเดตตัวละคร 3 รอบ (ชน/ดึงกลับของเกม)
         → ถ้าจุดสุดท้ายไม่อยู่พื้นที่หลัก = ต้องสงสัย → ลองจริงด้วยเฟรมจริง + เดินกลับ 2.5 วิ"""
import asyncio, sys, json, os, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dash_out'); os.makedirs(OUT, exist_ok=True)
PROBE = r"""(cap)=>{const R={map:curMap};try{
 const G=aqGrid(),N=AQN,C=AQC,lab=new Int32Array(N*N).fill(-1),size=[];let nc=0;
 for(let k=0;k<N*N;k++){if(G[k]||lab[k]>=0)continue;const q=[k];lab[k]=nc;let s=0;while(q.length){const c=q.pop();s++;const i=c%N,j=(c/N)|0;
   for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const ii=i+di,jj=j+dj;if(ii<0||jj<0||ii>=N||jj>=N)continue;const kk=jj*N+ii;if(G[kk]||lab[kk]>=0)continue;if(di&&dj&&(G[j*N+ii]||G[jj*N+i]))continue;lab[kk]=nc;q.push(kk)}}size.push(s);nc++}
 const compAt=(x,y)=>{const i0=(x/C)|0,j0=(y/C)|0;for(let r=0;r<3;r++)for(let dj=-r;dj<=r;dj++)for(let di=-r;di<=r;di++){if(Math.max(Math.abs(di),Math.abs(dj))!==r)continue;const i=i0+di,j=j0+dj;if(i<0||j<0||i>=N||j>=N)continue;const l=lab[j*N+i];if(l>=0)return l}return -1};
 window.__dpC=compAt;
 const A=[me.x,me.y],main=compAt(A[0],A[1]);R.A=A.map(Math.round);R.main=main;R.mainSize=main>=0?size[main]:0;R.nc=nc;
 if(main<0)return R;
 const cand=[];for(let k=0;k<N*N;k++){if(lab[k]!==main)continue;const i=k%N,j=(k/N)|0;let vx=0,vy=0,b=0;for(const[di,dj]of[[1,0],[-1,0],[0,1],[0,-1]]){const ii=i+di,jj=j+dj;if(ii<0||jj<0||ii>=N||jj>=N||G[jj*N+ii]){vx+=di;vy+=dj;b++}}if(b)cand.push([i*C+8,j*C+8,Math.atan2(vy,vx)])}
 R.cand=cand.length;const st=Math.max(1,Math.floor(cand.length/cap));
 const sv={x:me.x,y:me.y,f:me.face,hp:me.hp,mp:me.mp,sk:me.sk.slice(),cd:me.cd},cm=curMap,jo=joy;joy=null;const U=()=>{try{updateMe(.001)}catch(e){}};
 const F=[];let n=0;
 for(let q=0;q<cand.length&&curMap===cm;q+=st){const[sx,sy,a]=cand[q];me.x=sx;me.y=sy;U();U();if(compAt(me.x,me.y)!==main)continue;const S=[me.x,me.y];
   for(const da of[0,-.5,.5]){me.x=S[0];me.y=S[1];me.down=0;dash(a+da,110,0);U();U();U();const c=compAt(me.x,me.y);n++;
     if(c!==main)F.push({S:S.map(Math.round),a:+(a+da).toFixed(2),P:[Math.round(me.x),Math.round(me.y)],c,cs:c>=0?size[c]:0})}}
 R.tried=n;R.moved=curMap!==cm;Object.assign(me,{x:sv.x,y:sv.y,face:sv.f,hp:sv.hp,mp:sv.mp,cd:sv.cd});me.sk=sv.sk;joy=jo;
 /* รวมตามพื้นที่ปลายทาง */const by={};F.forEach(f=>{const k=f.c;(by[k]=by[k]||[]).push(f)});R.flag=F.length;R.groups=Object.entries(by).map(([k,L])=>({c:+k,cs:L[0].cs,n:L.length,ex:L.filter((_,i)=>i%Math.max(1,Math.floor(L.length/3))===0).slice(0,3)}));
}catch(e){R.err=String(e&&e.stack||e).slice(0,300)}return R}"""
VERIFY = r"""async([S,a])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.down=0;me.x=S[0];me.y=S[1];await w(250);const S2=[me.x,me.y];dash(a,110,0);await w(1200);
  const P=[Math.round(me.x),Math.round(me.y)],c=__dpC(me.x,me.y),m=__dpC(S2[0],S2[1]);const dx=S2[0]-me.x,dy=S2[1]-me.y,d=Math.hypot(dx,dy)||1;
  joy={ox:JB.x,oy:JB.y,dx:dx/d*40,dy:dy/d*40,t0:performance.now(),mv:1};let best=d;for(let k=0;k<25;k++){await w(100);const ex=S2[0]-me.x,ey=S2[1]-me.y,e=Math.hypot(ex,ey)||1;best=Math.min(best,e);joy={ox:JB.x,oy:JB.y,dx:ex/e*40,dy:ey/e*40,t0:performance.now(),mv:1}}joy=null;
  const c2=__dpC(me.x,me.y);return {S:S2.map(Math.round),P,cP:c,main:m,end:[Math.round(me.x),Math.round(me.y)],cEnd:c2,back:c2===m,best:Math.round(best),cur:curMap}}"""
DGE = ['casEnter','clkEnter','echoEnter','escEnter','eyeEnter','fsEnter','hdfEnter','hfgEnter','mdfEnter','nyxEnter','ornEnter','qshEnter','queenEnter','rootEnter','rteEnter','siegeEnter','trialEnter','vspEnter','wbEnter',
       'gdlEnter','wblEnter','wskEnter','ctwEnter','cwnEnter','wvrEnter','ptdEnter','pnqEnter','pfnEnter']
async def main():
    which = sys.argv[1] if len(sys.argv) > 1 else 'all'; dgm = len(sys.argv) > 2 and sys.argv[2] == 'dg'
    p = start_server(); res = {}
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Dp' + str(random.randint(100, 999)), 'archer', 99)
        await A.ev("()=>{window.DNH=12;AUTO.on=false;me.gold=1e8;ov.hidden=true;gmGod=true}")
        if dgm:
            jobs = [('fn', f) for f in (DGE if which == 'all' else which.split(','))]
        else:
            ids = await A.ev("()=>Object.keys(MAPS).map(Number).filter(k=>k<1000).sort((a,b)=>a-b)")
            jobs = [('map', i) for i in (ids if which == 'all' else [int(x) for x in which.split(',')])]
        for kind, j in jobs:
            try:
                await A.ev("()=>{try{if(isDg())dgLeave()}catch(e){}me.down=0;me.hp=me.mh}"); await A.wait(800)
                if kind == 'map':
                    await A.ev(f"()=>{{const M=MAPS[{j}];enterMap({j},{{x:M.sx,y:M.sy+60}})}}")
                else:
                    await A.ev("()=>{enterMap(45,{x:1600,y:1300})}"); await A.wait(800)
                    ok = await A.ev(f"()=>{{if(typeof {j}!=='function')return 0;{j}();return 1}}")
                    if not ok: res[j] = {'skip': 'nofn'}; continue
                await A.wait(2600)
                await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<60){stNext();k++}stClose()}catch(e){}}"); await A.wait(400)
                r = await A.ev(PROBE, 450)
                r['kind'] = kind; r['id'] = j
                ver = []
                for g in sorted(r.get('groups', []), key=lambda g: -g['n'])[:4]:
                    e = g['ex'][0]
                    v = await A.ev(VERIFY, [e['S'], e['a']])
                    v['cs'] = g['cs']; v['n'] = g['n']
                    if not v['back']:
                        await A.ev(f"()=>{{me.x={v['P'][0]};me.y={v['P'][1]}}}"); await A.wait(500)
                        shot = f"{OUT}/{kind}_{j}_{g['c']}.jpg"; await A.pg.screenshot(path=shot, type='jpeg', quality=60); v['shot'] = shot
                    ver.append(v)
                r['ver'] = ver; r.pop('groups', None) if not r.get('groups') else None
                res[str(j)] = r
                bad = [v for v in ver if not v['back']]
                print(kind, j, 'map', r.get('map'), 'main', r.get('mainSize'), 'tried', r.get('tried'), 'flag', r.get('flag'), 'STUCK' if bad else 'ok', [(v['P'], v['cs'], v['best']) for v in bad], r.get('err', ''), flush=True)
            except Exception as ex:
                res[str(j)] = {'err': str(ex)[:300]}; print(kind, j, 'ERR', str(ex)[:200], flush=True)
        json.dump(res, open(f"{OUT}/res_{'dg' if dgm else 'map'}.json", 'w'), ensure_ascii=False)
        print('errs', [e for e in A.errs if 'ERR_' not in e][:5])
    finally:
        p.terminate()
asyncio.run(main())
