import db from '../db'
import { IOrder } from './../types'
import { stats } from '../stats'
// 订单管理
const orders = db.get('order').value()
//存入订单
export function setOrder(order: IOrder) {
  let result = db.get('order').find({ id: order.id }).value()
  if (result) throw stats.ERR_EXISTS
  db.get('order').push(order).write()
}
//编辑订单
export function editOrder(order: IOrder) {
  let result = db.get('order').find({ id: order.id }).value()
  if (!result) throw stats.ORDER_ID_NOT_FOUND
  orders.splice(
    orders.findIndex((item) => item.id == order.id),
    1,
    order
  )
  db.get('order').find({ id: order.id }).assign(order).write()
}
// 删除订单
export function deleteOrder(id: string) {
  let result = db.get('order').find({ id: id }).value()
  if (!result) throw stats.ORDER_ID_NOT_FOUND
  db.get('order').remove({ id: id }).write()
}
// 获取所有订单
export function getAllOrder() {
  return db.get('order').value()
}
// 获取给定id的订单
export function getOrder(id: string) {
  let result = db.get('order').find({ id: id }).value()
  if (!result) throw stats.ORDER_ID_NOT_FOUND
  return orders.find((item) => item.id === id)
}

export function searchOrder(
  pageIndex: number,
  pageSize: number,
  keyword: string
) {
  let _all = orders.filter((item) => item.richer.nickname.includes(keyword))
  if (!_all) throw stats.ERR_NOT_FOUND
  return [
    pageSize == 0 || pageIndex == 0
      ? _all
      : _all.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    _all.length
  ]
}

export function hasOrder(id: string) {
  return orders.findIndex((item) => item.id === id) >= 0
}
