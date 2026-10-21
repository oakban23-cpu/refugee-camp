import sys,glob,os
from PIL import Image,ImageDraw
pre=sys.argv[1];per=int(sys.argv[2]) if len(sys.argv)>2 else 4;tw=int(sys.argv[3]) if len(sys.argv)>3 else 640
D=os.environ.get('D','shots');fs=sorted(glob.glob(f'{D}/{pre}_*.png'))
os.makedirs('sheets',exist_ok=True)
for si in range(0,len(fs),per):
    ims=[]
    for f in fs[si:si+per]:
        im=Image.open(f).convert('RGB');r=tw/im.width;im=im.resize((tw,int(im.height*r)));d=ImageDraw.Draw(im);d.rectangle((0,0,len(os.path.basename(f))*7+6,14),fill=(0,0,0));d.text((3,1),os.path.basename(f),fill=(255,255,0));ims.append(im)
    cols=2 if per>1 else 1;rows=(len(ims)+cols-1)//cols;hh=max(i.height for i in ims)
    out=Image.new('RGB',(tw*cols+8*(cols-1),rows*hh+8*(rows-1)),(40,0,40))
    for i,im in enumerate(ims):out.paste(im,((i%cols)*(tw+8),(i//cols)*(hh+8)))
    out.save(f'sheets/{pre}_{si//per:02d}.png')
print(len(fs))
