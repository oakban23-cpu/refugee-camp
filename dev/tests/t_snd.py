import asyncio, sys, random, base64, numpy as np, wave
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
SD='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/snd/'
REN="""async(code)=>{const oc=new OfflineAudioContext(2,44100*3.2,44100);Object.defineProperty(oc,'state',{get:()=>'running'});const A0=AC,S0=SAB;AC=oc;SAB=null;muted=false;SVOL=1;
  let err='';try{eval(code)}catch(e){err=e.message}const buf=await oc.startRendering();AC=A0;SAB=S0;const L=buf.getChannelData(0),R=buf.getChannelData(1);const o=new Int16Array(L.length*2);let pk=0,ss=0;
  for(let i=0;i<L.length;i++){pk=Math.max(pk,Math.abs(L[i]),Math.abs(R[i]));ss+=L[i]*L[i];o[i*2]=Math.max(-1,Math.min(1,L[i]))*32767;o[i*2+1]=Math.max(-1,Math.min(1,R[i]))*32767}
  let bin='';const u8=new Uint8Array(o.buffer);for(let i=0;i<u8.length;i+=8192)bin+=String.fromCharCode.apply(null,u8.subarray(i,i+8192));return {err,pk,rms:Math.sqrt(ss/L.length),b64:btoa(bin)}}"""
T=[('tele2',"VSF.tele('fire')"),('tele_fire',"VSF.tele('fire')"),('tele_ice',"VSF.tele('ice')"),('slam_fire',"VSF.slam('fire')"),('slam_ice',"VSF.slam('ice')"),('slam_poison',"VSF.slam('poison')"),('slam_bone',"VSF.slam('bone')"),('slam_soul',"VSF.slam('soul')"),('slam_holy',"VSF.slam('holy')"),('slam_gold',"VSF.slam('gold')"),('slam_storm',"VSF.slam('storm')"),('slam_water',"VSF.slam('water')"),('slam_root',"VSF.slam('root')"),('slam_sand',"VSF.slam('sand')"),('slam_big',"VSF.slam('magma',1)"),('hit',"VSF.hit()"),('sum',"VSF.sum('soul')"),('nova',"VSF.nova('storm')"),('roar',"VSF.roar()"),('die',"VSF.die('fire')"),('ref_crit',"SFXD.crit()"),('ref_mage0',"SKS.mage[0]()")]
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Sn'+str(random.randint(1000,9999)), 'mage', 60)
        await A.wait(800)
        for nm,code in T:
            r=await A.ev(REN,code)
            raw=base64.b64decode(r['b64']);w=wave.open(SD+nm+'.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(44100);w.writeframes(raw);w.close()
            print(f"{nm:12s} err={r['err']!r} peak={r['pk']:.2f} rms={r['rms']:.3f}")
        amb=await A.ev("""()=>{const out={};const B=abus();for(const m of [2,4,5,6,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]){curMap=m;let n=0,err='';const ch=()=>n++,pop=()=>n++;const a=new OfflineAudioContext(1,44100,44100);const B2={nb:a.createBuffer(1,44100,44100)};
           for(let i=0;i<200;i++){try{vsAmb(a,B2,a.destination,0,i%2==0,ch,pop,Math.random)}catch(e){err=e.message;break}}out[m]=[n,err]}curMap=1;return out}""")
        print(amb)
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
