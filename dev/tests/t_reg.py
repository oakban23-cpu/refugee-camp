"""ตรวจค่าที่ระบบต่าง ๆ ใช้ร่วมกันว่าไม่ชนกัน (เลขห้อง · NPC เควส · ธงเนื้อเรื่อง · เซฟ · ประตู · รหัสซ้ำ)"""
import asyncio,random,json,re,sys
from h import *
SRC=open('/home/claude/refugee-online/public/index.html',encoding='utf-8').read()
def static_checks():
    out=[]
    gens=[(int(a),int(n)) for a,n in re.findall(r"const id=(\d+)\+\(Math\.random\(\)\*(\d+)\|0\)",SRC)]
    gens.sort()
    for i in range(len(gens)):
        for j in range(i+1,len(gens)):
            a0,n0=gens[i];a1,n1=gens[j]
            if a0<=a1+n1 and a1<=a0+n0:out.append(f'เลขห้องสุ่มทับกัน: {a0}–{a0+n0} กับ {a1}–{a1+n1}')
    for k in sorted(set(re.findall(r"DT\[(\d+)\]=\{",SRC))):
        c=len(re.findall(r"DT\["+k+r"\]=\{",SRC))
        if c>1:out.append(f'DT[{k}] ถูกกำหนด {c} ครั้ง')
    ids=re.findall(r"\['([A-Za-z0-9]+)','[^']+','[^']+',\(\)=>",SRC)
    for t in sorted(set(ids)):
        if ids.count(t)>1:out.append(f'ฉายา {t} ซ้ำ {ids.count(t)} ครั้ง')
    keys=re.findall(r"[,{]([A-Za-z][A-Za-z0-9]*):\{gr:'[wgp]'",SRC)
    for t in sorted(set(keys)):
        if keys.count(t)>1:out.append(f'โบนัสฉายา {t} ซ้ำ {keys.count(t)} ครั้ง')
    # ฟังก์ชันระดับบนสุดที่ประกาศซ้ำ (ตัวหลังทับตัวแรกเงียบ ๆ ตัวห่อที่จับตัวแรกไว้จะพัง)
    fn=re.findall(r"(?m)^(?:async )?function ([A-Za-z_$][\w$]*)\(",SRC)
    for t in sorted(set(fn)):
        if fn.count(t)>1:out.append(f'ฟังก์ชัน {t} ประกาศซ้ำ {fn.count(t)} ครั้ง')
    # ตัวแปรระดับบนสุด const/let ซ้ำ = โหลดหน้าแล้วพังทั้งสคริปต์
    cv=re.findall(r"(?m)^(?:const|let) ([A-Za-z_$][\w$]*)\s*=",SRC)
    for t in sorted(set(cv)):
        if cv.count(t)>1:out.append(f'ตัวแปร {t} ประกาศซ้ำ {cv.count(t)} ครั้ง')
    return gens,out
