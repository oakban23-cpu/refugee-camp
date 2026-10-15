/* ---------- v395 ท่าทางตัวละครตามสกิล ----------
   เดิม (v282): ทุกสกิลมีแค่ "ท่าทั้งตัว" (เอียง/ยุบ/หมุน) 8 แบบ · อาวุธกับมือนิ่งตลอด · เวททั้ง 5 สกิลใช้ท่าเดียวกัน · สกิลคลาส 3 และรูนไม่มีท่าของตัวเอง
   ใหม่: ท่าเฉพาะสกิลรายอาชีพ (SKP) + รูนที่เปลี่ยนวิธีใช้สกิลมีท่าแยก · ขยับมือ/อาวุธ (ง้าง-ฟัน-แทง-ยกไม้เท้า-น้าวธนู) · มือข้างที่ว่างออกมาร่าย/ประสาน/ชี้ พร้อมแสงสีตามธาตุ
   ทำงานผ่านระบบท่าร่ายเดิม (me.cast → castNet) เพื่อนในห้องจึงเห็นท่าเดียวกัน (เครื่องเก่าที่ไม่รู้จักท่าใหม่จะข้ามไปเฉย ๆ) */
const SKP={
 melee:{0:['spin2',.62],'0a':['spinL',2],'0b':['pullspin',.8],1:['lunge',.46],'1a':['lunge',.34],3:['rage',.75],4:['roar',.7],2:['cleave',.9],5:['flurry',.8]},
 archer:{0:['volley',.62],1:['leap2',.6],'1a':['leapshot',.95],'1b':['leaptoss',.62],3:['snipe',.62],4:['plant',.6],'4a':['skyshot',.62],2:['skyshot',.95],5:['rapid',.62]},
 mage:{0:['cast',.56],'0a':['cast',.66],1:['stomp',.6],3:['point',.58],'3a':['point',.72],4:['channel',.8],2:['summon',1],5:['orb',.62]},
 assn:{0:['lunge',.42],'0a':['lunge',.52],1:['toss',.56],3:['mark',.56],4:['seal',.62],2:['flurry',.9],5:['seal',.62]},
 sup:{0:['pray2',.62],'0a':['smite',.56],1:['bless',.66],3:['smite',.56],4:['plant',.62],'4a':['stomp',.6],2:['bless',1],5:['bless',.66]}};
