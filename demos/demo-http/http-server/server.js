/**
 * 使用tcp来实现简单的http/1.1 server
 * 该程序仅用于演示学习http协议，不能用于生产环境
 */
const fs = require('fs')
const net = require('net')
const path = require('path')
const crypto = require('crypto')
const queryString = require('querystring')

// 状态码信息
let status = new Map([
  [200, 'OK'],
  [302, 'Found'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [405, 'Method Not Allowed'],
  [500, 'Internal Server Error']
])

// MimeType
let types = new Map([
  ['txt', 'text/plain; charset=utf-8'],
  ['html', 'text/html; charset=utf-8'],
  ['css', 'text/css; charset=utf-8'],
  ['js', 'application/javascript; charset=utf-8'],
  ['json', 'application/json; charset=utf-8'],
  ['png', 'image/png'],
  ['jpg', 'image/jpeg']
])

// 构建响应报文，用\r\n\连接
function buildResponse(statusCode, content, type, headers = []) {
  let length = Buffer.from(content).byteLength
  let _headers = [
    `HTTP/1.1 ${statusCode} ${status.get(statusCode) || ''}`,
    `Server: TestServer`,
    `Date: ${new Date().toUTCString()}`,
    `Content-Type: ${type}`,
    `Content-Length: ${length}`,
    `Connection: keep-alive`
  ]
  _headers = _headers.concat(headers)
  return Buffer.concat([
    Buffer.from(`${_headers.join('\r\n')}\r\n\r\n`),
    Buffer.from(content)
  ])
}

// 渲染错误页面
function renderError(statusCode) {
  let tpl = `<html><head><title>{title}</title></head><body>{body}</body></html>`
  let message = status.get(statusCode) || ''
  let content = tpl
    .replace('{title}', statusCode)
    .replace('{body}', `<h1>${statusCode} ${message}</h1>`)
  return buildResponse(statusCode, content, types.get('html'))
}

// 返回静态文件内容
async function sendFile(context) {
  try {
    let _path = context.path === '/' ? 'index.html' : context.path
    let file = path.join(__dirname, 'web', _path)
    let stats = await fs.promises.stat(file)
    // 如果路径是一个目录，返回403错误
    if (stats.isDirectory()) {
      return renderError(403)
    }
    let content = await fs.promises.readFile(file)
    let type =
      types.get(path.extname(file).replace('.', '')) ||
      'application/octet-stream'
    return buildResponse(200, content, type)
  } catch (error) {
    // 文件读取失败，返回404错误
    return renderError(404)
  }
}

// 返回json数据
function sendJSON(context) {
  let json = {
    stat: 'OK',
    query: context.query
  }
  return buildResponse(200, JSON.stringify(json), types.get('json'))
}

// 设置cookie
function setCookie() {
  let token = crypto.randomBytes(8).toString('hex')
  return buildResponse(200, 'Set-Cookie', types.get('txt'), [
    `Set-Cookie: token=${token}; path=/; expires=${new Date(Date.now() + 3600 * 24 * 365 * 1000).toUTCString()}; httpOnly`
  ])
}

// 重定向
function redirect() {
  return buildResponse(302, '', types.get('txt'), [
    `Location: https://developer.mozilla.org/zh-CN/docs/Web/HTTP`
  ])
}

// 简单请求
function blocked() {
  let json = {
    stat: 'OK'
  }
  return buildResponse(200, JSON.stringify(json), types.get('json'))
}

// 允许跨域
function normal(context) {
  if (context.method === 'OPTIONS') {
    return buildResponse(200, '', types.get('txt'), [
      'Access-Control-Allow-Origin: *',
      'Access-Control-Allow-Headers: Content-Type'
    ])
  }
  let json = {
    stat: 'OK',
    body: context.body || null
  }
  return buildResponse(200, JSON.stringify(json), types.get('json'), [
    'Access-Control-Allow-Origin: *',
    'Access-Control-Allow-Headers: Content-Type'
  ])
}

// 路由表
const routes = new Map([
  ['/api/send_json', sendJSON],
  ['/api/set_cookie', setCookie],
  ['/api/redirect', redirect],
  ['/cors/blocked', blocked],
  ['/cors/normal', normal]
])

// 解析请求报文
function parseRequest(content) {
  console.log(content)
  let [head, ..._body] = content.split('\r\n\r\n')
  console.log(_body)
  let bodyStr = _body.join('\r\n\r\n')
  let rows = head.split('\r\n')
  // 解析GET参数
  let [method, url] = rows[0].split(' ')
  let [path, query] = url.split('?')
  let params = query ? queryString.parse(query) : {}
  let headers = {}
  // 解析请求头
  for (let i = 1; i < rows.length; i++) {
    let index = rows[i].indexOf(':')
    let name = rows[i].substring(0, index).trim().toLowerCase()
    let value = rows[i].substring(index + 1).trim()
    headers[name] = value
  }
  // 解析post json
  console.log(bodyStr)
  let body = bodyStr
  let type = headers['content-type'] || ''
  if (type.includes('application/json') && method === 'POST' && body !== '') {
    try {
      body = JSON.parse(bodyStr)
    } catch (error) { }
  }
  // 解析cookie
  let cookies = {}
  let cookieStr = headers.cookie || ''
  let tmp = cookieStr.split(';')
  for (let item of tmp) {
    let arr = item.split('=').map(key => key.trim())
    if (arr[0] && arr[1]) cookies[arr[0]] = arr[1]
  }
  // 当前请求的上下文信息
  let context = {
    method,
    path,
    query: params,
    url,
    headers,
    cookies,
    body
  }
  return context
}

// 创建一个tcp server
const server = net.createServer(socket => {
  // 收到请求数据
  socket.on('data', async chunk => {
    try {
      // 解析请求报文
      let context = parseRequest(chunk.toString('utf-8'))
      console.log(context)
      // 解析路由，返回响应报文
      let response = null
      let route = routes.get(context.path)
      if (route) response = route(context)
      else response = await sendFile(context)
      console.log(response)
      socket.write(response)
      console.log(JSON.stringify({
        time: new Date(),
        method: context.method,
        url: context.url
      }))
    } catch (error) {
      console.trace(error)
      let res = renderError(500)
      socket.write(res)
    }
  })
})

// 监听端口
server.listen(3270, () => console.log(3270))
