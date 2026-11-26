import sys
from PIL import Image
out=Image.new('RGB',(1600,400))
for i,f in enumerate(sys.argv[2:]):
    a=Image.open(f).convert('RGB');w,h=a.size
    t=Image.new('RGB',(2*w,2*h))
    for x in (0,w):
        for y in (0,h):t.paste(a,(x,y))
    out.paste(t.crop((w-200,h-200,w+200,h+200)),(i*400,0))
out.save(sys.argv[1])
