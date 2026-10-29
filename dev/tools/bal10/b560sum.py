import json,glob,sys,os
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net/'
MECH={'barrel','wbl','squeeze','wsk','bolt','hand','stop','ctw','gear','cwn','spoke9','fear','wvr','needle','bind','spoke','meteor'}
dirs=sys.argv[1].split(',')
rows={}
for d in dirs:
    for f in sorted(glob.glob(S+d+'/*.json'),key=os.path.getmtime):
        r=json.load(open(f));P=r['players']
        if len(P)!=1: continue
        p=P[0];e=r.get('end') or p.get('end') or {}
        hb=p.get('hitBy') or {}
        mt=sum(v[1] for k,v in hb.items() if k in MECH);mn=sum(v[0] for k,v in hb.items() if k in MECH)
        rows[(r['dg'],p['cls'])]=dict(win=e.get('win'),t=round(e.get('t',p['t'])),deaths=p['deaths'],pots=p['pots'],minHp=p['minHp'],taken=round(p['taken']/1000),mech=round(mt/1000),mn=mn,mh=p['mh'],mx=max([v[1]/max(1,v[0]) for k,v in hb.items() if k in MECH] or [0]))
order=['gdl','wbl','wsk','ctw','cwn','wvr'];cls=['melee','archer','mage','assn','sup']
for dg in order:
    for c in cls:
        x=rows.get((dg,c))
        if x: print(dg,c,'ชนะ' if x['win'] else 'แพ้',x['t'],'ตาย',x['deaths'],'ยา',x['pots'],'ต่ำสุด',str(x['minHp'])+'%','รับรวม',str(x['taken'])+'k','กลไก',str(x['mech'])+'k/'+str(x['mn'])+'ครั้ง','เฉลี่ยต่อครั้ง',round(x['mx']),'HP',x['mh'])
