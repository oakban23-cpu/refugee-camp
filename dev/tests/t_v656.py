"""v656 ล็อกอินด้วย Google: ใช้กุญแจ RSA ปลอม + client id ทดสอบ (เซิร์ฟเวอร์อ่าน JWKS จากไฟล์) · จำลองไลบรารี Google ในเบราว์เซอร์"""
import asyncio, sys, os, json, time, base64, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes
D=os.path.dirname(os.path.abspath(__file__))
key=rsa.generate_private_key(public_exponent=65537,key_size=2048);bad=rsa.generate_private_key(public_exponent=65537,key_size=2048)
pn=key.public_key().public_numbers()
b64u=lambda b:base64.urlsafe_b64encode(b).rstrip(b'=').decode()
ib=lambda n:n.to_bytes((n.bit_length()+7)//8,'big')
JW=os.path.join(D,'jwks_test.json');json.dump({'keys':[{'kty':'RSA','kid':'k1','alg':'RS256','use':'sig','n':b64u(ib(pn.n)),'e':b64u(ib(pn.e))}]},open(JW,'w'))
CID='test-cid.apps.googleusercontent.com'
os.environ['GOOGLE_CLIENT_ID']=CID;os.environ['GOOGLE_JWKS_FILE']=JW
from h import *
def mint(sub,aud=CID,exp=3600,iss='https://accounts.google.com',k=key,kid='k1'):
    h=b64u(json.dumps({'alg':'RS256','kid':kid,'typ':'JWT'}).encode());now=int(time.time())
    c=b64u(json.dumps({'iss':iss,'aud':aud,'sub':sub,'email':'x@example.com','email_verified':True,'iat':now,'exp':now+exp}).encode())
    s=k.sign((h+'.'+c).encode(),padding.PKCS1v15(),hashes.SHA256());return h+'.'+c+'.'+b64u(s)
def api(p,o=None):
    rq=urllib.request.Request(URL+'api/acc/'+p,data=json.dumps(o).encode() if o is not None else None,headers={'Content-Type':'application/json','X-Forwarded-For':'10.9.9.9'})
    try:r=urllib.request.urlopen(rq,timeout=10);j=json.loads(r.read());j['status']=r.status;return j
    except urllib.error.HTTPError as e:j=json.loads(e.read() or b'{}');j['status']=e.code;return j
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
FAKE="""window.google={accounts:{id:{initialize(o){window.__gcb=o.callback;window.__gcid=o.client_id},renderButton(el,o){const b=document.createElement('button');b.id='gfake';b.textContent='G '+o.text;b.onclick=()=>window.__gcb({credential:window.__cred});el.appendChild(b)}}}};"""
async def main():
    p=start_server();errs=[]
    try:
        r=api('gcfg');rep('เซิร์ฟเวอร์บอก client id',r.get('cid')==CID,r)
        S1,S2,S3='100000000000000000001','100000000000000000002','100000000000000000003'
        bads=[api('google',{'cred':mint(S1,k=bad)}),api('google',{'cred':mint(S1,aud='other')}),api('google',{'cred':mint(S1,exp=-600)}),api('google',{'cred':mint(S1,iss='evil.com')}),api('google',{'cred':'a.b.c'}),api('google',{'cred':mint(S1,kid='zz')})]
        rep('token ปลอม/ผิด aud/หมดอายุ/ผู้ออกผิด/กุญแจไม่รู้จัก → ปฏิเสธ',all(x['status']==401 and x.get('err')=='gtoken' for x in bads),[x.get('status') for x in bads])
        r=api('google',{'cred':mint(S1)});rep('Google ใหม่ไม่ส่งชื่อ → ให้ตั้งชื่อ',r.get('err')=='new' and not r.get('ok'),r)
        r=api('google',{'cred':mint(S1),'a':'gtest1'});t1=r.get('t');rep('สร้างบัญชีด้วย Google',r.get('ok') and r.get('a')=='gtest1' and r.get('g')==1 and len(t1 or '')==48,r)
        r=api('google',{'cred':mint(S1),'a':'other'});rep('Google เดิมกดอีกครั้ง → เข้าบัญชีเดิม (ไม่สร้างใหม่)',r.get('ok') and r.get('a')=='gtest1',r)
        r=api('google',{'cred':mint(S2),'a':'gtest1'});rep('ชื่อซ้ำ → taken',r.get('err')=='taken',r)
        r=api('login',{'a':'gtest1','pin':'1234'});rep('บัญชี Google ไม่มี PIN → ล็อกอิน PIN ไม่ได้',r['status']==401,r)
        r=api('load',{'a':'gtest1','t':t1});rep('โหลดบอกว่าผูก Google และยังไม่มี PIN',r.get('ok') and r.get('g')==1 and r.get('np')==1,r)
        r=api('setpin',{'a':'gtest1','t':t1,'pin':'9876'});r2=api('login',{'a':'gtest1','pin':'9876'});r3=api('setpin',{'a':'gtest1','t':t1,'pin':'1111'})
        rep('ตั้ง PIN ครั้งแรกได้ · ล็อกอิน PIN ได้ · ตั้งซ้ำไม่ได้',r.get('ok') and r2.get('ok') and r2.get('g')==1 and r3['status']==403,[r,r2,r3])
        r=api('register',{'a':'pinacc','pin':'5555'});tp=r['t']
        r=api('glink',{'a':'pinacc','t':tp,'cred':mint(S1)});rep('ผูก Google ที่ผูกบัญชีอื่นแล้ว → ปฏิเสธ',r['status']==409 and r.get('err')=='glinked',r)
        r=api('glink',{'a':'pinacc','t':'0'*48,'cred':mint(S3)});rep('ผูกโดยไม่มี token บัญชี → ปฏิเสธ',r['status']==401,r)
        r=api('glink',{'a':'pinacc','t':tp,'cred':mint(S3)});r2=api('google',{'cred':mint(S3)});rep('บัญชี PIN ผูก Google แล้วกด Google เข้าบัญชีนั้น',r.get('ok') and r2.get('ok') and r2.get('a')=='pinacc',[r,r2])
        async with async_playwright() as pw:
            b=await pw.chromium.launch();ctx=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
            await ctx.route('https://accounts.google.com/**',lambda rt:rt.fulfill(status=200,content_type='application/javascript',body=FAKE))
            pg=await ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.remove()}")
            await pg.wait_for_timeout(800)
            r=await pg.evaluate("()=>[!!document.getElementById('ggb'),!!document.getElementById('gfake'),window.__gcid,!!document.getElementById('acn')]")
            rep('กล่องบัญชีมีปุ่ม Google + ช่องชื่อ/PIN เดิมยังอยู่',r[0] and r[1] and r[2]==CID and r[3],r)
            el=await pg.query_selector('#accbox');await el.scroll_into_view_if_needed();await pg.screenshot(path=D+'/../v656/ui1.png')
            await pg.evaluate("c=>window.__cred=c",mint('100000000000000000004'));await pg.click('#gfake');await pg.wait_for_timeout(1200)
            r=await pg.evaluate("()=>[!!document.getElementById('ggn'),typeof ACC!=='undefined'&&ACC]")
            rep('Google ใหม่ → ฟอร์มตั้งชื่อบัญชี',r[0] and not r[1],r)
            el=await pg.query_selector('#accbox');await el.scroll_into_view_if_needed();await pg.screenshot(path=D+'/../v656/ui2.png')
            await pg.fill('#ggn','gui1');await pg.click('#ggc');await pg.wait_for_timeout(2000)
            r=await pg.evaluate("()=>[ACC&&ACC.a,ACC&&ACC.g,!!document.getElementById('aco')]")
            rep('สร้างบัญชีจากหน้าเกม → ล็อกอินแล้ว',r[0]=='gui1' and r[1]==1 and r[2],r)
            r=await pg.evaluate("()=>[ACC.np,!!document.getElementById('ggp'),document.getElementById('accbox').textContent.includes('ลงชื่อเข้าใช้ด้วย Google')]")
            await pg.fill('#ggp','7777');await pg.click('#ggs');await pg.wait_for_timeout(1500);r2=api('login',{'a':'gui1','pin':'7777'})
            rep('บัญชี Google ไม่มี PIN: บอกวิธีเข้าเครื่องอื่น + ตั้ง PIN จากหน้าเกมได้',r==[1,True,True] and r2.get('ok'),[r,r2])
            el=await pg.query_selector('#accbox');await el.scroll_into_view_if_needed();await pg.screenshot(path=D+'/../v656/ui3.png')
            # ล็อกเอาต์ แล้วเข้าใหม่ด้วย Google
            await pg.click('#aco');await pg.wait_for_timeout(1500)
            r0=await pg.evaluate("()=>ACC")
            await pg.click('#gfake');await pg.wait_for_timeout(2000)
            r=await pg.evaluate("()=>[ACC&&ACC.a,ACC&&ACC.g]")
            rep('ออกแล้วกด Google → กลับเข้าบัญชีเดิม',r0 is None and r==['gui1',1],[r0,r])
            # บัญชี PIN เดิม + Google ใหม่ค้างรอ → ล็อกอินชื่อ+PIN แล้วผูกอัตโนมัติ
            await pg.click('#aco');await pg.wait_for_timeout(1500)
            api('register',{'a':'olduser','pin':'4321'})
            await pg.evaluate("c=>window.__cred=c",mint('100000000000000000005'));await pg.click('#gfake');await pg.wait_for_timeout(1200)
            await pg.fill('#acn','olduser');await pg.fill('#acp','4321');await pg.click('#acl');await pg.wait_for_timeout(2500)
            r=await pg.evaluate("()=>[ACC&&ACC.a,ACC&&ACC.g]");r2=api('google',{'cred':mint('100000000000000000005')})
            rep('มีบัญชีเดิม: ล็อกอิน PIN ระหว่างค้าง Google → ผูกให้อัตโนมัติ',r==['olduser',1] and r2.get('a')=='olduser',[r,r2])
            # ล็อกอินอยู่ ยังไม่ผูก → ปุ่มผูก
            await pg.click('#aco');await pg.wait_for_timeout(1500);api('register',{'a':'pinonly','pin':'2468'})
            await pg.fill('#acn','pinonly');await pg.fill('#acp','2468');await pg.click('#acl');await pg.wait_for_timeout(2500)
            r=await pg.evaluate("()=>[ACC&&ACC.a,ACC&&ACC.g,!!document.getElementById('gfake'),(document.getElementById('gfake')||{}).textContent]")
            await pg.evaluate("c=>window.__cred=c",mint('100000000000000000006'));await pg.click('#gfake');await pg.wait_for_timeout(1500)
            r2=await pg.evaluate("()=>[ACC.g,(document.getElementById('ggw')||{}).textContent]")
            rep('ล็อกอิน PIN อยู่ → ปุ่มผูก Google → ผูกแล้ว',r[0]=='pinonly' and not r[1] and r[2] and r2[0]==1 and 'ผูกกับ Google แล้ว' in r2[1],[r,r2])
            # รีโหลดหน้า สถานะยังอยู่
            await pg.reload();await pg.wait_for_timeout(3500);await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.remove()}");await pg.wait_for_timeout(1000)
            r=await pg.evaluate("()=>[ACC&&ACC.a,ACC&&ACC.g]");rep('รีโหลดแล้วยังล็อกอิน + จำว่าผูก Google',r==['pinonly',1],r)
            # เซิร์ฟเวอร์ไม่ตั้ง client id → ไม่มีปุ่ม (จำลองโดยดัก gcfg)
            ctx2=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);await ctx2.route('https://accounts.google.com/**',lambda rt:rt.fulfill(status=200,content_type='application/javascript',body=FAKE))
            pg2=await ctx2.new_page();await pg2.route('**/api/acc/gcfg',lambda rt:rt.fulfill(status=200,content_type='application/json',body='{"cid":""}'))
            await pg2.evaluate("()=>localStorage.removeItem('refugee_acc')") if False else None
            await pg2.goto(URL);await pg2.evaluate("()=>{localStorage.removeItem('refugee_acc')}");await pg2.reload();await pg2.wait_for_timeout(3500);await pg2.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.remove()}");await pg2.wait_for_timeout(800)
            r=await pg2.evaluate("()=>[!!document.getElementById('ggb'),!!document.getElementById('acn')]");rep('ไม่ตั้ง client id → ไม่แสดงปุ่ม Google (ระบบเดิมใช้ได้)',r==[False,True],r)
            # เซฟเก็บแค่ sub ไม่เก็บอีเมล
        acc=json.load(open(os.path.join(DD,'accounts.json'))) if os.path.exists(os.path.join(DD,'accounts.json')) else {}
        rep('ไฟล์บัญชีไม่มีอีเมล',not any('example.com' in json.dumps(v) for v in acc.values()) and any(v.get('g') for v in acc.values()),list(acc)[:5])
        rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
