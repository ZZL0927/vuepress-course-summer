import Joi from 'joi'
import Router from 'koa-router'

import validate from '../libs/validate'
import { JsonResp } from '../libs/stats'
import * as songService from '../services/song'

const router = new Router({
  prefix: '/api/v1/song'
})

// 歌曲列表
router.get('/list', async ctx => {
  const { title, singerId, skip, limit } = validate(
    ctx.query,
    Joi.object({
      title: Joi.string(),
      singerId: Joi.string().hex().length(24),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).max(20).default(10)
    })
  )
  const result = await songService.list(
    {
      title,
      singerId
    },
    skip,
    limit
  )
  ctx.body = new JsonResp(result)
})

// 添加歌曲
router.post('/create', async ctx => {
  const value = validate(
    ctx.request.body,
    Joi.object({
      title: Joi.string().max(100).required(),
      subtitle: Joi.string().max(100).default(''),
      singerId: Joi.string().hex().length(24).required(),
      cover: Joi.string()
        .uri({
          scheme: ['http', 'https']
        })
        .required(),
      interval: Joi.number().integer().min(1).required()
    })
  )
  const _id = await songService.create(value)
  ctx.body = new JsonResp({
    _id
  })
})

// 删除歌曲
router.post('/remove', async ctx => {
  const { _id } = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().hex().length(24).required()
    })
  )
  await songService.remove(_id)
  ctx.body = new JsonResp()
})

// 更新歌曲
router.post('/update', async ctx => {
  const { _id, data } = validate(
    ctx.request.body,
    Joi.object({
      _id: Joi.string().hex().length(24).required(),
      data: Joi.object({
        title: Joi.string().max(100),
        subtitle: Joi.string().max(100).default(''),
        singerId: Joi.string().hex().length(24),
        cover: Joi.string().uri({
          scheme: ['http', 'https']
        }),
        interval: Joi.number().integer().min(1)
      }).default({})
    })
  )
  await songService.update(_id, data)
  ctx.body = new JsonResp()
})

export default router.routes()
