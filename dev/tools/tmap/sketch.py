from PIL import Image, ImageFilter, ImageOps, ImageEnhance, ImageChops, ImageDraw
import random
def paper(w,h,seed=1):
    rnd=random.Random(seed)
    n=Image.effect_noise((w,h),22).filter(ImageFilter.GaussianBlur(.8))
    base=Image.merge('RGB',[n.point(lambda p:int(222+(p-128)*.10)),n.point(lambda p:int(200+(p-128)*.10)),n.point(lambda p:int(156+(p-128)*.08))])
    v=Image.new('L',(w,h),0);d=ImageDraw.Draw(v);d.ellipse([-w*.25,-h*.25,w*1.25,h*1.25],fill=255)
    v=v.filter(ImageFilter.GaussianBlur(min(w,h)*.18))
    dark=Image.new('RGB',(w,h),(150,104,58))
    return Image.composite(base,dark,v)
PAL=[(122,84,46),(160,120,74),(196,160,112),(230,206,162)]
def sketch(src,out_size=(156,114),seed=1):
    im=src.convert('RGB').resize(out_size,Image.LANCZOS)
    w,h=im.size
    sm=im.filter(ImageFilter.MedianFilter(3))
    g=ImageOps.autocontrast(ImageOps.grayscale(sm),cutoff=3)
    # 4 tone bands -> palette
    lut=[]
    for p in range(256):
        k=min(3,p*4//256);lut.append(k)
    band=g.point(lut)
    tone=Image.new('RGB',(w,h))
    tp=tone.load();bp=band.load()
    for y in range(h):
        for x in range(w):
            tp[x,y]=PAL[bp[x,y]]
    tone=tone.filter(ImageFilter.SMOOTH)
    pap=paper(w,h,seed)
    wash=ImageChops.multiply(pap,Image.blend(tone,Image.new('RGB',(w,h),(255,255,255)),.25))
    # ink lines: edges of smoothed luminance, thresholded
    e=ImageOps.grayscale(sm).filter(ImageFilter.FIND_EDGES)
    e=e.point(lambda p:0 if p<26 else min(255,int((p-26)*3.2)))
    ink=Image.new('RGB',(w,h),(58,34,16))
    out=Image.composite(ink,wash,e.point(lambda p:min(255,int(p*.95))))
    # hint of original hue
    out=Image.blend(out,ImageChops.multiply(out,ImageEnhance.Color(im).enhance(.6)).point(lambda p:min(255,int(p*1.35))),.22)
    return ImageEnhance.Contrast(out).enhance(1.08)
if __name__=='__main__':
    import sys
    src=Image.open(sys.argv[1])
    if len(sys.argv)>3: src=src.crop(tuple(map(int,sys.argv[3].split(','))))
    s=sketch(src)
    s.resize((s.width*3,s.height*3),Image.LANCZOS).save(sys.argv[2])
