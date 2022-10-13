import db from '../db'
import { IGoods } from './../types'
import { stats } from '../stats'

const GOODSURL: IGoods[] = db.get('goods').value()
// 商品存入数据库
export function setGoods(goods: IGoods) {
  // 存入数据库
  let result = db.get('goods').find({ id: goods.id }).value()
  let res = db.get('goods').find({ title: goods.title }).value()
  if (result || res) throw stats.ERR_EXISTS
  db.get('goods').push(goods).write()
  // GOODSURL.push(goods)
}

// 商品编辑，不是真正的编辑，而是将对应的商品替换
export function editGoods(goods: IGoods) {
  let result = db.get('goods').find({ id: goods.id }).value()
  if (!result) throw stats.GOODS_ID_NOT_FOUND
  GOODSURL.splice(
    // 感觉这里是一个遍历，找到GOODSURL中与goods.id对应的商品，得到它的索引值，这个索引为splice第一参数，即从这个索引开始
    GOODSURL.findIndex((item) => item.id == goods.id),
    // 删除一个元素，即将与goods的id相同的商品删除
    1,
    // 将goods添加到到被删除的goods的id相同的商品上
    goods
  )
  db.get('goods').find({ id: goods.id }).assign(goods).write()
}
//商品删除，不是真正的删除，而是将对应的商品的status修改为-1
export function deleteGoods(id: string) {
  let result = db.get('goods').find({ id: id }).value()
  if (!result) throw stats.GOODS_ID_NOT_FOUND
  // 先将删除商品复制一份
  let goods = getGoods(id)
  GOODSURL.splice(
    GOODSURL.findIndex((item) => item.id == goods.id),
    1,
    // 将复制出来的商品修改status再添加回去
    { ...goods, status: -1 }
  )
  db.get('goods').find({ id: goods.id }).assign({ status: -1 }).write()
}

// 将数据库中的所有数据存入
export function getAllGoods() {
  return db.get('goods').value()
}
// 将数据库中的所有数据存入
export function getGoods(id: string) {
  let result = db.get('goods').find({ id: id }).value()
  if (!result) throw stats.GOODS_ID_NOT_FOUND
  // find返回数组中满足提供的回调函数的第一个元素的值，即找对对应商品返回
  // return GOODSURL.find((item) => item.id === id)
  return result
}

export function searchGoods(
  pageIndex: number,
  pageSize: number,
  keyword: string
) {
  let _all = db
    .get('goods')
    .value()
    // 含有关键字，且商品状态不等与-1
    .filter((item) => item.title.includes(keyword) && item.status !== -1)
    // 搜索出来的商品按权重排序
    .sort((a, b) => b.weight - a.weight)
  if (!_all) throw stats.ERR_NOT_FOUND
  return [
    // pageIndex和pageSize有一个为0就返回所有含关键字的商品否则返回搜索页面的含关键字的商品
    // 返回含有关键字商品的数量
    pageIndex == 0 || pageSize == 0
      ? _all
      : _all.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    _all.length
  ]
}

// 根据id返回对应商品
export function hasGoods(id: string) {
  let _all = db.get('goods').value()
  return _all.findIndex((item) => item.id === id && item.status !== -1) >= 0
}
