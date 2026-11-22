import json,math
d=json.load(open('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/wmap/wm.json'))
P={
# stars 0-140
42:(300,70),41:(195,45),40:(95,85),
# sky 140-520
36:(115,175),28:(205,190),29:(300,165),27:(270,255),9:(200,325),10:(300,350),11:(320,440),31:(250,420),
12:(130,300),14:(55,245),16:(35,330),18:(68,390),13:(130,405),17:(35,462),15:(118,468),
# cloud sea + under-cloud 520-1040
30:(195,575),32:(265,640),33:(310,725),39:(290,830),38:(300,945),
19:(85,630),20:(45,730),21:(110,820),22:(55,920),
# ground 1040-1330
5:(70,1085),1:(180,1120),34:(270,1075),35:(320,1150),2:(255,1170),7:(300,1250),
3:(95,1180),8:(40,1265),4:(135,1268),6:(215,1255),43:(50,1360),
# underground 1330-1560
44:(55,1440),45:(75,1525),23:(150,1365),24:(240,1370),25:(300,1450),26:(200,1505)}
E=[tuple(map(int,e.split('-'))) for e in d['edges']]
assert set(P)==set(map(int,d['nodes'])),set(map(int,d['nodes']))^set(P)
def sd(p,a,b):
    ax,ay=a;bx,by=b;px,py=p;dx,dy=bx-ax,by-ay;L=dx*dx+dy*dy;t=max(0,min(1,((px-ax)*dx+(py-ay)*dy)/L));return math.hypot(ax+t*dx-px,ay+t*dy-py)
bad=0
for a in P:
    for b in P:
        if a<b and math.hypot(P[a][0]-P[b][0],(P[a][1]-P[b][1])*1.3)<62:print('close',a,b,round(math.hypot(P[a][0]-P[b][0],P[a][1]-P[b][1])));bad+=1
for a,b in E:
    if (a,b) in [(1,9)]:continue
    for n in P:
        if n in(a,b):continue
        if sd(P[n],P[a],P[b])<22:print('edge',a,b,'hits',n,round(sd(P[n],P[a],P[b])));bad+=1
for n,(x,y) in P.items():
    L=len(d['nodes'][str(n)]['n'])*5.2
    if x-L/2<2 or x+L/2>358:print('label clip',n,d['nodes'][str(n)]['n'],x)
print('bad',bad)
json.dump({str(k):v for k,v in P.items()},open('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/wmap/lay.json','w'))
