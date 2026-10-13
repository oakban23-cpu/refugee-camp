/* ตัดคอมเมนต์ + ช่องว่างเกิน ใน <script> (ไม่เปลี่ยนชื่อตัวแปร · คงการขึ้นบรรทัดไว้เพื่อ ASI) */
const acorn=require('/opt/node-tools/node_modules/acorn');const fs=require('fs');
const [,,inp,out]=process.argv;const s=fs.readFileSync(inp,'utf8');
const isW=ch=>!!ch&&(/[A-Za-z0-9_$\\]/.test(ch)||ch.charCodeAt(0)>127);
const hasNL=g=>{for(let i=0;i<g.length;i++){const c=g.charCodeAt(i);if(c===10||c===13||c===0x2028||c===0x2029)return true}return false};
function strip(code){const toks=[];for(const t of acorn.tokenizer(code,{ecmaVersion:'latest',allowHashBang:true}))toks.push(t);
  let o='',prev=0;
  for(let k=0;k<toks.length;k++){const t=toks[k];
    if(k>0){const gap=code.slice(prev,t.start);if(gap.length){if(hasNL(gap))o+='\n';else{const a=o[o.length-1],b=code[t.start];if((isW(a)&&isW(b))||('+-'.includes(a)&&'+-'.includes(b))||a==='/'||b==='/')o+=' '}}}
    o+=code.slice(t.start,t.end);prev=t.end}
  return o}
let n0=0,n1=0;
const res=s.replace(/(<script(?![^>]*src)[^>]*>)([\s\S]*?)(<\/script>)/g,(m,a,code,c)=>{n0+=code.length;const r=strip(code);n1+=r.length;return a+'\n'+r+'\n'+c});
fs.writeFileSync(out,res);console.log('script chars',n0,'->',n1,'· file bytes',Buffer.byteLength(s),'->',Buffer.byteLength(res));
