/* ===== v534 จอ PC ใหญ่ (เกมขยายหน้า uz > 1): ไล่เช็กทุกหน้าต่างที่ 1920×1080 / 2560×1440
   เจอ 2 จุด (หน้าต่างอื่น ๆ 45 แบบ · บทสนทนา · แผนที่โลก · แชต · เลเวลอัป ไม่ล้น/ไม่ทับ):
   ① ตอนล้ม: แถบ «ล้มลง ฟื้นที่ค่ายใน N วิ» บนแคนวาสไม่ได้ตั้งจัดกลาง → ข้อความเยื้องขวาทุกจอ (เห็นชัดบนจอใหญ่) · แก้ใน patch340
   ② ป้าย «💀 ล้มลงแล้ว…» เป็น HTML นอกกรอบเกม (ไม่ถูกขยายตาม) → บนจอใหญ่ตัวเล็กและทับชื่อตัวละคร/แถบ
      → (ทุกจอ รวมแนวตั้งที่ป้ายเคยทับชื่อ) ขนาดตัวอักษรคูณ --vuz · ระยะเหนือกลางจอคูณสเกลแคนวาสจริง (--vk × --vuz) ให้อยู่เหนือชื่อตัวละครเสมอ ===== */
(function(){try{const s=document.createElement('style');s.id='bigpc';s.textContent=
 '#vzd{top:auto!important;bottom:calc(50% + 64px)!important}'+
 'body.vw #vzd{bottom:calc(50% + 60px * var(--vk,1) * var(--vuz,1) + 4px)!important;font-size:calc(26px * var(--vuz,1))!important}'+
 'body.vw #vzd small{font-size:calc(12px * var(--vuz,1))!important}';document.head.appendChild(s)}catch(e){}})();
