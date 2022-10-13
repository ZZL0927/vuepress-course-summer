import * as router from '../libs/router'

router.get('/api/demo/query', async ctx => {
  return {
    code: 0,
    headers: ctx.req.headers,
    query: ctx.query
  }
})

router.post('/api/demo/body', async ctx => {
  return {
    code: 0,
    headers: ctx.req.headers,
    body: ctx.body
  }
})
