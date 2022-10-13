// 文件上传下载示例
const fs = require('fs')
const path = require('path')
const http = require('http')
const crypto = require('crypto')
const queryString = require('querystring')

const dir = path.join(__dirname, 'data')
if (fs.existsSync(dir) === false) fs.mkdirSync(dir)

let types = new Map([
  ['txt', 'text/plain; charset=utf-8'],
  ['html', 'text/html; charset=utf-8'],
  ['css', 'text/css; charset=utf-8'],
  ['js', 'application/javascript; charset=utf-8'],
  ['json', 'application/json; charset=utf-8'],
  ['png', 'image/png'],
  ['jpg', 'image/jpeg']
])

const server = http.createServer(async (req, res) => {
  try {
    let [reqPath, query] = req.url.split('?')
    let params = query ? queryString.parse(query) : {}
    // 上传接口
    if (reqPath === '/api/upload') {
      let name = params.name
      if (!name) {
        res.statusCode = 400
        return res.end()
      }
      let ext = path.extname(name).toLowerCase()
      let newName = crypto.randomBytes(12).toString('hex') + ext
      let stream = fs.createWriteStream(path.join(dir, newName))
      req.pipe(stream)
      stream.on('finish', () => {
        res.end(JSON.stringify({
          stat: 'OK',
          file: newName
        }))
      })
      return
    }
    // 下载接口
    if (reqPath === '/api/download') {
      let file = params.file
      if (!file) {
        res.statusCode = 400
        return res.end()
      }
      let target = path.join(dir, file)
      if (fs.existsSync(target) === false) {
        res.statusCode = 404
        return res.end()
      }
      let stat = fs.statSync(target)
      res.setHeader('Content-Length', stat.size)
      res.setHeader('Content-Type', 'application/octet-stream')
      res.setHeader('Content-Disposition', 'attachment; filename=' + file)
      return fs.createReadStream(target).pipe(res)
    }
    // 静态文件
    try {
      let _path = reqPath === '/' ? 'index.html' : reqPath
      let file = path.join(__dirname, 'web', _path)
      let stats = await fs.promises.stat(file)
      if (stats.isDirectory()) {
        res.statusCode = 403
        return res.end()
      }
      let content = await fs.promises.readFile(file)
      let type =
        types.get(path.extname(file).replace('.', '')) ||
        'application/octet-stream'
      res.setHeader('Content-Type', type)
      return res.end(content)
    } catch (error) {
      res.statusCode = 404
      return res.end()
    }
  } catch (error) {
    console.trace(error)
    res.statusCode = 500
    res.end()
  }
})

server.listen(3280, () => console.log(3280))