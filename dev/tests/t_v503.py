import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# [ชื่อ, คำสั่งเข้า, ช่วงห้อง(lo,hi), แฟล็กแมพ, แมพที่กลับ]
ENT=[('สุสานต้องสาป','dgCreate(1)',(11000,19999),'dg1',1),('สุสาน·ยาก','dgCreate(2)',(21000,29999),'dg2',1),('สุสาน·นรก','dgCreate(3)',(31000,39999),'dg3',1),
 ('หอคอยวิญญาณ','twCreate(1)',(50000,50099),'tw',5),('ลานทดสอบเงา','trialEnter()',(60000,69999),'trial',6),('เรดห้วงลึก','dgCreate(7)',(71000,71999),'rd',6),
 ('ศึกท่าเรือเมฆ','hdfEnter()',(72000,72999),'hdf',38),('ห้องแกนพิภพ','rteEnter()',(73000,73999),'rte',26),('คืนรากดำ','rootEnter()',(74000,74999),'root',1),
 ('บัลลังก์เงา','nyxEnter()',(75000,75999),'nyx',22),('ศึกปิดรอยแยก','queenEnter()',(76000,76999),'queen',10),('ศาลาราชินี','casEnter()',(77000,77999),'cas',28),
 ('บัลลังก์ดาว','ornEnter()',(78000,78999),'orn',29),('สะพานแสง','escEnter()',(79000,79999),'esc',1),('หอนาฬิกา','clkEnter()',(80000,80999),'clk',32),
 ('ก้นหลุมหัวใจ','vspEnter()',(81000,81999),'vsp',33),('บอสกิลด์','gbEnter("t",1)',(82000,82999),'gbh',1),('ลิฟต์เหมือง','mdfEnter()',(83000,83999),'mdf',35),
 ('เปลือกราชินี','qshEnter()',(84000,84999),'qsh',10),('เตาหลอมหัวใจ','hfgEnter()',(85000,85999),'hfg',33),('ลานบอสโลก','wbEnter()',(86000,86999),'wb',1),
 ('ศึกป้องกันนคร','siegeEnter()',(87000,87999),'siege',9),('ห้วงความทรงจำ','echoEnter()',(88000,88999),'echo',10),('ห้วงตาราชินี','eyeEnter()',(89000,89999),'eye',11)]
