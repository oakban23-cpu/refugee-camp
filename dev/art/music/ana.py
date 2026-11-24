import sys, subprocess, numpy as np, wave, json
SR = 44100
def wav_write(path, y):
    y = np.clip(y, -1, 1); d = (y.T * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(d.tobytes())

def analyse(npy, out, loopL, sec_marks):
    y = np.load(npy).astype(np.float64); m = int(0.5 * SR); Ls = int(round(loopL * SR))
    wav_write(out + '.wav', y)
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', out + '.wav', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    summ = r[r.rfind('Summary:'):]
    I = float(summ.split('I:')[1].split('LUFS')[0]); LRA = float(summ.split('LRA:')[1].split('LU')[0]); TP = float(summ.split('Peak:')[1].split('dBFS')[0])
    mono = y.mean(0)
    # clicks: second difference outliers relative to local RMS
    d2 = np.abs(np.diff(mono, 2)); loc = np.convolve(np.abs(mono), np.ones(441) / 441, 'same')[1:-1] + 1e-4
    clicks = np.where(d2 / loc > 2.5)[0]
    # seam: loop window [m, m+Ls) ; compare sample continuity across seam vs typical
    a = y[:, m + Ls - 1]; b = y[:, m]; seam_jump = float(np.abs(a - b).max())
    typ = float(np.percentile(np.abs(np.diff(mono)), 99.9))
    # periodicity check: margins equal
    per = float(np.abs(y[:, :m] - y[:, Ls:Ls + m]).max())
    # sections RMS (dBFS)
    secs = []
    for name, t0, t1 in sec_marks:
        s = mono[m + int(t0 * SR): m + int(t1 * SR)]; secs.append((name, round(20 * np.log10(np.sqrt((s ** 2).mean()) + 1e-9), 1)))
    # band energy
    sp = np.abs(np.fft.rfft(mono[m:m + Ls] * np.hanning(Ls))) ** 2; fq = np.fft.rfftfreq(Ls, 1 / SR)
    tot = sp.sum(); bands = {}
    for lo, hi in [(20, 120), (120, 500), (500, 2000), (2000, 6000), (6000, 16000)]:
        bands[f'{lo}-{hi}'] = round(100 * sp[(fq >= lo) & (fq < hi)].sum() / tot, 1)
    # stereo width
    side = (y[0] - y[1]) / 2; width = float(np.sqrt((side ** 2).mean()) / (np.sqrt((mono ** 2).mean()) + 1e-9))
    res = dict(I=I, LRA=LRA, TP=TP, clicks=len(clicks), click_t=[round(c / SR - .5, 2) for c in clicks[:8]], seam_jump=round(seam_jump, 4), typ_step=round(typ, 4), margins_equal=round(per, 6), sections=secs, bands=bands, width=round(width, 2))
    print(json.dumps(res, ensure_ascii=False))
    subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', out + '.wav', '-lavfi', 'showspectrumpic=s=1400x420:scale=log:legend=1:fscale=log', out + '_spec.png'])
    subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', out + '.wav', '-filter_complex', 'showwavespic=s=1400x220:split_channels=1:colors=#ffcc66|#66ccff', '-frames:v', '1', out + '_wave.png'])
    return res

if __name__ == '__main__':
    npy, out, L = sys.argv[1], sys.argv[2], float(sys.argv[3]); marks = json.loads(sys.argv[4]) if len(sys.argv) > 4 else []
    analyse(npy, out, L, marks)

def finalize(npy, out, target=-16.0, tp=-1.5):
    """loudness-normalise (one gain for the whole file, so the loop stays seamless) and encode mp3"""
    y = np.load(npy).astype(np.float64); wav_write(out + '_pre.wav', y)
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', out + '_pre.wav', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    summ = r[r.rfind('Summary:'):]; I = float(summ.split('I:')[1].split('LUFS')[0]); TP = float(summ.split('Peak:')[1].split('dBFS')[0])
    g = target - I
    if TP + g > tp: g = tp - TP
    y = y * 10 ** (g / 20); wav_write(out + '_fin.wav', y)
    subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', out + '_fin.wav', '-c:a', 'libmp3lame', '-q:a', '4', out + '.mp3'], check=True)
    return g
