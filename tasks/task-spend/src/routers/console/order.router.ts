import * as Router from 'koa-router'
import * as Joi from 'joi'
import { generateOk } from '../../lib/check'
import { getOrder, hasOrder, searchOrder } from '../../services/order.service'
import * as tokenService from '../../services/token.service'
import { badParams, stats } from '../../stats'

const router = new Router({
  prefix: '/api/console/order'
})

router.post('/search', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    pageIndex: Joi.number().integer().min(0).default(0),
    pageSize: Joi.number().integer().min(0).default(0),
    keyword: Joi.string().min(0).max(100).allow('')
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { pageIndex, pageSize, keyword } = value
  let data = searchOrder(pageIndex, pageSize, keyword)
  ctx.body = generateOk({
    items: data[0],
    total: data[1]
  })
})

router.post('/get', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    id: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  if (!hasOrder(value.id)) throw stats.ORDER_ID_NOT_FOUND
  let data = getOrder(value.id)
  ctx.body = generateOk({ info: data })
})

export default router
