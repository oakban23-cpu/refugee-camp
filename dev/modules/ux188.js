/* ---------- v611 หน้าต่างสกิลรวมแบบ MMORPG (SKW6) ----------
   เมนู ตัวละคร → สกิล : แท็บ ผังสกิล · รูนหลัก · ลิงก์รูน · คลังสกิล ในหน้าเดียว
   · แถบสกิลด้านซ้าย (แนวตั้ง = แถวบน) เลือกสกิลแล้วเห็นรูนหลัก/ลิงก์ของสกิลนั้นทันที
   · หัวสกิลโชว์ พลัง/มานา/คูลดาวน์ ที่รวมผลรูนเสริมแล้ว พร้อมบอกว่าดีขึ้น/แย่ลงเท่าไร
   · แตะช่องลิงก์ → แผงเลือกรูนเลื่อนขึ้น: กรองหมวด · เห็นค่าหลังใส่ก่อนกด · บอกเหตุผลถ้าใส่ไม่ได้ · สร้าง/อัปขั้นได้ในแผงเดียว
   · เปลี่ยนรูนหลัก/รูนเสริมได้ทุกที่ (เดิมต้องกลับค่าย) ยกเว้นลานประลอง/ลานทดสอบ
   · ปุ่ม «มุมมองเดิม» สลับกลับหน้าเก่าได้ · ปิดทั้งระบบ: SKW6.on=0 */
const SKW6={on:1,t:'link',k:0,sh:-1,cat:'all',pk:null,nd:null,set:-1,msg:''};
try{const o=JSON.parse(localStorage.getItem('refugee_skw')||'{}');if(o.t)SKW6.t=o.t;if(o.on===0)SKW6.on=0}catch(e){}
function skwSave(){try{localStorage.setItem('refugee_skw',JSON.stringify({t:SKW6.t,on:SKW6.on}))}catch(e){}}
function skwKs(){return[0,1,3,4].concat(me.rb?[5]:[]).concat([2])}
function skwKey(k){return k===2?'อัลติ':k===5?'สกิล 6':'สกิล '+(k===3?3:k===4?4:k+1)}
function skwLock(k){try{if(k===2&&me.lv<ULV)return'ปลดที่ Lv '+ULV;if(k===3&&me.lv<SK3LV)return'ปลดที่ Lv '+SK3LV;if(k===4&&!me.cls2)return'ปลดเมื่อตื่นพลัง (Lv '+AWLV+')';if(k===5&&!s6Open())return'ปลดเมื่อจุติถึง Lv '+RBL5}catch(e){}return''}
function skwDesc(k){try{if(typeof q8On==='function'&&q8On(k)){const d=q8Def(me.cls,k);if(d&&d.d)return d.d}}catch(e){}
  try{if(k===0||k===1)return(SK12D[me.cls]||[])[k]||'';if(k===3)return SK3[me.cls][1];if(k===4)return(sk4Of()||[])[1]||'';if(k===5)return sk6Of()[1];if(k===2)return ultOf()[1]}catch(e){}return''}
function skwMods(k,L){const o={mana:1,cd:1,pow:1};let pb=0;(L||[]).forEach(id=>{if(!id||!SGD[id]||!sgOk(id,k))return;const m=SGD[id][5],qq=sgQ(id);for(const p in m){let v=m[p];if((id==='brut'||id==='blood')&&p==='pow')v=1+(v-1)*qq;else if(id==='haste'&&p==='cd')v=1-(1-v)*qq;if(p==='pow'&&v>1)pb+=v-1;else o[p]*=v}});if(pb)o.pow*=1+pb;o.blood=(L||[]).indexOf('blood')>=0;return o}
function skwStat(k,L){let P=1,mc=0,cd=0;try{P=1+M('s'+k+'p')+skPow(k)}catch(e){}try{mc=mcOf(k)}catch(e){}try{cd=cdOf(k)}catch(e){}const o=skwMods(k,L);
  return{pow:Math.round(P*o.pow*100),mp:o.blood?null:Math.round(mc*o.mana),hp:o.blood?Math.round(4*o.mana):0,cd:Math.round(cd*o.cd*10)/10}}
function skwDl(a,b,good,u){if(a==null||b==null)return'';const d=Math.round((a-b)*10)/10;if(!d)return'';const up=d>0,ok=good?up:!up;return'<em class="'+(ok?'kg':'kb')+'">'+(up?'+':'')+d+u+'</em>'}
function skwStChips(a,b){const mp=a.mp==null?'<span class="ksc"><small>เลือด</small><b>'+a.hp+'%</b><em class="kb">สังเวยโลหิต</em></span>':'<span class="ksc"><small>มานา</small><b>'+a.mp+'</b>'+skwDl(a.mp,b.mp,false,'')+'</span>';
  return'<span class="ksc"><small>พลังสกิล</small><b>'+a.pow+'%</b>'+skwDl(a.pow,b.pow,true,'%')+'</span>'+mp+'<span class="ksc"><small>คูลดาวน์</small><b>'+a.cd+' วิ</b>'+skwDl(a.cd,b.cd,false,' วิ')+'</span>'}
function skwCanEdit(){try{return!sgOff()}catch(e){return true}}
/* ---------- ส่วนประกอบ ---------- */
function skwRail(){const N=sgSockN();return'<div class="skwr">'+skwKs().map(k=>{const lk=skwLock(k),on=SKW6.k===k,L=SGK.indexOf(k)>=0?(sgSt().l[k]||[]):null,r=rnOf(k);
  return'<button class="skwsk'+(on?' on':'')+(lk?' lk':'')+'" data-skwk="'+k+'" aria-label="'+skName(k)+'">'+skImg(me.cls,k,34)+'<span class="kkl">'+skwKey(k)+'</span><span class="kdt">'+(r?'<i class="krm" style="background:'+(r==='a'?'#ff7a5a':'#5ab0ff')+'"></i>':'')+
    (L&&N?[0,1,2].map(i=>{const id=L[i];return'<i'+(i>=N?' class="kx"':'')+(id&&SGD[id]?' style="background:'+sgCol(id)+';border-color:'+sgCol(id)+'"':'')+'></i>'}).join(''):'')+'</span>'+(lk?'<span class="klkk">🔒</span>':'')+'</button>'}).join('')+'</div>'}