const R24T=new Set(['spin2','spinL','pullspin','lunge','rage','roar','cleave','flurry','volley','leap2','leapshot','leaptoss','snipe','plant','skyshot','rapid','cast','stomp','point','channel','summon','orb','toss','mark','seal','pray2','bless','smite']);
/* ท่าที่มือข้างที่ว่างออกมาด้านหน้า (ซ่อนแขนหลังเดิมไว้ไม่ให้มี 3 มือ) */
const R24OFF={rage:1,roar:1,leaptoss:1,plant:1,cast:1,point:1,channel:1,summon:1,orb:1,pray2:1,bless:1,smite:1,stomp:1};
const r24c=(x,a,b)=>Math.max(0,Math.min(1,(x-a)/(b-a))),r24eo=x=>1-(1-x)*(1-x),r24io=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,r24bm=(p,a,b)=>p<a||p>b?0:Math.sin((p-a)/(b-a)*Math.PI);
function R24B(){const C=CHA&&CHA.cast;return !!(C&&R24OFF[C.ty])}
/* ----- ท่าทั้งตัว (พิกัดเท้า: เรียกหลัง translate(0,14)) ----- */
function r24Body(C){const p=C.p,B=C.big?1.25:1,ty=C.ty;
  const spin=(q,n,hop)=>{const r=Math.cos(q*Math.PI*2*n);g.translate(0,-Math.sin(Math.min(1,q)*Math.PI)*hop);g.scale(Math.abs(r)<.28?(r<0?-.28:.28):r,1)};
  if(ty==='spin2')spin(p,2,6*B);
  else if(ty==='spinL'){const a=Math.min(1,p*8,(1-p)*8);g.rotate(.1*a);spin(p,9,2.5);g.translate(0,-Math.abs(Math.sin(p*Math.PI*9))*2*a)}
  else if(ty==='pullspin'){if(p<.32){const a=r24eo(p/.32);g.rotate(-.16*a);g.translate(-3*a,0);g.scale(1+.04*a,1-.04*a)}else spin((p-.32)/.68,2,6)}
  else if(ty==='lunge'){const w=r24eo(r24c(p,0,.22)),d=r24eo(r24c(p,.22,.42)),r=r24io(r24c(p,.5,1));const x=-3*w*(1-d)+9*d*(1-r);g.translate(x*B,0);g.rotate((-.1*w*(1-d)+.3*d*(1-r)));g.scale(1+.16*d*(1-r)-.04*w*(1-d),1-.1*d*(1-r)+.03*w*(1-d))}
  else if(ty==='rage'){const c=r24eo(r24c(p,0,.25)),u=r24bm(p,.25,1);g.translate(Math.sin(p*90)*1.3*u,-4*u);g.scale(1+.1*c*(1-u)-.04*u,1-.14*c*(1-u)+.12*u)}
  else if(ty==='roar'){const b=r24eo(r24c(p,0,.2)),f=r24bm(p,.2,1);g.rotate(-.14*b*(1-f)+.1*f);g.translate(Math.sin(p*80)*1.1*f,0);g.scale(1+.07*f,1-.03*f+.04*b*(1-f))}
  else if(ty==='cleave'){const up=r24eo(r24c(p,0,.38)),dn=r24c(p,.38,.48),sq=r24bm(p,.46,.7);g.translate(2*up,-16*up*(1-dn)*B);g.rotate(-.18*up*(1-dn)+.14*sq);g.scale(1-.05*up*(1-dn)+.18*sq,1+.08*up*(1-dn)-.2*sq)}
  else if(ty==='flurry'){const a=Math.min(1,p*6,(1-p)*5);g.rotate(.16*a);g.translate((2+Math.sin(p*Math.PI*12)*2.2)*a,0);g.scale(1+.04*a,1-.03*a)}
  else if(ty==='volley'){const a=r24eo(r24c(p,0,.5)),rl=r24bm(p,.52,.75);g.rotate(-.2*a*(1-r24c(p,.7,1))-.06*rl);g.translate(-3*rl,0)}
  else if(ty==='leap2'||ty==='leaptoss'){const up=Math.sin(Math.min(1,p/.75)*Math.PI);g.translate(-10*up,-17*up);g.rotate(-.35*up)}
  else if(ty==='leapshot'){const q=Math.min(1,p/.42),up=Math.sin(q*Math.PI);g.translate(-10*up,-16*up);g.rotate(-.3*up);if(p>.42){const k=(p-.42)/.58,rc=Math.max(0,Math.sin(k*Math.PI*3));g.translate(-2*rc,0);g.rotate(-.05*rc)}}
  else if(ty==='snipe'){const a=r24eo(r24c(p,0,.25))*(1-r24c(p,.85,1)),rl=r24bm(p,.6,.8);g.scale(1+.04*a,1-.12*a);g.rotate(.05*a-.08*rl);g.translate(-3*rl,0)}
  else if(ty==='plant'){const a=r24bm(p,0,1);g.rotate(.14*a);g.scale(1+.05*a,1-.14*a)}
  else if(ty==='skyshot'){const a=r24eo(r24c(p,0,.55))*(1-r24c(p,.8,1)),rl=r24bm(p,.58,.8);g.rotate(-.26*a-.08*rl);g.translate(-4*rl,-3*a*B)}
  else if(ty==='rapid'){const r1=r24bm(p,.3,.45),r2=r24bm(p,.65,.8);g.translate(-2.4*(r1+r2),0);g.rotate(-.07*(r1+r2))}
  else if(ty==='cast'){const b=r24eo(r24c(p,0,.35)),f=r24bm(p,.35,1);g.rotate(-.12*b*(1-r24c(p,.35,.45))+.13*f);g.translate(3.5*f,0);g.scale(1+.05*f,1-.03*f)}
  else if(ty==='stomp'){const up=r24eo(r24c(p,0,.4))*(1-r24c(p,.4,.48)),sq=r24bm(p,.45,.7);g.translate(0,-6*up);g.scale(1-.04*up+.13*sq,1+.07*up-.16*sq)}
  else if(ty==='point'){const a=Math.min(1,r24eo(r24c(p,0,.22)),(1-p)*5);g.rotate(.12*a);g.translate(2*a+Math.sin(p*70)*.5*a,0)}
  else if(ty==='channel'||ty==='summon'){const a=Math.min(1,r24eo(r24c(p,0,.25)),(1-p)*4),f=ty==='summon'?r24bm(p,.65,1):0;g.translate(0,(-9*a+Math.sin(p*Math.PI*6)*1.2*a)*B);g.rotate(-.06*a*(1-f)+.14*f)}
  else if(ty==='orb'){const a=Math.min(1,r24eo(r24c(p,0,.3)),(1-p)*4);g.rotate(.07*a);g.scale(1+.05*a,1-.04*a)}
  else if(ty==='toss'){const w=r24eo(r24c(p,0,.3)),t=r24bm(p,.3,.75);g.rotate(-.16*w*(1-r24c(p,.3,.4))+.16*t);g.translate(-2*w*(1-t)+3*t,0)}
  else if(ty==='mark'){const w=r24eo(r24c(p,0,.25)),s=r24bm(p,.25,.75);g.translate(-2*w*(1-s)+7*s,0);g.rotate(-.06*w*(1-s)+.22*s);g.scale(1+.1*s,1-.06*s)}
  else if(ty==='seal'){const a=Math.min(1,r24eo(r24c(p,0,.25)),(1-p)*4);g.scale(1+.06*a,1-.12*a);g.translate(Math.sin(p*60)*.6*a,0)}
  else if(ty==='pray2'){const a=Math.min(1,r24eo(r24c(p,0,.25)),(1-p)*3.5);g.rotate(.12*a);g.scale(1+.05*a,1-.13*a)}
  else if(ty==='bless'){const a=Math.min(1,r24eo(r24c(p,0,.3)),(1-p)*3.5);g.translate(0,-6*a*B+Math.sin(p*Math.PI*4)*.8*a);g.rotate(-.06*a);g.scale(1-.02*a,1+.06*a)}
  else if(ty==='smite'){const up=r24eo(r24c(p,0,.38)),s=r24bm(p,.38,.85);g.rotate(-.12*up*(1-r24c(p,.38,.46))+.16*s);g.translate(3*s,-4*up*(1-r24c(p,.38,.46)))}}
