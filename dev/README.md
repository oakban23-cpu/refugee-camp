# dev/ — ต้นฉบับ เครื่องมือ และชุดทดสอบของ REFUGEE

โฟลเดอร์นี้ **ไม่ถูกเสิร์ฟให้ผู้เล่น** (server.js เสิร์ฟเฉพาะ `public/index.html` และรูปใน `public/`) มีไว้สำรองเพื่อแก้เกมต่อได้ แม้เครื่องที่ใช้ทำงานจะหายไป

## โครงสร้าง
| โฟลเดอร์ | เนื้อหา |
|---|---|
| `src/index.html` | **ต้นฉบับเกมฉบับอ่านง่าย** (มีคอมเมนต์ไทยครบ) — ไฟล์ `public/index.html` คือฉบับนี้ที่ผ่าน `tools/strip.js` ตัดคอมเมนต์/ช่องว่างแล้ว |
| `modules/` | โมดูลที่ประกอบเข้า index.html: `p6a–p6f.js` (ภาค 6 บท 1–5) · `dep1–dep6.js` (ระบบมิติฉาก v347–v354) · `patch340.py` (สคริปต์ประกอบ: เริ่มจากฉบับ v340 แล้วแทรกโมดูล + แก้จุดต่าง ๆ) |
| `tests/` | ชุดทดสอบ Playwright (เปิดเซิร์ฟเวอร์จริง + เบราว์เซอร์หลายตัว) |
| `tools/` | `strip.js` (ย่อไฟล์ด้วย acorn tokenizer) · `build.sh` · `deploy.sh` |

## แก้เกมรอบต่อไป (วิธีง่ายสุด)
1. คัดลอก `dev/src/index.html` ไปเป็น `public/index.html` ของโฟลเดอร์ทำงาน (คู่กับ `server.js`)
2. แก้ไฟล์ต้นฉบับโดยตรง (หรือเขียนโมดูลใหม่แล้วแทรกก่อน `function drawPalGate(G){`)
3. ย่อไฟล์: `node tools/strip.js <ต้นฉบับ> public/index.html` (ต้อง `npm i acorn` ใน tools/)
4. **คัดลอกต้นฉบับที่แก้แล้วกลับมาไว้ที่ `dev/src/index.html` ด้วยทุกครั้ง**

> `patch340.py` ต้องใช้ไฟล์ฐาน `index.before-v340.html` ซึ่งไม่ได้เก็บไว้ (ใหญ่และไม่จำเป็นแล้ว เพราะ `src/index.html` รวมทุกอย่างไว้แล้ว) — เก็บไว้เป็นบันทึกว่าแต่ละส่วนถูกแทรกตรงไหน

## ตั้งเครื่องใหม่ (ทำครั้งแรกหลังเครื่องทำงานหาย · ใช้จริงตอน v565)
1. `refugee-online/` = `server.js admin.html package.json render.yaml` + `public/*` จาก repo แล้วทับ `public/index.html` ด้วย `dev/src/index.html` (ฉบับอ่านง่าย)
2. โมดูล `dev/modules/*` → โฟลเดอร์ scratchpad · ชุดทดสอบ `dev/tests/*` (รวม `h.py` `runq.sh`) และ `dev/tools/bal10/*` → `scratchpad/net/`
3. `dev/tools/strip.js build.sh deploy.sh` → `/home/claude/tools/` และ `/home/claude/` · acorn: `npm i acorn` (ถ้า npm ต่อเน็ตไม่ได้ คัดลอกจาก `/opt/node-tools/node_modules/acorn`)
4. ตรวจ: `bash build.sh` แล้วเทียบไฟล์ผลกับ `public/index.html` ใน repo ต้องเหมือนกันทุกไบต์
- ตั้งแต่ v565 แก้เกมด้วยสคริปต์ `pNNN.py` ที่อ่านสำเนาต้นฉบับก่อนแก้ (`vNNN/index_pre.html`) แล้วแทรกโมดูล/แก้จุดลงต้นฉบับโดยตรง (`patch340.py` เป็นบันทึกเก่า รันไม่ได้แล้ว)

## รันชุดทดสอบ
ต้องมี Node, Python 3, `pip install playwright pillow` และ Chromium ของ Playwright
```bash
cd dev/tests
export RF_SRV=/path/to/folder-with-server.js   # ที่ public/index.html เป็นฉบับที่จะทดสอบ
python3 t_sys.py          # ระบบหลัก 26 ข้อ (ออนไลน์หลายคน · เทรด · PvP · MVP · ดันเจี้ยน · อันดับ)
python3 t_sys.py mvp      # รันเฉพาะหมวด
python3 t_p6.py           # ภาค 6 บท 1   · t_mkt.py บท 2 · t_arn.py บท 3 · t_clk.py บท 4
python3 t_hp.py 1         # ภาค 6 บท 5 + ฉากจบ (1 หรือ 2 = ฉากจบแต่ละแบบ)
python3 t_esc2.py         # ลานคุ้มกัน 2 ผู้เล่น
python3 t_pf.py           # ความลื่น (PF.draw ms) ตอนมอนเยอะ
python3 t_dep.py 1,2,3    # ภาพแมพ + ความลื่น (ที่ราบสูง/ลายพื้น/หมอก)
python3 t_dgv.py          # เข้าดันเจี้ยนทุกแบบแล้วถ่ายภาพ
```
- ก่อนรัน ปิดเซิร์ฟเวอร์ค้าง: `ps aux | grep "[n]ode server" | awk '{print $2}' | xargs -r kill`
- ภาพจากเทสต์ถูกบันทึกที่ `../p6/` (สร้างโฟลเดอร์ไว้ก่อน)
- คีย์แอดมินในเทสต์ (`k123`, `test-secret-123`) เป็นค่าสมมติของเซิร์ฟเวอร์ทดสอบบนเครื่องเท่านั้น — คีย์จริงตั้งเป็นตัวแปรแวดล้อม `ADMIN_KEY` บน Render
- `t_sys.py` ทดสอบ MVP โดยตรึงเลือดบอสไว้ต่ำ เพราะบอสมีระบบ leash (ถูกลากไกลบ้าน → เดินกลับ + ฟื้นเลือด 3%/วิ)