function skwHead(k){const L=SGK.indexOf(k)>=0?sgLinks(k):[],a=skwStat(k,L),b=skwStat(k,[]),lk=skwLock(k),T=SGK.indexOf(k)>=0?sgTags(k):[];
  return'<div class="skwh">'+skImg(me.cls,k,52)+'<div class="knm"><b>'+skName(k)+'</b><small>'+skwKey(k)+(lk?' · 🔒 '+lk:'')+'</small><span class="ktg">'+T.map(t=>'<i>'+(SGTN[t]||t)+'</i>').join('')+'</span></div><div class="kstat">'+skwStChips(a,b)+'</div></div>'+
    '<div class="skwds">'+skwDesc(k)+'</div>'}
function skwTabs(){const p=pts(),q8=!!(typeof Q8D!=='undefined'&&Q8D[me.cls]),S=rnSt();
  const T=[['tree','🌳 ผังสกิล'+(p>0?' <i class="kdt"></i>':'')],['rune','💠 รูนหลัก'],['link','🔗 ลิงก์รูน']].concat(q8?[['pool','📚 คลังสกิล']]:[]);
  return'<div class="skwtb"><div class="ktbs">'+T.map(([id,l])=>'<button class="skwt'+(SKW6.t===id?' on':'')+'" data-skwt="'+id+'">'+l+'</button>').join('')+'</div><div class="kchp"><span>แต้มสกิล <b>'+p+'</b></span><span>💠 <b>'+(S.sh|0)+'</b></span><button class="skwold" data-skwold="1" title="กลับไปหน้าแบบเดิม">มุมมองเดิม</button></div></div>'}
/* ---------- แท็บผังสกิล ---------- */
function skwTree(){const p=pts(),B=skBrs(),op=B.filter(b=>!b.lock),lk=B.filter(b=>b.lock);let all=[],h='';
  h+='<div class="skwtt"><span>แต้มเหลือ <b class="'+(p>0?'khv':'')+'">'+p+'</b> · ได้ 1 แต้มต่อเลเวล</span><span class="ksp"></span>'+(p>0?'<button class="pri" data-skauto="1">✨ ลงให้อัตโนมัติ</button>':'')+'<button id="trreset">🔄 รีเซ็ต</button></div>';
  h+='<div class="skwtr">';op.forEach(b=>{h+='<div class="skwbr'+(b.used>=b.mx?' fu':'')+'"><div class="kbn"><b>'+(b.star?'🌠 ':b.rq?'⭐ ':'')+'สาย'+b.bn+'</b><small>'+b.used+'/'+b.mx+'</small></div><div class="knds">'+b.N.map((n,i)=>{const r=me.tr[n.id]||0,full=r>=n.max,pre=i>0&&!(me.tr[b.N[i-1].id]||0),can=!pre&&!full&&p>0,sk=(/^s(\d)(p|cd)$/.exec(n.k)||[])[1];all.push({n,pre,prev:i?b.N[i-1]:null,can,full,r});
      return(i?'<i class="kln'+((me.tr[b.N[i-1].id]||0)?' on':'')+'"></i>':'')+'<button class="skwn'+(full?' kmx':pre?' lk':r?' on':can?' cn':'')+(SKW6.nd===n.id?' sel':'')+'" data-skwn="'+n.id+'"><span class="knm">'+(sk!==undefined?skImg(me.cls,+sk,18):'')+n.n+'</span><span class="kpp">'+'<i class="kf"></i>'.repeat(r)+'<i></i>'.repeat(n.max-r)+'</span></button>'}).join('')+'</div></div>'});
  h+='</div>';
  if(lk.length)h+='<div class="skwlk">🔒 '+lk.map(b=>'<span><b>สาย'+b.bn+'</b> Lv '+b.rq+(b.aw?' + ตื่นพลัง':'')+'</span>').join('')+'</div>';
  let s=all.find(x=>x.n.id===SKW6.nd)||all.find(x=>x.can)||all[0];if(s){SKW6.nd=s.n.id;const n=s.n,r=s.r;
    h+='<div class="skwnd"><div class="ktx"><b>'+n.n+' <small>ขั้น '+r+'/'+n.max+'</small></b><span>'+n.d+'</span><span class="kv">'+(s.full?'✓ เต็มแล้ว '+skVal(n.k,r*n.v):(r?'ตอนนี้ '+skVal(n.k,r*n.v)+' → ':'')+(s.full?'':'<b>'+skVal(n.k,(r+1)*n.v)+'</b>'))+'</span>'+(s.pre?'<span class="kwy">🔒 ลง «'+s.prev.n+'» อย่างน้อย 1 แต้มก่อน</span>':'')+'</div>'+
      (s.full?'<button disabled>เต็มแล้ว</button>':'<button class="pri" data-n="'+n.id+'"'+(s.can?'':' disabled')+'>'+(p>0?(s.pre?'ยังล็อก':'+ ลงแต้ม'):'ไม่มีแต้ม')+'</button>')+'</div>'}
  return h}
/* ---------- แท็บรูนหลัก ---------- */
function skwRune(k){const R=RUNES[me.cls]&&RUNES[me.cls][k],S=rnSt();if(!R)return'<div class="skwem">สกิลนี้ยังไม่มีรูนหลัก</div>';const cur=rnOf(k),ed=skwCanEdit();let note='';
  try{if(k===4&&BR2()&&me.cls!=='melee'&&me.cls!=='archer'&&!(typeof RUNESB!=='undefined'&&RUNESB[me.cls]))note='รูนช่องนี้ทำให้ «'+SK4[me.cls][0]+'» ของสายแสง · สายทมิฬใส่ได้แต่ไม่มีผลกับ «'+sk4Of()[0]+'»'}catch(e){}
  let h=(note?'<div class="skwnt">'+note+'</div>':'')+'<div class="skwrg">';
  
  ['a','b'].forEach(e=>{const[id,ic,n,d]=R[e],own=!!S.u[id],lv=rnLv(id),on=cur===e;
    h+='<div class="skwrc'+(on?' on':'')+(own?'':' no')+'" style="--c:'+(e==='a'?'#ff7a5a':'#5ab0ff')+'"><div class="khd"><span class="kri">'+ic+'</span><b>รูน '+e.toUpperCase()+' · '+n+'</b>'+(own?'<span class="kst">'+'★'.repeat(lv)+'<i>'+'★'.repeat(3-lv)+'</i></span>':'')+(on?'<span class="kbd">ใช้อยู่</span>':own?'':'<span class="kbd kn">ยังไม่มี</span>')+'</div><small>'+d+(lv>1?' · <b style="color:#ffd84a">พลัง +'+(lv-1)*15+'%</b>':'')+'</small><div class="kbt">'+
      (on?'':own?'<button class="pri" data-skwre="'+k+':'+e+'"'+(ed?'':' disabled')+'>ใช้รูนนี้</button>':'<button class="pri" data-skwrc="'+id+'"'+((S.sh|0)>=RNC?'':' disabled')+'>สร้าง · 💠'+RNC+'</button>')+
      (own&&lv<3?'<button data-skwru="'+id+'"'+((S.sh|0)>=RNU[lv]?'':' disabled')+'>⬆️ ขั้น '+RNRM[lv+1]+' · 💠'+RNU[lv]+'</button>':own?'<span class="kmx">MAX</span>':'')+'</div></div>'});
  h+='</div><div class="skwnone'+(!cur?' on':'')+'"><span>⚪ <b>ไม่ใส่รูน</b> · สกิลทำงานแบบปกติ</span>'+(cur?'<button data-skwre="'+k+':"'+(ed?'':' disabled')+'>ถอดรูน ใช้แบบปกติ</button>':'<span class="kbd">ใช้อยู่</span>')+'</div><div class="skwft"><small>💠 ผงรูนได้จาก หัวหน้ามอน · เหตุการณ์สุ่ม · ดันเจี้ยน · บอส'+(ed?'':' · ⚔️ เปลี่ยนรูนไม่ได้ในลานประลอง')+'</small><button data-skwiris="main">📖 สมุดรูน</button></div>';return h}
