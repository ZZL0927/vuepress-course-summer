import * as Router from 'koa-router'
import _console from './routers/console/index.router'
import _web from './routers/web/index.router'

const router = new Router()
router.use(_console.routes())
router.use(_web.routes())
export default router
