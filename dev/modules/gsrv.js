/* ===== v656 ล็อกอินด้วย Google (Gmail) · ตรวจ ID token (JWT RS256) ด้วยกุญแจสาธารณะของ Google ในเซิร์ฟเวอร์เอง
   เก็บแค่รหัสผู้ใช้ Google (sub) ไว้ผูกบัญชี · ไม่เก็บอีเมล/ชื่อ/รูป · เปิดใช้เมื่อตั้ง env GOOGLE_CLIENT_ID ===== */
const GCID=String(process.env.GOOGLE_CLIENT_ID||'').trim();
const GSUB=new Map();for(const a in ACCS){const s=ACCS[a]&&ACCS[a].g;if(s)GSUB.set(s,a)}
let GKEYS={},GKT=0,GKF=null;const GRL=new Map();
async function gKeys(force){const now=Date.now();if(!force&&now-GKT<6*3600e3&&Object.keys(GKEYS).length)return GKEYS;if(force&&now-GKT<60e3)return GKEYS;
  if(GKF)return GKF;GKF=(async()=>{try{const r=await fetch('https://www.googleapis.com/oauth2/v3/certs');const j=await r.json();const o={};for(const k of j.keys||[]){try{o[k.kid]=crypto.createPublicKey({key:k,format:'jwk'})}catch(e){}}if(Object.keys(o).length){GKEYS=o;GKT=Date.now()}}catch(e){console.error('google certs',e.message)}GKF=null;return GKEYS})();return GKF}
const b64u=s=>Buffer.from(String(s).replace(/-/g,'+').replace(/_/g,'/'),'base64');
async function gVerify(cred){if(!GCID||typeof cred!=='string'||cred.length>4096)return null;const p=cred.split('.');if(p.length!==3)return null;
  let h,c;try{h=JSON.parse(b64u(p[0]).toString('utf8'));c=JSON.parse(b64u(p[1]).toString('utf8'))}catch(e){return null}
  if(h.alg!=='RS256'||typeof h.kid!=='string')return null;let K=(await gKeys())[h.kid];if(!K)K=(await gKeys(true))[h.kid];if(!K)return null;
  let ok=false;try{ok=crypto.verify('RSA-SHA256',Buffer.from(p[0]+'.'+p[1]),K,b64u(p[2]))}catch(e){}if(!ok)return null;
  const now=Date.now()/1000;if(c.aud!==GCID||(c.iss!=='accounts.google.com'&&c.iss!=='https://accounts.google.com')||!(c.exp>now-30)||(c.iat&&c.iat>now+300)||typeof c.sub!=='string'||!/^[0-9]{5,40}$/.test(c.sub))return null;
  return c.sub}
function gRate(ip){const now=Date.now(),g=GRL.get(ip);const v=g&&now-g.t<60e3?g:{n:0,t:now};v.n++;GRL.set(ip,v);if(GRL.size>5000)GRL.clear();return v.n<=20}
async function gRoute(act,q,ip,now,J){
  if(!GCID)return J(503,{err:'off'});if(!gRate(ip))return J(429,{err:'busy',wait:60});
  const sub=await gVerify(q.cred);if(!sub)return J(401,{err:'gtoken'});
  if(act==='glink'){const a=accName(String(q.a||'').toLowerCase().trim()),A=a&&accAuth(a,q.t);if(!A)return J(401,{err:'auth'});
    const o=GSUB.get(sub);if(o&&o!==a)return J(409,{err:'glinked'});if(A.g&&A.g!==sub)GSUB.delete(A.g);A.g=sub;GSUB.set(sub,a);accDirty=true;console.log('ผูก Google: '+a);return J(200,{ok:1,g:1})}
  /* google: มีบัญชีผูกแล้ว → ล็อกอิน · ยังไม่มี + ส่งชื่อมา → สร้างบัญชีใหม่ผูก Google (ไม่มี PIN) · ไม่ส่งชื่อ → บอกให้ตั้งชื่อ */
  const ex=GSUB.get(sub);
  if(ex&&ACCS[ex]){const A=ACCS[ex];if(A.lock)return J(403,{err:'lock'});A.l=now;const t=accNewToken(A);accDirty=true;const sv=svRead(ex);return J(200,{ok:1,a:ex,t,rev:sv?sv.rev|0:0,g:1})}
  if(ex)GSUB.delete(sub);
  if(!q.a)return J(200,{ok:0,err:'new'});
  const a=accName(String(q.a).toLowerCase().trim());if(!a)return J(400,{err:'name'});if(ACCS[a])return J(409,{err:'taken'});
  const r=ACREG.get(ip);if(r&&r.n>=8&&now-r.t<3600e3)return J(429,{err:'many'});ACREG.set(ip,{n:(r&&now-r.t<3600e3?r.n:0)+1,t:r&&now-r.t<3600e3?r.t:now});if(ACREG.size>2000)ACREG.clear();
  if(now-ACREGG.t>3600e3)ACREGG={t:now,n:0};if(++ACREGG.n>150)return J(429,{err:'many'});
  /* ไม่มี PIN: ใส่แฮชสุ่มที่ไม่มีใครรู้ (ล็อกอินด้วย PIN ไม่ได้จนกว่าผู้ดูแลตั้ง PIN ให้) */
  const salt=crypto.randomBytes(12).toString('hex');const A=ACCS[a]={s:salt,h:crypto.randomBytes(32).toString('hex'),c:now,l:now,tk:[],g:sub,np:1};GSUB.set(sub,a);
  const t=accNewToken(A);accDirty=true;console.log('สร้างบัญชี (Google): '+a);return J(200,{ok:1,a,t,rev:0,g:1})}