JS=r"""()=>{const out=[],info={};
  /* 1) ห้องที่สุ่ม: ทุกเลขในช่วงต้องได้ห้องชนิดเดียว */
  const FL=['wb','hfg','qsh','mdf','vsp','clk','esc','cas','orn','rte','root','nyx','queen','siege','eye','echo','raid','trial','pvp','tw'];
  const kind=id=>{const keep=MAPS[id];delete MAPS[id];let M=null;try{M=dgMap(id)}catch(e){}const k=M?(FL.find(f=>M[f])||('dg'+(M.dg||'?'))):'none';if(keep)MAPS[id]=keep;else delete MAPS[id];return k};
  info.rooms={};
  for(const[a,n]of window.__GENS){const S=new Set();for(let q=0;q<=20;q++){const id=a+Math.round(n*q/20);S.add(kind(id))}info.rooms[a+'+'+n]=[...S];if(S.size>1)out.push('ช่วงห้อง '+a+'–'+(a+n)+' ได้หลายชนิด: '+[...S].join(','))}
  /* 2) NPC เควส: ช่องที่ระบบเควสชี้ต้องมี NPC และแตะแล้วได้คีย์เดิม */
  const slotSel={npc:1,npc2:2,npc3:3,npc4:4,npc5:5,npc6:6};const cm=curMap,ns=npcSel;
  const talkKeys=new Set(STY.filter(s=>s.k).map(s=>s.k));
  for(const k of talkKeys){const a=STNPC[k];if(!a){if(!(AQALT[k]))out.push('ไม่มีตำแหน่ง NPC ของ '+k);continue}
    const[m,sl]=a;if(m===9){if(!(typeof cityNpc==='function'&&cityNpc(k)))out.push('NPC '+k+' ไม่มีในนครอัสตรา');continue}
    const N=MAPS[m]&&MAPS[m][sl];if(!N){out.push('NPC '+k+' ชี้ไปช่อง '+sl+' ของแมพ '+m+' ซึ่งไม่มี');continue}
    if(k==='hd')continue;const SHARE={lir:'qn5',qn5:'lir'};/* ช่องเดียวกันที่สลับคนตามความคืบหน้า (stTalkKey) */curMap=m;npcSel=slotSel[sl];let got='';try{got=stTalkKey()}catch(e){got='ERR'}curMap=cm;npcSel=ns;
    if(got!==k&&SHARE[k]!==got)out.push('NPC '+k+' (แมพ '+m+' ช่อง '+sl+') แตะแล้วได้คีย์ "'+got+'"')}
  /* 3) ธงขั้นเนื้อเรื่องซ้ำ */
  const base=new Set(['c','g','k','m','n','tx','pre','post','rw','cine','lv']);const seen={};
  STY.forEach((s,i)=>Object.keys(s).forEach(f=>{if(base.has(f)||s[f]!==1)return;(seen[f]=seen[f]||[]).push(i)}));
  for(const f in seen)if(seen[f].length>1)out.push('ธงเนื้อเรื่อง '+f+' ใช้ใน '+seen[f].length+' ขั้น ('+seen[f].join(',')+')');
  /* 4) เซฟ: ธงบิตของเนื้อเรื่องต้องรอดการเซฟ */
  const bitKeys=new Set();const re=/me\.sty\.([a-z][a-z0-9]{1,5})\b/g;const src=document.documentElement.innerHTML;let mm;while((mm=re.exec(src)))bitKeys.add(mm[1]);
  ['s','n','a'].forEach(k=>bitKeys.delete(k));const st0=me.sty;me.sty={s:5,n:0,a:0};bitKeys.forEach(k=>me.sty[k]=3);
  let kept={},back={};try{const cc=cleanChar(JSON.parse(JSON.stringify(snap())));kept=cc.sty||{};applySave(cc);back=me.sty||{}}catch(e){out.push('cleanChar/applySave error '+e.message)}
  const lost=[...bitKeys].filter(k=>!(k in kept)),lost2=[...bitKeys].filter(k=>(k in kept)&&!(k in back));me.sty=st0;info.saveLost=lost;info.loadLost=lost2;
  if(lost.length)out.push('ค่าเนื้อเรื่องที่เซฟไม่ติด: '+lost.join(','));if(lost2.length)out.push('ค่าเนื้อเรื่องที่หายตอนโหลดเซฟ: '+lost2.join(','));
  /* 5) ประตู */
  for(const id in MAPS){const M=MAPS[id];if(+id<1||+id>60||!M.gates)continue;M.gates.forEach((G,gi)=>{M.gates.forEach((H,hi)=>{if(hi<=gi||G.alias||H.alias)return;if(Math.hypot(G.x-H.x,G.y-H.y)<100)out.push('ประตูแมพ '+id+' #'+gi+'→'+G.to+' กับ #'+hi+'→'+H.to+' ห่างกันแค่ '+Math.round(Math.hypot(G.x-H.x,G.y-H.y))+'px')});
    const D=MAPS[G.to];if(G.arr&&D&&D.gates&&!G.alias){D.gates.forEach((H,hi)=>{if(!H.alias&&Math.hypot(G.arr.x-H.x,G.arr.y-H.y)<70)out.push('ประตูแมพ '+id+'→'+G.to+' ส่งไปลงทับประตู #'+hi+'→'+H.to+' ของแมพปลายทาง')})}})}
  return JSON.stringify({out,info})}"""
ARR=r"""([id])=>{const o=[];const M=MAPS[id];if(!M||!M.gates)return o;for(const G of M.gates){if(G.alias||!G.arr||G.to>=10000)continue;o.push([id,G.to,G.arr.x,G.arr.y])}return o}"""
WALK=r"""([to,x,y])=>{try{AQP.gk='';const ok=aqWalkable(x,y);let blk=trees.some(t=>t.r>0&&!t.nc&&Math.hypot(t.x-x,t.y-y)<t.r+6);return [ok,!blk]}catch(e){return ['err',e.message]}}"""
async def main():
    gens,out=static_checks()
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'R'+str(random.randint(100,999)),'melee',99)
        await A.ev("([g])=>{window.__GENS=g;gmGod=true;me.sty={s:STY.length,n:0,a:0,e:1,e4:2,p6h:2,e6:1,p7m:1,e7:1,p6b:7}}",[gens])
        r=json.loads(await A.ev(JS))
        out+=r['out']
        print('ห้อง',json.dumps(r['info']['rooms'],ensure_ascii=False))
        print('ค่าเซฟที่หาย',r['info']['saveLost'],'โหลดหาย',r['info']['loadLost'])
        # จุดเกิดหลังผ่านประตู ต้องยืนได้
        arrs=[]
        for mid in range(1,40):arrs+=await A.ev(ARR,[mid])
        bymap={}
        for a in arrs:bymap.setdefault(a[1],[]).append(a)
        for to,L in sorted(bymap.items()):
            if to<1 or to>40:continue
            await A.ev(f"()=>{{ov.hidden=true;enterMap({to},{{x:MAPS[{to}].sx||1600,y:MAPS[{to}].sy||1600}})}}");await A.wait(1800)
            for frm,_,x,y in L:
                w=await A.ev(WALK,[to,x,y])
                if w[0]!=True or w[1]!=True:out.append(f'ประตูแมพ {frm}→{to} ส่งไปลงที่ ({x},{y}) ซึ่ง{"เดินไม่ได้" if w[0]!=True else "ทับสิ่งกีดขวาง"}')
        print('==== ผลตรวจ',len(out),'ข้อ')
        for o in out:print('⚠️',o)
        json.dump(out,open('../reg_check.json','w'),ensure_ascii=False,indent=0)
        await b.close()
    p.terminate()
    sys.exit(1 if out else 0)
asyncio.run(main())
