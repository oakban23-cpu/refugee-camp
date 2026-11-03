S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
OLDK="'hnt','kn','grif','nox','cas','lum','brom','mek','hed','orr','gem','leo'])"
NEWK="'hnt','kn','grif','nox','cas','lum','brom','mek','hed','orr','gem','leo','thr','aze','hd','tw','nyx','ice','stl','b1','b2','b3','b4','b6'])"
OLDF="function npcpKey(k){if(!k)return'';const b=String(k).replace(/\\d+$/,'');return NPCP.ks.has(b)?b:''}"
NEWF="function npcpKey(k){if(!k)return'';k=String(k);if(NPCP.ks.has(k))return k;const b=k.replace(/\\d+$/,'');return NPCP.ks.has(b)?b:''}"
def fix(s,n=1):
    for a,b in ((OLDK,NEWK),(OLDF,NEWF)):
        assert s.count(a)==n,(a[:60],s.count(a));s=s.replace(a,b)
    return s
s=fix(open(S+'v578/index_pre.html').read())
def R(a,b):
    global s
    assert s.count(a)==1,(a[:60],s.count(a));s=s.replace(a,b)
R("const WNV='v577';","const WNV='v578';")
R("const WNL=[\n","const WNL=[\n  ['🖼️','ภาพหน้าตัวละครชุดที่ 3 + บอส','เพิ่มอีก 12 — ธรณิน · อาซาเอล · ทูตปีกทมิฬ · ผู้เฝ้าหอคอย · นิกซ์ · นักบวชน้ำแข็ง · ผู้พิทักษ์ศิลาจารึก · บอส ราชาหมอกพิษ · ราชากระดูกโบราณ · จอมมารเพลิงนรก · จักรพรรดิน้ำแข็งนิรันดร์ · ราชันย์ห้วงลึก · รวม 36 ตัว'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s)
u=fix(open(S+'ux152.js').read());open(S+'ux152.js','w').write(u);print('ok')
