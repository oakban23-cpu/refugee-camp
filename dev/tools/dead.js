// ตัดฟังก์ชันระดับบนสุดที่ไม่มีใครเรียก (ระบุชื่อ) ออกจาก <script> ใหญ่สุด · ใช้ acorn หาขอบเขตแม่นยำ
const fs=require('fs'),acorn=require('/opt/node-tools/node_modules/acorn');const [,,inp,out,...names]=process.argv;let h=fs.readFileSync(inp,'utf8');
let best=null,re=/<script>([\s\S]*?)<\/script>/g,m;while((m=re.exec(h))){if(!best||m[1].length>best[1].length)best=[m.index+8,m[1]]}
const code=best[1],ast=acorn.parse(code,{ecmaVersion:'latest',sourceType:'script'});const rm=[];
for(const n of ast.body)if(n.type==='FunctionDeclaration'&&names.includes(n.id.name))rm.push([n.start,n.end,n.id.name]);
let c=code;rm.sort((a,b)=>b[0]-a[0]).forEach(([s,e])=>{c=c.slice(0,s)+c.slice(e)});
for(const nm of names){const cnt=(c.match(new RegExp('\\b'+nm+'\\b','g'))||[]).length;if(cnt)throw new Error('still referenced: '+nm)}
acorn.parse(c,{ecmaVersion:'latest',sourceType:'script'});
h=h.slice(0,best[0])+c+h.slice(best[0]+code.length);fs.writeFileSync(out,h);console.log('removed',rm.map(r=>r[2]+':'+(r[1]-r[0])).join(' '),'saved',code.length-c.length)