/* ----- มือ/อาวุธ: ระยะเลื่อนมือ (dx,dy) · หมุนอาวุธรอบมือ (rot) · บังคับจังหวะอาวุธ (ak) · มือข้างที่ว่าง (off) · แสง (gl) ----- */
const R24HX={melee:[7,0],archer:[12,-1],mage:[9,0],sup:[9,0],assn:[1,0]};
const R24COL={melee:'255,90,60',archer:'150,255,190',assn:'210,110,255',sup:'255,215,110'};
function r24Arm(cls,C){const p=C.p,ty=C.ty,o={dx:0,dy:0,rot:0,ak:null,off:null,gl:null};
  const draw=(a,b)=>p<a?0:p<b?.5*r24eo((p-a)/(b-a)):0; /* น้าวสายธนู 0→0.5 แล้วปล่อย */
  if(cls==='melee'){
    if(ty==='spin2'||ty==='spinL'||(ty==='pullspin'&&p>=.32)){o.rot=2.1;o.dx=3;o.dy=-1}
    else if(ty==='pullspin'){const a=r24eo(p/.32);o.rot=2.3*a;o.dx=6*a}
    else if(ty==='lunge'){const w=r24eo(r24c(p,0,.22)),d=r24eo(r24c(p,.22,.42)),r=r24io(r24c(p,.55,1));o.rot=(-.9*w*(1-d)+2.1*d)*(1-r);o.dx=(-2*w*(1-d)+7*d)*(1-r)}
    else if(ty==='rage'){const u=Math.min(1,r24eo(r24c(p,0,.3)),(1-p)*4);o.rot=-.25*u;o.dy=-7*u;o.dx=-1*u;o.off=[-1,-6-9*u];o.gl=u>.2?[0,-26,'255,40,40',.7*u]:null}
    else if(ty==='roar'){const u=Math.min(1,r24eo(r24c(p,0,.2)),(1-p)*4);o.rot=1.35*u;o.dx=3*u;o.dy=-3*u;o.off=[-6+2*u,-3-2*u]}
    else if(ty==='cleave'){const up=r24eo(r24c(p,0,.38)),dn=r24eo(r24c(p,.38,.5)),r=r24io(r24c(p,.75,1));o.rot=(-1.75*up*(1-dn)+2.75*dn)*(1-r);o.dy=(-8*up*(1-dn)+2*dn)*(1-r);o.dx=3*dn*(1-r);if(dn>0&&dn<1||(p>.48&&p<.6))o.gl=[20,6,'255,170,90',.9*r24bm(p,.4,.62)]}
    else if(ty==='flurry'){const a=Math.min(1,p*6,(1-p)*5),w=Math.sin(p*Math.PI*12);o.rot=(.8+1.3*w)*a;o.dx=(3+2.5*w)*a}}
  else if(cls==='archer'){
    if(ty==='volley'){const a=Math.min(1,r24eo(r24c(p,0,.3)),(1-p)*4);o.rot=-.9*a;o.dy=-2*a;o.ak=draw(.08,.5);if(p>.5&&p<.62)o.gl=[16,-12,'190,255,210',.8]}
    else if(ty==='leap2'){const a=Math.sin(Math.min(1,p/.75)*Math.PI);o.rot=.45*a;o.ak=a*.3}
    else if(ty==='leaptoss'){const a=Math.sin(Math.min(1,p/.75)*Math.PI);o.rot=.3*a;o.off=p<.35?[6+8*r24eo(p/.35),-2]:null;if(p>.2&&p<.42)o.gl=[16,-2,'255,110,60',.8]}
    else if(ty==='leapshot'){if(p<.42){o.rot=.35*Math.sin(p/.42*Math.PI)}else{const k=(p-.42)/.58*3,f=k-Math.floor(k);o.ak=f<.7?.5*r24eo(f/.7):0;o.dx=1;if(f>=.7&&f<.9)o.gl=[18,-1,'170,255,200',.8]}}
    else if(ty==='snipe'){const a=Math.min(1,r24eo(r24c(p,0,.2)),(1-p)*5);o.dx=2*a;o.dy=1*a;o.ak=draw(.1,.6);if(p>.6&&p<.72)o.gl=[22,-1,'255,240,180',.9]}
    else if(ty==='plant'){const a=r24bm(p,0,1);o.rot=.9*a;o.dy=2*a;o.off=[5+4*a,2+8*a];o.gl=[9,10+2*a,'200,190,255',.6*a]}
    else if(ty==='skyshot'){const a=Math.min(1,r24eo(r24c(p,0,.3)),(1-p)*4);o.rot=-1.15*a;o.dx=-1*a;o.dy=-3*a;o.ak=draw(.12,.58);if(p>.3&&p<.58)o.gl=[10,-14,C.big?'255,230,140':'190,255,210',.5+.4*r24c(p,.3,.58)]}
    else if(ty==='rapid'){const k=p*2,f=k-Math.floor(k);o.ak=f<.62?.5*r24eo(f/.62):0;o.dx=1;if(f>=.62&&f<.8)o.gl=[18,-1,'200,255,230',.8]}}
  else if(cls==='mage'||cls==='sup'){const col=cls==='sup'?R24COL.sup:ty==='stomp'?'150,215,255':ty==='point'||ty==='orb'?'160,200,255':ty==='channel'?'190,130,255':'255,150,60';
    if(ty==='cast'){const b=r24eo(r24c(p,0,.35)),f=r24bm(p,.35,1),k=r24c(p,.35,.45);o.rot=-.5*b*(1-k)+.75*f;o.dx=-2*b*(1-k)+4*f;o.dy=-2*b*(1-k)-1*f;o.off=p<.35?[-4,-4-2*b]:[6+7*f,-4-2*f];if(f>.15)o.gl=[6+7*f,-4-2*f,col,.9*f]}
    else if(ty==='stomp'){const up=r24eo(r24c(p,0,.4))*(1-r24c(p,.4,.48)),sq=r24bm(p,.45,.75);o.dy=-8*up+3*sq;o.off=[-3,-10*up-4];o.gl=sq>0?[9,13,col,.9*sq]:[9,-28*up-2,col,.5*up]}
    else if(ty==='point'){const a=Math.min(1,r24eo(r24c(p,0,.22)),(1-p)*5);o.rot=-.35*a;o.dx=-1.5*a;o.off=[4+10*a,-6-2*a];o.gl=a>.3?[4+10*a,-6-2*a,col,.95*a]:null;o.zap=a>.3}
    else if(ty==='channel'||ty==='summon'){const a=Math.min(1,r24eo(r24c(p,0,.25)),(1-p)*4),f=ty==='summon'?r24eo(r24c(p,.62,.8))*(1-r24c(p,.92,1)):0;o.dy=-5*a*(1-f);o.rot=.2*a*(1-f)+1.05*f;o.dx=4*f;o.off=[-2+10*f,-15*a*(1-f)-5*f];o.gl=[o.off[0],o.off[1],ty==='summon'?(C.big&&cls==='sup'?R24COL.sup:'255,150,70'):col,.85*a]}
    else if(ty==='orb'){const a=Math.min(1,r24eo(r24c(p,0,.3)),(1-p)*4);o.rot=.3*a;o.dx=2*a;o.off=[8+4*a,-8];o.gl=[10+3*a,-9,col,.6+.4*a],o.orb=a}
    else if(ty==='pray2'){const a=Math.min(1,r24eo(r24c(p,0,.25)),(1-p)*3.5);o.dx=-3*a;o.dy=-3*a;o.rot=-.1*a;o.off=[4,-7];o.gl=[4,-7,col,.95*a]}
    else if(ty==='bless'){const a=Math.min(1,r24eo(r24c(p,0,.3)),(1-p)*3.5);o.dy=-6*a;o.dx=1*a;o.rot=.25*a;o.off=[-4,-6-8*a];o.gl=[-4,-6-8*a,col,.9*a]}
    else if(ty==='smite'){const up=r24eo(r24c(p,0,.38)),k=r24c(p,.38,.46),s=r24bm(p,.38,.9);o.rot=-.35*up*(1-k)+.95*s;o.dy=-6*up*(1-k);o.dx=4*s;o.off=[-3+5*s,-5-4*up*(1-k)];if(s>.2)o.gl=[22*s,-14+6*s,col,.9*s]}
    else if(ty==='plant'){const a=r24bm(p,0,1);o.dx=2*a;o.dy=3*a;o.rot=.2*a;o.off=[5+2*a,2+3*a];o.gl=[11,13,col,.7*a]}}
  else if(cls==='assn'){const col=R24COL.assn;
    if(ty==='lunge'){const w=r24eo(r24c(p,0,.22)),d=r24eo(r24c(p,.22,.42)),r=r24io(r24c(p,.55,1));o.rot=(-.3*w*(1-d)+.35*d)*(1-r);o.dx=(-3*w*(1-d)+6*d)*(1-r)}
    else if(ty==='toss'){const w=r24eo(r24c(p,0,.3)),t=r24bm(p,.3,.75);o.dx=-4*w*(1-t)+5*t;o.rot=-.4*w*(1-t)+.6*t;if(t>.3)o.gl=[10+6*t,-8,'140,230,100',.8*t]}
    else if(ty==='mark'){const s=r24bm(p,.25,.75),w=r24eo(r24c(p,0,.25));o.dx=-2*w*(1-s)+7*s;o.rot=.9*s;if(s>.3)o.gl=[18,-2,'255,90,210',.9*s]}
    else if(ty==='seal'){const a=Math.min(1,r24eo(r24c(p,0,.25)),(1-p)*4);o.dy=-4*a;o.rot=-.35*a;o.gl=[1,-6,col,.75*a]}
    else if(ty==='flurry'){const a=Math.min(1,p*6,(1-p)*5),w=Math.sin(p*Math.PI*12);o.dx=(3+4*w)*a;o.rot=.6*w*a;if(Math.abs(w)>.8)o.gl=[12,-3,col,.6*a]}}
  return o}
