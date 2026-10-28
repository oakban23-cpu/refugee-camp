"""v553 balance harness: character profiles + time scaling + dungeon bot (shared by b10dps.py / b10run.py)."""
import json

# ---------- ฉายา ----------
STORY = {
    1: ['stD'], 2: ['stA', 'stB', 'stC', 'stE', 'stF'], 3: ['stG'], 4: ['stH', 'stI', 'stJ'],
    5: ['stCa', 'stP5', 'p5mem'], 6: ['stEs', 'stMk', 'stAr', 'stCk', 'stP6'],
    7: ['stS1', 'stS2', 'stS3', 'stS4', 'stS5', 'stP7'], 8: ['stN1', 'stN2', 'stN3', 'stN4', 'stP8'],
    9: ['stQ1', 'stQ2', 'stQ3', 'stQ4', 'stQ5a'], 10: ['stR1', 'stR2', 'stR3', 'stR4', 'stR5a', 'stR6']}
LEVEL = ['lv30', 'lv60', 'lv70', 'lv75', 'lv85', 'lv99']
COMMON = ['k100', 'k1000', 'k5000', 'b1', 'b2', 'b3', 'b4', 'b6', 'dg1', 'bx50', 'up10', 'leg', 'rich', 'awk', 'set5', 'set6',
          'sexp', 'rexp', 'wexp', 'ast10', 'tw10', 'el100', 'ult100', 'dq30', 'st7', 'cp12', 'mvp1', 'raid1', 'bhT1', 'bhT2', 'gwT1', 'gwT2']


def titles(upto, cls, ast_n=0, extra=()):
    t = list(LEVEL) + list(COMMON)
    for p in range(1, upto + 1):
        t += STORY[p]
    if cls in ('mage', 'sup'):
        t = ['stL' if x == 'stD' else x for x in t]
    if ast_n >= 50:
        t.append('ast50')
    return t + list(extra)


# ---------- โปรไฟล์ (เข้าภาค 10 = ฉายาถึงภาค 9) ----------
def prof(name, cls, upto=9):
    if name == 'L':   # ขั้นต่ำ: Ancient ชุดรากพิภพ +20 · ดาว 60 · ไม่มีสัตว์เลี้ยง
        return dict(name=name, gear='anc', u=20, ast_n=60, ast={'dm': 30, 'cdm': 20, 'hp': 10}, pet=0, rb=0, br=1,
                    ttl=titles(upto, cls, 60))
    if name == 'M':   # ทั่วไป: Cosmic ชุดรากพิภพ +20 · ดาว 150 · มังกรน้อย
        return dict(name=name, gear='cos', u=20, ast_n=150, ast={'dm': 50, 'cdm': 50, 'hp': 40, 'red': 10}, pet=6, rb=0, br=1,
                    ttl=titles(upto, cls, 150))
    if name == 'H':   # จัดเต็ม: จุติ Lv99 · Cosmic +25 · ดาว 200 · มังกรน้อย Lv20
        return dict(name=name, gear='cos', u=25, ast_n=200, ast={'dm': 50, 'cdm': 50, 'hp': 50, 'red': 50}, pet=6, petx=999999, rb=1, br=1,
                    ttl=titles(upto, cls, 200, ('ast200', 'tw50', 'mvp10', 'raid10', 'cp25', 'dg3')))
    raise ValueError(name)


PROF_JS = r"""([P])=>{
  const R0=Math.random;let s=P.seed||4242;Math.random=()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648};
  try{
    me.lv=99;me.xp=0;me.rb=P.rb?1:0;if(P.rb){me.rbC2={br:P.br||1,brU:{1:1,2:1}}}
    me.cls2=1;me.brU={1:1,2:1};me.br=P.br||1;try{applyBr()}catch(e){}
    ['w','a','c','h','b'].forEach(sl=>{let it;if(P.gear==='cos')it=makeCosmicSet(6,sl,22);else if(P.gear==='anc')it=makeSetItem(6,sl);else it=genItem(22,sl,P.gr||4,P.gr||4);it.u=P.u|0;me.eq[sl]=it});
  }finally{Math.random=R0}
  me.ab={str:0,vit:0,int:0,agi:0,luk:0};
  {const W=AB2W[me.cls],p=spts(),ks=Object.keys(W),tw=ks.reduce((a,k)=>a+W[k],0);let used=0;const add={};ks.forEach(k=>{add[k]=Math.floor(p*W[k]/tw);used+=add[k]});let i=0;while(used<p){add[ks[i%ks.length]]++;used++;i++}ks.forEach(k=>me.ab[k]=add[k])}
  me.tr={};for(let r=0;r<60;r++)nodes().forEach(n=>{try{alloc(n.id)}catch(e){}});
  me.ach={};P.ttl.forEach(k=>{if(TTB[k])me.ach[k]=1});TTBC.k='';
  me.ast={n:P.ast_n|0,x:0,p:Object.assign({},P.ast||{})};
  if(P.pet){me.pets=[P.pet];me.pet=P.pet;if(P.petx){try{vpX()[P.pet]=P.petx}catch(e){}}}else{me.pets=[];me.pet=0}
  try{cardRecalc()}catch(e){}
  recalc();me.mh=maxHp();me.hp=me.mh;me.mm=maxMp();me.mp=me.mm;me.inv.hp=P.pots||400;me.inv.mp=P.pots||400;me.down=0;
  try{ov.hidden=true}catch(e){}
  return {cls:me.cls,lv:me.lv,rb:me.rb,mh:me.mh,mm:me.mm,pd:Math.round(pd()),dm:+M('dm').toFixed(2),cr:+crC().toFixed(2),cd:+crD().toFixed(2),red:+Math.min(.6,M('red')).toFixed(2),redRaw:+M('red').toFixed(2),
    as:+M('as').toFixed(2),ls:+M('ls').toFixed(3),fd:+FDv().toFixed(3),sp:+M('sp').toFixed(2),reg:+M('reg').toFixed(1),
    ttl:Object.keys(me.ach).filter(k=>TTB[k]).length,set:setCount(6),ast:astOf().n,u3:typeof u3Open==='function'?u3Open():false}
}"""

# ---------- เร่งเวลาเกม (performance.now + requestAnimationFrame) ----------
TSCALE_JS = r"""([K])=>{if(window.__ts){const T=window.__ts,n=T.pn();T.o=T.o+(n-T.b)*T.K;T.b=n;T.K=K;return K}
  const pn=performance.now.bind(performance),raf=window.requestAnimationFrame.bind(window),n=pn();
  const T={K,b:n,o:n,pn};window.__ts=T;const sc=r=>T.o+(r-T.b)*T.K;
  performance.now=()=>sc(pn());window.requestAnimationFrame=cb=>raf(ts=>cb(sc(ts)));return K}"""
