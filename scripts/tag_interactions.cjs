// AST-based accessibility/test locator migration; no content or business data changes.
const fs=require('fs'),path=require('path');
const root='/app/frontend';
const parser=require(root+'/node_modules/@babel/parser');
const traverse=require(root+'/node_modules/@babel/traverse').default;
const generate=require(root+'/node_modules/@babel/generator').default;
const t=require(root+'/node_modules/@babel/types');
const files=[];
for(const dir of ['src/pages','src/components','src/components/ui'])for(const name of fs.readdirSync(path.join(root,dir))){if(/\.(js|jsx)$/.test(name))files.push(path.join(root,dir,name));}
files.push(root+'/src/App.js');
for(const file of files){let text=fs.readFileSync(file,'utf8'),count=0;let ast=parser.parse(text,{sourceType:'module',plugins:['jsx']});const name=path.basename(file).replace(/\.(js|jsx)$/,'').replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();traverse(ast,{JSXOpeningElement(p){const node=p.node;let n=t.isJSXIdentifier(node.name)?node.name.name:t.isJSXMemberExpression(node.name)?node.name.property.name:'';if(!['button','a','input','textarea','select','summary','Link','NavLink','Button','Input','Textarea','SelectTrigger','TabsTrigger','AccordionTrigger','DropdownMenuTrigger','DropdownMenuItem','Close','Trigger','Checkbox','Switch'].includes(n))return;if(node.attributes.some(a=>a.name?.name==='data-testid'))return;node.attributes.push(t.jsxAttribute(t.jsxIdentifier('data-testid'),t.stringLiteral(`${name}-${n.toLowerCase()}-${++count}`)));}});if(count)fs.writeFileSync(file,generate(ast,{retainLines:false,comments:true},text).code+'\n');}
console.log('Tagged interactive controls across existing pages, navigation and dialog primitives');
