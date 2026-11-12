import json,sys,os,base64,io
from PIL import Image,ImageDraw
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
P=S+'bvpack/REFUGEE_boss_variants/';os.makedirs(P+'base_cells',exist_ok=True);os.makedirs(P+'what_changes',exist_ok=True)
plan=json.load(open(S+'boss/plan.json'));pos={e['id']:(e['sheet'],e['cell']) for e in plan}
r=json.load(open(S+'bvar/rend.json'))
def im(u):return Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).convert('RGBA')
POR=['cas_dmg','orien_p3','refl_c1','refl_c2','queen_listen','queen_eye','queen_inhale','hunger_tendril','hunger_inhale']
WID=['wolf_dmg','kraken_dmg','weaver_f2','weaver_f3','dev_cast','dev_crack','dev_peel','dev_core','wb_slamL','wb_slamR','wb_breath','wb_nova','gb_shield','gb_hammer','gb_nova']
BID={'cas_dmg':11,'orien_p3':12,'refl_c1':30,'refl_c2':30,'queen_listen':22,'queen_eye':22,'queen_inhale':22,'hunger_tendril':24,'hunger_inhale':24,'wolf_dmg':21,'kraken_dmg':25,'weaver_f2':31,'weaver_f3':31,'dev_cast':37,'dev_crack':37,'dev_peel':37,'dev_core':37,'wb_slamL':48,'wb_slamR':48,'wb_breath':48,'wb_nova':48,'gb_shield':49,'gb_hammer':49,'gb_nova':49}
sheets=[('var_01','p',POR[:8]),('var_02','p',POR[8:]),('var_03','w',WID[:6]),('var_04','w',WID[6:12]),('var_05','w',WID[12:])]
out=[]
for name,kind,keys in sheets:
    cols,rows=(4,2) if kind=='p' else (3,2);cw,ch=1536//cols,1024//rows
    B=Image.new('RGBA',(1536,1024),(0,0,0,0));Cg=Image.new('RGB',(1536,1024),(48,52,50));d=ImageDraw.Draw(Cg);db=ImageDraw.Draw(B)
    for n,k in enumerate(keys):
        c,rw=n%cols,n//cols;sh,cell=pos[BID[k]];src=Image.open(S+f'boss_in/{sh}.png').convert('RGBA')
        scols=4 if int(sh[-2:])<=5 else 3;scw,sch=1536//scols,1024//2;q=cell-1
        bc=src.crop(((q%scols)*scw,(q//scols)*sch,(q%scols+1)*scw,(q//scols+1)*sch))
        assert bc.size==(cw,ch),(k,bc.size,cw,ch)
        B.paste(bc,(c*cw,rw*ch),bc)
        a,v=im(r[k][0]),im(r[k][1]);bb=a.getchannel('A').getbbox();b2=v.getchannel('A').getbbox();box=(min(bb[0],b2[0]),min(bb[1],b2[1]),max(bb[2],b2[2]),max(bb[3],b2[3]))
        for j,x in enumerate((a,v)):
            t=x.crop(box);t.thumbnail((cw//2-8,ch-40));Cg.paste(t,(c*cw+j*(cw//2)+4,rw*ch+30),t)
        d.rectangle((c*cw,rw*ch,c*cw+cw-1,rw*ch+ch-1),outline=(120,120,130));d.text((c*cw+6,rw*ch+6),f'cell {n+1}: {k}   (left = normal, right = this variant)',fill=(255,230,120))
        db.text((c*cw+6,rw*ch+6),f'cell {n+1}',fill=(255,255,255,255))
        out.append({'sheet':name,'cell':n+1,'key':k,'base':BID[k],'base_sheet':sh,'base_cell':cell})
    B.save(P+f'base_cells/{name}_base.png');Cg.save(P+f'what_changes/{name}_changes.jpg',quality=88)
json.dump(out,open(S+'bvar/varplan.json','w'),indent=0)
print(len(out))
