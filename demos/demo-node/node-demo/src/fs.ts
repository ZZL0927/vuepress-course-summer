import * as fs from 'fs'
import * as path from 'path'

function readFile() {
  fs.readFile(__filename, 'utf-8', (err, data) => {
    if (err) {
      console.error('文件读取失败')
    } else {
      console.log(data)
    }
  })
  console.log('-----end-----')
}

function readFileSync() {
  try {
    const data = fs.readFileSync(__filename, 'utf-8')
    console.log(data)
  } catch (err) {
    console.error('文件读取失败')
  }
  console.log('-----end-----')
}

async function readFilePromise() {
  try {
    const data = await fs.promises.readFile(__filename, 'utf-8')
    console.log(data)
  } catch (err) {
    console.error('文件读取失败')
  }
  console.log('-----end-----')
}

function stat() {
  const fileStat = fs.statSync(__filename)
  console.log(fileStat.size)
  console.log(fileStat.mtimeMs)
  console.log(fileStat.isDirectory())
  console.log('----------')
  const dirStat = fs.statSync(__dirname)
  console.log(dirStat.size)
  console.log(dirStat.mtimeMs)
  console.log(dirStat.isDirectory())
}

function readdir() {
  const dir = path.join(__dirname, '../')
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const fullpath = path.join(dir, item)
    const stat = fs.statSync(fullpath)
    console.log(fullpath, stat.isDirectory() ? 'dir' : 'file')
  }
}

readdir()
console.log('-----finished-----')
