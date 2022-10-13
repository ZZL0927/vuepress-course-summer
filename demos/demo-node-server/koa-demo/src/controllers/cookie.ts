import Joi from 'joi'
import Router from 'koa-router'
import * as crypto from 'crypto'

import validate from '../libs/validate'
import { JsonResp, stats } from '../libs/stats'

const router = new Router({
  prefix: '/api/v1/cookie'
})

interface ISession {
  name: string
  createdAt: number
}

const sessions: Map<string, ISession> = new Map()

router.get('/set', async ctx => {
  const { name } = validate(
    ctx.query,
    Joi.object({
      name: Joi.string().required()
    })
  )
  const sid = crypto.randomBytes(12).toString('hex')
  sessions.set(sid, {
    name: name as string,
    createdAt: Date.now()
  })
  ctx.cookies.set('session_id', sid, {
    signed: true,
    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000)
  })
  ctx.body = new JsonResp()
})

router.get('/get', async ctx => {
  const sid = ctx.cookies.get('session_id', {
    signed: true
  })
  if (!sid || sessions.has(sid) === false) {
    throw stats.ErrSessionNotFound
  }
  ctx.body = new JsonResp({
    session: sessions.get(sid)
  })
})

export default router.routes()
