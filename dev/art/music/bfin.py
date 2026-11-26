import json, sys, subprocess, os, numpy as np
sys.argv=['x']; import ana, bossmus as bm
SR=44100; res={}
META={b[0]:dict(bpm=b[4],meter=4,intro=4,loud=-17) for b in bm.BOSS}
for k in ('d_dg','d_tw','d_raid'): T=bm.TH[k]; META[k]=dict(bpm=T['bpm'],meter=T['meter'],intro=T['intro'],loud=T['loud'])
ONLY=os.environ.get('ONLY')
old=json.load(open('bfin.json')) if os.path.exists('bfin.json') else {}
for k,Mt in META.items():
    if ONLY and k!=ONLY: res[k]=old.get(k); continue
    info=json.load(open(f'm_{k}.json')); y=np.load(f'm_{k}.npy').astype(np.float64); Ls=info['Ls']; m=22050
    per=float(np.abs(y[:,1323:m]-y[:,Ls+1323:Ls+m]).max()); bar=60/Mt['bpm']*Mt['meter']; i0=Mt['intro']; mono=y.mean(0)
    def rms(b0,b1):
        s=mono[m+int(b0*bar*SR):m+int(b1*bar*SR)]; return round(20*np.log10(np.sqrt((s**2).mean())+1e-9),1)
    secs=[rms(0,i0),rms(i0,i0+8),rms(i0+8,i0+16),rms(i0+16,i0+24)]
    sp=np.abs(np.fft.rfft(mono[m:m+Ls]))**2; f=np.fft.rfftfreq(Ls,1/SR); tot=sp.sum()
    bands=[round(100*sp[(f>=lo)&(f<hi)].sum()/tot,1) for lo,hi in [(20,150),(150,500),(500,2000),(2000,6000),(6000,16000)]]
    ana.finalize(f'm_{k}.npy', f'm_{k}', Mt['loud'], -1.5)
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',f'm_{k}_fin.wav','-c:a','libmp3lame','-b:a','112k',f'm_{k}.mp3'],check=True)
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',f'm_{k}.mp3','-f','f32le','-ac','2','-ar','44100',f'm_{k}.dec.raw'],check=True)
    d=np.fromfile(f'm_{k}.dec.raw',np.float32).reshape(-1,2).T; a=d[0,8000:12000]; err=float(np.abs(a-d[0,8000+Ls:12000+Ls]).mean())
    r=subprocess.run(['ffmpeg','-hide_banner','-nostats','-i',f'm_{k}.mp3','-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s=r[r.rfind('Summary:'):]; I=float(s.split('I:')[1].split('LUFS')[0]); TP=float(s.split('Peak:')[1].split('dBFS')[0])
    res[k]=dict(L=round(info['L'],2),Ls=Ls,secs=secs,bands=bands,period=round(per,5),dec_err=round(err,4),I=I,TP=TP,kb=os.path.getsize(f'm_{k}.mp3')//1024)
    print(k,res[k],flush=True)
json.dump(res,open('bfin.json','w'))
