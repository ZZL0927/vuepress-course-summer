import * as Joi from 'joi'
import * as Router from 'koa-router'
import * as uuid from 'uuid'
import { generateOk } from '../../lib/check'
import {
  setRich,
  editRich,
  deleteRich,
  searchRich,
  hasRich
} from '../../services/rich.service'
import * as tokenService from '../../services/token.service'
import { badParams, stats } from '../../stats'
import { writeToken } from '../../services/token.service'

const router = new Router({
  prefix: '/api/console/rich'
})

router.post('/search', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  writeToken(token)
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    pageIndex: Joi.number().integer().min(0).default(0),
    pageSize: Joi.number().integer().min(0).default(0),
    keyword: Joi.string().min(0).max(100).allow('')
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { pageIndex, pageSize, keyword } = value
  let data = searchRich(pageIndex, pageSize, keyword)
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
    nickname: Joi.string().min(3).max(20).required(),
    worth: Joi.number().integer().positive().required(),
    avatar: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { nickname, worth, avatar } = value
  let id = uuid.v4()
  let obj = {
    nickname,
    worth: worth * 100,
    avatar,
    id,
    status: 0
  }
  setRich(obj)
  ctx.body = generateOk()
})

router.post('/set', async (ctx) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  let schema = Joi.object({
    id: Joi.string().required(),
    nickname: Joi.string().min(3).max(20).required(),
    worth: Joi.number().integer().positive().required(),
    avatar: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { id, nickname, worth, avatar } = value
  if (!hasRich(id)) throw stats.RICHER_ID_NOT_FOUND
  let obj = {
    nickname,
    worth: worth * 100,
    avatar,
    id,
    status: 0
  }
  editRich(obj)
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
  if (!hasRich(value.id)) throw stats.RICHER_ID_NOT_FOUND
  deleteRich(value.id)
  ctx.body = generateOk()
})

export default router
