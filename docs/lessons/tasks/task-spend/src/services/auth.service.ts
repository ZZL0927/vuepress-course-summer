import db from '../db'
import { stats } from '../stats'

export function adminLogin(username: string, password: string) {
  let { account, pwd } = db.get('admin').value()
  if (username !== account) throw stats.ACCOUNT_NOT_FOUND
  if (password !== pwd) throw stats.ERR_PWD
}
