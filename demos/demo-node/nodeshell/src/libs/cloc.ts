import { ParsedArgs } from "minimist";
import * as fs from "fs";
import * as path from "path";
let startTime = 0;
let filesSum = 0;
let blankSum = 0;
let commentSum = 0;
let codeSum = 0;
let types = ['JavaScript','TypeScript','JSON','CSS','HTML','SCSS']
let languages = types.map(item=>{
  return {
    name:item,
    files: 0,
    blank: 0,
    comment: 0,
    code: 0,
  }
})
/**
 * 统计代码行数
 * @param args
 */
function help() {
  console.log(
    "usage: cloc <name> --sort (files/blank/comment/code) --order (desc/asc"
  );
}

function sum(lines:string[],type:string){
    if (type === ".js" || type === ".mjs" || type === ".cjs"||type==='.scss'||type==='.ts') {
        let flag = false
        let result
        if (type === ".js" || type === ".mjs" || type === ".cjs")result = languages.find(item=>item.name==='JavaScript')
        if (type==='.scss')result = languages.find(item=>item.name==='SCSS')
        if (type==='.ts')result = languages.find(item=>item.name==='TypeScript')
        result.files+=1
      for (let line of lines) {
        // 单行注释
        if (line.trim().startsWith("//")) {
          result.comment += 1;
        }
        // 空行
        else if(line.trim().length===0)
        {
            result.blank+=1
        }
        // 多行注释开头
        else if(line.trim().startsWith("/*")&&!line.trim().endsWith('*/'))
        {
            flag=true
            result.comment+=1
        }
        // 多行注释开结尾
        else if(!line.trim().startsWith("/*")&&line.trim().endsWith('*/'))
        {
            flag=false
            result.comment+=1
        }
        // 多行注释一行
        else if(line.trim().startsWith("/*")&&line.trim().endsWith('*/'))
        {
            result.comment+=1
        }
        // 注释内的正常代码
        else if(flag===true&&line.trim().length>0)
        {
            result.comment+=1
        }
        else {
            result.code+=1
        }
        
      }
    }else if(type==='.jsx'||type===".tsx")
    {
      let flag = false
        let result
        if (type === ".jsx")result = languages.find(item=>item.name==='JavaScript')
        if (type==='.tsx')result = languages.find(item=>item.name==='TypeScript')
        result.files+=1
      for (let line of lines) {
        // 单行注释
        if (line.trim().startsWith("//")) {
          result.comment += 1;
        }
        // 空行
        else if(line.trim().length===0)
        {
            result.blank+=1
        }
        // 多行注释开头
        else if((line.trim().startsWith("/*")&&!line.trim().endsWith('*/'))||(line.trim().startsWith("{/*")&&!line.trim().endsWith('*/}')))
        {
            flag=true
            result.comment+=1
        }
        // 多行注释开结尾
        else if((!line.trim().startsWith("/*")&&line.trim().endsWith('*/'))||(!line.trim().startsWith("{/*")&&line.trim().endsWith('*/}')))
        {
            flag=false
            result.comment+=1
        }
        // 多行注释一行
        else if((line.trim().startsWith("/*")&&line.trim().endsWith('*/'))||(line.trim().startsWith("{/*")&&line.trim().endsWith('*/}')))
        {
            result.comment+=1
        }
        // 注释内的正常代码
        else if(flag===true&&line.trim().length>0)
        {
            result.comment+=1
        }
        else {
            result.code+=1
        }
        
      }
    }else if(type==='.json')
    {
      let result = languages.find(item=>item.name==='JSON')
      result.files+=1
      for (let line of lines) {
        // 空行
        if(line.trim().length===0)
        {
            result.blank+=1
        }
        // code
        else {
            result.code+=1
        }
      }
    }else if(type==='.css'){
      let result = languages.find(item=>item.name==='CSS')
      result.files+=1
      let flag = false
      for (let line of lines) {
        // 空行
        if(line.trim().length===0)
        {
            result.blank+=1
        }
        // 多行注释开头
        else if(line.trim().startsWith("/*")&&!line.trim().endsWith('*/'))
        {
            flag=true
            result.comment+=1
        }
        // 多行注释开结尾
        else if(!line.trim().startsWith("/*")&&line.trim().endsWith('*/'))
        {
            flag=false
            result.comment+=1
        }
        // 多行注释一行
        else if(line.trim().startsWith("/*")&&line.trim().endsWith('*/'))
        {
            result.comment+=1
        }
        // 注释内的正常代码
        else if(flag===true&&line.trim().length>0)
        {
            result.comment+=1
        }
        // code
        else {
            result.code+=1
        }
      }
    }else if(type==='.html'||type===".htm"){
      let result = languages.find(item=>item.name==='HTML')
      result.files+=1
      let flag = false
      for (let line of lines) {
        // 空行
        if(line.trim().length===0)
        {
            result.blank+=1
        }
        else if(line.trim().startsWith("<!--")&&!line.trim().endsWith('-->'))
        {
            flag=true
            result.comment+=1
        }
        // 多行注释开结尾
        else if(!line.trim().startsWith("<!--")&&line.trim().endsWith('-->'))
        {
            flag=false
            result.comment+=1
        }
        // 多行注释一行
        else if(line.trim().startsWith("<!--")&&line.trim().endsWith('-->'))
        {
            result.comment+=1
        }
        // 注释内的正常代码
        else if(flag===true&&line.trim().length>0)
        {
            result.comment+=1
        }
        // code
        else {
            result.code+=1
        }
      }
    }
}
// 递归遍历
function calc(name: string) {
  const stat = fs.statSync(name);
  const isDirectory = stat.isDirectory();
  if (!isDirectory) {
    filesSum++
    let rep = fs.readFileSync(name).toString();
    rep.replaceAll('\r\n','\n')
    let lines = rep.split("\n");
    let type = path.extname(name);
    sum(lines,type)
  }else{
    for(let file of fs.readdirSync(name))
    {
        calc(path.join(name,file))
    }
  }
}
export default function cloc(args: ParsedArgs) {
  const target = args._[0];
  if (!target || args.help === true) {
    return help();
  }
  if(args.sort&&args.sort!=='files'&&args.sort!=="blank"&&args.sort!=="comment"&&args.sort!=="code")
  {
      console.log('usage: cloc --sort <files or blank or comment or code>')
      return
  }
  if(args.order&&args.order!=="desc"&&args.order!=="asc")
  {
      console.log('usage: cloc --order "desc" or "asc" ')
      return
  }
  // 文件名或目录名
  let name = args._[0];
  startTime = new Date().getTime()
  calc(path.join(process.cwd(), name));
  let endTime = new Date().getTime()
  // 实际读取的文件数量
  let readedFile = 0
  let totalLine = 0
  for(let file of languages){
    totalLine+=file.blank+file.comment+ file.code
    readedFile+=file.files
    blankSum+=file.blank
    commentSum+=file.comment
    codeSum+=file.code
  }
  
  let time = (endTime-startTime)/1000
  console.log(`${filesSum} files in total, ${filesSum-readedFile} files ignored`);
  console.log(`time=${time}s, ${(readedFile/time).toFixed(2)} files/s, ${(totalLine/time).toFixed(2)} lines/s`);
  console.log("--------------------------------------------------------------------------------");
  console.log("Language                     files          blank        comment            code");
  console.log("--------------------------------------------------------------------------------");
  if(args.sort)
  {
    if(args.order==='desc')
    {
      languages.sort((a,b)=>a[args.sort]-b[args.sort])
    }
    else{
      languages.sort((a,b)=>b[args.sort]-a[args.sort])
    }
  }
  for(let file of languages)
  {
    console.log(file.name.padEnd(24,' '),(file.files+'').padStart(9,' '),(file.blank+'').padStart(14,' '),(file.comment+'').padStart(14,' '),(file.code+'').padStart(14,' '));
  }
  console.log("--------------------------------------------------------------------------------");
  console.log(('SUM').padEnd(24,' '),(readedFile+'').padStart(9,' '),(blankSum+'').padStart(14,' '),(commentSum+'').padStart(14,' '),(codeSum+'').padStart(14,' '));
  console.log("--------------------------------------------------------------------------------");
}
