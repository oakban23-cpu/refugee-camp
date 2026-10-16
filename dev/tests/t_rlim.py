"""v412 รูนเสริมแบบเดียวกันใส่ได้ไม่เกิน 2 สกิล"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
async def main():
  p=start_server()
  try:
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for cls in ['melee','sup']:
            A=await new_client(b,'Rl'+cls[:3],cls,99)
            await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
            id=await A.ev("()=>{const X=sgSt();const ids=Object.keys(SGD).filter(id=>SGK.filter(k=>{try{return sgOk(id,k)}catch(e){return false}}).length>=3);const id=ids.find(i=>SGD[i][3]!=='rare')||ids[0];X.i[id]=6;X.l={};return id}")
            got=await A.ev("""(id)=>{const X=sgSt(),out=[];const ks=SGK.filter(k=>sgOk(id,k));SGTAB='sup';
              for(const k of ks){SGSEL={k,i:0};sgUI();const b=document.querySelector('[data-sgp="'+id+'"]');if(b)b.click();out.push(k+':'+((X.l[k]||[]).indexOf(id)>=0?'Y':'N'))}
              SGSEL={k:ks[ks.length-1],i:0};sgUI();const txt=document.querySelector('.sgpk')?document.querySelector('.sgpk').textContent:'';return{out,used:sgWhere(id).length,msg:txt.indexOf('ใส่ครบ 2 สกิลแล้ว')>=0,ks}}""",id)
            rep(cls+' ใส่ได้ 2 สกิล สกิลที่ 3 ใส่ไม่ได้',got['used']==2 and [o[-1] for o in got['out']][:3]==['Y','Y','N'],json.dumps(got,ensure_ascii=False))
            rep(cls+' หน้าเลือกรูนบอกเหตุผล',got['msg'])
            s=await A.ev("""(id)=>{const X=sgSt();const ks=SGK.filter(k=>sgOk(id,k));const l={};ks.forEach(k=>l[k]=[id]);X.sv[0]={l};const m=sgSetLoad(0);return{m,used:sgWhere(id).length}}""",id)
            rep(cls+' ชุดลิงก์ที่บันทึกไว้เกิน 2 ถูกตัด',s['used']==2 and 'เกิน 2 สกิล' in s['m'],json.dumps(s,ensure_ascii=False))
            c=await A.ev("""(id)=>{const X=sgSt();const ks=SGK.filter(k=>sgOk(id,k));X.l={};ks.forEach(k=>X.l[k]=[id]);const c=cleanChar(JSON.parse(JSON.stringify(snap())));let n=0;for(const k in c.rn.x.l)if(c.rn.x.l[k].indexOf(id)>=0)n++;return{n,trim:SGTRIM,before:ks.length}}""",id)
            rep(cls+' เซฟเก่าที่ใส่เกินถูกตัดเหลือ 2 ตอนโหลด',c['n']==2 and c['trim']>=1,json.dumps(c))
            other=await A.ev("""(id)=>{const X=sgSt();X.l={};const ids=Object.keys(SGD).filter(i=>i!==id&&SGK.filter(k=>sgOk(i,k)).length>=2).slice(0,1);if(!ids.length)return 'none';const j=ids[0];X.i[j]=3;X.i[id]=6;const ks=SGK.filter(k=>sgOk(id,k)&&sgOk(j,k)).slice(0,2);ks.forEach(k=>X.l[k]=[id,j]);return{ok:sgWhere(id).length===2&&sgWhere(j).length===2,ks}}""",id)
            rep(cls+' รูนต่างแบบใส่คู่กันได้ตามปกติ',isinstance(other,dict) and other['ok'],json.dumps(other))
            E=[e for e in A.errs if not e.startswith('console')]
            rep(cls+' ไม่มี error',not E,str(E[:2]))
            await A.ctx.close()
  finally:
    p.terminate()
  print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
