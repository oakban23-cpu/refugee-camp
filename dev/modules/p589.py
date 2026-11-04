S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v589/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
R("others=o;status();","netVel(o,others);others=o;status();")
R("  Object.values(others).forEach(o=>{const dx=(o.tx-o.x)*.3,dy=(o.ty-o.y)*.3;o.x+=dx;o.y+=dy;walkTick(o,dx,dy)});","  Object.values(others).forEach(o=>netMove(o,dt));")
R("  setInterval(()=>{if(me.cls)room.presence(window.lastPres={","  setInterval(()=>{if(!me.cls)return;PRS.k++;if(Math.abs(me.x-PRS.x)+Math.abs(me.y-PRS.y)<.5&&PRS.k%3)return;PRS.x=me.x;PRS.y=me.y;{room.presence(window.lastPres={")
i=s.index("PRS.x=me.x;PRS.y=me.y;{room.presence(window.lastPres={");j=s.index("})},200);",i)
s=s[:j]+"})}},100);"+s[j+len("})},200);"):]
u=open(S+'ux159.js').read();R(u,u+open(S+'ux160.js').read())
R("const WNV='v588';","const WNV='v589';")
R("const WNL=[\n","const WNL=[\n  ['👥','เพื่อนเดินตรงขึ้น','เล่นออนไลน์: ตำแหน่งเพื่อนบนจอตามหลังของจริงน้อยลงมาก — ส่ง/ส่งต่อตำแหน่งถี่ขึ้น 2 เท่าตอนเดิน และเดาทางเดินล่วงหน้าสั้น ๆ ให้เพื่อนเดินลื่นไม่กระตุก'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s)
v=open(S+'v589/server_pre.js').read()
assert v.count("setInterval(tickPeers,200);")==1
v=v.replace("setInterval(tickPeers,200);","setInterval(tickPeers,100);")
open('/home/claude/refugee-online/server.js','w').write(v);print('ok')
