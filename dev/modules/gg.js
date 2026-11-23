/* ---------- v656 ล็อกอินด้วย Google (Gmail) ----------
   ปุ่ม "ลงชื่อเข้าใช้ด้วย Google" (Google Identity Services) ในกล่องบัญชี · เซิร์ฟเวอร์ตรวจ token เอง เก็บแค่รหัสผู้ใช้ Google
   ยังไม่มีบัญชีเกม → ตั้งชื่อบัญชีแล้วสร้าง (ไม่ต้องมี PIN) หรือล็อกอินบัญชีเดิมด้วยชื่อ+PIN แล้วผูกให้อัตโนมัติ
   ล็อกอินอยู่แล้ว → ปุ่มผูก Google ไว้ใช้ครั้งหน้า · แสดงเมื่อเซิร์ฟเวอร์ตั้ง GOOGLE_CLIENT_ID แล้วเท่านั้น */
const GSIN={cid:'',sc:0,ok:0,pend:null,msg:'',busy:0};
function ggEsc(s){return String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';')}
async function ggCfg(){if(!srvAcc())return;try{const r=await fetch('/api/acc/gcfg',{cache:'no-store'});const j=await r.json();GSIN.cid=typeof j.cid==='string'?j.cid:'';if(GSIN.cid&&document.getElementById('accbox'))ggRefresh()}catch(e){}}
function ggLoad(){if(GSIN.sc)return;GSIN.sc=1;const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.async=true;s.onload=()=>{GSIN.ok=1;ggMount()};s.onerror=()=>{GSIN.sc=0;GSIN.msg='โหลดปุ่ม Google ไม่ได้ (เน็ตหรือเบราว์เซอร์บล็อก) ใช้ชื่อบัญชี+PIN แทนได้';ggRefresh()};document.head.appendChild(s)}
let ggInit=0;
function ggMount(){const el=document.getElementById('ggb');if(!el||!GSIN.cid)return;if(!GSIN.ok){ggLoad();return}
  try{const G=window.google&&google.accounts&&google.accounts.id;if(!G)return;
    if(ggInit!==GSIN.cid){G.initialize({client_id:GSIN.cid,callback:ggCb,auto_select:false,cancel_on_tap_outside:true,itp_support:true});ggInit=GSIN.cid}
    el.innerHTML='';G.renderButton(el,{type:'standard',theme:'filled_blue',size:'large',shape:'pill',text:ACC?'continue_with':'signin_with',logo_alignment:'left',locale:'th',width:Math.max(200,Math.min(320,(el.clientWidth|0)||280))})}catch(e){}}
function ggHtml(){if(!GSIN.cid)return'';const m='<p id="ggm" style="font-size:12.5px;margin:4px 0;color:#ffd98a">'+ggEsc(GSIN.msg)+'</p>';
  const S='style="width:100%;box-sizing:border-box;padding:8px;margin-top:6px"';
  if(ACC){if(ACC.g)return'<div id="ggw" style="font-size:12px;color:#9fe09f;margin:4px 0">✓ ผูกกับ Google แล้ว · เครื่องอื่นกด "ลงชื่อเข้าใช้ด้วย Google" ได้เลย'+(ACC.np?'<br><span style="color:#cfc5b4">บัญชีนี้ยังไม่มี PIN (ตั้งไว้ใช้กับเครื่องที่ไม่มี Google)</span><input id="ggp" type="password" maxlength="32" autocomplete="new-password" placeholder="ตั้งรหัส PIN (4-32 ตัว)" '+S+'><div class="row" style="margin-top:6px"><button id="ggs">ตั้ง PIN</button></div>':'')+m+'</div>';
    return'<div id="ggw" style="margin:6px 0"><div style="font-size:12px;color:#cfc5b4">ผูกบัญชีนี้กับ Google ไว้ล็อกอินครั้งหน้าไม่ต้องจำ PIN</div><div id="ggb" style="min-height:44px;margin-top:4px"></div>'+m+'</div>'}
  if(GSIN.pend)return'<div id="ggw" style="margin:6px 0;padding:8px;border:1px dashed #6a8fd6;border-radius:8px"><b style="font-size:13px">บัญชี Google นี้ยังไม่มีบัญชีเกม</b><div style="font-size:12px;color:#cfc5b4">ตั้งชื่อบัญชีเกม (a-z 0-9 _ ยาว 3-20) แล้วกดสร้าง · ตัวละครในเครื่องนี้จะถูกเก็บขึ้นเซิร์ฟเวอร์</div><input id="ggn" maxlength="20" autocapitalize="off" spellcheck="false" placeholder="ชื่อบัญชีเกม" '+S+'><div class="row" style="margin-top:6px"><button id="ggc">สร้างบัญชีด้วย Google</button><button id="ggx">ยกเลิก</button></div><div style="font-size:12px;color:#cfc5b4;margin-top:4px">มีบัญชีเดิมอยู่แล้ว? ใส่ชื่อบัญชี + PIN ด้านล่างแล้วกด "ล็อกอิน" ระบบจะผูก Google ให้อัตโนมัติ</div>'+m+'</div>';
  return'<div id="ggw" style="margin:6px 0"><div id="ggb" style="min-height:44px"></div>'+m+'<div style="text-align:center;font-size:12px;color:#cfc5b4;margin-top:2px">— หรือใช้ชื่อบัญชี + PIN —</div></div>'}
