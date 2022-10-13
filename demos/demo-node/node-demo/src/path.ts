import * as path from 'path'

console.log(process.cwd())
console.log(__dirname)
console.log(__filename)

console.log(path.basename(__filename))
console.log(path.dirname(__filename))
console.log(path.extname(__filename))
console.log(path.resolve('/index.html'))
console.log(path.resolve('index.html'))

console.log(path.join('/www', 'task', 'index.html'))
console.log(path.join(__dirname, 'test.js'))
