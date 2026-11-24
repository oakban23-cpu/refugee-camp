/* ---------- v657 ลบบัญชีเอง (หน้าเลือกตัวละคร) ----------
   ยืนยัน 2 ชั้น: พิมพ์ชื่อบัญชี + PIN (หรือกด Google อีกครั้งสำหรับบัญชีที่ผูก Google) · ลบเซฟ/ตลาด/จดหมาย/ชื่อ/อันดับ บนเซิร์ฟเวอร์ถาวร */
const ADEL={open:0,busy:0,msg:''};
function adelHtml(){if(!ACC)return'';if(!ADEL.open)return'<div id="adw" style="margin-top:10px;text-align:right"><button id="adop" style="font-size:12px;padding:4px 10px;background:transparent;border:1px solid #8a4a44;color:#f0a49b">🗑️ ลบบัญชีนี้</button></div>';
  const S='style="width:100%;box-sizing:border-box;padding:8px;margin-top:6px"',G=ACC.g&&GSIN.cid;
  return'<div id="adw" style="margin-top:10px;padding:10px;border:1px solid #b3261e;border-radius:8px;background:#2a1412">'+
   '<b style="color:#ffb4a9">ลบบัญชี "'+ggEsc(ACC.a)+'" ถาวร</b><div style="font-size:12.5px;color:#f3d6d0;margin-top:4px">ตัวละครทุกตัว ของที่วางขายในตลาด ยอดขายที่ยังไม่รับ กล่องจดหมาย ชื่อตัวละคร และอันดับ จะถูกลบจากเซิร์ฟเวอร์ <b>กู้คืนไม่ได้</b> · ตัวละครในเครื่องนี้จะหายด้วย</div>'+
   '<input id="adn" maxlength="20" autocapitalize="off" spellcheck="false" placeholder="พิมพ์ชื่อบัญชี '+ggEsc(ACC.a)+' เพื่อยืนยัน" '+S+'>'+
   (ACC.np?'':'<input id="adp" type="password" maxlength="32" autocomplete="current-password" placeholder="รหัส PIN ของบัญชี" '+S+'>')+
   '<div class="row" style="margin-top:8px;gap:6px">'+(ACC.np?'':'<button id="adgo" style="background:#8c1d18;color:#fff">ลบบัญชีถาวร</button>')+'<button id="adx">ยกเลิก</button></div>'+
   (G?'<div style="font-size:12px;color:#f3d6d0;margin-top:8px">'+(ACC.np?'ยืนยันด้วยบัญชี Google ที่ผูกไว้:':'หรือยืนยันด้วย Google แทน PIN:')+'</div><div id="adgb" style="min-height:44px;margin-top:4px"></div>':'')+
   '<p id="adm" style="font-size:12.5px;margin:6px 0 0;color:#ffd98a">'+ggEsc(ADEL.msg)+'</p></div>'}
function adelRefresh(){const w=document.getElementById('adw');if(w)w.outerHTML=adelHtml();adelMount()}
function adelMount(){const el=document.getElementById('adgb');if(!el)return;if(!GSIN.ok){ggLoad();return}try{const G=google.accounts.id;if(ggInit!==GSIN.cid){G.initialize({client_id:GSIN.cid,callback:r=>ggCb(r),auto_select:false,cancel_on_tap_outside:true,itp_support:true});ggInit=GSIN.cid}
  el.innerHTML='';G.renderButton(el,{type:'standard',theme:'outline',size:'medium',shape:'pill',text:'continue_with',locale:'th',width:Math.max(200,Math.min(300,(el.clientWidth|0)||260))})}catch(e){}}
function adelSay(t){ADEL.msg=t;const m=document.getElementById('adm');if(m)m.textContent=t}
const adelErr=r=>r.err==='badpin'?'รหัส PIN ไม่ถูกต้อง':r.err==='confirm'?'ชื่อบัญชีที่พิมพ์ไม่ตรง':r.err==='gtoken'?'บัญชี Google นี้ไม่ใช่บัญชีที่ผูกไว้':r.err==='needg'?'บัญชีนี้ไม่มี PIN ให้ยืนยันด้วยปุ่ม Google':r.err==='pin'?'ใส่รหัส PIN':r.status===401?'บัญชีหลุด ล็อกอินใหม่แล้วลองอีกครั้ง':r.status===429?'ทำรายการถี่เกินไป รอสักครู่':'ลบไม่สำเร็จ ('+(r.err||r.status)+')';
async function adelGo(cred){if(!ACC||ADEL.busy||me.cls)return;const n=String((document.getElementById('adn')||{}).value||'').toLowerCase().trim();
  if(n!==ACC.a)return adelSay('พิมพ์ชื่อบัญชี "'+ACC.a+'" ให้ตรงก่อน');const o={a:ACC.a,t:ACC.t,confirm:n};
  if(cred)o.cred=cred;else{const p=String((document.getElementById('adp')||{}).value||'');if(p.length<4)return adelSay('ใส่รหัส PIN ของบัญชี');o.pin=p}
  ADEL.busy=1;adelSay('กำลังลบบัญชี...');let r;try{r=await withTimeout(accApi('delete',o),15000)}catch(e){ADEL.busy=0;return adelSay('ต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง')}ADEL.busy=0;
  if(!r.ok)return adelSay(adelErr(r));
  const a=ACC.a;ACC=null;accStore();accRev=0;saves={v:1,chars:{},last:null};lsWrite(saves);csSel='';delArm=null;ADEL.open=0;ADEL.msg='';GSIN.pend=null;GSIN.msg='';
  try{google.accounts.id.disableAutoSelect()}catch(e){}setSaveState('บันทึกในเบราว์เซอร์นี้');accMsg='🗑️ ลบบัญชี "'+a+'" และข้อมูลทั้งหมดบนเซิร์ฟเวอร์แล้ว ('+(r.n|0)+' ตัวละคร)';intro()}
document.addEventListener('click',e=>{const t=e.target;if(!t||!t.id)return;if(t.id==='adop'){ADEL.open=1;ADEL.msg='';adelRefresh();setTimeout(()=>{const i=document.getElementById('adn');if(i)try{i.focus({preventScroll:true})}catch(e){}},30)}else if(t.id==='adx'){ADEL.open=0;ADEL.msg='';adelRefresh()}else if(t.id==='adgo')adelGo()});
setTimeout(()=>{try{
  /* ปุ่มลบบัญชีท้ายกล่องบัญชี (เฉพาะหน้าเลือกตัวละครที่ล็อกอินอยู่) */
  const oB=accBox;window.accBox=accBox=function(){const h=oB.apply(this,arguments);if(!h||!ACC||me.cls)return h;const i=h.lastIndexOf('</div>');if(i<0)return h;setTimeout(adelMount,0);return h.slice(0,i)+adelHtml()+h.slice(i)};
  /* ปุ่ม Google ในฟอร์มลบ → ส่ง credential ไปยืนยันการลบแทนการผูก */
  const oC=ggCb;window.ggCb=ggCb=function(resp){if(ADEL.open&&ACC&&document.getElementById('adw')){const c=resp&&resp.credential;if(c)adelGo(c);return}return oC.apply(this,arguments)};
}catch(e){console.warn('v657',e)}},80);
