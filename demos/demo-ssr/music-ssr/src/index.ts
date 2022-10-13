import 'dotenv/config'
import Koa from 'koa'
import serve from 'koa-static'
import proxy from 'koa-proxies'
import render from './middlewares/render'
import * as path from 'path'

const app = new Koa()
// 前端静态文件服务
app.use(serve(path.join(__dirname, './assets')))
// 将 /api 开头的请求代理到后端服务器
app.use(proxy('/api', {
  target: process.env.API_SERVER,
  changeOrigin: true
}))
// 挂载页面渲染中间件
app.use(render)
// 监听服务端口
app.listen(process.env.PORT)
