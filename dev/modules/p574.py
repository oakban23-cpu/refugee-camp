# v574 จุติแล้วเดินเนื้อเรื่องต่อได้ (ux150)
import re
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v574/index_pre.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:90],s.count(a));s=s.replace(a,b)
assert 'function lvOk(' not in s and 'RBQ' not in s
R('me.lv<st.lv','!lvOk(st.lv)',4)
R('me.lv>=st.lv','lvOk(st.lv)',5)
R('me.lv<(G.req||1)','!lvOk(G.req||1)',3)
R('me.lv<G.req','!lvOk(G.req)',3)
R("return req>me.lv?'ต้องเลเวล '","return !lvOk(req)?'ต้องเลเวล '")
R("DT[tr].lv;if(me.lv<need){dungeonUI(","DT[tr].lv;if(!lvOk(need)){dungeonUI(")
R("S2&&S2.lv&&me.lv<S2.lv?'L'","S2&&S2.lv&&!lvOk(S2.lv)?'L'")
u=open(S+'ux149.js').read();R(u,u+open(S+'ux150.js').read())
R("const WNV='v573';","const WNV='v574';")
R("const WNL=[\n","const WNL=[\n  ['🌅','จุติแล้วเดินเนื้อเรื่องต่อได้','ตัวละครที่จุติแล้วไม่ติดเงื่อนไขเลเวลของเควสเนื้อเรื่อง ประตูวาร์ป และดันเนื้อเรื่องอีก (เคยผ่าน Lv 99 มาแล้ว) · ออโต้เควสจะพาไปเก็บเลเวลก่อนถ้ามอนแมพเควสแรงกว่าเกิน 8 เลเวล — กดปุ่ม «🏃 ไปทำเควสเลย» ถ้าอยากลุยเลย · เข้าแมพที่มอนแรงมากจะมีคำเตือน'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