function r24Hand(x,y,skin){g.beginPath();g.ellipse(x,y,2.2,2.2,0,0,7);g.fillStyle=skin||'#f2c8a0';g.fill();g.lineWidth=1;g.strokeStyle='#140e0c';g.stroke()}
function r24Glow(x,y,col,a,zap,orb){if(!(a>0))return;g.save();g.globalCompositeOperation='lighter';glowAt(x,y,13+7*a,col,a);glowAt(x,y,6+2*a,'255,255,255',.7*a);g.fillStyle='rgba(255,255,255,'+.9*a+')';g.beginPath();g.arc(x,y,1.8+1.2*a,0,7);g.fill();
  if(zap){const t=performance.now()/60|0;g.strokeStyle='rgba(220,240,255,'+a+')';g.lineWidth=.9;for(let i=0;i<3;i++){const an=((t*7+i*97)%628)/100;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(an)*5,y+Math.sin(an)*5);g.lineTo(x+Math.cos(an+.5)*9,y+Math.sin(an+.5)*9);g.stroke()}}
  if(orb){g.strokeStyle='rgba('+col+','+.9*orb+')';g.lineWidth=1.2;g.beginPath();g.arc(x,y,4+2*orb,0,7);g.stroke();g.fillStyle='rgba('+col+','+.35*orb+')';g.fill()}
  g.restore()}