function ggRefresh(){const w=document.getElementById('ggw');if(w){w.outerHTML=ggHtml()}else{const b=document.getElementById('accbox');if(!b)return;const p=b.querySelector('p');const h=ggHtml();if(!h)return;if(p)p.insertAdjacentHTML('afterend',h);else b.insertAdjacentHTML('beforeend',h)}setTimeout(ggMount,0)}
function ggSay(t){GSIN.msg=t;const m=document.getElementById('ggm');if(m)m.textContent=t}
/* หลังล็อกอินสำเร็จ: ทำแบบเดียวกับล็อกอินชื่อ+PIN */
async function ggFinish(r,reg){ACC={a:r.a,t:r.t,g:1,np:r.np?1:0};accStore();accRev=r.rev|0;accMsg='';GSIN.pend=null;GSIN.msg='';
  if(reg){accLoaded=true;if(Object.keys(saves.chars).length)await accPush();else setSaveState('บันทึกบนเซิร์ฟเวอร์ ('+r.a+')')}
  else{const ok=await accLoad();setSaveState(ok?'บันทึกบนเซิร์ฟเวอร์ ('+r.a+')':'ล็อกอินแล้ว แต่โหลดเซฟไม่ได้ ลองรีเฟรช')}
  delArm=null;if(me.cls){if(!ov.hidden&&ov.dataset.k==='mkt'){MKD=null;MKE='';mkFetch();mktUI('✅ ล็อกอินบัญชีแล้ว')}try{mlAfterLogin()}catch(e){}ggRefresh()}else intro()}
const ggErr=r=>r.err==='taken'?'ชื่อบัญชีนี้มีคนใช้แล้ว ลองชื่ออื่น':r.err==='name'?'ชื่อบัญชีใช้ a-z 0-9 _ ยาว 3-20 ตัว':r.err==='lock'?'บัญชีนี้ถูกปิดโดยผู้ดูแล':r.err==='glinked'?'บัญชี Google นี้ผูกกับบัญชีเกมอื่นอยู่แล้ว':r.err==='gtoken'?'ยืนยันกับ Google ไม่ผ่าน ลองกดปุ่มอีกครั้ง':r.status===429?'ทำรายการถี่เกินไป รอสักครู่':r.err==='off'?'เซิร์ฟเวอร์ยังไม่เปิดล็อกอิน Google':'ทำรายการไม่สำเร็จ ('+(r.err||r.status)+')';
async function ggCb(resp){const cred=resp&&resp.credential;if(!cred||GSIN.busy)return;
  if(saveMode==='wait'||saveMode==='off')return ggSay('รอโหลดข้อมูลบันทึกก่อน');
  GSIN.busy=1;let r;try{
    if(ACC){ggSay('กำลังผูกกับ Google...');r=await withTimeout(accApi('glink',{a:ACC.a,t:ACC.t,cred}),12000);GSIN.busy=0;
      if(r.ok){ACC.g=1;accStore();GSIN.msg='';ggRefresh()}else if(r.status===401&&r.err==='auth'){accLost();ggSay('บัญชีหลุด ล็อกอินใหม่อีกครั้ง')}else ggSay(ggErr(r));return}
    ggSay('กำลังลงชื่อเข้าใช้ด้วย Google...');r=await withTimeout(accApi('google',{cred}),12000);GSIN.busy=0;
    if(r.ok)return ggFinish(r,false);
    if(r.err==='new'){GSIN.pend={cred,at:Date.now()};GSIN.msg='';ggRefresh();setTimeout(()=>{const i=document.getElementById('ggn');if(i)try{i.focus({preventScroll:true})}catch(e){}},50);return}
    ggSay(ggErr(r))}catch(e){GSIN.busy=0;ggSay('ต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง')}}
