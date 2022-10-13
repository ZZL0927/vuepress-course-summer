import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import * as koaStatic from 'koa-static'
import logger from './middlewares/logger'
import router from './router'
import { ReqStat } from './stats'
import * as path from 'path'
import { mkdirsSync } from './lib/upload'

const app = new Koa()
const staticPath = '../data/static'
app.use(async (ctx, next) => {
  try {
    let start = Date.now()
    await next()
    let time = Date.now() - start
    ctx.set('X-Response-Time', time + 'ms')
  } catch (error) {
    if (error instanceof ReqStat) {
      ctx.status = error.statusCode || 500
      ctx.body = {
        stat: error.stat,
        message: error.msg
      }
    } else {
      console.trace(error)
      ctx.status = 500
      ctx.body = error.message
    }
  }
})

mkdirsSync(path.join(__dirname, staticPath))
app.use(logger)
app.use(koaBody())
app.use(koaStatic(path.join(__dirname, staticPath)))
app.use(router.routes())
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