setTimeout(()=>{
  try{['spin2','spinL','pullspin','lunge','rage','roar','cleave','flurry','volley','leap2','leapshot','leaptoss','snipe','plant','skyshot','rapid','cast','stomp','point','channel','summon','orb','toss','mark','seal','pray2','bless','smite'].forEach(t=>PCTY.add(t))}catch(e){}
  try{const _cs=castStart;castStart=function(k){const r=_cs.apply(this,arguments);try{const C=me.cast,T=SKP[me.cls];if(C&&C.k===k&&T){const rn=rnOf(k),e=(rn&&T[k+rn])||T[k];if(e){C.ty=e[0];C.d=e[1];PCT=0;castNet({ty:e[0],d:Math.min(1,e[1]),b:C.big?1:0})}}}catch(e){}return r}}catch(e){}
  try{const _cp=castPose;castPose=function(C){if(C&&R24T.has(C.ty)){g.translate(0,14);try{r24Body(C)}catch(e){}g.translate(0,-14);return}return _cp.apply(this,arguments)}}catch(e){}
  /* เงาติดตา/วงใต้เท้า: ท่าใหม่ยืมเอฟเฟกต์ของท่าเดิมที่ใกล้เคียง */
  const MAP={lunge:'dash',leap2:'leap',leaptoss:'leap',leapshot:'leap',mark:'thrust',cast:'raise',stomp:'raise',point:'raise',channel:'raise',summon:'raise',orb:'raise',seal:'raise',pray2:'pray',bless:'pray',smite:'raise',plant:'raise',rage:'raise',roar:'raise'};
  const sub=C=>{if(!C||!MAP[C.ty])return C;const o=Object.assign({},C);o.ty=MAP[C.ty];if(C.ty==='leapshot'){o.p=Math.min(1,C.p/.42*.75)}return o};
  try{const _cg=castGhosts;castGhosts=function(x,y,C,draw){return _cg.call(this,x,y,sub(C),draw)}}catch(e){}
  try{const _cu=castFxUnder;castFxUnder=function(x,y,C,col){return _cu.call(this,x,y,sub(C),col)}}catch(e){}
  try{const _dw=drawWeapon;drawWeapon=function(cls,c,ay,t,skin,Pg,E,ak){const C=CHA&&CHA.cast;if(!C||!R24T.has(C.ty)||!R24HX[cls])return _dw.apply(this,arguments);
    let o;try{o=r24Arm(cls,C)}catch(e){return _dw.apply(this,arguments)}const H=R24HX[cls],hx=H[0],hy=ay+H[1];
    g.save();g.translate(hx+o.dx,hy+o.dy);g.rotate(o.rot);g.translate(-hx,-hy);try{_dw.call(this,cls,c,ay,t,skin,Pg,E,o.ak!=null?o.ak:ak)}finally{g.restore()}
    try{if(o.off)r24Hand(o.off[0],ay+3+o.off[1],skin);if(o.gl)r24Glow(o.gl[0],ay+3+o.gl[1],o.gl[2],o.gl[3],o.zap,o.orb)}catch(e){}}}catch(e){}
},0);
