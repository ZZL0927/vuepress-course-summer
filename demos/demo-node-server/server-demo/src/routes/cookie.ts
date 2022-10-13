import * as crypto from 'crypto'
import * as router from '../libs/router'

interface ISession {
  name: string
  createdAt: number
}

const sessions: Map<string, ISession> = new Map()

router.get('/api/cookie/set', async ctx => {
  const { name } = ctx.query
  if (!name) {
    return {
      code: 40001,
      message: 'name不能为空'
    }
  }
  const id = crypto.randomBytes(12).toString('hex')
  sessions.set(id, {
    name: name as string,
    createdAt: Date.now()
  })
  ctx.setCookie('sessionId', id)
  return {
    code: 0
  }
})

router.get('/api/cookie/get', async ctx => {
  const { sessionId } = ctx.cookie
  if (sessionId && sessions.has(sessionId)) {
    return {
      code: 0,
      session: sessions.get(sessionId)
    }
  }
  return {
    code: 40002,
    message: '找不到session会话'
  }
})
