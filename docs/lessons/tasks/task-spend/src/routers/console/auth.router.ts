import * as Joi from 'joi'
import * as Router from 'koa-router'
import * as uuid from 'uuid'
import { Context } from 'koa'
import * as authService from '../../services/auth.service'
import * as tokenService from '../../services/token.service'
import { badParams, stats } from '../../stats'
import { IAdmin } from '../../types'
import { generateOk } from '../../lib/check'

const router = new Router({
  prefix: '/api/console/auth'
})

router.post('/login', async (ctx) => {
  let schema = Joi.object({
    account: Joi.string().min(2).max(10).required(),
    pwd: Joi.string().min(4).max(18).required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  const { account, pwd } = value as IAdmin
  if (error) throw badParams(error.message)
  authService.adminLogin(account, pwd)
  let token = uuid.v4()
  // 记录token
  tokenService.writeToken(token)
  // 写入头部
  ctx.cookies.set('token', token, {
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date('2022-07-15'), // cookie失效时间
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: false // 是否允许重写
  })
  ctx.body = generateOk({
    token,
    info: {
      nickname: 'admin'
    }
  })
})

router.get('/getUserInfo', async (ctx) => {
  // 解析header中的token
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  if (!tokenService.hasToken(ctx)) throw stats.USER_LOGIN_OUTDATE
  ctx.body = generateOk({
    nickname: 'admin'
  })
})

router.post('/logout', async (ctx: Context) => {
  let token = ctx.cookies.get('token')
  if (!token) throw stats.USER_NOT_LOGIN
  tokenService.removeToken(token)
  ctx.cookies.set('token', '')
  ctx.body = generateOk()
})

export default router