async function ggCreate(){if(!GSIN.pend||GSIN.busy)return;const a=String((document.getElementById('ggn')||{}).value||'').toLowerCase().trim();
  if(!/^[a-z0-9][a-z0-9_]{2,19}$/.test(a))return ggSay('ชื่อบัญชีใช้ a-z 0-9 _ ยาว 3-20 ตัว (ขึ้นต้นด้วยตัวอักษร/ตัวเลข)');
  if(Date.now()-GSIN.pend.at>50*60e3){GSIN.pend=null;ggRefresh();return ggSay('หมดเวลา กดปุ่ม Google อีกครั้ง')}
  if(saveMode==='wait'||saveMode==='off')return ggSay('รอโหลดข้อมูลบันทึกก่อน');
  GSIN.busy=1;ggSay('กำลังสร้างบัญชี...');let r;try{r=await withTimeout(accApi('google',{cred:GSIN.pend.cred,a}),12000)}catch(e){GSIN.busy=0;return ggSay('ต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง')}GSIN.busy=0;
  if(r.ok)return ggFinish(r,!r.rev);if(r.err==='gtoken'){GSIN.pend=null;ggRefresh()}ggSay(ggErr(r))}
async function ggSetPin(){const p=String((document.getElementById('ggp')||{}).value||'');if(p.length<4||p.length>32)return ggSay('รหัส PIN ต้องยาว 4-32 ตัว');if(!ACC||GSIN.busy)return;
  GSIN.busy=1;let r;try{r=await withTimeout(accApi('setpin',{a:ACC.a,t:ACC.t,pin:p}),12000)}catch(e){GSIN.busy=0;return ggSay('ต่อเซิร์ฟเวอร์ไม่ได้')}GSIN.busy=0;
  if(r.ok){ACC.np=0;accStore();GSIN.msg='ตั้ง PIN แล้ว · ล็อกอินด้วยชื่อ '+ACC.a+' + PIN นี้ได้ด้วย';ggRefresh()}else ggSay(r.err==='haspin'?'บัญชีนี้มี PIN อยู่แล้ว':ggErr(r))}
document.addEventListener('click',e=>{const t=e.target;if(!t||!t.id)return;if(t.id==='ggc')ggCreate();else if(t.id==='ggx'){GSIN.pend=null;GSIN.msg='';ggRefresh()}else if(t.id==='ggs')ggSetPin()});
setTimeout(()=>{try{
  /* กล่องบัญชีเดิม + ส่วน Google (ใส่ต่อจากย่อหน้าคำอธิบายแรก) */
  const oB=accBox;window.accBox=accBox=function(){const h=oB.apply(this,arguments);if(!h||!GSIN.cid)return h;const i=h.indexOf('</p>');if(i<0)return h;setTimeout(ggMount,0);const H=ACC&&ACC.np?h.replace('ให้ล็อกอินชื่อบัญชีนี้กับ PIN เดิม','ให้กด "ลงชื่อเข้าใช้ด้วย Google" ด้วยบัญชี Google เดิม'):h;return H.slice(0,i+4)+ggHtml()+H.slice(i+4)};
  /* ล็อกอินชื่อ+PIN สำเร็จขณะมี Google ค้างรอ → ผูกให้อัตโนมัติ */
  const oL=accLogin;window.accLogin=accLogin=async function(){const P=GSIN.pend;const r=await oL.apply(this,arguments);
    if(P&&ACC&&!ACC.g&&Date.now()-P.at<50*60e3){try{const q=await withTimeout(accApi('glink',{a:ACC.a,t:ACC.t,cred:P.cred}),12000);if(q.ok){ACC.g=1;accStore();GSIN.msg='✓ ผูก Google กับบัญชี '+ACC.a+' แล้ว'}else GSIN.msg=ggErr(q)}catch(e){}GSIN.pend=null;ggRefresh()}return r};
  /* สถานะผูก Google/มี PIN มากับผลโหลดเซฟ */
  const oA=accApi;window.accApi=accApi=async function(p,o){const r=await oA.apply(this,arguments);try{if(p==='load'&&r&&r.ok&&ACC){const g=r.g?1:0,np=r.np?1:0;if(ACC.g!==g||ACC.np!==np){ACC.g=g;ACC.np=np;accStore();if(document.getElementById('ggw'))ggRefresh()}}}catch(e){}return r};
  ggCfg()}catch(e){console.warn('v656',e)}},60);
