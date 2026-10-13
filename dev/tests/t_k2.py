import os,json,urllib.request,time
os.environ['ADMIN_KEY']='k123';os.environ['ADMIN_KEY2']='second-key-456'
from h import *
def call(path,key,body=None):
    r=urllib.request.Request(URL+path,data=json.dumps(body).encode() if body is not None else None,headers={'x-admin-key':key,'Content-Type':'application/json'},method='POST' if body is not None else 'GET')
    try: return urllib.request.urlopen(r).status
    except urllib.error.HTTPError as e: return e.code
p=start_server()
try:
    print(call('admin/api','k123'),call('admin/api','second-key-456'),call('admin/api','wrong'),call('admin/api',''))
    print(call('admin/ann','second-key-456',{'t':'ทดสอบ'}))
finally:
    p.terminate();print(p.stdout.read().decode()[-300:])