/* ---------- แท็บลิงก์รูน ---------- */
function skwLink(k){if(SGK.indexOf(k)<0)return'<div class="skwem">🔗 ลิงก์รูนใส่ได้กับสกิล 1–4 · เลือกสกิลจากแถบด้านข้าง</div>';const X=sgSt(),N=sgSockN(),A=X.l[k]||[],ed=skwCanEdit();
  if(!N)return'<div class="skwem">🔒 ช่องลิงก์แรกปลดที่ Lv '+SGLV[0]+' (ช่อง 2 Lv '+SGLV[1]+' · ช่อง 3 Lv '+SGLV[2]+')</div>';
  let h='<div class="skwso">'+skImg(me.cls,k,46);
  for(let i=0;i<3;i++){const id=A[i],lk=i>=N,r=id&&SGD[id],bad=r&&!sgOk(id,k),c=r?sgCol(id):'';h+='<i class="kln'+(r&&!lk?' on':'')+'"'+(r&&!lk?' style="background:'+c+'"':'')+'></i>';
    h+='<div class="ksw"><button class="sock'+(r?' kf':'')+(lk?' lk':'')+(SKW6.sh===i?' sel':'')+'" data-skws="'+i+'"'+(lk?' disabled':'')+(r?' style="--c:'+c+'"':'')+'>'+(lk?'🔒':r?SGD[id][0]:'➕')+'</button><b>'+(lk?'Lv '+SGLV[i]:r?SGD[id][1]:'ว่าง')+'</b><small>'+(lk?'ปลดช่อง '+(i+1):r?(bad?'⚠️ ใช้กับสกิลนี้ไม่ได้':SGCAT[SGD[id][3]][1]+' '+'★'.repeat(sgLv(id))):'แตะเพื่อใส่')+'</small></div>'}
  h+='</div><div class="skwhint">แตะช่องเพื่อใส่ เปลี่ยน หรือถอดรูนเสริม · ตัวเลขด้านบนคิดผลรวมให้แล้ว'+(ed?'':' · ⚔️ เปลี่ยนไม่ได้ในลานประลอง')+'</div>';
  const cs=SKW6.set>=0?SKW6.set:(X.cur>=0?X.cur:0);
  h+='<div class="skwset"><span>ชุดลิงก์</span>'+[0,1,2].map(i=>'<button class="kpl'+(X.cur===i?' on':'')+(cs===i?' sel':'')+'" data-skwsl="'+i+'">'+(i+1)+(X.sv[i]?'':' <small>ว่าง</small>')+'</button>').join('')+'<button data-skwss="'+cs+'">💾 บันทึกเป็นชุด '+(cs+1)+'</button><span class="ksp"></span><button data-skwiris="sup">🎲 สุ่ม · แยก · คลังรูนเสริม</button></div>';
  if(SKW6.sh>=0&&SKW6.sh<N)h+=skwSheet(k,SKW6.sh);else SKW6.sh=-1;return h}
function skwPutChk(k,i,id){const X=sgSt(),A=X.l[k]||[],cur=A[i];if(cur===id)return{here:1};const ok=sgOk(id,k),dup=A.some((q,j)=>q===id&&j!==i),wh=sgWhere(id).filter(q=>q!==k),lim=!dup&&wh.length>=SGMAX,fr=sgFree(id),own=(X.i[id]|0)>0;
  let why='';if(!own)why='ยังไม่มีรูนนี้ · กด «สร้าง» หรือหาจากบอส ดันเจี้ยน หัวหน้ามอน';else if(!ok)why=(sgTags(k).includes('solo')&&SGSOLO[id])?'สกิล «ซ้อนไม่ได้» ใส่รูนที่ร่ายสำเนาไม่ได้':'สกิลนี้ใส่ไม่ได้ · ต้องการ: '+SGD[id][4].split(' ').map(q=>q[0]==='!'?'ไม่ใช่'+(SGTN[q.slice(1)]||q):(SGTN[q]||q)).join(', ');
  else if(dup)why='ใส่อยู่ในช่องอื่นของสกิลนี้แล้ว';else if(lim)why='ใส่ครบ '+SGMAX+' สกิลแล้ว ('+wh.map(q=>skName(q)).join(', ')+') · ถอดจากสกิลอื่นก่อน';else if(fr<=0)why='ทุกชิ้นถูกใส่ในสกิลอื่นแล้ว · สร้างเพิ่มได้';
  return{can:!why,why}}