FLAG="""(f)=>{const M=MAPS[curMap]||{};if(f.startsWith('dg'))return M.dg===+f.slice(2)&&!M.rd&&!M.wb&&!M.tw;if(f==='gbh')return !!(M.wb&&M.n==='ห้องโถงกิลด์');if(f==='wb')return !!(M.wb&&M.n==='ลานบอสโลก');return !!M[f]}"""
async def main():
    p=start_server();ok=0;bad=0
    def rep(n,c,d=''):
        nonlocal ok,bad
        if c: ok+=1
        else: bad+=1
        print(('✅' if c else '❌'),n,('' if c else d)[:900],flush=True)
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Wv'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;me.lv=140;me.cq={s:3};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}enterMap(1,{x:1600,y:1600})}");await A.wait(1200)
        # 1) ทุกดัน × สุ่ม 3 ค่า: เข้าถูกดัน ห้องอยู่ในช่วง ออกแล้วกลับแมพถูก
        fails=[];rooms={}
        for nm,call,(lo,hi),fl,bk in ENT:
            for rv in (0,.5,.9999):
                r=await A.ev("""async([call,rv,fl])=>{try{SD.on&&stClose()}catch(e){}if(curMap!==1){enterMap(1,{x:1600,y:1600});await new Promise(r=>setTimeout(r,700))}
                  me.down=0;me.lv=140;me.cq={s:3};const R0=Math.random;Math.random=()=>rv;let err='';try{(0,eval)(call)}catch(e){err=String(e)}finally{Math.random=R0}await new Promise(r=>setTimeout(r,1200));try{SD.on&&stClose()}catch(e){}
                  const mp=curMap,f=("""+FLAG+""")(fl),dgf=isDg();try{if(typeof GBS!=='undefined'&&GBS.go&&typeof gbLeave==='function')gbLeave();else dgLeave()}catch(e){err+=' leave:'+e}await new Promise(r=>setTimeout(r,1100));try{SD.on&&stClose()}catch(e){}if(typeof GBS!=='undefined')GBS.go=null;
                  return {err,mp,f,dgf,back:curMap}}""",[call,rv,fl])
                good=not r['err'] and lo<=r['mp']<=hi and r['f'] and r['dgf'] and r['back']==bk
                rooms.setdefault(nm,[]).append(r['mp'])
                if not good: fails.append([nm,rv,r])
        rep('24 ดัน × สุ่มเลขห้อง 3 ค่า (หัว/กลาง/ท้าย) เข้าถูกดัน · เลขห้องอยู่ในช่วงของตัวเอง · ออกแล้วกลับแมพต้นทางถูก',not fails,json.dumps(fails,ensure_ascii=False))
        # 2) ช่วงเลขห้องไม่ทับกัน (รวมบ้านกิลด์ · ลานประลอง · ห้องทองคำ · เต็นท์)
        r=await A.ev("""()=>{const t=[];for(let i=0;i<3000;i++)t.push(tentId('u'+i+'x'+(i*7919)));return {lo:Math.min(...t),hi:Math.max(...t),n:new Set(t).size,v:[100001+hseed('vault'+uid+':a')%9998,100001+hseed('vault'+uid+':b')%9998]}}""")
        R=[(5000,9999,'บ้านกิลด์')]+[(lo,hi,nm) for nm,c,(lo,hi),f,bk in ENT if nm not in('สุสาน·ยาก','สุสาน·นรก')]+[(21000,29999,'สุสานยาก'),(31000,39999,'สุสานนรก'),(90000,99998,'ลานประลอง'),(100001,109998,'ห้องทองคำ'),(r['lo'],r['hi'],'เต็นท์')]
        ov=[(a,b) for i,a in enumerate(R) for b in R[i+1:] if not(a[1]<b[0] or b[1]<a[0])]
        rep('ช่วงเลขห้องทุกแบบไม่ทับกัน · เต็นท์อยู่ 120000–199999 (เซิร์ฟเวอร์รับถึง 199999)',not ov and r['lo']>=120000 and r['hi']<=199999 and r['n']>2900,json.dumps([ov,r],ensure_ascii=False))
        # 3) ดวล: แม้เคยเข้าเต็นท์เลขเดียวกัน (ลูกค้าเวอร์ชันเก่า) ก็ต้องเข้าลานประลอง
        r=await A.ev("""async()=>{const id=91234;tentMap(id,{o:'X',u:'zz',d:{},c:0,v:0,f:[],g:[],b:[],tw:0});const was=!!MAPS[id].tent;pvStart(id,'opp1','คู่ดวล',0);await new Promise(r=>setTimeout(r,800));const o={was,mp:curMap,ar:isArena(),tent:!!MAPS[curMap].tent,dg:isDg()};PV=null;enterMap(1,{x:1600,y:1600});await new Promise(r=>setTimeout(r,600));return o}""")
        rep('ดวล 1:1 เข้าลานประลองเสมอ (ไม่ไปโผล่เต็นท์ที่เลขห้องเดียวกัน)',r['was'] and r['mp']==91234 and r['ar'] and not r['tent'] and not r['dg'],json.dumps(r))
        # 4) รหัสห้อง: ดันที่ชวนกันได้เข้าได้ถูก · บอสกิลด์/บอสโลก/ลานทดสอบ/ห้องสั้นเกิน เข้าไม่ได้
        r=await A.ev("""async()=>{const C=[[15500,'dg'],[25500,'dg'],[35500,'dg'],[50050,'tw'],[71500,'rd'],[72500,'hdf'],[73500,'rte'],[74500,'root'],[75500,'nyx'],[76500,'queen'],[77500,'cas'],[78500,'orn'],[79500,'esc'],[80500,'clk'],[81500,'vsp'],[83500,'mdf'],[84500,'qsh'],[85500,'hfg'],[82500,null],[86500,null],[60500,null],[87500,null],[88500,null],[89500,null],[91234,null],[45000,null],[10500,null]];const o=[];
          for(const[id,f]of C){if(curMap!==1){enterMap(1,{x:1600,y:1600});await new Promise(r=>setTimeout(r,500))}me.lv=140;me.down=0;dgJoin(id);await new Promise(r=>setTimeout(r,500));ov.hidden=true;const M=MAPS[curMap]||{};const got=curMap===id;o.push([id,f,got,f?!!M[f]:null]);if(got){try{dgLeave()}catch(e){}await new Promise(r=>setTimeout(r,600))}}return o}""")
        badj=[x for x in r if (x[1] and not(x[2] and x[3])) or (not x[1] and x[2])]
        rep('ใส่รหัสห้อง 27 แบบ: 18 ดันเข้าถูก · บอสกิลด์/บอสโลก/ลานทดสอบ/ศึกนคร/ห้วง/ลานประลอง/เลขผิด เข้าไม่ได้',not badj,json.dumps(badj))
        # 5) ป้ายชื่อห้องตอนชวน + รายชื่อเพื่อนบอกสถานที่ถูก
        r=await A.ev("""()=>[dgRmName(72100),dgRmName(77100),dgRmName(86100),dgRmName(15500),friMapN(91234),friMapN(105000),friMapN(150000),friMapN(6000),friMapN(73000),friMapN(1)]""")
        rep('ชื่อห้องในป้ายชวน + รายชื่อเพื่อน (ลานประลอง/ห้องทองคำ/เต็นท์/บ้านกิลด์/ดัน)',('ท่าเรือ' in r[0] and 'ศาลา' in r[1] and 'บอสโลก' in r[2] and 'สุสาน' in r[3] and 'ลานประลอง' in r[4] and 'ห้องทองคำ' in r[5] and 'เต็นท์' in r[6] and 'บ้านกิลด์' in r[7] and 'ดันเจี้ยน' in r[8] and 'ค่าย' in r[9]),json.dumps(r,ensure_ascii=False))
        # 6) เต็นท์: เข้าเต็นท์ตัวเองได้ห้องช่วงใหม่ ออกแล้วกลับค่าย
        r=await A.ev("""async()=>{const T={o:myName,u:uid,d:{},c:0,v:0,f:[],g:[],b:[],tw:0};let e='';try{tentEnter(T)}catch(x){e=String(x)}await new Promise(r=>setTimeout(r,900));const o={e,mp:curMap,tent:tentHere(),mine:tentMine(),id:tentId(uid)};return o}""")
        rep('เข้าเต็นท์ตัวเอง: ห้อง 120000+ และเป็นเต็นท์ของเรา',not r['e'] and r['mp']==r['id'] and r['mp']>=120000 and r['tent'] and r['mine'],json.dumps(r))
        # 7) ท้าทายประจำสัปดาห์เรียกฟังก์ชันเข้าดันได้ทุกตัว
        r=await A.ev("""()=>{const o=[];for(const k in WKP)for(const e of WKP[k])o.push([e[3],typeof window[e[3]]]);return o.filter(x=>x[1]!=='function')}""")
        rep('ท้าทายประจำสัปดาห์: ฟังก์ชันเข้าดันมีครบทุกตัว',not r,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
