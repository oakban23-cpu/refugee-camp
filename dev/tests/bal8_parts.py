SETUP=r"""([cls,br,LV,GL,GR,GU])=>{
  try{document.getElementById('ttl')&&document.getElementById('ttl').remove()}catch(e){}
  localStorage.setItem('refugee_tut','1');pick(cls,'','sim');window.PRO_ON=0;{const e=document.getElementById('procv');if(e)e.remove()}
  try{SD.on&&stClose()}catch(e){}
  me.lv=LV;me.xp=0;
  if(br&&LV>=AWLV){me.cls2=1;me.brU={1:1,2:1};me.br=br;try{applyBr()}catch(e){}}
  let s=12345;const R0=Math.random;Math.random=()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648};
  try{['w','a','c','h','b'].forEach(sl=>{const it=genItem(GL,sl,GR,GR);it.u=GU;me.eq[sl]=it})}finally{Math.random=R0}
  {const P=(LV-1)*3;me.ab={str:Math.round(P*.29),vit:Math.round(P*.24),int:Math.round(P*.19),agi:Math.round(P*.15),luk:0};me.ab.luk=Math.max(0,P-me.ab.str-me.ab.vit-me.ab.int-me.ab.agi)}
  for(let r=0;r<60;r++)nodes().forEach(n=>{try{alloc(n.id)}catch(e){}});
  ov.hidden=true;try{recalc()}catch(e){}me.hp=me.mh;me.mp=me.mm;me.inv.hp=999;me.inv.mp=999;
  
  AUTO.on=true;AUTO.sel={0:1,1:1,2:1,3:1,4:1};
  window.DMG=0;if(!window._dmw){window._dmw=1;const o=dmgMon;dmgMon=function(i,d){if(mons.some(m=>m.id===i&&m.bt))DMG+=d;return o(i,d)}}
  window.TAKEN=0;window.DEATHS=0;if(!window._ahw){window._ahw=1;window.CK={};const oa=addHit;addHit=function(m,d,cr,lv,ck){if(m&&m.bt){const k=(ck||'basic')+(lv?'/s'+lv:'');CK[k]=(CK[k]||0)+d;CK.n=(CK.n||0)+1;CK.cr=(CK.cr||0)+(cr?1:0);CK['atk>0']=(CK['atk>0']||0)+(me.atk>0?1:0);CK.stl=(CK.stl||0)+(me.stealth>0?1:0);CK.as=(CK.as||0)+M('as');{const n=performance.now();if(window._lt){const g=Math.round((n-_lt)/20)*20;CK['g'+g]=(CK['g'+g]||0)+1}window._lt=n;if(n-(window._lt2||0)<2){const st=new Error().stack.split('\n').slice(2,6).join('|').replace(/file:[^)]*index.html/g,'');window.STK=window.STK||{};STK[st]=(STK[st]||0)+1}window._lt2=n}CK.dist=(CK.dist||0)+Math.hypot(m.x-me.x,m.y-me.y)}return oa.apply(this,arguments)}}
  return {mh:me.mh,mm:me.mm,red:+M('red').toFixed(3),ls:+M('ls').toFixed(3),cr:+(M('cr')+(CL[cls].cr||0)).toFixed(3),as:+M('as').toFixed(3),dm:+M('dm').toFixed(3),pts:pts(),spts:spts(),tr:Object.keys(me.tr).length,pd:Math.round(pd())}}"""
EQ=r"""([sid,L,GU])=>{let s=4242;const R0=Math.random;Math.random=()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648};
  try{['w','a','c','h','b'].forEach(sl=>{const it=genItem(L,sl,5,5);Object.keys(it.st).forEach(k=>it.st[k]=r2(Math.min(gkCap(k,5,it.L),it.st[k]*1.08)));it.ss=sid||undefined;it.lk=1;it.u=GU;me.eq[sl]=it})}finally{Math.random=R0}
  recalc();me.hp=me.mh;me.mp=me.mm;return {sc:sid?setCount(sid):0,mh:me.mh,pd:Math.round(pd()),dm:+M('dm').toFixed(3),cr:+M('cr').toFixed(3)}}"""
