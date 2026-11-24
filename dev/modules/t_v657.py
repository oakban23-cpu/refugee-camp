"""v657 ลบบัญชีเอง + แอดมินเห็นการผูก Google · กุญแจ RSA ปลอม · ข้อมูลตลาด/จดหมาย/ชื่อ/อันดับ ใส่ไว้ล่วงหน้า"""
import asyncio, sys, os, json, time, base64, shutil, subprocess, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes
D=os.path.dirname(os.path.abspath(__file__))
key=rsa.generate_private_key(public_exponent=65537,key_size=2048);pn=key.public_key().public_numbers()
b64u=lambda b:base64.urlsafe_b64encode(b).rstrip(b'=').decode();ib=lambda n:n.to_bytes((n.bit_length()+7)//8,'big')
JW=os.path.join(D,'jwks_t657.json');json.dump({'keys':[{'kty':'RSA','kid':'k1','alg':'RS256','n':b64u(ib(pn.n)),'e':b64u(ib(pn.e))}]},open(JW,'w'))
CID='test-cid.apps.googleusercontent.com';os.environ.update(GOOGLE_CLIENT_ID=CID,GOOGLE_JWKS_FILE=JW,ADMIN_KEY='k657')
import h
from h import *
def mint(sub):
    hh=b64u(json.dumps({'alg':'RS256','kid':'k1'}).encode());now=int(time.time())
    c=b64u(json.dumps({'iss':'https://accounts.google.com','aud':CID,'sub':sub,'iat':now,'exp':now+3600}).encode())
    return hh+'.'+c+'.'+b64u(key.sign((hh+'.'+c).encode(),padding.PKCS1v15(),hashes.SHA256()))
def api(p,o=None,adm=False):
    hd={'Content-Type':'application/json','X-Forwarded-For':'10.7.7.7'}
    if adm:hd['X-Admin-Key']='k657'
    rq=urllib.request.Request(URL+p,data=json.dumps(o).encode() if o is not None else None,headers=hd)
    try:r=urllib.request.urlopen(rq,timeout=10);j=json.loads(r.read());j['status']=r.status;return j
    except urllib.error.HTTPError as e:j=json.loads(e.read() or b'{}');j['status']=e.code;return j
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
now=int(time.time()*1000)
M1,M2,M3='aaaa1111bbbb','keep2222cccc','gggg3333dddd'
def seed():
    shutil.rmtree(DD,ignore_errors=True);os.makedirs(DD)
    L=[{'id':i+1,'u':'m:'+m,'n':n,'k':'st','d':{'k':'h2','n':1},'p':100,'at':now} for i,(m,n) in enumerate([(M1,'Del1'),(M2,'Keep2'),(M3,'Gdel3')])]
    json.dump({'n':9,'L':L,'sales':{'m:'+M1:500,'m:'+M2:300,'m:'+M3:7},'ret':{},'own':{M1:'delme',M2:'keepme',M3:'gdel'},'ep':'abc'},open(DD+'/market.json','w'))
    json.dump({'n':5,'b':{M1:[{'id':1,'fm':'x','f':'X','s':'hi','at':now}],M2:[{'id':2,'fm':'x','f':'X','s':'yo','at':now}],M3:[{'id':3,'fm':'x','f':'X','s':'g','at':now}]},'tk':{},'dy':{},'dk':''},open(DD+'/mail.json','w'))
    json.dump({'del1':{'n':'Del1','mid':M1,'at':now},'keep2':{'n':'Keep2','mid':M2,'at':now},'gdel3':{'n':'Gdel3','mid':M3,'at':now}},open(DD+'/names.json','w'))
    json.dump({'m1':[{'n':'Del1','c':'melee','l':10,'t':50,'p':1,'at':now},{'n':'Keep2','c':'mage','l':10,'t':60,'p':1,'at':now},{'n':'Gdel3','c':'mage','l':10,'t':70,'p':1,'at':now}]},open(DD+'/leaderboard.json','w'))
    env=dict(os.environ,PORT=str(PORT),DATA_DIR=DD,MVP_FAST='1',GD_FAST='1')
    p=subprocess.Popen(['node','server.js'],cwd=SRV,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    for _ in range(60):
        time.sleep(.3)
        try:urllib.request.urlopen(URL+'health',timeout=1);break
        except Exception:pass
    return p
def chars(mid,nm,cls):return{'chars':{'s1':{'nm':nm,'cls':cls,'lv':10,'mkid':mid,'gold':1000}},'last':'s1'}
async def main():
    p=seed();errs=[]
    try:
        a=api('api/acc/register',{'a':'delme','pin':'1234'});ta=a['t'];api('api/acc/save',{'a':'delme','t':ta,'r':0,'data':chars(M1,'Del1','melee')})
        b=api('api/acc/register',{'a':'keepme','pin':'5678'});tb=b['t'];api('api/acc/save',{'a':'keepme','t':tb,'r':0,'data':chars(M2,'Keep2','mage')})
        g=api('api/acc/google',{'cred':mint('200000000000000000001'),'a':'gdel'});tg=g['t'];api('api/acc/save',{'a':'gdel','t':tg,'r':0,'data':chars(M3,'Gdel3','mage')})
        gp=api('api/acc/google',{'cred':mint('200000000000000000002'),'a':'gpin'});api('api/acc/setpin',{'a':'gpin','t':gp['t'],'pin':'4444'})
        ad=api('admin/api',adm=True);A=ad['acc'];rows={r['a']:r for r in A['rows']}
        rep('แอดมิน: นับบัญชีผูก Google + ไม่มี PIN',A.get('g')==2 and A.get('np')==1,{k:A.get(k) for k in('n','g','np')})
        rep('แอดมิน: แถวบอกชนิดล็อกอินถูก',rows['gdel']['g']==1 and rows['gdel']['np']==1 and rows['gpin']['g']==1 and rows['gpin']['np']==0 and rows['delme']['g']==0,[rows[k] for k in('gdel','gpin','delme')])
        # ยกเลิกผูก Google โดยแอดมิน
        r1=api('admin/accmod',{'a':'gdel','op':'gunlink'},adm=True);r2=api('admin/accmod',{'a':'gpin','op':'gunlink'},adm=True);r3=api('api/acc/google',{'cred':mint('200000000000000000002')})
        rep('แอดมินยกเลิกผูก: บัญชีไม่มี PIN ทำไม่ได้ (กันเข้าไม่ได้) · มี PIN ทำได้ แล้ว Google เดิมกลายเป็นบัญชีใหม่',not r1.get('ok') and r2.get('ok') and r3.get('err')=='new',[r1,r2,r3])
        # ลบเอง: ป้องกัน
        x1=api('api/acc/delete',{'a':'delme','t':ta,'confirm':'delmeX','pin':'1234'})
        x2=api('api/acc/delete',{'a':'delme','t':ta,'confirm':'delme','pin':'9999'})
        x3=api('api/acc/delete',{'a':'delme','t':'0'*48,'confirm':'delme','pin':'1234'})
        x4=api('api/acc/delete',{'a':'gdel','t':tg,'confirm':'gdel','pin':'1234'})
        x5=api('api/acc/delete',{'a':'gdel','t':tg,'confirm':'gdel','cred':mint('299999999999999999999')})
        rep('ลบ: ชื่อไม่ตรง/PIN ผิด/ไม่มี token/บัญชี Google ใช้ PIN/Google คนอื่น → ไม่ลบ',[x.get('err') for x in(x1,x2,x3,x4,x5)]==['confirm','badpin','auth' if x3.get('err')=='auth' else x3.get('err'),'needg','gtoken'] and x3['status']==401,[(x.get('status'),x.get('err')) for x in(x1,x2,x3,x4,x5)])
        d1=api('api/acc/delete',{'a':'delme','t':ta,'confirm':'delme','pin':'1234'})
        d2=api('api/acc/delete',{'a':'gdel','t':tg,'confirm':'gdel','cred':mint('200000000000000000001')})
        rep('ลบบัญชี PIN / บัญชี Google สำเร็จ',d1.get('ok') and d1.get('n')==1 and d1.get('mk')==1 and d2.get('ok') and d2.get('mk')==1,[d1,d2])
        l1=api('api/acc/login',{'a':'delme','pin':'1234'});g2=api('api/acc/google',{'cred':mint('200000000000000000001')})
        rep('ลบแล้ว: ล็อกอินไม่ได้ · Google เดิมกลายเป็นบัญชีใหม่ · ชื่อบัญชีว่างให้สมัครใหม่',l1['status']==401 and g2.get('err')=='new' and api('api/acc/register',{'a':'delme','pin':'1111'}).get('ok'),[l1,g2])
        ad=api('admin/api',adm=True)
        rep('ตลาด/จดหมายของบัญชีอื่นยังอยู่ ของบัญชีที่ลบหายหมด',ad['mk']['n']==1 and ad['ml']['box']==1,[ad['mk']['n'],ad['ml']])
        await asyncio.sleep(16)
        mk=json.load(open(DD+'/market.json'));ml=json.load(open(DD+'/mail.json'));nm=json.load(open(DD+'/names.json'));lb=json.load(open(DD+'/leaderboard.json'));ac=json.load(open(DD+'/accounts.json'))
        ok=[x['u'] for x in mk['L']]==['m:'+M2] and set(mk['sales'])=={'m:'+M2} and set(mk.get('own',{}))=={M2} and set(ml['b'])=={M2} and set(nm)=={'keep2'} and [r['n'] for r in lb['m1']]==['Keep2'] and 'gdel' not in ac and not os.path.exists(DD+'/saves/gdel.json') and os.path.exists(DD+'/saves/keepme.json')
        rep('ไฟล์บนดิสก์: ชื่อจอง/อันดับ/ยอดขาย/เซฟ ของบัญชีที่ลบหาย · บัญชีอื่นครบ',ok,[mk['L'],list(mk['sales']),list(ml['b']),list(nm),lb['m1'],list(ac)])
        # แอดมินลบ
        y1=api('admin/accmod',{'a':'keepme','op':'del','confirm':'nope'},adm=True);y2=api('admin/accmod',{'a':'keepme','op':'del','confirm':'keepme'},adm=True)
        rep('แอดมินลบ: ต้องพิมพ์ชื่อยืนยันตรง',not y1.get('ok') and y2.get('ok') and api('api/acc/login',{'a':'keepme','pin':'5678'})['status']==401,[y1,y2])
        # UI
        async with async_playwright() as pw:
            br=await pw.chromium.launch();ctx=await br.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
            FAKE="window.google={accounts:{id:{initialize(o){window.__gcb=o.callback},renderButton(el,o){const b=document.createElement('button');b.className='gfk';b.textContent='G '+o.text;b.onclick=()=>window.__gcb({credential:window.__cred});el.appendChild(b)},disableAutoSelect(){}}}};"
            await ctx.route('https://accounts.google.com/**',lambda rt:rt.fulfill(status=200,content_type='application/javascript',body=FAKE))
            pg=await ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            api('api/acc/register',{'a':'uidel','pin':'2468'})
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.remove()}");await pg.wait_for_timeout(600)
            await pg.fill('#acn','uidel');await pg.fill('#acp','2468');await pg.click('#acl');await pg.wait_for_timeout(2500)
            r=await pg.evaluate("()=>[ACC&&ACC.a,!!document.getElementById('adop')]");rep('ล็อกอินแล้วมีปุ่ม "ลบบัญชีนี้"',r==['uidel',True],r)
            await pg.click('#adop');await pg.wait_for_timeout(400)
            el=await pg.query_selector('#adw');await el.scroll_into_view_if_needed();await pg.screenshot(path=D+'/../v657/ui_del.png')
            await pg.fill('#adn','uidel');await pg.fill('#adp','0000');await pg.click('#adgo');await pg.wait_for_timeout(1500)
            r=await pg.evaluate("()=>[ACC&&ACC.a,document.getElementById('adm').textContent]");rep('PIN ผิด → ไม่ลบ บอกเหตุผล',r[0]=='uidel' and 'PIN' in r[1],r)
            await pg.fill('#adp','2468');await pg.click('#adgo');await pg.wait_for_timeout(2500)
            r=await pg.evaluate("()=>[typeof ACC!=='undefined'&&ACC,Object.keys(saves.chars).length,!!document.getElementById('acn'),(document.getElementById('accbox')||{}).textContent||'']")
            rep('ลบจากหน้าเกม → ออกจากระบบ ตัวละครในเครื่องหาย บอกว่าลบแล้ว',r[0] is None and r[1]==0 and r[2] and 'ลบบัญชี' in r[3],r[:3])
            el=await pg.query_selector('#accbox');await el.scroll_into_view_if_needed();await pg.screenshot(path=D+'/../v657/ui_after.png')
            # บัญชี Google ไม่มี PIN ลบด้วยปุ่ม Google
            await pg.evaluate("c=>window.__cred=c",mint('200000000000000000077'));await pg.click('#ggb .gfk');await pg.wait_for_timeout(1200);await pg.fill('#ggn','uig');await pg.click('#ggc');await pg.wait_for_timeout(2000)
            await pg.click('#adop');await pg.wait_for_timeout(400)
            r=await pg.evaluate("()=>[ACC&&ACC.a,!!document.getElementById('adp'),!!document.querySelector('#adgb .gfk')]")
            el=await pg.query_selector('#adw');await el.scroll_into_view_if_needed();await pg.screenshot(path=D+'/../v657/ui_delg.png')
            await pg.fill('#adn','uig');await pg.click('#adgb .gfk');await pg.wait_for_timeout(2500)
            r2=await pg.evaluate("()=>[typeof ACC!=='undefined'&&ACC]");acc=api('api/acc/google',{'cred':mint('200000000000000000077')})
            rep('บัญชี Google ไม่มี PIN: ฟอร์มลบไม่มีช่อง PIN · กด Google ยืนยัน → ลบแล้ว',r==['uig',False,True] and r2==[None] and acc.get('err')=='new',[r,r2,acc])
        rep('ไม่มี error',errs==[],errs)
    finally:p.terminate();os.remove(JW)
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
