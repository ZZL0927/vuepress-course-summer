import * as Joi from 'joi'
import * as Router from 'koa-router'
import { generateOk } from '../../lib/check'
import { getGoods, hasGoods, searchGoods } from '../../services/goods.service'
import * as tokenService from '../../services/token.service'
import { badParams, stats } from '../../stats'

const router = new Router({
  prefix: '/api/web/goods'
})

router.post('/search', async (ctx) => {
  let schema = Joi.object({
    pageIndex: Joi.number().integer().min(0).default(0),
    pageSize: Joi.number().integer().min(0).default(0),
    keyword: Joi.string().min(0).max(100).allow('')
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { pageIndex, pageSize, keyword } = value
  let data = searchGoods(pageIndex, pageSize, keyword)
  ctx.body = generateOk({
    items: data[0],
    total: data[1]
  })
})

router.post('/get', async (ctx) => {
  let schema = Joi.object({
    id: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  if (!hasGoods(value.id)) throw stats.GOODS_ID_NOT_FOUND
  let data = getGoods(value.id)
  ctx.body = generateOk({ info: data })
})

export default router