function skwSheet(k,i){const X=sgSt(),A=X.l[k]||[],S=rnSt(),cur=A[i]||null,ids=Object.keys(SGD).filter(id=>SKW6.cat==='all'||SGD[id][3]===SKW6.cat);
  const info=id=>{const c=skwPutChk(k,i,id);return{id,c,own:(X.i[id]|0)>0,sc:c.here?0:c.can?1:(X.i[id]|0)>0?2:3}};const I=ids.map(info).sort((a,b)=>a.sc-b.sc);
  if(!SKW6.pk||!SGD[SKW6.pk])SKW6.pk=cur||(I.find(q=>q.c.can)||I[0]||{}).id;
  let h='<div class="skwsh"><div class="kbk" data-skwx="1"></div><div class="kbody"><div class="khd"><b>เลือกรูนเสริม · ช่อง '+(i+1)+' · '+skName(k)+'</b><button class="kx" data-skwx="1" aria-label="ปิด">✕</button></div>';
  h+='<div class="kcats">'+[['all','ทั้งหมด','#e7b75a']].concat(Object.keys(SGCAT).map(c=>[c,SGCAT[c][1],SGCAT[c][2]])).map(([c,l,col])=>'<button class="kct'+(SKW6.cat===c?' on':'')+'" data-skwc="'+c+'" style="--c:'+col+'">'+l+'</button>').join('')+'</div><div class="kmn"><div class="kgr">';
  I.forEach(q=>{const D=SGD[q.id],fr=sgFree(q.id);h+='<button class="cell2'+(SKW6.pk===q.id?' on':'')+(q.sc>=2?' no':'')+'" data-skwp="'+q.id+'" style="--c:'+sgCol(q.id)+'"><span class="kgi">'+D[0]+'</span><b>'+D[1]+'</b><small>'+(q.c.here?'ใส่อยู่':!q.own?'ยังไม่มี':q.c.can?'×'+fr+' · '+'★'.repeat(sgLv(q.id)):fr<=0&&!q.c.why.startsWith('ใส่ครบ')?'ใช้หมดแล้ว':'ใส่ไม่ได้')+'</small></button>'});
  if(!I.length)h+='<div class="skwem">ไม่มีรูนในหมวดนี้</div>';
  h+='</div>';const id=SKW6.pk;if(id&&SGD[id]){const D=SGD[id],c=skwPutChk(k,i,id),own=X.i[id]|0,lv=sgLv(id),m=D[5],cost=[];if(m.mana)cost.push('มานา ×'+m.mana);if(m.cd)cost.push('คูลดาวน์ ×'+m.cd);if(m.pow)cost.push('พลัง ×'+m.pow);
    const L=sgLinks(k),T=A.slice(0,sgSockN());if(c.here)T.splice(i,1);else{if(i<T.length)T[i]=id;else T.push(id)}const now=skwStat(k,L),nx=skwStat(k,T.filter(q=>q&&sgOk(q,k)));
    const ch=(lab,a,b,good,u)=>a==null?'':'<span class="kpv">'+lab+' '+a+u+skwDl(a,b,good,u)+'</span>';
    const up=own?sgUpOk(id):null,mk=D[3]==='rare'?SGSR:SGSC;
    h+='<div class="kdt"><div class="kh2"><span class="kgi" style="--c:'+sgCol(id)+'">'+D[0]+'</span><div><b>'+D[1]+'</b><small>'+(own?'<span class="kst">'+'★'.repeat(lv)+'<i>'+'★'.repeat(3-lv)+'</i></span> · มี '+own+' ชิ้น · ':'')+'<span style="color:'+SGCAT[D[3]][2]+'">'+SGCAT[D[3]][1]+'</span></small></div></div>'+
      '<p>'+D[2]+'</p>'+(cost.length?'<small class="kcs">ราคา: '+cost.join(' · ')+'</small>':'')+
      '<div class="kpvs"><small>'+(c.here?'ถ้าถอด':'ถ้าใส่')+':</small>'+ch('พลัง',nx.pow,now.pow,true,'%')+ch('มานา',nx.mp,now.mp,false,'')+ch('คูล',nx.cd,now.cd,false,' วิ')+'</div>'+
      (c.why&&!c.here?'<div class="kwy">'+c.why+'</div>':'')+'<div class="kbts">'+
      (c.here?'<button class="krm" data-skwq="del">ถอดรูน</button>':'<button class="pri" data-skwq="put"'+(c.can&&skwCanEdit()?'':' disabled')+'>'+(cur?'เปลี่ยนเป็นรูนนี้':'ใส่รูน')+'</button>')+
      '<button data-skwq="mk"'+((S.sh|0)>=mk?'':' disabled')+'>สร้าง · 💠'+mk+'</button>'+
      (own?(lv>=3?'<span class="kmx">MAX</span>':'<button data-skwq="up"'+(up&&up.ok?'':' disabled')+' title="ใช้รูนซ้ำ '+(up?up.n:0)+' ชิ้น">⬆️ ขั้น '+SGRM[lv+1]+' · '+(up?up.n:0)+' ชิ้น + 💠'+(up?up.sh:0)+'</button>'):'')+'</div></div>'}
  return h+'</div></div></div>'}
/* ---------- รวมหน้า ---------- */
function skwH(){skwCSS();if(skSub==='pool'){SKW6.t='pool';skSub='tree'}const ks=skwKs();if(ks.indexOf(SKW6.k)<0)SKW6.k=0;if(SKW6.t==='pool'&&!(typeof Q8D!=='undefined'&&Q8D[me.cls]))SKW6.t='link';
  let h='<div class="skw'+(SKW6.t==='tree'||SKW6.t==='pool'?' wide':'')+'">'+skwTabs();if(SKW6.msg){h+='<div class="note">'+SKW6.msg+'</div>';SKW6.msg=''}
  if(SKW6.t==='tree')h+=skwTree();
  else if(SKW6.t==='pool'){let m='';try{m=Q8A.msg||'';Q8A.msg=''}catch(e){}let ph='';try{ph=q8PoolH(m);q8Seen()}catch(e){}h+=ph||'<div class="skwem">ยังไม่มีคลังสกิล</div>'}
  else{const k=SKW6.k;h+='<div class="skwb">'+skwRail()+'<div class="skwm">'+skwHead(k)+(SKW6.t==='rune'?skwRune(k):skwLink(k))+'</div></div>'}
  return h+'</div>'}
