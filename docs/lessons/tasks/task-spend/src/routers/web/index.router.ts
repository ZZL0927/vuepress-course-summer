import * as Router from 'koa-router'
import goodsRouter from './goods.router'
import orderRouter from './order.router'
import richRouter from './rich.router'

const _web = new Router()

_web.use(goodsRouter.routes())
_web.use(orderRouter.routes())
_web.use(richRouter.routes())

export default _web
