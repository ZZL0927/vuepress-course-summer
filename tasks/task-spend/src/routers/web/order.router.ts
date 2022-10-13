import * as Joi from 'joi'
import * as uuid from 'uuid'
import * as Router from 'koa-router'
import { generateOk } from '../../lib/check'
import { setOrder } from '../../services/order.service'
import { badParams, stats } from '../../stats'
import { IGoodsIds } from './../../types'
import { getGoods, hasGoods } from '../../services/goods.service'
import { getRich, hasRich } from '../../services/rich.service'
import { IOrder } from '../../types'

const router = new Router({
  prefix: '/api/web/order'
})

router.post('/commit', async (ctx) => {
  let schema = Joi.object({
    richId: Joi.string().required(),
    goodsIds: Joi.required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) throw badParams(error.message)
  let { richId, goodsIds } = value
  if (!hasRich(richId)) {
    throw stats.RICHER_ID_NOT_FOUND
  }
  ;(goodsIds as IGoodsIds[]).map((item: IGoodsIds) => {
    if (!hasGoods(item.id)) throw stats.GOODS_ID_NOT_FOUND
  })
  let _goods = (goodsIds as IGoodsIds[]).map((item: IGoodsIds) => ({
    item: getGoods(item.id),
    count: item.count
  }))
  let richer = getRich(richId)
  let total = _goods.reduce(
    (a: number, b: { item: { price: number }; count: number }) =>
      a + b.item.price * b.count,
    0
  )
  if (total > richer.worth) throw stats.MONEY_NOT_ENOUGH
  let ctime = new Date().getTime()
  const id = uuid.v4()
  let obj: IOrder = {
    richer,
    goods: _goods,
    ctime,
    id
  }
  setOrder(obj)
  ctx.body = generateOk()
})

export default router
