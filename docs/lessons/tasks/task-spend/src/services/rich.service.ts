import db from '../db'
import { IRicher } from './../types'

// 富豪
const richers = db.get('richer').value()
// 添加富豪
export function setRich(rich: IRicher) {
  db.get('richer').push(rich).write()
}

// 编辑富豪
export function editRich(rich: IRicher) {
  richers.splice(
    richers.findIndex((item) => item.id == rich.id),
    1,
    rich
  )
  db.get('richer').find({ id: rich.id }).assign(rich).write()
}

// 删除富豪
export function deleteRich(id: string) {
  let rich = richers.find((item) => item.id === id)
  richers.splice(
    richers.findIndex((item) => item.id == rich.id),
    1,
    { ...rich, status: -1 }
  )
  db.get('richer').remove({ id: id }).write()
}
// 获取所有数据库中的富豪，存入__Rich
export function getAllRicher() {
  return db.get('richer').value()
}

// 获取所给定id的富豪
export function getRich(id: string) {
  return richers.find((item) => item.id === id)
}

export function searchRich(
  pageIndex: number,
  pageSize: number,
  keyword: string
) {
  let _all = richers.filter(
    (item) => item.nickname.includes(keyword) && item.status !== -1
  )
  return [
    pageIndex == 0 || pageSize == 0
      ? _all
      : _all.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    _all.length
  ]
}

export function hasRich(id: string) {
  return richers.findIndex((item) => item.id === id && item.status !== -1) >= 0
}
