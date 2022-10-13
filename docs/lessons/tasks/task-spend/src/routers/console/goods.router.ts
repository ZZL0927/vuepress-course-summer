import * as Router from 'koa-router'
import * as uuid from 'uuid'
import * as Joi from 'joi'
import { generateOk } from '../../lib/check'
import {
  deleteGoods,
  editGoods,
  getGoods,
  hasGoods,
  searchGoods,
  setGoods
} from '../../services/goods.service'
import * as tokenService from '../../services/token.service'
import { badParams, stats } from '../../stats'

const router = new Router({
  prefix: '/api/console/goods'
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
  let data = searchGoods(pageIndex, pageSize, keyword)
  ctx.body = generateOk({
    items: data[0],
    total: data[1]
  })
})

router.post('/add', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    title: Joi.string().min(1).max(20).required(),
    price: Joi.number().integer().positive().required(),
    cover: Joi.string().required(),
    limit: [Joi.number().integer().min(0).default(0), Joi.string().allow('')]
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { title, price, cover, limit } = value
  let id = uuid.v4()
  //从1970年1月1日0时0分0秒距离该日期对象所代表时间的毫秒数
  let ctime = new Date().getTime()
  let obj = {
    title,
    price: price * 100,
    cover,
    id,
    status: 0,
    limit,
    weight: 0,
    ctime
  }
  setGoods(obj)
  ctx.body = generateOk()
})

router.post('/set', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(1).max(20).required(),
    price: Joi.number().integer().positive().required(),
    cover: Joi.string().required(),
    limit: [Joi.number().integer().min(0).default(0), Joi.string().allow('')]
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { id, title, price, cover, limit } = value
  if (!hasGoods(id)) throw stats.GOODS_ID_NOT_FOUND
  let goods = getGoods(id)
  let obj = {
    ...goods,
    title,
    price: price * 100,
    cover,
    limit
  }
  editGoods(obj)
  ctx.body = generateOk()
})

router.post('/setweight', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    id: Joi.string().required(),
    weight: Joi.number().integer().min(0).default(0)
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { id, weight } = value
  if (!hasGoods(id)) throw stats.GOODS_ID_NOT_FOUND
  let goods = getGoods(id)
  let obj = {
    ...goods,
    weight
  }
  editGoods(obj)
  ctx.body = generateOk()
})

router.post('/up', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    id: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  if (!hasGoods(value.id)) throw stats.GOODS_ID_NOT_FOUND
  let goods = getGoods(value.id)
  let obj = {
    ...goods,
    status: 1
  }
  editGoods(obj)
  ctx.body = generateOk()
})

router.post('/down', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    id: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  if (!hasGoods(value.id)) throw stats.GOODS_ID_NOT_FOUND
  let goods = getGoods(value.id)
  let obj = {
    ...goods,
    status: 2
  }
  editGoods(obj)
  ctx.body = generateOk()
})

router.post('/delete', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    id: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  if (!hasGoods(value.id)) throw stats.GOODS_ID_NOT_FOUND
  deleteGoods(value.id)
  ctx.body = generateOk()
})

export default router