function skwRe(msg,keep){if(msg)SKW6.msg=msg;const st=ov.scrollTop;try{charTab='tr';treeUI();ov.hidden=false}catch(e){console.warn('skw',e)}if(keep!==false)ov.scrollTop=st}
function skwOpen(t,k){if(!me.cls)return;SKW6.on=1;if(t)SKW6.t=t;if(k!==undefined)SKW6.k=k;SKW6.sh=-1;skwSave();charTab='tr';treeUI();ov.hidden=false;ov.scrollTop=0}
/* ---------- ปุ่มต่าง ๆ ---------- */
function skwClick(b){const d=b.dataset,S=rnSt(),X=sgSt(),k=SKW6.k;
  if(d.skwt){SKW6.t=d.skwt;SKW6.sh=-1;skwSave();return skwRe('',false)}
  if(d.skwold){SKW6.on=0;skwSave();if(skSub==='tree'||!skSub)skSub='tree';banner={s:'กลับเป็นหน้าสกิลแบบเดิม · เปิดหน้าใหม่ได้ที่ปุ่ม «✨ หน้าต่างสกิลใหม่»',t:3};try{treeUI()}catch(e){}return}
  if(d.skwk!==undefined){SKW6.k=+d.skwk;SKW6.sh=-1;SKW6.pk=null;return skwRe()}
  if(d.skwn){SKW6.nd=d.skwn;return skwRe()}
  if(d.skwiris){SGTAB=d.skwiris==='sup'?'sup':'';SGSEL=null;try{runeUI()}catch(e){}ov.hidden=false;return}
  if(d.skwrc){const id=d.skwrc;if((S.sh|0)<RNC)return;S.sh-=RNC;S.u[id]=1;try{sfx('lg_get')}catch(e){}try{achCheck()}catch(e){}return skwRe('💠 สร้างรูนสำเร็จ! กด «ใช้รูนนี้» เพื่อใส่')}
  if(d.skwru){const id=d.skwru,lv=rnLv(id);if(lv<1||lv>=3||(S.sh|0)<RNU[lv])return;S.sh-=RNU[lv];S.u[id]=lv+1;me.stt.rnup=(me.stt.rnup|0)+1;try{sfx('up')}catch(e){}try{burst(me.x,me.y-20,['#ffd84a','#c8a0ff','#ffffff'],30,140,.8,{glow:1,g:-30})}catch(e){}try{achCheck()}catch(e){}return skwRe('⬆️ อัปเป็นขั้น '+RNRM[lv+1]+' แล้ว! พลังสกิลที่ใช้รูนนี้ +'+lv*15+'%')}
  if(d.skwre!==undefined){if(!skwCanEdit())return;const[kk,e]=d.skwre.split(':');if(e)S.e[kk]=e;else delete S.e[kk];try{sfx('equip')}catch(x){}return skwRe(e?'ใส่รูนแล้ว — ลองใช้สกิลได้เลย':'ถอดรูนแล้ว')}
  if(d.skws!==undefined){const i=+d.skws;if(i>=sgSockN())return;SKW6.sh=SKW6.sh===i?-1:i;SKW6.pk=null;return skwRe()}
  if(d.skwx){SKW6.sh=-1;SKW6.pk=null;return skwRe()}
  if(d.skwc){SKW6.cat=d.skwc;return skwRe()}
  if(d.skwp){SKW6.pk=d.skwp;return skwRe()}
  if(d.skwsl!==undefined){const i=+d.skwsl;SKW6.set=i;if(!X.sv[i])return skwRe('ชุด '+(i+1)+' ยังว่าง · กด «💾 บันทึกเป็นชุด '+(i+1)+'» เพื่อเก็บลิงก์ตอนนี้');if(!skwCanEdit())return;return skwRe(sgSetLoad(i))}
  if(d.skwss!==undefined){const i=+d.skwss;X.sv[i]={l:JSON.parse(JSON.stringify(X.l))};X.cur=i;SKW6.set=i;try{sfx('equip')}catch(e){}return skwRe('💾 บันทึกชุดลิงก์ '+(i+1)+' แล้ว')}
  if(d.skwq){const i=SKW6.sh,id=SKW6.pk;if(i<0||!id||!SGD[id])return;const A=X.l[k]=X.l[k]||[];
    if(d.skwq==='del'){if(!skwCanEdit()||A[i]!==id)return;A.splice(i,1);X.cur=-1;SKW6.sh=-1;try{sfx('equip')}catch(e){}return skwRe('ถอด «'+SGD[id][1]+'» แล้ว')}
    if(d.skwq==='put'){if(!skwCanEdit()||!skwPutChk(k,i,id).can)return;if(i<A.length)A[i]=id;else A.push(id);if(A.length>3)A.length=3;X.cur=-1;SKW6.sh=-1;try{sfx('equip')}catch(e){}try{burst(me.x,me.y-20,[sgCol(id),'#ffffff'],14,110,.5,{glow:1,g:-30})}catch(e){}return skwRe('ลิงก์ «'+SGD[id][0]+' '+SGD[id][1]+'» เข้ากับ '+skName(k)+' แล้ว — ลองใช้สกิลได้เลย')}
    if(d.skwq==='mk'){const cs=SGD[id][3]==='rare'?SGSR:SGSC;if((S.sh|0)<cs)return;S.sh-=cs;X.i[id]=(X.i[id]|0)+1;try{sfx('lg_get')}catch(e){}return skwRe('💠 สร้าง «'+SGD[id][0]+' '+SGD[id][1]+'» แล้ว')}
    if(d.skwq==='up'){const r=sgUpOk(id);if(!r.ok)return;X.i[id]-=r.n;S.sh-=r.sh;X.v[id]=sgLv(id)+1;try{sfx('up')}catch(e){}return skwRe('⬆️ «'+SGD[id][1]+'» ขึ้นขั้น '+SGRM[sgLv(id)]+' แล้ว! ผลรูน +'+(sgLv(id)-1)*20+'%')}}}
{const ovE=document.getElementById('ov');if(ovE)ovE.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-skwt],[data-skwold],[data-skwk],[data-skwn],[data-skwiris],[data-skwrc],[data-skwru],[data-skwre],[data-skws],[data-skwx],[data-skwc],[data-skwp],[data-skwsl],[data-skwss],[data-skwq],[data-skwnew]');if(!b||!me.cls)return;
  e.stopPropagation();e.preventDefault();if(b.disabled)return;if(b.dataset.skwnew){skwOpen(b.dataset.skwnew);return}try{if(!b.dataset.skwx&&!b.dataset.skwq)sfx('click')}catch(x){}try{skwClick(b)}catch(x){console.warn('skw',x)}},true)}
