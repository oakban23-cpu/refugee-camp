"""สร้างภาพแม่แบบ (กริด + เส้นตัด 9 ช่อง) ของ 4 แผ่น UI · ใช้ทั้งในแพ็กและตอนตัดภาพกลับ"""
import json
from PIL import Image, ImageDraw, ImageFont
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/uipack/pack/templates/'
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',17);F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',12)
except Exception:F=F2=ImageFont.load_default()
# ชิ้นต่อแผ่น: (ช่อง, ชื่อ, ชนิด, กล่อง[x0,y0,x1,y1] ในพิกัดแผ่น, ขอบตัด [l,t,r,b] หรือ None, คำอธิบายสั้น)
def grid(cols,rows,cw,ch,items,k=1.0):
    out=[]
    for i,(name,kind,w,h,sl,desc) in enumerate(items):
        c,r=i%cols,i//cols;x0,y0,x1,y1=round(c*cw),round(r*ch),round((c+1)*cw),round((r+1)*ch);cx,cy=(x0+x1)//2,(y0+y1)//2+(10 if kind!='tile' else 0)
        w,h=round(w*k),round(h*k);sl=[round(v*k) for v in sl] if sl else None
        if kind=='tile':w,h=x1-x0,y1-y0;cy=(y0+y1)//2
        out.append(dict(n=i+1,name=name,kind=kind,cell=[x0,y0,x1,y1],box=[cx-w//2,cy-h//2,cx-w//2+w,cy-h//2+h],slice=sl,desc=desc))
    return out
SHEETS={
 'ui_01_windows':dict(W=1536,H=1024,items=grid(4,3,384,1024/3,[
  ('WINDOW_FRAME','9slice',560,500,[150,150,150,150],'main window border, thick band, ornate corners, centre empty'),
  ('WINDOW_BG','tile',512,512,None,'seamless dark texture, fills the whole cell'),
  ('PANEL_FRAME','9slice',540,470,[86,86,86,86],'thin sub-panel border, thin band, centre empty'),
  ('HEADER_ORNAMENT','fixed',580,116,None,'flourish under window title, gem in middle'),
  ('CLOSE_BUTTON','fixed',176,176,None,'round close button with engraved X shape'),
  ('ICON_SOCKET','fixed',224,224,None,'round socket ring for a window emblem, centre empty'),
  ('TAB_ACTIVE','9slice_h',540,150,[86,0,86,0],'selected tab plaque, glowing gold'),
  ('TAB_IDLE','9slice_h',540,150,[86,0,86,0],'unselected tab, dark with faint gold rim'),
  ('DIVIDER_LINE','9slice_h',580,40,[116,0,116,0],'thin line, fades at both ends, tiny diamond in middle'),
  ('CORNER_ORNAMENT','fixed',224,224,None,'one TOP-LEFT corner flourish only'),
  ('CHIP_FRAME','9slice_h',540,120,[70,0,70,0],'small pill label frame, dark glass, thin gold edge'),
  ('ITEM_SLOT','fixed',208,208,None,'square inventory slot, bronze rim, dark inset')],k=.62)),
 'ui_02_buttons':dict(W=1536,H=1024,items=grid(2,4,768,256,[
  ('BTN_PRIMARY','9slice_h',880,200,[150,0,150,0],'gold button, normal'),
  ('BTN_PRIMARY_DOWN','9slice_h',880,200,[150,0,150,0],'gold button, pressed (darker, no outer glow)'),
  ('BTN_SECONDARY','9slice_h',880,200,[150,0,150,0],'dark bronze/leather button with gold rim'),
  ('BTN_SECONDARY_DOWN','9slice_h',880,200,[150,0,150,0],'dark button pressed'),
  ('BTN_DANGER','9slice_h',880,200,[150,0,150,0],'crimson button with gold rim'),
  ('BTN_CONFIRM','9slice_h',880,200,[150,0,150,0],'emerald button with gold rim'),
  ('BTN_SPECIAL','9slice_h',880,200,[150,0,150,0],'violet arcane button with silver-gold rim'),
  ('BTN_DISABLED','9slice_h',880,200,[150,0,150,0],'grey weathered stone, no glow')],k=.75)),
 'ui_03_hud':dict(W=1536,H=1024,items=grid(4,3,384,1024/3,[
  ('AVATAR_RING','fixed',448,448,None,'portrait ring, big round hole, small empty plate at bottom'),
  ('BAR_FRAME','9slice_h',580,96,[58,0,58,0],'HP/MP bar holder, hollow inside'),
  ('BAR_FILL_HP','tile_h',580,48,None,'glossy crimson strip, seamless left-right'),
  ('BAR_FILL_MP','tile_h',580,48,None,'glossy sapphire strip, seamless left-right'),
  ('BAR_FILL_EXP','tile_h',580,48,None,'glossy gold strip, seamless left-right'),
  ('SKILL_RING','fixed',400,400,None,'skill button ring, round hole'),
  ('SKILL_RING_ULT','fixed',448,448,None,'ultimate skill ring, more ornate, fiery gold, round hole'),
  ('ROUND_BUTTON','fixed',300,300,None,'round menu button disc, dark centre, gold rim'),
  ('MINIMAP_RING','fixed',464,464,None,'minimap ring, round hole, compass ticks, north diamond'),
  ('JOY_BASE','fixed',424,424,None,'joystick base ring, translucent dark, 4 notches'),
  ('JOY_KNOB','fixed',184,184,None,'joystick knob, polished bronze-gold sphere'),
  ('TRACKER_FRAME','9slice',560,380,[86,86,86,86],'small quest tracker panel border, centre empty')],k=.62)),
}
d4=[dict(n=1,name='DIALOG_FRAME',kind='9slice',cell=[0,0,1536,480],box=[24,36,1512,456],slice=[132,132,132,132],desc='wide dialogue box border, thick band, centre empty'),
    dict(n=2,name='NAME_PLATE',kind='9slice_h',cell=[0,480,512,1024],box=[36,700,476,804],slice=[72,0,72,0],desc='speaker name plaque'),
    dict(n=3,name='PORTRAIT_FRAME',kind='fixed',cell=[512,480,1024,1024],box=[588,572,948,932],slice=None,desc='square portrait frame, hole in middle'),
    dict(n=4,name='NEXT_ARROW',kind='fixed',cell=[1024,480,1536,740],box=[1220,530,1340,650],slice=None,desc='small glowing gem arrow pointing DOWN'),
    dict(n=5,name='TOAST_FRAME',kind='9slice',cell=[1024,740,1536,1024],box=[1064,800,1496,964],slice=[56,44,56,44],desc='small notification frame, centre empty')]
SHEETS['ui_04_dialog']=dict(W=1536,H=1024,items=d4)
json.dump(SHEETS,open(O+'../../tools/sheets.json','w'),indent=1)
for k,S in SHEETS.items():
    im=Image.new('RGB',(S['W'],S['H']),(236,236,236));d=ImageDraw.Draw(im)
    for it in S['items']:
        x0,y0,x1,y1=it['cell'];d.rectangle([x0,y0,x1-1,y1-1],outline=(150,150,150),width=2)
        b=it['box'];d.rectangle(b,outline=(30,110,220),width=4,fill=(214,226,246))
        sl=it['slice']
        if sl:
            l,t,r,bb=sl
            for xx in ([b[0]+l,b[2]-r] if l else []):d.line([xx,b[1],xx,b[3]],fill=(220,40,40),width=3)
            for yy in ([b[1]+t,b[3]-bb] if t else []):d.line([b[0],yy,b[2],yy],fill=(220,40,40),width=3)
        d.text((x0+10,y0+8),'%d  %s'%(it['n'],it['name']),fill=(20,20,20),font=F)
        d.text((x0+10,y0+36),it['desc'][:60],fill=(70,70,70),font=F2)
    im.save(O+k+'_template.png')
print('ok')
