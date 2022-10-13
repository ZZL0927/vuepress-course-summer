import { ParsedArgs } from 'minimist'
import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
/**
 * 枚举文件
 * @param args
 */
 let dirs = []
 let Docs = []
//  将文件和文件夹分别存储在两个数组
function checkDir(dir:string){
    const files = fs.readdirSync(dir)
    dirs = []
    Docs = []
    for(const file of files)
    {
        const fullpath = path.join(dir, file)
        const stat = fs.statSync(fullpath)
        const isDirectory = stat.isDirectory()
        if (isDirectory === false) {
            Docs.push(file)
        }
        if (isDirectory === true) {
            dirs.push(file)
        }

    }
}
function help() {
    console.log('usage: ls --sort mtime / --order desc or asc')
}
function timeFormat(date:Date)
{
    return date.getFullYear()+'-'+(date.getMonth()+1+'').padStart(2,"0")+'-'+(date.getDate()+'').padStart(2,"0")+' '+(date.getHours()+'').padStart(2,"0")+':'+(date.getMinutes()+'').padStart(2,"0")
}
export default function ls(args: ParsedArgs) {
    if (args.help === true) {
        return help()
    }
    if(args.sort&&args.sort!=='mtime'&&args.sort!=="name")
    {
        console.log('usage: ls --sort mtime or name')
        return
    }
    if(args.order&&args.order!=="desc"&&args.order!=="asc")
    {
        console.log('usage: ls --order "desc" or "asc" ')
        return
    }
    checkDir(process.cwd())
    let filesList = [...Docs,...dirs]
    console.log("LastWriteTime            Length Name");
    console.log("------------------------ ------ ----");
    
    // 如果sort为mtime，只按照修改时间排序，不需要分文件和文件夹
    if(args.sort==="mtime")
    {
        if(args.order&&args.order==="desc")
        {
            filesList.sort((a,b)=>(fs.statSync(path.join(process.cwd(),a)).mtimeMs-fs.statSync(path.join(process.cwd(),b)).mtimeMs))
        }
        else{
            filesList.sort((a,b)=>(fs.statSync(path.join(process.cwd(),b)).mtimeMs-fs.statSync(path.join(process.cwd(),a)).mtimeMs))
        }
        for(let file of filesList)
        {
            const stat = fs.statSync(path.join(process.cwd(),file))
            let date = new Date(stat.mtimeMs)
            const time = timeFormat(date)
            if(stat.isDirectory())
            {
                console.log(time.padEnd(22),('').padStart(8," "),chalk.bgYellow(file))
            }else{
                console.log(time.padEnd(22),(stat.size+'').padStart(8," "),chalk.bgGreen(file))
            }
        }
    }
    // 如果sort不为mtime，按照文件夹在前，文件在后排序
    else{
        if(args.order&&args.order==="desc")
        {
            dirs.sort()
            Docs.sort()
        }else{
            dirs.sort()
            dirs.reverse()
            Docs.sort()
            Docs.reverse()
        }
        for(let dir of dirs){
            const stat = fs.statSync(path.join(process.cwd(),dir))
            let date = new Date(stat.mtimeMs)
            const time = timeFormat(date)
            console.log(time.padEnd(22), ('').padStart(8," ") ,chalk.bgYellow(dir))
        }
        for(let doc of Docs){
            const stat = fs.statSync(path.join(process.cwd(),doc))
            let date = new Date(stat.mtimeMs)
            const time = timeFormat(date)
            console.log(time.padEnd(22),(stat.size+'').padStart(8," "),chalk.bgGreen(doc))
        }
    }
}
