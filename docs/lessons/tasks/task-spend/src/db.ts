import { IAdmin, IGoods, IOrder, IRicher } from './types'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import * as path from 'path'
import { mkdirsSync } from './lib/upload'

type Data = {
  admin: IAdmin
  goods: IGoods[]
  order: IOrder[]
  richer: IRicher[]
}
const defaultData: Data = {
  admin: { account: 'admin', pwd: 'admin' },
  goods: [],
  order: [],
  richer: []
}

// 使用JSON文件存储数据
const staticPath = '../data'
mkdirsSync(path.join(__dirname, staticPath))
const adapter = new FileSync<Data>(path.join(__dirname, '../data/data.json'))
const db = low(adapter)

// 如果JSON文件不存在，那么db.data为null，设置一个默认data
if (!db.has('admin').value()) {
  db.defaults(defaultData).write()
}

export default db
