import 'dotenv/config'
import Koa from 'koa'
import KoaBody from 'koa-body'

import song from './controllers/song'
import singer from './controllers/singer'
import cookie from './controllers/cookie'
import logger from './middlewares/logger'
import checkError from './middlewares/checkError'
import * as db from './db'

const app = new Koa({
  keys: JSON.parse(process.env.KEYS)
})
app.use(logger)
app.use(checkError)
app.use(KoaBody())
app.use(song)
app.use(singer)
app.use(cookie)

async function run() {
  // 先等待数据库连接
  await db.init()
  // 监听端口
  app.listen(process.env.PORT)
}

run()