/* ---------- สไตล์ ---------- */
function skwCSS(){if(document.getElementById('skwcss'))return;const s=document.createElement('style');s.id='skwcss';s.textContent=
'body #ov>.pn.skwp{display:flex!important;column-count:auto!important}body #ov>.pn.skwp>*{column-span:none!important}'+
'#ov .skw{--g:#e7b75a;--ln:rgba(231,183,90,.22);--bg2:rgba(0,0,0,.28);display:flex;flex-direction:column;gap:8px;color:#f3e6cf;text-align:left;min-width:0}'+
'#ov .skw button{font-family:inherit;cursor:pointer}'+
'#ov .skw .note{margin:0}'+
'#ov .skwtb{display:flex;align-items:center;gap:8px;flex-wrap:wrap}#ov .skwtb .ktbs{display:flex;gap:4px;padding:3px;border-radius:12px;background:var(--bg2);flex-wrap:wrap}'+
'#ov .skw .skwt{min-height:38px;padding:4px 12px;border-radius:9px;border:1px solid transparent;background:transparent;color:#cdbfa8;font-size:14px;font-weight:600;position:relative}'+
'#ov .skw .skwt.on{background:linear-gradient(180deg,#ffe7a6,#ebbd5c 52%,#c18a30);color:#24170a;border-color:#8a6420}'+
'#ov .skw .skwt .kdt{position:absolute;top:4px;right:4px}'+
'#ov .skwtb .kchp{display:flex;gap:6px;align-items:center;margin-left:auto;font-size:13px}#ov .skwtb .kchp span{padding:4px 10px;border-radius:999px;background:var(--bg2);border:1px solid var(--ln);white-space:nowrap}#ov .skwtb .kchp b{color:#ffd27a}'+
'#ov .skw .skwold{font-size:11px;padding:4px 8px;min-height:30px;border-radius:8px;opacity:.75}'+
'#ov .skwb{display:grid;grid-template-columns:86px minmax(0,1fr);gap:10px;align-items:start}'+
'#ov .skwr{display:flex;flex-direction:column;gap:6px;position:sticky;top:0}'+
'#ov .skw .skwsk{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px 5px;border-radius:12px;border:1px solid var(--ln);background:var(--bg2);color:#f3e6cf}'+
'#ov .skw .skwsk.on{border:2px solid var(--g);background:rgba(231,183,90,.16);box-shadow:0 0 12px rgba(231,183,90,.25)}#ov .skw .skwsk.lk img{filter:grayscale(1) brightness(.6)}'+
'#ov .skwsk .ski{border-radius:9px}#ov .skwsk .kkl{font-size:11px;font-weight:700;color:#ffe2a6}#ov .skwsk .klkk{position:absolute;top:2px;right:4px;font-size:11px}'+
'#ov .skwsk .kdt{display:flex;gap:2px;min-height:7px}#ov .skwsk .kdt i{width:7px;height:7px;border-radius:50%;border:1px solid #6b5a44;display:block}#ov .skwsk .kdt i.krm{border-radius:2px;transform:rotate(45deg);border:0;margin-right:2px}#ov .skwsk .kdt i.kx{opacity:.25}'+
'#ov .skwm{display:flex;flex-direction:column;gap:8px;min-width:0;padding:10px 12px;border-radius:14px;background:var(--bg2);border:1px solid var(--ln)}'+
'#ov .skwh{display:flex;align-items:center;gap:10px;flex-wrap:wrap}#ov .skwh .ski{border-radius:12px;box-shadow:0 0 0 2px rgba(231,183,90,.5)}'+
'#ov .skwh .knm{display:flex;flex-direction:column;gap:2px;min-width:120px;flex:1}#ov .skwh .knm b{font-size:18px;color:#ffe2a6}#ov .skwh .knm small{font-size:12px;opacity:.8}'+
'#ov .skw .ktg{display:flex;gap:4px;flex-wrap:wrap}#ov .skw .ktg i{font-style:normal;font-size:11px;padding:1px 8px;border-radius:999px;background:rgba(255,236,205,.1)}'+
'#ov .skwh .kstat{display:flex;gap:6px;flex-wrap:wrap}#ov .skw .ksc{display:flex;flex-direction:column;align-items:center;min-width:64px;padding:4px 8px;border-radius:10px;background:rgba(0,0,0,.3);border:1px solid var(--ln);line-height:1.2}'+
'#ov .skw .ksc small{font-size:11px;opacity:.75}#ov .skw .ksc b{font-size:15px}#ov .skw em{font-style:normal;font-size:11px;font-weight:700}#ov .skw em.kg{color:#6fe0a0}#ov .skw em.kb{color:#ff9d8a}'+
'#ov .skwds{font-size:12.5px;opacity:.85;line-height:1.45}'+
'#ov .skwem{padding:14px;text-align:center;opacity:.85;font-size:13px}#ov .skwnt{font-size:12px;color:#ffd27a}'+
'#ov .skwso{display:flex;align-items:center;justify-content:center;flex-wrap:nowrap;padding:6px 0 2px}#ov .skwso .ski{border-radius:12px;flex-shrink:0}'+
'#ov .skwso .kln{display:block;width:18px;height:4px;border-radius:2px;background:#3a2e22;flex-shrink:0;margin-bottom:34px}'+
'#ov .skwso .ksw{display:flex;flex-direction:column;align-items:center;gap:2px;width:92px;text-align:center}#ov .skwso .ksw b{font-size:13px;color:#ffe2a6;line-height:1.2}#ov .skwso .ksw small{font-size:10.5px;opacity:.75;line-height:1.2}'+
'#ov .skw .sock{width:60px;height:60px;border-radius:50%;font-size:26px;display:flex;align-items:center;justify-content:center;border:2px dashed #6b5a44;background:rgba(0,0,0,.35);padding:0}'+
'#ov .skw .sock.kf{border:3px solid var(--c);background:radial-gradient(circle at 50% 35%,rgba(255,255,255,.18),rgba(0,0,0,.35));box-shadow:0 0 14px color-mix(in srgb,var(--c) 45%,transparent)}#ov .skw .sock.sel{outline:3px solid #ffe2a6;outline-offset:2px}#ov .skw .sock.lk{opacity:.45;font-size:18px}'+
'#ov .skwhint{text-align:center;font-size:12px;opacity:.75}'+
'#ov .skwset{display:flex;align-items:center;gap:5px;flex-wrap:wrap;font-size:12.5px;padding-top:6px;border-top:1px solid var(--ln)}#ov .skwset .ksp{flex:1}'+
'#ov .skw .skwset button{min-height:34px;padding:3px 10px;border-radius:9px;font-size:12.5px}#ov .skw .skwset .kpl{min-width:40px;font-weight:700}#ov .skw .skwset .kpl.on{border-color:var(--g)!important;color:#ffe2a6}#ov .skw .skwset .kpl.sel{box-shadow:0 0 0 2px rgba(231,183,90,.6)}#ov .skwset .kpl small{font-weight:400;opacity:.6;font-size:10px}'+
'#ov .skwrg{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px}'+
'#ov .skwrc{--c:#8a7a66;display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:12px;background:rgba(0,0,0,.3);border:1px solid var(--ln);border-left:4px solid var(--c)}#ov .skwrc.on{border-color:var(--g);border-left-color:var(--c);box-shadow:0 0 0 1px var(--g) inset}#ov .skwrc.no .kri{filter:grayscale(.8);opacity:.7}'+
'#ov .skwrc .khd{display:flex;align-items:center;gap:6px;flex-wrap:wrap}#ov .skwrc .kri{font-size:24px}#ov .skwrc .khd b{font-size:14.5px;color:#ffe2a6}#ov .skwrc small{font-size:12px;opacity:.85;line-height:1.4}'+
'#ov .skw .kst{color:#ffd84a;letter-spacing:1px;font-size:12px}#ov .skw .kst i{font-style:normal;opacity:.3}'+
'#ov .skw .kbd{margin-left:auto;font-size:11px;font-weight:700;padding:2px 9px;border-radius:999px;background:var(--g);color:#24170a}#ov .skw .kbd.kn{background:transparent;border:1px solid var(--ln);color:#cdbfa8}'+
'#ov .skwrc .kbt{display:flex;gap:6px;flex-wrap:wrap}#ov .skw .skwrc .kbt button,#ov .skw .skwrc>button{flex:1;min-height:40px;border-radius:10px;font-size:13px;font-weight:600}'+
'#ov .skw .kmx{font-size:11px;font-weight:700;color:#ffd84a;align-self:center;padding:0 6px}'+
'#ov .skwnone{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:10px;border:1px dashed var(--ln);font-size:12.5px}#ov .skwnone span:first-child{flex:1}#ov .skwnone.on{border-color:var(--g)}#ov .skw .skwnone button{min-height:34px;font-size:12.5px;border-radius:9px}'+
'#ov .skwft{display:flex;align-items:center;gap:8px;flex-wrap:wrap}#ov .skwft small{flex:1;font-size:11.5px;opacity:.75}#ov .skw .skwft button{min-height:34px;font-size:12.5px;border-radius:9px}'+
'#ov .skw.wide{}#ov .skwtt{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:13px}#ov .skwtt .ksp{flex:1}#ov .skwtt b.khv{color:#ffd27a;font-size:17px}#ov .skw .skwtt button{min-height:36px;border-radius:9px;font-size:13px}'+
'#ov .skwtr{display:flex;flex-direction:column;gap:6px}#ov .skwbr{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:12px;background:var(--bg2);border:1px solid var(--ln)}#ov .skwbr.fu{opacity:.8}'+
'#ov .skwbr .kbn{width:96px;flex-shrink:0;display:flex;flex-direction:column}#ov .skwbr .kbn b{font-size:13.5px;color:#ffe2a6;line-height:1.25}#ov .skwbr .kbn small{font-size:11px;opacity:.7}'+
'#ov .skwbr .knds{display:flex;align-items:center;flex:1;min-width:0}#ov .skwbr .kln{display:block;flex:0 0 14px;height:3px;border-radius:2px;background:#3a2e22}#ov .skwbr .kln.on{background:var(--g)}'+
'#ov .skw .skwn{flex:1;min-width:0;min-height:48px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:3px;padding:5px 8px;border-radius:10px;border:1px solid var(--ln);background:rgba(0,0,0,.3);color:#f3e6cf}'+
'#ov .skwn .knm{display:flex;align-items:center;gap:4px;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}#ov .skwn .knm .ski{border-radius:4px;flex-shrink:0}'+
'#ov .skwn .kpp{display:flex;gap:3px}#ov .skwn .kpp i{display:block;width:14px;height:5px;border-radius:3px;background:#3a2e22}#ov .skwn .kpp i.kf{background:var(--g)}'+
'#ov .skw .skwn.cn{border-color:rgba(111,224,160,.55)}#ov .skw .skwn.on{border-color:rgba(231,183,90,.6)}#ov .skw .skwn.kmx{border-color:var(--g);background:rgba(231,183,90,.14)}#ov .skw .skwn.lk{opacity:.5}#ov .skw .skwn.sel{border:2px solid #ffe2a6;box-shadow:0 0 10px rgba(255,226,166,.35)}'+
'#ov .skwlk{display:flex;flex-wrap:wrap;gap:6px;font-size:12px;opacity:.8}#ov .skwlk span{padding:3px 9px;border-radius:999px;background:var(--bg2)}'+
'#ov .skwnd{position:sticky;bottom:-12px;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:#2a1d14;border:1px solid var(--g);box-shadow:0 -6px 18px rgba(0,0,0,.5);z-index:2}'+
'#ov .skwnd .ktx{flex:1;display:flex;flex-direction:column;gap:2px;font-size:12.5px;min-width:0}#ov .skwnd .ktx b{font-size:15px;color:#ffe2a6}#ov .skwnd .ktx small{font-weight:400;opacity:.75}#ov .skwnd .kv b{color:#6fe0a0}#ov .skwnd .kwy{color:#ff9d8a}'+
'#ov .skw .skwnd button{min-height:48px;padding:0 22px;border-radius:12px;font-size:15px;font-weight:700}'+
'body:has(.skwsh) #ovx{display:none!important}'+
'.skwsh{position:fixed;inset:0;z-index:9000;display:flex;flex-direction:column;justify-content:flex-end}.skwsh .kbk{position:absolute;inset:0;background:rgba(0,0,0,.55)}'+
'.skwsh .kbody{position:relative;max-height:86vh;display:flex;flex-direction:column;gap:8px;padding:10px 14px calc(12px + env(safe-area-inset-bottom));background:#1a120d;border-top:2px solid #e7b75a;border-radius:18px 18px 0 0;box-shadow:0 -12px 30px rgba(0,0,0,.6);color:#f3e6cf;width:min(100%,1100px);margin:0 auto;box-sizing:border-box}'+
'.skwsh .khd{display:flex;align-items:center;gap:8px}.skwsh .khd b{flex:1;font-size:15px;color:#ffe2a6}.skwsh .kx{width:40px;height:40px;border-radius:50%!important;padding:0!important}'+
'.skwsh .kcats{display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;flex-shrink:0}.skwsh .kct{white-space:nowrap;min-height:32px;padding:2px 11px!important;border-radius:999px!important;font-size:12.5px!important;border:1px solid rgba(231,183,90,.25)!important;background:transparent!important;color:#cdbfa8!important}.skwsh .kct.on{border-color:var(--c)!important;color:#fff!important;background:color-mix(in srgb,var(--c) 22%,transparent)!important}'+
'.skwsh .kmn{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:12px;min-height:0;flex:1}'+
'.skwsh .kgr{display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));gap:6px;overflow-y:auto;align-content:start;min-height:0;padding:2px}'+
'.skwsh .cell2{--c:#888;display:flex;flex-direction:column;align-items:center;gap:1px;padding:7px 3px!important;min-height:82px;border-radius:12px!important;border:1px solid rgba(231,183,90,.18)!important;background:rgba(255,236,205,.05)!important;color:#f3e6cf!important;border-top:3px solid var(--c)!important}'+
'.skwsh .cell2 .kgi{font-size:24px;line-height:1.2}.skwsh .cell2 b{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.skwsh .cell2 small{font-size:10.5px;opacity:.75}.skwsh .cell2.on{background:rgba(231,183,90,.18)!important;border-color:#e7b75a!important;box-shadow:0 0 0 1px #e7b75a}.skwsh .cell2.no{opacity:.45}'+
'.skwsh .kdt{display:flex;flex-direction:column;gap:6px;padding-left:12px;border-left:1px solid rgba(231,183,90,.2);overflow-y:auto;min-height:0}'+
'.skwsh .kh2{display:flex;gap:10px;align-items:center}.skwsh .kh2 .kgi{--c:#888;width:44px;height:44px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:26px;background:color-mix(in srgb,var(--c) 30%,transparent);border:2px solid var(--c)}'+
'.skwsh .kh2 b{font-size:16px;color:#ffe2a6;display:block}.skwsh .kh2 small{font-size:12px}.skwsh .kst{color:#ffd84a;letter-spacing:1px}.skwsh .kst i{font-style:normal;opacity:.3}'+
'.skwsh p{margin:0;font-size:12.5px;line-height:1.45}.skwsh .kcs{font-size:11.5px;opacity:.75}.skwsh .kpvs{display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:12px}.skwsh .kpv{padding:2px 8px;border-radius:999px;background:rgba(0,0,0,.35);border:1px solid rgba(231,183,90,.2)}'+
'.skwsh em{font-style:normal;font-weight:700;margin-left:3px}.skwsh em.kg{color:#6fe0a0}.skwsh em.kb{color:#ff9d8a}.skwsh .kwy{font-size:12px;color:#ff9d8a}'+
'.skwsh .kbts{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto}.skwsh .kbts button{flex:1 1 auto;min-height:46px;border-radius:12px!important;font-size:14px!important;font-weight:700}.skwsh .kbts .krm{background:#5a2a20!important;color:#ffd2c6!important;border-color:#8a4a3a!important}.skwsh .kmx{color:#ffd84a;font-weight:700;align-self:center}'+
'@media (max-aspect-ratio:1/1){#ov .skwb{grid-template-columns:minmax(0,1fr)}#ov .skwr{flex-direction:row;overflow-x:auto;position:static;scrollbar-width:none;padding-bottom:2px}#ov .skw .skwsk{flex:0 0 62px}'+
'#ov .skwbr{flex-direction:column;align-items:stretch}#ov .skwbr .kbn{width:auto;flex-direction:row;justify-content:space-between}#ov .skwso .ksw{width:76px}#ov .skwso .kln{width:10px}#ov .skwn .knm{white-space:normal;font-size:12px;line-height:1.2}#ov .skw .skwn{padding:5px 6px}#ov .skw .sock{width:54px;height:54px}'+
'#ov .skwtb .ktbs{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);width:100%}#ov .skw .skwt{padding:4px 2px;font-size:12.5px}#ov .skwtb .kchp{margin-left:0;width:100%}#ov .skwtb .kchp .skwold{margin-left:auto}'+
'.skwsh .kmn{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(150px,1fr) auto}.skwsh .kgr{grid-template-columns:repeat(4,minmax(0,1fr))}.skwsh .kdt{padding:8px 0 0;border-left:0;border-top:1px solid rgba(231,183,90,.2)}.skwsh .kbody{max-height:90vh}}'+
'@media (max-height:480px) and (min-aspect-ratio:1/1){.skwsh .kbody{max-height:96vh;padding-top:6px;gap:6px}.skwsh .kbts button{min-height:40px;font-size:13px!important}.skwsh .kdt{gap:4px}body #ov>.pn.skwp>.ph{padding-top:0!important;padding-bottom:2px!important;min-height:0}body #ov>.pn.skwp>.ph small{display:none!important}body #ov>.pn.skwp>.ph .ic{transform:scale(.8)}body #ov>.pn.skwp>.tabs .tab{min-height:34px!important;padding-top:2px!important;padding-bottom:2px!important}}.skwsh .cell2>*{line-height:1.25}.skwsh .cell2 .kgi{line-height:1.15}'+
'.skwnew{display:flex;align-items:center;gap:8px;padding:8px 10px!important;border:1px solid #e7b75a!important;background:rgba(231,183,90,.12)!important;border-radius:14px!important}.skwnew span{flex:1;font-size:12.5px;text-align:left}';
document.head.appendChild(s)}
/* ---------- ติดตั้ง: ห่อหน้าสกิล (ชั้นนอกสุด) + ปุ่มลัดในหน้าช่างรูนเดิม ---------- */
setTimeout(()=>{try{
  const _sk=skTabH;window.skTabH=skTabH=function(){if(!SKW6.on||!me.cls)return _sk.apply(this,arguments);try{return skwH()}catch(e){console.warn('skw',e);SKW6.on=0;return _sk.apply(this,arguments)}};
  const _tu=treeUI;window.treeUI=treeUI=function(){const r=_tu.apply(this,arguments);try{const w=ov.querySelector('.skw'),P=ov.querySelector('.pn');if(P)P.classList.toggle('skwp',!!w);
      if(w&&P){[...P.children].forEach(c=>{if(c!==w&&c.classList&&c.classList.contains('card')&&!c.contains(w)&&(c.querySelector('.xpb')||c.querySelector('[data-sgsl]')))c.remove()})}
      else if(P&&charTab==='tr'&&!SKW6.on&&me.cls&&!P.querySelector('.skwnew')){const t=P.querySelector('.tabs');if(t)t.insertAdjacentHTML('afterend','<button class="card skwnew" data-skwnew="link"><span>✨ <b>หน้าต่างสกิลใหม่</b> — อัปสกิล รูนหลัก ลิงก์รูน ในหน้าเดียว</span><b>เปิด ›</b></button>')}}catch(e){}return r};
  const ins=()=>{try{if(!me.cls||ov.dataset.k!=='rune')return;const p=ov.querySelector('.pn[data-pn="rune"]'),hd=p&&p.querySelector('.ph');if(!hd||p.querySelector('.skwnew'))return;skwCSS();
      hd.insertAdjacentHTML('afterend','<button class="card skwnew" data-skwnew="'+(SGTAB==='sup'?'link':'rune')+'"><span>✨ <b>หน้าต่างสกิลใหม่</b> — ใส่รูนหลัก/ลิงก์รูนแบบเห็นค่าทันที เปลี่ยนได้ทุกที่ (เมนู → ตัวละคร → สกิล)</span><b>เปิด ›</b></button>')}catch(e){}};
  const _ru=runeUI;window.runeUI=runeUI=function(){const r=_ru.apply(this,arguments);ins();return r};
  const _sg=sgUI;window.sgUI=sgUI=function(){const r=_sg.apply(this,arguments);ins();return r};
}catch(e){console.warn('skw init',e)}},2300);
