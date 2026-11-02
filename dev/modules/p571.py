# v571 ตาเรืองแสงไม่ใช้เงาเบลอ (shadowBlur แพงมากบนการ์ดจอมือถือ) + ตาตัวละครแบบเบาตอนเครื่องตามไม่ทัน
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v571/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:90],s.count(a));s=s.replace(a,b)
R("function vEye(W,x,y,rx,ry,c,blur){g.save();if(!W&&blur){g.shadowColor=c;g.shadowBlur=blur}g.fillStyle=W?'#ffffff':c;",
  "/* v571 สีเป็น 'r,g,b' สำหรับ glowAt (แคช) */const RGBC=new Map();function rgbOf(c){let v=RGBC.get(c);if(v)return v;let m;const s0=String(c).trim();\n"
  "  if((m=/^#([0-9a-f]{3})$/i.exec(s0)))v=[...m[1]].map(h=>parseInt(h+h,16)).join(',');else if((m=/^#([0-9a-f]{6})/i.exec(s0)))v=[0,2,4].map(i=>parseInt(m[1].slice(i,i+2),16)).join(',');\n"
  "  else if((m=/rgba?\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)\\s*,\\s*([\\d.]+)/i.exec(s0)))v=[m[1],m[2],m[3]].map(x=>Math.round(+x)).join(',');else v='255,255,255';if(RGBC.size<500)RGBC.set(c,v);return v}\n"
  "/* v571 แสงเรืองรอบตา: ภาพแสงที่เตรียมไว้แทนเงาเบลอ (ตั้ง EYEBLUR=1 เพื่อกลับไปใช้เงาเบลอ) */let EYEBLUR=0;\n"
  "function vEye(W,x,y,rx,ry,c,blur){g.save();if(!W&&blur){if(EYEBLUR){g.shadowColor=c;g.shadowBlur=blur}else glowAt(x,y,Math.max(rx,ry)+blur*.9,rgbOf(c),.85)}g.fillStyle=W?'#ffffff':c;")
R("if(bl>.5){lx*=.6;ly*=.6;if(glow&&!LOWQ){g.shadowColor=glow;g.shadowBlur=5}",
  "const lt=LOWQ||(typeof FQ!=='undefined'&&FQ.avg>28);if(bl>.5){lx*=.6;ly*=.6;if(glow&&!LOWQ){if(EYEBLUR){g.shadowColor=glow;g.shadowBlur=5}else glowAt(ex+.22+lx,hy+.45+ly,5.5,rgbOf(glow),.8)}")
# ตาตัวละครแบบเบา: ข้ามประกายเม็ดเล็กและขนตาเส้นเล็ก (เล็กกว่า 1 พิกเซลบนจอ) เมื่อเครื่องตามไม่ทัน
R("g.beginPath();g.arc(ex+.75+lx,hy+1.25+ly,.24,0,7);g.fill();\n    g.strokeStyle=O;g.lineWidth=1.05;g.beginPath();g.moveTo(ex-1.75,hy-.9);g.quadraticCurveTo(ex-.2,hy-2.35,ex+1.7,hy-1.35);g.stroke();\n    g.lineWidth=.5;g.beginPath();g.moveTo(ex+1.55,hy-1.4);g.lineTo(ex+2.15,hy-1.9);g.stroke()}",
  "if(!lt){g.beginPath();g.arc(ex+.75+lx,hy+1.25+ly,.24,0,7);g.fill()}\n    g.strokeStyle=O;g.lineWidth=1.05;g.beginPath();g.moveTo(ex-1.75,hy-.9);g.quadraticCurveTo(ex-.2,hy-2.35,ex+1.7,hy-1.35);g.stroke();\n    if(!lt){g.lineWidth=.5;g.beginPath();g.moveTo(ex+1.55,hy-1.4);g.lineTo(ex+2.15,hy-1.9);g.stroke()}}")
R("const WNV='v570';","const WNV='v571';")
R("const WNL=[\n","const WNL=[\n  ['⚡','ลื่นขึ้นตอนสู้','ตาเรืองแสงของมอนและตัวละครเปลี่ยนจากเงาเบลอ (งานหนักที่สุดของการ์ดจอมือถือ · ตอนสู้มีถึง 25 ครั้งต่อเฟรม) เป็นแสงเรืองที่เตรียมไว้ หน้าตาใกล้เดิม · ตอนเครื่องตามไม่ทัน ตาตัวละครตัดประกายเม็ดเล็กที่เล็กกว่า 1 พิกเซล'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
