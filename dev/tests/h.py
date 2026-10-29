"""Shared harness: local game server + multiple browser clients."""
import asyncio, subprocess, os, time, shutil, json
from playwright.async_api import async_playwright
SRV = os.environ.get('HSRV', os.environ.get('RF_SRV', '/home/claude/refugee-online'))  # โฟลเดอร์ที่มี server.js + public/index.html (ต้นฉบับ)
PORT = int(os.environ.get('HPORT', '3130'))
DD = os.path.join(os.path.dirname(os.path.abspath(__file__)), f'data{PORT}')
URL = f'http://localhost:{PORT}/'

def start_server():
    shutil.rmtree(DD, ignore_errors=True); os.makedirs(DD)
    env = dict(os.environ, PORT=str(PORT), DATA_DIR=DD, MVP_FAST='1', GD_FAST='1')
    p = subprocess.Popen(['node', 'server.js'], cwd=SRV, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for _ in range(60):
        time.sleep(.3)
        try:
            import urllib.request; urllib.request.urlopen(URL + 'health', timeout=1); break
        except Exception: pass
    return p

SETUP = """([cls,nm,lv])=>{document.getElementById('ttl')&&document.getElementById('ttl').remove();localStorage.setItem('refugee_tut','1');if(!window.__keepWN){localStorage.setItem('refugee_wn','v565');localStorage.setItem('refugee_tips','["pty","base","ride","pair","dye","guild"]')}
  pick(cls,'',nm);window.PRO_ON=0;const e=document.getElementById('procv');if(e)e.remove();ov.hidden=true;gmSetLv(lv);
  try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};me.sty={s:65,n:0,a:0,e:1};
  window.__err=[];window.addEventListener('error',e=>window.__err.push(String(e.message).slice(0,200)));
  window.__mut=0;new MutationObserver(m=>{window.__mut+=m.length}).observe(ov,{childList:true,subtree:true});
  return {uid,on:!!(room&&room.url)}}"""

class Client:
    def __init__(s, ctx, pg, name): s.ctx, s.pg, s.name, s.errs = ctx, pg, name, []
    async def ev(s, js, arg=None):
        return await (s.pg.evaluate(js, arg) if arg is not None else s.pg.evaluate(js))
    async def wait(s, ms): await s.pg.wait_for_timeout(ms)

async def new_client(b, name, cls='melee', lv=70):
    ctx = await b.new_context(viewport={'width': 390, 'height': 844}, has_touch=True, is_mobile=True)
    pg = await ctx.new_page(); c = Client(ctx, pg, name)
    pg.on('pageerror', lambda e: c.errs.append((e.stack or str(e))[:400]))
    pg.on('console', lambda m: c.errs.append('console.' + m.type + ': ' + m.text[:300]) if m.type == 'error' else None)
    await pg.goto(URL); await pg.wait_for_timeout(2000)
    info = await pg.evaluate(SETUP, [cls, name, lv]); await pg.wait_for_timeout(2000)
    c.uid = info['uid']; c.online = info['on']
    return c
