import * as Router from 'koa-router'
import authRouter from './auth.router'
import goodsRouter from './goods.router'
import formRouter from './form.router'
import orderRouter from './order.router'
import richRouter from './rich.router'

const _console = new Router()

_console.use(goodsRouter.routes())
_console.use(authRouter.routes())
_console.use(formRouter.routes())
_console.use(orderRouter.routes())
_console.use(richRouter.routes())

export default _console
