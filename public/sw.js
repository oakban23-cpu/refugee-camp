/* REFUGEE service worker (v492)
   มีไว้ให้ติดตั้งเกมเป็นแอปได้ · ไม่เก็บหน้าเกมไว้ในเครื่อง (เกมออนไลน์ ต้องได้เวอร์ชันล่าสุดจากเซิร์ฟเวอร์ทุกครั้ง)
   เปิดหน้าเกมตอนไม่มีเน็ต → หน้าแจ้ง «ต้องต่ออินเทอร์เน็ต» พร้อมปุ่มลองใหม่ · คำขออื่นทั้งหมดผ่านตรงไปเครือข่ายตามปกติ */
const OFF = '<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0e1322"><title>REFUGEE</title>'
  + '<style>html,body{margin:0;height:100%;background:#05040a;color:#f3e2b8;font:16px/1.6 system-ui,sans-serif}main{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:24px;box-sizing:border-box;text-align:center}'
  + 'h1{margin:0;font:900 38px Georgia,serif;letter-spacing:.14em;color:#ffd35a;text-shadow:0 0 14px rgba(255,170,60,.6)}p{margin:0;opacity:.85}button{margin-top:14px;padding:12px 28px;border-radius:999px;border:2px solid #ffd77a;background:linear-gradient(180deg,#78281a,#320e08);color:#fff2c8;font:800 16px system-ui,sans-serif}</style></head>'
  + '<body><main><h1>REFUGEE</h1><p>📡 ต้องต่ออินเทอร์เน็ตเพื่อเล่น</p><p style="font-size:13px">เกมนี้เล่นออนไลน์กับผู้เล่นคนอื่น · เปิดเน็ตแล้วกดลองใหม่</p><button onclick="location.reload()">ลองใหม่</button></main></body></html>';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(() => new Response(OFF, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })));
});
