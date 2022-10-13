import * as http from 'http'

import './routes/demo'
import './routes/file'
import './routes/cookie'
import Context from './libs/Context'
import * as router from './libs/router'

const server = http.createServer(async (req, res) => {
  // req是一个可读流，res是一个可写流，每一个请求进来都会触发该回调的执行
  const ctx = new Context(req, res)
  await ctx.parseBody()
  await router.parse(ctx)
})

server.listen(3000)
