import Joi from 'joi'
import Router from 'koa-router'

import validate from '../libs/validate'
import { JsonResp } from '../libs/stats'
import * as singerService from '../services/singer'
import * as songService from '../services/song'

const router = new Router({
  prefix: '/api/v1/singer'
})

router.get('/list', async ctx => {
  const items = await singerService.list()
  ctx.body = new JsonResp({
    items
  })
})

router.get('/songs', async ctx => {
  const { _id } = validate(
    ctx.query,
    Joi.object({
      _id: Joi.string().hex().length(24).required()
    })
  )
  const result = await songService.list({
    singerId: _id
  })
  ctx.body = new JsonResp(result)
})

router.get('/detail', async ctx => {
  const { _id } = validate(
    ctx.query,
    Joi.object({
      _id: Joi.string().hex().length(24).required()
    })
  )
  const singer = await singerService.detail(_id)
  ctx.body = new JsonResp({
    singer
  })
})

router.post('/create', async ctx => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      name: Joi.string().max(20).required(),
      birthday: Joi.string().max(20).default(''),
      pic: Joi.string()
        .uri({
          scheme: ['http', 'https']
        })
        .required()
    })
  )
  const _id = await singerService.create(value)
  ctx.body = new JsonResp({
    _id
  })
})

router.post('/remove', async ctx => {
  const { _id } = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().hex().length(24).required()
    })
  )
  await singerService.remove(_id)
  ctx.body = new JsonResp()
})

router.post('/update', async ctx => {
  const { _id, data } = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().hex().length(24).required(),
      data: Joi.object({
        name: Joi.string().max(20),
        birthday: Joi.string().max(20),
        pic: Joi.string().uri({
          scheme: ['http', 'https']
        })
      }).default({})
    })
  )
  await singerService.update(_id, data)
  ctx.body = new JsonResp()
})

export default router.routes()
